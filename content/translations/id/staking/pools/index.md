---
title: Penaruhan dari pengumpulan
description: Gambaran umum mengenai bagaimana cara memulai penaruhan untuk ETH dikumpulkan
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

Beberapa pool beroperasi menggunakan kontrak pintar, di mana dana dapat disimpan ke dalam kontrak, yang mengelola dan melacak taruhan Anda dengan aman, dan mengeluarkan token yang mewakili nilai tersebut. Pool lain mungkin tidak melibatkan kontrak pintar dan justru diatasi di luar rantai.

## Mengapa melakukan taruhan dengan pool? {#why-stake-with-a-pool}

Selain manfaat yang kami sebutkan dalam [pengantar tentang penaruhan](/staking/), melakukan penaruhan dengan pool memiliki sejumlah manfaat yang berbeda.

<CardGrid>
  <Card title="Hambatan masuk yang rendah" emoji="🐟" description="Not a whale? No problem. Most staking pools let you stake virtually any amount of ETH by joining forces with other stakers, unlike staking solo which requires 32 ETH." />
  <Card title="Taruhan hari ini" emoji=":stopwatch:" description="Staking with a pool is as easy as a token swap. No need to worry about hardware setup and node maintenance. Pools allow you to deposit your ETH which enables node operators to run validators. Rewards are then distributed to contributors minus a fee for node operations." />
  <Card title="Penaruhan token" emoji=":droplet:" description="Many staking pools provide a token that represents a claim on your staked ETH and the rewards it generates. This allows you to make use of your staked ETH, e.g. as collateral in DeFi applications." />
</CardGrid>

<StakingComparison page="pools" />

## Apa yang perlu ditentukan {#what-to-consider}

Pooled atau penaruhan yang didelegasikan tidak didukung oleh protokol Ethereum, tetapi mengingat permintaan pengguna untuk mempertaruhkan kurang dari 32 ETH, semakin banyak solusi yang dibuat untuk melayani permintaan ini.

Setiap pool dan pearngkat atau kontrak pintar yang mereka gunakan telah dibangun oleh tim yang berbeda, dan masing-masing memiliki keuntungan dan risiko. Pool memungkinkan pengguna menukarkan ETH mereka dengan token yang mewakili ETH yang telah ditaruhkan. Token ini berguna karena memungkinkan pengguna untuk menukar sejumlah ETH dengan jumlah yang setara dengan token hasil yang menghasilkan imbal hasil dari imbalan penaruhan yang diterapkan pada ETH yang ditaruhkan (dan sebaliknya) pada bursa terpusat meskipun ETH yang sebenarnya tetap ditaruhkan pada lapisan konsensus. Ini berarti pertukaran bolak-balik dari produk ETH yang ditaruhkan yang menghasilkan hasil dan "ETH mentah" cepat, mudah, dan tidak hanya tersedia dalam kelipatan 32 ETH.

Namun, token ETH yang dipertaruhkan ini cenderung menciptakan perilaku seperti kartel di mana sejumlah besar ETH yang dipertaruhkan berakhir di bawah kendali beberapa organisasi terpusat daripada tersebar di banyak individu independen. Hal ini menciptakan kondisi untuk sensor atau ekstraksi nilai. Standar emas untuk penaruhan seharusnya selalu individu menjalankan validator di perangkat keras mereka sendiri jika memungkinkan.

