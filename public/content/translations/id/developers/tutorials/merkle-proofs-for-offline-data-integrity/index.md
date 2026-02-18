---
title: Bukti Merkle untuk integritas data luring
description: Memastikan integritas data di rantai untuk data yang disimpan, sebagian besar, di luar rantai
author: Ori Pomerantz
tags: [ "penyimpanan" ]
skill: advanced
lang: id
published: 2021-12-30
---

## Pengenalan {#introduction}

Idealnya, kita ingin menyimpan segala sesuatu di penyimpanan Ethereum, yang tersimpan di seluruh ribuan komputer
dan memiliki ketersediaan (data tidak dapat disensor) dan integritas (data tidak dapat dimodifikasi
dalam cara yang tidak diotorisasi) sangat tinggi, tetapi menyimpan satu kata berukuran 32 bita biasanya memerlukan 20.000 gas. Ketika saya menulis ini, biaya tersebut
setara dengan $6,60. Dengan harga 21 sen per bita, penggunaan rutin ini terlalu mahal.

Untuk mengatasi masalah ini, ekosistem Ethereum mengembangkan banyak cara alternatif untuk menyimpan data secara
terdesentralisasi. Biasanya, berbagai cara tersebut melibatkan pertukaran antara ketersediaan
dan harga. Namun, integritas biasanya terjamin.

