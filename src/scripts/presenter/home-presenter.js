import { idbStory } from '../idb.js';
import { getStories } from '../api/story-api.js';

let model, view;

function setDependencies({ modelModule, viewModule }) {
  model = modelModule;
  view = viewModule;
}

async function showHomePage() {
  try {
    const stories = await getStories();
    for (const story of stories) {
      await idbStory.put(story);
    }
    view.renderHome(stories);
  } catch (error) {
    const cached = await idbStory.getAll();
    if (cached.length > 0) {
      view.renderHome(cached);
    } else {
      view.renderError('Tidak ada data yang tersedia.');
    }
  }
}

export default {
  setDependencies,
  showHomePage,
};
