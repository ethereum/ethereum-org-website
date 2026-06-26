---
title: Bukti Merkle untuk integritas data offline
description: Memastikan integritas data onchain untuk data yang sebagian besar disimpan secara offchain
author: Ori Pomerantz
tags: ["penyimpanan"]
skill: advanced
breadcrumb: Bukti Merkle
lang: id
published: 2021-12-30
---

## Pengantar {#introduction}

Idealnya kita ingin menyimpan semuanya di penyimpanan Ethereum, yang disimpan di ribuan komputer dan memiliki ketersediaan yang sangat tinggi (data tidak dapat disensor) dan integritas (data tidak dapat dimodifikasi dengan cara yang tidak sah), tetapi menyimpan kata 32-byte biasanya memakan biaya 20.000 gas. Saat saya menulis ini, biaya tersebut setara dengan $6,60. Pada 21 sen per byte, ini terlalu mahal untuk banyak penggunaan.

Untuk menyelesaikan masalah ini, ekosistem Ethereum mengembangkan [banyak cara alternatif untuk menyimpan data secara terdesentralisasi](/developers/docs/storage/). Biasanya cara-cara ini melibatkan pertukaran (tradeoff) antara ketersediaan dan harga. Namun, integritas biasanya terjamin.

Dalam artikel ini Anda akan mempelajari **cara** memastikan integritas data tanpa menyimpan data di rantai blok, menggunakan [bukti Merkle](https://computersciencewiki.org/index.php/Merkle_proof).

## Bagaimana cara kerjanya? {#how-does-it-work}

Secara teori kita bisa saja menyimpan hash data secara onchain, dan mengirimkan semua data dalam transaksi yang membutuhkannya. Namun, ini masih terlalu mahal. Satu byte data ke sebuah transaksi memakan biaya sekitar 16 gas, saat ini sekitar setengah sen, atau sekitar $5 per kilobyte. Pada $5000 per megabyte, ini masih terlalu mahal untuk banyak penggunaan, bahkan tanpa biaya tambahan untuk proses hash data.

Solusinya adalah dengan menge-hash berbagai subset data secara berulang, sehingga untuk data yang tidak perlu Anda kirim, Anda cukup mengirimkan sebuah hash. Anda melakukan ini menggunakan pohon Merkle, sebuah struktur data pohon di mana setiap node adalah hash dari node-node di bawahnya:

![Merkle Tree](tree.png)

Hash akar (root hash) adalah satu-satunya bagian yang perlu disimpan secara onchain. Untuk membuktikan nilai tertentu, Anda menyediakan semua hash yang perlu digabungkan dengannya untuk mendapatkan akar tersebut. Misalnya, untuk membuktikan `C` Anda menyediakan `D`, `H(A-B)`, dan `H(E-H)`.

![Proof of the value of C](proof-c.png)

## Implementasi {#implementation}

[Kode sampel disediakan di sini](https://github.com/qbzzt/merkle-proofs-for-offline-data-integrity).

### Kode offchain {#offchain-code}

Dalam artikel ini kita menggunakan JavaScript untuk komputasi offchain. Sebagian besar aplikasi terdesentralisasi (dapp) memiliki komponen offchain mereka dalam JavaScript.

#### Membuat akar Merkle {#creating-the-merkle-root}

Pertama kita perlu menyediakan akar Merkle ke rantai.

```javascript
const ethers = require("ethers")
```

[Kita menggunakan fungsi hash dari paket ethers](https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256).

```javascript
// Data mentah yang integritasnya harus kita verifikasi. Dua byte pertama a
// adalah pengidentifikasi pengguna, dan dua byte terakhir adalah jumlah token yang
// dimiliki pengguna saat ini.
const dataArray = [
  0x0bad0010, 0x60a70020, 0xbeef0030, 0xdead0040, 0xca110050, 0x0e660060,
  0xface0070, 0xbad00080, 0x060d0091,
]
```

Mengodekan setiap entri ke dalam bilangan bulat 256-bit tunggal menghasilkan kode yang kurang dapat dibaca dibandingkan menggunakan JSON, misalnya. Namun, ini berarti pemrosesan yang jauh lebih sedikit untuk mengambil data di dalam kontrak, sehingga biaya gas jauh lebih rendah. [Anda dapat membaca JSON secara onchain](https://github.com/chrisdotn/jsmnSol), hanya saja itu adalah ide yang buruk jika bisa dihindari.

```javascript
// Array nilai hash, sebagai BigInt
const hashArray = dataArray
```

Dalam kasus ini, data kita pada awalnya adalah nilai 256-bit, jadi tidak diperlukan pemrosesan. Jika kita menggunakan struktur data yang lebih rumit, seperti string, kita perlu memastikan bahwa kita menge-hash data tersebut terlebih dahulu untuk mendapatkan array hash. Perhatikan bahwa ini juga karena kita tidak peduli jika pengguna mengetahui informasi pengguna lain. Jika tidak, kita harus menge-hash sehingga pengguna 1 tidak akan mengetahui nilai untuk pengguna 0, pengguna 2 tidak akan mengetahui nilai untuk pengguna 3, dll.

```javascript
// Konversi antara string yang diharapkan oleh fungsi hash dan
// BigInt yang kita gunakan di tempat lain.
const hash = (x) =>
  BigInt(ethers.utils.keccak256("0x" + x.toString(16).padStart(64, 0)))
```

Fungsi hash ethers mengharapkan untuk mendapatkan string JavaScript dengan angka heksadesimal, seperti `0x60A7`, dan merespons dengan string lain dengan struktur yang sama. Namun, untuk sisa kode, lebih mudah menggunakan `BigInt`, jadi kita mengonversinya ke string heksadesimal dan mengembalikannya lagi.

```javascript
// Hash simetris dari sebuah pasangan sehingga kita tidak peduli jika urutannya dibalik.
const pairHash = (a, b) => hash(hash(a) ^ hash(b))
```

Fungsi ini simetris (hash dari a [xor](https://en.wikipedia.org/wiki/Exclusive_or) b). Ini berarti bahwa ketika kita memeriksa bukti Merkle, kita tidak perlu khawatir tentang apakah akan meletakkan nilai dari bukti sebelum atau sesudah nilai yang dihitung. Pemeriksaan bukti Merkle dilakukan secara onchain, jadi semakin sedikit yang perlu kita lakukan di sana, semakin baik.

Peringatan:
Kriptografi lebih sulit daripada kelihatannya.
Versi awal artikel ini memiliki fungsi hash `hash(a^b)`.
Itu adalah ide yang **buruk** karena itu berarti jika Anda mengetahui nilai sah dari `a` dan `b` Anda dapat menggunakan `b' = a^b^a'` untuk membuktikan nilai `a'` apa pun yang diinginkan.
Dengan fungsi ini Anda harus menghitung `b'` sedemikian rupa sehingga `hash(a') ^ hash(b')` sama dengan nilai yang diketahui (cabang berikutnya dalam perjalanan menuju akar), yang mana jauh lebih sulit.

```javascript
// Nilai untuk menunjukkan bahwa cabang tertentu kosong, tidak
// memiliki nilai
const empty = 0n
```

Ketika jumlah nilai bukan bilangan bulat pangkat dua, kita perlu menangani cabang yang kosong. Cara program ini melakukannya adalah dengan meletakkan nol sebagai penampung (placeholder).

![Merkle tree with branches missing](merkle-empty-hash.png)

```javascript
// Hitung satu tingkat ke atas pohon dari array hash dengan mengambil hash dari
// setiap pasangan secara berurutan
const oneLevelUp = (inputArray) => {
  var result = []
  var inp = [...inputArray] // Untuk menghindari penimpaan input // Tambahkan nilai kosong jika perlu (kita butuh semua daun // berpasangan)

  if (inp.length % 2 === 1) inp.push(empty)

  for (var i = 0; i < inp.length; i += 2)
    result.push(pairHash(inp[i], inp[i + 1]))

  return result
} // oneLevelUp
```

Fungsi ini "memanjat" satu tingkat di pohon Merkle dengan menge-hash pasangan nilai pada lapisan saat ini. Perhatikan bahwa ini bukan implementasi yang paling efisien, kita bisa saja menghindari penyalinan input dan hanya menambahkan `hashEmpty` jika sesuai di dalam loop, tetapi kode ini dioptimalkan untuk keterbacaan.

```javascript
const getMerkleRoot = (inputArray) => {
  var result

  result = [...inputArray] // Naik ke atas pohon sampai hanya ada satu nilai, yaitu // akar. // // Jika sebuah lapisan memiliki jumlah entri ganjil, // kode di oneLevelUp menambahkan nilai kosong, jadi jika kita memiliki, misalnya, // 10 daun, kita akan memiliki 5 cabang di lapisan kedua, 3 // cabang di lapisan ketiga, 2 di lapisan keempat dan akarnya adalah yang kelima

  while (result.length > 1) result = oneLevelUp(result)

  return result[0]
}
```

Untuk mendapatkan akar, panjat terus hingga hanya tersisa satu nilai.

#### Membuat bukti Merkle {#creating-a-merkle-proof}

Bukti Merkle adalah nilai-nilai yang akan di-hash bersama dengan nilai yang sedang dibuktikan untuk mendapatkan kembali akar Merkle. Nilai yang akan dibuktikan sering kali tersedia dari data lain, jadi saya lebih suka menyediakannya secara terpisah daripada sebagai bagian dari kode.

```javascript
// Sebuah bukti Merkle terdiri dari nilai daftar entri untuk
// di-hash. Karena kita menggunakan fungsi hash simetris, kita tidak
// membutuhkan lokasi item untuk memverifikasi bukti, hanya untuk membuatnya
const getMerkleProof = (inputArray, n) => {
    var result = [], currentLayer = [...inputArray], currentN = n

    // Sampai kita mencapai puncak
    while (currentLayer.length > 1) {
        // Tidak ada lapisan dengan panjang ganjil
        if (currentLayer.length % 2)
            currentLayer.push(empty)

        result.push(currentN % 2
               // Jika currentN ganjil, tambahkan dengan nilai sebelumnya ke bukti
            ? currentLayer[currentN-1]
               // Jika genap, tambahkan nilai setelahnya
            : currentLayer[currentN+1])

```

Kita menge-hash `(v[0],v[1])`, `(v[2],v[3])`, dll. Jadi untuk nilai genap kita membutuhkan nilai berikutnya, untuk nilai ganjil kita membutuhkan nilai sebelumnya.

```javascript
        // Pindah ke lapisan berikutnya di atas
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // while currentLayer.length > 1

    return result
}   // getMerkleProof
```

### Kode onchain {#onchain-code}

Terakhir kita memiliki kode yang memeriksa bukti tersebut. Kode onchain ditulis dalam [Solidity](https://docs.soliditylang.org/en/v0.8.11/). Pengoptimalan jauh lebih penting di sini karena gas relatif mahal.

```solidity
//SPDX-License-Identifier: Public Domain
pragma solidity ^0.8.0;

import "hardhat/console.sol";
```

Saya menulis ini menggunakan [lingkungan pengembangan Hardhat](https://hardhat.org/), yang memungkinkan kita untuk memiliki [keluaran konsol dari Solidity](https://hardhat.org/docs/cookbook/debug-logs) saat mengembangkan.

```solidity

contract MerkleProof {
    uint merkleRoot;

    function getRoot() public view returns (uint) {
      return merkleRoot;
    }

    // Sangat tidak aman, dalam kode produksi akses ke
    // fungsi ini HARUS sangat dibatasi, mungkin hanya untuk
    // pemilik
    function setRoot(uint _merkleRoot) external {
      merkleRoot = _merkleRoot;
    }   // setRoot
```

Fungsi set dan get untuk akar Merkle. Membiarkan semua orang memperbarui akar Merkle adalah _ide yang sangat buruk_ dalam sistem produksi. Saya melakukannya di sini demi kesederhanaan untuk kode sampel. **Jangan lakukan ini pada sistem di mana integritas data benar-benar penting**.

```solidity
    function hash(uint _a) internal pure returns(uint) {
      return uint(keccak256(abi.encode(_a)));
    }

    function pairHash(uint _a, uint _b) internal pure returns(uint) {
      return hash(hash(_a) ^ hash(_b));
    }
```

Fungsi ini menghasilkan hash pasangan. Ini hanyalah terjemahan Solidity dari kode JavaScript untuk `hash` dan `pairHash`.

**Catatan:** Ini adalah kasus lain dari pengoptimalan untuk keterbacaan. Berdasarkan [definisi fungsi](https://www.tutorialspoint.com/solidity/solidity_cryptographic_functions.htm), mungkin saja untuk menyimpan data sebagai nilai [`bytes32`](https://docs.soliditylang.org/en/v0.5.3/types.html#fixed-size-byte-arrays) dan menghindari konversi.

```solidity
    // Verifikasi sebuah bukti Merkle
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

Dalam notasi matematika, verifikasi bukti Merkle terlihat seperti ini: `H(proof_n, H(proof_n-1, H(proof_n-2, ... H(proof_1, H(proof_0, value))...)))`. Kode ini mengimplementasikannya.

## Bukti Merkle dan rollup tidak bisa dicampur {#merkle-proofs-and-rollups}

Bukti Merkle tidak berfungsi dengan baik dengan [rollup](/developers/docs/scaling/#rollups). Alasannya adalah bahwa rollup menulis semua data transaksi di lapisan 1 (l1), tetapi memprosesnya di lapisan 2 (l2). Biaya untuk mengirimkan bukti Merkle dengan sebuah transaksi rata-rata mencapai 638 gas per lapisan (saat ini satu byte dalam data panggilan memakan biaya 16 gas jika bukan nol, dan 4 jika nol). Jika kita memiliki 1024 kata data, sebuah bukti Merkle membutuhkan sepuluh lapisan, atau total 6380 gas.

Melihat contoh pada [Optimism](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m), menulis gas l1 memakan biaya sekitar 100 Gwei dan gas l2 memakan biaya 0,001 Gwei (itu adalah harga normal, bisa naik saat terjadi kepadatan). Jadi untuk biaya satu gas l1 kita dapat menghabiskan seratus ribu gas pada pemrosesan l2. Dengan asumsi kita tidak menimpa penyimpanan, ini berarti kita dapat menulis sekitar lima kata ke penyimpanan di l2 dengan harga satu gas l1. Untuk satu bukti Merkle, kita dapat menulis seluruh 1024 kata ke penyimpanan (dengan asumsi kata-kata tersebut dapat dihitung secara onchain sejak awal, daripada disediakan dalam sebuah transaksi) dan masih memiliki sebagian besar sisa gas.

## Kesimpulan {#conclusion}

Dalam kehidupan nyata, Anda mungkin tidak akan pernah mengimplementasikan pohon Merkle sendiri. Ada pustaka yang terkenal dan telah diaudit yang dapat Anda gunakan dan secara umum, yang terbaik adalah tidak mengimplementasikan primitif kriptografi sendiri. Namun saya harap sekarang Anda memahami bukti Merkle dengan lebih baik dan dapat memutuskan kapan bukti tersebut layak digunakan.

Perhatikan bahwa meskipun bukti Merkle menjaga _integritas_, mereka tidak menjaga _ketersediaan_. Mengetahui bahwa tidak ada orang lain yang dapat mengambil aset Anda adalah hiburan kecil jika penyimpanan data memutuskan untuk melarang akses dan Anda juga tidak dapat membangun pohon Merkle untuk mengaksesnya. Jadi pohon Merkle paling baik digunakan dengan semacam penyimpanan terdesentralisasi, seperti IPFS.

[Lihat di sini untuk karya saya yang lain](https://cryptodocguy.pro/).