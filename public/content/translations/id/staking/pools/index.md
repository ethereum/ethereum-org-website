---
title: Staking likuid & gabungan
description: Gambaran umum tentang staking likuid dan gabungan di Ethereum
lang: id
template: staking
image: /images/staking/leslie-pool.png
sidebarDepth: 2
summaryPoints:
  - Lakukan stake dan dapatkan imbalan dengan jumlah ETH berapa pun dengan bergabung bersama orang lain
  - Lewati bagian yang sulit dan percayakan operasi validator kepada pihak ketiga
  - Simpan token staking likuid di dompet Anda sendiri
---

## Apa itu pool staking? {#what-are-staking-pools}

Pool staking adalah pendekatan kolaboratif untuk memungkinkan banyak orang dengan jumlah ETH yang lebih kecil untuk mendapatkan minimum 32 ETH yang diwajibkan untuk mengaktifkan validator di [Ethereum](/). Fungsionalitas penggabungan tidak didukung secara bawaan di dalam protokol, sehingga solusi dibangun secara terpisah untuk mengatasi kebutuhan partisipasi dengan jumlah yang lebih kecil.

Beberapa pool staking beroperasi menggunakan kontrak pintar, di mana dana disetorkan ke kontrak yang mengelola dan melacak stake Anda, dan menerbitkan token tanda terima (token staking likuid) yang mewakili nilai ini. Pool lain mungkin tidak melibatkan kontrak pintar dan sebaliknya dimediasi secara offchain.

