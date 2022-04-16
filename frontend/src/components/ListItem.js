import React from "react";

export default function ListItem({ item, updateTaskStatus }) {
  let className = "item";
  if (item.done) {
    className += " is-done";
  }

  return (
    <>
      <li
        className={className}
        onClick={(e) => updateTaskStatus(e, item.id)}
      >
        {item.text}
      </li>
    </>
  );
}
