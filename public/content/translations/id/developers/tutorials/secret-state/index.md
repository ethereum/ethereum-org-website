---
title: Menggunakan zero-knowledge untuk state rahasia
description: Permainan onchain terbatas karena tidak dapat menyimpan informasi tersembunyi apa pun. Setelah membaca tutorial ini, pembaca akan dapat menggabungkan bukti tanpa pengetahuan dan komponen server untuk membuat permainan yang dapat diverifikasi dengan komponen state rahasia secara offchain. Teknik untuk melakukan ini akan didemonstrasikan dengan membuat permainan minesweeper.
author: Ori Pomerantz
tags: ["server", "offchain", "terpusat", "zero-knowledge", "zokrates", "mud", "privasi"]
skill: advanced
breadcrumb: State rahasia ZK
lang: id
published: 2025-03-15
---

_Tidak ada rahasia di rantai blok_. Segala sesuatu yang diposting di rantai blok terbuka untuk dibaca oleh siapa saja. Hal ini diperlukan, karena rantai blok didasarkan pada kemampuan siapa saja untuk memverifikasinya. Namun, permainan sering kali bergantung pada state rahasia. Misalnya, permainan [minesweeper](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) sama sekali tidak masuk akal jika Anda bisa begitu saja membuka penjelajah blok dan melihat petanya.

Solusi paling sederhana adalah menggunakan [komponen server](/developers/tutorials/server-components/) untuk menyimpan state rahasia. Namun, alasan kita menggunakan rantai blok adalah untuk mencegah kecurangan oleh pengembang permainan. Kita perlu memastikan kejujuran komponen server. Server dapat memberikan hash dari state tersebut, dan menggunakan [bukti tanpa pengetahuan](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) untuk membuktikan bahwa state yang digunakan untuk menghitung hasil dari suatu langkah adalah benar.

Setelah membaca artikel ini, Anda akan tahu cara membuat server penyimpan state rahasia semacam ini, klien untuk menampilkan state, dan komponen onchain untuk komunikasi di antara keduanya. Alat utama yang akan kita gunakan adalah:

| Alat                                          | Tujuan                                                  | Diverifikasi pada versi |
| --------------------------------------------- | ------------------------------------------------------- | ------------------: |
| [Zokrates](https://zokrates.github.io/)       | Bukti tanpa pengetahuan dan verifikasinya               |               1.1.9 |
| [Typescript](https://www.typescriptlang.org/) | Bahasa pemrograman untuk server dan klien               |               5.4.2 |
| [Node](https://nodejs.org/en)                 | Menjalankan server                                      |             20.18.2 |
| [Viem](https://viem.sh/)                      | Komunikasi dengan Rantai Blok                           |              2.9.20 |
| [MUD](https://mud.dev/)                       | Manajemen data onchain                                  |              2.0.12 |
| [React](https://react.dev/)                   | Antarmuka pengguna klien                                |              18.2.0 |
| [Vite](https://vitejs.dev/)                   | Menyajikan kode klien                                   |               4.2.1 |

## Contoh Minesweeper {#minesweeper}

[Minesweeper](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) adalah permainan yang mencakup peta rahasia dengan ladang ranjau. Pemain memilih untuk menggali di lokasi tertentu. Jika lokasi tersebut memiliki ranjau, permainan berakhir. Jika tidak, pemain mendapatkan jumlah ranjau di delapan kotak yang mengelilingi lokasi tersebut.

Aplikasi ini ditulis menggunakan [MUD](https://mud.dev/), sebuah kerangka kerja yang memungkinkan kita menyimpan data onchain menggunakan [basis data kunci-nilai](https://aws.amazon.com/nosql/key-value/) dan menyinkronkan data tersebut secara otomatis dengan komponen offchain. Selain sinkronisasi, MUD memudahkan penyediaan kontrol akses, dan bagi pengguna lain untuk [memperluas](https://mud.dev/guides/extending-a-world) aplikasi kita tanpa izin.

### Menjalankan contoh minesweeper {#running-minesweeper-example}

Untuk menjalankan contoh minesweeper:

1. Pastikan Anda [telah menginstal prasyaratnya](https://mud.dev/quickstart#prerequisites): [Node](https://mud.dev/quickstart#prerequisites), [Foundry](https://book.getfoundry.sh/getting-started/installation), [`git`](https://git-scm.com/downloads), [`pnpm`](https://git-scm.com/downloads), dan [`mprocs`](https://github.com/pvolok/mprocs).

2. Klon repositori.

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. Instal paket-paketnya.

   ```sh copy
   cd 20240901-secret-state/
   pnpm install
   npm install -g mprocs
   ```

   Jika Foundry diinstal sebagai bagian dari `pnpm install`, Anda perlu memulai ulang shell baris perintah.

4. Kompilasi kontrak

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```


5. Mulai program (termasuk rantai blok [Anvil](https://book.getfoundry.sh/anvil/)) dan tunggu.

   ```sh copy
   mprocs
   ```

   Perhatikan bahwa proses startup membutuhkan waktu yang lama. Untuk melihat kemajuannya, pertama-tama gunakan panah bawah untuk menggulir ke tab _contracts_ guna melihat kontrak MUD yang sedang disebarkan. Saat Anda mendapatkan pesan _Waiting for file changes…_, kontrak telah disebarkan dan kemajuan selanjutnya akan terjadi di tab _server_. Di sana, Anda menunggu hingga mendapatkan pesan _Verifier address: 0x...._.

   Jika langkah ini berhasil, Anda akan melihat layar `mprocs`, dengan berbagai proses di sebelah kiri dan keluaran konsol untuk proses yang saat ini dipilih di sebelah kanan.

   ![The mprocs screen](./mprocs.png)

   Jika ada masalah dengan `mprocs`, Anda dapat menjalankan keempat proses tersebut secara manual, masing-masing di jendela baris perintahnya sendiri:

   - **Anvil**

     ```sh
     cd packages/contracts
     anvil --base-fee 0 --block-time 2
     ```

   - **Kontrak** 

     ```sh
     cd packages/contracts
     pnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **Server**

     ```sh
     cd packages/server
     pnpm start
     ```  

   - **Klien**

     ```sh
     cd packages/client
     pnpm run dev
     ```  

6. Sekarang Anda dapat menelusuri [klien](http://localhost:3000), klik **New Game**, dan mulai bermain.

### Tabel {#tables}

Kita memerlukan [beberapa tabel](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) onchain.

- `Configuration`: Tabel ini adalah singleton, tidak memiliki kunci dan hanya memiliki satu catatan. Tabel ini digunakan untuk menyimpan informasi konfigurasi permainan:
  - `height`: Tinggi ladang ranjau
  - `width`: Lebar ladang ranjau
  - `numberOfBombs`: Jumlah bom di setiap ladang ranjau
- `VerifierAddress`: Tabel ini juga merupakan singleton. Tabel ini digunakan untuk menyimpan satu bagian dari konfigurasi, yaitu alamat kontrak pemverifikasi (`verifier`). Kita bisa saja meletakkan informasi ini di tabel `Configuration`, tetapi informasi ini diatur oleh komponen yang berbeda, yaitu server, sehingga lebih mudah untuk meletakkannya di tabel terpisah.

- `PlayerGame`: Kuncinya adalah alamat pemain. Datanya adalah:

  - `gameId`: Nilai 32-byte yang merupakan hash dari peta tempat pemain bermain (pengidentifikasi permainan).
  - `win`: boolean yang menunjukkan apakah pemain memenangkan permainan.
  - `lose`: boolean yang menunjukkan apakah pemain kalah dalam permainan.
  - `digNumber`: jumlah galian yang berhasil dalam permainan.

- `GamePlayer`: Tabel ini menyimpan pemetaan terbalik, dari `gameId` ke alamat pemain.

- `Map`: Kuncinya adalah tupel dari tiga nilai:

  - `gameId`: Nilai 32-byte yang merupakan hash dari peta tempat pemain bermain (pengidentifikasi permainan).
  - Koordinat `x`
  - Koordinat `y`

  Nilainya adalah angka tunggal. Nilainya 255 jika bom terdeteksi. Jika tidak, nilainya adalah jumlah bom di sekitar lokasi tersebut ditambah satu. Kita tidak bisa hanya menggunakan jumlah bom, karena secara bawaan semua penyimpanan di EVM dan semua nilai baris di MUD adalah nol. Kita perlu membedakan antara "pemain belum menggali di sini" dan "pemain menggali di sini, dan menemukan tidak ada bom di sekitarnya".

Selain itu, komunikasi antara klien dan server terjadi melalui komponen onchain. Hal ini juga diimplementasikan menggunakan tabel.

- `PendingGame`: Permintaan yang belum dilayani untuk memulai permainan baru.
- `PendingDig`: Permintaan yang belum dilayani untuk menggali di tempat tertentu dalam permainan tertentu. Ini adalah [tabel offchain](https://mud.dev/store/tables#types-of-tables), yang berarti tabel ini tidak ditulis ke penyimpanan EVM, melainkan hanya dapat dibaca secara offchain menggunakan peristiwa.

### Alur eksekusi dan data {#execution-data-flows}

Alur ini mengoordinasikan eksekusi antara klien, komponen onchain, dan server.

#### Inisialisasi {#initialization-flow}

Saat Anda menjalankan `mprocs`, langkah-langkah ini terjadi:

1. [`mprocs`](https://github.com/pvolok/mprocs) menjalankan empat komponen:

   - [Anvil](https://book.getfoundry.sh/anvil/), yang menjalankan rantai blok lokal
   - [Kontrak](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts), yang mengompilasi (jika perlu) dan menyebarkan kontrak untuk MUD
   - [Klien](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client), yang menjalankan [Vite](https://vitejs.dev/) untuk menyajikan antarmuka pengguna (UI) dan kode klien ke peramban web.
   - [Server](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server), yang melakukan tindakan server

2. Paket `contracts` menyebarkan kontrak MUD dan kemudian menjalankan [skrip `PostDeploy.s.sol`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol). Skrip ini mengatur konfigurasi. Kode dari GitHub menentukan [ladang ranjau 10x5 dengan delapan ranjau di dalamnya](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23).

3. [Server](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) dimulai dengan [menyiapkan MUD](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6). Antara lain, ini mengaktifkan sinkronisasi data, sehingga salinan tabel yang relevan ada di memori server.

4. Server berlangganan fungsi yang akan dieksekusi [saat tabel `Configuration` berubah](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23). [Fungsi ini](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) dipanggil setelah `PostDeploy.s.sol` dieksekusi dan memodifikasi tabel.

5. Saat fungsi inisialisasi server memiliki konfigurasi, [fungsi tersebut memanggil `zkFunctions`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35) untuk menginisialisasi [bagian zero-knowledge dari server](#using-zokrates-from-typescript). Hal ini tidak dapat terjadi hingga kita mendapatkan konfigurasi karena fungsi zero-knowledge harus memiliki lebar dan tinggi ladang ranjau sebagai konstanta.

6. Setelah bagian zero-knowledge dari server diinisialisasi, langkah selanjutnya adalah [menyebarkan kontrak verifikasi zero-knowledge ke rantai blok](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) dan mengatur alamat pemverifikasi di MUD.

7. Terakhir, kita berlangganan pembaruan sehingga kita akan melihat saat pemain meminta [untuk memulai permainan baru](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) atau [menggali dalam permainan yang ada](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108).

#### Permainan baru {#new-game-flow}

Inilah yang terjadi saat pemain meminta permainan baru.

1. Jika tidak ada permainan yang sedang berlangsung untuk pemain ini, atau ada satu tetapi dengan gameId nol, klien akan menampilkan [tombol permainan baru](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175). Saat pengguna menekan tombol ini, [React menjalankan fungsi `newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96).

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) adalah panggilan `System`. Di MUD, semua panggilan dirutekan melalui kontrak `World`, dan dalam banyak kasus Anda memanggil `<namespace>__<function name>`. Dalam kasus ini, panggilan ditujukan ke `app__newGame`, yang kemudian dirutekan oleh MUD ke [`newGame` di `GameSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22).

3. Fungsi onchain memeriksa bahwa pemain tidak memiliki permainan yang sedang berlangsung, dan jika tidak ada, fungsi tersebut [menambahkan permintaan ke tabel `PendingGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21).

4. Server mendeteksi perubahan pada `PendingGame` dan [menjalankan fungsi yang dilanggan](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71). Fungsi ini memanggil [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114), yang pada gilirannya memanggil [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144).

5. Hal pertama yang dilakukan `createGame` adalah [membuat peta acak dengan jumlah ranjau yang sesuai](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135). Kemudian, fungsi ini memanggil [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) untuk membuat peta dengan batas kosong, yang diperlukan untuk Zokrates. Terakhir, `createGame` memanggil [`calculateMapHash`](#calculatemaphash), untuk mendapatkan hash dari peta, yang digunakan sebagai ID permainan.

6. Fungsi `newGame` menambahkan permainan baru ke `gamesInProgress`.

7. Hal terakhir yang dilakukan server adalah memanggil [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43), yang berada onchain. Fungsi ini berada di `System` yang berbeda, yaitu [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol), untuk mengaktifkan kontrol akses. Kontrol akses didefinisikan dalam [berkas konfigurasi MUD](https://mud.dev/config), [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72).

   Daftar akses hanya mengizinkan satu alamat tunggal untuk memanggil `System`. Hal ini membatasi akses ke fungsi server hanya pada satu alamat, sehingga tidak ada yang dapat meniru server.

8. Komponen onchain memperbarui tabel yang relevan:

   - Membuat permainan di `PlayerGame`.
   - Mengatur pemetaan terbalik di `GamePlayer`.
   - Menghapus permintaan dari `PendingGame`.

9. Server mengidentifikasi perubahan pada `PendingGame`, tetapi tidak melakukan apa pun karena [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) bernilai salah (false).

10. Pada klien, [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) diatur ke entri `PlayerGame` untuk alamat pemain. Saat `PlayerGame` berubah, `gameRecord` juga ikut berubah.

11. Jika ada nilai di `gameRecord`, dan permainan belum dimenangkan atau dikalahkan, klien [menampilkan peta](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190).

#### Menggali {#dig-flow}

1. Pemain [mengeklik tombol sel peta](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), yang memanggil [fungsi `dig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36). Fungsi ini memanggil [`dig` onchain](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32).

2. Komponen onchain [melakukan sejumlah pemeriksaan kewarasan (sanity check)](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30), dan jika berhasil, menambahkan permintaan penggalian ke [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31).

3. Server [mendeteksi perubahan pada `PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73). [Jika valid](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), server [memanggil kode zero-knowledge](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (dijelaskan di bawah) untuk menghasilkan hasil dan bukti bahwa itu valid.

4. [Server](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) memanggil [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) onchain.

5. `digResponse` melakukan dua hal. Pertama, fungsi ini memeriksa [bukti tanpa pengetahuan](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61). Kemudian, jika buktinya valid, fungsi ini memanggil [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) untuk benar-benar memproses hasilnya.

6. `processDigResult` memeriksa apakah permainan telah [kalah](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) atau [menang](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86), dan [memperbarui `Map`, yaitu peta onchain](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80).

7. Klien mengambil pembaruan secara otomatis dan [memperbarui peta yang ditampilkan kepada pemain](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190), dan jika berlaku, memberi tahu pemain apakah mereka menang atau kalah.

## Menggunakan Zokrates {#using-zokrates}

Dalam alur yang dijelaskan di atas, kita melewatkan bagian zero-knowledge, memperlakukannya sebagai kotak hitam. Sekarang mari kita buka dan lihat bagaimana kode tersebut ditulis.

### Proses hash peta {#hashing-map}

Kita dapat menggunakan [kode JavaScript ini](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) untuk mengimplementasikan [Poseidon](https://www.poseidon-hash.info), fungsi hash Zokrates yang kita gunakan. Namun, meskipun ini akan lebih cepat, ini juga akan lebih rumit daripada sekadar menggunakan fungsi hash Zokrates untuk melakukannya. Ini adalah tutorial, sehingga kodenya dioptimalkan untuk kesederhanaan, bukan untuk performa. Oleh karena itu, kita memerlukan dua program Zokrates yang berbeda, satu untuk sekadar menghitung hash dari sebuah peta (`hash`) dan satu lagi untuk benar-benar membuat bukti tanpa pengetahuan dari hasil penggalian di suatu lokasi di peta (`dig`).

### Fungsi hash {#hash-function}

Ini adalah fungsi yang menghitung hash dari sebuah peta. Kita akan membahas kode ini baris demi baris.

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

Kedua baris ini mengimpor dua fungsi dari [pustaka standar Zokrates](https://zokrates.github.io/toolbox/stdlib.html). [Fungsi pertama](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) adalah [hash Poseidon](https://www.poseidon-hash.info/). Fungsi ini mengambil sebuah array dari [elemen `field`](https://zokrates.github.io/language/types.html#field) dan mengembalikan sebuah `field`.

Elemen field di Zokrates biasanya memiliki panjang kurang dari 256 bit, tetapi tidak jauh berbeda. Untuk menyederhanakan kode, kita membatasi peta hingga 512 bit, dan menge-hash sebuah array yang terdiri dari empat field, dan di setiap field kita hanya menggunakan 128 bit. [Fungsi `pack128`](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) mengubah sebuah array 128 bit menjadi sebuah `field` untuk tujuan ini.

```
def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

Baris ini memulai definisi fungsi. `hashMap` mendapatkan parameter tunggal yang disebut `map`, sebuah array `bool`(ean) dua dimensi. Ukuran peta adalah `width+2` kali `height+2` karena alasan yang [dijelaskan di bawah ini](#why-map-border).

Kita dapat menggunakan `${width+2}` dan `${height+2}` karena program Zokrates disimpan dalam aplikasi ini sebagai [string templat](https://www.w3schools.com/js/js_string_templates.asp). Kode di antara `${` dan `}` dievaluasi oleh JavaScript, dan dengan cara ini program dapat digunakan untuk ukuran peta yang berbeda. Parameter peta memiliki batas selebar satu lokasi di sekelilingnya tanpa bom apa pun, yang merupakan alasan kita perlu menambahkan dua pada lebar dan tingginya.

Nilai yang dikembalikan adalah sebuah `field` yang berisi hash tersebut.

```
bool[512] mut map1d = [false; 512];
```

Peta tersebut adalah dua dimensi. Namun, fungsi `pack128` tidak berfungsi dengan array dua dimensi. Jadi pertama-tama kita meratakan peta menjadi array 512-byte, menggunakan `map1d`. Secara default variabel Zokrates adalah konstanta, tetapi kita perlu menetapkan nilai ke array ini dalam sebuah loop, jadi kita mendefinisikannya sebagai [`mut`](https://zokrates.github.io/language/variables.html#mutability).

Kita perlu menginisialisasi array karena Zokrates tidak memiliki `undefined`. Ekspresi `[false; 512]` berarti [sebuah array yang terdiri dari 512 nilai `false`](https://zokrates.github.io/language/types.html#declaration-and-initialization).

```
u32 mut counter = 0;
```

Kita juga memerlukan penghitung untuk membedakan antara bit yang sudah kita isi di `map1d` dan yang belum.

```
for u32 x in 0..${width+2} {
```

Beginilah cara Anda mendeklarasikan sebuah [loop `for`](https://zokrates.github.io/language/control_flow.html#for-loops) di Zokrates. Loop `for` Zokrates harus memiliki batas yang tetap, karena meskipun tampak seperti loop, kompiler sebenarnya "membukanya" (unroll). Ekspresi `${width+2}` adalah konstanta waktu kompilasi karena `width` ditetapkan oleh kode TypeScript sebelum memanggil kompiler.

```
for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

Untuk setiap lokasi di peta, masukkan nilai tersebut ke dalam array `map1d` dan tingkatkan penghitungnya.

```
field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

`pack128` untuk membuat sebuah array yang terdiri dari empat nilai `field` dari `map1d`. Di Zokrates `array[a..b]` berarti irisan array yang dimulai pada `a` dan berakhir pada `b-1`.

```
return poseidon(hashMe);
}
```

Gunakan `poseidon` untuk mengonversi array ini menjadi sebuah hash.

### Program hash {#hash-program}

Server perlu memanggil `hashMap` secara langsung untuk membuat pengidentifikasi permainan. Namun, Zokrates hanya dapat memanggil fungsi `main` pada sebuah program untuk memulai, jadi kita membuat program dengan sebuah `main` yang memanggil fungsi hash.

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### Program penggalian {#dig-program}

Ini adalah inti dari bagian zero-knowledge dari aplikasi, di mana kita menghasilkan bukti yang digunakan untuk memverifikasi hasil penggalian.

```
${hashFragment}

// Jumlah ranjau di lokasi (x,y)
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### Mengapa ada batas peta {#why-map-border}

Bukti tanpa pengetahuan menggunakan [sirkuit aritmatika](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785), yang tidak memiliki padanan yang mudah untuk pernyataan `if`. Sebaliknya, mereka menggunakan padanan dari [operator kondisional](https://en.wikipedia.org/wiki/Ternary_conditional_operator). Jika `a` bisa bernilai nol atau satu, Anda dapat menghitung `if a { b } else { c }` sebagai `ab+(1-a)c`.

Karena hal ini, pernyataan `if` Zokrates selalu mengevaluasi kedua cabang. Misalnya, jika Anda memiliki kode ini:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

Ini akan menghasilkan kesalahan, karena ia perlu menghitung `arr[10]`, meskipun nilai tersebut nantinya akan dikalikan dengan nol.

Inilah alasan kita memerlukan batas selebar satu lokasi di sekeliling peta. Kita perlu menghitung jumlah total ranjau di sekitar suatu lokasi, dan itu berarti kita perlu melihat lokasi satu baris di atas dan di bawah, ke kiri dan ke kanan, dari lokasi tempat kita menggali. Yang berarti lokasi tersebut harus ada dalam array peta yang diberikan kepada Zokrates.

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

Secara default, bukti Zokrates menyertakan inputnya. Tidak ada gunanya mengetahui ada lima ranjau di sekitar suatu titik kecuali Anda benar-benar tahu titik yang mana itu (dan Anda tidak bisa begitu saja mencocokkannya dengan permintaan Anda, karena pembukti dapat menggunakan nilai yang berbeda dan tidak memberi tahu Anda tentang hal itu). Namun, kita perlu merahasiakan peta tersebut, sambil memberikannya kepada Zokrates. Solusinya adalah menggunakan parameter `private`, yang _tidak_ diungkapkan oleh bukti tersebut.

Ini membuka celah lain untuk penyalahgunaan. Pembukti dapat menggunakan koordinat yang benar, tetapi membuat peta dengan jumlah ranjau berapa pun di sekitar lokasi, dan mungkin di lokasi itu sendiri. Untuk mencegah penyalahgunaan ini, kita membuat bukti tanpa pengetahuan menyertakan hash dari peta, yang merupakan pengidentifikasi permainan.

```
return (hashMap(map),
```

Nilai yang dikembalikan di sini adalah sebuah tuple yang mencakup array hash peta serta hasil penggalian.

```
if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

Kita menggunakan 255 sebagai nilai khusus jika lokasi itu sendiri memiliki bom.

```
map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

Jika pemain belum mengenai ranjau, tambahkan jumlah ranjau untuk area di sekitar lokasi dan kembalikan nilai tersebut.

### Menggunakan Zokrates dari TypeScript {#using-zokrates-from-typescript}

Zokrates memiliki antarmuka baris perintah, tetapi dalam program ini kita menggunakannya di [kode TypeScript](https://zokrates.github.io/toolbox/zokrates_js.html).

Pustaka yang berisi definisi Zokrates disebut [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts).

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

Impor [binding JavaScript Zokrates](https://zokrates.github.io/toolbox/zokrates_js.html). Kita hanya memerlukan fungsi [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) karena fungsi ini mengembalikan sebuah promise yang menyelesaikan semua definisi Zokrates.

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Mirip dengan Zokrates itu sendiri, kita juga hanya mengekspor satu fungsi, yang juga [asinkron](https://www.w3schools.com/js/js_async.asp). Ketika akhirnya mengembalikan nilai, ia menyediakan beberapa fungsi seperti yang akan kita lihat di bawah ini.

```typescript
const zokrates = await zokratesInitialize()
```

Inisialisasi Zokrates, dapatkan semua yang kita butuhkan dari pustaka.

```typescript
const hashFragment = `
        import "utils/pack/bool/pack128.zok" as pack128;
        import "hashes/poseidon/poseidon.zok" as poseidon;
            .
            .
            .
        }
    `

const hashProgram = `
        ${hashFragment}
            .
            .
            .
    `

const digProgram = `
        ${hashFragment}
            .
            .
            .
    `
```

Selanjutnya kita memiliki fungsi hash dan dua program Zokrates yang kita lihat di atas.

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

Di sini kita mengompilasi program-program tersebut.

```typescript
// Buat kunci untuk verifikasi zero-knowledge.
// Pada sistem produksi, Anda sebaiknya menggunakan seremoni pengaturan.
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

Pada sistem produksi kita mungkin menggunakan [upacara penyiapan](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) yang lebih rumit, tetapi ini sudah cukup baik untuk demonstrasi. Bukan masalah jika pengguna dapat mengetahui kunci pembukti - mereka tetap tidak dapat menggunakannya untuk membuktikan sesuatu kecuali jika hal itu benar. Karena kita menentukan entropi (parameter kedua, `""`), hasilnya akan selalu sama.

**Catatan:** Kompilasi program Zokrates dan pembuatan kunci adalah proses yang lambat. Tidak perlu mengulanginya setiap saat, hanya ketika ukuran peta berubah. Pada sistem produksi, Anda akan melakukannya sekali, lalu menyimpan outputnya. Satu-satunya alasan saya tidak melakukannya di sini adalah demi kesederhanaan.

#### `calculateMapHash` {#calculatemaphash}

```typescript
const calculateMapHash = function (hashMe: boolean[][]): string {
  return (
    "0x" +
    BigInt(zokrates.computeWitness(hashCompiled, [hashMe]).output.slice(1, -1))
      .toString(16)
      .padStart(64, "0")
  )
}
```

Fungsi [`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) sebenarnya menjalankan program Zokrates. Fungsi ini mengembalikan struktur dengan dua field: `output`, yang merupakan output dari program sebagai string JSON, dan `witness`, yang merupakan informasi yang diperlukan untuk membuat bukti tanpa pengetahuan dari hasilnya. Di sini kita hanya membutuhkan outputnya.

Outputnya adalah string dalam bentuk `"31337"`, sebuah angka desimal yang diapit tanda kutip. Namun output yang kita butuhkan untuk `viem` adalah angka heksadesimal dalam bentuk `0x60A7`. Jadi kita menggunakan `.slice(1,-1)` untuk menghapus tanda kutip dan kemudian `BigInt` untuk menjalankan string yang tersisa, yang merupakan angka desimal, ke sebuah [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt). `.toString(16)` mengonversi `BigInt` ini menjadi string heksadesimal, dan `"0x"+` menambahkan penanda untuk angka heksadesimal.

```typescript
// Gali dan kembalikan bukti tanpa pengetahuan dari hasilnya
// (kode sisi server)
```

Bukti tanpa pengetahuan mencakup input publik (`x` dan `y`) dan hasil (hash dari peta dan jumlah bom).

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

Memeriksa apakah sebuah indeks berada di luar batas di Zokrates adalah sebuah masalah, jadi kita melakukannya di sini.

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

Jalankan program penggalian.

```typescript
        const proof = zokrates.generateProof(
            digCompiled.program,
            runResults.witness,
            proverKey)

        return proof
    }
```

Gunakan [`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) dan kembalikan buktinya.

```typescript
const solidityVerifier = `
        // Map size: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

Sebuah pemverifikasi Solidity, kontrak pintar yang dapat kita sebarkan ke rantai blok dan gunakan untuk memverifikasi bukti yang dihasilkan oleh `digCompiled.program`.

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

Terakhir, kembalikan semua yang mungkin dibutuhkan oleh kode lain.

## Pengujian keamanan {#security-tests}

Pengujian keamanan penting karena bug fungsionalitas pada akhirnya akan terungkap dengan sendirinya. Namun, jika aplikasi tidak aman, hal itu kemungkinan akan tetap tersembunyi untuk waktu yang lama sebelum diungkapkan oleh seseorang yang berbuat curang dan lolos dengan sumber daya milik orang lain.

### Izin {#permissions}

Ada satu entitas istimewa dalam permainan ini, yaitu server. Ini adalah satu-satunya pengguna yang diizinkan untuk memanggil fungsi di [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol). Kita dapat menggunakan [`cast`](https://book.getfoundry.sh/cast/) untuk memverifikasi panggilan ke fungsi berizin hanya diizinkan sebagai akun server.

[Kunci privat server ada di `setupNetwork.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52).

1. Di komputer yang menjalankan `anvil` (rantai blok), atur variabel lingkungan ini.

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. Gunakan `cast` untuk mencoba mengatur alamat pemverifikasi sebagai alamat yang tidak sah.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   Tidak hanya `cast` melaporkan kegagalan, tetapi Anda juga dapat membuka **MUD Dev Tools** di dalam permainan pada peramban, klik **Tables**, dan pilih **app\_\_VerifierAddress**. Lihat bahwa alamat tersebut bukan nol.

3. Atur alamat pemverifikasi sebagai alamat server.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   Alamat di **app\_\_VerifiedAddress** sekarang seharusnya menjadi nol.

Semua fungsi MUD dalam `System` yang sama melewati kontrol akses yang sama, jadi saya menganggap pengujian ini sudah cukup. Jika Anda merasa belum cukup, Anda dapat memeriksa fungsi lainnya di [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol).

### Penyalahgunaan zero-knowledge {#zero-knowledge-abuses}

Matematika untuk memverifikasi Zokrates berada di luar cakupan tutorial ini (dan kemampuan saya). Namun, kita dapat menjalankan berbagai pemeriksaan pada kode zero-knowledge untuk memverifikasi bahwa jika tidak dilakukan dengan benar, kode tersebut akan gagal. Semua pengujian ini akan mengharuskan kita untuk mengubah [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) dan memulai ulang seluruh aplikasi. Memulai ulang proses server saja tidak cukup, karena hal itu menempatkan aplikasi dalam state yang tidak mungkin (pemain memiliki permainan yang sedang berlangsung, tetapi permainan tersebut tidak lagi tersedia untuk server).

#### Jawaban salah {#wrong-answer}

Kemungkinan paling sederhana adalah memberikan jawaban yang salah dalam Bukti tanpa pengetahuan (ZKP). Untuk melakukannya, kita masuk ke dalam `zkDig` dan [memodifikasi baris 91](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

Ini berarti kita akan selalu mengklaim ada satu bom, terlepas dari jawaban yang benar. Cobalah bermain dengan versi ini, dan Anda akan melihat di tab **server** pada layar `pnpm dev` kesalahan ini:

```
cause: {
        code: 3,
        message: 'execution reverted: revert: Zero knowledge verification fail',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

Jadi, jenis kecurangan ini gagal.

#### Bukti salah {#wrong-proof}

Apa yang terjadi jika kita memberikan informasi yang benar, tetapi memiliki data bukti yang salah? Sekarang, ganti baris 91 dengan:

```ts
proof.proof = {
  a: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  b: [
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  ],
  c: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
}
```

Ini tetap gagal, tetapi sekarang gagal tanpa alasan karena terjadi selama panggilan pemverifikasi.

### Bagaimana pengguna dapat memverifikasi kode zero trust? {#user-verify-zero-trust}

Kontrak pintar relatif mudah untuk diverifikasi. Biasanya, pengembang memublikasikan kode sumber ke penjelajah blok, dan penjelajah blok memverifikasi bahwa kode sumber tersebut memang dikompilasi menjadi kode dalam [transaksi penyebaran kontrak](/developers/docs/smart-contracts/deploying/). Dalam kasus `System` MUD, ini [sedikit lebih rumit](https://mud.dev/cli/verify), tetapi tidak terlalu banyak.

Ini lebih sulit dengan zero-knowledge. Pemverifikasi menyertakan beberapa konstanta dan menjalankan beberapa perhitungan padanya. Ini tidak memberi tahu Anda apa yang sedang dibuktikan.

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

Solusinya, setidaknya sampai penjelajah blok sempat menambahkan verifikasi Zokrates ke antarmuka pengguna mereka, adalah agar pengembang aplikasi menyediakan program Zokrates, dan agar setidaknya beberapa pengguna mengompilasinya sendiri dengan kunci verifikasi yang sesuai.

Untuk melakukannya:

1. [Instal Zokrates](https://zokrates.github.io/gettingstarted.html).
2. Buat sebuah berkas, `dig.zok`, dengan program Zokrates. Kode di bawah ini mengasumsikan Anda mempertahankan ukuran peta asli, 10x5.

   ```zokrates
    import "utils/pack/bool/pack128.zok" as pack128;
    import "hashes/poseidon/poseidon.zok" as poseidon;

    def hashMap(bool[12][7] map) -> field {
        bool[512] mut map1d = [false; 512];
        u32 mut counter = 0;

        for u32 x in 0..12 {
            for u32 y in 0..7 {
                map1d[counter] = map[x][y];
                counter = counter+1;
            }
        }

        field[4] hashMe = [
            pack128(map1d[0..128]),
            pack128(map1d[128..256]),
            pack128(map1d[256..384]),
            pack128(map1d[384..512])
        ];

        return poseidon(hashMe);
    }


    // Jumlah ranjau di lokasi (x,y)
    def map2mineCount(bool[12][7] map, u32 x, u32 y) -> u8 {
        return if map[x+1][y+1] { 1 } else { 0 };
    }

    def main(private bool[12][7] map, u32 x, u32 y) -> (field, u8) {
        return (hashMap(map) ,
            if map2mineCount(map, x, y) > 0 { 0xFF } else {
                map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
                map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
                map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
            }
        );
    }
   ```

3. Kompilasi kode Zokrates dan buat kunci verifikasi. Kunci verifikasi harus dibuat dengan Entropi yang sama yang digunakan di server asli, [dalam hal ini string kosong](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67).

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. Buat pemverifikasi Solidity Anda sendiri, dan verifikasi bahwa secara fungsional identik dengan yang ada di rantai blok (server menambahkan komentar, tetapi itu tidak penting).

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## Keputusan desain {#design}

Dalam aplikasi apa pun yang cukup kompleks, terdapat tujuan desain yang saling bersaing yang memerlukan kompromi. Mari kita lihat beberapa kompromi tersebut dan mengapa solusi saat ini lebih disukai daripada opsi lain.

### Mengapa zero-knowledge {#why-zero-knowledge}

Untuk minesweeper, Anda sebenarnya tidak memerlukan zero-knowledge. Server selalu dapat menyimpan peta, dan kemudian mengungkapkannya semua saat permainan selesai. Kemudian, di akhir permainan, kontrak pintar dapat menghitung hash peta, memverifikasi bahwa itu cocok, dan jika tidak, menghukum server atau mengabaikan permainan sepenuhnya.

Saya tidak menggunakan solusi yang lebih sederhana ini karena hanya berfungsi untuk permainan singkat dengan state akhir yang terdefinisi dengan baik. Ketika sebuah permainan berpotensi tak terbatas (seperti halnya dengan [dunia otonom](https://0xparc.org/blog/autonomous-worlds)), Anda memerlukan solusi yang membuktikan state _tanpa_ mengungkapkannya.

Sebagai tutorial, artikel ini membutuhkan permainan singkat yang mudah dipahami, tetapi teknik ini paling berguna untuk permainan yang lebih panjang.

### Mengapa Zokrates? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) bukanlah satu-satunya pustaka zero-knowledge yang tersedia, tetapi ini mirip dengan bahasa pemrograman [imperatif](https://en.wikipedia.org/wiki/Imperative_programming) normal dan mendukung variabel boolean.

Untuk aplikasi Anda, dengan persyaratan yang berbeda, Anda mungkin lebih suka menggunakan [Circum](https://docs.circom.io/getting-started/installation/) atau [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/).

### Kapan harus mengompilasi Zokrates {#when-compile-zokrates}

Dalam program ini, kami mengompilasi program Zokrates [setiap kali server dimulai](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61). Ini jelas membuang-buang sumber daya, tetapi ini adalah tutorial, yang dioptimalkan untuk kesederhanaan.

Jika saya menulis aplikasi tingkat produksi, saya akan memeriksa apakah saya memiliki file dengan program Zokrates yang dikompilasi pada ukuran ladang ranjau ini, dan jika ya, menggunakannya. Hal yang sama berlaku untuk menyebarkan kontrak pemverifikasi secara onchain.

### Membuat kunci pemverifikasi dan pembukti {#key-creation}

[Pembuatan kunci](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) adalah perhitungan murni lainnya yang tidak perlu dilakukan lebih dari sekali untuk ukuran ladang ranjau tertentu. Sekali lagi, ini dilakukan hanya sekali demi kesederhanaan.

Selain itu, kita dapat menggunakan [upacara pengaturan](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony). Keuntungan dari upacara pengaturan adalah Anda memerlukan entropi atau beberapa hasil perantara dari setiap peserta untuk mencurangi bukti tanpa pengetahuan. Jika setidaknya satu peserta upacara jujur dan menghapus informasi tersebut, bukti tanpa pengetahuan aman dari serangan tertentu. Namun, _tidak ada mekanisme_ untuk memverifikasi bahwa informasi telah dihapus dari mana-mana. Jika bukti tanpa pengetahuan sangat penting, Anda pasti ingin berpartisipasi dalam upacara pengaturan.

Di sini kita mengandalkan [perpetual powers of tau](https://github.com/privacy-scaling-explorations/perpetualpowersoftau), yang memiliki puluhan peserta. Ini mungkin cukup aman, dan jauh lebih sederhana. Kami juga tidak menambahkan entropi selama pembuatan kunci, yang memudahkan pengguna untuk [memverifikasi konfigurasi zero-knowledge](#user-verify-zero-trust).

### Di mana harus memverifikasi {#where-verification}

Kita dapat memverifikasi bukti tanpa pengetahuan baik secara onchain (yang membutuhkan gas) atau di klien (menggunakan [`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof)). Saya memilih yang pertama, karena ini memungkinkan Anda [memverifikasi pemverifikasi](#user-verify-zero-trust) sekali dan kemudian percaya bahwa itu tidak berubah selama alamat kontrak untuknya tetap sama. Jika verifikasi dilakukan pada klien, Anda harus memverifikasi kode yang Anda terima setiap kali Anda mengunduh klien.

Selain itu, meskipun permainan ini adalah pemain tunggal, banyak permainan rantai blok adalah multipemain. Verifikasi onchain berarti Anda hanya memverifikasi bukti tanpa pengetahuan sekali. Melakukannya di klien akan mengharuskan setiap klien untuk memverifikasi secara independen.

### Meratakan peta di TypeScript atau Zokrates? {#where-flatten}

Secara umum, ketika pemrosesan dapat dilakukan baik di TypeScript atau Zokrates, lebih baik melakukannya di TypeScript, yang jauh lebih cepat, dan tidak memerlukan bukti tanpa pengetahuan. Inilah alasannya, misalnya, kami tidak memberikan hash kepada Zokrates dan membuatnya memverifikasi bahwa itu benar. Proses hash harus dilakukan di dalam Zokrates, tetapi kecocokan antara hash yang dikembalikan dan hash onchain dapat terjadi di luarnya.

Namun, kami masih [meratakan peta di Zokrates](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20), padahal kami bisa melakukannya di TypeScript. Alasannya adalah opsi lain, menurut pendapat saya, lebih buruk.

- Memberikan array boolean satu dimensi ke kode Zokrates, dan menggunakan ekspresi seperti `x*(height+2)
+y` untuk mendapatkan peta dua dimensi. Ini akan membuat [kode](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) menjadi agak lebih rumit, jadi saya memutuskan peningkatan kinerjanya tidak sepadan untuk sebuah tutorial.

- Mengirimkan array satu dimensi dan array dua dimensi ke Zokrates. Namun, solusi ini tidak memberikan keuntungan apa pun bagi kita. Kode Zokrates harus memverifikasi bahwa array satu dimensi yang diberikannya benar-benar merupakan representasi yang tepat dari array dua dimensi. Jadi tidak akan ada peningkatan kinerja.

- Meratakan array dua dimensi di Zokrates. Ini adalah opsi paling sederhana, jadi saya memilihnya.

### Di mana menyimpan peta {#where-store-maps}

Dalam aplikasi ini [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) hanyalah sebuah variabel di memori. Ini berarti bahwa jika server Anda mati dan perlu dihidupkan ulang, semua informasi yang disimpannya akan hilang. Pemain tidak hanya tidak dapat melanjutkan permainan mereka, mereka bahkan tidak dapat memulai permainan baru karena komponen onchain menganggap mereka masih memiliki permainan yang sedang berlangsung.

Ini jelas merupakan desain yang buruk untuk sistem produksi, di mana Anda akan menyimpan informasi ini dalam basis data. Satu-satunya alasan saya menggunakan variabel di sini adalah karena ini adalah tutorial dan kesederhanaan adalah pertimbangan utama.

## Kesimpulan: Dalam kondisi apa teknik ini tepat digunakan? {#conclusion}

Jadi, sekarang Anda tahu cara menulis permainan dengan server yang menyimpan state rahasia yang tidak seharusnya berada onchain. Namun, dalam kasus apa Anda harus melakukannya? Ada dua pertimbangan utama.

- _Permainan berdurasi panjang_: [Seperti yang disebutkan di atas](#why-zero-knowledge), dalam permainan singkat Anda dapat memublikasikan state setelah permainan selesai dan memverifikasi semuanya pada saat itu. Namun, itu bukanlah pilihan ketika permainan memakan waktu lama atau tidak terbatas, dan state harus tetap rahasia.

- _Beberapa sentralisasi dapat diterima_: Bukti tanpa pengetahuan dapat memverifikasi integritas, bahwa suatu entitas tidak memalsukan hasil. Apa yang tidak dapat mereka lakukan adalah memastikan bahwa entitas tersebut akan tetap tersedia dan menjawab pesan. Dalam situasi di mana ketersediaan juga perlu terdesentralisasi, bukti tanpa pengetahuan bukanlah solusi yang memadai, dan Anda memerlukan [komputasi multi-pihak](https://en.wikipedia.org/wiki/Secure_multi-party_computation).

[Lihat di sini untuk karya saya yang lain](https://cryptodocguy.pro/).

### Ucapan Terima Kasih {#acknowledgements}

- Alvaro Alonso membaca draf artikel ini dan meluruskan beberapa kesalahpahaman saya tentang Zokrates.

Segala kesalahan yang tersisa adalah tanggung jawab saya.