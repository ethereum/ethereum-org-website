---
title: Tulis plasma khusus aplikasi yang menjaga privasi
description: Dalam tutorial ini, kita membangun bank semi-rahasia untuk deposit. Bank adalah komponen terpusat; ia mengetahui saldo setiap pengguna. Namun, informasi ini tidak disimpan secara onchain. Sebaliknya, bank memposting hash dari status. Setiap kali transaksi terjadi, bank memposting hash baru, bersama dengan bukti zero-knowledge bahwa ia memiliki transaksi yang ditandatangani yang mengubah status hash ke yang baru. Setelah membaca tutorial ini, Anda tidak hanya akan memahami cara menggunakan bukti zero-knowledge, tetapi juga mengapa Anda menggunakannya dan bagaimana melakukannya dengan aman.
author: Ori Pomerantz
tags: ["zero-knowledge", "server", "offchain", "privasi"]
skill: advanced
lang: id
published: 2025-10-15
---

## Pengantar {#introduction}

Berbeda dengan [rollup](/developers/docs/scaling/zk-rollups/), [plasma](/developers/docs/scaling/plasma) menggunakan mainnet Ethereum untuk integritas, tetapi tidak untuk ketersediaan. Dalam artikel ini, kita menulis aplikasi yang berperilaku seperti plasma, dengan Ethereum menjamin integritas (tidak ada perubahan yang tidak sah) tetapi tidak ketersediaan (komponen terpusat dapat mati dan melumpuhkan seluruh sistem).

Aplikasi yang kita tulis di sini adalah bank yang menjaga privasi. Alamat yang berbeda memiliki akun dengan saldo, dan mereka dapat mengirim uang (ETH) ke akun lain. Bank memposting hash dari status (akun dan saldonya) dan transaksi, tetapi menyimpan saldo sebenarnya secara offchain di mana mereka dapat tetap privat.

## Desain {#design}

Ini bukan sistem yang siap produksi, melainkan alat pengajaran. Oleh karena itu, ini ditulis dengan beberapa asumsi penyederhanaan.

- Kumpulan akun tetap. Ada jumlah akun tertentu, dan setiap akun milik alamat yang telah ditentukan sebelumnya. Ini membuat sistem menjadi jauh lebih sederhana karena sulit untuk menangani struktur data berukuran variabel dalam bukti zero-knowledge. Untuk sistem yang siap produksi, kita dapat menggunakan [akar Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) sebagai hash status dan memberikan bukti Merkle untuk saldo yang diperlukan.

- Penyimpanan memori. Pada sistem produksi, kita perlu menulis semua saldo akun ke disk untuk menyimpannya jika terjadi restart. Di sini, tidak apa-apa jika informasi tersebut hilang begitu saja.

- Hanya transfer. Sistem produksi akan memerlukan cara untuk menyetor aset ke bank dan menariknya. Tetapi tujuannya di sini hanya untuk mengilustrasikan konsep, jadi bank ini terbatas pada transfer.

### Bukti zero-knowledge {#zero-knowledge-proofs}

Pada tingkat dasar, bukti zero-knowledge menunjukkan bahwa pembukti (prover) mengetahui beberapa data, _Data<sub>private</sub>_ sedemikian rupa sehingga ada hubungan _Relationship_ antara beberapa data publik, _Data<sub>public</sub>_, dan _Data<sub>private</sub>_. Pemverifikasi (verifier) mengetahui _Relationship_ dan _Data<sub>public</sub>_.

