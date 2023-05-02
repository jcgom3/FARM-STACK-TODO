from model import Todo

# Mongodb driver
import motor.motor_asyncio

import datetime
import pytz


client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://127.0.0.1:27017/')

database = client.TodoList

# collection
collection = database.todo 

async def fetch_one_todo(title):
    document = await collection.find_one({"title": title})
    return document

async def fetch_all_todos():
    todos = []
    cursor = collection.find({})
    async for document in cursor:
        document["created_at"] = document.get("created_at")
        todos.append(Todo(**document))
    return todos

# create todo
async def create_todo(todo, created_at):
    todo["created_at"] = created_at
    document = todo
    result = await collection.insert_one(document)
    return document

# update
async def update_todo(title, description):
    await collection.update_one({"title": title}, {"$set": {
        "description": description
    }})
    # return updated item
    document = await collection.find_one({"title": title})
    return document

async def remove_todo(title):
    await collection.delete_one({"title":title})
    return True
