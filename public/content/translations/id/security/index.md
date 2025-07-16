---
title: Ethereum yang lebih aman
description: Ethereum merupakan platform kontrak pintar yang paling aman dan terdesentralisasi yang pernah ada. Namun, masih diperlukan perbaikan yang dapat dilakukan agar Ethereum tetap tangguh terhadap segala tingkat serangan di masa depan.
lang: id
image: /images/roadmap/roadmap-security.png
alt: "Peta Perjalanan Ethereum"
template: roadmap
---

**Ethereum sudah sangat aman**, platform [kontrak pintar](/glossary/#smart-contract) yang terdesentralisasi. Namun, masih diperlukan perbaikan yang dapat dilakukan agar Ethereum tetap tangguh terhadap segala jenis serangan di masa depan. Ini termasuk perubahan halus pada cara [klien Ethereum](/glossary/#consensus-client) menangani [blok](/glossary/#block) yang bersaing, serta meningkatkan kecepatan di mana jaringan menganggap blok sebagai ["finalized"](/developers/docs/consensus-mechanisms/pos/#finality) (artinya, blok tersebut tidak dapat diubah tanpa menimbulkan kerugian ekonomi yang ekstrem bagi penyerang).

Ada juga perbaikan yang membuat sensor transaksi menjadi lebih sulit dengan membuat pengusul blok tidak dapat melihat isi sebenarnya dari blok mereka, dan cara baru untuk mengidentifikasi kapan klien melakukan sensor. Secara bersama-sama, perbaikan ini akan meningkatkan protokol [bukti taruhan](/glossary/#pos) sehingga pengguna-dari individu hingga korporasi-dapat memiliki kepercayaan instan pada aplikasi, data, dan aset mereka di Ethereum.

## Penarikan penaruhan {#staking-withdrawals}

Pembaruan dari [proof-of-work](/glossary/#pow) ke proof-of-stake dimulai dengan para pelopor Ethereum “staking” ETH mereka dalam kontrak deposit. ETH tersebut digunakan untuk melindungi jaringan. Telah ada pembaruan kedua pada 12 April 2023 yang memungkinkan penarikan ETH yang dipertaruhkan. Sejak saat itu, validator dapat dengan bebas melakukan taruhan atau penarikan ETH.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Baca tentang penarikan</ButtonLink>

## Bertahan dari serangan {#defending-against-attacks}

Ada peningkatan yang dapat dilakukan pada protokol bukti taruhan Ethereum. Salah satunya dikenal sebagai [view-merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) - algoritma [garpu](/glossary/#fork)-pilihan yang lebih aman yang membuat beberapa jenis serangan canggih menjadi lebih sulit.

Mengurangi waktu yang diperlukan Ethereum untuk [finalisasi](/glossary/#finality) blok akan memberikan pengalaman pengguna yang lebih baik dan mencegah serangan "reorg" canggih di mana penyerang mencoba untuk mengatur ulang blok terbaru untuk mendapatkan keuntungan atau menyensor transaksi tertentu. [**Single slot finality (SSF)**](/roadmap/single-slot-finality/) adalah **cara untuk meminimalkan penundaan finalisasi**. Saat ini ada 15 menit blok yang secara teoritis dapat digunakan oleh penyerang untuk mengkonfigurasi ulang validator lain. Dengan SSF, hanya ada 0. Pengguna, dari individu hingga aplikasi dan bursa, mendapat manfaat dari jaminan cepat bahwa transaksi mereka tidak akan dibatalkan, dan jaringan mendapat manfaat dengan menutup seluruh kumpulan serangan.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Baca tentang finalitas ruang tunggal</ButtonLink>

## Bertahan melawan sensor {#defending-against-censorship}

Desentralisasi mencegah individu atau kelompok kecil [validator](/glossary/#validator) menjadi terlalu berpengaruh. Teknologi penaruhan baru dapat membantu memastikan validator Ethereum tetap se-desentralisasi mungkin sekaligus melindungi mereka dari kegagalan perangkat keras, perangkat lunak, dan jaringan. Ini termasuk perangkat lunak yang membagikan tanggung jawab validator di berbagai [simpul](/glossary/#node). Ini dikenal sebagai **teknologi validator terdistribusi (DVT)**. [Kolam staking](/glossary/#staking-pool) diberi insentif untuk menggunakan DVT karena memungkinkan beberapa komputer untuk secara kolektif berpartisipasi dalam validasi, menambah redundansi dan toleransi terhadap kesalahan. Ini juga membagi kunci validator di beberapa sistem, daripada memiliki operator tunggal yang menjalankan beberapa validator. Ini mempersulit operator yang tidak jujur untuk mengoordinasikan serangan terhadap Ethereum. Secara keseluruhan, ide ini adalah untuk mendapatkan manfaat keamanan dengan menjalankan validator sebagai _komunitas_ daripada sebagai individu.

<ButtonLink variant="outline-color" href="/staking/dvt/">Baca tentang teknologi validator terdistribusi</ButtonLink>

Mengimplementasikan **pemisahan pengusul-pembangun (PBS)** akan sangat meningkatkan pertahanan bawaan Ethereum terhadap sensor. PBS memungkinkan satu validator untuk membuat blok dan yang lain untuk menyiarkannya ke seluruh jaringan Ethereum. Ini memastikan bahwa keuntungan dari algoritma pembangun blok profesional yang memaksimalkan keuntungan dibagi lebih adil di seluruh jaringan, **mencegah taruhan berkonsentrasi** dengan penaruh institusional berkinerja terbaik dari waktu ke waktu. Pengusul blok dapat memilih blok paling menguntungkan yang ditawarkan oleh pasar pembangun blok. Untuk menyensor, pengusul blok harus sering memilih blok yang kurang menguntungkan, yang **tidak akan rasional secara ekonomi dan juga jelas bagi validator lain** di jaringan.

Ada tambahan potensial untuk PBS, seperti transaksi terenkripsi dan daftar inklusi, yang dapat meningkatkan resistensi sensor Ethereum. Ini membuat pembangun blok dan pengusul tidak dapat melihat transaksi sebenarnya yang termasuk dalam blok mereka.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Baca tentang pemisahan pengusul-pembangun</ButtonLink>

## Melindungi validator {#protecting-validators}

Ada kemungkinan bahwa penyerang canggih dapat mengidentifikasi validator yang akan datang dan menyerang mereka untuk mencegah mereka mengusulkan blok; ini dikenal sebagai serangan **penolakan layanan (DoS)**. Mengimplementasikan [**pemilihan pemimpin rahasia (SLE)**](/roadmap/secret-leader-election) akan melindungi dari jenis serangan ini dengan mencegah pengusul blok diketahui sebelumnya. Ini bekerja dengan terus mengacak sekumpulan komitmen kriptografi yang mewakili proposer blok kandidat dan menggunakan urutan mereka untuk menentukan validator mana yang dipilih dengan cara yang hanya diketahui oleh validator itu sendiri sebelumnya.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Baca tentang pemilihan pemimpin rahasia</ButtonLink>

## Kemajuan saat ini {#current-progress}

**Peningkatan keamanan di peta perjalanan sudah berada pada tahap penelitian lanjutan**, tetapi tidak diharapkan akan diimplementasikan dalam waktu dekat. Langkah selanjutnya untuk view-merge, PBS, SSF, dan SLE adalah menyelesaikan spesifikasi dan mulai membangun prototipe.
