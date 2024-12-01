---
title: Pertaruhan terkumpul
description: Gambaran keseluruhan tentang cara untuk bermula dengan pertaruhan ETH terhimpun
lang: ms
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-pool.png
alt: Leslie si badak berenang di kolam.
sidebarDepth: 2
summaryPoints:
  - Pertaruhkan dan dapatkan ganjaran dengan sebarang jumlah ETH dengan bergabung tenaga dengan orang lain
  - Langkau bahagian yang sukar dan amanahkan operasi pengesah kepada pihak ketiga
  - Pegang token pertaruhan dalam dompet anda sendiri
---

## Apakah himpunan pertaruhan? {#what-are-staking-pools}

Himpunan pertaruhan ialah pendekatan kolaboratif untuk membolehkan orang ramai yang mempunyai jumlah ETH yang lebih kecil mendapatkan 32 ETH yang diperlukan untuk mengaktifkan satu set kunci pengesah. Fungsi penghimpunan secara asalnya tidak disokong dalam protokol, jadi penyelesaian telah dibina secara berasingan untuk menangani keperluan ini.

Sesetengah himpunan beroperasi menggunakan kontrak pintar, di mana dana boleh didepositkan kepada kontrak, yang mengurus dan menjejak taruhan anda tanpa amanah, serta mengeluarkan token yang mewakili nilai ini kepada anda. Himpunan lain mungkin tidak melibatkan kontrak pintar dan sebaliknya dilakukan luar rantaian.

## Apakah sebab membuat pertaruhan dengan himpunan? {#why-stake-with-a-pool}

Di samping faedah yang kami gariskan dalam [pengenalan kepada pertaruhan](/staking/) kami, pertaruhan dengan himpunan datang dengan beberapa faedah tertentu.

<CardGrid>
  <Card title="Penghalang masuk yang rendah" emoji="🐟" description="Not a whale? No problem. Most staking pools let you stake virtually any amount of ETH by joining forces with other stakers, unlike staking solo which requires 32 ETH." />
  <Card title="Bertaruh hari ini" emoji=":stopwatch:" description="Staking with a pool is as easy as a token swap. No need to worry about hardware setup and node maintenance. Pools allow you to deposit your ETH which enables node operators to run validators. Rewards are then distributed to contributors minus a fee for node operations." />
  <Card title="Token pertaruhan" emoji=":droplet:" description="Many staking pools provide a token that represents a claim on your staked ETH and the rewards it generates. This allows you to make use of your staked ETH, e.g. as collateral in DeFi applications." />
</CardGrid>

<StakingComparison page="pools" />

## Perkara yang perlu dipertimbangkan {#what-to-consider}

Pertaruhan terhimpun atau diwakilkan pada asalnya tidak disokong oleh protokol Ethereum, tetapi memandangkan permintaan untuk pengguna mempertaruhkan kurang daripada 32 ETH, semakin banyak penyelesaian telah dibina untuk memenuhi permintaan ini.

Setiap himpunan dan alatan atau kontrak pintar yang mereka gunakan telah dibina oleh pasukan yang berbeza, dan setiap satu disertakan dengan faedah dan risiko. Himpunan membolehkan pengguna menukar ETH mereka dengan token yang mewakili ETH yang dipertaruhkan. Token ini berguna kerana ia membenarkan pengguna menukar sebarang amaun ETH kepada jumlah yang setara dengan token yang memberikan hasil yang menjana pulangan daripada ganjaran pertaruhan yang digunakan pada ETH yang dipertaruhkan (dan sebaliknya) pada pertukaran teragih walaupun sebenarnya ETH kekal dipertaruhkan pada lapisan persetujuan. Ini bermakna pertukaran bolak-balik daripada produk ETH dipertaruhkan yang memberikan hasil dan "ETH mentah" adalah pantas, mudah dan bukan sahaja tersedia dalam gandaan 32 ETH.

Walau bagaimanapun, token ETH yang dipertaruhkan ini cenderung untuk mencipta gelagat seperti kartel di mana sejumlah besar ETH yang dipertaruhkan berakhir di bawah kawalan beberapa organisasi terpusat dan bukannya tersebar di banyak individu bebas. Ini mewujudkan syarat untuk penapisan atau pengekstrakan nilai. Piawaian emas untuk pertaruhan hendaklah sentiasa individu yang menjalankan pengesah pada perkakasan mereka sendiri apabila boleh.

