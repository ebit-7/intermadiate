// auth-api.js
const BASE_URL = 'http://localhost:8080'; // gunakan http, bukan https di lokal

export async function doRegister({ email, password }) {
  console.log('[doRegister] Called with:', email, password);

  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log('[doRegister] Response:', response.status, data);

    if (!response.ok) {
      alert('Registrasi gagal: ' + (data.message || response.statusText));
      return false;
    }

    alert('Registrasi berhasil! Silakan login.');
    return true;
  } catch (error) {
    console.error('Error saat registrasi:', error);
    alert('Terjadi kesalahan saat registrasi. Coba lagi.');
    return false;
  }
}

export async function doLogin({ email, password }) {
  console.log('[doLogin] Called with:', email, password);

  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const text = await response.text();
    let data;

    try {
      data = JSON.parse(text);
    } catch {
      alert('Server mengembalikan data tidak valid.');
      return false;
    }

    if (!response.ok) {
      alert('Login gagal: ' + (data.message || response.statusText));
      return false;
    }

    if (data.token) {
      localStorage.setItem('token', data.token);
      return true;
    } else {
      alert('Token tidak ditemukan pada response.');
      return false;
    }
  } catch (error) {
    console.error('[doLogin] Error saat fetch:', error);
    alert('Terjadi kesalahan saat login, coba lagi.');
    return false;
  }
}
