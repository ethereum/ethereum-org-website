---
title: Pengantar kontrak pintar
description: Gambaran umum tentang kontrak pintar, berfokus pada karakteristik dan batasan uniknya.
lang: id
---

## Apa itu kontrak pintar? {#what-is-a-smart-contract}

"Kontrak pintar" pada dasarnya adalah sebuah program yang berjalan di blockchain [Ethereum](/). Ini adalah kumpulan kode (fungsinya) dan data (statusnya) yang berada pada alamat spesifik di blockchain Ethereum.

Kontrak pintar adalah salah satu jenis [akun Ethereum](/developers/docs/accounts/). Ini berarti mereka memiliki saldo dan dapat menjadi target transaksi. Namun, mereka tidak dikendalikan oleh pengguna, melainkan disebarkan ke jaringan dan berjalan sesuai program. Akun pengguna kemudian dapat berinteraksi dengan kontrak pintar dengan mengirimkan transaksi yang mengeksekusi fungsi yang ditentukan pada kontrak pintar. Kontrak pintar dapat menentukan aturan, seperti kontrak biasa, dan secara otomatis menegakkannya melalui kode. Kontrak pintar tidak dapat dihapus secara default, dan interaksi dengannya tidak dapat diubah (irreversible).

## Prasyarat {#prerequisites}

Jika Anda baru memulai atau mencari pengantar yang tidak terlalu teknis, kami merekomendasikan [pengantar kontrak pintar](/smart-contracts/) kami.

Pastikan Anda telah membaca tentang [akun](/developers/docs/accounts/), [transaksi](/developers/docs/transactions/), dan [Mesin Virtual Ethereum](/developers/docs/evm/) sebelum terjun ke dunia kontrak pintar.

## Mesin penjual otomatis digital {#a-digital-vending-machine}

Mungkin metafora terbaik untuk kontrak pintar adalah mesin penjual otomatis (vending machine), seperti yang dijelaskan oleh [Nick Szabo](https://unenumerated.blogspot.com/). Dengan input yang tepat, output tertentu dijamin.

Untuk mendapatkan makanan ringan dari mesin penjual otomatis:

```
money + snack selection = snack dispensed
```

Logika ini diprogram ke dalam mesin penjual otomatis.

Kontrak pintar, seperti mesin penjual otomatis, memiliki logika yang diprogram ke dalamnya. Berikut adalah contoh sederhana tentang bagaimana mesin penjual otomatis ini akan terlihat jika itu adalah kontrak pintar yang ditulis dalam Solidity:

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Declare state variables of the contract // Deklarasikan variabel state dari kontrak
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // When 'VendingMachine' contract is deployed: // Ketika kontrak 'VendingMachine' di-deploy:
    // 1. set the deploying address as the owner of the contract // 1. atur alamat yang men-deploy sebagai pemilik kontrak
    // 2. set the deployed smart contract's cupcake balance to 100 // 2. atur saldo cupcake smart contract yang di-deploy menjadi 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Allow the owner to increase the smart contract's cupcake balance // Izinkan pemilik untuk menambah saldo cupcake smart contract
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // Allow anyone to purchase cupcakes // Izinkan siapa saja untuk membeli cupcake
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Sama seperti bagaimana mesin penjual otomatis menghilangkan kebutuhan akan karyawan penjual, kontrak pintar dapat menggantikan perantara di banyak industri.

## Tanpa izin {#permissionless}

Siapa pun dapat menulis kontrak pintar dan menyebarkannya ke jaringan. Anda hanya perlu mempelajari cara membuat kode dalam [bahasa kontrak pintar](/developers/docs/smart-contracts/languages/), dan memiliki cukup ETH untuk menyebarkan kontrak Anda. Menyebarkan kontrak pintar secara teknis adalah sebuah transaksi, jadi Anda perlu membayar [gas](/developers/docs/gas/) dengan cara yang sama seperti Anda perlu membayar gas untuk transfer ETH sederhana. Namun, biaya gas untuk penyebaran kontrak jauh lebih tinggi.

Ethereum memiliki bahasa yang ramah pengembang untuk menulis kontrak pintar:

- Solidity
- Vyper

[Lebih lanjut tentang bahasa](/developers/docs/smart-contracts/languages/)

Namun, mereka harus dikompilasi sebelum dapat disebarkan sehingga mesin virtual Ethereum dapat menafsirkan dan menyimpan kontrak tersebut. [Lebih lanjut tentang kompilasi](/developers/docs/smart-contracts/compiling/)

## Komposabilitas {#composability}

Kontrak pintar bersifat publik di Ethereum dan dapat dianggap sebagai API terbuka. Ini berarti Anda dapat memanggil kontrak pintar lain di dalam kontrak pintar Anda sendiri untuk sangat memperluas apa yang mungkin dilakukan. Kontrak bahkan dapat menyebarkan kontrak lainnya.

Pelajari lebih lanjut tentang [komposabilitas kontrak pintar](/developers/docs/smart-contracts/composability/).

## Batasan {#limitations}

Kontrak pintar itu sendiri tidak bisa mendapatkan informasi tentang peristiwa "dunia nyata" karena mereka tidak dapat mengambil data dari sumber offchain. Ini berarti mereka tidak dapat merespons peristiwa di dunia nyata. Ini memang disengaja. Mengandalkan informasi eksternal dapat membahayakan konsensus, yang penting untuk keamanan dan desentralisasi.

Namun, penting bagi aplikasi blockchain untuk dapat menggunakan data offchain. Solusinya adalah [oracle](/developers/docs/oracles/) yang merupakan alat yang menyerap data offchain dan membuatnya tersedia untuk kontrak pintar.

Batasan lain dari kontrak pintar adalah ukuran kontrak maksimum. Kontrak pintar dapat berukuran maksimum 24KB atau akan kehabisan gas. Hal ini dapat diatasi dengan menggunakan [Pola Berlian (The Diamond Pattern)](https://eips.ethereum.org/EIPS/eip-2535).

## Kontrak multi tanda tangan {#multisig}

Kontrak multi tanda tangan (multisig) adalah akun kontrak pintar yang memerlukan beberapa tanda tangan yang valid untuk mengeksekusi sebuah transaksi. Ini sangat berguna untuk menghindari titik kegagalan tunggal (single points of failure) untuk kontrak yang menyimpan sejumlah besar ether atau token lainnya. Multi tanda tangan juga membagi tanggung jawab untuk eksekusi kontrak dan manajemen kunci di antara beberapa pihak dan mencegah hilangnya satu kunci pribadi yang menyebabkan hilangnya dana yang tidak dapat diubah. Karena alasan ini, kontrak multi tanda tangan dapat digunakan untuk tata kelola DAO yang sederhana. Multi tanda tangan memerlukan N tanda tangan dari M kemungkinan tanda tangan yang dapat diterima (di mana N ≤ M, dan M > 1) untuk dapat dieksekusi. `N = 3, M = 5` dan `N = 4, M = 7` umumnya digunakan. Multi tanda tangan 4/7 memerlukan empat dari tujuh kemungkinan tanda tangan yang valid. Ini berarti dana masih dapat diambil meskipun tiga tanda tangan hilang. Dalam hal ini, ini juga berarti bahwa mayoritas pemegang kunci harus setuju dan menandatangani agar kontrak dapat dieksekusi.

## Sumber daya kontrak pintar {#smart-contract-resources}

**Kontrak OpenZeppelin -** **_Pustaka untuk pengembangan kontrak pintar yang aman._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Forum Komunitas](https://forum.openzeppelin.com/c/general/16)

## Bacaan lebih lanjut {#further-reading}

- [Coinbase: Apa itu kontrak pintar?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink: Apa itu kontrak pintar?](https://chain.link/education/smart-contracts)
- [Video: Penjelasan Sederhana - Kontrak Pintar](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft: Platform pembelajaran dan audit Web3](https://updraft.cyfrin.io)

## Tutorial: Tanda tangan kontrak pintar (EIP-1271) di Ethereum {#tutorials}

- [EIP-1271: Menandatangani dan Memverifikasi Tanda Tangan Kontrak Pintar](/developers/tutorials/eip-1271-smart-contract-signatures/) _– Bagaimana EIP-1271 memungkinkan kontrak pintar untuk memverifikasi tanda tangan, dengan panduan implementasi Safe._