---
title: Praktik terbaik desain pertukaran terdesentralisasi (DEX)
description: Panduan yang menjelaskan keputusan UX/UI untuk menukar token.
lang: id
---

Sejak peluncuran Uniswap pada tahun 2018, telah ada ratusan pertukaran terdesentralisasi yang diluncurkan di puluhan rantai yang berbeda.
Banyak di antaranya memperkenalkan elemen baru atau menambahkan sentuhan mereka sendiri, tetapi antarmukanya secara umum tetap sama.

Salah satu alasannya adalah [Hukum Jakob](https://lawsofux.com/jakobs-law/):

> Pengguna menghabiskan sebagian besar waktu mereka di situs lain. Ini berarti pengguna lebih suka situs Anda berfungsi dengan cara yang sama seperti semua situs lain yang sudah mereka ketahui.

Berkat inovator awal seperti Uniswap, Pancakeswap, dan Sushiswap, pengguna DeFi memiliki gagasan kolektif tentang seperti apa bentuk DEX.
Karena alasan ini, sesuatu seperti "praktik terbaik" kini mulai bermunculan. Kita melihat semakin banyak keputusan desain yang distandarisasi di berbagai situs. Anda dapat melihat evolusi DEX sebagai contoh raksasa dari pengujian secara langsung. Hal-hal yang berhasil dipertahankan, hal-hal yang tidak, dibuang. Masih ada ruang untuk personalitas, tetapi ada standar tertentu yang harus dipatuhi oleh sebuah DEX.

Artikel ini adalah ringkasan dari:
- apa saja yang harus disertakan
- bagaimana membuatnya seberguna mungkin
- cara utama untuk menyesuaikan desain

Semua contoh wireframe dibuat khusus untuk artikel ini, meskipun semuanya didasarkan pada proyek nyata.

Kit Figma juga disertakan di bagian bawah - jangan ragu untuk menggunakannya dan mempercepat pembuatan wireframe Anda sendiri!

## Anatomi dasar DEX {#basic-anatomy-of-a-dex}

UI umumnya berisi tiga elemen:
1. Formulir utama
2. Tombol
3. Panel detail

![UI DEX generik, menampilkan tiga elemen utama](./1.png)


## Variasi {#variations}

Ini akan menjadi tema umum dalam artikel ini, tetapi ada berbagai cara berbeda untuk mengatur elemen-elemen ini. "Panel detail" dapat berada:
- Di atas tombol
- Di bawah tombol
- Tersembunyi di panel akordeon
- Dan/atau pada modal "pratinjau"
  
N.B. Modal "pratinjau" bersifat opsional, tetapi jika Anda menampilkan sangat sedikit detail pada UI utama, ini menjadi penting.

## Struktur formulir utama {#structure-of-the-main-form}

Ini adalah kotak tempat Anda benar-benar memilih token mana yang ingin Anda tukar. Komponen ini terdiri dari bidang input dan tombol kecil dalam satu baris.

DEX biasanya menampilkan detail tambahan dalam satu baris di atas dan satu baris di bawah, meskipun ini dapat dikonfigurasi secara berbeda.

![Baris input, dengan baris detail di atas dan di bawah](./2.png)

## Variasi {#variations2}

Dua variasi UI ditampilkan di sini; satu tanpa batas apa pun, menciptakan desain yang sangat terbuka, dan satu lagi di mana baris input memiliki batas, menciptakan fokus pada elemen tersebut.

![Dua variasi UI dari formulir utama](./3.png)

Struktur dasar ini memungkinkan **empat informasi utama** ditampilkan dalam desain: satu di setiap sudut. Jika hanya ada satu baris atas/bawah, maka hanya ada dua tempat.

Selama evolusi DeFi, banyak hal berbeda telah disertakan di sini.

## Info utama yang harus disertakan {#key-info-to-include}

- Saldo di dompet
- Tombol maks
- Setara fiat
- Dampak harga pada jumlah yang "diterima"

Pada masa awal DeFi, nilai setara fiat sering kali tidak ada. Jika Anda membangun proyek Web3 apa pun, sangat penting untuk menampilkan nilai setara fiat. Pengguna masih berpikir dalam mata uang lokal, jadi untuk mencocokkan model mental dunia nyata, ini harus disertakan.

Pada bidang kedua (tempat Anda memilih token yang akan Anda tukar), Anda juga dapat menyertakan dampak harga di sebelah jumlah mata uang fiat, dengan menghitung selisih antara jumlah input dan perkiraan jumlah output. Ini adalah detail yang cukup berguna untuk disertakan.

Tombol persentase (misalnya, 25%, 50%, 75%) dapat menjadi fitur yang berguna, tetapi memakan lebih banyak ruang, menambahkan lebih banyak ajakan bertindak, dan menambah lebih banyak beban mental. Sama halnya dengan penggeser persentase. Beberapa keputusan UI ini akan bergantung pada merek dan jenis pengguna Anda.

Detail tambahan dapat ditampilkan di bawah formulir utama. Karena jenis info ini sebagian besar untuk pengguna pro, masuk akal untuk:
- menjaganya seminimal mungkin, atau;
- menyembunyikannya di panel akordeon

![Detail ditampilkan di sudut-sudut formulir utama tersebut](./4.png)

## Info tambahan yang harus disertakan {#extra-info-to-include}

- Harga token
- Slippage
- Minimum yang diterima
- Output yang diharapkan
- Dampak harga
- Perkiraan biaya gas
- Biaya lainnya
- Perutean pesanan

Bisa dibilang, beberapa detail ini bisa bersifat opsional.

Perutean pesanan memang menarik, tetapi tidak membuat banyak perbedaan bagi sebagian besar pengguna.

Beberapa detail lainnya hanya menyatakan ulang hal yang sama dengan cara yang berbeda. Misalnya "minimum yang diterima" dan "slippage" adalah dua sisi dari mata uang yang sama. Jika Anda mengatur slippage pada 1%, maka minimum yang dapat Anda harapkan untuk diterima = output yang diharapkan-1%. Beberapa UI akan menampilkan jumlah yang diharapkan, jumlah minimum, dan slippage… Yang mana berguna tetapi mungkin berlebihan. 

Sebagian besar pengguna akan membiarkan slippage default apa adanya.

"Dampak harga" sering ditampilkan dalam tanda kurung di sebelah setara fiat di bidang "ke". Ini adalah detail UX yang bagus untuk ditambahkan, tetapi jika ditampilkan di sini, apakah benar-benar perlu ditampilkan lagi di bawah? Dan kemudian lagi di layar pratinjau?

Banyak pengguna (terutama mereka yang menukar dalam jumlah kecil) tidak akan peduli dengan detail ini; mereka hanya akan memasukkan angka dan menekan tukar.

![Beberapa detail menunjukkan hal yang sama](./5.png)

Detail apa yang ditampilkan akan bergantung pada audiens Anda dan nuansa apa yang Anda inginkan untuk aplikasi tersebut.

Jika Anda menyertakan toleransi slippage di panel detail, Anda juga harus membuatnya dapat diedit langsung dari sini. Ini adalah contoh yang baik dari "akselerator"; trik UX rapi yang dapat mempercepat alur pengguna berpengalaman, tanpa memengaruhi kegunaan umum aplikasi.

![Slippage dapat dikontrol dari panel detail](./6.png)

Ada baiknya untuk memikirkan dengan cermat tidak hanya tentang satu informasi spesifik di satu layar, tetapi tentang seluruh alur:
Memasukkan angka di Formulir Utama → Memindai Detail → Mengklik ke Layar Pratinjau (jika Anda memiliki layar pratinjau). 
Apakah panel detail harus terlihat setiap saat, atau apakah pengguna perlu mengkliknya untuk memperluas?
Haruskah Anda menciptakan friksi dengan menambahkan layar pratinjau? Ini memaksa pengguna untuk melambat dan mempertimbangkan perdagangan mereka, yang bisa berguna. Tetapi apakah mereka ingin melihat semua info yang sama lagi? Apa yang paling berguna bagi mereka pada saat ini?

## Opsi desain {#design-options}

Seperti yang disebutkan, banyak dari hal ini bermuara pada gaya pribadi Anda
Siapa pengguna Anda?
Apa merek Anda?
Apakah Anda menginginkan antarmuka "pro" yang menampilkan setiap detail, atau apakah Anda ingin menjadi minimalis?
Bahkan jika Anda menargetkan pengguna pro yang menginginkan semua info yang memungkinkan, Anda tetap harus mengingat kata-kata bijak Alan Cooper:

> Tidak peduli seberapa indah, tidak peduli seberapa keren antarmuka Anda, akan lebih baik jika ada lebih sedikit dari itu.

### Struktur {#structure}

- token di kiri, atau token di kanan
- 2 baris atau 3
- detail di atas atau di bawah tombol
- detail diperluas, diminimalkan, atau tidak ditampilkan

### Gaya komponen {#component-style}

- kosong
- bergaris luar
- terisi

Dari sudut pandang UX murni, gaya UI tidak sepenting yang Anda pikirkan. Tren visual datang dan pergi dalam siklus, dan banyak preferensi bersifat subjektif.

Cara termudah untuk merasakannya - dan memikirkan berbagai konfigurasi yang berbeda - adalah dengan melihat beberapa contoh dan kemudian melakukan beberapa eksperimen sendiri.

Kit Figma yang disertakan berisi komponen kosong, bergaris luar, dan terisi.

Lihatlah contoh-contoh di bawah ini untuk melihat berbagai cara Anda dapat menyatukan semuanya:

![3 baris dalam gaya terisi](./7.png)

![3 baris dalam gaya bergaris luar](./8.png)

![2 baris dalam gaya kosong](./9.png)

![3 baris dalam gaya bergaris luar, dengan panel detail](./10.png)

![3 baris dengan baris input dalam gaya bergaris luar](./11.png)

![2 baris dalam gaya terisi](./12.png)

## Tetapi di sisi mana token harus diletakkan? {#but-which-side-should-the-token-go-on}

Intinya adalah bahwa hal itu mungkin tidak membuat perbedaan besar pada kegunaan. Namun, ada beberapa hal yang perlu diingat, yang mungkin memengaruhi Anda ke satu arah atau yang lain.

Cukup menarik melihat tren berubah seiring waktu. Uniswap awalnya menempatkan token di sebelah kiri, tetapi sejak itu memindahkannya ke kanan. Sushiswap juga melakukan perubahan ini selama peningkatan desain. Sebagian besar, tetapi tidak semua, protokol telah mengikutinya.

Konvensi keuangan secara tradisional menempatkan simbol mata uang sebelum angka, misalnya, $50, €50, £50, tetapi kita *mengucapkan* 50 dolar, 50 Euro, 50 pound.

Bagi pengguna umum - terutama seseorang yang membaca dari kiri ke kanan, atas ke bawah - token di sebelah kanan mungkin terasa lebih alami.

![UI dengan token di sebelah kiri](./13.png)

Menempatkan token di sebelah kiri dan semua angka di sebelah kanan terlihat simetris dan menyenangkan, yang merupakan nilai tambah, tetapi ada kelemahan lain pada tata letak ini.

Hukum kedekatan menyatakan bahwa item yang berdekatan dianggap saling terkait. Oleh karena itu, kita ingin menempatkan item yang terkait bersebelahan. Saldo token terkait langsung dengan token itu sendiri, dan akan berubah setiap kali token baru dipilih. Oleh karena itu, sedikit lebih masuk akal jika saldo token berada di sebelah tombol pilih token. Itu bisa dipindahkan ke bawah token, tetapi itu merusak simetri tata letak.

Pada akhirnya, ada nilai plus dan minus untuk kedua opsi tersebut, tetapi menarik bagaimana tren tampaknya mengarah ke token di sebelah kanan.

## Perilaku tombol {#button-behavior}

Jangan memiliki tombol terpisah untuk Setujui. Juga jangan memiliki klik terpisah untuk Setujui. Pengguna ingin Menukar, jadi cukup katakan "tukar" pada tombol dan mulai persetujuan sebagai langkah pertama. Modal dapat menunjukkan kemajuan dengan stepper, atau pemberitahuan sederhana "tx 1 dari 2 - menyetujui".

![UI dengan tombol terpisah untuk menyetujui dan menukar](./14.png)

![UI dengan satu tombol yang bertuliskan setujui](./15.png)

### Tombol sebagai bantuan kontekstual {#button-as-contextual-help}

Tombol dapat melakukan tugas ganda sebagai peringatan!

Ini sebenarnya adalah pola desain yang cukup tidak biasa di luar Web3, tetapi telah menjadi standar di dalamnya. Ini adalah inovasi yang baik karena menghemat ruang, dan menjaga perhatian tetap fokus.

Jika tindakan utama - TUKAR - tidak tersedia karena kesalahan, alasannya dapat dijelaskan dengan tombol, misalnya:

- ganti jaringan
- hubungkan dompet
- berbagai kesalahan

Tombol juga dapat **dipetakan ke tindakan** yang perlu dilakukan. Misalnya, jika pengguna tidak dapat menukar karena mereka berada di jaringan yang salah, tombol tersebut harus bertuliskan "beralih ke Ethereum", dan ketika pengguna mengklik tombol tersebut, itu harus mengalihkan jaringan ke Ethereum. Ini mempercepat alur pengguna secara signifikan.

![Tindakan utama yang dimulai dari CTA utama](./16.png)

![Pesan kesalahan ditampilkan di dalam CTA utama](./17.png)

## Bangun milik Anda sendiri dengan file figma ini {#build-your-own-with-this-figma-file}

Berkat kerja keras dari berbagai protokol, desain DEX telah banyak meningkat. Kita tahu info apa yang dibutuhkan pengguna, bagaimana kita harus menampilkannya, dan bagaimana membuat alurnya semulus mungkin.
Semoga artikel ini memberikan gambaran umum yang kuat tentang prinsip-prinsip UX. 

Jika Anda ingin bereksperimen, jangan ragu untuk menggunakan kit wireframe Figma. Ini dibuat sesederhana mungkin, tetapi memiliki fleksibilitas yang cukup untuk membangun struktur dasar dengan berbagai cara.

[Kit wireframe Figma](https://www.figma.com/community/file/1393606680816807382/dex-wireframes-kit)

DeFi akan terus berkembang, dan selalu ada ruang untuk perbaikan. 

Semoga berhasil!