---
title: Ethereum yang lebih selamat
description: Ethereum ialah platform kontrak pintar terdesentralisasi yang paling selamat. Namun, masih banyak penambahbaikan yang boleh dilakukan supaya Ethereum kekal tahan lasak terhadap sebarang tahap serangan pada masa hadapan.
lang: ms
image: /images/roadmap/roadmap-security.png
alt: "Peta hala tuju Ethereum"
template: roadmap
---

**Ethereum sudah pun merupakan** platform [kontrak pintar](/glossary/#smart-contract) terdesentralisasi yang paling selamat. Namun, masih banyak penambahbaikan yang boleh dilakukan supaya Ethereum kekal tahan lasak terhadap semua jenis serangan pada masa hadapan. Ini termasuklah perubahan kecil dalam cara [klien Ethereum](/glossary/#consensus-client) mengendalikan [blok](/glossary/#block) yang bersaing, serta meningkatkan kelajuan rangkaian untuk blok ["dimuktamadkan"](/developers/docs/consensus-mechanisms/pos/#finality) (ini bermaksud blok tersebut tidak boleh diubah tanpa kerugian besar yang dialami oleh penyerang).

Terdapat juga penambahbaikan seperti menyukarkan usaha menapis transaksi dengan menjadikan pencadang blok tidak mengetahui kandungan sebenar blok mereka, serta kaedah baharu untuk mengenal pasti apabila sesuatu klien melakukan penapisan. Penambahbaikan ini akan menaik taraf protokol [bukti penaruhan](/glossary/#pos) agar pengguna - daripada individu hinggalah syarikat - berasa yakin dengan aplikasi, data dan aset mereka di Ethereum.

## Pertaruhan keluaran {#staking-withdrawals}

Naik taraf daripada [bukti kerja](/glossary/#pow) kepada bukti penaruhan bermula apabila perintis Ethereum memulakan "pertaruhan" ETH dalam kontrak deposit. ETH tersebut digunakan untuk melindungi rangkaian. Kemas kini kedua pada 12 April 2023 membolehkan pengeluaran ETH yang telah dipertaruhkan. Sejak kemas kini tersebut, para pengesah bebas untuk mempertaruhkan atau mengeluarkan ETH mereka.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Baca tentang pengeluaran</ButtonLink>

## Mempertahankan rangkaian daripada serangan {#defending-against-attacks}

Ada beberapa penambahbaikan yang boleh dilakukan kepada protokol bukti penaruhan Ethereum. Salah satunya dikenali sebagai [view-merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) - satu algoritma pemilihan [fork](/glossary/#fork)-yang lebih selamat dan menyukarkan jenis serangan canggih tertentu.

Dengan mengurangkan masa yang diambil untuk [memuktamadkan](/glossary/#finality) blok akan menambah baik pengalaman pengguna dan membantu untuk mencegah serangan "reorg", iaitu penyerang cuba menyusun semula blok-blok terkini untuk meraih keuntungan ataupun menapis transaksi. [**Single slot finality (SSF)**](/roadmap/single-slot-finality/) ialah **salah satu cara untuk mengurangkan kelewatan pemuktamadan**. Buat masa ini, terdapat blok selama 15 minit yang secara teorinya boleh disusun semula oleh penyerang jika mereka berjaya meyakinkan pengesah lain. Dengan SSF, jumlahnya ialah 0. Pengguna, sama ada individu, aplikasi dan bursa, mendapat manfaat dengan jaminan transaksi mereka tidak akan dibatalkan, dan rangkaian mendapat manfaat dengan menghalang keseluruhan jenis serangan tertentu.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Baca tentang single slot finality</ButtonLink>

## Melindungi daripada penapisan {#defending-against-censorship}

Desentralisasi menghalang individu atau kumpulan kecil [pengesah](/glossary/#validator) daripada menjadi terlalu berpengaruh. Teknologi pertaruhan baharu boleh membantu untuk memastikan pengesah Ethereum kekal sedesentralisasi mungkin sambil melindungi daripada kegagalan perkakasan, perisian dan rangkaian. Ini termasuklah perisian yang berkongsi tanggungjawab pengesah merentasi pelbagai [nod](/glossary/#node). Ini dikenali sebagai **teknologi pengesah teragih (DVT)**. [Kumpulan pertaruhan](/glossary/#staking-pool) digalakkan untuk menggunakan DVT kerana ia membolehkan komputer turut serta dalam proses pengesahan secara kolektif, sekali gus memberikan kelebihan dari segi kelewahan dan toleransi ralat. Ia juga memisahkan kunci pengesah merentasi beberapa sistem, berbanding dengan hanya bergantung kepada satu pengendali yang mengendalikan pelbagai pengesah. Ini menjadikannnya lebih sukar bagi pengendali yang tidak jujur untuk menyelaraskan serangan terhadap Ethereum. Secara keseluruhannya, idea ini bertujuan untuk memperkasa keselamatan dengan menjalankan pengesah sebagai _komuniti_ dan bukannya secara individu.

<ButtonLink variant="outline-color" href="/staking/dvt/">Baca tentang teknologi pengesah teragih</ButtonLink>

Pelaksanaan **pemisahan pencadang-pembina (PBS)** akan meningkatkan pertahanan terbina dalam Ethereum terhadap penapisan secara drastik. PBS membolehkan satu pengesah mencipta blok dan pengesah lain pula menyiarkannya ke seluruh rangkaian Ethereum. Ini memastikan keuntungan daripada algoritma pembinaan blok profesional yang memaksimumkan keuntungan dikongsi secara adil merentasi rangkaian, **mengelakkan pertaruhan daripada pemusatan pegangan** kepada pihak institusi yang berprestasi tinggi dari semasa ke semasa. Pencadang blok boleh memilih blok yang paling menguntungkan daripada pasaran pembina blok yang menawarkannya. Untuk membuat penapisan, pencadang blok selalunya perlu memilih blok yang kurang menguntungkan, yang **bukan sahaja rasional dari segi ekonomi tetapi juga jelas kepada pengesah lain** dalam rangkaian.

Terdapat tambahan berpotensi kepada PBS, seperti transaksi yang disulitkan dan senarai kemasukan, yang boleh meningkatkan lagi daya tahan Ethereum terhadap penapisan. Ini menyebabkan pembina blok dan pencadang blok tidak mengetahui transaksi sebenar yang dimasukkan ke dalam blok mereka.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Baca tentang pemisahan pencadang-pembina</ButtonLink>

## Melindungi pengesah {#protecting-validators}

Tidak mustahil bagi penyerang yang berkemahiran tinggi untuk mengenal pasti pengesah yang akan datang dan menghantar spam kepada mereka untuk menghalang mereka daripada mencadangkan blok; ini dikenali sebagai serangan **denial of service (DoS)**. Pelaksanaan [**secret leader election (SLE)**](/roadmap/secret-leader-election) akan melindungi daripada serangan ini dengan menghalang pencadang blok tidak dapat diketahui terlebih dahulu. Ini berfungsi dengan sentiasa menyusun semula satu set komitmen kriptografi yang mewakili calon pencadang blok dan menggunakan susunan tersebut untuk menentukan pengesah yang dipilih, dengan cara yang cuma diketahui oleh pengesah itu sendiri terlebih dahulu.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Baca tentang secret leader election</ButtonLink>

## Kemajuan semasa {#current-progress}

**Penambahbaikan keselamatan dalam pelan hala tuju ini sedang berada di peringkat penyelidikan yang memberangsangkan**, akan tetapi ia tidak akan dilaksanakan dalam masa terdekat. Langkah seterusnya bagi view-merge, PBS, SSF dan SLE adalah untuk memuktamadkan spesifikasi dan mula membina prototaip.
