---
title: "Panduan Lengkap Kontrak Uniswap-v2"
description: Bagaimana cara kerja kontrak Uniswap-v2? Mengapa ditulis dengan cara tersebut?
author: Ori Pomerantz
tags: [ "Solidity" ]
skill: intermediate
published: 2021-05-01
lang: id
---

## Pengenalan {#introduction}

[Uniswap v2](https://app.uniswap.org/whitepaper.pdf) dapat membuat pasar bursa antara dua token ERC-20 mana pun. Dalam artikel ini, kita akan membahas kode sumber untuk kontrak yang mengimplementasikan protokol ini dan melihat mengapa kontrak tersebut ditulis dengan cara ini.

### Apa Fungsi Uniswap? {#what-does-uniswap-do}

Pada dasarnya, ada dua jenis pengguna: penyedia likuiditas dan pedagang.

Para _penyedia likuiditas_ menyediakan pool dengan dua token yang dapat dipertukarkan (kita akan menyebutnya **Token0** dan **Token1**). Sebagai imbalannya, mereka menerima token ketiga yang mewakili kepemilikan parsial dari pool yang disebut _token likuiditas_.

_Pedagang_ mengirimkan satu jenis token ke pool dan menerima jenis lainnya (misalnya, mengirim **Token0** dan menerima **Token1**) dari pool yang disediakan oleh para penyedia likuiditas. Nilai tukar ditentukan oleh jumlah relatif **Token0** dan **Token1** yang dimiliki pool. Selain itu, pool mengambil persentase kecil sebagai hadiah untuk pool likuiditas.

Ketika penyedia likuiditas menginginkan kembali aset mereka, mereka dapat membakar token pool dan menerima kembali token mereka, termasuk bagian hadiah mereka.

[Klik di sini untuk deskripsi yang lebih lengkap](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/).

### Mengapa v2? Mengapa bukan v3? {#why-v2}

[Uniswap v3](https://app.uniswap.org/whitepaper-v3.pdf) adalah sebuah peningkatan yang jauh lebih rumit daripada v2. Lebih mudah untuk terlebih dahulu mempelajari v2 dan kemudian beralih ke v3.

### Kontrak Inti vs Kontrak Perifer {#contract-types}

Uniswap v2 terbagi menjadi dua komponen, inti dan perifer. Pembagian ini memungkinkan kontrak inti, yang menyimpan aset dan oleh karena itu _harus_ aman, menjadi lebih sederhana dan lebih mudah untuk diaudit. Semua fungsionalitas ekstra yang diperlukan oleh para pedagang kemudian dapat disediakan oleh kontrak perifer.

## Alur Data dan Kontrol {#flows}

Ini adalah alur data dan kontrol yang terjadi ketika Anda melakukan tiga aksi utama Uniswap:

1. Menukar antara token yang berbeda
2. Menambahkan likuiditas ke pasar dan mendapatkan hadiah dengan token likuiditas ERC-20 dari bursa pasangan
3. Membakar token likuiditas ERC-20 dan mendapatkan kembali token ERC-20 yang diizinkan oleh bursa pasangan untuk ditukarkan oleh pedagang

### Tukar {#swap-flow}

Ini adalah alur yang paling umum, digunakan oleh para pedagang:

#### Pemanggil {#caller}

1. Menyediakan akun perifer dengan alokasi dalam jumlah yang akan ditukar.
2. Panggil salah satu dari banyak fungsi tukar kontrak perifer (yang mana tergantung pada apakah ETH terlibat atau tidak, apakah pedagang menentukan jumlah token yang akan disetor atau jumlah token yang akan didapatkan kembali, dll).
   Setiap fungsi tukar menerima `path`, sebuah larik bursa yang akan dilalui.

#### Di dalam kontrak perifer (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02-sol}

3. Identifikasi jumlah yang perlu diperdagangkan pada setiap bursa di sepanjang jalur.
4. Beriterasi melalui jalur. Untuk setiap bursa di sepanjang jalur, ia mengirimkan token input dan kemudian memanggil fungsi `swap` bursa.
   Dalam kebanyakan kasus, alamat tujuan untuk token adalah bursa pasangan berikutnya di dalam jalur. Dalam bursa terakhir, itu adalah alamat yang disediakan oleh pedagang.

#### Di dalam kontrak inti (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}5. Verifikasi bahwa kontrak inti tidak dicurangi dan dapat mempertahankan likuiditas yang cukup setelah pertukaran.

6. Lihat berapa banyak token tambahan yang kita miliki selain cadangan yang diketahui. Jumlah itu adalah jumlah token input yang kita terima untuk ditukarkan.
7. Kirim token output ke tujuan.
8. Panggil `_update` untuk memperbarui jumlah cadangan

#### Kembali di kontrak perifer (UniswapV2Router02.sol) {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. Lakukan pembersihan yang diperlukan (misalnya, bakar token WETH untuk mendapatkan kembali ETH untuk dikirim ke pedagang)

### Tambah Likuiditas {#add-liquidity-flow}

#### Pemanggil {#caller-2}

1. Menyediakan akun perifer dengan alokasi dalam jumlah yang akan ditambahkan ke pool likuiditas.
2. Panggil salah satu fungsi `addLiquidity` dari kontrak perifer.

#### Di dalam kontrak perifer (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-2}

3. Buat bursa pasangan baru jika perlu
4. Jika sudah ada bursa pasangan, hitung jumlah token yang akan ditambahkan. Ini seharusnya memiliki nilai yang identik untuk kedua token, jadi rasio token baru terhadap token yang ada sama.
5. Periksa apakah jumlahnya dapat diterima (pemanggil dapat menentukan jumlah minimum; jika di bawah jumlah ini, mereka lebih memilih untuk tidak menambahkan likuiditas)
6. Memanggil kontrak inti.

#### Di dalam kontrak inti (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

7. Cetak token likuiditas dan kirimkan ke pemanggil
8. Panggil `_update` untuk memperbarui jumlah cadangan

### Hapus Likuiditas {#remove-liquidity-flow}

#### Pemanggil {#caller-3}

1. Menyediakan akun perifer dengan alokasi token likuiditas yang akan dibakar untuk ditukar dengan token dasarnya.
2. Panggil salah satu fungsi `removeLiquidity` dari kontrak perifer.

#### Di dalam kontrak perifer (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-3}

3. Kirim token likuiditas ke bursa pasangan

#### Di dalam kontrak inti (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-3}

4. Mengirim token dasarnya ke alamat tujuan secara proporsional dengan token yang dibakar. Misalnya jika ada 1000 token A di dalam pool, 500 token B, dan 90 token likuiditas, dan kita menerima 9 token untuk dibakar, kita membakar 10% dari token likuiditas jadi kita kirim kembali ke pengguna 100 token A dan 50 token B.
5. Membakar token likuiditas
6. Panggil `_update` untuk memperbarui jumlah cadangan

## Kontrak Inti {#core-contracts}

Ini adalah kontrak aman yang menyimpan likuiditas.

### UniswapV2Pair.sol {#UniswapV2Pair}

[Kontrak ini](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol) mengimplementasikan pool aktual yang menukarkan token. Ini adalah fungsionalitas inti Uniswap.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Pair.sol';
import './UniswapV2ERC20.sol';
import './libraries/Math.sol';
import './libraries/UQ112x112.sol';
import './interfaces/IERC20.sol';
import './interfaces/IUniswapV2Factory.sol';
import './interfaces/IUniswapV2Callee.sol';
```

Ini semua adalah antarmuka yang perlu diketahui kontrak, baik karena kontrak mengimplementasikannya (`IUniswapV2Pair` dan `UniswapV2ERC20`) atau karena kontrak tersebut memanggil kontrak yang mengimplementasikannya.

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

Kontrak ini mewarisi dari `UniswapV2ERC20`, yang menyediakan fungsi ERC-20 untuk token likuiditas.

```solidity
    using SafeMath  for uint;
```

[Pustaka SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) digunakan untuk menghindari _overflow_ (melebihi batas atas) dan _underflow_ (melebihi batas bawah). Hal ini penting karena jika tidak, kita bisa berakhir dalam situasi di mana sebuah nilai seharusnya `-1`, tetapi malah menjadi `2^256-1`.

```solidity
    using UQ112x112 for uint224;
```

Banyak perhitungan dalam kontrak pool memerlukan pecahan. Namun, pecahan tidak didukung oleh EVM.
Solusi yang ditemukan Uniswap adalah menggunakan nilai 224-bit, dengan 112 bit untuk bagian integer, dan 112 bit untuk bagian pecahannya. Jadi `1.0` direpresentasikan sebagai `2^112`, `1.5` direpresentasikan sebagai `2^112 + 2^111`, dll.

Rincian lebih lanjut tentang pustaka ini tersedia [nanti di dalam dokumen](#FixedPoint).

#### Variabel {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

Untuk menghindari kasus pembagian dengan nol, ada jumlah minimum token likuiditas yang selalu ada (tetapi dimiliki oleh akun nol). Jumlah itu adalah **MINIMUM_LIQUIDITY**, yaitu seribu.

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

Ini adalah pemilih ABI untuk fungsi transfer ERC-20. Ini digunakan untuk mentransfer token ERC-20 di kedua akun token.

```solidity
    address public factory;
```

Ini adalah kontrak pabrik yang membuat pool ini. Setiap pool adalah bursa antara dua token ERC-20, pabrik adalah titik pusat yang menghubungkan semua pool ini.

```solidity
    address public token0;
    address public token1;
```

Ini adalah alamat-alamat kontrak untuk dua jenis token ERC-20 yang dapat ditukarkan oleh pool ini.

```solidity
    uint112 private reserve0;           // menggunakan satu slot penyimpanan, dapat diakses via getReserves
    uint112 private reserve1;           // menggunakan satu slot penyimpanan, dapat diakses via getReserves
```

Cadangan yang dimiliki pool untuk setiap jenis token. Kita mengasumsikan bahwa keduanya mewakili jumlah nilai yang sama, dan oleh karena itu setiap token0 bernilai reserve1/reserve0 dari token1.

```solidity
    uint32  private blockTimestampLast; // menggunakan satu slot penyimpanan, dapat diakses via getReserves
```

Stempel waktu untuk blok terakhir di mana pertukaran terjadi, digunakan untuk melacak nilai tukar dari waktu ke waktu.

Salah satu pengeluaran gas terbesar dari kontrak Ethereum adalah penyimpanan, yang bertahan dari satu pemanggilan kontrak ke pemanggilan berikutnya. Setiap sel penyimpanan memiliki panjang 256 bit. Jadi tiga variabel, `reserve0`, `reserve1`, dan `blockTimestampLast`, dialokasikan sedemikian rupa sehingga satu nilai penyimpanan dapat mencakup ketiganya (112+112+32=256).

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

Variabel-variabel ini menyimpan biaya kumulatif untuk setiap token (masing-masing dalam istilah yang lain). Mereka dapat digunakan untuk menghitung nilai tukar rata-rata selama periode waktu tertentu.

```solidity
    uint public kLast; // reserve0 * reserve1, per saat setelah aksi likuiditas terbaru
```

Cara bursa pasangan memutuskan nilai tukar antara token0 dan token1 adalah dengan menjaga kelipatan dari kedua cadangan tetap konstan selama perdagangan. `kLast` adalah nilai ini. Ini berubah ketika penyedia likuiditas menyetor atau menarik token, dan sedikit meningkat karena biaya pasar 0,3%.

Berikut adalah contoh sederhana. Perhatikan bahwa demi kesederhanaan, tabel hanya memiliki tiga digit di belakang koma desimal, dan kami mengabaikan biaya perdagangan 0,3% sehingga angkanya tidak akurat.

| Aksi                                               |                  reserve0 |                  reserve1 |                      reserve0 \* reserve1 | Rata-rata nilai tukar (token1 / token0) |
| -------------------------------------------------- | ------------------------: | ------------------------: | ----------------------------------------: | ---------------------------------------------------------- |
| Pengaturan awal                                    | 1.000,000 | 1.000,000 | 1.000.000 |                                                            |
| Pedagang A menukar 50 token0 dengan 47,619 token1  | 1.050,000 |                   952,381 | 1.000.000 | 0,952                                                      |
| Pedagang B menukar 10 token0 dengan 8,984 token1   | 1.060,000 |                   943,396 | 1.000.000 | 0,898                                                      |
| Pedagang C menukar 40 token0 dengan 34,305 token1  | 1.100,000 |                   909,090 | 1.000.000 | 0,858                                                      |
| Pedangan D menukar 100 token1 dengan 109,01 token0 |                   990,990 | 1.009,090 | 1.000.000 | 0,917                                                      |
| Pedagang E menukar 10 token0 dengan 10,079 token1  | 1.000,990 |                   999,010 | 1.000.000 | 1,008                                                      |

Saat pedagang menyediakan lebih banyak token0, nilai relatif token1 meningkat, dan sebaliknya, berdasarkan penawaran dan permintaan.

#### Kunci {#pair-lock}

```solidity
    uint private unlocked = 1;
```

Ada kelas kerentanan keamanan yang didasarkan pada [penyalahgunaan reentrancy](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14). Uniswap perlu mentransfer token ERC-20 arbitrer, yang berarti memanggil kontrak ERC-20 yang mungkin mencoba menyalahgunakan pasar Uniswap yang memanggilnya.
Dengan memiliki variabel `unlocked` sebagai bagian dari kontrak, kita dapat mencegah fungsi dipanggil saat sedang berjalan (dalam transaksi yang sama).

```solidity
    modifier lock() {
```

Fungsi ini adalah [modifier](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers), sebuah fungsi yang membungkus fungsi normal untuk mengubah perilakunya dengan cara tertentu.

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

Jika `unlocked` sama dengan satu, atur ke nol. Jika sudah nol, batalkan panggilan, buat gagal.

```solidity
        _;
```

Dalam sebuah modifier, `_;` adalah pemanggilan fungsi asli (dengan semua parameternya). Di sini artinya panggilan fungsi hanya terjadi jika `unlocked` adalah satu saat dipanggil, dan saat berjalan nilai `unlocked` adalah nol.

```solidity
        unlocked = 1;
    }
```

Setelah fungsi utama kembali, lepaskan kuncinya.

#### Lain-lain fungsi {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

Fungsi ini memberikan status bursa saat ini kepada pemanggil. Perhatikan bahwa fungsi Solidity [dapat mengembalikan beberapa nilai](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values).

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

Fungsi internal ini mentransfer sejumlah token ERC20 dari bursa ke orang lain. `SELECTOR` menentukan bahwa fungsi yang kita panggil adalah `transfer(address,uint)` (lihat definisi di atas).

Untuk menghindari keharusan mengimpor antarmuka untuk fungsi token, kami "secara manual" membuat panggilan menggunakan salah satu [fungsi ABI](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions).

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

Ada dua cara di mana panggilan transfer ERC-20 dapat melaporkan kegagalan:

1. Kembalikan. Jika panggilan ke kontrak eksternal dikembalikan, maka nilai pengembalian boolean adalah `false`
2. Berakhir secara normal tetapi melaporkan kegagalan. Dalam hal ini, buffer nilai kembalian memiliki panjang bukan nol, dan ketika didekode sebagai nilai boolean, itu adalah `false`

Jika salah satu dari kondisi ini terjadi, kembalikan.

#### Aksi {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

Kedua aksi ini dikeluarkan ketika penyedia likuiditas menyetor likuiditas (`Mint`) atau menariknya (`Burn`). Dalam kedua kasus, jumlah token0 dan token1 yang disetor atau ditarik adalah bagian dari aksi, serta identitas akun yang memanggil kita (`sender`). Dalam kasus penarikan, aksi juga menyertakan target yang menerima token (`to`), yang mungkin tidak sama dengan pengirim.

```solidity
    event Swap(
        address indexed sender,
        uint amount0In,
        uint amount1In,
        uint amount0Out,
        uint amount1Out,
        address indexed to
    );
```

Aksi ini dikeluarkan ketika seorang pedagang menukar satu token dengan yang lain. Sekali lagi, pengirim dan tujuan mungkin tidak sama.
Setiap token dapat dikirim ke bursa, atau diterima darinya.

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

Terakhir, `Sync` dikeluarkan setiap kali token ditambahkan atau ditarik, terlepas dari alasannya, untuk memberikan informasi cadangan terbaru (dan karenanya nilai tukar).

#### Fungsi Pengaturan {#pair-setup}

Fungsi-fungsi ini seharusnya dipanggil satu kali ketika bursa pasangan baru diatur.

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

Konstruktor memastikan kita akan melacak alamat pabrik yang membuat pasangan. Informasi ini diperlukan untuk `initialize` dan untuk biaya pabrik (jika ada)

```solidity
    // dipanggil sekali oleh pabrik pada saat penerapan
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // pemeriksaan yang cukup
        token0 = _token0;
        token1 = _token1;
    }
```

Fungsi ini memungkinkan pabrik (dan hanya pabrik) untuk menentukan dua token ERC-20 yang akan ditukarkan oleh pasangan ini.

#### Fungsi Pembaruan Internal {#pair-update-internal}

##### \_update

```solidity
    // perbarui cadangan dan, pada panggilan pertama per blok, akumulator harga
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

Fungsi ini dipanggil setiap kali token disetor atau ditarik.

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

Jika balance0 atau balance1 (uint256) lebih tinggi dari uint112(-1) (=2^112-1) (sehingga terjadi overflow & kembali ke 0 saat dikonversi ke uint112), tolak untuk melanjutkan \_update untuk mencegah overflow. Dengan token normal yang dapat dibagi lagi menjadi 10^18 unit, ini berarti setiap bursa dibatasi hingga sekitar 5,1\*10^15 dari setiap token. Sejauh ini hal tersebut belum menjadi masalah.

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // overflow diinginkan
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

Jika waktu yang berlalu tidak nol, itu berarti kita adalah transaksi pertukaran pertama di blok ini. Dalam hal ini, kita perlu memperbarui akumulator biaya.

```solidity
            // * tidak pernah overflow, dan + overflow diinginkan
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

Setiap akumulator biaya diperbarui dengan biaya terbaru (cadangan token lain/cadangan token ini) dikalikan waktu yang berlalu dalam detik. Untuk mendapatkan harga rata-rata, Anda membaca harga kumulatif pada dua titik waktu dan membaginya dengan selisih waktu di antara keduanya. Misalnya, asumsikan urutan aksi ini:

| Aksi                                                                 |                  reserve0 |                  reserve1 | stempel waktu         | Nilai tukar marjinal (reserve1 / reserve0) |       price0CumulativeLast |
| -------------------------------------------------------------------- | ------------------------: | ------------------------: | --------------------- | ------------------------------------------------------------: | -------------------------: |
| Pengaturan awal                                                      | 1.000,000 | 1.000,000 | 5.000 |                                                         1,000 |                          0 |
| Pedagang A menyetor 50 token0 dan mendapatkan kembali 47,619 token1  | 1.050,000 |                   952,381 | 5.020 |                                                         0,907 |                         20 |
| Pedagang B menyetor 10 token0 dan mendapatkan kembali 8,984 token1   | 1.060,000 |                   943,396 | 5.030 |                                                         0,890 |       20+10\*0,907 = 29,07 |
| Pedagang C menyetor 40 token0 dan mendapatkan kembali 34,305 token1  | 1.100,000 |                   909,090 | 5.100 |                                                         0,826 |    29,07+70\*0,890 = 91,37 |
| Pedagang D menyetor 100 token1 dan mendapatkan kembali 109,01 token0 |                   990,990 | 1.009,090 | 5.110 |                                                         1,018 |    91,37+10\*0,826 = 99,63 |
| Pedagang E menyetor 10 token0 dan mendapatkan kembali 10,079 token1  | 1.000,990 |                   999,010 | 5.150 |                                                         0,998 | 99,63+40\*1,1018 = 143,702 |

Katakanlah kita ingin menghitung harga rata-rata **Token0** antara stempel waktu 5.030 dan 5.150. Perbedaan nilai `price0Cumulative` adalah 143,702-29,07=114,632. Ini adalah rata-rata selama dua menit (120 detik). Jadi harga rata-ratanya adalah 114,632/120 = 0,955.

Perhitungan harga ini adalah alasan mengapa kita perlu mengetahui ukuran cadangan lama.

```solidity
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }
```

Terakhir, perbarui variabel global dan keluarkan aksi `Sync`.

##### \_mintFee

```solidity
    // jika biaya aktif, cetak likuiditas yang setara dengan 1/6 dari pertumbuhan dalam sqrt(k)
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

