---
title: Memahami Suplai dan Penerbitan ETH
description: Panduan yang ramah bagi pemula untuk pasokan dan penerbitan ETH, yang mencakup konsep-konsep utama seperti EIP, PoS, dan EIP-1559.
lang: id
---

# Suplai dan Penerbitan ETH {#eth-supply-and-issuance}

## Persyaratan {#prerequisites}

Artikel ini ditulis untuk pemula yang tidak mempunyai pengetahuan sebelumnya. Namun, untuk memahami topik ini sepenuhnya, akan sangat membantu jika memiliki pemahaman dasar tentang konsep-konsep seperti [Ethereum Improvement Proposals (EIPs)](/eips/#introduction-to-ethereum-improvement-proposals), [Proof-of-work (PoW)](/developers/docs/consensus-mechanisms/pow/), [Proof-of-stake (PoS)](/developers/docs/consensus-mechanisms/pos/), dan [Peningkatan London](/ethereum-forks/#london).

## Berapa Jumlah Token ETH yang Ada Saat Ini? {#current-eth-supply}

Total pasokan ETH bersifat dinamis dan berubah secara konstan karena dua faktor utama:

1. \*\*Penerbitan Bukti Kepemilikan (PoS) \*\*: ETH baru dibuat sebagai hadiah untuk validator yang mengamankan jaringan
2. Pembakaran **EIP-1559**: Sebagian dari biaya transaksi dihapus secara permanen dari peredaran

Anda dapat melacak pasokan saat ini dan perubahan ini secara real-time di platform seperti [Ultrasound Money] (https://ultrasound.money).

Pasokan dan penerbitan Ethereum's adalah metrik penting untuk memahami kesehatan dan masa depan network. Tapi apa sebenarnya arti penerbitan ETH? Mari kita uraikan.

## Mengapa Pasokan dan Penerbitan ETH Penting {#why-eth-supply-matters}

Dalam keuangan tradisional, bank sentral mengendalikan ketersidaan uang, seringkali mencetak lebih banyak uang untuk merangsang perekonomian. Ethereum, di sisi lain, beroperasi pada sistem yang transparan dan dapat diprediksi yang diatur oleh code. Mengetahui berapa banyak ETH yang ada dan seberapa cepat ETH baru dikeluarkan helps:

- **membangun kepercayaan**: Komunitas Ethereum dapat memverifikasi data pasokan dan penerbitan langsung dari blockchain.
- **memahami nilai**: Hubungan antara penerbitan dan tingkat pembakaran ETH memengaruhi inflasi atau deflasi ETH, yang memengaruhi nilainya dari waktu ke waktu.
- **Pantau Kesehatan Network**: Perubahan dalam tingkat penerbitan dan pembakaran mencerminkan aktivitas dan keamanan network.

## Apa itu penerbitan ETH? {#eth-issuance}

Penerbitan ETH merujuk pada proses penciptaan ETH baru sebagai rewards bagi validator yang mengamankan network Ethereum. Ini terpisah dari total pasokan, yang merupakan jumlah keseluruhan ETH yang beredar.

### Secara sederhana:

- **Penerbitan** menambahkan ETH baru ke network.
- **Pembakaran** (diperkenalkan oleh EIP-1559) menghapus ETH dari network dengan menghancurkan sebagian dari biaya transaksi.

Kedua kekuatan ini menentukan apakah pasokan Ethereum's akan bertambah (inflasi) atau berkurang (deflasi) seiring waktu.

## Pasokan dan Penerbitan ETH Saat Ini{#eth-supply-today}

Sistem Proof-of-Stake (PoS) Ethereum telah secara drastis mengurangi penerbitan ETH dibandingkan dengan model Proof-of-Work (PoW) sebelumnya. Validators—yang mengunci ETH untuk mengamankan network—mendapatkan ETH sebagai rewards. Anda dapat melihat tingkat penerbitan saat ini di [Ultrasound Money](https://ultrasound.money).

Namun, angka ini bersifat dinamis. Berkat EIP-1559, ketika aktivitas network tinggi, tingkat pembakaran ETH dapat melampaui penerbitan, menciptakan efek deflasi. Sebagai contoh, selama periode permintaan tinggi, seperti peluncuran NFT atau aktivitas DeFi, lebih banyak ETH mungkin dibakar dibandingkan yang diterbitkan.

### Tools untuk Melacak Pasokan dan Penerbitan ETH:

- [Ultrasound Money](https://ultrasound.money) - Pelacakan waktu nyata pasokan ETH, penerbitan, dan tingkat pembakaran
- [Etherscan](https://etherscan.io) - explorer Block dengan metrik pasokan

## Faktor-Faktor yang Mempengaruhi Pasokan dan Penerbitan ETH di Masa Depan {#future-eth-supply}

Pasokan Ethereum di masa depan tidak tetap - tergantung pada beberapa variabel:

1. **Partisipasi Staking**:
   - Semakin banyak validator yang bergabung dengan jaringan berarti semakin banyak reward ETH yang didistribusikan.
   - Lebih sedikit validator yang berpartisipasi dapat mengurangi penerbitan.
   - Pelajari lebih lanjut tentang [staking](/staking/).

2. **Aktivitas Jaringan**:
   - Volume transaksi yang tinggi menyebabkan lebih banyak ETH yang dibakar, berpotensi mengimbangi atau melebihi penerbitan.
   - Baca mengenai [biaya gas](/developers/docs/gas/) dan bagaimana hal tersebut mempengaruhi pembakaran.

3. **Peningkatan Protokol**:
   - Perubahan di masa depan pada kode Ethereum dapat menyesuaikan imbalan staking atau mekanisme pembakaran, yang selanjutnya membentuk dinamika pasokan.
   - Tetap perbarui dengan [peta jalan Ethereum](/roadmap/).

## Rekap: Suplai ETH, Penerbitan, dan Apa Selanjutnya {#recap}

Berikut adalah ringkasan singkat tentang apa yang perlu Anda ketahui tentang suplai dan penerbitan ETH:

- \*\* Suplai ETH\*\*: Dinamis dan terus berubah, dapat dilacak secara real-time melalui alat bantu seperti [Ultrasound Mon ey](https://ultrasound.money)
- **Penerbitan di bawah PoS**: Berkurang secara signifikan dibandingkan dengan PoW, dengan hadiah yang diberikan kepada validator. Lihat tarif saat ini di [Ultrasound Money](https://ultrasound.money)
- Peran **EIP-1559**: Pembakaran ETH dapat membuat jaringan mengempis selama periode aktivitas tinggi
- **Tren Masa Depan**: Partisipasi staking, permintaan jaringan, dan pembaruan protokol semuanya akan membentuk pasokan ETH

Memahami penerbitan ETH membantu mengungkap nilai Ethereum dan potensinya sebagai aset terdesentralisasi yang deflasi. Untuk informasi lebih rinci tentang bagaimana The Merge berdampak pada pasokan ETH, lihat [rincian rinci] (/roadmap/merge/penerbitan/). Penasaran mengenai masa depan dari ETH? Telusuri lebih dalam dengan alat bantu seperti [Ultrasound Money](https://ultrasound.money) atau jelajahi [panduan staking](/staking/).