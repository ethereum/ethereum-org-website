---
title: Pengantar dapps
description:
lang: id
---

Aplikasi terdesentralisasi (dapp) adalah aplikasi yang dibangun di atas jaringan terdesentralisasi yang menggabungkan [kontrak pintar](/developers/docs/smart-contracts/) dan antarmuka pengguna frontend. Di Ethereum, kontrak pintar dapat diakses dan transparan – seperti API terbuka – sehingga dapp Anda bahkan dapat menyertakan kontrak pintar yang telah ditulis orang lain.

## Prasyarat {#prerequisites}

Sebelum mempelajari tentang dapp, Anda harus mempelajari [dasar-dasar blockchain](/developers/docs/intro-to-ethereum/) dan membaca tentang jaringan Ethereum dan bagaimana itu terdesentralisasi.

## Definisi sebuah dapp {#definition-of-a-dapp}

Dapp menjalankan kode backendnya pada jaringan peer-to-peer yang terdesentralisasi. Bandingkan ini dengan aplikasi di mana kode backend beroperasi di server terpusat.

Dapp dapat memiliki kode frontend dan antarmuka pengguna yang ditulis dalam bahasa apa pun (seperti aplikasi) yang dapat melakukan panggilan ke backendnya. Selain itu, frontendnya dapat di-host pada penyimpanan terdesentralisasi seperti [IPFS](https://ipfs.io/).

- **Terdesentralisasi** - dapp beroperasi di Ethereum, sebuah platform terdesentralisasi publik yang terbuka di mana tidak ada satu orang atau satu grup mana pun yang mengontrolnya
- **Deterministik** - dapp melakukan fungsi yang sama terlepas dari lingkungan tempatnya dieksekusi
- **Lengkap secara Turing** - dapp dapat melakukan aksi apa pun selama sumber daya yang diperlukan tersedia
- **Terisolasi** - dapp dieksekusi di lingkungan virtual yang dikenal sebagai Mesin Virtual Ethereum sehingga jika kontrak pintar memiliki bug, itu tidak akan menghambat fungsi normal dari jaringan blockchain

### Tentang kontrak pintar {#on-smart-contracts}

Untuk memperkenalkan dapp, kita perlu memperkenalkan kontrak pintar – backend dapp karena kurangnya istilah yang lebih baik. Untuk tinjauan umum yang terperinci, buka bagian tentang [kontrak pintar](/developers/docs/smart-contracts/) kami.

Kontrak pintar adalah kode yang ada di blockchain Ethereum dan berjalan persis seperti yang diprogramkan. Setelah kontrak pintar diterapkan di jaringan, Anda tidak dapat mengubahnya. Dapp dapat didesentralisasi karena dikendalikan oleh logika tertulis dalam kontrak, bukan individu atau perusahaan. Ini juga berarti Anda perlu merancang kontrak Anda dengan sangat hati-hati dan mengujinya secara menyeluruh.

## Keuntungan dari pengembangan dapp {#benefits-of-dapp-development}

- **Tanpa waktu henti** – Setelah kontrak pintar diterapkan dan berada di blockchain, jaringan secara keseluruhan akan selalu dapat melayani klien yang ingin berinteraksi dengan kontrak. Oleh karena itu, aktor jahat tidak dapat meluncurkan serangan penolakan layanan yang ditargetkan ke dapp individu.
- **Privasi** – Anda tidak perlu memberikan identitas dunia nyata untuk menerapkan atau berinteraksi dengan dapp.
- **Tahan terhadap penyensoran** – Tidak ada satu pun entitas di jaringan yang dapat memblokir pengguna mengirimkan transaksi, menerapkan dapp, atau membaca data dari blockchain.
- **Integritas data lengkap** – Data yang disimpan di blockchain tidak dapat diubah dan tidak dapat disangkal, berkat algoritma primitif kriptografi. Pelaku jahat tidak dapat memalsukan transaksi atau data lain yang telah dipublikasikan.
- **Komputasi yang tidak dapat dipercaya/perilaku yang dapat diverifikasi** – kontrak pintar dapat dianalisis dan dijamin untuk dijalankan dengan cara yang dapat diprediksi, tanpa perlu memercayai otoritas pusat. Ini tidak benar dalam model tradisional; misalnya, ketika kita menggunakan sistem perbankan online, kita harus percaya bahwa lembaga keuangan tidak akan menyalahgunakan data keuangan kita, merusak catatan, atau diretas.

## Kelemahan dari pengembangan dapp {#drawbacks-of-dapp-development}

- **Pemeliharaan** – Dapp bisa lebih sulit dipelihara karena kode dan data yang dipublikasikan ke blockchain lebih sulit untuk dimodifikasi. Sulit bagi pengembang untuk melakukan pembaruan pada dapp mereka (atau data dasar yang disimpan oleh dapp) setelah diterapkan - meskipun bug atau risiko keamanan diidentifikasi dalam versi lama.
- **Overhead kinerja** – Ada overhead kinerja yang sangat besar, dan penskalaan sangat sulit dilakukan. Untuk mencapai tingkat keamanan, integritas, transparansi, dan keandalan yang dicita-citakan Ethereum, setiap node menjalankan dan menyimpan setiap transaksi. Selain itu, bukti kerja membutuhkan waktu juga. Perhitungan back-of-the-envelope menempatkan overhead pada sesuatu seperti 1.000.000x dari perhitungan standar saat ini.
- **Kemacetan jaringan** – Ketika satu dapp menggunakan terlalu banyak sumber daya komputasi, seluruh jaringan akan dicadangkan. Saat ini, jaringan hanya mampu memroses sekitar 10-15 transaksi per detik; jika transaksi dikirim lebih cepat dari ini, pool transaksi yang belum dikonfirmasi bisa dengan cepat membengkak.
- **Pengalaman pengguna** – Mungkin lebih sulit untuk merancang pengalaman yang ramah pengguna karena rata-rata pengguna akhir mungkin merasa terlalu sulit untuk menyiapkan tumpukan alat yang diperlukan untuk berinteraksi dengan blockchain dengan cara yang benar-benar aman.
- **Sentralisasi** – Solusi ramah pengguna dan pengembang yang dibangun di atas lapisan dasar Ethereum, bagaimanapun, mungkin akhirnya akan tampak seperti layanan terpusat. Misalnya, layanan tersebut mungkin menyimpan kunci atau informasi sensitif lain di sisi server, melayani frontend menggunakan server terpusat, atau menjalankan logika perusahaan di server terpusat sebelum menulis ke blockchain. Sentralisasi menghilangkan banyak (jika tidak semua) keuntungan blockchain jika dibandingkan dengan model tradisional.

## Selengkapnya tentang pelajar visual? {#visual-learner}

<YouTube id="F50OrwV6Uk8" />

## Peralatan dapp {#dapp-tools}

**Scaffold-ETH _- Eksperimen cepat dengan Solidity menggunakan frontend yang disesuaikan dengan kontrak pintar Anda._**

- [GitHub](https://github.com/austintgriffith/scaffold-eth)
- [Contoh dapp](https://punkwallet.io/)

**Buat Aplikasi Eth _- Buat aplikasi yang didukung Ethereum dengan satu perintah._**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**Dapp Sekali Klik _- Peralatan FOSS untuk menghasilkan frontend dapp dari [ABI](/glossary/#abi)._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _- Peralatan FOSS bagi pengembang Ethereum untuk menguji node mereka, dan menyusun & melakukan debug pemanggilan RPC dari browser._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

## Bacaan lebih lanjut {#further-reading}

- [Arsitektur aplikasi Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
- [Panduan 2021 untuk aplikasi terdesentralisasi](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) - _LimeChain_
- [Apa itu Aplikasi Terdesentralisasi?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) - _Gemini_

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Topik Terkait {#related-topics}

- [Pengantar tumpukan Ethereum](/developers/docs/ethereum-stack/)
- [Kerangka kerja pengembangan](/developers/docs/frameworks/)
