---
title: Transfer dan persetujuan token ERC-20 dari kontrak pintar Solidity
description: Bangun kontrak pintar DEX yang menangani transfer dan persetujuan token ERC-20 menggunakan Solidity.
author: "jdourlens"
tags: ["kontrak pintar", "token", "solidity", "erc-20"]
skill: intermediate
breadcrumb: Transfer ERC-20
lang: id
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Pada tutorial sebelumnya, kita telah mempelajari [anatomi token ERC-20 di Solidity](/developers/tutorials/understand-the-erc-20-token-smart-contract/) pada rantai blok Ethereum. Dalam artikel ini, kita akan melihat bagaimana kita dapat menggunakan kontrak pintar untuk berinteraksi dengan token menggunakan bahasa Solidity.

Untuk kontrak pintar ini, kita akan membuat bursa terdesentralisasi (DEX) tiruan yang nyata di mana pengguna dapat menukar ether dengan [token ERC-20](/developers/docs/standards/tokens/erc-20/) kita yang baru saja disebarkan.

Untuk tutorial ini, kita akan menggunakan kode yang kita tulis pada tutorial sebelumnya sebagai dasar. DEX kita akan menginisiasi instansiasi kontrak di dalam konstruktornya dan melakukan operasi:

- menukar token menjadi ether
- menukar ether menjadi token

Kita akan memulai kode bursa terdesentralisasi kita dengan menambahkan basis kode ERC20 sederhana kita:

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

Kontrak pintar DEX baru kita akan menyebarkan ERC-20 dan mendapatkan semua pasokan:

```solidity
contract DEX {

    IERC20 public token;

    event Bought(uint256 amount);
    event Sold(uint256 amount);

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        // TODO
    }

    function sell(uint256 amount) public {
        // TODO
    }

}
```

Jadi sekarang kita memiliki DEX kita dan ia memiliki semua cadangan token yang tersedia. Kontrak tersebut memiliki dua fungsi:

- `buy`: Pengguna dapat mengirim ether dan mendapatkan token sebagai gantinya
- `sell`: Pengguna dapat memutuskan untuk mengirim token untuk mendapatkan ether kembali

## Fungsi buy (beli) {#the-buy-function}

Mari kita kodekan fungsi buy. Pertama-tama kita perlu memeriksa jumlah ether yang terkandung dalam pesan dan memverifikasi bahwa kontrak memiliki cukup token dan bahwa pesan tersebut memiliki sejumlah ether di dalamnya. Jika kontrak memiliki cukup token, ia akan mengirimkan sejumlah token kepada pengguna dan memancarkan peristiwa `Bought`.

Perhatikan bahwa jika kita memanggil fungsi require (wajibkan) jika terjadi kesalahan, ether yang dikirim akan langsung dikembalikan (reverted) dan diberikan kembali kepada pengguna.

Agar tetap sederhana, kita hanya menukar 1 token dengan 1 Wei.

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "You need to send some ether");
    require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

Jika pembelian berhasil, kita akan melihat dua peristiwa dalam transaksi: `Transfer` token dan peristiwa `Bought`.

![Two events in the transaction: Transfer and Bought](./transfer-and-bought-events.png)

## Fungsi sell (jual) {#the-sell-function}

Fungsi yang bertanggung jawab untuk penjualan pertama-tama akan mensyaratkan pengguna untuk menyetujui jumlah tersebut dengan memanggil fungsi approve sebelumnya. Menyetujui transfer mengharuskan token ERC20Basic yang diinisiasi oleh DEX dipanggil oleh pengguna. Hal ini dapat dicapai dengan terlebih dahulu memanggil fungsi `token()` dari kontrak DEX untuk mengambil alamat di mana DEX menyebarkan kontrak ERC20Basic yang disebut `token`. Kemudian kita membuat instansiasi dari kontrak tersebut di sesi kita dan memanggil fungsi `approve` miliknya. Setelah itu, kita dapat memanggil fungsi `sell` dari DEX dan menukar token kita kembali menjadi ether. Sebagai contoh, beginilah tampilannya dalam sesi Brownie interaktif:

```python
#### Python di konsol Brownie interaktif...

# menyebarkan DEX
dex = DEX.deploy({'from':account1})

# panggil fungsi buy untuk tukar ether dengan token
# 1e18 adalah 1 ether dalam denominasi Wei
dex.buy({'from': account2, 1e18})

# dapatkan alamat penyebaran untuk token ERC-20
# yang disebarkan selama pembuatan kontrak DEX
# dex.token() mengembalikan alamat yang disebarkan untuk token
token = ERC20Basic.at(dex.token())

# panggil fungsi menyetujui dari token
# menyetujui alamat dex sebagai pembelanja
# dan berapa banyak token Anda yang diizinkan untuk dibelanjakan
token.approve(dex.address, 3e18, {'from':account2})

```

Kemudian ketika fungsi sell dipanggil, kita akan memeriksa apakah transfer dari alamat pemanggil ke alamat kontrak berhasil dan kemudian mengirimkan Ether kembali ke alamat pemanggil.

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "You need to sell at least some tokens");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Check the token allowance");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

Jika semuanya berjalan lancar, Anda akan melihat 2 peristiwa (sebuah `Transfer` dan `Sold`) dalam transaksi dan saldo token serta saldo ether Anda diperbarui.

![Two events in the transaction: Transfer and Sold](./transfer-and-sold-events.png)

<Divider />

Dari tutorial ini kita melihat cara memeriksa saldo dan jatah dari token ERC-20 dan juga cara memanggil `Transfer` dan `TransferFrom` dari kontrak pintar ERC20 menggunakan antarmuka.

Setelah Anda melakukan transaksi, kami memiliki tutorial JavaScript untuk [menunggu dan mendapatkan detail tentang transaksi](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) yang dilakukan pada kontrak Anda dan [tutorial untuk mendekode peristiwa yang dihasilkan oleh transfer token atau peristiwa lainnya](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) selama Anda memiliki ABI.

Berikut adalah kode lengkap untuk tutorial ini:

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


contract DEX {

    event Bought(uint256 amount);
    event Sold(uint256 amount);


    IERC20 public token;

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        uint256 amountTobuy = msg.value;
        uint256 dexBalance = token.balanceOf(address(this));
        require(amountTobuy > 0, "You need to send some ether");
        require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "You need to sell at least some tokens");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Check the token allowance");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```