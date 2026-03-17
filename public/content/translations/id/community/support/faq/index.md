---
title: Pertanyaan yang sering diajukan
description: Pertanyaan umum Ethereum tentang dompet, transaksi, penaruhan, dan lainnya.
lang: id
---

# Pertanyaan yang sering diajukan {#faq}

## Saya mengirim kripto ke alamat yang salah {#wrong-wallet}

Transaksi yang dikirimkan di Ethereum tidak dapat dibalikkan. Sayangnya, jika Anda mengirim ETH atau token ke dompet yang salah, tidak ada cara untuk membalikkan transaksi tersebut.

**Apa yang dapat Anda lakukan:**

- **Jika Anda mengetahui pemilik alamat tersebut**, hubungi mereka secara langsung dan minta mereka untuk mengembalikan dananya
- **Jika alamat tersebut milik bursa atau layanan yang dikenal**, hubungi tim dukungan mereka, karena mereka mungkin dapat membantu
- **Jika Anda mengirim token ke akun kontrak**, periksa apakah kontrak tersebut memiliki fungsi penarikan atau pemulihan (ini jarang terjadi)

Dalam sebagian besar kasus, tidak ada cara untuk memulihkan dana tersebut. Tidak ada organisasi, entitas, atau orang pusat yang memiliki Ethereum, yang berarti tidak ada yang bisa membalikkan transaksi. Selalu periksa kembali alamat penerima sebelum mengonfirmasi.

## Saya kehilangan akses ke dompet saya {#lost-wallet-access}

Opsi pemulihan Anda bergantung pada jenis dompet yang Anda gunakan.

### Jika Anda memiliki frase benih (frasa pemulihan) Anda

Anda dapat memulihkan dompet Anda di aplikasi dompet apa pun yang kompatibel menggunakan frase benih Anda. Inilah sebabnya sangat penting untuk menyimpan frase benih Anda dengan aman secara luring. Periksa dokumentasi penyedia dompet Anda untuk instruksi pemulihan.

### Jika Anda kehilangan frase benih Anda

Tanpa frase benih atau kunci pribadi Anda, dana Anda tidak dapat dipulihkan. Tidak seorang pun, termasuk ethereum.org, dapat mengatur ulang kata sandi Anda atau memulihkan akses ke dompet kustodi mandiri.

### Jika akun Anda ada di bursa

Jika akun Anda ada di bursa terpusat seperti Coinbase, Binance, atau Kraken, hubungi tim dukungan bursa secara langsung. Mereka mengontrol akun di platform mereka dan mungkin dapat membantu mengatur ulang kata sandi atau pemulihan akun.

<Alert variant="warning">
<AlertEmoji text=":shield:"/>
<AlertContent>
<AlertDescription>

**Jangan pernah membagikan frase benih Anda kepada siapa pun** yang mengaku membantu Anda memulihkan dompet Anda. Ini adalah salah satu taktik penipuan yang paling umum. Tidak ada layanan sah yang akan pernah meminta frase benih Anda.
</AlertDescription>
</AlertContent>
</Alert>

<DocLink href="/guides/how-to-use-a-wallet/">
  Cara menggunakan dompet
</DocLink>

## Transaksi saya macet atau tertunda {#stuck-transaction}

Transaksi di Ethereum bisa macet ketika biaya gas yang Anda tetapkan lebih rendah dari yang dibutuhkan jaringan saat ini. Sebagian besar dompet memungkinkan Anda memperbaikinya:

- **Percepat:** Kirim ulang transaksi yang sama dengan biaya gas yang lebih tinggi
- **Batalkan:** Kirim transaksi 0 ETH ke alamat Anda sendiri menggunakan nonce yang sama dengan transaksi yang tertunda

### Panduan bermanfaat

- [Cara mempercepat atau membatalkan transaksi yang tertunda di MetaMask](https://support.metamask.io/transactions-and-gas/transactions/how-to-speed-up-or-cancel-a-pending-transaction/)
- [Cara membatalkan transaksi Ethereum yang tertunda](https://info.etherscan.com/how-to-cancel-ethereum-pending-transactions/)

## Bagaimana saya dapat mengklaim hadiah Ethereum? {#giveaway-scam}

Hadiah Ethereum adalah penipuan yang dirancang untuk mencuri ETH Anda. Jangan tergoda oleh penawaran yang tampaknya terlalu bagus untuk menjadi kenyataan. Jika Anda mengirim ETH ke alamat giveaway, Anda tidak akan menerima giveaway, dan Anda tidak akan dapat memulihkan dana Anda.

[Selengkapnya tentang pencegahan penipuan](/security/#common-scams)

## Bagaimana cara saya melakukan penaruhan ETH? {#how-to-stake}

Untuk menjadi seorang validator, Anda harus memasang taruhan 32 ETH di kontrak deposit Ethereum dan mengatur simpul validator. Anda juga dapat berpartisipasi dengan lebih sedikit ETH melalui pool penaruhan.

Informasi lebih lanjut tersedia di [halaman penaruhan](/staking/) kami dan di [landasan peluncuran penaruhan](https://launchpad.ethereum.org/)

## Bagaimana cara menambang Ethereum? {#mining-ethereum}

Penambangan Ethereum tidak lagi memungkinkan. Penambangan dinonaktifkan ketika Ethereum beralih dari [bukti kerja](/glossary/#pow) ke [bukti taruhan](/glossary/#pos) selama [Penggabungan](/roadmap/merge/) pada bulan September 2022. Sekarang, Ethereum memiliki validator, bukan penambang. Siapa pun dapat [melakukan penaruhan](/glossary/#staking) ETH dan menerima imbalan penaruhan dengan menjalankan perangkat lunak validator untuk mengamankan jaringan.
