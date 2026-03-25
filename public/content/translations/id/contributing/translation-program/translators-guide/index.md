---
title: Panduan penerjemah
lang: id
description: Instruksi dan kiat untuk penerjemah ethereum.org
---

# Panduan Gaya Terjemahan Ethereum.org {#style-guide}

Panduan gaya terjemahan ethereum.org berisi beberapa pedoman, instruksi, dan kiat paling penting untuk penerjemah, yang membantu kami melokalkan situs web ini.

Dokumen ini berfungsi sebagai panduan umum dan tidak spesifik untuk satu bahasa tertentu.

Jika Anda memiliki pertanyaan, saran, atau umpan balik, jangan ragu untuk menghubungi kami di translations@ethereum.org, kirim pesan ke @ethdotorg di Crowdin, atau [bergabung dengan Discord kami](https://discord.gg/ethereum-org), di mana Anda dapat mengirim pesan kepada kami di saluran #translations atau menghubungi salah satu anggota tim.

## Menggunakan Crowdin {#using-crowdin}

Anda dapat menemukan instruksi dasar tentang cara bergabung dengan proyek di Crowdin dan cara menggunakan editor online Crowdin di [halaman Program Terjemahan](/contributing/translation-program/#how-to-translate).

Jika Anda ingin mempelajari lebih lanjut tentang Crowdin dan menggunakan beberapa fitur lanjutannya, [basis pengetahuan Crowdin](https://support.crowdin.com/online-editor/) berisi banyak panduan mendalam dan gambaran umum tentang semua fungsionalitas Crowdin.

## Menangkap esensi pesan {#capturing-the-essence}

Saat menerjemahkan konten ethereum.org, hindari terjemahan harfiah.

Penting agar terjemahan menangkap esensi pesan. Ini bisa berarti menyusun ulang frasa tertentu, atau menggunakan terjemahan deskriptif alih-alih menerjemahkan konten kata demi kata.

Bahasa yang berbeda memiliki aturan tata bahasa, konvensi, dan urutan kata yang berbeda. Saat menerjemahkan, harap perhatikan bagaimana kalimat disusun dalam bahasa target, dan hindari menerjemahkan sumber bahasa Inggris secara harfiah, karena ini dapat menyebabkan struktur kalimat dan keterbacaan yang buruk.

Alih-alih menerjemahkan teks sumber kata demi kata, disarankan agar Anda membaca seluruh kalimat dan mengadaptasinya agar sesuai dengan konvensi bahasa target.

## Formal vs. informal {#formal-vs-informal}

Kami menggunakan bentuk sapaan formal, yang selalu sopan dan pantas untuk semua pengunjung.

Menggunakan sapaan formal memungkinkan kami menghindari kesan tidak resmi atau menyinggung, dan berfungsi tanpa memandang usia dan jenis kelamin pengunjung.

Sebagian besar bahasa Indo-Eropa dan Afro-Asia menggunakan kata ganti orang kedua yang spesifik gender, yang membedakan antara laki-laki dan perempuan. Saat menyapa pengguna atau menggunakan kata ganti kepemilikan, kita dapat menghindari asumsi gender pengunjung, karena bentuk sapaan formal umumnya berlaku dan konsisten, terlepas dari bagaimana mereka mengidentifikasi diri.

## Kosakata dan makna yang sederhana dan jelas {#simple-vocabulary}

Tujuan kami adalah membuat konten di situs web dapat dipahami oleh sebanyak mungkin orang.

Dalam kebanyakan kasus, ini dapat dengan mudah dicapai dengan menggunakan kata-kata pendek dan sederhana yang mudah dipahami. Jika ada beberapa kemungkinan terjemahan untuk kata tertentu dalam bahasa Anda dengan arti yang sama, opsi terbaik paling sering adalah kata terpendek yang dengan jelas mencerminkan maknanya.

## Sistem penulisan {#writing-system}

Ethereum.org tersedia dalam sejumlah bahasa, menggunakan sistem penulisan alternatif (atau aksara penulisan) selain Latin.

Semua konten harus diterjemahkan menggunakan sistem penulisan yang benar untuk bahasa Anda, dan tidak boleh menyertakan kata apa pun, yang ditulis menggunakan karakter Latin.

Saat menerjemahkan konten, Anda harus memastikan bahwa terjemahannya konsisten dan tidak menyertakan karakter Latin apa pun.

Kesalahpahaman yang umum adalah bahwa Ethereum harus selalu ditulis dalam huruf Latin. Ini sebagian besar tidak benar, harap gunakan ejaan Ethereum, asli bahasa Anda (misalnya, 以太坊 dalam bahasa Mandarin, إيثيريوم dalam bahasa Arab, dll.).

**Hal di atas tidak berlaku untuk bahasa, di mana nama diri tidak boleh diterjemahkan sebagai aturan.**

## Menerjemahkan metadata halaman {#translating-metadata}

Beberapa halaman berisi metadata di halaman, seperti 'title', 'lang', 'description', 'sidebar', dll.

Kami menyembunyikan konten yang tidak boleh diterjemahkan oleh penerjemah saat mengunggah halaman baru ke Crowdin, yang berarti bahwa semua metadata yang terlihat oleh penerjemah di Crowdin harus diterjemahkan.

Harap sangat berhati-hati saat menerjemahkan string apa pun di mana teks sumbernya adalah 'en'. Ini mewakili bahasa ketersediaan halaman dan harus diterjemahkan ke [kode bahasa ISO untuk bahasa Anda](https://www.andiamo.co.uk/resources/iso-language-codes/). String ini harus selalu diterjemahkan menggunakan karakter Latin, bukan aksara penulisan, asli bahasa target.

Jika Anda tidak yakin kode bahasa mana yang akan digunakan, Anda dapat memeriksa memori terjemahan di Crowdin atau menemukan kode bahasa untuk bahasa Anda di URL halaman di editor online Crowdin.

Beberapa contoh kode bahasa untuk bahasa yang paling banyak digunakan:

- Arab - ar
- Mandarin Sederhana - zh
- Prancis - fr
- Hindi - hi
- Spanyol - es

## Judul artikel eksternal {#external-articles}

Beberapa string berisi judul artikel eksternal. Sebagian besar halaman dokumentasi pengembang kami berisi tautan ke artikel eksternal untuk bacaan lebih lanjut. String yang berisi judul artikel perlu diterjemahkan, terlepas dari bahasa artikel tersebut, untuk memastikan pengalaman pengguna yang lebih konsisten bagi pengunjung yang melihat halaman dalam bahasa mereka.

Anda dapat menemukan beberapa contoh seperti apa string ini bagi penerjemah dan cara mengidentifikasinya di bawah ini (tautan ke artikel sebagian besar dapat ditemukan di bagian bawah halaman ini, di bagian 'Bacaan lebih lanjut'):

![Article titles in sidebar.png](./article-titles-in-sidebar.png)
![Article titles in editor.png](./article-titles-in-editor.png)

## Peringatan Crowdin {#crowdin-warnings}

Crowdin memiliki fitur bawaan yang memperingatkan penerjemah ketika mereka akan membuat kesalahan. Crowdin akan secara otomatis memperingatkan Anda tentang hal ini sebelum menyimpan terjemahan Anda jika Anda lupa menyertakan tag dari sumber, menerjemahkan elemen yang tidak boleh diterjemahkan, menambahkan beberapa spasi berturut-turut, melupakan tanda baca akhir, dll.
Jika Anda melihat peringatan seperti ini, harap kembali dan periksa ulang terjemahan yang disarankan.

**Jangan pernah mengabaikan peringatan ini, karena biasanya berarti ada yang salah, atau terjemahan tersebut kehilangan bagian penting dari teks sumber.**

Contoh peringatan Crowdin ketika Anda lupa menambahkan tag ke terjemahan Anda:
![Example of a Crowdin warning](./crowdin-warning-example.png)

## Menangani tag dan cuplikan kode {#dealing-with-tags}

Banyak konten sumber berisi tag dan variabel, yang disorot dengan warna kuning di editor Crowdin. Ini melayani fungsi yang berbeda dan harus didekati dengan benar.

**Pengaturan Crowdin**

Untuk mempermudah pengelolaan tag dan menyalinnya langsung dari sumber, kami menyarankan untuk mengubah pengaturan Anda di editor Crowdin.

1. Buka pengaturan
   ![How to open settings in the editor](./editor-settings.png)

2. Gulir ke bawah ke bagian 'HTML tags displaying'

3. Pilih 'Hide'
   ![Please select 'Hide'](./hide-tags.png)

4. Klik 'Save'

Dengan memilih opsi ini, teks tag lengkap tidak akan ditampilkan lagi, dan akan diganti dengan angka.
Saat menerjemahkan, mengklik tag ini akan secara otomatis menyalin tag yang tepat ke bidang terjemahan.

**Tautan**

Anda mungkin memperhatikan tautan lengkap ke halaman di ethereum.org atau situs web lain.

Ini harus identik dengan sumber dan tidak diubah atau diterjemahkan. Jika Anda menerjemahkan tautan atau mengubahnya dengan cara apa pun, bahkan hanya menghapus sebagian darinya, seperti garis miring (/), ini akan menyebabkan tautan rusak dan tidak dapat digunakan.

Cara terbaik untuk menangani tautan adalah dengan menyalinnya langsung dari sumber, baik dengan mengkliknya atau menggunakan tombol ‘Copy Source’ (Alt+C).

![Example of link.png](./example-of-link.png)

Tautan juga muncul dalam teks sumber dalam bentuk tag (yaitu, `<0>` `</0>`). Jika Anda mengarahkan kursor ke tag, editor akan menampilkan konten lengkapnya - terkadang tag ini akan mewakili tautan.

Sangat penting untuk menyalin tautan dari sumber dan tidak mengubah urutannya.

Jika urutan tag diubah, tautan yang diwakilinya akan rusak.

![Example of links inside tags.png](./example-of-links-inside-tags.png)

**Tag dan variabel**

Teks sumber berisi banyak jenis tag yang berbeda, yang harus selalu disalin dari sumber dan tidak pernah diubah. Sama seperti di atas, urutan tag ini dalam terjemahan juga harus tetap sama dengan sumbernya.

Tag selalu berisi tag pembuka dan penutup. Dalam kebanyakan kasus, teks di antara tag pembuka dan penutup harus diterjemahkan.

Contoh: `<strong x-id="1">`Desentralisasi`</strong>`

`<strong x-id="1">` - _Tag pembuka yang membuat teks menjadi tebal_

Desentralisasi - _Teks yang dapat diterjemahkan_

`</strong>` - _Tag penutup_

![Example of 'strong' tags.png](./example-of-strong-tags.png)

Cuplikan kode harus didekati sedikit berbeda dari tag lainnya, karena berisi kode yang tidak boleh diterjemahkan.

Contoh: `<code>`nonce`</code>`

`<code>` - _Tag pembuka, yang berisi cuplikan kode_

nonce - _Teks yang tidak dapat diterjemahkan_

`</code>` - _Tag penutup_

![Example of code snippets.png](./example-of-code-snippets.png)

Teks sumber juga berisi tag yang dipersingkat, yang hanya berisi angka, yang berarti fungsinya tidak langsung terlihat. Anda dapat mengarahkan kursor ke tag ini untuk melihat dengan tepat fungsi apa yang mereka layani.

Dalam contoh di bawah ini, Anda dapat melihat bahwa mengarahkan kursor ke tag `<0>` menunjukkan bahwa itu mewakili `<code>` dan berisi cuplikan kode, oleh karena itu konten di dalam tag ini tidak boleh diterjemahkan.

![Example of ambiguous tags.png](./example-of-ambiguous-tags.png)

## Bentuk pendek vs. penuh/singkatan {#short-vs-full-forms}

Ada banyak singkatan yang digunakan di situs web, misalnya, dapps, NFT, DAO, DeFi, dll. Singkatan ini umum digunakan dalam bahasa Inggris dan sebagian besar pengunjung situs web sudah tidak asing lagi dengannya.

Karena biasanya tidak memiliki terjemahan yang mapan dalam bahasa lain, cara terbaik untuk mendekati istilah ini dan istilah serupa adalah dengan memberikan terjemahan deskriptif dari bentuk lengkapnya, dan menambahkan singkatan bahasa Inggris dalam tanda kurung.

Jangan menerjemahkan singkatan ini, karena kebanyakan orang tidak akan terbiasa dengannya, dan versi yang dilokalkan tidak akan masuk akal bagi sebagian besar pengunjung.

Contoh cara menerjemahkan dapps:

- Aplikasi terdesentralisasi (dapps) → _Bentuk lengkap yang diterjemahkan (singkatan bahasa Inggris dalam tanda kurung)_

## Istilah tanpa terjemahan yang mapan {#terms-without-established-translations}

Beberapa istilah mungkin tidak memiliki terjemahan yang mapan dalam bahasa lain, dan dikenal luas dengan istilah bahasa Inggris aslinya. Istilah-istilah tersebut sebagian besar mencakup konsep-konsep yang lebih baru, seperti proof-of-work, proof-of-stake, beacon chain, mengunci, dll.

Meskipun menerjemahkan istilah-istilah ini bisa terdengar tidak wajar, karena versi bahasa Inggris juga umum digunakan dalam bahasa lain, sangat disarankan agar istilah-istilah tersebut diterjemahkan.

Saat menerjemahkannya, jangan ragu untuk berkreasi, gunakan terjemahan deskriptif, atau cukup terjemahkan secara harfiah.

**Alasan mengapa sebagian besar istilah harus diterjemahkan, alih-alih membiarkan beberapa dalam bahasa Inggris, adalah fakta bahwa terminologi baru ini akan menjadi lebih luas di masa depan, seiring semakin banyak orang mulai menggunakan Ethereum dan teknologi terkait. Jika kita ingin mengajak lebih banyak orang dari seluruh dunia ke ruang ini, kita perlu menyediakan terminologi yang dapat dipahami dalam sebanyak mungkin bahasa, bahkan jika kita perlu membuatnya sendiri.**

## Tombol & CTA {#buttons-and-ctas}

Situs web ini berisi banyak tombol, yang harus diterjemahkan secara berbeda dari konten lainnya.

Teks tombol dapat diidentifikasi dengan melihat tangkapan layar konteks, yang terhubung dengan sebagian besar string, atau dengan memeriksa konteks di editor, yang menyertakan frasa ‘’button’’.

Terjemahan untuk tombol harus sesingkat mungkin, untuk mencegah ketidaksesuaian format. Selain itu, terjemahan tombol harus bersifat imperatif, yaitu menyajikan perintah atau permintaan.

![How to find a button.png](./how-to-find-a-button.png)

## Menerjemahkan untuk inklusivitas {#translating-for-inclusivity}

Pengunjung Ethereum.org berasal dari seluruh dunia dan dari berbagai latar belakang. Oleh karena itu, bahasa di situs web harus netral, menyambut semua orang, dan tidak eksklusif.

Aspek penting dari hal ini adalah netralitas gender. Ini dapat dengan mudah dicapai dengan menggunakan bentuk sapaan formal, dan menghindari kata-kata spesifik gender dalam terjemahan.

Bentuk inklusivitas lainnya adalah mencoba menerjemahkan untuk audiens global, tidak spesifik untuk negara, ras, atau wilayah mana pun.

Terakhir, bahasa harus sesuai untuk semua audiens dan usia.

## Terjemahan spesifik bahasa {#language-specific-translations}

Saat menerjemahkan, penting untuk mengikuti aturan tata bahasa, konvensi, dan format, yang digunakan dalam bahasa Anda, alih-alih menyalin dari sumbernya. Teks sumber mengikuti aturan dan konvensi tata bahasa Inggris, yang tidak berlaku untuk banyak bahasa lain.

Anda harus menyadari aturan untuk bahasa Anda dan menerjemahkannya dengan sesuai. Jika Anda butuh bantuan, hubungi kami dan kami akan membantu Anda menemukan beberapa sumber daya tentang bagaimana elemen-elemen ini harus digunakan dalam bahasa Anda.

Beberapa contoh hal yang perlu diperhatikan secara khusus:

### Tanda baca, format {#punctuation-and-formatting}

**Kapitalisasi**

- Ada perbedaan besar dalam kapitalisasi di berbagai bahasa.
- Dalam bahasa Inggris, umum untuk menggunakan huruf kapital pada semua kata dalam judul dan nama, bulan dan hari, nama bahasa, hari libur, dll. Dalam banyak bahasa lain, ini secara tata bahasa tidak benar, karena mereka memiliki aturan kapitalisasi yang berbeda.
- Beberapa bahasa juga memiliki aturan tentang kapitalisasi kata ganti orang, kata benda, dan kata sifat tertentu, yang tidak dikapitalisasi dalam bahasa Inggris.

**Spasi**

- Aturan ortografi menentukan penggunaan spasi untuk setiap bahasa. Karena spasi digunakan di mana-mana, aturan ini adalah beberapa yang paling berbeda, dan spasi adalah beberapa elemen yang paling sering salah diterjemahkan.
- Beberapa perbedaan umum dalam spasi antara bahasa Inggris dan bahasa lain:
  - Spasi sebelum satuan ukuran dan mata uang (misalnya, USD, EUR, kB, MB)
  - Spasi sebelum tanda derajat (misalnya, °C, ℉)
  - Spasi sebelum beberapa tanda baca, terutama elipsis (…)
  - Spasi sebelum dan sesudah garis miring (/)

**Daftar**

- Setiap bahasa memiliki serangkaian aturan yang beragam dan kompleks untuk menulis daftar. Ini bisa sangat berbeda dengan bahasa Inggris.
- Dalam beberapa bahasa, kata pertama dari setiap baris baru perlu dikapitalisasi, sementara di bahasa lain, baris baru harus dimulai dengan huruf kecil. Banyak bahasa juga memiliki aturan berbeda tentang kapitalisasi dalam daftar, tergantung pada panjang setiap baris.
- Hal yang sama berlaku untuk tanda baca item baris. Tanda baca akhir dalam daftar bisa berupa titik (**.**), koma (**,**), atau titik koma (**;**), tergantung pada bahasanya.

**Tanda kutip**

- Bahasa menggunakan banyak tanda kutip yang berbeda. Sekadar menyalin tanda kutip bahasa Inggris dari sumber sering kali tidak benar.
- Beberapa jenis tanda kutip yang paling umum meliputi:
  - „example text“
  - ‚example text’
  - »example text«
  - “example text”
  - ‘example text’
  - «example text»

**Tanda hubung dan tanda pisah**

- Dalam bahasa Inggris, tanda hubung (-) digunakan untuk menggabungkan kata atau bagian kata yang berbeda, sedangkan tanda pisah (–) digunakan untuk menunjukkan rentang atau jeda.
- Banyak bahasa memiliki aturan berbeda untuk menggunakan tanda hubung dan tanda pisah yang harus diperhatikan.

### Format {#formats}

**Angka**

- Perbedaan utama dalam penulisan angka dalam berbagai bahasa adalah pemisah yang digunakan untuk desimal dan ribuan. Untuk ribuan, ini bisa berupa titik, koma, atau spasi. Demikian pula, beberapa bahasa menggunakan titik desimal, sementara yang lain menggunakan koma desimal.
  - Beberapa contoh angka besar:
    - Inggris – **1,000.50**
    - Spanyol – **1.000,50**
    - Prancis – **1 000,50**
- Pertimbangan penting lainnya saat menerjemahkan angka adalah tanda persen. Ini dapat ditulis dengan cara yang berbeda: **100%**, **100 %** atau **%100**.
- Terakhir, angka negatif dapat ditampilkan secara berbeda, tergantung pada bahasanya: -100, 100-, (100) atau [100].

**Tanggal**

- Saat menerjemahkan tanggal, ada sejumlah pertimbangan dan perbedaan berdasarkan bahasa. Ini termasuk format tanggal, pemisah, kapitalisasi, dan angka nol di depan. Ada juga perbedaan antara tanggal lengkap dan numerik.
  - Beberapa contoh format tanggal yang berbeda:
    - Inggris UK (hh/bb/tttt) – 1st January, 2022
    - Inggris AS (bb/hh/tttt) – January 1st, 2022
    - Mandarin (tttt-bb-hh) – 2022 年 1 月 1 日
    - Prancis (hh/bb/tttt) – 1er janvier 2022
    - Italia (hh/bb/tttt) – 1º gennaio 2022
    - Jerman (hh/bb/tttt) – 1. Januar 2022

**Mata uang**

- Menerjemahkan mata uang bisa menjadi tantangan, karena format, konvensi, dan konversi yang berbeda. Sebagai aturan umum, harap pertahankan mata uang sama dengan sumbernya. Anda dapat menambahkan mata uang lokal dan konversi Anda dalam tanda kurung, untuk kepentingan pembaca.
- Perbedaan utama dalam penulisan mata uang dalam berbagai bahasa meliputi penempatan simbol, koma desimal vs. titik desimal, spasi, dan singkatan vs. simbol.
  - Penempatan simbol: $100 atau 100$
  - Koma desimal vs. titik desimal: 100,50$ atau 100.50$
  - Spasi: 100$ atau 100 $
  - Singkatan vs. simbol: 100 $ atau 100 USD

**Satuan ukuran**

- Sebagai aturan umum, harap pertahankan satuan ukuran sesuai sumbernya. Jika negara Anda menggunakan sistem yang berbeda, Anda dapat menyertakan konversi dalam tanda kurung.
- Selain pelokalan satuan ukuran, penting juga untuk mencatat perbedaan dalam bagaimana bahasa mendekati satuan ini. Perbedaan utamanya adalah spasi antara angka dan satuan, yang bisa berbeda, berdasarkan bahasanya. Contohnya termasuk 100kB vs. 100 kB atau 50ºF vs. 50 ºF.

## Kesimpulan {#conclusion}

Menerjemahkan ethereum.org adalah kesempatan bagus untuk belajar tentang berbagai aspek Ethereum.

Saat menerjemahkan, cobalah untuk tidak terburu-buru. Santai saja dan bersenang-senanglah!

Terima kasih telah terlibat dengan Program Terjemahan dan membantu kami membuat situs web dapat diakses oleh audiens yang lebih luas. Komunitas Ethereum bersifat global, dan kami senang Anda menjadi bagian darinya!