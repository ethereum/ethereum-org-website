---
title: Proof-of-stake versus proof-of-work
description: Perbandingan antara mekanisme konsensus Ethereum berbasis proof-of-stake dan proof-of-work
lang: id
---

Saat Ethereum diluncurkan, mekanisme proof-of-stake masih memerlukan banyak penelitian dan pengembangan sebelum dapat dipercaya untuk mengamankan Ethereum. Proof-of-work adalah mekanisme yang lebih sederhana dan telah terbukti melalui Bitcoin, sehingga para pengembang inti dapat langsung mengimplementasikannya untuk meluncurkan Ethereum. Dibutuhkan delapan tahun tambahan untuk mengembangkan proof-of-stake hingga mencapai titik di mana mekanisme ini dapat diimplementasikan.

Halaman ini menjelaskan alasan di balik peralihan Ethereum dari proof-of-work ke proof-of-stake serta berbagai pertukaran yang terlibat.

## Keamanan {#security}

Para peneliti Ethereum menganggap proof-of-stake lebih aman dibandingkan proof-of-work. Namun, mekanisme ini baru-baru ini diterapkan di Ethereum Mainnet yang sebenarnya dan belum se-terbukti waktu dibandingkan dengan proof-of-work. Bagian-bagian berikut membahas kelebihan dan kekurangan model keamanan proof-of-stake dibandingkan dengan proof-of-work.

### Biaya untuk menyerang {#cost-to-attack}

Dalam proof-of-stake, validator diwajibkan menyetor (“stake”) setidaknya 32 ETH ke dalam sebuah smart contract. Ethereum dapat menghancurkan ether yang di-stake untuk menghukum validator yang berperilaku buruk. Untuk mencapai konsensus, setidaknya 66% dari total ether yang di-stake harus memberikan suara mendukung sekumpulan blok tertentu. Blok yang dipilih oleh >=66% dari stake menjadi \"finalized\", yang artinya tidak dapat dihapus atau diatur ulang.

Menyerang jaringan bisa berarti mencegah rantai untuk finalize atau memastikan susunan tertentu dari blok di rantai kanonik yang menguntungkan penyerang. Ini mengharuskan penyerang untuk mengalihkan jalannya konsensus yang jujur, baik dengan mengumpulkan sejumlah besar ether dan langsung memberikan suara dengannya, maupun dengan menipu validator jujur agar memberikan suara dengan cara tertentu. Selain serangan canggih dengan probabilitas rendah yang menipu validator jujur, biaya untuk menyerang Ethereum adalah biaya dari stake yang harus dikumpulkan penyerang untuk mempengaruhi konsensus sesuai keinginannya.

Biaya serangan terendah adalah >33% dari total stake. Penyerang yang memegang >33% dari total stake dapat menyebabkan penundaan finalitas hanya dengan menjadi offline. Ini merupakan masalah relatif kecil bagi jaringan karena ada mekanisme yang disebut “inactivity leak”, yang secara perlahan mengurangi stake dari validator yang offline sampai mayoritas validator yang online mewakili ≥66% dari total stake, sehingga chain bisa difinalisasi kembali. Secara teoretis, seorang penyerang juga dapat menyebabkan double finality dengan memegang sedikit lebih dari 33% dari total stake, yaitu dengan membuat dua blok alih-alih satu ketika mereka ditunjuk sebagai block producer, lalu melakukan double-vote dengan semua validator yang mereka kendalikan. Setiap fork hanya membutuhkan 50% dari validator jujur yang tersisa untuk melihat setiap blok terlebih dahulu, jadi jika penyerang berhasil mengatur waktu pengiriman pesan dengan tepat, mereka mungkin bisa memfinalisasi kedua fork tersebut. Kemungkinan keberhasilan serangan ini rendah, tetapi jika penyerang berhasil menyebabkan double-finality, komunitas Ethereum harus memutuskan fork mana yang akan diikuti, dan validator penyerang akan terkena slash pada fork yang tidak dipilih.

