---
title: Memahami Spesifikasi EVM di Yellow Paper
description: Memahami bagian dari Yellow Paper, spesifikasi formal untuk Ethereum, yang menjelaskan Mesin Virtual Ethereum (EVM).
author: "qbzzt"
tags: ["evm"]
skill: intermediate
lang: id
published: 2022-05-15
---

[Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) adalah spesifikasi formal untuk Ethereum. Kecuali jika diubah oleh [proses EIP](/eips/), dokumen ini berisi deskripsi yang tepat tentang bagaimana semuanya bekerja. Dokumen ini ditulis sebagai makalah matematika, yang mencakup terminologi yang mungkin tidak familier bagi pemrogram. Dalam makalah ini Anda akan belajar cara membacanya, dan lebih jauh lagi makalah matematika terkait lainnya.

## Yellow Paper yang Mana? {#which-yellow-paper}

Seperti hampir semua hal lain di Ethereum, Yellow Paper berkembang seiring waktu. Agar dapat merujuk ke versi tertentu, saya mengunggah [versi saat penulisan ini](yellow-paper-berlin.pdf). Nomor bagian, halaman, dan persamaan yang saya gunakan akan merujuk ke versi tersebut. Ada baiknya Anda membukanya di jendela yang berbeda saat membaca dokumen ini.

### Mengapa EVM? {#why-the-evm}

Yellow paper asli ditulis tepat pada awal pengembangan Ethereum. Dokumen ini menjelaskan mekanisme konsensus berbasis proof-of-work asli yang pada awalnya digunakan untuk mengamankan jaringan. Namun, Ethereum mematikan proof-of-work dan mulai menggunakan konsensus berbasis proof-of-stake pada bulan September 2022. Tutorial ini akan berfokus pada bagian-bagian dari yellow paper yang mendefinisikan Mesin Virtual Ethereum. EVM tidak berubah oleh transisi ke proof-of-stake (kecuali untuk nilai kembalian dari opcode DIFFICULTY).

## 9 Model eksekusi {#9-execution-model}

Bagian ini (hal. 12-14) mencakup sebagian besar definisi EVM.

Istilah _status sistem_ mencakup semua yang perlu Anda ketahui tentang sistem untuk menjalankannya. Pada komputer biasa, ini berarti memori, isi register, dll.

[Mesin Turing](https://en.wikipedia.org/wiki/Turing_machine) adalah model komputasi. Pada dasarnya, ini adalah versi komputer yang disederhanakan, yang terbukti memiliki kemampuan yang sama untuk menjalankan komputasi yang dapat dilakukan oleh komputer normal (semua yang dapat dihitung oleh komputer dapat dihitung oleh mesin Turing dan sebaliknya). Model ini memudahkan untuk membuktikan berbagai teorema tentang apa yang bisa dan tidak bisa dihitung.

Istilah [Turing-complete](https://en.wikipedia.org/wiki/Turing_completeness) berarti komputer yang dapat menjalankan perhitungan yang sama dengan mesin Turing. Mesin Turing dapat masuk ke dalam perulangan tak terbatas, dan EVM tidak bisa karena akan kehabisan gas, jadi ini hanya quasi-Turing-complete.

## 9.1 Dasar-dasar {#91-basics}

Bagian ini memberikan dasar-dasar EVM dan bagaimana perbandingannya dengan model komputasi lainnya.

[Mesin stack](https://en.wikipedia.org/wiki/Stack_machine) adalah komputer yang menyimpan data perantara bukan di register, tetapi di dalam [**stack**](<https://en.wikipedia.org/wiki/Stack_(abstract_data_type)>). Ini adalah arsitektur yang disukai untuk mesin virtual karena mudah diimplementasikan yang berarti bug, dan kerentanan keamanan, jauh lebih kecil kemungkinannya. Memori di dalam stack dibagi menjadi kata (word) 256-bit. Ini dipilih karena nyaman untuk operasi kriptografi inti Ethereum seperti hashing Keccak-256 dan komputasi kurva eliptik. Ukuran maksimum stack adalah 1024 item (1024 x 256 bit). Saat opcode dieksekusi, mereka biasanya mendapatkan parameternya dari stack. Ada opcode khusus untuk mengatur ulang elemen di dalam stack seperti `POP` (menghapus item dari atas stack), `DUP_N` (menduplikasi item ke-N di dalam stack), dll.

EVM juga memiliki ruang volatil yang disebut **memori** yang digunakan untuk menyimpan data selama eksekusi. Memori ini diatur ke dalam kata 32-byte. Semua lokasi memori diinisialisasi ke nol. Jika Anda mengeksekusi kode [Yul](https://docs.soliditylang.org/en/latest/yul.html) ini untuk menambahkan sebuah kata ke memori, itu akan mengisi 32 byte memori dengan menambahkan nol pada ruang kosong di dalam kata tersebut, yaitu, ia membuat satu kata - dengan nol di lokasi 0-29, 0x60 ke 30, dan 0xA7 ke 31.

```yul
mstore(0, 0x60A7)
```

`mstore` adalah satu dari tiga opcode yang disediakan EVM untuk berinteraksi dengan memori - ia memuat sebuah kata ke dalam memori. Dua lainnya adalah `mstore8` yang memuat satu byte ke dalam memori, dan `mload` yang memindahkan sebuah kata dari memori ke stack.

EVM juga memiliki model **penyimpanan** non-volatil terpisah yang dipertahankan sebagai bagian dari status sistem - memori ini diatur ke dalam array kata (berlawanan dengan array byte yang dapat dialamatkan kata di dalam stack). Penyimpanan ini adalah tempat kontrak menyimpan data persisten - sebuah kontrak hanya dapat berinteraksi dengan penyimpanannya sendiri. Penyimpanan diatur dalam pemetaan nilai-kunci (key-value).

Meskipun tidak disebutkan di bagian Yellow Paper ini, ada baiknya juga untuk mengetahui bahwa ada jenis memori keempat. **Calldata** adalah memori baca-saja yang dapat dialamatkan byte yang digunakan untuk menyimpan nilai yang diteruskan dengan parameter `data` dari sebuah transaksi. EVM memiliki opcode khusus untuk mengelola `calldata`. `calldatasize` mengembalikan ukuran data. `calldataload` memuat data ke dalam stack. `calldatacopy` menyalin data ke dalam memori.

[Arsitektur Von Neumann](https://en.wikipedia.org/wiki/Von_Neumann_architecture) standar menyimpan kode dan data di memori yang sama. EVM tidak mengikuti standar ini karena alasan keamanan - berbagi memori volatil memungkinkan untuk mengubah kode program. Sebaliknya, kode disimpan ke penyimpanan.

Hanya ada dua kasus di mana kode dieksekusi dari memori:

- Saat sebuah kontrak membuat kontrak lain (menggunakan [`CREATE`](https://www.evm.codes/#f0) atau [`CREATE2`](https://www.evm.codes/#f5)), kode untuk konstruktor kontrak berasal dari memori.
- Selama pembuatan kontrak _apa pun_, kode konstruktor berjalan dan kemudian kembali dengan kode kontrak yang sebenarnya, juga dari memori.

Istilah eksekusi luar biasa (exceptional execution) berarti pengecualian yang menyebabkan eksekusi kontrak saat ini berhenti.

## 9.2 Gambaran umum biaya {#92-fees-overview}

Bagian ini menjelaskan bagaimana biaya gas dihitung. Ada tiga biaya:

### Biaya opcode {#opcode-cost}

Biaya bawaan dari opcode tertentu. Untuk mendapatkan nilai ini, temukan grup biaya opcode di Lampiran H (hal. 28, di bawah persamaan (327)), dan temukan grup biaya di persamaan (324). Ini memberi Anda fungsi biaya, yang dalam banyak kasus menggunakan parameter dari Lampiran G (hal. 27).

Misalnya, opcode [`CALLDATACOPY`](https://www.evm.codes/#37) adalah anggota grup _W<sub>copy</sub>_. Biaya opcode untuk grup tersebut adalah _G<sub>verylow</sub>+G<sub>copy</sub>×⌈μ<sub>s</sub>[2]÷32⌉_. Melihat Lampiran G, kita melihat bahwa kedua konstanta adalah 3, yang memberi kita _3+3×⌈μ<sub>s</sub>[2]÷32⌉_.

Kita masih perlu menguraikan ekspresi _⌈μ<sub>s</sub>[2]÷32⌉_. Bagian terluar, _⌈ \<value\> ⌉_ adalah fungsi ceiling (pembulatan ke atas), sebuah fungsi yang jika diberikan sebuah nilai akan mengembalikan bilangan bulat terkecil yang masih tidak lebih kecil dari nilai tersebut. Misalnya, _⌈2.5⌉ = ⌈3⌉ = 3_. Bagian dalamnya adalah _μ<sub>s</sub>[2]÷32_. Melihat bagian 3 (Konvensi) di hal. 3, _μ_ adalah status mesin. Status mesin didefinisikan di bagian 9.4.1 di hal. 13. Menurut bagian tersebut, salah satu parameter status mesin adalah _s_ untuk stack. Menggabungkan semuanya, tampaknya _μ<sub>s</sub>[2]_ adalah lokasi #2 di dalam stack. Melihat [opcode tersebut](https://www.evm.codes/#37), lokasi #2 di dalam stack adalah ukuran data dalam byte. Melihat opcode lain di grup W<sub>copy</sub>, [`CODECOPY`](https://www.evm.codes/#39) dan [`RETURNDATACOPY`](https://www.evm.codes/#3e), mereka juga memiliki ukuran data di lokasi yang sama. Jadi _⌈μ<sub>s</sub>[2]÷32⌉_ adalah jumlah kata 32 byte yang diperlukan untuk menyimpan data yang sedang disalin. Menggabungkan semuanya, biaya bawaan dari [`CALLDATACOPY`](https://www.evm.codes/#37) adalah 3 gas ditambah 3 per kata dari data yang sedang disalin.

### Biaya berjalan {#running-cost}

Biaya menjalankan kode yang kita panggil.

- Dalam kasus [`CREATE`](https://www.evm.codes/#f0) dan [`CREATE2`](https://www.evm.codes/#f5), konstruktor untuk kontrak baru.
- Dalam kasus [`CALL`](https://www.evm.codes/#f1), [`CALLCODE`](https://www.evm.codes/#f2), [`STATICCALL`](https://www.evm.codes/#fa), atau [`DELEGATECALL`](https://www.evm.codes/#f4), kontrak yang kita panggil.

### Biaya perluasan memori {#expanding-memory-cost}

Biaya memperluas memori (jika perlu).

Dalam persamaan 324, nilai ini ditulis sebagai _C<sub>mem</sub>(μ<sub>i</sub>')-C<sub>mem</sub>(μ<sub>i</sub>)_. Melihat bagian 9.4.1 lagi, kita melihat bahwa _μ<sub>i</sub>_ adalah jumlah kata di dalam memori. Jadi _μ<sub>i</sub>_ adalah jumlah kata di dalam memori sebelum opcode dan _μ<sub>i</sub>'_ adalah jumlah kata di dalam memori setelah opcode.

Fungsi _C<sub>mem</sub>_ didefinisikan dalam persamaan 326: _C<sub>mem</sub>(a) = G<sub>memory</sub> × a + ⌊a<sup>2</sup> ÷ 512⌋_. _⌊x⌋_ adalah fungsi floor (pembulatan ke bawah), sebuah fungsi yang jika diberikan sebuah nilai akan mengembalikan bilangan bulat terbesar yang masih tidak lebih besar dari nilai tersebut. Misalnya, _⌊2.5⌋ = ⌊2⌋ = 2._ Ketika _a < √512_, _a<sup>2</sup> < 512_, dan hasil dari fungsi floor adalah nol. Jadi untuk 22 kata pertama (704 byte), biayanya naik secara linier dengan jumlah kata memori yang diperlukan. Di luar titik itu _⌊a<sup>2</sup> ÷ 512⌋_ bernilai positif. Ketika memori yang diperlukan cukup tinggi, biaya gas sebanding dengan kuadrat dari jumlah memori.

**Catatan** bahwa faktor-faktor ini hanya memengaruhi biaya gas _bawaan_ - ini tidak memperhitungkan pasar biaya atau tip kepada validator yang menentukan berapa banyak pengguna akhir diharuskan membayar - ini hanyalah biaya mentah untuk menjalankan operasi tertentu di EVM.

[Baca lebih lanjut tentang gas](/developers/docs/gas/).

## 9.3 Lingkungan eksekusi {#93-execution-env}

Lingkungan eksekusi adalah sebuah tuple, _I_, yang mencakup informasi yang bukan bagian dari status blockchain atau EVM.

| Parameter       | Opcode untuk mengakses data                                                                                                      | Kode Solidity untuk mengakses data       |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| _I<sub>a</sub>_ | [`ADDRESS`](https://www.evm.codes/#30)                                                                                           | `address(this)`                          |
| _I<sub>o</sub>_ | [`ORIGIN`](https://www.evm.codes/#32)                                                                                            | `tx.origin`                              |
| _I<sub>p</sub>_ | [`GASPRICE`](https://www.evm.codes/#3a)                                                                                          | `tx.gasprice`                            |
| _I<sub>d</sub>_ | [`CALLDATALOAD`](https://www.evm.codes/#35), dll.                                                                                | `msg.data`                               |
| _I<sub>s</sub>_ | [`CALLER`](https://www.evm.codes/#33)                                                                                            | `msg.sender`                             |
| _I<sub>v</sub>_ | [`CALLVALUE`](https://www.evm.codes/#34)                                                                                         | `msg.value`                              |
| _I<sub>b</sub>_ | [`CODECOPY`](https://www.evm.codes/#39)                                                                                          | `address(this).code`                     |
| _I<sub>H</sub>_ | Bidang header blok, seperti [`NUMBER`](https://www.evm.codes/#43) dan [`DIFFICULTY`](https://www.evm.codes/#44)                  | `block.number`, `block.difficulty`, dll. |
| _I<sub>e</sub>_ | Kedalaman call stack untuk panggilan antar kontrak (termasuk pembuatan kontrak)                                                  |
| _I<sub>w</sub>_ | Apakah EVM diizinkan untuk mengubah status, atau apakah ia berjalan secara statis                                                |

Beberapa parameter lain diperlukan untuk memahami sisa bagian 9:

| Parameter | Didefinisikan di bagian | Arti                                                                                                                                                                                                                                     |
| --------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _σ_       | 2 (hal. 2, persamaan 1) | Status blockchain                                                                                                                                                                                                                        |
| _g_       | 9.3 (hal. 13)           | Sisa gas                                                                                                                                                                                                                                 |
| _A_       | 6.1 (hal. 8)            | Substatus yang masih harus dibayar (perubahan yang dijadwalkan saat transaksi berakhir)                                                                                                                                                  |
| _o_       | 9.3 (hal. 13)           | Output - hasil yang dikembalikan dalam kasus transaksi internal (saat satu kontrak memanggil kontrak lain) dan panggilan ke fungsi view (saat Anda hanya meminta informasi, jadi tidak perlu menunggu transaksi)                         |

## 9.4 Gambaran umum eksekusi {#94-execution-overview}

Sekarang setelah memiliki semua pendahuluan, kita akhirnya dapat mulai mengerjakan bagaimana EVM bekerja.

Persamaan 137-142 memberi kita kondisi awal untuk menjalankan EVM:

| Simbol           | Nilai awal    | Arti                                                                                                                                                                                                                                                        |
| ---------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _μ<sub>g</sub>_  | _g_           | Sisa gas                                                                                                                                                                                                                                                    |
| _μ<sub>pc</sub>_ | _0_           | Program counter, alamat instruksi berikutnya yang akan dieksekusi                                                                                                                                                                                           |
| _μ<sub>m</sub>_  | _(0, 0, ...)_ | Memori, diinisialisasi ke semua nol                                                                                                                                                                                                                         |
| _μ<sub>i</sub>_  | _0_           | Lokasi memori tertinggi yang digunakan                                                                                                                                                                                                                      |
| _μ<sub>s</sub>_  | _()_          | Stack, awalnya kosong                                                                                                                                                                                                                                       |
| _μ<sub>o</sub>_  | _∅_           | Output, himpunan kosong sampai dan kecuali kita berhenti baik dengan data kembalian ([`RETURN`](https://www.evm.codes/#f3) atau [`REVERT`](https://www.evm.codes/#fd)) atau tanpanya ([`STOP`](https://www.evm.codes/#00) atau [`SELFDESTRUCT`](https://www.evm.codes/#ff)). |

Persamaan 143 memberi tahu kita bahwa ada empat kemungkinan kondisi pada setiap titik waktu selama eksekusi, dan apa yang harus dilakukan dengannya:

1.  `Z(σ,μ,A,I)`. Z mewakili fungsi yang menguji apakah suatu operasi menciptakan transisi status yang tidak valid (lihat [penghentian luar biasa](#942-exceptional-halting)). Jika dievaluasi menjadi True, status baru identik dengan yang lama (kecuali gas terbakar) karena perubahan belum diimplementasikan.
2.  Jika opcode yang dieksekusi adalah [`REVERT`](https://www.evm.codes/#fd), status baru sama dengan status lama, sejumlah gas hilang.
3.  Jika urutan operasi selesai, seperti yang ditandai oleh [`RETURN`](https://www.evm.codes/#f3)), status diperbarui ke status baru.
4.  Jika kita tidak berada di salah satu kondisi akhir 1-3, lanjutkan berjalan.

## 9.4.1 Status Mesin {#941-machine-state}

Bagian ini menjelaskan status mesin secara lebih rinci. Ini menentukan bahwa _w_ adalah opcode saat ini. Jika _μ<sub>pc</sub>_ kurang dari _||I<sub>b</sub>||_, panjang kode, maka byte tersebut (_I<sub>b</sub>[μ<sub>pc</sub>]_) adalah opcode. Jika tidak, opcode didefinisikan sebagai [`STOP`](https://www.evm.codes/#00).

Karena ini adalah [mesin stack](https://en.wikipedia.org/wiki/Stack_machine), kita perlu melacak jumlah item yang dikeluarkan (_δ_) dan dimasukkan (_α_) oleh setiap opcode.

## 9.4.2 Penghentian Luar Biasa {#942-exceptional-halt}

Bagian ini mendefinisikan fungsi _Z_, yang menentukan kapan kita memiliki penghentian abnormal. Ini adalah fungsi [Boolean](https://en.wikipedia.org/wiki/Boolean_data_type), jadi ia menggunakan [_∨_ untuk logika or](https://en.wikipedia.org/wiki/Logical_disjunction) dan [_∧_ untuk logika and](https://en.wikipedia.org/wiki/Logical_conjunction).

Kita memiliki penghentian luar biasa jika salah satu dari kondisi ini benar:

- **_μ<sub>g</sub> < C(σ,μ,A,I)_**
  Seperti yang kita lihat di bagian 9.2, _C_ adalah fungsi yang menentukan biaya gas. Tidak ada cukup gas yang tersisa untuk menutupi opcode berikutnya.

- **_δ<sub>w</sub>=∅_**
  Jika jumlah item yang dikeluarkan untuk sebuah opcode tidak terdefinisi, maka opcode itu sendiri tidak terdefinisi.

- **_|| μ<sub>s</sub> || < δ<sub>w</sub>_**
  Stack underflow, tidak cukup item di dalam stack untuk opcode saat ini.

- **_w = JUMP ∧ μ<sub>s</sub>[0]∉D(I<sub>b</sub>)_**
  Opcode-nya adalah [`JUMP`](https://www.evm.codes/#56) dan alamatnya bukan [`JUMPDEST`](https://www.evm.codes/#5b). Lompatan _hanya_ valid ketika tujuannya adalah [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = JUMPI ∧ μ<sub>s</sub>[1]≠0 ∧ μ<sub>s</sub>[0] ∉ D(I<sub>b</sub>)_**
  Opcode-nya adalah [`JUMPI`](https://www.evm.codes/#57), kondisinya benar (bukan nol) sehingga lompatan harus terjadi, dan alamatnya bukan [`JUMPDEST`](https://www.evm.codes/#5b). Lompatan _hanya_ valid ketika tujuannya adalah [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = RETURNDATACOPY ∧ μ<sub>s</sub>[1]+μ<sub>s</sub>[2]>|| μ<sub>o</sub> ||_**
  Opcode-nya adalah [`RETURNDATACOPY`](https://www.evm.codes/#3e). Dalam opcode ini elemen stack _μ<sub>s</sub>[1]_ adalah offset untuk membaca dari buffer data kembalian, dan elemen stack _μ<sub>s</sub>[2]_ adalah panjang data. Kondisi ini terjadi ketika Anda mencoba membaca melampaui akhir buffer data kembalian. Perhatikan bahwa tidak ada kondisi serupa untuk calldata atau untuk kode itu sendiri. Ketika Anda mencoba membaca melampaui akhir buffer tersebut, Anda hanya mendapatkan nol.

- **_|| μ<sub>s</sub> || - δ<sub>w</sub> + α<sub>w</sub> > 1024_**

  Stack overflow. Jika menjalankan opcode akan menghasilkan stack lebih dari 1024 item, batalkan.

- **_¬I<sub>w</sub> ∧ W(w,μ)_**
  Apakah kita berjalan secara statis ([¬ adalah negasi](https://en.wikipedia.org/wiki/Negation) dan _I<sub>w</sub>_ bernilai benar ketika kita diizinkan untuk mengubah status blockchain)? Jika ya, dan kita mencoba operasi pengubahan status, itu tidak bisa terjadi.

  Fungsi _W(w,μ)_ didefinisikan kemudian dalam persamaan 150. _W(w,μ)_ bernilai benar jika salah satu dari kondisi ini benar:

  - **_w ∈ \{CREATE, CREATE2, SSTORE, SELFDESTRUCT}_**
    Opcode ini mengubah status, baik dengan membuat kontrak baru, menyimpan nilai, atau menghancurkan kontrak saat ini.

  - **_LOG0≤w ∧ w≤LOG4_**
    Jika kita dipanggil secara statis, kita tidak dapat memancarkan entri log.
    Semua opcode log berada dalam kisaran antara [`LOG0` (A0)](https://www.evm.codes/#a0) dan [`LOG4` (A4)](https://www.evm.codes/#a4).
    Angka setelah opcode log menentukan berapa banyak topik yang dikandung entri log.
  - **_w=CALL ∧ μ<sub>s</sub>[2]≠0_**
    Anda dapat memanggil kontrak lain saat Anda statis, tetapi jika Anda melakukannya, Anda tidak dapat mentransfer ETH ke dalamnya.

- **_w = SSTORE ∧ μ<sub>g</sub> ≤ G<sub>callstipend</sub>_**
  Anda tidak dapat menjalankan [`SSTORE`](https://www.evm.codes/#55) kecuali Anda memiliki lebih dari G<sub>callstipend</sub> (didefinisikan sebagai 2300 di Lampiran G) gas.

## 9.4.3 Validitas Tujuan Lompatan {#943-jump-dest-valid}

Di sini kita secara formal mendefinisikan apa itu opcode [`JUMPDEST`](https://www.evm.codes/#5b). Kita tidak bisa hanya mencari nilai byte 0x5B, karena itu mungkin berada di dalam PUSH (dan karenanya merupakan data dan bukan opcode).

Dalam persamaan (153) kita mendefinisikan sebuah fungsi, _N(i,w)_. Parameter pertama, _i_, adalah lokasi opcode. Yang kedua, _w_, adalah opcode itu sendiri. Jika _w∈[PUSH1, PUSH32]_ itu berarti opcode-nya adalah PUSH (tanda kurung siku mendefinisikan rentang yang mencakup titik akhir). Jika demikian, opcode berikutnya berada di _i+2+(w−PUSH1)_. Untuk [`PUSH1`](https://www.evm.codes/#60) kita perlu maju dua byte (PUSH itu sendiri dan nilai satu byte), untuk [`PUSH2`](https://www.evm.codes/#61) kita perlu maju tiga byte karena itu adalah nilai dua byte, dll. Semua opcode EVM lainnya hanya sepanjang satu byte, jadi dalam semua kasus lain _N(i,w)=i+1_.

Fungsi ini digunakan dalam persamaan (152) untuk mendefinisikan _D<sub>J</sub>(c,i)_, yang merupakan [himpunan](<https://en.wikipedia.org/wiki/Set_(mathematics)>) dari semua tujuan lompatan yang valid dalam kode _c_, dimulai dengan lokasi opcode _i_. Fungsi ini didefinisikan secara rekursif. Jika _i≥||c||_, itu berarti kita berada di atau setelah akhir kode. Kita tidak akan menemukan tujuan lompatan lagi, jadi cukup kembalikan himpunan kosong.

Dalam semua kasus lain, kita melihat sisa kode dengan pergi ke opcode berikutnya dan mendapatkan himpunan yang dimulai darinya. _c[i]_ adalah opcode saat ini, jadi _N(i,c[i])_ adalah lokasi opcode berikutnya. Oleh karena itu, _D<sub>J</sub>(c,N(i,c[i]))_ adalah himpunan tujuan lompatan yang valid yang dimulai pada opcode berikutnya. Jika opcode saat ini bukan `JUMPDEST`, cukup kembalikan himpunan tersebut. Jika itu adalah `JUMPDEST`, sertakan dalam himpunan hasil dan kembalikan itu.

## 9.4.4 Penghentian normal {#944-normal-halt}

Fungsi penghentian _H_, dapat mengembalikan tiga jenis nilai.

- Jika kita tidak berada dalam opcode penghentian, kembalikan _∅_, himpunan kosong. Berdasarkan konvensi, nilai ini ditafsirkan sebagai Boolean salah (false).
- Jika kita memiliki opcode penghentian yang tidak menghasilkan output (baik [`STOP`](https://www.evm.codes/#00) atau [`SELFDESTRUCT`](https://www.evm.codes/#ff)), kembalikan urutan byte berukuran nol sebagai nilai kembalian. Perhatikan bahwa ini sangat berbeda dari himpunan kosong. Nilai ini berarti bahwa EVM benar-benar berhenti, hanya saja tidak ada data kembalian untuk dibaca.
- Jika kita memiliki opcode penghentian yang menghasilkan output (baik [`RETURN`](https://www.evm.codes/#f3) atau [`REVERT`](https://www.evm.codes/#fd)), kembalikan urutan byte yang ditentukan oleh opcode tersebut. Urutan ini diambil dari memori, nilai di bagian atas stack (_μ<sub>s</sub>[0]_) adalah byte pertama, dan nilai setelahnya (_μ<sub>s</sub>[1]_) adalah panjangnya.

## H.2 Set instruksi {#h2-instruction-set}

Sebelum kita pergi ke subbagian terakhir dari EVM, 9.5, mari kita lihat instruksinya sendiri. Mereka didefinisikan dalam Lampiran H.2 yang dimulai pada hal. 29. Apa pun yang tidak ditentukan sebagai berubah dengan opcode tertentu diharapkan tetap sama. Variabel yang berubah ditentukan dengan sebagai \<sesuatu\>′.

Misalnya, mari kita lihat opcode [`ADD`](https://www.evm.codes/#01).

| Nilai | Mnemonic | δ   | α   | Deskripsi                                                 |
| ----: | -------- | --- | --- | --------------------------------------------------------- |
|  0x01 | ADD      | 2   | 1   | Operasi penambahan.                                       |
|       |          |     |     | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[0] + μ<sub>s</sub>[1]_ |

_δ_ adalah jumlah nilai yang kita keluarkan dari stack. Dalam hal ini dua, karena kita menambahkan dua nilai teratas.

_α_ adalah jumlah nilai yang kita masukkan kembali. Dalam hal ini satu, jumlahnya.

Jadi bagian atas stack yang baru (_μ′<sub>s</sub>[0]_) adalah jumlah dari bagian atas stack yang lama (_μ<sub>s</sub>[0]_) dan nilai lama di bawahnya (_μ<sub>s</sub>[1]_).

Daripada membahas semua opcode dengan "daftar yang membosankan", artikel ini hanya menjelaskan opcode yang memperkenalkan sesuatu yang baru.

| Nilai | Mnemonic  | δ   | α   | Deskripsi                                                                                                  |
| ----: | --------- | --- | --- | ---------------------------------------------------------------------------------------------------------- |
|  0x20 | KECCAK256 | 2   | 1   | Hitung hash Keccak-256.                                                                                    |
|       |           |     |     | _μ′<sub>s</sub>[0] ≡ KEC(μ<sub>m</sub>[μ<sub>s</sub>[0] . . . (μ<sub>s</sub>[0] + μ<sub>s</sub>[1] − 1)])_ |
|       |           |     |     | _μ′<sub>i</sub> ≡ M(μ<sub>i</sub>,μ<sub>s</sub>[0],μ<sub>s</sub>[1])_                                      |

Ini adalah opcode pertama yang mengakses memori (dalam hal ini, baca saja). Namun, ini mungkin meluas melampaui batas memori saat ini, jadi kita perlu memperbarui _μ<sub>i</sub>._ Kita melakukan ini menggunakan fungsi _M_ yang didefinisikan dalam persamaan 328 di hal. 29.

| Nilai | Mnemonic | δ   | α   | Deskripsi                               |
| ----: | -------- | --- | --- | --------------------------------------- |
|  0x31 | BALANCE  | 1   | 1   | Dapatkan saldo dari akun yang diberikan. |
|       |          |     |     | ...                                     |

Alamat yang saldonya perlu kita temukan adalah _μ<sub>s</sub>[0] mod 2<sup>160</sup>_. Bagian atas stack adalah alamatnya, tetapi karena alamat hanya 160 bit, kita menghitung nilai [modulo](https://en.wikipedia.org/wiki/Modulo_operation) 2<sup>160</sup>.

Jika _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] ≠ ∅_, itu berarti ada informasi tentang alamat ini. Dalam hal ini, _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>]<sub>b</sub>_ adalah saldo untuk alamat tersebut. Jika _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] = ∅_, itu berarti alamat ini tidak diinisialisasi dan saldonya nol. Anda dapat melihat daftar bidang informasi akun di bagian 4.1 di hal. 4.

Persamaan kedua, _A'<sub>a</sub> ≡ A<sub>a</sub> ∪ \{μ<sub>s</sub>[0] mod 2<sup>160</sup>}_, terkait dengan perbedaan biaya antara akses ke penyimpanan hangat (penyimpanan yang baru-baru ini diakses dan kemungkinan di-cache) dan penyimpanan dingin (penyimpanan yang belum diakses dan kemungkinan berada di penyimpanan yang lebih lambat yang lebih mahal untuk diambil). _A<sub>a</sub>_ adalah daftar alamat yang sebelumnya diakses oleh transaksi, yang karenanya harus lebih murah untuk diakses, seperti yang didefinisikan di bagian 6.1 di hal. 8. Anda dapat membaca lebih lanjut tentang subjek ini di [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929).

| Nilai | Mnemonic | δ   | α   | Deskripsi                               |
| ----: | -------- | --- | --- | --------------------------------------- |
|  0x8F | DUP16    | 16  | 17  | Duplikasi item stack ke-16.             |
|       |          |     |     | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[15]_ |

Perhatikan bahwa untuk menggunakan item stack apa pun, kita perlu mengeluarkannya, yang berarti kita juga perlu mengeluarkan semua item stack di atasnya. Dalam kasus [`DUP<n>`](https://www.evm.codes/#8f) dan [`SWAP<n>`](https://www.evm.codes/#9f), ini berarti harus mengeluarkan dan kemudian memasukkan hingga enam belas nilai.

## 9.5 Siklus eksekusi {#95-exec-cycle}

Sekarang setelah kita memiliki semua bagiannya, kita akhirnya dapat memahami bagaimana siklus eksekusi EVM didokumentasikan.

Persamaan (155) mengatakan bahwa dengan status:

- _σ_ (status blockchain global)
- _μ_ (status EVM)
- _A_ (substatus, perubahan yang terjadi saat transaksi berakhir)
- _I_ (lingkungan eksekusi)

Status baru adalah _(σ', μ', A', I')_.

Persamaan (156)-(158) mendefinisikan stack dan perubahannya karena sebuah opcode (_μ<sub>s</sub>_). Persamaan (159) adalah perubahan gas (_μ<sub>g</sub>_). Persamaan (160) adalah perubahan dalam program counter (_μ<sub>pc</sub>_). Terakhir, persamaan (161)-(164) menentukan bahwa parameter lain tetap sama, kecuali diubah secara eksplisit oleh opcode.

Dengan ini EVM sepenuhnya terdefinisi.

## Kesimpulan {#conclusion}

Notasi matematika sangat tepat dan telah memungkinkan Yellow Paper untuk menentukan setiap detail Ethereum. Namun, ini memiliki beberapa kelemahan:

- Ini hanya dapat dipahami oleh manusia, yang berarti bahwa [tes kepatuhan](https://github.com/ethereum/tests) harus ditulis secara manual.
- Pemrogram memahami kode komputer.
  Mereka mungkin atau mungkin tidak memahami notasi matematika.

Mungkin karena alasan ini, [spesifikasi lapisan konsensus](https://github.com/ethereum/consensus-specs/blob/master/tests/core/pyspec/README.md) yang lebih baru ditulis dengan Python. Ada [spesifikasi lapisan eksekusi dengan Python](https://ethereum.github.io/execution-specs), tetapi belum lengkap. Sampai dan kecuali seluruh Yellow Paper juga diterjemahkan ke Python atau bahasa serupa, Yellow Paper akan terus digunakan, dan sangat membantu untuk dapat membacanya.