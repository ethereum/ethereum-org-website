---
title: Proposal Peningkatan Ethereum (EIP)
description: Informasi dasar yang Anda perlukan untuk memahami EIP
lang: id
---

# Pengantar Proposal Peningkatan Ethereum (EIP) {#introduction-to-ethereum-improvement-proposals}

## Apa itu EIP? {#what-are-eips}

[Proposal Peningkatan Ethereum (EIP)](https://eips.ethereum.org/) adalah standar yang menentukan fitur atau proses baru yang potensial untuk Ethereum. EIP memuat spesifikasi teknis untuk usulan-usulan perubahan dan bertindak sebagai "sumber kebenaran" untuk komunitas. Peningkatan jaringan dan standar aplikasi untuk Ethereum didiskusikan dan dikembangkan melalui proses EIP.

Siapa pun yang ada dalam komunitas Ethereum memiliki kemampuan untuk membuat EIP. Panduan untuk menulis EIP terdapat dalam [EIP-1](https://eips.ethereum.org/EIPS/eip-1). EIP sebaiknya memberikan spesifikasi teknis yang ringkas dengan sedikit motivasi. Penulis EIP bertanggung jawab untuk mencapai konsensus di dalam komunitas dan mendokumentasikan pendapat-pendapat alternatif. Mengingat tingginya hambatan teknis untuk mengirimkan EIP yang terbentuk dengan baik, secara historis, sebagian besar penulis EIP biasanya adalah pengembang aplikasi atau protokol.

## Mengapa EIP penting? {#why-do-eips-matter}

EIP memainkan peranan penting bagaimana perubahan terjadi dan terdokumentasi di Ethereum. EIP adalah cara bagi orang-orang untuk mengusulkan, mendebat, dan mengadopsi perubahan. Ada [berbagai jenis EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types), termasuk EIP inti untuk perubahan protokol tingkat rendah yang memengaruhi konsensus dan memerlukan peningkatan jaringan seperti [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), dan ERC untuk standar aplikasi seperti [EIP-20](https://eips.ethereum.org/EIPS/eip-20) dan [EIP-721](https://eips.ethereum.org/EIPS/eip-721).

Setiap peningkatan jaringan terdiri dari sekumpulan EIP yang harus diimplementasikan oleh setiap [klien Ethereum](/learn/#clients-and-nodes) di jaringan. Ini berarti bahwa untuk tetap berada dalam konsensus dengan klien lain di Jaringan Utama Ethereum, pengembang klien harus memastikan bahwa mereka telah menerapkan semua EIP yang diperlukan.

Seiring dengan menyediakan spesifikasi teknis untuk perubahan, EIP adalah unit di mana pemerintahan terjadi di Ethereum: siapa pun bebas untuk mengusulkan EIP, kemudian beragam pemangku kepentingan di dalam komunitas akan berdebat untuk menentukan apakah usulan itu harus diadopsi sebagai standar atau dimasukkan ke dalam peningkatan jaringan. Karena EIP non-inti tidak harus diadopsi oleh semua aplikasi (misalnya, dimungkinkan untuk membuat token yang dapat dipertukarkan yang tidak mengimplementasikan EIP-20), tetapi EIP inti harus diadopsi secara luas (karena semua simpulhar us ditingkatkan untuk tetap menjadi bagian dari jaringan yang sama), EIP inti membutuhkan konsensus yang lebih luas di dalam komunitas dibandingkan dengan EIP non-inti.

## Sejarah EIP {#history-of-eips}

[Repositori GitHub Proposal Peningkatan Ethereum (EIP)](https://github.com/ethereum/EIPs) dibuat pada bulan Oktober 2015. Proses EIP didasarkan pada proses [Bitcoin Improvement Proposals (BIP)](https://github.com/bitcoin/bips), yang didasarkan pada proses [Python Enhancement Proposals (PEP)](https://www.python.org/dev/peps/).

Editor EIP bertugas dalam proses peninjauan EIP untuk kesehatan teknis, masalah format, dan mengoreksi ejaan, tata bahasa, dan gaya kode. Martin Becze, Vitalik Buterin, Gavin Wood, dan beberapa lainnya adalah editor asli EIP dari 2015 sampai akhir 2016.

Editor EIP saat ini adalah

- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

Editor Emeritus EIP adalah

- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Martin Becze (@wanderer)
- Micah Zoltu (@MicahZoltu)
- Nick Johnson (@arachnid)
- Nick Savers (@nicksavers)
- Vitalik Buterin (@vbuterin)

Jika Anda ingin menjadi editor EIP, silakan periksa [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069).

Editor EIP memutuskan kapan sebuah proposal siap menjadi EIP, dan membantu penulis EIP untuk memajukan proposal mereka. [Ethereum Cat Herders](https://www.ethereumcatherders.com/) membantu mengatur pertemuan antara editor EIP dan komunitas (lihat [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

Proses standardisasi lengkap yang disertai dengan bagan dideskripsikan dalam [EIP-1](https://eips.ethereum.org/EIPS/eip-1)

## Pelajari selengkapnya {#learn-more}

Jika Anda tertarik untuk membaca lebih lanjut tentang EIP, kunjungi [situs web EIP](https://eips.ethereum.org/) dan [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Berikut adalah beberapa tautan yang berguna:

- [Daftar setiap Proposal Peningkatan Ethereum](https://eips.ethereum.org/all)
- [Deskripsi semua jenis EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [Deskripsi semua status EIP](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### Proyek edukasi komunitas {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — _PEEPanEIP adalah seri video edukasi yang membahas Proposal Peningkatan Ethereum (EIP) dan fitur-fitur utama dari peningkatan yang akan datang._
- [EIPs.wtf](https://www.eips.wtf/) — _EIPs.wtf memberikan informasi tambahan untuk Proposal Peningkatan Ethereum (EIP), termasuk statusnya, detail implementasi, permintaan penarikan terkait, dan umpan balik komunitas._
- [EIP.Fun](https://eipfun.substack.com/) — _EIP.Fun memberikan berita terbaru tentang Proposal Peningkatan Ethereum (EIP), pembaruan tentang pertemuan EIP, dan banyak lagi._
- [EIPs Insight](https://eipsinsight.com/) — _EIPs Insight adalah representasi dari keadaan proses & statistik Proposal Peningkatan Ethereum (EIP) sesuai informasi yang dikumpulkan dari berbagai sumber._

## Berpartisipasi {#participate}

Siapa pun dapat membuat EIP. Sebelum mengirimkan proposal, seseorang harus membaca [EIP-1](https://eips.ethereum.org/EIPS/eip-1) yang menguraikan proses EIP dan cara menulis EIP, dan meminta umpan balik di [Ethereum Magicians](https://ethereum-magicians.org/), tempat proposal pertama kali didiskusikan dengan komunitas sebelum drafnya dikirimkan.

## Referensi {#references}

<cite class="citation">

Isi halaman yang disediakan ini merupakan bagian dari [Pemerintahan Pengembangan Protokol Ethereum dan Peningkatan Jaringan Coordination](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) oleh Hudson Jameson

</cite>
