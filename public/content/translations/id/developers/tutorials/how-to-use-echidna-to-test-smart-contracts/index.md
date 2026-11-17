---
title: Cara menggunakan Echidna untuk menguji kontrak pintar
description: Cara menggunakan Echidna untuk menguji kontrak pintar secara otomatis
author: "Trailofbits"
lang: id
tags: ["Solidity", "kontrak pintar", "keamanan", "pengujian", "fuzzing"]
skill: advanced
breadcrumb: Echidna
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Instalasi {#installation}

Echidna dapat diinstal melalui Docker, Homebrew, atau menggunakan biner yang telah dikompilasi sebelumnya. Contoh-contoh dalam tutorial ini diuji dengan Echidna 2.3.3 dan solc 0.8.37.

### Echidna melalui Docker {#echidna-through-docker}

```sh
docker pull ghcr.io/crytic/echidna/echidna:latest
docker run --rm -it -v "$PWD":/src ghcr.io/crytic/echidna/echidna:latest
```

_Perintah terakhir menjalankan citra Echidna di dalam Docker yang memiliki akses ke direktori Anda saat ini. Anda dapat mengubah file dari host Anda, dan menjalankan alat pada file dari Docker. Citra ini juga dilengkapi dengan [Slither](https://github.com/crytic/slither), [crytic-compile](https://github.com/crytic/crytic-compile), dan [solc-select](https://github.com/crytic/solc-select)._

Di dalam Docker, jalankan:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
cd /src
```

### Biner {#binary}

Unduh rilis terbaru untuk platform Anda dari [https://github.com/crytic/echidna/releases/latest](https://github.com/crytic/echidna/releases/latest). Di macOS atau Linux Anda juga dapat menjalankan `brew install echidna`, yang akan menginstal Slither dan crytic-compile bersamanya.

Saat menggunakan biner rilis, instal [Slither](https://github.com/crytic/slither) dan [solc-select](https://github.com/crytic/solc-select) sendiri (misalnya `pip3 install slither-analyzer solc-select` di lingkungan virtual Python) dan pilih versi kompiler:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
```

Echidna berjalan tanpa Slither, tetapi Slither mengekstrak konstanta seperti angka ajaib yang digunakan dalam pernyataan `require`, dan beberapa contoh di bawah ini bergantung padanya untuk menemukan bug dengan cepat.

## Pengantar fuzzing berbasis properti {#introduction-to-property-based-fuzzing}

Echidna adalah fuzzer berbasis properti, yang kami jelaskan di postingan blog kami sebelumnya ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Fuzzing {#fuzzing}

[Fuzzing](https://wikipedia.org/wiki/Fuzzing) adalah teknik yang terkenal di komunitas keamanan. Teknik ini terdiri dari menghasilkan input yang kurang lebih acak untuk menemukan bug dalam program. Fuzzer untuk perangkat lunak tradisional (seperti [AFL](http://lcamtuf.coredump.cx/afl/) atau [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) dikenal sebagai alat yang efisien untuk menemukan bug.

Selain pembuatan input yang murni acak, ada banyak teknik dan strategi untuk menghasilkan input yang baik, termasuk:

- Mendapatkan umpan balik dari setiap eksekusi dan memandu pembuatan menggunakan umpan balik tersebut. Misalnya, jika input yang baru dibuat mengarah pada penemuan jalur baru, masuk akal untuk membuat input baru yang mendekatinya.
- Menghasilkan input dengan memperhatikan batasan struktural. Misalnya, jika input Anda berisi header dengan checksum, masuk akal untuk membiarkan fuzzer menghasilkan input yang memvalidasi checksum tersebut.
- Menggunakan input yang diketahui untuk menghasilkan input baru: jika Anda memiliki akses ke kumpulan data besar dari input yang valid, fuzzer Anda dapat menghasilkan input baru dari data tersebut, daripada memulai pembuatannya dari awal. Ini biasanya disebut _seeds_ (benih).

### Fuzzing berbasis properti {#property-based-fuzzing}

Echidna termasuk dalam keluarga fuzzer tertentu: fuzzing berbasis properti yang sangat terinspirasi oleh [QuickCheck](https://wikipedia.org/wiki/QuickCheck). Berbeda dengan fuzzer klasik yang akan mencoba menemukan kerusakan (crash), Echidna akan mencoba memecahkan invarian yang ditentukan pengguna.

Dalam kontrak pintar, invarian adalah fungsi Solidity, yang dapat mewakili state yang salah atau tidak valid yang dapat dicapai oleh kontrak, termasuk:

- Kontrol akses yang salah: penyerang menjadi pemilik kontrak.
- Mesin state yang salah: token dapat ditransfer saat kontrak dijeda.
- Aritmatika yang salah: pengguna dapat mengalami underflow pada saldonya dan mendapatkan token gratis tanpa batas.

### Menguji properti dengan Echidna {#testing-a-property-with-echidna}

Kita akan melihat cara menguji kontrak pintar dengan Echidna. Targetnya adalah kontrak pintar berikut [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Token {
    mapping(address => uint256) public balances;

    function airdrop() public {
        balances[msg.sender] = 1000;
    }

    function consume() public {
        require(balances[msg.sender] > 0);
        balances[msg.sender] -= 1;
    }

    function backdoor() public {
        balances[msg.sender] += 1;
    }
}
```

Kita akan membuat asumsi bahwa token ini harus memiliki properti berikut:

- Siapa pun dapat memiliki maksimal 1000 token
- Token tidak dapat ditransfer (ini bukan token ERC-20)

### Menulis properti {#write-a-property}

Properti Echidna adalah fungsi Solidity. Sebuah properti harus:

- Tidak memiliki argumen
- Mengembalikan `true` jika berhasil
- Memiliki nama yang diawali dengan `echidna`

Echidna akan:

- Secara otomatis menghasilkan transaksi arbitrer untuk menguji properti.
- Melaporkan setiap transaksi yang menyebabkan properti mengembalikan `false` atau memunculkan kesalahan.
- Membuang efek samping saat memanggil properti (yaitu, jika properti mengubah variabel state, perubahan tersebut dibuang setelah pengujian)

Properti berikut memeriksa bahwa pemanggil tidak memiliki lebih dari 1000 token:

```solidity
function echidna_balance_under_1000() public view returns (bool) {
    return balances[msg.sender] <= 1000;
}
```

Gunakan pewarisan (inheritance) untuk memisahkan kontrak Anda dari properti Anda:

```solidity
contract TestToken is Token {
    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

[`testtoken.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/testtoken.sol) mengimplementasikan properti dan mewarisi dari token.

### Menginisiasi kontrak {#initiate-a-contract}

Echidna membutuhkan [konstruktor](/developers/docs/smart-contracts/anatomy/#constructor-functions) tanpa argumen. Jika kontrak Anda memerlukan inisialisasi tertentu, Anda perlu melakukannya di dalam konstruktor.

Ada beberapa alamat khusus di Echidna:

- `0x30000` yang memanggil konstruktor.
- `0x10000`, `0x20000`, dan `0x30000` yang secara acak memanggil fungsi lainnya.
- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` tempat kontrak yang sedang diuji di-deploy.

Kita tidak memerlukan inisialisasi khusus dalam contoh kita saat ini, sehingga konstruktor kita kosong.

### Menjalankan Echidna {#run-echidna}

Echidna diluncurkan dengan:

```sh
echidna contract.sol
```

Jika contract.sol berisi beberapa kontrak, Anda dapat menentukan targetnya:

```sh
echidna contract.sol --contract MyContract
```

Saat dijalankan di terminal, Echidna menampilkan UI interaktif. Tambahkan `--format text` untuk mendapatkan output teks biasa seperti contoh di bawah ini.

### Ringkasan: Menguji properti {#summary-testing-a-property}

Berikut ini merangkum jalannya Echidna pada contoh kita:

```solidity
contract TestToken is Token {
    constructor() {}

    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

```sh
echidna testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence:
    TestToken.airdrop()
    TestToken.backdoor()

...
```

Echidna menemukan bahwa properti dilanggar jika `backdoor` dipanggil.

## Memfilter fungsi untuk dipanggil selama kampanye fuzzing {#filtering-functions-to-call-during-a-fuzzing-campaign}

Kita akan melihat cara memfilter fungsi yang akan di-fuzz.
Targetnya adalah kontrak pintar berikut:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool state1 = false;
    bool state2 = false;
    bool state3 = false;
    bool state4 = false;

    function f(uint256 x) public {
        require(x == 12);
        state1 = true;
    }

    function g(uint256 x) public {
        require(state1);
        require(x == 8);
        state2 = true;
    }

    function h(uint256 x) public {
        require(state2);
        require(x == 42);
        state3 = true;
    }

    function i() public {
        require(state3);
        state4 = true;
    }

    function reset1() public {
        state1 = false;
        state2 = false;
        state3 = false;
        return;
    }

    function reset2() public {
        state1 = false;
        state2 = false;
        state3 = false;
        return;
    }

    function echidna_state4() public view returns (bool) {
        return (!state4);
    }
}
```

Contoh kecil ini memaksa Echidna untuk menemukan urutan transaksi tertentu untuk mengubah variabel state.
Ini sulit bagi sebuah fuzzer.
Kita dapat menjalankan Echidna untuk memverifikasi ini:

```sh
echidna multi.sol
...
echidna_state4: passing
...
```

### Memfilter fungsi {#filtering-functions}

Echidna kesulitan menemukan urutan yang benar untuk menguji kontrak ini karena dua fungsi reset (`reset1` dan `reset2`) akan mengatur semua variabel state menjadi `false`.
Namun, kita dapat menggunakan fitur khusus Echidna untuk memasukkan fungsi reset ke daftar hitam (blacklist) atau hanya memasukkan fungsi `f`, `g`,
`h`, dan `i` ke daftar putih (whitelist).

Untuk memasukkan fungsi ke daftar hitam, kita dapat menggunakan file konfigurasi ini:

```yaml
filterBlacklist: true
filterFunctions: ["C.reset1()", "C.reset2()"]
```

Pendekatan lain untuk memfilter fungsi adalah dengan membuat daftar fungsi yang masuk daftar putih. Untuk melakukannya, kita dapat menggunakan file konfigurasi ini:

```yaml
filterBlacklist: false
filterFunctions: ["C.f(uint256)", "C.g(uint256)", "C.h(uint256)", "C.i()"]
```

- `filterBlacklist` bernilai `true` secara default.
- Pemfilteran dilakukan pada nama fungsi lengkap: nama kontrak, sebuah `.`, dan tanda tangan Antarmuka Biner Aplikasi (ABI) (misalnya `C.f(uint256)`). Jika Anda memiliki `f()` dan `f(uint256)`, Anda dapat memilih dengan tepat mana yang akan difilter. Nama tanpa awalan seperti `"reset1"` tidak akan cocok dengan apa pun.

### Menjalankan Echidna {#run-echidna-1}

Untuk menjalankan Echidna dengan file konfigurasi `blacklist.yaml`:

```sh
echidna multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    C.f(12)
    C.g(8)
    C.h(42)
    C.i()
```

Echidna akan menemukan urutan transaksi untuk membuktikan properti salah hampir seketika.

### Ringkasan: Memfilter fungsi {#summary-filtering-functions}

Echidna dapat memasukkan fungsi ke daftar hitam atau daftar putih untuk dipanggil selama kampanye fuzzing menggunakan:

```yaml
filterBlacklist: true
filterFunctions: ["C.f1()", "C.f2()", "C.f3()"]
```

```sh
echidna contract.sol --config config.yaml
...
```

Echidna memulai kampanye fuzzing dengan memasukkan `C.f1()`, `C.f2()`, dan `C.f3()` ke daftar hitam atau hanya memanggil fungsi-fungsi ini, sesuai dengan nilai boolean `filterBlacklist`.

## Cara menguji asersi Solidity dengan Echidna {#how-to-test-soliditys-assert-with-echidna}

Dalam tutorial singkat ini, kami akan menunjukkan cara menggunakan Echidna untuk menguji pemeriksaan asersi dalam kontrak. Misalkan kita memiliki kontrak seperti ini:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        // tmp <= counter
        return (counter - tmp);
    }
}
```

Sejak Solidity 0.8, limpahan (overflow) aritmatika akan menyebabkan transaksi dikembalikan secara default. Blok `unchecked` memulihkan perilaku wrapping sehingga `counter` dapat mengalami limpahan, yang merupakan bug yang ingin kita temukan dengan Echidna.

### Menulis asersi {#write-an-assertion}

Kita ingin memastikan bahwa `tmp` kurang dari atau sama dengan `counter` setelah mengembalikan selisihnya. Kita bisa menulis properti Echidna, tetapi kita perlu menyimpan nilai `tmp` di suatu tempat. Sebagai gantinya, kita bisa menggunakan asersi seperti ini:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

### Menjalankan Echidna {#run-echidna-2}

Untuk mengaktifkan pengujian kegagalan asersi, teruskan `--test-mode assertion` pada baris perintah, atau buat [file konfigurasi Echidna](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`:

```yaml
testMode: assertion
```

Saat kita menjalankan kontrak ini di Echidna, kita mendapatkan hasil yang diharapkan:

```sh
echidna assert.sol --config config.yaml
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

Seperti yang Anda lihat, Echidna melaporkan beberapa kegagalan asersi dalam fungsi `inc`. Menambahkan lebih dari satu asersi per fungsi dimungkinkan, tetapi Echidna tidak dapat membedakan asersi mana yang gagal.

### Kapan dan bagaimana menggunakan asersi {#when-and-how-use-assertions}

Asersi dapat digunakan sebagai alternatif untuk properti eksplisit, terutama jika kondisi yang akan diperiksa terkait langsung dengan penggunaan yang benar dari beberapa operasi `f`. Menambahkan asersi setelah beberapa kode akan memastikan bahwa pemeriksaan akan terjadi segera setelah kode tersebut dieksekusi:

```solidity
function f(..) public {
    // beberapa kode kompleks
    ...
    assert (condition);
    ...
}

```

Sebaliknya, menggunakan properti Echidna eksplisit akan mengeksekusi transaksi secara acak dan tidak ada cara mudah untuk memastikan kapan tepatnya properti tersebut akan diperiksa. Masih memungkinkan untuk melakukan solusi sementara ini:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

Namun, ada beberapa masalah:

- Ini gagal jika `f` dideklarasikan sebagai `internal` atau `external`.
- Tidak jelas argumen mana yang harus digunakan untuk memanggil `f`.
- Jika `f` dikembalikan, properti akan gagal.

Secara umum, kami menyarankan untuk mengikuti [rekomendasi John Regehr](https://blog.regehr.org/archives/1091) tentang cara menggunakan asersi:

- Jangan memaksakan efek samping apa pun selama pemeriksaan asersi. Misalnya: `assert(ChangeStateAndReturn() == 1)`
- Jangan mengasersi pernyataan yang sudah jelas. Misalnya `assert(var >= 0)` di mana `var` dideklarasikan sebagai `uint`.

Terakhir, mohon **jangan gunakan** `require` sebagai pengganti `assert`, karena Echidna tidak akan dapat mendeteksinya (tetapi kontrak akan tetap dikembalikan).

### Ringkasan: Pemeriksaan Asersi {#summary-assertion-checking}

Berikut ini merangkum jalannya Echidna pada contoh kita:

```solidity
contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

```sh
echidna assert.sol --test-mode assertion
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

Echidna menemukan bahwa asersi dalam `inc` dapat gagal jika fungsi ini dipanggil beberapa kali dengan argumen yang besar.

## Mengumpulkan dan memodifikasi korpus Echidna {#collecting-and-modifying-an-echidna-corpus}

Kita akan melihat cara mengumpulkan dan menggunakan korpus transaksi dengan Echidna. Targetnya adalah kontrak pintar berikut [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool value_found = false;

    function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
        require(magic_1 == 42);
        require(magic_2 == 129);
        require(magic_3 == magic_4 + 333);
        value_found = true;
        return;
    }

    function echidna_magic_values() public view returns (bool) {
        return !value_found;
    }
}
```

Contoh kecil ini memaksa Echidna untuk menemukan nilai tertentu untuk mengubah variabel state. Ini sulit bagi sebuah fuzzer.
Kita dapat menjalankan Echidna untuk memverifikasi ini:

```sh
echidna magic.sol
...

echidna_magic_values: passing
...
```

Namun, kita masih dapat menggunakan Echidna untuk mengumpulkan korpus saat menjalankan kampanye fuzzing ini.

### Mengumpulkan korpus {#collecting-a-corpus}

Untuk mengaktifkan pengumpulan korpus, buat direktori korpus:

```sh
mkdir corpus-magic
```

Dan sebuah [file konfigurasi Echidna](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`:

```yaml
corpusDir: "corpus-magic"
```

Sekarang kita dapat menjalankan alat kita dan memeriksa korpus yang terkumpul:

```sh
echidna magic.sol --config config.yaml
```

Echidna masih tidak dapat menemukan nilai ajaib yang benar. Untuk melihat di mana ia terhenti, lihat laporan cakupan `corpus-magic/covered.*.txt`:

```text
7 | *   |     function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
  8 | *r  |         require(magic_1 == 42);
  9 | *r  |         require(magic_2 == 129);
 10 | *r  |         require(magic_3 == magic_4 + 333);
 11 |     |         value_found = true;
 12 |     |         return;
```

Label `r` berarti Echidna mencapai baris tersebut tetapi eksekusi dikembalikan di sana, dan baris setelah `require` terakhir tidak pernah dieksekusi.

Urutan transaksi yang dikumpulkan Echidna disimpan sebagai file JSON di `corpus-magic/coverage/`. Misalnya, transaksi pertama dari salah satu file ini adalah:

```json
[
  {
    "call": {
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639806"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "761"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "91238239174727894896282446013839801776340298206661877345279631871841712965531"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639804"
            ],
            "tag": "AbiUInt"
          }
        ]
      ],
      "tag": "SolCall"
    },
    "delay": [
      "0x00000000000000000000000000000000000000000000000000000000000103ef",
      "0x000000000000000000000000000000000000000000000000000000000000d38b"
    ],
    "dst": "0x00a329c0648769A73afAc7F9381E08FB43dBEA72",
    "gas": 12500000,
    "gasprice": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "src": "0x0000000000000000000000000000000000020000",
    "value": "0x0000000000000000000000000000000000000000000000000000000000000000"
  }
]
```

Jelas, input ini tidak akan memicu kegagalan pada properti kita. Namun, pada langkah berikutnya, kita akan melihat cara memodifikasinya untuk tujuan tersebut.

### Menyemai korpus {#seeding-a-corpus}

Echidna membutuhkan sedikit bantuan untuk menangani fungsi `magic`. Kita akan menyalin dan memodifikasi input untuk menggunakan parameter yang sesuai untuknya (nama file bersifat acak, jadi gunakan salah satu dari direktori `corpus-magic/coverage/` Anda sendiri):

```sh
cp corpus-magic/coverage/249425678654647553.txt corpus-magic/coverage/new.txt
```

Kita akan memodifikasi `new.txt` sehingga berisi satu transaksi yang memanggil `magic(42,129,333,0)`. Sekarang, kita dapat menjalankan ulang Echidna:

```sh
echidna magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    C.magic(42,129,333,0)

...
```

Kali ini, ia menemukan bahwa properti tersebut langsung dilanggar.

## Menemukan transaksi dengan konsumsi gas tinggi {#finding-transactions-with-high-gas-consumption}

Kita akan melihat cara menemukan transaksi dengan konsumsi gas tinggi menggunakan Echidna. Versi Echidna yang lebih lama memiliki opsi `estimateGas` untuk ini; opsi ini dihapus di Echidna 2.3.0. Sebagai gantinya, kita mengukur gas dengan `gasleft()` dan membiarkan [mode optimasi](https://secure-contracts.com/program-analysis/echidna/advanced/optimization_mode.html) Echidna memaksimalkannya. Targetnya adalah kontrak pintar berikut:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    uint256 state;

    function expensive(uint8 times) internal {
        for (uint8 i = 0; i < times; i++) {
            state = state + i;
        }
    }

    function f(uint256 x, uint256 y, uint8 times) public {
        if (x == 42 && y == 123) {
            expensive(times);
        } else {
            state = 0;
        }
    }
}
```

Di sini `expensive` dapat memiliki konsumsi gas yang besar.

### Mengukur Konsumsi Gas {#measuring-gas-consumption}

Dalam mode optimasi, Echidna mencari fungsi yang diawali dengan `echidna_` yang tidak mengambil argumen dan mengembalikan `int256`, dan mencoba menemukan urutan transaksi yang memaksimalkan nilai yang dikembalikan. Kita menambahkan kontrak pengujian yang memanggil `f`, mencatat gas yang digunakannya, dan mengekspos nilai maksimumnya (simpan kedua kontrak di `gas.sol`):

```solidity
contract TestGas is C {
    int256 maxGasUsed;

    function measureF(uint256 x, uint256 y, uint8 times) public {
        uint256 start = gasleft();
        f(x, y, times);
        int256 used = int256(start - gasleft());
        if (used > maxGasUsed) {
            maxGasUsed = used;
        }
    }

    function echidna_opt_gas_f() public view returns (int256) {
        return maxGasUsed;
    }
}
```

Untuk mengaktifkan mode optimasi, buat file konfigurasi `config.yaml`. Dalam contoh ini, kita juga akan mengurangi ukuran urutan transaksi untuk membuat hasilnya lebih mudah dipahami:

```yaml
testMode: optimization
seqLen: 2
```

### Menjalankan Echidna {#run-echidna-3}

Setelah kita membuat file konfigurasi, kita dapat menjalankan Echidna seperti ini:

```sh
echidna gas.sol --contract TestGas --config config.yaml
...
echidna_opt_gas_f: max value: 127128

  Call sequence:
    TestGas.measureF(42,123,223)

...
```

- Gas yang ditampilkan diukur oleh implementasi Mesin Virtual Ethereum (EVM) tempat Echidna berjalan, [hevm](https://github.com/argotorg/hevm), dan mencakup overhead dari panggilan internal dari `measureF`.
- Nilai maksimumnya tidak unik: setiap kampanye bersifat acak, dan kampanye yang lebih lama (misalnya `--test-limit 200000`) cenderung menemukan nilai yang lebih besar.

### Memfilter Panggilan yang Mengurangi Gas {#filtering-out-gas-reducing-calls}

Tutorial tentang **memfilter fungsi untuk dipanggil selama kampanye fuzzing** di atas menunjukkan cara menghapus beberapa fungsi dari pengujian Anda.  
Ini bisa sangat penting untuk mendapatkan perkiraan gas yang akurat.
Pertimbangkan contoh berikut:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    address[] addrs;

    function push(address a) public {
        addrs.push(a);
    }

    function pop() public {
        addrs.pop();
    }

    function clear() public {
        delete addrs;
    }

    function check() public {
        for (uint256 i = 0; i < addrs.length; i++)
            for (uint256 j = i + 1; j < addrs.length; j++)
                if (addrs[i] == addrs[j]) addrs[j] = address(0x0);
    }

    function echidna_opt_gas_check() public returns (int256) {
        uint256 start = gasleft();
        check();
        return int256(start - gasleft());
    }
}
```

`echidna_opt_gas_check` memanggil `check` dan mengembalikan biaya gasnya. Seperti setiap fungsi pengujian Echidna, perubahan state-nya dibuang setelahnya.

Jika Echidna dapat memanggil semua fungsi, ia tidak akan mudah menemukan transaksi dengan biaya gas tinggi:

```sh
echidna pushpop.sol --test-mode optimization
...
echidna_opt_gas_check: max value: 265706
...
```

Itu karena biayanya bergantung pada ukuran `addrs` dan panggilan acak cenderung membuat array hampir kosong.
Namun, memasukkan `pop` dan `clear` ke daftar hitam memberikan kita hasil yang jauh lebih baik:

```yaml
testMode: optimization
filterBlacklist: true
filterFunctions: ["C.pop()", "C.clear()"]
```

```sh
echidna pushpop.sol --config config.yaml
...
echidna_opt_gas_check: max value: 2446228
...
```

Menyusutkan urutan panggilan untuk hasil ini membutuhkan waktu beberapa menit, karena setiap pemutaran ulang (replay) memanggil fungsi `check` yang mahal.

### Ringkasan: Menemukan transaksi dengan konsumsi gas tinggi {#summary-finding-transactions-with-high-gas-consumption}

Echidna dapat menemukan transaksi dengan konsumsi gas tinggi dengan mengukur gas menggunakan `gasleft()` dalam fungsi `echidna_` yang mengembalikan `int256`, dan berjalan dalam mode optimasi:

```yaml
testMode: optimization
```

```sh
echidna contract.sol --config config.yaml
...
```

Echidna akan melaporkan nilai maksimum yang ditemukan dan urutan transaksi yang menghasilkannya, setelah kampanye fuzzing selesai.
