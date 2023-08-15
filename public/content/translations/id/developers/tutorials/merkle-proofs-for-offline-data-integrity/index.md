---
title: Bukti Merkle untuk integritas data luring
description: Memastikan integritas data di rantai untuk data yang tersimpan, sebagian besar, di luar rantai
author: Ori Pomerantz
tags:
  - "merkle"
  - "integritas"
  - "penyimpanan"
skill: advanced
lang: id
published: 2021-12-30
---

## Pendahuluan {#introduction}

Idealnya, kita ingin menyimpan segala sesuatu di penyimpanan Ethereum, yang tersimpan di seluruh ribuan komputer dan memiliki ketersediaan (data tidak dapat disensor) dan integritas (data tidak dapat dimodifikasi dalam cara yang tidak diotorisasi) sangat tinggi, tetapi menyimpan satu kata berukuran 32 bita biasanya memerlukan 20.000 gas. Ketika saya menulis ini, biaya tersebut setara dengan $6,60. Dengan harga 21 sen per bita, penggunaan rutin ini terlalu mahal.

To solve this problem the Ethereum ecosystem developed [many alternative ways to store data in a decentralized fashion](/developers/docs/storage/). Biasanya, berbagai cara tersebut melibatkan pertukaran antara ketersediaan dan harga. Namun, integritas biasanya terjamin.

