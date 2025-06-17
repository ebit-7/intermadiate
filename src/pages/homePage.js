import homePresenter from '../presenter/home-presenter.js';
import * as storyModel from '../model/storyModel.js';
import * as homeView from '../view/home-view.js';

homePresenter.setDependencies({
  modelModule: storyModel,
  viewModule: homeView,
});

export default function renderHomePage() {
  homePresenter.showHomePage();
}
