---
title: "Panduan Lengkap Kontrak ERC-20"
description: Apa yang terdapat dalam kontrak ERC-20 OpenZeppelin dan mengapa terdapat di sana?
author: Ori Pomerantz
lang: id
tags:
  - "solidity"
  - "erc-20"
skill: beginner
published: 2021-03-09
---

## Pendahuluan {#introduction}

Salah satu kegunaan paling umum dari Ethereum untuk suatu grup adalah membuat token yang dapat dipertukarkan, dalam pengertian sebagai mata uang mereka sendiri. Token ini biasanya mengikuti standar, [ERC-20](/developers/docs/standards/tokens/erc-20/). Standar ini memungkinkan penulisan perangkat, seperti kumpulan likuiditas dan dompet, yang bekerja dengan semua token ERC-20. Dalam artikel ini, kita akan menganalisis [penerapan ERC20 Solidity OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol), maupun [definisi antarmuka](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol).

Ini adalah kode sumber beranotasi. Jika Anda ingin menerapkan ERC-20, [baca tutorial ini](https://docs.openzeppelin.com/contracts/2.x/erc20-supply).

## Antarmuka {#the-interface}

Tujuan standar seperti ERC-20 adalah membuat banyak penerapan token yang saling berinteraksi di seluruh aplikasi, seperti dompet dan bursa terdesentralisasi. Untuk mencapai hal tersebut, kita membuat [antamuka](https://www.geeksforgeeks.org/solidity-basics-of-interface/). Kode apa pun yang perlu menggunakan kontrak token dapat menggunakan definisi yang sama dalam antarmuka dan dapat menjadi kompatibel dengan semua kontrak token yang menggunakannya, apakah dompet seperti MetaMask, dapp seperti etherscan.io, atau kontrak berbeda seperti pool likuiditas.

![Ilustrasi antarmuka ERC-20](erc20_interface.png)

Jika Anda adalah pemrogram yang berpengalaman, Anda mungkin pernah melihat konstruk serupa dalam [Java](https://www.w3schools.com/java/java_interface.asp) atau bahkan dalam [file header C](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html).

Ini adalah definisi dari [Antarmuka ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) dari OpenZeppelin. Ini adalah terjemahan dari [standar yang dapat dibaca manusia](https://eips.ethereum.org/EIPS/eip-20) ke kode Solidity. Tentu saja, antarmukanya sendiri tidak menentukan _cara_ melakukan apa pun. Cara ini dijelaskan dalam kode sumber kontrak di bawah.

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

File Solidity seharusnya mencakup pengenal lisensi. [Anda dapat melihat daftar lisensi di sini](https://spdx.org/licenses/). Jika Anda perlu lisensi yang berbeda, cukup jelaskan dalam bagian komentar.

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Bahasa Solidity masih berevolusi secara cepat, dan versi barunya mungkin tidak kompatibel dengan kode yang lama ([lihat di sini](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)). Oleh karena itu, sebaiknya Anda tidak hanya menentukan versi minimum dari bahasa, tetapi juga versi maksimumnya, versi terbaru saat Anda menguji kode.

&nbsp;

```solidity
/**
 * @dev Antarmuka standar ERC20 seperti yang didefinisikan dalam EIP.
 */
```

`@dev` dalam komentar adalah bagian dari [format NatSpec](https://docs.soliditylang.org/en/develop/natspec-format.html), yang digunakan untuk membuat dokumentasi dari kode sumber.

&nbsp;

```solidity
interface IERC20 {
```

Secara konvensi, nama antarmuka dimulai dengan `I`.

&nbsp;

```solidity
    /**
     * @dev Mengembalikan jumlah token yang ada.
     */
    function totalSupply() external view returns (uint256);
```

Fungsi ini bersifat `external`, artinya [hanya dapat dipanggil dari luar kontrak](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2). Fungsi ini mengembalikan total persediaan dari token dalam kontrak. Nilai ini dikembalikan menggunakan jenis yang paling umum di Ethereum, 256 bit yang tak bertandatangan (256 bit adalah ukuran kata asli untuk EVM). Fungsi ini juga adalah `view`, artinya tidak mengubah status, sehingga dapat dilaksanakan pada simpul tunggal alih-alih membuat semua simpul dalam rantai blok menjalankannya. Jenis fungsi tidaktidak menghasilkan transaksi dan tidak memerlukan biaya [gas](/developers/docs/gas/).

**Catatan:** Dalam teori, mungkin tampak bahwa pembuat kontrak dapat melakukan kecurangan dengan mengembalikan total persediaan yang lebih kecil dari nilai aslinya, sehingga membuat setiap token tampak lebih berharga dari nilai sebenarnya. Namun, ketakutan itu mengabaikan sifat sebenarnya dari rantai blok. Semua hal yang terjadi di rantai blok dapat diverifikasi oleh setiap simpul. Untuk mencapai hal tersebut, setiap kode bahasa mesin dan penyimpanan kontrak tersedia di setiap simpul. Meskipun Anda tidak diharuskan menerbitkan kode Solidity untuk kontrak Anda, tidak seorang pun akan menghargai Anda kecuali jika Anda menerbitkan kode sumber dan versi Solidity yang dengannya kontrak dikumpulkan, sehingga dapat diverifikasi terhadap kode bahasa mesin yang Anda sediakan. Contohnya, lihat [kontrak ini](https://etherscan.io/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD#code).

&nbsp;

```solidity
    /**
     * @dev Mengembalikan jumlah token yang dimiliki oleh `akun`.
     */
    function balanceOf(address account) external view returns (uint256);
```

Seperti namanya, `balanceOf` mengembalikan saldo akun. Akun Ethereum dikenali dalam Solidity menggunakan jenis `alamat`, yang menampung 160 bit. Selain itu, merupakan `external` dan `view`.

&nbsp;

```solidity
    /**
     * @dev Memindahkan `jumlah` token dari akun pemanggil ke `penerima`.
     *
     * Mengembalikan nilai boolean yang menunjukkan apakah operasi berhasil.
     *
     * Memancarkan peristiwa {Transfer}.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

Fungsi `transfer` mentransfer token dari pemanggil ke alamat berbeda. Fungsi ini melibatkan perubahan status, sehingga bukan `view`. Ketika pengguna memanggil fungsi ini, pihaknya membuat transaksi dan memerlukan gas. Selain itu, memancarkan peristiwa, `Transfer`, untuk memberitahu semua orang di rantai blok tentang peristiwa tersebut.

Fungsi tersebut memiliki dua jenis output untuk dua jenis pemanggil yang berbeda:

- Pengguna yang memanggil fungsi secara langsung dari antarmuka pengguna. Pada umumnya, pengguna mengirimkan transaksi dan tidak menunggu respon, yang dapat memerlukan waktu yang tak dapat diperkirakan. Pengguna dapat melihat hal yang terjadi dengan mencari tanda terima transaksi (yang dikenali melalui hash transaksi) atau mencari peristiwa `Transfer`.
- Kontrak lainnya, yang memanggil fungsi sebagai bagian dari transaksi secara keseluruhan. Kontrak-kontrak ini mendapatkan hasil segera, karena beroperasi dalam transaksi yang sama, sehingga dapat menggunakan nilai pengembalian fungsi.

Jenis output yang sama dibuat dengan fungsi lainnya yang mengubah status kontrak.

&nbsp;

Tunjangan membuat akun mengeluarkan beberapa token yang dimiliki oleh pengguna yang berbeda. Hal ini berguna, contohnya, untuk kontrak yang bertindak sebagai penjual. Kontrak tidak dapat memantau aksi, sehingga jika pembeli mentransfer token ke kontrak penjual secara langsung, maka kontrak tersebut tidak akan diketahui telah dibayar. Sebagai gantinya, pembeli mengizinkan kontrak penjual mengeluarkan jumlah tertentu, dan penjual mentransfer jumlah tersebut. Hal ini dilakukan melalui fungsi yang dipanggil kontrak penjual, sehingga kontrak penjual dapat mengetahui jika transfer berhasil.

```solidity
    /**
     * @dev Mengembalikan sisa jumlah token yang akan
     * diizinkan untuk dikeluarkan oleh `pengguna` atas nama `pemilik` melalui {transferFrom}. Nilai ini merupakan
     * nol secara default.
     *
     * Nilai ini berubah ketika {approve} atau {transferFrom} dipanggil.
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

Fungsi `tunjangan` membiarkan setiap orang membuat kueri untuk melihat tunjangan yang diizinkan satu alamat (`owner`) untuk digunakan oleh alamat (`spender`).

&nbsp;

```solidity
    /**
     * @dev Menetapkan `jumlah` sebagai uang tunjangan `pengguna` melalui token pemanggil.
     *
     * Mengembalikan nilai boolean yang menunjukkan apakah operasi berhasil.
     *
     * PENTING: Ingatlah bahwa mengubah uang tunjangan dengan cara ini membawa resiko
     * seseorang mungkin menggunakan baik uang tunjangan lama maupun baru dengan
     * pengurutan transaksi yang tidak diharapkan. Satu solusi yang mungkin untuk mengatasi kompetisi ini
     * adalah pertama-tama mengurangi uang tunjangan pengguna ke 0 dan menetapkan
     * nilai yang diinginkan setelahnya:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Memancarkan aksi {Approval}.
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

Fungsi `persetujuan` membuat tunjangan. Pastikan membaca pesan tentang cara tunjangan dapat disalahgunakan. Di Ethereum, Anda mengendalikan urutan transaksi Anda sendiri, tetapi Anda tidak dapat mengendalikan urutan di mana transaksi orang lain akan dilaksanakan, kecuali jika Anda tidak mengirimkan transaksi Anda sendiri sampai Anda melihat transaksi pihak lainnya telah terjadi.

&nbsp;

```solidity
    /**
     * @dev Memindahkan `jumlah` token dari `pengirim` ke `penerima` menggunakan
     * mekanisme tunjangan. `jumlah` kemudian dikurangi dari tunjangan
     * pemanggil.
     *
     * Mengembalikan nilai boolean yang menunjukkan apakah operasi berhasil.
     *
     * Memancarkan peristiwa {Transfer}.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Akhirnya, `transferFrom` digunakan oleh pembelanja untuk benar-benar menggunakan tunjangan.

&nbsp;

```solidity

    /**
     * @dev Dipancarkan ketika token `nilai` dipindahkan dari satu akun (`dari`) ke
     * lainnya (`ke`).
     *
     * Perhatikan bahwa `nilai` dapat menjadi nol.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `nilai` adalah tunjangan baru.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Aksi ini dipancarkan ketika status kontrak ERC-20 berubah.

## Kontrak Sebenarnya {#the-actual-contract}

Ini adalah kontrak sebenarnya yang menerapkan standar ERC-20, [yang diambil dari sini](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol). Kontrak ini tidak dimaksudkan untuk digunakan seperti namanya, tetapi Anda dapat [mewarisi](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm) untuk memperluasnya menjadi sesuatu yang berguna.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### Impor Pernyataan {#import-statements}

Selain definisi antarmuka di atas, definisi kontrak mengimpor dua file lainnya:

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol` adalah definisi yang diperlukan untuk menggunakan [OpenGSN](https://www.opengsn.org/), sistem yang mengizinkan pengguna tanpa ether untuk menggunakan rantai blok. Perhatikan bahwa versi ini adalah versi yang lama, jika Anda ingin mengintegrasikannya dengan OpenGSN, [gunakan tutorial ini](https://docs.opengsn.org/javascript-client/tutorial.html).
- [Pustaka SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/), yang digunakan untuk membuat penambahan dan pengurangan tanpa berlebihan. Pustaka ini diperlukan karena jika tidak seseorang dapat entah bagaimana memiliki satu token, membelanjakan dua token, dan kemudian memiliki 2^256-1 token.

&nbsp;

Komentar ini menjelaskan tujuan dari kontrak.

```solidity
/**
 * @dev Penerapan dari antarmuka {IERC20}.
 *
 * Penerapan ini bersifat agnostik terhadap cara token dibuat. Artinya,
 * mekanisme persediaan harus ditambahkan dalam kontrak yang dihasilkan menggunakan {_mint}.
 * Untuk mekanisme generik, lihat {ERC20PresetMinterPauser}.
 *
 * TIP: Untuk tulisan terperinci, lihat panduan kami
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[Cara
 * menerapkan mekanisme persediaan].
 *
 * Kita telah mengikuti pedoman OpenZeppelin: fungsi membalikkan alih-alih
 * mengembalikan `salah` saat kegagalan terjadi. Namun, perilaku ini bersifat konvensional
 * dan tidak bertentangan dengan ekspektasi aplikasi ERC20.
 *
 * Selain itu, aksi {Approval} dipancarkan saat melakukan panggilan ke {transferFrom}.
 * Aksi ini membuat aplikasi merekonstruksi kembali tunjangan untuk semua akun hanya
 * dengan mendengarkan aksi yang dikatakan. Penerapan lain dari EIP tidak dapat memancarkan
 * aksi ini, karena tidak diharuskan oleh spesifikasi.
 *
 * Akhirnya, fungsi {decreaseAllowance} dan {increaseAllowance}
 * non-standar telah ditambahkan untuk mengurangi masalah yang diketahui seputar pengaturan
 * tunjangan. Lihat {IERC20-approve}.
 */

```

### Definisi Kontrak {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

This line specifies the inheritance, in this case from `IERC20` from above and `Context`, for OpenGSN.

&nbsp;

```solidity

    using SafeMath for uint256;

```

Baris ini melekatkan pustaka `SafeMath` ke jenis `uint256`. Anda dapat menemukan pustaka ini [di sini](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol).

### Definisi Variabel {#variable-definitions}

Definisi-definisi ini menentukan variabel status kontrak. Variabel-variabel ini dinyatakan bersifat `pribadi`, tetapi hanya berarti bahwa kontrak lain di rantai blok tidak dapat membaca variabel-variabel tersebut. _Tidak ada rahasia di rantai blok_, perangkat lunak di setiap simpul memiliki status dari setiap kontrak dalam setiap blok. Dengan konvensi, variabel status diberi nama `_<something>`.

Kedua variabel pertama adalah [pemetaan](https://www.tutorialspoint.com/solidity/solidity_mappings.htm), artinya berperilaku kurang lebih sama dengan, [larik asosiatif](https://wikipedia.org/wiki/Associative_array), dengan pengecualian bahwa kuncinya adalah nilai angka. Penyimpanan hanya dialokasikan untuk entri yang memiliki nilai berbeda dari default (nol).

```solidity
    mapping (address => uint256) private _balances;
```

Pemetaan pertama, `_balances`, adalah alamat dan saldo masing-masing token ini. Untuk mengakses saldo, gunakan sintaksis ini: `_balances[<address>]`.

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

Variabel ini, `_allowances`, menyimpan tunjangan yang dijelaskan sebelumnya. Indeks pertama adalah pemiliki token, dan indeks kedua adalah kontrak dengan tunjangan. Untuk mengakses jumlah yang dapat dibelanjakan alamat A dari akun alamat B, gunakan `_allowances[B][A]`.

&nbsp;

```solidity
    uint256 private _totalSupply;
```

Seperti usulan namanya, variabel ini menelusuri total persediaan token.

&nbsp;

```solidity
    string private _name;
    string private _symbol;
    uint8 private _decimals;
```

Ketiga variabel ini digunakan untuk meningkatkan keterbacaan. Kedua variabel pertama cukup jelas, tetapi `_decimals` tidak jelas.

Di satu sisi, Ethereum tidak memiliki titik mengambang atau variabel pecahan. Di sisi lain, manusia suka bisa membagi token. Satu alasan orang-orang puas dengan emas sebagai mata uang adalah bahwa emas sulit diubah ketika seseorang ingin membeli nilai yang sedikit dari sesuatu yang besar.

Solusinya adalah menelusuri bilangan bulat, tetapi sebagai gantinya menghitung token aslinya sebagai token pecahan yang hampir tidak berharga. Dalam kasus ether, token pecahan disebut wei, dan 10^18 wei sama dengan satu ETH. Dalam tulisan, 10.000.000.000.000 wei kira-kira sama dengan satu sen AS atau Euro.

Aplikasi perlu mengetahui cara menampilkan saldo token. Jika pengguna memiliki 3.141.000.000.000.000.000 wei, apakah itu sama dengan 3,14 ETH? 31,41 ETH? 3.141 ETH? Dalam kasus ether, nilai ini didefiniskan sebagai 10^18 wei untuk ETH, tetapi untuk token Anda, Anda dapat memilih nilai yang berbeda. Jika membagi token tidak masuk akal, Anda dapat menggunakan nilai nol `_decimals`. Jika Anda ingin menggunakan standar yang sama seperti ETH, gunakan nilai **18**.

### Konstruktor {#the-constructor}

```solidity
    /**
     * @dev Menetapkan nilai untuk {name} dan {symbol}, menginisialisasi {decimals} dengan
     * nilai default 18.
     *
     * Untuk memilih nilai berbeda untuk {decimals}, gunakan {_setupDecimals}.
     *
     * Semua ketiga nilai ini tak dapat diubah: mereka hanya dapat ditetapkan sekali setelah
     * konstruksi.
     */
    constructor (string memory name_, string memory symbol_) public {
        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

Konstruktor dipanggil ketika kontrak terlebih dahulu dibuat. Dengan konvensi, parameter fungsi diberi nama `<something>_`.

### Fungsi Antarmuka Pengguna {#user-interface-functions}

```solidity
    /**
     * @dev Mengembalikan nama token.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Returns the number of decimals used to get its user representation.
     * Sebagai contoh, jika `desimal` sama dengan `2`, saldo token `505` token harus
     * ditampilkan untuk pengguna sebagai `5.05` (`505 / 10 ** 2`).
     *
     * Token biasanya memilih nilai 18, yang meniru hubungan antara
     * ether dan wei. Ini nilai yang digunakan {ERC20}, kecuali {_setupDecimals} di
     * panggil.
     *
     * CATATAN: Informasi ini hanya digunakan untuk tujuan _display_: itu tidak
     * sama sekali berdampak terhadap aritmatika mana pun dari kontrak, termasuk
     * {IERC20-balanceOf} dan {IERC20-transfer}.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

Fungsi-fungsi ini, `nama`, `simbol`, dan `desimal` menolong antarmuka pengguna mengetahui tentang kontrak Anda sehingga mereka dapat menampilkannya dengan benar.

Jenis pengembaliannya adalah `memori string`, yang berarti kembalikan string yang tersimpan dalam memori. Variabel-variabel, seperti string, dapat tersimpan dalam tiga lokasi:

|             | Seumur hidup       | Akses Kontrak | Biaya Gas                                                                              |
| ----------- | ------------------ | ------------- | -------------------------------------------------------------------------------------- |
| Memori      | Pemanggilan fungsi | Baca/Tulis    | Puluhan atau ratusan (lebih tinggi untuk lokasi yang lebih tinggi)                     |
| Calldata    | Pemanggilan fungsi | Baca Saja     | Tidak dapat digunakan sebagai jenis pengembalian, hanya sebagai jenis parameter fungsi |
| Penyimpanan | Sampai diubah      | Baca/Tulis    | Tinggi (800 untuk baca, 20.000 untuk tulis)                                            |

Dalam kasus ini, `memori` adalah pilihan terbaik.

### Informasi Token Baca {#read-token-information}

Fungsi-fungsi ini menyediakan informasi tentang token, baik total persediaan atau saldo akun.

```solidity
    /**
     * @dev See {IERC20-totalSupply}.
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
```

Fungsi `totalSupply` mengembalikan total persediaan token.

&nbsp;

```solidity
    /**
     * @dev See {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
```

Baca saldo akun. Perhatikan bahwa siapa pun boleh mendapatkan saldo akun orang lain. Bagaimanapun juga, tidak ada gunanya mencoba menyembunyikan informasi ini, karena informasi tersebut tersedia di setiap simpul. _Tidak ada rahasia di rantai blok._

### Token Transfer {#transfer-tokens}

```solidity
    /**
     * @dev See {IERC20-transfer}.
     *
     * Persyaratan:
     *
     * - `penerima` tidak dapat berupa alamat kosong.
     * - pemanggil harus memiliki saldo `jumlah` minimum.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

Fungsi `transfer` dipanggil untuk mentransfer token dari akun pengirim ke akun berbeda. Perhatikan bahwa meskipun fungsi tersebut mengembalikan nilai boolean, nilai tesebut selalu **benar**. Jika transfer gagal, kontrak membalikkan panggilannya.

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

Fungsi `_transfer` melakukan pekerjaan sebenarnya. Ini adalah fungsi pribadi yang hanya dapat dipanggil melalui fungsi kontrak lainnya. Dengan konvensi, fungsi pribadi diberi nama `_<something>`, sama seperti variabel status.

Umumnya dalam Solidity, kita menggunakan `msg.sender` untuk pengirim pesan. Namun, itu memecah [OpenGSN](http://opengsn.org/). Jika kita ingin mengizinkan transaksi tanpa ether dengan token kita, kita perlu menggunakan `_msgSender()`. Fungsi tersebut mengembalikan `msg.sender` untuk transaksi normal, tetapi untuk transaksi tanpa ether mengembalikan penandatangan asli dan bukan kontrak yang menyampaikan pesan.

### Fungsi Tunjangan {#allowance-functions}

Ini adalah fungsi yang menerapkan fungsionalitas tunjangan: `tunjangan`, `persetujuan`, `transferFrom`, dan `_approve`. Selain itu, penerapan OpenZeppelin melebihi standar dasar yang memasukkan beberapa fitur sehingga meningkatkan keamanan: `increaseAllowance`, dan `decreaseAllowance`.

#### Fungsi tunjangan {#allowance}

```solidity
    /**
     * @dev See {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

Fungsi `tunjangan` membuat semua orang memeriksa tunjangan mana pun.

#### Fungsi persetujuan {#approve}

```solidity
    /**
     * @dev See {IERC20-approve}.
     *
     * Persyaratan:
     *
     * - `pembelanja` tidak dapat berupa alamat kosong.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

Fungsi ini dipanggil untuk membuat tunjangan. Fungsi ini serupa dengan fungsi `transfer` di atas:

- Fungsi hanya memanggil fungsi internal (dalam kasus ini, `_approve`) yang melakukan proses sebenarnya.
- Fungsi baik mengembalikan yang `benar` (jika berhasil) maupun membalikkan (jika tidak).

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

Kita menggunakan fungsi internal untuk meminimalkan jumlah tempat di mana perubahan status terjadi. Fungsi _mana pun_ yang mengubah status merupakan resiko keamanan berpotensi yang perlu diaudit demi keamanan. Dengan cara ini, kita mengurangi peluang untuk kesalahan.

#### Fungsi transferFrom {#transferFrom}

Fungsi ini dipanggil pembelanja untuk membelanjakan tunjangan. Fungsi ini memerlukan dua operasi: transfer jumlah yang akan dibelanjakan dan kurangi tunjangan sebesar jumlah tersebut.

```solidity
    /**
     * @dev See {IERC20-transferFrom}.
     *
     * Memancarkan aksi {Approval} menunjukkan tunjangan yang diperbarui. Ini tidak
     * diharuskan oleh EIP. Lihat catatan awal {ERC20}.
     *
     * Persyaratan:
     *
     * - `pengirim` dan `penerima` tidak dapat merupakan alamat nol.
     * - `pengirim` harus memiliki saldo `jumlah` minimum.
     * - pemanggil harus memiliki saldo untuk token``pengirim`` sebesar
     * `jumlah` minimum.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

Panggilan fungsi `a.sub(b, "message")` melakukan dua hal. Pertama, fungsi tersebut menghitung `a-b`, yang adalah tunjangan baru. Kedua, fungsi tersebut memeriksa apakah hasil ini tidak negatif. Jika negatif, panggilan membalikkan dengan pesan yang disediakan. Perhatikan bahwa ketika panggilan membalikkan, pemrosesan mana pun yang dilakukan sebelumnya selama panggilan tersebut diabaikan, sehingga kita tidak perlu membatalkan `_transfer`.

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

#### Penambahan keamanan OpenZeppelin {#openzeppelin-safety-additions}

Menetapkan tunjangan tidak nol ke nilai tidak nol lainnya berbahaya, karena Anda hanya mengendalikan urutan transaksi Anda sendiri, bukan milik orang lain. Bayangkan Anda mempunyai dua pengguna, Alice yang naif dan Bill yang tidak jujur. Alice menginginkan beberapa layanan dari Bill, yang dipikirnya membutuhkan lima token - sehingga ia memberikan tunjangan sebesar lima token kepada Bill.

Lalu, sesuatu berubah dan harga Bill naik menjadi sepuluh token. Alice, yang masih memerlukan layanan, mengirim transaksi yang menetapkan tunjangan Bill menjadi sepuluh token. Saat Bill melihat transaksi baru ini dalam pool transaksi, ia mengirim transaksi yang membelanjakan lima token Alice dan memiliki harga gas yang jauh lebih tinggi, sehingga transaksi akan ditambang lebih cepat. Dengan cara itu, Bill dapat membelanjakan kelima token pertama dan kemudian, setelah tunjangan baru Alice ditambang, membelanjakan sepuluh token lagi untuk total harga lima belas token, melebihi jumlah yang dizinkan oleh Alice. Teknik ini disebut [front-running](https://consensys.github.io/smart-contract-best-practices/attacks/#front-running)

| Transaksi Alice   | Nonce Alice | Transaksi Bill                | Nonce Bill | Tunjangan Bill | Tagihkan Total Pendapatan dari Alice |
| ----------------- | ----------- | ----------------------------- | ---------- | -------------- | ------------------------------------ |
| approve(Bill, 5)  | 10          |                               |            | 5              | 0                                    |
|                   |             | transferFrom(Alice, Bill, 5)  | 10.123     | 0              | 5                                    |
| approve(Bill, 10) | 11          |                               |            | 10             | 5                                    |
|                   |             | transferFrom(Alice, Bill, 10) | 10.124     | 0              | 15                                   |

Untuk menghindari masalah ini, kedua fungsi ini (`increaseAllowance` dan `decreaseAllowance`) memmbuat Anda dapat memodifikasi tunjangan sebesar jumlah tertentu. Jadi, jika Bill telah membelanjakan lima token, ia hanya akan dapat membelanjakan lima token lagi. Depending on the timing, there are two ways this can work, both of which end with Bill only getting ten tokens:

A:

| Transaksi Alice            | Nonce Alice | Transaksi Bill               | Nonce Bill | Tunjangan Bill | Tagihkan Total Pendapatan dari Alice |
| -------------------------- | ----------: | ---------------------------- | ---------: | -------------: | ------------------------------------ |
| approve(Bill, 5)           |          10 |                              |            |              5 | 0                                    |
|                            |             | transferFrom(Alice, Bill, 5) |     10.123 |              0 | 5                                    |
| increaseAllowance(Bill, 5) |          11 |                              |            |        0+5 = 5 | 5                                    |
|                            |             | transferFrom(Alice, Bill, 5) |     10.124 |              0 | 10                                   |

B:

| Transaksi Alice            | Nonce Alice | Transaksi Bill                | Nonce Bill | Tunjangan Bill | Tagihkan Total Pendapatan dari Alice |
| -------------------------- | ----------: | ----------------------------- | ---------: | -------------: | -----------------------------------: |
| approve(Bill, 5)           |          10 |                               |            |              5 |                                    0 |
| increaseAllowance(Bill, 5) |          11 |                               |            |       5+5 = 10 |                                    0 |
|                            |             | transferFrom(Alice, Bill, 10) |     10.124 |              0 |                                   10 |

```solidity
    /**
     * @dev Secara atomik meningkatkan tunjangan yang diberikan ke `pembelanja` oleh pemanggil.
     *
     * Alternatif ini untuk {approve} yang dapat digunakan sebagai solusi untuk masalah yang
     * dideskripsikan dalam {IERC20-approve}.
     *
     * Memancarkan aksi {Approval} menunjukkan tunjangan yang diperbarui.
     *
     * Persyaratan:
     *
     * - `pembelanja` tidak dapat berupa alamat kosong.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

Fungsi `a.add(b)` aman untuk ditambahkan. Dalam kasus yang jarang terjadi bahwa `a`+`b`>=`2^256`, fungsi tersebut tidak membungkus seperti dalam cara yang dilakukan penambahan normal.

```solidity

    /**
     * @dev Secara atomik mengurangi tunjangan yang diberikan ke `pembelanja` oleh pemanggil.
     *
     * Alternatif ini untuk {approve} yang dapat digunakan sebagai solusi untuk masalah yang
     * dideskripsikan dalam {IERC20-approve}.
     *
     * Memancarkan aksi {Approval} menunjukkan tunjangan yang diperbarui.
     *
     * Persyaratan:
     *
     * - `pembelanja` tidak dapat berupa alamat kosong.
     * - `pembelanja` harus memiliki tunjangan untuk pemanggil minimum
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: decreased allowance below zero"));
        return true;
    }
```

### Fungsi yang Memodifikasi Informasi Token {#functions-that-modify-token-information}

Keempat fungsi ini melakukan pekerjaan sebenarnya: `_transfer`, `_mint`, `_burn`, dan `_approve`.

#### Fungsi \_transfer {#\_transfer}

```solidity
    /**
     * @dev Memindahkan `jumlah` token dari `pengirim` ke `penerima`.
     *
     * Fungsi internal ini setara dengan {transfer}, dan dapat digunakan untuk
     * misalnya, menerapkan biaya token otomatis, mekanisme pemotongan, dll.
     *
     * Memancarkan peristiwa {Transfer}.
     *
     * Persyaratan:
     *
     * - `pengirim` tidak dapat berupa alamat kosong.
     * - `penerima` tidak dapat berupa alamat kosong.
     * - `pengirim` harus memiliki saldo `jumlah` minimum.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

Fungsi ini, `_transfer`, mentransfer token dari satu akun ke akun lainnya. Fungsi ini dipanggil melalui kedua `transfer` (untuk mentransfer dari akun pengirim sendiri) dan `transferFrom` (untuk menggunakan tunjangan guna mentransfer dari akun orang lain).

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

Tidak seorang pun yang benar-benar memiliki alamat kosong di Ethereum (yakni, tidak seorang pun yang tahu kunci pribadi di mana kunci publik yang berkesesuaian diubah menjadi alamat kosong). Ketika manusia menggunakan alamat itu, biasanya alamat itu merupakan bug perangkat lunak - sehingga transaksi kita gagal jika alamat kosong digunakan sebagai pengirim atau penerima.

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

Ada dua cara untuk menggunakan kontrak ini:

1. Gunakan kontrak tersebut sebagai templat untuk kode Anda sendiri
1. [Mewarisi dari kontrak](https://www.bitdegree.org/learn/solidity-inheritance), dan hanya menimpa fungsi-fungsi yang perlu Anda modifikasi

Metode kedua jauh lebih baik karena kode ERC-20 OpenZeppelin telah diaudit dan dinyatakan aman. Ketika Anda menggunakan warisan, jelas fungsi yang Anda modifikasi, dan untuk mempercayai kontrak Anda, manusia hanya perlu mengaudit fungsi khusus tersebut.

Sering kali kita perlu menjalankan fungsi setiap kali token berpindah tangan. Namun, `_transfer` merupakan fungsi yang sangat penting dan mungkin untuk menulis dengan tidak aman (lihat di bawah), sehingga menjadi langkah terbaik jika tidak menimpanya. Solusinya adalah `_beforeTokenTransfer`, [fungsi kaitan](https://wikipedia.org/wiki/Hooking). Anda dapat menimpa fungsi ini, dan fungsi tersebut akan dipanggil pada setiap transfer.

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

Baris-baris ini benar-benar melakukan transfer. Perhatikan bahwa **tidak terjadi masalah** di antara baris-baris tersebut, dan bahwa kita mengurangi jumlah yang ditransfer dari pengirim sebelum menambahkannya ke penerima. Ini penting karena jika ada panggilan ke kontrak berbeda di pertengahan, panggilan tersebut dapat digunakan untuk mencurangi kontrak ini. Dengan cara ini, transfer bersifat atomik, tidak ada yang dapat terjadi di pertengahan proses.

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

Akhirnya, pancarkan aksi `Transfer`. Aksi tidak dapat diakses oleh kontrak pintar, tetapi kode yang beroperasi di luar rantai blok dapat mendengarkan aksi dan bereaksi terhadapnya. Contohnya, dompet dapat menelusuri waktu pemilik mendapatkan lebih banyak token.

#### Fungsi \_mint dan \_burn {#\_mint-and-\_burn}

Kedua fungsi (`_mint` dan `_burn`) ini memodifikasi total persediaan token. Kedua fungsi tersebut bersifat internal dan tidak memiliki fungsi yang memanggil kedua fungsi tersebut dalam kontrak ini, sehingga kedua fungsi tersebut hanya berguna jika Anda mewariskannya dari kontrak dan menambahkan logika Anda sendiri untuk menentukan dalam kondisi apa untuk mencetak token baru atau membakar token yang sudah ada.

**CATATAN:** Setiap token ERC-20 memiliki logika bisnisnya sendiri yang mengatur manajemen token. Contohnya, kontrak persediaan yang tetap mungkin hanya memanggil `_mint` dalam konstruktor dan tidak pernah memanggil `_burn`. Kontrak yang menjual token akan memanggil `_mint` ketika ia dibayarkan, dan agaknya memanggil `_burn` pada titik tertentu untuk menghindari inflasi yang cepat.

```solidity
    /** @dev Membuat token `jumlah` dan menetapkan token ke `akun`, yang meningkatkan
     * total persediaan token.
     *
     * Memancarkan aksi {Transfer} dengan `dari` yang ditetapkan ke alamat kosong.
     *
     * Persyaratan:
     *
     * - `ke` tidak dapat berupa alamat kosong.
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");
        _beforeTokenTransfer(address(0), account, amount);
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Pastikan memperbarui `_totalSupply` ketika total jumlah token berubah.

&nbsp;

```
    /**
     * @dev Menghancurkan token `jumlah` dari `akun`, yang mengurangi
     * total persediaan.
     *
     * Memancarkan aksi {Transfer} dengan `ke` yang ditetapkan ke alamat kosong.
     *
     * Persyaratan:
     *
     * - `akun` tidak dapat berupa alamat kosong.
     * - `akun` harus memiliki token `jumlah` minimum.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }
```

Fungsi `_burn` hampir sama dengan `_mint`, kecuali bergerak ke arah yang lain.

#### Fungsi \_approve {#\_approve}

Fungsi ini benar-benar menentukan tunjangan. Perhatikan bahwa fungsi tersebut membuat pemilik menentukan tunjangan yang lebih tinggi dari saldo pemilik saat ini. Ini OKE karena saldo diperiksa pada waktu transfer terjadi, ketika saldonya dapat berbeda dari saldo saat tunjangan dibuat.

```solidity
    /**
     * @dev Menetapkan `jumlah` sebagai tunjangan `pengguna` melalui token `pemilik`.
     *
     * Fungsi internal ini sama dengan `persetujuan`, dan dapat digunakan untuk
     * misalnya, menetapkan tunjangan otomatis untuk subsistem tertentu, dll.
     *
     * Memancarkan aksi {Approval}.
     *
     * Persyaratan:
     *
     * - `pemilik` tidak dapat berupa alamat kosong.
     * - `pembelanja` tidak dapat berupa alamat kosong.
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
```

&nbsp;

Pancarkan aksi `Persetujuan`. Bergantung pada cara aplikasi ditulis, kontrak pembelanja dapat diberitahu tentang persetujuan baik oleh pemilik maupun server yang mendengarkan aksi ini.

```solidity
        emit Approval(owner, spender, amount);
    }

```

### Modifikasi Variabel Desimal {#modify-the-decimals-variable}

```solidity


    /**
     * @dev Menetapkan {decimals} ke nilai selain nilai default 18.
     *
     * PERINGATAN: Fungsi ini hanya boleh dipanggil dari konstruktor. Kebanyakan
     * aplikasi yang berinteraksi dengan kontrak token tidak akan mengharapkan
     * {decimals} berubah, dan dapat berfungsi dengan tidak benar jika itu terjadi.
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

Fungsi ini memodifikasi variabel `_decimals` yang digunakan untuk memberitahu antarmuka pengguna tentang cara menafsirkan jumlahnya. Anda seharusnya memanggilnya dari konstruktor. Tidak jujur untuk memanggilnya pada titik berikut mana pun, dan aplikasi tidak dirancang untuk menangani ketidakjujuran tersebut.

### Kaitan {#hooks}

```solidity

    /**
     * @dev Kaitan yang dipanggil sebelum transfer token mana pun. Termasuk
     * mencetak dan membakar.
     *
     * Syarat panggilan:
     *
     * - ketika `dari` dan `ke` keduanya berupa bukan nol, `jumlah` dari token ``dari``
     * akan ditransfer ke `ke`.
     * - ketika `dari` adalah nol, token `jumlah` akan dicetak untuk `ke`.
     * - ketika `ke` adalah nol, `jumlah` dari token ``dari`` akan dibakar.
     * - `dari` dan `ke` keduanya tidak pernah berupa nol.
     *
     * Untuk mempelajari selengkapnya tentang kaitan, beralih ke xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

Fungsi kaitan ini yang akan dipanggil selama transfer. It is empty here, but if you need it to do something you just override it.

# Kesimpulan {#conclusion}

Sebagai tinjauan ulang, berikut adalah beberapa pemikiran paling penting dalam kontrak ini (menurut pendapat saya, kepunyaan Anda mungkin bisa saja berbeda):

- _Tidak ada rahasia di rantai blok_. Informasi apa pun yang dapat diakses oleh kontrak pintar tersedia untuk seluruh dunia.
- Anda dapat mengendalikan urutan transaksi Anda sendiri, tetapi tidak dapat mengendalikan saat transaksi orang lain terjadi. Alasan ini mengubah tunjangan dapat menjadi berbahaya, karena membiarkan pembelanja membelanjakan jumlah dari kedua tunjangan.
- Nilai dari jenis `uint256` diperbesar. Dengan kata lain, _0-1=2^256-1_. Jika merupakan perilaku yang tidak diharapkan, Anda perlu memeriksanya (atau gunakan pustaka SafeMath yang melakukannya untuk Anda). Perhatikan bahwa perilaku ini berubah dalam [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html).
- Lakukan semua perubahan status dari jenis khusus dalam tempat khusus, karena membuat proses audit lebih mudah dilakukan. Alasan ini membuat kita memiliki, contohnya, `_approve`, yang dipanggil melalui `persetujuan`, `transferFrom`, `increaseAllowance`, dan `decreaseAllowance`
- Perubahan status harus bersifat atomik, tanpa adanya tindakan lain di pertengahan (seperti yang dapat Anda lihat dalam `_transfer`). Perubahan ini terjadi selama perubahan status di mana Anda memiliki status yang tidak konsisten. Contohnya, antara waktu Anda mengurangi saldo pengirim dan waktu Anda menambahkan saldo penerima, lebih sedikit token yang ada dari jumlah sebenarnya. Dapat berpotensi disalahgunakan jika ada operasi di antara kedua waktu tersebut, khususnya panggilan ke kontrak yang berbeda.

Sekarang, karena Anda telah melihat cara kontrak OpenZeppelin ERC-20 ditulis, dan khususnya caranya dibuat lebih aman, buka dan tulis kontrak dan aplikasi Anda sendiri yang aman.