Dalam artikel ini, Anda belajar **cara** memastikan integritas data tanpa menyimpan data di rantai blok, menggunakan [bukti Merkle](https://computersciencewiki.org/index.php/Merkle_proof).

## Bagaimana cara kerjanya? {#how-does-it-work}

Dalam teori, kita hanya dapat menyimpan hash data di rantai, dan mengirimkan semua data dalam transaksi yang memerlukannya. Namun, masih terlalu mahal. Satu bita data dari transaksi memerlukan sekitar 16 gas, saat ini kira-kira setengah sen, atau $5 per kilobita. Dengan harga $5000 per megabita, masih terlalu mahal untuk penggunaan rutin, bahkan tanpa biaya tambahan pembuatan hash data.

Solusinya adalah membuat hash subset data berbeda secara berulang, sehingga untuk data yang tidak perlu Anda kirimkan, Anda cukup mengirimkan satu hash. Anda melakukannya menggunakan pohon Merkle, struktur data pohon di mana setiap simpul adalah hash dari simpul di bawahnya:

![Pohon Merkle](tree.png)

Hash akar adalah satu-satunya bagian yang perlu disimpan di rantai. Untuk membuktikan nilai tertentu, Anda menyediakan semua hash yang perlu digabungkan dengannya untuk mendapatkan akarnya. Contohnya, untuk membuktikan `C` Anda memberikan nilai `D`, `H(A-B)`, dan `H(E-H)`.

![Bukti nilai C](proof-c.png)

## Penerapan {#implementation}

[Kode sampel disediakan di sini](https://github.com/qbzzt/merkle-proofs-for-offline-data-integrity).

### Kode di luar rantai {#off-chain-code}

Dalam artikel ini, kita menggunakan JavaScript untuk komputasi di luar rantai. Sebagian besar aplikasi terdesentralisasi memiliki komponen di luar rantai mereka dalam JavaScript.

#### Membuat akar Merkle {#creating-the-merkle-root}

Pertama, kita perlu menyediakan akar Merkle untuk rantai.

```javascript
const ethers = require("ethers")
```

[Kita menggunakan fungsi hash dari paket ethers](https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256).

```javascript
// The raw data whose integrity we have to verify. The first two bytes a
// are a user identifier, and the last two bytes the amount of tokens the
// user owns at present.
const dataArray = [
  0x0bad0010, 0x60a70020, 0xbeef0030, 0xdead0040, 0xca110050, 0x0e660060,
  0xface0070, 0xbad00080, 0x060d0091,
]
```

Contohnya, mengodekan setiap entri menjadi satu bilangan bulat 256-bit akan menghasilkan kode yang kurang dapat terbaca dibandingkan dengan penggunaan JSON. Namun, proses ini menyebabkan proses penerimaan data dalam kontrak menjadi sangat berkurang, sehingga biaya gas lebih rendah. [Anda dapat membaca JSON pada rantai](https://github.com/chrisdotn/jsmnSol), hanya saja sebaiknya dapat dihindari.

```javascript
// The array of hash values, as BigInts
const hashArray = dataArray
```

Dalam kasus ini, data kita dimulai dengan nilai 256-bit, sehingga tidak perlu melakukan pemrosesan. Jika kita menggunakan struktur data yang lebih rumit, seperti string, kita perlu memastikan untuk melakukan hash data terlebih dulu untuk mendapatkan susunan hash. Perlu diperhatikan bahwa proses ini juga terjadi sehingga kita tidak peduli jika pengguna mengetahui informasi pengguna lain. Jika tidak, kita harus melakukan hash agar pengguna 1 tidak mengetahui nilai untuk pengguna 0, pengguna 2 tidak mengetahui nilai untuk pengguna 3, dst.

```javascript
const pairHash = (a, b) =>
  BigInt(ethers.utils.keccak256("0x" + (a ^ b).toString(16).padStart(64, 0)))
```

Fungsi hash ethers diharapkan untuk mendapatkan string JavaScript dengan angka heksadesimal, seperti `0x60A7`, dan merespon dengan string lainnya dalam struktur yang sama. Namun, untuk bagian kode lainnya lebih mudah menggunakan `BigInt`, sehingga kita mengonversi ke string heksadesimal dan sebaliknya.

Fungsi ini bersifat simetris (hash dari a [xor](https://en.wikipedia.org/wiki/Exclusive_or) b). Artinya, saat kita memeriksa bukti Merkle, kita tidak perlu mengkhawatirkan apakah harus meletakkan nilai bukti sebelum atau sesudah nilai yang dihitung. Pemeriksaan bukti Merkle diselesaikan pada rantai, sehingga semakin sedikit yang perlu kita lakukan di sana, semakin baik.

```javascript
// The value to denote that a certain branch is empty, doesn't
// have a value
const empty = 0n
```

Saat angka nilai bukan merupakan pangkat dua dari bilangan bulat, kita perlu menangani cabang-cabang kosongnya. Cara program berikut melakukannya adalah dengan meletakkan nol sebagai pengganti.

![Pohon Merkle dengan cabang-cabang yang hilang](merkle-empty-hash.png)

```javascript
// Calculate one level up the tree of a hash array by taking the hash of
// each pair in sequence
const oneLevelUp = (inputArray) => {
  var result = []
  var inp = [...inputArray] // To avoid over writing the input

  // Add an empty value if necessary (we need all the leaves to be
  // paired)
  if (inp.length % 2 === 1) inp.push(empty)

  for (var i = 0; i < inp.length; i += 2)
    result.push(pairHash(inp[i], inp[i + 1]))

  return result
} // oneLevelUp
```

Fungsi ini "memanjat" satu tingkat dalam pohon Merkle dengan melakukan hash pada pasangan nilai pada lapisan saat ini. Perlu diingat bahwa fungsi ini bukan merupakan penerapan yang paling efisien, kita dapat menghindari menyalin input dan hanya menambahkan `hashEmpty` apabila memungkinkan dalam perulangan, tetapi kode ini dioptimasi supaya mudah dibaca.

```javascript
const getMerkleRoot = (inputArray) => {
  var result

  result = [...inputArray]

  // Climb up the tree until there is only one value, that is the
  // root.
  //
  // If a layer has an odd number of entries the
  // code in oneLevelUp adds an empty value, so if we have, for example,
  // 10 leaves we'll have 5 branches in the second layer, 3
  // branches in the third, 2 in the fourth and the root is the fifth
  while (result.length > 1) result = oneLevelUp(result)

  return result[0]
}
```

Untuk sampai pada akar, panjat hingga tersisa hanya satu nilai.

#### Membuat bukti Merkle {#creating-a-merkle-proof}

Bukti Merkle merupakan nilai untuk melakukan hash secara bersamaan dengan nilai yang dibuktikan untuk mengembalikan akar Merkle. Nilai yang dibuktikan sering kali tersedia dari data lainnya, sehingga saya memilih untuk menyediakannya secara terpisah dibandingkan sebagai bagian dari kode.

```javascript
// A merkle proof consists of the value of the list of entries to
// hash with. Because we use a symmetrical hash function, we don't
// need the item's location to verify the proof, only to create it
const getMerkleProof = (inputArray, n) => {
    var result = [], currentLayer = [...inputArray], currentN = n

    // Until we reach the top
    while (currentLayer.length > 1) {
        // No odd length layers
        if (currentLayer.length % 2)
            currentLayer.push(empty)

        result.push(currentN % 2
               // If currentN is odd, add with the value before it to the proof
            ? currentLayer[currentN-1]
               // If it is even, add the value after it
            : currentLayer[currentN+1])

```

Kita melakukan hash `(v[0],v[1])`, `(v[2],v[3])`, dll. Jadi, untuk nilai genap, kita memerlukan nilai selanjutnya, untuk nilai ganjil diperlukan nilai sebelumnya.

```javascript
        // Move to the next layer up
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // while currentLayer.length > 1

    return result
}   // getMerkleProof
```

### Kode di dalam rantai {#off-chain-code}

Akhirnya, kita memiliki kode yang memeriksa bukti tersebut. Kode di dalam rantai ditulis dalam [Solidity](https://docs.soliditylang.org/en/v0.8.11/). Optimisasi jauh lebih penting di sini karena gas cukup mahal.

```solidity
//SPDX-License-Identifier: Public Domain
pragma solidity ^0.8.0;

import "hardhat/console.sol";
```

Saya menulis ini menggunakan [lingkungan pengembangan Hardhat](https://hardhat.org/), sehingga kita dapat memiliki [output konsol dari Solidity](https://hardhat.org/tutorial/debugging-with-hardhat-network.html) ketika mengembangkan.

```solidity

contract MerkleProof {
    uint merkleRoot;

    function getRoot() public view returns (uint) {
      return merkleRoot;
    }

    // Extremely insecure, in production code access to
    // this function MUST BE strictly limited, probably to an
    // owner
    function setRoot(uint _merkleRoot) external {
      merkleRoot = _merkleRoot;
    }   // setRoot
```

Atur dan dapatkan fungsi untuk akar Merkle. Letting everybody update the Merkle root is an _extremely bad idea_ in a production system. Saya melakukannya di sini demi menyederhanakan kode sampel. **Jangan melakukannya pada sistem di mana integritas data benar-benar penting**.

```solidity
    function pairHash(uint _a, uint _b) internal pure returns(uint) {
      return uint(keccak256(abi.encode(_a ^ _b)));
    }
```

Fungsi ini menghasilkan hash pasangan. Ini hanya terjemahan Solidity dari kode JavaScript untuk `pairHash`.

**Catatan:** Ini merupakan kasus optimisasi lain untuk keterbacaan. Didasarkan pada [definisi fungsi](https://www.tutorialspoint.com/solidity/solidity_cryptographic_functions.htm), kasus ini mungkin dapat terjadi untuk menyimpan data sebagai nilai [`bytes32`](https://docs.soliditylang.org/en/v0.5.3/types.html#fixed-size-byte-arrays) dan menghindari konversi.

```solidity
    // Verify a Merkle proof
    function verifyProof(uint _value, uint[] calldata _proof)
        public view returns (bool) {
      uint temp = _value;
      uint i;

      for(i=0; i<_proof.length; i++) {
        temp = pairHash(temp, _proof[i]);
      }

      return temp == merkleRoot;
    }

}  // MarkleProof
```

Dalam notasi matematis, verifikasi bukti Merkle terlihat seperti ini: `H(proof_n, H(proof_n-1, H(proof_n-2, ... H(proof_1, H(proof_0, value))...)))`. Kode ini menerapkan hal tersebut.

## Bukti Merkle dan rollups tidak bercampur {#merkle-proofs-and-rollups}

Bukti Merkle tidak bekerja baik dengan [rollups](/developers/docs/scaling/#rollups). Alasannya, karena rollups menulis seluruh data transaksi di L1, tetapi memprosesnya di L2. Biaya untuk mengirimkan bukti Merkle dengan transaksi rata-rata hingga 638 gas per lapisan (saat ini, satu bita dalam data panggilan seharga 16 gas jika bukan nol, dan 4 gas jika nol). Jika kita memiliki 1024 kata pada data, bukti Merkle memerlukan 10 lapisan, atau totalnya 6380 gas.

Seperti dilihat pada contoh di [Optimism](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m), menulis gas L1 berbiaya sekitar 100 gwei dan gas L2 berbiaya 0.001 gwei (itu adalah harga normal, dapat naik saat arus padat). Jadi, dengan biaya satu gas L1, kita dapat membelanjakan ratusan ribu gas pada pemrosesan L2. Asumsikan kita tidak menimpa penyimpanan, artinya kita dapat menulis sekitar lima kata ke penyimpanan pada L2 dengan harga satu gas L1. Untuk satu bukti Merkle, kita dapat menulis seluruh 1024 kata ke penyimpanan (dengan anggapan kata-kata tersebut sejak awal dapat dihitung pada rantai, daripada disediakan dalam transaksi) dan masih memiliki banyak gas yang tersisa.

## Kesimpulan {#conclusion}

Dalam kehidupan nyata, Anda mungkin tidak pernah menerapkan pohon Merkle sendiri. Ada pustaka-pustaka terkenal dan teraudit yang dapat Anda gunakan dan secara umum, paling baik untuk tidak menerapkan primitif kriptografik sendiri. Namun, saya harap bahwa sekarang Anda memahami bukti Merkle lebih baik dan dapat memutuskan waktu bukti tersebut dapat digunakan.

Perhatikan bahwa ketika bukti-bukti Merkle mempertahankan _integritas_, bukti-bukti tersebut tidak mempertahankan _ketersediaan_. Mengetahui bahwa tidak seorang pun dapat mengambil aset Anda adalah sedikit penghiburan jika penyimpanan data memutuskan untuk menolak akses dan Anda juga tidak dapat membangun pohon Merkle untuk mengaksesnya. Jadi, pohon Merkle paling baik digunakan dengan beberapa jenis penyimpanan terdesentralisasi, seperti IPFS.
