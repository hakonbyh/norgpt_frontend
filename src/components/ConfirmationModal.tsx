import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

interface ResetConfirmationModalProps {
  title: string;
  body: string;
  buttons: string[];
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ResetConfirmationModal: React.FC<ResetConfirmationModalProps> = ({
  title,
  body,
  buttons,
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{body}</ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            {buttons[0]}
          </Button>
          <Button variant="ghost" onClick={onConfirm}>
            {buttons[1]}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ResetConfirmationModal;
