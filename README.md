# KossBill — Prototipe Web Interaktif Kos

**Demo publik:** https://kossbillpurwokerto.netlify.app/  
**Repositori GitHub:** https://github.com/Xanderius01/KossBill-Modul7  
**Desain Figma:** https://www.figma.com/design/Dx8VDSRZpiPoAKlEYEJIcb/KossBill-Kelompok12?node-id=35-3454

KossBill adalah prototipe front-end responsif untuk membantu mahasiswa menjelajahi pilihan kos di sekitar Purwokerto. Versi terbaru ini melanjutkan proyek Modul 7 dengan data listing terpisah dalam JSON, pencarian dan filter lanjutan, peta, perbandingan kos, wishlist, simulasi pemesanan, chat demo, serta penyimpanan data per akun pada browser.

> **Status:** prototipe akademik/front-end. Login, pemesanan, chat, dan pembayaran bukan layanan produksi; tidak ada backend atau transaksi nyata.

## Menjalankan proyek di VS Code

1. Unduh atau clone repositori ini.
2. Buka folder proyek di VS Code.
3. Pastikan struktur folder `data/` dan `assets/` tidak diubah.
4. Pasang ekstensi **Live Server** jika belum ada.
5. Klik kanan `index.html` → **Open with Live Server**.
6. Pastikan perangkat terhubung ke internet untuk memuat pustaka peta dan tile peta eksternal.

Jangan membuka `index.html` menggunakan skema `file://` jika browser memblokir pembacaan `data/properties.json`; gunakan Live Server.

## Fitur utama

- Beranda rekomendasi dan navigasi ke Cari Kos, Peta, Bandingkan, Wishlist, Riwayat, dan profil.
- Pencarian listing berdasarkan nama, alamat/lokasi, deskripsi, tipe penghuni, dan fasilitas.
- Filter lanjutan, termasuk rentang harga, tipe penghuni, fasilitas, kategori, serta pengurutan.
- Detail listing, informasi harga/fasilitas yang tersedia, dan tautan ke sumber/lokasi.
- Peta interaktif berbasis Leaflet/OpenStreetMap serta pencarian kos pada peta. Ketepatan titik bergantung pada koordinat atau hasil pencarian alamat yang tersedia.
- Perbandingan hingga tiga listing.
- Wishlist, profil demo, riwayat pemesanan, dan chat demo.
- Formulir pemesanan dengan validasi dan status/konfirmasi simulasi.
- Mode terang/gelap dan tampilan responsif.
- Data akun demo dipisahkan menggunakan kunci `localStorage` berdasarkan email akun yang masuk.

## Struktur proyek

```text
KossBill-Modul7/
├── index.html
├── style.css
├── script.js
├── data/
│   ├── properties.json
│   └── SUMBER-DATA.md
├── assets/
├── README.md
├── TESTING.md
├── AI-PROMPT-LOG.md
├── GIT-CHECKLIST.txt
└── PRD-Modul-7.pdf
```

## Pengujian

Lihat [`TESTING.md`](TESTING.md) untuk checklist pengujian manual dan [`AI-PROMPT-LOG.md`](AI-PROMPT-LOG.md) untuk ringkasan penggunaan AI. Lakukan pengujian ulang pada browser yang digunakan sebelum menyerahkan atau memublikasikan perubahan.

## Batasan, data, dan privasi

- Data akun, wishlist, perbandingan, riwayat, profil, dan chat demo tersimpan di `localStorage` pada browser/perangkat tersebut; data tidak otomatis tersinkron ke perangkat lain.
- Pemisahan data berdasarkan email adalah mekanisme demo di sisi browser, **bukan autentikasi aman**. Jangan gunakan kata sandi atau data pribadi sensitif.
- Tidak ada backend/database, sistem otorisasi server, pembayaran nyata, atau pengiriman pemesanan/chat ke pengelola.
- Data listing dan harga dapat berubah. Periksa sumber dan konfirmasi langsung ke pengelola sebelum mengambil keputusan.
- Peta membutuhkan internet. Jika koordinat listing tidak tersedia, pencarian alamat atau tautan peta dapat bersifat perkiraan; jangan menganggapnya sebagai titik bangunan yang telah diverifikasi.
- Foto dan informasi properti hanya boleh dianggap terverifikasi jika memang bersumber dari materi yang telah dikonfirmasi.

## Deployment dan pembaruan

Situs demo saat ini di-host di Netlify: https://kossbillpurwokerto.netlify.app/

Untuk memperbarui situs Netlify secara otomatis setiap kali perubahan di-commit ke GitHub, hubungkan proyek Netlify ke repositori `Xanderius01/KossBill-Modul7` melalui pengaturan deployment Git. Setelah koneksi aktif, push ke branch produksi yang dipilih akan memicu deployment baru. Jika proyek Netlify dibuat melalui upload manual/Netlify Drop, mengubah file di GitHub **tidak otomatis** mengubah situs sampai integrasi Git diatur atau versi baru diunggah.

## Riwayat versi ringkas

- **Modul 7:** prototipe awal dari desain Figma dengan navigasi dan interaksi front-end.
- **Pengembangan lanjutan:** pemisahan data JSON, penyempurnaan pencarian/filter, peta, perbandingan listing, chat demo, mode gelap, dan isolasi penyimpanan demo per akun.
- **Dokumentasi:** PRD diperbarui agar mencerminkan implementasi dan keterbatasan versi terbaru.

## Kontribusi kelompok

Pembagian tugas awal Modul 7 dicatat sebagai berikut. Sesuaikan jika pembagian aktual kelompok berubah:

| Anggota | Fokus tanggung jawab |
|---|---|
| Xanderius Eusebius Verseli | Git, workflow, dan sinkronisasi repositori |
| Christianus Leo Beda | Fidelitas desain dan responsivitas |
| Mario Paulinus Sodho Mogi | Interaktivitas dan logika JavaScript |
| Arvanda Heryan Setiawan | Dokumentasi, PRD, dan pengujian |

## Lisensi dan penggunaan

Proyek ini dibuat untuk keperluan pembelajaran. Pastikan hak penggunaan semua foto, data listing, dan aset eksternal sudah sesuai sebelum menggunakan proyek di luar konteks akademik.
