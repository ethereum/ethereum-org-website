---
title: Organisasi otonom terdesentralisasi (DAO)
description: Gambaran umum tentang DAO di Ethereum
lang: id
template: use-cases
emoji: ":handshake:"
sidebarDepth: 2
image: ../../../../assets/use-cases/dao-2.png
alt: Sebuah representasi DAO yang mengambil suara untuk sebuah usulan.
summaryPoint1: Komunitas yang dimiliki anggota tanpa kepemimpinan terpusat.
summaryPoint2: Cara yang aman untuk berkolaborasi dengan orang asing di internet.
summaryPoint3: Tempat yang aman untuk menyuntikkan dana untuk tujuan tertentu.
---

## Apa itu DAO? {#what-are-daos}

DAO adalah cara yang efektif dan aman untuk bekerja dengan orang-orang yang berpikiran sama di seluruh dunia.

Bayangkanlah DAO seperti perusahaan asli internet yang secara bersama dimiliki dan dikelola oleh para anggotanya. Mereka memiliki perbendaharaan bawaan yang tidak dapat diakses oleh siapa pun tanpa persetujuan grup. Keputusan diatur melalui proposal dan pengambilan suara untuk memastikan setiap orang di organisasi memiliki suara.

Tidak ada CEO yang dapat mengotorisasi pengeluaran berdasarkan keinginannya sendiri dan tidak ada peluang bagi CFO yang licik untuk memanipulasi pembukuan. Semua hal terbuka dan aturan seputar pengeluaran dimasukkan ke dalam DAO melalui kodenya.

## Mengapa kita membutuhkan DAO? {#why-dao}

Memulai sebuah organisasi dengan seseorang yang melibatkan pendanaan dan uang membutuhkan kepercayaan besar terhadap orang-orang yang bekerja sama dengan Anda. Tetapi sulit untuk mempercayai seseorang yang jarang berinteraksi dengan Anda di internet. Dengan DAO, Anda tidak perlu mempercayai siapa pun di dalam grup, cukup percaya pada kode DAO-nya, yang 100% terbuka dan dapat diverifikasi oleh siapa saja.

Ini membuka banyak peluang baru untuk kolaborasi dan koordinasi global.

### Perbandingan {#dao-comparison}

| DAO                                                                                                                 | Organisasi tradisional                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Biasanya datar, dan sepenuhnya demokratis.                                                                          | Biasanya berhierarki.                                                                                                    |
| Pengambilan suara diperlukan oleh para anggotanya untuk mengimplementasikan perubahan apa pun.                      | Bergantung pada struktur, perubahan dapat diminta oleh satu pihak, atau pengambilan suara dapat ditawarkan.              |
| Suara dihitung, hasilnya secara otomatis diimplementasikan tanpa memerlukan perantara terpercaya.                   | Jika pengambilan suara memungkinkan, suara dihitung secara internal, dan hasilnya harus ditangani secara manual.         |
| Layanan yang ditawarkan ditangani secara otomatis dalam cara yang terdesentralisasi (misalnya pembagian dana amal). | Memerlukan penanganan manusia, atau otomatisasi yang dikontrol secara terpusat, yang cenderung mengarah pada manipulasi. |
| Semua aktivitas bersifat transparan dan diketahui secara umum.                                                      | Aktivitas umumnya bersifat privat, dan terbatas untuk diketahui publik.                                                  |

### Contoh DAO {#dao-examples}

Untuk membantu memahaminya, berikut adalah beberapa contoh cara menggunakan DAO:

- Badan amal – Anda dapat menerima keanggotaan dan donasi dari siapa pun di seluruh dunia dan grup dapat menentukan bagaimana mereka akan menggunakan donasi yang terkumpul.
- Jaringan pekerja lepas – Anda dapat membuat jaringan para kontraktor yang meletakkan dananya dalam pool untuk berlangganan ruangan kantor dan perangkat lunak.
- Perusahaan patungan dan hibah – Anda dapat membuat dana patungan yang memasukkan dana modal dalam pool dan mengambil suara untuk menarik dananya. Uang yang dibayarkan kembali dapat dibagikan kembali nantinya di antara para anggota DAO.

## Keanggotaan DAO {#dao-membership}

Ada berbagai model untuk keanggotaan DAO. Keanggotaan dapat menentukan cara kerja pengambilan suara dan bagian utamai DAO lainnya.

### Keanggotaan berbasis token {#token-based-membership}

Biasanya sepenuhnya tanpa izin, tergantung pada token yang digunakan. Kebanyakan token tata kelola ini dapat diperdagangkan untuk mendapatkan status tanpa izin di bursa terdesentralisasi. Yang lainnya harus didapatkan melalui penyediaan likuiditas atau beberapa ‘bukti kerja’ lainnya. Dengan cara mana pun, cukup dengan memiliki token ini memberikan akses untuk mengambil suara.

_Umumnya dipakai untuk mengatur protokol terdesentralisasi yang luas dan/atau token itu sendiri._

#### Contoh yang terkenal {#token-example}

[MakerDAO](https://makerdao.com) – MKR token MakerDAO tersedia secara luas di bursa terdesentralisasi. Jadi, siapa pun dapat membelinya untuk memiliki hak suara di protokol Maker nantinya.

### Keanggotaan berbasis saham {#share-based-membership}

DAO berbasis saham lebih diizinkan, tetapi masih cukup terbuka. Anggota prospektif mana pun dapat mengirimkan proposal untuk bergabung dengan DAO ini, yang biasanya menawarkan upeti dengan sejumlah nilai dalam bentuk token atau pekerjaan. Saham mewakili hak memberikan suara secara langsung dan kepemilikan. Anggota bisa keluar kapan pun dengan membawa saham proporsional perbendaharaan mereka.

_Biasanya digunakan untuk organisasi yang interaksinya lebih erat dan berfokus pada manusia seperti badan amal, asosiasi pekerja, dan klub investasi. Dapat juga mengatur protokol serta token._

#### Contoh yang terkenal {#share-example}

[MolochDAO](http://molochdao.com/) – MolochDAO berfokus pada pendanaan proyek Ethereum. Mereka membutuhkan proposal untuk keanggotaan, sehingga grup dapat menilai apakah Anda memiliki keahlian dan modal yang diperlukan untuk membuat penilaian yang tepat tentang calon penerima hibah. Anda tidak bisa membeli saja akses ke DAO ini di pasar terbuka.

## Bagaimana cara kerja DAO? {#how-daos-work}

Tulang punggung dari sebuah DAO adalah kontrak pintarnya. Kontrak menentukan aturan organisasi dan memegang perbendaharaan grup. Setelah kontrak dijalankan di Ethereum, tidak ada seorang pun yang dapat mengubah aturannya kecuali melalui pengambilan suara. Jika siapa pun mencoba melakukan sesuatu yang tidak tercakup dalam aturan dan logika kode, ini akan gagal. Dan karena perbendaharaan ditentukan oleh kontrak pintar juga, itu berarti tidak seorang pun dapat memakai uang kas tanpa persetujuan grup. Ini berarti DAO tidak memerlukan otoritas terpusat. Sebagai gantinya, grup membuat keputusan secara bersama dan pembayaran diotorisasi secara otomatis ketika jumlah suara sudah terpenuhi.

Ini mungkin terjadi karena kontrak pintar bersifat tahan perubahan setelah dijalankan di Ethereum. Anda tidak bisa hanya mengedit kode (aturan DAO) tanpa diketahui orang-orang karena semua hal terbuka untuk publik.

<DocLink to="/smart-contracts/">
  Lebih lanjut tentang kontrak pintar
</DocLink>

## Ethereum dan DAO {#ethereum-and-daos}

Ethereum adalah fondasi sempurna untuk DAO dikarenakan beberapa alasan:

- Konsensus yang dimiliki Ethereum terdistribusi dan cukup mapan jaringannya untuk dipercaya oleh organisasi.
- Kode kontrak pintar tidak dapat diubah setelah dijalankan, sekalipun oleh pemiliknya. Ini memungkinkan DAO dijalankan sesuai aturan yang dirpogram dengannya.
- Kontrak pintar dapat mengirim/menerima dana. Tanpa ini, Anda akan memerlukan perantara terpercaya untuk mengelola dana grup.
- Komunitas Ethereum telah terbukti lebih kolaboratif daripada kompetitif, yang memungkinkan praktik terbaik dan sistem dukungan dengan cepat berkembang.

## Bergabung dengan / memulai DAO {#join-start-a-dao}

### Bergabung dengan DAO {#join-a-dao}

- [DAO komunitas Ethereum](/community/get-involved/#decentralized-autonomous-organizations-daos)
- [Daftar DAO DAOHaus](https://app.daohaus.club/explore)

### Memulai DAO {#start-a-dao}

- [Memanggil DAO dengan DAOHaus](https://app.daohaus.club/summon)
- [Membuat DAO yang didukung oleh Aragon](https://aragon.org/product)
- [Memulai koloni](https://colony.io/)
- [Membangun DAO dengan DAOstack](https://daostack.io/)

## Bacaan lebih lanjut {#further-reading}

### Artikel tentang DAO {#dao-articles}

- [Apa itu DAO?](https://aragon.org/dao) – [Aragon](https://aragon.org/)
- [Rumah DAO](https://wiki.metagame.wtf/docs/great-houses/house-of-daos) – [Metagame](https://wiki.metagame.wtf/)
- [Apa itu DAO dan apa kegunaannya?](https://daohaus.substack.com/p/-what-is-a-dao-and-what-is-it-for) – [DAOhaus](https://daohaus.club/)
- [Cara Memulai Komunitas Digital yang Didukung oleh DAO](https://daohaus.substack.com/p/four-and-a-half-steps-to-start-a) – [DAOhaus](https://daohaus.club/)
- [Apa itu DAO?](https://coinmarketcap.com/alexandria/article/what-is-a-dao) – [Coinmarketcap](https://coinmarketcap.com)

### Video {#videos}

- [Apa itu DAO dalam kripto?](https://youtu.be/KHm0uUPqmVE)
