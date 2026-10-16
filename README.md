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

1. Ekstrak ZIP proyek ke folder yang mudah ditemukan.
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

## Saran alur Git untuk memenuhi rubrik

Jalankan dari terminal VS Code di dalam folder proyek:

```bash
git init
git add index.html
git commit -m "chore: add initial KossBill page structure"

git add style.css
git commit -m "style: create responsive KossBill layout"

git add script.js
git commit -m "feat: add search filters and property cards"

git add assets
git commit -m "assets: add exported KossBill design references"

git add README.md PRD-Modul-7.pdf
git commit -m "docs: add project guide and Modul 7 PRD"
```

Lalu buat repository **public** di GitHub, hubungkan remote sesuai URL repository milikmu, dan jalankan:

```bash
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin main
```

Ganti `USERNAME/NAMA-REPO` dengan repository kamu sendiri. Jangan mengaku sudah push sebelum benar-benar melakukannya.

## Checklist sebelum dikumpulkan

- [ ] Jalankan website melalui Live Server.
- [ ] Uji pencarian, filter, wishlist, detail, pemesanan, dan riwayat.
- [ ] Uji lebar layar desktop dan ponsel.
- [ ] Pastikan tidak ada error di Console browser.
- [ ] Buat repository GitHub publik.
- [ ] Pastikan minimal 5 commit yang benar-benar dilakukan.
- [ ] Perbarui README dengan nama anggota/kontribusi kelompok bila dibutuhkan dosen.
- [ ] Tambahkan URL repository GitHub ke dokumen pengumpulan.

## Repository GitHub

https://github.com/Xanderius01/KossBill-Modul7