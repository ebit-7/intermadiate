// presenter/auth-presenter.js
import { loginUser, registerUser, saveToken } from '../model/auth-model.js';
import { renderLoginForm } from '../view/login-view.js';
import { renderRegisterForm } from '../view/register-view.js';


export function showLogin() {
  renderLoginForm({
    onSubmit: async ({ email, password }) => {
      try {
        const { token } = await loginUser({ email, password });
        saveToken(token); // ✅ menggunakan model
        alert('Login berhasil!');
        window.location.hash = '#/home';
      } catch (err) {
        alert(err.message);
      }
    }
  });
}

export function showRegister() {
  renderRegisterForm({
    onSubmit: async ({ name, email, password }) => {
      try {
        await registerUser({ name, email, password });
        alert('Registrasi berhasil! Silakan login.');
        window.location.hash = '#/login';
      } catch (err) {
        alert(err.message);
      }
    }
  });
}
z