---
title: Penaruhan dari pengumpulan
description: Pelajari pool penaruhan
lang: id
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-pool.png
alt: Leslie si Badak sedang berenang di kolam.
sidebarDepth: 2
summaryPoints:
  - Pasang taruhan dan dapatkan hadiah sejumlah berapa pun ETH dengan bergabung dalam tim dengan yang lain
  - Lewati bagian yang susah dan percayakan kegiatan validator pada pihak ketiga
  - Pegang penaruhan token di dompet Anda sendiri
---

## Apa itu pool penaruhan? {#what-are-staking-pools}

Pool penaruhan adalah pendekatan kolaboratif yang memungkinkan banyak orang dengan jumlah ETH yang lebih kecil untuk mendapatkan 32 ETH yang diperlukan untuk mengaktifkan satu set kunci validator. Fungsionalitas pooling tidak didukung secara asli dalam protokol, sehingga solusi-solusi dibangun secara terpisah untuk mengatasi kebutuhan ini.

Beberapa pool beroperasi menggunakan kontrak pintar, di mana dana dapat disimpan ke dalam kontrak, yang mengelola dan melacak taruhan Anda dengan aman, dan mengeluarkan token yang mewakili nilai tersebut. Beberapa pool lain mungkin tidak melibatkan kontrak pintar dan dikelola di luar rantai.

## Mengapa melakukan taruhan dengan pool? Mengapa melakukan penaruhan dengan pool? {#why-stake-with-a-pool}

Selain manfaat yang kami jelaskan dalam [pengantar tentang penaruhan](/staking/), melakukan penaruhan dengan pool memiliki sejumlah manfaat tersendiri.

<CardGrid>
  <Card title="Hambatan masuk rendah" emoji="🐟" description="Bukan seorang whale? Tidak masalah. Kebanyakan pool staking memungkinkan Anda melakukan staking ETH dengan jumlah berapa pun dengan bergabung bersama staker lain, tidak seperti staking solo yang membutuhkan 32 ETH." />
  <Card title="Mulai staking hari ini" emoji=":stopwatch:" description="Staking dengan pool semudah melakukan swap token. Tidak perlu khawatir tentang penyiapan perangkat keras dan pemeliharaan node. Pool memungkinkan Anda mendepositkan ETH yang memungkinkan operator node menjalankan validator. Hadiah kemudian didistribusikan ke kontributor dikurangi biaya untuk operasi node." />
  <Card title="Token staking" emoji=":droplet:" description="Banyak pool staking menyediakan token yang mewakili klaim atas ETH yang Anda staking dan imbalan yang dihasilkannya. Ini memungkinkan Anda untuk memanfaatkan ETH yang Anda staking, misalnya, sebagai jaminan dalam aplikasi DeFi." />
</CardGrid>

<StakingComparison page="pools" />

## Hal yang perlu dipertimbangkan {#what-to-consider}

Pooled atau penaruhan yang didelegasikan tidak didukung oleh protokol Ethereum, tetapi mengingat permintaan pengguna untuk mempertaruhkan kurang dari 32 ETH, semakin banyak solusi yang dibuat untuk melayani permintaan ini.

Setiap pool dan pearngkat atau kontrak pintar yang mereka gunakan telah dibangun oleh tim yang berbeda, dan masing-masing memiliki keuntungan dan risiko. Pool memungkinkan pengguna menukarkan ETH mereka dengan token yang mewakili ETH yang telah ditaruhkan. Token ini berguna karena memungkinkan pengguna untuk menukar sejumlah ETH dengan jumlah yang setara dengan token hasil yang menghasilkan imbal hasil dari imbalan penaruhan yang diterapkan pada ETH yang ditaruhkan (dan sebaliknya) pada bursa terpusat meskipun ETH yang sebenarnya tetap ditaruhkan pada lapisan konsensus. Ini berarti pertukaran bolak-balik dari produk ETH yang ditaruhkan yang menghasilkan hasil dan "ETH mentah" cepat, mudah, dan tidak hanya tersedia dalam kelipatan 32 ETH.

Namun, token ETH yang dipertaruhkan ini cenderung menciptakan perilaku seperti kartel di mana sejumlah besar ETH yang dipertaruhkan berakhir di bawah kendali beberapa organisasi terpusat daripada tersebar di banyak individu independen. Hal ini menciptakan kondisi untuk sensor atau ekstraksi nilai. Standar emas untuk penaruhan seharusnya selalu individu menjalankan validator di perangkat keras mereka sendiri jika memungkinkan.

