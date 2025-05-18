import { Dialog } from "@headlessui/react";
import { Fragment } from "react";
import CommentForm from "./CommentForm";

const CommentOptionsModal = ({ isOpen, onClose, initialText, onEdit, onDelete }) => {
  return (
    <Dialog as={Fragment} open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 z-40 bg-black bg-opacity-40 flex items-center justify-center px-4">
        <Dialog.Panel className="bg-white rounded-xl p-6 max-w-md w-full">
          <Dialog.Title className="text-lg font-semibold mb-4">Edit or Delete</Dialog.Title>

          <CommentForm
            onSubmit={(text) => {
              onEdit(text);
              onClose();
            }}
            submitLabel="Save"
            initialText={initialText}
          />

          <button
            onClick={() => {
              onDelete();
              onClose();
            }}
            className="mt-4 text-sm text-red-500 hover:text-red-700"
          >
            Delete Comment
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CommentOptionsModal;