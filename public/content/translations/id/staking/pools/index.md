---
title: Staking gabungan
description: Pelajari tentang pool staking
lang: id
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-pool.png
alt: Badak Leslie berenang di kolam.
sidebarDepth: 2
summaryPoints:
  - Lakukan stake dan dapatkan hadiah dengan jumlah ETH berapa pun dengan bergabung bersama orang lain
  - Lewati bagian yang sulit dan percayakan operasi validator kepada pihak ketiga
  - Simpan token staking di dompet Anda sendiri
---

## Apa itu pool staking? {#what-are-staking-pools}

Pool staking adalah pendekatan kolaboratif untuk memungkinkan banyak orang dengan jumlah ETH yang lebih kecil untuk mendapatkan 32 ETH yang diperlukan untuk mengaktifkan sekumpulan kunci validator. Fungsionalitas penggabungan tidak didukung secara bawaan di dalam protokol, sehingga solusi dibangun secara terpisah untuk mengatasi kebutuhan ini.

Beberapa pool beroperasi menggunakan smart contract, di mana dana dapat disetorkan ke kontrak, yang mengelola dan melacak stake Anda tanpa perlu kepercayaan (trustless), dan menerbitkan token yang mewakili nilai ini untuk Anda. Pool lain mungkin tidak melibatkan smart contract dan sebaliknya dimediasi secara offchain.

## Mengapa melakukan stake dengan pool? {#why-stake-with-a-pool}

Selain manfaat yang kami uraikan dalam [pengantar staking](/staking/) kami, melakukan stake dengan pool memberikan sejumlah manfaat yang berbeda.

<Grid>
  <Card title="Hambatan masuk yang rendah" emoji="🐟" description="Bukan whale? Tidak masalah. Sebagian besar pool staking memungkinkan Anda melakukan stake ETH dalam jumlah berapa pun dengan bergabung bersama staker lain, tidak seperti staking solo yang membutuhkan 32 ETH." />
  <Card title="Stake hari ini" emoji=":stopwatch:" description="Staking dengan pool semudah menukar token. Tidak perlu khawatir tentang penyiapan perangkat keras dan pemeliharaan node. Pool memungkinkan Anda menyetorkan ETH Anda yang memungkinkan operator node menjalankan validator. Hadiah kemudian didistribusikan kepada kontributor dikurangi biaya untuk operasi node." />
  <Card title="Token staking" emoji=":droplet:" description="Banyak pool staking menyediakan token yang mewakili klaim atas ETH yang Anda stake dan hadiah yang dihasilkannya. Hal ini memungkinkan Anda untuk memanfaatkan ETH yang Anda stake, mis., sebagai jaminan dalam aplikasi DeFi." />
</Grid>

<StakingComparison page="pools" />

## Apa yang perlu dipertimbangkan {#what-to-consider}

Staking gabungan atau yang didelegasikan tidak didukung secara bawaan oleh protokol [Ethereum](/), tetapi mengingat permintaan pengguna untuk melakukan stake kurang dari 32 ETH, semakin banyak solusi telah dibangun untuk melayani permintaan ini.

Setiap pool dan alat atau smart contract yang mereka gunakan telah dibangun oleh tim yang berbeda, dan masing-masing memiliki manfaat dan risiko. Pool memungkinkan pengguna untuk menukar ETH mereka dengan token yang mewakili ETH yang di-stake. Token ini berguna karena memungkinkan pengguna untuk menukar jumlah ETH berapa pun ke jumlah yang setara dari token berbunga (yield-bearing) yang menghasilkan pengembalian dari hadiah staking yang diterapkan pada ETH yang di-stake yang mendasarinya (dan sebaliknya) di bursa terdesentralisasi meskipun ETH yang sebenarnya tetap di-stake di lapisan konsensus. Ini berarti pertukaran bolak-balik dari produk ETH yang di-stake berbunga dan "ETH mentah" berlangsung cepat, mudah, dan tidak hanya tersedia dalam kelipatan 32 ETH.

Namun, token ETH yang di-stake ini cenderung menciptakan perilaku seperti kartel di mana sejumlah besar ETH yang di-stake berakhir di bawah kendali beberapa organisasi terpusat daripada tersebar di banyak individu independen. Hal ini menciptakan kondisi untuk penyensoran atau ekstraksi nilai. Standar emas untuk staking harus selalu berupa individu yang menjalankan validator pada perangkat keras mereka sendiri kapan pun memungkinkan.

[Lebih lanjut tentang risiko token staking](https://notes.ethereum.org/@djrtwo/risks-of-lsd).

Indikator atribut digunakan di bawah ini untuk menandakan kekuatan atau kelemahan penting yang mungkin dimiliki oleh pool staking yang terdaftar. Gunakan bagian ini sebagai referensi tentang bagaimana kami mendefinisikan atribut-atribut ini saat Anda memilih pool untuk bergabung.

<StakingConsiderations page="pools" />

## Jelajahi pool staking {#explore-staking-pools}

Ada berbagai opsi yang tersedia untuk membantu Anda dengan penyiapan Anda. Gunakan indikator di atas untuk membantu memandu Anda melalui alat-alat di bawah ini.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Harap perhatikan pentingnya memilih layanan yang menganggap serius [keragaman klien](/developers/docs/nodes-and-clients/client-diversity/), karena hal ini meningkatkan keamanan jaringan, dan membatasi risiko Anda. Layanan yang memiliki bukti membatasi penggunaan klien mayoritas ditandai dengan <em style={{ textTransform: "uppercase" }}>"keragaman klien eksekusi"</em> dan <em style={{ textTransform: "uppercase" }}>"keragaman klien konsensus."</em>

Punya saran untuk alat staking yang kami lewatkan? Lihat [kebijakan pendaftaran produk](/contributing/adding-staking-products/) kami untuk melihat apakah alat tersebut cocok, dan untuk mengirimkannya agar ditinjau.

## Pertanyaan yang sering diajukan {#faq}

<ExpandableCard title="Bagaimana cara saya mendapatkan hadiah?">
Biasanya token staking ERC-20 diterbitkan untuk staker dan mewakili nilai ETH yang mereka stake ditambah hadiah. Ingatlah bahwa pool yang berbeda akan mendistribusikan hadiah staking kepada pengguna mereka melalui metode yang sedikit berbeda, tetapi ini adalah tema umumnya.
</ExpandableCard>

<ExpandableCard title="Kapan saya bisa menarik stake saya?">
Sekarang juga! Peningkatan jaringan Shanghai/Capella terjadi pada bulan April 2023, dan memperkenalkan penarikan staking. Akun validator yang mendukung pool staking sekarang memiliki kemampuan untuk keluar dan menarik ETH ke alamat penarikan yang ditunjuk. Hal ini memungkinkan kemampuan untuk menebus porsi stake Anda untuk ETH yang mendasarinya. Periksa dengan penyedia Anda untuk melihat bagaimana mereka mendukung fungsionalitas ini.

Sebagai alternatif, pool yang menggunakan token staking ERC-20 memungkinkan pengguna untuk memperdagangkan token ini di pasar terbuka, memungkinkan Anda untuk menjual posisi staking Anda, yang secara efektif "menarik" tanpa benar-benar menghapus ETH dari kontrak staking.

<ButtonLink href="/staking/withdrawals/">Lebih lanjut tentang penarikan staking</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Apakah ini berbeda dengan staking di bursa saya?">
Ada banyak kesamaan antara opsi staking gabungan ini dan bursa terpusat, seperti kemampuan untuk melakukan stake sejumlah kecil ETH dan menggabungkannya untuk mengaktifkan validator.

Tidak seperti bursa terpusat, banyak opsi staking gabungan lainnya menggunakan smart contract dan/atau token staking, yang biasanya merupakan token ERC-20 yang dapat disimpan di dompet Anda sendiri, dan dibeli atau dijual seperti token lainnya. Hal ini menawarkan lapisan kedaulatan dan keamanan dengan memberi Anda kendali atas token Anda, tetapi tetap tidak memberi Anda kendali langsung atas klien validator yang melakukan atestasi atas nama Anda di latar belakang.

Beberapa opsi penggabungan lebih terdesentralisasi daripada yang lain dalam hal node yang mendukungnya. Untuk mempromosikan kesehatan dan desentralisasi jaringan, staker selalu didorong untuk memilih layanan penggabungan yang memungkinkan sekumpulan operator node terdesentralisasi tanpa izin.
</ExpandableCard>

## Bacaan lebih lanjut {#further-reading}

- [Direktori Staking Ethereum](https://www.staking.directory/) - _Eridian dan Spacesider_
- [Staking dengan Rocket Pool - Ikhtisar Staking](https://docs.rocketpool.net/guides/staking/overview.html) - _Dokumentasi RocketPool_
- [Staking Ethereum dengan Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Dokumentasi bantuan Lido_