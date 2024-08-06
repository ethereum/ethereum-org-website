---
title: Token yang tidak dapat dipertukarkan (NFT)
description: Gambaran umum tentang NFT di Ethereum
lang: id
template: use-cases
emoji: ":frame_with_picture:"
sidebarDepth: 2
image: /images/infrastructure_transparent.png
alt: Logo Eth yang ditampilkan melalui hologram.
summaryPoint1: Cara untuk mewakili apa pun yang unik sebagai aset berbasis Ethereum.
summaryPoint2: NFT memberi lebih banyak pemberdayaan terhadap para pembuat konten daripada sebelumnya.
summaryPoint3: Digerakkan oleh kontrak pintar di rantai blok Ethereum.
---

## Apa itu NFT? {#what-are-nfts}

NFT adalah token yang unik secara individual. Setiap NFT memiliki properti yang berbeda (tidak dapat dipertukarkan) dan terbukti langka. Ini berbeda dari token seperti ERC-20 di mana setiap token dalam satu set identik dan memiliki properti yang sama ('dapat dipertukarkan'). Anda tidak peduli dengan lembaran dolar kertas tertentu yang ada di dompet Anda, karena semuanya identik dan memiliki nilai yang sama. Namun, Anda _peduli_ dengan NFT tertentu yang Anda miliki, karena semuanya memiliki properti individual yang membedakan satu sama lain.

Keunikan dari setiap NFT memungkinkan tokenisasi untuk berbagai hal seperti seni, koleksi, atau bahkan properti, yang mana satu NFT unik yang spesifik mewakili suatu item dunia nyata atau digital yang unik. Kepemilikan suatu aset diamankan oleh rantai blok Ethereum – tidak seorang pun dapat merubah catatan kepemilikan atau menyalin/menempel NFT baru untuk mengadakannya.

<YouTube id="Xdkkux6OxfM" />

## Internet aset {#internet-of-assets}

NFT dan Ethereum memecahkan beberapa masalah yang ada di internet saat ini. Karena semuanya telah menjadi lebih digital, ada kebutuhan untuk meniru properti barang fisik seperti kelangkaan, keunikan, dan bukti kepemilikan. dalam cara yang tidak dikendalikan oleh organisasi pusat. Sebagai contoh, dengan NFT, Anda dapat memiliki file musik mp3 yang tidak terkait dengan aplikasi musik dari satu perusahaan tertentu, atau Anda dapat memiliki akun media sosial yang dapat Anda jual atau tukar, namun tidak dapat sembarangan diambil oleh penyedia platform.

Inilah bagaimana teknologi yang terdiri dari NFT dibandingkan dengan teknologi yang kebanyakan dari kita gunakan saat ini...

### Perbandingan {#nft-comparison}

| Internet NFT                                                                                                                        | Internet saat ini                                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aset Anda milik Anda! Hanya Anda yang dapat menjual atau menukarnya.                                                                | Anda menyewa suatu aset dari beberapa organisasi.                                                                                                                      |
| NFT secara digital unik, tidak ada dua NFT yang sama.                                                                               | Salinan dari suatu entitas sering kali tidak dapat dibedakan dari aslinya.                                                                                             |
| Kepemilikan NFT disimpan pada rantai blok agar dapat diverifikasi oleh siapa saja.                                                  | Catatan kepemilikan barang digital disimpan di server yang dikendalikan oleh institusi – Anda harus mengikuti peraturan mereka untuk itu.                              |
| NFT adalah kontrak pintar di Ethereum. Ini berarti dapat digunakan dengan mudah dalam kontrak pintar dan aplikasi lain di Ethereum! | Perusahaan dengan barang digital biasanya memerlukan infrastruktur "taman tembok" sendiri.                                                                             |
| Kreator konten dapat menjual karya mereka di mana saja dan dapat mengakses pasar global.                                            | Kreator bergantung pada infrastruktur dan distribusi platform yang mereka gunakan. Tindakan ini sering kali tunduk pada ketentuan pembatasan penggunaan dan geografis. |
| Kreator NFT dapat mempertahankan hak kepemilikan atas karyanya sendiri, dan mengatur royalti secara langsung ke dalam kontrak NFT.  | Platform, seperti layanan tayangan musik, mempertahankan sebagian besar keuntungan dari penjualan.                                                                     |

## Bagaimana cara kerja NFT? {#how-nfts-work}

Seperti halnya token yang diterbitkan di Ethereum, NFT diterbitkan oleh sebuah kontrak pintar. Kontrak pintar sesuai dengan salah satu dari beberapa standar NFT (umumnya ERC-721 atau ERC-1155) yang mendefinisikan fungsi-fungsi yang dimiliki oleh kontrak tersebut. Kontrak dapat menciptakan ('mencetak') NFT dan menetapkannya kepada pemilik tertentu. Kepemilikan didefinisikan dalam kontrak dengan memetakan NFT spesifik ke alamat tertentu. NFT memiliki ID dan umumnya metadata yang terkait dengannya yang membuat token spesifik tersebut unik.

Ketika seseorang menciptakan atau mencetak NFT, mereka sebenarnya menjalankan fungsi dalam kontrak pintar yang menetapkan NFT spesifik ke alamat mereka. Informasi ini disimpan dalam penyimpanan kontrak, yang merupakan bagian dari rantai blok. Kreator kontrak dapat menulis logika tambahan ke dalam kontrak, misalnya membatasi pasokan total atau menentukan royalti yang harus dibayarkan kepada pembuat setiap kali token ditransfer.

## NFT digunakan untuk apa? {#nft-use-cases}

NFT digunakan untuk banyak hal, termasuk:

- membuktikan bahwa Anda menghadiri sebuah acara
- membuktikan bahwa Anda menyelesaikan sebuah kursus
- item yang dapat dimiliki dalam game
- seni digital
- melakukan tokenisasi aset dunia nyata
- membuktikan identitas daring Anda
- membatasi akses ke konten
- penjualan tiket
- nama domain internet terdesentralisasi
- jaminan dalam DeFi

Mungkin Anda adalah seorang seniman yang ingin berbagi karya mereka menggunakan NFT, tanpa kehilangan kontrol dan mengorbankan keuntungan Anda kepada perantara. Anda dapat membuat kontrak baru dan menentukan jumlah NFT, propertinyaa, dan tautan ke beberapa karya seni khusus. Sebagai seniman, Anda dapat memprogram royalti yang seharusnya Anda terima ke dalam kontrak pintar (misalnya, mentransfer 5% dari harga penjualan ke pemilik kontrak setiap kali NFT ditransfer). Anda juga selalu dapat membuktikan bahwa Anda menciptakan NFT karena Anda memiliki dompet yang mendeploy kontrak tersebut. Pembeli Anda dengan mudah dapat membuktikan bahwa mereka memiliki NFT asli dari koleksi Anda karena alamat dompet mereka terkait dengan token dalam kontrak pintar Anda. Mereka dapat menggunakannya di seluruh ekosistem Ethereum, dengan keyakinan akan keasliannya.

Atau pertimbangkan tiket untuk sebuah acara olahraga. Sama seperti penyelenggara sebuah acara dapat memilih berapa banyak tiket yang dapat dijual, pembuat NFT dapat memutuskan berapa banyak tiruan yang ada. Terkadang ini adalah tiruan yang sama persis, seperti 5000 tiket Masuk Umum. Terkadang ada beberapa dicetak sangat serupa, tetapi masing-masing sedikit berbeda, seperti tiket dengan kursi yang ditentukan. Tiket-tiket ini dapat dibeli dan dijual secara peer-to-peer tanpa membayar petugas tiket, dan pembeli selalu memiliki jaminan keaslian tiket dengan memeriksa alamat kontrak.

Di ethereum.org, NFT digunakan untuk menunjukkan bahwa orang-orang telah berkontribusi pada repositori GitHub kami atau menghadiri panggilan, dan kami bahkan memiliki nama domain NFT kami sendiri. Jika Anda berkontribusi pada ethereum.org, Anda dapat memperoleh NFT POAP. Beberapa pertemuan kripto telah menggunakan POAP sebagai tiket. [Selengkapnya tentang berkontribusi](/contributing/#poap).

![POAP ethereum.org](./poap.png)

Situs web ini juga memiliki nama domain alternatif yang didukung oleh NFT, **ethereum.eth**. Alamat `.org` kami dikelola secara terpusat oleh sebuah penyedia sistem nama domain (DNS), sedangkan ethereum`.eth` terdaftar di Ethereum melalui Layanan Nama Ethereum (ENS). Dan ini dimiliki dan dikelola oleh kami. [Lihat catatan ENS kami](https://app.ens.domains/name/ethereum.eth)

[Selengkapnya tentang ENS](https://app.ens.domains)

<Divider />

### Keamanan NFT {#nft-security}

Keamanan Ethereum berasal dari bukti taruhan. Sistem dirancang untuk memberikan insentif ekonomi yang mengurangi kemungkinan tindakan jahat, sehingga Ethereum menjadi tidak mungkin di palsukan. Inilah yang membuat NFT menjadi mungkin. Setelah blok yang berisi transaksi NFT Anda menjadi final, biaya yang diperlukan bagi penyerang untuk mengubahnya akan mencapai jutaan ETH. Setiap orang yang menjalankan perangkat lunak Ethereum akan segera dapat mendeteksi manipulasi yang tidak jujur terhadap NFT, dan pelaku kejahatan akan dikenakan hukuman ekonomi dan diusir.

Masalah keamanan terkait NFT sering kali terkait dengan penipuan phishing, kerentanan kontrak pintar, atau kesalahan pengguna (seperti secara tidak sengaja mengekspos kunci pribadi), sehingga keamanan dompet yang baik menjadi sangat penting bagi pemilik NFT.

<ButtonLink href="/security/">
  Lebih lanjut tentang keamanan
</ButtonLink>

## Bacaan lebih lanjut {#further-reading}

- [Panduan tentang NFT bagi pemula](https://linda.mirror.xyz/df649d61efb92c910464a4e74ae213c4cab150b9cbcc4b7fb6090fc77881a95d) – _Linda Xie, Januari 2020_
- [Pelacak NFT Etherscan](https://etherscan.io/nft-top-contracts)
- [Standar token ERC-721](/developers/docs/standards/tokens/erc-721/)
- [Token standar ERC-1155](/developers/docs/standards/tokens/erc-1155/)

<Divider />

<QuizWidget quizKey="nfts" />
