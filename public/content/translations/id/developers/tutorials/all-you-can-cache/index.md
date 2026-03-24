---
title: "Semua yang dapat Anda cache"
description: Pelajari cara membuat dan menggunakan kontrak caching untuk transaksi rollup yang lebih murah
author: Ori Pomerantz
tags: ["layer 2", "caching", "penyimpanan", "peningkatan"]
skill: intermediate
published: 2022-09-15
lang: id
---

Saat menggunakan rollup, biaya satu byte dalam transaksi jauh lebih mahal daripada biaya slot penyimpanan. Oleh karena itu, masuk akal untuk melakukan cache sebanyak mungkin informasi secara onchain.

Dalam artikel ini Anda akan mempelajari cara membuat dan menggunakan kontrak caching sedemikian rupa sehingga setiap nilai parameter yang kemungkinan akan digunakan berkali-kali akan di-cache dan tersedia untuk digunakan (setelah pertama kali) dengan jumlah byte yang jauh lebih kecil, dan cara menulis kode offchain yang menggunakan cache ini.

Jika Anda ingin melewati artikel ini dan langsung melihat kode sumbernya, [ada di sini](https://github.com/qbzzt/20220915-all-you-can-cache). Stack pengembangannya adalah [Foundry](https://getfoundry.sh/introduction/installation/).

## Desain keseluruhan {#overall-design}

Demi kesederhanaan, kita akan mengasumsikan semua parameter transaksi adalah `uint256`, dengan panjang 32 byte. Saat kita menerima transaksi, kita akan mengurai setiap parameter seperti ini:

1. Jika byte pertama adalah `0xFF`, ambil 32 byte berikutnya sebagai nilai parameter dan tulis ke dalam cache.

2. Jika byte pertama adalah `0xFE`, ambil 32 byte berikutnya sebagai nilai parameter tetapi _jangan_ tulis ke dalam cache.

3. Untuk nilai lainnya, ambil empat bit teratas sebagai jumlah byte tambahan, dan empat bit terbawah sebagai bit paling signifikan dari kunci cache. Berikut adalah beberapa contohnya:

   | Byte dalam calldata | Kunci cache |
   | :---------------- | --------: |
   | 0x0F              |      0x0F |
   | 0x10,0x10         |      0x10 |
   | 0x12,0xAC         |    0x02AC |
   | 0x2D,0xEA, 0xD6   |  0x0DEAD6 |

## Manipulasi cache {#cache-manipulation}

Cache diimplementasikan dalam [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol). Mari kita bahas baris demi baris.

```solidity
// SPDX-License-Identifier: UNLICENSED // SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

Konstanta ini digunakan untuk menafsirkan kasus khusus di mana kita memberikan semua informasi dan ingin menuliskannya ke dalam cache atau tidak. Menulis ke dalam cache memerlukan dua operasi [`SSTORE`](https://www.evm.codes/#55) ke dalam slot penyimpanan yang sebelumnya tidak digunakan dengan biaya masing-masing 22100 gas, jadi kita membuatnya opsional.

```solidity

    mapping(uint => uint) public val2key;
```

Sebuah [pemetaan](https://www.geeksforgeeks.org/solidity/solidity-mappings/) antara nilai dan kuncinya. Informasi ini diperlukan untuk menyandikan nilai sebelum Anda mengirimkan transaksi.

```solidity
    // Location n has the value for key n+1, because we need to preserve // Lokasi n memiliki nilai untuk kunci n+1, karena kita perlu mempertahankan
    // zero as "not in the cache". // nol sebagai "tidak ada di dalam cache".
    uint[] public key2val;
```

Kita dapat menggunakan array untuk pemetaan dari kunci ke nilai karena kita menetapkan kuncinya, dan demi kesederhanaan kita melakukannya secara berurutan.

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Reading uninitialize cache entry");
        return key2val[_key-1];
    }  // cacheRead // cacheRead
```

Membaca nilai dari cache.

```solidity
    // Write a value to the cache if it's not there already // Tulis nilai ke cache jika belum ada di sana
    // Only public to enable the test to work // Hanya publik untuk memungkinkan pengujian berfungsi
    function cacheWrite(uint _value) public returns (uint) {
        // If the value is already in the cache, return the current key // Jika nilai sudah ada di dalam cache, kembalikan kunci saat ini
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

Tidak ada gunanya memasukkan nilai yang sama ke dalam cache lebih dari sekali. Jika nilainya sudah ada, cukup kembalikan kunci yang ada.

```solidity
        // Since 0xFE is a special case, the largest key the cache can // Karena 0xFE adalah kasus khusus, kunci terbesar yang dapat
        // hold is 0x0D followed by 15 0xFF's. If the cache length is already that // disimpan cache adalah 0x0D diikuti oleh 15 0xFF. Jika panjang cache sudah sebesar itu,
        // large, fail. // gagal.
        //                              1 2 3 4 5 6 7 8 9 A B C D E F // 1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "cache overflow");
```

Saya rasa kita tidak akan pernah mendapatkan cache sebesar itu (sekitar 1.8\*10<sup>37</sup> entri, yang akan membutuhkan sekitar 10<sup>27</sup> TB untuk menyimpannya). Namun, saya cukup tua untuk mengingat ["640kB akan selalu cukup"](https://quoteinvestigator.com/2011/09/08/640k-enough/). Pengujian ini sangat murah.

```solidity
        // Write the value using the next key // Tulis nilai menggunakan kunci berikutnya
        val2key[_value] = key2val.length+1;
```

Tambahkan pencarian terbalik (dari nilai ke kunci).

```solidity
        key2val.push(_value);
```

Tambahkan pencarian maju (dari kunci ke nilai). Karena kita menetapkan nilai secara berurutan, kita cukup menambahkannya setelah nilai array terakhir.

```solidity
        return key2val.length;
    }  // cacheWrite // cacheWrite
```

Kembalikan panjang baru dari `key2val`, yang merupakan sel tempat nilai baru disimpan.

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

Fungsi ini membaca nilai dari calldata dengan panjang sembarang (hingga 32 byte, ukuran kata).

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "_calldataVal length limit is 32 bytes");
        require(length + startByte <= msg.data.length,
            "_calldataVal trying to read beyond calldatasize");
```

Fungsi ini bersifat internal, jadi jika sisa kode ditulis dengan benar, pengujian ini tidak diperlukan. Namun, biayanya tidak mahal jadi sebaiknya kita memilikinya.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Kode ini ada di [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html). Ini membaca nilai 32 byte dari calldata. Ini berfungsi bahkan jika calldata berhenti sebelum `startByte+32` karena ruang yang tidak diinisialisasi dalam EVM dianggap nol.

```solidity
        _retVal = _retVal >> (256-length*8);
```

Kita tidak selalu menginginkan nilai 32 byte. Ini menghilangkan byte yang berlebih.

```solidity
        return _retVal;
    } // _calldataVal // _calldataVal


    // Read a single parameter from the calldata, starting at _fromByte // Baca satu parameter dari calldata, dimulai dari _fromByte
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

Membaca parameter tunggal dari calldata. Perhatikan bahwa kita perlu mengembalikan bukan hanya nilai yang kita baca, tetapi juga lokasi byte berikutnya karena parameter dapat berkisar dari panjang 1 byte hingga 33 byte.

```solidity
        // The first byte tells us how to interpret the rest // Byte pertama memberi tahu kita cara menafsirkan sisanya
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidity mencoba mengurangi jumlah bug dengan melarang [konversi tipe implisit](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions) yang berpotensi berbahaya. Penurunan versi, misalnya dari 256 bit ke 8 bit, harus eksplisit.

```solidity

        // Read the value, but do not write it to the cache // Baca nilai, tetapi jangan tulis ke cache
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // Read the value, and write it to the cache // Baca nilai, dan tulis ke cache
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // If we got here it means that we need to read from the cache // Jika kita sampai di sini, itu berarti kita perlu membaca dari cache

        // Number of extra bytes to read // Jumlah byte tambahan untuk dibaca
        uint8 _extraBytes = _firstByte / 16;
```

