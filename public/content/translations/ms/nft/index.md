---
title: Token tidak sepiawai (NFT)
description: Gambaran umum mengenai NFT di Ethereum
lang: ms
template: use-cases
emoji: ":frame_with_picture:"
sidebarDepth: 2
image: /images/infrastructure_transparent.png
alt: Logo Eth dipaparkan menerusi hologram.
summaryPoint1: Satu cara untuk mewakili apa sahaja yang unik sebagai aset berasaskan Ethereum.
summaryPoint2: NFT memberi lebih banyak kuasa kepada pencipta kandungan dari sebelum ini.
summaryPoint3: Didayakan oleh kontrak pintar pada blok rantai Ethereum.
---

## Apakah itu NFT? {#what-are-nfts}

NFT ialah token yang unik dari segi tersendiri. Setiap NFT mempunyai sifat berbeza (tidak sepiawai) dan terbukti terhad. Ini berbeza daripada token lain seperti ERC-20 iaitu setiap token dalam set adalah sama dan serupa sifatnya ('sepiawai'). Kita tidak kisah tentang wang kertas yang spesifik di dalam dompet fizikal kita, kerana semuanya serupa dan sama nilainya. Bagaimanapun, kita _tentu_ akan kisah tentang NFT spesifik yang dimiliki, kerana kesemua aset mempunyai sifat tersendiri yang membezakan satu NFT dari yang lain ('tidak sepiawai').

Keunikan setiap NFT membolehkan benda seperti karya seni, item koleksi ataupun hartanah ditukar menjadi token, iaitu satu NFT unik yang khusus mewakili item dunia nyata atau item digital yang unik. Pemilikan sesuatu aset dijamin oleh blok rantai Ethereum – tiada siapa dapat mengubah rekod pemilikan atau menyalin/menampal sesuatu NFT baharu sehingga wujud.

<YouTube id="Xdkkux6OxfM" />

## Aset Internet {#internet-of-assets}

NFT dan Ethereum menyelesaikan beberapa masalah yang wujud dalam internet hari ini. Apabila segala-galanya menghampiri digitalisasi, terdapat keperluan untuk meniru sifat item fizikal seperti kekurangan, keunikan dan bukti pemilikan. dengan cara yang tidak dikawal oleh satu organisasi pusat. Sebagai contoh, dengan NFT, anda boleh memiliki muzik mp3 yang tidak spesifik hanya kepada aplikasi muzik milik sebuah syarikat, atau anda boleh memiliki nama pengguna di media sosial yang anda boleh tukarkan atau jual, tetapi penyedia platform tidak boleh merampasnya daripada anda.

Beginilah rupa internet NFT jika dibandingkan dengan internet yang kita guna masa kini...

### Satu perbandingan {#nft-comparison}

| Internet NFT                                                                                                                           | Internet masa kini                                                                                                                                                       |
| -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Aset anda adalah milik anda! Hanya anda yang boleh menjual atau menukarkannya.                                                         | Anda menyewa aset daripada organisasi tertentu.                                                                                                                          |
| Setiap NFT adalah unik dari segi digital, tidak ada dua NFT yang sama.                                                                 | Salinan suatu entiti selalunya tidak dapat dibezakan daripada yang asal.                                                                                                 |
| Pemilikan sesuatu NFT disimpan di dalam blok rantai untuk disahkan oleh sesiapa.                                                       | Rekod pemilikan barangan digital disimpan pada pelayan yang dikawal oleh institusi tertentu – anda terpaksa mempercayai mereka.                                          |
| NFT ialah kontrak pintar di Ethereum. Ini bermakna ia boleh digunakan dalam kontrak pintar dan aplikasi lain di Ethereum dengan mudah! | Syarikat dengan item digital biasanya memerlukan infrastruktur "taman terkawal" sendiri.                                                                                 |
| Pencipta kandungan boleh menjual karya mereka di mana-mana dan boleh mengakses pasaran global.                                         | Pencipta kandungan bergantung kepada pengagihan dan infrastruktur platform yang mereka guna. Semua ini seringkali tertakluk pada terma dan syarat juga batasan geografi. |
| Pencipta NFT boleh mengekalkan hak pemilikan ke atas hasil kerja mereka, dan boleh menetapkan royalti terus dalam kontrak NFT mereka.  | Platform seperti perkhidmatan penstriman muzik mengekalkan sebahagian besar keuntungan daripada penjualan.                                                               |

## Bagaimana NFT berfungsi? {#how-nfts-work}

Seperti mana-mana token yang dikeluarkan di Ethereum, NFT juga dikeluarkan melalui kontrak pintar. Kontrak pintar ini mematuhi satu daripada beberapa piawai NFT (Biasanya ERC-721 atau ERC-1155) yang mentakrifkan fungsi kontrak itu. Kontrak itu boleh mencipta ('menempa') NFT dan memperuntukkan NFT itu kepada pemilik tertentu. Pemilikan ditakrifkan dalam kontrak dengan memetakan NFT tertentu kepada alamat tertentu. Setiap NFT mempunyai ID dan biasanya metadata yang dikaitkan dengannya menjadikan token itu unik.

