---
title: Privasi di Ethereum
description: Perangkat dan teknik untuk melindungi privasi Anda di Ethereum
lang: id
---

# Privasi di Ethereum {#introduction}

Privasi tidak hanya penting untuk keselamatan pribadi, privasi juga merupakan landasan kebebasan dan [penjamin utama desentralisasi](https://vitalik.eth.limo/general/2025/04/14/privacy.html). Privasi memberi orang kemampuan untuk mengekspresikan diri, bertransaksi dengan orang lain, dan mengorganisir komunitas secara bebas. Namun seperti semua rantai blok, buku besar publik Ethereum membuat privasi menjadi sebuah tantangan.

Ethereum dirancang transparan. Setiap tindakan di dalam rantai terlihat oleh siapa pun yang melihatnya. Meskipun Ethereum menawarkan pseudonimitas dengan menautkan aktivitas Anda ke sebuah [kunci publik](/decentralized-identity/#public-key-cryptography) alih-alih identitas dunia nyata, pola aktivitas dapat dianalisis untuk mengungkap informasi sensitif dan mengidentifikasi pengguna.

Membangun perangkat yang menjaga privasi ke dalam Ethereum dapat membantu orang, organisasi, dan institusi berinteraksi dengan aman sambil membatasi paparan yang tidak perlu. Ini membuat ekosistem lebih aman dan lebih praktis untuk berbagai kasus penggunaan yang lebih luas.

## Privasi untuk penulisan {#privacy-of-writes}

Secara default, setiap transaksi yang ditulis di Ethereum bersifat publik dan permanen. Ini tidak hanya termasuk mengirim ETH, tetapi juga mendaftarkan nama ENS, mengumpulkan POAP, atau memperdagangkan NFT. Tindakan sehari-hari seperti pembayaran, pemungutan suara, atau verifikasi identitas dapat mengungkap informasi Anda kepada pihak yang tidak diinginkan. Ada beberapa perangkat dan teknik yang dapat membantu membuat hal ini lebih pribadi:

### Protokol pencampuran (atau "mixer") {#mixing-protocols}

Mixer memutus hubungan antara pengirim dan penerima dengan menempatkan transaksi banyak pengguna ke dalam "kumpulan" bersama dan kemudian membiarkan orang menariknya nanti ke alamat baru. Karena setoran dan penarikan tercampur aduk, akan jauh lebih sulit bagi pengamat untuk menghubungkannya.

_Contoh: [PrivacyPools](https://docs.privacypools.com/), [Tornado Cash](https://tornado.cash/)_

### Kumpulan terlindung {#shielded-pools}

Kumpulan terlindung serupa dengan mixer tetapi memungkinkan pengguna untuk menahan dan mentransfer dana secara pribadi di dalam kumpulan itu sendiri. Alih-alih hanya mengaburkan hubungan antara setoran dan penarikan, kumpulan terlindung mempertahankan state pribadi yang berkelanjutan, sering kali diamankan dengan bukti tanpa pengetahuan. Ini memungkinkan untuk membangun transfer pribadi, saldo pribadi, dan banyak lagi.

_Contoh: [Railgun](https://www.railgun.org/), [Aztec](https://aztec.network/), Nightfall_

### Alamat tersembunyi {#stealth-addresses}

[Alamat tersembunyi](https://vitalik.eth.limo/general/2023/01/20/stealth.html) seperti memberikan setiap pengirim P.O. unik sekali pakai. box yang hanya bisa Anda buka. Setiap kali seseorang mengirimi Anda kripto, kripto tersebut akan masuk ke alamat baru, jadi tidak ada orang lain yang dapat melihat bahwa semua pembayaran tersebut milik Anda. Ini membuat riwayat pembayaran Anda tetap pribadi dan lebih sulit dilacak.

_Contoh: [UmbraCash](https://app.umbra.cash/faq), [FluidKey](https://www.fluidkey.com/)_

### Kasus penggunaan lain {#other-use-cases}

Proyek lain yang mengeksplorasi penulisan pribadi termasuk [PlasmaFold](https://pse.dev/projects/plasma-fold) (pembayaran pribadi) dan sistem seperti [MACI](https://pse.dev/projects/maci) dan [Semaphore](https://pse.dev/projects/semaphore) (pemungutan suara pribadi).

Perangkat ini memperluas opsi untuk menulis secara pribadi di Ethereum, tetapi masing-masing memiliki konsekuensi. Beberapa pendekatan masih bersifat eksperimental, beberapa meningkatkan biaya atau kerumitan, dan beberapa perangkat seperti mixer mungkin menghadapi pengawasan hukum atau peraturan tergantung pada bagaimana mereka digunakan.

## Privasi untuk pembacaan {#privacy-of-reads}

Membaca atau memeriksa informasi apa pun di Ethereum (misalnya saldo dompet Anda) biasanya melalui layanan seperti penyedia dompet Anda, penyedia simpul, atau penjelajah blok. Karena Anda mengandalkan mereka untuk membaca rantai blok untuk Anda, mereka juga dapat melihat permintaan Anda beserta metadata seperti alamat IP atau lokasi Anda. Jika Anda terus memeriksa akun yang sama, informasi ini dapat disatukan untuk menautkan identitas Anda dengan aktivitas Anda.

Menjalankan simpul Ethereum Anda sendiri akan mencegah hal ini, tetapi menyimpan dan menyinkronkan seluruh rantai blok tetap mahal dan tidak praktis bagi sebagian besar pengguna, terutama di perangkat seluler.

Beberapa proyek yang mengeksplorasi pembacaan pribadi meliputi [Private Information Retrieval](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (PIR, mengambil data tanpa mengungkapkan apa yang Anda cari), [zkID](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (pemeriksaan identitas pribadi dengan bukti tanpa pengetahuan), [vOPRF](https://pse.dev/projects/voprf) (menggunakan akun Web2 secara pseudonim di Web3), [vFHE](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (menghitung data terenkripsi), dan [MachinaIO](https://pse.dev/projects/machina-io) (menyembunyikan detail program sambil menjaga fungsionalitas).

## Privasi untuk pembuktian {#privacy-of-proving}

Bukti yang menjaga privasi adalah perangkat yang dapat Anda gunakan di Ethereum untuk menunjukkan bahwa sesuatu itu benar tanpa mengungkapkan detail yang tidak perlu. Misalnya, Anda bisa:

- Membuktikan bahwa Anda berusia di atas 18 tahun tanpa membagikan tanggal lahir lengkap Anda
- Buktikan kepemilikan NFT atau token tanpa mengungkapkan seluruh dompet Anda
- Buktikan kelayakan untuk keanggotaan, imbalan, atau suara tanpa mengekspos data pribadi lainnya

Sebagian besar perangkat untuk ini mengandalkan teknik kriptografi seperti bukti tanpa pengetahuan, tetapi tantangannya adalah membuatnya cukup efisien untuk dijalankan di perangkat sehari-hari, portabel ke platform apa pun, dan aman.

Beberapa proyek yang mengeksplorasi privasi untuk pembuktian antara lain [Client Side Proving](https://pse.dev/projects/client-side-proving) (sistem pembuktian ZK), [TLSNotary](https://tlsnotary.org/), (bukti keaslian untuk data apa pun di web), [Mopro](https://pse.dev/projects/mopro) (pembuktian sisi klien seluler), [Private Proof Delegation](https://pse.dev/projects/private-proof-delegation) (kerangka kerja delegasi yang menghindari asumsi kepercayaan), dan [Noir](https://noir-lang.org/) (bahasa untuk komputasi pribadi dan dapat diverifikasi).

## Glosarium Privasi {#privacy-glossary}

**Anonim**: Berinteraksi dengan semua pengidentifikasi yang dihapus secara permanen dari data Anda, sehingga tidak mungkin melacak informasi kembali ke seorang individu

**Enkripsi**: Sebuah proses yang mengacak data sehingga hanya seseorang dengan kunci yang benar yang dapat membacanya

**[Enkripsi Homomorfik Penuh](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (FHE)**: Cara untuk melakukan komputasi langsung pada data terenkripsi, tanpa pernah mendekripsinya

**[Obfuskasi yang Tidak Dapat Dibedakan](https://pse.dev/projects/machina-io) (iO)**: Teknik privasi yang membuat program atau data tidak dapat dipahami namun tetap dapat digunakan

**[Komputasi Multi-Pihak](https://pse.dev/blog/secure-multi-party-computation) (MPC)**: Metode yang memungkinkan banyak pihak untuk menghitung hasil bersama tanpa mengekspos masukan pribadi mereka

**Kriptografi Terprogram**: Kriptografi fleksibel yang digerakkan oleh aturan yang dapat disesuaikan dalam perangkat lunak untuk mengontrol bagaimana dan kapan data dibagikan, diverifikasi, atau diungkapkan

**Pseudonim**: Menggunakan kode atau nomor unik (seperti alamat Ethereum) sebagai pengganti pengidentifikasi pribadi

**Pengungkapan Selektif**: Kemampuan untuk hanya membagikan apa yang dibutuhkan (misalnya membuktikan Anda memiliki NFT tanpa mengungkapkan seluruh riwayat dompet Anda)

**Ketidak-tertautan**: Memastikan tindakan terpisah di rantai blok tidak dapat ditautkan kembali ke alamat yang sama

**Keterverifikasian**: Memastikan orang lain dapat mengonfirmasi bahwa suatu klaim itu benar, seperti memvalidasi transaksi atau bukti di Ethereum

**Delegasi yang Dapat Diverifikasi**: Menugaskan suatu tugas—seperti membuat bukti—kepada pihak lain (misalnya dompet seluler yang menggunakan server untuk kriptografi berat) sambil tetap dapat memverifikasi bahwa tugas tersebut telah dilakukan dengan benar

**[Bukti Tanpa Pengetahuan](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) (ZKP)**: Protokol kriptografi yang memungkinkan seseorang membuktikan informasi itu benar tanpa mengungkapkan data yang mendasarinya

**ZK Rollup**: Sistem skalabilitas yang mengelompokkan transaksi di luar rantai dan mengirimkan bukti validitas di dalam rantai—tidak bersifat pribadi secara default, tetapi memungkinkan sistem privasi yang efisien (seperti kumpulan terlindung) dengan mengurangi biaya

## Sumber daya {#resources}

- [Privacy Stewards of Ethereum](https://pse.dev/) (PSE), sebuah lab penelitian dan pengembangan Ethereum Foundation yang berfokus pada privasi untuk ekosistem
- [Web3PrivacyNow](https://web3privacy.info/), sebuah jaringan orang, proyek, dan organisasi yang selaras yang melindungi dan memajukan hak asasi manusia secara daring
- [WalletBeat](https://beta.walletbeat.eth.limo/wallet/summary/), sebuah situs pemeringkat dompet Ethereum yang bertujuan untuk menyediakan daftar dompet yang komprehensif, fungsionalitasnya, praktiknya, dan dukungannya untuk standar tertentu.
- [Zk-kit](https://zkkit.pse.dev/): Satu set pustaka (algoritma, fungsi utilitas, dan struktur data) yang dapat digunakan kembali dalam berbagai proyek dan protokol zero-knowledge.
- [Aplikasi Privasi](/apps/categories/privacy/) - Temukan daftar aplikasi Privasi terkurasi yang berjalan di Ethereum.
