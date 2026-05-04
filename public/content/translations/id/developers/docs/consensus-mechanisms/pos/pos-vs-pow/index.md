---
title: Proof-of-stake vs proof-of-work
description: Perbandingan antara mekanisme konsensus berbasis proof-of-stake dan proof-of-work Ethereum
lang: id
---

Ketika [Ethereum](/) diluncurkan, proof-of-stake masih membutuhkan banyak penelitian dan pengembangan sebelum dapat dipercaya untuk mengamankan Ethereum. Proof-of-work adalah mekanisme yang lebih sederhana yang telah dibuktikan oleh Bitcoin, yang berarti pengembang inti dapat segera mengimplementasikannya agar Ethereum dapat diluncurkan. Butuh waktu delapan tahun lagi untuk mengembangkan proof-of-stake hingga pada titik di mana ia dapat diimplementasikan.

Halaman ini menjelaskan alasan di balik peralihan Ethereum ke proof-of-stake dari proof-of-work dan pertukaran (trade-off) yang terlibat.

## Keamanan {#security}

Peneliti Ethereum menganggap proof-of-stake lebih aman daripada proof-of-work. Namun, ini baru saja diimplementasikan untuk Mainnet Ethereum yang sebenarnya dan belum teruji oleh waktu dibandingkan dengan proof-of-work. Bagian berikut membahas pro dan kontra dari model keamanan proof-of-stake dibandingkan dengan proof-of-work.

### Biaya untuk menyerang {#cost-to-attack}

Dalam proof-of-stake, validator diharuskan untuk menitipkan ("stake") setidaknya 32 ETH dalam sebuah kontrak pintar. Ethereum dapat menghancurkan ether yang di-stake untuk menghukum validator yang berperilaku buruk. Untuk mencapai konsensus, setidaknya 66% dari total ether yang di-stake harus memberikan suara yang mendukung serangkaian blok tertentu. Blok yang dipilih oleh >=66% dari stake menjadi "difinalisasi", yang berarti blok tersebut tidak dapat dihapus atau diatur ulang.

Menyerang jaringan dapat berarti mencegah rantai mencapai finalitas atau memastikan pengaturan blok tertentu dalam rantai kanonikal yang entah bagaimana menguntungkan penyerang. Hal ini mengharuskan penyerang untuk mengalihkan jalur konsensus yang jujur baik dengan mengumpulkan sejumlah besar ether dan memberikan suara dengannya secara langsung atau menipu validator yang jujur agar memberikan suara dengan cara tertentu. Mengesampingkan serangan canggih dengan probabilitas rendah yang menipu validator yang jujur, biaya untuk menyerang Ethereum adalah biaya stake yang harus dikumpulkan oleh penyerang untuk memengaruhi konsensus demi keuntungan mereka.

Biaya serangan terendah adalah >33% dari total stake. Penyerang yang memegang >33% dari total stake dapat menyebabkan penundaan finalitas hanya dengan offline. Ini adalah masalah yang relatif kecil bagi jaringan karena ada mekanisme yang dikenal sebagai "kebocoran ketidakaktifan" (inactivity leak) yang membocorkan stake dari validator yang offline hingga mayoritas yang online mewakili 66% dari stake dan dapat memfinalisasi rantai lagi. Secara teoritis juga memungkinkan bagi penyerang untuk menyebabkan finalitas ganda dengan sedikit di atas 33% dari total stake dengan membuat dua blok alih-alih satu ketika mereka diminta untuk menjadi produsen blok dan kemudian memberikan suara ganda dengan semua validator mereka. Setiap fork hanya membutuhkan 50% dari validator jujur yang tersisa untuk melihat setiap blok terlebih dahulu, jadi jika mereka berhasil mengatur waktu pesan mereka dengan tepat, mereka mungkin dapat memfinalisasi kedua fork tersebut. Ini memiliki kemungkinan keberhasilan yang rendah, tetapi jika penyerang mampu menyebabkan finalitas ganda, komunitas Ethereum harus memutuskan untuk mengikuti satu fork, di mana validator penyerang pasti akan dipotong (slashed) di fork yang lain.

