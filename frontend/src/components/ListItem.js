import React, { useState, useEffect } from "react";

export default function ListItem({ item, updateTaskStatus }) {
  const [itemClassName, setItemClassName] = useState("item");

  useEffect(() => {
    if (item.done) {
      setItemClassName("item is-done");
    } else {
      setItemClassName("item");
    }
  }, [item.done]);

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
