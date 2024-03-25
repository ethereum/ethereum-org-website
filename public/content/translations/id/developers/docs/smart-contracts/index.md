---
title: Pengantar kontrak pintar
description: Gambaran umum kontrak pintar, yang berfokus pada karakteristik dan batasan uniknya.
lang: id
---

## Apa itu kontrak pintar? {#what-is-a-smart-contract}

"Kontrak pintar" secara sederhana adalah sebuah program yang beroperasi pada blockchain Ethereum. Ini adalah koleksi kode (fungsinya) dan data (statenya) yang berada pada alamat tertentu dalam blockchain Ethereum.

Kontrak pintar adalah suatu jenis [akun Ethereum](/developers/docs/accounts/). Artinya, kontrak ini ada saldo dan dapat menjadi target transaksi. Namun kontrak pintar tidak dapat dikendalikan oleh pengguna, tetapi diterapkan ke jaringan dan berjalan seperti yang telah diprogramkan. Akun pengguna bisa berinteraksi dengan sebuah kontrak pintar dengan mengirimkan transaksi yang menjalankan fungsi yang telah ditentukan dalam kontrak pintar. Kontrak pintar bisa menetapkan aturan, seperti kontrak umumnya, dan secara otomatis melaksanakannya lewat kode. Kontrak pintar tidak dapat dihapus secara default, dan interaksi dengannya tidak dapat diubah.

## Prasyarat {#prerequisites}

Jika Anda baru saja memulai atau mencari informasi pendahuluan yang tidak terlalu teknis, kami menganjurkan untuk membaca [pendahuluan kontrak pintar](/smart-contracts/) dari kami.

Pastikan Anda telah membaca tentang [akun](/developers/docs/accounts/), [transaksi](/developers/docs/transactions/), dan [mesin virtual Ethereum](/developers/docs/evm/) sebelum terjun ke dunia kontrak pintar.

## Mesin penjual otomatis digital {#a-digital-vending-machine}

