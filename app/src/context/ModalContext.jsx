import { useState, useEffect, createContext, useContext } from "react";

const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {
  return <ModalContext.Provider>{children}</ModalContext.Provider>;
};
