---
title: "Panduan kontrak jembatan standar Optimism"
description: Bagaimana cara kerja jembatan standar untuk Optimism? Mengapa cara kerjanya seperti ini?
author: Ori Pomerantz
tags: [ "Solidity", "jembatan", "layer 2" ]
skill: intermediate
published: 2022-03-30
lang: id
---

[Optimism](https://www.optimism.io/) adalah sebuah [optimistic rollup](/developers/docs/scaling/optimistic-rollups/).
Optimistic rollup dapat memproses transaksi dengan harga yang jauh lebih rendah daripada Mainnet Ethereum (juga dikenal sebagai lapisan 1 atau L1) karena transaksi hanya diproses oleh beberapa node, bukan setiap node di jaringan.
Pada saat yang sama, semua data ditulis ke L1 sehingga semuanya dapat dibuktikan dan direkonstruksi dengan semua jaminan integritas dan ketersediaan Mainnet.

Untuk menggunakan aset L1 di Optimism (atau L2 lainnya), aset tersebut perlu [dijembatani](/bridges/#prerequisites).
Salah satu cara untuk mencapainya adalah dengan pengguna mengunci aset (ETH dan [token ERC-20](/developers/docs/standards/tokens/erc-20/) adalah yang paling umum) di L1, dan menerima aset yang setara untuk digunakan di L2.
Pada akhirnya, siapa pun yang memilikinya mungkin ingin menjembataninya kembali ke L1.
Saat melakukan ini, aset dibakar di L2 dan kemudian dilepaskan kembali ke pengguna di L1.

Ini adalah cara kerja [jembatan standar Optimism](https://docs.optimism.io/app-developers/bridging/standard-bridge).
Dalam artikel ini kita akan membahas kode sumber untuk jembatan tersebut untuk melihat cara kerjanya dan mempelajarinya sebagai contoh kode Solidity yang ditulis dengan baik.

## Alur kontrol {#control-flows}

Jembatan ini memiliki dua alur utama:

- Deposit (dari L1 ke L2)
- Penarikan (dari L2 ke L1)

### Alur deposit {#deposit-flow}

#### Lapisan 1 {#deposit-flow-layer-1}

1. Jika melakukan deposit ERC-20, depositor memberikan allowance ke jembatan untuk membelanjakan jumlah yang didepositokan
2. Depositor memanggil jembatan L1 (`depositERC20`, `depositERC20To`, `depositETH`, atau `depositETHTo`)
3. Jembatan L1 mengambil alih aset yang dijembatani
   - ETH: Aset ditransfer oleh depositor sebagai bagian dari panggilan
   - ERC-20: Aset ditransfer oleh jembatan ke dirinya sendiri menggunakan allowance yang disediakan oleh depositor
4. Jembatan L1 menggunakan mekanisme pesan lintas domain untuk memanggil `finalizeDeposit` di jembatan L2

#### Lapisan 2 {#deposit-flow-layer-2}

5. Jembatan L2 memverifikasi panggilan ke `finalizeDeposit` adalah sah:
   - Berasal dari kontrak pesan lintas domain
   - Awalnya dari jembatan di L1
6. Jembatan L2 memeriksa apakah kontrak token ERC-20 di L2 adalah yang benar:
   - Kontrak L2 melaporkan bahwa padanannya di L1 sama dengan asal token di L1
   - Kontrak L2 melaporkan bahwa ia mendukung antarmuka yang benar ([menggunakan ERC-165](https://eips.ethereum.org/EIPS/eip-165)).
7. Jika kontrak L2 adalah yang benar, panggil kontrak itu untuk mencetak jumlah token yang sesuai ke alamat yang sesuai. Jika tidak, mulailah proses penarikan untuk memungkinkan pengguna mengklaim token di L1.

### Alur penarikan {#withdrawal-flow}

#### Lapisan 2 {#withdrawal-flow-layer-2}

1. Penarik memanggil jembatan L2 (`withdraw` atau `withdrawTo`)
2. Jembatan L2 membakar jumlah token yang sesuai milik `msg.sender`
3. Jembatan L2 menggunakan mekanisme pesan lintas domain untuk memanggil `finalizeETHWithdrawal` atau `finalizeERC20Withdrawal` di jembatan L1

#### Lapisan 1 {#withdrawal-flow-layer-1}

4. Jembatan L1 memverifikasi panggilan ke `finalizeETHWithdrawal` atau `finalizeERC20Withdrawal` adalah sah:
   - Berasal dari mekanisme pesan lintas domain
   - Awalnya dari jembatan di L2
5. Jembatan L1 mentransfer aset yang sesuai (ETH atau ERC-20) ke alamat yang sesuai

## Kode Lapisan 1 {#layer-1-code}

Ini adalah kode yang berjalan di L1, Mainnet Ethereum.

### IL1ERC20Bridge {#IL1ERC20Bridge}

[Antarmuka ini didefinisikan di sini](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
Ini mencakup fungsi dan definisi yang diperlukan untuk menjembatani token ERC-20.

```solidity
// SPDX-License-Identifier: MIT
```

[Sebagian besar kode Optimism dirilis di bawah lisensi MIT](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

Saat penulisan, versi terbaru Solidity adalah 0.8.12.
Hingga versi 0.9.0 dirilis, kami tidak tahu apakah kode ini kompatibel dengannya atau tidak.

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * Event *
     **********/

    event ERC20DepositInitiated(
```

Dalam terminologi jembatan Optimism, _deposit_ berarti transfer dari L1 ke L2, dan _withdrawal_ berarti transfer dari L2 ke L1.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

Dalam kebanyakan kasus, alamat ERC-20 di L1 tidak sama dengan alamat ERC-20 yang setara di L2.
[Anda dapat melihat daftar alamat token di sini](https://static.optimism.io/optimism.tokenlist.json).
Alamat dengan `chainId` 1 ada di L1 (Mainnet) dan alamat dengan `chainId` 10 ada di L2 (Optimism).
Dua nilai `chainId` lainnya adalah untuk testnet Kovan (42) dan testnet Optimistic Kovan (69).

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

Dimungkinkan untuk menambahkan catatan ke transfer, dalam hal ini catatan tersebut ditambahkan ke event yang melaporkannya.

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

    /********************
     * Fungsi Publik *
     ********************/

    /**
     * @dev dapatkan alamat kontrak jembatan L2 yang sesuai.
     * @return Alamat dari kontrak jembatan L2 yang sesuai.
     */
    function l2TokenBridge() external returns (address);
```

Fungsi ini tidak terlalu diperlukan, karena di L2 ini adalah kontrak pra-deploy, jadi selalu berada di alamat `0x4200000000000000000000000000000000000010`.
Ini ada di sini untuk simetri dengan jembatan L2, karena alamat jembatan L1 _tidak_ mudah untuk diketahui.

```solidity
    /**
     * @dev depositkan sejumlah ERC20 ke saldo pemanggil di L2.
     * @param _l1Token Alamat ERC20 L1 yang kita depositokan
     * @param _l2Token Alamat ERC20 L2 yang sesuai dengan L1
     * @param _amount Jumlah ERC20 yang akan didepositokan
     * @param _l2Gas Batas gas yang diperlukan untuk menyelesaikan deposit di L2.
     * @param _data Data opsional untuk diteruskan ke L2. Data ini disediakan
     *        semata-mata untuk kemudahan kontrak eksternal. Selain memberlakukan panjang maksimum,
     *        kontrak-kontrak ini tidak memberikan jaminan tentang isinya.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

Parameter `_l2Gas` adalah jumlah gas L2 yang diizinkan untuk dibelanjakan oleh transaksi.
[Hingga batas tertentu (tinggi), ini gratis](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), jadi kecuali kontrak ERC-20 melakukan sesuatu yang sangat aneh saat mencetak, ini seharusnya tidak menjadi masalah.
Fungsi ini menangani skenario umum, di mana pengguna menjembatani aset ke alamat yang sama di blockchain yang berbeda.

```solidity
    /**
     * @dev depositkan sejumlah ERC20 ke saldo penerima di L2.
     * @param _l1Token Alamat ERC20 L1 yang kita depositokan
     * @param _l2Token Alamat ERC20 L2 yang sesuai dengan L1
     * @param _to Alamat L2 untuk mengkreditkan deposit.
     * @param _amount Jumlah ERC20 yang akan didepositokan.
     * @param _l2Gas Batas gas yang diperlukan untuk menyelesaikan deposit di L2.
     * @param _data Data opsional untuk diteruskan ke L2. Data ini disediakan
     *        semata-mata untuk kemudahan kontrak eksternal. Selain memberlakukan panjang maksimum,
     *        kontrak-kontrak ini tidak memberikan jaminan tentang isinya.
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
    /*************************
     * Fungsi Lintas Rantai *
     *************************/

    /**
     * @dev Selesaikan penarikan dari L2 ke L1, dan kreditkan dana ke saldo penerima dari
     * token L1 ERC20.
     * Panggilan ini akan gagal jika penarikan yang diinisialisasi dari L2 belum difinalisasi.
     *
     * @param _l1Token Alamat token L1 untuk `finalizeWithdrawal`.
     * @param _l2Token Alamat token L2 tempat penarikan dimulai.
     * @param _from Alamat L2 yang memulai transfer.
     * @param _to Alamat L1 untuk mengkreditkan penarikan.
     * @param _amount Jumlah ERC20 yang akan ditarik.
     * @param _data Data yang disediakan oleh pengirim di L2. Data ini disediakan
     *   semata-mata untuk kemudahan kontrak eksternal. Selain memberlakukan panjang maksimum,
     *   kontrak-kontrak ini tidak memberikan jaminan tentang isinya.
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
   Transaksi ini harus terjadi setelah [periode tantangan kesalahan](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) untuk transaksi L2 berakhir.

### IL1StandardBridge {#il1standardbridge}

[Antarmuka ini didefinisikan di sini](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
File ini berisi definisi event dan fungsi untuk ETH.
Definisi ini sangat mirip dengan yang didefinisikan dalam `IL1ERC20Bridge` di atas untuk ERC-20.

Antarmuka jembatan dibagi antara dua file karena beberapa token ERC-20 memerlukan pemrosesan khusus dan tidak dapat ditangani oleh jembatan standar.
Dengan cara ini, jembatan khusus yang menangani token semacam itu dapat mengimplementasikan `IL1ERC20Bridge` dan tidak harus juga menjembatani ETH.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * Event *
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

    /********************
     * Fungsi Publik *
     ********************/

    /**
     * @dev Depositkan sejumlah ETH ke saldo pemanggil di L2.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev Depositkan sejumlah ETH ke saldo penerima di L2.
            .
            .
            .
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable;

    /*************************
     * Fungsi Lintas Rantai *
     *************************/

    /**
     * @dev Selesaikan penarikan dari L2 ke L1, dan kreditkan dana ke saldo penerima
     * token ETH L1. Karena hanya xDomainMessenger yang dapat memanggil fungsi ini, fungsi ini tidak akan pernah dipanggil
     * sebelum penarikan difinalisasi.
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

[Kontrak ini](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) diwarisi oleh kedua jembatan ([L1](#the-l1-bridge-contract) dan [L2](#the-l2-bridge-contract)) untuk mengirim pesan ke lapisan lainnya.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Impor Antarmuka */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[Antarmuka ini](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) memberi tahu kontrak cara mengirim pesan ke lapisan lain, menggunakan cross domain messenger.
Cross domain messenger ini adalah sistem yang sama sekali lain, dan layak mendapatkan artikelnya sendiri, yang saya harap dapat saya tulis di masa mendatang.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev Kontrak pembantu untuk kontrak yang melakukan komunikasi lintas-domain
 *
 * Kompiler yang digunakan: ditentukan oleh kontrak yang mewarisi
 */
contract CrossDomainEnabled {
    /*************
     * Variabel *
     *************/

    // Kontrak Messenger yang digunakan untuk mengirim dan menerima pesan dari domain lain.
    address public messenger;

    /***************
     * Konstruktor *
     ***************/

    /**
     * @param _messenger Alamat CrossDomainMessenger pada lapisan saat ini.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

Satu-satunya parameter yang perlu diketahui kontrak, alamat cross domain messenger pada lapisan ini.
Parameter ini diatur sekali, di konstruktor, dan tidak pernah berubah.

```solidity

    /**********************
     * Pengubah Fungsi *
     **********************/

    /**
     * Menegakkan bahwa fungsi yang diubah hanya dapat dipanggil oleh akun lintas-domain tertentu.
     * @param _sourceDomainAccount Satu-satunya akun pada domain asal yang
     *  diautentikasi untuk memanggil fungsi ini.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

Pesan lintas domain dapat diakses oleh kontrak apa pun di blockchain tempat ia berjalan (baik Mainnet Ethereum atau Optimism).
Namun kita membutuhkan jembatan di setiap sisi untuk _hanya_ mempercayai pesan tertentu jika pesan itu datang dari jembatan di sisi lain.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

Hanya pesan dari cross domain messenger yang sesuai (`messenger`, seperti yang Anda lihat di bawah) yang dapat dipercaya.

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

Cara cross domain messenger memberikan alamat yang mengirim pesan dengan lapisan lain adalah [fungsi `.xDomainMessageSender()`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128).
Selama itu dipanggil dalam transaksi yang diprakarsai oleh pesan, ia dapat memberikan informasi ini.

Kita perlu memastikan bahwa pesan yang kita terima berasal dari jembatan lain.

```solidity

        _;
    }

    /**********************
     * Fungsi Internal *
     **********************/

    /**
     * Mendapatkan messenger, biasanya dari penyimpanan. Fungsi ini diekspos jika kontrak anak
     * perlu menimpanya.
     * @return Alamat dari kontrak cross-domain messenger yang harus digunakan.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

Fungsi ini mengembalikan cross domain messenger.
Kami menggunakan fungsi daripada variabel `messenger` untuk mengizinkan kontrak yang mewarisi dari yang satu ini menggunakan algoritma untuk menentukan cross domain messenger mana yang akan digunakan.

```solidity

    /**
     * Mengirim pesan ke akun di domain lain
     * @param _crossDomainTarget Penerima yang dituju di domain tujuan
     * @param _message Data yang akan dikirim ke target (biasanya calldata ke suatu fungsi dengan
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit gasLimit untuk penerimaan pesan di domain target.
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

Terakhir, fungsi yang mengirimkan pesan ke lapisan lain.

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither) adalah penganalisis statis yang dijalankan Optimism di setiap kontrak untuk mencari kerentanan dan potensi masalah lainnya.
Dalam hal ini, baris berikut memicu dua kerentanan:

1. [Event Reentrancy](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [Reentrancy jinak](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

Dalam kasus ini, kami tidak khawatir tentang reentrancy karena kami tahu `getCrossDomainMessenger()` mengembalikan alamat yang dapat dipercaya, meskipun Slither tidak memiliki cara untuk mengetahuinya.

### Kontrak jembatan L1 {#the-l1-bridge-contract}

[Kode sumber untuk kontrak ini ada di sini](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

Antarmuka dapat menjadi bagian dari kontrak lain, sehingga mereka harus mendukung berbagai versi Solidity.
Tapi jembatan itu sendiri adalah kontrak kami, dan kami bisa tegas tentang versi Solidity yang digunakannya.

```solidity
/* Impor Antarmuka */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) dan [IL1StandardBridge](#IL1StandardBridge) dijelaskan di atas.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[Antarmuka ini](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) memungkinkan kami membuat pesan untuk mengontrol jembatan standar di L2.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Antarmuka ini](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) memungkinkan kami mengontrol kontrak ERC-20.
[Anda dapat membaca lebih lanjut tentangnya di sini](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Impor Pustaka */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[Seperti yang dijelaskan di atas](#crossdomainenabled), kontrak ini digunakan untuk pengiriman pesan antarlapisan.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

`Lib_PredeployAddresses`([https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol)) memiliki alamat untuk kontrak L2 yang selalu memiliki alamat yang sama. Ini termasuk jembatan standar di L2.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[Utilitas Alamat OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). Ini digunakan untuk membedakan antara alamat kontrak dan yang dimiliki oleh akun milik eksternal (EOA).

Perhatikan bahwa ini bukan solusi yang sempurna, karena tidak ada cara untuk membedakan antara panggilan langsung dan panggilan yang dibuat dari konstruktor kontrak, tetapi setidaknya ini memungkinkan kami mengidentifikasi dan mencegah beberapa kesalahan umum pengguna.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[Standar ERC-20](https://eips.ethereum.org/EIPS/eip-20) mendukung dua cara bagi kontrak untuk melaporkan kegagalan:

1. Revert
2. Mengembalikan `false`

Menangani kedua kasus akan membuat kode kami lebih rumit, jadi kami menggunakan [`SafeERC20` OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol), yang memastikan [semua kegagalan menghasilkan revert](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96).

```solidity
/**
 * @title L1StandardBridge
 * @dev Jembatan ETH dan ERC20 L1 adalah kontrak yang menyimpan dana L1 yang didepositokan dan token standar
 * yang digunakan di L2. Ini menyinkronkan Jembatan L2 yang sesuai, memberitahukannya tentang deposit
 * dan mendengarkannya untuk penarikan yang baru difinalisasi.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

Baris ini adalah cara kita menentukan untuk menggunakan pembungkus `SafeERC20` setiap kali kita menggunakan antarmuka `IERC20`.

```solidity

    /********************************
     * Referensi Kontrak Eksternal *
     ********************************/

    address public l2TokenBridge;
```

Alamat dari [L2StandardBridge](#the-l2-bridge-contract).

```solidity

    // Memetakan token L1 ke token L2 ke saldo dari token L1 yang didepositokan
    mapping(address => mapping(address => uint256)) public deposits;
```

[Pemetaan](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) ganda seperti ini adalah cara Anda mendefinisikan [larik renggang dua dimensi](https://en.wikipedia.org/wiki/Sparse_matrix).
Nilai dalam struktur data ini diidentifikasi sebagai `deposit[alamat token L1][alamat token L2]`.
Nilai defaultnya adalah nol.
Hanya sel yang disetel ke nilai berbeda yang ditulis ke penyimpanan.

```solidity

    /***************
     * Konstruktor *
     ***************/

    // Kontrak ini berada di belakang proksi, jadi parameter konstruktor tidak akan digunakan.
    constructor() CrossDomainEnabled(address(0)) {}
```

Untuk dapat meningkatkan kontrak ini tanpa harus menyalin semua variabel di penyimpanan.
Untuk melakukannya kita menggunakan [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy), sebuah kontrak yang menggunakan [`delegatecall`](https://solidity-by-example.org/delegatecall/) untuk mentransfer panggilan ke kontrak terpisah yang alamatnya disimpan oleh kontrak proksi (ketika Anda meningkatkan, Anda memberitahu proksi untuk mengubah alamat itu).
Saat Anda menggunakan `delegatecall` penyimpanan tetap menjadi penyimpanan dari kontrak yang _memanggil_, sehingga nilai semua variabel status kontrak tidak terpengaruh.

Satu efek dari pola ini adalah bahwa penyimpanan dari kontrak yang _dipanggil_ dari `delegatecall` tidak digunakan dan oleh karena itu nilai-nilai konstruktor yang dilewatkan kepadanya tidak penting.
Inilah alasan mengapa kami dapat memberikan nilai yang tidak masuk akal ke konstruktor `CrossDomainEnabled`.
Itu juga alasan inisialisasi di bawah ini terpisah dari konstruktor.

```solidity
    /******************
     * Inisialisasi *
     ******************/

    /**
     * @param _l1messenger Alamat Messenger L1 yang digunakan untuk komunikasi lintas rantai.
     * @param _l2TokenBridge Alamat jembatan standar L2.
     */
    // slither-disable-next-line external-function
```

[Tes Slither ini](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) mengidentifikasi fungsi-fungsi yang tidak dipanggil dari kode kontrak dan oleh karena itu dapat dideklarasikan `external` daripada `public`.
Biaya gas fungsi `external` bisa lebih rendah, karena dapat diberikan dengan parameter di calldata.
Fungsi yang dideklarasikan `public` harus dapat diakses dari dalam kontrak.
Kontrak tidak dapat mengubah calldata-nya sendiri, jadi parameternya harus ada di memori.
Ketika fungsi seperti itu dipanggil secara eksternal, perlu untuk menyalin calldata ke memori, yang membutuhkan biaya gas.
Dalam hal ini fungsi tersebut hanya dipanggil satu kali, sehingga inefisiensi tidak menjadi masalah bagi kami.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Kontrak telah diinisialisasi.");
```

Fungsi `initialize` hanya boleh dipanggil sekali.
Jika alamat cross domain messenger L1 atau jembatan token L2 berubah, kami membuat proksi baru dan jembatan baru yang memanggilnya.
Ini tidak mungkin terjadi kecuali ketika seluruh sistem ditingkatkan, kejadian yang sangat jarang terjadi.

Perhatikan bahwa fungsi ini tidak memiliki mekanisme apa pun yang membatasi _siapa_ yang dapat memanggilnya.
Ini berarti bahwa secara teori penyerang dapat menunggu hingga kami mendeploy proksi dan versi pertama jembatan, lalu melakukan [front-run](https://solidity-by-example.org/hacks/front-running/) untuk mencapai fungsi `initialize` sebelum pengguna yang sah melakukannya. Tetapi ada dua metode untuk mencegahnya:

1. Jika kontrak dideploy tidak secara langsung oleh EOA tetapi [dalam transaksi yang meminta kontrak lain membuatnya](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595), seluruh proses dapat bersifat atomik, dan selesai sebelum transaksi lain dieksekusi.
2. Jika panggilan yang sah untuk `initialize` gagal, selalu mungkin untuk mengabaikan proksi dan jembatan yang baru dibuat dan membuat yang baru.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

Ini adalah dua parameter yang perlu diketahui jembatan.

```solidity

    /**************
     * Melakukan Deposit *
     **************/

    /** @dev Modifier yang mengharuskan pengirim menjadi EOA. Pemeriksaan ini dapat dilewati oleh
     *  kontrak berbahaya melalui initcode, tetapi ini mengatasi kesalahan pengguna yang ingin kita hindari.
     */
    modifier onlyEOA() {
        // Digunakan untuk menghentikan deposit dari kontrak (menghindari kehilangan token secara tidak sengaja)
        require(!Address.isContract(msg.sender), "Akun bukan EOA");
        _;
    }
```

Inilah alasan kami membutuhkan utilitas `Address` OpenZeppelin.

```solidity
    /**
     * @dev Fungsi ini dapat dipanggil tanpa data
     * untuk mendepositokan sejumlah ETH ke saldo pemanggil di L2.
     * Karena fungsi terima tidak mengambil data, jumlah
     * default konservatif diteruskan ke L2.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

Fungsi ini ada untuk tujuan pengujian.
Perhatikan bahwa itu tidak muncul dalam definisi antarmuka - ini bukan untuk penggunaan normal.

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

Kedua fungsi ini membungkus `_initiateETHDeposit`, fungsi yang menangani deposit ETH yang sebenarnya.

```solidity
    /**
     * @dev Melakukan logika untuk deposit dengan menyimpan ETH dan memberitahukan L2 ETH Gateway tentang
     * deposit tersebut.
     * @param _from Akun untuk menarik deposit dari L1.
     * @param _to Akun untuk memberikan deposit ke L2.
     * @param _l2Gas Batas gas yang diperlukan untuk menyelesaikan deposit di L2.
     * @param _data Data opsional untuk diteruskan ke L2. Data ini disediakan
     *        semata-mata untuk kemudahan kontrak eksternal. Selain memberlakukan panjang maksimum,
     *        kontrak-kontrak ini tidak memberikan jaminan tentang isinya.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // Buat calldata untuk panggilan finalizeDeposit
        bytes memory message = abi.encodeWithSelector(
```

Cara kerja pesan lintas domain adalah kontrak tujuan dipanggil dengan pesan sebagai calldata-nya.
Kontrak Solidity selalu menafsirkan calldata mereka sesuai dengan
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

Pesan di sini adalah untuk memanggil [fungsi `finalizeDeposit`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) dengan parameter-parameter berikut:

| Parameter                       | Nilai                                                                                    | Arti                                                                                                                                                              |
| ------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                                                            | Nilai khusus untuk mewakili ETH (yang bukan token ERC-20) di L1                                                                                |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | Kontrak L2 yang mengelola ETH di Optimism, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (kontrak ini hanya untuk penggunaan internal Optimism) |
| \_from    | \_from                                                             | Alamat di L1 yang mengirim ETH                                                                                                                                    |
| \_to      | \_to                                                               | Alamat di L2 yang menerima ETH                                                                                                                                    |
| amount                          | msg.value                                                                | Jumlah wei yang dikirim (yang sudah dikirim ke jembatan)                                                                                       |
| \_data    | \_data                                                             | Data tambahan untuk dilampirkan ke deposit                                                                                                                        |

```solidity
        // Kirim calldata ke L2
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

Kirim pesan melalui cross domain messenger.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

Pancarkan event untuk menginformasikan setiap aplikasi terdesentralisasi yang mendengarkan transfer ini.

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

Kedua fungsi ini membungkus `_initiateERC20Deposit`, fungsi yang menangani deposit ERC-20 yang sebenarnya.

```solidity
    /**
     * @dev Melakukan logika untuk deposit dengan memberitahukan kontrak Token Deposit L2
     * tentang deposit dan memanggil handler untuk mengunci dana L1. (misalnya, transferFrom)
     *
     * @param _l1Token Alamat ERC20 L1 yang kita depositokan
     * @param _l2Token Alamat ERC20 L2 yang sesuai dengan L1
     * @param _from Akun untuk menarik deposit dari L1
     * @param _to Akun untuk memberikan deposit ke L2
     * @param _amount Jumlah ERC20 yang akan didepositokan.
     * @param _l2Gas Batas gas yang diperlukan untuk menyelesaikan deposit di L2.
     * @param _data Data opsional untuk diteruskan ke L2. Data ini disediakan
     *        semata-mata untuk kemudahan kontrak eksternal. Selain memberlakukan panjang maksimum,
     *        kontrak-kontrak ini tidak memberikan jaminan tentang isinya.
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
Perbedaan pertama adalah fungsi ini menerima alamat token dan jumlah yang akan ditransfer sebagai parameter.
Dalam kasus ETH, panggilan ke jembatan sudah termasuk transfer aset ke akun jembatan (`msg.value`).

```solidity
        // Ketika deposit diinisiasi di L1, Jembatan L1 mentransfer dana ke dirinya sendiri untuk penarikan
        // di masa depan. safeTransferFrom juga memeriksa apakah kontrak memiliki kode, jadi ini akan gagal jika
        // _from adalah EOA atau address(0).
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

Transfer token ERC-20 mengikuti proses yang berbeda dari ETH:

1. Pengguna (`_from`) memberikan allowance ke jembatan untuk mentransfer token yang sesuai.
2. Pengguna memanggil jembatan dengan alamat kontrak token, jumlahnya, dll.
3. Jembatan mentransfer token (ke dirinya sendiri) sebagai bagian dari proses deposit.

Langkah pertama mungkin terjadi dalam transaksi terpisah dari dua yang terakhir.
Namun, front-running tidak menjadi masalah karena dua fungsi yang memanggil `_initiateERC20Deposit` (`depositERC20` dan `depositERC20To`) hanya memanggil fungsi ini dengan `msg.sender` sebagai parameter `_from`.

```solidity
        // Buat calldata untuk _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // Kirim calldata ke L2
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

Tambahkan jumlah token yang didepositokan ke struktur data `deposits`.
Mungkin ada beberapa alamat di L2 yang sesuai dengan token L1 ERC-20 yang sama, jadi tidak cukup menggunakan saldo jembatan token L1 ERC-20 untuk melacak deposit.

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * Fungsi Lintas Rantai *
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

Jembatan L2 mengirim pesan ke cross domain messenger L2 yang menyebabkan cross domain messenger L1 memanggil fungsi ini (setelah [transaksi yang menyelesaikan pesan](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) dikirimkan di L1, tentu saja).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Pastikan bahwa ini adalah pesan yang _sah_, yang berasal dari cross domain messenger dan berasal dari jembatan token L2.
Fungsi ini digunakan untuk menarik ETH dari jembatan, jadi kita harus memastikan itu hanya dipanggil oleh pemanggil yang berwenang.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

Cara mentransfer ETH adalah dengan memanggil penerima dengan jumlah wei di `msg.value`.

```solidity
        require(success, "TransferHelper::safeTransferETH: transfer ETH gagal");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

Pancarkan event tentang penarikan.

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

        // Ketika penarikan difinalisasi di L1, Jembatan L1 mentransfer dana ke penarik
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * Sementara - Memigrasi ETH *
     *****************************/

    /**
     * @dev Menambahkan saldo ETH ke akun. Ini dimaksudkan untuk memungkinkan ETH
     * dimigrasikan dari gateway lama ke gateway baru.
     * CATATAN: Ini dibiarkan untuk satu peningkatan saja sehingga kami dapat menerima ETH yang dimigrasikan dari
     * kontrak lama
     */
    function donateETH() external payable {}
}
```

Ada implementasi jembatan sebelumnya.
Ketika kami pindah dari implementasi ke yang ini, kami harus memindahkan semua aset.
Token ERC-20 hanya dapat dipindahkan.
Namun, untuk mentransfer ETH ke kontrak, Anda memerlukan persetujuan kontrak itu, yang diberikan `donateETH` kepada kami.

## Token ERC-20 di L2 {#erc-20-tokens-on-l2}

Agar token ERC-20 sesuai dengan jembatan standar, token tersebut perlu mengizinkan jembatan standar, dan _hanya_ jembatan standar, untuk mencetak token.
Hal ini diperlukan karena jembatan perlu memastikan bahwa jumlah token yang beredar di Optimism sama dengan jumlah token yang dikunci di dalam kontrak jembatan L1.
Jika ada terlalu banyak token di L2, beberapa pengguna tidak akan dapat menjembatani aset mereka kembali ke L1.
Alih-alih jembatan terpercaya, pada dasarnya kita akan menciptakan kembali [perbankan cadangan fraksional](https://www.investopedia.com/terms/f/fractionalreservebanking.asp).
Jika ada terlalu banyak token di L1, beberapa dari token tersebut akan tetap terkunci di dalam kontrak jembatan selamanya karena tidak ada cara untuk melepaskannya tanpa membakar token L2.

### IL2StandardERC20 {#il2standarderc20}

Setiap token ERC-20 di L2 yang menggunakan jembatan standar perlu menyediakan [antarmuka ini](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol), yang memiliki fungsi dan event yang dibutuhkan oleh jembatan standar.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Antarmuka ERC-20 standar](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) tidak menyertakan fungsi `mint` dan `burn`.
Metode tersebut tidak diwajibkan oleh [standar ERC-20](https://eips.ethereum.org/EIPS/eip-20), yang membuat mekanisme untuk membuat dan menghancurkan token tidak ditentukan.

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[Antarmuka ERC-165](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) digunakan untuk menentukan fungsi apa yang disediakan oleh sebuah kontrak.
[Anda dapat membaca standar di sini](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

Fungsi ini memberikan alamat token L1 yang dijembatani ke kontrak ini.
Perhatikan bahwa kita tidak memiliki fungsi serupa dalam arah yang berlawanan.
Kita harus dapat menjembatani token L1 apa pun, terlepas dari apakah dukungan L2 direncanakan saat diimplementasikan atau tidak.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

Fungsi dan event untuk mencetak (membuat) dan membakar (menghancurkan) token.
Jembatan harus menjadi satu-satunya entitas yang dapat menjalankan fungsi ini untuk memastikan jumlah token benar (sama dengan jumlah token yang dikunci pada L1).

### L2StandardERC20 {#L2StandardERC20}

[Ini adalah implementasi kami dari antarmuka `IL2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
Kecuali Anda memerlukan semacam logika khusus, Anda harus menggunakan yang ini.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[Kontrak ERC-20 OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Optimism tidak percaya pada penemuan kembali roda, terutama ketika roda diaudit dengan baik dan harus cukup dapat dipercaya untuk memegang aset.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

Ini adalah dua parameter konfigurasi tambahan yang kami butuhkan dan ERC-20 biasanya tidak.

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

Pertama, panggil konstruktor untuk kontrak yang kita warisi (`ERC20(_name, _symbol)`) dan kemudian atur variabel kita sendiri.

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Hanya Jembatan L2 yang dapat mencetak dan membakar");
        _;
    }


    // slither-disable-next-line external-function
    function supportsInterface(bytes4 _interfaceId) public pure returns (bool) {
        bytes4 firstSupportedInterface = bytes4(keccak256("supportsInterface(bytes4)")); // ERC165
        bytes4 secondSupportedInterface = IL2StandardERC20.l1Token.selector ^
            IL2StandardERC20.mint.selector ^
            IL2StandardERC20.burn.selector;
        return _interfaceId == firstSupportedInterface || _interfaceId == secondSupportedInterface;
    }
```

Ini adalah cara kerja [ERC-165](https://eips.ethereum.org/EIPS/eip-165).
Setiap antarmuka adalah sejumlah fungsi yang didukung, dan diidentifikasi sebagai [exclusive or](https://en.wikipedia.org/wiki/Exclusive_or) dari [selektor fungsi ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) dari fungsi-fungsi tersebut.

Jembatan L2 menggunakan ERC-165 sebagai pemeriksaan kewarasan untuk memastikan bahwa kontrak ERC-20 tempatnya mengirim aset adalah `IL2StandardERC20`.

**Catatan:** Tidak ada yang dapat mencegah kontrak nakal memberikan jawaban palsu ke `supportsInterface`, jadi ini adalah mekanisme pemeriksaan kewarasan, _bukan_ mekanisme keamanan.

```solidity
    // slither-disable-next-line external-function
    function mint(address _to, uint256 _amount) public virtual onlyL2Bridge {
        _mint(_to, _amount);

        emit Mint(_to, _amount);
    }

    // slither-disable-next-line external-function
    function burn(address _from, uint256 _amount) public virtual onlyL2Bridge {
        _burn(_from, _amount);

        emit Burn(_from, _amount);
    }
}
```

Hanya jembatan L2 yang diizinkan untuk mencetak dan membakar aset.

`_mint` dan `_burn` sebenarnya didefinisikan dalam [kontrak OpenZeppelin ERC-20](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).
Kontrak itu hanya tidak mengeksposnya secara eksternal, karena kondisi untuk mencetak dan membakar token sangat beragam seperti jumlah cara untuk menggunakan ERC-20.

## Kode Jembatan L2 {#l2-bridge-code}

Ini adalah kode yang menjalankan jembatan pada Optimism.
[Sumber untuk kontrak ini ada di sini](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Impor Antarmuka */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

Antarmuka [IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) sangat mirip dengan [padanan L1](#IL1ERC20Bridge) yang kita lihat di atas.
Ada dua perbedaan yang signifikan:

1. Di L1 Anda menginisiasi deposit dan memfinalisasi penarikan.
   Di sini Anda menginisiasi penarikan dan memfinalisasi deposit.
2. Di L1, perlu untuk membedakan antara token ETH dan ERC-20.
   Di L2 kita dapat menggunakan fungsi yang sama untuk keduanya karena secara internal saldo ETH di Optimism ditangani sebagai token ERC-20 dengan alamat [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000).

```solidity
/* Impor Pustaka */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Impor Kontrak */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev Jembatan Standar L2 adalah kontrak yang bekerja sama dengan jembatan Standar L1 untuk
 * memungkinkan transisi ETH dan ERC20 antara L1 dan L2.
 * Kontrak ini bertindak sebagai pencetak untuk token baru ketika mendengar tentang deposit ke jembatan Standar L1
 *.
 * Kontrak ini juga bertindak sebagai pembakar token yang dimaksudkan untuk penarikan, memberitahukan jembatan L1
 * untuk melepaskan dana L1.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * Referensi Kontrak Eksternal *
     ********************************/

    address public l1TokenBridge;
```

Melacak alamat jembatan L1.
Perhatikan bahwa berbeda dengan padanan L1, di sini kita _membutuhkan_ variabel ini.
Alamat jembatan L1 tidak diketahui sebelumnya.

```solidity

    /***************
     * Konstruktor *
     ***************/

    /**
     * @param _l2CrossDomainMessenger Messenger lintas-domain yang digunakan oleh kontrak ini.
     * @param _l1TokenBridge Alamat jembatan L1 yang di-deploy ke rantai utama.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * Melakukan Penarikan *
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
Token L2 diharapkan memberi tahu kami alamat yang setara dengan L1.

```solidity

    /**
     * @dev Melakukan logika untuk penarikan dengan membakar token dan memberitahukan
     *      Gateway token L1 tentang penarikan.
     * @param _l2Token Alamat token L2 tempat penarikan diinisiasi.
     * @param _from Akun untuk menarik penarikan dari L2.
     * @param _to Akun untuk memberikan penarikan ke L1.
     * @param _amount Jumlah token yang akan ditarik.
     * @param _l1Gas Tidak digunakan, tetapi disertakan untuk pertimbangan kompatibilitas ke depan.
     * @param _data Data opsional untuk diteruskan ke L1. Data ini disediakan
     *        semata-mata untuk kemudahan kontrak eksternal. Selain memberlakukan panjang maksimum,
     *        kontrak-kontrak ini tidak memberikan jaminan tentang isinya.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // Ketika penarikan diinisiasi, kami membakar dana penarik untuk mencegah penggunaan L2
        // selanjutnya
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

Perhatikan bahwa kita _tidak_ mengandalkan parameter `_from` tetapi pada `msg.sender` yang jauh lebih sulit untuk dipalsukan (tidak mungkin, sejauh yang saya tahu).

```solidity

        // Buat calldata untuk l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

Di L1 perlu dibedakan antara ETH dan ERC-20.

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

        // Kirim pesan ke jembatan L1
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * Fungsi Lintas Rantai: Melakukan Deposit *
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

Pastikan sumber pesan itu sah.
Ini penting karena fungsi ini memanggil `_mint` dan dapat digunakan untuk memberikan token yang tidak tercakup oleh token yang dimiliki jembatan pada L1.

```solidity
        // Periksa token target sesuai dan
        // verifikasi token yang didepositokan di L1 cocok dengan representasi token deposit L2 di sini
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

Pemeriksaan kewarasan:

1. Antarmuka yang benar didukung
2. Alamat L1 kontrak L2 ERC-20 cocok dengan sumber token L1

```solidity
        ) {
            // Ketika deposit difinalisasi, kami mengkreditkan akun di L2 dengan jumlah
            // token yang sama.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

Jika pemeriksaan kewarasan lulus, selesaikan deposit:

1. Cetak tokennya
2. Keluarkan event yang sesuai

```solidity
        } else {
            // Entah token L2 yang didepositokan tidak setuju tentang alamat yang benar
            // dari token L1-nya, atau tidak mendukung antarmuka yang benar.
            // Ini hanya boleh terjadi jika ada token L2 yang berbahaya, atau jika pengguna entah bagaimana
            // menentukan alamat token L2 yang salah untuk didepositokan.
            // Dalam kedua kasus, kami menghentikan proses di sini dan membuat pesan penarikan
            // sehingga pengguna dapat mengeluarkan dana mereka dalam beberapa kasus.
            // Tidak ada cara untuk mencegah kontrak token berbahaya sama sekali, tetapi ini membatasi
            // kesalahan pengguna dan mengurangi beberapa bentuk perilaku kontrak berbahaya.
```

Jika pengguna membuat kesalahan yang dapat dideteksi dengan menggunakan alamat token L2 yang salah, kami ingin membatalkan deposit dan mengembalikan token pada L1.
Satu-satunya cara kita dapat melakukan ini dari L2 adalah mengirim pesan yang harus menunggu periode tantangan kesalahan, tetapi itu jauh lebih baik bagi pengguna daripada kehilangan token secara permanen.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // menukar _to dan _from di sini untuk mengembalikan deposit ke pengirim
                _from,
                _amount,
                _data
            );

            // Kirim pesan ke jembatan L1
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## Kesimpulan {#conclusion}

Jembatan standar adalah mekanisme yang paling fleksibel untuk transfer aset.
Namun, karena sangat umum, mekanisme ini tidak selalu paling mudah digunakan.
Khusus untuk penarikan, sebagian besar pengguna lebih suka menggunakan [jembatan pihak ketiga](https://optimism.io/apps#bridge) yang tidak menunggu periode tantangan dan tidak memerlukan bukti Merkle untuk menyelesaikan penarikan.

Jembatan-jembatan ini biasanya bekerja dengan memiliki aset di L1, yang mereka berikan segera dengan biaya yang kecil (seringkali lebih murah daripada biaya gas untuk penarikan jembatan standar).
Ketika jembatan (atau orang yang menjalankannya) mengantisipasi kekurangan aset L1, ia mentransfer aset yang cukup dari L2. Karena ini adalah penarikan yang sangat besar, biaya penarikan diamortisasi dalam jumlah besar dan persentasenya jauh lebih kecil.

Semoga artikel ini membantu Anda lebih memahami tentang cara kerja lapisan 2, dan cara menulis kode Solidity yang jelas dan aman.

[Lihat di sini untuk lebih banyak pekerjaan saya](https://cryptodocguy.pro/).
