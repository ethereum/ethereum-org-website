---
title: Pengantar kontrak pintar
metaTitle: "Kontrak pintar: Apa itu dan apa manfaatnya"
description: Pengantar non-teknis tentang kontrak pintar
lang: id
---

Kontrak pintar adalah blok bangunan fundamental dari lapisan aplikasi [Ethereum](/). Mereka adalah program komputer yang disimpan di [rantai blok](/glossary/#blockchain) yang mengikuti logika "jika ini maka itu", dan dijamin akan dieksekusi sesuai dengan aturan yang ditentukan oleh kodenya, yang tidak dapat diubah setelah dibuat.

Nick Szabo menciptakan istilah "kontrak pintar". Pada tahun 1994, ia menulis [pengantar untuk konsep tersebut](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html), dan pada tahun 1996 ia menulis [eksplorasi tentang apa yang dapat dilakukan oleh kontrak pintar](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Szabo membayangkan pasar digital di mana proses otomatis yang [aman secara kriptografi](/glossary/#cryptography) memungkinkan transaksi dan fungsi bisnis terjadi tanpa perantara tepercaya. Kontrak pintar di Ethereum mewujudkan visi ini ke dalam praktik.

Tonton Finematics menjelaskan kontrak pintar:

<VideoWatch slug="smart-contracts-code-is-law" />

## Kepercayaan dalam kontrak konvensional {#trust-and-contracts}

Salah satu masalah terbesar dengan kontrak tradisional adalah perlunya individu tepercaya untuk menindaklanjuti hasil kontrak.

Berikut adalah contohnya:

Alice dan Bob sedang mengadakan balap sepeda. Katakanlah Alice bertaruh $10 dengan Bob bahwa dia akan memenangkan perlombaan. Bob yakin dia akan menjadi pemenang dan menyetujui taruhan tersebut. Pada akhirnya, Alice menyelesaikan perlombaan jauh di depan Bob dan jelas menjadi pemenangnya. Namun Bob menolak untuk membayar taruhan tersebut, dengan mengklaim bahwa Alice pasti telah berbuat curang.

Contoh konyol ini mengilustrasikan masalah dengan perjanjian non-pintar apa pun. Bahkan jika kondisi perjanjian terpenuhi (yaitu, Anda adalah pemenang perlombaan), Anda masih harus memercayai orang lain untuk memenuhi perjanjian tersebut (yaitu, pembayaran taruhan).

## Mesin penjual otomatis digital {#vending-machine}

Metafora sederhana untuk kontrak pintar adalah mesin penjual otomatis, yang bekerja agak mirip dengan kontrak pintar - masukan spesifik menjamin keluaran yang telah ditentukan sebelumnya.

- Anda memilih produk
- Mesin penjual otomatis menampilkan harga
- Anda membayar harganya
- Mesin penjual otomatis memverifikasi bahwa Anda membayar jumlah yang tepat
- Mesin penjual otomatis memberikan barang Anda

Mesin penjual otomatis hanya akan mengeluarkan produk yang Anda inginkan setelah semua persyaratan terpenuhi. Jika Anda tidak memilih produk atau memasukkan cukup uang, mesin penjual otomatis tidak akan mengeluarkan produk Anda.

## Eksekusi otomatis {#automation}

Manfaat utama dari kontrak pintar adalah ia secara deterministik mengeksekusi kode yang tidak ambigu ketika kondisi tertentu terpenuhi. Tidak perlu menunggu manusia untuk menafsirkan atau menegosiasikan hasilnya. Hal ini menghilangkan kebutuhan akan perantara tepercaya.

Misalnya, Anda dapat menulis kontrak pintar yang menahan dana di eskro untuk seorang anak, yang memungkinkan mereka untuk menarik dana setelah tanggal tertentu. Jika mereka mencoba menarik sebelum tanggal tersebut, kontrak pintar tidak akan dieksekusi. Atau Anda dapat menulis kontrak yang secara otomatis memberi Anda versi digital dari bukti kepemilikan mobil ketika Anda membayar ke dealer.

## Hasil yang dapat diprediksi {#predictability}

Kontrak tradisional bersifat ambigu karena bergantung pada manusia untuk menafsirkan dan mengimplementasikannya. Misalnya, dua hakim mungkin menafsirkan kontrak secara berbeda, yang dapat menyebabkan keputusan yang tidak konsisten dan hasil yang tidak setara. Kontrak pintar menghilangkan kemungkinan ini. Sebaliknya, kontrak pintar dieksekusi secara tepat berdasarkan kondisi yang tertulis di dalam kode kontrak. Ketepatan ini berarti bahwa dengan keadaan yang sama, kontrak pintar akan menghasilkan hasil yang sama.

## Catatan publik {#public-record}

Kontrak pintar berguna untuk audit dan pelacakan. Karena kontrak pintar Ethereum berada di rantai blok publik, siapa pun dapat langsung melacak transfer aset dan informasi terkait lainnya. Misalnya, Anda dapat memeriksa untuk melihat bahwa seseorang mengirim uang ke alamat Anda.

## Perlindungan privasi {#privacy-protection}

Kontrak pintar juga melindungi privasi Anda. Karena Ethereum adalah jaringan pseudonim (transaksi Anda terikat secara publik ke alamat kriptografi yang unik, bukan identitas Anda), Anda dapat melindungi privasi Anda dari pengamat.

## Ketentuan yang terlihat {#visible-terms}

Terakhir, seperti kontrak tradisional, Anda dapat memeriksa apa yang ada di dalam kontrak pintar sebelum Anda menandatanganinya. Tidak seperti kontrak tradisional, transparansi onchain kontrak pintar memungkinkan siapa saja untuk meneliti dan meninjaunya sebelum berinteraksi dengannya. 

Namun, meskipun siapa pun dapat melihat ketentuan kontrak pintar, data transaksi mentah dirancang untuk ditafsirkan oleh aplikasi dan dompet, bukan manusia. Karena data ini sangat sulit dibaca, pengguna sering menghadapi risiko keamanan besar yang disebut "penandatanganan buta" (blind signing), atau menyetujui transaksi yang berinteraksi dengan kontrak pintar tanpa benar-benar memahami apa yang akan dilakukannya. 

Ekosistem Ethereum sedang bertransisi ke standar **[Penandatanganan Jelas (Clear Signing)](https://clearsigning.org/)** (khususnya [ERC-7730](https://eips.ethereum.org/EIPS/eip-7730)). Penandatanganan Jelas menerjemahkan data kontrak pintar yang buram menjadi deskripsi transaksi yang sederhana dan dapat dibaca manusia, memastikan siapa pun dapat memahami intensi sebenarnya dari sebuah kontrak sebelum mereka menandatanganinya.

## Kasus penggunaan kontrak pintar {#use-cases}

Kontrak pintar pada dasarnya dapat melakukan apa pun yang dapat dilakukan oleh program komputer.

Mereka dapat melakukan komputasi, membuat mata uang, menyimpan data, mencetak [NFT](/glossary/#nft), mengirim komunikasi, dan bahkan menghasilkan grafik. Berikut adalah beberapa contoh populer di dunia nyata:

- [Stablecoin](/stablecoins/)
- [Membuat dan mendistribusikan aset digital unik](/nft/)
- [Pertukaran mata uang terbuka dan otomatis](/get-eth/#dex)
- [Permainan terdesentralisasi](/apps/categories/gaming)
- [Polis asuransi yang membayar secara otomatis](https://etherisc.com/)
- [Standar yang memungkinkan orang membuat mata uang yang disesuaikan dan interoperabel](/developers/docs/standards/tokens/)

## Bacaan lebih lanjut {#further-reading}

- [Bagaimana Kontrak Pintar Akan Mengubah Dunia](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Kontrak pintar untuk pengembang](/developers/docs/smart-contracts/)
- [Belajar menulis kontrak pintar](/developers/learning-tools/)
- [Menguasai Ethereum - Apa itu Kontrak Pintar?](https://github.com/ethereumbook/ethereumbook/blob/openedition/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)

<Divider />

<QuizWidget quizKey="smart-contracts" />