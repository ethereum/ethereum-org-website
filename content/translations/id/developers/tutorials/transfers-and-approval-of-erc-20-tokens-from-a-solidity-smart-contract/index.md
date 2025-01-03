---
title: Transfer dan persetujuan token ERC-20 dari kontrak pintar solidity
description: Cara menggunakan kontrak pintar untuk berinteraksi dengan token menggunakan bahasa Solidity
author: "jdourlens"
tags:
  - "kontrak pintar"
  - "token"
  - "solidity"
  - "memulai"
  - "erc-20"
skill: intermediate
lang: id
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Dalam tutorial sebelumnya, kita mempelajari [anatomi token ERC-20 dalam Solidity](/developers/tutorials/understand-the-erc-20-token-smart-contract/) di blockchain Ethereum. Dalam artikel ini, kita akan melihat cara menggunakan kontrak pintar untuk berinteraksi dengan token menggunakan bahasa Solidity.

Untuk kontrak pintar ini, kita akan membuat bursa terdesentralisasi yang sangat mirip di mana pengguna bisa memperdagangkan Ethereum dengan [token ERC-20](/developers/docs/standards/tokens/erc-20/) kami yang baru digunakan.

Untuk tutorial ini, kami akan menggunakan kode yang kami tulis dalam tutorial sebelumnya sebagai dasarnya. DEX kami akan membuat instance kontrak dalam pembangunnya dan melakukan operasi:

- penukaran token ke ether
- penukaran ether ke token

Kita akan memulai kode bursa Terdesentralisasi kita dengan menambahkan basis kode ERC20 sederhana kita:

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

Kontrak pintar DEX kita akan menggunakan ERC-20 dan mendapatkan semua pasokan:

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

Jadi sekarang kita memiliki DEX dan memiliki semua cadangan token yang tersedia. Kontrak memiliki dua fungsi:

- `buy`: Penggunan bisa mengirim ether dan mendapat token sebagai gantinya
- `sell`: Pengguna bisa memutuskan mengirim token untuk mendapatkan ether kembali

## Fungsi pembelian {#the-buy-function}

Mari kodekan fungsi pembelian. Terlebih dahulu kita akan memeriksa jumlah ether yang dimiliki message dan memverifikasi apakah kontrak memiliki cukup token dan apakah messagenya memliki beberapa ether di dalamnya. Jika kontrak memiliki cukup token, kontrak akan mengirim sejumlah token ke pengguna dan memancarkan aksi `Bought`.

Perhatikan bahwa jika kita memanggil fungsi yang diperlukan saat terjadi kesalahan, ether yang dikirimkan akan secara langsung dibalikkan dan diberikan kembali ke pengguna.

To keep things simple, we just exchange 1 token for 1 Wei.

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

Jika pembelian berhasil, kita akan melihat dua aksi dalam transaksi: `Transfer` token dan aksi `Bought`.

![Dua aksi dalam transaksi: Transfer dan Bought](./transfer-and-bought-events.png)

## Fungsi penjualan {#the-sell-function}

Fungsi yang bertanggungjawab untuk penjualan ini pertama-tama akan mengharuskan pengguna menyetujui jumlahnya dengan memanggil fungsi yang disetujui sebelumnya. Approving the transfer requires the ERC20Basic token instantiated by the DEX to be called by the user. This can be achieved by first calling the DEX contract's `token()` function to retrieve the address where DEX deployed the ERC20Basic contract called `token`. Then we create an instance of that contract in our session and call its `approve` function. Then we are able to call the DEX's `sell` function and swap our tokens back for ether. For example, this is how this looks in an interactive brownie session:

```python
#### Python in interactive brownie console...

# deploy the DEX
dex = DEX.deploy({'from':account1})

# call the buy function to swap ether for token
# 1e18 is 1 ether denominated in wei
dex.buy({'from': account2, 1e18})

# get the deployment address for the ERC20 token
# that was deployed during DEX contract creation
# dex.token() returns the deployed address for token
token = ERC20Basic.at(dex.token())

# call the token's approve function
# approve the dex address as spender
# and how many of your tokens it is allowed to spend
token.approve(dex.address, 3e18, {'from':account2})

```

Lalu saat fungsi penjualan dipanggil, kita akan memeriksa apakah transfer dari alamat pemanggil ke alamat kontrak berhasil dan kemudian mengirim Ether kembali ke alamat pemanggil.

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

Jika semuanya berfungsi dengan baik, Anda akan melihat 2 aksi (`Transfer` dan `Sold`) dalam transaksi serta saldo token dan Ethereum Anda diperbarui.

![Dua aksi dalam transaksi: Transfer dan Sold](./transfer-and-sold-events.png)

<Divider />

Dari tutorial ini, kita melihat cara memeriksa saldo dan allowance token ERC-20 dan juga cara memanggil `Transfer` dan `TransferFrom` dari kontrak pintar ERC20 yang menggunakan antarmukanya.

Once you make a transaction we have a JavaScript tutorial to [wait and get details about the transactions](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) that were made to your contract and a [tutorial to decode events generated by token transfers or any other events](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) as long as you have the ABI.

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
