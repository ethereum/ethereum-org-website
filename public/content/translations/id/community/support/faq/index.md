---
title: Pertanyaan yang sering diajukan
description: Pertanyaan umum tentang Ethereum mengenai dompet, transaksi, mengunci, dan lainnya.
lang: id
---

# Pertanyaan yang sering diajukan {#faq}

## Saya mengirim kripto ke alamat yang salah {#wrong-wallet}

Transaksi yang dikirim di Ethereum tidak dapat dibatalkan. Sayangnya, jika Anda mengirim ETH atau token ke dompet yang salah, tidak ada cara untuk membatalkan transaksi tersebut.

**Apa yang dapat Anda lakukan:**

- **Jika Anda mengetahui pemilik alamat tersebut**, hubungi mereka secara langsung dan minta mereka untuk mengembalikan dana tersebut
- **Jika alamat tersebut milik bursa atau layanan yang dikenal**, hubungi tim dukungan mereka, karena mereka mungkin dapat membantu
- **Jika Anda mengirim token ke alamat kontrak**, periksa apakah kontrak tersebut memiliki fungsi penarikan atau pemulihan (ini jarang terjadi)

Dalam kebanyakan kasus, tidak ada cara untuk memulihkan dana. Tidak ada organisasi pusat, entitas, atau orang yang memiliki Ethereum, yang berarti tidak ada yang dapat membatalkan transaksi. Selalu periksa kembali alamat penerima sebelum mengonfirmasi.

## Saya kehilangan akses ke dompet saya {#lost-wallet-access}

Opsi pemulihan Anda bergantung pada jenis dompet yang Anda gunakan.

### Jika Anda memiliki frasa seed (frasa pemulihan) Anda

Anda dapat memulihkan dompet Anda di aplikasi dompet apa pun yang kompatibel menggunakan frasa seed Anda. Inilah sebabnya mengapa sangat penting untuk menyimpan frasa seed Anda dengan aman secara offline. Periksa dokumentasi penyedia dompet Anda untuk instruksi pemulihan.

### Jika Anda kehilangan frasa seed Anda

Tanpa frasa seed atau kunci pribadi Anda, dana Anda tidak dapat dipulihkan. Tidak ada seorang pun, termasuk ethereum.org, yang dapat mengatur ulang kata sandi Anda atau memulihkan akses ke dompet hak asuh mandiri (self-custody).

### Jika akun Anda berada di bursa

Jika akun Anda berada di bursa terpusat seperti Coinbase, Binance, atau Kraken, hubungi tim dukungan bursa tersebut secara langsung. Mereka mengontrol akun di platform mereka dan mungkin dapat membantu dengan pengaturan ulang kata sandi atau pemulihan akun.

<Alert variant="warning">
<AlertEmoji text=":shield:"/>
<AlertContent>
<AlertDescription>

**Jangan pernah membagikan frasa seed Anda kepada siapa pun** yang mengklaim dapat membantu Anda memulihkan dompet Anda. Ini adalah salah satu taktik penipuan yang paling umum. Tidak ada layanan sah yang akan pernah meminta frasa seed Anda.
</AlertDescription>
</AlertContent>
</Alert>

<DocLink href="/guides/how-to-use-a-wallet/">
  Cara menggunakan dompet
</DocLink>

## Transaksi saya macet atau tertunda {#stuck-transaction}

Transaksi di Ethereum bisa macet ketika biaya gas yang Anda tetapkan lebih rendah dari yang dibutuhkan jaringan saat ini. Sebagian besar dompet memungkinkan Anda untuk memperbaikinya:

- **Percepat:** Kirim ulang transaksi yang sama dengan biaya gas yang lebih tinggi
- **Batalkan:** Kirim transaksi 0 ETH ke alamat Anda sendiri menggunakan nonce yang sama dengan transaksi yang tertunda

### Panduan yang membantu

- [Cara mempercepat atau membatalkan transaksi yang tertunda di MetaMask](https://support.metamask.io/transactions-and-gas/transactions/how-to-speed-up-or-cancel-a-pending-transaction/)
- [Cara membatalkan transaksi Ethereum yang tertunda](https://info.etherscan.com/how-to-cancel-ethereum-pending-transactions/)

## Bagaimana cara mengklaim giveaway Ethereum saya? {#giveaway-scam}

Giveaway Ethereum adalah penipuan yang dirancang untuk mencuri ETH Anda. Jangan tergoda oleh penawaran yang tampaknya terlalu bagus untuk menjadi kenyataan. Jika Anda mengirim ETH ke alamat giveaway, Anda tidak akan menerima giveaway, dan Anda tidak akan dapat memulihkan dana Anda.

[Lebih lanjut tentang pencegahan penipuan](/security/#common-scams)

## Bagaimana cara saya stake ETH? {#how-to-stake}

Untuk menjadi validator, Anda harus stake 32 ETH di kontrak deposit Ethereum dan menyiapkan node validator. Anda juga dapat berpartisipasi dengan lebih sedikit ETH melalui kolam staking.

Informasi lebih lanjut tersedia di [halaman mengunci](/staking/) kami dan di [launchpad mengunci](https://launchpad.ethereum.org/).

## Bagaimana cara menambang Ethereum? {#mining-ethereum}

Penambangan Ethereum tidak lagi memungkinkan. Penambangan dimatikan ketika Ethereum beralih dari [proof-of-work](/glossary/#pow) ke [proof-of-stake](/glossary/#pos) selama [The Merge](/roadmap/merge/) pada bulan September 2022. Sekarang, alih-alih penambang, Ethereum memiliki validator. Siapa pun dapat [stake](/glossary/#staking) ETH dan menerima hadiah mengunci untuk menjalankan perangkat lunak validator guna mengamankan jaringan.