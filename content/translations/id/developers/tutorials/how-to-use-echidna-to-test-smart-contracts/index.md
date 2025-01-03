---
title: Cara menggunakan Echidna untuk menguji kontrak pintar
description: Bagaimana cara menggunakan Echidna untuk secara otomatis menguji kontrak pintar
author: "Trailofbits"
lang: id
tags:
  - "solidity"
  - "kontrak pintar"
  - "keamanan"
  - "pengujian"
  - "fuzzing"
skill: advanced
published: 2020-04-10
source: Membuat kontrak yang aman
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Instalasi {#installation}

Echidna dapat diinstal melalui docker atau dengan menggunakan binari yang telah dikompilasi sebelumnya.

### Echidna melalui docker {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Perintah terakhirnya menjalankan kotak peralatan keamanan eth di dalam docker yang memiliki akses ke direktori Anda saat ini. Anda bisa mengubah file dari host Anda, dan menjalankan peralatannya pada file dari docker_

Dalam docker, jalankan :

```bash
solc-select 0.5.11
cd /home/training
```

### Binari {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## Pengantar fuzzing berbasis properti {#introduction-to-property-based-fuzzing}

Echidna merupakan sebuah fuzzer berbasis properti, yang kami deskripsikan dalam postingan blog kami sebelumnya ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Fuzzing {#fuzzing}

[Fuzzing](https://wikipedia.org/wiki/Fuzzing) adalah sebuah teknik yang terkenal dalam komunitas keamanan. Teknik ini berfungsi untuk membuat lebih banyak atau lebih sedikit input secara acak untuk menemukan bug dalam program. Fuzzer bagi perangkat lunak tradisional (seperti [AFL](http://lcamtuf.coredump.cx/afl/) atau [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) dikenal sebagai peralatan efisien untuk menemukan bug.

Di luar dari pembentukan input acak secara murni, ada banyak teknik dan strategi untuk membuat input yang baik, termasuk:

- Memperoleh umpan balik dari setiap eksekusi dan generasi pemandu yang menggunakannya. Misalnya, jika sebuah input yang baru saja dibuat menghasilkan penemuan jalur baru, ini dapat menjelaskan cara membuat input baru yang dekat dengannya.
- Menghasilkan input yang sesuai dengan batasan struktural. Misalnya, jika input Anda berisi header dengan checksum, akan masuk akal untuk mengizinkan fuzzer membuat input yang memvalidasi checksum.
- Menggunakan input yang diketahui untuk membuat input baru: jika Anda memiliki akses ke kumpulan data besar input yang valid, fuzzer Anda dapat membuat input yang baru darinya, daripada memulai generasinya dari awal. Ini biasa disebut _seed_.

### Fuzzing berbasis properti {#property-based-fuzzing}

Echidna termasuk pada keluarga fuzzer khusus: fuzzing berbasis properti yang sangat diinspirasikan oleh [QuickCheck](https://wikipedia.org/wiki/QuickCheck). Berlawanan dengan fuzzer klasik yang akan mencoba menemukan kesalahan, Echidna akan mencoba memecah invarian yang ditentukan oleh pengguna.

Dalam kontrak pintar, invarian adalah fungsi Solidity, yang dapat mewakili state yang salah atau tidak valid yang dapat dicapai oleh kontrak, yang mencakup:

- Kontrol akses yang salah: penyerang menjadi pemilik kontrak.
- Mesin state yang salah: token dapat ditransfer sementara kontrak dijeda.
- Aritmatika yang salah: pengguna dapat melakukan underflow terhadap saldonya dan mendapatkan token gratis yang tak terbatas.

### Menguji properti dengan Echidna {#testing-a-property-with-echidna}

Kita akan melihat cara menguji kontrak pintar dengan Echidna. Targetnya adalah kontrak pintar [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) berikut ini:

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

Kita akan membuat asumsi bahwa token ini harus memiliki properti berikut ini:

- Siapa pun dapat memiliki maksimum 1000 token
- Token tidak dapat ditransfer (ini bukan token ERC20)

### Tulis sebuah properti {#write-a-property}

Properti Echidna merupakan fungsi Solidity. Sebuah properti harus:

- Tidak memiliki argumen
- Mengembalikan `true` jika berhasil
- Memiliki nama yang dimulai dengan `echidna`

Echidna akan:

- Secara otomatis membuat transaksi arbitrari untuk menguji properti.
- Melaporkan transaksi mana pun yang menyebabkan properti mengembalikan `false` atau yang menghasilkan kesalahan.
- Membuang efek samping saat memanggil properti (mis. jika properti mengubah variabel state, ini akan dibuang setelah tes selesai)

Properti berikut memeriksa bahwa pemanggil tidak memiliki lebih dari 1000 token:

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

Gunakan warisan untuk memisahkan kontrak Anda dari properti Anda:

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) mengimplementasikan properti dan mewariskannya dari token.

### Mulai sebuah kontrak {#initiate-a-contract}

Echidna memerlukan sebuah [pembangun](/developers/docs/smart-contracts/anatomy/#constructor-functions) tanpa argumen. Jika kontrak Anda memerlukan inisialisasi khusus, Anda perlu melakukannya di pembangun.

Ada beberapa alamat khusus di Echidna:

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` yang memanggil pembangun.
- `0x10000`, `0x20000`, dan `0x00a329C0648769a73afAC7F9381e08fb43DBEA70` yang secara acak memanggil fungsi lainnya.

Kita tidak memiliki inisialisasi khusus mana pun dalam contoh kita saat ini, akibatnya pembangun kita kosong.

### Jalankan Echidna {#run-echidna}

Echidna diluncurkan dengan:

```bash
$ echidna-test contract.sol
```

Jika contract.sol berisi berbagai kontrak, Anda dapat menentukan target:

```bash
$ echidna-test contract.sol --contract MyContract
```

### Ringkasan: Menguji sebuah properti {#summary-testing-a-property}

Berikut ini merangkum operasi echidna dalam contoh kita:

```solidity
contract TestToken is Token{
    constructor() public {}
        function echidna_balance_under_1000() public view returns(bool){
          return balances[msg.sender] <= 1000;
        }
  }
```

```bash
$ echidna-test testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence, shrinking (1205/5000):
    airdrop()
    backdoor()

...
```

Echidna menemukan bahwa properti dilanggar jika `backdoor` dipanggil.

## Menyaring fungsi untuk memanggil saat kampanye fuzzing berlangsung {#filtering-functions-to-call-during-a-fuzzing-campaign}

Kita akan melihat cara menyaring fungsi untuk di-fuzz. Targetnya adalah kontrak pintar berikut ini:

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

Contoh kecil ini memaksa Echidna menemukan urutan transaksi spesifik untuk mengubah variabel state. Ini sulit bagi sebuah fuzzer (direkomendasikan untuk menggunakan peralatan eksekusi simbolis seperti [Manticore](https://github.com/trailofbits/manticore)). Kita dapat menjalankan Echidna untuk memverifikasi ini:

```bash
$ echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### Menyaring fungsi {#filtering-functions}

Echidna memiliki masalah dalam menemukan urutan yang benar untuk menguji kontrak ini karena dua fungsi pengaturan ulang (`reset1` dan `reset2`) akan menetapkan semua variabel state ke `false`. Namun, kita dapat menggunakan fitur spesial Echidna untuk membuat daftar hitam fungsi pengaturan ulang atau membuat daftar putih hanya untuk fungsi `f`, `g`, `h` dan `i`.

Untuk membuat daftar hitam fungsi, kita dapat menggunakan file konfigurasi ini:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

Pendekatan lainnya untuk menyaring fungsi adalah mencantumkan fungsi yang dimasukkan ke dalam daftar putih. Untuk itu, kita dapat menggunakan file konfigurasi ini:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` bersifat `true` secara default.
- Penyaringan akan dilakukan berdasarkan nama saja (tanpa parameter). Jika Anda memiliki `f()` dan `f(uint256)`, `"f"` penyaring akan memasangkan kedua fungsi tersebut.

### Jalankan Echidna {#run-echidna-1}

Untuk menjalankan Echidna dengan file konfigutasi `blacklist.yaml`:

```bash
$ echidna-test multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    f(12)
    g(8)
    h(42)
    i()
```

Echidna akan segera menemukan urutan transaksi untuk memalsukan properti.

### Ringkasan: Fungsi penyaringan {#summary-filtering-functions}

Echidna dapat membuat daftar hitam atau daftar putih fungsi yang dipanggil pada saat kampanye fuzzing dengan menggunakan:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
$ echidna-test contract.sol --config config.yaml
...
```

Echidna memulai kampanye fuzzing dengan membuat daftar hitam `f1`, `f2` dan `f3` atau hanya memanggil ini, berdasarkan nilai dari boolean `filterBlacklist`.

## Bagaimana cara menguji assert Solidity dengan Echidna {#how-to-test-soliditys-assert-with-echidna}

Dalam tutorial pendek ini, kami akan menunjukkan bagaimana cara menggunakan Echidna untuk menguji pemeriksaan fungsi penegasan dalam kontrak. Anggaplah kita memiliki sebuah kontrak seperti ini:

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

### Tulis sebuah penegasan {#write-an-assertion}

Kita ingin memastikan bahwa `tmp` kurang dari atau sama dengan `counter` setelah mengembalikan perbedaannya. Kita dapat menulis sebuah properti Echidna, tetapi kita akan perlu menyimpan nilai `tmp` di suatu tempat. Sebagai gantinya, kita dapat menggunakan sebuah penegasan seperti yang ini:

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

To enable the assertion failure testing, create an [Echidna configuration file](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
checkAsserts: true
```

Ketika kita menjalankan kontrak di Echidna, kita mendapatkan hasil yang diharapkan:

```bash
$ echidna-test assert.sol --config config.yaml
Menganalisis kontrak: assert.sol:Incrementor
assertion in inc: failed!💥
  Urutan pemanggilan, menyusut (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Seperti yang Anda dapat lihat, Echidna melaporkan beberapa kegagalan penegasan dalam fungsi `inc`. Dimungkinkan menambahkan lebih dari satu penegasan per fungsi, tetapi Echidna tidak dapat mengetahui penegasan mana yang gagal.

### Kapan dan bagaimana cara menggunakan penegasan {#when-and-how-use-assertions}

Penegasan dapat digunakan sebagai alternatif untuk properti eksplisit, secara khusus jika kondisi untuk memeriksa terkait langsung dengan penggunaan beberapa operasi `f` yang benar. Adding assertions after some code will enforce that the check will happen immediately after it was executed:

```solidity
function f(..) public {
    // some complex code
    ...
    assert (condition);
    ...
}

```

Sebaliknya, menggunakan properti eksplisit echidna akan secara acak mengeksekusi transaksi dan tidak ada cara mudah untuk menerapkannya secara persis ketika akan diperiksa. Namun, masih mungkin untuk menyelesaikan ini:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

Namun, ada beberapa masalah:

- Gagal jika `f` dideklarasikan sebagai `internal` atau `external`.
- Tidak jelas argumen mana yang harus digunakan untuk memanggil `f`.
- Jika `f` melakukan pembalikan, properti akan gagal.

Secara umum, kami menyarankan mengikuti [rekomendasi John Regehr](https://blog.regehr.org/archives/1091) tentang bagaimana cara menggunakan penegasan:

- Jangan memaksakan efek samping apa pun pada saat pemeriksaan penegasan dilakukan. Misalnya: `assert(ChangeStateAndReturn() == 1)`
- Jangan menegaskan pernyataan yang jelas. Misalnya `assert(var >= 0)` di mana `var` dideklarasikan sebagai `uint`.

Akhirnya, harap **tidak menggunakan** `require` ketimbang `assert`, karena Echidna tidak akan dapat mendeteksinya (tetapi kontraknya bagaimana pun akan melakukan pembalikan).

### Ringkasan: Pemeriksaan Penegasan {#summary-assertion-checking}

Berikut ini merangkum operasi echidna dalam contoh kita:

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
$ echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Echidna menemukan bahwa penegasan dalam `inc` dapat gagal jika fungsi ini dipanggil beberapa kali dengan argumen yang besar.

## Mengumpulkan dan memodifikasi sebuah korpus Echidna {#collecting-and-modifying-an-echidna-corpus}

Kita akan melihat bagaimana cara mengumpulkan dan menggunakan sebuah korpus transaksi dengan Echidna. Targetnya adalah kontrak pintar [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol) berikut ini:

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

Contoh kecil ini memaksa Echidna menemukan nilai tertentu untuk mengubah sebuah variabel state. Ini sulit bagi sebuah fuzzer (direkomendasikan untuk menggunakan peralatan eksekusi simbolis seperti [Manticore](https://github.com/trailofbits/manticore)). Kita dapat menjalankan Echidna untuk memverifikasi ini:

```bash
$ echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

Namun, kita masih dapat menggunakan Echidna untuk mengumpulkan korpus ketika menjalankan kampanye fuzzing ini.

### Mengumpulkan sebuah korpus {#collecting-a-corpus}

Untuk memungkinkan pengumpulan korpus, buat sebuah direktori korpus:

```bash
$ mkdir corpus-magic
```

Dan [file konfigurasi Echidna](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

Sekarang kita dapat menjalankan peralatan kita dan memeriksa korpus yang dikumpulkan:

```bash
$ echidna-test magic.sol --config config.yaml
```

Echidna masih tidak dapat menemukan nilai magic yang benar, tetapi kita dapat melihat korpus yang dikumpulkannya. Sebagai contoh, salah satu dari file ini adalah:

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

Jelas, input ini tidak akan memicu kegagalan dalam properti kita. Namun, dalam tahap berikutnya, kita akan melihat bagaimana cara untuk memodifikasinya untuk tujuan itu.

### Membuat seed dari sebuah korpus {#seeding-a-corpus}

Echidna membutuhkan beberapa bantuan untuk menangani fungsi `magic`. Kita akan menyalin dan memodifikasi input agar parameter yang sesuai digunakan untuknya:

```bash
$ cp corpus/2712688662897926208.txt corpus/new.txt
```

Kita akan memodifikasi `new.txt` untuk memanggil `magic(42,129,333,0)`. Sekarang, kita dapat menjalankan Echidna kembali:

```bash
$ echidna-test magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    magic(42,129,333,0)


Unique instructions: 142
Unique codehashes: 1
Seed: -7293830866560616537

```

This time, it found that the property is violated immediately.

## Menemukan transaksi dengan pemakaiaan gas yang tinggi {#finding-transactions-with-high-gas-consumption}

We will see how to find the transactions with high gas consumption with Echidna. Targetnya adalah kontrak pintar berikut ini:

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

Di sini `expensive` dapat memiliki pemakaian gas yang besar.

Saat ini, Echidna selalu memerlukan sebuah properti untuk melakukan pengujian: di sini `echidna_test` selalu mengembalikan `true`. Kita dapat menjalankan Echidna untuk memverifikasi ini:

```
$ echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### Mengukur Pemakaian Gas {#measuring-gas-consumption}

To enable the gas consumption with Echidna, create a configuration file `config.yaml`:

```yaml
estimateGas: true
```

Dalam contoh ini, kita juga akan mengurangi ukuran urutan transaksi untuk membuat hasilnya lebih mudah dimengerti:

```yaml
seqLen: 2
estimateGas: true
```

### Run Echidna {#run-echidna-3}

Setelah kita memiliki file konfigurasi yang telah dibuat, kita dapat menjalankan Echidna seperti ini:

```bash
$ echidna-test gas.sol --config config.yaml
...
echidna_test: passed! 🎉

f used a maximum of 1333608 gas
  Call sequence:
    f(42,123,249) Gas price: 0x10d5733f0a Time delay: 0x495e5 Block delay: 0x88b2

Unique instructions: 157
Unique codehashes: 1
Seed: -325611019680165325

```

- Gas yang diperlihatkan adalah sebuah perkiraan yang disediakan oleh [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-).

### Menyaring Pemanggilan Pengurangan Gas {#filtering-out-gas-reducing-calls}

Tutorial tentang **menyaring fungsi untuk melakukan pemanggilan pada saat kampanye fuzzing** di atas menunjukkan cara menghilangkan beberapa fungsi dari pengujian Anda.  
Langkah ini dapat menjadi sangat penting untuk mendapatkan sebuah perkiraan gas yang akurat. Perhatikan contoh berikut:

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

Jika Echidna dapat memanggil semua fungsi, fungsi ini tidak akan dengan mudah menemukan transaksi dengan harga has yang tinggi:

```
$ echidna-test pushpop.sol --config config.yaml
...
pop used a maximum of 10746 gas
...
check used a maximum of 23730 gas
...
clear used a maximum of 35916 gas
...
push used a maximum of 40839 gas
```

Itu karena harganya bergantung pada ukuran `addrs` dan pemanggilan acak cenderung membuat array hampir kosong. Namun, memasukkan `pop` dan `clear` ke dalam daftar hitam memberikan kita hasil yang lebih baik:

```yaml
filterBlacklist: true
filterFunctions: ["pop", "clear"]
```

```
$ echidna-test pushpop.sol --config config.yaml
...
push used a maximum of 40839 gas
...
check used a maximum of 1484472 gas
```

### Ringkasan: Menemukan transaksi dengan pemakaian gas yang tinggi {#summary-finding-transactions-with-high-gas-consumption}

Echidna dapat menemukan transaksi dengan pemakaian gas yang tinggi dengan menggunakan opsi konfigurasi `estimateGas`:

```yaml
estimateGas: true
```

```bash
$ echidna-test contract.sol --config config.yaml
...
```

Echidna akan melaporkan urutan dengan pemakaian gas maksimum untuk setiap fungsi, setelah kampanye fuzzing selesai.
