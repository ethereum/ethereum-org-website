---
title: Transfer dan persetujuan token ERC-20 dari kontrak pintar solidity
description: Bangun kontrak pintar DEX yang menangani transfer dan persetujuan token ERC-20 menggunakan Solidity.
author: "jdourlens"
tags: [ "kontrak pintar", "token", "Solidity", "erc-20" ]
skill: intermediate
lang: id
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Dalam tutorial sebelumnya kita mempelajari [anatomi token ERC-20 dalam Solidity](/developers/tutorials/understand-the-erc-20-token-smart-contract/) di blockchain Ethereum. Dalam artikel ini, kita akan melihat cara menggunakan kontrak pintar untuk berinteraksi dengan token menggunakan bahasa Solidity.

Untuk kontrak pintar ini, kita akan membuat contoh bursa terdesentralisasi di mana pengguna dapat menukarkan ether dengan [token ERC-20](/developers/docs/standards/tokens/erc-20/) kita yang baru di-deploy.

Untuk tutorial ini, kita akan menggunakan kode yang kita tulis di tutorial sebelumnya sebagai dasar. DEX kita akan menginstansiasi kontrak di konstruktornya dan melakukan operasi:

- menukarkan token dengan ether
- menukarkan ether dengan token

Kita akan memulai kode Bursa Terdesentralisasi kita dengan menambahkan basis kode ERC20 sederhana kita:

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

Kontrak pintar DEX baru kita akan men-deploy ERC-20 dan mendapatkan semua pasokan:

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

Jadi sekarang kita memiliki DEX dan memiliki semua cadangan token yang tersedia. Kontrak ini memiliki dua fungsi:

- `buy`: Pengguna dapat mengirim ether dan mendapatkan token sebagai gantinya
- `sell`: Pengguna dapat memutuskan untuk mengirim token untuk mendapatkan kembali ether

## Fungsi beli {#the-buy-function}

Mari kita buat kode fungsi `buy`. Pertama, kita perlu memeriksa jumlah ether yang ada di dalam pesan, lalu memverifikasi bahwa kontrak memiliki cukup token dan bahwa pesan tersebut berisi sejumlah ether. Jika kontrak memiliki token yang cukup, ia akan mengirimkan sejumlah token kepada pengguna dan memancarkan aksi `Bought`.

Perhatikan bahwa jika kita memanggil fungsi `require` jika terjadi galat, ether yang dikirim akan langsung dikembalikan dan diberikan kembali kepada pengguna.

Untuk menyederhanakannya, kita hanya menukar 1 token dengan 1 Wei.

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "Anda perlu mengirim sejumlah ether");
    require(amountTobuy <= dexBalance, "Token di cadangan tidak cukup");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

Jika pembelian berhasil, kita akan melihat dua aksi dalam transaksi: `Transfer` token dan aksi `Bought`.

![Dua aksi dalam transaksi: Transfer dan Bought](./transfer-and-bought-events.png)

## Fungsi jual {#the-sell-function}

Fungsi yang bertanggung jawab untuk penjualan pertama-tama akan mengharuskan pengguna untuk menyetujui jumlahnya dengan memanggil fungsi `approve` sebelumnya. Menyetujui transfer memerlukan token ERC20Basic yang di-instansiasi oleh DEX untuk dipanggil oleh pengguna. Ini dapat dicapai dengan terlebih dahulu memanggil fungsi `token()` dari kontrak DEX untuk mengambil alamat tempat DEX men-deploy kontrak ERC20Basic yang disebut `token`. Kemudian kita membuat instans dari kontrak tersebut dalam sesi kita dan memanggil fungsi `approve`-nya. Kemudian kita dapat memanggil fungsi `sell` DEX dan menukar kembali token kita dengan ether. Sebagai contoh, beginilah tampilannya dalam sesi interaktif Brownie:

```python
#### Python di konsol interaktif brownie...

# men-deploy DEX
dex = DEX.deploy({'from':account1})

# panggil fungsi buy untuk menukar ether dengan token
# 1e18 adalah 1 ether dalam satuan wei
dex.buy({'from': account2, 1e18})

# dapatkan alamat deploy untuk token ERC20
# yang di-deploy selama pembuatan kontrak DEX
# dex.token() mengembalikan alamat deploy untuk token
token = ERC20Basic.at(dex.token())

# panggil fungsi approve token
# setujui alamat dex sebagai spender
# dan berapa banyak token Anda yang boleh dibelanjakan
token.approve(dex.address, 3e18, {'from':account2})

```

Kemudian saat fungsi `sell` dipanggil, kita akan memeriksa apakah transfer dari alamat pemanggil ke alamat kontrak berhasil, lalu mengirim Ether kembali ke alamat pemanggil.

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "Anda perlu menjual setidaknya beberapa token");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Periksa izin token");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

Jika semuanya berfungsi, Anda akan melihat 2 aksi (`Transfer` dan `Sold`) dalam transaksi, dan saldo token serta saldo ether Anda akan diperbarui.

![Dua aksi dalam transaksi: Transfer dan Sold](./transfer-and-sold-events.png)

<Divider />

Dari tutorial ini kita melihat cara memeriksa saldo dan izin dari token ERC-20 dan juga cara memanggil `Transfer` dan `TransferFrom` dari sebuah kontrak pintar ERC20 menggunakan antarmukanya.

Setelah Anda melakukan transaksi, kami memiliki tutorial JavaScript untuk [menunggu dan mendapatkan rincian tentang transaksi](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) yang dibuat untuk kontrak Anda dan [tutorial untuk mendekode aksi yang dihasilkan oleh transfer token atau aksi lainnya](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) selama Anda memiliki ABI.

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
        require(amountTobuy > 0, "Anda perlu mengirim sejumlah ether");
        require(amountTobuy <= dexBalance, "Token di cadangan tidak cukup");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "Anda perlu menjual setidaknya beberapa token");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Periksa izin token");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```