Dengan >33% dari total stake, seorang penyerang memiliki peluang untuk memberikan efek kecil (penundaan finalitas) atau yang lebih parah (finalitas ganda) pada jaringan Ethereum. Dengan lebih dari 14.000.000 ETH yang di-stake di jaringan dan harga representatif $1000/ETH, biaya minimum untuk melancarkan serangan ini adalah `1000 x 14.000.000 x 0.33 = $4.620.000.000`. Penyerang akan kehilangan dana tersebut melalui mekanisme slashing dan dikeluarkan dari jaringan. Untuk menyerang lagi, mereka harus mengakumulasi >33% dari stake (lagi) dan membakarnya (lagi). Setiap upaya untuk menyerang jaringan akan menelan biaya >$4,6 miliar (pada $1000/ETH dan 14 juta ETH yang di-stake). Penyerang juga dikeluarkan dari jaringan ketika terkena slashing, dan mereka harus masuk ke antrean aktivasi untuk bisa bergabung kembali. Ini berarti tingkat serangan berulang tidak hanya terbatas pada laju penyerang dapat mengakumulasi >33% dari total stake, tetapi juga waktu yang dibutuhkan untuk memasukkan semua validator mereka ke dalam jaringan. Setiap kali penyerang menyerang, mereka menjadi lebih miskin, dan komunitas lainnya menjadi lebih kaya, berkat guncangan pasokan yang dihasilkan.

Serangan lain, seperti serangan 51% atau final reversal dengan 66% dari total taruhan, membutuhkan lebih banyak ETH dan jauh lebih mahal bagi penyerang.

