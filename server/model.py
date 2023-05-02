# create json schemas from the model - orm
from pydantic import BaseModel
from typing import Optional
import datetime

class Todo(BaseModel):
    title: str
    description: str
    created_at: Optional[datetime.datetime] = None
    client_timezone: Optional[str] = None