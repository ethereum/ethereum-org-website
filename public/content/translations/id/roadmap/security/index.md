---
title: Ethereum yang lebih aman
description: Ethereum adalah platform kontrak pintar paling aman dan terdesentralisasi yang ada saat ini. Namun, masih ada peningkatan yang dapat dilakukan agar Ethereum tetap tangguh terhadap segala tingkat serangan jauh di masa depan.
lang: id
image: /images/roadmap/roadmap-security.png
alt: Peta jalan Ethereum
template: roadmap
---

**Ethereum sudah menjadi platform [kontrak pintar](/glossary/#smart-contract) yang sangat aman** dan terdesentralisasi. Namun, masih ada peningkatan yang dapat dilakukan agar Ethereum tetap tangguh terhadap segala jenis serangan jauh di masa depan. Ini termasuk perubahan halus pada cara [klien Ethereum](/glossary/#consensus-client) menangani [blok](/glossary/#block) yang bersaing, serta meningkatkan kecepatan jaringan dalam menganggap blok telah ["difinalisasi"](/developers/docs/consensus-mechanisms/pos/#finality) (artinya blok tersebut tidak dapat diubah tanpa kerugian ekonomi yang ekstrem bagi penyerang).

Ada juga peningkatan yang membuat penyensoran transaksi menjadi jauh lebih sulit dengan membuat pengusul blok buta terhadap konten sebenarnya dari blok mereka, dan cara baru untuk mengidentifikasi ketika klien melakukan penyensoran. Bersama-sama, peningkatan ini akan memperbarui protokol [Bukti Kepemilikan (PoS)](/glossary/#pos) sehingga pengguna - dari individu hingga perusahaan - memiliki kepercayaan instan pada aplikasi, data, dan aset mereka di Ethereum.

## Penarikan staking {#staking-withdrawals}

Pembaruan dari [Bukti Kerja (PoW)](/glossary/#pow) ke Bukti Kepemilikan (PoS) dimulai dengan para perintis Ethereum yang melakukan "staking" ETH mereka di dalam kontrak deposit. ETH tersebut digunakan untuk melindungi jaringan. Ada pembaruan kedua pada 12 April 2023 untuk memungkinkan validator menarik ETH yang di-stake. Sejak saat itu, validator dapat dengan bebas melakukan staking atau menarik ETH.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Baca tentang penarikan</ButtonLink>

## Bertahan dari serangan {#defending-against-attacks}

Ada peningkatan yang dapat dilakukan pada protokol Bukti Kepemilikan (PoS) Ethereum. Salah satunya dikenal sebagai [view-merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) - algoritma pilihan [percabangan](/glossary/#fork) yang lebih aman yang membuat jenis serangan canggih tertentu menjadi lebih sulit.

Mengurangi waktu yang dibutuhkan Ethereum untuk [memfinalisasi](/glossary/#finality) blok akan memberikan pengalaman pengguna yang lebih baik dan mencegah serangan "reorganisasi" canggih di mana penyerang mencoba mengacak ulang blok yang sangat baru untuk mengambil keuntungan atau menyensor transaksi tertentu. [**Finalitas slot tunggal (SSF)**](/roadmap/single-slot-finality/) adalah **cara untuk meminimalkan penundaan finalisasi**. Saat ini ada blok senilai 15 menit yang secara teoretis dapat digunakan penyerang untuk meyakinkan validator lain agar melakukan konfigurasi ulang. Dengan SSF, waktunya menjadi 0. Pengguna, dari individu hingga aplikasi dan bursa, mendapat manfaat dari jaminan cepat bahwa transaksi mereka tidak akan dikembalikan, dan jaringan mendapat manfaat dengan menutup seluruh kelas serangan.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Baca tentang finalitas slot tunggal</ButtonLink>

## Bertahan dari penyensoran {#defending-against-censorship}

Desentralisasi mencegah individu atau kelompok kecil [validator](/glossary/#validator) menjadi terlalu berpengaruh. Teknologi staking baru dapat membantu memastikan validator Ethereum tetap terdesentralisasi semaksimal mungkin sekaligus mempertahankan mereka dari kegagalan perangkat keras, perangkat lunak, dan jaringan. Ini termasuk perangkat lunak yang membagi tanggung jawab validator di beberapa [node](/glossary/#node). Ini dikenal sebagai **teknologi validator terdistribusi (DVT)**. [Kolam staking](/glossary/#staking-pool) diberi insentif untuk menggunakan DVT karena memungkinkan beberapa komputer untuk berpartisipasi secara kolektif dalam validasi, menambahkan redundansi dan toleransi kesalahan. Ini juga membagi kunci validator di beberapa sistem, daripada memiliki operator tunggal yang menjalankan beberapa validator. Ini mempersulit operator yang tidak jujur untuk mengoordinasikan serangan di Ethereum. Secara keseluruhan, idenya adalah untuk mendapatkan manfaat keamanan dengan menjalankan validator sebagai _komunitas_ daripada sebagai individu.

<ButtonLink variant="outline-color" href="/staking/dvt/">Baca tentang teknologi validator terdistribusi</ButtonLink>

Menerapkan **pemisahan pengusul-pembangun (PBS)** akan secara drastis meningkatkan pertahanan bawaan Ethereum terhadap penyensoran. PBS memungkinkan satu validator untuk membuat blok dan validator lain untuk menyiarkannya ke seluruh jaringan Ethereum. Ini memastikan bahwa keuntungan dari algoritma pembangunan blok profesional yang memaksimalkan laba dibagikan secara lebih adil di seluruh jaringan, **mencegah stake terkonsentrasi** pada staker institusional dengan kinerja terbaik dari waktu ke waktu. Pengusul blok dapat memilih blok paling menguntungkan yang ditawarkan kepada mereka oleh pasar pembangun blok. Untuk menyensor, pengusul blok sering kali harus memilih blok yang kurang menguntungkan, yang akan menjadi **tidak rasional secara ekonomi dan juga terlihat jelas oleh validator lain** di jaringan.

Ada potensi tambahan untuk PBS, seperti transaksi terenkripsi dan daftar inklusi, yang dapat lebih meningkatkan ketahanan penyensoran Ethereum. Ini membuat pembangun blok dan pengusul buta terhadap transaksi sebenarnya yang disertakan dalam blok mereka.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Baca tentang pemisahan pengusul-pembangun</ButtonLink>

## Melindungi validator {#protecting-validators}

Ada kemungkinan bahwa penyerang canggih dapat mengidentifikasi validator yang akan datang dan mengirim spam kepada mereka untuk mencegah mereka mengusulkan blok; ini dikenal sebagai serangan **penolakan layanan (DoS)**. Menerapkan [**pemilihan pemimpin rahasia (SLE)**](/roadmap/secret-leader-election) akan melindungi dari jenis serangan ini dengan mencegah pengusul blok diketahui sebelumnya. Ini bekerja dengan terus mengacak serangkaian komitmen kriptografi yang mewakili kandidat pengusul blok dan menggunakan urutan mereka untuk menentukan validator mana yang dipilih sedemikian rupa sehingga hanya validator itu sendiri yang mengetahui urutan mereka sebelumnya.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Baca tentang pemilihan pemimpin rahasia</ButtonLink>

## Kemajuan saat ini {#current-progress}

**Peningkatan keamanan pada peta jalan berada dalam tahap penelitian lanjutan**, tetapi tidak diharapkan untuk diimplementasikan dalam waktu dekat. Langkah selanjutnya untuk view-merge, PBS, SSF, dan SLE adalah memfinalisasi spesifikasi dan mulai membangun prototipe.