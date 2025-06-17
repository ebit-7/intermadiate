const BASE_URL = 'https://story-api.dicoding.dev/v1';

export async function doLogin({ email, password }) {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Login gagal');
    }

    // Simpan token
    localStorage.setItem('token', result.loginResult.token);
    return true;
  } catch (error) {
    alert('Gagal login. Cek email dan password.\n' + error.message);
    return false;
  }
}
