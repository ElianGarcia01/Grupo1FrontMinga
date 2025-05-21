import { useState, useEffect } from 'react';
import { useAuth } from '../../../hook/useAuth';
import { getCommentsByChapter, createComment, deleteComment, updateComment } from '../../services/commentsService';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';

const ListComments = ({ chapterId }) => {
  const { user, token } = useAuth(); // Asegúrate de obtener también el token de autenticación
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  

  // Cargar comentarios al montar el componente y cuando cambie el chapterId
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const fetchedComments = await getCommentsByChapter(chapterId);
        setComments(fetchedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [chapterId]);

  // Función para enviar un nuevo comentario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user || !token) return;

    try {
      // Crear objeto de comentario según el tipo de usuario
      const commentData = {
        chapter_id: chapterId,
        message: newComment
      };
      
      // Añadir el ID correspondiente según el tipo de usuario
      if (user.author) {
        commentData.author_id = user.author._id;
      } else if (user.company) {
        commentData.company_id = user.company._id;
      }

     let createComment  = await createComment(commentData, token);
      console.log(createComment);
      
      // Recargar comentarios después de agregar uno nuevo
      const updatedComments = await getCommentsByChapter(chapterId);
      setComments(updatedComments);
      setNewComment('');
    } catch (error) {
      console.error('Error creating comment:', error);
      alert('Failed to post comment. Please try again.');
    }
  };

  // Funciones para el menú de opciones
  const handleMenuOpen = (event, comment) => {
    setAnchorEl(event.currentTarget);
    setEditingComment(comment);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setEditingComment(null);
  };

  // Función para eliminar un comentario
  const handleDelete = async () => {
    if (!editingComment || !token) {
      handleMenuClose();
      return;
    }

    try {
      await deleteComment(editingComment._id, token);
      // Actualizar la lista de comentarios después de eliminar
      setComments(comments.filter(c => c._id !== editingComment._id));
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment. Please try again.');
    }
    
    handleMenuClose();
  };

  // Función para iniciar la edición de un comentario
  const handleEditStart = () => {
    if (!editingComment) return;
    
    setEditText(editingComment.message);
    setIsEditing(true);
    handleMenuClose();
  };

  // Función para guardar la edición de un comentario
  const handleEditSave = async () => {
    if (!editingComment || !editText.trim() || !token) {
      setIsEditing(false);
      return;
    }

    try {
      await updateComment(editingComment._id, editText, token);
      
      // Actualizar la lista de comentarios después de editar
      const updatedComments = await getCommentsByChapter(chapterId);
      setComments(updatedComments);
    } catch (error) {
      console.error('Error updating comment:', error);
      alert('Failed to update comment. Please try again.');
    }
    
    setIsEditing(false);
    setEditingComment(null);
  };

  // Función para cancelar la edición
  const handleEditCancel = () => {
    setIsEditing(false);
    setEditingComment(null);
  };

  // Verificar si un comentario pertenece al usuario actual
  const isUserComment = (comment) => {
    if (!user) return false;
    
    if (user.author && comment.author_id) {
      return user.author._id === comment.author_id._id;
    }
    
    if (user.company && comment.company_id) {
      return user.company._id === comment.company_id._id;
    }
    
    return false;
  };

  // Determinar el nombre del autor del comentario
  const getCommentAuthorName = (comment) => {
    if (comment.author_id && comment.author_id.name) {
      return comment.author_id.name;
    }
    
    if (comment.company_id && comment.company_id.name) {
      return comment.company_id.name;
    }
    
    return 'Unknown User';
  };

  // Obtener la foto del usuario que comentó
  const getCommentAuthorPhoto = (comment) => {
    if (comment.author_id && comment.author_id.photo) {
      return comment.author_id.photo;
    }
    
    if (comment.company_id && comment.company_id.photo) {
      return comment.company_id.photo;
    }

    
    return null; // Avatar por defecto si no hay foto
  };

  return (
    <div>
      {user && (user.author || user.company) && (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-3">
            <Avatar src={user.photo} alt={user.name} />
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!newComment.trim()}
            >
              Post
            </Button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="text-center py-4">Loading comments...</div>
      ) : comments.length === 0 ? (
        <div className="text-center py-4">No comments yet.</div>
      ) : (
        <List>
          {comments.map(comment => (
            <div key={comment._id}>
              {isEditing && editingComment && editingComment._id === comment._id ? (
                // Formulario de edición
                <div className="p-3 my-2">
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    multiline
                    rows={2}
                    className="mb-2"
                  />
                  <div className="flex justify-end gap-2">
                    <Button onClick={handleEditCancel} color="secondary">
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleEditSave} 
                      color="primary" 
                      variant="contained"
                      disabled={!editText.trim()}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                // Visualización normal del comentario
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src={getCommentAuthorPhoto(comment)} alt={getCommentAuthorName(comment)} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={getCommentAuthorName(comment)}
                    secondary={
                      <>
                        <span className="text-gray-800">{comment.message}</span>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(comment.createdAt).toLocaleString()}
                        </div>
                      </>
                    }
                  />
                  {isUserComment(comment) && !isEditing && (
                    <>
                      <IconButton onClick={(e) => handleMenuOpen(e, comment)}>
                        <MoreVert />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl && editingComment?._id === comment._id)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={handleEditStart}>Edit</MenuItem>
                        <MenuItem onClick={handleDelete}>Delete</MenuItem>
                      </Menu>
                    </>
                  )}
                </ListItem>
              )}
              <Divider variant="inset" component="li" />
            </div>
          ))}
        </List>
      )}
    </div>
  );
};

export default ListComments;