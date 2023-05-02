import os
import urllib.parse
from datetime import datetime

import mysql.connector
import openai
import pytz
import subprocess
from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel

app = FastAPI()

class MessageData(BaseModel):
    room: str
    msg: str
    sender: str
    data: str = None

def get_db_connection():
    return mysql.connector.connect(
        host=os.environ.get('MYSQL_HOST', 'localhost'),
        port=int(os.environ.get('MYSQL_PORT', 8080)),
        user=os.environ.get('MYSQL_USER', 'your_default_username'),
        password=os.environ.get('MYSQL_PASSWORD', 'your_default_password'),
        database=os.environ.get('MYSQL_DATABASE', 'your_default_database'),
        charset=os.environ.get('MYSQL_CHARSET', 'utf8mb4')
    )
    


def load_environment_variables(file_path):
    with open(file_path,"r") as f:
        for line in f:
            key, value = line.strip().split('=')
            os.environ[key] = value


# engine: 사용할 AI 모델의 이름입니다. 예를 들어, text-davinci-002와 같이 특정 모델을 지정할 수 있습니다.
# prompt: API에 전달할 텍스트 프롬프트입니다. 이 텍스트를 기반으로 AI가 응답을 생성합니다.
# max_tokens: 생성되는 응답 텍스트의 최대 토큰 수입니다. 이 값은 결과의 길이를 조절하는 데 사용됩니다.
# n: 생성할 결과 수입니다. 이 매개변수를 사용하면 여러 개의 독립적인 응답을 생성할 수 있습니다.
# stop: 생성된 텍스트에서 중지해야 하는 문자열 목록입니다. 예를 들어, 문단 끝에 도달했을 때 생성을 중지하려면 stop=['\n\n']를 사용할 수 있습니다.
# temperature: 결과의 다양성을 제어하는 값입니다. 높은 값(예: 1.0)은 더 다양한 결과를 생성하며, 낮은 값(예: 0.2)은 더 일관된 결과를 생성합니다.


def summarize(openai: any,answer: str) -> str:
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{
            'role': 'user',
            'content': f'아래 대화내용에서 너는 yoonpt야. 한국어로 주제별로 한문장으로 요약해줘 ###\n{answer}\n###'
        }],
    )
    return completion

@app.get("/get_message/{room}")
async def get_message(room: str):
   return {"message": f"Hello, {room}!"}



@app.post("/post_message/")
async def post_message(request: Request, data: MessageData):
    raw_data = await request.body()

    decoded_room = urllib.parse.unquote(data.room)
    decoded_msg = urllib.parse.unquote(data.msg)
    decoded_sender = urllib.parse.unquote(data.sender)


    # 현재 시간 구하기 (UTC 기준)
    now_utc = datetime.utcnow()
    # KST 시간대 객체 생성
    kst_tz = pytz.timezone('Asia/Seoul')
    # 현재 시간을 KST로 변경
    now_kst = now_utc.replace(tzinfo=pytz.utc).astimezone(kst_tz)

    # API 키 설정
    load_environment_variables('/code/app/env_variables')
    API_KEY=os.environ.get('CHATGPT_APIKEY', 'no-key')
    openai.api_key = API_KEY
    #print("API_KEY  " + API_KEY)
    openai.organization = os.environ.get('CHATGPT_ORGANIZATION_ID', 'no-org-id')

    print(f"Room: {decoded_room}, Msg: {decoded_msg}, Sender: {decoded_sender}")

    # OpenAI API 호출
    prompt_text = decoded_msg
    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": prompt_text},
    ]
        
    connection = get_db_connection()
    try:        
        cursor = connection.cursor()
        
        summarized_content = get_summarized_content(data, connection, cursor, openai)
        messages.insert(0,{"role": "user", "content": summarized_content})
        
        
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while inserting data into the database.")
    finally:
    # 커서와 연결을 닫음
        cursor.close()
        connection.close()
            
    
    # Call the OpenAI API
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages,
        max_tokens=3000,
        n=1,
        stop=None,
        temperature=0.7,
    )
    
    
    # Get the assistant's reply
    assistant_reply = response.choices[0].message["content"]
    # print("assistant_reply :" + assistant_reply)
    
    prompt_tokens = response.usage["prompt_tokens"]
    completion_tokens =  response.usage["completion_tokens"]
    total_tokens =  response.usage["total_tokens"]
    print(f"assistant Prompt tokens: {prompt_tokens} Completion tokens: {completion_tokens} Total tokens: {total_tokens}")
    
    # DB에 저장 (user 입력값)
    connection = get_db_connection()
    print(f"Connection: {connection}")
    try:
        cursor = connection.cursor()
        save_user_input_to_db(data, now_kst, connection, cursor)
        save_assistant_reply_to_db(data, now_kst, assistant_reply, summarized_content, prompt_text, connection, cursor)
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while inserting data into the database.")
    finally:
        cursor.close()
        connection.close()
        
    
    response_data = {
        "result": "success",
        "details": assistant_reply,
        "timestamp": datetime.now().strftime("%Y%m%d%H%M%S")
    }
    return response_data

