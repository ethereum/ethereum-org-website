---
title: Cara menggunakan Manticore untuk menemukan bug dalam kontrak pintar
description: Cara menggunakan Manticore untuk menemukan bug dalam kontrak pintar secara otomatis
author: Trailofbits
lang: id
tags:
  - "solidity"
  - "kontrak pintar"
  - "keamanan"
  - "pengujian"
  - "verifikasi formal"
skill: advanced
published: 2020-01-13
source: Membuat kontrak yang aman
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

Tujuan tutorial ini adalah menunjukkan cara menggunakan Manticore untuk menemukan bug dalam kontrak pintar secara otomatis.

## Instalasi {#installation}

Manticore memerlukan versi >= python 3.6. Itu bisa diinstal melalui pip atau docker.

### Manticore melalui docker {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Perintah terakhirnya menjalankan kotak peralatan keamanan eth di dalam docker yang memiliki akses ke direktori Anda saat ini. Anda bisa mengubah file dari host Anda, dan menjalankan peralatannya pada file dari docker_

Dalam docker, jalankan:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Manticore melalui pip {#manticore-through-pip}

```bash
pip3 install --user manticore
```

solc 0.5.11 disarankan untuk ini.

### Menjalankan skrip {#running-a-script}

Untuk menjalankan skrip python dengan python 3:

```bash
python3 script.py
```

## Pengantar eksekusi simbolis dinamis {#introduction-to-dynamic-symbolic-execution}

### Eksekusi Simbolis Dinamis Secara Singkat {#dynamic-symbolic-execution-in-a-nutshell}

Eksekusi simbolis dinamis (DSE) adalah teknik analisis program yang menjelajah ruang state dengan kesadaran semantik tingkat tinggi. Teknik ini didasarkan pada penemuan "jalur program", yang direpresentasikan sebagai formula matematika yang disebut `predikat jalur`. Secara konsep, teknik ini beroperasi pada predikat jalur dalam dua langkah:

1. Predikat dibuat menggunakan batasan pada input program.
2. Predikat dibuat untuk menghasilkan input program yang akan menyebabkan eksekusi jalur yang terkait.

Pendekatan ini tidak menghasilkan false positive, dalam arti semua state program teridentifikasi bisa dipicu saat eksekusi konkretnya. Sebagai contoh, jika analisis menemukan sebuah integer overflow, ini dipastikan dapat dibuat kembali.

### Contoh Predikat Jalur {#path-predicate-example}

Untuk mendapatkan wawasan tentang cara kerja DSE, perhatikan contoh berikut:

```solidity
function f(uint a){

  if (a == 65) {
      // Satu bug ditemukan
  }

}
```

Karena `f()` berisi dua jalur, DSE akan membangun dua predikat jalur berbeda:

- Jalur 1: `a == 65`
- Jalur 2: `Not (a == 65)`

Setiap predikat jalur adalah formula matematika yang bisa diberikan ke [solver SMT](https://wikipedia.org/wiki/Satisfiability_modulo_theories), yang akan mencoba menyelesaikan persamaannya. Untuk `Jalur 1`, solver akan berkata bahwa jalurnya bisa dijelajahi dengan `a = 65`. Untuk `Jalur 2`, solver bisa memberi `a` nilai apa saja selain dari 65, contohnya `a = 0`.

### Memverifikasi properti {#verifying-properties}

Manticore memungkinkan kontrol penuh atas semua eksekusi masing-masing jalur. Sebagai hasilnya, memungkinkan Anda menambahkan batasan arbitrari ke hampir semua hal. Kontrol ini memungkinkan pembuatan properti pada kontrak.

Perhatikan contoh berikut:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // tidak ada perlindungan terhadap overflow
  return c;
}
```

Di sini hanya ada satu jalur untuk dijelajahi dalam fungsi:

- Jalur 1: `c = a + b`

Dengan menggunakan Manticore, Anda bisa memeriksa overflow, dan menambahkan batasan ke predikat jalur:

- `c = a + b AND (c < a OR c < b)`

Jika memungkinkan untuk menemukan valuasi dari `a` dan `b` di mana predikat jalur bisa dilakukan, itu berarti Anda telah menemukan overflow. Sebagai contoh solver bisa menghasilkan input `a = 10, b = MAXUINT256`.

Jika Anda mempertimbangkan versi tetapnya:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

Formula yang terkait dengan pemeriksaan overflow akan menjadi:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

Formula ini tidak bisa diselesaikan; dengan kata lain ini adalah **bukti** bahwa dalam `safe_add`, `c` akan selalu bertambah.

Dengan demikian, DSE adalah peralatan yang efektif yang bisa memverifikasi batasan arbitrari pada kode Anda.

## Menjalankan dengan Manticore {#running-under-manticore}

Kita akan melihat cara menjelajahi kontrak pintar dengan API Manticore. Targetnya adalah kontrak pintar [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol) berikut ini:

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

### Menjalankan penjelajahan mandiri {#run-a-standalone-exploration}

Anda bisa menjalankan Manticore secara langsung pada kontrak pintar dengan mengikuti perintah berikut (`proyek` bisa berupa File Solidity, atau direktori proyek):

```bash
manticore project
```

Anda akan mendapatkan output kasus percobaan seperti yang satu ini (urutannya bisa berubah):

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

Tanpa infromasi tambahan, Manticore akan menjelajahi kontrak dengan transaksi simbolis baru sampai tidak lagi menjelajahi jalur baru pada kontrak. Manticore tidak menjalankan transaksi baru setelah satu transaksi gagal (contohnya: setelah pembalikan).

Manticore akan menghasilkan output informasi dalam direktori `mcore_*`. Di antaranya, Anda akan menemukan ini dalam direktori:

- `global.summary`: peringatan cakupan dan pengompilasi
- `test_XXXXX.summary`: cakupan, instruksi terakhir, saldo akun per kasus percobaan
- `test_XXXXX.tx`: daftar mendetail transaksi per kasus percobaan

Di sini Manticore menemukan 7 kasus percobaan, yang sesuai dengan (urutan nama filenya mungkin berubah):

|                      |    Transaksi 0    |   Transaksi 1   | Transaksi 2     | Hasil  |
| :------------------: | :---------------: | :-------------: | --------------- | :----: |
| **test_00000000.tx** | Pembuatan kontrak |     f(!=65)     | f(!=65)         |  STOP  |
| **test_00000001.tx** | Pembuatan kontrak | fungsi fallback |                 | REVERT |
| **test_00000002.tx** | Pembuatan kontrak |                 |                 | RETURN |
| **test_00000003.tx** | Pembuatan kontrak |      f(65)      |                 | REVERT |
| **test_00000004.tx** | Pembuatan kontrak |     f(!=65)     |                 |  STOP  |
| **test_00000005.tx** | Pembuatan kontrak |     f(!=65)     | f(65)           | REVERT |
| **test_00000006.tx** | Pembuatan kontrak |     f(!=65)     | fungsi fallback | REVERT |

_Ringkasan penjelejahan f(!=65) berarti f dipanggil dengan nilai apa saja yang berbeda dari 65._

Seperti yang Anda lihat, Manticore menghasilkan kasus percobaan yang unik untuk setiap transaksi yang berhasil atau dibalikkan.

Gunakan bendera `--quick-mode` jika Anda mau penjelajahan kode yang cepat (ini mematikan detektor bug, komputasi gas, ...)

### Memanipulasi kontrak pintar lewat API {#manipulate-a-smart-contract-through-the-api}

Bagian ini menjelaskan detail cara memanipulasi kontrak pintar lewat API Python Manticore. Anda bisa membuat file baru dengan ekstensi python `*.py` dan menulis kode yang diperlukan dengan menambahkan perintah API (dasar-dasarnya akan dijelaskan di bawah) ke dalam file lalu menjalankannya dengan perintah `python3 *.py`. Anda juga bisa mengeksekui perintah di bawah ini, langsung ke dalam konsol python; untuk menjalankan konsol gunakan perintah `python3`.

### Membuat Akun {#creating-accounts}

Langkah pertama yang harus Anda lakukan adalah memulai blockchain baru dengan perintah berikut:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

Akun non-kontrak dibuat menggunakan [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account):

```python
user_account = m.create_account(balance=1000)
```

Kontrak Solidity bisa digunakan menggunakan [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract):

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
# Initiate the contract
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### Ringkasan {#summary}

- You can create user and contract accounts with [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) and [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract).

### Mengeksekusi transaksi {#executing-transactions}

Manticore mendukung dua jenis transaksi:

- Transaksi mentah: semua fungsi dijelajahi
- Transaksi bernama: hanya satu fungsi dijelajahi

#### Transaksi mentah {#raw-transaction}

Satu transaksi mentah dieksekusi menggunakan [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction):

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

Pemanggil, alamat, data, atau nilai transaksi bisa berbentuk baik konkret atau simbolis:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) membuat nilai simbolis.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) membuat array bita simbolis.

Sebagai contoh:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

Jika datanya simbolis, Manticore akan menjelajahi semua fungsi kontrak saat eksekusi transaksi. Akan membantu membaca penjelasan Fungsi Fallback dalam artikel [Praktik langsung dengan Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) untuk memahami cara kerja pemilihan fungsi.

#### Transaksi bernama {#named-transaction}

Fungsi bisa dieksekusi melalui namanya. Untuk mengeksekusi `f(uint var)` dengan nilai simbolis, dari user_account, dan dengan 0 ether, gunakan:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

Jika `nilai` transaksi tidak ditentukan, nilainya 0 secara default.

#### Ringkasan {#summary-1}

- Argumen transaksi bisa berbentuk konkret atau simbolis
- Sebuah transaksi mentah akan menjelajahi semua fungsi
- Fungsi bisa dipanggil berdasarkan namanya

### Ruang Kerja {#workspace}

`m.workspace` adalah direktori yang digunakan sebagai direktori output untuk semua file yang dihasilkan:

```python
print("Results are in {}".format(m.workspace))
```

### Akhiri Penjelajahan {#terminate-the-exploration}

Untuk menghentikan penjelajahan gunakan [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize). Tidak ada transaksi berikutnya yang harus dikirimkan setelah metode ini dipanggil dan Manticore menghasilkan kasus percobaan untuk setiap jalur yang dijelajahi.

### Ringkasan: Menjalankan dengan Manticore {#summary-running-under-manticore}

Dengan menggabungkan semua langkah sebelumnya, kita mendapatkan:

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
m.finalize() # stop the exploration
```

Semua kode di atas bisa Anda temukan di [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

## Mendapatkan jalur throwing {#getting-throwing-paths}

Sekarang kita akan membuat input spesifik untuk jalur yang memunculkan pengecualian dalam `f()`. Targetnya masih kontrak pintar [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol) berikut:

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

Tiap jalur yang dieksekusi memiliki state blockchainnya. Sebuah state bisa berstatus siap atau dimatikan, artinya bahwa state menjangkau instruksi THROW atau REVERT:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): daftar state yang berstatus siap (mereka tidak mengeksekusi REVERT/INVALID)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): daftar state yang dimatikan
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): semua state

