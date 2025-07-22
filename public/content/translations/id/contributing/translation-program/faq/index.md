---
title: Pertanyaan yang paling sering diajukan (FAQ) tentang Program Penerjemahan
lang: id
description: Pertanyaan yang paling sering diajukan tentang Program Penerjemahan ethereum.org
---

# Panduan menerjemahkan ethereum.org {#translating-ethereum-guide}

Jika Anda baru mengenal Program Terjemahan dan ragu-ragu untuk memulai, berikut adalah beberapa SSD yang dapat membantu Anda memulai. Gunakan panduan ini untuk menemukan jawaban atas pertanyaan yang paling umum.

## Apakah saya mendapatkan kompensasi dari menerjemahkan ethereum.org? {#compensation}

Ethereum.org adalah situs web sumber terbuka, di mana setiap orang dapat terlibat dan berkontribusi.

Program penerjemahan ethereum.org adalah perpanjangan dari hal tersebut dan mempunyai pemikiran filosofi yang sama.

Tujuan dari Program Penerjemahan adalah membuat konten Ethereum dapat dijangkau oleh semua orang, terlepas dari bahasa yang mereka gunakan. Ini juga memungkinkan dwibahasawan mana pun untuk terlibat dalam ekosistem Ethereum dan berkontribusi dalam cara yang mungkin.

Karena alasan ini, Program Penerjemahan bersifat terbuka dan sukarela, dan partisipasi tidak mendapat kompensasi. Jika kami harus mengompensasi penerjemah berdasarkan jumlah kata yang mereka terjemahkan, kami hanya dapat mengundang mereka dengan pengalaman penerjemahan yang cukup (penerjemah profesional) untuk bergabung dalam Program Penerjemahan. Ini akan membuat Program Penerjemahan menjadi ekslusif dan mencegah kami mencapai tujuan yang telah ditetapkan, secara khusus: memungkinkan semua orang berpartisipasi dan terlibat dalam ekosistem.

