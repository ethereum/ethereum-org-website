---
title: Kertas Putih Ethereum
description: Kertas pengenalan kepada Ethereum, diterbitkan pada tahun 2013 sebelum pelancarannya.
lang: ms
sidebarDepth: 2
hideEditButton: true
---

# Kertas Putih Ethereum {#ethereum-whitepaper}

_Kertas pengenalan ini pada asalnya diterbitkan pada tahun 2014 oleh Vitalik Buterin, pengasas [Ethereum](/what-is-ethereum/), sebelum pelancaran projek pada tahun 2015. Perlu diambil perhatian bahawa Ethereum, seperti banyak projek perisian sumber terbuka yang didorong oleh komuniti, telah berkembang sejak penubuhan awalnya._

_Walaupun berusia beberapa tahun, kami mengekalkan kertas ini kerana ia terus berfungsi sebagai rujukan yang berguna dan memberi gambaran tepat tentang Ethereum dan visinya. Untuk mengetahui tentang perkembangan terkini Ethereum, dan cara perubahan pada protokol dibuat, kami mengesyorkan [panduan ini](/learn/)._

[Penyelidik dan ahli akademik yang mahukan versi sejarah atau asli kertas putih [dari Disember 2014] harus menggunakan PDF ini.](./whitepaper-pdf/Ethereum_Whitepaper_-_Buterin_2014.pdf)

## Kontrak Pintar Generasi Seterusnya dan Platform Aplikasi Ternyahpusat {#a-next-generation-smart-contract-and-decentralized-application-platform}

Pembangunan Bitcoin oleh Satoshi Nakamoto pada tahun 2009 sering digelar sebagai pembangunan radikal dalam bidang wang dan mata wang, menjadi contoh pertama aset digital yang tidak mempunyai sokongan atau "[nilai intrinsik](http://bitcoinmagazine.com/8640/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it/)" dan pada masa yang sama, tiada pengeluar atau pengawal berpusat. Walau bagaimanapun, bahagian lain eksperimen Bitcoin yang mungkin lebih penting lagi, ialah teknologi blok rantai yang mendasari sebagai alat konsensus teragih. Perhatian telah mula berganjak dengan pantas ke arah aspek lain Bitcoin ini. Penggunaan alternatif teknologi blok rantai yang biasa dipuji termasuk menggunakan aset digital pada blok rantai untuk mewakili mata wang tersuai dan instrumen kewangan ("[syiling berwarna](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)"), pemilikan peranti fizikal yang mendasari ("[harta pintar](https://en.bitcoin.it/wiki/Smart_Property)"), aset tidak sepiawai seperti nama domain ("[Namecoin](http://namecoin.org)"), serta aplikasi lebih kompleks yang melibatkan aset digital dikawal terus oleh secebis kod yang melaksanakan peraturan arbitrari ("[kontrak pintar](http://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/idea.html)") atau "[organisasi berautonomi ternyahpusat](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)" (decentralized autonomous organization, DAO) berasaskan blok rantai. Ethereum berhasrat untuk menyediakan blok rantai dengan bahasa pengaturcaraan yang Turing Lengkap sepenuhnya yang boleh digunakan untuk membuat "kontrak" yang boleh digunakan untuk mengekod fungsi peralihan keadaan arbitrari, membolehkan pengguna mencipta mana-mana sistem yang diterangkan di atas, serta banyak lagi yang belum kita bayangkan, hanya dengan menulis logik dalam beberapa baris kod.

## Pengenalan Bitcoin dan Konsep Sedia Ada {#introduction-to-bitcoin-and-existing-concepts}

### Sejarah {#history}

