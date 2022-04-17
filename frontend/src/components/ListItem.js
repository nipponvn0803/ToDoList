import React from "react";

export default function ListItem({ item, updateTaskStatus }) {
  let itemClassName = "item";
  if (item.done) {
    itemClassName += " is-done";
  }

  return (
    <div className="item-container" data-testid="item-container">
      <label className="checkbox-container">
        <input
          type="checkbox"
          checked={item.done}
          data-checked={item.done}
          onChange={() => updateTaskStatus(item.id)}
          data-testid="item-checkbox"
        />
        <span className="checkmark"></span>
      </label>
      <li
        className={itemClassName}
        onClick={() => updateTaskStatus(item.id)}
        data-testid="item-text"
      >
        {item.text}
      </li>
    </div>
  );
}
