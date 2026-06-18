---
title: Apa itu DAO?
metaTitle: Apa itu DAO? | Organisasi Otonom Terdesentralisasi
description: Gambaran umum tentang DAO di Ethereum
lang: id
template: use-cases
sidebarDepth: 2
image: /images/use-cases/dao-2.png
alt: Representasi DAO yang sedang memberikan suara pada sebuah proposal.
summaryPoints:
  - "Komunitas milik anggota tanpa kepemimpinan terpusat."
  - "Cara yang aman untuk berkolaborasi dengan orang asing di internet."
  - "Tempat yang aman untuk menyalurkan dana pada tujuan tertentu."
---

## Apa itu DAO? {#what-are-daos}

DAO adalah organisasi yang dimiliki secara kolektif dan bekerja menuju misi bersama.

DAO memungkinkan kita untuk bekerja dengan orang-orang yang sepemikiran di seluruh dunia tanpa harus memercayai seorang pemimpin yang baik hati untuk mengelola dana atau operasi. Tidak ada CEO yang dapat menghabiskan dana sesuka hati atau CFO yang dapat memanipulasi pembukuan. Sebaliknya, aturan berbasis rantai blok yang tertanam di dalam kode menentukan bagaimana organisasi bekerja dan bagaimana dana dihabiskan.

