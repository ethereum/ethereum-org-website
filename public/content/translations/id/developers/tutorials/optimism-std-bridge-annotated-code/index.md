---
title: "Panduan kontrak jembatan standar Optimism"
description: Bagaimana cara kerja jembatan standar untuk Optimism? Mengapa ia bekerja dengan cara ini?
author: Ori Pomerantz
tags: ["Solidity", "jembatan", "layer 2"]
skill: intermediate
breadcrumb: "Bridge Optimism"
published: 2022-03-30
lang: id
---

[Optimism](https://www.optimism.io/) adalah sebuah [Optimistic Rollup](/developers/docs/scaling/optimistic-rollups/).
Optimistic rollup dapat memproses transaksi dengan harga yang jauh lebih rendah daripada Mainnet Ethereum (juga dikenal sebagai layer 1 atau L1) karena transaksi hanya diproses oleh beberapa node, bukan setiap node di jaringan.
Pada saat yang sama, semua data ditulis ke L1 sehingga semuanya dapat dibuktikan dan direkonstruksi dengan semua jaminan integritas dan ketersediaan dari Mainnet.

Untuk menggunakan aset L1 di Optimism (atau L2 lainnya), aset tersebut perlu dihubungkan melalui [jembatan](/bridges/#prerequisites).
Salah satu cara untuk mencapai ini adalah pengguna mengunci aset (ETH dan [token ERC-20](/developers/docs/standards/tokens/erc-20/) adalah yang paling umum) di L1, dan menerima aset yang setara untuk digunakan di L2.
Pada akhirnya, siapa pun yang memilikinya mungkin ingin menghubungkannya kembali ke L1 melalui jembatan.
Saat melakukan ini, aset dibakar di L2 dan kemudian dilepaskan kembali ke pengguna di L1.

Inilah cara kerja [jembatan standar Optimism](https://docs.optimism.io/app-developers/bridging/standard-bridge).
Dalam artikel ini kita akan membahas kode sumber untuk jembatan tersebut untuk melihat bagaimana cara kerjanya dan mempelajarinya sebagai contoh kode Solidity yang ditulis dengan baik.

## Alur kontrol {#control-flows}

Jembatan ini memiliki dua alur utama:

- Deposit (dari L1 ke L2)
- Penarikan (dari L2 ke L1)

### Alur deposit {#deposit-flow}

#### Layer 1 {#deposit-flow-layer-1}

1. Jika mendepositokan ERC-20, pendeposit memberikan jembatan izin (allowance) untuk membelanjakan jumlah yang didepositokan
2. Pendeposit memanggil jembatan L1 (`depositERC20`, `depositERC20To`, `depositETH`, atau `depositETHTo`)
3. Jembatan L1 mengambil alih kepemilikan aset yang dijembatani
   - ETH: Aset ditransfer oleh pendeposit sebagai bagian dari pemanggilan
   - ERC-20: Aset ditransfer oleh jembatan ke dirinya sendiri menggunakan izin yang diberikan oleh pendeposit
4. Jembatan L1 menggunakan mekanisme pesan lintas domain untuk memanggil `finalizeDeposit` pada jembatan L2

#### Layer 2 {#deposit-flow-layer-2}

5. Jembatan L2 memverifikasi bahwa pemanggilan ke `finalizeDeposit` adalah sah:
   - Berasal dari kontrak pesan lintas domain
   - Awalnya berasal dari jembatan di L1
6. Jembatan L2 memeriksa apakah kontrak token ERC-20 di L2 adalah yang benar:
   - Kontrak L2 melaporkan bahwa pasangannya di L1 sama dengan asal token di L1
   - Kontrak L2 melaporkan bahwa ia mendukung antarmuka yang benar ([menggunakan ERC-165](https://eips.ethereum.org/EIPS/eip-165)).
7. Jika kontrak L2 adalah yang benar, panggil kontrak tersebut untuk melakukan mint jumlah token yang sesuai ke alamat yang sesuai. Jika tidak, mulai proses penarikan untuk memungkinkan pengguna mengklaim token di L1.

### Alur penarikan {#withdrawal-flow}

#### Layer 2 {#withdrawal-flow-layer-2}

1. Penarik memanggil jembatan L2 (`withdraw` atau `withdrawTo`)
2. Jembatan L2 membakar jumlah token yang sesuai milik `msg.sender`
3. Jembatan L2 menggunakan mekanisme pesan lintas domain untuk memanggil `finalizeETHWithdrawal` atau `finalizeERC20Withdrawal` pada jembatan L1

#### Layer 1 {#withdrawal-flow-layer-1}

4. Jembatan L1 memverifikasi bahwa pemanggilan ke `finalizeETHWithdrawal` atau `finalizeERC20Withdrawal` adalah sah:
   - Berasal dari mekanisme pesan lintas domain
   - Awalnya berasal dari jembatan di L2
5. Jembatan L1 mentransfer aset yang sesuai (ETH atau ERC-20) ke alamat yang sesuai

## Kode Layer 1 {#layer-1-code}

Ini adalah kode yang berjalan di L1, Mainnet Ethereum.

### IL1ERC20Bridge {#IL1ERC20Bridge}

[Antarmuka ini didefinisikan di sini](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
Ini mencakup fungsi dan definisi yang diperlukan untuk menjembatani token ERC-20.

```solidity
// SPDX-License-Identifier: MIT // SPDX-License-Identifier: MIT
```

[Sebagian besar kode Optimism dirilis di bawah lisensi MIT](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

Saat penulisan, versi terbaru Solidity adalah 0.8.12.
Hingga versi 0.9.0 dirilis, kita tidak tahu apakah kode ini kompatibel dengannya atau tidak.

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /* *********
     * Event *
     ********* */
    /**********
     * Events *
     **********/

    event ERC20DepositInitiated(
```

Dalam terminologi jembatan Optimism, _deposit_ berarti transfer dari L1 ke L2, dan _withdrawal_ (penarikan) berarti transfer dari L2 ke L1.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

Dalam kebanyakan kasus, alamat ERC-20 di L1 tidak sama dengan alamat ERC-20 yang setara di L2.
[Anda dapat melihat daftar alamat token di sini](https://static.optimism.io/optimism.tokenlist.json).
Alamat dengan `chainId` 1 berada di L1 (Mainnet) dan alamat dengan `chainId` 10 berada di L2 (Optimism).
Dua nilai `chainId` lainnya adalah untuk jaringan testnet Kovan (42) dan jaringan testnet Optimistic Kovan (69).

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

Dimungkinkan untuk menambahkan catatan pada transfer, dalam hal ini catatan tersebut ditambahkan ke event yang melaporkannya.

```solidity
    event ERC20WithdrawalFinalized(
        address indexed _l1Token,
        address indexed _l2Token,
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

Kontrak jembatan yang sama menangani transfer di kedua arah.
Dalam kasus jembatan L1, ini berarti inisialisasi deposit dan finalisasi penarikan.

```solidity

    /* *******************
     * Fungsi Publik *
     ******************* */
    /********************
     * Public Functions *
     ********************/

    /**
     * @dev mendapatkan alamat dari kontrak jembatan L2 yang sesuai.
     * @return Alamat dari kontrak jembatan L2 yang sesuai.
     */
    function l2TokenBridge() external returns (address);
```

Fungsi ini sebenarnya tidak terlalu dibutuhkan, karena di L2 ini adalah kontrak yang sudah di-deploy sebelumnya (predeployed), sehingga selalu berada di alamat `0x4200000000000000000000000000000000000010`.
Fungsi ini ada di sini untuk simetri dengan jembatan L2, karena alamat jembatan L1 _tidak_ mudah untuk diketahui.

```solidity
    /**
     * @dev mendepositkan sejumlah ERC20 ke saldo pemanggil di L2.
     * @param _l1Token Alamat ERC20 L1 yang kita depositkan
     * @param _l2Token Alamat ERC20 L2 yang masing-masing dari L1
     * @param _amount Jumlah ERC20 yang akan didepositkan
     * @param _l2Gas Batas gas yang diperlukan untuk menyelesaikan deposit di L2.
     * @param _data Data opsional untuk diteruskan ke L2. Data ini disediakan
     *        semata-mata sebagai kemudahan untuk kontrak eksternal. Selain dari menegakkan
     *        panjang maksimum, kontrak ini tidak memberikan jaminan tentang kontennya.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

Parameter `_l2Gas` adalah jumlah gas L2 yang diizinkan untuk dihabiskan oleh transaksi.
[Hingga batas (tinggi) tertentu, ini gratis](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), jadi kecuali kontrak ERC-20 melakukan sesuatu yang sangat aneh saat melakukan mint, ini seharusnya tidak menjadi masalah.
Fungsi ini menangani skenario umum, di mana pengguna menjembatani aset ke alamat yang sama di blockchain yang berbeda.

```solidity
    /**
     * @dev mendepositkan sejumlah ERC20 ke saldo penerima di L2.
     * @param _l1Token Alamat ERC20 L1 yang kita depositkan
     * @param _l2Token Alamat ERC20 L2 yang masing-masing dari L1
     * @param _to Alamat L2 untuk mengkreditkan penarikan.
     * @param _amount Jumlah ERC20 yang akan didepositkan.
     * @param _l2Gas Batas gas yang diperlukan untuk menyelesaikan deposit di L2.
     * @param _data Data opsional untuk diteruskan ke L2. Data ini disediakan
     *        semata-mata sebagai kemudahan untuk kontrak eksternal. Selain dari menegakkan
     *        panjang maksimum, kontrak ini tidak memberikan jaminan tentang kontennya.
     */
    function depositERC20To(
        address _l1Token,
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

Fungsi ini hampir identik dengan `depositERC20`, tetapi memungkinkan Anda mengirim ERC-20 ke alamat yang berbeda.

```solidity
    /* ************************
     * Fungsi Lintas-rantai *
     ************************ */
    /*************************
     * Cross-chain Functions *
     *************************/

    /**
     * @dev Menyelesaikan penarikan dari L2 ke L1, dan mengkreditkan dana ke saldo penerima dari
     * token ERC20 L1.
     * Panggilan ini akan gagal jika penarikan yang diinisialisasi dari L2 belum diselesaikan.
     *
     * @param _l1Token Alamat token L1 untuk finalizeWithdrawal.
     * @param _l2Token Alamat token L2 tempat penarikan diinisiasi.
     * @param _from Alamat L2 yang menginisiasi transfer.
     * @param _to Alamat L1 untuk mengkreditkan penarikan.
     * @param _amount Jumlah ERC20 yang akan didepositkan.
     * @param _data Data yang disediakan oleh pengirim di L2. Data ini disediakan
     *   semata-mata sebagai kemudahan untuk kontrak eksternal. Selain dari menegakkan
     *   panjang maksimum, kontrak ini tidak memberikan jaminan tentang kontennya.
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

Penarikan (dan pesan lain dari L2 ke L1) di Optimism adalah proses dua langkah:

1. Transaksi inisiasi di L2.
2. Transaksi finalisasi atau klaim di L1.
   Transaksi ini harus terjadi setelah [periode tantangan kesalahan (fault challenge period)](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) untuk transaksi L2 berakhir.

### IL1StandardBridge {#il1standardbridge}

[Antarmuka ini didefinisikan di sini](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
File ini berisi definisi event dan fungsi untuk ETH.
Definisi ini sangat mirip dengan yang didefinisikan dalam `IL1ERC20Bridge` di atas untuk ERC-20.

Antarmuka jembatan dibagi menjadi dua file karena beberapa token ERC-20 memerlukan pemrosesan kustom dan tidak dapat ditangani oleh jembatan standar.
Dengan cara ini, jembatan kustom yang menangani token semacam itu dapat mengimplementasikan `IL1ERC20Bridge` dan tidak perlu juga menjembatani ETH.

```solidity
// SPDX-License-Identifier: MIT // SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /* *********
     * Event *
     ********* */
    /**********
     * Events *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

Event ini hampir identik dengan versi ERC-20 (`ERC20DepositInitiated`), kecuali tanpa alamat token L1 dan L2.
Hal yang sama berlaku untuk event dan fungsi lainnya.

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /* *******************
     * Fungsi Publik *
     ******************* */
    /********************
     * Public Functions *
     ********************/

    /**
     * @dev Mendepositkan sejumlah ETH ke saldo pemanggil di L2.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev Mendepositkan sejumlah ETH ke saldo penerima di L2.
            .
            .
            .
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable;

    /* ************************
     * Fungsi Lintas-rantai *
     ************************ */
    /*************************
     * Cross-chain Functions *
     *************************/

    /**
     * @dev Menyelesaikan penarikan dari L2 ke L1, dan mengkreditkan dana ke saldo penerima dari
     * token ETH L1. Karena hanya xDomainMessenger yang dapat memanggil fungsi ini, fungsi ini tidak akan pernah dipanggil
     * sebelum penarikan diselesaikan.
                .
                .
                .
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

### CrossDomainEnabled {#crossdomainenabled}

[Kontrak ini](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) diwarisi oleh kedua jembatan ([L1](#the-l1-bridge-contract) dan [L2](#the-l2-bridge-contract)) untuk mengirim pesan ke layer lainnya.

```solidity
// SPDX-License-Identifier: MIT // SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Impor Antarmuka */
/* Interface Imports */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[Antarmuka ini](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) memberi tahu kontrak bagaimana cara mengirim pesan ke layer lainnya, menggunakan pengirim pesan lintas domain (cross domain messenger).
Pengirim pesan lintas domain ini adalah sistem yang sama sekali berbeda, dan layak mendapatkan artikelnya sendiri, yang saya harap dapat ditulis di masa mendatang.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev Kontrak pembantu untuk kontrak yang melakukan komunikasi lintas-domain
 *
 * Kompiler yang digunakan: ditentukan oleh kontrak yang mewarisi
 */
contract CrossDomainEnabled {
    /* ************
     * Variabel *
     ************ */
    /*************
     * Variables *
     *************/

    // Messenger contract used to send and receive messages from the other domain. // Kontrak Messenger yang digunakan untuk mengirim dan menerima pesan dari domain lain.
    address public messenger;

    /* **************
     * Konstruktor *
     ************** */
    /***************
     * Constructor *
     ***************/

    /**
     * @param _messenger Alamat CrossDomainMessenger di lapisan saat ini.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

Satu parameter yang perlu diketahui oleh kontrak, yaitu alamat pengirim pesan lintas domain di layer ini.
Parameter ini diatur sekali, di dalam konstruktor, dan tidak pernah berubah.

```solidity

    /* *********************
     * Pengubah Fungsi *
     ********************* */
    /**********************
     * Function Modifiers *
     **********************/

    /**
     * Menegakkan bahwa fungsi yang diubah hanya dapat dipanggil oleh akun lintas-domain tertentu.
     * @param _sourceDomainAccount Satu-satunya akun di domain asal yang
     *  diautentikasi untuk memanggil fungsi ini.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

Pesan lintas domain dapat diakses oleh kontrak apa pun di blockchain tempat ia berjalan (baik mainnet Ethereum maupun Optimism).
Tetapi kita membutuhkan jembatan di setiap sisi untuk _hanya_ mempercayai pesan tertentu jika pesan tersebut berasal dari jembatan di sisi lain.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

Hanya pesan dari pengirim pesan lintas domain yang sesuai (`messenger`, seperti yang Anda lihat di bawah) yang dapat dipercaya.

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

Cara pengirim pesan lintas domain menyediakan alamat yang mengirim pesan dengan layer lainnya adalah melalui [fungsi `.xDomainMessageSender()`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128).
Selama fungsi ini dipanggil dalam transaksi yang diinisiasi oleh pesan tersebut, ia dapat memberikan informasi ini.

Kita perlu memastikan bahwa pesan yang kita terima berasal dari jembatan lainnya.

```solidity

        _;
    }

    /* *********************
     * Fungsi Internal *
     ********************* */
    /**********************
     * Internal Functions *
     **********************/

    /**
     * Mendapatkan messenger, biasanya dari penyimpanan. Fungsi ini diekspos jika kontrak anak
     * perlu menimpanya.
     * @return Alamat kontrak messenger lintas-domain yang harus digunakan.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

Fungsi ini mengembalikan pengirim pesan lintas domain.
Kita menggunakan fungsi daripada variabel `messenger` untuk memungkinkan kontrak yang mewarisi dari kontrak ini menggunakan algoritma untuk menentukan pengirim pesan lintas domain mana yang akan digunakan.

```solidity

    /**
     * Mengirim pesan ke akun di domain lain
     * @param _crossDomainTarget Penerima yang dituju di domain tujuan
     * @param _message Data yang akan dikirim ke target (biasanya calldata ke fungsi dengan
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit Batas gas untuk penerimaan pesan di domain tujuan.
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

Terakhir, fungsi yang mengirim pesan ke layer lainnya.

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither) adalah penganalisis statis yang dijalankan Optimism pada setiap kontrak untuk mencari kerentanan dan potensi masalah lainnya.
Dalam kasus ini, baris berikut memicu dua kerentanan:

1. [Event reentrancy](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [Reentrancy jinak (benign)](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

Dalam kasus ini kita tidak khawatir tentang reentrancy karena kita tahu `getCrossDomainMessenger()` mengembalikan alamat yang dapat dipercaya, meskipun Slither tidak memiliki cara untuk mengetahuinya.

### Kontrak jembatan L1 {#the-l1-bridge-contract}

[Kode sumber untuk kontrak ini ada di sini](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT // SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

Antarmuka dapat menjadi bagian dari kontrak lain, sehingga mereka harus mendukung berbagai versi Solidity.
Tetapi jembatan itu sendiri adalah kontrak kita, dan kita bisa bersikap ketat tentang versi Solidity apa yang digunakannya.

```solidity
/* Impor Antarmuka */
/* Interface Imports */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) dan [IL1StandardBridge](#IL1StandardBridge) telah dijelaskan di atas.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[Antarmuka ini](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) memungkinkan kita membuat pesan untuk mengontrol jembatan standar di L2.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Antarmuka ini](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) memungkinkan kita mengontrol kontrak ERC-20.
[Anda dapat membaca lebih lanjut tentang hal ini di sini](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Impor Pustaka */
/* Library Imports */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[Seperti yang dijelaskan di atas](#crossdomainenabled), kontrak ini digunakan untuk pengiriman pesan antar-layer.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) memiliki alamat untuk kontrak L2 yang selalu memiliki alamat yang sama. Ini termasuk jembatan standar di L2.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[Utilitas Address dari OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). Ini digunakan untuk membedakan antara alamat kontrak dan alamat yang dimiliki oleh akun yang dimiliki secara eksternal (EOA).

Perhatikan bahwa ini bukanlah solusi yang sempurna, karena tidak ada cara untuk membedakan antara pemanggilan langsung dan pemanggilan yang dilakukan dari konstruktor kontrak, tetapi setidaknya ini memungkinkan kita mengidentifikasi dan mencegah beberapa kesalahan pengguna yang umum.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[Standar ERC-20](https://eips.ethereum.org/EIPS/eip-20) mendukung dua cara bagi kontrak untuk melaporkan kegagalan:

1. Revert
2. Mengembalikan `false`

Menangani kedua kasus tersebut akan membuat kode kita lebih rumit, jadi sebagai gantinya kita menggunakan [`SafeERC20` dari OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol), yang memastikan [semua kegagalan menghasilkan revert](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96).

```solidity
/**
 * @title L1StandardBridge
 * @dev Jembatan ETH dan ERC20 L1 adalah kontrak yang menyimpan dana L1 yang didepositkan dan token
 * standar yang digunakan di L2. Ini menyinkronkan jembatan L2 yang sesuai, menginformasikannya tentang deposit
 * dan mendengarkannya untuk penarikan yang baru saja diselesaikan.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

Baris ini adalah cara kita menentukan untuk menggunakan pembungkus (wrapper) `SafeERC20` setiap kali kita menggunakan antarmuka `IERC20`.

```solidity

    /* *******************************
     * Referensi Kontrak Eksternal *
     ******************************* */
    /********************************
     * External Contract References *
     ********************************/

    address public l2TokenBridge;
```

Alamat dari [L2StandardBridge](#the-l2-bridge-contract).

```solidity

    // Maps L1 token to L2 token to balance of the L1 token deposited // Memetakan token L1 ke token L2 ke saldo token L1 yang didepositkan
    mapping(address => mapping(address => uint256)) public deposits;
```

[Mapping](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) ganda seperti ini adalah cara Anda mendefinisikan [array jarang dua dimensi (two-dimensional sparse array)](https://en.wikipedia.org/wiki/Sparse_matrix).
Nilai dalam struktur data ini diidentifikasi sebagai `deposit[L1 token addr][L2 token addr]`.
Nilai defaultnya adalah nol.
Hanya sel yang diatur ke nilai yang berbeda yang ditulis ke penyimpanan.

```solidity

    /* **************
     * Konstruktor *
     ************** */
    /***************
     * Constructor *
     ***************/

    // This contract lives behind a proxy, so the constructor parameters will go unused. // Kontrak ini berada di balik proxy, sehingga parameter konstruktor tidak akan digunakan.
    constructor() CrossDomainEnabled(address(0)) {}
```

Kita ingin dapat meningkatkan (upgrade) kontrak ini tanpa harus menyalin semua variabel di penyimpanan.
Untuk melakukannya kita menggunakan [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy), sebuah kontrak yang menggunakan [`delegatecall`](https://solidity-by-example.org/delegatecall/) untuk mentransfer pemanggilan ke kontrak terpisah yang alamatnya disimpan oleh kontrak proxy (saat Anda melakukan upgrade, Anda memberi tahu proxy untuk mengubah alamat tersebut).
Saat Anda menggunakan `delegatecall`, penyimpanan tetap menjadi penyimpanan dari kontrak yang _memanggil_, sehingga nilai dari semua variabel status kontrak tidak terpengaruh.

Salah satu efek dari pola ini adalah bahwa penyimpanan dari kontrak yang _dipanggil_ oleh `delegatecall` tidak digunakan dan oleh karena itu nilai konstruktor yang diteruskan kepadanya tidak menjadi masalah.
Inilah alasan kita dapat memberikan nilai yang tidak masuk akal ke konstruktor `CrossDomainEnabled`.
Ini juga alasan inisialisasi di bawah ini terpisah dari konstruktor.

```solidity
    /* *****************
     * Inisialisasi *
     ***************** */
    /******************
     * Initialization *
     ******************/

    /**
     * @param _l1messenger Alamat Messenger L1 yang digunakan untuk komunikasi lintas-rantai.
     * @param _l2TokenBridge Alamat jembatan standar L2.
     */
    // slither-disable-next-line external-function // slither-disable-next-line external-function
```

[Pengujian Slither](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) ini mengidentifikasi fungsi yang tidak dipanggil dari kode kontrak dan oleh karena itu dapat dideklarasikan sebagai `external` alih-alih `public`.
Biaya gas dari fungsi `external` bisa lebih rendah, karena mereka dapat diberikan parameter di dalam calldata.
Fungsi yang dideklarasikan sebagai `public` harus dapat diakses dari dalam kontrak.
Kontrak tidak dapat memodifikasi calldata mereka sendiri, sehingga parameter harus berada di memori.
Ketika fungsi semacam itu dipanggil secara eksternal, calldata perlu disalin ke memori, yang memakan biaya gas.
Dalam kasus ini, fungsi tersebut hanya dipanggil sekali, sehingga inefisiensi tersebut tidak menjadi masalah bagi kita.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

Fungsi `initialize` hanya boleh dipanggil sekali.
Jika alamat pengirim pesan lintas domain L1 atau jembatan token L2 berubah, kita membuat proxy baru dan jembatan baru yang memanggilnya.
Ini tidak mungkin terjadi kecuali ketika seluruh sistem di-upgrade, sebuah kejadian yang sangat langka.

Perhatikan bahwa fungsi ini tidak memiliki mekanisme apa pun yang membatasi _siapa_ yang dapat memanggilnya.
Ini berarti secara teori seorang penyerang dapat menunggu hingga kita men-deploy proxy dan versi pertama dari jembatan lalu melakukan [front-run](https://solidity-by-example.org/hacks/front-running/) untuk mencapai fungsi `initialize` sebelum pengguna yang sah melakukannya. Tetapi ada dua metode untuk mencegah hal ini:

1. Jika kontrak di-deploy tidak secara langsung oleh EOA tetapi [dalam transaksi yang membuat kontrak lain membuatnya](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595), seluruh proses dapat bersifat atomik, dan selesai sebelum transaksi lain dieksekusi.
2. Jika pemanggilan yang sah ke `initialize` gagal, selalu dimungkinkan untuk mengabaikan proxy dan jembatan yang baru dibuat dan membuat yang baru.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

Ini adalah dua parameter yang perlu diketahui oleh jembatan.

```solidity

    /* *************
     * Mendepositkan *
     ************* */
    /**************
     * Depositing *
     **************/

    /** @dev Pengubah yang mengharuskan pengirim adalah EOA. Pemeriksaan ini dapat dilewati oleh kontrak
     *  berbahaya melalui initcode, tetapi ini menangani kesalahan pengguna yang ingin kita hindari.
     */
    modifier onlyEOA() {
        // Used to stop deposits from contracts (avoid accidentally lost tokens) // Digunakan untuk menghentikan deposit dari kontrak (menghindari token hilang secara tidak sengaja)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

Inilah alasan kita membutuhkan utilitas `Address` dari OpenZeppelin.

```solidity
    /**
     * @dev Fungsi ini dapat dipanggil tanpa data
     * untuk mendepositkan sejumlah ETH ke saldo pemanggil di L2.
     * Karena fungsi receive tidak menerima data, jumlah default
     * yang konservatif diteruskan ke L2.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

Fungsi ini ada untuk tujuan pengujian.
Perhatikan bahwa fungsi ini tidak muncul dalam definisi antarmuka - ini bukan untuk penggunaan normal.

```solidity
    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable {
        _initiateETHDeposit(msg.sender, _to, _l2Gas, _data);
    }
```

Kedua fungsi ini adalah pembungkus (wrapper) di sekitar `_initiateETHDeposit`, fungsi yang menangani deposit ETH yang sebenarnya.

```solidity
    /**
     * @dev Melakukan logika untuk deposit dengan menyimpan ETH dan menginformasikan Gateway ETH L2 tentang
     * deposit tersebut.
     * @param _from Akun untuk menarik deposit di L1.
     * @param _to Akun untuk memberikan deposit di L2.
     * @param _l2Gas Batas gas yang diperlukan untuk menyelesaikan deposit di L2.
     * @param _data Data opsional untuk diteruskan ke L2. Data ini disediakan
     *        semata-mata sebagai kemudahan untuk kontrak eksternal. Selain dari menegakkan
     *        panjang maksimum, kontrak ini tidak memberikan jaminan tentang kontennya.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // Construct calldata for finalizeDeposit call // Membangun calldata untuk panggilan finalizeDeposit
        bytes memory message = abi.encodeWithSelector(
```

Cara kerja pesan lintas domain adalah kontrak tujuan dipanggil dengan pesan sebagai calldata-nya.
Kontrak Solidity selalu menginterpretasikan calldata mereka sesuai dengan
[spesifikasi ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html).
Fungsi Solidity [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) membuat calldata tersebut.

```solidity
            IL2ERC20Bridge.finalizeDeposit.selector,
            address(0),
            Lib_PredeployAddresses.OVM_ETH,
            _from,
            _to,
            msg.value,
            _data
        );
```

Pesan di sini adalah untuk memanggil [fungsi `finalizeDeposit`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) dengan parameter berikut:

| Parameter | Nilai                          | Arti                                                                                                                                         |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                     | Nilai khusus yang mewakili ETH (yang bukan merupakan token ERC-20) di L1                                                                     |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | Kontrak L2 yang mengelola ETH di Optimism, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (kontrak ini hanya untuk penggunaan internal Optimism) |
| \_from    | \_from                         | Alamat di L1 yang mengirimkan ETH                                                                                                            |
| \_to      | \_to                           | Alamat di L2 yang menerima ETH                                                                                                               |
| amount    | msg.value                      | Jumlah wei yang dikirim (yang telah dikirim ke jembatan)                                                                                     |
| \_data    | \_data                         | Data tambahan untuk dilampirkan pada deposit                                                                                                 |

```solidity
        // Send calldata into L2 // Mengirim calldata ke L2
        // slither-disable-next-line reentrancy-events // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

Kirim pesan melalui pengirim pesan lintas domain.

```solidity
        // slither-disable-next-line reentrancy-events // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

Pancarkan (emit) event untuk memberi tahu aplikasi terdesentralisasi mana pun yang mendengarkan transfer ini.

```solidity
    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20(
		.
		.
		.
    ) external virtual onlyEOA {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, msg.sender, _amount, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20To(
		.
		.
		.
    ) external virtual {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, _to, _amount, _l2Gas, _data);
    }
```

Kedua fungsi ini adalah pembungkus di sekitar `_initiateERC20Deposit`, fungsi yang menangani deposit ERC-20 yang sebenarnya.

```solidity
    /**
     * @dev Melakukan logika untuk deposit dengan menginformasikan kontrak Token yang Didepositkan L2
     * tentang deposit tersebut dan memanggil penangan untuk mengunci dana L1. (misalnya, transferFrom)
     *
     * @param _l1Token Alamat ERC20 L1 yang kita depositkan
     * @param _l2Token Alamat ERC20 L2 yang masing-masing dari L1
     * @param _from Akun untuk menarik deposit di L1
     * @param _to Akun untuk memberikan deposit di L2
     * @param _amount Jumlah ERC20 yang akan didepositkan.
     * @param _l2Gas Batas gas yang diperlukan untuk menyelesaikan deposit di L2.
     * @param _data Data opsional untuk diteruskan ke L2. Data ini disediakan
     *        semata-mata sebagai kemudahan untuk kontrak eksternal. Selain dari menegakkan
     *        panjang maksimum, kontrak ini tidak memberikan jaminan tentang kontennya.
     */
    function _initiateERC20Deposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) internal {
```

Fungsi ini mirip dengan `_initiateETHDeposit` di atas, dengan beberapa perbedaan penting.
Perbedaan pertama adalah bahwa fungsi ini menerima alamat token dan jumlah yang akan ditransfer sebagai parameter.
Dalam kasus ETH, pemanggilan ke jembatan sudah mencakup transfer aset ke akun jembatan (`msg.value`).

```solidity
        // When a deposit is initiated on L1, the L1 Bridge transfers the funds to itself for future // Ketika deposit diinisiasi di L1, Jembatan L1 mentransfer dana ke dirinya sendiri untuk
        // withdrawals. safeTransferFrom also checks if the contract has code, so this will fail if // penarikan di masa mendatang. safeTransferFrom juga memeriksa apakah kontrak memiliki kode, sehingga ini akan gagal jika
        // _from is an EOA or address(0). // _from adalah EOA atau address(0).
        // slither-disable-next-line reentrancy-events, reentrancy-benign // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

Transfer token ERC-20 mengikuti proses yang berbeda dari ETH:

1. Pengguna (`_from`) memberikan izin (allowance) kepada jembatan untuk mentransfer token yang sesuai.
2. Pengguna memanggil jembatan dengan alamat kontrak token, jumlah, dll.
3. Jembatan mentransfer token (ke dirinya sendiri) sebagai bagian dari proses deposit.

Langkah pertama mungkin terjadi dalam transaksi yang terpisah dari dua langkah terakhir.
Namun, front-running bukanlah masalah karena dua fungsi yang memanggil `_initiateERC20Deposit` (`depositERC20` dan `depositERC20To`) hanya memanggil fungsi ini dengan `msg.sender` sebagai parameter `_from`.

```solidity
        // Construct calldata for _l2Token.finalizeDeposit(_to, _amount) // Membangun calldata untuk _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // Send calldata into L2 // Mengirim calldata ke L2
        // slither-disable-next-line reentrancy-events, reentrancy-benign // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

Tambahkan jumlah token yang didepositokan ke struktur data `deposits`.
Bisa jadi ada beberapa alamat di L2 yang sesuai dengan token ERC-20 L1 yang sama, sehingga tidak cukup menggunakan saldo jembatan dari token ERC-20 L1 untuk melacak deposit.

```solidity

        // slither-disable-next-line reentrancy-events // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /* ************************
     * Fungsi Lintas-rantai *
     ************************ */
    /*************************
     * Cross-chain Functions *
     *************************/

    /**
     * @inheritdoc IL1StandardBridge
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

Jembatan L2 mengirim pesan ke pengirim pesan lintas domain L2 yang menyebabkan pengirim pesan lintas domain L1 memanggil fungsi ini (tentu saja, setelah [transaksi yang memfinalisasi pesan](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) dikirimkan di L1).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Pastikan bahwa ini adalah pesan yang _sah_, berasal dari pengirim pesan lintas domain dan berawal dari jembatan token L2.
Fungsi ini digunakan untuk menarik ETH dari jembatan, jadi kita harus memastikan bahwa fungsi ini hanya dipanggil oleh pemanggil yang berwenang.

```solidity
        // slither-disable-next-line reentrancy-events // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

Cara untuk mentransfer ETH adalah dengan memanggil penerima dengan jumlah wei di dalam `msg.value`.

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

Pancarkan event tentang penarikan tersebut.

```solidity
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Fungsi ini mirip dengan `finalizeETHWithdrawal` di atas, dengan perubahan yang diperlukan untuk token ERC-20.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

Perbarui struktur data `deposits`.

```solidity

        // When a withdrawal is finalized on L1, the L1 Bridge transfers the funds to the withdrawer // Ketika penarikan diselesaikan di L1, Jembatan L1 mentransfer dana ke penarik
        // slither-disable-next-line reentrancy-events // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /* ****************************
     * Sementara - Migrasi ETH *
     **************************** */
    /*****************************
     * Temporary - Migrating ETH *
     *****************************/

    /**
     * @dev Menambahkan saldo ETH ke akun. Ini dimaksudkan untuk memungkinkan ETH
     * dimigrasikan dari gateway lama ke gateway baru.
     * CATATAN: Ini dibiarkan hanya untuk satu peningkatan sehingga kita dapat menerima ETH yang dimigrasikan dari
     * kontrak lama
     */
    function donateETH() external payable {}
}
```

Ada implementasi jembatan sebelumnya.
Ketika kita beralih dari implementasi tersebut ke implementasi ini, kita harus memindahkan semua aset.
Token ERC-20 bisa langsung dipindahkan.
Namun, untuk mentransfer ETH ke sebuah kontrak, Anda memerlukan persetujuan kontrak tersebut, yang mana itulah yang disediakan oleh `donateETH` kepada kita.

## Token ERC-20 di L2 {#erc-20-tokens-on-l2}

Agar token ERC-20 sesuai dengan jembatan standar, ia perlu mengizinkan jembatan standar, dan _hanya_ jembatan standar, untuk melakukan mint token.
Ini diperlukan karena jembatan perlu memastikan bahwa jumlah token yang beredar di Optimism sama dengan jumlah token yang terkunci di dalam kontrak jembatan L1.
Jika ada terlalu banyak token di L2, beberapa pengguna tidak akan dapat menjembatani aset mereka kembali ke L1.
Alih-alih jembatan yang tepercaya, kita pada dasarnya akan menciptakan kembali [perbankan cadangan fraksional (fractional reserve banking)](https://www.investopedia.com/terms/f/fractionalreservebanking.asp).
Jika ada terlalu banyak token di L1, beberapa dari token tersebut akan tetap terkunci di dalam kontrak jembatan selamanya karena tidak ada cara untuk melepaskannya tanpa membakar token L2.

### IL2StandardERC20 {#il2standarderc20}

Setiap token ERC-20 di L2 yang menggunakan jembatan standar perlu menyediakan [antarmuka ini](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol), yang memiliki fungsi dan event yang dibutuhkan oleh jembatan standar.

```solidity
// SPDX-License-Identifier: MIT // SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Antarmuka standar ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) tidak menyertakan fungsi `mint` dan `burn`.
Metode-metode tersebut tidak diwajibkan oleh [standar ERC-20](https://eips.ethereum.org/EIPS/eip-20), yang membiarkan mekanisme untuk membuat dan menghancurkan token tidak ditentukan.

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[Antarmuka ERC-165](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) digunakan untuk menentukan fungsi apa saja yang disediakan oleh sebuah kontrak.
[Anda dapat membaca standarnya di sini](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

Fungsi ini menyediakan alamat token L1 yang dijembatani ke kontrak ini.
Perhatikan bahwa kita tidak memiliki fungsi serupa ke arah yang berlawanan.
Kita harus dapat menjembatani token L1 apa pun, terlepas dari apakah dukungan L2 direncanakan saat diimplementasikan atau tidak.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

Fungsi dan event untuk melakukan mint (membuat) dan membakar (menghancurkan) token.
Jembatan harus menjadi satu-satunya entitas yang dapat menjalankan fungsi-fungsi ini untuk memastikan jumlah token sudah benar (sama dengan jumlah token yang terkunci di L1).

### L2StandardERC20 {#L2StandardERC20}

[Ini adalah implementasi kita dari antarmuka `IL2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
Kecuali Anda memerlukan semacam logika kustom, Anda harus menggunakan yang ini.

```solidity
// SPDX-License-Identifier: MIT // SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[Kontrak ERC-20 OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Optimism tidak percaya pada penemuan kembali roda (reinventing the wheel), terutama ketika roda tersebut telah diaudit dengan baik dan harus cukup tepercaya untuk menyimpan aset.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

Ini adalah dua parameter konfigurasi tambahan yang kita perlukan dan biasanya tidak diperlukan oleh ERC-20.

```solidity

    /**
     * @param _l2Bridge Alamat jembatan standar L2.
     * @param _l1Token Alamat token L1 yang sesuai.
     * @param _name Nama ERC20.
     * @param _symbol Simbol ERC20.
     */
    constructor(
        address _l2Bridge,
        address _l1Token,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        l1Token = _l1Token;
        l2Bridge = _l2Bridge;
    }
```

Pertama panggil konstruktor untuk kontrak yang kita warisi (`ERC20(_name, _symbol)`) dan kemudian atur variabel kita sendiri.

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Only L2 Bridge can mint and burn");
        _;
    }


    // slither-disable-next-line external-function // slither-disable-next-line external-function
    function supportsInterface(bytes4 _interfaceId) public pure returns (bool) {
        bytes4 firstSupportedInterface = bytes4(keccak256("supportsInterface(bytes4)")); // ERC165 // ERC165
        bytes4 secondSupportedInterface = IL2StandardERC20.l1Token.selector ^
            IL2StandardERC20.mint.selector ^
            IL2StandardERC20.burn.selector;
        return _interfaceId == firstSupportedInterface || _interfaceId == secondSupportedInterface;
    }
```

Inilah cara kerja [ERC-165](https://eips.ethereum.org/EIPS/eip-165).
Setiap antarmuka adalah sejumlah fungsi yang didukung, dan diidentifikasi sebagai [exclusive or (XOR)](https://en.wikipedia.org/wiki/Exclusive_or) dari [pemilih fungsi ABI (ABI function selectors)](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) dari fungsi-fungsi tersebut.

Jembatan L2 menggunakan ERC-165 sebagai pemeriksaan kewarasan (sanity check) untuk memastikan bahwa kontrak ERC-20 tempat ia mengirim aset adalah `IL2StandardERC20`.

**Catatan:** Tidak ada yang mencegah kontrak nakal memberikan jawaban palsu ke `supportsInterface`, jadi ini adalah mekanisme pemeriksaan kewarasan, _bukan_ mekanisme keamanan.

```solidity
    // slither-disable-next-line external-function // slither-disable-next-line external-function
    function mint(address _to, uint256 _amount) public virtual onlyL2Bridge {
        _mint(_to, _amount);

        emit Mint(_to, _amount);
    }

    // slither-disable-next-line external-function // slither-disable-next-line external-function
    function burn(address _from, uint256 _amount) public virtual onlyL2Bridge {
        _burn(_from, _amount);

        emit Burn(_from, _amount);
    }
}
```

Hanya jembatan L2 yang diizinkan untuk melakukan mint dan membakar aset.

`_mint` dan `_burn` sebenarnya didefinisikan dalam [kontrak ERC-20 OpenZeppelin](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).
Kontrak tersebut hanya tidak mengeksposnya secara eksternal, karena kondisi untuk melakukan mint dan membakar token sama bervariasinya dengan jumlah cara untuk menggunakan ERC-20.

## Kode Jembatan L2 {#l2-bridge-code}

Ini adalah kode yang menjalankan jembatan di Optimism.
[Sumber untuk kontrak ini ada di sini](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT // SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Impor Antarmuka */
/* Interface Imports */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

Antarmuka [IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) sangat mirip dengan [padanan L1](#IL1ERC20Bridge) yang kita lihat di atas.
Ada dua perbedaan signifikan:

1. Di L1 Anda menginisiasi deposit dan memfinalisasi penarikan.
   Di sini Anda menginisiasi penarikan dan memfinalisasi deposit.
2. Di L1 perlu untuk membedakan antara ETH dan token ERC-20.
   Di L2 kita dapat menggunakan fungsi yang sama untuk keduanya karena secara internal saldo ETH di Optimism ditangani sebagai token ERC-20 dengan alamat [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000).

```solidity
/* Impor Pustaka */
/* Library Imports */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Impor Kontrak */
/* Contract Imports */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev Jembatan Standar L2 adalah kontrak yang bekerja sama dengan jembatan Standar L1 untuk
 * memungkinkan transisi ETH dan ERC20 antara L1 dan L2.
 * Kontrak ini bertindak sebagai minter untuk token baru ketika mendengar tentang deposit ke jembatan
 * Standar L1.
 * Kontrak ini juga bertindak sebagai pembakar token yang ditujukan untuk penarikan, menginformasikan jembatan
 * L1 untuk melepaskan dana L1.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /* *******************************
     * Referensi Kontrak Eksternal *
     ******************************* */
    /********************************
     * External Contract References *
     ********************************/

    address public l1TokenBridge;
```

Lacak alamat jembatan L1.
Perhatikan bahwa berbeda dengan padanan L1, di sini kita _membutuhkan_ variabel ini.
Alamat jembatan L1 tidak diketahui sebelumnya.

```solidity

    /* **************
     * Konstruktor *
     ************** */
    /***************
     * Constructor *
     ***************/

    /**
     * @param _l2CrossDomainMessenger Messenger lintas-domain yang digunakan oleh kontrak ini.
     * @param _l1TokenBridge Alamat jembatan L1 yang disebarkan ke rantai utama.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /* **************
     * Penarikan *
     ************** */
    /***************
     * Withdrawing *
     ***************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdraw(
        address _l2Token,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, msg.sender, _amount, _l1Gas, _data);
    }

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdrawTo(
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, _to, _amount, _l1Gas, _data);
    }
```

Kedua fungsi ini menginisiasi penarikan.
Perhatikan bahwa tidak perlu menentukan alamat token L1.
Token L2 diharapkan memberi tahu kita alamat padanan L1-nya.

```solidity

    /**
     * @dev Melakukan logika untuk penarikan dengan membakar token dan menginformasikan
     *      Gateway token L1 tentang penarikan tersebut.
     * @param _l2Token Alamat token L2 tempat penarikan diinisiasi.
     * @param _from Akun untuk menarik penarikan di L2.
     * @param _to Akun untuk memberikan penarikan di L1.
     * @param _amount Jumlah token yang akan ditarik.
     * @param _l1Gas Tidak digunakan, tetapi disertakan untuk pertimbangan kompatibilitas ke depan yang potensial.
     * @param _data Data opsional untuk diteruskan ke L1. Data ini disediakan
     *        semata-mata sebagai kemudahan untuk kontrak eksternal. Selain dari menegakkan
     *        panjang maksimum, kontrak ini tidak memberikan jaminan tentang kontennya.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // When a withdrawal is initiated, we burn the withdrawer's funds to prevent subsequent L2 // Ketika penarikan diinisiasi, kami membakar dana penarik untuk mencegah penggunaan L2
        // usage // selanjutnya
        // slither-disable-next-line reentrancy-events // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

Perhatikan bahwa kita _tidak_ mengandalkan parameter `_from` melainkan pada `msg.sender` yang jauh lebih sulit untuk dipalsukan (tidak mungkin, sejauh yang saya tahu).

```solidity

        // Construct calldata for l1TokenBridge.finalizeERC20Withdrawal(_to, _amount) // Membangun calldata untuk l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
        // slither-disable-next-line reentrancy-events // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

Di L1 perlu untuk membedakan antara ETH dan ERC-20.

```solidity
            message = abi.encodeWithSelector(
                IL1StandardBridge.finalizeETHWithdrawal.selector,
                _from,
                _to,
                _amount,
                _data
            );
        } else {
            message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                l1Token,
                _l2Token,
                _from,
                _to,
                _amount,
                _data
            );
        }

        // Send message up to L1 bridge // Mengirim pesan ke jembatan L1
        // slither-disable-next-line reentrancy-events // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /* ***********************************
     * Fungsi Lintas-rantai: Mendepositkan *
     *********************************** */
    /************************************
     * Cross-chain Function: Depositing *
     ************************************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function finalizeDeposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

Fungsi ini dipanggil oleh `L1StandardBridge`.

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

Pastikan sumber pesan tersebut sah.
Ini penting karena fungsi ini memanggil `_mint` dan dapat digunakan untuk memberikan token yang tidak dicakup oleh token yang dimiliki jembatan di L1.

```solidity
        // Check the target token is compliant and // Memeriksa apakah token target mematuhi dan
        // verify the deposited token on L1 matches the L2 deposited token representation here // memverifikasi token yang didepositkan di L1 cocok dengan representasi token yang didepositkan di L2 di sini
        if (
            // slither-disable-next-line reentrancy-events // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

Pemeriksaan kewarasan (sanity checks):

1. Antarmuka yang benar didukung
2. Alamat L1 dari kontrak ERC-20 L2 cocok dengan sumber L1 dari token tersebut

```solidity
        ) {
            // When a deposit is finalized, we credit the account on L2 with the same amount of // Ketika deposit diselesaikan, kami mengkreditkan akun di L2 dengan jumlah yang sama dari
            // tokens. // token.
            // slither-disable-next-line reentrancy-events // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

Jika pemeriksaan kewarasan berhasil, finalisasi deposit:

1. Mint token
2. Pancarkan event yang sesuai

```solidity
        } else {
            // Either the L2 token which is being deposited-into disagrees about the correct address // Entah token L2 yang sedang didepositkan tidak setuju tentang alamat yang benar
            // of its L1 token, or does not support the correct interface. // dari token L1-nya, atau tidak mendukung antarmuka yang benar.
            // This should only happen if there is a  malicious L2 token, or if a user somehow // Ini seharusnya hanya terjadi jika ada token L2 yang berbahaya, atau jika pengguna entah bagaimana
            // specified the wrong L2 token address to deposit into. // menentukan alamat token L2 yang salah untuk didepositkan.
            // In either case, we stop the process here and construct a withdrawal // Dalam kedua kasus tersebut, kami menghentikan proses di sini dan membangun pesan
            // message so that users can get their funds out in some cases. // penarikan sehingga pengguna bisa mengeluarkan dana mereka dalam beberapa kasus.
            // There is no way to prevent malicious token contracts altogether, but this does limit // Tidak ada cara untuk mencegah kontrak token berbahaya sepenuhnya, tetapi ini membatasi
            // user error and mitigate some forms of malicious contract behavior. // kesalahan pengguna dan memitigasi beberapa bentuk perilaku kontrak yang berbahaya.
```

Jika pengguna membuat kesalahan yang dapat dideteksi dengan menggunakan alamat token L2 yang salah, kita ingin membatalkan deposit dan mengembalikan token di L1.
Satu-satunya cara kita dapat melakukan ini dari L2 adalah dengan mengirim pesan yang harus menunggu periode tantangan kesalahan, tetapi itu jauh lebih baik bagi pengguna daripada kehilangan token secara permanen.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // switched the _to and _from here to bounce back the deposit to the sender // menukar _to dan _from di sini untuk memantulkan kembali deposit ke pengirim
                _from,
                _amount,
                _data
            );

            // Send message up to L1 bridge // Mengirim pesan ke jembatan L1
            // slither-disable-next-line reentrancy-events // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## Kesimpulan {#conclusion}

Jembatan standar adalah mekanisme paling fleksibel untuk transfer aset.
Namun, karena sangat generik, ini tidak selalu menjadi mekanisme termudah untuk digunakan.
Terutama untuk penarikan, sebagian besar pengguna lebih suka menggunakan [jembatan pihak ketiga](https://optimism.io/apps#bridge) yang tidak menunggu periode tantangan dan tidak memerlukan bukti Merkle untuk memfinalisasi penarikan.

Jembatan ini biasanya bekerja dengan memiliki aset di L1, yang mereka sediakan segera dengan biaya kecil (seringkali kurang dari biaya gas untuk penarikan jembatan standar).
Ketika jembatan (atau orang yang menjalankannya) mengantisipasi kekurangan aset L1, ia mentransfer aset yang cukup dari L2. Karena ini adalah penarikan yang sangat besar, biaya penarikan diamortisasi dalam jumlah besar dan persentasenya jauh lebih kecil.

Semoga artikel ini membantu Anda lebih memahami tentang cara kerja layer 2, dan cara menulis kode Solidity yang jelas dan aman.

[Lihat di sini untuk karya saya yang lain](https://cryptodocguy.pro/).
---