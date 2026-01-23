---
title: ERC-20 dengan Rel Pengaman
description: Cara membantu orang menghindari kesalahan konyol
author: Ori Pomerantz
lang: id
tags: [ "erc-20" ]
skill: beginner
published: 2022-08-15
---

## Pengenalan {#introduction}

Salah satu hal terbaik tentang Ethereum adalah tidak ada otoritas pusat yang dapat mengubah atau membatalkan transaksi Anda. Salah satu masalah besar dengan Ethereum adalah tidak adanya otoritas pusat yang memiliki kekuatan untuk membatalkan kesalahan pengguna atau transaksi ilegal. Dalam artikel ini Anda akan mempelajari beberapa kesalahan umum yang dilakukan pengguna dengan token [ERC-20](/developers/docs/standards/tokens/erc-20/), serta cara membuat kontrak ERC-20 yang membantu pengguna menghindari kesalahan tersebut, atau yang memberikan sebagian kekuasaan kepada otoritas pusat (misalnya untuk membekukan akun).

Perhatikan bahwa meskipun kita akan menggunakan [kontrak token ERC-20 OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20), artikel ini tidak menjelaskannya secara sangat terperinci. Anda dapat menemukan informasi ini [di sini](/developers/tutorials/erc20-annotated-code).

Jika Anda ingin melihat kode sumber yang lengkap:

1. Buka [Remix IDE](https://remix.ethereum.org/).
2. Klik ikon klon GitHub (![ikon klon github](icon-clone.png)).
3. Klon repositori GitHub `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. Buka **contracts > erc20-safety-rails.sol**.

## Membuat kontrak ERC-20 {#creating-an-erc-20-contract}

Sebelum kita dapat menambahkan fungsionalitas rel pengaman, kita memerlukan kontrak ERC-20. Dalam artikel ini kita akan menggunakan [Wizard Kontrak OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/wizard). Buka di browser lain dan ikuti petunjuk ini:

1. Pilih **ERC20**.

2. Masukkan pengaturan ini:

   | Parameter       | Nilai            |
   | --------------- | ---------------- |
   | Nama            | SafetyRailsToken |
   | Simbol          | SAFE             |
   | Premint         | 1000             |
   | Fitur           | Tidak ada        |
   | Kontrol Akses   | Ownable          |
   | Upgradeabilitas | Tidak ada        |

3. Gulir ke atas dan klik **Buka di Remix** (untuk Remix) atau **Unduh** untuk menggunakan lingkungan yang berbeda. Saya akan mengasumsikan Anda menggunakan Remix, jika Anda menggunakan yang lain, buatlah perubahan yang sesuai.

4. Sekarang kita memiliki kontrak ERC-20 yang berfungsi penuh. Anda dapat memperluas `.deps` > `npm` untuk melihat kode yang diimpor.

5. Kompilasi, deploy, dan coba kontrak untuk melihat bahwa ia berfungsi sebagai kontrak ERC-20. Jika Anda perlu belajar cara menggunakan Remix, [gunakan tutorial ini](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Kesalahan umum {#common-mistakes}

### Kesalahan-kesalahan {#the-mistakes}

Pengguna terkadang mengirim token ke alamat yang salah. Meskipun kita tidak dapat membaca pikiran mereka untuk mengetahui apa yang mereka maksudkan, ada dua jenis kesalahan yang sering terjadi dan mudah dideteksi:

1. Mengirim token ke alamat kontrak itu sendiri. Misalnya, [token OP Optimism](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) berhasil mengakumulasi [lebih dari 120.000](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) token OP dalam waktu kurang dari dua bulan. Ini merupakan jumlah kekayaan yang signifikan yang mungkin hilang begitu saja.

2. Mengirim token ke alamat kosong, yaitu alamat yang tidak sesuai dengan [akun yang dimiliki secara eksternal](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) atau [kontrak pintar](/developers/docs/smart-contracts). Meskipun saya tidak memiliki statistik tentang seberapa sering ini terjadi, [satu insiden bisa saja merugikan 20.000.000 token](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Mencegah transfer {#preventing-transfers}

Kontrak ERC-20 OpenZeppelin menyertakan [sebuah hook, `_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368), yang dipanggil sebelum sebuah token ditransfer. Secara default, hook ini tidak melakukan apa-apa, tetapi kita bisa menambahkan fungsionalitas kita sendiri, seperti pemeriksaan yang melakukan revert jika ada masalah.

Untuk menggunakan hook, tambahkan fungsi ini setelah konstruktor:

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

Beberapa bagian dari fungsi ini mungkin baru bagi Anda, jika Anda tidak begitu mengenal Solidity:

```solidity
        internal virtual
```

