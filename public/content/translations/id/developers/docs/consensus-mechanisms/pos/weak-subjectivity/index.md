---
title: Subjektivitas lemah
description: Penjelasan tentang subjektivitas lemah dan perannya dalam PoS Ethereum.
lang: id
---

Subjektivitas dalam blockchain mengacu pada ketergantungan pada informasi sosial untuk menyetujui status saat ini. Mungkin ada beberapa fork valid yang dipilih berdasarkan informasi yang dikumpulkan dari rekan (peer) lain di jaringan. Kebalikannya adalah objektivitas yang mengacu pada rantai di mana hanya ada satu rantai valid yang mungkin yang pasti akan disetujui oleh semua node dengan menerapkan aturan yang dikodekan. Ada juga status ketiga, yang dikenal sebagai subjektivitas lemah. Ini mengacu pada rantai yang dapat berkembang secara objektif setelah beberapa benih informasi awal diambil secara sosial.

## Prasyarat {#prerequisites}

Untuk memahami halaman ini, Anda harus terlebih dahulu memahami dasar-dasar [proof-of-stake](/developers/docs/consensus-mechanisms/pos/).

## Masalah apa yang diselesaikan oleh subjektivitas lemah? {#problems-ws-solves}

Subjektivitas melekat pada blockchain proof-of-stake karena memilih rantai yang benar dari beberapa fork dilakukan dengan menghitung suara historis. Hal ini mengekspos blockchain ke beberapa vektor serangan, termasuk serangan jarak jauh (long-range attacks) di mana node yang berpartisipasi sangat awal dalam rantai mempertahankan fork alternatif yang mereka rilis jauh di kemudian hari untuk keuntungan mereka sendiri. Sebagai alternatif, jika 33% validator menarik stake mereka tetapi terus mengesahkan dan menghasilkan blok, mereka mungkin menghasilkan fork alternatif yang bertentangan dengan rantai kanonikal. Node baru atau node yang telah offline untuk waktu yang lama mungkin tidak menyadari bahwa validator penyerang ini telah menarik dana mereka, sehingga penyerang dapat menipu mereka untuk mengikuti rantai yang salah. [Ethereum](/) dapat menyelesaikan vektor serangan ini dengan memberlakukan batasan yang mengurangi aspek subjektif dari mekanisme—dan karenanya asumsi kepercayaan—ke tingkat minimum.

## Titik periksa subjektivitas lemah {#ws-checkpoints}

Subjektivitas lemah diimplementasikan dalam Ethereum proof-of-stake dengan menggunakan "titik periksa subjektivitas lemah" (weak subjectivity checkpoints). Ini adalah akar status (state roots) yang disetujui oleh semua node di jaringan sebagai bagian dari rantai kanonikal. Mereka melayani tujuan "kebenaran universal" yang sama seperti blok genesis, kecuali bahwa mereka tidak berada pada posisi genesis di blockchain. Algoritma pilihan fork mempercayai bahwa status blockchain yang ditentukan dalam titik periksa tersebut adalah benar dan secara independen serta objektif memverifikasi rantai dari titik itu dan seterusnya. Titik periksa bertindak sebagai "batas pengembalian" (revert limits) karena blok yang terletak sebelum titik periksa subjektivitas lemah tidak dapat diubah. Hal ini merusak serangan jarak jauh hanya dengan mendefinisikan fork jarak jauh sebagai tidak valid sebagai bagian dari desain mekanisme. Memastikan bahwa titik periksa subjektivitas lemah dipisahkan oleh jarak yang lebih kecil daripada periode penarikan validator memastikan bahwa validator yang melakukan fork pada rantai akan dipotong (slashed) setidaknya sejumlah ambang batas sebelum mereka dapat menarik stake mereka dan bahwa pendatang baru tidak dapat ditipu ke fork yang salah oleh validator yang stake-nya telah ditarik.

