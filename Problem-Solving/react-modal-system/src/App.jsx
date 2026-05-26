import Modal from "./components/Modal";
import { ModalProvider } from "./components/ModalProvider";
import useModal from "./hooks/useModal";

const btnStyle = {
  padding: "10px 18px",
  margin: "10px",
  borderRadius: "8px",
  border: "none",
  background: "#4f46e5",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "600",
};

const Content = () => {
  const { activeModal, openModal, closeModal } = useModal();

  return (
    <div>
      {/* 👉 এখানে use করো */}
      <button style={btnStyle} onClick={() => openModal("modal1")}>
        Open Modal 1
      </button>

      <button style={btnStyle} onClick={() => openModal("modal2")}>
        Open Modal 2
      </button>

      <Modal isOpen={activeModal === "modal1"} onClose={closeModal}>
        <h2>Modal 1</h2>
      </Modal>

      <Modal isOpen={activeModal === "modal2"} onClose={closeModal}>
        <h2>Modal 2</h2>
      </Modal>
    </div>
  );
};

function App() {
  return (
    <ModalProvider>
      <Content />
    </ModalProvider>
  );
}

export default App;