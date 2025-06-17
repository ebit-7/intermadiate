// scripts/view-transition.js
export function applyViewTransition(callback) {
  if (!document.startViewTransition) {
    callback();
    return;
  }

  document.startViewTransition(() => {
    callback();
    return Promise.resolve(); // agar animasi berjalan
  });
}