Dengan >33% dari total stake, penyerang memiliki peluang untuk memberikan efek kecil (penundaan finalitas) atau lebih parah (finalitas ganda) pada jaringan Ethereum. Dengan lebih dari 14.000.000 ETH yang di-stake di jaringan dan harga representatif $1000/ETH, biaya minimum untuk melancarkan serangan ini adalah `1000 x 14.000.000 x 0,33 = $4.620.000.000`. Penyerang akan kehilangan uang ini melalui pemotongan dan dikeluarkan dari jaringan. Untuk menyerang lagi, mereka harus mengumpulkan >33% dari stake (lagi) dan membakarnya (lagi). Setiap upaya untuk menyerang jaringan akan menelan biaya >$4,6 miliar (pada $1000/ETH dan 14 juta ETH yang di-stake). Penyerang juga dikeluarkan dari jaringan ketika mereka dipotong, dan mereka harus bergabung dengan antrean aktivasi untuk bergabung kembali. Ini berarti tingkat serangan berulang dibatasi tidak hanya pada tingkat penyerang dapat mengumpulkan >33% dari total stake tetapi juga waktu yang dibutuhkan untuk memasukkan semua validator mereka ke dalam jaringan. Setiap kali penyerang menyerang, mereka menjadi jauh lebih miskin, dan anggota komunitas lainnya menjadi lebih kaya, berkat guncangan pasokan yang dihasilkannya.

Serangan lain, seperti serangan 51% atau pembalikan finalitas dengan 66% dari total stake, membutuhkan ETH yang jauh lebih banyak dan jauh lebih mahal bagi penyerang.

