---
title: Buku pedoman program penerjemahan
lang: id
description: Kumpulan tips dan pertimbangan penting dalam menyiapkan program penerjemahan
---

# Buku Pedoman Program Penerjemahan {#translation-program-playbook}

Bahasa Inggris adalah salah satu bahasa yang paling banyak digunakan di dunia dan sejauh ini merupakan bahasa yang paling banyak dipelajari di dunia. Karena bahasa Inggris adalah bahasa yang paling umum digunakan di internet – terutama di media sosial – dan bahasa pemrograman multibahasa jarang ditemukan, mayoritas konten di ruang blockchain ditulis dalam bahasa Inggris.

Namun, karena lebih dari 6 miliar orang di dunia (lebih dari 75% populasi) tidak berbicara bahasa Inggris sama sekali, hal ini menghadirkan hambatan besar bagi sebagian besar populasi dunia untuk mengakses Ethereum.

Karena alasan ini, semakin banyak proyek di bidang ini yang berupaya menerjemahkan konten mereka ke berbagai bahasa dan melokalkannya untuk komunitas global.

Menyediakan konten multibahasa merupakan cara yang sederhana dan efektif untuk mengembangkan komunitas global Anda, menyediakan pendidikan bagi penutur non-Inggris, memastikan konten dan komunikasi Anda menjangkau khalayak yang lebih luas, dan menarik lebih banyak orang ke dalam ruang tersebut.

Panduan ini bertujuan untuk mengatasi tantangan dan kesalahpahaman umum tentang lokalisasi konten. Dokumen ini menyediakan panduan langkah demi langkah untuk mengelola konten, proses penerjemahan dan peninjauan, jaminan kualitas, penjangkauan penerjemah, dan aspek penting lainnya dari proses pelokalan.

## Manajemen Konten {#content-management}

Manajemen konten penerjemahan mengacu pada proses mengotomatiskan alur kerja penerjemahan, yang menghilangkan kebutuhan akan pekerjaan manual yang berulang, meningkatkan efisiensi dan kualitas, memungkinkan kontrol yang lebih baik, dan memungkinkan kolaborasi.

Ada banyak pendekatan berbeda terhadap manajemen konten dalam proses pelokalan, tergantung pada konten dan kebutuhan Anda.

Cara mendasar dalam mengelola konten adalah membuat berkas dwibahasa yang berisi teks sumber dan teks sasaran. Ini jarang digunakan dalam penerjemahan, karena tidak menawarkan keuntungan yang signifikan, selain kesederhanaan.

Badan terjemahan biasanya mendekati manajemen terjemahan dengan menggunakan perangkat lunak manajemen terjemahan atau alat lokalisasi, yang menyediakan kemampuan manajemen proyek dan memungkinkan kontrol yang jauh lebih besar atas file, konten, dan ahli bahasa.

Baca selengkapnya tentang manajemen konten:

