---
title: Menambahkan dompet
description: Kebijakan yang kami gunakan saat menambahkan dompet ke ethereum.org
lang: id
---

# Menambahkan dompet {#adding-wallets}

Kami ingin memastikan bahwa kami menampilkan berbagai dompet yang mencakup lanskap dompet yang kaya fitur sehingga pengguna dapat menavigasi Ethereum dengan percaya diri.

Siapa pun bebas menyarankan penambahan dompet di ethereum.org. Jika ada dompet yang terlewatkan oleh kami, silakan sarankan!

Dompet saat ini terdaftar di:

- [ethereum.org/wallets/find-wallet/](/wallets/find-wallet/)

Dompet berubah dengan cepat di Ethereum. Kami telah mencoba membuat kerangka kerja yang adil untuk pertimbangan di ethereum.org tetapi kriteria pendaftaran akan berubah dan berkembang seiring waktu.

## Kerangka kerja keputusan {#the-decision-framework}

### Kriteria untuk penyertaan: yang harus dimiliki {#the-must-haves}

- **Produk yang telah diuji keamanannya** - baik melalui audit, tim keamanan internal, kode sumber terbuka, atau metode lainnya, keamanan dompet Anda harus dapat diandalkan. Hal ini mengurangi risiko bagi pengguna kami dan menunjukkan kepada kami bahwa Anda menganggap serius masalah keamanan.
- **Dompet yang telah "aktif" selama lebih dari enam bulan ATAU dirilis oleh grup dengan rekam jejak yang bereputasi baik** - ini adalah indikasi keamanan lainnya. Enam bulan adalah jangka waktu yang baik untuk menemukan bug kritis dan eksploitasi. Kami meminta enam bulan untuk membantu menyaring fork yang dengan cepat ditinggalkan sebagai proyek.
- **Dikerjakan oleh tim yang aktif** - ini membantu memastikan kualitas dan bahwa pengguna akan mendapatkan dukungan untuk pertanyaan mereka.
- **Informasi pendaftaran yang jujur dan akurat** - diharapkan setiap saran pendaftaran dari proyek disertai dengan informasi yang jujur dan akurat. Produk yang memalsukan informasi pendaftaran, seperti menyatakan produk Anda adalah "sumber terbuka" padahal tidak, akan dihapus.
- **Narahubung** - Narahubung untuk dompet akan sangat membantu kami mendapatkan informasi yang akurat saat ada perubahan. Hal ini akan membuat pembaruan ethereum.org tetap dapat dikelola saat mengumpulkan informasi di masa mendatang.
- **Transaksi EIP-1559 (tipe 2)** - dompet Anda harus mendukung transaksi EIP-1559 (tipe 2) untuk transaksi di mainnet Ethereum.
- **Pengalaman pengguna yang baik** - Meskipun UX bersifat subjektif, jika beberapa anggota tim inti menguji produk dan merasa sulit digunakan, kami berhak menolak dompet tersebut dan sebagai gantinya akan memberikan saran yang berguna untuk perbaikan. Hal ini dilakukan untuk melindungi basis pengguna kami yang sebagian besar terdiri dari pemula.
- **Berfokus pada Ethereum** - Dompet harus memberikan pengalaman utama yang berfokus pada Ethereum. Ini berarti Ethereum (atau L2 mana pun) ditetapkan sebagai jaringan default, aset ERC didukung dengan baik, dan fitur-fiturnya selaras dengan ekosistem Ethereum. Dompet yang memprioritaskan layer 1 alternatif di UI tidak akan didaftarkan. 

### Penghapusan produk {#product-removals}

- **Informasi yang diperbarui** - Penyedia dompet bertanggung jawab untuk mengirimkan kembali informasi dompet mereka setiap 6 bulan untuk memastikan validitas dan relevansi informasi yang diberikan (bahkan jika tidak ada perubahan pada produk mereka). Jika tim produk gagal melakukannya, ethereum.org dapat menghapus proyek tersebut dari halaman. 

### Kriteria lainnya: yang bagus untuk dimiliki {#the-nice-to-haves}

