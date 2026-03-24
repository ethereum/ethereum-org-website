---
title: Bukti Merkle untuk integritas data offchain
description: Memastikan integritas data onchain untuk data yang sebagian besar disimpan secara offchain
author: Ori Pomerantz
tags: ["penyimpanan"]
skill: advanced
breadcrumb: "Bukti Merkle"
lang: id
published: 2021-12-30
---

## Pengantar {#introduction}

Idealnya kita ingin menyimpan semuanya di penyimpanan Ethereum, yang disimpan di ribuan komputer dan memiliki ketersediaan yang sangat tinggi (data tidak dapat disensor) dan integritas (data tidak dapat dimodifikasi dengan cara yang tidak sah), tetapi menyimpan kata 32-byte biasanya membutuhkan biaya 20.000 gas. Saat saya menulis ini, biaya tersebut setara dengan $6,60. Pada 21 sen per byte, ini terlalu mahal untuk banyak penggunaan.

Untuk memecahkan masalah ini, ekosistem Ethereum mengembangkan [banyak cara alternatif untuk menyimpan data secara terdesentralisasi](/developers/docs/storage/). Biasanya cara-cara ini melibatkan pertukaran antara ketersediaan dan harga. Namun, integritas biasanya terjamin.

Dalam artikel ini Anda akan mempelajari **cara** memastikan integritas data tanpa menyimpan data di blockchain, menggunakan [bukti Merkle](https://computersciencewiki.org/index.php/Merkle_proof).

## Bagaimana cara kerjanya? {#how-does-it-work}

Secara teori kita bisa saja menyimpan hash data secara onchain, dan mengirimkan semua data dalam transaksi yang membutuhkannya. Namun, ini masih terlalu mahal. Satu byte data untuk sebuah transaksi membutuhkan biaya sekitar 16 gas, saat ini sekitar setengah sen, atau sekitar $5 per kilobyte. Pada $5000 per megabyte, ini masih terlalu mahal untuk banyak penggunaan, bahkan tanpa biaya tambahan untuk melakukan hash pada data.

Solusinya adalah dengan berulang kali melakukan hash pada subset data yang berbeda, sehingga untuk data yang tidak perlu Anda kirim, Anda cukup mengirimkan hash. Anda melakukan ini menggunakan pohon Merkle (Merkle tree), sebuah struktur data pohon di mana setiap node adalah hash dari node-node di bawahnya:

![Pohon Merkle](tree.png)

Hash akar (root hash) adalah satu-satunya bagian yang perlu disimpan secara onchain. Untuk membuktikan nilai tertentu, Anda memberikan semua hash yang perlu digabungkan dengannya untuk mendapatkan akar. Misalnya, untuk membuktikan `C` Anda memberikan `D`, `H(A-B)`, dan `H(E-H)`.

![Bukti nilai C](proof-c.png)

## Implementasi {#implementation}

[Kode sampel disediakan di sini](https://github.com/qbzzt/merkle-proofs-for-offline-data-integrity).

### Kode offchain {#offchain-code}

Dalam artikel ini kita menggunakan JavaScript untuk komputasi offchain. Sebagian besar aplikasi terdesentralisasi memiliki komponen offchain mereka dalam JavaScript.

#### Membuat akar Merkle {#creating-the-merkle-root}

Pertama kita perlu memberikan akar Merkle ke rantai.

```javascript
const ethers = require("ethers")
```

[Kita menggunakan fungsi hash dari paket ethers](https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256).

```javascript
// The raw data whose integrity we have to verify. The first two bytes a // Data mentah yang integritasnya harus kita verifikasi. Dua byte pertama a
// are a user identifier, and the last two bytes the amount of tokens the // adalah pengidentifikasi pengguna, dan dua byte terakhir adalah jumlah token yang
// user owns at present. // dimiliki pengguna saat ini.
const dataArray = [
  0x0bad0010, 0x60a70020, 0xbeef0030, 0xdead0040, 0xca110050, 0x0e660060,
  0xface0070, 0xbad00080, 0x060d0091,
]
```

Mengodekan setiap entri ke dalam bilangan bulat 256-bit tunggal menghasilkan kode yang kurang dapat dibaca dibandingkan menggunakan JSON, misalnya. Namun, ini berarti pemrosesan yang jauh lebih sedikit untuk mengambil data dalam kontrak, sehingga biaya gas jauh lebih rendah. [Anda dapat membaca JSON secara onchain](https://github.com/chrisdotn/jsmnSol), hanya saja itu ide yang buruk jika bisa dihindari.

```javascript
// The array of hash values, as BigInts // Array nilai hash, sebagai BigInt
const hashArray = dataArray
```

Dalam kasus ini, data kita pada awalnya adalah nilai 256-bit, jadi tidak diperlukan pemrosesan. Jika kita menggunakan struktur data yang lebih rumit, seperti string, kita perlu memastikan kita melakukan hash pada data terlebih dahulu untuk mendapatkan array hash. Perhatikan bahwa ini juga karena kita tidak peduli jika pengguna mengetahui informasi pengguna lain. Jika tidak, kita harus melakukan hash sehingga pengguna 1 tidak akan mengetahui nilai untuk pengguna 0, pengguna 2 tidak akan mengetahui nilai untuk pengguna 3, dll.

```javascript
// Convert between the string the hash function expects and the // Konversi antara string yang diharapkan oleh fungsi hash dan
// BigInt we use everywhere else. // BigInt yang kita gunakan di tempat lain.
const hash = (x) =>
  BigInt(ethers.utils.keccak256("0x" + x.toString(16).padStart(64, 0)))
```

Fungsi hash ethers mengharapkan untuk mendapatkan string JavaScript dengan angka heksadesimal, seperti `0x60A7`, dan merespons dengan string lain dengan struktur yang sama. Namun, untuk sisa kode, lebih mudah menggunakan `BigInt`, jadi kita mengonversi ke string heksadesimal dan kembali lagi.

```javascript
// Symmetrical hash of a pair so we won't care if the order is reversed. // Hash simetris dari sebuah pasangan sehingga kita tidak akan peduli jika urutannya dibalik.
const pairHash = (a, b) => hash(hash(a) ^ hash(b))
```

Fungsi ini simetris (hash dari a [xor](https://en.wikipedia.org/wiki/Exclusive_or) b). Ini berarti bahwa ketika kita memeriksa bukti Merkle, kita tidak perlu khawatir tentang apakah akan meletakkan nilai dari bukti sebelum atau sesudah nilai yang dihitung. Pemeriksaan bukti Merkle dilakukan secara onchain, jadi semakin sedikit yang perlu kita lakukan di sana, semakin baik.

Peringatan:
Kriptografi lebih sulit daripada kelihatannya.
Versi awal artikel ini memiliki fungsi hash `hash(a^b)`.
Itu adalah ide yang **buruk** karena itu berarti jika Anda mengetahui nilai sah dari `a` dan `b`, Anda dapat menggunakan `b' = a^b^a'` untuk membuktikan nilai `a'` apa pun yang diinginkan.
Dengan fungsi ini Anda harus menghitung `b'` sedemikian rupa sehingga `hash(a') ^ hash(b')` sama dengan nilai yang diketahui (cabang berikutnya dalam perjalanan menuju akar), yang mana jauh lebih sulit.

```javascript
// The value to denote that a certain branch is empty, doesn't // Nilai untuk menunjukkan bahwa cabang tertentu kosong, tidak
// have a value // memiliki nilai
const empty = 0n
```

Ketika jumlah nilai bukan bilangan bulat pangkat dua, kita perlu menangani cabang yang kosong. Cara program ini melakukannya adalah dengan meletakkan nol sebagai tempat penampung (placeholder).

![Pohon Merkle dengan cabang yang hilang](merkle-empty-hash.png)

```javascript
// Calculate one level up the tree of a hash array by taking the hash of // Hitung satu tingkat ke atas pohon dari array hash dengan mengambil hash dari
// each pair in sequence // setiap pasangan secara berurutan
const oneLevelUp = (inputArray) => {
  var result = []
  var inp = [...inputArray] // To avoid over writing the input // Add an empty value if necessary (we need all the leaves to be // paired) // Untuk menghindari menimpa input // Tambahkan nilai kosong jika perlu (kita membutuhkan semua daun untuk // dipasangkan)

  if (inp.length % 2 === 1) inp.push(empty)

  for (var i = 0; i < inp.length; i += 2)
    result.push(pairHash(inp[i], inp[i + 1]))

  return result
} // oneLevelUp // oneLevelUp
```

Fungsi ini "memanjat" satu tingkat di pohon Merkle dengan melakukan hash pada pasangan nilai di lapisan saat ini. Perhatikan bahwa ini bukan implementasi yang paling efisien, kita bisa saja menghindari menyalin input dan hanya menambahkan `hashEmpty` jika sesuai dalam loop, tetapi kode ini dioptimalkan untuk keterbacaan.

```javascript
const getMerkleRoot = (inputArray) => {
  var result

  result = [...inputArray] // Climb up the tree until there is only one value, that is the // root. // // If a layer has an odd number of entries the // code in oneLevelUp adds an empty value, so if we have, for example, // 10 leaves we'll have 5 branches in the second layer, 3 // branches in the third, 2 in the fourth and the root is the fifth // Naik ke atas pohon sampai hanya ada satu nilai, yaitu // akar. // // Jika sebuah lapisan memiliki jumlah entri ganjil, // kode di oneLevelUp menambahkan nilai kosong, jadi jika kita memiliki, misalnya, // 10 daun kita akan memiliki 5 cabang di lapisan kedua, 3 // cabang di lapisan ketiga, 2 di lapisan keempat dan akarnya adalah yang kelima

  while (result.length > 1) result = oneLevelUp(result)

  return result[0]
}
```

Untuk mendapatkan akar, panjat terus sampai hanya tersisa satu nilai.

#### Membuat bukti Merkle {#creating-a-merkle-proof}

Bukti Merkle adalah nilai-nilai yang akan di-hash bersama dengan nilai yang dibuktikan untuk mendapatkan kembali akar Merkle. Nilai yang akan dibuktikan sering kali tersedia dari data lain, jadi saya lebih suka menyediakannya secara terpisah daripada sebagai bagian dari kode.

```javascript
// A merkle proof consists of the value of the list of entries to // Bukti merkle terdiri dari nilai daftar entri untuk
// hash with. Because we use a symmetrical hash function, we don't // di-hash. Karena kita menggunakan fungsi hash simetris, kita tidak
// need the item's location to verify the proof, only to create it // membutuhkan lokasi item untuk memverifikasi bukti, hanya untuk membuatnya
const getMerkleProof = (inputArray, n) => {
    var result = [], currentLayer = [...inputArray], currentN = n

    // Until we reach the top // Sampai kita mencapai puncak
    while (currentLayer.length > 1) {
        // No odd length layers // Tidak ada lapisan dengan panjang ganjil
        if (currentLayer.length % 2)
            currentLayer.push(empty)

        result.push(currentN % 2
               // If currentN is odd, add with the value before it to the proof // Jika currentN ganjil, tambahkan dengan nilai sebelumnya ke bukti
            ? currentLayer[currentN-1]
               // If it is even, add the value after it // Jika genap, tambahkan nilai setelahnya
            : currentLayer[currentN+1])

```

Kita melakukan hash pada `(v[0],v[1])`, `(v[2],v[3])`, dll. Jadi untuk nilai genap kita membutuhkan nilai berikutnya, untuk nilai ganjil kita membutuhkan nilai sebelumnya.

```javascript
        // Move to the next layer up // Pindah ke lapisan berikutnya di atas
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // while currentLayer.length > 1 // while currentLayer.length > 1

    return result
}   // getMerkleProof // getMerkleProof
```

### Kode onchain {#onchain-code}

Terakhir kita memiliki kode yang memeriksa bukti tersebut. Kode onchain ditulis dalam [Solidity](https://docs.soliditylang.org/en/v0.8.11/). Optimasi jauh lebih penting di sini karena gas relatif mahal.

```solidity
//SPDX-License-Identifier: Public Domain // SPDX-License-Identifier: Public Domain
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

    // Extremely insecure, in production code access to // Sangat tidak aman, dalam kode produksi akses ke
    // this function MUST BE strictly limited, probably to an // fungsi ini HARUS sangat dibatasi, mungkin untuk
    // owner // pemilik
    function setRoot(uint _merkleRoot) external {
      merkleRoot = _merkleRoot;
    }   // setRoot // setRoot
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

**Catatan:** Ini adalah kasus lain dari optimasi untuk keterbacaan. Berdasarkan [definisi fungsi](https://www.tutorialspoint.com/solidity/solidity_cryptographic_functions.htm), mungkin saja untuk menyimpan data sebagai nilai [`bytes32`](https://docs.soliditylang.org/en/v0.5.3/types.html#fixed-size-byte-arrays) dan menghindari konversi.

```solidity
    // Verify a Merkle proof // Verifikasi bukti Merkle
    function verifyProof(uint _value, uint[] calldata _proof)
        public view returns (bool) {
      uint temp = _value;
      uint i;

      for(i=0; i<_proof.length; i++) {
        temp = pairHash(temp, _proof[i]);
      }

      return temp == merkleRoot;
    }

}  // MarkleProof // MarkleProof
```

Dalam notasi matematika, verifikasi bukti Merkle terlihat seperti ini: `H(proof_n, H(proof_n-1, H(proof_n-2, ... H(proof_1, H(proof_0, value))...)))`. Kode ini mengimplementasikannya.

## Bukti Merkle dan rollup tidak bisa dicampur {#merkle-proofs-and-rollups}

Bukti Merkle tidak bekerja dengan baik dengan [rollup](/developers/docs/scaling/#rollups). Alasannya adalah bahwa rollup menulis semua data transaksi di L1, tetapi memprosesnya di L2. Biaya untuk mengirimkan bukti Merkle dengan sebuah transaksi rata-rata mencapai 638 gas per lapisan (saat ini satu byte dalam data panggilan membutuhkan biaya 16 gas jika bukan nol, dan 4 jika nol). Jika kita memiliki 1024 kata data, bukti Merkle membutuhkan sepuluh lapisan, atau total 6380 gas.

Melihat contoh pada [Optimism](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m), menulis gas L1 membutuhkan biaya sekitar 100 gwei dan gas L2 membutuhkan biaya 0,001 gwei (itu adalah harga normal, bisa naik saat terjadi kepadatan). Jadi untuk biaya satu gas L1 kita dapat menghabiskan seratus ribu gas pada pemrosesan L2. Dengan asumsi kita tidak menimpa penyimpanan, ini berarti kita dapat menulis sekitar lima kata ke penyimpanan di L2 dengan harga satu gas L1. Untuk satu bukti Merkle, kita dapat menulis seluruh 1024 kata ke penyimpanan (dengan asumsi kata-kata tersebut dapat dihitung secara onchain sejak awal, daripada disediakan dalam sebuah transaksi) dan masih memiliki sebagian besar sisa gas.

## Kesimpulan {#conclusion}

Dalam kehidupan nyata, Anda mungkin tidak akan pernah mengimplementasikan pohon Merkle sendiri. Ada pustaka yang terkenal dan telah diaudit yang dapat Anda gunakan dan secara umum, yang terbaik adalah tidak mengimplementasikan primitif kriptografi sendiri. Namun saya harap sekarang Anda memahami bukti Merkle dengan lebih baik dan dapat memutuskan kapan bukti tersebut layak digunakan.

Perhatikan bahwa meskipun bukti Merkle menjaga _integritas_, mereka tidak menjaga _ketersediaan_. Mengetahui bahwa tidak ada orang lain yang dapat mengambil aset Anda adalah penghiburan kecil jika penyimpanan data memutuskan untuk melarang akses dan Anda juga tidak dapat membangun pohon Merkle untuk mengaksesnya. Jadi pohon Merkle paling baik digunakan dengan semacam penyimpanan terdesentralisasi, seperti IPFS.

[Lihat di sini untuk karya saya yang lain](https://cryptodocguy.pro/).