---
title: Menggunakan zero-knowledge untuk keadaan rahasia
description: Permainan onchain terbatas karena tidak dapat menyimpan informasi tersembunyi apa pun. Setelah membaca tutorial ini, pembaca akan dapat menggabungkan bukti zero-knowledge dan komponen server untuk membuat permainan yang dapat diverifikasi dengan komponen keadaan rahasia, di luar rantai. Teknik untuk melakukan ini akan didemonstrasikan dengan membuat permainan minesweeper.
author: Ori Pomerantz
tags:
  [
    "server",
    "di luar rantai",
    "tersentralisasi",
    "zero-knowledge",
    "zokrates",
    "mud"
  ]
skill: advanced
lang: id
published: 2025-03-15
---

_Tidak ada rahasia di rantai blok_. Semua yang diposting di rantai blok terbuka untuk dibaca oleh semua orang. Hal ini diperlukan, karena rantai blok didasarkan pada siapa pun yang dapat memverifikasinya. Namun, permainan sering kali mengandalkan keadaan rahasia. Sebagai contoh, permainan [minesweeper](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) sama sekali tidak masuk akal jika Anda bisa membuka penjelajah rantai blok dan melihat petanya.

Solusi paling sederhana adalah dengan menggunakan [komponen server](/developers/tutorials/server-components/) untuk menampung keadaan rahasia. Namun, alasan kami menggunakan rantai blok adalah untuk mencegah kecurangan oleh pengembang game. Kita perlu memastikan kejujuran komponen server. Server dapat memberikan hash dari keadaan, dan menggunakan [bukti zero-knowledge](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) untuk membuktikan bahwa keadaan yang digunakan untuk menghitung hasil suatu gerakan adalah yang benar.

Setelah membaca artikel ini, Anda akan mengetahui cara membuat server penampung keadaan rahasia semacam ini, klien untuk menampilkan keadaan, dan komponen onchain untuk komunikasi di antara keduanya. Alat utama yang akan kita gunakan adalah:

