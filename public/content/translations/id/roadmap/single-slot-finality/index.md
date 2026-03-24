---
title: Finalitas slot tunggal
description: Penjelasan tentang finalitas slot tunggal
lang: id
---

# Finalitas slot tunggal {#single-slot-finality}

Dibutuhkan sekitar 15 menit agar sebuah blok [Ethereum](/) mencapai finalitas. Namun, kita dapat membuat mekanisme konsensus Ethereum memvalidasi blok dengan lebih efisien dan mengurangi waktu menuju finalitas secara dramatis. Alih-alih menunggu selama lima belas menit, blok dapat diusulkan dan difinalisasi dalam slot yang sama. Konsep ini dikenal sebagai **finalitas slot tunggal (single slot finality/SSF)**.

## Apa itu finalitas? {#what-is-finality}

Dalam mekanisme konsensus berbasis proof-of-stake Ethereum, finalitas mengacu pada jaminan bahwa sebuah blok tidak dapat diubah atau dihapus dari blockchain tanpa membakar setidaknya 33% dari total ETH yang di-stake. Ini adalah keamanan 'kripto-ekonomi' karena kepercayaan berasal dari biaya yang sangat tinggi yang terkait dengan mengubah urutan atau konten rantai yang akan mencegah aktor ekonomi rasional mana pun untuk mencobanya.

## Mengapa menargetkan finalitas yang lebih cepat? {#why-aim-for-quicker-finality}

Waktu menuju finalitas saat ini ternyata terlalu lama. Sebagian besar pengguna tidak ingin menunggu 15 menit untuk finalitas, dan ini tidak nyaman bagi aplikasi dan bursa yang mungkin menginginkan throughput transaksi tinggi karena harus menunggu selama itu untuk memastikan transaksi mereka permanen. Adanya penundaan antara usulan blok dan finalisasi juga menciptakan peluang untuk reorg singkat yang dapat digunakan penyerang untuk menyensor blok tertentu atau mengekstraksi MEV. Mekanisme yang menangani peningkatan blok secara bertahap juga cukup kompleks dan telah ditambal beberapa kali untuk menutup kerentanan keamanan, menjadikannya salah satu bagian dari basis kode Ethereum di mana bug halus lebih mungkin muncul. Semua masalah ini dapat dihilangkan dengan mengurangi waktu menuju finalitas menjadi satu slot tunggal.

## Pertukaran (tradeoff) antara desentralisasi / waktu / overhead {#the-decentralization-time-overhead-tradeoff}

Jaminan finalitas bukanlah properti langsung dari blok baru; dibutuhkan waktu agar blok baru mencapai finalitas. Alasannya adalah bahwa validator yang mewakili setidaknya 2/3 dari total ETH yang di-stake di jaringan harus memberikan suara untuk blok tersebut ("mengesahkan") agar dianggap final. Setiap node validasi di jaringan harus memproses pengesahan dari node lain untuk mengetahui bahwa sebuah blok telah, atau belum, mencapai ambang batas 2/3 tersebut.

Semakin singkat waktu yang diizinkan untuk mencapai finalisasi, semakin banyak daya komputasi yang dibutuhkan di setiap node karena pemrosesan pengesahan harus dilakukan lebih cepat. Selain itu, semakin banyak node validasi yang ada di jaringan, semakin banyak pengesahan yang harus diproses untuk setiap blok, yang juga menambah daya pemrosesan yang dibutuhkan. Semakin banyak daya pemrosesan yang dibutuhkan, semakin sedikit orang yang dapat berpartisipasi karena perangkat keras yang lebih mahal diperlukan untuk menjalankan setiap node validasi. Meningkatkan waktu antar blok mengurangi daya komputasi yang dibutuhkan di setiap node tetapi juga memperpanjang waktu menuju finalitas, karena pengesahan diproses lebih lambat.

Oleh karena itu, ada pertukaran (trade-off) antara overhead (daya komputasi), desentralisasi (jumlah node yang dapat berpartisipasi dalam memvalidasi rantai), dan waktu menuju finalitas. Sistem yang ideal menyeimbangkan daya komputasi minimum, desentralisasi maksimum, dan waktu minimum menuju finalitas.

Mekanisme konsensus Ethereum saat ini menyeimbangkan ketiga parameter ini dengan:

- **Menetapkan stake minimum sebesar 32 ETH**. Ini menetapkan batas atas pada jumlah pengesahan validator yang harus diproses oleh node individu, dan oleh karena itu batas atas pada persyaratan komputasi untuk setiap node.
- **Menetapkan waktu menuju finalitas pada ~15 menit**. Ini memberikan waktu yang cukup bagi validator yang dijalankan di komputer rumah biasa untuk memproses pengesahan dengan aman untuk setiap blok.

