---
title: Kontrak pintar
description: Pengantar non-teknis untuk kontrak pintar
lang: id
---

# Pengantar kontrak pintar {#introduction-to-smart-contracts}

Kontrak pintar adalah blok bangunan dasar dari lapisan aplikasi Ethereum. Mereka adalah program komputer yang disimpan di [rantai blok](/glossary/#blockchain) dan mengikuti logika "jika ini maka itu", serta dijamin akan dijalankan sesuai dengan aturan yang ditetapkan oleh kodenya, yang mana tidak dapat diubah setelah dibuat.

Nick Szabo menciptakan istilah "kontrak pintar". Pada tahun 1994, ia menulis [pengantar konsep tersebut](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html), dan pada tahun 1996 ia menulis [eksplorasi tentang apa yang bisa dilakukan oleh kontrak pintar](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Szabo membayangkan sebuah pasar digital di mana proses otomatis yang [terjamin secara kriptografis](/glossary/#cryptography) memungkinkan transaksi dan fungsi bisnis terjadi tanpa perantara yang tepercaya. Kontrak pintar Ethereum membuat mimpi ini menjadi nyata.

Tonton Finematics menjelaskan kontrak pintar:

<YouTube id="pWGLtjG-F5c" />

## Kepercayaan dalam kontrak konvensional {#trust-and-contracts}

Salah satu masalah terbesar dengan kontrak tradisional adalah kebutuhan terhadap individu yang bertanggung jawab untuk melaksanakan hasil kontrak.

Berikut adalah contohnya:

Alice dan Bob sedang ikut lomba sepeda. Anggaplah Alice bertaruh $10 dengan Bob bahwa dia akan memenangkan perlombaan. Bob yakin bahwa dia akan menjadi pemenang dan setuju untuk bertaruh. Pada akhirnya, Alice menyelesaikan lomba jauh di depan Bob dan jelas menang. Tetapi Bob menolak untuk membayar taruhannya, dengan klaim bahwa Alice pasti telah berbuat kecurangan.

Contoh konyol ini menunjukkan masalah pada kesepakatan non-pintar mana pun. Bahkan jika persyaratan dari perjanjian tersebut terpenuhi (misalnya, Anda menjadi pemenang lombanya), Anda masih harus mempercayai pihak lain untuk memenuhi perjanjian tersebut (misalnya, membayar taruhan tersebut).

## Mesin penjual otomatis digital {#vending-machine}

Metafora sederhana untuk kontrak pintar adalah mesin penjual, yang bekerja entah bagaimana sama dengan kontrak pintar - input yang spesifik memastikan hasil yang telah ditentukan sebelumnya.

- Anda memilih suatu produk
- Mesin penjual menampilkan harga
- Anda membayar harganya
- Mesin penjual memverifikasi bahwa Anda membayar jumlah yang tepat
- Mesin penjual memberikan barang Anda

Mesin penjual hanya akan mengeluarkan produk yang Anda inginkan setelah semua persyaratan dipenuhi. Jika Anda tidak memilih produk atau memasukkan uang yang cukup, mesin penjual tidak akan memberikan produk yang Anda inginkan.

## Eksekusi otomatis {#automation}

Manfaat utama dari kontrak pintar adalah bahwa ia menjalankan kode yang tegas dan jelas ketika kondisi tertentu terpenuhi. Tidak perlu menunggu manusia untuk menginterpretasi atau merundingkan hasilnya. Ini menghilangkan keharusan terhadap perantara yang dipercaya.

Contohnya, Anda dapat menulis kontrak pintar yang menyimpan dana di escrow untuk seorang anak, yang memungkinkan mereka untuk menarik dana tersebut setelah tanggal tertentu. Jika mereka mencoba menarik dana sebelum tanggal tersebut, kontrak pintar tidak akan dieksekusi. Atau Anda bisa menulis kontrak yang secara otomatis memberikan Anda versi digital dari surat kepemilikan mobil ketika Anda membayar kepada dealer.

## Hasil yang dapat diprediksi {#predictability}

Kontrak konvensional bersifat ambigu karena mengandalkan manusia untuk mengartikan dan melaksanakannya. Sebagai contoh, dua hakim bisa saja mengartikan kontrak dengan cara yang berbeda, yang dapat menghasilkan keputusan yang inkonsisten dan hasil yang tidak adil. Kontrak pintar menghilangkan kemungkinan ini. Sebagai gantinya, kontrak pintar membuat persis dengan ketentuan yang tertulis dalam kode kontrak. Ketepatan ini berarti bahwa dengan situasi yang sama, kontrak pintar akan membuat hasil yang sama.

## Catatan umum {#public-record}

Kontrak pintar berguna untuk audit dan pelacakan. Karena kontrak pintar Ethereum ada di rantai blok publik, siapa pun dapat dengan cepat melacak pemindahan aset dan informasi terkait lainnya. Sebagai contoh, Anda dapat memeriksa apakah seseorang telah mengirim uang ke alamat Anda.

## Perlindungan privasi {#privacy-protection}

Kontrak pintar juga melindungi privasi Anda. Karena Ethereum adalah jaringan dengan nama samaran (transaksi Anda terikat secara publik ke alamat kriptografik unik, bukan identitas Anda), Anda dapat melindungi privasi Anda dari pengintai.

## Ketentuan yang terlihat {#visible-terms}

Akhirnya, seperti kontrak tradisional, Anda dapat memeriksa isi kontrak pintar sebelum Anda menandatanganinya (atau berinteraksi dengannya). Transparansi kontrak pintar menjamin bahwa siapa pun dapat memeriksanya secara teliti.

## Contoh penggunaan kontrak pintar {#use-cases}

Kontrak pintar dapat melakukan pada dasarnya segala hal yang dapat dilakukan oleh program komputer.

Mereka dapat melakukan komputasi, membuat mata uang, menyimpan data, mencetak [NFT](/glossary/#nft), mengirim komunikasi, dan bahkan menghasilkan grafik. Berikut adalah beberapa contoh penggunaan populer dan nyata:

- [Stablecoin](/stablecoins/)
- [Membuat dan mendistribusikan aset digital unik](/nft/)
- [Bursa mata uang otomatis dan terbuka](/get-eth/#dex)
- [Aktivitas game terdesentralisasi](/dapps/?category=gaming#explore)
- [Kebijakan asuransi yang melakukan pembayaran secara otomatis](https://etherisc.com/)
- [Standar yang memungkinkan orang untuk membuat mata uang yang disesuaikan dan dapat saling beroperasi](/developers/docs/standards/tokens/)

## Bacaan lebih lanjut {#further-reading}

- [Bagaimana Kontrak Pintar Akan Mengubah Dunia](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Kontrak Pintar: Teknologi Rantai Blok Yang Akan Menggantikan Pengacara](https://blockgeeks.com/guides/smart-contracts/)
- [Kontrak pintar untuk pengembang](/developers/docs/smart-contracts/)
- [Belajar cara menulis kontrak pintar](/developers/learning-tools/)
- [Penguasaan Ethereum - Apa itu Kontrak Pintar?](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)
