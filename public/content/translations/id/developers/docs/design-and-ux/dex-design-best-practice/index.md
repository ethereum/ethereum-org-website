---
title: Praktik terbaik desain bursa terdesentralisasi (DEX)
description: Panduan yang menjelaskan keputusan UX/UI untuk menukarkan token.
lang: id
---

Sejak peluncuran Uniswap pada tahun 2018, sudah ada ratusan bursa terdesentralisasi yang di luncurkan di lusinan rantai yang berbeda.
Banyak dari ini memperkenalkan elemen baru atau menambahkan sentuhan unik mereka sendiri, tetapi antarmukanya secara umum tetap sama.

Salah satu alasannya adalah [Hukum Jakob](https://lawsofux.com/jakobs-law/):

> Pengguna menghabiskan sebagian besar waktu mereka di situs lain. Ini berarti pengguna lebih suka situs Anda berfungsi dengan cara yang sama seperti situs-situs lain yang sudah mereka ketahui.

Berkat perintis seperti Uniswap, Pancakeswap, dan Sushiswap, pengguna DeFi memiliki gambaran umum tentang seperti apa DEX itu.
Oleh karena itu, konsep seperti "praktik terbaik" sekarang mulai berkembang. Kami melihat semakin banyak keputusan desain yang distandarisasi di setiao lokasi. Kamu bisa melihat evolusi DEX sebagai contoh besar dari pengujian langsung. Hal-hal yang berhasil dipertahankan, hal-hal yang tidak berhasil dibuang. Masih ada ruang untuk kepribadian, tetapi ada standar tertentu yang harus dipenuhi oleh DEX.

Artikel ini adalah ringkasan dari:

- apa yang harus disertakan
- bagaimana membuatnya semaksimal mungkin untuk digunakan
- cara utama untuk menyesuaikan desain

Semua contoh bingkai kawat dibuat secara khusus untuk artikel ini, meskipun semuanya didasarkan pada proyek nyata.

Kit Figma juga disertakan di bagian bawah - silakan gunakan dan percepat rangkakawat Anda sendiri!

## Anatomi dasar sebuah DEX {#basic-anatomy-of-a-dex}

UI pada umumnya berisi tiga elemen:

1. Formulir utama
2. Tombol
3. Bagian terperinci

![Antarmuka DEX generik, menampilkan tiga elemen utama](./1.png)

## Variasi {#variations}

Hal ini akan menjadi tema umum dalam artikel ini, tetapi ada berbagai cara yang berbeda untuk mengatur berbagai elemen ini. "Panel detail" bisa jadi:

- Di atas tombol
- Di bawah tombol
- Tersembunyi dalam panel akordeon
- Dan/atau pada modal “pratinjau”

N.B. Modal "pratinjau" bersifat opsional, tetapi jika Anda hanya menampilkan sedikit detail pada UI utama, modal ini menjadi penting.

## Struktur formulir utama {#structure-of-the-main-form}

Ini adalah kotak di mana Anda benar-benar memilih token mana yang ingin Anda tukar. Komponen ini terdiri atas bidang input dan tombol kecil dalam satu baris.

DEX biasanya menampilkan detail tambahan dalam satu baris di atas dan satu baris di bawah, meskipun ini dapat dikonfigurasi secara berbeda.

![Baris input, dengan baris detail di atas dan di bawah](./2.png)

## Variasi {#variations2}

Dua variasi UI ditampilkan di sini; satu tanpa batas sama sekali, menciptakan desain yang sangat terbuka, dan satu lagi di mana baris input memiliki batas, sehingga menciptakan fokus pada elemen tersebut.

![Dua variasi UI dari formulir utama](./3.png)

Struktur dasar ini memungkinkan **empat informasi** utama ditampilkan dalam desain: satu di setiap sudut. Jika hanya ada satu baris atas/bawah, maka hanya ada dua posisi saja.

Selama evolusi DeFi, banyak hal berbeda telah dimasukkan di sini.

## Informasi kunci yang perlu disertakan {#key-info-to-include}

- Saldo di Dompet
- Tombol perbesar
- Setara Fiat
- Dampak harga pada jumlah yang "diterima"

Pada masa awal DeFi, nilai uang yang setara sering tidak ditampilkan. Jika Anda sedang membangun proyek Web3 apa pun, sangat penting untuk menampilkan nilai setara fiat. Pengguna masih berpikir dalam istilah mata uang lokal, jadi agar sesuai dengan model mental dunia nyata, hal ini harus disertakan.

Pada kolom kedua (yang digunakan untuk memilih token yang ingin ditukar), Anda juga bisa menampilkan price impact di samping jumlah dalam mata uang fiat, dengan menghitung selisih antara jumlah input dan perkiraan jumlah output. Detail ini cukup berguna untuk disertakan.

Tombol persentase (misalnya, 25%, 50%, 75%) dapat menjadi fitur yang berguna, tetapi memakan lebih banyak ruang, menambah lebih banyak ajakan bertindak, dan menambah beban mental. Hal yang sama berlaku untuk slider persentase. Beberapa keputusan UI ini akan bergantung pada merek Anda dan jenis pengguna Anda.

Detail tambahan dapat ditampilkan di bawah formulir utama. Karena jenis informasi ini umumnya ditujukan untuk pengguna profesional, masuk akal untuk:

- menjaganya se-minimal mungkin, atau;
- menyembunyikannya di panel akordeon

![Detail yang ditampilkan di sudut-sudut formulir utama tersebut](./4.png)

## Informasi tambahan yang bisa disertakan {#extra-info-to-include}

- Harga token
- Slippage
- Minimum diterima
- Output yang diharapkan
- Dampak harga
- Perkiraan biaya gas
- Biaya lain
- Pengaturan rute pesanan

Bisa dikatakan, beberapa dari detail ini bisa bersifat opsional.

Order routing memang menarik, tapi bagi sebagian besar pengguna, hal ini tidak terlalu berpengaruh.

Beberapa detail lainnya hanya menyatakan hal yang sama dengan cara berbeda. Misalnya, “minimum diterima” dan “slippage” adalah dua sisi dari hal yang sama. Jika Anda mengatur slippage sebesar 1%, maka jumlah minimum yang bisa Anda terima = output yang diharapkan -1%. Beberapa antarmuka pengguna akan menampilkan jumlah yang diharapkan, jumlah minimum, dan slippage… Ini berguna, tetapi mungkin berlebihan.

Sebagian besar pengguna akan tetap menggunakan pengaturan slippage bawaan.

“Dampak harga” sering ditampilkan dalam tanda kurung di sebelah ekuivalen fiat pada kolom “tujuan”. Ini adalah detail UX yang bagus untuk ditambahkan, tetapi jika sudah ditampilkan di sini, apakah memang perlu ditampilkan lagi di bawah? Kemudian tampilkan lagi di layar pratinjau?

Banyak pengguna (terutama yang melakukan penukaran dalam jumlah kecil) tidak terlalu peduli dengan detail ini; mereka akan langsung memasukkan angka dan menekan tombol tukar.

![Beberapa detail menampilkan hal yang sama](./5.png)

Rincian apa yang akan ditampilkan akan bergantung pada audiens Anda dan kesan apa yang Anda inginkan dari aplikasi tersebut.

Jika Anda menyertakan toleransi slippage di panel detail, Anda juga harus membuatnya dapat diedit langsung dari sini. Ini adalah contoh yang baik dari sebuah “accelerator”; trik UX yang rapi yang dapat mempercepat alur pengguna berpengalaman, tanpa memengaruhi kemudahan penggunaan aplikasi secara umum.

![Slippage dapat dikontrol langsung dari panel detail](./6.png)

Ada baiknya memikirkan dengan cermat bukan hanya satu informasi spesifik di satu layar, tetapi seluruh alur melalui:
Memasukkan angka di Formulir Utama → Memeriksa Detail → Mengklik ke Layar Pratinjau (jika Anda memiliki layar pratinjau).
Apakah panel detail harus selalu terlihat, atau pengguna perlu mengkliknya untuk memperluasnya?
Apakah Anda perlu menambahkan gesekan friction dengan membuat layar pratinjau? Ini memaksa pengguna untuk memperlambat dan mempertimbangkan transaksi mereka, yang bisa sangat berguna. Tetapi, apakah mereka ingin melihat semua informasi yang sama lagi? Apa yang paling berguna bagi mereka pada titik ini?

## Opsi desain {#design-options}

Seperti yang disebutkan, banyak dari ini bergantung pada gaya pribadi Anda.
Siapa pengguna Anda?
Apa merek brand Anda?
Apakah Anda menginginkan antarmuka “pro” yang menampilkan semua detail, atau lebih memilih desain minimalis?
Bahkan jika Anda menargetkan pengguna pro yang menginginkan semua informasi, Anda tetap harus mengingat kata-kata bijak Alan Cooper:

> Seindah atau sekeren apapun antarmuka Anda, akan lebih baik jika jumlahnya lebih sedikit.

### Struktur {#structure}

- Token di sebelah kiri, atau token di sebelah kanan
- 2 atau 3 baris
- detail di atas atau di bawah tombol
- detail diperluas, diminimalkan, atau tidak ditampilkan

### Gaya komponen {#component-style}

- kosong
- bergaris
- terisi

Dari sudut pandang UX murni, gaya antarmuka UI kurang penting dibanding yang Anda kira. Tren visual datang dan pergi secara siklikal, dan banyak preferensi bersifat subjektif.

Cara termudah untuk merasakannya—dan memikirkan berbagai konfigurasi berbeda—adalah dengan melihat beberapa contoh, lalu bereksperimen sendiri.

Kit Figma yang disertakan berisi komponen kosong, berbingkai outlined, dan terisi filled.

Lihat contoh-contoh di bawah ini untuk melihat berbagai cara Anda bisa menggabungkannya:

![3 baris dengan gaya terisi](./7.png)

![3 baris dengan gaya terisi](./8.png)

![2 baris dengan gaya terisi](./9.png)

![3 baris dengan gaya garis luar, lengkap dengan panel detail(./10.png)

![3 baris dengan baris input menggunakan gaya garis luar](./11.png)

![2 Baris dengan gaya terisi](./12.png)

## Tapi disisi mana token itu diletakkan? {#but-which-side-should-the-token-go-on}

Pada akhirnya hal itu mungkin tidak membuat perbedaan besar pada kegunaannya. Namun, ada beberapa hal yang perlu diingat, yang mungkin akan mempengaruhi pilihanmu ke satu arah atau arah lain.

Lumayan menarik untuk melihat bagaimana mode berubah seiring waktu. Uniswap pada awalnya menempatkan token di sebelah kiri, tetapi sejak itu telah memindahkannya ke sebelah kanan. Sushiswap juga melakukan perubahan ini saat pembaruan desain. Sebagian besar, tapi tidak semua, protokol sudah mengikutinya.

Konvensi keuangan secara tradisional menempatkan simbol mata uang sebelum angka, misalnya, $50, €50, £50, tetapi kita _mengatakan_ 50 dolar, 50 Euro, 50 pound.

Untuk pengguna umum - terutama yang membaca dari kiri ke kanan, atas ke bawah - token pada sebelah kanan akan terasa lebih natural.

![Sebuah antarmuka pengguna dengan token di sebelah kiri](./13.png)

Menempatkan token di sebelah kiri dan semua angka di sebelah kanan akan terlihat simetris, yang merupakan nilai tambah, tetapi ada sisi buruk lain dari tata letak ini.

Hukum kedekatan menyatakan bahwa benda-benda yang berdekatan akan dianggap memiliki hubungan. Oleh karena itu, kami ingin menempatkan item terkait berdampingan satu sama lain. Saldo token akan dikaitkan langsung dengan token itu sendiri, dan akan berubah setiap kali token baru dipilih. Oleh karena itu, akan lebih mudah dipahami apabila saldo token berada di sebelah tombol pemilihan token. Bisa juga dipindahkan ke bawah token, tetapi akan merusak tata letak.

Pada akhirnya, akan ada kelebihan dan kekurangan untuk kedua pilihan tersebut, tetapi menariknya adalah bagaimana pendekatan tren cenderung untuk memilih di sebelah kanan.

## Perilaku tombol {#button-behavior}

Jangan menggunakan tombol terpisah untuk Menyetujui. Serta jangan menggunakan klik terpisah untuk Menyetujui. Pengguna ingin melakukan penukaran, jadi cukup tampilkan “tukar” pada tombol dan mulai persetujuan sebagai langkah awal. Sebuah jendela modal dapat menampilkan progres dengan stepper atau notifikasi sederhana seperti “transaksi 1 dari 2 - disetujui”.

![Sebuah antarmuka pengguna dengan tombol terpisah untuk approve dan swap](./14.png)

![Sebuah antarmuka pengguna dengan satu tombol yang bertuliskan approve](./15.png)

### Tombol sebagai bantuan kontekstual {#button-as-contextual-help}

Tombol dapat berfungsi ganda sebagai sebuah peringatan!

Ini sebenarnya adalah pola desain yang tidak biasa di luar Web3, tetapi telah menjadi standar di dalamnya. Ini adalah inovasi yang bagus karena menghemat ruang dan menjaga perhatian tetap terfokus.

Jika aksi utama - SWAP - tidak tersedia karena suatu kesalahan, alasannya dapat dijelaskan melalui tombol, misalnya.:

- ganti jaringan
- hubungkan dompet
- berbagai kesalahan

Tombol juga dapat dipetakan ke tindakan yang perlu dilakukan. Sebagai contoh, jika pengguna tidak dapat melakukan swap karena berada di jaringan yang salah, tombol seharusnya menampilkan tulisan 'switch to Ethereum', dan ketika pengguna mengklik tombol tersebut, jaringan akan berpindah ke Ethereum. Hal ini mempercepat alur pengguna secara signifikan.

![Aksi-aksi utama dijalankan dari CTA utama](./16.png)

![Pesan error ditampilkan di dalam CTA utama](./17.png)

## Buat versi Anda sendiri dengan file Figma ini {#build-your-own-with-this-figma-file}

Berkat kerja keras dari berbagai protokol, desain DEX telah banyak berkembang. Kami tahu informasi apa yang dibutuhkan oleh pengguna, bagaimana kami harus menampilkannya, serta bagaimana membuat alurnya semulus mungkin.
Semoga artikel ini memberikan gambaran yang solid tentang prinsip-prinsip UX.

Jika Anda ingin bereksperimen, silakan gunakan Figma wireframe kit. Ini dibuat sesederhana mungkin, tetapi memiliki cukup fleksibilitas untuk membangun struktur dasar dengan berbagai cara.

[Figma wireframe kit](https://www.figma.com/community/file/1393606680816807382/dex-wireframes-kit)

DeFi akan terus berkembang, dan selalu ada ruang untuk perbaikan.

Semoga beruntung!
