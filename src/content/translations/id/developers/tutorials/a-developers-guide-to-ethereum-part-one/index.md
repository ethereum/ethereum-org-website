---
title: Pengantar bagi pengembang Python untuk Ethereum, bagian 1
description: Sebuah pengantar pada pengembangan Ethereum, khususnya berguna untuk mereka yang mengetahui bahasa pemograman Python
author: Marc Garreau
lang: id
tags:
  - "memulai"
  - "python"
  - "blockchain"
  - "web3.py"
skill: beginner
published: 2020-09-08
source: Snake charmers
sourceUrl: https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/
---

Jadi, Anda pernah mendengar hal-hal tentang Ethereum dan siap untuk melanjutkan perjalanan yang menakjubkan memasuki lubang kelinci? Postingan ini akan membahas dengan cepat beberapa dasar-dasar blockchain, lalu membawa Anda berinteraksi dengan node Ethereum yang disimulasi – membaca data blok, memeriksa saldo akun, dan mengirim transaksi. Sepanjang perjalanan, kita akan menyoroti perbedaan antara cara tradisional dalam membuat aplikasi dan paradigma terdesentralisasi baru ini.

## Prasyarat (perangkat lunak) {#soft-prerequisites}

Postingan ini bertujuan agar dapat diakses oleh berbagai pengembang. [Peralatan Python](/developers/docs/programming-languages/python/) akan dilibatkan, tetapi hanya sebagai kendaraan bagi ide – bukan masalah jika Anda bukan seorang pengembang Python. Namun, saya akan membuat beberapa asumsi tentang apa yang telah Anda ketahui, sehingga kita dapat dengan cepat beralih dari informasi rinci Ethereum.

Asumsi:

