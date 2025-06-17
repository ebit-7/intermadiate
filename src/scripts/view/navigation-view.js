export function renderNavigation() {
  const nav = document.querySelector('nav');
  const token = localStorage.getItem('token');

  nav.innerHTML = `
    <div class="nav-container">
      <div class="brand" tabindex="0" aria-label="My Story Homepage">My Story</div>
      ${
        token
          ? `
            <button class="hamburger" id="hamburgerBtn" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="navList">
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
            </button>
            <ul id="navList" class="nav-list" role="menubar" aria-label="Primary navigation">
              <li role="none"><a role="menuitem" href="#/">Home</a></li>
              <li role="none"><a role="menuitem" href="#/add">Tambah Cerita</a></li>
              <li role="none"><a role="menuitem" href="#" id="logoutLink">Logout</a></li>
            </ul>
          `
          : ''
      }
    </div>
  `;

  // Jika belum login, gak perlu event listener
  if (!token) return;

  // Logout event
  const logoutLink = document.getElementById('logoutLink');
  if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('token');
      window.location.hash = '#/login';
      renderNavigation();
      document.body.classList.remove('nav-open');
    });
  }

  // Toggle hamburger menu
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navList = document.getElementById('navList');

  if (!hamburgerBtn || !navList) return;

  const toggleMenu = () => {
    const isOpen = navList.classList.toggle('show');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
    hamburgerBtn.classList.toggle('active', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
  };

  hamburgerBtn.addEventListener('click', toggleMenu);

  hamburgerBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });

  // Tutup menu saat klik salah satu link
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('show');
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    });
  });
}
