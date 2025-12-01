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

Home stake adalah aktivitas [menjalankan suatu simpul Ethereum](/run-a-node/) yang terhubung ke internet dan menyimpan 32 ETH untuk menjalankan [validator](#faq), sehingga Anda dapat berpartisipasi secara langsung dalam konsensus jaringan.

**Home stake meningkatkan desentralisasi jaringan Ethereum**, yang membuat Ethereum lebih tahan sensor dan serangan. Metode penaruhan lain mungkin tidak membantu jaringan dengan cara yang sama. Home stake adalah opsi penaruhan terbaik untuk mengamankan Ethereum.

Sebuah simpul Ethereum terdiri dari klien lapisan eksekusi (EL) dan juga klien lapisan konsensus (CL). Klien-klien ini adalah perangkat lunak yang bekerja bersama, bersama dengan seperangkat kunci tanda tangan yang sah, untuk memverifikasi transaksi dan blok, memberikan kesaksian terhadap kepala rantai yang benar, menggabungkan kesaksian, dan mengajukan blok.

Pengguna home stake bertanggungjawab mengoperasikan perangkat keras yang diperlukan untuk menjalankan klien ini. Sangat disarankan untuk menggunakan mesin khusus untuk ini yang Anda operasikan dari beranda - ini sangat bermanfaat untuk kesehatan jaringan.

Pengguna home stake menerima imbalan langsung dari protokol karena telah memastikan validator mereka berfungsi dengan baik dan daring.

## Apa keuntungan melakukan home stake? {#why-stake-solo}

Home stake memerlukan tanggung jawab yang lebih besar, tetapi memberikan kendali penuh atas dana dan pengaturan penaruhan Anda.

<CardGrid>
  <Card title="Mendapatkan ETH yang baru" emoji="💸" description="Earn ETH-denominated rewards directly from the protocol when your validator is online, without any middlemen taking a cut." />
  <Card title="Full control
Pengaturan penuh" emoji="🎛️" description="Keep your own keys. Choose the combination of clients and hardware that allows you to minimize your risk and best contribute to the health and security of the network. Third-party staking services make these decisions for you, and they don't always make the safest choices." />
  <Card title="Keamanan Jaringan" emoji="🔐" description="Home staking is the most impactful way to stake. By running a validator on your own hardware at home, you strengthen the robustness, decentralization, and security of the Ethereum protocol." />
</CardGrid>

## Pertimbangan sebelum melakukan home stake {#considerations-before-staking-solo}

Meskipun kami sangat ingin mengatakan bahwa home stake mudah diakses dan bebas risiko bagi semua orang, kenyataannya tidak demikian. Ada beberapa pertimbangan serius dan praktis yang perlu diingat sebelum memilih melakukan home stake untuk ETH Anda.

<InfoGrid>
<ExpandableCard title="Bacaan yang diperlukan" eventCategory="SoloStaking" eventName="clicked required reading">
Ketika mengoperasikan simpul Anda sendiri, Anda sebaiknya menghabiskan waktu untuk mempelajari cara menggunakan perangkat lunak yang telah Anda pilih. Hal ini melibatkan membaca dokumentasi yang relevan dan memperhatikan saluran komunikasi tim pengembang tersebut.

Semakin Anda memahami tentang perangkat lunak yang Anda jalankan dan bagaimana bukti penaruhan bekerja, semakin minim risikonya sebagai penaruh, dan semakin mudah memperbaiki masalah yang mungkin muncul sepanjang jalan sebagai operator simpul.
</ExpandableCard>

<ExpandableCard title="Nyaman dengan komputer" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
Pengaturan simpul memerlukan tingkat kenyamanan yang wajar saat bekerja dengan komputer, meskipun perangkat baru membuat ini menjadi lebih mudah seiring berjalannya waktu. Memahami antarmuka baris perintah bermanfaat, tetapi tidak lagi mutlak diperlukan.

Ini juga memerlukan pengaturan perangkat keras yang sangat dasar, dan pemahaman tentang spesifikasi minimum yang direkomendasikan.
</ExpandableCard>

<ExpandableCard title="Manajemen kunci Aman" eventCategory="SoloStaking" eventName="clicked secure key management">
Sama seperti kunci pribadi yang mengamankan alamat Ethereum Anda, Anda perlu menghasilkan kunci-kunci khusus untuk validator Anda. Anda harus memahami cara menjaga frasa benih atau kunci pribadi tetap aman dan terlindungi.{' '}

[Keamanan Ethereum dan pencegahan penipuan](/security/)
</ExpandableCard>

<ExpandableCard title="Pemeliharaan" eventCategory="SoloStaking" eventName="clicked maintenance">
Perangkat keras kadang-kadang mengalami kegagalan, koneksi jaringan terputus, dan perangkat lunak klien kadang-kadang perlu ditingkatkan. Pemeliharaan simpul tidak terhindarkan dan kadang-kadang akan memerlukan perhatian Anda. Anda akan ingin memastikan Anda tetap sadar akan semua peningkatan jaringan yang diantisipasi, atau peningkatan klien penting lainnya.
</ExpandableCard>

<ExpandableCard title="Ketahanan waktu yang baik" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Imbalan Anda sebanding dengan waktu validator Anda daring dan memberikan pembuktian dengan benar. Waktu tidak aktif menimbulkan hukuman sebanding dengan berapa banyak validator lain yang sedang offline pada saat yang sama, tetapi <a href="#faq">tidak mengakibatkan pemotongan</a>. Lebar pita juga penting, karena imbalan dikurangi untuk pembuktian yang tidak diterima tepat waktu. Persyaratan akan bervariasi, tetapi disarankan memiliki setidaknya kecepatan unggah dan unduh 10 Mb/dtk.
</ExpandableCard>

<ExpandableCard title="Risiko pemotongan" eventCategory="SoloStaking" eventName="clicked slashing risk">
Berbeda dari hukuman ketidakaktifan karena offline, <em>pemotongan</em> merupakan hukuman yang jauh lebih serius yang diberikan untuk pelanggaran yang bersifat jahat. Dengan menjalankan klien minoritas dengan kunci Anda dimuat hanya pada satu mesin pada satu waktu, risiko pemotongan slashed Anda diminimalkan. Dengan demikian, semua staker harus menyadari risiko pemotongan.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Lebih lanjut tentang pemotongan dan siklus validator</a>
</ExpandableCard>
</InfoGrid>

<StakingComparison page="solo" />

## Cara kerjanya {#how-it-works}

<StakingHowSoloWorks />

Saat aktif, Anda akan mendapatkan rewards ETH, yang akan secara berkala disetor ke alamat penarikan Anda.

Jika diinginkan, Anda dapat keluar sebagai validator yang menghilangkan keharusan untuk daring, dan menghentikan segala hadiah lebih lanjut. Saldo Anda yang tersisa akan ditarik ke alamat penarikan yang Anda tentukan saat pengaturan.

[Lebih lanjut tentang penarikan penaruhan](/staking/withdrawals/)

## Mulai di Landasan Peluncuran Penaruhan {#get-started-on-the-staking-launchpad}

Landasan Peluncuran Penaruhan adalah aplikasi sumber terbuka yang akan membantu Anda menjadi seorang penaruh. Aplikasi ini akan membimbing Anda dalam memilih klien, menghasilkan kunci Anda, dan mendepositkan ETH Anda ke kontrak deposit penaruhan. Daftar periksa disediakan untuk memastikan Anda telah mencakup semua yang diperlukan untuk mengatur validator dengan aman.

<StakingLaunchpadWidget />

## Apa yang perlu dipertimbangkan dalam perangkat pengaturan simpul dan klien {#node-tool-considerations}

Ada banyak perangkat dan layanan yang bisa membantu Anda melakukan home stake ETH, tetapi setiap opsi memiliki manfaat dan risikonya sendiri.

Indikator atribut digunakan di bawah ini untuk menandakan kekuatan atau kelemahan yang signifikan yang mungkin dimiliki oleh perangkat penaruhan yang terdaftar. Gunakan bagian ini sebagai referensi untuk cara kami mendefinisikan atribut-atribut ini saat Anda memilih perangkat membantu perjalanan penaruhan Anda.

<StakingConsiderations page="solo" />

## Jelajahi perangkat pengaturan simpul dan klien {#node-and-client-tools}

Terdapat berbagai pilihan yang tersedia untuk membantu Anda dengan pengaturan Anda. Gunakan petunjuk di atas untuk membantu Anda memandu melalui perangkat di bawah ini.

<ProductDisclaimer />

### Perangkat simpul

<StakingProductsCardGrid category="nodeTools" />

Harap perhatikan pentingnya memilih [klien minoritas](/developers/docs/nodes-and-clients/client-diversity/) karena ini meningkatkan keamanan jaringan dan membatasi risiko Anda. Perangkat yang memungkinkan Anda mengatur klien minoritas ditandai sebagai <em style={{ textTransform: "uppercase" }}>"multi-klien."</em>

### Pembangkit Kunci

Perangkat ini dapat digunakan sebagai alternatif untuk [CLI Deposit Penaruhan](https://github.com/ethereum/staking-deposit-cli/) untuk membantu dalam pembuatan kunci.

<StakingProductsCardGrid category="keyGen" />

Punya saran untuk alat penaruhan yang kami lewatkan? Lihat [kebijakan daftar produk](/contributing/adding-staking-products/) kami untuk melihat apakah cocok, dan untuk mengirimkannya untuk ditinjau.

## Pelajari panduan untuk melakukan home stake {#staking-guides}

<StakingGuides />

## Pertanyaan yang sering diajukan {#faq}

Berikut adalah beberapa pertanyaan umum tentang penaruhan yang layak diketahui.

<ExpandableCard title="Apa itu validator?">

Seorang <em>validator</em> adalah entitas virtual yang ada di Ethereum dan berpartisipasi dalam konsensus protokol Ethereum. Validator direpresentasikan oleh saldo, kunci publik, dan properti lainnya. Sebuah <em>validator klien</em> adalah perangkat lunak yang bertindak atas nama validator dengan menyimpan dan menggunakan kunci pribadinya. Satu klien validator tunggal dapat menyimpan banyak pasangan kunci, mengendalikan banyak validator.

</ExpandableCard>

<ExpandableCard title="Dapatkah saya melakukan deposit lebih dari 32 ETH?">
Ya, akun validator modern mampu menampung hingga 2048 ETH. Tambahan ETH di atas 32 akan bertambah dengan cara bertahap, meningkat dalam kelipatan satu digit seiring dengan meningkatnya saldo Anda yang sebenarnya. Ini dikenal sebagai <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">saldo efektif</a> Anda.

Untuk meningkatkan saldo efektif akun, dan dengan demikian meningkatkan imbalan, buffer 0,25 ETH di atas ambang batas ETH penuh harus dilewati. Misalnya, akun dengan saldo sebenarnya 32,9 dan saldo efektif 32 perlu mendapatkan 0,35 ETH lagi untuk membawa saldo sebenarnya di atas 33,25 sebelum memicu peningkatan saldo efektif.

Buffer ini juga mencegah saldo efektif turun hingga mencapai 0,25 ETH di bawah saldo efektif saat ini.

Setiap pasangan kunci yang terkait dengan validator membutuhkan minimal 32 ETH untuk diaktifkan. Saldo di atas ini dapat ditarik ke alamat penarikan yang terkait kapan saja melalui transaksi yang ditandatangani oleh alamat ini. Setiap dana yang melebihi saldo efektif maksimum akan secara otomatis ditarik secara berkala.

Jika home staking tampaknya terlalu sulit bagi Anda, pertimbangkan untuk menggunakan penyedia [staking-as-a-service](/staking/saas/). Atau, jika Anda memiliki kurang dari 32 ETH, periksa [staking pool](/staking/pools/).
</ExpandableCard>

<ExpandableCard title="Apakah saya akan mengalami pemotongan jika saya offline? (tptb: Tidak.)">
Mengalami kehilangan koneksi saat jaringan sedang berjalan dengan baik dan stabil TIDAK akan mengakibatkan pemotongan. Denda kecil <em>akibat ketidakaktifan</em> (inactivity penalties) dikenakan jika validator Anda tidak tersedia untuk mengesahkan dalam suatu jangka waktu tertentu (setiap 6,4 menit), namun ini sangat berbeda dengan <em>pemotongan</em>. Denda ini sedikit lebih rendah daripada imbalan yang akan Anda peroleh jika validator tersedia untuk mengesahkan, dan kerugian dapat dikembalikan dengan waktu daring yang sekitar sama lamanya.

Perlu dicatat bahwa denda atas ketidakaktifan berbanding lurus dengan jumlah validator yang tidak aktif pada saat bersamaan. Dalam kasus di mana sebagian besar jaringan tidak aktif secara bersamaan, denda untuk masing-masing validator ini akan lebih besar daripada saat satu validator tidak tersedia.

Dalam kasus ekstrem di mana jaringan berhenti untuk mengkonfirmasi hasil akhir akibat lebih dari sepertiga validator tidak aktif, pengguna ini akan mengalami apa yang dikenal sebagai <em>kebocoran inaktivitas kuadratik</em>, yang merupakan pengurasan eksponensial ETH dari akun validator yang tidak aktif. Ini memungkinkan jaringan untuk akhirnya pulih sendiri dengan membakar ETH dari validator yang tidak aktif hingga saldo mereka mencapai 16 ETH, pada saat itu mereka akan secara otomatis dikeluarkan dari kolam validator. Validator yang tetap daring akhirnya akan terdiri dari lebih dari 2/3 dari jaringan lagi, memenuhi supermayoritas yang diperlukan untuk sekali lagi mengesahkan rantai.
</ExpandableCard>

<ExpandableCard title="Bagaimana saya memastikan bahwa saya tidak terkena pemotongan?">
Secara singkat, ini tidak dapat dijamin sepenuhnya, tetapi jika Anda bertindak dengan itikad baik, menjalankan klien minoritas, dan hanya menyimpan kunci tanda tangan Anda di satu mesin pada satu waktu, risiko terkena potongan hampir nol.

Hanya ada beberapa cara khusus yang dapat menyebabkan seorang validator terkena potongan dan dikeluarkan dari jaringan. Pada saat penulisan ini, pemotongan yang terjadi secara eksklusif merupakan hasil dari pengaturan perangkat keras yang berlebihan di mana kunci tanda tangan disimpan di dua mesin terpisah sekaligus. Ini dapat secara tidak sengaja mengakibatkan <em>suara ganda</em> dari kunci Anda, yang merupakan pelanggaran yang dapat mengakibatkan pemotongan.

Menjalankan klien supermayoritas (klien yang digunakan oleh lebih dari 2/3 jaringan) juga memiliki risiko potensial pemotongan jika klien ini memiliki bug yang mengakibatkan terjadinya garpu pada rantai. Hal ini dapat mengakibatkan garpu yang cacat dan kemudian di-finalisasi. Untuk kembali ke rantai yang dimaksud, diperlukan pengajuan <em>surround vote</em> dengan mencoba untuk mengembalikan blok yang telah di-finalisasi. Ini juga merupakan tindakan yang dapat menyebabkan pemotongan dan dapat dihindari dengan menjalankan klien minoritas.

Bugs serupa dalam klien <em>minoritas tidak akan pernah difinalisasi</em> dan oleh karena itu tidak akan mengakibatkan suara perkeliling, dan hanya akan mengakibatkan hukuman ketidakaktifan, <em>bukan pemotongan</em>.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">Pelajari lebih lanjut tentang pentingnya menjalankan klien minoritas.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Pelajari lebih lanjut tentang pencegahan pemotongan</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Klien mana yang terbaik?">
Masing-masing klien dapat memiliki perbedaan sedikit dalam hal kinerja dan antarmuka pengguna, karena masing-masing dikembangkan oleh tim yang berbeda menggunakan berbagai bahasa pemrograman. Meskipun demikian, tidak ada yang dianggap sebagai "terbaik." Semua klien produksi adalah perangkat lunak yang sangat baik, yang semuanya melakukan fungsi inti yang sama untuk menyinkronkan dan berinteraksi dengan rantai blok.

Karena semua klien produksi menyediakan fungsionalitas dasar yang sama, sebenarnya sangat penting bagi Anda untuk memilih <strong>klien minoritas</strong>, yang berarti klien mana pun yang TIDAK sedang digunakan oleh sebagian besar validator di jaringan. Hal ini mungkin terdengar kontraproduktif, tetapi menjalankan klien mayoritas atau supermayoritas meningkatkan risiko Anda terkena pemotongan jika terjadi bug pada klien tersebut. Menjalankan klien minoritas secara signifikan mengurangi risiko tersebut.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Pelajari lebih lanjut mengenai mengapa keragaman klien sangat penting di sini</a>
</ExpandableCard>

<ExpandableCard title="Apakah saya hanya bisa menggunakan VPS (server pribadi virtual)?">
Meskipun server pribadi virtual (VPS) dapat digunakan sebagai pengganti perangkat keras di beranda, akses fisik dan lokasi klien validator Anda <em>memang penting</em>. Solusi cloud terpusat seperti Amazon Web Services atau Digital Ocean memungkinkan kenyamanan tanpa harus mendapatkan dan mengoperasikan perangkat keras, dengan biaya sentralisasi jaringan.

Semakin banyak klien validator yang berjalan pada satu solusi penyimpanan cloud terpusat, semakin berbahaya bagi pengguna-pengguna ini. Setiap kejadian yang membuat penyedia ini offline, baik itu oleh serangan, tuntutan regulasi, atau gangguan daya/internet, akan menyebabkan setiap klien validator yang bergantung pada server ini menjadi offline secara bersamaan.

Denda ketidakhadiran secara online sebanding dengan berapa banyak orang lain yang tidak online pada saat yang sama. Menggunakan VPS secara besar-besaran meningkatkan risiko bahwa denda ketidakhadiran daring akan lebih parah, dan meningkatkan risiko bocornya kuadrat atau pemotongan jika pemadaman cukup besar. Untuk meminimalkan risiko Anda sendiri dan risiko bagi jaringan, pengguna sangat disarankan untuk mendapatkan dan mengoperasikan perangkat keras mereka sendiri.
</ExpandableCard>

<ExpandableCard title="Bagaimana cara untuk membuka hadiah saya atau mendapatkan kembali ETH saya?">

Penarikan apa pun dari Rantai Suar memerlukan pengaturan kredensial penarikan.

Pemegang staking baru mengatur ini pada saat pembuatan kunci dan deposit. Pemegang penaruhan yang sudah ada yang belum mengatur ini dapat meningkatkan kunci mereka untuk mendukung fungsionalitas ini.

Setelah kredensial penarikan diatur, pembayaran imbalan (ETH yang terakumulasi di atas 32 awal) akan secara berkala didistribusikan ke alamat penarikan secara otomatis.

Untuk membuka dan menerima seluruh saldo Anda kembali, Anda juga harus menyelesaikan proses keluar dari validator Anda.

<ButtonLink href="/staking/withdrawals/">Lebih lanjut tentang penarikan penaruhan</ButtonLink>
</ExpandableCard>

## Bacaan lebih lanjut {#further-reading}

- [Direktori Penaruhan Ethereum](https://www.staking.directory/) - _Eridian dan Spacesider_
- [Masalah Keragaman Klien Ethereum](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [Membantu Keragaman Klien](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Klien keragaman pada Ethereum Lapisan konsensus](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [Caranya: Berbelanja Untuk Ethereum Validator Perangkat Keras](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [Langkah demi Langkah: Cara Bergabung dengan Jaringan Percobaan Ethereum 2.0](https://kb.beaconcha.in/guides/tutorial-eth2-multiclient) - _Butta_
- [Tips Pencegahan Pemotongan Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />
