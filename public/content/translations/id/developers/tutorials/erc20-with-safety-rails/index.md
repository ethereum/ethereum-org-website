---
title: ERC-20 dengan Pagar Pengaman
description: Cara membantu orang menghindari kesalahan konyol
author: Ori Pomerantz
lang: id
tags: ["erc-20"]
skill: beginner
breadcrumb: Keamanan ERC-20
published: 2022-08-15
---

## Pengantar {#introduction}

Salah satu hal hebat tentang Ethereum adalah tidak ada otoritas pusat yang dapat memodifikasi atau membatalkan transaksi Anda. Salah satu masalah besar dengan Ethereum adalah tidak ada otoritas pusat dengan kekuasaan untuk membatalkan kesalahan pengguna atau transaksi ilegal. Dalam artikel ini Anda akan mempelajari tentang beberapa kesalahan umum yang dilakukan pengguna dengan token [ERC-20](/developers/docs/standards/tokens/erc-20/), serta cara membuat kontrak ERC-20 yang membantu pengguna untuk menghindari kesalahan tersebut, atau yang memberikan otoritas pusat beberapa kekuasaan (misalnya untuk membekukan akun).

Perhatikan bahwa meskipun kita akan menggunakan [kontrak token ERC-20 OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20), artikel ini tidak menjelaskannya secara sangat rinci. Anda dapat menemukan informasi ini [di sini](/developers/tutorials/erc20-annotated-code).

Jika Anda ingin melihat kode sumber lengkapnya:

1. Buka [Remix IDE](https://remix.ethereum.org/).
2. Klik ikon klon GitHub (![clone github icon](icon-clone.png)).
3. Klon repositori GitHub `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. Buka **contracts > erc20-safety-rails.sol**.

## Membuat kontrak ERC-20 {#creating-an-erc-20-contract}

Sebelum kita dapat menambahkan fungsionalitas pagar pengaman, kita memerlukan kontrak ERC-20. Dalam artikel ini kita akan menggunakan [OpenZeppelin Contracts Wizard](https://docs.openzeppelin.com/contracts/5.x/wizard). Buka di peramban lain dan ikuti instruksi berikut:

1. Pilih **ERC20**.
2. Masukkan pengaturan ini:

   | Parameter      | Nilai            |
   | -------------- | ---------------- |
   | Nama           | SafetyRailsToken |
   | Simbol         | SAFE             |
   | Premint        | 1000             |
   | Fitur          | Tidak ada        |
   | Kontrol Akses  | Ownable          |
   | Peningkatan    | Tidak ada        |

3. Gulir ke atas dan klik **Open in Remix** (untuk Remix) atau **Download** untuk menggunakan lingkungan yang berbeda. Saya akan berasumsi Anda menggunakan Remix, jika Anda menggunakan yang lain, buat saja perubahan yang sesuai.
4. Kita sekarang memiliki kontrak ERC-20 yang berfungsi penuh. Anda dapat memperluas `.deps` > `npm` untuk melihat kode yang diimpor.
5. Kompilasi, sebarkan, dan mainkan kontrak untuk melihat bahwa itu berfungsi sebagai kontrak ERC-20. Jika Anda perlu mempelajari cara menggunakan Remix, [gunakan tutorial ini](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Kesalahan umum {#common-mistakes}

### Kesalahan-kesalahan tersebut {#the-mistakes}

Pengguna terkadang mengirim token ke alamat yang salah. Meskipun kita tidak dapat membaca pikiran mereka untuk mengetahui apa yang ingin mereka lakukan, ada dua jenis kesalahan yang sering terjadi dan mudah dideteksi:

1. Mengirim token ke alamat kontrak itu sendiri. Misalnya, [token OP Optimism](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) berhasil mengumpulkan [lebih dari 120.000](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) token OP dalam waktu kurang dari dua bulan. Ini mewakili jumlah kekayaan yang signifikan yang mungkin saja hilang begitu saja.

2. Mengirim token ke alamat kosong, yang tidak sesuai dengan [akun yang dimiliki secara eksternal (EOA)](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) atau [kontrak pintar](/developers/docs/smart-contracts). Meskipun saya tidak memiliki statistik tentang seberapa sering ini terjadi, [satu insiden bisa menelan biaya 20.000.000 token](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Mencegah transfer {#preventing-transfers}

Kontrak ERC-20 OpenZeppelin menyertakan [sebuah hook, `_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368), yang dipanggil sebelum token ditransfer. Secara bawaan hook ini tidak melakukan apa-apa, tetapi kita dapat menggantungkan fungsionalitas kita sendiri padanya, seperti pemeriksaan yang mengembalikan jika ada masalah.

