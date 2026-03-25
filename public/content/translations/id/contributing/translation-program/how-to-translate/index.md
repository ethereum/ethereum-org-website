---
title: Cara menerjemahkan
lang: id
description: Instruksi untuk menggunakan Crowdin untuk menerjemahkan ethereum.org
---

# Cara menerjemahkan {#how-to-translate}

## Panduan visual {#visual-guide}

Bagi Anda yang lebih suka belajar secara visual, tonton Luka memandu cara menyiapkan Crowdin. Sebagai alternatif, Anda dapat menemukan langkah-langkah yang sama dalam format tertulis di bagian selanjutnya.

<YouTube id="Ii7bYhanLs4" />

## Panduan tertulis {#written-guide}

### Bergabung dengan proyek kami di Crowdin {#join-project}

Anda harus masuk ke akun Crowdin Anda atau mendaftar jika Anda belum memilikinya. Yang diperlukan untuk mendaftar hanyalah akun email dan kata sandi.

<ButtonLink href="https://crowdin.com/project/ethereum-org/">
  Bergabung dengan proyek
</ButtonLink>

### Buka bahasa Anda {#open-language}

Setelah masuk ke Crowdin, Anda akan melihat deskripsi proyek dan daftar semua bahasa yang tersedia.
Setiap bahasa juga berisi informasi tentang jumlah total kata yang dapat diterjemahkan dan gambaran umum tentang seberapa banyak konten yang telah diterjemahkan dan disetujui dalam bahasa tertentu.

Buka bahasa yang ingin Anda terjemahkan untuk melihat daftar file yang tersedia untuk diterjemahkan.

![Daftar bahasa di Crowdin](./list-of-languages.png)

### Temukan dokumen untuk dikerjakan {#find-document}

Konten situs web dibagi menjadi sejumlah dokumen dan keranjang konten (content bucket). Anda dapat memeriksa kemajuan setiap dokumen di sebelah kanan – jika kemajuan terjemahan di bawah 100%, silakan berkontribusi!

Tidak melihat bahasa Anda terdaftar? [Buka sebuah isu](https://github.com/ethereum/ethereum-org-website/issues/new/choose) atau tanyakan di [Discord](https://discord.gg/ethereum-org) kami

![File yang diterjemahkan dan belum diterjemahkan di Crowdin](./crowdin-files.png)

Catatan tentang keranjang konten: kami menggunakan 'keranjang konten' di dalam Crowdin agar konten dengan prioritas tertinggi dirilis terlebih dahulu. Saat Anda memeriksa suatu bahasa, misalnya, [Filipino](https://crowdin.com/project/ethereum-org/fil#) Anda akan melihat folder untuk keranjang konten ("1. Homepage", "2. Essentials", "3. Exploring", dll.).

Kami mendorong Anda untuk menerjemahkan dalam urutan numerik ini (1 → 2 → 3 → ⋯) untuk memastikan halaman dengan dampak tertinggi diterjemahkan terlebih dahulu.

### Terjemahkan {#translate}

Setelah memilih file yang ingin Anda terjemahkan, file tersebut akan terbuka di editor online. Jika Anda belum pernah menggunakan Crowdin sebelumnya, Anda dapat menggunakan panduan singkat ini untuk mempelajari dasar-dasarnya.

![Editor online Crowdin](./online-editor.png)

**_1 – Bilah sisi kiri_**

- Belum diterjemahkan (merah) – teks yang belum dikerjakan. Ini adalah string yang harus Anda terjemahkan.
- Diterjemahkan (hijau) – teks yang sudah diterjemahkan, tetapi belum ditinjau. Anda dipersilakan untuk menyarankan terjemahan alternatif, atau memberikan suara pada terjemahan yang ada menggunakan tombol ‘’+’’ dan ‘’-‘‘ di editor.
- Disetujui (tanda centang) – teks yang sudah ditinjau dan saat ini tayang di situs web.

Anda juga dapat menggunakan tombol di bagian atas untuk mencari string tertentu, memfilternya berdasarkan status, atau mengubah tampilan.

**_2 – Area editor_**

Area terjemahan utama – teks sumber ditampilkan di bagian atas, dengan konteks tambahan dan tangkapan layar, jika tersedia.
Untuk menyarankan terjemahan baru, masukkan terjemahan Anda di bidang ‘’Enter translation here’’ dan klik Simpan.

Anda juga dapat menemukan terjemahan string yang ada dan terjemahan ke bahasa lain di bagian ini, serta kecocokan memori terjemahan dan saran terjemahan mesin.

**_3 – Bilah sisi kanan_**

Di sinilah Anda dapat menemukan komentar, entri memori terjemahan, dan entri glosarium. Tampilan default menunjukkan komentar dan memungkinkan penerjemah untuk berkomunikasi, mengangkat masalah, atau melaporkan terjemahan yang salah.

Dengan menggunakan tombol di bagian atas, Anda juga dapat beralih ke Memori Terjemahan, tempat Anda dapat mencari terjemahan yang ada, atau ke Glosarium, yang berisi deskripsi dan terjemahan standar dari istilah-istilah utama.

Ingin mempelajari lebih lanjut? Jangan ragu untuk memeriksa [dokumentasi tentang penggunaan editor online Crowdin](https://support.crowdin.com/online-editor/)

### Proses peninjauan {#review-process}

Setelah Anda menyelesaikan terjemahan (yaitu, semua file untuk keranjang konten menampilkan 100%), layanan terjemahan profesional kami akan meninjau (dan berpotensi mengedit) konten tersebut. Setelah peninjauan selesai (yaitu, kemajuan peninjauan adalah 100%), kami akan menambahkannya ke situs web.

<Alert variant="update">
<AlertEmoji text=":warning:"/>
<AlertContent>
  Tolong jangan gunakan terjemahan mesin untuk menerjemahkan proyek ini. Semua terjemahan akan ditinjau sebelum ditambahkan ke situs web. Jika terjemahan yang Anda sarankan diketahui merupakan hasil terjemahan mesin, terjemahan tersebut akan ditolak dan kontributor yang sering menggunakan terjemahan mesin akan dikeluarkan dari proyek.
</AlertContent>
</Alert>

### Hubungi kami {#get-in-touch}

Apakah Anda memiliki pertanyaan? Atau ingin berkolaborasi dengan tim kami dan penerjemah lainnya? Silakan posting di saluran #translations di [server Discord ethereum.org](https://discord.gg/ethereum-org) kami

Anda juga dapat menghubungi kami di translations@ethereum.org

Terima kasih atas partisipasi Anda dalam Program Terjemahan ethereum.org!