Dengan desain mekanisme saat ini, untuk mengurangi waktu menuju finalitas, perlu untuk mengurangi jumlah validator di jaringan atau meningkatkan persyaratan perangkat keras untuk setiap node. Namun, ada peningkatan yang dapat dilakukan pada cara pengesahan diproses yang memungkinkan lebih banyak pengesahan dihitung tanpa menambah overhead di setiap node. Pemrosesan yang lebih efisien akan memungkinkan finalitas ditentukan dalam satu slot tunggal, alih-alih melintasi dua epoch.

## Rute menuju SSF {#routes-to-ssf}

<ExpandableCard title= "Mengapa kita tidak bisa memiliki SSF hari ini?" eventCategory="/roadmap/single-slot-finality" eventName="clicked Why can't we hear SSF today?">

Mekanisme konsensus saat ini menggabungkan pengesahan dari beberapa validator, yang dikenal sebagai komite, untuk mengurangi jumlah pesan yang harus diproses setiap validator untuk memvalidasi sebuah blok. Setiap validator memiliki kesempatan untuk mengesahkan di setiap epoch (32 slot) tetapi di setiap slot, hanya sebagian validator, yang dikenal sebagai 'komite' yang mengesahkan. Mereka melakukannya dengan membagi diri ke dalam subnet di mana beberapa validator dipilih menjadi 'agregator'. Masing-masing agregator tersebut menggabungkan semua tanda tangan yang mereka lihat dari validator lain di subnet mereka menjadi satu tanda tangan agregat. Agregator yang menyertakan jumlah kontribusi individu terbanyak meneruskan tanda tangan agregat mereka ke pengusul blok, yang menyertakannya di dalam blok bersama dengan tanda tangan agregat dari komite lainnya.

Proses ini memberikan kapasitas yang cukup bagi setiap validator untuk memberikan suara di setiap epoch, karena `32 slot * 64 komite * 256 validator per komite = 524.288 validator per epoch`. Pada saat penulisan (Februari 2023) terdapat ~513.000 validator aktif.

Dalam skema ini, setiap validator hanya mungkin memberikan suara pada sebuah blok dengan mendistribusikan pengesahan mereka di seluruh epoch. Namun, ada potensi cara untuk meningkatkan mekanisme sehingga _setiap validator memiliki kesempatan untuk mengesahkan di setiap slot_.
</ExpandableCard>

Sejak mekanisme konsensus Ethereum dirancang, skema agregasi tanda tangan (BLS) telah ditemukan jauh lebih dapat diskalakan daripada yang diperkirakan sebelumnya, sementara kemampuan klien untuk memproses dan memverifikasi tanda tangan juga telah meningkat. Ternyata memproses pengesahan dari sejumlah besar validator sebenarnya dimungkinkan dalam satu slot tunggal. Misalnya, dengan satu juta validator yang masing-masing memberikan suara dua kali di setiap slot, dan waktu slot disesuaikan menjadi 16 detik, node akan diminta untuk memverifikasi tanda tangan pada tingkat minimum 125.000 agregasi per detik untuk memproses semua 1 juta pengesahan di dalam slot tersebut. Pada kenyataannya, dibutuhkan komputer normal sekitar 500 nanodetik untuk melakukan satu verifikasi tanda tangan, yang berarti 125.000 dapat dilakukan dalam ~62,5 md - jauh di bawah ambang batas satu detik.

