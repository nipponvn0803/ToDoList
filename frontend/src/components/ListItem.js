import React from "react";

export default function ListItem({ item, updateTaskStatus }) {
  let itemClassName = "item";
  if (item.done) {
    itemClassName += " is-done";
  }

  return (
    <div className="item-container">
      <label class="checkbox-container">
        <input type="checkbox" checked={item.done} />
        <span class="checkmark"></span>
      </label>
      <li
        className={itemClassName}
        onClick={(e) => updateTaskStatus(e, item.id)}
      >
        {item.text}
      </li>
    </div>
  );
}
