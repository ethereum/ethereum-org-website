---
title: "Penelusuran Kontrak Uniswap-v2"
description: Bagaimana cara kerja kontrak Uniswap-v2? Mengapa ditulis seperti itu?
author: Ori Pomerantz
tags: ["Solidity", "dapps"]
skill: intermediate
breadcrumb: "Panduan Uniswap v2"
published: 2021-05-01
lang: id
---
## Pengantar {#introduction}

[Uniswap v2](https://app.uniswap.org/whitepaper.pdf) dapat membuat pasar pertukaran antara dua token ERC-20 apa pun. Dalam artikel ini kita akan membahas kode sumber untuk kontrak yang mengimplementasikan protokol ini dan melihat mengapa mereka ditulis dengan cara ini.

### Apa yang Dilakukan Uniswap? {#what-does-uniswap-do}

Pada dasarnya, ada dua jenis pengguna: penyedia likuiditas dan pedagang.

_Penyedia likuiditas_ menyediakan kolam dengan dua token yang dapat ditukar (kita akan menyebutnya **Token0** dan **Token1**). Sebagai imbalannya, mereka menerima token ketiga yang mewakili kepemilikan sebagian dari kolam yang disebut _token likuiditas_.

_Pedagang_ mengirimkan satu jenis token ke kolam dan menerima yang lain (misalnya, mengirim **Token0** dan menerima **Token1**) dari kolam yang disediakan oleh penyedia likuiditas. Nilai tukar ditentukan oleh jumlah relatif **Token0** dan **Token1** yang dimiliki kolam. Selain itu, kolam mengambil persentase kecil sebagai hadiah untuk kolam likuiditas.

Ketika penyedia likuiditas menginginkan aset mereka kembali, mereka dapat membakar token kolam dan menerima kembali token mereka, termasuk bagian hadiah mereka.

[Klik di sini untuk deskripsi yang lebih lengkap](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/).

### Mengapa v2? Mengapa bukan v3? {#why-v2}

[Uniswap v3](https://app.uniswap.org/whitepaper-v3.pdf) adalah peningkatan yang jauh lebih rumit daripada v2. Lebih mudah untuk mempelajari v2 terlebih dahulu dan kemudian beralih ke v3.

### Kontrak Inti vs Kontrak Periferal {#contract-types}

Uniswap v2 dibagi menjadi dua komponen, inti (core) dan periferal (periphery). Pembagian ini memungkinkan kontrak inti, yang menyimpan aset dan oleh karena itu _harus_ aman, menjadi lebih sederhana dan lebih mudah diaudit. Semua fungsionalitas tambahan yang diperlukan oleh pedagang kemudian dapat disediakan oleh kontrak periferal.

## Aliran Data dan Kontrol {#flows}

Ini adalah aliran data dan kontrol yang terjadi saat Anda melakukan tiga tindakan utama Uniswap:

1. Tukar antar token yang berbeda
2. Tambahkan likuiditas ke pasar dan dapatkan hadiah berupa token likuiditas ERC-20 pertukaran pasangan
3. Bakar token likuiditas ERC-20 dan dapatkan kembali token ERC-20 yang diizinkan oleh pertukaran pasangan untuk ditukar oleh pedagang

### Tukar {#swap-flow}

Ini adalah aliran yang paling umum, digunakan oleh pedagang:

#### Pemanggil {#caller}

1. Berikan akun periphery dengan jatah (allowance) sejumlah yang akan ditukar.
2. Panggil salah satu dari banyak fungsi tukar kontrak periphery (yang mana tergantung pada apakah ETH terlibat atau tidak, apakah pedagang menentukan jumlah token untuk disetor atau jumlah token untuk didapatkan kembali, dll).
   Setiap fungsi tukar menerima `path`, sebuah array pertukaran yang harus dilalui.

#### Di dalam kontrak periphery (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02-sol}

3. Identifikasi jumlah yang perlu diperdagangkan di setiap pertukaran di sepanjang jalur (path).
4. Mengulangi (iterasi) di sepanjang jalur. Untuk setiap pertukaran di sepanjang jalan, ia mengirimkan token input dan kemudian memanggil fungsi `swap` pertukaran tersebut.
   Dalam kebanyakan kasus, alamat tujuan untuk token adalah pertukaran pasangan berikutnya di jalur tersebut. Pada pertukaran terakhir, itu adalah alamat yang diberikan oleh pedagang.

#### Di dalam kontrak inti (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

5. Verifikasi bahwa kontrak inti tidak dicurangi dan dapat mempertahankan likuiditas yang cukup setelah tukar.
6. Lihat berapa banyak token ekstra yang kita miliki selain cadangan yang diketahui. Jumlah tersebut adalah jumlah token input yang kita terima untuk ditukar.
7. Kirim token output ke tujuan.
8. Panggil `_update` untuk memperbarui jumlah cadangan

#### Kembali ke kontrak periphery (UniswapV2Router02.sol) {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. Lakukan pembersihan yang diperlukan (misalnya, bakar token WETH untuk mendapatkan kembali ETH untuk dikirim ke pedagang)

### Tambah Likuiditas {#add-liquidity-flow}

#### Pemanggil {#caller-2}

1. Berikan akun periphery dengan jatah dalam jumlah yang akan ditambahkan ke kolam likuiditas.
2. Panggil salah satu fungsi `addLiquidity` kontrak periphery.

#### Di dalam kontrak periphery (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-2}

3. Buat pertukaran pasangan baru jika perlu
4. Jika ada pertukaran pasangan yang sudah ada, hitung jumlah token yang akan ditambahkan. Ini seharusnya bernilai identik untuk kedua token, jadi rasio token baru terhadap token yang ada sama.
5. Periksa apakah jumlahnya dapat diterima (pemanggil dapat menentukan jumlah minimum di mana mereka lebih suka tidak menambahkan likuiditas)
6. Panggil kontrak inti.

#### Di dalam kontrak inti (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

7. Mint token likuiditas dan kirimkan ke pemanggil
8. Panggil `_update` untuk memperbarui jumlah cadangan

### Hapus Likuiditas {#remove-liquidity-flow}

#### Pemanggil {#caller-3}

1. Berikan akun periphery dengan jatah token likuiditas untuk dibakar sebagai ganti token yang mendasarinya.
2. Panggil salah satu fungsi `removeLiquidity` kontrak periphery.

#### Di dalam kontrak periphery (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-3}

3. Kirim token likuiditas ke pertukaran pasangan

#### Di dalam kontrak inti (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-3}

4. Kirimkan alamat tujuan token yang mendasarinya secara proporsional dengan token yang dibakar. Misalnya jika ada 1000 token A di kolam, 500 token B, dan 90 token likuiditas, dan kita menerima 9 token untuk dibakar, kita membakar 10% dari token likuiditas sehingga kita mengirim kembali pengguna 100 token A dan 50 token B.
5. Bakar token likuiditas
6. Panggil `_update` untuk memperbarui jumlah cadangan

## Kontrak Inti {#core-contracts}

Ini adalah kontrak aman yang menyimpan likuiditas.

### UniswapV2Pair.sol {#UniswapV2Pair}

[Kontrak ini](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol) mengimplementasikan kolam aktual yang menukar token. Ini adalah fungsionalitas inti Uniswap.

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

Ini adalah semua antarmuka yang perlu diketahui oleh kontrak, baik karena kontrak mengimplementasikannya (`IUniswapV2Pair` dan `UniswapV2ERC20`) atau karena ia memanggil kontrak yang mengimplementasikannya.

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

Kontrak ini mewarisi dari `UniswapV2ERC20`, yang menyediakan fungsi ERC-20 untuk token likuiditas.

```solidity
    using SafeMath  for uint;
```

[Pustaka SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) digunakan untuk menghindari overflow dan underflow. Ini penting karena jika tidak, kita mungkin akan berakhir pada situasi di mana sebuah nilai seharusnya `-1`, tetapi malah menjadi `2^256-1`.

```solidity
    using UQ112x112 for uint224;
```

Banyak perhitungan dalam kontrak kolam memerlukan pecahan. Namun, pecahan tidak didukung oleh EVM.
Solusi yang ditemukan Uniswap adalah menggunakan nilai 224 bit, dengan 112 bit untuk bagian bilangan bulat, dan 112 bit untuk pecahan. Jadi `1.0` direpresentasikan sebagai `2^112`, `1.5` direpresentasikan sebagai `2^112 + 2^111`, dll.

Detail lebih lanjut tentang pustaka ini tersedia [nanti di dokumen ini](#FixedPoint).

#### Variabel {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

Untuk menghindari kasus pembagian dengan nol, ada jumlah minimum token likuiditas yang selalu ada (tetapi dimiliki oleh akun nol). Jumlah tersebut adalah **MINIMUM_LIQUIDITY**, seribu.

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

Ini adalah pemilih ABI untuk fungsi transfer ERC-20. Ini digunakan untuk mentransfer token ERC-20 di kedua akun token.

```solidity
    address public factory;
```

Ini adalah kontrak pabrik yang membuat kolam ini. Setiap kolam adalah pertukaran antara dua token ERC-20, pabrik adalah titik pusat yang menghubungkan semua kolam ini.

```solidity
    address public token0;
    address public token1;
```

Terdapat alamat kontrak untuk dua jenis token ERC-20 yang dapat ditukar oleh kolam ini.

```solidity
    uint112 private reserve0;           // uses single storage slot, accessible via getReserves // menggunakan slot penyimpanan tunggal, dapat diakses melalui getReserves
    uint112 private reserve1;           // uses single storage slot, accessible via getReserves // menggunakan slot penyimpanan tunggal, dapat diakses melalui getReserves
```

Cadangan yang dimiliki kolam untuk setiap jenis token. Kita berasumsi bahwa keduanya mewakili jumlah nilai yang sama, dan oleh karena itu setiap token0 bernilai reserve1/reserve0 dari token1.

```solidity
    uint32  private blockTimestampLast; // uses single storage slot, accessible via getReserves // menggunakan slot penyimpanan tunggal, dapat diakses melalui getReserves
```

Stempel waktu untuk blok terakhir di mana pertukaran terjadi, digunakan untuk melacak nilai tukar dari waktu ke waktu.

Salah satu pengeluaran gas terbesar dari kontrak Ethereum adalah penyimpanan, yang bertahan dari satu panggilan kontrak ke panggilan berikutnya. Setiap sel penyimpanan memiliki panjang 256 bit. Jadi tiga variabel, `reserve0`, `reserve1`, dan `blockTimestampLast`, dialokasikan sedemikian rupa sehingga satu nilai penyimpanan dapat mencakup ketiganya (112+112+32=256).

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

Variabel-variabel ini menyimpan biaya kumulatif untuk setiap token (masing-masing dalam kaitannya dengan yang lain). Mereka dapat digunakan untuk menghitung nilai tukar rata-rata selama periode waktu tertentu.

```solidity
    uint public kLast; // reserve0 * reserve1, as of immediately after the most recent liquidity event // reserve0 * reserve1, segera setelah peristiwa likuiditas terbaru
```

Cara pertukaran pasangan memutuskan nilai tukar antara token0 dan token1 adalah dengan menjaga kelipatan dari kedua cadangan tetap konstan selama perdagangan. `kLast` adalah nilai ini. Ini berubah ketika penyedia likuiditas menyetor atau menarik token, dan sedikit meningkat karena biaya pasar 0,3%.

Berikut adalah contoh sederhana. Perhatikan bahwa demi kesederhanaan, tabel hanya memiliki tiga digit di belakang koma, dan kita mengabaikan biaya perdagangan 0,3% sehingga angkanya tidak akurat.

| Peristiwa | reserve0 | reserve1 | reserve0 \* reserve1 | Nilai tukar rata-rata (token1 / token0) |
| ------------------------------------------- | --------: | --------: | -------------------: | --------------------------------------- |
| Pengaturan awal | 1,000.000 | 1,000.000 | 1,000,000 | |
| Pedagang A menukar 50 token0 dengan 47.619 token1 | 1,050.000 | 952.381 | 1,000,000 | 0.952 |
| Pedagang B menukar 10 token0 dengan 8.984 token1 | 1,060.000 | 943.396 | 1,000,000 | 0.898 |
| Pedagang C menukar 40 token0 dengan 34.305 token1 | 1,100.000 | 909.090 | 1,000,000 | 0.858 |
| Pedagang D menukar 100 token1 dengan 109.01 token0 | 990.990 | 1,009.090 | 1,000,000 | 0.917 |
| Pedagang E menukar 10 token0 dengan 10.079 token1 | 1,000.990 | 999.010 | 1,000,000 | 1.008 |

Seiring pedagang menyediakan lebih banyak token0, nilai relatif token1 meningkat, dan sebaliknya, berdasarkan penawaran dan permintaan.

#### Kunci {#pair-lock}

```solidity
    uint private unlocked = 1;
```

Ada kelas kerentanan keamanan yang didasarkan pada [penyalahgunaan reentrancy](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14). Uniswap perlu mentransfer token ERC-20 arbitrer, yang berarti memanggil kontrak ERC-20 yang mungkin mencoba menyalahgunakan pasar Uniswap yang memanggil mereka.
Dengan memiliki variabel `unlocked` sebagai bagian dari kontrak, kita dapat mencegah fungsi dipanggil saat mereka sedang berjalan (dalam transaksi yang sama).

```solidity
    modifier lock() {
```

Fungsi ini adalah [pengubah (modifier)](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers), sebuah fungsi yang membungkus fungsi normal untuk mengubah perilakunya dengan cara tertentu.

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

Jika `unlocked` sama dengan satu, atur menjadi nol. Jika sudah nol, kembalikan (revert) panggilan, buat itu gagal.

```solidity
        _;
```

Dalam sebuah pengubah, `_;` adalah panggilan fungsi asli (dengan semua parameter). Di sini itu berarti bahwa panggilan fungsi hanya terjadi jika `unlocked` bernilai satu saat dipanggil, dan saat sedang berjalan nilai `unlocked` adalah nol.

```solidity
        unlocked = 1;
    }
```

Setelah fungsi utama kembali, lepaskan kunci.

#### Fungsi Lain-lain {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

Fungsi ini memberi pemanggil status pertukaran saat ini. Perhatikan bahwa fungsi Solidity [dapat mengembalikan beberapa nilai](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values).

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

Fungsi internal ini mentransfer sejumlah token ERC20 dari pertukaran ke orang lain. `SELECTOR` menentukan bahwa fungsi yang kita panggil adalah `transfer(address,uint)` (lihat definisi di atas).

Untuk menghindari keharusan mengimpor antarmuka untuk fungsi token, kita "secara manual" membuat panggilan menggunakan salah satu [fungsi ABI](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions).

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

Ada dua cara di mana panggilan transfer ERC-20 dapat melaporkan kegagalan:

1. Revert. Jika panggilan ke kontrak eksternal dikembalikan (revert), maka nilai kembalian boolean adalah `false`
2. Berakhir secara normal tetapi melaporkan kegagalan. Dalam hal ini buffer nilai kembalian memiliki panjang bukan nol, dan ketika didekodekan sebagai nilai boolean, itu adalah `false`

Jika salah satu dari kondisi ini terjadi, kembalikan (revert).

#### Peristiwa {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

Kedua peristiwa ini dipancarkan ketika penyedia likuiditas menyetor likuiditas (`Mint`) atau menariknya (`Burn`). Dalam kedua kasus tersebut, jumlah token0 dan token1 yang disetor atau ditarik adalah bagian dari peristiwa, serta identitas akun yang memanggil kita (`sender`). Dalam kasus penarikan, peristiwa tersebut juga mencakup target yang menerima token (`to`), yang mungkin tidak sama dengan pengirim.

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

Peristiwa ini dipancarkan ketika seorang pedagang menukar satu token dengan token lainnya. Sekali lagi, pengirim dan tujuan mungkin tidak sama.
Setiap token dapat dikirim ke pertukaran, atau diterima darinya.

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

Terakhir, `Sync` dipancarkan setiap kali token ditambahkan atau ditarik, terlepas dari alasannya, untuk memberikan informasi cadangan terbaru (dan karenanya nilai tukar).

#### Fungsi Pengaturan {#pair-setup}

Fungsi-fungsi ini seharusnya dipanggil sekali ketika pertukaran pasangan baru diatur.

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

Konstruktor memastikan kita akan melacak alamat pabrik yang membuat pasangan tersebut. Informasi ini diperlukan untuk `initialize` dan untuk biaya pabrik (jika ada)

```solidity
    // called once by the factory at time of deployment // dipanggil sekali oleh factory pada saat penerapan
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // sufficient check // pemeriksaan yang cukup
        token0 = _token0;
        token1 = _token1;
    }
```

Fungsi ini memungkinkan pabrik (dan hanya pabrik) untuk menentukan dua token ERC-20 yang akan ditukar oleh pasangan ini.

#### Fungsi Pembaruan Internal {#pair-update-internal}

##### \_update

```solidity
    // update reserves and, on the first call per block, price accumulators // memperbarui cadangan dan, pada panggilan pertama per blok, akumulator harga
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

Fungsi ini dipanggil setiap kali token disetor atau ditarik.

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

Jika balance0 atau balance1 (uint256) lebih tinggi dari uint112(-1) (=2^112-1) (sehingga meluap & kembali ke 0 saat dikonversi ke uint112) tolak untuk melanjutkan \_update guna mencegah overflow. Dengan token normal yang dapat dibagi lagi menjadi 10^18 unit, ini berarti setiap pertukaran dibatasi hingga sekitar 5.1\*10^15 dari setiap token. Sejauh ini hal tersebut belum menjadi masalah.

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // overflow is desired // overflow diinginkan
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

Jika waktu yang berlalu bukan nol, itu berarti kita adalah transaksi pertukaran pertama pada blok ini. Dalam hal ini, kita perlu memperbarui akumulator biaya.

```solidity
            // * never overflows, and + overflow is desired // * tidak pernah overflow, dan + overflow diinginkan
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

Setiap akumulator biaya diperbarui dengan biaya terbaru (cadangan token lain/cadangan token ini) dikalikan waktu yang berlalu dalam detik. Untuk mendapatkan harga rata-rata, Anda membaca harga kumulatif di dua titik waktu dan membaginya dengan perbedaan waktu di antara keduanya. Misalnya, asumsikan urutan peristiwa ini:

| Peristiwa | reserve0 | reserve1 | stempel waktu | Nilai tukar marjinal (reserve1 / reserve0) | price0CumulativeLast |
| -------------------------------------------------------- | --------: | --------: | --------- | -------------------------------------------: | -------------------------: |
| Pengaturan awal | 1,000.000 | 1,000.000 | 5,000 | 1.000 | 0 |
| Pedagang A menyetor 50 token0 dan mendapatkan kembali 47.619 token1 | 1,050.000 | 952.381 | 5,020 | 0.907 | 20 |
| Pedagang B menyetor 10 token0 dan mendapatkan kembali 8.984 token1 | 1,060.000 | 943.396 | 5,030 | 0.890 | 20+10\*0.907 = 29.07 |
| Pedagang C menyetor 40 token0 dan mendapatkan kembali 34.305 token1 | 1,100.000 | 909.090 | 5,100 | 0.826 | 29.07+70\*0.890 = 91.37 |
| Pedagang D menyetor 100 token1 dan mendapatkan kembali 109.01 token0 | 990.990 | 1,009.090 | 5,110 | 1.018 | 91.37+10\*0.826 = 99.63 |
| Pedagang E menyetor 10 token0 dan mendapatkan kembali 10.079 token1 | 1,000.990 | 999.010 | 5,150 | 0.998 | 99.63+40\*1.1018 = 143.702 |

Katakanlah kita ingin menghitung harga rata-rata **Token0** antara stempel waktu 5.030 dan 5.150. Perbedaan nilai `price0Cumulative` adalah 143.702-29.07=114.632. Ini adalah rata-rata selama dua menit (120 detik). Jadi harga rata-ratanya adalah 114.632/120 = 0.955.

Perhitungan harga ini adalah alasan kita perlu mengetahui ukuran cadangan yang lama.

```solidity
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }
```

Terakhir, perbarui variabel global dan pancarkan peristiwa `Sync`.

##### \_mintFee

```solidity
    // if fee is on, mint liquidity equivalent to 1/6th of the growth in sqrt(k) // jika biaya aktif, mint likuiditas yang setara dengan 1/6 dari pertumbuhan sqrt(k)
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

Di Uniswap 2.0 pedagang membayar biaya 0,30% untuk menggunakan pasar. Sebagian besar biaya tersebut (0,25% dari perdagangan) selalu diberikan kepada penyedia likuiditas. Sisa 0,05% dapat diberikan kepada penyedia likuiditas atau ke alamat yang ditentukan oleh pabrik sebagai biaya protokol, yang membayar Uniswap untuk upaya pengembangan mereka.

Untuk mengurangi perhitungan (dan karenanya biaya gas), biaya ini hanya dihitung ketika likuiditas ditambahkan atau dihapus dari kolam, bukan pada setiap transaksi.

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

Baca tujuan biaya dari pabrik. Jika nol maka tidak ada biaya protokol dan tidak perlu menghitung biaya tersebut.

```solidity
        uint _kLast = kLast; // gas savings // penghematan gas
```

Variabel status `kLast` terletak di penyimpanan, sehingga akan memiliki nilai di antara panggilan yang berbeda ke kontrak.
Akses ke penyimpanan jauh lebih mahal daripada akses ke memori volatil yang dilepaskan ketika panggilan fungsi ke kontrak berakhir, jadi kita menggunakan variabel internal untuk menghemat gas.

```solidity
        if (feeOn) {
            if (_kLast != 0) {
```

Penyedia likuiditas mendapatkan bagian mereka hanya dengan apresiasi token likuiditas mereka. Tetapi biaya protokol mengharuskan token likuiditas baru di-mint dan diberikan ke alamat `feeTo`.

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
```

Jika ada likuiditas baru yang dapat dipungut biaya protokol. Anda dapat melihat fungsi akar kuadrat [nanti di artikel ini](#Math)

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

Perhitungan biaya yang rumit ini dijelaskan dalam [buku putih](https://app.uniswap.org/whitepaper.pdf) di halaman 5. Kita tahu bahwa antara waktu `kLast` dihitung dan saat ini tidak ada likuiditas yang ditambahkan atau dihapus (karena kita menjalankan perhitungan ini setiap kali likuiditas ditambahkan atau dihapus, sebelum benar-benar berubah), jadi setiap perubahan dalam `reserve0 * reserve1` harus berasal dari biaya transaksi (tanpanya kita akan menjaga `reserve0 * reserve1` tetap konstan).

```solidity
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
```

Gunakan fungsi `UniswapV2ERC20._mint` untuk benar-benar membuat token likuiditas tambahan dan menetapkannya ke `feeTo`.

```solidity
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }
```

Jika tidak ada biaya, atur `kLast` menjadi nol (jika belum). Ketika kontrak ini ditulis, ada [fitur pengembalian dana gas](https://eips.ethereum.org/EIPS/eip-3298) yang mendorong kontrak untuk mengurangi ukuran keseluruhan status Ethereum dengan mengosongkan penyimpanan yang tidak mereka butuhkan.
Kode ini mendapatkan pengembalian dana tersebut jika memungkinkan.

#### Fungsi yang Dapat Diakses Secara Eksternal {#pair-external}

Perhatikan bahwa meskipun transaksi atau kontrak apa pun _dapat_ memanggil fungsi-fungsi ini, mereka dirancang untuk dipanggil dari kontrak periferal. Jika Anda memanggilnya secara langsung, Anda tidak akan dapat menipu pertukaran pasangan, tetapi Anda mungkin kehilangan nilai karena kesalahan.

##### mint

```solidity
    // this low-level function should be called from a contract which performs important safety checks // fungsi tingkat rendah ini harus dipanggil dari kontrak yang melakukan pemeriksaan keamanan penting
    function mint(address to) external lock returns (uint liquidity) {
```

Fungsi ini dipanggil ketika penyedia likuiditas menambahkan likuiditas ke kolam. Ini me-mint token likuiditas tambahan sebagai hadiah. Ini harus dipanggil dari [kontrak periferal](#UniswapV2Router02) yang memanggilnya setelah menambahkan likuiditas dalam transaksi yang sama (sehingga tidak ada orang lain yang dapat mengirimkan transaksi yang mengklaim likuiditas baru sebelum pemilik yang sah).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings // penghematan gas
```

Ini adalah cara membaca hasil dari fungsi Solidity yang mengembalikan beberapa nilai. Kita membuang nilai yang dikembalikan terakhir, stempel waktu blok, karena kita tidak membutuhkannya.

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

Hitung biaya protokol yang akan dikumpulkan, jika ada, dan mint token likuiditas yang sesuai. Karena parameter untuk `_mintFee` adalah nilai cadangan lama, biaya dihitung secara akurat hanya berdasarkan perubahan kolam akibat biaya.

```solidity
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee // penghematan gas, harus didefinisikan di sini karena totalSupply dapat diperbarui di _mintFee
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // permanently lock the first MINIMUM_LIQUIDITY tokens // mengunci secara permanen token MINIMUM_LIQUIDITY pertama
```

Jika ini adalah setoran pertama, buat token `MINIMUM_LIQUIDITY` dan kirimkan ke alamat nol untuk menguncinya. Mereka tidak akan pernah dapat ditebus, yang berarti kolam tidak akan pernah dikosongkan sepenuhnya (ini menyelamatkan kita dari pembagian dengan nol di beberapa tempat). Nilai `MINIMUM_LIQUIDITY` adalah seribu, yang mengingat sebagian besar ERC-20 dibagi lagi menjadi unit 10^-18 dari sebuah token, seperti ETH dibagi menjadi wei, adalah 10^-15 dari nilai satu token. Bukan biaya yang tinggi.

Pada saat setoran pertama kita tidak mengetahui nilai relatif dari kedua token, jadi kita hanya mengalikan jumlahnya dan mengambil akar kuadrat, dengan asumsi bahwa setoran tersebut memberi kita nilai yang sama di kedua token.

Kita dapat mempercayai ini karena merupakan kepentingan penyetor untuk memberikan nilai yang sama, untuk menghindari kehilangan nilai akibat arbitrase.
Katakanlah nilai kedua token identik, tetapi penyetor kita menyetor **Token1** empat kali lebih banyak daripada **Token0**. Seorang pedagang dapat menggunakan fakta bahwa pertukaran pasangan berpikir bahwa **Token0** lebih berharga untuk mengekstrak nilai darinya.

| Peristiwa | reserve0 | reserve1 | reserve0 \* reserve1 | Nilai kolam (reserve0 + reserve1) |
| ------------------------------------------------------------ | -------: | -------: | -------------------: | --------------------------------------: |
| Pengaturan awal | 8 | 32 | 256 | 40 |
| Pedagang menyetor 8 token **Token0**, mendapatkan kembali 16 **Token1** | 16 | 16 | 256 | 32 |

Seperti yang Anda lihat, pedagang mendapatkan tambahan 8 token, yang berasal dari pengurangan nilai kolam, merugikan penyetor yang memilikinya.

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

Dengan setiap setoran berikutnya kita sudah mengetahui nilai tukar antara kedua aset, dan kita mengharapkan penyedia likuiditas untuk memberikan nilai yang sama di keduanya. Jika tidak, kita memberi mereka token likuiditas berdasarkan nilai yang lebih kecil yang mereka berikan sebagai hukuman.

Baik itu setoran awal atau setoran berikutnya, jumlah token likuiditas yang kita berikan sama dengan akar kuadrat dari perubahan dalam `reserve0*reserve1` dan nilai token likuiditas tidak berubah (kecuali kita mendapatkan setoran yang tidak memiliki nilai yang sama dari kedua jenis, dalam hal ini "denda" didistribusikan). Berikut adalah contoh lain dengan dua token yang memiliki nilai yang sama, dengan tiga setoran yang baik dan satu yang buruk (setoran hanya satu jenis token, sehingga tidak menghasilkan token likuiditas apa pun).

| Peristiwa | reserve0 | reserve1 | reserve0 \* reserve1 | Nilai kolam (reserve0 + reserve1) | Token likuiditas yang di-mint untuk setoran ini | Total token likuiditas | nilai setiap token likuiditas |
| ------------------------- | -------: | -------: | -------------------: | -------------------------------: | ---------------------------------------: | ---------------------: | ----------------------------: |
| Pengaturan awal | 8.000 | 8.000 | 64 | 16.000 | 8 | 8 | 2.000 |
| Setor empat dari setiap jenis | 12.000 | 12.000 | 144 | 24.000 | 4 | 12 | 2.000 |
| Setor dua dari setiap jenis | 14.000 | 14.000 | 196 | 28.000 | 2 | 14 | 2.000 |
| Setoran nilai tidak sama | 18.000 | 14.000 | 252 | 32.000 | 0 | 14 | ~2.286 |
| Setelah arbitrase | ~15.874 | ~15.874 | 252 | ~31.748 | 0 | 14 | ~2.267 |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

Gunakan fungsi `UniswapV2ERC20._mint` untuk benar-benar membuat token likuiditas tambahan dan memberikannya ke akun yang benar.

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date // reserve0 dan reserve1 sudah diperbarui
        emit Mint(msg.sender, amount0, amount1);
    }
```

Perbarui variabel status (`reserve0`, `reserve1`, dan jika perlu `kLast`) dan pancarkan peristiwa yang sesuai.

##### burn

```solidity
    // this low-level function should be called from a contract which performs important safety checks // fungsi tingkat rendah ini harus dipanggil dari kontrak yang melakukan pemeriksaan keamanan penting
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

Fungsi ini dipanggil ketika likuiditas ditarik dan token likuiditas yang sesuai perlu dibakar (burn).
Ini juga harus dipanggil [dari akun periferal](#UniswapV2Router02).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings // penghematan gas
        address _token0 = token0;                                // gas savings // penghematan gas
        address _token1 = token1;                                // gas savings // penghematan gas
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

Kontrak periferal mentransfer likuiditas yang akan dibakar ke kontrak ini sebelum panggilan. Dengan begitu kita tahu berapa banyak likuiditas yang harus dibakar, dan kita dapat memastikan bahwa itu dibakar.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee // penghematan gas, harus didefinisikan di sini karena totalSupply dapat diperbarui di _mintFee
        amount0 = liquidity.mul(balance0) / _totalSupply; // using balances ensures pro-rata distribution // menggunakan saldo memastikan distribusi pro-rata
        amount1 = liquidity.mul(balance1) / _totalSupply; // using balances ensures pro-rata distribution // menggunakan saldo memastikan distribusi pro-rata
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
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date // reserve0 dan reserve1 sudah diperbarui
        emit Burn(msg.sender, amount0, amount1, to);
    }

```

Sisa dari fungsi `burn` adalah cerminan dari fungsi `mint` di atas.

##### swap

```solidity
    // this low-level function should be called from a contract which performs important safety checks // fungsi tingkat rendah ini harus dipanggil dari kontrak yang melakukan pemeriksaan keamanan penting
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

Fungsi ini juga seharusnya dipanggil dari [kontrak periferal](#UniswapV2Router02).

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings // penghematan gas
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // scope for _token{0,1}, avoids stack too deep errors // cakupan untuk _token{0,1}, menghindari kesalahan stack too deep
```

Variabel lokal dapat disimpan baik di memori atau, jika jumlahnya tidak terlalu banyak, langsung di tumpukan (stack).
Jika kita dapat membatasi jumlahnya sehingga kita akan menggunakan tumpukan, kita menggunakan lebih sedikit gas. Untuk detail lebih lanjut lihat [kertas kuning, spesifikasi formal Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf), hal. 26, persamaan 298.

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // optimistically transfer tokens // mentransfer token secara optimis
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // optimistically transfer tokens // mentransfer token secara optimis
```

Transfer ini bersifat optimis, karena kita mentransfer sebelum kita yakin semua kondisi terpenuhi. Ini tidak masalah di Ethereum karena jika kondisi tidak terpenuhi di kemudian hari dalam panggilan, kita mengembalikannya (revert) dan membatalkan setiap perubahan yang dibuatnya.

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

Beri tahu penerima tentang tukar jika diminta.

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

Dapatkan saldo saat ini. Kontrak periferal mengirimi kita token sebelum memanggil kita untuk tukar. Ini memudahkan kontrak untuk memeriksa bahwa ia tidak ditipu, sebuah pemeriksaan yang _harus_ terjadi di kontrak inti (karena kita dapat dipanggil oleh entitas lain selain kontrak periferal kita).

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // scope for reserve{0,1}Adjusted, avoids stack too deep errors // cakupan untuk reserve{0,1}Adjusted, menghindari kesalahan stack too deep
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

Ini adalah pemeriksaan kewarasan (sanity check) untuk memastikan kita tidak rugi dari tukar. Tidak ada keadaan di mana tukar harus mengurangi `reserve0*reserve1`. Ini juga di mana kita memastikan biaya 0,3% dikirim pada tukar; sebelum memeriksa kewarasan nilai K, kita mengalikan kedua saldo dengan 1000 dikurangi jumlah yang dikalikan dengan 3, ini berarti 0,3% (3/1000 = 0,003 = 0,3%) dipotong dari saldo sebelum membandingkan nilai K-nya dengan nilai K cadangan saat ini.

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

Perbarui `reserve0` dan `reserve1`, dan jika perlu akumulator harga dan stempel waktu serta pancarkan peristiwa.

##### Sync atau Skim

Ada kemungkinan saldo riil menjadi tidak sinkron dengan cadangan yang menurut pertukaran pasangan dimilikinya.
Tidak ada cara untuk menarik token tanpa persetujuan kontrak, tetapi setoran adalah masalah yang berbeda. Sebuah akun dapat mentransfer token ke pertukaran tanpa memanggil `mint` atau `swap`.

Dalam hal ini ada dua solusi:

- `sync`, perbarui cadangan ke saldo saat ini
- `skim`, tarik jumlah ekstra. Perhatikan bahwa akun mana pun diizinkan untuk memanggil `skim` karena kita tidak tahu siapa yang menyetor token. Informasi ini dipancarkan dalam sebuah peristiwa, tetapi peristiwa tidak dapat diakses dari blockchain.

```solidity
    // force balances to match reserves // memaksa saldo agar sesuai dengan cadangan
    function skim(address to) external lock {
        address _token0 = token0; // gas savings // penghematan gas
        address _token1 = token1; // gas savings // penghematan gas
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }



    // force reserves to match balances // memaksa cadangan agar sesuai dengan saldo
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
}
```

### UniswapV2Factory.sol {#UniswapV2Factory}

[Kontrak ini](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol) membuat pertukaran pasangan.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToSetter;
```

Variabel status ini diperlukan untuk mengimplementasikan biaya protokol (lihat [buku putih](https://app.uniswap.org/whitepaper.pdf), hal. 5).
Alamat `feeTo` mengakumulasi token likuiditas untuk biaya protokol, dan `feeToSetter` adalah alamat yang diizinkan untuk mengubah `feeTo` ke alamat yang berbeda.

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

Variabel-variabel ini melacak pasangan, pertukaran antara dua jenis token.

Yang pertama, `getPair`, adalah pemetaan yang mengidentifikasi kontrak pertukaran pasangan berdasarkan dua token ERC-20 yang ditukarnya. Token ERC-20 diidentifikasi oleh alamat kontrak yang mengimplementasikannya, sehingga kunci dan nilainya semuanya adalah alamat. Untuk mendapatkan alamat pertukaran pasangan yang memungkinkan Anda mengonversi dari `tokenA` ke `tokenB`, Anda menggunakan `getPair[<alamat tokenA>][<alamat tokenB>]` (atau sebaliknya).

Variabel kedua, `allPairs`, adalah array yang mencakup semua alamat pertukaran pasangan yang dibuat oleh pabrik ini. Di Ethereum Anda tidak dapat melakukan iterasi pada konten pemetaan, atau mendapatkan daftar semua kunci, jadi variabel ini adalah satu-satunya cara untuk mengetahui pertukaran mana yang dikelola pabrik ini.

Catatan: Alasan Anda tidak dapat melakukan iterasi pada semua kunci pemetaan adalah karena penyimpanan data kontrak itu _mahal_, jadi semakin sedikit kita menggunakannya semakin baik, dan semakin jarang kita mengubahnya
semakin baik. Anda dapat membuat [pemetaan yang mendukung iterasi](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol), tetapi mereka memerlukan penyimpanan ekstra untuk daftar kunci. Di sebagian besar aplikasi Anda tidak membutuhkannya.

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

Peristiwa ini dipancarkan ketika pertukaran pasangan baru dibuat. Ini mencakup alamat token, alamat pertukaran pasangan, dan jumlah total pertukaran yang dikelola oleh pabrik.

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

Fungsi ini mengembalikan jumlah pasangan pertukaran.

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

Ini adalah fungsi utama pabrik, untuk membuat pertukaran pasangan antara dua token ERC-20. Perhatikan bahwa siapa pun dapat memanggil fungsi ini. Anda tidak memerlukan izin dari Uniswap untuk membuat pertukaran pasangan baru.

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

Kita ingin alamat pertukaran baru menjadi deterministik, sehingga dapat dihitung sebelumnya secara offchain (ini dapat berguna untuk [transaksi layer 2](/developers/docs/scaling/)).
Untuk melakukan ini kita perlu memiliki urutan alamat token yang konsisten, terlepas dari urutan kita menerimanya, jadi kita mengurutkannya di sini.

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // single check is sufficient // pemeriksaan tunggal sudah cukup
```

Kolam likuiditas yang besar lebih baik daripada yang kecil, karena mereka memiliki harga yang lebih stabil. Kita tidak ingin memiliki lebih dari satu kolam likuiditas per pasangan token. Jika sudah ada pertukaran, tidak perlu membuat yang lain untuk pasangan yang sama.

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

Untuk membuat kontrak baru kita memerlukan kode yang membuatnya (baik fungsi konstruktor maupun kode yang menulis ke memori bytecode EVM dari kontrak aktual). Biasanya di Solidity kita hanya menggunakan `addr = new <nama kontrak>(<parameter konstruktor>)` dan kompiler mengurus semuanya untuk kita, tetapi untuk memiliki alamat kontrak yang deterministik kita perlu menggunakan [opcode CREATE2](https://eips.ethereum.org/EIPS/eip-1014).
Ketika kode ini ditulis, opcode tersebut belum didukung oleh Solidity, sehingga perlu untuk mendapatkan kode secara manual. Ini tidak lagi menjadi masalah, karena [Solidity sekarang mendukung CREATE2](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2).

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

Ketika sebuah opcode belum didukung oleh Solidity, kita dapat memanggilnya menggunakan [assembly sebaris (inline assembly)](https://docs.soliditylang.org/en/v0.8.3/assembly.html).

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

Panggil fungsi `initialize` untuk memberi tahu pertukaran baru dua token apa yang ditukarnya.

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // populate mapping in the reverse direction // mengisi pemetaan ke arah sebaliknya
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }
```

Simpan informasi pasangan baru dalam variabel status dan pancarkan peristiwa untuk memberi tahu dunia tentang pertukaran pasangan baru.

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

Transaksi di Ethereum membutuhkan biaya ether (ETH), yang setara dengan uang sungguhan. Jika Anda memiliki token ERC-20 tetapi tidak memiliki ETH, Anda tidak dapat mengirim transaksi, sehingga Anda tidak dapat melakukan apa pun dengannya. Salah satu solusi untuk menghindari masalah ini adalah [transaksi meta](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions).
Pemilik token menandatangani transaksi yang memungkinkan orang lain untuk menarik token secara offchain dan mengirimkannya menggunakan Internet ke penerima. Penerima, yang memiliki ETH, kemudian mengirimkan izin (permit) atas nama pemilik.

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)"); // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

Hash ini adalah [pengidentifikasi untuk jenis transaksi](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash). Satu-satunya yang kita dukung di sini adalah `Permit` dengan parameter-parameter ini.

```solidity
    mapping(address => uint) public nonces;
```

Tidak mungkin bagi penerima untuk memalsukan tanda tangan digital. Namun, sangat mudah untuk mengirim transaksi yang sama dua kali (ini adalah bentuk [serangan replay](https://wikipedia.org/wiki/Replay_attack)). Untuk mencegah hal ini, kita menggunakan [nonce](https://wikipedia.org/wiki/Cryptographic_nonce). Jika nonce dari `Permit` baru tidak lebih satu dari yang terakhir digunakan, kita menganggapnya tidak valid.

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

Ini adalah kode untuk mengambil [pengidentifikasi rantai](https://chainid.network/). Ini menggunakan dialek assembly EVM yang disebut [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html). Perhatikan bahwa dalam versi Yul saat ini Anda harus menggunakan `chainid()`, bukan `chainid`.

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

Ini adalah fungsi yang mengimplementasikan izin. Ini menerima sebagai parameter bidang yang relevan, dan tiga nilai skalar untuk [tanda tangan](https://yos.io/2018/11/16/ethereum-signatures/) (v, r, dan s).

```solidity
        require(deadline >= block.timestamp, 'UniswapV2: EXPIRED');
```

Jangan terima transaksi setelah tenggat waktu.

```solidity
        bytes32 digest = keccak256(
            abi.encodePacked(
                '\x19\x01',
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))
            )
        );
```

`abi.encodePacked(...)` adalah pesan yang kita harapkan untuk didapatkan. Kita tahu apa seharusnya nonce tersebut, jadi tidak perlu bagi kita untuk mendapatkannya sebagai parameter.

Algoritma tanda tangan Ethereum mengharapkan untuk mendapatkan 256 bit untuk ditandatangani, jadi kita menggunakan fungsi hash `keccak256`.

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

Dari intisari (digest) dan tanda tangan kita bisa mendapatkan alamat yang menandatanganinya menggunakan [ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/).

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

Jika semuanya baik-baik saja, perlakukan ini sebagai [persetujuan (approve) ERC-20](https://eips.ethereum.org/EIPS/eip-20#approve).

## Kontrak Periphery {#periphery-contracts}

Kontrak periphery adalah API (antarmuka program aplikasi) untuk Uniswap. Kontrak ini tersedia untuk panggilan eksternal, baik dari kontrak lain maupun aplikasi terdesentralisasi. Anda dapat memanggil kontrak inti secara langsung, tetapi itu lebih rumit dan Anda mungkin kehilangan nilai jika melakukan kesalahan. Kontrak inti hanya berisi pengujian untuk memastikan mereka tidak dicurangi, bukan pemeriksaan kewarasan (sanity checks) untuk orang lain. Pemeriksaan tersebut ada di periphery sehingga dapat diperbarui sesuai kebutuhan.

### UniswapV2Router01.sol {#UniswapV2Router01}

[Kontrak ini](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol) memiliki masalah, dan [tidak boleh lagi digunakan](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01). Untungnya, kontrak periphery bersifat tanpa status (stateless) dan tidak menyimpan aset apa pun, sehingga mudah untuk menghentikan penggunaannya dan menyarankan orang-orang untuk menggunakan penggantinya, `UniswapV2Router02`.

### UniswapV2Router02.sol {#UniswapV2Router02}

Dalam kebanyakan kasus, Anda akan menggunakan Uniswap melalui [kontrak ini](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol).
Anda dapat melihat cara menggunakannya [di sini](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02).

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

Sebagian besar dari ini pernah kita temui sebelumnya, atau cukup jelas. Satu-satunya pengecualian adalah `IWETH.sol`. Uniswap v2 memungkinkan pertukaran untuk pasangan token ERC-20 apa pun, tetapi ether (ETH) itu sendiri bukanlah token ERC-20. ETH mendahului standar tersebut dan ditransfer dengan mekanisme yang unik. Untuk memungkinkan penggunaan ETH dalam kontrak yang berlaku untuk token ERC-20, orang-orang menciptakan kontrak [wrapped ether (WETH)](https://weth.tkn.eth.limo/). Anda mengirimkan ETH ke kontrak ini, dan kontrak tersebut akan melakukan mint sejumlah WETH yang setara untuk Anda. Atau Anda dapat membakar WETH, dan mendapatkan ETH kembali.

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

Router perlu mengetahui factory mana yang akan digunakan, dan untuk transaksi yang memerlukan WETH, kontrak WETH mana yang akan digunakan. Nilai-nilai ini bersifat [tetap](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables), yang berarti mereka hanya dapat diatur di dalam konstruktor. Hal ini memberikan keyakinan kepada pengguna bahwa tidak ada yang dapat mengubahnya untuk menunjuk ke kontrak yang kurang jujur.

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

Modifier ini memastikan bahwa transaksi dengan batas waktu ("lakukan X sebelum waktu Y jika Anda bisa") tidak terjadi setelah batas waktunya.

```solidity
    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }
```

Konstruktor hanya mengatur variabel status yang tetap.

```solidity
    receive() external payable {
        assert(msg.sender == WETH); // only accept ETH via fallback from the WETH contract // hanya menerima ETH melalui fallback dari kontrak WETH
    }
```

Fungsi ini dipanggil ketika kita menebus token dari kontrak WETH kembali menjadi ETH. Hanya kontrak WETH yang kita gunakan yang berwenang untuk melakukan itu.

#### Tambah Likuiditas {#add-liquidity}

Fungsi-fungsi ini menambahkan token ke pertukaran pasangan, yang meningkatkan kolam likuiditas.

```solidity

    // **** ADD LIQUIDITY **** // **** TAMBAH LIKUIDITAS ****
    function _addLiquidity(
```

Fungsi ini digunakan untuk menghitung jumlah token A dan B yang harus disetorkan ke dalam pertukaran pasangan.

```solidity
        address tokenA,
        address tokenB,
```

Ini adalah alamat dari kontrak token ERC-20.

```solidity
        uint amountADesired,
        uint amountBDesired,
```

Ini adalah jumlah yang ingin disetorkan oleh penyedia likuiditas. Ini juga merupakan jumlah maksimum A dan B yang akan disetorkan.

```solidity
        uint amountAMin,
        uint amountBMin
```

Ini adalah jumlah minimum yang dapat diterima untuk disetorkan. Jika transaksi tidak dapat terjadi dengan jumlah ini atau lebih, batalkan (revert) transaksi tersebut. Jika Anda tidak menginginkan fitur ini, cukup tentukan nol.

Penyedia likuiditas biasanya menentukan nilai minimum, karena mereka ingin membatasi transaksi pada nilai tukar yang mendekati nilai saat ini. Jika nilai tukar berfluktuasi terlalu banyak, itu mungkin berarti ada berita yang mengubah nilai yang mendasarinya, dan mereka ingin memutuskan secara manual apa yang harus dilakukan.

Sebagai contoh, bayangkan sebuah kasus di mana nilai tukarnya adalah satu banding satu dan penyedia likuiditas menentukan nilai-nilai ini:

| Parameter      | Nilai |
| -------------- | ----: |
| amountADesired |  1000 |
| amountBDesired |  1000 |
| amountAMin     |   900 |
| amountBMin     |   800 |

Selama nilai tukar tetap berada di antara 0.9 dan 1.25, transaksi akan terjadi. Jika nilai tukar keluar dari kisaran tersebut, transaksi akan dibatalkan.

Alasan dari tindakan pencegahan ini adalah karena transaksi tidak terjadi seketika, Anda mengirimkannya dan pada akhirnya seorang validator akan memasukkannya ke dalam sebuah blok (kecuali jika harga gas Anda sangat rendah, dalam hal ini Anda harus mengirimkan transaksi lain dengan nonce yang sama dan harga gas yang lebih tinggi untuk menimpanya). Anda tidak dapat mengontrol apa yang terjadi selama interval antara pengiriman dan penyertaan.

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

Fungsi ini mengembalikan jumlah yang harus disetorkan oleh penyedia likuiditas untuk memiliki rasio yang sama dengan rasio saat ini di antara cadangan.

```solidity
        // create the pair if it doesn't exist yet // buat pasangan jika belum ada
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
```

Jika belum ada pertukaran untuk pasangan token ini, buatlah.

```solidity
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
```

Dapatkan cadangan saat ini dalam pasangan tersebut.

```solidity
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
```

Jika cadangan saat ini kosong, maka ini adalah pertukaran pasangan baru. Jumlah yang akan disetorkan harus sama persis dengan yang ingin diberikan oleh penyedia likuiditas.

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

Jika kita perlu melihat berapa jumlahnya, kita mendapatkan jumlah optimal menggunakan [fungsi ini](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35). Kita menginginkan rasio yang sama dengan cadangan saat ini.

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

Jika `amountBOptimal` lebih kecil dari jumlah yang ingin disetorkan oleh penyedia likuiditas, itu berarti token B saat ini lebih berharga daripada yang diperkirakan oleh penyetor likuiditas, sehingga jumlah yang lebih kecil diperlukan.

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

Jika jumlah B yang optimal lebih dari jumlah B yang diinginkan, itu berarti token B saat ini kurang berharga daripada yang diperkirakan oleh penyetor likuiditas, sehingga jumlah yang lebih tinggi diperlukan. Namun, jumlah yang diinginkan adalah maksimum, jadi kita tidak dapat melakukannya. Sebagai gantinya, kita menghitung jumlah token A yang optimal untuk jumlah token B yang diinginkan.

Menggabungkan semuanya, kita mendapatkan grafik ini. Asumsikan Anda mencoba menyetorkan seribu token A (garis biru) dan seribu token B (garis merah). Sumbu x adalah nilai tukar, A/B. Jika x=1, nilainya sama dan Anda menyetorkan seribu untuk masing-masing token. Jika x=2, nilai A dua kali lipat dari B (Anda mendapatkan dua token B untuk setiap token A) sehingga Anda menyetorkan seribu token B, tetapi hanya 500 token A. Jika x=0.5, situasinya terbalik, seribu token A dan lima ratus token B.

![Graph](liquidityProviderDeposit.png)

Anda dapat menyetorkan likuiditas secara langsung ke dalam kontrak inti (menggunakan [UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110)), tetapi kontrak inti hanya memeriksa bahwa ia tidak dicurangi, sehingga Anda berisiko kehilangan nilai jika nilai tukar berubah antara waktu Anda mengirimkan transaksi dan waktu pelaksanaannya. Jika Anda menggunakan kontrak periphery, kontrak tersebut akan menghitung jumlah yang harus Anda setorkan dan segera menyetorkannya, sehingga nilai tukar tidak berubah dan Anda tidak kehilangan apa pun.

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

Fungsi ini dapat dipanggil oleh sebuah transaksi untuk menyetorkan likuiditas. Sebagian besar parameter sama dengan `_addLiquidity` di atas, dengan dua pengecualian:

. `to` adalah alamat yang mendapatkan token likuiditas baru yang di-mint untuk menunjukkan porsi penyedia likuiditas di dalam kolam
. `deadline` adalah batas waktu pada transaksi

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

Kita menghitung jumlah yang benar-benar akan disetorkan dan kemudian menemukan alamat kolam likuiditas. Untuk menghemat gas, kita tidak melakukan ini dengan bertanya kepada factory, melainkan menggunakan fungsi pustaka `pairFor` (lihat di bawah pada bagian pustaka)

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

Transfer jumlah token yang benar dari pengguna ke dalam pertukaran pasangan.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
    }
```

Sebagai imbalannya, berikan alamat `to` token likuiditas untuk kepemilikan sebagian dari kolam tersebut. Fungsi `mint` dari kontrak inti melihat berapa banyak token ekstra yang dimilikinya (dibandingkan dengan yang dimilikinya saat terakhir kali likuiditas berubah) dan melakukan mint likuiditas yang sesuai.

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

Ketika penyedia likuiditas ingin menyediakan likuiditas ke pertukaran pasangan Token/ETH, ada beberapa perbedaan. Kontrak menangani pembungkusan (wrapping) ETH untuk penyedia likuiditas. Tidak perlu menentukan berapa banyak ETH yang ingin disetorkan pengguna, karena pengguna hanya mengirimkannya bersama transaksi (jumlahnya tersedia di `msg.value`).

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

Untuk menyetorkan ETH, kontrak pertama-tama membungkusnya menjadi WETH dan kemudian mentransfer WETH ke dalam pasangan tersebut. Perhatikan bahwa transfer dibungkus dalam sebuah `assert`. Ini berarti bahwa jika transfer gagal, panggilan kontrak ini juga gagal, dan oleh karena itu pembungkusan tidak benar-benar terjadi.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // refund dust eth, if any // kembalikan sisa eth (dust), jika ada
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }
```

Pengguna telah mengirimi kita ETH, jadi jika ada sisa (karena token lainnya kurang berharga dari yang diperkirakan pengguna), kita perlu mengeluarkan pengembalian dana (refund).

#### Hapus Likuiditas {#remove-liquidity}

Fungsi-fungsi ini akan menghapus likuiditas dan membayar kembali penyedia likuiditas.

```solidity
    // **** REMOVE LIQUIDITY **** // **** HAPUS LIKUIDITAS ****
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

Kasus paling sederhana dalam menghapus likuiditas. Ada jumlah minimum dari setiap token yang disetujui untuk diterima oleh penyedia likuiditas, dan itu harus terjadi sebelum tenggat waktu.

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // send liquidity to pair // kirim likuiditas ke pasangan
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

Fungsi `burn` dari kontrak inti menangani pembayaran kembali token kepada pengguna.

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

Ketika sebuah fungsi mengembalikan beberapa nilai, tetapi kita hanya tertarik pada beberapa di antaranya, beginilah cara kita hanya mendapatkan nilai-nilai tersebut. Ini agak lebih murah dalam hal gas daripada membaca sebuah nilai dan tidak pernah menggunakannya.

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

Terjemahkan jumlah dari cara kontrak inti mengembalikannya (token dengan alamat lebih rendah terlebih dahulu) ke cara yang diharapkan pengguna (sesuai dengan `tokenA` dan `tokenB`).

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

Tidak masalah untuk melakukan transfer terlebih dahulu dan kemudian memverifikasi bahwa itu sah, karena jika tidak, kita akan membatalkan (revert) semua perubahan status.

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

Menghapus likuiditas untuk ETH hampir sama, kecuali bahwa kita menerima token WETH dan kemudian menebusnya dengan ETH untuk dikembalikan kepada penyedia likuiditas.

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

Fungsi-fungsi ini meneruskan transaksi meta (meta-transactions) untuk memungkinkan pengguna tanpa ether menarik dana dari kolam, menggunakan [mekanisme permit](#UniswapV2ERC20).

```solidity

    // **** REMOVE LIQUIDITY (supporting fee-on-transfer tokens) **** // **** HAPUS LIKUIDITAS (mendukung token dengan biaya transfer) ****
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

Fungsi ini dapat digunakan untuk token yang memiliki biaya transfer atau penyimpanan. Ketika sebuah token memiliki biaya seperti itu, kita tidak dapat mengandalkan fungsi `removeLiquidity` untuk memberi tahu kita berapa banyak token yang kita dapatkan kembali, jadi kita perlu menariknya terlebih dahulu dan kemudian mendapatkan saldonya.

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

#### Perdagangan {#trade}

```solidity
    // **** SWAP **** // **** TUKAR ****
    // requires the initial amount to have already been sent to the first pair // mengharuskan jumlah awal sudah dikirim ke pasangan pertama
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

Fungsi ini melakukan pemrosesan internal yang diperlukan untuk fungsi-fungsi yang diekspos kepada pedagang.

```solidity
        for (uint i; i < path.length - 1; i++) {
```

Saat saya menulis ini, ada [388.160 token ERC-20](https://eth.blockscout.com/tokens). Jika ada pertukaran pasangan untuk setiap pasangan token, akan ada lebih dari 150 miliar pertukaran pasangan. Seluruh chain, pada saat ini, [hanya memiliki 0,1% dari jumlah akun tersebut](https://eth.blockscout.com/stats/accountsGrowth). Sebagai gantinya, fungsi tukar mendukung konsep jalur (path). Seorang pedagang dapat menukar A dengan B, B dengan C, dan C dengan D, sehingga tidak perlu ada pertukaran pasangan A-D secara langsung.

Harga di pasar-pasar ini cenderung tersinkronisasi, karena ketika tidak sinkron, hal itu menciptakan peluang untuk arbitrase. Bayangkan, misalnya, tiga token, A, B, dan C. Ada tiga pertukaran pasangan, satu untuk setiap pasangan.

1. Situasi awal
2. Seorang pedagang menjual 24.695 token A dan mendapatkan 25.305 token B.
3. Pedagang menjual 24.695 token B untuk 25.305 token C, menyimpan sekitar 0.61 token B sebagai keuntungan.
4. Kemudian pedagang menjual 24.695 token C untuk 25.305 token A, menyimpan sekitar 0.61 token C sebagai keuntungan. Pedagang juga memiliki 0.61 token A ekstra (25.305 yang akhirnya dimiliki pedagang, dikurangi investasi awal sebesar 24.695).

| Langkah | Pertukaran A-B              | Pertukaran B-C              | Pertukaran A-C              |
| ------- | --------------------------- | --------------------------- | --------------------------- |
| 1       | A:1000 B:1050 A/B=1.05      | B:1000 C:1050 B/C=1.05      | A:1050 C:1000 C/A=1.05      |
| 2       | A:1024.695 B:1024.695 A/B=1 | B:1000 C:1050 B/C=1.05      | A:1050 C:1000 C/A=1.05      |
| 3       | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1050 C:1000 C/A=1.05      |
| 4       | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1024.695 C:1024.695 C/A=1 |

```solidity
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
```

Dapatkan pasangan yang sedang kita tangani, urutkan (untuk digunakan dengan pasangan tersebut) dan dapatkan jumlah output yang diharapkan.

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

Dapatkan jumlah keluar yang diharapkan, diurutkan sesuai dengan yang diharapkan oleh pertukaran pasangan.

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

Apakah ini pertukaran terakhir? Jika ya, kirim token yang diterima untuk perdagangan ke tujuan. Jika tidak, kirimkan ke pertukaran pasangan berikutnya.

```solidity

            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

Benar-benar memanggil pertukaran pasangan untuk menukar token. Kita tidak memerlukan callback untuk diberi tahu tentang pertukaran tersebut, jadi kita tidak mengirim byte apa pun di bidang itu.

```solidity
    function swapExactTokensForTokens(
```

Fungsi ini digunakan secara langsung oleh pedagang untuk menukar satu token dengan token lainnya.

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

Parameter ini berisi alamat dari kontrak ERC-20. Seperti yang dijelaskan di atas, ini adalah sebuah array karena Anda mungkin perlu melalui beberapa pertukaran pasangan untuk mendapatkan aset yang Anda inginkan dari aset yang Anda miliki.

Parameter fungsi dalam solidity dapat disimpan baik di `memory` maupun `calldata`. Jika fungsi tersebut adalah titik masuk ke kontrak, dipanggil langsung dari pengguna (menggunakan transaksi) atau dari kontrak yang berbeda, maka nilai parameter dapat diambil langsung dari data panggilan (call data). Jika fungsi dipanggil secara internal, seperti `_swap` di atas, maka parameter harus disimpan di `memory`. Dari perspektif kontrak yang dipanggil, `calldata` bersifat hanya-baca (read only).

Dengan tipe skalar seperti `uint` atau `address`, kompiler menangani pilihan penyimpanan untuk kita, tetapi dengan array, yang lebih panjang dan lebih mahal, kita menentukan tipe penyimpanan yang akan digunakan.

```solidity
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
```

Nilai kembalian selalu dikembalikan di dalam memori.

```solidity
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
```

Hitung jumlah yang akan dibeli di setiap pertukaran. Jika hasilnya kurang dari minimum yang bersedia diterima oleh pedagang, batalkan (revert) transaksi tersebut.

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

Terakhir, transfer token ERC-20 awal ke akun untuk pertukaran pasangan pertama dan panggil `_swap`. Ini semua terjadi dalam transaksi yang sama, sehingga pertukaran pasangan tahu bahwa setiap token yang tidak terduga adalah bagian dari transfer ini.

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

Fungsi sebelumnya, `swapTokensForTokens`, memungkinkan seorang pedagang untuk menentukan jumlah pasti token input yang bersedia ia berikan dan jumlah minimum token output yang bersedia ia terima sebagai imbalannya. Fungsi ini melakukan pertukaran sebaliknya, ini memungkinkan seorang pedagang menentukan jumlah token output yang ia inginkan, dan jumlah maksimum token input yang bersedia ia bayarkan untuk itu.

Dalam kedua kasus tersebut, pedagang harus terlebih dahulu memberikan allowance (izin) kepada kontrak periphery ini agar dapat mentransfernya.

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
        // refund dust eth, if any // kembalikan sisa eth (dust), jika ada
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }
```

Keempat varian ini semuanya melibatkan perdagangan antara ETH dan token. Satu-satunya perbedaan adalah bahwa kita menerima ETH dari pedagang dan menggunakannya untuk melakukan mint WETH, atau kita menerima WETH dari pertukaran terakhir di jalur tersebut dan membakarnya, mengirimkan kembali ETH yang dihasilkan kepada pedagang.

```solidity
    // **** SWAP (supporting fee-on-transfer tokens) **** // **** TUKAR (mendukung token dengan biaya transfer) ****
    // requires the initial amount to have already been sent to the first pair // mengharuskan jumlah awal sudah dikirim ke pasangan pertama
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
            { // scope to avoid stack too deep errors // cakupan untuk menghindari kesalahan stack too deep
            (uint reserve0, uint reserve1,) = pair.getReserves();
            (uint reserveInput, uint reserveOutput) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
            amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
            amountOutput = UniswapV2Library.getAmountOut(amountInput, reserveInput, reserveOutput);
```

Karena adanya biaya transfer, kita tidak dapat mengandalkan fungsi `getAmountsOut` untuk memberi tahu kita berapa banyak yang kita dapatkan dari setiap transfer (seperti yang kita lakukan sebelum memanggil `_swap` yang asli). Sebagai gantinya, kita harus mentransfer terlebih dahulu dan kemudian melihat berapa banyak token yang kita dapatkan kembali.

Catatan: Secara teori kita bisa saja menggunakan fungsi ini alih-alih `_swap`, tetapi dalam kasus tertentu (misalnya, jika transfer akhirnya dibatalkan karena tidak ada cukup dana pada akhirnya untuk memenuhi minimum yang disyaratkan) itu akan berakhir dengan menghabiskan lebih banyak gas. Token dengan biaya transfer cukup langka, jadi meskipun kita perlu mengakomodasinya, tidak perlu semua pertukaran berasumsi bahwa mereka melalui setidaknya satu dari token tersebut.

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
    // **** LIBRARY FUNCTIONS **** // **** FUNGSI PUSTAKA ****
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

Fungsi-fungsi ini hanyalah proxy yang memanggil [fungsi UniswapV2Library](#uniswapV2library).

### UniswapV2Migrator.sol {#UniswapV2Migrator}

Kontrak ini digunakan untuk memigrasikan pertukaran dari v1 lama ke v2. Sekarang setelah mereka dimigrasikan, kontrak ini tidak lagi relevan.

## Pustaka {#libraries}

[Pustaka SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) didokumentasikan dengan baik, jadi tidak perlu mendokumentasikannya di sini.

### Math {#Math}

Pustaka ini berisi beberapa fungsi matematika yang biasanya tidak diperlukan dalam kode Solidity, sehingga tidak menjadi bagian dari bahasa tersebut.

```solidity
pragma solidity =0.5.16;

// a library for performing various math operations // pustaka untuk melakukan berbagai operasi matematika

library Math {
    function min(uint x, uint y) internal pure returns (uint z) {
        z = x < y ? x : y;
    }

    // babylonian method (https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method) // metode babilonia (https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
```

Mulai dengan x sebagai perkiraan yang lebih tinggi dari akar kuadrat (itulah alasan kita perlu memperlakukan 1-3 sebagai kasus khusus).

```solidity
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
```

Dapatkan perkiraan yang lebih dekat, rata-rata dari perkiraan sebelumnya dan angka yang akar kuadratnya sedang kita coba temukan dibagi dengan perkiraan sebelumnya. Ulangi hingga perkiraan baru tidak lebih rendah dari yang sudah ada. Untuk detail lebih lanjut, [lihat di sini](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method).

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

Kita seharusnya tidak pernah membutuhkan akar kuadrat dari nol. Akar kuadrat dari satu, dua, dan tiga kira-kira satu (kita menggunakan bilangan bulat, jadi kita mengabaikan pecahannya).

```solidity
        }
    }
}
```

### Pecahan Titik Tetap (UQ112x112) {#FixedPoint}

Pustaka ini menangani pecahan, yang biasanya bukan bagian dari aritmatika Ethereum. Ini dilakukan dengan menyandikan angka _x_ sebagai _x\*2^112_. Ini memungkinkan kita menggunakan opcode penambahan dan pengurangan asli tanpa perubahan.

```solidity
pragma solidity =0.5.16;

// a library for handling binary fixed point numbers (https://wikipedia.org/wiki/Q_(number_format)) // pustaka untuk menangani angka titik tetap biner (https://wikipedia.org/wiki/Q_(number_format))

// range: [0, 2**112 - 1] // rentang: [0, 2**112 - 1]
// resolution: 1 / 2**112 // resolusi: 1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112` adalah penyandian untuk satu.

```solidity
    // encode a uint112 as a UQ112x112 // menyandikan uint112 sebagai UQ112x112
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // never overflows // tidak pernah overflow
    }
```

Karena y adalah `uint112`, nilai maksimalnya adalah 2^112-1. Angka tersebut masih dapat disandikan sebagai `UQ112x112`.

```solidity
    // divide a UQ112x112 by a uint112, returning a UQ112x112 // membagi UQ112x112 dengan uint112, mengembalikan UQ112x112
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

Jika kita membagi dua nilai `UQ112x112`, hasilnya tidak lagi dikalikan dengan 2^112. Jadi sebagai gantinya kita mengambil bilangan bulat untuk penyebutnya. Kita akan membutuhkan trik serupa untuk melakukan perkalian, tetapi kita tidak perlu melakukan perkalian nilai `UQ112x112`.

### UniswapV2Library {#uniswapV2library}

Pustaka ini hanya digunakan oleh kontrak pinggiran (periphery)

```solidity
pragma solidity >=0.5.0;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import "./SafeMath.sol";

library UniswapV2Library {
    using SafeMath for uint;

    // returns sorted token addresses, used to handle return values from pairs sorted in this order // mengembalikan alamat token yang diurutkan, digunakan untuk menangani nilai kembalian dari pasangan yang diurutkan dalam urutan ini
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
```

Urutkan kedua token berdasarkan alamat, sehingga kita akan dapat memperoleh alamat pertukaran pasangan untuk keduanya. Ini diperlukan karena jika tidak, kita akan memiliki dua kemungkinan, satu untuk parameter A,B dan satu lagi untuk parameter B,A, yang mengarah ke dua pertukaran alih-alih satu.

```solidity
    // calculates the CREATE2 address for a pair without making any external calls // menghitung alamat CREATE2 untuk pasangan tanpa melakukan panggilan eksternal apa pun
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f' // init code hash // hash kode inisialisasi
            ))));
    }
```

Fungsi ini menghitung alamat pertukaran pasangan untuk kedua token. Kontrak ini dibuat menggunakan [opcode CREATE2](https://eips.ethereum.org/EIPS/eip-1014), sehingga kita dapat menghitung alamat menggunakan algoritma yang sama jika kita mengetahui parameter yang digunakannya. Ini jauh lebih murah daripada bertanya kepada pabrik (factory), dan

```solidity
    // fetches and sorts the reserves for a pair // mengambil dan mengurutkan cadangan untuk pasangan
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

Fungsi ini mengembalikan cadangan dari kedua token yang dimiliki oleh pertukaran pasangan. Perhatikan bahwa fungsi ini dapat menerima token dalam urutan apa pun, dan mengurutkannya untuk penggunaan internal.

```solidity
    // given some amount of an asset and pair reserves, returns an equivalent amount of the other asset // diberikan sejumlah aset dan cadangan pasangan, mengembalikan jumlah yang setara dari aset lainnya
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

Fungsi ini memberi Anda jumlah token B yang akan Anda dapatkan sebagai imbalan untuk token A jika tidak ada biaya yang terlibat. Perhitungan ini memperhitungkan bahwa transfer mengubah nilai tukar.

```solidity
    // given an input amount of an asset and pair reserves, returns the maximum output amount of the other asset // diberikan jumlah input aset dan cadangan pasangan, mengembalikan jumlah output maksimum dari aset lainnya
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
```

Fungsi `quote` di atas berfungsi dengan baik jika tidak ada biaya untuk menggunakan pertukaran pasangan. Namun, jika ada biaya pertukaran 0,3%, jumlah yang sebenarnya Anda dapatkan lebih rendah. Fungsi ini menghitung jumlah setelah biaya pertukaran.

```solidity

        require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }
```

Solidity tidak menangani pecahan secara bawaan, jadi kita tidak bisa begitu saja mengalikan jumlahnya dengan 0,997. Sebagai gantinya, kita mengalikan pembilang dengan 997 dan penyebut dengan 1000, mencapai efek yang sama.

```solidity
    // given an output amount of an asset and pair reserves, returns a required input amount of the other asset // diberikan jumlah output aset dan cadangan pasangan, mengembalikan jumlah input yang diperlukan dari aset lainnya
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
        require(amountOut > 0, 'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint numerator = reserveIn.mul(amountOut).mul(1000);
        uint denominator = reserveOut.sub(amountOut).mul(997);
        amountIn = (numerator / denominator).add(1);
    }
```

Fungsi ini melakukan hal yang kurang lebih sama, tetapi mendapatkan jumlah keluaran dan menyediakan masukannya.

```solidity

    // performs chained getAmountOut calculations on any number of pairs // melakukan perhitungan getAmountOut berantai pada sejumlah pasangan
    function getAmountsOut(address factory, uint amountIn, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        for (uint i; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
        }
    }

    // performs chained getAmountIn calculations on any number of pairs // melakukan perhitungan getAmountIn berantai pada sejumlah pasangan
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

Kedua fungsi ini menangani identifikasi nilai ketika perlu melalui beberapa pertukaran pasangan.

### Transfer Helper {#transfer-helper}

[Pustaka ini](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol) menambahkan pemeriksaan keberhasilan di sekitar transfer ERC-20 dan Ethereum untuk memperlakukan pengembalian (revert) dan pengembalian nilai `false` dengan cara yang sama.

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later // SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.0;

// helper methods for interacting with ERC20 tokens and sending ETH that do not consistently return true/false // metode pembantu untuk berinteraksi dengan token ERC20 dan mengirim ETH yang tidak secara konsisten mengembalikan true/false
library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)'))); // bytes4(keccak256(bytes('approve(address,uint256)')));
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

Demi kompatibilitas mundur dengan token yang dibuat sebelum standar ERC-20, panggilan ERC-20 dapat gagal baik dengan mengembalikan (dalam hal ini `success` adalah `false`) atau dengan berhasil dan mengembalikan nilai `false` (dalam hal ini ada data keluaran, dan jika Anda mendekodenya sebagai boolean, Anda mendapatkan `false`).

```solidity


    function safeTransfer(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transfer(address,uint256)'))); // bytes4(keccak256(bytes('transfer(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0xa9059cbb, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeTransfer: transfer failed'
        );
    }
```

Fungsi ini mengimplementasikan [fungsionalitas transfer ERC-20](https://eips.ethereum.org/EIPS/eip-20#transfer), yang memungkinkan sebuah akun untuk menghabiskan jatah yang disediakan oleh akun yang berbeda.

```solidity

    function safeTransferFrom(
        address token,
        address from,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transferFrom(address,address,uint256)'))); // bytes4(keccak256(bytes('transferFrom(address,address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x23b872dd, from, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::transferFrom: transferFrom failed'
        );
    }
```

Fungsi ini mengimplementasikan [fungsionalitas transferFrom ERC-20](https://eips.ethereum.org/EIPS/eip-20#transferfrom), yang memungkinkan sebuah akun untuk menghabiskan jatah yang disediakan oleh akun yang berbeda.

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

Fungsi ini mentransfer ether ke sebuah akun. Panggilan apa pun ke kontrak yang berbeda dapat mencoba mengirim ether. Karena kita tidak perlu benar-benar memanggil fungsi apa pun, kita tidak mengirim data apa pun dengan panggilan tersebut.

## Kesimpulan {#conclusion}

Ini adalah artikel panjang sekitar 50 halaman. Jika Anda berhasil sampai di sini, selamat! Semoga sekarang Anda telah memahami pertimbangan dalam menulis aplikasi di kehidupan nyata (berbeda dengan program sampel pendek) dan lebih mampu menulis kontrak untuk kasus penggunaan Anda sendiri.

Sekarang pergilah dan tulis sesuatu yang berguna dan buat kami takjub.

[Lihat di sini untuk karya saya yang lain](https://cryptodocguy.pro/).