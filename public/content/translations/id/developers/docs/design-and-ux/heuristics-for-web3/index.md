---
title: 7 heuristics for Web3 interface design
description: Principles to improve the usability of Web3
lang: id
---

Heuristik kegunaan adalah "aturan praktis" luas yang dapat Anda gunakan untuk mengukur kegunaan situs Anda.
7 heuristik di sini secara khusus disesuaikan untuk web3 dan harus digunakan bersama dengan [10 prinsip umum untuk desain interaksi](https://www.nngroup.com/articles/ten-usability-heuristics/) dari Jakob Nielsen.

## Tujuh heuristik kegunaan untuk web3 {#seven-usability-heuristics-for-web3}

1. Umpan balik mengikuti tindakan
2. Keamanan dan kepercayaan
3. Info terpenting terlihat jelas
4. Terminologi yang dapat dipahami
5. Tindakan sesingkat mungkin
6. Koneksi jaringan terlihat dan fleksibel
7. Kontrol dari aplikasi, bukan dompet

## Definisi dan contoh {#definitions-and-examples}

### 1. Umpan balik mengikuti tindakan {#feedback-follows-action}

**Harus terlihat jelas ketika sesuatu telah terjadi, atau sedang terjadi.**

Pengguna memutuskan langkah selanjutnya berdasarkan hasil dari langkah sebelumnya. Oleh karena itu, sangat penting bagi mereka untuk tetap mendapat informasi tentang status sistem. Hal ini sangat penting dalam web3 karena transaksi terkadang membutuhkan waktu singkat untuk diterapkan ke blockchain. Jika tidak ada umpan balik yang memberi tahu mereka untuk menunggu, pengguna tidak yakin apakah telah terjadi sesuatu.

**Kiat:** 
- Beri tahu pengguna melalui pesan, notifikasi, dan peringatan lainnya.
- Komunikasikan waktu tunggu dengan jelas.
- Jika suatu tindakan akan memakan waktu lebih dari beberapa detik, yakinkan pengguna dengan pengatur waktu atau animasi untuk membuat mereka merasa seperti ada sesuatu yang sedang terjadi.
- Jika ada beberapa langkah dalam suatu proses, tunjukkan setiap langkahnya.

**Contoh:**
Menunjukkan setiap langkah yang terlibat dalam transaksi membantu pengguna mengetahui di mana mereka berada dalam proses tersebut. Ikon yang sesuai memberi tahu pengguna tentang status tindakan mereka.

![Memberi tahu pengguna tentang setiap langkah saat menukar token](./Image1.png)

### 2. Keamanan dan kepercayaan sudah tertanam {#security-and-trust-are-backed-in}

Keamanan harus diprioritaskan, dan ini harus ditekankan kepada pengguna. 
Orang-orang sangat peduli dengan data mereka. Keamanan sering kali menjadi perhatian utama bagi pengguna, sehingga harus dipertimbangkan di semua tingkat desain. Anda harus selalu berusaha untuk mendapatkan kepercayaan dari pengguna Anda, tetapi cara Anda melakukannya dapat berarti hal yang berbeda pada aplikasi yang berbeda. Hal ini tidak boleh menjadi renungan, tetapi harus dirancang secara sadar di seluruh bagian. Bangun kepercayaan di seluruh pengalaman pengguna, termasuk saluran sosial dan dokumentasi, serta UI akhir. Hal-hal seperti tingkat desentralisasi, status multi tanda tangan perbendaharaan, dan apakah tim tersebut doxxed (identitasnya diketahui publik), semuanya memengaruhi kepercayaan pengguna.

**Kiat:**
- Cantumkan audit Anda dengan bangga
- Dapatkan beberapa audit
- Iklankan fitur keamanan apa pun yang Anda rancang
- Soroti kemungkinan risiko, termasuk integrasi yang mendasarinya
- Komunikasikan kompleksitas strategi
- Pertimbangkan masalah non-UI yang mungkin memengaruhi persepsi keamanan pengguna Anda

**Contoh:** 
Sertakan audit Anda di footer, dengan ukuran yang menonjol.

![Audit direferensikan di footer situs web](./Image2.png)

### 3. Info terpenting terlihat jelas {#the-most-important-info-is-obvious}

Untuk sistem yang kompleks, tampilkan hanya data yang paling relevan. Tentukan apa yang paling penting, dan prioritaskan tampilannya. 
Terlalu banyak informasi akan sangat membebani dan pengguna biasanya berpatokan pada satu informasi saat membuat keputusan. Di DeFi, ini mungkin berupa APR pada aplikasi imbal hasil dan LTV pada aplikasi pinjaman.

**Kiat:**
- Riset pengguna akan mengungkap metrik yang paling penting
- Buat info utama menjadi besar, dan detail lainnya kecil serta tidak mencolok
- Orang tidak membaca, mereka memindai; pastikan desain Anda dapat dipindai

**Contoh:** Token besar dengan warna penuh mudah ditemukan saat memindai. APR-nya besar dan disorot dengan warna aksen.

![Token dan APR mudah ditemukan](./Image3.png)

### 4. Terminologi yang jelas {#clear-terminology}

Terminologi harus dapat dipahami dan sesuai.
Jargon teknis bisa menjadi penghalang besar, karena membutuhkan konstruksi model mental yang sama sekali baru. Pengguna tidak dapat menghubungkan desain dengan kata-kata, frasa, dan konsep yang sudah mereka ketahui. Semuanya tampak membingungkan dan tidak familier, dan ada kurva pembelajaran yang curam sebelum mereka bahkan dapat mencoba menggunakannya. Seorang pengguna mungkin mendekati DeFi karena ingin menyimpan sejumlah uang, dan apa yang mereka temukan adalah: Penambangan, farming, mengunci, emisi, suap, brankas, pengunci, veTokens, vesting, epoch, algoritma desentralisasi, likuiditas milik protokol…
Cobalah untuk menggunakan istilah sederhana yang akan dipahami oleh kelompok orang yang paling luas. Jangan menciptakan istilah baru hanya untuk proyek Anda.

**Kiat:**
- Gunakan terminologi yang sederhana dan konsisten
- Gunakan bahasa yang ada sebanyak mungkin
- Jangan membuat istilah Anda sendiri
- Ikuti konvensi yang muncul
- Edukasi pengguna sebanyak mungkin

**Contoh:**
"Hadiah Anda" adalah istilah netral yang dipahami secara luas; bukan kata baru yang dibuat untuk proyek ini. Hadiah didenominasi dalam USD agar sesuai dengan model mental dunia nyata, meskipun hadiah itu sendiri dalam bentuk token lain.

![Hadiah token, ditampilkan dalam dolar AS](./Image4.png)

### 5. Tindakan sesingkat mungkin {#actions-are-as-short-as-possible}

Percepat interaksi pengguna dengan mengelompokkan sub-tindakan. 
Hal ini dapat dilakukan pada tingkat kontrak pintar, serta UI. Pengguna tidak perlu berpindah dari satu bagian sistem ke bagian lain – atau meninggalkan sistem sepenuhnya – untuk menyelesaikan tindakan umum. 

**Kiat:**
- Gabungkan "Setujui" dengan tindakan lain jika memungkinkan
- Gabungkan langkah-langkah penandatanganan sedekat mungkin

**Contoh:** Menggabungkan "tambah likuiditas" dan "stake" adalah contoh sederhana dari akselerator yang menghemat waktu dan gas pengguna.

![Modal yang menunjukkan tombol untuk menggabungkan tindakan deposit dan stake](./Image5.png)

### 6. Koneksi jaringan terlihat dan fleksibel {#network-connections-are-visible-and-flexible}

Beri tahu pengguna tentang jaringan apa yang terhubung dengan mereka, dan berikan pintasan yang jelas untuk mengubah jaringan. 
Hal ini sangat penting pada aplikasi multichain. Fungsi utama aplikasi harus tetap terlihat saat terputus atau terhubung ke jaringan yang tidak didukung.

**Kiat:**
- Tampilkan sebanyak mungkin bagian aplikasi saat terputus
- Tunjukkan jaringan mana yang saat ini terhubung dengan pengguna
- Jangan membuat pengguna pergi ke dompet untuk mengubah jaringan
- Jika aplikasi mengharuskan pengguna untuk beralih jaringan, minta tindakan dari ajakan bertindak (call to action) utama
- Jika aplikasi berisi pasar atau brankas untuk beberapa jaringan, nyatakan dengan jelas set mana yang sedang dilihat pengguna

**Contoh:** Tunjukkan kepada pengguna jaringan mana yang terhubung dengan mereka, dan izinkan mereka untuk mengubahnya, di bilah aplikasi (appbar).

![Tombol tarik-turun yang menunjukkan jaringan yang terhubung](./Image6.png)

### 7. Kontrol dari aplikasi, bukan dompet {#control-from-the-app-not-the-wallet}

UI harus memberi tahu pengguna semua yang perlu mereka ketahui dan memberi mereka kendali atas semua yang perlu mereka lakukan. 
Di web3, ada tindakan yang Anda ambil di UI, dan tindakan yang Anda ambil di dompet. Umumnya, Anda memulai tindakan di UI, lalu mengonfirmasinya di dompet. Pengguna dapat merasa tidak nyaman jika kedua untaian ini tidak diintegrasikan dengan hati-hati.

**Kiat:**
- Komunikasikan status sistem melalui umpan balik di UI
- Simpan catatan riwayat mereka
- Sediakan tautan ke penjelajah blok untuk transaksi lama
- Sediakan pintasan untuk mengubah jaringan. 

**Contoh:** Wadah yang halus menunjukkan kepada pengguna token relevan apa yang mereka miliki di dompet mereka, dan CTA utama menyediakan pintasan untuk mengubah jaringan.

![CTA utama meminta pengguna untuk beralih jaringan](./Image7.png)