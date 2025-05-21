import axios from 'axios';

const API_URL = 'http://localhost:8080/api/comments';

// Función reutilizable para los headers con token
const getHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

// Obtener los comentarios de un capítulo usando la ruta correcta
export const getCommentsByChapter = async (chapterId) => {
  try {
    const response = await axios.get(`${API_URL}/allComments`, {
      params: { chapter_id: chapterId },
    });
    return response.data.response || [];
  } catch (error) {
    console.error('Error fetching comments:', error.response?.data || error.message);
    throw error;
  }
};

// Crear un comentario (requiere token)
export const createComment = async (data, token) => {
  if (!token) {
    console.error("No token provided to createComment");
    throw new Error("Authentication token is required");
  }

  try {
    const response = await axios.post(`${API_URL}/create`, data, getHeaders(token));
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error.response?.data || error.message);
    throw error;
  }
};

// Actualizar un comentario (requiere token)
// export const updateComment = async ( chapterId, isMyComment, newText, effectiveToken) => {
//   if (!token) {
//     console.error("No token provided to updateComment");
//     throw new Error("Authentication token is required");
//   }

//   try {
//     const response = await axios.put(
//       `${API_URL}/update/${commentId}`,
//       { message },
//       getHeaders(token)
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Error updating comment:', error.response?.data || error.message);
//     throw error;
//   }
// };

export const updateComment = async (commentId, newText, token) => {
  if (!token) {
    console.error("No token provided to updateComment");
    throw new Error("Authentication token is required");
  }

  try {
    const response = await axios.put(
      `${API_URL}/update/`,
      { _id: commentId, message: newText },
      getHeaders(token)
    );
    return response.data;
  } catch (error) {
    console.error('Error updating comment:', error.response?.data || error.message);
    throw error;
  }
};


// Eliminar un comentario (requiere token)
export const deleteComment = async (commentId, token) => {
  if (!token) {
    console.error("No token provided to deleteComment");
    throw new Error("Authentication token is required");
  }

  try {
    const response = await axios.delete(`${API_URL}/delete/${commentId}`, getHeaders(token));
    return response.data;
  } catch (error) {
    console.error('Error deleting comment:', error.response?.data || error.message);
    throw error;
  }
};
