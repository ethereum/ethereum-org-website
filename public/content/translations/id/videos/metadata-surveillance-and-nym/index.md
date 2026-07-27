---
title: "Spesial Hari Privasi Data - Pengawasan metadata dan Nym"
description: "Percakapan Hari Privasi Data tentang pengawasan metadata: apa yang diungkapkan metadata tentang Anda bahkan ketika isi pesan dienkripsi, dan bagaimana alat privasi tingkat jaringan seperti Nym bekerja untuk melindunginya."
lang: id
youtubeId: "QBX5AK3DXqw"
uploadDate: 2023-01-30
duration: "0:07:49"
educationLevel: beginner
topic:
  - "privacy"
format: interview
author: Nym
breadcrumb: "Privasi"
---

Sebuah fitur dari **Nym** bersama Kepala Ilmuwan Nym Claudia Diaz, mengeksplorasi mekanisme metadata, peran pentingnya dalam pengawasan modern, detail pribadi yang diungkapkannya, dan langkah-langkah yang dapat kita ambil untuk merebut kembali privasi kita.

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=QBX5AK3DXqw) yang diterbitkan oleh Nym. Transkrip ini telah sedikit diedit agar lebih mudah dibaca.*

#### Pengantar (0:04) {#intro-004}

Apa itu metadata komunikasi? Ini merujuk pada segala sesuatu tentang komunikasi yang bukan merupakan isi dari apa yang sebenarnya sedang dibicarakan. Ini termasuk, misalnya, asal komunikasi, tujuan, waktu pengiriman informasi, berapa banyak informasi yang dikirim, dan pola apa pun yang dapat dideteksi, termasuk waktu dan ukuran paket yang dipertukarkan.

#### Metadata komunikasi (0:27) {#communications-metadata-027}

Metadata komunikasi terekspos secara default di semua protokol internet: TCP/IP, HTTP, UDP, FTP. Bahkan protokol aman seperti TLS atau DNS aman, yang melindungi konten dengan enkripsi ujung-ke-ujung (end-to-end encryption), masih menampilkan metadata komunikasi: asal, tujuan, waktu, panjang, dan sebagainya.

Jadi informasi ini terekspos, tetapi kepada siapa? Siapa yang bisa mendapatkannya?

#### Siapa yang mendapat akses ke metadata (1:10) {#who-gets-access-to-metadata-110}

Ada sejumlah entitas yang menjadi perantara dalam komunikasi internet yang dapat mengakses metadata komunikasi ini. Ini termasuk pemain besar dalam infrastruktur internet, seperti penyedia layanan internet (ISP), bursa, sistem otonom, router BGP, dan peserta tulang punggung (backbone) internet pada umumnya; mereka bisa mendapatkan akses ke banyak metadata komunikasi. 

Namun, bahkan pemain kecil, seperti siapa pun yang menjalankan router Wi-Fi atau jaringan area lokal (LAN), atau seseorang yang dapat menguping secara lokal, juga mendapatkan akses ke metadata komunikasi. Dan tentu saja, musuh tingkat negara-bangsa seperti NSA telah diketahui mengumpulkan metadata dalam skala besar dan menganalisisnya untuk mengekstrak segala jenis intelijen.

#### Mengapa metadata itu penting (2:00) {#why-is-metadata-important-200}

Ada lebih banyak alasan mengapa metadata adalah jenis data yang sangat menarik untuk dikumpulkan dan dieksploitasi. Metadata dapat dibaca oleh mesin, karena ia berbicara dalam bahasa komputer; pada dasarnya ini adalah bahasa bagi komputer agar dapat merutekan komunikasi dari sumber ke tujuannya dengan cara yang tepat. Jadi ini dapat dibaca oleh mesin, dan itu berarti mesin dapat memahaminya dalam skala besar dengan sangat mudah, berbeda dengan bahasa alami manusia, yang jauh lebih sulit untuk ditafsirkan, karena mungkin orang menggunakan kata-kata dengan cara tertentu, atau mereka memiliki nuansa, dan ini jauh lebih sulit untuk ditafsirkan. Di sisi lain, metadata sangatlah mudah.

Volume metadata juga jauh lebih rendah daripada kontennya. Jika Anda memikirkan video YouTube, misalnya, kontennya sendiri bisa berukuran beberapa gigabita, tetapi metadatanya hanya akan mencakup apa URL videonya, berapa banyak bita yang dikandungnya, dan pada jam berapa video itu ditonton. Jadi ukurannya bisa jauh lebih kecil daripada konten sebenarnya, dan juga dapat dikelola dalam hal ukuran.

Metadata juga memiliki perlindungan yang jauh lebih rendah daripada konten. Tidak sah secara hukum untuk sekadar mencegat komunikasi orang dan melihat ke dalam kontennya, ini dilindungi oleh hukum. Namun metadata, karena tidak dianggap terlalu sensitif, memiliki perlindungan yang jauh lebih rendah. Jadi banyak entitas dapat secara sah mengumpulkan metadata ini dan menganalisisnya untuk mempelajari informasi tentang apa yang dilakukan orang-orang di internet.

Jadi, apakah ini masalah besar? Kita bisa berkata, "Yah, itu hanya metadata. Selama Anda tidak tahu apa yang saya katakan, haruskah saya benar-benar khawatir tentang Anda mengetahui dengan siapa saya berbicara dan pada jam berapa?" 

