---
title: Berinteraksi dengan kontrak lain dari Solidity
description: Cara menggunakan kontrak pintar dari kontrak yang sudah ada dan berinteraksi dengan kontrak pintar tersebut
author: "jdourlens"
tags:
  - "kontrak pintar"
  - "solidity"
  - "remix"
  - "pabrik"
  - "menyebarkan"
  - "komposabilitas"
skill: advanced
lang: id
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Dalam tutorial sebelumnya, kita belajar banyak [cara menggunakan kontrak pintar pertama Anda](/developers/tutorials/deploying-your-first-smart-contract/) dan menambahkan beberapa fitur ke dalamnya seperti [mengontrol akses dengan pengubah](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) atau [penanganan kesalahan di Solidity](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/). Dalam tutorial ini kita akan mempelajari cara menggunakan kontrak pintar dari kontrak yang ada dan berinteraksi dengannya.

Kita akan membuat kontrak yang memungkinkan siapa pun untuk memiliki kontrak pintar `Counter` sendiri dengan membuat pabrik untuknya, namanya adalah `CounterFactory`. Pertama, ini adalah kode kontrak pintar `Counter` awal kami:

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

Perhatikan bahwa kami sedikit memodifikasi kode kontrak untuk melacak alamat pabrik dan alamat pemilik kontrak. Saat Anda memanggil kode kontrak dari kontrak lain, msg.sender akan merujuk ke alamat pabrik kontrak kami. Ini **poin yang sangat penting untuk dipahami** karena menggunakan kontrak untuk berinteraksi dengan kontrak lain adalah praktik umum. Karena itu, Anda harus memperhatikan siapa pengirimnya dalam kasus yang rumit.

Untuk ini kami juga menambahkan pengubah `onlyFactory` yang memastikan bahwa fungsi perubahan status hanya dapat dipanggil oleh pabrik yang akan meneruskan fungsi ke pemanggil asli sebagai parameter.

Di dalam `CounterFactory` baru kami yang akan mengelola semua Penghitung lainnya, kami akan menambahkan pemetaan yang akan mengaitkan pemilik ke alamat kontrak penghitungnya:

```solidity
mapping(address => Counter) _counters;
```

Di Ethereum, pemetaan sama dengan objek dalam javascript, yang memungkinkan untuk memetakan kunci jenis A ke nilai jenis B. Dalam hal ini, kami memetakan alamat pemilik dengan instance Penghitungnya.

Membuat instance Penghitung baru untuk seseorang akan terlihat seperti ini:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Pertama-tama kami memeriksa apakah orang tersebut sudah memiliki penghitung. Jika dia tidak memiliki penghitung, kami membuat instance penghitung baru dengan meneruskan alamatnya ke pembangun `Counter` dan menetapkan instance yang baru dibuat ke pemetaan.

Untuk mendapatkan hitungan Penghitung tertentu akan terlihat seperti ini:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

Fungsi pertama memeriksa apakah kontrak Penghitung ada untuk alamat tertentu lalu memanggil metode `getCount` dari instance. Fungsi kedua: `getMyCount` hanyalah akhir singkat untuk meneruskan msg.sender langsung ke fungsi `getCount`.

Fungsi `increment` cukup mirip tetapi meneruskan pengirim transaksi asli ke kontrak `Counter`:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

Perhatikan bahwa jika dipanggil berulang kali, penghitung kami mungkin bisa menjadi korban dari overflow. Anda harus menggunakan [pustaka SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) sesering mungkin agar terhindar dari kasus yang mungkin terjadi ini.

Untuk menggunakan kontrak kami, Anda perlu menyediakan kode `CounterFactory` dan `Counter`. Saat menggunakan, misalnya di Remix, Anda perlu memilih CounterFactory.

Berikut kode lengkapnya:

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

Setelah mengompilasi, di bagian penggunaan Remix, Anda akan memilih pabrik yang akan digunakan:

![Memilih pabrik yang akan digunakan di Remix](./counterfactory-deploy.png)

Kemudian, Anda bisa bermain dengan pabrik kontrak Anda dan memeriksa perubahan nilainya. Jika Anda ingin memangil kontrak pintar dari alamat lain, Anda perlu mengubah alamat di Akun Remix tertentu.