Ambil [nibble](https://en.wikipedia.org/wiki/Nibble) yang lebih rendah dan gabungkan dengan byte lain untuk membaca nilai dari cache.

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam // _readParam


    // Read n parameters (functions know how many parameters they expect) // Baca n parameter (fungsi tahu berapa banyak parameter yang mereka harapkan)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

Kita bisa mendapatkan jumlah parameter yang kita miliki dari calldata itu sendiri, tetapi fungsi yang memanggil kita tahu berapa banyak parameter yang mereka harapkan. Lebih mudah membiarkan mereka memberi tahu kita.

```solidity
        // The parameters we read // Parameter yang kita baca
        uint[] memory params = new uint[](_paramNum);

        // Parameters start at byte 4, before that it's the function signature // Parameter dimulai pada byte 4, sebelumnya adalah tanda tangan fungsi
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

Baca parameter hingga Anda mendapatkan jumlah yang Anda butuhkan. Jika kita melewati akhir calldata, `_readParams` akan membatalkan panggilan.

```solidity

        return(params);
    }   // readParams // readParams

    // For testing _readParams, test reading four parameters // Untuk menguji _readParams, uji membaca empat parameter
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam // fourParam
```

Salah satu keuntungan besar Foundry adalah memungkinkan pengujian ditulis dalam Solidity ([lihat Menguji cache di bawah](#testing-the-cache)). Ini membuat pengujian unit jauh lebih mudah. Ini adalah fungsi yang membaca empat parameter dan mengembalikannya sehingga pengujian dapat memverifikasi bahwa parameter tersebut benar.

```solidity
    // Get a value, return bytes that will encode it (using the cache if possible) // Dapatkan nilai, kembalikan byte yang akan mengodenya (menggunakan cache jika memungkinkan)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal` adalah fungsi yang dipanggil oleh kode offchain untuk membantu membuat calldata yang menggunakan cache. Fungsi ini menerima nilai tunggal dan mengembalikan byte yang menyandikannya. Fungsi ini adalah `view`, jadi tidak memerlukan transaksi dan saat dipanggil secara eksternal tidak memerlukan biaya gas apa pun.

```solidity
        uint _key = val2key[_val];

        // The value isn't in the cache yet, add it // Nilai belum ada di dalam cache, tambahkan
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

Dalam [EVM](/developers/docs/evm/) semua penyimpanan yang tidak diinisialisasi diasumsikan nol. Jadi jika kita mencari kunci untuk nilai yang tidak ada, kita mendapatkan nol. Dalam hal ini byte yang menyandikannya adalah `INTO_CACHE` (sehingga akan di-cache di lain waktu), diikuti oleh nilai sebenarnya.

```solidity
        // If the key is <0x10, return it as a single byte // Jika kunci <0x10, kembalikan sebagai satu byte
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

Byte tunggal adalah yang paling mudah. Kita cukup menggunakan [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat) untuk mengubah tipe `bytes<n>` menjadi array byte yang bisa berapa pun panjangnya. Terlepas dari namanya, ini berfungsi dengan baik saat diberikan hanya satu argumen.

```solidity
        // Two byte value, encoded as 0x1vvv // Nilai dua byte, dikodekan sebagai 0x1vvv
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

Saat kita memiliki kunci yang kurang dari 16<sup>3</sup>, kita dapat menyatakannya dalam dua byte. Pertama-tama kita mengonversi `_key`, yang merupakan nilai 256 bit, menjadi nilai 16 bit dan menggunakan logika or untuk menambahkan jumlah byte ekstra ke byte pertama. Kemudian kita cukup mengubahnya menjadi nilai `bytes2`, yang dapat dikonversi menjadi `bytes`.

```solidity
        // There is probably a clever way to do the following lines as a loop, // Mungkin ada cara cerdas untuk melakukan baris berikut sebagai loop,
        // but it's a view function so I'm optimizing for programmer time and // tetapi ini adalah fungsi view jadi saya mengoptimalkan untuk waktu programmer dan
        // simplicity. // kesederhanaan.

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

Nilai lainnya (3 byte, 4 byte, dll.) ditangani dengan cara yang sama, hanya dengan ukuran bidang yang berbeda.

```solidity
        // If we get here, something is wrong. // Jika kita sampai di sini, ada sesuatu yang salah.
        revert("Error in encodeVal, should not happen");
```

