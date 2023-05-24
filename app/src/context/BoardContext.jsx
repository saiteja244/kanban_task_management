import { useState, createContext, useContext, useEffect } from "react";
import boards from "../data";

const BoardContext = createContext();

export const BoardContextProvider = ({ children }) => {
  const [boardData, setBoardData] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("boards")) || {
        boardCollection: boards,
        activeBoard: boards[0],
      }
    );
  });

  const changeBoard = (id) => {
    setBoardData((prevData) => {
      return {
        ...prevData,
        activeBoard: prevData.boardCollection.find((board) => board.id === id),
      };
    });
  };

  useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(boardData));
  }, [boardData]);

  const values = {
    boardData,
    setBoardData,
    changeBoard,
  };

  return (
    <BoardContext.Provider value={values}>{children}</BoardContext.Provider>
  );
};

export const UseBoardContext = () => useContext(BoardContext);
