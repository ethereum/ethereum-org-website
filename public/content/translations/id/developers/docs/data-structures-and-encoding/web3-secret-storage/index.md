---
title: Definisi penyimpanan rahasia Web3
description: Definisi formal untuk penyimpanan rahasia web3
lang: id
sidebarDepth: 2
---

Untuk membuat aplikasi Anda berfungsi di Ethereum, Anda dapat menggunakan objek web3 yang disediakan oleh pustaka web3.js. Di balik layar, ini berkomunikasi dengan node lokal melalui panggilan RPC. [web3](https://github.com/ethereum/web3.js/) berfungsi dengan node Ethereum mana pun yang mengekspos lapisan RPC.

`web3` berisi objek `eth` - web3.eth.

```js
var fs = require("fs")
var recognizer = require("ethereum-keyfile-recognizer")

fs.readFile("keyfile.json", (err, data) => {
  var json = JSON.parse(data)
  var result = recognizer(json)
})

/* * hasil
 *               [ 'web3', 3 ]   file kunci web3 (v3)
 *  [ 'ethersale', undefined ]   file kunci Ethersale
 *                        null     file kunci tidak valid */
/** result
 *               [ 'web3', 3 ]   web3 (v3) keyfile
 *  [ 'ethersale', undefined ]   Ethersale keyfile
 *                        null     invalid keyfile
 */
```

Ini mendokumentasikan **versi 3** dari Definisi Penyimpanan Rahasia Web3.

## Definisi {#definition}

Pengodean dan pendekodean file yang sebenarnya sebagian besar tetap tidak berubah dari versi 1, kecuali bahwa algoritma kripto tidak lagi ditetapkan ke AES-128-CBC (AES-128-CTR sekarang menjadi persyaratan minimal). Sebagian besar arti/algoritma mirip dengan versi 1, kecuali `mac`, yang diberikan sebagai SHA3 (keccak-256) dari penggabungan 16 byte kedua paling kiri dari kunci turunan bersama dengan `ciphertext` lengkap.

File kunci rahasia disimpan langsung di `~/.web3/keystore` (untuk sistem mirip Unix) dan `~/AppData/Web3/keystore` (untuk Windows). File-file tersebut dapat dinamai apa saja, tetapi konvensi yang baik adalah `<uuid>.json`, di mana `<uuid>` adalah UUID 128-bit yang diberikan ke kunci rahasia (proksi yang menjaga privasi untuk alamat kunci rahasia).

Semua file tersebut memiliki kata sandi terkait. Untuk mendapatkan kunci rahasia file `.json` tertentu, pertama-tama dapatkan kunci enkripsi file; ini dilakukan dengan mengambil kata sandi file dan meneruskannya melalui fungsi turunan kunci seperti yang dijelaskan oleh kunci `kdf`. Parameter statis dan dinamis yang bergantung pada KDF untuk fungsi KDF dijelaskan dalam kunci `kdfparams`.

PBKDF2 harus didukung oleh semua implementasi yang memenuhi standar minimal, yang dilambangkan dengan:

- `kdf`: `pbkdf2`

Untuk PBKDF2, kdfparams mencakup:

- `prf`: Harus `hmac-sha256` (dapat diperluas di masa mendatang);
- `c`: jumlah iterasi;
- `salt`: salt yang diteruskan ke PBKDF;
- `dklen`: panjang untuk kunci turunan. Harus >= 32.

Setelah kunci file diturunkan, kunci tersebut harus diverifikasi melalui turunan MAC. MAC harus dihitung sebagai hash SHA3 (keccak-256) dari array byte yang dibentuk sebagai penggabungan 16 byte kedua paling kiri dari kunci turunan dengan konten kunci `ciphertext`, yaitu:

```js
KECCAK(DK[16..31] ++ <ciphertext>)
```

(di mana `++` adalah operator penggabungan)

Nilai ini harus dibandingkan dengan konten kunci `mac`; jika berbeda, kata sandi alternatif harus diminta (atau operasi dibatalkan).

Setelah kunci file diverifikasi, teks sandi (kunci `ciphertext` dalam file) dapat didekripsi menggunakan algoritma enkripsi simetris yang ditentukan oleh kunci `cipher` dan diparameterisasi melalui kunci `cipherparams`. Jika ukuran kunci turunan dan ukuran kunci algoritma tidak cocok, byte paling kanan yang diisi nol dari kunci turunan harus digunakan sebagai kunci untuk algoritma.

Semua implementasi yang memenuhi standar minimal harus mendukung algoritma AES-128-CTR, yang dilambangkan dengan:

- `cipher: aes-128-ctr`

Sandi ini mengambil parameter berikut, yang diberikan sebagai kunci ke kunci cipherparams:

- `iv`: vektor inisialisasi 128-bit untuk sandi.

Kunci untuk sandi adalah 16 byte paling kiri dari kunci turunan, yaitu, `DK[0..15]`

Pembuatan/enkripsi kunci rahasia pada dasarnya harus merupakan kebalikan dari instruksi ini. Pastikan `uuid`, `salt`, dan `iv` benar-benar acak.

Selain bidang `version`, yang harus bertindak sebagai pengidentifikasi "keras" dari versi, implementasi juga dapat menggunakan `minorversion` untuk melacak perubahan yang lebih kecil dan tidak merusak pada format.

## Vektor Uji {#test-vectors}

Detail:

- `Alamat`: `008aeeda4d805471df9b2a5b0f38a0c3bcba786b`
- `ICAP`: `XE542A5PZHH8PYIZUBEJEO0MFWRAPPIL67`
- `UUID`: `3198bc9c-6672-5ab3-d9954942343ae5b6`
- `Kata Sandi`: `testpassword`
- `Rahasia`: `7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d`

### PBKDF2-SHA-256 {#PBKDF2-SHA-256}

Vektor uji menggunakan `AES-128-CTR` dan `PBKDF2-SHA-256`:

Konten file dari `~/.web3/keystore/3198bc9c-6672-5ab3-d9954942343ae5b6.json`:

```json
{
  "crypto": {
    "cipher": "aes-128-ctr",
    "cipherparams": {
      "iv": "6087dab2f9fdbbfaddc31a909735c1e6"
    },
    "ciphertext": "5318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46",
    "kdf": "pbkdf2",
    "kdfparams": {
      "c": 262144,
      "dklen": 32,
      "prf": "hmac-sha256",
      "salt": "ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd"
    },
    "mac": "517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2"
  },
  "id": "3198bc9c-6672-5ab3-d995-4942343ae5b6",
  "version": 3
}
```

**Perantara**:

`Kunci turunan`: `f06d69cdc7da0faffb1008270bca38f5e31891a3a773950e6d0fea48a7188551`
`Badan MAC`: `e31891a3a773950e6d0fea48a71885515318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46`
`MAC`: `517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2`
`Kunci sandi`: `f06d69cdc7da0faffb1008270bca38f5`

### Scrypt {#scrypt}

Vektor uji menggunakan AES-128-CTR dan Scrypt:

```json
{
  "crypto": {
    "cipher": "aes-128-ctr",
    "cipherparams": {
      "iv": "740770fce12ce862af21264dab25f1da"
    },
    "ciphertext": "dd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2",
    "kdf": "scrypt",
    "kdfparams": {
      "dklen": 32,
      "n": 262144,
      "p": 1,
      "r": 8,
      "salt": "25710c2ccd7c610b24d068af83b959b7a0e5f40641f0c82daeb1345766191034"
    },
    "mac": "337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c"
  },
  "id": "3198bc9c-6672-5ab3-d995-4942343ae5b6",
  "version": 3
}
```

**Perantara**:

`Kunci turunan`: `7446f59ecc301d2d79bc3302650d8a5cedc185ccbb4bf3ca1ebd2c163eaa6c2d`
`Badan MAC`: `edc185ccbb4bf3ca1ebd2c163eaa6c2ddd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2`
`MAC`: `337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c`
`Kunci sandi`: `7446f59ecc301d2d79bc3302650d8a5c`

## Perubahan dari Versi 1 {#alterations-from-v2}

Versi ini memperbaiki beberapa ketidakkonsistenan dengan versi 1 yang dipublikasikan [di sini](https://github.com/ethereum/homestead-guide/blob/master/old-docs-for-reference/go-ethereum-wiki.rst/Passphrase-protected-key-store-spec.rst). Secara singkat ini adalah:

- Penggunaan huruf kapital tidak dapat dibenarkan dan tidak konsisten (scrypt huruf kecil, Kdf huruf campuran, MAC huruf besar).
- Alamat tidak diperlukan dan membahayakan privasi.
- `Salt` secara intrinsik merupakan parameter dari fungsi turunan kunci dan layak untuk dikaitkan dengannya, bukan dengan kripto secara umum.
- _SaltLen_ tidak diperlukan (cukup turunkan dari Salt).
- Fungsi turunan kunci diberikan, namun algoritma kripto ditentukan secara kaku.
- `Version` secara intrinsik bersifat numerik namun berupa string (pembuatan versi terstruktur akan dimungkinkan dengan string, tetapi dapat dianggap di luar cakupan untuk format file konfigurasi yang jarang berubah).
- `KDF` dan `cipher` secara nosional adalah konsep saudara namun diatur secara berbeda.
- `MAC` dihitung melalui sepotong data yang agnostik terhadap spasi putih(!)

Perubahan telah dilakukan pada format untuk memberikan file berikut, yang secara fungsional setara dengan contoh yang diberikan pada halaman yang ditautkan sebelumnya:

```json
{
  "crypto": {
    "cipher": "aes-128-cbc",
    "ciphertext": "07533e172414bfa50e99dba4a0ce603f654ebfa1ff46277c3e0c577fdc87f6bb4e4fe16c5a94ce6ce14cfa069821ef9b",
    "cipherparams": {
      "iv": "16d67ba0ce5a339ff2f07951253e6ba8"
    },
    "kdf": "scrypt",
    "kdfparams": {
      "dklen": 32,
      "n": 262144,
      "p": 1,
      "r": 8,
      "salt": "06870e5e6a24e183a5c807bd1c43afd86d573f7db303ff4853d135cd0fd3fe91"
    },
    "mac": "8ccded24da2e99a11d48cda146f9cc8213eb423e2ea0d8427f41c3be414424dd",
    "version": 1
  },
  "id": "0498f19a-59db-4d54-ac95-33901b4f1870",
  "version": 2
}
```

## Perubahan dari Versi 2 {#alterations-from-v2}

Versi 2 adalah implementasi C++ awal dengan sejumlah bug. Semua hal penting tetap tidak berubah darinya.