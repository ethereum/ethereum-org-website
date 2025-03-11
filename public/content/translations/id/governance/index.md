---
title: Tata Kelola Ethereum
description: Pengantar cara mengambil keputusan tentang Ethereum.
lang: id
---

# Pengantar tentang tata kelola Ethereum {#introduction}

_Jika tidak ada seorang pun yang memiliki Ethereum, bagaimana keputusan tentang perubahan di masa lalu dan masa depan untuk Ethereum dibuat? Pemerintahan Ethereum merujuk pada proses yang memungkinkan keputusan seperti ini dibuat._

<Divider />

## Apa itu tata kelola? {#what-is-governance}

Tata kelola adalah sistem yang terbentuk yang memungkinkan keputusan untuk dibuat. Dalam struktur organisasi pada umumnya, tim eksekutif atau dewan direksi merupakan penentu terakhir dalam pengambilan keputusan. Atau mungkin para pemegang saham mengambil suara terhadap proposal untuk menetapkan perubahan. Dalam sistem politik, para pejabat terpilih dapat menetapkan legislasi yang berupaya untuk mewakili keinginan konstituen mereka.

## Tata kelola terdesentralisasi {#decentralized-governance}

Tidak seorang pun yang memiliki atau mengontrol protokol Ethereum, tetapi keputusan yang berkaitan dengan pengimplementasian perubahan guna memastikan keberlangsungan dan kesejahteraan jaringan masih harus dibuat. Kurangnya aspek kepemilikan ini membuat tata kelola organisasi tradisional menjadi solusi yang tidak kompatibel dengan sistem ini.

## Tata Kelola Ethereum {#ethereum-governance}

Tata kelola Ethereum adalah proses di mana perubahan protokol dibuat. Ini penting untuk disebutkan karena proses ini tidak terkait dengan bagaimana orang-orang dan aplikasi menggunakan protokol - Ethereum tidak memerlukan izin. Siapa pun dari mana saja di dunia ini dapat berpartisipasi dalam aktivitas on-chain. Tidak ada aturan yang dibuat tentang siapa yang bisa atau tidak bisa membuat aplikasi atau mengirim transaksi. Namun, ada proses untuk mengusulkan perubahan pada protokol inti, yang dijalankan oleh aplikasi terdesentralisasi di atasnya. Karena sangat banyak orang bergantung pada kestabilan Ethereum, ada ambang batas koordinasi yang sangat tinggi untuk melakukan perubahan inti, yang mencakup proses teknis dan sosial, guna memastikan perubahan apa pun terhadap Ethereum aman dan didukung oleh komunitas secara luas.

### Tata kelola on-chain vs off-chain {#on-chain-vs-off-chain}

Teknologi blockchain memungkinkan untuk kemampuan tata kelola yang baru, yang dikenal sebagai tata kelola on-chain. Tata kelola on-chain adalah ketika perubahan protokol yang diusulkan diputuskan oleh pengambilan suara pemangku kepentingan, biasanya oleh para pemegang token tata kelola, dan pengambilan suara terjadi di blockchain. Dengan beberapa bentuk pemerintahan di dalam rantai, perubahan protokol yang diusulkan sudah tertulis dalam kode dan diimplementasikan secara otomatis jika pemangku kepentingan menyetujui perubahan tersebut melalui tanda tangan transaksi.

Pendekatan yang berlawanan dengan itu, tata kelola off-chain, adalah jika keputusan perubahan protokol terjadi melalui proses diskusi sosial informal, yang jika disetujui, akan diimplementasikan dalam kode.

**Tata kelola Ethereum terjadi secara off-chain** dengan melibatkan berbagai pemangku kepentingan dalam prosesnya.

_Sekalipun pada tingkat protokol tata kelola Ethereum bersifat off-chain, banyak kasus penggunaan yang dibangun di atas Ethereum, seperti DAO, menggunakan tata kelola on-chain._

<ButtonLink href="/dao/">
  Selengkapnya tentang DAOs
</ButtonLink>

<Divider />

## Siapa yang terlibat? {#who-is-involved}

Ada berbagai pemangku kepentingan dalam [komunitas Ethereum](/community/), yang masing-masing memainkan peran dalam proses tata kelola. Mulai dari para pemangku kepentingan yang paling jauh dari urusan protokol dan jika melihat lebih dekat, kita memiliki:

- **Pemegang ether**: orang-orang ini yang memiliki sejumlah ETH arbitrari. [Lebih lanjut tentang ETH](/eth/).
- **Pengguna Aplikasi**: orang-orang ini berinteraksi dengan aplikasi di blockchain Ethereum.
- **Pengembang Aplikasi/Peralatan**: orang-orang ini yng menulis aplikasi yang beroperasi di blockchain Ethereum (misalnya DeFi, NFT, dll.) atau menyusun peralatan untuk berinteraksi dengan Ethereum (misalnya dompet, rangkaian uji, dll.). [Lebih lanjut tentang dapp](/dapps/).
- **Para Operator Node**: orang-orang ini yang menjalankan node yang menyebarkan blok dan transaksi, yang menolak transaksi atau blok tidak validapa pun yang mereka temui. [Lebih lanjut tentang node](/developers/docs/nodes-and-clients/).
- **Penulis EIP**: orang-orang ini mengusulkan perubahan pada protokol Ethereum, dalam bentuk Proposal Peningkatan Ethereum (EIP). [Selengkapnya tentang EIP](/eips/).
- **Validator**: orang-orang ini menjalankan simpul yang dapat menambahkan blok baru ke rantai blok Ethereum.
- **Pengembang Protokol** (alias "Pengembang Inti" ): orang-orang ini memelihara berbagai implementasi Ethereum (misalnya, go-ethereum, Nethermind, Besu, Erigon, Reth di lapisan eksekusi atau Prysm, Lighthouse, Nimbus, Teku, Lodestar di lapisan konsensus). [Lebih lanjut tentang klien Ethereum](/developers/docs/nodes-and-clients/).

_Catatan: setiap individu bisa memiliki beberapa peran pada grup ini (misalnya seorang pengembang protokol dapat memperjuangkan EIP, dan bertugas sebagai validator rantai suar, serta menggunakan aplikasi DeFi). Namun, untuk kejelasan konseptual, paling mudah untuk membedakannya._

<Divider />

## Apa itu EIP? {#what-is-an-eip}

Salah satu proses penting yang digunakan dalam tata kelola Ethereum adalah proposal **Proposal Peningkatan Ethereum (EIP)**. EIP adalah standar yang menentukan fitur atau proses baru yang berpotensi untuk Ethereum. Siapa pun yang terlibat dalam komunitas Ethereum dapat membuat EIP. Jika Anda tertarik untuk menulis EIP atau berpartisipasi dalam peer-review dan/atau pemerintahan, lihat:

<ButtonLink href="/eips/">
  Selengkapnya tentang EIP
</ButtonLink>

<Divider />

## Proses formal {#formal-process}

Proses formal untuk memasukkan perubahan ke dalam protokol Ethereum adalah sebagai berikut:

1. **Usulkan EIP Inti**: seperti yang dijelaskan dalam [EIP-1](https://eips.ethereum.org/EIPS/eip-1#core-eips), langkah pertama untuk mengusulkan perubahan pada Ethereum secara formal adalah dengan membuat detailnya dalam EIP Inti. Ini akan bertindak sebagai spesifikasi resmi untuk EIP yang akan diimplementasikan oleh Pengembang Protokol jika disetujui.

2. **Presentasikan EIP Anda kepada Pengembang Protokol**: setelah memiliki EIP Inti yang untuknya Anda telah mengumpulkan masukan dari komunitas, Anda harus mempresentasikannya kepada Pengembang Protokol. Anda dapat melakukan ini dengan mengusulkannya untuk dibahas dalam [pemanggilan AllCoreDevs](https://github.com/ethereum/execution-specs/tree/master/network-upgrades#getting-the-considered-for-inclusion-cfi-status). Sepertinya beberapa diskusi telah terjadi dengan tidak sinkron di [forum Ethereum Magician](https://ethereum-magicians.org/) atau di [Discord Ethereum R&D](https://discord.gg/mncqtgVSVw).

> Kemungkinan hasil dari tahap ini adalah:

> - EIP akan dipertimbangkan sebagai peningkatan jaringan di masa depan
> - Perubahan teknis akan diminta
> - Perubahan mungkin ditolak jika bukan bagian dari prioritas atau dampak peningkatannya tidak cukup besar jika dibandingkan dengan upaya pengembangannya

3. **Ulangi prosesnya hingga menjadi proposal akhir:** setelah menerima umpan balik dari semua pemangku kepentingan terkait, Anda mungkin perlu melakukan perubahan terhadap proposal awal Anda guna meningkatkan keamanannya atau memenuhi kebutuhan beragam pengguna dengan lebih baik. Setelah EIP memasukkan semua perubahan yang Anda yakini penting, Anda harus mempresentasikannya lagi kepada Pengembang Protokol. Lalu Anda akan bergerak ke langkah berikutnya dalam proses ini, atau masalah baru akan muncul, yang membutuhkan proses perulangan lagi pada proposal Anda.

4. **EIP Dimasukkan dalam Peningkatan Jaringan**: dengan asumsi EIP disetujui, diuji, dan diimpelementasikan, EIP akan dijadwalkan sebagai bagian dari peningkatan jaringan. Dengan mempertimbangkan biaya koordinasi yang tinggi untuk peningkatan jaringan (setiap orang perlu melakukan peningkatan secara bersamaan), EIP pada umumnya dikelompokkan bersama dalam peningkatan.

5. **Peningkatan Jaringan Diaktifkan**: setelah peningkatan jaringan diaktifkan, EIP akan beroperasi di jaringan Ethereum. _Catatan: peningkatan jaringan biasanya diaktifkan di testnet sebelum diaktifkan di Jaringan Utama Ethereum._

Alur ini, sekalipun sangat sederhana, memberi gambaran umum tentang tahap-tahap penting sampai perubahan protokol diaktifkan di Ethereum. Sekarang, mari kita membahas faktor informal yang berperan dalam proses ini.

## Proses informal {#informal-process}

### Memahami hasil pekerjaan sebelumnya {#prior-work}

Pejuang EIP harus membiasakan diri dengan hasil pekerjaan dan proposal di masa lalu sebelum membuat EIP yang dapat dianggap penting untuk digunakan di Jaringan Utama Ethereum. Dengan cara ini, EIP diharapkan membawa sesuatu yang baru yang belum ditolak sebelumnya. Tiga tempat utama untuk melakukan riset tentang hal ini adalah [repositori EIP](https://github.com/ethereum/EIPs), [Ethereum Magicians](https://ethereum-magicians.org/) dan [ethresear.ch](https://ethresear.ch/).

### Grup kerja {#working-groups}

Draf awal EIP tidak mungkin diimpelementasikan di Jaringan Utama Ethereum tanpa pengeditan atau perubahan. Umumnya, Pejuang EIP akan bekerja sama dengan subset Pengembang Protokol untuk menentukan, mengimplementasi, menguji, mengulangi, dan memfinalisasi proposal mereka. Secara historis, grup kerja ini memerlukan waktu kerja beberapa bulan (dan terkadang bertahun-tahun!). Demikian juga dengan Pejuang EIP, untuk perubahan seperti ini harus melibatkan Pengembang Aplikasi/Peralatan yang relevan di awal upaya mereka untuk mengumpulkan umpan balik dari pengguna akhir dan mengurangi risiko penggunaan apa pun.

### Konsensus komunitas {#community-consensus}

Sementara beberapa EIP adalah perbaikan teknis yang sederhana dengan implikasi minimal, beberapa yang lain memiliki aspek yang lebih kompleks dan membawa implikasi yang akan mempengaruhi pemangku kepentingan yang berbeda dengan cara yang berbeda. Hal ini berarti beberapa EIP lebih kontroversial dalam komunitas dibandingkan yang lainnya.

Tidak ada buku pedoman yang jelas tentang cara menangani proposal yang kontroversial. Ini adalah hasil dari desain terdesentralisasi Ethereum di mana tidak ada kelompok pemegang saham tunggal yang dapat memaksa kelompok lainnya melalui kekerasan: pengembang protokol dapat memilih untuk tidak mengimplementasikan perubahan kode; operator simpul dapat memilih untuk tidak menjalankan klien Ethereum terbaru; tim aplikasi dan pengguna dapat memilih untuk tidak bertransaksi di rantai. Karena Pengembang Protokol tidak memiliki cara untuk memaksa agar orang-orang mengadopsi peningkatan jaringan, umumnya mereka akan mengelak untuk mengimplementasikan EIP jika kontroversinya melebihi keuntungannya bagi komunitas yang lebih luas.

Pejuang EIP diharapkan mengumpulkan umpan balik dari semua pemangku kepentingan terkait. Jika Anda merasa sebagai pejuang EIP yang kontroversial, seharusnya Anda mencoba dan mengatasi penolakan untuk menyusun konsensus seputar EIP Anda. Dengan mempertimbangkan ukuran dan keberagaman komunitas Ethereum, tidak ada satu metrik pun (mis. pengambilan suara koin) yang dapat digunakan untuk mengukur konsensus komunitas, dan Pejuang EIP diharapkan untuk beradaptasi dengan situasi seputar proposal mereka.

Di luar keamanan jaringan Ethereum, bobot yang signifikan secara historis telah ditempatkan oleh Pengembang Protokol pada sesuatu yang dihargai oleh Pengembang Aplikasi/Peralatan dan Pengguna Aplikasi, mengingat bahwa penggunaan dan pengembangan mereka di Ethereum adalah unsur yang membuat ekosistem menjadi menarik bagi para pemangku kepentingan lainnya. Selain itu, EIP perlu diimplementasikan di semua implementasi klien, yang dikelola oleh tim khusus. Bagian dari proses ini biasanya cara meyakinkan beberapa tim Pengembang Protokol bahwa perubahan tertentu berharga dan yang membantu pengguna akhir atau menyelesaikan masalah keamanan.

<Divider />

## Menangani perselisihan pendapat {#disagreements}

Memiliki banyak pemangku kepentingan dengan beragam motivasi dan kepercayaan berarti bahwa perselisihan pendapat merupakan hal yang biasa.

Umumnya, perselisihan pendapat ditangani melalui bentuk diskusi panjang di forum publik untuk memahami akar permasalahan dan memungkinkan siapa pun untuk mempertimbangkannya. Biasanya, penyelesaiannya berbentuk satu grup mengalah, atau solusi yang memuaskan ditemukan. Jika satu grup merasa cukup kuat, memaksakan perubahan tertentu dapat menyebabkan pemisahan rantai. Pemisahan rantai adalah ketika beberapa pemangku kepentingan memprotes implementasi perubahan protokol yang menyebabkan versi protokol yang beroperasi berbeda dan tidak kompatibel, dari sana muncul dua blockchain berbeda.

### Fork DAO {#dao-fork}

Fork adalah ketika peningkatan atau perubahan teknis utama harus dibuat dalam jaringan dan mengubah "aturan" protokol. [Klien Ethereum](/developers/docs/nodes-and-clients/) harus memperbarui perangkat lunak mereka untuk mengimplementasikan aturan fork yang baru.

Garpu DAO merupakan respons terhadap [serangan DAO 2016](https://www.coindesk.com/understanding-dao-hack-journalists) di mana kontrak [DAO](/glossary/#dao) yang tidak aman dikuras dananya sebanyak lebih dari 3,6 juta ETH dalam peretasan saat itu. Fork ini memindahkan dana dari kontrak yang bermasalah ke kontrak yang baru yang memungkinkan siapa pun yang kehilangan dananya dalam peretasan dapat memperolehnya kembali.

Tindakan ini dipilih oleh komunitas Ethereum. Setiap pemegang ETH dapat memilih melalui transaksi di [platform pemilihan](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). Keputusan untuk melakukan fork mencapai lebih dari 85% suara.

Penting untuk dicatat bahwa meskipun protokol melakukan fork untuk membalikkan peretasan, bobot pengambilan suara dalam memutuskan fork dapat diperdebatkan karena beberapa alasan:

- Jumlah yang memberikan suara sangat rendah
- Kebanyakan orang tidak tahu bahwa pengambilan suara sedang berlangsung
- Pengambilan suara hanya mewakili pemilik ETH, bukan peserta lainnya dalam sistem

Sebuah subset komunitas menolak untuk melakukan fork, sebagian besar karena mereka merasa insiden DAO bukanlah kecacatan dalam protokol. Mereka kemudian membentuk [Ethereum Classic](https://ethereumclassic.org/).

Saat ini, komunitas Ethereum telah mengadopsi kebijakan non-intervensi dalam hal bug kontrak atau dana yang hilang untuk mempertahankan netralitas sistem yang sudah terpercaya.

Tonton lebih banyak tentang peretasan DAO:

<YouTube id="rNeLuBOVe8A" />

<Divider />

### Kegunaan melakukan fork {#forking-utility}

Fork Ethereum/Ethereum Classic merupakan contoh yang sangat baik untuk fork yang sehat. Kami memiliki dua grup yang berselisih pendapat cukup kuat satu sama lain tentang beberapa nilai inti yang rasanya sepadan dengan risiko yang dilibatkan untuk mengikuti tindakan mereka masing-masing.

Kemampuan untuk melakukan fork dalam menghadapi perbedaan politik, filosofi, atau ekonomi yang signifikan memainkan peran yang besar dalam keberhasilan tata kelola Ethereum. Tanpa kemampuan untuk melakukan fork, alternatifnya adalah perselisihan internal yang berkepanjangan, yang merupakan partisipasi yang dipaksakan bagi mereka yang pada akhirnya membentuk Ethereum Classic dan visi yang semakin berbeda tentang ukuran keberhasilan Ethereum.

<Divider />

## Pemerintahan Rantai Suar {#beacon-chain}

Proses tata kelola Ethereum sering menukarkan kecepatan dan efisiensi untuk keterbukaan dan inklusivitas. Untuk mempercepat pengembangan Rantai Suar, pengembangan ini diluncukan secara terpisah dari bukti kerja jaringan Ethereum dan mengikuti pratik tata kelolanya sendiri.

Meskipun spesifikasi dan implementasi pengembangan selalu bersifat open source, proses formal yang digunakan untuk mengusulkan pembaruan yang dijelaskan di atas belum digunakan. Ini memungkinkan perubahan untuk ditetapkan dan disetujui lebih cepat oleh para peneliti dan para pengimplementasi.

Ketika Rantai Suar bergabung dengan lapisan eksekusi Ethereum pada 15 September 2022, penggabungan tersebut selesai sebagai bagian dari [Peningkatan jaringan Paris](/history/#paris). Usulan [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675) diubah dari status 'Last Call' menjadi 'Final', menyelesaikan transisi ke bukti taruhan.

<ButtonLink href="/roadmap/merge/">
  Selengkapnya tentang penggabungan
</ButtonLink>

<Divider />

## Bagaimana saya dapat terlibat? {#get-involved}

- [Usulkan EIP](/eips/#participate)
- [Diskusikan proposal saat ini](https://ethereum-magicians.org/)
- [Libatkan diri dalam diskusi R&D](https://ethresear.ch/)
- [Bergabunglah dengan discord Ethereum R&D](https://discord.gg/mncqtgVSVw)
- [Menjalankan sebuah simpul](/developers/docs/nodes-and-clients/run-a-node/)
- [Berkontribusilah terhadap pengembangan klien](/developers/docs/nodes-and-clients/#execution-clients)
- [Program Magang Pengembang Inti](https://blog.ethereum.org/2021/09/06/core-dev-apprenticeship-second-cohort/)

## Bacaan lebih lanjut {#further-reading}

Tata kelola di Ethereum tidaklah didefinisikan dengan kaku. Berbagai peserta komunitas memiliki sudut pandang berbeda mengenai ini. Berikut adalah beberapa di antaranya:

- [Catatan tentang Tata Kelola Rantai Blok](https://vitalik.eth.limo/general/2017/12/17/voting.html) - _Vitalik Buterin_
- [Bagaimana cara kerja Pemerintahan Ethereum?](https://cryptotesters.com/blog/ethereum-governance) – _Cryptotesters_
- [Bagaimana cara kerja pemerintahan Ethereum](https://medium.com/coinmonks/how-ethereum-governance-works-71856426b63a) – _Micah Zoltu_
- [Apa yang dimaksud dengan pengembang inti Ethereum?](https://hudsonjameson.com/2020-06-22-what-is-an-ethereum-core-developer/) - _Hudson Jameson_
- [Tata Kelola, Bagian 2: Plutokrasi Masih Buruk](https://vitalik.eth.limo/general/2018/03/28/plutocracy.html) - _Vitalik Buterin_
- [Bergerak melampaui tata kelola pemungutan suara koin](https://vitalik.eth.limo/general/2021/08/16/voting3.html) - _Vitalik Buterin_
