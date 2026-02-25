---
title: Memahami Spesifikasi EVM dari Yellow Paper
description: Memahami bagian dari Yellow Paper, spesifikasi formal untuk Ethereum, yang menjelaskan Mesin Virtual Ethereum (EVM).
author: "qbzzt"
tags: [ "evm" ]
skill: intermediate
lang: id
published: 2022-05-15
---

[Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) adalah spesifikasi formal untuk Ethereum. Kecuali jika diubah oleh [proses EIP](/eips/), dokumen ini berisi deskripsi yang tepat tentang cara kerja semuanya. Dokumen ini ditulis sebagai makalah matematika, yang mencakup terminologi yang mungkin tidak lazim bagi para pemrogram. Dalam makalah ini Anda akan mempelajari cara membacanya, dan dengan demikian juga makalah matematika terkait lainnya.

## Yellow Paper yang Mana? {#which-yellow-paper}

Seperti hampir semua hal lain di Ethereum, Yellow Paper berevolusi dari waktu ke waktu. Agar dapat merujuk ke versi tertentu, saya mengunggah [versi saat ini pada saat penulisan](yellow-paper-berlin.pdf). Nomor bagian, halaman, dan persamaan yang saya gunakan akan merujuk pada versi tersebut. Sebaiknya buka dokumen ini di jendela yang berbeda saat membaca dokumen ini.

### Mengapa EVM? {#why-the-evm}

Yellow paper asli ditulis tepat di awal pengembangan Ethereum. Dokumen ini menjelaskan mekanisme konsensus berbasis bukti kerja asli yang awalnya digunakan untuk mengamankan jaringan. Namun, Ethereum menonaktifkan bukti kerja dan mulai menggunakan konsensus berbasis bukti taruhan pada bulan September 2022. Tutorial ini akan berfokus pada bagian-bagian yellow paper yang mendefinisikan Mesin Virtual Ethereum. EVM tidak berubah oleh transisi ke bukti taruhan (kecuali untuk nilai pengembalian dari opcode DIFFICULTY).

## 9 Model eksekusi {#9-execution-model}

Bagian ini (hlm. 12-14) mencakup sebagian besar definisi EVM.

Istilah _keadaan sistem_ mencakup semua yang perlu Anda ketahui tentang sistem untuk menjalankannya. Di komputer biasa, ini berarti memori, konten register, dll.