Peningkatan efisiensi lebih lanjut dapat dilakukan dengan membuat superkomite yang terdiri dari mis., 125.000 validator yang dipilih secara acak per slot. Hanya validator ini yang dapat memberikan suara pada sebuah blok dan oleh karena itu hanya sebagian validator ini yang memutuskan apakah sebuah blok difinalisasi. Apakah ini ide yang bagus atau tidak bermuara pada seberapa mahal komunitas lebih memilih serangan yang berhasil terhadap Ethereum. Ini karena alih-alih membutuhkan 2/3 dari total ether yang di-stake, penyerang dapat memfinalisasi blok yang tidak jujur dengan 2/3 dari ether yang di-stake _di superkomite tersebut_. Ini masih merupakan area penelitian yang aktif, tetapi tampaknya masuk akal bahwa untuk set validator yang cukup besar sehingga memerlukan superkomite sejak awal, biaya untuk menyerang salah satu subkomite tersebut akan sangat tinggi (mis., biaya serangan dalam denominasi ETH akan menjadi `2/3 * 125.000 * 32 = ~2,6 juta ETH`). Biaya serangan dapat disesuaikan dengan meningkatkan ukuran set validator (mis., menyesuaikan ukuran validator sehingga biaya serangan sama dengan 1 juta ether, 4 juta ether, 10 juta ether, dll). [Jajak pendapat awal](https://youtu.be/ojBgyFl6-v4?t=755) dari komunitas tampaknya menunjukkan bahwa 1-2 juta ether adalah biaya serangan yang dapat diterima, yang menyiratkan ~65.536 - 97.152 validator per superkomite.

Namun, verifikasi bukanlah hambatan yang sebenarnya - agregasi tanda tanganlah yang benar-benar menantang node validator. Untuk menskalakan agregasi tanda tangan mungkin akan memerlukan peningkatan jumlah validator di setiap subnet, peningkatan jumlah subnet, atau penambahan lapisan agregasi tambahan (yaitu, mengimplementasikan komite dari komite). Sebagian dari solusi mungkin dengan mengizinkan agregator khusus - mirip dengan bagaimana pembangunan blok dan pembuatan komitmen untuk data rollup akan dialihdayakan ke pembangun blok khusus di bawah pemisahan pengusul-pembangun (PBS) dan Danksharding.

## Apa peran aturan pilihan fork dalam SSF? {#role-of-the-fork-choice-rule}

Mekanisme konsensus saat ini bergantung pada penggabungan yang erat antara finality gadget (algoritma yang menentukan apakah 2/3 validator telah mengesahkan rantai tertentu) dan aturan pilihan fork (algoritma yang memutuskan rantai mana yang benar ketika ada beberapa opsi). Algoritma pilihan fork hanya mempertimbangkan blok _sejak_ blok terakhir yang difinalisasi. Di bawah SSF tidak akan ada blok yang perlu dipertimbangkan oleh aturan pilihan fork, karena finalitas terjadi di slot yang sama saat blok diusulkan. Ini berarti bahwa di bawah SSF _baik_ algoritma pilihan fork _maupun_ finality gadget akan aktif kapan saja. Finality gadget akan memfinalisasi blok di mana 2/3 validator sedang online dan mengesahkan dengan jujur. Jika sebuah blok tidak mampu melampaui ambang batas 2/3, aturan pilihan fork akan bekerja untuk menentukan rantai mana yang harus diikuti. Hal ini juga menciptakan peluang untuk mempertahankan mekanisme kebocoran ketidakaktifan (inactivity leak) yang memulihkan rantai di mana >1/3 validator offline, meskipun dengan beberapa nuansa tambahan.

## Masalah yang belum terselesaikan {#outstanding-issues}

Masalah dengan penskalaan agregasi dengan menumbuhkan jumlah validator per subnet adalah hal itu mengarah pada beban yang lebih besar pada jaringan peer-to-peer. Masalah dengan penambahan lapisan agregasi adalah cukup kompleks untuk direkayasa dan menambah latensi (yaitu, bisa memakan waktu lebih lama bagi pengusul blok untuk mendengar dari semua agregator subnet). Juga tidak jelas bagaimana menangani skenario bahwa ada lebih banyak validator aktif di jaringan daripada yang dapat diproses secara layak di setiap slot, bahkan dengan agregasi tanda tangan BLS. Salah satu solusi potensial adalah, karena semua validator mengesahkan di setiap slot dan tidak ada komite di bawah SSF, batas 32 ETH pada saldo efektif dapat dihapus sepenuhnya, yang berarti operator yang mengelola beberapa validator dapat mengonsolidasikan stake mereka dan menjalankan lebih sedikit validator, mengurangi jumlah pesan yang harus diproses oleh node validasi untuk memperhitungkan seluruh set validator. Ini bergantung pada staker besar yang setuju untuk mengonsolidasikan validator mereka. Dimungkinkan juga untuk memberlakukan batas tetap pada jumlah validator atau jumlah ETH yang di-stake kapan saja. Namun, ini memerlukan beberapa mekanisme untuk memutuskan validator mana yang diizinkan untuk berpartisipasi dan mana yang tidak, yang rentan menciptakan efek sekunder yang tidak diinginkan.

## Kemajuan saat ini {#current-progress}

SSF sedang dalam fase penelitian. Ini tidak diharapkan untuk diluncurkan selama beberapa tahun, kemungkinan setelah peningkatan substansial lainnya seperti [Verkle trees](/roadmap/verkle-trees/) dan [Danksharding](/roadmap/danksharding/).

## Bacaan lebih lanjut {#further-reading}

- [Vitalik tentang SSF di EDCON 2022](https://www.youtube.com/watch?v=nPgUKNPWXNI)
- [Catatan Vitalik: Jalur menuju finalitas slot tunggal](https://notes.ethereum.org/@vbuterin/single_slot_finality)