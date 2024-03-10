from pydantic import BaseModel


class Textbook(BaseModel):
    id: int
    title: str
    ISBN: str
    description: str

class TextbookRequest(BaseModel):
    title: str
    ISBN: str
    description: str