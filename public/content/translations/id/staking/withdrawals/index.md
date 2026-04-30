---
title: Penarikan staking
description: Halaman yang merangkum apa itu penarikan push staking, bagaimana cara kerjanya, dan apa yang perlu dilakukan staker untuk mendapatkan hadiah mereka
lang: id
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Badak Leslie dengan hadiah staking-nya
sidebarDepth: 2
summaryPoints:
  - Operator validator harus menyediakan alamat penarikan untuk mengaktifkan penarikan
  - Validator warisan memiliki kelebihan saldo di atas 32 ETH yang ditarik secara otomatis setiap beberapa hari
  - Validator majemuk mendapatkan hadiah dari saldo penuh mereka hingga 2048 ETH
  - Validator yang sepenuhnya keluar dari mengunci (staking) akan menerima sisa saldo mereka
---

**Penarikan staking** mengacu pada transfer ETH dari akun validator di lapisan konsensus Ethereum (beacon chain), ke lapisan eksekusi di mana ETH tersebut dapat ditransaksikan.

Cara kerja penarikan bergantung pada jenis kredensial penarikan validator Anda:

- **Validator warisan (Tipe 1)**: Kelebihan saldo di atas 32 ETH secara otomatis dan teratur dikirim ke alamat penarikan yang ditautkan ke validator. Hadiah di atas 32 ETH tidak berkontribusi pada bobot validator di jaringan.
- **Validator majemuk (Tipe 2)**: Hadiah digabungkan (majemuk) ke dalam saldo efektif validator hingga 2048 ETH, meningkatkan bobot validator dan menghasilkan lebih banyak hadiah. Hanya saldo yang melebihi 2048 ETH yang disapu secara otomatis.

Pengguna juga dapat **keluar dari mengunci sepenuhnya**, membuka kunci saldo validator penuh mereka.

## Hadiah staking {#staking-rewards}

Cara penanganan hadiah bergantung pada jenis kredensial validator:

**Validator warisan (Tipe 1)** memiliki saldo efektif yang dibatasi pada 32 ETH. Setiap saldo di atas 32 ETH yang diperoleh melalui hadiah tidak berkontribusi pada pokok atau meningkatkan bobot validator ini di jaringan, dan secara otomatis ditarik sebagai pembayaran hadiah setiap beberapa hari. Selain menyediakan alamat penarikan satu kali, hadiah ini tidak memerlukan tindakan apa pun dari operator validator. Ini semua dimulai di lapisan konsensus, sehingga tidak ada gas (biaya transaksi) yang diperlukan pada langkah apa pun.

**Validator majemuk (Tipe 2)** dapat memiliki saldo efektif di mana saja antara 32 dan 2048 ETH. Hadiah yang diperoleh oleh validator ini digabungkan ke dalam saldo efektif mereka, meningkatkan bobot validator dan hadiah di masa mendatang. Penyapuan otomatis hanya terjadi untuk saldo yang melebihi 2048 ETH. Untuk menarik hadiah di bawah ambang batas 2048 ETH, validator majemuk harus memicu penarikan sebagian secara manual dari lapisan eksekusi, yang memerlukan gas.

### Bagaimana kita sampai di sini? {#how-did-we-get-here}

Selama beberapa tahun terakhir [Ethereum](/) telah mengalami beberapa peningkatan jaringan yang bertransisi ke jaringan yang diamankan oleh ETH itu sendiri, alih-alih penambangan intensif energi seperti sebelumnya. Berpartisipasi dalam konsensus di Ethereum sekarang dikenal sebagai "mengunci" (staking), karena peserta secara sukarela mengunci ETH, menempatkannya "sebagai taruhan" (at stake) untuk kemampuan berpartisipasi dalam jaringan. Pengguna yang mengikuti aturan akan diberi hadiah, sementara upaya untuk curang dapat dihukum.

