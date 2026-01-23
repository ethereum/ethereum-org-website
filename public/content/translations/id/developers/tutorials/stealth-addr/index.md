---
title: "Menggunakan Alamat Siluman"
description: "Alamat siluman memungkinkan pengguna untuk mentransfer aset secara anonim. Setelah membaca artikel ini, Anda akan dapat: Menjelaskan apa itu alamat siluman dan cara kerjanya, memahami cara menggunakan alamat siluman dengan cara yang menjaga anonimitas, dan menulis aplikasi berbasis web yang menggunakan alamat siluman."
author: Ori Pomerantz
tags:
  [
    "Alamat siluman",
    "privasi",
    "kriptografi",
    "rust",
    "wasm"
  ]
skill: intermediate
published: 2025-11-30
lang: id
sidebarDepth: 3
---

Anda adalah Bill. Untuk alasan yang tidak akan kita bahas, Anda ingin berdonasi ke kampanye "Alice untuk Ratu Dunia" dan ingin Alice tahu bahwa Anda telah berdonasi agar dia akan memberi Anda imbalan jika dia menang. Sayangnya, kemenangannya tidak dijamin. Ada kampanye saingan, "Carol untuk Kaisar Wanita Tata Surya". Jika Carol menang, dan dia mengetahui Anda berdonasi kepada Alice, Anda akan dalam masalah. Jadi Anda tidak bisa begitu saja mentransfer 200 ETH dari akun Anda ke akun Alice.

