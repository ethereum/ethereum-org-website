---
title: Pertaruhan keluaran
description: Halaman yang meringkaskan apakah pengeluaran tolakan pertaruhan, cara ia berfungsi dan perkara yang perlu dilakukan oleh petaruh untuk mendapatkan ganjaran mereka
lang: ms
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Leslie si badak dengan ganjaran pertaruhannya
sidebarDepth: 2
summaryPoints:
  - Peningkatan Shanghai/Capella membolehkan pengeluaran pertaruhan pada Ethereum
  - Pengendali pengesah mesti menyediakan alamat pengeluaran untuk membolehkan
  - Ganjaran diagihkan secara automatik setiap beberapa hari
  - Pengesah yang keluar sepenuhnya daripada pertaruhan akan menerima baki mereka
---

<UpgradeStatus dateKey="page-staking-withdrawals-when">
Pengeluaran pertaruhan telah di dayakan dengan peningkatan Shanghai/Capella yang berlaku pada 12 April 2023.&nbsp;<a href="#when" customEventOptions={{ eventCategory: "Anchor link", eventAction: "When's it shipping?", eventName: "click" }}>Lagi tentang Shanghai/Capella</a>
</UpgradeStatus>

**Pengeluaran pertaruhan** merujuk kepada pemindahan ETH daripada akaun pengesah pada lapisan persetujuan Ethereum (Rantai Beacon), ke lapisan perlaksanaan di mana ia boleh diurusniagakan.

**Pembayaran ganjaran lebihan baki** melebihi 32 ETH akan dihantar secara automatik dan kerap ke alamat pengeluaran yang di pautkan kepada setiap pengesah, setelah diberikan oleh pengguna. Pengguna juga boleh **keluar daripada pertaruhan sepenuhnya**, membuka kunci baki pengesah penuh mereka.

## Ganjaran pertaruhan {#staking-rewards}

Pembayaran ganjaran diproses secara automatik untuk akaun pengesah aktif dengan baki berkesan maksimum sebanyak 32 ETH.

Sebarang baki melebihi 32 ETH yang diperoleh melalui ganjaran sebenarnya tidak menyumbang kepada prinsipal, atau meningkatkan berat pengesah ini pada rangkaian, dan dengan itu dikeluarkan secara automatik sebagai pembayaran ganjaran setiap beberapa hari. Selain daripada memberikan alamat pengeluaran satu kali, ganjaran ini tidak memerlukan sebarang tindakan daripada pengendali pengesah. Ini semua dimulakan pada lapisan persetujuan, oleh itu tiada gas (yuran transaksi) diperlukan pada mana-mana langkah.

### Bagaimanakah kita boleh sampai ke sini? {#how-did-we-get-here}

Sejak beberapa tahun kebelakangan ini Ethereum telah mengalami beberapa peningkatan rangkaian yang beralih kepada rangkaian yang dijamin oleh ETH sendiri, bukannya perlombongan intensif tenaga seperti dahulu. Mengambil bahagian dalam konsensus mengenai Ethereum kini dikenali sebagai "pertaruhan", kerana peserta secara sukarela telah mengunci ETH, meletakkannya "dipertaruhkan" untuk keupayaan untuk mengambil bahagian dalam rangkaian. Pengguna yang mematuhi peraturan akan diberi ganjaran, manakala percubaan untuk menipu boleh dihukum.

Sejak pelancaran kontrak deposit pertaruhan pada November 2020, beberapa perintis Ethereum yang berani secara sukarela mengunci dana untuk mengaktifkan "pengesah", akaun khas yang mempunyai hak untuk mengesahkan secara rasmi dan mencadangkan blok, mengikut peraturan rangkaian.

Sebelum naik taraf Shanghai/Capella, anda tidak boleh menggunakan atau mengakses ETH yang dipertaruhkan anda. Tetapi sekarang, anda boleh ikut serta untuk menerima ganjaran anda secara automatik ke dalam akaun yang dipilih, dan anda juga boleh mengeluarkan ETH anda yang dipertaruhkan pada bila-bila masa anda mahu.

### Bagaimanakah patut saya bersedia? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Notis penting {#important-notices}

Menyediakan alamat pengeluaran adalah langkah yang diperlukan untuk mana-mana akaun pengesah sebelum ia layak untuk mengeluarkan ETH daripada bakinya.

<InfoBanner emoji="⚠️" isWarning>
  <strong>Setiap akaun pengesah hanya boleh diberikan satu alamat pengeluaran, sekali sahaja.</strong> Setelah alamat dipilih dan diserahkan ke lapisan persetujuan, ini tidak boleh dibuat asal atau ditukar lagi. Periksa semula pemilikan dan ketepatan alamat yang diberikan sebelum menyerahkan.
</InfoBanner>

<strong>Tiada ancaman kepada dana anda buat sementara waktu</strong> kerana tidak menyediakannya, dengan mengandaikan frasa mnemonik/benih anda kekal selamat di luar talian dan tidak terjejas dalam apa jua cara. Kegagalan untuk menambah bukti kelayakan pengeluaran hanya akan membiarkan ETH terkunci dalam akaun pengesah seperti yang berlaku sehingga alamat pengeluaran diberikan.

## Keluar pertaruhan sepenuhnya {#exiting-staking-entirely}

Menyediakan alamat pengeluaran diperlukan sebelum _sebarang_ dana boleh dipindahkan daripada baki akaun pengesah.

Pengguna yang ingin keluar dari pertaruhan sepenuhnya dan mengeluarkan baki penuh mereka juga mesti menandatangani dan menyiarkan mesej "keluar secara sukarela" dengan kunci pengesah yang akan memulakan proses keluar daripada pertaruhan. Ini dilakukan dengan pelanggan pengesah anda dan diserahkan kepada nod konsensus anda, dan tidak memerlukan gas.

Proses pengesah keluar daripada pertaruhan mengambil masa yang berubah-ubah, bergantung pada bilangan orang lain yang keluar pada masa yang sama. Setelah selesai, akaun ini tidak lagi bertanggungjawab untuk melaksanakan tugas rangkaian pengesah, tidak lagi layak untuk ganjaran dan ETH mereka tidak lagi "di pertaruhkan". Pada masa ini akaun akan ditandakan sebagai "boleh dikeluarkan" sepenuhnya.

Setelah akaun di benderakan sebagai "boleh dikeluarkan", dan kelayakan pengeluaran telah di sediakan, tiada apa lagi yang perlu dilakukan pengguna selain daripada menunggu. Akaun secara automatik dan berterusan disapu oleh pencadang sekat untuk dana keluar yang layak, dan baki akaun anda akan dipindahkan sepenuhnya (juga dikenali sebagai "pengeluaran penuh") semasa <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}> penyapuan</a> seterusnya.

## Bilakah pengeluaran pertaruhan di dayakan? {#when}

Pengeluaran pertaruhan disiarkan secara langsung! Fungsi pengeluaran telah di dayakan sebagai sebahagian daripada peningkatan Shanghai/Capella yang berlaku pada 12 April 2023.

Peningkatan Shanghai/Capella membolehkan ETH yang dipertaruhkan sebelum ini dituntut semula ke dalam akaun Ethereum biasa. Ini menutup gelung kecairan pertaruhan, dan membawa Ethereum selangkah lebih dekat dalam perjalanannya ke arah membina ekosistem teragih yang mampan, berskala dan selamat.

- [Lagi mengenai sejarah Ethereum](/history/)
- [Lagi mengenai hala tuju Ethereum](/roadmap/)

## Bagaimanakah pembayaran pengeluaran berfungsi? {#how-do-withdrawals-work}

