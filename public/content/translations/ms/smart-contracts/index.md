---
title: Kontrak pintar
description: Pengenalan bukan teknikal kepada kontrak pintar
lang: ms
---

# Pengenalan kepada kontrak pintar {#introduction-to-smart-contracts}

Kontrak pintar ialah blok asas bagi lapisan aplikasi Ethereum. Ia adalah program komputer yang disimpan pada [blok rantai](/glossary/#blockchain) yang mengikut logik "jika ini maka itu" dan dijamin untuk dilaksanakan mengikut peraturan yang ditakrifkan oleh kodnya, yang tidak boleh diubah setelah dibuat.

Nick Szabo mencipta istilah "kontrak pintar". Pada tahun 1994, beliau menulis [pengenalan kepada konsep](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html), dan pada tahun 1996 beliau menulis [penerokaan tentang perkara yang boleh dilakukan oleh kontrak pintar](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Szabo membayangkan pasaran digital di mana proses automatik [selamat secara kriptografi](/glossary/#cryptography) membolehkan transaksi dan fungsi perniagaan berlaku tanpa pengantara yang dipercayai. Kontrak pintar di Ethereum melaksanakan visi ini.

Tonton Finematics menerangkan kontrak pintar:

<YouTube id="pWGLtjG-F5c" />

## Percaya pada kontrak konvensional {#trust-and-contracts}

Salah satu masalah terbesar dengan kontrak tradisional ialah keperluan untuk individu yang dipercayai untuk mengikuti hasil kontrak.

Berikut adalah contoh:

Alice dan Bob sedang berlumba basikal. Katakan Alice mempertaruhkan Bob $10 bahawa dia akan memenangi perlumbaan itu. Bob yakin dia akan menjadi pemenang dan bersetuju dengan pertaruhan. Akhirnya, Alice menamatkan perlumbaan dengan baik di hadapan Bob dan merupakan pemenang yang jelas. Tetapi Bob enggan membayar pertaruhan, mendakwa Alice mesti menipu.

Contoh bodoh ini menggambarkan masalah dengan mana-mana perjanjian bukan kontrak pintar. Walaupun syarat perjanjian dipenuhi (iaitu anda adalah pemenang perlumbaan), anda masih mesti mempercayai orang lain untuk memenuhi perjanjian (iaitu pembayaran pada pertaruhan).

## Mesin layan diri digital {#vending-machine}

Metafora mudah untuk kontrak pintar ialah mesin layan diri, yang berfungsi agak serupa dengan kontrak pintar - input khusus menjamin output yang telah ditetapkan.

- Anda pilih produk
- Mesin layan diri memaparkan harga
- Anda membayar harga
- Mesin layan diri mengesahkan bahawa anda telah membayar jumlah yang betul
- Mesin layan diri memberi anda item anda

Mesin layan diri hanya akan mengeluarkan produk yang anda inginkan selepas semua keperluan dipenuhi. Jika anda tidak memilih produk atau memasukkan wang yang mencukupi, mesin layan diri tidak akan memberikan produk anda.

## Pelaksanaan automatik {#automation}

Faedah utama kontrak pintar ialah ia melaksanakan kod yang tidak jelas apabila syarat tertentu dipenuhi. Tidak perlu menunggu manusia untuk mentafsir atau merundingkan hasilnya. Ini menghilangkan keperluan untuk pengantara yang dipercayai.

Sebagai contoh, anda boleh menulis kontrak pintar yang menyimpan dana dalam simpanan untuk kanak-kanak, membenarkan mereka mengeluarkan dana selepas tarikh tertentu. Jika mereka cuba mengeluarkan dana sebelum tarikh tersebut, kontrak pintar tidak akan dilaksanakan. Atau anda boleh menulis kontrak yang secara automatik memberi anda versi digital pemilikan kereta apabila anda membayar pengedar.

## Hasil yang boleh diramalkan {#predictability}

Kontrak tradisional adalah tidak jelas kerana ia bergantung kepada manusia untuk mentafsir dan melaksanakannya. Sebagai contoh, dua hakim mungkin mentafsir kontrak secara berbeza, yang boleh membawa kepada keputusan yang tidak konsisten dan hasil yang tidak sama rata. Kontrak pintar mengalih keluar kemungkinan ini. Sebaliknya, kontrak pintar dilaksanakan dengan tepat berdasarkan syarat yang tertulis dalam kod kontrak. Ketepatan ini bermakna dalam situasi yang sama, kontrak pintar akan menghasilkan keputusan yang sama.

## Rekod awam {#public-record}

Kontrak pintar berguna untuk audit dan penjejakan. Memandangkan kontrak pintar Ethereum berada pada blok rantai awam, sesiapa sahaja boleh menjejaki pemindahan aset dan maklumat lain yang berkaitan dengan serta-merta. Sebagai contoh, anda boleh menyemak untuk melihat bahawa seseorang menghantar wang ke alamat anda.

## Perlindungan privasi {#privacy-protection}

Kontrak pintar juga melindungi privasi anda. Memandangkan Ethereum ialah rangkaian nama samaran (urus niaga anda terikat secara terbuka kepada alamat kriptografi yang unik, bukan identiti anda), anda boleh melindungi privasi anda daripada pemerhati.

## Istilah yang boleh dilihat {#visible-terms}

Akhir sekali, seperti kontrak tradisional, anda boleh menyemak kandungan dalam kontrak pintar sebelum anda menandatanganinya (atau sebaliknya berinteraksi dengannya). Ketelusan kontrak pintar menjamin sesiapa sahaja boleh menelitinya.

## Kes penggunaan kontrak pintar {#use-cases}

Kontrak pintar boleh melakukan apa sahaja yang boleh dilakukan oleh program komputer.

Mereka boleh melakukan pengiraan, mencipta mata wang, menyimpan data, mencetak [NFT](/glossary/#nft), menghantar komunikasi dan juga menjana grafik. Berikut adalah beberapa contoh popular dunia sebenar:

- [Syiling Stabil](/stablecoins/)
- [Mencipta dan mengedarkan aset digital yang unik](/nft/)
- [Pertukaran mata wang automatik dan terbuka](/get-eth/#dex)
- [Permainan ternyahpusat](/dapps/?category=gaming#explore)
- [Polisi insurans yang membayar secara automatik](https://etherisc.com/)
- [Piawaian yang membolehkan orang ramai mencipta mata wang tersuai dan boleh dikendalikan](/developers/docs/standards/tokens/)

## Bacaan lanjut {#further-reading}

- [Cara Kontrak Pintar Akan Mengubah Dunia](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Kontrak Pintar: Teknologi Blok Rantai Yang Akan Menggantikan Peguam](https://blockgeeks.com/guides/smart-contracts/)
- [Kontrak pintar untuk pemaju](/developers/docs/smart-contracts/)
- [Belajar menulis kontrak pintar](/developers/learning-tools/)
- [Menguasai Ethereum - Apakah Kontrak Pintar?](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)
