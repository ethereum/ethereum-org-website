---
title: Pohon Verkle
description: Deskripsi tingkat tinggi tentang pohon Verkle dan bagaimana mereka akan digunakan untuk meningkatkan Ethereum
lang: id
summaryPoints:
  - Temukan apa itu pohon Verkle
  - Baca mengapa Pohon Verkle adalah peningkatan yang berguna untuk Ethereum
---

Pohon Verkle (lakuran dari "komitmen Vektor" dan "Pohon Merkle") adalah struktur data yang dapat digunakan untuk meningkatkan node [Ethereum](/) sehingga mereka dapat berhenti menyimpan sejumlah besar data state tanpa kehilangan kemampuan untuk memvalidasi blok.

## Ketiadaan state {#statelessness}

Pohon Verkle adalah langkah penting di jalur menuju klien Ethereum tanpa state. Klien tanpa state adalah klien yang tidak perlu menyimpan seluruh basis data state untuk memvalidasi blok yang masuk. Alih-alih menggunakan salinan lokal state Ethereum mereka sendiri untuk memverifikasi blok, klien tanpa state menggunakan "saksi" untuk data state yang tiba bersama blok tersebut. Saksi adalah kumpulan potongan individu dari data state yang diperlukan untuk mengeksekusi serangkaian transaksi tertentu, dan bukti kriptografi bahwa saksi tersebut benar-benar bagian dari data lengkap. Saksi digunakan _sebagai pengganti_ basis data state. Agar ini berfungsi, saksi harus sangat kecil, sehingga dapat disiarkan dengan aman di seluruh jaringan tepat waktu agar validator dapat memprosesnya dalam slot 12 detik. Struktur data state saat ini tidak cocok karena saksi terlalu besar. Pohon Verkle memecahkan masalah ini dengan memungkinkan saksi berukuran kecil, menghilangkan salah satu hambatan utama bagi klien tanpa state.

<ExpandableCard title="Mengapa kita menginginkan klien tanpa state?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

Klien Ethereum saat ini menggunakan struktur data yang dikenal sebagai Patricia Merkle Trie untuk menyimpan data state-nya. Informasi tentang akun individu disimpan sebagai daun pada trie dan pasangan daun di-hash berulang kali hingga hanya tersisa satu hash tunggal. Hash akhir ini dikenal sebagai "akar". Untuk memverifikasi blok, klien Ethereum mengeksekusi semua transaksi dalam sebuah blok dan memperbarui trie keadaan lokal mereka. Blok dianggap valid jika akar dari pohon lokal identik dengan yang disediakan oleh pengusul blok, karena setiap perbedaan dalam komputasi yang dilakukan oleh pengusul blok dan node yang memvalidasi akan menyebabkan hash akar menjadi sama sekali berbeda. Masalahnya adalah memverifikasi rantai blok mengharuskan setiap klien untuk menyimpan seluruh trie keadaan untuk blok kepala dan beberapa blok historis (default di Geth adalah menyimpan data state untuk 128 blok di belakang kepala). Hal ini mengharuskan klien untuk memiliki akses ke ruang disk dalam jumlah besar, yang merupakan hambatan untuk menjalankan node penuh pada perangkat keras yang murah dan berdaya rendah. Solusi untuk ini adalah memperbarui trie keadaan ke struktur yang lebih efisien (pohon Verkle) yang dapat diringkas menggunakan "saksi" kecil untuk data yang dapat dibagikan sebagai pengganti data state lengkap. Memformat ulang data state menjadi pohon Verkle adalah batu loncatan untuk beralih ke klien tanpa state.

</ExpandableCard>

## Apa itu saksi dan mengapa kita membutuhkannya? {#what-is-a-witness}

Memverifikasi sebuah blok berarti mengeksekusi ulang transaksi yang terkandung dalam blok tersebut, menerapkan perubahan pada trie keadaan Ethereum, dan menghitung hash akar yang baru. Blok yang diverifikasi adalah blok yang hash akar state hasil komputasinya sama dengan yang disediakan bersama blok tersebut (karena ini berarti pengusul blok benar-benar melakukan komputasi yang mereka katakan telah mereka lakukan). Pada klien Ethereum saat ini, memperbarui state memerlukan akses ke seluruh trie keadaan, yang merupakan struktur data besar yang harus disimpan secara lokal. Saksi hanya berisi fragmen data state yang diperlukan untuk mengeksekusi transaksi di dalam blok. Validator kemudian hanya dapat menggunakan fragmen tersebut untuk memverifikasi bahwa pengusul blok telah mengeksekusi transaksi blok dan memperbarui state dengan benar. Namun, ini berarti bahwa saksi perlu ditransfer antar rekan di jaringan Ethereum dengan cukup cepat agar dapat diterima dan diproses oleh setiap node dengan aman dalam slot 12 detik. Jika saksi terlalu besar, mungkin butuh waktu terlalu lama bagi beberapa node untuk mengunduhnya dan mengikuti rantai. Ini adalah kekuatan pemusatan karena itu berarti hanya node dengan koneksi internet cepat yang dapat berpartisipasi dalam memvalidasi blok. Dengan pohon Verkle, tidak perlu menyimpan state di hard drive Anda; _semua_ yang Anda butuhkan untuk memverifikasi blok terkandung di dalam blok itu sendiri. Sayangnya, saksi yang dapat dihasilkan dari trie Merkle terlalu besar untuk mendukung klien tanpa state.