Sama ada pengesah yang diberikan layak untuk pengeluaran atau tidak ditentukan oleh keadaan akaun pengesah itu sendiri. Tiada input pengguna diperlukan pada bila-bila masa untuk menentukan sama ada akaun harus mempunyai pengeluaran dimulakan atau tidak—keseluruhan proses dilakukan secara automatik oleh lapisan persetujuan pada gelung berterusan.

### Lebih kepada pelajar visual? {#visual-learner}

Lihat penjelasan ini mengenai pengeluaran pertaruhan Ethereum oleh Finematics:

<YouTube id="RwwU3P9n3uo" />

### Pengesah "menyapu" {#validator-sweeping}

Apabila pengesah dijadualkan untuk mencadangkan blok seterusnya, ia dikehendaki membina baris gilir pengeluaran, sehingga 16 pengeluaran yang layak. Ini dilakukan dengan asalnya bermula dengan indeks pengesah 0, menentukan sama ada terdapat pengeluaran yang layak untuk akaun ini mengikut peraturan protokol dan menambahkannya pada baris giliran, jika ada. Pengesah yang ditetapkan untuk mencadangkan blok berikut akan bersambung di tempat terakhir berhenti, maju mengikut urutan secara kekal.

<InfoBanner emoji="🕛">
Fikirkan tentang jam analog. Jarum pada jam menunjukkan jam, bergerak ke satu arah, tidak melangkau sebarang jam dan akhirnya berputar ke permulaan semula selepas nombor terakhir dicapai.<br/><br/> Sekarang bukannya 1 hingga 12, bayangkan jam mempunyai 0 hingga N <em>(jumlah bilangan akaun pengesah yang pernah didaftarkan pada lapisan persetujuan, lebih 500,000 pada Januari 2023).</em><br/><br/>
Tangan pada jam menunjukkan kepada pengesah seterusnya yang perlu disemak untuk pengeluaran yang layak. Ia bermula pada 0, dan terus maju tanpa melangkau sebarang akaun. Apabila pengesah terakhir dicapai, kitaran diteruskan kembali pada permulaan.
</InfoBanner>

#### Menyemak akaun untuk pengeluaran {#checking-an-account-for-withdrawals}

Semasa pencadang memeriksa pengesah untuk kemungkinan pengeluaran, setiap pengesah yang disemak dinilai berdasarkan siri pendek soalan untuk menentukan sama ada pengeluaran perlu dicetuskan, dan jika ya, berapa banyak ETH perlu dikeluarkan.

1. **Adakah alamat pengeluaran telah diberikan?** Jika tiada alamat pengeluaran telah diberikan, akaun tersebut di langkau dan tiada pengeluaran dimulakan.
2. **Adakah pengesah telah keluar dan boleh dikeluarkan?** Jika pengesah telah keluar sepenuhnya, dan kita telah mencapai zaman di mana akaun mereka dianggap sebagai "boleh dikeluarkan", maka pengeluaran penuh akan diproses. Ini akan memindahkan keseluruhan baki yang tinggal ke alamat pengeluaran.
3. **Adakah baki berkesan dimaksimumkan pada 32?**Jika akaun mempunyai bukti kelayakan pengeluaran, tidak dikeluarkan sepenuhnya, dan mempunyai ganjaran melebihi 32 menunggu, pengeluaran separa akan diproses yang memindahkan hanya ganjaran melebihi 32 kepada alamat pengeluaran pengguna.

Terdapat hanya dua tindakan yang diambil oleh pengendali pengesah semasa kitaran hayat pengesah yang mempengaruhi aliran ini secara langsung:

- Sediakan kelayakan pengeluaran untuk membolehkan sebarang bentuk pengeluaran
- Keluar dari rangkaian, yang akan mencetuskan pengeluaran penuh

### Bebas gas {#gas-free}

Pendekatan untuk mempertaruhkan pengeluaran ini mengelak daripada memerlukan petaruh menyerahkan transaksi secara manual yang meminta jumlah ETH tertentu dikeluarkan. Ini bermakna **tiada gas (yuran transaksi) diperlukan** dan pengeluaran juga tidak bersaing untuk ruang blok lapisan perlaksanaan sedia ada.

