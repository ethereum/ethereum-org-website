---
title: Cara meniru kontrak pintar Solidity untuk pengujian
description: Mengapa Anda harus mengolok-olok kontrak Anda saat pengujian
author: Markus Waas
lang: id
tags: [ "Solidity", "kontrak pintar", "pengujian", "mocking" ]
skill: intermediate
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[Objek tiruan](https://wikipedia.org/wiki/Mock_object) adalah pola desain yang umum dalam pemrograman berorientasi objek. Berasal dari kata Perancis kuno 'mocquer' yang berarti 'mengolok-olok', kata ini berevolusi menjadi 'meniru sesuatu yang nyata' yang sebenarnya adalah apa yang kita lakukan dalam pemrograman. Silakan mengolok-olok kontrak pintar Anda jika Anda ingin, tetapi ejeklah kontrak tersebut kapan pun Anda bisa. Ini membuat hidup Anda lebih mudah.

## Pengujian unit kontrak dengan tiruan {#unit-testing-contracts-with-mocks}

Meniru kontrak pada dasarnya berarti membuat versi kedua dari kontrak tersebut yang berperilaku sangat mirip dengan versi aslinya, tetapi dengan cara yang dapat dengan mudah dikontrol oleh pengembang. Anda sering kali berakhir dengan kontrak yang rumit di mana Anda hanya ingin [menguji unit bagian-bagian kecil dari kontrak](/developers/docs/smart-contracts/testing/). Masalahnya, bagaimana jika pengujian bagian kecil ini memerlukan kondisi kontrak yang sangat spesifik yang sulit untuk diakhiri?

Anda dapat menulis logika pengaturan pengujian yang kompleks setiap kali membawa kontrak dalam keadaan yang diperlukan atau Anda menulis tiruan. Mengejek kontrak itu mudah dengan warisan. Cukup buat kontrak tiruan kedua yang mewarisi kontrak asli. Sekarang, Anda dapat menimpa fungsi ke mock Anda. Mari kita lihat dengan sebuah contoh.

## Contoh: Private ERC20 {#example-private-erc20}

Kami menggunakan contoh kontrak ERC-20 yang memiliki waktu privat awal. Pemilik dapat mengelola pengguna pribadi dan hanya mereka yang akan diizinkan untuk menerima token di awal. Setelah waktu tertentu berlalu, semua orang akan diizinkan untuk menggunakan token. Jika Anda penasaran, kami menggunakan hook [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) dari kontrak OpenZeppelin v3 yang baru.

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

        require(_validRecipient(to), "PrivateERC20: penerima tidak valid");
    }

    function _validRecipient(address to) private view returns (bool) {
        if (isPublic()) {
            return true;
        }

        return isPrivateUser[to];
    }
}
```

Dan sekarang mari kita mengejeknya.

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

Anda akan mendapatkan salah satu pesan kesalahan berikut ini:

- `PrivateERC20Mock.sol: TypeError: Fungsi yang menimpa tidak memiliki penentu "override".`
- `PrivateERC20.sol: TypeError: Mencoba menimpa fungsi non-virtual.` Apakah Anda lupa menambahkan "virtual"?.\`

Karena kami menggunakan versi Solidity 0.6 yang baru, kami harus menambahkan kata kunci `virtual` untuk fungsi yang dapat ditimpa dan override untuk fungsi yang menimpa. Jadi, mari kita tambahkan itu ke kedua fungsi `isPublic`.

Sekarang dalam pengujian unit Anda, Anda dapat menggunakan `PrivateERC20Mock` sebagai gantinya. Saat Anda ingin menguji perilaku selama waktu penggunaan privat, gunakan `setIsPublic(false)` dan juga `setIsPublic(true)` untuk menguji waktu penggunaan publik. Tentu saja, dalam contoh kami, kami juga bisa menggunakan [pembantu waktu](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) untuk mengubah waktu yang sesuai. Tetapi, ide mengejek seharusnya sudah jelas sekarang, dan Anda bisa membayangkan skenario di mana hal itu tidak semudah memajukan waktu.

## Meniru banyak kontrak {#mocking-many-contracts}

Hal ini dapat menjadi berantakan jika Anda harus membuat kontrak lain untuk setiap tiruan. Jika ini mengganggu Anda, Anda bisa melihat pustaka [MockContract](https://github.com/gnosis/mock-contract). Ini memungkinkan Anda untuk mengesampingkan dan mengubah perilaku kontrak dengan cepat. Namun, ini hanya berfungsi untuk panggilan tiruan ke kontrak lain, jadi tidak akan berfungsi untuk contoh kita.

## Peniruan bisa menjadi lebih ampuh {#mocking-can-be-even-more-powerful}

Kekuatan mengejek tidak berhenti sampai di situ.

- Menambahkan fungsi: Tidak hanya mengesampingkan fungsi tertentu saja yang berguna, tetapi juga menambahkan fungsi tambahan. Contoh yang baik untuk token adalah dengan memiliki fungsi `mint` tambahan untuk memungkinkan setiap pengguna mendapatkan token baru secara gratis.
- Penggunaan di testnet: Ketika Anda menerapkan dan menguji kontrak Anda di testnet bersama dengan dapp Anda, pertimbangkan untuk menggunakan versi tiruan. Hindari mengesampingkan fungsi kecuali jika Anda benar-benar harus melakukannya. Anda ingin menguji logika yang sebenarnya. Tetapi menambahkan, misalnya, fungsi reset dapat berguna untuk mengatur ulang status kontrak ke awal, tanpa perlu penerapan baru. Tentu saja Anda tidak ingin memiliki hal itu dalam kontrak Mainnet ( Jaringan Utama ) .