Kami berusaha sebaik mungkin untuk memungkinkan para kontributor kami berhasil dalam ekosistem Ethereum; banyak insentif non-moneter diberikan seperti: [menawarkan POAP](/contributing/translation-program/acknowledgements/#poap) dan [sertifikat penerjemah](/contributing/translation-program/acknowledgements/#certificate), maupun mengelola [Papan Peringkat Penerjemahan](/contributing/translation-program/acknowledgements/) dan [mendaftar semua penerjemah kami di situs](/contributing/translation-program/contributors/).

## Bagiamana cara menerjemahkan string dengan `<HTML tags>`? {#tags}

Tidak setiap string ditulis dalam bentuk teks murni. Ada beberapa string yang terdiri dari skrip campuran seperti tag HTML (`<0>`, `</0>`). Ini umumnya untuk hyperlink atau gaya alternatif di tengah sebuah kalimat.

- Terjemahkan teks di dalam tag tetapi bukan tag itu sendiri. Apa pun di dalam `<` dan `>` tidak boleh diterjemahkan atau dihapus.
- Untuk membuat agar string tetap aman, kami rekomendasikan untuk mengklik tombol "Salin Sumber" di kiri bawah. Ini akan menyalin string asli dalam menempelkannya ke dalam kotak teks. Ini memungkinkan Anda mengklarifikasi tempat tag berada dan membantu menghindari kesalahan.

![Antarmuka Crowdin dengan tombol salin sumber disorot](./html-tag-strings.png)

Anda dapat memindahkan posisi tag yang ada di dalam string untuk membuatnya lebih natural dalam bahasa Anda – pastikan untuk memindahkan seluruh tag.

Untuk informasi lebih lengkap tentang menangani tag dan cuplikan kode, silakan lihat [Panduan Gaya Penerjemahan ethereum.org](/contributing/translation-program/translators-guide/#dealing-with-tags).

## Di mana posisi string? {#strings}

Sering kali string sumber saja mungkin tidak cukup bagi Anda untuk memberikan terjemahan yang akurat.

- Lihat "tangkapan layar" dan "konteks" untuk informasi lebih lanjut. Di bagian string sumber, Anda akan melihat gambar tangkapan layar terlampir yang akan menunjukkan cara kami menggunakan string dalam konteks.
- Jika Anda masih belum yakin, naikkan bendera di "bagian komentar". [Belum tahu cara meninggalkan komentar?](#comment)

![Menampilkan cara memberikan konteks untuk string dengan tangkapan layar](./source-string.png)

![Contoh tangkapan layar ditambahkan untuk konteks](./source-string-2.png)

## Bagaimana cara meninggalkan komentar atau mengajukan pertanyaan? Saya ingin menandai sebuah masalah atau salah ketik... {#comment}

Jika Anda ingin menaikkan bendera pada string tertentu yang memerlukan perhatian, silakan berikan komentar.

- Klik tombol kedua di bilah kanan atas. Tab tersembunyi akan muncul di sebelah kanan Anda. Tinggalkan komentar baru dan klik kotak centang "Masalah" di bagian bawah. Anda dapat menentukan jenis masalah dengan memilih salah satu opsi dari menu drop-down.
- Setelah terkirim, akan dilaporkan ke tim kami. Kami akan memperbaiki masalah tersebut dan memberi tahu Anda dengan membalas komentar Anda dan menutup masalah tersebut.
- Jika Anda melaporkan terjemahan yang salah, terjemahannya dan alternatif yang diusulkan akan ditinjau oleh penutur asli pada ulasan berikutnya.

![Menampilkan cara membuat komentar dan isu](./comment-issue.png)

## Apa itu Memori Terjemahan (TM)? {#translation-memory}

Translation Memory (TM) adalah sebuah fitur Crowdin yang menyimpan semua string yang telah diterjemahkan sebelumnya di [ethereum.org](http://ethereum.org/). Ketika sebuah string diterjemahkan, maka string tersebut akan otomatis disimpan ke dalam TM proyek kami. Ini bisa menjadi alat yang berguna untuk membantu Anda menghemat waktu!

- Lihat pada bagian "TM and MT Suggestions" dan anda akan melihat bagaimana penerjemah lain menerjemahkan string yang sama atau serupa. Jika Anda menemukan saran dengan tingkat kecocokan yang tinggi, silakan rujuk terjemahan itu dengan mengkliknya.
- Jika tidak ada apa-apa di dalam daftar, Anda dapat mencari TM untuk melihat terjemahan yang dibuat sebelumnya dan menggunakannya kembali untuk konsistensi.

![Tangkapan layar dari translation memory](./translation-memory.png)

## Bagaimana cara menggunakan glosarium Crowdin? {#glossary}

Terminologi Ethereum adalah bagian pentng lainnya dari pekerjaan terjemahan kami karena sering kali istilah teknologi baru belum dilokalkan dalam banyak bahasa. Juga, ada istilah yang memiliki arti berbeda dalam konteks yang berbeda. [Selengkapnya tentang menerjemahkan terminologi Ethereum](#terminology)

Glosarium Crowdin adalah tempat terbaik untuk klarifikasi istilah dan definisi. Ada dua cara untuk merujuk ke glosarium.

- Pertama, ketika menemukan istilah yang digarisbawahi pada string sumber, Anda dapat mengarahkan mouse ke atasnya dan melihat definisi singkatnya.

![Contoh definisi glosarium](./glossary-definition.png)

- Kedua, jika melihat istilah yang belum pernah Anda dengar tetapi tidak digarisbawahi, Anda dapat mencari di tab glosarium (tombol ketiga di kolom kanan). Anda akan menemukan penjelasan istilah-istilah tertentu dan yang sering digunakan dalam projek.

![Sebuah tangkapan layar menunjukkan tempat untuk menemukan tab glosarium di Crowdin](./glossary-tab.png)

- Jika masih belum bisa menemukannya, ini adalah kesempatan Anda untuk menambahkan istilah baru! Kami mendorong Anda untuk mencarinya di mesin pencarian dan menambahkan deskripsi ke glosarium. Ini akan sangat membantu penerjemah lain untuk lebih memahami istilah tersebut.

![Sebuah tangkapan layar menunjukkan cara menambahkan istilah glosarium ke Crowdin](./add-glossary-term.png)

### Kebijakan terjemahan terminologi {#terminology}

_Untuk nama (merek, perusahaan, orang) dan istilah teknologi baru (Beacon Chain, shard chains, dll.)_

Ethereum menghadirkan banyak istilah baru yang telah ditemukan baru-baru ini. Beberapa istilah akan berbeda dari penerjemah satu ke penerjemah lainnya karena tidak ada terjemahan resmi dalam bahasa masing-masing. Inkonsistensi seperti itu dapat menyebabkan kesalahpahaman dan mengurangi keterbacaan.

Karena keragaman linguistik dan standarisasi yang berbeda dalam setiap bahasa, hampir tidak mungkin untuk menghasilkan kebijakan terjemahan terminologi terpadu yang dapat diadaptasikan dalam semua bahasa yang didukung.

Setelah mempertimbangkan dengan cermat, kami telah mencapai keputusan untuk menyerahkan terminologi yang paling sering digunakan kepada Anda, para penerjemah.

Inilah yang kami sarankan, ketika menemukan istilah yang tidak Anda kenal:

- Lihat [Glosarium Istilah](#glossary), Anda mungkin menemukan bagaimana penerjemah lain menerjemahkannya sebelumnya. Jika menurut Anda istilah yang diterjemahkan sebelumnya tidak sesuai, silakan perbaikin terjemahan dengan menambahkan istilah baru ke Glosarium Crowdin.
- Jika terjemahan sebelumnya tidak ada dalam Glosarium, kami mendorong Anda untuk mencarinya di mesin pencarian atau artikel media yang menunjukkan bagaimana istilah tersebut sebenarnya digunakan di komunitas Anda.
- Jika tidak menemukan referensi sama sekali, jangan ragu untuk mempercayai intuisi Anda dan menyarankan terjemahan baru ke bahasa Anda!
- Jika Anda merasa kurang percaya diri untuk melakukannya, biarkan istilah tersebut tidak diterjemahkan. Terkadang, isitilah bahasa Inggris lebih dari cukup dalam mengirimkan definisi yang akurat.

Kami menyarankan agar Anda membiarkan nama merek, perusahaan, dan personel tidak diterjemahkan karena terjemahannya dapat menyebabkan kebingungan yang tidak perlu dan kesulitan SEO.

## Bagaimana cara kerja proses pengulasan? {#review-process}

Untuk memastikan tingkat kualitas dan konsistensi tertentu dalam penerjemahan kami, kami bekerja dengan [Acolad](https://www.acolad.com/), salah satu penyedia layanan bahasa terbesar di dunia. Acolad memiliki 20.000 ahli bahasa profesional, yang memungkinkan mereka untuk menyediakan peninjau ahli untuk setiap bahasa dan jenis konten yang kami perlukan.

Proses peninjauannya sederhana; setelah beberapa [ember konten](/contributing/translation-program/content-buckets) telah diterjemahkan 100%, kami meminta peninjauan untuk bagian tersebut. Proses pengulasan terjadi secara langsung di Crowdin. Setelah pengulasan selesai, kami memperbarui situs web dengan konten yang diterjemahkan.

## Bagaimana cara saya menambahkan konten dalam bahasa saya? {#adding-foreign-language-content}

Saat ini, semua konten selain bahasa Inggris diterjemahkan secara langsung dari konten sumber bahasa Inggris, dan konten mana pun yang tidak ada dalam bahasa Inggris tidak dapat ditambahkan ke bahasa lainnya.

Untuk mengusulkan konten baru ke ethereum.org, Anda dapat [membuat isu](https://github.com/ethereum/ethereum-org-website/issues) di GitHub. Jika ditambahkan, konten akan ditulis dalam bahasa Inggris dan diterjemahkan ke bahasa lainnya dengan menggunakan Crowdin.

Kami berencana menambahkan dukungan untuk konten selain bahasa Inggris dalam waktu dekat ini.

## Hubungi kami {#contact}

Terima kasih telah membaca semua ini. Semoga ini membantu Anda untuk mengikuti program kami. Silakan bergabung dengan [kanal terjemahan Discord](https://discord.gg/ethereum-org) kami untuk mengajukan pertanyaan dan berkolaborasi dengan penerjemah lain, atau untuk menghubungi kami di translations@ethereum.org!
