---
title: Menulis plasma spesifik aplikasi yang menjaga privasi
description: Dalam tutorial ini, kita akan membuat bank semi-rahasia untuk simpanan. Bank adalah komponen terpusat; ia mengetahui saldo setiap pengguna. Namun, informasi ini tidak disimpan di dalam rantai. Sebagai gantinya, bank memposting sebuah hash dari state. Setiap kali transaksi terjadi, bank memposting hash baru, bersama dengan bukti zero-knowledge bahwa ia memiliki transaksi yang ditandatangani yang mengubah state hash ke yang baru. Setelah membaca tutorial ini, Anda akan mengerti tidak hanya bagaimana menggunakan bukti zero-knowledge, tetapi juga mengapa Anda menggunakannya dan bagaimana melakukannya dengan aman.
author: Ori Pomerantz
tags:
  [
    "zero-knowledge",
    "server",
    "di luar rantai",
    "privasi"
  ]
skill: advanced
lang: id
published: 2025-10-15
---

## Pengenalan {#introduction}

Berbeda dengan [rollup](/developers/docs/scaling/zk-rollups/), [plasma](/developers/docs/scaling/plasma) menggunakan Jaringan Utama Ethereum untuk integritas, tetapi tidak untuk ketersediaan. Dalam artikel ini, kami menulis aplikasi yang berperilaku seperti plasma, dengan Ethereum yang menjamin integritas (tidak ada perubahan yang tidak sah) tetapi tidak menjamin ketersediaan (komponen terpusat dapat mati dan menonaktifkan seluruh sistem).

Aplikasi yang kami tulis di sini adalah bank yang menjaga privasi. Alamat yang berbeda memiliki akun dengan saldo, dan mereka dapat mengirim uang (ETH) ke akun lain. Bank memposting hash dari state (akun dan saldonya) dan transaksi, tetapi menyimpan saldo aktual di luar rantai tempat mereka dapat tetap bersifat pribadi.

## Desain {#design}

Ini bukan sistem yang siap produksi, tetapi alat pengajaran. Karenanya, ini ditulis dengan beberapa asumsi yang menyederhanakan.

- Kumpulan akun tetap. Ada sejumlah akun tertentu, dan setiap akun dimiliki oleh alamat yang telah ditentukan sebelumnya. Ini membuat sistem menjadi jauh lebih sederhana karena sulit untuk menangani struktur data berukuran variabel dalam bukti zero-knowledge. Untuk sistem yang siap produksi, kita dapat menggunakan [akar Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) sebagai hash state dan memberikan bukti Merkle untuk saldo yang diperlukan.

- Penyimpanan memori. Pada sistem produksi, kita perlu menulis semua saldo akun ke disk untuk menyimpannya jika terjadi restart. Di sini, tidak masalah jika informasinya hilang begitu saja.

- Hanya transfer. Sistem produksi akan memerlukan cara untuk menyetorkan aset ke bank dan menariknya. Tetapi tujuannya di sini hanya untuk mengilustrasikan konsep, jadi bank ini terbatas pada transfer.

### Bukti zero-knowledge {#zero-knowledge-proofs}

Pada tingkat fundamental, bukti zero-knowledge menunjukkan bahwa pembukti mengetahui beberapa data, _Data<sub>private</sub>_ sedemikian rupa sehingga ada hubungan _Relationship_ antara beberapa data publik, _Data<sub>public</sub>_, dan _Data<sub>private</sub>_. Verifier mengetahui _Relationship_ dan _Data<sub>public</sub>_.