Di Uniswap 2.0, pedagang membayar biaya 0,30% untuk menggunakan pasar. Sebagian besar biaya itu (0,25% dari perdagangan) selalu diberikan kepada penyedia likuiditas. Sisa 0,05% dapat diberikan kepada penyedia likuiditas atau ke alamat yang ditentukan oleh pabrik sebagai biaya protokol, yang membayar Uniswap atas upaya pengembangan mereka.

Untuk mengurangi perhitungan (dan karenanya biaya gas), biaya ini hanya dihitung ketika likuiditas ditambahkan atau dihapus dari pool, bukan pada setiap transaksi.

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

Baca tujuan biaya pabrik. Jika nol maka tidak ada biaya protokol dan tidak perlu menghitung biaya itu.

```solidity
        uint _kLast = kLast; // penghematan gas
```

Variabel status `kLast` terletak di penyimpanan, sehingga akan memiliki nilai di antara panggilan yang berbeda ke kontrak.
Akses ke penyimpanan jauh lebih mahal daripada akses ke memori yang mudah menguap yang dilepaskan saat panggilan fungsi ke kontrak berakhir, jadi kami menggunakan variabel internal untuk menghemat gas.

```solidity
        if (feeOn) {
            if (_kLast != 0) {
```

Para penyedia likuiditas mendapatkan bagian mereka hanya dengan apresiasi token likuiditas mereka. Tetapi biaya protokol memerlukan token likuiditas baru untuk dicetak dan diberikan ke alamat `feeTo`.

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
```

Jika ada likuiditas baru untuk mengumpulkan biaya protokol. Anda dapat melihat fungsi akar kuadrat [nanti di artikel ini](#Math)

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

Perhitungan biaya yang rumit ini dijelaskan dalam [laporan resmi](https://app.uniswap.org/whitepaper.pdf) di halaman 5. Kita tahu bahwa antara waktu `kLast` dihitung dan saat ini tidak ada likuiditas yang ditambahkan atau dihapus (karena kita menjalankan perhitungan ini setiap kali likuiditas ditambahkan atau dihapus, sebelum benar-benar berubah), jadi setiap perubahan dalam `reserve0 * reserve1` harus berasal dari biaya transaksi (tanpa mereka kita akan menjaga `reserve0 * reserve1` tetap konstan).

```solidity
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
```

Gunakan fungsi `UniswapV2ERC20._mint` untuk benar-benar membuat token likuiditas tambahan dan menugaskannya ke `feeTo`.

```solidity
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }
```

Jika tidak ada biaya, atur `kLast` ke nol (jika belum). Ketika kontrak ini ditulis, ada [fitur pengembalian dana gas](https://eips.ethereum.org/EIPS/eip-3298) yang mendorong kontrak untuk mengurangi ukuran keseluruhan status Ethereum dengan menolkan penyimpanan yang tidak mereka butuhkan.
Kode ini mendapatkan pengembalian dana itu jika memungkinkan.

#### Fungsi yang Dapat Diakses secara Eksternal {#pair-external}

Perhatikan bahwa meskipun setiap transaksi atau kontrak _dapat_ memanggil fungsi-fungsi ini, mereka dirancang untuk dipanggil dari kontrak perifer. Jika Anda memanggilnya secara langsung, Anda tidak akan bisa menipu bursa pasangan, tetapi Anda mungkin kehilangan nilai karena kesalahan.

##### cetak

```solidity
    // fungsi tingkat rendah ini harus dipanggil dari kontrak yang melakukan pemeriksaan keamanan penting
    function mint(address to) external lock returns (uint liquidity) {
```

Fungsi ini dipanggil ketika penyedia likuiditas menambahkan likuiditas ke pool. Fungsi ini mencetak token likuiditas tambahan sebagai hadiah. Ini harus dipanggil dari [kontrak perifer](#UniswapV2Router02) yang memanggilnya setelah menambahkan likuiditas dalam transaksi yang sama (sehingga tidak ada orang lain yang dapat mengirimkan transaksi yang mengklaim likuiditas baru sebelum pemilik yang sah).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // penghematan gas
```

Ini adalah cara untuk membaca hasil dari fungsi Solidity yang mengembalikan beberapa nilai. Kami membuang nilai-nilai yang dikembalikan terakhir, stempel waktu blok, karena kami tidak membutuhkannya.

```solidity
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);
```

Dapatkan saldo saat ini dan lihat berapa banyak yang ditambahkan dari setiap jenis token.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
```

Hitung biaya protokol yang akan dikumpulkan, jika ada, dan cetak token likuiditas yang sesuai. Karena parameter untuk `_mintFee` adalah nilai cadangan lama, biaya dihitung secara akurat hanya berdasarkan perubahan pool karena biaya.

```solidity
        uint _totalSupply = totalSupply; // penghematan gas, harus didefinisikan di sini karena totalSupply dapat diperbarui di _mintFee
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // kunci token MINIMUM_LIQUIDITY pertama secara permanen
```

Jika ini adalah setoran pertama, buat token `MINIMUM_LIQUIDITY` dan kirimkan ke alamat nol untuk menguncinya. Mereka tidak akan pernah bisa ditebus, yang berarti pool tidak akan pernah kosong sepenuhnya (ini menyelamatkan kita dari pembagian dengan nol di beberapa tempat). Nilai `MINIMUM_LIQUIDITY` adalah seribu, yang mengingat sebagian besar ERC-20 dibagi menjadi unit 10^-18 dari sebuah token, seperti ETH dibagi menjadi wei, adalah 10^-15 dari nilai satu token. Bukan biaya yang tinggi.

Pada saat setoran pertama, kita tidak tahu nilai relatif dari kedua token, jadi kita hanya mengalikan jumlahnya dan mengambil akar kuadrat, dengan asumsi bahwa setoran memberi kita nilai yang sama di kedua token.

Kita bisa mempercayai ini karena merupakan kepentingan deposan untuk memberikan nilai yang sama, untuk menghindari kehilangan nilai karena arbitrase.
Katakanlah nilai kedua token identik, tetapi penyetor kami menyetor empat kali lebih banyak **Token1** daripada **Token0**. Seorang pedagang dapat menggunakan fakta bahwa bursa pasangan berpikir bahwa **Token0** lebih berharga untuk mengekstrak nilai darinya.

| Aksi                                                                    | reserve0 | reserve1 | reserve0 \* reserve1 | Nilai pool (reserve0 + reserve1) |
| ----------------------------------------------------------------------- | -------: | -------: | -------------------: | --------------------------------------------------: |
| Pengaturan awal                                                         |        8 |       32 |                  256 |                                                  40 |
| Pedagang menyetor 8 token **Token0**, mendapatkan kembali 16 **Token1** |       16 |       16 |                  256 |                                                  32 |

Seperti yang Anda lihat, pedagang mendapatkan tambahan 8 token, yang berasal dari penurunan nilai pool, merugikan penyetor yang memilikinya.

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

Dengan setiap setoran berikutnya, kita sudah tahu nilai tukar antara kedua aset, dan kami berharap penyedia likuiditas memberikan nilai yang sama di keduanya. Jika tidak, kami memberi mereka token likuiditas berdasarkan nilai yang lebih rendah yang mereka berikan sebagai hukuman.

Baik itu setoran awal atau setoran berikutnya, jumlah token likuiditas yang kami berikan sama dengan akar kuadrat dari perubahan `reserve0*reserve1` dan nilai token likuiditas tidak berubah (kecuali jika kami mendapatkan setoran yang tidak memiliki nilai yang sama dari kedua jenis, dalam hal ini "denda" didistribusikan). Berikut adalah contoh lain dengan dua token yang memiliki nilai yang sama, dengan tiga setoran yang baik dan satu yang buruk (setoran hanya satu jenis token, sehingga tidak menghasilkan token likuiditas).

| Aksi                          |                reserve0 |                reserve1 | reserve0 \* reserve1 | Nilai pool (reserve0 + reserve1) | Token likuiditas yang dicetak untuk setoran ini | Total token likuiditas | nilai dari setiap token likuiditas |
| ----------------------------- | ----------------------: | ----------------------: | -------------------: | --------------------------------------------------: | ----------------------------------------------: | ---------------------: | ---------------------------------: |
| Pengaturan awal               |                   8,000 |                   8,000 |                   64 |                                              16,000 |                                               8 |                      8 |                              2,000 |
| Setor empat dari setiap jenis |                  12,000 |                  12,000 |                  144 |                                              24,000 |                                               4 |                     12 |                              2,000 |
| Setor dua dari setiap jenis   |                  14,000 |                  14,000 |                  196 |                                              28,000 |                                               2 |                     14 |                              2,000 |
| Setoran nilai tidak sama      |                  18,000 |                  14,000 |                  252 |                                              32,000 |                                               0 |                     14 |             ~2,286 |
| Setelah arbitrase             | ~15,874 | ~15,874 |                  252 |                             ~31,748 |                                               0 |                     14 |             ~2,267 |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

Gunakan fungsi `UniswapV2ERC20._mint` untuk benar-benar membuat token likuiditas tambahan dan memberikannya ke akun yang benar.

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 dan reserve1 sudah diperbarui
        emit Mint(msg.sender, amount0, amount1);
    }
```

Perbarui variabel status (`reserve0`, `reserve1`, dan jika perlu `kLast`) dan keluarkan aksi yang sesuai.

##### bakar

```solidity
    // fungsi tingkat rendah ini harus dipanggil dari kontrak yang melakukan pemeriksaan keamanan penting
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

Fungsi ini dipanggil ketika likuiditas ditarik dan token likuiditas yang sesuai perlu dibakar.
Ini juga harus dipanggil [dari akun perifer](#UniswapV2Router02).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // penghematan gas
        address _token0 = token0;                                // penghematan gas
        address _token1 = token1;                                // penghematan gas
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

Kontrak perifer mentransfer likuiditas yang akan dibakar ke kontrak ini sebelum panggilan. Dengan cara itu kita tahu berapa banyak likuiditas yang harus dibakar, dan kita dapat memastikan bahwa itu dibakar.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // penghematan gas, harus didefinisikan di sini karena totalSupply dapat diperbarui di _mintFee
        amount0 = liquidity.mul(balance0) / _totalSupply; // menggunakan saldo memastikan distribusi pro-rata
        amount1 = liquidity.mul(balance1) / _totalSupply; // menggunakan saldo memastikan distribusi pro-rata
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
```

Penyedia likuiditas menerima nilai yang sama dari kedua token. Dengan cara ini kita tidak mengubah nilai tukar.

```solidity
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 dan reserve1 sudah diperbarui
        emit Burn(msg.sender, amount0, amount1, to);
    }

```

Sisa dari fungsi `burn` adalah bayangan cermin dari fungsi `mint` di atas.

##### tukar

```solidity
    // fungsi tingkat rendah ini harus dipanggil dari kontrak yang melakukan pemeriksaan keamanan penting
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

Fungsi ini juga seharusnya dipanggil dari [kontrak perifer](#UniswapV2Router02).

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // penghematan gas
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // lingkup untuk _token{0,1}, menghindari kesalahan tumpukan terlalu dalam
```

Variabel lokal dapat disimpan baik di memori atau, jika tidak terlalu banyak, langsung di tumpukan.
Jika kita dapat membatasi jumlahnya sehingga kita akan menggunakan tumpukan, kita menggunakan lebih sedikit gas. Untuk detail lebih lanjut, lihat [kertas kuning, spesifikasi formal Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf), hlm. 26, persamaan 298.

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // transfer token secara optimis
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // transfer token secara optimis
```

Transfer ini bersifat optimis, karena kita mentransfer sebelum kita yakin semua kondisi terpenuhi. Ini tidak masalah di Ethereum karena jika kondisi tidak terpenuhi di kemudian hari dalam panggilan, kita akan mengembalikannya dan setiap perubahan yang dibuatnya.

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

Beri tahu penerima tentang pertukaran jika diminta.

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

Dapatkan saldo saat ini. Kontrak perifer mengirimkan token kepada kami sebelum memanggil kami untuk pertukaran. Ini memudahkan kontrak untuk memeriksa bahwa itu tidak dicurangi, pemeriksaan yang _harus_ terjadi di kontrak inti (karena kita dapat dipanggil oleh entitas lain selain kontrak perifer kita).

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // lingkup untuk reserve{0,1}Adjusted, menghindari kesalahan tumpukan terlalu dalam
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

Ini adalah pemeriksaan kewarasan untuk memastikan kita tidak rugi dari pertukaran. Tidak ada keadaan di mana pertukaran harus mengurangi `reserve0*reserve1`. Di sinilah kami juga memastikan biaya 0,3% dikirim pada pertukaran; sebelum memeriksa kewajaran nilai K, kami mengalikan kedua saldo dengan 1000 dikurangi jumlah yang dikalikan dengan 3, ini berarti 0,3% (3/1000 = 0,003 = 0,3%) dikurangkan dari saldo sebelum membandingkan nilai K-nya dengan nilai K cadangan saat ini.

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

Perbarui `reserve0` dan `reserve1`, dan jika perlu akumulator harga dan stempel waktu dan keluarkan aksi.

##### Sinkronisasi atau Skim

Mungkin saja saldo nyata menjadi tidak sinkron dengan cadangan yang menurut bursa pasangan dimilikinya.
Tidak ada cara untuk menarik token tanpa persetujuan kontrak, tetapi setoran adalah masalah yang berbeda. Sebuah akun dapat mentransfer token ke bursa tanpa memanggil `mint` atau `swap`.

Dalam hal ini, ada dua solusi:

- `sync`, perbarui cadangan ke saldo saat ini
- `skim`, tarik jumlah ekstra. Perhatikan bahwa akun apa pun diizinkan untuk memanggil `skim` karena kita tidak tahu siapa yang menyetor token. Informasi ini dikeluarkan dalam sebuah aksi, tetapi aksi tidak dapat diakses dari blockchain.

```solidity
    // paksa saldo agar sesuai dengan cadangan
    function skim(address to) external lock {
        address _token0 = token0; // penghematan gas
        address _token1 = token1; // penghematan gas
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }



    // paksa cadangan agar sesuai dengan saldo
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
}
```

### UniswapV2Factory.sol {#UniswapV2Factory}

[Kontrak ini](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol) membuat bursa pasangan.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToSetter;
```

