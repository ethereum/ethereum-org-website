---
title: Subjektivitas lemah
description: Penjelasan tentang subjektivitas lemah dan perannya dalam Ethereum berbasis PoS.
lang: id
---

Subjektivitas dalam blockchain mengacu pada ketergantungan pada informasi sosial untuk setuju tentang keadaan saat ini. Terdapat beberapa cabang valid yang dipilih berdasarkan informasi yang dikumpulkan dari mitra lain dalam jaringan. Sebaliknya, objektivitas mengacu pada rantai di mana hanya ada satu rantai valid yang mungkin yang semua node akan sepakat dengan menerapkan aturan yang telah terkode dalam mereka. Terdapat juga keadaan ketiga, yang dikenal sebagai subjektivitas lemah. Ini mengacu pada sebuah rantai yang dapat berkembang secara objektif setelah beberapa benih informasi awal diambil secara sosial.

## Persyaratan {#prerequisites}

Untuk memahami halaman ini, Anda perlu terlebih dahulu memahami dasar-dasar [proof-of-stake](/developers/docs/consensus-mechanisms/pos/).

## Masalah apa yang dipecahkan oleh subjektivitas lemah? {#problems-ws-solves}

Subjektivitas melekat pada blockchain proof-of-stake karena pemilihan rantai yang benar dari beberapa cabang dilakukan dengan menghitung suara historis. Hal ini menghadapkan blockchain pada beberapa vektor serangan, termasuk serangan jarak jauh di mana node yang berpartisipasi sangat awal dalam rantai mempertahankan cabang alternatif yang mereka lepaskan jauh lebih lambat demi keuntungan mereka sendiri. Atau, jika 33% dari validator menarik staked mereka tetapi tetap memberikan kesaksian dan menghasilkan blok, mereka mungkin menghasilkan cabang alternatif yang bertentangan dengan rantai kanonikal. Node baru atau node yang telah lama offline mungkin tidak menyadari bahwa validator yang melakukan serangan telah menarik dana mereka, sehingga penyerang dapat menipu mereka untuk mengikuti rantai yang salah. Ethereum dapat mengatasi vektor serangan ini dengan memberlakukan pembatasan yang mengurangi aspek subjektif dari mekanisme tersebut—dan oleh karena itu asumsi kepercayaan—hingga batas minimum yang mutlak.

## Titik pemeriksaan subjektivitas lemah {#ws-checkpoints}

Subjektivitas lemah diimplementasikan dalam Ethereum berbasis proof-of-stake dengan menggunakan "titik pemeriksaan subjektivitas lemah". Ini adalah akar keadaan yang semua node dalam jaringan sepakat bahwa mereka termasuk dalam rantai kanonikal. Mereka berfungsi dengan tujuan “kebenaran universal” yang sama seperti blok genesis, hanya saja posisi mereka tidak berada di awal rantai blok. Algoritma pemilihan cabang percaya bahwa keadaan blockchain yang ditentukan dalam titik pemeriksaan itu benar dan bahwa itu secara independen dan objektif memverifikasi rantai dari titik tersebut ke depan. Titik pemeriksaan tersebut bertindak sebagai "batas pembalikan" karena blok yang berada sebelum titik pemeriksaan subjektivitas lemah tidak dapat diubah. Ini merongrong serangan jarak jauh dengan cara mendefinisikan cabang-cabang jarak jauh menjadi tidak valid sebagai bagian dari desain mekanisme. Memastikan bahwa titik pemeriksaan subjektivitas lemah dipisahkan oleh jarak yang lebih kecil daripada periode penarikan validator memastikan bahwa seorang validator yang bercabang dari rantai akan dikenai potongan setidaknya sejumlah ambang batas sebelum mereka dapat menarik staked mereka, dan bahwa peserta baru tidak dapat ditipu masuk ke cabang yang salah oleh validator yang stakenya telah ditarik.

## Perbedaan antara titik pemeriksaan subjektivitas lemah dan blok yang sudah difinalisasi {#difference-between-ws-and-finalized-blocks}

