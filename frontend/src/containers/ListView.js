import React, { useContext } from "react";
import ListHeader from "../components/ListHeader";
import ListItem from "../components/ListItem";
import { ToDoListContext } from "../contexts/ToDoListContext";

export default function ListView() {
  const { toDoList, updateTaskStatus, errorText } = useContext(ToDoListContext);

  return (
    <div className="app-container">
      <div className="list-container">
        <ListHeader />
        {errorText && <p data-testid="error-text">{errorText}</p>}
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
