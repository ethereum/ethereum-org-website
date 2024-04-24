---
title: Pohon Verkle
description: Penjelasan tingkat tinggi tentang pohon Verkle dan bagaimana pohon tersebut akan digunakan untuk meningkatkan Ethereum
lang: id
summaryPoints:
  - Temukan apa itu pohon Verkle
  - Baca mengapa Pohon Verkle adalah peningkatan yang berguna untuk Ethereum
---

# Pohon Verkle {#verkle-trees}

Pohon Verkle (gabungan dari "Vector commitment" dan "Merkle Trees") adalah sebuah struktur data yang dapat digunakan untuk meningkatkan simpul Ethereum sehingga simpul tersebut dapat berhenti menyimpan data status dalam jumlah besar tanpa kehilangan kemampuan untuk memvalidasi blok.

## Tanpa kewarganegaraan {#statelessness}

Pohon Verkle adalah langkah penting dalam perjalanan menuju klien Ethereum tanpa kewarganegaraan. Klien tanpa kewarganegaraan adalah klien yang tidak perlu menyimpan seluruh database status untuk memvalidasi blok yang masuk. Alih-alih menggunakan salinan lokal status Ethereumnya sendiri untuk memverifikasi blok, klien tanpa status menggunakan "saksi" untuk data status yang datang bersama blok. Saksi adalah sebuah kumpulan potongan-potongan individu dari data status yang diperlukan untuk mengeksekusi serangkaian transaksi tertentu, dan bukti kriptografi bahwa saksi tersebut benar-benar merupakan bagian dari data lengkap. Saksi digunakan, _bukan_ dari database keadaan. Agar hal ini dapat bekerja, saksi harus berukuran sangat kecil, sehingga dapat disiarkan dengan aman di seluruh jaringan pada waktunya agar validator dapat memprosesnya dalam ruang 12 detik. Struktur data status saat ini tidak cocok karena saksi terlalu besar. Pohon Verkle memecahkan masalah ini dengan memungkinkan saksi kecil, menghilangkan salah satu hambatan utama bagi klien tanpa status.

<ExpandableCard title="Mengapa kami menginginkan klien tanpa status?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

Klien Ethereum saat ini menggunakan struktur data yang dikenal sebagai Patricia Merkle Trie untuk menyimpan data statusnya. Informasi mengenai masing-masing akun disimpan sebagai daun pada trie dan pasangan daun di-hash berulang kali hingga hanya satu hash yang tersisa. Hash terakhir ini dikenal sebagai "akar". Untuk memverifikasi blok, klien Ethereum mengeksekusi semua transaksi dalam sebuah blok dan memperbarui trie status lokal mereka. Blok dianggap valid jika akar dari pohon lokal identik dengan yang disediakan oleh pengusul blok, karena setiap perbedaan dalam komputasi yang dilakukan oleh pengusul blok dan simpul yang memvalidasi akan menyebabkan hash akar benar-benar berbeda. Masalahnya adalah memverifikasi rantai blok mengharuskan setiap klien untuk menyimpan seluruh state trie untuk blok kepala dan beberapa blok historis (default di Geth adalah menyimpan data status untuk 128 blok di belakang blok kepala). Hal ini mengharuskan klien untuk memiliki akses ke ruang disk yang besar, yang merupakan penghalang untuk menjalankan simpul penuh pada perangkat keras yang murah dan berdaya rendah. Solusi untuk hal ini adalah dengan memperbarui trie status ke struktur yang lebih efisien (Verkle tree) yang dapat diringkas menggunakan "saksi" kecil pada data yang dapat dibagikan, bukan data status yang lengkap. Memformat ulang data negara bagian ke dalam pohon Verkle adalah batu loncatan untuk beralih ke klien tanpa status.

</ExpandableCard>

## Apa itu witness dan mengapa dibutuhkan? {#what-is-a-witness}

Memverifikasi blok berarti mengeksekusi ulang transaksi yang terdapat di blok tersebut, menerapkan perubahan pada pohon keadaan Ethereum, dan menghitung hash akar yang baru. Blok terverifikasi adalah blok dengan hash akar keadaan terkomputasi yang sama dengan hash akar keadaan yang disediakan pada blok tersebut (karena hal ini berarti pengusul blok benar-benar melakukan komputasi yang diakuinya). Pada klien Ethereum saat ini, memperbarui keadaan membutuhkan akses ke seluruh pohon keadaan, yang merupakan struktur data besar yang harus disimpan secara lokal. Witness hanya berisi fragmen data keadaan yang dibutuhkan untuk menjalankan transaksi dalam blok. Validator kemudian hanya dapat menggunakan fragmen tersebut untuk memverifikasi bahwa pengusul blok telah mengeksekusi transaksi blok dan memperbarui keadaan dengan tepat. Namun, hal ini berarti bahwa witness perlu ditransfer di antara peer di jaringan Ethereum dengan cukup cepat untuk diterima dan diproses oleh setiap simpul dengan aman dalam ruang 12 detik. Jika witness terlalu besar, beberapa simpul mungkin membutuhkan waktu terlalu lama untuk mengunduhnya dan mengikuti perkembangan rantai. Ini adalah kekuatan sentralisasi karena hanya simpul dengan koneksi internet cepat yang dapat berpartisipasi dalam memvalidasi blok. Dengan pohon Verkle, tidak perlu menyimpan keadaan di hard disk Anda; _segala sesuatu_ yang dibutuhkan untuk memverifikasi blok terkandung di dalam blok itu sendiri. Sayangnya, witness yang dapat dihasilkan dari pohon Merkle terlalu besar untuk mendukung klien tanpa keadaan.

