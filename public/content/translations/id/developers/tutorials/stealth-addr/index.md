---
title: "Menggunakan Alamat Siluman"
description: "Alamat siluman memungkinkan pengguna untuk mentransfer aset secara anonim. Setelah membaca artikel ini, Anda akan dapat: Menjelaskan apa itu alamat siluman dan bagaimana cara kerjanya, memahami cara menggunakan alamat siluman dengan cara yang menjaga anonimitas, dan menulis aplikasi berbasis web yang menggunakan alamat siluman."
author: Ori Pomerantz
tags: ["Alamat siluman", "privasi", "kriptografi", "Rust", "wasm"]
skill: intermediate
published: 2025-11-30
lang: id
sidebarDepth: 3
---

Anda adalah Bill. Untuk alasan yang tidak akan kita bahas, Anda ingin berdonasi ke kampanye "Alice untuk Ratu Dunia" dan ingin Alice tahu bahwa Anda berdonasi sehingga dia akan memberi Anda hadiah jika dia menang. Sayangnya, kemenangannya tidak dijamin. Ada kampanye pesaing, "Carol untuk Permaisuri Tata Surya". Jika Carol menang, dan dia tahu Anda berdonasi kepada Alice, Anda akan mendapat masalah. Jadi Anda tidak bisa begitu saja mentransfer 200 ETH dari akun Anda ke akun Alice.

