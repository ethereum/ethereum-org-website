---
title: Berinteraksi dengan kontrak lain dari Solidity
description: Cara menerapkan kontrak pintar dari kontrak yang sudah ada dan berinteraksi dengannya
author: "jdourlens"
tags: ["kontrak pintar", "Solidity", "Remix", "menerapkan", "komposabilitas"]
skill: advanced
breadcrumb: "Interaksi kontrak"
lang: id
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Pada tutorial sebelumnya kita telah banyak belajar [cara menerapkan kontrak pintar pertama Anda](/developers/tutorials/deploying-your-first-smart-contract/) dan menambahkan beberapa fitur ke dalamnya seperti [mengontrol akses dengan pengubah (modifier)](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) atau [penanganan kesalahan di Solidity](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/). Pada tutorial ini kita akan belajar cara menerapkan kontrak pintar dari kontrak yang sudah ada dan berinteraksi dengannya.

Kita akan membuat kontrak yang memungkinkan siapa saja untuk memiliki kontrak pintar `Counter` mereka sendiri dengan membuat pabrik (factory) untuknya, namanya adalah `CounterFactory`. Pertama, berikut adalah kode dari kontrak pintar `Counter` awal kita:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "You're not the owner of the contract");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "You need to use the factory");
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

Perhatikan bahwa kita sedikit memodifikasi kode kontrak untuk melacak alamat pabrik dan alamat pemilik kontrak. Saat Anda memanggil kode kontrak dari kontrak lain, msg.sender akan merujuk ke alamat pabrik kontrak kita. Ini adalah **poin yang sangat penting untuk dipahami** karena menggunakan kontrak untuk berinteraksi dengan kontrak lain adalah praktik yang umum. Oleh karena itu, Anda harus memperhatikan siapa pengirimnya dalam kasus-kasus yang kompleks.

Untuk ini kita juga menambahkan pengubah `onlyFactory` yang memastikan bahwa fungsi pengubah status hanya dapat dipanggil oleh pabrik yang akan meneruskan pemanggil asli sebagai parameter.

Di dalam `CounterFactory` baru kita yang akan mengelola semua Counter lainnya, kita akan menambahkan pemetaan (mapping) yang akan mengaitkan pemilik dengan alamat kontrak counter-nya:

```solidity
mapping(address => Counter) _counters;
```

Di Ethereum, pemetaan setara dengan objek dalam javascript, mereka memungkinkan untuk memetakan kunci tipe A ke nilai tipe B. Dalam hal ini kita memetakan alamat pemilik dengan instansiasi Counter-nya.

Menginstansiasi Counter baru untuk seseorang akan terlihat seperti ini:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Kita pertama-tama memeriksa apakah orang tersebut sudah memiliki counter. Jika dia belum memiliki counter, kita menginstansiasi counter baru dengan meneruskan alamatnya ke konstruktor `Counter` dan menetapkan instansiasi yang baru dibuat ke pemetaan.

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

Fungsi pertama memeriksa apakah kontrak Counter ada untuk alamat yang diberikan dan kemudian memanggil metode `getCount` dari instansiasi tersebut. Fungsi kedua: `getMyCount` hanyalah jalan pintas untuk meneruskan msg.sender secara langsung ke fungsi `getCount`.

Fungsi `increment` cukup mirip tetapi meneruskan pengirim transaksi asli ke kontrak `Counter`:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

Perhatikan bahwa jika dipanggil terlalu sering, counter kita mungkin bisa menjadi korban overflow. Anda harus menggunakan [pustaka SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) sebanyak mungkin untuk melindungi dari kemungkinan kasus ini.

Untuk menerapkan kontrak kita, Anda perlu menyediakan kode `CounterFactory` dan `Counter`. Saat menerapkan misalnya di Remix, Anda harus memilih CounterFactory.

Berikut adalah kode lengkapnya:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "You're not the owner of the contract");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "You need to use the factory");
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

Setelah mengompilasi, di bagian penerapan Remix Anda akan memilih pabrik yang akan diterapkan:

![Memilih pabrik yang akan diterapkan di Remix](./counterfactory-deploy.png)

Kemudian Anda dapat bermain dengan pabrik kontrak Anda dan memeriksa perubahan nilainya. Jika Anda ingin memanggil kontrak pintar dari alamat yang berbeda, Anda perlu mengubah alamat di pilihan Akun (Account) pada Remix.