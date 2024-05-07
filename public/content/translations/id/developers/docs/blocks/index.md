---
title: Blok
description: Gambaran umum tentang blok di blockchain Ethereum – struktur datanya, mengapa dibutuhkan, dan bagaimana pembuatannya.
lang: id
---

Blok adalah kumpulan transaksi dengan hash dari blok sebelumnya dalam rantai. Ini menghubungkan blok bersama (dalam rantai) karena hash secara kriptografis berasal dari data blok. Ini mencegah penipuan, karena satu perubahan di blok mana pun dalam riwayat akan membatalkan semua blok berikut karena semua hash berikutnya akan berubah dan semua orang yang menjalankan blockchain akan mengetahuinya.

## Prasyarat {#prerequisites}

Blok adalah topik yang sangat ramah untuk pemula. Tetapi untuk membantu Anda lebih memahami halaman ini, kami sarankan Anda membaca terlebih dahulu [Akun](/developers/docs/accounts/), [Transaksi](/developers/docs/transactions/), dan [pengantar Ethereum](/developers/docs/intro-to-ethereum/) kami.

## Kenapa blok? {#why-blocks}

Untuk memastikan bahwa semua peserta di jaringan Ethereum mempertahankan state tersinkronisasi dan menyetujui riwayat transaksi yang tepat, kami mengelompokkan transaksi ke dalam blok. Ini berarti lusinan (atau ratusan) transaksi dilakukan, disetujui, dan disinkronkan sekaligus.

![Sebuah diagram yang menunjukkan transaksi di blok yang menyebabkan perubahan state](./tx-block.png) _Diagram diadaptasi dari [Ethereum EVM yang diilustrasikan](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Dengan memisahkan komit, kami memberi semua peserta jaringan cukup waktu untuk mencapai konsensus: meskipun permintaan transaksi terjadi puluhan kali per detik, blok di Ethereum dijalankan kira-kira sekali setiap lima belas detik.

## Bagaimana blok bekerja {#how-blocks-work}

Untuk mempertahankan riwayat transaksi, blok diurutkan secara ketat (setiap blok baru yang dibuat berisi referensi ke blok induknya), dan transaksi di dalam blok juga diurutkan secara ketat. Kecuali dalam kasus yang jarang terjadi, pada waktu tertentu, semua peserta di jaringan menyetujui jumlah persis dan riwayat blok, serta berusaha mengelompokkan permintaan transaksi yang berjalan saat ini ke blok berikutnya.

Setelah sebuah blok disatukan (ditambang) oleh beberapa penambang di jaringan, itu disebarkan ke seluruh jaringan; semua node menambahkan blok ini ke akhir blockchain mereka, dan penambangan pun berlanjut. Proses perakitan blok (penambangan) yang persis dan proses komitmen/konsensus saat ini ditentukan oleh protokol “bukti kerja” Ethereum.

### Demo visual {#a-visual-demo}

<YouTube id="_160oMzblY8" />

## Protokol bukti kerja {#proof-of-work-protocol}

Bukti kerja berarti sebagai berikut:

- Node penambangan harus menghabiskan variabel selain sejumlah besar energi, waktu, dan daya komputasi untuk menghasilkan "sertifikat legitimasi" untuk blok yang mereka usulkan ke jaringan. Ini membantu melindungi jaringan dari serangan spam/penolakan layanan, di antaranya, karena pembuatan sertifikat mahal biayanya.
- Para penambang lain yang mendengar tentang blok baru dengan sertifikat legitimasi yang valid harus menerima blok baru sebagai blok kanonis berikutnya di blockchain.
- Jumlah waktu yang tepat yang dibutuhkan penambang tertentu untuk menghasilkan sertifikat ini adalah variabel acak dengan varian tinggi. Ini memastikan bahwa tidak mungkin bahwa dua penambang menghasilkan validasi untuk blok berikutnya yang diusulkan secara bersamaan; ketika penambang memproduksi dan menyebarkan blok baru yang disertifikasi, mereka hampir dapat yakin bahwa blok tersebut akan diterima oleh jaringan sebagai blok kanonis berikutnya di blockchain, tanpa konflik (meskipun ada protokol untuk menangani konflik, maupun kasus bahwa dua rantai blok bersertifikat diproduksi hampir bersamaan).

[Selengkapnya tentang penambangan](/developers/docs/consensus-mechanisms/pow/mining/)

## Apa isi dari sebuah blok? {#block-anatomy}

- `timestamp` – waktu ketika blok ditambang.
- `blockNumber` – panjang blockchain dalam blok.
- `baseFeePerGas` - biaya minimum per gas yang diperlukan untuk memasukkan sebuah transaksi ke dalam blok.
- `difficulty` – upaya yang diperlukan untuk menambang blok.
- `mixHash` – pengenal unik untuk blok itu.
- `parentHash` – nama pengenal unik untuk blok yang dibuat sebelumnya (ini tentang cara menautkan blok dalam sebuah rantai).
- `transactions` – transaksi yang termasuk dalam blok.
- `stateRoot` – seluruh state sistem: saldo akun, penyimpanan kontrak, kode kontrak, dan nonce akun ada di dalamnya.
- `nonce` – hash yang, ketika digabungkan dengan mixHash, membuktikan bahwa blok telah melalui [bukti kerja](/developers/docs/consensus-mechanisms/pow/).

## Waktu blok {#block-time}

Waktu blok merujuk pada waktu yang diperlukan untuk menambang blok baru. Di Ethereum, waktu blok rata-rata adalah antara 12 hingga 14 detik dan dievaluasi setelah setiap blok. Waktu blok yang diharapkan ditetapkan sebagai konstanta pada tingkat protokol dan digunakan untuk melindungi keamanan jaringan ketika para penambang menambahkan lebih banyak daya komputasi. Waktu blok rata-rata dibandingkan dengan waktu blok yang diharapkan, dan jika waktu blok rata-rata lebih tinggi, maka tingkat kesulitan diturunkan di dalam header blok. Jika waktu blok rata-rata lebih kecil, maka tingkat kesulitan di dalam header blok akan ditingkatkan.

## Ukuran blok {#block-size}

Catatan penting terakhir adalah bahwa blok itu sendiri terbatas dalam ukurannya. Setiap blok memiliki ukuran target sebesar 15 juta gas tetapi ukuran blok akan bertambah atau berkurang sesuai dengan permintaan jaringan, hingga mencapai batas blok yang berukuran 30 juta gas (2x ukuran blok target). Jumlah total gas yang terpakai oleh semua transaksi dalam blok harus kurang dari batas gas blok. Ini penting karena memastikan bahwa blok tidak boleh terlalu besar. Jika blok dapat berukuran besar tanpa terkendali, maka node penuh yang berkinerja kurang secara bertahap akan berhenti untuk dapat menyesuaikan dengan jaringan karena persyaratan ruang dan kecepatan.

## Bacaan lebih lanjut {#further-reading}

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_

## Topik terkait {#related-topics}

- [Penambangan](/developers/docs/consensus-mechanisms/pow/mining/)
- [Transaksi](/developers/docs/transactions/)
- [Gas](/developers/docs/gas/)