## Mengapa pohon Verkle memungkinkan witness yang lebih kecil? {#why-do-verkle-trees-enable-smaller-witnesses}

Struktur pohon Merkle menyebabkan ukuran witness menjadi sangat besar - terlalu besar untuk disebarkan dengan aman di antara peer dalam ruang 12 detik. Hal ini karena witness adalah jalur yang menghubungkan data, yang disimpan dalam daun, dengan hash akar. Untuk memverifikasi data, tidak hanya semua hash perantara yang harus menghubungkan setiap daun dengan akar, tetapi semua simpul "saudara" juga harus melakukannya. Setiap simpul dalam bukti memiliki saudara yang di-hash untuk membuat hash berikutnya pada pohon. Proses Ini menghasilkan sangat banyak data. Pohon Verkle mengurangi ukuran witness dengan memperpendek jarak antara daun pohon dan akarnya serta juga menghilangkan kebutuhan untuk menyediakan simpul saudara untuk memverifikasi hash akar. Penggunaan skema komitmen polinomial yang kuat akan meningkatkan efisiensi ruang dibandingkan dengan komitmen vektor bergaya hash. Komitmen polinomial memungkinkan witness memiliki ukuran yang tetap, terlepas dari jumlah daun yang dibuktikannya.

Dalam skema komitmen polinomial, witness memiliki ukuran terkelola yang dapat dengan mudah ditransfer pada jaringan peer-to-peer. Hal ini memungkinkan klien memverifikasi perubahan keadaan di setiap blok dengan jumlah data yang minimal.

<ExpandableCard title="Secara eksak, seberapa besarkah pengurangan ukuran witness yang dapat dilakukan oleh pohon Verkle?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

Ukuran witness berbeda-beda, bergantung pada jumlah daun yang disertakannya. Dengan asumsi bahwa witness mencakup 1000 daun, satu witness untuk pohon Merkle akan berukuran sekitar 3,5MB (dengan asumsi ada 7 tingkat ke pohon). Witness untuk data yang sama di pohon Verkle (dengan asumsi ada 4 tingkat ke pohon) akan berukuran sekitar 150 kB - **sekitar 23x lebih kecil**. Dengan penurunan ukuran ini, witness pada klien tanpa keadaan dapat menjadi cukup kecil sehingga dapat diterima. Witness polinomial berukuran 0,128 -1 kB bergantung pada komitmen polinomial spesifik yang digunakan).

</ExpandableCard>

## Bagaimana struktur pohon Verkle? {#what-is-the-structure-of-a-verkle-tree}

Pohon Verkle adalah pasangan `(key,value)`, di mana kunci adalah elemen 32 byte yang terdiri dari 31 byte _stem_ dan satu byte _sufiks_. Berbagai kunci ini diorganisasikan dalam simpul _ekstensi_ dan simpul _dalam_. Simpul ekstensi mewakili satu stem untuk 256 anak dengan sufiks yang berbeda. Simpul dalam juga memiliki 256 anak yang di antaranya dapat berupa simpul ekstensi lainnya. Perbedaan utama antara struktur pohon Verkle dan pohon Merkle adalah pohon Verkle jauh lebih datar, yang berarti lebih sedikit simpul perantara yang menghubungkan daun ke akar sehingga lebih sedikit data yang diperlukan untuk menghasilkan bukti.

![](./verkle.png)

[Baca selengkapnya tentang struktur pohon Verkle](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## Kemajuan saat ini {#current-progress}

Jaringan percobaan pohon Verkle sudah aktif dan berjalan, tetapi masih ada pembaruan dalam jumlah besar yang harus dilakukan oleh klien agar dapat mendukung pohon Verkle. Anda dapat membantu mempercepat kemajuan dengan menggunakan kontrak ke jaringan percobaan atau menjalankan klien jaringan percobaan.

[Jelajahi jaringan percobaan Verkle Gen Devnet 2](https://verkle-gen-devnet-2.ethpandaops.io/)

[Tonton penjelasan Guillaume Ballet tentang jaringan percobaan Condrieu Verkle](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (perhatikan bahwa jaringan percobaan Condrieu menggunakan konsep bukti kerja dan sekarang telah digantikan oleh jaringan percobaan Verkle Gen Devnet 2).

## Bacaan lebih lanjut {#further-reading}

- [Pohon Verkle untuk Keadaan Tanpa Kewarganegaraan](https://verkle.info/)
- [Dankrad Feist menjelaskan pohon Verkle di PEEPanEIP](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [Guillaume Ballet menjelaskan pohon verkle di ETHGlobal](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- ["Cara pohon Verkle menjadikan Ethereum ramping dan efektif" oleh Guillaume Ballet di Devcon 6](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [Piper Merriam tentang klien tanpa keadaan dari ETHDenver 2020](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [Dankrad Fiest menjelaskan pohon Verkle dan kondisi tanpa keadaan di podcast Zero Knowledge](https://zeroknowledge.fm/episode-202-stateless-ethereum-verkle-tries-with-dankrad-feist/)
- [Vitalik Buterin tentang pohon Verkle](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Dankrad Feist tentang pohon Verkle](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [Dokumentasi EIP pohon Verkle](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)