[ERC-5564](https://eips.ethereum.org/EIPS/eip-5564) memiliki solusinya. ERC ini menjelaskan cara menggunakan [alamat siluman](https://nerolation.github.io/stealth-utils) untuk transfer anonim.

**Peringatan**: Kriptografi di balik alamat siluman, sejauh yang kami tahu, aman. Namun, ada potensi serangan side-channel. [Di bawah](#go-wrong), Anda akan melihat apa yang dapat Anda lakukan untuk mengurangi risiko ini.

## Cara kerja alamat siluman {#how}

Artikel ini akan mencoba menjelaskan alamat siluman dengan dua cara. Yang pertama adalah [cara menggunakannya](#how-use). Bagian ini cukup untuk memahami sisa artikel ini. Kemudian, ada [penjelasan matematika di baliknya](#how-math). Jika Anda tertarik dengan kriptografi, baca juga bagian ini.

### Versi sederhana (cara menggunakan alamat siluman) {#how-use}

Alice membuat dua kunci pribadi dan memublikasikan kunci publik yang sesuai (yang dapat digabungkan menjadi satu meta-address dengan panjang ganda). Bill juga membuat kunci pribadi dan memublikasikan kunci publik yang sesuai.

Dengan menggunakan kunci publik satu pihak dan kunci pribadi pihak lain, Anda dapat memperoleh rahasia bersama yang hanya diketahui oleh Alice dan Bill (rahasia ini tidak dapat diperoleh hanya dari kunci publik saja). Dengan menggunakan rahasia bersama ini, Bill mendapatkan alamat siluman dan dapat mengirim aset ke sana.

Alice juga mendapatkan alamat dari rahasia bersama, tetapi karena dia mengetahui kunci pribadi untuk kunci publik yang dia publikasikan, dia juga bisa mendapatkan kunci pribadi yang memungkinkannya untuk menarik dana dari alamat tersebut.

### Matematika (mengapa alamat siluman bekerja seperti ini) {#how-math}

Alamat siluman standar menggunakan [kriptografi kurva eliptik (ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor) untuk mendapatkan kinerja yang lebih baik dengan bit kunci yang lebih sedikit, sambil tetap menjaga tingkat keamanan yang sama. Tetapi untuk sebagian besar kita dapat mengabaikannya dan berpura-pura kita menggunakan aritmetika biasa.

Ada sebuah angka yang semua orang tahu, _G_. Anda dapat mengalikan dengan _G_. Tetapi karena sifat ECC, hampir tidak mungkin untuk membagi dengan _G_. Cara kerja kriptografi kunci publik secara umum di Ethereum adalah Anda dapat menggunakan kunci pribadi, _P<sub>priv</sub>_, untuk menandatangani transaksi yang kemudian diverifikasi oleh kunci publik, _P<sub>pub</sub> = GP<sub>priv</sub>_.

Alice membuat dua kunci pribadi, _K<sub>priv</sub>_ dan _V<sub>priv</sub>_. _K<sub>priv</sub>_ akan digunakan untuk membelanjakan uang dari alamat siluman, dan _V<sub>priv</sub>_ untuk melihat alamat-alamat yang menjadi milik Alice. Alice kemudian memublikasikan kunci publik: _K<sub>pub</sub> = GK<sub>priv</sub>_ dan _V<sub>pub</sub> = GV<sub>priv</sub>_

Bill membuat kunci pribadi ketiga, _R<sub>priv</sub>_, dan memublikasikan _R<sub>pub</sub> = GR<sub>priv</sub>_ ke registri pusat (Bill juga bisa mengirimkannya ke Alice, tetapi kita berasumsi Carol sedang mendengarkan).

Bill menghitung _R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>_, yang dia harapkan juga diketahui Alice (dijelaskan di bawah). Nilai ini disebut _S_, rahasia bersama. Ini memberi Bill kunci publik, _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_. Dari kunci publik ini, dia dapat menghitung alamat dan mengirim sumber daya apa pun yang dia inginkan ke sana. Di masa depan, jika Alice menang, Bill dapat memberi tahu Alice _R<sub>priv</sub>_ untuk membuktikan bahwa sumber daya tersebut berasal darinya.

Alice menghitung _R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_. Ini memberinya rahasia bersama yang sama, _S_. Karena dia mengetahui kunci pribadi, _K<sub>priv</sub>_, dia dapat menghitung _P<sub>priv</sub> = K<sub>priv</sub>+hash(S)_. Kunci ini memungkinkannya mengakses aset di alamat yang dihasilkan dari _P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hash(S) = K<sub>pub</sub>+G\*hash(S)_.

Kami memiliki kunci penampil terpisah untuk memungkinkan Alice mensubkontrakkan ke Layanan Kampanye Dominasi Dunia Dave. Alice bersedia memberi tahu Dave alamat publik dan memberitahunya ketika lebih banyak uang tersedia, tetapi dia tidak ingin Dave membelanjakan uang kampanyenya.

Karena melihat dan membelanjakan menggunakan kunci terpisah, Alice dapat memberikan _V<sub>priv</sub>_ kepada Dave. Kemudian Dave dapat menghitung _S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ dan dengan cara itu mendapatkan kunci publik (_P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_). Tetapi tanpa _K<sub>priv</sub>_ Dave tidak bisa mendapatkan kunci pribadi.

Singkatnya, ini adalah nilai-nilai yang diketahui oleh peserta yang berbeda.

| Alice                                                                     | Diterbitkan       | Bill                                                                      | Dave                                                                        |                                                |
| ------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ---------------------------------------------- |
| G                                                                         | G                 | G                                                                         | G                                                                           |                                                |
| _K<sub>priv</sub>_                                                        | -                 | -                                                                         | -                                                                           |                                                |
| _V<sub>priv</sub>_                                                        | -                 | -                                                                         | _V<sub>priv</sub>_                                                          |                                                |
| _K<sub>pub</sub> = GK<sub>priv</sub>_                                     | _K<sub>pub</sub>_ | _K<sub>pub</sub>_                                                         | _K<sub>pub</sub>_                                                           |                                                |
| _V<sub>pub</sub> = GV<sub>priv</sub>_                                     | _V<sub>pub</sub>_ | _V<sub>pub</sub>_                                                         | _V<sub>pub</sub>_                                                           |                                                |
| -                                                                         | -                 | _R<sub>priv</sub>_                                                        | -                                                                           |                                                |
| _R<sub>pub</sub>_                                                         | _R<sub>pub</sub>_ | _R<sub>pub</sub> = GR<sub>priv</sub>_                                     | _R<sub>pub</sub>_                                                           |                                                |
| _S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ | -                 | _S = R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ | _S = _R<sub>pub</sub>V<sub>priv</sub>_ = GR<sub>priv</sub>V<sub>priv</sub>_ |                                                |
| _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_         | -                 | _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_         | _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_           |                                                |
| _Alamat=f(P<sub>pub</sub>)_                            | -                 | _Alamat=f(P<sub>pub</sub>)_                            | _Alamat=f(P<sub>pub</sub>)_                              | _Alamat=f(P<sub>pub</sub>)_ |
| _P<sub>priv</sub> = K<sub>priv</sub>+hash(S)_          | -                 | -                                                                         | -                                                                           |                                                |

## Ketika alamat siluman menjadi kacau {#go-wrong}

_Tidak ada rahasia di rantai blok_. Meskipun alamat siluman dapat memberi Anda privasi, privasi tersebut rentan terhadap analisis lalu lintas. Sebagai contoh sepele, bayangkan Bill mendanai sebuah alamat dan segera mengirimkan transaksi untuk memublikasikan nilai _R<sub>pub</sub>_. Tanpa _V<sub>priv</sub>_ Alice, kita tidak bisa yakin bahwa ini adalah alamat siluman, tetapi kemungkinan besar memang begitu. Kemudian, kita melihat transaksi lain yang mentransfer semua ETH dari alamat itu ke alamat dana kampanye Alice. Kita mungkin tidak dapat membuktikannya, tetapi kemungkinan besar Bill baru saja berdonasi untuk kampanye Alice. Carol pasti akan berpikir begitu.

Mudah bagi Bill untuk memisahkan publikasi _R<sub>pub</sub>_ dari pendanaan alamat siluman (lakukan pada waktu yang berbeda, dari alamat yang berbeda). Namun, itu tidak cukup. Pola yang dicari Carol adalah Bill mendanai sebuah alamat, dan kemudian dana kampanye Alice menarik dana darinya.

Satu solusi adalah agar kampanye Alice tidak menarik uangnya secara langsung, tetapi menggunakannya untuk membayar pihak ketiga. Jika kampanye Alice mengirim 10 ETH ke Layanan Kampanye Dominasi Dunia Dave, Carol hanya tahu bahwa Bill berdonasi ke salah satu pelanggan Dave. Jika Dave memiliki cukup banyak pelanggan, Carol tidak akan dapat mengetahui apakah Bill berdonasi kepada Alice yang bersaing dengannya, atau kepada Adam, Albert, atau Abigail yang tidak dipedulikan oleh Carol. Alice dapat menyertakan nilai yang di-hash dengan pembayaran, dan kemudian memberikan preimage kepada Dave, untuk membuktikan bahwa itu adalah donasinya. Sebagai alternatif, seperti disebutkan di atas, jika Alice memberikan _V<sub>priv</sub>_-nya kepada Dave, dia sudah tahu dari siapa pembayaran itu berasal.

Masalah utama dengan solusi ini adalah solusi ini mengharuskan Alice untuk peduli tentang kerahasiaan ketika kerahasiaan itu menguntungkan Bill. Alice mungkin ingin menjaga reputasinya agar teman Bill, Bob, juga akan berdonasi kepadanya. Tetapi mungkin juga dia tidak keberatan mengekspos Bill, karena dengan begitu Bill akan takut dengan apa yang akan terjadi jika Carol menang. Bill mungkin akhirnya akan memberikan lebih banyak dukungan kepada Alice.

### Menggunakan beberapa lapisan siluman {#multi-layer}

Daripada mengandalkan Alice untuk menjaga privasi Bill, Bill bisa melakukannya sendiri. Dia dapat menghasilkan beberapa meta-address untuk orang-orang fiksi, Bob dan Bella. Bill kemudian mengirimkan ETH ke Bob, dan "Bob" (yang sebenarnya adalah Bill) mengirimkannya ke Bella. "Bella" (juga Bill) mengirimkannya ke Alice.

Carol masih bisa melakukan analisis lalu lintas dan melihat jalur pipa Bill-ke-Bob-ke-Bella-ke-Alice. Namun, jika "Bob" dan "Bella" juga menggunakan ETH untuk tujuan lain, tidak akan terlihat bahwa Bill mentransfer apa pun kepada Alice, bahkan jika Alice segera menarik dana dari alamat siluman ke alamat kampanyenya yang diketahui.

## Menulis aplikasi alamat-siluman {#write-app}

Artikel ini menjelaskan aplikasi alamat-siluman yang [tersedia di GitHub](https://github.com/qbzzt/251022-stealth-addresses.git).

### Perangkat {#tools}

Ada [pustaka alamat siluman typescript](https://github.com/ScopeLift/stealth-address-sdk) yang bisa kita gunakan. Namun, operasi kriptografi bisa sangat intensif bagi CPU. Saya lebih suka mengimplementasikannya dalam bahasa yang dikompilasi, seperti [Rust](https://rust-lang.org/), dan menggunakan [WASM](https://webassembly.org/) untuk menjalankan kode di peramban.

Kita akan menggunakan [Vite](https://vite.dev/) dan [React](https://react.dev/). Ini adalah perangkat standar industri; jika Anda tidak terbiasa dengannya, Anda dapat menggunakan [tutorial ini](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Untuk menggunakan Vite, kita memerlukan Node.

### Melihat alamat siluman beraksi {#in-action}

1. Instal perangkat yang diperlukan: [Rust](https://rust-lang.org/tools/install/) dan [Node](https://nodejs.org/en/download).

2. Kloning repositori GitHub.

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

5. Telusuri [aplikasi](http://localhost:5173/). Halaman aplikasi ini memiliki dua bingkai: satu untuk antarmuka pengguna Alice dan yang lainnya untuk Bill. Kedua bingkai tidak berkomunikasi; mereka hanya berada di halaman yang sama untuk kenyamanan.

6. Sebagai Alice, klik **Hasilkan Meta-Address Siluman**. Ini akan menampilkan alamat siluman baru dan kunci pribadi yang sesuai. Salin meta-address siluman ke papan klip.

7. Sebagai Bill, tempel meta-address siluman baru dan klik **Hasilkan sebuah alamat**. Ini memberi Anda alamat untuk didanai untuk Alice.

8. Salin alamat dan kunci publik Bill dan tempelkan di area "Kunci pribadi untuk alamat yang dihasilkan oleh Bill" pada antarmuka pengguna Alice. Setelah bidang-bidang tersebut diisi, Anda akan melihat kunci pribadi untuk mengakses aset di alamat tersebut.

9. Anda dapat menggunakan [kalkulator online](https://iancoleman.net/ethereum-private-key-to-address/) untuk memastikan kunci pribadi sesuai dengan alamatnya.

### Cara kerja program {#how-the-program-works}

#### Komponen WASM {#wasm}

Kode sumber yang dikompilasi menjadi WASM ditulis dalam [Rust](https://rust-lang.org/). Anda dapat melihatnya di [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs). Kode ini terutama merupakan antarmuka antara kode JavaScript dan [pustaka `eth-stealth-addresses`](https://github.com/kassandraoftroy/eth-stealth-addresses).

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

Paket [`getrandom`](https://docs.rs/getrandom/latest/getrandom/) perlu menghasilkan nilai acak. Itu tidak dapat dilakukan dengan cara algoritmik murni; itu memerlukan akses ke proses fisik sebagai sumber entropi. Definisi ini menentukan bahwa kita akan mendapatkan entropi itu dengan bertanya pada peramban tempat kita menjalankannya.

```toml
console_error_panic_hook = "0.1.7"
```

[Pustaka ini](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/) memberi kita pesan kesalahan yang lebih bermakna ketika kode WASM panik dan tidak dapat melanjutkan.

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

Jenis output yang diperlukan untuk menghasilkan kode WASM.

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

Fungsi-fungsi yang kita butuhkan dari [pustaka `eth-stealth-addresses`](https://github.com/kassandraoftroy/eth-stealth-addresses).

```rust
use hex::{decode,encode};
```

Rust biasanya menggunakan [array](https://doc.rust-lang.org/std/primitive.array.html) bita (`[u8; <size>]`) untuk nilai. Tetapi di JavaScript, kita biasanya menggunakan string heksadesimal. [Pustaka `hex`](https://docs.rs/hex/latest/hex/) menerjemahkan untuk kita dari satu representasi ke representasi lainnya.

```rust
#[wasm_bindgen]
```

Hasilkan binding WASM untuk dapat memanggil fungsi ini dari JavaScript.

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

Cara termudah untuk mengembalikan objek dengan banyak bidang adalah dengan mengembalikan string JSON.

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html) mengembalikan tiga bidang:

- Meta-address (_K<sub>pub</sub>_ dan _V<sub>pub</sub>_)
- Kunci pribadi penampil (_V<sub>priv</sub>_)
- Kunci pribadi pembelanjaan (_K<sub>priv</sub>_)

Sintaks [tuple](https://doc.rust-lang.org/std/primitive.tuple.html) memungkinkan kita memisahkan nilai-nilai itu lagi.

```rust
    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

Gunakan makro [`format!`](https://doc.rust-lang.org/std/fmt/index.html) untuk menghasilkan string yang dikodekan JSON. Gunakan [`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html) untuk mengubah array menjadi string hex.

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

Fungsi ini mengubah string hex (disediakan oleh JavaScript) menjadi array bita. Kami menggunakannya untuk mengurai nilai yang disediakan oleh kode JavaScript. Fungsi ini rumit karena cara Rust menangani array dan vektor.

Ekspresi `<const N: usize>` disebut [generik](https://doc.rust-lang.org/book/ch10-01-syntax.html). `N` adalah parameter yang mengontrol panjang array yang dikembalikan. Fungsi ini sebenarnya disebut `str_to_array::<n>`, di mana `n` adalah panjang array.

Nilai kembaliannya adalah `Option<[u8; N]>`, yang berarti array yang dikembalikan adalah [opsional](https://doc.rust-lang.org/std/option/). Ini adalah pola khas di Rust untuk fungsi yang mungkin gagal.

Misalnya, jika kita memanggil `str_to_array::10("bad060a7")`, fungsi tersebut seharusnya mengembalikan array sepuluh nilai, tetapi inputnya hanya empat bita. Fungsi tersebut perlu gagal, dan itu dilakukan dengan mengembalikan `None`. Nilai kembalian untuk `str_to_array::4("bad060a7")` adalah `Some<[0xba, 0xd0, 0x60, 0xa7]>`.

```rust
    // decode returns Result<Vec<u8>, _>
    let vec = decode(s).ok()?;
```

Fungsi [`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) mengembalikan `Result<Vec<u8>, FromHexError>`. Tipe [`Result`](https://doc.rust-lang.org/std/result/) dapat berisi hasil yang berhasil (`Ok(value)`) atau kesalahan (`Err(error)`).

Metode `.ok()` mengubah `Result` menjadi `Option`, yang nilainya adalah nilai `Ok()` jika berhasil atau `None` jika tidak. Terakhir, [operator tanda tanya](https://doc.rust-lang.org/std/option/#the-question-mark-operator-) membatalkan fungsi saat ini dan mengembalikan `None` jika `Option` kosong. Jika tidak, ia akan membuka bungkus nilai dan mengembalikannya (dalam hal ini, untuk menetapkan nilai ke `vec`).

Ini terlihat seperti metode yang anehnya berbelit-belit untuk menangani kesalahan, tetapi `Result` dan `Option` memastikan bahwa semua kesalahan ditangani, dengan satu atau lain cara.

```rust
    if vec.len() != N { return None; }
```

Jika jumlah bita salah, itu adalah kegagalan, dan kami mengembalikan `None`.

```rust
    // try_into consumes vec and attempts to make [u8; N]
    let array: [u8; N] = vec.try_into().ok()?;
```

Rust memiliki dua tipe array. [Array](https://doc.rust-lang.org/std/primitive.array.html) memiliki ukuran tetap. [Vektor](https://doc.rust-lang.org/std/vec/index.html) dapat membesar dan mengecil. `hex::decode` mengembalikan vektor, tetapi pustaka `eth_stealth_addresses` ingin menerima array. [`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods) mengubah nilai menjadi tipe lain, misalnya, vektor menjadi array.

```rust
    Some(array)
}
```

Rust tidak mengharuskan Anda menggunakan kata kunci [`return`](https://doc.rust-lang.org/std/keyword.return.html) saat mengembalikan nilai di akhir fungsi.

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

Fungsi ini menerima meta-address publik, yang mencakup _V<sub>pub</sub>_ dan _K<sub>pub</sub>_. Ini mengembalikan alamat siluman, kunci publik untuk dipublikasikan (_R<sub>pub</sub>_), dan nilai pemindaian satu bita yang mempercepat identifikasi alamat terpublikasi mana yang mungkin milik Alice.

Nilai pemindaian adalah bagian dari rahasia bersama (_S = GR<sub>priv</sub>V<sub>priv</sub>_). Nilai ini tersedia untuk Alice, dan memeriksanya jauh lebih cepat daripada memeriksa apakah _f(K<sub>pub</sub>+G\*hash(S))_ sama dengan alamat yang dipublikasikan.

```rust
    let (address, r_pub, scan) = 
        generate_stealth_address(&str_to_array::<66>(stealth_address)?);
```

Kami menggunakan pustaka [`generate_stealth_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_address.html).

```rust
    format!("{{\"address\":\"{}\",\"rPub\":\"{}\",\"scan\":\"{}\"}}",
        encode(address),
        encode(r_pub),
        encode(&[scan])
    ).into()
}
```

Siapkan string output yang dikodekan JSON.

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

Fungsi ini menggunakan pustaka [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html) untuk menghitung kunci pribadi untuk menarik dana dari alamat (_R<sub>priv</sub>_). Perhitungan ini membutuhkan nilai-nilai berikut:

- Alamat (_Alamat=f(P<sub>pub</sub>)_)
- Kunci publik yang dihasilkan oleh Bill (_R<sub>pub</sub>_)
- Kunci pribadi penampil (_V<sub>priv</sub>_)
- Kunci pribadi pembelanjaan (_K<sub>priv</sub>_)

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html) menentukan bahwa fungsi dieksekusi saat kode WASM diinisialisasi.

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

Kode ini menentukan bahwa output panik dikirim ke konsol JavaScript. Untuk melihatnya beraksi, gunakan aplikasi dan berikan Bill meta-address yang tidak valid (cukup ubah satu digit heksadesimal). Anda akan melihat kesalahan ini di konsol JavaScript:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

Diikuti oleh jejak tumpukan. Kemudian berikan Bill meta-address yang valid, dan berikan Alice alamat yang tidak valid atau kunci publik yang tidak valid. Anda akan melihat kesalahan ini:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

Sekali lagi, diikuti oleh jejak tumpukan.

#### Antarmuka Pengguna {#ui}

Antarmuka pengguna ditulis menggunakan [React](https://react.dev/) dan disajikan oleh [Vite](https://vite.dev/). Anda dapat mempelajarinya menggunakan [tutorial ini](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Tidak perlu [WAGMI](https://wagmi.sh/) di sini karena kita tidak berinteraksi langsung dengan rantai blok atau dompet.

Satu-satunya bagian yang tidak jelas dari antarmuka pengguna adalah konektivitas WASM. Berikut cara kerjanya.

**`vite.config.js`**

File ini berisi [konfigurasi Vite](https://vite.dev/config/).

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm";

// https://vite.dev/config/
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

Saat kita menggunakan [`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/), ia membuat dua file yang kita gunakan di sini: file wasm dengan kode sebenarnya (di sini, `src/rust-wasm/pkg/rust_wasm_bg.wasm`) dan file JavaScript dengan definisi untuk menggunakannya (di sini, `src/rust-wasm/pkg/rust_wasm.js`). Ekspor default dari file JavaScript itu adalah kode yang perlu dijalankan untuk memulai WASM.

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
        alert("Kesalahan Wasm: " + err)
      }
    }

    loadWasm()
    }, []
  )
```

Hook [`useEffect`](https://react.dev/reference/react/useEffect) memungkinkan Anda menentukan fungsi yang akan dieksekusi ketika variabel state berubah. Di sini, daftar variabel state kosong (`[]`), jadi fungsi ini hanya dieksekusi sekali saat halaman dimuat.

Fungsi efek harus segera kembali. Untuk menggunakan kode asinkron, seperti `init` WASM (yang harus memuat file `.wasm` dan karenanya membutuhkan waktu), kami mendefinisikan fungsi [`async`](https://en.wikipedia.org/wiki/Async/await) internal dan menjalankannya tanpa `await`.

**`Bill.jsx`**

Ini adalah antarmuka pengguna untuk Bill. Ini memiliki satu tindakan, membuat alamat berdasarkan meta-address siluman yang disediakan oleh Alice.

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

Selain ekspor default, kode JavaScript yang dihasilkan oleh `wasm-pack` mengekspor fungsi untuk setiap fungsi dalam kode WASM.

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

Untuk memanggil fungsi WASM, kita hanya memanggil fungsi yang diekspor oleh file JavaScript yang dibuat oleh `wasm-pack`.

**`Alice.jsx`**

Kode di `Alice.jsx` analog, kecuali bahwa Alice memiliki dua tindakan:

- Hasilkan meta-address
- Dapatkan kunci pribadi untuk alamat yang dipublikasikan oleh Bill

## Kesimpulan {#conclusion}

Alamat siluman bukanlah obat mujarab; alamat tersebut harus [digunakan dengan benar](#go-wrong). Tetapi ketika digunakan dengan benar, mereka dapat mengaktifkan privasi di rantai blok publik.

[Lihat di sini untuk lebih banyak pekerjaan saya](https://cryptodocguy.pro/).