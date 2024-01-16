---
title: Bukti kerja (PoW)
description: Penjelasan tentang protokol konsensus bukti kerja dan perannya di Ethereum.
lang: id
incomplete: true
---

Ethereum, seperti Bitcoin, saat ini menggunakan protokol konsensus yang disebut **[Bukti kerja (PoW)](https://wikipedia.org/wiki/Proof_of_work)**. Ini memungkinkan node jaringan Ethereum untuk berkesesuaian dengan state dari semua informasi yang terekam dalam blockchain Ethereum, dan mencegah beberapa jenis serangan ekonomi tertentu.

Pada tahun depan, bukti kerja akan dihentikan untuk digantikan dengan **[Bukti taruhan (PoS)](/developers/docs/consensus-mechanisms/pos)**. Transisi ke bukti taruhan juga akan menghapuskan penambangan dari Ethereum. [Selengkapnya tentang penggabungan.](/roadmap/merge/)

## Prasyarat {#prerequisites}

Untuk lebih memahami halaman ini, kami menyarankan Anda membaca terlebih dahulu tentang [transaksi](/developers/docs/transactions/), [blok](/developers/docs/blocks/), dan [mekanisme konsensus](/developers/docs/consensus-mechanisms/).

## Apa itu Bukti kerja (PoW)? {#what-is-pow}

Bukti kerja adalah mekanisme yang memungkinkan jaringan Ethereum terdesentralisasi ditambahkan ke konsensus, atau berkesesuaian dengan berbagai hal seperti saldo akun dan urutan transaksi. Ini mencegah para pengguna "menggandakan pemakaian" koin mereka dan memastikan rantai Ethereum sangat sulit untuk diserang atau dimanipulasi.

## Bukti kerja dan penambangan {#pow-and-mining}

Bukti kerja adalah algoritma dasar yang mengatur tingkat kesulitan dan aturan bagi pekerjan penambang. Penambangan adalah "pekerjaan" itu sendiri. Ini adalah aksi menambahkan blok valid pada rantai. Ini penting karena panjang rantai menolong jaringan mengikuti rantai Ethereum yang benar dan mengerti state Ethereum saat ini. Makin banyak "pekerjaan" yang diselesaikan, makin panjang rantai, dan makin tinggi nomor blok, semakin pasti jaringan dapat menjadi seperti state Ethereum saat ini.

[Selengkapnya tentang penambangan](/developers/docs/consensus-mechanisms/pow/mining/)

## Bagaimana cara kerja bukti kerja Ethereum? {#how-it-works}

Transaksi Ethereum diproses ke dalam blok. Setiap blok mempunyai:

- tingkat kesulitan blok - contohnya: 3.324.092.183.262.715
- mixHash - contohnya: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- nonce – contohnya: `0xd3ee432b4fb3d26b`

Data blok ini terhubung langsung dengan bukti kerja.

### Tugas dalam bukti kerja {#the-work}

Protokol bukti kerja, Ethash, mengharuskan para penambang melalui kompetisi percobaan yang ketat untuk menemukan nonce dari satu blok. Hanya blok dengan nonce valid dapat ditambahkan ke dalam rantai.

Ketika berkompetisi untuk membuat satu blok, seorang penambang akan secara berulang meletakkan himpunan data, yang hanya bisa Anda dapatkan dari mengunduh dan menjalankan rantai lengkap (seperti yang dilakukan seorang penambang), lewat fungsi matematika. Kumpulan datanya terbiasa menghasilkan mixHash yang di bawah nonce target, seperti yang diatur oleh tingkat kesulitan blok. Cara terbaik untuk ini adalah mengerjakannya lewat percobaan.

Tingka kesulitannya menentukan target dari hash. Semakin rendah targetnya, semakin kecil himpunan hash yang valid. Setelah dihasilkan, ini akan sangat mudah bagi penambang dan klien lain untuk memverifikasi. Bahkan jika satu transaksi harus diubah, hash akan menjadi sangat berbeda, yang mengisyaratkan penipuan.

Hashing membuat penipuan mudah untuk dideteksi. Tapi bukti kerja sebagai sebuah proses juga merupakan penghalang besar untuk menyerang rantai.

### Bukti kerja dan keamanan {#security}

Penambang diberi insentif untuk melakukan pekerjaan ini pada rantai utama Ethereum. Ada sedikit insentif untuk sekelompok kecil penambang agar memulai rantai mereka - ini akan melemahkan sistem. Blockchain bertumpu pada kepememilikan satu state tunggal sebagai sumber kebenarannya. Dan pengguna akan selalu memilih rantai terpanjang atau "terberat".

Tujuan dari bukti kerja adalah untuk memperpanjang rantai. Rantai terpanjang adalah yang paling terpercaya sebagai rantai valid karena telah memiliki pekerjaan komputasional yang paling banyak diselesaikan. Dalam sistem PoW Ethereum, hampir mustahil untuk membuat blok baru yang menghapus transaksi, menghasilkan transaksi palsu, atau mempertahankan rantai kedua. Itu karena seorang penambang jahat harus selalu menyelesaikan nonce blok lebih cepat dari semua orang lainnya.

Agar konsisten menghasilkan blok jahat tapi valid, Anda akan memerlukan lebih dari 51% daya penambangan jaringan untuk mengalahkan semua orang lainnya. Anda akan memerlukan banyak daya komputasi untuk bisa melakukan jumlah "pekerjaan" sebanyak ini. Dan energi yang digunakan bahkan mungkin akan lebih besar dari hasil yang Anda peroleh dalam satu serangan.

### Ekonomi bukti kerja {#economics}

Bukti kerja juga bertanggung jawab untuk menerbitkan mata uang baru ke dalam sistem dan memberi insentif kepada para penambang untuk bekerja.

Miners who successfully create a block get rewarded with two freshly minted ETH but no longer receive all the transaction fees, as the base fee gets burned, while the tip and block reward goes to the miner. Seorang penambang mungkin juga mendapatkan 1,75 ETH untuk satu blok paman. Blok paman adalah blok valid yang dibuat oleh seorang penambang bersamaan dengan saat penambang lain berhasil menambang blok. Blok paman biasanya terjadi karena latensi jaringan.

## Finality {#finality}

Sebuah transaksi memiliki "finality" di Ethereum jika menjadi bagian dari blok yang tidak dapat diubah.

Karena para penambang bekerja dengan cara terdesentralisasi, dua blok valid dapat ditambang pada saat yang sama. Ini menghasilkan fork yang sementara. Pada akhirnya, salah satu rantai ini akan menjadi rantai yang diterima setelah satu blok berikutnya telah ditambang dan ditambahkan, yang membuatnya lebih panjang.

Tapi untuk merumitkan masalah, transaksi yang ditolak di fork sementara mungkin telah dimasukkan ke dalam rantai yang diterima. Ini berarti transaksi dapat dibalikkan. Jadi finality merujuk pada waktu di mana Anda harus menunggu sebelum menganggap satu transaksi tidak dapat dibalik. Untuk Ethereum, waktu rekomendasinya adalah enam blok atau hanya di atas 1 menit. Setelah enam blok, Anda dapat mengatakan dengan keyakinan relatif bahwa transaksi telah sukses. Anda dapat menunggu lebih lama untuk mendapatkan keyakinan yang jauh lebih besar.

Finality adalah sesuatu yang harus diingat ketika mendesain dapp. Ini akan menjadi pengalaman pengguna yang buruk jika salah merepresentasikan informasi transaksi bagi para pengguna Anda, khususnya jika transaksi bernilai besar.

Ingat, penentuan waktu ini tidak termasuk waktu tunggu untuk memerintahkan transaksi diterima oleh seorang penambang.

## Pemakaian energi bukti kerja {#energy}

Satu kritik besar terhadap bukti kerja adalah jumlah output energinya yang diperlukan untuk menjaga jaringan tetap aman. Untuk mempertahankan keamanan dan desentralisasi, Ethereum dalam sistem bukti kerja mengonsumsi 73,2 TWh setiap tahunnya, jumlah energi yang setara dengan negara berukuran sedang seperti Austria.

## Pro dan Kontra {#pros-and-cons}

| Pro                                                                                                                                                                                                                                                  | Kontra                                                                                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bukti kerja bersifat netral. Anda tidak perlu ETH untuk memulai dan imbalan blok memungkinkan Anda beranjak dari 0ETH ke saldo yang positif. Dengan [bukti taruhan](/developers/docs/consensus-mechanisms/pos/), Anda membutuhkan ETH untuk memulai. | Bukti kerja menggunakan terlalu banyak energi yang berakibat buruk bagi lingkungan.                                                                                     |
| Bukti kerja adalah mekanisme konsensus yang telah dicoba dan teruji yang telah mengamankan dan mendesentralisasi Bitcoin dan Ethereum selama bertahun-tahun.                                                                                         | Jika Anda ingin menambang, Anda perlu peralatan spesialis yang adalah investasi besar untuk memulai.                                                                    |
| Dibandingkan dengan bukti taruhan, ini relatif mudah dijalankan.                                                                                                                                                                                     | Karena meningkatnya komputasi yang diperlukan, pool penambangan bisa berpotensi mendominasi permainan penambangan, yang mengarah pada sentralisasi dan risiko keamanan. |

## Dibandingkan dengan bukti taruhan {#compared-to-pos}

Pada tingkat tinggi, bukti taruhan punya tujuan akhir yang sama seperti bukti kerja: untuk menolong jaringan terdesentralisasi mencapai konsensus dengan aman. Tapi, bukti taruhan punya perbedaan dalam proses dan personil:

- Bukti taruhan menghilangkan pentingnya daya komputasi untuk ETH yang ditaruhkan.
- Bukti taruhan menggantikan para penambang dengan para validator. Para validator menaruhkan ETH mereka untuk mengaktifkan kemampuan untuk membuat blok baru.
- Para validator tidak berkompetisi untuk membuat blok, tetapi mereka dipilih secara acak oleh algoritma.
- Finality lebih jelas: pada pos pemeriksaan tertentu, jika 2/3 validator setuju dengan state blok, maka blok dianggap final. Validator harus menaruhkan seluruh taruhannya di sini, jadi jika mereka mencoba berkolusi, mereka akan kehilangan seluruh taruhannya.

[Selengkapnya tentang bukti taruhan](/developers/docs/consensus-mechanisms/pos/)

## Selengkapnya tentang pelajar visual? {#visual-learner}

<YouTube id="3EUAcxhuoU4" />

## Bacaan Lebih Lanjut {#further-reading}

- [Serangan mayoritas](https://en.bitcoin.it/wiki/Majority_attack)
- [Tentang finalitas penyelesaian](https://blog.ethereum.org/2016/05/09/on-settlement-finality/)

### Video {#videos}

- [Sebuah penjelasan teknis tentang protokol bukti kerja](https://youtu.be/9V1bipPkCTU)

## Topik Terkait {#related-topics}

- [Penambangan](/developers/docs/consensus-mechanisms/pow/mining/)
- [Bukti taruhan](/developers/docs/consensus-mechanisms/pos/)
