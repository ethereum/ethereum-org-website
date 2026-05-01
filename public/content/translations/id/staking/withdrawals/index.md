---
title: Penarikan staking
description: Halaman yang merangkum apa itu penarikan dorong staking, bagaimana cara kerjanya, dan apa yang perlu dilakukan staker untuk mendapatkan imbalan mereka
lang: id
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Badak Leslie dengan imbalan staking-nya
sidebarDepth: 2
summaryPoints:
  - Operator validator harus memberikan alamat penarikan untuk mengaktifkan penarikan
  - Validator lama memiliki kelebihan saldo di atas 32 ETH yang ditarik secara otomatis setiap beberapa hari
  - Validator majemuk mendapatkan imbalan atas saldo penuh mereka hingga 2048 ETH
  - Validator yang keluar sepenuhnya dari staking akan menerima sisa saldo mereka
---

**Penarikan staking** mengacu pada transfer ETH dari akun validator di lapisan konsensus Ethereum (Rantai suar), ke lapisan eksekusi di mana ETH tersebut dapat ditransaksikan.

> Jika Anda adalah bagian dari [pool staking](/staking/pools/) atau memegang token staking, Anda harus memeriksa dengan penyedia Anda untuk detail lebih lanjut tentang bagaimana penarikan staking ditangani, karena setiap layanan beroperasi secara berbeda.

Cara kerja penarikan bergantung pada jenis kredensial penarikan validator Anda:

- **Validator lama (Tipe 1)**: Kelebihan saldo di atas 32 ETH secara otomatis dan teratur dikirim ke alamat penarikan yang ditautkan ke validator. Imbalan di atas 32 ETH tidak berkontribusi pada bobot validator di jaringan.
- **Validator majemuk (Tipe 2)**: Imbalan dimajemukkan ke dalam saldo efektif validator hingga 2048 ETH, meningkatkan bobot validator dan menghasilkan lebih banyak imbalan. Hanya saldo yang melebihi 2048 ETH yang disapu secara otomatis.

Pengguna juga dapat **keluar dari staking sepenuhnya**, mengirimkan transaksi untuk menarik, menunggu garis waktu antrean penarikan (berdasarkan permintaan jaringan), dan membuka kunci saldo validator penuh mereka.

## Imbalan staking {#staking-rewards}

Bagaimana imbalan ditangani bergantung pada jenis kredensial validator:

**Validator lama (Tipe 1)** memiliki saldo efektif yang dibatasi pada 32 ETH. Saldo apa pun di atas 32 ETH yang diterima sebagai imbalan jaringan tidak berkontribusi pada saldo efektif atau meningkatkan bobot validator ini di jaringan, dan imbalan ini secara otomatis ditarik ke alamat penarikan khusus validator setiap beberapa hari. Selain memberikan alamat penarikan satu kali, mengklaim imbalan ini tidak memerlukan tindakan apa pun dari operator validator. Ini semua diinisiasi di lapisan konsensus, sehingga tidak ada gas (biaya transaksi) yang diwajibkan pada langkah apa pun.

**Validator majemuk (Tipe 2)** dapat memiliki saldo efektif di mana saja antara 32 dan 2048 ETH. Imbalan jaringan yang diterima oleh validator ini dimajemukkan ke dalam saldo efektif mereka, meningkatkan bobot validator dan potensi untuk menerima imbalan di masa mendatang. Sapuan otomatis hanya terjadi untuk saldo yang melebihi 2048 ETH. Untuk menarik imbalan di bawah ambang batas 2048 ETH, validator majemuk harus memicu penarikan sebagian secara manual dari lapisan eksekusi, yang mewajibkan gas.

### Bagaimana kita sampai di sini? {#how-did-we-get-here}

Selama beberapa tahun terakhir [Ethereum](/) telah menjalani beberapa peningkatan jaringan yang bertransisi ke jaringan yang diamankan oleh ETH itu sendiri, alih-alih penambangan intensif energi seperti sebelumnya. Berpartisipasi dalam konsensus di Ethereum sekarang dikenal sebagai "staking", karena peserta secara sukarela mengunci ETH, menempatkannya "sebagai stake" untuk kemampuan berpartisipasi dalam jaringan. Pengguna yang mengikuti aturan akan diberi imbalan, sementara upaya untuk curang dapat dihukum.