Opsi gabungan sangat berbeda dalam hal seberapa banyak Anda dapat memverifikasinya. Pool yang transparan dan diatur oleh protokol adalah kontrak pintar sumber terbuka di Ethereum yang menahan setoran, mempublikasikan set operator node mereka, dan menerbitkan token yang dapat ditebus; semua yang mendukung posisi Anda terlihat secara onchain. Produk gabungan yang tidak transparan, seperti beberapa program imbal hasil bursa terpusat, mengambil hak asuh atas ETH Anda, dan Anda tidak dapat memverifikasi secara independen apa yang di-stake atas nama Anda, jika ada. Sebagian besar halaman ini membahas jenis yang pertama; lihat [produk gabungan yang tidak transparan](#opaque-pooled-products) untuk mengetahui perbedaannya.

Setiap opsi gabungan memecahkan masalah akses nyata dari staking dengan kurang dari 32 ETH, atau tanpa menjalankan perangkat keras. Namun, masing-masing juga menempatkan perantara antara pelaku staking dan protokol inti Ethereum. Hanya [staking mandiri](/staking/solo/) yang memberi Anda hubungan langsung tanpa perantara dengan Ethereum.

## Mengapa melakukan stake dengan pool? {#why-stake-with-a-pool}

Selain manfaat dari [berpartisipasi dalam staking](/staking/), melakukan stake dengan pool memberikan sejumlah manfaat unik.

<Grid>
  <Card title="Hambatan masuk yang rendah" icon={<Fish />} description="Bukan paus (whale)? Tidak masalah. Sebagian besar pool staking memungkinkan Anda melakukan stake dengan jumlah ETH berapa pun dengan bergabung bersama pelaku staking lainnya, tidak seperti staking mandiri yang mewajibkan 32 ETH." />
  <Card title="Stake hari ini" icon={<Clock />} description="Melakukan stake dengan pool semudah melakukan tukar token. Tidak perlu khawatir tentang penyiapan perangkat keras dan pemeliharaan node. Pool memungkinkan Anda menyetorkan ETH Anda yang memungkinkan operator node untuk menjalankan validator. Imbalan kemudian didistribusikan kepada kontributor dikurangi biaya untuk operasi node." />
  <Card title="Token staking likuid" icon={<Droplets />} description="Banyak pool staking menyediakan token yang mewakili klaim atas ETH yang Anda stake dan imbalan yang dihasilkannya. Ini memungkinkan Anda untuk memanfaatkan ETH yang Anda stake, misalnya, sebagai kolateral dalam aplikasi DeFi." />
</Grid>

## Perbandingan opsi staking {#comparison-of-staking-options}

<StakingComparison page="pools" />

## Token staking likuid {#liquid-staking-tokens}

Sebagian besar pool staking yang transparan menerbitkan **token staking likuid (LST)**, sebuah token ERC-20 yang mewakili klaim atas ETH yang di-stake dan imbalan yang diperolehnya. Saat Anda menyetorkan ETH, protokol melakukan stake dengan operator node-nya dan mencetak token tanda terima (LST) ke dompet Anda. Anda dapat menyimpan token itu sendiri atau menitipkannya pada penyedia pihak ketiga, dan dapat mentransfer atau menjual token tersebut kapan saja. ETH yang mendasarinya tetap di-stake di lapisan konsensus. Protokol staking likuid menyumbang sekitar sepertiga dari semua ETH yang di-stake, menjadikan LST salah satu cara paling umum untuk melakukan stake saat ini.

### Bagaimana imbalan muncul di dalam token {#how-rewards-show-up-in-the-token}

LST mencerminkan imbalan staking dengan salah satu dari dua cara:

- **Token rebasing** (seperti stETH milik Lido): saldo token Anda meningkat seiring bertambahnya imbalan, sehingga nilai satu token tetap kira-kira sama dengan satu ETH.
- **Token nilai tukar** (seperti rETH milik Rocket Pool): saldo token Anda tetap sama, tetapi setiap token dapat ditebus dengan jumlah ETH yang terus bertambah seiring waktu.

Kedua desain memberikan imbalan bersih setelah dikurangi biaya protokol staking. Tidak ada yang secara inheren lebih baik, tetapi keduanya berperilaku berbeda di dompet dan aplikasi keuangan terdesentralisasi (DeFi), dan diperlakukan berbeda untuk tujuan pajak di beberapa yurisdiksi. Token rebasing sering kali memiliki versi non-rebasing yang "dibungkus" (wrapped) untuk kompatibilitas dengan aplikasi [DeFi](/glossary/#defi).

### Penebusan dan perdagangan {#redeeming-and-trading}

Ada dua cara untuk keluar dari posisi LST:

- **Tebus melalui protokol** untuk ETH yang mendasarinya. Penebusan bergantung pada ketersediaan likuiditas protokol, baik berupa penyangga ETH yang tidak di-stake atau validator yang keluar melalui antrean keluar lapisan konsensus, yang dapat memakan waktu.
- **Jual di pasar sekunder** kapan saja. Karena token diperdagangkan secara bebas, harga pasarnya dapat menyimpang dari nilai ETH yang mendukungnya, terutama selama periode tekanan pasar.

Sejak peningkatan Pectra, [penarikan yang dipicu lapisan eksekusi (EIP-7002)](https://eips.ethereum.org/EIPS/eip-7002) memungkinkan keluarnya validator dipicu secara langsung dari lapisan eksekusi oleh pemegang alamat penarikan. Protokol staking dapat menggunakan fitur ini untuk memastikan validator mereka dapat keluar tanpa bergantung pada kerja sama operator node, sehingga penebusan tidak lagi terlalu bergantung pada kepercayaan terhadap operator node seperti sebelumnya.

### Menyimpan LST tidak sama dengan melakukan staking {#holding-an-lst-is-not-the-same-as-staking}

Protokol Ethereum membayar imbalan kepada validator; protokol tidak mengetahui keberadaan token Anda. Saat Anda menyimpan LST, Anda bukanlah pelaku staking dari sudut pandang protokol. Sebaliknya, Anda memegang klaim atas layanan atau kontrak pintar yang melakukan stake atas nama Anda. Ini berfungsi dengan baik dalam kondisi normal, tetapi disertai dengan ketergantungan kepercayaan tambahan. ETH yang Anda stake bergantung pada kontrak, tata kelola, dan operator pool yang bekerja dengan benar, bukan hanya pada Ethereum itu sendiri.

## Risiko token staking likuid {#risks-of-liquid-staking-tokens}

LST mewarisi risiko dasar dari staking (seperti pemotongan dan penalti waktu henti pada validator pool) dan menambahkan lapisannya sendiri:

- **Risiko kontrak pintar** - ETH Anda disimpan oleh kontrak yang mungkin mengandung bug atau dieksploitasi. Utamakan protokol dengan kode sumber terbuka, telah diaudit, dan teruji di lapangan.
- **Risiko pasar dan likuiditas** - harga pasar sekunder token dapat turun di bawah nilai ETH yang mendukungnya ("depegging"). Jika penebusan protokol lambat atau padat saat Anda ingin keluar, menjual dengan harga diskon mungkin menjadi satu-satunya jalan keluar cepat Anda.
- **Risiko tata kelola dan peningkatan** - biaya, set operator node, dan bahkan cara kerja token dapat diubah melalui tata kelola protokol dan peningkatan kontrak. Sebagai pemegang token, Anda biasanya tidak memiliki suara dalam tata kelola tersebut.
- **Sentralisasi set operator** - beberapa pool memusatkan stake pada operator node pilihan mereka. Sejumlah besar ETH yang di-stake di bawah kendali beberapa organisasi menciptakan kondisi untuk penyensoran, ekstraksi nilai, dan titik kegagalan tunggal. Utamakan pool dengan set operator yang terdistribusi dan tanpa izin.
- **Penerusan pemotongan** - jika validator pool mengalami pemotongan atau penalti, kerugian tersebut biasanya disosialisasikan ke seluruh pemegang token sesuai dengan aturan protokol.

<Alert variant="update">
<AlertIcon size="xl"><Split /></AlertIcon>
<AlertContent>
<AlertDescription>
Banyak pool mengurangi risiko operator menggunakan **teknologi validator terdistribusi (DVT)**, perangkat lunak perantara yang membagi kunci validator ke beberapa mesin dan operator sehingga tidak ada kegagalan atau kompromi tunggal yang dapat melumpuhkan validator. [Lebih lanjut tentang teknologi validator terdistribusi](/staking/dvt/)
</AlertDescription>
</AlertContent>
</Alert>

## Produk gabungan yang tidak transparan {#opaque-pooled-products}

Tidak semua yang dipasarkan sebagai "staking" adalah staking protokol. Program "penghasilan" atau "imbalan" bursa terpusat, dan beberapa produk imbal hasil yang dibangun di atas token staking, menggabungkan ETH pelanggan dengan cara yang tidak dapat Anda periksa:

- **Kustodian** - penyedia memegang kunci penarikan dan ETH.
- **Ketentuan dapat berubah** - tarif, penguncian, dan kelayakan ditetapkan oleh kebijakan perusahaan dan dapat direvisi kapan saja, tidak seperti aturan yang ditegakkan oleh kontrak onchain.
- **Mungkin bukan staking sama sekali** - secara teknis, imbal hasil mungkin berasal dari peminjaman, perdagangan, atau aktivitas lain, bukan dari validator. Anda biasanya tidak memiliki cara untuk memverifikasinya.
- **Risiko pihak lawan** - jika penyedia menjadi bangkrut atau membekukan penarikan, tidak ada apa pun secara onchain yang dapat Anda tebus.

Untuk membedakan pool yang transparan dari produk yang tidak transparan, tanyakan:

1. Dapatkah Anda memverifikasi secara onchain ke mana perginya ETH Anda, dalam kontrak sumber terbuka yang telah diaudit?
2. Apakah set operator node dipublikasikan?
3. Apakah Anda menerima token yang disimpan di dompet Anda sendiri yang dapat ditebus dengan ETH yang mendasarinya?
4. Apakah aturan ditegakkan oleh kontrak pintar dan tata kelola publik, atau oleh ketentuan layanan perusahaan?

Semakin banyak pertanyaan ini yang hanya dapat dijawab oleh penyedia dengan "percayalah pada kami," semakin tidak transparan produk tersebut.

<Alert variant="warning">
<AlertIcon size="lg"><TriangleAlert /></AlertIcon>
<AlertContent>
<AlertDescription>
Beberapa produk mengiklankan imbal hasil yang "ditingkatkan" atau "didorong" dengan menggabungkan staking dengan **staking ulang**, sebuah kasus penggunaan untuk LST yang mengikat ETH yang di-stake untuk mengamankan protokol tambahan di bawah kondisi pemotongan tambahan. Staking ulang adalah kategori risiko terpisah dan aplikasi baru yang dibangun di atas LST, bukan bentuk partisipasi staking langsung. Jika angka imbal hasil secara signifikan lebih tinggi daripada tingkat staking jaringan inti, Anda harus bertanya dari mana tepatnya imbal hasil ekstra tersebut berasal. [Apa itu staking ulang?](/restaking/)
</AlertDescription>
</AlertContent>
</Alert>

## Menjalankan node untuk pool {#run-a-node-for-a-pool}

Menjadi operator node terikat untuk pool staking adalah jalan tengah antara menyimpan token dan staking mandiri. Beberapa protokol staking memungkinkan individu menjalankan validator menggunakan ETH gabungan dari pengguna lain. Anda menempatkan ikatan ETH Anda sendiri sebagai kolateral, menjalankan perangkat keras dan kunci, serta mendapatkan komisi atas stake yang dicocokkan dengan Anda.

Misalnya, validator megapool Rocket Pool mewajibkan ikatan 4 ETH per validator, dan Modul Staking Komunitas Lido mewajibkan sekitar 2,4 ETH untuk kunci validator pertama (1,5 ETH untuk Pelaku Staking Komunitas Teridentifikasi). Ini menawarkan cara bagi orang-orang dengan kurang dari 32 ETH untuk menjalankan perangkat keras mereka sendiri dan memperkuat set operator jaringan, sambil menerima aturan, persyaratan kinerja, dan kondisi penalti pool.

## Apa yang perlu dipertimbangkan {#what-to-consider}

Setiap pool dan alat atau kontrak pintar yang mereka gunakan telah dibangun oleh tim yang berbeda, dan masing-masing memiliki manfaat dan risiko. Staking gabungan atau yang didelegasikan tidak didukung secara bawaan oleh protokol Ethereum, dan standar emas untuk staking harus selalu berupa individu yang menjalankan validator pada perangkat keras mereka sendiri kapan pun memungkinkan.

Indikator atribut digunakan di bawah ini untuk menandai kekuatan atau kelemahan penting yang mungkin dimiliki oleh pool staking yang terdaftar. Gunakan bagian ini sebagai referensi tentang bagaimana kami mendefinisikan atribut-atribut ini saat Anda memilih pool untuk bergabung.

<StakingConsiderations page="pools" />

## Jelajahi pool staking {#explore-staking-pools}

Ada berbagai opsi yang tersedia untuk membantu Anda dengan penyiapan Anda. Gunakan indikator di atas untuk membantu memandu Anda melalui alat-alat di bawah ini.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Harap perhatikan pentingnya memilih layanan yang menganggap serius [keragaman klien](/developers/docs/nodes-and-clients/client-diversity/), karena hal ini meningkatkan keamanan jaringan, dan membatasi risiko Anda. Layanan yang memiliki bukti membatasi penggunaan klien mayoritas ditandai dengan <em style={{ textTransform: "uppercase" }}>"keragaman klien eksekusi"</em> dan <em style={{ textTransform: "uppercase" }}>"keragaman klien konsensus."</em>

Punya saran untuk alat staking yang kami lewatkan? Lihat [kebijakan pencantuman produk](/contributing/adding-staking-products/) kami untuk melihat apakah alat tersebut cocok, dan untuk mengirimkannya agar ditinjau.

<StakingCommunityCallout className="my-16" />

## Pertanyaan yang sering diajukan {#faq}

<ExpandableCard title="Bagaimana cara saya mendapatkan imbalan?">
Biasanya token staking likuid ERC-20 diterbitkan kepada pelaku staking dan mewakili nilai ETH yang mereka stake ditambah imbalan. Imbalan mencapai Anda dengan salah satu dari dua cara tergantung pada desain token: token rebasing meningkatkan saldo token Anda seiring bertambahnya imbalan, sementara token nilai tukar menjaga saldo Anda tetap dan dapat ditebus dengan lebih banyak ETH seiring waktu. Apa pun itu, imbalan didistribusikan bersih setelah dikurangi biaya pool.
</ExpandableCard>

<ExpandableCard title="Kapan saya dapat menarik stake saya?">
Penarikan staking telah diaktifkan sejak peningkatan Shanghai/Capella pada bulan April 2023. Akun validator yang mendukung pool staking dapat keluar dan menarik ETH ke alamat penarikan yang ditunjuk, yang memungkinkan Anda menebus porsi stake Anda untuk ETH yang mendasarinya. Kecepatan penebusan bergantung pada likuiditas yang tersedia di pool Anda dan antrean keluar lapisan konsensus. Periksa dengan penyedia Anda untuk melihat bagaimana mereka mendukung fungsionalitas ini.

Sejak peningkatan Pectra, pool juga dapat menggunakan penarikan yang dipicu lapisan eksekusi (EIP-7002) untuk mengeluarkan validator secara langsung dari alamat penarikan, tanpa bergantung pada kunci penandatanganan operator node, sehingga mengurangi kepercayaan yang diwajibkan agar penebusan dapat dipenuhi.

Sebagai alternatif, pool yang memanfaatkan token staking likuid ERC-20 memungkinkan pengguna untuk memperdagangkan token ini di pasar terbuka, memungkinkan Anda untuk menjual posisi staking Anda, yang secara efektif "menarik" tanpa benar-benar mengeluarkan ETH dari kontrak staking. Perhatikan bahwa harga pasar dapat berbeda dari nilai penebusan token.

<ButtonLink href="/staking/withdrawals/">Lebih lanjut tentang penarikan staking</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Apakah ini berbeda dengan staking di bursa saya?">
Ada banyak kesamaan antara opsi staking gabungan ini dan bursa terpusat, seperti kemampuan untuk melakukan stake sejumlah kecil ETH dan menggabungkannya untuk mengaktifkan validator.

Tidak seperti bursa terpusat, banyak opsi staking gabungan lainnya memanfaatkan kontrak pintar dan/atau token staking likuid, yang biasanya berupa token ERC-20 yang dapat disimpan di dompet Anda sendiri, dan dibeli atau dijual seperti token lainnya. Ini menawarkan lapisan kedaulatan dan keamanan dengan memberi Anda kendali atas token Anda, tetapi tetap tidak memberi Anda kendali langsung atas klien validator yang melakukan atestasi atas nama Anda di latar belakang.

Program "penghasilan" bursa juga bersifat kustodian dan diatur oleh ketentuan perusahaan, bukan aturan onchain, dan imbal hasil mereka mungkin tidak berasal dari staking protokol sama sekali. Lihat [produk gabungan yang tidak transparan](#opaque-pooled-products) untuk mengetahui perbedaannya.

Beberapa opsi penggabungan lebih terdesentralisasi daripada yang lain dalam hal node yang mendukungnya. Untuk mempromosikan kesehatan dan desentralisasi jaringan, pelaku staking selalu didorong untuk memilih layanan penggabungan yang memungkinkan set operator node terdesentralisasi dan tanpa izin.
</ExpandableCard>

## Bacaan lebih lanjut {#further-reading}

- [Direktori Staking Ethereum](https://www.staking.directory/) - _Eridian dan Spacesider_
- [Risiko derivatif staking likuid](https://notes.ethereum.org/@djrtwo/risks-of-lsd) - _Danny Ryan_
- [Apa Itu Staking Likuid?](https://chain.link/education-hub/liquid-staking) - _Chainlink_
- [EIP-7002: Penarikan yang dapat dipicu lapisan eksekusi](https://eips.ethereum.org/EIPS/eip-7002) - _Proposal Peningkatan Ethereum_
- [Peringkat Pool Staking Ethereum](https://explorer.rated.network/) - _Rated Network Explorer_
- [Apa perbedaan antara token staking ulang likuid (LRT) dan token staking likuid (LST)?](https://liquidcollective.io/lst-vs-lrt/) - _Liquid Collective_