---
title: Gasper
description: Penjelasan tentang mekanisme proof-of-stake Gasper.
lang: id
---

Gasper adalah kombinasi dari Casper the Friendly Finality Gadget (Casper-FFG) dan algoritma pilihan fork LMD-GHOST. Bersama-sama, komponen-komponen ini membentuk mekanisme konsensus yang mengamankan Ethereum proof-of-stake. Casper adalah mekanisme yang meningkatkan blok tertentu menjadi "difinalisasi" sehingga pendatang baru ke dalam jaringan dapat yakin bahwa mereka menyinkronkan rantai kanonikal. Algoritma pilihan fork menggunakan akumulasi suara untuk memastikan bahwa node dapat dengan mudah memilih yang benar ketika fork muncul di blockchain.

**Catatan** bahwa definisi asli Casper-FFG sedikit diperbarui untuk dimasukkan ke dalam Gasper. Di halaman ini kami mempertimbangkan versi yang diperbarui.

## Prasyarat

Untuk memahami materi ini, Anda perlu membaca halaman pengantar tentang [proof-of-stake](/developers/docs/consensus-mechanisms/pos/).

## Peran Gasper {#role-of-gasper}

Gasper berada di atas blockchain proof-of-stake di mana node menyediakan ether sebagai deposit keamanan yang dapat dihancurkan jika mereka malas atau tidak jujur dalam mengusulkan atau memvalidasi blok. Gasper adalah mekanisme yang mendefinisikan bagaimana validator mendapatkan hadiah dan hukuman, memutuskan blok mana yang akan diterima dan ditolak, dan fork blockchain mana yang akan dibangun.

## Apa itu finalitas? {#what-is-finality}

Finalitas adalah properti dari blok tertentu yang berarti mereka tidak dapat dikembalikan kecuali telah terjadi kegagalan konsensus kritis dan penyerang telah menghancurkan setidaknya 1/3 dari total ether yang di-stake. Blok yang difinalisasi dapat dianggap sebagai informasi yang diyakini oleh blockchain. Sebuah blok harus melewati prosedur peningkatan dua langkah agar blok tersebut dapat difinalisasi:

1. Dua pertiga dari total ether yang di-stake harus memberikan suara yang mendukung penyertaan blok tersebut dalam rantai kanonikal. Kondisi ini meningkatkan blok menjadi "dibenarkan" (justified). Blok yang dibenarkan tidak mungkin dikembalikan, tetapi bisa saja terjadi dalam kondisi tertentu.
2. Ketika blok lain dibenarkan di atas blok yang dibenarkan, blok tersebut ditingkatkan menjadi "difinalisasi". Memfinalisasi sebuah blok adalah komitmen untuk menyertakan blok tersebut dalam rantai kanonikal. Ini tidak dapat dikembalikan kecuali penyerang menghancurkan jutaan ether (miliaran $USD).

Peningkatan blok ini tidak terjadi di setiap slot. Sebaliknya, hanya blok batas epoch yang dapat dibenarkan dan difinalisasi. Blok-blok ini dikenal sebagai "pos pemeriksaan" (checkpoints). Peningkatan mempertimbangkan pasangan pos pemeriksaan. Sebuah "tautan supermayoritas" harus ada di antara dua pos pemeriksaan yang berurutan (yaitu, dua pertiga dari total ether yang di-stake memberikan suara bahwa pos pemeriksaan B adalah turunan yang benar dari pos pemeriksaan A) untuk meningkatkan pos pemeriksaan yang lebih lama menjadi difinalisasi dan blok yang lebih baru menjadi dibenarkan.

Karena finalitas membutuhkan persetujuan dua pertiga bahwa sebuah blok adalah kanonikal, penyerang tidak mungkin membuat rantai alternatif yang difinalisasi tanpa:

1. Memiliki atau memanipulasi dua pertiga dari total ether yang di-stake.
2. Menghancurkan setidaknya sepertiga dari total ether yang di-stake.

