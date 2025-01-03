---
title: Daftar periksa keamanan kontrak pintar
description: Sebuah alur kerja yang disarankan untuk penulisan kontrak pintar yang aman
author: "Trailofbits"
tags:
  - "kontrak pintar"
  - "keamanan"
  - "solidity"
skill: intermediate
lang: id
published: 2020-09-07
source: Membuat kontrak yang aman
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## Daftar periksa pengembangan kontrak pintar {#smart-contract-development-checklist}

Berikut adalah proses tingkat tinggi yang kami sarankan untuk diikuti sementara Anda menulis kontrak pintar Anda.

Periksa masalah keamanan yang dikenal:

- Tinjau ulang kontrak Anda dengan [Slither](https://github.com/crytic/slither). Slither memiliki lebih dari 40 detektor bawaan untuk mencari kerentanan umum. Jalankan Slither pada setiap pemeriksaan dengan kode baru dan pastikan kontrak mendapatkan laporan yang bersih (atau gunakan mode triase untuk mendiamkan beberapa masalah).
- Tinjau ulang kontrak Anda dengan [Crytic](https://crytic.io/). Crytic memeriksa 50 masalah yang tidak dapat dilakukan Slither. Crytic dapat menolong tim Anda mengetahui perkembangan anggota lain juga, dengan memunculkan masalah keamanan di Permintaan Penarikan di GitHub dengan mudah.

Pertimbangkan fitur spesial kontrak Anda:

- Apakah kontrak Anda dapat ditingkatkan? Tinjau kode yang dapat ditingkatkan untuk mencari kelemahannya dengan [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) atau [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/). Kami telah mendokumentasikan 17 alur dari peningkatan yang bermasalah.
- Apakah kontrak Anda mengklaim telah sesuai dengan ERC? Periksa dengan [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance). Peralatan ini dengan segera mengidentifikasi deviasi dari enam spesifikasi umum.
- Apakah Anda berintegrasi dengan token pihak ketiga? Tinjau [daftar periksa integrasi token](/developers/tutorials/token-integration-checklist/) kami sebelum menggunakan kontrak eksternal.

Secara visual periksa fitur keamanan kritikal kode Anda:

- Tinjau printer [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) Slither. Hindari pembayangan yang tak disengaja dan masalah linearisasi C3.
- Tinjau printer [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) Slither. Tinjauan ini melaporkan visibilitas fungsi dan kontrol akses.
- Tinjau printer [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) Slither. Tinjauan ini melaporkan kontrol akses terhadap variabel state.

Dokumentasikan properti keamanan kritikal dan gunakan pembuat tes otomatis untuk mengevaluasinya:

- Pelajari cara [mendokumentasikan properti keamanan untuk kode Anda](/developers/tutorials/guide-to-smart-contract-security-tools/). Pada awalnya ini sulit, tapi inilah satu-satunya aktivitas yang paling penting untuk mencapai hasil yang baik. Aktivitas ini juga merupakan persyaratan untuk menggunakan teknik tingkat lanjut dalam tutorial ini.
- Tentukan properti keamanan di Solidity, untuk penggunaan dengan [Echidna](https://github.com/crytic/echidna) dan [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html). Fokuskan pada mesin state, kontrol akses, operasi aritmetik, interaksi eksternal, dan kesesuaian dengan standar.
- Tentukan properti keamanan dengan [API Python Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/). Fokuskan pada warisan, dependensi variabel, kontrol akses, dan masalah struktur lainnya.
- Jalankan tes properti Anda pada setiap commit dengan [Crytic](https://crytic.io). Crytic dapat mengkonsumsi dan mengevaluasi tes properti keamanan sehingga semua orang di dalam tim Anda dapat dengan mudah melihat bahwa tes lolos uji di GitHub. Tes yang gagal dapat menghalangi commit.

Akhirnya, waspadalah terhadap masalah yang tidak dapat dengan mudah ditemukan oleh peralatan otomatis:

- Kurangnya privasi: setiap orang bisa melihat transaksi Anda sementara diantrikan dalam pool
- Transaksi front running
- Operasi kriptografis
- Interaksi berisiko dengan komponon DeFi eksternal

## Minta bantuan {#ask-for-help}

[Jam kerja Ethereum](https://calendly.com/dan-trailofbits/ethereum-office-hours) dimulai setiap Selasa sore. Sesi berdurasi 1 jam dan 1 lawan 1 ini adalah kesempatan untuk mengajukan pertanyaan apa pun kepada kami tentang keamanan, penyelesaian masalah menggunakan peralatan kami, dan mendapatkan umpan balik dari para ahli tentang pendekatan yang Anda pakai saat ini. Kami akan menolong Anda memahami panduan ini.

Bergabunglah dengan Slack kami: [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw). Kami selalu dapat dihubungi di kanal #crytic dan #ethereum jika Anda memiliki pertanyaan apa pun.
