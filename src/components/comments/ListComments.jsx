import { useEffect, useState, useContext } from "react";
import Comment from "./Comment";
import AddCommentModal from "./AddCommentModal";
import { AuthContext } from "../../../hook/AuthContext"; // Ajusta la ruta si es necesario

const ListComments = ({ chapterId }) => {
  const [comments, setComments] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    // TODO: reemplazar con fetch real desde backend
    const fakeData = [
      {
        id: "1",
        user: "John",
        userId: "123",
        content: "Amazing chapter!",
        replies: [
          {
            id: "1-1",
            user: "Anna",
            userId: "456",
            content: "Totally agree!",
            replies: [],
          },
        ],
      },
      {
        id: "2",
        user: "Liam",
        userId: "789",
        content: "Loved the artwork",
        replies: [],
      },
    ];
    setComments(fakeData);
  }, [chapterId]);

  const handleAddComment = (text) => {
    if (!user || user.role === 0) return; 

    const newComment = {
      id: Date.now().toString(),
      user: user.name,
      userId: user.id,
      content: text,
      replies: [],
    };
    setComments([...comments, newComment]);
  };

  const handleReply = (parentId, text) => {
    if (!user || user.role === 0) return;

    const updated = comments.map((comment) => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id: Date.now().toString(),
              user: user.name,
              userId: user.id,
              content: text,
              replies: [],
            },
          ],
        };
      }
      return {
        ...comment,
        replies: comment.replies.map((reply) =>
          reply.id === parentId
            ? {
                ...reply,
                replies: [
                  ...reply.replies,
                  {
                    id: Date.now().toString(),
                    user: user.name,
                    userId: user.id,
                    content: text,
                    replies: [],
                  },
                ],
              }
            : reply
        ),
      };
    });
    setComments(updated);
  };

  const handleEdit = (id, newText) => {
    const canEdit = (commentUserId) => user && (user.role === 3 || user.id === commentUserId);

    const updateText = (list) =>
      list.map((item) => {
        if (item.id === id && canEdit(item.userId)) return { ...item, content: newText };
        if (item.replies) {
          return { ...item, replies: updateText(item.replies) };
        }
        return item;
      });

    setComments(updateText(comments));
  };

  const handleDelete = (id) => {
    const canDelete = (commentUserId) => user && (user.role === 3 || user.id === commentUserId);

    const deleteById = (list) =>
      list
        .filter((item) => !(item.id === id && canDelete(item.userId)))
        .map((item) => ({
          ...item,
          replies: deleteById(item.replies || []),
        }));

    setComments(deleteById(comments));
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Comments</h2>

        {/* Mostrar botón sólo si está logueado y rol no es 0 */}
        {user && user.role !== 0 && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add Comment
          </button>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            currentUserId={user?.id}
            currentUserRole={user?.role}
            onReply={handleReply}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <AddCommentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddComment}
      />
    </div>
  );
};

export default ListComments;
