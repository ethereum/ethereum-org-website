---
title: Pengantar kontrak pintar
description: Gambaran umum kontrak pintar, yang berfokus pada karakteristik dan batasan uniknya.
lang: id
---

## Apa itu kontrak pintar? {#what-is-a-smart-contract}

"Kontrak pintar" secara sederhana adalah sebuah program yang beroperasi pada blockchain Ethereum. Ini adalah koleksi kode (fungsinya) dan data (statenya) yang berada pada alamat tertentu dalam blockchain Ethereum.

Kontrak pintar adalah sejenis [akun Ethereum](/developers/docs/accounts/). Artinya, kontrak ini ada saldo dan dapat menjadi target transaksi. Namun kontrak pintar tidak dapat dikendalikan oleh pengguna, tetapi diterapkan ke jaringan dan berjalan seperti yang telah diprogramkan. Akun pengguna bisa berinteraksi dengan sebuah kontrak pintar dengan mengirimkan transaksi yang menjalankan fungsi yang telah ditentukan dalam kontrak pintar. Kontrak pintar bisa menetapkan aturan, seperti kontrak umumnya, dan secara otomatis melaksanakannya lewat kode. Kontrak pintar tidak dapat dihapus secara default, dan interaksi dengannya tidak dapat dibatalkan.

## Persyaratan {#prerequisites}

Jika Anda baru memulai atau mencari pengantar yang tidak terlalu teknis, kami merekomendasikan [pengantar kontrak pintar](/smart-contracts/) kami.

Pastikan Anda telah membaca tentang [akun](/developers/docs/accounts/), [transaksi](/developers/docs/transactions/), dan [Mesin Virtual Ethereum](/developers/docs/evm/) sebelum terjun ke dunia kontrak pintar.

## Mesin penjual otomatis digital {#a-digital-vending-machine}

Mungkin metafora terbaik untuk kontrak pintar adalah mesin penjual otomatis, seperti yang dijelaskan oleh [Nick Szabo](https://unenumerated.blogspot.com/). Input yang tepat akan menjamin output yang pasti.

Untuk mendapatkan kudapan dari mesin penjual otomatis:

```
money + snack selection = snack dispensed
```

Logika ini diprogram ke dalam mesin penjual otomatis.

Kontrak pintar, seperti mesin penjual otomatis, mempunyai logika yang terprogram ke dalamnya. Berikut contoh sederhana tentang seperti apa tampilan mesin penjual otomatis jika diumpamakan sebagai kontrak pintar yang ditulis dalam Solidity:

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Deklarasikan variabel status dari kontrak
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // Saat kontrak 'VendingMachine' diterapkan:
    // 1. atur alamat penerapan sebagai pemilik kontrak
    // 2. atur saldo cupcake kontrak pintar yang diterapkan ke 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Izinkan pemilik untuk menambah saldo cupcake kontrak pintar
    function refill(uint amount) public {
        require(msg.sender == owner, "Hanya pemilik yang bisa mengisi ulang.");
        cupcakeBalances[address(this)] += amount;
    }

    // Izinkan siapa pun untuk membeli cupcake
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "Anda harus membayar setidaknya 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Stok cupcake tidak cukup untuk menyelesaikan pembelian ini");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Seperti cara mesin penjual otomatis menghilangkan kebutuhan akan karyawan penjual, kontrak pintar juga dapat menggantikan para perantara di banyak industri.

## Tanpa izin {#permissionless}

Siapa pun dapat menulis kontrak pintar dan menyebarkannya ke jaringan. Anda hanya perlu belajar cara membuat kode dalam [bahasa kontrak pintar](/developers/docs/smart-contracts/languages/), dan memiliki cukup ETH untuk menerapkan kontrak Anda. Menerapkan kontrak pintar secara teknis adalah sebuah transaksi, jadi Anda perlu membayar [gas](/developers/docs/gas/) dengan cara yang sama seperti Anda perlu membayar gas untuk transfer ETH sederhana. Namun, biaya gas untuk penyebaran kontrak jauh lebih tinggi.

