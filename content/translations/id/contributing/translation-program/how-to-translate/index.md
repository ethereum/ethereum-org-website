---
title: Cara menerjemahkan
lang: id
description: Instruksi untuk menggunakan Crowdin dalam menerjemahkan ethereum.org
---

# Cara menerjemahkan {#how-to-translate}

## Panduan visual {#visual-guide}

Bagi yang lebih suka belajar secara visual, tonton Luka menjelaskan langkah-langkah untuk memulai Crowdin. Sebagai alternatif, Anda dapat menemukan langkah-langkah yang sama dalam format tulisan di bagian berikutnya.

<YouTube id="Ii7bYhanLs4" />

## Panduan tertulis {#written-guide}

### Bergabung dalam proyek kami di Crowdin {#join-project}

Anda harus masuk ke akun Crowdin atau mendaftar jika belum memiliki akun. Yang diperlukan untuk mendaftar hanyalah akun email dan kata sandi.

<ButtonLink to="https://crowdin.com/project/ethereum-org/">
  Bergabung dengan proyek
</ButtonLink>

### Buka bahasa Anda {#open-language}

Setelah masuk ke Crowdin, Anda akan melihat deskripsi proyek dan daftar semua bahasa yang tersedia. Setiap bahasa juga berisi informasi tentang jumlah total kata yang dapat diterjemahkan dan gambaran umum tentang seberapa banyak konten yang telah diterjemahkan dan disetujui dalam bahasa tertentu.

Buka bahasa yang ingin Anda terjemahkan untuk melihat daftar file yang tersedia untuk diterjemahkan.

![Daftar bahasa di Crowdin](./list-of-languages.png)

### Temukan dokumen yang ingin dikerjakan {#find-document}

Konten situs web dibagi menjadi beberapa dokumen dan ember konten. Anda dapat memeriksa kemajuan setiap dokumen di sebelah kanan – jika kemajuan terjemahan di bawah 100%, silakan berkontribusi!

Tidak melihat bahasa Anda tercantum? [Buat isu](https://github.com/ethereum/ethereum-org-website/issues/new/choose) atau ajukan pertanyaan di [Discord](/discord/) kami

![File yang telah diterjemahkan atau belum diterjemahkan di Crowdin](./crowdin-files.png)

Catatan tentang ember konten: kami menggunakan 'ember konten' di dalam Crowdin untuk membuat konten berprioritas tertinggi dirilis terlebih dahulu. Ketika Anda memeriksa sebuah bahasa, misalkan, [Filipina](https://crowdin.com/project/ethereum-org/fil#) Anda akan melihat folder untuk ember konten ("1. Halaman beranda", "2. Dasar-dasar", "3. Menjelajahi", dll.).

Kami mendorong Anda untuk menerjemahkan dalam urutan numerik ini (1 → 2 → 3 → ⋯) untuk memastikan halaman dengan dampak tertinggi diterjemahkan terlebih dahulu.

[Pelajari selengkapnya tentang ember konten ethereum.org](/contributing/translation-program/content-buckets/)

### Menerjemahkan {#translate}

Setelah memilih file yang ingin Anda terjemahkan, file akan terbuka di editor online. Jika belum pernah menggunakan Crowdin sebelumnya, Anda dapat menggunakan panduan cepat ini untuk melihat dasar-dasarnya.

![Editor online Crowdin](./online-editor.png)

**_1 – Sidebar kiri_**

- Belum diterjemahkan (merah) – teks yang belum dikerjakan. Ini adalah string yang harus Anda terjemahkan.
- Diterjemahkan (hijau) – teks yang telah diterjemahkan, tetapi belum ditinjau. Anda diperbolehkan untuk menyarankan terjemahan alternatif, atau memilih yang sudah ada dengan menggunakan tombol ‘’+’’ dan ‘’-‘‘ di editor.
- Disetujui (tanda centang) – teks yang telah ditinjau dan saat ini berada di situs web.

Anda juga dapat menggunakan tombol di atas untuk mencari string tertentu, memfilternya berdasarkan status atau mengubah tampilan.

**_2 – Area editor_**

Area terjemahan utama – teks sumber ditampilkan di atas, dengan konteks dan tangkapan layar tambahan, jika tersedia. Untuk menyarankan terjemahan baru, masukkan terjemahan Anda di kolom ‘’Masukkan terjemahan di sini’’ dan klik Save.

Anda juga dapat menemukan terjemahan string dan terjemahan yang ada ke dalam bahasa lain di bagian ini, serta kecocokan memori terjemahan dan saran terjemahan mesin.

**_3 – Sidebar kanan_**

Di sinilah Anda dapat menemukan komentar, memasukkan entri memori terjemahan, dan glosarium. Tampilan default menunjukkan komentar dan memungkinkan penerjemah untuk berkomunikasi, membuat isu, atau melaporkan terjemahan yang salah.

Dengan menggunakan tombol di atas, Anda juga dapat beralih ke Translation Memory, tempat Anda dapat mencari terjemahan yang ada, atau ke Glosarium, yang terdiri dari deskripsi dan terjemahan standar istilah utama.

Ingin mempelajari selengkapnya? Jangan ragu untuk memeriksa [dokumentasi tentang menggunakan editor online Crowdin](https://support.crowdin.com/online-editor/)

### Proses peninjauan {#review-process}

Setelah Anda menyelesaikan terjemahan (yaitu, semua file untuk satu kelompok konten menunjukkan 100%), layanan terjemahan profesional kami akan meninjau (dan mungkin mengedit) konten tersebut. Setelah peninjauan selesai (yaitu kemajuan peninjauan sudah 100%), kami akan menambahkannya ke situs web.

<InfoBanner shouldCenter emoji=":warning:">
  Harap tidak menggunakan terjemahan mesin untuk menerjemahkan proyek tersebut. Semua terjemahan akan ditinjau sebelum ditambahkan ke situs web. Jika terjemahan yang Anda sarankan ternyata merupakan terjemahan mesin, terjemahan tersebut akan ditolak dan kontributor yang sering menggunakan terjemahan mesin akan dikeluarkan dari proyek.
</InfoBanner>

### Hubungi kami {#get-in-touch}

Ada pertanyaan? Atau ingin kolaborasi dengan tim kami atau penerjemah lainnya? Silakan posting di kanal #translations dari server [Discord ethereum.org](/discord/) kami

Anda juga dapat menghubungi kami di translations@ethereum.org

Terima kasih atas partisipasi Anda dalam Program Terjemahan ethereum.org!
