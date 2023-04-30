import { useState, createContext, useContext } from "react";

const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {
  const [modalData, setModalData] = useState({
    isModalDisplayed: false,
    modalToRender: "",
    modalContent: {},
  });

  return (
    <ModalContext.Provider value={[modalData, setModalData]}>
      {children}
    </ModalContext.Provider>
  );
};

export const UseModalContext = () => useContext(ModalContext);
