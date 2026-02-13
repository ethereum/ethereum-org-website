---
title: Bukti kerja (PoW)
description: Penjelasan tentang protokol konsensus bukti kerja dan perannya di Ethereum.
lang: id
---

Jaringan Ethereum dimulai dengan menggunakan mekanisme konsensus yang melibatkan **[Bukti Kerja (PoW)](/developers/docs/consensus-mechanisms/pow)**. Hal ini memungkinkan node-node dalam jaringan Ethereum untuk menyetujui status semua informasi yang tercatat dalam blockchain Ethereum dan mencegah beberapa jenis serangan ekonomi. Akan tetapi, Ethereum mematikan Bukti Kerja pada tahun 2022 dan mulai menggunakan [Bukti Taruhan](/developers/docs/consensus-mechanisms/pos) sebagai gantinya.

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
    Bukti kerja sekarang sudah tidak digunakan lagi. Ethereum tidak lagi menggunakan proof-of-work sebagai bagian dari mekanisme konsensusnya. Sebagai gantinya, ia menggunakan bukti kepemilikan. Baca selengkapnya tentang [proof-of-stake](/developers/docs/consensus-mechanisms/pos/) dan [staking](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

## Persyaratan {#prerequisites}

Untuk lebih memahami halaman ini, kami menyarankan kamu terlebih dahulu membaca tentang [transaksi](/developers/docs/transactions/),[blocks](/developers/docs/blocks/),dan [consensus mechanisms](/developers/docs/consensus-mechanisms/).

## Apa itu Bukti kerja (PoW)? {#what-is-pow}

Konsensus Nakamoto, yang menggunakan Bukti Kerja, adalah mekanisme yang pernah memungkinkan jaringan Ethereum yang terdesentralisasi untuk mencapai konsensus (yaitu, semua simpul setuju) pada hal-hal seperti saldo akun dan urutan transaksi. Hal ini mencegah pengguna untuk "membelanjakan dua kali lipat" koin mereka dan memastikan bahwa rantai Ethereum sangat sulit untuk diserang atau dimanipulasi. Properti keamanan ini sekarang berasal dari Bukti Taruhan, yang menggunakan mekanisme konsensus yang dikenal sebagai [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/).

## Bukti Kerja dan Penambangan {#pow-and-mining}

Proof-of-work adalah algoritma dasar yang menentukan tingkat kesulitan dan aturan untuk pekerjaan yang dilakukan oleh para penambang pada blockchain proof-of-work. Penambangan adalah "pekerjaan" itu sendiri. Ini adalah aksi menambahkan blok valid pada rantai. Hal ini penting karena panjang rantai membantu jaringan mengikuti percabangan blockchain yang benar. Makin banyak "pekerjaan" yang diselesaikan, makin panjang rantai, dan makin tinggi nomor blok, semakin pasti jaringan dapat menjadi seperti state Ethereum saat ini.

[Selengkapnya tentang Penambangan](/developers/docs/consensus-mechanisms/pow/mining/)

## Bagaimana cara kerja proof-of-work Ethereum? {#how-it-works}

Transaksi Ethereum diproses ke dalam blok. Dalam proof-of-work Ethereum yang sekarang sudah tidak digunakan lagi, setiap blok berisi:

- tingkat kesulitan blok - contohnya: 3.324.092.183.262.715
- mixHash – contohnya: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- nonce – contohnya: `0xd3ee432b4fb3d26b`

Data blok ini secara langsung terkait dengan bukti kerja.

### Pekerjaan dalam Bukti Kerja {#the-work}

Protokol proof-of-work, Ethash, mengharuskan para penambang untuk melalui perlombaan coba-coba yang intens untuk menemukan nonce untuk sebuah blok. Hanya blok dengan nonce yang valid yang dapat ditambahkan ke dalam rantai.

Ketika berlomba untuk membuat sebuah blok, seorang penambang berulang kali memasukkan kumpulan data, yang hanya dapat diperoleh dengan mengunduh dan menjalankan rantai secara keseluruhan (seperti yang dilakukan oleh penambang), melalui sebuah fungsi matematika. Dataset ini digunakan untuk menghasilkan mixHash di bawah target yang ditentukan oleh tingkat kesulitan blok. Cara terbaik untuk ini adalah mengerjakannya lewat percobaan.

Kesulitan menentukan target untuk hash. Semakin rendah targetnya, semakin kecil himpunan hash yang valid. Setelah dibuat, ini sangat mudah diverifikasi oleh penambang dan klien lain. Bahkan jika satu transaksi harus diubah, hash akan menjadi sangat berbeda, yang mengisyaratkan penipuan.

Hashing membuat penipuan mudah untuk dideteksi. Namun, bukti kerja sebagai sebuah proses juga merupakan penghalang besar untuk menyerang rantai tersebut.

### Bukti Kerja dan keamanan {#security}

Para penambang diberi insentif untuk melakukan pekerjaan ini pada rantai Ethereum utama. Hanya ada sedikit insentif bagi sebagian penambang untuk memulai rantai mereka sendiri-ini merusak sistem. Blockchain bertumpu pada kepememilikan satu state tunggal sebagai sumber kebenarannya.

Tujuan dari proof-of-work adalah untuk memperpanjang rantai. Rantai terpanjang adalah yang paling bisa dipercaya sebagai rantai yang valid karena rantai ini memiliki pekerjaan komputasi yang paling banyak untuk menghasilkannya. Dalam sistem PoW Ethereum, hampir tidak mungkin untuk membuat blok baru yang menghapus transaksi, membuat transaksi palsu, atau mempertahankan rantai kedua. Hal ini dikarenakan penambang yang jahat harus selalu menyelesaikan block nonce lebih cepat dibandingkan dengan penambang lainnya.

Untuk secara konsisten membuat blok yang berbahaya namun valid, seorang penambang jahat membutuhkan lebih dari 51% kekuatan penambangan jaringan untuk mengalahkan semua orang. Jumlah "pekerjaan" tersebut membutuhkan banyak daya komputasi yang mahal dan energi yang dihabiskan bahkan mungkin lebih besar daripada keuntungan yang didapat dari sebuah serangan.

### Ekonomi Bukti Kerja {#economics}

Proof-of-work juga bertanggung jawab untuk menerbitkan mata uang baru ke dalam sistem dan memberikan insentif kepada para penambang untuk melakukan pekerjaannya.

Sejak [peningkatan Constantinople](/ethereum-forks/#constantinople), para penambang yang berhasil membuat sebuah blok diberi imbalan dua ETH yang baru dicetak dan sebagian dari biaya transaksi. Blok Ommer juga memberikan kompensasi 1,75 ETH. Blok Ommer adalah blok valid yang dibuat oleh penambang pada waktu yang hampir bersamaan dengan penambang lain yang membuat blok kanonik, yang pada akhirnya ditentukan oleh rantai mana yang dibangun di atasnya terlebih dahulu. Blokir Ommer biasanya terjadi karena latensi jaringan.

## Final {#finality}

Sebuah transaksi memiliki "finality" di Ethereum jika menjadi bagian dari blok yang tidak dapat diubah.

Karena para penambang bekerja dengan cara yang terdesentralisasi, dua blok yang valid dapat ditambang pada saat yang bersamaan. Ini menghasilkan fork yang sementara. Pada akhirnya, salah satu dari rantai ini menjadi rantai yang diterima setelah blok-blok berikutnya ditambang dan ditambahkan ke dalamnya, sehingga menjadi lebih panjang.

Untuk memperumit keadaan, transaksi yang ditolak pada fork sementara mungkin tidak disertakan dalam rantai yang diterima. Ini berarti transaksi dapat dibalikkan. Jadi finality merujuk pada waktu di mana Anda harus menunggu sebelum menganggap satu transaksi tidak dapat dibalik. Di bawah Ethereum Bukti Kerja sebelumnya, semakin banyak blok ditambang di atas blok `N` tertentu, semakin tinggi keyakinan bahwa transaksi di `N` berhasil dan tidak akan dikembalikan. Sekarang, dengan proof-of-stake, finalisasi adalah properti eksplisit, bukan probabilistik, dari sebuah blok.

## Penggunaan energi Bukti Kerja {#energy}

Satu kritik besar terhadap bukti kerja adalah jumlah output energinya yang diperlukan untuk menjaga jaringan tetap aman. Untuk menjaga keamanan dan desentralisasi, Ethereum pada proof-of-work menghabiskan banyak energi. Sesaat sebelum beralih ke Bukti Taruhan, para penambang Ethereum secara kolektif mengonsumsi sekitar 70 TWh/thn (hampir sama dengan Republik Ceko - menurut [digiconomist](https://digiconomist.net/) pada 18 Juli 2022).

## Pro dan kontra {#pros-and-cons}

| Kelebihan                                                                                                                                                                                                                                                                                           | Kekurangan                                                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bukti kerja bersifat netral. Anda tidak perlu ETH untuk memulai dan imbalan blok memungkinkan Anda beranjak dari 0ETH ke saldo yang positif. Dengan [Bukti Taruhan](/developers/docs/consensus-mechanisms/pos/), Anda memerlukan ETH untuk memulai. | Bukti kerja menggunakan terlalu banyak energi yang berakibat buruk bagi lingkungan.                                                                                     |
| Bukti kerja adalah mekanisme konsensus yang telah dicoba dan teruji yang telah mengamankan dan mendesentralisasi Bitcoin dan Ethereum selama bertahun-tahun.                                                                                                                        | Jika Anda ingin menambang, Anda perlu peralatan spesialis yang adalah investasi besar untuk memulai.                                                                    |
| Dibandingkan dengan bukti taruhan, ini relatif mudah dijalankan.                                                                                                                                                                                                                    | Karena meningkatnya komputasi yang diperlukan, pool penambangan bisa berpotensi mendominasi permainan penambangan, yang mengarah pada sentralisasi dan risiko keamanan. |

## Dibandingkan dengan Bukti Taruhan {#compared-to-pos}

Pada tingkat tinggi, bukti taruhan punya tujuan akhir yang sama seperti bukti kerja: untuk menolong jaringan terdesentralisasi mencapai konsensus dengan aman. Tapi, bukti taruhan punya perbedaan dalam proses dan personil:

- Bukti taruhan menghilangkan pentingnya daya komputasi untuk ETH yang ditaruhkan.
- Bukti taruhan menggantikan para penambang dengan para validator. Para validator menaruhkan ETH mereka untuk mengaktifkan kemampuan untuk membuat blok baru.
- Para validator tidak berkompetisi untuk membuat blok, tetapi mereka dipilih secara acak oleh algoritma.
- Finality lebih jelas: pada pos pemeriksaan tertentu, jika 2/3 validator setuju dengan state blok, maka blok dianggap final. Validator harus menaruhkan seluruh taruhannya di sini, jadi jika mereka mencoba berkolusi, mereka akan kehilangan seluruh taruhannya.

[Selengkapnya tentang Bukti Taruhan](/developers/docs/consensus-mechanisms/pos/)

## Selengkapnya tentang pelajar visual? {#visual-learner}

<YouTube id="3EUAcxhuoU4" />

## Bacaan Lebih Lanjut {#further-reading}

- [Serangan mayoritas](https://en.bitcoin.it/wiki/Majority_attack)
- [Tentang finalitas penyelesaian](https://blog.ethereum.org/2016/05/09/on-settlement-finality/)

### Video {#videos}

- [Penjelasan teknis tentang protokol Bukti Kerja](https://youtu.be/9V1bipPkCTU)

## Topik Terkait {#related-topics}

- [Menambang](/developers/docs/consensus-mechanisms/pow/mining/)
- [Proof-of-stake](/developers/docs/consensus-mechanisms/pos/)
- [Bukti Otoritas](/developers/docs/consensus-mechanisms/poa/)
