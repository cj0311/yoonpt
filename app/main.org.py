from fastapi import FastAPI

app = FastAPI()

from fastapi.responses import FileResponse


@app.get("/")
def read_root():
    return {"Hello": "World"}
    # return 'hello'
    # return FileResponse('index.html')

@app.get("/data")
def 작명():
    return {'hello' : 1234}

@app.get("/get_example")
def 작명():
    return {'hello' : 1234}

from pydantic import BaseModel
class Model(BaseModel):
    name :str
    phone :int
        
@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}

@app.post("/send")
def 작명(data : Model):
    print(data)
    return '전송완료'
