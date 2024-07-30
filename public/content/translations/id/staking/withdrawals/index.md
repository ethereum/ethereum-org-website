---
title: Penarikan penaruhan
description: Halaman yang merangkum tentang penarikan tekan penaruhan, bagaimana cara kerjanya, dan apa yang harus dilakukan oleh staker untuk mendapatkan imbalan mereka
lang: id
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Leslie si badak dengan imbalan penaruhannya
sidebarDepth: 2
summaryPoints:
  - Peningkatan Shanghai/Capella memungkinkan penarikan penaruhan di Ethereum
  - Operator validator harus menyediakan alamat penarikan untuk mengaktifkan
  - Imbalan secara otomatis didistribusikan setiap beberapa hari
  - Validator yang keluar sepenuhnya dari penaruhan akan menerima sisa saldo mereka
---

<UpgradeStatus dateKey="page-staking-withdrawals-when">
Penarikan penaruhan diaktifkan dengan peningkatan Shanghai/Capella yang terjadi pada 12 April 2023.&nbsp;<a href="#when" customEventOptions={{ eventCategory: "Anchor link", eventAction: "When's it shipping?", eventName: "click" }}>Lebih lanjut tentang Shanghai/Capella</a>
</UpgradeStatus>

**Penarikan penaruhan** mengacu pada transfer ETH dari akun validator pada lapisan konsensus Ethereum (Rantai Suar), ke lapisan eksekusi di mana itu dapat ditransaksikan.

**Pembayaran imbalan atas saldo yang berlebih** dari 32 ETH akan otomatis dan secara teratur dikirim ke alamat penarikan yang terhubung ke setiap validator, begitu pengguna menyediakannya. Pengguna juga dapat **keluar dari penaruhan sepenuhnya**, membuka kunci saldo validator mereka secara penuh.

## Imbalan penaruhan {#staking-rewards}

Pembayaran imbalan secara otomatis diproses untuk akun validator yang aktif dengan saldo efektif maksimal 32 ETH.

Saldo di atas 32 ETH yang diperoleh melalui imbalan tidak benar-benar berkontribusi pada pokok, atau meningkatkan bobot validator ini di jaringan, dan dengan demikian secara otomatis ditarik sebagai pembayaran hadiah setiap beberapa hari. Selain memberikan alamat penarikan satu kali, hadiah ini tidak memerlukan tindakan apa pun dari operator validator. Ini semua dimulai pada lapisan konsensus, sehingga tidak ada gas (biaya transaksi) yang diperlukan pada langkah apa pun.

### Bagaimana kita sampai di sini? {#how-did-we-get-here}

Selama beberapa tahun terakhir, Ethereum telah mengalami beberapa kali peningkatan jaringan yang beralih ke jaringan yang diamankan oleh ETH itu sendiri, alih-alih penambangan yang boros energi seperti sebelumnya. Berpartisipasi dalam konsensus di Ethereum sekarang dikenal sebagai "penaruhan", karena para peserta telah secara sukarela mengunci ETH, menempatkannya "dipertaruhkan" untuk kemampuan berpartisipasi dalam jaringan. Pengguna yang mengikuti peraturan akan diberi penghargaan, sementara upaya untuk berbuat curang dapat dikenai sanksi.

Sejak peluncuran kontrak penaruhan deposit pada November 2020, beberapa perintis Ethereum yang berani telah secara sukarela mengunci dana untuk mengaktifkan "validator", akun khusus yang memiliki hak untuk secara resmi membuktikan dan mengusulkan blok, mengikuti aturan jaringan.

Sebelum peningkatan Shanghai/Capella, Anda tidak dapat menggunakan atau mengakses ETH yang Anda penaruhan. Namun sekarang, Anda bisa memilih untuk menerima reward secara otomatis ke akun yang Anda pilih, dan Anda juga bisa menarik ETH yang Anda pertaruhkan kapan pun Anda mau.

### Bagaimana saya mempersiapkan diri? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Pemberitahuan Penting {#important-notices}

Memberikan alamat penarikan adalah langkah yang diperlukan untuk setiap akun validator sebelum akun tersebut memenuhi syarat untuk menarik ETH dari saldonya.

<InfoBanner emoji="⚠️" isWarning>
  <strong>Setiap akun validator hanya dapat diberikan satu alamat penarikan, satu kali.</strong> Setelah alamat dipilih dan dikirimkan ke lapisan konsensus, alamat tersebut tidak dapat dibatalkan atau diubah lagi. Periksa kembali kepemilikan dan keakuratan alamat yang diberikan sebelum mengirim.
</InfoBanner>