[Selengkapnya tentang risiko penaruhan token](https://notes.ethereum.org/@djrtwo/risks-of-lsd).

Indikator atribut digunakan di bawah ini untuk menandakan kekuatan atau kelemahan yang mencolok yang mungkin dimiliki oleh pool penaruhan yang terdaftar. Gunakan bagian ini sebagai referensi untuk bagaimana kami mendefinisikan atribut ini ketika Anda memilih pool untuk bergabung.

<StakingConsiderations page="pools" />

## Jelajahi pool penaruhan {#explore-staking-pools}

Terdapat berbagai pilihan yang tersedia untuk membantu Anda dengan pengaturan Anda. Gunakan petunjuk di atas untuk membantu Anda memandu melalui perangkat di bawah ini.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Harap perhatikan pentingnya memilih layanan yang menganggap serius [keragaman klien](/developers/docs/nodes-and-clients/client-diversity/), karena ini meningkatkan keamanan jaringan, dan membatasi risiko Anda. Layanan-layanan yang memiliki bukti pembatasan penggunaan mayoritas klien ditandai dengan <em style={{ textTransform: "uppercase" }}>"diversitas klien eksekusi"</em> dan <em style={{ textTransform: "uppercase" }}>"diversitas klien konsensus."</em>

Punya saran untuk alat penaruhan yang kami lewatkan? Lihat [kebijakan daftar produk](/contributing/adding-staking-products/) kami untuk melihat apakah cocok, dan untuk mengirimkannya untuk ditinjau.

## Pertanyaan yang sering diajukan {#faq}

<ExpandableCard title="Bagaimana cara saya mendapatkan hadiah?">
Biasanya token penaruhan ERC-20 dikeluarkan untuk para penaruh yang mewakili nilai ETH yang mereka pertaruhkan ditambah hadiah. Perlu diingat bahwa berbagai pool akan mendistribusikan imbalan penaruhan kepada pengguna mereka melalui metode yang sedikit berbeda, tetapi tema umum ini tetap sama.
</ExpandableCard>

<ExpandableCard title="Kapan saya bisa menarik stake saya?">
Sekarang juga! Peningkatan jaringan Shanghai/Capella terjadi pada April 2023 dan memperkenalkan penarikan penaruhan. Akun validator yang mendukung pool penaruhan sekarang memiliki kemampuan untuk keluar dan menarik ETH ke alamat penarikan yang ditentukan. Ini memungkinkan Anda untuk menebus bagian Anda dari taruhan menjadi ETH yang mendasarinya. Periksa dengan penyedia Anda untuk melihat bagaimana mereka mendukung fungsionalitas ini.

Sebagai alternatif, pool yang menggunakan token penaruhan ERC-20 memungkinkan pengguna untuk memperdagangkan token ini di pasar terbuka, sehingga Anda dapat menjual posisi penaruhan Anda, secara efektif "menarik diri" tanpa benar-benar menghapus ETH dari kontrak penaruhan.

<ButtonLink href="/staking/withdrawals/">Selengkapnya tentang penarikan penaruhan</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Apakah ini berbeda dari staking di bursa saya?">
Terdapat banyak kesamaan antara pilihan penaruhan terkumpul ini dengan bursa terpusat, seperti kemampuan untuk melakukan penaruhan dengan jumlah ETH yang kecil dan menggabungkannya bersama untuk mengaktifkan validator.

Tidak seperti bursa terpusat, banyak opsi penaruhan gabungan lainnya menggunakan kontrak pintar dan/atau token penaruhan, yang biasanya berupa token ERC-20 yang dapat disimpan di dompet Anda sendiri, dan dibeli atau dijual seperti token lainnya. Hal ini memberikan lapisan kedaulatan dan keamanan dengan memberikan Anda kendali atas token Anda, tetapi tetap tidak memberikan Anda kendali langsung atas klien validator yang membuktikan tanda tangan atas nama Anda di latar belakang.

Beberapa pilihan pooling lebih terdesentralisasi daripada yang lain dalam hal simpul yang mendukungnya. Untuk mendorong kesehatan dan desentralisasi jaringan, para penaruh selalu didorong untuk memilih layanan pooling yang memungkinkan set kelompok simpul operator yang terdesentralisasi dan tanpa izin.
</ExpandableCard>

## Bacaan lebih lanjut {#further-reading}

- [Direktori Penaruhan Ethereum](https://www.staking.directory/) - _Eridian dan Spacesider_
- [Penaruhan dengan Rocket Pool - Tinjauan Penaruhan](https://docs.rocketpool.net/guides/staking/overview.html) - _Dokumentasi RocketPool_
- [Penaruhan Ethereum dengan Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Dokumentasi bantuan Lido_