Bandingkan ini dengan bukti kerja. Biaya untuk melancarkan serangan pada proof-of-work Ethereum adalah biaya untuk secara konsisten memiliki >50% dari total laju hash jaringan. Hal ini disebabkan oleh perangkat keras dan biaya operasional dari daya komputasi yang cukup untuk mengungguli penambang lain dalam menghitung solusi bukti kerja secara konsisten. Ethereum sebagian besar ditambang menggunakan GPU daripada ASIC, yang membuat biayanya tetap rendah (meskipun jika Ethereum tetap menggunakan proof-of-work, penambangan ASIC mungkin akan menjadi lebih populer). Musuh harus membeli banyak perangkat keras dan membayar listrik untuk menjalankannya untuk menyerang jaringan Ethereum yang bersifat bukti kerja, tetapi total biayanya akan lebih murah dibandingkan biaya yang dibutuhkan untuk mengumpulkan cukup banyak ETH untuk melancarkan serangan. Serangan 51% ~[20x lebih murah](https://youtu.be/1m12zgJ42dI?t=1562) pada proof-of-work daripada proof-of-stake. Jika serangan terdeteksi dan rantai tersebut di-fork untuk menghapus perubahannya, penyerang dapat berulang kali menggunakan perangkat keras yang sama untuk menyerang fork yang baru.

### Kompleksitas {#complexity}

Bukti kepemilikan jauh lebih kompleks daripada bukti kerja. Hal ini dapat menjadi poin yang mendukung bukti kerja karena lebih sulit untuk memasukkan bug atau efek yang tidak diinginkan ke dalam protokol yang lebih sederhana secara tidak sengaja. Namun, kerumitan tersebut telah dijinakkan oleh penelitian dan pengembangan, simulasi, dan implementasi testnet selama bertahun-tahun. Protokol bukti kepemilikan telah diimplementasikan secara independen oleh lima tim terpisah (pada setiap lapisan eksekusi dan konsensus) dalam lima bahasa pemrograman, memberikan ketahanan terhadap bug klien.

Untuk mengembangkan dan menguji logika konsensus proof-of-stake dengan aman, Beacon Chain diluncurkan dua tahun sebelum proof-of-stake diimplementasikan pada Ethereum Mainnet. Protokol proof-of-stake telah diimplementasikan secara independen oleh lima tim terpisah (pada masing-masing lapisan eksekusi dan konsensus) dalam lima bahasa pemrograman, yang memberikan ketahanan terhadap bug klien. Setelah stabil dan bebas bug selama beberapa waktu, Beacon Chain "digabungkan" dengan Ethereum Mainnet. Semua ini berkontribusi dalam menjinakkan kompleksitas proof-of-stake hingga ke titik di mana risiko konsekuensi yang tidak diinginkan atau bug klien sangat rendah.

### Permukaan serangan {#attack-surface}

Bukti kepemilikan lebih kompleks daripada bukti kerja, yang berarti ada lebih banyak vektor serangan potensial yang harus ditangani. Alih-alih satu jaringan peer-to-peer yang menghubungkan klien, ada dua jaringan, yang masing-masing menerapkan protokol terpisah. Memiliki satu validator spesifik yang dipilih terlebih dahulu untuk mengusulkan blok di setiap slot menciptakan potensi penolakan layanan di mana sejumlah besar lalu lintas jaringan membuat validator spesifik tersebut offline.

Ada pula cara yang dapat dilakukan penyerang untuk mengatur waktu pelepasan blok atau pengesahannya dengan cermat sehingga diterima oleh proporsi tertentu dari jaringan yang jujur, yang memengaruhi mereka untuk memilih dengan cara tertentu. Terakhir, penyerang dapat mengumpulkan ETH yang cukup untuk mempertaruhkan dan mendominasi mekanisme konsensus. Masing-masing [vektor serangan ini memiliki pertahanan terkait](/developers/docs/consensus-mechanisms/pos/attack-and-defense), tetapi tidak ada yang dapat dipertahankan berdasarkan proof-of-work.

## Desentralisasi {#decentralization}

Bukti kepemilikan lebih terdesentralisasi daripada bukti kerja karena perlombaan senjata perangkat keras penambangan cenderung membuat individu dan organisasi kecil tidak mampu membelinya. Meskipun siapa pun secara teknis dapat mulai menambang dengan perangkat keras sederhana, peluang mereka untuk menerima imbalan apa pun sangat kecil dibandingkan dengan operasi penambangan institusional. Dengan proof-of-stake, biaya staking dan persentase keuntungan dari staking tersebut sama untuk semua orang. Saat ini biaya yang dibutuhkan adalah 32 ETH untuk menjalankan validator.

Di sisi lain, penemuan derivatif staking likuid telah menimbulkan kekhawatiran sentralisasi karena beberapa penyedia besar mengelola sejumlah besar ETH yang dipertaruhkan. Hal ini bermasalah dan perlu diperbaiki sesegera mungkin, tetapi juga lebih bernuansa daripada yang terlihat. Penyedia staking terpusat tidak selalu memiliki kontrol terpusat atas validator - sering kali ini hanya cara untuk membuat kumpulan ETH terpusat yang dapat dipertaruhkan oleh banyak operator node independen tanpa setiap partisipan memerlukan 32 ETH mereka sendiri.

Pilihan terbaik untuk Ethereum adalah menjalankan validator secara lokal di komputer rumah, memaksimalkan desentralisasi. Inilah sebabnya Ethereum menolak perubahan yang meningkatkan persyaratan perangkat keras untuk menjalankan node/validator.

## Keberlanjutan {#sustainability}

Proof-of-stake adalah cara yang murah karbon untuk mengamankan blockchain. Dengan bukti kerja, para penambang bersaing untuk mendapatkan hak menambang satu blok. Penambang lebih berhasil ketika mereka dapat melakukan perhitungan lebih cepat, sehingga memberi insentif pada investasi dalam perangkat keras dan konsumsi energi. Hal ini diamati pada Ethereum sebelum beralih ke proof-of-stake. Sesaat sebelum transisi ke proof-of-stake, Ethereum mengonsumsi sekitar 78 TWh/tahun - sama banyaknya dengan negara kecil. Namun, peralihan ke proof-of-stake mengurangi pengeluaran energi ini hingga ~99,98%. Bukti kepemilikan membuat Ethereum menjadi platform yang hemat energi dan rendah karbon.

[Lebih lanjut tentang konsumsi energi Ethereum](/energy-consumption)

## Penerbitan {#issuance}

Bukti kepemilikan (proof-of-stake) Ethereum dapat membayar keamanannya dengan menerbitkan jauh lebih sedikit koin dibandingkan dengan bukti kerja (proof-of-work) Ethereum karena validator tidak perlu membayar biaya listrik yang tinggi. Hasilnya, ETH dapat mengurangi inflasi atau bahkan menjadi deflasi ketika sejumlah besar ETH dibakar. Tingkat inflasi yang lebih rendah berarti keamanan Ethereum lebih murah dibandingkan dengan bukti kerja.

## Selengkapnya tentang pelajar visual? {#visual-learner}

Tonton penjelasan dari Justin Drake tentang manfaat bukti kepemilikan (proof-of-stake) dibandingkan dengan bukti kerja (proof-of-work):

<YouTube id="1m12zgJ42dI" />

## Bacaan lebih lanjut {#further-reading}

- [Filosofi desain proof-of-stake Vitalik](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [Tanya Jawab Umum proof-of-stake Vitalik](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)
- [Video \"Simply Explained\" tentang PoS vs PoW](https://www.youtube.com/watch?v=M3EFi_POhps)
