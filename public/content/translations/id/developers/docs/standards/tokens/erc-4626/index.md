---
title: Standar Brankas Tertokenisasi ERC-4626
description: Standar untuk brankas yang menghasilkan imbal hasil.
lang: id
---

## Pengantar {#introduction}

ERC-4626 adalah standar untuk mengoptimalkan dan menyatukan parameter teknis dari brankas yang menghasilkan imbal hasil. Standar ini menyediakan API standar untuk brankas yang menghasilkan imbal hasil tertokenisasi yang mewakili saham dari satu token ERC-20 yang mendasarinya. ERC-4626 juga menguraikan ekstensi opsional untuk brankas tertokenisasi yang menggunakan ERC-20, menawarkan fungsionalitas dasar untuk menyetorkan, melakukan penarikan token, dan membaca saldo.

**Peran ERC-4626 dalam brankas yang menghasilkan imbal hasil**

Pasar peminjaman, agregator, dan token yang secara intrinsik menghasilkan bunga membantu pengguna menemukan imbal hasil terbaik pada token kripto mereka dengan mengeksekusi berbagai strategi. Strategi-strategi ini dilakukan dengan sedikit variasi, yang mungkin rentan terhadap kesalahan atau membuang-buang sumber daya pengembangan.

ERC-4626 dalam brankas yang menghasilkan imbal hasil akan menurunkan upaya integrasi dan membuka akses ke imbal hasil di berbagai aplikasi dengan sedikit upaya khusus dari pengembang dengan menciptakan pola implementasi yang lebih konsisten dan tangguh.

Token ERC-4626 dijelaskan sepenuhnya dalam [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626).

**Ekstensi brankas asinkron (ERC-7540)**

ERC-4626 dioptimalkan untuk setoran dan penebusan atomik hingga batas tertentu. Jika batas tersebut tercapai, tidak ada setoran atau penebusan baru yang dapat diajukan. Keterbatasan ini tidak berfungsi dengan baik untuk sistem kontrak pintar apa pun dengan tindakan asinkron atau penundaan sebagai prasyarat untuk berinteraksi dengan Brankas (misalnya, protokol aset dunia nyata, protokol peminjaman dengan agunan rendah, protokol peminjaman lintas rantai, token staking likuid (LST), atau modul keamanan asuransi).

ERC-7540 memperluas utilitas Brankas ERC-4626 untuk kasus penggunaan asinkron. Antarmuka Brankas yang ada (`deposit`/`withdraw`/`mint`/`redeem`) dimanfaatkan sepenuhnya untuk melakukan klaim Permintaan asinkron.

Ekstensi ERC-7540 dijelaskan sepenuhnya dalam [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540).

**Ekstensi brankas multi-aset (ERC-7575)**

Salah satu kasus penggunaan yang hilang dan tidak didukung oleh ERC-4626 adalah Brankas yang memiliki banyak aset atau titik masuk seperti Token penyedia likuiditas (LP). Ini umumnya sulit dikelola atau tidak patuh karena persyaratan ERC-4626 untuk menjadi ERC-20 itu sendiri.

ERC-7575 menambahkan dukungan untuk Brankas dengan banyak aset dengan mengeksternalisasi implementasi token ERC-20 dari implementasi ERC-4626.

Ekstensi ERC-7575 dijelaskan sepenuhnya dalam [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575).

## Prasyarat {#prerequisites}

Untuk lebih memahami halaman ini, kami sarankan Anda membaca terlebih dahulu tentang [standar token](/developers/docs/standards/tokens/) dan [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Fungsi dan Fitur ERC-4626: {#body}

### Metode {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

Fungsi ini mengembalikan alamat token yang mendasarinya yang digunakan untuk brankas untuk akuntansi, penyetoran, penarikan.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

Fungsi ini mengembalikan jumlah total aset yang mendasarinya yang dipegang oleh brankas.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

Fungsi ini mengembalikan jumlah `shares` yang akan ditukarkan oleh brankas untuk jumlah `assets` yang diberikan.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Fungsi ini mengembalikan jumlah `assets` yang akan ditukarkan oleh brankas untuk jumlah `shares` yang diberikan.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

Fungsi ini mengembalikan jumlah maksimum aset yang mendasarinya yang dapat disetorkan dalam satu panggilan [`deposit`](#deposit), dengan saham yang dicetak untuk `receiver`.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

Fungsi ini memungkinkan pengguna untuk menyimulasikan efek dari setoran mereka pada blok saat ini.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Fungsi ini menyetorkan `assets` token yang mendasarinya ke dalam brankas dan memberikan kepemilikan `shares` kepada `receiver`.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

Fungsi ini mengembalikan jumlah maksimum saham yang dapat dicetak dalam satu panggilan [`mint`](#mint), dengan saham yang dicetak untuk `receiver`.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

Fungsi ini memungkinkan pengguna untuk menyimulasikan efek dari pencetakan mereka pada blok saat ini.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Fungsi ini mencetak tepat `shares` saham brankas ke `receiver` dengan menyetorkan `assets` token yang mendasarinya.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

Fungsi ini mengembalikan jumlah maksimum aset yang mendasarinya yang dapat ditarik dari saldo `owner` dengan satu panggilan [`withdraw`](#withdraw).

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

Fungsi ini memungkinkan pengguna untuk menyimulasikan efek dari penarikan mereka pada blok saat ini.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Fungsi ini membakar `shares` dari `owner` dan mengirimkan tepat `assets` token dari brankas ke `receiver`.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

Fungsi ini mengembalikan jumlah maksimum saham yang dapat ditebus dari saldo `owner` melalui panggilan [`redeem`](#redeem).

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

Fungsi ini memungkinkan pengguna untuk menyimulasikan efek dari penebusan mereka pada blok saat ini.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Fungsi ini menebus sejumlah tertentu `shares` dari `owner` dan mengirimkan `assets` token yang mendasarinya dari brankas ke `receiver`.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Mengembalikan jumlah total saham brankas yang belum ditebus yang beredar.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Mengembalikan jumlah total saham brankas yang saat ini dimiliki oleh `owner`.

### Peta antarmuka {#mapoftheinterface}

![Map of the ERC-4626 interface](./map-of-erc-4626.png)

### Peristiwa {#events}

#### Peristiwa Setoran {#deposit-event}

**WAJIB** dipancarkan ketika token disetorkan ke dalam brankas melalui metode [`mint`](#mint) dan [`deposit`](#deposit).

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Di mana `sender` adalah pengguna yang menukarkan `assets` dengan `shares`, dan mentransfer `shares` tersebut ke `owner`.

#### Peristiwa Penarikan {#withdraw-event}

**WAJIB** dipancarkan ketika saham ditarik dari brankas oleh penyetor dalam metode [`redeem`](#redeem) atau [`withdraw`](#withdraw).

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Di mana `sender` adalah pengguna yang memicu penarikan dan menukarkan `shares`, yang dimiliki oleh `owner`, dengan `assets`. `receiver` adalah pengguna yang menerima `assets` yang ditarik.

## Bacaan lebih lanjut {#further-reading}

- [EIP-4626: Standar brankas Tertokenisasi](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: Repo GitHub](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)