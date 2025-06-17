import { idbStory } from '../idb.js';

function renderStories(stories) {
  const container = document.getElementById('stories-container');
  if (!container) return;

  container.innerHTML = '';

  stories.forEach(story => {
    // Pastikan setiap story memiliki id unik sebelum render
    if (!story.id) {
      console.warn('Story tanpa id ditemukan, abaikan:', story);
      return;
    }

    const div = document.createElement('div');
    div.classList.add('story-item');

    div.innerHTML = `
      <p>${story.description || 'No description'}</p>
      <small>${new Date(story.createdAt || Date.now()).toLocaleString()}</small>
      <button class="delete-btn" data-id="${story.id}" aria-label="Hapus cerita ini">Hapus</button>
    `;

    container.appendChild(div);
  });

  // Tambahkan event listener hapus ke semua tombol delete
  container.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', async (e) => {
      const id = e.target.dataset.id;
      if (!id) return;

      try {
        await idbStory.delete(id);
        const cachedStories = await idbStory.getAll();
        renderStories(cachedStories);
      } catch (error) {
        console.error('Gagal menghapus story dari IndexedDB:', error);
      }
    });
  });
}

export default { renderStories };