Untuk menjaga privasi, kita membutuhkan state dan transaksi agar bersifat pribadi. Tetapi untuk memastikan integritas, kita memerlukan [hash kriptografi](https://en.wikipedia.org/wiki/Cryptographic_hash_function) dari state agar bersifat publik. Untuk membuktikan kepada orang-orang yang mengirimkan transaksi bahwa transaksi tersebut benar-benar terjadi, kita juga perlu memposting hash transaksi.

Dalam kebanyakan kasus, _Data<sub>private</sub>_ adalah input ke program bukti zero-knowledge, dan _Data<sub>public</sub>_ adalah outputnya.

Bidang-bidang ini di _Data<sub>private</sub>_:

- _State<sub>n</sub>_, state lama
- _State<sub>n+1</sub>_, state baru
- _Transaksi_, sebuah transaksi yang berubah dari state lama ke yang baru. Transaksi ini perlu menyertakan bidang-bidang berikut:
  - _Alamat tujuan_ yang menerima transfer
  - _Jumlah_ yang ditransfer
  - _Nonce_ untuk memastikan setiap transaksi hanya dapat diproses sekali.
    Alamat sumber tidak perlu ada dalam transaksi, karena dapat dipulihkan dari tanda tangan.
- _Tanda tangan_, tanda tangan yang diotorisasi untuk melakukan transaksi. Dalam kasus kami, satu-satunya alamat yang diotorisasi untuk melakukan transaksi adalah alamat sumber. Karena sistem zero-knowledge kami bekerja dengan cara yang demikian, kami juga memerlukan kunci publik akun, selain tanda tangan Ethereum.

Ini adalah bidang-bidang di _Data<sub>public</sub>_:

- _Hash(State<sub>n</sub>)_ hash dari state lama
- _Hash(State<sub>n+1</sub>)_ hash dari state baru
- _Hash(Transaksi)_ hash dari transaksi yang mengubah state dari _State<sub>n</sub>_ ke _State<sub>n+1</sub>_.

Hubungan memeriksa beberapa kondisi:

- Hash publik memang merupakan hash yang benar untuk bidang pribadi.
- Transaksi, ketika diterapkan pada state lama, menghasilkan state baru.
- Tanda tangan berasal dari alamat sumber transaksi.

Karena sifat fungsi hash kriptografi, membuktikan kondisi ini cukup untuk memastikan integritas.

### Struktur data {#data-structures}

Struktur data utama adalah state yang dipegang oleh server. Untuk setiap akun, server melacak saldo akun dan [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce), yang digunakan untuk mencegah [serangan replay](https://en.wikipedia.org/wiki/Replay_attack).

### Komponen {#components}

Sistem ini membutuhkan dua komponen:

- _Server_ yang menerima transaksi, memprosesnya, dan memposting hash ke rantai bersama dengan bukti zero-knowledge.
- _Kontrak pintar_ yang menyimpan hash dan memverifikasi bukti zero-knowledge untuk memastikan transisi state adalah sah.

### Aliran data dan kontrol {#flows}

Ini adalah cara berbagai komponen berkomunikasi untuk mentransfer dari satu akun ke akun lainnya.

1. Browser web mengirimkan transaksi yang ditandatangani yang meminta transfer dari akun penanda tangan ke akun yang berbeda.

2. Server memverifikasi bahwa transaksi tersebut valid:

   - Penanda tangan memiliki akun di bank dengan saldo yang cukup.
   - Penerima memiliki akun di bank.

3. Server menghitung state baru dengan mengurangi jumlah yang ditransfer dari saldo penanda tangan dan menambahkannya ke saldo penerima.

4. Server menghitung bukti zero-knowledge bahwa perubahan state adalah yang valid.

5. Server mengirimkan transaksi ke Ethereum yang mencakup:

   - Hash state baru
   - Hash transaksi (sehingga pengirim transaksi dapat mengetahui bahwa transaksi telah diproses)
   - Bukti zero-knowledge yang membuktikan transisi ke state baru valid

6. Kontrak pintar memverifikasi bukti zero-knowledge.

7. Jika bukti zero-knowledge berhasil diperiksa, kontrak pintar melakukan tindakan berikut:
   - Perbarui hash state saat ini ke hash state baru
   - Keluarkan entri log dengan hash state baru dan hash transaksi

### Perangkat {#tools}

Untuk kode sisi klien, kami akan menggunakan [Vite](https://vite.dev/), [React](https://react.dev/), [Viem](https://viem.sh/), dan [Wagmi](https://wagmi.sh/). Ini adalah perangkat standar industri; jika Anda tidak terbiasa dengannya, Anda dapat menggunakan [tutorial ini](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

Sebagian besar server ditulis dalam JavaScript menggunakan [Node](https://nodejs.org/en). Bagian zero-knowledge ditulis dalam [Noir](https://noir-lang.org/). Kami memerlukan versi `1.0.0-beta.10`, jadi setelah Anda [menginstal Noir sesuai petunjuk](https://noir-lang.org/docs/getting_started/quick_start), jalankan:

```
noirup -v 1.0.0-beta.10
```

Rantai blok yang kami gunakan adalah `anvil`, sebuah rantai blok pengujian lokal yang merupakan bagian dari [Foundry](https://getfoundry.sh/introduction/installation).

## Implementasi {#implementation}

Karena ini adalah sistem yang kompleks, kami akan mengimplementasikannya secara bertahap.

### Tahap 1 - Zero knowledge manual {#stage-1}

Untuk tahap pertama, kami akan menandatangani transaksi di browser dan kemudian secara manual memberikan informasi ke bukti zero-knowledge. Kode zero-knowledge mengharapkan untuk mendapatkan informasi tersebut di `server/noir/Prover.toml` (didokumentasikan [di sini](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1)).

Untuk melihatnya beraksi:

1. Pastikan Anda telah menginstal [Node](https://nodejs.org/en/download) dan [Noir](https://noir-lang.org/install). Sebaiknya, instal di sistem UNIX seperti macOS, Linux, atau [WSL](https://learn.microsoft.com/en-us/windows/wsl/install).

2. Unduh kode tahap 1 dan mulai server web untuk menyajikan kode klien.

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   Alasan Anda memerlukan server web di sini adalah, untuk mencegah jenis penipuan tertentu, banyak dompet (seperti MetaMask) tidak menerima file yang disajikan langsung dari disk

3. Buka browser dengan dompet.

4. Di dompet, masukkan frasa sandi baru. Perhatikan bahwa ini akan menghapus frasa sandi Anda yang ada, jadi _pastikan Anda memiliki cadangan_.

   Frasa sandi adalah `test test test test test test test test test test test junk`, frasa sandi pengujian default untuk anvil.

5. Telusuri [kode sisi klien](http://localhost:5173/).

6. Hubungkan ke dompet dan pilih akun tujuan dan jumlah Anda.

7. Klik **Tanda Tangan** dan tanda tangani transaksi.

8. Di bawah judul **Prover.toml**, Anda akan menemukan teks. Ganti `server/noir/Prover.toml` dengan teks itu.

9. Jalankan bukti zero-knowledge.

   ```sh
   cd ../server/noir
   nargo execute
   ```

   Outputnya akan serupa dengan

   ```
   ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
   ```

10. Bandingkan dua nilai terakhir dengan hash yang Anda lihat di browser web untuk melihat apakah pesan tersebut di-hash dengan benar.

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[File ini](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) menunjukkan format informasi yang diharapkan oleh Noir.

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

Pesan dalam format teks, yang memudahkan pengguna untuk memahami (yang diperlukan saat menandatangani) dan bagi kode Noir untuk menguraikannya. Jumlahnya dikutip dalam finney untuk memungkinkan transfer pecahan di satu sisi, dan mudah dibaca di sisi lain. Angka terakhir adalah [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce).

Stringnya sepanjang 100 karakter. Bukti zero-knowledge tidak menangani data berukuran variabel dengan baik, jadi seringkali perlu untuk menambahkan data.

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

Ketiga parameter ini adalah array bita berukuran tetap.

```toml
[[accounts]]
address="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
balance=100_000
nonce=0

[[accounts]]
address="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
balance=100_000
nonce=0
```

Ini adalah cara untuk menentukan array struktur. Untuk setiap entri, kami menentukan alamat, saldo (dalam milliETH a.k.a. [finney](https://cryptovalleyjournal.com/glossary/finney/)), dan nilai nonce berikutnya.

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[File ini](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) mengimplementasikan pemrosesan sisi klien dan menghasilkan file `server/noir/Prover.toml` (yang menyertakan parameter zero-knowledge).

Berikut adalah penjelasan bagian-bagian yang lebih menarik.

```tsx
export default attrs =>  {
```

Fungsi ini membuat komponen `Transfer` React, yang dapat diimpor oleh file lain.

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

Ini adalah alamat akun, alamat yang dibuat oleh `test ... frasa sandi test junk`. Jika Anda ingin menggunakan alamat Anda sendiri, cukup modifikasi definisi ini.

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

[Hook Wagmi](https://wagmi.sh/react/api/hooks) ini memungkinkan kita mengakses pustaka [viem](https://viem.sh/) dan dompet.

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

Ini adalah pesannya, yang diisi dengan spasi. Setiap kali salah satu variabel [`useState`](https://react.dev/reference/react/useState) berubah, komponen digambar ulang dan `pesan` diperbarui.

```tsx
  const sign = async () => {
```

Fungsi ini dipanggil ketika pengguna mengklik tombol **Masuk**. Pesan diperbarui secara otomatis, tetapi tanda tangan memerlukan persetujuan pengguna di dompet, dan kami tidak ingin memintanya kecuali diperlukan.

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

Minta dompet untuk [menandatangani pesan](https://viem.sh/docs/accounts/local/signMessage).

```tsx
    const hash = hashMessage(message)
```

Dapatkan hash pesan. Sangat membantu untuk memberikannya kepada pengguna untuk debugging (kode Noir).

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[Dapatkan kunci publik](https://viem.sh/docs/utilities/recoverPublicKey). Ini diperlukan untuk fungsi Noir [`ecrecover`](https://github.com/colinnielsen/ecrecover-noir).

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

Atur variabel state. Melakukan ini akan menggambar ulang komponen (setelah fungsi `sign` keluar) dan menunjukkan kepada pengguna nilai yang diperbarui.

```tsx
    let proverToml = `
```

Teks untuk `Prover.toml`.

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem memberi kita kunci publik sebagai string heksadesimal 65-bita. Bita pertama adalah `0x04`, penanda versi. Ini diikuti oleh 32 bita untuk `x` dari kunci publik dan kemudian 32 bita untuk `y` dari kunci publik.

Namun, Noir berharap untuk mendapatkan informasi ini sebagai dua larik bita, satu untuk `x` dan satu untuk `y`. Lebih mudah untuk menguraikannya di sini di klien daripada sebagai bagian dari bukti zero-knowledge.

Perhatikan bahwa ini adalah praktik yang baik dalam zero-knowledge secara umum. Kode di dalam bukti zero-knowledge mahal, jadi setiap pemrosesan yang dapat dilakukan di luar bukti zero-knowledge _harus_ dilakukan di luar bukti zero-knowledge.

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

Tanda tangan juga disediakan sebagai string heksadesimal 65-bita. Namun, bita terakhir hanya diperlukan untuk memulihkan kunci publik. Karena kunci publik sudah akan diberikan ke kode Noir, kita tidak memerlukannya untuk memverifikasi tanda tangan, dan kode Noir tidak memerlukannya.

```tsx
${accounts.map(accountInProverToml).reduce((a,b) => a+b, "")}
`
```

Sediakan akun.

```tsx
    setProverToml(proverToml)
  }

  return (
    <>
        <h2>Transfer</h2>
```

Ini adalah format HTML (lebih tepatnya, [JSX](https://react.dev/learn/writing-markup-with-jsx)) dari komponen.

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[File ini](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) adalah kode zero-knowledge yang sebenarnya.

```
use std::hash::pedersen_hash;
```

[Hash Pedersen](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) disediakan dengan [pustaka standar Noir](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash). Bukti zero-knowledge biasanya menggunakan fungsi hash ini. Ini jauh lebih mudah untuk dihitung di dalam [sirkuit aritmatika](https://rareskills.io/post/arithmetic-circuit) dibandingkan dengan fungsi hash standar.

```
use keccak256::keccak256;
use dep::ecrecover;
```

Kedua fungsi ini adalah pustaka eksternal, yang didefinisikan dalam [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml). Keduanya persis seperti namanya, sebuah fungsi yang menghitung [hash keccak256](https://emn178.github.io/online-tools/keccak_256.html) dan sebuah fungsi yang memverifikasi tanda tangan Ethereum dan memulihkan alamat Ethereum penanda tangan.

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir terinspirasi oleh [Rust](https://www.rust-lang.org/). Variabel, secara default, adalah konstanta. Beginilah cara kita mendefinisikan konstanta konfigurasi global. Secara khusus, `ACCOUNT_NUMBER` adalah jumlah akun yang kami simpan.

Tipe data bernama `u<number>` adalah jumlah bit tersebut, tanpa tanda. Jenis yang didukung hanyalah `u8`, `u16`, `u32`, `u64`, dan `u128`.

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

Variabel ini digunakan untuk hash Pedersen dari akun, seperti yang dijelaskan di bawah ini.

```
global MESSAGE_LENGTH : u32 = 100;
```

Seperti yang dijelaskan di atas, panjang pesan tetap. Ini ditentukan di sini.

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[Tanda tangan EIP-191](https://eips.ethereum.org/EIPS/eip-191) memerlukan buffer dengan prefiks 26-bita, diikuti oleh panjang pesan dalam ASCII, dan akhirnya pesan itu sendiri.

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

Informasi yang kami simpan tentang sebuah akun. [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) adalah angka, biasanya hingga 253 bit, yang dapat digunakan langsung di [sirkuit aritmatika](https://rareskills.io/post/arithmetic-circuit) yang mengimplementasikan bukti zero-knowledge. Di sini kita menggunakan `Field` untuk menyimpan alamat Ethereum 160-bit.

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

Informasi yang kami simpan untuk transaksi transfer.

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

Definisi fungsi. Parameter adalah informasi `Akun`. Hasilnya adalah array variabel `Field`, yang panjangnya `FLAT_ACCOUNT_FIELDS`

```
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

Nilai pertama dalam array adalah alamat akun. Yang kedua mencakup saldo dan nonce. Panggilan `.into()` mengubah angka menjadi tipe data yang seharusnya. `account.nonce` adalah nilai `u32`, tetapi untuk menambahkannya ke `account.balance << 32`, sebuah nilai `u128`, itu harus menjadi `u128`. Itulah `.into()` yang pertama. Yang kedua mengonversi hasil `u128` menjadi `Field` sehingga pas ke dalam array.

```
    flat
}
```

Di Noir, fungsi hanya dapat mengembalikan nilai di akhir (tidak ada pengembalian awal). Untuk menentukan nilai kembalian, Anda mengevaluasinya tepat sebelum kurung tutup fungsi.

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

Fungsi ini mengubah array akun menjadi array `Field`, yang dapat digunakan sebagai input ke Hash Petersen.

```
    let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

Ini adalah cara Anda menentukan variabel yang dapat diubah, yaitu, _bukan_ konstanta. Variabel dalam Noir harus selalu memiliki nilai, jadi kita inisialisasi variabel ini ke semua nol.

```
    for i in 0..ACCOUNT_NUMBER {
```

Ini adalah perulangan `for`. Perhatikan bahwa batasannya adalah konstanta. Perulangan Noir harus memiliki batasan yang diketahui pada waktu kompilasi. Alasannya adalah sirkuit aritmatika tidak mendukung kontrol aliran. Saat memproses perulangan `for`, kompiler hanya menempatkan kode di dalamnya beberapa kali, satu untuk setiap iterasi.

```
        let fields = flatten_account(accounts[i]);
        for j in 0..FLAT_ACCOUNT_FIELDS {
            flat[i*FLAT_ACCOUNT_FIELDS + j] = fields[j];
        }
    }

    flat
}

fn hash_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> Field {
    pedersen_hash(flatten_accounts(accounts))
}
```

Akhirnya, kita sampai pada fungsi yang menghash array akun.

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

Fungsi ini menemukan akun dengan alamat tertentu. Fungsi ini akan sangat tidak efisien dalam kode standar karena ia melakukan iterasi pada semua akun, bahkan setelah menemukan alamatnya.

Namun, dalam bukti zero-knowledge, tidak ada kontrol aliran. Jika kita perlu memeriksa suatu kondisi, kita harus memeriksanya setiap saat.

Hal serupa terjadi dengan pernyataan `if`. Pernyataan `if` dalam loop di atas diterjemahkan menjadi pernyataan matematika ini.

_hasil<sub>kondisi</sub> = accounts[i].address == address_ // satu jika sama, nol jika sebaliknya

_akun<sub>baru</sub> = hasil<sub>kondisi</sub>\*i + (1-hasil<sub>kondisi</sub>)\*akun<sub>lama</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} tidak memiliki akun");

    account
}
```

Fungsi [`assert`](https://noir-lang.org/docs/dev/noir/concepts/assert) menyebabkan bukti zero-knowledge mogok jika pernyataan salah. Dalam kasus ini, jika kita tidak dapat menemukan akun dengan alamat yang relevan. Untuk melaporkan alamat, kami menggunakan [string format](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings).

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

Fungsi ini menerapkan transaksi transfer dan mengembalikan array akun baru.

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

Kita tidak dapat mengakses elemen struktur di dalam string format di Noir, jadi kita membuat salinan yang dapat digunakan.

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} tidak memiliki {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"Transaksi memiliki nonce {txnNonce}, tetapi akun diharapkan menggunakan {accountNonce}");
```

Ini adalah dua kondisi yang dapat membuat transaksi menjadi tidak valid.

```rust
    let mut newAccounts = accounts;

    newAccounts[from].balance -= txn.amount;
    newAccounts[from].nonce += 1;
    newAccounts[to].balance += txn.amount;

    newAccounts
}
```

Buat array akun baru dan kemudian kembalikan.

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

Fungsi ini membaca alamat dari pesan.

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

Alamat selalu sepanjang 20 bita (a.k.a. 40 digit heksadesimal), dan dimulai dari karakter #7.

```rust
        result *= 0x10;
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            result += (messageBytes[i]-48).into();
        }
        if messageBytes[i] >= 65 & messageBytes[i] <= 70 {    // A-F
            result += (messageBytes[i]-65+10).into()
        }
        if messageBytes[i] >= 97 & messageBytes[i] <= 102 {   // a-f
            result += (messageBytes[i]-97+10).into()
        }        
    }    

    result
}

fn readAmountAndNonce(messageBytes: [u8; MESSAGE_LENGTH]) -> (u128, u32)
```

Baca jumlah dan nonce dari pesan.

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

Dalam pesan, angka pertama setelah alamat adalah jumlah finney (a.k.a. seperseribu ETH) untuk ditransfer. Nomor kedua adalah nonce. Teks apa pun di antara keduanya diabaikan.

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // We just found it
                stillReadingNonce = true;
                lookingForNonce = false;
            }

            if stillReadingNonce {
                nonce = nonce*10 + digit.into();
            }
        } else {
            if stillReadingAmount {
                stillReadingAmount = false;
                lookingForNonce = true;
            }
            if stillReadingNonce {
                stillReadingNonce = false;
            }
        }
    }

    (amount, nonce)
}
```

Mengembalikan [tuple](https://noir-lang.org/docs/noir/concepts/data_types/tuples) adalah cara Noir untuk mengembalikan beberapa nilai dari sebuah fungsi.

```rust
fn readTransferTxn(message: str<MESSAGE_LENGTH>) -> TransferTxn 
{
    let mut txn: TransferTxn = TransferTxn { from: 0, to: 0, amount:0, nonce:0 };
    let messageBytes = message.as_bytes();

    txn.to = readAddress(messageBytes);
    let (amount, nonce) = readAmountAndNonce(messageBytes);
    txn.amount = amount;
    txn.nonce = nonce;

    txn
}
```

Fungsi ini mengonversi pesan menjadi bita, kemudian mengonversi jumlah menjadi `TransferTxn`.

```rust
// Yang setara dengan hashMessage Viem
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

Kami dapat menggunakan Pedersen Hash untuk akun karena mereka hanya di-hash di dalam bukti zero-knowledge. Namun, dalam kode ini kita perlu memeriksa tanda tangan pesan, yang dihasilkan oleh browser. Untuk itu, kita perlu mengikuti format penandatanganan Ethereum di [EIP 191](https://eips.ethereum.org/EIPS/eip-191). Ini berarti kita perlu membuat buffer gabungan dengan prefiks standar, panjang pesan dalam ASCII, dan pesan itu sendiri, dan menggunakan standar Ethereum keccak256 untuk menghashnya.

```rust
    // Prefiks ASCII
    let prefix_bytes = [
        0x19, // \x19
        0x45, // 'E'
        0x74, // 't'
        0x68, // 'h'
        0x65, // 'e'
        0x72, // 'r'
        0x65, // 'e'
        0x75, // 'u'
        0x6D, // 'm'
        0x20, // ' '
        0x53, // 'S'
        0x69, // 'i'
        0x67, // 'g'
        0x6E, // 'n'
        0x65, // 'e'
        0x64, // 'd'
        0x20, // ' '
        0x4D, // 'M'
        0x65, // 'e'
        0x73, // 's'
        0x73, // 's'
        0x61, // 'a'
        0x67, // 'g'
        0x65, // 'e'
        0x3A, // ':'
        0x0A  // '\n'
    ];
```

Untuk menghindari kasus di mana aplikasi meminta pengguna untuk menandatangani pesan yang dapat digunakan sebagai transaksi atau untuk tujuan lain, EIP 191 menentukan bahwa semua pesan yang ditandatangani dimulai dengan karakter 0x19 (bukan karakter ASCII yang valid) diikuti oleh `Ethereum Signed Message:` dan baris baru.

```rust
    let mut buffer: [u8; HASH_BUFFER_SIZE] = [0u8; HASH_BUFFER_SIZE];
    for i in 0..26 {
        buffer[i] = prefix_bytes[i];
    }

    let messageBytes : [u8; MESSAGE_LENGTH] = message.as_bytes();

    if MESSAGE_LENGTH <= 9 {
        for i in 0..1 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+1] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 10 & MESSAGE_LENGTH <= 99 {
        for i in 0..2 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+2] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 100 {
        for i in 0..3 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+3] = messageBytes[i];
        }
    }

    assert(MESSAGE_LENGTH < 1000, "Pesan yang panjangnya lebih dari tiga digit tidak didukung");
```

Tangani panjang pesan hingga 999 dan gagal jika lebih besar. Saya menambahkan kode ini, meskipun panjang pesan adalah konstanta, karena memudahkan untuk mengubahnya. Pada sistem produksi, Anda mungkin hanya akan berasumsi bahwa `MESSAGE_LENGTH` tidak berubah demi kinerja yang lebih baik.

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

Gunakan fungsi standar Ethereum `keccak256`.

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // address, first 16 bytes of hash, last 16 bytes of hash        
{
```

Fungsi ini memverifikasi tanda tangan, yang membutuhkan hash pesan. Ini kemudian memberi kita alamat yang menandatanganinya dan hash pesan. Hash pesan disediakan dalam dua nilai `Field` karena lebih mudah digunakan di sisa program daripada array bita.

Kita perlu menggunakan dua nilai `Field` karena perhitungan field dilakukan [modulo](https://en.wikipedia.org/wiki/Modulo) angka besar, tetapi angka itu biasanya kurang dari 256 bit (jika tidak, akan sulit untuk melakukan perhitungan tersebut di EVM).

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

Tentukan `hash1` dan `hash2` sebagai variabel yang dapat diubah, dan tulis hash ke dalamnya bita demi bita.

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```

Ini mirip dengan [`ecrecover` dari Solidity](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions), dengan dua perbedaan penting:

- Jika tanda tangan tidak valid, panggilan akan gagal `assert` dan program akan dibatalkan.
- Meskipun kunci publik dapat dipulihkan dari tanda tangan dan hash, ini adalah pemrosesan yang dapat dilakukan secara eksternal dan, oleh karena itu, tidak layak dilakukan di dalam bukti zero-knowledge. Jika seseorang mencoba menipu kami di sini, verifikasi tanda tangan akan gagal.

```rust
        hash1,
        hash2
    )
}

fn main(
        accounts: [Account; ACCOUNT_NUMBER],
        message: str<MESSAGE_LENGTH>,
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64],
    ) -> pub (
        Field,  // Hash of old accounts array
        Field,  // Hash of new accounts array
        Field,  // First 16 bytes of message hash
        Field,  // Last 16 bytes of message hash
    )
```

Akhirnya, kita mencapai fungsi `main`. Kita perlu membuktikan bahwa kita memiliki transaksi yang secara valid mengubah hash akun dari nilai lama ke nilai baru. Kami juga perlu membuktikan bahwa ia memiliki hash transaksi spesifik ini sehingga orang yang mengirimkannya tahu bahwa transaksi mereka telah diproses.

```rust
{
    let mut txn = readTransferTxn(message);
```

Kita perlu `txn` agar dapat diubah karena kita tidak membaca alamat dari dari pesan, kita membacanya dari tanda tangan.

```rust
    let (fromAddress, txnHash1, txnHash2) = signatureToAddressAndHash(
        message,
        pubKeyX,
        pubKeyY,
        signature);

    txn.from = fromAddress;

    let newAccounts = apply_transfer_txn(accounts, txn);

    (
        hash_accounts(accounts),
        hash_accounts(newAccounts),
        txnHash1,
        txnHash2
    )
}
```

### Tahap 2 - Menambahkan server {#stage-2}

Pada tahap kedua, kami menambahkan server yang menerima dan mengimplementasikan transaksi transfer dari browser.

Untuk melihatnya beraksi:

1. Hentikan Vite jika sedang berjalan.

2. Unduh cabang yang menyertakan server dan pastikan Anda memiliki semua modul yang diperlukan.

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   Tidak perlu mengkompilasi kode Noir, itu adalah kode yang sama yang Anda gunakan untuk tahap 1.

3. Mulai server.

   ```sh
   npm run start
   ```

4. Di jendela baris perintah terpisah, jalankan Vite untuk menyajikan kode browser.

   ```sh
   cd client
   npm run dev
   ```

5. Telusuri kode klien di [http://localhost:5173](http://localhost:5173)

6. Sebelum Anda dapat mengeluarkan transaksi, Anda perlu mengetahui nonce, serta jumlah yang dapat Anda kirim. Untuk mendapatkan informasi ini, klik **Perbarui data akun** dan tanda tangani pesan.

   Kami memiliki dilema di sini. Di satu sisi, kita tidak ingin menandatangani pesan yang dapat digunakan kembali ([serangan replay](https://en.wikipedia.org/wiki/Replay_attack)), itulah mengapa kita menginginkan nonce sejak awal. Namun, kami belum memiliki nonce. Solusinya adalah memilih nonce yang hanya dapat digunakan sekali dan yang sudah kita miliki di kedua sisi, seperti waktu saat ini.

   Masalah dengan solusi ini adalah waktu mungkin tidak tersinkronisasi dengan sempurna. Jadi, sebagai gantinya, kami menandatangani nilai yang berubah setiap menit. Ini berarti bahwa jendela kerentanan kita terhadap serangan replay paling lama adalah satu menit. Mengingat bahwa dalam produksi permintaan yang ditandatangani akan dilindungi oleh TLS, dan bahwa sisi lain dari terowongan---server---sudah dapat mengungkapkan saldo dan nonce (ia harus mengetahuinya untuk bekerja), ini adalah risiko yang dapat diterima.

7. Setelah browser mendapatkan kembali saldo dan nonce, browser akan menampilkan formulir transfer. Pilih alamat tujuan dan jumlahnya lalu klik **Transfer**. Tanda tangani permintaan ini.

8. Untuk melihat transfer, baik **Perbarui data akun** atau lihat di jendela tempat Anda menjalankan server. Server mencatat state setiap kali berubah.

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start
    
    > server@1.0.0 start
    > node --experimental-json-modules index.mjs
    
    Listening on port 3000
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 36000 finney (milliEth) 0 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 64000 (1)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 100000 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 7200 finney (milliEth) 1 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 56800 (2)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 3000 finney (milliEth) 2 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 53800 (3)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 139000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    ```

#### `server/index.mjs` {#server-index-mjs-1}

[File ini](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) berisi proses server, dan berinteraksi dengan kode Noir di [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr). Berikut adalah penjelasan bagian-bagian yang menarik.

```js
import { Noir } from '@noir-lang/noir_js'
```

Pustaka [noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) menjadi antarmuka antara kode JavaScript dan kode Noir.

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

Muat sirkuit aritmatika—program Noir yang telah dikompilasi yang kita buat pada tahap sebelumnya—dan siapkan untuk menjalankannya.

```js
// Kami hanya memberikan informasi akun sebagai imbalan atas permintaan yang ditandatangani
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Dapatkan data akun " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

Untuk memberikan informasi akun, kami hanya memerlukan tanda tangan. Alasannya adalah kita sudah tahu apa pesannya, dan karena itu hash pesannya.

```js
const processMessage = async (message, signature) => {
```

Memproses pesan dan menjalankan transaksi yang dikodekannya.

```js
    // Get the public key
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

Sekarang setelah kami menjalankan JavaScript di server, kami dapat mengambil kunci publik di sana daripada di klien.

```js
    let noirResult
    try {
        noirResult = await noir.execute({
            message,
            signature: signature.slice(2,-2).match(/.{2}/g).map(x => `0x${x}`),
            pubKeyX,
            pubKeyY,
            accounts: Accounts
        })
```

`noir.execute` menjalankan program Noir. Parameternya setara dengan yang disediakan di [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml). Perhatikan bahwa nilai panjang diberikan sebagai larik string heksadesimal (`["0x60", "0xA7"]`), bukan sebagai nilai heksadesimal tunggal (`0x60A7`), seperti yang dilakukan Viem.

```js
    } catch (err) {
        console.log(`kesalahan Noir: ${err}`)
        throw Error("Transaksi tidak valid, tidak diproses")
    }
```

Jika ada kesalahan, tangkap dan kemudian sampaikan versi yang disederhanakan ke klien.

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

Terapkan transaksi. Kami sudah melakukannya di kode Noir, tetapi lebih mudah melakukannya lagi di sini daripada mengekstrak hasilnya dari sana.

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

Struktur `Akun` awal.

### Tahap 3 - Kontrak pintar Ethereum {#stage-3}

1. Hentikan proses server dan klien.

2. Unduh cabang dengan kontrak pintar dan pastikan Anda memiliki semua modul yang diperlukan.

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Jalankan `anvil` di jendela baris perintah terpisah.

4. Hasilkan kunci verifikasi dan verifier soliditas, lalu salin kode verifier ke proyek Solidity.

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. Buka kontrak pintar dan atur variabel lingkungan untuk menggunakan rantai blok `anvil`.

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

6. Sebarkan `Verifier.sol` dan simpan alamatnya di variabel lingkungan.

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. Menyebarkan kontrak `ZkBank`.

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   Nilai `0x199..67b` adalah hash Pederson dari state awal `Akun`. Jika Anda mengubah state awal ini di `server/index.mjs`, Anda dapat menjalankan transaksi untuk melihat hash awal yang dilaporkan oleh bukti zero-knowledge.

8. Jalankan server.

   ```sh
   cd ../server
   npm run start
   ```

9. Jalankan klien di jendela baris perintah yang berbeda.

   ```sh
   cd client
   npm run dev
   ```

10. Jalankan beberapa transaksi.

11. Untuk memverifikasi bahwa state berubah di dalam rantai, mulai ulang proses server. Lihat bahwa `ZkBank` tidak lagi menerima transaksi, karena nilai hash asli dalam transaksi berbeda dari nilai hash yang disimpan di dalam rantai.

    Ini adalah jenis kesalahan yang diharapkan.

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Listening on port 3000
    Verification error: ContractFunctionExecutionError: The contract function "processTransaction" reverted with the following reason:
    Wrong old state hash

    Contract Call:
        address:   0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
        function:  processTransaction(bytes _proof, bytes32[] _publicInputs)
        args:                        (0x0000000000000000000000000000000000000000000000042ab5d6d1986846cf00000000000000000000000000000000000000000000000b75c020998797da7800000000000000000000000000000000000000000000000
    ```

#### `server/index.mjs` {#server-index-mjs-2}

Perubahan dalam file ini sebagian besar terkait dengan pembuatan bukti aktual dan pengirimannya di dalam rantai.

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

Kita perlu menggunakan [paket Barretenberg](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg) untuk membuat bukti aktual yang akan dikirim di dalam rantai. Kita bisa menggunakan paket ini baik dengan menjalankan antarmuka baris perintah (`bb`) atau dengan menggunakan [pustaka JavaScript, `bb.js`](https://www.npmjs.com/package/@aztec/bb.js). Pustaka JavaScript jauh lebih lambat daripada menjalankan kode secara asli, jadi kami menggunakan [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) di sini untuk menggunakan baris perintah.

Perhatikan bahwa jika Anda memutuskan untuk menggunakan `bb.js`, Anda perlu menggunakan versi yang kompatibel dengan versi Noir yang Anda gunakan. Pada saat penulisan, versi Noir saat ini (1.0.0-beta.11) menggunakan `bb.js` versi 0.87.

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

Alamat di sini adalah yang Anda dapatkan saat memulai dengan `anvil` yang bersih dan mengikuti petunjuk di atas.

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

Kunci pribadi ini adalah salah satu akun pra-dana default di `anvil`.

```js
const generateProof = async (witness, fileID) => {
```

Hasilkan bukti menggunakan `bb` yang dapat dieksekusi.

```js
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

Tulis saksi ke file.

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

Buat bukti sebenarnya. Langkah ini juga membuat file dengan variabel publik, tetapi kita tidak memerlukannya. Kami sudah mendapatkan variabel tersebut dari `noir.execute`.

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

Bukti adalah larik JSON dari nilai `Field`, masing-masing direpresentasikan sebagai nilai heksadesimal. Namun, kita perlu mengirimkannya dalam transaksi sebagai nilai `bita` tunggal, yang direpresentasikan oleh Viem dengan string heksadesimal besar. Di sini kami mengubah format dengan menggabungkan semua nilai, menghapus semua `0x`, dan kemudian menambahkan satu di akhir.

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

Bersihkan dan kembalikan buktinya.

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

Bidang publik harus berupa array nilai 32-bita. Namun, karena kita perlu membagi hash transaksi di antara dua nilai `Field`, itu muncul sebagai nilai 16-bita. Di sini kami menambahkan nol agar Viem akan mengerti itu sebenarnya 32 bita.

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

Setiap alamat hanya menggunakan setiap nonce sekali sehingga kita dapat menggunakan kombinasi `fromAddress` dan `nonce` sebagai pengidentifikasi unik untuk file saksi dan direktori output.

```js
    try {
        await zkBank.write.processTransaction([
            proof, publicFields])
    } catch (err) {
        console.log(`Kesalahan verifikasi: ${err}`)
        throw Error("Tidak dapat memverifikasi transaksi di dalam rantai")
    }
    .
    .
    .
}
```

Kirim transaksi ke rantai.

#### `smart-contracts/src/ZkBank.sol` {#smart-contracts-src-zkbank-sol}

Ini adalah kode di dalam rantai yang menerima transaksi.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.21;

import {HonkVerifier} from "./Verifier.sol";

contract ZkBank {
    HonkVerifier immutable myVerifier;
    bytes32 currentStateHash;

    constructor(address _verifierAddress, bytes32 _initialStateHash) {
        currentStateHash = _initialStateHash;
        myVerifier = HonkVerifier(_verifierAddress);
    }
```

Kode di dalam rantai perlu melacak dua variabel: verifier (kontrak terpisah yang dibuat oleh `nargo`) dan hash state saat ini.

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

Setiap kali state berubah, kami memancarkan peristiwa `TransactionProcessed`.

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

Fungsi ini memproses transaksi. Ini mendapatkan bukti (sebagai `bita`) dan input publik (sebagai array `bytes32`), dalam format yang dibutuhkan verifier (untuk meminimalkan pemrosesan di dalam rantai dan oleh karena itu biaya gas).

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Hash state lama salah");
```

Bukti zero-knowledge perlu membuktikan bahwa transaksi berubah dari hash kita saat ini ke yang baru.

```solidity
        myVerifier.verify(_proof, _publicFields);
```

Panggil kontrak verifier untuk memverifikasi bukti zero-knowledge. Langkah ini mengembalikan transaksi jika bukti zero-knowledge salah.

```solidity
        currentStateHash = _publicFields[1];

        emit TransactionProcessed(
            _publicFields[2]<<128 | _publicFields[3],
            _publicFields[0],
            _publicFields[1]
        );
    }
}
```

Jika semuanya beres, perbarui hash state ke nilai baru dan pancarkan peristiwa `TransactionProcessed`.

## Penyalahgunaan oleh komponen terpusat {#abuses}

Keamanan informasi terdiri dari tiga atribut:

- _Kerahasiaan_, pengguna tidak dapat membaca informasi yang tidak diizinkan untuk mereka baca.
- _Integritas_, informasi tidak dapat diubah kecuali oleh pengguna yang berwenang dengan cara yang diizinkan.
- _Ketersediaan_, pengguna yang berwenang dapat menggunakan sistem.

Pada sistem ini, integritas disediakan melalui bukti zero-knowledge. Ketersediaan jauh lebih sulit untuk dijamin, dan kerahasiaan tidak mungkin, karena bank harus mengetahui saldo setiap akun dan semua transaksi. Tidak ada cara untuk mencegah entitas yang memiliki informasi membagikan informasi tersebut.

Mungkin dimungkinkan untuk membuat bank yang benar-benar rahasia menggunakan [alamat siluman](https://vitalik.eth.limo/general/2023/01/20/stealth.html), tetapi itu di luar cakupan artikel ini.

### Informasi palsu {#false-info}

Salah satu cara server dapat melanggar integritas adalah dengan memberikan informasi palsu saat [data diminta](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291).

Untuk mengatasi ini, kita dapat menulis program Noir kedua yang menerima akun sebagai input pribadi dan alamat yang informasinya diminta sebagai input publik. Outputnya adalah saldo dan nonce alamat itu, dan hash dari akun.

Tentu saja, bukti ini tidak dapat diverifikasi di dalam rantai, karena kami tidak ingin memposting nonce dan saldo di dalam rantai. Namun, itu dapat diverifikasi oleh kode klien yang berjalan di browser.

### Transaksi paksa {#forced-txns}

Mekanisme biasa untuk memastikan ketersediaan dan mencegah penyensoran pada L2 adalah [transaksi paksa](https://docs.optimism.io/stack/transactions/forced-transaction). Tetapi transaksi paksa tidak dapat digabungkan dengan bukti zero-knowledge. Server adalah satu-satunya entitas yang dapat memverifikasi transaksi.

Kita dapat mengubah `smart-contracts/src/ZkBank.sol` untuk menerima transaksi paksa dan mencegah server mengubah state sampai diproses. Namun, ini membuka kita untuk serangan penolakan layanan sederhana. Bagaimana jika transaksi paksa tidak valid dan oleh karena itu tidak mungkin untuk diproses?

Solusinya adalah memiliki bukti zero-knowledge bahwa transaksi paksa tidak valid. Ini memberikan server tiga opsi:

- Memproses transaksi paksa, memberikan bukti zero-knowledge bahwa transaksi telah diproses dan hash state yang baru.
- Tolak transaksi paksa, dan berikan bukti zero-knowledge ke kontrak bahwa transaksi tidak valid (alamat tidak dikenal, nonce buruk, atau saldo tidak mencukupi).
- Abaikan transaksi paksa. Tidak ada cara untuk memaksa server untuk benar-benar memproses transaksi, tetapi itu berarti seluruh sistem tidak tersedia.

#### Obligasi ketersediaan {#avail-bonds}

Dalam implementasi kehidupan nyata, mungkin ada semacam motif keuntungan untuk menjaga server tetap berjalan. Kita dapat memperkuat insentif ini dengan meminta server memasang obligasi ketersediaan yang dapat dibakar oleh siapa saja jika transaksi paksa tidak diproses dalam periode tertentu.

### Kode Noir yang buruk {#bad-noir-code}

Biasanya, agar orang-orang mempercayai kontrak pintar, kami mengunggah kode sumber ke [penjelajah blok](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815EcbDB48b?tab=contract). Namun, dalam kasus bukti zero-knowledge, itu tidak cukup.

`Verifier.sol` berisi kunci verifikasi, yang merupakan fungsi dari program Noir. Namun, kunci itu tidak memberi tahu kita apa program Noir itu. Untuk benar-benar memiliki solusi tepercaya, Anda perlu mengunggah program Noir (dan versi yang membuatnya). Jika tidak, bukti zero-knowledge mungkin mencerminkan program yang berbeda, yang memiliki pintu belakang.

Sampai penjelajah blok mulai mengizinkan kami mengunggah dan memverifikasi program Noir, Anda harus melakukannya sendiri (sebaiknya ke [IPFS](/developers/tutorials/ipfs-decentralized-ui/)). Kemudian pengguna yang canggih akan dapat mengunduh kode sumber, mengkompilasinya sendiri, membuat `Verifier.sol`, dan memverifikasi bahwa itu identik dengan yang ada di dalam rantai.

## Kesimpulan {#conclusion}

Aplikasi tipe plasma memerlukan komponen terpusat sebagai penyimpanan informasi. Ini membuka potensi kerentanan tetapi, sebagai imbalannya, memungkinkan kita untuk menjaga privasi dengan cara yang tidak tersedia di rantai blok itu sendiri. Dengan bukti zero-knowledge, kami dapat memastikan integritas dan mungkin membuatnya menguntungkan secara ekonomi bagi siapa pun yang menjalankan komponen terpusat untuk menjaga ketersediaan.

[Lihat di sini untuk lebih banyak pekerjaan saya](https://cryptodocguy.pro/).

## Penghargaan {#acknowledgements}

- Josh Crites membaca draf artikel ini dan membantu saya dengan masalah Noir yang rumit.

Kesalahan yang tersisa adalah tanggung jawab saya.