## Mengapa pohon Verkle memungkinkan saksi yang lebih kecil? {#why-do-verkle-trees-enable-smaller-witnesses}

Struktur trie Merkle membuat ukuran saksi menjadi sangat besar - terlalu besar untuk disiarkan dengan aman antar rekan dalam slot 12 detik. Hal ini karena saksi adalah jalur yang menghubungkan data, yang disimpan di daun, ke hash akar. Untuk memverifikasi data, tidak hanya diperlukan semua hash perantara yang menghubungkan setiap daun ke akar, tetapi juga semua node "saudara". Setiap node dalam bukti memiliki saudara yang di-hash bersamanya untuk membuat hash berikutnya di atas trie. Ini adalah data yang sangat banyak. Pohon Verkle mengurangi ukuran saksi dengan memperpendek jarak antara daun pohon dan akarnya serta menghilangkan kebutuhan untuk menyediakan node saudara untuk memverifikasi hash akar. Efisiensi ruang yang lebih besar akan diperoleh dengan menggunakan skema komitmen polinomial yang kuat alih-alih komitmen vektor bergaya hash. Komitmen polinomial memungkinkan saksi memiliki ukuran tetap terlepas dari jumlah daun yang dibuktikannya.

Di bawah skema komitmen polinomial, saksi memiliki ukuran yang dapat dikelola yang dapat dengan mudah ditransfer di jaringan peer-to-peer. Hal ini memungkinkan klien untuk memverifikasi perubahan state di setiap blok dengan jumlah data yang minimal.

<ExpandableCard title="Seberapa besar tepatnya Pohon Verkle dapat mengurangi ukuran Saksi?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

Ukuran saksi bervariasi tergantung pada jumlah daun yang disertakannya. Dengan asumsi saksi mencakup 1000 daun, saksi untuk trie Merkle akan berukuran sekitar 3,5MB (dengan asumsi 7 tingkat pada trie). Saksi untuk data yang sama dalam pohon Verkle (dengan asumsi 4 tingkat pada pohon) akan berukuran sekitar 150 kB - **sekitar 23x lebih kecil**. Pengurangan ukuran saksi ini akan memungkinkan saksi klien tanpa state menjadi cukup kecil. Saksi polinomial berukuran 0,128 - 1 kB tergantung pada komitmen polinomial spesifik mana yang digunakan.

</ExpandableCard>

## Apa struktur dari pohon Verkle? {#what-is-the-structure-of-a-verkle-tree}

Pohon Verkle adalah pasangan `(key,value)` di mana kuncinya adalah elemen 32-byte yang terdiri dari _batang_ 31-byte dan _akhiran_ byte tunggal. Kunci-kunci ini diatur ke dalam node _ekstensi_ dan node _dalam_. Node ekstensi mewakili satu batang untuk 256 anak dengan akhiran yang berbeda. Node dalam juga memiliki 256 anak, tetapi mereka bisa berupa node ekstensi lainnya. Perbedaan utama antara struktur pohon Verkle dan pohon Merkle adalah bahwa pohon Verkle jauh lebih datar, yang berarti ada lebih sedikit node perantara yang menghubungkan daun ke akar, dan oleh karena itu lebih sedikit data yang diperlukan untuk menghasilkan bukti.

![Diagram of a Verkle tree data structure](./verkle.png)

[Baca lebih lanjut tentang struktur pohon Verkle](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## Kemajuan saat ini {#current-progress}

Testnet pohon Verkle sudah aktif dan berjalan, tetapi masih ada pembaruan substansial yang belum diselesaikan pada klien yang diperlukan untuk mendukung pohon Verkle. Anda dapat membantu mempercepat kemajuan dengan menerapkan kontrak ke testnet atau menjalankan klien testnet.

[Tonton Guillaume Ballet menjelaskan testnet Verkle Condrieu](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (perhatikan bahwa testnet Condrieu menggunakan Bukti Kerja (PoW) dan sekarang telah digantikan oleh testnet Verkle Gen Devnet 6).

## Bacaan lebih lanjut {#further-reading}

- [Pohon Verkle untuk Ketiadaan State](https://verkle.info/)
- [Dankrad Feist menjelaskan pohon Verkle di PEEPanEIP](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [Pohon Verkle Untuk Kita Semua](https://web.archive.org/web/20250124132255/https://research.2077.xyz/verkle-trees)
- [Anatomi Bukti Verkle](https://ihagopian.com/posts/anatomy-of-a-verkle-proof)
- [Guillaume Ballet menjelaskan pohon Verkle di ETHGlobal](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- ["Bagaimana pohon Verkle membuat Ethereum ramping dan tangguh" oleh Guillaume Ballet di Devcon 6](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [Piper Merriam tentang klien tanpa state dari ETHDenver 2020](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [Dankrad Fiest menjelaskan pohon Verkle dan ketiadaan state di podcast Zero Knowledge](https://zeroknowledge.fm/podcast/202/)
- [Vitalik Buterin tentang pohon Verkle](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Dankrad Feist tentang pohon Verkle](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [Dokumentasi EIP pohon Verkle](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)