---
title: Standar Pengembangan Ethereum
description: Pelajari tentang standar Ethereum termasuk EIP, standar token seperti ERC-20 dan ERC-721, serta konvensi pengembangan.
lang: id
incomplete: true
---

## Ikhtisar standar {#standards-overview}

Komunitas Ethereum telah mengadopsi banyak standar yang membantu menjaga proyek (seperti [klien Ethereum](/developers/docs/nodes-and-clients/) dan dompet) dapat saling beroperasi di seluruh implementasi, dan memastikan kontrak pintar dan dapps tetap dapat disusun (composable).

Biasanya standar diperkenalkan sebagai [Proposal Pengembangan Ethereum](/eips/) (EIP), yang didiskusikan oleh anggota komunitas melalui [proses standar](https://eips.ethereum.org/EIPS/eip-1).

- [Pengantar EIP](/eips/)
- [Daftar EIP](https://eips.ethereum.org/)
- [Repo GitHub EIP](https://github.com/ethereum/EIPs)
- [Papan diskusi EIP](https://ethereum-magicians.org/c/eips)
- [Pengantar Tata Kelola Ethereum](/governance/)
- [Ikhtisar Tata Kelola Ethereum](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _31 Maret 2019 - Boris Mann_
- [Tata Kelola Pengembangan Protokol Ethereum dan Koordinasi Peningkatan Jaringan](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _23 Maret 2020 - Hudson Jameson_
- [Daftar Putar semua Rapat Pengembang Inti Ethereum](https://www.youtube.com/@EthereumProtocol) _(Daftar Putar YouTube)_

## Jenis-jenis standar {#types-of-standards}

Ada 3 jenis EIP:

- Jalur Standar (Standards Track): menjelaskan setiap perubahan yang memengaruhi sebagian besar atau semua implementasi Ethereum
- [Jalur Meta (Meta Track)](https://eips.ethereum.org/meta): menjelaskan proses di seputar Ethereum atau mengusulkan perubahan pada suatu proses
- [Jalur Informasi (Informational Track)](https://eips.ethereum.org/informational): menjelaskan masalah desain Ethereum atau memberikan pedoman atau informasi umum kepada komunitas Ethereum

Selanjutnya, Jalur Standar dibagi lagi menjadi 4 kategori:

- [Inti (Core)](https://eips.ethereum.org/core): peningkatan yang membutuhkan fork konsensus
- [Jaringan (Networking)](https://eips.ethereum.org/networking): peningkatan seputar devp2p dan Light Ethereum Subprotocol, serta usulan peningkatan pada spesifikasi protokol jaringan dari whisper dan swarm.
- [Antarmuka (Interface)](https://eips.ethereum.org/interface): peningkatan seputar spesifikasi dan standar API/RPC klien, dan standar tingkat bahasa tertentu seperti nama metode dan ABI kontrak.
- [ERC](https://eips.ethereum.org/erc): standar dan konvensi tingkat aplikasi

Informasi lebih rinci tentang berbagai jenis dan kategori ini dapat ditemukan di [EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types)

### Standar token {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - Antarmuka standar untuk token yang sepadan (dapat dipertukarkan), seperti token pemungutan suara, token staking, atau mata uang virtual.
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) - Standar token sepadan yang membuat token berperilaku identik dengan ether dan mendukung penanganan transfer token di sisi penerima.
  - [ERC-1363](/developers/docs/standards/tokens/erc-1363/) - Antarmuka ekstensi untuk token ERC-20 yang mendukung eksekusi panggilan balik (callback) pada kontrak penerima dalam satu transaksi.
- [ERC-721](/developers/docs/standards/tokens/erc-721/) - Antarmuka standar untuk non-fungible token, seperti akta untuk karya seni atau lagu.
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309) - Peristiwa standar yang dipancarkan saat membuat/mentransfer satu, atau banyak non-fungible token menggunakan pengidentifikasi token yang berurutan.
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400) - Ekstensi antarmuka untuk peran konsumen EIP-721.
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907) - Menambahkan peran berbatas waktu dengan izin terbatas pada token ERC-721.
- [ERC-777](/developers/docs/standards/tokens/erc-777/) - **(TIDAK DIREKOMENDASIKAN)** Standar token yang meningkatkan ERC-20.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - Standar token yang dapat berisi aset sepadan maupun non-fungible.
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) - Standar brankas (vault) yang ditokenisasi yang dirancang untuk mengoptimalkan dan menyatukan parameter teknis dari brankas yang menghasilkan imbal hasil (yield-bearing).

Pelajari lebih lanjut tentang [standar token](/developers/docs/standards/tokens/).

## Bacaan lebih lanjut {#further-reading}

- [Proposal Pengembangan Ethereum (EIP)](/eips/)

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_