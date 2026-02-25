---
title: Pengantar bagi pengembang Python untuk Ethereum, bagian 1
description: Pengantar pengembangan Ethereum, yang sangat berguna bagi mereka yang memiliki pengetahuan tentang bahasa pemrograman Python
author: Marc Garreau
lang: id
tags: [ "python", "web3.py" ]
skill: beginner
published: 2020-09-08
source: Snake charmers
sourceUrl: https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/
---

Jadi, Anda pernah mendengar tentang Ethereum dan siap untuk terjun lebih dalam? Pos ini akan membahas beberapa dasar-dasar rantai blok secara singkat, kemudian mengajak Anda berinteraksi dengan simpul Ethereum yang disimulasikan – membaca data blok, memeriksa saldo akun, dan mengirim transaksi. Dalam prosesnya, kami akan menyoroti perbedaan antara cara-cara tradisional dalam membangun aplikasi dan paradigma terdesentralisasi yang baru ini.

## Prasyarat (yang disarankan) {#soft-prerequisites}

Pos ini dirancang agar dapat diakses oleh berbagai kalangan pengembang. [perangkat Python](/developers/docs/programming-languages/python/) akan digunakan, tetapi itu hanyalah sarana untuk menyampaikan gagasan – tidak masalah jika Anda bukan seorang pengembang Python. Akan tetapi, saya akan membuat beberapa asumsi tentang apa yang sudah Anda ketahui, agar kita bisa segera beralih ke bagian-bagian khusus Ethereum.

Asumsi:

