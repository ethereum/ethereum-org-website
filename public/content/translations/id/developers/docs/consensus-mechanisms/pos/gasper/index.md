---
title: Gasper
description: Penjelasan tentang mekanisme bukti proof-of-stake Gasper.
lang: id
---

Gasper adalah gabungan antara Casper the Friendly Finality Gadget (Casper-FFG) dan algoritma pemilihan cabang LMD-GHOST. Bersama sama, ketiga form komponen dari sistem mekanis consensus mengamankan proof-of-stake Ethereum. Casper adalah mekanisme yang meng-upgrade blok-blok tertentu menjadi "difinalisasi" sehingga entitas baru dalam jaringan dapat yakin bahwa mereka menyinkronkan rantai kanonikal. Algoritma pemilihan cabang menggunakan suara yang terakumulasi untuk memastikan bahwa node-node dapat dengan mudah memilih yang benar ketika terjadi cabang dalam blockchain.

**Catatan** bahwa definisi asli Casper-FFG sedikit diperbarui untuk disertakan dalam Gasper. Pada halaman ini, kami mempertimbangkan versi yang diperbarui.

## Pra-syarat

Untuk memahami materi ini, Anda perlu membaca halaman pengantar tentang [bukti taruhan](/developers/docs/consensus-mechanisms/pos/).

## Peran Gasper {#role-of-gasper}

Gasper berada di atas sebuah blockchain berbasis proof-of-stake di mana node-node memberikan ether sebagai deposito keamanan yang dapat dihancurkan jika mereka malas atau tidak jujur dalam mengusulkan atau memvalidasi blok. Gasper adalah mekanisme yang menentukan bagaimana validator diberi imbalan dan dihukum, memutuskan blok mana yang diterima dan ditolak, serta cabang rantaiblok mana yang akan dibangun.

## Apa itu finalitas? {#what-is-finality}

Finality adalah sifat dari blok-blok tertentu yang berarti mereka tidak dapat dibalikkan kecuali terjadi kegagalan consensus kritis dan seorang penyerang menghancurkan setidaknya 1/3 dari total ether yang dipertaruhkan. Block yang telah difinalisasi dapat dianggap sebagai informasi yang pasti bagi blockchain. Sebuah block harus melewati prosedur peningkatan dua langkah agar bisa difinalisasi:

1. Dua per tiga dari total ether yang dipertaruhkan harus memberikan suara mendukung inklusi block tersebut dalam rantai kanonikal. Kondisi ini meningkatkan blok menjadi "dibenarkan". Blok yang dibenarkan tidak mungkin dikembalikan, tetapi bisa dalam kondisi tertentu.
2. Ketika blok lain dibenarkan di atas blok yang telah dibenarkan, blok tersebut akan ditingkatkan menjadi "diselesaikan". Menyelesaikan sebuah blok adalah sebuah komitmen untuk memasukkan blok tersebut ke dalam rantai kanonik. Tidak dapat dikembalikan kecuali penyerang menghancurkan jutaan ether (miliaran $USD).

Peningkatan blok ini tidak terjadi di setiap slot. Sebaliknya, hanya blok batas zaman yang dapat dijustifikasi dan diselesaikan. Blok-blok ini dikenal sebagai "pos pemeriksaan". Peningkatan mempertimbangkan pasangan pos pemeriksaan. "Tautan supermayoritas" harus ada di antara dua pos pemeriksaan yang berurutan (yaitu, dua pertiga dari total ether yang di-stake yang memilih bahwa pos pemeriksaan B adalah turunan yang benar dari pos pemeriksaan A) untuk meningkatkan pos pemeriksaan yang lebih lama menjadi berstatus final dan blok yang lebih baru menjadi terjustifikasi.

Karena finalitas membutuhkan persetujuan dua pertiga bahwa sebuah blok adalah kanonik, seorang penyerang tidak mungkin dapat membuat rantai yang telah difinalisasi secara alternatif:

1. Memiliki atau memanipulasi dua pertiga dari total ether yang dipertaruhkan.
2. Menghancurkan setidaknya sepertiga dari total ether yang dipertaruhkan.

