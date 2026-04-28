---
title: Pengantar Ethereum untuk pengembang Python, bagian 1
description: Pengantar pengembangan Ethereum, sangat berguna bagi mereka yang memiliki pengetahuan tentang bahasa pemrograman Python
author: Marc Garreau
lang: id
tags: ["Python", "web3.py"]
skill: beginner
breadcrumb: "Ethereum dengan Python"
published: 2020-09-08
source: Snake charmers
sourceUrl: https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/
---

Jadi, Anda telah mendengar tentang Ethereum ini dan siap untuk menjelajah lebih jauh? Postingan ini akan dengan cepat membahas beberapa dasar blockchain, lalu mengajak Anda berinteraksi dengan node Ethereum yang disimulasikan – membaca data blok, memeriksa saldo akun, dan mengirim transaksi. Sepanjang jalan, kami akan menyoroti perbedaan antara cara tradisional dalam membangun aplikasi dan paradigma terdesentralisasi yang baru ini.

## Prasyarat (ringan) {#soft-prerequisites}

Postingan ini bercita-cita untuk dapat diakses oleh berbagai macam pengembang. [Alat Python](/developers/docs/programming-languages/python/) akan dilibatkan, tetapi alat tersebut hanyalah sarana untuk menyampaikan ide – tidak masalah jika Anda bukan seorang pengembang Python. Namun, saya hanya akan membuat beberapa asumsi tentang apa yang sudah Anda ketahui, sehingga kita dapat dengan cepat beralih ke bagian khusus Ethereum.

Asumsi:

- Anda dapat menggunakan terminal,
- Anda telah menulis beberapa baris kode Python,
- Python versi 3.6 atau yang lebih baru telah terinstal di mesin Anda (penggunaan [lingkungan virtual](https://realpython.com/effective-python-environment/#virtual-environments) sangat disarankan), dan
- Anda telah menggunakan `pip`, penginstal paket Python.
  Sekali lagi, jika salah satu dari hal ini tidak benar, atau Anda tidak berencana untuk mereproduksi kode dalam artikel ini, Anda kemungkinan besar masih dapat mengikutinya dengan baik.

## Singkat tentang blockchain {#blockchains-briefly}

Ada banyak cara untuk mendeskripsikan Ethereum, tetapi pada intinya adalah sebuah blockchain. Blockchain terdiri dari serangkaian blok, jadi mari kita mulai dari sana. Dalam istilah yang paling sederhana, setiap blok di blockchain Ethereum hanyalah beberapa metadata dan daftar transaksi. Dalam format JSON, tampilannya kira-kira seperti ini:

```json
{
   "number": 1234567,
   "hash": "0xabc123...",
   "parentHash": "0xdef456...",
   ...,
   "transactions": [...]
}
```

Setiap [blok](/developers/docs/blocks/) memiliki referensi ke blok yang mendahuluinya; `parentHash` hanyalah hash dari blok sebelumnya.

<FeaturedText>Catatan: Ethereum secara teratur menggunakan <a href="https://wikipedia.org/wiki/Hash_function">fungsi hash</a> untuk menghasilkan nilai berukuran tetap ("hash"). Hash memainkan peran penting di Ethereum, tetapi untuk saat ini Anda dapat menganggapnya sebagai ID unik.</FeaturedText>

![Diagram yang menggambarkan blockchain termasuk data di dalam setiap blok](./blockchain-diagram.png)

_Blockchain pada dasarnya adalah daftar tertaut; setiap blok memiliki referensi ke blok sebelumnya._

Struktur data ini bukanlah hal yang baru, tetapi aturan (yaitu, protokol peer-to-peer) yang mengatur jaringan adalah hal yang baru. Tidak ada otoritas pusat; jaringan rekanan (peers) harus berkolaborasi untuk mempertahankan jaringan, dan bersaing untuk memutuskan transaksi mana yang akan dimasukkan ke dalam blok berikutnya. Jadi, ketika Anda ingin mengirim sejumlah uang kepada seorang teman, Anda harus menyiarkan transaksi tersebut ke jaringan, lalu menunggu hingga transaksi tersebut dimasukkan ke dalam blok yang akan datang.

Satu-satunya cara bagi blockchain untuk memverifikasi bahwa uang benar-benar dikirim dari satu pengguna ke pengguna lain adalah dengan menggunakan mata uang asli (yaitu, dibuat dan diatur oleh) blockchain tersebut. Di Ethereum, mata uang ini disebut ether, dan blockchain Ethereum berisi satu-satunya catatan resmi saldo akun.

## Paradigma baru {#a-new-paradigm}

Tumpukan teknologi terdesentralisasi yang baru ini telah melahirkan alat pengembang baru. Alat semacam itu ada dalam banyak bahasa pemrograman, tetapi kita akan melihatnya melalui lensa Python. Untuk mengulangi: meskipun Python bukan bahasa pilihan Anda, seharusnya tidak akan terlalu sulit untuk mengikutinya.

Pengembang Python yang ingin berinteraksi dengan Ethereum kemungkinan besar akan menggunakan [Web3.py](https://web3py.readthedocs.io/). Web3.py adalah pustaka yang sangat menyederhanakan cara Anda terhubung ke node Ethereum, lalu mengirim dan menerima data darinya.

<FeaturedText>Catatan: "Node Ethereum" dan "klien Ethereum" digunakan secara bergantian. Dalam kedua kasus tersebut, ini merujuk pada perangkat lunak yang dijalankan oleh peserta dalam jaringan Ethereum. Perangkat lunak ini dapat membaca data blok, menerima pembaruan saat blok baru ditambahkan ke rantai, menyiarkan transaksi baru, dan banyak lagi. Secara teknis, klien adalah perangkat lunaknya, node adalah komputer yang menjalankan perangkat lunak tersebut.</FeaturedText>

[Klien Ethereum](/developers/docs/nodes-and-clients/) dapat dikonfigurasi agar dapat dijangkau oleh [IPC](https://wikipedia.org/wiki/Inter-process_communication), HTTP, atau Websockets, sehingga Web3.py perlu mencerminkan konfigurasi ini. Web3.py menyebut opsi koneksi ini sebagai **penyedia (providers)**. Anda harus memilih salah satu dari tiga penyedia untuk menautkan instans Web3.py dengan node Anda.

![Diagram yang menunjukkan bagaimana web3.py menggunakan IPC untuk menghubungkan aplikasi Anda ke node Ethereum](./web3py-and-nodes.png)

_Konfigurasikan node Ethereum dan Web3.py untuk berkomunikasi melalui protokol yang sama, mis., IPC dalam diagram ini._

Setelah Web3.py dikonfigurasi dengan benar, Anda dapat mulai berinteraksi dengan blockchain. Berikut adalah beberapa contoh penggunaan Web3.py sebagai pratinjau dari apa yang akan datang:

```python
# read block data: # membaca data blok:
w3.eth.get_block('latest')

# send a transaction: # mengirim transaksi:
w3.eth.send_transaction({'from': ..., 'to': ..., 'value': ...})
```

## Instalasi {#installation}

Dalam panduan ini, kita hanya akan bekerja di dalam interpreter Python. Kita tidak akan membuat direktori, file, kelas, atau fungsi apa pun.

<FeaturedText>Catatan: Dalam contoh di bawah ini, perintah yang dimulai dengan `$` dimaksudkan untuk dijalankan di terminal. (Jangan ketik `$`, itu hanya menandakan awal baris.)</FeaturedText>

Pertama, instal [IPython](https://ipython.org/) untuk lingkungan yang ramah pengguna untuk dijelajahi. IPython menawarkan penyelesaian tab, di antara fitur-fitur lainnya, sehingga jauh lebih mudah untuk melihat apa yang mungkin dilakukan di dalam Web3.py.

```bash
pip install ipython
```

Web3.py diterbitkan dengan nama `web3`. Instal seperti ini:

```bash
pip install web3
```

Satu hal lagi – kita akan menyimulasikan blockchain nanti, yang membutuhkan beberapa dependensi lagi. Anda dapat menginstalnya melalui:

```bash
pip install 'web3[tester]'
```

Anda sudah siap untuk memulai!

Catatan: Paket `web3[tester]` berfungsi hingga Python 3.10.xx

## Menjalankan sandbox {#spin-up-a-sandbox}

Buka lingkungan Python baru dengan menjalankan `ipython` di terminal Anda. Ini sebanding dengan menjalankan `python`, tetapi dilengkapi dengan lebih banyak fitur tambahan.

```bash
ipython
```

Ini akan mencetak beberapa informasi tentang versi Python dan IPython yang Anda jalankan, lalu Anda akan melihat prompt yang menunggu input:

```python
In [1]:
```

Anda sedang melihat shell Python interaktif sekarang. Pada dasarnya, ini adalah sandbox untuk bermain. Jika Anda telah berhasil sejauh ini, saatnya untuk mengimpor Web3.py:

```python
In [1]: from web3 import Web3
```

## Memperkenalkan modul Web3 {#introducing-the-web3-module}

Selain menjadi gerbang ke Ethereum, modul [Web3](https://web3py.readthedocs.io/en/stable/overview.html#base-api) menawarkan beberapa fungsi kenyamanan. Mari kita jelajahi beberapa di antaranya.

Dalam aplikasi Ethereum, Anda biasanya perlu mengonversi denominasi mata uang. Modul Web3 menyediakan beberapa metode pembantu khusus untuk ini: [from_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.from_wei) dan [to_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_wei).

<FeaturedText>
Catatan: Komputer terkenal buruk dalam menangani matematika desimal. Untuk menyiasatinya, pengembang sering kali menyimpan jumlah dolar dalam sen. Misalnya, barang dengan harga $5.99 dapat disimpan dalam basis data sebagai 599.

Pola serupa digunakan saat menangani transaksi dalam <b>ether</b>. Namun, alih-alih dua titik desimal, ether memiliki 18! Denominasi terkecil dari ether disebut <b>wei</b>, jadi itulah nilai yang ditentukan saat mengirim transaksi.

1 ether = 1000000000000000000 wei

1 wei = 0.000000000000000001 ether

</FeaturedText>

Coba konversikan beberapa nilai ke dan dari wei. Perhatikan bahwa [ada nama untuk banyak denominasi](https://web3py.readthedocs.io/en/stable/troubleshooting.html#how-do-i-convert-currency-denominations) di antara ether dan wei. Salah satu yang lebih dikenal di antaranya adalah **gwei**, karena sering kali begitulah biaya transaksi direpresentasikan.

```python
In [2]: Web3.to_wei(1, 'ether')
Out[2]: 1000000000000000000

In [3]: Web3.from_wei(500000000, 'gwei')
Out[3]: Decimal('0.5')
```

Metode utilitas lain pada modul Web3 mencakup pengonversi format data (mis., [`toHex`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toHex)), pembantu alamat (mis., [`isAddress`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.isAddress)), dan fungsi hash (mis., [`keccak`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.keccak)). Banyak dari ini akan dibahas nanti dalam seri ini. Untuk melihat semua metode dan properti yang tersedia, manfaatkan pelengkapan otomatis IPython dengan mengetik `Web3`. dan menekan tombol tab dua kali setelah titik.

## Berbicara dengan rantai {#talk-to-the-chain}

Metode kenyamanan memang menyenangkan, tetapi mari kita beralih ke blockchain. Langkah selanjutnya adalah mengonfigurasi Web3.py untuk berkomunikasi dengan node Ethereum. Di sini kita memiliki opsi untuk menggunakan penyedia IPC, HTTP, atau Websocket.

Kita tidak akan menempuh jalur ini, tetapi contoh alur kerja lengkap menggunakan Penyedia HTTP mungkin terlihat seperti ini:

- Unduh node Ethereum, mis., [Geth](https://geth.ethereum.org/).
- Mulai Geth di satu jendela terminal dan tunggu hingga menyinkronkan jaringan. Port HTTP default adalah `8545`, tetapi dapat dikonfigurasi.
- Beri tahu Web3.py untuk terhubung ke node melalui HTTP, di `localhost:8545`.
  `w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))`
- Gunakan instans `w3` untuk berinteraksi dengan node.

Meskipun ini adalah salah satu cara "nyata" untuk melakukannya, proses sinkronisasi memakan waktu berjam-jam dan tidak perlu jika Anda hanya menginginkan lingkungan pengembangan. Web3.py mengekspos penyedia keempat untuk tujuan ini, yaitu **EthereumTesterProvider**. Penyedia penguji ini menautkan ke node Ethereum yang disimulasikan dengan izin yang dilonggarkan dan mata uang palsu untuk dimainkan.

![Diagram yang menunjukkan EthereumTesterProvider menautkan aplikasi web3.py Anda ke node Ethereum yang disimulasikan](./ethereumtesterprovider.png)

_EthereumTesterProvider terhubung ke node yang disimulasikan dan berguna untuk lingkungan pengembangan yang cepat._

Node yang disimulasikan itu disebut [eth-tester](https://github.com/ethereum/eth-tester) dan kita menginstalnya sebagai bagian dari perintah `pip install web3[tester]`. Mengonfigurasi Web3.py untuk menggunakan penyedia penguji ini semudah:

```python
In [4]: w3 = Web3(Web3.EthereumTesterProvider())
```

Sekarang Anda siap untuk berselancar di rantai! Itu bukan hal yang biasa dikatakan orang. Saya hanya mengarangnya. Mari kita lakukan tur singkat.

## Tur singkat {#the-quick-tour}

Pertama-tama, pemeriksaan kewarasan (sanity check):

```python
In [5]: w3.is_connected()
Out[5]: True
```

Karena kita menggunakan penyedia penguji, ini bukanlah pengujian yang sangat berharga, tetapi jika gagal, kemungkinan besar Anda salah mengetik sesuatu saat membuat instans variabel `w3`. Periksa kembali apakah Anda menyertakan tanda kurung di dalam, yaitu, `Web3.EthereumTesterProvider()`.

## Perhentian tur #1: [akun](/developers/docs/accounts/) {#tour-stop-1-accounts}

Sebagai kemudahan, penyedia penguji membuat beberapa akun dan memuatnya dengan ether pengujian.

Pertama, mari kita lihat daftar akun tersebut:

```python
In [6]: w3.eth.accounts
Out[6]: ['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
 '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
 '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69', ...]
```

Jika Anda menjalankan perintah ini, Anda akan melihat daftar sepuluh string yang dimulai dengan `0x`. Masing-masing adalah **alamat publik** dan, dalam beberapa hal, analog dengan nomor akun pada rekening giro. Anda akan memberikan alamat ini kepada seseorang yang ingin mengirimi Anda ether.

Seperti yang disebutkan, penyedia penguji telah memuat setiap akun ini dengan beberapa ether pengujian. Mari kita cari tahu berapa banyak yang ada di akun pertama:

```python
In [7]: w3.eth.get_balance(w3.eth.accounts[0])
Out[7]: 1000000000000000000000000
```

Itu banyak sekali angka nol! Sebelum Anda tertawa terbahak-bahak ke bank palsu, ingatlah pelajaran tentang denominasi mata uang dari sebelumnya. Nilai ether direpresentasikan dalam denominasi terkecil, wei. Konversikan itu ke ether:

```python
In [8]: w3.from_wei(1000000000000000000000000, 'ether')
Out[8]: Decimal('1000000')
```

Satu juta ether pengujian — masih lumayan.

## Perhentian tur #2: data blok {#tour-stop-2-block-data}

Mari kita intip status dari blockchain yang disimulasikan ini:

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

Banyak informasi yang dikembalikan tentang sebuah blok, tetapi hanya beberapa hal yang perlu ditunjukkan di sini:

- Nomor blok adalah nol — tidak peduli berapa lama yang lalu Anda mengonfigurasi penyedia penguji. Tidak seperti jaringan Ethereum yang sebenarnya, yang menambahkan blok baru setiap 12 detik, simulasi ini akan menunggu hingga Anda memberinya beberapa pekerjaan untuk dilakukan.
- `transactions` adalah daftar kosong, karena alasan yang sama: kita belum melakukan apa pun. Blok pertama ini adalah **blok kosong**, hanya untuk memulai rantai.
- Perhatikan bahwa `parentHash` hanyalah sekumpulan byte kosong. Ini menandakan bahwa ini adalah blok pertama dalam rantai, yang juga dikenal sebagai **blok genesis**.

## Perhentian tur #3: [transaksi](/developers/docs/transactions/) {#tour-stop-3-transactions}

Kita terjebak di blok nol sampai ada transaksi yang tertunda, jadi mari kita berikan satu. Kirim beberapa ether pengujian dari satu akun ke akun lainnya:

```python
In [10]: tx_hash = w3.eth.send_transaction({
   'from': w3.eth.accounts[0],
   'to': w3.eth.accounts[1],
   'value': w3.to_wei(3, 'ether'),
   'gas': 21000
})
```

Ini biasanya adalah titik di mana Anda akan menunggu selama beberapa detik agar transaksi Anda dimasukkan ke dalam blok baru. Proses lengkapnya kira-kira seperti ini:

1. Kirimkan transaksi dan simpan hash transaksi. Sampai blok yang berisi transaksi dibuat dan disiarkan, transaksi tersebut berstatus "tertunda".
   `tx_hash = w3.eth.send_transaction({ … })`
2. Tunggu hingga transaksi dimasukkan ke dalam blok:
   `w3.eth.wait_for_transaction_receipt(tx_hash)`
3. Lanjutkan logika aplikasi. Untuk melihat transaksi yang berhasil:
   `w3.eth.get_transaction(tx_hash)`

Lingkungan simulasi kita akan menambahkan transaksi dalam blok baru secara instan, sehingga kita dapat segera melihat transaksi tersebut:

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

Anda akan melihat beberapa detail yang familier di sini: bidang `from`, `to`, dan `value` harus cocok dengan input dari panggilan `send_transaction` kita. Hal lain yang meyakinkan adalah bahwa transaksi ini dimasukkan sebagai transaksi pertama (`'transactionIndex': 0`) di dalam blok nomor 1.

Kita juga dapat dengan mudah memverifikasi keberhasilan transaksi ini dengan memeriksa saldo dari kedua akun yang terlibat. Tiga ether seharusnya telah berpindah dari satu akun ke akun lainnya.

```python
In [12]: w3.eth.get_balance(w3.eth.accounts[0])
Out[12]: 999996999979000000000000

In [13]: w3.eth.get_balance(w3.eth.accounts[1])
Out[13]: 1000003000000000000000000
```

Yang terakhir terlihat bagus! Saldonya berubah dari 1.000.000 menjadi 1.000.003 ether. Tetapi apa yang terjadi pada akun pertama? Tampaknya telah kehilangan sedikit lebih dari tiga ether. Sayangnya, tidak ada yang gratis dalam hidup ini, dan menggunakan jaringan publik Ethereum mengharuskan Anda memberikan kompensasi kepada rekan-rekan Anda atas peran pendukung mereka. Biaya transaksi kecil dipotong dari akun yang mengirimkan transaksi - biaya ini adalah jumlah gas yang dibakar (21000 unit gas untuk transfer ETH) dikalikan dengan biaya dasar yang bervariasi sesuai dengan aktivitas jaringan ditambah tip yang diberikan kepada validator yang memasukkan transaksi ke dalam blok.

Selengkapnya tentang [gas](/developers/docs/gas/#post-london)

<FeaturedText>Catatan: Di jaringan publik, biaya transaksi bervariasi berdasarkan permintaan jaringan dan seberapa cepat Anda ingin transaksi diproses. Jika Anda tertarik dengan rincian bagaimana biaya dihitung, lihat postingan saya sebelumnya tentang <a href="https://medium.com/ethereum-grid/ethereum-101-how-are-transactions-included-in-a-block-9ae5f491853f">bagaimana transaksi dimasukkan ke dalam blok</a>.</FeaturedText>

## Dan bernapaslah {#and-breathe}

Kita telah melakukan ini untuk sementara waktu, jadi ini sepertinya tempat yang baik untuk beristirahat. Penjelajahan ini terus berlanjut, dan kita akan terus menjelajah di bagian kedua dari seri ini. Beberapa konsep yang akan datang: menghubungkan ke node nyata, kontrak pintar, dan token. Punya pertanyaan lanjutan? Beri tahu saya! Umpan balik Anda akan memengaruhi ke mana kita akan pergi dari sini. Permintaan diterima melalui [Twitter](https://twitter.com/wolovim).