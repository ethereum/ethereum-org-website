---
title: Pengantar teknis untuk dapp
description:
lang: id
---

Sebuah aplikasi terdesentralisasi (dapp) adalah aplikasi yang dibangun di atas jaringan terdesentralisasi yang menggabungkan [kontrak pintar](/developers/docs/smart-contracts/) dan antarmuka pengguna frontend. Di [Ethereum](/), kontrak pintar dapat diakses dan transparan – seperti API terbuka – sehingga dapp Anda bahkan dapat menyertakan kontrak pintar yang telah ditulis oleh orang lain.

## Prasyarat {#prerequisites}

Sebelum mempelajari tentang dapp, Anda harus memahami [dasar-dasar rantai blok](/developers/docs/intro-to-ethereum/) dan membaca tentang jaringan Ethereum serta bagaimana jaringan tersebut terdesentralisasi.

## Definisi dapp {#definition-of-a-dapp}

Sebuah dapp memiliki kode backend yang berjalan di jaringan peer-to-peer terdesentralisasi. Bandingkan ini dengan aplikasi di mana kode backend berjalan di server terpusat.

Sebuah dapp dapat memiliki kode frontend dan antarmuka pengguna yang ditulis dalam bahasa apa pun (sama seperti aplikasi biasa) untuk melakukan panggilan ke backend-nya. Selain itu, frontend-nya dapat dihosting di penyimpanan terdesentralisasi seperti [IPFS](https://ipfs.io/).

- **Terdesentralisasi** - dapp beroperasi di Ethereum, sebuah platform terdesentralisasi publik terbuka di mana tidak ada satu orang atau kelompok pun yang memegang kendali
- **Deterministik** - dapp menjalankan fungsi yang sama terlepas dari lingkungan tempat mereka dieksekusi
- **Lengkap Turing** - dapp dapat melakukan tindakan apa pun asalkan diberikan sumber daya yang diperlukan
- **Terisolasi** - dapp dieksekusi dalam lingkungan virtual yang dikenal sebagai Ethereum Virtual Machine sehingga jika kontrak pintar memiliki bug, hal itu tidak akan menghambat fungsi normal dari jaringan rantai blok

### Tentang kontrak pintar {#on-smart-contracts}

Untuk memperkenalkan dapp, kita perlu memperkenalkan kontrak pintar – backend dari dapp, karena tidak ada istilah yang lebih baik. Untuk gambaran umum yang mendetail, kunjungi bagian kami tentang [kontrak pintar](/developers/docs/smart-contracts/).

Kontrak pintar adalah kode yang hidup di rantai blok Ethereum dan berjalan persis seperti yang diprogramkan. Setelah kontrak pintar disebarkan di jaringan, Anda tidak dapat mengubahnya. Dapp dapat terdesentralisasi karena dikendalikan oleh logika yang ditulis ke dalam kontrak, bukan oleh individu atau perusahaan. Ini juga berarti Anda perlu merancang kontrak Anda dengan sangat hati-hati dan mengujinya secara menyeluruh.

## Manfaat pengembangan dapp {#benefits-of-dapp-development}

- **Tanpa waktu henti (Zero downtime)** – Setelah kontrak pintar disebarkan di rantai blok, jaringan secara keseluruhan akan selalu dapat melayani klien yang ingin berinteraksi dengan kontrak tersebut. Oleh karena itu, pelaku kejahatan tidak dapat meluncurkan serangan penolakan layanan (denial-of-service) yang ditargetkan ke dapp individu.
- **Privasi** – Anda tidak perlu memberikan identitas dunia nyata untuk menyebarkan atau berinteraksi dengan dapp.
- **Tahan terhadap penyensoran** – Tidak ada entitas tunggal di jaringan yang dapat memblokir pengguna dari mengirimkan transaksi, menyebarkan dapp, atau membaca data dari rantai blok.
- **Integritas data yang lengkap** – Data yang disimpan di rantai blok tidak dapat diubah dan tidak dapat dibantah, berkat primitif kriptografi. Pelaku kejahatan tidak dapat memalsukan transaksi atau data lain yang telah dipublikasikan.
- **Komputasi tanpa kepercayaan/perilaku yang dapat diverifikasi** – Kontrak pintar dapat dianalisis dan dijamin akan dieksekusi dengan cara yang dapat diprediksi, tanpa perlu memercayai otoritas pusat. Hal ini tidak berlaku pada model tradisional; misalnya, ketika kita menggunakan sistem perbankan online, kita harus percaya bahwa lembaga keuangan tidak akan menyalahgunakan data keuangan kita, merusak catatan, atau diretas.

## Kekurangan pengembangan dapp {#drawbacks-of-dapp-development}

- **Pemeliharaan** – Dapp bisa lebih sulit untuk dipelihara karena kode dan data yang dipublikasikan ke rantai blok lebih sulit untuk dimodifikasi. Sulit bagi pengembang untuk melakukan pembaruan pada dapp mereka (atau data mendasar yang disimpan oleh dapp) setelah disebarkan, bahkan jika bug atau risiko keamanan teridentifikasi dalam versi lama.
- **Beban kinerja** – Terdapat beban kinerja yang sangat besar, dan penskalaan sangatlah sulit. Untuk mencapai tingkat keamanan, integritas, transparansi, dan keandalan yang dicita-citakan Ethereum, setiap node menjalankan dan menyimpan setiap transaksi. Selain itu, konsensus Bukti Kepemilikan (PoS) juga membutuhkan waktu.
- **Kemacetan jaringan** – Ketika satu dapp menggunakan terlalu banyak sumber daya komputasi, seluruh jaringan akan terhambat. Saat ini, jaringan hanya dapat memproses sekitar 10-15 transaksi per detik; jika transaksi dikirim lebih cepat dari ini, kumpulan transaksi yang belum dikonfirmasi dapat membengkak dengan cepat.
- **Pengalaman pengguna** – Mungkin lebih sulit untuk merancang pengalaman yang ramah pengguna karena rata-rata pengguna akhir mungkin merasa terlalu sulit untuk menyiapkan tumpukan alat yang diperlukan untuk berinteraksi dengan rantai blok dengan cara yang benar-benar aman.
- **Sentralisasi** – Solusi yang ramah pengguna dan ramah pengembang yang dibangun di atas lapisan dasar Ethereum pada akhirnya mungkin akan terlihat seperti layanan terpusat. Misalnya, layanan semacam itu mungkin menyimpan kunci atau informasi sensitif lainnya di sisi server, menyajikan frontend menggunakan server terpusat, atau menjalankan logika bisnis penting di server terpusat sebelum menulis ke rantai blok. Sentralisasi menghilangkan banyak (jika tidak semua) keuntungan rantai blok dibandingkan model tradisional.

## Lebih suka belajar secara visual? {#visual-learner}

<VideoWatch slug="what-is-a-dapp" />

## Alat untuk membuat dapp {#dapp-tools}

**Scaffold-ETH _- Bereksperimen dengan cepat menggunakan Solidity dengan frontend yang beradaptasi dengan kontrak pintar Anda._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [Contoh dapp](https://punkwallet.io/)

**Create Eth App _- Buat aplikasi bertenaga Ethereum dengan satu perintah._**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _- Alat FOSS untuk menghasilkan frontend dapp dari [ABI](/glossary/#abi)._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _- Alat FOSS bagi pengembang Ethereum untuk menguji node mereka, serta menyusun & men-debug panggilan RPC dari peramban._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _- SDK dalam setiap bahasa, kontrak pintar, alat, dan infrastruktur untuk pengembangan Web3._**

- [Beranda](https://thirdweb.com/)
- [Dokumentasi](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint _- Platform pengembangan Web3 tingkat perusahaan untuk menyebarkan kontrak pintar, mengaktifkan pembayaran kartu kredit dan lintas rantai, serta menggunakan API untuk membuat, mendistribusikan, menjual, menyimpan, dan mengedit NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Dokumentasi](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## Bacaan lebih lanjut {#further-reading}

- [Jelajahi dapp](/apps)
- [Arsitektur aplikasi Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
- [Panduan tahun 2021 untuk aplikasi terdesentralisasi](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) - _LimeChain_
- [Apa Itu Aplikasi Terdesentralisasi?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) - _Gemini_
- [Dapp populer](https://www.alchemy.com/dapps) - _Alchemy_

_Tahu sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Topik Terkait {#related-topics}

- [Pengantar tumpukan Ethereum](/developers/docs/ethereum-stack/)
- [Kerangka kerja pengembangan](/developers/docs/frameworks/)

## Tutorial: Membangun aplikasi dan frontend di Ethereum {#tutorials}

- [Panduan Kontrak Uniswap-v2](/developers/tutorials/uniswap-v2-annotated-code/) _– Panduan beranotasi dari kontrak inti Uniswap v2 yang menjelaskan cara kerja pembuat pasar otomatis (AMM)._
- [Membangun antarmuka pengguna untuk kontrak Anda](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) _– Cara membangun frontend React + Wagmi modern yang terhubung ke kontrak pintar Anda._
- [Kontrak Pintar Hello World untuk Pemula – Fullstack](/developers/tutorials/hello-world-smart-contract-fullstack/) _– Tutorial ujung-ke-ujung: menulis, menyebarkan, dan membangun frontend untuk kontrak pintar sederhana._
- [Komponen server dan agen untuk aplikasi Web3](/developers/tutorials/server-components/) _– Cara menulis komponen server TypeScript yang mendengarkan peristiwa rantai blok dan merespons dengan transaksi._
- [IPFS untuk antarmuka pengguna terdesentralisasi](/developers/tutorials/ipfs-decentralized-ui/) _– Cara menghosting frontend dapp Anda di IPFS untuk ketahanan terhadap penyensoran._