Blok yang sudah difinalisasi dan titik pemeriksaan subjektivitas lemah diperlakukan secara berbeda oleh node Ethereum. Jika sebuah node mengetahui tentang dua blok yang sudah difinalisasi yang bersaing, maka node tersebut bimbang antara keduanya - tidak ada cara untuk secara otomatis mengidentifikasi cabang yang kanonikal. Ini merupakan gejala dari kegagalan consensus. Sebaliknya, sebuah node dengan mudah menolak setiap blok yang bertentangan dengan titik pemeriksaan subjektivitas lemahnya. Dari perspektif node, titik pemeriksaan subjektivitas lemah mewakili kebenaran mutlak yang tidak dapat digoyahkan oleh pengetahuan baru dari rekan-rekannya.

## Selemah apa subjektivitas lemah? {#how-weak-is-weak}

Aspek subjektif dari proof-of-stake Ethereum adalah kebutuhan akan keadaan terbaru (titik pemeriksaan subjektivitas lemah) dari sumber tepercaya untuk disinkronkan. Risiko mendapatkan titik pemeriksaan subjektivitas lemah yang buruk sangat rendah karena mereka dapat diperiksa dengan beberapa sumber publik independen seperti penjelajah blok atau beberapa node. Namun, selalu ada sejumlah kepercayaan yang diperlukan untuk menjalankan aplikasi perangkat lunak apa pun, misalnya, percaya bahwa para pengembang perangkat lunak telah menghasilkan perangkat lunak yang jujur.

Titik pemeriksaan subjektivitas lemah bahkan mungkin disertakan sebagai bagian dari perangkat lunak klien. Dapat dikatakan bahwa penyerang dapat merusak titik pemeriksaan dalam perangkat lunak dan dengan mudah merusak perangkat lunak itu sendiri. Tidak ada solusi crypto-ekonomi yang nyata untuk mengatasi masalah ini, tetapi dampak dari para pengembang yang tidak bisa dipercaya diminimalkan dalam Ethereum dengan memiliki beberapa tim klien independen, masing-masing membangun perangkat lunak yang setara dalam bahasa yang berbeda, semuanya memiliki kepentingan dalam menjaga rantai yang jujur. Penjelajah blok juga dapat menyediakan titik pemeriksaan subjektivitas lemah atau cara untuk membandingkan titik pemeriksaan yang diperoleh dari tempat lain terhadap sumber tambahan.

Terakhir, titik pemeriksaan dapat diminta dari node lain; mungkin pengguna Ethereum lain yang menjalankan node penuh dapat memberikan titik pemeriksaan yang validator kemudian dapat verifikasi berdasarkan data dari penjelajah blok. Secara keseluruhan, mempercayai penyedia titik pemeriksaan subjektivitas lemah dapat dianggap sama bermasalahnya dengan mempercayai para pengembang klien. Kepercayaan keseluruhan yang diperlukan rendah. Penting untuk dicatat bahwa pertimbangan ini hanya menjadi penting dalam kejadian yang sangat tidak mungkin terjadi, yaitu ketika sebagian besar validator bersekongkol untuk menghasilkan cabang alternatif dari blockchain. Dalam keadaan lainnya, hanya ada satu rantai Ethereum yang dapat dipilih.

## Bacaan Lebih Lanjut {#further-reading}

- [Subjektivitas lemah di Eth2](https://notes.ethereum.org/@adiasg/weak-subjectvity-eth2)
- [Vitalik: How I learned to love weak subjectivity](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/)
- [Subjektivitas lemah (dokumentasi Teku)](https://docs.teku.consensys.io/concepts/weak-subjectivity)
- [Panduan subjektivitas lemah Fase-0](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/weak-subjectivity.md)
- [Analisis subjektivitas lemah di Ethereum 2.0](https://github.com/runtimeverification/beacon-chain-verification/blob/master/weak-subjectivity/weak-subjectivity-analysis.pdf)
