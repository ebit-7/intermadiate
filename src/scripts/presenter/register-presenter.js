const BASE_URL = 'https://story-api.dicoding.dev/v1';

export async function doRegister({ name, email, password }) {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Terjadi kesalahan saat registrasi');
    }

    return true;
  } catch (error) {
    alert('Terjadi kesalahan saat registrasi. Coba lagi.\n' + error.message);
    return false;
  }
}
