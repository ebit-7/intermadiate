export function renderLoginForm({ onSubmit }) {
  const container = document.querySelector('main'); // sebelumnya #app

  container.innerHTML = `
    <form id="login-form">
      <h2>Login</h2>
      <input type="email" id="email" placeholder="Email" required />
      <input type="password" id="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  `;

  document.getElementById('login-form').addEventListener('submit', e => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    onSubmit({ email, password });
  });
}
