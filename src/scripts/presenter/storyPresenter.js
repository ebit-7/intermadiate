// scripts/presenter/storyPresenter.js
import * as model from '../model/storyModel.js';

let view;

function setDependencies({ viewModule }) {
  view = viewModule;
}

async function submitStory(formData) {
  try {
    view.showLoading(true);
    const result = await model.postStory(formData);
    view.showSuccess(result.message);
  } catch (error) {
    view.showError(error.message);
  } finally {
    view.showLoading(false);
  }
}

async function showAllStories() {
  try {
    const stories = await model.getAllStories();
    // renderMap() tidak dibutuhkan karena sekarang di-handle oleh view
  } catch (err) {
    console.error('Gagal menampilkan cerita:', err.message);
  }
}

export default {
  setDependencies,
  submitStory,
  showAllStories,
};
