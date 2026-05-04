---
title: ERC-20 dengan Rel Pengaman
description: Cara membantu orang menghindari kesalahan konyol
author: Ori Pomerantz
lang: id
tags: ["erc-20"]
skill: beginner
published: 2022-08-15
---

## Pengantar {#introduction}

Salah satu hal hebat tentang Ethereum adalah tidak ada otoritas pusat yang dapat memodifikasi atau membatalkan transaksi Anda. Salah satu masalah besar dengan Ethereum adalah tidak ada otoritas pusat dengan kekuatan untuk membatalkan kesalahan pengguna atau transaksi ilegal. Dalam artikel ini Anda akan belajar tentang beberapa kesalahan umum yang dilakukan pengguna dengan token [ERC-20](/developers/docs/standards/tokens/erc-20/), serta cara membuat kontrak ERC-20 yang membantu pengguna menghindari kesalahan tersebut, atau yang memberikan otoritas pusat beberapa kekuatan (misalnya untuk membekukan akun).

Perhatikan bahwa meskipun kita akan menggunakan [kontrak token ERC-20 OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20), artikel ini tidak menjelaskannya secara sangat rinci. Anda dapat menemukan informasi ini [di sini](/developers/tutorials/erc20-annotated-code).

Jika Anda ingin melihat kode sumber lengkapnya:

1. Buka [Remix IDE](https://remix.ethereum.org/).
2. Klik ikon klon github (![clone github icon](icon-clone.png)).
3. Klon repositori github `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. Buka **contracts > erc20-safety-rails.sol**.

## Membuat kontrak ERC-20 {#creating-an-erc-20-contract}

Sebelum kita dapat menambahkan fungsionalitas rel pengaman, kita memerlukan kontrak ERC-20. Dalam artikel ini kita akan menggunakan [OpenZeppelin Contracts Wizard](https://docs.openzeppelin.com/contracts/5.x/wizard). Buka di peramban lain dan ikuti instruksi ini:

1. Pilih **ERC20**.
2. Masukkan pengaturan ini:

   | Parameter | Nilai |
   | -------------- | ---------------- |
   | Nama | SafetyRailsToken |
   | Simbol | SAFE |
   | Premint | 1000 |
   | Fitur | None |
   | Kontrol Akses | Ownable |
   | Peningkatan | None |

3. Gulir ke atas dan klik **Open in Remix** (untuk Remix) atau **Download** untuk menggunakan lingkungan yang berbeda. Saya akan berasumsi Anda menggunakan Remix, jika Anda menggunakan yang lain, buat saja perubahan yang sesuai.
4. Kita sekarang memiliki kontrak ERC-20 yang berfungsi penuh. Anda dapat memperluas `.deps` > `npm` untuk melihat kode yang diimpor.
5. Kompilasi, terapkan, dan mainkan kontrak untuk melihat bahwa itu berfungsi sebagai kontrak ERC-20. Jika Anda perlu mempelajari cara menggunakan Remix, [gunakan tutorial ini](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Kesalahan umum {#common-mistakes}

### Kesalahan-kesalahan tersebut {#the-mistakes}

Pengguna terkadang mengirim token ke alamat yang salah. Meskipun kita tidak dapat membaca pikiran mereka untuk mengetahui apa yang ingin mereka lakukan, ada dua jenis kesalahan yang sering terjadi dan mudah dideteksi:

1. Mengirim token ke alamat kontrak itu sendiri. Misalnya, [token OP Optimism](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) berhasil mengumpulkan [lebih dari 120.000](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) token OP dalam waktu kurang dari dua bulan. Ini mewakili jumlah kekayaan yang signifikan yang mungkin saja hilang begitu saja.

2. Mengirim token ke alamat kosong, yang tidak sesuai dengan [akun yang dimiliki secara eksternal](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) atau [kontrak pintar](/developers/docs/smart-contracts). Meskipun saya tidak memiliki statistik tentang seberapa sering ini terjadi, [satu insiden bisa menelan biaya 20.000.000 token](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Mencegah transfer {#preventing-transfers}

Kontrak ERC-20 OpenZeppelin menyertakan [sebuah hook, `_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368), yang dipanggil sebelum token ditransfer. Secara default hook ini tidak melakukan apa-apa, tetapi kita dapat menggantungkan fungsionalitas kita sendiri padanya, seperti pemeriksaan yang membatalkan (revert) jika ada masalah.

