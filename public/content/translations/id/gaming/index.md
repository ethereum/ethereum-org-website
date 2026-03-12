---
title: Bermain Game di Ethereum
lang: id
template: use-cases
image: /images/robot-help-bar.png
sidebarDepth: 2
summaryPoint1: Aturan dan status game dapat ditegakkan oleh blockchain Ethereum, bukan oleh server studio, yang merupakan manfaat utama dari game onchain
summaryPoint2: Siapa pun dapat membuat mod, bot, atau game yang sepenuhnya baru yang terhubung ke data onchain terbuka yang sama
summaryPoint3: L2 yang dibuat khusus memungkinkan permainan waktu nyata dengan biaya yang lebih rendah, sementara kerangka kerja pengembangan game membuat pembangunan game onchain lebih mudah diakses dari sebelumnya
buttons:
  - content: Pelajari selengkapnya
    toId: gaming-on-ethereum
  - content: Jelajahi game
    toId: games
    isSecondary: false
---

## Bermain Game di Ethereum {#gaming-on-ethereum}

Bermain game di Ethereum hadir dalam berbagai bentuk, mulai dari game yang menggunakan blockchain untuk fitur tertentu hingga game di mana seluruh dunia game berada di onchain. Blockchain Ethereum dapat digunakan dengan game dalam berbagai kapasitas. Game dapat menyimpan mata uangnya sebagai token yang dapat ditransfer atau aset dalam game lainnya (karakter, peralatan, hewan peliharaan, dll.) dalam bentuk [NFT (non-fungible token)](/nft/). Game juga dapat menggunakan kontrak pintar untuk menempatkan logika, aturan, dan statusnya di onchain. Game semacam itu biasanya disebut sebagai "game yang sepenuhnya onchain."

Ekosistem Ethereum juga mencakup [blockchain layer 2 (L2)](/layer-2/learn/) yang mewarisi jaminan keamanan mainnet Ethereum sambil memperluas skala Ethereum dan mendukung kasus penggunaan khusus. Jaringan L2 dapat memberikan manfaat tambahan untuk game onchain dan komunitasnya, karena L2 dapat menawarkan waktu konfirmasi yang lebih cepat, volume pemrosesan yang lebih tinggi, dan biaya yang lebih rendah, membuat permainan lebih cepat dan lebih mudah diakses.

## Tinjauan ekosistem game Ethereum {#ethereums-gaming-ecosystem-overview}

- **Layer 2:** Dengan biaya yang lebih murah dan waktu transaksi yang singkat, L2 menjadi tempat yang umum untuk peluncuran game. Layer 2 teratas dengan game meliputi: Starknet, Immutable, Base, dan Abstract.
- **Infrastruktur:** Untuk mempermudah pengembangan game onchain, sejumlah tumpukan alat tersedia yang dapat digunakan dengan proyek Anda sendiri, termasuk: Cartridge, Dojo, Proof of Play, dan Thirdweb.
- **Guild game:** Pemain yang ingin menjadi bagian dari komunitas game dapat bergabung dengan guild game untuk menyusun strategi dan berkolaborasi dengan pemain lain di guild tersebut. Guild terkemuka meliputi: YGG, WASD, LegacyGG, Gaming Grid, OLAGG, dan banyak lagi.
- **Game:** Game Ethereum hadir dalam berbagai bentuk dan ukuran, mencakup segalanya mulai dari strategi waktu nyata _Realms: Eternum_, MMO _Axie: Atia's Legacy_, RPG aksi _Fableborn_, dan bahkan platform DeFi yang digamifikasi seperti _Ponziland_. Dengan game-game baru yang diluncurkan secara berkala di berbagai rantai, selalu ada sesuatu yang baru untuk dijelajahi.

## Game untuk dicoba {#games}

<CategoryAppsGrid category="gaming" />

## Fitur game onchain {#features-of-onchain-games}

1. **Cara aman untuk menukar barang digital**

   Aset dalam game yang dapat diperdagangkan dapat dipertukarkan antar pemain dengan aset dalam game lain atau token di rantai tersebut. Game di masa lalu biasanya menghadapi tantangan untuk memfasilitasi perdagangan yang adil antar pemain, terutama untuk item yang langka dan berharga. Pasar pihak ketiga dan perdagangan peer-to-peer sering kali menyebabkan pemain disesatkan atau ditipu sehingga kehilangan harta berharga mereka. Karena aset onchain mengikuti struktur data yang sudah ada, aset tersebut dapat dengan mudah diintegrasikan dengan pasar yang ada, sehingga memberikan ketenangan pikiran kepada para pemain saat menukarkannya. Kemajuan dalam AMM juga memungkinkan pemain untuk langsung menukarkan item tertentu tanpa harus menunggu pihak lawan (pembeli/penjual) untuk menyelesaikan perdagangan mereka.

