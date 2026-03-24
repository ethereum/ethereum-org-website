---
title: Penarikan mengunci
description: Halaman yang merangkum apa itu penarikan dorong mengunci, bagaimana cara kerjanya, dan apa yang perlu dilakukan staker untuk mendapatkan hadiah mereka
lang: id
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Badak Leslie dengan hadiah menguncinya
sidebarDepth: 2
summaryPoints:
  - Peningkatan Shanghai/Capella memungkinkan penarikan mengunci di Ethereum
  - Operator validator harus memberikan alamat penarikan untuk mengaktifkannya
  - Hadiah didistribusikan secara otomatis setiap beberapa hari
  - Validator yang sepenuhnya keluar dari mengunci akan menerima sisa saldo mereka
---

**Penarikan mengunci** mengacu pada transfer ETH dari akun validator di lapisan konsensus Ethereum (Beacon Chain), ke lapisan eksekusi di mana ia dapat ditransaksikan.

**Pembayaran hadiah dari kelebihan saldo** di atas 32 ETH akan secara otomatis dan teratur dikirim ke alamat penarikan yang ditautkan ke setiap validator, setelah diberikan oleh pengguna. Pengguna juga dapat **keluar dari mengunci sepenuhnya**, membuka kunci saldo validator penuh mereka.

## Hadiah mengunci {#staking-rewards}

Pembayaran hadiah diproses secara otomatis untuk akun validator aktif dengan saldo efektif maksimal 32 ETH.

Setiap saldo di atas 32 ETH yang diperoleh melalui hadiah sebenarnya tidak berkontribusi pada pokok, atau meningkatkan bobot validator ini di jaringan, dan dengan demikian secara otomatis ditarik sebagai pembayaran hadiah setiap beberapa hari. Selain memberikan alamat penarikan satu kali, hadiah ini tidak memerlukan tindakan apa pun dari operator validator. Ini semua dimulai di lapisan konsensus, sehingga tidak ada gas (biaya transaksi) yang diperlukan pada langkah apa pun.

### Bagaimana kita sampai di sini? {#how-did-we-get-here}

Selama beberapa tahun terakhir [Ethereum](/) telah mengalami beberapa peningkatan jaringan yang bertransisi ke jaringan yang diamankan oleh ETH itu sendiri, alih-alih penambangan intensif energi seperti sebelumnya. Berpartisipasi dalam konsensus di Ethereum sekarang dikenal sebagai "mengunci", karena peserta secara sukarela mengunci ETH, menempatkannya "sebagai taruhan" untuk kemampuan berpartisipasi dalam jaringan. Pengguna yang mengikuti aturan akan diberi hadiah, sementara upaya untuk curang dapat dihukum.

Sejak peluncuran kontrak deposit mengunci pada November 2020, beberapa perintis Ethereum yang berani telah secara sukarela mengunci dana untuk mengaktifkan "validator", akun khusus yang memiliki hak untuk secara resmi mengesahkan dan mengusulkan blok, mengikuti aturan jaringan.

Sebelum peningkatan Shanghai/Capella, Anda tidak dapat menggunakan atau mengakses ETH yang Anda stake. Tetapi sekarang, Anda dapat memilih untuk secara otomatis menerima hadiah Anda ke akun yang dipilih, dan Anda juga dapat menarik ETH yang Anda stake kapan pun Anda mau.

### Bagaimana cara saya bersiap? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Pemberitahuan penting {#important-notices}

Memberikan alamat penarikan adalah langkah yang diperlukan untuk setiap akun validator sebelum memenuhi syarat untuk menarik ETH dari saldonya.

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
  <strong>Setiap akun validator hanya dapat ditetapkan satu alamat penarikan, satu kali.</strong> Setelah alamat dipilih dan dikirimkan ke lapisan konsensus, ini tidak dapat dibatalkan atau diubah lagi. Periksa kembali kepemilikan dan keakuratan alamat yang diberikan sebelum mengirimkan.
</AlertDescription>
</AlertContent>
</Alert>

<strong>Tidak ada ancaman terhadap dana Anda untuk sementara waktu</strong> karena tidak memberikan ini, dengan asumsi frasa seed/mnemonik Anda tetap aman secara offline, dan belum disusupi dengan cara apa pun. Kegagalan untuk menambahkan kredensial penarikan hanya akan membiarkan ETH terkunci di akun validator seperti sebelumnya sampai alamat penarikan diberikan.

## Keluar dari mengunci sepenuhnya {#exiting-staking-entirely}

Memberikan alamat penarikan diperlukan sebelum dana _apa pun_ dapat ditransfer keluar dari saldo akun validator.

Pengguna yang ingin keluar dari mengunci sepenuhnya dan menarik kembali saldo penuh mereka juga harus menandatangani dan menyiarkan pesan "keluar sukarela" dengan kunci validator yang akan memulai proses keluar dari mengunci. Ini dilakukan dengan klien validator Anda dan dikirimkan ke node konsensus Anda, dan tidak memerlukan gas.

Proses validator keluar dari mengunci membutuhkan jumlah waktu yang bervariasi, tergantung pada berapa banyak validator lain yang keluar pada saat yang sama. Setelah selesai, akun ini tidak akan lagi bertanggung jawab untuk melakukan tugas jaringan validator, tidak lagi memenuhi syarat untuk mendapatkan hadiah, dan tidak lagi memiliki ETH mereka "sebagai taruhan". Pada saat ini akun akan ditandai sebagai sepenuhnya "dapat ditarik".

Setelah akun ditandai sebagai "dapat ditarik", dan kredensial penarikan telah diberikan, tidak ada lagi yang perlu dilakukan pengguna selain menunggu. Akun secara otomatis dan terus-menerus disapu oleh pengusul blok untuk dana keluar yang memenuhi syarat, dan saldo akun Anda akan ditransfer secara penuh (juga dikenal sebagai "penarikan penuh") selama <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>penyapuan</a> berikutnya.

## Kapan penarikan mengunci diaktifkan? {#when}

Fungsionalitas penarikan diaktifkan sebagai bagian dari peningkatan Shanghai/Capella yang terjadi pada **12 April 2023**.

Peningkatan Shanghai/Capella memungkinkan ETH yang sebelumnya di-stake untuk diklaim kembali ke akun Ethereum biasa. Ini menutup putaran pada likuiditas mengunci, dan membawa Ethereum selangkah lebih dekat dalam perjalanannya menuju pembangunan ekosistem desentralisasi yang berkelanjutan, dapat diskalakan, dan aman.

- [Lebih lanjut tentang sejarah Ethereum](/ethereum-forks/)
- [Lebih lanjut tentang peta jalan Ethereum](/roadmap/)

## Bagaimana cara kerja pembayaran penarikan? {#how-do-withdrawals-work}

Apakah validator tertentu memenuhi syarat untuk penarikan atau tidak ditentukan oleh status akun validator itu sendiri. Tidak ada input pengguna yang diperlukan pada waktu tertentu untuk menentukan apakah suatu akun harus memulai penarikan atau tidak—seluruh proses dilakukan secara otomatis oleh lapisan konsensus pada putaran yang berkelanjutan.

### Lebih suka belajar secara visual? {#visual-learner}

Lihat penjelasan tentang penarikan mengunci Ethereum ini oleh Finematics:

<YouTube id="RwwU3P9n3uo" />

### "Penyapuan" validator {#validator-sweeping}

Ketika validator dijadwalkan untuk mengusulkan blok berikutnya, ia diharuskan untuk membangun antrean penarikan, hingga 16 penarikan yang memenuhi syarat. Ini dilakukan dengan awalnya dimulai dengan indeks validator 0, menentukan apakah ada penarikan yang memenuhi syarat untuk akun ini sesuai aturan protokol, dan menambahkannya ke antrean jika ada. Validator yang ditetapkan untuk mengusulkan blok berikutnya akan melanjutkan dari tempat terakhir ditinggalkan, maju secara berurutan tanpa batas.

<Alert variant="update">
<AlertEmoji text="🕛"/>
<AlertContent>
<AlertDescription>
Pikirkan tentang jam analog. Jarum jam menunjuk ke jam, bergerak ke satu arah, tidak melewatkan jam apa pun, dan akhirnya kembali ke awal lagi setelah angka terakhir tercapai.<br/><br/>
Sekarang alih-alih 1 hingga 12, bayangkan jam memiliki 0 hingga N <em>(jumlah total akun validator yang pernah terdaftar di lapisan konsensus, lebih dari 500.000 pada Jan 2023).</em><br/><br/>
Jarum jam menunjuk ke validator berikutnya yang perlu diperiksa untuk penarikan yang memenuhi syarat. Ini dimulai pada 0, dan berlanjut terus tanpa melewatkan akun apa pun. Ketika validator terakhir tercapai, siklus berlanjut kembali ke awal.
</AlertDescription>
</AlertContent>
</Alert>

#### Memeriksa akun untuk penarikan {#checking-an-account-for-withdrawals}

Sementara pengusul menyapu validator untuk kemungkinan penarikan, setiap validator yang diperiksa dievaluasi terhadap serangkaian pertanyaan singkat untuk menentukan apakah penarikan harus dipicu, dan jika demikian, berapa banyak ETH yang harus ditarik.

1. **Apakah alamat penarikan telah diberikan?** Jika tidak ada alamat penarikan yang diberikan, akun dilewati dan tidak ada penarikan yang dimulai.
2. **Apakah validator telah keluar dan dapat ditarik?** Jika validator telah sepenuhnya keluar, dan kita telah mencapai epoch di mana akun mereka dianggap "dapat ditarik", maka penarikan penuh akan diproses. Ini akan mentransfer seluruh sisa saldo ke alamat penarikan.
3. **Apakah saldo efektif maksimal pada 32?** Jika akun memiliki kredensial penarikan, belum sepenuhnya keluar, dan memiliki hadiah di atas 32 yang menunggu, penarikan sebagian akan diproses yang hanya mentransfer hadiah di atas 32 ke alamat penarikan pengguna.

Hanya ada dua tindakan yang diambil oleh operator validator selama siklus hidup validator yang memengaruhi alur ini secara langsung:

- Memberikan kredensial penarikan untuk mengaktifkan segala bentuk penarikan
- Keluar dari jaringan, yang akan memicu penarikan penuh

### Bebas gas {#gas-free}

Pendekatan penarikan mengunci ini menghindari keharusan staker untuk secara manual mengirimkan transaksi yang meminta sejumlah ETH tertentu untuk ditarik. Ini berarti **tidak ada gas (biaya transaksi) yang diperlukan**, dan penarikan juga tidak bersaing untuk ruang blok lapisan eksekusi yang ada.

### Seberapa sering saya akan mendapatkan hadiah mengunci saya? {#how-soon}

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

Seperti yang Anda lihat, ini melambat karena semakin banyak validator yang ada di jaringan. Peningkatan slot yang terlewat dapat memperlambat ini secara proporsional, tetapi ini umumnya akan mewakili sisi yang lebih lambat dari kemungkinan hasil.

## Pertanyaan yang sering diajukan {#faq}

<ExpandableCard
title="Setelah memberikan alamat penarikan, bisakah saya mengubahnya ke alamat lain?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
Tidak, proses untuk memberikan kredensial penarikan adalah proses satu kali, dan tidak dapat diubah setelah dikirimkan.
</ExpandableCard>

<ExpandableCard
title="Mengapa alamat penarikan hanya bisa diatur satu kali?"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
Dengan mengatur alamat penarikan lapisan eksekusi, kredensial penarikan untuk validator tersebut telah diubah secara permanen. Ini berarti kredensial lama tidak akan berfungsi lagi, dan kredensial baru mengarah ke akun lapisan eksekusi.

Alamat penarikan dapat berupa kontrak pintar (dikendalikan oleh kodenya), atau akun yang dimiliki secara eksternal (EOA, dikendalikan oleh kunci pribadinya). Saat ini akun-akun ini tidak memiliki cara untuk mengomunikasikan pesan kembali ke lapisan konsensus yang akan menandakan perubahan kredensial validator, dan menambahkan fungsionalitas ini akan menambah kompleksitas yang tidak perlu pada protokol.

Sebagai alternatif untuk mengubah alamat penarikan untuk validator tertentu, pengguna dapat memilih untuk mengatur kontrak pintar sebagai alamat penarikan mereka yang dapat menangani rotasi kunci, seperti Safe. Pengguna yang mengatur dana mereka ke EOA mereka sendiri dapat melakukan keluar penuh untuk menarik semua dana yang mereka stake, dan kemudian melakukan stake ulang menggunakan kredensial baru.
</ExpandableCard>