Sejak peluncuran kontrak deposit staking pada November 2020, beberapa perintis Ethereum yang berani telah secara sukarela mengunci dana untuk mengaktifkan "validator", akun khusus yang memiliki hak untuk secara resmi membuktikan dan mengusulkan blok, mengikuti aturan jaringan.

Sebelum peningkatan Shanghai/Capella, Anda tidak dapat menggunakan atau mengakses ETH yang di-stake. Namun sekarang, Anda dapat memilih untuk secara otomatis menerima imbalan Anda ke akun yang dipilih, dan Anda juga dapat menarik ETH yang di-stake kapan pun Anda mau.

### Bagaimana cara saya bersiap? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Pemberitahuan penting {#important-notices}

Akun validator diwajibkan untuk memberikan alamat penarikan sebelum mereka dapat mengakses dan menarik imbalan jaringan yang terkumpul, atau memproses penarikan penuh saat keluar dari staking.

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**Setiap akun validator hanya dapat diberi satu alamat penarikan, satu kali.** Setelah alamat dipilih dan dikirimkan ke lapisan konsensus, ini tidak dapat dibatalkan atau diubah lagi. Periksa kembali kepemilikan dan keakuratan alamat yang diberikan sebelum mengirimkan.
</AlertDescription>
</AlertContent>
</Alert>

Jika Anda belum memberikan alamat penarikan untuk akun validator Anda, **tidak ada ancaman terhadap dana Anda untuk sementara waktu**, dengan asumsi mnemonik/frasa benih Anda tetap aman secara luring, dan belum disusupi dengan cara apa pun. Kegagalan untuk menambahkan kredensial penarikan hanya akan membiarkan ETH terkunci di akun validator hingga alamat penarikan diberikan.

## Validator majemuk {#compounding-validators}

Validator dapat memilih **pemajemukan** dengan mengonversi kredensial penarikan mereka dari Tipe 1 ke Tipe 2. Ini menaikkan saldo efektif maksimum dari 32 ETH menjadi **2048 ETH**, memungkinkan imbalan untuk dimajemukkan ke dalam saldo efektif validator alih-alih disapu secara otomatis.

Dengan pemajemukan diaktifkan:

