---
title: Proposal Peningkatan Ethereum (EIP)
description: Informasi dasar yang Anda perlukan untuk memahami Proposal Peningkatan Ethereum (EIP).
lang: id
---

# Pengantar pada Proposal Peningkatan Ethereum (EIP) {#introduction-to-ethereum-improvement-proposals-eips}

## Apa itu EIP? {#what-are-eips}

[Proposal Peningkatan Ethereum (EIP)](https://eips.ethereum.org/) adalah standar yang menentukan fitur atau proses baru yang potensial untuk Ethereum. EIP memuat spesifikasi teknis untuk usulan-usulan perubahan dan bertindak sebagai "sumber kebenaran" untuk komunitas. Peningkatan jaringan dan standar aplikasi untuk Ethereum didiskusikan dan dikembangkan melalui proses EIP.

Siapa pun yang ada dalam komunitas Ethereum memiliki kemampuan untuk membuat EIP. Pedoman untuk menulis EIP disertakan di [EIP 1](https://eips.ethereum.org/EIPS/eip-1). EIP harus memberikan spesifikasi teknis singkat tentang fitur-fitur yang tersedia dengan alasan logis dibaliknya. Penulis EIP bertanggung jawab untuk membangun konsensus di dalam komunitas dan mendokumentasikan perbedaan pendapat. Mengingat tingginya standar teknis untuk mengajukan EIP dengan kualitas yang baik, secara historis, sebagian besar penulis EIP memiliki pengalaman sebagai pengembang aplikasi atau protokol.

## Mengapa EIP penting? {#why-do-eips-matter}

EIP memainkan peranan penting bagaimana perubahan terjadi dan terdokumentasi di Ethereum. EIP adalah cara bagi orang-orang untuk mengusulkan, mendebat, dan mengadopsi perubahan. Ada [berbagai jenis EIP](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1.md#eip-types) yang mencakup EIP inti untuk perubahan protokol tingkat rendah yang memengaruhi konsensus dan membutuhkan peningkatan jaringan serta ERC untuk standar aplikasi. Sebagai contoh, standar untuk membuat token, seperti [ERC20](https://eips.ethereum.org/EIPS/eip-20) atau [ERC721](https://eips.ethereum.org/EIPS/eip-721) memungkinkan aplikasi berinteraksi dengan token ini untuk memperlakukan semua token menggunakan aturan yang sama, yang memudahkan untuk membuat aplikasi yang dapat bertukar informasi.

Setiap peningkatan jaringan terdiri dari sekumpulan EIP yang harus diimplementasikan oleh masing-masing [klien Ethereum](/learn/#clients-and-nodes) di jaringan. Ini menyiratkan bahwa untuk tetap dalam konsensus dengan klien lainnya di Jaringan Utama Ethereum, pengembang klien perlu memastikan mereka semua telah menerapkan EIP yang dibutuhkan.

Seiring dengan menyediakan spesifikasi teknis untuk perubahan, EIP adalah unit di mana tata kelola terjadi di Ethereum: siapa pun bebas untuk mengusulkan EIP, kemudian beragam pemangku kepentingan di dalam komunitas akan berdebat untuk menentukan apakah usulan itu harus diadopsi sebagai standar atau dimasukkan ke dalam peningkatan jaringan. Karena EIP non-inti tidak harus diadopsi oleh semua aplikasi (sebagai contoh, Anda bisa membuat satu token non-[ERC20](https://eips.ethereum.org/EIPS/eip-20)), tetapi EIP inti harus diadopsi secara luas (karena semua node harus melakukan peningkatan agar tetap menjadi bagian dari jaringan yang sama), EIP inti memerlukan konsensus yang lebih luas di dalam komunitas ketimbang EIP non-inti.

## Riwayat EIP {#history-of-eips}

[Repositori GitHub Ethereum Improvement Proposals (EIP)](https://github.com/ethereum/EIPs) dibuat pada Oktober 2015. Proses EIP didasarkan pada proses [Bitcoin Improvement Proposals (BIP)](https://github.com/bitcoin/bips), yang didasatkan pada proses [Python Enhancement Proposals (PEP)](https://www.python.org/dev/peps/).

Editor EIP ditugaskan mengulas EIP untuk melihat kesehatan teknisnya, kesesuaian ejaan/gramatikanya, dan gaya kodenya. Martin Becze, Vitalik Buterin, Gavin Wood, dan beberapa lainnya adalah editor asli EIP dari 2015 sampai akhir 2016. Editor EIP saat ini adalah:

- Alex Beregszaszi (EWASM/Yayasan Ethereum)
- Greg Colvin (Komunitas)
- Casey Detrio (EWASM/Yayasan Ethereum)
- Matt Garnett (Quilt)
- Hudson James (Yayasan Ethereum)
- Nick Johnson (ENS)
- Nick Savers (Komunitas)
- Micah Zoltu (Komunitas)

Editor EIP bersama dengan anggota komunitas dari [Ethereum Cat Herders](https://ethereumcatherders.com/) dan [Ethereum Magicians](https://ethereum-magicians.org/) memutuskan EIP mana yang akan di implementasikan, yang akan bertanggung jawab untuk memfasilitasi EIP juga memindakan EIP ke tahap "Final" atau "Penarikan".

Proses standardisasi lengkap yang disertai dengan bagan dideskripsikan dalam [EIP-1](https://eips.ethereum.org/EIPS/eip-1)

## Pelajari lebih lanjut {#learn-more}

Jika Anda tertarik untuk membaca lebih lanjut tentang EIP, kunjungi [situs web EIP](https://eips.ethereum.org/) di mana Anda dapat menemukan informasi tambahan, termasuk:

- [Berbagai jenis EIP](https://eips.ethereum.org/)
- [Daftar dari setiap EIP yang telah dibuat](https://eips.ethereum.org/all)
- [Status EIP dan artinya](https://eips.ethereum.org/)

## Partisipasi {#participate}

Siapa pun dapat membuat EIP atau ERC, meskipun sebelumnya Anda harus membaca [EIP-1](https://eips.ethereum.org/EIPS/eip-1) yang menguraikan proses EIP, apa itu EIP, jenis EIP, dokumen EIP apa yang harus dimiliki, format dan templat EIP, daftar Editor EIP, dan semua hal yang perlu Anda ketahui tentang EIP sebelum membuatnya. EIP baru Anda harus menentukan fitur baru yang tidak terlalu kompleks, namun tidak hanya untuk kalangan tertentu dan dapat digunakan dalam proyek-proyek di ekosistem Ethereum. Bagian tersulitnya adalah fasilitasi, Anda sebagai penulis harus memfasilitasi orang-orang di sekitar EIP, mengumpulkan umpan balik, menulis artikel yang menggambarkan masalah yang diselesaikan oleh EIP, dan berkolaborasi dengan proyek untuk mengimplementasikan EIP Anda.

Jika Anda tertarik untuk mengikuti proses diskusinya atau membagikan masukan Anda tentang EIP, kunjungi [forum Ethereum Magicians](https://ethereum-magicians.org/), di mana EIP dibahas bersama dengan komunitas.

Lihat juga:

- [Cara membuat EIP](https://eips.ethereum.org/EIPS/eip-1)

## Referensi {#references}

<cite class="citation">

Isi halaman yang disediakan ini merupakan bagian dari [Tata Kelola Pengembangan Protokol Ethereum dan Peningkatan Jaringan Coordination](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) oleh Hudson Jameson

</cite>
