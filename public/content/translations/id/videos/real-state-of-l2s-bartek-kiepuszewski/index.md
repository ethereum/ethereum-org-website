---
title: "Keynote: Kondisi SEBENARNYA dari L2"
description: "Sebuah pembicaraan tentang kondisi solusi lapisan 2 (l2) saat ini, menguji kesenjangan antara janji keamanan rollup dan kenyataan, serta mengusulkan jalan menuju desentralisasi sejati."
lang: id
youtubeId: "ik2JxmHDmyw"
uploadDate: 2024-11-13
duration: "0:26:15"
educationLevel: advanced
topic:
  - "scaling-and-layer-2"
  - "rollups"
  - "layer-2"
format: presentation
author: Ethereum Foundation
breadcrumb: "Kondisi L2"
---

Sebuah keynote oleh **Bartek Kiepuszewski**, pendiri L2BEAT, di Devcon SEA yang menguji kondisi solusi lapisan 2 (l2) saat ini, kesenjangan antara janji keamanan rollup dan kenyataan, kategori evaluasi baru, dan janji L2BEAT untuk mengerahkan sumber daya yang signifikan dalam memverifikasi sistem bukti (proof systems) selama tahun depan.

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=ik2JxmHDmyw) yang diterbitkan oleh Yayasan Ethereum. Transkrip ini telah diedit sedikit untuk keterbacaan.*

#### Pengantar (0:00) {#introduction-000}

Sebagai pendiri L2BEAT, saya memiliki kesempatan unik untuk bekerja dengan hampir setiap tim L2 di luar sana, dan kami telah bekerja dengan mereka sejak awal mula ruang ini — yaitu sekitar empat tahun yang lalu. Itu luar biasa. Waktu berlalu dengan sangat cepat. Kami telah bekerja dengan para perintis awal dalam teknologi ZK, kami telah bekerja dengan Plasma Group yang berganti nama menjadi Optimism, kami telah bekerja dengan Arbitrum. Dan dari panggung ini saya ingin memberikan penghargaan kepada semua tim ini, karena tanpa dukungan Anda, kami tentu tidak akan berada di sini. Sebagai L2BEAT, kami sangat berterima kasih atas semua dukungan yang diberikan komunitas kepada kami.

Jadi mari kita lihat apa yang telah berhasil kita capai. Pertama-tama, kita telah berhasil meluncurkan hampir 50 rollup dan lebih dari 50 L2 lainnya. Itu adalah pencapaian yang luar biasa — ada banyak sistem, dan kita memiliki hampir sama banyaknya yang akan diluncurkan dalam beberapa bulan mendatang. Kita telah menempatkan banyak nilai, banyak total nilai terkunci (TVL), pada sistem-sistem ini juga, dan jika Anda melihat grafiknya, semuanya hanya naik.

Masalahnya adalah, dengan semua pertumbuhan itu datang juga banyak tanggung jawab. Kita perlu memahami bahwa pengguna akhir yang menggunakan sistem ini menaruh uang ke dalam rollup ini karena mereka percaya bahwa rollup mewarisi keamanan Ethereum. Dengan kesadaran semacam itu, menurut pendapat saya, kita perlu mulai serius tentang keamanan.

#### Menskalakan Ethereum (2:10) {#scaling-ethereum-210}

Kita juga telah berhasil menskalakan Ethereum. Ethereum berjalan dengan cukup baik, tetapi mulai menjadi sangat lambat untuk memenuhi permintaan dan biayanya menjadi sangat tinggi. Jadi pastinya kita sedang melakukan penskalaan — angka-angka ini juga naik. Ini luar biasa.

Namun, ada "tetapi". Anda tahu, teman-teman, selalu ada "tetapi", kan? Dan saya di sini hanya untuk jujur kepada Anda semua. Saya benar-benar ingin ruang ini menjadi serius, dan ini adalah kesempatan saya untuk meminta dukungan Anda guna memastikan bahwa kita tidak gagal — kita tidak mengecewakan harapan komunitas. Kita perlu mulai benar-benar serius tentang keamanan dari apa yang kita bangun.

