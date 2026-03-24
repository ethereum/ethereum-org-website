---
title: Daftar periksa keamanan kontrak pintar
description: Alur kerja yang disarankan untuk menulis kontrak pintar yang aman
author: "Trailofbits"
tags: ["kontrak pintar", "keamanan", "Solidity"]
skill: intermediate
breadcrumb: "Daftar keamanan"
lang: id
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## Daftar periksa pengembangan kontrak pintar {#smart-contract-development-checklist}

Berikut adalah proses tingkat tinggi yang kami sarankan untuk diikuti saat Anda menulis kontrak pintar Anda.

Periksa masalah keamanan yang diketahui:

- Tinjau kontrak Anda dengan [Slither](https://github.com/crytic/slither). Alat ini memiliki lebih dari 40 detektor bawaan untuk kerentanan umum. Jalankan pada setiap check-in dengan kode baru dan pastikan mendapatkan laporan yang bersih (atau gunakan mode triase untuk membungkam masalah tertentu).
- Tinjau kontrak Anda dengan [Crytic](https://crytic.io/). Alat ini memeriksa 50 masalah yang tidak diperiksa oleh Slither. Crytic juga dapat membantu tim Anda untuk saling memantau, dengan memunculkan masalah keamanan secara mudah di Pull Request pada GitHub.

Pertimbangkan fitur khusus dari kontrak Anda:

- Apakah kontrak Anda dapat ditingkatkan (upgradeable)? Tinjau kode peningkatan Anda untuk mencari kelemahan dengan [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) atau [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/). Kami telah mendokumentasikan 17 cara peningkatan bisa menjadi kacau.
- Apakah kontrak Anda dimaksudkan untuk mematuhi ERC? Periksa dengan [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance). Alat ini secara instan mengidentifikasi penyimpangan dari enam spesifikasi umum.
- Apakah Anda berintegrasi dengan token pihak ketiga? Tinjau [daftar periksa integrasi token](/developers/tutorials/token-integration-checklist/) kami sebelum mengandalkan kontrak eksternal.

Periksa secara visual fitur keamanan penting dari kode Anda:

- Tinjau pencetak [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) dari Slither. Hindari masalah shadowing yang tidak disengaja dan masalah linierisasi C3.
- Tinjau pencetak [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) dari Slither. Ini melaporkan visibilitas fungsi dan kontrol akses.
- Tinjau pencetak [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) dari Slither. Ini melaporkan kontrol akses pada variabel status.

Dokumentasikan properti keamanan penting dan gunakan pembuat pengujian otomatis untuk mengevaluasinya:

- Pelajari cara [mendokumentasikan properti keamanan untuk kode Anda](/developers/tutorials/guide-to-smart-contract-security-tools/). Awalnya memang sulit, tetapi ini adalah aktivitas tunggal yang paling penting untuk mencapai hasil yang baik. Ini juga merupakan prasyarat untuk menggunakan teknik lanjutan apa pun dalam tutorial ini.
- Tentukan properti keamanan di Solidity, untuk digunakan dengan [Echidna](https://github.com/crytic/echidna) dan [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html). Fokus pada mesin status Anda, kontrol akses, operasi aritmatika, interaksi eksternal, dan kesesuaian standar.
- Tentukan properti keamanan dengan [API Python Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/). Fokus pada pewarisan, dependensi variabel, kontrol akses, dan masalah struktural lainnya.
- Jalankan pengujian properti Anda pada setiap komit dengan [Crytic](https://crytic.io). Crytic dapat mengonsumsi dan mengevaluasi pengujian properti keamanan sehingga semua orang di tim Anda dapat dengan mudah melihat bahwa pengujian tersebut lulus di GitHub. Pengujian yang gagal dapat memblokir komit.

Terakhir, perhatikan masalah yang tidak dapat ditemukan dengan mudah oleh alat otomatis:

- Kurangnya privasi: orang lain dapat melihat transaksi Anda saat sedang mengantre di kolam
- Transaksi front running
- Operasi kriptografi
- Interaksi berisiko dengan komponen DeFi eksternal

## Minta bantuan {#ask-for-help}

[Jam kerja Ethereum](https://calendly.com/dan-trailofbits/office-hours) diadakan setiap Selasa sore. Sesi 1 lawan 1 selama 1 jam ini adalah kesempatan untuk menanyakan pertanyaan apa pun yang Anda miliki tentang keamanan, memecahkan masalah menggunakan alat kami, dan mendapatkan umpan balik dari para ahli tentang pendekatan Anda saat ini. Kami akan membantu Anda menyelesaikan panduan ini.

Bergabunglah dengan Slack kami: [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw). Kami selalu tersedia di saluran #crytic dan #ethereum jika Anda memiliki pertanyaan.