Variabel status ini diperlukan untuk mengimplementasikan biaya protokol (lihat [laporan resmi](https://app.uniswap.org/whitepaper.pdf), hlm. 5).
Alamat `feeTo` mengakumulasi token likuiditas untuk biaya protokol, dan `feeToSetter` adalah alamat yang diizinkan untuk mengubah `feeTo` ke alamat yang berbeda.

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

Variabel-variabel ini melacak pasangan, bursa antara dua jenis token.

Yang pertama, `getPair`, adalah pemetaan yang mengidentifikasi kontrak bursa pasangan berdasarkan dua token ERC-20 yang ditukarkannya. Token ERC-20 diidentifikasi oleh alamat kontrak yang mengimplementasikannya, jadi kunci dan nilainya semuanya adalah alamat. Untuk mendapatkan alamat bursa pasangan yang memungkinkan Anda mengonversi dari `tokenA` ke `tokenB`, Anda menggunakan `getPair[<alamat tokenA>][<alamat tokenB>]` (atau sebaliknya).

Variabel kedua, `allPairs`, adalah sebuah larik yang menyertakan semua alamat bursa pasangan yang dibuat oleh pabrik ini. Di Ethereum, Anda tidak dapat melakukan iterasi atas konten pemetaan, atau mendapatkan daftar semua kunci, jadi variabel ini adalah satu-satunya cara untuk mengetahui bursa mana yang dikelola oleh pabrik ini.

Catatan: Alasan Anda tidak dapat mengiterasi semua kunci dari pemetaan adalah karena penyimpanan data kontrak itu _mahal_, jadi semakin sedikit yang kita gunakan semakin baik, dan semakin jarang kita mengubahnya semakin baik. Anda dapat membuat [pemetaan yang mendukung iterasi](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol), tetapi mereka memerlukan penyimpanan ekstra untuk daftar kunci. Di sebagian besar aplikasi, Anda tidak memerlukannya.

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

Aksi ini dikeluarkan ketika bursa pasangan baru dibuat. Ini termasuk alamat token, alamat bursa pasangan, dan jumlah total bursa yang dikelola oleh pabrik.

```solidity
    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }
```

Satu-satunya hal yang dilakukan konstruktor adalah menentukan `feeToSetter`. Pabrik mulai tanpa biaya, dan hanya `feeSetter` yang dapat mengubahnya.

```solidity
    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
```

Fungsi ini mengembalikan jumlah pasangan bursa.

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

Ini adalah fungsi utama dari pabrik, untuk membuat bursa pasangan antara dua token ERC-20. Perhatikan bahwa siapa pun dapat memanggil fungsi ini. Anda tidak memerlukan izin dari Uniswap untuk membuat bursa pasangan baru.

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

Kami ingin alamat bursa baru menjadi deterministik, sehingga dapat dihitung di muka di luar rantai (ini dapat berguna untuk [transaksi lapisan 2](/developers/docs/scaling/)).
Untuk melakukan ini, kita perlu memiliki urutan alamat token yang konsisten, terlepas dari urutan di mana kita menerimanya, jadi kita mengurutkannya di sini.

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // pemeriksaan tunggal sudah cukup
```

Pool likuiditas yang besar lebih baik daripada yang kecil, karena memiliki harga yang lebih stabil. Kami tidak ingin memiliki lebih dari satu pool likuiditas per pasangan token. Jika sudah ada bursa, tidak perlu membuat yang lain untuk pasangan yang sama.

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

Untuk membuat kontrak baru, kita memerlukan kode yang membuatnya (baik fungsi konstruktor maupun kode yang menulis ke memori kode bita EVM dari kontrak sebenarnya). Biasanya di Solidity kita hanya menggunakan `addr = new <nama kontrak>(<parameter konstruktor>)` dan kompiler mengurus semuanya untuk kita, tetapi untuk memiliki alamat kontrak yang deterministik, kita perlu menggunakan [opcode CREATE2](https://eips.ethereum.org/EIPS/eip-1014).
Ketika kode ini ditulis, opcode itu belum didukung oleh Solidity, jadi perlu untuk mendapatkan kode secara manual. Ini bukan lagi masalah, karena [Solidity sekarang mendukung CREATE2](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2).

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

Ketika sebuah opcode belum didukung oleh Solidity, kita dapat memanggilnya menggunakan [perakitan sebaris](https://docs.soliditylang.org/en/v0.8.3/assembly.html).

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

Panggil fungsi `initialize` untuk memberi tahu bursa baru dua token apa yang ditukarkannya.

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // mengisi pemetaan ke arah sebaliknya
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
```

Simpan informasi pasangan baru di variabel status dan keluarkan aksi untuk memberi tahu dunia tentang bursa pasangan baru.

```solidity
    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeToSetter = _feeToSetter;
    }
}
```

Kedua fungsi ini memungkinkan `feeSetter` untuk mengontrol penerima biaya (jika ada), dan untuk mengubah `feeSetter` ke alamat baru.

### UniswapV2ERC20.sol {#UniswapV2ERC20}

[Kontrak ini](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol) mengimplementasikan token likuiditas ERC-20. Ini mirip dengan [kontrak ERC-20 OpenZeppelin](/developers/tutorials/erc20-annotated-code), jadi saya hanya akan menjelaskan bagian yang berbeda, yaitu fungsionalitas `permit`.

Transaksi di Ethereum membutuhkan biaya ether (ETH), yang setara dengan uang nyata. Jika Anda memiliki token ERC-20 tetapi tidak memiliki ETH, Anda tidak dapat mengirim transaksi, jadi Anda tidak dapat melakukan apa pun dengannya. Salah satu solusi untuk menghindari masalah ini adalah [transaksi-meta](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions).
Pemilik token menandatangani transaksi yang memungkinkan orang lain untuk menarik token di luar rantai dan mengirimkannya menggunakan Internet ke penerima. Penerima, yang memiliki ETH, kemudian mengirimkan izin atas nama pemilik.

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

Hash ini adalah [pengidentifikasi untuk jenis transaksi](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash). Satu-satunya yang kami dukung di sini adalah `Permit` dengan parameter ini.

```solidity
    mapping(address => uint) public nonces;
```

Tidak mungkin bagi penerima untuk memalsukan tanda tangan digital. Namun, sangat mudah untuk mengirim transaksi yang sama dua kali (ini adalah bentuk [serangan replay](https://wikipedia.org/wiki/Replay_attack)). Untuk mencegahnya, kita menggunakan [nonce](https://wikipedia.org/wiki/Cryptographic_nonce). Jika nonce dari `Permit` baru tidak satu lebih dari yang terakhir digunakan, kami menganggapnya tidak valid.

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

Ini adalah kode untuk mengambil [pengidentifikasi rantai](https://chainid.network/). Ini menggunakan dialek perakitan EVM yang disebut [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html). Perhatikan bahwa dalam versi Yul saat ini Anda harus menggunakan `chainid()`, bukan `chainid`.

```solidity
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'),
                keccak256(bytes(name)),
                keccak256(bytes('1')),
                chainId,
                address(this)
            )
        );
    }
```

Hitung [pemisah domain](https://eips.ethereum.org/EIPS/eip-712#rationale-for-domainseparator) untuk EIP-712.

```solidity
    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
```

Ini adalah fungsi yang mengimplementasikan izin. Ini menerima sebagai parameter bidang-bidang yang relevan, dan tiga nilai skalar untuk [tanda tangan](https://yos.io/2018/11/16/ethereum-signatures/) (v, r, dan s).

```solidity
        require(deadline >= block.timestamp, 'UniswapV2: EXPIRED');
```

Jangan menerima transaksi setelah batas waktu.

```solidity
        bytes32 digest = keccak256(
            abi.encodePacked(
                '\x19\x01',
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))
            )
        );
```

`abi.encodePacked(...)` adalah pesan yang kami harapkan. Kami tahu apa seharusnya nonce itu, jadi kami tidak perlu mendapatkannya sebagai parameter.

Algoritma tanda tangan Ethereum mengharapkan untuk mendapatkan 256 bit untuk ditandatangani, jadi kami menggunakan fungsi hash `keccak256`.

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

Dari intisari dan tanda tangan, kita bisa mendapatkan alamat yang menandatanganinya menggunakan [ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/).

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

Jika semuanya baik-baik saja, perlakukan ini sebagai [persetujuan ERC-20](https://eips.ethereum.org/EIPS/eip-20#approve).

## Kontrak Perifer {#periphery-contracts}

Kontrak perifer adalah API (antarmuka program aplikasi) untuk Uniswap. Mereka tersedia untuk panggilan eksternal, baik dari kontrak lain atau aplikasi terdesentralisasi. Anda dapat memanggil kontrak inti secara langsung, tetapi itu lebih rumit dan Anda mungkin kehilangan nilai jika melakukan kesalahan. Kontrak inti hanya berisi tes untuk memastikan mereka tidak dicurangi, bukan pemeriksaan kewarasan untuk orang lain. Itu ada di perifer sehingga dapat diperbarui sesuai kebutuhan.

### UniswapV2Router01.sol {#UniswapV2Router01}

[Kontrak ini](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol) memiliki masalah, dan [sebaiknya tidak lagi digunakan](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01). Untungnya, kontrak perifer tidak memiliki status dan tidak menyimpan aset apa pun, jadi mudah untuk menghentikannya dan menyarankan orang menggunakan penggantinya, `UniswapV2Router02`.

### UniswapV2Router02.sol {#UniswapV2Router02}

Dalam kebanyakan kasus, Anda akan menggunakan Uniswap melalui [kontrak ini](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol).
Anda bisa melihat cara menggunakannya [di sini](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02).

```solidity
pragma solidity =0.6.6;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol';
import '@uniswap/lib/contracts/libraries/TransferHelper.sol';

import './interfaces/IUniswapV2Router02.sol';
import './libraries/UniswapV2Library.sol';
import './libraries/SafeMath.sol';
import './interfaces/IERC20.sol';
import './interfaces/IWETH.sol';
```

Sebagian besar dari ini pernah kita temui sebelumnya, atau cukup jelas. Satu-satunya pengecualian adalah `IWETH.sol`. Uniswap v2 memungkinkan pertukaran untuk setiap pasangan token ERC-20, tetapi ether (ETH) sendiri bukanlah token ERC-20. Ini mendahului standar dan ditransfer dengan mekanisme unik. Untuk memungkinkan penggunaan ETH dalam kontrak yang berlaku untuk token ERC-20, orang-orang membuat kontrak [wrapped ether (WETH)](https://weth.tkn.eth.limo/). Anda mengirimkan ETH ke kontrak ini, dan kontrak ini mencetak WETH dalam jumlah yang setara untuk Anda. Atau Anda bisa membakar WETH, dan mendapatkan kembali ETH.

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

Router perlu tahu pabrik mana yang harus digunakan, dan untuk transaksi yang memerlukan WETH, kontrak WETH mana yang harus digunakan. Nilai-nilai ini [tidak dapat diubah](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables), artinya hanya dapat diatur di konstruktor. Ini memberi pengguna keyakinan bahwa tidak ada yang akan bisa mengubahnya untuk menunjuk ke kontrak yang kurang jujur.

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

Pengubah ini memastikan bahwa transaksi yang dibatasi waktu ("lakukan X sebelum waktu Y jika bisa") tidak terjadi setelah batas waktunya.

```solidity
    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }
```

Konstruktor hanya mengatur variabel status yang tidak dapat diubah.

```solidity
    receive() external payable {
        assert(msg.sender == WETH); // hanya menerima ETH melalui fallback dari kontrak WETH
    }
```

Fungsi ini dipanggil ketika kita menukarkan token dari kontrak WETH kembali menjadi ETH. Hanya kontrak WETH yang kita gunakan yang berwenang untuk melakukan itu.

#### Tambah Likuiditas {#add-liquidity}

Fungsi-fungsi ini menambahkan token ke bursa pasangan, yang meningkatkan pool likuiditas.

```solidity

    // **** TAMBAH LIKUIDITAS ****
    function _addLiquidity(
```

Fungsi ini digunakan untuk menghitung jumlah token A dan B yang harus disetorkan ke bursa pasangan.

```solidity
        address tokenA,
        address tokenB,
```

Ini adalah alamat kontrak token ERC-20.

```solidity
        uint amountADesired,
        uint amountBDesired,
```

Ini adalah jumlah yang ingin disetor oleh penyedia likuiditas. Mereka juga merupakan jumlah maksimum A dan B yang akan disetor.

```solidity
        uint amountAMin,
        uint amountBMin
```

Ini adalah jumlah minimum yang dapat diterima untuk disetor. Jika transaksi tidak dapat terjadi dengan jumlah ini atau lebih, kembalikan. Jika Anda tidak menginginkan fitur ini, cukup tentukan nol.

Penyedia likuiditas biasanya menentukan minimum, karena mereka ingin membatasi transaksi ke nilai tukar yang mendekati nilai saat ini. Jika nilai tukar berfluktuasi terlalu banyak, itu bisa berarti ada berita yang mengubah nilai dasarnya, dan mereka ingin memutuskan secara manual apa yang harus dilakukan.

Misalnya, bayangkan sebuah kasus di mana nilai tukar adalah satu banding satu dan penyedia likuiditas menentukan nilai-nilai ini:

| Parameter      | Nilai |
| -------------- | ----: |
| amountADesired |  1000 |
| amountBDesired |  1000 |
| amountAMin     |   900 |
| amountBMin     |   800 |

Selama nilai tukar tetap antara 0,9 dan 1,25, transaksi terjadi. Jika nilai tukar keluar dari rentang itu, transaksi dibatalkan.

Alasan untuk tindakan pencegahan ini adalah karena transaksi tidak bersifat langsung, Anda mengirimkannya dan pada akhirnya seorang validator akan memasukkannya ke dalam sebuah blok (kecuali jika harga gas Anda sangat rendah, dalam hal ini Anda harus mengirimkan transaksi lain dengan nonce yang sama dan harga gas yang lebih tinggi untuk menimpanya). Anda tidak dapat mengontrol apa yang terjadi selama interval antara pengiriman dan penyertaan.

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

Fungsi ini mengembalikan jumlah yang harus disetor oleh penyedia likuiditas agar memiliki rasio yang sama dengan rasio saat ini antara cadangan.

```solidity
        // buat pasangan jika belum ada
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
```

Jika belum ada bursa untuk pasangan token ini, buatlah.

```solidity
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
```

Dapatkan cadangan saat ini di pasangan.

```solidity
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
```

Jika cadangan saat ini kosong maka ini adalah bursa pasangan baru. Jumlah yang akan disetor harus sama persis dengan yang ingin disediakan oleh penyedia likuiditas.

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

Jika kita perlu melihat berapa jumlahnya, kita mendapatkan jumlah optimal menggunakan [fungsi ini](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35). Kami ingin rasio yang sama dengan cadangan saat ini.

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

Jika `amountBOptimal` lebih kecil dari jumlah yang ingin disetor oleh penyedia likuiditas, itu berarti token B saat ini lebih berharga daripada yang dipikirkan oleh penyetor likuiditas, sehingga diperlukan jumlah yang lebih kecil.

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

Jika jumlah B optimal lebih dari jumlah B yang diinginkan, itu berarti token B saat ini kurang berharga daripada yang dipikirkan penyetor likuiditas, sehingga diperlukan jumlah yang lebih tinggi. Namun, jumlah yang diinginkan adalah maksimum, jadi kita tidak bisa melakukannya. Sebaliknya, kami menghitung jumlah token A yang optimal untuk jumlah token B yang diinginkan.

Dengan menggabungkan semuanya, kita mendapatkan grafik ini. Asumsikan Anda mencoba menyetor seribu token A (garis biru) dan seribu token B (garis merah). Sumbu x adalah nilai tukar, A/B. Jika x=1, nilainya sama dan Anda menyetor seribu dari masing-masing. Jika x=2, A dua kali nilai B (Anda mendapatkan dua token B untuk setiap token A) jadi Anda menyetor seribu token B, tetapi hanya 500 token A. Jika x=0.5, situasinya terbalik, seribu token A dan lima ratus token B.

![Grafik](liquidityProviderDeposit.png)

Anda dapat menyetor likuiditas langsung ke kontrak inti (menggunakan [UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110)), tetapi kontrak inti hanya memeriksa bahwa ia tidak dicurangi, jadi Anda berisiko kehilangan nilai jika nilai tukar berubah antara waktu Anda mengirimkan transaksi Anda dan waktu dieksekusi. Jika Anda menggunakan kontrak perifer, ia menghitung jumlah yang harus Anda setor dan menyetorkannya segera, sehingga nilai tukar tidak berubah dan Anda tidak kehilangan apa pun.

```solidity
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
```

Fungsi ini dapat dipanggil oleh transaksi untuk menyetor likuiditas. Sebagian besar parameter sama seperti pada `_addLiquidity` di atas, dengan dua pengecualian:

. `to` adalah alamat yang mendapatkan token likuiditas baru yang dicetak untuk menunjukkan bagian penyedia likuiditas dari pool
. `deadline` adalah batas waktu pada transaksi

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

Kami menghitung jumlah yang akan benar-benar disetor dan kemudian menemukan alamat pool likuiditas. Untuk menghemat gas, kami tidak melakukan ini dengan bertanya pada pabrik, tetapi menggunakan fungsi pustaka `pairFor` (lihat di bawah di pustaka)

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

Transfer jumlah token yang benar dari pengguna ke bursa pasangan.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
    }
```

Sebagai gantinya, berikan token likuiditas alamat `to` untuk kepemilikan parsial dari pool. Fungsi `mint` dari kontrak inti melihat berapa banyak token tambahan yang dimilikinya (dibandingkan dengan yang dimilikinya terakhir kali likuiditas berubah) dan mencetak likuiditas yang sesuai.

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

Ketika penyedia likuiditas ingin menyediakan likuiditas ke bursa pasangan Token/ETH, ada beberapa perbedaan. Kontrak menangani pembungkusan ETH untuk penyedia likuiditas. Tidak perlu menentukan berapa banyak ETH yang ingin disetor oleh pengguna, karena pengguna hanya mengirimkannya dengan transaksi (jumlahnya tersedia di `msg.value`).

```solidity
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external virtual override payable ensure(deadline) returns (uint amountToken, uint amountETH, uint liquidity) {
        (amountToken, amountETH) = _addLiquidity(
            token,
            WETH,
            amountTokenDesired,
            msg.value,
            amountTokenMin,
            amountETHMin
        );
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        TransferHelper.safeTransferFrom(token, msg.sender, pair, amountToken);
        IWETH(WETH).deposit{value: amountETH}();
        assert(IWETH(WETH).transfer(pair, amountETH));
```

Untuk menyetor ETH, kontrak pertama-tama membungkusnya menjadi WETH dan kemudian mentransfer WETH ke pasangan. Perhatikan bahwa transfer dibungkus dalam `assert`. Ini berarti bahwa jika transfer gagal, panggilan kontrak ini juga gagal, dan oleh karena itu pembungkusan tidak benar-benar terjadi.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // kembalikan sisa eth, jika ada
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }
```

Pengguna telah mengirimi kami ETH, jadi jika ada sisa (karena token lain kurang berharga dari yang dipikirkan pengguna), kami perlu mengeluarkan pengembalian dana.

#### Hapus Likuiditas {#remove-liquidity}

Fungsi-fungsi ini akan menghapus likuiditas dan membayar kembali penyedia likuiditas.

```solidity
    // **** HAPUS LIKUIDITAS ****
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountA, uint amountB) {
```

Kasus paling sederhana untuk menghapus likuiditas. Ada jumlah minimum dari setiap token yang disetujui penyedia likuiditas untuk diterima, dan itu harus terjadi sebelum batas waktu.

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // kirim likuiditas ke pasangan
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

Fungsi `burn` dari kontrak inti menangani pembayaran kembali token kepada pengguna.

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

Ketika sebuah fungsi mengembalikan beberapa nilai, tetapi kita hanya tertarik pada beberapa di antaranya, inilah cara kita hanya mendapatkan nilai-nilai itu. Ini agak lebih murah dalam hal gas daripada membaca nilai dan tidak pernah menggunakannya.

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

Terjemahkan jumlah dari cara kontrak inti mengembalikannya (token alamat lebih rendah terlebih dahulu) ke cara yang diharapkan pengguna (sesuai dengan `tokenA` dan `tokenB`).

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

Tidak apa-apa untuk melakukan transfer terlebih dahulu dan kemudian memverifikasi keabsahannya, karena jika tidak, kami akan mengembalikan semua perubahan status.

```solidity
    function removeLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountToken, uint amountETH) {
        (amountToken, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, amountToken);
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }
```

Menghapus likuiditas untuk ETH hampir sama, kecuali bahwa kami menerima token WETH dan kemudian menukarkannya dengan ETH untuk dikembalikan kepada penyedia likuiditas.

```solidity
    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountA, uint amountB) {
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountA, amountB) = removeLiquidity(tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline);
    }


    function removeLiquidityETHWithPermit(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountToken, uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountToken, amountETH) = removeLiquidityETH(token, liquidity, amountTokenMin, amountETHMin, to, deadline);
    }
```

Fungsi-fungsi ini menyampaikan transaksi-meta untuk memungkinkan pengguna tanpa ether menarik dari pool, menggunakan [mekanisme izin](#UniswapV2ERC20).

```solidity

    // **** HAPUS LIKUIDITAS (mendukung token dengan biaya saat transfer) ****
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountETH) {
        (, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, IERC20(token).balanceOf(address(this)));
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }

```

Fungsi ini dapat digunakan untuk token yang memiliki biaya transfer atau penyimpanan. Ketika sebuah token memiliki biaya seperti itu, kita tidak dapat mengandalkan fungsi `removeLiquidity` untuk memberi tahu kita berapa banyak token yang kita dapatkan kembali, jadi kita perlu menarik terlebih dahulu dan kemudian mendapatkan saldo.

```solidity


    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        amountETH = removeLiquidityETHSupportingFeeOnTransferTokens(
            token, liquidity, amountTokenMin, amountETHMin, to, deadline
        );
    }
```

Fungsi terakhir menggabungkan biaya penyimpanan dengan transaksi-meta.

#### Perdagangkan {#trade}

```solidity
    // **** TUKAR ****
    // memerlukan jumlah awal untuk sudah dikirim ke pasangan pertama
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

Fungsi ini melakukan pemrosesan internal yang diperlukan untuk fungsi-fungsi yang diekspos ke pedagang.

```solidity
        for (uint i; i < path.length - 1; i++) {
```

Saat saya menulis ini, ada [388.160 token ERC-20](https://eth.blockscout.com/tokens). Jika ada bursa pasangan untuk setiap pasangan token, maka akan ada lebih dari 150 miliar bursa pasangan. Seluruh rantai, pada saat ini, [hanya memiliki 0,1% dari jumlah akun tersebut](https://eth.blockscout.com/stats/accountsGrowth). Sebagai gantinya, fungsi penukaran mendukung konsep jalur. Seorang pedagang dapat menukarkan A dengan B, B dengan C, dan C dengan D, sehingga tidak perlu ada bursa pasangan A-D secara langsung.

Harga di pasar-pasar ini cenderung tersinkronisasi, karena ketika tidak sinkron, hal itu menciptakan peluang untuk arbitrase. Bayangkan, misalnya, ada tiga token, A, B, dan C. Terdapat tiga bursa pasangan, satu untuk setiap pasangan.

1. Situasi awal
2. Seorang pedagang menjual 24,695 token A dan mendapatkan 25,305 token B.
3. Pedagang tersebut menjual 24,695 token B dengan 25,305 token C, menyimpan sekitar 0,61 token B sebagai keuntungan.
4. Kemudian pedagang tersebut menjual 24,695 token C dengan 25,305 token A, menyimpan sekitar 0,61 token C sebagai keuntungan. Pedagang tersebut juga memiliki 0,61 token A tambahan (25,305 yang didapatkan pedagang, dikurangi investasi awal sebesar 24,695).

| Langkah | Bursa A-B                                                   | Bursa B-C                                                   | Bursa A-C                                                   |
| ------- | ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| 1       | A:1000 B:1050 A/B=1,05      | B:1000 C:1050 B/C=1,05      | A:1050 C:1000 C/A=1,05      |
| 2       | A:1024,695 B:1024,695 A/B=1 | B:1000 C:1050 B/C=1,05      | A:1050 C:1000 C/A=1,05      |
| 3       | A:1024,695 B:1024,695 A/B=1 | B:1024,695 C:1024,695 B/C=1 | A:1050 C:1000 C/A=1,05      |
| 4       | A:1024,695 B:1024,695 A/B=1 | B:1024,695 C:1024,695 B/C=1 | A:1024,695 C:1024,695 C/A=1 |

```solidity
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
```

Dapatkan pasangan yang sedang kami tangani, urutkan (untuk digunakan dengan pasangan tersebut) dan dapatkan jumlah keluaran yang diharapkan.

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

Dapatkan jumlah keluar yang diharapkan, diurutkan sesuai dengan yang diharapkan oleh bursa pasangan.

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

Apakah ini bursa terakhir? Jika ya, kirim token yang diterima untuk perdagangan ke tujuan. Jika tidak, kirimkan ke bursa pasangan berikutnya.

```solidity

            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

Panggil bursa pasangan untuk menukar token. Kami tidak memerlukan panggilan balik untuk diberi tahu tentang bursa, jadi kami tidak mengirim bita apa pun di bidang itu.

```solidity
    function swapExactTokensForTokens(
```

Fungsi ini digunakan secara langsung oleh para pedagang untuk menukar satu token dengan token lainnya.

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

Parameter ini berisi alamat-alamat dari kontrak ERC-20. Seperti yang dijelaskan di atas, ini adalah sebuah larik karena Anda mungkin perlu melalui beberapa bursa pasangan untuk beralih dari aset yang Anda miliki ke aset yang Anda inginkan.

Parameter fungsi dalam Solidity dapat disimpan baik di `memory` maupun di `calldata`. Jika fungsi adalah titik masuk ke kontrak, yang dipanggil langsung dari pengguna (menggunakan transaksi) atau dari kontrak yang berbeda, maka nilai parameter dapat diambil langsung dari data panggilan. Jika fungsi dipanggil secara internal, seperti `_swap` di atas, maka parameter harus disimpan di `memory`. Dari perspektif kontrak yang dipanggil, `calldata` hanya bisa dibaca.

Dengan tipe skalar seperti `uint` atau `address`, kompiler menangani pilihan penyimpanan untuk kita, tetapi dengan larik, yang lebih panjang dan lebih mahal, kita menentukan jenis penyimpanan yang akan digunakan.

```solidity
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
```

Nilai pengembalian selalu dikembalikan dalam memori.

```solidity
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
```

Hitung jumlah yang akan dibeli dalam setiap penukaran. Jika hasilnya kurang dari minimum yang bersedia diterima pedagang, kembalikan transaksi.

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

Terakhir, transfer token ERC-20 awal ke akun untuk bursa pasangan pertama dan panggil `_swap`. Semua ini terjadi dalam transaksi yang sama, sehingga bursa pasangan tahu bahwa setiap token tak terduga adalah bagian dari transfer ini.

```solidity
    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

Fungsi sebelumnya, `swapTokensForTokens`, memungkinkan pedagang untuk menentukan jumlah pasti token masukan yang bersedia ia berikan dan jumlah minimum token keluaran yang bersedia ia terima sebagai imbalannya. Fungsi ini melakukan penukaran terbalik, memungkinkan pedagang untuk menentukan jumlah token keluaran yang diinginkannya, dan jumlah maksimum token masukan yang bersedia ia bayarkan untuk itu.

Dalam kedua kasus, pedagang harus memberikan tunjangan terlebih dahulu kepada kontrak periferi ini agar dapat mentransfernya.

```solidity
    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, msg.value, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
    }


    function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }



    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }


    function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= msg.value, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
        // refund dust eth, if any
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }
```

Keempat varian ini semuanya melibatkan perdagangan antara ETH dan token. Satu-satunya perbedaan adalah kami menerima ETH dari pedagang dan menggunakannya untuk mencetak WETH, atau kami menerima WETH dari bursa terakhir di jalur dan membakarnya, lalu mengirimkan kembali ETH yang dihasilkan ke pedagang.

```solidity
    // **** TUKAR (mendukung token dengan biaya saat transfer) ****
    // memerlukan jumlah awal untuk sudah dikirim ke pasangan pertama
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
```

Ini adalah fungsi internal untuk menukar token yang memiliki biaya transfer atau penyimpanan untuk menyelesaikan ([masalah ini](https://github.com/Uniswap/uniswap-interface/issues/835)).

```solidity
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output));
            uint amountInput;
            uint amountOutput;
            { // scope to avoid stack too deep errors
            (uint reserve0, uint reserve1,) = pair.getReserves();
            (uint reserveInput, uint reserveOutput) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
            amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
            amountOutput = UniswapV2Library.getAmountOut(amountInput, reserveInput, reserveOutput);
```

Karena adanya biaya transfer, kami tidak dapat mengandalkan fungsi `getAmountsOut` untuk memberi tahu kami berapa banyak yang kami dapatkan dari setiap transfer (seperti yang kami lakukan sebelum memanggil `_swap` yang asli). Sebagai gantinya, kita harus mentransfer terlebih dahulu dan kemudian melihat berapa banyak token yang kita dapatkan kembali.

Catatan: Secara teori, kita bisa saja menggunakan fungsi ini sebagai ganti `_swap`, tetapi dalam kasus tertentu (misalnya, jika transfer akhirnya dikembalikan karena tidak ada cukup dana pada akhirnya untuk memenuhi minimum yang diperlukan) hal itu akan menghabiskan lebih banyak gas. Token dengan biaya transfer cukup langka, jadi meskipun kita perlu mengakomodasi mereka, tidak perlu semua penukaran mengasumsikan bahwa mereka melewati setidaknya salah satunya.

```solidity
            }
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOutput) : (amountOutput, uint(0));
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
            pair.swap(amount0Out, amount1Out, to, new bytes(0));
        }
    }


    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) {
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT'
        );
    }


    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        payable
        ensure(deadline)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        uint amountIn = msg.value;
        IWETH(WETH).deposit{value: amountIn}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn));
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT'
        );
    }


    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        ensure(deadline)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        _swapSupportingFeeOnTransferTokens(path, address(this));
        uint amountOut = IERC20(WETH).balanceOf(address(this));
        require(amountOut >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).withdraw(amountOut);
        TransferHelper.safeTransferETH(to, amountOut);
    }