Bandingkan ini dengan proof-of-work. Biaya untuk meluncurkan serangan pada Ethereum proof-of-work adalah biaya untuk secara konsisten memiliki >50% dari total tingkat hash jaringan. Ini setara dengan perangkat keras dan biaya operasional dari daya komputasi yang cukup untuk mengungguli penambang lain guna menghitung solusi proof-of-work secara konsisten. Ethereum sebagian besar ditambang menggunakan GPU daripada ASIC, yang menekan biaya (meskipun jika Ethereum tetap menggunakan proof-of-work, penambangan ASIC mungkin menjadi lebih populer). Musuh harus membeli banyak perangkat keras dan membayar listrik untuk menjalankannya guna menyerang jaringan Ethereum proof-of-work, tetapi total biayanya akan lebih kecil daripada biaya yang diperlukan untuk mengumpulkan cukup ETH guna meluncurkan serangan. Serangan 51% adalah ~[20x lebih murah](https://youtu.be/1m12zgJ42dI?t=1562) pada proof-of-work daripada proof-of-stake. Jika serangan terdeteksi dan rantai di-hard fork untuk menghapus perubahan mereka, penyerang dapat berulang kali menggunakan perangkat keras yang sama untuk menyerang fork baru tersebut.

### Kompleksitas {#complexity}

Proof-of-stake jauh lebih kompleks daripada proof-of-work. Ini bisa menjadi poin yang menguntungkan proof-of-work karena lebih sulit untuk secara tidak sengaja memasukkan bug atau efek yang tidak diinginkan ke dalam protokol yang lebih sederhana. Namun, kompleksitas tersebut telah dijinakkan oleh penelitian dan pengembangan, simulasi, dan implementasi testnet selama bertahun-tahun. Protokol proof-of-stake telah diimplementasikan secara independen oleh lima tim terpisah (pada masing-masing lapisan eksekusi dan lapisan konsensus) dalam lima bahasa pemrograman, memberikan ketahanan terhadap bug klien.

Untuk mengembangkan dan menguji logika konsensus proof-of-stake dengan aman, Beacon Chain diluncurkan dua tahun sebelum proof-of-stake diimplementasikan di Mainnet Ethereum. Beacon Chain bertindak sebagai kotak pasir (sandbox) untuk pengujian proof-of-stake, karena ini adalah blockchain langsung yang mengimplementasikan logika konsensus proof-of-stake tetapi tanpa menyentuh transaksi Ethereum yang sebenarnya - secara efektif hanya mencapai konsensus pada dirinya sendiri. Setelah ini stabil dan bebas bug untuk waktu yang cukup lama, Beacon Chain "digabungkan" dengan Mainnet Ethereum. Semua ini berkontribusi untuk menjinakkan kompleksitas proof-of-stake hingga pada titik di mana risiko konsekuensi yang tidak diinginkan atau bug klien menjadi sangat rendah.

### Permukaan serangan {#attack-surface}

Proof-of-stake lebih kompleks daripada proof-of-work, yang berarti ada lebih banyak potensi vektor serangan yang harus ditangani. Alih-alih satu jaringan peer-to-peer yang menghubungkan klien, ada dua, masing-masing mengimplementasikan protokol yang terpisah. Memiliki satu validator spesifik yang dipilih sebelumnya untuk mengusulkan blok di setiap slot menciptakan potensi penolakan layanan (denial-of-service) di mana lalu lintas jaringan dalam jumlah besar membuat validator spesifik tersebut menjadi offline.

Ada juga cara di mana penyerang dapat mengatur waktu rilis blok atau pengesahan mereka dengan hati-hati sehingga diterima oleh proporsi tertentu dari jaringan yang jujur, memengaruhi mereka untuk memberikan suara dengan cara tertentu. Terakhir, penyerang dapat dengan mudah mengumpulkan ETH yang cukup untuk di-stake dan mendominasi mekanisme konsensus. Masing-masing [vektor serangan ini memiliki pertahanan terkait](/developers/docs/consensus-mechanisms/pos/attack-and-defense), tetapi mereka tidak ada untuk dipertahankan di bawah proof-of-work.

## Desentralisasi {#decentralization}

Proof-of-stake lebih terdesentralisasi daripada proof-of-work karena perlombaan senjata perangkat keras penambangan cenderung menyingkirkan individu dan organisasi kecil karena harganya. Meskipun siapa pun secara teknis dapat mulai menambang dengan perangkat keras sederhana, kemungkinan mereka menerima hadiah apa pun sangat kecil dibandingkan dengan operasi penambangan institusional. Dengan proof-of-stake, biaya untuk mengunci dan persentase pengembalian pada stake tersebut sama untuk semua orang. Saat ini dibutuhkan biaya 32 ETH untuk menjalankan validator.

Di sisi lain, penemuan derivatif staking likuid telah menyebabkan kekhawatiran sentralisasi karena beberapa penyedia besar mengelola sejumlah besar ETH yang di-stake. Ini bermasalah dan perlu diperbaiki sesegera mungkin, tetapi juga lebih bernuansa daripada kelihatannya. Penyedia staking terpusat tidak selalu memiliki kontrol terpusat atas validator - seringkali ini hanya cara untuk membuat kumpulan ETH terpusat yang dapat di-stake oleh banyak operator node independen tanpa setiap peserta membutuhkan 32 ETH milik mereka sendiri.

Pilihan terbaik untuk Ethereum adalah agar validator dijalankan secara lokal di komputer rumah, memaksimalkan desentralisasi. Inilah sebabnya mengapa Ethereum menolak perubahan yang meningkatkan persyaratan perangkat keras untuk menjalankan node/validator.

## Keberlanjutan {#sustainability}

Proof-of-stake adalah cara yang murah karbon untuk mengamankan blockchain. Di bawah proof-of-work, penambang bersaing untuk mendapatkan hak menambang sebuah blok. Penambang lebih sukses ketika mereka dapat melakukan perhitungan lebih cepat, memberikan insentif pada investasi perangkat keras dan konsumsi energi. Hal ini diamati pada Ethereum sebelum beralih ke proof-of-stake. Sesaat sebelum transisi ke proof-of-stake, Ethereum mengonsumsi sekitar 78 TWh/tahun - setara dengan negara kecil. Namun, beralih ke proof-of-stake mengurangi pengeluaran energi ini sebesar ~99,98%. Proof-of-stake menjadikan Ethereum platform yang hemat energi dan rendah karbon.

[Lebih lanjut tentang konsumsi energi Ethereum](/energy-consumption)

## Penerbitan {#issuance}

Ethereum proof-of-stake dapat membayar keamanannya dengan menerbitkan koin yang jauh lebih sedikit daripada Ethereum proof-of-work karena validator tidak perlu membayar biaya listrik yang tinggi. Akibatnya, ETH dapat mengurangi inflasinya atau bahkan menjadi deflasi ketika sejumlah besar ETH dibakar. Tingkat inflasi yang lebih rendah berarti keamanan Ethereum lebih murah daripada di bawah proof-of-work.

## Lebih suka belajar secara visual? {#visual-learner}

Tonton Justin Drake menjelaskan manfaat proof-of-stake dibandingkan proof-of-work:

<YouTube id="1m12zgJ42dI" />

## Bacaan lebih lanjut {#further-reading}

- [Filosofi desain proof-of-stake Vitalik](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [FAQ proof-of-stake Vitalik](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)
- [Video "Simply Explained" tentang pos vs pow](https://www.youtube.com/watch?v=M3EFi_POhps)