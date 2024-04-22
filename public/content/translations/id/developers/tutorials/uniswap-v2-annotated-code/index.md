---
title: "Panduan Lengkap Kontrak Uniswap-v2"
description: Bagaimana cara kerja kontrak Uniswap-v2? Mengapa ditulis dengan cara tersebut?
author: Ori Pomerantz
tags:
  - "solidity"
skill: intermediate
published: 2021-05-01
lang: id
---

## Pendahuluan {#introduction}

[Uniswap v2](https://uniswap.org/whitepaper.pdf) dapat membuat pasar bursa antara dua token ERC-20 mana pun. Dalam artikel ini, kita akan memeriksa kode sumber untuk kontrak-kontrak yang menerapkan protokol ini dan melihat alasan kontrak-kontrak tersebut ditulis dengan cara ini.

### Apa Fungsi Uniswap? {#what-does-uniswap-do}

Pada dasarnya, ada dua tipe pengguna: penyedia likuiditas dan pedagang.

_Penyedia likuiditas_ menyediakan pool dengan dua token yang dapat dipertukarkan (kita akan memanggilnya **Token0** dan **Token1**). Sebagai hasilnya, token-token tersebut menerima token ketiga yang menyatakan sebagian kepemilikan dari pool yang disebut _token likuiditas_.

_Pedagang_ mengirimkan satu jenis token ke pool dan menerima token lainnya (contohnya, mengirimkan **Token0** dan menerima **Token1**) dari pool yang disediakan oleh penyedia likuiditas. Nilai tukar ditentukan oleh jumlah relatif dari **Token0** dan **Token1** yang dimiliki oleh pool. Selain itu, pool mengambil persentase kecil sebagai imbalan untuk pool likuiditas.

Ketika penyedia likuiditas menginginkan kembali aset mereka, mereka dapat membakar token pool dan menerima kembali token mereka, termasuk bagian imbalan mereka.

[Klik di sini untuk deskripsi lengkapnya](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/).

### Mengapa v2? Mengapa bukan v3? {#why-v2}

Waktu saya menulis ini, [Uniswap v3](https://uniswap.org/whitepaper-v3.pdf) hampir siap. Namun, peningkatan tersebut jauh lebih rumit dari versi aslinya. Lebih mudah untuk terlebih dahulu mempelajari v2 dan kemudian beralih ke v3.

### Kontrak Inti vs Kontrak Perifer {#contract-types}

Uniswap v2 terbagi menjadi dua komponen, inti dan perifer. Pembagian ini membuat kontrak inti, yang menampung aset dan oleh karena itu _harus_ aman, menjadi lebih sederhana dan mudah untuk diaudit. Semua fungsionalitas ekstra yang diperlukan oleh para pedagang kemudian dapat disediakan oleh kontrak perifer.

## Alur Data dan Pengendalian {#flows}

Ini adalah alur data dan pengendalian yang terjadi ketika Anda melakukan ketiga aksi utama Uniswap:

1. Menukar antara token-token yang berbeda
2. Menambahkan likuiditas ke pasar dan mendapatkan imbalan dengan bursa pasangan token likuiditas ERC-20
3. Membakar token likuiditas ERC-20 dan mendapatkan kembali token ERC-20 yang diperbolehkan bursa pasangan untuk ditukarkan oleh para pedagang

### Menukar {#swap-flow}

Alur ini paling umum, yang digunakan oleh para pedagang:

#### Pemanggil {#caller}

1. Menyediakan akun perifer dengan tunjangan dalam jumlah yang dapat ditukarkan.
2. Memanggil salah satu dari banyak fungsi penukaran kontrak perifer (yang bergantung pada apakah ETH dilibatkan atau tidak, apakah pedagang menentukan jumlah token yang akan disetorkan atau jumlah token yang akan didapatkan kembali, dll). Setiap fungsi penukaran menerima `jalur`, larik bursa yang akan dilewati.

#### Dalam kontrak perifer (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02-sol}

3. Mengenali jumlah yang perlu diperdagangkan pada setiap bursa sepanjang jalur.
4. Mengulang di sepanjang jalur. Untuk setiap bursa di sepanjang jalur, mengirimkan token input dan kemudian memanggil fungsi `penukaran` bursa. Dalam kebanyakan kasus, alamat tujuan token adalah bursa pasangan berikutnya dalam jalur. Dalam bursa terakhir, ada alamat yang disediakan oleh pedagang.

#### Dalam kontrak inti (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

5. Verifikasi bahwa kontrak inti tidak dicurangi dan dapat mempertahankan likuiditas yang memadai setelah penukaran.
6. Melihat seberapa banyak token tambahan yang kita miliki selain dari cadangan yang diketahui. Jumlah tersebut adalah jumlah token input yang kita terima untuk dipertukarkan.
7. Mengirimkan token output ke tujuan.
8. Memanggil `_update` untuk memperbarui jumlah cadangan

#### Kembali dalam kontrak perifer (UniswapV2Router02.sol) {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. Melakukan pembersihan mana pun yang diperlukan (contohnya, membakar token WETH untuk mendapatkan kembali ETH yang akan dikirimkan ke pedagang)

### Menambah Likuiditas {#add-liquidity-flow}

#### Pemanggil {#caller-2}

1. Menyediakan akun perifer dengan tunjangan dalam jumlah yang akan ditambahkan ke pool likuiditas.
2. Memanggil salah satu dari fungsi addLiquidity kontrak perifer.

#### Dalam kontrak perifer (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-2}

3. Membuat bursa pasangan baru jika diperlukan
4. Jika ada bursa pasangan yang telah ada, hitung jumlah token yang akan ditambahkan. Seharusnya nilai yang sama untuk kedua token, sehingga rasionya sama untuk token baru dan token yang telah ada.
5. Memeriksa jika jumlahnya dapat diterima (pemanggil dapat menentukan jumlah minimum di bawah yang tidak akan mereka tambahkan ke likuiditas)
6. Memanggil kontrak inti.

#### Dalam kontrak inti (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

7. Mencetak token likuiditas dan mengirimkannya ke pemanggil
8. Memanggil `_update` untuk memperbarui jumlah cadangan

### Menghapus Likuiditas {#remove-liquidity-flow}

#### Pemanggil {#caller-3}

1. Menyediakan akun perifer dengan tunjangan dari token likuiditas yang akan dibakar di bursa untuk token yang mendasarinya.
2. Memanggil salah satu dari fungsi removeLiquidity kontrak perifer.

#### Dalam kontrak perifer (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-3}

3. Mengirimkan token likuiditas ke bursa pasangan

#### Dalam kontrak inti (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-3}

4. Mengirimkan ke alamat tujuan token yang mendasarinya sesuai proporsi terhadap token yang akan dibakar. Contohnya, jika ada 1000 token A dalam pool, 500 token B, dan 90 token likuiditas, dan kita menerima 9 token untuk dibakar, kita membakar 10% dari token likuiditas sehingga kita mengirimkan kembali ke pengguna 100 token A dan 50 token B.
5. Membakar token likuiditas
6. Memanggil `_update` untuk memperbarui jumlah cadangan

## Kontrak Inti {#core-contracts}

Ini adalah kontrak aman yang menampung likuiditas.

### UniswapV2Pair.sol {#UniswapV2Pair}

[Kontrak ini](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol) menerapkan pool sebenarnya yang mempertukarkan token. Ini adalah fungsionalitas Uniswap inti.

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

Semua antarmuka ini perlu diketahui oleh kontrak, baik karena kontrak menerapkan fungsionalitas tersebut (`IUniswapV2Pair` dan `UniswapV2ERC20`) atau karena memanggil kontrak yang menerapkannya.

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

Kontrak ini mewarisi dari `UniswapV2ERC20`, yang menyediakan fungsi ERC-20 untuk token likuiditas.

```solidity
    using SafeMath  for uint;
```

[Pustaka SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) digunakan untuk menghindari overflow dan underflow. Hal ini penting karena jika tidak, kita dapat terjebak dalam situasi di mana nilai seharusnya `-1`, tetapi malah menjadi `2^256-1`.

```solidity
    using UQ112x112 for uint224;
```

Banyak perhitungan dalam kontrak pool yang memerlukan pecahan. Namun, pecahan tidak didukung oleh EVM. Solusi yang ditemukan Uniswap adalah menggunakan nilai 224 bita, dengan 112 bita untuk bagian bilangan bulat, dan 112 bita untuk pecahannya. Jadi, `1,0` dinyatakan sebagai `2^112`, `1,5` dinyatakan sebagai `2^112 + 2^111`, dll.

Rincian selengkapnya tentang pustaka ini tersedia [nanti dalam dokumennya](#FixedPoint).

#### Variabel {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

Untuk menghindari kasus pembagian dengan nol, ada jumlah minimum dari token likuiditas yang selalu ada (tetapi dimiliki oleh akun kosong). Jumlah itu adalah **MINIMUM_LIQUIDITY**, seribu.

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

Ini adalah pemilih ABI untuk fungsi transfer ERC-20. Digunakan untuk mentransfer token ERC-20 dalam akun kedua token.

```solidity
    address public factory;
```

Ini adalah kontrak pabrik yang membuat pool. Setiap pool adalah bursa antara dua token ERC-20, pabriknya adalah titik pusat yang menghubungkan semua pool.

```solidity
    address public token0;
    address public token1;
```

Ada alamat kontrak untuk kedua jenis token ERC-20 yang dapat dipertukarkan dalam pool.

```solidity
    uint112 private reserve0;           // uses single storage slot, accessible via getReserves
    uint112 private reserve1;           // uses single storage slot, accessible via getReserves
```

Cadangan yang dimiliki pool untuk setiap jenis token. Kami menganggap bahwa keduanya menyatakan jumlah nilai yang sama, dan oleh karena itu setiap token0 bernilai sama dengan reserve1/reserve0 token1.

```solidity
    uint32  private blockTimestampLast; // uses single storage slot, accessible via getReserves
```

Stempel waktu untuk blok terakhir tempat terjadinya bursa, yang digunakan untuk menelusuri nilai tukar di sepanjang waktu.

Salah satu dari pengeluaran gas terbesar dari kontrak Ethereum adalah penyimpanan, yang tetap ada dari satu panggilan kontrak ke panggilan lainnya. Setiap sel penyimpanan memiliki panjang 256 bita. So three variables, reserve0, reserve1, and blockTimestampLast, are allocated in such a way a single storage value can include all three of them (112+112+32=256).

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

Variabel-variabel tersebut menampung biaya kumulatif untuk setiap token (masing-masing berkaitan satu sama lain). Variabel-variabel tersebut dapat digunakan untuk menghitung rata-rata nilai tukar selama satu periode waktu.

```solidity
    uint public kLast; // reserve0 * reserve1, as of immediately after the most recent liquidity event
```

Cara bursa pasangan menentukan nilai tukar antara token0 dan token1 adalah dengan menjaga beberapa dari dua cadangan bernilai tetap selama perdagangan berlangsung. `kLast` adalah nilai ini. Nilainya berubah ketika penyedia likuiditas menyetor atau menarik token, dan nilainya bertambah sedikit karena 0,3% biaya pasar.

Berikut adalah contoh sederhana. Perhatikan bahwa demi mempermudah, tabel hanya memiliki tiga digit setelah poin desimal, dan kita mengabaikan 0,3% biaya perdagangan sehingga jumlahnya tidak akurat.

| Aksi                                              |  reserve0 |  reserve1 | reserve0 \* reserve1 | Rata-rata nilai tukar (token1 / token0) |
| ------------------------------------------------- | --------: | --------: | -------------------: | --------------------------------------- |
| Pengaturan awal                                   | 1.000,000 | 1.000,000 |            1.000.000 |                                         |
| Pedagang A menukar 50 token0 untuk 47,619 token1  | 1.050,000 |   952,381 |            1.000.000 | 0,952                                   |
| Pedagang B menukar 10 token0 untuk 8,984 token1   | 1.060,000 |   943,396 |            1.000.000 | 0,898                                   |
| Pedagang C menukar 40 token0 untuk 34,305 token1  | 1.100,000 |   909,090 |            1.000.000 | 0,858                                   |
| Pedangan D menukar 100 token1 untuk 109,01 token0 |   990,990 | 1.009,090 |            1.000.000 | 0,917                                   |
| Pedagang E menukar 10 token0 untuk 10,079 token1  | 1.000,990 |   999,010 |            1.000.000 | 1,008                                   |

Karena pedagang menyediakan lebih banyak token0, nilai relatif token1 meningkat, dan sebaliknya, didasarkan pada persediaan dan permintaan.

#### Penguncian {#pair-lock}

```solidity
    uint private unlocked = 1;
```

Ada kelas kerentanan keamanan yang didasarkan pada [penyalahgunaan masuk kembali](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14). Uniswap perlu mentransfer token ERC-20 arbitrari, yang berarti memanggil kontrak ERC-20 yang dapat berusaha menyalahgunakan pasar Uniswap yang memanggilnya. Dengan memiliki variabel-variabel `terbuka` sebagai bagian dari kontrak, kita dapat mencegah fungsi dipanggil ketika variabel-variabel dijalankan (dalam transaksi yang sama).

```solidity
    modifier lock() {
```

Fungsi ini adalah [pemodifikasi](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers), fungsi yang memperbesar nilai fungsi normal untuk mengubah perilakunya dengan beberapa cara.

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

Jika `terbuka` sama dengan satu, tetapkan menjadi nol. Jika bernilai nol, balikkan panggilannya, buat menjadi gagal.

```solidity
        _;
```

Dalam pemodifikasi `_;` adalah panggilan fungsi asli (dengan semua parameternya). Di sini, artinya panggilan fungsi hanya terjadi jika `terbuka` adalah satu ketika dipanggil, dan ketika menjalankan nilai `terbuka` adalah nol.

```solidity
        unlocked = 1;
    }
```

Setelah fungsi utama kembali, lepaskan pengunciannya.

#### Fungsi lainnya {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

Fungsi ini menyediakan pemanggil dengan status bursa saat ini. Perhatikan bahwa fungsi Solidity [dapat mengembalikan beberapa nilai](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values).

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

Fungsi internal ini mentransfer sejumlah token ERC20 dari bursa ke orang lain. `SELECTOR` specifies that the function we are calling is `transfer(address,uint)` (see definition above).

Untuk menghindari keharusan mengimpor antarmuka untuk fungsi token, kami "secara manual" melakukan panggilan dengan menggunakan salah satu [fungsi ABI](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions).

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

Ada dua cara di mana panggilan transfer ERC-20 dapat melaporkan kegagalan:

1. Balikkan. If a call to an external contract reverts, then the boolean return value is `false`
2. Berakhir secara normal tetapi melaporkan kegagalan. Dalam kasus ini, penyangga nilai pengembalian memiliki panjang bukan nol, dan ketika dibaca sandinya sebagai nilai boolean, itu `salah`

Jika salah satu kondisi ini terjadi, balikkan.

#### Aksi {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

Kedua aksi ini dipancarkan ketika penyedia likuiditas menyetor likuiditas (`Cetak`) atau menariknya (`Bakar`). Dalam salah satu kasus, jumlah token0 dan token1 yang disetor atau ditarik adalah bagian dari aksi, serta identitas akun yang memanggil kita (`pengirim`). Dalam kasus penarikan, aksi juga mencakup target yang menerima token (`ke`), yang mungkin tidak sama dengan pengirim.

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

Aksi ini dipancarkan ketika pedagang menukar satu token dengan token lainnya. Sekali lagi, pengirim dan tujuannya mungkin tidak sama. Setiap token mungkin dikirim ke bursa, atau diterima dari bursa.

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

Akhirnya, `Sinkronisasi` dipancarkan setiap kali token ditambahkan atau ditarik, terlepas dari alasannya, untuk menyediakan informasi cadangan terkini (dan oleh karena itu berupa nilai tukar).

#### Fungsi Pengaturan {#pair-setup}

Fungsi ini seharusnya dipanggil setelah bursa pasangan baru diatur.

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

Konstruktor memastikan kita akan terus menelusuri alamat dari pabrik yang membuat pasangan. Informasi ini diperlukan untuk `menginisialisasi` dan untuk biaya pabrik (jika ada)

```solidity
    // called once by the factory at time of deployment
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // sufficient check
        token0 = _token0;
        token1 = _token1;
    }
```

Fungsi ini membuat pabrik (dan hanya pabrik) dapat menentukan kedua token ERC-20 yang akan dipertukarkan oleh pasangan ini.

#### Fungsi Pembaruan Internal {#pair-update-internal}

##### \_update

```solidity
    // update reserves and, on the first call per block, price accumulators
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

Fungsi ini dipanggil setiap kali token disetor atau ditarik.

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

If either balance0 or balance1 (uint256) is higher than uint112(-1) (=2^112-1) (so it overflows & wraps back to 0 when converted to uint112) refuse to continue the \_update to prevent overflows. With a normal token that can be subdivided into 10^18 units, this means each exchange is limited to about 5.1\*10^15 of each tokens. Sejauh ini, itu bukanlah masalah.

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // overflow is desired
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

Jika waktu berlalu bukan nol, artinya kita adalah transaksi bursa pertama di blok ini. Dalam kasus ini, kita perlu memperbarui pengumpul biaya.

```solidity
            // * never overflows, and + overflow is desired
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

Setiap pengumpul biaya diperbarui dengan biaya terkini (cadangan dari token lain/cadangan dari token ini) dikalikan dengan waktu yang berlalu dalam detik. Untuk mendapatkan harga rata-rata, Anda membaca harga kumulatif adalah dua poin dalam sekali waktu, dan membaginya dengan perbedaan waktu di antaranya. Contohnya, asumsikan urutan aksi ini:

| Aksi                                                                 |  reserve0 |  reserve1 | stempel waktu | Nilai tukar marginal (reserve1 / reserve0) |       price0CumulativeLast |
| -------------------------------------------------------------------- | --------: | --------: | ------------- | -----------------------------------------: | -------------------------: |
| Pengaturan awal                                                      | 1.000,000 | 1.000,000 | 5.000         |                                      1,000 |                          0 |
| Pedagang A menyetor 50 token0 dan mendapatkan kembali 47,619 token1  | 1.050,000 |   952,381 | 5.020         |                                      0,907 |                         20 |
| Pedagang B menyetor 10 token0 dan mendapatkan kembali 8,984 token1   | 1.060,000 |   943,396 | 5.030         |                                      0,890 |       20+10\*0,907 = 29,07 |
| Pedagang C menyetor 40 token0 dan mendapatkan kembali 34,305 token1  | 1.100,000 |   909,090 | 5.100         |                                      0,826 |    29,07+70\*0,890 = 91,37 |
| Pedagang D menyetor 100 token1 dan mendapatkan kembali 109,01 token0 |   990,990 | 1.009,090 | 5.110         |                                      1,018 |    91,37+10\*0,826 = 99,63 |
| Pedagang E menyetor 10 token0 dan mendapatkan kembali 10,079 token1  | 1.000,990 |   999,010 | 5.150         |                                      0,998 | 99,63+40\*1,1018 = 143,702 |

Anggaplah kita ingin menghitung harga rata-rata dari **Token0** di antara stempel waktu 5.030 dan 5.150. Perbedaan dalam nilai dari `price0Cumulative` adalah 143,702-29,07=114,632. Ini adalah rata-rata secara keseluruhan dua menit (120 detik). Jadi, harga rata-ratanya adalah 114,632/120 = 0,955.

Perhitungan harga ini merupakan alasan kita perlu mengetahui ukuran cadangan lamanya.

```solidity
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }
```

Akhirnya, perbarui variabel global dan pancarkan aksi `Sinkronisasi`.

##### \_mintFee

```solidity
    // if fee is on, mint liquidity equivalent to 1/6th of the growth in sqrt(k)
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

Dalam Uniswap 2.0, pedagang membayar 0,30% biaya untuk menggunakan pasar. Sebagian besar biaya itu (0,25% dari perdagangan) selalu beralih ke penyedia likuiditas. Sisa 0,05% dapat beralih ke penyedia likuiditas atau ke alamat yang ditentukan oleh pabrik sebagai biaya protokol, yang membayar Uniswap untuk upaya pengembangan mereka.

Untuk mengurangi perhitungan (dan oleh karena itu biaya gas), biaya ini hanya dihitung ketika likuiditas ditambahkan atau dihapuskan dari pool, dibandingkan pada setiap transaksi.

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

Baca biaya tujuan pabrik. Jika nilainya nol, maka tidak ada biaya protokol dan tidak perlu menghitung biaya tersebut.

```solidity
        uint _kLast = kLast; // gas savings
```

Variabel status `kLast` terletak dalam penyimpanan, sehingga akan memiliki nilai di antara panggilan kontrak yang berbeda. Akses ke penyimpanan jauh lebih mahal dibandingkan akses ke memori tidak stabil yang dirilis ketika panggilan fungsi kontrak berakhir, sehingga kita menggunakan variabel internal untuk menghemat gas.

```solidity
        if (feeOn) {
            if (_kLast != 0) {
```

Para penyedia likuiditas mendapatkan potongan mereka cukup dengan kenaikan token likuiditas mereka. Namun, biaya protokol memerlukan token likuiditas baru untuk dicetak dan disediakan ke alamat `feeTo`.

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
```

Jika ada likuiditas baru untuk mengumpulkan biaya protokol. Anda dapat melihat fungsi akar pangkat [nanti dalam artikel ini](#Math)

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

Perhitungan biaya yang rumit ini dijelaskan dalam [laporan resmi](https://uniswap.org/whitepaper.pdf) pada halaman 5. Kita mengetahui bahwa antara waktu `kLast` dihitung dan saat ini tidak ada likuiditas yang ditambahkan atau dihapus (karena kita menjalankan perhitungan ini setiap kali likuiditas ditambahkan atau dikurangi, sebelum benar-benar berubah), sehingga perubahan mana pun dalam `reserve0 * reserve1` harus berasal dari biaya transaksi (tanpa biaya tersebut, kita akan membuat `reserve0 * reserve1` menjadi konstan).

```solidity
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
```

Gunakan fungsi `UniswapV2ERC20._mint` untuk benar-benar membuat token-token likuiditas tambahan dan tugaskan mereka ke `feeTo`.

```solidity
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }
```

Jika tidak ada biaya, tetapkan `kLast` menjadi nol (jika belum menjadi nol). Ketika kontrak ini ditulis terdapat [fitur pengembalian dana gas](https://eips.ethereum.org/EIPS/eip-3298) yang mendorong kontrak untuk mengurangi ukuran keseluruhan status Ethereum dengan mengosongkan penyimpanan yang tidak diperlukan. Kode ini mendapatkan pengembalian dana tersebut jika memungkinkan.

#### Fungsi yang Dapat Diakses secara Eksternal {#pair-external}

Perhatikan bahwa ketika transaksi atau kontrak mana pun _dapat_ memanggil fungsi-fungsi ini, fungsi-fungsi tersebut dirancang untuk dipanggil dari kontrak perifer. Jika Anda memanggil fungsi-fungsi tersebut secara langsung, Anda tidak akan dapat mencurangi bursa pasangan, tetapi Anda dapat kehilangan nilai karena melakukan kesalahan.

##### cetak

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function mint(address to) external lock returns (uint liquidity) {
```

Fungsi ini dipanggil ketika penyedia likuiditas menambahkan likuiditas ke pool. Fungsi ini mencetak token likuiditas tambahan sebagai imbalan. Fungsi ini seharusnya dipanggil dari [kontrak perifer](#UniswapV2Router02) yang memanggilnya setelah menambahkan likuiditas dalam transaksi yang sama (sehingga tidak seorang pun akan dapat mengirimkan transaksi yang mengklaim likuiditas baru sebelum pemilik yang sah).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
```

Inilah cara membaca hasil dari fungsi Solidity yang mengembalikan beberapa nilai. Kita membuang nilai terakhir yang dikembalikan, stempel waktu blok, karena kita tidak memerlukannya.

```solidity
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);
```

Dapatkan saldo saat ini dan lihat seberapa banyak yang ditambahkan untuk setiap jenis token.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
```

Hitung biaya protokol yang akan dikumpulkan, jika ada, dan cetak token likuiditas yang sesuai. Karena parameter untuk `_mintFee` adalah nilai cadangan lama, biaya dihitung secara akurat hanya didasarkan pada perubahan pool karena biaya.

```solidity
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // permanently lock the first MINIMUM_LIQUIDITY tokens
```

Jika ini adalah setoran pertama, buat token-token `MINIMUM_LIQUIDITY` dan kirimkan ke alamat nol untuk membukanya. Token-token tersebut tidak pernah dapat ditebus, artinya pool tidak akan pernah dikosongkan seluruhnya (menghindarkan kita dari pembagian dengan nol di beberapa tempat). Nilai dari `MINIMUM_LIQUIDITY` adalah seribu, yang mempertimbangkan sebagian besar ERC-20 dibagi lagi menjadi unit-unit dari token ke 10^-18, seperti ETH dibagi menjadi wei, adalah 10^-15 untuk nilai dari token tunggal. Bukan biaya yang besar.

Pada saat setoran pertama, kita tidak mengetahui nilai relatif dari kedua token, sehingga kita hanya mengalikan jumlahnya dan mengambil akar pangkat, dengan asumsi bahwa setoran menyediakan nilai yang sama dalam kedua token.

Kita dapat mempercayainya karena diperhatikan penyetor untuk menyediakan nilai yang sama, untuk menghindari kehilangan nilai terhadap arbitrase. Anggap bahwa nilai dari kedua token sama, tetapi penyetor kita menyetor empat kali **Token1** yang lebih banyak dari **Token0**. Pedagang dapat menggunakan fakta bahwa bursa pasangan menganggap **Token0** lebih berharga untuk diesktrak nilainya.

| Aksi                                                                    | reserve0 | reserve1 | reserve0 \* reserve1 | Nilai dari pool (reserve0 + reserve1) |
| ----------------------------------------------------------------------- | -------: | -------: | -------------------: | ------------------------------------: |
| Pengaturan awal                                                         |        8 |       32 |                  256 |                                    40 |
| Pedagang menyetor 8 token **Token0**, mendapatkan kembali 16 **Token1** |       16 |       16 |                  256 |                                    32 |

Seperti yang Anda lihat, pedagang mendapatkan 8 token tambahan, yang didapatkan dari pengurangan nilai pool, yang merugikan penyetor yang memilikinya.

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

Dengan setiap setoran berikutnya, kita telah mengetahui nilai tukar antara kedua aset, dan kita mengharapkan penyedia likuiditas untuk memberikan nilai yang sama pada kedua aset. Jika tidak, kita memberikan token likuiditas didasarkan pada nilai yang lebih kecil yang mereka berikan sebagai hukuman.

Baik merupakan setoran awal maupun setoran berikutnya, jumlah token likuiditas yang kita sediakan sama dengan akar kuadrat dari perubahan dalam `reserve0*reserve1` dan nilai token likuiditas tidak berubah (kecuali jika kita mendapatkan setoran yang tidak memiliki nilai yang sama untuk kedua jenis token, yang dalam kasus ini "denda" dibagikan). Berikut adalah contoh lain dengan dua token yang memiliki nilai sama, dengan tiga setoran yang baik dan satu setoran yang buruk (setoran hanya dari satu jenis token, sehingga tidak menghasilkan token likuiditas mana pun).

| Aksi                             | reserve0 | reserve1 | reserve0 \* reserve1 | Nilai pool (reserve0 + reserve1) | Token likuiditas yang dicetak untuk setoran ini | Total token likuiditas | nilai dari setiap token likuiditas |
| -------------------------------- | -------: | -------: | -------------------: | -------------------------------: | ----------------------------------------------: | ---------------------: | ---------------------------------: |
| Pengaturan awal                  |    8,000 |    8,000 |                   64 |                           16,000 |                                               8 |                      8 |                              2,000 |
| Menyetor empat dari setiap jenis |   12,000 |   12,000 |                  144 |                           24,000 |                                               4 |                     12 |                              2,000 |
| Menyetor dua dari setiap jenis   |   14,000 |   14,000 |                  196 |                           28,000 |                                               2 |                     14 |                              2,000 |
| Nilai setoran tidak sama         |   18,000 |   14,000 |                  252 |                           32,000 |                                               0 |                     14 |                             ~2,286 |
| Setelah arbitrase                |  ~15,874 |  ~15,874 |                  252 |                          ~31,748 |                                               0 |                     14 |                             ~2,267 |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

Gunakan fungsi `UniswapV2ERC20._mint` untuk benar-benar membuat token likuiditas tambahan dan memberikannya ke akun yang benar.

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date
        emit Mint(msg.sender, amount0, amount1);
    }
```

Perbarui variabel status (`reserve0`, `reserve1`, dan jika diperlukan `kLast`) dan pancarkan aksi yang sesuai.

##### burn

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

Fungsi ini dipanggil ketika likuiditas ditarik dan token likuiditas yang sesuai harus dibakar. Selain itu, seharusnya dipanggil [dari akun perifer](#UniswapV2Router02).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
        address _token0 = token0;                                // gas savings
        address _token1 = token1;                                // gas savings
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

Kontrak perifer mentransfer likuiditas yang akan dibakar ke kontrak ini sebelum panggilan. Dengan cara itu, kita mengetahui seberapa banyak likuiditas yang akan dibakar, dan kita dapat memastikan telah dibakar.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        amount0 = liquidity.mul(balance0) / _totalSupply; // using balances ensures pro-rata distribution
        amount1 = liquidity.mul(balance1) / _totalSupply; // using balances ensures pro-rata distribution
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
```

Penyedia likuiditas menerima nilai yang sama dari kedua token. Dengan cara ini, kita tidak mengubah nilai tukar.

```solidity
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date
        emit Burn(msg.sender, amount0, amount1, to);
    }

```

Selebihnya dari fungsi `bakar` adalah gambar cermin dari fungsi `cetak` di atas.

##### menukar

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

Fungsi ini juga diperuntukkan untuk dipanggil dari [kontrak perifer](#UniswapV2Router02).

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // scope for _token{0,1}, avoids stack too deep errors
```

Variabel lokal dapat disimpan dalam memori atau, jika tidak ada banyak ruang penyimpanan, secara langsung pada tumpukan. Jika kita dapat membatasi jumlahnya, sehingga kita akan menggunakan tumpukan, kita menggunakan lebih sedikit gas. Untuk rincian selengkapnya, lihat [laporan resmi kuning, spesifikasi Ethereum formal](https://ethereum.github.io/yellowpaper/paper.pdf), hal. 26, persamaan 298.

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // optimistically transfer tokens
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // optimistically transfer tokens
```

Transfer ini bersifat optimistik, karena kita mentransfer sebelum kita yakin bahwa semua kondisi terpenuhi. Ini OKE di Ethereum karena jika kondisinya tidak terpenuhi nantinya dalam panggilan, kita membalikkannya bersamaan dengan perubahan apa pun yang dibuat.

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

Beri tahu penerima tentang penukaran jika diminta.

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

Dapatkan saldo saat ini. Kontrak perifer mengirimkan kita token sebelum memanggil kita untuk penukarannya. Mempermudah kontrak dalam memeriksa tidak sedang dicurangi, pemeriksaan yang _harus_ terjadi dalam kontrak inti (karena kita dapat dipanggil oleh entitas selain dari kontrak perifer kita).

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // scope for reserve{0,1}Adjusted, avoids stack too deep errors
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

Ini adalah pemeriksaan kewarasan untuk memastikan kita tidak mengalami kerugian dari penukarannya. Tidak ada situasi di mana penukaran seharusnya mengurangi `reserve0*reserve1`. This is also where we ensure a fee of 0.3% is being sent on the swap; before sanity checking the value of K, we multiply both balances by 1000 subtracted by the amounts multiplied by 3, this means 0.3% (3/1000 = 0.003 = 0.3%) is being deducted from the balance before comparing its K value with the current reserves K value.

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

Perbarui `reserve0` dan `reserve1`, dan jika diperlukan pengumpul harga dan stempel waktu dan pancarkan aksi.

##### Sync or Skim

Saldo asli yang tidak tersinkronisasi dengan cadangan yang dianggap bursa pasangan sebagai miliknya mungkin terjadi. Tidak ada cara untuk menarik token tanpa persetujuan kontrak, tetapi setoran adalah masalah yang berbeda. Suatu akun dapat mentransfer token ke bursa tanpa memanggil `cetak` atau `tukar`.

Dalam kasus ini, ada dua solusi:

- `sinkronisasi`, memperbarui cadangan saldo saat ini
- `skim`, menarik jumlah tambahan. Perhatikan bahwa akun mana pun diizinkan untuk memanggil `skim` karena kita tidak mengetahui pihak yang menyetor token. Informasi ini dipancarkan dalam aksi, tetapi aksi tidak dapat diakses dari rantai blok.

```solidity
    // force balances to match reserves
    function skim(address to) external lock {
        address _token0 = token0; // gas savings
        address _token1 = token1; // gas savings
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }



    // force reserves to match balances
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

Variabel status ini diperlukan untuk menerapkan biaya protokol (lihat [laporan resmi](https://uniswap.org/whitepaper.pdf), hal. 5). Alamat `feeTo` mengumpulkan token likuiditas untuk biaya protokol, dan `feeToSetter` adalah alamat yang diizinkan untuk mengubah `feeTo` ke alamat yang berbeda.

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

Variabel ini menelusuri pasangannya, bursa di antara kedua jenis token.

Yang pertama, `getPair`, adalah pemetaan yang mengenali kontrak bursa pasangan didasarkan pada kedua token ERC-20 yang dipertukarkan. Token-token ERC-20 dikenali oleh alamat kontrak yang menerapkan token-token tersebut, sehingga kunci dan nilainya adalah semua alamat. Untuk mendapatkan alamat dari bursa pasangan sehingga membuat Anda dapat mengonversi dari `tokenA` ke `tokenB`, Anda menggunakan `getPair[<tokenA address>][<tokenB address>]` (atau sebaliknya).

Variabel kedua, `allPairs`, adalah larik yang mencakup semua alamat dari bursa pasangan yang dibuat oleh pabrik ini. Di Ethereum, Anda tidak dapat mengulang konten dari pemetaan, atau mendapatkan daftar semua kunci, sehingga variabel ini satu-satunya cara untuk mengetahui bursa yang dikelola pabrik ini.

Catatan: Alasan Anda tidak dapat mengulang semua kunci dari pemetaan adalah bahwa penyimpanan data kontrak yang _mahal_, sehingga semakin jarang kita menggunakannya maka semakin baik, dan semakin jarang kita mengubahnya maka semakin baik. Anda dapat membuat [pemetaan yang mendukung pengulangan](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol), tetapi memerlukan penyimpanan tambahan untuk daftar kunci. Dalam kebanyakan aplikasi, Anda tidak memerlukannya.

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

Aksi ini dipancarkan ketika suatu bursa pasangan baru dibuat. Mencakup alamat token, alamat bursa pasangan, dan total jumlah bursa yang dikelola oleh pabrik.

```solidity
    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }
```

Satu-satunya hal yang dilakukan oleh konstrukstor adalah menentukan `feeToSetter`. Pabrik memulai tanpa biaya, dan hanya `feeSetter` yang dapat mengubahnya.

```solidity
    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
```

Fungsi ini mengembalikan jumlah bursa pasangan.

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

Ini adalah fungsi utama dari pabrik, untuk membuat bursa pasangan di antara dua token ERC-20. Perhatikan bahwa siapa pun dapat memanggil fungsi ini. Anda tidak memerlukan izin dari Uniswap untuk membuat bursa pasangan baru.

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

Kita menginginkan alamat dari bursa baru yang bersifat deterministik, sehingga dapat dihitung sebelum di luar rantai (dapat bermanfaat untuk [transaksi lapisan ke-2](/developers/docs/scaling/)). Untuk melakukan hal tersebut, kita perlu memiliki urutan alamat token yang konsisten, terlepas dari urutan di mana kita menerimanya, sehingga kita memilahnya di sini.

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // single check is sufficient
```

Pool likuiditas besar lebih baik dari pool likuiditas kecil, karena memiliki harga yang lebih stabil. Kita tidak ingin memiliki jumlah yang lebih banyak dari pool likuiditas tunggal per pasangan token. Jika telah ada bursa, tidak perlu membuat bursa baru untuk pasangan yang sama.

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

Untuk membuat kontrak baru, kita perlu kode yang membuatnya (baik fungsi konstruktor maupun kode yang menulis ke memori kode bita EVM dari kontrak sebenarnya). Secara normal di Solidity, kita hanya menggunakan `addr = new <name of contract>(<constructor parameters>)` dan pengompilasi mengurus segala sesuatunya untuk kita, tetapi untuk memiliki akun kontrak deterministik, kita perlu menggunakan [opcode CREATE2](https://eips.ethereum.org/EIPS/eip-1014). Ketika kode ini ditulis, opcode ini belum didukung oleh Solidity, sehingga kodenya secara manual perlu didapatkan. Ini bukan lagi masalah, karena [Solidity sekarang mendukung CREATE2](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2).

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

Ketika opcode tidak didukung oleh Solidity, kita dapat memanggilnya menggunakan [perakitan sebaris](https://docs.soliditylang.org/en/v0.8.3/assembly.html).

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

Panggil fungsi `inisialisasi` untuk memberitahu bursa baru dua token yang dipertukarkan.

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // populate mapping in the reverse direction
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }
```

Simpan informasi pasangan baru dalam variabel status dan pancarkan aksi untuk memberitahu dunia tentang bursa pasangan barunya.

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

Kedua fungsi ini membuat `feeSetter` dapat mengendalikan penerima biaya (jika ada), dan untuk mengubah `feeSetter` ke alamat baru.

### UniswapV2ERC20.sol {#UniswapV2ERC20}

[Kontrak ini](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol) menerapkan token likuiditas ERC-20. Sama dengan kontrak [ERC-20 OpenWhisk](/developers/tutorials/erc20-annotated-code), sehingga saya hanya akan menjelaskan perbedaannya, fungsionalitas `izin`.

Transaksi di Ethereum membutuhkan ether (ETH), yang sama dengan uang sebenarnya. Jika Anda memiliki token ERC-20, tetapi bukan ETH, Anda tidak dapat mengirim transaksi, sehingga Anda tidak dapat melakukan apa pun dengannya. Satu solusi untuk menghindari masalah ini adalah [transaksi meta](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions). Pemilik token menandatangani transaksi yang membuat seseorang lainnya menarik token di luar rantai dan mengirimnya menggunakan Internet kepada penerima. Penerima, yang memiliki ETH, kemudian mengirim izin atas nama pemilik.

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

Hash ini adalah [pengenal jenis transaksi](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash). Satu-satunya yang kami dukung di sini adalah `Izin` dengan parameter ini.

```solidity
    mapping(address => uint) public nonces;
```

Penerima tidak mungkin memalsukan tanda tangan digital. Namun, tampak remeh untuk mengirim transaksi yang sama dua kali (ini adalah bentuk dari [serangan perulangan](https://wikipedia.org/wiki/Replay_attack)). Untuk mencegahnya, kita menggunakan [nonce](https://wikipedia.org/wiki/Cryptographic_nonce). Jika nonce dari `Izin` yang baru tidak satu kali lebih dari yang terakhir kita gunakan, kita mengganggapnya tidak valid.

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

Ini adalah kode untuk mengambil [pengenal rantai](https://chainid.network/). Menggunakan dialek perakitan EVM yang disebut [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html). Perhatikan bahwa dalam versi Yul saat ini, Anda harus menggunakan `chainid()`, bukan `chainid`.

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

Hitunglah [pemisah domain](https://eips.ethereum.org/EIPS/eip-712#rationale-for-domainseparator) untuk EIP-712.

```solidity
    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
```

Ini adalah fungsi yang menerapkan izin. Fungsi ini menerima field yang relevan sebagai parameter, dan ketiga nilai skalar untuk [tandatangan](https://yos.io/2018/11/16/ethereum-signatures/) (v, r, dan s).

```solidity
        require(deadline >= block.timestamp, 'UniswapV2: EXPIRED');
```

Jangan menerima transaksi setelah tenggat waktu.

```solidity
        bytes32 digest = keccak256(
            abi.encodePacked(
                '\x19\x01',
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))
            )
        );
```

`abi.encodePacked(...)` adalah pesan yang kita harap untuk didapatkan. Kita mengetahui nonce seharusnya, sehingga kita tidak perlu mendapatkannya sebagai parameter

Algoritma tandatangan Ethereum berharap mendapatkan 256 bita untuk ditandatangani, sehingga kita menggunakan fungsi hash `keccak256`.

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

Dari intisari dan tandatangan, kita bisa mendapatkan alamat yang ditandatangani menggunakan [ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/).

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

Jika semuanya OKE, anggaplah ini sebagai [persetujuan ERC-20](https://eips.ethereum.org/EIPS/eip-20#approve).

## Kontrak Perifer {#periphery-contracts}

Kontrak perifer adalah API (antarmuka program aplikasi) untuk Uniswap. Kontrak ini tersedia untuk panggilan eksternal, baik dari kontrak lain maupun aplikasi terdesentralisasi. Anda dapat memanggil kontrak inti secara langsung, tetapi lebih rumit dan Anda mungkin kehilangan nilai jika Anda membuat kesalahan. Kontrak-kontrak inti hanya memuat tes untuk memastikan tidak dicurangi, bukan pemeriksaan kewarasan untuk seseorang lainnya. Kontrak-kontrak itu terdapat dalam perifer, sehingga dapat diperbarui sesuai keperluan.

### UniswapV2Router01.sol {#UniswapV2Router01}

[Kontrak ini](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol) memiliki masalah, dan [seharusnya tidak lagi digunakan](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01). Untungnya, kontrak perifer bersifat tanpa status dan tidak menampung aset apa pun, sehingga mudah untuk mengusangkannya dan menyarankan orang-orang menggunakan penggantinya, `UniswapV2Router02`, sebagai gantinya.

### UniswapV2Router02.sol {#UniswapV2Router02}

Dalam kebanyakan kasus, Anda akan menggunakan Uniswap melalui [kontrak ini](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol). Anda dapat melihat cara menggunakannya [di sini](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02).

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

Kebanyakan dari kontrak-kontrak ini, kita telah menemuinya sebelumnya, atau cukup jelas. Satu-satunya pengecualian adalah `IWETH.sol`. Uniswap v2 membuat perdagangan untuk pasangan apa pun dari token ERC-20, tetapi ether (ETH) sendiri bukanlah token ERC-20. Mendahului standar dan ditransfer melalui mekanisme unik. Untuk mengaktifkan penggunaan ETH dalam kontrak yang menerapkan token ERC-20, orang-orang menemukan kontrak [wrapped ether (WETH)](https://weth.tkn.eth.limo/). Anda mengirimkan ETH ke kontrak ini, dan mencetaknya untuk Anda dalam jumlah WETH yang setara. Atau, Anda dapat membakar WETH, dan mendapatkan kembali ETH.

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

Perute perlu mengetahui pabrik yang akan digunakan, dan untuk transaksi yang memerlukan WETH, kontrak WETH yang akan digunakan. Nilai-nilai ini [tidak dapat diubah](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables), artinya hanya dapat ditetapkan di konstruktor. Memberikan kepercayaan diri kepada pengguna bahwa tidak seorang pun akan dapat mengubahnya menjadi kontrak yang kurang jujur.

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

Pemodifikasi ini memastikan transaksi-transaksi yang dibatasi waktu ("lakukan X sebelum waktu Y jika Anda bisa") tidak terjadi setelah batas waktu mereka.

```solidity
    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }
```

Konstruktor cukup menetapkan variabel statu yang tidak dapat diubah.

```solidity
    receive() external payable {
        assert(msg.sender == WETH); // only accept ETH via fallback from the WETH contract
    }
```

Fungsi ini dipanggil ketika kita menebus token dari kontrak WETH kembali menjadi ETH. Hanya kontrak WETH yang kita gunakan diizinkan untuk melakukan penebusan tersebut.

#### Menambah Likuiditas {#add-liquidity}

Fungsi ini menambahkan token ke bursa pasangan, yang meningkatkan pool likuiditas.

```solidity

    // **** ADD LIQUIDITY ****
    function _addLiquidity(
```

Fungsi ini digunakan untuk menghitung jumlah token A dan B yang seharusnya disetor ke bursa pasangan.

```solidity
        address tokenA,
        address tokenB,
```

Ini adalah alamat kontrak token ERC-20.

```solidity
        uint amountADesired,
        uint amountBDesired,
```

Ini adalah jumlah yang ingin disetor oleh penyedia likuiditas. Selain itu, jumlah tersebut adalah jumlah maksimum A dan B yang akan disetor.

```solidity
        uint amountAMin,
        uint amountBMin
```

Ini adalah jumlah minimum yang dapat diterima untuk disetor. Jika transaksi tidak dapat terjadi dengan jumlah ini atau lebih, balikkan. Jika Anda tidak menginginkan fitur ini, cukup tentukan nol.

Penyedia likuiditas menentukan jumlah minimum, biasanya, karena mereka ingin membatasi transaksi dalam nilai tukar yang dekat dengan nilai tukar saat ini. Jika nilai tukar berfluktuasi terlalu banyak, itu dapat berarti berita mengubah nilai dasarnya, dan ingin memutuskan secara manual hal yang harus dilakukan.

Contohnya, bayangkan kasus di mana nilai tukar adalah satu banding satu dan penyedia likuiditas menentukan nilai-nilai ini:

| Parameter      | Nilai |
| -------------- | ----: |
| amountADesired |  1000 |
| amountBDesired |  1000 |
| amountAMin     |   900 |
| amountBMin     |   800 |

Selama nilai tukar tetap berada antara 0,9 dan 1,25 maka transaksi terjadi. Jika nilai tukar keluar dari kisaran itu, transaksi dibatalkan.

Alasan untuk pencegahan ini adalah transaksi yang tidak terjadi dengan segera, Anda mengirimkannya dan pada akhirnya penambang akan memasukkannya dalam blok (kecuali jika harga gas Anda sangat rendah, dalam kasus ini Anda perlu mengirim transaksi lainnya dengan nonce yang sama dan harga gas yang lebih tinggi untuk menimpanya). Anda tidak dapat mengendalikan hal yang terjadi selama interval di antara pengiriman dan pemasukan.

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

Fungsi mengembalikan jumlah yang seharusnya disetor penyedia likuiditas agar memiliki rasio setara dengan rasio sekarang di antara cadangan.

```solidity
        // create the pair if it doesn't exist yet
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
```

Jika belum ada bursa untuk pasangan token ini, buatlah.

```solidity
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
```

Dapatkan cadangan saat ini dalam pasangan.

```solidity
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
```

Jika cadangan saat ini kosong, maka ini adalah bursa pasangan baru. Jumlah yang akan disetor seharusnya sama persis dengan jumlah yang ingin disediakan oleh penyedia likuiditas.

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

Jika kita perlu melihat berapa jumlahnya, kita mendapatkan jumlah optimal menggunakan [fungsi ini](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35). Kita ingin rasionya sama seperti cadangan saat ini.

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

Jika `amountBOptimal` lebih kecil dari jumlah yang ingin disetor penyedia likuiditas, artinya token B lebih berharga saat ini daripada yang dipikirkan penyetor likuiditas, sehingga diperlukan jumlah yang lebih kecil.

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

Jika jumlah optimal B lebih dari jumlah B yang diinginkan, artinya token B kurang berharga saat ini daripada yang dipikirkan penyetor likuiditas, sehingga diperlukan jumlah yang lebih tinggi. Namun, jumlah yang diinginkan adalah maksimum, sehingga kita tidak dapat melakukan hal tersebut. Sebagai gantinya, kita menghitung jumlah optimal token A untuk jumlah token B yang diinginkan.

Dengan menggabungkannya, kita mendapatkan grafik ini. Asumsikan Anda mencoba menyetor seribu token A (garis biru) dan seribu token B (garis merah). Sumbu x adalah nilai tukar, A/B. Jika x=1, mereka sama dalam nilai dan Anda menyetorkan masing-masing seribu. Jika x=2, nilai A dua kali nilai B (Anda mendapatkan dua token B untuk setiap token A) sehingga Anda menyetor seribu token B, tetapi hanya 500 token A. Jika x=0,5, situasi terbalik, seribu token A dan lima ratus token B.

![Grafik](liquidityProviderDeposit.png)

```solidity
            }
        }
    }
```

Anda dapat menyetor likuiditas secara langsung ke dalam kontrak inti (menggunakan [UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110)), tetapi kontrak inti hanya memeriksa apakah tidak dicurangi diri sendiri, sehingga Anda berisiko kehilangan nilai jika nilai tukar berubah pada saat antara waktu Anda mengirimkan transaksi Anda dan waktu pelaksanaan. Jika Anda menggunakan kontrak perifer, kontrak tersebut menggambarkan jumlah yang seharusnya Anda setor dan menyetornya dengan segera, sehingga nilai tukar tidak berubah dan Anda tidak kehilangan apa pun.

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

Fungsi ini dapat dipanggil melalui transaksi untuk menyetor likuiditas. Kebanyakan parameter sama seperti dalam `_addLiquidity` di atas, dengan dua pengecualian:

. `ke` adalah alamat yang mendapatkan token likuiditas baru yang dicetak untuk menunjukkan porsi pool penyedia likuiditas . `tenggat waktu` adalah batas waktu transaksi

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

Kita menghitung jumlah yang benar-benar disetor dan kemudian menemukan alamat pool likuditas. Untuk menghemat gas, kita tidak melakukan hal tersebut dengan meminta pabrik, tetapi menggunakan fungsi pustaka `pairFor` (lihat di bawah di pustaka)

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

Transfer jumlah token yang benar dari pengguna ke bursa pasangan.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
    }
```

Sebagai hasilnya, berikan alamat `ke` token likuiditas untuk kepemilikan sebagian dari pool. Fungsi `cetak` dari kontrak inti melihat seberapa banyak token tambahan yang dimiliki (dibandingkan dengan yang dimiliki sejak terakhir kali likuiditas berubah) dan mencetak likuiditas sesuai dengan itu.

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

Ketika penyedia likuiditas ingin menyediakan likuiditas ke bursa pasangan Token/ETH, ada beberapa perbedaan. Kontrak menangani pembungkusan ETH untuk penyedia likuiditas. Tidak perlu menentukan seberapa banyak ETH yang ingin disetor oleh pengguna, karena pengguna hanya mengirimkannya dengan transaksi (jumlahnya tersedia dalam `msg.value`).

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

Untuk menyetor ETH, kontrak pertama-tama dibungkus ke WETH dan kemudian mentransfer WETH ke bursa pasangan. Perhatikan bahwa transfer dibungkus dalam `assert`. Artinya jika transfer gagal, panggilan kontrak ini juga gagal, dan oleh karena itu pembungkusan tidak benar-benar terjadi.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // refund dust eth, if any
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }
```

Pengguna telah mengirimkan ETH kepada kami, sehingga jika ada sisa ekstra (karena token lainnya kurang berharga daripada yang dipikirkan pengguna), kita perlu mengajukan pengembalian dana.

#### Menghapus Likuiditas {#remove-liquidity}

Fungsi ini akan menghapus likuiditas dan membayar kembali penyedia likuiditas.

```solidity
    // **** REMOVE LIQUIDITY ****
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

Kasus paling sederhana dari menghapus likuiditas. Ada jumlah minimum dari setiap token yang disetujui penyedia likuditas untuk diterima, dan harus terjadi sebelum tenggat waktu.

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // send liquidity to pair
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

Fungsi `bakar` kontrak inti menangani pembayaran kembali token ke pengguna.

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

Ketika fungsi mengembalikan beberapa nilai, tetapi kita hanya tertarik dengan beberapa dari nilai tersebut, inilah cara kita mendapatkan nilai-nilai tersebut. Bagaimana pun juga, lebih murah dalam penggunaan gas daripada membaca nilai dan tidak pernah menggunakannya.

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

Terjemahkan jumlah dari cara kontrak inti mengembalikannya (alamat token yang lebih rendah terlebih dahulu) hingga cara pengguna mengharapkannya (sesuai dengan `tokenA` dan `tokenB`).

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

Ini OKE untuk melakukan transfer terlebih dahulu dan kemudian memverifikasi ini sah, karena jika tidak demikian, kita akan membalikkan semua perubahan statusnya.

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

Hapus likuiditas untuk ETH hampir sama, kecuali kita menerima token WETH dan kemudian menebusnya dengan ETH untuk memberikannya kembali ke penyedia likuiditas.

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

Fungsi ini menyampaikan transaksi meta untuk memungkinkan pengguna tanpa ether menarik dari pool, dengan menggunakan [mekanisme izin](#UniswapV2ERC20).

```solidity

    // **** REMOVE LIQUIDITY (supporting fee-on-transfer tokens) ****
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

Fungsi ini dapat digunakan untuk token yang memiliki biaya transfer atau penyimpanan. Ketika token memiliki biaya demikian, kita tidak dapat mengandalkan fungsi `removeLiquidity` untuk memberitahu kita seberapa banyak dari token yang kita dapatkan kembali, sehingga kita perlu menariknya terlebih dahulu dan kemudian mendapatkan saldonya.

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

Fungsi terakhir menggabungkan biaya penyimpanan dengan transaksi meta.

#### Perdagangkan {#trade}

```solidity
    // **** SWAP ****
    // requires the initial amount to have already been sent to the first pair
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

Fungsi melakukan pemrosesan internal yang diperlukan untuk fungsi yang terpapar ke pedagang.

```solidity
        for (uint i; i < path.length - 1; i++) {
```

Ketika saya menulisnya, terdapat [388.160 token ERC-20](https://etherscan.io/tokens). Jika ada satu bursa pasangan untuk setiap pasangan token, maka akan berjumlah lebih dari 150 miliar bursa pasangan. Keseluruhan rantai, pada saat ini, [hanya memiliki 0,1% akun dari jumlah tersebut](https://etherscan.io/chart/address). Sebagai gantinya, fungsi penukaran mendukung konsep jalur. Pedagang dapat mempertukarkan A dengan B, B dengan C, dan C dengan D, sehingga tidak diperlukan bursa pasangan A-D secara langsung.

Harga pada pasar ini cenderung disinkronisasi, karena ketika harga tidak tersinkronisasi, maka membentuk peluang untuk arbitrase. Bayangkan, contohnya, tiga token, A, B, dan C. Ada tiga bursa pasangan, satu bursa untuk setiap pasangan.

1. Situasi awal
2. Pedagang menjual 24,695 token A dan mendapatkan 25,305 token B.
3. Pedagang menjual 24,695 token B untuk 25,305 token C, yang mempertahankan kira-kira 0,61 token B sebagai keuntungan.
4. Lalu, pedagang menjual 24,695 token C untuk 25,305 token A, yang mempertahankan kira-kira 0,61 token C sebagai keuntungan. Pedagang juga memiliki 0,61 token A ekstra (jumlah 25,305 yang didapatkan pedagang, dikurangi investasi sebelumnya sebesar 24,695).

| Langkah | Bursa A-B                   | Bursa B-C                   | Bursa A-C                   |
| ------- | --------------------------- | --------------------------- | --------------------------- |
| 1       | A:1000 B:1050 A/B=1,05      | B:1000 C:1050 B/C=1,05      | A:1050 C:1000 C/A=1,05      |
| 2       | A:1024,695 B:1024,695 A/B=1 | B:1000 C:1050 B/C=1,05      | A:1050 C:1000 C/A=1,05      |
| 3       | A:1024,695 B:1024,695 A/B=1 | B:1024,695 C:1024,695 B/C=1 | A:1050 C:1000 C/A=1,05      |
| 4       | A:1024,695 B:1024,695 A/B=1 | B:1024,695 C:1024,695 B/C=1 | A:1024,695 C:1024,695 C/A=1 |

```solidity
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
```

Dapatkan pasangan yang kita tangani saat ini, pilah pasangan tersebut (untuk digunakan dengan pasangan) dan dapatkan jumlah output yang diharapkan.

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

Dapatkan jumlah keluar yang diharapkan, pilah seperti yang diharapkan melalui cara bursa pasangan.

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

Apakah ini bursa terakhir? Jika demikian, kirim token yang diterima untuk perdagangan ke tujuan. Jika tidak, kirimkan ke bursa pasangan berikutnya.

```solidity

            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

Benar-benar memanggil bursa pasangan untuk menukar token. Kita tidak memerlukan panggilan kembali untuk mengetahui tentang bursanya, sehingga kita tidak perlu mengirim bita apa pun dalam field tersebut.

```solidity
    function swapExactTokensForTokens(
```

Fungsi ini digunakan secara langsung oleh pedagang untuk menukar satu token dengan token lainnya.

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

Parameter ini memuat alamat dari kontrak ERC-20. Seperti dijelaskan di atas, ini adalah larik karena Anda mungkin perlu melalui beberapa bursa pasangan untuk memindahkan aset yang Anda miliki ke aset yang Anda inginkan.

Parameter fungsi dalam solidity dapat disimpan di `memori` atau `calldata`. Jika fungsi adalah titik masuk ke kontrak, yang dapat dipanggil secara langsung dari pengguna (menggunakan transaksi) atau dari kontrak berbeda, maka nilai parameter dapat diambil secara langsung dari panggilan data. Jika fungsi dipanggil secara internal, seperti `_swap` di atas, maka parameter harus disimpan dalam `memori`. Dari perspektif kontrak yang dipanggil, `calldata` hanya untuk dibaca.

Dengan jenis skalar seperti `uint` atau `alamat`, pengompilasi menangani pilihan penyimpanan untuk kita, tetapi dengan larik, yang lebih panjang dan mahal, kita menentukan jenis penyimpanan yang akan digunakan.

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

Hitung jumlah yang akan dibeli dalam setiap penukaran. Jika hasilnya kurang dari jumlah minimum yang ingin diterima oleh pedagang, balikkan transaksinya.

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

Akhirnya, transfer token ERC-20 awal ke akun untuk bursa pasangan pertama dan panggil `_swap`. Ini semua terjadi dalam transaksi yang sama, sehingga bursa pasangan mengetahui bahwa token mana pun yang tidak diharapkan adalah bagian dari transfer ini.

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

Fungsi sebelumnya, `swapTokensForTokens`, membuat pedagang dapat menentukan jumlah persis dari token input yang ingin diberikan dan jumlah minimum dari token output yang ingin diterima sebagai hasilnya. Fungsi ini memang membalikkan penukaran, fungsi ini membuat pedagang dapat menentukan jumlah token output yang diinginkan, dan jumlah maksimum dari token input yang ingin dibayarkan untuk pedagang.

Dalam kedua kasus, pedagang harus memberikan kontrak perifer pertama ini tunjangan agar dapat mentransfer.

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

Keempat varian ini semuanya melibatkan perdagangan antara ETH dan token. Satu-satunya perbedaan adalah kita menerima ETH dari pedagang dan menggunakannya untuk mencetak WETH, atau kita menerima WETH dari bursa terakhir dalam jalur dan membakarnya, mengirimkan kembali ETH yang dihasilkan ke pedagang.

```solidity
    // **** SWAP (supporting fee-on-transfer tokens) ****
    // requires the initial amount to have already been sent to the first pair
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

Karena biaya transfer, kita tidak dapat mengandalkan fungsi `getAmountsOut` untuk memberitahu kita seberapa banyak yang kita dapatkan dari setiap transfer (cara kita melakukannya sebelum memanggil `_swap` yang sebenarnya). Sebagai gantinya, kita harus mentransfer terlebih dahulu dan kemudian melihat berapa sebanyak token yang kita dapatkan kembali.

Catatan: Dalam teori, kita cukup dapat menggunakan fungsi ini alih-alih `_swap`, tetapi dalam kasus tertentu (contohnya, jika transfer dibalikkan karena tunjangan tidak cukup pada akhirnya untuk memenuhi jumlah minimum yang diharuskan) maka akan menyebabkan gas yang lebih banyak. Token-token biaya transfer cukup langka, sehingga sementara kita perlu mengakomodasinya, tidak menjadi keharusan untuk menukar semua token agar menganggap melewati minimal salah satu dari token tersebut.

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

Ini varian-varian yang sama yang digunakan untuk token normal, tetapi memanggil `_swapSupportingFeeOnTransferTokens` sebagai gantinya.

```solidity
    // **** LIBRARY FUNCTIONS ****
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

Fungsi ini hanyalah proksi yang memanggil [fungsi UniswapV2Library](#uniswapV2library).

### UniswapV2Migrator.sol {#UniswapV2Migrator}

Kontrak ini digunakan untuk memindahkan bursa dari v1 yang lama ke v2. Sekarang, karena mereka telah bermigrasi, hal tersebut tidak lagi relevan.

## Pustaka {#libraries}

[Pustaka SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) didokumentasikan dengan baik, sehingga tidak diperlukan untuk mendokumentasikannya di sini.

### Math {#Math}

Pustaka ini memuat beberapa fungsi matematika yang biasanya tidak diperlukan dalam kode Solidity, sehingga fungsi-fungsi ini bukanlah bagian dari bahasa.

```solidity
pragma solidity =0.5.16;

// a library for performing various math operations

library Math {
    function min(uint x, uint y) internal pure returns (uint z) {
        z = x < y ? x : y;
    }

    // babylonian method (https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
```

Mulai dengan x sebagai perkiraan yang lebih tinggi dari akar kuadrat (yang adalah alasan kita perlu menganggap 1-3 sebagai kasus khusus).

```solidity
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
```

Dapatkan perkiraan yang lebih mendekati, rata-rata dari perkiraan sebelumnya dan jumlah yang akar kuadratnya sedang kita coba cari dibagi dengan perkiraan sebelumnya. Ulangi hingga perkiraan baru tidak lebih rendah dari perkiraan yang sudah ada. Untuk mendapatkan rincian selengkapnya, [lihat di sini](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method).

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

Kita seharusnya tidak akan pernah memerlukan akar kuadrat dari nol. Akar kuadrat dari satu, dua, dan tiga kira-kira satu (kita menggunakan bilangan bulat, sehingga kita mengabaikan pecahan).

```solidity
        }
    }
}
```

### Pecahan Poin Tetap (UQ112x112) {#FixedPoint}

Pustaka ini menangani pecahan, yang biasanya bukan bagian dari aritmatika Ethereum. Dilakukan dengan mengodekan angka _x_ sebagai _x\*2^112_. Membuat kita dapat menggunakan opcode penambahan dan pengurangan asli tanpa perubahan.

```solidity
pragma solidity =0.5.16;

// a library for handling binary fixed point numbers (https://wikipedia.org/wiki/Q_(number_format))

// range: [0, 2**112 - 1]
// resolution: 1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112` adalah pengodean untuk satu.

```solidity
    // encode a uint112 as a UQ112x112
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // never overflows
    }
```

Because y is `uint112`, the most it can be is 2^112-1. Angka tersebut masih dapat dikodekan sebagai `UQ112x112`.

```solidity
    // divide a UQ112x112 by a uint112, returning a UQ112x112
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

Jika kita membagi dua nilai `UQ112x112`, hasilnya tidak lagi dikalikan dengan 2^112. Jadi, sebagai gantinya, kita mengambil bilangan bulat sebagai penyebut. Kita perlu menggunakan trik yang serupa untuk melakukan perkalian, tetapi kita tidak perlu melakukan perkalian untuk nilai `UQ112x112`.

### UniswapV2Library {#uniswapV2library}

Pustaka ini hanya digunakan oleh kontrak perifer

```solidity
pragma solidity >=0.5.0;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import "./SafeMath.sol";

library UniswapV2Library {
    using SafeMath for uint;

    // returns sorted token addresses, used to handle return values from pairs sorted in this order
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
```

Pilah kedua token berdasarkan alamat, sehingga kita akan bisa mendapatkan alamat dari bursa pasangan untuk kedua token. Diperlukan karena jika tidak, kita akan memiliki dua kemungkinan, satu kemungkinan untuk parameter A,B, dan kemungkinan lain untuk parameter B,A, yang menghasilkan dua bursa alih-alih satu bursa.

```solidity
    // calculates the CREATE2 address for a pair without making any external calls
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f' // init code hash
            ))));
    }
```

Fungsi ini menghitung alamat dari bursa pasangan untuk kedua token. Kontrak ini dibuat menggunakan [opcode CREATE2](https://eips.ethereum.org/EIPS/eip-1014), sehingga kita dapat menghitung alamat menggunakan algoritma yang sama jika kita mengetahui parameter yang digunakan. Jauh lebih murah daripada meminta pabrik, dan

```solidity
    // fetches and sorts the reserves for a pair
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

Fungsi ini mengembalikan cadangan dari kedua token yang dimiliki bursa pasangan. Perhatikan bahwa fungsi tersebut dapat menerima token-token dalam urutan mana pun, dan memilahnya untuk penggunaan internal.

```solidity
    // given some amount of an asset and pair reserves, returns an equivalent amount of the other asset
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

Fungsi ini memberikan Anda jumlah token B yang akan Anda dapatkan sebagai hasil untuk token A jika tidak ada biaya yang dilibatkan. Perhitungan ini mempertimbangkan bahwa transfernya mengubah nilai tukar.

```solidity
    // given an input amount of an asset and pair reserves, returns the maximum output amount of the other asset
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
```

Fungsi `kutipan` di atas berfungsi sangat baik jika tidak ada biaya untuk menggunakan bursa pasangan. Namun, jika ada biaya bursa 0,3%, jumlah yang benar-benar Anda dapatkan lebih rendah. Fungsi ini menghitung jumlah setelah biaya bursa.

```solidity

        require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }
```

Solidity aslinya tidak menangani pecahan, sehingga kita tidak dapat hanya mengalikan jumlah keluar dengan 0,997. Sebagai gantinya, kita mengalikan pembilang dengan 997 dan penyebut dengan 1000, yang memberikan efek yang sama.

```solidity
    // given an output amount of an asset and pair reserves, returns a required input amount of the other asset
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
        require(amountOut > 0, 'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint numerator = reserveIn.mul(amountOut).mul(1000);
        uint denominator = reserveOut.sub(amountOut).mul(997);
        amountIn = (numerator / denominator).add(1);
    }
```

Fungsi ini kira-kira melakukan hal yang sama, tetapi mendapatkan jumlah output dan menyediakan input.

```solidity

    // performs chained getAmountOut calculations on any number of pairs
    function getAmountsOut(address factory, uint amountIn, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        for (uint i; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
        }
    }

    // performs chained getAmountIn calculations on any number of pairs
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

Kedua fungsi ini menangani pengenalan nilai ketika diperlukan untuk melalui beberapa bursa pasangan.

### Pembantu Transfer {#transfer-helper}

[Pustaka ini](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol) menambahkan pemeriksaan keberhasilan seputar transfer ERC-20 dan Ethereum untuk memperlakukan pembalikan dan nilai `salah` pengembalian dalam cara yang sama.

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.0;

// helper methods for interacting with ERC20 tokens and sending ETH that do not consistently return true/false
library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));

```

Kita dapat memanggil kontrak yang berbeda dalam salah satu dari dua cara:

- Menggunakan definisi antarmuka untuk membuat panggilan fungsi
- Gunakan [antarmuka biner aplikasi (ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html) "secara manual" untuk melakukan panggilan. Hal ini yang diputuskan untuk dilakukan oleh penulis kode.

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

Demi kompatibilitas mundur dengan token yang dibuat sebelum standar ERC-20, panggilan ERC-20 dapat menjadi gagal baik dengan membalikkan (dalam kasus tersebut `success` adalah `false`) atau dengan menjadi sukses dan mengembalikan nilai `false` (dalam kasus tersebut terdapat data output, dan jika Anda mengartikan kode sebagai boolean, Anda mendapatkan `false`).

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

Fungsi ini menerapkan [fungsionalitas transfer ERC-20](https://eips.ethereum.org/EIPS/eip-20#transfer), sehingga akun dapat menghabiskan tunjangan yang disediakan oleh akun berbeda.

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

Fungsi ini menerapkan [fungsionalitas transferFrom ERC-20](https://eips.ethereum.org/EIPS/eip-20#transferfrom), sehingga akun dapat menghabiskan tunjangan yang disediakan oleh akun yang berbeda.

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

Fungsi ini mentransfer ether ke akun. Setiap panggilan ke kontrak yang berbeda dapat mencoba mengirimkan ether. Karena kita sebenarnya tidak perlu memanggil fungsi apa pun, kita tidak mengirim data apa pun dengan panggilan tersebut.

## Kesimpulan {#conclusion}

Ini adalah artikel dengan panjang sekitar 50 halaman. Jika Anda berhasil sampai di sini, selamat! Semoga saat ini Anda telah memahami pertimbangan dalam menulis aplikasi kehidupan nyata (dibandingkan dengan program sampel singkat) dan lebih baik agar dapat menulis kontrak untuk kasus penggunaan Anda sendiri.

Sekarang, lanjutkan dan tulis sesuatu yang berguna dan buat kami takjub.