Apabila seseorang mencipta atau menempa NFT, mereka sebenarnya melaksanakan fungsi didalam kontrak pintar yang menetapkan sesuatu NFT kepada alamat spesifik. Maklumat ini disimpan dalam storan kontrak, iaitu sebahagian daripada blok rantai. Pencipta kontrak boleh menetapkan logik tambahan ke dalam kontrak, contohnya mengehadkan jumlah bekalan atau menentukan royalti untuk dibayar kepada pencipta setiap kali token itu dipindahkan.

## Apakah kegunaan NFT? {#nft-use-cases}

NFT digunakan untuk banyak perkara, termasuk:

- membuktikan bahawa anda menghadiri acara
- mengesahkan bahawa anda telah menamatkan kursus
- barangan yang boleh dimiliki untuk permainan
- karya seni digital
- menjana token untuk aset dunia nyata
- membuktikan identiti dalam talian anda
- mengehadkan akses kepada kandungan
- pembelian tiket
- nama untuk domain internet ternyahpusat
- cagaran dalam DeFi

Mungkin anda seorang artis yang ingin berkongsi hasil kerja menggunakan NFT, tanpa hilang kawalan atau mengorbankan keuntungan kepada orang tengah. Anda boleh mencipta kontrak baharu dan menentukan bilangan NFT, sifat NFT itu dan pautan kepada karya seni tertentu. Sebagai artis, anda boleh memprogramkan royalti yang sepatutnya dibayar ke dalam kontrak pintar (memindah 5% daripada harga jualan kepada pemilik kontrak cerdas setiap kali NFT itu dipindahkan). Anda juga boleh sentiasa membuktikan bahawa anda mencipta NFT itu kerana anda memiliki dompet yang mencipta kontrak tersebut. Pembeli anda boleh mengesahkan bahawa mereka memiliki NFT yang asli daripada koleksi anda dengan mudah kerana alamat dompet mereka dikaitkan dengan token dalam kontrak pintar anda. Mereka boleh menggunakannya dalam ekosistem Ethereum, yakin dengan keasliannya.

Atau bayangkan tiket ke acara sukan. Sepertimana penganjur acara boleh memilih bilangan tiket untuk dijual, pencipta sesuatu NFT juga boleh memilih bilangan replika yang boleh wujud. Kadangkala ini merupakan replika yang tepat, seperti 5000 tiket Kemasukan Am. Kadangkala beberapa akan ditempa kelihatan serupa, tetapi setiap satu berbeza sedikit, seperti tiket dengan tempat duduk yang ditetapkan. Ia boleh dibeli dan dijual secara perangkai padan tanpa membayar pengendali tiket dan pembeli juga sentiasa mempunyai jaminan keaslian tiket dengan menyemak alamat kontrak.

Di ethereum.org, NFT digunakan untuk menunjukkan bahawa orang telah menyumbang kepada repositori GitHub kami atau memenuhi panggilan, dan kami juga mempunyai nama domain NFT kami sendiri. Jika anda menyumbang kepada ethereum.org, anda boleh menuntut NFT POAP. Beberapa perjumpaan kripto telah menggunakan POAP sebagai tiket. [Maklumat lanjut tentang penyumbangan.](/contributing/#poap).

![POAP ethereum.org](./poap.png)

Laman web ini juga mempunyai nama domain alternatif yang didayakan oleh NFT, **ethereum.eth**. Alamat `.org` kami diuruskan secara berpusat oleh penyedia sistem nama domain (DNS), manakala ethereum`.eth` eth didaftarkan di Ethereum melalui Perkhidmatan Nama Ethereum (ENS). Ia dimiliki dan diurus oleh kami. [Semak rekod ENS kami](https://app.ens.domains/name/ethereum.eth)

[Lebih lanjut mengenai ENS](https://app.ens.domains)

<Divider />

### Keselamatan NFT {#nft-security}

Keselamatan Ethereum adalah berasaskan bukti penaruhan. Sistem ini direka untuk menghalang tindakan berniat jahat secara ekonomi, menjadikan Ethereum kalis usikan. Ini yang membolehkan NFT wujud. Setelah blok yang mengandungi transaksi NFT anda dimuktamadkan, penyerang memerlukan berjuta-juta ETH untuk mengubahnya. Sesiapa yang menjalankan perisian Ethereum akan dapat mengesan usikan yang tidak jujur pada NFT secara serta-merta, dan pelaku jahat itu akan dihukum dari segi ekonomi dan dibuang.

Isu keselamatan berhubung dengan NFT paling kerap berkaitan dengan penipuan pancingan data, kelemahan kontrak pintar atau kesilapan pengguna (seperti mendedahkan kunci persendirian secara tidak sengaja), oleh itu keselamatan dompet yang mantap adalah amat penting bagi pemilik NFT.

<ButtonLink href="/security/">
  Maklumat lanjut tentang keselamatan
</ButtonLink>

## Bacaan lanjut {#further-reading}

- [Panduan pengguna baharu untuk NFT](https://linda.mirror.xyz/df649d61efb92c910464a4e74ae213c4cab150b9cbcc4b7fb6090fc77881a95d) – _Linda Xie, Januari 2020_
- [Penjejak NFT Etherscan](https://etherscan.io/nft-top-contracts)
- [Piawai token ERC-721](/developers/docs/standards/tokens/erc-721/)
- [Piawai token ERC-1155](/developers/docs/standards/tokens/erc-1155/)

<Divider />

<QuizWidget quizKey="nfts" />
