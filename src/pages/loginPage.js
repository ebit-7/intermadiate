import { renderNavigation } from '../scripts/view/navigation-view.js';

export function renderLoginPage({ onSubmit }) {
  const main = document.querySelector('main');
  const nav = document.querySelector('nav');
  const footer = document.querySelector('footer');

  if (nav) nav.style.display = 'block';  // buat tampilkan nav
  if (footer) footer.style.display = 'block';

  main.innerHTML = `
    <section class="login-container">
      <h2>Masuk</h2>
      <form id="login-form" class="styled-form">
        <input type="email" id="email" placeholder="Email" required />
        <input type="password" id="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p class="login-link">Belum punya akun? <a href="#/register">Daftar</a></p>
    </section>
  `;

  renderNavigation(); // panggil nav setelah render halaman

  const form = document.getElementById('login-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    await onSubmit({ email, password });
  });
}
