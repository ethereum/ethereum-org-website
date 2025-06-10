---
title: Pertaruhkan sendiri ETH anda
description: Gambaran keseluruhan tentang cara untuk mula mempertaruhkan ETH anda sendiri
lang: ms
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-solo.png
alt: Leslie si badak pada cip komputernya sendiri.
sidebarDepth: 2
summaryPoints:
  - Terima ganjaran maksimum terus daripada protokol untuk memastikan pengesah anda berfungsi dengan baik dan dalam talian
  - Jalankan perkakasan sendiri dan tambah sendiri pada keselamatan dan keteragihan rangkaian Ethereum
  - Alih keluar kepercayaan dan jangan sekali-kali melepaskan kawalan ke atas kunci dana anda
---

## Apakah pertaruhan sendiri? {#what-is-solo-staking}

Pertaruhan sendiri ialah tindakan [menjalankan nod Ethereum](/run-a-node/) yang disambungkan melalui internet dan mendepositkan 32 ETH untuk mengaktifkan [pengesah](#faq), memberikan anda keupayaan untuk mengambil bahagian secara langsung dalam konsensus rangkaian.

**Pertaruhan sendiri meningkatkan keteragihan rangkaian Ethereum**, menjadikan Ethereum lebih tahan penapisan dan teguh terhadap serangan. Kaedah pertaruhan lain mungkin tidak membantu rangkaian dengan cara yang sama. Pertaruhan sendiri ialah pilihan pertaruhan terbaik untuk mendapatkan Ethereum.

Nod Ethereum terdiri daripada pelanggan lapisan perlaksanaan (EL), dan juga pelanggan lapisan persetujuan (CL). Pelanggan ini adalah perisian yang berfungsi bersama-sama, dengan set kunci tandatangan yang sah, untuk mengesahkan urus niaga dan blok, membuktikan ketua rantaian yang betul, pengesahan agregat dan cadangan blok.

Petaruh sendiri bertanggungjawab untuk mengendalikan perkakasan yang diperlukan untuk menjalankan pelanggan ini. Anda sangat disyorkan untuk menggunakan mesin khusus untuk tujuan ini yang anda kendalikan dari rumah–ini sangat bermanfaat kepada kesihatan rangkaian.

Petaruh sendiri menerima ganjaran terus daripada protokol untuk memastikan pengesah mereka berfungsi dengan baik dan dalam talian.

## Apakah sebab membuat pertaruhan sendiri? {#why-stake-solo}

Pertaruhan sendiri datang dengan lebih banyak tanggungjawab tetapi memberi anda kawalan maksimum ke atas dana dan persediaan pertaruhan anda.

<CardGrid>
  <Card title="Dapatkan ETH baharu" emoji="💸" description="Earn ETH-denominated rewards directly from the protocol when your validator is online, without any middlemen taking a cut." />
  <Card title="Kawalan penuh" emoji="🎛️" description="Keep your own keys. Choose the combination of clients and hardware that allows you to minimize your risk and best contribute to the health and security of the network. Third-party staking services make these decisions for you, and they don't always make the safest choices." />
  <Card title="Keselamatan rangkaian" emoji="🔐" description="Home staking is the most impactful way to stake. By running a validator on your own hardware at home, you strengthen the robustness, decentralization, and security of the Ethereum protocol." />
</CardGrid>

## Pertimbangan sebelum membuat pertaruhan sendiri {#considerations-before-staking-solo}

Walaupun kami berharap pertaruhan sendiri boleh diakses dan bebas risiko kepada semua orang, ini bukan realiti. Terdapat beberapa pertimbangan praktikal dan serius yang perlu diingat sebelum memilih untuk mempertaruhkan sendiri ETH anda.

<InfoGrid>
<ExpandableCard title="Bacaan yang diperlukan" eventCategory="SoloStaking" eventName="clicked required reading">
Apabila mengendalikan nod anda sendiri, anda harus meluangkan sedikit masa untuk mempelajari cara menggunakan perisian yang telah anda pilih. Ini melibatkan membaca dokumentasi yang berkaitan dan menyesuaikan diri dengan saluran komunikasi pasukan pembangun tersebut.

Lebih banyak anda memahami tentang perisian yang anda jalankan dan cara bukti penaruhan berfungsi, semakin kurang risikonya sebagai petaruh, dan lebih mudah untuk menyelesaikan sebarang isu yang mungkin timbul sepanjang perjalanan sebagai pengendali nod.
</ExpandableCard>

<ExpandableCard title="Selesa dengan komputer" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
Persediaan nod memerlukan tahap keselesaan yang munasabah apabila bekerja dengan komputer, walaupun alat baharu memudahkan perkara ini dari semasa ke semasa. Pemahaman tentang antara muka baris arahan sangat membantu, tetapi tidak lagi diperlukan dengan ketat.

Ia juga memerlukan persediaan perkakasan yang sangat asas, dan beberapa pemahaman tentang spesifikasi minimum yang disyorkan.
</ExpandableCard>

<ExpandableCard title="Pengurusan kunci selamat" eventCategory="SoloStaking" eventName="clicked secure key management">
Sama seperti cara kunci peribadi melindungi alamat Ethereum anda, anda perlu menjana kunci khusus untuk pengesah anda. Anda mesti memahami cara untuk memastikan sebarang frasa benih atau kunci peribadi selamat dan terjamin.{' '}

<a href="/security/">Keselamatan Ethereum dan pencegahan penipuan</a>
</ExpandableCard>

<ExpandableCard title="Maintenance" eventCategory="SoloStaking" eventName="clicked maintenance">
Perkakasan kadangkala gagal, sambungan rangkaian ralat, dan perisian pelanggan kadangkala memerlukan peningkatan. Penyelenggaraan nod tidak dapat dielakkan dan kadangkala memerlukan perhatian anda. Anda pasti ingin memastikan anda sentiasa mengetahui sebarang peningkatan rangkaian yang dijangkakan, atau peningkatan pelanggan kritikal yang lain.
</ExpandableCard>

<ExpandableCard title="Masa operasi yang boleh dipercayai" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Ganjaran anda adalah berkadar dengan masa pengesah anda berada dalam talian dan membuat pengesahan dengan betul. Masa hentikan dikenakan penalti yang berkadar dengan bilangan pengesah lain yang berada di luar talian pada masa yang sama, tetapi <a href="#faq">tidak mengakibatkan pemotongan</a>. Lebar jalur juga penting, kerana ganjaran dikurangkan untuk pengesahan yang tidak diterima tepat pada masanya. Keperluan akan berbeza-beza, tetapi sekurang-kurangnya 10 Mb/s ke atas dan ke bawah disyorkan.
</ExpandableCard>

<ExpandableCard title="Risiko pemotongan" eventCategory="SoloStaking" eventName="clicked slashing risk">
Berbeza daripada penalti tidak aktif kerana berada di luar talian, <em>pemotongan</em> ialah penalti yang lebih serius dikhaskan untuk kesalahan berniat jahat. Dengan menjalankan klien minoriti dengan kunci anda dimuatkan pada satu mesin sahaja pada satu-satu masa, risiko anda untuk dipotong diminimumkan. Walau bagaimanapun, semua petaruh mesti sedar tentang risiko pemotongan.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Lagi tentang kitaran hayat pemotongan dan pengesah</a>
</ExpandableCard>
</InfoGrid>

<StakingComparison page="solo" />

## Cara ia berfungsi {#how-it-works}

<StakingHowSoloWorks />

Semasa aktif anda akan memperoleh ganjaran ETH, yang akan di depositkan secara berkala ke dalam alamat pengeluaran anda.

Jika mahu, anda boleh keluar sebagai pengesah yang menghapuskan keperluan untuk berada dalam talian, dan menghentikan sebarang ganjaran selanjutnya. Baki anda yang tinggal kemudian akan dikeluarkan ke alamat pengeluaran yang anda tetapkan semasa persediaan.

[Maklumat lanjut tentang pengeluaran pertaruhan](/staking/withdrawals/)

## Bermula di Pad Pelancaran Pertaruhan {#get-started-on-the-staking-launchpad}

Pad Pelancaran Pertaruhan ialah aplikasi sumber terbuka yang akan membantu anda menjadi pertaruh. Ia akan membimbing anda memilih pelanggan anda, menjana kunci anda dan mendepositkan ETH anda kepada kontrak deposit pertaruhan. Senarai semak disediakan untuk memastikan anda telah merangkumi segala-galanya untuk menyediakan pengesah anda dengan selamat.

<StakingLaunchpadWidget />

## Perkara yang perlu dipertimbangkan dengan alat persediaan nod dan pelanggan {#node-tool-considerations}

Terdapat semakin banyak alat dan perkhidmatan untuk membantu anda mempertaruhkan ETH anda sendiri, tetapi setiap satu datang dengan risiko dan faedah yang berbeza.

Penunjuk atribut digunakan di bawah untuk menandakan kekuatan atau kelemahan ketara yang mungkin ada pada alat pertaruhan tersenarai. Gunakan bahagian ini sebagai rujukan untuk cara kami mentakrifkan atribut ini semasa anda memilih alat untuk membantu dalam perjalanan pertaruhan anda.

<StakingConsiderations page="solo" />

## Terokai alat persediaan nod dan pelanggan {#node-and-client-tools}

Terdapat pelbagai pilihan yang tersedia untuk membantu anda dengan persediaan anda. Gunakan penunjuk di atas untuk membantu membimbing anda menggunakan alatan di bawah.

<ProductDisclaimer />

### Alat nod

<StakingProductsCardGrid category="nodeTools" />

Sila ambil perhatian kepentingan memilih [pelanggan minoriti](/developers/docs/nodes-and-clients/client-diversity/) kerana ia meningkatkan keselamatan rangkaian dan mengehadkan risiko anda. Alat yang membolehkan anda menyediakan pelanggan minoriti di lambangkan sebagai <em style={{ textTransform: "uppercase" }}>"berbilang pelanggan."</em>

### Penjana Utama

Alat ini boleh digunakan sebagai alternatif kepada [Deposit Pertaruhan CLI](https://github.com/ethereum/staking-deposit-cli/) untuk membantu penjanaan kunci.

<StakingProductsCardGrid category="keyGen" />

Ada cadangan untuk alat pertaruhan yang kami terlepas? Semak [dasar penyenaraian produk](/contributing/adding-staking-products/) kami untuk melihat sama ada ia sesuai dan serahkan untuk semakan.

## Terokai panduan pertaruhan sendiri {#staking-guides}

<StakingGuides />

## Soalan lazim {#faq}

Ini adalah beberapa soalan yang paling biasa tentang pertaruhan yang patut diketahui.

<ExpandableCard title="Apakah pengesah?">

<em>Pengesah</em> ialah entiti maya yang hidup di Ethereum dan mengambil bahagian dalam konsensus protokol Ethereum. Pengesah diwakili oleh baki, kunci awam dan sifat lain. <em>Pelanggan pengesah</em> ialah perisian yang bertindak bagi pihak pengesah dengan menahan dan menggunakan kunci peribadinya. Pelanggan pengesah tunggal boleh memegang banyak pasangan kunci, mengawal banyak pengesah.

</ExpandableCard>

<ExpandableCard title="Bolehkah saya mendepositkan lebih daripada 32 ETH?">
Setiap pasangan kunci yang dikaitkan dengan pengesah memerlukan tepat 32 ETH untuk diaktifkan. Lebih banyak ETH yang didepositkan pada satu set kunci tidak meningkatkan potensi ganjaran, kerana setiap pengesah dihadkan kepada <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">baki berkesan</a> sebanyak 32 ETH. Ini bermakna pertaruhan dilakukan dalam kenaikan 32 ETH, setiap satu dengan set kunci dan bakinya sendiri.

Jangan mendepositkan lebih daripada 32 ETH untuk pengesah tunggal. Ia tidak akan meningkatkan ganjaran anda. Jika alamat pengeluaran telah ditetapkan untuk pengesah, lebihan dana melebihi 32 ETH akan dikeluarkan secara automatik ke alamat ini semasa <a href="/staking/withdrawals/#validator-sweeping">menyapu pengesah</a> seterusnya.

Jika pertaruhan rumah terlalu mendesak untuk anda, pertimbangkan untuk menggunakan pembekal <a href="/staking/saas/">pertaruhan-sebagai-perkhidmatan</a>, atau jika anda berfungsi dengan kurang daripada 32 ETH, lihat <a href="/staking/pools/">himpunan pertaruhan</a>.
</ExpandableCard>

<ExpandableCard title="Adakah saya akan dipotong jika saya pergi ke luar talian? (tldr: No.)">
Melangkah ke luar talian apabila rangkaian dimuktamadkan dengan betul TIDAK akan mengakibatkan pemotongan. <em>Penalti ketidakaktifan</em> kecil akan dikenakan jika pengesah anda tidak tersedia untuk memperakui tempoh yang diberikan (setiap satu 6.4 minit panjang), tetapi ini sangat berbeza dengan <em>pemotongan</em>. Penalti ini kurang sedikit daripada ganjaran yang akan anda peroleh sekiranya pengesah tersedia untuk membuat perakuan, dan kerugian boleh diperoleh kembali dengan lebih kurang jumlah masa yang sama kembali dalam talian semula.

Harap maklum bahawa penalti untuk ketidakaktifan adalah berkadar dengan bilangan pengesah yang berada di luar talian pada masa yang sama. Dalam kes di mana sebahagian besar rangkaian berada di luar talian sekali gus, penalti bagi setiap pengesah ini akan lebih besar daripada apabila pengesah tunggal tidak tersedia.

Dalam kes yang melampau jika rangkaian berhenti memuktamadkan akibat lebih satu pertiga daripada pengesah berada di luar talian, pengguna ini akan mengalami apa yang dikenali sebagai <em>kebocoran ketidakaktifan kuadratik</em>, yang merupakan longkang eksponen ETH daripada akaun pengesah luar talian. Ini membolehkan rangkaian akhirnya sembuh sendiri dengan membakar ETH pengesah yang tidak aktif sehingga baki mereka mencapai 16 ETH, pada ketika itu mereka akan dikeluarkan secara automatik daripada himpunan pengesah. Pengesah dalam talian yang selebihnya akhirnya akan merangkumi lebih daripada 2/3 rangkaian sekali lagi, memenuhi majoriti besar yang diperlukan untuk sekali lagi memuktamadkan rantaian.
</ExpandableCard>

<ExpandableCard title="Bagaimanakah saya memastikan saya tidak dipotong?">
Ringkasnya, ini tidak boleh dijamin sepenuhnya, tetapi jika anda bertindak dengan niat yang baik, jalankan pelanggan minoriti dan hanya simpan kunci tandatangan anda pada satu mesin pada satu masa, risiko untuk dipotong hampir sifar.

Terdapat hanya beberapa cara khusus yang boleh menyebabkan pengesah dipotong dan dikeluarkan daripada rangkaian. Pada masa penulisan, pemotongan yang telah berlaku secara eksklusif merupakan produk daripada persediaan perkakasan yang berlebihan di mana kunci tandatangan disimpan pada dua mesin berasingan sekaligus. Ini secara tidak sengaja boleh mengakibatkan <em>undi berganda</em> daripada kunci anda, yang merupakan kesalahan yang boleh dipotong.

Menjalankan pelanggan majoriti besar (mana-mana pelanggan yang digunakan oleh lebih 2/3 rangkaian) juga mempunyai risiko kemungkinan pemotongan sekiranya pelanggan ini mempunyai pepijat yang mengakibatkan garpu rantai. Ini boleh mengakibatkan garpu rosak yang akan dimuktamadkan. Untuk membetulkan kembali kepada rantaian yang dimaksudkan memerlukan penyerahan <em>undi sekeliling</em> dengan cuba membuat asal blok yang dimuktamadkan. Ini juga merupakan kesalahan yang boleh dipotong dan boleh dielakkan hanya dengan menjalankan pelanggan minoriti.

Pepijat yang setara dalam <em>pelanggan minoriti tidak akan dimuktamadkan</em> dan dengan itu tidak akan menghasilkan undian keliling, dan hanya akan mengakibatkan penalti tidak aktif, <em>bukan pemotongan</em>.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">Ketahui lebih lanjut tentang kepentingan menjalankan pelanggan minoriti.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Ketahui lebih lanjut tentang pencegahan pemotongan</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Pelanggan manakah yang terbaik?">
Pelanggan individu mungkin berbeza sedikit dari segi prestasi dan antara muka pengguna, kerana masing-masing dibangunkan oleh pasukan yang berbeza menggunakan pelbagai bahasa pengaturcaraan. Bahawa dikatakan, tiada seorang pun daripada mereka adalah "terbaik." Semua pelanggan pengeluaran adalah perisian yang sangat baik, yang semuanya melaksanakan fungsi teras yang sama untuk menyegerak dan berinteraksi dengan blok rantai.

Memandangkan semua pelanggan pengeluaran menyediakan kefungsian asas yang sama, sebenarnya sangat penting untuk anda memilih <strong>pelanggan minoriti</strong>, bermakna mana-mana pelanggan yang TIDAK digunakan oleh majoriti pengesah pada rangkaian pada masa ini. Ini mungkin kedengaran berlawanan dengan intuitif, tetapi menjalankan pelanggan majoriti atau supermajoriti meletakkan anda pada peningkatan risiko pemotongan sekiranya berlaku pepijat dalam pelanggan tersebut. Menjalankan pelanggan minoriti mengehadkan risiko ini secara drastik.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Ketahui lebih lanjut tentang sebab kepelbagaian pelanggan adalah kritikal</a>
</ExpandableCard>

<ExpandableCard title="Bolehkah saya hanya menggunakan VPS (pelayan peribadi maya)?">
Walaupun pelayan peribadi maya (VPS) boleh digunakan sebagai pengganti perkakasan rumah, akses fizikal dan lokasi pelanggan pengesah anda <em>penting</em>. Penyelesaian awan terpusat seperti Perkhidmatan Web Amazon atau Lautan Digital membolehkan kemudahan tidak perlu mendapatkan dan mengendalikan perkakasan, dengan mengorbankan pemusatan rangkaian.

Lebih banyak pelanggan pengesah berjalan pada penyelesaian storan awan terpusat tunggal, lebih berbahaya bagi pengguna ini. Sebarang peristiwa yang membawa penyedia ini ke luar talian, sama ada melalui serangan, tuntutan kawal selia atau hanya gangguan bekalan elektrik/internet, akan mengakibatkan setiap pelanggan pengesah yang bergantung pada pelayan ini ke luar talian pada masa yang sama.

Penalti luar talian adalah berkadar dengan bilangan orang lain di luar talian pada masa yang sama. Menggunakan VPS sangat meningkatkan risiko bahawa penalti luar talian akan menjadi lebih teruk, dan meningkatkan risiko kebocoran atau pemotongan kuadratik anda sekiranya gangguan itu cukup besar. Untuk meminimumkan risiko anda sendiri, dan risiko kepada rangkaian, pengguna amat digalakkan untuk mendapatkan dan mengendalikan perkakasan mereka sendiri.
</ExpandableCard>

<ExpandableCard title="Bagaimanakah cara saya membuka kunci ganjaran saya atau mendapatkan kembali ETH saya?">

Pengeluaran dalam apa jua bentuk daripada Rantai Beacon memerlukan kelayakan pengeluaran ditetapkan.

Petaruh baharu menetapkan ini pada masa penjanaan dan deposit kunci. Petaruh sedia ada yang belum menetapkan ini boleh meningkatkan kunci mereka untuk menyokong fungsi ini.

Setelah kelayakan pengeluaran ditetapkan, pembayaran ganjaran (ETH terkumpul sepanjang 32 awal) akan diedarkan secara berkala ke alamat pengeluaran secara automatik.

Untuk membuka kunci dan menerima kembali keseluruhan baki anda, anda juga mesti melengkapkan proses keluar dari pengesah anda.

<ButtonLink href="/staking/withdrawals/">Maklumat lanjut tentang pengeluaran pertaruhan</ButtonLink>
</ExpandableCard>

## Bacaan lanjut {#further-reading}

- [Direktori Pertaruhan Ethereum](https://www.staking.directory/) - _Eridian dan Spacesider_
- [Masalah Kepelbagaian Pelanggan Ethereum](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [Membantu Kepelbagaian Pelanggan](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Kepelbagaian pelanggan pada lapisan persetujuan Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [Cara: Beli Perkakasan Pengesah Ethereum](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [Langkah demi Langkah: Cara menyertai Testnet Ethereum 2.0](https://kb.beaconcha.in/guides/tutorial-eth2-multiclient) - _Butta_
- [Petua Pencegahan Pemotongan Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />
