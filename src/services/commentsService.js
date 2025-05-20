import axios from 'axios';

const API_URL = 'http://localhost:8080/api/comments';

const getAuthHeaders = (token) => ({
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

export const getCommentsByChapter = async (chapterId) => {
  try {
    const response = await axios.get(`${API_URL}/byChapter/${chapterId}`);
    return response.data.response || [];
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

export const createComment = async (data, token) => {
  try {
    const response = await axios.post(`${API_URL}/create`, data, getAuthHeaders(token));
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      config: error.config
    });
    throw error;
  }
};

export const updateComment = async (commentId, message, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/update/${commentId}`,
      { message },
      getAuthHeaders(token)
    );
    return response.data;
  } catch (error) {
    console.error('Error updating comment:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteComment = async (commentId, token) => {
  try {
    const response = await axios.delete(
      `${API_URL}/delete/${commentId}`,
      getAuthHeaders(token)
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting comment:', error.response?.data || error.message);
    throw error;
  }
};