Tidak ada <strong>tidak ada ancaman terhadap dana Anda untuk sementara waktu</strong> karena tidak menyediakan ini, dengan asumsi mnemonik/frase benih Anda tetap aman secara offline, dan tidak dikompromikan dengan cara apa pun. Kegagalan untuk menambahkan kredensial penarikan hanya akan membuat ETH terkunci di akun validator seperti sebelumnya sampai alamat penarikan diberikan.

## Keluar dari penaruhan sepenuhnya {#exiting-staking-entirely}

Memberikan alamat penarikan diperlukan sebelum _semua_ dana dapat ditransfer dari saldo akun validator.

Pengguna yang ingin keluar dari penaruhan sepenuhnya dan menarik seluruh saldo mereka kembali juga harus menandatangani dan menyiarkan pesan "keluar secara sukarela" dengan kunci validator yang akan memulai proses keluar dari penaruhan. Ini dilakukan dengan klien validator Anda dan dikirimkan ke simpul konsensus Anda, dan tidak memerlukan gas.

Proses keluarnya seorang validator dari penaruhan membutuhkan waktu yang bervariasi, tergantung pada berapa banyak validator yang keluar pada waktu yang sama. Setelah selesai, akun ini tidak lagi bertanggung jawab untuk melakukan tugas jaringan validator, tidak lagi memenuhi syarat untuk mendapatkan imbalan, dan tidak lagi memiliki ETH yang "dipertaruhkan". Pada saat ini, akun akan ditandai sebagai "dapat ditarik sepenuhnya".

Setelah akun ditandai sebagai "dapat ditarik", dan kredensial penarikan telah diberikan, tidak ada lagi yang perlu dilakukan pengguna selain menunggu. Akun secara otomatis dan terus menerus dipindai oleh pengusul blokir untuk dana keluar yang memenuhi syarat, dan saldo akun Anda akan ditransfer secara penuh (juga dikenal sebagai "penarikan penuh") selama <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>pemindaian</a> berikutnya.

## Kapan penarikan penaruhan diaktifkan? {#when}

Penarikan penaruhan sudah aktif! Fungsionalitas penarikan dana diaktifkan sebagai bagian dari peningkatan Shanghai/Capella yang terjadi pada 12 April 2023.

Peningkatan Shanghai/Capella memungkinkan ETH yang sebelumnya dipertaruhkan untuk diklaim kembali ke akun Ethereum biasa. Hal ini menutup lingkaran pada likuiditas penaruhan, dan membawa Ethereum selangkah lebih dekat dalam perjalanannya untuk membangun ekosistem terdesentralisasi yang berkelanjutan, terukur, dan aman.

- [Lebih lanjut tentang sejarah Ethereum](/history/)
- [Lebih lanjut tentang peta perjalanan Ethereum](/roadmap/)

## Bagaimana cara kerja pembayaran penarikan dana? {#how-do-withdrawals-work}

Apakah validator tertentu memenuhi syarat untuk penarikan atau tidak, ditentukan oleh status akun validator itu sendiri. Tidak ada input pengguna yang diperlukan pada waktu tertentu untuk menentukan apakah suatu akun harus melakukan penarikan atau tidak-seluruh proses dilakukan secara otomatis oleh lapisan konsensus dalam sebuah loop yang berkesinambungan.

### Selengkapnya tentang pelajar visual? {#visual-learner}

Simak penjelasan mengenai penarikan penaruhan Ethereum dari Finematics berikut ini:

<YouTube id="RwwU3P9n3uo" />

### Validator "menyapu" {#validator-sweeping}

Ketika validator dijadwalkan untuk mengajukan blok berikutnya, diperlukan antrean penarikan hingga 16 penarikan yang memenuhi syarat. Hal ini dilakukan dengan memulai dengan indeks validator 0, menentukan apakah ada penarikan yang memenuhi syarat untuk akun ini sesuai dengan aturan protokol, dan menambahkannya ke antrean jika ada. Validator yang ditetapkan untuk mengajukan blok berikutnya akan melanjutkan blok yang terakhir ditinggalkan, dan terus maju tanpa batas waktu.

<InfoBanner emoji="🕛">
Pikirkan tentang jam analog. Jarum jam menunjuk ke arah jam, bergerak ke satu arah, tidak melewatkan satu jam pun, dan akhirnya berputar ke awal lagi setelah angka terakhir tercapai.<br/><br/>
Sekarang, alih-alih 1 hingga 12, bayangkan jam memiliki 0 hingga N <em>(jumlah total akun validator yang pernah terdaftar di lapisan konsensus, lebih dari 500.000 per Januari 2023).</em><br/><br/>
Jarum penunjuk pada jam menunjuk ke validator berikutnya yang perlu diperiksa untuk penarikan yang memenuhi syarat. Dimulai dari 0, dan berkembang terus tanpa melewatkan satu akun pun. Ketika validator terakhir tercapai, siklus berlanjut kembali ke awal.
</InfoBanner>

