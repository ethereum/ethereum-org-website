---
title: Menambahkan dompet
description: Kebijakan yang kita gunakan ketika menambahkan dompet ke ethereum.org
lang: id
---

# Menambahkan dompet {#adding-wallets}

Kami ingin memastikan bahwa berbagai dompet yang mencakup fitur-fitur lengkap dari dompet telah ditampilkan sehingga pengguna dapat menjelajahi Ethereum dengan percaya diri.

Siapa saja bebas untuk menyarankan penambahan dompet di ethereum.org. Jika ada dompet yang terlewat, silakan sarankan!

Dompet-dompet yang saat ini terdaftar adalah:

- [ethereum.org/wallets/find-wallet/](/wallets/find-wallet/)

Dompet di Ethereum sedang berkembang pesat. Kami telah mencoba membuat kerangka kerja yang adil untuk dipertimbangkan di Ethereum.org tapi daftar kriteria akan berubah dan berkembang seiring berjalanya waktu.

## Kerangka pengambilan keputusan {#the-decision-framework}

### Kriteria untuk penyertaan: yang harus dimiliki {#the-must-haves}

- **Produk yang telah diuji keamanannya** - baik melalui audit, tim keamanan internal, kode sumber terbuka, atau metode lainnya, keamanan dompet Anda harus dapat diandalkan. Ini mengurangi resiko bagi pengguna kami dan menunjukkan bahwa Anda memperlakukan aspek keamanan dengan serius.
- **Dompet yang telah “aktif” selama lebih dari enam bulan ATAU dirilis oleh kelompok dengan rekam jejak yang memiliki reputasi baik** - ini adalah indikasi keamanan lain. Enam bulan adalah rentang waktu yang baik untuk menemukan bug kritis dan eksploitasi. Kami meminta enam bulan untuk membantu menyaring garpu yang cepat ditinggalkan sebagai proyek.
- **Dikerjakan oleh tim yang aktif** - ini membantu memastikan kualitas dan pengguna akan mendapatkan dukungan untuk pertanyaan mereka.
- **Informasi daftar yang jujur dan akurat** - diharapkan bahwa setiap daftar yang disarankan dari proyek dilengkapi dengan informasi yang jujur dan akurat. Produk yang memalsukan daftar informasi, seperti menyatakan bahwa produk Anda adalah "kode terbuka" padahal tidak, maka akan dihapus.
- **Narahubung** - Narahubung untuk dompet akan sangat membantu kami mendapatkan informasi yang akurat saat ada perubahan. Ini akan membuat pembaruan ethereum.org tetap terkelola saat mengumpulkan informasi di masa depan.
- **Transaksi EIP-1559 (tipe 2)** - dompet Anda harus mendukung transaksi EIP-1559 (tipe 2) untuk transaksi di Jaringan Utama Ethereum.
- **Pengalaman pengguna yang baik** - Meskipun UX bersifat subjektif, jika beberapa anggota tim inti menguji produk dan merasa sulit untuk digunakan, kami berhak menolak dompet tersebut dan sebagai gantinya akan memberikan saran yang berguna untuk perbaikan. Ini dilakukan untuk melindungi basis pengguna kami yang sebagian besar terdiri dari pemula.
- **Berfokus pada Ethereum** - Dompet harus menyediakan pengalaman utama yang berfokus pada Ethereum. Ini berarti Ethereum (atau L2 mana pun) diatur sebagai jaringan default, aset ERC didukung dengan baik, dan fitur-fiturnya selaras dengan ekosistem Ethereum. Dompet yang memprioritaskan lapisan 1 alternatif di UI tidak akan dicantumkan.

### Penghapusan produk {#product-removals}

- **Informasi terbaru** - Penyedia dompet bertanggung jawab untuk mengirimkan kembali informasi dompet mereka setiap 6 bulan untuk memastikan keabsahan dan relevansi informasi yang diberikan (meskipun tidak ada perubahan pada produk mereka). Jika tim produk gagal melakukannya, ethereum.org mungkin akan menghapus proyek tersebut dari halaman.

### Kriteria lain: yang sebaiknya ada {#the-nice-to-haves}

