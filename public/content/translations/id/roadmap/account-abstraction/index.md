---
title: Abstraksi akun
description: Gambaran umum tentang rencana Ethereum untuk membuat akun pengguna menjadi lebih sederhana dan lebih aman
lang: id
summaryPoints:
  - Abstraksi akun membuatnya jauh lebih mudah untuk membangun dompet kontrak pintar
  - Dompet kontrak pintar membuatnya jauh lebih mudah untuk mengelola akses ke akun Ethereum
  - Kunci yang hilang dan terekspos dapat dipulihkan menggunakan beberapa cadangan
---

# Abstraksi akun {#account-abstraction}

Sebagian besar pengguna yang ada berinteraksi dengan [Ethereum](/) menggunakan **[akun yang dimiliki secara eksternal (EOA)](/glossary/#eoa)**. Hal ini membatasi bagaimana pengguna dapat berinteraksi dengan Ethereum. Misalnya, hal ini menyulitkan untuk melakukan kumpulan transaksi dan mengharuskan pengguna untuk selalu menyimpan saldo ETH untuk membayar biaya transaksi.

Abstraksi akun adalah cara untuk menyelesaikan masalah ini dengan memungkinkan pengguna memprogram lebih banyak keamanan dan pengalaman pengguna yang lebih baik secara fleksibel ke dalam akun mereka. Hal ini dapat terjadi dengan [meningkatkan EOA](https://eips.ethereum.org/EIPS/eip-7702) (EIP-7702) sehingga dapat dikendalikan oleh kontrak pintar. Ada juga jalur lain yang melibatkan penambahan [sistem transaksi kedua yang terpisah](https://eips.ethereum.org/EIPS/eip-4337) (EIP-4337) untuk berjalan secara paralel dengan protokol yang ada. Terlepas dari jalurnya, hasilnya adalah akses ke Ethereum melalui dompet kontrak pintar, baik yang didukung secara bawaan sebagai bagian dari protokol yang ada atau melalui jaringan transaksi tambahan.

Dompet kontrak pintar membuka banyak manfaat bagi pengguna, termasuk:

- menentukan aturan keamanan fleksibel Anda sendiri
- memulihkan akun Anda jika Anda kehilangan kunci
- membagikan keamanan akun Anda di seluruh perangkat atau individu tepercaya
- membayar gas orang lain, atau meminta orang lain membayar gas Anda
- mengumpulkan transaksi bersama-sama (misalnya, menyetujui dan mengeksekusi tukar dalam satu jalan)
- lebih banyak peluang bagi pengembang dapps dan dompet untuk berinovasi pada pengalaman pengguna

Manfaat ini tidak didukung secara bawaan saat ini karena hanya akun yang dimiliki secara eksternal ([EOA](/glossary/#eoa)) yang dapat memulai transaksi. EOA hanyalah pasangan kunci publik-pribadi. Mereka bekerja seperti ini:

- jika Anda memiliki kunci pribadi, Anda dapat melakukan _apa saja_ dalam aturan Mesin Virtual Ethereum (EVM)
- jika Anda tidak memiliki kunci pribadi, Anda _tidak dapat melakukan apa pun_.

Jika Anda kehilangan kunci Anda, kunci tersebut tidak dapat dipulihkan, dan kunci yang dicuri memberi pencuri akses instan ke semua dana dalam sebuah akun.

Dompet kontrak pintar adalah solusi untuk masalah ini, tetapi saat ini mereka sulit untuk diprogram karena pada akhirnya, logika apa pun yang mereka terapkan harus diterjemahkan ke dalam serangkaian transaksi EOA sebelum dapat diproses oleh Ethereum. Abstraksi akun memungkinkan kontrak pintar untuk memulai transaksi itu sendiri, sehingga logika apa pun yang ingin diterapkan pengguna dapat dikodekan ke dalam dompet kontrak pintar itu sendiri dan dieksekusi di Ethereum.

Pada akhirnya, abstraksi akun meningkatkan dukungan untuk dompet kontrak pintar, membuatnya lebih mudah dibangun dan lebih aman digunakan. Dengan abstraksi akun, pengguna dapat menikmati semua manfaat Ethereum tanpa perlu memahami teknologi yang mendasarinya.

## Melampaui frasa seed {#beyond-seed-phrases}

Akun saat ini diamankan menggunakan kunci pribadi yang dihitung dari frasa seed. Siapa pun yang memiliki akses ke frasa seed dapat dengan mudah menemukan kunci pribadi yang melindungi sebuah akun dan mendapatkan akses ke semua aset yang dilindunginya. Jika kunci pribadi dan frasa seed hilang, aset tersebut tidak dapat diakses secara permanen. Mengamankan frasa seed ini canggung, bahkan untuk pengguna ahli, dan phishing frasa seed adalah salah satu penipuan paling umum.

Abstraksi akun menyelesaikan ini dengan menggunakan kontrak pintar untuk menyimpan aset dan mengotorisasi transaksi. Kontrak pintar dapat menyertakan logika kustom yang disesuaikan untuk keamanan dan kegunaan maksimum. Pengguna masih menggunakan kunci pribadi untuk mengontrol akses, tetapi dengan langkah-langkah keamanan yang ditingkatkan.

Misalnya, kunci cadangan dapat ditambahkan ke dompet, memungkinkan penggantian kunci jika kunci utama disusupi. Setiap kunci dapat diamankan secara berbeda atau didistribusikan di antara individu tepercaya, yang secara signifikan meningkatkan keamanan. Aturan dompet tambahan dapat mengurangi kerusakan akibat paparan kunci, seperti memerlukan beberapa tanda tangan untuk transaksi bernilai tinggi atau membatasi transaksi ke alamat tepercaya.

## Pengalaman pengguna yang lebih baik {#better-user-experience}

Abstraksi akun sangat meningkatkan pengalaman pengguna dan keamanan dengan mendukung dompet kontrak pintar di tingkat protokol. Pengembang dapat berinovasi secara bebas, meningkatkan penggabungan transaksi untuk kecepatan dan efisiensi. Tukar sederhana dapat menjadi operasi satu klik, yang secara signifikan meningkatkan kemudahan penggunaan.

Manajemen gas meningkat pesat. Aplikasi dapat membayar biaya gas pengguna atau mengizinkan pembayaran dalam token selain ETH, menghilangkan kebutuhan untuk mempertahankan saldo ETH.

## Bagaimana abstraksi akun akan diimplementasikan? {#how-will-aa-be-implemented}

Saat ini, dompet kontrak pintar menantang untuk diimplementasikan karena mereka bergantung pada kode kompleks yang membungkus transaksi standar. Ethereum dapat mengubah ini dengan memungkinkan kontrak pintar untuk secara langsung memulai transaksi, menanamkan logika dalam kontrak pintar Ethereum daripada mengandalkan relayer eksternal.

### EIP-4337: Abstraksi akun tanpa perubahan protokol

EIP-4337 memungkinkan dukungan dompet kontrak pintar bawaan tanpa memodifikasi protokol inti Ethereum. Ini memperkenalkan objek `UserOperation` yang dikumpulkan ke dalam bundel transaksi oleh validator, menyederhanakan pengembangan dompet. Kontrak EntryPoint EIP-4337 disebarkan ke mainnet Ethereum pada 1 Maret 2023 dan telah memfasilitasi pembuatan lebih dari 26 juta dompet pintar dan 170 juta UserOperation.

## Kemajuan saat ini {#current-progress}

Sebagai bagian dari peningkatan Pectra Ethereum, EIP-7702 dijadwalkan pada 7 Mei 2025. EIP-4337 telah diadopsi secara luas, [dengan lebih dari 26 juta akun pintar disebarkan dan lebih dari 170 juta UserOperation diproses](https://www.bundlebear.com/erc4337-overview/all).

## Bacaan lebih lanjut {#further-reading}

- [erc4337.io](https://docs.erc4337.io/)
- [Dokumentasi EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
- [Dokumentasi EIP-7702](https://eips.ethereum.org/EIPS/eip-7702)
- [Dasbor adopsi ERC-4337](https://www.bundlebear.com/erc4337-overview/all)
- ["Road to Account Abstraction" oleh Vitalik](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Blog Vitalik tentang dompet pemulihan sosial](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Awesome Account Abstraction](https://github.com/4337Mafia/awesome-account-abstraction)