#### Memeriksa akun untuk penarikan dana {#checking-an-account-for-withdrawals}

Ketika seorang pengusul menyisir validator untuk kemungkinan penarikan, setiap validator yang diperiksa akan dievaluasi berdasarkan serangkaian pertanyaan singkat untuk menentukan apakah penarikan harus dipicu, dan jika ya, berapa banyak ETH yang harus ditarik.

1. **Apakah alamat penarikan sudah disediakan?** Jika tidak ada alamat penarikan yang disediakan, akun tersebut akan dilewati dan tidak ada penarikan yang dilakukan.
2. **Apakah validator keluar dan dapat ditarik kembali?** Jika validator telah keluar sepenuhnya, dan kami telah mencapai jangka waktu di mana akun mereka dianggap "dapat ditarik", maka penarikan penuh akan diproses. Ini akan mentransfer seluruh saldo yang tersisa ke alamat penarikan.
3. **Apakah saldo efektif telah mencapai 32?** Jika akun memiliki kredensial penarikan, belum sepenuhnya keluar, dan memiliki imbalan di atas 32 yang masih menunggu, maka penarikan sebagian akan diproses dan hanya akan mentransfer imbalan di atas 32 ke alamat penarikan pengguna.

Hanya ada dua tindakan yang dilakukan oleh operator validator selama siklus hidup validator yang secara langsung memengaruhi alur ini:

- Memberikan kredensial penarikan untuk memungkinkan segala bentuk penarikan
- Keluar dari jaringan, yang akan memicu penarikan penuh

### Bebas gas {#gas-free}

Pendekatan penarikan penaruhan ini menghindari keharusan penaruh untuk mengirimkan transaksi secara manual yang meminta penarikan ETH dalam jumlah tertentu. Ini berarti **tidak ada gas (biaya transaksi) yang diperlukan**, dan penarikan juga tidak bersaing untuk mendapatkan ruang blok lapisan eksekusi yang ada.

### Seberapa sering saya akan mendapatkan imbalan penaruhan saya? {#how-soon}

Maksimal 16 penarikan dapat diproses dalam satu blok. Pada tingkat tersebut, 115.200 penarikan validator dapat diproses per hari (dengan asumsi tidak ada slot yang terlewat). Seperti disebutkan di atas, validator yang tidak memenuhi syarat penarikan akan dilewati, sehingga mengurangi waktu untuk menyelesaikan penyisiran.

Dengan memperluas perhitungan ini, kami dapat memperkirakan waktu yang dibutuhkan untuk memproses sejumlah penarikan tertentu:

<TableContainer>

| Jumlah penarikan | Waktu untuk menyelesaikan |
| :-------------------: | :--------------: |
|        400.000        |     3.5 hari     |
|        500.000        |     4.3 hari     |
|        600.000        |     5.2 hari     |
|        700.000        |     6.1 hari     |
|        800.000        |     7.0 hari     |

</TableContainer>

Seperti yang Anda lihat, hal ini melambat karena semakin banyak validator yang ada di jaringan. Peningkatan slot yang terlewatkan dapat memperlambat hal ini secara proporsional, tetapi ini secara umum akan mewakili sisi yang lebih lambat dari hasil yang mungkin terjadi.

## Pertanyaan yang sering diajukan {#faq}

<ExpandableCard
title="Setelah saya telah memberikan alamat penarikan, apakah saya bisa mengubahnya menjadi alamat penarikan alternatif?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
Tidak, proses untuk memberikan kredensial penarikan hanya dilakukan satu kali, dan tidak dapat diubah setelah diajukan.
</ExpandableCard>

<ExpandableCard
title="Mengapa alamat penarikan hanya bisa diatur sekali?"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
Dengan menetapkan alamat penarikan lapisan eksekusi, kredensial penarikan untuk validator tersebut telah diubah secara permanen. Ini berarti kredensial lama tidak akan berfungsi lagi, dan kredensial baru akan langsung menuju ke akun lapisan eksekusi.

Alamat penarikan dapat berupa kontrak pintar (dikendalikan oleh kodenya), atau akun yang dimiliki secara eksternal (EOA, dikendalikan oleh kunci pribadinya). Saat ini akun-akun ini tidak memiliki cara untuk mengkomunikasikan pesan kembali ke lapisan konsensus yang akan menandakan perubahan kredensial validator, dan menambahkan fungsionalitas ini akan menambah kerumitan yang tidak perlu pada protokol.

Sebagai alternatif untuk mengubah alamat penarikan untuk validator tertentu, pengguna dapat memilih untuk menetapkan kontrak pintar sebagai alamat penarikan mereka yang dapat menangani perputaran kunci, seperti Brankas. Pengguna yang menetapkan dana mereka ke EOA mereka sendiri dapat melakukan keluar sepenuhnya untuk menarik semua dana yang dipertaruhkan, dan kemudian melakukan penaruhan ulang dengan menggunakan kredensial baru.
</ExpandableCard>