## Perbedaan antara titik periksa subjektivitas lemah dan blok yang difinalisasi {#difference-between-ws-and-finalized-blocks}

Blok yang difinalisasi dan titik periksa subjektivitas lemah diperlakukan secara berbeda oleh node Ethereum. Jika sebuah node menyadari adanya dua blok yang difinalisasi yang bersaing, maka node tersebut akan bimbang di antara keduanya - node tidak memiliki cara untuk mengidentifikasi secara otomatis mana yang merupakan fork kanonikal. Ini adalah gejala kegagalan konsensus. Sebaliknya, sebuah node hanya menolak blok apa pun yang bertentangan dengan titik periksa subjektivitas lemahnya. Dari perspektif node, titik periksa subjektivitas lemah mewakili kebenaran mutlak yang tidak dapat dirusak oleh pengetahuan baru dari rekan-rekannya.

## Seberapa lemah itu lemah? {#how-weak-is-weak}

Aspek subjektif dari proof-of-stake Ethereum adalah persyaratan untuk status terbaru (titik periksa subjektivitas lemah) dari sumber tepercaya untuk disinkronkan. Risiko mendapatkan titik periksa subjektivitas lemah yang buruk sangat rendah karena dapat diperiksa terhadap beberapa sumber publik independen seperti penjelajah blok atau beberapa node. Namun, selalu ada tingkat kepercayaan tertentu yang diperlukan untuk menjalankan aplikasi perangkat lunak apa pun, misalnya, mempercayai bahwa pengembang perangkat lunak telah menghasilkan perangkat lunak yang jujur.

Titik periksa subjektivitas lemah bahkan mungkin datang sebagai bagian dari perangkat lunak klien. Bisa dibilang penyerang dapat merusak titik periksa dalam perangkat lunak dan dapat dengan mudah merusak perangkat lunak itu sendiri. Tidak ada rute kripto-ekonomi yang nyata untuk mengatasi masalah ini, tetapi dampak dari pengembang yang tidak dapat dipercaya diminimalkan di Ethereum dengan memiliki beberapa tim klien independen, masing-masing membangun perangkat lunak yang setara dalam bahasa yang berbeda, semuanya dengan kepentingan pribadi dalam mempertahankan rantai yang jujur. Penjelajah blok juga dapat menyediakan titik periksa subjektivitas lemah atau cara untuk merujuk silang titik periksa yang diperoleh dari tempat lain terhadap sumber tambahan.

Terakhir, titik periksa dapat diminta dari node lain; mungkin pengguna Ethereum lain yang menjalankan node penuh dapat memberikan titik periksa yang kemudian dapat diverifikasi oleh validator terhadap data dari penjelajah blok. Secara keseluruhan, mempercayai penyedia titik periksa subjektivitas lemah dapat dianggap sama bermasalahnya dengan mempercayai pengembang klien. Kepercayaan keseluruhan yang diperlukan adalah rendah. Penting untuk dicatat bahwa pertimbangan ini hanya menjadi penting dalam peristiwa yang sangat tidak mungkin terjadi di mana mayoritas validator berkonspirasi untuk menghasilkan fork alternatif dari blockchain. Dalam keadaan lain apa pun, hanya ada satu rantai Ethereum yang dapat dipilih.

## Bacaan Lebih Lanjut {#further-reading}

- [Subjektivitas lemah di Eth2](https://notes.ethereum.org/@adiasg/weak-subjectvity-eth2)
- [Vitalik: Bagaimana saya belajar mencintai subjektivitas lemah](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity)
- [Subjektivitas lemah (Dokumentasi Teku)](https://docs.teku.consensys.io/concepts/weak-subjectivity)
- [Panduan subjektivitas lemah Fase-0](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/weak-subjectivity.md)
- [Analisis subjektivitas lemah di Ethereum 2.0](https://github.com/runtimeverification/beacon-chain-verification/blob/master/weak-subjectivity/weak-subjectivity-analysis.pdf)