Jika kita sampai di sini, itu berarti kita mendapatkan kunci yang tidak kurang dari 16\*256<sup>15</sup>. Tetapi `cacheWrite` membatasi kunci sehingga kita bahkan tidak bisa mencapai 14\*256<sup>16</sup> (yang akan memiliki byte pertama 0xFE, sehingga akan terlihat seperti `DONT_CACHE`). Tetapi tidak memakan banyak biaya untuk menambahkan pengujian jika programmer di masa mendatang memasukkan bug.

```solidity
    } // encodeVal // encodeVal

}  // Cache // Cache
```

### Menguji cache {#testing-the-cache}

Salah satu keuntungan Foundry adalah [memungkinkan Anda menulis pengujian dalam Solidity](https://getfoundry.sh/forge/tests/overview/), yang membuatnya lebih mudah untuk menulis pengujian unit. Pengujian untuk kelas `Cache` ada [di sini](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol). Karena kode pengujian berulang, seperti halnya pengujian pada umumnya, artikel ini hanya menjelaskan bagian-bagian yang menarik.

```solidity
// SPDX-License-Identifier: UNLICENSED // SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// Need to run `forge test -vv` for the console. // Perlu menjalankan `forge test -vv` untuk konsol.
import "forge-std/console.sol";
```

Ini hanyalah boilerplate yang diperlukan untuk menggunakan paket pengujian dan `console.log`.

```solidity
import "src/Cache.sol";
```

Kita perlu mengetahui kontrak yang sedang kita uji.

```solidity
contract CacheTest is Test {
    Cache cache;

    function setUp() public {
        cache = new Cache();
    }
```

Fungsi `setUp` dipanggil sebelum setiap pengujian. Dalam hal ini kita hanya membuat cache baru, sehingga pengujian kita tidak akan saling memengaruhi.

```solidity
    function testCaching() public {
```

Pengujian adalah fungsi yang namanya dimulai dengan `test`. Fungsi ini memeriksa fungsionalitas cache dasar, menulis nilai dan membacanya lagi.

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

Beginilah cara Anda melakukan pengujian yang sebenarnya, menggunakan [fungsi `assert...`](https://getfoundry.sh/reference/forge-std/std-assertions/). Dalam hal ini, kita memeriksa bahwa nilai yang kita tulis adalah nilai yang kita baca. Kita dapat membuang hasil `cache.cacheWrite` karena kita tahu bahwa kunci cache ditetapkan secara linier.

```solidity
        }
    }    // testCaching // testCaching


    // Cache the same value multiple times, ensure that the key stays // Cache nilai yang sama beberapa kali, pastikan kuncinya tetap
    // the same // sama
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

Pertama kita menulis setiap nilai dua kali ke cache dan memastikan kuncinya sama (artinya penulisan kedua tidak benar-benar terjadi).

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching // testRepeatCaching
```

Secara teori mungkin ada bug yang tidak memengaruhi penulisan cache berturut-turut. Jadi di sini kita melakukan beberapa penulisan yang tidak berturut-turut dan melihat nilainya masih belum ditulis ulang.

```solidity
    // Read a uint from a memory buffer (to make sure we get back the parameters // Baca uint dari buffer memori (untuk memastikan kita mendapatkan kembali parameter
    // we sent out) // yang kita kirimkan)
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

Membaca kata 256 bit dari buffer `bytes memory`. Fungsi utilitas ini memungkinkan kita memverifikasi bahwa kita menerima hasil yang benar saat kita menjalankan panggilan fungsi yang menggunakan cache.

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yul tidak mendukung struktur data di luar `uint256`, jadi saat Anda merujuk ke struktur data yang lebih canggih, seperti buffer memori `_bytes`, Anda mendapatkan alamat struktur tersebut. Solidity menyimpan nilai `bytes memory` sebagai kata 32 byte yang berisi panjang, diikuti oleh byte sebenarnya, jadi untuk mendapatkan nomor byte `_start` kita perlu menghitung `_bytes+32+_start`.

```solidity

        return tempUint;
    }     // toUint256 // toUint256

    // Function signature for fourParams(), courtesy of // Tanda tangan fungsi untuk fourParams(), atas kebaikan
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // Just some constant values to see we're getting the correct values back // Hanya beberapa nilai konstan untuk melihat kita mendapatkan kembali nilai yang benar
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

Beberapa konstanta yang kita butuhkan untuk pengujian.

```solidity
    function testReadParam() public {
```

Panggil `fourParams()`, sebuah fungsi yang menggunakan `readParams`, untuk menguji apakah kita dapat membaca parameter dengan benar.

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

Kita tidak dapat menggunakan mekanisme ABI normal untuk memanggil fungsi menggunakan cache, jadi kita perlu menggunakan mekanisme tingkat rendah [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses). Mekanisme tersebut mengambil `bytes memory` sebagai input, dan mengembalikannya (serta nilai Boolean) sebagai output.

```solidity
        // First call, the cache is empty // Panggilan pertama, cache kosong
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

Sangat berguna bagi kontrak yang sama untuk mendukung fungsi yang di-cache (untuk panggilan langsung dari transaksi) dan fungsi yang tidak di-cache (untuk panggilan dari kontrak pintar lainnya). Untuk melakukannya, kita perlu terus mengandalkan mekanisme Solidity untuk memanggil fungsi yang benar, alih-alih memasukkan semuanya ke dalam [fungsi `fallback`](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function). Melakukan ini membuat komposabilitas jauh lebih mudah. Satu byte akan cukup untuk mengidentifikasi fungsi dalam banyak kasus, jadi kita membuang tiga byte (16\*3=48 gas). Namun, saat saya menulis ini, 48 gas tersebut berharga 0,07 sen, yang merupakan biaya yang wajar untuk kode yang lebih sederhana dan tidak rentan terhadap bug.

```solidity
            // First value, add it to the cache // Nilai pertama, tambahkan ke cache
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

Nilai pertama: Bendera yang mengatakan bahwa ini adalah nilai penuh yang perlu ditulis ke cache, diikuti oleh 32 byte dari nilai tersebut. Tiga nilai lainnya serupa, kecuali bahwa `VAL_B` tidak ditulis ke cache dan `VAL_C` adalah parameter ketiga dan keempat.

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

Kita mengharapkan panggilan berhasil.

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

Kita mulai dengan cache kosong dan kemudian menambahkan `VAL_A` diikuti oleh `VAL_C`. Kita mengharapkan yang pertama memiliki kunci 1, dan yang kedua memiliki 2.

```
        assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

Outputnya adalah empat parameter. Di sini kita memverifikasi bahwa itu benar.

```solidity
        // Second call, we can use the cache // Panggilan kedua, kita dapat menggunakan cache
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // First value in the Cache // Nilai pertama di dalam Cache
            bytes1(0x01),
```

Kunci cache di bawah 16 hanya satu byte.

```solidity
            // Second value, don't add it to the cache // Nilai kedua, jangan tambahkan ke cache
            cache.DONT_CACHE(),
            bytes32(VAL_B),

            // Third and fourth values, same value // Nilai ketiga dan keempat, nilai yang sama
            bytes1(0x02),
            bytes1(0x02)
        );
        .
        .
        .
    }   // testReadParam // testReadParam
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
    }   // testEncodeVal // testEncodeVal