Kondisi pertama muncul karena dua pertiga dari eter yang dipertaruhkan diperlukan untuk menyelesaikan rantai. Kondisi kedua muncul karena jika dua pertiga dari total saham memberikan suara mendukung kedua fork, maka sepertiga harus memberikan suara pada keduanya. Double-voting adalah kondisi slashing yang akan mendapat hukuman maksimal, di mana sepertiga dari total stake akan dihancurkan. Hingga Mei 2022, penyerang perlu membakar ether senilai sekitar $10 miliar. Algoritma yang menjustifikasi dan memfinalisasi blok di Gasper adalah bentuk yang sedikit dimodifikasi dari [Casper the Friendly Finality Gadget (Casper-FFG)](https://arxiv.org/pdf/1710.09437.pdf).

### Insentif dan Pemotongan {#incentives-and-slashing}

Validator mendapat imbalan karena mengusulkan dan memvalidasi blok secara jujur. Ether diberi imbalan dan ditambahkan ke taruhannya. Di sisi lain, validator yang tidak hadir dan gagal bertindak saat dipanggil kehilangan hadiah ini dan terkadang kehilangan sebagian kecil dari saham yang mereka miliki. Akan tetapi, penalti karena tidak terhubung ke internet itu kecil dan, dalam sebagian besar kasus, merupakan biaya peluang karena tidak memperoleh hadiah. Namun, beberapa tindakan validator sangat sulit dilakukan secara tidak sengaja dan menandakan niat jahat, seperti mengusulkan beberapa blok untuk celah yang sama, memberikan attestasi untuk beberapa blok pada celah yang sama, atau bertentangan dengan suara checkpoint sebelumnya. Ini adalah perilaku “slashable” yang mendapatkan sanksi lebih berat—slashing mengakibatkan sebagian dari stake validator dihancurkan dan validator tersebut dikeluarkan dari jaringan validator. Proses ini memakan waktu 36 hari. Pada Hari 1, ada penalti awal hingga 1 ETH. Kemudian, ether dari validator yang terkena pemotongan secara bertahap berkurang selama periode keluar, tetapi pada Hari ke 18, mereka menerima “hukuman korelasi”, yang besarnya meningkat apabila lebih banyak validator terkena pemotongan dalam waktu yang bersamaan. Hukuman maksimumnya adalah seluruh taruhannya. Hadiah dan penalti ini dirancang untuk mendorong validator bertindak jujur dan mencegah serangan terhadap jaringan.

### Kebocoran Inaktivitas {#inactivity-leak}

Selain keamanan, Gasper juga menyediakan "keaktifan yang masuk akal". Ini adalah kondisi di mana selama dua pertiga dari total ether yang dipertaruhkan memberikan suara dengan jujur dan mengikuti protokol, rantai akan tetap mampu memfinalisasi blok terlepas dari aktivitas lain (seperti serangan, masalah latensi, atau penalti slash). Dengan kata lain, sepertiga dari total ether yang dipertaruhkan harus dikompromikan dengan cara tertentu untuk mencegah rantai tersebut selesai. Di Gasper, ada garis pertahanan tambahan terhadap kegagalan keaktifan, yang dikenal sebagai "kebocoran ketidakaktifan". Mekanisme ini aktif ketika rantai gagal diselesaikan selama lebih dari empat periode. Validator yang tidak secara aktif membuktikan adanya rantai mayoritas akan secara bertahap mengurangi kepemilikan mereka hingga mayoritas memperoleh kembali dua pertiga dari total kepemilikan, yang memastikan bahwa kegagalan keaktifan hanya bersifat sementara.

### Pilihan fork {#fork-choice}

Definisi asli Casper-FFG menyertakan algoritma pilihan fork yang menerapkan aturan: `ikuti rantai yang berisi pos pemeriksaan terjustifikasi yang memiliki ketinggian terbesar` dengan ketinggian didefinisikan sebagai jarak terbesar dari blok genesis. Di Gasper, aturan pilihan percabangan asli ditinggalkan dan digantikan dengan algoritma yang lebih canggih yang disebut LMD-GHOST. Penting untuk disadari bahwa dalam kondisi normal, aturan pilihan percabangan tidak diperlukan - ada pengusul blok tunggal untuk setiap slot, dan validator yang jujur ​​membuktikannya. Hanya pada kasus asinkronisitas jaringan besar atau saat pengusul blok yang tidak jujur ​​berkelit maka algoritma pilihan percabangan diperlukan. Namun, ketika kasus tersebut muncul, algoritma pilihan percabangan merupakan pertahanan krusial yang mengamankan rantai yang benar.

LMD-GHOST merupakan singkatan dari "sub-pohon serakah terberat yang diamati yang digerakkan oleh pesan terbaru". Ini adalah cara yang sarat jargon untuk mendefinisikan algoritma yang memilih percabangan dengan bobot akumulasi atestasi terbesar sebagai percabangan kanonik (sub-pohon greedy terberat) dan jika beberapa pesan diterima dari satu validator, maka hanya pesan terbaru yang dipertimbangkan (didorong oleh pesan terbaru). Sebelum menambahkan blok terberat ke rantai kanoniknya, setiap validator menilai setiap blok menggunakan aturan ini.

## Bacaan Lebih Lanjut {#further-reading}

- [Gasper: Menggabungkan GHOST dan Casper](https://arxiv.org/pdf/2003.03052.pdf)
- [Casper the Friendly Finality Gadget](https://arxiv.org/pdf/1710.09437.pdf)
