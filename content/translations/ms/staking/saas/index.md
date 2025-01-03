---
title: Pertaruhan sebagai perkhidmatan
description: Gambaran keseluruhan tentang cara untuk bermula dengan pertaruhan ETH terhimpun
lang: ms
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: Leslie sang badak terapung di awan.
sidebarDepth: 2
summaryPoints:
  - Pengendali nod pihak ketiga mengendalikan operasi pelanggan pengesah anda
  - Pilihan hebat untuk sesiapa sahaja yang mempunyai 32 ETH yang tidak berasa selesa menangani kerumitan teknikal menjalankan nod
  - Kurangkan kepercayaan, dan kekalkan jagaan kunci pengeluaran anda
---

## Apakah pertaruhan sebagai perkhidmatan? {#what-is-staking-as-a-service}

Pertaruhan sebagai perkhidmatan ("SaaS") mewakili kategori perkhidmatan pertaruhan di mana anda mendepositkan 32 ETH anda sendiri untuk pengesah, tetapi mewakilkan operasi nod kepada pengendali pihak ketiga. Proses ini biasanya melibatkan panduan melalui persediaan awal, termasuk penjanaan kunci dan deposit, kemudian memuat naik kunci tandatangan anda kepada pengendali. Ini membolehkan perkhidmatan mengendalikan pengesah anda bagi pihak anda, biasanya dengan bayaran bulanan.

## Apakah sebab membuat pertaruhan dengan perkhidmatan? {#why-stake-with-a-service}

Pada asalnya protokol Ethereum tidak menyokong delegasi pertaruhan, jadi perkhidmatan ini telah dibina untuk memenuhi permintaan ini. Jika anda mempunyai 32 ETH untuk dipertaruhkan, tetapi tidak berasa selesa berurusan dengan perkakasan, perkhidmatan SaaS membolehkan anda mewakilkan bahagian yang sukar sambil anda memperoleh ganjaran blok asal.

<CardGrid>
  <Card title="Pengesah anda sendiri" emoji=":desktop_computer:" description="Deposit your own 32 ETH to activate your own set of signing keys that will participate in Ethereum consensus. Monitor your progress with dashboards to watch those ETH rewards accumulate." />
  <Card title="Mudah untuk bermula" emoji="🏁" description="Forget about hardware specs, setup, node maintenance and upgrades. SaaS providers let you outsource the hard part by uploading your own signing credentials, allowing them to run a validator on your behalf, for a small cost." />
  <Card title="Hadkan risiko anda" emoji=":shield:" description="In many cases users do not have to give up access to the keys that enable withdrawing or transferring staked funds. These are different from the signing keys, and can be stored separately to limit (but not eliminate) your risk as a staker." />
</CardGrid>

<StakingComparison page="saas" />

## Perkara yang perlu dipertimbangkan {#what-to-consider}

Terdapat semakin banyak penyedia SaaS untuk membantu anda mempertaruhkan ETH anda, tetapi mereka semua mempunyai manfaat dan risiko mereka sendiri. Semua pilihan SaaS memerlukan andaian kepercayaan tambahan berbanding dengan pertaruhan sendiri. Pilihan Saas mungkin mempunyai kod tambahan yang membalut pelanggan Ethereum yang tidak dibuka atau boleh diaudit. SaaS juga mempunyai kesan buruk terhadap keteragihan rangkaian. Bergantung pada persediaan, anda mungkin tidak mengawal pengesah anda - pengendali boleh bertindak secara tidak jujur ​​menggunakan ETH anda.

Penunjuk atribut digunakan di bawah untuk menandakan kekuatan atau kelemahan ketara yang mungkin ada pada penyedia SaaS tersenarai. Gunakan bahagian ini sebagai rujukan untuk cara kami mentakrifkan atribut ini ketika anda memilih perkhidmatan untuk membantu perjalanan pertaruhan anda.

<StakingConsiderations page="saas" />

## Terokai penyedia perkhidmatan pertaruhan {#saas-providers}

Di bawah adalah beberapa pembekal SaaS yang tersedia. Gunakan penunjuk di atas untuk membantu membimbing anda menggunakan perkhidmatan ini

<ProductDisclaimer />

### Pembekal SaaS

<StakingProductsCardGrid category="saas" />

Sila ambil perhatian kepentingan menyokong [kepelbagaian pelanggan](/developers/docs/nodes-and-clients/client-diversity/) kerana ia meningkatkan keselamatan rangkaian dan mengehadkan risiko anda. Perkhidmatan yang mempunyai bukti mengehadkan majoriti penggunaan pelanggan ditunjukkan dengan <em style={{ textTransform: "uppercase" }}>"kepelbagaian pelanggan pelaksanaan"</em> dan <em style={{ textTransform: "uppercase" }}>"kepelbagaian pelanggan konsensus."</em>

### Penjana Utama

<StakingProductsCardGrid category="keyGen" />

Ada cadangan untuk penyedia pertaruhan sebagai perkhidmatan yang kami terlepas? Semak [dasar penyenaraian produk](/contributing/adding-staking-products/) kami untuk melihat sama ada ia sesuai dan serahkan untuk semakan.

## Soalan lazim {#faq}

<ExpandableCard title="Siapakah yang memegang kunci saya?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Susunan akan berbeza mengikut pembekal, tetapi lazimnya anda akan dibimbing untuk menyediakan sebarang kunci tandatangan yang anda perlukan (satu setiap 32 ETH), dan memuat naiknya kepada pembekal anda untuk membolehkan mereka membuat pengesahan bagi pihak anda. Kunci tandatangan sahaja tidak memberikan sebarang keupayaan untuk mengeluarkan, memindahkan atau membelanjakan dana anda. Walau bagaimanapun, ia menyediakan keupayaan untuk membuang undi ke arah konsensus, yang jika tidak dilakukan dengan betul boleh mengakibatkan penalti luar talian atau pemotongan.
</ExpandableCard>

<ExpandableCard title="Jadi terdapat dua set kunci?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Ya. Setiap akaun terdiri daripada kedua-dua kunci <em>tandatangan</em> BLS dan kunci <em>pengeluaran</em> BLS. Untuk membolehkan pengesah mengesahkan keadaan rantaian, mengambil bahagian dalam jawatankuasa penyegerakan dan mencadangkan blok, kunci tandatangan mesti mudah diakses oleh pelanggan pengesah. Ini mesti disambungkan melalui internet dalam bentuk tertentu, dan dengan itu dianggap sebagai kunci "panas". Ini adalah keperluan untuk pengesah anda boleh mengesahkan, dan oleh itu kunci yang digunakan untuk memindahkan atau mengeluarkan dana diasingkan atas sebab keselamatan.

Kunci pengeluaran BLS digunakan untuk menandatangani mesej tunggal yang mengisytiharkan ganjaran pertaruhan akaun lapisan perlaksanaan dan dana yang telah keluar. Setelah mesej ini disiarkan, kunci <em>pengeluaran BLS</em> tidak diperlukan lagi. Sebaliknya, kawalan ke atas dana yang dikeluarkan diwakilkan secara kekal ke alamat yang anda berikan. Ini membolehkan anda menetapkan alamat pengeluaran yang dijamin melalui storan sejuk anda sendiri, meminimumkan risiko kepada dana pengesah anda, walaupun jika orang lain mengawal kunci tandatangan pengesah anda.

Mengemas kini bukti kelayakan pengeluaran ialah langkah yang diperlukan untuk membolehkan pengeluaran\*. Proses ini melibatkan penjanaan kunci pengeluaran menggunakan frasa benih mnemonik anda.

<strong>Pastikan anda menyandarkan frasa benih ini dengan selamat atau anda tidak akan dapat menjana kunci pengeluaran anda apabila tiba masanya.</strong>

\*Petaruh yang memberikan alamat pengeluaran dengan deposit permulaan tidak perlu menetapkan ini. Semak dengan pembekal SaaS anda untuk mendapatkan sokongan mengenai cara menyediakan pengesah anda.
</ExpandableCard>

<ExpandableCard title="Bilakah boleh saya menarik diri?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Pengeluaran pertaruhan telah dilaksanakan semasa peningkatan Shanghai/Capella pada April 2023. Petaruh perlu memberikan alamat pengeluaran (jika tidak diberikan pada deposit awal), dan pembayaran ganjaran akan mula diedarkan secara automatik secara berkala setiap beberapa hari.

Pengesah juga boleh keluar sepenuhnya sebagai pengesah, yang akan membuka kunci baki ETH mereka untuk pengeluaran. Akaun yang telah memberikan alamat pengeluaran pelaksanaan dan menyelesaikan proses keluar akan menerima baki keseluruhannya pada alamat pengeluaran yang diberikan semasa sapuan pengesahan seterusnya.

<ButtonLink href="/staking/withdrawals/">Maklumat lanjut tentang pengeluaran pertaruhan</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Apakah yang berlaku jika saya dipotong?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Dengan menggunakan pembekal SaaS, anda mempercayakan pengendalian nod anda kepada orang lain. Ini datang dengan risiko prestasi nod yang lemah, yang bukan dalam kawalan anda. Sekiranya pengesah anda dipotong, baki pengesah anda akan dikenakan penalti dan dialih keluar secara paksa daripada himpunan pengesah.

Setelah selesai proses pemotongan/keluar, dana ini akan dipindahkan ke alamat pengeluaran yang diberikan kepada pengesah. Ini memerlukan penyediaan alamat pengeluaran untuk didayakan. Ini mungkin telah disediakan pada deposit awal. Jika tidak, kunci pengeluaran pengesah perlu digunakan untuk menandatangani mesej yang mengisytiharkan alamat pengeluaran. Jika tiada alamat pengeluaran telah diberikan, dana akan kekal dikunci sehingga diberikan.

Hubungi pembekal SaaS individu untuk mendapatkan butiran lanjut tentang sebarang jaminan atau pilihan insurans, dan untuk mendapatkan arahan tentang cara memberikan alamat pengeluaran. Jika anda lebih suka mengawal sepenuhnya persediaan pengesah anda, <a href="/staking/solo/">ketahui lebih lanjut tentang cara mempertaruhkan ETH anda secara solo</a>.
</ExpandableCard>

## Bacaan lanjut {#further-reading}

- [Direktori Pertaruhan Ethereum](https://www.staking.directory/) - _Eridian dan Spacesider_
- [Menilai Perkhidmatan Pertaruhan](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
