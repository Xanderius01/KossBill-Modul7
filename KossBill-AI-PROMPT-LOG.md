# Log Prompt AI dan Catatan Perbaikan Manual — KossBill

Dokumen ini adalah **ringkasan prompt/permintaan bantuan AI**, bukan kutipan transkrip lengkap. Hasil setiap perubahan perlu diuji secara manual sebelum dinyatakan lulus.

| Tahap | Ringkasan prompt / permintaan | Hasil pengembangan |
|---|---|---|
| 1 | Implementasikan desain Figma KossBill ke HTML, CSS, dan JavaScript untuk Modul 7. | Prototipe antarmuka dan navigasi awal. |
| 2 | Rapikan tampilan, responsivitas, dan interaksi agar sesuai kebutuhan modul. | Penyempurnaan UI/UX dan kontrol interaktif. |
| 3 | Pisahkan data kos ke JSON, tampilkan daftar dinamis, serta tangani loading/error/hasil kosong. | `data/properties.json`, pemuatan data dengan `fetch()`, dan umpan balik antarmuka. |
| 4 | Perbaiki pencarian, filter, dan perbandingan kos. | Penyempurnaan logika pencarian dan perbandingan. |
| 5 | Tambahkan peta serta pencarian kos berdasarkan nama/lokasi. | Peta dan fallback pencarian alamat bila koordinat tidak tersedia. |
| 6 | Perbaiki alur pemesanan dan riwayat. | Validasi form dan penyimpanan pemesanan simulasi. |
| 7 | Perbaiki login/daftar, wishlist, profil, chat, dan isolasi data per akun. | Data demo per akun di browser melalui `localStorage`. |
| 8 | Hapus listing tanpa foto yang sesuai dan pertahankan listing bergambar. | Penyaringan data listing pada paket terbaru. |
| 9 | Perbarui README, PRD PDF, serta dokumentasi demo mentor dan batasan layanan. | Dokumen penyerahan lebih lengkap dan transparan. |

## Catatan perbaikan manual dan pemeriksaan

- Periksa struktur folder, nama file aset, dan jalur relatif setelah ekstraksi ZIP.
- Jalankan melalui **VS Code + Live Server** supaya `fetch('data/properties.json')` dapat digunakan.
- Cek kembali foto, nama kos, harga, alamat, dan sumber data sebelum memublikasikan informasi.
- Pastikan data yang belum diverifikasi tidak disebut sebagai fakta pasti; lokasi peta hasil geocoding dapat bersifat perkiraan.
- Uji manual login akun A, logout, daftar akun B, wishlist/riwayat kosong untuk B, lalu login kembali ke A.
- Uji validasi form, pemesanan simulasi, dan riwayat dengan data dummy.
- Periksa tampilan desktop dan mobile serta Console browser untuk error.
- Simpan hasil pengujian yang benar-benar dilakukan pada `TESTING.md`. Checklist yang belum dijalankan tidak boleh ditandai lulus.
- Jangan mengklaim integrasi MockAPI, Formspree, backend, transaksi nyata, atau autentikasi aman: versi saat ini tidak memilikinya.
- GitHub dan Netlify adalah dua tujuan berbeda. Jika Netlify belum dihubungkan ke GitHub, pembaruan repository tidak otomatis memperbarui situs publik.

## Transparansi penggunaan AI

AI digunakan untuk membantu menyusun/menyempurnakan kode dan dokumentasi. Pemeriksaan akhir, validasi informasi listing, pengujian browser, dan keputusan publikasi tetap perlu dilakukan oleh tim proyek.
