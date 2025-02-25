---
title: Panduan penerjemah
lang: id
description: Instruksi dan tip untuk penerjemah ethereum.org
---

# Panduan Gaya Penerjemahan Ethereum.org {#style-guide}

Panduan gaya terjemahan ethereum.org berisi beberapa panduan, instruksi, dan tip terpenting untuk penerjemah, membantu kami melokalkan situs web.

Dokumen ini berfungsi sebagai panduan umum dan tidak dikhususkan untuk satu bahasa.

Jika Anda memiliki pertanyaan, saran, atau umpan balik, silakan hubungi kami di translations@ethereum.org, kirim pesan ke @ethdotorg di Crowdin, atau [ bergabunglah dengan Discord kami](https://discord.gg/ethereum-org), tempat Anda dapat mengirim pesan kepada kami di saluran #translations atau menghubungi salah satu anggota tim.

## Menggunakan Crowdin {#using-crowdin}

Anda dapat menemukan petunjuk dasar tentang cara bergabung dengan proyek di Crowdin dan cara menggunakan editor online Crowdin di [laman Program Terjemahan](/contributing/translation-program/#how-to-translate).

Jika Anda ingin mempelajari lebih lanjut tentang Crowdin dan menggunakan beberapa fitur lanjutannya, [basis pengetahuan Crowdin](https://support.crowdin.com/online-editor/) berisi banyak panduan mendalam dan ikhtisar semua fungsi Crowdin.

## Menangkap esensi pesan {#capturing-the-essence}

Saat menerjemahkan konten ethereum.org, hindari terjemahan literal.

Penting bahwa terjemahan menangkap esensi dari pesan. Ini bisa berarti menyusun ulang frasa tertentu, atau menggunakan terjemahan deskriptif alih-alih menerjemahkan konten kata demi kata.

Bahasa yang berbeda memiliki aturan tata bahasa, konvensi, dan urutan kata yang berbeda. Saat menerjemahkan, harap perhatikan bagaimana kalimat disusun dalam bahasa target, dan hindari menerjemahkan sumber bahasa Inggris secara harfiah, karena ini dapat menyebabkan struktur kalimat dan keterbacaan yang buruk.

Alih-alih menerjemahkan teks sumber kata demi kata, Anda disarankan untuk membaca seluruh kalimat dan menyesuaikannya agar sesuai dengan konvensi bahasa target.

## Formal vs. informal {#formal-vs-informal}

Kami menggunakan bentuk sapaan formal, yang selalu sopan dan pantas untuk semua pengunjung.

Menggunakan alamat resmi memungkinkan kami untuk tidak terdengar tidak resmi atau menyinggung, dan berfungsi tanpa memandang usia dan jenis kelamin pengunjung.

Sebagian besar bahasa Indo-Eropa dan Afro-Asia menggunakan kata ganti orang kedua khusus gender, yang membedakan antara pria dan wanita. Saat menyapa pengguna atau menggunakan kata ganti posesif, kita dapat menghindari asumsi jenis kelamin pengunjung, karena bentuk formal dari sapaan umumnya berlaku dan konsisten, terlepas dari bagaimana mereka mengidentifikasi.

## Kosa kata dan makna yang sederhana dan jelas {#simple-vocabulary}

Tujuan kami adalah membuat konten di situs web dapat dipahami oleh sebanyak mungkin orang.

Dalam kebanyakan kasus, hal ini dapat dengan mudah dicapai dengan menggunakan kata-kata pendek dan sederhana yang mudah dimengerti. Jika ada beberapa kemungkinan terjemahan untuk kata tertentu dalam bahasa Anda dengan arti yang sama, pilihan terbaik yang paling sering dipilih adalah kata terpendek yang secara jelas mencerminkan artinya.

## Sistem penulisan {#writing-system}

Ethereum.org tersedia dalam beberapa bahasa, menggunakan sistem penulisan alternatif (atau skrip penulisan) ke bahasa Latin.

Semua konten harus diterjemahkan menggunakan sistem penulisan yang benar untuk bahasa Anda, dan tidak boleh menyertakan kata apa pun, yang ditulis menggunakan karakter Latin.

Saat menerjemahkan konten, Anda harus memastikan bahwa terjemahannya konsisten dan tidak menyertakan karakter Latin apa pun.

Kesalahpahaman yang umum adalah bahwa Ethereum harus selalu ditulis dalam bahasa Latin. Sebagian besar ini salah. Harap gunakan ejaan Ethereum daripada menggunakan aksara asli Anda (mis. 以太坊 dalam bahasa Mandarin, dalam إيثيريوم dalam bahasa Arab, dll.).

**Hal di atas tidak berlaku untuk bahasa, di mana nama-nama khusus sebaiknya tidak diterjemahkan.**

## Menerjemahkan metadata halaman {#translating-metadata}

Beberapa halaman berisi metadata seperti 'judul', 'bahasa', 'deskripsi', 'sidebar', dan sebagainya.

Kami menyembunyikan konten yang seharusnya tidak diterjemahkan oleh penerjemah saat mengunggah halaman baru ke Crowdin, yang berarti bahwa semua metadata yang terlihat oleh penerjemah di Crowdin harus diterjemahkan.

Harap perhatikan dengan seksama saat menerjemahkan string yang teks sumbernya berbahasa Inggris ('en'). Ini menunjukkan bahasa tempat halaman tersebut tersedia dan harus diterjemahkan ke dalam [kode bahasa ISO untuk bahasa Anda](https://www.andiamo.co.uk/resources/iso-language-codes/). String ini harus selalu diterjemahkan menggunakan huruf Latin, bukan menggunakan aksara asli dari bahasa yang disasar.

Jika Anda tidak yakin kode bahasa mana yang harus digunakan, Anda bisa memeriksa memori terjemahan di Crowdin atau melihat kode bahasa Anda di URL halaman di editor online Crowdin.

Beberapa contoh kode bahasa untuk bahasa yang paling banyak digunakan:

- Bahasa Arab - ar
- Bahasa Mandarin Sederhana - zr
- Bahasa Prancis - fr
- Bahasa India - hi
- Bahasa Spanyol - es

## Judul artikel eksternal {#external-articles}

Beberapa string berisi judul artikel-artikel eksternal. Sebagian besar halaman dokumentasi pengembang kami menyertakan tautan ke artikel luar untuk informasi tambahan. String yang berisi judul artikel perlu diterjemahkan, terlepas dari bahasa artikel tersebut, untuk memastikan pengalaman pengguna yang lebih konsisten bagi pengunjung yang melihat halaman dalam bahasa mereka.

Anda dapat menemukan beberapa contoh bagaimana string ini terlihat untuk penerjemah dan cara mengidentifikasinya di bawah ini (tautan ke artikel biasanya dapat ditemukan di bagian bawah halaman-halaman ini, di bagian 'Bacaan lebih lanjut'):

![Judul artikel di sidebar.png](./article-titles-in-sidebar.png) ![Judul artikel di editor.png](./article-titles-in-editor.png)

## Peringatan Crowdin {#crowdin-warnings}

Crowdin memiliki fitur bawaan yang memberi peringatan kepada penerjemah ketika mereka membuat kesalahan. Crowdin akan secara otomatis memberi peringatan sebelum menyimpan terjemahan Anda jika Anda lupa menyertakan tag dari sumber, menerjemahkan elemen yang seharusnya tidak diterjemahkan, menambahkan beberapa spasi berturut-turut, melupakan tanda baca di akhir, dan sebagainya. Jika Anda melihat peringatan seperti ini, harap kembali dan periksa kembali terjemahan yang disarankan.

**Jangan pernah mengabaikan peringatan ini, karena biasanya itu berarti ada yang salah atau terjemahan kehilangan bagian penting dari teks sumber.**

Contoh peringatan Crowdin ketika Anda lupa menambahkan tag ke terjemahan Anda: ![Contoh peringatan Crowdin](./crowdin-warning-example.png)

## Berurusan dengan tag dan cuplikan kode {#dealing-with-tags}

Banyak konten sumber berisi tag dan variabel, yang disorot dengan warna kuning di editor Crowdin. Ini melayani fungsi yang berbeda dan harus dilakukan pendekatan dengan benar.

**Pengaturan Crowdin**

Untuk mempermudah pengelolaan tag dan menyalinnya langsung dari sumber, kami sarankan untuk mengubah pengaturan Anda di editor Crowdin.

1. Open settings ![Bagaimana cara membuka pengaturan di editor](./editor-settings.png)

2. Gulir turun ke bagian 'menampilkan tag HTML'

3. Pilih "Sembunyikan" ![Silakan pilih 'Sembunyikan'](./hide-tags.png)

4. Klik 'Simpan'

Dengan memilih opsi ini, teks tag lengkap tidak akan ditampilkan lagi dan akan digantikan oleh angka. Saat menerjemahkan, mengklik tag ini akan secara otomatis menyalin tag yang sama persis ke kolom terjemahan.

**Tautan**

Anda mungkin melihat tautan lengkap ke halaman di ethereum.org atau situs web lain.

Ini harus identik dengan sumbernya dan tidak diubah atau diterjemahkan. Jika Anda menerjemahkan tautan atau mengubahnya dengan cara apa pun, bahkan hanya dengan menghapus sebagian saja, seperti garis miring (/), ini akan mengakibatkan tautan yang rusak dan tidak dapat digunakan.

Cara terbaik untuk menangani tautan adalah dengan menyalinnya langsung dari sumbernya, baik dengan mengkliknya atau menggunakan tombol 'Salin Sumber' (Alt+C).

![Contoh tautan.png](./example-of-link.png)

Tautan juga muncul dalam teks sumber dalam bentuk tag (misalnya, <0> </0>). Jika Anda mengarahkan kursor ke tag, editor akan menampilkan konten lengkapnya-terkadang tag ini mewakili tautan.

Sangat penting untuk menyalin tautan dari sumbernya dan tidak mengubah urutannya.

Jika urutan tag diubah, tautan yang diwakilinya akan rusak.

![Contoh tautan di dalam tag.png](./example-of-links-inside-tags.png)

**Tag dan variabel**

Teks sumber berisi berbagai jenis tag, yang harus selalu disalin dari sumber dan tidak pernah diubah. Sama seperti di atas, urutan tag ini dalam terjemahan juga harus tetap sama dengan sumbernya.

Tag selalu berisi tag pembuka dan penutup. Dalam kebanyakan kasus, teks antara tag pembuka dan penutup harus diterjemahkan.

Contoh: `<strong x-id="1">`Terdesentralisasi`</strong>`

`<strong x-id="1">` - _Tag pembuka yang membuat teks menjadi tebal_

Terdesentralisasi - _Teks yang dapat diterjemahkan_

`</strong>` - _Tag penutup_

![Contoh 'kuat' tags.png](./example-of-strong-tags.png)

Cuplikan kode harus didekati sedikit berbeda dengan tag lainnya, karena berisi kode yang tidak boleh diterjemahkan.

Contoh: `<code>`nonce`</code>`

`<code>` - _Tag pembuka, yang berisi cuplikan kode_

nonce - _Teks yang tidak dapat diterjemahkan_

`</code>` - _Tag penutup_

![Contoh kode snippets.png](./example-of-code-snippets.png)

Teks sumber juga berisi tag singkat, yang hanya berisi angka, artinya fungsinya tidak langsung terlihat. Anda dapat mengarahkan kursor ke tag ini untuk melihat dengan tepat fungsi mana yang mereka layani.

Pada contoh di bawah, Anda dapat mengarahkan kursor ke tag <0> yang menunjukkan bahwa ia mewakili `<code>` dan berisi cuplikan kode. Oleh karena itu, konten di dalam tag ini tidak boleh diterjemahkan.

![Contoh yang membingungkan tags.png](./example-of-ambiguous-tags.png)

## Bentuk/singkatan pendek vs. lengkap {#short-vs-full-forms}

Di situs web ini terdapat banyak singkatan yang digunakan, misalnya dapp, NFT, DAO, DeFi, dan lain-lain. Singkatan ini biasanya digunakan dalam bahasa Inggris dan sebagian besar pengunjung situs web mengenalnya.

Karena singkatan tersebut biasanya tidak memiliki terjemahan yang sebanding dalam bahasa lain, cara terbaik untuk menerjemahkan ini dan istilah serupa adalah dengan memberikan terjemahan deskriptif dari bentuk lengkapnya, dan menambahkan singkatan bahasa Inggris dalam tanda kurung.

Jangan terjemahkan singkatan ini, karena kebanyakan orang tidak akan mengenalnya, dan versi yang dilokalkan tidak akan masuk akal bagi sebagian besar pengunjung.

Contoh cara menerjemahkan dapp:

- Aplikasi terdesentralisasi (dapp) → _Bentuk lengkap terjemahan (singkatan bahasa Inggris dalam kurung)_

## Istilah tanpa terjemahan yang sebanding {#terms-without-established-translations}

Beberapa istilah mungkin tidak memiliki terjemahan yang sebanding dalam bahasa lain, dan dikenal luas dengan istilah bahasa Inggris aslinya. Istilah tersebut sebagian besar mencakup konsep yang lebih baru, seperti bukti kerja, bukti taruhan, Rantai Suar, taruhan, dll.

Meskipun menerjemahkan istilah-istilah ini mungkin terdengar tidak wajar, karena versi bahasa Inggris juga umum digunakan dalam bahasa lain, sangat disarankan agar istilah-istilah tersebut diterjemahkan.

Saat menerjemahkannya, jangan ragu untuk berkreasi, gunakan terjemahan deskriptif, atau cukup terjemahkan secara harfiah.

**Alasan mengapa sebagian besar istilah harus diterjemahkan, daripada membiarkannya tetap dalam bahasa Inggris, adalah kenyataan bahwa terminologi baru ini akan menjadi lebih luas di masa depan, karena semakin banyak orang mulai menggunakan Ethereum dan teknologi terkait. Jika kita ingin membawa lebih banyak orang dari seluruh dunia ke ruang ini, kita perlu menyediakan terminologi yang dapat dimengerti dalam sebanyak mungkin bahasa, bahkan jika kita perlu membuatnya sendiri.**

## Tombol & CTA {#buttons-and-ctas}

Situs web berisi banyak tombol, yang harus diterjemahkan secara berbeda dari konten lainnya.

Teks tombol dapat diidentifikasi dengan melihat tangkapan layar konteks, terhubung dengan sebagian besar string, atau dengan memeriksa konteks di editor, yang menyertakan frasa ''tombol''.

Terjemahan untuk tombol harus sesingkat mungkin, untuk mencegah ketidakcocokan pemformatan. Selain itu, terjemahan tombol harus dalam bentuk imperatif, misalnya tertera dalam kalimat perintah atau permintaan.

![Cara menemukan button.png](./how-to-find-a-button.png)

## Menerjemahkan untuk inklusivitas {#translating-for-inclusivity}

Pengunjung Ethereum.org datang dari seluruh dunia dan dari berbagai latar belakang. Oleh karena itu, bahasa di situs web harus netral, ramah kepada semua orang, dan tidak eksklusif.

Aspek penting dari hal ini adalah netralitas gender. Ini dapat dengan mudah dicapai dengan menggunakan bentuk sapaan formal, dan menghindari kata-kata khusus gender dalam terjemahan.

Bentuk inklusivitas lainnya adalah mencoba menerjemahkan untuk audiens global, tidak spesifik untuk negara, ras, atau wilayah mana pun.

Terakhir, bahasa harus sesuai untuk semua audiens dan usia.

## Terjemahan khusus bahasa {#language-specific-translations}

Saat menerjemahkan, penting untuk mengikuti aturan tata bahasa, konvensi, dan pemformatan, yang digunakan dalam bahasa Anda, bukan menyalin dari sumbernya. Teks sumber mengikuti aturan dan konvensi tata bahasa Inggris, yang tidak berlaku untuk banyak bahasa lain.

Anda harus mengetahui aturan untuk bahasa Anda dan menerjemahkannya sesuai dengan itu. Jika Anda memerlukan bantuan, hubungi kami dan kami akan membantu Anda menemukan beberapa sumber tentang bagaimana elemen-elemen ini harus digunakan dalam bahasa Anda.

Beberapa contoh hal yang harus diperhatikan secara khusus:

### Tanda baca, pemformatan {#punctuation-and-formatting}

**Penggunaan Huruf Besar**

- Ada perbedaan besar dalam penggunaan huruf besar (kapitalisasi) dalam bahasa yang berbeda.
- Dalam bahasa Inggris, adalah umum untuk menggunakan huruf besar semua kata dalam judul dan nama, bulan dan hari, nama bahasa, hari libur, dll. Dalam banyak bahasa lain, ini secara tata bahasa salah, karena mereka memiliki aturan kapitalisasi yang berbeda.
- Beberapa bahasa juga memiliki aturan penggunaan huruf kapital pada kata ganti orang, kata benda, dan kata sifat tertentu, yang tidak menggunakan huruf kapital dalam bahasa Inggris.

**Penggunaan Spasi**

- Aturan ortografi menentukan penggunaan spasi untuk setiap bahasa. Karena spasi digunakan di mana-mana, aturan-aturan ini termasuk yang paling berbeda, dan spasi adalah salah satu elemen yang paling sering diterjemahkan secara salah.
- Beberapa perbedaan umum dalam spasi antara bahasa Inggris dan bahasa lain:
  - Spasi sebelum satuan ukuran dan mata uang (misalnya USD, EUR, kB, MB)
  - Spasi sebelum tanda derajat (misalnya °C, ℉)
  - Spasi sebelum beberapa tanda baca, terutama elipsis (…)
  - Spasi sebelum dan sesudah garis miring (/)

**Daftar**

- Setiap bahasa memiliki seperangkat aturan yang beragam dan kompleks untuk menulis daftar. Ini dapat sangat berbeda dari bahasa Inggris.
- Dalam beberapa bahasa, kata pertama dari setiap baris perlu dikapitalisasi, sedangkan dalam bahasa lainnya, baris baru harus dimulai dengan huruf kecil. Banyak bahasa juga memiliki aturan berbeda tentang kapitalisasi dalam pembuatan daftar, yang tergantung pada panjang setiap baris.
- Hal yang sama berlaku untuk penggunaan tanda baca dari barisan item. Penggunaan tanda baca dalam daftar dapat berupa tanda titik (**.**), koma (**,**), atau titik koma (**;**), tergantung pada bahasanya.

**Tanda kutip**

- Bahasa menggunakan banyak ragam tanda kutip. Hanya menyalin tanda kutip bahasa Inggris dari sumber seringkali bukan hal yang benar.
- Beberapa jenis tanda kutip yang paling umum mencakup:
  - „contoh teks“
  - ‚contoh teks’
  - »contoh teks«
  - “contoh teks”
  - ‘contoh teks’
  - «contoh teks»

**Tanda penghubung dan pisah**

- Dalam bahasa Inggris, tanda penghubung (-) digunakan untuk menggabungkan kata atau bagian kata yang berbeda, sedangkan tanda pisah (–) digunakan untuk menunjukkan jarak atau jeda.
- Banyak bahasa memiliki aturan yang berbeda untuk penggunaan tanda hubung dan pisah yang harus diperhatikan.

### Format {#formats}

**Angka**

- Perbedaan utama untuk penulisan angka dalam berbagai bahasa adalah tanda pisah yang digunakan untuk angka desimal dan ribuan. Untuk angka ribuan, ini dapat berupa titik, koma, atau spasi. Sama halnya untuk desimal, beberapa bahasa menggunakan titik desimal, sedangkan yang lainnya menggunakan tanda koma desimal.
  - Beberapa contoh angka besar:
    - Inggris – **1,000.50**
    - Spanyol – **1.000,50**
    - Prancis – **1 000,50**
- Pertimbangan penting lainnya ketika menerjemahkan angka adalah tanda persen. Itu dapat ditulis dalam cara yang berbeda: **100%**, **100 %**, atau **%100**.
- Terakhir, angka negatif dapat diterjemahkan dengan cara yang berbeda tergantung pada bahasa: -100, 100-, (100), atau [100].

**Tanggal**

- Ketika menerjemahkan tanggal, terdapat sejumlah pertimbangan dan perbedaan tergantung pada bahasanya. Termasuk di dalamnya juga format tanggal, pemisah, kapitalisasi, dan nol depan. Ada juga perbedaan antara tanggal lengkap dan numerik.
  - Beberapa contoh format tanggal yang berbeda:
    - Inggris BR (hh/bb/tttt) – 1st January, 2022
    - Inggris AS (bb/hh/tttt) – 1 Januari 2022
    - Mandarin (tttt-bb-hh) – 2022 年 1 月 1 日
    - Perancis (hh/bb/tttt) – 1er janvier 2022
    - Italia (hh/bb/tttt) – 1º gennaio 2022
    - Jerman (hh/bb/tttt) – 1. Januar 2022

**Mata uang**

- Menerjemahkan mata uang dapat menjadi menyulitkan karena format, konvensi, dan konversi yang berbeda. Sebagai aturan umum, harap terjemahkan mata uang tetap sama seperti sumbernya. Anda dapat menambahkan mata uang dan konversi lokal Anda dalam tanda kurung, untuk mempermudah pembaca.
- Perbedaan utama untuk penulisan mata uang dalam berbagai bahasa mencakup penempatan simbol, koma desimal vs. titik desimal, penempatan spasi, dan singkatan vs. simbol.
  - Penempatan simbol: $100 atau 100$
  - Koma desimal vs. titik desimal: 100,50$ atau 100.50$
  - Penempatan spasi: 100$ atau 100 $
  - Singkatan vs. simbol: 100 $ atau 100 USD

**Satuan ukuran**

- Sebagai aturan umum, harap terjemahkan satuan ukuran sesuai sumbernya. Jika negara Anda menggunakan sistem yang berbeda, Anda dapat memasukkan konversinya dalam kurung.
- Selain pelokalan satuan ukuran, juga penting untuk memperhatikan perbedaan bagaimana bahasa melihat satuan ini. Perbedaan utamanya adalah penempatan spasi antara angka dan satuan, yang dapat berbeda, tergantung pada bahasanya. Contoh untuk ini termasuk 100kB vs. 100 kB atau 50ºF vs. 50 ºF.

## Kesimpulan {#conclusion}

Menerjemahkan ethereum.org adalah kesempatan yang sangat baik untuk belajar tentang aspek yang berbeda dari Ethereum.

Ketika menerjemahkan, cobalah untuk tidak terburu-buru. Bersantailah dan bersenang-senanglah!

Terima kasih telah terlibat dalam Program Penerjemahan dan membantu kami membuat situs web dapat diakses oleh pengguna yang lebih luas. Komunitas Ethereum bersifat global, dan kami senang bahwa Anda menjadi bagian darinya!
