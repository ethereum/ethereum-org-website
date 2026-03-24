---
title: Pertanyaan yang sering diajukan (FAQ) Program Terjemahan
lang: id
description: Pertanyaan yang sering diajukan tentang Program Terjemahan ethereum.org
---

# Panduan menerjemahkan ethereum.org {#translating-ethereum-guide}

Jika Anda baru mengenal Program Terjemahan dan ragu untuk bergabung, berikut adalah beberapa FAQ yang dapat membantu Anda memulai. Gunakan panduan ini untuk menemukan jawaban atas pertanyaan yang paling umum.

## Bisakah saya mendapatkan kompensasi karena menerjemahkan ethereum.org? {#compensation}

Ethereum.org adalah situs web sumber terbuka, yang berarti siapa pun dapat terlibat dan berkontribusi.

Program Terjemahan ethereum.org adalah perpanjangan dari hal tersebut dan diselenggarakan dengan filosofi yang serupa.

Tujuan dari Program Terjemahan adalah untuk membuat konten Ethereum dapat diakses oleh semua orang, terlepas dari bahasa yang mereka gunakan. Ini juga memungkinkan setiap orang yang menguasai dua bahasa untuk terlibat dengan ekosistem Ethereum dan berkontribusi dengan cara yang mudah diakses.

Untuk alasan ini, Program Terjemahan bersifat terbuka dan sukarela, dan partisipasi tidak dikenakan kompensasi. Jika kami memberikan kompensasi kepada penerjemah berdasarkan jumlah kata yang mereka terjemahkan, kami hanya dapat mengundang mereka yang memiliki pengalaman terjemahan yang memadai (penerjemah profesional) untuk bergabung dengan Program Terjemahan. Hal ini akan membuat Program Terjemahan menjadi eksklusif dan mencegah kami mencapai tujuan yang telah digariskan, khususnya: memungkinkan semua orang untuk berpartisipasi dan terlibat dengan ekosistem.

