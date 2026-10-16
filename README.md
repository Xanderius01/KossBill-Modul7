# KossBill — Prototipe Web Interaktif (Modul 7)

KossBill adalah prototipe front-end responsif untuk mencari kos, melihat detail properti, menyimpan wishlist, mengajukan pemesanan simulasi, dan melihat riwayat. Proyek dibuat menggunakan HTML, CSS, dan JavaScript murni agar mudah dipelajari dan dijalankan melalui VS Code.

## Struktur folder

```text
KossBill-Modul7/
├── index.html
├── style.css
├── script.js
├── README.md
├── PRD-Modul-7.pdf
└── assets/
    ├── KossBill-Kelompok12.svg
    ├── Home.jpg
    ├── Login.jpg
    ├── Daftar.jpg
    ├── Cari-kost-list.jpg
    ├── Detail-Kost.jpg
    ├── Pemesanan.jpg
    ├── History.jpg
    ├── Bookmark.jpg
    └── gambar pendukung ...
```

## Cara menjalankan di VS Code

1. Clone repositori atau unduh proyek ke folder yang mudah ditemukan.
2. Buka VS Code → **File → Open Folder** → pilih folder `KossBill-Modul7`.
3. Pasang ekstensi **Live Server** jika belum tersedia.
4. Klik kanan `index.html` → **Open with Live Server**.
5. Website akan terbuka di browser. Tidak perlu menginstal Node.js atau database untuk prototipe ini.

Alternatif: buka `index.html` langsung di browser, tetapi Live Server lebih disarankan.

## Fitur yang dapat diuji

- Navigasi Beranda, Cari Kos, Wishlist, Riwayat, dan Profil.
- Pencarian berdasarkan nama kos, daerah, tipe, atau fasilitas.
- Filter kategori: Terdekat, Sewa Tahunan, Sewa Bulanan, dan Termurah.
- Pengurutan berdasarkan rekomendasi, harga terendah/tertinggi, dan rating.
- Simpan/hapus kos dari wishlist.
- Detail properti, fasilitas, rating, dan ringkasan harga.
- Formulir pemesanan dengan validasi, durasi sewa, dan pilihan metode pembayaran.
- Konfirmasi pengajuan serta riwayat pemesanan.
- Edit profil demo.
- Wishlist, riwayat, dan profil disimpan di `localStorage` browser.

## Catatan penting

Ini adalah **prototipe front-end untuk tugas**, bukan layanan kos sungguhan. Tidak ada autentikasi aman, backend, pembayaran, atau pengiriman data ke server. Data properti merupakan konten demo yang disusun untuk menunjukkan alur interaksi. Jangan memasukkan data pribadi sensitif.

## Acuan desain dan rubrik

- Figma KossBill Kelompok 12: https://www.figma.com/design/Dx8VDSRZpiPoAKlEYEJIcb/KossBill-Kelompok12?node-id=35-3454
- Implementasi ini mengacu pada ekspor desain Figma yang disediakan. Karena desain sumber berupa tangkapan layar dan SVG, beberapa elemen disusun ulang sebagai komponen HTML responsif dan interaktif.
- Rubrik Modul 7 yang dibagikan: repositori GitHub publik, commit deskriptif, kesesuaian visual dan responsivitas, minimal dua interaksi dinamis, serta dokumentasi/PRD.

## Kontribusi Anggota Kelompok 12

Pembagian tugas mengikuti empat pilar penilaian Modul 7. Setiap pilar bernilai 25%, sehingga beban kerja dibagi rata dan adil untuk empat anggota.

| No | Nama | Pilar Modul 7 | Bobot | Fokus Tanggung Jawab |
|----|------|---------------|-------|----------------------|
| 1 | Xanderius Eusebius Verseli | Git & Workflow | 25% | Pengelolaan repositori GitHub dan riwayat commit |
| 2 | Christianus Leo Beda | Fidelitas Desain & Responsif | 25% | Kesesuaian tampilan dengan Figma Modul 5 di semua ukuran layar |
| 3 | Mario Paulinus Sodho Mogi | Interaktivitas | 25% | Fitur dinamis dan logika JavaScript |
| 4 | Arvanda Heryan Setiawan | Dokumentasi & PRD | 25% | PRD, README, log prompt AI, dan catatan perbaikan |

### Rincian tugas per anggota

#### 1. Xanderius Eusebius Verseli — Git & Workflow
- Membuat dan menginisialisasi repositori publik `KossBill-Modul7`.
- Menyusun struktur folder, `.gitignore`, dan konfigurasi awal proyek.
- Menetapkan konvensi pesan commit (`feat:`, `style:`, `docs:`, `assets:`, `fix:`).
- Memastikan riwayat commit berkala (minimal 5 commit) dengan pesan deskriptif.
- Menggabungkan hasil kerja anggota lain dan menjaga repositori tetap rapi.
- Mengaktifkan GitHub Pages sebagai demo publik (opsional).

