---
title: Ethereum yang lebih aman
description: Ethereum merupakan platform kontrak pintar yang paling aman dan terdesentralisasi yang pernah ada. Namun, masih diperlukan perbaikan yang dapat dilakukan agar Ethereum tetap tangguh terhadap segala tingkat serangan di masa depan.
lang: id
image: /images/roadmap/roadmap-security.png
alt: "Peta Jalan Ethereum"
template: roadmap
---

**Ethereum sudah menjadi platform [smart-contract](/glossary/#smart-contract) yang sangat aman** dan terdesentralisasi. Namun, masih diperlukan perbaikan yang dapat dilakukan agar Ethereum tetap tangguh terhadap segala jenis serangan di masa depan. Ini termasuk perubahan halus pada cara [klien Ethereum](/glossary/#consensus-client) menangani [blok](/glossary/#block) yang bersaing, serta meningkatkan kecepatan jaringan dalam menganggap blok telah ["difinalisasi"](/developers/docs/consensus-mechanisms/pos/#finality) (artinya blok tidak dapat diubah tanpa kerugian ekonomi yang ekstrem bagi penyerang).

Ada juga perbaikan yang membuat sensor transaksi menjadi lebih sulit dengan membuat pengusul blok tidak dapat melihat isi sebenarnya dari blok mereka, dan cara baru untuk mengidentifikasi kapan klien melakukan sensor. Secara bersamaan, peningkatan ini akan memperbarui protokol [proof-of-stake](/glossary/#pos) sehingga para pengguna - dari individu hingga korporasi - memiliki kepercayaan instan pada aplikasi, data, dan aset mereka di Ethereum.

## Penarikan staking {#staking-withdrawals}

Peningkatan dari [proof-of-work](/glossary/#pow) ke [proof-of-stake](/glossary/#pos) dimulai dengan para perintis Ethereum yang melakukan “staking” ETH mereka dalam kontrak deposit. ETH tersebut digunakan untuk melindungi jaringan. Ada pembaruan kedua pada 12 April 2023 yang mengizinkan validator untuk menarik ETH yang ditaruhkan. Sejak saat itu, validator dapat dengan bebas melakukan taruhan atau penarikan ETH.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Baca tentang penarikan</ButtonLink>

## Perlindungan dari serangan {#defending-against-attacks}

Ada peningkatan yang dapat dilakukan pada protokol bukti taruhan Ethereum. Salah satunya dikenal sebagai [view-merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) - sebuah algoritma pilihan [fork](/glossary/#fork) yang lebih aman yang membuat jenis serangan canggih tertentu menjadi lebih sulit.

Mengurangi waktu yang dibutuhkan Ethereum untuk [menyelesaikan](/glossary/#finality) blok akan memberikan pengalaman pengguna yang lebih baik dan mencegah serangan "reorg" canggih di mana penyerang mencoba mengatur ulang blok yang sangat baru untuk mendapatkan keuntungan atau menyensor transaksi tertentu. [**Single slot finality (SSF)**](/roadmap/single-slot-finality/) adalah **cara untuk meminimalkan penundaan finalisasi**. Saat ini ada 15 menit blok yang secara teoritis dapat digunakan oleh penyerang untuk mengkonfigurasi ulang validator lain. Dengan SSF, hanya ada 0. Pengguna, dari individu hingga aplikasi dan bursa, mendapat manfaat dari jaminan cepat bahwa transaksi mereka tidak akan dibatalkan, dan jaringan mendapat manfaat dengan menutup seluruh kumpulan serangan.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Baca tentang single slot finality</ButtonLink>

## Perlindungan dari penyensoran {#defending-against-censorship}

Desentralisasi mencegah individu atau kelompok kecil [validator](/glossary/#validator) menjadi terlalu berpengaruh. Teknologi penaruhan baru dapat membantu memastikan validator Ethereum tetap se-desentralisasi mungkin sekaligus melindungi mereka dari kegagalan perangkat keras, perangkat lunak, dan jaringan. Ini termasuk perangkat lunak yang berbagi tanggung jawab validator di beberapa [simpul](/glossary/#node). Ini dikenal sebagai **teknologi validator terdistribusi (DVT)**. [Pool penaruhan](/glossary/#staking-pool) diberi insentif untuk menggunakan DVT karena memungkinkan beberapa komputer untuk berpartisipasi secara kolektif dalam validasi, menambahkan redundansi dan toleransi kesalahan. Ini juga membagi kunci validator di beberapa sistem, daripada memiliki operator tunggal yang menjalankan beberapa validator. Ini mempersulit operator yang tidak jujur untuk mengoordinasikan serangan terhadap Ethereum. Secara keseluruhan, idenya adalah untuk mendapatkan manfaat keamanan dengan menjalankan validator sebagai _komunitas_, bukan sebagai individu.

<ButtonLink variant="outline-color" href="/staking/dvt/">Baca tentang teknologi validator terdistribusi</ButtonLink>

Penerapan **pemisahan pengusul-pembangun (PBS)** akan secara drastis meningkatkan pertahanan bawaan Ethereum terhadap penyensoran. PBS memungkinkan satu validator untuk membuat blok dan yang lain untuk menyiarkannya ke seluruh jaringan Ethereum. Hal ini memastikan bahwa keuntungan dari algoritma pembangunan blok profesional yang memaksimalkan laba dibagi secara lebih adil ke seluruh jaringan, **mencegah taruhan terkonsentrasi** dengan penaruh institusional berkinerja terbaik dari waktu ke waktu. Pengusul blok dapat memilih blok paling menguntungkan yang ditawarkan oleh pasar pembangun blok. Untuk melakukan penyensoran, pengusul blok sering kali harus memilih blok yang kurang menguntungkan, yang akan menjadi **tidak rasional secara ekonomi dan juga jelas bagi validator lain** di jaringan.

Ada tambahan potensial untuk PBS, seperti transaksi terenkripsi dan daftar inklusi, yang dapat meningkatkan resistensi sensor Ethereum. Ini membuat pembangun blok dan pengusul tidak dapat melihat transaksi sebenarnya yang termasuk dalam blok mereka.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Baca tentang pemisahan pengusul-pembangun</ButtonLink>

## Melindungi validator {#protecting-validators}

Ada kemungkinan bahwa penyerang yang canggih dapat mengidentifikasi validator yang akan datang dan mengirim spam untuk mencegah mereka mengusulkan blok; ini dikenal sebagai serangan **penolakan layanan (DoS)**. Penerapan [**pemilihan pemimpin rahasia (SLE)**](/roadmap/secret-leader-election) akan melindungi dari jenis serangan ini dengan mencegah pengusul blok agar tidak dapat diketahui sebelumnya. Ini bekerja dengan terus mengacak sekumpulan komitmen kriptografi yang mewakili proposer blok kandidat dan menggunakan urutan mereka untuk menentukan validator mana yang dipilih dengan cara yang hanya diketahui oleh validator itu sendiri sebelumnya.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Baca tentang pemilihan pemimpin rahasia</ButtonLink>

## Kemajuan saat ini {#current-progress}

**Peningkatan keamanan di peta jalan berada dalam tahap penelitian lanjutan**, tetapi tidak diharapkan akan diimplementasikan untuk beberapa waktu. Langkah selanjutnya untuk view-merge, PBS, SSF, dan SLE adalah memfinalisasi spesifikasi dan mulai membangun prototipe.
