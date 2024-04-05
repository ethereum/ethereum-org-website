---
title: Finalitas ruang tunggal
description: Penjelasan finalitas ruang tunggal
lang: id
---

# Finalitas ruang tunggal {#single-slot-finality}

Perlu sekitar 15 menit bagi blok Ethereum untuk diselesaikan. Namun, kita bisa membuat mekanik konsensus Ethereum memvalidasi blok dengan lebih efisien dan mengurangi waktu-ke-finalitas secara dramatis. Daripada menunggu lima belas menit, blok bisa dipinang dan diselesaikan dalam ruang yang sama. Konsep ini dikenal dengan **finalitas ruang tunggal (SSF)**.

## Apa itu kefinalan? {#what-is-finality}

Dalam mekanisme konsensus berbasis bukti taruhan Ethereum, finalitas mengacu pada jaminan bahwa blok tidak dapat diubah atau dihapus dari rantai blok tanpa membakar setidaknya 33% dari total ETH yang ditambang. Ini adalah keamanan 'kripto-ekonomi' karena kepercayaan berasal dari biaya yang sangat tinggi yang terkait dengan mengubah urutan atau konten rantai yang akan mencegah aktor ekonomi rasional untuk mencobanya.

## Mengapa mengincar finalitas yang lebih cepat? {#why-aim-for-quicker-finality}

Waktu finalitas saat ini ternyata terlalu lama. Kebanyakan pengguna tidak ingin menunggu 15 menit untuk finalitas, dan ini tidak nyaman bagi aplikasi dan bursa yang mungkin ingin memiliki keluaran transaksi yang tinggi untuk harus menunggu selama itu untuk memastikan transaksi mereka permanen. Adanya jeda antara proposal dan finalisasi blok juga menciptakan peluang untuk reorg pendek yang dapat digunakan oleh penyerang untuk menyensor blok tertentu atau mengekstrak MEV. Mekanisme yang menangani peningkatan blok dalam tahap juga cukup rumit dan telah diperbaiki beberapa kali untuk menutup kerentanan keamanan, menjadikannya salah satu bagian dari basis kode Ethereum di mana bug halus lebih mungkin muncul. Masalah-masalah ini dapat dihilangkan dengan mengurangi waktu finalitas menjadi satu ruang.

## Pengorbanan antara desentralisasi / waktu / overhead {#the-decentralization-time-overhead-tradeoff}

Jaminan finalitas bukanlah sifat langsung dari blok baru; dibutuhkan waktu untuk blok baru mencapai finalitas. Alasannya adalah validator yang mewakili setidaknya 2/3 dari total ETH yang ditambang di jaringan harus memberikan suara untuk blok ("menyatakan") agar dianggap final. Setiap simpul memvalidasi di jaringan harus memproses pengesahan dari simpul lain untuk mengetahui apakah blok telah, atau belum, mencapai ambang batas 2/3 itu.

Semakin singkat waktu yang diberikan untuk mencapai finalisasi, semakin banyak daya komputasi yang dibutuhkan di setiap simpul karena pemrosesan pengesahan harus dilakukan lebih cepat. Juga, semakin banyak simpul validasi yang ada di jaringan, semakin banyak pengesahan yang harus diproses untuk setiap blok, juga menambah daya komputasi yang dibutuhkan. Semakin banyak daya komputasi yang dibutuhkan, semakin sedikit orang yang dapat berpartisipasi karena perangkat keras yang lebih mahal diperlukan untuk memvalidasi setiap simpul. Meningkatkan waktu antara blok mengurangi daya komputasi yang dibutuhkan di setiap simpul tetapi juga memperpanjang waktu hingga finalitas, karena pengesahan diproses lebih lambat.

Oleh karena itu, ada tawar-menawar antara overhead (daya komputasi), desentralisasi (jumlah simpul yang dapat berpartisipasi dalam memvalidasi rantai) dan waktu hingga finalitas. Sistem keseimbangan ideal daya komputasi minimum, desentralisasi maksimum dan waktu hingga finalitas minimum.

Mekanisme konsensus Ethereum saat ini menyeimbangkan ketiga parameter ini dengan:

- **Menetapkan taruhan minimum menjadi 32 ETH**. Ini menetapkan batas atas jumlah pernyataan validator yang harus diproses oleh simpul individu, dan karenanya batas atas persyaratan komputasi untuk setiap simpul.
- **Menetapkan waktu hingga finalitas sekitar ~15 menit**. Ini memberikan waktu yang cukup bagi validator yang dijalankan pada komputer rumah biasa untuk memproses pernyataan dengan aman untuk setiap blok.

