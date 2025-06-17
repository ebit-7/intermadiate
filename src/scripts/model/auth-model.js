// model/auth-model.js

export async function loginUser({ email, password }) {
  const response = await fetch('https://story-api.dicoding.dev/v1/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login gagal.');
  }

  return data.loginResult; // { token, name, userId }
}

export async function registerUser({ name, email, password }) {
  const response = await fetch('https://story-api.dicoding.dev/v1/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Registrasi gagal.');
  }

  return data;
}

export function saveToken(token) {
  localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage.getItem('token');
}
