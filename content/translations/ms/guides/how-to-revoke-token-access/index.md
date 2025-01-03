---
title: Bagaimana untuk memansuhkan akses smart contract ke dana kripto anda
description: Panduan cara buat berkenaan membatalkan akses token kontrak pintar yang bersifat eksploitatif
lang: ms
---

# Bagaimana untuk memansuhkan akses smart contract ke dana kripto anda

Panduan ini akan mengajar anda cara melihat senarai semua kontrak pintar yang telah anda berikan akses kepada dana anda dan cara untuk membatalkannya.

Kadang-kadang, pembangun berniat jahat membina pintu belakang dalam kontrak pintar yang membolehkan akses kepada dana pengguna yang tanpa sedar berinteraksi dengan kontrak pintar tersebut. Perkara yang sering berlaku ialah platform tersebut meminta kebenaran pengguna untuk membelanjakan **jumlah token yang tiada had** dalam percubaan untuk menyimpan sedikit gas pada masa depan, tetapi risikonya meningkat.

Sebaik sahaja platform mempunyai hak akses tanpa had terhadap token dalam dompet Anda, mereka boleh membelanjakan semua token tersebut walaupun anda telah mengeluarkan dana anda dari platform mereka ke dompet anda. Pelaku berniat jahat masih dapat mengakses dana anda dan mengeluarkannya masuk ke dompet mereka tanpa pilihan pemulihan yang tersedia untuk anda.

Satu-satunya perlindungan adalah untuk tidak menggunakan projek baharu yang belum diuji, hanya meluluskan perkara yang anda perlukan, atau kerap membatalkan akses. Jadi, bagaimana cara melakukannya?

## Langkah 1: Gunakan alat pembatalan akses

Beberapa laman web membenarkan anda melihat dan membatalkan kontrak pintar yang bersambung dengan alamat anda. Lawati laman web tersebut dan sambungkan dompet anda:

- [Ethallowance](https://ethallowance.com/) (Ethereum)
- [Etherscan](https://etherscan.io/tokenapprovalchecker) (Ethereum)
- [Cointool](https://cointool.app/approve/eth) (berbilang rangkaian)
- [Revoke](https://revoke.cash/) (berbilang rangkaian)
- [Unrekt](https://app.unrekt.net/) (berbilang rangkaian)
- [EverRevoke](https://everrise.com/everrevoke/) (berbilang rangkaian)

## Langkah 2: Sambungkan dompet anda

Sebaik sahaja anda berada di laman web tersebut, klik pada "Sambungkan dompet". Laman web tersebut harus menggesa anda untuk menyambungkan dompet anda.

Pastikan anda menggunakan rangkaian yang sama di dompet anda dan laman web. Anda hanya akan melihat kontrak pintar yang berkaitan dengan rangkaian yang dipilih. Sebagai contoh, jika anda menyambung ke Rangkaian utama Ethereum, anda hanya akan melihat kontrak Ethereum, bukan kontrak dari rantai lain seperti Polygon.

## Langkah 3: Pilih kontrak pintar yang ingin anda batalkan

Anda harus melihat semua kontrak yang diberikan akses kepada token anda dan had perbelanjaannya. Cari satu kontrak yang ingin anda hentikan.

Jika anda tidak tahu kontrak yang harus dipilih, anda boleh membatalkan semuanya. Ia tidak akan mewujudkan sebarang masalah untuk anda, tetapi anda perlu memberikan set kebenaran baharu apabila selepas ini anda berinteraksi dengan mana-mana kontrak ini.

## Langkah 4: Batalkan akses kepada dana anda

Sebaik sahaja anda mengklik pada batal, anda harus melihat cadangan transaksi baharu dalam dompet anda. Ini sudah dijangka. Anda perlu membayar yuran agar pembatalan berjaya. Bergantung pada rangkaian, ini boleh mengambil masa dari satu minit hingga beberapa minit untuk diproses.

Kami menasihatkan anda supaya menyegarkan semula alat pembatalan selepas beberapa minit dan sambungkan dompet anda sekali lagi untuk menyemak kembali sama ada kontrak yang dibatalkan telah hilang daripada senarai.

<mark>Kami mengesyorkan anda jangan sekali-kali membenarkan projek mengakses tanpa had kepada token anda dan membatalkan semua akses peruntukan token dengan kerap. Membatalkan akses token tidak harus sekali-kali mengakibatkan hilang dana, terutamanya jika anda menggunakan alat-alat yang disenaraikan di atas.</mark>

 <br />

<InfoBanner shouldSpaceBetween emoji=":eyes:">
  <div>Mahu belajar lebih lanjut?</div>
  <ButtonLink href="/guides/">
    Lihat panduan-panduan lain kami
  </ButtonLink>
</InfoBanner>

## Soalan yang kerap ditanya

### Adakah membatalkan akses token turut menghentikan pertaruhan, pengumpulan, pinjaman, dsb?

Tidak, itu tidak akan mempengaruhi strategi DeFi anda. Anda akan tetap berada dalam posisi anda dan terus menerima ganjaran dsb.

### Adakah memutuskan sambungan dompet daripada projek sama seperti membuang kebenaran untuk menggunakan dana saya?

Tidak, jika anda memutuskan sambungan dompet anda daripada projek, tetapi anda telah memberikan kebenaran peruntukan token, mereka masih boleh menggunakan token-token tersebut. Anda perlu membatalkan akses tersebut.

### Bilakah kebenaran kontrak akan tamat tempoh?

Tiada tarikh tamat tempoh pada kebenaran kontrak. Jika anda memberikan kebenaran kontrak, kebenaran tersebut boleh digunakan, bahkan bertahun-tahun selepas diberikan.

### Mengapakah projek-projek menetapkan peruntukan token yang tiada had?

Projek-projek sering melakukan ini untuk meminimumkan jumlah permintaan yang diperlukan, iaitu bermaksud pengguna hanya perlu memberikan kelulusan sekali dan membayar fi transaksi hanya sekali. Walaupun mudah, ini mungkin berbahaya bagi pengguna jika memberikan kelulusan secara sembarangan, terutama di laman-laman yang belum terbukti seiring waktu atau belum diaudit. Sesetengah dompet membenarkan anda secara manual mengehadkan jumlah token yang diluluskan untuk mengehadkan risiko anda. Semak dengan penyedia dompet anda untuk maklumat lanjut.