Dalam artikel ini Anda akan mempelajari **cara** memastikan integritas data tanpa menyimpan data di rantai blok, menggunakan
[bukti Merkle](https://computersciencewiki.org/index.php/Merkle_proof).

## Bagaimana cara kerjanya? {#how-does-it-work}

Secara teori, kita bisa saja menyimpan hash dari data secara onchain, dan mengirimkan semua data dalam transaksi yang memerlukannya. Namun, masih terlalu mahal. Satu bita data dari transaksi memerlukan sekitar 16 gas, saat ini kira-kira setengah sen, atau $5 per kilobita. Dengan harga $5000 per megabita, masih terlalu mahal untuk penggunaan rutin, bahkan tanpa biaya tambahan pembuatan hash data.

Solusinya adalah membuat hash subset data berbeda secara berulang, sehingga untuk data yang tidak perlu Anda kirimkan, Anda cukup mengirimkan satu hash. Anda melakukannya menggunakan pohon Merkle, struktur data pohon di mana setiap simpul adalah hash dari simpul di bawahnya:

![Pohon Merkle](tree.png)

Hash akar adalah satu-satunya bagian yang perlu disimpan di rantai. Untuk membuktikan nilai tertentu, Anda menyediakan semua hash yang perlu digabungkan dengannya untuk mendapatkan akarnya. Misalnya, untuk membuktikan `C`, Anda menyediakan `D`, `H(A-B)`, dan `H(E-H)`.

![Bukti nilai C](proof-c.png)

## Implementasi {#implementation}

[Contoh kode disediakan di sini](https://github.com/qbzzt/merkle-proofs-for-offline-data-integrity).

### Kode di luar rantai {#offchain-code}

Dalam artikel ini, kami menggunakan JavaScript untuk komputasi di luar rantai. Sebagian besar aplikasi terdesentralisasi memiliki komponen di luar rantai dalam JavaScript.

#### Membuat akar Merkle {#creating-the-merkle-root}

Pertama, kita perlu menyediakan akar Merkle untuk rantai.

```javascript
const ethers = require("ethers")
```

[Kami menggunakan fungsi hash dari paket ethers](https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256).

```javascript
// Data mentah yang integritasnya harus kami verifikasi. Dua bita pertama
// adalah pengidentifikasi pengguna, dan dua bita terakhir adalah jumlah token yang
// dimiliki pengguna saat ini.
const dataArray = [
  0x0bad0010, 0x60a70020, 0xbeef0030, 0xdead0040, 0xca110050, 0x0e660060,
  0xface0070, 0xbad00080, 0x060d0091,
]
```

Contohnya, mengodekan setiap entri menjadi satu bilangan bulat 256-bit akan menghasilkan kode yang kurang dapat terbaca dibandingkan dengan penggunaan JSON. Namun, proses ini menyebabkan proses penerimaan data dalam kontrak menjadi sangat berkurang, sehingga biaya gas lebih rendah. [Anda dapat membaca JSON di rantai](https://github.com/chrisdotn/jsmnSol), hanya saja itu ide yang buruk jika dapat dihindari.

```javascript
// Larik nilai hash, sebagai BigInts
const hashArray = dataArray
```

Dalam kasus ini, data kita dimulai dengan nilai 256-bit, sehingga tidak perlu melakukan pemrosesan. Jika kita menggunakan struktur data yang lebih rumit, seperti string, kita perlu memastikan untuk melakukan hash data terlebih dulu untuk mendapatkan susunan hash. Perlu diperhatikan bahwa proses ini juga terjadi sehingga kita tidak peduli jika pengguna mengetahui informasi pengguna lain. Jika tidak, kita harus melakukan hash agar pengguna 1 tidak mengetahui nilai untuk pengguna 0, pengguna 2 tidak mengetahui nilai untuk pengguna 3, dst.

```javascript
// Konversi antara string yang diharapkan fungsi hash dan
// BigInt yang kami gunakan di semua tempat lain.
const hash = (x) =>
  BigInt(ethers.utils.keccak256("0x" + x.toString(16).padStart(64, 0)))
```

Fungsi hash ethers berharap untuk mendapatkan string JavaScript dengan angka heksadesimal, seperti `0x60A7`, dan merespons dengan string lain dengan struktur yang sama. Namun, untuk sisa kode, lebih mudah menggunakan `BigInt`, jadi kami mengonversi ke string heksadesimal dan kembali lagi.

```javascript
// Hash simetris dari sepasang nilai sehingga urutan terbalik tidak menjadi masalah.
const pairHash = (a, b) => hash(hash(a) ^ hash(b))
```

Fungsi ini simetris (hash dari [xor](https://en.wikipedia.org/wiki/Exclusive_or) b). Artinya, saat kita memeriksa bukti Merkle, kita tidak perlu mengkhawatirkan apakah harus meletakkan nilai bukti sebelum atau sesudah nilai yang dihitung. Pengecekan bukti Merkle dilakukan di rantai, jadi semakin sedikit yang perlu kita lakukan di sana akan semakin baik.

Peringatan:
Kriptografi lebih sulit daripada kelihatannya.
Versi awal artikel ini memiliki fungsi hash `hash(a^b)`.
Itu adalah ide yang **buruk** karena itu berarti jika Anda mengetahui nilai `a` dan `b` yang sah, Anda dapat menggunakan `b' = a^b^a'` untuk membuktikan nilai `a'` apa pun yang diinginkan.
Dengan fungsi ini, Anda harus menghitung `b'` sedemikian rupa sehingga `hash(a') ^ hash(b')` sama dengan nilai yang diketahui (cabang berikutnya dalam perjalanan ke akar), yang jauh lebih sulit.

```javascript
// Nilai untuk menunjukkan bahwa cabang tertentu kosong, tidak
// memiliki nilai
const empty = 0n
```

Saat angka nilai bukan merupakan pangkat dua dari bilangan bulat, kita perlu menangani cabang-cabang kosongnya. Cara program berikut melakukannya adalah dengan meletakkan nol sebagai pengganti.

![Pohon Merkle dengan cabang yang hilang](merkle-empty-hash.png)

```javascript
// Menghitung satu tingkat ke atas pohon dari sebuah larik hash dengan mengambil hash
// dari setiap pasangan secara berurutan
const oneLevelUp = (inputArray) => {
  var result = []
  var inp = [...inputArray] // Untuk menghindari menimpa input // Tambahkan nilai kosong jika perlu (kita perlu semua daun untuk // dipasangkan)

  if (inp.length % 2 === 1) inp.push(empty)

  for (var i = 0; i < inp.length; i += 2)
    result.push(pairHash(inp[i], inp[i + 1]))

  return result
} // oneLevelUp
```

Fungsi ini "memanjat" satu tingkat dalam pohon Merkle dengan melakukan hash pada pasangan nilai pada lapisan saat ini. Perhatikan bahwa ini bukan implementasi yang paling efisien, kita bisa saja menghindari penyalinan input dan hanya menambahkan `hashEmpty` saat yang tepat di dalam loop, tetapi kode ini dioptimalkan untuk keterbacaan.

```javascript
const getMerkleRoot = (inputArray) => {
  var result

  result = [...inputArray] // Naik ke pohon sampai hanya ada satu nilai, yaitu // akar. // // Jika sebuah lapisan memiliki jumlah entri ganjil, // kode di oneLevelUp menambahkan nilai kosong, jadi jika kita punya, misalnya, // 10 daun, kita akan memiliki 5 cabang di lapisan kedua, 3 // cabang di lapisan ketiga, 2 di lapisan keempat dan akarnya adalah yang kelima

  while (result.length > 1) result = oneLevelUp(result)

  return result[0]
}
```

Untuk sampai pada akar, panjat hingga tersisa hanya satu nilai.

#### Membuat bukti Merkle {#creating-a-merkle-proof}

Bukti Merkle merupakan nilai untuk melakukan hash secara bersamaan dengan nilai yang dibuktikan untuk mengembalikan akar Merkle. Nilai yang dibuktikan sering kali tersedia dari data lainnya, sehingga saya memilih untuk menyediakannya secara terpisah dibandingkan sebagai bagian dari kode.

```javascript
// Bukti merkle terdiri dari nilai dari daftar entri untuk
// di-hash. Karena kami menggunakan fungsi hash yang simetris, kami tidak
// memerlukan lokasi item untuk memverifikasi bukti, hanya untuk membuatnya
const getMerkleProof = (inputArray, n) => {
    var result = [], currentLayer = [...inputArray], currentN = n

    // Sampai kita mencapai puncak
    while (currentLayer.length > 1) {
        // Tidak ada lapisan dengan panjang ganjil
        if (currentLayer.length % 2)
            currentLayer.push(empty)

        result.push(currentN % 2
               // Jika currentN ganjil, tambahkan nilai sebelumnya ke bukti
            ? currentLayer[currentN-1]
               // Jika genap, tambahkan nilai setelahnya
            : currentLayer[currentN+1])

```

Kita melakukan hash `(v[0],v[1])`, `(v[2],v[3])`, dll. Jadi, untuk nilai genap, kita memerlukan nilai selanjutnya, untuk nilai ganjil diperlukan nilai sebelumnya.

```javascript
        // Pindah ke lapisan berikutnya
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // while currentLayer.length > 1

    return result
}   // getMerkleProof
```

### Kode di dalam rantai {#onchain-code}

Akhirnya, kita memiliki kode yang memeriksa bukti tersebut. Kode di dalam rantai ditulis dalam [Solidity](https://docs.soliditylang.org/en/v0.8.11/). Optimisasi jauh lebih penting di sini karena gas cukup mahal.

```solidity
//SPDX-License-Identifier: Domain Publik
pragma solidity ^0.8.0;

import "hardhat/console.sol";
```

Saya menulis ini menggunakan [lingkungan pengembangan Hardhat](https://hardhat.org/), yang memungkinkan kita untuk memiliki [output konsol dari Solidity](https://hardhat.org/docs/cookbook/debug-logs) saat mengembangkan.

```solidity

contract MerkleProof {
    uint merkleRoot;

    function getRoot() public view returns (uint) {
      return merkleRoot;
    }

    // Sangat tidak aman, dalam kode produksi akses ke
    // fungsi ini HARUS dibatasi secara ketat, mungkin untuk
    // seorang pemilik
    function setRoot(uint _merkleRoot) external {
      merkleRoot = _merkleRoot;
    }   // setRoot
```

Atur dan dapatkan fungsi untuk akar Merkle. Membiarkan semua orang memperbarui akar Merkle adalah _ide yang sangat buruk_ dalam sistem produksi. Saya melakukannya di sini demi menyederhanakan kode sampel. **Jangan lakukan ini pada sistem di mana integritas data benar-benar penting**.

```solidity
    function hash(uint _a) internal pure returns(uint) {
      return uint(keccak256(abi.encode(_a)));
    }

    function pairHash(uint _a, uint _b) internal pure returns(uint) {
      return hash(hash(_a) ^ hash(_b));
    }
```

Fungsi ini menghasilkan hash pasangan. Ini hanyalah terjemahan Solidity dari kode JavaScript untuk `hash` dan `pairHash`.

**Catatan:** Ini adalah kasus lain dari optimisasi untuk keterbacaan. Berdasarkan [definisi fungsi](https://www.tutorialspoint.com/solidity/solidity_cryptographic_functions.htm), mungkin saja untuk menyimpan data sebagai nilai [`bytes32`](https://docs.soliditylang.org/en/v0.5.3/types.html#fixed-size-byte-arrays) dan menghindari konversi.

```solidity
    // Verifikasi bukti Merkle
    function verifyProof(uint _value, uint[] calldata _proof)
        public view returns (bool) {
      uint temp = _value;
      uint i;

      for(i=0; i<_proof.length; i++) {
        temp = pairHash(temp, _proof[i]);
      }

      return temp == merkleRoot;
    }

}  // MarkleProof
```

Dalam notasi matematika, verifikasi bukti Merkle terlihat seperti ini: `H(proof_n, H(proof_n-1, H(proof_n-2, ...` H(proof_1, H(proof_0, value))...)))`. Kode ini menerapkan hal tersebut.

## Bukti Merkle dan rollup tidak dapat digabungkan {#merkle-proofs-and-rollups}

Bukti Merkle tidak bekerja dengan baik dengan [rollup](/developers/docs/scaling/#rollups). Alasannya, karena rollups menulis seluruh data transaksi di L1, tetapi memprosesnya di L2. Biaya untuk mengirimkan bukti Merkle dengan transaksi rata-rata hingga 638 gas per lapisan (saat ini, satu bita dalam data panggilan seharga 16 gas jika bukan nol, dan 4 gas jika nol). Jika kita memiliki 1024 kata pada data, bukti Merkle memerlukan 10 lapisan, atau totalnya 6380 gas.

Melihat contoh pada [Optimism](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m), biaya penulisan gas L1 sekitar 100 gwei dan biaya gas L2 0.001 gwei (itu adalah harga normal, bisa naik saat terjadi kemacetan). Jadi, dengan biaya satu gas L1, kita dapat membelanjakan ratusan ribu gas pada pemrosesan L2. Asumsikan kita tidak menimpa penyimpanan, artinya kita dapat menulis sekitar lima kata ke penyimpanan pada L2 dengan harga satu gas L1. Untuk satu bukti Merkle, kita dapat menulis seluruh 1024 kata ke penyimpanan (dengan asumsi kata-kata tersebut dapat dihitung di rantai sejak awal, alih-alih disediakan dalam transaksi) dan masih memiliki sebagian besar gas yang tersisa.

## Kesimpulan {#conclusion}

Dalam kehidupan nyata, Anda mungkin tidak pernah menerapkan pohon Merkle sendiri. Ada pustaka-pustaka terkenal dan teraudit yang dapat Anda gunakan dan secara umum, paling baik untuk tidak menerapkan primitif kriptografik sendiri. Namun, saya harap bahwa sekarang Anda memahami bukti Merkle lebih baik dan dapat memutuskan waktu bukti tersebut dapat digunakan.

Perhatikan bahwa meskipun bukti Merkle menjaga _integritas_, bukti tersebut tidak menjaga _ketersediaan_. Mengetahui bahwa tidak seorang pun dapat mengambil aset Anda adalah sedikit penghiburan jika penyimpanan data memutuskan untuk menolak akses dan Anda juga tidak dapat membangun pohon Merkle untuk mengaksesnya. Jadi, pohon Merkle paling baik digunakan dengan beberapa jenis penyimpanan terdesentralisasi, seperti IPFS.

[Lihat di sini untuk lebih banyak pekerjaan saya](https://cryptodocguy.pro/).
