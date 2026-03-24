---
title: Memahami kontrak pintar token ERC-20
description: Pelajari cara mengimplementasikan standar token ERC-20 dengan contoh dan penjelasan kontrak pintar Solidity yang lengkap.
author: "jdourlens"
tags: ["kontrak pintar", "token", "Solidity", "erc-20"]
skill: beginner
breadcrumb: "Dasar token ERC-20"
lang: id
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Salah satu [standar kontrak pintar](/developers/docs/standards/) paling signifikan di Ethereum dikenal sebagai [ERC-20](/developers/docs/standards/tokens/erc-20/), yang telah muncul sebagai standar teknis yang digunakan untuk semua kontrak pintar di blockchain Ethereum untuk implementasi token yang sepadan (fungible).

ERC-20 mendefinisikan daftar aturan umum yang harus dipatuhi oleh semua token Ethereum yang sepadan. Akibatnya, standar token ini memberdayakan semua jenis pengembang untuk memprediksi secara akurat bagaimana token baru akan berfungsi di dalam sistem Ethereum yang lebih besar. Hal ini menyederhanakan dan memudahkan tugas pengembang, karena mereka dapat melanjutkan pekerjaan mereka, dengan mengetahui bahwa setiap proyek baru tidak perlu dikerjakan ulang setiap kali token baru dirilis, selama token tersebut mengikuti aturan.

Berikut ini, disajikan sebagai antarmuka (interface), fungsi-fungsi yang harus diimplementasikan oleh ERC-20. Jika Anda tidak yakin tentang apa itu antarmuka: periksa artikel kami tentang [pemrograman OOP di Solidity](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/).

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

Berikut adalah penjelasan baris demi baris tentang fungsi dari setiap fungsi tersebut. Setelah ini kami akan menyajikan implementasi sederhana dari token ERC-20.

## Getter {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

Mengembalikan jumlah token yang ada. Fungsi ini adalah sebuah getter dan tidak memodifikasi status kontrak. Perlu diingat bahwa tidak ada tipe data float di Solidity. Oleh karena itu, sebagian besar token mengadopsi 18 desimal dan akan mengembalikan total pasokan dan hasil lainnya sebagai berikut 1000000000000000000 untuk 1 token. Tidak setiap token memiliki 18 desimal dan ini adalah sesuatu yang benar-benar perlu Anda perhatikan ketika berurusan dengan token.

```solidity
function balanceOf(address account) external view returns (uint256);
```

Mengembalikan jumlah token yang dimiliki oleh sebuah alamat (`account`). Fungsi ini adalah sebuah getter dan tidak memodifikasi status kontrak.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

Standar ERC-20 memungkinkan sebuah alamat untuk memberikan jatah (allowance) kepada alamat lain agar dapat mengambil token darinya. Getter ini mengembalikan sisa jumlah token yang diizinkan untuk dihabiskan oleh `spender` atas nama `owner`. Fungsi ini adalah sebuah getter dan tidak memodifikasi status kontrak dan seharusnya mengembalikan nilai 0 secara bawaan.

## Fungsi {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

Memindahkan sejumlah `amount` token dari alamat pemanggil fungsi (`msg.sender`) ke alamat penerima. Fungsi ini memancarkan (emit) event `Transfer` yang didefinisikan nanti. Fungsi ini mengembalikan nilai true jika transfer memungkinkan.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

Menetapkan jumlah `allowance` yang diizinkan untuk ditransfer oleh `spender` dari saldo pemanggil fungsi (`msg.sender`). Fungsi ini memancarkan event Approval. Fungsi ini mengembalikan nilai apakah jatah tersebut berhasil ditetapkan.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Memindahkan sejumlah `amount` token dari `sender` ke `recipient` menggunakan mekanisme jatah (allowance). Jumlah tersebut kemudian dikurangi dari jatah pemanggil. Fungsi ini memancarkan event `Transfer`.

## Event {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Event ini dipancarkan ketika sejumlah token (value) dikirim dari alamat `from` ke alamat `to`.

Dalam kasus melakukan mint token baru, transfer biasanya `from` (dari) alamat 0x00..0000 sedangkan dalam kasus membakar token, transfernya adalah `to` (ke) 0x00..0000.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

Event ini dipancarkan ketika sejumlah token (`value`) disetujui oleh `owner` untuk digunakan oleh `spender`.

## Implementasi dasar token ERC-20 {#a-basic-implementation-of-erc-20-tokens}

Berikut adalah kode paling sederhana untuk menjadi dasar token ERC-20 Anda:

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

Implementasi standar token ERC-20 lain yang sangat baik adalah [implementasi ERC-20 OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).