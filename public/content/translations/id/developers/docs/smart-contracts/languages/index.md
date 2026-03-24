---
title: Bahasa kontrak pintar
description: "Gambaran umum dan perbandingan dua bahasa kontrak pintar utama – Solidity dan Vyper."
lang: id
---

Aspek yang luar biasa tentang [Ethereum](/) adalah bahwa kontrak pintar dapat diprogram menggunakan bahasa yang relatif ramah pengembang. Jika Anda berpengalaman dengan Python atau [bahasa kurung kurawal](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages) apa pun, Anda dapat menemukan bahasa dengan sintaksis yang familier.

Dua bahasa yang paling aktif dan dipelihara adalah:

- Solidity
- Vyper

Remix IDE menyediakan lingkungan pengembangan yang komprehensif untuk membuat dan menguji kontrak di Solidity dan Vyper. [Coba Remix IDE di dalam peramban](https://remix.ethereum.org) untuk mulai membuat kode.

Pengembang yang lebih berpengalaman mungkin juga ingin menggunakan Yul, bahasa perantara untuk [Mesin Virtual Ethereum](/developers/docs/evm/), atau Yul+, sebuah ekstensi untuk Yul.

Jika Anda penasaran dan ingin membantu menguji bahasa baru yang masih dalam tahap pengembangan berat, Anda dapat bereksperimen dengan Fe, bahasa kontrak pintar baru yang saat ini masih dalam tahap awal.

## Prasyarat {#prerequisites}

Pengetahuan sebelumnya tentang bahasa pemrograman, terutama JavaScript atau Python, dapat membantu Anda memahami perbedaan dalam bahasa kontrak pintar. Kami juga menyarankan Anda memahami kontrak pintar sebagai sebuah konsep sebelum menggali terlalu dalam tentang perbandingan bahasa. [Pengantar kontrak pintar](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Bahasa tingkat tinggi berorientasi objek untuk mengimplementasikan kontrak pintar.
- Bahasa kurung kurawal yang paling banyak dipengaruhi oleh C++.
- Diketik secara statis (tipe variabel diketahui pada saat kompilasi).
- Mendukung:
  - Pewarisan (Anda dapat memperluas kontrak lain).
  - Pustaka (Anda dapat membuat kode yang dapat digunakan kembali yang dapat Anda panggil dari kontrak yang berbeda – seperti fungsi statis di kelas statis dalam bahasa pemrograman berorientasi objek lainnya).
  - Tipe kompleks yang ditentukan pengguna.

### Tautan penting {#important-links}

- [Dokumentasi](https://docs.soliditylang.org/en/latest/)
- [Portal Bahasa Solidity](https://soliditylang.org/)
- [Solidity by Example](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Ruang Obrolan Gitter Solidity](https://gitter.im/ethereum/solidity) yang dijembatani ke [Ruang Obrolan Matrix Solidity](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [Lembar Sontekan](https://reference.auditless.com/cheatsheet)
- [Blog Solidity](https://blog.soliditylang.org/)
- [Twitter Solidity](https://twitter.com/solidity_lang)

### Contoh kontrak {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0 // SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // The keyword "public" makes variables // Kata kunci "public" membuat variabel
    // accessible from other contracts // dapat diakses dari kontrak lain
    address public minter;
    mapping (address => uint) public balances;

    // Events allow clients to react to specific // Event memungkinkan klien bereaksi terhadap
    // contract changes you declare // perubahan kontrak tertentu yang Anda deklarasikan
    event Sent(address from, address to, uint amount);

    // Constructor code is only run when the contract // Kode konstruktor hanya dijalankan ketika kontrak
    // is created // dibuat
    constructor() {
        minter = msg.sender;
    }

    // Sends an amount of newly created coins to an address // Mengirim sejumlah koin yang baru dibuat ke sebuah alamat
    // Can only be called by the contract creator // Hanya dapat dipanggil oleh pembuat kontrak
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Sends an amount of existing coins // Mengirim sejumlah koin yang ada
    // from any caller to an address // dari pemanggil mana pun ke sebuah alamat
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Contoh ini akan memberi Anda gambaran tentang seperti apa sintaksis kontrak Solidity. Untuk deskripsi yang lebih mendetail tentang fungsi dan variabel, [lihat dokumentasinya](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Bahasa pemrograman Pythonic
- Pengetikan yang kuat
- Kode kompilator yang kecil dan mudah dipahami
- Pembuatan bytecode yang efisien
- Sengaja memiliki lebih sedikit fitur daripada Solidity dengan tujuan membuat kontrak lebih aman dan lebih mudah diaudit. Vyper tidak mendukung:
  - Modifier
  - Pewarisan
  - Inline assembly
  - Function overloading
  - Operator overloading
  - Pemanggilan rekursif
  - Perulangan tak terbatas
  - Titik tetap biner

Untuk informasi lebih lanjut, [baca rasional Vyper](https://vyper.readthedocs.io/en/latest/index.html).

### Tautan penting {#important-links-1}

- [Dokumentasi](https://vyper.readthedocs.io)
- [Vyper by Example](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [Lebih Banyak Vyper by Example](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Obrolan Discord komunitas Vyper](https://discord.gg/SdvKC79cJk)
- [Lembar Sontekan](https://reference.auditless.com/cheatsheet)
- [Kerangka kerja dan alat pengembangan kontrak pintar untuk Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk - belajar mengamankan dan meretas kontrak pintar Vyper](https://github.com/SupremacyTeam/VyperPunk)
- [Vyper Hub untuk pengembangan](https://github.com/zcor/vyper-dev)
- [Contoh kontrak pintar Vyper greatest hits](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Sumber daya kurasi Awesome Vyper](https://github.com/spadebuilders/awesome-vyper)

### Contoh {#example}

```python
# Open Auction # Lelang Terbuka

# Auction params # Parameter lelang
# Beneficiary receives money from the highest bidder # Penerima manfaat menerima uang dari penawar tertinggi
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Current state of auction # Status lelang saat ini
highestBidder: public(address)
highestBid: public(uint256)

# Set to true at the end, disallows any change # Ditetapkan menjadi true pada akhirnya, tidak mengizinkan perubahan apa pun
ended: public(bool)

# Keep track of refunded bids so we can follow the withdraw pattern # Melacak penawaran yang dikembalikan sehingga kita dapat mengikuti pola penarikan
pendingReturns: public(HashMap[address, uint256])

# Create a simple auction with `_bidding_time` # Buat lelang sederhana dengan `_bidding_time`
# seconds bidding time on behalf of the # detik waktu penawaran atas nama
# beneficiary address `_beneficiary`. # alamat penerima manfaat `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Bid on the auction with the value sent # Menawar pada lelang dengan nilai yang dikirimkan
# together with this transaction. # bersama dengan transaksi ini.
# The value will only be refunded if the # Nilai hanya akan dikembalikan jika
# auction is not won. # lelang tidak dimenangkan.
@external
@payable
def bid():
    # Check if bidding period is over. # Periksa apakah periode penawaran telah berakhir.
    assert block.timestamp < self.auctionEnd
    # Check if bid is high enough # Periksa apakah penawaran cukup tinggi
    assert msg.value > self.highestBid
    # Track the refund for the previous high bidder # Lacak pengembalian dana untuk penawar tertinggi sebelumnya
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Track new high bid # Lacak penawaran tertinggi baru
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Withdraw a previously refunded bid. The withdraw pattern is # Tarik penawaran yang sebelumnya dikembalikan. Pola penarikan
# used here to avoid a security issue. If refunds were directly # digunakan di sini untuk menghindari masalah keamanan. Jika pengembalian dana langsung
# sent as part of bid(), a malicious bidding contract could block # dikirim sebagai bagian dari bid(), kontrak penawaran berbahaya dapat memblokir
# those refunds and thus block new higher bids from coming in. # pengembalian dana tersebut dan dengan demikian memblokir penawaran baru yang lebih tinggi untuk masuk.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# End the auction and send the highest bid # Akhiri lelang dan kirim penawaran tertinggi
# to the beneficiary. # ke penerima manfaat.
@external
def endAuction():
    # It is a good guideline to structure functions that interact # Ini adalah pedoman yang baik untuk menyusun fungsi yang berinteraksi
    # with other contracts (i.e., they call functions or send ether) # dengan kontrak lain (yaitu, mereka memanggil fungsi atau mengirim ether)
    # into three phases: # ke dalam tiga fase:
    # 1. checking conditions # 1. memeriksa kondisi
    # 2. performing actions (potentially changing conditions) # 2. melakukan tindakan (berpotensi mengubah kondisi)
    # 3. interacting with other contracts # 3. berinteraksi dengan kontrak lain
    # If these phases are mixed up, the other contract could call # Jika fase-fase ini dicampuradukkan, kontrak lain dapat memanggil
    # back into the current contract and modify the state or cause # kembali ke kontrak saat ini dan memodifikasi status atau menyebabkan
    # effects (ether payout) to be performed multiple times. # efek (pembayaran ether) dilakukan berkali-kali.
    # If functions called internally include interaction with external # Jika fungsi yang dipanggil secara internal mencakup interaksi dengan
    # contracts, they also have to be considered interaction with # kontrak eksternal, mereka juga harus dianggap sebagai interaksi dengan
    # external contracts. # kontrak eksternal.

    # 1. Conditions # 1. Kondisi
    # Check if auction endtime has been reached # Periksa apakah waktu akhir lelang telah tercapai
    assert block.timestamp >= self.auctionEnd
    # Check if this function has already been called # Periksa apakah fungsi ini sudah dipanggil
    assert not self.ended

    # 2. Effects # 2. Efek
    self.ended = True

    # 3. Interaction # 3. Interaksi
    send(self.beneficiary, self.highestBid)
```

Contoh ini akan memberi Anda gambaran tentang seperti apa sintaksis kontrak Vyper. Untuk deskripsi yang lebih mendetail tentang fungsi dan variabel, [lihat dokumentasinya](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul dan Yul+ {#yul}

Jika Anda baru mengenal Ethereum dan belum pernah melakukan pengodean dengan bahasa kontrak pintar, kami menyarankan Anda untuk memulai dengan Solidity atau Vyper. Pelajari Yul atau Yul+ hanya setelah Anda familier dengan praktik terbaik keamanan kontrak pintar dan spesifikasi bekerja dengan EVM.

**Yul**

- Bahasa perantara untuk Ethereum.
- Mendukung [EVM](/developers/docs/evm) dan [Ewasm](https://github.com/ewasm), WebAssembly dengan cita rasa Ethereum, dan dirancang untuk menjadi penyebut umum yang dapat digunakan dari kedua platform tersebut.
- Target yang baik untuk tahap pengoptimalan tingkat tinggi yang dapat menguntungkan platform EVM dan Ewasm secara setara.

**Yul+**

- Ekstensi tingkat rendah dan sangat efisien untuk Yul.
- Awalnya dirancang untuk kontrak [optimistic rollup](/developers/docs/scaling/optimistic-rollups/).
- Yul+ dapat dilihat sebagai proposal peningkatan eksperimental untuk Yul, yang menambahkan fitur-fitur baru ke dalamnya.

### Tautan penting {#important-links-2}

- [Dokumentasi Yul](https://docs.soliditylang.org/en/latest/yul.html)
- [Dokumentasi Yul+](https://github.com/fuellabs/yulp)
- [Pos Pengantar Yul+](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Contoh kontrak {#example-contract-2}

Contoh sederhana berikut mengimplementasikan fungsi pangkat. Ini dapat dikompilasi menggunakan `solc --strict-assembly --bin input.yul`. Contoh ini harus disimpan dalam file input.yul.

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

Jika Anda sudah sangat berpengalaman dengan kontrak pintar, implementasi ERC20 penuh di Yul dapat ditemukan [di sini](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Fe {#fe}

- Bahasa yang diketik secara statis untuk Mesin Virtual Ethereum (EVM).
- Terinspirasi oleh Python dan Rust.
- Bertujuan agar mudah dipelajari -- bahkan untuk pengembang yang baru mengenal ekosistem Ethereum.
- Pengembangan Fe masih dalam tahap awal, bahasa ini merilis versi alfanya pada Januari 2021.

### Tautan penting {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Pengumuman Fe](https://blog.fe-lang.org/posts/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Peta Jalan Fe 2021](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Obrolan Discord Fe](https://discord.com/invite/ywpkAXFjZH)
- [Twitter Fe](https://twitter.com/official_fe)

### Contoh kontrak {#example-contract-3}

Berikut ini adalah kontrak sederhana yang diimplementasikan di Fe.

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

Sama seperti bahasa pemrograman lainnya, ini sebagian besar tentang memilih alat yang tepat untuk pekerjaan yang tepat serta preferensi pribadi.

Berikut adalah beberapa hal yang perlu dipertimbangkan jika Anda belum mencoba salah satu bahasa tersebut:

### Apa yang hebat dari Solidity? {#solidity-advantages}

- Jika Anda seorang pemula, ada banyak tutorial dan alat pembelajaran di luar sana. Lihat selengkapnya tentang hal itu di bagian [Belajar dengan Membuat Kode](/developers/learning-tools/).
- Tersedia perkakas pengembang yang baik.
- Solidity memiliki komunitas pengembang yang besar, yang berarti Anda kemungkinan besar akan menemukan jawaban atas pertanyaan Anda dengan cukup cepat.

### Apa yang hebat dari Vyper? {#vyper-advatages}

- Cara yang bagus untuk memulai bagi pengembang Python yang ingin menulis kontrak pintar.
- Vyper memiliki jumlah fitur yang lebih sedikit yang membuatnya bagus untuk pembuatan prototipe ide secara cepat.
- Vyper bertujuan agar mudah diaudit dan dapat dibaca manusia secara maksimal.

### Apa yang hebat dari Yul dan Yul+? {#yul-advantages}

- Bahasa tingkat rendah yang sederhana dan fungsional.
- Memungkinkan untuk lebih dekat dengan EVM mentah, yang dapat membantu mengoptimalkan penggunaan gas dari kontrak Anda.

## Perbandingan bahasa {#language-comparisons}

Untuk perbandingan sintaksis dasar, siklus hidup kontrak, antarmuka, operator, struktur data, fungsi, alur kontrol, dan lainnya, lihat [lembar sontekan oleh Auditless](https://reference.auditless.com/cheatsheet/) ini.

## Bacaan lebih lanjut {#further-reading}

- [Pustaka Kontrak Solidity oleh OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity by Example](https://solidity-by-example.org)