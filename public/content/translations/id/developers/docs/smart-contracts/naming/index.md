---
title: Menamai kontrak pintar
description: Praktik terbaik untuk menamai kontrak pintar Ethereum dengan ENS
lang: id
---

Kontrak pintar adalah landasan dari infrastruktur desentralisasi Ethereum, yang memungkinkan aplikasi dan protokol otonom. Namun, meskipun kemampuan kontrak berkembang, pengguna dan pengembang masih bergantung pada alamat heksadesimal mentah untuk mengidentifikasi dan merujuk kontrak-kontrak ini.

Menamai kontrak pintar dengan [Ethereum Name Service (ENS)](https://ens.domains/) meningkatkan pengalaman pengguna dengan menghilangkan alamat kontrak heksadesimal dan mengurangi risiko dari serangan seperti keracunan alamat (address poisoning) dan serangan spoofing. Panduan ini menjelaskan mengapa menamai kontrak pintar itu penting, bagaimana hal itu dapat diimplementasikan, dan alat yang tersedia seperti [Enscribe](https://www.enscribe.xyz) untuk menyederhanakan proses dan membantu pengembang mengadopsi praktik tersebut.

## Mengapa menamai kontrak pintar? {#why-name-contracts}

### Pengidentifikasi yang dapat dibaca manusia {#human-readable-identifiers}

Alih-alih berinteraksi dengan alamat kontrak yang tidak jelas seperti `0x8f8e...f9e3`, pengembang dan pengguna dapat menggunakan nama yang dapat dibaca manusia seperti `v2.myapp.eth`. Ini menyederhanakan interaksi kontrak pintar.

Hal ini dimungkinkan oleh [Ethereum Name Service](https://ens.domains/) yang menyediakan layanan penamaan desentralisasi untuk alamat Ethereum. Ini analog dengan bagaimana Domain Name Service (DNS) memungkinkan pengguna internet untuk mengakses alamat jaringan menggunakan nama seperti ethereum.org alih-alih melalui alamat IP seperti `104.18.176.152`.

### Peningkatan keamanan dan kepercayaan {#improved-security-and-trust}

Kontrak yang dinamai membantu mengurangi transaksi yang tidak disengaja ke alamat yang salah. Mereka juga membantu pengguna mengidentifikasi kontrak yang terikat pada aplikasi atau merek tertentu. Ini menambahkan lapisan kepercayaan reputasi, terutama ketika nama dilampirkan pada domain induk yang terkenal seperti `uniswap.eth`.

Karena panjang alamat Ethereum yang mencapai 42 karakter, sangat sulit bagi pengguna untuk mengidentifikasi perubahan kecil pada alamat, di mana beberapa karakter telah dimodifikasi. Misalnya, alamat seperti `0x58068646C148E313CB414E85d2Fe89dDc3426870` biasanya akan dipotong menjadi `0x580...870` oleh aplikasi yang berhadapan dengan pengguna seperti dompet. Pengguna kemungkinan tidak akan menyadari alamat berbahaya di mana beberapa karakter telah diubah.

Jenis teknik ini digunakan oleh serangan spoofing dan keracunan alamat di mana pengguna diarahkan untuk percaya bahwa mereka berinteraksi dengan atau mengirim dana ke alamat yang benar, padahal sebenarnya alamat tersebut hanya menyerupai alamat yang benar, tetapi tidak sama.

Nama ENS untuk dompet dan kontrak melindungi dari jenis serangan ini. Seperti serangan spoofing DNS, serangan spoofing ENS juga dapat disembunyikan, namun, pengguna lebih mungkin menyadari kesalahan ejaan pada nama ENS daripada modifikasi kecil pada alamat heksadesimal.

### UX yang lebih baik untuk dompet dan penjelajah {#better-ux}

Ketika kontrak pintar telah dikonfigurasi dengan nama ENS, aplikasi seperti dompet dan penjelajah blok dapat menampilkan nama ENS untuk kontrak pintar, alih-alih alamat heksadesimal. Ini memberikan peningkatan pengalaman pengguna (UX) yang signifikan bagi pengguna.

Misalnya, saat berinteraksi dengan aplikasi seperti Uniswap, pengguna biasanya akan melihat bahwa aplikasi yang mereka gunakan dihosting di situs web `uniswap.org`, tetapi mereka akan disajikan dengan alamat kontrak heksadesimal jika Uniswap belum menamai kontrak pintar mereka dengan ENS. Jika kontrak tersebut dinamai, mereka dapat melihat `v4.contracts.uniswap.eth` yang jauh lebih berguna.

## Penamaan saat penerapan vs. pasca-penerapan {#when-to-name}

Ada dua titik di mana kontrak pintar dapat dinamai:

- **Saat waktu penerapan**: menetapkan nama ENS ke kontrak saat diterapkan.
- **Setelah penerapan**: memetakan alamat kontrak yang ada ke nama ENS baru.

Kedua pendekatan tersebut bergantung pada kepemilikan atau akses manajer ke domain ENS sehingga mereka dapat membuat dan mengatur catatan ENS.

## Bagaimana penamaan ENS bekerja untuk kontrak {#how-ens-naming-works}

Nama ENS disimpan onchain dan diselesaikan ke alamat Ethereum melalui resolver ENS. Untuk menamai kontrak pintar:

1. Daftarkan atau kendalikan domain ENS induk (misalnya `myapp.eth`)
2. Buat subdomain (misalnya `v1.myapp.eth`)
3. Atur catatan `address` dari subdomain ke alamat kontrak
4. Atur catatan balik (reverse record) kontrak ke ENS untuk memungkinkan nama ditemukan melalui alamatnya

Nama ENS bersifat hierarkis dan mendukung sub-nama tanpa batas. Mengatur catatan ini biasanya melibatkan interaksi dengan registri ENS dan kontrak resolver publik.

## Alat untuk menamai kontrak {#tools}

Ada dua pendekatan untuk menamai kontrak pintar. Baik menggunakan [Aplikasi ENS](https://app.ens.domains) dengan beberapa langkah manual, atau menggunakan [Enscribe](https://www.enscribe.xyz). Ini diuraikan di bawah ini.

### Pengaturan ENS manual {#manual-ens-setup}

Menggunakan [Aplikasi ENS](https://app.ens.domains/), pengembang dapat secara manual membuat sub-nama dan mengatur catatan alamat maju (forward address records). Namun, mereka tidak dapat menetapkan nama utama untuk kontrak pintar dengan mengatur catatan balik untuk nama tersebut melalui aplikasi ENS. Langkah-langkah manual harus diambil yang tercakup dalam [dokumentasi ENS](https://docs.ens.domains/web/naming-contracts/).

### Enscribe {#enscribe}

[Enscribe](https://www.enscribe.xyz) menyederhanakan penamaan kontrak pintar dengan ENS, dan meningkatkan kepercayaan pengguna pada kontrak pintar. Ini menyediakan:

- **Penerapan dan penamaan atomik**: Menetapkan nama ENS saat menerapkan kontrak baru
- **Penamaan pasca-penerapan**: Melampirkan nama ke kontrak yang sudah diterapkan
- **Dukungan multi-chain**: Berfungsi di seluruh jaringan Ethereum dan layer 2 di mana ENS didukung
- **Data verifikasi kontrak**: Menyertakan data verifikasi kontrak yang ditarik dari berbagai sumber untuk meningkatkan kepercayaan pengguna

Enscribe mendukung nama ENS yang disediakan oleh pengguna, atau domainnya sendiri jika pengguna tidak memiliki nama ENS.

Anda dapat mengakses [Aplikasi Enscribe](https://app.enscribe.xyz) untuk mulai menamai dan melihat kontrak pintar.

## Praktik terbaik {#best-practices}

- **Gunakan nama yang jelas dan berversi** seperti `v1.myapp.eth` untuk membuat peningkatan kontrak menjadi transparan
- **Atur catatan balik** untuk menautkan kontrak ke nama ENS demi visibilitas di aplikasi seperti dompet dan penjelajah blok.
- **Pantau kedaluwarsa dengan cermat** jika Anda ingin mencegah perubahan kepemilikan yang tidak disengaja
- **Verifikasi sumber kontrak** sehingga pengguna dapat percaya bahwa kontrak yang dinamai berperilaku seperti yang diharapkan

## Risiko {#risks}

Menamai kontrak pintar memberikan manfaat yang signifikan bagi pengguna Ethereum, namun, pemilik domain ENS harus waspada terhadap pengelolaannya. Risiko yang patut diperhatikan meliputi:

- **Kedaluwarsa**: Sama seperti nama DNS, pendaftaran nama ENS memiliki durasi yang terbatas. Oleh karena itu, sangat penting bagi pemilik untuk memantau tanggal kedaluwarsa domain mereka dan memperbaruinya jauh sebelum kedaluwarsa. Baik Aplikasi ENS maupun Enscribe memberikan indikator visual bagi pemilik domain saat masa kedaluwarsa semakin dekat.
- **Perubahan kepemilikan**: Catatan ENS direpresentasikan sebagai NFT di Ethereum, di mana pemilik domain `.eth` tertentu memiliki NFT terkait di tangan mereka. Oleh karena itu, jika akun yang berbeda mengambil alih kepemilikan NFT ini, pemilik baru dapat memodifikasi catatan ENS apa pun sesuai keinginan mereka.

Untuk memitigasi risiko tersebut, akun pemilik untuk domain tingkat ke-2 (2LD) `.eth` harus diamankan melalui dompet multi tanda tangan dengan subdomain yang dibuat untuk mengelola penamaan kontrak. Dengan cara itu, jika terjadi perubahan kepemilikan yang tidak disengaja atau berbahaya di tingkat subdomain, perubahan tersebut dapat dibatalkan oleh pemilik 2LD.

## Masa depan penamaan kontrak {#future}

Penamaan kontrak menjadi praktik terbaik untuk pengembangan dapp, mirip dengan bagaimana nama domain menggantikan alamat IP di web. Seiring dengan semakin banyaknya infrastruktur seperti dompet, penjelajah, dan dasbor yang mengintegrasikan resolusi ENS untuk kontrak, kontrak yang dinamai akan meningkatkan keamanan dan mengurangi kesalahan di seluruh ekosistem.

Dengan membuat kontrak pintar lebih mudah dikenali dan dipahami, penamaan membantu menjembatani kesenjangan antara pengguna dan aplikasi di Ethereum, meningkatkan keamanan dan UX bagi pengguna.

## Bacaan lebih lanjut {#further-reading}

- [Menamai Kontrak Pintar dengan ENS](https://docs.ens.domains/web/naming-contracts/)
- [Menamai Kontrak Pintar dengan Enscribe](https://www.enscribe.xyz/docs).