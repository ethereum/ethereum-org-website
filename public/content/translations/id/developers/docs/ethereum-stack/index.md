---
title: Pengenalan tentang tumpukan Ethereum
description: Panduan tentang berbagai lapisan tumpukan Ethereum dan bagaimana mereka saling terhubung.
lang: id
---

Seperti tumpukan perangkat lunak lainnya, "tumpukan Ethereum" yang lengkap akan bervariasi dari satu proyek ke proyek lainnya tergantung pada tujuan Anda.

Namun, ada komponen inti Ethereum yang membantu memberikan model mental tentang bagaimana aplikasi perangkat lunak berinteraksi dengan blockchain Ethereum. Memahami lapisan-lapisan tumpukan ini akan membantu Anda memahami berbagai cara Ethereum dapat diintegrasikan ke dalam proyek perangkat lunak.

## Tingkat 1: Mesin Virtual Ethereum {#ethereum-virtual-machine}

[Mesin Virtual Ethereum (EVM)](/developers/docs/evm/) adalah lingkungan runtime untuk kontrak pintar di Ethereum. Semua kontrak pintar dan perubahan status pada blockchain Ethereum dieksekusi oleh [transaksi](/developers/docs/transactions/). EVM menangani semua pemrosesan transaksi di jaringan Ethereum.

Seperti halnya mesin virtual lainnya, EVM menciptakan tingkat abstraksi antara kode yang dieksekusi dan mesin yang mengeksekusi (sebuah node Ethereum). Saat ini, EVM berjalan pada ribuan node yang terdistribusi di seluruh dunia.

Di balik layar, EVM menggunakan serangkaian instruksi opcode untuk mengeksekusi tugas-tugas tertentu. Opcode (140 unik) ini memungkinkan EVM menjadi [Turing-complete](https://en.wikipedia.org/wiki/Turing_completeness), yang berarti EVM mampu menghitung hampir apa saja, asalkan diberikan sumber daya yang cukup.

Sebagai pengembang dapp, Anda tidak perlu tahu banyak tentang EVM selain bahwa ia ada dan secara andal menggerakkan semua aplikasi di Ethereum tanpa waktu henti.

## Tingkat 2: Kontrak pintar {#smart-contracts}

[Kontrak pintar](/developers/docs/smart-contracts/) adalah program yang dapat dieksekusi yang berjalan di blockchain Ethereum.

Kontrak pintar ditulis menggunakan [bahasa pemrograman](/developers/docs/smart-contracts/languages/) tertentu yang dikompilasi menjadi bytecode EVM (instruksi mesin tingkat rendah yang disebut opcode).

Kontrak pintar tidak hanya berfungsi sebagai pustaka sumber terbuka, mereka pada dasarnya adalah layanan API terbuka yang selalu berjalan dan tidak dapat dihentikan. Kontrak pintar menyediakan fungsi publik yang dapat berinteraksi dengan pengguna dan aplikasi ([dapps](/developers/docs/dapps/)), tanpa memerlukan izin. Aplikasi apa pun dapat berintegrasi dengan kontrak pintar yang diterapkan untuk menyusun fungsionalitas, seperti menambahkan [umpan data](/developers/docs/oracles/) atau untuk mendukung pertukaran token. Selain itu, siapa pun dapat menerapkan kontrak pintar baru ke Ethereum untuk menambahkan fungsionalitas kustom guna memenuhi kebutuhan aplikasi mereka.

Sebagai pengembang dapp, Anda hanya perlu menulis kontrak pintar jika Anda ingin menambahkan fungsionalitas kustom di blockchain Ethereum. Anda mungkin menemukan bahwa Anda dapat mencapai sebagian besar atau semua kebutuhan proyek Anda hanya dengan berintegrasi dengan kontrak pintar yang ada, misalnya jika Anda ingin mendukung pembayaran dalam stablecoin atau mengaktifkan pertukaran terdesentralisasi dari token.

## Tingkat 3: Node Ethereum {#ethereum-nodes}

Agar sebuah aplikasi dapat berinteraksi dengan blockchain Ethereum, aplikasi tersebut harus terhubung ke [node Ethereum](/developers/docs/nodes-and-clients/). Menghubungkan ke sebuah node memungkinkan Anda untuk membaca data blockchain dan/atau mengirim transaksi ke jaringan.

Node Ethereum adalah komputer yang menjalankan perangkat lunak - sebuah klien Ethereum. Klien adalah implementasi Ethereum yang memverifikasi semua transaksi di setiap blok, menjaga jaringan tetap aman dan data tetap akurat. **Node Ethereum adalah blockchain Ethereum**. Mereka secara kolektif menyimpan status blockchain Ethereum dan mencapai konsensus pada transaksi untuk mengubah status blockchain.

Dengan menghubungkan aplikasi Anda ke node Ethereum (melalui [API JSON-RPC](/developers/docs/apis/json-rpc/)), aplikasi Anda dapat membaca data dari blockchain (seperti saldo akun pengguna) serta menyiarkan transaksi baru ke jaringan (seperti mentransfer ETH antar akun pengguna atau mengeksekusi fungsi dari kontrak pintar).

## Tingkat 4: API klien Ethereum {#ethereum-client-apis}

Banyak pustaka yang memudahkan (dibangun dan dipelihara oleh komunitas sumber terbuka Ethereum) memungkinkan aplikasi Anda terhubung dan berkomunikasi dengan blockchain Ethereum.

Jika aplikasi yang berhadapan dengan pengguna Anda adalah aplikasi web, Anda dapat memilih untuk melakukan `npm install` [API JavaScript](/developers/docs/apis/javascript/) langsung di frontend Anda. Atau mungkin Anda akan memilih untuk mengimplementasikan fungsionalitas ini di sisi server, menggunakan API [Python](/developers/docs/programming-languages/python/) atau [Java](/developers/docs/programming-languages/java/).

Meskipun API ini bukan bagian yang wajib dari tumpukan, mereka mengabstraksi banyak kompleksitas dalam berinteraksi langsung dengan node Ethereum. Mereka juga menyediakan fungsi utilitas (misalnya, mengonversi ETH ke Gwei) sehingga sebagai pengembang Anda dapat menghabiskan lebih sedikit waktu untuk berurusan dengan kerumitan klien Ethereum dan lebih banyak waktu berfokus pada fungsionalitas khusus untuk aplikasi Anda.

## Tingkat 5: Aplikasi pengguna akhir {#end-user-applications}

Di tingkat teratas dari tumpukan adalah aplikasi yang berhadapan dengan pengguna. Ini adalah aplikasi standar yang biasa Anda gunakan dan bangun saat ini: terutama aplikasi web dan seluler.

Cara Anda mengembangkan antarmuka pengguna ini pada dasarnya tetap tidak berubah. Seringkali pengguna tidak perlu tahu bahwa aplikasi yang mereka gunakan dibangun menggunakan blockchain.

## Siap memilih tumpukan Anda? {#ready-to-choose-your-stack}

Lihat panduan kami untuk [menyiapkan lingkungan pengembangan lokal](/developers/local-environment/) untuk aplikasi Ethereum Anda.

## Bacaan lebih lanjut {#further-reading}

- [Arsitektur aplikasi Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_