[ERC-5564](https://eips.ethereum.org/EIPS/eip-5564) memiliki solusinya. ERC ini menjelaskan cara menggunakan [alamat siluman](https://nerolation.github.io/stealth-utils) untuk transfer anonim.

**Peringatan**: Kriptografi di balik alamat siluman, sejauh yang kami tahu, aman. Namun, ada potensi serangan saluran sampingan (side-channel attacks). [Di bawah ini](#go-wrong), Anda akan melihat apa yang dapat Anda lakukan untuk mengurangi risiko ini.

## Cara kerja alamat siluman {#how}

Artikel ini akan mencoba menjelaskan alamat siluman dengan dua cara. Yang pertama adalah [cara menggunakannya](#how-use). Bagian ini cukup untuk memahami sisa artikel. Kemudian, ada [penjelasan tentang matematika di baliknya](#how-math). Jika Anda tertarik dengan kriptografi, bacalah bagian ini juga. 

### Versi sederhana (cara menggunakan alamat siluman) {#how-use}

Alice membuat dua kunci pribadi dan mempublikasikan kunci publik yang sesuai (yang dapat digabungkan menjadi satu alamat meta dengan panjang ganda). Bill juga membuat kunci pribadi dan mempublikasikan kunci publik yang sesuai.

Dengan menggunakan kunci publik satu pihak dan kunci pribadi pihak lain, Anda dapat memperoleh rahasia bersama yang hanya diketahui oleh Alice dan Bill (ini tidak dapat diperoleh dari kunci publik saja). Dengan menggunakan rahasia bersama ini, Bill mendapatkan alamat siluman dan dapat mengirimkan aset ke alamat tersebut.

Alice juga mendapatkan alamat dari rahasia bersama tersebut, tetapi karena dia mengetahui kunci pribadi dari kunci publik yang dia publikasikan, dia juga bisa mendapatkan kunci pribadi yang memungkinkannya menarik dana dari alamat tersebut.

### Matematika (mengapa alamat siluman bekerja seperti ini) {#how-math}

Alamat siluman standar menggunakan [kriptografi kurva eliptik (ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor) untuk mendapatkan kinerja yang lebih baik dengan bit kunci yang lebih sedikit, sambil tetap menjaga tingkat keamanan yang sama. Namun sebagian besar kita dapat mengabaikannya dan berpura-pura menggunakan aritmatika biasa.

Ada angka yang diketahui semua orang, *G*. Anda dapat mengalikannya dengan *G*. Tetapi karena sifat ECC, hampir tidak mungkin untuk membaginya dengan *G*. Cara kerja kriptografi kunci publik secara umum di Ethereum adalah Anda dapat menggunakan kunci pribadi, *P<sub>priv</sub>*, untuk menandatangani transaksi yang kemudian diverifikasi oleh kunci publik, *P<sub>pub</sub> = GP<sub>priv</sub>*. 

Alice membuat dua kunci pribadi, *K<sub>priv</sub>* dan *V<sub>priv</sub>*. *K<sub>priv</sub>* akan digunakan untuk membelanjakan uang dari alamat siluman, dan *V<sub>priv</sub>* untuk melihat alamat yang dimiliki oleh Alice. Alice kemudian mempublikasikan kunci publik: *K<sub>pub</sub> = GK<sub>priv</sub>* dan *V<sub>pub</sub> = GV<sub>priv</sub>*

Bill membuat kunci pribadi ketiga, *R<sub>priv</sub>*, dan mempublikasikan *R<sub>pub</sub> = GR<sub>priv</sub>* ke registri pusat (Bill juga bisa mengirimkannya ke Alice, tetapi kita asumsikan Carol sedang mendengarkan).

Bill menghitung *R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>*, yang dia harapkan Alice juga mengetahuinya (dijelaskan di bawah). Nilai ini disebut *S*, rahasia bersama. Ini memberi Bill sebuah kunci publik, *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*. Dari kunci publik ini, dia dapat menghitung sebuah alamat dan mengirimkan sumber daya apa pun yang dia inginkan ke alamat tersebut. Di masa depan, jika Alice menang, Bill dapat memberitahunya *R<sub>priv</sub>* untuk membuktikan bahwa sumber daya tersebut berasal darinya.

Alice menghitung *R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>*. Ini memberinya rahasia bersama yang sama, *S*. Karena dia mengetahui kunci pribadi, *K<sub>priv</sub>*, dia dapat menghitung *P<sub>priv</sub> = K<sub>priv</sub>+hash(S)*. Kunci ini memungkinkannya mengakses aset di alamat yang dihasilkan dari *P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hash(S) = K<sub>pub</sub>+G\*hash(S)*.

Kita memiliki kunci tampilan (viewing key) terpisah untuk memungkinkan Alice melakukan subkontrak ke Layanan Kampanye Dominasi Dunia Dave. Alice bersedia memberi tahu Dave alamat publik dan menginformasikannya ketika ada lebih banyak uang yang tersedia, tetapi dia tidak ingin Dave menghabiskan uang kampanyenya.

Karena melihat dan membelanjakan menggunakan kunci yang terpisah, Alice dapat memberikan *V<sub>priv</sub>* kepada Dave. Kemudian Dave dapat menghitung *S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>* dan dengan cara itu mendapatkan kunci publik (*P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*). Tetapi tanpa *K<sub>priv</sub>* Dave tidak bisa mendapatkan kunci pribadi.

Singkatnya, ini adalah nilai-nilai yang diketahui oleh berbagai peserta.

| Alice | Dipublikasikan | Bill | Dave |
| - | - | - | - |
| G | G | G | G |
| *K<sub>priv</sub>* | - | - | - | 
| *V<sub>priv</sub>* | - | - | *V<sub>priv</sub>* |
| *K<sub>pub</sub> = GK<sub>priv</sub>* | *K<sub>pub</sub>* | *K<sub>pub</sub>* | *K<sub>pub</sub>* |
| *V<sub>pub</sub> = GV<sub>priv</sub>* | *V<sub>pub</sub>* | *V<sub>pub</sub>* | *V<sub>pub</sub>* |
| - | - | *R<sub>priv</sub>* | - |
| *R<sub>pub</sub>* | *R<sub>pub</sub>* | *R<sub>pub</sub> = GR<sub>priv</sub>* | *R<sub>pub</sub>* |
| *S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>* | - | *S = R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>* | *S = *R<sub>pub</sub>V<sub>priv</sub>* = GR<sub>priv</sub>V<sub>priv</sub>* |
| *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)* | - | *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)* | *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)* |
| *Alamat=f(P<sub>pub</sub>)* | - | *Alamat=f(P<sub>pub</sub>)* | *Alamat=f(P<sub>pub</sub>)* | *Alamat=f(P<sub>pub</sub>)*
| *P<sub>priv</sub> = K<sub>priv</sub>+hash(S)* | - | - | - |

## Ketika alamat siluman bermasalah {#go-wrong}

*Tidak ada rahasia di blockchain*. Meskipun alamat siluman dapat memberi Anda privasi, privasi tersebut rentan terhadap analisis lalu lintas. Sebagai contoh sederhana, bayangkan Bill mendanai sebuah alamat dan segera mengirimkan transaksi untuk mempublikasikan nilai *R<sub>pub</sub>*. Tanpa *V<sub>priv</sub>* milik Alice, kita tidak bisa yakin bahwa ini adalah alamat siluman, tetapi kemungkinan besar memang begitu. Kemudian, kita melihat transaksi lain yang mentransfer semua ETH dari alamat tersebut ke alamat dana kampanye Alice. Kita mungkin tidak dapat membuktikannya, tetapi kemungkinan besar Bill baru saja berdonasi ke kampanye Alice. Carol pasti akan berpikir begitu.

Sangat mudah bagi Bill untuk memisahkan publikasi *R<sub>pub</sub>* dari pendanaan alamat siluman (lakukan pada waktu yang berbeda, dari alamat yang berbeda). Namun, itu tidak cukup. Pola yang dicari Carol adalah Bill mendanai sebuah alamat, dan kemudian dana kampanye Alice menarik dana darinya. 

Salah satu solusinya adalah kampanye Alice tidak menarik uang secara langsung, melainkan menggunakannya untuk membayar pihak ketiga. Jika kampanye Alice mengirimkan 10 ETH ke Layanan Kampanye Dominasi Dunia Dave, Carol hanya tahu bahwa Bill berdonasi ke salah satu pelanggan Dave. Jika Dave memiliki cukup banyak pelanggan, Carol tidak akan dapat mengetahui apakah Bill berdonasi kepada Alice yang bersaing dengannya, atau kepada Adam, Albert, atau Abigail yang tidak dipedulikan Carol. Alice dapat menyertakan nilai yang di-hash dengan pembayaran, dan kemudian memberikan preimage kepada Dave, untuk membuktikan bahwa itu adalah donasinya. Sebagai alternatif, seperti yang dicatat di atas, jika Alice memberikan *V<sub>priv</sub>* miliknya kepada Dave, dia sudah tahu dari mana pembayaran itu berasal.

Masalah utama dengan solusi ini adalah bahwa hal itu mengharuskan Alice untuk peduli tentang kerahasiaan ketika kerahasiaan itu menguntungkan Bill. Alice mungkin ingin mempertahankan reputasinya sehingga teman Bill, Bob, juga akan berdonasi kepadanya. Tetapi mungkin juga dia tidak keberatan mengekspos Bill, karena dengan begitu Bill akan takut dengan apa yang akan terjadi jika Carol menang. Bill mungkin akhirnya memberikan lebih banyak dukungan kepada Alice.

### Menggunakan beberapa lapisan siluman {#multi-layer}

Daripada mengandalkan Alice untuk menjaga privasi Bill, Bill dapat melakukannya sendiri. Dia dapat menghasilkan beberapa alamat meta untuk orang fiktif, Bob dan Bella. Bill kemudian mengirimkan ETH ke Bob, dan "Bob" (yang sebenarnya adalah Bill) mengirimkannya ke Bella. "Bella" (juga Bill) mengirimkannya ke Alice.

Carol masih dapat melakukan analisis lalu lintas dan melihat jalur Bill-ke-Bob-ke-Bella-ke-Alice. Namun, jika "Bob" dan "Bella" juga menggunakan ETH untuk tujuan lain, tidak akan terlihat bahwa Bill mentransfer apa pun ke Alice, bahkan jika Alice segera menarik dana dari alamat siluman ke alamat kampanyenya yang diketahui.

## Menulis aplikasi alamat siluman {#write-app}

Artikel ini menjelaskan aplikasi alamat siluman yang [tersedia di GitHub](https://github.com/qbzzt/251022-stealth-addresses.git). 

### Alat {#tools}

Ada [pustaka alamat siluman typescript](https://github.com/ScopeLift/stealth-address-sdk) yang bisa kita gunakan. Namun, operasi kriptografi dapat memakan banyak CPU. Saya lebih suka mengimplementasikannya dalam bahasa yang dikompilasi, seperti [Rust](https://rust-lang.org/), dan menggunakan [WASM](https://webassembly.org/) untuk menjalankan kode di browser.

Kita akan menggunakan [Vite](https://vite.dev/) dan [React](https://react.dev/). Ini adalah alat standar industri; jika Anda tidak terbiasa dengannya, Anda dapat menggunakan [tutorial ini](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Untuk menggunakan Vite, kita membutuhkan Node.

### Melihat alamat siluman beraksi {#in-action}

1. Instal alat yang diperlukan: [Rust](https://rust-lang.org/tools/install/) dan [Node](https://nodejs.org/en/download).

2. Klon repositori GitHub.

   ```sh
   git clone https://github.com/qbzzt/251022-stealth-addresses.git
   cd 251022-stealth-addresses
```

3. Instal prasyarat dan kompilasi kode Rust.

   ```sh
   cd src/rust-wasm
   rustup target add wasm32-unknown-unknown   
   cargo install wasm-pack   
   wasm-pack build --target web
```

4. Mulai server web.

   ```sh
   cd ../..
   npm install
   npm run dev
```

5. Telusuri ke [aplikasi](http://localhost:5173/). Halaman aplikasi ini memiliki dua bingkai: satu untuk antarmuka pengguna Alice dan yang lainnya untuk Bill. Kedua bingkai tidak berkomunikasi; mereka hanya berada di halaman yang sama untuk kenyamanan.

6. Sebagai Alice, klik **Generate a Stealth Meta-Address**. Ini akan menampilkan alamat siluman baru dan kunci pribadi yang sesuai. Salin alamat meta siluman ke papan klip.

7. Sebagai Bill, tempel alamat meta siluman baru dan klik **Generate an address**. Ini memberi Anda alamat untuk didanai bagi Alice. 

8. Salin alamat dan kunci publik Bill dan tempelkan di area "Private key for address generated by Bill" pada antarmuka pengguna Alice. Setelah bidang tersebut diisi, Anda akan melihat kunci pribadi untuk mengakses aset di alamat tersebut.

9. Anda dapat menggunakan [kalkulator online](https://iancoleman.net/ethereum-private-key-to-address/) untuk memastikan kunci pribadi sesuai dengan alamat.

### Cara kerja program {#how-the-program-works}

#### Komponen WASM {#wasm}

Kode sumber yang dikompilasi menjadi WASM ditulis dalam [Rust](https://rust-lang.org/). Anda dapat melihatnya di [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs). Kode ini pada dasarnya adalah antarmuka antara kode JavaScript dan [pustaka `eth-stealth-addresses`](https://github.com/kassandraoftroy/eth-stealth-addresses).

**`Cargo.toml`**

[`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html) di Rust analog dengan [`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) di JavaScript. Ini berisi informasi paket, deklarasi dependensi, dll.

```toml
[package]
name = "rust-wasm"
version = "0.1.0"
edition = "2024"

[dependencies]
eth-stealth-addresses = "0.1.0"
hex = "0.4.3"
wasm-bindgen = "0.2.104"
getrandom = { version = "0.2", features = ["js"] }
```

Paket [`getrandom`](https://docs.rs/getrandom/latest/getrandom/) perlu menghasilkan nilai acak. Hal itu tidak dapat dilakukan dengan cara algoritmik murni; ini membutuhkan akses ke proses fisik sebagai sumber entropi. Definisi ini menentukan bahwa kita akan mendapatkan entropi tersebut dengan meminta browser tempat kita menjalankannya.

```toml
console_error_panic_hook = "0.1.7"
```

[Pustaka ini](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/) memberi kita pesan kesalahan yang lebih bermakna ketika kode WASM panik dan tidak dapat dilanjutkan.

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

Jenis keluaran yang diperlukan untuk menghasilkan kode WASM.

**`lib.rs`**

Ini adalah kode Rust yang sebenarnya.

```rust
use wasm_bindgen::prelude::*;
```

Definisi untuk membuat paket WASM dari Rust. Mereka didokumentasikan [di sini](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/index.html).

```rust
use eth_stealth_addresses::{
    generate_stealth_meta_address,
    generate_stealth_address,
    compute_stealth_key
};
```

Fungsi yang kita butuhkan dari [pustaka `eth-stealth-addresses`](https://github.com/kassandraoftroy/eth-stealth-addresses).

```rust
use hex::{decode,encode};
```

Rust biasanya menggunakan [array](https://doc.rust-lang.org/std/primitive.array.html) byte (`[u8; <size>]`) untuk nilai. Tetapi di JavaScript, kita biasanya menggunakan string heksadesimal. [Pustaka `hex`](https://docs.rs/hex/latest/hex/) menerjemahkan untuk kita dari satu representasi ke representasi lainnya.

```rust
#[wasm_bindgen]
```

Hasilkan binding WASM agar dapat memanggil fungsi ini dari JavaScript.

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

Cara termudah untuk mengembalikan objek dengan beberapa bidang adalah dengan mengembalikan string JSON. 

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

[`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html) mengembalikan tiga bidang:

- Alamat meta (*K<sub>pub</sub>* dan *V<sub>pub</sub>*)
- Kunci pribadi tampilan (*V<sub>priv</sub>*)
- Kunci pribadi pembelanjaan (*K<sub>priv</sub>*)

Sintaks [tuple](https://doc.rust-lang.org/std/primitive.tuple.html) memungkinkan kita memisahkan nilai-nilai tersebut lagi.

```rust
    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

Gunakan makro [`format!`](https://doc.rust-lang.org/std/fmt/index.html) untuk menghasilkan string yang dienkode JSON. Gunakan [`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html) untuk mengubah array menjadi string hex.

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

Fungsi ini mengubah string hex (disediakan oleh JavaScript) menjadi array byte. Kita menggunakannya untuk mengurai nilai yang disediakan oleh kode JavaScript. Fungsi ini rumit karena cara Rust menangani array dan vektor.

Ekspresi `<const N: usize>` disebut [generik](https://doc.rust-lang.org/book/ch10-01-syntax.html). `N` adalah parameter yang mengontrol panjang array yang dikembalikan. Fungsi ini sebenarnya disebut `str_to_array::<n>`, di mana `n` adalah panjang array.

Nilai kembaliannya adalah `Option<[u8; N]>`, yang berarti array yang dikembalikan bersifat [opsional](https://doc.rust-lang.org/std/option/). Ini adalah pola khas di Rust untuk fungsi yang mungkin gagal.

Misalnya, jika kita memanggil `str_to_array::10("bad060a7")`, fungsi tersebut seharusnya mengembalikan array sepuluh nilai, tetapi inputnya hanya empat byte. Fungsi tersebut harus gagal, dan ia melakukannya dengan mengembalikan `None`. Nilai kembalian untuk `str_to_array::4("bad060a7")` akan menjadi `Some<[0xba, 0xd0, 0x60, 0xa7]>`.

```rust
    // decode returns Result<Vec<u8>, _> // decode mengembalikan Result<Vec<u8>, _>
    let vec = decode(s).ok()?;
```

Fungsi [`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) mengembalikan `Result<Vec<u8>, FromHexError>`. Tipe [`Result`](https://doc.rust-lang.org/std/result/) dapat berisi hasil yang berhasil (`Ok(value)`) atau kesalahan (`Err(error)`).

Metode `.ok()` mengubah `Result` menjadi `Option`, yang nilainya adalah nilai `Ok()` jika berhasil atau `None` jika tidak. Terakhir, [operator tanda tanya](https://doc.rust-lang.org/std/option/#the-question-mark-operator-) membatalkan fungsi saat ini dan mengembalikan `None` jika `Option` kosong. Jika tidak, ia membuka nilai dan mengembalikannya (dalam hal ini, untuk menetapkan nilai ke `vec`).

Ini terlihat seperti metode yang sangat berbelit-belit untuk menangani kesalahan, tetapi `Result` dan `Option` memastikan bahwa semua kesalahan ditangani, dengan satu atau lain cara.

```rust
    if vec.len() != N { return None; }
```

Jika jumlah byte salah, itu adalah kegagalan, dan kita mengembalikan `None`.

```rust
    // try_into consumes vec and attempts to make [u8; N] // try_into mengonsumsi vec dan mencoba membuat [u8; N]
    let array: [u8; N] = vec.try_into().ok()?;
```

Rust memiliki dua tipe array. [Array](https://doc.rust-lang.org/std/primitive.array.html) memiliki ukuran tetap. [Vektor](https://doc.rust-lang.org/std/vec/index.html) dapat bertambah dan menyusut. `hex::decode` mengembalikan vektor, tetapi pustaka `eth_stealth_addresses` ingin menerima array. [`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods) mengonversi nilai ke tipe lain, misalnya, vektor menjadi array.

```rust
    Some(array)
}
```

Rust tidak mengharuskan Anda menggunakan kata kunci [`return`](https://doc.rust-lang.org/std/keyword.return.html) saat mengembalikan nilai di akhir fungsi.

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

Fungsi ini menerima alamat meta publik, yang mencakup *V<sub>pub</sub>* dan *K<sub>pub</sub>*. Ini mengembalikan alamat siluman, kunci publik untuk dipublikasikan (*R<sub>pub</sub>*), dan nilai pemindaian satu byte yang mempercepat identifikasi alamat mana yang dipublikasikan yang mungkin milik Alice.

Nilai pemindaian adalah bagian dari rahasia bersama (*S = GR<sub>priv</sub>V<sub>priv</sub>*). Nilai ini tersedia untuk Alice, dan memeriksanya jauh lebih cepat daripada memeriksa apakah *f(K<sub>pub</sub>+G\*hash(S))* sama dengan alamat yang dipublikasikan.

```rust
    let (address, r_pub, scan) = 
        generate_stealth_address(&str_to_array::&lt;66>(stealth_address)?);
```

Kita menggunakan [`generate_stealth_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_address.html) dari pustaka.

```rust
    format!("{{\"address\":\"{}\",\"rPub\":\"{}\",\"scan\":\"{}\"}}",
        encode(address),
        encode(r_pub),
        encode(&[scan])
    ).into()
}
```

Siapkan string keluaran yang dienkode JSON.

```rust
#[wasm_bindgen]
pub fn wasm_compute_stealth_key(
    address: &str, 
    bill_pub_key: &str, 
    view_private_key: &str,
    spend_private_key: &str    
) -> Option<String> {
    .
    .
    .
}
```

Fungsi ini menggunakan [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html) dari pustaka untuk menghitung kunci pribadi guna menarik dana dari alamat (*R<sub>priv</sub>*). Perhitungan ini membutuhkan nilai-nilai berikut:

- Alamat (*Address=f(P<sub>pub</sub>)*)
- Kunci publik yang dihasilkan oleh Bill (*R<sub>pub</sub>*)
- Kunci pribadi tampilan (*V<sub>priv</sub>*)
- Kunci pribadi pembelanjaan (*K<sub>priv</sub>*)

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html) menentukan bahwa fungsi dieksekusi saat kode WASM diinisialisasi.

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

Kode ini menentukan bahwa keluaran panik dikirim ke konsol JavaScript. Untuk melihatnya beraksi, gunakan aplikasi dan berikan Bill alamat meta yang tidak valid (cukup ubah satu digit heksadesimal). Anda akan melihat kesalahan ini di konsol JavaScript:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

Diikuti oleh jejak tumpukan (stack trace). Kemudian berikan Bill alamat meta yang valid, dan berikan Alice alamat yang tidak valid atau kunci publik yang tidak valid. Anda akan melihat kesalahan ini:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

Sekali lagi, diikuti oleh jejak tumpukan.

#### Antarmuka Pengguna {#ui}

Antarmuka pengguna ditulis menggunakan [React](https://react.dev/) dan disajikan oleh [Vite](https://vite.dev/). Anda dapat mempelajarinya menggunakan [tutorial ini](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Tidak perlu [WAGMI](https://wagmi.sh/) di sini karena kita tidak berinteraksi langsung dengan blockchain atau dompet.

Satu-satunya bagian yang tidak jelas dari antarmuka pengguna adalah konektivitas WASM. Begini cara kerjanya.

**`vite.config.js`**

File ini berisi [konfigurasi Vite](https://vite.dev/config/).

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm";

// https://vite.dev/config/ // https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
})
```

Kita membutuhkan dua plugin Vite: [react](https://www.npmjs.com/package/@vitejs/plugin-react) dan [wasm](https://github.com/Menci/vite-plugin-wasm#readme).

**`App.jsx`**

File ini adalah komponen utama aplikasi. Ini adalah wadah yang mencakup dua komponen: `Alice` dan `Bill`, antarmuka pengguna untuk pengguna tersebut. Bagian yang relevan untuk WASM adalah kode inisialisasi.

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

Saat kita menggunakan [`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/), ia membuat dua file yang kita gunakan di sini: file wasm dengan kode sebenarnya (di sini, `src/rust-wasm/pkg/rust_wasm_bg.wasm`) dan file JavaScript dengan definisi untuk menggunakannya (di sini, `src/rust_wasm/pkg/rust_wasm.js`). Ekspor default dari file JavaScript tersebut adalah kode yang perlu dijalankan untuk memulai WASM.

```jsx
function App() {
    .
    .
    .
  useEffect(() => {
    const loadWasm = async () => {
      try {
        await init();
        setWasmReady(true)
      } catch (err) {
        console.error('Error loading wasm:', err)
        alert("Wasm error: " + err)
      }
    }

    loadWasm()
    }, []
  )
```

[Hook `useEffect`](https://react.dev/reference/react/useEffect) memungkinkan Anda menentukan fungsi yang dieksekusi saat variabel status berubah. Di sini, daftar variabel status kosong (`[]`), jadi fungsi ini hanya dieksekusi sekali saat halaman dimuat.

Fungsi efek harus segera kembali. Untuk menggunakan kode asinkron, seperti `init` WASM (yang harus memuat file `.wasm` dan karenanya membutuhkan waktu) kita mendefinisikan fungsi [`async`](https://en.wikipedia.org/wiki/Async/await) internal dan menjalankannya tanpa `await`.

**`Bill.jsx`**

Ini adalah antarmuka pengguna untuk Bill. Ini memiliki satu tindakan, membuat alamat berdasarkan alamat meta siluman yang disediakan oleh Alice.

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

Selain ekspor default, kode JavaScript yang dihasilkan oleh `wasm-pack` mengekspor fungsi untuk setiap fungsi dalam kode WASM.

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

Untuk memanggil fungsi WASM, kita cukup memanggil fungsi yang diekspor oleh file JavaScript yang dibuat oleh `wasm-pack`.

**`Alice.jsx`**

Kode di `Alice.jsx` serupa, kecuali bahwa Alice memiliki dua tindakan:

- Menghasilkan alamat meta
- Mendapatkan kunci pribadi untuk alamat yang dipublikasikan oleh Bill

## Kesimpulan {#conclusion}

Alamat siluman bukanlah obat mujarab; mereka harus [digunakan dengan benar](#go-wrong). Tetapi jika digunakan dengan benar, mereka dapat mengaktifkan privasi di blockchain publik.

[Lihat di sini untuk karya saya yang lain](https://cryptodocguy.pro/).