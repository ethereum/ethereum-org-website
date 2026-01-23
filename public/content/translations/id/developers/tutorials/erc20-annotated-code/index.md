---
title: "Panduan Lengkap Kontrak ERC-20"
description: Apa isi kontrak ERC-20 OpenZeppelin dan mengapa ada di sana?
author: Ori Pomerantz
lang: id
tags: [ "Solidity", "erc-20" ]
skill: beginner
published: 2021-03-09
---

## Pengenalan {#introduction}

Salah satu kegunaan paling umum dari Ethereum untuk suatu grup adalah membuat token yang dapat dipertukarkan, dalam pengertian sebagai mata uang mereka sendiri. Token ini biasanya mengikuti standar,
[ERC-20](/developers/docs/standards/tokens/erc-20/). Standar ini memungkinkan pembuatan alat, seperti pool likuiditas dan dompet, yang berfungsi dengan semua token
ERC-20. Dalam artikel ini kami akan menganalisis
[implementasi Solidity ERC20 dari OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol), serta
[definisi antarmukanya](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol).

Ini adalah kode sumber beranotasi. Jika Anda ingin mengimplementasikan ERC-20,
[baca tutorial ini](https://docs.openzeppelin.com/contracts/2.x/erc20-supply).

## Antarmuka {#the-interface}

Tujuan dari standar seperti ERC-20 adalah untuk memungkinkan banyak implementasi token yang interoperabel di seluruh aplikasi, seperti dompet dan bursa terdesentralisasi. Untuk mencapainya, kami membuat sebuah
[antarmuka](https://www.geeksforgeeks.org/solidity/solidity-basics-of-interface/). Setiap kode yang perlu menggunakan kontrak
token dapat menggunakan definisi yang sama di antarmuka dan kompatibel dengan semua kontrak token yang menggunakannya, baik itu dompet seperti
MetaMask, sebuah dapp seperti etherscan.io, atau kontrak lain seperti pool likuiditas.

![Ilustrasi antarmuka ERC-20](erc20_interface.png)

Jika Anda seorang pemrogram berpengalaman, Anda mungkin ingat pernah melihat konstruksi serupa di [Java](https://www.w3schools.com/java/java_interface.asp)
atau bahkan di [file header C](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html).

Ini adalah definisi dari [Antarmuka ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)
dari OpenZeppelin. Ini adalah terjemahan dari [standar yang dapat dibaca manusia](https://eips.ethereum.org/EIPS/eip-20) ke dalam kode Solidity. Tentu saja,
antarmuka itu sendiri tidak mendefinisikan _bagaimana_ melakukan apa pun. Hal itu dijelaskan dalam kode sumber kontrak di bawah ini.

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

File Solidity seharusnya menyertakan pengenal lisensi. [Anda dapat melihat daftar lisensinya di sini](https://spdx.org/licenses/). Jika Anda memerlukan lisensi yang
berbeda, jelaskan saja di kolom komentar.

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Bahasa Solidity masih berkembang pesat, dan versi baru mungkin tidak kompatibel dengan kode lama
([lihat di sini](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)). Oleh karena itu, ada baiknya untuk menentukan tidak hanya versi minimum
bahasa, tetapi juga versi maksimumnya, yaitu versi terbaru yang Anda gunakan untuk menguji kode tersebut.

&nbsp;

```solidity
/**
 * @dev Antarmuka standar ERC20 sebagaimana didefinisikan dalam EIP.
 */
```

`@dev` di dalam komentar adalah bagian dari [format NatSpec](https://docs.soliditylang.org/en/develop/natspec-format.html), yang digunakan untuk menghasilkan
dokumentasi dari kode sumber.

&nbsp;

```solidity
interface IERC20 {
```

Menurut konvensi, nama antarmuka diawali dengan `I`.

&nbsp;

```solidity
    /**
     * @dev Mengembalikan jumlah token yang ada.
     */
    function totalSupply() external view returns (uint256);
```

Fungsi ini `external`, artinya [hanya dapat dipanggil dari luar kontrak](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2).
Fungsi ini mengembalikan total pasokan token dalam kontrak. Nilai ini dikembalikan menggunakan tipe paling umum di Ethereum, 256-bit unsigned (256 bit adalah
ukuran kata asli dari EVM). Fungsi ini juga merupakan `view`, yang berarti tidak mengubah state, sehingga dapat dieksekusi pada satu simpul, alih-alih harus dijalankan oleh
setiap simpul di rantai blok. Fungsi semacam ini tidak menghasilkan transaksi dan tidak memerlukan biaya [gas](/developers/docs/gas/).

**Catatan:** Secara teori, sepertinya pembuat kontrak bisa berbuat curang dengan mengembalikan total pasokan yang lebih kecil dari nilai sebenarnya, membuat setiap token tampak
lebih berharga daripada yang sebenarnya. Namun, kekhawatiran itu mengabaikan sifat asli dari rantai blok. Semua yang terjadi di rantai blok dapat diverifikasi oleh
setiap simpul. Untuk mencapai ini, kode bahasa mesin dan penyimpanan setiap kontrak tersedia di setiap simpul. Meskipun Anda tidak diwajibkan untuk memublikasikan kode Solidity
untuk kontrak Anda, tidak ada yang akan menganggap Anda serius kecuali Anda memublikasikan kode sumber dan versi Solidity yang digunakan untuk mengompilasinya, sehingga dapat
diverifikasi terhadap kode bahasa mesin yang Anda berikan.
Sebagai contoh, lihat [kontrak ini](https://eth.blockscout.com/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD?tab=contract).

&nbsp;

```solidity
    /**
     * @dev Mengembalikan jumlah token yang dimiliki oleh `account`.
     */
    function balanceOf(address account) external view returns (uint256);
```

Seperti namanya, `balanceOf` mengembalikan saldo sebuah akun. Akun Ethereum diidentifikasi di Solidity menggunakan tipe `address`, yang menampung 160 bit.
Fungsi ini juga `external` dan `view`.

&nbsp;

```solidity
    /**
     * @dev Memindahkan token `amount` dari akun pemanggil ke `recipient`.
     *
     * Mengembalikan nilai boolean yang menunjukkan apakah operasi berhasil.
     *
     * Memancarkan aksi {Transfer}.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

Fungsi `transfer` mentransfer token dari pemanggil ke alamat yang berbeda. Ini melibatkan perubahan state, jadi ini bukan fungsi `view`.
Ketika pengguna memanggil fungsi ini, sebuah transaksi akan dibuat dan akan dikenakan biaya gas. Fungsi ini juga memancarkan aksi, `Transfer`, untuk menginformasikan semua orang di
rantai blok tentang aksi tersebut.

Fungsi ini memiliki dua jenis keluaran untuk dua jenis pemanggil yang berbeda:

- Pengguna yang memanggil fungsi secara langsung dari antarmuka pengguna. Biasanya pengguna mengirimkan transaksi
  dan tidak menunggu respons, yang bisa memakan waktu yang tidak ditentukan. Pengguna dapat melihat apa yang terjadi
  dengan mencari resi transaksi (yang diidentifikasi oleh hash transaksi) atau dengan mencari
  aksi `Transfer`.
- Kontrak lain, yang memanggil fungsi sebagai bagian dari transaksi keseluruhan. Kontrak-kontrak tersebut langsung mendapatkan hasilnya,
  karena berjalan di transaksi yang sama, sehingga mereka dapat menggunakan nilai kembalian fungsi.

Tipe keluaran yang sama dibuat oleh fungsi-fungsi lain yang mengubah state kontrak.

&nbsp;

Allowance mengizinkan sebuah akun untuk membelanjakan sejumlah token yang dimiliki oleh pemilik yang berbeda.
Ini berguna, misalnya, untuk kontrak yang bertindak sebagai penjual. Kontrak tidak
dapat memantau aksi, jadi jika pembeli mentransfer token ke kontrak penjual
secara langsung, kontrak tersebut tidak akan tahu bahwa ia telah dibayar. Sebagai gantinya, pembeli mengizinkan
kontrak penjual untuk membelanjakan sejumlah tertentu, dan penjual mentransfer jumlah tersebut.
Ini dilakukan melalui fungsi yang dipanggil kontrak penjual, sehingga kontrak penjual
dapat mengetahui apakah itu berhasil.

```solidity
    /**
     * @dev Mengembalikan jumlah token yang tersisa yang akan diizinkan untuk dibelanjakan oleh `spender`
     * atas nama `owner` melalui {transferFrom}. Ini adalah
     * nol secara default.
     *
     * Nilai ini berubah ketika {approve} atau {transferFrom} dipanggil.
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

Fungsi `allowance` memungkinkan siapa saja untuk melakukan kueri untuk melihat berapa allowance yang
diberikan satu alamat (`owner`) kepada alamat lain (`spender`) untuk dibelanjakan.

&nbsp;

```solidity
    /**
     * @dev Menetapkan `amount` sebagai allowance `spender` atas token pemanggil.
     *
     * Mengembalikan nilai boolean yang menunjukkan apakah operasi berhasil.
     *
     * PENTING: Waspadalah bahwa mengubah allowance dengan metode ini membawa risiko
     * bahwa seseorang dapat menggunakan allowance lama dan baru dengan urutan
     * transaksi yang tidak menguntungkan. Salah satu solusi yang mungkin untuk mengurangi kondisi
     * balapan ini adalah dengan terlebih dahulu mengurangi allowance spender menjadi 0 dan menetapkan
     * nilai yang diinginkan setelahnya:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Memancarkan aksi {Approval}.
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

Fungsi `approve` membuat sebuah allowance. Pastikan untuk membaca pesan tentang
bagaimana hal itu dapat disalahgunakan. Di Ethereum, Anda mengendalikan urutan transaksi Anda sendiri,
tetapi Anda tidak dapat mengendalikan urutan di mana transaksi orang lain
akan dilaksanakan, kecuali jika Anda tidak mengirimkan transaksi Anda sendiri sampai
Anda melihat transaksi pihak lainnya telah terjadi.

&nbsp;

```solidity
    /**
     * @dev Memindahkan `amount` token dari `sender` ke `recipient` menggunakan
     * mekanisme tunjangan. `amount` kemudian dikurangi dari
     * tunjangan pemanggil.
     *
     * Mengembalikan nilai boolean yang menunjukkan apakah operasi berhasil.
     *
     * Memancarkan sebuah aksi {Transfer}.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Akhirnya, `transferFrom` digunakan oleh pembelanja untuk benar-benar menggunakan tunjangan.

&nbsp;

```solidity

    /**
     * @dev Dipancarkan ketika `value` token dipindahkan dari satu akun (`from`) ke
     * akun lain (`to`).
     *
     * Perhatikan bahwa `value` mungkin nol.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Dipancarkan ketika tunjangan `spender` untuk `owner` diatur oleh
     * panggilan ke {approve}. `value` adalah tunjangan baru.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Aksi ini dipancarkan ketika status kontrak ERC-20 berubah.

## Kontrak Sebenarnya {#the-actual-contract}

Ini adalah kontrak sebenarnya yang mengimplementasikan standar ERC-20,
[diambil dari sini](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Ini tidak dimaksudkan untuk digunakan apa adanya, tetapi Anda dapat
[mewarisi](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm) darinya untuk mengembangkannya menjadi sesuatu yang dapat digunakan.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### Pernyataan Impor {#import-statements}

Selain definisi antarmuka di atas, definisi kontrak mengimpor dua file lainnya:

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol` adalah definisi yang diperlukan untuk menggunakan [OpenGSN](https://www.opengsn.org/), sebuah sistem yang memungkinkan pengguna tanpa ether
  untuk menggunakan rantai blok. Perhatikan bahwa ini adalah versi lama, jika Anda ingin berintegrasi dengan OpenGSN
  [gunakan tutorial ini](https://docs.opengsn.org/javascript-client/tutorial.html).
- [Pustaka SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/), yang mencegah
  `overflow`/`underflow` aritmetika untuk Solidity versi **&lt;0.8.0**. Di Solidity ≥0.8.0, operasi aritmetika secara otomatis
  melakukan `revert` saat terjadi `overflow`/`underflow`, sehingga SafeMath tidak diperlukan. Kontrak ini menggunakan SafeMath untuk kompatibilitas mundur dengan
  versi kompiler yang lebih lama.

&nbsp;

Komentar ini menjelaskan tujuan dari kontrak.

```solidity
/**
 * @dev Implementasi dari antarmuka {IERC20}.
 *
 * Implementasi ini tidak bergantung pada cara token dibuat. Ini berarti
 * bahwa mekanisme pasokan harus ditambahkan dalam kontrak turunan menggunakan {_mint}.
 * Untuk mekanisme umum, lihat {ERC20PresetMinterPauser}.
 *
 * TIPS: Untuk tulisan mendetail, lihat panduan kami
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[Cara
 * mengimplementasikan mekanisme pasokan].
 *
 * Kami telah mengikuti pedoman umum OpenZeppelin: fungsi melakukan `revert` alih-alih
 * mengembalikan `false` saat gagal. Perilaku ini tetap konvensional
 * dan tidak bertentangan dengan ekspektasi aplikasi ERC20.
 *
 * Selain itu, sebuah aksi {Approval} dipancarkan pada panggilan ke {transferFrom}.
 * Hal ini memungkinkan aplikasi untuk merekonstruksi tunjangan untuk semua akun hanya
 * dengan mendengarkan aksi tersebut. Implementasi EIP lain mungkin tidak memancarkan
 * aksi ini, karena tidak diwajibkan oleh spesifikasi.
 *
 * Terakhir, fungsi non-standar {decreaseAllowance} dan {increaseAllowance}
 * telah ditambahkan untuk memitigasi masalah yang sudah dikenal seputar pengaturan
 * tunjangan. Lihat {IERC20-approve}.
 */

```

### Definisi Kontrak {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

Baris ini menentukan warisan, dalam kasus ini dari `IERC20` di atas dan `Context`, untuk OpenGSN.

&nbsp;

```solidity

    using SafeMath for uint256;

```

Baris ini melekatkan pustaka SafeMath ke jenis `uint256`. Anda dapat menemukan pustaka ini
[di sini](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol).

### Definisi Variabel {#variable-definitions}

Definisi-definisi ini menentukan variabel status kontrak. Variabel-variabel ini dinyatakan bersifat `private`, tetapi
hanya berarti bahwa kontrak lain di rantai blok tidak dapat membacanya. _Tidak ada
rahasia di rantai blok_, perangkat lunak di setiap simpul memiliki status dari setiap kontrak
di setiap blok. Menurut konvensi, variabel status diberi nama `_<something>`.

Dua variabel pertama adalah [pemetaan](https://www.tutorialspoint.com/solidity/solidity_mappings.htm),
artinya keduanya berperilaku kurang lebih sama dengan [array asosiatif](https://wikipedia.org/wiki/Associative_array),
kecuali bahwa kuncinya adalah nilai numerik. Penyimpanan hanya dialokasikan untuk entri yang memiliki nilai
berbeda dari default (nol).

```solidity
    mapping (address => uint256) private _balances;
```

Pemetaan pertama, `_balances`, adalah alamat dan saldo masing-masing dari token ini. Untuk mengakses
saldo, gunakan sintaksis ini: `_balances[<address>]`.

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

Variabel ini, `_allowances`, menyimpan tunjangan yang dijelaskan sebelumnya. Indeks pertama adalah pemilik
token, dan yang kedua adalah kontrak dengan tunjangan. Untuk mengakses jumlah yang dapat dibelanjakan alamat A
dari akun alamat B, gunakan `_allowances[B][A]`.

&nbsp;

```solidity
    uint256 private _totalSupply;
```

Seperti namanya, variabel ini melacak total pasokan token.

&nbsp;

```solidity
    string private _name;
    string private _symbol;
    uint8 private _decimals;
```

Ketiga variabel ini digunakan untuk meningkatkan keterbacaan. Kedua variabel pertama cukup jelas, tetapi `_decimals`
tidak.

Di satu sisi, Ethereum tidak memiliki titik mengambang atau variabel pecahan. Di sisi lain,
manusia suka bisa membagi token. Salah satu alasan orang memilih emas sebagai mata
uang adalah karena sulit untuk membuat kembalian ketika seseorang ingin membeli seekor sapi seharga seekor bebek.

Solusinya adalah dengan melacak bilangan bulat, tetapi alih-alih menghitung token asli, yang dihitung adalah token pecahan yang
hampir tidak berharga. Dalam kasus ether, token pecahan disebut wei, dan 10^18 wei sama dengan satu
ETH. Saat tulisan ini dibuat, 10.000.000.000.000 wei kira-kira setara dengan satu sen Dolar AS atau Euro.

Aplikasi perlu mengetahui cara menampilkan saldo token. Jika pengguna memiliki 3.141.000.000.000.000.000 wei, apakah itu
3,14 ETH? 31,41 ETH? 3.141 ETH? Dalam kasus ether, nilai ini didefiniskan sebagai 10^18 wei untuk ETH, tetapi untuk
token Anda, Anda dapat memilih nilai yang berbeda. Jika membagi token tidak masuk akal, Anda dapat menggunakan
nilai `_decimals` nol. Jika Anda ingin menggunakan standar yang sama dengan ETH, gunakan nilai **18**.

### Konstruktor {#the-constructor}

```solidity
    /**
     * @dev Mengatur nilai untuk {name} dan {symbol}, menginisialisasi {decimals} dengan
     * nilai default 18.
     *
     * Untuk memilih nilai yang berbeda untuk {decimals}, gunakan {_setupDecimals}.
     *
     * Ketiga nilai ini tidak dapat diubah: hanya dapat diatur sekali selama
     * konstruksi.
     */
    constructor (string memory name_, string memory symbol_) public {
        // Di Solidity ≥0.7.0, 'public' bersifat implisit dan dapat dihilangkan.

        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

Konstruktor dipanggil saat kontrak pertama kali dibuat. Menurut konvensi, parameter fungsi diberi nama `<something>_`.

### Fungsi Antarmuka Pengguna {#user-interface-functions}

```solidity
    /**
     * @dev Mengembalikan nama token.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Mengembalikan simbol token, biasanya versi nama yang lebih pendek.
     * nama.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Mengembalikan jumlah desimal yang digunakan untuk mendapatkan representasi penggunanya.
     * Misalnya, jika `decimals` sama dengan `2`, saldo `505` token harus
     * ditampilkan kepada pengguna sebagai `5,05` (`505 / 10 ** 2`).
     *
     * Token biasanya memilih nilai 18, meniru hubungan antara
     * ether dan wei. Ini adalah nilai yang digunakan {ERC20}, kecuali jika {_setupDecimals} dipanggil.
     * dipanggil.
     *
     * CATATAN: Informasi ini hanya digunakan untuk tujuan _tampilan_: sama sekali
     * tidak memengaruhi aritmetika kontrak apa pun, termasuk
     * {IERC20-balanceOf} dan {IERC20-transfer}.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

Fungsi-fungsi ini, `name`, `symbol`, dan `decimals` membantu antarmuka pengguna mengetahui tentang kontrak Anda sehingga dapat menampilkannya dengan benar.

Jenis kembaliannya adalah `string memory`, yang berarti mengembalikan string yang disimpan dalam memori. Variabel, seperti
string, dapat disimpan di tiga lokasi:

|             | Masa Pakai       | Akses Kontrak | Biaya Gas                                                                             |
| ----------- | ---------------- | ------------- | ------------------------------------------------------------------------------------- |
| Memori      | Panggilan fungsi | Baca/Tulis    | Puluhan atau ratusan (lebih tinggi untuk lokasi yang lebih tinggi) |
| Calldata    | Panggilan fungsi | Hanya Baca    | Tidak dapat digunakan sebagai tipe kembalian, hanya tipe parameter fungsi             |
| Penyimpanan | Sampai diubah    | Baca/Tulis    | Tinggi (800 untuk baca, 20rb untuk tulis)                          |

Dalam kasus ini, `memory` adalah pilihan terbaik.

### Baca Informasi Token {#read-token-information}

Ini adalah fungsi-fungsi yang menyediakan informasi tentang token, baik total pasokan maupun
saldo akun.

```solidity
    /**
     * @dev Lihat {IERC20-totalSupply}.
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
```

Fungsi `totalSupply` mengembalikan total pasokan token.

&nbsp;

```solidity
    /**
     * @dev Lihat {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
```

Baca saldo akun. Perhatikan bahwa siapa pun diizinkan untuk mendapatkan saldo akun
orang lain. Tidak ada gunanya mencoba menyembunyikan informasi ini, karena informasi tersebut tersedia di
setiap simpul. _Tidak ada rahasia di rantai blok._

### Transfer Token {#transfer-tokens}

```solidity
    /**
     * @dev Lihat {IERC20-transfer}.
     *
     * Persyaratan:
     *
     * - `recipient` tidak boleh alamat nol.
     * - pemanggil harus memiliki saldo minimal `amount`.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

Fungsi `transfer` dipanggil untuk mentransfer token dari akun pengirim ke akun yang berbeda. Perhatikan
bahwa meskipun mengembalikan nilai boolean, nilai itu selalu **true**. Jika transfer
gagal, kontrak akan mengembalikan panggilan.

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

Fungsi `_transfer` melakukan pekerjaan sebenarnya. Ini adalah fungsi privat yang hanya dapat dipanggil oleh
fungsi kontrak lainnya. Menurut konvensi, fungsi privat diberi nama `_<something>`, sama seperti variabel
state.

Biasanya di Solidity kita menggunakan `msg.sender` untuk pengirim pesan. Namun, itu merusak
[OpenGSN](http://opengsn.org/). Jika kita ingin mengizinkan transaksi tanpa ether dengan token kita, kita
perlu menggunakan `_msgSender()`. Ini mengembalikan `msg.sender` untuk transaksi normal, tetapi untuk transaksi tanpa ether
mengembalikan penanda tangan asli dan bukan kontrak yang menyampaikan pesan.

### Fungsi Allowance {#allowance-functions}

Ini adalah fungsi-fungsi yang mengimplementasikan fungsionalitas allowance: `allowance`, `approve`, `transferFrom`,
dan `_approve`. Selain itu, implementasi OpenZeppelin melampaui standar dasar untuk menyertakan beberapa fitur yang meningkatkan
keamanan: `increaseAllowance`, dan `decreaseAllowance`.

#### Fungsi allowance {#allowance}

```solidity
    /**
     * @dev Lihat {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

Fungsi `allowance` memungkinkan semua orang untuk memeriksa allowance apa pun.

#### Fungsi approve {#approve}

```solidity
    /**
     * @dev Lihat {IERC20-approve}.
     *
     * Persyaratan:
     *
     * - `spender` tidak boleh alamat nol.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

Fungsi ini dipanggil untuk membuat sebuah allowance. Fungsi ini serupa dengan fungsi `transfer` di atas:

- Fungsi hanya memanggil fungsi internal (dalam kasus ini, `_approve`) yang melakukan proses sebenarnya.
- Fungsi mengembalikan `true` (jika berhasil) atau mengembalikan (jika tidak).

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

Kami menggunakan fungsi internal untuk meminimalkan jumlah tempat di mana perubahan state terjadi. _Setiap_ fungsi yang mengubah
state adalah risiko keamanan potensial yang perlu diaudit keamanannya. Dengan cara ini, kita memiliki lebih sedikit peluang untuk melakukan kesalahan.

#### Fungsi transferFrom {#transferFrom}

Ini adalah fungsi yang dipanggil oleh spender untuk membelanjakan sebuah allowance. Ini memerlukan dua operasi: mentransfer jumlah
yang dibelanjakan dan mengurangi allowance dengan jumlah tersebut.

```solidity
    /**
     * @dev Lihat {IERC20-transferFrom}.
     *
     * Memancarkan aksi {Approval} yang menunjukkan allowance yang diperbarui. Ini tidak
     * diwajibkan oleh EIP. Lihat catatan di awal {ERC20}.
     *
     * Persyaratan:
     *
     * - `sender` dan `recipient` tidak boleh alamat nol.
     * - `sender` harus memiliki saldo minimal `amount`.
     * - pemanggil harus memiliki allowance untuk token ``sender`` minimal
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

Panggilan fungsi `a.sub(b, "message")` melakukan dua hal. Pertama, ia menghitung `a-b`, yang merupakan allowance baru.
Kedua, ia memeriksa bahwa hasil ini tidak negatif. Jika hasilnya negatif, panggilan akan dibatalkan dengan pesan yang diberikan. Perhatikan bahwa ketika sebuah panggilan dibatalkan, setiap pemrosesan yang dilakukan sebelumnya selama panggilan itu diabaikan sehingga kita tidak perlu
membatalkan `_transfer`.

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: jumlah transfer melebihi allowance"));
        return true;
    }
```

#### Tambahan keamanan OpenZeppelin {#openzeppelin-safety-additions}

Berbahaya untuk mengatur allowance bukan-nol ke nilai bukan-nol lainnya,
karena Anda hanya mengontrol urutan transaksi Anda sendiri, bukan milik orang lain. Bayangkan Anda
memiliki dua pengguna, Alice yang naif dan Bill yang tidak jujur. Alice menginginkan beberapa layanan dari
Bill, yang menurutnya berharga lima token - jadi dia memberi Bill allowance lima token.

Kemudian sesuatu berubah dan harga Bill naik menjadi sepuluh token. Alice, yang masih menginginkan layanan itu,
mengirimkan transaksi yang menetapkan allowance Bill menjadi sepuluh. Saat Bill melihat transaksi baru ini
di pool transaksi, dia mengirimkan transaksi yang menghabiskan lima token Alice dan memiliki harga gas yang jauh
lebih tinggi sehingga akan ditambang lebih cepat. Dengan cara itu Bill dapat menghabiskan lima token pertama dan kemudian,
setelah allowance baru Alice ditambang, menghabiskan sepuluh lagi dengan total harga lima belas token, lebih dari
yang ingin disetujui Alice. Teknik ini disebut
[front-running](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/#front-running)

| Transaksi Alice                      | Nonce Alice | Transaksi Bill                                   | Nonce Bill             | Allowance Bill | Total Pendapatan Bill dari Alice |
| ------------------------------------ | ----------- | ------------------------------------------------ | ---------------------- | -------------- | -------------------------------- |
| approve(Bill, 5)  | 10          |                                                  |                        | 5              | 0                                |
|                                      |             | transferFrom(Alice, Bill, 5)  | 10.123 | 0              | 5                                |
| approve(Bill, 10) | 11          |                                                  |                        | 10             | 5                                |
|                                      |             | transferFrom(Alice, Bill, 10) | 10.124 | 0              | 15                               |

Untuk menghindari masalah ini, kedua fungsi ini (`increaseAllowance` dan `decreaseAllowance`) memungkinkan Anda
untuk mengubah allowance dengan jumlah tertentu. Jadi jika Bill sudah menghabiskan lima token, dia hanya akan
bisa menghabiskan lima lagi. Tergantung pada waktunya, ada dua cara kerja ini, keduanya
berakhir dengan Bill hanya mendapatkan sepuluh token:

A:

| Transaksi Alice                               | Nonce Alice | Transaksi Bill                                  |             Nonce Bill | Allowance Bill | Total Pendapatan Bill dari Alice |
| --------------------------------------------- | ----------: | ----------------------------------------------- | ---------------------: | -------------: | -------------------------------- |
| approve(Bill, 5)           |          10 |                                                 |                        |              5 | 0                                |
|                                               |             | transferFrom(Alice, Bill, 5) | 10.123 |              0 | 5                                |
| increaseAllowance(Bill, 5) |          11 |                                                 |                        |        0+5 = 5 | 5                                |
|                                               |             | transferFrom(Alice, Bill, 5) | 10.124 |              0 | 10                               |

B:

| Transaksi Alice                               | Nonce Alice | Transaksi Bill                                   |             Nonce Bill | Allowance Bill | Total Pendapatan Bill dari Alice |
| --------------------------------------------- | ----------: | ------------------------------------------------ | ---------------------: | -------------: | -------------------------------: |
| approve(Bill, 5)           |          10 |                                                  |                        |              5 |                                0 |
| increaseAllowance(Bill, 5) |          11 |                                                  |                        |       5+5 = 10 |                                0 |
|                                               |             | transferFrom(Alice, Bill, 10) | 10.124 |              0 |                               10 |

```solidity
    /**
     * @dev Secara atomik meningkatkan allowance yang diberikan kepada `spender` oleh pemanggil.
     *
     * Ini adalah alternatif untuk {approve} yang dapat digunakan sebagai mitigasi untuk
     * masalah yang dijelaskan di {IERC20-approve}.
     *
     * Memancarkan aksi {Approval} yang menunjukkan allowance yang diperbarui.
     *
     * Persyaratan:
     *
     * - `spender` tidak boleh alamat nol.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

Fungsi `a.add(b)` adalah penambahan yang aman. Dalam kasus yang tidak mungkin bahwa `a`+`b`>=`2^256`, ia tidak membungkus
seperti cara penambahan normal.

```solidity

    /**
     * @dev Secara atomik mengurangi allowance yang diberikan kepada `spender` oleh pemanggil.
     *
     * Ini adalah alternatif untuk {approve} yang dapat digunakan sebagai mitigasi untuk
     * masalah yang dijelaskan di {IERC20-approve}.
     *
     * Memancarkan aksi {Approval} yang menunjukkan allowance yang diperbarui.
     *
     * Persyaratan:
     *
     * - `spender` tidak boleh alamat nol.
     * - `spender` harus memiliki allowance untuk pemanggil setidaknya
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: allowance yang dikurangi di bawah nol"));
        return true;
    }
```

### Fungsi yang Mengubah Informasi Token {#functions-that-modify-token-information}

Ini adalah empat fungsi yang melakukan pekerjaan sebenarnya: `_transfer`, `_mint`, `_burn`, dan `_approve`.

#### Fungsi _transfer {#_transfer}

```solidity
    /**
     * @dev Memindahkan token `amount` dari `sender` ke `recipient`.
     *
     * Fungsi internal ini setara dengan {transfer}, dan dapat digunakan untuk
     * misalnya, mengimplementasikan biaya token otomatis, mekanisme pemotongan, dll.
     *
     * Memancarkan aksi {Transfer}.
     *
     * Persyaratan:
     *
     * - `sender` tidak boleh alamat nol.
     * - `recipient` tidak boleh alamat nol.
     * - `sender` harus memiliki saldo minimal `amount`.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

Fungsi ini, `_transfer`, mentransfer token dari satu akun ke akun lainnya. Ini dipanggil oleh kedua
`transfer` (untuk transfer dari akun pengirim sendiri) dan `transferFrom` (untuk menggunakan allowance
untuk mentransfer dari akun orang lain).

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer dari alamat nol");
        require(recipient != address(0), "ERC20: transfer ke alamat nol");
```

Tidak ada yang benar-benar memiliki alamat nol di Ethereum (yaitu, tidak ada yang tahu kunci pribadi yang kunci publiknya yang cocok
diubah menjadi alamat nol). Ketika orang menggunakan alamat itu, biasanya itu adalah bug perangkat lunak - jadi kami
gagal jika alamat nol digunakan sebagai pengirim atau penerima.

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

Ada dua cara untuk menggunakan kontrak ini:

1. Gunakan sebagai templat untuk kode Anda sendiri
2. [Mewarisinya](https://www.bitdegree.org/learn/solidity-inheritance), dan hanya menimpa fungsi-fungsi yang perlu Anda modifikasi

Metode kedua jauh lebih baik karena kode ERC-20 OpenZeppelin telah diaudit dan terbukti aman. Ketika Anda menggunakan pewarisan
, jelas fungsi mana yang Anda modifikasi, dan untuk mempercayai kontrak Anda, orang hanya perlu mengaudit fungsi-fungsi spesifik tersebut.

Seringkali berguna untuk melakukan suatu fungsi setiap kali token berpindah tangan. Namun, `_transfer` adalah fungsi yang sangat penting dan
mungkin untuk menuliskannya secara tidak aman (lihat di bawah), jadi sebaiknya jangan menimpanya. Solusinya adalah `_beforeTokenTransfer`, sebuah
[fungsi kait](https://wikipedia.org/wiki/Hooking). Anda dapat menimpa fungsi ini, dan fungsi tersebut akan dipanggil pada setiap transfer.

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: jumlah transfer melebihi saldo");
        _balances[recipient] = _balances[recipient].add(amount);
```

Ini adalah baris-baris yang benar-benar melakukan transfer. Perhatikan bahwa **tidak ada** apa pun di antara mereka, dan bahwa kami mengurangi
jumlah yang ditransfer dari pengirim sebelum menambahkannya ke penerima. Ini penting karena jika ada
panggilan ke kontrak lain di tengah, itu bisa digunakan untuk menipu kontrak ini. Dengan cara ini transfer
bersifat atomik, tidak ada yang bisa terjadi di tengah-tengahnya.

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

Akhirnya, pancarkan aksi `Transfer`. Aksi tidak dapat diakses oleh kontrak pintar, tetapi kode yang berjalan di luar rantai blok
dapat mendengarkan aksi dan bereaksi terhadapnya. Misalnya, dompet dapat melacak kapan pemiliknya mendapatkan lebih banyak token.

#### Fungsi _mint dan _burn {#_mint-and-_burn}

Kedua fungsi ini (`_mint` dan `_burn`) mengubah total pasokan token.
Mereka bersifat internal dan tidak ada fungsi yang memanggilnya di kontrak ini,
sehingga mereka hanya berguna jika Anda mewarisi dari kontrak dan menambahkan
logika Anda sendiri untuk memutuskan dalam kondisi apa untuk mencetak token baru atau membakar yang sudah
ada.

**CATATAN:** Setiap token ERC-20 memiliki logika bisnisnya sendiri yang mengatur manajemen token.
Misalnya, kontrak pasokan tetap mungkin hanya memanggil `_mint`
di konstruktor dan tidak pernah memanggil `_burn`. Kontrak yang menjual token
akan memanggil `_mint` ketika dibayar, dan mungkin memanggil `_burn` pada suatu saat
untuk menghindari inflasi yang tidak terkendali.

```solidity
    /** @dev Membuat token `amount` dan menugaskannya ke `account`, meningkatkan
     * total pasokan.
     *
     * Memancarkan aksi {Transfer} dengan `from` diatur ke alamat nol.
     *
     * Persyaratan:
     *
     * - `to` tidak boleh alamat nol.
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint ke alamat nol");
        _beforeTokenTransfer(address(0), account, amount);
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Pastikan untuk memperbarui `_totalSupply` ketika jumlah total token berubah.

&nbsp;

```solidity
    /**
     * @dev Menghancurkan token `amount` dari `account`, mengurangi
     * total pasokan.
     *
     * Memancarkan aksi {Transfer} dengan `to` diatur ke alamat nol.
     *
     * Persyaratan:
     *
     * - `account` tidak boleh alamat nol.
     * - `account` harus memiliki setidaknya token `amount`.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn dari alamat nol");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: jumlah burn melebihi saldo");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }
```

Fungsi `_burn` hampir identik dengan `_mint`, kecuali berjalan ke arah yang berlawanan.

#### Fungsi _approve {#_approve}

Ini adalah fungsi yang sebenarnya menentukan allowance. Perhatikan bahwa ini memungkinkan pemilik untuk menentukan
allowance yang lebih tinggi dari saldo pemilik saat ini. Ini tidak masalah karena saldo
diperiksa pada saat transfer, ketika bisa jadi berbeda dari saldo saat allowance
dibuat.

```solidity
    /**
     * @dev Menetapkan `amount` sebagai allowance `spender` atas token `owner`.
     *
     * Fungsi internal ini setara dengan `approve`, dan dapat digunakan untuk
     * misalnya, mengatur allowance otomatis untuk subsistem tertentu, dll.
     *
     * Memancarkan aksi {Approval}.
     *
     * Persyaratan:
     *
     * - `owner` tidak boleh alamat nol.
     * - `spender` tidak boleh alamat nol.
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve dari alamat nol");
        require(spender != address(0), "ERC20: approve ke alamat nol");

        _allowances[owner][spender] = amount;
```

&nbsp;

Pancarkan aksi `Approval`. Tergantung pada bagaimana aplikasi ditulis, kontrak spender dapat diberitahu tentang
persetujuan baik oleh pemilik atau oleh server yang mendengarkan aksi-aksi ini.

```solidity
        emit Approval(owner, spender, amount);
    }

```

### Ubah Variabel Desimal {#modify-the-decimals-variable}

```solidity


    /**
     * @dev Menetapkan {decimals} ke nilai selain nilai default 18.
     *
     * PERINGATAN: Fungsi ini hanya boleh dipanggil dari konstruktor. Sebagian besar
     * aplikasi yang berinteraksi dengan kontrak token tidak akan mengharapkan
     * {decimals} untuk berubah, dan mungkin bekerja secara tidak benar jika itu terjadi.
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

Fungsi ini memodifikasi variabel `_decimals` yang digunakan untuk memberi tahu antarmuka pengguna cara menafsirkan jumlah tersebut.
Anda harus memanggilnya dari konstruktor. Akan tidak jujur ​​untuk memanggilnya di titik berikutnya, dan aplikasi
tidak dirancang untuk menanganinya.

### Hooks {#hooks}

```solidity

    /**
     * @dev Kait yang dipanggil sebelum transfer token apa pun. Ini termasuk
     * pencetakan dan pembakaran.
     *
     * Kondisi pemanggilan:
     *
     * - ketika `from` dan `to` keduanya bukan nol, `amount` dari token ``from``
     * akan ditransfer ke `to`.
     * - ketika `from` adalah nol, token `amount` akan dicetak untuk `to`.
     * - ketika `to` adalah nol, `amount` dari token ``from`` akan dibakar.
     * - `from` dan `to` tidak pernah keduanya nol.
     *
     * Untuk mempelajari lebih lanjut tentang kait, kunjungi xref:ROOT:extending-contracts.adoc#using-hooks[Menggunakan Kait].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

Ini adalah fungsi kait yang akan dipanggil selama transfer. Di sini kosong, tetapi jika Anda memerlukannya
untuk melakukan sesuatu, Anda tinggal menimpanya.

## Kesimpulan {#conclusion}

Sebagai ulasan, berikut adalah beberapa ide terpenting dalam kontrak ini (menurut pendapat saya, pendapat Anda mungkin berbeda):

- _Tidak ada rahasia di rantai blok_. Setiap informasi yang dapat diakses oleh kontrak pintar
  tersedia untuk seluruh dunia.
- Anda dapat mengontrol urutan transaksi Anda sendiri, tetapi tidak kapan transaksi orang lain
  terjadi. Ini adalah alasan mengapa mengubah allowance bisa berbahaya, karena itu memungkinkan
  spender membelanjakan jumlah kedua allowance.
- Nilai tipe `uint256` berputar. Dengan kata lain, _0-1=2^256-1_. Jika itu bukan perilaku yang diinginkan
  , Anda harus memeriksanya (atau menggunakan pustaka SafeMath yang melakukannya untuk Anda). Perhatikan bahwa ini berubah di
  [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html).
- Lakukan semua perubahan state dari tipe tertentu di tempat tertentu, karena itu membuat audit lebih mudah.
  Inilah alasannya kita memiliki, misalnya, `_approve`, yang dipanggil oleh `approve`, `transferFrom`,
  `increaseAllowance`, dan `decreaseAllowance`
- Perubahan state harus atomik, tanpa tindakan lain di tengahnya (seperti yang dapat Anda lihat
  di `_transfer`). Ini karena selama perubahan state Anda memiliki state yang tidak konsisten. Sebagai contoh,
  antara waktu Anda mengurangi dari saldo pengirim dan waktu Anda menambahkan ke saldo
  penerima, ada lebih sedikit token yang ada daripada yang seharusnya. Ini berpotensi disalahgunakan jika ada
  operasi di antara mereka, terutama panggilan ke kontrak yang berbeda.

Sekarang setelah Anda melihat bagaimana kontrak ERC-20 OpenZeppelin ditulis, dan terutama bagaimana kontrak itu
dibuat lebih aman, pergilah dan tulis kontrak dan aplikasi aman Anda sendiri.

[Lihat di sini untuk lebih banyak pekerjaan saya](https://cryptodocguy.pro/).
