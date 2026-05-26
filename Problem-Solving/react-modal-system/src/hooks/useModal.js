import { useModalContext } from "../components/ModalProvider";

const useModal = () => {
  return useModalContext();
};

export default useModal;