```

Ini adalah varian yang sama yang digunakan untuk token normal, tetapi mereka memanggil `_swapSupportingFeeOnTransferTokens` sebagai gantinya.

```solidity
    // **** FUNGSI PUSTAKA ****
    function quote(uint amountA, uint reserveA, uint reserveB) public pure virtual override returns (uint amountB) {
        return UniswapV2Library.quote(amountA, reserveA, reserveB);
    }

    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut)
        public
        pure
        virtual
        override
        returns (uint amountOut)
    {
        return UniswapV2Library.getAmountOut(amountIn, reserveIn, reserveOut);
    }

    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut)
        public
        pure
        virtual
        override
        returns (uint amountIn)
    {
        return UniswapV2Library.getAmountIn(amountOut, reserveIn, reserveOut);
    }

    function getAmountsOut(uint amountIn, address[] memory path)
        public
        view
        virtual
        override
        returns (uint[] memory amounts)
    {
        return UniswapV2Library.getAmountsOut(factory, amountIn, path);
    }

    function getAmountsIn(uint amountOut, address[] memory path)
        public
        view
        virtual
        override
        returns (uint[] memory amounts)
    {
        return UniswapV2Library.getAmountsIn(factory, amountOut, path);
    }
}
```

Fungsi-fungsi ini hanyalah proksi yang memanggil [fungsi-fungsi UniswapV2Library](#uniswapV2library).

### UniswapV2Migrator.sol {#UniswapV2Migrator}

Kontrak ini digunakan untuk memigrasikan bursa dari v1 lama ke v2. Sekarang setelah mereka dimigrasikan, kontrak ini tidak lagi relevan.

## Pustaka {#libraries}

[Pustaka SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) didokumentasikan dengan baik, jadi tidak perlu mendokumentasikannya di sini.

### Math {#Math}

Pustaka ini berisi beberapa fungsi matematika yang biasanya tidak diperlukan dalam kode Solidity, sehingga fungsi-fungsi tersebut bukan bagian dari bahasa.

```solidity
pragma solidity =0.5.16;