Kondisi pertama muncul karena dua pertiga dari ether yang di-stake diperlukan untuk memfinalisasi sebuah rantai. Kondisi kedua muncul karena jika dua pertiga dari total stake telah memberikan suara yang mendukung kedua fork, maka sepertiga pasti telah memberikan suara pada keduanya. Pemungutan suara ganda adalah kondisi pemotongan yang akan dihukum secara maksimal, dan sepertiga dari total stake akan dihancurkan. Pada Mei 2022, ini mengharuskan penyerang untuk membakar ether senilai sekitar $10 miliar. Algoritma yang membenarkan dan memfinalisasi blok di Gasper adalah bentuk yang sedikit dimodifikasi dari [Casper the Friendly Finality Gadget (Casper-FFG)](https://arxiv.org/pdf/1710.09437.pdf).

### Insentif dan Pemotongan {#incentives-and-slashing}

Validator mendapatkan hadiah karena mengusulkan dan memvalidasi blok secara jujur. Ether dihadiahkan dan ditambahkan ke stake mereka. Di sisi lain, validator yang absen dan gagal bertindak saat dipanggil akan kehilangan hadiah ini dan terkadang kehilangan sebagian kecil dari stake mereka yang ada. Namun, hukuman karena offline adalah kecil dan, dalam banyak kasus, sama dengan biaya peluang dari hadiah yang terlewatkan. Namun, beberapa tindakan validator sangat sulit dilakukan secara tidak sengaja dan menandakan niat jahat, seperti mengusulkan beberapa blok untuk slot yang sama, mengesahkan beberapa blok untuk slot yang sama, atau bertentangan dengan suara pos pemeriksaan sebelumnya. Ini adalah perilaku "yang dapat dipotong" (slashable) yang dihukum lebih keras—pemotongan mengakibatkan sebagian dari stake validator dihancurkan dan validator dikeluarkan dari jaringan validator. Proses ini memakan waktu 36 hari. Pada Hari ke-1, ada hukuman awal hingga 1 ETH. Kemudian ether validator yang dipotong perlahan-lahan terkuras selama periode keluar, tetapi pada Hari ke-18, mereka menerima "hukuman korelasi", yang lebih besar ketika lebih banyak validator dipotong pada waktu yang hampir bersamaan. Hukuman maksimum adalah seluruh stake. Hadiah dan hukuman ini dirancang untuk memberi insentif kepada validator yang jujur dan mencegah serangan terhadap jaringan.

### Kebocoran Ketidakaktifan {#inactivity-leak}

Selain keamanan, Gasper juga menyediakan "keaktifan yang masuk akal" (plausible liveness). Ini adalah kondisi di mana selama dua pertiga dari total ether yang di-stake memberikan suara secara jujur dan mengikuti protokol, rantai akan dapat difinalisasi terlepas dari aktivitas lain (seperti serangan, masalah latensi, atau pemotongan). Dengan kata lain, sepertiga dari total ether yang di-stake harus dikompromikan dengan cara tertentu untuk mencegah rantai difinalisasi. Di Gasper, ada garis pertahanan tambahan terhadap kegagalan keaktifan, yang dikenal sebagai "kebocoran ketidakaktifan" (inactivity leak). Mekanisme ini aktif ketika rantai gagal difinalisasi selama lebih dari empat epoch. Validator yang tidak secara aktif mengesahkan rantai mayoritas akan mengalami stake mereka terkuras secara bertahap hingga mayoritas mendapatkan kembali dua pertiga dari total stake, memastikan bahwa kegagalan keaktifan hanya bersifat sementara.

### Pilihan fork {#fork-choice}

Definisi asli Casper-FFG menyertakan algoritma pilihan fork yang memberlakukan aturan: `ikuti rantai yang berisi pos pemeriksaan yang dibenarkan yang memiliki ketinggian terbesar` di mana ketinggian (height) didefinisikan sebagai jarak terjauh dari blok genesis. Di Gasper, aturan pilihan fork asli tidak lagi digunakan dan digantikan oleh algoritma yang lebih canggih yang disebut LMD-GHOST. Penting untuk disadari bahwa dalam kondisi normal, aturan pilihan fork tidak diperlukan - ada satu pengusul blok untuk setiap slot, dan validator yang jujur mengesahkannya. Hanya dalam kasus asinkronisitas jaringan yang besar atau ketika pengusul blok yang tidak jujur telah berbuat curang (equivocated) barulah algoritma pilihan fork diperlukan. Namun, ketika kasus-kasus tersebut muncul, algoritma pilihan fork adalah pertahanan penting yang mengamankan rantai yang benar.

LMD-GHOST adalah singkatan dari "latest message-driven greedy heaviest observed sub-tree". Ini adalah cara yang penuh jargon untuk mendefinisikan algoritma yang memilih fork dengan akumulasi bobot pengesahan terbesar sebagai yang kanonikal (greedy heaviest subtree) dan bahwa jika beberapa pesan diterima dari validator, hanya yang terbaru yang dipertimbangkan (latest-message driven). Sebelum menambahkan blok terberat ke rantai kanonikalnya, setiap validator menilai setiap blok menggunakan aturan ini.

## Bacaan Lebih Lanjut {#further-reading}

- [Gasper: Menggabungkan GHOST dan Casper](https://arxiv.org/pdf/2003.03052.pdf)
- [Casper the Friendly Finality Gadget](https://arxiv.org/pdf/1710.09437.pdf)