Perumpamaan terbaik untuk menggambarkan kontrak pintar mungkin dengan mesin penjual otomatis, sebagaimana diuraikan oleh [Nick Szabo](https://unenumerated.blogspot.com/). Input yang tepat akan menjamin output yang pasti.

Untuk mendapatkan kudapan dari mesin penjual otomatis:

```
money + snack selection = snack dispensed
```

Logika ini diprogram ke dalam mesin penjual otomatis.

Kontrak pintar, seperti mesin penjual otomatis, mempunyai logika yang terprogram ke dalamnya. Berikut contoh sederhana tentang seperti apa tampilan mesin penjual otomatis jika diumpamakan sebagai kontrak pintar yang ditulis dalam Solidity:

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Declare state variables of the contract
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // When 'VendingMachine' contract is deployed:
    // 1. set the deploying address as the owner of the contract
    // 2. set the deployed smart contract's cupcake balance to 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Allow the owner to increase the smart contract's cupcake balance
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // Allow anyone to purchase cupcakes
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Seperti cara mesin penjual otomatis menghilangkan kebutuhan akan karyawan penjual, kontrak pintar juga dapat menggantikan para perantara di banyak industri.

## Tanpa izin {#permissionless}

Siapa pun dapat menulis kontrak pintar dan menyebarkannya ke jaringan. Anda hanya perlu belajar cara menulis kode dalam [bahasa kontrak pintar](/developers/docs/smart-contracts/languages/) dan memiliki cukup ETH untuk menyebarkan kontrak Anda. Menyebarkan kontrak pintar secara teknis adalah transaksi, sehingga Anda harus membayar [gas](/developers/docs/gas/) dengan cara yang sama seperti membayar gas untuk transfer ETH biasa. Namun, biaya gas untuk penyebaran kontrak jauh lebih tinggi.

Ethereum memiliki bahasa pemrograman yang mudah digunakan oleh pengembang untuk menulis kontrak pintar:

- Solidity
- Vyper

[Selengkapnya tentang bahasa pemrograman](/developers/docs/smart-contracts/languages/)

Namun, kontrak harus dikompilasi sebelum dapat disebarkan agar mesin virtual Ethereum dapat menafsirkan dan menyimpan kontrak tersebut. [Selengkapnya tentang kompilasi](/developers/docs/smart-contracts/compiling/)

## Komposabilitas {#composability}

Kontrak pintar bersifat publik di Ethereum dan bisa dianggap sebagai API terbuka. Hal ini berarti bahwa Anda dapat memanggil kontrak pintar lain di dalam kontrak pintar Anda sendiri sehingga dapat mengembangkan banyak kemungkinan. Kontrak bahkan dapat menyebarkan kontrak lainnya.

Pelajari selengkapnya tentang [komposabilitas kontrak pintar](/developers/docs/smart-contracts/composability/).

## Batasan {#limitations}

Kontrak pintar sendiri tidak bisa mendapatkan informasi tentang aksi "dunia nyata" karena kontrak tidak dapat mengambil data dari sumber di luar rantai. Artinya, kontrak tidak dapat merespons aksi di dunia nyata. Hal ini sesuai dengan rancangan. Mengandalkan informasi eksternal bisa membahayakan konsensus, yang penting untuk keamanan dan desentralisasi.

Akan tetapi, penting bagi aplikasi rantai blok untuk dapat menggunakan data di luar rantai. Solusinya adalah [oracle](/developers/docs/oracles/), yaitu alat yang mengumpulkan data di luar rantai dan menyediakannya untuk kontrak pintar.

Keterbatasan kontrak pintar lainnya adalah ukuran maksimum kontrak. Kontrak pintar dapat berukuran maksimum sebesar 24KB atau akan kehabisan gas jika lebih. Hal ini dapat dihindari dengan menggunakan [Pola Permata](https://eips.ethereum.org/EIPS/eip-2535).

## Kontrak multisig {#multisig}

Kontrak multisig (beberapa tanda tangan) adalah akun kontrak pintar yang membutuhkan beberapa tanda tangan yang valid untuk menjalankan transaksi. Cara ini sangat berguna untuk menghindari titik kegagalan tunggal bagi kontrak yang menyimpan Ether atau token lainnya dalam jumlah besar. Multisig juga membagi tanggung jawab menjalankan kontrak dan manajemen kunci di antara beberapa pihak sehingga mencegah hilangnya kunci pribadi yang dapat mengakibatkan hilangnya dana secara permanen. Karena alasan ini, kontrak multisig dapat digunakan untuk tata kelola DAO yang sederhana. Multisig membutuhkan N tanda tangan dari M kemungkinan tanda tangan yang dapat diterima (di mana N ≤ M, dan M > 1) agar dapat dijalankan. `N = 3, M = 5` dan `N = 4, M = 7` adalah nilai-nilai yang umum digunakan. Multisig 4/7 membutuhkan empat dari tujuh kemungkinan tanda tangan yang valid. Hal ini berarti dana masih dapat diambil kembali meskipun ada tiga tanda tangan yang hilang. Dalam kasus ini, hal ini juga berarti bahwa mayoritas pemegang kunci harus setuju dan menandatangani agar kontrak dapat dijalankan.

## Sumber daya kontrak pintar {#smart-contract-resources}

**Kontrak OpenZeppelin -** **_Pustaka untuk pengembangan kontrak pintar yang aman._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Forum Komunitas](https://forum.openzeppelin.com/c/general/16)

## Bacaan lebih lanjut {#further-reading}

- [Coinbase: Apa yang dimaksud dengan kontrak pintar?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink: Apa yang dimaksud dengan kontrak pintar?](https://chain.link/education/smart-contracts)
- [Video: Penjelasan Sederhana - Kontrak Pintar](https://youtu.be/ZE2HxTmxfrI)
