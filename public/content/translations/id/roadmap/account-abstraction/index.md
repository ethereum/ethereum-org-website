---
title: Abstraksi akun
description: Ikhtisar rencana Ethereum untuk membuat akun pengguna menjadi lebih sederhana dan aman
lang: id
summaryPoints:
  - Abstraksi akun memudahkan untuk membuat dompet kontrak pintar
  - Dompet kontrak pintar memudahkan untuk mengelola akses ke akun Ethereum
  - Kunci yang hilang dan terbuka dapat dipulihkan dengan menggunakan beberapa cadangan
---

# Abstraksi akun {#account-abstraction}

Pengguna berinteraksi dengan Ethereum menggunakan **[akun yang dimiliki secara eksternal (EOA)](/glossary/#eoa)**. Ini adalah satu-satunya cara untuk memulai transaksi atau mengeksekusi kontrak pintar. Hal ini membatasi bagaimana pengguna dapat berinteraksi dengan Ethereum. Misalnya, menyulitkan untuk melakukan banyak transaksi dan mengharuskan pengguna untuk selalu menjaga saldo ETH untuk menutupi gas.

Abstraksi akun adalah cara untuk mengatasi masalah ini dengan memungkinkan pengguna secara fleksibel memprogram lebih banyak keamanan dan pengalaman pengguna yang lebih baik ke dalam akun mereka. Hal ini dapat terjadi dengan [memperbarui EOA](https://eips.ethereum.org/EIPS/eip-3074) sehingga dapat dikontrol oleh kontrak pintar, atau dengan [memperbarui kontrak pintar](https://eips.ethereum.org/EIPS/eip-2938) agar dapat memulai transaksi. Kedua opsi ini membutuhkan perubahan pada protokol Ethereum. Ada juga jalur ketiga yang melibatkan penambahan [sistem transaksi kedua yang terpisah](https://eips.ethereum.org/EIPS/eip-4337) untuk berjalan secara paralel dengan protokol yang ada. Terlepas dari rutenya, hasilnya adalah akses ke Ethereum melalui dompet kontrak pintar, baik yang didukung secara native sebagai bagian dari protokol yang ada atau melalui jaringan transaksi tambahan.

Dompet kontrak pintar membuka banyak manfaat bagi pengguna, termasuk:

- menentukan aturan keamanan fleksibel Anda sendiri
- memulihkan akun Anda jika Anda kehilangan kunci
- berbagi keamanan akun Anda di seluruh perangkat atau individu tepercaya
- membayar gas orang lain, atau meminta orang lain membayar gas Anda
- transaksi batch secara bersamaan (mis. menyetujui dan mengeksekusi pertukaran sekaligus)
- lebih banyak kesempatan bagi dapps dan pengembang dompet untuk berinovasi pada pengalaman pengguna

Manfaat ini tidak didukung secara native saat ini karena hanya akun yang dimiliki secara eksternal ([EOA](/glossary/#eoa)) yang dapat memulai transaksi. EOA secara sederhana adalah pasangan kunci publik-pribadi. Cara kerjanya seperti ini:

- jika Anda memiliki kunci pribadi, Anda dapat melakukan _apa saja_ sesuai dengan aturan Mesin Virtual Ethereum (EVM)
- jika Anda tidak memiliki kunci pribadi, Anda _tidak dapat melakukan apa-apa_.

Jika Anda kehilangan kunci, kunci tersebut tidak dapat dipulihkan, dan kunci yang dicuri memberi pencuri akses instan ke semua dana dalam akun.

Dompet kontrak pintar adalah solusi untuk masalah ini, tetapi saat ini sulit untuk diprogram karena pada akhirnya logika apa pun yang diterapkan harus diterjemahkan ke dalam satu set transaksi EOA sebelum dapat diproses oleh Ethereum. Abstraksi akun memungkinkan kontrak pintar untuk memulai transaksi sendiri, sehingga logika apa pun yang ingin diimplementasikan oleh pengguna dapat dikodekan ke dalam dompet kontrak pintar itu sendiri dan dieksekusi di Ethereum.

Pada akhirnya, abstraksi akun meningkatkan dukungan untuk dompet kontrak pintar, membuatnya lebih mudah dibuat dan lebih aman digunakan. Pada akhirnya, dengan abstraksi akun, pengguna dapat menikmati semua manfaat Ethereum tanpa harus mengetahui atau peduli dengan teknologi yang mendasarinya.

## Di luar frasa benih {#beyond-seed-phrases}

Akun-akun saat ini diamankan menggunakan kunci pribadi yang dihitung dari frasa benih. Setiap orang yang memiliki akses ke frase benih dapat dengan mudah menemukan kunci pribadi yang melindungi sebuah akun dan mendapatkan akses ke semua aset yang dilindunginya. Jika kunci pribadi dan frase benih hilang, maka tidak akan pernah bisa dipulihkan dan aset yang dikontrolnya akan dibekukan selamanya. Mengamankan frase benih ini sangat sulit, bahkan bagi pengguna yang sudah ahli sekalipun, dan phishing frasa benih merupakan salah satu cara yang paling umum dilakukan untuk menipu para pengguna.

Abstraksi akun akan menyelesaikan masalah ini dengan menggunakan kontrak pintar untuk menyimpan aset dan mengesahkan transaksi. Kontrak pintar ini kemudian dapat didekorasi dengan logika khusus untuk membuatnya seaman mungkin dan disesuaikan dengan pengguna. Pada akhirnya, Anda masih menggunakan kunci pribadi untuk mengontrol akses ke akun Anda, tetapi dengan jaring pengaman yang membuatnya lebih mudah dan aman untuk dikelola.

Sebagai contoh, kunci cadangan dapat ditambahkan ke dompet sehingga jika Anda kehilangan atau secara tidak sengaja mengekspos kunci utama Anda, kunci tersebut dapat diganti dengan kunci baru yang aman dengan izin dari kunci cadangan. Anda bisa mengamankan setiap kunci ini dengan cara yang berbeda, atau membaginya ke beberapa penjaga yang tepercaya. Hal ini membuat pencuri lebih sulit mendapatkan kendali penuh atas dana Anda. Sama halnya, Anda dapat menambahkan peraturan pada dompet untuk mengurangi dampak jika kunci utama Anda diretas, sebagai contoh, Anda dapat mengizinkan transaksi bernilai rendah untuk diverifikasi dengan satu tanda tangan, sedangkan transaksi bernilai lebih tinggi membutuhkan persetujuan dari beberapa penanda tangan yang terautentikasi. Ada beberapa cara lain dompet kontrak pintar dapat membantu Anda untuk menggagalkan pencurian, contohnya adalah daftar putih yang dapat digunakan untuk memblokir setiap transaksi kecuali jika transaksi tersebut ditujukan kepada alamat yang terpercaya atau diverifikasi oleh beberapa kunci yang telah Anda setujui sebelumnya.

### Contoh logika keamanan yang dapat dibangun ke dalam dompet kontrak pintar:

- **Otorisasi multisig**: Anda dapat berbagi kredensial otorisasi di beberapa orang atau perangkat tepercaya. Kemudian kontrak dapat dikonfigurasikan sehingga transaksi yang melebihi nilai yang telah ditetapkan memerlukan otorisasi dari proporsi tertentu (mis. 3/5) dari pihak-pihak tepercaya. Sebagai contoh, transaksi bernilai tinggi mungkin memerlukan persetujuan dari perangkat seluler dan dompet perangkat keras, atau tanda tangan dari akun yang didistribusikan ke anggota keluarga tepercaya.
- **Pembekuan akun**: Jika perangkat hilang atau disusupi, akun dapat dikunci dari perangkat lain yang sah, untuk melindungi aset pengguna.
- **Pemulihan akun**: Kehilangan perangkat atau lupa kata sandi? Dalam paradigma saat ini, ini berarti aset Anda bisa dibekukan selamanya. Dengan dompet kontrak pintar, Anda dapat mengatur beberapa akun yang telah disetujui sebelumnya yang dapat mengizinkan perangkat baru dan mengatur ulang akses.
- **Tetapkan batas transaksi**: Tentukan ambang batas harian berapa banyak nilai yang dapat ditransfer dari akun dalam satu hari/minggu/bulan. Ini berarti jika penyerang mendapatkan akses ke akun Anda, mereka tidak dapat menguras semuanya sekaligus dan Anda memiliki kesempatan untuk membekukan dan mengatur ulang akses.
- **Buat daftar putih**: Hanya mengizinkan transaksi ke alamat tertentu yang Anda ketahui aman. Ini berarti bahwa _meskipun_ kunci pribadi Anda dicuri, penyerang tidak dapat mengirimkan dana ke akun tujuan yang tidak masuk dalam daftar putih. Daftar putih ini akan membutuhkan beberapa tanda tangan untuk mengubahnya sehingga penyerang tidak dapat menambahkan alamat mereka sendiri ke dalam daftar kecuali mereka memiliki akses ke beberapa kunci cadangan Anda.

## Pengalaman pengguna yang lebih baik {#better-user-experience}

Abstraksi akun memungkinkan pengalaman **pengguna yang lebih baik secara keseluruhan** serta **peningkatan keamanan** karena menambahkan dukungan untuk dompet kontrak pintar di tingkat protokol. Alasan yang paling penting untuk hal ini adalah akan memberi pengembang kontrak pintar, dompet, dan aplikasi lebih banyak kebebasan untuk berinovasi pada pengalaman pengguna dengan cara yang mungkin belum dapat kita antisipasi. Beberapa peningkatan nyata yang akan datang bersama dengan abstraksi akun termasuk penggabungan transaksi untuk kecepatan dan efisiensi. Sebagai contoh, pertukaran sederhana seharusnya merupakan operasi sekali klik, tetapi saat ini memerlukan penandatanganan beberapa transaksi untuk menyetujui pengeluaran token individu sebelum pertukaran dieksekusi. Abstraksi akun menghilangkan gesekan tersebut dengan mengizinkan penggabungan transaksi. Selain itu, transaksi yang digabungkan dapat menyetujui dengan tepat nilai token yang tepat yang diperlukan untuk setiap transaksi dan kemudian mencabut persetujuan setelah transaksi selesai, memberikan keamanan tambahan.

Manajemen gas juga jauh lebih baik dengan adanya abstraksi akun. Aplikasi tidak hanya dapat menawarkan untuk membayar biaya gas penggunanya, tetapi biaya gas dapat dibayar dengan token selain ETH, membebaskan pengguna dari keharusan untuk mempertahankan saldo ETH untuk mendanai transaksi. Ini akan bekerja dengan menukar token pengguna dengan ETH di dalam kontrak dan kemudian menggunakan ETH untuk membayar gas.

<ExpandableCard title="Bagaimana abstraksi akun dapat membantu dalam hal gas?" eventCategory="/roadmap/account-abstraction" eventName="clicked how can account abstraction help with gas?">

Manajemen gas adalah salah satu gesekan utama bagi pengguna Ethereum, terutama karena ETH adalah satu-satunya aset yang dapat digunakan untuk membayar transaksi. Bayangkan Anda memiliki dompet dengan saldo USDC, tetapi tidak memiliki ETH. Anda tidak dapat memindahkan atau menukar token USDC tersebut karena Anda tidak dapat membayar gas. Anda juga tidak dapat menukar USDC dengan ETH, karena itu sendiri membutuhkan gas. Anda harus mengirim lebih banyak ETH ke akun Anda dari bursa atau alamat lain untuk menyelesaikan masalah. Dengan dompet kontrak pintar, Anda cukup membayar gas dalam USDC, sehingga membebaskan akun Anda. Anda tidak perlu lagi menyimpan saldo ETH di semua akun Anda.

Abstraksi akun juga memungkinkan pengembang dapp untuk berkreasi dengan manajemen gas. Sebagai contoh, Anda mungkin dapat mulai membayar DEX favorit Anda dengan biaya tetap setiap bulan untuk transaksi tanpa batas. Dapps mungkin menawarkan untuk membayar semua biaya gas Anda atas nama Anda sebagai imbalan karena telah menggunakan platform mereka, atau sebagai penawaran orientasi. Akan lebih mudah bagi pengembang untuk berinovasi pada gas ketika dompet kontrak pintar didukung di tingkat protokol.

</ExpandableCard>

Sesi tepercaya juga berpotensi mengubah pengalaman pengguna, terutama untuk aplikasi seperti game, di mana sejumlah besar transaksi kecil mungkin memerlukan persetujuan dalam waktu singkat. Menyetujui setiap transaksi secara individual akan merusak pengalaman bermain game, tetapi persetujuan permanen tidak aman. Dompet kontrak pintar dapat menyetujui transaksi tertentu untuk waktu tertentu, hingga nilai tertentu atau hanya ke alamat tertentu.

Menarik juga untuk mempertimbangkan bagaimana pembelian dapat berubah dengan abstraksi akun. Saat ini, setiap transaksi harus disetujui dan dieksekusi dari dompet yang sudah didanai sebelumnya dengan jumlah token yang tepat. Dengan abstraksi akun, pengalamannya bisa lebih mirip dengan belanja daring yang sudah dikenal di mana pengguna dapat mengisi "keranjang" dengan barang-barang dan mengklik sekali untuk membeli sekaligus, dengan semua logika yang diperlukan ditangani oleh kontrak, bukan oleh pengguna.

Ini hanyalah beberapa contoh bagaimana pengalaman pengguna dapat ditingkatkan dengan abstraksi akun, tetapi akan ada lebih banyak lagi yang belum kami bayangkan. Abstraksi akun membebaskan pengembang dari batasan EOA saat ini, memungkinkan mereka untuk membawa aspek-aspek yang baik dari web2 ke dalam web3 tanpa mengorbankan hak milik dan meretas secara kreatif pada pengalaman pengguna baru yang kreatif.

## Bagaimana abstraksi akun akan diimplementasikan? {#how-will-aa-be-implemented}

Dompet kontrak pintar sudah ada saat ini, namun sulit untuk diimplementasikan karena EVM tidak mendukungnya. Sebaliknya, mereka mengandalkan pembungkusan kode yang relatif rumit di sekitar transaksi Ethereum standar. Ethereum dapat mengubah hal ini dengan mengizinkan kontrak pintar untuk memulai transaksi, menangani logika yang diperlukan dalam kontrak pintar Ethereum, bukan di luar rantai. Menambahkan logika ke dalam kontrak pintar juga meningkatkan desentralisasi Ethereum karena menghilangkan kebutuhan untuk "relayers" yang dikelola oleh pengembang dompet guna menerjemahkan pesan yang ditandatangani oleh pengguna ke dalam transaksi Ethereum reguler.

<ExpandableCard title="EIP-2771: abstraksi akun menggunakan transaksi meta" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-2771: account abstraction using meta-transactions">

EIP-2771 memperkenalkan konsep transaksi meta yang memungkinkan pihak ketiga untuk membayar biaya gas pengguna tanpa membuat perubahan pada protokol Ethereum. Idenya adalah bahwa transaksi yang ditandatangani oleh pengguna dikirim ke kontrak `Pengirim`. Pengirim adalah entitas tepercaya yang memverifikasi bahwa transaksi tersebut valid sebelum mengirimkannya ke relai gas. Hal ini dilakukan secara di luar rantai, sehingga tidak perlu membayar gas. Relai gas meneruskan transaksi ke kontrak `Penerima`, membayar gas yang diperlukan agar transaksi dapat dieksekusi di Ethereum. Transaksi dieksekusi jika `Pengirim` dikenal dan dipercaya oleh `Penerima`. Model ini memudahkan pengembang untuk mengimplementasikan transaksi tanpa gas bagi pengguna.

</ExpandableCard>

<ExpandableCard title="EIP-4337: abstraksi akun tanpa mengubah protokol Ethereum" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-4337: account abstraction without changing the Ethereum protocol">

EIP-4337 adalah langkah pertama menuju dukungan dompet kontrak pintar asli dengan cara yang terdesentralisasi <em>tanpa memerlukan perubahan pada protokol Ethereum</em>. Alih-alih memodifikasi lapisan konsensus untuk mendukung dompet kontrak pintar, sistem baru ditambahkan secara terpisah ke protokol gosip transaksi normal. Sistem tingkat yang lebih tinggi ini dibangun di sekitar objek baru yang disebut <code>UserOperation</code> yang mengemas tindakan dari pengguna bersama dengan tanda tangan yang relevan. Objek <code>UserOperation</code> ini kemudian disiarkan ke dalam kolam memori khusus di mana validator dapat mengumpulkannya ke dalam "transaksi paket". Transaksi paket mewakili urutan banyak <code>UserOperations</code> individu dan dapat dimasukkan ke dalam blok Ethereum seperti halnya transaksi normal, dan akan diambil oleh validator menggunakan model seleksi pemaksimalan biaya yang serupa.

Cara kerja dompet juga akan berubah di bawah EIP-4337. Daripada setiap dompet mengimplementasikan kembali logika keamanan yang umum namun rumit, fungsi-fungsi tersebut akan dialihdayakan ke kontrak dompet global yang dikenal sebagai &quot;titik masuk&quot;. Ini akan menangani operasi seperti membayar biaya dan mengeksekusi kode EVM sehingga pengembang dompet dapat fokus untuk memberikan pengalaman pengguna yang sangat baik.

<strong>Catatan</strong> kontrak titik masuk EIP 4337 telah digunakan pada Jaringan Utama Ethereum pada tanggal 1 Maret 2023. Anda dapat melihat kontraknya di <a href="https://etherscan.io/address/0x0576a174D229E3cFA37253523E645A78A0C91B57">Etherscan</a>.

</ExpandableCard>

<ExpandableCard title="EIP-2938: mengubah protokol Ethereum untuk mendukung abstraksi akun" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-2938: changing the Ethereum protocol to support account abstraction">

<a href="https://eips.ethereum.org/EIPS/eip-2938">EIP-2938</a> bertujuan untuk memperbarui protokol Ethereum dengan memperkenalkan jenis transaksi baru, <code>AA_TX_TYPE</code> yang mencakup tiga bidang: <code>nonce</code>, <code>target</code>, dan <code>data</code>, di mana <code>nonce</code> adalah penghitung transaksi, <code>target</code> adalah alamat kontrak titik masuk, dan <code>data</code> adalah kode bita EVM. Untuk menjalankan transaksi-transaksi ini, dua instruksi baru (dikenal sebagai opcode) harus ditambahkan ke EVM: <code>NONCE</code> dan <code>PAYGAS</code>. Opcode <code>NONCE</code> melacak urutan transaksi dan <code>PAYGAS</code> menghitung dan menarik gas yang diperlukan untuk menjalankan transaksi dari saldo kontrak. Fitur-fitur baru ini memungkinkan Ethereum untuk mendukung dompet kontrak pintar secara alami karena infrastruktur yang diperlukan sudah terpasang pada protokol Ethereum.

Perhatikan bahwa EIP-2938 saat ini tidak aktif. Komunitas saat ini lebih menyukai EIP-4337 karena tidak memerlukan perubahan pada protokol.

</ExpandableCard>

<ExpandableCard title="EIP-3074: meningkatkan akun yang dimiliki secara eksternal untuk abstraksi akun" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-3074: upgrading externally-owned accounts for account abstraction">

<a href="https://eips.ethereum.org/EIPS/eip-3074">EIP-3074</a> bertujuan untuk memperbarui akun yang dimiliki oleh Ethereum secara eksternal dengan mengizinkannya untuk mendelegasikan kontrol kepada kontrak pintar. Ini berarti logika kontrak pintar dapat menyetujui transaksi yang berasal dari EOA. Hal ini akan memungkinkan fitur-fitur seperti sponsor gas dan transaksi berkelompok. Agar dapat berfungsi, dua opcode baru harus ditambahkan ke EVM: <code>AUTH</code> dan <code>AUTHCALL</code>. Dengan EIP-3074, manfaat dompet kontrak pintar tersedia <em>tanpa memerlukan kontrak</em> - sebagai gantinya, jenis kontrak tanpa negara, tanpa kepercayaan, dan tidak dapat ditingkatkan yang dikenal sebagai "invoker" yang menangani transaksi.

Perhatikan bahwa EIP-3074 saat ini tidak aktif. Komunitas saat ini lebih menyukai EIP-4337 karena tidak memerlukan perubahan pada protokol.

</ExpandableCard>

## Kemajuan saat ini {#current-progress}

Dompet kontrak pintar sudah tersedia, tetapi lebih banyak peningkatan diperlukan untuk membuatnya terdesentralisasi dan tanpa izin. EIP-4337 adalah proposal matang yang tidak memerlukan perubahan apa pun pada protokol Ethereum, sehingga sangat mungkin untuk diimplementasikan dengan cepat. Namun, peningkatan yang mengubah protokol Ethereum saat ini tidak dalam pengembangan aktif, sehingga perubahan tersebut mungkin membutuhkan waktu lebih lama untuk dikirimkan. Hal ini juga memungkinkan bahwa abstraksi akun dicapai dengan cukup baik oleh EIP-4337 sehingga tidak ada perubahan protokol yang diperlukan.

## Bacaan lebih lanjut {#further-reading}

- [erc4337.io](https://www.erc4337.io/)
- [Diskusi panel abstraksi akun dari Devcon Bogota](https://www.youtube.com/watch?app=desktop&v=WsZBymiyT-8)
- ["Mengapa abstraksi akun adalah pengubah permainan untuk dapps" dari Devcon Bogota](https://www.youtube.com/watch?v=OwppworJGzs)
- ["Abstraksi akun ELI5" dari Devcon Bogota](https://www.youtube.com/watch?v=QuYZWJj65AY)
- [Catatan "Jalan Menuju Abstraksi Akun" dari Vitalik](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Postingan blog Vitalik tentang dompet pemulihan sosial](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Catatan EIP-2938](https://hackmd.io/@SamWilsn/ryhxoGp4D#What-is-EIP-2938)
- [Dokumentasi EIP-2938](https://eips.ethereum.org/EIPS/eip-2938)
- [Catatan EIP-4337](https://medium.com/infinitism/erc-4337-account-abstraction-without-ethereum-protocol-changes-d75c9d94dc4a)
- [Dokumentasi EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
- [Dokumentasi EIP-2771](https://eips.ethereum.org/EIPS/eip-2771)
- ["Dasar-dasar Abstraksi Akun" - Apa itu Abstraksi Akun Bagian I](https://www.alchemy.com/blog/account-abstraction)
