import { openDB } from 'idb';

const DB_NAME = 'story-app-db';
const STORE_NAME = 'stories';

export const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    }
  },
});

export const idbStory = {
  async put(story) {
    // Pastikan story.id ada dan unik
    if (!story.id) {
      throw new Error('Story harus memiliki properti id yang unik');
    }
    const db = await dbPromise;
    return db.put(STORE_NAME, story);
  },
  async getAll() {
    const db = await dbPromise;
    return db.getAll(STORE_NAME);
  },
  async delete(id) {
    const db = await dbPromise;
    return db.delete(STORE_NAME, id);
  }
};
