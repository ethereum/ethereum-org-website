---
title: Cara mencabut akses smart contract ke dana kripto anda
description: Panduan cara mencabut akses token kontrak pintar yang eksploitatif
lang: id
---

# Cara mencabut akses smart contract ke dana kripto anda

Panduan ini akan mengajarkan Anda cara melihat daftar semua kontrak pintar yang sudah Anda izinkan untuk mengakses dana Anda dan cara membatalkannya.

Terkadang pengembang jahat membangun pintu belakang ke dalam kontrak pintar yang memungkinkan akses ke dana pengguna yang tidak sadar yang berinteraksi dengan kontrak pintar. Yang sering terjadi adalah platform semacam itu meminta izin kepada pengguna untuk membelanjakan **jumlah token yang tidak terbatas** dalam upaya untuk menghemat sejumlah kecil gas di masa depan, tetapi hal ini memiliki risiko yang lebih besar.

Setelah sebuah platform memiliki hak akses tak terbatas ke token di dompet Anda, mereka dapat membelanjakan semua token tersebut meskipun Anda telah menarik dana Anda dari platform mereka ke dalam dompet Anda. Pelaku kejahatan masih dapat mengakses dana Anda dan menariknya ke dalam dompet mereka tanpa ada opsi pemulihan untuk Anda.

Satu-satunya perlindungan adalah menahan diri untuk tidak menggunakan proyek baru yang belum teruji, hanya menyetujui apa yang Anda perlukan, atau secara teratur mencabut akses. Jadi, bagaimana Anda melakukannya?

## Langkah 1: Gunakan perangkat pencabutan akses

Beberapa situs web memungkinkan Anda untuk melihat dan mencabut kontrak pintar yang terhubung ke alamat Anda. Kunjungi situs web dan hubungkan dompet Anda:

- [Ethallowance](https://ethallowance.com/) (Ethereum)
- [Etherscan](https://etherscan.io/tokenapprovalchecker) (Ethereum)
- [Cointool](https://cointool.app/approve/eth) (beberapa jaringan)
- [Pencabutan](https://revoke.cash/) (beberapa jaringan)
- [Unrekt](https://app.unrekt.net/) (beberapa jaringan)
- [EverRevoke](https://everrise.com/everrevoke/) (beberapa jaringan)

## Langkah 2: Hubungkan dompet Anda

Setelah Anda berada di situs web, klik "Hubungkan dompet". Situs web akan meminta Anda untuk menghubungkan dompet.

Pastikan Anda menggunakan jaringan yang sama di dompet dan situs web Anda. Anda hanya akan melihat kontrak pintar yang terkait dengan jaringan yang dipilih. Sebagai contoh, jika Anda terhubung ke Jaringan Utama Ethereum, Anda hanya akan melihat kontrak Ethereum, bukan kontrak dari rantai lain seperti Polygon.

## Langkah 3: Pilih kontrak pintar yang ingin Anda cabut

Anda harus melihat semua kontrak yang diizinkan mengakses token Anda dan batas pengeluarannya. Temukan yang ingin Anda hentikan.

Jika Anda tidak tahu kontrak mana yang harus dipilih, Anda dapat mencabut semuanya. Ini tidak akan menimbulkan masalah bagi Anda, tetapi Anda harus memberikan serangkaian izin baru saat berikutnya Anda berinteraksi dengan salah satu kontrak ini.

## Langkah 4: Cabut akses ke dana Anda

Setelah mengklik cabut, Anda akan melihat saran transaksi baru di dompet Anda. Hal ini sudah bisa diduga. Anda harus membayar biaya agar pembatalan berhasil. Tergantung pada jaringan, hal ini dapat memakan waktu dari satu menit hingga beberapa menit untuk diproses.

Kami menyarankan Anda untuk menyegarkan alat pencabutan setelah beberapa menit dan menghubungkan dompet Anda lagi untuk memeriksa apakah kontrak yang dicabut sudah hilang dari daftar.

<mark>Kami menyarankan Anda untuk tidak pernah mengizinkan proyek memiliki akses tanpa batas ke token Anda dan mencabut semua akses token secara teratur. Mencabut akses token tidak akan pernah mengakibatkan hilangnya dana, terutama jika Anda menggunakan perangkat yang tercantum di atas.</mark>

 <br />

<InfoBanner shouldSpaceBetween emoji=":eyes:">
  <div>Ingin mempelajari selengkapnya?</div>
  <ButtonLink href="/guides/">
    Lihat panduan lainnya
  </ButtonLink>
</InfoBanner>

## Pertanyaan yang sering diajukan

### Apakah mencabut akses token juga menghentikan penaruhang, pooling, pemberian pinjaman, dll?

Tidak, ini tidak akan memengaruhi strategi DeFi Anda. Anda akan tetap berada di posisi Anda dan terus mendapatkan hadiah, dll.

### Apakah memutuskan dompet dari sebuah proyek sama dengan menghapus izin untuk menggunakan dana saya?

Tidak, jika Anda memutuskan dompet dari proyek, tetapi Anda telah memberikan izin pemberian token, mereka masih dapat menggunakan token tersebut. Anda perlu mencabut akses tersebut.

### Kapan izin kontrak akan berakhir?

Tidak ada tanggal kedaluwarsa pada izin kontrak. Jika Anda memberikan izin kontrak, izin tersebut dapat digunakan, bahkan bertahun-tahun setelah diberikan.

### Mengapa proyek menetapkan jatah token tidak terbatas?

Proyek sering kali melakukan hal ini untuk meminimalkan jumlah permintaan yang diperlukan, yang berarti pengguna hanya perlu menyetujui satu kali dan membayar biaya transaksi satu kali saja. Meskipun nyaman, hal ini bisa berbahaya bagi pengguna untuk menyetujui secara sembarangan, pada situs yang tidak terbukti dengan waktu atau diaudit. Beberapa dompet memungkinkan Anda untuk membatasi jumlah token yang disetujui secara manual untuk membatasi risiko Anda. Tanyakan penyedia dompet Anda untuk informasi lebih lanjut.
