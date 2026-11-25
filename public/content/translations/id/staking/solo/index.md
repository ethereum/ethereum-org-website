---
title: Staking ETH Anda dari rumah
description: Gambaran umum tentang cara memulai staking ETH Anda dari rumah
lang: id
template: staking
image: /images/staking/leslie-solo.png
sidebarDepth: 2
summaryPoints:
  - Terima imbalan maksimum langsung dari protokol karena menjaga validator Anda berfungsi dengan baik dan online
  - Jalankan perangkat keras di rumah dan secara pribadi berkontribusi pada keamanan dan desentralisasi jaringan Ethereum
  - Hilangkan kebutuhan akan kepercayaan, dan jangan pernah menyerahkan kendali atas kunci dana Anda
---

## Apa itu staking dari rumah? {#what-is-solo-staking}

Staking dari rumah adalah tindakan [menjalankan node Ethereum](/run-a-node/) yang terhubung ke internet dan mendepositkan setidaknya 32 ETH untuk mengaktivasi [validator](#faq), memberi Anda kemampuan untuk berpartisipasi langsung dalam konsensus jaringan.

Staking dari rumah adalah cara paling langsung untuk melakukan staking. Tidak ada kontrak pintar (smart contract), operator, atau kustodian yang berdiri di antara Anda dan protokol. Anda memegang kunci Anda sendiri, berpartisipasi aktif dalam memvalidasi jaringan [Ethereum](/), dan menerima imbalan jaringan secara langsung. Setiap metode staking lainnya menambahkan lapisan teknologi, middleware, atau layanan di atas aktivitas jaringan inti ini.

**Staking dari rumah meningkatkan desentralisasi jaringan Ethereum**, membuat Ethereum lebih tahan sensor dan kuat terhadap serangan. Metode staking lainnya mungkin tidak membantu jaringan dengan cara yang sama. Staking dari rumah adalah opsi staking terbaik untuk mengamankan Ethereum.

Sebuah node Ethereum terdiri dari klien lapisan eksekusi (EL) dan klien lapisan konsensus (CL). Klien-klien ini adalah perangkat lunak yang bekerja bersama, beserta sekumpulan kunci penandatanganan yang valid, untuk memverifikasi transaksi dan blok, membuktikan (attest) kepala rantai yang benar, mengumpulkan pembuktian (attestation), dan mengusulkan blok.

Staker dari rumah bertanggung jawab untuk mengoperasikan perangkat keras yang diperlukan untuk menjalankan klien-klien ini. Sangat disarankan untuk menggunakan mesin khusus untuk ini yang Anda operasikan dari rumah–ini sangat bermanfaat bagi kesehatan jaringan.

Seorang staker dari rumah menerima imbalan langsung dari protokol karena menjaga validator mereka berfungsi dengan baik dan online.

## Mengapa melakukan staking dari rumah? {#why-stake-solo}

Staking dari rumah datang dengan tanggung jawab yang lebih besar tetapi memberi Anda kendali maksimum atas dana dan pengaturan staking Anda.

<Grid>
  <Card title="Pertahankan semua imbalan" icon={<HandCoins />} description="Staker dari rumah menerima 100% imbalan protokol, dibayarkan langsung oleh protokol selama validator Anda online." />
  <Card title="Kedaulatan mandiri" icon={<KeyRound />} description="Simpan kunci Anda sendiri dan pegang hak asuh penuh atas dana Anda setiap saat. Pilih kombinasi klien dan perangkat keras yang memungkinkan Anda meminimalkan risiko. Tidak ada pihak ketiga yang dapat membuat keputusan ini untuk Anda atau membatasi penarikan Anda." />
  <Card title="Keragaman klien dan geografis" icon={<GlobeLock />} description="Staker dari rumah yang menjalankan klien minoritas pada perangkat keras yang tersebar di banyak lokasi memperkuat desentralisasi dan keamanan jaringan." />
</Grid>

## Pertimbangan sebelum melakukan staking dari rumah {#considerations-before-staking-solo}

Meskipun kami berharap staking dari rumah dapat diakses dan bebas risiko bagi semua orang, ini bukanlah kenyataannya. Ada beberapa pertimbangan praktis dan serius yang perlu diingat sebelum memilih untuk melakukan staking ETH Anda dari rumah.

<ExpandableCard title="Bacaan wajib" eventCategory="SoloStaking" eventName="clicked required reading">
Saat mengoperasikan node Anda sendiri, Anda harus meluangkan waktu untuk mempelajari cara menggunakan perangkat lunak yang telah Anda pilih. Ini melibatkan membaca dokumentasi yang relevan dan mengikuti saluran komunikasi dari tim pengembang tersebut.

Semakin Anda memahami tentang perangkat lunak yang Anda jalankan dan bagaimana Bukti Kepemilikan (PoS) bekerja, semakin kecil risikonya sebagai staker, dan semakin mudah untuk memperbaiki masalah apa pun yang mungkin timbul di sepanjang jalan sebagai operator node.
</ExpandableCard>

<ExpandableCard title="Terbiasa dengan komputer" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
Pengaturan node membutuhkan tingkat kenyamanan yang wajar saat bekerja dengan komputer, meskipun alat-alat baru membuatnya lebih mudah seiring berjalannya waktu. Pemahaman tentang antarmuka baris perintah (command-line interface) sangat membantu, tetapi tidak lagi diwajibkan secara ketat.

Ini juga membutuhkan pengaturan perangkat keras yang sangat mendasar, dan sedikit pemahaman tentang spesifikasi minimum yang disarankan.
</ExpandableCard>

<ExpandableCard title="Persyaratan perangkat keras" eventCategory="SoloStaking" eventName="clicked hardware requirements">
Panduan komunitas saat ini untuk perangkat keras dan bandwidth validator dikelola dalam [rekomendasi perangkat keras dan bandwidth (EIP-7870)](https://eips.ethereum.org/EIPS/eip-7870). Sebagai panduan kasar, rencanakan untuk menggunakan SSD NVMe 4 TB, RAM 64 GB (lebih sedikit bisa berfungsi, tetapi ini adalah ruang kosong yang disarankan), CPU multi-core modern yang solid, dan koneksi internet sekitar 50 Mbps unduh / 25 Mbps unggah.

Sejak peningkatan Fusaka memperkenalkan PeerDAS, node staking hanya perlu menyimpan dan mengunduh sebagian kecil dari data blob jaringan, yang secara signifikan mengurangi persyaratan disk dan bandwidth untuk staker dari rumah.
</ExpandableCard>

<ExpandableCard title="Manajemen kunci yang aman" eventCategory="SoloStaking" eventName="clicked secure key management">
Sama seperti bagaimana kunci privat mengamankan alamat Ethereum Anda, Anda perlu membuat kunci khusus untuk validator Anda. Anda harus memahami cara menjaga frasa benih (seed phrase) atau kunci privat apa pun agar tetap aman dan terlindungi.{' '}

[Keamanan Ethereum dan pencegahan penipuan](/security/)
</ExpandableCard>

<ExpandableCard title="Pemeliharaan" eventCategory="SoloStaking" eventName="clicked maintenance">
Perangkat keras terkadang gagal, koneksi jaringan mengalami kesalahan, dan perangkat lunak klien terkadang perlu ditingkatkan. Pemeliharaan node tidak dapat dihindari dan terkadang akan membutuhkan perhatian Anda. Anda harus memastikan bahwa Anda tetap mengetahui setiap peningkatan jaringan yang diantisipasi, atau peningkatan klien penting lainnya.
</ExpandableCard>

<ExpandableCard title="Waktu aktif yang andal" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Imbalan Anda sebanding dengan waktu validator Anda online dan melakukan pembuktian dengan benar. Waktu henti (downtime) menimbulkan penalti yang sebanding dengan berapa banyak validator lain yang offline pada saat yang sama, tetapi [tidak mengakibatkan pemotongan](#faq). Bandwidth juga penting, karena imbalan berkurang untuk pembuktian yang tidak diterima tepat waktu. Persyaratan akan bervariasi, tetapi [rekomendasi perangkat keras dan bandwidth (EIP-7870)](https://eips.ethereum.org/EIPS/eip-7870) saat ini menyarankan sekitar 50 Mbps unduh dan 25 Mbps unggah.
</ExpandableCard>

<ExpandableCard title="Risiko pemotongan" eventCategory="SoloStaking" eventName="clicked slashing risk">
Berbeda dengan penalti ketidakaktifan karena offline, <em>pemotongan</em> adalah penalti yang jauh lebih serius yang dikhususkan untuk pelanggaran berbahaya. Dengan menjalankan klien minoritas dengan kunci Anda dimuat hanya pada satu mesin pada satu waktu, risiko Anda terkena pemotongan diminimalkan. Meskipun demikian, semua staker harus menyadari risiko pemotongan.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Lebih lanjut tentang pemotongan dan siklus hidup validator</a>
</ExpandableCard>

## Perbandingan opsi staking {#comparison-of-staking-options}

<StakingComparison page="solo" />

## Bagaimana cara kerjanya {#how-it-works}

<StakingHowSoloWorks />

Setelah node Anda disinkronisasi dan kunci Anda dibuat, Anda mendepositkan stake Anda untuk mengaktivasi validator Anda. Satu validator membutuhkan minimal 32 ETH, dan dapat menampung hingga 2048 ETH. Jaringan mengenali deposit dalam waktu sekitar 13 menit, tetapi validator baru melewati antrean aktivasi sebelum mereka mulai melakukan pembuktian; panjangnya bervariasi sesuai permintaan.

Saat aktif, Anda akan mendapatkan imbalan ETH. Dengan kredensial penarikan gabungan (compounding) (0x02), imbalan ditambahkan ke stake Anda secara otomatis; dengan kredensial penarikan reguler (0x01), imbalan di atas 32 ETH awal secara berkala disapu (swept) ke alamat penarikan Anda.

Jika diinginkan, Anda dapat keluar sebagai validator, yang menghilangkan persyaratan untuk online dan menghentikan imbalan lebih lanjut. Saldo Anda yang tersisa kemudian akan ditarik ke alamat penarikan yang Anda tentukan selama pengaturan. Keluar dapat dimulai dengan kunci penandatanganan validator Anda, atau dipicu langsung dari alamat penarikan Anda dengan transaksi lapisan eksekusi, sehingga kendali penuh atas dana Anda selalu berada di alamat penarikan Anda.

### Penggabungan (Compounding) dan maksimum 2048 ETH {#compounding}

Validator memiliki satu dari dua jenis kredensial penarikan:

- **Penarikan reguler (0x01)**: saldo efektif validator dibatasi pada 32 ETH, dan saldo apa pun di atas itu secara otomatis disapu ke alamat penarikan Anda setiap beberapa hari.
- **Penggabungan (0x02)**: saldo efektif validator dapat tumbuh hingga 2048 ETH. Imbalan digabungkan secara otomatis, dan Anda mendapatkan imbalan pada setiap ETH utuh di atas minimum 32 ETH, sehingga Anda dapat melakukan staking dalam jumlah fleksibel seperti 40 ETH, bukan hanya kelipatan 32. Hanya saldo di atas 2048 ETH yang disapu secara otomatis; menarik apa pun selain itu berarti memicu penarikan sebagian secara manual dari alamat penarikan Anda, yang membutuhkan biaya gas.

Jika Anda menjalankan beberapa validator, Anda dapat mengonsolidasikannya menjadi satu validator gabungan tanpa keluar dan masuk kembali ke jaringan, sehingga mengurangi beban pemeliharaan Anda. Konsolidasi diminta dari alamat penarikan Anda dan tunduk pada antrean pemrosesan. Mengalihkan validator dari kredensial 0x01 ke 0x02 menggunakan mekanisme yang sama ini, dan **tidak dapat dibatalkan** tanpa keluar sepenuhnya dan mendepositkan lagi.

[Lebih lanjut tentang penarikan staking](/staking/withdrawals/)

## Mulai di Staking Launchpad {#get-started-on-the-staking-launchpad}

Staking Launchpad adalah aplikasi sumber terbuka yang akan membantu Anda menjadi seorang staker. Ini akan memandu Anda dalam memilih klien Anda, membuat kunci Anda, dan mendepositkan ETH Anda ke kontrak deposit staking. Sebuah daftar periksa disediakan untuk memastikan Anda telah mencakup semuanya agar validator Anda diatur dengan aman.

<StakingLaunchpadWidget />

## Apa yang perlu dipertimbangkan dengan alat pengaturan node dan klien {#node-tool-considerations}

Ada semakin banyak alat dan layanan untuk membantu Anda melakukan staking ETH dari rumah, tetapi masing-masing memiliki risiko dan manfaat yang berbeda.

Indikator atribut digunakan di bawah ini untuk menandakan kekuatan atau kelemahan penting yang mungkin dimiliki oleh alat staking yang terdaftar. Gunakan bagian ini sebagai referensi tentang bagaimana kami mendefinisikan atribut-atribut ini saat Anda memilih alat apa yang akan membantu perjalanan staking Anda.

<StakingConsiderations page="solo" />

## Jelajahi alat pengaturan node dan klien {#node-and-client-tools}

Ada berbagai opsi yang tersedia untuk membantu Anda dengan pengaturan Anda. Gunakan indikator di atas untuk membantu memandu Anda melalui alat-alat di bawah ini.

<ProductDisclaimer />

### Alat node {#node-tools}

<StakingProductsCardGrid category="nodeTools" />

Harap perhatikan pentingnya memilih [klien minoritas](/developers/docs/nodes-and-clients/client-diversity/) karena ini meningkatkan keamanan jaringan, dan membatasi risiko Anda. Alat yang memungkinkan Anda mengatur klien minoritas dilambangkan sebagai <em style={{ textTransform: "uppercase" }}>"multi-klien."</em>

### Pembuat Kunci {#key-generators}

Alat-alat ini dapat digunakan sebagai alternatif dari [Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli/) untuk membantu pembuatan kunci.

<StakingProductsCardGrid category="keyGen" />

Punya saran untuk alat staking yang kami lewatkan? Lihat [kebijakan pencantuman produk](/contributing/adding-staking-products/) kami untuk melihat apakah itu cocok, dan untuk mengirimkannya agar ditinjau.

## Jelajahi panduan staking dari rumah {#staking-guides}

<StakingGuides />

## Staking regu: staking dari rumah dengan toleransi kesalahan {#squad-staking}

**Teknologi validator terdistribusi (DVT)** memungkinkan satu validator berjalan di seluruh klaster mesin, bukan hanya satu. Kunci validator dibagi menjadi beberapa bagian menggunakan pembuatan kunci terdistribusi, dan ambang batas klaster (misalnya, 3 dari 4 node mana pun) harus menandatangani bersama; kunci penuh tidak pernah ada di satu mesin mana pun. Jika satu mesin gagal, offline, atau salah dikonfigurasi, sisa klaster menjaga validator tetap melakukan pembuktian.

Bagi staker dari rumah, ini memungkinkan "staking regu": bekerja sama dengan teman atau anggota komunitas lainnya untuk menjalankan validator bersama-sama, menghilangkan titik kegagalan tunggal dari pengaturan solo dan mengurangi risiko pemotongan dari satu mesin yang berperilaku buruk. Obol dan SSV Network keduanya menyediakan implementasi DVT produksi, yang digunakan saat ini di seluruh staking dari rumah, staking sebagai layanan, dan pool staking.

[Lebih lanjut tentang teknologi validator terdistribusi](/staking/dvt/)

## Jalankan validator untuk protokol staking {#run-validators-for-a-staking-protocol}

Jika Anda memiliki perangkat keras dan keterampilan untuk menjalankan node tetapi kurang dari 32 ETH, beberapa protokol staking akan mencocokkan validator Anda dengan ETH dari staker gabungan mereka. Anda memposting jaminan (bond) yang lebih kecil sebagai kolateral dan menjalankan validator di mesin Anda sendiri; protokol menyediakan sisa stake, dan Anda mendapatkan bagian dari imbalan.

Ini adalah pendekatan hibrida: Anda mempertahankan tanggung jawab (dan kepuasan) mengoperasikan perangkat keras Anda sendiri, tetapi validator Anda beroperasi di bawah kontrak pintar, tata kelola, dan aturan kinerja protokol, yang merupakan profil kepercayaan yang berbeda dari melakukan staking ETH Anda sendiri secara langsung.

Pelajari lebih lanjut tentang cara kerja protokol ini, termasuk asumsi kepercayaan dan mekanika token mereka, di [halaman staking gabungan](/staking/pools/).

## Lebih banyak cara untuk menggunakan node Anda {#more-ways-to-use-your-node}

Anda tidak perlu melakukan staking sama sekali untuk mempraktikkan keterampilan operasi node. Siapa pun dapat [menjalankan node Ethereum](/run-a-node/) tanpa mendepositkan ETH apa pun. Anda mendapatkan pandangan rantai yang diverifikasi sendiri, titik akhir (endpoint) privat Anda sendiri untuk mengirim transaksi dan berinteraksi dengan aplikasi, dan Anda berkontribusi pada kesehatan dan ketahanan jaringan. Menjalankan node juga merupakan cara yang baik untuk membangun pengalaman sebelum mengaktivasi validator, tanpa ada ETH yang berisiko.

<StakingCommunityCallout className="my-16" />

## Pertanyaan yang sering diajukan {#faq}

Ini adalah beberapa pertanyaan paling umum tentang staking yang patut diketahui.

<ExpandableCard title="Apa itu validator?">

Sebuah <em>validator</em> adalah entitas virtual yang hidup di Ethereum dan berpartisipasi dalam konsensus protokol Ethereum. Validator diwakili oleh saldo, kunci publik, dan properti lainnya. Sebuah <em>klien validator</em> adalah perangkat lunak yang bertindak atas nama validator dengan memegang dan menggunakan kunci privatnya. Satu klien validator dapat memegang banyak pasangan kunci, mengendalikan banyak validator.

</ExpandableCard>

<ExpandableCard title="Bisakah saya mendepositokan lebih dari 32 ETH?">
Ya. Validator dengan kredensial penarikan _penggabungan_ (0x02) dapat menampung saldo efektif hingga 2048 ETH, sementara minimum untuk aktivasi tetap 32 ETH. Imbalan pada validator gabungan ditambahkan ke stakenya secara otomatis, dan ia mendapatkan imbalan pada setiap ETH utuh di atas minimum 32 ETH, sehingga Anda dapat melakukan staking dalam jumlah yang bukan kelipatan 32. Lihat [Penggabungan dan maksimum 2048 ETH](#compounding).

Validator dengan kredensial _penarikan reguler_ (0x01) tetap dibatasi pada saldo efektif 32 ETH, dengan saldo apa pun di atas itu secara otomatis disapu ke alamat penarikan setiap beberapa hari.

Untuk validator gabungan, hanya saldo di atas maksimum 2048 ETH yang disapu secara otomatis. Untuk menarik apa pun di bawah itu, Anda memicu penarikan sebagian dari alamat penarikan Anda (transaksi yang membutuhkan biaya gas), yang dapat menarik saldo apa pun di atas minimum 32 ETH. Jika Anda menjalankan beberapa validator, Anda juga dapat mengonsolidasikannya menjadi satu validator gabungan tanpa keluar dari jaringan.

[Lebih lanjut tentang penarikan staking](/staking/withdrawals/)
</ExpandableCard>

<ExpandableCard title="Apakah saya akan terkena pemotongan jika saya offline? (singkatnya: Tidak.)">
Menjadi offline saat jaringan difinalisasi dengan benar TIDAK akan mengakibatkan pemotongan. <em>Penalti ketidakaktifan</em> kecil dikenakan jika validator Anda tidak tersedia untuk melakukan pembuktian untuk Epok tertentu (masing-masing berdurasi 6,4 menit), tetapi ini sangat berbeda dengan <em>pemotongan</em>. Penalti ini sedikit lebih kecil dari imbalan yang akan Anda peroleh seandainya validator tersedia untuk melakukan pembuktian, dan kerugian dapat diperoleh kembali dengan jumlah waktu yang kira-kira sama saat kembali online.

Perhatikan bahwa penalti untuk ketidakaktifan sebanding dengan berapa banyak validator yang offline pada saat yang sama. Dalam kasus di mana sebagian besar jaringan semuanya offline sekaligus, penalti untuk masing-masing validator ini akan lebih besar daripada saat satu validator tidak tersedia.

Dalam kasus ekstrem jika jaringan berhenti difinalisasi sebagai akibat dari lebih dari sepertiga validator yang offline, pengguna ini akan menderita apa yang dikenal sebagai <em>kebocoran ketidakaktifan kuadratik</em>, yang merupakan pengurasan eksponensial ETH dari akun validator offline. Ini memungkinkan jaringan untuk akhirnya menyembuhkan dirinya sendiri dengan membakar ETH dari validator yang tidak aktif hingga saldo mereka mencapai 16 ETH, pada titik mana mereka akan secara otomatis dikeluarkan dari pool validator. Validator online yang tersisa pada akhirnya akan terdiri dari lebih dari 2/3 jaringan lagi, memenuhi mayoritas super yang diperlukan untuk sekali lagi memfinalisasi rantai.
</ExpandableCard>

<ExpandableCard title="Bagaimana cara memastikan saya tidak terkena pemotongan?">
Singkatnya, ini tidak akan pernah dapat dijamin sepenuhnya, tetapi jika Anda bertindak dengan itikad baik, menjalankan klien minoritas dan hanya menyimpan kunci penandatanganan Anda di satu mesin pada satu waktu, risiko terkena pemotongan hampir nol.

Hanya ada beberapa cara spesifik yang dapat mengakibatkan validator terkena pemotongan dan dikeluarkan dari jaringan. Pada saat penulisan, pemotongan yang telah terjadi secara eksklusif merupakan produk dari pengaturan perangkat keras yang berlebihan di mana kunci penandatanganan disimpan di dua mesin terpisah sekaligus. Ini secara tidak sengaja dapat mengakibatkan <em>suara ganda</em> dari kunci Anda, yang merupakan pelanggaran yang dapat dipotong.

Menjalankan klien mayoritas super (klien mana pun yang digunakan oleh lebih dari 2/3 jaringan) juga memiliki risiko potensi pemotongan jika klien ini memiliki bug yang mengakibatkan percabangan rantai. Ini dapat mengakibatkan percabangan yang salah yang difinalisasi. Untuk mengoreksi kembali ke rantai yang dimaksud akan membutuhkan pengiriman <em>suara keliling (surround vote)</em> dengan mencoba membatalkan blok yang difinalisasi. Ini juga merupakan pelanggaran yang dapat dipotong dan dapat dihindari hanya dengan menjalankan klien minoritas sebagai gantinya.

Bug yang setara dalam <em>klien minoritas tidak akan pernah difinalisasi</em> dan dengan demikian tidak akan pernah menghasilkan suara keliling, dan hanya akan menghasilkan penalti ketidakaktifan, <em>bukan pemotongan</em>.

<ul>
  <li><a href="https://clientdiversity.org/">Pelajari lebih lanjut tentang pentingnya menjalankan klien minoritas.</a></li>
  <li><a href="/developers/docs/consensus-mechanisms/pos/rewards-and-penalties/">Pelajari lebih lanjut tentang imbalan, penalti, dan pemotongan</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Klien mana yang terbaik?">
Klien individu mungkin sedikit berbeda dalam hal kinerja dan antarmuka pengguna, karena masing-masing dikembangkan oleh tim yang berbeda menggunakan berbagai bahasa pemrograman. Meskipun demikian, tidak ada satupun yang "terbaik." Semua klien produksi adalah perangkat lunak yang sangat baik, yang semuanya melakukan fungsi inti yang sama untuk melakukan sinkronisasi dan berinteraksi dengan rantai blok.

Karena semua klien produksi menyediakan fungsionalitas dasar yang sama, sebenarnya sangat penting bagi Anda untuk memilih <strong>klien minoritas</strong>, yang berarti klien mana pun yang TIDAK sedang digunakan oleh mayoritas validator di jaringan. Ini mungkin terdengar berlawanan dengan intuisi, tetapi menjalankan klien mayoritas atau mayoritas super menempatkan Anda pada peningkatan risiko pemotongan jika terjadi bug pada klien tersebut. Menjalankan klien minoritas secara drastis membatasi risiko ini.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Pelajari lebih lanjut tentang mengapa keragaman klien sangat penting</a>
</ExpandableCard>

<ExpandableCard title="Bisakah saya menggunakan VPS (virtual private server) saja?">
Meskipun server privat virtual (VPS) dapat digunakan sebagai pengganti perangkat keras rumah, akses fisik dan lokasi klien validator Anda <em>memang penting</em>. Solusi cloud terpusat seperti Amazon Web Services atau Digital Ocean memungkinkan kenyamanan karena tidak perlu mendapatkan dan mengoperasikan perangkat keras, dengan mengorbankan sentralisasi jaringan.

Semakin banyak klien validator yang berjalan pada satu solusi penyimpanan cloud terpusat, semakin berbahaya bagi para pengguna ini. Peristiwa apa pun yang membuat penyedia ini offline, baik karena serangan, tuntutan peraturan, atau hanya pemadaman listrik/internet, akan mengakibatkan setiap klien validator yang bergantung pada server ini menjadi offline pada saat yang sama.

Penalti offline sebanding dengan berapa banyak orang lain yang offline pada saat yang sama. Menggunakan VPS sangat meningkatkan risiko bahwa penalti offline akan lebih parah, dan meningkatkan risiko kebocoran kuadratik atau pemotongan jika pemadaman cukup besar. Untuk meminimalkan risiko Anda sendiri, dan risiko terhadap jaringan, pengguna sangat disarankan untuk mendapatkan dan mengoperasikan perangkat keras mereka sendiri.
</ExpandableCard>

<ExpandableCard title="Bagaimana cara membuka kunci imbalan saya atau mendapatkan kembali ETH saya?">

Setiap penarikan mewajibkan validator Anda untuk memiliki alamat penarikan yang ditetapkan. Staker baru menetapkan ini pada saat pembuatan kunci dan deposit. Staker dari hari-hari awal jaringan yang belum menetapkan alamat penarikan perlu memperbarui kredensial penarikan mereka sebelum melakukan penarikan.

Untuk validator dengan kredensial penarikan reguler (0x01), pembayaran imbalan (akumulasi ETH di atas 32 awal) secara berkala didistribusikan ke alamat penarikan secara otomatis. Untuk validator gabungan (0x02), imbalan tetap di-stake dan digabungkan secara otomatis. Anda dapat menarik saldo apa pun di atas 32 ETH dengan memicu penarikan sebagian dari alamat penarikan Anda.

Untuk membuka kunci dan menerima seluruh saldo Anda kembali, Anda harus keluar dari validator Anda. Anda dapat melakukan ini menggunakan kunci penandatanganan validator Anda, atau memicunya langsung dari alamat penarikan Anda dengan transaksi lapisan eksekusi, yang berarti dana Anda tetap dapat dipulihkan bahkan jika kunci penandatanganan Anda hilang.

<ButtonLink href="/staking/withdrawals/">Lebih lanjut tentang penarikan staking</ButtonLink>
</ExpandableCard>

## Bacaan lebih lanjut {#further-reading}

- [Statistik keragaman klien dan panduan migrasi](https://clientdiversity.org/)
- [Membantu Keragaman Klien](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Keragaman klien pada lapisan konsensus Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [Cara: Berbelanja Perangkat Keras Validator Ethereum](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [EIP-7870: Rekomendasi perangkat keras dan bandwidth](https://eips.ethereum.org/EIPS/eip-7870)
- [Peningkatan Pectra: saldo efektif maks dan banyak lagi](/roadmap/pectra/maxeb/)

<QuizWidget quizKey="staking-solo" />