import React from "react";
import ListView from "./containers/ListView";
import { ToDoListContextProvider } from "./contexts/ToDoListContext";
import "./App.css";

const App = () => {
  return (
    <ToDoListContextProvider>
      <ListView />
    </ToDoListContextProvider>
  );
};

export default App;
