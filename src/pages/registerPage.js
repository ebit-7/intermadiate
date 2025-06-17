import { doRegister } from '../scripts/presenter/register-presenter.js';

export function showRegisterPage() {
  const main = document.getElementById('main-content');

  main.innerHTML = `
    <section class="login-container">
      <h2>Daftar Akun</h2>
      <form id="registerForm" class="styled-form" novalidate>
        <input type="text" id="name" name="name" placeholder="Nama Lengkap" required minlength="3" />
        <input type="email" id="email" name="email" placeholder="Email" required />
        <input type="password" id="password" name="password" placeholder="Password" required minlength="6" />
        
        <button type="submit" id="submitBtn">Daftar</button>
        <p id="errorMsg" style="color: red; margin-top: 10px; display: none;"></p>
      </form>
      <p class="login-link">Sudah punya akun? <a href="#/login">Masuk</a></p>
    </section>
  `;

  const form = document.getElementById('registerForm');
  const submitBtn = document.getElementById('submitBtn');
  const errorMsg = document.getElementById('errorMsg');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorMsg.style.display = 'none';
    errorMsg.textContent = '';

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    if (name.length < 3) {
      errorMsg.textContent = 'Nama lengkap minimal 3 karakter.';
      errorMsg.style.display = 'block';
      return;
    }

    if (password.length < 6) {
      errorMsg.textContent = 'Password minimal 6 karakter.';
      errorMsg.style.display = 'block';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Mendaftar...';

    try {
      const success = await doRegister({ name, email, password });
      if (success) {
        form.reset();
        window.location.hash = '#/login';
      } else {
        errorMsg.textContent = 'Registrasi gagal, silakan coba lagi.';
        errorMsg.style.display = 'block';
      }
    } catch (error) {
      errorMsg.textContent = `Error: ${error.message || 'Terjadi kesalahan.'}`;
      errorMsg.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Daftar';
    }
  });
}