Ada beberapa kutipan yang menunjukkan bagaimana metadata sebenarnya dianggap sangat berharga. Penasihat umum NSA Stewart Baker mengatakan bahwa metadata benar-benar memberi tahu Anda segalanya tentang kehidupan seseorang—jika Anda memiliki cukup metadata, Anda tidak benar-benar membutuhkan konten. Inilah betapa kuatnya metadata dalam memahami apa yang diminati seseorang, siapa jaringan sosial mereka, apa hobi mereka, apa niat mereka, apa minat mereka. Anda sebenarnya tidak perlu mendengar apa yang mereka katakan; cukup dengan Anda dapat mengamati semua metadatanya.

Dan Whitfield Diffie serta Susan Landau, dalam buku mereka *Privacy on the Line*, mengatakan bahwa analisis lalu lintas, bukan kriptanalisis, adalah tulang punggung intelijen komunikasi. Ini karena Anda dapat mengumpulkannya dalam skala besar, Anda dapat menganalisisnya dalam skala besar, dan itu akan memberi Anda semua pola besar, semua gambaran keseluruhan, yang kemudian memungkinkan Anda untuk memperbesar (zoom in) guna membobol target spesifik yang menurut Anda paling menarik. Tetapi Anda menemukannya terlebih dahulu dengan analisis lalu lintas pada metadata.

Analisis lalu lintas metadata bahkan dapat digunakan untuk memulihkan konten terenkripsi tanpa merusak kriptografi. Mari kita asumsikan kita memiliki kriptografi yang sempurna: tidak ada jumlah kriptanalisis yang mampu memecahkannya, dan kunci rahasianya benar-benar rahasia. Kita seharusnya memiliki keyakinan bahwa konten ini dilindungi dan musuh tidak dapat mempelajari tentang konten ini.

Namun, ada banyak situasi di mana analisis lalu lintas metadata komunikasi dapat bertindak sebagai saluran sampingan (side channel) yang mengungkapkan konten terenkripsi ini.

#### Pengawasan metadata (5:15) {#metadata-surveillance-515}

Salah satu contohnya adalah ketika Anda menjelajahi situs web dengan HTTPS. Pada prinsipnya, karena komunikasi dengan situs web ini dienkripsi, seseorang yang mengamati komunikasi Anda tidak dapat mengetahui halaman spesifik mana yang Anda akses di situs web tersebut. Misalnya, jika Anda membuka WebMD untuk memeriksa penyakit, seorang pengamat atau penguping akan dapat melihat, "Oke, Anda sedang memeriksa informasi medis WebMD," tetapi mereka tidak dapat mengetahui penyakit spesifik apa yang sedang Anda cari.

Namun, cara untuk mempelajari apa yang dilakukan seseorang dalam skenario ini adalah dengan musuh terlebih dahulu mengunduh semua halaman di situs tersebut dan merekam, untuk setiap halaman, pola paket yang terlihat di jalur komunikasi. Pada dasarnya, berapa jumlah paket yang pergi ke arah mana, berapa ukuran paket-paket ini, dan berapa periode antar-paket antara satu paket dengan paket berikutnya. 

Dengan melakukan ini, Anda dapat membangun sidik jari (fingerprint) dari masing-masing halaman ini, sehingga ketika target mengunduh halaman dari situs terenkripsi, Anda dapat mencocokkan jumlah paket di setiap arah dan ukurannya untuk menebak halaman web spesifik mana yang sedang mereka lihat, meskipun halaman web itu sendiri dienkripsi dan Anda seharusnya tidak dapat mempelajari konten ini.

Ini jelas mengkhawatirkan. Meskipun kita dapat memiliki enkripsi ujung-ke-ujung, kita masih sangat jauh dari selesai dalam hal melindungi privasi komunikasi kita.

#### Daftar keinginan untuk komunikasi privat (6:40) {#a-wish-list-for-private-communications-640}

Jadi jika kita ingin memiliki daftar keinginan tentang apa yang akan ditawarkan oleh jaringan komunikasi yang aman secara sempurna, apa saja properti yang kita inginkan? 

Jelas, kita ingin melindungi apa yang dikatakan pengguna melalui saluran terenkripsi, dan enkripsi ujung-ke-ujung sudah merupakan langkah yang sangat penting untuk mencapainya. Namun tidak hanya itu, kita juga ingin menyembunyikan dengan siapa pengguna berkomunikasi, jadi siapa mitra komunikasinya, dari siapa Anda menerima paket atau kepada siapa Anda mengirim paket. Juga lokasi, jadi dari mana Anda berkomunikasi; kapan dan berapa lama Anda berkomunikasi; berapa banyak bita data yang Anda pertukarkan; dan pola lain apa pun dalam komunikasi tersebut. Dan Anda bahkan bisa melangkah lebih jauh dengan mengatakan bahwa kita ingin menyembunyikan apakah seseorang sedang berkomunikasi sama sekali atau tidak.

Ini semua adalah properti yang ingin disediakan oleh sistem komunikasi anonim, dan dalam ruang solusi, mixnet adalah salah satu solusi terbaik yang kita miliki untuk menyediakan jenis properti ini.