---
title: Memahami kontrak pintar token ERC-20
description: Pengantar untuk menggunakan kontrak pintar pertama Anda di jaringan percobaan Ethereum
author: "jdourlens"
tags:
  - "kontrak pintar"
  - "token"
  - "solidity"
  - "memulai"
  - "erc-20"
skill: beginner
lang: id
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Salah satu [standar kontrak pintar](/developers/docs/standards/) yang paling penting di Ethereum dikenal sebagai [ERC-20](/developers/docs/standards/tokens/erc-20/), yang muncul sebagai standar teknis yang digunakan oleh semua kontrak pintar di blockchain Ethereum untuk implementasi token yang dapat dipertukarkan.

ERC-20 menentukan daftar aturan umum yang harus dipatuhi oleh semua token Ethereum yang dapat dipertukarkan. Konsekuensinya, standar token ini memberdayakan pengembang dari semua golongan untuk memperkirakan secara akurat bagaimana token baru akan berfungsi dalam sistem Ethereum yang lebih besar. Ini menyederhanakan dan mempermudah tugas para pengembang, karena mereka bisa meneruskan pekerjaan, mengetahui bahwa tiap proyek baru tidak akan perlu dikerjakan ulang setiap kali token baru dirilis, asalkan token yang ada mengikuti aturan.

Berikut adalah, yang ditampilkan sebagai antarmuka, fungsi yang harus diimplementasikan ERC-20. Jika Anda tidak yakin tentang apa itu antarmuka: lihat artikel kami tentang [Pemrograman OOP di Solidity](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/).

```solidity
pragma solidity ^0.6.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Berikut adalah penjelasan baris per baris dari peran setiap fungsi. Setelah ini, kita akan mempresentasikan implementasi sederhana dari token ERC-20.

## Getter {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

Mengembalikan jumlah token yang ada. Fungsi ini adalah pengambil dan tidak memodifikasi state kontrak. Ingatlah bahwa tidak ada float dalam Solidity. Oleh karena itu, kebanyakan token mengadopsi 18 desimal dan akan mengembalikan pasokan total dan hasil lainnya sebagai berikut 1000000000000000000 untuk 1 token. Tidak semua token memiliki 18 desimal dan ini adalah sesuatu yang perlu Anda perhatikan saat menangani token.

```solidity
function balanceOf(address account) external view returns (uint256);
```

Mengembalikan jumlah token yang dimiliki oleh satu alamat (`account`). Fungsi ini adalah pengambil dan tidak memodifikasi state kontrak.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

Standar ERC-20 memungkinkan alamat memberi izin ke alamat lain agar bisa mengambil token darinya. Pemanggil ini mengembalikan jumlah token tersisa yang akan dizinkan untuk dipakai oleh `spender` atas nama `owner`. Fungsi ini adalah pemanggil dan tidak memodifikasi state kontrak dan akan mengembalikan 0 secara default.

## Fungsi {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

Memindahkan `amount` token dari alamat pemanggil fungsi (`msg.sender`) ke alamat penerima. Fungsi ini memancarkan aksi `Transfer` yang ditentukan nanti. Akan mengembalikan nilai true jika transfer memungkinkan.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

Tetapkan jumlah `allowance` yang diizinkan untuk ditransfer oleh `spender` dari saldo pemanggil fungsi (`msg.sender`). Fungsi ini memancarkan aksi Persetujuan. Fungsi ini mengembalikan informasi apakah allowancenya berhasil ditetapkan.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Memindahkan `amount` token dari `sender` ke `recipient` menggunakan mekanisme allowance. jumlah kemudian dikurangi dari allowance pemanggil. Fungsi ini memancarkan aksi `Transfer`.

## Aksi {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Aksi ini dipancarkan saat jumlah token (nilai) dikirim dari alamat `from` ke alamat `to`.

In the case of minting new tokens, the transfer is usually `from` the 0x00..0000 address while in the case of burning tokens the transfer is `to` 0x00..0000.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

Aksi ini dipancarkan saat jumlah token (`value`) disetujui oleh `owner` untuk digunakan oleh `spender`.

## Implementasi sederhana token ERC-20 {#a-basic-implementation-of-erc-20-tokens}

Berikut adalah kode paling sederhana sebagai dasar token ERC-20 Anda:

```solidity
pragma solidity ^0.8.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract ERC20Basic is IERC20 {

    string public constant name = "ERC20Basic";
    string public constant symbol = "ERC";
    uint8 public constant decimals = 18;


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;

    uint256 totalSupply_ = 10 ether;


   constructor() {
    balances[msg.sender] = totalSupply_;
    }

    function totalSupply() public override view returns (uint256) {
    return totalSupply_;
    }

    function balanceOf(address tokenOwner) public override view returns (uint256) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender]-numTokens;
        balances[receiver] = balances[receiver]+numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    function approve(address delegate, uint256 numTokens) public override returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function allowance(address owner, address delegate) public override view returns (uint) {
        return allowed[owner][delegate];
    }

    function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);

        balances[owner] = balances[owner]-numTokens;
        allowed[owner][msg.sender] = allowed[owner][msg.sender]-numTokens;
        balances[buyer] = balances[buyer]+numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}
```

Implementasi standar token ERC-20 luar biasa lainnya adalah [implementasi OpenZeppelin ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