Kata kunci `virtual` berarti bahwa sama seperti kita mewarisi fungsionalitas dari `ERC20` dan menimpa fungsi ini, kontrak lain dapat mewarisi dari kita dan menimpa fungsi ini.

```solidity
        override(ERC20)
```

Kita harus secara eksplisit menentukan bahwa kita [menimpa](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding) definisi token ERC20 dari `_beforeTokenTransfer`. Secara umum, definisi eksplisit jauh lebih baik, dari sudut pandang keamanan, daripada definisi implisit - Anda tidak dapat melupakan bahwa Anda telah melakukan sesuatu jika hal itu ada di depan mata. Itu juga alasan mengapa kita perlu menentukan `_beforeTokenTransfer` dari superclass mana yang sedang kita timpa.

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

Baris ini memanggil fungsi `_beforeTokenTransfer` dari kontrak atau kontrak-kontrak dari mana kita mewarisi yang memiliki fungsi tersebut. Dalam kasus ini, itu hanya `ERC20`, `Ownable` tidak memiliki hook ini. Meskipun saat ini `ERC20._beforeTokenTransfer` tidak melakukan apa-apa, kita memanggilnya jika seandainya fungsionalitas ditambahkan di masa depan (dan kita kemudian memutuskan untuk men-deploy ulang kontrak, karena kontrak tidak berubah setelah deployment).

### Mengodekan persyaratan {#coding-the-requirements}

Kita ingin menambahkan persyaratan ini ke fungsi tersebut:

- Alamat `to` tidak boleh sama dengan `address(this)`, yaitu alamat dari kontrak ERC-20 itu sendiri.
- Alamat `to` tidak boleh kosong, harus berupa salah satu dari:
  - Akun yang dimiliki secara eksternal (EOA). Kita tidak dapat memeriksa apakah suatu alamat merupakan EOA secara langsung, tetapi kita dapat memeriksa saldo ETH alamat tersebut. EOA hampir selalu memiliki saldo, bahkan jika sudah tidak digunakan lagi - sulit untuk menghapusnya hingga wei terakhir.
  - Sebuah kontrak pintar. Menguji apakah sebuah alamat adalah kontrak pintar sedikit lebih sulit. Terdapat opcode yang memeriksa panjang kode eksternal, yang disebut [`EXTCODESIZE`](https://www.evm.codes/#3b), namun opcode ini tidak tersedia secara langsung dalam Solidity. Kita harus menggunakan [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html), yang merupakan rakitan EVM, untuk itu. Ada nilai lain yang bisa kita gunakan dari Solidity ([`<address>.code` dan `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types)), tetapi biayanya lebih mahal.

Mari kita bahas kode baru baris demi baris:

```solidity
        require(to != address(this), "Tidak dapat mengirim token ke alamat kontrak");
```

Ini adalah persyaratan pertama, periksa bahwa `to` dan `address(this)` bukanlah hal yang sama.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

Beginilah cara kita memeriksa apakah sebuah alamat adalah sebuah kontrak. Kita tidak dapat menerima output langsung dari Yul, oleh karena itu kita mendefinisikan suatu variabel untuk menyimpan hasilnya (`isToContract` dalam kasus ini). Cara kerja Yul adalah setiap opcode dianggap sebagai sebuah fungsi. Pertama-tama kita memanggil [`EXTCODESIZE`](https://www.evm.codes/#3b) untuk mendapatkan ukuran kontrak, dan kemudian menggunakan [`GT`](https://www.evm.codes/#11) untuk memeriksa bahwa ukurannya tidak nol (kita berurusan dengan bilangan bulat tak bertanda, jadi tentu saja tidak bisa negatif). Kemudian kita menulis hasilnya ke `isToContract`.

```solidity
        require(to.balance != 0 || isToContract, "Tidak dapat mengirim token ke alamat kosong");
```

Dan terakhir, kita memiliki pemeriksaan yang sebenarnya untuk alamat yang kosong.

## Akses administratif {#admin-access}

Kadang-kadang berguna untuk memiliki administrator yang dapat membatalkan kesalahan. Untuk mengurangi potensi penyalahgunaan, administrator ini dapat berupa [multisig](https://blog.logrocket.com/security-choices-multi-signature-wallets/) sehingga banyak orang harus menyetujui suatu tindakan. Pada artikel ini kita akan membahas dua fitur administratif:

1. Membekukan dan mencairkan akun. Hal ini dapat berguna, misalnya, ketika sebuah akun mungkin dibobol.
2. Pembersihan aset.

   Terkadang penipu mengirimkan token palsu ke kontrak token asli untuk mendapatkan legitimasi. Misalnya, [lihat di sini](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders). Kontrak ERC-20 yang sah adalah [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042). Penipuan yang berpura-pura menjadi token tersebut adalah [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe).

   Juga mungkin orang mengirimkan token ERC-20 yang sah ke kontrak kita secara tidak sengaja, yang merupakan alasan lain untuk ingin memiliki cara untuk mengeluarkannya.

OpenZeppelin menyediakan dua mekanisme untuk memungkinkan akses administratif:

- Kontrak [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) memiliki satu pemilik. Fungsi yang memiliki [pengubah](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `onlyOwner` hanya dapat dipanggil oleh pemilik tersebut. Pemilik dapat mengalihkan kepemilikan kepada orang lain atau melepaskannya sepenuhnya. Hak-hak semua akun lainnya biasanya sama.
- Kontrak [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) memiliki [kontrol akses berbasis peran (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control).

Demi kesederhanaan, dalam artikel ini kita menggunakan `Ownable`.

### Membekukan dan mencairkan kontrak {#freezing-and-thawing-contracts}

Pembekuan dan pencairan kontrak memerlukan beberapa perubahan:

- Sebuah [pemetaan](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) dari alamat ke [boolean](https://en.wikipedia.org/wiki/Boolean_data_type) untuk melacak alamat mana yang dibekukan. Semua nilai pada awalnya adalah nol, yang untuk nilai boolean ditafsirkan sebagai salah. Ini yang kita inginkan karena secara default akun tidak dibekukan.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- [Aksi](https://www.tutorialspoint.com/solidity/solidity_events.htm) untuk menginformasikan siapa pun yang tertarik ketika sebuah akun dibekukan atau dicairkan. Secara teknis, Aksi tidak diperlukan untuk tindakan ini, tetapi ini membantu kode di luar rantai agar dapat mendengarkan Aksi ini dan mengetahui apa yang terjadi. Merupakan perilaku yang baik bagi kontrak pintar untuk memancarkannya ketika sesuatu yang mungkin relevan dengan orang lain terjadi.

  Aksi tersebut diindeks sehingga akan memungkinkan untuk mencari semua waktu ketika sebuah akun telah dibekukan atau dicairkan.

  ```solidity
    // Ketika akun dibekukan atau dicairkan
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- Fungsi untuk membekukan dan mencairkan akun. Kedua fungsi ini nyaris sama, jadi kita hanya akan membahas fungsi freeze.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  Fungsi yang ditandai [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm) dapat dipanggil dari kontrak pintar lain atau secara langsung melalui sebuah transaksi.

  ```solidity
    {
        require(!frozenAccounts[addr], "Akun sudah dibekukan");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  Jika akun sudah dibekukan, lakukan revert. Jika tidak, bekukan dan `pancarkan` sebuah Aksi.

- Ubah `_beforeTokenTransfer` untuk mencegah uang dipindahkan dari akun yang dibekukan. Perhatikan bahwa uang masih dapat ditransfer ke akun yang dibekukan.

  ```solidity
       require(!frozenAccounts[from], "Akun tersebut dibekukan");
  ```

### Pembersihan aset {#asset-cleanup}

Untuk melepaskan token ERC-20 yang dipegang oleh kontrak ini, kita perlu memanggil fungsi pada kontrak token tempat mereka berada, baik [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) atau [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve). Tidak ada gunanya membuang-buang gas dalam kasus ini untuk alokasi, lebih baik kita transfer secara langsung.

```solidity
    function cleanupERC20(
        address erc20,
        address dest
    )
        public
        onlyOwner
    {
        IERC20 token = IERC20(erc20);
```

Ini adalah sintaks untuk membuat objek untuk sebuah kontrak ketika kita menerima alamat. Kita dapat melakukan ini karena kita memiliki definisi untuk token ERC20 sebagai bagian dari kode sumber (lihat baris 4), dan file itu mencakup [definisi untuk IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol), antarmuka untuk kontrak ERC-20 OpenZeppelin.

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

Ini adalah fungsi pembersihan, jadi mungkin kita tidak ingin meninggalkan token apa pun. Daripada mendapatkan saldo dari pengguna secara manual, lebih baik kita mengotomatiskan prosesnya.

## Kesimpulan {#conclusion}

Ini bukanlah solusi yang sempurna - tidak ada solusi yang sempurna untuk masalah "pengguna melakukan kesalahan". Namun demikian, dengan menggunakan pemeriksaan semacam ini, setidaknya dapat mencegah beberapa kesalahan. Kemampuan untuk membekukan akun, meskipun berbahaya, dapat digunakan untuk membatasi kerusakan peretasan tertentu dengan menolak peretas untuk mendapatkan dana yang dicuri.

[Lihat di sini untuk lebih banyak pekerjaan saya](https://cryptodocguy.pro/).