- **Dapat diakses secara global** - dompet Anda tidak memiliki batasan geografis atau persyaratan KYC yang mengecualikan orang-orang tertentu untuk mengakses layanan Anda.
- **Tersedia dalam berbagai bahasa** - dompet Anda diterjemahkan ke dalam berbagai bahasa yang memungkinkan pengguna di seluruh dunia untuk mengaksesnya.
- **Sumber terbuka** - seluruh basis kode proyek Anda (bukan hanya modul) harus dapat diakses dan Anda harus menerima PR dari komunitas yang lebih luas.
- **Non-kustodial** - pengguna mengendalikan dana mereka. Jika produk Anda menghilang, pengguna masih dapat mengakses dan memindahkan dana mereka.
- **Dukungan dompet perangkat keras** - pengguna dapat menghubungkan dompet perangkat keras mereka untuk menandatangani transaksi.
- **WalletConnect** - pengguna dapat terhubung ke dapps menggunakan WalletConnect.
- **Mengimpor titik akhir RPC Ethereum** - pengguna dapat mengimpor data RPC node, yang memungkinkan mereka terhubung ke node pilihan mereka, atau jaringan lain yang kompatibel dengan EVM.
- **NFT** - pengguna dapat melihat dan berinteraksi dengan NFT mereka di dalam dompet.
- **Terhubung ke aplikasi Ethereum** - pengguna dapat terhubung dan menggunakan aplikasi Ethereum.
- **Penaruhan** - pengguna dapat menaruhkan secara langsung melalui dompet.
- **Tukar** - pengguna dapat menukar token melalui dompet.
- **Jaringan multirantai** - dompet Anda mendukung pengguna mengakses beberapa jaringan rantai blok secara default.
- **Jaringan Lapisan 2** - dompet Anda mendukung pengguna mengakses jaringan lapisan 2 secara default.
- **Kustomisasi biaya gas** - dompet Anda memungkinkan pengguna untuk menyesuaikan biaya gas transaksi mereka (biaya dasar, biaya prioritas, biaya maks).
- **Dukungan ENS** - dompet Anda memungkinkan pengguna mengirim transaksi ke nama ENS.
- **Dukungan ERC-20** - dompet Anda memungkinkan pengguna untuk mengimpor kontrak token ERC-20, atau secara otomatis meminta dan menampilkan token ERC-20.
- **Beli kripto** - dompet Anda mendukung pengguna membeli dan memulai kripto secara langsung.
- **Jual ke fiat** - dompet Anda mendukung pengguna menjual dan menarik ke fiat langsung ke kartu atau rekening bank.
- **Multisig** - dompet Anda mendukung beberapa tanda tangan untuk menandatangani sebuah transaksi.
- **Pemulihan sosial** - dompet Anda mendukung wali dan pengguna dapat memulihkan dompet mereka jika kehilangan frasa seed mereka menggunakan wali ini.
- **Tim dukungan khusus** - dompet Anda memiliki tim dukungan khusus tempat pengguna dapat bertanya ketika mengalami masalah.
- **Sumber daya/dokumentasi pendidikan** - produk Anda harus memiliki pengalaman orientasi yang dirancang dengan baik untuk membantu dan mengedukasi pengguna. Atau bukti tentang cara membuat konten seperti artikel atau video.

## Menambahkan dompet {#adding-a-wallet}

Jika Anda ingin menambahkan dompet ke ethereum.org, buatlah isu di GitHub.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml">  Buat masalah</ButtonLink>

## Pemeliharaan {#maintenance}

Seperti natur Ethereum yang cair, tim dan produk datang silih berganti dan inovasi terjadi setiap hari, sehingga kami melakukan pemeriksaan konten secara rutin untuk:

- pastikan bahwa semua dompet dan dapp yang terdaftar masih memenuhi kriteria kami
- memverifikasi bahwa tidak terdapat produk yang telah disarankan yang memenuhi lebih banyak kriteria kami daripada yang saat ini terdaftar

ethereum.org dikelola oleh komunitas sumber terbuka & kami mengandalkan komunitas untuk membantu menjaganya tetap terkini. Jika Anda melihat informasi apa pun tentang dompet yang terdaftar yang perlu diperbarui, silakan [buka isu](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml) atau [ajukan permintaan penarikan](https://github.com/ethereum/ethereum-org-website/pulls)!

## Ketentuan penggunaan {#terms-of-use}

Silakan juga merujuk pada [ketentuan penggunaan](/terms-of-use/) kami. Informasi tentang ethereum.org disediakan hanya untuk tujuan informasi umum.