Ethereum memiliki bahasa pemrograman yang mudah digunakan oleh pengembang untuk menulis kontrak pintar:

- Solidity
- Vyper

[Selengkapnya tentang bahasa](/developers/docs/smart-contracts/languages/)

Namun, kontrak harus dikompilasi sebelum dapat disebarkan agar mesin virtual Ethereum dapat menafsirkan dan menyimpan kontrak tersebut. [Selengkapnya tentang kompilasi](/developers/docs/smart-contracts/compiling/)

## Komposabilitas {#composability}

Kontrak pintar bersifat publik di Ethereum dan bisa dianggap sebagai API terbuka. Hal ini berarti bahwa Anda dapat memanggil kontrak pintar lain di dalam kontrak pintar Anda sendiri sehingga dapat mengembangkan banyak kemungkinan. Kontrak bahkan dapat menyebarkan kontrak lainnya.

Pelajari lebih lanjut tentang [komposabilitas kontrak pintar](/developers/docs/smart-contracts/composability/).

## Keterbatasan {#limitations}

Kontrak pintar sendiri tidak dapat memperoleh informasi tentang kejadian "dunia nyata" karena tidak dapat mengambil informasi dari sumber di luar rantai. Artinya, kontrak tidak dapat merespons aksi di dunia nyata. Hal ini sesuai dengan rancangan. Mengandalkan informasi eksternal bisa membahayakan konsensus, yang penting untuk keamanan dan desentralisasi.

Namun, penting bagi aplikasi blockchain untuk dapat memanfaatkan data offchain. Solusinya adalah [oracle](/developers/docs/oracles/), yang merupakan perangkat yang menyerap data di luar rantai dan membuatnya tersedia untuk kontrak pintar.

Keterbatasan kontrak pintar lainnya adalah ukuran maksimum kontrak. Kontrak pintar dapat berukuran maksimum sebesar 24KB atau akan kehabisan gas jika lebih. Ini dapat diatasi dengan menggunakan [The Diamond Pattern](https://eips.ethereum.org/EIPS/eip-2535).

## Kontrak multisig {#multisig}

Kontrak multisig (beberapa tanda tangan) adalah akun kontrak pintar yang membutuhkan beberapa tanda tangan yang valid untuk menjalankan transaksi. Cara ini sangat berguna untuk menghindari titik kegagalan tunggal bagi kontrak yang menyimpan Ether atau token lainnya dalam jumlah besar. Multisig juga membagi tanggung jawab menjalankan kontrak dan manajemen kunci di antara beberapa pihak sehingga mencegah hilangnya kunci pribadi yang dapat mengakibatkan hilangnya dana secara permanen. Karena alasan ini, kontrak multisig dapat digunakan untuk tata kelola DAO yang sederhana. Multisig membutuhkan N tanda tangan dari M kemungkinan tanda tangan yang dapat diterima (dengan N ≤ M, dan M > 1) agar dapat dieksekusi. `N = 3, M = 5` dan `N = 4, M = 7` umum digunakan. Multisig 4/7 membutuhkan empat dari tujuh kemungkinan tanda tangan yang valid. Hal ini berarti dana masih dapat diambil kembali meskipun ada tiga tanda tangan yang hilang. Dalam kasus ini, hal ini juga berarti bahwa mayoritas pemegang kunci harus setuju dan menandatangani agar kontrak dapat dijalankan.

## Sumber daya kontrak pintar {#smart-contract-resources}

**Kontrak OpenZeppelin -** **_Pustaka untuk pengembangan kontrak pintar yang aman._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [github](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Forum Komunitas](https://forum.openzeppelin.com/c/general/16)

## Bacaan lebih lanjut {#further-reading}

- [Coinbase: Apa itu kontrak pintar?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink: Apa itu kontrak pintar?](https://chain.link/education/smart-contracts)
- [Video: Penjelasan Sederhana - Kontrak Pintar](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft: Platform pembelajaran dan audit Web3](https://updraft.cyfrin.io)
