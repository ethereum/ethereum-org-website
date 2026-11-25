---
title: Cara Melihat NFT Anda di Dompet Anda (Bagian 3/3 dari Seri Tutorial NFT)
description: Tutorial ini menjelaskan cara melihat NFT yang ada di MetaMask!
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity"]
skill: beginner
breadcrumb: Lihat NFT di dompet
lang: id
published: 2021-04-22
---

Tutorial ini adalah Bagian 3/3 dalam seri Tutorial token yang tidak dapat dipertukarkan (NFT), di mana kita melihat NFT yang baru saja kita cetak. Namun, Anda dapat menggunakan tutorial umum ini untuk token ERC-721 apa pun menggunakan MetaMask, termasuk di Mainnet atau testnet mana pun. Jika Anda ingin mempelajari cara mencetak NFT Anda sendiri di Ethereum, Anda harus memeriksa [Bagian 1 tentang Cara Menulis & Menyebarkan kontrak pintar NFT](/developers/tutorials/how-to-write-and-deploy-an-nft)!

Selamat! Anda telah berhasil mencapai bagian terpendek dan paling sederhana dari seri tutorial NFT kami — cara melihat NFT yang baru saja Anda cetak di dompet virtual. Kita akan menggunakan MetaMask untuk contoh ini karena itulah yang kita gunakan di dua bagian sebelumnya.

Sebagai prasyarat, Anda harus sudah menginstal MetaMask, baik ekstensi peramban atau aplikasi seluler, dan itu harus menyertakan akun tempat Anda mencetak NFT Anda. Anda bisa mendapatkan MetaMask secara gratis dari [halaman unduhan MetaMask](https://metamask.io/download).

## Langkah 1: Atur jaringan Anda ke Sepolia {#set-network-to-sepolia}

Karena token yang tidak dapat dipertukarkan (NFT) kita dicetak di jaringan pengujian Sepolia, Anda harus memilih Sepolia sebagai jaringan Anda. MetaMask menyembunyikan jaringan pengujian secara default, jadi pertama-tama aktifkan:

1. Buka menu di sudut kanan atas dan pilih "Networks".
2. Gulir ke bawah ke bagian bawah daftar jaringan dan aktifkan "Show test networks".
3. Pilih "Sepolia" dari daftar jaringan.

Lihat [panduan MetaMask untuk melihat testnet](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/) jika menu terlihat berbeda di versi MetaMask Anda.

## Langkah 2: Tambahkan barang koleksi Anda ke MetaMask {#add-nft-to-metamask}

MetaMask mendeteksi token yang tidak dapat dipertukarkan (NFT) secara otomatis hanya di beberapa jaringan, yang tidak termasuk Sepolia, jadi Anda perlu mengimpor NFT Anda secara manual. Untuk itu Anda memerlukan alamat kontrak pintar NFT dan ID token ERC-721 dari NFT Anda — yang seharusnya dapat Anda temukan di Etherscan berdasarkan hash transaksi dari NFT Anda yang dicetak di Bagian II dari tutorial kami. Jika Anda menggunakan kontrak dari Bagian 1, NFT pertama Anda memiliki ID token 1.

![Cara menemukan hash transaksi dan ID token ERC-721 Anda](./findNFTEtherscan.png)

Kemudian, di MetaMask (ekstensi atau seluler):

1. Buka bagian "NFTs" di layar beranda dan pilih "Import NFT".
2. Pilih Sepolia sebagai jaringan, dan tempelkan alamat kontrak pintar NFT Anda ke dalam kotak "Address".
3. Masukkan ID token Anda ke dalam kotak "Token ID" dan pilih "Import".

Anda mungkin perlu menyegarkan beberapa kali untuk melihat NFT Anda — tetapi itu akan ada di sana <Emoji text="😄" size={1} />! Jika MetaMask mengatakan Anda bukan pemilik NFT, periksa apakah Anda memilih akun tempat Anda mencetak NFT tersebut. Untuk bantuan lebih lanjut, lihat [panduan MetaMask untuk NFT](https://support.metamask.io/manage-crypto/nfts/nft-tokens-in-your-metamask-wallet/).

Selamat! Anda telah berhasil mencetak NFT, dan Anda sekarang dapat melihatnya! Kami tidak sabar untuk melihat bagaimana Anda akan menggemparkan dunia NFT!