```python
for state in m.all_states:
    # do something with state
```

Anda bisa mengakses informasi state. Sebagai contoh:

- `state.platform.get_balance(account.address)`: saldo akun
- `state.platform.transactions`: daftar traksaksi
- `state.platform.transactions[-1].return_data`: data yang dikembalikan oleh transaksi terakhir

Data yang dikembalikan oleh transaksi terakhir adalah sebuah array, yang bisa diubah ke nilai dengan ABI.deserialize, contohnya:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### Cara menghasilkan kasus percobaan {#how-to-generate-testcase}

Gunakan [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) untuk menghasilkan kasus percobaan:

```python
m.generate_testcase(state, 'BugFound')
```

### Ringkasan {#summary-2}

- Anda bisa mengulangi state dengan m.all_states
- `state.platform.get_balance(account.address)` mengembalikan saldo akun
- `state.platform.transactions` mengembalikan daftar transaksi
- `transaction.return_data` adalah data yang dikembalikan
- `m.generate_testcase(state, name)` menghasilkan input untuk state

### Ringkasan: Mendapatkan Jalur Throwing {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## Check if an execution ends with a REVERT or INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

Semua kode di atas bisa ditemukan dalam [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

_Ingatlah kita telah menghasilkan skrip yang jauh lebih sederhana, karena semua state yang dikembalikan oleh terminated_state memiliki REVERT atau INVALID di dalam hasilnya: contoh ini hanya untuk menunjukkan cara memanipulasi API._

## Menambahkan batasan {#adding-constraints}

Kita akan melihat cara membatasi penjelajahan. Kita akan membuat asumsi bahwa dokumentasi state `f()` yang fungsinya tidak pernah dipanggil dengan `a == 65`, sehingga bug mana pun dengan `a == 65` bukan bug sebenarnya. Targetnya masih kontrak pintar [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol) berikut:

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

Modul [Operator](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) mendukung manipulasi batasan, antara lain menyediakan:

- Operators.AND,
- Operators.OR,
- Operators.UGT (unsigned greater than),
- Operators.UGE (unsigned greater than or equal to),
- Operators.ULT (unsigned lower than),
- Operators.ULE (unsigned lower than or equal to).

Untuk mengimpor modul gunakan fungsi berikut:

```python
dari Operator impor manticore.core.smtlib
```

`Operators.CONCAT` digunakan untuk menghubungkan array dengan nilai. Contohnya, transaksi return_data perlu diubah ke nilai untuk diperiksa terhadap nilai lainnya:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### Batasan {#state-constraint}

Anda bisa menggunakan batasan secara global atau untuk state tertentu.

#### Batasan global {#state-constraint}

Use `m.constrain(constraint)` to add a global constraint. Contohnya, Anda bisa memanggil kontrak dari alamat simbolis, dan membatasi alamat ini menjadi nilai spesifik:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### Batasan state {#state-constraint}

Gunakan [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) untuk menambahkan batasan ke state tertentu. Ini bisa digunakan untuk membatasi state setelah penjelajahannya untuk memeriksa beberapa properti di dalamnya.

### Memeriksa Batasan {#checking-constraint}

Gunakan `solver.check(state.constraints)` untuk mengetahui apakah batasan masih memungkinkan. Contohnya, fungsi berikut akan membatasi symbolic_value agar berbeda dari 65 dan memeriksa apakah state masih memungkinkan:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # state is feasible
```

### Ringkasan: Menambahkan batasan {#summary-adding-constraints}

Dengan menambahkan batasan ke kode sebelumnya, kita mendapatkan:

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

## Check if an execution ends with a REVERT or INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # we do not consider the path were a == 65
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Bug found, results are in {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'No bug found')
```

Semua kode di atas bisa ditemukan dalam [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)