Dengan desain mekanisme saat ini, untuk mengurangi waktu hingga finalitas, perlu mengurangi jumlah validator di jaringan atau meningkatkan persyaratan perangkat keras untuk setiap simpul. Namun, ada peningkatan yang dapat dilakukan pada cara pemrosesan pernyataan yang dapat memungkinkan lebih banyak pengesahan dihitung tanpa menambah biaya overhead di setiap simpul. Pemrosesan yang lebih efisien akan memungkinkan finalitas ditentukan dalam satu ruang, bukan di dua jangka waktu.

## Rute ke SSF {#routes-to-ssf}

<ExpandableCard title= "Mengapa kita tidak bisa memiliki SSF sekarang?" eventCategory="/roadmap/single-slot-finality" eventName="clicked Why can't we hear SSF today?">

Mekanisme konsensus saat ini menggabungkan pengesahan dari beberapa validator, yang dikenal sebagai komite, untuk mengurangi jumlah pesan yang harus diproses oleh setiap validator untuk memvalidasi blok. Setiap validator memiliki kesempatan untuk mengesahkan dalam setiap jangka waktu (32 ruang) tetapi di setiap ruang, hanya sebagian validator, yang dikenal sebagai 'panitia' yang mengesahkan. Mereka melakukannya dengan membagi menjadi subnet di mana beberapa validator dipilih untuk menjadi 'agregator'. Agregator-agregator itu masing-masing menggabungkan semua tanda tangan yang mereka lihat dari validator lain di subnet mereka menjadi satu tanda tangan agregat. Agregator yang mencakup jumlah kontribusi individu terbanyak mengirimkan tanda tangan agregat mereka ke proposer blok, yang menyertakannya dalam blok bersama dengan tanda tangan agregat dari panitia lain.

Proses ini memberikan kapasitas yang cukup untuk setiap validator memberikan suara dalam setiap jangka waktu, karena 32 ruang * 64 panitia * 256 validator per panitia = 524.288 validator per jangka waktu. Pada saat penulisan (Februari 2023) ada ~513.000 validator aktif.

Dalam skema ini, hanya mungkin bagi setiap validator untuk memberikan suara pada blok dengan mendistribusikan pengesahan mereka di seluruh jangka waktu. Namun, ada kemungkinan cara untuk meningkatkan mekanisme sehingga _setiap validator memiliki kesempatan untuk mengesahkan dalam setiap ruang_.
</ExpandableCard>

Sejak mekanisme konsensus Ethereum dirancang, skema agregasi tanda tangan (BLS) telah ditemukan jauh lebih skalabel daripada yang awalnya dipikirkan, sementara kemampuan klien untuk memproses dan memverifikasi tanda tangan juga meningkat. Ternyata memproses pengesahan dari sejumlah besar validator sebenarnya mungkin dalam satu ruang. Misalnya, dengan satu juta validator masing-masing memberikan suara dua kali di setiap ruang, dan waktu ruang disesuaikan menjadi 16 detik, simpul akan diminta untuk memverifikasi tanda tangan dengan kecepatan minimum 125.000 agregasi per detik untuk memproses semua 1 juta pengesahan dalam ruang. Pada kenyataannya, dibutuhkan sekitar 500 nanodetik untuk melakukan satu verifikasi tanda tangan, yang berarti 125.000 dapat dilakukan dalam ~62,5 ms - jauh di bawah ambang batas satu detik.

