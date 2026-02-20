---
title: Pengantar teknis untuk dapps
description:
lang: id
---

Sebuah aplikasi terdesentralisasi (dapp) adalah aplikasi yang dibangun di jaringan terdesentralisasi yang menggabungkan [kontrak pintar](/developers/docs/smart-contracts/) dan antarmuka pengguna frontend. Di Ethereum, kontrak pintar dapat diakses dan transparan – seperti API terbuka – sehingga dapp Anda bahkan dapat menyertakan kontrak pintar yang telah ditulis orang lain.

## Persyaratan {#prerequisites}

Sebelum mempelajari tentang dapps, Anda harus memahami [dasar-dasar blockchain](/developers/docs/intro-to-ethereum/) dan membaca tentang jaringan Ethereum dan bagaimana jaringan tersebut terdesentralisasi.

## Definisi dapp {#definition-of-a-dapp}

Dapp menjalankan kode backendnya pada jaringan peer-to-peer yang terdesentralisasi. Bandingkan ini dengan aplikasi di mana kode backend beroperasi di server terpusat.

Dapp dapat memiliki kode frontend dan antarmuka pengguna yang ditulis dalam bahasa apa pun (seperti aplikasi) yang dapat melakukan panggilan ke backendnya. Selanjutnya, frontendnya dapat dihosting di penyimpanan terdesentralisasi seperti [IPFS](https://ipfs.io/).

- **Terdesentralisasi** - dapps beroperasi di Ethereum, sebuah platform publik terdesentralisasi yang terbuka di mana tidak ada satu orang atau kelompok yang memiliki kendali
- **Deterministik** - dapps melakukan fungsi yang sama terlepas dari lingkungan tempat dieksekusinya
- **Lengkap Turing** - dapps dapat melakukan tindakan apa pun dengan sumber daya yang diperlukan
- **Terisolasi** - dapps dieksekusi di lingkungan virtual yang dikenal sebagai Mesin Virtual Ethereum sehingga jika kontrak pintar memiliki bug, itu tidak akan menghambat fungsi normal dari jaringan blockchain

### Tentang kontrak pintar {#on-smart-contracts}

Untuk memperkenalkan dapp, kita perlu memperkenalkan kontrak pintar – backend dapp karena kurangnya istilah yang lebih baik. Untuk tinjauan yang lebih detail, kunjungi bagian kami tentang [kontrak pintar](/developers/docs/smart-contracts/).

Kontrak pintar adalah kode yang ada di blockchain Ethereum dan berjalan persis seperti yang diprogramkan. Setelah kontrak pintar diterapkan di jaringan, Anda tidak dapat mengubahnya. Dapp dapat didesentralisasi karena dikendalikan oleh logika tertulis dalam kontrak, bukan individu atau perusahaan. Ini juga berarti Anda perlu merancang kontrak Anda dengan sangat hati-hati dan mengujinya secara menyeluruh.

## Manfaat pengembangan dapp {#benefits-of-dapp-development}

- **Tanpa waktu henti** – Setelah kontrak pintar diterapkan di blockchain, jaringan secara keseluruhan akan selalu dapat melayani klien yang ingin berinteraksi dengan kontrak. Oleh karena itu, aktor jahat tidak dapat meluncurkan serangan penolakan layanan yang ditargetkan ke dapp individu.
- **Privasi** – Anda tidak perlu memberikan identitas dunia nyata untuk menerapkan atau berinteraksi dengan dapp.
- **Tahan terhadap sensor** – Tidak ada satu entitas pun di jaringan yang dapat memblokir pengguna mengirimkan transaksi, menerapkan dapps, atau membaca data dari blockchain.
- **Integritas data lengkap** – Data yang disimpan di blockchain tidak dapat diubah dan tidak dapat disangkal, berkat primitif kriptografi. Pelaku jahat tidak dapat memalsukan transaksi atau data lain yang telah dipublikasikan.
- **Komputasi tanpa kepercayaan/perilaku yang dapat diverifikasi** – Kontrak pintar dapat dianalisis dan dijamin untuk dieksekusi dengan cara yang dapat diprediksi, tanpa perlu memercayai otoritas pusat. Ini tidak benar dalam model tradisional; misalnya, ketika kita menggunakan sistem perbankan online, kita harus percaya bahwa lembaga keuangan tidak akan menyalahgunakan data keuangan kita, merusak catatan, atau diretas.

## Kelemahan pengembangan dapp {#drawbacks-of-dapp-development}

- **Pemeliharaan** – Dapps bisa lebih sulit untuk dipelihara karena kode dan data yang diterbitkan ke blockchain lebih sulit untuk diubah. Sulit bagi pengembang untuk melakukan pembaruan pada dapps mereka (atau data dasar yang disimpan oleh dapp) setelah digunakan, meskipun bug atau risiko keamanan teridentifikasi pada versi lama.
- **Overhead kinerja** – Terdapat overhead kinerja yang sangat besar, dan penskalaan sangat sulit. Untuk mencapai tingkat keamanan, integritas, transparansi, dan keandalan yang dicita-citakan Ethereum, setiap node menjalankan dan menyimpan setiap transaksi. Selain itu, konsensus bukti kepemilikan juga membutuhkan waktu.
- **Kemacetan jaringan** – Saat satu dapp menggunakan terlalu banyak sumber daya komputasi, seluruh jaringan menjadi terhambat. Saat ini, jaringan hanya mampu memroses sekitar 10-15 transaksi per detik; jika transaksi dikirim lebih cepat dari ini, pool transaksi yang belum dikonfirmasi bisa dengan cepat membengkak.
- **Pengalaman pengguna** – Mungkin akan lebih sulit untuk merekayasa pengalaman yang ramah pengguna karena rata-rata pengguna akhir mungkin merasa terlalu sulit untuk menyiapkan tumpukan alat yang diperlukan untuk berinteraksi dengan blockchain dengan cara yang benar-benar aman.
- **Sentralisasi** – Solusi ramah pengguna dan ramah pengembang yang dibangun di atas lapisan dasar Ethereum pada akhirnya mungkin akan terlihat seperti layanan terpusat. Misalnya, layanan tersebut mungkin menyimpan kunci atau informasi sensitif lain di sisi server, melayani frontend menggunakan server terpusat, atau menjalankan logika perusahaan di server terpusat sebelum menulis ke blockchain. Sentralisasi menghilangkan banyak (jika tidak semua) keuntungan blockchain jika dibandingkan dengan model tradisional.

## Selengkapnya tentang pelajar visual? {#visual-learner}

<YouTube id="F50OrwV6Uk8" />

## Alat untuk membuat dapps {#dapp-tools}

**Scaffold-ETH _- Bereksperimen dengan cepat menggunakan Solidity dengan frontend yang beradaptasi dengan kontrak pintar Anda._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [Contoh dapp](https://punkwallet.io/)

**Create Eth App _- Buat aplikasi yang didukung Ethereum dengan satu perintah._**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _- Alat FOSS untuk membuat frontend dapp dari sebuah [ABI](/glossary/#abi)._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _- Alat FOSS untuk para pengembang Ethereum untuk menguji node mereka, serta menyusun & men-debug panggilan RPC dari peramban._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _- SDK dalam setiap bahasa, kontrak pintar, alat, dan infrastruktur untuk pengembangan web3._**

- [Beranda](https://thirdweb.com/)
- [Dokumentasi](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint _- Platform pengembangan web3 tingkat perusahaan untuk menyebarkan kontrak pintar, mengaktifkan pembayaran kartu kredit dan lintas rantai, dan menggunakan API untuk membuat, mendistribusikan, menjual, menyimpan, dan mengedit NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Dokumentasi](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## Bacaan lebih lanjut {#further-reading}

- [Jelajahi dapps](/apps)
- [Arsitektur aplikasi Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
- [A 2021 guide to decentralized applications](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) - _LimeChain_
- [What Are Decentralized Apps?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) - _Gemini_
- [Popular dapps](https://www.alchemy.com/dapps) - _Alchemy_

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Topik Terkait {#related-topics}

- [Pengantar tumpukan Ethereum](/developers/docs/ethereum-stack/)
- [Kerangka kerja pengembangan](/developers/docs/frameworks/)
