---
title: IPFS untuk antarmuka pengguna terdesentralisasi
description: Tutorial ini mengajarkan pembaca cara menggunakan IPFS untuk menyimpan antarmuka pengguna untuk sebuah dapp. Meskipun data dan logika bisnis aplikasi terdesentralisasi, tanpa antarmuka pengguna yang tahan sensor, pengguna mungkin tetap akan kehilangan akses ke sana.
author: Ori Pomerantz
tags: ["ipfs", "dapps", "frontend"]
skill: beginner
lang: id
published: 2024-06-29
---

Anda telah menulis dapp baru yang luar biasa. Anda bahkan telah menulis [antarmuka pengguna](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) untuknya. Namun sekarang Anda khawatir seseorang akan mencoba menyensornya dengan mematikan antarmuka pengguna Anda, yang hanya berupa satu server di cloud. Dalam tutorial ini, Anda akan belajar cara menghindari sensor dengan menempatkan antarmuka pengguna Anda di **[interplanetary file system (IPFS)](https://ipfs.tech/developers/)** sehingga siapa pun yang tertarik akan dapat menyematkannya di server untuk akses di masa mendatang.

Anda dapat menggunakan layanan pihak ketiga seperti [Fleek](https://resources.fleek.xyz/docs/) untuk melakukan semua pekerjaan tersebut. Tutorial ini ditujukan bagi orang-orang yang ingin melakukan cukup banyak hal untuk memahami apa yang mereka lakukan meskipun itu membutuhkan lebih banyak pekerjaan.

## Memulai secara lokal {#getting-started-locally}

Ada beberapa [penyedia IPFS pihak ketiga](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-a-third-party-pinning-service), tetapi yang terbaik adalah memulai dengan menjalankan IPFS secara lokal untuk pengujian.

1. Instal [antarmuka pengguna IPFS](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions).

2. Buat direktori dengan situs web Anda. Jika Anda menggunakan [Vite](https://vite.dev/), gunakan perintah ini:

   ```sh
   pnpm vite build
```

3. Di IPFS Desktop, klik **Import > Folder** dan pilih direktori yang Anda buat pada langkah sebelumnya.

4. Pilih folder yang baru saja Anda unggah dan klik **Rename**. Berikan nama yang lebih bermakna.

5. Pilih lagi dan klik **Share link**. Salin URL ke papan klip. Tautannya akan mirip dengan `https://ipfs.io/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`.

6. Klik **Status**. Perluas tab **Advanced** untuk melihat alamat gateway. Misalnya, pada sistem saya alamatnya adalah `http://127.0.0.1:8080`.

7. Gabungkan jalur dari langkah tautan dengan alamat gateway untuk menemukan alamat Anda. Misalnya, untuk contoh di atas, URL-nya adalah `http://127.0.0.1:8080/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`. Buka URL tersebut di browser untuk melihat situs Anda.

## Mengunggah {#uploading}

Jadi sekarang Anda dapat menggunakan IPFS untuk menyajikan file secara lokal, yang mana tidak terlalu menarik. Langkah selanjutnya adalah membuatnya tersedia untuk dunia saat Anda sedang offline.

Ada sejumlah [layanan penyematan (pinning)](https://docs.ipfs.tech/concepts/persistence/#pinning-services) yang terkenal. Pilih salah satunya. Layanan mana pun yang Anda gunakan, Anda perlu membuat akun dan memberikannya **pengidentifikasi konten (CID)** di IPFS desktop Anda.

Secara pribadi, saya merasa [4EVERLAND](https://docs.4everland.org/storage/4ever-pin/guides) adalah yang paling mudah digunakan. Berikut adalah petunjuk untuk menggunakannya:

1. Buka [dasbor](https://dashboard.4everland.org/overview) dan masuk dengan dompet Anda.

2. Di bilah sisi kiri klik **Storage > 4EVER Pin**.

3. Klik **Upload > Selected CID**. Beri nama konten Anda dan berikan CID dari IPFS desktop. Saat ini CID adalah string yang dimulai dengan `Qm` diikuti oleh 44 huruf dan angka yang mewakili hash [yang dienkode base-58](https://medium.com/bootdotdev/base64-vs-base58-encoding-c25553ff4524), seperti `QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`, tetapi [hal itu kemungkinan akan berubah](https://docs.ipfs.tech/concepts/content-addressing/#version-1-v1).

4. Status awalnya adalah **Queued**. Muat ulang hingga berubah menjadi **Pinned**.

5. Klik CID Anda untuk mendapatkan tautan. Anda dapat melihat aplikasi saya [di sini](https://bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im.ipfs.dweb.link/).

6. Anda mungkin perlu mengaktifkan akun Anda agar tetap disematkan selama lebih dari sebulan. Aktivasi akun berbiaya sekitar $1. Jika Anda menutupnya, keluar dan masuk kembali untuk diminta mengaktifkan lagi.

## Menggunakan dari IPFS {#using-from-ipfs}

Pada titik ini Anda memiliki tautan ke gateway terpusat yang menyajikan konten IPFS Anda. Singkatnya, antarmuka pengguna Anda mungkin sedikit lebih aman tetapi masih belum tahan sensor. Untuk ketahanan sensor yang sesungguhnya, pengguna perlu menggunakan IPFS [secara langsung dari browser](https://docs.ipfs.tech/install/ipfs-companion/#prerequisites).

Setelah Anda menginstalnya (dan IPFS desktop berfungsi), Anda dapat membuka [/ipfs/`<CID>`](https://any.site/ipfs/bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im) di situs mana pun dan Anda akan mendapatkan konten tersebut, yang disajikan secara desentralisasi.

## Kekurangan {#drawbacks}

Anda tidak dapat menghapus file IPFS secara andal, jadi selama Anda memodifikasi antarmuka pengguna Anda, mungkin yang terbaik adalah membiarkannya terpusat, atau menggunakan [interplanetary name system (IPNS)](https://docs.ipfs.tech/concepts/ipns/#mutability-in-ipfs), sebuah sistem yang menyediakan mutabilitas di atas IPFS. Tentu saja, apa pun yang dapat diubah dapat disensor, dalam kasus IPNS dengan menekan orang yang memiliki kunci pribadi yang sesuai dengannya.

Selain itu, beberapa paket memiliki masalah dengan IPFS, jadi jika situs web Anda sangat rumit, itu mungkin bukan solusi yang baik. Dan tentu saja, apa pun yang bergantung pada integrasi server tidak dapat didesentralisasi hanya dengan menempatkan sisi klien di IPFS.

## Kesimpulan {#conclusion}

Sama seperti Ethereum yang memungkinkan Anda mendesentralisasi aspek basis data dan logika bisnis dari dapp Anda, IPFS memungkinkan Anda mendesentralisasi antarmuka pengguna. Hal ini memungkinkan Anda menutup satu lagi vektor serangan terhadap dapp Anda.

[Lihat di sini untuk karya saya yang lain](https://cryptodocguy.pro/).