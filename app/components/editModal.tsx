"use client";
import React from "react";
import { Modal, ModalContent, ModalBody } from "@heroui/modal";

import { Game } from "../types/types";

import EditForm from "./EditForm";

type EditModalProps = {
  game: Game;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void | Promise<void>;
};

export default function EditModal({
  game,
  isOpen,
  onClose,
  onSuccess,
}: EditModalProps) {
  return (
    <Modal isOpen={isOpen} scrollBehavior="inside" onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <ModalBody>
            <EditForm game={game} onCancel={onClose} onGameEdited={onSuccess} />
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
}