| Peralatan                                     | Tujuan                                    |                 Diverifikasi pada versi |
| --------------------------------------------- | ----------------------------------------- | --------------------------------------: |
| [Zokrates](https://zokrates.github.io/)       | Bukti zero-knowledge dan verifikasinya    |   1.1.9 |
| [Typescript](https://www.typescriptlang.org/) | Bahasa pemrograman untuk server dan klien |   5.4.2 |
| [Simpul](https://nodejs.org/en)               | Menjalankan server                        | 20.18.2 |
| [Viem](https://viem.sh/)                      | Komunikasi dengan Rantai Blok             |  2.9.20 |
| [MUD](https://mud.dev/)                       | Manajemen data onchain                    |  2.0.12 |
| [React](https://react.dev/)                   | Antarmuka pengguna klien                  |  18.2.0 |
| [Vite](https://vitejs.dev/)                   | Menyajikan kode klien                     |   4.2.1 |

## Contoh Minesweeper {#minesweeper}

[Minesweeper](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) adalah permainan yang mencakup peta rahasia dengan ladang ranjau. Pemain memilih untuk menggali di lokasi tertentu. Jika lokasi itu memiliki ranjau, permainan berakhir. Jika tidak, pemain mendapatkan jumlah ranjau di delapan kotak yang mengelilingi lokasi tersebut.

Aplikasi ini ditulis menggunakan [MUD](https://mud.dev/), sebuah kerangka kerja yang memungkinkan kita menyimpan data onchain menggunakan [database nilai-kunci](https://aws.amazon.com/nosql/key-value/) dan menyinkronkan data tersebut secara otomatis dengan komponen offchain. Selain sinkronisasi, MUD memudahkan penyediaan kontrol akses, dan bagi pengguna lain untuk [memperluas](https://mud.dev/guides/extending-a-world) aplikasi kita tanpa izin.

### Menjalankan contoh minesweeper {#running-minesweeper-example}

Untuk menjalankan contoh minesweeper:

1. Pastikan Anda [telah menginstal prasyarat](https://mud.dev/quickstart#prerequisites): [Simpul](https://mud.dev/quickstart#prerequisites), [Foundry](https://book.getfoundry.sh/getting-started/installation), [`git`](https://git-scm.com/downloads), [`pnpm`](https://git-scm.com/downloads), dan [`mprocs`](https://github.com/pvolok/mprocs).

2. Kloning repositori.

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. Instal paket-paketnya.

   ```sh copy
   cd 20240901-secret-state/
   pnpm install
   npm install -g mprocs
   ```

   Jika Foundry diinstal sebagai bagian dari `pnpm install`, Anda perlu me-restart shell baris perintah.

4. Kompilasi kontraknya

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```

5. Mulai program (termasuk rantai blok [anvil](https://book.getfoundry.sh/anvil/)) dan tunggu.

   ```sh copy
   mprocs
   ```

   Perhatikan bahwa proses startup memakan waktu lama. Untuk melihat kemajuannya, pertama-tama gunakan panah bawah untuk menggulir ke tab _contracts_ untuk melihat kontrak MUD yang sedang diterapkan. Ketika Anda mendapatkan pesan _Waiting for file changes…_, kontrak telah diterapkan dan kemajuan selanjutnya akan terjadi di tab _server_. Di sana, Anda menunggu hingga mendapatkan pesan _Verifier address: 0x...._.

   Jika langkah ini berhasil, Anda akan melihat layar `mprocs`, dengan proses yang berbeda di sebelah kiri dan output konsol untuk proses yang sedang dipilih di sebelah kanan.

   ![Layar mprocs](./mprocs.png)

   Jika ada masalah dengan `mprocs`, Anda dapat menjalankan empat proses secara manual, masing-masing di jendela baris perintahnya sendiri:

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

6. Sekarang Anda dapat menelusuri ke [klien](http://localhost:3000), klik **Permainan Baru**, dan mulai bermain.

### Tabel {#tables}

Kita memerlukan [beberapa tabel](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) onchain.

- `Configuration`: Tabel ini adalah singleton, tidak memiliki kunci dan satu catatan. Ini digunakan untuk menyimpan informasi konfigurasi permainan:
  - `height`: Tinggi ladang ranjau
  - `width`: Lebar ladang ranjau
  - `numberOfBombs`: Jumlah bom di setiap ladang ranjau

- `VerifierAddress`: Tabel ini juga merupakan singleton. Ini digunakan untuk menyimpan satu bagian dari konfigurasi, alamat kontrak verifier (`verifier`). Kita bisa saja meletakkan informasi ini di tabel `Konfigurasi`, tetapi ini diatur oleh komponen yang berbeda, yaitu server, jadi lebih mudah untuk meletakkannya di tabel terpisah.

- `PlayerGame`: Kuncinya adalah alamat pemain. Datanya adalah:

  - `gameId`: Nilai 32-byte yang merupakan hash dari peta tempat pemain bermain (pengenal permainan).
  - `win`: sebuah boolean yang menunjukkan apakah pemain memenangkan permainan.
  - `lose`: sebuah boolean yang menunjukkan apakah pemain kalah dalam permainan.
  - `digNumber`: jumlah galian yang berhasil dalam permainan.

- `GamePlayer`: Tabel ini menyimpan pemetaan terbalik, dari `gameId` ke alamat pemain.

- `Map`: Kuncinya adalah tuple dari tiga nilai:

  - `gameId`: Nilai 32-byte yang merupakan hash dari peta tempat pemain bermain (pengenal permainan).
  - koordinat `x`
  - koordinat `y`

  Nilainya adalah satu angka. Nilainya 255 jika bom terdeteksi. Jika tidak, itu adalah jumlah bom di sekitar lokasi itu ditambah satu. Kita tidak bisa hanya menggunakan jumlah bom, karena secara default semua penyimpanan di EVM dan semua nilai baris di MUD adalah nol. Kita perlu membedakan antara "pemain belum menggali di sini" dan "pemain menggali di sini, dan menemukan tidak ada bom di sekitarnya".

Selain itu, komunikasi antara klien dan server terjadi melalui komponen onchain. Ini juga diimplementasikan menggunakan tabel.

- `PendingGame`: Permintaan yang belum dilayani untuk memulai permainan baru.
- `PendingDig`: Permintaan yang belum dilayani untuk menggali di tempat tertentu dalam permainan tertentu. Ini adalah [tabel offchain](https://mud.dev/store/tables#types-of-tables), artinya tidak ditulis ke penyimpanan EVM, hanya dapat dibaca secara offchain menggunakan events.

### Alur eksekusi dan data {#execution-data-flows}

Alur-alur ini mengoordinasikan eksekusi antara klien, komponen onchain, dan server.

#### Inisialisasi {#initialization-flow}

Saat Anda menjalankan `mprocs`, langkah-langkah ini terjadi:

1. [`mprocs`](https://github.com/pvolok/mprocs) menjalankan empat komponen:

   - [Anvil](https://book.getfoundry.sh/anvil/), yang menjalankan rantai blok lokal
   - [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts), yang mengompilasi (jika perlu) dan menerapkan kontrak untuk MUD
   - [Klien](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client), yang menjalankan [Vite](https://vitejs.dev/) untuk menyajikan UI dan kode klien ke browser web.
   - [Server](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server), yang melakukan tindakan server

2. Paket `contracts` menerapkan kontrak MUD dan kemudian menjalankan [skrip `PostDeploy.s.sol`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol). Skrip ini mengatur konfigurasi. Kode dari github menentukan [ladang ranjau 10x5 dengan delapan ranjau di dalamnya](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23).

3. [Server](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) dimulai dengan [menyiapkan MUD](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6). Di antara hal-hal lain, ini mengaktifkan sinkronisasi data, sehingga salinan tabel yang relevan ada di memori server.

4. Server berlangganan fungsi untuk dieksekusi [ketika tabel `Configuration` berubah](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23). [Fungsi ini](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) dipanggil setelah `PostDeploy.s.sol` dieksekusi dan memodifikasi tabel.

5. Ketika fungsi inisialisasi server memiliki konfigurasi, [ia memanggil `zkFunctions`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35) untuk menginisialisasi [bagian zero-knowledge dari server](#using-zokrates-from-typescript). Ini tidak dapat terjadi sampai kita mendapatkan konfigurasi karena fungsi zero-knowledge harus memiliki lebar dan tinggi ladang ranjau sebagai konstanta.

6. Setelah bagian zero-knowledge dari server diinisialisasi, langkah selanjutnya adalah [menerapkan kontrak verifikasi zero-knowledge ke rantai blok](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) dan mengatur alamat verifiee di MUD.

7. Akhirnya, kami berlangganan pembaruan sehingga kami akan melihat ketika seorang pemain meminta untuk [memulai permainan baru](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) atau untuk [menggali dalam permainan yang ada](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108).

#### Permainan baru {#new-game-flow}

Inilah yang terjadi ketika pemain meminta permainan baru.

1. Jika tidak ada permainan yang sedang berlangsung untuk pemain ini, atau ada tetapi dengan gameId nol, klien menampilkan [tombol permainan baru](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175). Ketika pengguna menekan tombol ini, [React menjalankan fungsi `newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96).

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) adalah panggilan `Sistem`. Di MUD semua panggilan dialihkan melalui kontrak `World`, dan dalam kebanyakan kasus Anda memanggil `<namespace>__<function name>`. Dalam kasus ini, panggilannya adalah ke `app__newGame`, yang kemudian MUD arahkan ke [`newGame` di `GameSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22).

3. Fungsi onchain memeriksa bahwa pemain tidak memiliki permainan yang sedang berlangsung, dan jika tidak ada [menambahkan permintaan ke tabel `PendingGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21).

4. Server mendeteksi perubahan di `PendingGame` dan [menjalankan fungsi yang dilanggan](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71). Fungsi ini memanggil [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114), yang pada gilirannya memanggil [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144).

5. Hal pertama yang dilakukan `createGame` adalah [membuat peta acak dengan jumlah ranjau yang sesuai](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135). Kemudian, ia memanggil [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) untuk membuat peta dengan batas kosong, yang diperlukan untuk Zokrates. Akhirnya, `createGame` memanggil [`calculateMapHash`](#calculateMapHash), untuk mendapatkan hash peta, yang digunakan sebagai ID permainan.

6. Fungsi `newGame` menambahkan game baru ke `gamesInProgress`.

7. Hal terakhir yang dilakukan server adalah memanggil [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43), yang merupakan onchain. Fungsi ini berada dalam `Sistem` yang berbeda, [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol), untuk mengaktifkan kontrol akses. Kontrol akses didefinisikan dalam [file konfigurasi MUD](https://mud.dev/config), [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72).

   Daftar akses hanya mengizinkan satu alamat untuk memanggil `Sistem`. Ini membatasi akses ke fungsi server ke satu alamat, sehingga tidak ada yang bisa meniru server.

8. Komponen onchain memperbarui tabel yang relevan:

   - Buat game di `PlayerGame`.
   - Atur pemetaan terbalik di `GamePlayer`.
   - Hapus permintaan dari `PendingGame`.

9. Server mengidentifikasi perubahan di `PendingGame`, tetapi tidak melakukan apa-apa karena [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) salah.

10. Pada klien [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) diatur ke entri `PlayerGame` untuk alamat pemain. Ketika `PlayerGame` berubah, `gameRecord` juga berubah.

11. Jika ada nilai di `gameRecord`, dan permainan belum dimenangkan atau kalah, klien [menampilkan peta](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190).

#### Gali {#dig-flow}

1. Pemain [mengklik tombol sel peta](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), yang memanggil [fungsi `dig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36). Fungsi ini memanggil [`dig` onchain](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32).

2. Komponen onchain [melakukan sejumlah pemeriksaan kewarasan](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30), dan jika berhasil menambahkan permintaan penggalian ke [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31).

3. Server [mendeteksi perubahan di `PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73). [Jika valid](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), ia [memanggil kode zero-knowledge](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (dijelaskan di bawah) untuk menghasilkan hasil dan bukti bahwa itu valid.

4. [Server](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) memanggil [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) onchain.

5. `digResponse` melakukan dua hal. Pertama, ia memeriksa [bukti zero knowledge](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61). Kemudian, jika bukti diperiksa, ia memanggil [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) untuk benar-benar memproses hasilnya.

6. `processDigResult` memeriksa apakah permainan telah [kalah](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) atau [menang](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86), dan [memperbarui `Map`, peta onchain](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80).

7. Klien mengambil pembaruan secara otomatis dan [memperbarui peta yang ditampilkan kepada pemain](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190), dan jika berlaku memberi tahu pemain apakah itu menang atau kalah.

## Menggunakan Zokrates {#using-zokrates}

Dalam alur yang dijelaskan di atas, kami melewatkan bagian zero-knowledge, memperlakukannya sebagai kotak hitam. Sekarang mari kita buka dan lihat bagaimana kode itu ditulis.

### Hashing peta {#hashing-map}

Kita dapat menggunakan [kode JavaScript ini](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) untuk mengimplementasikan [Poseidon](https://www.poseidon-hash.info), fungsi hash Zokrates yang kita gunakan. Namun, meskipun ini akan lebih cepat, itu juga akan lebih rumit daripada hanya menggunakan fungsi hash Zokrates untuk melakukannya. Ini adalah tutorial, jadi kodenya dioptimalkan untuk kesederhanaan, bukan untuk kinerja. Oleh karena itu, kita memerlukan dua program Zokrates yang berbeda, satu untuk hanya menghitung hash peta (`hash`) dan satu untuk benar-benar membuat bukti zero-knowledge dari hasil penggalian di lokasi di peta (`dig`).

### Fungsi hash {#hash-function}

Ini adalah fungsi yang menghitung hash peta. Kita akan membahas kode ini baris demi baris.

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

Kedua baris ini mengimpor dua fungsi dari [pustaka standar Zokrates](https://zokrates.github.io/toolbox/stdlib.html). [Fungsi pertama](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) adalah [hash Poseidon](https://www.poseidon-hash.info/). Dibutuhkan array elemen [`field`](https://zokrates.github.io/language/types.html#field) dan mengembalikan `field`.

Elemen field di Zokrates biasanya kurang dari 256 bit, tetapi tidak banyak. Untuk menyederhanakan kode, kami membatasi peta menjadi hingga 512 bit, dan melakukan hash pada array empat field, dan di setiap field kami hanya menggunakan 128 bit. Fungsi [`pack128`](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) mengubah array 128 bit menjadi `field` untuk tujuan ini.

```
        def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

Baris ini memulai definisi fungsi. `hashMap` mendapatkan satu parameter yang disebut `map`, sebuah array dua dimensi `bool`(ean). Ukuran peta adalah `width+2` kali `height+2` karena alasan yang [dijelaskan di bawah](#why-map-border).

Kita dapat menggunakan `${width+2}` dan `${height+2}` karena program Zokrates disimpan dalam aplikasi ini sebagai [string template](https://www.w3schools.com/js/js_string_templates.asp). Kode antara `${` dan `}` dievaluasi oleh JavaScript, dan dengan cara ini program dapat digunakan untuk ukuran peta yang berbeda. Parameter peta memiliki batas lebar satu lokasi di sekelilingnya tanpa bom apa pun, yang merupakan alasan kami perlu menambahkan dua ke lebar dan tinggi.

Nilai kembaliannya adalah `field` yang berisi hash.

```
   bool[512] mut map1d = [false; 512];
```

Petanya dua dimensi. Namun, fungsi `pack128` tidak bekerja dengan array dua dimensi. Jadi pertama-tama kita meratakan peta menjadi array 512-byte, menggunakan `map1d`. Secara default variabel Zokrates adalah konstanta, tetapi kita perlu menetapkan nilai ke array ini dalam satu lingkaran, jadi kita mendefinisikannya sebagai [`mut`](https://zokrates.github.io/language/variables.html#mutability).

Kita perlu menginisialisasi array karena Zokrates tidak memiliki `undefined`. Ekspresi `[false; 512]` berarti [sebuah array dari 512 nilai `false`](https://zokrates.github.io/language/types.html#declaration-and-initialization).

```
   u32 mut counter = 0;
```

Kita juga memerlukan penghitung untuk membedakan antara bit yang sudah kita isi di `map1d` dan yang belum.

```
   for u32 x in 0..${width+2} {
```

Ini adalah cara Anda mendeklarasikan perulangan [`for`](https://zokrates.github.io/language/control_flow.html#for-loops) di Zokrates. Perulangan `for` Zokrates harus memiliki batas tetap, karena meskipun terlihat seperti perulangan, compiler sebenarnya "membukanya". Ekspresi `${width+2}` adalah konstanta waktu kompilasi karena `width` diatur oleh kode TypeScript sebelum memanggil kompiler.

```
      for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

Untuk setiap lokasi di peta, letakkan nilai itu di array `map1d` dan tingkatkan penghitung.

```
    field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

`pack128` untuk membuat array dari empat nilai `field` dari `map1d`. Di Zokrates `array[a..b]` berarti irisan array yang dimulai dari `a` dan berakhir di `b-1`.

```
    return poseidon(hashMe);
}
```

Gunakan `poseidon` untuk mengubah array ini menjadi hash.

### Program hash {#hash-program}

Server perlu memanggil `hashMap` secara langsung untuk membuat pengenal permainan. Namun, Zokrates hanya dapat memanggil fungsi `main` pada sebuah program untuk memulai, jadi kami membuat sebuah program dengan `main` yang memanggil fungsi hash.

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### Program penggalian {#dig-program}

Ini adalah inti dari bagian zero-knowledge dari aplikasi, di mana kami menghasilkan bukti yang digunakan untuk memverifikasi hasil penggalian.

```
${hashFragment}

// The number of mines in location (x,y)
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### Mengapa batas peta {#why-map-border}

Bukti zero-knowledge menggunakan [sirkuit aritmatika](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785), yang tidak memiliki padanan yang mudah dengan pernyataan `if`. Sebaliknya, mereka menggunakan ekuivalen dari [operator bersyarat](https://en.wikipedia.org/wiki/Ternary_conditional_operator). Jika `a` bisa nol atau satu, Anda bisa menghitung `if a { b } else { c }` sebagai `ab+(1-a)c`.

Karena ini, pernyataan `if` Zokrates selalu mengevaluasi kedua cabang. Misalnya, jika Anda memiliki kode ini:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

Ini akan error, karena perlu menghitung `arr[10]`, meskipun nilai tersebut nantinya akan dikalikan dengan nol.

Inilah alasan mengapa kita memerlukan batas selebar satu lokasi di sekeliling peta. Kita perlu menghitung jumlah total ranjau di sekitar suatu lokasi, dan itu berarti kita perlu melihat lokasi satu baris di atas dan di bawah, di kiri dan di kanan, dari lokasi tempat kita menggali. Yang berarti lokasi-lokasi itu harus ada di array peta yang disediakan Zokrates.

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

Secara default, bukti Zokrates menyertakan inputnya. Tidak ada gunanya mengetahui ada lima ranjau di sekitar suatu tempat kecuali Anda benar-benar tahu tempat mana itu (dan Anda tidak bisa hanya mencocokkannya dengan permintaan Anda, karena kemudian pembukti dapat menggunakan nilai yang berbeda dan tidak memberitahu Anda tentang hal itu). Namun, kita perlu menjaga kerahasiaan peta, sambil memberikannya kepada Zokrates. Solusinya adalah menggunakan parameter `pribadi`, yang _tidak_ diungkapkan oleh bukti.

Ini membuka jalan lain untuk penyalahgunaan. Pembukti dapat menggunakan koordinat yang benar, tetapi membuat peta dengan sejumlah ranjau di sekitar lokasi, dan mungkin di lokasi itu sendiri. Untuk mencegah penyalahgunaan ini, kami membuat bukti zero knowledge menyertakan hash peta, yang merupakan pengenal permainan.

```
   return (hashMap(map),
```

Nilai kembalian di sini adalah tuple yang mencakup array hash peta serta hasil penggalian.

```
         if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

Kami menggunakan 255 sebagai nilai khusus jika lokasi itu sendiri memiliki bom.

```
            map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

Jika pemain belum menabrak ranjau, tambahkan jumlah ranjau untuk area di sekitar lokasi dan kembalikan itu.

### Menggunakan Zokrates dari TypeScript {#using-zokrates-from-typescript}

Zokrates memiliki antarmuka baris perintah, tetapi dalam program ini kami menggunakannya dalam [kode TypeScript](https://zokrates.github.io/toolbox/zokrates_js.html).

Pustaka yang berisi definisi Zokrates disebut [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts).

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

Impor [binding JavaScript Zokrates](https://zokrates.github.io/toolbox/zokrates_js.html). Kami hanya memerlukan fungsi [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) karena ia mengembalikan janji yang diselesaikan ke semua definisi Zokrates.

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Mirip dengan Zokrates itu sendiri, kami juga hanya mengekspor satu fungsi, yang juga [asinkron](https://www.w3schools.com/js/js_async.asp). Ketika akhirnya kembali, ia menyediakan beberapa fungsi seperti yang akan kita lihat di bawah.

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

Di sini kami mengkompilasi program-program tersebut.

```typescript
// Create the keys for zero knowledge verification.
// On a production system you'd want to use a setup ceremony.
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

Pada sistem produksi, kita mungkin menggunakan [upacara penyiapan](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) yang lebih rumit, tetapi ini cukup baik untuk demonstrasi. Bukan masalah bahwa pengguna dapat mengetahui kunci pembukti - mereka tetap tidak dapat menggunakannya untuk membuktikan sesuatu kecuali itu benar. Karena kami menentukan entropi (parameter kedua, `""`), hasilnya akan selalu sama.

**Catatan:** Kompilasi program Zokrates dan pembuatan kunci adalah proses yang lambat. Tidak perlu mengulanginya setiap saat, hanya ketika ukuran peta berubah. Pada sistem produksi, Anda akan melakukannya sekali, lalu menyimpan hasilnya. Satu-satunya alasan saya tidak melakukannya di sini adalah demi kesederhanaan.

#### `calculateMapHash` {#calculateMapHash}

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

Fungsi [`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) sebenarnya menjalankan program Zokrates. Ini mengembalikan struktur dengan dua field: `output`, yang merupakan output dari program sebagai string JSON, dan `witness`, yang merupakan informasi yang dibutuhkan untuk membuat bukti zero knowledge dari hasilnya. Di sini kita hanya membutuhkan outputnya.

Outputnya adalah string dalam bentuk `"31337"`, sebuah angka desimal yang diapit tanda kutip. Tetapi output yang kami butuhkan untuk `viem` adalah angka heksadesimal dalam bentuk `0x60A7`. Jadi kita menggunakan `.slice(1,-1)` untuk menghapus tanda kutip dan kemudian `BigInt` untuk menjalankan string yang tersisa, yang merupakan angka desimal, ke [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt). `.toString(16)` mengubah `BigInt` ini menjadi string heksadesimal, dan `"0x"+` menambahkan penanda untuk angka heksadesimal.

```typescript
// Gali dan kembalikan bukti zero knowledge dari hasilnya
// (kode sisi server)
```

Bukti zero knowledge mencakup input publik (`x` dan `y`) dan hasil (hash peta dan jumlah bom).

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

Ini adalah masalah untuk memeriksa apakah sebuah indeks berada di luar batas di Zokrates, jadi kami melakukannya di sini.

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

Sebuah verifier Solidity, sebuah kontrak pintar yang dapat kita terapkan ke blockchain dan gunakan untuk memverifikasi bukti yang dihasilkan oleh `digCompiled.program`.

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

Akhirnya, kembalikan semua yang mungkin dibutuhkan oleh kode lain.

## Uji keamanan {#security-tests}

Uji keamanan penting karena bug fungsionalitas pada akhirnya akan terungkap. Tetapi jika aplikasi tidak aman, itu kemungkinan akan tetap tersembunyi untuk waktu yang lama sebelum terungkap oleh seseorang yang curang dan berhasil mendapatkan sumber daya milik orang lain.

### Izin {#permissions}

Ada satu entitas istimewa dalam permainan ini, yaitu server. Ini adalah satu-satunya pengguna yang diizinkan untuk memanggil fungsi-fungsi di [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol). Kita dapat menggunakan [`cast`](https://book.getfoundry.sh/cast/) untuk memverifikasi panggilan ke fungsi yang diizinkan hanya diizinkan sebagai akun server.

[Kunci pribadi server ada di `setupNetwork.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52).

1. Pada komputer yang menjalankan `anvil` (rantai blok), atur variabel lingkungan ini.

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. Gunakan `cast` untuk mencoba mengatur alamat verifier sebagai alamat yang tidak sah.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   Tidak hanya `cast` melaporkan kegagalan, tetapi Anda dapat membuka **Alat Pengembang MUD** dalam game di browser, klik **Tabel**, dan pilih **app\_\_VerifierAddress**. Lihat bahwa alamatnya bukan nol.

3. Atur alamat verifier sebagai alamat server.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   Alamat di **app\_\_VerifiedAddress** sekarang seharusnya nol.

Semua fungsi MUD dalam `Sistem` yang sama melewati kontrol akses yang sama, jadi saya menganggap tes ini cukup. Jika tidak, Anda dapat memeriksa fungsi lain di [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol).

### Penyalahgunaan zero-knowledge {#zero-knowledge-abuses}

Matematika untuk memverifikasi Zokrates berada di luar cakupan tutorial ini (dan kemampuan saya). Namun, kita dapat menjalankan berbagai pemeriksaan pada kode zero-knowledge untuk memverifikasi bahwa jika tidak dilakukan dengan benar, itu akan gagal. Semua tes ini akan mengharuskan kita untuk mengubah [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) dan memulai ulang seluruh aplikasi. Tidak cukup untuk memulai ulang proses server, karena itu menempatkan aplikasi dalam keadaan yang tidak mungkin (pemain memiliki permainan yang sedang berlangsung, tetapi permainan tidak lagi tersedia untuk server).

#### Jawaban salah {#wrong-answer}

Kemungkinan paling sederhana adalah memberikan jawaban yang salah dalam bukti zero-knowledge. Untuk melakukan itu, kita masuk ke dalam `zkDig` dan [memodifikasi baris 91](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

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

Jadi kecurangan semacam ini gagal.

#### Bukti yang salah {#wrong-proof}

Apa yang terjadi jika kami memberikan informasi yang benar, tetapi hanya memiliki data bukti yang salah? Sekarang, ganti baris 91 dengan:

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

Masih gagal, tapi sekarang gagal tanpa alasan karena terjadi saat panggilan verifier.

### Bagaimana pengguna dapat memverifikasi kode zero trust? {#user-verify-zero-trust}

Kontrak pintar relatif mudah untuk diverifikasi. Biasanya, pengembang menerbitkan kode sumber ke penjelajah blok, dan penjelajah blok memverifikasi bahwa kode sumber memang dikompilasi ke kode dalam [transaksi penerapan kontrak](/developers/docs/smart-contracts/deploying/). Dalam kasus `Sistem` MUD ini [sedikit lebih rumit](https://mud.dev/cli/verify), tetapi tidak banyak.

Ini lebih sulit dengan zero-knowledge. Verifier menyertakan beberapa konstanta dan menjalankan beberapa perhitungan pada mereka. Ini tidak memberitahu Anda apa yang sedang dibuktikan.

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

Solusinya, setidaknya sampai penjelajah blok menambahkan verifikasi Zokrates ke antarmuka pengguna mereka, adalah agar pengembang aplikasi menyediakan program Zokrates, dan setidaknya beberapa pengguna mengompilasinya sendiri dengan kunci verifikasi yang sesuai.

Untuk melakukannya:

1. [Instal Zokrates](https://zokrates.github.io/gettingstarted.html).

2. Buat file, `dig.zok`, dengan program Zokrates. Kode di bawah ini mengasumsikan Anda mempertahankan ukuran peta asli, 10x5.

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

3. Kompilasi kode Zokrates dan buat kunci verifikasi. Kunci verifikasi harus dibuat dengan entropi yang sama yang digunakan di server asli, [dalam hal ini string kosong](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67).

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. Buat verifier Solidity sendiri, dan verifikasi bahwa itu secara fungsional identik dengan yang ada di rantai blok (server menambahkan komentar, tetapi itu tidak penting).

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## Keputusan desain {#design}

Dalam aplikasi yang cukup kompleks, ada tujuan desain yang bersaing yang memerlukan pertukaran. Mari kita lihat beberapa pertukaran dan mengapa solusi saat ini lebih disukai daripada opsi lain.

### Mengapa zero-knowledge {#why-zero-knowledge}

Untuk minesweeper, Anda tidak benar-benar membutuhkan zero-knowledge. Server selalu dapat menyimpan peta, dan kemudian hanya mengungkapkannya semua saat permainan berakhir. Kemudian, di akhir permainan, kontrak pintar dapat menghitung hash peta, memverifikasi bahwa itu cocok, dan jika tidak menghukum server atau mengabaikan permainan sepenuhnya.

Saya tidak menggunakan solusi yang lebih sederhana ini karena hanya berfungsi untuk permainan singkat dengan keadaan akhir yang terdefinisi dengan baik. Ketika sebuah game berpotensi tak terbatas (seperti kasus [dunia otonom](https://0xparc.org/blog/autonomous-worlds)), Anda memerlukan solusi yang membuktikan keadaan _tanpa_ mengungkapkannya.

Sebagai tutorial, artikel ini membutuhkan permainan singkat yang mudah dipahami, tetapi teknik ini paling berguna untuk permainan yang lebih panjang.

### Mengapa Zokrates? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) bukan satu-satunya pustaka zero-knowledge yang tersedia, tetapi mirip dengan bahasa pemrograman normal, [imperatif](https://en.wikipedia.org/wiki/Imperative_programming) dan mendukung variabel boolean.

Untuk aplikasi Anda, dengan persyaratan yang berbeda, Anda mungkin lebih suka menggunakan [Circum](https://docs.circom.io/getting-started/installation/) atau [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/).

### Kapan harus mengkompilasi Zokrates {#when-compile-zokrates}

Dalam program ini kita mengkompilasi program Zokrates [setiap kali server dimulai](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61). Ini jelas merupakan pemborosan sumber daya, tetapi ini adalah tutorial, yang dioptimalkan untuk kesederhanaan.

Jika saya menulis aplikasi tingkat produksi, saya akan memeriksa apakah saya memiliki file dengan program Zokrates yang dikompilasi pada ukuran ladang ranjau ini, dan jika demikian menggunakannya. Hal yang sama berlaku untuk menerapkan kontrak verifier onchain.

### Membuat kunci verifier dan prover {#key-creation}

[Pembuatan kunci](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) adalah perhitungan murni lain yang tidak perlu dilakukan lebih dari sekali untuk ukuran ladang ranjau tertentu. Sekali lagi, itu dilakukan hanya sekali demi kesederhanaan.

Selain itu, kita dapat menggunakan [upacara penyiapan](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony). Keuntungan dari upacara penyiapan adalah Anda memerlukan entropi atau beberapa hasil antara dari setiap peserta untuk menipu bukti zero-knowledge. Jika setidaknya satu peserta upacara jujur dan menghapus informasi itu, bukti zero-knowledge aman dari serangan tertentu. Namun, _tidak ada mekanisme_ untuk memverifikasi bahwa informasi telah dihapus dari mana saja. Jika bukti zero-knowledge sangat penting, Anda ingin berpartisipasi dalam upacara penyiapan.

Di sini kami mengandalkan [perpetual powers of tau](https://github.com/privacy-scaling-explorations/perpetualpowersoftau), yang memiliki puluhan peserta. Ini mungkin cukup aman, dan jauh lebih sederhana. Kami juga tidak menambahkan entropi selama pembuatan kunci, yang memudahkan pengguna untuk [memverifikasi konfigurasi zero-knowledge](#user-verify-zero-trust).

### Di mana harus memverifikasi {#where-verification}

Kami dapat memverifikasi bukti zero-knowledge baik onchain (yang membutuhkan gas) atau di klien (menggunakan [`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof)). Saya memilih yang pertama, karena ini memungkinkan Anda [memverifikasi verifier](#user-verify-zero-trust) sekali dan kemudian percaya bahwa itu tidak berubah selama alamat kontrak untuk itu tetap sama. Jika verifikasi dilakukan pada klien, Anda harus memverifikasi kode yang Anda terima setiap kali Anda mengunduh klien.

Juga, sementara game ini adalah pemain tunggal, banyak game rantai blok adalah multi-pemain. verifikasi onchain berarti Anda hanya memverifikasi bukti zero-knowledge sekali. Melakukannya di klien akan mengharuskan setiap klien untuk memverifikasi secara independen.

### Meratakan peta di TypeScript atau Zokrates? {#where-flatten}

Secara umum, ketika pemrosesan dapat dilakukan baik di TypeScript atau Zokrates, lebih baik melakukannya di TypeScript, yang jauh lebih cepat, dan tidak memerlukan bukti zero-knowledge. Ini adalah alasannya, misalnya, bahwa kami tidak memberikan Zokrates hash dan membuatnya memverifikasi bahwa itu benar. Hashing harus dilakukan di dalam Zokrates, tetapi kecocokan antara hash yang dikembalikan dan hash onchain dapat terjadi di luarnya.

Namun, kami masih [meratakan peta di Zokrates](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20), padahal kami bisa melakukannya di TypeScript. Alasannya adalah bahwa opsi lain, menurut saya, lebih buruk.

- Berikan array boolean satu dimensi ke kode Zokrates, dan gunakan ekspresi seperti `x*(height+2)
  +y` untuk mendapatkan peta dua dimensi. Ini akan membuat [kode](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) agak lebih rumit, jadi saya memutuskan peningkatan kinerja tidak sepadan untuk sebuah tutorial.

- Kirim Zokrates baik array satu dimensi maupun array dua dimensi. Namun, solusi ini tidak memberi kami keuntungan apa pun. Kode Zokrates harus memverifikasi bahwa array satu dimensi yang disediakan benar-benar merupakan representasi yang benar dari array dua dimensi. Jadi tidak akan ada peningkatan kinerja.

- Ratakan array dua dimensi di Zokrates. Ini adalah pilihan yang paling sederhana, jadi saya memilihnya.

### Tempat menyimpan peta {#where-store-maps}

Dalam aplikasi ini [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) hanyalah sebuah variabel dalam memori. Ini berarti bahwa jika server Anda mati dan perlu di-restart, semua informasi yang disimpannya hilang. Tidak hanya pemain tidak dapat melanjutkan permainan mereka, mereka bahkan tidak dapat memulai permainan baru karena komponen onchain berpikir mereka masih memiliki permainan yang sedang berlangsung.

Ini jelas merupakan desain yang buruk untuk sistem produksi, di mana Anda akan menyimpan informasi ini dalam database. Satu-satunya alasan saya menggunakan variabel di sini adalah karena ini adalah tutorial dan kesederhanaan adalah pertimbangan utama.

## Kesimpulan: Dalam kondisi apa teknik ini sesuai? {#conclusion}

Jadi, sekarang Anda tahu cara menulis game dengan server yang menyimpan keadaan rahasia yang tidak berada di onchain. Tapi dalam kasus apa Anda harus melakukannya? Ada dua pertimbangan utama.

- _Permainan yang berjalan lama_: [Seperti yang disebutkan di atas](#why-zero-knowledge), dalam permainan singkat Anda bisa saja mempublikasikan keadaan setelah permainan selesai dan semuanya diverifikasi saat itu. Tetapi itu bukan pilihan ketika permainan memakan waktu lama atau tidak terbatas, dan keadaan perlu tetap rahasia.

- _Beberapa sentralisasi dapat diterima_: Bukti zero-knowledge dapat memverifikasi integritas, bahwa suatu entitas tidak memalsukan hasil. Apa yang tidak bisa mereka lakukan adalah memastikan bahwa entitas akan tetap tersedia dan menjawab pesan. Dalam situasi di mana ketersediaan juga perlu didesentralisasi, bukti zero-knowledge bukanlah solusi yang cukup, dan Anda memerlukan [komputasi multi-pihak](https://en.wikipedia.org/wiki/Secure_multi-party_computation).

[Lihat di sini untuk lebih banyak pekerjaan saya](https://cryptodocguy.pro/).

### Penghargaan {#acknowledgements}

- Alvaro Alonso membaca draf artikel ini dan mengklarifikasi beberapa kesalahpahaman saya tentang Zokrates.

Kesalahan yang tersisa adalah tanggung jawab saya.
