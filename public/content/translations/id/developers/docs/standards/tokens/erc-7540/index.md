---
title: Standar Brankas Tokenisasi Asinkron ERC-7540
description: Ekstensi dari ERC-4626 yang menambahkan alur deposit dan penebusan asinkron untuk brankas yang ditokenisasi.
lang: id
---

## Pengantar {#introduction}

ERC-7540 memperluas [Standar Brankas Tokenisasi ERC-4626](/developers/docs/standards/tokens/erc-4626/) dengan menambahkan dukungan untuk alur deposit dan penebusan asinkron. Ini memperkenalkan pola minta-lalu-klaim (request-then-claim): pengguna pertama-tama mengirimkan permintaan (mengunci aset atau saham mereka), lalu mengklaim hasilnya setelah brankas memprosesnya.

Ini diperlukan ketika sebuah brankas tidak dapat melakukan penyelesaian secara instan dalam satu transaksi, misalnya:

- Protokol aset dunia nyata (RWA) seperti perbendaharaan yang ditokenisasi, kredit swasta, dan aset lainnya dengan siklus penyelesaian T+1 atau T+2
- Peminjaman dengan agunan rendah (undercollateralized) di mana penilaian kredit terjadi secara offchain
- Strategi brankas lintas rantai di mana proses bridging (penjembatanan) menimbulkan penundaan
- Token staking likuid (LST) dengan periode pelepasan ikatan (unbonding)

Brankas dapat memilih untuk menjadi asinkron hanya pada deposit, hanya pada penebusan, atau keduanya. Fleksibilitas ini memungkinkan pengembang brankas menambahkan alur asinkron hanya di tempat strategi dasarnya membutuhkannya, sambil menjaga sisi lainnya tetap sinkron.

## Prasyarat {#prerequisites}

Untuk lebih memahami halaman ini, kami sarankan Anda membaca terlebih dahulu tentang [standar token](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/), dan [ERC-4626](/developers/docs/standards/tokens/erc-4626/).

## ERC-4626 vs ERC-7540 {#comparison}

Dalam ERC-4626, sebuah deposit diselesaikan secara atomik: investor mengirimkan aset dan menerima kembali saham dalam satu transaksi tunggal.

![ERC-4626 synchronous deposit flow](./erc-4626-sync-flow.svg)

ERC-7540 membagi ini menjadi dua langkah. Investor pertama-tama memanggil `requestDeposit()` untuk mengunci aset, lalu menunggu manajer brankas memproses permintaan tersebut. Setelah terpenuhi, investor memanggil `deposit()` untuk mengklaim saham mereka. Nilai tukar ditentukan pada saat pemenuhan, bukan pada saat permintaan.

![ERC-7540 asynchronous deposit flow](./erc-7540-async-flow.svg)

Alur penebusan bekerja dengan cara yang sama: `requestRedeem()` mengunci saham, dan setelah terpenuhi investor memanggil `redeem()` untuk mengklaim aset.

## Fungsi dan Fitur ERC-7540 {#body}

ERC-7540 mewarisi antarmuka ERC-4626 secara penuh tetapi menggunakan kembali `deposit`/`mint`/`withdraw`/`redeem` sebagai fungsi klaim. Fungsi `requestDeposit` dan `requestRedeem` yang baru menangani langkah permintaan awal.

Setiap permintaan bergerak melalui tiga state: tertunda (dikirimkan, menunggu pemrosesan), dapat diklaim (terpenuhi dan diberi harga), dan terklaim (investor telah mengumpulkan saham atau aset mereka).

![Request lifecycle: Pending, Claimable, Claimed](./request-lifecycle.svg)

### Alur permintaan deposit {#deposit-request-flow}

#### requestDeposit {#requestdeposit}

```solidity
function requestDeposit(uint256 assets, address controller, address owner) external returns (uint256 requestId)
```

Mentransfer `assets` dari `owner` ke dalam brankas dan mengirimkan permintaan untuk deposit. Alamat `controller` menerima kendali atas permintaan tersebut. Mengembalikan `requestId` yang mengidentifikasi batch permintaan.

#### pendingDepositRequest {#pendingdepositrequest}

```solidity
function pendingDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

Mengembalikan jumlah `assets` dalam permintaan deposit yang tertunda (belum dapat diklaim) untuk `controller` dan `requestId` yang diberikan.

#### claimableDepositRequest {#claimabledepositrequest}

```solidity
function claimableDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

Mengembalikan jumlah `assets` dalam permintaan deposit yang dapat diklaim (terpenuhi tetapi belum terklaim) untuk `controller` dan `requestId` yang diberikan.

#### Mengklaim deposit {#claiming-deposits}

