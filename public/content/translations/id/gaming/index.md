---
title: Gaming di Ethereum
lang: id
template: use-cases
image: /images/robot-help-bar.png
sidebarDepth: 2
summaryPoint1: Aturan dan status game dapat ditegakkan oleh blockchain Ethereum, bukan server studio, yang merupakan manfaat utama dari game onchain
summaryPoint2: Siapa pun dapat membangun mod, bot, atau game yang sama sekali baru yang terhubung ke data onchain terbuka yang sama
summaryPoint3: L2 yang dibangun khusus memungkinkan gameplay waktu nyata dengan biaya yang lebih rendah, sementara kerangka kerja pengembangan game membuat pembuatan game onchain menjadi lebih mudah diakses dari sebelumnya
buttons:
  - content: Pelajari lebih lanjut
    toId: gaming-on-ethereum
  - content: Jelajahi game
    toId: games
    isSecondary: false
---

## Gaming di Ethereum {#gaming-on-ethereum}

Gaming di Ethereum hadir dalam berbagai bentuk, mulai dari game yang menggunakan blockchain untuk fitur tertentu hingga game di mana seluruh dunia game berada onchain. Blockchain Ethereum dapat digunakan dengan game dalam berbagai kapasitas. Game dapat menyimpan mata uang mereka sebagai token yang dapat ditransfer atau aset dalam game lainnya (karakter, peralatan, hewan peliharaan, dll.) dalam bentuk [NFT (non-fungible token)](/nft/). Game juga dapat memanfaatkan kontrak pintar untuk meng-host logika, aturan, dan status mereka secara onchain. Game semacam itu umumnya disebut sebagai "game onchain sepenuhnya."

Ekosistem Ethereum juga mencakup [blockchain layer 2 (L2)](/layer-2/learn/) yang mewarisi jaminan keamanan dari mainnet Ethereum sambil memperluas skala Ethereum dan mendukung kasus penggunaan khusus. Jaringan L2 dapat memberikan manfaat tambahan untuk game onchain dan komunitasnya, karena L2 dapat menawarkan waktu konfirmasi yang lebih cepat, volume pemrosesan yang lebih tinggi, dan biaya yang lebih rendah, membuat gameplay menjadi lebih cepat dan lebih mudah diakses.

## Gambaran umum ekosistem gaming Ethereum {#ethereums-gaming-ecosystem-overview}

- **Layer 2:** Dengan biaya yang lebih murah dan waktu transaksi yang singkat, L2 menjadi tempat yang umum bagi game untuk diluncurkan. Layer 2 teratas dengan game meliputi: Starknet, Immutable, Base, dan Abstract.
- **Infrastruktur:** Untuk mempermudah pengembangan game onchain, terdapat sejumlah tumpukan alat yang dapat digunakan dengan proyek Anda sendiri, termasuk: Cartridge, Dojo, Proof of Play, dan Thirdweb.
- **Guild gaming:** Pemain yang ingin menjadi bagian dari komunitas gaming dapat bergabung dengan guild gaming untuk menyusun strategi dan berkolaborasi dengan pemain lain di dalam guild. Guild terkemuka meliputi: YGG, WASD, LegacyGG, Gaming Grid, OLAGG, dan banyak lagi.
- **Game:** Game Ethereum hadir dalam berbagai bentuk dan ukuran, mencakup segalanya mulai dari strategi waktu nyata _Realms: Eternum_, hingga MMO _Axie: Atia's Legacy_, RPG aksi _Fableborn_, dan bahkan platform DeFi yang digamifikasi seperti _Ponziland_. Dengan game baru yang diluncurkan secara teratur di berbagai chain, selalu ada sesuatu yang segar untuk dijelajahi.

## Game untuk dicoba {#games}

<CategoryAppsGrid category="gaming" />

## Fitur game onchain {#features-of-onchain-games}

1. **Cara aman untuk menukar barang digital**

   Aset dalam game yang dapat diperdagangkan dapat ditukar antar pemain dengan aset dalam game lainnya atau token di chain tersebut. Game di masa lalu umumnya menghadapi tantangan dalam memfasilitasi perdagangan yang adil antar pemain, terutama untuk item yang langka dan berharga. Pasar pihak ketiga dan perdagangan peer-to-peer sering kali menyebabkan pemain disesatkan atau ditipu sehingga kehilangan barang berharga mereka. Karena aset onchain mengikuti struktur data yang mapan, aset tersebut dapat dengan mudah diintegrasikan dengan pasar yang ada, memberikan ketenangan pikiran bagi pemain saat menukarnya. Kemajuan dalam AMM juga memungkinkan pemain untuk secara instan memperdagangkan item tertentu tanpa harus menunggu pihak lawan (pembeli/penjual) untuk menyelesaikan perdagangan mereka.

