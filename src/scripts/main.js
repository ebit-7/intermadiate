import '../assets/styles.css';
import { router } from './router.js';
import { renderNavigation } from './view/navigation-view.js';
import { initPush } from './push-notification.js';
import { idbStory } from './idb.js';
import { getStories } from './api/story-api.js';
import storyView from './view/storyView.js';

const { renderStories } = storyView;

/**
 * Load and render stories on the homepage.
 */
async function loadHomePage() {
  try {
    const stories = await getStories();
    await Promise.all(stories.map(story => idbStory.put(story)));
    renderStories(stories);
  } catch (error) {
    console.warn('⚠️ Failed to fetch stories. Trying to load from cache...', error);
    const cachedStories = await idbStory.getAll();

    if (cachedStories.length > 0) {
      renderStories(cachedStories);
    } else {
      console.error('❌ No cached stories available.');
    }
  }
}

/**
 * Update the view based on current route and auth status.
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
 * Initialize the app based on auth and routing.
 */
function init() {
  const token = localStorage.getItem('token');
  const currentHash = window.location.hash;

  const isAuthPage = currentHash === '#/login' || currentHash === '#/register';

  if (!token && !isAuthPage) {
    window.location.hash = '#/login';
  } else {
    updateView();
  }
}

/**
 * Register the service worker and initialize push notifications.
 */
window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('✅ Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('❌ Service Worker registration failed:', error);
      });
  } else {
    console.warn('⚠️ This browser does not support Service Workers.');
  }

  // Initialize push notifications (if available)
  if (typeof initPush === 'function') {
    initPush();
  }
});

// Update the view on hash change (client-side routing)
window.addEventListener('hashchange', updateView);

// Initialize the app when DOM is fully loaded
window.addEventListener('DOMContentLoaded', init);
