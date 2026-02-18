---
title: "EIP-1271: Menandatangani dan Memverifikasi Tanda Tangan Smart Contract"
description: Gambaran umum tentang pembuatan dan verifikasi tanda tangan kontrak pintar dengan EIP-1271. Kami juga membahas implementasi EIP-1271 yang digunakan di Safe (sebelumnya Gnosis Safe) untuk memberikan contoh konkret bagi para pengembang smart contract untuk dikembangkan.
author: Nathan H. Leung
lang: id
tags:
  [
    "eip-1271",
    "kontrak pintar",
    "memverifikasi",
    "penandatanganan"
  ]
skill: intermediate
published: 2023-01-12
---

Standar [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) memungkinkan kontrak pintar untuk memverifikasi tanda tangan.

Dalam tutorial ini, kami memberikan gambaran umum tentang tanda tangan digital, latar belakang EIP-1271, dan implementasi spesifik EIP-1271 yang digunakan oleh [Safe](https://safe.global/) (sebelumnya Gnosis Safe). Secara keseluruhan, hal ini dapat menjadi titik awal untuk mengimplementasikan EIP-1271 dalam kontrak Anda.

## Apa yang dimaksud dengan tanda tangan?

Dalam konteks ini, tanda tangan (lebih tepatnya, "tanda tangan digital") adalah sebuah pesan ditambah dengan semacam bukti bahwa pesan tersebut berasal dari orang/pengirim/alamat tertentu.

Sebagai contoh, tanda tangan digital mungkin terlihat seperti ini:

1. Pesan: "Saya ingin masuk ke situs web ini dengan dompet Ethereum saya."
2. Penanda tangan: Alamat saya adalah `0x000…`
3. Bukti: Ini adalah bukti bahwa saya, `0x000…`, benar-benar membuat seluruh pesan ini (ini biasanya sesuatu yang kriptografis).

Penting untuk diperhatikan bahwa tanda tangan digital mencakup "pesan" dan "tanda tangan".

Mengapa? Misalnya, jika Anda memberi saya kontrak untuk ditandatangani, lalu saya memotong halaman tanda tangan dan mengembalikan hanya tanda tangan saya tanpa sisa kontrak, maka kontrak tersebut tidak sah.

Dengan cara yang sama, tanda tangan digital tidak berarti apa-apa tanpa pesan yang terkait!

## Mengapa EIP-1271 ada?

Untuk membuat tanda tangan digital untuk digunakan pada blockchain berbasis Ethereum, Anda biasanya membutuhkan kunci pribadi rahasia yang tidak diketahui orang lain. Inilah yang membuat tanda tangan Anda menjadi milik Anda (tidak ada orang lain yang dapat membuat tanda tangan yang sama tanpa sepengetahuan kunci rahasia).

Akun Ethereum Anda (yaitu, akun milik eksternal/EOA) memiliki kunci pribadi yang terhubung dengannya, dan ini adalah kunci pribadi yang biasanya digunakan saat situs web atau dapp meminta tanda tangan Anda (misalnya, untuk “Masuk dengan Ethereum”).

Sebuah aplikasi dapat [memverifikasi tanda tangan](https://www.alchemy.com/docs/how-to-verify-a-message-signature-on-ethereum) yang Anda buat menggunakan pustaka pihak ketiga seperti ethers.js [tanpa mengetahui kunci pribadi Anda](https://en.wikipedia.org/wiki/Public-key_cryptography) dan yakin bahwa _Anda_ adalah orang yang membuat tanda tangan tersebut.

> Faktanya, karena tanda tangan digital EOA menggunakan kriptografi kunci publik, tanda tangan tersebut dapat dibuat dan diverifikasi **offchain**! Ini adalah cara kerja pemungutan suara DAO tanpa gas — alih-alih mengirimkan suara secara onchain, tanda tangan digital dapat dibuat dan diverifikasi secara offchain menggunakan pustaka kriptografi.

Meskipun akun EOA memiliki kunci pribadi, akun smart contract tidak memiliki kunci pribadi atau rahasia apa pun (sehingga "Masuk dengan Ethereum", dll. tidak dapat bekerja secara native dengan akun smart contract).

Masalah yang ingin dipecahkan oleh EIP-1271 adalah: bagaimana kita dapat mengetahui bahwa tanda tangan kontrak pintar adalah sah jika kontrak pintar tidak memiliki "rahasia" yang dapat dimasukkan ke dalam tanda tangan?

## Bagaimana cara kerja EIP-1271?

Smart contract tidak memiliki kunci pribadi yang dapat digunakan untuk menandatangani pesan. Jadi, bagaimana kita bisa mengetahui apakah suatu tanda tangan itu asli?

Nah, salah satu idenya adalah kita bisa _bertanya_ langsung ke kontrak pintar apakah sebuah tanda tangan itu asli!

Apa yang dilakukan EIP-1271 adalah menstandarkan ide ini dengan "menanyakan" kepada kontrak pintar apakah tanda tangan yang diberikan valid.

Kontrak yang mengimplementasikan EIP-1271 harus memiliki fungsi bernama `isValidSignature` yang menerima pesan dan tanda tangan. Kontrak kemudian dapat menjalankan beberapa logika validasi (spesifikasi tidak memberlakukan sesuatu yang spesifik di sini) dan kemudian mengembalikan nilai yang menunjukkan apakah tanda tangan tersebut valid atau tidak.

Jika `isValidSignature` mengembalikan hasil yang valid, itu berarti kontrak tersebut mengatakan “ya, saya menyetujui tanda tangan + pesan ini!”

### Antarmuka

Berikut adalah antarmuka yang tepat dalam spesifikasi EIP-1271 (kita akan membahas parameter `_hash` di bawah ini, tetapi untuk saat ini, anggap saja sebagai pesan yang sedang diverifikasi):

```jsx
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /**
   * @dev Harus mengembalikan apakah tanda tangan yang diberikan valid untuk hash yang diberikan
   * @param _hash      Hash dari data yang akan ditandatangani
   * @param _signature Array bita tanda tangan yang terkait dengan _hash
   *
   * HARUS mengembalikan nilai ajaib bytes4 0x1626ba7e saat fungsi berhasil.
   * TIDAK BOLEH memodifikasi state (menggunakan STATICCALL untuk solc < 0.5, pengubah view untuk solc > 0.5)
   * HARUS mengizinkan panggilan eksternal
   */
  function isValidSignature(
    bytes32 _hash,
    bytes memory _signature)
    public
    view
    returns (bytes4 magicValue);
}
```

## Contoh Implementasi EIP-1271: Aman

Kontrak dapat mengimplementasikan `isValidSignature` dengan berbagai cara — spesifikasinya tidak menjelaskan secara rinci tentang implementasi yang tepat.

Salah satu kontrak penting yang mengimplementasikan EIP-1271 adalah Safe (sebelumnya Gnosis Safe).

Dalam kode Safe, `isValidSignature` [diimplementasikan](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol) sehingga tanda tangan dapat dibuat dan diverifikasi dengan [dua cara](https://ethereum.stackexchange.com/questions/122635/signing-messages-as-a-gnosis-safe-eip1271-support):

1. Pesan onchain
   1. Penciptaan: pemilik brankas membuat transaksi brankas baru untuk "menandatangani" sebuah pesan, meneruskan pesan tersebut sebagai data ke dalam transaksi. Setelah cukup banyak pemilik yang menandatangani transaksi untuk mencapai ambang batas multisig, transaksi akan disiarkan dan dijalankan. Dalam transaksi, ada fungsi Safe yang dipanggil (`signMessage(bytes calldata _data)`) yang menambahkan pesan ke daftar pesan yang “disetujui”.
   2. Verifikasi: panggil `isValidSignature` pada kontrak Safe, dan teruskan pesan yang akan diverifikasi sebagai parameter pesan dan [nilai kosong untuk parameter tanda tangan](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L32) (yaitu, `0x`). Brankas akan melihat bahwa parameter tanda tangan kosong dan alih-alih memverifikasi tanda tangan secara kriptografis, ia akan tahu untuk melanjutkan dan memeriksa apakah pesan tersebut ada dalam daftar pesan yang "disetujui".
2. Pesan offchain:
   1. Pembuatan: pemilik Safe membuat pesan secara offchain, lalu meminta pemilik Safe lainnya untuk menandatangani pesan tersebut secara individual hingga ada cukup tanda tangan untuk melampaui ambang batas persetujuan multisig.
   2. Verifikasi: panggil `isValidSignature`. Pada parameter pesan, masukkan pesan yang akan diverifikasi. Pada parameter tanda tangan, masukkan tanda tangan masing-masing pemilik brankas, yang semuanya digabungkan menjadi satu, secara berurutan. Safe akan memeriksa bahwa ada cukup tanda tangan untuk memenuhi ambang batas **dan** bahwa setiap tanda tangan valid. Jika ya, ini akan mengembalikan nilai yang menunjukkan verifikasi tanda tangan yang berhasil.

## Apa sebenarnya parameter `_hash` itu? Mengapa tidak menyampaikan seluruh pesan?

Anda mungkin telah memperhatikan bahwa fungsi `isValidSignature` di [antarmuka EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) tidak menerima pesan itu sendiri, melainkan parameter `_hash`. Artinya, alih-alih meneruskan pesan dengan panjang arbitrer ke `isValidSignature`, kita justru meneruskan hash 32-bita dari pesan tersebut (umumnya keccak256).

Setiap bita calldata — yaitu, data parameter fungsi yang diteruskan ke fungsi kontrak pintar — [berharga 16 gas (4 gas jika bita nol)](https://eips.ethereum.org/EIPS/eip-2028), jadi ini dapat menghemat banyak gas jika pesannya panjang.

### Spesifikasi EIP-1271 sebelumnya

Terdapat spesifikasi EIP-1271 yang beredar yang memiliki fungsi `isValidSignature` dengan parameter pertama berjenis `bytes` (panjang arbitrer, bukan `bytes32` dengan panjang tetap) dan nama parameter `message`. Ini adalah [versi lama](https://github.com/safe-global/safe-contracts/issues/391#issuecomment-1075427206) dari standar EIP-1271.

## Bagaimana cara menerapkan EIP-1271 dalam kontrak saya sendiri?

Spesifikasinya sangat terbuka di sini. Implementasi Safe memiliki beberapa ide bagus:

- Anda dapat menganggap tanda tangan EOA dari "pemilik" kontrak sebagai tanda tangan yang sah.
- Anda dapat menyimpan daftar pesan yang disetujui dan hanya menganggap pesan tersebut valid.

Pada akhirnya, semua tergantung pada Anda sebagai pengembang kontrak!

## Kesimpulan

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) adalah standar serbaguna yang memungkinkan kontrak pintar untuk memverifikasi tanda tangan. Ini membuka pintu bagi smart contract untuk bertindak lebih seperti EOA - misalnya menyediakan cara untuk "Masuk dengan Ethereum" agar dapat bekerja dengan smart contract - dan dapat diimplementasikan dengan berbagai cara (Aman memiliki implementasi yang tidak sepele dan menarik untuk dipertimbangkan).
