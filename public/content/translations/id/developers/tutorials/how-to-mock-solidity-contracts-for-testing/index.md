---
title: Cara membuat mock kontrak pintar Solidity untuk pengujian
description: Mengapa Anda harus mengolok-olok kontrak Anda saat pengujian
author: Markus Waas
lang: id
tags: ["Solidity", "kontrak pintar", "pengujian", "mocking"]
skill: intermediate
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[Objek mock](https://wikipedia.org/wiki/Mock_object) adalah pola desain yang umum dalam pemrograman berorientasi objek. Berasal dari kata bahasa Prancis kuno 'mocquer' yang berarti 'mengolok-olok', kata ini berevolusi menjadi 'meniru sesuatu yang nyata' yang sebenarnya merupakan apa yang kita lakukan dalam pemrograman. Silakan mengolok-olok kontrak pintar Anda jika Anda mau, tetapi buatlah mock-nya kapan pun Anda bisa. Hal ini akan membuat hidup Anda lebih mudah.

## Pengujian unit kontrak dengan mock {#unit-testing-contracts-with-mocks}

Membuat mock kontrak pada dasarnya berarti membuat versi kedua dari kontrak tersebut yang berperilaku sangat mirip dengan aslinya, tetapi dengan cara yang dapat dikontrol dengan mudah oleh pengembang. Anda sering kali berakhir dengan kontrak yang kompleks di mana Anda hanya ingin [melakukan pengujian unit pada bagian kecil dari kontrak](/developers/docs/smart-contracts/testing/). Masalahnya adalah bagaimana jika pengujian bagian kecil ini memerlukan status kontrak yang sangat spesifik yang sulit untuk dicapai?

Anda dapat menulis logika penyiapan pengujian yang kompleks setiap kali yang membawa kontrak ke dalam status yang diperlukan atau Anda menulis mock. Membuat mock kontrak itu mudah dengan pewarisan (inheritance). Cukup buat kontrak mock kedua yang mewarisi dari kontrak aslinya. Sekarang Anda dapat menimpa (override) fungsi ke mock Anda. Mari kita lihat dengan sebuah contoh.

## Contoh: ERC20 Privat {#example-private-erc20}

Kita menggunakan contoh kontrak ERC-20 yang memiliki waktu privat awal. Pemilik dapat mengelola pengguna privat dan hanya mereka yang akan diizinkan untuk menerima token pada awalnya. Setelah waktu tertentu berlalu, semua orang akan diizinkan untuk menggunakan token tersebut. Jika Anda penasaran, kita menggunakan hook [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) dari kontrak OpenZeppelin v3 yang baru.

```solidity
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PrivateERC20 is ERC20, Ownable {
    mapping (address => bool) public isPrivateUser;
    uint256 private publicAfterTime;

    constructor(uint256 privateERC20timeInSec) ERC20("PrivateERC20", "PRIV") public {
        publicAfterTime = now + privateERC20timeInSec;
    }

    function addUser(address user) external onlyOwner {
        isPrivateUser[user] = true;
    }

    function isPublic() public view returns (bool) {
        return now >= publicAfterTime;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);

        require(_validRecipient(to), "PrivateERC20: invalid recipient");
    }

    function _validRecipient(address to) private view returns (bool) {
        if (isPublic()) {
            return true;
        }

        return isPrivateUser[to];
    }
}
```

Dan sekarang mari kita buat mock-nya.

```solidity
pragma solidity ^0.6.0;
import "../PrivateERC20.sol";

contract PrivateERC20Mock is PrivateERC20 {
    bool isPublicConfig;

    constructor() public PrivateERC20(0) {}

    function setIsPublic(bool isPublic) external {
        isPublicConfig = isPublic;
    }

    function isPublic() public view returns (bool) {
        return isPublicConfig;
    }
}
```

Anda akan mendapatkan salah satu pesan kesalahan berikut:

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

Karena kita menggunakan versi Solidity 0.6 yang baru, kita harus menambahkan kata kunci `virtual` untuk fungsi yang dapat ditimpa dan override untuk fungsi yang menimpa. Jadi mari kita tambahkan keduanya ke kedua fungsi `isPublic`.

Sekarang dalam pengujian unit Anda, Anda dapat menggunakan `PrivateERC20Mock` sebagai gantinya. Ketika Anda ingin menguji perilaku selama waktu penggunaan privat, gunakan `setIsPublic(false)` dan demikian pula `setIsPublic(true)` untuk menguji waktu penggunaan publik. Tentu saja dalam contoh kita, kita juga bisa menggunakan [pembantu waktu (time helpers)](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) untuk mengubah waktu yang sesuai. Tetapi gagasan tentang pembuatan mock seharusnya sudah jelas sekarang dan Anda dapat membayangkan skenario di mana hal itu tidak semudah sekadar memajukan waktu.

## Membuat mock banyak kontrak {#mocking-many-contracts}

Ini bisa menjadi berantakan jika Anda harus membuat kontrak lain untuk setiap mock. Jika ini mengganggu Anda, Anda dapat melihat pustaka [MockContract](https://github.com/gnosis/mock-contract). Pustaka ini memungkinkan Anda untuk menimpa dan mengubah perilaku kontrak secara langsung (on-the-fly). Namun, ini hanya berfungsi untuk membuat mock panggilan ke kontrak lain, jadi ini tidak akan berfungsi untuk contoh kita.

## Pembuatan mock bisa menjadi lebih kuat {#mocking-can-be-even-more-powerful}

Kekuatan pembuatan mock tidak berakhir di situ.

- Menambahkan fungsi: Tidak hanya menimpa fungsi tertentu yang berguna, tetapi juga sekadar menambahkan fungsi tambahan. Contoh yang baik untuk token adalah memiliki fungsi `mint` tambahan untuk memungkinkan pengguna mana pun mendapatkan token baru secara gratis.
- Penggunaan di testnet: Saat Anda menerapkan dan menguji kontrak Anda di testnet bersama dengan dapp Anda, pertimbangkan untuk menggunakan versi mock. Hindari menimpa fungsi kecuali Anda benar-benar harus melakukannya. Bagaimanapun juga, Anda ingin menguji logika yang sebenarnya. Tetapi menambahkan misalnya fungsi reset bisa berguna yang hanya mengatur ulang status kontrak ke awal, tidak diperlukan penerapan baru. Jelas Anda tidak ingin memiliki itu di kontrak mainnet.