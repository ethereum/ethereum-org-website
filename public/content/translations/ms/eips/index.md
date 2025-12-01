---
title: Cadangan Penambahbaikan Ethereum (EIP)
description: Maklumat asas yang anda perlukan untuk memahami EIP
lang: ms
---

# Pengenalan kepada Cadangan Penambahbaikan Ethereum (EIP) {#introduction-to-ethereum-improvement-proposals}

## Apakah itu EIP? {#what-are-eips}

[Cadangan Penambahbaikan Ethereum (EIP)](https://eips.ethereum.org/) ialah piawaian yang menyatakan potensi ciri atau proses baharu untuk Ethereum. EIP mengandungi spesifikasi teknikal untuk perubahan yang dicadangkan dan bertindak sebagai “sumber kebenaran” untuk komuniti. Naik taraf rangkaian dan piawaian aplikasi untuk Ethereum dibincangkan dan dibangunkan melalui proses EIP.

Sesiapa sahaja dalam komuniti Ethereum mempunyai keupayaan untuk mencipta EIP. Garis panduan untuk menulis EIP disertakan dalam [EIP-1](https://eips.ethereum.org/EIPS/eip-1). EIP harus menyediakan spesifikasi teknikal yang ringkas dengan sedikit motivasi. Pengarang EIP bertanggungjawab untuk mencapai kata sepakat dalam komuniti dan mendokumentasikan pendapat alternatif. Memandangkan halangan teknikal yang tinggi untuk menyerahkan EIP yang terbentuk dengan baik, dari segi sejarah, kebanyakan pengarang EIP biasanya pembangun aplikasi atau protokol.

## Mengapakah EIP penting? {#why-do-eips-matter}

EIP memainkan peranan penting dalam cara perubahan berlaku dan didokumenkan di Ethereum. Itu adalah cara untuk orang ramai mencadangkan, berdebat dan menerima pakai perubahan. Terdapat [jenis EIP yang berbeza](https://eips.ethereum.org/EIPS/eip-1#eip-types), termasuk EIP teras untuk perubahan protokol peringkat rendah yang menjejaskan konsensus dan memerlukan naik taraf rangkaian seperti [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) dan ERC untuk piawaian aplikasi seperti [EIP-20](https://eips.ethereum.org/EIPS/eip-20) dan [EIP-721](https://eips.ethereum.org/EIPS/eip-721).

Setiap naik taraf rangkaian terdiri daripada satu set EIP yang perlu dilaksanakan oleh setiap [Ethereum client](/learn/#clients-and-nodes) pada rangkaian. Ini bermakna untuk kekal dalam konsensus dengan klien lain pada Rangkaian Utama Ethereum, pembangun klien perlu memastikan semua telah melaksanakan EIP yang diperlukan.

Selain menyediakan spesifikasi teknikal untuk perubahan, EIP ialah unit di mana tadbir urus berlaku di Ethereum: sesiapa sahaja bebas untuk mencadangkannya, dan kemudian pelbagai pihak berkepentingan dalam komuniti akan berdebat untuk menentukan sama ada ia harus diterima pakai sebagai piawaian atau dimasukkan dalam naik taraf rangkaian. Oleh sebab EIP bukan teras tidak perlu diterima pakai oleh semua aplikasi (contohnya, ia mungkin untuk mencipta token boleh diganti yang tidak melaksanakan EIP-20), tetapi EIP teras mesti diterima pakai secara meluas (kerana semua nod mesti menaik taraf untuk kekal sebagai sebahagian daripada rangkaian yang sama), EIP teras memerlukan konsensus yang lebih luas dalam komuniti berbanding EIP bukan teras.

## Sejarah EIP {#history-of-eips}

Repositori [Cadangan Penambahbaikan Ethereum (EIP) GitHub](https://github.com/ethereum/EIPs) telah diwujudkan pada Oktober 2015. Proses EIP adalah berdasarkan proses [Cadangan Penambahbaikan Bitcoin (BIP)](https://github.com/bitcoin/bips), yang pada asalnya berdasarkan proses [Python Enhancement Proposals (PEP)](https://www.python.org/dev/peps/).

Editor EIP ditugaskan dengan proses menyemak EIP untuk ketepatan teknikal, isu format, serta membetulkan ejaan, tatabahasa, dan gaya kod. Martin Becze, Vitalik Buterin, Gavin Wood, dan beberapa individu lain merupakan editor EIP asal dari 2015 hingga akhir 2016.

Editor EIP semasa ialah

- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

Editor EIP Emeritus ialah

- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Martin Becze (@wanderer)
- Micah Zoltu (@MicahZoltu)
- Nick Johnson (@arachnid)
- Nick Savers (@nicksavers)
- Vitalik Buterin (@vbuterin)

Jika anda ingin menjadi editor EIP, sila semak [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069).

Editor EIP memutuskan masa sesuatu cadangan sedia untuk menjadi EIP, dan membantu pengarang EIP memajukan cadangan mereka. [Ethereum Cat Herders](https://www.ethereumcatherders.com/) membantu menganjurkan mesyuarat antara editor EIP dan komuniti (lihat [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

Proses penyeragaman penuh beserta carta diterangkan dalam [EIP-1](https://eips.ethereum.org/EIPS/eip-1)

## Ketahui lebih lanjut {#learn-more}

Jika anda berminat untuk membaca lebih lanjut tentang EIP, sila lihat [laman web EIP](https://eips.ethereum.org/) dan [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Berikut ialah beberapa pautan berguna:

- [Senarai setiap Cadangan Penambahbaikan Ethereum](https://eips.ethereum.org/all)
- [Penerangan tentang semua jenis EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [Penerangan tentang semua status EIP](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### Projek pendidikan komuniti {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — *PEEPanEIP ialah siri video pendidikan yang membincangkan Cadangan Penambahbaikan Ethereum (EIP) dan ciri utama naik taraf yang akan datang.*
- [EIPs For Nerds](https://ethereum2077.substack.com/t/eip-research) — *EIPs For Nerds menyediakan gambaran menyeluruh gaya ELI5 tentang pelbagai Cadangan Penambahbaikan Ethereum (EIP), termasuk EIP teras dan EIP lapisan aplikasi/infrastruktur (ERC), untuk mendidik pembaca dan membentuk konsensus mengenai perubahan yang dicadangkan kepada protokol Ethereum.*
- [EIPs.wtf](https://www.eips.wtf/) — *EIPs.wtf menyediakan maklumat tambahan untuk Cadangan Penambahbaikan Ethereum (EIP), termasuk statusnya, butiran pelaksanaan, permintaan tarik berkaitan, dan maklum balas komuniti.*
- [EIP.Fun](https://eipfun.substack.com/) — *EIP.Fun menyediakan berita terkini mengenai Cadangan Penambahbaikan Ethereum (EIP), kemas kini mesyuarat EIP, dan lain-lain.*
- [EIPs Insight](https://eipsinsight.com/) — *EIPs ialah gambaran mengenai keadaan proses & statistik Cadangan Penambahbaikan Ethereum (EIP) berdasarkan maklumat yang dikumpul daripada pelbagai sumber.*

## Sertai {#participate}

Sesiapa sahaja boleh mencipta EIP. Sebelum menghantar cadangan, seseorang mesti membaca [EIP-1](https://eips.ethereum.org/EIPS/eip-1) yang menerangkan proses EIP dan cara menulis EIP, serta mendapatkan maklum balas di [Ethereum Magicians](https://ethereum-magicians.org/), iaitu cadangan dibincangkan terlebih dahulu dengan komuniti sebelum draf dihantar.

## Rujukan {#references}

<cite class="citation">

Kandungan halaman disediakan sebahagiannya daripada [Penyelarasan Tadbir Urus Pembangunan Protokol dan Naik Taraf Rangkaian Ethereum](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) oleh Hudson Jameson

</cite>
