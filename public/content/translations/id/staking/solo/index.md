---
title: Melakukan home stake untuk ETH Anda
description: Gambaran umum tentang cara memulai home stake untuk Anda
lang: id
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-solo.png
alt: Leslie seekor badak dengan komputer chipnya sendiri.
sidebarDepth: 2
summaryPoints:
  - Terima imbalan maksimum langsung dari protokol dengan menjaga validator Anda berfungsi dengan baik dan tetap daring
  - Jalankan perangkat keras di beranda dan secara pribadi berkontribusi pada keamanan dan desentralisasi jaringan Ethereum
  - Hapus kepercayaan, dan jangan pernah menyerahkan kendali atas kunci dana Anda
---

## Apa itu home stake? {#what-is-solo-staking}

Home stake adalah tindakan [menjalankan simpul Ethereum](/run-a-node/) yang terhubung ke internet dan menyetorkan 32 ETH untuk mengaktifkan [validator](#faq), yang memberi Anda kemampuan untuk berpartisipasi secara langsung dalam konsensus jaringan.

**Home stake meningkatkan desentralisasi jaringan Ethereum**, membuat Ethereum lebih tahan terhadap penyensoran dan kuat terhadap serangan. Metode penaruhan lainnya mungkin tidak membantu jaringan dengan cara yang sama. Home stake adalah opsi penaruhan terbaik untuk mengamankan Ethereum.

Sebuah simpul Ethereum terdiri dari klien lapisan eksekusi (EL), serta klien lapisan konsensus (CL). Klien-klien ini adalah perangkat lunak yang bekerja bersama, beserta set kunci penandatanganan yang valid, untuk memverifikasi transaksi dan blok, melakukan atestasi pada kepala rantai yang benar, menggabungkan atestasi, dan mengusulkan blok.

Para pelaku home stake bertanggung jawab untuk mengoperasikan perangkat keras yang diperlukan untuk menjalankan klien-klien ini. Sangat disarankan untuk menggunakan mesin khusus untuk ini yang Anda operasikan dari rumah–ini sangat bermanfaat bagi kesehatan jaringan.

Pengguna home stake menerima imbalan langsung dari protokol karena telah memastikan validator mereka berfungsi dengan baik dan daring.

## Mengapa melakukan stake dari rumah? {#why-stake-solo}

Home stake memerlukan tanggung jawab yang lebih besar, tetapi memberikan kendali penuh atas dana dan pengaturan penaruhan Anda.

<CardGrid>
  <Card title="Dapatkan ETH baru" emoji="💸" description="Dapatkan imbalan dalam bentuk ETH langsung dari protokol saat validator Anda online, tanpa potongan dari perantara." />
  <Card title="Kontrol penuh" emoji="🎛️" description="Pegang kunci Anda sendiri. Pilih kombinasi klien dan perangkat keras yang memungkinkan Anda meminimalkan risiko dan berkontribusi terbaik pada kesehatan serta keamanan jaringan. Layanan staking pihak ketiga membuat keputusan ini untuk Anda, dan mereka tidak selalu membuat pilihan yang paling aman." />
  <Card title="Keamanan jaringan" emoji="🔐" description="Staking di rumah adalah cara staking yang paling berdampak. Dengan menjalankan validator di perangkat keras Anda sendiri di rumah, Anda memperkuat ketahanan, desentralisasi, dan keamanan protokol Ethereum." />
</CardGrid>

## Pertimbangan sebelum melakukan home stake {#considerations-before-staking-solo}

Meskipun kami berharap home stake dapat diakses dan bebas risiko untuk semua orang, kenyataannya tidak demikian. Ada beberapa pertimbangan praktis dan serius yang perlu diingat sebelum memilih untuk melakukan home stake pada ETH Anda.

<InfoGrid>
<ExpandableCard title="Bacaan wajib" eventCategory="SoloStaking" eventName="clicked required reading">
Saat mengoperasikan simpul Anda sendiri, Anda harus meluangkan waktu untuk mempelajari cara menggunakan perangkat lunak yang telah Anda pilih. Ini melibatkan membaca dokumentasi yang relevan dan mengikuti saluran komunikasi dari tim pengembang tersebut.

Semakin Anda memahami perangkat lunak yang Anda jalankan dan cara kerja bukti taruhan (proof-of-stake), semakin kecil risikonya sebagai seorang penaruh, dan akan semakin mudah untuk memperbaiki masalah apa pun yang mungkin muncul sebagai operator simpul. </ExpandableCard>

<ExpandableCard title="Terbiasa dengan komputer" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
Penyiapan simpul memerlukan tingkat kenyamanan yang wajar saat bekerja dengan komputer, meskipun alat-alat baru membuatnya lebih mudah seiring waktu. Pemahaman tentang antarmuka baris perintah sangat membantu, tetapi tidak lagi diwajibkan secara ketat.

Ini juga memerlukan penyiapan perangkat keras yang sangat dasar, dan pemahaman tentang spesifikasi minimum yang direkomendasikan. </ExpandableCard>

<ExpandableCard title="Manajemen kunci yang aman" eventCategory="SoloStaking" eventName="clicked secure key management">
Sama seperti kunci pribadi yang mengamankan alamat Ethereum Anda, Anda perlu membuat kunci khusus untuk validator Anda. Anda harus memahami cara menjaga frasa benih atau kunci pribadi apa pun agar tetap aman dan terlindungi.{' '}

[Keamanan dan pencegahan penipuan Ethereum](/security/) </ExpandableCard>

<ExpandableCard title="Pemeliharaan" eventCategory="SoloStaking" eventName="clicked maintenance">
Perangkat keras terkadang gagal, koneksi jaringan bermasalah, dan perangkat lunak klien terkadang perlu ditingkatkan. Pemeliharaan simpul tidak dapat dihindari dan terkadang akan membutuhkan perhatian Anda. Anda harus memastikan bahwa Anda tetap mengetahui adanya pemutakhiran jaringan yang diantisipasi, atau pemutakhiran klien penting lainnya.
</ExpandableCard>

<ExpandableCard title="Uptime yang andal" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Imbalan Anda sebanding dengan waktu validator Anda online dan melakukan atestasi dengan benar. Waktu henti (downtime) menimbulkan penalti yang sebanding dengan jumlah validator lain yang offline pada saat yang sama, tetapi <a href="#faq">tidak mengakibatkan pemotongan (slashing)</a>. Lebar pita (Bandwidth) juga penting, karena imbalan akan berkurang untuk atestasi yang tidak diterima tepat waktu. Persyaratan akan bervariasi, tetapi direkomendasikan minimal 10 Mb/s untuk unggah dan unduh.
</ExpandableCard>

<ExpandableCard title="Risiko pemotongan" eventCategory="SoloStaking" eventName="clicked slashing risk">
Berbeda dari penalti ketidakaktifan karena sedang offline, <em>slashing (pemotongan)</em> adalah penalti yang jauh lebih serius yang diperuntukkan bagi pelanggaran berbahaya. Dengan menjalankan klien minoritas dengan kunci Anda dimuat hanya di satu mesin pada satu waktu, risiko Anda terkena pemotongan (slashing) dapat diminimalkan. Meskipun demikian, semua penaruh harus menyadari risiko pemotongan (slashing).

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Lebih lanjut tentang pemotongan dan siklus hidup validator</a> </ExpandableCard> </InfoGrid>

<StakingComparison page="solo" />

## Bagaimana cara kerjanya {#how-it-works}

<StakingHowSoloWorks />

Saat aktif, Anda akan mendapatkan rewards ETH, yang akan secara berkala disetor ke alamat penarikan Anda.

Jika diinginkan, Anda dapat keluar sebagai validator, yang menghilangkan persyaratan untuk online dan menghentikan imbalan lebih lanjut. Saldo Anda yang tersisa kemudian akan ditarik ke alamat penarikan yang Anda tentukan selama penyiapan.

[Selengkapnya tentang penarikan penaruhan](/staking/withdrawals/)

## Memulai di Landasan Peluncuran Penaruhan {#get-started-on-the-staking-launchpad}

Landasan Peluncuran Penaruhan (Staking Launchpad) adalah aplikasi sumber terbuka yang akan membantu Anda menjadi seorang penaruh. Ini akan memandu Anda dalam memilih klien, membuat kunci, dan menyetorkan ETH Anda ke kontrak deposit penaruhan. Disediakan daftar periksa untuk memastikan Anda telah melakukan semua hal untuk menyiapkan validator Anda dengan aman.

<StakingLaunchpadWidget />

## Hal yang perlu dipertimbangkan dengan alat penyiapan simpul dan klien {#node-tool-considerations}

Ada banyak perangkat dan layanan yang bisa membantu Anda melakukan home stake ETH, tetapi setiap opsi memiliki manfaat dan risikonya sendiri.

Indikator atribut digunakan di bawah ini untuk menandakan kekuatan atau kelemahan penting yang mungkin dimiliki oleh alat penaruhan yang terdaftar. Gunakan bagian ini sebagai referensi tentang cara kami mendefinisikan atribut-atribut ini saat Anda memilih alat untuk membantu perjalanan penaruhan Anda.

<StakingConsiderations page="solo" />

## Jelajahi alat penyiapan simpul dan klien {#node-and-client-tools}

Terdapat berbagai pilihan yang tersedia untuk membantu Anda dengan pengaturan Anda. Gunakan petunjuk di atas untuk membantu Anda memandu melalui perangkat di bawah ini.

<ProductDisclaimer />

### Perangkat simpul

<StakingProductsCardGrid category="nodeTools" />

Harap perhatikan pentingnya memilih [klien minoritas](/developers/docs/nodes-and-clients/client-diversity/) karena ini meningkatkan keamanan jaringan, dan membatasi risiko Anda. Alat yang memungkinkan Anda untuk menyiapkan klien minoritas ditandai sebagai <em style={{ textTransform: "uppercase" }}>"multi-klien."</em>

### Pembangkit Kunci

Alat ini dapat digunakan sebagai alternatif untuk [Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli/) untuk membantu pembuatan kunci.

<StakingProductsCardGrid category="keyGen" />

Punya saran untuk alat penaruhan yang kami lewatkan? Lihat [kebijakan daftar produk](/contributing/adding-staking-products/) kami untuk melihat apakah cocok, dan untuk mengirimkannya untuk ditinjau.

## Jelajahi panduan home stake {#staking-guides}

<StakingGuides />

## Pertanyaan yang sering diajukan {#faq}

Berikut adalah beberapa pertanyaan umum tentang penaruhan yang layak diketahui.

<ExpandableCard title="Apa itu validator?">

Sebuah <em>validator</em> adalah entitas virtual yang hidup di Ethereum dan berpartisipasi dalam konsensus protokol Ethereum. Validator direpresentasikan oleh saldo, kunci publik, dan properti lainnya. Sebuah <em>klien validator</em> adalah perangkat lunak yang bertindak atas nama validator dengan memegang dan menggunakan kunci pribadinya. Satu klien validator dapat memegang banyak pasang kunci, yang mengendalikan banyak validator.

</ExpandableCard>

<ExpandableCard title="Bisakah saya deposit lebih dari 32 ETH?">
Ya, akun validator modern mampu menampung hingga 2048 ETH. ETH tambahan di atas 32 akan bertambah secara bertahap, meningkat dalam kenaikan bilangan bulat seiring dengan peningkatan saldo Anda yang sebenarnya. Ini dikenal sebagai <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">saldo efektif</a> Anda.

Untuk meningkatkan saldo efektif suatu akun, dan dengan demikian meningkatkan imbalan, penyangga (buffer) sebesar 0,25 ETH di atas ambang batas ETH penuh harus dilewati. Misalnya, sebuah akun dengan saldo asli 32,9 dan saldo efektif 32 perlu mendapatkan 0,35 ETH lagi untuk menaikkan saldo aslinya di atas 33,25 sebelum memicu peningkatan saldo efektif.

Buffer ini juga mencegah saldo efektif turun hingga mencapai 0,25 ETH di bawah saldo efektif saat ini.

Setiap pasang kunci yang terkait dengan validator memerlukan setidaknya 32 ETH untuk diaktifkan. Saldo apa pun di atas ini dapat ditarik ke alamat penarikan terkait kapan saja melalui transaksi yang ditandatangani oleh alamat ini. Dana apa pun yang melebihi saldo efektif maksimum akan ditarik secara otomatis secara berkala.

Jika home stake tampaknya terlalu menantang bagi Anda, pertimbangkan untuk menggunakan penyedia [staking-as-a-service](/staking/saas/), atau jika Anda memiliki kurang dari 32 ETH, lihat [staking pool](/staking/pools/). </ExpandableCard>

<ExpandableCard title="Apakah saya akan dipotong jika saya offline? (Singkatnya: Tidak.)">
Menjadi offline saat jaringan sedang melakukan finalisasi dengan benar TIDAK akan mengakibatkan pemotongan (slashing). Penalti kecil <em>ketidakaktifan</em> akan dikenakan jika validator Anda tidak tersedia untuk melakukan atestasi pada epoch tertentu (masing-masing selama 6,4 menit), tetapi ini sangat berbeda dengan <em>slashing (pemotongan)</em>. Penalti ini sedikit lebih kecil dari imbalan yang akan Anda peroleh seandainya validator tersedia untuk melakukan atestasi, dan kerugian dapat diperoleh kembali dengan perkiraan waktu yang sama saat kembali online.

Perhatikan bahwa penalti untuk ketidakaktifan sebanding dengan jumlah validator yang offline pada saat yang bersamaan. Dalam kasus di mana sebagian besar jaringan semuanya offline sekaligus, penalti untuk setiap validator ini akan lebih besar daripada ketika satu validator tidak tersedia.

Dalam kasus ekstrem jika jaringan berhenti melakukan finalisasi akibat lebih dari sepertiga validator offline, para pengguna ini akan mengalami apa yang dikenal sebagai <em>kebocoran ketidakaktifan kuadratik</em>, yang merupakan pengurasan ETH secara eksponensial dari akun validator yang offline. Hal ini memungkinkan jaringan untuk pada akhirnya pulih sendiri dengan membakar ETH dari validator yang tidak aktif hingga saldo mereka mencapai 16 ETH, pada titik mana mereka akan secara otomatis dikeluarkan dari pool validator. Validator online yang tersisa pada akhirnya akan terdiri lebih dari 2/3 jaringan lagi, memenuhi supermayoritas yang dibutuhkan untuk sekali lagi menyelesaikan finalisasi rantai. </ExpandableCard>

<ExpandableCard title="Bagaimana cara memastikan saya tidak dipotong?">Singkatnya, ini tidak pernah dapat dijamin sepenuhnya, tetapi jika Anda bertindak dengan itikad baik, menjalankan klien minoritas, dan hanya menyimpan kunci penandatanganan Anda di satu mesin pada satu waktu, risiko terkena pemotongan hampir nol.

Hanya ada beberapa cara khusus yang dapat mengakibatkan validator terkena pemotongan dan dikeluarkan dari jaringan. Pada saat penulisan ini, pemotongan yang telah terjadi secara eksklusif merupakan produk dari pengaturan perangkat keras yang berlebihan di mana kunci penandatanganan disimpan di dua mesin terpisah sekaligus. Hal ini secara tidak sengaja dapat mengakibatkan <em>pemungutan suara ganda</em> dari kunci Anda, yang merupakan pelanggaran yang dapat dikenai sanksi pemotongan.

Menjalankan klien supermayoritas (klien apa pun yang digunakan oleh lebih dari 2/3 jaringan) juga membawa risiko potensi pemotongan jika klien ini memiliki bug yang mengakibatkan fork rantai. Hal ini dapat mengakibatkan fork yang salah yang akhirnya difinalisasi. Untuk mengoreksi kembali ke rantai yang dimaksud, diperlukan pengajuan <em>surround vote</em> dengan mencoba membatalkan blok yang telah difinalisasi. Ini juga merupakan pelanggaran yang dapat dikenai sanksi pemotongan dan dapat dihindari hanya dengan menjalankan klien minoritas.

Bugs serupa dalam klien <em>minoritas tidak akan pernah difinalisasi</em> dan oleh karena itu tidak akan mengakibatkan suara perkeliling, dan hanya akan mengakibatkan hukuman ketidakaktifan, <em>bukan pemotongan</em>.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">Pelajari lebih lanjut tentang pentingnya menjalankan klien minoritas.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Pelajari lebih lanjut tentang pencegahan pemotongan</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Klien mana yang terbaik?">
Klien individual mungkin sedikit berbeda dalam hal kinerja dan antarmuka pengguna, karena masing-masing dikembangkan oleh tim yang berbeda menggunakan berbagai bahasa pemrograman. Meskipun begitu, tidak ada satu pun dari mereka yang "terbaik." Semua klien produksi adalah perangkat lunak yang sangat baik, yang semuanya menjalankan fungsi inti yang sama untuk menyinkronkan dan berinteraksi dengan rantai blok.

Karena semua klien produksi menyediakan fungsionalitas dasar yang sama, sebenarnya sangat penting bagi Anda untuk memilih <strong>klien minoritas</strong>, yang berarti klien apa pun yang TIDAK sedang digunakan oleh mayoritas validator di jaringan. Ini mungkin terdengar berlawanan dengan intuisi, tetapi menjalankan klien mayoritas atau supermayoritas menempatkan Anda pada risiko pemotongan yang lebih tinggi jika terjadi bug pada klien tersebut. Menjalankan klien minoritas secara drastis membatasi risiko-risiko ini.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Pelajari lebih lanjut mengapa keragaman klien sangat penting</a> </ExpandableCard>

<ExpandableCard title="Bisakah saya hanya menggunakan VPS (server pribadi virtual)?">
Meskipun server pribadi virtual (VPS) dapat digunakan sebagai pengganti perangkat keras di rumah, akses fisik dan lokasi klien validator Anda <em>memang penting</em>. Solusi cloud terpusat seperti Amazon Web Services atau Digital Ocean memberikan kemudahan karena tidak harus mendapatkan dan mengoperasikan perangkat keras, dengan mengorbankan sentralisasi jaringan.

Semakin banyak klien validator yang berjalan pada satu solusi penyimpanan cloud terpusat, semakin berbahaya bagi pengguna-pengguna ini. Setiap peristiwa yang membuat penyedia ini offline, baik karena serangan, tuntutan peraturan, atau hanya pemadaman listrik/internet, akan mengakibatkan setiap klien validator yang bergantung pada server ini menjadi offline pada saat yang sama.

Penalti offline sebanding dengan berapa banyak orang lain yang offline pada saat yang sama. Menggunakan VPS sangat meningkatkan risiko bahwa penalti offline akan lebih parah, dan meningkatkan risiko kebocoran kuadratik atau pemotongan jika pemadaman cukup besar. Untuk meminimalkan risiko Anda sendiri, dan risiko bagi jaringan, pengguna sangat dianjurkan untuk mendapatkan dan mengoperasikan perangkat keras mereka sendiri. </ExpandableCard>

<ExpandableCard title="Bagaimana cara membuka imbalan atau mendapatkan kembali ETH saya?">

Penarikan apa pun dari Rantai Suar memerlukan pengaturan kredensial penarikan.

Para penaruh baru mengatur ini pada saat pembuatan dan penyetoran kunci. Para penaruh yang sudah ada yang belum mengaturnya dapat memutakhirkan kunci mereka untuk mendukung fungsionalitas ini.

Setelah kredensial penarikan diatur, pembayaran imbalan (ETH yang terakumulasi di atas 32 awal) akan secara berkala didistribusikan ke alamat penarikan secara otomatis.

Untuk membuka dan menerima seluruh saldo Anda kembali, Anda juga harus menyelesaikan proses keluar dari validator Anda.

<ButtonLink href="/staking/withdrawals/">Selengkapnya tentang penarikan penaruhan</ButtonLink> </ExpandableCard>

## Bacaan lebih lanjut {#further-reading}

- [Direktori Penaruhan Ethereum](https://www.staking.directory/) - _Eridian dan Spacesider_
- [Masalah Keragaman Klien Ethereum](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [Membantu Keragaman Klien](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Keragaman klien di lapisan konsensus Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [Cara: Membeli Perangkat Keras Validator Ethereum](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [Kiat Pencegahan Pemotongan Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />
