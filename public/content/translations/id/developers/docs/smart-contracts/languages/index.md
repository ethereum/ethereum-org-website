---
title: Bahasa kontrak pintar
description: "Gambaran umum dan perbandingan dua bahasa kontrak pintar utama – Solidity dan Vyper."
lang: id
---

Aspek keren tentang Ethereum adalah kontrak pintar bisa diprogram menggunakan bahasa yang ramah bagi pengembang. Jika Anda berpengalaman dengan Python atau [bahasa kurung kurawal](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages) apa pun, Anda dapat menemukan bahasa dengan sintaksis yang familier.

Dua bahasa yang paling aktif dan dipertahankan adalah:

- Solidity
- Vyper

Remix IDE menyediakan lingkungan pengembangan lengkap untuk membuat dan menguji kontrak baik dalam Solidity maupun Vyper. [Coba Remix IDE dalam browser](https://remix.ethereum.org) untuk memulai pengodean.

Pengembang yang lebih berpengalaman juga mungkin ingin menggunakan Yul, sebuah bahasa perantara untuk [Mesin Virtual Ethereum](/developers/docs/evm/), atau Yul+, sebuah ekstensi dari Yul.

Jika Anda merasa ingin tahu dan senang membantu menguji bahasa baru yang sedang dalam pengembangan intensif, Anda dapat bereksperimen dengan Fe, sebuah bahasa kontrak pintar yang sedang populer yang saat ini masih dalam tahapan awal.

## Persyaratan {#prerequisites}

Pengetahuan dasar bahasa pemrograman, khususnya JavaScript atau Pyhton, bisa menolong Anda mengerti perbedaan dalam bahasa kontrak pintar. Kami juga menyarankan Anda memahami konsep kontrak pintar sebelum menjelajah terlalu dalam ke perbandingan bahasa. [Pengantar kontrak pintar](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Bahasa tingkat tinggi yang berorientasi pada objek untuk mengimplementasikan kontrak pintar.
- Bahasa kurung kurawal yang paling dipengaruhi oleh C++.
- Menggunakan static typing (tipe dari satu variabel dikenal pada waktu pengompilasian).
- Dukungan:
  - Warisan (Anda bisa memperluas kontrak lain).
  - Pustaka (Anda bisa membuat kode yang dapat digunakan kembali yang bisa Anda panggil dari kontrak berbeda – seperti fungsi statis dalam kelas statis di bahasa pemrograman berorientasi objek lainnya).
  - Tipe kompleks yang ditentukan pengguna.

### Tautan penting {#important-links}

- [Dokumentasi](https://docs.soliditylang.org/en/latest/)
- [Portal Bahasa Solidity](https://soliditylang.org/)
- [Solidity by Example](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Ruang Obrolan Gitter Solidity](https://gitter.im/ethereum/solidity) dijembatani ke [Ruang Obrolan Matrix Solidity](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [Lembar Contekan](https://reference.auditless.com/cheatsheet)
- [Blog Solidity](https://blog.soliditylang.org/)
- [Twitter Solidity](https://twitter.com/solidity_lang)

### Contoh kontrak {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // Kata kunci "public" membuat variabel
    // dapat diakses dari kontrak lain
    address public minter;
    mapping (address => uint) public balances;

    // Event memungkinkan klien untuk bereaksi terhadap
    // perubahan kontrak spesifik yang Anda deklarasikan
    event Sent(address from, address to, uint amount);

    // Kode konstruktor hanya dijalankan ketika kontrak
    // dibuat
    constructor() {
        minter = msg.sender;
    }

    // Mengirim sejumlah koin yang baru dibuat ke sebuah alamat
    // Hanya dapat dipanggil oleh pembuat kontrak
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Mengirim sejumlah koin yang sudah ada
    // dari pemanggil mana pun ke sebuah alamat
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Saldo tidak mencukupi.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Contoh ini seharusnya memberi Anda pemahaman seperti apa sintaksis kontrak Solidity. Untuk deskripsi fungsi dan variabel yang lebih detail, [lihat dokumentasinya](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Bahasa pemrograman Python
- Strong typing
- Kode pengompilasi berukuran kecil yang dapat dimengerti
- Pembuatan kode bita yang efisien
- Disengaja dengan fitur lebih sedikit daripada Solidity yang bertujuan agar kontrak menjadi lebih aman dan lebih mudah untuk diaudit. Vyper tidak mendukung:
  - Pengubah
  - Warisan
  - Kode assembly dalam baris
  - Beban berlebih pada fungsi
  - Beban berlebih pada operator
  - Pemanggilan berulang
  - Perulangan dengan panjang tak terbatas
  - Titik tetap biner

Untuk informasi lebih lanjut, [baca alasan Vyper](https://vyper.readthedocs.io/en/latest/index.html).

### Tautan penting {#important-links-1}

- [Dokumentasi](https://vyper.readthedocs.io)
- [Vyper by Example](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [More Vyper by Example](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Obrolan Discord komunitas Vyper](https://discord.gg/SdvKC79cJk)
- [Lembar Contekan](https://reference.auditless.com/cheatsheet)
- [Kerangka kerja pengembangan dan perangkat kontrak pintar untuk Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk - belajar mengamankan dan meretas kontrak pintar Vyper](https://github.com/SupremacyTeam/VyperPunk)
- [Hub Vyper untuk pengembangan](https://github.com/zcor/vyper-dev)
- [Contoh kontrak pintar Vyper greatest hits](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Sumber daya terkurasi Awesome Vyper](https://github.com/spadebuilders/awesome-vyper)

### Contoh {#example}

```python
# Lelang Terbuka

# Parameter lelang

# Penerima manfaat menerima uang dari penawar tertinggi

beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Status lelang saat ini

highestBidder: public(address)
highestBid: public(uint256)

# Diatur ke benar di akhir, tidak mengizinkan perubahan apa pun

ended: public(bool)

# Melacak tawaran yang dikembalikan dananya agar kita dapat mengikuti pola penarikan

pendingReturns: public(HashMap[address, uint256])

# Membuat lelang sederhana dengan `_bidding_time`

# detik waktu penawaran atas nama

# alamat penerima manfaat `_beneficiary`.

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Menawar pada lelang dengan nilai yang dikirim

# bersama dengan transaksi ini.

# Nilai hanya akan dikembalikan dananya jika

# lelang tidak dimenangkan.

@external
@payable
def bid():
    # Periksa apakah periode penawaran sudah berakhir.
    assert block.timestamp < self.auctionEnd
    # Periksa apakah tawaran cukup tinggi
    assert msg.value > self.highestBid
    # Lacak pengembalian dana untuk penawar tertinggi sebelumnya
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Lacak tawaran tertinggi baru
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Tarik tawaran yang telah dikembalikan dananya sebelumnya. Pola penarikan

# digunakan di sini untuk menghindari masalah keamanan. Jika pengembalian dana langsung

# dikirim sebagai bagian dari bid(), kontrak penawaran jahat dapat memblokir

# pengembalian dana tersebut dan dengan demikian memblokir tawaran baru yang lebih tinggi untuk masuk.

@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# Akhiri lelang dan kirim tawaran tertinggi

# ke penerima manfaat.

@external
def endAuction():
    # Ini adalah pedoman yang baik untuk menyusun fungsi yang berinteraksi
    # dengan kontrak lain (yaitu, memanggil fungsi atau mengirim eter)
    # ke dalam tiga fase:
    # 1. memeriksa kondisi
    # 2. melakukan tindakan (berpotensi mengubah kondisi)
    # 3. berinteraksi dengan kontrak lain
    # Jika fase-fase ini tercampur, kontrak lain dapat memanggil
    # kembali ke kontrak saat ini dan memodifikasi status atau menyebabkan
    # efek (pembayaran eter) dilakukan beberapa kali.
    # Jika fungsi yang dipanggil secara internal mencakup interaksi dengan kontrak eksternal,
    # mereka juga harus dianggap sebagai interaksi dengan
    # kontrak eksternal.

    # 1. Kondisi
    # Periksa apakah waktu akhir lelang telah tercapai
    assert block.timestamp >= self.auctionEnd
    # Periksa apakah fungsi ini sudah pernah dipanggil
    assert not self.ended

    # 2. Efek
    self.ended = True

    # 3. Interaksi
    send(self.beneficiary, self.highestBid)
```

Contoh ini seharusnya memberi Anda pemahaman seperti apa sintaksis kontrak Vyper. Untuk deskripsi fungsi dan variabel yang lebih detail, [lihat dokumentasinya](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul dan Yul+ {#yul}

Jika Anda baru mengenal Ethereum dan belum pernah melakukan pengodean apa pun dengan bahasa kontrak pintar, kami menyarankan mulai menggunakan Solidity atau Vyper. Hanya lihat Yul atau Yul+ setelah Anda terbiasa dengan praktik terbaik keamanan kontrak pintar dan proses kerja spesifik EVM.

**Yul**

- Bahasa tingkat menengah untuk Ethereum.
- Mendukung [EVM](/developers/docs/evm) dan [Ewasm](https://github.com/ewasm), sebuah WebAssembly bercorak Ethereum, dan dirancang untuk menjadi landasan umum yang dapat digunakan untuk kedua platform.
- Target baik untuk fase optimisasi tingkat tinggi yang secara setara dapat menguntungkan baik platform EVM dan Ewasm.

**Yul+**

- Ekstensi level rendah yang sangat efisien untuk Yul.
- Awalnya dirancang untuk kontrak [optimistic rollup](/developers/docs/scaling/optimistic-rollups/).
- Yul+ bisa dianggap sebagai proposal peningkatan eksperimental untuk Yul, yang menambahkan fitur baru ke dalamnya.

### Tautan penting {#important-links-2}

- [Dokumentasi Yul](https://docs.soliditylang.org/en/latest/yul.html)
- [Dokumentasi Yul+](https://github.com/fuellabs/yulp)
- [Postingan Pengenalan Yul+](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Contoh kontrak {#example-contract-2}

Contoh sederhana berikut ini menerapkan fungsi daya. Ini dapat dikompilasi menggunakan `solc --strict-assembly --bin input.yul`. Contoh ini harus
disimpan dalam file input.yul.

```
{
    function power(base, exponent) -> result
    {
        switch exponent
        case 0 { result := 1 }
        case 1 { result := base }
        default
        {
            result := power(mul(base, base), div(exponent, 2))
            if mod(exponent, 2) { result := mul(base, result) }
        }
    }
    let res := power(calldataload(0), calldataload(32))
    mstore(0, res)
    return(0, 32)
}
```

Jika Anda sudah sangat berpengalaman dengan kontrak pintar, implementasi ERC20 lengkap dalam Yul dapat ditemukan [di sini](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Fe {#fe}

- Bahasa static typing untuk Mesin Virtual Ethereum (EVM).
- Terinspirasi oleh Python dan Rust.
- Bertujuan agar mudah dipelajari -- bahkan bagi pengembang yang baru mengenal ekosistem Ethereum.
- Pengembangan Fe masih dalam tahap awal, bahasa ini memiliki rilis alfa pada Januari 2021.

### Tautan penting {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Pengumuman Fe](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Peta Perjalanan Fe 2021](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Obrolan Discord Fe](https://discord.com/invite/ywpkAXFjZH)
- [Twitter Fe](https://twitter.com/official_fe)

### Contoh kontrak {#example-contract-3}

Berikut ini adalah kontrak sederhana yang diimplementasikan dalam Fe.

```
type BookMsg = bytes[100]

contract GuestBook:
    pub guest_book: map<address, BookMsg>

    event Signed:
        book_msg: BookMsg

    pub def sign(book_msg: BookMsg):
        self.guest_book[msg.sender] = book_msg

        emit Signed(book_msg=book_msg)

    pub def get_msg(addr: address) -> BookMsg:
        return self.guest_book[addr].to_mem()

```

## Cara memilih {#how-to-choose}

Seperti bahasa pemrograman lainnya, pemilihannya kebanyakan tentang memilih peralatan yang tepat untuk pekerjaan yang sesuai maupun preferensi pribadi.

Berikut adalah beberapa hal yang perlu dipertimbangkan jika Anda belum mencoba bahasa mana pun:

### Apa yang hebat dari Solidity? {#solidity-advantages}

- Jika Anda seorang pemula, ada banyak tutorial dan peralatan belajar di luar sana. Lihat selengkapnya tentang itu di bagian [Belajar dengan Pengodean](/developers/learning-tools/).
- Peralatan pengembang yang baik disediakan.
- Solidity memiliki satu komunitas pengembang besar, yang berarti Anda sangat mungkin menemukan jawaban dari pertanyaan Anda dengan cukup cepat.

### Apa yang hebat dari Vyper? {#vyper-advatages}

- Cara yang sangat bagus untuk memulai bagi pengembang Python yang ingin menulis kontrak pintar.
- Vyper punya sejumlah fitur lebih kecil yang membuatnya sangat cocok untuk pembuatan prototipe ide dengan cepat.
- Vyper bertujuan untuk memudahkan pengauditan dan sangat ramah pengguna.

### Apa yang hebat dari Yul dan Yul+? {#yul-advantages}

- Bahasa tingkat rendah yang sederhana dan fungsional.
- Memungkinkan agar lebih dekat dengan EVM mentah, yang bisa membantu mengoptimalkan penggunaan gas dari kontrak Anda.

## Perbandingan bahasa {#language-comparisons}

Untuk perbandingan sintaksis dasar, siklus hidup kontrak, antarmuka, operator, struktur data, fungsi, alur kontrol, dan lainnya, lihat [lembar contekan oleh Auditless](https://reference.auditless.com/cheatsheet/) ini

## Bacaan lebih lanjut {#further-reading}

- [Pustaka Kontrak Solidity oleh OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity by Example](https://solidity-by-example.org)
