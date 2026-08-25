---
title: Staking yang didelegasikan (staking sebagai layanan)
description: Gambaran umum tentang cara memulai staking yang didelegasikan
lang: id
template: staking
image: /images/staking/leslie-saas.png
sidebarDepth: 2
summaryPoints:
  - Operator node pihak ketiga menangani operasi klien validator Anda
  - Pilihan tepat bagi siapa saja yang memiliki 32 ETH dan tidak ingin berurusan dengan kerumitan teknis dalam menjalankan node
  - Pendelegasian mencakup spektrum yang luas, mulai dari layanan di mana Anda menyimpan kunci penarikan Anda hingga bursa yang sepenuhnya kustodial
---

## Apa itu staking yang didelegasikan? {#what-is-staking-as-a-service}

Staking yang didelegasikan mewakili kategori layanan staking di mana Anda menyetorkan 32 ETH Anda sendiri untuk sebuah validator, tetapi mendelegasikan operasi node ke operator pihak ketiga. Prosesnya biasanya melibatkan panduan melalui pengaturan awal, termasuk pembuatan kunci dan penyetoran, lalu mengunggah kunci penandatanganan Anda ke operator. Anda menyediakan ETH, tetapi menyerahkan operasi perangkat keras validator kepada orang lain.

Protokol [Ethereum](/) secara bawaan tidak mendukung pendelegasian stake, sehingga berbagai layanan telah dibangun untuk memenuhi permintaan ini. Kategori ini paling dikenal sebagai **staking sebagai layanan (SaaS)**, tetapi mencakup spektrum pengaturan yang berbeda pada pertanyaan kunci tentang seberapa besar kendali yang Anda pertahankan atas ETH yang Anda stake:

- **Staking sebagai layanan non-kustodial**: Anda menyimpan kunci penarikan Anda sendiri dan hanya mendelegasikan operasi validator.
- **Staking kustodial penuh**: penyedia, biasanya bursa, memegang kunci dan dana.

Dibandingkan dengan [staking mandiri](/staking/solo/), setiap bentuk pendelegasian menempatkan middleware antara Anda dan protokol Ethereum. Middleware tersebut adalah perangkat lunak dan infrastruktur yang dijalankan oleh bisnis orang lain. Setiap langkah menuju kenyamanan menambah asumsi kepercayaan, jadi sebelum memilih layanan, cari tahu di mana posisinya dalam spektrum ini.

### Apa yang bukan merupakan staking yang didelegasikan {#what-delegated-staking-is-not}

- **Staking gabungan dan token staking likuid (LST)**: dengan pool, Anda menggabungkan sejumlah ETH dengan staker lain, biasanya menerima token yang mewakili bagian Anda dari stake pool tersebut. Anda tidak mendelegasikan validator Anda sendiri; kontrak pintar pool dan operator node mengendalikan validator tersebut. [Lebih lanjut tentang staking gabungan](/staking/pools/)
- **Operasi node berikat (bonded)**: beberapa protokol staking memungkinkan Anda menjalankan validator pada perangkat keras Anda sendiri dengan kurang dari 32 ETH dengan memasang obligasi (bond). Itu adalah operasi node, kebalikan dari pendelegasian, dan dibahas bersama [staking mandiri](/staking/solo/).

## Mengapa mendelegasikan staking Anda? {#why-stake-with-a-service}

Jika Anda memiliki 32 ETH untuk di-stake, tetapi tidak merasa nyaman berurusan dengan perangkat keras, layanan staking yang didelegasikan memungkinkan Anda menyerahkan sisi teknis sambil mendapatkan imbalan blok Ethereum asli.