Setelah permintaan deposit menjadi dapat diklaim, pengguna memanggil fungsi standar ERC-4626 [`deposit`](/developers/docs/standards/tokens/erc-4626/#deposit) atau [`mint`](/developers/docs/standards/tokens/erc-4626/#mint) untuk mengklaim saham mereka. Dalam ERC-7540, fungsi-fungsi ini tidak lagi mentransfer aset (itu sudah terjadi pada saat permintaan). Mereka hanya mencetak saham ke penerima.

### Alur permintaan penebusan {#redemption-request-flow}

#### requestRedeem {#requestredeem}

```solidity
function requestRedeem(uint256 shares, address controller, address owner) external returns (uint256 requestId)
```

Mengunci `shares` dari `owner` dan mengirimkan permintaan untuk menebus. Alamat `controller` menerima kendali atas permintaan tersebut.

#### pendingRedeemRequest {#pendingredeemrequest}

```solidity
function pendingRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

Mengembalikan jumlah `shares` dalam permintaan penebusan yang tertunda untuk `controller` dan `requestId` yang diberikan.

#### claimableRedeemRequest {#claimableredeemrequest}

```solidity
function claimableRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

Mengembalikan jumlah `shares` dalam permintaan penebusan yang dapat diklaim untuk `controller` dan `requestId` yang diberikan.

#### Mengklaim penebusan {#claiming-redemptions}

Setelah permintaan penebusan menjadi dapat diklaim, pengguna memanggil fungsi standar ERC-4626 [`redeem`](/developers/docs/standards/tokens/erc-4626/#redeem) atau [`withdraw`](/developers/docs/standards/tokens/erc-4626/#withdraw) untuk mengklaim aset mereka.

### Manajemen operator {#operator-management}

ERC-7540 menyertakan pola operator (dari [ERC-6909](https://eips.ethereum.org/EIPS/eip-6909)) yang memungkinkan pihak ketiga untuk mengelola permintaan atas nama pengguna.

#### setOperator {#setoperator}

```solidity
function setOperator(address operator, bool approved) external returns (bool)
```

Menyetujui atau mencabut `operator` untuk bertindak atas nama `msg.sender` untuk permintaan dan klaim deposit/penebusan.

#### isOperator {#isoperator}

```solidity
function isOperator(address controller, address operator) external view returns (bool)
```

Mengembalikan apakah `operator` disetujui untuk bertindak atas nama `controller`.

### ID Permintaan {#request-ids}

ID Permintaan membedakan antara batch permintaan yang berbeda. Semua permintaan yang berbagi `requestId` yang sama bersifat sepadan (fungible): mereka bertransisi antar state secara bersamaan dan menerima nilai tukar yang sama.

Ketika sebuah brankas mengembalikan `requestId = 0` untuk semua permintaan, hanya alamat `controller` yang membedakan state permintaan. Beberapa permintaan dari pengontrol yang sama akan diagregasi.

### Peristiwa {#events}

#### Peristiwa DepositRequest {#depositrequest-event}

HARUS dipancarkan ketika permintaan deposit dikirimkan melalui [`requestDeposit`](#requestdeposit).

```solidity
event DepositRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 assets
)
```

#### Peristiwa RedeemRequest {#redeemrequest-event}

HARUS dipancarkan ketika permintaan penebusan dikirimkan melalui [`requestRedeem`](#requestredeem).

```solidity
event RedeemRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 shares
)
```

#### Peristiwa OperatorSet {#operatorset-event}

HARUS dipancarkan ketika seorang operator disetujui atau dicabut melalui [`setOperator`](#setoperator).

```solidity
event OperatorSet(
    address indexed controller,
    address indexed operator,
    bool approved
)
```

### Fungsi pratinjau {#preview-functions}

Fungsi pratinjau harus mengembalikan (revert) hanya untuk alur yang asinkron, karena nilai tukar tidak diketahui sampai permintaan terpenuhi. Dalam brankas deposit asinkron, `previewDeposit` dan `previewMint` HARUS mengembalikan, sementara `previewRedeem` dan `previewWithdraw` tetap bekerja seperti dalam ERC-4626 (dan sebaliknya untuk brankas penebusan asinkron). Ini adalah perbedaan perilaku utama dari ERC-4626.

## Bacaan lebih lanjut {#further-reading}

- [EIP-7540: Brankas Tokenisasi ERC-4626 Asinkron](https://eips.ethereum.org/EIPS/eip-7540)
- [EIP-4626: Standar Brankas Tokenisasi](https://eips.ethereum.org/EIPS/eip-4626)
- [Implementasi ERC-7540 OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-community-contracts/blob/master/contracts/token/ERC20/extensions/ERC7540.sol)