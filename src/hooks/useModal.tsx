import { useState } from "react";

export const useModal = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return { showModal, setShowModal };
};