<ExpandableCard
title="Bagaimana jika saya berpartisipasi dalam mengunci token atau kolam staking?"
eventCategory="FAQ"
eventAction="What if I participate in staking tokens or pooled staking"
eventName="read more">

Jika Anda adalah bagian dari [kolam staking](/staking/pools/) atau memegang token mengunci, Anda harus memeriksa dengan penyedia Anda untuk detail lebih lanjut tentang bagaimana penarikan mengunci ditangani, karena setiap layanan beroperasi secara berbeda.

Secara umum, pengguna harus bebas untuk mengklaim kembali ETH yang mereka stake yang mendasarinya, atau mengubah penyedia mengunci mana yang mereka gunakan. Jika kolam tertentu menjadi terlalu besar, dana dapat dikeluarkan, ditebus, dan di-stake ulang dengan <a href="https://rated.network/">penyedia yang lebih kecil</a>. Atau, jika Anda telah mengumpulkan cukup ETH, Anda dapat [melakukan stake dari rumah](/staking/solo/).
</ExpandableCard>

<ExpandableCard
title="Apakah pembayaran hadiah (penarikan sebagian) terjadi secara otomatis?"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">
Ya, selama validator Anda telah memberikan alamat penarikan. Ini harus diberikan satu kali untuk awalnya mengaktifkan penarikan apa pun, kemudian pembayaran hadiah akan dipicu secara otomatis setiap beberapa hari dengan setiap penyapuan validator.
</ExpandableCard>

<ExpandableCard
title="Apakah penarikan penuh terjadi secara otomatis?"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

Tidak, jika validator Anda masih aktif di jaringan, penarikan penuh tidak akan terjadi secara otomatis. Ini memerlukan inisiasi keluar sukarela secara manual.

Setelah validator menyelesaikan proses keluar, dan dengan asumsi akun memiliki kredensial penarikan, sisa saldo <em>kemudian</em> akan ditarik selama <a href="#validator-sweeping">penyapuan validator</a> berikutnya.
</ExpandableCard>

<ExpandableCard title="Bisakah saya menarik jumlah khusus?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
Penarikan dirancang untuk didorong secara otomatis, mentransfer ETH apa pun yang tidak secara aktif berkontribusi pada stake. Ini termasuk saldo penuh untuk akun yang telah menyelesaikan proses keluar.

Tidak mungkin untuk secara manual meminta jumlah ETH tertentu untuk ditarik.
</ExpandableCard>

<ExpandableCard
title="Saya mengoperasikan validator. Di mana saya bisa menemukan informasi lebih lanjut tentang mengaktifkan penarikan?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information on enabling withdrawals?"
eventName="read more">

Operator validator disarankan untuk mengunjungi halaman <a href="https://launchpad.ethereum.org/withdrawals/">Penarikan Staking Launchpad</a> di mana Anda akan menemukan detail lebih lanjut tentang cara menyiapkan validator Anda untuk penarikan, waktu acara, dan detail lebih lanjut tentang bagaimana penarikan berfungsi.

Untuk mencoba pengaturan Anda di testnet terlebih dahulu, kunjungi <a href="https://hoodi.launchpad.ethereum.org">Hoodi Testnet Staking Launchpad</a> untuk memulai.
</ExpandableCard>

<ExpandableCard
title="Bisakah saya mengaktifkan kembali validator saya setelah keluar dengan mendepositkan lebih banyak ETH?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
Tidak. Setelah validator keluar dan saldo penuhnya telah ditarik, dana tambahan apa pun yang didepositkan ke validator tersebut akan secara otomatis ditransfer ke alamat penarikan selama penyapuan validator berikutnya. Untuk melakukan stake ulang ETH, validator baru harus diaktifkan.
</ExpandableCard>

## Bacaan lebih lanjut {#further-reading}

- [Penarikan Staking Launchpad](https://launchpad.ethereum.org/withdrawals)
- [EIP-4895: Penarikan dorong beacon chain sebagai operasi](https://eips.ethereum.org/EIPS/eip-4895)
- [PEEPanEIP #94: Penarikan ETH yang Di-stake (Pengujian) bersama Potuz & Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Penarikan dorong beacon chain sebagai operasi bersama Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Memahami Saldo Efektif Validator](https://www.attestant.io/posts/understanding-validator-effective-balance/)