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

## Sumber data dan layanan yang digunakan (untuk penilaian)

| Komponen | Implementasi saat ini | Cara kerja / batasan |
|---|---|---|
| Data kos | `data/properties.json` (40 entri pada paket ini) | Dibaca melalui `fetch()` dari website; harga dan ketersediaan harus dikonfirmasi ke sumber/pengelola. |
| Referensi listing | Rujukan Mamikos dan tautan Google Maps yang dicatat dalam `data/SUMBER-DATA.md` | Sumber beragam; **bukan** verifikasi independen bahwa seluruh data masih akurat. |
| Foto listing | File lokal di `assets/` | Foto yang ditambahkan ke proyek tidak otomatis membuktikan kepemilikan atau izin penggunaan; verifikasi hak pakai sebelum publikasi luas. |
| Peta | Leaflet/OpenStreetMap, pencarian lokasi eksternal, dan fallback Google Maps | Membutuhkan internet; titik dapat berupa perkiraan ketika koordinat presisi tidak tersedia. |
| Form pemesanan | JavaScript + `localStorage` | **Simulasi**: validasi input dan penyimpanan riwayat lokal, bukan pengiriman ke pengelola. |
| Login/daftar, wishlist, profil, chat | JavaScript + `localStorage` | Demo per browser; bukan backend atau autentikasi aman. |
| MockAPI / Formspree | **Belum digunakan** | Tidak ada endpoint MockAPI/Formspree pada versi ini; jangan diklaim sudah terhubung. |

## Panduan demo untuk mentor/dosen (± 5–10 menit)

1. **Beranda** — buka [demo publik](https://kossbillpurwokerto.netlify.app/), perlihatkan navigasi dan rekomendasi kos.
2. **Cari Kos** — buka menu **Cari Kos**, masukkan kata kunci nama/lokasi, terapkan filter, lalu reset untuk menunjukkan perubahan hasil.
3. **Detail Kos** — pilih salah satu kartu kos, cek informasi, foto, fasilitas, harga, dan lokasi yang tersedia.
4. **Peta** — buka menu **Peta**, cari nama kos, dan tunjukkan lokasi/hasil pencarian. Jelaskan bahwa lokasi bisa perkiraan jika koordinat asli belum diverifikasi.
5. **Bandingkan & Wishlist** — pilih beberapa kos untuk dibandingkan, kemudian simpan satu kos ke wishlist.
6. **Akun demo** — daftar atau login dengan **email dan kata sandi khusus demo**, bukan kredensial pribadi penting.
7. **Pemesanan simulasi** — pilih kos dengan harga yang tersedia, isi formulir menggunakan **data dummy**, tunjukkan validasi dan konfirmasi, lalu buka **Riwayat**.
8. **Data per akun** — logout, masuk dengan akun demo lain, dan perlihatkan bahwa wishlist/riwayat akun sebelumnya tidak ditampilkan pada alur normal.
9. **Chat & tampilan** — coba chat demo (pesan tidak terkirim ke pengelola), ganti tema terang/gelap, lalu uji tampilan ponsel.

**Catatan demo:** bila fitur tertentu tidak tampil atau gagal pada perangkat mentor, catat hasil sebenarnya di `TESTING.md`; jangan mengklaim seluruh skenario telah lulus sebelum diuji.

## Prompt AI dan perbaikan manual

Baca [`AI-PROMPT-LOG.md`](AI-PROMPT-LOG.md) untuk ringkasan permintaan bantuan AI dan perubahan yang dilakukan. Baca [`TESTING.md`](TESTING.md) untuk checklist dan batasan bukti pengujian. Log bersifat ringkasan kerja, bukan transkrip lengkap percakapan.

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
