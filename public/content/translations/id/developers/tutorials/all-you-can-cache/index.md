---
title: "Semua yang dapat Anda cache"
description: Pelajari cara membuat dan menggunakan kontrak caching untuk transaksi rollup yang lebih murah
author: Ori Pomerantz
tags: [ "layer 2", "caching", "penyimpanan" ]
skill: intermediate
published: 2022-09-15
lang: id
---

Ketika menggunakan rollup, biaya per bita dalam transaksi jauh lebih mahal daripada biaya slot penyimpanan. Oleh karena itu, masuk akal untuk menyimpan informasi sebanyak mungkin secara on-chain.

Dalam artikel ini, Anda akan mempelajari cara membuat dan menggunakan kontrak caching sedemikian rupa sehingga setiap nilai parameter yang kemungkinan besar akan digunakan beberapa kali akan disimpan di cache dan tersedia untuk digunakan (setelah penggunaan pertama kali) dengan jumlah bita yang jauh lebih kecil, dan cara menulis kode off-chain yang menggunakan cache ini.

Jika Anda ingin melewati artikel ini dan hanya melihat kode sumbernya, [ada di sini](https://github.com/qbzzt/20220915-all-you-can-cache). Tumpukan pengembangan adalah [Foundry](https://getfoundry.sh/introduction/installation/).

## Desain keseluruhan {#overall-design}

Demi kesederhanaan, kami akan berasumsi bahwa semua parameter transaksi adalah `uint256`, dengan panjang 32 bita. Ketika kami menerima transaksi, kami akan mengurai setiap parameter seperti ini:

1. Jika bita pertama adalah `0xFF`, ambil 32 bita berikutnya sebagai nilai parameter dan tuliskan ke cache.

2. Jika bita pertama adalah `0xFE`, ambil 32 bita berikutnya sebagai nilai parameter tetapi _jangan_ menuliskannya ke cache.

3. Untuk nilai lainnya, ambil empat bit teratas sebagai jumlah bita tambahan, dan empat bit terbawah sebagai bit paling signifikan dari kunci cache. Berikut ini beberapa contohnya:

   | Bita dalam calldata | Kunci cache |
   | :------------------ | ----------: |
   | 0x0F                |        0x0F |
   | 0x10,0x10           |        0x10 |
   | 0x12,0xAC           |      0x02AC |
   | 0x2D,0xEA, 0xD6     |    0x0DEAD6 |

## Manipulasi cache {#cache-manipulation}

Cache diimplementasikan di [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol). Mari kita bahas baris per baris.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

Konstanta ini digunakan untuk menginterpretasikan kasus-kasus khusus ketika kami menyediakan semua informasi dan ingin informasi tersebut ditulis ke dalam cache atau tidak. Menulis ke dalam cache memerlukan dua operasi [`SSTORE`](https://www.evm.codes/#55) ke dalam slot penyimpanan yang sebelumnya tidak digunakan dengan biaya masing-masing 22100 gas, jadi kami menjadikannya opsional.

```solidity

    mapping(uint => uint) public val2key;
```

[Pemetaan](https://www.geeksforgeeks.org/solidity/solidity-mappings/) antara nilai dan kuncinya. Informasi ini diperlukan untuk menyandikan nilai sebelum Anda mengirimkan transaksi.

```solidity
    // Lokasi n memiliki nilai untuk kunci n+1, karena kita perlu mempertahankan
    // nol sebagai "tidak ada dalam cache".
    uint[] public key2val;
```

Kita dapat menggunakan larik untuk pemetaan dari kunci ke nilai karena kita menetapkan kuncinya, dan demi kesederhanaan, kita melakukannya secara berurutan.

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Membaca entri cache yang tidak diinisialisasi");
        return key2val[_key-1];
    }  // cacheRead
```

Membaca nilai dari cache.

```solidity
    // Tulis nilai ke cache jika belum ada di sana
    // Publik hanya untuk mengaktifkan pengujian agar berfungsi
    function cacheWrite(uint _value) public returns (uint) {
        // Jika nilai sudah ada di cache, kembalikan kunci saat ini
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

Tidak ada gunanya memasukkan nilai yang sama ke dalam cache lebih dari sekali. Jika nilai sudah ada, cukup kembalikan kunci yang ada.

```solidity
        // Karena 0xFE adalah kasus khusus, kunci terbesar yang dapat disimpan oleh cache adalah
        // 0x0D diikuti oleh 15 buah 0xFF. Jika panjang cache sudah sebesar itu,
        // maka akan gagal.
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "luapan cache");
```

Saya rasa kita tidak akan pernah mendapatkan cache sebesar itu (sekitar 1,8\*10<sup>37</sup> entri, yang akan memerlukan sekitar 10<sup>27</sup> TB untuk disimpan). Namun, saya sudah cukup tua untuk mengingat ["640kB akan selalu cukup"](https://quoteinvestigator.com/2011/09/08/640k-enough/). Pengujian ini sangat murah.

```solidity
        // Tulis nilai menggunakan kunci berikutnya
        val2key[_value] = key2val.length+1;
```

Tambahkan pencarian terbalik (dari nilai ke kunci).

```solidity
        key2val.push(_value);
```

Tambahkan pencarian maju (dari kunci ke nilai). Karena kami menetapkan nilai secara berurutan, kami bisa menambahkannya setelah nilai larik terakhir.

```solidity
        return key2val.length;
    }  // cacheWrite
```

Kembalikan panjang baru dari `key2val`, yang merupakan sel tempat nilai baru disimpan.

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

Fungsi ini membaca nilai dari calldata dengan panjang arbitrer (hingga 32 bita, ukuran kata).

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "Batas panjang _calldataVal adalah 32 bita");
        require(length + startByte <= msg.data.length,
            "_calldataVal mencoba membaca melebihi calldatasize");
```

Fungsi ini bersifat internal, jadi jika sisa kode ditulis dengan benar, pengujian ini tidak diperlukan. Namun, biayanya tidak mahal, jadi sebaiknya kita memilikinya.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Kode ini ada di [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html). Fungsi ini membaca nilai 32 bita dari calldata. Ini berfungsi bahkan jika calldata berhenti sebelum `startByte+32` karena ruang yang tidak diinisialisasi di EVM dianggap nol.

```solidity
        _retVal = _retVal >> (256-length*8);
```

Kita tidak selalu menginginkan nilai 32 bita. Ini akan menyingkirkan bita berlebih.

```solidity
        return _retVal;
    } // _calldataVal


    // Baca satu parameter dari calldata, dimulai dari _fromByte
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

Baca satu parameter dari calldata. Perhatikan bahwa kita tidak hanya perlu mengembalikan nilai yang kita baca, tetapi juga lokasi bita berikutnya karena parameter dapat berkisar dari panjang 1 bita hingga 33 bita.

```solidity
        // Bita pertama memberitahu kita cara menginterpretasikan sisanya
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidity mencoba mengurangi jumlah bug dengan melarang [konversi tipe implisit](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions) yang berpotensi berbahaya. Penurunan tingkat, misalnya dari 256 bit menjadi 8 bit, harus dilakukan secara eksplisit.

```solidity

        // Baca nilai, tetapi jangan menuliskannya ke cache
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // Baca nilai, dan tuliskan ke cache
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // Jika kita sampai di sini, itu berarti kita perlu membaca dari cache

        // Jumlah bita tambahan untuk dibaca
        uint8 _extraBytes = _firstByte / 16;
```

Ambil [nibble](https://en.wikipedia.org/wiki/Nibble) yang lebih rendah dan gabungkan dengan bita lain untuk membaca nilai dari cache.

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // Baca n parameter (fungsi tahu berapa banyak parameter yang mereka harapkan)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

Kita dapat memperoleh jumlah parameter yang kita miliki dari calldata itu sendiri, tetapi fungsi yang memanggil kita tahu berapa banyak parameter yang mereka harapkan. Lebih mudah membiarkan mereka yang memberi tahu kita.

```solidity
        // Parameter yang kita baca
        uint[] memory params = new uint[](_paramNum);

        // Parameter dimulai pada bita 4, sebelumnya adalah tanda tangan fungsi
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

Baca parameter hingga Anda memiliki jumlah yang Anda butuhkan. Jika kita melewati akhir calldata, `_readParams` akan mengembalikan panggilan tersebut.

```solidity

        return(params);
    }   // readParams

    // Untuk menguji _readParams, uji pembacaan empat parameter
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam
```

Salah satu keuntungan besar dari Foundry adalah memungkinkan penulisan pengujian dalam Solidity ([lihat Menguji cache di bawah](#testing-the-cache)). Ini membuat pengujian unit menjadi jauh lebih mudah. Ini adalah fungsi yang membaca empat parameter dan mengembalikannya sehingga pengujian dapat memverifikasi kebenarannya.

```solidity
    // Dapatkan nilai, kembalikan bita yang akan menyandikannya (menggunakan cache jika memungkinkan)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal` adalah fungsi yang dipanggil oleh kode off-chain untuk membantu membuat calldata yang menggunakan cache. Ini menerima nilai tunggal dan mengembalikan bita yang menyandikannya. Fungsi ini adalah sebuah `view`, jadi tidak memerlukan transaksi dan ketika dipanggil secara eksternal tidak memerlukan biaya gas.

```solidity
        uint _key = val2key[_val];

        // Nilai belum ada di cache, tambahkan
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

Di [EVM](/developers/docs/evm/), semua penyimpanan yang tidak diinisialisasi diasumsikan sebagai nol. Jadi, jika kita mencari kunci untuk nilai yang tidak ada, kita akan mendapatkan nol. Dalam kasus tersebut, bita yang menyandikannya adalah `INTO_CACHE` (sehingga akan disimpan di cache lain kali), diikuti oleh nilai sebenarnya.

```solidity
        // Jika kuncinya <0x10, kembalikan sebagai bita tunggal
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

Bita tunggal adalah yang paling mudah. Kita hanya menggunakan [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat) untuk mengubah tipe `bytes<n>` menjadi larik bita yang dapat memiliki panjang berapa pun. Meskipun namanya demikian, ini berfungsi dengan baik ketika hanya diberikan satu argumen.

```solidity
        // Nilai dua bita, disandikan sebagai 0x1vvv
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

Ketika kita memiliki kunci yang kurang dari 16<sup>3</sup>, kita dapat mengekspresikannya dalam dua bita. Pertama-tama kita ubah _key, yang merupakan nilai 256 bit, menjadi nilai 16 bit dan menggunakan logika ATAU untuk menambahkan jumlah bita tambahan ke bita pertama. Kemudian kita masukkan ke dalam nilai `bytes2`, yang dapat diubah menjadi `bytes`.

```solidity
        // Mungkin ada cara cerdas untuk melakukan baris-baris berikut sebagai perulangan,
        // tetapi ini adalah fungsi view jadi saya mengoptimalkan untuk waktu programmer dan
        // kesederhanaan.

        if (_key < 16*256**2)
            return bytes.concat(bytes3(uint24(_key) | (0x2 * 16 * 256**2)));
        if (_key < 16*256**3)
            return bytes.concat(bytes4(uint32(_key) | (0x3 * 16 * 256**3)));
             .
             .
             .
        if (_key < 16*256**14)
            return bytes.concat(bytes15(uint120(_key) | (0xE * 16 * 256**14)));
        if (_key < 16*256**15)
            return bytes.concat(bytes16(uint128(_key) | (0xF * 16 * 256**15)));
```

Nilai lainnya (3 bita, 4 bita, dll.) ditangani dengan cara yang sama, hanya dengan ukuran bidang yang berbeda.

```solidity
        // Jika kita sampai di sini, ada sesuatu yang salah.
        revert("Kesalahan di encodeVal, seharusnya tidak terjadi");
```

Jika kita sampai di sini, itu berarti kita mendapatkan kunci yang tidak kurang dari 16\*256<sup>15</sup>. Tetapi `cacheWrite` membatasi kunci sehingga kita bahkan tidak bisa mencapai 14\*256<sup>16</sup> (yang akan memiliki bita pertama 0xFE, sehingga akan terlihat seperti `DONT_CACHE`). Tetapi tidak ada salahnya menambahkan pengujian seandainya programmer di masa depan memperkenalkan bug.

```solidity
    } // encodeVal

}  // Cache
```

### Menguji cache {#testing-the-cache}

Salah satu keunggulan Foundry adalah [memungkinkan Anda menulis pengujian di Solidity](https://getfoundry.sh/forge/tests/overview/), yang membuatnya lebih mudah untuk menulis pengujian unit. Pengujian untuk kelas `Cache` ada [di sini](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol). Karena kode pengujian bersifat repetitif, sebagaimana umumnya pengujian, artikel ini hanya menjelaskan bagian-bagian yang menarik.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// Perlu menjalankan `forge test -vv` untuk konsol.
import "forge-std/console.sol";
```

Ini hanyalah boilerplate yang diperlukan untuk menggunakan paket pengujian dan `console.log`.

```solidity
import "src/Cache.sol";
```

Kita perlu tahu kontrak yang sedang kita uji.

```solidity
contract CacheTest is Test {
    Cache cache;

    function setUp() public {
        cache = new Cache();
    }
```

Fungsi `setUp` dipanggil sebelum setiap pengujian. Dalam kasus ini, kita hanya membuat cache baru, sehingga pengujian kita tidak akan saling memengaruhi.

```solidity
    function testCaching() public {
```

Pengujian adalah fungsi yang namanya diawali dengan `test`. Fungsi ini memeriksa fungsionalitas dasar cache, menulis nilai dan membacanya kembali.

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

Beginilah cara Anda melakukan pengujian yang sebenarnya, menggunakan [fungsi `assert...`](https://getfoundry.sh/reference/forge-std/std-assertions/). Dalam kasus ini, kami memeriksa bahwa nilai yang kami tulis adalah nilai yang kami baca. Kita dapat membuang hasil dari `cache.cacheWrite` karena kita tahu bahwa kunci cache ditetapkan secara linear.

```solidity
        }
    }    // testCaching


    // Cache nilai yang sama beberapa kali, pastikan kunci tetap
    // sama
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

Pertama, kita menulis setiap nilai dua kali ke cache dan memastikan kuncinya sama (artinya penulisan kedua tidak benar-benar terjadi).

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

Secara teori, mungkin ada bug yang tidak memengaruhi penulisan cache secara berurutan. Jadi di sini kita melakukan beberapa penulisan yang tidak berurutan dan melihat nilainya masih belum ditulis ulang.

```solidity
    // Baca uint dari buffer memori (untuk memastikan kita mendapatkan kembali parameter
    // yang kita kirimkan)
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

Baca kata 256-bit dari buffer `bytes memory`. Fungsi utilitas ini memungkinkan kita memverifikasi bahwa kita menerima hasil yang benar ketika kita menjalankan panggilan fungsi yang menggunakan cache.

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_diLuarBatas");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yul tidak mendukung struktur data di luar `uint256`, jadi ketika Anda merujuk ke struktur data yang lebih canggih, seperti buffer memori `_bytes`, Anda mendapatkan alamat dari struktur tersebut. Solidity menyimpan nilai `bytes memory` sebagai kata 32 bita yang berisi panjangnya, diikuti oleh bita yang sebenarnya, jadi untuk mendapatkan bita nomor `_start` kita perlu menghitung `_bytes+32+_start`.

```solidity

        return tempUint;
    }     // toUint256

    // Tanda tangan fungsi untuk fourParams(), berkat
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // Hanya beberapa nilai konstan untuk melihat kita mendapatkan kembali nilai yang benar
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

Beberapa konstanta yang kita perlukan untuk pengujian.

```solidity
    function testReadParam() public {
```

Panggil `fourParams()`, fungsi yang menggunakan `readParams`, untuk menguji apakah kita dapat membaca parameter dengan benar.

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

Kita tidak dapat menggunakan mekanisme ABI normal untuk memanggil fungsi yang menggunakan cache, jadi kita perlu menggunakan mekanisme tingkat rendah [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses). Mekanisme itu mengambil `bytes memory` sebagai input, dan mengembalikannya (serta nilai Boolean) sebagai output.

```solidity
        // Panggilan pertama, cache kosong
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

Sangat berguna jika kontrak yang sama mendukung fungsi yang di-cache (untuk panggilan langsung dari transaksi) dan fungsi yang tidak di-cache (untuk panggilan dari kontrak pintar lain). Untuk melakukannya, kita harus terus mengandalkan mekanisme Solidity untuk memanggil fungsi yang benar, daripada memasukkan semuanya ke dalam [fungsi `fallback`](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function). Melakukan ini membuat komposabilitas jauh lebih mudah. Satu bita saja sudah cukup untuk mengidentifikasi fungsi dalam banyak kasus, jadi kita membuang-buang tiga bita (16\*3=48 gas). Namun, saat saya menulis ini, 48 gas tersebut berharga 0,07 sen, yang merupakan biaya yang wajar untuk kode yang lebih sederhana dan tidak terlalu rentan terhadap bug.

```solidity
            // Nilai pertama, tambahkan ke cache
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

Nilai pertama: Bendera yang menyatakan ini adalah nilai penuh yang perlu ditulis ke cache, diikuti oleh 32 bita dari nilai tersebut. Tiga nilai lainnya serupa, kecuali bahwa `VAL_B` tidak ditulis ke cache dan `VAL_C` adalah parameter ketiga dan keempat.

```solidity
             .
             .
             .
        );
        (_success, _callOutput) = _cacheAddr.call(_callInput);
```

Di sinilah kita benar-benar memanggil kontrak `Cache`.

```solidity
        assertEq(_success, true);
```

Kami berharap panggilan ini akan berhasil.

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

Kita mulai dengan cache kosong dan kemudian menambahkan `VAL_A` diikuti oleh `VAL_C`. Kami berharap yang pertama memiliki kunci 1, dan yang kedua memiliki kunci 2.

```
        assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

Outputnya adalah empat parameter. Di sini kami memverifikasi bahwa itu benar.

```solidity
        // Panggilan kedua, kita dapat menggunakan cache
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Nilai pertama di Cache
            bytes1(0x01),
```

Kunci cache di bawah 16 hanya satu bita.

```solidity
            // Nilai kedua, jangan tambahkan ke cache
            cache.DONT_CACHE(),
            bytes32(VAL_B),

            // Nilai ketiga dan keempat, nilai yang sama
            bytes1(0x02),
            bytes1(0x02)
        );
        .
        .
        .
    }   // testReadParam
```

Pengujian setelah panggilan identik dengan pengujian setelah panggilan pertama.

```solidity
    function testEncodeVal() public {
```

Fungsi ini mirip dengan `testReadParam`, kecuali bahwa alih-alih menulis parameter secara eksplisit, kita menggunakan `encodeVal()`.

```solidity
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(VAL_A),
            cache.encodeVal(VAL_B),
            cache.encodeVal(VAL_C),
            cache.encodeVal(VAL_D)
        );
        .
        .
        .
        assertEq(_callInput.length, 4+1*4);
    }   // testEncodeVal
```

Satu-satunya pengujian tambahan di `testEncodeVal()` adalah untuk memverifikasi bahwa panjang `_callInput` sudah benar. Untuk panggilan pertama, nilainya adalah 4+33\*4. Untuk panggilan kedua, di mana setiap nilai sudah ada di dalam cache, nilainya adalah 4+1\*4.

```solidity
    // Uji encodeVal ketika kuncinya lebih dari satu bita
    // Maksimum tiga bita karena mengisi cache hingga empat bita membutuhkan
    // waktu terlalu lama.
    function testEncodeValBig() public {
        // Masukkan sejumlah nilai ke dalam cache.
        // Agar tetap sederhana, gunakan kunci n untuk nilai n.
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

Fungsi `testEncodeVal` di atas hanya menulis empat nilai ke dalam cache, jadi [bagian dari fungsi yang menangani nilai multi-bita](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171) tidak diperiksa. Tetapi kode itu rumit dan rentan terhadap kesalahan.

Bagian pertama dari fungsi ini adalah sebuah perulangan yang menulis semua nilai dari 1 sampai 0x1FFF ke cache secara berurutan, sehingga kita bisa menyandikan nilai-nilai tersebut dan mengetahui ke mana nilai tersebut pergi.

```solidity
        .
        .
        .

        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(0x000F),   // Satu bita        0x0F
            cache.encodeVal(0x0010),   // Dua bita     0x1010
            cache.encodeVal(0x0100),   // Dua bita     0x1100
            cache.encodeVal(0x1000)    // Tiga bita 0x201000
        );
```

Menguji nilai satu bita, dua bita, dan tiga bita. Kami tidak menguji lebih dari itu karena akan membutuhkan waktu yang terlalu lama untuk menulis cukup banyak entri stack (setidaknya 0x10000000, sekitar seperempat miliar).

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // Uji apa yang terjadi dengan buffer yang terlalu kecil, kita mendapatkan revert
    function testShortCalldata() public {
```

Menguji apa yang terjadi dalam kasus abnormal di mana tidak ada cukup parameter.

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata
```

Karena ini dikembalikan, hasil yang seharusnya kita dapatkan adalah `false`.

```
    // Panggil dengan kunci cache yang tidak ada
    function testNoCacheKey() public {
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Nilai pertama, tambahkan ke cache
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // Nilai kedua
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

Fungsi ini mendapatkan empat parameter yang sah, kecuali bahwa cache kosong sehingga tidak ada nilai yang dapat dibaca.

```solidity
        .
        .
        .
    // Uji apa yang terjadi dengan buffer yang terlalu panjang, semuanya berfungsi dengan baik
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // Panggilan pertama, cache kosong
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Nilai pertama, tambahkan ke cache
            cache.INTO_CACHE(), bytes32(VAL_A),

            // Nilai kedua, tambahkan ke cache
            cache.INTO_CACHE(), bytes32(VAL_B),

            // Nilai ketiga, tambahkan ke cache
            cache.INTO_CACHE(), bytes32(VAL_C),

            // Nilai keempat, tambahkan ke cache
            cache.INTO_CACHE(), bytes32(VAL_D),

            // Dan nilai lain untuk "keberuntungan"
            bytes4(0x31112233)
        );
```

Fungsi ini mengirimkan lima nilai. Kita tahu bahwa nilai kelima diabaikan karena bukan entri cache yang valid, yang akan menyebabkan pengembalian jika tidak disertakan.

```solidity
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        .
        .
        .
    }   // testLongCalldata

}        // CacheTest

```

## Aplikasi contoh {#a-sample-app}

Menulis pengujian di Solidity sangat bagus, tetapi pada akhirnya, sebuah dapp perlu dapat memproses permintaan dari luar rantai agar berguna. Artikel ini mendemonstrasikan cara menggunakan caching dalam dapp dengan WORM, yang merupakan singkatan dari "Write Once, Read Many" (Tulis Sekali, Baca Banyak). Jika sebuah kunci belum ditulis, Anda dapat menulis nilai padanya. Jika kuncinya sudah ditulis, Anda akan mendapatkan pengembalian.

### Kontrak {#the-contract}

[Ini adalah kontraknya](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol). Ini sebagian besar mengulangi apa yang telah kami lakukan dengan `Cache` dan `CacheTest`, jadi kami hanya akan membahas bagian-bagian yang menarik.

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

Cara termudah untuk menggunakan `Cache` adalah dengan mewarisinya di dalam kontrak kita sendiri.

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached
```

Fungsi ini mirip dengan `fourParam` di `CacheTest` di atas. Karena kita tidak mengikuti spesifikasi ABI, yang terbaik adalah tidak mendeklarasikan parameter apa pun ke dalam fungsi.

```solidity
    // Mempermudah pemanggilan kami
    // Tanda tangan fungsi untuk writeEntryCached(), berkat
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

Kode eksternal yang memanggil `writeEntryCached` harus secara manual membangun calldata, alih-alih menggunakan `worm.writeEntryCached`, karena kita tidak mengikuti spesifikasi ABI. Memiliki nilai konstan ini hanya membuatnya lebih mudah untuk menuliskannya.

Perhatikan bahwa meskipun kami mendefinisikan `WRITE_ENTRY_CACHED` sebagai variabel state, untuk membacanya secara eksternal perlu menggunakan fungsi getter-nya, `worm.WRITE_ENTRY_CACHED()`.

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

Fungsi baca adalah `view`, sehingga tidak memerlukan transaksi dan tidak memerlukan biaya gas. Akibatnya, tidak ada manfaatnya menggunakan cache untuk parameter tersebut. Dengan fungsi view, sebaiknya menggunakan mekanisme standar yang lebih sederhana.

### Kode pengujian {#the-testing-code}

[Ini adalah kode pengujian untuk kontrak](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol). Sekali lagi, mari kita lihat apa yang menarik saja.

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entri sudah ditulis"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[Ini (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert) adalah cara kami menentukan dalam pengujian Foundry bahwa panggilan berikutnya harus gagal, dan alasan yang dilaporkan untuk kegagalan. Ini berlaku ketika kita menggunakan sintaks `<contract>.<function name>()` daripada membangun calldata dan memanggil kontrak menggunakan antarmuka tingkat rendah (`<contract>.call()`, dll.).

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

Di sini kita menggunakan fakta bahwa `cacheWrite` mengembalikan kunci cache. Ini bukanlah sesuatu yang kita harapkan untuk digunakan dalam produksi, karena `cacheWrite` mengubah state, dan oleh karena itu hanya dapat dipanggil selama transaksi. Transaksi tidak memiliki nilai kembalian, jika memiliki hasil, hasil tersebut seharusnya dipancarkan sebagai peristiwa. Jadi, nilai kembalian `cacheWrite` hanya dapat diakses dari kode on-chain, dan kode on-chain tidak memerlukan caching parameter.

```solidity
        (_success,) = address(worm).call(_callInput);
```

Ini adalah cara kita memberi tahu Solidity bahwa meskipun `<alamat kontrak>.call()` memiliki dua nilai kembalian, kita hanya peduli dengan nilai yang pertama.

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

Karena kita menggunakan fungsi tingkat rendah `<address>.call()`, kita tidak dapat menggunakan `vm.expectRevert()` dan harus melihat nilai boolean keberhasilan yang kita dapatkan dari panggilan tersebut.

```solidity
    event EntryWritten(uint indexed key, uint indexed value);

        .
        .
        .

        _callInput = bytes.concat(
            worm.WRITE_ENTRY_CACHED(), worm.encodeVal(a), worm.encodeVal(b));
        vm.expectEmit(true, true, false, false);
        emit EntryWritten(a, b);
        (_success,) = address(worm).call(_callInput);
```

Ini adalah cara kami memverifikasi bahwa kode [memancarkan peristiwa dengan benar](https://getfoundry.sh/reference/cheatcodes/expect-emit/) di Foundry.

### Klien {#the-client}

Satu hal yang tidak Anda dapatkan dari pengujian Solidity adalah kode JavaScript yang dapat Anda potong dan tempelkan ke dalam aplikasi Anda sendiri. Untuk menulis kode itu, saya menerapkan WORM ke [Optimism Goerli](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli), testnet baru [Optimism](https://www.optimism.io/). Alamatnya ada di [`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a).

[Anda dapat melihat kode JavaScript untuk klien di sini](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js). Untuk menggunakannya:

1. Kloning repositori git:

   ```sh
   git clone https://github.com/qbzzt/20220915-all-you-can-cache.git
   ```

2. Instal paket yang diperlukan:

   ```sh
   cd javascript
   yarn
   ```

3. Salin file konfigurasi:

   ```sh
   cp .env.example .env
   ```

4. Edit `.env` untuk konfigurasi Anda:

   | Parameter                                                     | Nilai                                                                                                                                                                                                                     |
   | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | MNEMONIC                                                      | Mnemonik untuk akun yang memiliki ETH yang cukup untuk membayar sebuah transaksi. [Anda bisa mendapatkan ETH gratis untuk jaringan Optimism Goerli di sini](https://optimismfaucet.xyz/). |
   | OPTIMISM_GOERLI_URL | URL ke Optimism Goerli. Titik akhir publik, `https://goerli.optimism.io`, memiliki pembatasan laju tetapi cukup untuk apa yang kita butuhkan di sini                                                      |

5. Jalankan `index.js`.

   ```sh
   node index.js
   ```

   Aplikasi contoh ini pertama-tama menulis entri ke WORM, menampilkan calldata dan tautan ke transaksi di Etherscan. Kemudian ia membaca kembali entri tersebut, dan menampilkan kunci yang digunakannya dan nilai-nilai dalam entri tersebut (nilai, nomor blok, dan penulis).

Sebagian besar klien adalah JavaScript Dapp normal. Jadi, sekali lagi, kami hanya akan membahas bagian-bagian yang menarik.

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // Perlu kunci baru setiap saat
    const key = await worm.encodeVal(Number(new Date()))
```

Slot tertentu hanya dapat ditulis sekali, jadi kami menggunakan stempel waktu untuk memastikan kami tidak menggunakan kembali slot.

```javascript
const val = await worm.encodeVal("0x600D")

// Tulis sebuah entri
const calldata = func + key.slice(2) + val.slice(2)
```

Ethers mengharapkan data panggilan berupa string heksadesimal, `0x` diikuti dengan jumlah digit heksadesimal genap. Karena `key` dan `val` keduanya diawali dengan `0x`, kita perlu menghapus header tersebut.

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

Seperti halnya kode pengujian Solidity, kita tidak dapat memanggil fungsi yang di-cache secara normal. Sebagai gantinya, kita perlu menggunakan mekanisme tingkat yang lebih rendah.

```javascript
    .
    .
    .
    // Baca entri yang baru saja ditulis
    const realKey = '0x' + key.slice(4)  // hapus bendera FF
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

Untuk membaca entri, kita dapat menggunakan mekanisme normal. Tidak perlu menggunakan caching parameter dengan fungsi `view`.

## Kesimpulan {#conclusion}

Kode dalam artikel ini adalah bukti konsep, tujuannya adalah untuk membuat ide mudah dimengerti. Untuk sistem yang siap produksi, Anda mungkin ingin mengimplementasikan beberapa fungsionalitas tambahan:

- Menangani nilai yang bukan `uint256`. Contohnya, string.
- Daripada cache global, mungkin ada pemetaan antara pengguna dan cache. Pengguna yang berbeda menggunakan nilai yang berbeda.
- Nilai yang digunakan untuk alamat berbeda dengan nilai yang digunakan untuk tujuan lain. Mungkin masuk akal untuk memiliki cache terpisah hanya untuk alamat.
- Saat ini, kunci cache menggunakan algoritme "siapa cepat dia dapat, kunci terkecil". Enam belas nilai pertama dapat dikirim sebagai satu bita. 4080 nilai berikutnya dapat dikirim sebagai dua bita. Sekitar satu juta nilai berikutnya adalah tiga bita, dll. Sistem produksi harus menyimpan penghitung penggunaan pada entri cache dan mengaturnya kembali sehingga enam belas nilai _paling umum_ adalah satu bita, 4080 nilai paling umum berikutnya dua bita, dan seterusnya.

  Namun, itu adalah operasi yang berpotensi berbahaya. Bayangkan urutan peristiwa berikut ini:

  1. Noam Naive memanggil `encodeVal` untuk menyandikan alamat tujuan pengiriman tokennya. Alamat tersebut adalah salah satu yang pertama kali digunakan pada aplikasi, sehingga nilai yang dikodekan adalah 0x06. Ini adalah fungsi `view`, bukan transaksi, jadi ini adalah antara Noam dan node yang dia gunakan, dan tidak ada orang lain yang mengetahuinya

  2. Owen Owner menjalankan operasi pengurutan ulang cache. Sangat sedikit orang yang benar-benar menggunakan alamat tersebut, sehingga sekarang dikodekan sebagai 0x201122. Nilai yang berbeda, 10<sup>18</sup>, diberikan 0x06.

  3. Noam Naive mengirimkan tokennya ke 0x06. Token tersebut masuk ke alamat `0x0000000000000000000000000de0b6b3a7640000`, dan karena tidak ada yang tahu kunci privat untuk alamat tersebut, token-token itu hanya terjebak di sana. Noam _tidak senang_.

  Ada cara untuk mengatasi masalah ini, dan masalah terkait transaksi yang ada di Kolam Memori selama pengurutan ulang cache, tetapi Anda harus menyadarinya.

Saya mendemonstrasikan caching di sini dengan Optimism, karena saya adalah karyawan Optimism dan ini adalah rollup yang paling saya kenal. Namun, ini seharusnya berfungsi dengan rollup apa pun yang membebankan biaya minimal untuk pemrosesan internal, sehingga jika dibandingkan, penulisan data transaksi ke L1 adalah biaya utama.

[Lihat di sini untuk lebih banyak pekerjaan saya](https://cryptodocguy.pro/).

