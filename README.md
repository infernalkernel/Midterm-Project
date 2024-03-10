# Used Textbook App

The Used Textbook App is a web application built with FastAPI on the backend and HTML/CSS/JavaScript on the frontend. It allows users to manage a collection of used textbooks by performing CRUD (Create, Read, Update, Delete) operations.

## Features

- Add new textbooks to the collection with title, ISBN, and description.
- View a list of all textbooks in the collection.
- Edit the details of existing textbooks.
- Delete textbooks from the collection.

## Technologies Used

- [FastAPI](https://fastapi.tiangolo.com/): FastAPI is a modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.
- HTML/CSS/JavaScript: Used for building the frontend user interface and interactivity.
- Bootstrap: CSS framework used for styling the frontend components.
- SQLite (Optional): SQLite database can be integrated with FastAPI for persistent storage of textbook data.

## Getting Started

To get started with the Used Textbook App, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `pip install -r requirements.txt`
3. Run the FastAPI server: `uvicorn main:app --reload`
4. Access the application in your web browser at `http://localhost:8000`

## Usage

- Upon accessing the application, you'll be presented with a list of textbooks (if any).
- You can add new textbooks by clicking the "Add New Textbook" button and filling out the form in the modal.
- To edit a textbook, click the "Edit" button next to the textbook you wish to modify. Update the details in the modal and click "Update".
- To delete a textbook, click the "Delete" button next to the textbook you wish to remove.

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push your changes to the branch (`git push origin feature/new-feature`).
5. Create a new Pull Request.
