---
title: "Panduan Kontrak ERC-20"
description: Apa saja yang ada di dalam kontrak ERC-20 OpenZeppelin dan mengapa itu ada di sana?
author: Ori Pomerantz
lang: id
tags: ["Solidity", "erc-20"]
skill: beginner
breadcrumb: "Panduan ERC-20"
published: 2021-03-09
---

## Pengantar {#introduction}

Salah satu penggunaan paling umum untuk Ethereum adalah bagi sebuah kelompok untuk membuat token yang dapat diperdagangkan, dalam artian mata uang mereka sendiri. Token-token ini biasanya mengikuti sebuah standar,
[ERC-20](/developers/docs/standards/tokens/erc-20/). Standar ini memungkinkan penulisan alat, seperti kolam likuiditas dan dompet, yang berfungsi dengan semua token ERC-20. Dalam artikel ini kita akan menganalisis
[implementasi ERC20 Solidity OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol), serta
[definisi antarmuka](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol).

Ini adalah kode sumber yang dianotasi. Jika Anda ingin mengimplementasikan ERC-20,
[baca tutorial ini](https://docs.openzeppelin.com/contracts/2.x/erc20-supply).

## Antarmuka {#the-interface}

Tujuan dari standar seperti ERC-20 adalah untuk memungkinkan banyak implementasi token yang dapat saling beroperasi di berbagai aplikasi, seperti dompet dan pertukaran terdesentralisasi. Untuk mencapainya, kita membuat sebuah
[antarmuka](https://www.geeksforgeeks.org/solidity/solidity-basics-of-interface/). Kode apa pun yang perlu menggunakan kontrak token
dapat menggunakan definisi yang sama di antarmuka dan kompatibel dengan semua kontrak token yang menggunakannya, baik itu dompet seperti
MetaMask, dapp seperti etherscan.io, atau kontrak yang berbeda seperti kolam likuiditas.

![Ilustrasi antarmuka ERC-20](erc20_interface.png)

Jika Anda adalah seorang programmer berpengalaman, Anda mungkin ingat pernah melihat konstruksi serupa di [Java](https://www.w3schools.com/java/java_interface.asp)
atau bahkan di [file header C](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html).

Ini adalah definisi dari [Antarmuka ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)
dari OpenZeppelin. Ini adalah terjemahan dari [standar yang dapat dibaca manusia](https://eips.ethereum.org/EIPS/eip-20) ke dalam kode Solidity. Tentu saja,
antarmuka itu sendiri tidak mendefinisikan _bagaimana_ melakukan sesuatu. Hal itu dijelaskan dalam kode sumber kontrak di bawah ini.

&nbsp;

```solidity
// SPDX-License-Identifier: MIT // SPDX-License-Identifier: MIT
```

File Solidity seharusnya menyertakan pengidentifikasi lisensi. [Anda dapat melihat daftar lisensinya di sini](https://spdx.org/licenses/). Jika Anda memerlukan lisensi yang berbeda, jelaskan saja di komentar.

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Bahasa Solidity masih berkembang dengan cepat, dan versi baru mungkin tidak kompatibel dengan kode lama
([lihat di sini](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)). Oleh karena itu, ada baiknya untuk menentukan tidak hanya versi minimum dari bahasa tersebut, tetapi juga versi maksimum, versi terbaru yang Anda gunakan untuk menguji kode tersebut.

&nbsp;

```solidity
/**
 * @dev Antarmuka standar ERC20 seperti yang didefinisikan dalam EIP.
 */
```

`@dev` dalam komentar adalah bagian dari [format NatSpec](https://docs.soliditylang.org/en/develop/natspec-format.html), yang digunakan untuk menghasilkan
dokumentasi dari kode sumber.

&nbsp;

```solidity
interface IERC20 {
```

Berdasarkan konvensi, nama antarmuka dimulai dengan `I`.

&nbsp;

```solidity
    /**
     * @dev Mengembalikan jumlah token yang ada.
     */
    function totalSupply() external view returns (uint256);
```

Fungsi ini bersifat `external`, yang berarti [hanya dapat dipanggil dari luar kontrak](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2).
Fungsi ini mengembalikan total pasokan token dalam kontrak. Nilai ini dikembalikan menggunakan tipe yang paling umum di Ethereum, unsigned 256 bit (256 bit adalah
ukuran kata asli dari EVM). Fungsi ini juga merupakan `view`, yang berarti tidak mengubah status, sehingga dapat dieksekusi pada satu node alih-alih meminta
setiap node di blockchain untuk menjalankannya. Fungsi semacam ini tidak menghasilkan transaksi dan tidak memerlukan biaya [gas](/developers/docs/gas/).

**Catatan:** Secara teori mungkin tampak bahwa pembuat kontrak dapat berbuat curang dengan mengembalikan total pasokan yang lebih kecil dari nilai sebenarnya, membuat setiap token tampak
lebih berharga daripada yang sebenarnya. Namun, ketakutan itu mengabaikan sifat asli dari blockchain. Segala sesuatu yang terjadi di blockchain dapat diverifikasi oleh
setiap node. Untuk mencapai hal ini, kode bahasa mesin dan penyimpanan setiap kontrak tersedia di setiap node. Meskipun Anda tidak diwajibkan untuk mempublikasikan kode Solidity
untuk kontrak Anda, tidak ada yang akan menganggap Anda serius kecuali Anda mempublikasikan kode sumber dan versi Solidity yang digunakan untuk mengompilasinya, sehingga dapat
diverifikasi terhadap kode bahasa mesin yang Anda berikan.
Sebagai contoh, lihat [kontrak ini](https://eth.blockscout.com/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD?tab=contract).

&nbsp;

```solidity
    /**
     * @dev Mengembalikan jumlah token yang dimiliki oleh `account`.
     */
    function balanceOf(address account) external view returns (uint256);
```

Seperti namanya, `balanceOf` mengembalikan saldo dari sebuah akun. Akun Ethereum diidentifikasi dalam Solidity menggunakan tipe `address`, yang menampung 160 bit.
Fungsi ini juga bersifat `external` dan `view`.

&nbsp;

```solidity
    /**
     * @dev Memindahkan token sejumlah `amount` dari akun pemanggil ke `recipient`.
     *
     * Mengembalikan nilai boolean yang menunjukkan apakah operasi berhasil.
     *
     * Menghasilkan event {Transfer}.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

Fungsi `transfer` mentransfer token dari pemanggil ke alamat yang berbeda. Ini melibatkan perubahan status, jadi ini bukan `view`.
Ketika pengguna memanggil fungsi ini, itu membuat transaksi dan membutuhkan biaya gas. Fungsi ini juga memancarkan sebuah event, `Transfer`, untuk memberi tahu semua orang di
blockchain tentang event tersebut.

Fungsi ini memiliki dua jenis output untuk dua jenis pemanggil yang berbeda:

- Pengguna yang memanggil fungsi secara langsung dari antarmuka pengguna. Biasanya pengguna mengirimkan transaksi
  dan tidak menunggu respons, yang bisa memakan waktu tidak terbatas. Pengguna dapat melihat apa yang terjadi
  dengan mencari tanda terima transaksi (yang diidentifikasi oleh hash transaksi) atau dengan mencari
  event `Transfer`.
- Kontrak lain, yang memanggil fungsi sebagai bagian dari transaksi keseluruhan. Kontrak-kontrak tersebut mendapatkan hasilnya dengan segera,
  karena mereka berjalan dalam transaksi yang sama, sehingga mereka dapat menggunakan nilai kembalian fungsi.

Jenis output yang sama dibuat oleh fungsi lain yang mengubah status kontrak.

&nbsp;

Tunjangan (allowance) mengizinkan sebuah akun untuk membelanjakan beberapa token yang merupakan milik pemilik yang berbeda.
Ini berguna, misalnya, untuk kontrak yang bertindak sebagai penjual. Kontrak tidak dapat
memantau event, jadi jika pembeli mentransfer token ke kontrak penjual secara
langsung, kontrak tersebut tidak akan tahu bahwa ia telah dibayar. Sebaliknya, pembeli mengizinkan
kontrak penjual untuk membelanjakan jumlah tertentu, dan penjual mentransfer jumlah tersebut.
Ini dilakukan melalui fungsi yang dipanggil oleh kontrak penjual, sehingga kontrak penjual
dapat mengetahui apakah itu berhasil.

```solidity
    /**
     * @dev Mengembalikan sisa jumlah token yang diizinkan untuk dihabiskan oleh `spender`
     * atas nama `owner` melalui {transferFrom}. Nilai bawaannya adalah
     * nol.
     *
     * Nilai ini berubah ketika {approve} atau {transferFrom} dipanggil.
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

Fungsi `allowance` memungkinkan siapa saja untuk melakukan kueri guna melihat berapa tunjangan yang
diizinkan oleh satu alamat (`owner`) untuk dibelanjakan oleh alamat lain (`spender`).

&nbsp;

```solidity
    /**
     * @dev Menetapkan `amount` sebagai jatah (allowance) `spender` atas token pemanggil.
     *
     * Mengembalikan nilai boolean yang menunjukkan apakah operasi berhasil.
     *
     * PENTING: Berhati-hatilah karena mengubah jatah dengan metode ini membawa risiko
     * bahwa seseorang mungkin menggunakan jatah lama dan baru karena urutan
     * transaksi yang tidak menguntungkan. Salah satu solusi yang mungkin untuk memitigasi kondisi
     * balapan (race condition) ini adalah dengan terlebih dahulu mengurangi jatah spender menjadi 0 dan menetapkan
     * nilai yang diinginkan setelahnya:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Menghasilkan event {Approval}.
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

Fungsi `approve` membuat sebuah tunjangan. Pastikan untuk membaca pesan tentang
bagaimana hal itu dapat disalahgunakan. Di Ethereum, Anda mengontrol urutan transaksi Anda sendiri,
tetapi Anda tidak dapat mengontrol urutan eksekusi transaksi orang lain,
kecuali jika Anda tidak mengirimkan transaksi Anda sendiri sampai Anda melihat
transaksi pihak lain telah terjadi.

&nbsp;

```solidity
    /**
     * @dev Memindahkan token sejumlah `amount` dari `sender` ke `recipient` menggunakan
     * mekanisme jatah (allowance). `amount` kemudian dikurangi dari jatah
     * pemanggil.
     *
     * Mengembalikan nilai boolean yang menunjukkan apakah operasi berhasil.
     *
     * Menghasilkan event {Transfer}.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Terakhir, `transferFrom` digunakan oleh pembelanja (spender) untuk benar-benar membelanjakan tunjangan tersebut.

&nbsp;

```solidity

    /**
     * @dev Dihasilkan ketika token sejumlah `value` dipindahkan dari satu akun (`from`) ke
     * akun lainnya (`to`).
     *
     * Perhatikan bahwa `value` mungkin saja nol.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Dihasilkan ketika jatah `spender` untuk `owner` ditetapkan oleh
     * panggilan ke {approve}. `value` adalah jatah yang baru.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Event-event ini dipancarkan ketika status kontrak ERC-20 berubah.

## Kontrak Sebenarnya {#the-actual-contract}

Ini adalah kontrak sebenarnya yang mengimplementasikan standar ERC-20,
[diambil dari sini](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Ini tidak dimaksudkan untuk digunakan apa adanya, tetapi Anda dapat
[mewarisinya](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm) untuk memperluasnya menjadi sesuatu yang dapat digunakan.

```solidity
// SPDX-License-Identifier: MIT // SPDX-License-Identifier: MIT
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
  untuk menggunakan blockchain. Perhatikan bahwa ini adalah versi lama, jika Anda ingin berintegrasi dengan OpenGSN
  [gunakan tutorial ini](https://docs.opengsn.org/javascript-client/tutorial.html).
- [Pustaka SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/), yang mencegah
  overflow/underflow aritmatika untuk versi Solidity **&lt;0.8.0**. Pada Solidity ≥0.8.0, operasi aritmatika secara otomatis
  dikembalikan (revert) saat terjadi overflow/underflow, sehingga SafeMath tidak diperlukan. Kontrak ini menggunakan SafeMath untuk kompatibilitas mundur dengan
  versi kompiler yang lebih lama.

&nbsp;

Komentar ini menjelaskan tujuan dari kontrak tersebut.

```solidity
/**
 * @dev Implementasi dari antarmuka {IERC20}.
 *
 * Implementasi ini agnostik terhadap cara token dibuat. Ini berarti
 * bahwa mekanisme pasokan harus ditambahkan dalam kontrak turunan menggunakan {_mint}.
 * Untuk mekanisme generik, lihat {ERC20PresetMinterPauser}.
 *
 * TIPS: Untuk tulisan terperinci, lihat panduan kami
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[Cara
 * mengimplementasikan mekanisme pasokan].
 *
 * Kami telah mengikuti pedoman umum OpenZeppelin: fungsi akan dikembalikan (revert) alih-alih
 * mengembalikan `false` saat gagal. Perilaku ini tetap konvensional
 * dan tidak bertentangan dengan ekspektasi aplikasi ERC20.
 *
 * Selain itu, event {Approval} dihasilkan pada panggilan ke {transferFrom}.
 * Ini memungkinkan aplikasi untuk merekonstruksi jatah untuk semua akun hanya
 * dengan mendengarkan event tersebut. Implementasi lain dari EIP mungkin tidak menghasilkan
 * event ini, karena tidak diwajibkan oleh spesifikasi.
 *
 * Terakhir, fungsi non-standar {decreaseAllowance} dan {increaseAllowance}
 * telah ditambahkan untuk memitigasi masalah yang sudah dikenal seputar penetapan
 * jatah. Lihat {IERC20-approve}.
 */

```

### Definisi Kontrak {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

Baris ini menentukan pewarisan, dalam hal ini dari `IERC20` dari atas dan `Context`, untuk OpenGSN.

&nbsp;

```solidity

    using SafeMath for uint256;

```

Baris ini melampirkan pustaka `SafeMath` ke tipe `uint256`. Anda dapat menemukan pustaka ini
[di sini](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol).

### Definisi Variabel {#variable-definitions}

Definisi ini menentukan variabel status kontrak. Variabel-variabel ini dideklarasikan sebagai `private`, tetapi
itu hanya berarti bahwa kontrak lain di blockchain tidak dapat membacanya. _Tidak ada
rahasia di blockchain_, perangkat lunak pada setiap node memiliki status dari setiap kontrak
pada setiap blok. Berdasarkan konvensi, variabel status diberi nama `_<sesuatu>`.

Dua variabel pertama adalah [pemetaan (mappings)](https://www.tutorialspoint.com/solidity/solidity_mappings.htm),
yang berarti mereka berperilaku kira-kira sama dengan [array asosiatif](https://wikipedia.org/wiki/Associative_array),
kecuali bahwa kuncinya adalah nilai numerik. Penyimpanan hanya dialokasikan untuk entri yang memiliki nilai berbeda
dari default (nol).

```solidity
    mapping (address => uint256) private _balances;
```

Pemetaan pertama, `_balances`, adalah alamat dan saldo masing-masing dari token ini. Untuk mengakses
saldo, gunakan sintaks ini: `_balances[<address>]`.

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

Variabel ini, `_allowances`, menyimpan tunjangan yang dijelaskan sebelumnya. Indeks pertama adalah pemilik
token, dan yang kedua adalah kontrak dengan tunjangan tersebut. Untuk mengakses jumlah yang dapat
dibelanjakan alamat A dari akun alamat B, gunakan `_allowances[B][A]`.

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

Ketiga variabel ini digunakan untuk meningkatkan keterbacaan. Dua yang pertama sudah cukup jelas, tetapi `_decimals`
tidak.

Di satu sisi, Ethereum tidak memiliki variabel floating point atau pecahan. Di sisi lain,
manusia suka bisa membagi token. Salah satu alasan orang memilih emas sebagai mata uang adalah karena
sulit untuk memberikan kembalian ketika seseorang ingin membeli sapi seharga seekor bebek.

Solusinya adalah dengan melacak bilangan bulat, tetapi menghitung token pecahan yang hampir tidak berharga alih-alih
token aslinya. Dalam kasus ether, token pecahan disebut wei, dan 10^18 wei sama dengan satu
ETH. Pada saat penulisan, 10.000.000.000.000 wei kira-kira sama dengan satu sen dolar AS atau Euro.

Aplikasi perlu mengetahui cara menampilkan saldo token. Jika pengguna memiliki 3.141.000.000.000.000.000 wei, apakah itu
3,14 ETH? 31,41 ETH? 3.141 ETH? Dalam kasus ether, didefinisikan 10^18 wei untuk satu ETH, tetapi untuk
token Anda, Anda dapat memilih nilai yang berbeda. Jika membagi token tidak masuk akal, Anda dapat menggunakan
nilai `_decimals` nol. Jika Anda ingin menggunakan standar yang sama dengan ETH, gunakan nilai **18**.

### Konstruktor {#the-constructor}

```solidity
    /**
     * @dev Menetapkan nilai untuk {name} dan {symbol}, menginisialisasi {decimals} dengan
     * nilai bawaan 18.
     *
     * Untuk memilih nilai yang berbeda untuk {decimals}, gunakan {_setupDecimals}.
     *
     * Ketiga nilai ini tidak dapat diubah (immutable): hanya dapat ditetapkan sekali selama
     * konstruksi.
     */
    constructor (string memory name_, string memory symbol_) public {
        // In Solidity ≥0.7.0, 'public' is implicit and can be omitted. // Dalam Solidity ≥0.7.0, 'public' bersifat implisit dan dapat dihilangkan.

        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

Konstruktor dipanggil saat kontrak pertama kali dibuat. Berdasarkan konvensi, parameter fungsi diberi nama `<sesuatu>_`.

### Fungsi Antarmuka Pengguna {#user-interface-functions}

```solidity
    /**
     * @dev Mengembalikan nama token.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Mengembalikan simbol token, biasanya versi yang lebih pendek dari
     * namanya.
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
     * ether dan wei. Ini adalah nilai yang digunakan {ERC20}, kecuali {_setupDecimals}
     * dipanggil.
     *
     * CATATAN: Informasi ini hanya digunakan untuk tujuan _tampilan_: sama sekali
     * tidak memengaruhi aritmatika kontrak apa pun, termasuk
     * {IERC20-balanceOf} dan {IERC20-transfer}.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

Fungsi-fungsi ini, `name`, `symbol`, dan `decimals` membantu antarmuka pengguna mengetahui tentang kontrak Anda sehingga mereka dapat menampilkannya dengan benar.

Tipe kembaliannya adalah `string memory`, yang berarti mengembalikan string yang disimpan di memori. Variabel, seperti
string, dapat disimpan di tiga lokasi:

|          | Masa Pakai      | Akses Kontrak | Biaya Gas                                                       |
| -------- | ------------- | --------------- | -------------------------------------------------------------- |
| Memory   | Panggilan fungsi | Baca/Tulis      | Puluhan atau ratusan (lebih tinggi untuk lokasi yang lebih tinggi)                 |
| Calldata | Panggilan fungsi | Hanya Baca       | Tidak dapat digunakan sebagai tipe kembalian, hanya tipe parameter fungsi |
| Storage  | Sampai diubah | Baca/Tulis      | Tinggi (800 untuk baca, 20k untuk tulis)                             |

Dalam hal ini, `memory` adalah pilihan terbaik.

### Membaca Informasi Token {#read-token-information}

Ini adalah fungsi-fungsi yang memberikan informasi tentang token, baik total pasokan maupun
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

Membaca saldo akun. Perhatikan bahwa siapa pun diizinkan untuk mendapatkan saldo akun
orang lain. Tidak ada gunanya mencoba menyembunyikan informasi ini, karena informasi ini tersedia di setiap
node. _Tidak ada rahasia di blockchain._

### Mentransfer Token {#transfer-tokens}

```solidity
    /**
     * @dev Lihat {IERC20-transfer}.
     *
     * Persyaratan:
     *
     * - `recipient` tidak boleh berupa alamat nol.
     * - pemanggil harus memiliki saldo setidaknya `amount`.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

Fungsi `transfer` dipanggil untuk mentransfer token dari akun pengirim ke akun yang berbeda. Perhatikan
bahwa meskipun mengembalikan nilai boolean, nilai tersebut selalu **true**. Jika transfer
gagal, kontrak akan mengembalikan (revert) panggilan tersebut.

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

Fungsi `_transfer` melakukan pekerjaan yang sebenarnya. Ini adalah fungsi privat yang hanya dapat dipanggil oleh
fungsi kontrak lainnya. Berdasarkan konvensi, fungsi privat diberi nama `_<sesuatu>`, sama seperti variabel
status.

Biasanya di Solidity kita menggunakan `msg.sender` untuk pengirim pesan. Namun, hal itu merusak
[OpenGSN](http://opengsn.org/). Jika kita ingin mengizinkan transaksi tanpa ether dengan token kita, kita
perlu menggunakan `_msgSender()`. Ini mengembalikan `msg.sender` untuk transaksi normal, tetapi untuk transaksi tanpa ether
mengembalikan penandatangan asli dan bukan kontrak yang meneruskan pesan tersebut.

### Fungsi Tunjangan {#allowance-functions}

Ini adalah fungsi-fungsi yang mengimplementasikan fungsionalitas tunjangan: `allowance`, `approve`, `transferFrom`,
dan `_approve`. Selain itu, implementasi OpenZeppelin melampaui standar dasar dengan menyertakan beberapa fitur yang meningkatkan
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

Fungsi `allowance` memungkinkan semua orang untuk memeriksa tunjangan apa pun.

#### Fungsi approve {#approve}

```solidity
    /**
     * @dev Lihat {IERC20-approve}.
     *
     * Persyaratan:
     *
     * - `spender` tidak boleh berupa alamat nol.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

Fungsi ini dipanggil untuk membuat sebuah tunjangan. Ini mirip dengan fungsi `transfer` di atas:

- Fungsi ini hanya memanggil fungsi internal (dalam hal ini, `_approve`) yang melakukan pekerjaan sebenarnya.
- Fungsi ini mengembalikan `true` (jika berhasil) atau mengembalikan/revert (jika tidak).

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

Kita menggunakan fungsi internal untuk meminimalkan jumlah tempat di mana perubahan status terjadi. _Setiap_ fungsi yang mengubah
status adalah potensi risiko keamanan yang perlu diaudit keamanannya. Dengan cara ini kita memiliki lebih sedikit peluang untuk melakukan kesalahan.

#### Fungsi transferFrom {#transferFrom}

Ini adalah fungsi yang dipanggil oleh pembelanja (spender) untuk membelanjakan tunjangan. Ini membutuhkan dua operasi: mentransfer jumlah
yang dibelanjakan dan mengurangi tunjangan sebesar jumlah tersebut.

```solidity
    /**
     * @dev Lihat {IERC20-transferFrom}.
     *
     * Menghasilkan event {Approval} yang menunjukkan jatah yang diperbarui. Ini tidak
     * diwajibkan oleh EIP. Lihat catatan di awal {ERC20}.
     *
     * Persyaratan:
     *
     * - `sender` dan `recipient` tidak boleh berupa alamat nol.
     * - `sender` harus memiliki saldo setidaknya `amount`.
     * - pemanggil harus memiliki jatah untuk token ``sender`` setidaknya
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

Panggilan fungsi `a.sub(b, "message")` melakukan dua hal. Pertama, ia menghitung `a-b`, yang merupakan tunjangan baru.
Kedua, ia memeriksa bahwa hasil ini tidak negatif. Jika negatif, panggilan akan dikembalikan (revert) dengan pesan yang diberikan. Perhatikan bahwa ketika sebuah panggilan dikembalikan, pemrosesan apa pun yang dilakukan sebelumnya selama panggilan tersebut diabaikan sehingga kita tidak perlu
membatalkan `_transfer`.

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

#### Penambahan keamanan OpenZeppelin {#openzeppelin-safety-additions}

Berbahaya untuk menetapkan tunjangan bukan nol ke nilai bukan nol lainnya,
karena Anda hanya mengontrol urutan transaksi Anda sendiri, bukan transaksi orang lain. Bayangkan Anda
memiliki dua pengguna, Alice yang naif dan Bill yang tidak jujur. Alice menginginkan beberapa layanan dari
Bill, yang menurutnya berharga lima token - jadi dia memberi Bill tunjangan sebesar lima token.

Kemudian sesuatu berubah dan harga Bill naik menjadi sepuluh token. Alice, yang masih menginginkan layanan tersebut,
mengirimkan transaksi yang menetapkan tunjangan Bill menjadi sepuluh. Saat Bill melihat transaksi baru ini
di kumpulan transaksi, dia mengirimkan transaksi yang membelanjakan lima token Alice dan memiliki
harga gas yang jauh lebih tinggi sehingga akan ditambang lebih cepat. Dengan cara itu Bill dapat membelanjakan lima token pertama dan kemudian,
setelah tunjangan baru Alice ditambang, membelanjakan sepuluh token lagi dengan harga total lima belas token, lebih dari
yang dimaksudkan Alice untuk diotorisasi. Teknik ini disebut
[front-running](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/#front-running)

| Transaksi Alice | Nonce Alice | Transaksi Bill              | Nonce Bill | Tunjangan Bill | Total Pendapatan Bill dari Alice |
| ----------------- | ----------- | ----------------------------- | ---------- | ---------------- | ---------------------------- |
| approve(Bill, 5)  | 10          |                               |            | 5                | 0                            |
|                   |             | transferFrom(Alice, Bill, 5)  | 10,123     | 0                | 5                            |
| approve(Bill, 10) | 11          |                               |            | 10               | 5                            |
|                   |             | transferFrom(Alice, Bill, 10) | 10,124     | 0                | 15                           |

Untuk menghindari masalah ini, kedua fungsi ini (`increaseAllowance` dan `decreaseAllowance`) memungkinkan Anda
untuk memodifikasi tunjangan dengan jumlah tertentu. Jadi jika Bill sudah menghabiskan lima token, dia hanya
akan bisa menghabiskan lima token lagi. Bergantung pada waktunya, ada dua cara ini dapat bekerja, yang keduanya
berakhir dengan Bill hanya mendapatkan sepuluh token:

A:

| Transaksi Alice          | Nonce Alice | Transaksi Bill             | Nonce Bill | Tunjangan Bill | Total Pendapatan Bill dari Alice |
| -------------------------- | ----------: | ---------------------------- | ---------: | ---------------: | ---------------------------- |
| approve(Bill, 5)           |          10 |                              |            |                5 | 0                            |
|                            |             | transferFrom(Alice, Bill, 5) |     10,123 |                0 | 5                            |
| increaseAllowance(Bill, 5) |          11 |                              |            |          0+5 = 5 | 5                            |
|                            |             | transferFrom(Alice, Bill, 5) |     10,124 |                0 | 10                           |

B:

| Transaksi Alice          | Nonce Alice | Transaksi Bill              | Nonce Bill | Tunjangan Bill | Total Pendapatan Bill dari Alice |
| -------------------------- | ----------: | ----------------------------- | ---------: | ---------------: | ---------------------------: |
| approve(Bill, 5)           |          10 |                               |            |                5 |                            0 |
| increaseAllowance(Bill, 5) |          11 |                               |            |         5+5 = 10 |                            0 |
|                            |             | transferFrom(Alice, Bill, 10) |     10,124 |                0 |                           10 |

```solidity
    /**
     * @dev Secara atomik meningkatkan jatah yang diberikan kepada `spender` oleh pemanggil.
     *
     * Ini adalah alternatif untuk {approve} yang dapat digunakan sebagai mitigasi untuk
     * masalah yang dijelaskan dalam {IERC20-approve}.
     *
     * Menghasilkan event {Approval} yang menunjukkan jatah yang diperbarui.
     *
     * Persyaratan:
     *
     * - `spender` tidak boleh berupa alamat nol.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

Fungsi `a.add(b)` adalah penambahan yang aman. Dalam kasus yang tidak mungkin terjadi di mana `a`+`b`>=`2^256` fungsi ini tidak akan membungkus (wrap around)
seperti yang dilakukan penambahan normal.

```solidity

    /**
     * @dev Secara atomik mengurangi jatah yang diberikan kepada `spender` oleh pemanggil.
     *
     * Ini adalah alternatif untuk {approve} yang dapat digunakan sebagai mitigasi untuk
     * masalah yang dijelaskan dalam {IERC20-approve}.
     *
     * Menghasilkan event {Approval} yang menunjukkan jatah yang diperbarui.
     *
     * Persyaratan:
     *
     * - `spender` tidak boleh berupa alamat nol.
     * - `spender` harus memiliki jatah untuk pemanggil setidaknya
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: decreased allowance below zero"));
        return true;
    }
```

### Fungsi yang Memodifikasi Informasi Token {#functions-that-modify-token-information}

Ini adalah empat fungsi yang melakukan pekerjaan sebenarnya: `_transfer`, `_mint`, `_burn`, dan `_approve`.

#### Fungsi _transfer {#_transfer}

```solidity
    /**
     * @dev Memindahkan token sejumlah `amount` dari `sender` ke `recipient`.
     *
     * Fungsi internal ini setara dengan {transfer}, dan dapat digunakan untuk
     * mis., mengimplementasikan biaya token otomatis, mekanisme pemotongan (slashing), dll.
     *
     * Menghasilkan event {Transfer}.
     *
     * Persyaratan:
     *
     * - `sender` tidak boleh berupa alamat nol.
     * - `recipient` tidak boleh berupa alamat nol.
     * - `sender` harus memiliki saldo setidaknya `amount`.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

Fungsi ini, `_transfer`, mentransfer token dari satu akun ke akun lainnya. Fungsi ini dipanggil oleh
`transfer` (untuk transfer dari akun pengirim sendiri) dan `transferFrom` (untuk menggunakan tunjangan
guna mentransfer dari akun orang lain).

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

Sebenarnya tidak ada yang memiliki alamat nol di Ethereum (yaitu, tidak ada yang mengetahui kunci pribadi yang kunci publik
pasangannya diubah menjadi alamat nol). Ketika orang menggunakan alamat tersebut, biasanya itu adalah bug perangkat lunak - jadi kita
menggagalkannya jika alamat nol digunakan sebagai pengirim atau penerima.

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

Ada dua cara untuk menggunakan kontrak ini:

1. Gunakan sebagai templat untuk kode Anda sendiri
1. [Mewarisinya](https://www.bitdegree.org/learn/solidity-inheritance), dan menimpa (override) hanya fungsi-fungsi yang perlu Anda modifikasi

Metode kedua jauh lebih baik karena kode ERC-20 OpenZeppelin telah diaudit dan terbukti aman. Saat Anda menggunakan pewarisan
jelas fungsi apa saja yang Anda modifikasi, dan untuk memercayai kontrak Anda, orang hanya perlu mengaudit fungsi-fungsi spesifik tersebut.

Sering kali berguna untuk menjalankan suatu fungsi setiap kali token berpindah tangan. Namun, `_transfer` adalah fungsi yang sangat penting dan mungkin
saja ditulis secara tidak aman (lihat di bawah), jadi sebaiknya jangan menimpanya. Solusinya adalah `_beforeTokenTransfer`, sebuah
[fungsi hook](https://wikipedia.org/wiki/Hooking). Anda dapat menimpa fungsi ini, dan fungsi ini akan dipanggil pada setiap transfer.

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

Ini adalah baris-baris yang benar-benar melakukan transfer. Perhatikan bahwa **tidak ada** apa pun di antara keduanya, dan bahwa kita mengurangi
jumlah yang ditransfer dari pengirim sebelum menambahkannya ke penerima. Ini penting karena jika ada
panggilan ke kontrak yang berbeda di tengah-tengahnya, itu bisa digunakan untuk mencurangi kontrak ini. Dengan cara ini transfer
bersifat atomik, tidak ada yang bisa terjadi di tengah-tengahnya.

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

Terakhir, pancarkan event `Transfer`. Event tidak dapat diakses oleh kontrak pintar, tetapi kode yang berjalan di luar blockchain
dapat mendengarkan event dan bereaksi terhadapnya. Misalnya, dompet dapat melacak kapan pemilik mendapatkan lebih banyak token.

#### Fungsi _mint dan _burn {#_mint-and-_burn}

Kedua fungsi ini (`_mint` dan `_burn`) memodifikasi total pasokan token.
Keduanya bersifat internal dan tidak ada fungsi yang memanggilnya dalam kontrak ini,
jadi keduanya hanya berguna jika Anda mewarisi dari kontrak dan menambahkan logika
Anda sendiri untuk memutuskan dalam kondisi apa harus melakukan mint token baru atau membakar (burn)
token yang sudah ada.

**CATATAN:** Setiap token ERC-20 memiliki logika bisnisnya sendiri yang mendikte manajemen token.
Misalnya, kontrak pasokan tetap mungkin hanya memanggil `_mint`
di konstruktor dan tidak pernah memanggil `_burn`. Kontrak yang menjual token
akan memanggil `_mint` saat dibayar, dan mungkin memanggil `_burn` pada suatu saat
untuk menghindari inflasi yang tidak terkendali.

```solidity
    /** @dev Membuat token sejumlah `amount` dan menetapkannya ke `account`, meningkatkan
     * total pasokan.
     *
     * Menghasilkan event {Transfer} dengan `from` ditetapkan ke alamat nol.
     *
     * Persyaratan:
     *
     * - `to` tidak boleh berupa alamat nol.
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");
        _beforeTokenTransfer(address(0), account, amount);
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Pastikan untuk memperbarui `_totalSupply` saat jumlah total token berubah.

&nbsp;

```solidity
    /**
     * @dev Menghancurkan token sejumlah `amount` dari `account`, mengurangi
     * total pasokan.
     *
     * Menghasilkan event {Transfer} dengan `to` ditetapkan ke alamat nol.
     *
     * Persyaratan:
     *
     * - `account` tidak boleh berupa alamat nol.
     * - `account` harus memiliki setidaknya `amount` token.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }
```

Fungsi `_burn` hampir identik dengan `_mint`, kecuali ia berjalan ke arah yang berlawanan.

#### Fungsi _approve {#_approve}

Ini adalah fungsi yang benar-benar menentukan tunjangan. Perhatikan bahwa ini memungkinkan pemilik untuk menentukan
tunjangan yang lebih tinggi dari saldo pemilik saat ini. Ini tidak masalah karena saldo
diperiksa pada saat transfer, di mana saldonya bisa berbeda dari saldo saat tunjangan
dibuat.

```solidity
    /**
     * @dev Menetapkan `amount` sebagai jatah `spender` atas token `owner`.
     *
     * Fungsi internal ini setara dengan `approve`, dan dapat digunakan untuk
     * mis., menetapkan jatah otomatis untuk subsistem tertentu, dll.
     *
     * Menghasilkan event {Approval}.
     *
     * Persyaratan:
     *
     * - `owner` tidak boleh berupa alamat nol.
     * - `spender` tidak boleh berupa alamat nol.
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
```

&nbsp;

Pancarkan event `Approval`. Bergantung pada bagaimana aplikasi ditulis, kontrak pembelanja dapat diberi tahu tentang
persetujuan baik oleh pemilik atau oleh server yang mendengarkan event-event ini.

```solidity
        emit Approval(owner, spender, amount);
    }

```

### Memodifikasi Variabel Decimals {#modify-the-decimals-variable}

```solidity


    /**
     * @dev Menetapkan {decimals} ke nilai selain nilai bawaan 18.
     *
     * PERINGATAN: Fungsi ini hanya boleh dipanggil dari konstruktor. Sebagian besar
     * aplikasi yang berinteraksi dengan kontrak token tidak akan menduga
     * {decimals} pernah berubah, dan mungkin bekerja secara tidak benar jika itu terjadi.
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

Fungsi ini memodifikasi variabel `_decimals` yang digunakan untuk memberi tahu antarmuka pengguna bagaimana menafsirkan jumlah tersebut.
Anda harus memanggilnya dari konstruktor. Akan tidak jujur untuk memanggilnya pada titik mana pun setelahnya, dan aplikasi
tidak dirancang untuk menanganinya.

### Hook {#hooks}

```solidity

    /**
     * @dev Hook yang dipanggil sebelum transfer token apa pun. Ini termasuk
     * mint dan pembakaran (burning).
     *
     * Kondisi pemanggilan:
     *
     * - ketika `from` dan `to` keduanya bukan nol, token sejumlah `amount` milik ``from``
     * akan ditransfer ke `to`.
     * - ketika `from` adalah nol, token sejumlah `amount` akan di-mint untuk `to`.
     * - ketika `to` adalah nol, token sejumlah `amount` milik ``from`` akan dibakar.
     * - `from` dan `to` tidak pernah keduanya nol.
     *
     * Untuk mempelajari lebih lanjut tentang hook, kunjungi xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

Ini adalah fungsi hook yang akan dipanggil selama transfer. Di sini kosong, tetapi jika Anda membutuhkannya
untuk melakukan sesuatu, Anda cukup menimpanya.

## Kesimpulan {#conclusion}

Sebagai ulasan, berikut adalah beberapa ide terpenting dalam kontrak ini (menurut pendapat saya, pendapat Anda mungkin berbeda):

- _Tidak ada rahasia di blockchain_. Informasi apa pun yang dapat diakses oleh kontrak pintar
  tersedia untuk seluruh dunia.
- Anda dapat mengontrol urutan transaksi Anda sendiri, tetapi tidak saat transaksi orang lain
  terjadi. Inilah alasan mengapa mengubah tunjangan bisa berbahaya, karena hal itu memungkinkan
  pembelanja untuk membelanjakan jumlah dari kedua tunjangan tersebut.
- Nilai bertipe `uint256` akan membungkus (wrap around). Dengan kata lain, _0-1=2^256-1_. Jika itu bukan
  perilaku yang diinginkan, Anda harus memeriksanya (atau menggunakan pustaka SafeMath yang melakukannya untuk Anda). Perhatikan bahwa ini berubah pada
  [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html).
- Lakukan semua perubahan status dari tipe tertentu di tempat tertentu, karena itu membuat audit menjadi lebih mudah.
  Inilah alasan mengapa kita memiliki, misalnya, `_approve`, yang dipanggil oleh `approve`, `transferFrom`,
  `increaseAllowance`, dan `decreaseAllowance`
- Perubahan status harus bersifat atomik, tanpa tindakan lain di tengah-tengahnya (seperti yang dapat Anda lihat
  di `_transfer`). Ini karena selama perubahan status, Anda memiliki status yang tidak konsisten. Misalnya,
  antara waktu Anda mengurangi saldo pengirim dan waktu Anda menambah saldo penerima, ada lebih sedikit token yang ada daripada yang seharusnya. Ini berpotensi disalahgunakan jika ada operasi di antara keduanya, terutama panggilan ke kontrak yang berbeda.

Sekarang setelah Anda melihat bagaimana kontrak ERC-20 OpenZeppelin ditulis, dan terutama bagaimana kontrak tersebut
dibuat lebih aman, pergilah dan tulis kontrak dan aplikasi aman Anda sendiri.

[Lihat di sini untuk karya saya yang lain](https://cryptodocguy.pro/).