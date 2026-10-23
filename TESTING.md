# Dokumentasi Pengujian KossBill — Modul 8

## Lingkungan
- Editor: Visual Studio Code
- Server lokal: Live Server
- Browser: Google Chrome
- Metode: pengujian manual pada desktop, tablet, dan mobile

## Checklist fungsional

- [ ] Website dijalankan melalui Live Server (bukan `file://`).
- [ ] Data dimuat dari `data/properties.json`.
- [ ] Loading skeleton tampil selama pemuatan data.
- [ ] Jika file JSON tidak tersedia, error state dan tombol **Coba lagi** tampil.
- [ ] Pencarian menyaring nama, lokasi, tipe, dan fasilitas.
- [ ] Filter kategori dan pengurutan berfungsi.
- [ ] Kata kunci tanpa hasil menampilkan empty state; tombol Reset memulihkan hasil.
- [ ] Wishlist dapat ditambah/dihapus dan bertahan setelah halaman dimuat ulang.
- [ ] Detail kos membuka properti yang benar.
- [ ] Form menolak input kosong, nama terlalu pendek, nomor telepon tidak valid, dan tanggal lampau.
- [ ] Tombol form menampilkan status **Mengirim...** saat submit.
- [ ] Pengajuan valid menghasilkan konfirmasi dan muncul pada riwayat.
- [ ] Profil dapat diperbarui; toast muncul sebagai umpan balik.
- [ ] Tidak ada error JavaScript pada Console.

## Checklist responsivitas

- [ ] Mobile (sekitar 375–430 px): tidak ada horizontal overflow; kartu, form, filter, dan navigasi mudah digunakan.
- [ ] Tablet (768 px): grid dan formulir tetap rapi.
- [ ] Desktop (1366 px): hierarki visual, jarak, dan navigasi tampil baik.

## Hasil pengujian

## Pemeriksaan otomatis yang dilakukan pada revisi Stage 1–2
- `node --check script.js`: lulus (sintaks JavaScript valid).
- `data/properties.json`: 52 record valid dengan ID unik; setiap record memiliki nama, lokasi, dan gambar.
- Semua ID elemen HTML yang dirujuk langsung oleh selector JavaScript tersedia.
- Seluruh nama file gambar yang tercantum pada data ditemukan di folder `assets`.
- Pemeriksaan browser interaktif pada perangkat pengguna masih perlu dilakukan; checklist manual di atas belum otomatis dianggap lulus.

Isi status (Lulus/Gagal), tanggal, browser, dan catatan setelah seluruh pengujian dilakukan. Jangan menandai tes manual sebagai lulus sebelum benar-benar diuji pada browser.

## Pengujian tambahan Tahap 3–5

- [x] Sintaks JavaScript lolos `node --check`.
- [x] `data/properties.json` dapat diparse sebagai JSON (52 data sumber pada versi ini).
- [x] HTML berisi section Peta dan Bandingkan serta elemen target yang digunakan JavaScript.
- [x] CSS tema gelap khusus riwayat ditambahkan untuk menghindari teks pucat di kartu putih.
- [x] Perbandingan dibatasi maksimal tiga listing dan disimpan pada localStorage.
- [x] Peta tidak membuat penanda jika data belum memiliki koordinat terverifikasi; daftar sumber tetap tersedia.
- [ ] Pengujian klik end-to-end di browser pengguna belum dilakukan. Uji dengan Live Server dan koneksi internet sebelum demo akhir.


## Skenario tambahan untuk demo mentor (belum otomatis dianggap lulus)

- [ ] Buka URL publik pada mode Incognito tanpa login Netlify.
- [ ] Cari kos berdasarkan nama dan gunakan tombol reset.
- [ ] Pilih kos di peta; catat apakah pin tepat atau hanya hasil pencarian alamat.
- [ ] Simpan wishlist pada akun demo A, logout, masuk akun demo B, pastikan tidak tampil data A.
- [ ] Kembali ke akun A dan pastikan data demo A masih tersedia pada browser yang sama.
- [ ] Isi pemesanan dengan data dummy; periksa validasi, konfirmasi, dan riwayat.
- [ ] Uji chat demo dan pastikan pesan tidak diklaim terkirim ke pengelola.
- [ ] Uji tampilan ponsel, pergantian tema, dan tidak ada error Console.

**Status:** skenario tambahan ini belum dikonfirmasi lulus pada browser pengguna; centang setelah pengujian nyata.
