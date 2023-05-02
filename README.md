# FARMSTACK Todo

This project is a web-based Task Manager application developed using ReactJS on the frontend and FastAPI with MongoDB on the backend. The application allows users to add, edit, and delete tasks with a user-friendly interface. 
The App component is the main component of the application, and it contains the logic for handling user input, fetching and displaying data, and rendering the user interface.

Backend part of the application that has CRUD functionality and the code is divided into three files:

* database.py file contains the code to interact with MongoDB database using the Motor library. It contains methods to fetch one or all todos, create a new todo, update an existing todo and remove a todo.

* model.py file contains a data model for a Todo using the Pydantic library.

* main.py file contains the FastAPI app that defines routes and API endpoints for the Todo list. It uses the methods defined in database.py to interact with the MongoDB database.

Lastly, the CORS middleware is added to allow Cross-Origin Resource Sharing between the frontend and backend.

## How to get app started

* Open two terminal windows for both frontend and backend.

### Backend

* Depending on which virtual environment you're using install the requirements.txt files.
For pipenv then run pipenv install.

* uvicorn main:app --reload : --reload flag enables auto-reloading, so that the server will automatically restart whenever there are changes to the code.

### Frontend

* npm i to install all package.json dependencies, then run npm install.