- Anda terbiasa menggunakan terminal,
- Anda pernah menulis beberapa baris kode Python,
- Python versi 3.6 atau lebih tinggi terinstal di komputer Anda (penggunaan [lingkungan virtual](https://realpython.com/effective-python-environment/#virtual-environments) sangat disarankan), dan
- Anda pernah menggunakan `pip`, penginstal paket Python.
  Sekali lagi, jika salah satu dari ini tidak berlaku, atau Anda tidak berencana untuk mereproduksi kode dalam artikel ini, Anda kemungkinan besar masih bisa mengikutinya dengan baik.

## Rantai Blok, secara singkat {#blockchains-briefly}

Ada banyak cara untuk mendeskripsikan Ethereum, tetapi intinya adalah sebuah rantai blok. Rantai blok terdiri dari serangkaian blok, jadi mari kita mulai dari sana. Secara sederhana, setiap blok di rantai blok Ethereum hanyalah beberapa metadata dan daftar transaksi. Dalam format JSON, tampilannya akan seperti ini:

```json
{
   "number": 1234567,
   "hash": "0xabc123...",
   "parentHash": "0xdef456...",
   ...,
   "transactions": [...]
}
```

Setiap [blok](/developers/docs/blocks/) memiliki referensi ke blok sebelumnya; `parentHash` hanyalah hash dari blok sebelumnya.

<FeaturedText>Catatan: Ethereum secara teratur menggunakan <a href="https://wikipedia.org/wiki/Hash_function">fungsi hash</a> untuk menghasilkan nilai berukuran tetap ("hash"). Hash memainkan peran penting dalam Ethereum, tetapi untuk saat ini Anda bisa menganggapnya sebagai ID unik.</FeaturedText>

![Diagram yang menggambarkan rantai blok termasuk data di dalam setiap blok](./blockchain-diagram.png)

_Rantai blok pada dasarnya adalah daftar tertaut; setiap blok memiliki referensi ke blok sebelumnya._

Struktur data ini bukanlah hal baru, tetapi aturannya (yaitu, protokol peer-to-peer) yang mengatur jaringan inilah yang baru. Tidak ada otoritas pusat; jaringan peer harus berkolaborasi untuk menopang jaringan, dan bersaing untuk memutuskan transaksi mana yang akan dimasukkan ke dalam blok berikutnya. Jadi, ketika Anda ingin mengirim sejumlah uang kepada teman, Anda harus menyiarkan transaksi itu ke jaringan, lalu menunggunya untuk dimasukkan ke dalam blok yang akan datang.

Satu-satunya cara bagi rantai blok untuk memverifikasi bahwa uang benar-benar dikirim dari satu pengguna ke pengguna lain adalah dengan menggunakan mata uang asli (yaitu, yang dibuat dan diatur oleh) rantai blok tersebut. Di Ethereum, mata uang ini disebut ether, dan rantai blok Ethereum berisi satu-satunya catatan resmi saldo akun.

## Paradigma baru {#a-new-paradigm}

Tumpukan teknologi terdesentralisasi yang baru ini telah melahirkan perangkat pengembang baru. Perangkat semacam itu ada di banyak bahasa pemrograman, tetapi kita akan melihatnya dari sudut pandang Python. Sebagai penegasan: bahkan jika Python bukan bahasa pilihan Anda, seharusnya tidak akan sulit untuk mengikutinya.

Pengembang Python yang ingin berinteraksi dengan Ethereum kemungkinan besar akan menggunakan [Web3.py](https://web3py.readthedocs.io/). Web3.py adalah pustaka yang sangat menyederhanakan cara Anda terhubung ke simpul Ethereum, lalu mengirim dan menerima data darinya.

<FeaturedText>Catatan: “Simpul Ethereum” dan “klien Ethereum” digunakan secara bergantian. Dalam kedua kasus tersebut, ini merujuk pada perangkat lunak yang dijalankan oleh seorang peserta di jaringan Ethereum. Perangkat lunak ini dapat membaca data blok, menerima pembaruan saat blok baru ditambahkan ke rantai, menyiarkan transaksi baru, dan banyak lagi. Secara teknis, klien adalah perangkat lunaknya, sedangkan simpul adalah komputer yang menjalankan perangkat lunak tersebut.</FeaturedText>

[Klien Ethereum](/developers/docs/nodes-and-clients/) dapat dikonfigurasi agar dapat dijangkau oleh [IPC](https://wikipedia.org/wiki/Inter-process_communication), HTTP, atau Websocket, sehingga Web3.py perlu mencerminkan konfigurasi ini. Web3.py menyebut opsi koneksi ini sebagai **provider**. Anda harus memilih salah satu dari tiga provider untuk menghubungkan instance Web3.py dengan simpul Anda.

![Diagram yang menunjukkan bagaimana web3.py menggunakan IPC untuk menghubungkan aplikasi Anda ke simpul Ethereum](./web3py-and-nodes.png)

_Konfigurasikan simpul Ethereum dan Web3.py untuk berkomunikasi melalui protokol yang sama, mis., IPC dalam diagram ini._

Setelah Web3.py dikonfigurasi dengan benar, Anda dapat mulai berinteraksi dengan rantai blok. Berikut adalah beberapa contoh penggunaan Web3.py sebagai pratinjau dari apa yang akan dibahas selanjutnya:

```python
# baca data blok:
w3.eth.get_block('latest')

# kirim transaksi:
w3.eth.send_transaction({'from': ..., 'to': ..., 'value': ...})
```

## Instalasi {#installation}

Dalam panduan ini, kita hanya akan bekerja di dalam interpreter Python. Kita tidak akan membuat direktori, file, kelas, atau fungsi apa pun.

<FeaturedText>Catatan: Dalam contoh di bawah, perintah yang diawali dengan `$` dimaksudkan untuk dijalankan di terminal. (Jangan ketik tanda `$`, itu hanya menandakan awal baris.)</FeaturedText>

Pertama, instal [IPython](https://ipython.org/) untuk lingkungan yang ramah pengguna untuk dijelajahi. IPython menawarkan pelengkapan tab, di antara fitur-fitur lainnya, yang membuatnya lebih mudah untuk melihat apa saja yang mungkin dilakukan di dalam Web3.py.

```bash
pip install ipython
```

Web3.py diterbitkan dengan nama `web3`. Instal seperti ini:

```bash
pip install web3
```

Satu hal lagi – kita akan menyimulasikan rantai blok nanti, yang memerlukan beberapa dependensi lagi. Anda dapat menginstalnya melalui:

```bash
pip install 'web3[tester]'
```

Anda sudah siap!

Catatan: Paket `web3[tester]` berfungsi hingga Python 3.10.xx

## Menjalankan sandbox {#spin-up-a-sandbox}

Buka lingkungan Python baru dengan menjalankan `ipython` di terminal Anda. Ini sebanding dengan menjalankan `python`, tetapi hadir dengan lebih banyak fitur tambahan.

```bash
ipython
```

Ini akan mencetak beberapa informasi tentang versi Python dan IPython yang Anda jalankan, kemudian Anda akan melihat prompt yang menunggu masukan:

```python
In [1]:
```

Anda sekarang sedang melihat shell Python interaktif. Pada dasarnya, ini adalah sandbox untuk bereksperimen. Jika Anda sudah sampai sejauh ini, sekarang saatnya mengimpor Web3.py:

```python
In [1]: from web3 import Web3
```

## Memperkenalkan modul Web3 {#introducing-the-web3-module}

Selain menjadi gerbang ke Ethereum, modul [Web3](https://web3py.readthedocs.io/en/stable/overview.html#base-api) menawarkan beberapa fungsi praktis. Mari kita jelajahi beberapa di antaranya.

Dalam aplikasi Ethereum, Anda biasanya perlu mengonversi denominasi mata uang. Modul Web3 menyediakan beberapa metode bantuan hanya untuk ini: [from_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.from_wei) dan [to_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_wei).

<FeaturedText>
Catatan: Komputer terkenal buruk dalam menangani matematika desimal. Untuk mengatasi hal ini, pengembang sering menyimpan jumlah dolar dalam sen. Misalnya, item dengan harga $5,99 dapat disimpan di basis data sebagai 599.

Pola serupa digunakan saat menangani transaksi dalam <b>ether</b>. Namun, alih-alih dua angka desimal, ether memiliki 18! Denominasi terkecil dari ether disebut <b>wei</b>, jadi itulah nilai yang ditentukan saat mengirim transaksi.

1 ether = 1.000.000.000.000.000.000 wei

1 wei = 0,000000000000000001 ether

</FeaturedText>

Cobalah mengonversi beberapa nilai ke dan dari wei. Perhatikan bahwa [ada nama untuk banyak denominasi](https://web3py.readthedocs.io/en/stable/troubleshooting.html#how-do-i-convert-currency-denominations) di antara ether dan wei. Salah satu yang lebih dikenal di antaranya adalah **gwei**, karena sering kali digunakan untuk merepresentasikan biaya transaksi.

```python
In [2]: Web3.to_wei(1, 'ether')
Out[2]: 1000000000000000000

In [3]: Web3.from_wei(500000000, 'gwei')
Out[3]: Decimal('0.5')
```

Metode utilitas lain pada modul Web3 termasuk pengonversi format data (mis., [`toHex`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toHex)), pembantu alamat (mis., [`isAddress`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.isAddress)), dan fungsi hash (mis., [`keccak`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.keccak)). Banyak di antaranya akan dibahas nanti dalam seri ini. Untuk melihat semua metode dan properti yang tersedia, manfaatkan pelengkapan otomatis IPython dengan mengetik `Web3`. dan menekan tombol tab dua kali setelah titik.

## Berinteraksi dengan rantai {#talk-to-the-chain}

Metode-metode praktis tersebut memang bagus, tetapi mari kita lanjutkan ke rantai blok. Langkah berikutnya adalah mengonfigurasi Web3.py untuk berkomunikasi dengan simpul Ethereum. Di sini kita memiliki opsi untuk menggunakan provider IPC, HTTP, atau Websocket.

Kita tidak akan menempuh jalur ini, tetapi contoh alur kerja lengkap menggunakan Provider HTTP mungkin akan terlihat seperti ini:

- Unduh simpul Ethereum, mis., [Geth](https://geth.ethereum.org/).
- Mulai Geth di satu jendela terminal dan tunggu hingga jaringan tersinkronisasi. Port HTTP default adalah `8545`, tetapi dapat dikonfigurasi.
- Beri tahu Web3.py untuk terhubung ke simpul melalui HTTP, di `localhost:8545`.
  `w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))`
- Gunakan instance `w3` untuk berinteraksi dengan simpul.

Meskipun ini adalah salah satu cara yang “nyata” untuk melakukannya, proses sinkronisasi memakan waktu berjam-jam dan tidak diperlukan jika Anda hanya menginginkan lingkungan pengembangan. Web3.py menyediakan provider keempat untuk tujuan ini, yaitu **EthereumTesterProvider**. Provider penguji ini terhubung ke simpul Ethereum yang disimulasikan dengan izin yang lebih longgar dan mata uang palsu untuk dicoba.

![Diagram yang menunjukkan EthereumTesterProvider menghubungkan aplikasi web3.py Anda ke simpul Ethereum yang disimulasikan](./ethereumtesterprovider.png)

_EthereumTesterProvider terhubung ke simpul yang disimulasikan dan praktis untuk lingkungan pengembangan yang cepat._

Simpul yang disimulasikan itu disebut [eth-tester](https://github.com/ethereum/eth-tester) dan kita menginstalnya sebagai bagian dari perintah `pip install 'web3[tester]'`. Mengonfigurasi Web3.py untuk menggunakan provider penguji ini sangatlah mudah:

```python
In [4]: w3 = Web3(Web3.EthereumTesterProvider())
```

Sekarang Anda siap untuk berselancar di rantai! Itu bukan ungkapan yang biasa diucapkan. Saya baru saja mengarangnya. Mari kita lakukan tur singkat.

## Tur singkat {#the-quick-tour}

Pertama-tama, lakukan pemeriksaan sederhana:

```python
In [5]: w3.is_connected()
Out[5]: True
```

Karena kita menggunakan provider penguji, ini bukanlah pengujian yang sangat berharga, tetapi jika gagal, kemungkinan Anda salah mengetik sesuatu saat membuat instance variabel `w3`. Periksa kembali apakah Anda menyertakan tanda kurung dalam, yaitu, `Web3.EthereumTesterProvider()`.

## Pemberhentian tur #1: [akun](/developers/docs/accounts/) {#tour-stop-1-accounts}

Untuk kemudahan, provider penguji membuat beberapa akun dan mengisinya dengan ether pengujian.

Pertama, mari kita lihat daftar akun tersebut:

```python
In [6]: w3.eth.accounts
Out[6]: ['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
 '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
 '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69', ...]
```

Jika Anda menjalankan perintah ini, Anda akan melihat daftar sepuluh string yang diawali dengan `0x`. Masing-masing adalah **alamat publik** dan, dalam beberapa hal, serupa dengan nomor rekening pada akun giro. Anda akan memberikan alamat ini kepada seseorang yang ingin mengirimi Anda ether.

Seperti yang telah disebutkan, provider penguji telah mengisi setiap akun ini dengan sejumlah ether pengujian. Mari kita cari tahu berapa banyak isinya di akun pertama:

```python
In [7]: w3.eth.get_balance(w3.eth.accounts[0])
Out[7]: 1000000000000000000000000
```

Banyak sekali angka nolnya! Sebelum Anda tertawa senang membawanya ke bank palsu, ingat kembali pelajaran tentang denominasi mata uang dari sebelumnya. Nilai ether direpresentasikan dalam denominasi terkecil, yaitu wei. Konversikan itu ke ether:

```python
In [8]: w3.from_wei(1000000000000000000000000, 'ether')
Out[8]: Decimal('1000000')
```

Satu juta ether pengujian — lumayan juga.

## Pemberhentian tur #2: data blok {#tour-stop-2-block-data}

Mari kita lihat status dari rantai blok yang disimulasikan ini:

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

Banyak informasi yang dikembalikan tentang sebuah blok, tetapi hanya beberapa hal yang perlu diperhatikan di sini:

- Nomor bloknya adalah nol — tidak peduli sudah berapa lama Anda mengonfigurasi provider penguji. Tidak seperti jaringan Ethereum asli, yang menambahkan blok baru setiap 12 detik, simulasi ini akan menunggu sampai Anda memberinya pekerjaan.
- `transactions` adalah daftar kosong, untuk alasan yang sama: kita belum melakukan apa pun. Blok pertama ini adalah **blok kosong**, hanya untuk memulai rantai.
- Perhatikan bahwa `parentHash` hanyalah sekumpulan byte kosong. Ini menandakan bahwa ini adalah blok pertama dalam rantai, yang juga dikenal sebagai **blok genesis**.

## Pemberhentian tur #3: [transaksi](/developers/docs/transactions/) {#tour-stop-3-transactions}

Kita terjebak di blok nol sampai ada transaksi yang tertunda, jadi mari kita buat satu. Kirim beberapa ether pengujian dari satu akun ke akun lain:

```python
In [10]: tx_hash = w3.eth.send_transaction({
   'from': w3.eth.accounts[0],
   'to': w3.eth.accounts[1],
   'value': w3.to_wei(3, 'ether'),
   'gas': 21000
})
```

Ini biasanya adalah titik di mana Anda akan menunggu beberapa detik agar transaksi Anda dimasukkan ke dalam blok baru. Proses lengkapnya berjalan seperti ini:

1. Kirim transaksi dan simpan hash transaksinya. Hingga blok yang berisi transaksi dibuat dan disiarkan, transaksi tersebut berstatus “tertunda”.
   `tx_hash = w3.eth.send_transaction({ … })`
2. Tunggu hingga transaksi dimasukkan ke dalam blok:
   `w3.eth.wait_for_transaction_receipt(tx_hash)`
3. Lanjutkan logika aplikasi. Untuk melihat transaksi yang berhasil:
   `w3.eth.get_transaction(tx_hash)`

Lingkungan simulasi kita akan menambahkan transaksi ke blok baru secara instan, sehingga kita bisa langsung melihat transaksinya:

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

Anda akan melihat beberapa detail yang familier di sini: bidang `from`, `to`, dan `value` harus cocok dengan masukan dari panggilan `send_transaction` kita. Hal meyakinkan lainnya adalah bahwa transaksi ini dimasukkan sebagai transaksi pertama (`'transactionIndex': 0`) di dalam blok nomor 1.

Kita juga dapat dengan mudah memverifikasi keberhasilan transaksi ini dengan memeriksa saldo dari kedua akun yang terlibat. Tiga ether seharusnya telah berpindah dari satu akun ke akun lainnya.

```python
In [12]: w3.eth.get_balance(w3.eth.accounts[0])
Out[12]: 999996999979000000000000

In [13]: w3.eth.get_balance(w3.eth.accounts[1])
Out[13]: 1000003000000000000000000
```

Yang terakhir terlihat bagus! Saldonya berubah dari 1.000.000 menjadi 1.000.003 ether. Tetapi apa yang terjadi dengan akun pertama? Tampaknya akun tersebut kehilangan sedikit lebih dari tiga ether. Sayangnya, tidak ada yang gratis dalam hidup, dan menggunakan jaringan publik Ethereum mengharuskan Anda memberikan kompensasi kepada para peer atas peran pendukung mereka. Sejumlah kecil biaya transaksi dipotong dari akun yang mengirimkan transaksi - biaya ini adalah jumlah gas yang terbakar (21.000 unit gas untuk transfer ETH) dikalikan dengan biaya dasar yang bervariasi sesuai dengan aktivitas jaringan ditambah tip yang diberikan kepada validator yang menyertakan transaksi dalam sebuah blok.

Selengkapnya tentang [gas](/developers/docs/gas/#post-london)

<FeaturedText>Catatan: Di jaringan publik, biaya transaksi bervariasi berdasarkan permintaan jaringan dan seberapa cepat Anda ingin transaksi diproses. Jika Anda tertarik dengan rincian cara penghitungan biaya, lihat pos saya sebelumnya tentang <a href="https://medium.com/ethereum-grid/ethereum-101-how-are-transactions-included-in-a-block-9ae5f491853f">cara transaksi dimasukkan ke dalam blok</a>.</FeaturedText>

## Waktunya istirahat {#and-breathe}

Kita sudah cukup lama membahas ini, jadi sepertinya ini adalah waktu yang tepat untuk beristirahat. Penjelajahan ini masih berlanjut, dan kita akan terus menjelajah di bagian kedua dari seri ini. Beberapa konsep yang akan datang: terhubung ke simpul sungguhan, kontrak pintar, dan token. Ada pertanyaan lanjutan? Beri tahu saya! Umpan balik Anda akan memengaruhi arah pembahasan kita selanjutnya. Permintaan diterima melalui [Twitter](https://twitter.com/wolovim).