#### 2. Christianus Leo Beda — Fidelitas Desain & Responsif
- Mengekstraksi hierarki elemen, warna, tipografi, dan aset dari Figma Modul 5.
- Menyusun `style.css` beserta token visual (warna, spasi, radius, font).
- Menerapkan tata letak responsif untuk mobile, tablet, dan desktop.
- Menguji agar tidak ada broken layout di berbagai lebar layar.
- Mencocokkan hasil akhir dengan desain Figma (proporsi dan hierarki visual).

#### 3. Mario Paulinus Sodho Mogi — Interaktivitas
- Mengimplementasikan `script.js` dengan interaksi stateful:
  - pencarian kos (nama, daerah, tipe, fasilitas),
  - filter kategori dan pengurutan (harga, rating),
  - wishlist (simpan dan hapus),
  - form pemesanan dengan validasi, serta riwayat pemesanan,
  - penyimpanan data dengan `localStorage`.
- Memastikan aplikasi bebas crash dan error di Console browser.
- Menguji seluruh alur interaksi dari awal sampai akhir.

#### 4. Arvanda Heryan Setiawan — Dokumentasi & PRD
- Menyusun Product Requirement Document (PRD) dalam format PDF.
- Melengkapi `README.md`: panduan menjalankan, link Figma, kontribusi anggota.
- Mencatat log prompt AI yang digunakan selama pengerjaan.
- Mencatat catatan perbaikan manual (bug dan koreksi hasil AI).
- Menyusun `TESTING.md` berisi hasil pengujian.

### Tanggung jawab bersama
- Setiap anggota menyumbang contoh prompt AI untuk bagian yang dikerjakannya ke log prompt.
- Setiap anggota melaporkan bug atau perbaikan manual yang ia lakukan ke penanggung jawab dokumentasi.
- Hasil kerja ditinjau bersama sebelum digabungkan ke branch `main`.
- Setiap anggota ikut menguji aplikasi sebelum pengumpulan.

## Log Prompt AI

AI digunakan sebagai pendamping dalam memahami tugas, mengembangkan prototipe website, menggunakan Git dan GitHub, serta menyusun dokumentasi dan pengujian proyek KossBill. Hasil dari AI ditinjau dan diuji oleh kelompok.

| No | Tahap | Prompt |
|----|-------|--------|
| 1 | Memahami tugas | Pelajari dan pahami instruksi Modul 7 beserta rubrik penilaiannya. |
| 2 | Menganalisis desain Figma | Gunakan desain Figma KossBill sebagai referensi pembuatan website. |
| 3 | Membuat website | Buat proyek KossBill dari awal menggunakan HTML, CSS, dan JavaScript di VS Code. |
| 4 | Membuat fitur interaktif | Tambahkan navigasi, pencarian, filter kos, wishlist, detail kos, pemesanan, dan riwayat. |
| 5 | Git dan GitHub | Bantu saya mengatur Git, membuat commit, dan mengunggah proyek ke GitHub. |
| 6 | Dokumentasi proyek | Bantu lengkapi README.md, PRD, dan dokumentasi pengujian. |
| 7 | Pengujian responsivitas | Bantu saya menguji tampilan mobile, tablet, dan desktop. |
| 8 | Memperbarui TESTING.md | Perbarui dokumentasi berdasarkan hasil pengujian responsivitas yang telah dilakukan. |
| 9 | Sinkronisasi GitHub | Bantu periksa dan sinkronkan perubahan file antara VS Code dan GitHub. |

## Catatan Perbaikan Manual

Peninjauan dan penyesuaian hasil AI yang dilakukan anggota kelompok.

| No | Anggota | Perbaikan / peninjauan manual |
|----|---------|-------------------------------|
| 1 | Xanderius Eusebius Verseli (Git & Workflow) | Memeriksa dan menyinkronkan perubahan file antara VS Code dan GitHub, serta merapikan isi repositori sebelum pengumpulan. |
| 2 | Christianus Leo Beda (Fidelitas & Responsif) | Karena sumber desain berupa tangkapan layar dan SVG, menyusun ulang elemen Figma menjadi komponen HTML responsif; menyesuaikan warna aksen hijau, kartu membulat, serta navigasi atas (desktop) dan bawah (ponsel); menguji tampilan di ponsel, tablet, dan desktop. |
| 3 | Mario Paulinus Sodho Mogi (Interaktivitas) | Menguji manual alur pencarian, filter, pengurutan, wishlist, formulir pemesanan, dan riwayat; memeriksa validasi formulir dan penyimpanan localStorage; memastikan tidak ada error di Console browser. |
| 4 | Arvanda Heryan Setiawan (Dokumentasi & PRD) | Memperbarui TESTING.md berdasarkan hasil uji responsivitas, serta menyesuaikan README dan PRD dengan kondisi proyek (kontribusi anggota, tautan GitHub, log prompt, dan penghapusan teks template). |

## Repository GitHub

https://github.com/Xanderius01/KossBill-Modul7