Konsep mata wang digital ternyahpusat, serta aplikasi alternatif seperti daftar hartanah, telah wujud selama beberapa dekad. Protokol e-tunai tanpa nama pada 1980-an dan 1990-an, kebanyakannya bergantung pada primitif kriptografi yang dikenali sebagai pembutaan Chaumian, telah menyediakan mata wang dengan tahap privasi yang tinggi, tetapi protokol itu sebahagian besarnya gagal mendapat daya tarikan kerana pergantungan terhadap perantara berpusat. Pada tahun 1998, [b-money](http://www.weidai.com/bmoney.txt) Wei Dai menjadi cadangan pertama untuk memperkenalkan idea mencipta wang melalui penyelesaian teka-teki pengkomputeran serta konsensus ternyahpusat, tetapi cadangan itu tidak cukup butiran tentang cara konsensus ternyahpusat itu benar-benar dapat dilaksanakan. Pada tahun 2005, Hal Finney memperkenalkan konsep "[bukti kerja boleh guna semula](https://nakamotoinstitute.org/finney/rpow/)", satu sistem yang menggunakan idea daripada b-money bersama-sama dengan teka-teki Hashcash Adam Back yang sukar dikira untuk mencipta konsep bagi mata wang kripto, tetapi sekali lagi tidak berjaya disempurnakan kerana bergantung pada pengkomputeran yang dipercayai sebagai bahagian belakang. Pada tahun 2009, mata wang ternyahpusat buat kali pertama dilaksanakan secara praktik oleh Satoshi Nakamoto, menggabungkan primitif yang ditubuhkan untuk menguruskan pemilikan melalui kriptografi kunci awam dengan algoritma konsensus bagi menjejaki pemilik syiling, dikenali sebagai "bukti kerja".

Mekanisme di sebalik bukti kerja merupakan satu kejayaan dalam bidang ini kerana ia menyelesaikan dua masalah pada masa yang sama. Pertama, ia menyediakan algoritma konsensus yang ringkas dan berkesan pada tahap yang sederhana, membolehkan nod dalam rangkaian bersetuju secara kolektif dengan satu set kemas kini asli kepada keadaan lejar Bitcoin. Kedua, ia menyediakan mekanisme untuk membolehkan kemasukan percuma ke dalam proses konsensus, menyelesaikan masalah politik iaitu memutuskan siapa yang dapat mempengaruhi konsensus, sambil menghalang serangan Sybil pada masa yang sama. Ia melakukan ini dengan menggantikan halangan penyertaan yang formal, seperti keperluan untuk didaftarkan sebagai entiti unik dalam senarai tertentu, dengan halangan ekonomi - berat satu nod dalam proses pengundian konsensus secara langsung berkadar dengan kuasa pengkomputeran yang dibawa oleh nod. Sejak itu, pendekatan alternatif telah dicadangkan yang dikenali sebagai _bukti taruhan_, mengira berat nod sebagai berkadar dengan pegangan mata wang dan bukan sumber pengiraan; perbincangan merit relatif kedua-dua pendekatan adalah di luar skop kertas ini tetapi perlu ambil perhatian bahawa kedua-dua pendekatan boleh digunakan untuk berfungsi sebagai tulang belakang mata wang kripto.

### Bitcoin Sebagai Sistem Peralihan Keadaan {#bitcoin-as-a-state-transition-system}

![Peralihan keadaan Ethereum](./ethereum-state-transition.png)

Dari sudut teknikal, lejar mata wang kripto seperti Bitcoin boleh dibayangkan sebagai sistem peralihan keadaan, iaitu terdapat "keadaan" yang mengandungi status pemilikan semua bitcoin sedia ada dan "fungsi peralihan keadaan" yang mengambil keadaan dan transaksi, kemudian mengoutput keadaan baharu yang merupakan hasilnya. Contohnya, dalam sistem perbankan standard, keadaan ialah kunci kira-kira, transaksi ialah permintaan untuk memindahkan $X dari A ke B, dan fungsi peralihan keadaan mengurangkan nilai dalam akaun A sebanyak $X dan meningkatkan nilai dalam akaun B sebanyak $X. Jika akaun A sememangnya sudah mempunyai kurang daripada $X, fungsi peralihan keadaan mengembalikan ralat. Oleh itu, seseorang boleh menentukan secara rasmi:

```
Menggunakan(S,TX) -> S' atau SALAH
```

Dalam sistem bank yang ditakrifkan di atas:

```js
Gunakan({ Alice: $50, Bob: $50 },"kirim $20 daripada Alice ke Bob") = { Alice: $30, Bob: $70 }
```

Tetapi:

```js
Gunakan({ Alice: $50, Bob: $50 },"kirim $70 daripada Alice ke Bob") = SALAH
```

"Keadaan" dalam Bitcoin ialah kumpulan semua syiling (secara teknikal, output transaksi belum dibelanja atau UTXO) yang telah ditempa dan belum dibelanjakan, dengan setiap UTXO mempunyai denominasi dan pemilik (ditakrifkan melalui alamat 20 bit yang pada dasarnya merupakan kunci awam kriptografi<sup>[fn1](#nota)</sup>). Transaksi mengandungi satu atau lebih input, dengan setiap input yang mengandungi rujukan kepada UTXO sedia ada dan tandatangan kriptografi yang dihasilkan oleh kunci peribadi yang berkaitan dengan alamat pemilik, dan satu atau lebih output, dengan setiap output yang mengandungi UTXO baru yang akan ditambah kepada negeri.

Fungsi peralihan keadaan `APPLY(S,TX) -> S'` boleh ditakrifkan secara kasar seperti berikut:

<ol>
  <li>
    Bagi setiap input dalam <code>TX</code>:
    <ul>
    <li>
        Jika rujukan UTXO bukan dalam <code>S</code>, ralat dikembalikan.
    </li>
    <li>
        Jika tandatangan yang disediakan tidak sepadan dengan pemilik UTXO, ralat dikembalikan.
    </li>
    </ul>
  </li>
  <li>
    Jika jumlah denominasi semua input UTXO kurang daripada jumlah denominasi semua output UTXO, ralat dikembalikan.
  </li>
  <li>
    Kembalikan <code>S</code> dengan semua UTXO input dialih keluar dan semua UTXO output ditambah.
  </li>
</ol>

Separuh pertama bagi langkah pertama menghalang penghantar transaksi daripada membelanjakan syiling yang tidak wujud, separuh kedua bagi langkah pertama menghalang penghantar transaksi daripada membelanjakan syiling orang lain, dan langkah kedua menguatkuasakan pemuliharaan nilai. Untuk menggunakan ini sebagai pembayaran, protokol adalah seperti berikut. Andaikan Alice mahu mengirim 11.7 BTC kepada Bob. Pertama sekali, Alice akan mencari satu set UTXO tersedia yang dia miliki berjumlah sehingga sekurang-kurangnya 11.7 BTC. Pada hakikatnya, Alice tidak akan berjaya mendapatkan tepat-tepat 11.7 BTC; andaikan bahawa jumah terkecil yang dia boleh dapat ialah 6+4+2=12. Kemudian, dia membuat transaksi dengan tiga input dan dua output. Output pertama ialah 11.7 BTC dengan alamat Bob sebagai pemilik, dan output kedua ialah "baki" 0.3 BTC selebihnya, dengan pemilik ditetapkan sebagai Alice sendiri.

### Perlombongan {#mining}

![Blok Ethereum](./ethereum-blocks.png)

Jika kita mempunyai akses kepada perkhidmatan berpusat yang boleh dipercayai, sistem ini akan mudah dilaksanakan; ia boleh dikodkan tepat seperti yang diterangkan, menggunakan cakera keras pelayan berpusat untuk menjejaki keadaan. Walau bagaimanapun, dengan Bitcoin kita cuba membina sistem mata wang ternyahpusat, jadi kita perlu menggabungkan sistem transaksi keadaan dengan sistem konsensus untuk memastikan bahawa semua orang bersetuju dengan urutan transaksi. Proses konsensus ternyahpusat Bitcoin memerlukan nod dalam rangkaian untuk terus cuba menghasilkan pakej transaksi yang dikenali sebagai "blok". Rangkaian ini bertujuan untuk menghasilkan kira-kira satu blok setiap sepuluh minit, dengan setiap blok mengandungi cap waktu, nonce, rujukan kepada (iaitu hash) blok sebelumnya dan senarai semua transaksi yang telah berlaku sejak blok sebelumnya. Lama-kelamaan, ini mewujudkan "blok rantai" yang berterusan, sentiasa berkembang dan yang sentiasa dikemas kini untuk mewakili keadaan terkini lejar Bitcoin.

Algoritma untuk memeriksa sama ada blok sah, diungkap dalam paradigma ini, adalah seperti berikut:

1. Semak sama ada blok sebelumnya yang dirujuk oleh blok wujud dan sah.
2. Semak bahawa cap waktu blok adalah lebih daripada blok sebelumnya<sup>[fn2](#nota)</sup> dan kurang daripada 2 jam ke masa akan datang
3. Semak bahawa bukti kerja pada blok adalah sah.
4. Biarkan `S[0]` menjadi keadaan pada akhir blok sebelumnya.
5. Andaikan `TX` ialah senarai transaksi blok dengan `n` transaksi. Untuk semua `i` dalam `0...n-1`, set `S[i+1] = APPLY(S[i],TX[i])` Jika sebarang aplikasi mengembalikan ralat, keluar dan kembalikan palsu.
6. Kembalikan benar, dan daftar `S[n]` sebagai keadaan di akhir blok ini.

Pada asasnya, setiap transaksi dalam blok mesti menyediakan peralihan keadaan yang sah daripada keadaan asli sebelum transaksi dilaksanakan kepada keadaan baharu. Ambil perhatian bahawa keadaan tidak dikodkan dalam blok dalam apa jua cara; ia semata-mata abstraksi yang perlu diingati oleh nod pengesahan dan hanya boleh dikira (dengan selamat) untuk sebarang blok dengan bermula dari keadaan genesis dan menggunakan setiap transaksi secara berjujukan dalam setiap blok. Di samping itu, ambil perhatian bahawa urutan yang pelombong memasukkan transaksi ke dalam blok adalah penting; jika terdapat dua transaksi A dan B dalam blok iaitu B membelanjakan UTXO yang dicipta oleh A, maka blok akan sah jika A datang sebelum B tetapi tidak sebaliknya.

Satu keadaan kesahihan yang terdapat dalam senarai di atas yang tidak terdapat dalam sistem lain ialah keperluan untuk bukti kerja. Keadaan yang tepat ialah cincangan SHA256 ganda setiap blok, dianggap sebagai nombor 256 bit, mesti kurang daripada sasaran diselaraskan dinamik, yang pada masa penulisan ini ialah kira-kira 2<sup>187</sup>. Tujuan ini adalah untuk "menyukarkan" penciptaan blok dari segi pengkomputeran, oleh itu menghalang penyerang sybil daripada membuat semula keseluruhan blok rantai untuk memberi mereka kelebihan. Oleh sebab SHA256 direka bentuk untuk menjadi fungsi pseudorawak yang benar-benar tidak dapat diramalkan, satu-satunya cara untuk mencipta blok yang sah ialah percubaan dan kesilapan, berulang kali meningkatkan nonce dan melihat sama ada cincangan baharu itu sepadan.

Pada sasaran semasa iaitu ~2<sup>187</sup>, rangkaian mesti membuat purata ~2<sup>69</sup> cubaan sebelum blok sah dijumpai; secara umum, sasaran itu ditentukur semula oleh rangkaian setiap 2016 blok supaya secara puratanya blok baharu dihasilkan oleh beberapa nod dalam rangkaian setiap sepuluh minit. Untuk memberi pampasan kepada pelombong untuk kerja pengiraan ini, pelombong setiap blok berhak untuk memasukkan transaksi yang memberi diri mereka 25 BTC daripada mana-mana. Selain itu, jika sebarang transaksi mempunyai jumlah denominasi yang lebih tinggi dalam inputnya daripada outputnya, perbezaan juga pergi ke pelombong sebagai "fi transaksi". Secara kebetulan, ini juga merupakan satu-satunya mekanisme pengeluaran BTC; keadaan genesis tidak mengandungi syiling sama sekali.

Untuk lebih memahami tujuan perlombongan, mari kita mengkaji hal yang berlaku sekiranya terdapat penyerang berniat jahat. Oleh sebab kriptografi asas Bitcoin diketahui selamat, penyerang akan menyasarkan satu bahagian daripada sistem Bitcoin yang tidak dilindungi secara langsung oleh kriptografi: urutan transaksi. Strategi penyerang adalah mudah:

1. Hantar 100 BTC kepada pedagang sebagai tukaran untuk sesuatu produk (sebaik-baiknya barangan digital melalui pengiriman pantas)
2. Tunggu pengiriman produk
3. Hasilkan transaksi lain yang menghantar 100 BTC yang sama kepada dirinya
4. Cuba meyakinkan rangkaian bahawa transaksi kepada dirinya sendiri mendahului transaksi sebenar.

Setelah langkah (1) telah berlaku, selepas beberapa minit seseorang pelombong akan memasukkan transaksi itu dalam blok, andaikan blok nombor 270000. Selepas kira-kira satu jam, lima blok lagi akan ditambah kepada rantaian selepas blok itu, dengan setiap blok tersebut menunjuk kepada transaksi itu secara tidak langsung dan dengan itu "mengesahkannya". Pada ketika ini, pedagang akan menerima bayaran sebagai muktamad dan menyampaikan produk; oleh sebab kita mengandaikan bahawa ini ialah barangan digital, pengiriman adalah segera. Sekarang, penyerang mencipta satu lagi transaksi menghantar 100 BTC kepada dirinya sendiri. Jika penyerang hanya melepaskan transaksi itu ke luar, transaksi tidak akan diproses; pelombong akan cuba menjalankan `APPLY(S,TX)` dan perasan bahawa `TX` menggunakan UTXO yang tidak lagi berada dalam keadaan tersebut. Jadi sebaliknya, penyerang mencipta satu “cabang” blok rantai, bermula dengan perlombongan blok 270000 versi lain yang menunjuk kepada blok 269999 yang sama sebagai induk tetapi dengan transaksi baharu menggantikan yang lama. Oleh sebab data blok berbeza, bukti kerja perlu diulang. Tambahan pula, blok 270000 versi baharu milik penyerang itu mempunyai cincangan yang berbeza, jadi blok asal 270001 hingga 270005 tidak "menunjuk" padanya; dengan itu, rantaian asal dan rantaian baharu miik penyerang adalah berasingan sepenuhnya. Peraturannya adalah bahawa dalam cabang, blok rantai terpanjang dianggap benar, jadi pelombong yang sah akan mengusahakan rantaian 270005 manakala penyerang sahaja yang mengusahakan rantaian 270000. Jika penyerang ingin membuat blok rantainya yang paling panjang, dia perlu mempunyai kuasa pengiraan yang melebihi gabungan semua pelombong lain pada rangkaian untuk mengejar (maka, "serangan 51%").

### Pohon Merkle {#merkle-trees}

![SPV dalam Bitcoin](./spv-bitcoin.png)

_Kiri: persembahan hanya sebilangan kecil nod di pohon Merkle sudah cukup untuk memberikan bukti kesahihan cabang._

_Kanan: sebarang cubaan untuk menukar mana-mana bahagian pohon Merkle akhirnya akan menyebabkan ketidakkonsistenan pada suatu tempat di rantaian._

Ciri kebolehskalaan penting Bitcoin ialah blok disimpan dalam struktur data pelbagai peringkat. "Cincangan" blok sebenarnya hanya cincangan pengepala blok, iaitu secebis data kira-kira 200 bit yang mengandungi cap waktu, nonce, cincangan blok sebelumnya dan cincangan akar bagi struktur data yang dikenali sebagai pohon Merkle, menyimpan semua transaksi dalam blok. Pohon Merkle ialah sejenis pokok binari, terdiri daripada satu set nod dengan sebilangan besar nod daun di bahagian bawah pohon yang mengandungi data asas, satu set nod pertengahan di mana setiap nod ialah cincangan daripada dua anak, dan akhirnya satu nod akar tunggal, juga terbentuk daripada cincangan dua anaknya, yang mewakili bahagian "atas" pohon. Tujuan pohon Merkle adalah untuk membolehkan data dalam blok untuk dihantar sedikit demi sedikit: nod boleh memuat turun hanya pengepala blok daripada satu sumber, bahagian kecil pohon yang berkaitan dengannya daripada sumber lain, dan masih yakin bahawa semua data adalah betul. Sebab ini berfungsi adalah bahawa cincangan meningkat ke atas: jika pengguna berniat jahat cuba untuk memasukkan transaksi palsu ke bahagian bawah pohon Merkle, perubahan ini akan menyebabkan perubahan dalam nod di atas, dan kemudian perubahan dalam nod di atas itu, akhirnya menukar akar pohon dan oleh itu cincangan blok, menyebabkan protokol mendaftarnya sebagai blok yang langsung berbeza (pasti sekali dengan bukti kerja tidak sah).

Protokol pohon Merkle boleh dikatakan penting untuk kelestarian jangka panjang. "Nod penuh" dalam rangkaian Bitcoin, yang menyimpan dan memproses keseluruhan setiap blok, mengambil kira-kira 15 GB ruang cakera dalam rangkaian Bitcoin pada April 2014, dan berkembang lebih daripada satu gigabait sebulan. Pada masa ini, ini boleh digunakan untuk sesetengah komputer desktop dan bukan telefon, dan kemudian pada masa depan hanya syarikat dan peminat hobi yang boleh mengambil bahagian. Protokol yang dikenali sebagai "pengesahan pembayaran ringkas" (SPV) membolehkan kelas nod lain wujud, dikenali sebagai "nod cerah", yang memuat turun pengepala blok, mengesahkan bukti kerja pada pengepala blok, dan kemudian memuat turun hanya "cabang" yang berkaitan dengan transaksi yang berkenaan dengannya. Ini membolehkan nod cerah menentukan dengan jaminan keselamatan yang kuat tentang status mana-mana transaksi Bitcoin, dan baki semasa, sambil memuat turun hanya sebahagian kecil daripada keseluruhan blok rantai.

### Aplikasi Blok Rantai Alternatif {#alternative-blockchain-applications}

Idea untuk mengambil idea blok rantai asas dan menggunakannya dalam konsep lain juga mempunyai sejarah yang panjang. Pada tahun 2005, Nick Szabo menghasilkan konsep "[hak milik hartanah selamat dengan kuasa pemilik](https://nakamotoinstitute.org/secure-property-titles/)", dokumen yang menerangkan cara "kemajuan baru dalam teknologi pangkalan data replika" akan membolehkan sistem berasaskan blok rantai untuk menyimpan daftar bagi pemilik tanah, mewujudkan rangka kerja rumit termasuk konsep seperti rumah ladang, pemilikan buruk dan cukai tanah Georgia. Walau bagaimanapun, malangnya tiada sistem pangkalan data replikasi berkesan pada masa itu, oleh itu protokol tersebut tidak pernah dilaksanakan. Selepas 2009, bagaimanapun, apabila konsensus ternyahpusat Bitcoin telah dibangunkan, beberapa aplikasi alternatif mula muncul dengan cepat.

- **Namecoin** - dicipta pada 2010, [Namecoin](https://namecoin.org/) paling tepat digambarkan sebagai pangkalan data pendaftaran nama terpusat. Dalam protokol berpusat seperti Tor, Bitcoin dan BitMessage, perlu terdapat beberapa cara mengenal pasti akaun supaya orang lain dapat berinteraksi dengannya, tetapi dalam semua penyelesaian sedia ada satu-satunya jenis pengecam yang tersedia ialah cincangan pseudorawak seperti `1LW79wp5ZBqaHW1jL5TCiBCrhQYtHagUWy`. Sebaiknya, kita ingin berupaya memiliki akaun dengan nama seperti "george". Walau bagaimanapun, masalahnya ialah jika seseorang boleh membuat akaun bernama "george" maka orang lain boleh menggunakan proses yang sama untuk mendaftar "george" untuk diri mereka dan juga menyamar sebagai "george". Satu-satunya penyelesaian ialah paradigma "pertama sekali daftar", di iaitu pendaftar pertama berjaya dan pendaftar kedua gagal - masalah yang sesuai untuk protokol konsensus Bitcoin. Namecoin ialah implementasi sistem pendaftaran nama yang tertua, dan paling berjaya yang menggunakan idea sedemikian.
- **Syiling berwarna** - tujuan [syiling berwarna](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit) adalah untuk berkhidmat sebagai protokol bagi membolehkan orang mencipta mata wang digital mereka sendiri - atau, dalam kes remeh penting bagi mata wang dengan satu unit, token digital, pada blok rantai Bitcoin. Dalam protokol syiling berwarna, kita "mengeluarkan" mata wang baharu dengan memperuntukkan warna pada UTXO Bitcoin tertentu, dan protokol secara rekursif mentakrifkan warna UTXO lain agar sama dengan warna input yang dibelanjakan oleh transaksi yang menciptanya (beberapa peraturan khas terpakai dalam kes input bercampur-warna). Ini membolehkan pengguna mengekalkan dompet yang mengandungi hanya UTXO warna tertentu dan menghantarnya sama seperti bitcoins biasa, menjejak balik melalui blok rantai untuk menentukan warna mana-mana UTXO yang diterima.
- **Syiling meta** - idea di sebalik syiling meta adalah untuk mempunyai protokol yang wujud di atas Bitcoin, menggunakan transaksi Bitcoin untuk menyimpan transaksi syiling meta tetapi mempunyai fungsi peralihan keadaan yang berbeza, `APPLY'`. Oleh sebab protokol syiling meta tidak dapat menghalang transaksi syiling meta yang tidak sah daripada muncul dalam blok rantai Bitcoin, peraturan ditambah bahawa jika `APPLY'(S,TX)` mengembalikan ralat, protokol akan lalai kepada `APPLY'(S,TX) = S`. Ini menyediakan mekanisme mudah untuk mewujudkan protokol mata wang kripto arbitrari, berpotensi memiliki ciri-ciri maju yang tidak boleh dilaksanakan dalam Bitcoin sendiri, tetapi dengan kos pembangunan yang sangat rendah kerana kerumitan perlombongan dan rangkaian telah dikendalikan oleh protokol Bitcoin. Syiling meta telah digunakan untuk melaksanakan beberapa kelas kontrak kewangan, pendaftaran nama dan pertukaran ternyahpusat.

Oleh itu, secara umum, terdapat dua pendekatan untuk membina protokol konsensus: membina rangkaian bebas, dan membina protokol di atas Bitcoin. Pendekatan pertama, walaupun yang agak berjaya dalam kes aplikasi seperti Namecoin, adalah sukar untuk dilaksanakan; setiap pelaksanaan berasingan memerlukan perlu ikatan but blok rantai bebas, serta membina dan menguji semua peralihan keadaan dan kod rangkaian yang diperlukan. Selain itu, kami meramalkan bahawa set aplikasi untuk teknologi konsensus ternyahpusat akan mengikuti pengagihan undang-undang kuasa di mana kebanyakan aplikasi akan terlalu kecil untuk menjamin blok rantai sendiri, dan kami perhatikan bahawa terdapat kelas besar aplikasi ternyahpusat, terutamanya organisasi autonomi ternyahpusat, yang perlu berinteraksi antara satu sama lain.

Pendekatan berasaskan Bitcoin, sebaliknya, mempunyai kelemahan bahawa ia tidak mewarisi ciri pengesahan pembayaran yang dipermudahkan Bitcoin. SPV berfungsi untuk Bitcoin kerana ia boleh menggunakan kedalaman blok rantai sebagai proksi untuk kesahihan; pada satu tahap apabila leluhur transaksi adalah cukup lama, boleh dikatakan bahawa ia merupakan sebahagian daripada keadaan. Meta-protokol berasaskan blok rantai pula tidak boleh memaksa blok rantai untuk mengecualikan transaksi yang tidak sah dalam konteks protokol sendiri. Oleh itu, pelaksanaan meta-protokol SPV yang selamat perlu mengimbas balik sehingga permulaan blok rantai Bitcoin untuk menentukan sama ada transaksi tertentu sah. Pada masa ini, semua pelaksanaan "cerah" bagi meta-protokol berasaskan Bitcoin bergantung pada pelayan yang dipercayai untuk menyediakan data, boleh dikatakan hasil yang sangat suboptimum terutamanya apabila salah satu tujuan utama mata wang kripto adalah untuk menghapuskan keperluan bagi kepercayaan.

### Skrip {#scripting}

Walaupun tanpa sebarang sambungan, protokol Bitcoin sebenarnya memudahkan versi yang lemah konsep "kontrak pintar". UTXO dalam Bitcoin boleh dimiliki bukan sahaja oleh kekunci awam, tetapi juga oleh skrip yang lebih rumit dinyatakan dalam bahasa pengaturcaraan berasaskan timbunan mudah. Dalam paradigma ini, perbelanjaan transaksi yang membelanjakan UTXO mesti menyediakan data yang memuaskan skrip. Malah, walaupun mekanisme pemilikan utama awam asas dilaksanakan melalui skrip: skrip mengambil tandatangan lengkung eliptik sebagai input, mengesahkannya terhadap transaksi dan alamat yang memiliki UTXO, dan mengembalikan 1 jika pengesahan berjaya dan 0 sebaliknya. Skrip lain yang seringkali lebih rumit wujud untuk pelbagai kes penggunaan tambahan. Sebagai contoh, seseorang boleh membina skrip yang memerlukan tandatangan daripada dua kekunci daripada tiga kekunci peribadi yang diberikan untuk mengesahkan ("berbilang tandatangan"), persediaan yang berguna untuk akaun korporat, akaun simpanan selamat dan beberapa situasi eskrow saudagar. Skrip juga boleh digunakan untuk membayar baunti untuk penyelesaian kepada masalah pengiraan, dan kita juga boleh membina skrip yang mengatakan sesuatu seperti "Bitcoin UTXO adalah milik anda jika anda boleh memberikan bukti SPV bahawa anda menghantar transaksi Dogecoin denominasi ini kepada saya", pada dasarnya membenarkan pertukaran silang mata wang kripto yang ternyahpusat.

Walau bagaimanapun, bahasa penskripan seperti yang dilaksanakan dalam Bitcoin mempunyai beberapa batasan penting:

- **Kekurangan Kelengkapan Ciri Turing** - iaitu, walaupun terdapat subset besar pengiraan yang disokong oleh bahasa penskripan Bitcoin, ia tidak menyokong hampir segala-galanya. Kategori utama yang tiada ialah gelung. Ini dilakukan untuk mengelakkan gelung tak terhingga semasa pengesahan transaksi; secara teori ini merupakan halangan yang boleh diatasi untuk pengaturcara skrip, kerana sebarang gelung boleh disimulasikan dengan hanya mengulangi kod asas berkali-kali dengan pernyataan jika, tetapi menyebabkan skrip sangat tidak efisien dari segi ruang. Sebagai contoh, melaksanakan algoritma tandatangan lengkung eliptik alternatif mungkin memerlukan 256 pusingan pendaraban berulang kali, semua termasuk secara berasingan dalam kod.
- **Kebutaan nilai** - tidak ada cara untuk skrip UTXO memberikan kawalan yang halus ke atas jumlah yang boleh dikeluarkan. Sebagai contoh, satu kes penggunaan kukuh bagi kontrak oracle ialah kontrak lindung nilai, di mana A dan B memasukkan BTC bernilai $1000 dan selepas 30 hari skrip menghantar BTC bernilai $1000 kepada A dan selebihnya kepada B. Ini memerlukan oracle untuk menentukan nilai 1 BTC dalam USD, tetapi walaupun begitu ia merupakan peningkatan besar dari segi kepercayaan dan keperluan infrastruktur berbanding penyelesaian berpusat sepenuhnya yang tersedia sekarang. Walau bagaimanapun, oleh sebab UTXO bersifat "semua atau langsung tiada", satu-satunya cara untuk mencapai ini adalah melalui godaman yang sangat tidak cekap iaitu mempunyai banyak UTXO pelbagai denominasi (contohnya satu UTXO 2<sup>k</sup> bagi setiap k sehingga 30) dan membuat oracle memilih UTXO untuk dihantar kepada A dan UTXO yang dihantar kepada B.
- **Kekurangan keadaan** - UTXO boleh dibelanjakan atau tidak dibelanja; tidak ada peluang untuk kontrak atau skrip berbilang peringkat yang menyimpan mana-mana keadaan dalaman lain di luar itu. Ini menyukarkan penghasilan kontrak pilihan pelbagai peringkat, tawaran bursa ternyahpusat atau protokol komitmen kriptografi dua peringkat (perlu untuk baunti pengiraan selamat). Ia juga bermakna bahawa UTXO hanya boleh digunakan untuk membina kontrak mudah, gunaan satu kali dan bukan kontrak "penuh keadaan" lebih rumit seperti organisasi ternyahpusat, dan membuat meta-protokol sukar dilaksanakan. Keadaan binari digabungkan dengan kebutaaan nilai juga bermakna bahawa satu lagi aplikasi penting, had pengeluaran, adalah mustahil.
- **Kebutaan blok rantai** - UTXO buta kepada data blok rantai seperti nonce, cap waktu dan cincangan blok sebelumnya. Ini banyak menghadkan aplikasi dalam perjudian, dan beberapa kategori lain, dengan menafikan bahasa skrip daripada sumber rawak yang mungkin bernilai.

Oleh itu, kita melihat tiga pendekatan untuk membina aplikasi lanjutan di atas mata wang kripto: membina blok rantai baharu, menggunakan skrip di atas Bitcoin, dan membina protokol meta di atas Bitcoin. Membina blok rantai baru membolehkan kebebasan tanpa had dalam membina set ciri, tetapi akan mengorbankan kos masa pembangunan, usaha ikatan but dan keselamatan. Menggunakan skrip adalah mudah dilaksanakan dan diseragamkan, tetapi sangat terhad dari segi keupayaan, dan meta-protokol, walaupun mudah, mengalami kelemahan dalam kebolehskalaan. Dengan Ethereum, kami berhasrat untuk membina rangka kerja alternatif yang memudahkan pembangunan serta sifat pelanggan cerah yang lebih kuat, sementara pada masa yang sama membolehkan aplikasi berkongsi persekitaran ekonomi dan keselamatan blok rantai.

## Ethereum {#ethereum}

Hasrat Ethereum adalah untuk mewujudkan protokol alternatif bagi membina aplikasi ternyahpusat, menyediakan set keseimbangan berbeza yang kami percaya akan sangat berguna untuk kelas besar aplikasi ternyahpusat, dengan penekanan khusus kepada situasi di mana masa pembangunan pesat, keselamatan untuk aplikasi yang kecil dan jarang digunakan, dan keupayaan aplikasi yang berbeza untuk berinteraksi dengan sangat efisien, adalah penting. Ethereum melakukan ini dengan membina sesuatu yang pada dasarnya lapisan asas abstrak terhebat: blok rantai dengan bahasa pengaturcaraan Lengkap Turing, membolehkan sesiapa sahaja untuk menulis kontrak pintar dan aplikasi ternyahpusat yang membolehkan mereka membuat peraturan arbitrari sendiri untuk pemilikan, format transaksi dan fungsi peralihan keadaan. Versi Namecoin yang paling ringkas boleh ditulis dalam dua baris kod, dan protokol lain seperti mata wang dan sistem reputasi boleh dibina di bawah dua puluh baris. Kontrak pintar, "kotak" cryptografi yang mengandungi nilai dan hanya membuka kunci jika syarat tertentu dipenuhi, juga boleh dibina di atas platform, dengan jauh lebih kuasa daripada yang ditawarkan oleh skrip Bitcoin kerana kuasa tambahan Kelengkapan Turing, kesedaran nilai, kesedaran blok rantai dan keadaan.

### Ethereum Accounts {#ethereum-accounts}

Di Ethereum, keadaan ini terdiri daripada objek yang dipanggil "akaun", dengan setiap akaun mempunyai alamat 20 bit dan peralihan keadaan menjadi pemindahan langsung nilai dan maklumat antara akaun. Akaun Ethereum mengandungi empat bidang:

- **Nonce**, kaunter yang digunakan untuk memastikan setiap transaksi hanya boleh diproses sekali
- Baki **Ether** semasa akaun
- Akaun **kod kontrak**, jika ada
- Akaun **storan** (kosong secara lalai)

"Ether" merupakan bahan api kripto dalaman utama Ethereum, dan digunakan untuk membayar fi transaksi. Secara umum, terdapat dua jenis akaun: **akaun dimiliki luar**, dikawal oleh kekunci peribadi, dan **akaun kontrak**, dikawal oleh kod kontrak. Akaun yang dimiliki luaran tidak mempunyai kod, dan seseorang boleh menghantar mesej daripada akaun yang dimiliki luaran dengan membuat dan menandatangani transaksi; dalam akaun kontrak, setiap kali akaun kontrak menerima mesej yang diaktifkan kodnya, membolehkannya membaca dan menulis kepada storan dalaman dan menghantar mesej lain atau mencipta kontrak seterusnya.

Perhatikan bahawa "kontrak" dalam Ethereum tidak boleh dilihat sebagai sesuatu yang perlu "dipenuhi" atau "dipatuhi"; sebaliknya, ia lebih seperti "ejen berautonomi" yang hidup di dalam persekitaran pelaksanaan Ethereum, sentiasa melaksanakan sekeping kod tertentu apabila ditandakan oleh mesej atau transaksi, dan mempunyai kawalan langsung ke atas keseimbangan Ether mereka sendiri dan stor utama/nilai mereka sendiri untuk menjejaki pembolehubah yang berterusan.

### Mesej dan Transaksi {#messages-and-transactions}

Istilah "transaksi" digunakan dalam Ethereum untuk merujuk kepada pakej data yang ditandatangani yang menyimpan mesej yang akan dihantar daripada akaun milik luar. Transaksi mengandungi:

- Penerima mesej
- Tandatangan mengenal pasti penghantar
- Jumlah Ether untuk dipindahkan daripada penghantar kepada penerima
- Medan data pilihan
- Nilai `STARTGAS`, yang mewakili bilangan maksimum langkah pengiraan yang dibenarkan untuk diambil oleh pelaksanaan transaksi
- Nilai `GASPRICE` yang mewakili fi yang perlu dibayar oleh penghantar setiap langkah pengiraan

Tiga medan pertama ialah bidang standard yang diharapkan dalam mana-mana mata wang kripto. Medan data tidak mempunyai fungsi secara lalai, tetapi mesin maya mempunyai kod operasi yang boleh digunakan untuk mengakses data; sebagai contoh kes penggunaan, jika kontrak berfungsi sebagai perkhidmatan pendaftaran domain atas blok rantai, maka ia mungkin ingin mentafsirkan data yang diterima sebagai mengandungi dua "medan". Medan pertama ialah domain untuk didaftar dan medan kedua ialah alamat IP untuk didaftarkan. Kontrak akan membaca nilai-nilai ini daripada data mesej dan meletakkan dalam storan dengan sewajarnya.

Medan `STARTGAS` dan `GASPRICE` adalah penting bagi model anti-penafian perkhidmatan Ethereum. Untuk mengelakkan gelung tak terhingga atau berniat jahat atau pembaziran pengiraan lain dalam kod, setiap transaksi perlu menetapkan had bilangan langkah pengiraan pelaksanaan kod yang boleh digunakan. Unit asas pengiraan ialah "gas"; biasanya, langkah pengiraan dikenakan kos 1 gas, tetapi sesetengah operasi menelan kos gas yang lebih tinggi kerana lebih mahal dari segi kuasa pengiraan, atau meningkatkan jumlah data yang mesti disimpan sebagai sebahagian daripada keadaan. Terdapat juga fi 5 gas untuk setiap bait dalam data transaksi. Hasrat sistem fi adalah untuk memerlukan penyerang membayar secara berkadar bagi setiap sumber yang mereka telan, termasuk pengiraan, jalur lebar dan storan; oleh itu, apa-apa transaksi yang menyebabkan rangkaian memakan jumlah yang lebih besar daripada mana-mana sumber-sumber ini mesti mempunyai fi gas kira-kira berkadar dengan kenaikan.

### Mesej {#messages}

Kontrak mempunyai keupayaan untuk menghantar mesej kepada kontrak lain. Mesej ialah objek maya yang tidak pernah bersiri dan wujud hanya dalam persekitaran pelaksanaan Ethereum. Mesej mengandungi:

- Penghantar mesej (implicit)
- Penerima mesej
- Jumlah Ether untuk dipindahkan bersama mesej
- Medan data pilihan
- Nilai `STARTGAS`

Pada asasnya, mesej adalah seperti transaksi, kecuali ia dihasilkan oleh kontrak dan bukan pelaku luaran. Mesej dihasilkan apabila kontrak yang sedang melaksanakan kod itu melaksanakan kod operasi `CALL` yang menghasilkan dan melaksanakan mesej. Seperti transaksi, mesej membawa kepada akaun penerima yang menjalankan kodnya. Oleh itu, kontrak boleh mempunyai hubungan dengan kontrak lain dengan cara yang sama seperti yang boleh dilakukan oleh pelaku luaran.

Ambil perhatian bahawa elaun gas yang diperuntukkan oleh transaksi atau kontrak terpakai kepada jumlah gas yang digunakan oleh transaksi itu dan semua sub-pelaksanaan. Sebagai contoh, jika seorang pelaku luaran A menghantar transaksi kepada B dengan 1000 gas, dan B menggunakan 600 gas sebelum menghantar mesej kepada C, dan pelaksanaan dalaman C menggunakan 300 gas sebelum kembali, maka B boleh menghabiskan 100 lagi gas sebelum kehabisan gas.

### Fungsi Peralihan Keadaan Ethereum {#ethereum-state-transition-function}

![Peralihan keadaan Ether](./ether-state-transition.png)

Fungsi peralihan keadaan Ethereum, `APPLY(S,TX) -> S'` boleh ditakrifkan seperti berikut:

1. Menyemak sama ada transaksi dibentuk dengan baik (iaitu mempunyai bilangan nilai yang betul), tandatangan sah dan nonce sepadan dengan nonce dalam akaun penghantar. Jika tidak, ralat dikembalikan.
2. Menghitung fi transaksi sebagai `STARTGAS * GASPRICE`, dan menentukan alamat penghantaran daripada tandatangan. Menolak fi daripada baki akaun penghantar dan kenaikan nonce penghantar. Jika tidak cukup baki untuk dibelanjakan, ralat dikembalikan.
3. Memulakan `GAS = STARTGAS`, dan memotong kuantiti gas tertentu setiap bait untuk membayar kos bait dalam transaksi.
4. Memindahkan nilai transaksi daripada akaun penghantar ke akaun penerima. Jika akaun penerimaan belum wujud, mencipta akaun itu. Jika akaun penerimaan ialah kontrak, menjalankan kod kontrak sama ada hingga selesai atau sehingga pelaksanaan itu kehabisan gas.
5. Jika pemindahan nilai gagal kerana penghantar tidak mempunyai wang yang mencukupi, atau pelaksanaan kod kehabisan gas, memulihkan semua perubahan keadaan kecuali bayaran fi, dan menambah fi ke akaun pelombong.
6. Jika tidak, mengembalikan fi untuk semua gas yang tinggal kepada penghantar, dan menghantar fi yang dibayar bagi gas yang digunakan kepada pelombong.

Contohnya, andaikan bahawa kod kontrak ialah:

```py
if !self.storage[calldataload(0)]:
  self.storage[calldataload(0)] = calldataload(32)
```

Ambil perhatian bahawa pada hakikatnya kod kontrak ditulis dalam kod EVM peringkat rendah; contoh ini ditulis dalam Serpent, salah satu bahasa peringkat tinggi kami, untuk kejelasan, dan boleh disusun ke kod EVM. Andaikan bahawa storan kontrak bermula kosong, dan transaksi dihantar dengan 10 nilai Ether, 2000 gas, 0.001 Ether harga gas, dan 64 bait data, dengan bait 0-31 mewakili nombor `2` dan bait 32-63 mewakili rentetan `CHARLIE`. Proses untuk fungsi peralihan keadaan dalam kes ini ialah seperti berikut:

1. Menyemak bahawa transaksi itu sah dan terbentuk dengan baik.
2. Menyemak bahawa penghantar transaksi mempunyai sekurang-kurangnya 2000 \* 0.001 = 2 Ether. Jika demikian, menolak 2 Ether daripada akaun penghantar.
3. Memulakan gas = 2000; jika diandaikan bahawa transaksi ialah sepanjang 170 bait dan fi bait ialah 5, menolak 850 supaya terdapat 1150 gas yang tinggal.
4. Menolak 10 lagi Ether daripada akaun penghantar, dan menambahnya ke akaun kontrak.
5. Menjalankan kod. Dalam kes ini, ini mudah: ia menyemak jika storan kontrak di indeks `2` digunakan, menyedari bahawa bukan demikian, dan oleh itu menetapkan storan di indeks `2` kepada nilai `CHARLIE`. Andaikan ini mengambil 187 gas, jadi jumlah gas yang selebihnya ialah 1150 - 187 = 963
6. Menambah 963 \* 0.001 = 0.963 Ether kembali ke akaun penghantar, dan mengembalikan keadaan yang terhasil.

Jika tiada kontrak pada akhir penerimaan transaksi, maka jumlah fi transaksi hanya akan sama dengan `GASPRICE` yang diberikan, didarabkan dengan panjang transaksi dalam bait, dan data yang dihantar bersama-sama transaksi itu tidak relevan.

Ambil perhatian bahawa mesej berfungsi setara dengan transaksi dari segi pembalikan: jika pelaksanaan mesej kehabisan gas, maka pelaksanaan mesej itu, dan semua pelaksanaan lain yang dicetuskan oleh pelaksanaan itu, dibalikkan, tetapi pelaksanaan induk tidak perlu dibalikkan. Ini bermakna bahawa ia adalah "selamat" bagi kontrak untuk memanggil kontrak lain, seolah-olah A memanggil B dengan G gas, kemudian pelaksanaan A dijamin kehilangan maksimum G gas. Akhir sekali, ambil perhatian bahawa terdapat satu kod operasi, `CREATE`, yang mencipta kontrak; mekanik pelaksanaannya biasanya serupa dengan `CALL`, dengan pengecualian bahawa output pelaksanaan menentukan kod kontrak yang baru dicipta.

### Pelaksanaan Kod {#code-execution}

Kod dalam kontrak Ethereum ditulis dalam bahasa bytecode berasaskan tindanan tahap rendah, yang disebut sebagai "kod mesin maya Ethereum" atau "kod EVM". Kod ini terdiri daripada satu siri bait, di mana setiap bait mewakili operasi. Secara umum, pelaksanaan kod ialah gelung tak terhingga yang terdiri daripada pelaksanaan operasi berulang kali di pembilang program semasa (yang bermula pada sifar) dan kemudian meningkatkan pembilang program dengan satu, sehingga mencapai penghujung kod atau ralat atau arahan `STOP` atau `RETURN` dikesan. Operasi ini mempunyai akses kepada tiga jenis ruang di mana untuk menyimpan data:

- **Tindanan**, bekas masuk terakhir, keluar dahulu yang nilainya boleh ditolak dan muncul
- **Ingatan**, iaitu tatasusunan bait yang boleh dikembangkan tak terhingga
- **Storan** jangka panjang kontrak, iaitu stor kekunci/nilai. Bukan seperti tindanan dan ingatan, yang diset semula selepas pengiraan berakhir, storan berterusan untuk jangka panjang.

Kod juga boleh mencapai nilai, penghantar dan data mesej masuk, serta data pengepala blok, dan kod juga boleh mengembalikan tatasusunan bait data sebagai output.

Model pelaksanaan formal kod EVM adalah mudah. Walaupun mesin maya Ethereum berjalan, keadaan pengiraan penuh boleh ditakrifkan oleh tuple `(block_state, transaction, message, code, memory, stack, pc, gas)`, di mana `block_state` ialah keadaan global yang mengandungi semua akaun dan termasuk baki dan storan. Pada permulaan setiap pusingan pelaksanaan, arahan semasa ditemui dengan mengambil `pc`th bait `code` (atau 0 jika `pc >= len(code)`), dan setiap arahan mempunyai definisi sendiri dari segi kesan kepada tuple. Sebagai contoh, `ADD` pop dua item daripada tindanan dan menolak jumlah item itu, mengurangkan `gas` sebanyak 1 dan kenaikan `pc` sebanyak 1, dan `SSTORE` pop dua item tertinggi daripada tindanan dan memasukkan item kedua ke dalam storan kontrak di indeks yang dinyatakan oleh item pertama. Walaupun terdapat banyak cara untuk mengoptimumkan pelaksanaan mesin maya Ethereum melalui kompilasi sesempat masa, pelaksanaan asas Ethereum boleh dilakukan dalam beberapa ratus baris kod.

### Blok rantai dan Perlombongan {#blockchain-and-mining}

![Ethereum diagram blok gunaan](./ethereum-apply-block-diagram.png)

Blok rantai Ethereum banyak persamaan dengan blok rantai Bitcoin, namun ia mempunyai beberapa perbezaan. Perbezaan utama antara Ethereum dan Bitcoin berkenaan dengan seni bina blok rantai adalah bahawa, bukan seperti Bitcoin, blok Ethereum mengandungi salinan senarai transaksi dan juga keadaan yang paling terkini. Selain daripada itu, dua nilai lain, nombor blok dan kesukaran, juga disimpan dalam blok. Algoritma pengesahan blok asas di Ethereum ialah seperti berikut:

1. Menyemak sama ada blok sebelumnya yang dirujuk wujud dan sah.
2. Menyemak bahawa cap masa blok adalah lebih daripada blok sebelumnya yang dirujuk dan kurang daripada 15 minit ke masa akan datang
3. Menyemak bahawa nombor blok, kesukaran, akar transaksi, akar pakcik dan had gas (pelbagai konsep khusus Ethereum peringkat rendah) adalah sah.
4. Semak bahawa bukti kerja pada blok adalah sah.
5. Biarkan `S[0]` menjadi keadaan pada akhir blok sebelumnya.
6. Membiarkan `TX` menjadi senarai transaksi blok, dengan `n` transaksi. Untuk semua `i` dalam `0...n-1`, set `S[i+1] = APPLY(S[i],TX[i])`. Jika mana-mana aplikasi mengembalikan ralat, atau jika jumlah gas yang digunakan dalam blok sehingga masa ini melebihi `GASLIMIT`, ralat dikembalikan.
7. Membiarkan `S_FINAL` menjadi `S[n]`, tetapi menambah ganjaran blok yang dibayar kepada pelombong.
8. Menyemak sama ada akar pohon Merkle keadaan `S_FINAL` sama dengan akar keadaan akhir yang disediakan dalam pengepala blok. Jika demikian, blok sah; jika tidak, ia tidak sah.

Pendekatan mungkin kelihatan sangat tidak cekap pada pandangan pertama, kerana ia perlu menyimpan seluruh keadaan dengan setiap blok, tetapi pada hakikatnya keefisienan harus setanding dengan Bitcoin. Sebabnya ialah keadaan ini disimpan dalam struktur pohon, dan selepas setiap blok hanya sebahagian kecil pohon perlu diubah. Oleh itu, secara umumnya, di antara dua blok bersebelahan sebahagian besar pohon haruslah sama, dan oleh itu data boleh disimpan sekali dan dirujuk dua kali menggunakan penuding (iaitu cincangan of subpohon). Sebuah jenis pohon khas yang dikenali sebagai "pohon Patricia" digunakan untuk mencapai ini, termasuk pengubahsuaian kepada konsep pohon Merkle yang membolehkan nod dimasukkan dan dipadam, dan bukan sahaja berubah, dengan efisien. Selain itu, oleh sebab semua maklumat keadaan adalah sebahagian daripada blok terakhir, tidak perlu menyimpan keseluruhan sejarah blok rantai - strategi yang, jika boleh digunakan untuk Bitcoin, dapat dikira untuk menyediakan penjimatan 5-20x ruang.

Satu soalan yang biasa ditanya ialah "di mana" kod kontrak dilaksanakan, dari segi perkakasan fizikal. Ini mempunyai jawapan yang mudah: proses melaksanakan kod kontrak adalah sebahagian daripada definisi fungsi peralihan keadaan, yang merupakan sebahagian daripada algoritma pengesahan blok, jadi jika transaksi ditambah ke blok `B` pelaksanaan kod yang dihasilkan oleh transaksi itu akan dilaksanakan oleh semua nod, sekarang dan pada masa akan datang, yang memuat turun dan mengesahkan blok `B`.

## Aplikasi {#applications}

Secara umum, terdapat tiga jenis aplikasi di atas Ethereum. Kategori pertama ialah aplikasi kewangan, menyediakan pengguna dengan cara yang lebih berkuasa untuk menguruskan dan mengikat kontrak menggunakan wang mereka. Ini termasuk sub-matawang, derivatif kewangan, kontrak lindung nilai, dompet simpanan, wasiat, dan akhirnya beberapa kelas kontrak pekerjaan berskala penuh. Kategori kedua ialah aplikasi separa kewangan, di mana wang terlibat tetapi terdapat juga bahagian bukan monetari berat untuk perkara yang sedang dilakukan; contohnya baunti yang dikuat kuasa secara kendiri untuk penyelesaian masalah pengiraan. Akhirnya, terdapat aplikasi seperti pengundian dalam talian dan tadbir urus ternyahpusat yang bukan bersifat kewangan sama sekali.

### Sistem Token {#token-systems}

Sistem token di blok rantai mempunyai banyak aplikasi sama ada sub-matawang yang mewakili aset seperti USD atau emas kepada saham syarikat, token individu yang mewakili harta pintar, kupon selamat yang tidak boleh dipalsukan, dan malah terdapat sistem token tanpa nilai konvensional, digunakan sebagai sistem titik untuk insentif. Sistem Token sebenarnya mudah untuk dilaksanakan dalam Ethereum. Hal utama yang perlu difahami adalah bahawa semua mata wang, atau sistem token, pada dasarnya ialah sebuah pangkalan data dengan satu operasi: menolak X unit dari A dan memberikan X unit kepada B, dengan proviso bahawa (i) A mempunyai sekurang-kurangnya X unit sebelum transaksi dan (2) transaksi diluluskan oleh A. Untuk melaksanakan sistem token, anda hanya perlu melaksanakan logik ini ke dalam kontrak.

Kod asas untuk melaksanakan sistem token di Serpent kelihatan seperti berikut:

```py
def send(to, value):
  if self.storage[msg.sender] >= value:
    self.storage[msg.sender] = self.storage[msg.sender] - value
    self.storage[to] = self.storage[to] + value
```

Ini pada dasarnya merupakan pelaksanaan literal bagi fungsi peralihan keadaan "sistem perbankan" yang diterangkan lebih lanjut di atas dalam dokumen ini. Beberapa baris tambahan kod perlu ditambah untuk menyediakan langkah awal mengedar unit mata wang dahulu dan beberapa kes pinggiran lain, dan sebaik-baiknya fungsi akan ditambah untuk membiarkan kontrak lain membuat pertanyaan bagi baki sesuatu alamat. Tetapi itu sahaja yang perlu difahami. Secara teorinya, sistem token berasaskan Ethereum yang bertindak sebagai sub-matawang berpotensi termasuk satu lagi ciri penting yang tiada bagi mata wang meta berasaskan Bitcoin atas rantaian: keupayaan untuk membayar fi transaksi terus dengan mata wang itu. Cara ini boleh dilaksanakan adalah bahawa kontrak akan mengekalkan baki Ether yang akan digunakan untuk membayar alik Ether yang terlibat dalam pembayaran fi kepada penghantar, dan ia akan mengisi semula baki ini dengan mengumpul unit mata wang dalaman yang dipungut daripada fi dan menjualnya dalam lelongan berterusan. Oleh itu, pengguna perlu "mengaktifkan" akaun mereka dengan Ether, tetapi apabila Ether berada di sana ia boleh diguna semula kerana kontrak akan membayar balik setiap kali.

### Derivatif kewangan dan Mata wang Nilai stabil {#financial-derivatives-and-stable-value-currencies}

Derivatif kewangan ialah aplikasi yang paling biasa bagi "kontrak pintar", dan salah satu yang paling mudah untuk dilaksanakan dalam kod. Cabaran utama dalam melaksanakan kontrak kewangan adalah bahawa kebanyakan kontrak tersebut memerlukan rujukan kepada penanda harga luaran; sebagai contoh, aplikasi yang sangat diingini ialah kontrak pintar yang melindung nilai terhadap ketidaktentuan Ether (atau mata wang kripto lain) berhubung dengan dolar AS, tetapi melakukan ini memerlukan kontrak untuk mengetahui nilai ETH/USD. Cara paling mudah untuk melakukan ini ialah melalui kontrak "suapan data" yang dikekalkan oleh pihak tertentu (contohnya NASDAQ) direka supaya pihak itu mempunyai keupayaan untuk mengemas kini kontrak seperti yang diperlukan, dan menyediakan antara muka yang membolehkan kontrak lain menghantar mesej kepada kontrak itu dan mendapatkan kembali respons yang menyediakan harga.

Dengan bahan kritikal tersebut, kontrak lindung nilai akan kelihatan seperti berikut:

1. Menunggu parti A untuk memasukkan 1000 Ether.
2. Menunggu parti B untuk memasukkan 1000 Ether.
3. Mencatatkan rekod nilai USD 1000 Ether, dikira dengan menanyakan kontrak suapan data, dalam storan, andaikan ini ialah $x.
4. Selepas 30 hari, membenarkan A atau B untuk "mengaktifkan semula" kontrak untuk menghantar Ether bernukau $x (dikira dengan menanyakan kontrak suapan data sekali lagi untuk mendapatkan harga baru) kepada A dan selebihnya kepada B.

Kontrak sedemikian akan mempunyai potensi besar dalam perdagangan kripto. Salah satu masalah utama yang dibincang tentang mata wang kripto adalah bahawa ia bersifat naik turun; walaupun ramai pengguna dan saudagar mungkin mahu keselamatan dan kemudahan berurusan dengan aset kriptografi, ramai yang tidak mahu menghadapi kemungkinan kehilangan 23% daripada nilai dana mereka dalam satu hari. Sehingga kini, penyelesaian yang paling biasa dicadangkan ialah aset bersandarkan pengeluar; ideanya ialah pengeluar mencipta sub-mata wang di mana mereka mempunyai hak untuk mengeluarkan dan membatalkan unit, dan menyediakan satu unit mata wang kepada sesiapa yang memberi mereka (luar talian) dengan satu unit aset pendasar yang ditentukan (contohnya emas, USD). Penerbit kemudian berjanji untuk menyediakan satu unit aset pendasar kepada sesiapa yang menghantar kembali satu unit aset kripto. Mekanisme ini membolehkan sebarang aset bukan kriptografi untuk "diangkat" ke dalam aset kriptografi, dengan syarat bahawa pengeluar itu boleh dipercayai.

Walau bagaimanapun, dalam amalan sebenar, pengeluar tidak sentiasa boleh dipercayai, dan dalam beberapa kes infrastruktur perbankan terlalu lemah, atau terlalu bersikap menentang, untuk membolehkan kewujudan perkhidmatan sedemikian. Derivatif kewangan menyediakan alternatif. Di sini, bukan pengeluar tunggal yang menyediakan dana untuk membuat sandaran aset, sebaliknya, pasaran spekulator yang ternyahpusat akan memainkan peranan itu, membuat pertaruhan bahawa harga aset rujukan kriptografi (contohnya ETH) akan naik. Tidak seperti pengeluar, spekulator tidak mempunyai pilihan untuk mungkir berhubung dengan perjanjian tersebut kontrak lindung nilai memegang dana mereka dalam eskrow. Ambil perhatian bahawa pendekatan ini tidak ternyahpusat sepenuhnya, kerana sumber yang dipercayai masih diperlukan untuk menyediakan penanda harga, walaupun ini dikatakan masih merupakan peningkatan besar dari segi mengurangkan keperluan infrastruktur (bukan seperti pengeluar, mengeluarkan suapan harga tidak memerlukan lesen dan boleh dikategorikan sebagai pertuturan bebas) dan mengurangkan potensi untuk penipuan.

### Sistem Identiti dan Reputasi {#identity-and-reputation-systems}

Mata wang kripto alternatif yang terawal, [Namecoin](http://namecoin.org/), cuba menggunakan blok rantai seperti Bitcoin untuk menyediakan sistem pendaftaran nama, iaitu pengguna boleh mendaftar nama mereka dalam pangkalan data awam bersama data lain. Kes penggunaan utama yang dipetik adalah untuk sistem [DNS](https://wikipedia.org/wiki/Domain_Name_System), nama domain pemetaan seperti "bitcoin.org" (atau, dalam kes Namecoin, "bitcoin.bit") ke alamat IP. Kes penggunaan lain termasuk pengesahan e-mel dan sistem reputasi yang berpotensi lebih maju. Berikut ialah kontrak asas untuk menyediakan sistem pendaftaran nama seperti Namecoin di Ethereum:

```py
def register(name, value):
  if !self.storage[name]:
    self.storage[name] = value
```

Kontrak ini sangat mudah; semua itu ialah pangkalan data dalam rangkaian Ethereum yang boleh ditambah data, tetapi tidak diubah suai atau dikeluarkan daripadanya. Sesiapa sahaja boleh mendaftar nama dengan beberapa nilai, dan pendaftaran itu kemudian melekat selama-lamanya. Kontrak pendaftaran nama yang lebih canggih juga akan mempunyai "klausa fungsi" yang membolehkan kontrak lain untuk menanyakannya, serta mekanisme bagi "pemilik" (iaitu pendaftar pertama) nama untuk menukar data atau pemilikan pemindahan. Seseorang juga boleh menambah reputasi dan fungsi web boleh dipercayai di bahagian atas.

### Storan Fail Ternyahpusat {#decentralized-file-storage}

Sepanjang beberapa tahun yang lalu, muncul beberapa permulaan storan fail dalam talian yang popular, iaitu paling menonjol ialah Dropbox, mencari untuk membenarkan pengguna memuat naik sandaran pemacu keras mereka dan mempunyai perkhidmatan menyimpan sandaran dan membolehkan pengguna mengaksesnya sebagai pertukaran untuk yuran bulanan. Walau bagaimanapun, pada ketika ini pasaran storan fail pada masa yang agak tidak cekap; melihat sepintas lalu pelbagai penyelesaian sedia ada menunjukkan bahawa, terutamanya pada tahap "lembah luar biasa" 20-200 GB iaitu tiada kuota percuma atau diskaun tahap syarikat bermula, harga bulanan untuk kos storan fail arus perdana adalah sedemikian rupa sehingga anda membayar lebih daripada kos keseluruhan pemacu keras dalam satu bulan. Kontrak Ethereum boleh membenarkan pembangunan ekosistem storan fail yang terdesentralisasi, iaitu pengguna individu boleh mendapatkan kuantiti kecil wang dengan menyewa pemacu keras mereka sendiri dan ruang yang tidak digunakan boleh digunakan untuk terus memacu pengurangan kos storan fail.

Perkara utama yang menyokong peranti sedemikian ialah sesuatu yang kami namakan sebagai "kontrak Dropbox terdesentralisasi". Kontrak ini berfungsi seperti berikut. Pertama, satu membahagikan data yang diingini kepada blok, menyulitkan setiap blok untuk privasi, dan membina pokok Merkle daripadanya. Kemudian, seseorang membuat kontrak dengan peraturan bahawa, setiap blok N, kontrak akan memilih indeks rawak di pokok Merkle (menggunakan cincangan blok sebelumnya, boleh diakses daripada kod kontrak, sebagai sumber rawak), dan memberikan X Ether kepada entiti pertama untuk membekalkan entiti pertama dengan bukti pengesahan pembayaran seperti pengesahan pemilikan blok pada indeks tertentu di pokok itu. Apabila pengguna mahu memuat turun semula fail mereka, mereka boleh menggunakan protokol saluran mikrobayaran (contohnya membayar 1 szabo setiap 32 kilobait) untuk memulihkan fail; pendekatan yang paling cekap bayaran adalah untuk pembayar tidak menerbitkan transaksi sehingga akhir, sebaliknya menggantikan transaksi dengan yang lebih menguntungkan dengan nonce yang sama selepas setiap 32 kilobait.

Satu ciri penting protokol ialah, walaupun ia mungkin kelihatan seperti seseorang mempercayai banyak nod rawak tidak membuat keputusan untuk melupakan fail, seseorang boleh mengurangkan risiko itu kepada hampir sifar dengan membahagikan fail kepada banyak keping melalui perkongsian rahsia, dan menonton kontrak untuk melihat setiap keping masih dalam pemilikan beberapa nod. Jika kontrak masih membayar wang, iaitu menyediakan bukti kriptografi bahawa seseorang di luar sana masih menyimpan fail.

### Organisasi Autonomi Terdesentralisasi {#decentralized-autonomous-organizations}

Konsep umum "organisasi autonomi terdesentralisasi ialah entiti maya yang mempunyai" set tertentu ahli atau pemegang saham yang, mungkin dengan majoriti 67%, mempunyai hak untuk membelanjakan dana entiti dan mengubah suai kodnya. Ahli secara kolektif memutuskan cara organisasi perlu memperuntukkan dana. Kaedah untuk memperuntukkan dana DAO boleh terdiri daripada ganjaran, gaji kepada mekanisme yang lebih eksotik seperti mata wang dalaman untuk kerja ganjaran. Ini pada dasarnya meniru perangkap undang-undang syarikat tradisional atau bukan keuntungan tetapi menggunakan hanya teknologi blok rantai kriptografi untuk penguatkuasaan. Setakat ini banyak perbincangan tentang DAO telah wujud di sekitar model "kapitalis" bagi "perbadanan autonomi terdesentralisasi" (DAC) dengan pemegang saham menerima dividen dan saham yang boleh didagangkan; sebagai alternatif, mungkin digambarkan sebagai "komuniti autonomi terdesentralisasi", iaitu semua ahli akan mempunyai bahagian yang sama dalam membuat keputusan dan memerlukan 67% daripada ahli sedia ada untuk bersetuju menambah atau mengeluarkan ahli. Keperluan bahawa seseorang hanya boleh mempunyai satu keahlian kemudian perlu dikuatkuasakan secara kolektif oleh kumpulan.

Panduan umum untuk cara mengekod DAO adalah seperti berikut. Reka bentuk yang paling mudah ialah sekeping kod pengubahsuaian diri yang berubah jika dua pertiga ahli bersetuju dengan perubahan. Walaupun kod secara teori tidak boleh diubah, seseorang boleh mengatasi masalah ini dengan mudah dan mempunyai mutabiliti de-facto dengan mempunyai ketulan kod dalam kontrak berasingan, dan mempunyai alamat kontrak untuk dipanggil yang disimpan dalam storan yang boleh diubah suai. Dalam pelaksanaan mudah kontrak DAO itu, terdapat tiga jenis transaksi, dibezakan oleh data yang diberikan dalam transaksi:

- `[0,i,K,V]` untuk mendaftar cadangan dengan indeks `i` untuk menukar alamat pada indeks storan `K` kepada nilai `V`
- `[1,i]` untuk mendaftar undi memihak kepada cadangan `i`
- `[2,i]` untuk memuktamadkan cadangan `i` jika undi yang mencukupi telah dibuat

Kontrak itu kemudian akan mempunyai klausa bagi setiap satu daripada ini. Ia akan mengekalkan rekod semua perubahan storan terbuka, bersama dengan senarai yang mengundi mereka. Ia juga akan mempunyai senarai semua ahli. Apabila sebarang perubahan storan mendapat dua pertiga daripada ahli mengundi untuk itu, transaksi yang memuktamadkan boleh melaksanakan perubahan itu. Rangka yang lebih canggih juga akan mempunyai keupayaan mengundi terbina dalam untuk ciri-ciri seperti menghantar transaksi, menambah ahli dan mengeluarkan ahli, dan juga boleh menyediakan wakil undi gaya [Demokrasi Cecair](https://wikipedia.org/wiki/Liquid_democracy) (iaitu sesiapa sahaja boleh menugaskan seseorang untuk mengundi mereka, dan tugasan adalah transitif jadi jika A menugaskan B dan B menugaskan C, maka C menentukan undi A). Reka bentuk ini akan membolehkan DAO berkembang secara organik sebagai komuniti terdesentralisasi, membolehkan orang ramai akhirnya mewakilkan tugas penapisan ahli kepada pakar, walaupun tidak seperti dalam "sistem semasa", pakar boleh dengan mudah muncul dan keluar dari masa ke masa apabila ahli komuniti individu mengubah penjajaran mereka.

Model alternatif adalah untuk sebuah syarikat terdesentralisasi, iaitu mana-mana akaun boleh mempunyai sifar atau lebih saham, dan dua pertiga saham diperlukan untuk membuat keputusan. Rangka lengkap akan melibatkan fungsi pengurusan aset, keupayaan untuk membuat tawaran membeli atau menjual saham, dan keupayaan untuk menerima tawaran (sebaik-baiknya dengan mekanisme pemadanan pesanan dalam kontrak). Delegasi juga akan wujud gaya Demokrasi Cecair, menyamaratakan konsep a "lembaga pengarah".

### Permohonan Tambahan {#further-applications}

**1. Dompet simpanan**. Katakan bahawa Alice mahu menyimpan dana dengan selamat, tetapi bimbang bahawa dia akan kehilangannya atau seseorang akan menggodam kunci peribadi dia. Dia meletakkan Ether dalam kontrak dengan Bob, bank, seperti berikut:

- Alice sahaja boleh mengeluarkan maksimum 1% daripada dana setiap hari.
- Bob sahaja boleh mengeluarkan maksimum 1% daripada dana setiap hari, tetapi Alice mempunyai keupayaan untuk membuat transaksi dengan kunci dia menutup keupayaan ini.
- Alice dan Bob bersama-sama boleh mengeluarkan apa-apa sahaja.

Biasanya, 1% sehari cukup untuk Alice, dan jika Alice mahu membuat pengeluaran lebih banyak, dia boleh menghubungi Bob untuk mendapatkan bantuan. Jika kunci Alice digodam, dia berlari ke arah Bob untuk memindahkan dana ke kontrak baharu. Jika dia kehilangan kunci, Bob akan mengeluarkan dana itu akhirnya. Jika Bob rupa-rupanya berniat jahat, maka dia boleh mematikan keupayaannya untuk membuat pengeluaran.

**2. Insurans tanaman**. Seseorang boleh dengan mudah membuat kontrak derivatif kewangan tetapi menggunakan suapan data cuaca dan bukannya sebarang indeks harga. Jika seorang petani di Iowa membeli terbitan yang membayar keluar secara songsang berdasarkan kerpasan di Iowa, maka jika terdapat kemarau, petani akan menerima wang secara automatik dan jika terdapat hujan yang mencukupi, petani akan gembira kerana tanaman mereka akan tumbuh subur. Ini boleh diperluaskan kepada insurans bencana alam secara amnya.

**3. Suapan data terdesentralisasi**. Bagi kontrak kewangan untuk perbezaan, ia sebenarnya mungkin untuk mendesentralisasikan suapan data melalui protokol dipanggil "[SchellingCoin](http://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/)". SchellingCoin pada dasarnya berfungsi seperti berikut: N pihak semua dimasukkan ke sistem nilai datum yang diberikan (contohnya harga ETH/USD), nilai-nilai diisih, dan semua orang antara persentil ke-25 dan ke-75 mendapat satu token sebagai ganjaran. Setiap orang mempunyai insentif untuk memberikan jawapan yang orang lain akan sediakan, dan satu-satunya nilai yang sebilangan besar pemain boleh bersetuju secara realistik ialah lalai yang jelas: kebenaran. Ini mewujudkan protokol terdesentralisasi yang secara teori boleh memberikan sebarang bilangan nilai, termasuk harga ETH/USD, suhu di Berlin atau malah hasil daripada pengiraan keras tertentu.

**4. Eskrow pelbagai tandatangan pintar**. Bitcoin membolehkan kontrak transaksi pelbagai tandatangan iaitu, sebagai contoh, tiga daripada lima kekunci yang diberikan boleh membelanjakan dana. Ethereum membolehkan lebih banyak kebutiran; sebagai contoh, empat daripada lima boleh membelanjakan segala-galanya, tiga daripada lima boleh membelanjakan sehingga 10% sehari, dan dua daripada lima boleh membelanjakan sehingga 0.5% sehari. Selain itu, Ethereum berbilang tandatangan adalah tidak segerak - dua pihak boleh mendaftar tandatangan mereka di blok rantai pada masa yang berbeza dan tandatangan terakhir akan menghantar transaksi secara automatik.

**5. Pengkomputeran awan**. Teknologi EVM juga boleh digunakan untuk mewujudkan persekitaran pengkomputeran yang boleh disahkan, membolehkan pengguna meminta orang lain untuk menjalankan pengkomputeran dan kemudian secara pilihan meminta bukti bahawa pengkomputeran di pusat pemeriksaan tertentu yang dipilih secara rawak telah dilakukan dengan betul. Ini membolehkan penciptaan pasaran pengkomputeran awan iaitu mana-mana pengguna boleh mengambil bahagian dengan desktop, komputer riba atau pelayan khusus mereka, dan semakan mengejut bersama-sama deposit keselamatan boleh digunakan untuk memastikan bahawa sistem itu boleh dipercayai (iaitu nod tidak boleh menipu). Walaupun sistem sedemikian mungkin tidak sesuai untuk semua tugas; tugas-tugas yang memerlukan tahap komunikasi antara proses yang tinggi, sebagai contoh, tidak boleh dengan mudah dilakukan pada awan besar nod. Tugas-tugas lain, bagaimanapun, lebih mudah untuk selari; projek-projek seperti SETI@home, folding@home dan algoritma genetik boleh dilaksanakan dengan mudah di atas platform sedemikian.

**6. Perjudian rakan setara**. Sebarang bilangan protokol perjudian rakan setara, seperti [Cyberdice](http://www.cl.cam.ac.uk/~fms27/papers/2008-StajanoCla-cyberdice.pdf) Frank Stajano dan Richard Clayton, boleh dilaksanakan pada blok rantai Ethereum. Protokol perjudian yang paling mudah sebenarnya hanya merupakan kontrak untuk perbezaan pada cincangan blok seterusnya, dan protokol yang lebih maju boleh dibina dari sana, mewujudkan perkhidmatan perjudian dengan yuran hampir sifar yang tidak mempunyai keupayaan untuk menipu.

**7. Pasaran ramalan**. Dengan syarat oracle atau SchellingCoin, pasaran ramalan juga mudah dilaksanakan, dan pasaran ramalan bersama-sama SchellingCoin mungkin terbukti menjadi aplikasi arus perdana pertama iaitu [futarchy](http://hanson.gmu.edu/futarchy.html) sebagai protokol tadbir urus bagi organisasi terdesentralisasi.

**8. Pasaran terdesentralisasi pada rantaian**, menggunakan sistem identiti dan reputasi sebagai asas.

## Pelbagai Dan Kebimbangan {#miscellanea-and-concerns}

### Pelaksanaan GHOST yang diubah suai {#modified-ghost-implementation}

Protokol "Greedy Heaviest Observed Subtree" (GHOST) ialah inovasi pertama yang diperkenalkan oleh Yonatan Sompolinsky dan Aviv Zohar pada [Disember 2013](https://eprint.iacr.org/2013/881.pdf). Motivasi di sebalik GHOST ialah blok rantai dengan masa pengesahan cepat kini menderita akibat pengurangan keselamatan kerana kadar basi yang tinggi - kerana blok mengambil masa tertentu untuk disebarkan melalui rangkaian, jika pelombong A melombong blok dan kemudian pelombong B melombong blok lain sebelum blok pelombong A merambat kepada B, blok pelombong B akan akhirnya dibazirkan dan tidak akan menyumbang kepada keselamatan rangkaian. Tambahan pula, terdapat isu pemusatan: jika pelombong A ialah kumpulan perlombongan dengan 30% kuasa cincangan dan B mempunyai 10% kuasa cincangan, A akan mempunyai risiko menghasilkan blok basi 70% daripada masa (sejak 30% masa A yang lain menghasilkan blok terakhir dan sebagainya akan mendapat data perlombongan serta-merta) manakala B akan mempunyai risiko menghasilkan blok basi 90% daripada masa. Oleh itu, jika selang blok cukup pendek untuk kadar basi menjadi tinggi, A akan lebih cekap hanya dengan keutamaan daripada saiznya. Dengan kedua-dua kesan ini digabungkan, blok rantai yang menghasilkan blok dengan cepat mungkin membawa kepada satu kumpulan perlombongan yang mempunyai peratusan cukup besar bagi kuasa cincangan rangkaian untuk mempunyai kawalan de facto ke atas proses perlombongan.

Seperti yang diterangkan oleh Sompolinsky dan Zohar, GHOST menyelesaikan isu pertama kehilangan keselamatan rangkaian dengan memasukkan blok-blok basi dalam pengiraan yang mempunyai rantai terpanjang; iaitu, bukan sahaja ibu bapa dan nenek moyang selanjutnya, tetapi juga keturunan basi nenek moyang blok (dalam jargon Ethereum, "bapa saudara") ditambah kepada pengiraan yang menentukan blok yang bersandarkan jumlah bukti kerja terbesar. Untuk menyelesaikan isu kedua bias pemusatan, kami melangkaui protokol yang diterangkan oleh Sompolinsky dan Zohar, dan juga menyediakan ganjaran blok kepada basi: blok basi menerima 87.5% daripada ganjaran asasnya, dan anak saudara yang termasuk blok basi menerima baki 12.5%. Fi transaksi, bagaimanapun, tidak diberikan kepada bapa saudara.

Ethereum melaksanakan versi mudah GHOST yang hanya turun tujuh tahap. Khususnya, ia ditakrifkan seperti berikut:

- Blok mesti menyatakan ibu bapa, dan ia mesti menyatakan 0 atau lebih bapa saudara
- Seorang bapa saudara termasuk dalam blok B mesti mempunyai sifat-sifat berikut:
  - Ia mesti merupakan anak langsung daripada nenek moyang generasi ke-k, iaitu 2 <= k <= 7.
  - Ia tidak boleh menjadi nenek moyang B
  - Pakcik mesti merupakan pengepala blok yang sah, tetapi tidak perlu menjadi blok yang disahkan atau bahkan sah sebelum ini
  - Seorang bapa saudara mesti berbeza daripada semua bapa saudara yang termasuk dalam blok sebelumnya dan semua bapa saudara lain termasuk dalam blok yang sama (tidak termasuk dua kali ganda)
- Bagi setiap bapa saudara U dalam blok B, pelombong B mendapat tambahan 3.125% ditambah kepada ganjaran coinbase dan pelombong U mendapat 93.75% daripada ganjaran coinbase standard.

Versi terhad GHOST ini, dengan bapa saudara yang boleh dimasukkan hanya sehingga 7 generasi, telah digunakan untuk dua sebab. Pertama, GHOST tanpa had akan memasukkan terlalu banyak komplikasi dalam pengiraan yang bapa saudara bagi blok tertentu adalah sah. Kedua, GHOST tanpa had dengan pampasan seperti yang digunakan dalam Ethereum mengeluarkan insentif untuk pelombong kepada lombong pada rantaian utama dan bukan rantaian penyerang awam.

### Yuran {#fees}

Oleh sebab setiap transaksi yang diterbitkan dalam blok rantai mengenakan kos yang diperlukan untuk memuat turun dan mengesahkannya pada rangkaian, terdapat keperluan untuk beberapa mekanisme kawal selia, biasanya melibatkan fi transaksi, untuk mengelakkan penyalahgunaan. Pendekatan lalai, yang digunakan dalam Bitcoin, adalah untuk mempunyai yuran sukarelawan semata-mata, bergantung kepada pelombong untuk bertindak sebagai penjaga pintu dan menetapkan minimum dinamik. Pendekatan ini telah diterima sangat baik dalam komuniti Bitcoin terutamanya kerana ia "berasaskan pasaran", membolehkan bekalan dan permintaan antara pelombong dan penghantar transaksi menentukan harga. Walau bagaimanapun, masalah dengan jalan fikiran ini ialah pemprosesan transaksi bukanlah pasaran; walaupun menarik secara intuitif untuk mentafsirkan pemprosesan transaksi sebagai perkhidmatan yang ditawarkan oleh pelombong kepada penghantar, pada hakikatnya setiap transaksi yang disertakan oleh pelombong perlu diproses oleh setiap nod dalam rangkaian, jadi sebahagian besar daripada kos pemprosesan transaksi ditanggung oleh pihak ketiga dan bukan pelombong yang membuat keputusan sama ada untuk memasukkannya atau tidak. Oleh itu, masalah tragedi biasa amat mungkin berlaku.

Walau bagaimanapun, kerana ternyata kecacatan ini dalam mekanisme berasaskan pasaran, apabila diberikan andaian mudah tertentu yang tidak tepat, secara ajaib membatalkan dirinya sendiri. Argumen adalah seperti berikut. Katakan bahawa:

1. Urus niaga membawa kepada operasi `k`, menawarkan ganjaran `kR` menawarkan ganjaran `R` ditetapkan oleh penghantar dan `k` dan `R` boleh dilihat (secara kasar) oleh pelombong terlebih dahulu.
2. Operasi mempunyai kos pemprosesan `C` kepada mana-mana nod (iaitu semua nod mempunyai kecekapan yang sama)
3. Terdapat `N` nod perlombongan, masing-masing dengan kuasa pemprosesan yang sama (iaitu `1/N` daripada jumlah)
4. Tiada nod penuh bukan perlombongan yang wujud.

Seorang pelombong akan bersedia untuk memproses transaksi jika ganjaran yang dijangkakan lebih besar daripada kos. Oleh itu, ganjaran yang dijangkakan ialah `kR/N` kerana pelombong mempunyai `1/N` peluang memproses blok seterusnya, dan kos pemprosesan untuk pelombong hanya `kC`. Oleh itu, pelombong akan memasukkan transaksi iaitu `kR/N > kC`, atau `R > NC`. Perhatikan bahawa `R` ialah yuran per-operasi yang disediakan oleh penghantar, dan dengan itu terikat lebih rendah pada manfaat yang diperoleh oleh penghantar daripada transaksi, dan `NC` ialah kos kepada keseluruhan rangkaian bersama-sama memproses operasi. Oleh itu, pelombong mempunyai insentif untuk memasukkan hanya transaksi yang jumlah manfaat utilitarian melebihi kos.

Walau bagaimanapun, terdapat beberapa penyimpangan penting daripada andaian itu dalam realiti:

1. Pelombong membayar kos yang lebih tinggi untuk memproses transaksi berbanding nod pengesahan yang lain, kerana masa pengesahan tambahan melambatkan penyebaran blok dan dengan itu meningkatkan peluang blok akan menjadi basi.
2. Terdapat nod penuh bukan perlombongan.
3. Pengagihan kuasa perlombongan boleh berakhir secara radikal dan tidak adil dalam amalan.
4. Spekulator, musuh politik dan orang gila yang fungsi utiliti termasuk menyebabkan kemudaratan kepada rangkaian memang wujud, dan mereka dengan bijak boleh menyediakan kontrak yang kos mereka jauh lebih rendah daripada kos yang dibayar oleh nod pengesahan lain.

(1) menyediakan kecenderungan bagi pelombong untuk memasukkan transaksi yang lebih sedikit, dan (2) meningkatkan `NC`; oleh itu, sekurang-kurangnya sebahagian daripada kedua-dua kesan ini membatalkan satu sama lain.<sup>[Bagaimana?](https://github.com/ethereum/wiki/issues/447#issuecomment-316972260)</sup> (3) dan (4) ialah isu utama; untuk menyelesaikannya kita hanya memulakan had terapung: tiada blok boleh mempunyai lebih banyak operasi daripada `BLK_LIMIT_FACTOR` kali ganda purata bergerak eksponen jangka panjang. Secara khusus:

```js
blk.oplimit = floor((blk.parent.oplimit \* (EMAFACTOR - 1) +
floor(parent.opcount \* BLK\_LIMIT\_FACTOR)) / EMA\_FACTOR)
```

`BLK_LIMIT_FACTOR` dan `EMA_FACTOR` ialah pemalar yang akan ditetapkan kepada 65536 dan 1.5 buat masa ini, tetapi mungkin akan diubah selepas analisis lanjut.

Terdapat satu lagi faktor yang menghalang saiz blok besar dalam Bitcoin: blok yang besar akan mengambil masa lebih lama untuk disebarkan, dan dengan itu mempunyai kebarangkalian yang lebih tinggi untuk menjadi basi. Di Ethereum, blok yang kuat menggunakan gas juga boleh mengambil masa yang lebih lama untuk menyebarkan kedua-duanya kerana ia secara fizikal lebih besar dan kerana mereka mengambil masa lebih lama untuk memproses peralihan keadaan transaksi kepada mengesahkan. Penghalang kelewatan ini merupakan pertimbangan penting dalam Bitcoin, tetapi kurang dalam Ethereum kerana protokol GHOST; oleh itu, bergantung pada had blok dikawal selia menyediakan asas yang lebih stabil.

### Pengiraan Dan Kesempurnaan Turing {#computation-and-turing-completeness}

Satu nota penting ialah mesin maya Ethereum adalah Turing-lengkap; ini bermakna kod EVM boleh mengekodkan sebarang pengiraan yang boleh difikirkan, termasuk penggelungan tak terhingga. Kod EVM membolehkan penggelungan dalam dua cara. Pertama, terdapat arahan `JUMP` yang membolehkan program ini melompat ke tempat sebelumnya dalam kod, dan arahan `JUMPI` untuk melakukan lompatan bersyarat, membolehkan pernyataan seperti `while x < 27: x = x * 2`. Kedua, kontrak boleh memanggil kontrak lain, berpotensi membolehkan penggelungan melalui rekursi. Ini secara semula jadi membawa kepada masalah: bolehkah pengguna berniat jahat pada dasarnya menutup pelombong dan nod penuh turun dengan memaksa mereka masuk ke dalam gelung tak terhingga? Isu ini timbul kerana masalah dalam sains komputer yang dikenali sebagai masalah terhenti: tiada cara untuk memberitahu, dalam kes umum, sama ada program tertentu akan terhenti atau tidak.

Seperti yang diterangkan dalam bahagian peralihan keadaan, penyelesaian kami berfungsi dengan memerlukan transaksi untuk menetapkan bilangan maksimum langkah pengiraan yang dibenarkan untuk diambil, dan jika pelaksanaan mengambil masa pengiraan yang lebih lama telah dikembalikan tetapi yuran masih dibayar. Mesej berfungsi sama. Untuk menunjukkan motivasi di sebalik penyelesaian kami, pertimbangkan contoh berikut:

- Penyerang mencipta kontrak yang menjalankan gelung tak terhingga, dan kemudian menghantar transaksi yang mengaktifkan gelung itu kepada pelombong. Pelombong akan memproses transaksi, menjalankan gelung tak terhingga, dan menunggu ia kehabisan gas. Walaupun pelaksanaan itu kehabisan gas dan berhenti separuh jalan, transaksi itu masih sah dan pelombong masih menuntut yuran daripada penyerang untuk setiap langkah pengiraan.
- Penyerang mencipta gelung tak terhingga yang sangat panjang dengan niat memaksa pelombong untuk terus mengira bagi masa yang lama sehingga apabila pengiraan selesai, beberapa blok akan keluar dan ia tidak akan mungkin bagi pelombong untuk memasukkan transaksi untuk menuntut yuran. Walau bagaimanapun, penyerang perlu mengemukakan nilai untuk `STARTGAS` mengehadkan bilangan langkah pengiraan yang boleh diambil oleh pelaksanaan, jadi pelombong akan mengetahui lebih awal bahawa pengiraan akan mengambil beberapa langkah berlebihan.
- Penyerang melihat kontrak dengan kod beberapa bentuk seperti `send(A,contract.storage[A]); contract.storage[A] = 0`, dan menghantar transaksi dengan hanya gas yang cukup untuk menjalankan langkah pertama tetapi bukan yang kedua (iaitu membuat pengeluaran tetapi tidak membiarkan baki berkurang). Pengarang kontrak tidak perlu bimbang tentang perlindungan daripada serangan sedemikian, kerana jika pelaksanaan terhenti separuh jalan, perubahan akan dikembalikan.
- Kontrak kewangan berfungsi dengan mengambil median sembilan suapan data proprietari untuk meminimumkan risiko. Seorang penyerang mengambil alih satu daripada suapan data, yang direka untuk diubah suai melalui mekanisme panggilan alamat boleh ubah yang diterangkan dalam bahagian berkenaan DAO, dan menukarnya untuk menjalankan gelung tak terhingga, dengan itu cuba memaksa sebarang percubaan untuk menuntut dana daripada kontrak kewangan untuk kehabisan gas. Walau bagaimanapun, kontrak kewangan boleh menetapkan had gas pada mesej untuk mengelakkan masalah ini.

Alternatif kepada kesempurnaan Turing ialah ketidaksempurnaan Turing, iaitu `JUMP` dan `JUMPI` tidak wujud dan hanya satu salinan bagi setiap kontrak dibenarkan wujud dalam timbunan panggilan pada bila-bila masa. Dengan sistem ini, sistem yuran yang diterangkan dan ketidakpastian berkaitan keberkesanan penyelesaian kami mungkin tidak perlu, kerana kos melaksanakan kontrak akan dibatasi di atas oleh saiznya. Selain itu, ketidaksempurnaan Turing bukanlah satu batasan yang besar; daripada semua contoh kontrak yang telah kami bayangkan secara dalaman, setakat ini hanya satu yang memerlukan gelung, dan juga gelung itu boleh dikeluarkan dengan membuat 26 pengulangan kod satu baris. Memandangkan implikasi serius Kesempurnaan Turing, dan manfaat terhad, mengapakah tidak hanya mempunyai bahasa Turing tidak lengkap? Walau bagaimanapun, pada hakikatnya, Ketidaksempurnaan Turing jauh daripada penyelesaian masalah yang kemas. Untuk melihat sebab, pertimbangkan kontrak berikut:

```sh
C0: call(C1); call(C1);
C1: call(C2); call(C2);
C2: call(C3); call(C3);
...
C49: call(C50); call(C50);
C50: (run one step of a program and record the change in storage)
```

Sekarang, hantar transaksi kepada A. Oleh itu, dalam 51 transaksi, kami mempunyai kontrak yang mengambil 2<sup>50</sup> langkah pengiraan. Pelombong boleh cuba mengesan bom logik itu lebih awal dengan mengekalkan nilai bersama setiap kontrak yang menyatakan bilangan maksimum langkah pengiraan yang boleh diambil, dan mengira ini untuk kontrak yang memanggil kontrak lain secara berulang-ulang, tetapi itu memerlukan pelombong untuk melarang kontrak yang mencipta kontrak lain (kerana penciptaan dan pelaksanaan semua 26 kontrak di atas dengan mudah boleh digulung menjadi satu kontrak). Satu lagi perkara yang bermasalah ialah medan alamat mesej adalah boleh ubah, jadi secara umumnya ia mungkin mustahil untuk memberitahu kontrak lain bahawa kontrak yang diberikan akan dipanggil lebih awal. Oleh itu, secara keseluruhannya, kami mempunyai kesimpulan yang mengejutkan: Kesempurnaan Turing amat mudah untuk diuruskan, dan kekurangan Kesempurnaan Turing sama-sama sukar untuk diurus melainkan kawalan yang sama tepat dilakukan - tetapi dalam kes itu, mengapakah tidak membiarkan sahaja protokol itu menjadi Turing lengkap?

### Mata Wang Dan Pengeluaran {#currency-and-issuance}

Rangkaian Ethereum termasuk mata wang terbina dalam sendiri, Ether, yang berfungsi untuk dua tujuan iaitu menyediakan lapisan kecairan utama untuk membolehkan pertukaran cekap antara pelbagai jenis aset digital dan, lebih penting lagi, menyediakan mekanisme untuk membayar fi transaksi. Untuk kemudahan dan untuk mengelakkan pertikaian pada masa depan (lihat perbahasan mBTC/uBTC/satoshi semasa dalam Bitcoin), denominasi akan dilabel awal:

- 1: wei
- 10<sup>12</sup>: szabo
- 10<sup>15</sup>: finney
- 10<sup>18</sup>: Ether

Ini perlu diambil sebagai versi lanjutan bagi konsep "dolar" dan "sen" atau "BTC" dan "satoshi"​​​. Dalam masa terdekat, kami menjangkakan "Ether" akan digunakan untuk transaksi biasa, "finney" untuk transaksi mikro dan "szabo" dan "wei" untuk perbincangan teknikal mengenai yuran dan pelaksanaan protokol; baki denominasi mungkin berguna kemudian dan tidak boleh dimasukkan dalam pelanggan pada ketika ini.

Model penerbitan akan seperti berikut:

- Ether akan dikeluarkan dalam jualan mata wang pada harga 1000-2000 Ether setiap BTC, mekanisme bertujuan untuk membiayai organisasi Ethereum dan membayar pembangunan yang telah berjaya digunakan oleh platform lain seperti Mastercoin dan NXT. Pembeli awal akan mendapat manfaat daripada diskaun yang lebih besar. BTC yang diterima daripada jualan akan digunakan sepenuhnya untuk membayar gaji dan ganjaran kepada pembangun dan melabur dalam pelbagai projek untuk keuntungan dan bukan keuntungan dalam ekosistem Ethereum dan mata wang kripto.
- 0.099x jumlah yang dijual (60102216 ETH) akan diperuntukkan kepada organisasi untuk membayar pampasan kepada penyumbang awal dan membayar perbelanjaan denominasi ETH sebelum blok genesis.
- 0.099x jumlah yang dijual akan dikekalkan sebagai rizab jangka panjang.
- 0.26x jumlah yang dijual akan kekal diperuntukkan kepada pelombong setiap tahun selepas titik itu.

| Kumpulan                               | Semasa pelancaran | Selepas 1 tahun | Selepas 5 tahun |
| -------------------------------------- | ----------------- | --------------- | --------------- |
| Unit mata wang                         | 1.198X            | 1.458X          | 2.498X          |
| Pembeli                                | 83.5%             | 68.6%           | 40.0%           |
| Rizab yang dibelanjakan sebelum jualan | 8.26%             | 6.79%           | 3.96%           |
| Rizab yang digunakan selepas jualan    | 8.26%             | 6.79%           | 3.96%           |
| Pelombong                              | 0%                | 17.8%           | 52.0%           |

#### Kadar Pertumbuhan Bekalan Jangka Panjang (peratus)

![Inflasi Ethereum](./ethereum-inflation.png)

_Walaupun pengeluaran mata wang linear, seperti Bitcoin yang dari masa ke masa, kadar pertumbuhan bekalan tetap cenderung kepada sifar._

Dua pilihan utama dalam model di atas ialah (1) kewujudan dan saiz kumpulan endowmen, dan (2) kewujudan bekalan linear kekal yang semakin meningkat, berbanding dengan bekalan dihadkan seperti dalam Bitcoin. Justifikasi kumpulan endowmen adalah seperti berikut. Jika kumpulan endowmen tidak wujud, dan pengeluaran linear dikurangkan kepada 0.217x untuk memberikan kadar inflasi yang sama, maka jumlah kuantiti Ether akan menjadi 16.5% kurang dan jadi setiap unit akan menjadi 19.8% lebih berharga. Oleh itu, dalam keseimbangan 19.8% lebih Ether akan dibeli dalam jualan, jadi setiap unit akan sekali lagi bernilai seperti sebelumnya. Organisasi itu juga akan mempunyai 1.198x sebanyak BTC, yang boleh dianggap akan dibahagikan kepada dua kepingan: BTC asal, dan tambahan 0.198x. Oleh itu, keadaan ini adalah _tepat setara_ dengan endowmen, tetapi dengan satu perbezaan penting: organisasi memegang BTC semata-mata, dan jadi tidak diberikan insentif untuk menyokong nilai unit Ether.

Model pertumbuhan bekalan linear kekal mengurangkan risiko sesuatu yang dilihat sebagai kepekatan kekayaan yang berlebihan dalam Bitcoin, dan memberi individu yang tinggal di era masa kini dan masa depan peluang yang adil untuk memperoleh unit mata wang, manakala pada masa yang sama, mengekalkan insentif yang kuat untuk mendapatkan dan memegang Ether kerana "kadar pertumbuhan bekalan" sebagai peratusan masih cenderung kepada sifar dari masa ke masa. Kami juga berteori bahawa kerana syiling sentiasa hilang dari masa ke masa kerana kecuaian, kematian, dan lain-lain, dan kerugian syiling boleh dimodelkan sebagai peratusan jumlah bekalan setiap tahun, bahawa jumlah bekalan mata wang dalam edaran sebenarnya akan menjadi stabil pada nilai yang sama dengan pengeluaran tahunan dibahagikan dengan kadar kerugian (contohnya pada kadar kerugian 1%, apabila bekalan mencapai 26X kemudian 0.26X akan dilombong dan 0.26X hilang setiap tahun, mewujudkan keseimbangan).

Harap maklum bahawa pada masa akan datang, kemungkinan Ethereum akan bertukar kepada model bukti taruhan untuk keselamatan, mengurangkan keperluan pengeluaran ke suatu tempat antara sifar dan 0.05X setahun. Sekiranya organisasi Ethereum kehilangan pembiayaan atau atas apa-apa sebab lain hilang, kami meninggalkan "kontrak sosial" terbuka: sesiapa sahaja mempunyai hak untuk mewujudkan versi calon masa depan Ethereum, dengan syarat bahawa kuantiti Ether mesti sama dengan `60102216 * (1.198 + 0.26 * n)` iaitu `n` ialah bilangan tahun selepas blok genesis. Pencipta bebas untuk menjual kepada orang ramai atau sebaliknya memberikan beberapa atau semua perbezaan antara pengembangan bekalan yang didorong oleh PoS dan pengembangan bekalan yang dibenarkan maksimum untuk membayar pembangunan. Naik taraf calon yang tidak mematuhi kontrak sosial boleh dipaksa menjadi versi patuh.

### Pemusatan Perlombongan {#mining-centralization}

Algoritma perlombongan Bitcoin berfungsi dengan mempunyai pelombong mengira SHA256 pada versi pengepala blok yang sedikit diubah suai berjuta-juta kali secara berulang-ulang, sehingga akhirnya satu nod datang dengan versi yang cincangannya kurang daripada sasaran (kini sekitar 2<sup>192</sup>). Walau bagaimanapun, algoritma perlombongan ini terdedah kepada dua bentuk pemusatan. Pertama, ekosistem perlombongan telah dikuasai oleh ASIC (litar bersepadu khusus aplikasi), cip komputer direka untuk, dan oleh itu beribu-ribu kali lebih cekap pada, tugas tertentu perlombongan Bitcoin. Ini bermakna bahawa perlombongan Bitcoin tidak lagi merupakan usaha yang sangat terdesentralisasi dan egalitarian, memerlukan berjuta-juta dolar modal untuk mengambil bahagian secara berkesan. Kedua, kebanyakan pelombong Bitcoin sebenarnya tidak melakukan pengesahan blok tempatan; sebaliknya, mereka bergantung pada kumpulan perlombongan berpusat untuk menyediakan pengepala blok. Masalah ini boleh dikatakan lebih teruk: pada masa penulisan ini, tiga kolam perlombongan teratas secara tidak langsung mengawal kira-kira 50% kuasa pemprosesan dalam rangkaian Bitcoin, walaupun ini dikurangkan oleh hakikat bahawa pelombong boleh beralih ke kolam perlombongan lain jika kolam atau gabungan cuba serangan 51%.

Niat semasa di Ethereum ialah menggunakan algoritma perlombongan iaitu pelombong diperlukan untuk mengambil data rawak daripada negeri, mengira beberapa transaksi yang dipilih secara rawak daripada blok N terakhir dalam blok rantai, dan mengembalikan cincangan keputusan. Ini mempunyai dua faedah penting. Pertama, kontrak Ethereum boleh termasuk apa-apa jenis pengiraan, jadi Ethereum ASIC pada dasarnya akan menjadi ASIC untuk pengiraan am - iaitu CPU yang lebih baik. Kedua, perlombongan memerlukan akses kepada keseluruhan blok rantai, memaksa pelombong untuk menyimpan keseluruhan blok rantai dan sekurang-kurangnya mampu mengesahkan setiap transaksi. Ini menghilangkan keperluan untuk kolam perlombongan berpusat; walaupun kolam perlombongan masih boleh memainkan peranan yang sah untuk menyekat pengagihan ganjaran secara rawak, fungsi ini boleh disediakan dengan baik oleh kolam setara tanpa kawalan pusat.

Model ini belum diuji, dan mungkin terdapat kesukaran di sepanjang jalan dalam mengelakkan pengoptimuman bijak tertentu apabila menggunakan pelaksanaan kontrak sebagai algoritma perlombongan. Walau bagaimanapun, satu ciri menarik yang ketara bagi algoritma ini ialah ia membenarkan sesiapa sahaja untuk "meracun telaga", dengan memperkenalkan sejumlah besar kontrak ke dalam blok rantai khusus direka untuk menghalang ASIC tertentu. Insentif ekonomi wujud bagi pengeluar ASIC menggunakan helah sedemikian untuk menyerang satu sama lain. Oleh itu, penyelesaian yang sedang kita bangunkan akhirnya merupakan penyelesaian manusia ekonomi adaptif dan bukannya penyelesaian teknikal semata-mata.

### Kebolehskalaan {#scalability}

Satu kebimbangan umum mengenai Ethereum ialah isu kebolehskalaan. Seperti Bitcoin, Ethereum mengalami kecacatan bahawa setiap transaksi perlu diproses oleh setiap nod dalam rangkaian. Dengan Bitcoin, saiz blok rantai semasa terletak pada kira-kira 15 GB, berkembang sebanyak kira-kira 1 MB sejam. Jika rangkaian Bitcoin telah memproses 2000 transaksi Visa sesaat, ia akan berkembang sebanyak 1 MB setiap tiga saat (1 GB per jam, 8 TB setiap tahun). Ethereum mungkin mengalami corak pertumbuhan yang sama, semakin teruk dengan hakikat bahawa akan terdapat banyak aplikasi selain blok rantai Ethereum dan bukan sahaja mata wang seperti yang berlaku pada Bitcoin, tetapi diperbaiki oleh hakikat bahawa nod penuh Ethereum perlu menyimpan hanya keadaan dan bukannya seluruh sejarah blok rantai.

Masalah dengan saiz blok rantai yang besar ialah risiko pemusatan. Jika saiz blok rantai meningkat kepada, katakan, 100 TB, maka senario mungkin hanya sebilangan kecil perniagaan besar akan menjalankan nod penuh, dengan semua pengguna biasa menggunakan nod SPV cerah. Dalam keadaan sedemikian, terdapat peningkatan potensi kebimbangan bahawa nod penuh boleh bersatu dan semua bersetuju untuk menipu dalam beberapa cara menguntungkan (cth. menukar ganjaran blok, memberi diri mereka BTC). Nod cerah tidak mempunyai cara mengesan ini dengan segera. Sudah tentu, sekurang-kurangnya satu nod penuh jujur mungkin wujud, dan selepas beberapa jam maklumat mengenai penipuan akan terdedah melalui saluran seperti Reddit, tetapi pada ketika itu, ia sudah terlambat: ia terpulang kepada pengguna biasa untuk mengatur usaha untuk menyenarai hitam blok-blok yang diberikan, masalah penyelarasan besar-besaran dan mungkin tidak boleh dilaksanakan pada skala yang sama seperti melakukan serangan 51% yang berjaya. Dalam kes Bitcoin, ini kini menjadi masalah, tetapi terdapat pengubahsuaian blok rantai yang [dicadangkan oleh Peter Todd](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/) yang akan mengurangkan isu ini.

Dalam jangka masa terdekat, Ethereum akan menggunakan dua strategi tambahan bagi menangani masalah ini. Pertama, kerana algoritma perlombongan berasaskan blok rantai, sekurang-kurangnya setiap pelombong akan dipaksa untuk menjadi nod penuh, mewujudkan batasan yang lebih rendah pada bilangan nod penuh. Walau bagaimanapun, kedua dan lebih penting lagi, kami akan memasukkan akar pokok keadaan perantaraan dalam blok rantai selepas memproses setiap transaksi. Walaupun pengesahan blok dipusatkan, selagi satu nod pengesahan jujur wujud, masalah pemusatan boleh dielak melalui protokol pengesahan. Jika pelombong menerbitkan blok tidak sah, blok itu mesti sama ada diformat teruk, atau keadaan `S[n]` tidak betul. Oleh sebab `S[0]` diketahui betul, mesti ada beberapa keadaan pertama `S[i]` yang tidak betul jika `S[i-1]` betul. Nod pengesahan akan menyediakan indeks `i`, bersama dengan "bukti ketidaksahan" yang terdiri daripada subset nod pokok Patricia yang perlu memproses `APPLY(S[i-1],TX[i]) -> S[i]`. Nod akan dapat menggunakan nod tersebut untuk menjalankan bahagian pengiraan itu, dan melihat bahawa `S[i]` dijana tidak sepadan dengan `S[i]` disediakan.

Satu lagi, lebih canggih, serangan akan melibatkan pelombong berniat jahat menerbitkan blok tidak lengkap, jadi maklumat penuh tidak wujud untuk menentukan sama ada blok adalah sah atau tidak. Penyelesaian kepada ini ialah protokol tindak balas cabaran: nod pengesahan mengeluarkan "cabaran" dalam bentuk indeks transaksi sasaran, dan setelah menerima nod, nod cerah menganggap blok itu sebagai tidak dipercayai sehingga nod lain, sama ada pelombong atau pengesah lain, menyediakan subset nod Patricia sebagai bukti kesahan.

## Kesimpulan {#conclusion}

Protokol Ethereum pada asalnya diilhamkan sebagai versi dinaik taraf daripada mata wang kripto, menyediakan ciri-ciri lanjutan seperti eskrow pada blok rantai, had pengeluaran, kontrak kewangan, pasaran perjudian dan seperti melalui bahasa pengaturcaraan yang sangat umum. Protokol Ethereum tidak akan "menyokong" mana-mana aplikasi secara langsung, tetapi kewujudan bahasa pengaturcaraan Turing yang lengkap bermakna bahawa kontrak sewenang-wenangnya boleh dibuat secara teori untuk sebarang jenis transaksi atau aplikasi. Walau bagaimanapun, perkara yang lebih menarik mengenai Ethereum, ialah protokol Ethereum bergerak jauh melebihi mata wang sahaja. Protokol-protokol berkenaan storan fail terdesentralisasi, pengiraan terdesentralisasi dan pasaran ramalan terdesentralisasi, antara berpuluh-puluh konsep lain, mempunyai potensi untuk meningkatkan kecekapan industri pengiraan, dan memberikan rangsangan besar kepada protokol setara yang lain dengan menambah untuk kali pertama lapisan ekonomi. Akhirnya, terdapat juga pelbagai aplikasi yang tidak mempunyai apa-apa kaitan dengan wang sama sekali.

Konsep fungsi peralihan keadaan sewenang-wenang seperti yang dilaksanakan oleh protokol Ethereum menyediakan platform dengan potensi unik; berbanding menjadi protokol tertutup, protokol tujuan tunggal bertujuan untuk pelbagai aplikasi dalam storan data, perjudian atau kewangan, Ethereum adalah terbuka mengikut reka bentuk, dan kami percaya bahawa ia sangat sesuai untuk berkhidmat sebagai lapisan asas bagi sebilangan besar protokol kewangan dan bukan kewangan pada tahun-tahun akan datang.

## Nota dan Bacaan Lanjut {#notes-and-further-reading}

### Nota {#notes}

1. Seorang pembaca canggih mungkin mendapati bahawa sebenarnya alamat Bitcoin ialah cincangan kunci awam lengkung eliptik, dan bukan kunci awam itu sendiri. Walau bagaimanapun, ia sebenarnya adalah benar-benar sempurna sah terminologi kriptografi untuk merujuk kepada cincangan kunci awam sebagai kunci awam itu sendiri. Ini kerana kriptografi Bitcoin boleh dianggap sebagai algoritma tandatangan digital tersuai, iaitu kunci awam terdiri daripada cincangan kunci awam ECC, tandatangan terdiri daripada kunci awam ECC yang terangkai dengan tandatangan ECC, dan algoritma pengesahan melibatkan pemeriksaan kunci awam ECC dalam tandatangan berbanding cincangan kunci awam ECC yang disediakan sebagai kunci awam dan kemudian mengesahkan tandatangan ECC berbanding kunci awam ECC.
2. Secara teknikal, median daripada 11 blok sebelumnya.
3. Secara dalaman, 2 dan "CHARLIE" ialah kedua-dua nombor <sup>[fn3](#nota)</sup>, dengan yang terakhir besar dalam perwakilan asas 256. Nombor boleh sekurang-kurangnya 0 dan paling banyak 2<sup>256</sup>-1.

### Further Reading {#further-reading}

1. [Nilai intrinsik](http://bitcoinmagazine.com/8640/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it/)
2. [Hartanah pintar](https://en.bitcoin.it/wiki/Smart_Property)
3. [Kontrak pintar](https://en.bitcoin.it/wiki/Contracts)
4. [B-money](http://www.weidai.com/bmoney.txt)
5. [Bukti kerja boleh diguna semula](https://nakamotoinstitute.org/finney/rpow/)
6. [Lindungi hak milik harta dengan kuasa pemilik](https://nakamotoinstitute.org/secure-property-titles/)
7. [Kertas putih Bitcoin](http://bitcoin.org/bitcoin.pdf)
8. [Namecoin](https://namecoin.org/)
9. [Segi tiga Zooko](https://wikipedia.org/wiki/Zooko's_triangle)
10. [Kertas putih duit syiling berwarna](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)
11. [Kertas putih Mastercoin](https://github.com/mastercoin-MSC/spec)
12. [Syarikat autonomi terdesentralisasi, Majalah Bitcoin](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)
13. [Pengesahan pembayaran mudah](https://en.bitcoin.it/wiki/Scalability#Simplified_payment_verification)
14. [Pohon Merkle](https://wikipedia.org/wiki/Merkle_tree)
15. [Pohon Patricia](https://wikipedia.org/wiki/Patricia_tree)
16. [HANTU](https://eprint.iacr.org/2013/881.pdf)
17. [StorJ dan Agen Autonomi, Jeff Garzik](http://garzikrants.blogspot.ca/2013/01/storj-and-bitcoin-autonomous-agents.html)
18. [Mike Hearn di Smart Property di Turing Festival](https://www.youtube.com/watch?v=MVyv4t0OKe4)
19. [Ethereum RLP](https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-RLP)
20. [Pokok Ethereum Merkle Patricia](https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-Patricia-Tree)
21. [Peter Todd pada pokok Merkle sum](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/)

_Untuk sejarah kertas putih, lihat [wiki ini](https://github.com/ethereum/wiki/blob/old-before-deleting-all-files-go-to-wiki-wiki-instead/old-whitepaper-for-historical-reference.md)._

_Ethereum, seperti banyak projek perisian sumber terbuka yang didorong oleh masyarakat, telah berkembang sejak penubuhan awal. Untuk mengetahui tentang perkembangan terkini Ethereum, dan cara perubahan pada protokol dibuat, kami mengesyorkan [panduan ini](/learn/)._