- Imbalan meningkatkan saldo efektif validator dalam peningkatan 1 ETH (tunduk pada [penyangga histeresis](https://www.attestant.io/posts/understanding-validator-effective-balance/) kecil), menghasilkan lebih banyak imbalan seiring waktu
- Sapuan otomatis hanya terjadi untuk saldo yang melebihi 2048 ETH
- Penarikan sebagian di bawah ambang batas 2048 ETH harus dipicu secara manual dari lapisan eksekusi (ini membutuhkan biaya gas)
- Beberapa validator dapat **dikonsolidasikan** menjadi satu validator majemuk, mengurangi beban operasional

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**Mengonversi dari kredensial penarikan Tipe 1 ke Tipe 2 tidak dapat diubah.** Gunakan [Staking Launchpad](https://launchpad.ethereum.org/validator-actions) sebagai alat resmi untuk konversi ini. Untuk detail lebih lanjut tentang proses konversi, risiko, dan konsolidasi, lihat [penyelaman mendalam MaxEB](/roadmap/pectra/maxeb/).
</AlertDescription>
</AlertContent>
</Alert>

## Keluar dari staking sepenuhnya {#exiting-staking-entirely}

Memberikan alamat penarikan diwajibkan sebelum _dana apa pun_ dapat ditransfer keluar dari saldo akun validator.

Pengguna yang ingin keluar dari staking sepenuhnya dan menarik kembali saldo penuh mereka harus menginisiasi "keluar sukarela." Ini dapat dilakukan dengan dua cara:

- **Menggunakan kunci validator**: Menandatangani dan menyiarkan pesan keluar sukarela dengan klien validator Anda, yang dikirimkan ke node konsensus Anda. Ini tidak mewajibkan gas.
- **Menggunakan kredensial penarikan**: Memicu keluar dari lapisan eksekusi menggunakan alamat penarikan Anda, tanpa perlu akses ke kunci penandatanganan validator. Ini mewajibkan transaksi dan membutuhkan biaya gas.

Proses validator keluar dari staking membutuhkan jumlah waktu yang bervariasi, bergantung pada berapa banyak validator lain yang keluar pada saat yang sama. Setelah selesai, akun ini tidak akan lagi bertanggung jawab untuk melakukan tugas jaringan validator, tidak lagi memenuhi syarat untuk imbalan, dan tidak lagi memiliki ETH mereka "sebagai stake". Pada saat ini akun akan ditandai sebagai sepenuhnya "dapat ditarik".

Setelah akun ditandai sebagai "dapat ditarik", dan kredensial penarikan telah diberikan, tidak ada lagi yang perlu dilakukan pengguna selain menunggu. Akun secara otomatis dan terus-menerus disapu oleh pengusul blok untuk dana keluar yang memenuhi syarat, dan saldo akun Anda akan ditransfer secara penuh (juga dikenal sebagai "penarikan penuh") selama <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>sapuan</a> berikutnya.

## Bagaimana cara kerja imbalan otomatis (validator Tipe 1)? {#how-do-withdrawals-work}

Apakah validator tertentu memenuhi syarat untuk penarikan atau tidak ditentukan oleh state dari akun validator itu sendiri. Tidak ada masukan pengguna yang dibutuhkan pada waktu tertentu untuk menentukan apakah suatu akun harus diinisiasi penarikannya atau tidak—seluruh proses dilakukan secara otomatis oleh lapisan konsensus dalam putaran yang berkelanjutan.

### Lebih suka belajar secara visual? {#visual-learner}

Lihat penjelasan tentang penarikan staking Ethereum oleh Finematics ini:

<VideoWatch slug="ethereum-staking-withdrawals" />

### "Penyapuan" validator {#validator-sweeping}

Ketika validator dijadwalkan untuk mengusulkan blok berikutnya, ia diwajibkan untuk membangun antrean penarikan, hingga 16 penarikan yang memenuhi syarat. Ini dilakukan dengan awalnya dimulai dengan indeks validator 0, menentukan apakah ada penarikan yang memenuhi syarat untuk akun ini sesuai aturan protokol, dan menambahkannya ke antrean jika ada. Validator yang ditetapkan untuk mengusulkan blok berikutnya akan melanjutkan dari tempat terakhir ditinggalkan, berlanjut secara berurutan tanpa batas.

<Alert variant="update">
<AlertEmoji text="🕛"/>
<AlertContent>
<AlertDescription>
Pikirkan tentang jam analog. Jarum jam menunjuk ke jam, bergerak ke satu arah, tidak melewati jam mana pun, dan akhirnya kembali ke awal lagi setelah angka terakhir tercapai.

Sekarang alih-alih 1 hingga 12, bayangkan jam tersebut memiliki 0 hingga N _(N adalah jumlah total akun validator yang pernah terdaftar di lapisan konsensus, lebih dari 1,2 juta per April 2026)._

Jarum jam menunjuk ke validator berikutnya yang perlu diperiksa untuk penarikan yang memenuhi syarat. Ini dimulai dari 0, dan berlanjut terus tanpa melewati akun mana pun. Ketika validator terakhir tercapai, siklus berlanjut kembali ke awal.
</AlertDescription>
</AlertContent>
</Alert>

#### Memeriksa akun untuk penarikan {#checking-an-account-for-withdrawals}

Sementara pengusul menyapu validator untuk kemungkinan penarikan, setiap validator yang diperiksa dievaluasi terhadap serangkaian pertanyaan singkat untuk menentukan apakah penarikan harus dipicu, dan jika ya, berapa banyak ETH yang harus ditarik.

1. **Apakah alamat penarikan telah diberikan?** Jika tidak ada alamat penarikan yang diberikan, akun dilewati dan tidak ada penarikan yang diinisiasi.
2. **Apakah validator telah keluar dan dapat ditarik?** Jika validator telah sepenuhnya keluar, dan kita telah mencapai Epok di mana akun mereka dianggap "dapat ditarik", maka penarikan penuh akan diproses. Ini akan mentransfer seluruh sisa saldo ke alamat penarikan.
3. **Apakah saldo melebihi saldo efektif maksimumnya?** Untuk validator lama (Tipe 1), ambang batas ini adalah 32 ETH. Untuk validator majemuk (Tipe 2), ambang batas ini adalah 2048 ETH. Jika akun memiliki kredensial penarikan, belum sepenuhnya keluar, memiliki saldo efektif pada batas maksimum, dan memiliki saldo di atas ambang batas ini, maka penarikan sebagian akan diproses yang hanya mentransfer kelebihannya ke alamat penarikan pengguna.

Hanya ada dua tindakan yang diambil oleh operator validator selama siklus hidup validator yang memengaruhi alur ini secara langsung:

- Memberikan kredensial penarikan untuk mengaktifkan segala bentuk penarikan
- Keluar dari jaringan, yang akan memicu penarikan penuh

### Bebas gas {#gas-free}

Sapuan penarikan otomatis tidak mewajibkan staker untuk mengirimkan transaksi secara manual. Ini berarti **tidak ada gas (biaya transaksi) yang diwajibkan** untuk sapuan otomatis, dan mereka tidak bersaing untuk ruang blok lapisan eksekusi yang ada.

Perhatikan bahwa [validator majemuk](#compounding-validators) yang ingin memicu penarikan sebagian di bawah ambang batas 2048 ETH harus melakukannya secara manual dari lapisan eksekusi, yang mewajibkan gas.

### Seberapa sering imbalan staking saya akan dibuka kuncinya dan tersedia di dompet saya? {#how-soon}

Maksimal 16 penarikan dapat diproses dalam satu blok. Pada tingkat itu, 115.200 penarikan validator dapat diproses per hari (dengan asumsi tidak ada slot yang terlewat). Seperti dicatat di atas, validator tanpa penarikan yang memenuhi syarat akan dilewati, mengurangi waktu untuk menyelesaikan sapuan.

Memperluas perhitungan ini, kita dapat memperkirakan waktu yang dibutuhkan untuk memproses sejumlah penarikan tertentu:

<TableContainer>

| Jumlah penarikan | Waktu untuk menyelesaikan |
| :-------------------: | :--------------: |
|        400.000        |     3,5 hari     |
|        500.000        |     4,3 hari     |
|        600.000        |     5,2 hari     |
|        700.000        |     6,1 hari     |
|        800.000        |     7,0 hari     |

</TableContainer>

Seperti yang Anda lihat, ini melambat karena semakin banyak validator di jaringan. Peningkatan slot yang terlewat dapat memperlambat ini secara proporsional, tetapi ini umumnya akan mewakili sisi yang lebih lambat dari kemungkinan hasil.

## Pertanyaan yang sering diajukan {#faq}

<ExpandableCard
title="Setelah saya memberikan alamat penarikan, dapatkah saya mengubahnya ke alamat penarikan alternatif?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
Tidak, proses untuk memberikan kredensial penarikan adalah proses satu kali, dan tidak dapat diubah setelah dikirimkan.
</ExpandableCard>

<ExpandableCard
title="Mengapa alamat penarikan validator hanya dapat diatur sekali?"
eventCategory="FAQ"
eventAction="Why can a validator's withdrawal address only be set once?"
eventName="read more">
Menetapkan alamat penarikan lapisan eksekusi validator adalah perubahan permanen pada kredensial validator di lapisan konsensus. Tidak ada cara untuk memperbarui kredensial lapisan konsensus setelah terdaftar.

Kredensial alamat penarikan validator dapat diatur untuk menunjuk ke kontrak pintar (dikendalikan oleh kodenya), atau akun yang dimiliki secara eksternal (EOA, dikendalikan oleh kunci privatnya). Saat ini, akun-akun ini tidak memiliki cara untuk mengomunikasikan pesan kembali ke lapisan konsensus yang akan menandakan perubahan kredensial validator, dan menambahkan fungsionalitas ini akan menambah kerumitan yang tidak perlu pada protokol.

Pengguna yang mencari manajemen penarikan yang fleksibel dapat mengatur dompet kontrak pintar yang mampu melakukan rotasi kunci (seperti [Safe](https://safe.global/)) sebagai alamat penarikan validator, yang secara efektif memungkinkan EOA penerima akhir untuk diperbarui. Jika pengguna telah menetapkan EOA sebagai kredensial penarikan, mereka harus menginisiasi keluar penuh untuk memulihkan ETH yang di-stake dan kemudian menggunakan dana tersebut untuk mengaktifkan validator baru dengan kredensial yang berbeda.
</ExpandableCard>

<ExpandableCard
title="Bagaimana cara menarik dari staking jika saya melakukan staking melalui penyedia, pool staking, atau berpartisipasi dengan token liquid staking?"
eventCategory="FAQ"
eventAction="How do I withdraw from staking if I stake through a provider, staking pool, or participate with liquid staking tokens?"
eventName="read more">
Jika Anda menggunakan pool staking atau memegang token staking, hubungi penyedia Anda untuk mempelajari bagaimana mereka menangani penarikan, karena prosesnya bervariasi menurut layanan.

Secara umum, saat melakukan staking melalui penyedia atau pool, Anda harus bebas untuk mengklaim kembali ETH yang di-stake yang mendasarinya, atau untuk menarik dan mengubah penyedia staking mana yang Anda manfaatkan. Jika pool tertentu menjadi terlalu besar, ETH yang di-stake dapat dikeluarkan, ditebus, dan di-stake lagi dengan [penyedia yang lebih kecil](https://rated.network/). Atau, jika Anda telah mengumpulkan cukup ETH, Anda dapat melakukan [staking dari rumah](/staking/solo/).

</ExpandableCard>

<ExpandableCard
title="Apakah klaim imbalan jaringan (penarikan sebagian) terjadi secara otomatis?"
eventCategory="FAQ"
eventAction="Does claiming network rewards (partial withdrawals) happen automatically?"
eventName="read more">
Untuk **validator lama (Tipe 1)**, ya—selama validator Anda telah memberikan alamat penarikan. Ini harus diberikan sekali untuk mengaktifkan penarikan apa pun, kemudian distribusi imbalan jaringan ke alamat penarikan akan dipicu secara otomatis setiap beberapa hari dengan setiap sapuan validator.

Untuk **validator majemuk (Tipe 2)**, imbalan dimajemukkan ke dalam saldo efektif validator (hingga 2048 ETH) alih-alih disapu ke alamat penarikan. Sapuan otomatis hanya terjadi untuk saldo yang melebihi 2048 ETH. Untuk menarik imbalan di bawah ambang batas ini, Anda harus memicu penarikan sebagian secara manual dari lapisan eksekusi.
</ExpandableCard>

<ExpandableCard title="Dapatkah saya menarik jumlah khusus?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
Untuk **validator lama (Tipe 1)**, setiap imbalan jaringan ETH yang telah terkumpul di atas saldo efektif 32 ETH validator secara otomatis didorong ke alamat penarikan. Validator Tipe 1 yang telah mengirimkan transaksi penarikan penuh dan menyelesaikan proses keluar staking akan ditarik saldo ETH penuhnya ke alamat penarikan mereka. Tidak mungkin bagi validator Tipe 1 untuk meminta jumlah ETH tertentu secara manual untuk ditarik.

**Validator majemuk (Tipe 2)** dapat memicu penarikan sebagian dari jumlah tertentu dari lapisan eksekusi, selama sisa saldo validator tetap pada atau di atas 32 ETH. Ini mewajibkan pengiriman transaksi penarikan sebagian dan membutuhkan biaya gas.
</ExpandableCard>

<ExpandableCard
title="Saya mengoperasikan validator. Di mana saya dapat menemukan informasi lebih lanjut tentang pengelolaan proses penarikan?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information about managing the withdrawal process?"
eventName="read more">

Operator validator disarankan untuk mengunjungi halaman [Penarikan Staking Launchpad](https://launchpad.ethereum.org/withdrawals/) di mana Anda akan menemukan detail lebih lanjut tentang cara menyiapkan validator Anda untuk penarikan, waktu acara, dan detail lebih lanjut tentang bagaimana penarikan berfungsi.

Untuk mencoba pengaturan Anda di testnet terlebih dahulu, kunjungi [Staking Launchpad Testnet Hoodi](https://hoodi.launchpad.ethereum.org) untuk memulai.

</ExpandableCard>

<ExpandableCard
title="Dapatkah saya mengaktifkan kembali validator saya setelah keluar dengan mendepositkan lebih banyak ETH?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
Tidak. Setelah validator keluar dan saldo penuhnya telah ditarik, setiap ETH tambahan yang didepositkan ke validator tersebut akan secara otomatis ditransfer ke alamat penarikan selama sapuan validator berikutnya. Untuk mulai melakukan staking lagi menggunakan ETH tersebut, Anda harus mengaktifkan validator baru.
</ExpandableCard>

<ExpandableCard
title="Apa perbedaan antara validator lama dan validator majemuk?"
eventCategory="FAQ"
eventAction="What is the difference between legacy and compounding validators?"
eventName="read more">
Validator lama menggunakan kredensial penarikan **Tipe 1** (alamat kredensial penarikan dimulai dengan 0x01) dan memiliki saldo efektif yang dibatasi pada 32 ETH. Setiap kelebihan ETH yang diterima sebagai imbalan jaringan secara otomatis disapu ke alamat penarikan setiap beberapa hari.

Validator majemuk menggunakan kredensial penarikan **Tipe 2** (alamat kredensial penarikan dimulai dengan 0x02) dan dapat memiliki saldo efektif hingga 2048 ETH. Imbalan dimajemukkan ke dalam saldo efektif validator, meningkatkan bobot validator di jaringan dan potensi untuk menerima imbalan di masa mendatang. Sapuan otomatis hanya terjadi untuk saldo yang melebihi 2048 ETH. Untuk menarik ETH di bawah ambang batas ini, penarikan sebagian manual harus dipicu dari lapisan eksekusi.

Untuk detail lebih lanjut, lihat [penyelaman mendalam MaxEB](/roadmap/pectra/maxeb/).
</ExpandableCard>

<ExpandableCard
title="Bagaimana cara mengonversi ke validator majemuk?"
eventCategory="FAQ"
eventAction="How do I convert to a compounding validator?"
eventName="read more">
Anda dapat mengonversi dari kredensial penarikan Tipe 1 ke Tipe 2 menggunakan [Staking Launchpad](https://launchpad.ethereum.org/validator-actions). Operasi ini **tidak dapat diubah** — setelah Anda mengonversi, Anda tidak dapat kembali ke kredensial Tipe 1.

Setelah mengonversi, Anda juga dapat **mengonsolidasikan** beberapa validator menjadi satu, menggabungkan saldo mereka menjadi satu validator majemuk. Untuk panduan lengkap tentang proses konversi, risiko, dan alat konsolidasi, lihat [penyelaman mendalam MaxEB](/roadmap/pectra/maxeb/).
</ExpandableCard>

<ExpandableCard
title="Kapan penarikan staking diaktifkan?"
eventCategory="FAQ"
eventAction="When were staking withdrawals enabled?"
eventName="read more">
Fungsionalitas penarikan awalnya diaktifkan sebagai bagian dari peningkatan Shanghai/Capella pada **12 April 2023**. [Peningkatan Pectra](/roadmap/pectra/) (Mei 2025) kemudian memperkenalkan validator majemuk dengan saldo efektif maksimum yang lebih tinggi yaitu 2048 ETH, serta keluar yang dipicu lapisan eksekusi dan penarikan sebagian.

Peningkatan Shanghai/Capella memungkinkan ETH yang sebelumnya di-stake untuk diklaim kembali ke akun Ethereum biasa. Ini menutup putaran pada Likuiditas staking, dan membawa Ethereum selangkah lebih dekat dalam perjalanannya menuju pembangunan ekosistem terdesentralisasi yang berkelanjutan, dapat diskalakan, dan aman.

- [Lebih lanjut tentang sejarah Ethereum](/ethereum-forks/)
- [Lebih lanjut tentang peta jalan Ethereum](/roadmap/)
</ExpandableCard>

## Bacaan lebih lanjut {#further-reading}

- [Penarikan Staking Launchpad](https://launchpad.ethereum.org/withdrawals)
- [Tindakan Validator Staking Launchpad](https://launchpad.ethereum.org/validator-actions)
- [Penyelaman mendalam MaxEB: pemajemukan dan konsolidasi](/roadmap/pectra/maxeb/)
- [EIP-4895: Penarikan dorong Rantai suar sebagai operasi](https://eips.ethereum.org/EIPS/eip-4895)
- [PEEPanEIP #94: Penarikan ETH yang Di-stake (Pengujian) bersama Potuz & Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Penarikan dorong Rantai suar sebagai operasi bersama Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Memahami Saldo Efektif Validator](https://www.attestant.io/posts/understanding-validator-effective-balance/)