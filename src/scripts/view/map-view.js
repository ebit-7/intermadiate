// scripts/view/map-view.js

export function renderHomeMap(stories) {
  const containerId = 'homeMap';
  const container = document.getElementById(containerId);
  if (!container) return;

  const map = L.map(containerId).setView([-2.5, 118], 5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  stories.forEach(story => {
    if (story.lat && story.lon) {
      const marker = L.marker([story.lat, story.lon]).addTo(map);
      marker.bindPopup(`
        <b>${story.name || 'Pengguna'}</b><br />
        ${story.description}<br />
        ${new Date(story.createdAt).toLocaleDateString()}
      `);
    }
  });
}

export function renderAddMap({ onLocationSelect }) {
  const containerId = 'addMap';
  const container = document.getElementById(containerId);
  if (!container) return;

  const map = L.map(containerId).setView([-2.5, 118], 5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  let currentMarker = null;

  map.on('click', function (e) {
    const lat = e.latlng.lat.toFixed(6);
    const lon = e.latlng.lng.toFixed(6);

    if (currentMarker) map.removeLayer(currentMarker);

    currentMarker = L.marker([lat, lon]).addTo(map)
      .bindPopup(`Lokasi dipilih:<br>Lat: ${lat}<br>Lon: ${lon}`)
      .openPopup();

    onLocationSelect({ lat, lon });
  });
}
