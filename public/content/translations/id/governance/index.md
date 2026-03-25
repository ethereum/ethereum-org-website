---
title: Tata Kelola Ethereum
description: Pengantar tentang bagaimana keputusan mengenai Ethereum dibuat.
lang: id
---

# Pengantar tata kelola Ethereum {#introduction}

_Jika tidak ada yang memiliki [Ethereum](/), bagaimana keputusan tentang perubahan masa lalu dan masa depan pada Ethereum dibuat? Tata kelola Ethereum mengacu pada proses yang memungkinkan keputusan tersebut dibuat._

<Divider />

## Apa itu tata kelola? {#what-is-governance}

Tata kelola adalah sistem yang ada untuk memungkinkan pengambilan keputusan. Dalam struktur organisasi pada umumnya, tim eksekutif atau dewan direksi mungkin memiliki keputusan akhir dalam pengambilan keputusan. Atau mungkin pemegang saham memberikan suara pada proposal untuk memberlakukan perubahan. Dalam sistem politik, pejabat terpilih dapat memberlakukan undang-undang yang berupaya mewakili keinginan konstituen mereka.

## Tata kelola terdesentralisasi {#decentralized-governance}

Tidak ada satu orang pun yang memiliki atau mengendalikan protokol Ethereum, tetapi keputusan tetap perlu dibuat tentang penerapan perubahan untuk memastikan umur panjang dan kemakmuran jaringan dengan sebaik-baiknya. Ketiadaan kepemilikan ini membuat tata kelola organisasi tradisional menjadi solusi yang tidak kompatibel.

## Tata Kelola Ethereum {#ethereum-governance}

Tata kelola Ethereum adalah proses di mana perubahan protokol dibuat. Penting untuk ditekankan bahwa proses ini tidak terkait dengan bagaimana orang dan aplikasi menggunakan protokol - Ethereum bersifat tanpa izin. Siapa pun dari mana pun di dunia dapat berpartisipasi dalam aktivitas onchain. Tidak ada aturan yang ditetapkan tentang siapa yang dapat atau tidak dapat membangun aplikasi atau mengirim transaksi. Namun, ada proses untuk mengusulkan perubahan pada protokol inti, di mana aplikasi terdesentralisasi berjalan di atasnya. Karena begitu banyak orang bergantung pada stabilitas Ethereum, ada ambang batas koordinasi yang sangat tinggi untuk perubahan inti, termasuk proses sosial dan teknis, untuk memastikan setiap perubahan pada Ethereum aman dan didukung secara luas oleh komunitas.

### Tata kelola onchain vs offchain {#onchain-vs-offchain}

Teknologi blockchain memungkinkan kemampuan tata kelola baru, yang dikenal sebagai tata kelola onchain. Tata kelola onchain adalah ketika usulan perubahan protokol diputuskan oleh pemungutan suara pemangku kepentingan, biasanya oleh pemegang token tata kelola, dan pemungutan suara terjadi di blockchain. Dengan beberapa bentuk tata kelola onchain, usulan perubahan protokol sudah ditulis dalam kode dan diimplementasikan secara otomatis jika pemangku kepentingan menyetujui perubahan tersebut melalui penandatanganan transaksi.

Pendekatan sebaliknya, tata kelola offchain, adalah di mana setiap keputusan perubahan protokol terjadi melalui proses diskusi sosial informal, yang, jika disetujui, akan diimplementasikan dalam kode.

**Tata kelola Ethereum terjadi secara offchain** dengan berbagai macam pemangku kepentingan yang terlibat dalam proses tersebut.

_Meskipun pada tingkat protokol tata kelola Ethereum bersifat offchain, banyak kasus penggunaan yang dibangun di atas Ethereum, seperti DAO, menggunakan tata kelola onchain._

<ButtonLink href="/dao/">
  Lebih lanjut tentang DAO
</ButtonLink>

<Divider />

## Siapa yang terlibat? {#who-is-involved}

Ada berbagai pemangku kepentingan di [komunitas Ethereum](/community/), masing-masing memainkan peran dalam proses tata kelola. Mulai dari pemangku kepentingan terjauh dari protokol dan memperbesarnya, kita memiliki:

