---
title: Cara menggunakan Slither untuk menemukan bug kontrak pintar
description: Cara menggunakan Slither untuk secara otomatis menemukan bug dalam kontrak pintar
author: Trailofbits
lang: id
tags: ["Solidity", "kontrak pintar", "keamanan", "pengujian"]
skill: advanced
breadcrumb: "Slither"
published: 2020-06-09
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Cara menggunakan Slither {#how-to-use-slither}

Tujuan dari tutorial ini adalah untuk menunjukkan cara menggunakan Slither untuk secara otomatis menemukan bug dalam kontrak pintar.

- [Instalasi](#installation)
- [Penggunaan baris perintah](#command-line)
- [Pengantar analisis statis](#static-analysis): Pengantar singkat tentang analisis statis
- [API](#api-basics): Deskripsi API Python

## Instalasi {#installation}

Slither membutuhkan Python >= 3.6. Ini dapat diinstal melalui pip atau menggunakan docker.

Slither melalui pip:

```bash
pip3 install --user slither-analyzer
```

Slither melalui docker:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_Perintah terakhir menjalankan eth-security-toolbox dalam docker yang memiliki akses ke direktori Anda saat ini. Anda dapat mengubah file dari host Anda, dan menjalankan alat pada file dari docker_

Di dalam docker, jalankan:

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

**Baris perintah versus skrip yang ditentukan pengguna.** Slither dilengkapi dengan serangkaian detektor yang telah ditentukan sebelumnya yang menemukan banyak bug umum. Memanggil Slither dari baris perintah akan menjalankan semua detektor, tidak diperlukan pengetahuan terperinci tentang analisis statis:

```bash
slither project_paths
```

Selain detektor, Slither memiliki kemampuan tinjauan kode melalui [printer](https://github.com/crytic/slither#printers) dan [alat](https://github.com/crytic/slither#tools) miliknya.

Gunakan [crytic.io](https://github.com/crytic) untuk mendapatkan akses ke detektor privat dan integrasi GitHub.

## Analisis statis {#static-analysis}

Kemampuan dan desain kerangka kerja analisis statis Slither telah dijelaskan dalam postingan blog ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) dan sebuah [makalah akademis](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf).

Analisis statis ada dalam berbagai bentuk. Anda kemungkinan besar menyadari bahwa kompiler seperti [clang](https://clang-analyzer.llvm.org/) dan [gcc](https://lwn.net/Articles/806099/) bergantung pada teknik penelitian ini, tetapi ini juga mendasari ([Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](http://findbugs.sourceforge.net/) dan alat-alat yang didasarkan pada metode formal seperti [Frama-C](https://frama-c.com/) dan [Polyspace](https://www.mathworks.com/products/polyspace.html).

Kita tidak akan mengulas teknik analisis statis dan penelitinya secara mendalam di sini. Sebaliknya, kita akan berfokus pada apa yang diperlukan untuk memahami cara kerja Slither sehingga Anda dapat menggunakannya dengan lebih efektif untuk menemukan bug dan memahami kode.

- [Representasi kode](#code-representation)
- [Analisis kode](#analysis)
- [Representasi perantara](#intermediate-representation)

### Representasi kode {#code-representation}

Berbeda dengan analisis dinamis, yang menalar tentang satu jalur eksekusi, analisis statis menalar tentang semua jalur sekaligus. Untuk melakukannya, ini bergantung pada representasi kode yang berbeda. Dua yang paling umum adalah pohon sintaksis abstrak (AST) dan grafik aliran kontrol (CFG).

### Pohon Sintaksis Abstrak (AST) {#abstract-syntax-trees-ast}

AST digunakan setiap kali kompiler mengurai kode. Ini mungkin merupakan struktur paling dasar di mana analisis statis dapat dilakukan.

Singkatnya, AST adalah pohon terstruktur di mana, biasanya, setiap daun berisi variabel atau konstanta dan node internal adalah operan atau operasi aliran kontrol. Pertimbangkan kode berikut:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

AST yang sesuai ditunjukkan pada:

![AST](./ast.png)

Slither menggunakan AST yang diekspor oleh solc.

Meskipun mudah dibangun, AST adalah struktur bersarang. Terkadang, ini bukan yang paling mudah untuk dianalisis. Misalnya, untuk mengidentifikasi operasi yang digunakan oleh ekspresi `a + b <= a`, Anda harus terlebih dahulu menganalisis `<=` dan kemudian `+`. Pendekatan umum adalah menggunakan apa yang disebut pola pengunjung (visitor pattern), yang menavigasi melalui pohon secara rekursif. Slither berisi pengunjung generik di [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py).

Kode berikut menggunakan `ExpressionVisitor` untuk mendeteksi apakah ekspresi tersebut berisi penambahan:

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expression is the expression to be tested # expression adalah ekspresi yang akan diuji
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### Grafik Aliran Kontrol (CFG) {#control-flow-graph-cfg}

Representasi kode paling umum kedua adalah grafik aliran kontrol (CFG). Seperti namanya, ini adalah representasi berbasis grafik yang mengekspos semua jalur eksekusi. Setiap node berisi satu atau beberapa instruksi. Tepi (edges) dalam grafik mewakili operasi aliran kontrol (if/then/else, loop, dll). CFG dari contoh kita sebelumnya adalah:

![CFG](./cfg.png)

CFG adalah representasi di atas mana sebagian besar analisis dibangun.

Banyak representasi kode lainnya yang ada. Setiap representasi memiliki kelebihan dan kekurangan sesuai dengan analisis yang ingin Anda lakukan.

### Analisis {#analysis}

Jenis analisis paling sederhana yang dapat Anda lakukan dengan Slither adalah analisis sintaksis.

### Analisis sintaksis {#syntax-analysis}

Slither dapat menavigasi melalui berbagai komponen kode dan representasinya untuk menemukan ketidakkonsistenan dan kelemahan menggunakan pendekatan yang mirip dengan pencocokan pola.

Misalnya, detektor berikut mencari masalah terkait sintaksis:

- [State variable shadowing](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): mengulangi semua variabel status dan memeriksa apakah ada yang membayangi variabel dari kontrak yang diwariskan ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [Incorrect ERC20 interface](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): mencari tanda tangan fungsi ERC20 yang salah ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### Analisis semantik {#semantic-analysis}

Berbeda dengan analisis sintaksis, analisis semantik akan masuk lebih dalam dan menganalisis "makna" dari kode tersebut. Keluarga ini mencakup beberapa jenis analisis yang luas. Mereka mengarah pada hasil yang lebih kuat dan berguna, tetapi juga lebih kompleks untuk ditulis.

Analisis semantik digunakan untuk deteksi kerentanan yang paling canggih.

#### Analisis ketergantungan data {#fixed-point-computation}

Sebuah variabel `variable_a` dikatakan bergantung pada data `variable_b` jika ada jalur di mana nilai `variable_a` dipengaruhi oleh `variable_b`.

Dalam kode berikut, `variable_a` bergantung pada `variable_b`:

```solidity
// ... // ...
variable_a = variable_b + 1;
```

Slither dilengkapi dengan kemampuan [ketergantungan data](https://github.com/crytic/slither/wiki/data-dependency) bawaan, berkat representasi perantaranya (dibahas di bagian selanjutnya).

Contoh penggunaan ketergantungan data dapat ditemukan di [detektor kesetaraan ketat yang berbahaya](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities). Di sini Slither akan mencari perbandingan kesetaraan yang ketat dengan nilai yang berbahaya ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)), dan akan memberi tahu pengguna bahwa mereka harus menggunakan `>=` atau `<=` daripada `==`, untuk mencegah penyerang menjebak kontrak. Antara lain, detektor akan menganggap berbahaya nilai kembalian dari panggilan ke `balanceOf(address)` ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)), dan akan menggunakan mesin ketergantungan data untuk melacak penggunaannya.

#### Komputasi titik tetap (Fixed-point computation) {#fixed-point-computation}

Jika analisis Anda menavigasi melalui CFG dan mengikuti tepinya, Anda kemungkinan akan melihat node yang sudah dikunjungi. Misalnya, jika sebuah loop disajikan seperti yang ditunjukkan di bawah ini:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

Analisis Anda perlu mengetahui kapan harus berhenti. Ada dua strategi utama di sini: (1) mengulangi pada setiap node dalam jumlah yang terbatas, (2) menghitung apa yang disebut _fixpoint_. Fixpoint pada dasarnya berarti bahwa menganalisis node ini tidak memberikan informasi yang berarti.

Contoh penggunaan fixpoint dapat ditemukan di detektor reentrancy: Slither mengeksplorasi node, dan mencari panggilan eksternal, menulis dan membaca ke penyimpanan. Setelah mencapai fixpoint ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), ia menghentikan eksplorasi, dan menganalisis hasil untuk melihat apakah ada reentrancy, melalui pola reentrancy yang berbeda ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)).

Menulis analisis menggunakan komputasi titik tetap yang efisien membutuhkan pemahaman yang baik tentang bagaimana analisis menyebarkan informasinya.

### Representasi perantara {#intermediate-representation}

Representasi perantara (IR) adalah bahasa yang dimaksudkan agar lebih mudah menerima analisis statis daripada bahasa aslinya. Slither menerjemahkan Solidity ke IR-nya sendiri: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

Memahami SlithIR tidak diperlukan jika Anda hanya ingin menulis pemeriksaan dasar. Namun, ini akan berguna jika Anda berencana untuk menulis analisis semantik tingkat lanjut. Printer [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) dan [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) akan membantu Anda memahami bagaimana kode diterjemahkan.

## Dasar-dasar API {#api-basics}

Slither memiliki API yang memungkinkan Anda menjelajahi atribut dasar kontrak dan fungsinya.

Untuk memuat basis kode:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### Menjelajahi kontrak dan fungsi {#exploring-contracts-and-functions}

Objek `Slither` memiliki:

- `contracts (list(Contract)`: daftar kontrak
- `contracts_derived (list(Contract)`: daftar kontrak yang tidak diwarisi oleh kontrak lain (subset dari kontrak)
- `get_contract_from_name (str)`: Mengembalikan kontrak dari namanya

Objek `Contract` memiliki:

- `name (str)`: Nama kontrak
- `functions (list(Function))`: Daftar fungsi
- `modifiers (list(Modifier))`: Daftar fungsi
- `all_functions_called (list(Function/Modifier))`: Daftar semua fungsi internal yang dapat dijangkau oleh kontrak
- `inheritance (list(Contract))`: Daftar kontrak yang diwariskan
- `get_function_from_signature (str)`: Mengembalikan Fungsi dari tanda tangannya
- `get_modifier_from_signature (str)`: Mengembalikan Modifier dari tanda tangannya
- `get_state_variable_from_name (str)`: Mengembalikan StateVariable dari namanya

Objek `Function` atau `Modifier` memiliki:

- `name (str)`: Nama fungsi
- `contract (contract)`: kontrak tempat fungsi dideklarasikan
- `nodes (list(Node))`: Daftar node yang menyusun CFG dari fungsi/modifier
- `entry_point (Node)`: Titik masuk CFG
- `variables_read (list(Variable))`: Daftar variabel yang dibaca
- `variables_written (list(Variable))`: Daftar variabel yang ditulis
- `state_variables_read (list(StateVariable))`: Daftar variabel status yang dibaca (subset dari variables`read)
- `state_variables_written (list(StateVariable))`: Daftar variabel status yang ditulis (subset dari variables`written)