```

Satu-satunya pengujian tambahan dalam `testEncodeVal()` adalah memverifikasi bahwa panjang `_callInput` sudah benar. Untuk panggilan pertama adalah 4+33\*4. Untuk yang kedua, di mana setiap nilai sudah ada di cache, adalah 4+1\*4.

```solidity
    // Test encodeVal when the key is more than a single byte // Uji encodeVal ketika kunci lebih dari satu byte
    // Maximum three bytes because filling the cache to four bytes takes // Maksimum tiga byte karena mengisi cache hingga empat byte membutuhkan
    // too long. // waktu terlalu lama.
    function testEncodeValBig() public {
        // Put a number of values in the cache. // Masukkan sejumlah nilai ke dalam cache.
        // To keep things simple, use key n for value n. // Agar tetap sederhana, gunakan kunci n untuk nilai n.
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

Fungsi `testEncodeVal` di atas hanya menulis empat nilai ke dalam cache, jadi [bagian fungsi yang menangani nilai multi-byte](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171) tidak diperiksa. Tetapi kode itu rumit dan rentan terhadap kesalahan.

Bagian pertama dari fungsi ini adalah loop yang menulis semua nilai dari 1 hingga 0x1FFF ke cache secara berurutan, sehingga kita akan dapat menyandikan nilai-nilai tersebut dan mengetahui ke mana arahnya.

```solidity
        .
        .
        .

        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(0x000F),   // One byte        0x0F // Satu byte        0x0F
            cache.encodeVal(0x0010),   // Two bytes     0x1010 // Dua byte     0x1010
            cache.encodeVal(0x0100),   // Two bytes     0x1100 // Dua byte     0x1100
            cache.encodeVal(0x1000)    // Three bytes 0x201000 // Tiga byte 0x201000
        );
```

Uji nilai satu byte, dua byte, dan tiga byte. Kita tidak menguji lebih dari itu karena akan memakan waktu terlalu lama untuk menulis entri tumpukan yang cukup (setidaknya 0x10000000, sekitar seperempat miliar).

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig // testEncodeValBig


    // Test what with an excessively small buffer we get a revert // Uji bahwa dengan buffer yang terlalu kecil kita mendapatkan revert
    function testShortCalldata() public {
```

Uji apa yang terjadi dalam kasus abnormal di mana tidak ada cukup parameter.

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata // testShortCalldata
```

Karena ini dibatalkan, hasil yang seharusnya kita dapatkan adalah `false`.

```
    // Call with cache keys that aren't there
    function testNoCacheKey() public {
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // First value, add it to the cache
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // Second value
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

Fungsi ini mendapatkan empat parameter yang sepenuhnya sah, kecuali bahwa cache kosong sehingga tidak ada nilai di sana untuk dibaca.

```solidity
        .
        .
        .
    // Test what with an excessively long buffer everything works file // Uji bahwa dengan buffer yang terlalu panjang semuanya berfungsi dengan baik
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // First call, the cache is empty // Panggilan pertama, cache kosong
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // First value, add it to the cache // Nilai pertama, tambahkan ke cache
            cache.INTO_CACHE(), bytes32(VAL_A),

            // Second value, add it to the cache // Nilai kedua, tambahkan ke cache
            cache.INTO_CACHE(), bytes32(VAL_B),

            // Third value, add it to the cache // Nilai ketiga, tambahkan ke cache
            cache.INTO_CACHE(), bytes32(VAL_C),

            // Fourth value, add it to the cache // Nilai keempat, tambahkan ke cache
            cache.INTO_CACHE(), bytes32(VAL_D),

            // And another value for "good luck" // Dan nilai lain untuk "semoga berhasil"
            bytes4(0x31112233)
        );
```

Fungsi ini mengirimkan lima nilai. Kita tahu bahwa nilai kelima diabaikan karena bukan entri cache yang valid, yang akan menyebabkan pembatalan jika tidak disertakan.

```solidity
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        .
        .
        .
    }   // testLongCalldata // testLongCalldata

}        // CacheTest // CacheTest