<Grid>
  <Card title="Validator Anda sendiri" icon={<MonitorCheck />} description="Setorkan 32 ETH Anda sendiri untuk mengaktifkan set kunci penandatanganan Anda sendiri yang akan berpartisipasi dalam konsensus Ethereum. Pantau kemajuan Anda dengan dasbor untuk melihat imbalan ETH tersebut terakumulasi." />
  <Card title="Mudah untuk memulai" icon={<Flag />} description="Lupakan tentang spesifikasi perangkat keras, pengaturan, pemeliharaan node, dan peningkatan. Penyedia memungkinkan Anda mengalihdayakan bagian yang sulit dengan mengunggah kredensial penandatanganan Anda sendiri, memungkinkan mereka menjalankan validator atas nama Anda, dengan biaya kecil." />
  <Card title="Batasi risiko Anda" icon={<ShieldHalf />} description="Dengan layanan non-kustodial, Anda memegang kendali atas kunci yang memungkinkan penarikan atau transfer dana yang di-stake. Kunci ini berbeda dari kunci penandatanganan, dan dapat disimpan secara terpisah untuk membatasi (tetapi tidak menghilangkan) risiko Anda sebagai staker." />
</Grid>

## Perbandingan opsi staking {#comparison-of-staking-options}

<StakingComparison page="saas" />

## Spektrum pendelegasian {#the-delegation-spectrum}

Penyedia berbeda dalam hal kunci mana yang mereka pegang untuk Anda, dan setiap kunci yang mereka pegang adalah sesuatu yang harus Anda percayakan kepada mereka.

### Staking sebagai layanan non-kustodial {#non-custodial-staking-as-a-service}

Dengan SaaS non-kustodial, Anda biasanya dipandu melalui pembuatan kunci validator Anda dan melakukan setoran 32 ETH Anda sendiri, lalu Anda mengunggah _kunci penandatanganan_ ke operator. Kunci penandatanganan memungkinkan operator untuk melakukan tugas validator (membuktikan dan mengusulkan blok) atas nama Anda. Menyalahgunakannya dapat membuat validator Anda dihukum atau mengalami pemotongan (slash), tetapi kunci tersebut tidak dapat digunakan untuk menarik, mentransfer, atau membelanjakan dana Anda.

_Kredensial penarikan_ validator tetap diarahkan ke alamat yang Anda kendalikan. Imbalan dan dana yang keluar hanya dapat masuk ke sana (lihat bagian model kepercayaan di bawah).

### Layanan kustodial dan staking bursa {#custodial-services-and-exchange-staking}

Di ujung spektrum yang sepenuhnya didelegasikan terdapat staking kustodial, yang paling umum ditawarkan oleh bursa terpusat. Anda tidak pernah menangani kunci sama sekali; Anda hanya menyimpan ETH di akun platform Anda dan memilih untuk melakukan staking. Ini adalah pengalaman pengguna yang paling sederhana, dan ini adalah opsi yang sah bagi orang-orang yang sudah menyimpan dana di bursa dan menerima risiko kustodial.

Ini juga membutuhkan kepercayaan paling besar. Penyedia mengendalikan baik kunci penandatanganan maupun kredensial penarikan; apa yang Anda pegang adalah saldo di platform mereka, bukan validator. Itu berarti:

- ETH yang Anda stake terpapar pada solvabilitas, keamanan, dan situasi regulasi penyedia, dan penarikan tunduk pada ketentuan dan waktu pemrosesan mereka, bukan hanya aturan protokol Ethereum.
- Anda tidak memiliki cara independen untuk keluar dari validator atau memulihkan dana jika penyedia gagal atau membekukan penarikan.
- Sejumlah besar ETH yang di-stake di bawah segelintir operator bursa berkontribusi pada sentralisasi stake, dan pilihan klien operator ini memengaruhi kesehatan jaringan. Melakukan staking dengan cara yang mempertahankan lebih banyak kendali di tangan Anda, atau memilih penyedia yang terbukti menjalankan klien minoritas, memberikan lebih banyak manfaat bagi ketahanan Ethereum.

## Model kepercayaan: apa yang harus dievaluasi {#trust-model-what-to-evaluate}

Staking yang didelegasikan selalu berarti mempercayakan sebagian dari pengaturan staking Anda kepada orang lain. Jawab pertanyaan-pertanyaan ini sebelum menyerahkan apa pun:

