---
title: Cara menggunakan dompet
metaTitle: Cara menggunakan Dompet Ethereum | Langkah demi Langkah
description: Panduan yang menjelaskan cara mengirim, menerima token, dan terhubung ke proyek web3.
lang: id
---

# Cara menggunakan dompet

Pelajari cara mengoperasikan semua fungsi dasar dompet. Jika Anda belum memilikinya, lihat [Cara membuat akun Ethereum](/guides/how-to-create-an-ethereum-account/) kami.

## Buka dompet Anda

Anda akan melihat dasbor yang kemungkinan akan menampilkan saldo Anda dan berisi tombol untuk mengirim dan menerima token.

## Menerima mata uang kripto

Apakah Anda ingin menerima kripto ke dalam dompet Anda?

Setiap akun Ethereum memiliki alamat penerimanya sendiri yang merupakan urutan angka dan huruf yang unik. Alamat tersebut berfungsi seperti nomor rekening bank. Alamat Ethereum akan selalu dimulai dengan "0x". Anda dapat membagikan alamat ini kepada siapa pun: aman untuk melakukannya.

Alamat Anda seperti alamat rumah Anda: Anda perlu memberi tahu orang-orang apa alamatnya agar mereka dapat menemukan Anda. Aman untuk melakukan ini, karena Anda masih dapat mengunci pintu depan Anda dengan kunci lain yang hanya Anda kendalikan sehingga tidak ada yang bisa masuk, bahkan jika mereka tahu di mana Anda tinggal.

Anda perlu memberikan alamat publik Anda kepada siapa pun yang ingin mengirimi Anda uang. Banyak aplikasi dompet memungkinkan Anda menyalin alamat Anda atau menampilkan kode QR untuk dipindai agar lebih mudah digunakan. Hindari mengetik alamat Ethereum apa pun secara manual. Hal ini dapat dengan mudah menyebabkan kesalahan pengetikan dan hilangnya dana.

Aplikasi yang berbeda mungkin bervariasi atau menggunakan bahasa yang berbeda, tetapi mereka akan membawa Anda melalui proses yang serupa jika Anda mencoba mentransfer dana.

1. Buka aplikasi dompet Anda.
2. Klik "Terima" (atau opsi dengan kata-kata serupa).
3. Salin alamat Ethereum Anda ke papan klip.
4. Berikan alamat Ethereum penerima Anda kepada pengirim.

## Mengirim mata uang kripto

Apakah Anda ingin mengirim ETH ke dompet lain?

1. Buka aplikasi dompet Anda.
2. Dapatkan alamat penerima dan pastikan Anda terhubung ke jaringan yang sama dengan penerima.
3. Masukkan alamat penerima atau pindai kode QR dengan kamera Anda sehingga Anda tidak perlu menulis alamat secara manual.
4. Klik tombol "Kirim" di dompet Anda (atau alternatif dengan kata-kata serupa).

![Kolom kirim untuk alamat kripto](./send.png)
<br/>

5. Banyak aset, seperti DAI atau USDC, ada di beberapa jaringan. Saat mentransfer token kripto, pastikan penerima menggunakan jaringan yang sama dengan Anda, karena ini tidak dapat dipertukarkan.
6. Pastikan dompet Anda memiliki ETH yang cukup untuk menutupi biaya transaksi, yang bervariasi tergantung pada kondisi jaringan. Sebagian besar dompet akan secara otomatis menambahkan biaya yang disarankan ke transaksi yang kemudian dapat Anda konfirmasi.
7. Setelah transaksi Anda diproses, jumlah kripto yang sesuai akan muncul di akun penerima. Ini mungkin memakan waktu mulai dari beberapa detik hingga beberapa menit tergantung pada seberapa banyak jaringan sedang digunakan saat ini.

## Terhubung ke proyek

Alamat Anda akan sama di semua proyek Ethereum. Anda tidak perlu mendaftar secara individual di proyek mana pun. Setelah Anda memiliki dompet, Anda dapat terhubung ke proyek Ethereum mana pun tanpa informasi tambahan apa pun. Tidak diperlukan email atau informasi pribadi lainnya.

1. Kunjungi situs web proyek mana pun.
2. Jika halaman arahan proyek hanyalah deskripsi statis dari proyek tersebut, Anda seharusnya dapat mengklik tombol "Buka Aplikasi" di menu yang akan mengarahkan Anda ke aplikasi web yang sebenarnya.
3. Setelah Anda berada di aplikasi, klik "Hubungkan".

![Tombol yang memungkinkan pengguna untuk terhubung ke situs web dengan dompet](./connect1.png)

4. Pilih dompet Anda dari daftar opsi yang disediakan. Jika Anda tidak dapat melihat dompet Anda, itu mungkin tersembunyi di bawah opsi "WalletConnect".

![Memilih dari daftar dompet untuk dihubungkan](./connect2.png)

5. Konfirmasikan permintaan tanda tangan di dompet Anda untuk membuat koneksi. **Menandatangani pesan ini seharusnya tidak memerlukan pengeluaran ETH apa pun**.
6. Selesai! Mulai gunakan aplikasi. Anda dapat menemukan beberapa proyek menarik di [halaman dapps](/apps/#explore) kami.
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

### Jika saya memiliki alamat ETH, apakah saya memiliki alamat yang sama di blockchain lain?

Anda dapat menggunakan alamat yang sama di semua blockchain yang kompatibel dengan EVM (jika Anda memiliki jenis dompet dengan frasa pemulihan). [Daftar](https://chainlist.org/) ini akan menunjukkan kepada Anda blockchain mana yang dapat Anda gunakan dengan alamat yang sama. Beberapa blockchain, seperti Bitcoin, menerapkan seperangkat aturan jaringan yang sama sekali terpisah dan Anda akan memerlukan alamat yang berbeda dengan format yang berbeda. Jika Anda memiliki dompet kontrak pintar, Anda harus memeriksa situs web produknya untuk info lebih lanjut tentang blockchain mana yang didukung.

### Bisakah saya menggunakan alamat yang sama di beberapa perangkat?

Ya, Anda dapat menggunakan alamat yang sama di beberapa perangkat. Dompet secara teknis hanyalah antarmuka untuk menunjukkan saldo Anda dan untuk melakukan transaksi, akun Anda tidak disimpan di dalam dompet, tetapi di blockchain.

### Saya belum menerima kripto, di mana saya dapat memeriksa status transaksi?

Anda dapat menggunakan [penjelajah blok](/developers/docs/data-and-analytics/block-explorers/) untuk melihat status transaksi apa pun secara waktu nyata. Yang perlu Anda lakukan hanyalah mencari alamat dompet Anda atau ID transaksi.

### Bisakah saya membatalkan atau mengembalikan transaksi?

Tidak, setelah transaksi dikonfirmasi, Anda tidak dapat membatalkan transaksi tersebut.