Untuk menggunakan hook, tambahkan fungsi ini setelah konstruktor:

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

Beberapa bagian dari fungsi ini mungkin baru jika Anda tidak terlalu familier dengan Solidity:

```solidity
        internal virtual
```

Kata kunci `virtual` berarti bahwa sama seperti kita mewarisi fungsionalitas dari `ERC20` dan menimpa fungsi ini, kontrak lain dapat mewarisi dari kita dan menimpa fungsi ini.

```solidity
        override(ERC20)
```

Kita harus menentukan secara eksplisit bahwa kita [menimpa](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding) definisi token ERC20 dari `_beforeTokenTransfer`. Secara umum, definisi eksplisit jauh lebih baik, dari sudut pandang keamanan, daripada yang implisit - Anda tidak bisa lupa bahwa Anda telah melakukan sesuatu jika itu ada tepat di depan Anda. Itu juga alasan kita perlu menentukan `_beforeTokenTransfer` dari superclass mana yang kita timpa.

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

Baris ini memanggil fungsi `_beforeTokenTransfer` dari kontrak atau kontrak-kontrak yang kita warisi yang memilikinya. Dalam hal ini, itu hanya `ERC20`, `Ownable` tidak memiliki hook ini. Meskipun saat ini `ERC20._beforeTokenTransfer` tidak melakukan apa-apa, kita memanggilnya untuk berjaga-jaga jika fungsionalitas ditambahkan di masa mendatang (dan kita kemudian memutuskan untuk menyebarkan ulang kontrak, karena kontrak tidak berubah setelah penyebaran).

### Mengodekan persyaratan {#coding-the-requirements}

Kita ingin menambahkan persyaratan ini ke fungsi:

- Alamat `to` tidak boleh sama dengan `address(this)`, alamat dari kontrak ERC-20 itu sendiri.
- Alamat `to` tidak boleh kosong, itu harus berupa salah satu dari:
  - Akun yang dimiliki secara eksternal (EOA). Kita tidak dapat memeriksa apakah sebuah alamat adalah EOA secara langsung, tetapi kita dapat memeriksa saldo ETH dari sebuah alamat. EOA hampir selalu memiliki saldo, bahkan jika tidak lagi digunakan - sulit untuk mengosongkannya hingga Wei terakhir.
  - Kontrak pintar. Menguji apakah sebuah alamat adalah kontrak pintar sedikit lebih sulit. Ada sebuah opcode yang memeriksa panjang kode eksternal, yang disebut [`EXTCODESIZE`](https://www.evm.codes/#3b), tetapi itu tidak tersedia secara langsung di Solidity. Kita harus menggunakan [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html), yang merupakan assembly EVM, untuk itu. Ada nilai lain yang bisa kita gunakan dari Solidity ([`<address>.code` dan `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types)), tetapi biayanya lebih mahal.

Mari kita bahas kode baru ini baris demi baris:

```solidity
        require(to != address(this), "Can't send tokens to the contract address");
```

Ini adalah persyaratan pertama, periksa bahwa `to` dan `this(address)` bukanlah hal yang sama.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

Ini adalah cara kita memeriksa apakah sebuah alamat adalah kontrak. Kita tidak dapat menerima keluaran secara langsung dari Yul, jadi sebagai gantinya kita mendefinisikan sebuah variabel untuk menampung hasilnya (`isToContract` dalam hal ini). Cara kerja Yul adalah setiap opcode dianggap sebagai fungsi. Jadi pertama-tama kita memanggil [`EXTCODESIZE`](https://www.evm.codes/#3b) untuk mendapatkan ukuran kontrak, dan kemudian menggunakan [`GT`](https://www.evm.codes/#11) untuk memeriksa bahwa itu bukan nol (kita berurusan dengan bilangan bulat tak bertanda, jadi tentu saja tidak bisa negatif). Kita kemudian menulis hasilnya ke `isToContract`.

```solidity
        require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
```

Dan terakhir, kita memiliki pemeriksaan aktual untuk alamat kosong.

## Akses administratif {#admin-access}

Terkadang berguna untuk memiliki administrator yang dapat membatalkan kesalahan. Untuk mengurangi potensi penyalahgunaan, administrator ini bisa berupa [multisig](https://blog.logrocket.com/security-choices-multi-signature-wallets/) sehingga beberapa orang harus menyetujui suatu tindakan. Dalam artikel ini kita akan memiliki dua fitur administratif:

1. Membekukan dan mencairkan akun. Ini bisa berguna, misalnya, ketika sebuah akun mungkin telah disusupi.
2. Pembersihan aset.

   Terkadang penipu mengirim token palsu ke kontrak token asli untuk mendapatkan legitimasi. Misalnya, [lihat di sini](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders). Kontrak ERC-20 yang sah adalah [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042). Penipuan yang berpura-pura menjadi kontrak tersebut adalah [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe).

   Mungkin juga orang mengirim token ERC-20 yang sah ke kontrak kita secara tidak sengaja, yang merupakan alasan lain untuk ingin memiliki cara untuk mengeluarkannya.

OpenZeppelin menyediakan dua mekanisme untuk mengaktifkan akses administratif:

- Kontrak [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) memiliki pemilik tunggal. Fungsi yang memiliki [pengubah](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `onlyOwner` hanya dapat dipanggil oleh pemilik tersebut. Pemilik dapat mentransfer kepemilikan kepada orang lain atau melepaskannya sepenuhnya. Hak dari semua akun lain biasanya identik.
- Kontrak [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) memiliki [kontrol akses berbasis peran (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control).

Demi kesederhanaan, dalam artikel ini kita menggunakan `Ownable`.

### Membekukan dan mencairkan kontrak {#freezing-and-thawing-contracts}

Membekukan dan mencairkan kontrak memerlukan beberapa perubahan:

- Sebuah [pemetaan](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) dari alamat ke [boolean](https://en.wikipedia.org/wiki/Boolean_data_type) untuk melacak alamat mana yang dibekukan. Semua nilai pada awalnya adalah nol, yang untuk nilai boolean ditafsirkan sebagai salah (false). Inilah yang kita inginkan karena secara bawaan akun tidak dibekukan.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- [Peristiwa](https://www.tutorialspoint.com/solidity/solidity_events.htm) untuk memberi tahu siapa pun yang berkepentingan ketika sebuah akun dibekukan atau dicairkan. Secara teknis peristiwa tidak diperlukan untuk tindakan ini, tetapi ini membantu kode offchain untuk dapat mendengarkan peristiwa ini dan mengetahui apa yang sedang terjadi. Dianggap sebagai tata krama yang baik bagi kontrak pintar untuk memancarkannya ketika sesuatu yang mungkin relevan bagi orang lain terjadi.

  Peristiwa tersebut diindeks sehingga akan memungkinkan untuk mencari semua waktu ketika sebuah akun telah dibekukan atau dicairkan.

  ```solidity
    // Ketika akun dibekukan atau tidak dibekukan
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- Fungsi untuk membekukan dan mencairkan akun. Kedua fungsi ini hampir identik, jadi kita hanya akan membahas fungsi pembekuan.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  Fungsi yang ditandai [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm) dapat dipanggil dari kontrak pintar lain atau secara langsung oleh sebuah transaksi.

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  Jika akun sudah dibekukan, mengembalikan. Jika tidak, bekukan dan `emit` sebuah peristiwa.

- Ubah `_beforeTokenTransfer` untuk mencegah uang dipindahkan dari akun yang dibekukan. Perhatikan bahwa uang masih dapat ditransfer ke dalam akun yang dibekukan.

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
  ```

### Pembersihan aset {#asset-cleanup}

Untuk melepaskan token ERC-20 yang dipegang oleh kontrak ini, kita perlu memanggil sebuah fungsi pada kontrak token tempat mereka berada, baik [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) atau [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve). Tidak ada gunanya membuang-buang gas dalam kasus ini untuk kelonggaran (allowance), kita sebaiknya mentransfer secara langsung.

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

Ini adalah sintaks untuk membuat objek bagi sebuah kontrak ketika kita menerima alamat. Kita dapat melakukan ini karena kita memiliki definisi untuk token ERC20 sebagai bagian dari kode sumber (lihat baris 4), dan berkas tersebut menyertakan [definisi untuk IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol), antarmuka untuk kontrak ERC-20 OpenZeppelin.

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

Ini adalah fungsi pembersihan, jadi mungkin kita tidak ingin meninggalkan token apa pun. Alih-alih mendapatkan saldo dari pengguna secara manual, kita sebaiknya mengotomatiskan prosesnya.

## Kesimpulan {#conclusion}

Ini bukanlah solusi yang sempurna - tidak ada solusi yang sempurna untuk masalah "pengguna membuat kesalahan". Namun, menggunakan jenis pemeriksaan ini setidaknya dapat mencegah beberapa kesalahan. Kemampuan untuk membekukan akun, meskipun berbahaya, dapat digunakan untuk membatasi kerusakan dari peretasan tertentu dengan menolak akses peretas ke dana yang dicuri.

[Lihat di sini untuk karya saya yang lain](https://cryptodocguy.pro/).