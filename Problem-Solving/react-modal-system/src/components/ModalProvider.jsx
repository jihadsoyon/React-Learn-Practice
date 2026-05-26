import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (name) => setActiveModal(name);
  const closeModal = () => setActiveModal(null);

  return (
    <ModalContext.Provider
      value={{ activeModal, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);