Karena Anda tahu, kita telah menggunakan roda bantuan (training wheels) terlalu lama. Jika Anda orang dewasa yang menggunakan roda bantuan — dan saya ulangi, ini sudah empat tahun — maka Anda benar-benar tidak dewasa. Tidak apa-apa menggunakan roda bantuan jika Anda masih anak-anak. Tidak pantas menggunakan roda bantuan jika Anda orang dewasa. Dan saya pikir sudah waktunya bagi kita semua untuk benar-benar berhenti malu tentang hal itu. Kita semua harus angkat bicara, dan kita tidak boleh menderita sindrom pakaian baru kaisar (emperor's new clothes syndrome).

#### "Tetapi" yang besar: sistem bukti yang hilang (4:30) {#the-big-but-missing-proof-systems-430}

Jadi apa "tetapi" yang besar ini? Nah, pertama-tama, sebagian besar L2 saat ini tidak memiliki sistem bukti (proof system), yang mana cukup mengejutkan karena perintis awal seperti StarkNet, seperti zkSync, seperti Aztec — empat tahun lalu ketika mereka meluncurkan rollup spesifik aplikasi pertama mereka, mereka memiliki sistem bukti. Jadi ya, Anda dapat meluncurkan L2 hari ini dengan satu klik tombol. Namun, apakah itu benar-benar L2? Apakah itu benar-benar rollup? Apa yang Anda lakukan adalah meluncurkan sesuatu yang diamankan oleh multisig. Saya rasa itu tidak cukup baik.

Kondisi ekosistem saat ini kurang lebih seperti pada diagram ini. Di sebelah kiri Anda dapat melihat L2 saat ini dengan sistem bukti. Di sebelah kanan Anda dapat melihat L2 saat ini tanpa sistem bukti. Dan saya berani bertaruh bahwa sebagian besar L2 yang akan datang tidak akan memiliki sistem bukti. Itu pada dasarnya akan mencakup setiap rantai OP Stack kecuali OP Mainnet dan Base — dan pujian untuk mereka, omong-omong, mereka seperti juara. Namun, setiap rantai OP Stack lainnya sama sekali tidak memiliki sistem bukti.

Grafik di sebelah kanan itu juga akan mencakup semua tumpukan Orbit, yang memang memiliki sistem bukti, namun sebenarnya berada di balik daftar putih (whitelist) berizin yang sering kali sangat pendek. Terkadang daftar putih ini hanya satu aktor — sama dengan pengusul state. Pada dasarnya itu adalah pengusul state dan hanya mereka yang dapat menantang diri mereka sendiri. Seperti, apa? Yang benar saja.

#### Dewan keamanan (6:00) {#security-councils-600}

Sekarang, sebagian besar L2 tidak menggunakan dewan keamanan (security councils). Apa yang kita maksud dengan dewan keamanan? Dewan keamanan pada dasarnya adalah multisig yang terdiri dari setidaknya delapan peserta dan mewajibkan ambang batas konsensus 75%. Jadi Anda dapat menganggapnya sebagai multisig besar, tetapi ini bukan hanya tentang ukuran — ini tentang fakta bahwa kita ingin para peserta terdesentralisasi secara geografis. Anda mungkin telah mendengar presentasi luar biasa kemarin tentang perlunya diversifikasi geografis. Itulah yang kita inginkan dari struktur ini. Dan pada dasarnya, yang paling penting kita ingin para peserta berasal dari perusahaan yang berbeda dan yurisdiksi yang berbeda. Itu sangat penting, dan saya akan menunjukkan kepada Anda beberapa contoh alasannya.

Anggaplah dewan keamanan sebagai multisig yang sangat kuat ini. Ada lapisan sosial yang sangat penting di baliknya. Jadi inilah kondisi saat ini, dan sekali lagi, ini sangat buruk. Kita hanya memiliki dewan keamanan di Arbitrum, Optimism, Polygon, zkSync — dan saya tahu bahwa StarkNet, Scroll, dan menariknya Fuel diluncurkan dengan dewan keamanan. Semua yang lain pada dasarnya adalah multisig yang sangat kecil, internal, sering kali privat, dan terus terang sangat sulit untuk membedakan antara multisig ini dan EOA sederhana.

#### Asumsi kepercayaan ketersediaan data (7:25) {#data-availability-trust-assumptions-725}

Hal besar ketiga yang kita lakukan dengan salah adalah bahwa sebagian besar L2 non-rollup diatur dengan asumsi kepercayaan ketersediaan data (DA) yang sangat buruk. Dan saya menggunakan kata "sangat buruk" (abysmal) — A, karena saya menyukainya, dan B, karena itu benar-benar sangat buruk.

Lihatlah contoh-contoh di sebelah kiri ini — Arbitrum, StarkEx, Immutable X. Namun, hampir semua yang lain secara harfiah memposting DA ke server mereka di ruang bawah tanah atau apa pun. Kita tidak tahu. Kita benar-benar tidak tahu. Intinya adalah, mereka sangat buruk dan mereka tampaknya tidak peduli. Jadi mungkin pengguna tidak peduli — kita tidak tahu. Tetapi kita perlu benar-benar melihat data itu dan memberi tahu semua orang, hei, itu bukan komite ketersediaan data (DAC).

Komite ketersediaan data pada awalnya dibuat dan diperjuangkan oleh StarkWare untuk implementasi StarkEx dan oleh Arbitrum. Tetapi bukan itu intinya — bahwa Anda dapat mengatakan "Saya punya satu server di ruang bawah tanah saya, saya dapat menyebutnya komite ketersediaan data." Bukan itu tujuan dari latihan tersebut.

Jadi secara keseluruhan, maaf untuk mengatakannya, tetapi saat ini di sebagian besar L2, operator berizin dapat mencuri atau membekukan dana Anda. Kami di sini untuk membuat Anda semua menyadari hal itu. Maaf mengatakannya, tetapi kita perlu mengubah sikap tersebut.

#### Mengapa sistem bukti itu penting (8:40) {#why-proof-systems-matter-840}

Mengapa kita harus peduli dengan sistem bukti? Setidaknya ada tiga alasan bagus menurut pendapat kami mengapa kita semua harus memiliki sistem bukti yang berfungsi.

Salah satunya adalah bahwa hal itu sebenarnya memungkinkan keluar tanpa izin jika semua operator sedang mati — dan mereka mungkin mati karena alasan apa pun. Kita baru-baru ini mengalami kasus dYdX yang mati. Mereka memperingatkan pengguna, banyak pengguna tidak keluar. Namun, jika Anda memiliki sistem bukti, Anda dapat membuat sistem sedemikian rupa sehingga dengan cara tanpa izin seseorang akan mengambil alih, atau Anda dapat membangun mekanisme penyelamatan sehingga pengguna akan dapat mengeluarkan dana mereka. Itu sangat penting. Tanpa sistem bukti Anda sama sekali tidak dapat melakukan itu — itu tidak mungkin.

Alasan kedua adalah bahwa Anda sebenarnya dapat meningkatkan asumsi kepercayaan dari dewan keamanan — tentu saja dengan asumsi Anda memilikinya. Dan alasannya cukup bernuansa. Apa yang dapat Anda lakukan sekarang adalah ini: alih-alih situasi di mana pengusul yang jahat — dan ini adalah diagram yang menunjukkan rollup Optimistic standar tanpa sistem bukti, yang dapat Anda lihat di banyak OP Stack saat ini — ada multisig yang sangat kuat yang dapat menimpa akar state, dan ada pengusul yang mengusulkan akar state. Jika proposal itu jahat, yang perlu mereka lakukan hanyalah menyuap minoritas anggota dewan keamanan untuk memalingkan muka — bukan untuk melakukan sesuatu yang jahat, tetapi hanya untuk tidak melakukan apa-apa, dalam hal ini proposal jahat itu akan benar-benar lolos dan mereka akan mencuri dana tersebut.

Setelah Anda memperkenalkan sistem bukti, situasinya jauh lebih sulit bagi pengusul yang jahat, karena sekarang mereka perlu menyuap **mayoritas** dewan keamanan. Tidak hanya mereka harus menyuap mayoritas, mereka harus benar-benar membuat mereka melakukan sesuatu yang jahat — bukan sekadar memalingkan muka. Itu adalah proposisi yang sangat berbeda. Membuat seseorang memalingkan muka sama dengan mengatakan, "Hei, jika saya memberi Anda $10 juta, Anda cukup menghilangkan kunci Anda atau pergi untuk penerbangan internasional yang panjang." Jika Anda ingin membuat seseorang melakukan sesuatu yang jahat, itu adalah proposisi yang sama sekali berbeda. Kami berpikir bahwa ini secara fundamental mengubah asumsi kepercayaan, terutama dengan dewan keamanan publik.

Terakhir, sistem bukti — jika Anda berada di Tahap 2 — memungkinkan Anda untuk menghapus perantara apa pun. Anda tidak memerlukan dewan keamanan, atau jika Anda memilikinya, itu hanya untuk situasi darurat. Jadi itu mungkin sebenarnya memiliki implikasi regulasi yang mendalam. Anda mungkin ingin meluncurkan L2 Anda sebagai sistem Tahap 2 sejak awal. Itu mungkin, tetapi tentu saja Anda perlu memiliki sistem bukti — idealnya Anda mungkin ingin memiliki lebih dari satu. Sudah ada beberapa pengumuman tentang sistem yang melakukan itu, seperti pengumuman baru-baru ini dari tim Nethermind yang membangun rollup yang dimaksudkan untuk menjadi Tahap 2 saat peluncuran.

#### Mengapa dewan keamanan, bukan multisig (11:29) {#why-security-councils-not-multisigs-1129}

Itu tadi tentang sistem bukti. Sekarang, mengapa dewan keamanan dan bukan sekadar multisig sederhana? Alasannya adalah: jangan percaya multisig adalah multisig. Itulah alasannya — kecuali ada lapisan sosial yang benar-benar dapat meyakinkan Anda bahwa ini pada dasarnya terdiversifikasi.

Kita telah mengalami beberapa peristiwa besar dalam sejarah kita. Kita memiliki Multichain yang mengklaim bahwa mereka sangat terdesentralisasi, dan ternyata tidak, mereka tidak terdesentralisasi — dan ini adalah klaim yang tidak dapat Anda verifikasi secara independen. Serangan besar, atau pekerjaan orang dalam, atau penipuan (rug) — kita tidak yakin.

Kemudian kita memiliki situasi dengan Oasis, di mana mereka didekati oleh pengadilan Inggris dan mereka harus benar-benar menggunakan multisig untuk mengekstrak beberapa dana dari protokol. Akan mustahil untuk melakukan itu jika Anda memiliki dewan keamanan yang terdiversifikasi secara geopolitik, karena tidak ada perintah pengadilan yang benar-benar dapat menjangkau semua orang.

Terakhir, baru-baru ini kita mengalami serangan terhadap multisig. Jangan berpikir sedetik pun bahwa multisig tidak dapat diserang. Pada akhirnya kita harus menyingkirkan semuanya.

Jadi untuk meringkas: jika Anda memiliki rollup Tahap 0 tanpa dewan keamanan, pada dasarnya operator yang jahat dapat melakukan apa pun yang mereka inginkan dengan dana Anda. Jika Anda adalah rollup Tahap 0 dengan dewan keamanan, maka penyerang perlu menyuap minoritas dewan keamanan — mungkin hal yang sulit dilakukan, tetapi jauh lebih mudah daripada menyuap mayoritas dewan keamanan, yang perlu Anda lakukan jika rollup Anda memiliki sistem bukti. Dan terakhir, tidak ada yang dapat mencuri dana Anda jika Anda berada di Tahap 2. Itulah janji untuk mencapai Tahap 2.

#### Usulan reklasifikasi (13:10) {#proposed-reclassification-1310}

Pertanyaannya adalah: apakah kita memiliki insentif yang tepat agar proyek-proyek benar-benar peduli? Masalahnya adalah satu-satunya hal yang dapat kita lakukan — kita sebagai L2BEAT dan kita sebagai komunitas Ethereum — adalah menerapkan tekanan sosial. Vitalik mengatakan bahwa mulai tahun depan ia berencana untuk hanya menyebutkan secara publik L2 yang berada di Tahap 1. Ia sebelumnya bahkan mengatakan bahwa ia tidak akan menyebut sistem sebagai rollup jika mereka bukan Tahap 1.

Jadi kami bertanya-tanya apa yang bisa kami lakukan. Saat ini kami memiliki tahapan untuk rollup. Kami tidak memiliki tahapan untuk validium dan optimium. Kami bertanya-tanya untuk waktu yang lama — mungkin kami bisa memperkenalkan "Tahap 0+" untuk sistem yang memiliki sistem bukti tetapi belum mencapai Tahap 1. Tetapi setelah berbulan-bulan diskusi, kami memutuskan: tidak, sudah waktunya untuk menjadi dewasa.

Apa yang kami usulkan kepada komunitas — dan ini akan masuk ke forum untuk umpan balik komunitas — adalah ini. Pertama, kami ingin membuat kategori terpisah untuk sistem. Perbedaan utamanya adalah Anda harus memiliki sistem bukti untuk menjadi Tahap 0. Jadi misalnya, StarkNet hari ini akan menjadi Tahap 0 di bawah klasifikasi ini. Semua rantai OP Stack yang tidak memiliki sistem bukti — kecuali Base dan Optimism — tidak akan masuk ke dalam kategori ini. Dan tentu saja, kami akan memberikan waktu bagi sistem untuk menyesuaikan diri. Itu adalah kategori utama, dan itu seharusnya seperti liga super dari sistem-sistem.

Kemudian Anda memiliki kategori sistem lain yang tidak menggunakan DA Ethereum. Mereka menggunakan asumsi kepercayaan tambahan yang datang dengan DA eksternal. Kami menyebutnya "alt-DA" tetapi mereka akan mencakup validium, optimium, dan konstruksi hibrida apa pun yang mungkin Anda buat. Namun, mereka harus memberi Anda jaminan DA yang masuk akal — itu tidak bisa berupa ruang bawah tanah Anda. Itu harus berupa komite ketersediaan data dengan ukuran yang wajar, atau jika Anda menggunakan Celestia atau Avail, Anda perlu menggunakan jembatan.

#### Kategori "lainnya" dan janji L2BEAT (16:05) {#the-others-category-and-l2beats-pledge-1605}

Bagaimana dengan yang lainnya? Kami akan memasukkannya ke dalam kategori ketiga, yang kami sebut — dan sekarang saya sedang menunggu umpan balik komunitas tentang cara menamai sistem ini — nama kerja kami adalah "lainnya" (others). Intinya adalah mereka diamankan oleh multisig, dan kami akan mengekspos multisig ini apa adanya. Itulah yang ingin kami lakukan di UI kami.

UI-nya akan terlihat kira-kira seperti ini: Anda akan melihat rincian ini — rollup, validium dan optimium, dan lainnya. Dan penyortiran default akan berdasarkan keamanan, bukan berdasarkan TVL. Mari kita tidak mengejar TVL dengan keamanan yang buruk — itu akan berakhir dengan sangat buruk.

Kami akan mempromosikan proyek Tahap 1 dan Tahap 2. Kami akan melihat proyek Tahap 0 sebagai pesaing. Untuk yang "lainnya", kami dengan senang hati mendaftarkannya — kami akan sangat liberal. Anda hanya perlu pada dasarnya selaras dengan Ethereum dan jelas memiliki jembatan yang memungkinkan Anda untuk memindahkan dana. Namun, kami akan melihat asumsi kepercayaan dan multisig, dan kami berharap perlahan tapi pasti sistem akan berpindah dari "lainnya" ke validium/optimium atau ke rollup.

Inilah yang kami pikir akan terlihat pada kategori "lainnya" — ini adalah data nyata saat ini, sistem nyata yang mungkin masuk ke dalam kategori ini jika mereka tidak memperkenalkan sistem bukti. Anda akan melihat dengan tepat siapa pengusulnya, siapa penantangnya, dan siapa pembaru (upgrader)-nya. Lucunya, Anda dapat melihatnya hari ini di L2BEAT — hanya saja informasi ini sangat tersembunyi jauh di halaman detail sehingga saya berani bertaruh hanya peneliti dan penggemar yang memeriksanya. Semuanya tersedia hari ini. Namun, kami ingin mengekspos data tersebut kepada pengguna akhir. Kami ingin pengguna akhir benar-benar menyadari apa yang sedang terjadi, sehingga kita semua bertanggung jawab atas sistem yang kita bangun.

Apakah cukup hanya dengan mengatakan "Saya punya sistem bukti"? Tidak. Janji kami kepada komunitas sebagai L2BEAT adalah bahwa tahun depan kami akan mengerahkan sumber daya yang signifikan untuk benar-benar melihat dengan sangat keras dan sangat dalam ke sistem bukti ini guna memastikan bahwa mereka kuat dan lengkap. Kami akan menganalisis baik ZK maupun Optimistic. Kami akan masuk ke kode sumber, kami akan melihat bagaimana Anda membuat pengaturan tepercaya Anda, kami akan melihat sirkuit Anda dan melihat apa sebenarnya yang sedang diverifikasi onchain. Kami ingin membuat semuanya sangat transparan sehingga asumsi kepercayaan dikomunikasikan dengan jelas — dan yang lebih penting, sistem bukti Anda tidak dapat disembunyikan di balik daftar putih yang sangat kecil dan tidak masuk akal.

Kami sedang merekrut peneliti. Kami akan melakukan semua pekerjaan itu. Ini adalah janji kami untuk tahun depan. Saya harap tahun depan akan menjadi tahun bagi L2 dan rollup — namun, ini bukan tentang meluncurkan rollup dengan satu klik tombol. Intinya adalah Anda ingin dapat meluncurkan sistem dengan keamanan yang baik. Idealnya Anda ingin mewarisi sebanyak mungkin keamanan dari Ethereum. Ada banyak pekerjaan yang harus dilakukan bagi kita semua untuk mencapai itu. Tetapi jika tidak, maka yang kita lakukan pada dasarnya hanyalah menciptakan ribuan sidechain yang tidak aman. Saya pikir, kita sebagai komunitas tidak menginginkan hal itu.

#### Tanya Jawab (18:45) {#qa-1845}

**Pembawa Acara:** Mari kita lakukan Tanya Jawab. Apakah penting bagi rollup untuk memiliki sekuenser yang terdesentralisasi, atau apakah mekanisme keamanan lainnya sudah cukup?

**Bartek Kiepuszewski:** Ini adalah pertanyaan yang sangat bagus dan penting. Saya pikir ada berbagai desain berbeda yang akan kita lihat. Saya tidak berpikir mendesentralisasikan sekuenser sangat penting untuk keamanan dana pengguna, tetapi itu mungkin penting untuk ketahanan sensor waktu nyata (realtime) dalam situasi tertentu. Vitalik mengatakan selama keynote pembukaannya bahwa masa depan mungkin adalah kita melihat rollup menjadi berbasis (based) — memanfaatkan infrastruktur Ethereum untuk memerangi ketahanan sensor waktu nyata — sementara yang lain, seperti katakanlah MegaETH, mungkin sebenarnya memiliki sekuenser yang sangat terpusat dan hanya mengandalkan mekanisme penyelamatan. Kita mungkin melihat konstruksi hibrida. Saya pikir ruang desainnya sangat besar, dan saat ini di L2BEAT kami benar-benar ingin melihat apa yang akan terjadi dan bagaimana hal itu akan berjalan.

**Pembawa Acara:** Apakah sistem bukti berbasis TEE akan dianggap Tahap 2 meskipun mereka menyiratkan kepercayaan pada produsen perangkat keras?

**Bartek Kiepuszewski:** Jawaban singkatnya adalah tidak, karena dengan konstruksi yang kita lihat saat ini, jika Anda menggunakan SGX, Intel dapat mengirimkan bukti dan mereka berpotensi memblokir, mencuri, atau membekukan apa pun yang mereka inginkan tanpa ada yang benar-benar menyadarinya — dan tanpa disadari oleh Ethereum. Namun, dengan semua pekerjaan yang diajukan untuk membuat TEE tanpa kepercayaan dan tanpa izin — saya diberi tahu bahwa ini sebenarnya adalah pekerjaan yang sangat menarik. Tetapi jawaban singkatnya: hari ini, tidak.

**Pembawa Acara:** Mengapa Optimism diklasifikasikan sebagai Tahap 1? Berdasarkan evaluasi, mereka tidak — Yayasan mengendalikan proses proposal sepenuhnya.

**Bartek Kiepuszewski:** Mereka pada dasarnya memenuhi semua kriteria. Ini bukan benar-benar tentang proses proposal — ini tentang siapa yang mengendalikan dana. Anda dapat memiliki pengusul yang terpusat, namun ada cadangan (fallback). Jika mereka mati, maka seluruh sistem menjadi lebih tanpa izin. Saya pikir penting untuk mengenali apa peran dewan keamanan. Kami ingin sistem Tahap 1 memungkinkan Anda untuk keluar jika pengusul yang terpusat berhenti. Misalnya, dengan dYdX, proposalnya sangat terpusat, namun ketika mereka berhenti, orang-orang dapat keluar. Jadi ini bukan tentang apakah Anda terpusat atau terdesentralisasi — ini tentang apakah Anda benar-benar dapat keluar dengan cara tanpa izin.

Mereka memenuhi semua kriteria. Omong-omong, kami sedang menyempurnakan — kriteria bukanlah sesuatu yang ditetapkan secara permanen karena semua sistem ini berkembang, jadi kami perlu berkembang bersama sistem-sistem ini. Kriterianya mungkin sedikit berubah, dan kami melihat sangat dekat pada Optimism dan Arbitrum karena jelas mereka adalah dua pemimpin. Ada banyak nuansa yang tidak punya waktu untuk saya bahas. Tetapi ini bukan berarti Anda memiliki penunjukan tahap selamanya — jika ada informasi baru atau sesuatu yang mungkin kami lewati atau lewatkan, sangat mungkin Anda dapat kehilangan penunjukan tersebut.

**Pembawa Acara:** Apa alasan utama proyek tidak membangun menuju Tahap 1?

**Bartek Kiepuszewski:** Kompleksitas, waktu, biaya, bakat. Ini secara mengejutkan mahal. Seperti yang saya katakan, para perintis empat tahun lalu pada dasarnya sedang membangun — dYdX secara harfiah adalah salah satu yang pertama, jika bukan yang pertama, rollup ZK. Itu spesifik aplikasi, tetapi tetap saja itu yang pertama. Dan jika bukan karena nuansa kecil, itu akan menjadi Tahap 2 — sungguh, proses tata kelola yang kami wajibkan untuk Tahap 2 yang gagal. Tetapi untuk semua maksud dan tujuan, itu adalah sistem Tahap 2. Itu dibangun empat tahun lalu, jadi bukan berarti itu tidak mungkin.

Saya pikir apa yang membuatnya sangat sulit hari ini bagi semua rollup untuk benar-benar melakukan ini, terus terang, adalah bahwa sebagian besar rollup tidak dibangun oleh tim — mereka diluncurkan oleh penyedia rollup-as-a-service, dan kita perlu memberi insentif kepada mereka untuk benar-benar melakukan yang lebih baik. Dan itu sulit. Tidak ada yang mengatakan bahwa itu akan mudah.