Mereka memiliki perbendaharaan bawaan yang tidak dapat diakses oleh siapa pun tanpa persetujuan kelompok. Keputusan diatur oleh proposal dan pemungutan suara untuk memastikan setiap orang dalam organisasi memiliki suara, dan semuanya terjadi secara transparan [onchain](/glossary/#onchain).

## Mengapa kita membutuhkan DAO? {#why-dao}

Memulai sebuah organisasi dengan seseorang yang melibatkan pendanaan dan uang membutuhkan banyak kepercayaan pada orang yang bekerja dengan Anda. Namun, sulit untuk memercayai seseorang yang hanya pernah berinteraksi dengan Anda di internet. Dengan DAO, Anda tidak perlu memercayai siapa pun di dalam kelompok, cukup kode DAO tersebut, yang 100% transparan dan dapat diverifikasi oleh siapa saja.

Hal ini membuka begitu banyak peluang baru untuk kolaborasi dan koordinasi global.

### Sebuah perbandingan {#dao-comparison}

| DAO                                                                                                                     | Organisasi tradisional                                                                       |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Biasanya datar, dan sepenuhnya terdemokratisasi.                                                                                   | Biasanya hierarkis.                                                                            |
| Pemungutan suara oleh anggota diperlukan agar setiap perubahan dapat diimplementasikan.                                                           | Bergantung pada strukturnya, perubahan dapat dituntut dari satu pihak, atau pemungutan suara mungkin ditawarkan.     |
| Suara dihitung, dan hasilnya diimplementasikan secara otomatis tanpa perantara tepercaya.                                      | Jika pemungutan suara diizinkan, suara dihitung secara internal, dan hasil pemungutan suara harus ditangani secara manual. |
| Layanan yang ditawarkan ditangani secara otomatis dengan cara yang terdesentralisasi (misalnya distribusi dana filantropi). | Membutuhkan penanganan manusia, atau otomatisasi yang dikendalikan secara terpusat, rentan terhadap manipulasi.              |
| Semua aktivitas transparan dan sepenuhnya publik.                                                                           | Aktivitas biasanya bersifat privat, dan terbatas untuk publik.                                        |

### Contoh DAO {#dao-examples}

Agar lebih mudah dipahami, berikut adalah beberapa contoh bagaimana Anda dapat menggunakan DAO:

- **Amal** – Anda dapat menerima donasi dari siapa saja di dunia dan memberikan suara pada tujuan mana yang akan didanai.
- **Kepemilikan kolektif** – Anda dapat membeli aset fisik atau digital dan anggota dapat memberikan suara tentang cara menggunakannya.
- **Ventura dan hibah** – Anda dapat membuat dana ventura yang mengumpulkan modal investasi dan memberikan suara pada ventura yang akan didukung. Uang yang dikembalikan nantinya dapat didistribusikan kembali di antara anggota DAO.

<VideoWatch slug="dao-build-next-great-city" />

## Bagaimana cara kerja DAO? {#how-daos-work}

Tulang punggung DAO adalah [kontrak pintar](/glossary/#smart-contract) miliknya, yang menentukan aturan organisasi dan menyimpan perbendaharaan kelompok. Setelah kontrak aktif di [Ethereum](/), tidak ada yang dapat mengubah aturan kecuali melalui pemungutan suara. Jika ada yang mencoba melakukan sesuatu yang tidak tercakup oleh aturan dan logika dalam kode, hal itu akan gagal. Dan karena perbendaharaan juga ditentukan oleh kontrak pintar, itu berarti tidak ada yang dapat menghabiskan uang tanpa persetujuan kelompok juga. Ini berarti bahwa DAO tidak memerlukan otoritas pusat. Sebaliknya, kelompok membuat keputusan secara kolektif, dan pembayaran diotorisasi secara otomatis ketika pemungutan suara disahkan.

Hal ini dimungkinkan karena kontrak pintar tidak dapat dirusak setelah aktif di Ethereum. Anda tidak bisa begitu saja mengedit kode (aturan DAO) tanpa disadari orang karena semuanya bersifat publik.

## Ethereum dan DAO {#ethereum-and-daos}

Ethereum adalah fondasi yang sempurna untuk DAO karena beberapa alasan:

- Konsensus Ethereum sendiri terdesentralisasi dan cukup mapan bagi organisasi untuk memercayai jaringan.
- Kode kontrak pintar tidak dapat dimodifikasi setelah aktif, bahkan oleh pemiliknya. Hal ini memungkinkan DAO berjalan sesuai dengan aturan yang telah diprogramkan.
- Kontrak pintar dapat mengirim/menerima dana. Tanpa ini, Anda akan membutuhkan perantara tepercaya untuk mengelola dana kelompok.
- Komunitas Ethereum telah terbukti lebih kolaboratif daripada kompetitif, memungkinkan praktik terbaik dan sistem dukungan muncul dengan cepat.

## Tata kelola DAO {#dao-governance}

Ada banyak pertimbangan saat mengelola tata kelola DAO, seperti bagaimana pemungutan suara dan proposal bekerja.

### Pendelegasian {#governance-delegation}

Pendelegasian seperti versi DAO dari demokrasi perwakilan. Pemegang token mendelegasikan suara kepada pengguna yang mencalonkan diri dan berkomitmen untuk mengelola protokol serta terus mengikuti perkembangan informasi.

#### Contoh terkenal {#governance-example}

[ENS](https://claim.ens.domains/delegate-ranking) – Pemegang ENS dapat mendelegasikan suara mereka kepada anggota komunitas yang terlibat untuk mewakili mereka.

### Tata kelola transaksi otomatis {#governance-example-2}

Di banyak DAO, transaksi akan dieksekusi secara otomatis jika kuorum anggota memberikan suara setuju.

#### Contoh terkenal {#governance-example-3}

[Nouns](https://nouns.wtf) – Di Nouns DAO, sebuah transaksi dieksekusi secara otomatis jika kuorum suara terpenuhi dan mayoritas memberikan suara setuju, selama tidak diveto oleh para pendiri.

### Tata kelola multisig {#governance-example-4}

Meskipun DAO mungkin memiliki ribuan anggota yang memberikan suara, dana dapat disimpan di dalam [dompet](/glossary/#wallet) yang dibagikan oleh 5-20 anggota komunitas aktif yang tepercaya dan biasanya di-doxxing (identitas publiknya diketahui oleh komunitas). Setelah pemungutan suara, penandatangan [multisig](/glossary/#multisig) mengeksekusi kehendak komunitas.

## Hukum DAO {#dao-laws}

Pada tahun 1977, Wyoming menciptakan LLC, yang melindungi pengusaha dan membatasi kewajiban mereka. Baru-baru ini, mereka memelopori hukum DAO yang menetapkan status hukum untuk DAO. Saat ini Wyoming, Vermont, dan Kepulauan Virgin memiliki hukum DAO dalam beberapa bentuk.

### Contoh terkenal {#law-example}

[CityDAO](https://citizen.citydao.io/) – CityDAO menggunakan hukum DAO Wyoming untuk membeli 40 hektar tanah di dekat Taman Nasional Yellowstone.

## Keanggotaan DAO {#dao-membership}

Ada berbagai model untuk keanggotaan DAO. Keanggotaan dapat menentukan bagaimana pemungutan suara bekerja dan bagian penting lainnya dari DAO.

### Keanggotaan berbasis token {#token-based-membership}

Biasanya sepenuhnya [tanpa izin](/glossary/#permissionless), bergantung pada token yang digunakan. Sebagian besar token tata kelola ini dapat diperdagangkan tanpa izin di [bursa terdesentralisasi](/glossary/#dex). Yang lain harus diperoleh melalui penyediaan likuiditas atau 'Bukti Kerja (PoW)' lainnya. Bagaimanapun juga, hanya dengan memegang token akan memberikan akses ke pemungutan suara.

_Biasanya digunakan untuk mengatur protokol terdesentralisasi yang luas dan/atau token itu sendiri._

#### Contoh terkenal {#token-example}

[MakerDAO](https://makerdao.com) – Token MKR milik MakerDAO tersedia secara luas di bursa terdesentralisasi dan siapa pun dapat membelinya untuk memiliki hak suara pada masa depan protokol Maker.

### Keanggotaan berbasis saham {#share-based-membership}

DAO berbasis saham lebih berizin, tetapi masih cukup terbuka. Setiap calon anggota dapat mengajukan proposal untuk bergabung dengan DAO, biasanya menawarkan upeti dengan nilai tertentu dalam bentuk token atau pekerjaan. Saham mewakili hak suara dan kepemilikan langsung. Anggota dapat keluar kapan saja dengan bagian proporsional mereka dari perbendaharaan.

_Biasanya digunakan untuk organisasi yang lebih erat dan berpusat pada manusia seperti badan amal, kolektif pekerja, dan klub investasi. Dapat juga mengatur protokol dan token._

### Keanggotaan berbasis reputasi {#reputation-based-membership}

Reputasi mewakili bukti partisipasi dan memberikan hak suara di dalam DAO. Tidak seperti keanggotaan berbasis token atau saham, DAO berbasis reputasi tidak mentransfer kepemilikan kepada kontributor. Reputasi tidak dapat dibeli, ditransfer, atau didelegasikan; anggota DAO harus mendapatkan reputasi melalui partisipasi. Pemungutan suara onchain bersifat tanpa izin dan calon anggota dapat dengan bebas mengajukan proposal untuk bergabung dengan DAO dan meminta untuk menerima reputasi serta token sebagai imbalan atas kontribusi mereka.

_Biasanya digunakan untuk pengembangan terdesentralisasi dan tata kelola protokol serta [aplikasi terdesentralisasi (dapp)](/glossary/#dapp), tetapi juga sangat cocok untuk beragam organisasi seperti badan amal, kolektif pekerja, klub investasi, dll._

#### Contoh terkenal {#reputation-example}

[DXdao](https://DXdao.eth.limo) – DXdao adalah kolektif berdaulat global yang membangun dan mengatur protokol serta aplikasi terdesentralisasi sejak tahun 2019. Mereka memanfaatkan tata kelola berbasis reputasi dan [konsensus holografik](/glossary/#holographic-consensus) untuk mengoordinasikan dan mengelola dana, yang berarti tidak ada seorang pun yang dapat membeli jalan mereka untuk memengaruhi masa depan atau tata kelolanya.

## Bergabung / memulai DAO {#join-start-a-dao}

### Bergabung dengan DAO {#join-a-dao}

- [DAO komunitas Ethereum](/community/get-involved/#decentralized-autonomous-organizations-daos)
- [Daftar DAO DAOHaus](https://app.daohaus.club/explore)
- [Daftar DAO Tally.xyz](https://www.tally.xyz/explore)
- [Daftar DAO DeGov.AI](https://apps.degov.ai/)

### Memulai DAO {#start-a-dao}

- [Buat DAO dengan DAOHaus](https://app.daohaus.club/summon)
- [Mulai Governor DAO dengan Tally](https://www.tally.xyz/get-started)
- [Buat DAO yang didukung Aragon](https://aragon.org/product)
- [Mulai sebuah colony](https://colony.io/)
- [Buat DAO dengan konsensus holografik DAOstack](https://alchemy.daostack.io/daos/create)
- [Luncurkan DAO dengan DeGov Launcher](https://docs.degov.ai/integration/deploy)

## Bacaan lebih lanjut {#further-reading}

### Artikel DAO {#dao-articles}

- [Apa itu DAO?](https://aragon.org/dao) – [Aragon](https://aragon.org/)
- [House of DAOs](https://wiki.metagame.wtf/docs/great-houses/house-of-daos) – [Metagame](https://wiki.metagame.wtf/)
- [Apa itu DAO dan apa fungsinya?](https://daohaus.substack.com/p/-what-is-a-dao-and-what-is-it-for) – [DAOhaus](https://daohaus.club/)
- [Cara Memulai Komunitas Digital yang Didukung DAO](https://daohaus.substack.com/p/four-and-a-half-steps-to-start-a) – [DAOhaus](https://daohaus.club/)
- [Apa itu DAO?](https://coinmarketcap.com/alexandria/article/what-is-a-dao) – [Coinmarketcap](https://coinmarketcap.com)
- [Apa itu Konsensus Holografik?](https://medium.com/daostack/holographic-consensus-part-1-116a73ba1e1c) - [DAOstack](https://daostack.io/)
- [DAO bukanlah korporasi: di mana desentralisasi dalam organisasi otonom menjadi penting oleh Vitalik](https://vitalik.eth.limo/general/2022/09/20/daos.html)
- [DAO, DAC, DA, dan Lainnya: Panduan Terminologi yang Belum Lengkap](https://blog.ethereum.org/2014/05/06/daos-dacs-das-and-more-an-incomplete-terminology-guide) - [Blog Ethereum](https://blog.ethereum.org)

### Video {#videos}

- [Apa itu DAO dalam kripto?](https://youtu.be/KHm0uUPqmVE)
- [Dapatkah DAO Membangun Kota?](https://www.ted.com/talks/scott_fitsimones_could_a_dao_build_the_next_great_city) – [TED](https://www.ted.com/)

<Divider />

<QuizWidget quizKey="daos" />