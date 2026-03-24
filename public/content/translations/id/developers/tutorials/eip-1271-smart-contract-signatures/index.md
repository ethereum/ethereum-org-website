---
title: "EIP-1271: Menandatangani dan Memverifikasi Tanda Tangan Kontrak Pintar"
description: Gambaran umum tentang pembuatan dan verifikasi tanda tangan kontrak pintar dengan EIP-1271. Kami juga membahas implementasi EIP-1271 yang digunakan di Safe (sebelumnya Gnosis Safe) untuk memberikan contoh konkret bagi pengembang kontrak pintar untuk dikembangkan.
author: Nathan H. Leung
lang: id
tags: ["eip-1271", "kontrak pintar", "memverifikasi", "menandatangani"]
skill: intermediate
published: 2023-01-12
---

Standar [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) memungkinkan kontrak pintar untuk memverifikasi tanda tangan.

Dalam tutorial ini, kami memberikan gambaran umum tentang tanda tangan digital, latar belakang EIP-1271, dan implementasi spesifik EIP-1271 yang digunakan oleh [Safe](https://safe.global/) (sebelumnya Gnosis Safe). Secara keseluruhan, ini dapat berfungsi sebagai titik awal untuk mengimplementasikan EIP-1271 di kontrak Anda sendiri.

## Apa itu tanda tangan?

Dalam konteks ini, tanda tangan (lebih tepatnya, "tanda tangan digital") adalah pesan ditambah semacam bukti bahwa pesan tersebut berasal dari orang/pengirim/alamat tertentu.

Misalnya, tanda tangan digital mungkin terlihat seperti ini:

1. Pesan: "Saya ingin masuk ke situs web ini dengan dompet Ethereum saya."
2. Penandatangan: Alamat saya adalah `0x000…`
3. Bukti: Berikut adalah beberapa bukti bahwa saya, `0x000…`, benar-benar membuat seluruh pesan ini (ini biasanya sesuatu yang bersifat kriptografi).

Penting untuk dicatat bahwa tanda tangan digital mencakup "pesan" dan "tanda tangan".

Mengapa? Misalnya, jika Anda memberi saya kontrak untuk ditandatangani, lalu saya memotong halaman tanda tangan dan hanya mengembalikan tanda tangan saya tanpa sisa kontrak, kontrak tersebut tidak akan valid.

Dengan cara yang sama, tanda tangan digital tidak berarti apa-apa tanpa pesan yang terkait!

## Mengapa EIP-1271 ada?

Untuk membuat tanda tangan digital untuk digunakan pada blockchain berbasis Ethereum, Anda umumnya memerlukan kunci pribadi rahasia yang tidak diketahui orang lain. Inilah yang membuat tanda tangan Anda, menjadi milik Anda (tidak ada orang lain yang dapat membuat tanda tangan yang sama tanpa mengetahui kunci rahasia tersebut).

Akun Ethereum Anda (yaitu, akun yang dimiliki secara eksternal/EOA Anda) memiliki kunci pribadi yang terkait dengannya, dan ini adalah kunci pribadi yang biasanya digunakan ketika situs web atau dapp meminta tanda tangan Anda (misalnya, untuk "Masuk dengan Ethereum").

Sebuah aplikasi dapat [memverifikasi tanda tangan](https://www.alchemy.com/docs/how-to-verify-a-message-signature-on-ethereum) yang Anda buat menggunakan pustaka pihak ketiga seperti ethers.js [tanpa mengetahui kunci pribadi Anda](https://en.wikipedia.org/wiki/Public-key_cryptography) dan yakin bahwa _Anda_ lah yang membuat tanda tangan tersebut.

> Faktanya, karena tanda tangan digital EOA menggunakan kriptografi kunci publik, tanda tangan tersebut dapat dibuat dan diverifikasi secara **offchain**! Beginilah cara kerja pemungutan suara DAO tanpa gas — alih-alih mengirimkan suara secara onchain, tanda tangan digital dapat dibuat dan diverifikasi secara offchain menggunakan pustaka kriptografi.

Meskipun akun EOA memiliki kunci pribadi, akun kontrak pintar tidak memiliki kunci pribadi atau rahasia apa pun (sehingga "Masuk dengan Ethereum", dll. tidak dapat bekerja secara bawaan dengan akun kontrak pintar).

Masalah yang ingin diselesaikan oleh EIP-1271: bagaimana kita bisa tahu bahwa tanda tangan kontrak pintar itu valid jika kontrak pintar tidak memiliki "rahasia" yang dapat dimasukkan ke dalam tanda tangan?

## Bagaimana cara kerja EIP-1271?

Kontrak pintar tidak memiliki kunci pribadi yang dapat digunakan untuk menandatangani pesan. Jadi bagaimana kita bisa tahu apakah sebuah tanda tangan itu asli?

Nah, salah satu idenya adalah kita bisa _bertanya_ saja kepada kontrak pintar apakah sebuah tanda tangan itu asli!

Apa yang dilakukan EIP-1271 adalah menstandarkan ide "bertanya" kepada kontrak pintar apakah tanda tangan yang diberikan itu valid.

Kontrak yang mengimplementasikan EIP-1271 harus memiliki fungsi bernama `isValidSignature` yang menerima pesan dan tanda tangan. Kontrak tersebut kemudian dapat menjalankan beberapa logika validasi (spesifikasi tidak memaksakan sesuatu yang spesifik di sini) dan kemudian mengembalikan nilai yang menunjukkan apakah tanda tangan tersebut valid atau tidak.

Jika `isValidSignature` mengembalikan hasil yang valid, itu kurang lebih berarti kontrak tersebut mengatakan "ya, saya menyetujui tanda tangan + pesan ini!"

### Antarmuka

Berikut adalah antarmuka yang tepat dalam spesifikasi EIP-1271 (kita akan membahas parameter `_hash` di bawah ini, tetapi untuk saat ini, anggap saja itu sebagai pesan yang sedang diverifikasi):

```jsx
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)") // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /**
   * @dev Harus mengembalikan apakah tanda tangan yang diberikan valid untuk hash yang diberikan
   * @param _hash      Hash dari data yang akan ditandatangani
   * @param _signature Array byte tanda tangan yang terkait dengan _hash
   *
   * HARUS mengembalikan nilai ajaib bytes4 0x1626ba7e ketika fungsi berhasil.
   * TIDAK BOLEH memodifikasi state (menggunakan STATICCALL untuk solc < 0.5, modifier view untuk solc > 0.5)
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

## Contoh Implementasi EIP-1271: Safe

Kontrak dapat mengimplementasikan `isValidSignature` dengan banyak cara — spesifikasi tersebut tidak banyak menjelaskan tentang implementasi pastinya.

Salah satu kontrak terkenal yang mengimplementasikan EIP-1271 adalah Safe (sebelumnya Gnosis Safe).

Dalam kode Safe, `isValidSignature` [diimplementasikan](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol) sehingga tanda tangan dapat dibuat dan diverifikasi dengan [dua cara](https://ethereum.stackexchange.com/questions/122635/signing-messages-as-a-gnosis-safe-eip1271-support):

1. Pesan onchain
   1. Pembuatan: pemilik safe membuat transaksi safe baru untuk "menandatangani" pesan, meneruskan pesan sebagai data ke dalam transaksi. Setelah cukup banyak pemilik yang menandatangani transaksi untuk mencapai ambang batas multi tanda tangan, transaksi disiarkan dan dijalankan. Dalam transaksi tersebut, terdapat fungsi safe yang disebut (`signMessage(bytes calldata _data)`) yang menambahkan pesan ke daftar pesan yang "disetujui".
   2. Verifikasi: panggil `isValidSignature` pada kontrak Safe, dan teruskan pesan untuk diverifikasi sebagai parameter pesan dan [nilai kosong untuk parameter tanda tangan](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L32) (yaitu, `0x`). Safe akan melihat bahwa parameter tanda tangan kosong dan alih-alih memverifikasi tanda tangan secara kriptografi, ia akan tahu untuk langsung memeriksa apakah pesan tersebut ada dalam daftar pesan yang "disetujui".
2. Pesan offchain:
   1. Pembuatan: pemilik safe membuat pesan secara offchain, lalu meminta pemilik safe lainnya untuk menandatangani pesan tersebut secara individu hingga terdapat cukup tanda tangan untuk melampaui ambang batas persetujuan multi tanda tangan.
   2. Verifikasi: panggil `isValidSignature`. Pada parameter pesan, teruskan pesan yang akan diverifikasi. Pada parameter tanda tangan, teruskan tanda tangan individu dari setiap pemilik safe yang semuanya digabungkan bersama, secara berurutan. Safe akan memeriksa bahwa ada cukup tanda tangan untuk memenuhi ambang batas **dan** bahwa setiap tanda tangan valid. Jika ya, ia akan mengembalikan nilai yang menunjukkan verifikasi tanda tangan berhasil.

## Apa sebenarnya parameter `_hash` itu? Mengapa tidak meneruskan seluruh pesan?

Anda mungkin memperhatikan bahwa fungsi `isValidSignature` dalam [antarmuka EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) tidak menerima pesan itu sendiri, melainkan parameter `_hash`. Artinya, alih-alih meneruskan pesan dengan panjang arbitrer secara penuh ke `isValidSignature`, kita malah meneruskan hash 32-byte dari pesan tersebut (umumnya keccak256).

Setiap byte calldata — yaitu, data parameter fungsi yang diteruskan ke fungsi kontrak pintar — [membutuhkan biaya 16 gas (4 gas jika byte nol)](https://eips.ethereum.org/EIPS/eip-2028), sehingga ini dapat menghemat banyak gas jika pesannya panjang.

### Spesifikasi EIP-1271 Sebelumnya

Terdapat spesifikasi EIP-1271 di luar sana yang memiliki fungsi `isValidSignature` dengan parameter pertama bertipe `bytes` (panjang arbitrer, bukan `bytes32` dengan panjang tetap) dan nama parameter `message`. Ini adalah [versi lama](https://github.com/safe-global/safe-contracts/issues/391#issuecomment-1075427206) dari standar EIP-1271.

## Bagaimana seharusnya EIP-1271 diimplementasikan dalam kontrak saya sendiri?

Spesifikasi ini sangat terbuka di sini. Implementasi Safe memiliki beberapa ide bagus:

- Anda dapat menganggap tanda tangan EOA dari "pemilik" kontrak sebagai valid.
- Anda dapat menyimpan daftar pesan yang disetujui dan hanya menganggap pesan tersebut yang valid.

Pada akhirnya, itu terserah Anda sebagai pengembang kontrak!

## Kesimpulan

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) adalah standar serbaguna yang memungkinkan kontrak pintar untuk memverifikasi tanda tangan. Ini membuka pintu bagi kontrak pintar untuk bertindak lebih seperti EOA — misalnya menyediakan cara agar "Masuk dengan Ethereum" dapat bekerja dengan kontrak pintar — dan ini dapat diimplementasikan dengan banyak cara (Safe memiliki implementasi yang tidak sepele dan menarik untuk dipertimbangkan).