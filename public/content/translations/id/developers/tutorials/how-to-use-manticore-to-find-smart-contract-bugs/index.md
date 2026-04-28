---
title: Cara menggunakan Manticore untuk menemukan bug dalam kontrak pintar
description: Cara menggunakan Manticore untuk secara otomatis menemukan bug dalam kontrak pintar
author: Trailofbits
lang: id
tags:
  ["Solidity", "kontrak pintar", "keamanan", "pengujian", "verifikasi formal"]
skill: advanced
breadcrumb: "Manticore"
published: 2020-01-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

Tujuan dari tutorial ini adalah untuk menunjukkan cara menggunakan Manticore untuk secara otomatis menemukan bug dalam kontrak pintar.

## Instalasi {#installation}

Manticore membutuhkan >= python 3.6. Ini dapat diinstal melalui pip atau menggunakan docker.

### Manticore melalui docker {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/share trailofbits/eth-security-toolbox
```

_Perintah terakhir menjalankan eth-security-toolbox di dalam docker yang memiliki akses ke direktori Anda saat ini. Anda dapat mengubah file dari host Anda, dan menjalankan alat pada file dari docker_

Di dalam docker, jalankan:

```bash
solc-select 0.5.11
cd /share
```

### Manticore melalui pip {#manticore-through-pip}

```bash
pip3 install --user "manticore[native]"
```

solc 0.5.11 direkomendasikan.

### Menjalankan skrip {#running-a-script}

Untuk menjalankan skrip python dengan python 3:

```bash
python3 script.py
```

## Pengantar eksekusi simbolik dinamis {#introduction-to-dynamic-symbolic-execution}

### Singkatnya Eksekusi Simbolik Dinamis {#dynamic-symbolic-execution-in-a-nutshell}

Eksekusi simbolik dinamis (DSE) adalah teknik analisis program yang mengeksplorasi ruang status dengan tingkat kesadaran semantik yang tinggi. Teknik ini didasarkan pada penemuan "jalur program", yang direpresentasikan sebagai rumus matematika yang disebut `path predicates` (predikat jalur). Secara konseptual, teknik ini beroperasi pada predikat jalur dalam dua langkah:

1. Mereka dibangun menggunakan batasan pada input program.
2. Mereka digunakan untuk menghasilkan input program yang akan menyebabkan jalur terkait dieksekusi.

Pendekatan ini tidak menghasilkan positif palsu dalam arti bahwa semua status program yang teridentifikasi dapat dipicu selama eksekusi konkret. Misalnya, jika analisis menemukan integer overflow, hal itu dijamin dapat direproduksi.

### Contoh Predikat Jalur {#path-predicate-example}

Untuk mendapatkan wawasan tentang cara kerja DSE, pertimbangkan contoh berikut:

```solidity
function f(uint a){
  if (a == 65) {
      // A bug is present
  }
}
```

Karena `f()` berisi dua jalur, DSE akan membangun dua predikat jalur yang berbeda:

- Jalur 1: `a == 65`
- Jalur 2: `Not (a == 65)`

Setiap predikat jalur adalah rumus matematika yang dapat diberikan kepada apa yang disebut [SMT solver](https://wikipedia.org/wiki/Satisfiability_modulo_theories), yang akan mencoba menyelesaikan persamaan tersebut. Untuk `Jalur 1`, solver akan mengatakan bahwa jalur tersebut dapat dieksplorasi dengan `a = 65`. Untuk `Jalur 2`, solver dapat memberikan `a` nilai apa pun selain 65, misalnya `a = 0`.

### Memverifikasi properti {#verifying-properties}

Manticore memungkinkan kontrol penuh atas semua eksekusi dari setiap jalur. Akibatnya, ini memungkinkan Anda untuk menambahkan batasan arbitrer ke hampir semua hal. Kontrol ini memungkinkan pembuatan properti pada kontrak.

Pertimbangkan contoh berikut:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b;
  return c;
}
```

Di sini hanya ada satu jalur untuk dieksplorasi dalam fungsi:

- Jalur 1: `c = a + b`

Menggunakan Manticore, Anda dapat memeriksa overflow, dan menambahkan batasan ke predikat jalur:

- `c = a + b AND (c < a OR c < b)`

Jika memungkinkan untuk menemukan penilaian `a` dan `b` di mana predikat jalur di atas layak, itu berarti Anda telah menemukan overflow. Misalnya solver dapat menghasilkan input `a = 10 , b = MAXUINT256`.

Jika Anda mempertimbangkan versi yang diperbaiki:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

Rumus terkait dengan pemeriksaan overflow akan menjadi:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

Rumus ini tidak dapat diselesaikan; dengan kata lain ini adalah **bukti** bahwa dalam `safe_add`, `c` akan selalu meningkat.

Oleh karena itu, DSE adalah alat yang ampuh, yang dapat memverifikasi batasan arbitrer pada kode Anda.

## Menjalankan di bawah Manticore {#running-under-manticore}