// sebuah pustaka untuk melakukan berbagai operasi matematika

library Math {
    function min(uint x, uint y) internal pure returns (uint z) {
        z = x < y ? x : y;
    }

    // metode babilonia (https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
```

Mulai dengan x sebagai perkiraan yang lebih tinggi dari akar kuadrat (itulah alasan mengapa kita perlu memperlakukan 1-3 sebagai kasus khusus).

```solidity
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
```

Dapatkan perkiraan yang lebih dekat, yaitu rata-rata dari perkiraan sebelumnya dan angka yang akar kuadratnya coba kita temukan dibagi dengan perkiraan sebelumnya. Ulangi hingga perkiraan baru tidak lebih rendah dari perkiraan yang ada. Untuk detail lebih lanjut, [lihat di sini](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method).

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

Kita seharusnya tidak akan pernah membutuhkan akar kuadrat dari nol. Akar kuadrat dari satu, dua, dan tiga adalah sekitar satu (kita menggunakan bilangan bulat, jadi kita mengabaikan pecahannya).

```solidity
        }
    }
}
```

### Pecahan Titik Tetap (UQ112x112) {#FixedPoint}

Pustaka ini menangani pecahan, yang biasanya bukan bagian dari aritmetika Ethereum. Ini dilakukan dengan mengodekan angka _x_ sebagai _x\*2^112_. Ini memungkinkan kita menggunakan opcode penjumlahan dan pengurangan asli tanpa perubahan.

```solidity
pragma solidity =0.5.16;