- **Pemegang Ether**: orang-orang ini memegang sejumlah ETH. [Lebih lanjut tentang ETH](/what-is-ether/).
- **Pengguna Aplikasi**: orang-orang ini berinteraksi dengan aplikasi di blockchain Ethereum.
- **Pengembang Aplikasi/Peralatan**: orang-orang ini menulis aplikasi yang berjalan di blockchain Ethereum (misalnya, DeFi, NFT, dll.) atau membangun peralatan untuk berinteraksi dengan Ethereum (misalnya, dompet, rangkaian pengujian, dll.). [Lebih lanjut tentang dapps](/apps/).
- **Operator Node**: orang-orang ini menjalankan node yang menyebarkan blok dan transaksi, menolak setiap transaksi atau blok tidak valid yang mereka temui. [Lebih lanjut tentang node](/developers/docs/nodes-and-clients/).
- **Penulis EIP**: orang-orang ini mengusulkan perubahan pada protokol Ethereum, dalam bentuk proposal pengembangan ethereum (EIP). [Lebih lanjut tentang EIP](/eips/).
- **Validator**: orang-orang ini menjalankan node yang dapat menambahkan blok baru ke blockchain Ethereum.
- **Pengembang Protokol** (alias "Pengembang Inti"): orang-orang ini memelihara berbagai implementasi Ethereum (misalnya, go-ethereum, Nethermind, Besu, Erigon, Reth di lapisan eksekusi atau Prysm, Lighthouse, Nimbus, Teku, Lodestar, Grandine di lapisan konsensus). [Lebih lanjut tentang klien Ethereum](/developers/docs/nodes-and-clients/).

_Catatan: setiap individu dapat menjadi bagian dari beberapa kelompok ini (misalnya, pengembang protokol dapat memperjuangkan EIP, dan menjalankan validator beacon chain, serta menggunakan aplikasi DeFi). Namun, untuk kejelasan konseptual, paling mudah untuk membedakan di antara mereka._

<Divider />

## Apa itu EIP? {#what-is-an-eip}

Salah satu proses penting yang digunakan dalam tata kelola Ethereum adalah pengajuan **proposal pengembangan ethereum (EIP)**. EIP adalah standar yang menentukan potensi fitur atau proses baru untuk Ethereum. Siapa pun dalam komunitas Ethereum dapat membuat EIP. Jika Anda tertarik untuk menulis EIP atau berpartisipasi dalam tinjauan sejawat dan/atau tata kelola, lihat:

<ButtonLink href="/eips/">
  Lebih lanjut tentang EIP
</ButtonLink>

<Divider />

## Proses formal {#formal-process}

Proses formal untuk memperkenalkan perubahan pada protokol Ethereum adalah sebagai berikut:

