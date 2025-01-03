---
title: Cara menggunakan dompet
description: Panduan yang menjelaskan cara mengirim, menerima token, dan terhubung ke proyek web3.
lang: id
---

# Cara menggunakan dompet

Pelajari cara mengoperasikan semua fungsi dasar dompet. Jika Anda belum memilikinya, lihat [Cara: membuat akun Ethereum](/guides/how-to-create-an-ethereum-account/).

## Buka dompet Anda

Anda akan melihat dasbor yang kemungkinan besar akan menampilkan saldo Anda dan berisi tombol untuk mengirim dan menerima token.

## Menerima mata uang kripto

Apakah Anda ingin menerima kripto ke dalam dompet Anda?

Setiap akun Ethereum memiliki alamat penerimanya sendiri yang merupakan urutan angka dan huruf yang unik. Alamat berfungsi seperti nomor rekening bank. Alamat Ethereum akan selalu dimulai dengan "0x". Anda dapat membagikan alamat ini dengan siapa pun: aman untuk melakukannya.

Alamat Anda sama seperti alamat rumah: Anda harus memberi tahu orang-orang di mana alamat tersebut sehingga mereka dapat menemukan Anda. Hal ini aman untuk dilakukan, karena Anda masih bisa mengunci pintu depan dengan kunci lain yang hanya Anda yang bisa mengendalikannya sehingga tidak ada yang bisa masuk, meskipun mereka tahu tempat tinggal Anda.

Anda harus memberikan alamat publik kepada siapa pun yang ingin mengirimi Anda uang. Banyak aplikasi dompet yang memungkinkan Anda menyalin alamat atau menampilkan kode QR untuk dipindai agar lebih mudah digunakan. Hindari mengetik alamat Ethereum secara manual. Hal ini dapat dengan mudah menyebabkan kesalahan administrasi dan kehilangan dana.

Aplikasi yang berbeda mungkin berbeda atau menggunakan bahasa yang berbeda, tetapi akan membawa Anda melalui proses serupa jika Anda mencoba mentransfer dana.

1. Buka aplikasi dompet Anda.
2. Klik "Terima" (atau opsi dengan kata yang serupa).
3. Salin alamat Ethereum Anda ke clipboard.
4. Berikan alamat Ethereum penerima kepada pengirim.

## Kirim mata uang kripto

Apakah Anda ingin mengirim ETH ke dompet lain?

1. Buka aplikasi dompet Anda.
2. Dapatkan alamat penerima dan pastikan Anda terhubung ke jaringan yang sama dengan penerima.
3. Masukkan alamat penerima atau pindai kode QR dengan kamera Anda sehingga Anda tidak perlu menulis alamat secara manual.
4. Klik tombol "Kirim" di dompet Anda (atau tombol lain yang serupa).

![Bidang kirim untuk alamat kripto](./send.png)
<br/>

5. Banyak aset, seperti DAI atau USDC, ada di beberapa jaringan. Saat mentransfer token kripto, pastikan penerima menggunakan jaringan yang sama dengan Anda, karena token ini tidak dapat dipertukarkan.
6. Pastikan dompet Anda memiliki ETH yang cukup untuk membayar biaya transaksi, yang bervariasi tergantung pada kondisi jaringan. Sebagian besar dompet akan secara otomatis menambahkan biaya yang disarankan ke dalam transaksi yang kemudian dapat Anda konfirmasikan.
7. Setelah transaksi Anda diproses, jumlah kripto yang sesuai akan muncul di akun penerima. Hal ini dapat memakan waktu mulai dari beberapa detik hingga beberapa menit, tergantung pada seberapa banyak jaringan sedang digunakan.

## Menghubungkan ke proyek

Alamat Anda akan sama di semua proyek Ethereum. Anda tidak perlu mendaftar secara individual pada proyek apa pun. Setelah Anda memiliki dompet, Anda dapat terhubung ke proyek Ethereum apa pun tanpa informasi tambahan apa pun. Tidak ada email atau informasi pribadi lainnya yang diperlukan.

1. Kunjungi situs web proyek mana pun.
2. Jika halaman arahan proyek hanya berupa deskripsi statis tentang proyek, Anda seharusnya dapat mengklik tombol "Buka Aplikasi" di menu yang akan menavigasi Anda ke aplikasi web yang sebenarnya.
3. Setelah Anda berada di dalam aplikasi, klik "Hubungkan"

![Tombol yang memungkinkan pengguna terhubung ke situs web dengan dompet](./connect1.png)

4. Pilih dompet Anda dari daftar opsi yang tersedia. Jika Anda tidak dapat melihat dompet Anda, dompet tersebut mungkin tersembunyi di bawah opsi "WalletConnect".

![Memilih dari daftar dompet yang akan dihubungkan](./connect2.png)

5. Konfirmasikan permintaan tanda tangan di dompet Anda untuk membuat koneksi. **Menandatangani pesan ini tidak perlu mengeluarkan ETH**.
6. Itu saja! Mulai menggunakan aplikasi. Anda dapat menemukan beberapa proyek menarik di halaman [dApps](/dapps/#explore). <br />

<InfoBanner shouldSpaceBetween emoji=":eyes:">
  <div>Ingin mempelajari selengkapnya?</div>
  <ButtonLink href="/guides/">
    Lihat panduan lainnya
  </ButtonLink>
</InfoBanner>

## Pertanyaan yang sering diajukan

### Jika saya memiliki alamat ETH, apakah akan sama di rantai blok yang lain?

Anda dapat menggunakan alamat yang sama pada semua rantai blok yang kompatibel dengan EVM (jika Anda memiliki jenis dompet dengan frasa pemulihan). [Daftar](https://chainlist.org/) berikut ini memperlihatkan bagaimana cara menggunakan rantai blok dengan alamat yang sama. Beberapa rantai blok seperti Bitcoin, menerapkan peraturan pada jaringan yang terpisah dan Anda akan membutuhkan alamat yang berbeda dengan format yang berbeda pula. Jika Anda memiliki dompet kontrak pintar, maka Anda dapat melihat situs web produknya untuk mendapatkan informasi lebih lanjut mengenai rantai blok yang didukung olehnya.

### Dapatkah saya menggunakan alamat yang sama di beberapa perangkat?

Ya, Anda dapat menggunakan alamat yang sama pada beberapa perangkat. Dompet secara teknis hanyalah sebuah antarmuka untuk menunjukkan saldo Anda dan untuk melakukan transaksi, akun Anda tidak disimpan di dalam dompet, tetapi di rantai blok.

### Saya belum menerima kripto, di mana saya bisa mengecek status transaksi?

Anda bisa menggunakan [penjelajah blok](/developers/docs/data-and-analytics/block-explorers/) untuk melihat status transaksi apa pun secara real-time. Yang perlu Anda lakukan adalah mencari alamat dompet Anda atau ID transaksi.

### Dapatkah saya membatalkan atau mengembalikan transaksi?

Tidak, setelah transaksi dikonfirmasi, Anda tidak dapat membatalkan transaksi.
