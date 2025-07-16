---
title: Proposal Peningkatan Ethereum (EIP)
description: Informasi dasar yang Anda perlukan untuk memahami EIP
lang: id
---

# Pengantar pada Proposal Peningkatan Ethereum (EIP) {#introduction-to-ethereum-improvement-proposals}

## Apa itu EIP? {#what-are-eips}

[Proposal Peningkatan Ethereum (EIP)](https://eips.ethereum.org/) adalah standar yang menentukan fitur atau proses baru yang potensial untuk Ethereum. EIP memuat spesifikasi teknis untuk usulan-usulan perubahan dan bertindak sebagai "sumber kebenaran" untuk komunitas. Peningkatan jaringan dan standar aplikasi untuk Ethereum didiskusikan dan dikembangkan melalui proses EIP.

Siapa pun yang ada dalam komunitas Ethereum memiliki kemampuan untuk membuat EIP. Panduan untuk menulis EIP disertakan dalam [EIP-1](https://eips.ethereum.org/EIPS/eip-1). EIP sebaiknya memberikan spesifikasi teknis yang ringkas dengan sedikit motivasi. Penulis EIP bertanggung jawab untuk mencapai konsensus di dalam komunitas dan mendokumentasikan pendapat-pendapat alternatif. Mengingat tingginya hambatan teknis untuk mengirimkan EIP yang terbentuk dengan baik, secara historis, sebagian besar penulis EIP biasanya adalah pengembang aplikasi atau protokol.

## Mengapa EIP penting? {#why-do-eips-matter}

EIP memainkan peranan penting bagaimana perubahan terjadi dan terdokumentasi di Ethereum. EIP adalah cara bagi orang-orang untuk mengusulkan, mendebat, dan mengadopsi perubahan. Ada [berbagai jenis EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types), termasuk EIP inti untuk perubahan protokol tingkat rendah yang memengaruhi konsensus dan memerlukan peningkatan jaringan seperti [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), dan ERC untuk standar aplikasi seperti [EIP-20](https://eips.ethereum.org/EIPS/eip-20) dan [EIP-721](https://eips.ethereum.org/EIPS/eip-721).

Setiap peningkatan jaringan terdiri dari sekumpulan EIP yang harus diimplementasikan oleh masing-masing [klien Ethereum](/learn/#clients-and-nodes) di jaringan. Ini berarti bahwa untuk tetap berada dalam konsensus dengan klien lain di Jaringan Utama Ethereum, pengembang klien harus memastikan bahwa mereka telah menerapkan semua EIP yang diperlukan.

Seiring dengan menyediakan spesifikasi teknis untuk perubahan, EIP adalah unit di mana pemerintahan terjadi di Ethereum: siapa pun bebas untuk mengusulkan EIP, kemudian beragam pemangku kepentingan di dalam komunitas akan berdebat untuk menentukan apakah usulan itu harus diadopsi sebagai standar atau dimasukkan ke dalam peningkatan jaringan. Karena EIP non-inti tidak harus diadopsi oleh semua aplikasi (misalnya, dimungkinkan untuk membuat token yang dapat dipertukarkan yang tidak mengimplementasikan EIP-20), tetapi EIP inti harus diadopsi secara luas (karena semua simpulhar us ditingkatkan untuk tetap menjadi bagian dari jaringan yang sama), EIP inti membutuhkan konsensus yang lebih luas di dalam komunitas dibandingkan dengan EIP non-inti.

## Riwayat EIP {#history-of-eips}

[Repositori GitHub Ethereum Improvement Proposals (EIP)](https://github.com/ethereum/EIPs) dibuat pada Oktober 2015. Proses EIP didasarkan pada proses [Bitcoin Improvement Proposals (BIP)](https://github.com/bitcoin/bips), yang didasatkan pada proses [Python Enhancement Proposals (PEP)](https://www.python.org/dev/peps/).

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

Jika Anda ingin menjadi editor EIP, silakan lihat [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069).

Editor EIP memutuskan kapan sebuah proposal siap menjadi EIP, dan membantu penulis EIP untuk memajukan proposal mereka. [Ethereum Cat Herders](https://www.ethereumcatherders.com/) membantu mengorganisir pertemuan antara para editor EIP dan komunitas (lihat [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

Proses standardisasi lengkap yang disertai dengan bagan dideskripsikan dalam [EIP-1](https://eips.ethereum.org/EIPS/eip-1)

## Pelajari lebih lanjut {#learn-more}

Jika Anda tertarik untuk membaca lebih lanjut tentang EIP, lihat [situs web EIP](https://eips.ethereum.org/) dan [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Berikut adalah beberapa tautan yang berguna:

- [Daftar setiap Proposal Peningkatan Ethereum](https://eips.ethereum.org/all)
- [Penjelasan tentang semua jenis EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [Penjelasan tentang semua status EIP](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### Proyek pendidikan komunitas {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — *PEEPanEIP adalah seri video edukasi yang membahas Ethereum Improvement Proposal (EIPs) dan fitur-fitur utama dari pembaruan yang akan datang.*
- [EIP Untuk Kutu Buku](https://ethereum2077.substack.com/t/eip-research) — *EIP Untuk Kutu Buku memberikan gambaran umum gaya ELI5 yang komprehensif dari berbagai Proposal Peningkatan Ethereum (EIP), termasuk EIP inti dan EIP lapisan aplikasi/infrastruktur (ERC), untuk mengedukasi pembaca dan membentuk konsensus di sekitar perubahan yang diusulkan pada protokol Ethereum.*
- [EIPs.wtf](https://www.eips.wtf/) — *EIPs.wtf memberikan informasi tambahan untuk Proposal Peningkatan Ethereum (EIP), termasuk statusnya, detail implementasi, permintaan penarikan terkait, dan umpan balik komunitas.*
- [EIP.Fun](https://eipfun.substack.com/) — *EIP.Fun memberikan berita terbaru tentang Proposal Peningkatan Ethereum (EIP), pembaruan tentang pertemuan EIP, dan banyak lagi.*
- [EIPs Insight](https://eipsinsight.com/) — *EIPs Insight adalah representasi dari keadaan proses Proposal peningkatan Ethereum (EIP) & statistik sesuai dengan informasi yang dikumpulkan dari berbagai sumber.*

## Partisipasi {#participate}

Siapa pun dapat membuat EIP. Sebelum mengirimkan proposal, seseorang harus membaca [EIP-1](https://eips.ethereum.org/EIPS/eip-1) yang menguraikan proses EIP dan cara menulis EIP, dan meminta umpan balik di [Ethereum Magicians](https://ethereum-magicians.org/), di mana proposal pertama kali didiskusikan dengan komunitas sebelum drafnya dikirimkan.

## Referensi {#references}

<cite class="citation">

Isi halaman yang disediakan ini merupakan bagian dari [Pemerintahan Pengembangan Protokol Ethereum dan Peningkatan Jaringan Coordination](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) oleh Hudson Jameson

</cite>
