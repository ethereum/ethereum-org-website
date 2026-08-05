---
title: Menambahkan artikel
description: Panduan untuk berkontribusi artikel pembangun ke ethereum.org
lang: id
---

## Menerbitkan artikel pembangun {#publishing-a-builder-article}

Artikel pembangun muncul di [ethereum.org/latest/](/latest/) dan ditulis sebagai file Markdown di repositori. Artikel ini di-host secara internal, berupa artikel panjang yang mencakup gambaran umum dan panduan tentang ekosistem Ethereum, lanskap teknologi sumber terbuka, serta pembaruan tepat waktu untuk pembangun dan peneliti, mencakup topik seperti peningkatan protokol, pola perkakas baru, referensi penyebaran, dan banyak lagi.

### Kebijakan pencantuman {#listing-policy}

Ethereum.org adalah sumber daya edukasi yang netral. Bagian "Terbaru" dikurasi untuk:

- **Mengedukasi** pembangun dan komunitas yang lebih luas tentang teknologi Ethereum, ekosistem sumber terbuka, dan perkembangan terkini
- **Tetap akurat** dalam konten teknis dan referensinya
- **Tetap relevan** bagi komunitas pembangun Ethereum

Situs ini tidak mencantumkan artikel yang utamanya mempromosikan produk, token, atau layanan komersial tertentu. Semua kiriman ditinjau oleh tim ethereum.org sebelum dipublikasikan.

### Kriteria untuk penyertaan {#criteria-for-inclusion}

#### Wajib ada {#must-haves}

- **Berfokus pada Ethereum dan sumber terbuka** - Artikel harus utamanya tentang Ethereum, protokolnya, perkakas, atau ekosistem pembangun, atau tentang teknologi sumber terbuka dan perlindungan (sanctuary) yang mendukungnya. Konten tentang topik rantai blok atau Web3 umum yang tidak secara substansial merujuk pada Ethereum atau lanskap sumber terbukanya tidak akan diterima.
- **Nilai edukasi atau lanskap** - Artikel harus mengajarkan pembangun sesuatu yang dapat ditindaklanjuti (misalnya, cara menggunakan EIP baru, cara mengevaluasi pilihan arsitektur, cara menyebarkan atau berkontribusi pada infrastruktur sumber terbuka) atau memberikan perspektif yang bermakna tentang state Ethereum dan ekosistem sumber terbuka di sekitarnya. Konten promosi untuk produk, token, atau layanan komersial tertentu tidak diterima.
- **Informasi akurat** - Klaim teknis harus benar secara faktual dan terkini. Kutip EIP, pengumuman resmi, atau data onchain jika memungkinkan.
- **Karya orisinal** - Konten harus orisinal atau digunakan dengan izin. Lihat [kebijakan plagiarisme](/contributing/#plagiarism).
- **Bahasa** - Artikel dapat dikirimkan dalam [bahasa yang didukung](/contributing/translation-program/) apa pun. Atur bidang `lang` agar sesuai dengan bahasa penulisan artikel (misalnya, `en` untuk bahasa Inggris, `es` untuk bahasa Spanyol). Setelah artikel dikirimkan, kiriman berbahasa Inggris dapat diterjemahkan ke bahasa lain, dan kiriman non-bahasa Inggris dapat diterjemahkan ke bahasa Inggris.

#### Nilai tambah {#nice-to-haves}

- **Tepat waktu dan abadi (evergreen)** - Konten yang tetap berguna melampaui tanggal publikasinya lebih disukai daripada materi yang murni sensitif terhadap waktu.
- **Kredibilitas penulis** - Artikel dari pembangun, peneliti, atau kontributor yang selaras dengan CROPS yang sudah mapan akan mendapat prioritas.
- **Bacaan lebih lanjut** - Sertakan bagian `## Further reading` dengan tautan ke EIP, dokumentasi, dan sumber utama yang relevan.

### Mengusulkan artikel pembangun {#propose-a-builder-article}

Jika Anda ingin menulis artikel pembangun untuk ethereum.org dan memenuhi kriteria, buatlah isu (issue) di GitHub.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?template=content-suggestion.yml">
  Usulkan artikel
</ButtonLink>