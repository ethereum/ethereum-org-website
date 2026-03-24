---
title: Cara mencabut akses kontrak pintar ke dana kripto Anda
description: Panduan tentang cara mencabut akses token kontrak pintar yang eksploitatif
lang: id
---

# Cara mencabut akses kontrak pintar ke dana kripto Anda

Panduan ini akan mengajarkan Anda cara melihat daftar semua [kontrak pintar](/glossary/#smart-contract) yang telah Anda izinkan untuk mengakses dana Anda dan cara membatalkannya.

Terkadang pengembang jahat membangun pintu belakang (backdoor) ke dalam kontrak pintar yang memungkinkan akses ke dana pengguna yang tidak menyadari saat berinteraksi dengan kontrak pintar tersebut. Apa yang sering terjadi adalah platform semacam itu meminta izin kepada pengguna untuk membelanjakan **token dalam jumlah tak terbatas** dalam upaya untuk menghemat sejumlah kecil [gas](/glossary/#gas) di masa depan, tetapi ini datang dengan risiko yang meningkat.

Setelah sebuah platform memiliki hak akses tak terbatas ke sebuah token di [dompet](/glossary/#wallet) Anda, mereka dapat membelanjakan semua token tersebut bahkan jika Anda telah menarik dana Anda dari platform mereka ke dompet Anda. Aktor jahat masih dapat mengakses dana Anda dan menariknya ke dompet mereka tanpa ada opsi pemulihan yang tersisa untuk Anda.

Satu-satunya perlindungan adalah menahan diri dari menggunakan proyek baru yang belum teruji, hanya menyetujui apa yang Anda butuhkan, atau secara teratur mencabut akses. Jadi, bagaimana Anda melakukannya?

## Langkah 1: Gunakan alat pencabut akses

Beberapa situs web memungkinkan Anda melihat dan mencabut kontrak pintar yang terhubung ke alamat Anda. Kunjungi situs web tersebut dan hubungkan dompet Anda:

- [Etherscan](https://etherscan.io/tokenapprovalchecker) (Ethereum)
- [Blockscout](https://eth.blockscout.com/essential-dapps/revoke) (Ethereum)
- [Revoke](https://revoke.cash/) (berbagai jaringan)
- [Unrekt](https://app.unrekt.net/) (berbagai jaringan)
- [EverRevoke](https://everrise.com/everrevoke/) (berbagai jaringan)

## Langkah 2: Hubungkan dompet Anda

Setelah Anda berada di situs web, klik "Connect wallet" (Hubungkan dompet). Situs web akan meminta Anda untuk menghubungkan dompet Anda.

Pastikan Anda menggunakan jaringan yang sama di dompet dan situs web Anda. Anda hanya akan melihat kontrak pintar yang terkait dengan jaringan yang dipilih. Misalnya, jika Anda terhubung ke Ethereum Mainnet, Anda hanya akan melihat kontrak Ethereum, bukan kontrak dari rantai lain seperti Polygon.

## Langkah 3: Pilih kontrak pintar yang ingin Anda cabut

Anda akan melihat semua kontrak yang diizinkan mengakses token Anda dan batas pengeluarannya. Temukan kontrak yang ingin Anda hentikan.

Jika Anda tidak tahu kontrak mana yang harus dipilih, Anda dapat mencabut semuanya. Ini tidak akan menimbulkan masalah bagi Anda, tetapi Anda harus memberikan serangkaian izin baru pada kali berikutnya Anda berinteraksi dengan salah satu kontrak ini.

## Langkah 4: Cabut akses ke dana Anda

Setelah Anda mengklik cabut (revoke), Anda akan melihat saran transaksi baru di dompet Anda. Ini adalah hal yang wajar. Anda harus membayar biaya agar pembatalan berhasil. Bergantung pada jaringan, ini bisa memakan waktu dari satu menit hingga beberapa menit untuk diproses.

Kami menyarankan Anda untuk menyegarkan (refresh) alat pencabut setelah beberapa menit dan menghubungkan dompet Anda lagi untuk memeriksa ulang apakah kontrak yang dicabut telah hilang dari daftar.

<mark>Kami menyarankan Anda untuk tidak pernah mengizinkan proyek memiliki akses tak terbatas ke token Anda dan mencabut semua akses kelonggaran token secara teratur. Mencabut akses token seharusnya tidak pernah mengakibatkan hilangnya dana, terutama jika Anda menggunakan alat yang tercantum di atas.</mark>

 <br />

<Alert variant="update">
<AlertEmoji text=":eyes:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>Ingin mempelajari lebih lanjut?</div>
  <ButtonLink href="/guides/">
    Lihat panduan kami yang lain
  </ButtonLink>
</AlertContent>
</Alert>

## Pertanyaan yang sering diajukan

### Apakah mencabut akses token juga menghentikan mengunci, pooling, peminjaman, dll?

Tidak, ini tidak akan memengaruhi strategi [DeFi](/glossary/#defi) Anda. Anda akan tetap berada di posisi Anda dan terus mendapatkan hadiah, dll.

### Apakah memutuskan sambungan dompet dari sebuah proyek sama dengan menghapus izin untuk menggunakan dana saya?

Tidak, jika Anda memutuskan sambungan dompet Anda dari proyek, tetapi Anda telah memberikan izin kelonggaran token, mereka masih dapat menggunakan token tersebut. Anda perlu mencabut akses itu.

### Kapan izin kontrak akan kedaluwarsa?

Tidak ada tanggal kedaluwarsa pada izin kontrak. Jika Anda memberikan izin kontrak, izin tersebut dapat digunakan, bahkan bertahun-tahun setelah diberikan.

### Mengapa proyek menetapkan kelonggaran token tak terbatas?

Proyek sering melakukan ini untuk meminimalkan jumlah permintaan yang diperlukan, yang berarti pengguna hanya perlu menyetujui sekali dan membayar biaya transaksi hanya sekali. Meskipun nyaman, ini bisa berbahaya bagi pengguna jika menyetujui dengan sembarangan, di situs yang belum terbukti seiring waktu atau diaudit. Beberapa dompet memungkinkan Anda membatasi jumlah token yang disetujui secara manual untuk membatasi risiko Anda. Periksa dengan penyedia dompet Anda untuk informasi lebih lanjut.