Peningkatan efisiensi lebih lanjut dapat dilakukan dengan membuat superkomite misalnya 125.000 validator acak dipilih per ruang. Hanya validator ini yang bisa memberikan suara pada blok dan oleh karena itu hanya subset validator ini yang memutuskan apakah blok sudah final atau tidak. Apakah ini ide yang baik atau tidak tergantung pada seberapa mahal komunitas lebih suka serangan berhasil pada Ethereum. Ini karena alih-alih membutuhkan 2/3 dari total ether yang ditambang, dan penyerang bisa menyelesaikan blok tidak jujur dengan 2/3 dari ether yang ditambang _di superkomite itu_. Ini masih merupakan area penelitian aktif, tetapi tampaknya masuk akal bahwa untuk set validator cukup besar untuk membutuhkan superkomite pada awalnya, biaya menyerang salah satu subkomite itu akan sangat tinggi (misalnya biaya serangan dalam ETH akan menjadi `2/3 * 125,000 * 32 = ~2.6 million ETH`). Biaya serangan dapat disesuaikan dengan meningkatkan ukuran set validator (misalnya sesuaikan ukuran validator sehingga biaya serangan sama dengan 1 juta ether, 4 juta ether, 10 juta ether, dll). [Jajak pendapat awal](https://youtu.be/ojBgyFl6-v4?t=755) dari komunitas tampaknya menunjukkan bahwa 1-2 juta ether adalah biaya serangan yang dapat diterima, yang menyiratkan ~65.536 - 97.152 validator per superkomite.

Namun, verifikasi bukanlah hambatan sebenarnya - agregasi tanda tanganlah yang benar-benar menantang simpul validasi. Untuk meningkatkan skala agregasi tanda tangan mungkin akan membutuhkan peningkatan jumlah validator di setiap subnet, meningkatkan jumlah subnet, atau menambahkan lapisan agregasi tambahan (yaitu menerapkan panitia dari panitia). Bagian dari solusinya mungkin dengan mengizinkan agregator khusus - serupa dengan bagaimana pembangunan blok dan menghasilkan komitmen untuk data rollup akan diserahkan ke pembangun blok khusus di bawah pemisahan proposer-builder (PBS) dan Danksharding.

## Apa peran aturan pilihan-garpu di SSF? {#role-of-the-fork-choice-rule}

Mekanisme konsensus saat ini mengandalkan hubungan erat antara alat finalitas (algoritma yang menentukan apakah 2/3 validator telah memberikan kesaksian pada rantai tertentu) dan aturan pilihan garpu (algoritma yang memutuskan rantai mana yang benar ketika ada beberapa pilihan). Algoritma pilihan garpu hanya mempertimbangkan blok _sejak_ blok terakhir yang difinalisasi. Di bawah SSF tidak akan ada blok untuk dipertimbangkan oleh aturan pilihan garpu, karena finalitas terjadi di ruang yang sama dengan blok yang diajukan. Ini berarti bahwa di bawah SSF _baik_ algoritma pilihan cabang _maupun_ alat finalitas akan aktif setiap saat. Alat finalitas akan menyelesaikan blok di mana 2/3 validator sedang daring dan membuktikan dengan jujur. Jika sebuah blok tidak mampu melebihi ambang batas 2/3, aturan pilihan garpu akan berperan untuk menentukan rantai mana yang harus diikuti. Ini juga menciptakan peluang untuk mempertahankan mekanisme kebocoran ketidakaktifan yang memulihkan rantai di mana >1/3 validator menjadi offline, meskipun dengan beberapa nuansa tambahan.

## Masalah yang belum terselesaikan {#outstanding-issues}

Masalah dengan penskalaan agregasi dengan meningkatkan jumlah validator per subnet adalah bahwa hal itu menyebabkan beban yang lebih besar pada jaringan rekan-ke-rekan. Masalah dengan menambahkan lapisan agregasi adalah bahwa hal itu cukup kompleks untuk dirancang dan menambahkan latensi (yaitu, bisa memakan waktu lebih lama bagi proposer blok untuk mendengar dari semua agregator subnet). Juga tidak jelas bagaimana cara menangani skenario di mana ada lebih banyak validator aktif di jaringan daripada yang dapat diproses secara layak di setiap ruang, bahkan dengan agregasi tanda tangan BLS. Salah satu solusi potensial adalah bahwa, karena semua validator memberikan kesaksian di setiap ruang dan tidak ada panitia di bawah SSF, batas 32 ETH pada keseimbangan efektif dapat dihapus sepenuhnya, yang berarti operator yang mengelola beberapa validator dapat mengonsolidasikan taruhan mereka dan menjalankan lebih sedikit, mengurangi jumlah pesan yang harus diproses oleh simpul validasi untuk memperhitungkan seluruh set validator. Ini bergantung pada staker besar yang setuju untuk mengonsolidasikan validator mereka. Juga dimungkinkan untuk memberlakukan batas tetap pada jumlah validator atau jumlah penaruhan ETH setiap saat. Namun, ini membutuhkan beberapa mekanisme untuk memutuskan validator mana yang diizinkan untuk berpartisipasi dan mana yang tidak, yang rentan menciptakan efek samping yang tidak diinginkan.

## Kemajuan saat ini {#current-progress}

SSF sedang dalam tahap penelitian. Ini tidak diharapkan akan diluncurkan dalam beberapa tahun ke depan, kemungkinan setelah peningkatan besar lainnya seperti [Verkle trees](/roadmap/verkle-trees/) dan [Danksharding](/roadmap/danksharding/).

## Bacaan lebih lanjut {#further-reading}

- [Vitalik tentang SSF di EDCON 2022](https://www.youtube.com/watch?v=nPgUKNPWXNI)
- [Catatan Vitalik: Jalur menuju satu finalitas ruang tunggal](https://notes.ethereum.org/@vbuterin/single_slot_finality)
