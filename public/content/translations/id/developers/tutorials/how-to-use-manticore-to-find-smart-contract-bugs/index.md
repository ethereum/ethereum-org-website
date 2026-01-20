---
title: Cara menggunakan Manticore untuk menemukan bug di kontrak pintar
description: Cara menggunakan Manticore untuk menemukan bug di kontrak pintar secara otomatis
author: Ipungpurwono
lang: id
tags:
  [
    "Solidity",
    "kontrak pintar",
    "keamanan",
    "pengujian",
    "verifikasi formal"
  ]
skill: advanced
published: 2020-01-13
source: Membuat kontrak yang aman
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

Tujuan tutorial ini adalah untuk menunjukkan cara menggunakan Manticore untuk menemukan bug di kontrak pintar secara otomatis.

## Instalasi {#installation}

Manticore memerlukan python >= 3.6. Ini dapat diinstal melalui pip atau menggunakan docker.

### Manticore melalui docker {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Perintah terakhir menjalankan eth-security-toolbox di dalam docker yang memiliki akses ke direktori Anda saat ini. Anda dapat mengubah file dari host Anda, dan menjalankan perangkat pada file dari docker_

Di dalam docker, jalankan:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Manticore melalui pip {#manticore-through-pip}

```bash
pip3 install --user manticore
```

solc 0.5.11 direkomendasikan.

### Menjalankan skrip {#running-a-script}

Untuk menjalankan skrip python dengan python 3:

```bash
python3 script.py
```

## Pengenalan eksekusi simbolik dinamis {#introduction-to-dynamic-symbolic-execution}

### Eksekusi Simbolik Dinamis Secara Singkat {#dynamic-symbolic-execution-in-a-nutshell}

Eksekusi simbolik dinamis (DSE) adalah teknik analisis program yang menjelajahi ruang state dengan tingkat kesadaran semantik yang tinggi. Teknik ini didasarkan pada penemuan "jalur program", yang direpresentasikan sebagai rumus matematika yang disebut `predikat jalur`. Secara konseptual, teknik ini beroperasi pada predikat jalur dalam dua langkah:

1. Predikat-predikat tersebut dibangun menggunakan batasan pada input program.
2. Predikat-predikat tersebut digunakan untuk menghasilkan input program yang akan menyebabkan jalur terkait dieksekusi.

Pendekatan ini tidak menghasilkan positif palsu dalam arti bahwa semua state program yang teridentifikasi dapat dipicu selama eksekusi konkret. Misalnya, jika analisis menemukan integer overflow, ini dijamin dapat direproduksi.

### Contoh Predikat Jalur {#path-predicate-example}

Untuk mendapatkan wawasan tentang cara kerja DSE, perhatikan contoh berikut:

```solidity
function f(uint a){

  if (a == 65) {
      // Ada bug
  }

}
```

Karena `f()` berisi dua jalur, DSE akan membangun dua predikat jalur yang berbeda:

- Jalur 1: `a == 65`
- Jalur 2: `Not (a == 65)`

Setiap predikat jalur adalah rumus matematika yang dapat diberikan ke apa yang disebut [pemecah SMT](https://wikipedia.org/wiki/Satisfiability_modulo_theories), yang akan mencoba menyelesaikan persamaan tersebut. Untuk `Jalur 1`, pemecah akan mengatakan bahwa jalur tersebut dapat dieksplorasi dengan `a = 65`. Untuk `Jalur 2`, pemecah dapat memberikan `a` nilai apa pun selain 65, misalnya `a = 0`.

### Memverifikasi properti {#verifying-properties}

Manticore memungkinkan kontrol penuh atas semua eksekusi setiap jalur. Hasilnya, ini memungkinkan Anda untuk menambahkan batasan arbitrer ke hampir semua hal. Kontrol ini memungkinkan pembuatan properti pada kontrak.

Perhatikan contoh berikut:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // tidak ada perlindungan overflow
  return c;
}
```

Di sini hanya ada satu jalur untuk dijelajahi di dalam fungsi:

- Jalur 1: `c = a + b`

Dengan menggunakan Manticore, Anda dapat memeriksa overflow, dan menambahkan batasan ke predikat jalur:

- `c = a + b AND (c < a OR c < b)`

Jika memungkinkan untuk menemukan valuasi `a` dan `b` yang membuat predikat jalur di atas layak, itu berarti Anda telah menemukan overflow. Misalnya pemecah dapat menghasilkan input `a = 10 , b = MAXUINT256`.

Jika Anda mempertimbangkan versi yang telah diperbaiki:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

Rumus terkait dengan pemeriksaan overflow adalah:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

Rumus ini tidak dapat diselesaikan; dengan kata lain, ini adalah **bukti** bahwa dalam `safe_add`, `c` akan selalu meningkat.

Oleh karena itu, DSE adalah perangkat yang andal, yang dapat memverifikasi batasan arbitrer pada kode Anda.

## Menjalankan di bawah Manticore {#running-under-manticore}

Kita akan melihat cara menjelajahi kontrak pintar dengan API Manticore. Targetnya adalah kontrak pintar berikut [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

```solidity
pragma solidity >=0.4.24 <0.6.0;

contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### Menjalankan eksplorasi mandiri {#run-a-standalone-exploration}

Anda dapat menjalankan Manticore secara langsung pada kontrak pintar dengan perintah berikut (`project` dapat berupa File Solidity, atau direktori proyek):

```bash
$ manticore project
```

Anda akan mendapatkan output dari kasus uji seperti ini (urutannya dapat berubah):

```
...
... m.c.manticore:INFO: Generated testcase No. 0 - STOP
... m.c.manticore:INFO: Generated testcase No. 1 - REVERT
... m.c.manticore:INFO: Generated testcase No. 2 - RETURN
... m.c.manticore:INFO: Generated testcase No. 3 - REVERT
... m.c.manticore:INFO: Generated testcase No. 4 - STOP
... m.c.manticore:INFO: Generated testcase No. 5 - REVERT
... m.c.manticore:INFO: Generated testcase No. 6 - REVERT
... m.c.manticore:INFO: Results in /home/ethsec/workshops/Automated Smart Contracts Audit - TruffleCon 2018/manticore/examples/mcore_t6vi6ij3
...
```

Tanpa informasi tambahan, Manticore akan menjelajahi kontrak dengan transaksi simbolik baru hingga tidak lagi menjelajahi jalur baru pada kontrak. Manticore tidak menjalankan transaksi baru setelah transaksi gagal (misalnya: setelah revert).

Manticore akan mengeluarkan informasi dalam direktori `mcore_*`. Antara lain, Anda akan menemukan di direktori ini:

- `global.summary`: cakupan dan peringatan kompiler
- `test_XXXXX.summary`: cakupan, instruksi terakhir, saldo akun per kasus uji
- `test_XXXXX.tx`: daftar transaksi terperinci per kasus uji

Di sini Manticore menemukan 7 kasus uji, yang sesuai dengan (urutan nama file dapat berubah):

|                                                           |    Transaksi 0    |         Transaksi 1        | Transaksi 2                |  Hasil |
| :-------------------------------------------------------: | :---------------: | :------------------------: | -------------------------- | :----: |
| **test_00000000.tx** | Pembuatan kontrak | f(!=65) | f(!=65) |  STOP  |
| **test_00000001.tx** | Pembuatan kontrak |       fungsi fallback      |                            | REVERT |
| **test_00000002.tx** | Pembuatan kontrak |                            |                            | RETURN |
| **test_00000003.tx** | Pembuatan kontrak |  f(65)  |                            | REVERT |
| **test_00000004.tx** | Pembuatan kontrak | f(!=65) |                            |  STOP  |
| **test_00000005.tx** | Pembuatan kontrak | f(!=65) | f(65)   | REVERT |
| **test_00000006.tx** | Pembuatan kontrak | f(!=65) | fungsi fallback            | REVERT |

_Ringkasan eksplorasi f(!=65) menunjukkan f dipanggil dengan nilai apa pun yang berbeda dari 65._

Seperti yang dapat Anda perhatikan, Manticore menghasilkan kasus uji unik untuk setiap transaksi yang berhasil atau dikembalikan.

Gunakan flag `--quick-mode` jika Anda ingin eksplorasi kode yang cepat (ini menonaktifkan pendeteksi bug, komputasi gas, ...)

### Memanipulasi kontrak pintar melalui API {#manipulate-a-smart-contract-through-the-api}

Bagian ini menjelaskan secara rinci cara memanipulasi kontrak pintar melalui API Python Manticore. Anda dapat membuat file baru dengan ekstensi python `*.py` dan menulis kode yang diperlukan dengan menambahkan perintah API (dasar-dasarnya akan dijelaskan di bawah) ke dalam file ini, lalu jalankan dengan perintah `$ python3 *.py`. Anda juga dapat menjalankan perintah di bawah ini secara langsung di konsol python, untuk menjalankan konsol gunakan perintah `$ python3`.

### Membuat Akun {#creating-accounts}

Hal pertama yang harus Anda lakukan adalah memulai rantai blok baru dengan perintah berikut:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

Akun non-kontrak dibuat menggunakan [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account):

```python
user_account = m.create_account(balance=1000)
```

Kontrak Solidity dapat diterapkan menggunakan [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract):

```solidity
source_code = '''
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
'''
# Inisiasi kontrak
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### Rangkuman {#summary}

- Anda dapat membuat akun pengguna dan akun kontrak dengan [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) dan [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract).

### Mengeksekusi transaksi {#executing-transactions}

Manticore mendukung dua jenis transaksi:

- Transaksi mentah: semua fungsi dieksplorasi
- Transaksi bernama: hanya satu fungsi yang dieksplorasi

#### Transaksi mentah {#raw-transaction}

Transaksi mentah dieksekusi menggunakan [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction):

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

Pemanggil, alamat, data, atau nilai transaksi bisa berupa konkret atau simbolik:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) membuat nilai simbolik.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) membuat array byte simbolik.

Sebagai contoh:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

Jika data bersifat simbolik, Manticore akan menjelajahi semua fungsi kontrak selama eksekusi transaksi. Akan sangat membantu jika Anda melihat penjelasan Fungsi Fallback di artikel [Praktik Langsung Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) untuk memahami cara kerja pemilihan fungsi.

#### Transaksi bernama {#named-transaction}

Fungsi dapat dieksekusi melalui namanya.
Untuk mengeksekusi `f(uint var)` dengan nilai simbolik, dari user_account, dan dengan 0 ether, gunakan:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

Jika `nilai` transaksi tidak ditentukan, maka secara default nilainya adalah 0.

#### Ringkasan {#summary-1}

- Argumen transaksi dapat berupa konkret atau simbolik
- Transaksi mentah akan menjelajahi semua fungsi
- Fungsi dapat dipanggil berdasarkan namanya

### Ruang Kerja {#workspace}

`m.workspace` adalah direktori yang digunakan sebagai direktori output untuk semua file yang dihasilkan:

```python
print("Results are in {}".format(m.workspace))
```

### Menghentikan Eksplorasi {#terminate-the-exploration}

Untuk menghentikan eksplorasi, gunakan [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize). Tidak ada transaksi lebih lanjut yang boleh dikirim setelah metode ini dipanggil dan Manticore akan menghasilkan kasus uji untuk setiap jalur yang dieksplorasi.

### Ringkasan: Menjalankan di bawah Manticore {#summary-running-under-manticore}

Dengan menggabungkan semua langkah sebelumnya, kita memperoleh:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

print("Results are in {}".format(m.workspace))
m.finalize() # hentikan eksplorasi
```

Semua kode di atas dapat Anda temukan di [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

## Mendapatkan jalur yang melempar {#getting-throwing-paths}

Sekarang kita akan menghasilkan input spesifik untuk jalur yang menimbulkan pengecualian di `f()`. Targetnya masih kontrak pintar berikut [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

```solidity
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### Menggunakan informasi state {#using-state-information}

Setiap jalur yang dieksekusi memiliki state rantai bloknya sendiri. Sebuah state bisa siap (ready) atau dimatikan (killed), artinya ia mencapai instruksi THROW atau REVERT:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): daftar state yang siap (mereka tidak mengeksekusi REVERT/INVALID)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): daftar state yang dimatikan
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): semua state

```python
for state in m.all_states:
    # lakukan sesuatu dengan state
```

Anda dapat mengakses informasi state. Sebagai contoh:

- `state.platform.get_balance(account.address)`: saldo akun
- `state.platform.transactions`: daftar transaksi
- `state.platform.transactions[-1].return_data`: data yang dikembalikan oleh transaksi terakhir

Data yang dikembalikan oleh transaksi terakhir adalah sebuah array, yang dapat diubah menjadi nilai dengan ABI.deserialize, contohnya:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### Cara menghasilkan kasus uji {#how-to-generate-testcase}

Gunakan [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) untuk menghasilkan kasus uji:

```python
m.generate_testcase(state, 'BugFound')
```

### Ringkasan {#summary-2}

- Anda dapat melakukan iterasi pada state dengan m.all_states
- `state.platform.get_balance(account.address)` mengembalikan saldo akun
- `state.platform.transactions` mengembalikan daftar transaksi
- `transaction.return_data` adalah data yang dikembalikan
- `m.generate_testcase(state, name)` menghasilkan input untuk state

### Ringkasan: Mendapatkan Jalur yang Melempar {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## Periksa apakah eksekusi berakhir dengan REVERT atau INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

Semua kode di atas dapat Anda temukan di [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

_Catatan: kita bisa saja menghasilkan skrip yang jauh lebih sederhana, karena semua state yang dikembalikan oleh terminated_state memiliki REVERT atau INVALID sebagai hasilnya: contoh ini hanya dimaksudkan untuk mendemonstrasikan cara memanipulasi API._

## Menambahkan batasan {#adding-constraints}

Kita akan melihat cara membatasi eksplorasi. Kita akan membuat asumsi bahwa dokumentasi `f()` menyatakan bahwa fungsi tersebut tidak pernah dipanggil dengan `a == 65`, jadi bug apa pun dengan `a == 65` bukanlah bug yang sebenarnya. Targetnya masih kontrak pintar berikut [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

```solidity
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### Operator {#operators}

Modul [Operator](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) memfasilitasi manipulasi batasan, antara lain menyediakan:

- Operators.AND,
- Operators.OR,
- Operators.UGT (unsigned lebih besar dari),
- Operators.UGE (unsigned lebih besar dari atau sama dengan),
- Operators.ULT (unsigned lebih kecil dari),
- Operators.ULE (unsigned lebih kecil dari atau sama dengan).

Untuk mengimpor modul, gunakan yang berikut:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` digunakan untuk menggabungkan (concatenate) array dengan sebuah nilai. Misalnya, return_data dari sebuah transaksi perlu diubah menjadi nilai untuk diperiksa terhadap nilai lain:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### Batasan {#state-constraint}

Anda dapat menggunakan batasan secara global atau untuk state tertentu.

#### Batasan global {#state-constraint}

Gunakan `m.constrain(constraint)` untuk menambahkan batasan global.
Misalnya, Anda dapat memanggil kontrak dari alamat simbolik, dan membatasi alamat ini ke nilai-nilai spesifik:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### Batasan state {#state-constraint}

Gunakan [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) untuk menambahkan batasan ke state tertentu.
Ini dapat digunakan untuk membatasi state setelah eksplorasi untuk memeriksa beberapa properti di dalamnya.

### Memeriksa Batasan {#checking-constraint}

Gunakan `solver.check(state.constraints)` untuk mengetahui apakah suatu batasan masih layak.
Misalnya, yang berikut ini akan membatasi symbolic_value agar berbeda dari 65 dan memeriksa apakah state tersebut masih layak:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # state layak
```

### Ringkasan: Menambahkan Batasan {#summary-adding-constraints}

Menambahkan batasan ke kode sebelumnya, kita memperoleh:

```python
from manticore.ethereum import ManticoreEVM
from manticore.core.smtlib.solver import Z3Solver

solver = Z3Solver.instance()

m = ManticoreEVM()

with open("example.sol") as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

no_bug_found = True

## Periksa apakah eksekusi berakhir dengan REVERT atau INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # kita tidak mempertimbangkan jalur di mana a == 65
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Bug found, results are in {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'No bug found')
```

Semua kode di atas dapat Anda temukan di [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)