// sebuah pustaka untuk menangani bilangan titik tetap biner (https://wikipedia.org/wiki/Q_(number_format))

// rentang: [0, 2**112 - 1]
// resolusi: 1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112` adalah pengodean untuk angka satu.

```solidity
    // mengodekan uint112 sebagai UQ112x112
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // tidak pernah meluap
    }
```

Karena y adalah `uint112`, nilai terbesarnya adalah 2^112-1. Angka tersebut masih dapat dikodekan sebagai `UQ112x112`.

```solidity
    // membagi UQ112x112 dengan uint112, mengembalikan UQ112x112
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

Jika kita membagi dua nilai `UQ112x112`, hasilnya tidak lagi dikalikan dengan 2^112. Jadi, sebagai gantinya kita mengambil bilangan bulat untuk penyebutnya. Kita perlu menggunakan trik serupa untuk melakukan perkalian, tetapi kita tidak perlu melakukan perkalian nilai `UQ112x112`.

### UniswapV2Library {#uniswapV2library}

Pustaka ini hanya digunakan oleh kontrak-kontrak periferi

```solidity
pragma solidity >=0.5.0;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import "./SafeMath.sol";

library UniswapV2Library {
    using SafeMath for uint;

    // mengembalikan alamat token yang diurutkan, digunakan untuk menangani nilai pengembalian dari pasangan yang diurutkan dalam urutan ini
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
```

Urutkan kedua token berdasarkan alamat, sehingga kita bisa mendapatkan alamat bursa pasangan untuk mereka. Ini diperlukan karena jika tidak, kita akan memiliki dua kemungkinan, satu untuk parameter A,B dan satu lagi untuk parameter B,A, yang mengarah ke dua bursa alih-alih satu.

```solidity
    // menghitung alamat CREATE2 для sebuah pasangan tanpa melakukan panggilan eksternal
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f' // hash kode init
            ))));
    }