- **Siapa yang memegang kunci penarikan?** Kredensial penarikan validator (tipe 0x01 atau 0x02) menunjuk ke alamat lapisan eksekusi yang pada akhirnya mengendalikan stake. Jika alamat itu milik Anda, pengaturannya adalah non-kustodial; operator dapat menjalankan (atau salah mengelola) validator, tetapi ETH hanya dapat ditarik ke Anda. Jika kredensial menunjuk ke alamat penyedia, Anda memegang janji, bukan stake.
- **Bisakah Anda keluar tanpa operator?** Sejak [peningkatan Pectra](/roadmap/pectra/), [penarikan yang dipicu lapisan eksekusi (EIP-7002)](https://eips.ethereum.org/EIPS/eip-7002) memungkinkan alamat penarikan untuk memicu keluarnya validator (atau, untuk validator 0x02 yang menggabungkan bunga, penarikan sebagian saldo di atas 32 ETH) langsung dari lapisan eksekusi, tanpa kunci penandatanganan. Ini memerlukan transaksi dan membutuhkan biaya gas, tetapi ini berarti operator yang tidak responsif atau tidak berfungsi tidak dapat lagi menyandera validator Anda, asalkan kredensial penarikan adalah milik Anda.
- **Bagaimana struktur biayanya?** Layanan mengenakan biaya bulanan tetap atau persentase dari imbalan. Periksa bagaimana biaya berinteraksi dengan waktu henti (downtime) dan penalti: siapa yang menanggung biaya jika kinerja operator buruk, dan apakah ada jaminan atau asuransi yang ditawarkan.
- **Klien mana yang dijalankan operator?** Operator yang menjalankan mayoritas [klien eksekusi atau klien konsensus](/developers/docs/nodes-and-clients/client-diversity/) memaparkan stake Anda dan jaringan pada kegagalan yang berkorelasi jika klien tersebut memiliki bug. Utamakan penyedia yang mendokumentasikan penggunaan klien minoritas.
- **Apakah layanannya terbuka dan diaudit?** Penyedia mungkin menjalankan perangkat lunak tambahan di sekitar klien Ethereum standar yang bukan sumber terbuka atau tidak dapat diaudit. Carilah audit publik, riwayat operasi yang mapan, dan catatan pemotongan (slashing) yang bersih.
- **Apa yang terjadi jika penyedia menghilang?** Penyedia yang bertanggung jawab mendokumentasikan proses offboarding-nya, memberikan instruksi yang jelas tentang cara Anda keluar dari validator Anda, memulihkan kunci Anda, atau memicu keluar sendiri. Jika jawabannya sepenuhnya bergantung pada penyedia yang tetap berbisnis, itu adalah pengaturan kustodial.

<Alert variant="update">
<AlertIcon size="xl"><Split /></AlertIcon>
<AlertContent>
<AlertDescription>
**Beberapa penyedia dapat menjalankan validator Anda menggunakan teknologi validator terdistribusi (DVT)**, membagi kunci penandatanganan di beberapa node sehingga tidak ada satu mesin atau operator pun yang menjadi titik kegagalan. [Lebih lanjut tentang teknologi validator terdistribusi](/staking/dvt/)
</AlertDescription>
</AlertContent>
</Alert>

## Apa yang perlu dipertimbangkan {#what-to-consider}

Ada semakin banyak penyedia yang membantu Anda mendelegasikan operasi validator Anda, tetapi semuanya memiliki manfaat dan risikonya masing-masing. Semua opsi yang didelegasikan memerlukan asumsi kepercayaan tambahan dibandingkan dengan staking mandiri. Opsi yang didelegasikan mungkin memiliki kode tambahan yang membungkus klien Ethereum yang tidak terbuka atau tidak dapat diaudit. Pendelegasian juga memiliki efek merugikan pada desentralisasi jaringan. Bergantung pada pengaturannya, Anda mungkin tidak mengendalikan validator Anda, dan operator dapat bertindak tidak jujur menggunakan ETH Anda.

Indikator atribut digunakan di bawah ini untuk menandakan kekuatan atau kelemahan penting yang mungkin dimiliki penyedia yang terdaftar. Gunakan bagian ini sebagai referensi tentang bagaimana kami mendefinisikan atribut-atribut ini saat Anda memilih layanan staking.

<StakingConsiderations page="saas" />

## Jelajahi penyedia layanan staking {#saas-providers}

Di bawah ini adalah beberapa penyedia staking sebagai layanan yang tersedia. Gunakan indikator di atas untuk membantu memandu Anda melalui layanan-layanan ini.

<ProductDisclaimer />

### Penyedia SaaS {#saas-providers-2}

<StakingProductsCardGrid category="saas" />

Harap perhatikan pentingnya mendukung [keragaman klien](/developers/docs/nodes-and-clients/client-diversity/) karena ini meningkatkan keamanan jaringan, dan membatasi risiko Anda. Layanan yang memiliki bukti membatasi penggunaan klien mayoritas ditandai dengan <em style={{ textTransform: "uppercase" }}>"keragaman klien eksekusi"</em> dan <em style={{ textTransform: "uppercase" }}>"keragaman klien konsensus."</em>

### Pembuat Kunci {#key-generators}

<StakingProductsCardGrid category="keyGen" />

Punya saran untuk penyedia staking sebagai layanan yang kami lewatkan? Lihat [kebijakan pendaftaran produk](/contributing/adding-staking-products/) kami untuk melihat apakah itu cocok, dan untuk mengirimkannya agar ditinjau.

<StakingCommunityCallout className="my-16" />

## Pertanyaan yang sering diajukan {#faq}

<ExpandableCard title="Siapa yang memegang kunci saya?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Pengaturan berbeda dari satu penyedia ke penyedia lainnya. Dengan layanan non-kustodial, Anda akan dipandu melalui pembuatan kunci penandatanganan untuk validator Anda (setiap validator memegang 32 ETH, atau hingga 2048 ETH dengan kredensial penggabungan (0x02) sejak peningkatan Pectra), dan mengunggahnya ke penyedia Anda untuk memungkinkan mereka memvalidasi atas nama Anda. Kunci penandatanganan saja tidak memberikan kemampuan apa pun untuk menarik, mentransfer, atau membelanjakan dana Anda. Namun, kunci tersebut memberikan kemampuan untuk memberikan suara menuju konsensus, yang jika tidak dilakukan dengan benar dapat mengakibatkan penalti offline atau pemotongan.

Dengan layanan kustodial, seperti staking melalui bursa terpusat, penyedia memegang semua kunci: kunci penandatanganan dan kredensial penarikan. Dalam hal ini Anda mempercayakan dana itu sendiri kepada penyedia, bukan hanya operasi validator.
</ExpandableCard>

<ExpandableCard title="Jadi ada dua set kunci?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Ya. Setiap validator memiliki kunci _penandatanganan_ dan _kredensial penarikan_ yang terpisah. Agar validator dapat membuktikan state rantai, berpartisipasi dalam komite sinkronisasi, dan mengusulkan blok, kunci penandatanganan harus mudah diakses oleh klien validator. Kunci ini harus terhubung ke internet dalam beberapa bentuk, dan dengan demikian secara inheren dianggap sebagai kunci "panas" (hot keys). Kunci yang mengendalikan dana yang ditarik disimpan secara terpisah untuk alasan keamanan.

Kredensial penarikan menunjuk alamat lapisan eksekusi yang menjadi tujuan imbalan staking dan dana yang keluar. Alat penyetoran modern memungkinkan Anda mengatur alamat ini pada saat penyetoran, baik sebagai kredensial reguler (0x01) atau penggabungan (0x02), dan itu harus berupa alamat yang Anda kendalikan, idealnya diamankan di penyimpanan dingin (cold storage). Ini melindungi dana Anda bahkan jika orang lain mengendalikan kunci penandatanganan validator Anda, dan sejak peningkatan Pectra, ini juga memungkinkan Anda keluar dari validator langsung dari alamat tersebut.

Validator yang disiapkan pada hari-hari awal jaringan tanpa alamat penarikan eksekusi menggunakan kunci penarikan BLS lama, dan harus menandatangani pesan satu kali yang menyatakan alamat penarikan sebelum penarikan dapat dimulai. Ini melibatkan pembuatan ulang kunci penarikan dari frasa benih mnemonik yang dibuat saat pengaturan.

**Pastikan Anda mencadangkan frasa benih ini dengan aman atau Anda tidak akan dapat membuat kunci penarikan Anda saat waktunya tiba.**

Periksa dengan penyedia Anda untuk dukungan mengenai cara menyiapkan validator Anda.
</ExpandableCard>

<ExpandableCard title="Kapan saya bisa melakukan penarikan?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Cara kerja penarikan bergantung pada jenis kredensial penarikan validator Anda. Untuk validator reguler (0x01), saldo apa pun di atas 32 ETH secara otomatis disapu ke alamat penarikan secara berkala setiap beberapa hari. Untuk validator penggabungan (0x02), imbalan digabungkan ke dalam saldo validator hingga 2048 ETH, dan penarikan di bawah itu memerlukan pemicuan penarikan sebagian dari alamat penarikan Anda, yang membutuhkan biaya gas.

Validator juga dapat keluar sepenuhnya, yang membuka kunci seluruh sisa saldo ETH. Setelah menyelesaikan proses keluar, saldo penuh ditransfer ke alamat penarikan selama penyapuan validator berikutnya.

<ButtonLink href="/staking/withdrawals/">Lebih lanjut tentang penarikan staking</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Bagaimana jika penyedia saya menghilang atau tidak mau keluar dari validator saya?" eventCategory="SaasStaking" eventName="clicked what if my provider disappears">
Jika kredensial penarikan Anda menunjuk ke alamat yang Anda kendalikan, Anda dapat keluar dari validator sendiri dan memulihkan stake Anda; lihat [Model kepercayaan: apa yang harus dievaluasi](#trust-model-what-to-evaluate).

Jika penyedia memegang kredensial penarikan (seperti pada staking kustodial dan bursa), tidak ada cara tingkat protokol bagi Anda untuk memulihkan dana secara independen; jalan keluar Anda terbatas pada proses penyedia itu sendiri.
</ExpandableCard>

<ExpandableCard title="Apa yang terjadi jika saya terkena pemotongan?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Dengan menggunakan penyedia staking yang didelegasikan, Anda mempercayakan operasi node Anda kepada orang lain. Ini datang dengan risiko kinerja node yang buruk, yang tidak berada dalam kendali Anda. Jika validator Anda mengalami pemotongan, penalti awal yang sebanding dengan saldo validator Anda diterapkan (dibuat jauh lebih kecil dalam peningkatan Pectra), dan validator Anda dikeluarkan secara paksa dari set validator.

Setelah selesainya proses pemotongan/keluar, sisa dana ditransfer ke alamat penarikan yang ditetapkan ke validator.

Hubungi masing-masing penyedia untuk detail lebih lanjut tentang jaminan atau opsi asuransi apa pun. Jika Anda lebih suka memegang kendali penuh atas pengaturan validator Anda, [pelajari lebih lanjut tentang cara melakukan staking mandiri ETH Anda](/staking/solo/).
</ExpandableCard>

## Bacaan lebih lanjut {#further-reading}

- [Apa itu Staking-as-a-Service?](https://figment.io/insights/what-is-staking-as-a-service/) - _Figment_
- [Direktori Staking Ethereum](https://www.staking.directory/) - _Eridian dan Spacesider_
- [Mengevaluasi Layanan Staking](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
- [EIP-7002: Penarikan yang dapat dipicu lapisan eksekusi](https://eips.ethereum.org/EIPS/eip-7002) - _spesifikasi untuk mengeluarkan validator dari alamat penarikannya_