Kita akan melihat cara mengeksplorasi kontrak pintar dengan API Manticore. Targetnya adalah kontrak pintar berikut [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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
manticore project
```

Anda akan mendapatkan output dari testcase seperti ini (urutannya mungkin berubah):

```bash
...
...
manticore.core.manticore:INFO: Generated testcase No. 0 - STOP
manticore.core.manticore:INFO: Generated testcase No. 1 - REVERT
manticore.core.manticore:INFO: Generated testcase No. 2 - RETURN
manticore.core.manticore:INFO: Generated testcase No. 3 - REVERT
manticore.core.manticore:INFO: Generated testcase No. 4 - STOP
manticore.core.manticore:INFO: Generated testcase No. 5 - REVERT
manticore.core.manticore:INFO: Generated testcase No. 6 - REVERT
...
```

Tanpa informasi tambahan, Manticore akan mengeksplorasi kontrak dengan transaksi simbolik baru hingga tidak mengeksplorasi jalur baru pada kontrak. Manticore tidak menjalankan transaksi baru setelah transaksi yang gagal (misalnya: setelah revert).

Manticore akan mengeluarkan informasi dalam direktori `mcore_*`. Di antaranya, Anda akan menemukan di direktori ini:

- `global.summary`: cakupan dan peringatan kompiler
- `test_XXXXX.summary`: cakupan, instruksi terakhir, saldo akun per test case
- `test_XXXXX.tx`: daftar detail transaksi per test case

Di sini Manticore menemukan 7 test case, yang sesuai dengan (urutan nama file mungkin berubah):

|                      |   Transaksi 0   |   Transaksi 1   | Transaksi 2     | Hasil |
| :------------------: | :---------------: | :---------------: | ----------------- | :----: |
| **test_00000000.tx** | Pembuatan kontrak |      f(!=65)      | f(!=65)           |  STOP  |
| **test_00000001.tx** | Pembuatan kontrak | fungsi fallback |                   | REVERT |
| **test_00000002.tx** | Pembuatan kontrak |                   |                   | RETURN |
| **test_00000003.tx** | Pembuatan kontrak |       f(65)       |                   | REVERT |
| **test_00000004.tx** | Pembuatan kontrak |      f(!=65)      |                   |  STOP  |
| **test_00000005.tx** | Pembuatan kontrak |      f(!=65)      | f(65)             | REVERT |
| **test_00000006.tx** | Pembuatan kontrak |      f(!=65)      | fungsi fallback | REVERT |

_Ringkasan eksplorasi f(!=65) menunjukkan f dipanggil dengan nilai apa pun yang berbeda dari 65._

Seperti yang dapat Anda perhatikan, Manticore menghasilkan test case unik untuk setiap transaksi yang berhasil atau di-revert.

Gunakan tanda `--quick-mode` jika Anda menginginkan eksplorasi kode yang cepat (ini menonaktifkan detektor bug, komputasi gas, ...)

### Memanipulasi kontrak pintar melalui API {#manipulate-a-smart-contract-through-the-api}

Bagian ini menjelaskan detail cara memanipulasi kontrak pintar melalui API Python Manticore. Anda dapat membuat file baru dengan ekstensi python `*.py` dan menulis kode yang diperlukan dengan menambahkan perintah API (dasar-dasarnya akan dijelaskan di bawah) ke dalam file ini dan kemudian menjalankannya dengan perintah `$ python3 *.py`. Anda juga dapat mengeksekusi perintah di bawah ini secara langsung ke dalam konsol python, untuk menjalankan konsol gunakan perintah `$ python3`.

### Membuat Akun {#creating-accounts}

Hal pertama yang harus Anda lakukan adalah menginisiasi blockchain baru dengan perintah berikut:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

Akun non-kontrak dibuat menggunakan [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account):

```python
user_account = m.create_account(balance=1000)
```

Kontrak Solidity dapat diterapkan menggunakan [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract):

```python
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
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### Ringkasan {#summary}

- Anda dapat membuat akun pengguna dan kontrak dengan [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) dan [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract).

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

Pemanggil, alamat, data, atau nilai transaksi dapat berupa konkret atau simbolik:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) membuat nilai simbolik.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) membuat array byte simbolik.

Misalnya:

```python
symbolic_data = m.make_symbolic_buffer(320)
symbolic_value = m.make_symbolic_value()
m.transaction(caller=user_account,
              address=contract_account,
              data=symbolic_data,
              value=symbolic_value)
```

Jika datanya simbolik, Manticore akan mengeksplorasi semua fungsi kontrak selama eksekusi transaksi. Akan sangat membantu untuk melihat penjelasan Fungsi Fallback di artikel [Hands on the Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) untuk memahami cara kerja pemilihan fungsi.

#### Transaksi bernama {#named-transaction}

Fungsi dapat dieksekusi melalui namanya.
Untuk mengeksekusi `f(uint var)` dengan nilai simbolik, dari user_account, dan dengan 0 ether, gunakan:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

Jika `value` dari transaksi tidak ditentukan, secara default adalah 0.

#### Ringkasan {#summary-1}