Kami melakukan segala upaya untuk memungkinkan kontributor kami berhasil dalam ekosistem Ethereum; banyak insentif non-moneter yang tersedia seperti: [menawarkan POAP](/contributing/translation-program/acknowledgements/#poap) dan [sertifikat penerjemah](/contributing/translation-program/acknowledgements/#certificate), serta menyelenggarakan [Papan Peringkat Terjemahan](/contributing/translation-program/acknowledgements/) dan [mencantumkan semua penerjemah kami di situs](/contributing/translation-program/contributors/).

## Bagaimana cara menerjemahkan string dengan `<HTML tags>`? {#tags}

Tidak setiap string ditulis dalam bentuk teks murni. Ada beberapa string yang terdiri dari skrip campuran seperti tag HTML (`<0>`, `</0>`). Ini biasanya untuk hyperlink atau gaya alternatif di tengah kalimat.

- Terjemahkan teks di dalam tag tetapi jangan terjemahkan tag itu sendiri. Apa pun yang ada di dalam `<` dan `>` tidak boleh diterjemahkan atau dihapus.
- Untuk menjaga string tetap aman, kami menyarankan Anda mengklik tombol "Copy Source" di kiri bawah. Ini akan menyalin string asli dan menempelkannya ke dalam kotak teks. Ini memungkinkan Anda memperjelas di mana letak tag dan membantu Anda menghindari kesalahan.

![Antarmuka Crowdin dengan tombol salin sumber disorot](./html-tag-strings.png)

Anda dapat memindahkan posisi tag di dalam string agar lebih alami dalam bahasa Anda – pastikan saja untuk memindahkan seluruh tag.

Untuk informasi lebih mendalam tentang menangani tag dan cuplikan kode, silakan merujuk ke [Panduan Gaya Terjemahan ethereum.org](/contributing/translation-program/translators-guide/#dealing-with-tags).

## Di mana letak string tersebut? {#strings}

Sering kali string sumber saja mungkin tidak cukup bagi Anda untuk memberikan terjemahan yang akurat.

- Lihat "tangkapan layar" dan "konteks" untuk informasi lebih lanjut. Di bagian string sumber, Anda akan melihat gambar tangkapan layar terlampir yang akan menunjukkan kepada Anda bagaimana kami menggunakan string tersebut dalam konteks.
- Jika Anda masih tidak yakin, beri tanda di "bagian komentar". [Tidak yakin bagaimana cara meninggalkan komentar?](#comment)

![Menunjukkan bagaimana konteks dapat diberikan untuk sebuah string dengan tangkapan layar](./source-string.png)

![Contoh tangkapan layar yang ditambahkan untuk konteks](./source-string-2.png)

## Bagaimana cara saya meninggalkan komentar atau mengajukan pertanyaan? Saya ingin menandai masalah atau salah ketik... {#comment}

Jika Anda ingin menandai string tertentu yang memerlukan perhatian, jangan ragu untuk mengirimkan komentar.

- Klik tombol kedua di bilah kanan atas. Tab tersembunyi akan muncul di sebelah kanan Anda. Tinggalkan komentar baru dan klik kotak centang "Issue" di bagian bawah. Anda dapat menentukan jenis masalah dengan memilih salah satu opsi dari menu tarik-turun.
- Setelah dikirimkan, ini akan dilaporkan ke tim kami. Kami akan memperbaiki masalah tersebut dan memberi tahu Anda dengan membalas komentar Anda dan menutup masalah tersebut.
- Jika Anda melaporkan terjemahan yang salah, terjemahan dan alternatif yang Anda sarankan akan ditinjau oleh penutur asli selama peninjauan berikutnya.

![Menunjukkan cara membuat komentar dan masalah](./comment-issue.png)

## Apa itu Memori Terjemahan (TM)? {#translation-memory}

Memori Terjemahan (TM) adalah fitur Crowdin yang menyimpan semua string yang diterjemahkan sebelumnya di seluruh ethereum.org. Saat sebuah string diterjemahkan, string tersebut secara otomatis disimpan ke dalam TM proyek kami. Ini bisa menjadi alat yang berguna untuk membantu Anda menghemat waktu!

- Lihat bagian "TM and MT Suggestions" dan Anda akan melihat bagaimana penerjemah lain menerjemahkan string yang sama atau serupa. Jika Anda menemukan saran dengan tingkat kecocokan yang tinggi, jangan ragu untuk merujuk ke terjemahan tersebut dengan mengkliknya.
- Jika tidak ada apa pun dalam daftar, Anda dapat mencari terjemahan yang dibuat sebelumnya di TM dan menggunakannya kembali untuk konsistensi.

![Tangkapan layar memori terjemahan](./translation-memory.png)

## Bagaimana cara menggunakan glosarium Crowdin? {#glossary}

Terminologi Ethereum adalah bagian penting lainnya dari pekerjaan terjemahan kami karena sering kali istilah teknologi baru belum dilokalkan dalam banyak bahasa. Selain itu, ada istilah yang memiliki arti berbeda dalam konteks yang berbeda. [Lebih lanjut tentang menerjemahkan terminologi Ethereum](#terminology)

Glosarium Crowdin adalah tempat terbaik untuk klarifikasi istilah dan definisi. Ada dua cara untuk merujuk ke glosarium.

- Pertama, ketika Anda menemukan istilah yang digarisbawahi pada string sumber, Anda dapat mengarahkan mouse ke atasnya dan melihat definisi singkatnya.

![Contoh definisi glosarium](./glossary-definition.png)

- Kedua, Jika Anda melihat istilah yang tidak familier bagi Anda tetapi tidak digarisbawahi, Anda dapat mencari di tab glosarium (tombol ketiga di kolom kanan). Anda akan menemukan penjelasan tentang istilah tertentu dan istilah yang sering digunakan dalam proyek.

![Tangkapan layar yang menunjukkan di mana menemukan tab glosarium di Crowdin](./glossary-tab.png)

- Jika Anda masih tidak dapat menemukannya, ini adalah kesempatan Anda untuk menambahkan istilah baru! Kami mendorong Anda untuk mencarinya di mesin pencari dan menambahkan deskripsinya ke glosarium. Ini akan sangat membantu penerjemah lain untuk lebih memahami istilah tersebut.

![Tangkapan layar yang menunjukkan cara menambahkan istilah glosarium ke Crowdin](./add-glossary-term.png)

### Kebijakan terjemahan terminologi {#terminology}

_Untuk nama (merek, perusahaan, orang) dan istilah teknologi baru (Beacon Chain, shard chain, dll.)_

Ethereum menghadirkan banyak istilah baru yang baru-baru ini diciptakan. Beberapa istilah akan bervariasi dari satu penerjemah ke penerjemah lainnya karena tidak ada terjemahan resmi dalam bahasa masing-masing. Ketidakkonsistenan semacam itu dapat menyebabkan kesalahpahaman dan menurunkan keterbacaan.

Karena keragaman linguistik dan standardisasi yang berbeda dalam setiap bahasa, hampir tidak mungkin untuk menghasilkan kebijakan terjemahan terminologi terpadu yang dapat diadaptasi dalam semua bahasa yang didukung.

Setelah pertimbangan yang cermat, kami telah mencapai keputusan untuk menyerahkan terminologi yang paling sering digunakan kepada Anda, para penerjemah.

Inilah yang kami sarankan, ketika Anda menemukan istilah yang tidak familier bagi Anda:

- Rujuk ke [Glosarium istilah](#glossary), Anda mungkin menemukan bagaimana penerjemah lain sebelumnya menerjemahkannya. Jika Anda merasa istilah yang diterjemahkan sebelumnya tidak sesuai, jangan ragu untuk memulihkan terjemahan Anda dengan menambahkan istilah baru ke Glosarium Crowdin.
- Jika terjemahan sebelumnya tidak ada di Glosarium, kami mendorong Anda untuk mencarinya di mesin pencari atau artikel media yang menunjukkan bagaimana istilah tersebut sebenarnya digunakan di komunitas Anda.
- Jika Anda tidak menemukan referensi sama sekali, jangan ragu untuk memercayai intuisi Anda dan menyarankan terjemahan baru ke bahasa Anda!
- Jika Anda merasa kurang percaya diri untuk melakukannya, biarkan istilah tersebut tidak diterjemahkan. Terkadang, istilah bahasa Inggris lebih dari cukup dalam memberikan definisi yang akurat.

Kami menyarankan Anda membiarkan nama merek, perusahaan, dan personel tidak diterjemahkan karena terjemahan dapat menyebabkan kebingungan yang tidak perlu dan kesulitan SEO.

## Bagaimana cara kerja proses peninjauan? {#review-process}

Untuk memastikan tingkat kualitas dan konsistensi tertentu dalam terjemahan kami, kami bekerja sama dengan [Acolad](https://www.acolad.com/), salah satu penyedia layanan bahasa terbesar di dunia. Acolad memiliki 20.000 ahli bahasa profesional, yang berarti mereka dapat menyediakan peninjau profesional untuk setiap bahasa dan jenis konten yang kami butuhkan.

Proses peninjauannya mudah; setelah sekumpulan konten 100% diterjemahkan, kami memesan peninjauan untuk kelompok konten tersebut. Proses peninjauan berlangsung langsung di Crowdin. Setelah peninjauan selesai, kami memperbarui situs web dengan konten yang diterjemahkan.

## Bagaimana cara menambahkan konten dalam bahasa saya? {#adding-foreign-language-content}

Saat ini, semua konten non-bahasa Inggris diterjemahkan langsung dari konten sumber bahasa Inggris, dan konten apa pun yang tidak ada dalam bahasa Inggris tidak dapat ditambahkan ke bahasa lain.

Untuk menyarankan konten baru bagi ethereum.org, Anda dapat [membuat masalah](https://github.com/ethereum/ethereum-org-website/issues) di GitHub. Jika ditambahkan, konten akan ditulis dalam bahasa Inggris dan diterjemahkan ke bahasa lain menggunakan Crowdin.

Kami berencana untuk menambahkan dukungan untuk penambahan konten non-bahasa Inggris dalam waktu dekat.

## Hubungi kami {#contact}

Terima kasih telah membaca semua ini. Kami harap ini membantu Anda untuk bergabung dengan program kami. Jangan ragu untuk bergabung dengan [saluran terjemahan Discord](https://discord.gg/ethereum-org) kami untuk mengajukan pertanyaan dan berkolaborasi dengan penerjemah lain, atau hubungi kami di translations@ethereum.org!