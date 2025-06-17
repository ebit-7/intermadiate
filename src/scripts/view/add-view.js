import { renderAddMap } from './map-view.js';

export function renderAddForm({ onSubmit }) {
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <section class="add-story-container">
      <h2>Tambah Cerita</h2>
      <form id="storyForm" class="styled-form">
        <label for="description">Deskripsi:</label>
        <input type="text" id="description" name="description" placeholder="Tulis deskripsi singkat..." required />

        <label>Ambil Foto:</label>
        <div class="camera-container">
          <video id="camera" autoplay playsinline></video>
          <button type="button" id="takePhoto" class="btn-primary">Ambil Foto</button>
        </div>
        <canvas id="canvas" style="display:none;"></canvas>

        <label for="lat">Latitude:</label>
        <input type="number" id="lat" name="lat" required step="any" placeholder="Contoh: -6.200000" />

        <label for="lon">Longitude:</label>
        <input type="number" id="lon" name="lon" required step="any" placeholder="Contoh: 106.816666" />

        <button type="submit" class="btn-submit">Kirim Cerita</button>
      </form>

      <div id="addMap" class="map-container"></div>
      <div id="loading" class="loading-indicator" style="display:none;">Mengirim...</div>
    </section>
  `;

  const form = document.getElementById('storyForm');
  const video = document.getElementById('camera');
  const canvas = document.getElementById('canvas');
  const takePhotoButton = document.getElementById('takePhoto');

  let capturedBlob = null;

  // Akses kamera dengan facing mode environment (kamera belakang)
  navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch((error) => {
      console.error('Gagal membuka kamera:', error);
      alert('Kamera tidak tersedia atau izin ditolak.');
    });

  takePhotoButton.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      capturedBlob = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
      alert('Foto berhasil diambil!');
    }, 'image/jpeg');
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const description = form.description.value.trim();
    const lat = form.lat.value.trim();
    const lon = form.lon.value.trim();

    if (!capturedBlob) {
      alert('Silakan ambil foto terlebih dahulu!');
      return;
    }

    onSubmit({ description, photo: capturedBlob, lat, lon });
  });

  renderAddMap({
    onLocationSelect: ({ lat, lon }) => {
      form.lat.value = lat;
      form.lon.value = lon;
    }
  });
}

export function showLoading(state) {
  const loading = document.querySelector('.loading-indicator');
  if (loading) {
    loading.style.display = state ? 'block' : 'none';
  }
}

export function showSuccess(message) {
  alert(`Sukses: ${message}`);
}

export function showError(message) {
  alert(`Gagal: ${message}`);
}
