// pages/renderAddStoryPage.js
import addPresenter from '../presenter/add-presenter.js';
import * as storyModel from '../model/storyModel.js';
import * as addView from '../view/add-view.js';

addPresenter.setDependencies({
  modelModule: storyModel,
  viewModule: addView,
});

export default function renderAddStoryPage() {
  addPresenter.showAddForm();
}
