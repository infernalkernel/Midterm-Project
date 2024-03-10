from fastapi import APIRouter, Path, HTTPException, status
from model import Textbook,TextbookRequest
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

textbook_router = APIRouter()

textbook_list = []
max_id: int = 0

@textbook_router.post("/textbooks", status_code=status.HTTP_201_CREATED)
async def add_textbook(textbook: TextbookRequest) -> dict:
    global max_id
    max_id += 1  # auto increment ID

    newTextbook = Textbook(id=max_id, title=textbook.title, ISBN=textbook.ISBN, description=textbook.description)
    textbook_list.append(newTextbook)
    json_compatible_item_data = newTextbook.model_dump()
    return JSONResponse(json_compatible_item_data, status_code=status.HTTP_201_CREATED)


@textbook_router.get("/textbooks")
async def get_textbooks() -> dict:
    json_compatible_item_data = jsonable_encoder(textbook_list)
    return JSONResponse(content=json_compatible_item_data)


@textbook_router.get("/textbooks/{id}")
async def get_textbook_by_id(id: int = Path(..., title="default")) -> dict:
    for textbook in textbook_list:
        if textbook.id == id:
            return {"textbook": textbook}

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"The textbook with ID={id} is not found.",
    )


@textbook_router.put("/textbooks/{id}")
async def update_textbook(textbook: TextbookRequest, id: int) -> dict:
    for x in textbook_list:
        if x.id == id:
            x.title = textbook.title
            x.ISBN = textbook.ISBN
            x.description = textbook.description
            return {"message": "Textbook updated successfully"}

    return {"message": f"The textbook with ID={id} is not found."}


@textbook_router.delete("/textbooks/{id}")
async def delete_textbook(id: int) -> dict:
    for i in range(len(textbook_list)):
        todo = textbook_list[i]
        if todo.id == id:
            textbook_list.pop(i)
            return {"message": f"The textbook with ID={id} has been deleted."}

    return {"message": f"The textbook with ID={id} is not found."}