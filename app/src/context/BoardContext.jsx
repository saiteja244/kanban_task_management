import { useState, useEffect, createContext, useContext, useMemo } from "react";
import boards from "../data";

const BoardContext = createContext();

export const BoardContextProvider = ({ children }) => {
  const [boardData, setBoardData] = useState(boards);
  const [activeBoard, setActiveBoard] = useState(boards[0]);

  const changeBoard = (id) => {
    setActiveBoard((_) => {
      return boards.find((board) => board.id === id);
    });

    console.log(activeBoard);
  };

  const memoedValues = useMemo(
    () => ({
      boardData,
      setBoardData,
      activeBoard,
      setActiveBoard,
      changeBoard,
    }),
    [activeBoard, boardData]
  );

  return (
    <BoardContext.Provider value={memoedValues}>
      {children}
    </BoardContext.Provider>
  );
};

export const UseBoardContext = () => useContext(BoardContext);