[Mesin Turing](https://en.wikipedia.org/wiki/Turing_machine) adalah model komputasi. Pada dasarnya, ini adalah versi sederhana dari komputer, yang terbukti memiliki kemampuan yang sama untuk menjalankan komputasi seperti yang dapat dilakukan komputer normal (semua yang dapat dihitung komputer dapat dihitung oleh mesin Turing dan sebaliknya). Model ini mempermudah pembuktian berbagai teorema tentang apa yang dapat dan tidak dapat dihitung.

Istilah [Turing-lengkap](https://en.wikipedia.org/wiki/Turing_completeness) berarti komputer yang dapat menjalankan kalkulasi yang sama dengan mesin Turing. Mesin Turing dapat masuk ke dalam putaran tak terbatas, dan EVM tidak bisa karena akan kehabisan gas, jadi hanya kuasi-Turing-lengkap.

## 9.1 Dasar-dasar {#91-basics}

Bagian ini memberikan dasar-dasar EVM dan perbandingannya dengan model komputasi lainnya.

[Mesin tumpukan](https://en.wikipedia.org/wiki/Stack_machine) adalah komputer yang menyimpan data perantara bukan di register, tetapi dalam [**tumpukan**](https://en.wikipedia.org/wiki/Stack_\(abstract_data_type\)). Ini adalah arsitektur yang lebih disukai untuk mesin virtual karena mudah diimplementasikan yang berarti bug, dan kerentanan keamanan, jauh lebih kecil kemungkinannya. Memori dalam tumpukan dibagi menjadi kata-kata 256-bit. Ini dipilih karena nyaman untuk operasi kriptografis inti Ethereum seperti hashing Keccak-256 dan komputasi kurva elips. Ukuran maksimum tumpukan adalah 1024 item (1024 x 256 bit). Ketika opcode dieksekusi, biasanya opcode mendapatkan parameternya dari tumpukan. Ada opcode khusus untuk menata ulang elemen dalam tumpukan seperti `POP` (menghapus item dari atas tumpukan), `DUP_N` (menduplikasi item ke-N dalam tumpukan), dll.

EVM juga memiliki ruang volatil yang disebut **memori** yang digunakan untuk menyimpan data selama eksekusi. Memori ini diatur dalam kata-kata 32-byte. Semua lokasi memori diinisialisasi ke nol. Jika Anda menjalankan kode [Yul](https://docs.soliditylang.org/en/latest/yul.html) ini untuk menambahkan sebuah kata ke memori, maka akan mengisi 32 byte memori dengan mengisi ruang kosong dalam kata dengan angka nol, yaitu, membuat satu kata - dengan angka nol di lokasi 0-29, 0x60 ke 30, dan 0xA7 ke 31.

```yul
mstore(0, 0x60A7)
```

`mstore` adalah salah satu dari tiga opcode yang disediakan EVM untuk berinteraksi dengan memori - ia memuat sebuah kata ke dalam memori. Dua lainnya adalah `mstore8` yang memuat satu byte ke dalam memori, dan `mload` yang memindahkan sebuah kata dari memori ke tumpukan.

EVM juga memiliki model **penyimpanan** non-volatil terpisah yang dipertahankan sebagai bagian dari keadaan sistem - memori ini diatur ke dalam array kata (sebagai lawan dari array byte yang dapat dialamatkan dengan kata dalam tumpukan). Penyimpanan ini adalah tempat kontrak menyimpan data persisten - sebuah kontrak hanya dapat berinteraksi dengan penyimpanannya sendiri. Penyimpanan diatur dalam pemetaan kunci-nilai.

Meskipun tidak disebutkan di bagian Yellow Paper ini, ada baiknya juga untuk mengetahui bahwa ada tipe memori keempat. **Calldata** adalah memori hanya-baca yang dapat dialamatkan byte yang digunakan untuk menyimpan nilai yang dilewatkan dengan parameter `data` dari suatu transaksi. EVM memiliki opcode khusus untuk mengelola `calldata`. `calldatasize` mengembalikan ukuran data. `calldataload` memuat data ke dalam tumpukan. `calldatacopy` menyalin data ke dalam memori.

[Arsitektur Von Neumann](https://en.wikipedia.org/wiki/Von_Neumann_architecture) standar menyimpan kode dan data dalam memori yang sama. EVM tidak mengikuti standar ini karena alasan keamanan - berbagi memori volatil memungkinkan untuk mengubah kode program. Sebagai gantinya, kode disimpan ke penyimpanan.

Hanya ada dua kasus di mana kode dieksekusi dari memori:

- Ketika sebuah kontrak membuat kontrak lain (menggunakan [`CREATE`](https://www.evm.codes/#f0) atau [`CREATE2`](https://www.evm.codes/#f5)), kode untuk konstruktor kontrak berasal dari memori.
- Selama pembuatan kontrak _apa pun_, kode konstruktor berjalan dan kemudian kembali dengan kode kontrak yang sebenarnya, juga dari memori.

Istilah eksekusi luar biasa berarti sebuah pengecualian yang menyebabkan eksekusi kontrak saat ini berhenti.

## 9.2 Tinjauan biaya {#92-fees-overview}

Bagian ini menjelaskan cara penghitungan biaya gas. Ada tiga biaya:

### Biaya opcode {#opcode-cost}

Biaya yang melekat pada opcode spesifik. Untuk mendapatkan nilai ini, temukan grup biaya opcode di Apendiks H (hlm. 28, di bawah persamaan (327)), dan temukan grup biaya dalam persamaan (324). Ini memberi Anda fungsi biaya, yang dalam kebanyakan kasus menggunakan parameter dari Apendiks G (hlm. 27).

Misalnya, opcode [`CALLDATACOPY`](https://www.evm.codes/#37) adalah anggota grup _W<sub>copy</sub>_. Biaya opcode untuk grup tersebut adalah _G<sub>verylow</sub>+G<sub>copy</sub>×⌈μ<sub>s</sub>[2]÷32⌉_. Melihat Apendiks G, kita melihat bahwa kedua konstanta adalah 3, yang memberi kita _3+3×⌈μ<sub>s</sub>[2]÷32⌉_.

Kita masih perlu menguraikan ekspresi _⌈μ<sub>s</sub>[2]÷32⌉_. Bagian terluar, _⌈ \<value\> ⌉_ adalah fungsi pagu, sebuah fungsi yang jika diberi suatu nilai akan mengembalikan bilangan bulat terkecil yang masih tidak lebih kecil dari nilai tersebut. Contohnya, _⌈2.5⌉ = ⌈3⌉ = 3_. Bagian dalamnya adalah _μ<sub>s</sub>[2]÷32_. Melihat bagian 3 (Konvensi) pada hlm. 3, _μ_ adalah keadaan mesin. Keadaan mesin didefinisikan di bagian 9.4.1 pada hlm. 13. Menurut bagian itu, salah satu parameter keadaan mesin adalah _s_ untuk tumpukan. Menyatukan semuanya, tampaknya _μ<sub>s</sub>[2]_ adalah lokasi #2 di tumpukan. Melihat [opcode](https://www.evm.codes/#37), lokasi #2 di tumpukan adalah ukuran data dalam byte. Melihat opcode lain di grup W<sub>copy</sub>, [`CODECOPY`](https://www.evm.codes/#39) dan [`RETURNDATACOPY`](https://www.evm.codes/#3e), mereka juga memiliki ukuran data di lokasi yang sama. Jadi _⌈μ<sub>s</sub>[2]÷32⌉_ adalah jumlah kata 32 byte yang diperlukan untuk menyimpan data yang disalin. Menyatukan semuanya, biaya inheren [`CALLDATACOPY`](https://www.evm.codes/#37) adalah 3 gas ditambah 3 per kata data yang disalin.

### Biaya berjalan {#running-cost}

Biaya menjalankan kode yang kita panggil.

- Dalam kasus [`CREATE`](https://www.evm.codes/#f0) dan [`CREATE2`](https://www.evm.codes/#f5), konstruktor untuk kontrak baru.
- Dalam kasus [`CALL`](https://www.evm.codes/#f1), [`CALLCODE`](https://www.evm.codes/#f2), [`STATICCALL`](https://www.evm.codes/#fa), atau [`DELEGATECALL`](https://www.evm.codes/#f4), kontrak yang kita panggil.

### Biaya perluasan memori {#expanding-memory-cost}

Biaya perluasan memori (jika perlu).

Dalam persamaan 324, nilai ini ditulis sebagai _C<sub>mem</sub>(μ<sub>i</sub>')-C<sub>mem</sub>(μ<sub>i</sub>)_. Melihat kembali bagian 9.4.1, kita melihat bahwa _μ<sub>i</sub>_ adalah jumlah kata dalam memori. Jadi _μ<sub>i</sub>_ adalah jumlah kata dalam memori sebelum opcode dan _μ<sub>i</sub>'_ adalah jumlah kata dalam memori setelah opcode.

Fungsi _C<sub>mem</sub>_ didefinisikan dalam persamaan 326: _C<sub>mem</sub>(a) = G<sub>memory</sub> × a + ⌊a<sup>2</sup> ÷ 512⌋_. _⌊x⌋_ adalah fungsi lantai, sebuah fungsi yang jika diberi suatu nilai akan mengembalikan bilangan bulat terbesar yang masih tidak lebih besar dari nilai tersebut. Sebagai contoh, _⌊2.5⌋ = ⌊2⌋ = 2._ Ketika _a < √512_, _a<sup>2</sup> < 512_, dan hasil dari fungsi lantai adalah nol. Jadi untuk 22 kata pertama (704 byte), biayanya meningkat secara linear dengan jumlah kata memori yang dibutuhkan. Di luar titik itu _⌊a<sup>2</sup> ÷ 512⌋_ adalah positif. Ketika memori yang dibutuhkan cukup tinggi, biaya gas sebanding dengan kuadrat dari jumlah memori.

**Catatan** bahwa faktor-faktor ini hanya memengaruhi biaya gas _inheren_ - tidak memperhitungkan pasar biaya atau tip kepada validator yang menentukan berapa banyak yang harus dibayar oleh pengguna akhir - ini hanyalah biaya mentah untuk menjalankan operasi tertentu pada EVM.

[Baca lebih lanjut tentang gas](/developers/docs/gas/).

## 9.3 Lingkungan eksekusi {#93-execution-env}

Lingkungan eksekusi adalah sebuah tuple, _I_, yang mencakup informasi yang bukan merupakan bagian dari keadaan blockchain atau EVM.

| Parameter       | Opcode untuk mengakses data                                                                                     | Kode Solidity untuk mengakses data                       |
| --------------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| _I<sub>a</sub>_ | [`ADDRESS`](https://www.evm.codes/#30)                                                                          | `address(this)`                                          |
| _I<sub>o</sub>_ | [`ORIGIN`](https://www.evm.codes/#32)                                                                           | `tx.origin`                                              |
| _I<sub>p</sub>_ | [`GASPRICE`](https://www.evm.codes/#3a)                                                                         | `tx.gasprice`                                            |
| _I<sub>d</sub>_ | [`CALLDATALOAD`](https://www.evm.codes/#35), dll.                                               | `msg.data`                                               |
| _I<sub>s</sub>_ | [`CALLER`](https://www.evm.codes/#33)                                                                           | `msg.sender`                                             |
| _I<sub>v</sub>_ | [`CALLVALUE`](https://www.evm.codes/#34)                                                                        | `msg.value`                                              |
| _I<sub>b</sub>_ | [`CODECOPY`](https://www.evm.codes/#39)                                                                         | `address(this).code`                                     |
| _I<sub>H</sub>_ | Bidang header blok, seperti [`NUMBER`](https://www.evm.codes/#43) dan [`DIFFICULTY`](https://www.evm.codes/#44) | `block.number`, `block.difficulty`, dll. |
| _I<sub>e</sub>_ | Kedalaman tumpukan panggilan untuk panggilan antar kontrak (termasuk pembuatan kontrak)      |                                                          |
| _I<sub>w</sub>_ | Apakah EVM diizinkan untuk mengubah keadaan, atau apakah ia berjalan secara statis                              |                                                          |

Beberapa parameter lain diperlukan untuk memahami sisa bagian 9:

| Parameter | Didefinisikan di bagian                                          | Arti                                                                                                                                                                                                                                                              |
| --------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _σ_       | 2 (hlm. 2, persamaan 1)       | Keadaan blockchain                                                                                                                                                                                                                                                |
| _g_       | 9.3 (hlm. 13) | Gas yang tersisa                                                                                                                                                                                                                                                  |
| _A_       | 6.1 (hlm. 8)  | Sub-keadaan yang masih harus dibayar (perubahan dijadwalkan ketika transaksi berakhir)                                                                                                                                                         |
| _o_       | 9.3 (hlm. 13) | Keluaran - hasil yang dikembalikan dalam kasus transaksi internal (ketika satu kontrak memanggil yang lain) dan panggilan ke fungsi tampilan (ketika Anda hanya meminta informasi, sehingga tidak perlu menunggu transaksi) |

## 9.4 Ikhtisar eksekusi {#94-execution-overview}

Sekarang setelah semua pendahuluan selesai, kita akhirnya bisa mulai mengerjakan cara kerja EVM.

Persamaan 137-142 memberi kita kondisi awal untuk menjalankan EVM:

| Simbol           | Nilai awal                                                                       | Arti                                                                                                                                                                                                                                                                                                                               |
| ---------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _μ<sub>g</sub>_  | _g_                                                                              | Gas tersisa                                                                                                                                                                                                                                                                                                                        |
| _μ<sub>pc</sub>_ | _0_                                                                              | Penghitung program, alamat instruksi berikutnya yang akan dieksekusi                                                                                                                                                                                                                                                               |
| _μ<sub>m</sub>_  | _(0, 0, ...)_ | Memori, diinisialisasi ke semua nol                                                                                                                                                                                                                                                                                                |
| _μ<sub>i</sub>_  | _0_                                                                              | Lokasi memori tertinggi yang digunakan                                                                                                                                                                                                                                                                                             |
| _μ<sub>s</sub>_  | _()_                                                          | Tumpukan, awalnya kosong                                                                                                                                                                                                                                                                                                           |
| _μ<sub>o</sub>_  | _∅_                                                                              | Keluaran, himpunan kosong sampai dan kecuali kita berhenti baik dengan data kembali ([`RETURN`](https://www.evm.codes/#f3) atau [`REVERT`](https://www.evm.codes/#fd)) atau tanpanya ([`STOP`](https://www.evm.codes/#00) atau [`SELFDESTRUCT`](https://www.evm.codes/#ff)). |

Persamaan 143 memberitahu kita bahwa ada empat kemungkinan kondisi di setiap titik waktu selama eksekusi, dan apa yang harus dilakukan dengannya:

1. `Z(σ,μ,A,I)`. Z mewakili fungsi yang menguji apakah suatu operasi menciptakan transisi keadaan yang tidak valid (lihat [penghentian luar biasa](#942-exceptional-halting)). Jika dievaluasi sebagai Benar, keadaan baru identik dengan yang lama (kecuali gas yang terbakar) karena perubahan belum diimplementasikan.
2. Jika opcode yang dieksekusi adalah [`REVERT`](https://www.evm.codes/#fd), keadaan baru sama dengan keadaan lama, sebagian gas hilang.
3. Jika urutan operasi selesai, seperti yang ditandai oleh [`RETURN`](https://www.evm.codes/#f3), keadaan diperbarui ke keadaan baru.
4. Jika kita tidak berada di salah satu kondisi akhir 1-3, lanjutkan berjalan.

## 9.4.1 Keadaan Mesin {#941-machine-state}

Bagian ini menjelaskan keadaan mesin secara lebih rinci. Ini menentukan bahwa _w_ adalah opcode saat ini. Jika _μ<sub>pc</sub>_ kurang dari _||I<sub>b</sub>||_, panjang kode, maka byte itu (_I<sub>b</sub>[μ<sub>pc</sub>]_) adalah opcode. Jika tidak, opcode didefinisikan sebagai [`STOP`](https://www.evm.codes/#00).

Karena ini adalah [mesin tumpukan](https://en.wikipedia.org/wiki/Stack_machine), kita perlu melacak jumlah item yang dikeluarkan (_δ_) dan dimasukkan (_α_) oleh setiap opcode.

## 9.4.2 Penghentian Luar Biasa {#942-exceptional-halt}

Bagian ini mendefinisikan fungsi _Z_, yang menentukan kapan kita mengalami penghentian abnormal. Ini adalah fungsi [Boolean](https://en.wikipedia.org/wiki/Boolean_data_type), jadi menggunakan [_∨_ untuk atau logis](https://en.wikipedia.org/wiki/Logical_disjunction) dan [_∧_ untuk dan logis](https://en.wikipedia.org/wiki/Logical_conjunction).

Kita mengalami penghentian luar biasa jika salah satu dari kondisi ini benar:

- **_μ<sub>g</sub> < C(σ,μ,A,I)_**
  Seperti yang kita lihat di bagian 9.2, _C_ adalah fungsi yang menentukan biaya gas. Gas yang tersisa tidak cukup untuk menutupi opcode berikutnya.

- **_δ<sub>w</sub>=∅_**
  Jika jumlah item yang dikeluarkan untuk sebuah opcode tidak terdefinisi, maka opcode itu sendiri tidak terdefinisi.

- **_|| μ<sub>s</sub> || < δ<sub>w</sub>_**
  Stack underflow, tidak cukup item di tumpukan untuk opcode saat ini.

- **_w = JUMP ∧ μ<sub>s</sub>[0]∉D(I<sub>b</sub>)_**
  Opcode-nya adalah [`JUMP`](https://www.evm.codes/#56) dan alamatnya bukan [`JUMPDEST`](https://www.evm.codes/#5b). Lompatan _hanya_ valid jika tujuannya adalah [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = JUMPI ∧ μ<sub>s</sub>[1]≠0 ∧ μ<sub>s</sub>[0] ∉ D(I<sub>b</sub>)_**
  Opcode adalah [`JUMPI`](https://www.evm.codes/#57), kondisinya benar (bukan nol) sehingga lompatan harus terjadi, dan alamatnya bukan [`JUMPDEST`](https://www.evm.codes/#5b). Lompatan _hanya_ valid jika tujuannya adalah [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = RETURNDATACOPY ∧ μ<sub>s</sub>[1]+μ<sub>s</sub>[2]>|| μ<sub>o</sub> ||_**
  Opcode-nya adalah [`RETURNDATACOPY`](https://www.evm.codes/#3e). Dalam opcode ini, elemen tumpukan _μ<sub>s</sub>[1]_ adalah ofset untuk dibaca dari buffer data kembali, dan elemen tumpukan _μ<sub>s</sub>[2]_ adalah panjang data. Kondisi ini terjadi ketika Anda mencoba membaca di luar akhir buffer data kembali. Perhatikan bahwa tidak ada kondisi serupa untuk calldata atau untuk kode itu sendiri. Ketika Anda mencoba membaca di luar akhir buffer tersebut, Anda hanya mendapatkan angka nol.

- **_|| μ<sub>s</sub> || - δ<sub>w</sub> + α<sub>w</sub> > 1024_**

  Stack overflow. Jika menjalankan opcode akan menghasilkan tumpukan lebih dari 1024 item, batalkan.

- **_¬I<sub>w</sub> ∧ W(w,μ)_**
  Apakah kita berjalan secara statis ([¬ adalah negasi](https://en.wikipedia.org/wiki/Negation) dan _I<sub>w</sub>_ benar ketika kita diizinkan untuk mengubah keadaan blockchain)? Jika demikian, dan kita mencoba operasi yang mengubah keadaan, itu tidak bisa terjadi.

  Fungsi _W(w,μ)_ didefinisikan kemudian dalam persamaan 150. _W(w,μ)_ benar jika salah satu dari kondisi ini benar:

  - **_w ∈ \{CREATE, CREATE2, SSTORE, SELFDESTRUCT}_**
    Opcode ini mengubah keadaan, baik dengan membuat kontrak baru, menyimpan nilai, atau menghancurkan kontrak saat ini.

  - **_LOG0≤w ∧ w≤LOG4_**
    Jika kita dipanggil secara statis, kita tidak dapat mengeluarkan entri log.
    Opcode log semuanya berada dalam rentang antara [`LOG0` (A0)](https://www.evm.codes/#a0) dan [`LOG4` (A4)](https://www.evm.codes/#a4).
    Angka setelah opcode log menentukan berapa banyak topik yang dikandung entri log.

  - **_w=CALL ∧ μ<sub>s</sub>[2]≠0_**
    Anda dapat memanggil kontrak lain saat Anda statis, tetapi jika Anda melakukannya, Anda tidak dapat mentransfer ETH ke kontrak tersebut.

- **_w = SSTORE ∧ μ<sub>g</sub> ≤ G<sub>callstipend</sub>_**
  Anda tidak dapat menjalankan [`SSTORE`](https://www.evm.codes/#55) kecuali Anda memiliki lebih dari gas G<sub>callstipend</sub> (didefinisikan sebagai 2300 di Apendiks G).

## 9.4.3 Validitas Tujuan Lompatan {#943-jump-dest-valid}

Di sini kita secara formal mendefinisikan apa itu opcode [`JUMPDEST`](https://www.evm.codes/#5b). Kita tidak bisa hanya mencari nilai byte 0x5B, karena mungkin berada di dalam PUSH (dan oleh karena itu data dan bukan opcode).

Dalam persamaan (153) kita mendefinisikan sebuah fungsi, _N(i,w)_. Parameter pertama, _i_, adalah lokasi opcode. Yang kedua, _w_, adalah opcode itu sendiri. Jika _w∈[PUSH1, PUSH32]_ berarti opcode adalah PUSH (kurung siku mendefinisikan rentang yang mencakup titik akhir). Jika demikian, opcode berikutnya berada di _i+2+(w−PUSH1)_. Untuk [`PUSH1`](https://www.evm.codes/#60) kita perlu maju dua byte (PUSH itu sendiri dan nilai satu byte), untuk [`PUSH2`](https://www.evm.codes/#61) kita perlu maju tiga byte karena itu adalah nilai dua byte, dll. Semua opcode EVM lainnya hanya sepanjang satu byte, jadi dalam semua kasus lain _N(i,w)=i+1_.

Fungsi ini digunakan dalam persamaan (152) untuk mendefinisikan _D<sub>J</sub>(c,i)_, yang merupakan [himpunan](https://en.wikipedia.org/wiki/Set_\(mathematics\)) dari semua tujuan lompatan yang valid dalam kode _c_, dimulai dari lokasi opcode _i_. Fungsi ini didefinisikan secara rekursif. Jika _i≥||c||_, itu berarti kita berada di atau setelah akhir kode. Kita tidak akan menemukan tujuan lompatan lagi, jadi kembalikan saja himpunan kosong.

Dalam semua kasus lain kita melihat sisa kode dengan pergi ke opcode berikutnya dan mendapatkan himpunan mulai dari sana. _c[i]_ adalah opcode saat ini, jadi _N(i,c[i])_ adalah lokasi opcode berikutnya. _D<sub>J</sub>(c,N(i,c[i]))_ oleh karena itu adalah himpunan tujuan lompatan yang valid yang dimulai pada opcode berikutnya. Jika opcode saat ini bukan `JUMPDEST`, kembalikan saja himpunan itu. Jika itu `JUMPDEST`, sertakan dalam himpunan hasil dan kembalikan itu.

## 9.4.4 Penghentian Normal {#944-normal-halt}

Fungsi penghentian _H_, dapat mengembalikan tiga jenis nilai.

- Jika kita tidak berada dalam opcode halt, kembalikan _∅_, himpunan kosong. Berdasarkan konvensi, nilai ini diinterpretasikan sebagai Boolean salah.
- Jika kita memiliki opcode halt yang tidak menghasilkan output (baik [`STOP`](https://www.evm.codes/#00) atau [`SELFDESTRUCT`](https://www.evm.codes/#ff)), kembalikan urutan byte berukuran nol sebagai nilai kembalian. Perhatikan bahwa ini sangat berbeda dari himpunan kosong. Nilai ini berarti bahwa EVM benar-benar berhenti, hanya saja tidak ada data kembalian untuk dibaca.
- Jika kita memiliki opcode halt yang memang menghasilkan output (baik [`RETURN`](https://www.evm.codes/#f3) atau [`REVERT`](https://www.evm.codes/#fd)), kembalikan urutan byte yang ditentukan oleh opcode tersebut. Urutan ini diambil dari memori, nilai di atas tumpukan (_μ<sub>s</sub>[0]_) adalah byte pertama, dan nilai setelahnya (_μ<sub>s</sub>[1]_) adalah panjangnya.

## H.2 Set instruksi {#h2-instruction-set}

Sebelum kita beralih ke subbagian terakhir dari EVM, 9.5, mari kita lihat instruksinya sendiri. Mereka didefinisikan dalam Apendiks H.2 yang dimulai pada hlm. 29. Apa pun yang tidak ditentukan sebagai berubah dengan opcode spesifik tersebut diharapkan tetap sama. Variabel yang berubah ditentukan dengan \<sesuatu\>′.

Sebagai contoh, mari kita lihat opcode [`ADD`](https://www.evm.codes/#01).

| Nilai | Mnemonik | δ | α | Deskripsi                                                                                                                                                                                                             |
| ----: | -------- | - | - | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  0x01 | ADD      | 2 | 1 | Operasi penjumlahan.                                                                                                                                                                                  |
|       |          |   |   | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[0] + μ<sub>s</sub>[1]_ |

_δ_ adalah jumlah nilai yang kita keluarkan dari tumpukan. Dalam hal ini dua, karena kita menambahkan dua nilai teratas.

_α_ adalah jumlah nilai yang kita dorong kembali. Dalam hal ini satu, jumlahnya.

Jadi puncak tumpukan baru (_μ′<sub>s</sub>[0]_) adalah jumlah dari puncak tumpukan lama (_μ<sub>s</sub>[0]_) dan nilai lama di bawahnya (_μ<sub>s</sub>[1]_).

Daripada membahas semua opcode dengan "daftar yang membosankan", Artikel ini hanya menjelaskan opcode yang memperkenalkan sesuatu yang baru.

| Nilai | Mnemonik  | δ | α | Deskripsi                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----: | --------- | - | - | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  0x20 | KECCAK256 | 2 | 1 | Hitung hash Keccak-256.                                                                                                                                                                                                                                                                                                                                                                                                                              |
|       |           |   |   | _μ′<sub>s</sub>[0] ≡ KEC(μ<sub>m</sub>[μ<sub>s</sub>[0] . . . (μ<sub>s</sub>[0] + μ<sub>s</sub>[1] − 1)])_ |
|       |           |   |   | _μ′<sub>i</sub> ≡ M(μ<sub>i</sub>,μ<sub>s</sub>[0],μ<sub>s</sub>[1])_                                                                                                                                                                                                                                                                     |

Ini adalah opcode pertama yang mengakses memori (dalam hal ini, hanya-baca). Namun, ini mungkin melampaui batas memori saat ini, jadi kita perlu memperbarui _μ<sub>i</sub>._ Kita melakukannya dengan menggunakan fungsi _M_ yang didefinisikan dalam persamaan 328 pada hlm. 29.

| Nilai | Mnemonik | δ | α | Deskripsi                                                |
| ----: | -------- | - | - | -------------------------------------------------------- |
|  0x31 | BALANCE  | 1 | 1 | Dapatkan saldo dari akun yang diberikan. |
|       |          |   |   | ...      |

Alamat yang saldonya perlu kita temukan adalah _μ<sub>s</sub>[0] mod 2<sup>160</sup>_. Bagian atas tumpukan adalah alamatnya, tetapi karena alamat hanya 160 bit, kami menghitung nilainya [modulo](https://en.wikipedia.org/wiki/Modulo_operation) 2<sup>160</sup>.

Jika _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] ≠ ∅_, itu berarti ada informasi tentang alamat ini. Dalam hal ini, _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>]<sub>b</sub>_ adalah saldo untuk alamat tersebut. Jika _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] = ∅_, itu berarti alamat ini belum diinisialisasi dan saldonya nol. Anda dapat melihat daftar bidang informasi akun di bagian 4.1 pada hlm. 4.

Persamaan kedua, _A'<sub>a</sub> ≡ A<sub>a</sub> ∪ \{μ<sub>s</sub>[0] mod 2<sup>160</sup>}_, terkait dengan perbedaan biaya antara akses ke penyimpanan hangat (penyimpanan yang baru-baru ini diakses dan kemungkinan besar berada di dalam cache) dan penyimpanan dingin (penyimpanan yang belum diakses dan kemungkinan besar berada di penyimpanan yang lebih lambat yang lebih mahal untuk diambil). _A<sub>a</sub>_ adalah daftar alamat yang sebelumnya diakses oleh transaksi, yang oleh karena itu seharusnya lebih murah untuk diakses, sebagaimana didefinisikan dalam bagian 6.1 pada hlm. 8. Anda dapat membaca lebih lanjut tentang subjek ini di [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929).

| Nilai | Mnemonik | δ  | α  | Deskripsi                                                                                                                                       |
| ----: | -------- | -- | -- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
|  0x8F | DUP16    | 16 | 17 | Gandakan item tumpukan ke-16.                                                                                                   |
|       |          |    |    | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[15]_ |

Perhatikan bahwa untuk menggunakan item tumpukan apa pun, kita perlu mengeluarkannya, yang berarti kita juga perlu mengeluarkan semua item tumpukan di atasnya. Dalam kasus [`DUP<n>`](https://www.evm.codes/#8f) dan [`SWAP<n>`](https://www.evm.codes/#9f), ini berarti harus mengeluarkan dan kemudian mendorong hingga enam belas nilai.

## 9.5 Siklus eksekusi {#95-exec-cycle}

Sekarang setelah kita memiliki semua bagiannya, kita akhirnya dapat memahami bagaimana siklus eksekusi EVM didokumentasikan.

Persamaan (155) mengatakan bahwa dengan keadaan:

- _σ_ (keadaan blockchain global)
- _μ_ (keadaan EVM)
- _A_ (sub-keadaan, perubahan akan terjadi ketika transaksi berakhir)
- _I_ (lingkungan eksekusi)

Keadaan barunya adalah _(σ', μ', A', I')_.

Persamaan (156)-(158) mendefinisikan tumpukan dan perubahan di dalamnya karena opcode (_μ<sub>s</sub>_). Persamaan (159) adalah perubahan gas (_μ<sub>g</sub>_). Persamaan (160) adalah perubahan pada penghitung program (_μ<sub>pc</sub>_). Terakhir, persamaan (161)-(164) menentukan bahwa parameter lain tetap sama, kecuali secara eksplisit diubah oleh opcode.

Dengan ini EVM didefinisikan sepenuhnya.

## Kesimpulan {#conclusion}

Notasi matematika tepat dan telah memungkinkan Yellow Paper untuk menentukan setiap detail Ethereum. Namun, ia memiliki beberapa kelemahan:

- Ini hanya dapat dipahami oleh manusia, yang berarti bahwa [tes kepatuhan](https://github.com/ethereum/tests) harus ditulis secara manual.
- Pemrogram memahami kode komputer.
  Mereka mungkin atau mungkin tidak memahami notasi matematika.

Mungkin karena alasan ini, [spesifikasi lapisan konsensus](https://github.com/ethereum/consensus-specs/blob/dev/tests/core/pyspec/README.md) yang lebih baru ditulis dalam Python. Ada [spesifikasi lapisan eksekusi dalam Python](https://ethereum.github.io/execution-specs), tetapi tidak lengkap. Sampai dan kecuali seluruh Yellow Paper juga diterjemahkan ke dalam Python atau bahasa serupa, Yellow Paper akan terus digunakan, dan akan sangat membantu untuk dapat membacanya.
