---
title: Teknologi pengesah yang diedarkan
description: Teknologi pengesah yang diedarkan membolehkan operasi diedarkan oleh pengesah Ethereum oleh berbilang pihak.
lang: ms
---

# Teknologi pengesah yang diedarkan {#distributed-validator-technology}

Teknologi pengesah yang diedarkan (DVT) ialah pendekatan kepada keselamatan pengesah yang menyebarkan tanggungjawab pengurusan utama dan penandatanganan merentas berbilang pihak, untuk mengurangkan satu titik kegagalan dan meningkatkan daya tahan pengesah.

Ia melakukan ini dengan **memisahkan kunci persendirian** yang digunakan untuk menjamin pengesah **merentasi banyak komputer** yang disusun menjadi "kelompok". Faedahnya ialah ia menyukarkan penyerang untuk mendapatkan akses kepada kunci, kerana ia tidak disimpan sepenuhnya pada mana-mana mesin tunggal. Ia juga membenarkan beberapa nod pergi ke luar talian, kerana tandatangan yang diperlukan boleh dilakukan oleh bagian mesin dalam setiap kelompok. Ini mengurangkan satu titik kegagalan daripada rangkaian dan menjadikan keseluruhan set pengesah lebih mantap.

![Rajah menunjukkan bagaimana satu kunci pengesah dibahagikan kepada bahagian kunci dan diagihkan kepada beberapa nod dengan komponen yang berbeza.](./dvt-cluster.png)

## Mengapa kita memerlukan DVT? {#why-do-we-need-dvt}

### Keselamatan {#security}

Pengesah menjana dua pasangan kunci awam-swasta: kunci pengesah untuk mengambil bahagian dalam konsensus dan kunci pengeluaran untuk mengakses dana. Walaupun pengesah boleh mendapatkan kunci pengeluaran dalam storan sejuk, kunci peribadi pengesah mesti berada dalam talian 24/7. Jika kunci persendirian pengesah terjejas, penyerang boleh mengawal pengesah, yang berpotensi membawa kepada pemotongan atau kehilangan ETH petaruh. DVT boleh membantu mengurangkan risiko ini. Begini caranya:

Dengan menggunakan DVT, petaruh boleh mengambil bahagian dalam pertaruhan sambil mengekalkan kunci peribadi pengesah dalam storan sejuk. Ini dicapai dengan menyulitkan kunci pengesah asli yang penuh dan kemudian membahagikan kepada bahagian utama. Perkongsian utama secara langsung dalam talian dan diedarkan kepada berbilang nod yang membolehkan operasi pengesah yang diedarkan. Ini mungkin kerana pengesah Ethereum menggunakan tandatangan BLS yang bersifat bahan tambahan, bermakna kunci penuh boleh dibina semula dengan menjumlahkan bahagian komponennya. Ini membolehkan petaruh menyimpan kunci pengesah 'master' yang penuh dan asal dengan selamat di luar talian.

### Tiada satu pun titik kegagalan {#no-single-point-of-failure}

Apabila pengesah dibahagikan kepada berbilang pengendali dan berbilang mesin, ia boleh menahan kegagalan perkakasan dan perisian individu tanpa pergi ke luar talian. Risiko kegagalan juga boleh dikurangkan dengan menggunakan konfigurasi perkakasan dan perisian yang pelbagai merentasi nod dalam kelompok. Ketahanan ini tidak tersedia untuk konfigurasi pengesah nod tunggal - ia datang daripada lapisan DVT.

Jika salah satu komponen mesin dalam kumpulan turun (contohnya, jika terdapat empat pengendali dalam kumpulan pengesah dan satu menggunakan pelanggan tertentu yang mempunyai pepijat), yang lain memastikan bahawa pengesah terus berjalan.

### Pencaran Pusat {#decentralization}

