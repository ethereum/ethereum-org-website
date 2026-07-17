---
title: Pertanyaan yang sering diajukan
description: Pertanyaan umum Ethereum tentang dompet, transaksi, staking, dan lainnya.
lang: id
---

## Saya mengirim kripto ke alamat yang salah {#wrong-wallet}

Sebuah transaksi yang dikirim di Ethereum tidak dapat dibatalkan. Sayangnya, jika Anda mengirim ETH atau token ke dompet yang salah, tidak ada cara untuk membatalkan transaksi tersebut.

**Apa yang dapat Anda lakukan:**

- **Jika Anda mengetahui pemilik alamat tersebut**, hubungi mereka secara langsung dan minta mereka untuk mengembalikan dana tersebut
- **Jika alamat tersebut milik bursa atau layanan yang dikenal**, hubungi tim dukungan mereka, karena mereka mungkin dapat membantu
- **Jika Anda mengirim token ke alamat kontrak**, periksa apakah kontrak tersebut memiliki fungsi penarikan atau pemulihan (ini jarang terjadi)

Dalam kebanyakan kasus, tidak ada cara untuk memulihkan dana tersebut. Tidak ada organisasi pusat, entitas, atau orang yang memiliki Ethereum, yang berarti tidak ada yang dapat membatalkan transaksi. Selalu periksa kembali alamat penerima sebelum mengonfirmasi.

## Saya kehilangan akses ke dompet saya {#lost-wallet-access}

Opsi pemulihan Anda bergantung pada jenis dompet yang Anda gunakan.

### Jika Anda memiliki frasa benih (frasa pemulihan) Anda {#if-you-have-your-seed-phrase-recovery-phrase}

Anda dapat memulihkan dompet Anda di aplikasi dompet apa pun yang kompatibel menggunakan frasa benih Anda. Inilah sebabnya mengapa sangat penting untuk menyimpan frasa benih Anda dengan aman secara luring (offline). Periksa dokumentasi penyedia dompet Anda untuk instruksi pemulihan.

### Jika Anda kehilangan frasa benih Anda {#if-you-have-lost-your-seed-phrase}

Tanpa frasa benih atau kunci privat Anda, dana Anda tidak dapat dipulihkan. Tidak ada seorang pun, termasuk ethereum.org, yang dapat mereset kata sandi Anda atau memulihkan akses ke dompet kustodian mandiri.

### Jika akun Anda berada di bursa {#if-your-account-is-on-an-exchange}

Jika akun Anda berada di bursa terpusat seperti Coinbase, Binance, atau Kraken, hubungi tim dukungan bursa tersebut secara langsung. Mereka mengontrol akun di platform mereka dan mungkin dapat membantu dengan reset kata sandi atau pemulihan akun.

<Alert variant="warning">
<AlertEmoji text=":shield:"/>
<AlertContent>
<AlertDescription>

**Jangan pernah membagikan frasa benih Anda kepada siapa pun** yang mengklaim dapat membantu Anda memulihkan dompet Anda. Ini adalah salah satu taktik penipuan yang paling umum. Tidak ada layanan sah yang akan pernah meminta frasa benih Anda.

</AlertDescription>
</AlertContent>
</Alert>

<DocLink href="/guides/how-to-use-a-wallet/">
  Cara menggunakan dompet
</DocLink>

## Transaksi saya macet atau tertunda {#stuck-transaction}

Transaksi di Ethereum dapat macet ketika biaya gas yang Anda tetapkan lebih rendah dari yang dibutuhkan jaringan saat ini. Sebagian besar dompet memungkinkan Anda untuk memperbaiki ini:

- **Percepat:** Kirim ulang transaksi yang sama dengan biaya gas yang lebih tinggi
- **Batalkan:** Kirim transaksi 0 ETH ke alamat Anda sendiri menggunakan nonce yang sama dengan transaksi tertunda tersebut

### Panduan yang membantu {#helpful-guides}

- [Cara mempercepat atau membatalkan transaksi tertunda di MetaMask](https://support.metamask.io/transactions-and-gas/transactions/how-to-speed-up-or-cancel-a-pending-transaction/)
- [Cara membatalkan transaksi Ethereum yang tertunda](https://info.etherscan.com/how-to-cancel-ethereum-pending-transactions/)

## Bagaimana cara saya mengklaim giveaway Ethereum saya? {#giveaway-scam}

Giveaway Ethereum adalah penipuan yang dirancang untuk mencuri ETH Anda. Jangan tergoda oleh penawaran yang tampaknya terlalu bagus untuk menjadi kenyataan. Jika Anda mengirim ETH ke alamat giveaway, Anda tidak akan menerima giveaway, dan Anda tidak akan dapat memulihkan dana Anda.

[Lebih lanjut tentang pencegahan penipuan](/security/#common-scams)

## Bagaimana cara saya melakukan stake ETH? {#how-to-stake}

Untuk menjadi validator, Anda harus melakukan stake 32 ETH di kontrak deposit Ethereum dan menyiapkan node validator. Anda juga dapat berpartisipasi dengan lebih sedikit ETH melalui pool staking.

Informasi lebih lanjut tersedia di [halaman staking](/staking/) kami dan di [launchpad staking](https://launchpad.ethereum.org/).

## Bagaimana cara saya menambang Ethereum? {#mining-ethereum}

Penambangan Ethereum tidak lagi memungkinkan. Penambangan dimatikan ketika Ethereum beralih dari [Bukti Kerja (PoW)](/glossary/#pow) ke [Bukti Kepemilikan (PoS)](/glossary/#pos) selama [The Merge](/roadmap/merge/) pada bulan September 2022. Sekarang, alih-alih penambang, Ethereum memiliki validator. Siapa pun dapat melakukan [stake](/glossary/#staking) ETH dan menerima hadiah staking karena menjalankan perangkat lunak validator untuk mengamankan jaringan.