Untuk menjaga privasi, kita memerlukan status dan transaksi menjadi privat. Namun untuk memastikan integritas, kita memerlukan [hash kriptografi](https://en.wikipedia.org/wiki/Cryptographic_hash_function) dari status menjadi publik. Untuk membuktikan kepada orang-orang yang mengirimkan transaksi bahwa transaksi tersebut benar-benar terjadi, kita juga perlu memposting hash transaksi.

Dalam kebanyakan kasus, _Data<sub>private</sub>_ adalah input ke program bukti zero-knowledge, dan _Data<sub>public</sub>_ adalah outputnya.

Bidang-bidang ini dalam _Data<sub>private</sub>_:

- _State<sub>n</sub>_, status lama
- _State<sub>n+1</sub>_, status baru
- _Transaction_, sebuah transaksi yang mengubah dari status lama ke status baru. Transaksi ini perlu menyertakan bidang-bidang berikut:
  - _Destination address_ (alamat tujuan) yang menerima transfer
  - _Amount_ (jumlah) yang ditransfer
  - _Nonce_ untuk memastikan setiap transaksi hanya dapat diproses sekali.
    Alamat sumber tidak perlu ada dalam transaksi, karena dapat dipulihkan dari tanda tangan.
- _Signature_ (tanda tangan), sebuah tanda tangan yang diotorisasi untuk melakukan transaksi. Dalam kasus kita, satu-satunya alamat yang diotorisasi untuk melakukan transaksi adalah alamat sumber. Karena sistem zero-knowledge kita bekerja seperti ini, kita juga memerlukan kunci publik akun, selain tanda tangan Ethereum.

Ini adalah bidang-bidang dalam _Data<sub>public</sub>_:

- _Hash(State<sub>n</sub>)_ hash dari status lama
- _Hash(State<sub>n+1</sub>)_ hash dari status baru
- _Hash(Transaction)_ hash dari transaksi yang mengubah status dari _State<sub>n</sub>_ ke _State<sub>n+1</sub>_.

Hubungan tersebut memeriksa beberapa kondisi:

- Hash publik memang merupakan hash yang benar untuk bidang privat.
- Transaksi, ketika diterapkan pada status lama, menghasilkan status baru.
- Tanda tangan berasal dari alamat sumber transaksi.

Karena sifat fungsi hash kriptografi, membuktikan kondisi-kondisi ini sudah cukup untuk memastikan integritas.

### Struktur data {#data-structures}

Struktur data utama adalah status yang disimpan oleh server. Untuk setiap akun, server melacak saldo akun dan sebuah [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce), yang digunakan untuk mencegah [serangan replay](https://en.wikipedia.org/wiki/Replay_attack).

### Komponen {#components}

Sistem ini memerlukan dua komponen:

- _Server_ yang menerima transaksi, memprosesnya, dan memposting hash ke chain bersama dengan bukti zero-knowledge.
- Sebuah _kontrak pintar_ yang menyimpan hash dan memverifikasi bukti zero-knowledge untuk memastikan transisi status sah.

### Aliran data dan kontrol {#flows}

Ini adalah cara berbagai komponen berkomunikasi untuk mentransfer dari satu akun ke akun lainnya.

1. Browser web mengirimkan transaksi yang ditandatangani yang meminta transfer dari akun penandatangan ke akun yang berbeda.

2. Server memverifikasi bahwa transaksi tersebut valid:

   - Penandatangan memiliki akun di bank dengan saldo yang cukup.
   - Penerima memiliki akun di bank.

3. Server menghitung status baru dengan mengurangi jumlah yang ditransfer dari saldo penandatangan dan menambahkannya ke saldo penerima.

4. Server menghitung bukti zero-knowledge bahwa perubahan status tersebut valid.

5. Server mengirimkan ke Ethereum sebuah transaksi yang mencakup:

   - Hash status baru
   - Hash transaksi (sehingga pengirim transaksi dapat mengetahui bahwa transaksinya telah diproses)
   - Bukti zero-knowledge yang membuktikan transisi ke status baru adalah valid

6. Kontrak pintar memverifikasi bukti zero-knowledge.

7. Jika bukti zero-knowledge terverifikasi, kontrak pintar melakukan tindakan berikut:
   - Memperbarui hash status saat ini ke hash status baru
   - Memancarkan entri log dengan hash status baru dan hash transaksi

### Alat {#tools}

Untuk kode sisi klien, kita akan menggunakan [Vite](https://vite.dev/), [React](https://react.dev/), [Viem](https://viem.sh/), dan [Wagmi](https://wagmi.sh/). Ini adalah alat standar industri; jika Anda tidak terbiasa dengannya, Anda dapat menggunakan [tutorial ini](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

Sebagian besar server ditulis dalam JavaScript menggunakan [Node](https://nodejs.org/en). Bagian zero-knowledge ditulis dalam [Noir](https://noir-lang.org/). Kita memerlukan versi `1.0.0-beta.10`, jadi setelah Anda [menginstal Noir sesuai petunjuk](https://noir-lang.org/docs/getting_started/quick_start), jalankan:

```
noirup -v 1.0.0-beta.10
```

Blockchain yang kita gunakan adalah `anvil`, sebuah blockchain pengujian lokal yang merupakan bagian dari [Foundry](https://getfoundry.sh/introduction/installation).

## Implementasi {#implementation}

Karena ini adalah sistem yang kompleks, kita akan mengimplementasikannya secara bertahap.

### Tahap 1 - Manual zero knowledge {#stage-1}

Untuk tahap pertama, kita akan menandatangani transaksi di browser dan kemudian secara manual memberikan informasi tersebut ke bukti zero-knowledge. Kode zero-knowledge mengharapkan untuk mendapatkan informasi tersebut di `server/noir/Prover.toml` (didokumentasikan [di sini](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1)).

Untuk melihatnya beraksi:

1. Pastikan Anda telah menginstal [Node](https://nodejs.org/en/download) dan [Noir](https://noir-lang.org/install). Sebaiknya, instal pada sistem UNIX seperti macOS, Linux, atau [WSL](https://learn.microsoft.com/en-us/windows/wsl/install).

2. Unduh kode tahap 1 dan mulai server web untuk menyajikan kode klien.

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
```

   Alasan Anda memerlukan server web di sini adalah bahwa, untuk mencegah jenis penipuan tertentu, banyak dompet (seperti MetaMask) tidak menerima file yang disajikan langsung dari disk

3. Buka browser dengan dompet.

4. Di dompet, masukkan frasa sandi baru. Perhatikan bahwa ini akan menghapus frasa sandi Anda yang ada, jadi _pastikan Anda memiliki cadangan_.

   Frasa sandinya adalah `test test test test test test test test test test test junk`, frasa sandi pengujian default untuk anvil.

5. Jelajahi [kode sisi klien](http://localhost:5173/).

6. Hubungkan ke dompet dan pilih akun tujuan serta jumlah Anda.

7. Klik **Sign** (Tanda tangani) dan tanda tangani transaksi.

8. Di bawah judul **Prover.toml**, Anda akan menemukan teks. Ganti `server/noir/Prover.toml` dengan teks tersebut.

9. Jalankan bukti zero-knowledge.

   ```sh
   cd ../server/noir
   nargo execute
```

   Outputnya harus mirip dengan

   ```
   ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
```

10. Bandingkan dua nilai terakhir dengan hash yang Anda lihat di browser web untuk melihat apakah pesan di-hash dengan benar.

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[File ini](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) menunjukkan format informasi yang diharapkan oleh Noir.

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

Pesan dalam format teks, yang membuatnya mudah dipahami oleh pengguna (yang diperlukan saat menandatangani) dan untuk diurai oleh kode Noir. Jumlahnya dikutip dalam finney untuk memungkinkan transfer pecahan di satu sisi, dan mudah dibaca di sisi lain. Angka terakhir adalah [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce).

String tersebut panjangnya 100 karakter. Bukti zero-knowledge tidak menangani data berukuran variabel dengan baik, sehingga sering kali perlu untuk menambahkan padding pada data.

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

Ketiga parameter ini adalah array byte berukuran tetap.

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

Ini adalah cara untuk menentukan array struktur. Untuk setiap entri, kita menentukan alamat, saldo (dalam milliETH alias [finney](https://cryptovalleyjournal.com/glossary/finney/)), dan nilai nonce berikutnya.

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[File ini](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) mengimplementasikan pemrosesan sisi klien dan menghasilkan file `server/noir/Prover.toml` (yang mencakup parameter zero-knowledge).

Berikut adalah penjelasan dari bagian-bagian yang lebih menarik.

```tsx
export default attrs =>  {
```

Fungsi ini membuat komponen React `Transfer`, yang dapat diimpor oleh file lain.

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

Ini adalah alamat akun, alamat yang dibuat oleh frasa sandi `test ... test junk`. Jika Anda ingin menggunakan alamat Anda sendiri, cukup ubah definisi ini.

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

Ini adalah pesan, yang diberi padding dengan spasi. Setiap kali salah satu variabel [`useState`](https://react.dev/reference/react/useState) berubah, komponen digambar ulang dan `message` diperbarui.

```tsx
  const sign = async () => {
```

Fungsi ini dipanggil ketika pengguna mengklik tombol **Sign**. Pesan diperbarui secara otomatis, tetapi tanda tangan memerlukan persetujuan pengguna di dompet, dan kita tidak ingin memintanya kecuali diperlukan.

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

Dapatkan hash pesan. Ini berguna untuk memberikannya kepada pengguna untuk debugging (dari kode Noir). 

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[Dapatkan kunci publik](https://viem.sh/docs/utilities/recoverPublicKey). Ini diperlukan untuk fungsi [`ecrecover` Noir](https://github.com/colinnielsen/ecrecover-noir).

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

Tetapkan variabel status. Melakukan ini akan menggambar ulang komponen (setelah fungsi `sign` keluar) dan menunjukkan nilai yang diperbarui kepada pengguna.

```tsx
    let proverToml = `
```

Teks untuk `Prover.toml`.

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem memberi kita kunci publik sebagai string heksadesimal 65-byte. Byte pertama adalah `0x04`, penanda versi. Ini diikuti oleh 32 byte untuk `x` dari kunci publik dan kemudian 32 byte untuk `y` dari kunci publik.

Namun, Noir mengharapkan untuk mendapatkan informasi ini sebagai array dua byte, satu untuk `x` dan satu untuk `y`. Lebih mudah untuk mengurainya di sini pada klien daripada sebagai bagian dari bukti zero-knowledge.

Perhatikan bahwa ini adalah praktik yang baik dalam zero-knowledge secara umum. Kode di dalam bukti zero-knowledge itu mahal, jadi pemrosesan apa pun yang dapat dilakukan di luar bukti zero-knowledge _harus_ dilakukan di luar bukti zero-knowledge.

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

Tanda tangan juga disediakan sebagai string heksadesimal 65-byte. Namun, byte terakhir hanya diperlukan untuk memulihkan kunci publik. Karena kunci publik sudah akan diberikan ke kode Noir, kita tidak memerlukannya untuk memverifikasi tanda tangan, dan kode Noir tidak memerlukannya.

```tsx
${accounts.map(accountInProverToml).reduce((a,b) => a+b, "")}
`
```

Sediakan akun.

```tsx
    setProverToml(proverToml)
  }

  return (
    \<>
        <h2>Transfer</h2>
```

Ini adalah format HTML (lebih tepatnya, [JSX](https://react.dev/learn/writing-markup-with-jsx)) dari komponen.

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[File ini](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) adalah kode zero-knowledge yang sebenarnya.

```
use std::hash::pedersen_hash;
```

[Hash Pedersen](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) disediakan dengan [pustaka standar Noir](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash). Bukti zero-knowledge umumnya menggunakan fungsi hash ini. Jauh lebih mudah untuk dihitung di dalam [sirkuit aritmatika](https://rareskills.io/post/arithmetic-circuit) dibandingkan dengan fungsi hash standar.

```
use keccak256::keccak256;
use dep::ecrecover;
```

Kedua fungsi ini adalah pustaka eksternal, yang didefinisikan dalam [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml). Mereka persis seperti namanya, sebuah fungsi yang menghitung [hash keccak256](https://emn178.github.io/online-tools/keccak_256.html) dan sebuah fungsi yang memverifikasi tanda tangan Ethereum dan memulihkan alamat Ethereum penandatangan.

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir terinspirasi oleh [Rust](https://www.rust-lang.org/). Variabel, secara default, adalah konstanta. Ini adalah cara kita mendefinisikan konstanta konfigurasi global. Secara khusus, `ACCOUNT_NUMBER` adalah jumlah akun yang kita simpan.

Tipe data bernama `u<number>` adalah jumlah bit tersebut, tidak bertanda (unsigned). Satu-satunya tipe yang didukung adalah `u8`, `u16`, `u32`, `u64`, dan `u128`.

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

Variabel ini digunakan untuk hash Pedersen dari akun, seperti yang dijelaskan di bawah ini.

```
global MESSAGE_LENGTH : u32 = 100;
```

Seperti yang dijelaskan di atas, panjang pesan adalah tetap. Ini ditentukan di sini.

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[Tanda tangan EIP-191](https://eips.ethereum.org/EIPS/eip-191) memerlukan buffer dengan awalan 26-byte, diikuti oleh panjang pesan dalam ASCII, dan terakhir pesan itu sendiri.

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

Informasi yang kita simpan tentang sebuah akun. [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) adalah angka, biasanya hingga 253 bit, yang dapat digunakan langsung dalam [sirkuit aritmatika](https://rareskills.io/post/arithmetic-circuit) yang mengimplementasikan bukti zero-knowledge. Di sini kita menggunakan `Field` untuk menyimpan alamat Ethereum 160-bit.

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

Informasi yang kita simpan untuk transaksi transfer.

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

Definisi fungsi. Parameternya adalah informasi `Account`. Hasilnya adalah array variabel `Field`, yang panjangnya adalah `FLAT_ACCOUNT_FIELDS`

```
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

Nilai pertama dalam array adalah alamat akun. Yang kedua mencakup saldo dan nonce. Panggilan `.into()` mengubah angka menjadi tipe data yang dibutuhkannya. `account.nonce` adalah nilai `u32`, tetapi untuk menambahkannya ke `account.balance << 32`, sebuah nilai `u128`, ia harus menjadi `u128`. Itu adalah `.into()` pertama. Yang kedua mengubah hasil `u128` menjadi `Field` sehingga pas ke dalam array.

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

Ini adalah cara Anda menentukan variabel yang dapat diubah (mutable), yaitu, _bukan_ konstanta. Variabel di Noir harus selalu memiliki nilai, jadi kita menginisialisasi variabel ini ke semua nol.

```
    for i in 0..ACCOUNT_NUMBER {
```

Ini adalah loop `for`. Perhatikan bahwa batasannya adalah konstanta. Loop Noir harus memiliki batasannya yang diketahui pada waktu kompilasi. Alasannya adalah sirkuit aritmatika tidak mendukung kontrol aliran. Saat memproses loop `for`, kompiler hanya meletakkan kode di dalamnya beberapa kali, satu untuk setiap iterasi.

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

Akhirnya, kita sampai pada fungsi yang melakukan hash pada array akun.

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

Fungsi ini menemukan akun dengan alamat tertentu. Fungsi ini akan sangat tidak efisien dalam kode standar karena ia mengulangi semua akun, bahkan setelah menemukan alamatnya.

Namun, dalam bukti zero-knowledge, tidak ada kontrol aliran. Jika kita perlu memeriksa suatu kondisi, kita harus memeriksanya setiap saat.

Hal serupa terjadi dengan pernyataan `if`. Pernyataan `if` dalam loop di atas diterjemahkan ke dalam pernyataan matematika ini.

_condition<sub>result</sub> = accounts[i].address == address_ // satu jika sama, nol jika sebaliknya

_account<sub>new</sub> = condition<sub>result</sub>\*i + (1-condition<sub>result</sub>)\*account<sub>old</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

Fungsi [`assert`](https://noir-lang.org/docs/dev/noir/concepts/assert) menyebabkan bukti zero-knowledge crash jika asersi salah. Dalam hal ini, jika kita tidak dapat menemukan akun dengan alamat yang relevan. Untuk melaporkan alamat, kita menggunakan [string format](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings).

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
        f"{txnFrom} does not have {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"Transaction has nonce {txnNonce}, but the account is expected to use {accountNonce}");
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

Alamat selalu sepanjang 20 byte (alias 40 digit heksadesimal), dan dimulai pada karakter #7.

```rust
        result *= 0x10;
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9 // 0-9
            result += (messageBytes[i]-48).into();
        }
        if messageBytes[i] >= 65 & messageBytes[i] <= 70 {    // A-F // A-F
            result += (messageBytes[i]-65+10).into()
        }
        if messageBytes[i] >= 97 & messageBytes[i] <= 102 {   // a-f // a-f
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

Dalam pesan, angka pertama setelah alamat adalah jumlah finney (alias seperseribu ETH) yang akan ditransfer. Angka kedua adalah nonce. Teks apa pun di antara keduanya diabaikan.

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9 // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // We just found it // Kami baru saja menemukannya
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

Fungsi ini mengubah pesan menjadi byte, lalu mengubah jumlah menjadi `TransferTxn`.

```rust
// The equivalent to Viem's hashMessage // Setara dengan hashMessage milik Viem
// https://viem.sh/docs/utilities/hashMessage#hashmessage // https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

Kita dapat menggunakan Hash Pedersen untuk akun karena mereka hanya di-hash di dalam bukti zero-knowledge. Namun, dalam kode ini kita perlu memeriksa tanda tangan pesan, yang dihasilkan oleh browser. Untuk itu, kita perlu mengikuti format penandatanganan Ethereum di [EIP 191](https://eips.ethereum.org/EIPS/eip-191). Ini berarti kita perlu membuat buffer gabungan dengan awalan standar, panjang pesan dalam ASCII, dan pesan itu sendiri, dan menggunakan standar Ethereum keccak256 untuk melakukan hash.

```rust
    // ASCII prefix // Awalan ASCII
    let prefix_bytes = [
        0x19, // \x19 // \x19
        0x45, // 'E' // 'E'
        0x74, // 't' // 't'
        0x68, // 'h' // 'h'
        0x65, // 'e' // 'e'
        0x72, // 'r' // 'r'
        0x65, // 'e' // 'e'
        0x75, // 'u' // 'u'
        0x6D, // 'm' // 'm'
        0x20, // ' ' // ' '
        0x53, // 'S' // 'S'
        0x69, // 'i' // 'i'
        0x67, // 'g' // 'g'
        0x6E, // 'n' // 'n'
        0x65, // 'e' // 'e'
        0x64, // 'd' // 'd'
        0x20, // ' ' // ' '
        0x4D, // 'M' // 'M'
        0x65, // 'e' // 'e'
        0x73, // 's' // 's'
        0x73, // 's' // 's'
        0x61, // 'a' // 'a'
        0x67, // 'g' // 'g'
        0x65, // 'e' // 'e'
        0x3A, // ':' // ':'
        0x0A  // '\n' // '\n'
    ];
```

Untuk menghindari kasus di mana aplikasi meminta pengguna untuk menandatangani pesan yang dapat digunakan sebagai transaksi atau untuk tujuan lain, EIP 191 menetapkan bahwa semua pesan yang ditandatangani dimulai dengan karakter 0x19 (bukan karakter ASCII yang valid) diikuti oleh `Ethereum Signed Message:` dan baris baru.

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

    assert(MESSAGE_LENGTH < 1000, "Messages whose length is over three digits are not supported");
```

Tangani panjang pesan hingga 999 dan gagalkan jika lebih besar. Saya menambahkan kode ini, meskipun panjang pesan adalah konstanta, karena ini membuatnya lebih mudah untuk diubah. Pada sistem produksi, Anda mungkin hanya berasumsi `MESSAGE_LENGTH` tidak berubah demi kinerja yang lebih baik.

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
    ) -> (Field, Field, Field)   // address, first 16 bytes of hash, last 16 bytes of hash // alamat, 16 byte pertama dari hash, 16 byte terakhir dari hash
{
```

Fungsi ini memverifikasi tanda tangan, yang memerlukan hash pesan. Ini kemudian memberi kita alamat yang menandatanganinya dan hash pesan. Hash pesan disediakan dalam dua nilai `Field` karena itu lebih mudah digunakan di sisa program daripada array byte.

Kita perlu menggunakan dua nilai `Field` karena perhitungan field dilakukan [modulo](https://en.wikipedia.org/wiki/Modulo) angka besar, tetapi angka tersebut biasanya kurang dari 256 bit (jika tidak, akan sulit untuk melakukan perhitungan tersebut di EVM).

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

Tentukan `hash1` dan `hash2` sebagai variabel yang dapat diubah, dan tulis hash ke dalamnya byte demi byte.

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```
    
Ini mirip dengan [`ecrecover` Solidity](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions), dengan dua perbedaan penting:

- Jika tanda tangan tidak valid, panggilan menggagalkan `assert` dan program dibatalkan.
- Meskipun kunci publik dapat dipulihkan dari tanda tangan dan hash, ini adalah pemrosesan yang dapat dilakukan secara eksternal dan, oleh karena itu, tidak layak dilakukan di dalam bukti zero-knowledge. Jika seseorang mencoba menipu kita di sini, verifikasi tanda tangan akan gagal.

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
        Field,  // Hash of old accounts array // Hash dari array akun lama
        Field,  // Hash of new accounts array // Hash dari array akun baru
        Field,  // First 16 bytes of message hash // 16 byte pertama dari hash pesan
        Field,  // Last 16 bytes of message hash // 16 byte terakhir dari hash pesan
    )
```

Akhirnya, kita mencapai fungsi `main`. Kita perlu membuktikan bahwa kita memiliki transaksi yang secara valid mengubah hash akun dari nilai lama ke nilai baru. Kita juga perlu membuktikan bahwa ia memiliki hash transaksi spesifik ini sehingga orang yang mengirimnya tahu bahwa transaksinya telah diproses.

```rust
{
    let mut txn = readTransferTxn(message);
```

Kita memerlukan `txn` agar dapat diubah karena kita tidak membaca alamat pengirim dari pesan, kita membacanya dari tanda tangan. 

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

Pada tahap kedua, kita menambahkan server yang menerima dan mengimplementasikan transaksi transfer dari browser.

Untuk melihatnya beraksi:

1. Hentikan Vite jika sedang berjalan.

2. Unduh cabang yang mencakup server dan pastikan Anda memiliki semua modul yang diperlukan.

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
```

   Tidak perlu mengkompilasi kode Noir, ini sama dengan kode yang Anda gunakan untuk tahap 1.

3. Mulai server.

   ```sh
   npm run start
```

4. Di jendela baris perintah terpisah, jalankan Vite untuk menyajikan kode browser.

   ```sh
   cd client
   npm run dev
```

5. Jelajahi kode klien di [http://localhost:5173](http://localhost:5173)

6. Sebelum Anda dapat mengeluarkan transaksi, Anda perlu mengetahui nonce, serta jumlah yang dapat Anda kirim. Untuk mendapatkan informasi ini, klik **Update account data** (Perbarui data akun) dan tanda tangani pesan.

   Kita memiliki dilema di sini. Di satu sisi, kita tidak ingin menandatangani pesan yang dapat digunakan kembali (sebuah [serangan replay](https://en.wikipedia.org/wiki/Replay_attack)), itulah sebabnya kita menginginkan nonce sejak awal. Namun, kita belum memiliki nonce. Solusinya adalah memilih nonce yang hanya dapat digunakan sekali dan yang sudah kita miliki di kedua sisi, seperti waktu saat ini.

   Masalah dengan solusi ini adalah bahwa waktu mungkin tidak tersinkronisasi dengan sempurna. Jadi sebagai gantinya, kita menandatangani nilai yang berubah setiap menit. Ini berarti bahwa jendela kerentanan kita terhadap serangan replay paling lama satu menit. Mengingat bahwa dalam produksi permintaan yang ditandatangani akan dilindungi oleh TLS, dan bahwa sisi lain dari terowongan---server---sudah dapat mengungkapkan saldo dan nonce (ia harus mengetahuinya agar berfungsi), ini adalah risiko yang dapat diterima.

7. Setelah browser mendapatkan kembali saldo dan nonce, ia menampilkan formulir transfer. Pilih alamat tujuan dan jumlahnya lalu klik **Transfer**. Tanda tangani permintaan ini.

8. Untuk melihat transfer, baik **Update account data** atau lihat di jendela tempat Anda menjalankan server. Server mencatat status setiap kali berubah.

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

[File ini](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) berisi proses server, dan berinteraksi dengan kode Noir di [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr). Berikut adalah penjelasan dari bagian-bagian yang menarik.

```js
import { Noir } from '@noir-lang/noir_js'
```

Pustaka [noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) menjadi antarmuka antara kode JavaScript dan kode Noir.

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

Muat sirkuit aritmatika---program Noir yang dikompilasi yang kita buat pada tahap sebelumnya---dan bersiaplah untuk menjalankannya.

```js
// We only provide account information in return to a signed request // Kami hanya memberikan informasi akun sebagai balasan atas permintaan yang ditandatangani
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

Untuk memberikan informasi akun, kita hanya memerlukan tanda tangan. Alasannya adalah kita sudah tahu apa pesannya nanti, dan oleh karena itu hash pesannya.

```js
const processMessage = async (message, signature) => {
```

Proses pesan dan jalankan transaksi yang dikodenya.

```js
    // Get the public key // Dapatkan kunci publik
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

Sekarang setelah kita menjalankan JavaScript di server, kita dapat mengambil kunci publik di sana daripada di klien.

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

`noir.execute` menjalankan program Noir. Parameternya setara dengan yang disediakan di [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml). Perhatikan bahwa nilai panjang disediakan sebagai array string heksadesimal (`["0x60", "0xA7"]`), bukan sebagai nilai heksadesimal tunggal (`0x60A7`), seperti yang dilakukan Viem.

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Invalid transaction, not processed")
    }
```

Jika ada kesalahan, tangkap dan kemudian sampaikan versi yang disederhanakan ke klien.

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

Terapkan transaksi. Kita sudah melakukannya di kode Noir, tetapi lebih mudah untuk melakukannya lagi di sini daripada mengekstrak hasilnya dari sana.

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

Struktur `Accounts` awal.

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

4. Hasilkan kunci verifikasi dan pemverifikasi solidity, lalu salin kode pemverifikasi ke proyek Solidity.

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
```

5. Buka kontrak pintar dan atur variabel lingkungan untuk menggunakan blockchain `anvil`.

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

6. Terapkan `Verifier.sol` dan simpan alamatnya dalam variabel lingkungan.

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
```

7. Terapkan kontrak `ZkBank`.

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
```

   Nilai `0x199..67b` adalah hash Pederson dari status awal `Accounts`. Jika Anda mengubah status awal ini di `server/index.mjs`, Anda dapat menjalankan transaksi untuk melihat hash awal yang dilaporkan oleh bukti zero-knowledge.

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

11. Untuk memverifikasi bahwa status berubah secara onchain, mulai ulang proses server. Lihat bahwa `ZkBank` tidak lagi menerima transaksi, karena nilai hash asli dalam transaksi berbeda dari nilai hash yang disimpan secara onchain.

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

Perubahan dalam file ini sebagian besar berkaitan dengan pembuatan bukti aktual dan mengirimkannya secara onchain.

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

Kita perlu menggunakan [paket Barretenberg](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg) untuk membuat bukti aktual untuk dikirim secara onchain. Kita dapat menggunakan paket ini baik dengan menjalankan antarmuka baris perintah (`bb`) atau dengan menggunakan [pustaka JavaScript, `bb.js`](https://www.npmjs.com/package/@aztec/bb.js). Pustaka JavaScript jauh lebih lambat daripada menjalankan kode secara native, jadi kita menggunakan [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) di sini untuk menggunakan baris perintah.

Perhatikan bahwa jika Anda memutuskan untuk menggunakan `bb.js`, Anda perlu menggunakan versi yang kompatibel dengan versi Noir yang Anda gunakan. Pada saat penulisan, versi Noir saat ini (1.0.0-beta.11) menggunakan `bb.js` versi 0.87.

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

Alamat di sini adalah alamat yang Anda dapatkan saat Anda memulai dengan `anvil` yang bersih dan mengikuti petunjuk di atas.

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

Kunci pribadi ini adalah salah satu akun pra-didanai default di `anvil`. 

```js
const generateProof = async (witness, fileID) => {
```

Hasilkan bukti menggunakan executable `bb`.

```js
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

Tulis saksi (witness) ke sebuah file.

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

Benar-benar membuat bukti. Langkah ini juga membuat file dengan variabel publik, tetapi kita tidak membutuhkannya. Kita sudah mendapatkan variabel tersebut dari `noir.execute`.

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

Bukti tersebut adalah array JSON dari nilai `Field`, masing-masing direpresentasikan sebagai nilai heksadesimal. Namun, kita perlu mengirimkannya dalam transaksi sebagai nilai `bytes` tunggal, yang direpresentasikan Viem dengan string heksadesimal besar. Di sini kita mengubah format dengan menggabungkan semua nilai, menghapus semua `0x`, dan kemudian menambahkan satu di akhir.

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

Bersihkan dan kembalikan bukti.

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

Bidang publik harus berupa array nilai 32-byte. Namun, karena kita perlu membagi hash transaksi di antara dua nilai `Field`, ia muncul sebagai nilai 16-byte. Di sini kita menambahkan nol sehingga Viem akan mengerti bahwa itu sebenarnya 32 byte.

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

Setiap alamat hanya menggunakan setiap nonce sekali sehingga kita dapat menggunakan kombinasi `fromAddress` dan `nonce` sebagai pengidentifikasi unik untuk file saksi dan direktori output.

```js
    try {
        await zkBank.write.processTransaction([
            proof, publicFields])
    } catch (err) {
        console.log(`Verification error: ${err}`)
        throw Error("Can't verify the transaction onchain")
    }
    .
    .
    .
}
```

Kirim transaksi ke chain.

#### `smart-contracts/src/ZkBank.sol` {#smart-contracts-src-zkbank-sol}

Ini adalah kode onchain yang menerima transaksi.

```solidity
// SPDX-License-Identifier: MIT // SPDX-License-Identifier: MIT

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

Kode onchain perlu melacak dua variabel: pemverifikasi (kontrak terpisah yang dibuat oleh `nargo`) dan hash status saat ini.

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

Setiap kali status berubah, kita memancarkan peristiwa `TransactionProcessed`.

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

Fungsi ini memproses transaksi. Ia mendapatkan bukti (sebagai `bytes`) dan input publik (sebagai array `bytes32`), dalam format yang diperlukan pemverifikasi (untuk meminimalkan pemrosesan onchain dan karenanya biaya gas).

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Wrong old state hash");
```

Bukti zero-knowledge harus berupa bahwa transaksi berubah dari hash kita saat ini ke hash yang baru.

```solidity
        myVerifier.verify(_proof, _publicFields);
```

Panggil kontrak pemverifikasi untuk memverifikasi bukti zero-knowledge. Langkah ini mengembalikan transaksi jika bukti zero-knowledge salah.

```solidity
        currentStateHash = _publicFields[1];

        emit TransactionProcessed(
            _publicFields[2]<&lt;128 | _publicFields[3],
            _publicFields[0],
            _publicFields[1]
        );
    }
}
```

Jika semuanya terverifikasi, perbarui hash status ke nilai baru dan pancarkan peristiwa `TransactionProcessed`.

## Penyalahgunaan oleh komponen terpusat {#abuses}

Keamanan informasi terdiri dari tiga atribut:

- _Kerahasiaan_, pengguna tidak dapat membaca informasi yang tidak diizinkan untuk mereka baca.
- _Integritas_, informasi tidak dapat diubah kecuali oleh pengguna yang berwenang dengan cara yang sah.
- _Ketersediaan_, pengguna yang berwenang dapat menggunakan sistem.

Pada sistem ini, integritas disediakan melalui bukti zero-knowledge. Ketersediaan jauh lebih sulit untuk dijamin, dan kerahasiaan tidak mungkin, karena bank harus mengetahui saldo setiap akun dan semua transaksi. Tidak ada cara untuk mencegah entitas yang memiliki informasi untuk membagikan informasi tersebut.

Mungkin saja untuk membuat bank yang benar-benar rahasia menggunakan [alamat siluman](https://vitalik.eth.limo/general/2023/01/20/stealth.html), tetapi itu di luar cakupan artikel ini.

### Informasi palsu {#false-info}

Salah satu cara server dapat melanggar integritas adalah dengan memberikan informasi palsu saat [data diminta](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291).

Untuk mengatasi ini, kita dapat menulis program Noir kedua yang menerima akun sebagai input privat dan alamat yang informasinya diminta sebagai input publik. Outputnya adalah saldo dan nonce dari alamat tersebut, dan hash dari akun.

Tentu saja, bukti ini tidak dapat diverifikasi secara onchain, karena kita tidak ingin memposting nonce dan saldo secara onchain. Namun, ini dapat diverifikasi oleh kode klien yang berjalan di browser.

### Transaksi paksa {#forced-txns}

Mekanisme biasa untuk memastikan ketersediaan dan mencegah penyensoran pada L2 adalah [transaksi paksa](https://docs.optimism.io/stack/transactions/forced-transaction). Tetapi transaksi paksa tidak digabungkan dengan bukti zero-knowledge. Server adalah satu-satunya entitas yang dapat memverifikasi transaksi.

Kita dapat memodifikasi `smart-contracts/src/ZkBank.sol` untuk menerima transaksi paksa dan mencegah server mengubah status hingga transaksi tersebut diproses. Namun, ini membuka kita terhadap serangan penolakan layanan (denial-of-service) yang sederhana. Bagaimana jika transaksi paksa tidak valid dan karenanya tidak mungkin diproses?

Solusinya adalah memiliki bukti zero-knowledge bahwa transaksi paksa tidak valid. Ini memberi server tiga opsi:

- Memproses transaksi paksa, memberikan bukti zero-knowledge bahwa itu telah diproses dan hash status baru.
- Menolak transaksi paksa, dan memberikan bukti zero-knowledge ke kontrak bahwa transaksi tersebut tidak valid (alamat tidak diketahui, nonce buruk, atau saldo tidak mencukupi).
- Mengabaikan transaksi paksa. Tidak ada cara untuk memaksa server untuk benar-benar memproses transaksi, tetapi itu berarti seluruh sistem tidak tersedia.

#### Obligasi ketersediaan {#avail-bonds}

Dalam implementasi kehidupan nyata, mungkin akan ada semacam motif keuntungan untuk menjaga server tetap berjalan. Kita dapat memperkuat insentif ini dengan meminta server memposting obligasi ketersediaan yang dapat dibakar oleh siapa saja jika transaksi paksa tidak diproses dalam periode tertentu.

### Kode Noir yang buruk {#bad-noir-code}

Biasanya, untuk membuat orang mempercayai kontrak pintar, kita mengunggah kode sumber ke [penjelajah blok](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract). Namun, dalam kasus bukti zero-knowledge, itu tidak cukup.

`Verifier.sol` berisi kunci verifikasi, yang merupakan fungsi dari program Noir. Namun, kunci itu tidak memberi tahu kita apa program Noir itu. Untuk benar-benar memiliki solusi tepercaya, Anda perlu mengunggah program Noir (dan versi yang membuatnya). Jika tidak, bukti zero-knowledge mungkin mencerminkan program yang berbeda, yang memiliki pintu belakang (back door).

Hingga penjelajah blok mulai mengizinkan kita untuk mengunggah dan memverifikasi program Noir, Anda harus melakukannya sendiri (sebaiknya ke [IPFS](/developers/tutorials/ipfs-decentralized-ui/)). Kemudian pengguna yang canggih akan dapat mengunduh kode sumber, mengkompilasinya sendiri, membuat `Verifier.sol`, dan memverifikasi bahwa itu identik dengan yang ada di onchain.

## Kesimpulan {#conclusion}

Aplikasi tipe plasma memerlukan komponen terpusat sebagai penyimpanan informasi. Ini membuka potensi kerentanan tetapi, sebagai imbalannya, memungkinkan kita untuk menjaga privasi dengan cara yang tidak tersedia di blockchain itu sendiri. Dengan bukti zero-knowledge kita dapat memastikan integritas dan mungkin membuatnya menguntungkan secara ekonomi bagi siapa pun yang menjalankan komponen terpusat untuk mempertahankan ketersediaan.

[Lihat di sini untuk lebih banyak karya saya](https://cryptodocguy.pro/).

## Ucapan Terima Kasih {#acknowledgements}

- Josh Crites membaca draf artikel ini dan membantu saya dengan masalah Noir yang rumit.

Setiap kesalahan yang tersisa adalah tanggung jawab saya.