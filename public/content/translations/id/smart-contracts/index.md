---
title: Kontrak pintar
metaTitle: "Kontrak pintar: Apa itu dan manfaatnya"
description: Pengantar non-teknis untuk kontrak pintar
lang: id
---

# Pengenalan kontrak pintar {#introduction-to-smart-contracts}

<div className="mt-4">
<ListenToPlayer slug="/smart-contracts/" />
</div>

Kontrak pintar adalah blok bangunan dasar dari lapisan aplikasi Ethereum. Kontrak pintar adalah program komputer yang disimpan di [rantai blok](/glossary/#blockchain) yang mengikuti logika "jika ini maka itu", dan dijamin akan dieksekusi sesuai dengan aturan yang ditentukan oleh kodenya, yang tidak dapat diubah setelah dibuat.

Nick Szabo menciptakan istilah "kontrak pintar". Pada tahun 1994, ia menulis [sebuah pengenalan konsep tersebut](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html), dan pada tahun 1996 ia menulis [sebuah eksplorasi tentang apa yang dapat dilakukan oleh kontrak pintar](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Szabo membayangkan sebuah pasar digital di mana proses otomatis yang [terjamin secara kriptografis](/glossary/#cryptography) memungkinkan transaksi dan fungsi bisnis terjadi tanpa perantara yang tepercaya. Kontrak pintar Ethereum membuat mimpi ini menjadi nyata.

Tonton Finematics menjelaskan kontrak pintar:

<YouTube id="pWGLtjG-F5c" />

## Kepercayaan pada kontrak konvensional {#trust-and-contracts}

Salah satu masalah terbesar dengan kontrak tradisional adalah kebutuhan terhadap individu yang bertanggung jawab untuk melaksanakan hasil kontrak.

Berikut adalah contohnya:

Alice dan Bob sedang ikut lomba sepeda. Anggaplah Alice bertaruh $10 dengan Bob bahwa dia akan memenangkan perlombaan. Bob yakin bahwa dia akan menjadi pemenang dan setuju untuk bertaruh. Pada akhirnya, Alice menyelesaikan lomba jauh di depan Bob dan jelas menang. Tetapi Bob menolak untuk membayar taruhannya, dengan klaim bahwa Alice pasti telah berbuat kecurangan.

Contoh konyol ini menunjukkan masalah pada kesepakatan non-pintar mana pun. Bahkan jika syarat-syarat perjanjian terpenuhi (yaitu, Anda adalah pemenang perlombaan), Anda tetap harus memercayai orang lain untuk memenuhi perjanjian tersebut (yaitu, membayar taruhannya).

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

## Catatan publik {#public-record}

Kontrak pintar berguna untuk audit dan pelacakan. Karena kontrak pintar Ethereum ada di rantai blok publik, siapa pun dapat dengan cepat melacak pemindahan aset dan informasi terkait lainnya. Sebagai contoh, Anda dapat memeriksa apakah seseorang telah mengirim uang ke alamat Anda.

## Perlindungan privasi {#privacy-protection}

Kontrak pintar juga melindungi privasi Anda. Karena Ethereum adalah jaringan dengan nama samaran (transaksi Anda terikat secara publik ke alamat kriptografik unik, bukan identitas Anda), Anda dapat melindungi privasi Anda dari pengintai.

## Ketentuan yang dapat dilihat {#visible-terms}

Akhirnya, seperti kontrak tradisional, Anda dapat memeriksa isi kontrak pintar sebelum Anda menandatanganinya (atau berinteraksi dengannya). Transparansi kontrak pintar menjamin bahwa siapa pun dapat memeriksanya secara teliti.

## Kasus penggunaan kontrak pintar {#use-cases}

Kontrak pintar dapat melakukan pada dasarnya segala hal yang dapat dilakukan oleh program komputer.

Kontrak pintar dapat melakukan komputasi, membuat mata uang, menyimpan data, mencetak [NFT](/glossary/#nft), mengirim komunikasi, dan bahkan menghasilkan grafik. Berikut adalah beberapa contoh penggunaan populer dan nyata:

- [Stablecoin](/stablecoins/)
- [Membuat dan mendistribusikan aset digital unik](/nft/)
- [Bursa mata uang otomatis dan terbuka](/get-eth/#dex)
- [Game terdesentralisasi](/apps/categories/gaming)
- [Polis asuransi yang membayar secara otomatis](https://etherisc.com/)
- [Standar yang memungkinkan orang untuk membuat mata uang yang disesuaikan dan dapat saling beroperasi](/developers/docs/standards/tokens/)

## Bacaan lebih lanjut {#further-reading}

- [Bagaimana Kontrak Pintar Akan Mengubah Dunia](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Kontrak pintar untuk para pengembang](/developers/docs/smart-contracts/)
- [Belajar menulis kontrak pintar](/developers/learning-tools/)
- [Mastering Ethereum - Apa itu Kontrak Pintar?](https://github.com/ethereumbook/ethereumbook/blob/openedition/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)

<Divider />

<QuizWidget quizKey="smart-contracts" />
