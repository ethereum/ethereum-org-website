---
title: ERC-4626 Standar Brankas Ber-Tokenisasi
description: Sebuah standar untuk brankas penahan hasil.
lang: id
---

## Pengenalan {#introduction}

ERC-4626 adalah standar yang bertujuan untuk mengoptimalkan dan menyatukan parameter teknis dari vault yang menghasilkan imbal hasil. Standar ini menyediakan API baku untuk vault yang menghasilkan imbal hasil dan telah ditokenisasi, di mana vault tersebut mewakili kepemilikan dari satu token ERC-20 tertentu. ERC-4626 juga menjabarkan ekstensi opsional untuk vault yang ditokenisasi menggunakan ERC-20, yang menyediakan fungsionalitas dasar untuk menyetor, menarik token, dan membaca saldo.

**Peran ERC-4626 dalam brankas yang menghasilkan hasil**

Pasar pinjaman, agregator, dan token yang secara intrinsik menghasilkan bunga membantu pengguna menemukan hasil terbaik dari token kripto mereka dengan mengeksekusi berbagai strategi. Strategi-strategi ini dilakukan dengan variasi kecil, yang bisa rentan terhadap kesalahan atau membuang sumber daya pengembangan.

ERC-4626 pada vault yang menghasilkan yield akan mengurangi upaya integrasi dan membuka akses ke yield di berbagai aplikasi dengan sedikit usaha khusus dari pengembang, dengan menciptakan pola implementasi yang lebih konsisten dan andal.

Token ERC-4626 dijelaskan sepenuhnya di [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626).

**Perluasan vault ekstensi (ERC-7540)**

ERC-4626 dioptimalkan untuk setoran dan penarikan secara atomik hingga batas tertentu. Jika batas tercapai, tidak ada setoran atau penarikan baru yang dapat diajukan. Batasan ini tidak bekerja dengan baik untuk sistem kontrak pintar apa pun dengan tindakan asinkron atau penundaan sebagai prasyarat untuk berinteraksi dengan Vault (misalnya, protokol aset dunia nyata, protokol pinjaman tanpa jaminan penuh, protokol pinjaman lintas-chain, token staking likuid, atau modul keamanan asuransi).

ERC-7540 memperluas kegunaan Vault ERC-4626 untuk kasus penggunaan asinkron. Antarmuka Vault yang ada (`deposit`/`withdraw`/`mint`/`redeem`) sepenuhnya digunakan untuk mengklaim Permintaan asinkron.

Ekstensi ERC-7540 dijelaskan sepenuhnya di [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540).

**Ekstensi vault multi-aset (ERC-7575)**

Salah satu kasus penggunaan yang tidak didukung oleh ERC-4626 adalah Vault yang memiliki beberapa aset atau titik masuk, seperti token penyedia likuiditas (LP Tokens). Secara umum, hal ini cenderung sulit diatur atau tidak sesuai standar karena ERC-4626 mensyaratkan dirinya sendiri untuk menjadi ERC-20.

ERC-7575 menambahkan dukungan untuk Vault yang memiliki banyak aset dengan mengeksternalisasi implementasi token ERC-20 dari implementasi ERC-4626.

Ekstensi ERC-7575 dijelaskan sepenuhnya di [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575).

## Persyaratan {#prerequisites}

Untuk lebih memahami halaman ini, kami sarankan Anda membaca terlebih dahulu tentang [standar token](/developers/docs/standards/tokens/) dan [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Fungsi dan Fitur ERC-4626: {#body}

### Methods {#methods}

#### aset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

Fungsi ini mengembalikan alamat token dasar yang digunakan oleh vault untuk tujuan akuntansi, deposit, dan penarikan.

#### totalAset {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

Fungsi ini mengembalikan jumlah total aset dasar yang dimiliki oleh vault.

#### konversiKeSaham {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

Fungsi ini mengembalikan jumlah `shares` yang akan ditukarkan oleh vault dengan jumlah `assets` yang diberikan.

#### konversiKeAset {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Fungsi ini mengembalikan jumlah `assets` yang akan ditukarkan oleh vault dengan jumlah `shares` yang diberikan.

#### depositMaks {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

Fungsi ini mengembalikan jumlah maksimum aset dasar yang dapat didepositokan dalam satu panggilan [`deposit`](#deposit), dengan saham yang dicetak untuk `receiver`.

#### pratinjauDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

Fungsi ini memungkinkan pengguna untuk mensimulasikan efek dari setoran mereka pada blok saat ini.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Fungsi ini mendepositokan `assets` dari token dasar ke dalam vault dan memberikan kepemilikan `shares` kepada `receiver`.

#### cetakMaks {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

Fungsi ini mengembalikan jumlah maksimum saham yang dapat dicetak dalam satu panggilan [`mint`](#mint), dengan saham yang dicetak untuk `receiver`.

#### pratinjauCetak {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

Fungsi ini memungkinkan pengguna untuk mensimulasikan efek dari proses mint mereka pada blok saat ini.

#### cetak {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Fungsi ini mencetak tepat `shares` saham vault kepada `receiver` dengan mendepositokan `assets` dari token dasar.

#### penarikanMaks {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

Fungsi ini mengembalikan jumlah maksimum aset dasar yang dapat ditarik dari saldo `owner` dengan satu panggilan [`withdraw`](#withdraw).

#### pratinjauTarik {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

Fungsi ini memungkinkan pengguna untuk mensimulasikan efek penarikan mereka pada blok saat ini.

#### tarik {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Fungsi ini membakar `shares` dari `owner` dan mengirim tepat `assets` token dari vault ke `receiver`.

#### tebusMaks {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

Fungsi ini mengembalikan jumlah maksimum saham yang dapat ditebus dari saldo `owner` melalui panggilan [`redeem`](#redeem).

#### pratinjauTebus {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

Fungsi ini memungkinkan pengguna untuk mensimulasikan efek dari penebusan mereka pada blok saat ini.

#### tebus {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Fungsi ini menebus sejumlah `shares` tertentu dari `owner` dan mengirimkan `assets` dari token dasar dari vault ke `receiver`.

#### totalPasokan {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Mengembalikan total jumlah vault shares yang belum ditebus yang beredar.

#### saldoDari {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Mengembalikan jumlah total saham vault yang saat ini dimiliki `owner`.

### Peta antarmuka {#mapOfTheInterface}

![Peta antarmuka ERC-4626](./map-of-erc-4626.png)

### Peristiwa {#events}

#### Aksi Deposit

**HARUS** dipicu saat token didepositokan ke dalam vault melalui metode [`mint`](#mint) dan [`deposit`](#deposit).

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Di mana `sender` adalah pengguna yang menukarkan `assets` dengan `shares`, dan mentransfer `shares` tersebut ke `owner`.

#### Aksi Penarikan

**HARUS** dipicu ketika saham ditarik dari vault oleh depositor dalam metode [`redeem`](#redeem) atau [`withdraw`](#withdraw).

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

- [EIP-4626: Standar Vault yang Ditokenisasi](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: Repo GitHub](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)