Senario yang ideal untuk Ethereum ialah mempunyai sebanyak mungkin pengesah yang dikendalikan secara bebas. Walau bagaimanapun, beberapa penyedia pertaruhan telah menjadi sangat popular dan menyumbang sebahagian besar daripada jumlah ETH yang dipertaruhkan pada rangkaian. DVT boleh membenarkan pengendali ini wujud sambil mengekalkan keteragihan kepentingan. Ini kerana kunci untuk setiap pengesah diedarkan di banyak mesin dan ia akan mengambil pakatan sulit yang lebih besar untuk pengesah untuk bertukar berniat jahat.

Tanpa DVT, lebih mudah bagi penyedia pertaruhan untuk menyokong hanya satu atau dua konfigurasi pelanggan untuk semua pengesah mereka, meningkatkan kesan pepijat pelanggan. DVT boleh digunakan untuk menyebarkan risiko merentasi berbilang konfigurasi pelanggan dan perkakasan yang berbeza, mewujudkan daya tahan melalui kepelbagaian.

**DVT menawarkan faedah berikut kepada Ethereum:**

1. **Keteragihan** konsensus bukti penaruhan Ethereum
2. Memastikan **keaktifan** rangkaian
3. Mencipta **toleransi kesalahan** pengesah
4. Operasi pengesah yang **diminimumkan kepercayaan**
5. **Memotong yang diminimumkan** dan risiko masa henti
6. **Meningkatkan kepelbagaian** (pelanggan, pusat data, lokasi, peraturan, dsb.)
7. **Keselamatan dipertingkatkan** pengurusan kunci pengesah

## Bagaimanakah DVT berfungsi? {#how-does-dvt-work}

Penyelesaian DVT mengandungi komponen berikut:

- **[Perkongsian rahsia Shamir](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Pengesah menggunakan [kunci BLS](https://en.wikipedia.org/wiki/BLS_digital_signature). BLS individu "perkongsian kunci" ("perkongsian kunci") boleh digabungkan menjadi kunci agregat tunggal (tandatangan). Dalam DVT, kunci persendirian untuk pengesah ialah gabungan tandatangan BLS bagi setiap operator dalam kelompok.
- **[Skim tandatangan ambang](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Menentukan bilangan bahagian utama individu yang diperlukan untuk menandatangani tugas, mis., 3 daripada 4.
- **[Penjanaan kunci teragih (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Proses kriptografi yang menjana bahagian utama dan digunakan untuk mengedarkan bahagian kunci pengesah sedia ada atau baharu kepada nod dalam kelompok.
- **[Pengiraan berbilang pihak (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - Kunci pengesah penuh dijana secara rahsia menggunakan pengiraan berbilang pihak. Kunci penuh tidak pernah diketahui oleh mana-mana pengendali individu—mereka hanya tahu bahagian mereka sendiri ("bahagian" mereka).
- **Protokol konsensus** - Protokol konsensus memilih satu nod untuk menjadi pencadang blok. Mereka berkongsi blok dengan nod lain dalam kelompok, yang menambah bahagian utama mereka pada tandatangan agregat. Apabila bahagian utama yang mencukupi telah diagregatkan, blok itu dicadangkan pada Ethereum.

Pengesah yang diedarkan mempunyai toleransi kesalahan terbina dalam dan boleh terus berjalan walaupun beberapa nod individu pergi ke luar talian. Ini bermakna kelompok itu berdaya tahan walaupun beberapa nod di dalamnya ternyata berniat jahat atau malas.

## Kes penggunaan DVT {#dvt-use-cases}

DVT mempunyai implikasi yang ketara untuk industri pertaruhan yang lebih luas:

### Petaruh solo {#solo-stakers}

DVT juga mendayakan pertaruhan bukan jagaan dengan membenarkan anda mengedarkan kunci pengesah anda merentasi nod jauh sambil mengekalkan kunci penuh sepenuhnya di luar talian. Ini bermakna petaruh rumah tidak semestinya perlu mengeluarkan perbelanjaan untuk perkakasan, sementara mengagihkan saham utama boleh membantu mengukuhkan mereka daripada potensi penggodaman.

### Staking as a service (SaaS) {#saas}

Operator (seperti kumpulan staking dan staker institusi) yang menguruskan banyak pengesah boleh menggunakan DVT untuk mengurangkan risiko mereka. Dengan mengagihkan infrastruktur mereka, mereka dapat menambah kelewahan pada operasi mereka dan mempelbagaikan jenis perkakasan yang digunakan.

DVT berkongsi tanggungjawab untuk pengurusan kunci di seluruh beberapa nod, bermakna beberapa kos operasi juga boleh dikongsi. DVT juga boleh mengurangkan risiko operasi dan kos insurans untuk penyedia pertaruhan.

### Staking pools {#staking-pools}

Disebabkan oleh penyediaan pengesah standard, himpunan pertaruhan dan penyedia pertaruhan cair terpaksa mempunyai tahap kepercayaan pengendali tunggal yang pelbagai kerana keuntungan dan kerugian dikongsi di seluruh kumpulan. Mereka juga bergantung pada pengendali untuk melindungi kunci tandatangan kerana, sehingga kini, tiada pilihan lain untuk mereka.

Walaupun usaha tradisional dilakukan untuk menyebarkan risiko dengan mengagihkan taruhan dalam kalangan beberapa pengendali, setiap pengendali masih menguruskan taruhan yang signifikan secara berasingan. Bergantung pada satu pengendali sahaja membawa risiko besar jika mereka tidak berprestasi, mengalami waktu henti, terjejas, atau bertindak dengan niat jahat.

Dengan memanfaatkan DVT, kepercayaan yang diperlukan daripada pengendali dapat dikurangkan dengan ketara. **Himpunan boleh membolehkan pengendali memegang taruhan tanpa perlu menjaga kunci pengesah** (kerana hanya bahagian kunci yang digunakan). Ia juga membolehkan taruhan yang diuruskan diedarkan antara lebih banyak pengendali (contohnya, bukannya satu pengendali yang menguruskan 1000 pengesah, DVT membolehkan pengesah tersebut diuruskan secara kolektif oleh beberapa pengendali). Konfigurasi pengendali yang pelbagai akan memastikan bahawa jika seorang pengendali mengalami gangguan, pengendali yang lain masih boleh membuat pengesahan. Ini menghasilkan kelewahan dan kepelbagaian yang membawa kepada prestasi dan ketahanan yang lebih baik, sambil memaksimumkan ganjaran.

Satu lagi manfaat dalam meminimumkan kepercayaan kepada pengendali tunggal adalah bahawa himpunan pertaruhan dapat membenarkan penyertaan pengendali yang lebih terbuka dan tanpa izin. Dengan cara ini, perkhidmatan dapat mengurangkan risiko mereka dan menyokong keteragihan Ethereum dengan menggunakan set pengendali yang dikurasi dan tanpa izin, contohnya, dengan menggabungkan petaruh rumah atau yang lebih kecil dengan yang lebih besar.

## Potensi kelemahan menggunakan DVT {#potential-drawbacks-of-using-dvt}

- **Komponen tambahan** - memperkenalkan nod DVT menambah satu lagi bahagian yang mungkin boleh mengalami kerosakan atau terdedah kepada risiko keselamatan. Cara untuk mengurangkan ini adalah dengan berusaha untuk memiliki pelaksanaan DVT node yang berbilang, bermakna terdapat pelbagai klien DVT (sama seperti terdapat pelbagai klien untuk lapisan konsensus dan pelaksanaan).
- **Kos operasi** - apabila DVT mengedarkan pengesah antara berbilang pihak, terdapat lebih banyak nod yang diperlukan untuk operasi dan bukannya hanya satu nod, yang memperkenalkan peningkatan kos operasi.
- **Kependaman berpotensi meningkat** - memandangkan DVT menggunakan protokol konsensus untuk mencapai konsensus antara berbilang nod yang mengendalikan pengesah, ia berpotensi memperkenalkan peningkatan kependaman.

## Further Reading {#further-reading}

- [Spesifikasi pengesah yang diedarkan Ethereum (tahap tinggi)](https://github.com/ethereum/distributed-validator-specs)
- [Spesifikasi teknikal pengesah yang diedarkan Ethereum](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Aplikasi demo perkongsian rahsia Shamir](https://iancoleman.io/shamir/)
