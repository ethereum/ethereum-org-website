---
title: Abstraksi akun
description: Ikhtisar rencana Ethereum untuk membuat akun pengguna menjadi lebih sederhana dan aman
lang: id
summaryPoints:
  - Abstraksi akun memudahkan untuk membuat dompet kontrak pintar
  - Dompet kontrak pintar memudahkan untuk mengelola akses ke akun Ethereum
  - Kunci yang hilang dan terbuka dapat dipulihkan dengan menggunakan beberapa cadangan
---

# Abstraksi akun {#account-abstraction}

Sebagian besar pengguna yang ada berinteraksi dengan Ethereum menggunakan **[akun milik eksternal (EOA)](/glossary/#eoa)**. Hal ini membatasi cara pengguna berinteraksi dengan Ethereum. Misalnya, pengguna jadi sulit melakukan transaksi massal dan harus selalu memiliki saldo ETH untuk membayar biaya transaksi.

Abstraksi akun adalah cara untuk mengatasi masalah ini dengan memungkinkan pengguna secara fleksibel memprogram lebih banyak keamanan dan pengalaman pengguna yang lebih baik ke dalam akun mereka. Hal ini dapat terjadi dengan [meningkatkan EOA](https://eips.ethereum.org/EIPS/eip-7702) (EIP-7702) sehingga dapat dikontrol oleh kontrak pintar. Ada juga jalur lain yang melibatkan penambahan [sistem transaksi kedua yang terpisah](https://eips.ethereum.org/EIPS/eip-4337) (EIP-4337) untuk berjalan secara paralel dengan protokol yang ada. Apa pun rutenya, hasilnya adalah akses ke Ethereum melalui dompet kontrak pintar, yang didukung secara asli sebagai bagian dari protokol yang ada atau melalui jaringan transaksi tambahan.

Dompet kontrak pintar membuka banyak manfaat bagi pengguna, termasuk:

- menentukan aturan keamanan fleksibel Anda sendiri
- memulihkan akun Anda jika Anda kehilangan kunci
- berbagi keamanan akun Anda di seluruh perangkat atau individu tepercaya
- membayar gas orang lain, atau meminta orang lain membayar gas Anda
- mengelompokkan transaksi bersama-sama (misalnya, menyetujui dan mengeksekusi swap sekaligus)
- lebih banyak kesempatan bagi dapps dan pengembang dompet untuk berinovasi pada pengalaman pengguna

Manfaat ini tidak didukung secara native saat ini karena hanya akun yang dimiliki secara eksternal ([EOA](/glossary/#eoa)) yang dapat memulai transaksi. EOA secara sederhana adalah pasangan kunci publik-pribadi. Cara kerjanya seperti ini:

- jika Anda memiliki kunci pribadi, Anda dapat melakukan _apa saja_ sesuai dengan aturan Mesin Virtual Ethereum (EVM)
- jika Anda tidak memiliki kunci pribadi, Anda _tidak dapat melakukan apa-apa_.

Jika Anda kehilangan kunci, kunci tersebut tidak dapat dipulihkan, dan kunci yang dicuri memberi pencuri akses instan ke semua dana dalam akun.

Dompet kontrak pintar adalah solusi untuk masalah ini, tetapi saat ini sulit untuk diprogram karena pada akhirnya logika apa pun yang diterapkan harus diterjemahkan ke dalam satu set transaksi EOA sebelum dapat diproses oleh Ethereum. Abstraksi akun memungkinkan kontrak pintar untuk memulai transaksi sendiri, sehingga logika apa pun yang ingin diimplementasikan oleh pengguna dapat dikodekan ke dalam dompet kontrak pintar itu sendiri dan dieksekusi di Ethereum.

Pada akhirnya, abstraksi akun meningkatkan dukungan untuk dompet kontrak pintar, membuatnya lebih mudah dibuat dan lebih aman digunakan. Dengan abstraksi akun, pengguna dapat menikmati semua manfaat Ethereum tanpa perlu memahami teknologi yang mendasarinya.

## Di luar frasa benih {#beyond-seed-phrases}

Akun-akun saat ini diamankan menggunakan kunci pribadi yang dihitung dari frasa benih. Siapa pun yang memiliki akses ke frasa benih dapat dengan mudah menemukan kunci pribadi yang melindungi akun dan memperoleh akses ke semua aset yang dilindunginya. Jika kunci pribadi dan frasa benih hilang, aset tersebut tidak dapat diakses secara permanen. Mengamankan frasa benih ini sulit, bahkan bagi pengguna ahli, dan phishing frasa benih adalah salah satu penipuan yang paling umum.

Abstraksi akun memecahkan masalah ini dengan menggunakan kontrak pintar untuk menyimpan aset dan mengesahkan transaksi. Kontrak pintar dapat menyertakan logika khusus yang dirancang untuk keamanan dan kegunaan maksimum. Pengguna masih menggunakan kunci pribadi untuk mengontrol akses, tetapi dengan langkah-langkah keamanan yang ditingkatkan.

Misalnya, kunci cadangan dapat ditambahkan ke dompet, yang memungkinkan penggantian kunci jika kunci utama dibobol. Setiap kunci dapat diamankan secara berbeda atau didistribusikan di antara individu tepercaya, sehingga meningkatkan keamanan secara signifikan. Aturan dompet tambahan dapat mengurangi kerusakan akibat paparan kunci, seperti memerlukan banyak tanda tangan untuk transaksi bernilai tinggi atau membatasi transaksi ke alamat tepercaya.

## Pengalaman pengguna yang lebih baik {#better-user-experience}

Abstraksi akun sangat meningkatkan pengalaman dan keamanan pengguna dengan mendukung dompet kontrak pintar di tingkat protokol. Pengembang dapat berinovasi dengan bebas, meningkatkan penggabungan transaksi untuk kecepatan dan efisiensi. Pertukaran sederhana dapat menjadi operasi satu klik, yang secara signifikan meningkatkan kemudahan penggunaan.

Manajemen gas meningkat pesat. Aplikasi dapat membayar biaya gas pengguna atau mengizinkan pembayaran dalam token selain ETH, menghilangkan kebutuhan untuk memelihara saldo ETH.

## Bagaimana abstraksi akun akan diimplementasikan? {#how-will-aa-be-implemented}

Saat ini, dompet kontrak pintar sulit diimplementasikan karena bergantung pada transaksi standar pembungkusan kode yang rumit. Ethereum dapat mengubah hal ini dengan mengizinkan kontrak pintar untuk langsung memulai transaksi, menanamkan logika dalam kontrak pintar Ethereum alih-alih bergantung pada relai eksternal.

### EIP-4337: Abstraksi akun tanpa perubahan protokol

EIP-4337 memungkinkan dukungan dompet kontrak pintar asli tanpa memodifikasi protokol inti Ethereum. Ini memperkenalkan objek `UserOperation` yang dikumpulkan ke dalam bundel transaksi oleh validator, menyederhanakan pengembangan dompet. Kontrak EIP-4337 EntryPoint disebarkan ke Ethereum Mainnet pada 1 Maret 2023 dan telah memfasilitasi pembuatan lebih dari 26 juta dompet pintar dan 170 juta UserOperations.

## Kemajuan saat ini {#current-progress}

Sebagai bagian dari peningkatan Pectra Ethereum, EIP-7702 dijadwalkan pada 7 Mei 2025. EIP-4337 telah diadopsi secara luas, [dengan lebih dari 26 juta akun pintar yang diterapkan dan lebih dari 170 juta UserOperations yang diproses](https://www.bundlebear.com/overview/all).

## Bacaan lebih lanjut {#further-reading}

- [erc4337.io](https://www.erc4337.io/)
- [Dokumentasi EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
- [Dokumentasi EIP-7702](https://eips.ethereum.org/EIPS/eip-7702)
- [Dasbor adopsi ERC-4337](https://www.bundlebear.com/overview/all)
- ["Road to Account Abstraction" dari Vitalik](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Blog Vitalik tentang dompet pemulihan sosial](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Abstraksi Akun yang Luar Biasa](https://github.com/4337Mafia/awesome-account-abstraction)
