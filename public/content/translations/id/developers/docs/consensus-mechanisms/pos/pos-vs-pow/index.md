---
title: Bukti Kepemilikan (PoS) vs Bukti Kerja (PoW)
description: Perbandingan antara mekanisme konsensus berbasis Bukti Kepemilikan (PoS) dan Bukti Kerja (PoW) Ethereum
lang: id
---

Ketika [Ethereum](/) diluncurkan, Bukti Kepemilikan (PoS) masih membutuhkan banyak penelitian dan pengembangan sebelum dapat dipercaya untuk mengamankan Ethereum. Bukti Kerja (PoW) adalah mekanisme yang lebih sederhana yang telah dibuktikan oleh Bitcoin, yang berarti pengembang inti dapat segera mengimplementasikannya agar Ethereum dapat diluncurkan. Butuh waktu delapan tahun lagi untuk mengembangkan Bukti Kepemilikan (PoS) hingga ke titik di mana mekanisme ini dapat diimplementasikan.

Halaman ini menjelaskan alasan di balik peralihan Ethereum ke Bukti Kepemilikan (PoS) dari Bukti Kerja (PoW) dan pertukaran yang terlibat.

## Keamanan {#security}

Para peneliti Ethereum menganggap Bukti Kepemilikan (PoS) lebih aman daripada Bukti Kerja (PoW). Namun, mekanisme ini baru saja diimplementasikan untuk Mainnet Ethereum yang sebenarnya dan belum teruji oleh waktu seperti Bukti Kerja (PoW). Bagian berikut membahas pro dan kontra dari model keamanan Bukti Kepemilikan (PoS) dibandingkan dengan Bukti Kerja (PoW).

### Biaya untuk menyerang {#cost-to-attack}

Dalam Bukti Kepemilikan (PoS), validator diwajibkan untuk menyimpan ("stake") setidaknya 32 ETH dalam sebuah kontrak pintar. Ethereum dapat menghancurkan Ether yang di-stake untuk menghukum validator yang berperilaku buruk. Untuk mencapai konsensus, setidaknya 66% dari total Ether yang di-stake harus memilih untuk mendukung serangkaian blok tertentu. Blok yang dipilih oleh >=66% dari stake menjadi "difinalisasi", yang berarti blok tersebut tidak dapat dihapus atau diatur ulang.

Menyerang jaringan dapat berarti mencegah rantai untuk difinalisasi atau memastikan pengaturan blok tertentu dalam rantai kanonikal yang entah bagaimana menguntungkan penyerang. Hal ini mewajibkan penyerang untuk mengalihkan jalur konsensus yang jujur baik dengan mengakumulasi sejumlah besar Ether dan memilih dengannya secara langsung atau menipu validator yang jujur agar memilih dengan cara tertentu. Mengesampingkan serangan canggih dengan probabilitas rendah yang menipu validator jujur, biaya untuk menyerang Ethereum adalah biaya stake yang harus diakumulasi oleh penyerang untuk memengaruhi konsensus demi keuntungan mereka.

Biaya serangan terendah adalah >33% dari total stake. Penyerang yang memegang >33% dari total stake dapat menyebabkan penundaan finalitas hanya dengan menjadi luring. Ini adalah masalah yang relatif kecil bagi jaringan karena ada mekanisme yang dikenal sebagai "kebocoran ketidakaktifan" yang membocorkan stake dari validator yang luring hingga mayoritas yang daring mewakili 66% dari stake dan dapat memfinalisasi rantai lagi. Secara teoretis juga memungkinkan bagi penyerang untuk menyebabkan finalitas ganda dengan sedikit di atas 33% dari total stake dengan membuat dua blok alih-alih satu ketika mereka diminta untuk menjadi produsen blok dan kemudian melakukan pemilihan ganda dengan semua validator mereka. Setiap percabangan hanya mewajibkan 50% dari validator jujur yang tersisa untuk melihat setiap blok terlebih dahulu, jadi jika mereka berhasil mengatur waktu pesan mereka dengan tepat, mereka mungkin dapat memfinalisasi kedua percabangan tersebut. Ini memiliki kemungkinan keberhasilan yang rendah, tetapi jika penyerang mampu menyebabkan finalitas ganda, komunitas Ethereum harus memutuskan untuk mengikuti satu percabangan, yang dalam hal ini validator penyerang pasti akan mengalami pemotongan di percabangan yang lain.

Dengan >33% dari total stake, penyerang memiliki peluang untuk memberikan efek minor (penundaan finalitas) atau yang lebih parah (finalitas ganda) pada jaringan Ethereum. Dengan lebih dari 14.000.000 ETH yang di-stake di jaringan dan harga representatif $1000/ETH, biaya minimum untuk melancarkan serangan ini adalah `1000 x 14,000,000 x 0.33 = $4,620,000,000`. Penyerang akan kehilangan uang ini melalui pemotongan dan dikeluarkan dari jaringan. Untuk menyerang lagi, mereka harus mengakumulasi >33% dari stake (lagi) dan membakarnya (lagi). Setiap upaya untuk menyerang jaringan akan menelan biaya >$4,6 miliar (pada $1000/ETH dan 14 juta ETH yang di-stake). Penyerang juga dikeluarkan dari jaringan ketika mereka mengalami pemotongan, dan mereka harus bergabung dengan antrean aktivasi untuk bergabung kembali. Ini berarti tingkat serangan berulang dibatasi tidak hanya pada tingkat penyerang dapat mengakumulasi >33% dari total stake tetapi juga waktu yang dibutuhkan untuk memasukkan semua validator mereka ke dalam jaringan. Setiap kali penyerang menyerang, mereka menjadi jauh lebih miskin, dan anggota komunitas lainnya menjadi lebih kaya, berkat guncangan pasokan yang dihasilkannya.

Serangan lain, seperti serangan 51% atau pembalikan finalitas dengan 66% dari total stake, mewajibkan lebih banyak ETH secara substansial dan jauh lebih mahal bagi penyerang.