### Berapa kerapkah akan saya mendapat ganjaran pertaruhan saya? {#how-soon}

Maksimum 16 pengeluaran boleh diproses dalam satu blok. Pada kadar itu, 115,200 pengeluaran pengesah boleh diproses setiap hari (dengan andaian tiada slot terlepas). Seperti yang dinyatakan di atas, pengesah tanpa pengeluaran yang layak akan di langkau, mengurangkan masa untuk menyelesaikan sapuan.

Memperluas pengiraan ini, kami boleh menganggarkan masa yang diperlukan untuk memproses bilangan pengeluaran tertentu:

<TableContainer>

|  Bilangan pengeluaran |  Masa untuk melengkapkan |
| :-------------------: | :--------------: |
|        400,000        |     3.5 hari     |
|        500,000        |     4.3 hari     |
|        600,000        |     5.2 hari     |
|        700,000        |     6.1 hari     |
|        800,000        |     7.0 hari     |

</TableContainer>

Seperti yang anda lihat ini menjadi perlahan kerana lebih banyak pengesah berada di rangkaian. Peningkatan dalam slot terlepas boleh memperlahankan ini secara berkadar, tetapi ini secara amnya akan mewakili bahagian yang lebih perlahan daripada kemungkinan hasil.

## Soalan lazim {#faq}

<ExpandableCard
title="Setelah saya memberikan alamat pengeluaran, bolehkah saya menukarnya kepada alamat pengeluaran alternatif?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
Tidak, proses untuk menyediakan bukti kelayakan pengeluaran adalah proses sekali sahaja dan tidak boleh diubah setelah diserahkan.
</ExpandableCard>

<ExpandableCard
title="Mengapakah alamat pengeluaran hanya boleh ditetapkan sekali?"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
Dengan menetapkan alamat pengeluaran lapisan perlaksanaan, kelayakan pengeluaran untuk pengesah itu telah ditukar secara kekal. Ini bermakna bukti kelayakan lama tidak akan berfungsi lagi dan bukti kelayakan baharu terus ke akaun lapisan perlaksanaan.

Alamat pengeluaran boleh sama ada kontrak pintar (dikawal oleh kodnya), atau akaun milik luaran (EOA, dikawal oleh kunci peribadinya). Pada masa ini akaun ini tidak mempunyai cara untuk menyampaikan mesej kembali ke lapisan persetujuan yang akan menandakan perubahan kelayakan pengesah, dan menambah fungsi ini akan menambah kerumitan yang tidak perlu pada protokol.

Sebagai alternatif kepada menukar alamat pengeluaran untuk pengesah tertentu, pengguna boleh memilih untuk menetapkan kontrak pintar sebagai alamat pengeluaran mereka yang boleh mengendalikan putaran kunci, seperti Peti Selamat. Pengguna yang menetapkan dana mereka kepada EOA mereka sendiri boleh melakukan keluar sepenuhnya untuk mengeluarkan semua dana yang mereka pertaruhkan, dan kemudian mempertaruhkan semula menggunakan bukti kelayakan baharu.
</ExpandableCard>

<ExpandableCard
title="Bagaimanakah jika saya mengambil bahagian dalam pertaruhan token atau pertaruhan terhimpun"
eventCategory="FAQ"
eventAction="What if I participate in staking tokens or pooled staking"
eventName="read more">

Jika anda adalah sebahagian daripada <a href="/staking/pools/">himpunan pertaruhan</a> atau memegang token pertaruhan, anda harus menyemak dengan pembekal anda untuk mendapatkan butiran lanjut tentang cara pengeluaran pertaruhan dikendalikan, kerana setiap perkhidmatan beroperasi secara berbeza.

