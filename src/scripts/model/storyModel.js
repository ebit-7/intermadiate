// scripts/model/storyModel.js
import { getStories, addStory } from '../api/story-api.js';

export async function getAllStories() {
  return await getStories();
}

export async function postStory(data) {
  return await addStory(data);
}