2. **Asal aset yang transparan**

   Barang palsu dan tiruan dari yang asli bisa menjadi masalah besar saat menilai barang, terutama jika orang tersebut tidak begitu paham cara membedakan barang asli dari yang palsu. Aset onchain selalu memiliki riwayat catatan lengkap tentang siapa (dompet mana) yang memilikinya dan alamat asalnya. Bahkan jika salinan sempurna dari item tersebut ada di onchain, item tersebut dapat dibedakan dengan jelas dari yang asli berdasarkan kontrak pintar asalnya, sehingga mengurangi risiko penipuan.

3. **Logika transparan**

   Game yang sepenuhnya onchain menggunakan kontrak pintar untuk fungsionalitasnya. Ini berarti siapa pun dapat meninjau dan memverifikasi logika game, memastikan game berjalan sesuai dengan yang diinginkan pengembang. Transparansi logika ini juga memungkinkan pengembang lain untuk membuat kontrak pintar baru yang dapat memperluas game atau diintegrasikan dengan beberapa fiturnya.

4. **Pencapaian yang dapat dibuktikan**

   Dalam game yang sepenuhnya onchain, setiap tindakan pemain dicatat di blockchain. Hal ini membuatnya sangat mudah untuk memeriksa dan memverifikasi apakah seorang pemain telah melakukan tindakan yang diperlukan untuk pencapaian/tonggak sejarah tertentu. Karena sifat blockchain yang tetap, catatan pencapaian tersebut akan tetap utuh selama rantai terus berjalan, dan dapat diverifikasi oleh pihak mana pun (bukan hanya pengembang, seperti yang biasa terlihat dalam game tradisional).

5. **Game selamanya**

   Pemain menginvestasikan banyak waktu dan upaya untuk membangun reputasi dan karakter dalam game mereka, tetapi kemajuan itu dapat dengan mudah hilang jika pengembang memutuskan untuk mematikan server (terutama jika itu adalah game online). Karena game yang sepenuhnya onchain menyimpan logika dan statusnya di onchain, pemain masih dapat berinteraksi dengan kontrak pintar game, bahkan jika pengembang utama game tersebut menghentikan pengembangannya. Game semacam itu masih bisa dimainkan dan terus menerima pembaruan dari komunitasnya karena logikanya masih berjalan di blockchain.

## Bagaimana game mengintegrasikan blockchain {#how-games-integrate-blockchains}

Pengembang game dapat memutuskan untuk memasukkan berbagai fitur Ethereum ke dalam game mereka. Hanya karena fitur-fitur itu ada, bukan berarti setiap game yang dibangun di atas Ethereum harus menggunakan semuanya, karena ada solusi alternatif (dengan pro dan kontranya masing-masing) yang dapat digunakan oleh para pengembang.

### Masuk dengan Ethereum {#sign-in-with-ethereum}

Pemain dapat menggunakan akun onchain mereka untuk masuk ke dalam game. Ini biasanya difasilitasi melalui penandatanganan transaksi dengan dompet web3 pemain. Pemain kemudian dapat menyimpan aset dalam game mereka dan membawa reputasi pemain mereka dalam satu akun, di semua game yang mereka masuki menggunakan dompet yang sama. [EVM](/developers/docs/evm/) Ethereum adalah standar yang umum digunakan di banyak blockchain, sehingga pemain sering kali dapat menggunakan akun yang sama untuk masuk ke game di blockchain apa pun yang kompatibel dengan EVM yang didukung oleh dompet (catatan: beberapa dompet web3 memerlukan impor RPC manual, terutama untuk blockchain yang lebih baru, sebelum dapat digunakan untuk melakukan apa pun di rantai itu).

### Fungible token {#fungible-tokens}

Sama seperti Ether, sumber daya dan mata uang dalam game yang dapat dipertukarkan dapat disimpan di onchain sebagai fungible token. Token tersebut kemudian dapat dikirim antar alamat dan digunakan dalam kontrak pintar, yang memungkinkan pemain untuk berdagang atau memberikan sumber daya dan mata uang dalam game di pasar terbuka.

### Non-fungible token {#non-fungible-tokens}

Non-fungible token (NFT) dapat mewakili elemen game yang unik, seperti karakter, item, tanah, atau bahkan status tersimpan. Dengan metadata dinamis, NFT dapat berevolusi sebagai respons terhadap peristiwa dalam game, memungkinkan aset untuk membawa riwayat dari waktu ke waktu. Sebagai contoh, Beast NFT di Loot Survivor secara permanen mencatat ketika seorang pemain tertentu mengalahkan makhluk unik, menanamkan hasil tersebut ke dalam aset NFT itu sendiri. Desain semacam ini mengarah pada game di mana aset bersifat persisten, stateful, dan berpotensi dapat digunakan di berbagai pengalaman onchain, bukan sebagai barang koleksi statis.

### Kontrak Pintar {#smart-contracts}