<ExpandableCard
title="Bagaimana jika saya berpartisipasi dalam penaruhan token atau penaruhan dengan pool"
eventCategory="FAQ"
eventAction="What if I participate in staking tokens or pooled staking"
eventName="read more">

Jika Anda merupakan bagian dari <a href="/staking/pools/">pool penaruhan</a> atau memegang token penaruhan, Anda harus bertanya kepada penyedia Anda detail lebih lanjut tentang bagaimana penarikan penaruhan ditangani, karena setiap layanan beroperasi secara berbeda.

Secara umum, pengguna harus bebas untuk mendapatkan kembali ETH yang mereka pertaruhkan, atau mengubah penyedia penaruhan yang mereka gunakan. Jika pool tertentu menjadi terlalu besar, dana dapat keluar, ditebus, dan dipertaruhkan kembali dengan <a href="https://rated.network/">penyedia yang lebih kecil</a>. Atau, jika Anda telah mengumpulkan cukup banyak ETH, Anda dapat melakukan <a href="/staking/solo/">penaruhan dari beranda</a>.

</ExpandableCard>

<ExpandableCard
title="Apakah pembayaran imbalan (penarikan parsial) terjadi secara otomatis?"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">
Ya, selama validator Anda telah memberikan alamat penarikan. Ini harus diberikan satu kali untuk mengaktifkan penarikan pertama kali, kemudian pembayaran imbalan akan secara otomatis dipicu setiap beberapa hari dengan setiap sapuan validator.
</ExpandableCard>

<ExpandableCard
title="Apakah penarikan penuh terjadi secara otomatis?"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

Tidak, jika validator Anda masih aktif di jaringan, penarikan penuh tidak akan terjadi secara otomatis. Hal ini membutuhkan proses keluar secara manual.

Setelah validator menyelesaikan proses keluar, dan dengan asumsi akun tersebut memiliki kredensial penarikan, saldo yang tersisa <em>kemudian</em> akan ditarik pada saat <a href="#validator-sweeping">pemindaian validator</a> berikutnya.

</ExpandableCard>

<ExpandableCard title="Dapatkah saya menarik jumlah yang ditentukan sendiri?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
Penarikan dirancang untuk didorong secara otomatis, mentransfer ETH apa pun yang tidak secara aktif berkontribusi pada taruhan. Ini termasuk saldo penuh untuk akun yang telah menyelesaikan proses keluar.

Tidak dimungkinkan meminta ETH yang akan ditarik dengan jumlah tertentu secara manual.
</ExpandableCard>

<ExpandableCard
title="Saya mengoperasikan validator. Di mana saya bisa menemukan lebih banyak informasi tentang mengaktifkan penarikan?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information on enabling withdrawals?"
eventName="read more">

Operator validator disarankan mengunjungi halaman <a href="https://launchpad.ethereum.org/withdrawals/">Penarikan Landasan Peluncuran Penaruhan</a>, tempat Anda akan menemukan detail selengkapnya tentang cara menyiapkan validator Anda untuk penarikan, penetapan waktu aksi, dan detail selengkapnya tentang fungsi penarikan.

Untuk mencoba pengaturan Anda di jaringan percobaan terlebih dahulu, kunjungi <a href="https://holesky.launchpad.ethereum.org">Landasan Peluncuran Penaruhan Jaringan Percobaan Holesky</a> untuk memulai.

</ExpandableCard>

<ExpandableCard
title="Apakah saya bisa mengaktifkan kembali validator saya setelah keluar dengan menyetorkan lebih banyak ETH?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
Tidak. Setelah validator keluar dan saldo penuhnya telah ditarik, setiap dana tambahan yang disetorkan ke validator tersebut akan secara otomatis ditransfer ke alamat penarikan selama penyisiran validator berikutnya. Untuk taruhan ulang ETH, validator baru harus diaktifkan.
</ExpandableCard>

## Bacaan lebih lanjut {#further-reading}

- [Penarikan Landasan Peluncuran Penaruhan](https://launchpad.ethereum.org/withdrawals)
- [EIP-4895: Rantai suar mendorong penarikan sebagai operasi](https://eips.ethereum.org/EIPS/eip-4895)
- [Penggembala Kucing Ethereum - Shanghai](https://www.ethereumcatherders.com/shanghai_upgrade/index.html)
- [PEEPanEIP #94: Penarikan ETH yang Dipertaruhkan (Pengujian) dengan Potuz & Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Rantai suar mendorong penarikan sebagai operasi bersama Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Memahami Saldo Efektif Validator](https://www.attestant.io/posts/understanding-validator-effective-balance/)