- Argumen dari sebuah transaksi dapat berupa konkret atau simbolik
- Transaksi mentah akan mengeksplorasi semua fungsi
- Fungsi dapat dipanggil dengan namanya

### Ruang Kerja {#workspace}

`m.workspace` adalah direktori yang digunakan sebagai direktori output untuk semua file yang dihasilkan:

```python
print("Results are in {}".format(m.workspace))
```

### Mengakhiri Eksplorasi {#terminate-the-exploration}

Untuk menghentikan eksplorasi gunakan [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize). Tidak ada transaksi lebih lanjut yang boleh dikirim setelah metode ini dipanggil dan Manticore menghasilkan test case untuk setiap jalur yang dieksplorasi.

### Ringkasan: Menjalankan di bawah Manticore {#summary-running-under-manticore}

Menyatukan semua langkah sebelumnya, kita mendapatkan:

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
m.finalize() # stop the exploration # hentikan eksplorasi
```

Semua kode di atas dapat Anda temukan di [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

## Mendapatkan jalur yang melempar (throwing paths) {#getting-throwing-paths}

Kita sekarang akan menghasilkan input spesifik untuk jalur yang memunculkan pengecualian di `f()`. Targetnya masih kontrak pintar berikut [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### Menggunakan informasi status {#using-state-information}

Setiap jalur yang dieksekusi memiliki status blockchain-nya. Sebuah status bisa siap (ready) atau dimatikan (killed), yang berarti ia mencapai instruksi THROW atau REVERT:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): daftar status yang siap (mereka tidak mengeksekusi REVERT/INVALID)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): daftar status yang dimatikan
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): semua status

```python
for state in m.all_states:
    # do something with state # lakukan sesuatu dengan state
```

Anda dapat mengakses informasi status. Misalnya:

- `state.platform.get_balance(account.address)`: saldo akun
- `state.platform.transactions`: daftar transaksi
- `state.platform.transactions[-1].return_data`: data yang dikembalikan oleh transaksi terakhir

Data yang dikembalikan oleh transaksi terakhir adalah sebuah array, yang dapat dikonversi menjadi nilai dengan ABI.deserialize, misalnya:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### Cara menghasilkan testcase {#how-to-generate-testcase}

Gunakan [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) untuk menghasilkan testcase:

```python
m.generate_testcase(state, 'BugFound')
```

### Ringkasan {#summary-2}

- Anda dapat melakukan iterasi pada status dengan m.all_states
- `state.platform.get_balance(account.address)` mengembalikan saldo akun
- `state.platform.transactions` mengembalikan daftar transaksi
- `transaction.return_data` adalah data yang dikembalikan
- `m.generate_testcase(state, name)` menghasilkan input untuk status tersebut

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

## Check if an execution ends with a REVERT or INVALID # # Periksa apakah eksekusi berakhir dengan REVERT atau INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

Semua kode di atas dapat Anda temukan di [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

_Catatan kita bisa saja menghasilkan skrip yang jauh lebih sederhana, karena semua status yang dikembalikan oleh terminated_state memiliki REVERT atau INVALID dalam hasilnya: contoh ini hanya dimaksudkan untuk mendemonstrasikan cara memanipulasi API._

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

Modul [Operators](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) memfasilitasi manipulasi batasan, di antaranya menyediakan:

- Operators.AND,
- Operators.OR,
- Operators.UGT (unsigned greater than),
- Operators.UGE (unsigned greater than or equal to),
- Operators.ULT (unsigned lower than),
- Operators.ULE (unsigned lower than or equal to).

Untuk mengimpor modul gunakan yang berikut ini:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` digunakan untuk menggabungkan array ke sebuah nilai. Misalnya, return_data dari sebuah transaksi perlu diubah menjadi nilai untuk diperiksa terhadap nilai lain:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### Batasan {#state-constraint}

Anda dapat menggunakan batasan secara global atau untuk status tertentu.

#### Batasan global {#state-constraint}

Gunakan `m.constrain(constraint)` untuk menambahkan batasan global.
Misalnya, Anda dapat memanggil kontrak dari alamat simbolik, dan membatasi alamat ini menjadi nilai tertentu:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### Batasan status {#state-constraint}

Gunakan [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) untuk menambahkan batasan ke status tertentu.
Ini dapat digunakan untuk membatasi status setelah eksplorasinya untuk memeriksa beberapa properti di dalamnya.

### Memeriksa Batasan {#checking-constraint}

Gunakan `solver.check(state.constraints)` untuk mengetahui apakah suatu batasan masih layak.
Misalnya, berikut ini akan membatasi symbolic_value agar berbeda dari 65 dan memeriksa apakah status tersebut masih layak:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # state is feasible # state memungkinkan
```

### Ringkasan: Menambahkan Batasan {#summary-adding-constraints}

Menambahkan batasan ke kode sebelumnya, kita mendapatkan:

```python
from manticore.ethereum import ManticoreEVM
from manticore.core.smtlib.solver import Z3Solver

solver = Z3Solver.instance()

m = ManticoreEVM()

with open('example.sol') as f:
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

Semua kode di atas dapat Anda temukan di [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)