Secara umum, pengguna harus bebas untuk menuntut semula ETH yang mereka pertaruhkan, atau menukar penyedia pertaruhan yang mereka gunakan. Jika himpunan tertentu menjadi terlalu besar, dana boleh dikeluarkan, ditebus dan dipertaruhkan semula dengan <a href="https://rated.network/">pembekal yang lebih kecil</a>. Atau, jika anda telah mengumpul ETH yang mencukupi, anda boleh membuat <a href="/staking/solo/">pertaruhan dari rumah</a>.

</ExpandableCard>

<ExpandableCard
title="Adakah pembayaran ganjaran (pengeluaran separa) berlaku secara automatik?"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">
Ya, selagi pengesah anda telah memberikan alamat pengeluaran. Ini mesti disediakan sekali untuk membolehkan sebarang pengeluaran pada mulanya, kemudian pembayaran ganjaran akan dicetuskan secara automatik setiap beberapa hari dengan setiap sapuan pengesah.
</ExpandableCard>

<ExpandableCard
title="Adakah pengeluaran penuh berlaku secara automatik?"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

Tidak, jika pengesah anda masih aktif pada rangkaian, pengeluaran penuh tidak akan berlaku secara automatik. Ini memerlukan secara manual memulakan keluar secara sukarela.

Setelah pengesah telah menyelesaikan proses keluar dan menganggap akaun itu mempunyai bukti kelayakan pengeluaran, baki yang tinggal akan <em>kemudian</em> dikeluarkan semasa <a href="#validator-sweeping">penyapuan pengesah</a> seterusnya.

</ExpandableCard>

<ExpandableCard title="Bolehkah saya mengeluarkan jumlah tersuai?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
Pengeluaran direka bentuk untuk ditolak secara automatik, memindahkan mana-mana ETH yang tidak menyumbang secara aktif kepada kepentingan. Ini termasuk baki penuh untuk akaun yang telah menyelesaikan proses keluar.

Permohonan pengeluaran amaun ETH tertentu secara manual adalah tidak mungkin.
</ExpandableCard>

<ExpandableCard
title="Saya mengendalikan pengesah. Di manakah saya boleh mendapatkan maklumat lanjut tentang membolehkan pengeluaran?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information on enabling withdrawals?"
eventName="read more">

Pengendali pengesah disyorkan untuk melawati halaman <a href="https://launchpad.ethereum.org/withdrawals/">Pengeluaran Pad Pelancaran Pertaruhan</a> di mana anda akan menemukan butiran lanjut tentang cara menyediakan pengesah anda untuk pengeluaran, masa acara dan butiran lanjut tentang cara pengeluaran berfungsi.

Untuk mencuba persediaan anda pada testnet dahulu, lawati <a href="https://holesky.launchpad.ethereum.org">Pad Pelancaran Pertaruhan Holesky Testnet</a> untuk bermula.

</ExpandableCard>

<ExpandableCard
title="Bolehkah saya mengaktifkan semula pengesah saya selepas keluar dengan mendepositkan lebih banyak ETH?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
Tidak. Sebaik sahaja pengesah telah keluar dan baki penuhnya telah dikeluarkan, sebarang dana tambahan yang didepositkan kepada pengesah itu akan dipindahkan secara automatik ke alamat pengeluaran semasa sapuan pengesahan seterusnya. Untuk mempertaruhkan semula ETH, pengesah baharu mesti diaktifkan.
</ExpandableCard>

## Bacaan lanjut {#further-reading}

- [Pengeluaran Pad Pelancaran Pertaruhan](https://launchpad.ethereum.org/withdrawals)
- [EIP-4895: Rantai Beacon menolak pengeluaran sebagai operasi](https://eips.ethereum.org/EIPS/eip-4895)
- [Pengembala Kucing Ethereum - Shanghai](https://www.ethereumcatherders.com/shanghai_upgrade/index.html)
- [PEEPanEIP #94: Pengeluaran ETH dipertaruhkan (Pengujian) dengan Potuz & Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Rantai Beacon menolak pengeluaran sebagai operasi dengan Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Memahami Baki Berkesan Pengesah](https://www.attestant.io/posts/understanding-validator-effective-balance/)
