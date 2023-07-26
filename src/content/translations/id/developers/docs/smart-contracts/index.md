---
title: Pengantar kontrak pintar
description: Gambaran umum kontrak pintar, yang berfokus pada karakteristik dan batasan uniknya.
lang: id
---

## Apa itu kontrak pintar? {#what-is-a-smart-contract}

"Kontrak pintar" secara sederhana adalah sebuah program yang beroperasi pada blockchain Ethereum. Ini adalah koleksi kode (fungsinya) dan data (statenya) yang berada pada alamat tertentu dalam blockchain Ethereum.

Kontrak pintar adalah suatu jenis [akun Ethereum](/developers/docs/accounts/). Ini berarti kontrak pintar memiliki saldo dan bisa mengirim transaksi melalui jaringan. Namun kontrak pintar tidak dapat dikendalikan oleh pengguna, tetapi diterapkan ke jaringan dan berjalan seperti yang telah diprogramkan. Akun pengguna bisa berinteraksi dengan sebuah kontrak pintar dengan mengirimkan transaksi yang menjalankan fungsi yang telah ditentukan dalam kontrak pintar. Kontrak pintar bisa menetapkan aturan, seperti kontrak umumnya, dan secara otomatis melaksanakannya lewat kode. Kontrak pintar tidak dapat dihapus secara default, dan interaksi dengannya tidak dapat diubah.

## Prasyarat {#prerequisites}

Pastikan Anda telah membaca tentang [akun](/developers/docs/accounts/), [transaksi](/developers/docs/transactions/), dan [mesin virtual Ethereum](/developers/docs/evm/) sebelum terjun ke dunia kontrak pintar.

## Mesin penjual otomatis digital {#a-digital-vending-machine}

Mungkin perumpamaan terbaik untuk kontrak pintar adalah sebuah mesin penjual otomatis, seperti yang dideskripsikan oleh [Nick Szabo](https://unenumerated.blogspot.com/). Dengan input yang benar, maka hasil keluarannya terjamin.

Untuk mendapatkan sebuah kudapan ringan dari mesin penjual otomatis:

```
money + snack selection = snack dispensed
```

Logika ini diprogramkan ke dalam mesin penjual otomatis.

Kontrak pintar, seperti mesin penjual otomatis, mempunyai logika yang diprogram ke dalamnya. Berikut adalah contoh sederhana bagaimana mesin penjual otomatis ini mungkin terlihat seperti kontrak pintar:

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

Seperti sebuah mesin penjual otomatis yang menghapus kebutuhan akan karyawan vendor, kontrak pintar juga bisa menggantikan perantara dalam banyak industri.

## Tanpa izin {#permissionless}

Siapa pun dapat menulis kontrak pintar dan menyebarkannya ke jaringan. Anda hanya perlu belajar cara mengodekan dalam [bahasa kontrak pintar](/developers/docs/smart-contracts/languages/) dan memiliki cukup ETH untuk menyebarkan kontrak Anda. Menggunakan kontrak pintar secara teknis sama dengan melakukan transaksi, sehingga Anda perlu membayar [Gas](/developers/docs/gas/) sama seperti Anda perlu membayar gas untuk transfer ETH sederhana. Namun, biaya gas untuk penggunaan kontrak jauh lebih tinggi.

Ethereum memiliki bahasa ramah pengembang untuk menulis kontrak pintar:

- Solidity
- Vyper

[Selengkapnya tentang bahasa](/developers/docs/smart-contracts/languages/)

Namun, kontrak harus dikompilasikan sebelum bisa digunakan agar mesin virtual Ethereum bisa mengartikan dan menyimpan kontrak tersebut. [Selengkapnya tentang pengompilasian](/developers/docs/smart-contracts/compiling/)

## Komposabilitas {#composability}

Kontrak pintar bersifat publik di Ethereum dan bisa dianggap sebagai API terbuka. Ini berarti Anda bisa memanggil kontrak pintar orang lain di dalam kontrak pintar Anda untuk lebih memperluas apa yang mungkin diperluas. Kontrak bahkan bisa menyebarkan kontrak lainnya.

Pelajari selengkapnya tentang [komposabilitas kontrak pintar](/developers/docs/smart-contracts/composability/).

## Batasan {#limitations}

Kontrak pintar sendiri tidak bisa mendapatkan informasi tentang aksi "dunia nyata" karena tidak bisa mengirim permintaan HTTP. Ini sengaja dirancang demikian. Mengandalkan informasi eksternal bisa membahayakan konsensus, yang penting untuk keamanan dan desentralisasi.

Ada cara untuk mengatasi ini, menggunakan [oracle](/developers/docs/oracles/).

Keterbatasan lain dari kontrak pintar adalah ukuran kontrak maksimumnya. Ukuran kontrak pintar maksimum bisa 24KB atau kontrak akan kehabisan gas. Ini dapat dihindari dengan menggunakan [Pola Permata](https://eips.ethereum.org/EIPS/eip-2535).

## Sumber daya kontrak pintar {#smart-contract-resources}

**Kontrak OpenZeppelin -** **_Pustaka untuk pengembangan kontrak pintar yang aman._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Forum Komunitas](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Blok pembangun yang aman, sederhana, dan fleksibel untuk kontrak pintar._**

- [Dappsys](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

## Bacaan lebih lanjut {#further-reading}

- [Kontrak Pintar: Teknologi Blockchain yang Akan Menggantikan Pengacara](https://blockgeeks.com/guides/smart-contracts/)_– Blockgeeks_
- [Cara Terbaik untuk Pengembangan Kontrak Pintar](https://yos.io/2019/11/10/smart-contract-development-best-practices/) _–10 November 2019 - Yos Riady_
- [Kontrak bersih - panduan tentang pola dan praktik kontrak pintar](https://www.wslyvh.com/clean-contracts/) _– 30 Juli 2020 - wslyvh_
