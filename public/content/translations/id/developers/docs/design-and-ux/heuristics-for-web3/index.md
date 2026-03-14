---
title: 7 heuristik untuk desain antarmuka Web3
description: Prinsip -prinsip untuk meningkatkan kegunaan Web3
lang: id
---

Kegunaan heuristik adalah "aturan praktis" yang luas yang dapat anda gunakan untuk mengukur kegunaan situs anda.
7 heuristik di sini secara khusus dirancang untuk Web3 dan sebaiknya digunakan bersamaan dengan [10 prinsip umum desain interaksi dari] Jakob Nielsen(https://www.nngroup.com/articles/ten-usability-heuristics/).

## Tujuh heuristik kegunaan untuk Web3 {#seven-usability-heuristics-for-web3}

1. Umpan balik mengikuti tindakan
2. Keamanan dan percaya
3. Info yang paling penting sudah jelas
4. Terminologi yang dapat di mengerti
5. Tindakan sesingkat mungkin
6. Koneksi jaringan terlihat dan fleksibel
7. Kontrol dari aplikasi, bukan dari dompet

## Definisi dan contoh {#definitions-and-examples}

### 1. Umpan balik mengikuti tindakan {#feedback-follows-action}

**Hal ini harus jelas ketika sesuatu telah terjadi, atau sedang terjadi.**

Pengguna memutuskan langkah selanjutnya berdasarkan hasil langkah sebelumnya. Oleh karena itu, sangat penting bagi mereka untuk tetap mendapatkan informasi tentang status sistem. Hal ini sangat penting dalam Web3 karena transaksi terkadang membutuhkan waktu yang singkat untuk masuk kedalam blockchain. Jika tidak ada umpan balik yang memberitahukan mereka untuk menunggu, pengguna tidak yakin apakah ada sesuatu yang akan terjadi.

**Saran:**

- Menginformasikan pengguna melalui pesan, notifikasi, dan peringatan lainnya.
- Komunikasikan waktu tunggu yang jelas.
- Jika suatu tindakan akan memakan waktu yang lebih lama dari beberapa detik, yakinkan pengguna dengan pengatur waktu atau animasi untuk membuat mereka merasa ada sesuatu yang terjadi.
- Jika ada beberapa langkah dalam suatu proses, tunjukkan setiap proses.

**Contoh:**
Menampilkan setiap langkah yang terlibat dalam transaksi membantu pengguna memgetahui dimana mereka berada dalam proses tersebut. Icon yang sesuai memungkinkan pengguna mengetahui status tindakan mereka.

Umpan balik mengikuti tindakan {#feedback-follows-action}(./Image1.png)

### 2. Keamanan dan kepercayaan sudah terintegrasi {#security-and-trust-are-backed-in}

Keamanan harus diutamakan, dan hal ini harus ditekankan kepada pengguna.
Orang-orang sangat peduli dengan data mereka. Keamanan sering kali menjadi perhatian utama bagi pengguna, sehingga harus dipertimbangkan pada semua tingkat desain. Anda harus selalu berusaha untuk mendapatkan kepercayaan dari pengguna anda, tapi cara anda melakukan hal ini dapat memilik arti berbeda di aplikasi yang berbeda. Ini tidak boleh menjadi renungan, tapi harus di rancang secara sadar dan keseluruhan. Bangun kepercayaan sepanjang pengalaman pengguna, termasuk melalui saluran sosial dan dokumentasi, serta antarmuka pengguna UI akhir. Hal-hal seperti tingkat desentralisasi, status multi-sig treasury, dan apakah tim telah doxxed, semuanya memengaruhi kepercayaan pengguna

**Saran:**

- Cantumkan audit Anda dengan bangga
- Dapatkan beberapa audit
- Promosikan setiap fitur keamanan yang telah Anda rancang
- Soroti risiko yang mungkin terjadi, termasuk integrasi yang mendasarinya
- Sampaikan kompleksitas strategi
- Perhatikan isu non-UI yang mungkin memengaruhi persepsi keamanan pengguna

_"Contoh:_\*
Cantumkan audit Anda di bagian footer dengan ukuran yang menonjol.

![Audits referenced in the website footer](./Image2.png)

### 3. Informasi terpenting jelas terlihat {#the-most-important-info-is-obvious}

Untuk sistem yang kompleks, tampilkan hanya data yang paling relevan. Tentukan apa yang paling penting, dan utamakan untuk ditampilkan.
Terlalu banyak informasi bisa membingungkan, dan pengguna biasanya hanya fokus pada satu bagian informasi saat membuat keputusan. Dalam DeFi, ini kemungkinan besar adalah APR pada aplikasi yield dan LTV pada aplikasi pinjaman.

**Saran:**

- Riset pengguna akan mengungkap metrik yang paling penting
- Buat informasi utama terlihat besar, sedangkan detail lainnya dibuat kecil dan tidak mengganggu
- Orang tidak membaca secara detail, mereka hanya memindai; pastikan desain Anda mudah dipindai

**Contoh:** Token besar dengan warna penuh mudah ditemukan saat dipindai. APR ditampilkan besar dan diberi warna aksen yang menonjol.

![The token and APR are easy to find](./Image3.png)

### 4. Terminologi yang jelas {#clear-terminology}

Terminologi harus mudah dipahami dan sesuai.
Istilah teknis bisa menjadi penghalang besar, karena memaksa pengguna membangun model mental yang sama sekali baru. Pengguna tidak dapat mengaitkan desain dengan kata, frasa, dan konsep yang sudah mereka kenal. Semuanya terasa membingungkan dan asing, sehingga pengguna harus melalui kurva belajar yang curam sebelum mereka dapat mencoba menggunakannya. Seorang pengguna mungkin mendekati DeFi dengan tujuan ingin menabung, namun yang mereka temui adalah: Mining, farming, staking, emissions, bribes, vaults, lockers, veTokens, vesting, epochs, algoritma terdesentralisasi, likuiditas milik protokol…
Cobalah menggunakan istilah sederhana yang dapat dipahami oleh kelompok orang yang paling luas. Jangan menciptakan istilah baru hanya untuk proyek Anda.

**Saran:**

- Gunakan terminologi yang sederhana dan konsisten
- Gunakan bahasa yang sudah ada sebanyak mungkin
- Jangan menciptakan istilah sendiri
- Ikuti konvensi sebagaimana adanya
- Berikan edukasi kepada pengguna sebanyak mungkin

**Contoh:**
“Your rewards” adalah istilah yang umum dipahami dan netral; bukan kata baru yang dibuat khusus untuk proyek ini. Hadiah dinyatakan dalam USD agar sesuai dengan model mental dunia nyata, meskipun hadiah itu sendiri berupa token lain.

![Hadiah Token, displayed in U.S. dollars](./Image4.png)

### 5. Tindakan dibuat sesingkat mungkin {#actions-are-as-short-as-possible}

Percepat interaksi pengguna dengan mengelompokkan sub-tindakan.
Hal ini dapat dilakukan baik di tingkat smart contract maupun di antarmuka pengguna UI. Pengguna seharusnya tidak perlu berpindah dari satu bagian sistem ke bagian lain – atau meninggalkan sistem sepenuhnya – untuk menyelesaikan tindakan yang umum.

**Saran:**

- Gabungkan tindakan "Approve" dengan tindakan lain jika memungkinkan
- Gabungkan langkah-langkah penandatanganan sedekat mungkin

**Contoh:** Menggabungkan “add liquidity” dan “stake” adalah contoh sederhana dari akselerator yang menghemat waktu dan biaya gas pengguna.

![Modal yang menampilkan saklar untuk menggabungkan aksi deposit dan stake](./Image5.png)

### 6. Koneksi jaringan terlihat dan fleksibel {#network-connections-are-visible-and-flexible}

Memberi tahu pengguna jaringan mana yang sedang mereka gunakan, dan menyediakan pintasan yang jelas untuk mengganti jaringan.
Hal ini terutama penting pada aplikasi multichain. Fungsi utama aplikasi tetap harus terlihat meskipun sedang tidak terhubung atau terhubung ke jaringan yang tidak didukung.

**Saran:**

- Tampilkan sebanyak mungkin bagian aplikasi meskipun sedang tidak terhubung
- Tampilkan jaringan yang sedang terhubung oleh pengguna saat ini
- Jangan membuat pengguna harus membuka dompet untuk mengganti jaringan
- Jika aplikasi mengharuskan pengguna mengganti jaringan, minta tindakan tersebut langsung dari tombol aksi utama
- Jika aplikasi memiliki pasar atau vault untuk beberapa jaringan, nyatakan dengan jelas jaringan mana yang sedang dilihat pengguna

**Contoh:** Tampilkan kepada pengguna jaringan mana yang sedang mereka gunakan, dan izinkan mereka menggantinya langsung dari appbar.

![Tombol dropdown yang menampilkan jaringan yang sedang terhubung](./Image6.png)

### 7. Kontrol dari aplikasi, bukan dari dompet {#control-from-the-app-not-the-wallet}

UI harus memberi tahu pengguna semua yang perlu mereka ketahui dan memberikan kontrol atas semua yang perlu mereka lakukan.
Di Web3, ada tindakan yang dilakukan pengguna melalui antarmuka UI, dan ada tindakan yang dilakukan melalui dompet. Secara umum, Anda memulai sebuah tindakan melalui antarmuka UI, lalu mengonfirmasinya melalui dompet. Pengguna bisa merasa tidak nyaman jika kedua alur ini tidak diintegrasikan dengan hati-hati.

**Saran:**

- Sampaikan status sistem melalui umpan balik di antarmuka pengguna UI
- Simpan catatan riwayat mereka
- Sediakan tautan ke penjelajah blok untuk transaksi lama
- Sediakan pintasan untuk mengganti jaringan.

**Contoh:** Sebuah wadah yang halus menunjukkan kepada pengguna token relevan yang mereka miliki di dompet, dan CTA utama menyediakan pintasan untuk mengganti jaringan.

![CTA utama memberi perintah kepada pengguna untuk mengganti jaringan](./Image7.png)
