---
title: Mengunci ETH Anda dari rumah
description: Gambaran umum tentang cara memulai mengunci ETH Anda dari rumah
lang: id
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-solo.png
alt: Badak Leslie di atas chip komputernya sendiri.
sidebarDepth: 2
summaryPoints:
  - Menerima hadiah maksimum langsung dari protokol karena menjaga validator Anda berfungsi dengan baik dan online
  - Menjalankan perangkat keras di rumah dan secara pribadi menambah keamanan dan desentralisasi jaringan Ethereum
  - Menghilangkan kepercayaan, dan tidak pernah menyerahkan kendali atas kunci dana Anda
---

## Apa itu mengunci dari rumah? {#what-is-solo-staking}

Mengunci dari rumah adalah tindakan [menjalankan node Ethereum](/run-a-node/) yang terhubung ke internet dan mendepositkan 32 ETH untuk mengaktifkan [validator](#faq), memberi Anda kemampuan untuk berpartisipasi langsung dalam konsensus jaringan.

**Mengunci dari rumah meningkatkan desentralisasi jaringan Ethereum**, membuat [Ethereum](/) lebih tahan terhadap sensor dan kuat terhadap serangan. Metode mengunci lainnya mungkin tidak membantu jaringan dengan cara yang sama. Mengunci dari rumah adalah opsi mengunci terbaik untuk mengamankan Ethereum.

Sebuah node Ethereum terdiri dari klien lapisan eksekusi (EL), serta klien lapisan konsensus (CL). Klien-klien ini adalah perangkat lunak yang bekerja bersama, bersama dengan serangkaian kunci penandatanganan yang valid, untuk memverifikasi transaksi dan blok, mengesahkan kepala rantai yang benar, menggabungkan pengesahan, dan mengusulkan blok.

Staker dari rumah bertanggung jawab untuk mengoperasikan perangkat keras yang diperlukan untuk menjalankan klien-klien ini. Sangat disarankan untuk menggunakan mesin khusus untuk ini yang Anda operasikan dari rumah–ini sangat bermanfaat bagi kesehatan jaringan.

Seorang staker dari rumah menerima hadiah langsung dari protokol karena menjaga validator mereka berfungsi dengan baik dan online.

## Mengapa mengunci dari rumah? {#why-stake-solo}

Mengunci dari rumah datang dengan lebih banyak tanggung jawab tetapi memberi Anda kendali maksimum atas dana dan pengaturan mengunci Anda.

<CardGrid>
  <Card title="Dapatkan ETH baru" emoji="💸" description="Dapatkan hadiah dalam denominasi ETH langsung dari protokol saat validator Anda online, tanpa ada perantara yang mengambil potongan." />
  <Card title="Kendali penuh" emoji="🎛️" description="Simpan kunci Anda sendiri. Pilih kombinasi klien dan perangkat keras yang memungkinkan Anda meminimalkan risiko dan berkontribusi terbaik pada kesehatan dan keamanan jaringan. Layanan mengunci pihak ketiga membuat keputusan ini untuk Anda, dan mereka tidak selalu membuat pilihan yang paling aman." />
  <Card title="Keamanan jaringan" emoji="🔐" description="Mengunci dari rumah adalah cara paling berdampak untuk mengunci. Dengan menjalankan validator di perangkat keras Anda sendiri di rumah, Anda memperkuat ketahanan, desentralisasi, dan keamanan protokol Ethereum." />
</CardGrid>

## Pertimbangan sebelum mengunci dari rumah {#considerations-before-staking-solo}

Meskipun kami berharap mengunci dari rumah dapat diakses dan bebas risiko bagi semua orang, ini bukanlah kenyataan. Ada beberapa pertimbangan praktis dan serius yang perlu diingat sebelum memilih untuk mengunci ETH Anda dari rumah.

<InfoGrid>
<ExpandableCard title="Bacaan wajib" eventCategory="SoloStaking" eventName="clicked required reading">
Saat mengoperasikan node Anda sendiri, Anda harus meluangkan waktu untuk mempelajari cara menggunakan perangkat lunak yang telah Anda pilih. Ini melibatkan membaca dokumentasi yang relevan dan peka terhadap saluran komunikasi dari tim pengembang tersebut.

Semakin Anda memahami tentang perangkat lunak yang Anda jalankan dan bagaimana proof-of-stake bekerja, semakin kecil risikonya sebagai staker, dan semakin mudah untuk memperbaiki masalah apa pun yang mungkin timbul di sepanjang jalan sebagai operator node.
</ExpandableCard>

<ExpandableCard title="Terbiasa dengan komputer" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
Pengaturan node membutuhkan tingkat kenyamanan yang wajar saat bekerja dengan komputer, meskipun alat-alat baru membuatnya lebih mudah seiring waktu. Pemahaman tentang antarmuka baris perintah sangat membantu, tetapi tidak lagi diwajibkan secara ketat.

Ini juga membutuhkan pengaturan perangkat keras yang sangat mendasar, dan beberapa pemahaman tentang spesifikasi minimum yang disarankan.
</ExpandableCard>

<ExpandableCard title="Manajemen kunci yang aman" eventCategory="SoloStaking" eventName="clicked secure key management">
Sama seperti bagaimana kunci pribadi mengamankan alamat Ethereum Anda, Anda perlu membuat kunci khusus untuk validator Anda. Anda harus memahami cara menjaga frasa seed atau kunci pribadi apa pun tetap aman dan terlindungi.{' '}

[Keamanan Ethereum dan pencegahan penipuan](/security/)
</ExpandableCard>

<ExpandableCard title="Pemeliharaan" eventCategory="SoloStaking" eventName="clicked maintenance">
Perangkat keras terkadang gagal, koneksi jaringan mengalami kesalahan, dan perangkat lunak klien terkadang perlu ditingkatkan. Pemeliharaan node tidak dapat dihindari dan terkadang akan membutuhkan perhatian Anda. Anda pasti ingin memastikan Anda tetap mengetahui setiap peningkatan jaringan yang diantisipasi, atau peningkatan klien penting lainnya.
</ExpandableCard>

<ExpandableCard title="Waktu aktif yang andal" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Hadiah Anda sebanding dengan waktu validator Anda online dan mengesahkan dengan benar. Waktu henti (downtime) menimbulkan penalti yang sebanding dengan berapa banyak validator lain yang offline pada saat yang sama, tetapi <a href="#faq">tidak mengakibatkan pemotongan</a>. Bandwidth juga penting, karena hadiah dikurangi untuk pengesahan yang tidak diterima tepat waktu. Persyaratan akan bervariasi, tetapi disarankan minimal 10 Mb/s untuk unggah dan unduh.
</ExpandableCard>

<ExpandableCard title="Risiko pemotongan" eventCategory="SoloStaking" eventName="clicked slashing risk">
Berbeda dengan penalti ketidakaktifan karena offline, <em>pemotongan</em> adalah penalti yang jauh lebih serius yang dikhususkan untuk pelanggaran berbahaya. Dengan menjalankan klien minoritas dengan kunci Anda dimuat hanya pada satu mesin pada satu waktu, risiko Anda terkena pemotongan diminimalkan. Meskipun demikian, semua staker harus menyadari risiko pemotongan.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Lebih lanjut tentang pemotongan dan siklus hidup validator</a>
</ExpandableCard>

</InfoGrid>

<StakingComparison page="solo" />

## Bagaimana cara kerjanya {#how-it-works}

<StakingHowSoloWorks />

Saat aktif Anda akan mendapatkan hadiah ETH, yang akan secara berkala didepositkan ke alamat penarikan Anda.

Jika diinginkan, Anda dapat keluar sebagai validator yang menghilangkan persyaratan untuk online, dan menghentikan hadiah lebih lanjut. Saldo Anda yang tersisa kemudian akan ditarik ke alamat penarikan yang Anda tentukan selama pengaturan.

[Lebih lanjut tentang penarikan mengunci](/staking/withdrawals/)

## Mulai di Staking Launchpad {#get-started-on-the-staking-launchpad}

Staking Launchpad adalah aplikasi sumber terbuka yang akan membantu Anda menjadi staker. Ini akan memandu Anda dalam memilih klien Anda, membuat kunci Anda, dan mendepositkan ETH Anda ke kontrak deposit mengunci. Sebuah daftar periksa disediakan untuk memastikan Anda telah mencakup semuanya agar validator Anda diatur dengan aman.

<StakingLaunchpadWidget />

## Apa yang perlu dipertimbangkan dengan alat pengaturan node dan klien {#node-tool-considerations}

Ada semakin banyak alat dan layanan untuk membantu Anda mengunci ETH Anda dari rumah, tetapi masing-masing datang dengan risiko dan manfaat yang berbeda.

Indikator atribut digunakan di bawah ini untuk menandakan kekuatan atau kelemahan penting yang mungkin dimiliki oleh alat mengunci yang terdaftar. Gunakan bagian ini sebagai referensi tentang bagaimana kami mendefinisikan atribut-atribut ini saat Anda memilih alat apa yang akan membantu perjalanan mengunci Anda.

<StakingConsiderations page="solo" />

## Jelajahi alat pengaturan node dan klien {#node-and-client-tools}

Ada berbagai opsi yang tersedia untuk membantu Anda dengan pengaturan Anda. Gunakan indikator di atas untuk membantu memandu Anda melalui alat-alat di bawah ini.

<ProductDisclaimer />

### Alat node

<StakingProductsCardGrid category="nodeTools" />

Harap perhatikan pentingnya memilih [klien minoritas](/developers/docs/nodes-and-clients/client-diversity/) karena ini meningkatkan keamanan jaringan, dan membatasi risiko Anda. Alat yang memungkinkan Anda mengatur klien minoritas dilambangkan sebagai <em style={{ textTransform: "uppercase" }}>"multi-klien."</em>

### Pembuat Kunci

Alat-alat ini dapat digunakan sebagai alternatif dari [Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli/) untuk membantu pembuatan kunci.

<StakingProductsCardGrid category="keyGen" />

Punya saran untuk alat mengunci yang kami lewatkan? Lihat [kebijakan daftar produk](/contributing/adding-staking-products/) kami untuk melihat apakah itu cocok, dan untuk mengirimkannya agar ditinjau.

## Jelajahi panduan mengunci dari rumah {#staking-guides}

<StakingGuides />

## Pertanyaan yang sering diajukan {#faq}

Ini adalah beberapa pertanyaan paling umum tentang mengunci yang patut diketahui.

<ExpandableCard title="Apa itu validator?">

Sebuah <em>validator</em> adalah entitas virtual yang hidup di Ethereum dan berpartisipasi dalam konsensus protokol Ethereum. Validator diwakili oleh saldo, kunci publik, dan properti lainnya. Sebuah <em>klien validator</em> adalah perangkat lunak yang bertindak atas nama validator dengan memegang dan menggunakan kunci pribadinya. Satu klien validator dapat memegang banyak pasangan kunci, mengendalikan banyak validator.
</ExpandableCard>

<ExpandableCard title="Bisakah saya menyetor lebih dari 32 ETH?">
Ya, akun validator modern mampu menampung hingga 2048 ETH. ETH tambahan di atas 32 akan digabungkan secara bertahap, meningkat dalam kelipatan bilangan bulat seiring dengan peningkatan saldo Anda yang sebenarnya. Ini dikenal sebagai <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">saldo efektif</a> Anda.

Untuk meningkatkan saldo efektif suatu akun, dan dengan demikian meningkatkan hadiah, penyangga sebesar 0,25 ETH di atas ambang batas ETH penuh harus dilewati. Misalnya, akun dengan saldo sebenarnya 32,9 dan saldo efektif 32 perlu mendapatkan 0,35 ETH lagi untuk membawa saldo sebenarnya di atas 33,25 sebelum memicu peningkatan saldo efektif.

Penyangga ini juga mencegah saldo efektif turun hingga mencapai 0,25 ETH di bawah saldo efektifnya saat ini.

Setiap pasangan kunci yang terkait dengan validator memerlukan setidaknya 32 ETH untuk diaktifkan. Saldo apa pun di atas ini dapat ditarik ke alamat penarikan terkait kapan saja melalui transaksi yang ditandatangani oleh alamat ini. Dana apa pun di atas saldo efektif maksimum akan ditarik secara otomatis secara berkala.

Jika mengunci dari rumah tampaknya terlalu menuntut bagi Anda, pertimbangkan untuk menggunakan penyedia [staking-as-a-service](/staking/saas/), atau jika Anda bekerja dengan kurang dari 32 ETH, periksa [kolam staking](/staking/pools/).
</ExpandableCard>

<ExpandableCard title="Apakah saya akan terkena pemotongan jika saya offline? (singkatnya: Tidak.)">
Menjadi offline saat jaringan menyelesaikan dengan benar TIDAK akan mengakibatkan pemotongan. <em>Penalti ketidakaktifan</em> kecil dikenakan jika validator Anda tidak tersedia untuk mengesahkan pada epoch tertentu (masing-masing berdurasi 6,4 menit), tetapi ini sangat berbeda dengan <em>pemotongan</em>. Penalti ini sedikit lebih kecil dari hadiah yang akan Anda peroleh seandainya validator tersedia untuk mengesahkan, dan kerugian dapat diperoleh kembali dengan jumlah waktu yang kira-kira sama saat kembali online.

Perhatikan bahwa penalti untuk ketidakaktifan sebanding dengan berapa banyak validator yang offline pada saat yang sama. Dalam kasus di mana sebagian besar jaringan semuanya offline sekaligus, penalti untuk masing-masing validator ini akan lebih besar daripada saat satu validator tidak tersedia.

Dalam kasus ekstrem jika jaringan berhenti menyelesaikan sebagai akibat dari lebih dari sepertiga validator offline, pengguna ini akan menderita apa yang dikenal sebagai <em>kebocoran ketidakaktifan kuadratik</em>, yang merupakan pengurasan eksponensial ETH dari akun validator offline. Ini memungkinkan jaringan untuk akhirnya menyembuhkan dirinya sendiri dengan membakar ETH dari validator yang tidak aktif hingga saldo mereka mencapai 16 ETH, pada titik mana mereka akan secara otomatis dikeluarkan dari kumpulan validator. Validator online yang tersisa pada akhirnya akan terdiri dari lebih dari 2/3 jaringan lagi, memenuhi supermayoritas yang diperlukan untuk sekali lagi menyelesaikan rantai.
</ExpandableCard>

<ExpandableCard title="Bagaimana saya memastikan saya tidak terkena pemotongan?">
Singkatnya, ini tidak pernah dapat dijamin sepenuhnya, tetapi jika Anda bertindak dengan itikad baik, menjalankan klien minoritas dan hanya menyimpan kunci penandatanganan Anda di satu mesin pada satu waktu, risiko terkena pemotongan hampir nol.

Hanya ada beberapa cara spesifik yang dapat mengakibatkan validator terkena pemotongan dan dikeluarkan dari jaringan. Pada saat penulisan, pemotongan yang telah terjadi secara eksklusif merupakan produk dari pengaturan perangkat keras yang berlebihan di mana kunci penandatanganan disimpan di dua mesin terpisah sekaligus. Ini secara tidak sengaja dapat mengakibatkan <em>suara ganda</em> dari kunci Anda, yang merupakan pelanggaran yang dapat dipotong.

Menjalankan klien supermayoritas (klien mana pun yang digunakan oleh lebih dari 2/3 jaringan) juga memiliki risiko potensi pemotongan jika klien ini memiliki bug yang mengakibatkan fork rantai. Ini dapat mengakibatkan fork yang salah yang diselesaikan. Untuk mengoreksi kembali ke rantai yang dimaksud akan memerlukan pengiriman <em>suara keliling (surround vote)</em> dengan mencoba membatalkan blok yang telah diselesaikan. Ini juga merupakan pelanggaran yang dapat dipotong dan dapat dihindari hanya dengan menjalankan klien minoritas sebagai gantinya.

Bug yang setara dalam <em>klien minoritas tidak akan pernah diselesaikan</em> dan dengan demikian tidak akan pernah menghasilkan suara keliling, dan hanya akan menghasilkan penalti ketidakaktifan, <em>bukan pemotongan</em>.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">Pelajari lebih lanjut tentang pentingnya menjalankan klien minoritas.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Pelajari lebih lanjut tentang pencegahan pemotongan</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Klien mana yang terbaik?">
Klien individu mungkin sedikit berbeda dalam hal kinerja dan antarmuka pengguna, karena masing-masing dikembangkan oleh tim yang berbeda menggunakan berbagai bahasa pemrograman. Meskipun demikian, tidak ada satupun yang "terbaik." Semua klien produksi adalah perangkat lunak yang sangat baik, yang semuanya melakukan fungsi inti yang sama untuk menyinkronkan dan berinteraksi dengan blockchain.

Karena semua klien produksi menyediakan fungsionalitas dasar yang sama, sebenarnya sangat penting bagi Anda untuk memilih <strong>klien minoritas</strong>, yang berarti klien mana pun yang TIDAK sedang digunakan oleh mayoritas validator di jaringan. Ini mungkin terdengar berlawanan dengan intuisi, tetapi menjalankan klien mayoritas atau supermayoritas menempatkan Anda pada peningkatan risiko pemotongan jika terjadi bug pada klien tersebut. Menjalankan klien minoritas secara drastis membatasi risiko ini.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Pelajari lebih lanjut tentang mengapa keragaman klien sangat penting</a>
</ExpandableCard>

<ExpandableCard title="Bisakah saya menggunakan VPS (server pribadi virtual) saja?">
Meskipun server pribadi virtual (VPS) dapat digunakan sebagai pengganti perangkat keras rumah, akses fisik dan lokasi klien validator Anda <em>memang penting</em>. Solusi cloud terpusat seperti Amazon Web Services atau Digital Ocean memberikan kenyamanan karena tidak perlu mendapatkan dan mengoperasikan perangkat keras, dengan mengorbankan sentralisasi jaringan.

Semakin banyak klien validator yang berjalan pada satu solusi penyimpanan cloud terpusat, semakin berbahaya bagi para pengguna ini. Setiap peristiwa yang membuat penyedia ini offline, baik karena serangan, tuntutan peraturan, atau hanya pemadaman listrik/internet, akan mengakibatkan setiap klien validator yang bergantung pada server ini menjadi offline pada saat yang sama.

Penalti offline sebanding dengan berapa banyak orang lain yang offline pada saat yang sama. Menggunakan VPS sangat meningkatkan risiko bahwa penalti offline akan lebih parah, dan meningkatkan risiko kebocoran kuadratik atau pemotongan jika pemadaman cukup besar. Untuk meminimalkan risiko Anda sendiri, dan risiko terhadap jaringan, pengguna sangat disarankan untuk mendapatkan dan mengoperasikan perangkat keras mereka sendiri.
</ExpandableCard>

<ExpandableCard title="Bagaimana cara menarik hadiah saya atau mendapatkan kembali ETH saya?">

Penarikan dalam bentuk apa pun dari Beacon Chain memerlukan kredensial penarikan untuk diatur.

Staker baru mengatur ini pada saat pembuatan kunci dan deposit. Staker yang ada yang belum mengatur ini dapat meningkatkan kunci mereka untuk mendukung fungsionalitas ini.

Setelah kredensial penarikan diatur, pembayaran hadiah (akumulasi ETH di atas 32 awal) akan didistribusikan secara berkala ke alamat penarikan secara otomatis.

Untuk membuka kunci dan menerima kembali seluruh saldo Anda, Anda juga harus menyelesaikan proses keluar dari validator Anda.

<ButtonLink href="/staking/withdrawals/">Lebih lanjut tentang penarikan mengunci</ButtonLink>
</ExpandableCard>

## Bacaan lebih lanjut {#further-reading}

- [Direktori Mengunci Ethereum](https://www.staking.directory/) - _Eridian dan Spacesider_
- [Masalah Keragaman Klien Ethereum](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [Membantu Keragaman Klien](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Keragaman klien pada lapisan konsensus Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [Cara: Berbelanja Perangkat Keras Validator Ethereum](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [Tips Pencegahan Pemotongan Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />