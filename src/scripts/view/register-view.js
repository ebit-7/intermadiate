export function renderRegisterForm({ onSubmit }) {
  const container = document.querySelector('main'); // ganti dari #app ke <main>

  container.innerHTML = `
    <form id="register-form">
      <h2>Register</h2>
      <input type="text" id="name" placeholder="Nama Lengkap" required />
      <input type="email" id="email" placeholder="Email" required />
      <input type="password" id="password" placeholder="Password" required />
      <button type="submit">Daftar</button>
    </form>
  `;

  document.getElementById('register-form').addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    onSubmit({ name, email, password });
  });
}
