from pydantic import BaseModel


class Textbook(BaseModel):
    id: int
    title: str
    ISBN: str
    description: str

class TextbookRequest(BaseModel):
    id: int
    title: str
    ISBN: str
    description: str