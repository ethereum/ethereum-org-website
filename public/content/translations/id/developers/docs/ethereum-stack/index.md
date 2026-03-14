---
title: Pengantar tumpukan Ethereum
description: Panduan tentang berbagai lapisan tumpukan Ethereum dan bagaimana mereka bisa saling cocok.
lang: id
---

Seperti perangkat lunak penumpukan mana saja, "tumpukan Ethereum" lengkap akan berbeda-beda dari satu proyek ke proyek lainnya bergantung pada tujuan Anda.

Namun, ada komponen inti Ethereum yang membantu menyediakan model mental tentang bagaimana aplikasi perangkat lunak berinteraksi dengan blockchain Ethereum. Memahami lapisan tumpukan akan membantu Anda memahami berbagai cara mengintegrasikan Ethereum ke dalam proyek perangkat lunak.

## Tingkat 1: Mesin Virtual Ethereum {#ethereum-virtual-machine}

[Mesin Virtual Ethereum (EVM)](/developers/docs/evm/) adalah lingkungan runtime untuk kontrak pintar di Ethereum. Semua kontrak pintar dan perubahan state pada rantai blok Ethereum dieksekusi oleh [transaksi](/developers/docs/transactions/). EVM menangani semua pemrosesan transaksi di jaringan Ethereum.

Seperti mesin virtual mana pun, EVM membentuk level abstraksi di antara kode yang mengeksekusi dan mesin yang mengeksekusi (node Ethereum). Saat ini, EVM berjalan di ribuan simpul yang didistribusikan ke seluruh dunia.

Dalam implementasinya, EVM menggunakan serangkaian instruksi opcode untuk mengeksekusi tugas tertentu. Opcode ini (140 kode unik) memungkinkan EVM menjadi [Turing-complete](https://en.wikipedia.org/wiki/Turing_completeness), yang berarti EVM mampu menghitung hampir apa saja, dengan sumber daya yang cukup.

Sebagai pengembang dapp, Anda tidak perlu tahu banyak tentang EVM selain bahwa EVM itu ada dan bisa diandalkan untuk menggerakkan semua aplikasi di Ethereum tanpa waktu henti.

## Tingkat 2: Kontrak pintar {#smart-contracts}

[Kontrak pintar](/developers/docs/smart-contracts/) adalah program yang dapat dieksekusi yang berjalan di rantai blok Ethereum.

Kontrak pintar ditulis menggunakan [bahasa pemrograman](/developers/docs/smart-contracts/languages/) tertentu yang dikompilasi ke kode bita EVM (instruksi mesin tingkat rendah yang disebut opcode).

Kontrak pintar tidak hanya berfungsi sebagai pustaka sumber terbuka, tetapi pada dasarnya adalah layanan API terbuka yang selalu berjalan dan tidak dapat dihapus. Kontrak pintar menyediakan fungsi publik yang dapat digunakan pengguna dan aplikasi ([dapps](/developers/docs/dapps/)) untuk berinteraksi, tanpa memerlukan izin. Aplikasi apa pun dapat berintegrasi dengan kontrak pintar yang disebarkan untuk menyusun fungsionalitas, seperti menambahkan [umpan data](/developers/docs/oracles/) atau untuk mendukung penukaran token. Selain itu, siapa pun dapat menggunakan kontrak pintar baru ke Ethereum untuk menambahkan fungsionalitas khusus guna memenuhi kebutuhan aplikasi mereka.

Sebagai pengembang dapp, Anda perlu menulis kontrak pintar hanya jika Anda ingin menambahkan fungsionalitas khusus pada blockchain Ethereum. Anda mungkin merasa bisa mencapai hampir semua kebutuhan proyek hanya dengan berintegrasi dengan kontrak pintar yang telah ada, sebagai contoh jika Anda ingin mendukung pembayaran dalam stablecoin atau memungkinkan bursa token terdesentralisasi.

## Tingkat 3: Simpul Ethereum {#ethereum-nodes}

Agar suatu aplikasi dapat berinteraksi dengan rantai blok Ethereum, aplikasi tersebut harus terhubung ke [simpul Ethereum](/developers/docs/nodes-and-clients/). Terhubung ke sebuah node memungkinkan Anda membaca data blockchain dan/atau mengirim transaksi ke jaringan.

Node Ethereum adalah komputer yang menjalankan perangkat lunak - klien Ethereum. Klien adalah implementasi Ethereum yang memverifikasi semua transaksi di setiap blok, menjaga jaringan tetap aman dan data tetap akurat. **Node Ethereum adalah blockchain Ethereum**. Secara kolektif node menyimpan state blockchain Ethereum dan mencapai konsensus pada transaksi untuk mengubah state blockchain.

Dengan menghubungkan aplikasi Anda ke simpul Ethereum (melalui [API JSON-RPC](/developers/docs/apis/json-rpc/)), aplikasi Anda dapat membaca data dari rantai blok (seperti saldo akun pengguna) serta menyiarkan transaksi baru ke jaringan (seperti mentransfer ETH antar akun pengguna atau mengeksekusi fungsi kontrak pintar).

## Tingkat 4: API klien Ethereum {#ethereum-client-apis}

Banyak pustaka praktis (dibangun dan dikelola oleh komunitas sumber terbuka Ethereum) yang memungkinkan aplikasi Anda terhubung ke dan berkomunikasi dengan blockchain Ethereum.

Jika aplikasi sisi pengguna Anda adalah aplikasi web, Anda dapat memilih untuk `npm install` [API JavaScript](/developers/docs/apis/javascript/) secara langsung di frontend Anda. Atau mungkin Anda akan memilih untuk mengimplementasikan fungsionalitas ini di sisi server, menggunakan API [Python](/developers/docs/programming-languages/python/) atau [Java](/developers/docs/programming-languages/java/).

Meskipun API ini bukan bagian penting dari tumpukan, API ini meringkas banyak kerumitan berinteraksi langsung dengan node Ethereum. Mereka juga menyediakan fungsi utilitas (misalnya, mengonversi ETH ke Gwei) sehingga sebagai pengembang, Anda dapat menghabiskan lebih sedikit waktu menangani kerumitan klien Ethereum dan lebih banyak waktu berfokus pada fungsionalitas yang spesifik untuk aplikasi Anda.

## Tingkat 5: Aplikasi pengguna akhir {#end-user-applications}

Pada tingkat paling atas tumpukan adalah aplikasi sisi pengguna. Ini adalah aplikasi standar yang biasa Anda gunakan dan bangun hari ini: terutama aplikasi web dan seluler.

Cara Anda mengembangkan antarmuka pengguna ini pada dasarnya tetap tidak berubah. Sering kali pengguna tidak perlu tahu aplikasi yang mereka gunakan disusun menggunakan blockchain.

## Siap untuk memilih tumpukan Anda? Siap memilih tumpukan Anda? {#ready-to-choose-your-stack}

Lihat panduan kami untuk [menyiapkan lingkungan pengembangan lokal](/developers/local-environment/) untuk aplikasi Ethereum Anda.

## Bacaan lebih lanjut {#further-reading}

- [Arsitektur aplikasi Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_