1. **Mengusulkan EIP Inti**: seperti yang dijelaskan dalam [EIP-1](https://eips.ethereum.org/EIPS/eip-1#core-eips), langkah pertama untuk secara formal mengusulkan perubahan pada Ethereum adalah merincinya dalam EIP Inti. Ini akan bertindak sebagai spesifikasi resmi untuk EIP yang akan diimplementasikan oleh Pengembang Protokol jika diterima.

2. **Mempresentasikan EIP Anda kepada Pengembang Protokol**: setelah Anda memiliki EIP Inti yang telah mengumpulkan masukan komunitas, Anda harus mempresentasikannya kepada Pengembang Protokol. Anda dapat melakukannya dengan mengusulkannya untuk didiskusikan pada [panggilan AllCoreDevs](https://github.com/ethereum/execution-specs/tree/master/network-upgrades#getting-the-considered-for-inclusion-cfi-status). Kemungkinan beberapa diskusi telah terjadi secara asinkron di [forum Ethereum Magician](https://ethereum-magicians.org/) atau di [Discord R&D Ethereum](https://discord.gg/mncqtgVSVw).

> Potensi hasil dari tahap ini adalah:

> - EIP akan dipertimbangkan untuk peningkatan jaringan di masa mendatang
> - Perubahan teknis akan diminta
> - Mungkin ditolak jika bukan prioritas atau peningkatannya tidak cukup besar dibandingkan dengan upaya pengembangannya

3. **Iterasi menuju proposal akhir:** setelah menerima umpan balik dari semua pemangku kepentingan yang relevan, Anda kemungkinan perlu membuat perubahan pada proposal awal Anda untuk meningkatkan keamanannya atau lebih memenuhi kebutuhan berbagai pengguna. Setelah EIP Anda menggabungkan semua perubahan yang Anda yakini perlu, Anda harus mempresentasikannya lagi kepada Pengembang Protokol. Anda kemudian akan pindah ke langkah berikutnya dari proses ini, atau kekhawatiran baru akan muncul, yang membutuhkan putaran iterasi lain pada proposal Anda.

4. **EIP Disertakan dalam Peningkatan Jaringan**: dengan asumsi EIP disetujui, diuji, dan diimplementasikan, EIP tersebut dijadwalkan sebagai bagian dari peningkatan jaringan. Mengingat tingginya biaya koordinasi peningkatan jaringan (semua orang perlu meningkatkan secara bersamaan), EIP umumnya digabungkan bersama dalam peningkatan.

5. **Peningkatan Jaringan Diaktifkan**: setelah peningkatan jaringan diaktifkan, EIP akan ditayangkan di jaringan Ethereum. _Catatan: peningkatan jaringan biasanya diaktifkan di testnet sebelum diaktifkan di Mainnet Ethereum._

Alur ini, meskipun sangat disederhanakan, memberikan gambaran umum tentang tahapan signifikan agar perubahan protokol dapat diaktifkan di Ethereum. Sekarang, mari kita lihat faktor informal yang berperan selama proses ini.

## Proses informal {#informal-process}

### Memahami pekerjaan sebelumnya {#prior-work}

Pejuang EIP harus membiasakan diri dengan pekerjaan dan proposal sebelumnya sebelum membuat EIP yang dapat dipertimbangkan secara serius untuk diterapkan di Mainnet Ethereum. Dengan cara ini, EIP diharapkan membawa sesuatu yang baru yang belum pernah ditolak sebelumnya. Tiga tempat utama untuk meneliti ini adalah [repositori EIP](https://github.com/ethereum/EIPs), [Ethereum Magicians](https://ethereum-magicians.org/), dan [ethresear.ch](https://ethresear.ch/).

### Kelompok kerja {#working-groups}

Draf awal EIP tidak mungkin diimplementasikan di Mainnet Ethereum tanpa pengeditan atau perubahan. Umumnya, Pejuang EIP akan bekerja dengan sebagian Pengembang Protokol untuk menentukan, mengimplementasikan, menguji, mengulangi, dan menyelesaikan proposal mereka. Secara historis, kelompok kerja ini membutuhkan beberapa bulan (dan terkadang bertahun-tahun!) pekerjaan. Demikian pula, Pejuang EIP untuk perubahan tersebut harus melibatkan Pengembang Aplikasi/Peralatan yang relevan di awal upaya mereka untuk mengumpulkan umpan balik pengguna akhir dan memitigasi risiko penerapan apa pun.

### Konsensus komunitas {#community-consensus}

Meskipun beberapa EIP adalah peningkatan teknis langsung dengan nuansa minimal, beberapa lebih kompleks dan datang dengan pertukaran yang akan memengaruhi pemangku kepentingan yang berbeda dengan cara yang berbeda. Ini berarti beberapa EIP lebih kontroversial dalam komunitas daripada yang lain.

Tidak ada pedoman yang jelas tentang cara menangani proposal yang kontroversial. Ini adalah hasil dari desain desentralisasi Ethereum di mana tidak ada satu kelompok pemangku kepentingan pun yang dapat memaksa yang lain melalui kekerasan: pengembang protokol dapat memilih untuk tidak mengimplementasikan perubahan kode; operator node dapat memilih untuk tidak menjalankan klien Ethereum terbaru; tim aplikasi dan pengguna dapat memilih untuk tidak bertransaksi di rantai. Karena Pengembang Protokol tidak memiliki cara untuk memaksa orang mengadopsi peningkatan jaringan, mereka umumnya akan menghindari penerapan EIP di mana kontroversinya lebih besar daripada manfaatnya bagi komunitas yang lebih luas.

Pejuang EIP diharapkan untuk meminta umpan balik dari semua pemangku kepentingan yang relevan. Jika Anda mendapati diri Anda sebagai pejuang EIP yang kontroversial, Anda harus mencoba dan mengatasi keberatan untuk membangun konsensus di sekitar EIP Anda. Mengingat ukuran dan keragaman komunitas Ethereum, tidak ada metrik tunggal (misalnya, pemungutan suara koin) yang dapat digunakan untuk mengukur konsensus komunitas, dan Pejuang EIP diharapkan untuk beradaptasi dengan keadaan proposal mereka.

Di luar keamanan jaringan Ethereum, bobot yang signifikan secara historis telah ditempatkan oleh Pengembang Protokol pada apa yang dihargai oleh Pengembang Aplikasi/Peralatan dan Pengguna Aplikasi, mengingat penggunaan dan pengembangan mereka di Ethereum adalah apa yang membuat ekosistem menarik bagi pemangku kepentingan lainnya. Selain itu, EIP perlu diimplementasikan di semua implementasi klien, yang dikelola oleh tim yang berbeda. Bagian dari proses ini biasanya berarti meyakinkan beberapa tim Pengembang Protokol bahwa perubahan tertentu berharga dan membantu pengguna akhir atau memecahkan masalah keamanan.

<Divider />

## Menangani ketidaksepakatan {#disagreements}

Memiliki banyak pemangku kepentingan dengan motivasi dan keyakinan yang berbeda berarti ketidaksepakatan bukanlah hal yang aneh.

Umumnya, ketidaksepakatan ditangani dengan diskusi panjang di forum publik untuk memahami akar masalah dan memungkinkan siapa saja untuk mempertimbangkannya. Biasanya, satu kelompok mengalah, atau jalan tengah yang membahagiakan tercapai. Jika satu kelompok merasa cukup kuat, memaksakan perubahan tertentu dapat mengakibatkan pemisahan rantai. Pemisahan rantai adalah ketika beberapa pemangku kepentingan memprotes penerapan perubahan protokol yang mengakibatkan versi protokol yang berbeda dan tidak kompatibel beroperasi, dari mana dua blockchain yang berbeda muncul.

### Fork DAO {#dao-fork}

Fork adalah ketika peningkatan atau perubahan teknis besar perlu dilakukan pada jaringan dan mengubah "aturan" protokol. [Klien Ethereum](/developers/docs/nodes-and-clients/) harus memperbarui perangkat lunak mereka untuk mengimplementasikan aturan fork yang baru.

Fork DAO adalah respons terhadap [serangan DAO 2016](https://www.coindesk.com/learn/understanding-the-dao-attack) di mana kontrak [DAO](/glossary/#dao) yang tidak aman dikuras lebih dari 3,6 juta ETH dalam sebuah peretasan. Fork memindahkan dana dari kontrak yang salah ke kontrak baru yang memungkinkan siapa saja yang kehilangan dana dalam peretasan untuk memulihkannya.

Tindakan ini dipilih oleh komunitas Ethereum. Setiap pemegang ETH dapat memberikan suara melalui transaksi di [platform pemungutan suara](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). Keputusan untuk melakukan fork mencapai lebih dari 85% suara.

Penting untuk dicatat bahwa meskipun protokol melakukan fork untuk mengembalikan peretasan, bobot suara yang dibawa dalam memutuskan untuk melakukan fork dapat diperdebatkan karena beberapa alasan:

- Tingkat partisipasi untuk memilih sangat rendah
- Sebagian besar orang tidak tahu pemungutan suara sedang berlangsung
- Pemungutan suara hanya mewakili pemegang ETH, bukan peserta lain dalam sistem

Sebagian komunitas menolak untuk melakukan fork, sebagian besar karena mereka merasa insiden DAO bukanlah cacat dalam protokol. Mereka kemudian membentuk [Ethereum Classic](https://ethereumclassic.org/).

Saat ini, komunitas Ethereum telah mengadopsi kebijakan non-intervensi dalam kasus bug kontrak atau dana yang hilang untuk mempertahankan netralitas sistem yang kredibel.

Tonton lebih lanjut tentang peretasan DAO:

<YouTube id="rNeLuBOVe8A" />

<Divider />

### Kegunaan fork {#forking-utility}

Fork Ethereum/Ethereum Classic adalah contoh yang sangat baik dari fork yang sehat. Kami memiliki dua kelompok yang sangat tidak setuju satu sama lain pada beberapa nilai inti sehingga merasa sepadan dengan risiko yang terlibat untuk mengejar tindakan spesifik mereka.

Kemampuan untuk melakukan fork dalam menghadapi perbedaan politik, filosofis, atau ekonomi yang signifikan memainkan peran besar dalam keberhasilan tata kelola Ethereum. Tanpa kemampuan untuk melakukan fork, alternatifnya adalah pertikaian yang berkelanjutan, partisipasi enggan yang dipaksakan bagi mereka yang akhirnya membentuk Ethereum Classic, dan visi yang semakin berbeda tentang bagaimana kesuksesan Ethereum terlihat.

<Divider />

## Tata kelola beacon chain {#beacon-chain}

Proses tata kelola Ethereum sering kali menukar kecepatan dan efisiensi dengan keterbukaan dan inklusivitas. Untuk mempercepat pengembangan beacon chain, ia diluncurkan secara terpisah dari jaringan Ethereum proof-of-work dan mengikuti praktik tata kelolanya sendiri.

Meskipun spesifikasi dan implementasi pengembangan selalu sepenuhnya sumber terbuka, proses formal yang digunakan untuk mengusulkan pembaruan yang dijelaskan di atas tidak digunakan. Ini memungkinkan perubahan ditentukan dan disepakati lebih cepat oleh para peneliti dan pelaksana.

Ketika beacon chain bergabung dengan lapisan eksekusi Ethereum pada 15 September 2022, The Merge selesai sebagai bagian dari [peningkatan jaringan Paris](/ethereum-forks/#paris). Proposal [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675) diubah dari 'Panggilan Terakhir' menjadi 'Final', menyelesaikan transisi ke proof-of-stake.

<ButtonLink href="/roadmap/merge/">
  Lebih lanjut tentang The Merge
</ButtonLink>

<Divider />

## Bagaimana saya bisa terlibat? {#get-involved}

- [Mengusulkan EIP](/eips/#participate)
- [Mendiskusikan proposal saat ini](https://ethereum-magicians.org/)
- [Terlibat dalam diskusi R&D](https://ethresear.ch/)
- [Bergabung dengan discord R&D Ethereum](https://discord.gg/mncqtgVSVw)
- [Menjalankan node](/developers/docs/nodes-and-clients/run-a-node/)
- [Berkontribusi pada pengembangan klien](/developers/docs/nodes-and-clients/#execution-clients)
- [Program Magang Pengembang Inti](https://blog.ethereum.org/2021/09/06/core-dev-apprenticeship-second-cohort)

## Bacaan lebih lanjut {#further-reading}

Tata kelola di Ethereum tidak didefinisikan secara kaku. Berbagai peserta komunitas memiliki perspektif yang beragam tentang hal itu. Berikut adalah beberapa di antaranya:

- [Catatan tentang Tata Kelola Blockchain](https://vitalik.eth.limo/general/2017/12/17/voting.html) - _Vitalik Buterin_
- [Bagaimana Tata Kelola Ethereum bekerja?](https://cryptotesters.com/blog/ethereum-governance) – _Cryptotesters_
- [Bagaimana tata kelola Ethereum bekerja](https://medium.com/coinmonks/how-ethereum-governance-works-71856426b63a) – _Micah Zoltu_
- [Apa itu pengembang inti Ethereum?](https://hudsonjameson.com/posts/2020-06-22-what-is-an-ethereum-core-developer/) - _Hudson Jameson_
- [Tata Kelola, Bagian 2: Plutokrasi Masih Buruk](https://vitalik.eth.limo/general/2018/03/28/plutocracy.html) - _Vitalik Buterin_
- [Bergerak melampaui tata kelola pemungutan suara koin](https://vitalik.eth.limo/general/2021/08/16/voting3.html) - _Vitalik Buterin_
- [Memahami Tata Kelola Blockchain](https://web.archive.org/web/20250124192731/https://research.2077.xyz/understanding-blockchain-governance) - _2077 Research_
- [Pemerintah Ethereum](https://www.galaxy.com/insights/research/ethereum-governance/) - _Christine Kim_