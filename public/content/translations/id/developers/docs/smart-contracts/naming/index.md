---
title: Menamai kontrak pintar
description: Praktik terbaik untuk menamai kontrak pintar Ethereum dengan ENS
lang: id
---

Kontrak pintar adalah landasan infrastruktur terdesentralisasi Ethereum, yang memungkinkan aplikasi dan protokol otonom. Namun bahkan seiring berkembangnya kemampuan kontrak, pengguna dan pengembang masih mengandalkan alamat heksadesimal mentah untuk mengidentifikasi dan merujuk kontrak-kontrak ini.

Menamai kontrak pintar dengan [Layanan Nama Ethereum (ENS)](https://ens.domains/) meningkatkan pengalaman pengguna dengan menghilangkan alamat kontrak heksadesimal dan mengurangi risiko dari serangan seperti peracunan alamat dan serangan spoofing. Panduan ini menjelaskan mengapa menamai kontrak pintar itu penting, bagaimana cara menerapkannya, dan perangkat yang tersedia seperti [Enscribe](https://www.enscribe.xyz) untuk menyederhanakan proses dan membantu pengembang mengadopsi praktik ini.

## Mengapa menamai kontrak pintar? {#why-name-contracts}

### Pengidentifikasi yang dapat dibaca manusia {#human-readable-identifiers}

Alih-alih berinteraksi dengan alamat kontrak yang tidak jelas seperti `0x8f8e...f9e3`, pengembang dan pengguna dapat menggunakan nama yang dapat dibaca manusia seperti `v2.myapp.eth`. Ini menyederhanakan interaksi kontrak pintar.

Hal ini dimungkinkan oleh [Layanan Nama Ethereum](https://ens.domains/) yang menyediakan layanan penamaan terdesentralisasi untuk alamat Ethereum. Ini analog dengan bagaimana Layanan Nama Domain (DNS) memungkinkan pengguna internet untuk mengakses alamat jaringan menggunakan nama seperti ethereum.org, bukan melalui alamat IP seperti `104.18.176.152`.

### Keamanan dan kepercayaan yang ditingkatkan {#improved-security-and-trust}

Kontrak yang dinamai membantu mengurangi transaksi yang tidak disengaja ke alamat yang salah. Kontrak tersebut juga membantu pengguna mengidentifikasi kontrak yang terikat pada aplikasi atau merek tertentu. Ini menambahkan lapisan kepercayaan reputasi, terutama ketika nama-nama tersebut melekat pada domain induk yang terkenal seperti `uniswap.eth`.

Karena panjang alamat Ethereum adalah 42 karakter, sangat sulit bagi pengguna untuk mengidentifikasi perubahan kecil pada alamat, di mana beberapa karakter telah diubah. Misalnya, alamat seperti `0x58068646C148E313CB414E85d2Fe89dDc3426870` biasanya akan dipotong menjadi `0x580...870` oleh aplikasi yang berhadapan dengan pengguna seperti dompet. Pengguna kemungkinan tidak akan menyadari adanya alamat jahat di mana beberapa karakter telah diubah.

Jenis teknik ini digunakan oleh serangan spoofing dan peracunan alamat di mana pengguna diarahkan untuk percaya bahwa mereka berinteraksi dengan atau mengirim dana ke alamat yang benar, padahal sebenarnya alamat tersebut hanya menyerupai alamat yang benar, tetapi tidak sama.

Nama ENS untuk dompet dan kontrak melindungi dari jenis serangan ini. Seperti serangan spoofing DNS, serangan spoofing ENS juga dapat terjadi, namun, pengguna lebih mungkin untuk memperhatikan kesalahan ejaan dalam nama ENS daripada modifikasi kecil pada alamat heksadesimal.

### UX yang lebih baik untuk dompet dan penjelajah {#better-ux}

Ketika kontrak pintar telah dikonfigurasi dengan nama ENS, aplikasi seperti dompet dan penjelajah rantai blok dapat menampilkan nama ENS untuk kontrak pintar, alih-alih alamat heksadesimal. Ini memberikan peningkatan pengalaman pengguna (UX) yang signifikan bagi para pengguna.

Misalnya, saat berinteraksi dengan aplikasi seperti Uniswap, pengguna biasanya akan melihat bahwa aplikasi yang mereka gunakan dihosting di situs web `uniswap.org`, tetapi mereka akan disajikan dengan alamat kontrak heksadesimal jika Uniswap belum menamai kontrak pintarnya dengan ENS. Jika kontraknya diberi nama, mereka malah bisa melihat `v4.contracts.uniswap.eth` yang jauh lebih berguna.

## Penamaan saat penyebaran vs. pasca-penyebaran {#when-to-name}

Ada dua titik waktu di mana kontrak pintar dapat diberi nama:

- **Pada waktu penyebaran**: menetapkan nama ENS ke kontrak saat disebarkan.
- **Setelah penyebaran**: memetakan alamat kontrak yang ada ke nama ENS yang baru.

Kedua pendekatan tersebut bergantung pada kepemilikan atau akses manajer ke domain ENS sehingga mereka dapat membuat dan mengatur catatan ENS.

## Cara kerja penamaan ENS untuk kontrak {#how-ens-naming-works}

Nama ENS disimpan di dalam rantai dan diselesaikan ke alamat Ethereum melalui resolver ENS. Untuk menamai kontrak pintar:

1. Daftarkan atau kontrol domain ENS induk (mis. `myapp.eth`)
2. Buat subdomain (mis. `v1.myapp.eth`)
3. Atur catatan `alamat` subdomain ke alamat kontrak
4. Atur catatan terbalik kontrak ke ENS untuk memungkinkan nama ditemukan melalui alamatnya

Nama ENS bersifat hierarkis dan mendukung sub-nama tanpa batas. Mengatur catatan ini biasanya melibatkan interaksi dengan registri ENS dan kontrak resolver publik.

## Perangkat untuk menamai kontrak {#tools}

Ada dua pendekatan untuk menamai kontrak pintar. Baik menggunakan [Aplikasi ENS](https://app.ens.domains) dengan beberapa langkah manual, atau menggunakan [Enscribe](https://www.enscribe.xyz). Ini diuraikan di bawah ini.

### Pengaturan ENS manual {#manual-ens-setup}

Menggunakan [Aplikasi ENS](https://app.ens.domains/), pengembang dapat secara manual membuat sub-nama dan mengatur catatan alamat maju. Namun, mereka tidak dapat mengatur nama utama untuk kontrak pintar dengan mengatur catatan terbalik untuk nama tersebut melalui aplikasi ENS. Langkah-langkah manual harus diambil yang dibahas dalam [dokumen ENS](https://docs.ens.domains/web/naming-contracts/).

### Enscribe {#enscribe}

[Enscribe](https://www.enscribe.xyz) menyederhanakan penamaan kontrak pintar dengan ENS, dan meningkatkan kepercayaan pengguna pada kontrak pintar. Ini menyediakan:

- **Penyebaran dan penamaan atomik**: Tetapkan nama ENS saat menyebarkan kontrak baru
- **Penamaan pasca-penyebaran**: Lampirkan nama ke kontrak yang sudah disebarkan
- **Dukungan multi-rantai**: Bekerja di seluruh jaringan Ethereum dan L2 di mana ENS didukung
- **Data verifikasi kontrak**: Termasuk data verifikasi kontrak yang diambil dari berbagai sumber untuk meningkatkan kepercayaan bagi pengguna

Enscribe mendukung nama ENS yang disediakan oleh pengguna, atau domainnya sendiri jika pengguna tidak memiliki nama ENS.

Anda dapat mengakses [Aplikasi Enscribe](https://app.enscribe.xyz) untuk mulai menamai dan melihat kontrak pintar.

## Praktik terbaik {#best-practices}

- **Gunakan nama yang jelas dan berversi** seperti `v1.myapp.eth` untuk membuat peningkatan kontrak menjadi transparan
- **Atur catatan terbalik** untuk menautkan kontrak ke nama ENS agar terlihat di aplikasi seperti dompet dan penjelajah rantai blok.
- **Pantau tanggal kedaluwarsa dengan cermat** jika Anda ingin mencegah perubahan kepemilikan yang tidak disengaja
- **Verifikasi sumber kontrak** agar pengguna dapat mempercayai bahwa kontrak yang dinamai berperilaku seperti yang diharapkan

## Risiko {#risks}

Menamai kontrak pintar memberikan manfaat signifikan bagi pengguna Ethereum, namun, pemilik domain ENS harus waspada terhadap pengelolaannya. Risiko penting meliputi:

- **Kedaluwarsa**: Sama seperti nama DNS, pendaftaran nama ENS memiliki durasi yang terbatas. Oleh karena itu, sangat penting bagi pemilik untuk memantau tanggal kedaluwarsa domain mereka dan memperbaruinya jauh sebelum tanggal kedaluwarsa. Baik Aplikasi ENS maupun Enscribe menyediakan indikator visual bagi pemilik domain ketika masa kedaluwarsa akan tiba.
- **Perubahan kepemilikan**: Catatan ENS direpresentasikan sebagai NFT di Ethereum, di mana pemilik domain `.eth` tertentu memiliki NFT terkait dalam kepemilikannya. Oleh karena itu, jika akun yang berbeda mengambil alih kepemilikan NFT ini, pemilik baru dapat mengubah catatan ENS apa pun sesuai keinginan mereka.

Untuk mengurangi risiko semacam itu, akun pemilik untuk domain tingkat ke-2 (2LD) `.eth` harus diamankan melalui dompet multi-sig dengan subdomain yang dibuat untuk mengelola penamaan kontrak. Dengan cara itu, jika terjadi perubahan kepemilikan yang tidak disengaja atau jahat di tingkat subdomain, perubahan tersebut dapat diganti oleh pemilik 2LD.

## Masa depan penamaan kontrak {#future}

Penamaan kontrak menjadi praktik terbaik untuk pengembangan dapp, serupa dengan bagaimana nama domain menggantikan alamat IP di web. Seiring semakin banyaknya infrastruktur seperti dompet, penjelajah, dan dasbor yang mengintegrasikan resolusi ENS untuk kontrak, kontrak yang dinamai akan meningkatkan keamanan dan mengurangi kesalahan di seluruh ekosistem.

Dengan membuat kontrak pintar lebih mudah dikenali dan dipahami, penamaan membantu menjembatani kesenjangan antara pengguna dan aplikasi di Ethereum, meningkatkan keamanan dan UX bagi pengguna.

## Bacaan lebih lanjut {#further-reading}

- [Menamai Kontrak Pintar dengan ENS](https://docs.ens.domains/web/naming-contracts/)
- [Menamai Kontrak Pintar dengan Enscribe](https://www.enscribe.xyz/docs).
