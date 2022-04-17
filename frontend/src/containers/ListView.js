import React, { useEffect, useState } from "react";
import ListHeader from "../components/ListHeader";
import ListItem from "../components/ListItem";

export default function ListView() {
  const [toDoList, setToDoList] = useState([]);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    async function getToDoList() {
      await fetch(`http://localhost:3001/`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          setErrorText("Fail to fetch tasks list.");
          throw new Error("Fail to fetch tasks list.");
        })
        .then((data) => {
          return setToDoList(data);
        })
        .catch((error) => {
          setErrorText("Fail to fetch tasks list.");
          return;
        });
    }

    getToDoList();
    return;
  }, []);

  const updateTaskStatus = async (taskId) => {
    await fetch(`http://localhost:3001/update/${taskId}`, {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        setErrorText("Fail to update task.");
        throw new Error("Fail to update task.");
      })
      .then((data) => {
        return setToDoList(data);
      })
      .catch((error) => {
        setErrorText("Fail to update task.");
        return;
      });
  };

  return (
    <div className="app-container">
      <div className="list-container">
        <ListHeader />
        <p data-testid="error-text">{errorText}</p>
        <ul className="item-list">
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
}
