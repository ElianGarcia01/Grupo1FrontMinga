import axios from "axios";

const API = "http://localhost:8080/api";

export const createAuthor = (data) => {
  const token = localStorage.getItem("token");
  return axios.post(`${API}/authors/register`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createCompany = (data) => {
  const token = localStorage.getItem("token");
  return axios.post(`${API}/companies/register`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
