---
title: Cara menggunakan Slither untuk menemukan bug kontrak pintar
description: Cara menggunakan Slither untuk menemukan bug dalam kontrak pintar secara otomatis
author: Trailofbits
lang: id
tags:
  - "solidity"
  - "kontrak pintar"
  - "keamanan"
  - "pengujian"
  - "analisis statis"
skill: advanced
published: 2020-06-09
source: Membuat kontrak yang aman
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Cara menggunakan Slither {#how-to-use-slither}

Tujuan tutorial ini adalah menunjukkan cara menggunakan Slither untuk menemukan bug dalam kontrak pintar secara otomatis.

- [Instalasi](#installation)
- [Penggunaan baris perintah](#command-line)
- [Pengantar analisis statis](#static-analysis): Pengantar singkat tentang analisis statis
- [API](#api-basics): deskripsi API Python

## Instalasi {#installation}

Slither memerlukan versi Python >= 3.6. Itu bisa diinstal melalui pip atau docker.

Slither melalui pip:

```bash
pip3 install --user slither-analyzer
```

Slither melalui docker:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_Perintah terakhirnya menjalankan kotak peralatan keamanan eth di dalam docker yang memiliki akses ke direktori Anda saat ini. Anda bisa mengubah file dari host Anda, dan menjalankan peralatannya pada file dari docker_

Dalam docker, jalankan:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Menjalankan skrip {#running-a-script}

Untuk menjalankan skrip python dengan python 3:

```bash
python3 script.py
```

### Baris perintah {#command-line}

**Baris perintah versus skrip yang ditentukan pengguna.** Slither dilengkapi dengan serangkaian detektor yang telah ditentukan sebelumnya yang menemukan banyak bug umum. Memanggil Slither dari baris perintah akan menjalankan semua detektor, pengetahuan mendetail tentang analisis statis tidak diperlukan:

```bash
slither project_paths
```

Selain detektor, Slither memiliki kemampuan meninjau kode melalui [printer](https://github.com/crytic/slither#printers) dan [peralatan](https://github.com/crytic/slither#tools).

Gunakan [crytic.io](https://github.com/crytic) untuk mengakses detektor privat dan integrasi GitHub.

## Analisis statis {#static-analysis}

Kemampuan dan desain kerangka kerja analisis statis Slither telah dijelaskan dalam postingan blog ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) dan sebuah [makalah akademik](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf).

Analisis statis hadir dalam rasa berbeda. Kemungkinan besar Anda menyadari bahwa pengompilasi seperti [clang](https://clang-analyzer.llvm.org/) dan [gcc](https://lwn.net/Articles/806099/) bergantung pada teknik penelitian ini, tapi teknik ini juga mendasari ([Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](http://findbugs.sourceforge.net/), dan peralatan berbasis metode formal seperti [Frama-C](https://frama-c.com/) dan [Polyspace](https://www.mathworks.com/products/polyspace.html).

Kita tidak akan mengulas secara lengkap teknik analisis statis dan penelitinya di sini. Sebaliknya, kita akan fokus pada apa yang diperlukan untuk memahami cara kerja Slither, sehingga Anda bisa menggunakannya dengan lebih efektif untuk menemukan bug dan memahami kode.

- [Representasi kode](#code-representation)
- [Analisis kode](#analysis)
- [Representasi tingkat menengah](#intermediate-representation)

### Representasi kode {#code-representation}

Berbeda dengan analisis dinamis, yang menalarkan tentang jalur eksekusi tunggal, analisis statis menalarkan tentang semua jalur sekaligus. Untuk melakukannya, bergantung pada representasi kode yang berbeda. Dua representasi paling umum adalah pohon sintaksis abstrak (AST) dan grafik aliran kontrol (CFG).

### Pohon Sintaksis Abstrak (AST) {#abstract-syntax-trees-ast}

AST digunakan setiap kali pengompilasi menguraikan kode. Kemungkinan ini adalah struktur paling dasar di mana analisis statis bisa dilakukan.

Singkatnya, AST adalah pohon berstruktur di mana, biasanya, tiap daunnya berisi satu variabel atau konstanta dan node internalnya adalah operand atau operasi alur kontrol. Perhatikan kode berikut:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

AST yang sesuai ditunjukkan di dalam:

![AST](./ast.png)

Slither menggunakan AST yang diekspor oleh solc.

Meskipun mudah untuk dibuat, AST adalah struktur bersarang. Terkadang, ini bukan yang paling mudah untuk dianalisis. Contohnya, untuk mengenali operasi yang digunakan oleh ekspresi `a + b <= a`, Anda harus terlebih dahulu menganalisa `<=` dan kemudian `+`. Pendekatan yang umum adalah menggunakan pola pengunjung, yang menelusuri pohonnya secara berulang. Slither berisi pengunjung generik dalam [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py).

Kode berikut menggunakan `ExpressionVisitor` untuk mendeteksi apakah ekspresi berisi tambahan:

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # ekspresi adalah ekspresi yang harus diuji
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### Grafik Aliran Kontrol (CFG) {#control-flow-graph-cfg}

Representasi kode paling umum kedua adalah grafik aliran kontrol (CFG). Seperti namanya, ini adalah representasi berbasis grafik yang menampilkan semua jalur eksekusi. Setiap node berisi satu atau beberapa instruksi. Tepi dalam grafik merepresentasikan operasi alur kontrol (jika/maka/jika tidak, perulangan, dll). CFG contoh kita sebelumnya adalah:

![CFG](./cfg.png)

CFG adalah representasi yang di atasnya kebanyakan analisis dibangun.

Ada banyak representasi kode lainnya. Setiap representasi memiliki kelebihan dan kekurangan bergantung pada analisis yang ingin Anda lakukan.

### Analisis {#analysis}

Jenis analisis paling sederhana yang dapat dilakukan dengan Slither adalah analisis sintaksis.

### Analisis sintaksis {#syntax-analysis}

Slither bisa menelusuri berbagai komponen kode dan representasinya untuk menemukan inkonsistensi dan kelemahan dengan menggunakan pendekatan pola yang mirip.

Contohnya, detektor berikut mencari masalah yang terkait dengan sintaksis:

- [Bayangan variabel state](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): ulangi keseluruhan variabel state dan periksa apakah ada yang membayangi variabel dari kontrak yang diwariskan ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [Antarmuka ERC20 yang salah](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): cari tanda tangan fungsi ERC20 yang salah ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### Analisis semantik {#semantic-analysis}

Berbeda dengan analisis sintaksis, analisis semantik akan bergerak lebih dalam dan menganalisis "arti" kode. Keluarga ini memasukkan beberapa jenis analisis yang luas. Mereka membuat hasil yang lebih efektif dan berguna, tapi juga lebih rumit untuk ditulis.

Analisis semantik digunakan untuk deteksi kerentanan yang paling canggih.

#### Analisis dependensi data {#fixed-point-computation}

Variabel `variable_a` dianggap bergantung pada data `variable_b` jika ada jalur yang nilai `variable_a` dipengaruhi oleh `variable_b`.

Dalam kode berikut, `variable_a` bergantung pada `variable_b`:

```solidity
// ...
variable_a = variable_b + 1;
```

Slither hadir dengan kemampuan [dependensi data](https://github.com/crytic/slither/wiki/data-dependency) bawaan, berkat representasi menengahnya (dibahas di bagian akhir).

Satu contoh penggunaan dependensi data bisa ditemukan dalam [detektor kesamaan ketat berbahaya](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities). Di sini, Slither akan mencari perbandingan kesamaan ketat dari nilai berbahaya ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)), dan akan memberi tahu pengguna bahwa harus menggunakan `>=` atau `<=` daripada `==`, untuk mencegah penyerang memerangkap kontrak. Di antara lainnya, detektor akan menganggap nilai pengembalian dari pemanggilan `balanceOf(address)` berbahaya ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)), dan akan menggunakan mesin dependensi data untuk melacak penggunaannya.

#### Komputasi titik tetap {#fixed-point-computation}

Jika analisis Anda menelusuri CFG dan mengikuti tepinya, Anda mungkin akan melihat node yang sudah dikunjungi. Contohnya, jika satu perulangan ditampilkan seperti di bawah:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

Analisis Anda perlu tahu kapan harus berhenti. Ada dua strategi utama di sini: (1) mengulangi setiap node beberapa kali, (2) menghitung apa yang disebut _titik tetap_. Titik tetap pada dasarnya berarti bahwa menganalisis node ini tidak memberi informasi berarti apa pun.

Contoh penggunaan titik tetap bisa ditemukan dalam detektor reentrancy: Slither menjelajah node, dan mencari pemanggilan eksternal, menulis dan membaca ke penyimpanan. Setelah mencapai titik tetap ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), analisis akan menghentikan penjelajahan, dan menganalisis hasilnya untuk melihat apakah ada reentrancy, dengan menggunakan pola reentrancy berbeda ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)).

Menulis analisis dengan komputasi titik tetap yang efisien memerlukan pemahaman yang baik tentang cara analisis menyebarkan informasinya.

### Representasi tingkat menengah {#intermediate-representation}

Representasi tingkat menengah (IR) adalah sebuah bahasa yang dimaksudkan agar lebih mudah diterima oleh analisis statis daripada bahasa aslinya. Slither menerjemahkan Solidity ke dalam IR-nya sendiri: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

Memahami SlithIR tidak penting jika Anda hanya mau menulis pemeriksaan biasa. Namun, itu akan berguna jika Anda berencana menulis analisis semantik tingkat lanjut. Printer [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) dan [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) akan membantu Anda memahami cara kode diterjemahkan.

## Dasar-Dasar API {#api-basics}

Slither memiliki API yang mengizinkan Anda menjelajah atribut dasar kontrak dan fungsinya.

Untuk memuat basis kode:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### Menjelajahi kontrak dan fungsi {#exploring-contracts-and-functions}

Objek `Slither` memiliki:

- `kontrak (daftar(Kontrak)`: daftar kontrak
- `contracts_derived (list(Contract)`: daftar kontrak yang tidak diwariskan oleh kontrak lainnya (subset kontrak)
- `get_contract_from_name (str)`: Mengembalikan kontrak dari namanya

Objek `Contract` memiliki:

- `name (str)`: Nama kontrak
- `functions (list(Function))`: Daftar fungsi
- `modifiers (list(Modifier))`: Daftar fungsi
- `all_functions_called (list(Function/Modifier))`: Daftar semua fungsi internal yang dapat dicapai oleh kontrak
- `inheritance (list(Contract))`: Daftar kontrak yang diwariskan
- `get_function_from_signature (str)`: Mengembalikan Fungsi dari tanda tangannya
- `get_modifier_from_signature (str)`: Mengembalikan Pengubah dari tanda tangannya
- `get_state_variable_from_name (str)`: Mengembalikan StateVariable dari namanya

Objek `Function` atau `Modifier` memiliki:

- `name (str)`: Nama fungsi
- `contract (contract)`: kontrak di mana fungsi dideklarasikan
- `nodes (list(Node))`: Daftar node yang membentuk CFG fungsi/pengubah
- `entry_point (Node)`: Titik masuk CFG
- `variables_read (list(Variable))`: Daftar variabel yang dibaca
- `variables_written (list(Variable))`: Daftar variabel yang ditulis
- `state_variables_read (list(StateVariable))`: Daftar variabel state yang dibaca (subset variabel `yang dibaca)
- `state_variables_written (list(StateVariable))`: Daftar variabel state yang ditulis (subset variabel `yang ditulis)
