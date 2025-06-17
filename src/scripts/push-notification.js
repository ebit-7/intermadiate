// Ganti dengan VAPID PUBLIC KEY asli dari backend Anda
const VAPID_PUBLIC_KEY = 'BM8s1W9x9Yl5kZ3Io3QpLqz3kEfh0Ua4bvFlZzQOyEmnLV0kJYXp_6d5FX7Y9-k0zIYV8r7M8XPrxS7Zg9qBvRE';

// Fungsi inisialisasi Push Notification
export async function initPush() {
  if (!('Notification' in window)) {
    console.warn('Push Notification tidak didukung browser ini.');
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    console.warn('Push permission ditolak.');
    return;
  }

  const registration = await navigator.serviceWorker.ready;

  try {
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    });

    // Ganti URL di bawah ini dengan endpoint backend asli Anda
    await fetch('https://story-api.dicoding.dev/v1/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('✅ Push Notification berhasil disubscribe dan dikirim ke backend!');
  } catch (err) {
    console.error('❌ Gagal Subscribe Push:', err);
  }
}

// Fungsi helper untuk mengubah base64 ke Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}
