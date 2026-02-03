"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
} from "@heroui/modal";
import EditForm from "./EditForm";
import { Game } from "../types/types";

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
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalContent>
        {(onClose) => (
          <ModalBody>
            <EditForm game={game} onGameEdited={onSuccess} onCancel={onClose} />
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
}
