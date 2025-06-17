import { idbStory } from '../model/idb.js';
import { createStoryElement } from '../view/storyView.js';

const savedContainer = document.getElementById('saved-stories');

export async function showSavedStories() {
  const stories = await idbStory.getAll();
  if (!stories.length) {
    savedContainer.innerHTML = '<p>No saved stories.</p>';
    return;
  }

  savedContainer.innerHTML = '';
  stories.forEach((story) => {
    const el = createStoryElement(story);
    savedContainer.appendChild(el);
  });
}