Game yang sepenuhnya onchain menggunakan kontrak pintar untuk menciptakan logika game yang transparan dan tetap. Dalam kasus seperti itu, blockchain berfungsi sebagai backend game, menggantikan kebutuhan untuk menempatkan logika dan penyimpanan datanya di server terpusat. (Catatan: tidak semua game web3 adalah game yang sepenuhnya onchain. Seperti yang telah disebutkan sebelumnya, tergantung pada kasus per kasus berapa banyak data dan logika game yang disimpan di onchain, dibandingkan dengan di lapisan ketersediaan data lain atau di server klasik.)

## Evolusi peningkatan UX pemain {#evolution-of-player-ux-improvements}

### Interoperabilitas dan permainan lintas rantai {#interoperability-and-cross-chain-play}

Kemajuan dalam interaksi lintas rantai dan penjembatanan memungkinkan pemain untuk mengakses game di Ethereum dengan lebih mulus dari sebelumnya. Game dapat diterapkan di beberapa blockchain, dan aset onchain satu game dapat diintegrasikan oleh game lain. Di masa lalu, pemain biasanya diharuskan untuk menjembatani dana mereka ke rantai lain sebelum mereka dapat mulai menggunakannya di dalam game. Saat ini, game biasanya mengintegrasikan jembatan token ke rantai lain untuk mempermudah orientasi pemain.

### Skalabilitas dan peningkatan biaya gas {#scalability-and-gas-fee-improvements}

Pada tahun 2017, kegilaan seputar CryptoKitties secara dramatis meningkatkan biaya gas untuk semua pengguna yang bertransaksi di Ethereum. Sejak saat itu, banyak proposal pengembangan ethereum telah berhasil diterapkan dalam peningkatan jaringan, meningkatkan bandwidth Mainnet Ethereum dan secara signifikan mengurangi biaya transaksi rata-rata. Layer 2 lebih lanjut memperluas throughput yang tersedia, mengurangi biaya transaksi hingga sen atau bahkan lebih rendah. Biaya yang lebih rendah dan throughput yang lebih tinggi telah memperluas kasus penggunaan game yang dapat dibangun di Ethereum, mendukung tindakan volume tinggi dan transaksi mikro dalam game yang tidak membuat pemain biasa terbebani biaya.

### Login sosial {#social-logins}

Masuk dengan akun Ethereum onchain, yang dapat digunakan di semua blockchain yang kompatibel dengan EVM, adalah salah satu metode autentikasi yang paling umum. Beberapa rantai non-EVM juga menggunakannya sebagai opsi untuk membuat akun. Namun, jika pemain baru tidak memiliki akun Ethereum yang ada dan ingin dengan mudah membuat akun untuk masuk ke game, [abstraksi akun](/roadmap/account-abstraction/) memungkinkan mereka untuk masuk dengan akun sosial mereka dan membuat akun Ethereum di latar belakang.

### Paymaster dan kunci sesi {#paymaster-and-session-keys}

Membayar biaya gas untuk mengirim transaksi onchain atau berinteraksi dengan kontrak pintar dapat menjadi titik gesekan yang signifikan bagi banyak pemain baru. Akun paymaster dapat didanai oleh pemain atau disubsidi oleh game. Kunci sesi memungkinkan pemain untuk tetap masuk ke dalam game selama seluruh durasi sesi mereka, mengharuskan mereka untuk menandatangani hanya pesan pertama dari sesi mereka, dengan pesan berikutnya ditandatangani di latar belakang.

Ada filosofi yang kontras seputar mekanisme ini. Contoh utamanya adalah Kamigotchi dari Initia, yang memperlakukan gas yang dibayar pemain sebagai pendapatan langsung. Sebaliknya, ekosistem game Realms.World, yang mencakup 4+ game live yang sepenuhnya onchain di Starknet, mengambil pendekatan sebaliknya. Semua game di ekosistem menggunakan Cartridge Paymaster, yang memungkinkan pemain untuk berinteraksi dengan game tanpa biaya gas. Jika Kamigotchi merangkul biaya gas sebagai bagian dari desain ekonomi, game Realms.World memandang biaya gas terutama sebagai hambatan bagi pengalaman pemain.

## Mulai bermain game di Ethereum {#get-started-with-gaming-on-ethereum}

1. **Temukan game yang seru untuk dimainkan** - Jelajahi game yang tercantum di atas atau jelajahi platform seperti [ChainPlay](https://chainplay.gg/chain/ethereum/), [Gam3s.GG](https://gam3s.gg/), dan [DappRadar](https://dappradar.com/rankings/protocol/ethereum/category/games).
2. **Siapkan dompet kripto Anda** - Anda akan memerlukan dompet untuk mengelola aset digital dalam game Anda dan (dalam beberapa kasus) untuk masuk ke game. [Pilih dompet di sini](/wallets/find-wallet/).
3. **Danai dompet Anda** - Dapatkan beberapa Ether (ETH) atau token yang relevan dengan jaringan layer 2 yang Anda rencanakan untuk digunakan.
4. **Mainkan** - Mulai bermain dan nikmati kepemilikan sejati atas kemajuan dalam game Anda.
