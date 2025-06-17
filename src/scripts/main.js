// src/scripts/main.js

import '../assets/styles.css';
import { router } from './router.js';
import { renderNavigation } from './view/navigation-view.js';
import { initPush } from './push-notification.js';
import { idbStory } from './idb.js';
import { getStories } from './api/story-api.js';
import storyView from './view/storyView.js';

const { renderStories } = storyView;

/**
 * Fungsi untuk memuat halaman utama dan render cerita
 */
async function loadHomePage() {
  try {
    const stories = await getStories();
    await Promise.all(stories.map(story => idbStory.put(story)));
    renderStories(stories);
  } catch (err) {
    console.warn('⚠️ Fetch failed. Loading from cache...', err);
    const cached = await idbStory.getAll();
    if (cached.length > 0) {
      renderStories(cached);
    } else {
      console.error('❌ No cached stories found.');
    }
  }
}

/**
 * Perbarui tampilan berdasarkan hash route
 */
function updateView() {
  router();
  renderNavigation();

  const token = localStorage.getItem('token');
  const currentHash = window.location.hash;
  const isAuthPage = currentHash === '#/login' || currentHash === '#/register';

  if (token && !isAuthPage) {
    loadHomePage();
  }
}

/**
 * Inisialisasi aplikasi
 */
function init() {
  const token = localStorage.getItem('token');
  const currentHash = window.location.hash;

  if (!token && currentHash !== '#/login' && currentHash !== '#/register') {
    window.location.hash = '#/login';
  } else {
    updateView();
  }
}

// Daftarkan Service Worker dan jalankan Push Notification
window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('✅ Service Worker Registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('❌ Service Worker Registration Failed:', error);
      });
  } else {
    console.warn('⚠️ Service Worker is not supported in this browser.');
  }

  // Inisialisasi Push Notification jika fungsi tersedia
  if (typeof initPush === 'function') {
    initPush();
  }
});

// Perbarui tampilan saat hash berubah
window.addEventListener('hashchange', updateView);

// Jalankan init saat DOM siap
window.addEventListener('DOMContentLoaded', init);
