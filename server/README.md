# server

## Table of Contents

- [server](#server)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Folder Structure](#folder-structure)
  - [Usage](#usage)
    - [Documentation](#documentation)
  - [Installation](#installation-fast-api)

## Introduction<a name="introduction"></a>

Our server is written in Fastapi with python.

## Folder Structure<a name="folder-structure"></a>

The project follows a specific folder structure to organize the codebase. Still Organizing the folder structure. Here's an overview of the main directories:

```
src
├── tests
```

- `Test`: This contain the test suite for the server.py which would be divided in the future.

## Usage<a name="usage"></a>
`cd server`
`sudo apt update`
`sudo apt install -y ffmpeg wkhtmltopdf`
`pip install -f requirements.txt`


### Starting Up the App
`uvicorn server:app --reload`

### Test
`pytest -v`

### Documentation

API docs are generated using Swagger. You can access the docs with the `/docs` endpoint.



### Fast API<a name="installation-fast-api"></a>

1. Open a new terminal tab
2. Move to the server now with `cd server/`
3. Install requirements packages on system `sudo apt update`
`sudo apt install -y ffmpeg wkhtmltopdf`
4. Install the packages with `pip install -f requirements.txt`
5. Setup the OpenAI env key with `export OPENAI_API_KEY='key will be here'`
6. Start the app with `uvicorn server:app --reload`
7. Test the app by going to http://localhost:8000