- **Dapat diakses secara global** - dompet Anda tidak memiliki batasan geografis atau persyaratan KYC yang mengecualikan orang-orang tertentu untuk mengakses layanan Anda.
- **Tersedia dalam berbagai bahasa** - dompet Anda diterjemahkan ke dalam berbagai bahasa yang memungkinkan pengguna di seluruh dunia untuk mengaksesnya.
- **Sumber terbuka** - seluruh basis kode proyek Anda (bukan hanya modul) harus dapat diakses dan Anda harus menerima PR dari komunitas yang lebih luas.
- **Non-kustodian** - pengguna mengontrol dana mereka. Jika produk Anda menghilang, pengguna masih dapat mengakses dan memindahkan dana mereka.
- **Dukungan dompet perangkat keras** - pengguna dapat menghubungkan dompet perangkat keras mereka untuk menandatangani transaksi.
- **WalletConnect** - pengguna dapat terhubung ke dapps menggunakan WalletConnect.
- **Mengimpor titik akhir RPC Ethereum** - pengguna dapat mengimpor data RPC node, yang memungkinkan mereka untuk terhubung ke node pilihan mereka, atau jaringan lain yang kompatibel dengan EVM.
- **NFT** - pengguna dapat melihat dan berinteraksi dengan NFT mereka di dalam dompet.
- **Terhubung ke aplikasi Ethereum** - pengguna dapat terhubung ke dan menggunakan aplikasi Ethereum.
- **Mengunci** - pengguna dapat melakukan stake secara langsung melalui dompet.
- **Tukar** - pengguna dapat menukar token melalui dompet.
- **Jaringan multichain** - dompet Anda mendukung pengguna untuk mengakses beberapa jaringan blockchain secara default.
- **Jaringan layer 2** - dompet Anda mendukung pengguna untuk mengakses jaringan layer 2 secara default.
- **Menyesuaikan biaya gas** - dompet Anda memungkinkan pengguna untuk menyesuaikan biaya gas transaksi mereka (biaya dasar, biaya prioritas, biaya maks).
- **Dukungan ENS** - dompet Anda memungkinkan pengguna untuk mengirim transaksi ke nama ENS.
- **Dukungan ERC-20** - dompet Anda memungkinkan pengguna untuk mengimpor kontrak token ERC-20, atau secara otomatis menanyakan dan menampilkan token ERC-20.
- **Beli kripto** - dompet Anda mendukung pengguna untuk membeli dan masuk ke kripto secara langsung.
- **Jual ke fiat** - dompet Anda mendukung pengguna untuk menjual dan menarik ke fiat secara langsung ke kartu atau rekening bank.
- **Multi tanda tangan** - dompet Anda mendukung beberapa tanda tangan untuk menandatangani transaksi.
- **Pemulihan sosial** - dompet Anda mendukung wali (guardian) dan pengguna dapat memulihkan dompet mereka jika mereka kehilangan frasa seed menggunakan wali ini.
- **Tim dukungan khusus** - dompet Anda memiliki tim dukungan khusus tempat pengguna dapat bertanya saat mengalami masalah.
- **Sumber daya pendidikan/dokumentasi** - produk Anda harus memiliki pengalaman orientasi yang dirancang dengan baik untuk membantu dan mendidik pengguna. Atau bukti konten panduan seperti artikel atau video.

## Menambahkan dompet {#adding-a-wallet}

Jika Anda ingin menambahkan dompet ke ethereum.org, buatlah sebuah isu (issue) di GitHub.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml">
  Buat isu
</ButtonLink>

## Pemeliharaan {#maintenance}

Karena sifat Ethereum yang dinamis, tim dan produk datang dan pergi serta inovasi terjadi setiap hari, jadi kami akan melakukan pemeriksaan rutin terhadap konten kami untuk:

- memastikan bahwa semua dompet dan dapps yang terdaftar masih memenuhi kriteria kami
- memverifikasi bahwa tidak ada produk yang disarankan yang lebih memenuhi kriteria kami daripada yang terdaftar saat ini

ethereum.org dikelola oleh komunitas sumber terbuka & kami mengandalkan komunitas untuk membantu menjaganya tetap mutakhir. Jika Anda melihat ada informasi tentang dompet yang terdaftar yang perlu diperbarui, silakan [buka isu](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml) atau [pull request](https://github.com/ethereum/ethereum-org-website/pulls)!


## Ketentuan penggunaan {#terms-of-use}

Silakan merujuk juga ke [ketentuan penggunaan](/terms-of-use/) kami. Informasi di ethereum.org disediakan semata-mata untuk tujuan informasi umum.