[trados tentang apa itu manajemen penerjemahan](https://www.trados.com/solutions/translation-management/)

[frasa tentang manajemen konten multibahasa](https://phrase.com/blog/posts/multilingual-content-management/)

### Perangkat Lunak Manajemen Penerjemahan {#translation-management-software}

Ada banyak sistem manajemen penerjemahan dan alat pelokalan, dan pilihan perangkat lunak terutama bergantung pada kebutuhan Anda.

Sementara beberapa proyek memutuskan untuk tidak menggunakan sistem manajemen terjemahan dan lebih suka menangani terjemahan secara manual - baik secara langsung dalam file bilingual atau pada layanan hosting, seperti GitHub - ini secara dramatis mengurangi kemampuan kontrol, produktivitas, kualitas, skalabilitas, dan kolaborasi. Pendekatan semacam itu mungkin paling bermanfaat untuk proyek penerjemahan berskala kecil atau satu kali.

Sekilas tentang beberapa alat manajemen terjemahan yang paling ampuh dan banyak digunakan:

**Terbaik untuk crowdsourcing dan kolaborasi**

[crowdin](https://crowdin.com/)

- Gratis untuk proyek sumber terbuka (jumlah string dan proyek tidak terbatas)
- TM dan glosarium tersedia dengan semua paket
- 60+ format file yang didukung, 70+ integrasi API

[lokalisasi](https://lokalise.com/)

- Gratis untuk 2 anggota tim, paket berbayar untuk lebih banyak kontributor (jumlah string terbatas untuk sebagian besar paket)
- TM dan glosarium tersedia dengan beberapa paket berbayar
- 30+ format file yang didukung, 40+ integrasi API

[transifex](https://www.transifex.com/)

- Hanya paket berbayar (jumlah string terbatas untuk sebagian besar paket)
- TM dan glosarium tersedia dengan semua paket berbayar
- 30+ format file yang didukung, 20+ integrasi API

[frasa](https://phrase.com/)

- Hanya paket berbayar (jumlah string tidak terbatas untuk semua paket, jumlah proyek dan anggota tim terbatas)
- TM dan glosarium tersedia dengan beberapa paket berbayar
- 40+ format file yang didukung, 20+ integrasi API

[kucing pintar](https://www.smartcat.com/)

- Paket dasar gratis dengan fitur lanjutan berbayar (jumlah string dan proyek tak terbatas untuk semua paket)
- TM dan glosarium tersedia dengan semua paket
- 60+ format file yang didukung, 20+ integrasi API

[poeditor](https://poeditor.com/)

- Gratis untuk proyek sumber terbuka (jumlah string terbatas untuk semua proyek, tidak terbatas untuk proyek sumber terbuka)
- TM dan glosarium tersedia untuk paket berbayar
- 20+ format file yang didukung, 10+ integrasi API

dan masih banyak lagi...

**Alat penerjemahan profesional**

[sdl trados studio](https://www.trados.com/products/trados-studio/)

- Paket berbayar untuk penerjemah lepas dan tim
- Alat penerjemahan berbantuan komputer (CAT) yang sangat canggih dan perangkat lunak produktivitas penerjemah

[memoq](https://www.memoq.com/)

- Versi gratis terbatas tersedia dengan beberapa paket berbayar untuk fitur-fitur lanjutan
- Perangkat lunak manajemen terjemahan untuk perusahaan, penyedia layanan bahasa, dan penerjemah

[memsource](https://www.memsource.com/)

- Gratis untuk penerjemah individu dengan beberapa paket berbayar untuk tim
- Sistem manajemen terjemahan dan terjemahan berbantuan komputer berbasis cloud

dan masih banyak lagi...

Baca selengkapnya tentang perangkat lunak manajemen terjemahan:

[definisi Wikipedia tentang sistem manajemen penerjemahan](https://en.wikipedia.org/wiki/Translation_management_system)

[frasa tentang 7 hal yang harus dimiliki setiap perangkat lunak manajemen penerjemahan](https://phrase.com/blog/posts/7-things-every-translation-management-software-should-have/)

[memoq tentang apa itu sistem manajemen penerjemahan](https://www.memoq.com/tools/what-is-a-translation-management-system)

[daftar 16 sistem manajemen terjemahan terbaik versi gengo](https://gengo.com/translator-product-updates/16-best-translation-management-systems/)

## Alur kerja {#workflow}

Dalam ruang terjemahan, alur kerja terjemahan dapat berarti beberapa hal yang berbeda, baik yang agak saling terkait, dan pertimbangan penting untuk proyek Anda.

Kami akan membahas keduanya di bawah ini.

**Arti 1**

Ini mungkin cara berpikir yang paling umum tentang alur kerja terjemahan dan sesuatu yang biasanya teringat dalam pikiran ketika mendengar kata alur kerja.

Intinya, itu adalah 'aliran kerja' dari mulai berpikir tentang terjemahan hingga menggunakan konten yang diterjemahkan dalam produk Anda.

Contoh alur kerja dalam kasus ini adalah:

1. \*\* Mempersiapkan file untuk terjemahan \*\* - terdengar sederhana; Namun, Anda perlu mempertimbangkan beberapa hal penting. Pada langkah ini, Anda harus memiliki rencana yang jelas tentang bagaimana keseluruhan proses harus bekerja.

- Jenis berkas apa yang akan Anda gunakan? Dalam format apa Anda ingin menerima berkas terjemahan Anda
  - Jika konten Anda tersedia dalam format DOCX atau MD, pendekatannya akan jauh lebih mudah daripada jika Anda menerjemahkan versi PDF dari Whitepaper atau dokumen lainnya.
- _Alat lokalisasi apa yang mendukung jenis file ini? Bisakah berkas diterjemahkan dengan cara yang mempertahankan format aslinya
  - Tidak semua jenis file mendukung lokalisasi langsung (misalnya, file PDF, file gambar), dan tidak semua alat lokalisasi mendukung semua jenis file.
- Siapa yang akan menerjemahkan konten tersebut? Apakah Anda akan memesan terjemahan profesional atau mengandalkan sukarelawan
  - Ini memengaruhi sejumlah keputusan lain yang perlu Anda buat. Misalnya, penerjemah profesional lebih nyaman bekerja dengan alat lokalisasi canggih daripada sukarelawan.
- Apa harapan Anda untuk para ahli bahasa? Jika Anda menggunakan penyedia layanan bahasa, apa yang mereka harapkan dari Anda
  - Ini adalah langkah untuk memastikan tujuan, harapan, dan jadwal Anda selaras.
- Apakah semua konten untuk terjemahan sama pentingnya? Haruskah beberapa konten diterjemahkan terlebih dahulu
  - Ada beberapa cara untuk memprioritaskan konten tertentu, yang harus diterjemahkan dan diterapkan terlebih dahulu. Misalnya, jika Anda memiliki banyak konten untuk diterjemahkan, Anda dapat menggunakan kontrol versi untuk memastikan para penerjemah yang harus mereka prioritaskan.

2. \*\* Berbagi file untuk terjemahan \*\*-Langkah ini juga membutuhkan pemikiran jangka panjang dan tidak semudah mengirim file sumber ke penyedia layanan bahasa.

- Siapa yang akan menerjemahkan konten tersebut? Berapa banyak orang yang akan terlibat dalam proses ini
  - Jika Anda berencana untuk menggunakan alat lokalisasi, langkah ini disederhanakan karena Anda dapat mengunggah file sumber ke alat secara langsung. Ini juga benar jika proses terjemahan berlangsung pada layanan hosting karena file sumber tidak perlu diekspor dimanapun.
- _Apakah berkas sumber akan ditangani secara manual, atau dapatkah proses ini diotomatisasi?_
  - Sebagian besar alat lokalisasi memungkinkan beberapa jenis integrasi atau otomatisasi proses manajemen berkas. Di sisi lain, jika Anda bekerja dengan penerjemah individual dan tidak menggunakan alat lokalisasi, secara manual mengirim file sumber ke ratusan atau ribuan penerjemah bukanlah proses yang dapat diukur.
- Alat apa yang akan digunakan untuk lokalisasi
  - Jawaban atas pertanyaan ini akan menentukan bagaimana Anda menyikapi segala hal lainnya. Memilih alat yang tepat dapat membantu Anda mengotomatisasi manajemen konten, mengelola memori dan glosarium terjemahan, mengelola penerjemah, melacak kemajuan terjemahan/tinjauan, dll., Jadi luangkan waktu dan lakukan riset tentang alat mana yang ingin Anda gunakan. Jika Anda tidak berencana menggunakan alat lokalisasi, semua hal di atas perlu dilakukan secara manual.
- Berapa lama proses penerjemahannya? Berapa biayanya?_
  - Pada titik ini, Anda harus siap untuk berbagi file sumber dengan penyedia layanan bahasa atau kumpulan penerjemah. Penyedia layanan bahasa dapat membantu Anda menganalisis jumlah kata dan memberikan penawaran, termasuk tarif dan jadwal untuk proses penerjemahan.
- _Apakah Anda berencana membuat perubahan/memperbarui konten sumber selama proses ini?_
  - Jika konten Anda dinamis dan sering berubah, perubahan atau pembaruan apa pun dapat mengganggu kemajuan penerjemahan. Menggunakan memori terjemahan dapat membantu mengurangi ini secara signifikan, meski masih penting untuk memikirkan bagaimana prosesnya akan bekerja dan bagaimana Anda dapat mencegah pengaturan kembali kemajuan yang dibuat oleh para penerjemah.

3. **Mengelola proses penerjemahan** – Pekerjaan Anda belum selesai setelah konten sumber diserahkan kepada penyedia layanan bahasa atau penerjemah. Untuk memastikan kualitas terjemahan yang optimal, pembuat konten harus terlibat semaksimal mungkin dalam proses penerjemahan.

- Bagaimana Anda berencana berkomunikasi dengan penerjemah
  - Jika Anda berencana menggunakan alat lokalisasi, komunikasi dapat dilakukan langsung di alat tersebut. Menyiapkan saluran komunikasi alternatif dengan penerjemah juga disarankan karena mereka mungkin kurang ragu-ragu untuk menjangkau, dan alat pesan memungkinkan komunikasi yang lebih bebas.
- _Bagaimana cara menangani pertanyaan dari penerjemah? Siapa yang seharusnya menjawab pertanyaan-pertanyaan ini?_
  - Penerjemah (baik profesional maupun non-profesional) akan sering menjangkau dengan pertanyaan dan permintaan penjelasan atau konteks tambahan, serta umpan balik dan ide-ide untuk perbaikan. Menjawab pertanyaan-pertanyaan ini sering kali dapat menghasilkan keterlibatan yang lebih baik dan kualitas konten terjemahan yang lebih baik. Penting juga untuk memberi mereka sebanyak mungkin sumber daya (misalnya, panduan, kiat, pedoman terminologi, Tanya Jawab, dll.).
- Bagaimana menangani proses peninjauan? Apakah Anda ingin mengalihdayakannya, atau apakah Anda memiliki kapasitas untuk melakukan peninjauan secara internal
  - Meskipun tidak selalu diperlukan, ulasan merupakan bagian integral dari proses penerjemahan yang optimal. Biasanya, paling mudah untuk menyerahkan proses peninjauan kepada peninjau profesional. Namun, jika Anda memiliki tim internasional yang besar, tinjauan atau QA juga dapat ditangani secara internal.

4. **Menerapkan konten terjemahan** – Bagian terakhir dari alur kerja, meskipun tetap penting untuk dipertimbangkan sebelumnya.

- Apakah semua terjemahan akan diselesaikan pada saat yang sama
  - Jika tidak, Anda harus memikirkan terjemahan mana yang harus diprioritaskan, bagaimana melacak terjemahan yang sedang berlangsung, dan bagaimana implementasi ditangani saat terjemahan dilakukan.
- _Bagaimana konten yang diterjemahkan akan dikirimkan kepada Anda? Format apa yang akan terjadi?_
  - Ini adalah pertimbangan penting, terlepas dari pendekatan mana yang Anda gunakan. Alat lokalisasi memungkinkan Anda untuk mempertahankan kontrol atas format file target dan proses ekspor dan biasanya mendukung otomatisasi, misalnya, dengan memungkinkan integrasi dengan layanan hosting.
- Bagaimana Anda akan menerapkan terjemahan dalam proyek Anda
  - Dalam beberapa kasus, ini bisa sesederhana mengunggah file yang diterjemahkan atau menambahkan ke dokumen Anda. Namun, dengan proyek yang lebih kompleks, seperti terjemahan situs web atau aplikasi, Anda harus memastikan kode mendukung internasionalisasi dan menetapkan bagaimana proses implementasi akan ditangani sebelumnya.
- _Apa yang terjadi jika melakukan format berbeda dengan sumbernya?_
  - Mirip dengan hal di atas, jika Anda menerjemahkan file teks sederhana, melakukan format mungkin tidak penting. Namun, dengan file yang lebih kompleks, seperti konten untuk situs web atau aplikasi, format dan kode harus identik dengan sumber untuk diimplementasikan dalam proyek Anda. Jika tidak, file target perlu diedit, baik oleh penerjemah atau pengembang Anda.

**Arti 2**

Alur kerja terjemahan alternatif, yang tidak memperhitungkan keputusan dan pendekatan internal. Pertimbangan utama di sini adalah aliran konten itu sendiri.

Contoh alur kerja dalam kasus ini adalah:

1. _Terjemahan → Implementasi_

- Alur kerja paling sederhana, di mana terjemahan kemungkinan akan menjadi terjemahan manusia, karena tidak ada proses ulasan atau QA untuk mengevaluasi kualitas dan mengedit terjemahan sebelum implementasi.
- Dengan alur kerja ini, penting bahwa para penerjemah dapat mempertahankan tingkat kualitas tertentu, yang akan membutuhkan sumber daya dan komunikasi yang tepat antara manajer proyek dan penerjemah.

2. Terjemahan → Tinjauan → Implementasi

- Alur kerja yang lebih maju, yang mencakup proses tinjauan dan pengeditan, untuk memastikan kualitas terjemahan dapat diterima dan konsisten.
- Ada sejumlah pendekatan untuk alur kerja ini, di mana terjemahan dapat dilakukan oleh penerjemah profesional atau sukarelawan, sementara proses pengecekan kemungkinan akan ditangani oleh komentator profesional, yang akrab dengan semua aturan tata bahasa dan ortografi yang perlu diamati dalam bahasa target.

3. Terjemahan → Tinjauan → QA → Implementasi

- Alur kerja yang optimal untuk memastikan tingkat kualitas tertinggi. Meskipun QA tidak selalu diperlukan, mungkin berguna untuk memberi Anda rasa kualitas yang lebih baik dari teks yang diterjemahkan setelah terjemahan dan ulasan.
- Dengan alur kerja ini, terjemahan dapat dilakukan secara eksklusif oleh sukarelawan atau bahkan terjemahan mesin. Proses pengecekan harus dilakukan oleh penerjemah profesional, sedangkan QA dapat dilakukan oleh penyedia layanan bahasa atau secara internal, jika Anda memiliki karyawan yang merupakan penutur asli bahasa target.

Baca lebih lanjut tentang alur kerja terjemahan:

[aturan konten tentang lima fase alur kerja penerjemahan](https://contentrules.com/creating-translation-workflow/)

[smartling tentang apa itu manajemen alur kerja penerjemahan](https://www.smartling.com/resources/101/what-is-translation-workflow-management/)

[rixtrans tentang alur kerja penerjemahan](https://www.rixtrans.com/translation-workflow)

## Manajemen Terminologi {#terminology-management}

Menetapkan rencana yang jelas tentang cara menangani terminologi adalah salah satu langkah terpenting untuk memastikan kualitas dan konsistensi terjemahan Anda dan menghemat waktu penerjemah Anda.

Di ruang terjemahan, ini dikenal sebagai manajemen terminologi dan merupakan salah satu penyedia layanan bahasa utama yang menawarkan klien mereka, selain akses ke kumpulan ahli bahasa dan manajemen konten mereka.

Manajemen terminologi mengacu pada proses mengidentifikasi, mengumpulkan, dan mengelola terminologi yang penting untuk proyek Anda dan harus selalu diterjemahkan dengan benar dan konsisten.

Ada beberapa langkah yang harus diikuti ketika mulai berpikir tentang manajemen terminologi:

- Identifikasi istilah -istilah utama yang harus dimasukkan dalam termbase.
- Buat glosarium istilah dan definisi mereka.
- Terjemahkan istilah-istilah tersebut dan tambahkan ke glosarium.
- Periksa dan setujui terjemahannya.
- Pertahankan glosarium dan perbarui dengan istilah-istilah baru, jika istilah tersebut menjadi penting.

Baca lebih lanjut tentang manajemen terminologi:

[trados tentang apa itu manajemen terminologi](https://www.trados.com/solutions/terminology-management/translation-101-what-is-terminology-management.html)

[bahasa ilmiah tentang mengapa manajemen terminologi penting](https://www.languagescientific.com/terminology-management-why-it-matters/#:~:text=Terminology%20management%20is%20the%20process,are%20related%20to%20each%20other.)

[terjemahan kata yang jelas tentang apa itu manajemen terminologi dan mengapa itu penting](http://clearwordstranslations.com/language/en/what-is-terminology-management/)

### Memori Terjemahan dan Glosarium {#tm-and-glossary}

Memori Penerjemahan dan Glosarium merupakan alat penting dalam industri penerjemahan dan merupakan sesuatu yang diandalkan oleh sebagian besar penyedia layanan bahasa.

Mari kita lihat apa arti istilah -istilah ini dan bagaimana mereka berbeda satu sama lain:

\*\* Memori Terjemahan (TM) \*\* - Basis data yang secara otomatis menyimpan segmen atau string, termasuk blok teks yang lebih panjang, kalimat lengkap, paragraf, dan istilah individu, serta terjemahan mereka saat ini dan sebelumnya dalam setiap bahasa.

Kebanyakan alat lokalisasi, sistem manajemen penerjemahan, dan alat penerjemahan berbantuan komputer mempunyai memori penerjemahan bawaan, yang biasanya dapat diekspor dan digunakan pada alat serupa lainnya juga.

Manfaat menggunakan memori terjemahan termasuk terjemahan yang lebih cepat, kualitas terjemahan yang lebih baik, kemampuan untuk mempertahankan terjemahan tertentu saat memperbarui atau mengubah konten sumber, dan biaya terjemahan yang lebih murah untuk konten berulang.

Kenangan terjemahan bekerja berdasarkan persentase kecocokan antara segmen yang berbeda dan biasanya paling berguna ketika dua segmen mengandung lebih dari 50% dari konten yang sama. Mereka juga digunakan untuk menerjemahkan segmen berulang secara otomatis, yang memiliki kecocokan 100%, sehingga menghilangkan kebutuhan untuk menerjemahkan konten berulang lebih dari satu kali.

Baca selengkapnya tentang memori penerjemahan:

[memsource tentang memori penerjemahan](https://www.memsource.com/translation-memory/)

[smartling tentang apa itu memori terjemahan](https://www.smartling.com/resources/101/what-is-translation-memory/)

\*\* Glosarium - \*\* Daftar istilah penting atau sensitif, definisi, fungsi, dan terjemahan yang ditetapkan. Perbedaan utama antara glosarium dan memori terjemahan adalah bahwa glosarium tidak dibuat secara otomatis, dan tidak mengandung terjemahan kalimat penuh.

Sebagian besar alat lokal, sistem manajemen terjemahan, dan alat terjemahan yang dibantu komputer memiliki glosarium bawaan yang dapat Anda jaga untuk memastikan mereka mengandung terminologi yang penting bagi proyek Anda. Seperti TM, glosarium biasanya dapat diekspor dan digunakan di alat pelokalan lainnya.

Sebelum memulai proyek terjemahan Anda, sangat disarankan untuk meluangkan waktu dan membuat glosarium untuk penerjemah dan komentator Anda. Penggunaan glosarium memastikan bahwa istilah-istilah penting diterjemahkan dengan benar, menyediakan konteks yang sangat dibutuhkan penerjemah, dan menjamin konsistensi dalam terjemahan.

Sementara glosarium paling sering mengandung terjemahan yang sudah ada dalam bahasa target, mereka juga berguna tanpa ini. Bahkan tanpa terjemahan yang mapan, sebuah glosarium dapat memiliki definisi istilah teknis, menyoroti istilah yang tidak boleh diterjemahkan, dan memberi informasi penerjemah apakah istilah tertentu digunakan sebagai kata benda, kata kerja, kata benda yang tepat, atau bagian lain dari pidato.

Baca lebih lanjut tentang glosarium:

[lionbridge tentang apa itu glosarium terjemahan](http://info.lionbridge.com/rs/lionbridge/images/Lionbridge%20FAQ_Glossary_2013.pdf)

[transifex tentang glosarium](https://docs.transifex.com/glossary/glossary)

Jika Anda tidak berencana menggunakan alat lokal untuk proyek Anda, Anda mungkin tidak akan dapat menggunakan memori dan glosarium terjemahan (Anda dapat membuat glosarium atau termbase dalam file Excel, namun glosarium otomatis menghapus kebutuhan penerjemah untuk mencari istilah dan definisi mereka secara manual).

Ini berarti semua konten yang berulang dan serupa harus diterjemahkan secara manual setiap saat. Selain itu, penerjemah harus menghubungi dengan pertanyaan tentang apakah istilah tertentu perlu diterjemahkan atau tidak, bagaimana istilah itu digunakan dalam teks, dan apakah suatu istilah sudah memiliki terjemahan yang mapan.

_Apakah Anda ingin menggunakan memori terjemahan dan glosarium ethereum.org dalam proyek Anda? Hubungi kami di translations@ethereum.org._

## Jangkauan Penerjemah {#translator-outreach}

**Bekerja dengan penyedia layanan bahasa**

Jika Anda bekerja dengan penyedia layanan bahasa dan penerjemah profesional mereka, bagian ini mungkin tidak terlalu relevan untuk Anda.

Dalam hal ini, penting untuk memilih penyedia layanan bahasa yang mampu menyediakan semua layanan yang Anda butuhkan (misalnya, penerjemahan, tinjauan, QA) dalam banyak bahasa.

Meskipun mungkin tergoda untuk memilih penyedia layanan bahasa semata -mata berdasarkan tarif yang ditawarkan, penting untuk dicatat bahwa penyedia layanan bahasa terbesar memiliki tarif yang lebih tinggi karena suatu alasan.

- Mereka memiliki puluhan ribu ahli bahasa dalam basis data mereka, yang berarti bahwa mereka akan dapat menugaskan penerjemah dengan pengalaman dan pengetahuan yang cukup tentang sektor khusus Anda untuk proyek Anda (yaitu, penerjemah teknis).
- Mereka memiliki pengalaman yang signifikan mengerjakan berbagai proyek dan memenuhi kebutuhan klien mereka yang beragam. Ini berarti mereka akan lebih cenderung beradaptasi dengan alur kerja khusus Anda, menawarkan saran yang bagus dan potensi perbaikan untuk proses penerjemahan Anda, dan memenuhi kebutuhan, persyaratan, dan tenggat waktu Anda.
- Sebagian besar penyedia layanan bahasa terbesar juga memiliki alat lokal mereka sendiri, kenangan terjemahan, dan glosarium yang dapat Anda gunakan. Jika tidak, mereka setidaknya memiliki ahli bahasa yang cukup di kumpulan mereka untuk memastikan bahwa penerjemah mereka akan terbiasa dan dapat bekerja dengan alat pelokalan apa pun yang ingin Anda gunakan.

Anda dapat menemukan perbandingan mendalam penyedia layanan bahasa terbesar di dunia, beberapa detail tentang masing-masing penyedia, dan perincian berdasarkan layanan yang mereka berikan, data geografis, dll. dalam [laporan nimdzi 100 tahun 2021](https://www.nimdzi.com/nimdzi-100-top-lsp/).

**Bekerja dengan penerjemah non-profesional**

Anda mungkin bekerja dengan penerjemah nonprofesional dan mencari sukarelawan untuk membantu Anda menerjemahkan.

Ada beberapa cara untuk menjangkau orang dan mengundang mereka untuk bergabung dengan proyek Anda. Hal ini sangat bergantung pada produk Anda dan seberapa besar komunitas yang sudah Anda miliki.

Beberapa cara untuk menerima relawan diuraikan di bawah ini:

**Penjangkauan –** Meskipun hal ini sudah dibahas secara rinci dalam poin-poin di bawah, menjangkau relawan potensial dan memastikan mereka mengetahui inisiatif penerjemahan Anda dapat menjadi hal yang efektif.

Banyak orang ingin terlibat dan berkontribusi pada proyek favorit mereka, tetapi sering kali tidak melihat cara yang jelas untuk melakukannya tanpa menjadi pengembang atau memiliki keterampilan teknis khusus. Jika Anda dapat menyebarkan kesadaran tentang proyek Anda, banyak orang bilingual kemungkinan akan tertarik untuk terlibat.

**Melihat dalam komunitas Anda –** Sebagian besar proyek di ruang tersebut sudah memiliki komunitas yang besar dan aktif. Banyak anggota komunitas Anda mungkin menghargai kesempatan untuk berkontribusi pada proyek dengan cara yang sederhana.

Meskipun berkontribusi pada proyek sumber terbuka sering kali didasarkan pada motivasi intrinsik, hal itu juga merupakan pengalaman belajar yang fantastis. Siapa pun yang tertarik untuk mempelajari lebih lanjut tentang proyek Anda kemungkinan besar akan senang terlibat dalam program penerjemahan sebagai sukarelawan, karena hal itu akan memungkinkan mereka untuk menggabungkan fakta bahwa mereka telah berkontribusi pada sesuatu yang mereka pedulikan dengan pengalaman belajar langsung yang intensif.

**Menyebutkan inisiatif dalam produk Anda –** Jika produk Anda populer dan digunakan oleh banyak orang, menyoroti program penerjemahan Anda dan mengajak pengguna untuk bertindak saat menggunakan produk tersebut bisa sangat efektif.

Ini bisa semudah menambahkan spanduk atau pop-up dengan CTA ke produk Anda untuk aplikasi dan situs web. Ini efektif karena audiens target Anda adalah komunitas Anda - orang-orang yang paling mungkin terlibat sejak awal.

**Media sosial –** Media sosial dapat menjadi cara yang efektif untuk menyebarkan kesadaran tentang program penerjemahan Anda dan menjangkau anggota komunitas Anda, serta orang lain yang belum menjadi anggota komunitas Anda.

Jika Anda memiliki server Discord atau saluran Telegram, mudah untuk menggunakannya untuk penjangkauan, komunikasi dengan penerjemah Anda, dan memberi penghargaan kepada kontributor Anda.

Platform seperti X (sebelumnya Twitter) juga dapat membantu dalam merekrut anggota komunitas baru dan memberikan pengakuan publik kepada kontributor Anda.

Yayasan Linux telah membuat [Laporan tentang Survei Kontributor FOSS 2020](https://www.linuxfoundation.org/wp-content/uploads/2020FOSSContributorSurveyReport_121020.pdf) yang ekstensif, yang menganalisis para kontributor sumber terbuka dan motivasi mereka.

## Kesimpulan {#conclusion}

Dokumen ini berisi beberapa pertimbangan utama yang harus diperhatikan setiap program penerjemahan. Ini bukanlah panduan yang lengkap, meskipun dapat membantu siapa pun yang tidak memiliki pengalaman dalam industri penerjemahan untuk mengatur program penerjemahan untuk proyek mereka.

Jika Anda mencari petunjuk dan uraian lebih rinci tentang berbagai alat, proses, dan aspek penting dalam mengelola program penerjemahan, beberapa penyedia layanan bahasa terbesar mengelola blog dan sering menerbitkan artikel tentang berbagai aspek proses pelokalan. Ini adalah sumber daya terbaik jika Anda ingin mendalami lebih jauh topik-topik di atas dan memahami cara kerja proses lokalisasi secara profesional.

Beberapa tautan relevan disertakan di akhir setiap bagian; namun, Anda dapat menemukan banyak sumber daya lainnya secara daring.

Untuk proposal kerja sama atau informasi tambahan, pembelajaran, dan praktik terbaik yang kami peroleh melalui Program Penerjemahan ethereum.org, silakan hubungi kami di translations@ethereum.org.