[Maklumat lanjut tentang risiko mempertaruhkan token](https://notes.ethereum.org/@djrtwo/risks-of-lsd).

Penunjuk atribut digunakan di bawah untuk menandakan kekuatan atau kelemahan ketara yang mungkin ada pada himpunan pertaruhan tersenarai. Gunakan bahagian ini sebagai rujukan untuk cara kami mentakrifkan atribut ini semasa anda memilih himpunan untuk disertai.

<StakingConsiderations page="pools" />

## Terokai himpunan pertaruhan {#explore-staking-pools}

Terdapat pelbagai pilihan yang tersedia untuk membantu anda dengan persediaan anda. Gunakan penunjuk di atas untuk membantu membimbing anda menggunakan alatan di bawah.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Sila ambil perhatian kepentingan memilih perkhidmatan yang mengambil serius [kepelbagaian pelanggan](/developers/docs/nodes-and-clients/client-diversity/), kerana ia meningkatkan keselamatan rangkaian dan mengehadkan risiko anda. Perkhidmatan yang mempunyai bukti mengehadkan majoriti penggunaan pelanggan ditunjukkan dengan <em style={{ textTransform: "uppercase" }}>"kepelbagaian pelanggan pelaksanaan"</em> dan <em style={{ textTransform: "uppercase" }}>"kepelbagaian pelanggan konsensus."</em>

Ada cadangan untuk alat pertaruhan yang kami terlepas? Semak [dasar penyenaraian produk](/contributing/adding-staking-products/) kami untuk melihat sama ada ia sesuai dan serahkan untuk semakan.

## Soalan lazim {#faq}

<ExpandableCard title="Bagaimanakah saya memperoleh ganjaran?">
Biasanya token pertaruhan ERC-20 dikeluarkan kepada petaruh dan mewakili nilai ETH yang dipertaruhkan serta ganjaran mereka. Perlu diingat bahawa himpunan yang berbeza akan mengedarkan ganjaran taruhan kepada pengguna mereka melalui kaedah yang sedikit berbeza, tetapi ini adalah tema biasa.
</ExpandableCard>

<ExpandableCard title="Bilakah boleh saya menarik balik taruhan saya?">
Sekarang juga! Peningkatan rangkaian Shanghai/Capella berlaku pada April 2023, dan memperkenalkan pengeluaran pertaruhan. Akaun pengesah yang menyokong himpunan pertaruhan kini mempunyai keupayaan untuk keluar dan mengeluarkan ETH ke alamat pengeluaran yang ditetapkan. Ini mendayakan keupayaan untuk menebus bahagian taruhan anda untuk ETH asas. Semak dengan pembekal anda untuk melihat cara mereka menyokong fungsi ini.

Sebagai alternatif, himpunan yang menggunakan token pertaruhan ERC-20 membolehkan pengguna memperdagangkan token ini di pasaran terbuka, membolehkan anda menjual kedudukan pertaruhan anda, secara efektif "menarik diri" tanpa benar-benar mengalih keluar ETH daripada kontrak pertaruhan.

<ButtonLink href="/staking/withdrawals/">Maklumat lanjut tentang pengeluaran pertaruhan</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Adakah ini berbeza daripada mempertaruhkan pertukaran saya?">
Terdapat banyak persamaan antara pilihan pertaruhan terhimpun ini dan pertukaran terpusat, seperti keupayaan untuk mempertaruhkan sejumlah kecil ETH dan menggabungkannya bersama untuk mengaktifkan pengesah.

Tidak seperti bursa berpusat, banyak pilihan pertaruhan terhimpun lain menggunakan kontrak pintar dan/atau token pertaruhan, yang biasanya merupakan token ERC-20 yang boleh disimpan dalam dompet anda sendiri, dan dibeli atau dijual sama seperti token lain. Ini menawarkan lapisan kedaulatan dan keselamatan dengan memberi anda kawalan ke atas token anda, tetapi masih tidak memberi anda kawalan langsung ke atas pelanggan pengesah yang membuat perakuan bagi pihak anda di latar belakang.

Sesetengah pilihan perhimpunan lebih terpusat daripada yang lain apabila ia berkaitan dengan nod yang menyokongnya. Untuk menggalakkan kesihatan dan keteragihan rangkaian, petaruh sentiasa digalakkan untuk memilih perkhidmatan penghimpunan yang mendayakan set pengendali nod teragih tanpa kebenaran.
</ExpandableCard>

## Bacaan lanjut {#further-reading}

- [Direktori Pertaruhan Ethereum](https://www.staking.directory/) - _Eridian dan Spacesider_
- [Pertaruhan dengan Rocket Pool - Gambaran Keseluruhan Pertaruhan](https://docs.rocketpool.net/guides/staking/overview.html) - _Dokumen RocketPool_
- [Pertaruhan Ethereum Dengan Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Dokumen bantuan Lido_
