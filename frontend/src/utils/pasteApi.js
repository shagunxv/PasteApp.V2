
const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/pastes`;

const getHeaders = () => {
  const token = localStorage.getItem('userToken');

  if (!token) {
    throw new Error('Please log in to continue.');
  }

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

export const fetchPastesAPI = async () => {
  const response = await fetch(API_URL, {
    headers: getHeaders(),
  });

  return handleResponse(response);
};

export const createPasteAPI = async (paste) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      title: paste.title,
      content: paste.content,
    }),
  });

  return handleResponse(response);
};

export const updatePasteAPI = async (id, paste) => {
  const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({
      title: paste.title,
      content: paste.content,
    }),
  });

  return handleResponse(response);
};

export const deletePasteAPI = async (id) => {
  const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });

  return handleResponse(response);
};

export const fetchPasteByIdAPI = async (id) => {
  const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
    headers: getHeaders(),
  });

  return handleResponse(response);
};
