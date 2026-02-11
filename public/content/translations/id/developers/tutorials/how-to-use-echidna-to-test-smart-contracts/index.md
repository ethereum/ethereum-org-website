---
title: Cara menggunakan Echidna untuk menguji kontrak pintar
description: Cara menggunakan Echidna untuk menguji kontrak pintar secara otomatis
author: "Ipungpurwono"
lang: id
tags:
  [
    "Solidity",
    "kontrak pintar",
    "keamanan",
    "pengujian",
    "fuzzing"
  ]
skill: advanced
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Instalasi {#installation}

Echidna dapat diinstal melalui docker atau menggunakan biner yang telah dikompilasi sebelumnya.

### Echidna melalui docker {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Perintah terakhir menjalankan eth-security-toolbox di dalam docker yang memiliki akses ke direktori Anda saat ini. Anda dapat mengubah file dari host Anda, dan menjalankan perangkat pada file dari docker_

Di dalam docker, jalankan:

```bash
solc-select 0.5.11
cd /home/training
```

### Biner {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## Pengantar fuzzing berbasis properti {#introduction-to-property-based-fuzzing}

Echidna adalah fuzzer berbasis properti, yang kami jelaskan dalam postingan blog kami sebelumnya ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Fuzzing {#fuzzing}

[Fuzzing](https://wikipedia.org/wiki/Fuzzing) adalah teknik yang terkenal di komunitas keamanan. Ini terdiri dari pembuatan input yang kurang lebih acak untuk menemukan bug dalam program. Fuzzer untuk perangkat lunak tradisional (seperti [AFL](http://lcamtuf.coredump.cx/afl/) atau [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) dikenal sebagai perangkat yang efisien untuk menemukan bug.

Di luar pembuatan input yang murni acak, ada banyak teknik dan strategi untuk menghasilkan input yang baik, termasuk:

- Memperoleh umpan balik dari setiap eksekusi dan menggunakannya untuk memandu pembuatan. Misalnya, jika input yang baru dibuat mengarah pada penemuan jalur baru, masuk akal untuk membuat input baru yang mendekatinya.
- Menghasilkan input yang mematuhi batasan struktural. Misalnya, jika input Anda berisi header dengan checksum, akan masuk akal untuk mengizinkan fuzzer menghasilkan input yang memvalidasi checksum.
- Menggunakan input yang diketahui untuk menghasilkan input baru: jika Anda memiliki akses ke kumpulan data besar dari input yang valid, fuzzer Anda dapat menghasilkan input baru dari mereka, daripada memulai pembuatannya dari awal. Ini biasanya disebut _seeds_.

### Fuzzing berbasis properti {#property-based-fuzzing}

Echidna termasuk dalam keluarga fuzzer tertentu: fuzzing berbasis properti yang sangat terinspirasi oleh [QuickCheck](https://wikipedia.org/wiki/QuickCheck). Berbeda dengan fuzzer klasik yang akan mencoba menemukan kerusakan, Echidna akan mencoba melanggar invarian yang ditentukan pengguna.

Dalam kontrak pintar, invarian adalah fungsi Solidity, yang dapat mewakili keadaan yang salah atau tidak valid yang dapat dicapai oleh kontrak, termasuk:

- Kontrol akses yang salah: penyerang menjadi pemilik kontrak.
- Mesin state yang salah: token dapat ditransfer saat kontrak dijeda.
- Aritmatika yang salah: pengguna dapat melakukan underflow pada saldonya dan mendapatkan token gratis tanpa batas.

### Menguji properti dengan Echidna {#testing-a-property-with-echidna}

Kita akan melihat cara menguji kontrak pintar dengan Echidna. Targetnya adalah kontrak pintar berikut [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

```solidity
contract Token{
  mapping(address => uint) public balances;
  function airdrop() public{
      balances[msg.sender] = 1000;
  }
  function consume() public{
      require(balances[msg.sender]>0);
      balances[msg.sender] -= 1;
  }
  function backdoor() public{
      balances[msg.sender] += 1;
  }
}
```

Kita akan berasumsi bahwa token ini harus memiliki properti berikut:

- Siapapun dapat memiliki maksimal 1000 token
- Token tidak dapat ditransfer (ini bukan token ERC20)

### Menulis properti {#write-a-property}

Properti Echidna adalah fungsi Solidity. Sebuah properti harus:

- Tidak memiliki argumen
- Mengembalikan `true` jika berhasil
- Memiliki nama yang diawali dengan `echidna`

Echidna akan:

- Secara otomatis menghasilkan transaksi sembarang untuk menguji properti.
- Melaporkan setiap transaksi yang menyebabkan properti mengembalikan `false` atau melemparkan kesalahan.
- Membuang efek samping saat memanggil properti (yaitu jika properti mengubah variabel state, itu akan dibuang setelah pengujian)

Properti berikut memeriksa bahwa pemanggil tidak memiliki lebih dari 1000 token:

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

Gunakan pewarisan untuk memisahkan kontrak Anda dari properti Anda:

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) mengimplementasikan properti dan mewarisi dari token.

### Menginisiasi kontrak {#initiate-a-contract}

Echidna memerlukan [konstruktor](/developers/docs/smart-contracts/anatomy/#constructor-functions) tanpa argumen. Jika kontrak Anda memerlukan inisialisasi khusus, Anda perlu melakukannya di dalam konstruktor.

Ada beberapa alamat khusus di Echidna:

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` yang memanggil konstruktor.
- `0x10000`, `0x20000`, dan `0x00a329C0648769a73afAC7F9381e08fb43DBEA70` yang secara acak memanggil fungsi-fungsi lain.

Kita tidak memerlukan inisialisasi khusus dalam contoh kita saat ini, sehingga konstruktor kita kosong.

### Jalankan Echidna {#run-echidna}

Echidna diluncurkan dengan:

```bash
echidna-test contract.sol
```

Jika contract.sol berisi beberapa kontrak, Anda dapat menentukan targetnya:

```bash
echidna-test contract.sol --contract MyContract
```

### Ringkasan: Menguji properti {#summary-testing-a-property}

Berikut ini merangkum jalannya echidna pada contoh kita:

```solidity
contract TestToken is Token{
    constructor() public {}
        function echidna_balance_under_1000() public view returns(bool){
          return balances[msg.sender] <= 1000;
        }
  }
```

```bash
echidna-test testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence, shrinking (1205/5000):
    airdrop()
    backdoor()

...
```

Echidna menemukan bahwa properti dilanggar jika `backdoor` dipanggil.

## Memfilter fungsi untuk dipanggil selama kampanye fuzzing {#filtering-functions-to-call-during-a-fuzzing-campaign}

Kita akan melihat cara memfilter fungsi untuk di-fuzz.
Targetnya adalah kontrak pintar berikut:

```solidity
contract C {
  bool state1 = false;
  bool state2 = false;
  bool state3 = false;
  bool state4 = false;

  function f(uint x) public {
    require(x == 12);
    state1 = true;
  }

  function g(uint x) public {
    require(state1);
    require(x == 8);
    state2 = true;
  }

  function h(uint x) public {
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

  function echidna_state4() public returns (bool) {
    return (!state4);
  }
}
```

Contoh kecil ini memaksa Echidna untuk menemukan urutan transaksi tertentu untuk mengubah variabel state.
Ini sulit untuk fuzzer (disarankan untuk menggunakan perangkat eksekusi simbolis seperti [Manticore](https://github.com/trailofbits/manticore)).
Kita bisa menjalankan Echidna untuk memverifikasi ini:

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### Fungsi pemfilteran {#filtering-functions}

Echidna kesulitan menemukan urutan yang benar untuk menguji kontrak ini karena dua fungsi reset (`reset1` dan `reset2`) akan mengatur semua variabel state menjadi `false`.
Namun, kita dapat menggunakan fitur khusus Echidna untuk memasukkan fungsi reset ke daftar hitam atau hanya memasukkan fungsi `f`, `g`,
`h` dan `i` ke daftar putih.

Untuk memasukkan fungsi ke daftar hitam, kita dapat menggunakan file konfigurasi ini:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

Pendekatan lain untuk memfilter fungsi adalah dengan mendaftar fungsi-fungsi yang masuk daftar putih. Untuk melakukannya, kita dapat menggunakan file konfigurasi ini:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- Nilai `filterBlacklist` adalah `true` secara default.
- Pemfilteran akan dilakukan berdasarkan nama saja (tanpa parameter). Jika Anda memiliki `f()` dan `f(uint256)`, filter `"f"` akan cocok dengan kedua fungsi tersebut.

### Jalankan Echidna {#run-echidna-1}

Untuk menjalankan Echidna dengan file konfigurasi `blacklist.yaml`:

```bash
echidna-test multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    f(12)
    g(8)
    h(42)
    i()
```

Echidna akan menemukan urutan transaksi untuk memalsukan properti hampir seketika.

### Ringkasan: Fungsi pemfilteran {#summary-filtering-functions}

Echidna dapat memasukkan fungsi ke daftar hitam atau daftar putih untuk dipanggil selama kampanye fuzzing menggunakan:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna memulai kampanye fuzzing baik dengan memasukkan `f1`, `f2`, dan `f3` ke daftar hitam atau hanya memanggil fungsi-fungsi ini, sesuai
dengan nilai boolean `filterBlacklist`.

## Cara menguji assert Solidity dengan Echidna {#how-to-test-soliditys-assert-with-echidna}

Dalam tutorial singkat ini, kami akan menunjukkan cara menggunakan Echidna untuk menguji pemeriksaan asersi dalam kontrak. Mari kita andaikan kita memiliki kontrak seperti ini:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    // tmp <= counter
    return (counter - tmp);
  }
}
```

### Menulis asersi {#write-an-assertion}

Kita ingin memastikan bahwa `tmp` kurang dari atau sama dengan `counter` setelah mengembalikan selisihnya. Kita bisa menulis
properti Echidna, tetapi kita perlu menyimpan nilai `tmp` di suatu tempat. Sebagai gantinya, kita bisa menggunakan asersi seperti ini:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

### Jalankan Echidna {#run-echidna-2}

Untuk mengaktifkan pengujian kegagalan asersi, buat [file konfigurasi Echidna](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
checkAsserts: true
```

Saat kita menjalankan kontrak ini di Echidna, kita mendapatkan hasil yang diharapkan:

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Seperti yang Anda lihat, Echidna melaporkan beberapa kegagalan asersi dalam fungsi `inc`. Menambahkan lebih dari satu asersi per fungsi dimungkinkan, tetapi Echidna tidak dapat mengetahui asersi mana yang gagal.

### Kapan dan bagaimana menggunakan asersi {#when-and-how-use-assertions}

Asersi dapat digunakan sebagai alternatif untuk properti eksplisit, terutama jika kondisi yang diperiksa terkait langsung dengan penggunaan yang benar dari beberapa operasi `f`. Menambahkan asersi setelah beberapa kode akan memastikan bahwa pemeriksaan akan terjadi segera setelah dieksekusi:

```solidity
function f(..) public {
    // some complex code
    ...
    assert (condition);
    ...
}

```

Sebaliknya, menggunakan properti echidna eksplisit akan secara acak mengeksekusi transaksi dan tidak ada cara mudah untuk memastikan kapan tepatnya akan diperiksa. Masih mungkin untuk melakukan solusi ini:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

Namun, ada beberapa masalah:

- Ini gagal jika `f` dideklarasikan sebagai `internal` atau `external`.
- Tidak jelas argumen mana yang harus digunakan untuk memanggil `f`.
- Jika `f` melakukan pembalikan, properti akan gagal.

Secara umum, kami menyarankan untuk mengikuti [rekomendasi John Regehr](https://blog.regehr.org/archives/1091) tentang cara menggunakan asersi:

- Jangan paksakan efek samping apa pun selama pemeriksaan asersi. Misalnya: `assert(ChangeStateAndReturn() == 1)`
- Jangan menegaskan pernyataan yang sudah jelas. Misalnya `assert(var >= 0)` di mana `var` dideklarasikan sebagai `uint`.

Terakhir, **jangan gunakan** `require` sebagai ganti `assert`, karena Echidna tidak akan dapat mendeteksinya (tetapi kontrak akan tetap melakukan revert).

### Ringkasan: Pemeriksaan Asersi {#summary-assertion-checking}

Berikut ini merangkum jalannya echidna pada contoh kita:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Echidna menemukan bahwa asersi dalam `inc` dapat gagal jika fungsi ini dipanggil beberapa kali dengan argumen yang besar.

## Mengumpulkan dan memodifikasi korpus Echidna {#collecting-and-modifying-an-echidna-corpus}

Kita akan melihat cara mengumpulkan dan menggunakan korpus transaksi dengan Echidna. Targetnya adalah kontrak pintar berikut [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

```solidity
contract C {
  bool value_found = false;
  function magic(uint magic_1, uint magic_2, uint magic_3, uint magic_4) public {
    require(magic_1 == 42);
    require(magic_2 == 129);
    require(magic_3 == magic_4+333);
    value_found = true;
    return;
  }

  function echidna_magic_values() public returns (bool) {
    return !value_found;
  }

}
```

Contoh kecil ini memaksa Echidna untuk menemukan nilai-nilai tertentu untuk mengubah variabel state. Ini sulit untuk fuzzer
(disarankan untuk menggunakan perangkat eksekusi simbolis seperti [Manticore](https://github.com/trailofbits/manticore)).
Kita bisa menjalankan Echidna untuk memverifikasi ini:

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

Namun, kita masih bisa menggunakan Echidna untuk mengumpulkan korpus saat menjalankan kampanye fuzzing ini.

### Mengumpulkan korpus {#collecting-a-corpus}

Untuk mengaktifkan pengumpulan korpus, buat direktori korpus:

```bash
mkdir corpus-magic
```

Dan sebuah [file konfigurasi Echidna](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

Sekarang kita bisa menjalankan perangkat kita dan memeriksa korpus yang terkumpul:

```bash
echidna-test magic.sol --config config.yaml
```

Echidna masih belum bisa menemukan nilai magic yang benar, tetapi kita bisa melihat korpus yang dikumpulkannya.
Misalnya, salah satu dari file-file ini adalah:

```json
[
  {
    "_gas'": "0xffffffff",
    "_delay": ["0x13647", "0xccf6"],
    "_src": "00a329c0648769a73afac7f9381e08fb43dbea70",
    "_dst": "00a329c0648769a73afac7f9381e08fb43dbea72",
    "_value": "0x0",
    "_call": {
      "tag": "SolCall",
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "93723985220345906694500679277863898678726808528711107336895287282192244575836"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "334"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "68093943901352437066264791224433559271778087297543421781073458233697135179558"
            ],
            "tag": "AbiUInt"
          },
          {
            "tag": "AbiUInt",
            "contents": [256, "332"]
          }
        ]
      ]
    },
    "_gasprice'": "0xa904461f1"
  }
]
```

Jelas, input ini tidak akan memicu kegagalan pada properti kita. Namun, pada langkah berikutnya, kita akan melihat cara memodifikasinya untuk itu.

### Menggunakan korpus sebagai seed {#seeding-a-corpus}

Echidna memerlukan bantuan untuk menangani fungsi `magic`. Kita akan menyalin dan memodifikasi input untuk menggunakan parameter yang sesuai
untuknya:

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

Kita akan memodifikasi `new.txt` untuk memanggil `magic(42,129,333,0)`. Sekarang, kita dapat menjalankan ulang Echidna:

```bash
echidna-test magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    magic(42,129,333,0)


Unique instructions: 142
Unique codehashes: 1
Seed: -7293830866560616537

```

Kali ini, ia menemukan bahwa properti tersebut langsung dilanggar.

## Menemukan transaksi dengan konsumsi gas tinggi {#finding-transactions-with-high-gas-consumption}

Kita akan melihat cara menemukan transaksi dengan konsumsi gas yang tinggi dengan Echidna. Targetnya adalah kontrak pintar berikut:

```solidity
contract C {
  uint state;

  function expensive(uint8 times) internal {
    for(uint8 i=0; i < times; i++)
      state = state + i;
  }

  function f(uint x, uint y, uint8 times) public {
    if (x == 42 && y == 123)
      expensive(times);
    else
      state = 0;
  }

  function echidna_test() public returns (bool) {
    return true;
  }

}
```

Di sini `expensive` bisa memiliki konsumsi gas yang besar.

Saat ini, Echidna selalu memerlukan properti untuk diuji: di sini `echidna_test` selalu mengembalikan `true`.
Kita bisa menjalankan Echidna untuk memverifikasi ini:

```
echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### Mengukur Konsumsi Gas {#measuring-gas-consumption}

Untuk mengaktifkan konsumsi gas dengan Echidna, buat file konfigurasi `config.yaml`:

```yaml
estimateGas: true
```

Dalam contoh ini, kita juga akan mengurangi ukuran urutan transaksi untuk membuat hasilnya lebih mudah dipahami:

```yaml
seqLen: 2
estimateGas: true
```

### Jalankan Echidna {#run-echidna-3}

Setelah file konfigurasi dibuat, kita dapat menjalankan Echidna seperti ini:

```bash
echidna-test gas.sol --config config.yaml
...
echidna_test: passed! 🎉

f used a maximum of 1333608 gas
  Call sequence:
    f(42,123,249) Gas price: 0x10d5733f0a Time delay: 0x495e5 Block delay: 0x88b2

Unique instructions: 157
Unique codehashes: 1
Seed: -325611019680165325

```

- Gas yang ditampilkan adalah estimasi yang disediakan oleh [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-).

### Menyaring Panggilan yang Mengurangi Gas {#filtering-out-gas-reducing-calls}

Tutorial tentang **memfilter fungsi untuk dipanggil selama kampanye fuzzing** di atas menunjukkan cara
menghapus beberapa fungsi dari pengujian Anda.  
Ini bisa menjadi sangat penting untuk mendapatkan perkiraan gas yang akurat.
Perhatikan contoh berikut:

```solidity
contract C {
  address [] addrs;
  function push(address a) public {
    addrs.push(a);
  }
  function pop() public {
    addrs.pop();
  }
  function clear() public{
    addrs.length = 0;
  }
  function check() public{
    for(uint256 i = 0; i < addrs.length; i++)
      for(uint256 j = i+1; j < addrs.length; j++)
        if (addrs[i] == addrs[j])
          addrs[j] = address(0x0);
  }
  function echidna_test() public returns (bool) {
      return true;
  }
}
```

Jika Echidna dapat memanggil semua fungsi, ia tidak akan mudah menemukan transaksi dengan biaya gas yang tinggi:

```
echidna-test pushpop.sol --config config.yaml
...
pop used a maximum of 10746 gas
...
check used a maximum of 23730 gas
...
clear used a maximum of 35916 gas
...
push used a maximum of 40839 gas
```

Itu karena biayanya tergantung pada ukuran `addrs` dan panggilan acak cenderung membuat array hampir kosong.
Namun, memasukkan `pop` dan `clear` ke daftar hitam, akan memberikan hasil yang jauh lebih baik:

```yaml
filterBlacklist: true
filterFunctions: ["pop", "clear"]
```

```
echidna-test pushpop.sol --config config.yaml
...
push used a maximum of 40839 gas
...
check used a maximum of 1484472 gas
```

### Ringkasan: Menemukan transaksi dengan konsumsi gas tinggi {#summary-finding-transactions-with-high-gas-consumption}

Echidna dapat menemukan transaksi dengan konsumsi gas yang tinggi menggunakan opsi konfigurasi `estimateGas`:

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna akan melaporkan urutan dengan konsumsi gas maksimum untuk setiap fungsi, setelah kampanye fuzzing selesai.
