import { renderHomeMap } from './map-view.js';

export function renderHome(stories) {
  const main = document.getElementById('main-content');
  const nav = document.querySelector('nav');
  const footer = document.querySelector('footer');

  if (nav) nav.style.display = 'flex';
  if (footer) footer.style.display = 'block';

  if (!stories.length) {
    main.innerHTML = '<h2>Daftar Cerita</h2><p>Tidak ada cerita.</p>';
    return;
  }

  const storyListHTML = stories.map((story) => `
    <div class="story-card">
      <img src="${story.photoUrl}" alt="Foto oleh ${story.name}" loading="lazy" />
      <div class="story-info">
        <h3>${story.name}</h3>
        <p>${story.description}</p>
        <small>${new Date(story.createdAt).toLocaleString()}</small>
      </div>
    </div>
  `).join('');

  main.innerHTML = `
    <h2>Daftar Cerita</h2>
    <div class="story-grid">${storyListHTML}</div>
    <div id="homeMap" style="height: 400px; margin-top: 2rem;"></div>
  `;

  renderHomeMap(stories);
}
