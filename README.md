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