def get_summarized_content(data, connection, cursor, openai):
    query = """
    SELECT summarized_msg
    FROM gpt_room_talk
    WHERE room = %s
    ORDER BY seq DESC
    LIMIT 1
    """
    cursor.execute(query, (data.room,))

    row = cursor.fetchone()
    if row and row[0] is not None:
        summarized_content = urllib.parse.unquote(row[0])
    else:
        combined_msgs = fetch_combined_messages(data, connection, cursor)
        summarized = summarize(openai, combined_msgs)
        summarized_content = summarized.choices[0].message.content
        summarized_prompt_tokens = summarized.usage["prompt_tokens"]
        summarized_completion_tokens = summarized.usage["completion_tokens"]
        summarized_total_tokens = summarized.usage["total_tokens"]
        print(f"newly summarized: Prompt tokens: {summarized_prompt_tokens} Completion tokens: {summarized_completion_tokens} Total tokens: {summarized_total_tokens}")

    return summarized_content


def fetch_combined_messages(data, connection, cursor):
    query = """
    SELECT talker, msg, sender
    FROM gpt_room_talk
    where room = %s
    ORDER BY seq DESC
    LIMIT 16
    """
    cursor.execute(query, (data.room,))

    result = cursor.fetchall()
    combined_msgs = ""
    for row in reversed(result):
        result_sender = urllib.parse.unquote(row[2])
        result_msg = urllib.parse.unquote(row[1])
        combined_msgs += f"{result_sender}: {result_msg}\n"

    return combined_msgs

def save_user_input_to_db(data, now_kst, connection, cursor):
    update_sequence_number(data.room, cursor)
    last_seq, new_seq = get_sequence_number(data.room, cursor)
    insert_new_message(data, now_kst, cursor, new_seq, "user", data.sender, data.msg)
    connection.commit()
    
def save_assistant_reply_to_db(data, now_kst, assistant_reply, summarized_content, prompt_text, connection, cursor):
    update_sequence_number(data.room, cursor)
    last_seq, new_seq = get_sequence_number(data.room, cursor)
    encoded_assistant_reply = urllib.parse.quote(assistant_reply)
    combined_summarized_msg = f"지금까지의 대화 요약 내용 : {summarized_content}\n"
    f"{data.sender}: {prompt_text}\n"
    f"yoonpt: {assistant_reply}\n"
    summarized_new_content = summarize(openai, combined_summarized_msg).choices[0].message.content
    insert_new_message(data, now_kst, cursor, new_seq, "assistant", "yoonpt", encoded_assistant_reply, summarized_new_content)
    connection.commit()    
    
def update_sequence_number(room, cursor):
    sql_update = """
    UPDATE gpt_room_seq SET last_seq = (select max(seq) from gpt_room_talk where room= %s ) WHERE room = %s
    """
    cursor.execute(sql_update, (room, room))
    print(f"Updated sequence number to latest seq for room {room}")

def get_sequence_number(room, cursor):
    sql_select = """
    SELECT last_seq FROM gpt_room_seq WHERE room = %s
    """
    cursor.execute(sql_select, (room,))
    result = cursor.fetchone()
    if result:
        last_seq = result[0]
        new_seq = last_seq + 1
    else:
        new_seq = 1

    return last_seq, new_seq

def insert_new_message(data, now_kst, cursor, seq, talker, sender, msg, summarized_msg=None):
    today = datetime.now().strftime("%Y%m%d")
    current_time = now_kst
    if summarized_msg:
        sql = """
        INSERT INTO gpt_room_talk (seq, room, talker, basedt, sender, msg, createdtime, summarized_msg)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(sql, (seq, data.room, talker, today, sender, msg, current_time, summarized_msg))
    else:
        sql = """
        INSERT INTO gpt_room_talk (seq, room, talker, basedt, sender, msg, createdtime)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(sql, (seq, data.room, talker, today, sender, msg, current_time))

    print(f"Inserted new message for room {data.room} with sequence number {seq} and talker {talker}")

@app.get("/get_messages/{room}/{msg}/{sender}")
async def get_messages(room: str, msg: str, sender: str):
    room = urllib.parse.unquote(room)
    msg = urllib.parse.unquote(msg)
    sender = urllib.parse.unquote(sender)
    
    # Connect to MySQL and retrieve data using room, msg, and sender as keys
    connection = mysql.connector.connect(
        host="host",
        user="user",
        password="password",
        database="database"
    )
    cursor = connection.cursor()

    cursor.execute(f"SELECT * FROM messages WHERE room = '{room}' AND msg = '{msg}' AND sender = '{sender}'")
    messages = cursor.fetchall()

    cursor.close()
    connection.close()

    return {"messages": messages}


@app.post("/add_message")
async def add_message(message_data: MessageData):
    room = urllib.parse.unquote(message_data.room)
    msg = message_data.msg
    sender = urllib.parse.unquote(message_data.sender)
    data = message_data.data

    # Connect to MySQL and insert data using room, msg, and sender as keys
    connection = mysql.connector.connect(
        host="host",
        user="user",
        password="password",
        database="database"
    )
    cursor = connection.cursor()

    cursor.execute(f"INSERT INTO messages (room, msg, sender, data) VALUES ('{room}', '{msg}', '{sender}', '{data}')")
    connection.commit()

    cursor.close()
    connection.close()

    return {"status": "success"}



@app.get("/gitclone")
def git_clone():
    repo_url = "https://github.com/cj0311/yoonpt.git"
    target_directory = "../"    
    git_clone(repo_url, target_directory)
    return {"status": "success"}

def git_clone(repo_url, target_directory=None):
    try:
        command = ["git", "clone", repo_url]

        if target_directory:
            command.append(target_directory)

        result = subprocess.run(command, capture_output=True, text=True)

        if result.returncode == 0:
            print("Git clone success.")
            print(result.stdout)
        else:
            print(f"Git clone failed with exit code {result.returncode}.")
            print(result.stderr)
    except Exception as e:
        print(f"Error: {e}")