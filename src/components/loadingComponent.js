// components/loadingComponent.js

export function createLoadingElement() {
  const loading = document.createElement('div');
  loading.id = 'loading';
  loading.style.display = 'none';
  loading.textContent = 'Mengirim...';
  return loading;
}