Bandingkan ini dengan Bukti Kerja (PoW). Biaya untuk melancarkan serangan pada Ethereum Bukti Kerja (PoW) adalah biaya untuk secara konsisten memiliki >50% dari total tingkat hash jaringan. Ini setara dengan perangkat keras dan biaya operasional dari daya komputasi yang cukup untuk mengungguli penambang lain guna menghitung solusi Bukti Kerja (PoW) secara konsisten. Ethereum sebagian besar ditambang menggunakan GPU daripada ASIC, yang menekan biaya (meskipun jika Ethereum tetap menggunakan Bukti Kerja (PoW), penambangan ASIC mungkin akan menjadi lebih populer). Musuh harus membeli banyak perangkat keras dan membayar listrik untuk menjalankannya guna menyerang jaringan Ethereum Bukti Kerja (PoW), tetapi total biayanya akan lebih kecil daripada biaya yang diwajibkan untuk mengakumulasi cukup ETH guna melancarkan serangan. Serangan 51% ~[20x lebih](https://youtu.be/1m12zgJ42dI?t=1562) murah pada Bukti Kerja (PoW) daripada Bukti Kepemilikan (PoS). Jika serangan terdeteksi dan rantai mengalami percabangan keras untuk menghapus perubahan mereka, penyerang dapat berulang kali menggunakan perangkat keras yang sama untuk menyerang percabangan baru tersebut.

### Kompleksitas {#complexity}

Bukti Kepemilikan (PoS) jauh lebih kompleks daripada Bukti Kerja (PoW). Ini bisa menjadi poin yang menguntungkan Bukti Kerja (PoW) karena lebih sulit untuk secara tidak sengaja memasukkan bug atau efek yang tidak diinginkan ke dalam protokol yang lebih sederhana. Namun, kompleksitas tersebut telah dijinakkan oleh penelitian dan pengembangan, simulasi, dan implementasi testnet selama bertahun-tahun. Protokol Bukti Kepemilikan (PoS) telah diimplementasikan secara independen oleh lima tim terpisah (pada masing-masing lapisan eksekusi dan konsensus) dalam lima bahasa pemrograman, memberikan ketahanan terhadap bug klien.

Untuk mengembangkan dan menguji logika konsensus Bukti Kepemilikan (PoS) dengan aman, Rantai suar diluncurkan dua tahun sebelum Bukti Kepemilikan (PoS) diimplementasikan di Mainnet Ethereum. Rantai suar bertindak sebagai kotak pasir untuk pengujian Bukti Kepemilikan (PoS), karena ini adalah rantai blok langsung yang mengimplementasikan logika konsensus Bukti Kepemilikan (PoS) tetapi tanpa menyentuh transaksi Ethereum yang sebenarnya - secara efektif hanya mencapai konsensus pada dirinya sendiri. Setelah ini stabil dan bebas bug untuk waktu yang cukup lama, Rantai suar "digabungkan" dengan Mainnet Ethereum. Semua ini berkontribusi untuk menjinakkan kompleksitas Bukti Kepemilikan (PoS) hingga ke titik di mana risiko konsekuensi yang tidak diinginkan atau bug klien menjadi sangat rendah.

### Permukaan serangan {#attack-surface}

Bukti Kepemilikan (PoS) lebih kompleks daripada Bukti Kerja (PoW), yang berarti ada lebih banyak potensi vektor serangan yang harus ditangani. Alih-alih satu jaringan peer-to-peer yang menghubungkan klien, ada dua, masing-masing mengimplementasikan protokol yang terpisah. Memiliki satu validator spesifik yang dipilih sebelumnya untuk mengusulkan blok di setiap slot menciptakan potensi penolakan layanan di mana lalu lintas jaringan dalam jumlah besar membuat validator spesifik tersebut menjadi luring.

Ada juga cara di mana penyerang dapat mengatur waktu rilis blok atau atestasi mereka dengan hati-hati sehingga diterima oleh proporsi tertentu dari jaringan yang jujur, memengaruhi mereka untuk memilih dengan cara tertentu. Terakhir, penyerang dapat dengan mudah mengakumulasi ETH yang cukup untuk di-stake dan mendominasi mekanisme konsensus. Masing-masing [vektor serangan ini memiliki pertahanan terkait](/developers/docs/consensus-mechanisms/pos/attack-and-defense), tetapi mereka tidak ada untuk dipertahankan di bawah Bukti Kerja (PoW).

## Desentralisasi {#decentralization}

Bukti Kepemilikan (PoS) lebih terdesentralisasi daripada Bukti Kerja (PoW) karena perlombaan senjata perangkat keras penambangan cenderung menyingkirkan individu dan organisasi kecil karena harganya yang mahal. Meskipun siapa pun secara teknis dapat mulai melakukan penambangan dengan perangkat keras sederhana, kemungkinan mereka menerima imbalan apa pun sangatlah kecil dibandingkan dengan operasi penambangan institusional. Dengan Bukti Kepemilikan (PoS), biaya staking dan persentase pengembalian pada stake tersebut sama untuk semua orang. Saat ini dibutuhkan biaya 32 ETH untuk menjalankan validator.

Di sisi lain, penemuan derivatif staking likuid telah menimbulkan kekhawatiran sentralisasi karena beberapa penyedia besar mengelola sejumlah besar ETH yang di-stake. Ini bermasalah dan perlu diperbaiki sesegera mungkin, tetapi ini juga lebih bernuansa daripada kelihatannya. Penyedia staking terpusat tidak selalu memiliki kendali terpusat atas validator - sering kali ini hanyalah cara untuk membuat kumpulan ETH terpusat yang dapat di-stake oleh banyak operator node independen tanpa mewajibkan setiap peserta memiliki 32 ETH mereka sendiri.

Pilihan terbaik untuk Ethereum adalah agar validator dijalankan secara lokal di komputer rumah, memaksimalkan desentralisasi. Inilah sebabnya mengapa Ethereum menolak perubahan yang meningkatkan persyaratan perangkat keras untuk menjalankan node/validator.

## Keberlanjutan {#sustainability}

Bukti Kepemilikan (PoS) adalah cara rendah karbon untuk mengamankan rantai blok. Di bawah Bukti Kerja (PoW), penambang bersaing untuk mendapatkan hak menambang sebuah blok. Penambang lebih sukses ketika mereka dapat melakukan perhitungan lebih cepat, memberikan insentif pada investasi perangkat keras dan konsumsi energi. Hal ini diamati pada Ethereum sebelum beralih ke Bukti Kepemilikan (PoS). Sesaat sebelum transisi ke Bukti Kepemilikan (PoS), Ethereum mengonsumsi sekitar 78 TWh/tahun - setara dengan sebuah negara kecil. Namun, beralih ke Bukti Kepemilikan (PoS) mengurangi pengeluaran energi ini hingga ~99,98%. Bukti Kepemilikan (PoS) menjadikan Ethereum sebagai platform yang hemat energi dan rendah karbon.

[Lebih lanjut tentang konsumsi energi Ethereum](/energy-consumption)

## Penerbitan {#issuance}

Ethereum Bukti Kepemilikan (PoS) dapat membayar keamanannya dengan menerbitkan jauh lebih sedikit koin daripada Ethereum Bukti Kerja (PoW) karena validator tidak perlu membayar biaya listrik yang tinggi. Akibatnya, ETH dapat mengurangi inflasinya atau bahkan menjadi deflasi ketika sejumlah besar ETH dibakar. Tingkat inflasi yang lebih rendah berarti keamanan Ethereum lebih murah daripada saat berada di bawah Bukti Kerja (PoW).

## Lebih suka belajar secara visual? {#visual-learner}


<VideoWatch slug="pow-vs-pos" />

## Bacaan lebih lanjut {#further-reading}

- [Filosofi desain Bukti Kepemilikan (PoS) Vitalik](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [Tanya Jawab Bukti Kepemilikan (PoS) Vitalik](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)
- [Video "Simply Explained" tentang PoS vs PoW](https://www.youtube.com/watch?v=M3EFi_POhps)