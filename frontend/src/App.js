import React, { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";

const App = () => {
  const [toDoList, setToDoList] = useState([]);

  useEffect(() => {
    async function getToDoList() {
      const response = await fetch(`http://localhost:5000/`)
        .then((response) => response.json())
        .then((data) => {
          setToDoList(data);
        })
        .catch((error) => {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        });
    }

    getToDoList();
    return;
  }, []);

  const updateTaskStatus = async (e, taskId) => {
    e.preventDefault();

    await fetch(`http://localhost:5000/update/${taskId}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        setToDoList(data);
      })
      .catch((error) => {
        window.alert(error);
        return;
      });
  };

  return (
    <div className="app-container">
      <div className="list-container">
        <ListHeader />
        <ul>
          {toDoList.map((item) => (
            <ListItem
              key={item.id}
              item={item}
              updateTaskStatus={updateTaskStatus}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