```

Fungsi ini menghitung alamat bursa pasangan untuk kedua token. Kontrak ini dibuat menggunakan [opcode CREATE2](https://eips.ethereum.org/EIPS/eip-1014), jadi kita dapat menghitung alamat menggunakan algoritma yang sama jika kita mengetahui parameter yang digunakannya. Ini jauh lebih murah daripada bertanya ke factory, dan

```solidity
    // mengambil dan mengurutkan cadangan untuk sebuah pasangan
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

Fungsi ini mengembalikan cadangan dari dua token yang dimiliki bursa pasangan. Perhatikan bahwa fungsi ini dapat menerima token dalam urutan apa pun, dan mengurutkannya untuk penggunaan internal.

```solidity
    // dengan sejumlah aset dan cadangan pasangan, mengembalikan jumlah yang setara dari aset lainnya
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

Fungsi ini memberikan jumlah token B yang akan Anda dapatkan sebagai imbalan untuk token A jika tidak ada biaya yang terlibat. Perhitungan ini memperhitungkan bahwa transfer tersebut mengubah nilai tukar.

```solidity
    // dengan jumlah masukan aset dan cadangan pasangan, mengembalikan jumlah keluaran maksimum dari aset lainnya
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
```

Fungsi `quote` di atas bekerja dengan baik jika tidak ada biaya untuk menggunakan bursa pasangan. Namun, jika ada biaya bursa 0,3%, jumlah yang sebenarnya Anda dapatkan lebih rendah. Fungsi ini menghitung jumlah setelah biaya bursa.

```solidity

        require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }
```

Solidity tidak menangani pecahan secara native, jadi kita tidak bisa begitu saja mengalikan jumlah keluaran dengan 0,997. Sebagai gantinya, kita mengalikan pembilang dengan 997 dan penyebut dengan 1000, untuk mencapai efek yang sama.

```solidity
    // dengan jumlah keluaran aset dan cadangan pasangan, mengembalikan jumlah masukan yang diperlukan dari aset lainnya
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
        require(amountOut > 0, 'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint numerator = reserveIn.mul(amountOut).mul(1000);
        uint denominator = reserveOut.sub(amountOut).mul(997);
        amountIn = (numerator / denominator).add(1);
    }
```

Fungsi ini melakukan hal yang kurang lebih sama, tetapi ia mendapatkan jumlah keluaran dan menyediakan masukan.

```solidity

    // melakukan perhitungan getAmountOut berantai pada sejumlah pasangan
    function getAmountsOut(address factory, uint amountIn, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        for (uint i; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
        }
    }

    // melakukan perhitungan getAmountIn berantai pada sejumlah pasangan
    function getAmountsIn(address factory, uint amountOut, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[amounts.length - 1] = amountOut;
        for (uint i = path.length - 1; i > 0; i--) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i - 1], path[i]);
            amounts[i - 1] = getAmountIn(amounts[i], reserveIn, reserveOut);
        }
    }
}
```

Kedua fungsi ini menangani identifikasi nilai ketika perlu melalui beberapa bursa pasangan.

### Transfer Helper {#transfer-helper}

[Pustaka ini](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol) menambahkan pemeriksaan keberhasilan di sekitar transfer ERC-20 dan Ethereum untuk memperlakukan pengembalian dan nilai `false` dengan cara yang sama.

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.0;

// metode pembantu untuk berinteraksi dengan token ERC20 dan mengirim ETH yang tidak secara konsisten mengembalikan nilai benar/salah
library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));

```

Kita dapat memanggil kontrak yang berbeda dengan salah satu dari dua cara:

- Gunakan definisi antarmuka untuk membuat panggilan fungsi
- Gunakan [antarmuka biner aplikasi (ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html) secara "manual" untuk membuat panggilan. Inilah yang diputuskan oleh penulis kode untuk melakukannya.

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

Demi kompatibilitas mundur dengan token yang dibuat sebelum standar ERC-20, panggilan ERC-20 dapat gagal baik dengan membalikkan (dalam hal ini `success` adalah `false`) atau dengan berhasil dan mengembalikan nilai `false` (dalam hal ini ada data keluaran, dan jika Anda mendekodenya sebagai boolean, Anda mendapatkan `false`).

```solidity


    function safeTransfer(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transfer(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0xa9059cbb, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeTransfer: transfer failed'
        );
    }
```

Fungsi ini mengimplementasikan [fungsionalitas transfer ERC-20](https://eips.ethereum.org/EIPS/eip-20#transfer), yang memungkinkan suatu akun untuk membelanjakan tunjangan yang diberikan oleh akun yang berbeda.

```solidity

    function safeTransferFrom(
        address token,
        address from,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transferFrom(address,address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x23b872dd, from, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::transferFrom: transferFrom failed'
        );
    }
```

Fungsi ini mengimplementasikan [fungsionalitas transferFrom ERC-20](https://eips.ethereum.org/EIPS/eip-20#transferfrom), yang memungkinkan suatu akun untuk membelanjakan tunjangan yang diberikan oleh akun yang berbeda.

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

Fungsi ini mentransfer ether ke sebuah akun. Setiap panggilan ke kontrak yang berbeda dapat mencoba mengirim ether. Karena kita tidak perlu benar-benar memanggil fungsi apa pun, kita tidak mengirim data apa pun dengan panggilan tersebut.

## Kesimpulan {#conclusion}

Ini adalah artikel panjang sekitar 50 halaman. Jika Anda berhasil sampai di sini, selamat! Semoga sekarang Anda telah memahami pertimbangan dalam menulis aplikasi dunia nyata (berbeda dengan program sampel singkat) dan lebih mampu menulis kontrak untuk kasus penggunaan Anda sendiri.

Sekarang, pergilah dan tulislah sesuatu yang berguna dan buat kami takjub.

[Lihat di sini untuk lebih banyak pekerjaan saya](https://cryptodocguy.pro/).
