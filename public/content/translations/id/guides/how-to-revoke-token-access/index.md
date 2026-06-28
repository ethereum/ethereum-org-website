---
title: Cara mencabut akses kontrak pintar ke dana kripto Anda
description: Panduan tentang cara mencabut akses token kontrak pintar yang eksploitatif
lang: id
---

Panduan ini akan mengajarkan Anda cara melihat daftar semua [kontrak pintar](/glossary/#smart-contract) yang telah Anda izinkan untuk mengakses dana Anda dan cara membatalkannya.

Terkadang pengembang jahat membangun pintu belakang (backdoor) ke dalam kontrak pintar yang memungkinkan akses ke dana pengguna yang tidak menyadari saat berinteraksi dengan kontrak pintar tersebut. Hal yang sering terjadi adalah platform semacam itu meminta izin kepada pengguna untuk membelanjakan **token dalam jumlah tak terbatas** sebagai upaya untuk menghemat sedikit [gas](/glossary/#gas) di masa mendatang, tetapi hal ini disertai dengan peningkatan risiko.

Setelah sebuah platform memiliki hak akses tak terbatas ke sebuah token di [dompet](/glossary/#wallet) Anda, mereka dapat membelanjakan semua token tersebut meskipun Anda telah menarik dana Anda dari platform mereka ke dompet Anda. Pelaku kejahatan masih dapat mengakses dana Anda dan menariknya ke dompet mereka tanpa ada opsi pemulihan yang tersisa untuk Anda.

Satu-satunya perlindungan adalah menahan diri dari menggunakan proyek baru yang belum teruji, hanya menyetujui apa yang Anda butuhkan, atau secara teratur mencabut akses. Jadi, bagaimana cara Anda melakukannya?

## Langkah 1: Gunakan alat pencabut akses {#step-1-use-revoke-access-tools}

Beberapa situs web memungkinkan Anda melihat dan mencabut kontrak pintar yang terhubung ke alamat Anda. Kunjungi situs web tersebut dan hubungkan dompet Anda:

- [Etherscan](https://etherscan.io/tokenapprovalchecker) (Ethereum)
- [Blockscout](https://eth.blockscout.com/essential-dapps/revoke) (Ethereum)
- [Revoke](https://revoke.cash/) (berbagai jaringan)
- [Unrekt](https://app.unrekt.net/) (berbagai jaringan)
- [EverRevoke](https://everrise.com/everrevoke/) (berbagai jaringan)

## Langkah 2: Hubungkan dompet Anda {#step-2-connect-your-wallet}

Setelah Anda berada di situs web, klik "Connect wallet" (Hubungkan dompet). Situs web akan meminta Anda untuk menghubungkan dompet Anda.

Pastikan Anda menggunakan jaringan yang sama di dompet dan situs web Anda. Anda hanya akan melihat kontrak pintar yang terkait dengan jaringan yang dipilih. Misalnya, jika Anda terhubung ke Mainnet Ethereum, Anda hanya akan melihat kontrak Ethereum, bukan kontrak dari rantai lain seperti Polygon.

## Langkah 3: Pilih kontrak pintar yang ingin Anda cabut {#step-3-select-a-smart-contract-you-wish-to-revoke}

Anda akan melihat semua kontrak yang diizinkan mengakses token Anda beserta batas pengeluarannya. Temukan kontrak yang ingin Anda hentikan.

Jika Anda tidak tahu kontrak mana yang harus dipilih, Anda dapat mencabut semuanya. Hal ini tidak akan menimbulkan masalah bagi Anda, tetapi Anda harus memberikan serangkaian izin baru saat berikutnya Anda berinteraksi dengan salah satu kontrak ini.

## Langkah 4: Cabut akses ke dana Anda {#step-4-revoke-access-to-your-funds}

Setelah Anda mengeklik cabut, Anda akan melihat saran transaksi baru di dompet Anda. Hal ini wajar terjadi. Anda harus membayar biaya transaksi agar pembatalan berhasil. Bergantung pada jaringannya, proses ini dapat memakan waktu dari satu menit hingga beberapa menit.

Kami menyarankan Anda untuk menyegarkan alat pencabut setelah beberapa menit dan menghubungkan dompet Anda lagi untuk memeriksa ulang apakah kontrak yang dicabut telah hilang dari daftar.

<mark>Kami menyarankan Anda untuk tidak pernah mengizinkan proyek memiliki akses tak terbatas ke token Anda dan mencabut semua akses jatah token secara teratur. Mencabut akses token tidak akan pernah mengakibatkan hilangnya dana, terutama jika Anda menggunakan alat yang tercantum di atas.</mark>

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

## Pertanyaan yang sering diajukan {#frequently-asked-questions}

### Apakah mencabut akses token juga menghentikan staking, pooling, peminjaman, dll? {#does-revoking-token-access-also-terminate-staking-pooling-lending-etc}

Tidak, hal ini tidak akan memengaruhi strategi [keuangan terdesentralisasi (DeFi)](/glossary/#defi) Anda. Anda akan tetap berada di posisi Anda dan terus mendapatkan imbalan, dll.

### Apakah memutuskan sambungan dompet dari sebuah proyek sama dengan menghapus izin untuk menggunakan dana saya? {#is-disconnecting-a-wallet-from-a-project-the-same-as-removing-permission-to-use-my-funds}

Tidak, jika Anda memutuskan sambungan dompet Anda dari proyek, tetapi Anda telah memberikan izin jatah token, mereka masih dapat menggunakan token tersebut. Anda perlu mencabut akses tersebut.

### Kapan izin kontrak akan kedaluwarsa? {#when-will-the-contract-permission-expire}

Tidak ada tanggal kedaluwarsa pada izin kontrak. Jika Anda memberikan izin kontrak, izin tersebut dapat digunakan, bahkan bertahun-tahun setelah diberikan.

### Mengapa proyek menetapkan jatah token tak terbatas? {#why-do-projects-set-unlimited-token-allowance}

Proyek sering melakukan ini untuk meminimalkan jumlah permintaan yang diperlukan, yang berarti pengguna hanya perlu menyetujui sekali dan membayar biaya transaksi hanya sekali. Meskipun nyaman, hal ini bisa berbahaya bagi pengguna jika menyetujui secara sembarangan, di situs yang belum terbukti seiring waktu atau belum diaudit. Beberapa dompet memungkinkan Anda membatasi jumlah token yang disetujui secara manual untuk membatasi risiko Anda. Hubungi penyedia dompet Anda untuk informasi lebih lanjut.