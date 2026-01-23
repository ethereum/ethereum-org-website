---
title: Definisi penyimpanan rahasia Web3
description: Definisi formal untuk penyimpanan rahasia web3
lang: id
sidebarDepth: 2
---

Untuk membuat aplikasi Anda bisa berjalan di Ethereum, Anda dapat menggunakan objek web3 yang disediakan oleh pustaka web3.js. Di balik layar, objek ini berkomunikasi dengan node lokal melalui panggilan RPC. [web3](https://github.com/ethereum/web3.js/) bekerja dengan node Ethereum mana pun yang mengekspos lapisan RPC.

`web3` berisi objek `eth` - web3.eth.

```js
var fs = require("fs")
var recognizer = require("ethereum-keyfile-recognizer")

fs.readFile("keyfile.json", (err, data) => {
  var json = JSON.parse(data)
  var result = recognizer(json)
})

/** hasil
 *               [ 'web3', 3 ]   file kunci web3 (v3)
 *  [ 'ethersale', undefined ]   file kunci Ethersale
 *                        null     file kunci tidak valid
 */
```

Dokumen ini merupakan **versi 3** dari Definisi Penyimpanan Rahasia Web3.

## Definisi {#definition}

Proses encoding dan decoding file pada dasarnya tetap sama seperti versi 1, kecuali algoritma kripto tidak lagi tetap pada AES-128-CBC (AES-128-CTR sekarang menjadi persyaratan minimal). Sebagian besar makna/algoritma serupa dengan versi 1, kecuali `mac`, yang diberikan sebagai SHA3 (keccak-256) dari perangkaian 16 bita kedua dari kiri dari kunci turunan bersama dengan seluruh `ciphertext`.

File kunci rahasia disimpan secara langsung di `~/.web3/keystore` (untuk sistem mirip Unix) dan `~/AppData/Web3/keystore` (untuk Windows). Nama file bisa apa saja, tetapi konvensi yang baik adalah `<uuid>.json`, dengan `<uuid>` adalah UUID 128-bit yang diberikan ke kunci rahasia (proksi yang menjaga privasi untuk alamat kunci rahasia).

Semua file tersebut memiliki kata sandi terkait. Untuk menurunkan kunci rahasia dari file `.json` tertentu, pertama-tama turunkan kunci enkripsi file tersebut; ini dilakukan dengan mengambil kata sandi file dan memprosesnya melalui fungsi derivasi kunci seperti yang dijelaskan oleh kunci `kdf`. Parameter statis dan dinamis yang bergantung pada KDF untuk fungsi KDF dijelaskan dalam kunci `kdfparams`.

PBKDF2 harus didukung oleh semua implementasi yang minimal-kompatibel, ditunjukkan melalui:

- `kdf`: `pbkdf2`

Untuk PBKDF2, kdfparams termasuk:

- `prf`: Harus `hmac-sha256` (dapat diperpanjang di masa mendatang);
- `c`: jumlah iterasi;
- `salt`: salt yang diteruskan ke PBKDF;
- `dklen`: panjang untuk kunci turunan. Harus >= 32.

Setelah kunci file diturunkan, kunci tersebut harus diverifikasi dengan cara menurunkan MAC. MAC harus dihitung sebagai hash SHA3 (keccak-256) dari larik bita yang dibentuk sebagai perangkaian dari 16 bita kedua dari kiri dari kunci turunan dengan isi kunci `ciphertext`, yaitu:

```js
KECCAK(DK[16..31] ++ <ciphertext>)
```

(dengan `++` adalah operator penggabungan)

Nilai ini harus dibandingkan dengan isi kunci `mac`; jika berbeda, kata sandi alternatif harus diminta (atau operasi dibatalkan).

Setelah kunci file diverifikasi, teks sandi (kunci `ciphertext` dalam file) dapat didekripsi menggunakan algoritma enkripsi simetris yang ditentukan oleh kunci `cipher` dan diparameterkan melalui kunci `cipherparams`. Jika ukuran kunci yang diturunkan dan ukuran kunci algoritma tidak cocok, byte paling kanan dari derived key harus diisi nol dan digunakan sebagai kunci untuk algoritma tersebut.

Semua implementasi yang memenuhi standar minimal harus mendukung algoritma AES-128-CTR, yang ditunjukkan melalui:

- `cipher: aes-128-ctr`

Cipher ini menggunakan parameter berikut, yang diberikan sebagai kunci pada cipherparams:

- `iv`: Vektor inisialisasi 128-bit untuk sandi.

Kunci untuk cipher adalah 16 bita paling kiri dari kunci turunan, yaitu, `DK[0..15]`

Pembuatan/enkripsi kunci rahasia seharusnya pada dasarnya merupakan kebalikan dari instruksi-instruksi ini. Pastikan `uuid`, `salt` dan `iv` benar-benar acak.

Selain bidang `version`, yang seharusnya berfungsi sebagai pengidentifikasi "keras" versi, implementasi juga dapat menggunakan `minorversion` untuk melacak perubahan yang lebih kecil dan tidak merusak pada format.

## Vektor Uji {#test-vectors}

Detailnya:

- `Alamat`: `008aeeda4d805471df9b2a5b0f38a0c3bcba786b`
- `ICAP`: `XE542A5PZHH8PYIZUBEJEO0MFWRAPPIL67`
- `UUID`: `3198bc9c-6672-5ab3-d9954942343ae5b6`
- `Kata Sandi`: `testpassword`
- `Rahasia`: `7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d`

### PBKDF2-SHA-256 {#PBKDF2-SHA-256}

Vektor uji menggunakan `AES-128-CTR` dan `PBKDF2-SHA-256`:

Isi file dari `~/.web3/keystore/3198bc9c-6672-5ab3-d9954942343ae5b6.json`:

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

**Hasil Antara**:

`Kunci turunan`: `f06d69cdc7da0faffb1008270bca38f5e31891a3a773950e6d0fea48a7188551`
`Isi MAC`: `e31891a3a773950e6d0fea48a71885515318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46`
`MAC`: `517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2`
`Kunci cipher`: `f06d69cdc7da0faffb1008270bca38f5`

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

**Hasil Antara**:

`Kunci turunan`: `7446f59ecc301d2d79bc3302650d8a5cedc185ccbb4bf3ca1ebd2c163eaa6c2d`
`Isi MAC`: `edc185ccbb4bf3ca1ebd2c163eaa6c2ddd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2`
`MAC`: `337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c`
`Kunci cipher`: `7446f59ecc301d2d79bc3302650d8a5c`

## Perubahan dari Versi 1 {#alterations-from-v2}

Versi ini memperbaiki beberapa inkonsistensi dengan versi 1 yang diterbitkan [di sini](https://github.com/ethereum/homestead-guide/blob/master/old-docs-for-reference/go-ethereum-wiki.rst/Passphrase-protected-key-store-spec.rst). Singkatnya, ini adalah:

- Kapitalisasi tidak dapat dibenarkan dan tidak konsisten (scrypt huruf kecil, Kdf huruf besar, MAC huruf besar).
- Mengatasi hal yang tidak perlu dan mengorbankan privasi.
- `Salt` secara intrinsik adalah parameter dari fungsi derivasi kunci dan sebaiknya dikaitkan dengannya, bukan dengan kriptografi secara umum.
- _SaltLen_ tidak perlu (cukup dapatkan dari Salt).
- Fungsi derivasi kunci diberikan, namun algoritma kripto sulit ditentukan.
- `Version` secara intrinsik bersifat numerik, tetapi disimpan sebagai string (penomoran versi yang terstruktur mungkin bisa dilakukan dengan string, namun dapat dianggap di luar cakupan untuk format file konfigurasi yang jarang berubah).
- `KDF` dan `cipher` secara konseptual adalah konsep yang setara namun diatur secara berbeda.
- `MAC` dihitung melalui sepotong data yang agnostik terhadap spasi putih (!)

Perubahan telah dilakukan pada format sehingga menghasilkan file berikut, yang secara fungsional setara dengan contoh yang diberikan pada halaman yang sebelumnya ditautkan:

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