2. **Asal usul aset yang transparan**

   Barang palsu dan salinan dari aslinya dapat menjadi masalah yang cukup besar saat menilai item, terutama jika orang tersebut tidak terlalu familier dengan cara membedakan item asli dari yang palsu. Aset onchain selalu memiliki riwayat catatan lengkap tentang siapa (dompet mana) yang memilikinya dan alamat asalnya. Bahkan jika salinan sempurna dari item tersebut ada secara onchain, salinan tersebut dapat dibedakan dengan jelas dari aslinya berdasarkan kontrak pintar asalnya, sehingga memitigasi risiko penipuan.

3. **Logika yang transparan**

   Game onchain sepenuhnya menggunakan kontrak pintar untuk fungsionalitasnya. Ini berarti siapa pun dapat meninjau dan memverifikasi logika game, memastikan game berjalan sesuai dengan yang diinginkan oleh pengembang. Transparansi logika ini juga memungkinkan pengembang lain untuk membuat kontrak pintar baru yang dapat memperluas game atau diintegrasikan dengan beberapa fiturnya.

4. **Pencapaian yang dapat dibuktikan**

   Dalam game onchain sepenuhnya, setiap tindakan pemain dicatat di blockchain. Hal ini membuatnya sangat mudah untuk memeriksa dan memverifikasi apakah seorang pemain melakukan tindakan yang diperlukan untuk tonggak/pencapaian tertentu. Karena sifat blockchain yang tetap, catatan pencapaian tersebut akan tetap utuh selama chain terus berjalan, dan dapat diverifikasi oleh pihak mana pun (bukan hanya pengembang, seperti yang biasa terlihat dalam gaming tradisional).

5. **Game selamanya**

   Pemain menginvestasikan banyak waktu dan upaya untuk membangun reputasi dan karakter dalam game mereka, tetapi kemajuan itu dapat dengan mudah hilang jika pengembang memutuskan untuk mematikan server (terutama jika itu adalah game online). Karena game onchain sepenuhnya menyimpan logika dan status mereka secara onchain, pemain masih dapat berinteraksi dengan kontrak pintar game, bahkan jika pengembang utama game menghentikan pengembangan. Game semacam itu masih dapat dimainkan dan terus menerima pembaruan dari komunitasnya karena logikanya masih berjalan di blockchain.

## Bagaimana game mengintegrasikan blockchain {#how-games-integrate-blockchains}

Pengembang game dapat memutuskan untuk menggabungkan berbagai fitur Ethereum ke dalam game mereka. Hanya karena fitur tersebut ada bukan berarti setiap game yang dibangun di Ethereum perlu menggunakan semuanya, karena ada solusi alternatif (dengan pro dan kontranya masing-masing) yang dapat digunakan oleh pengembang sebagai gantinya.

### Masuk (Sign-in) dengan Ethereum {#sign-in-with-ethereum}

Pemain dapat menggunakan akun onchain mereka untuk masuk ke dalam game. Ini biasanya difasilitasi melalui penandatanganan transaksi dengan dompet web3 pemain. Pemain kemudian dapat menyimpan aset dalam game mereka dan membawa reputasi pemain mereka dalam satu akun, di seluruh game apa pun yang mereka masuki menggunakan dompet yang sama. [EVM](/developers/docs/evm/) Ethereum adalah standar yang umum digunakan di banyak blockchain, sehingga seorang pemain sering kali dapat menggunakan akun yang sama untuk masuk ke game di blockchain apa pun yang kompatibel dengan EVM yang didukung oleh dompet tersebut (catatan: beberapa dompet web3 memerlukan impor RPC manual, terutama untuk blockchain yang lebih baru, sebelum dapat digunakan untuk melakukan apa pun di chain tersebut).

### Token yang sepadan (Fungible token) {#fungible-tokens}

Sama seperti Ether, sumber daya dan mata uang dalam game yang sepadan dapat disimpan secara onchain sebagai token yang sepadan. Token tersebut kemudian dapat dikirim antar alamat dan digunakan dalam kontrak pintar, memungkinkan pemain untuk memperdagangkan atau menghadiahkan sumber daya dan mata uang dalam game di pasar terbuka.

### Non-fungible token {#non-fungible-tokens}

Non-fungible token (NFT) dapat mewakili elemen game yang unik, seperti karakter, item, tanah, atau bahkan status penyimpanan. Dengan metadata dinamis, NFT dapat berevolusi sebagai respons terhadap peristiwa dalam game, memungkinkan aset untuk membawa riwayat dari waktu ke waktu. Misalnya, NFT Beast di Loot Survivor secara permanen mencatat kapan pemain tertentu mengalahkan makhluk unik, menyematkan hasil tersebut ke dalam aset NFT itu sendiri. Desain semacam ini mengarah pada game di mana aset bersifat persisten, memiliki status (stateful), dan berpotensi dapat digunakan di berbagai pengalaman onchain, alih-alih sekadar barang koleksi statis.

### Kontrak pintar {#smart-contracts}

Game onchain sepenuhnya menggunakan kontrak pintar untuk membuat logika game yang transparan dan tetap. Dalam kasus seperti itu, blockchain berfungsi sebagai backend game, menggantikan kebutuhan untuk meng-host logika dan penyimpanan datanya di server terpusat. (Catatan: tidak semua game web3 adalah game onchain sepenuhnya. Seperti yang disebutkan sebelumnya, ini bergantung pada kasus per kasus seberapa banyak data dan logika game yang disimpan secara onchain, dibandingkan dengan lapisan ketersediaan data lain atau di server klasik.)

## Evolusi peningkatan UX pemain {#evolution-of-player-ux-improvements}

### Interoperabilitas dan permainan lintas-chain {#interoperability-and-cross-chain-play}

Kemajuan dalam interaksi lintas-chain dan penjembatanan (bridging) memungkinkan pemain untuk mengakses game di Ethereum dengan lebih mulus dari sebelumnya. Game dapat diterapkan di berbagai blockchain, dan aset onchain dari satu game dapat diintegrasikan oleh game lain. Di masa lalu, pemain biasanya diharuskan untuk menjembatani dana mereka ke chain lain sebelum mereka dapat mulai menggunakannya di dalam game. Saat ini, game umumnya mengintegrasikan jembatan token ke chain lain untuk mempermudah orientasi pemain.

### Peningkatan skalabilitas dan biaya gas {#scalability-and-gas-fee-improvements}

Pada tahun 2017, kegilaan seputar CryptoKitties secara dramatis meningkatkan biaya gas untuk semua pengguna yang bertransaksi di Ethereum. Sejak saat itu, banyak proposal pengembangan ethereum telah berhasil diterapkan dalam peningkatan jaringan, meningkatkan bandwidth Mainnet Ethereum dan secara signifikan mengurangi rata-rata biaya transaksi. Layer 2 semakin memperluas throughput yang tersedia, mengurangi biaya transaksi menjadi beberapa sen atau bahkan lebih rendah. Biaya yang lebih rendah dan throughput yang lebih tinggi telah memperluas kasus penggunaan gaming yang dapat dibangun di Ethereum, mendukung tindakan bervolume tinggi dan transaksi mikro dalam game yang tidak membebani pemain sehari-hari.

### Login sosial {#social-logins}

Masuk dengan akun Ethereum onchain, yang dapat digunakan di semua blockchain yang kompatibel dengan EVM, adalah salah satu metode autentikasi yang paling umum. Beberapa chain non-EVM juga menggunakannya sebagai opsi untuk membuat akun. Namun, jika pemain baru tidak memiliki akun Ethereum yang ada dan ingin dengan mudah membuat akun untuk masuk ke dalam game, [abstraksi akun](/roadmap/account-abstraction/) memungkinkan mereka untuk masuk dengan akun sosial mereka dan membuat akun Ethereum di latar belakang.

### Paymaster dan kunci sesi {#paymaster-and-session-keys}

Membayar biaya gas untuk mengirim transaksi secara onchain atau berinteraksi dengan kontrak pintar dapat menjadi titik gesekan yang signifikan bagi banyak pemain baru. Akun Paymaster dapat didanai oleh pemain atau disubsidi oleh game. Kunci sesi memungkinkan pemain untuk tetap masuk ke dalam game selama durasi penuh sesi mereka, mengharuskan mereka untuk menandatangani hanya pesan pertama dari sesi mereka, dengan pesan berikutnya ditandatangani di latar belakang.

Ada filosofi yang kontras seputar mekanika ini. Contoh terkemuka adalah Kamigotchi dari Initia, yang memperlakukan gas yang dibayar pemain sebagai pendapatan langsung. Sebaliknya, ekosistem game Realms.World, yang mencakup 4+ game onchain sepenuhnya yang aktif di Starknet, mengambil pendekatan yang berlawanan. Semua game dalam ekosistem menggunakan Cartridge Paymaster, memungkinkan pemain untuk berinteraksi dengan game tanpa biaya gas. Di mana Kamigotchi merangkul biaya gas sebagai bagian dari desain ekonomi, game Realms.World memandang biaya gas terutama sebagai hambatan bagi pengalaman pemain.

## Mulai bermain game di Ethereum {#get-started-with-gaming-on-ethereum}

1. **Temukan game yang menyenangkan untuk dimainkan** - Telusuri game yang tercantum di atas atau jelajahi platform seperti [ChainPlay](https://chainplay.gg/chain/ethereum/), [Gam3s.GG](https://gam3s.gg/), dan [DappRadar](https://dappradar.com/rankings/protocol/ethereum/category/games)
2. **Siapkan dompet kripto Anda** - Anda akan memerlukan dompet untuk mengelola aset digital dalam game Anda dan (dalam beberapa kasus) untuk masuk ke dalam game. [Pilih dompet di sini](/wallets/find-wallet/)
3. **Danai dompet Anda** - Dapatkan beberapa Ether (ETH) atau token yang relevan dengan jaringan layer 2 yang Anda rencanakan untuk digunakan
4. **Mainkan** - Mulai bermain dan nikmati kepemilikan sejati atas kemajuan dalam game Anda