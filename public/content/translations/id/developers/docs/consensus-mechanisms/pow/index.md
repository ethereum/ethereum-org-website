---
title: Bukti Kerja (PoW)
description: Penjelasan tentang protokol konsensus Bukti Kerja (PoW) dan perannya di Ethereum.
lang: id
---

Jaringan [Ethereum](/) dimulai dengan menggunakan mekanisme konsensus yang melibatkan **[Bukti Kerja (PoW)](/developers/docs/consensus-mechanisms/pow)**. Hal ini memungkinkan node dari jaringan Ethereum untuk menyepakati state dari semua informasi yang tercatat di rantai blok Ethereum dan mencegah jenis serangan ekonomi tertentu. Namun, Ethereum mematikan Bukti Kerja (PoW) pada tahun 2022 dan mulai menggunakan [Bukti Kepemilikan (PoS)](/developers/docs/consensus-mechanisms/pos) sebagai gantinya.

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
    Bukti Kerja (PoW) kini telah ditinggalkan. Ethereum tidak lagi menggunakan Bukti Kerja (PoW) sebagai bagian dari mekanisme konsensusnya. Sebagai gantinya, Ethereum menggunakan Bukti Kepemilikan (PoS). Baca lebih lanjut tentang [Bukti Kepemilikan (PoS)](/developers/docs/consensus-mechanisms/pos/) dan [staking](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

## Prasyarat {#prerequisites}

Untuk lebih memahami halaman ini, kami sarankan Anda membaca terlebih dahulu tentang [transaksi](/developers/docs/transactions/), [blok](/developers/docs/blocks/), dan [mekanisme konsensus](/developers/docs/consensus-mechanisms/).

## Apa itu Bukti Kerja (PoW)? {#what-is-pow}

Konsensus Nakamoto, yang memanfaatkan Bukti Kerja (PoW), adalah mekanisme yang dulunya memungkinkan jaringan Ethereum yang terdesentralisasi untuk mencapai konsensus (yaitu, semua node setuju) pada hal-hal seperti saldo akun dan urutan transaksi. Hal ini mencegah pengguna melakukan "pengeluaran ganda" koin mereka dan memastikan bahwa rantai Ethereum sangat sulit untuk diserang atau dimanipulasi. Properti keamanan ini sekarang berasal dari Bukti Kepemilikan (PoS) menggunakan mekanisme konsensus yang dikenal sebagai [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/).

## Bukti Kerja (PoW) dan penambangan {#pow-and-mining}

Bukti Kerja (PoW) adalah algoritma dasar yang menetapkan kesulitan dan aturan untuk pekerjaan yang dilakukan penambang pada rantai blok Bukti Kerja (PoW). Penambangan adalah "kerja" itu sendiri. Ini adalah tindakan menambahkan blok yang valid ke dalam rantai. Hal ini penting karena panjang rantai membantu jaringan mengikuti percabangan rantai blok yang benar. Semakin banyak "kerja" yang dilakukan, semakin panjang rantai, dan semakin tinggi nomor blok, semakin yakin jaringan terhadap state saat ini.

[Lebih lanjut tentang penambangan](/developers/docs/consensus-mechanisms/pow/mining/)

## Bagaimana cara kerja Bukti Kerja (PoW) Ethereum? {#how-it-works}

Transaksi Ethereum diproses menjadi blok. Di Ethereum Bukti Kerja (PoW) yang kini telah ditinggalkan, setiap blok berisi:

- kesulitan blok – misalnya: 3,324,092,183,262,715
- mixHash – misalnya: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- nonce – misalnya: `0xd3ee432b4fb3d26b`

Data blok ini berhubungan langsung dengan Bukti Kerja (PoW).

### Kerja dalam Bukti Kerja (PoW) {#the-work}

Protokol Bukti Kerja (PoW), Ethash, mengharuskan penambang untuk melalui perlombaan coba-coba yang intens untuk menemukan nonce bagi sebuah blok. Hanya blok dengan nonce yang valid yang dapat ditambahkan ke rantai.

Saat berlomba untuk membuat blok, seorang penambang berulang kali memasukkan kumpulan data, yang hanya dapat diperoleh dengan mengunduh dan menjalankan rantai penuh (seperti yang dilakukan penambang), melalui fungsi matematika. Kumpulan data tersebut digunakan untuk menghasilkan mixHash di bawah target yang ditentukan oleh kesulitan blok. Cara terbaik untuk melakukan ini adalah melalui coba-coba.

Kesulitan menentukan target untuk hash. Semakin rendah targetnya, semakin kecil kumpulan hash yang valid. Setelah dihasilkan, ini sangat mudah diverifikasi oleh penambang dan klien lain. Bahkan jika satu transaksi berubah, hash akan menjadi sama sekali berbeda, yang menandakan adanya penipuan.

Proses hash membuat penipuan mudah dikenali. Namun, Bukti Kerja (PoW) sebagai sebuah proses juga merupakan pencegah besar untuk menyerang rantai.

### Bukti Kerja (PoW) dan keamanan {#security}

Penambang diberi insentif untuk melakukan pekerjaan ini di rantai utama Ethereum. Hanya ada sedikit insentif bagi sebagian penambang untuk memulai rantai mereka sendiri—hal itu merusak sistem. Rantai blok bergantung pada kepemilikan state tunggal sebagai sumber kebenaran.

Tujuan dari Bukti Kerja (PoW) adalah untuk memperpanjang rantai. Rantai terpanjang adalah yang paling dapat dipercaya sebagai rantai yang valid karena memiliki pekerjaan komputasi terbanyak yang dilakukan untuk menghasilkannya. Di dalam sistem PoW Ethereum, hampir tidak mungkin untuk membuat blok baru yang menghapus transaksi, membuat transaksi palsu, atau mempertahankan rantai kedua. Itu karena penambang yang berniat jahat harus selalu memecahkan nonce blok lebih cepat daripada orang lain.

Untuk secara konsisten membuat blok berbahaya namun valid, penambang yang berniat jahat akan membutuhkan lebih dari 51% kekuatan penambangan jaringan untuk mengalahkan orang lain. Jumlah "kerja" tersebut membutuhkan banyak daya komputasi yang mahal dan energi yang dihabiskan bahkan mungkin lebih besar daripada keuntungan yang didapat dari serangan tersebut.

### Ekonomi Bukti Kerja (PoW) {#economics}

Bukti Kerja (PoW) juga bertanggung jawab untuk menerbitkan mata uang baru ke dalam sistem dan memberi insentif kepada penambang untuk melakukan pekerjaan tersebut.

Sejak [pembaruan Constantinople](/ethereum-forks/#constantinople), penambang yang berhasil membuat blok diberi hadiah dua ETH yang baru dicetak dan sebagian dari biaya transaksi. Blok ommer juga memberikan kompensasi sebesar 1,75 ETH. Blok ommer adalah blok valid yang dibuat oleh seorang penambang hampir pada saat yang bersamaan dengan penambang lain yang membuat blok kanonikal, yang pada akhirnya ditentukan oleh rantai mana yang dibangun di atasnya terlebih dahulu. Blok ommer biasanya terjadi karena latensi jaringan.

## Finalitas {#finality}

Sebuah transaksi memiliki "finalitas" di Ethereum ketika transaksi tersebut menjadi bagian dari blok yang tidak dapat berubah.

Karena penambang bekerja dengan cara yang terdesentralisasi, dua blok yang valid dapat ditambang pada saat yang bersamaan. Hal ini menciptakan percabangan sementara. Pada akhirnya, salah satu dari rantai ini menjadi rantai yang diterima setelah blok-blok berikutnya ditambang dan ditambahkan ke dalamnya, membuatnya menjadi lebih panjang.

Untuk membuat segalanya lebih rumit, transaksi yang ditolak pada percabangan sementara mungkin tidak disertakan dalam rantai yang diterima. Ini berarti transaksi tersebut dapat dibatalkan. Jadi finalitas mengacu pada waktu yang harus Anda tunggu sebelum menganggap sebuah transaksi tidak dapat diubah. Di bawah Ethereum Bukti Kerja (PoW) sebelumnya, semakin banyak blok yang ditambang di atas blok tertentu `N`, semakin tinggi keyakinan bahwa transaksi di `N` berhasil dan tidak akan dikembalikan. Sekarang, dengan Bukti Kepemilikan (PoS), finalisasi adalah properti eksplisit dari sebuah blok, bukan probabilistik.

## Penggunaan energi Bukti Kerja (PoW) {#energy}

Kritik utama terhadap Bukti Kerja (PoW) adalah jumlah keluaran energi yang dibutuhkan untuk menjaga jaringan tetap aman. Untuk menjaga keamanan dan desentralisasi, Ethereum pada Bukti Kerja (PoW) mengonsumsi energi dalam jumlah besar. Sesaat sebelum beralih ke Bukti Kepemilikan (PoS), penambang Ethereum secara kolektif mengonsumsi sekitar 70 TWh/tahun (hampir sama dengan Republik Ceko - menurut [digiconomist](https://digiconomist.net/) pada 18-Juli-2022).

## Kelebihan dan kekurangan {#pros-and-cons}

| Kelebihan                                                                                                                                                                                                                         | Kekurangan                                                                                                                                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Bukti Kerja (PoW) bersifat netral. Anda tidak memerlukan ETH untuk memulai dan hadiah blok memungkinkan Anda beralih dari 0 ETH ke saldo positif. Dengan [Bukti Kepemilikan (PoS)](/developers/docs/consensus-mechanisms/pos/) Anda memerlukan ETH untuk memulai. | Bukti Kerja (PoW) menghabiskan begitu banyak energi sehingga berdampak buruk bagi lingkungan.                                                                      |
| Bukti Kerja (PoW) adalah mekanisme konsensus yang telah dicoba dan diuji yang telah menjaga Bitcoin dan Ethereum tetap aman dan terdesentralisasi selama bertahun-tahun.                                                                                          | Jika Anda ingin menambang, Anda memerlukan peralatan khusus yang merupakan investasi besar untuk memulai.                                                |
| Dibandingkan dengan Bukti Kepemilikan (PoS), ini relatif mudah untuk diimplementasikan.                                                                                                                                                                | Karena komputasi yang dibutuhkan semakin meningkat, pool penambangan berpotensi mendominasi permainan penambangan, yang mengarah pada sentralisasi dan risiko keamanan. |

## Dibandingkan dengan Bukti Kepemilikan (PoS) {#compared-to-pos}

Pada tingkat tinggi, Bukti Kepemilikan (PoS) memiliki tujuan akhir yang sama dengan Bukti Kerja (PoW): untuk membantu jaringan yang terdesentralisasi mencapai konsensus dengan aman. Namun, ada beberapa perbedaan dalam proses dan personel:

- Bukti Kepemilikan (PoS) menukar pentingnya daya komputasi dengan ETH yang di-stake.
- Bukti Kepemilikan (PoS) menggantikan penambang dengan validator. Validator men-stake ETH mereka untuk mengaktifkan kemampuan membuat blok baru.
- Validator tidak bersaing untuk membuat blok, melainkan dipilih secara acak oleh algoritma.
- Finalitas lebih jelas: pada pos pemeriksaan tertentu, jika 2/3 validator menyetujui state blok, maka blok tersebut dianggap final. Validator harus mempertaruhkan seluruh stake mereka pada hal ini, jadi jika mereka mencoba berkolusi di kemudian hari, mereka akan kehilangan seluruh stake mereka.

[Lebih lanjut tentang Bukti Kepemilikan (PoS)](/developers/docs/consensus-mechanisms/pos/)

## Lebih suka belajar secara visual? {#visual-learner}

<VideoWatch slug="proof-of-work-explained" />

## Bacaan Lebih Lanjut {#further-reading}

- [Serangan mayoritas](https://en.bitcoin.it/wiki/Majority_attack)
- [Tentang finalitas penyelesaian](https://blog.ethereum.org/2016/05/09/on-settlement-finality)

### Video {#videos}

- [Penjelasan teknis tentang protokol Bukti Kerja (PoW)](https://youtu.be/9V1bipPkCTU)

## Topik Terkait {#related-topics}

- [Penambangan](/developers/docs/consensus-mechanisms/pow/mining/)
- [Bukti Kepemilikan (PoS)](/developers/docs/consensus-mechanisms/pos/)
- [Bukti otoritas (PoA)](/developers/docs/consensus-mechanisms/poa/)