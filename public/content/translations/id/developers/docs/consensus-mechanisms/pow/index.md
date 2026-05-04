---
title: Proof-of-work (PoW)
description: Penjelasan tentang protokol konsensus proof-of-work dan perannya di Ethereum.
lang: id
---

Jaringan [Ethereum](/) dimulai dengan menggunakan mekanisme konsensus yang melibatkan **[Proof-of-work (PoW)](/developers/docs/consensus-mechanisms/pow)**. Ini memungkinkan node dari jaringan Ethereum untuk menyetujui status dari semua informasi yang tercatat di blockchain Ethereum dan mencegah jenis serangan ekonomi tertentu. Namun, Ethereum mematikan proof-of-work pada tahun 2022 dan mulai menggunakan [proof-of-stake](/developers/docs/consensus-mechanisms/pos) sebagai gantinya.

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
    Proof-of-work kini telah ditinggalkan. Ethereum tidak lagi menggunakan proof-of-work sebagai bagian dari mekanisme konsensusnya. Sebagai gantinya, Ethereum menggunakan proof-of-stake. Baca lebih lanjut tentang [proof-of-stake](/developers/docs/consensus-mechanisms/pos/) dan [mengunci](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

## Prasyarat {#prerequisites}

Untuk lebih memahami halaman ini, kami sarankan Anda terlebih dahulu membaca tentang [transaksi](/developers/docs/transactions/), [blok](/developers/docs/blocks/), dan [mekanisme konsensus](/developers/docs/consensus-mechanisms/).

## Apa itu Proof-of-work (PoW)? {#what-is-pow}

Konsensus Nakamoto, yang memanfaatkan proof-of-work, adalah mekanisme yang dulunya memungkinkan jaringan Ethereum yang terdesentralisasi untuk mencapai konsensus (yaitu, semua node setuju) pada hal-hal seperti saldo akun dan urutan transaksi. Ini mencegah pengguna melakukan "pengeluaran ganda" (double spending) koin mereka dan memastikan bahwa rantai Ethereum sangat sulit untuk diserang atau dimanipulasi. Sifat-sifat keamanan ini sekarang berasal dari proof-of-stake sebagai gantinya menggunakan mekanisme konsensus yang dikenal sebagai [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/).

## Proof-of-work dan penambangan {#pow-and-mining}

Proof-of-work adalah algoritma dasar yang menetapkan tingkat kesulitan dan aturan untuk pekerjaan yang dilakukan penambang di blockchain proof-of-work. Penambangan adalah "pekerjaan" itu sendiri. Ini adalah tindakan menambahkan blok yang valid ke dalam rantai. Hal ini penting karena panjang rantai membantu jaringan mengikuti fork yang benar dari blockchain. Semakin banyak "pekerjaan" yang dilakukan, semakin panjang rantainya, dan semakin tinggi nomor bloknya, semakin yakin jaringan terhadap status saat ini.

[Lebih lanjut tentang penambangan](/developers/docs/consensus-mechanisms/pow/mining/)

## Bagaimana cara kerja proof-of-work Ethereum? {#how-it-works}

Transaksi Ethereum diproses ke dalam blok. Di Ethereum proof-of-work yang kini telah ditinggalkan, setiap blok berisi:

- kesulitan blok (block difficulty) – contohnya: 3,324,092,183,262,715
- mixHash – contohnya: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- nonce – contohnya: `0xd3ee432b4fb3d26b`

Data blok ini berhubungan langsung dengan proof-of-work.

### Pekerjaan dalam proof-of-work {#the-work}

Protokol proof-of-work, Ethash, mengharuskan penambang untuk melalui perlombaan coba-coba (trial and error) yang intens untuk menemukan nonce bagi sebuah blok. Hanya blok dengan nonce yang valid yang dapat ditambahkan ke dalam rantai.

Saat berlomba untuk membuat blok, seorang penambang berulang kali memasukkan kumpulan data, yang hanya dapat diperoleh dengan mengunduh dan menjalankan rantai penuh (seperti yang dilakukan penambang), melalui fungsi matematika. Kumpulan data tersebut digunakan untuk menghasilkan mixHash di bawah target yang ditentukan oleh kesulitan blok. Cara terbaik untuk melakukan ini adalah melalui coba-coba.

Tingkat kesulitan menentukan target untuk hash. Semakin rendah targetnya, semakin kecil kumpulan hash yang valid. Setelah dihasilkan, ini sangat mudah diverifikasi oleh penambang dan klien lain. Bahkan jika satu transaksi berubah, hash-nya akan benar-benar berbeda, menandakan adanya penipuan.

Hashing membuat penipuan mudah dikenali. Namun, proof-of-work sebagai sebuah proses juga merupakan pencegah besar untuk menyerang rantai.

### Proof-of-work dan keamanan {#security}

Penambang diberi insentif untuk melakukan pekerjaan ini di rantai utama Ethereum. Hanya ada sedikit insentif bagi sebagian penambang untuk memulai rantai mereka sendiri—hal itu merusak sistem. Blockchain bergantung pada kepemilikan status tunggal sebagai sumber kebenaran.

Tujuan dari proof-of-work adalah untuk memperpanjang rantai. Rantai terpanjang adalah yang paling dapat dipercaya sebagai rantai yang valid karena memiliki pekerjaan komputasi paling banyak yang dilakukan untuk menghasilkannya. Dalam sistem PoW Ethereum, hampir tidak mungkin untuk membuat blok baru yang menghapus transaksi, membuat transaksi palsu, atau mempertahankan rantai kedua. Itu karena penambang yang berniat jahat harus selalu memecahkan nonce blok lebih cepat daripada orang lain.

Untuk secara konsisten membuat blok yang berbahaya namun valid, penambang yang berniat jahat akan membutuhkan lebih dari 51% kekuatan penambangan jaringan untuk mengalahkan orang lain. Jumlah "pekerjaan" tersebut membutuhkan banyak daya komputasi yang mahal dan energi yang dihabiskan bahkan mungkin lebih besar daripada keuntungan yang didapat dari serangan tersebut.

### Ekonomi proof-of-work {#economics}

Proof-of-work juga bertanggung jawab untuk menerbitkan mata uang baru ke dalam sistem dan memberi insentif kepada penambang untuk melakukan pekerjaan tersebut.

Sejak [pembaruan Constantinople](/ethereum-forks/#constantinople), penambang yang berhasil membuat blok diberi hadiah dua ETH yang baru di-mint dan sebagian dari biaya transaksi. Blok ommer juga memberikan kompensasi sebesar 1,75 ETH. Blok ommer adalah blok valid yang dibuat oleh seorang penambang hampir pada saat yang bersamaan dengan penambang lain yang membuat blok kanonikal, yang pada akhirnya ditentukan oleh rantai mana yang dibangun di atasnya terlebih dahulu. Blok ommer biasanya terjadi karena latensi jaringan.

## Finalitas {#finality}

Sebuah transaksi memiliki "finalitas" di Ethereum ketika transaksi tersebut menjadi bagian dari blok yang tidak dapat berubah.

Karena penambang bekerja dengan cara yang terdesentralisasi, dua blok yang valid dapat ditambang pada saat yang bersamaan. Ini menciptakan fork sementara. Pada akhirnya, salah satu dari rantai ini menjadi rantai yang diterima setelah blok-blok berikutnya ditambang dan ditambahkan ke dalamnya, membuatnya menjadi lebih panjang.

Untuk memperumit keadaan, transaksi yang ditolak pada fork sementara mungkin tidak disertakan dalam rantai yang diterima. Ini berarti transaksi tersebut bisa dibatalkan. Jadi finalitas mengacu pada waktu yang harus Anda tunggu sebelum menganggap sebuah transaksi tidak dapat diubah. Di bawah Ethereum proof-of-work sebelumnya, semakin banyak blok yang ditambang di atas blok `N` tertentu, semakin tinggi keyakinan bahwa transaksi di `N` berhasil dan tidak akan dikembalikan. Sekarang, dengan proof-of-stake, finalisasi adalah properti eksplisit dari sebuah blok, bukan probabilistik.

## Penggunaan energi proof-of-work {#energy}

Kritik utama terhadap proof-of-work adalah jumlah keluaran energi yang dibutuhkan untuk menjaga jaringan tetap aman. Untuk menjaga keamanan dan desentralisasi, Ethereum pada proof-of-work mengonsumsi energi dalam jumlah besar. Sesaat sebelum beralih ke proof-of-stake, penambang Ethereum secara kolektif mengonsumsi sekitar 70 TWh/tahun (hampir sama dengan Republik Ceko - menurut [digiconomist](https://digiconomist.net/) pada 18-Juli-2022).

## Kelebihan dan kekurangan {#pros-and-cons}

| Kelebihan                                                                                                                                                                                                                         | Kekurangan                                                                                                                                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Proof-of-work bersifat netral. Anda tidak memerlukan ETH untuk memulai dan hadiah blok memungkinkan Anda beralih dari 0 ETH ke saldo positif. Dengan [proof-of-stake](/developers/docs/consensus-mechanisms/pos/) Anda memerlukan ETH untuk memulai. | Proof-of-work menghabiskan begitu banyak energi sehingga berdampak buruk bagi lingkungan.                                                                      |
| Proof-of-work adalah mekanisme konsensus yang telah dicoba dan diuji yang telah menjaga Bitcoin dan Ethereum tetap aman dan terdesentralisasi selama bertahun-tahun.                                                                                          | Jika Anda ingin menambang, Anda memerlukan peralatan khusus yang merupakan investasi besar untuk memulai.                                                |
| Dibandingkan dengan proof-of-stake, ini relatif mudah untuk diimplementasikan.                                                                                                                                                                | Karena meningkatnya komputasi yang dibutuhkan, kolam penambangan (mining pools) berpotensi mendominasi permainan penambangan, yang mengarah pada sentralisasi dan risiko keamanan. |

## Dibandingkan dengan proof-of-stake {#compared-to-pos}

Pada tingkat tinggi, proof-of-stake memiliki tujuan akhir yang sama dengan proof-of-work: untuk membantu jaringan terdesentralisasi mencapai konsensus dengan aman. Namun, ada beberapa perbedaan dalam proses dan personel:

- Proof-of-stake menukar pentingnya daya komputasi dengan ETH yang di-stake.
- Proof-of-stake menggantikan penambang dengan validator. Validator melakukan stake ETH mereka untuk mengaktifkan kemampuan membuat blok baru.
- Validator tidak bersaing untuk membuat blok, melainkan mereka dipilih secara acak oleh sebuah algoritma.
- Finalitas lebih jelas: pada pos pemeriksaan (checkpoints) tertentu, jika 2/3 validator setuju pada status blok, itu dianggap final. Validator harus mempertaruhkan seluruh stake mereka pada hal ini, jadi jika mereka mencoba berkolusi di kemudian hari, mereka akan kehilangan seluruh stake mereka.

[Lebih lanjut tentang proof-of-stake](/developers/docs/consensus-mechanisms/pos/)

## Lebih suka belajar secara visual? {#visual-learner}

<YouTube id="3EUAcxhuoU4" />

## Bacaan Lebih Lanjut {#further-reading}

- [Serangan mayoritas (Majority attack)](https://en.bitcoin.it/wiki/Majority_attack)
- [Tentang finalitas penyelesaian (On settlement finality)](https://blog.ethereum.org/2016/05/09/on-settlement-finality)

### Video {#videos}

- [Penjelasan teknis tentang protokol proof-of-work](https://youtu.be/9V1bipPkCTU)

## Topik Terkait {#related-topics}

- [Penambangan](/developers/docs/consensus-mechanisms/pow/mining/)
- [Proof-of-stake](/developers/docs/consensus-mechanisms/pos/)
- [Proof-of-authority](/developers/docs/consensus-mechanisms/poa/)