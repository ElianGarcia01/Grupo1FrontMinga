import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
import { useAuth } from '../../../hook/useAuth';

const ListComments = ({ chapterId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [editingComment, setEditingComment] = useState(null);

  useEffect(() => {
    // Ejemplo de datos - reemplazar con llamada real a la API
    setComments([
      {
        _id: '1',
        user: {
          _id: 'user1',
          name: 'Usuario Ejemplo',
          photo: 'https://i.pravatar.cc/150?img=1'
        },
        text: 'Este capítulo estuvo increíble!',
        createdAt: new Date(),
        replies: []
      }
    ]);
  }, [chapterId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj = {
      _id: Date.now().toString(),
      user: {
        _id: user._id,
        name: user.name,
        photo: user.photo
      },
      text: newComment,
      createdAt: new Date(),
      replies: []
    };

    setComments([newCommentObj, ...comments]);
    setNewComment('');
  };

  const handleMenuOpen = (event, comment) => {
    setAnchorEl(event.currentTarget);
    setEditingComment(comment);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setEditingComment(null);
  };

  const handleDelete = () => {
    setComments(comments.filter(c => c._id !== editingComment._id));
    handleMenuClose();
  };

  const handleEdit = () => {
    // Lógica de edición aquí
    handleMenuClose();
  };

  return (
    <div>
      {user && (
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
      
      <List>
        {comments.map(comment => (
          <div key={comment._id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar src={comment.user.photo} alt={comment.user.name} />
              </ListItemAvatar>
              <ListItemText
                primary={comment.user.name}
                secondary={
                  <>
                    <span className="text-gray-800">{comment.text}</span>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(comment.createdAt).toLocaleString()}
                    </div>
                  </>
                }
              />
              {user?._id === comment.user._id && (
                <>
                  <IconButton onClick={(e) => handleMenuOpen(e, comment)}>
                    <MoreVert />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl && editingComment?._id === comment._id)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleEdit}>Edit</MenuItem>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                  </Menu>
                </>
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    </div>
  );
};

export default ListComments;