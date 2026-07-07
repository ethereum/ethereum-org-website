---
title: Gasper
description: Penjelasan tentang mekanisme Bukti Kepemilikan (PoS) Gasper.
lang: id
---

Gasper adalah kombinasi dari Casper the Friendly Finality Gadget (Casper FFG) dan algoritme pilihan cabang LMD-GHOST. Bersama-sama, komponen-komponen ini membentuk mekanisme konsensus yang mengamankan Ethereum Bukti Kepemilikan (PoS). Casper adalah mekanisme yang meningkatkan blok tertentu menjadi "difinalisasi" sehingga pendatang baru ke dalam jaringan dapat yakin bahwa mereka sedang melakukan sinkronisasi rantai kanonikal. Algoritme pilihan cabang menggunakan suara yang terkumpul untuk memastikan bahwa node dapat dengan mudah memilih yang benar ketika percabangan muncul di rantai blok.

**Catatan** bahwa definisi asli Casper FFG sedikit diperbarui untuk dimasukkan ke dalam Gasper. Di halaman ini, kami mempertimbangkan versi yang diperbarui.

## Prasyarat {#prerequisites}

Untuk memahami materi ini, Anda perlu membaca halaman pengantar tentang [Bukti Kepemilikan (PoS)](/developers/docs/consensus-mechanisms/pos/).

## Peran Gasper {#role-of-gasper}

Gasper berada di atas rantai blok Bukti Kepemilikan (PoS) di mana node menyediakan ether sebagai deposit keamanan yang dapat dihancurkan jika mereka malas atau tidak jujur dalam mengusulkan atau memvalidasi blok. Gasper adalah mekanisme yang mendefinisikan bagaimana validator mendapatkan imbalan dan hukuman, memutuskan blok mana yang akan diterima dan ditolak, dan percabangan rantai blok mana yang akan dibangun.

## Apa itu finalitas? {#what-is-finality}

Finalitas adalah properti dari blok tertentu yang berarti mereka tidak dapat dikembalikan kecuali telah terjadi kegagalan konsensus kritis dan penyerang telah menghancurkan setidaknya 1/3 dari total ether yang di-stake. Blok yang difinalisasi dapat dianggap sebagai informasi yang diyakini kebenarannya oleh rantai blok. Sebuah blok harus melewati prosedur peningkatan dua langkah agar blok tersebut difinalisasi:

1. Dua pertiga dari total ether yang di-stake harus memilih untuk mendukung penyertaan blok tersebut dalam rantai kanonikal. Kondisi ini meningkatkan blok menjadi "terjustifikasi". Blok yang terjustifikasi tidak mungkin dikembalikan, tetapi bisa saja terjadi dalam kondisi tertentu.
2. Ketika blok lain terjustifikasi di atas blok yang terjustifikasi, blok tersebut ditingkatkan menjadi "difinalisasi". Memfinalisasi sebuah blok adalah komitmen untuk menyertakan blok tersebut dalam rantai kanonikal. Ini tidak dapat dikembalikan kecuali penyerang menghancurkan jutaan ether (miliaran $USD).

Peningkatan blok ini tidak terjadi di setiap slot. Sebaliknya, hanya blok batas Epok yang dapat terjustifikasi dan difinalisasi. Blok-blok ini dikenal sebagai "titik periksa". Peningkatan mempertimbangkan pasangan titik periksa. Sebuah "tautan mayoritas super" harus ada di antara dua titik periksa yang berurutan (yaitu, dua pertiga dari total ether yang di-stake memilih bahwa titik periksa B adalah turunan yang benar dari titik periksa A) untuk meningkatkan titik periksa yang lebih lama menjadi difinalisasi dan blok yang lebih baru menjadi terjustifikasi.

Karena finalitas membutuhkan persetujuan dua pertiga bahwa sebuah blok adalah kanonikal, penyerang tidak mungkin membuat rantai alternatif yang difinalisasi tanpa:

1. Memiliki atau memanipulasi dua pertiga dari total ether yang di-stake.
2. Menghancurkan setidaknya sepertiga dari total ether yang di-stake.

Kondisi pertama muncul karena dua pertiga dari ether yang di-stake diperlukan untuk memfinalisasi sebuah rantai. Kondisi kedua muncul karena jika dua pertiga dari total stake telah memilih untuk mendukung kedua percabangan, maka sepertiga pasti telah memilih keduanya. Pemungutan suara ganda adalah kondisi pemotongan yang akan dihukum secara maksimal, dan sepertiga dari total stake akan dihancurkan. Pada Mei 2022, ini mengharuskan penyerang untuk membakar ether senilai sekitar $10 miliar. Algoritme yang menjustifikasi dan memfinalisasi blok di Gasper adalah bentuk yang sedikit dimodifikasi dari [Casper the Friendly Finality Gadget (Casper FFG)](https://arxiv.org/pdf/1710.09437.pdf).

### Insentif dan Pemotongan {#incentives-and-slashing}

Validator mendapatkan imbalan karena mengusulkan dan memvalidasi blok secara jujur. Ether diberikan sebagai imbalan dan ditambahkan ke stake mereka. Di sisi lain, validator yang absen dan gagal bertindak saat dipanggil akan kehilangan imbalan ini dan terkadang kehilangan sebagian kecil dari stake mereka yang ada. Namun, penalti karena sedang luring (offline) tergolong kecil dan, dalam banyak kasus, sama dengan biaya peluang dari hilangnya imbalan. Namun, beberapa tindakan validator sangat sulit dilakukan secara tidak sengaja dan menandakan adanya intensi jahat, seperti mengusulkan beberapa blok untuk slot yang sama, membuktikan beberapa blok untuk slot yang sama, atau bertentangan dengan suara titik periksa sebelumnya. Ini adalah perilaku yang "dapat dipotong" yang dihukum lebih keras—pemotongan mengakibatkan sebagian dari stake validator dihancurkan dan validator dikeluarkan dari jaringan validator. Proses ini memakan waktu 36 hari. Pada Hari ke-1, ada penalti awal hingga 1 ETH. Kemudian ether validator yang dipotong perlahan-lahan terkuras selama periode keluar, tetapi pada Hari ke-18, mereka menerima "penalti korelasi", yang lebih besar ketika lebih banyak validator dipotong pada waktu yang hampir bersamaan. Penalti maksimum adalah seluruh stake. Imbalan dan penalti ini dirancang untuk memberi insentif kepada validator yang jujur dan mencegah serangan terhadap jaringan.

### Kebocoran Ketidakaktifan {#inactivity-leak}

Selain keamanan, Gasper juga menyediakan "keaktifan yang masuk akal" (plausible liveness). Ini adalah kondisi di mana selama dua pertiga dari total ether yang di-stake memilih secara jujur dan mengikuti protokol, rantai akan dapat difinalisasi terlepas dari aktivitas lain (seperti serangan, masalah latensi, atau pemotongan). Dengan kata lain, sepertiga dari total ether yang di-stake harus dikompromikan dengan cara tertentu untuk mencegah rantai difinalisasi. Di Gasper, ada garis pertahanan tambahan terhadap kegagalan keaktifan, yang dikenal sebagai "kebocoran ketidakaktifan". Mekanisme ini aktif ketika rantai gagal difinalisasi selama lebih dari empat Epok. Validator yang tidak secara aktif membuktikan rantai mayoritas akan mengalami pengurasan stake secara bertahap hingga mayoritas mendapatkan kembali dua pertiga dari total stake, memastikan bahwa kegagalan keaktifan hanya bersifat sementara.

### Pilihan cabang {#fork-choice}

Definisi asli Casper FFG menyertakan algoritme pilihan cabang yang memberlakukan aturan: `follow the chain containing the justified checkpoint that has the greatest height` di mana ketinggian didefinisikan sebagai jarak terjauh dari blok genesis. Di Gasper, aturan pilihan cabang asli tidak lagi digunakan dan digantikan oleh algoritme yang lebih canggih yang disebut LMD-GHOST. Penting untuk disadari bahwa dalam kondisi normal, aturan pilihan cabang tidak diperlukan - hanya ada satu pengusul blok untuk setiap slot, dan validator yang jujur membuktikannya. Hanya dalam kasus asinkronisitas jaringan yang besar atau ketika pengusul blok yang tidak jujur telah melakukan ekuivokasi, algoritme pilihan cabang diperlukan. Namun, ketika kasus-kasus tersebut muncul, algoritme pilihan cabang adalah pertahanan penting yang mengamankan rantai yang benar.

LMD-GHOST adalah singkatan dari "latest message-driven greedy heaviest observed sub-tree". Ini adalah cara yang penuh jargon untuk mendefinisikan algoritme yang memilih percabangan dengan akumulasi bobot pembuktian terbesar sebagai yang kanonikal (greedy heaviest subtree) dan bahwa jika beberapa pesan diterima dari validator, hanya yang terbaru yang dipertimbangkan (latest-message driven). Sebelum menambahkan blok terberat ke rantai kanonikalnya, setiap validator menilai setiap blok menggunakan aturan ini.

## Bacaan Lebih Lanjut {#further-reading}

- [Gasper: Menggabungkan GHOST dan Casper](https://arxiv.org/pdf/2003.03052.pdf)
- [Casper the Friendly Finality Gadget](https://arxiv.org/pdf/1710.09437.pdf)