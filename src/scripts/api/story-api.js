// scripts/api/story-api.js
const BASE_URL = 'https://story-api.dicoding.dev/v1';

export function getToken() {
  return localStorage.getItem('token');
}

export async function getStories() {
  const token = getToken();
  if (!token) throw new Error('Token tidak ditemukan. Silakan login.');

  const res = await fetch(`${BASE_URL}/stories`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error('Gagal memuat cerita');
  const data = await res.json();
  return data.listStory;
}

export async function addStory({ description, photo, lat, lon }) {
  const token = getToken();
  if (!token) throw new Error('Token tidak ditemukan. Silakan login.');

  const formData = new FormData();
  formData.append('description', description);
  formData.append('photo', photo);
  if (lat && lon) {
    formData.append('lat', lat);
    formData.append('lon', lon);
  }

  const res = await fetch(`${BASE_URL}/stories`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Gagal mengirim cerita');
  }

  return res.json();
}