```

## Contoh aplikasi {#a-sample-app}

Menulis pengujian dalam Solidity memang sangat baik, tetapi pada akhirnya sebuah dapp harus dapat memproses permintaan dari luar rantai agar berguna. Artikel ini mendemonstrasikan cara menggunakan caching dalam dapp dengan `WORM`, yang merupakan singkatan dari "Write Once, Read Many" (Tulis Sekali, Baca Berkali-kali). Jika kunci belum ditulis, Anda dapat menulis nilai ke dalamnya. Jika kunci sudah ditulis, Anda akan mendapatkan pembatalan.

### Kontrak {#the-contract}

[Ini adalah kontraknya](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol). Ini sebagian besar mengulangi apa yang telah kita lakukan dengan `Cache` dan `CacheTest`, jadi kita hanya membahas bagian-bagian yang menarik.

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

Cara termudah untuk menggunakan `Cache` adalah dengan mewarisinya di kontrak kita sendiri.

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached // writeEntryCached
```

Fungsi ini mirip dengan `fourParam` di `CacheTest` di atas. Karena kita tidak mengikuti spesifikasi ABI, sebaiknya jangan mendeklarasikan parameter apa pun ke dalam fungsi.

```solidity
    // Make it easier to call us // Buat lebih mudah untuk memanggil kami
    // Function signature for writeEntryCached(), courtesy of // Tanda tangan fungsi untuk writeEntryCached(), atas kebaikan
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3 // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

Kode eksternal yang memanggil `writeEntryCached` perlu membangun calldata secara manual, alih-alih menggunakan `worm.writeEntryCached`, karena kita tidak mengikuti spesifikasi ABI. Memiliki nilai konstan ini hanya membuatnya lebih mudah untuk ditulis.

Perhatikan bahwa meskipun kita mendefinisikan `WRITE_ENTRY_CACHED` sebagai variabel status, untuk membacanya secara eksternal perlu menggunakan fungsi getter untuk itu, `worm.WRITE_ENTRY_CACHED()`.

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

Fungsi baca adalah `view`, jadi tidak memerlukan transaksi dan tidak memerlukan biaya gas. Akibatnya, tidak ada manfaat menggunakan cache untuk parameter. Dengan fungsi view, sebaiknya gunakan mekanisme standar yang lebih sederhana.

### Kode pengujian {#the-testing-code}

[Ini adalah kode pengujian untuk kontrak](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol). Sekali lagi, mari kita lihat hanya pada apa yang menarik.

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entry already written"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[Ini (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert) adalah cara kita menentukan dalam pengujian Foundry bahwa panggilan berikutnya harus gagal, dan alasan kegagalan yang dilaporkan. Ini berlaku saat kita menggunakan sintaks `<contract>.<function name>()` daripada membangun calldata dan memanggil kontrak menggunakan antarmuka tingkat rendah (`<contract>.call()`, dll.).

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

Di sini kita menggunakan fakta bahwa `cacheWrite` mengembalikan kunci cache. Ini bukan sesuatu yang kita harapkan untuk digunakan dalam produksi, karena `cacheWrite` mengubah status, dan oleh karena itu hanya dapat dipanggil selama transaksi. Transaksi tidak memiliki nilai kembalian, jika mereka memiliki hasil, hasil tersebut seharusnya dipancarkan sebagai peristiwa. Jadi nilai kembalian `cacheWrite` hanya dapat diakses dari kode onchain, dan kode onchain tidak memerlukan caching parameter.

```solidity
        (_success,) = address(worm).call(_callInput);
