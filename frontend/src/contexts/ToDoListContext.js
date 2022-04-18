import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT || 3001;
const ToDoListContext = createContext();

const ToDoListContextProvider = ({ children }) => {
  const [toDoList, setToDoList] = useState([]);
  const [errorText, setErrorText] = useState("");

  const updateTaskStatus = useCallback((taskId) => {
    fetch(`http://localhost:${BACKEND_PORT}/update/${taskId}`, {
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
        setErrorText("");
        return setToDoList(data);
      })
      .catch((error) => {
        setErrorText("Fail to update task.");
        return;
      });
  }, []);

  useEffect(() => {
    async function getToDoList() {
      await fetch(`http://localhost:${BACKEND_PORT}/`)
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

  const toDoListContextValue = useMemo(
    () => ({
      toDoList,
      errorText,
      updateTaskStatus,
    }),
    [toDoList, updateTaskStatus, errorText]
  );

  return (
    <ToDoListContext.Provider value={toDoListContextValue}>
      {children}
    </ToDoListContext.Provider>
  );
};

export { ToDoListContext, ToDoListContextProvider };
