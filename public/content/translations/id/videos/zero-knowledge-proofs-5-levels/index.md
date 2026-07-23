---
title: "Bukti tanpa pengetahuan dijelaskan dalam 5 tingkat kesulitan"
description: "Seorang ilmuwan komputer menjelaskan bukti tanpa pengetahuan pada lima tingkat kompleksitas yang berbeda, dari seorang anak hingga seorang ahli."
lang: id
youtubeId: "fOGdb1CTu5c"
uploadDate: 2021-12-13
duration: "0:18:19"
educationLevel: beginner
topic:
  - "privacy-and-security"
  - "zero-knowledge-proofs"
  - "cryptography"
format: explainer
author: WIRED
breadcrumb: "Bukti Tanpa Pengetahuan"
---

Ilmuwan komputer **Amit Sahai**, seorang profesor di UCLA Samueli School of Engineering, menjelaskan bukti tanpa pengetahuan pada lima tingkat kompleksitas, dari seorang anak hingga seorang ahli, dalam produksi **WIRED** ini. Konsep ini didemonstrasikan melalui analogi fisik dan dibahas dengan kedalaman teknis yang meningkat, membuat salah satu konsep terpenting kriptografi dapat diakses oleh semua orang.

*Transkrip ini adalah salinan yang dapat diakses dari [transkrip video asli](https://www.youtube.com/watch?v=fOGdb1CTu5c) yang diterbitkan oleh WIRED. Transkrip ini telah sedikit diedit agar lebih mudah dibaca.*

#### Pengantar (0:00) {#introduction-000}

**Amit Sahai:** Hai, nama saya Amit Sahai, dan saya adalah profesor ilmu komputer di UCLA Samueli School of Engineering. Hari ini, saya diminta untuk menjelaskan bukti tanpa pengetahuan dalam lima tingkat kompleksitas yang meningkat.

Bukti tanpa pengetahuan adalah cara bagi seorang pembukti untuk meyakinkan pemverifikasi bahwa suatu pernyataan adalah benar, namun tidak mengungkapkan informasi tambahan apa pun di luar fakta bahwa pernyataan tersebut benar. Bukti tanpa pengetahuan sedang digunakan dalam rantai blok dan mata uang kripto. Para ahli kriptografi sangat antusias dengan zero-knowledge karena sifat matematisnya yang menakjubkan, tetapi juga karena penerapannya yang luar biasa pada begitu banyak skenario yang berbeda.

#### Tingkat 1: anak-anak (0:41) {#level-1-child-041}

**Amit Sahai:** Apa mata pelajaran favoritmu?

**Chelsea:** Menurutku matematika. Beberapa masalah kecil sebenarnya bisa menjadi sangat besar dan rumit. Ini seperti teka-teki.

**Amit Sahai:** Aku suka matematika karena alasan yang sama. Hari ini, aku akan memberitahumu tentang sesuatu yang disebut bukti tanpa pengetahuan. Dalam bukti tanpa pengetahuan, ada dua orang — ada pembukti dan pemverifikasi. Aku ingin membuktikan bahwa sesuatu itu benar kepadamu, tetapi anehnya, aku ingin membuktikan kepadamu bahwa itu benar tanpa memberitahumu alasannya. Aku ingat ketika pertama kali mendengarnya, aku berpikir, tunggu, apa? Bagaimana mungkin itu bisa terjadi?

Jadi apa yang kamu lihat di foto ini?

**Chelsea:** Banyak penguin.

**Amit Sahai:** Ya. Tersembunyi di antara semua penguin ini ada seekor puffin. Apakah kamu ingin mencoba mencarinya? Apakah kamu melihat di mana ia berada? Aku tahu di mana ia berada, tetapi aku tidak ingin memberitahumu. Apakah kamu percaya padaku?

**Chelsea:** Ya.

**Amit Sahai:** Tetapi bagaimana jika aku bisa membuktikan kepadamu bahwa aku tahu di mana puffin itu berada tanpa mengungkapkan kepadamu di mana letaknya? Biar kutunjukkan. Aku mengambil foto itu dan meletakkannya di balik poster ini. Mengapa kamu tidak coba melihat melalui lubang itu?

**Chelsea:** Aku melihat puffin itu.

**Amit Sahai:** Jadi ketika kamu melihat papan ini, kita tidak tahu di mana foto itu berada, kan? Apakah foto itu dengan sudut di sini, yang berarti puffin itu akan berada jauh di sisi ini? Atau apakah foto itu dengan sudut di sini, yang berarti puffin itu akan berada di sisi lain? Jadi ini adalah contoh yang sangat sederhana dari bukti tanpa pengetahuan. Aku meyakinkanmu bahwa aku tahu di mana puffin itu berada, tetapi kamu tidak mempelajari hal lain.

**Chelsea:** Mengapa kamu mempelajari bukti tanpa pengetahuan?

**Amit Sahai:** Ketika aku pertama kali mempelajarinya, aku hanya berpikir itu sangat keren. Tetapi ternyata itu juga sangat berguna — bukan hanya untuk menemukan puffin. Jika kamu hanya mengetikkan kata sandimu dan peretas meretas komputer, mereka bisa mendapatkan kata sandimu. Bagaimana jika sebaliknya, kita bisa menggunakan bukti tanpa pengetahuan untuk masuk? Kamu hanya akan dapat membuktikan bahwa kamu adalah Chelsea, tanpa mengungkapkan apa pun kepada mereka. Jika kamu bisa melakukan itu, maka itu akan luar biasa, karena bahkan jika peretas meretas komputer, mereka tidak akan mempelajari apa pun — karena bahkan komputer pun tidak mempelajari apa pun.

Jadi Chelsea, dengan kata-katamu sendiri, apa itu bukti tanpa pengetahuan?

**Chelsea:** Bukti tanpa pengetahuan adalah bukti untuk sebuah pernyataan. Kamu tidak menunjukkan kepada mereka mengapa atau apa. Kamu hanya menunjukkan kepada mereka segmen kecil, atau hanya melakukan semacam trik sulap aneh yang sebenarnya bukan trik sulap, dan mereka akan yakin. Dan kamu tidak menunjukkan kepada mereka alasannya, atau hal semacam itu.

#### Tingkat 2: remaja (3:31) {#level-2-teen-331}

**Amit Sahai:** Jadi, apakah kamu pernah mendengar istilah bukti tanpa pengetahuan sebelumnya?

**Remaja:** Belum pernah, tidak.

**Amit Sahai:** Ini adalah cara bagi seorang pembukti untuk meyakinkan pemverifikasi bahwa sesuatu itu benar tanpa mengungkapkan apa pun tentang mengapa itu benar, yang terdengar sangat aneh. Apa yang ingin aku lakukan adalah membuktikan kepadamu bahwa aku tahu kombinasi ini tanpa mengungkapkan kombinasi tersebut kepadamu. Dan apa yang bisa kamu lakukan adalah menulis catatan kecil, sebuah rahasia yang pasti tidak akan aku ketahui. Lipat, masukkan ke sini. Dan kemudian, jika aku tahu kombinasinya, aku seharusnya bisa membukanya dan memberitahumu apa yang kamu tulis.

Baiklah. "Anjingku bernama Doug."

**Remaja:** Apakah kamu mengetahui apa kombinasinya?

**Amit Sahai:** Tidak. Jadi tidak ada di bagian mana pun dalam interaksi ini kamu melihat informasi yang belum kamu ketahui. Namun aku meyakinkanmu bahwa aku tahu kombinasinya.

**Remaja:** Jadi apa tujuan pasti dari bukti tanpa pengetahuan? Apakah seperti membuktikan sesuatu tetapi tanpa memberikan informasi yang cukup yang dapat membahayakan apa pun yang sedang kamu buktikan?

**Amit Sahai:** Orang-orang tidak saling percaya. Dan jika aku bisa membuktikan bahwa aku telah melakukan sesuatu dengan benar kepada seseorang tanpa harus mengungkapkan rahasiaku, maka orang itu akan lebih mempercayaiku.

**Remaja:** Bagaimana ini berhubungan dengan teknologi komputer? Apakah ini interaksi tatap muka?

**Amit Sahai:** Misalkan kamu ingin bertukar pesan dengan seseorang yang kamu kenal. Kamu mungkin pertama-tama akan berkumpul dan memikirkan suatu kode rahasia, kan? Dan kemudian menulis pesan satu sama lain dalam kode itu. Tetapi bagaimana jika kamu belum pernah bertemu orang itu sebelumnya? Bagaimana jika kamu ingin bertukar pesan rahasia denganku dan kita belum pernah bertemu sebelumnya? Bagaimana mungkin kita bisa melakukan itu?

**Remaja:** Aku tidak tahu.

**Amit Sahai:** Kedengarannya mustahil, kan? Tetapi ternyata tidak. Kamu tidak akan menggunakan gembok fisik atau kotak fisik. Sebaliknya, kita akan menggunakan matematika untuk melakukan hal-hal semacam ini. Kamu bisa mengambil sebuah pesan dan mengenkripsinya menggunakan matematika. Dan kemudian aku bisa membuktikan kepadamu bahwa aku tahu kunci tersebut, membukanya, dan mengirimkannya kembali kepadamu. Dengan cara itu aku akan membuktikan kepadamu bahwa aku tahu kunci matematis untuk kotak kunci matematis tersebut.

Jadi berdasarkan apa yang telah kita diskusikan hari ini, dengan kata-katamu sendiri, apa itu bukti tanpa pengetahuan?

**Remaja:** Ini seperti jika kamu memiliki rahasia yang sangat penting yang ingin kamu beri tahukan kepada seseorang, tetapi kamu tidak ingin memberi tahu mereka semuanya. Kamu bisa menggunakan bukti tanpa pengetahuan untuk membuktikan rahasia itu kepada mereka, tetapi tidak memberikan semuanya.

#### Tingkat 3: mahasiswa (6:13) {#level-3-college-student-613}

**Amit Sahai:** Apa yang sedang kamu pelajari?

**Mahasiswa:** Saya mahasiswa ilmu komputer tahun pertama di USC Viterbi. Saya tertarik dengan segala hal seperti data, internet, rantai blok, dan mata uang kripto.

**Amit Sahai:** Pernahkah kamu mendengar tentang bukti tanpa pengetahuan?

**Mahasiswa:** Hanya sekilas.

**Amit Sahai:** Sebenarnya, di ruang rantai blok adalah salah satu ruang di mana kita melihat bukti tanpa pengetahuan diimplementasikan — dan saya pikir ini baru permulaan. Pada intinya, bukti tanpa pengetahuan adalah interaksi antara dua orang. Saya seharusnya bisa meyakinkanmu bahwa suatu pernyataan itu benar, tetapi kamu tidak akan tahu mengapa itu benar.

Cara kita akan mendekati ini adalah melalui sesuatu yang disebut kelengkapan NP (NP-completeness). Masalah NP-lengkap adalah masalah yang sangat sulit untuk dipecahkan. Tetapi jika kamu bisa memecahkannya, kamu bisa memecahkan masalah apa pun yang ada di kelas NP — dan itu mencakup sejumlah besar masalah. Kita akan menggunakan masalah NP-lengkap untuk benar-benar membuktikan berbagai macam pernyataan yang luar biasa melalui bukti tanpa pengetahuan. Masalah NP-lengkap spesifik yang akan kita lihat disebut pewarnaan tiga peta (map three-coloring).

Di sini kita memiliki peta dengan sekumpulan negara, diatur sedemikian rupa sehingga tidak ada negara yang memiliki warna yang sama berbagi perbatasan. Itulah yang membuat peta seperti ini diwarnai dengan valid. Ternyata apakah sebuah peta dapat diwarnai dengan tiga warna dengan cara ini atau tidak adalah contoh dari masalah NP-lengkap.

Mungkin apa yang benar-benar ingin kamu lakukan adalah memberikan bukti tanpa pengetahuan bahwa kamu memiliki setidaknya 0.3 Bitcoin, tanpa mengungkapkan alamat akun kamu. Ternyata saya bisa mengambil pernyataan itu dan mengubahnya menjadi peta negara-negara. Peta negara-negara itu hanya akan dapat diwarnai dengan tiga warna jika kamu memiliki setidaknya 0.2 Bitcoin.

**Mahasiswa:** Bagaimana kita akan mengubah sesuatu seperti ini menjadi bukti tanpa pengetahuan?

**Amit Sahai:** Tentu saja, langkah pertama adalah kita harus menghapus semua warna. Saya telah memasukkan warna ke dalam masing-masing amplop ini. Sekarang, bagaimana kamu tahu bahwa itu adalah pewarnaan yang valid? Kamu tidak tahu. Kamu harus memilih dua negara tetangga mana saja — kamu bisa memilihnya sesukamu, secara acak.

**Mahasiswa:** Bisakah saya mengambil dua ini?

**Amit Sahai:** Di sini kita punya hijau, dan di sebelah sini kita punya biru. Seperti yang kamu lihat, keduanya adalah dua warna yang berbeda. Jadi kamu memiliki sedikit keyakinan bahwa saya telah berhasil mewarnai ini dengan benar — tetapi tidak terlalu yakin, karena saya hanya menunjukkan dua negara kepadamu. Salah satu cara untuk mendapatkan lebih banyak keyakinan adalah dengan membuka lebih banyak dari mereka, tetapi itu akan mengungkapkan informasi kepadamu. Saya tidak ingin melakukan itu.

Jadi sebagai gantinya, saya akan memintamu untuk berbalik. Dan sekarang, mari kita ubah warna-warna ini.

Bisakah kamu memilih dua negara secara acak, dan kita akan mengungkapkan dua warna lagi.

**Mahasiswa:** Saya akan mengambil yang ini dan yang ini.

**Amit Sahai:** Pintar sekali kamu memeriksa dengan yang sama yang sudah kamu miliki. Tetapi seperti yang akan kamu lihat, sekarang warnanya bukan hijau — melainkan biru. Dan yang ini di sisi lain, berwarna hijau. Warna yang saya tunjukkan terakhir kali tidak cocok dengan warna-warna baru ini. Tetapi ini berhasil untuk pewarnaan yang saya tunjukkan kepadamu saat ini. Jadi apa yang telah kita lakukan adalah kita telah membuatnya mustahil bagimu untuk menyatukan kepingan-kepingan itu. Dan jika kamu melakukan ini seribu kali, dan saya dengan benar menunjukkan warna yang berbeda setiap kali, kamu akan benar-benar yakin. Dan begitulah — itulah keseluruhan bukti tanpa pengetahuan.

**Mahasiswa:** Jadi apakah ini seperti bukti probabilistik?

**Amit Sahai:** Ya. Dalam implementasi aktual kita tidak akan menggunakan amplop — kamu akan menggunakan enkripsi. Tetapi ini adalah protokolnya.

**Mahasiswa:** Jadi apa implikasi yang lebih luas dari bukti tanpa pengetahuan? Apakah mereka seharusnya lebih praktis untuk implementasi, atau apakah mereka seharusnya secara struktural membuktikan sesuatu?

**Amit Sahai:** Ini bukan tentang membuat sesuatu menjadi lebih efisien. Ini tentang melakukan hal-hal yang sebelumnya tidak kita ketahui cara melakukannya. Saya benar-benar bisa membuktikan kepadamu, tanpa mengungkapkan rahasiaku, bahwa saya berperilaku jujur. Saya bisa membuktikan kepadamu bahwa saya menandatangani beberapa dokumen terenkripsi dengan benar tanpa mengungkapkan apa dokumen rahasia itu. Kemampuan untuk mengubah permainan itu — untuk benar-benar mengubah apa yang bisa kita lakukan — adalah apa yang dibawa oleh zero-knowledge.

**Mahasiswa:** Menurut Anda, di mana kita bisa membangun lebih banyak kepercayaan menggunakan bukti tanpa pengetahuan?

**Amit Sahai:** Salah satu contoh yang bagus adalah pemilihan umum. Jika kamu bisa membuktikan bahwa pemilihan umum dilakukan dengan benar — bahwa setiap suara dihitung dan semuanya dijumlahkan menjadi satu orang yang menang dengan total tertentu — dalam zero-knowledge, maka kamu tidak perlu menyerahkan suara aktual dari siapa pun. Namun semua orang bisa melihat bahwa itu dilakukan dengan benar.

#### Tingkat 4: mahasiswa pascasarjana (11:59) {#level-4-grad-student-1159}

**Amit Sahai:** Sangat menyenangkan kamu ada di sini dan berbicara denganmu, Eli. Bisakah kamu ceritakan sedikit tentang penelitianmu?

**Eli:** Penelitian saya di bidang kriptografi. Secara khusus, saya sedang mengerjakan beberapa protokol komputasi multi-pihak (multi-party computation). Yang sedang saya kerjakan saat ini adalah sistem untuk menghitung statistik agregat, sehingga penyedia layanan seperti Google Chrome atau Tesla dapat mengumpulkan statistik tersebut tanpa mempelajari apa pun tentang data pengguna individu. Saya, sebagai pengguna, tidak perlu memberi tahu Firefox bahwa situs web favorit saya adalah mylittlepony.com. Tetapi mereka bisa tahu berapa banyak pengguna yang mengunjungi mylittlepony.com setiap hari.

**Amit Sahai:** Itu luar biasa. Komputasi multi-pihak sangat dekat dan berharga di hati saya. Jelas, bukti tanpa pengetahuan adalah tentang membuktikan sesuatu kepada orang lain tanpa mengungkapkan detail dari apa yang sedang kamu buktikan. Tetapi dalam pikiran saya, zero-knowledge sebenarnya melangkah lebih jauh dari itu. Ini adalah konsep menyeluruh yang bisa kamu lihat banyak dalam komputasi multi-pihak, di mana kamu ingin menyelesaikan suatu tugas tanpa mengungkapkan apa pun lebih dari apa yang sebenarnya kamu butuhkan untuk menyelesaikan tugas itu.

**Eli:** Benar, dan itu memungkinkanmu untuk membuktikan bahwa kamu telah berperilaku jujur, tanpa mengungkapkan rahasia apa pun yang terlibat yang kamu gunakan untuk benar-benar berperilaku jujur. Kita tahu bahwa bukti tanpa pengetahuan untuk bahasa NP-lengkap memainkan peran yang sangat besar dalam kriptografi. Seperti apa pengalaman pertamamu dengan kelengkapan NP?

**Amit Sahai:** Pertemuan pertama saya adalah di kelas algoritma pertama saya sebagai mahasiswa sarjana. Bahasa NP-lengkap adalah masalah luar biasa yang tidak hanya memberitahumu tentang dirinya sendiri, tetapi memecahkan masalah ini sebenarnya bisa memberitahumu tentang seluruh kelas masalah yang sangat menarik.

**Eli:** Ketika Anda pertama kali mulai memikirkan bukti sebagai permainan interaktif di mana kita berbicara satu sama lain, apakah itu yang membuat zero-knowledge menjadi mungkin?

**Amit Sahai:** Tentu saja. Dan gagasan bahwa keacakan bisa berguna untuk membuktikan sesuatu — sekali lagi, tampaknya sangat berlawanan dengan intuisi jika kita memikirkan ideal platonis dari sebuah bukti. Tidak ada keacakan, tidak ada non-determinisme yang hadir di sana.

**Eli:** Ini berkaitan dengan seluruh gagasan membalikkan sebuah bukti. Dalam bukti klasik lama, keacakan secara khusus bertentangan dengan tujuan dari apa yang kamu coba lakukan, karena kamu mencoba membuat semuanya menjadi jelas dan mengungkapkan aliran informasi. Tetapi begitu kamu membalikkannya dan kamu tidak lagi mencoba melakukan itu, tiba-tiba semua sifat buruk dari keacakan menjadi baik.

**Amit Sahai:** Tepat sekali. Acak itu tidak dapat diprediksi, dan itulah yang kita inginkan. Kita ingin ketidakpastian itu benar-benar menyembunyikan informasi yang ingin kita sembunyikan. Bagaimana kamu menggunakan zero-knowledge dalam proyek-proyek yang telah kamu kerjakan? Apa saja tantangan yang kamu temukan?

**Eli:** Biasanya bagian tersulit adalah mencari tahu di mana tepatnya tempat terbaik untuk menggunakannya. Saya telah menulis beberapa makalah yang menggunakan zero-knowledge dengan cara yang lebih teoretis, tetapi ketika menyangkut aplikasi, beberapa aplikasi paling menarik yang pernah saya lihat sejauh ini ada di ruang rantai blok.

**Amit Sahai:** Apa saja hambatan efisiensinya?

**Eli:** Salah satu hal paling keren tentang bukti tanpa pengetahuan adalah ada begitu banyak jenis — saya suka menyebutnya rasa. Secara umum, ketika kamu menggunakan bukti tanpa pengetahuan dalam aplikasi, hambatan utama cenderung terletak pada pembukti.

**Amit Sahai:** Bisakah kamu mengambil pekerjaan pembukti dan membaginya menjadi banyak komputasi paralel?

**Eli:** Itu pertanyaan yang sangat menyenangkan. Saya pikir kita masih belum tahu jawaban untuk itu sebagai sebuah bidang. Salah satu hal paling keren yang pernah saya lihat selama tiga atau empat tahun terakhir adalah transisi dari teoretis ke terapan — melihat semua sistem luar biasa yang telah dipikirkan orang dalam 30 tahun terakhir mulai benar-benar menjadi cukup efisien untuk dibuat.

**Amit Sahai:** Tidak diragukan lagi. Dan terutama dengan komputasi awan — mengeksploitasi kekuatan awan untuk memungkinkan bukti tanpa pengetahuan akan sangat luar biasa. Juga di ruang rantai blok, jika kamu ingin mempercepat pembuatan bukti, jika itu bisa dilakukan secara terdistribusi, itu akan sangat bagus. Salah satu harapan yang saya miliki adalah bahwa kekuatan komputasi multi-pihak adalah tentang menyatukan orang-orang yang saling tidak percaya. Bisakah kita mengambil kekuatan itu dalam kriptografi dan menggunakannya untuk membantu mengatasi tingkat ketidakpercayaan yang luar biasa yang ada di masyarakat saat ini?

**Eli:** Saya pikir itu salah satu alasan saya sangat tertarik pada komputasi multi-pihak. Salah satu masalah terpenting di dunia adalah kenyataan bahwa begitu banyak orang tidak saling percaya. Mampu menggunakan matematika untuk menciptakan teknologi yang memungkinkan orang bekerja sama tanpa harus saling percaya adalah misi yang sangat keren dan luar biasa.

#### Tingkat 5: ahli (17:10) {#level-5-expert-1710}

**Amit Sahai:** Shang-Hua, sangat senang bertemu denganmu lagi. Saya pikir terakhir kali kita bertemu adalah pada tahun 2017 atau semacamnya.

**Shang-Hua:** Saya pikir kita pernah melakukan Zoom sekali selama pandemi, tetapi senang bisa bertemu langsung denganmu. Sebenarnya, pada tahun '86 saya mengambil kelas kripto dengan Profesor Leonard Adleman, huruf A dari RSA. Dia menugaskan saya makalah oleh Goldwasser, Micali, dan Charlie Rackoff tentang bukti tanpa pengetahuan. Jadi itu memang presentasi pertama saya, yang pernah ada, di negara ini — tentang zero-knowledge.

**Amit Sahai:** Itu luar biasa. Ini adalah konsep yang hampir menghipnotis.

**Shang-Hua:** Juga menarik bagaimana merumuskan konsep-konsep tersebut secara matematis. Misalnya, kita memiliki data. Pada akhirnya dari data, melalui penambangan data, kamu bisa mendapatkan informasi. Dan kemudian kamu memiliki kata yang disebut "pengetahuan". Pengetahuan telah lama diperdebatkan bahkan dalam filsafat. Apa itu pengetahuan? Tetapi di sini ada cara yang sangat menarik yang ingin ditangkap oleh ahli matematika atau ilmuwan komputer tentang pengetahuan ini. Itu tidak mengatakan "bukti tanpa informasi". Jadi apa pendapatmu tentang mengapa "pengetahuan" daripada "informasi", atau "bukti tanpa data?" Jelas ada data di sana, jadi tidak mungkin tanpa data.

**Amit Sahai:** Tentu saja. Saya rasa kita masih belum memiliki jawaban yang sepenuhnya memuaskan untuk pertanyaan itu. Apa yang menjadi wawasan yang begitu indah adalah gagasan bahwa zero-knowledge adalah sesuatu yang sudah bisa kamu prediksi. Jika kamu sudah bisa memprediksi jawabannya, maka kamu pasti tidak mendapatkan pengetahuan apa pun dari interaksi itu. Wawasan ini — tentang kemampuan memprediksi masa depan secara akurat dan itu menjadi bukti kurangnya pengetahuan baru — adalah wawasan yang sangat indah dan menakjubkan.

**Shang-Hua:** Yah, tidak ada tanpa informasi di sini. Pada dasarnya, dari perspektif komputasi dan keamanan, yang penting adalah berapa banyak pengetahuan yang kamu peroleh, lebih dari berapa banyak informasi yang telah kamu peroleh dan berapa banyak data yang kamu miliki. Data tidak serta merta menyiratkan pengetahuan. Tetapi orang tidak selalu bisa membedakannya.

**Amit Sahai:** Benar. Misalnya, dalam penelitian medis — betapa menakjubkannya memiliki obat dan membuktikan bahwa obat itu bekerja dalam model ini, tanpa harus mengungkapkan struktur senyawanya?

**Shang-Hua:** Menurutmu apa arah selanjutnya di ruang ini?

**Amit Sahai:** Konsep program zero-knowledge ini akan memungkinkanmu untuk melakukan komputasi yang sepenuhnya sewenang-wenang dengan cara zero-knowledge, tanpa interaksi apa pun. Saya bisa saja mengambil program tersebut, mengubahnya menjadi program zero-knowledge — atau program yang disamarkan — dan kemudian mengirimkannya kepadamu. Kamu bisa menjalankannya dan mendapatkan manfaat dari komputasi itu tanpa harus berbicara denganku lagi.

**Shang-Hua:** Benar. Ada sifat non-interaktif. Tetapi ada kemampuan verifikasi di dalamnya. Dalam rantai blok, mereka juga mulai memasukkan bukti tanpa pengetahuan yang lebih umum ke dalam buku besar.

**Amit Sahai:** Kita pasti berada pada momen ini sekarang di mana zero-knowledge akan semakin banyak digunakan. Ada begitu banyak konferensi dan pertemuan di ruang zero-knowledge di mana kamu dan saya tidak diundang — karena itu untuk orang-orang yang sedang mengembangkan, orang-orang yang sedang memprogram, bukan kita para ahli matematika. Dan saya pikir itu adalah sebuah pertanda. Itu pertanda bahwa bayi kita telah tumbuh dewasa, dan sudah waktunya untuk dikembangkan.

**Shang-Hua:** Saya pikir secara mendalam, para mahasiswa sering bertanya kepada saya apa arah masa depan — baik dalam hal kripto, bukti tanpa pengetahuan, di dunia nyata maupun dalam komputasi matematis.

**Amit Sahai:** Itu pertanyaan yang bagus. Saya harap saya bisa melihat masa depan. Saya tidak bisa, tetapi biarkan saya mencoba. Saya pikir kita telah melakukan begitu banyak hal dalam kriptografi selama beberapa dekade terakhir, tetapi kita sangat sedikit memahaminya. Aspek yang paling mendasar adalah memahami tingkat kesulitan — bagaimana kita mendapatkan masalah yang sulit? Bagaimana kita benar-benar membangun masalah yang sulit secara matematis sehingga kita kemudian dapat menggunakannya untuk membangun program dan bukti tanpa pengetahuan yang efisien?

**Shang-Hua:** Saya rasa juga, dalam komputasi kuantum, kamu membutuhkan masalah yang lebih sulit lagi.

**Amit Sahai:** Memang. Sekarang kita memiliki bayang-bayang komputasi kuantum yang mendatangi kita, kita semua tahu bahwa komputer kuantum dapat memecahkan banyak sistem kriptografi. Ini adalah tantangan yang mendalam. Jadi bisakah kita menemukan sumber tingkat kesulitan baru yang tahan kuantum — yang bahkan tidak dapat dipecahkan oleh komputer kuantum? Itu adalah sesuatu yang telah saya kerjakan selama beberapa tahun terakhir.

**Shang-Hua:** Tetapi saya yakin mereka akan memotivasi matematika yang indah.

**Amit Sahai:** Ya, itu benar. Salah satu hal hebat tentang dunia nyata adalah bahwa orang-orang di dunia nyata memiliki tuntutan. Dan tuntutan itu sering kali terdengar mustahil. Dan di situlah kita masuk — adalah tugas kita untuk membuat yang mustahil menjadi mungkin.