- Anda dapat menguasai penggunaan terminal,
- Anda telah menulis beberapa baris kode Python,
- Versi Python 3.6 atau yang lebih baru diinstal di mesin Anda (penggunaan [lingkungan virtual](https://realpython.com/effective-python-environment/#virtual-environments) sangat direkomendasikan), dan
- Anda telah menggunakan `pip`, instaler paket Python. Sekali lagi, jika salah satu dari asumsi ini tidak benar, atau Anda tidak berencana untuk membuat kembali kode dalam artikel ini, Anda kemungkinan masih dapat mengikuti penjelasannya dengan baik.

## Blockchain, secara singkat {#blockchains-briefly}

Ada banyak cara untuk mendeskripsikan Ethereum, tetapi pada intinya ini adalah sebuah blockchain. Blockchain terbuat dari kumpulan blok, jadi mari mulai dari sana. Dalam istilah paling sederhana, setiap blok di blockchain Ethereum hanya merupakan beberapa metadata dan sebuah daftar transaksi. Dalam format JSON, itu tampak seperti ini:

```json
{
   "number": 1234567,
   "hash": "0xabc123...",
   "parentHash": "0xdef456...",
   "miner": "0xa1b2c3...",
   ...,
   "transactions": [...]
}
```

Setiap [blok](/developers/docs/blocks/) memiliki rujukan ke blok yang ada sebelumnya; `parentHash` merupakan hash dari blok sebelumnya.

<div class="featured">Catatan: Ethereum selalu memakai <a href="https://wikipedia.org/wiki/Hash_function">fungsi hash</a> untuk menghasilkan nilai ukuran tetap ("hash"). Hash memainkan peran penting di Ethereum, tetapi untuk saat ini Anda bisa menganggapnya sebagai ID unik.</div>

![Diagram yang menggambarkan sebuah blockchain termasuk data di dalam setiap blok](./blockchain-diagram.png)

_Sebuah blockchain pada dasarnya adalah daftar yang terhubung; setiap blok memiliki rujukan ke blok sebelumnya._

Struktur data ini bukanlah hal yang baru, tetapi aturan (maksudnya protokol peer-to-peer) yang mengelola jaringannya itulah yang baru. Tidak ada otoritas terpusat; jaringan rekan sejawat harus berkolaborasi untuk mempertahankan jaringan, dan berkompetisi untuk memutuskan transaksi mana yang dimasukkan ke blok berikutnya. Jadi, ketika Anda ingin mengirim sejumlah uang ke seorang teman, Anda harus menyiarkan transaksi tersebut ke jaringan, lalu menunggunya untuk dimasukkan ke dalam blok berikutnya.

Satu-satunya cara agar blockchain memverifikasi bahwa uang tersebut benar-benar dikirim dari seorang pengguna ke pengguna lainnya adalah dengan menggunakan mata uang asli dari (maksudnya yang dibuat dan dikelola oleh) blockchain tersebut. Di Ethereum, mata uang ini disebut ether, dan blockchain Ethereum hanya berisi catatan saldo akun yang resmi.

## Sebuah paradigma baru {#a-new-paradigm}

Tumpukan teknologi terdesentralisasi yang baru ini telah memunculkan peralatan pengembang yang baru. Peralatan seperti ini ada dalam banyak bahasa pemrograman, tetapi kita akan membahasnya melalui lensa Python. Untuk mengulanginya: meskipun Python bukanlah bahasa pilihan Anda, seharusnya tidak menjadi masalah memahami penjelasan artikel ini.

Para pengembang Python yang ingin berinteraksi dengan Ethereum lebih mungkin untuk menggunakan [Web3.py](https://web3py.readthedocs.io/). Web3.py adalah sebuah pustaka yang sangat menyederhanakan cara Anda terhubung dengan sebuah node Ethereum, lalu mengirim dan menerima data darinya.

<div class="featured">Catatan: "node Ethereum" dan "klien Ethereum" digunakan secara bergantian. Dalam kedua kasus tersebut, ini merujuk pada perangkat lunak yang dijalankan oleh seorang peserta di jaringan Ethereum. Perangkat lunak ini dapat membaca data blok, menerima pembaruan ketika blok baru ditambahkan ke rantai ("ditambang"), menyiarkan transaksi baru, dan banyak lagi.</div>

[Klien Ethereum](/developers/docs/nodes-and-clients/) dapat dikonfigurasi agar dapat dicapai oleh [IPC](https://wikipedia.org/wiki/Inter-process_communication), HTTP, atau Websocket, sehingga Web3.py perlu menyerupai konfigurasi ini. Web3.py merujuk pada opsi koneksi ini sebagai **penyedia**. Anda akan memilih salah satu dari tiga penyedia untuk menghubungkan instance Web3.py dengan node Anda.

![Sebuah diagram menunjukkan bagaimana cara web3.py menggunakan IPC untuk menghubungkan aplikasi Anda dengan node Ethereum](./web3py-and-nodes.png)

_Konfigurasikan node Ethereum dan Web3.py agar berkomunikasi melalui protokol yang sama, misalnya IPC dalam diagram ini._

Setelah Web3.py dikonfigurasikan dengan benar, Anda dapat memulai interaksi dengan blockchain. Berikut adalah beberapa contoh penggunaan Web3.py sebagai pratinjau dari bagian selanjutnya:

```python
# read block data:
w3.eth.get_block('latest')

# send a transaction:
w3.eth.send_transaction({'from': ..., 'to': ..., 'value': ...})
```

## Instalasi {#installation}

Dalam panduan ini, kita hanya akan berkerja di dalam penerjemah Python. Kita tidak akan membuat direktori, file, kelas, atau fungsi apa pun.

<div class="featured">Catatan: Dalam contoh di bawah, perintah yang dimulai dengan `$` dimaksudkan untuk dijalankan dalam terminalnya. (Jangan mengetik `$`, ini hanya menandakan permulaan baris.)</div>

Pertama, instal [IPython](https://ipython.org/) untuk lingkungan ramah pengguna yang dapat dijelajahi. IPython menawarkan penyelesaian tab, di antara fitur lainnya, yang memudahkan untuk melihat apa yang dimungkinkan di Web3.py.

```bash
$ pip install ipython
```

Web3.py dipublikasikan dengan nama `web3`. Instal seperti ini:

```bash
$ pip install web3
```

Satu hal lagi – kita akan mensimulasikan sebuah blockchain nanti, yang memerlukan beberapa dependensi lagi. Anda dapat menginstal itu melalui:

```bash
$ pip install 'web3[tester]'
```

Anda siap untuk langkah berikutnya!

## Putar kotak pasir {#spin-up-a-sandbox}

Buka lingkungan Python yang baru dengan menjalankan `ipython` di terminal Anda. Ini dapat dibandingkan dengan menjalankan `python`, tetapi hadir dengan lebih banyak fitur spesial.

```bash
$ ipython
```

Ini akan mencetak beberapa informasi tentang versi Python dan IPython yang Anda jalankan, maka Anda akan melihat permintaan yang menunggu untuk menerima input:

```python
In [1]:
```

Anda sedang melihat cangkang Python interaktif. Pada dasarnya, ini adalah sandbox untuk dimainkan. If you’ve made it this far, its time to import Web3.py:

```python
In [1]: from web3 import Web3
```

## Memperkenalkan modul Web3 {#introducing-the-web3-module}

Selain menjadi gerbang masuk ke Ethereum, modul [Web3](https://web3py.readthedocs.io/en/stable/overview.html#base-api) menawarkan beberapa fungsi yang praktis. Mari kita telusuri beberapa di antaranya.

Di aplikasi Ethereum, umumnya Anda perlu mengubah denominasi mata uang. Modul Web3 menyediakan beberapa metode pembantu yang sesuai untuk ini: [fromWei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.fromWei) dan [toWei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toWei).

<div class="featured">
Catatan: Komputer terkenal buruk dalam menangani matematika desimal. Untuk menyelesaikan hal ini, pengembang sering menyimpan sejumlah dolar dalam sen. Misalnya, sebuah item dengan harga $5,99 mungkin disimpan dalam basis data sebagai 599.

Pola yang sama digunakan ketika menangani transaksi dalam <b>ether</b>. Namun, alih-alih dua poin desimal, ether memiliki 18! Denominasi ether yang terkecil disebut <b>wei</b>, jadi itulah nilai yang ditetapkan ketika mengirim transaksi.

1 ether = 1000000000000000000 wei

1 wei = 0,000000000000000001 ether

</div>

Cobalah untuk mengubah beberapa nilai ke dan dari wei. Perhatikan bahwa [ada nama untuk banyak denominasi](https://web3py.readthedocs.io/en/stable/examples.html#converting-currency-denominations) di antara ether dan wei. Salah satu yang lebih dikenal di antaranya adalah **gwei**, karena sering menjadi cara mewakili biaya transaksi.

```python
In [2]: Web3.toWei(1, 'ether')
Out[2]: 1000000000000000000

In [3]: Web3.fromWei(500000000, 'gwei')
Out[3]: Decimal('0.5')
```

Metode utilitas lainnya di modul Web3 memasukkan pengubah format data (misalnya, [`toHex`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toHex)), pembantu alamat (misalnya, [`isAddress`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.isAddress)), dan fungsi hash (misalnya, [`keccak`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.keccak)). Beberapa di antaranya akan dibahas nanti dalam seri. Untuk melihat semua metode dan properti yang tersedia, manfaatkan fitur pelengkap otomatis IPython dengan mengetik `Web3`. dan menekan tombol tab dua kali setelah tanda titik.

## Berbicara dengan rantai {#talk-to-the-chain}

Metode praktis memang menarik, tetapi mari beralih ke blockchain. Langkah berikutnya adalah mengonfigurasi Web3.py untuk berkomunikasi dengan node Ethereum. Di sini kita memiliki opsi untuk menggunakan penyedia IPC, HTTP, atau Websocket.

Kita tidak akan menuju ke jalur ini, tetapi contoh dari alur kerja yang lengkap menggunakan Penyedia HTTP mungkin tampak seperti ini:

- Unduh sebuah node Ethereum, misalnya [Geth](https://geth.ethereum.org/).
- Jalankan Geth di salah satu jendela terminal dan tunggu sampai disinkronkan dengan jaringan. Porta HTTP defaultnya adalah `8545`, tetapi ini dapat dikonfigurasi.
- Beri tahu Web3.py untuk terhubung dengan node melalui HTTP, di `localhost:8545`. `w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))`
- Gunakan instance `w3` untuk berinteraksi dengan node.

Sekalipun ini merupakan salah satu cara "nyata" untuk melakukannya, proses sinkronisasi memakan waktu berjam-jam dan tidak diperlukan jika Anda hanya ingin menggunakan lingkungan pengembangan. Web3.py menampilkan penyedia keempat untuk tujuan ini, **EthereumTesterProvider**. Penyedia penguji ini terhubung dengan sebuah node Ethereum yang disimulasikan dengan izin yang longgar dan mata uang palsu untuk dimainkan.

![Sebuah diagram yang menunjukkan EthereumTesterProvider yang menghubungkan aplikasi web3.py Anda dengan sebuah node Ethereum yang disimulasikan](./ethereumtesterprovider.png)

_EthereumTesterProvider terhubung dengan sebuah node yang disimulasikan berguna untuk lingkungan pengembangan yang cepat._

Node yang disimulasikan itu disebut [eth-tester](https://github.com/ethereum/eth-tester) dan kita menginstalnya sebagai bagian dari perintah `pip install web3[tester]`. Mengonfigurasi Web3.py untuk menggunakan penyedia penguji ini semudah:

```python
In [4]: w3 = Web3(Web3.EthereumTesterProvider())
```

Sekarang Anda siap untuk berselancar di atas rantai! Itu bukanlah sesuatu yang dikatakan orang-orang. Saya baru membuat itu. Mari ikuti sebuah tur singkat.

## Tur singkat {#the-quick-tour}

Pertama-tama, pemeriksaan kewarasan:

```python
In [5]: w3.isConnected()
Out[5]: True
```

Karena kita menggunakan penyedia penguji, ini bukanlah tes yang sangat berharga, tetapi jika gagal, kemungkinannya Anda mengetik sesuatu dengan salah ketika membuat instance variabel `w3`. Periksa ulang apakah Anda memasukkan tanda kurung dalam, misalnya, `Web3.EthereumTesterProvider()`.

## Pemberhentian tur #1: [akun](/developers/docs/accounts/) {#tour-stop-1-accounts}

Untuk kemnyamanan, penyedia penguji membuat beberapa akun dan memuatnya terlbih dahulu dengan ether pengujian.

Pertama-tama, mari lihat daftar akun tersebut:

```python
In [6]: w3.eth.accounts
Out[6]: ['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
 '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
 '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69', ...]
```

Jika Anda menjalankan perintah ini, Anda akan melihat sebuah daftar sepuluh string yang dimulai dengan `0x`. Masing-masing merupakan **alamat publik** dan, dalam beberapa cara, sama dengan nomor akun pada akun pemeriksaan. Anda akan memberikan alamat ini kepada seseorang yang ingin mengirim ether kepada Anda.

Seperti yang disebutkan, penyedia penguji telah memasukkan pra-isian ke dalam masing-masing akun ini dengan ether pengujian. Mari cari tahu berapa jumlahnya dalam akun pertama:

```python
In [7]: w3.eth.get_balance(w3.eth.accounts[0])
Out[7]: 1000000000000000000000000
```

Itu berangka nol sangat banyak! Sebelum Anda menuju ke bank palsunya sambil tertawa, coba ingat kembali pelajaran tentang denominasi mata uang dari bagian sebelumnya. Nilai ether diwakilkan dalam denominasi terkecil, wei. Ubah itu ke ether:

```python
In [8]: w3.fromWei(1000000000000000000000000, 'ether')
Out[8]: Decimal('1000000')
```

Satu juta ether pengujian — itu masih tidak terlalu buruk.

## Pemberhentian tur #2: data blok {#tour-stop-2-block-data}

Mari mengintip state dari blockchain yang disimulasikan ini:

```python
In [9]: w3.eth.get_block('latest')
Out[9]: AttributeDict({
   'number': 0,
   'hash': HexBytes('0x9469878...'),
   'parentHash': HexBytes('0x0000000...'),
   ...
   'transactions': []
})
```

Banyak informasi tentang sebuah blok dikembalikan, tetapi hanya beberapa hal yang ditunjukkan di sini:

- Nomor bloknya nol — tidak peduli sudah berapa lama sebelumnya Anda mengonfigurasi penyedia pengujinya. Tidak seperti jaringan Ethereum asli, yang menambang sebuah blok baru kira-kira setiap 15 detik, simulasi ini akan menunggu sampai Anda memberinya beberapa pekerjaan untuk dilakukan.
- `transactions` adalah sebuah daftar kosong, untuk alasan yang sama: kita belum melakukan apa pun. Blok pertama ini merupakan sebuah **blok kosong**, hanya untuk memulai rantainya.
- Perhatikan bahwa `parentHash` hanya merupakan sekelompok bita kosong. Ini menandakan bahwa ini adalah blok pertama dalam rantai, yang juga dikenal sebagai **blok genesis**.

## Pemberhentian tur #3: [transaksi](/developers/docs/transactions/) {#tour-stop-3-transactions}

Kita akan terhenti pada blok nol sampai ada transaksi yang akan ditambang, jadi mari kita memberikannya satu transaksi. Kirim sejumlah ether pengujian dari satu akun ke akun lainnya:

```python
In [10]: tx_hash = w3.eth.send_transaction({
   'from': w3.eth.accounts[0],
   'to': w3.eth.accounts[1],
   'value': w3.toWei(3, 'ether'),
   'gas': 21000
})
```

Ini umumnya merupakan titik di mana Anda akan menunggu selama beberapa detik untuk transaksi Anda ditambang ke dalam sebuah blok baru. Proses penuhnya berlansung seperti ini:

1. Kirimkan sebuah transaksi dan pegang hash transaksinya. Sampai ditambang, transaksinya berstatus "menunggu." `tx_hash = w3.eth.send_transaction({ … })`
2. Tunggu sampai transaksinya ditambang: `w3.eth.wait_for_transaction_receipt(tx_hash)`
3. Lanjutkan logika aplikasi. Untuk melihat transaksi yang berhasil: `w3.eth.get_transaction(tx_hash)`

Lingkungan yang disimulasikan akan menambah transaksi dalam sebuah blok baru dengan segera, sehingga kita dapat dengan segera melihat transaksinya:

```python
In [11]: w3.eth.get_transaction(tx_hash)
Out[11]: AttributeDict({
   'hash': HexBytes('0x15e9fb95dc39...'),
   'blockNumber': 1,
   'transactionIndex': 0,
   'from': '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
   'to': '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
   'value': 3000000000000000000,
   ...
})
```

You’ll see some familiar details here: the `from`, `to`, and `value` fields should match the inputs of our `send_transaction` call. Informasi kecil lainnya yang meyakinkan adalah bahwa transaksi ini dimasukkan sebagai transaksi pertama (`'transactionIndex': 0`) dalam blok nomor 1.

Kita juga dapat dengan mudah memverifikasi keberhasilan transaksi ini dengan memeriksa saldo kedua akun yang terlibat. Tiga ether akan berpindah dari satu akun ke akun lainnya.

```python
In [12]: w3.eth.get_balance(w3.eth.accounts[0])
Out[12]: 999996999999999999969000

In [13]: w3.eth.get_balance(w3.eth.accounts[1])
Out[13]: 1000003000000000000000000
```

Yang terakhir ini tampak baik! Saldonya bertambah dari 1.000.000 ke 1.000.003 ether. Tapi apa yang terjadi pada akun pertama? Tampaknya telah kehilangan lebih dari tiga ether. Sayangnya, tidak ada yang gratis dalam hidup ini, dan menggunakan jaringan publik Ethereum mengharuskan Anda membayar kompensasi kepada para rekan sejawat Anda untuk peran pendukung mereka. Sejumlah kecil biaya transaksi diambil dari akun yang membuat transaksi sebesar 31000 wei.

<div class="featured">Catatan: Pada jaringan publik, biaya transaksi bervariasi sesuai dengan permintaan jaringan dan seberapa cepat Anda menginginkan sebuah transaksi diproses. Jika Anda tertarik dengan analisa bagaimana biaya dihitung, lihat posting saya sebelumnya tentang <a href="https://medium.com/ethereum-grid/ethereum-101-how-are-transactions-included-in-a-block-9ae5f491853f">bagaimana transaksi dimasukkan ke dalam sebuah blok</a>.</div>

## Dan bernafaslah {#and-breathe}

Kita telah ada di sini untuk beberapa saat, sehingga ini tampaknya tempat yang baik untuk beristirahat sejenak. Perjalanan yang menakjubkan kita terus berlanjut, dan kita akan melanjutkan analisa dalam bagian kedua dari seri panduan ini. Beberapa konsep yang berikutnya akan dibahas: menghubungkan dengan sebuah node asli, kontrak pintar, dan token. Punya pertanyaan tindak lanjut? Beri tahu saya! Umpan balik Anda akan memengaruhi ke mana kita akan pergi dari sini. Permintaan diterima melalui [Twitter](https://twitter.com/wolovim).
