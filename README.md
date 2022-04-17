# ToDoList
Simple To do list app built with React, Nodejs and express
## Deploy locally
To run this project locally, first, clone the project:

```shell
git clone https://github.com/nipponvn0803/ToDoList.git
```

Then install packages for both server and client:

```shell
cd ToDoList/frontend
npm install
cd ../backend
npm install
```

Finally, go back to the root folder start the project:

```shell
cd ..
npm run start
```

The client will be displayed at port 3000 while the server will be listening at port 3001.

## Folder structure

```
.
├── backend
│   ├── index.js              # Entry point
│   ├── server
│   │   └── index.js          # Middlewares
│   ├── routes
│   │    └── index.js         # Express routing (URI and HTTP request)
│   ├── src
│   │   └── toDoList.json     # Initial tasks source
│   └── test                  # Tests
│
└── frontend
    ├── src
    │   ├── index.js          # Entry point, application is mounted
    │   ├── App.js            # Render ListView 
    │   ├── containers
    │   │   └── ListView.js   # Fetch API to connect with server, error message and mapping tasks as a list
    │   ├── components
    │   │   ├── ListHeader.js # Simple header text
    │   │   └── ListItem.js   # Render list item with checkbox, text
    │   ├── App.css           # CSS rules
    │   └── test              # Tests
    │
    └── assets                # Background image
        
```        

## Testing
To run test with coverage:
- In frontend

```shell
cd frontend && npm run test -- --coverage --watchAll=false
```

- In backend

```shell
cd backend && npm run test
```
