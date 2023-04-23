from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from datetime import datetime
import mysql.connector
import urllib.parse
import openai
import os
import subprocess
import pytz


# API 키 설정

API_KEY = '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'
openai.api_key = API_KEY
openai.organization = "org-1xeCXyWFAkxdLby2WUUciCsI"
app = FastAPI()

class MessageData(BaseModel):
    room: str
    msg: str
    sender: str
    data: str = None


@app.get("/get_message/{room}")
async def get_message(room: str):
   return {"message": f"Hello, {room}!"}



@app.post("/post_message/")
async def post_message(request: Request, data: MessageData):
    # 데이터를 처리하는 데 필요한 코드를 여기에 작성하세요.
    # 예를 들어, 데이터를 출력할 수 있습니다.
    raw_data = await request.body()
    #print(f"Raw data: {raw_data}")
    decoded_room = urllib.parse.unquote(data.room)
    decoded_msg = urllib.parse.unquote(data.msg)
    decoded_sender = urllib.parse.unquote(data.sender)


    # 현재 시간 구하기 (UTC 기준)
    now_utc = datetime.utcnow()
    # KST 시간대 객체 생성
    kst_tz = pytz.timezone('Asia/Seoul')
    # 현재 시간을 KST로 변경
    now_kst = now_utc.replace(tzinfo=pytz.utc).astimezone(kst_tz)


    print(f"Room: {decoded_room}, Msg: {decoded_msg}, Sender: {decoded_sender}")




    # OpenAI API 호출
    prompt_text = decoded_msg
    # Define the messages to send to the model
    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": prompt_text},
    ]

        
    connection = get_db_connection()
    try:        
        cursor = connection.cursor()

        query = """
            SELECT summarized_msg
            FROM gpt_room_talk
            WHERE room = %s
            ORDER BY seq DESC
            LIMIT 1
        """

        cursor.execute(query, (data.room,))

        # 결과를 얻음
        row = cursor.fetchone()
        if row and row[0] is not None:
            # print("DB에 summarized 데이터가 있음")
            summarized_content = urllib.parse.unquote(row[0])
            print("summarized_content : " + summarized_content)
        else: # DB에 데이터가 없으면            
        # 상위 10개 데이터를 선택하는 쿼리
            # print("DB에 summarized 데이터가 없음")
            query = """
                SELECT talker, msg, sender
                FROM gpt_room_talk
                where room = %s
                ORDER BY seq DESC
                LIMIT 16
            """

            cursor.execute(query,(data.room,))

            # 선택한 데이터를 출력
            result = cursor.fetchall()
            combined_msgs = ""
            for row in reversed(result):
                result_sender = urllib.parse.unquote(row[2])
                result_msg = urllib.parse.unquote(row[1])  # 이미 인코딩된 msg
                combined_msgs += f"{result_sender}: {result_msg}\n"            
            #summarized = summarize(openai, result_msg)   
            # summarized = result_msg
            # message_json = {"role": reslut_talker, "content": summarized}
            # messages.insert(0,message_json)
            summarized = summarize(openai, combined_msgs)
            # print("combined_msgs : " + combined_msgs)
            summarized_content =  summarized.choices[0].message.content
            # print("summarized content : " + summarized_content)
            summarized_prompt_tokens = summarized.usage["prompt_tokens"]
            summarized_completion_tokens =  summarized.usage["completion_tokens"]
            summarized_total_tokens =  summarized.usage["total_tokens"]
            print(f"newly summarized: Prompt tokens: {summarized_prompt_tokens} Completion tokens: {summarized_completion_tokens} Total tokens: {summarized_total_tokens}")
            
            
        message_json = {"role": "user", "content": summarized_content}
        messages.insert(0,message_json)
        
        
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
        today = datetime.now().strftime("%Y%m%d")
        current_time = now_kst

        # KST 시간 출력
        # print(now_kst)

        sql_update = """
            UPDATE gpt_room_seq SET last_seq = (select max(seq) from gpt_room_talk where room= %s ) WHERE room = %s
            """
        cursor.execute(sql_update, ( data.room, data.room))
        print(f"Updated sequence number to latest seq for room {data.room}")
        



        # Get the last sequence number for the given room
        sql_select = """
        SELECT last_seq FROM gpt_room_seq WHERE room = %s
        """
        cursor.execute(sql_select, (data.room,))
        result = cursor.fetchone()

        if result:
            last_seq = result[0]
            new_seq = last_seq + 1
            sql_update = """
            UPDATE gpt_room_seq SET last_seq = %s WHERE room = %s
            """
            cursor.execute(sql_update, (new_seq, data.room))
            print(f"Updated sequence number for room {data.room} to {new_seq}")
        else:
            new_seq = 1
            sql_insert = """
            INSERT INTO gpt_room_seq (room, last_seq) VALUES (%s, %s)
            """
            cursor.execute(sql_insert, (data.room, new_seq))
            print(f"Inserted new sequence number for room {data.room} to {new_seq}")

        # Insert the new message with the updated sequence number
        sql = """
        INSERT INTO gpt_room_talk  (seq, room,talker ,basedt, sender, msg, createdtime)
        VALUES (%s, %s,%s, %s, %s, %s, %s)
        """
        cursor.execute(sql, (new_seq, data.room, "user",today, data.sender, data.msg, current_time))
        print(f"Inserted new message for room {data.room} with sequence number {new_seq}")
        connection.commit()
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while inserting data into the database.")
    finally:
        cursor.close()
        connection.close()
        
    # summarized와 기존 prompt_text와 assistant_reply를 합친 문자열을 통해 summarized를 다시 구함
    
    combined_summarized_msg = f"지금까지의 대화 요약 내용 : {summarized_content}\n" \
        + f"{decoded_sender}: {prompt_text}\n" \
        + f"yoonpt: {assistant_reply}\n"
    # print ("combined_summarized_msg : " + combined_summarized_msg )
    summarized_new_content = summarize(openai, combined_summarized_msg).choices[0].message.content
    print ("summarized_new_content: " + summarized_new_content )
    
    # DB에 저장 (assistant 답변값)
    connection = get_db_connection()
    try:
        encoded_assistant_reply = urllib.parse.quote(assistant_reply)
        encoded_summarized_new_content = urllib.parse.quote(summarized_new_content)
        cursor = connection.cursor()
        today = datetime.now().strftime("%Y%m%d")
        current_time = now_kst

        # KST 시간 출력
        print(now_kst)
        # Get the last sequence number for the given room
        sql_select = """
        SELECT last_seq FROM gpt_room_seq WHERE room = %s
        """
        cursor.execute(sql_select, (data.room,))
        result = cursor.fetchone()

        if result:
            last_seq = result[0]
            new_seq = last_seq + 1
            sql_update = """
            UPDATE gpt_room_seq SET last_seq = %s WHERE room = %s
            """
            cursor.execute(sql_update, (new_seq, data.room))
            print(f"Updated sequence number for room {data.room} to {new_seq}")
        else:
            new_seq = 1
            sql_insert = """
            INSERT INTO gpt_room_seq (room, last_seq) VALUES (%s, %s)
            """
            cursor.execute(sql_insert, (data.room, new_seq))
            print(f"Inserted new sequence number for room {data.room} to {new_seq}")

        # Insert the new message with the updated sequence number
        sql = """
        INSERT INTO gpt_room_talk  (seq, room,talker ,basedt, sender, msg, createdtime, summarized_msg )
        VALUES (%s, %s,%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(sql, (new_seq, data.room,"assistant", today, "yoonpt", encoded_assistant_reply, current_time, encoded_summarized_new_content))
        

        
        print(f"Inserted new message for room {data.room} with sequence number {new_seq} and assistant reply...")
        connection.commit()
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

def get_db_connection():
    connection = mysql.connector.connect(
       host='172.17.0.2',
        port=3306,
        user='root',
        password='1234',
        database='chat_db',
        charset='utf8mb4'
    )
    return connection

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