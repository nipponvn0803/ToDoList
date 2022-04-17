import React, { useEffect, useState } from "react";
import ListHeader from "../components/ListHeader";
import ListItem from "../components/ListItem";

export default function ListView() {
  const [toDoList, setToDoList] = useState([]);

  useEffect(() => {
    async function getToDoList() {
      await fetch(`http://localhost:5000/`)
        .then((response) => response.json())
        .then((data) => {
          setToDoList(data);
        })
        .catch((error) => {
          window.alert(error);
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