Untuk menggunakan hook, tambahkan fungsi ini setelah konstruktor:

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

Beberapa bagian dari fungsi ini mungkin baru jika Anda tidak terlalu akrab dengan Solidity:

```solidity
        internal virtual
```

Kata kunci `virtual` berarti bahwa sama seperti kita mewarisi fungsionalitas dari `ERC20` dan menimpa (override) fungsi ini, kontrak lain dapat mewarisi dari kita dan menimpa fungsi ini.

```solidity
        override(ERC20)
```

Kita harus menentukan secara eksplisit bahwa kita [menimpa](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding) definisi token ERC20 dari `_beforeTokenTransfer`. Secara umum, definisi eksplisit jauh lebih baik, dari sudut pandang keamanan, daripada yang implisit - Anda tidak bisa lupa bahwa Anda telah melakukan sesuatu jika itu ada tepat di depan Anda. Itu juga alasan kita perlu menentukan `_beforeTokenTransfer` dari superclass mana yang kita timpa.

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

Baris ini memanggil fungsi `_beforeTokenTransfer` dari kontrak atau kontrak-kontrak yang kita warisi yang memilikinya. Dalam hal ini, itu hanya `ERC20`, `Ownable` tidak memiliki hook ini. Meskipun saat ini `ERC20._beforeTokenTransfer` tidak melakukan apa-apa, kita memanggilnya untuk berjaga-jaga jika fungsionalitas ditambahkan di masa mendatang (dan kita kemudian memutuskan untuk menerapkan ulang kontrak, karena kontrak tidak berubah setelah penerapan).

### Mengodekan persyaratan {#coding-the-requirements}

Kita ingin menambahkan persyaratan ini ke fungsi:

- Alamat `to` tidak boleh sama dengan `address(this)`, alamat dari kontrak ERC-20 itu sendiri.
- Alamat `to` tidak boleh kosong, itu harus berupa salah satu dari:
  - Akun yang dimiliki secara eksternal (EOA). Kita tidak dapat memeriksa apakah sebuah alamat adalah EOA secara langsung, tetapi kita dapat memeriksa saldo ETH dari sebuah alamat. EOA hampir selalu memiliki saldo, bahkan jika tidak lagi digunakan - sulit untuk mengosongkannya hingga wei terakhir.
  - Sebuah kontrak pintar. Menguji apakah sebuah alamat adalah kontrak pintar sedikit lebih sulit. Ada opcode yang memeriksa panjang kode eksternal, yang disebut [`EXTCODESIZE`](https://www.evm.codes/#3b), tetapi tidak tersedia secara langsung di Solidity. Kita harus menggunakan [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html), yang merupakan assembly EVM, untuk itu. Ada nilai lain yang bisa kita gunakan dari Solidity ([`<address>.code` dan `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types)), tetapi biayanya lebih mahal.

Mari kita bahas kode baru baris demi baris:

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

Ini adalah cara kita memeriksa apakah sebuah alamat adalah kontrak. Kita tidak dapat menerima keluaran langsung dari Yul, jadi sebagai gantinya kita mendefinisikan variabel untuk menampung hasilnya (`isToContract` dalam hal ini). Cara kerja Yul adalah setiap opcode dianggap sebagai fungsi. Jadi pertama-tama kita memanggil [`EXTCODESIZE`](https://www.evm.codes/#3b) untuk mendapatkan ukuran kontrak, dan kemudian menggunakan [`GT`](https://www.evm.codes/#11) untuk memeriksa bahwa itu tidak nol (kita berurusan dengan bilangan bulat tak bertanda, jadi tentu saja tidak bisa negatif). Kita kemudian menulis hasilnya ke `isToContract`.

```solidity
        require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
```

Dan terakhir, kita memiliki pemeriksaan aktual untuk alamat kosong.

## Akses administratif {#admin-access}

Terkadang berguna untuk memiliki administrator yang dapat membatalkan kesalahan. Untuk mengurangi potensi penyalahgunaan, administrator ini bisa berupa [multi tanda tangan](https://blog.logrocket.com/security-choices-multi-signature-wallets/) sehingga banyak orang harus menyetujui suatu tindakan. Dalam artikel ini kita akan memiliki dua fitur administratif:

1. Membekukan dan mencairkan akun. Ini bisa berguna, misalnya, ketika sebuah akun mungkin telah disusupi.
2. Pembersihan aset.

   Terkadang penipu mengirim token palsu ke kontrak token asli untuk mendapatkan legitimasi. Misalnya, [lihat di sini](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders). Kontrak ERC-20 yang sah adalah [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042). Penipuan yang berpura-pura menjadi itu adalah [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe).

   Mungkin juga orang mengirim token ERC-20 yang sah ke kontrak kita secara tidak sengaja, yang merupakan alasan lain untuk ingin memiliki cara untuk mengeluarkannya.

OpenZeppelin menyediakan dua mekanisme untuk mengaktifkan akses administratif:

- Kontrak [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) memiliki pemilik tunggal. Fungsi yang memiliki [pengubah (modifier)](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `onlyOwner` hanya dapat dipanggil oleh pemilik tersebut. Pemilik dapat mentransfer kepemilikan kepada orang lain atau melepaskannya sepenuhnya. Hak semua akun lain biasanya identik.
- Kontrak [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) memiliki [kontrol akses berbasis peran (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control).

Demi kesederhanaan, dalam artikel ini kita menggunakan `Ownable`.

### Membekukan dan mencairkan kontrak {#freezing-and-thawing-contracts}

Membekukan dan mencairkan kontrak memerlukan beberapa perubahan:

- Sebuah [pemetaan (mapping)](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) dari alamat ke [boolean](https://en.wikipedia.org/wiki/Boolean_data_type) untuk melacak alamat mana yang dibekukan. Semua nilai pada awalnya nol, yang untuk nilai boolean ditafsirkan sebagai salah (false). Inilah yang kita inginkan karena secara default akun tidak dibekukan.

  ```solidity
      mapping(address => bool) public frozenAccounts;
```

- [Acara (Events)](https://www.tutorialspoint.com/solidity/solidity_events.htm) untuk memberi tahu siapa pun yang tertarik ketika sebuah akun dibekukan atau dicairkan. Secara teknis acara tidak diperlukan untuk tindakan ini, tetapi ini membantu kode offchain untuk dapat mendengarkan acara ini dan mengetahui apa yang sedang terjadi. Dianggap sebagai tata krama yang baik bagi kontrak pintar untuk memancarkannya (emit) ketika sesuatu yang mungkin relevan bagi orang lain terjadi.

  Acara diindeks sehingga akan memungkinkan untuk mencari semua waktu sebuah akun telah dibekukan atau dicairkan.

  ```solidity
    // When accounts are frozen or unfrozen // Ketika akun dibekukan atau dicairkan
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
    }  // freezeAccount // freezeAccount
```

  Jika akun sudah dibekukan, batalkan (revert). Jika tidak, bekukan dan `emit` sebuah acara.

- Ubah `_beforeTokenTransfer` untuk mencegah uang dipindahkan dari akun yang dibekukan. Perhatikan bahwa uang masih dapat ditransfer ke akun yang dibekukan.

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
```

### Pembersihan aset {#asset-cleanup}

Untuk melepaskan token ERC-20 yang dipegang oleh kontrak ini, kita perlu memanggil fungsi pada kontrak token tempat mereka berada, baik [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) atau [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve). Tidak ada gunanya membuang-buang gas dalam kasus ini untuk tunjangan (allowances), kita mungkin juga mentransfer secara langsung.

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

Ini adalah sintaks untuk membuat objek untuk kontrak ketika kita menerima alamat. Kita dapat melakukan ini karena kita memiliki definisi untuk token ERC20 sebagai bagian dari kode sumber (lihat baris 4), dan file tersebut menyertakan [definisi untuk IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol), antarmuka untuk kontrak ERC-20 OpenZeppelin.

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

Ini adalah fungsi pembersihan, jadi mungkin kita tidak ingin meninggalkan token apa pun. Alih-alih mendapatkan saldo dari pengguna secara manual, kita mungkin juga mengotomatiskan prosesnya.

## Kesimpulan {#conclusion}

Ini bukan solusi yang sempurna - tidak ada solusi yang sempurna untuk masalah "pengguna membuat kesalahan". Namun, menggunakan jenis pemeriksaan ini setidaknya dapat mencegah beberapa kesalahan. Kemampuan untuk membekukan akun, meskipun berbahaya, dapat digunakan untuk membatasi kerusakan dari peretasan tertentu dengan menolak dana curian dari peretas.

[Lihat di sini untuk karya saya yang lain](https://cryptodocguy.pro/).