Sejak peluncuran kontrak deposit staking pada November 2020, beberapa perintis Ethereum yang berani telah secara sukarela mengunci dana untuk mengaktifkan "validator", akun khusus yang memiliki hak untuk secara resmi melakukan pengesahan dan mengusulkan blok, mengikuti aturan jaringan.

Sebelum peningkatan Shanghai/Capella, Anda tidak dapat menggunakan atau mengakses ETH yang Anda stake. Namun sekarang, Anda dapat memilih untuk secara otomatis menerima hadiah Anda ke akun yang dipilih, dan Anda juga dapat menarik ETH yang Anda stake kapan pun Anda mau.

### Bagaimana cara saya bersiap? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Pemberitahuan penting {#important-notices}

Menyediakan alamat penarikan adalah langkah yang diperlukan untuk setiap akun validator sebelum memenuhi syarat untuk menarik ETH dari saldonya.

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**Setiap akun validator hanya dapat diberi satu alamat penarikan, satu kali.** Setelah alamat dipilih dan dikirimkan ke lapisan konsensus, ini tidak dapat dibatalkan atau diubah lagi. Periksa kembali kepemilikan dan keakuratan alamat yang diberikan sebelum mengirimkan.
</AlertDescription>
</AlertContent>
</Alert>

**Tidak ada ancaman terhadap dana Anda untuk sementara waktu** karena tidak menyediakan ini, dengan asumsi mnemonik/frasa seed Anda tetap aman secara offline, dan belum disusupi dengan cara apa pun. Kegagalan untuk menambahkan kredensial penarikan hanya akan membiarkan ETH terkunci di akun validator seperti sebelumnya sampai alamat penarikan diberikan.

## Validator majemuk {#compounding-validators}

Validator dapat memilih **penggabungan (compounding)** dengan mengonversi kredensial penarikan mereka dari Tipe 1 ke Tipe 2. Ini meningkatkan saldo efektif maksimum dari 32 ETH menjadi **2048 ETH**, memungkinkan hadiah untuk digabungkan ke dalam saldo efektif validator alih-alih disapu secara otomatis.

Dengan penggabungan diaktifkan:

- Hadiah meningkatkan saldo efektif validator dalam peningkatan 1 ETH (tunduk pada [penyangga histeresis](https://www.attestant.io/posts/understanding-validator-effective-balance/) kecil), menghasilkan lebih banyak hadiah seiring waktu
- Penyapuan otomatis hanya terjadi untuk saldo yang melebihi 2048 ETH
- Penarikan sebagian di bawah ambang batas 2048 ETH harus dipicu secara manual dari lapisan eksekusi (ini membutuhkan biaya gas)
- Beberapa validator dapat **dikonsolidasikan** menjadi satu validator majemuk, mengurangi biaya operasional

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**Mengonversi kredensial penarikan dari Tipe 1 ke Tipe 2 tidak dapat diubah.** Gunakan [Staking Launchpad](https://launchpad.ethereum.org/validator-actions) sebagai alat resmi untuk konversi ini. Untuk detail lebih lanjut tentang proses konversi, risiko, dan konsolidasi, lihat [penjelasan mendalam MaxEB](/roadmap/pectra/maxeb/).
</AlertDescription>
</AlertContent>
</Alert>

## Keluar dari mengunci sepenuhnya {#exiting-staking-entirely}

Menyediakan alamat penarikan diperlukan sebelum dana _apa pun_ dapat ditransfer keluar dari saldo akun validator.

Pengguna yang ingin keluar dari mengunci sepenuhnya dan menarik kembali saldo penuh mereka harus memulai "keluar sukarela". Ini dapat dilakukan dengan dua cara:

- **Menggunakan kunci validator**: Tanda tangani dan siarkan pesan keluar sukarela dengan klien validator Anda, yang dikirimkan ke node konsensus Anda. Ini tidak memerlukan gas.
- **Menggunakan kredensial penarikan**: Picu keluar dari lapisan eksekusi menggunakan alamat penarikan Anda, tanpa perlu akses ke kunci penandatanganan validator. Ini memerlukan transaksi dan membutuhkan biaya gas.

Proses validator keluar dari mengunci membutuhkan jumlah waktu yang bervariasi, tergantung pada berapa banyak validator lain yang keluar pada saat yang sama. Setelah selesai, akun ini tidak akan lagi bertanggung jawab untuk melakukan tugas jaringan validator, tidak lagi memenuhi syarat untuk mendapatkan hadiah, dan tidak lagi memiliki ETH mereka "sebagai taruhan" (at stake). Pada saat ini akun akan ditandai sebagai sepenuhnya "dapat ditarik".

Setelah akun ditandai sebagai "dapat ditarik", dan kredensial penarikan telah diberikan, tidak ada lagi yang perlu dilakukan pengguna selain menunggu. Akun secara otomatis dan terus-menerus disapu oleh pengusul blok untuk dana keluar yang memenuhi syarat, dan saldo akun Anda akan ditransfer secara penuh (juga dikenal sebagai "penarikan penuh") selama <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>penyapuan</a> berikutnya.

## Kapan penarikan staking diaktifkan? {#when}

Fungsionalitas penarikan pada awalnya diaktifkan sebagai bagian dari peningkatan Shanghai/Capella pada **12 April 2023**. [Peningkatan Pectra](/roadmap/pectra/) (Mei 2025) kemudian memperkenalkan validator majemuk dengan saldo efektif maksimum yang lebih tinggi yaitu 2048 ETH, serta keluar yang dipicu oleh lapisan eksekusi dan penarikan sebagian.

Peningkatan Shanghai/Capella memungkinkan ETH yang sebelumnya di-stake untuk diklaim kembali ke akun Ethereum reguler. Ini menutup putaran pada likuiditas staking, dan membawa Ethereum selangkah lebih dekat dalam perjalanannya menuju pembangunan ekosistem desentralisasi yang berkelanjutan, dapat ditingkatkan, dan aman.

- [Lebih lanjut tentang sejarah Ethereum](/ethereum-forks/)
- [Lebih lanjut tentang peta jalan Ethereum](/roadmap/)

## Bagaimana cara kerja pembayaran penarikan? {#how-do-withdrawals-work}

Apakah validator tertentu memenuhi syarat untuk penarikan atau tidak ditentukan oleh status akun validator itu sendiri. Tidak ada input pengguna yang diperlukan pada waktu tertentu untuk menentukan apakah suatu akun harus memulai penarikan atau tidak—seluruh proses dilakukan secara otomatis oleh lapisan konsensus dalam putaran yang berkelanjutan.

### Lebih suka belajar secara visual? {#visual-learner}

Lihat penjelasan tentang penarikan staking Ethereum ini oleh Finematics:

<YouTube id="RwwU3P9n3uo" />

### "Penyapuan" validator {#validator-sweeping}

Ketika validator dijadwalkan untuk mengusulkan blok berikutnya, validator diharuskan untuk membangun antrean penarikan, hingga 16 penarikan yang memenuhi syarat. Ini dilakukan dengan awalnya dimulai dengan indeks validator 0, menentukan apakah ada penarikan yang memenuhi syarat untuk akun ini sesuai aturan protokol, dan menambahkannya ke antrean jika ada. Validator yang ditetapkan untuk mengusulkan blok berikutnya akan melanjutkan dari tempat terakhir ditinggalkan, maju secara berurutan tanpa batas.

<Alert variant="update">
<AlertEmoji text="🕛"/>
<AlertContent>
<AlertDescription>
Pikirkan tentang jam analog. Jarum jam menunjuk ke jam, bergerak ke satu arah, tidak melewati jam mana pun, dan akhirnya kembali ke awal lagi setelah angka terakhir tercapai.

Sekarang alih-alih 1 hingga 12, bayangkan jam tersebut memiliki 0 hingga N _(jumlah total akun validator yang pernah terdaftar di lapisan konsensus, lebih dari 500.000 per Jan 2023)._

Jarum jam menunjuk ke validator berikutnya yang perlu diperiksa untuk penarikan yang memenuhi syarat. Ini dimulai dari 0, dan berlanjut terus tanpa melewati akun mana pun. Ketika validator terakhir tercapai, siklus berlanjut kembali ke awal.
</AlertDescription>
</AlertContent>
</Alert>

#### Memeriksa akun untuk penarikan {#checking-an-account-for-withdrawals}

Sementara pengusul menyapu validator untuk kemungkinan penarikan, setiap validator yang diperiksa dievaluasi terhadap serangkaian pertanyaan singkat untuk menentukan apakah penarikan harus dipicu, dan jika ya, berapa banyak ETH yang harus ditarik.

1. **Apakah alamat penarikan telah diberikan?** Jika tidak ada alamat penarikan yang diberikan, akun dilewati dan tidak ada penarikan yang dimulai.
2. **Apakah validator telah keluar dan dapat ditarik?** Jika validator telah sepenuhnya keluar, dan kita telah mencapai epoch di mana akun mereka dianggap "dapat ditarik", maka penarikan penuh akan diproses. Ini akan mentransfer seluruh sisa saldo ke alamat penarikan.
3. **Apakah saldo melebihi saldo efektif maksimum?** Untuk validator warisan (Tipe 1), ambang batas ini adalah 32 ETH. Untuk validator majemuk (Tipe 2), ambang batas ini adalah 2048 ETH. Jika akun memiliki kredensial penarikan, belum sepenuhnya keluar, dan memiliki saldo di atas ambang batasnya, penarikan sebagian akan diproses yang hanya mentransfer kelebihannya ke alamat penarikan pengguna.

Hanya ada dua tindakan yang diambil oleh operator validator selama siklus hidup validator yang memengaruhi alur ini secara langsung:

- Menyediakan kredensial penarikan untuk mengaktifkan segala bentuk penarikan
- Keluar dari jaringan, yang akan memicu penarikan penuh

### Bebas gas {#gas-free}

Penyapuan penarikan otomatis tidak mengharuskan staker untuk mengirimkan transaksi secara manual. Ini berarti **tidak ada gas (biaya transaksi) yang diperlukan** untuk penyapuan otomatis, dan mereka tidak bersaing untuk ruang blok lapisan eksekusi yang ada.

Perhatikan bahwa [validator majemuk](#compounding-validators) yang ingin memicu penarikan sebagian di bawah ambang batas 2048 ETH harus melakukannya secara manual dari lapisan eksekusi, yang memerlukan gas.

### Seberapa sering saya akan mendapatkan hadiah staking saya? {#how-soon}

Maksimal 16 penarikan dapat diproses dalam satu blok. Pada tingkat itu, 115.200 penarikan validator dapat diproses per hari (dengan asumsi tidak ada slot yang terlewat). Seperti dicatat di atas, validator tanpa penarikan yang memenuhi syarat akan dilewati, mengurangi waktu untuk menyelesaikan penyapuan.

Memperluas perhitungan ini, kita dapat memperkirakan waktu yang dibutuhkan untuk memproses sejumlah penarikan tertentu:

<TableContainer>

| Jumlah penarikan | Waktu penyelesaian |
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
title="Mengapa alamat penarikan hanya dapat diatur satu kali?"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
Dengan mengatur alamat penarikan lapisan eksekusi, kredensial penarikan untuk validator tersebut telah diubah secara permanen. Ini berarti kredensial lama tidak akan berfungsi lagi, dan kredensial baru mengarah ke akun lapisan eksekusi.

Alamat penarikan dapat berupa kontrak pintar (dikendalikan oleh kodenya), atau akun yang dimiliki secara eksternal (EOA, dikendalikan oleh kunci pribadinya). Saat ini akun-akun ini tidak memiliki cara untuk mengomunikasikan pesan kembali ke lapisan konsensus yang akan menandakan perubahan kredensial validator, dan menambahkan fungsionalitas ini akan menambah kerumitan yang tidak perlu pada protokol.

Sebagai alternatif untuk mengubah alamat penarikan untuk validator tertentu, pengguna dapat memilih untuk mengatur kontrak pintar sebagai alamat penarikan mereka yang dapat menangani rotasi kunci, seperti Safe. Pengguna yang mengatur dana mereka ke EOA mereka sendiri dapat melakukan keluar penuh untuk menarik semua dana yang mereka stake, dan kemudian melakukan stake ulang menggunakan kredensial baru.
</ExpandableCard>

<ExpandableCard
title="Bagaimana jika saya berpartisipasi dalam token staking atau kolam staking"
eventCategory="FAQ"
eventAction="What if I participate in staking tokens or pooled staking"
eventName="read more">

Jika Anda adalah bagian dari [kolam staking](/staking/pools/) atau memegang token staking, Anda harus memeriksa dengan penyedia Anda untuk detail lebih lanjut tentang bagaimana penarikan staking ditangani, karena setiap layanan beroperasi secara berbeda.

Secara umum, pengguna harus bebas untuk mengklaim kembali ETH yang di-stake yang mendasarinya, atau mengubah penyedia staking mana yang mereka gunakan. Jika kolam tertentu menjadi terlalu besar, dana dapat dikeluarkan, ditebus, dan di-stake ulang dengan [penyedia yang lebih kecil](https://rated.network/). Atau, jika Anda telah mengumpulkan cukup ETH, Anda dapat [mengunci dari rumah](/staking/solo/).

</ExpandableCard>

<ExpandableCard
title="Apakah pembayaran hadiah (penarikan sebagian) terjadi secara otomatis?"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">
Untuk **validator warisan (Tipe 1)**, ya — selama validator Anda telah memberikan alamat penarikan. Ini harus diberikan sekali untuk awalnya mengaktifkan penarikan apa pun, kemudian pembayaran hadiah akan dipicu secara otomatis setiap beberapa hari dengan setiap penyapuan validator.

Untuk **validator majemuk (Tipe 2)**, hadiah digabungkan ke dalam saldo efektif alih-alih disapu. Penyapuan otomatis hanya terjadi untuk saldo yang melebihi 2048 ETH. Untuk menarik hadiah di bawah ambang batas ini, Anda harus memicu penarikan sebagian secara manual dari lapisan eksekusi.
</ExpandableCard>

<ExpandableCard
title="Apakah penarikan penuh terjadi secara otomatis?"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

Tidak, jika validator Anda masih aktif di jaringan, penarikan penuh tidak akan terjadi secara otomatis. Ini memerlukan inisiasi keluar sukarela secara manual.

Setelah validator menyelesaikan proses keluar, dan dengan asumsi akun memiliki kredensial penarikan, sisa saldo _kemudian_ akan ditarik selama <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "FAQ happen automatically (sweep)", eventName: "click" }}>penyapuan validator</a> berikutnya.

</ExpandableCard>

<ExpandableCard title="Dapatkah saya menarik jumlah khusus?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
Untuk **validator warisan (Tipe 1)**, penarikan didorong secara otomatis, mentransfer ETH apa pun yang tidak secara aktif berkontribusi pada stake. Ini termasuk saldo penuh untuk akun yang telah menyelesaikan proses keluar. Tidak mungkin untuk meminta jumlah ETH tertentu secara manual untuk ditarik bagi validator Tipe 1.

**Validator majemuk (Tipe 2)** dapat memicu penarikan sebagian dari jumlah tertentu dari lapisan eksekusi, selama sisa saldo tetap pada atau di atas 32 ETH. Ini memerlukan transaksi dan membutuhkan biaya gas.
</ExpandableCard>

<ExpandableCard
title="Saya mengoperasikan validator. Di mana saya dapat menemukan informasi lebih lanjut tentang mengaktifkan penarikan?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information on enabling withdrawals?"
eventName="read more">

Operator validator disarankan untuk mengunjungi halaman [Penarikan Staking Launchpad](https://launchpad.ethereum.org/withdrawals/) di mana Anda akan menemukan detail lebih lanjut tentang cara menyiapkan validator Anda untuk penarikan, waktu acara, dan detail lebih lanjut tentang bagaimana penarikan berfungsi.

Untuk mencoba pengaturan Anda di testnet terlebih dahulu, kunjungi [Hoodi Testnet Staking Launchpad](https://hoodi.launchpad.ethereum.org) untuk memulai.

</ExpandableCard>

<ExpandableCard
title="Dapatkah saya mengaktifkan kembali validator saya setelah keluar dengan menyetorkan lebih banyak ETH?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
Tidak. Setelah validator keluar dan saldo penuhnya telah ditarik, dana tambahan apa pun yang disetorkan ke validator tersebut akan secara otomatis ditransfer ke alamat penarikan selama penyapuan validator berikutnya. Untuk melakukan stake ulang ETH, validator baru harus diaktifkan.
</ExpandableCard>

<ExpandableCard
title="Apa perbedaan antara validator warisan dan majemuk?"
eventCategory="FAQ"
eventAction="What is the difference between legacy and compounding validators?"
eventName="read more">
Validator warisan menggunakan kredensial penarikan **Tipe 1** dan memiliki saldo efektif yang dibatasi pada 32 ETH. Setiap kelebihan secara otomatis disapu ke alamat penarikan setiap beberapa hari.

Validator majemuk menggunakan kredensial penarikan **Tipe 2** dan dapat memiliki saldo efektif hingga 2048 ETH. Hadiah digabungkan ke dalam saldo efektif mereka, meningkatkan bobot validator di jaringan dan hadiah di masa mendatang. Penyapuan otomatis hanya terjadi untuk saldo yang melebihi 2048 ETH. Untuk menarik di bawah ambang batas ini, penarikan sebagian manual harus dipicu dari lapisan eksekusi.

Untuk detail lebih lanjut, lihat [penjelasan mendalam MaxEB](/roadmap/pectra/maxeb/).
</ExpandableCard>

<ExpandableCard
title="Bagaimana cara saya mengonversi ke validator majemuk?"
eventCategory="FAQ"
eventAction="How do I convert to a compounding validator?"
eventName="read more">
Anda dapat mengonversi dari kredensial penarikan Tipe 1 ke Tipe 2 menggunakan [Staking Launchpad](https://launchpad.ethereum.org/validator-actions). Operasi ini **tidak dapat diubah** — setelah Anda mengonversi, Anda tidak dapat kembali ke kredensial Tipe 1.

Setelah mengonversi, Anda juga dapat **mengonsolidasikan** beberapa validator menjadi satu, menggabungkan saldo mereka menjadi satu validator majemuk. Untuk panduan lengkap tentang proses konversi, risiko, dan alat konsolidasi, lihat [penjelasan mendalam MaxEB](/roadmap/pectra/maxeb/).
</ExpandableCard>

## Bacaan lebih lanjut {#further-reading}

- [Penarikan Staking Launchpad](https://launchpad.ethereum.org/withdrawals)
- [Tindakan Validator Staking Launchpad](https://launchpad.ethereum.org/validator-actions)
- [Penjelasan mendalam MaxEB: penggabungan dan konsolidasi](/roadmap/pectra/maxeb/)
- [EIP-4895: Penarikan push beacon chain sebagai operasi](https://eips.ethereum.org/EIPS/eip-4895)
- [PEEPanEIP #94: Penarikan ETH yang Di-stake (Pengujian) bersama Potuz & Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Penarikan push beacon chain sebagai operasi bersama Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Memahami Saldo Efektif Validator](https://www.attestant.io/posts/understanding-validator-effective-balance/)