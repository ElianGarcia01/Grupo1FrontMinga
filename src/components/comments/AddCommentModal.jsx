//import { Dialog } from "@headlessui/react"
import { Fragment } from "react"
import CommentForm from "./CommentForm"

const AddCommentModal = ({ isOpen, onClose, onSubmit }) => {
  return (
    <Dialog as={Fragment} open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 z-40 bg-black bg-opacity-40 flex items-center justify-center px-4">
        <Dialog.Panel className="bg-white rounded-xl p-6 max-w-md w-full">
          <Dialog.Title className="text-lg font-semibold mb-4">Add a Comment</Dialog.Title>
          <CommentForm
            onSubmit={(text) => {
              onSubmit(text)
              onClose()
            }}
            placeholder="Write your comment..."
            submitLabel="Post"
          />
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default AddCommentModal