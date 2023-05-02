import datetime
from fastapi import FastAPI, HTTPException
from model import Todo
import pytz



from database import (
     fetch_one_todo, 
     fetch_all_todos, 
     create_todo, 
     update_todo, 
     remove_todo
)

from fastapi.middleware.cors import CORSMiddleware


# app object
app = FastAPI()

origins = ['http://localhost:3000', ]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials= True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"hello": "world"}

@app.get("/api/todo")
async def get_todo():
    response = await fetch_all_todos()
    return response 

@app.get("/api/todo/{title}", response_model=Todo)
async def get_todo_by_title(title):
    response = await fetch_one_todo(title)
    if response:
        return response
    raise HTTPException(404, f"No Todo item found with title: {title}")

@app.post("/api/todo/", response_model=Todo)
async def post_todo(todo: Todo):
    created_at = datetime.datetime.utcnow()
    if todo.client_timezone:
        tz = pytz.timezone(todo.client_timezone)
        created_at = datetime.datetime.now(tz)
    response = await create_todo(todo.dict(), created_at=created_at)
    if response:
        return response
    raise HTTPException(400, "Something went wrong")

@app.put("/api/todo/{title}/", response_model=Todo)
async def put_todo(title: str, description: str):
    response = await update_todo(title, description)
    if response:
        return response
    raise HTTPException(404, f"No Todo item found with title: {title}")


@app.delete("/api/todo/{title}")
async def delete_todo(title):
    response = await remove_todo(title)
    if response:
        return "Item deleted successfully!"
    raise HTTPException(404, f"No Todo item found with title: {title}")
