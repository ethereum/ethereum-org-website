---
title: Berinteraksi dengan kontrak lain dari Solidity
description: Cara menyebarkan kontrak pintar dari kontrak yang ada dan berinteraksi dengannya
author: "jdourlens"
tags:
  [
    "kontrak pintar",
    "Solidity",
    "remix",
    "menyebarkan",
    "komposabilitas"
  ]
skill: advanced
lang: id
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Pada tutorial sebelumnya, kita telah belajar banyak [cara menyebarkan kontrak pintar pertama Anda](/developers/tutorials/deploying-your-first-smart-contract/) dan menambahkan beberapa fitur padanya seperti [mengontrol akses dengan pengubah](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) atau [penanganan eror di Solidity](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/). Dalam tutorial ini kita akan mempelajari cara menyebarkan kontrak pintar dari kontrak yang ada dan berinteraksi dengannya.

Kita akan membuat kontrak yang memungkinkan siapa pun untuk memiliki kontrak pintar `Counter` sendiri dengan membuat sebuah pabrik untuknya, yang namanya adalah `CounterFactory`. Pertama, inilah kode kontrak pintar `Counter` awal kita:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "Anda bukan pemilik kontraknya");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "Anda harus menggunakan pabriknya");
        _;
    }

     constructor(address owner) public {
        _owner = owner;
        _factory = msg.sender;
    }

     function getCount() public view returns (uint256) {
        return _count;
    }

    function increment(address caller) public onlyFactory onlyOwner(caller) {
        _count++;
    }

}
```

Perhatikan bahwa kami sedikit mengubah kode kontrak untuk melacak alamat pabrik dan alamat pemilik kontrak. Saat Anda memanggil kode kontrak dari kontrak lain, `msg.sender` akan merujuk ke alamat pabrik kontrak kami. Ini adalah **poin yang sangat penting untuk dipahami** karena menggunakan kontrak untuk berinteraksi dengan kontrak lain merupakan praktik yang umum. Oleh karena itu, Anda harus memperhatikan siapa pengirimnya dalam kasus-kasus yang kompleks.

Untuk ini, kami juga menambahkan pengubah `onlyFactory` yang memastikan bahwa fungsi pengubah state hanya dapat dipanggil oleh pabrik yang akan meneruskan pemanggil asli sebagai parameter.

Di dalam `CounterFactory` baru kita yang akan mengelola semua Counter lainnya, kita akan menambahkan pemetaan yang akan mengaitkan seorang pemilik dengan alamat kontrak counter-nya:

```solidity
mapping(address => Counter) _counters;
```

Di Ethereum, pemetaan setara dengan objek dalam javascript, yang memungkinkan untuk memetakan kunci tipe A ke nilai tipe B. Dalam kasus ini, kita memetakan alamat seorang pemilik dengan instance dari Counter-nya.

Membuat instance Counter baru untuk seseorang akan terlihat seperti ini:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Pertama, kita periksa apakah orang tersebut sudah memiliki sebuah counter. Jika ia tidak memiliki counter, kita membuat instance counter baru dengan meneruskan alamatnya ke konstruktor `Counter` dan menetapkan instance yang baru dibuat ke pemetaan.

Untuk mendapatkan hitungan dari Counter tertentu, akan terlihat seperti ini:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

Fungsi pertama memeriksa apakah kontrak Counter ada untuk alamat yang diberikan, lalu memanggil metode `getCount` dari instance tersebut. Fungsi kedua: `getMyCount` hanyalah sebuah jalan pintas untuk meneruskan `msg.sender` langsung ke fungsi `getCount`.

Fungsi `increment` cukup serupa tetapi meneruskan pengirim transaksi asli ke kontrak `Counter`:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

Perhatikan bahwa jika dipanggil terlalu sering, counter kita mungkin bisa menjadi korban luapan (overflow). Anda harus menggunakan [pustaka SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) sebanyak mungkin untuk melindungi dari kemungkinan kasus ini.

Untuk menyebarkan kontrak kita, Anda perlu menyediakan kode dari `CounterFactory` dan `Counter`. Saat menyebarkan, misalnya di Remix, Anda harus memilih CounterFactory.

Berikut adalah kode lengkapnya:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "Anda bukan pemilik kontraknya");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "Anda harus menggunakan pabriknya");
        _;
    }

     constructor(address owner) public {
        _owner = owner;
        _factory = msg.sender;
    }

     function getCount() public view returns (uint256) {
        return _count;
    }

    function increment(address caller) public onlyFactory onlyOwner(caller) {
        _count++;
    }

}

contract CounterFactory {

    mapping(address => Counter) _counters;

    function createCounter() public {
        require (_counters[msg.sender] == Counter(0));
        _counters[msg.sender] = new Counter(msg.sender);
    }

    function increment() public {
        require (_counters[msg.sender] != Counter(0));
        Counter(_counters[msg.sender]).increment(msg.sender);
    }

    function getCount(address account) public view returns (uint256) {
        require (_counters[account] != Counter(0));
        return (_counters[account].getCount());
    }

    function getMyCount() public view returns (uint256) {
        return (getCount(msg.sender));
    }

}
```

Setelah mengompilasi, di bagian penyebaran Remix Anda akan memilih pabrik yang akan disebarkan:

![Memilih pabrik untuk disebarkan di Remix](./counterfactory-deploy.png)

Kemudian, Anda bisa bermain dengan pabrik kontrak Anda dan memeriksa perubahan nilainya. Jika Anda ingin memanggil kontrak pintar dari alamat yang berbeda, Anda perlu mengubah alamat di pilihan Akun pada Remix.
