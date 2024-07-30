---
title: Ethereum yang lebih aman
description: Ethereum merupakan platform kontrak pintar yang paling aman dan terdesentralisasi yang pernah ada. Namun, masih diperlukan perbaikan yang dapat dilakukan agar Ethereum tetap tangguh terhadap segala tingkat serangan di masa depan.
lang: id
image: /images/roadmap/roadmap-security.png
alt: "Peta Perjalanan Ethereum"
template: roadmap
---

Ethereum merupakan platform kontrak pintar yang sudah sangat aman dan terdesentralisasi. Namun, masih diperlukan perbaikan yang dapat dilakukan agar Ethereum tetap tangguh terhadap segala jenis serangan di masa depan. Ini termasuk perubahan pada cara klien Ethereum menangani blok yang bersaing, serta meningkatkan kecepatan jaringan dengan menganggap blok menjadi ["final"](/developers/docs/consensus-mechanisms/pos/#finality) (yang berarti tidak dapat diubah tanpa kerugian ekonomi yang ekstrem bagi penyerang).

Ada juga perbaikan yang membuat sensor transaksi menjadi lebih sulit dengan membuat pengusul blok tidak dapat melihat isi sebenarnya dari blok mereka, dan cara baru untuk mengidentifikasi kapan klien melakukan sensor. Bersama-sama, perbaikan ini akan meningkatkan protokol bukti taruhan sehingga pengguna dari individu hingga korporasi memiliki kepercayaan instan pada aplikasi, data, dan aset mereka di Ethereum.

## Penarikan penaruhan {#staking-withdrawals}

Peningkatan dari bukti kerja ke bukti taruhan dimulai dengan para perintis Ethereum "menaruhkan" ETH mereka dalam kontrak deposit. ETH tersebut digunakan untuk melindungi jaringan. Namun, ETH tersebut belum dapat dibuka kunci dan dikembalikan kepada pengguna. Memungkinkan ETH untuk ditarik adalah bagian penting dari peningkatan bukti taruhan. Selain penarikan menjadi komponen penting dari protokol bukti taruhan yang berfungsi penuh, memungkinkan penarikan juga baik untuk keamanan Ethereum karena memungkinkan para penaruh untuk menggunakan hadiah ETH mereka untuk tujuan non-penaruhan lainnya. Ini berarti pengguna yang menginginkan likuiditas tidak harus bergantung pada derivatif penaruhan likuid (LSD) yang dapat menjadi kekuatan sentralisasi di Ethereum. Peningkatan ini dijadwalkan selesai pada 12 April 2023.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Baca tentang penarikan</ButtonLink>

## Bertahan dari serangan {#defending-against-attacks}

Bahkan setelah penarikan, masih ada perbaikan yang perlu dilakukan untuk protokol [bukti taruhan](/developers/docs/consensus-mechanisms/pos/) Ethereum. Salah satunya adalah yang dikenal sebagai [lihat-gabungkan](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) - sebuah algoritma pilihan garpu yang lebih aman dalam membuat beberapa jenis serangan yang canggih lebih sulit.

Mengurangi waktu yang dibutuhkan Ethereum untuk menyelesaikan blok akan memberikan pengalaman pengguna yang lebih baik dan mencegah serangan "reorg" yang canggih di mana penyerang mencoba mengacak blok yang sangat baru untuk mendapatkan keuntungan atau menyensor transaksi tertentu. [**Finalitas ruang tunggal (SSF)**](/roadmap/single-slot-finality/) adalah cara untuk meminimalisir keterlambatan finalisasi. Saat ini ada 15 menit blok yang secara teoritis dapat digunakan oleh penyerang untuk mengkonfigurasi ulang validator lain. Dengan SSF, hanya ada 0. Pengguna, dari individu hingga aplikasi dan bursa, mendapat manfaat dari jaminan cepat bahwa transaksi mereka tidak akan dibatalkan, dan jaringan mendapat manfaat dengan menutup seluruh kumpulan serangan.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Baca tentang finalitas ruang tunggal</ButtonLink>

## Bertahan melawan sensor {#defending-against-censorship}

Desentralisasi mencegah individu atau kelompok kecil validator menjadi terlalu berpengaruh. Teknologi penaruhan baru dapat membantu memastikan validator Ethereum tetap se-desentralisasi mungkin sekaligus melindungi mereka dari kegagalan perangkat keras, perangkat lunak, dan jaringan. Ini termasuk perangkat lunak yang membagi tanggung jawab validator di beberapa simpul. Ini dikenal sebagai **teknologi validator terdistribusi (DVT)**. Pool penaruhan mendapat insentif untuk menggunakan DVT karena memungkinkan beberapa komputer untuk berpartisipasi secara kolektif dalam validasi, menambah redundansi dan toleransi kesalahan. Ini juga membagi kunci validator di beberapa sistem, daripada memiliki operator tunggal yang menjalankan beberapa validator. Ini mempersulit operator yang tidak jujur untuk mengoordinasikan serangan terhadap Ethereum. Secara keseluruhan, ide ini adalah untuk mendapatkan manfaat keamanan dengan menjalankan validator sebagai _komunitas_ daripada sebagai individu.

<ButtonLink variant="outline-color" href="/staking/dvt/">Baca tentang teknologi validator terdistribusi</ButtonLink>

Mengimplementasikan **pemisahan pengusul-pembangun (PBS)** akan sangat meningkatkan pertahanan bawaan Ethereum terhadap sensor. PBS memungkinkan satu validator untuk membuat blok dan yang lain untuk menyiarkannya ke seluruh jaringan Ethereum. Ini memastikan bahwa keuntungan dari algoritma pembangun blok profesional yang memaksimalkan keuntungan dibagi lebih adil di seluruh jaringan, **mencegah taruhan berkonsentrasi** dengan penaruh institusional berkinerja terbaik dari waktu ke waktu. Pengusul blok dapat memilih blok paling menguntungkan yang ditawarkan oleh pasar pembangun blok. Untuk menyensor, pengusul blok harus sering memilih blok yang kurang menguntungkan, yang **tidak akan rasional secara ekonomi dan juga jelas bagi validator lain** di jaringan.

Ada tambahan potensial untuk PBS, seperti transaksi terenkripsi dan daftar inklusi, yang dapat meningkatkan resistensi sensor Ethereum. Ini membuat pembangun blok dan pengusul tidak dapat melihat transaksi sebenarnya yang termasuk dalam blok mereka.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Baca tentang pemisahan pengusul-pembangun</ButtonLink>

## Melindungi validator {#protecting-validators}

Ada kemungkinan bahwa penyerang canggih dapat mengidentifikasi validator yang akan datang dan menyerang mereka untuk mencegah mereka mengusulkan blok; ini dikenal sebagai serangan **penolakan layanan (DoS)**. Mengimplementasikan [**pemilihan pemimpin rahasia (SLE)**](/roadmap/secret-leader-election) akan melindungi dari jenis serangan ini dengan mencegah pengusul blok diketahui sebelumnya. Ini bekerja dengan terus mengacak sekumpulan komitmen kriptografi yang mewakili proposer blok kandidat dan menggunakan urutan mereka untuk menentukan validator mana yang dipilih dengan cara yang hanya diketahui oleh validator itu sendiri sebelumnya.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Baca tentang pemilihan pemimpin rahasia</ButtonLink>

## Kemajuan saat ini {#current-progress}

Peningkatan keamanan di peta perjalanan berada di tahap penelitian lanjutan, tetapi tidak diharapkan akan diimplementasikan dalam waktu dekat. Langkah selanjutnya untuk view-merge, PBS, SSF, dan SLE adalah menyelesaikan spesifikasi dan mulai membangun prototipe.