[Lebih lanjut tentang risiko token penaruhan](https://notes.ethereum.org/@djrtwo/risks-of-lsd).

Indikator atribut digunakan di bawah ini untuk menandakan kekuatan atau kelemahan yang mencolok yang mungkin dimiliki oleh pool penaruhan yang terdaftar. Gunakan bagian ini sebagai referensi untuk bagaimana kami mendefinisikan atribut ini ketika Anda memilih pool untuk bergabung.

<StakingConsiderations page="pools" />

## Eksplorasi pool penaruhan {#explore-staking-pools}

Terdapat berbagai pilihan yang tersedia untuk membantu Anda dengan pengaturan Anda. Gunakan petunjuk di atas untuk membantu Anda memandu melalui perangkat di bawah ini.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Harap perhatikan pentingnya memilih layanan yang serius mengenai [diversitas klien](/developers/docs/nodes-and-clients/client-diversity/), karena ini meningkatkan keamanan jaringan dan membatasi risiko Anda. Layanan-layanan yang memiliki bukti pembatasan penggunaan mayoritas klien ditandai dengan <em style={{ textTransform: "uppercase" }}>"diversitas klien eksekusi"</em> dan <em style={{ textTransform: "uppercase" }}>"diversitas klien konsensus."</em>

Punya saran untuk alat penaruhan yang kami lewatkan? Lihat [kebijakan daftar produk](/contributing/adding-staking-products/) kami untuk melihat apakah cocok, dan untuk mengirimkannya untuk ditinjau.

## Pertanyaan yang sering diajukan {#faq}

<ExpandableCard title="Bagaimana cara saya mendapatkan imbalan?">
Biasanya token penaruhan ERC-20 dikeluarkan untuk para penaruh yang mewakili nilai ETH yang mereka pertaruhkan ditambah hadiah. Perlu diingat bahwa berbagai pool akan mendistribusikan imbalan penaruhan kepada pengguna mereka melalui metode yang sedikit berbeda, tetapi tema umum ini tetap sama.
</ExpandableCard>

<ExpandableCard title="Kapan saya bisa menarik kembali taruhan saya?">
Sekarang juga! Peningkatan jaringan Shanghai/Capella terjadi pada April 2023 dan memperkenalkan penarikan penaruhan. Akun validator yang mendukung pool penaruhan sekarang memiliki kemampuan untuk keluar dan menarik ETH ke alamat penarikan yang ditentukan. Ini memungkinkan Anda untuk menebus bagian Anda dari taruhan menjadi ETH yang mendasarinya. Periksa dengan penyedia Anda untuk melihat bagaimana mereka mendukung fungsionalitas ini.

Sebagai alternatif, pool yang menggunakan token penaruhan ERC-20 memungkinkan pengguna untuk memperdagangkan token ini di pasar terbuka, sehingga Anda dapat menjual posisi penaruhan Anda, secara efektif "menarik diri" tanpa benar-benar menghapus ETH dari kontrak penaruhan.

<ButtonLink href="/staking/withdrawals/">Lebih lanjut tentang penarikan penaruhan</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Apakah ini berbeda dari melakukan penaruhan dengan bursa saya?">
Terdapat banyak kesamaan antara pilihan pooled penaruhan ini dengan bursa terpusat, seperti kemampuan untuk melakukan penaruhan dengan jumlah ETH yang kecil dan menggabungkannya bersama untuk mengaktifkan validator.

Tidak seperti bursa terpusat, banyak opsi penaruhan gabungan lainnya menggunakan kontrak pintar dan/atau token penaruhan, yang biasanya berupa token ERC-20 yang dapat disimpan di dompet Anda sendiri, dan dibeli atau dijual seperti token lainnya. Hal ini memberikan lapisan kedaulatan dan keamanan dengan memberikan Anda kendali atas token Anda, tetapi tetap tidak memberikan Anda kendali langsung atas klien validator yang membuktikan tanda tangan atas nama Anda di latar belakang.

Beberapa pilihan pooling lebih terdesentralisasi daripada yang lain dalam hal simpul yang mendukungnya. Untuk mendorong kesehatan dan desentralisasi jaringan, para penaruh selalu didorong untuk memilih layanan pooling yang memungkinkan set kelompok simpul operator yang terdesentralisasi dan tanpa izin.
</ExpandableCard>

## Bacaan lebih lanjut {#further-reading}

- [Direktori Penaruhan Ethereum](https://www.staking.directory/) - _Eridian dan Spacesider_
- [Penruhan dengan Rocket Pool - Ikhtisar Penaruhan](https://docs.rocketpool.net/guides/staking/overview.html) - _Dokumentasi RocketPool_
- [Penaruhan Ethereum dengan Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Dokumentasi bantuan Lido_
