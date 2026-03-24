---
title: Privasi di Ethereum
description: Alat dan teknik untuk melindungi privasi Anda di Ethereum
lang: id
---

# Privasi di Ethereum {#introduction}

Privasi tidak hanya penting untuk keselamatan pribadi, ini adalah landasan kebebasan dan [penjamin utama untuk desentralisasi](https://vitalik.eth.limo/general/2025/04/14/privacy.html). Privasi memberi orang kemampuan untuk mengekspresikan diri mereka, bertransaksi dengan orang lain, dan mengatur komunitas secara bebas. Namun seperti semua blockchain, buku besar publik Ethereum membuat privasi menjadi sebuah tantangan.

Ethereum dirancang secara transparan. Setiap tindakan onchain dapat dilihat oleh siapa saja yang melihatnya. Meskipun Ethereum menawarkan pseudonimitas dengan menautkan aktivitas Anda ke [kunci publik](/decentralized-identity/#public-key-cryptography) alih-alih identitas dunia nyata, pola aktivitas dapat dianalisis untuk mengungkapkan informasi sensitif dan mengidentifikasi pengguna.

Membangun alat pelindung privasi ke dalam Ethereum dapat membantu orang, organisasi, dan institusi berinteraksi dengan aman sambil membatasi paparan yang tidak perlu. Hal ini membuat ekosistem menjadi lebih aman dan lebih praktis untuk berbagai macam kasus penggunaan.

## Privasi untuk penulisan {#privacy-of-writes}

Secara default, setiap transaksi yang ditulis di Ethereum bersifat publik dan permanen. Ini tidak hanya mencakup pengiriman ETH, tetapi juga mendaftarkan nama ENS, mengumpulkan POAP, atau memperdagangkan NFT. Tindakan sehari-hari seperti pembayaran, pemungutan suara, atau verifikasi identitas dapat mengungkapkan informasi Anda kepada pihak yang tidak diinginkan. Ada beberapa alat dan teknik yang dapat membantu membuat hal-hal ini menjadi lebih privat:

### Protokol pencampuran (atau "mixer") {#mixing-protocols}

Mixer memutus tautan antara pengirim dan penerima dengan memasukkan transaksi banyak pengguna ke dalam "kolam" bersama dan kemudian membiarkan orang menariknya nanti ke alamat yang baru. Karena setoran dan penarikan dicampur menjadi satu, jauh lebih sulit bagi pengamat untuk menghubungkannya.

_Contoh: [PrivacyPools](https://docs.privacypools.com/), [Tornado Cash](https://tornado.cash/)_

### Kolam Terlindung (Shielded Pools) {#shielded-pools}

Kolam terlindung mirip dengan mixer tetapi memungkinkan pengguna untuk menyimpan dan mentransfer dana secara privat di dalam kolam itu sendiri. Alih-alih hanya mengaburkan tautan antara setoran dan penarikan, kolam terlindung mempertahankan status privat yang berkelanjutan, sering kali diamankan dengan zero-knowledge proof. Hal ini memungkinkan untuk membangun transfer privat, saldo privat, dan banyak lagi.

_Contoh: [Railgun](https://www.railgun.org/), [Aztec](https://aztec.network/), Nightfall_

### Alamat siluman (Stealth addresses) {#stealth-addresses}

[Alamat siluman](https://vitalik.eth.limo/general/2023/01/20/stealth.html) ibarat memberikan setiap pengirim kotak P.O. unik sekali pakai yang hanya dapat Anda buka. Setiap kali seseorang mengirimi Anda kripto, itu masuk ke alamat yang baru, sehingga tidak ada orang lain yang dapat melihat bahwa semua pembayaran tersebut adalah milik Anda. Hal ini menjaga riwayat pembayaran Anda tetap privat dan lebih sulit dilacak.

_Contoh: [UmbraCash](https://app.umbra.cash/faq), [FluidKey](https://www.fluidkey.com/)_

### Kasus penggunaan lainnya {#other-use-cases}

Proyek lain yang mengeksplorasi penulisan privat termasuk [PlasmaFold](https://pse.dev/projects/plasma-fold) (pembayaran privat) dan sistem seperti [MACI](https://pse.dev/projects/maci) dan [Semaphore](https://pse.dev/projects/semaphore) (pemungutan suara privat).

Alat-alat ini memperluas opsi untuk menulis secara privat di Ethereum, tetapi masing-masing memiliki kelebihan dan kekurangan. Beberapa pendekatan masih bersifat eksperimental, beberapa meningkatkan biaya atau kompleksitas, dan beberapa alat seperti mixer mungkin menghadapi pengawasan hukum atau peraturan tergantung pada bagaimana alat tersebut digunakan.

## Privasi untuk pembacaan {#privacy-of-reads}

Membaca atau memeriksa informasi apa pun di Ethereum (misalnya saldo dompet Anda) biasanya melalui layanan seperti penyedia dompet Anda, penyedia node, atau penjelajah blok. Karena Anda mengandalkan mereka untuk membaca blockchain untuk Anda, mereka juga dapat melihat permintaan Anda beserta metadata seperti alamat IP atau lokasi Anda. Jika Anda terus memeriksa akun yang sama, informasi ini dapat disatukan untuk menautkan identitas Anda ke aktivitas Anda.

Menjalankan node Ethereum Anda sendiri akan mencegah hal ini, tetapi menyimpan dan menyinkronkan seluruh blockchain tetap mahal dan tidak praktis bagi sebagian besar pengguna, terutama di perangkat seluler.

Beberapa proyek yang mengeksplorasi pembacaan privat termasuk [Private Information Retrieval](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (PIR, mengambil data tanpa mengungkapkan apa yang Anda cari), [zkID](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (pemeriksaan identitas privat dengan zero-knowledge proof), [vOPRF](https://pse.dev/projects/voprf) (menggunakan akun Web2 secara pseudonim di Web3), [vFHE](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (komputasi pada data terenkripsi), dan [MachinaIO](https://pse.dev/projects/machina-io) (menyembunyikan detail program sambil mempertahankan fungsionalitas).

## Privasi untuk pembuktian {#privacy-of-proving}

Bukti pelindung privasi adalah alat yang dapat Anda gunakan di Ethereum untuk menunjukkan bahwa sesuatu itu benar tanpa mengungkapkan detail yang tidak perlu. Misalnya, Anda dapat:

- Membuktikan bahwa Anda berusia di atas 18 tahun tanpa membagikan tanggal lahir lengkap Anda
- Membuktikan kepemilikan NFT atau token tanpa mengungkapkan seluruh dompet Anda
- Membuktikan kelayakan untuk keanggotaan, hadiah, atau pemungutan suara tanpa mengekspos data pribadi lainnya

Sebagian besar alat untuk hal ini bergantung pada teknik kriptografi seperti zero-knowledge proof, tetapi tantangannya adalah membuatnya cukup efisien untuk dijalankan di perangkat sehari-hari, portabel ke platform apa pun, dan aman.

Beberapa proyek yang mengeksplorasi privasi untuk pembuktian termasuk [Client Side Proving](https://pse.dev/projects/client-side-proving) (sistem pembuktian ZK), [TLSNotary](https://tlsnotary.org/), (bukti keaslian untuk data apa pun di web), [Mopro](https://pse.dev/projects/mopro) (pembuktian sisi klien seluler), [Private Proof Delegation](https://pse.dev/projects/private-proof-delegation) (kerangka kerja delegasi yang menghindari asumsi kepercayaan), dan [Noir](https://noir-lang.org/) (bahasa untuk komputasi privat dan dapat diverifikasi).

## Glosarium Privasi {#privacy-glossary}

**Anonim**: Berinteraksi dengan semua pengidentifikasi yang dihapus secara permanen dari data Anda, sehingga tidak mungkin melacak informasi kembali ke individu

**Enkripsi**: Proses yang mengacak data sehingga hanya seseorang dengan kunci yang benar yang dapat membacanya

**[Fully Homomorphic Encryption](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (FHE)**: Cara untuk melakukan komputasi langsung pada data terenkripsi, tanpa pernah mendekripsinya

**[Indistinguishable Obfuscation](https://pse.dev/projects/machina-io) (iO)**: Teknik privasi yang membuat program atau data tidak dapat dipahami namun tetap dapat digunakan

**[Multi-Party Computation](https://pse.dev/blog/secure-multi-party-computation) (MPC)**: Metode yang memungkinkan banyak pihak untuk menghitung hasil bersama-sama tanpa mengekspos input privat mereka

**Kriptografi yang Dapat Diprogram (Programmable Cryptography)**: Kriptografi yang fleksibel dan digerakkan oleh aturan yang dapat disesuaikan dalam perangkat lunak untuk mengontrol bagaimana dan kapan data dibagikan, diverifikasi, atau diungkapkan

**Pseudonim**: Menggunakan kode atau angka unik (seperti alamat Ethereum) sebagai pengganti pengidentifikasi pribadi

**Pengungkapan Selektif (Selective Disclosure)**: Kemampuan untuk membagikan hanya apa yang dibutuhkan (misalnya membuktikan bahwa Anda memiliki NFT tanpa mengungkapkan seluruh riwayat dompet Anda)

**Ketidaktertautan (Unlinkability)**: Memastikan tindakan terpisah di blockchain tidak dapat dikaitkan kembali ke alamat yang sama

**Keterverifikasian (Verifiability)**: Memastikan orang lain dapat mengonfirmasi bahwa suatu klaim adalah benar, seperti memvalidasi transaksi atau bukti di Ethereum

**Delegasi yang Dapat Diverifikasi (Verifiable Delegation)**: Menugaskan tugas—seperti menghasilkan bukti—kepada pihak lain (misalnya dompet seluler yang menggunakan server untuk kriptografi berat) sambil tetap dapat memverifikasi bahwa tugas tersebut dilakukan dengan benar

**[Zero-Knowledge Proof](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) (ZKP)**: Protokol kriptografi yang memungkinkan seseorang membuktikan bahwa informasi itu benar tanpa mengungkapkan data yang mendasarinya

**ZK Rollup**: Sistem skalabilitas yang mengelompokkan transaksi secara offchain dan mengirimkan bukti validitas secara onchain—tidak privat secara default, tetapi mereka memungkinkan sistem privasi yang efisien (seperti kolam terlindung) dengan mengurangi biaya

## Sumber Daya {#resources}

- [Privacy Stewards of Ethereum](https://pse.dev/) (PSE), laboratorium penelitian dan pengembangan Ethereum Foundation yang berfokus pada privasi untuk ekosistem
- [Web3PrivacyNow](https://web3privacy.info/), jaringan orang, proyek, dan organisasi selaras yang melindungi dan memajukan hak asasi manusia secara online
- [WalletBeat](https://beta.walletbeat.eth.limo/wallet/summary/), situs peringkat dompet Ethereum yang bertujuan untuk menyediakan daftar lengkap dompet, fungsionalitasnya, praktiknya, dan dukungannya untuk standar tertentu.
- [Zk-kit](https://zkkit.pse.dev/): Serangkaian pustaka (algoritma, fungsi utilitas, dan struktur data) yang dapat digunakan kembali dalam berbagai proyek dan protokol zero-knowledge.
- [Aplikasi Privasi](/apps/categories/privacy/) - Temukan daftar aplikasi Privasi terkurasi yang berjalan di Ethereum.