```

Beginilah cara kita memberi tahu Solidity bahwa meskipun `<contract address>.call()` memiliki dua nilai kembalian, kita hanya peduli pada yang pertama.

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

Karena kita menggunakan fungsi tingkat rendah `<address>.call()`, kita tidak dapat menggunakan `vm.expectRevert()` dan harus melihat nilai keberhasilan boolean yang kita dapatkan dari panggilan tersebut.

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

Ini adalah cara kita memverifikasi bahwa kode [memancarkan peristiwa dengan benar](https://getfoundry.sh/reference/cheatcodes/expect-emit/) di Foundry.

### Klien {#the-client}

Satu hal yang tidak Anda dapatkan dengan pengujian Solidity adalah kode JavaScript yang dapat Anda potong dan tempel ke aplikasi Anda sendiri. Untuk menulis kode itu, saya menerapkan WORM ke [Optimism Goerli](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli), testnet baru [Optimism](https://www.optimism.io/). Itu berada di alamat [`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a).

[Anda dapat melihat kode JavaScript untuk klien di sini](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js). Untuk menggunakannya:

1. Klon repositori git:

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

   | Parameter           | Nilai                                                                                                                                                               |
   | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | MNEMONIC            | Mnemonic untuk akun yang memiliki cukup ETH untuk membayar transaksi. [Anda bisa mendapatkan ETH gratis untuk jaringan Optimism Goerli di sini](https://optimismfaucet.xyz/). |
   | OPTIMISM_GOERLI_URL | URL ke Optimism Goerli. Titik akhir publik, `https://goerli.optimism.io`, dibatasi kecepatannya tetapi cukup untuk apa yang kita butuhkan di sini                                      |

5. Jalankan `index.js`.

   ```sh
   node index.js
```

   Contoh aplikasi ini pertama-tama menulis entri ke WORM, menampilkan calldata dan tautan ke transaksi di Etherscan. Kemudian ia membaca kembali entri tersebut, dan menampilkan kunci yang digunakannya dan nilai-nilai dalam entri tersebut (nilai, nomor blok, dan penulis).

Sebagian besar klien adalah JavaScript Dapp normal. Jadi sekali lagi kita hanya akan membahas bagian-bagian yang menarik.

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // Need a new key every time // Perlu kunci baru setiap saat
    const key = await worm.encodeVal(Number(new Date()))
```

Slot tertentu hanya dapat ditulis sekali, jadi kita menggunakan stempel waktu untuk memastikan kita tidak menggunakan kembali slot.

```javascript
const val = await worm.encodeVal("0x600D")

// Write an entry // Tulis entri
const calldata = func + key.slice(2) + val.slice(2)
```

Ethers mengharapkan data panggilan berupa string hex, `0x` diikuti oleh jumlah digit heksadesimal genap. Karena `key` dan `val` keduanya dimulai dengan `0x`, kita perlu menghapus header tersebut.

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

Seperti halnya kode pengujian Solidity, kita tidak dapat memanggil fungsi yang di-cache secara normal. Sebaliknya, kita perlu menggunakan mekanisme tingkat yang lebih rendah.

```javascript
    .
    .
    .
    // Read the entry just written // Baca entri yang baru saja ditulis
    const realKey = '0x' + key.slice(4)  // remove the FF flag // hapus bendera FF
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

Untuk membaca entri kita dapat menggunakan mekanisme normal. Tidak perlu menggunakan caching parameter dengan fungsi `view`.

## Kesimpulan {#conclusion}

Kode dalam artikel ini adalah bukti konsep, tujuannya adalah untuk membuat ide tersebut mudah dipahami. Untuk sistem yang siap produksi, Anda mungkin ingin mengimplementasikan beberapa fungsionalitas tambahan:

- Menangani nilai yang bukan `uint256`. Misalnya, string.
- Alih-alih cache global, mungkin memiliki pemetaan antara pengguna dan cache. Pengguna yang berbeda menggunakan nilai yang berbeda.
- Nilai yang digunakan untuk alamat berbeda dari yang digunakan untuk tujuan lain. Mungkin masuk akal untuk memiliki cache terpisah hanya untuk alamat.
- Saat ini, kunci cache menggunakan algoritma "datang pertama, kunci terkecil". Enam belas nilai pertama dapat dikirim sebagai satu byte. 4080 nilai berikutnya dapat dikirim sebagai dua byte. Sekitar satu juta nilai berikutnya adalah tiga byte, dll. Sistem produksi harus menyimpan penghitung penggunaan pada entri cache dan mengatur ulangnya sehingga enam belas nilai _paling umum_ adalah satu byte, 4080 nilai paling umum berikutnya dua byte, dll.

  Namun, itu adalah operasi yang berpotensi berbahaya. Bayangkan urutan peristiwa berikut:

  1. Noam Naive memanggil `encodeVal` untuk menyandikan alamat tujuan pengiriman tokennya. Alamat tersebut adalah salah satu yang pertama digunakan pada aplikasi, jadi nilai yang disandikan adalah 0x06. Ini adalah fungsi `view`, bukan transaksi, jadi ini antara Noam dan node yang dia gunakan, dan tidak ada orang lain yang mengetahuinya

  2. Owen Owner menjalankan operasi penataan ulang cache. Sangat sedikit orang yang benar-benar menggunakan alamat tersebut, sehingga sekarang disandikan sebagai 0x201122. Nilai yang berbeda, 10<sup>18</sup>, ditetapkan 0x06.

  3. Noam Naive mengirimkan tokennya ke 0x06. Token tersebut masuk ke alamat `0x0000000000000000000000000de0b6b3a7640000`, dan karena tidak ada yang mengetahui kunci pribadi untuk alamat tersebut, token tersebut hanya tertahan di sana. Noam _tidak senang_.

  Ada cara untuk memecahkan masalah ini, dan masalah terkait transaksi yang ada di mempool selama penataan ulang cache, tetapi Anda harus menyadarinya.

Saya mendemonstrasikan caching di sini dengan Optimism, karena saya adalah karyawan Optimism dan ini adalah rollup yang paling saya ketahui. Tetapi ini seharusnya berfungsi dengan rollup apa pun yang membebankan biaya minimal untuk pemrosesan internal, sehingga sebagai perbandingan, menulis data transaksi ke L1 adalah pengeluaran utama.

[Lihat di sini untuk karya saya yang lain](https://cryptodocguy.pro/).