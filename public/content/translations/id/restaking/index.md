---
title: Staking Ulang
metaTitle: Apa itu staking ulang? | Manfaat dan penggunaan staking ulang
description: Gunakan ETH yang di-stake untuk mengamankan layanan terdesentralisasi lainnya dan dapatkan imbalan tambahan.
lang: id
template: use-cases
image: /images/use-cases/restaking.png
alt: Representasi visual dari staking ulang di Ethereum.
sidebarDepth: 2
summaryPoints:
  - "Gunakan ETH yang di-stake untuk mengamankan layanan terdesentralisasi lainnya dan dapatkan imbalan tambahan."
buttons:
  - content: Apa itu staking ulang?
    toId: what-is-restaking
  - content: Bagaimana cara kerjanya?
    toId: how-does-restaking-work
    isSecondary: false
---

Jaringan Ethereum mengamankan nilai miliaran dolar 24/7, 365 hari. Bagaimana caranya?

Orang-orang di seluruh dunia mengunci (atau melakukan "stake") [Ether (ETH)](/what-is-ether/) dalam kontrak pintar untuk menjalankan perangkat lunak yang memproses transaksi Ethereum dan mengamankan jaringan Ethereum. Sebagai imbalannya, mereka mendapatkan imbalan berupa lebih banyak ETH.

Staking ulang adalah teknologi yang dibangun untuk [staker](/staking/) guna memperluas keamanan ini ke layanan, aplikasi, atau jaringan lain. Sebagai imbalannya, mereka mendapatkan imbalan staking ulang tambahan. Namun, mereka juga menempatkan ETH yang mereka stake pada risiko yang lebih besar.

**Penjelasan staking ulang dalam 18 menit**

<VideoWatch slug="restaking-explained" />

## Apa itu staking ulang? {#what-is-restaking}

Staking ulang adalah ketika staker menggunakan ETH yang sudah di-stake untuk mengamankan layanan terdesentralisasi lainnya. Sebagai imbalannya, pelaku staking ulang dapat memperoleh imbalan tambahan dari layanan lain tersebut di atas imbalan staking ETH reguler mereka.

Layanan terdesentralisasi yang diamankan dengan staking ulang dikenal sebagai "Actively Validated Services" (AVS).
Sama seperti banyak staker ETH yang menjalankan perangkat lunak validasi Ethereum, banyak pelaku staking ulang menjalankan perangkat lunak AVS khusus.

<br/>
<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Senang untuk diketahui</strong>
  <p className="mt-2">Meskipun "Actively Validated Services" (AVS) adalah yang paling umum, platform staking ulang yang berbeda mungkin menggunakan nama lain untuk layanan terdesentralisasi yang mereka bantu amankan, seperti "Autonomously Validated Services," "Distributed Secure Services," atau "Networks."</p>
</AlertDescription>
</AlertContent>
</Alert>

## Staking vs staking ulang {#staking-vs-restaking}

| Staking                        | Staking ulang                                         |
| ------------------------------ | ------------------------------------------------- |
| Mendapatkan imbalan ETH               | Mendapatkan imbalan ETH + imbalan AVS                    |
| Mengamankan jaringan Ethereum   | Mengamankan jaringan Ethereum + AVS               |
| Tidak ada minimum ETH                 | Tidak ada minimum ETH                                    |
| Tingkat risiko rendah                 | Tingkat risiko rendah hingga tinggi                            |
| Waktu penarikan bergantung pada antrean | Waktu penarikan bergantung pada antrean + periode pelepasan ikatan (unbonding) |

## Mengapa kita membutuhkan staking ulang? {#why-do-we-need-restaking}

Bayangkan dua dunia; satu dengan staking ulang dan satu tanpa staking ulang.

 <TabbedSection />

Di dunia dengan staking ulang ini, baik AVS maupun staker mendapat manfaat karena dapat menemukan satu sama lain dan menukar keamanan dengan imbalan ekstra.

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Manfaat tambahan dari staking ulang</strong>
  <p className="mt-2">AVS dapat mencurahkan seluruh sumber daya mereka untuk membangun dan memasarkan layanan mereka, alih-alih terganggu dengan desentralisasi dan keamanan.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Bagaimana cara kerja staking ulang? {#how-does-restaking-work}

Ada beberapa entitas yang terlibat dalam staking ulang — masing-masing memainkan peran penting.

| **Istilah**                | **Deskripsi**                                                                                                                                                                                                                                                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Platform staking ulang** | Platform staking ulang adalah layanan yang menghubungkan AVS, staker ETH, dan operator. Mereka membangun aplikasi terdesentralisasi bagi staker untuk melakukan staking ulang ETH mereka, dan pasar tempat staker, AVS, dan operator dapat menemukan satu sama lain.                                                                                                                |
| **Pelaku staking ulang asli (Native restakers)**    | Orang-orang yang melakukan stake ETH mereka dengan menjalankan validator Ethereum mereka sendiri dapat menghubungkan ETH yang mereka stake ke platform staking ulang, termasuk EigenLayer dan lainnya, untuk mendapatkan imbalan staking ulang di atas imbalan validator ETH.                                                                                                                             |
| **Pelaku staking ulang likuid (Liquid restakers)**    | Orang-orang yang melakukan stake ETH mereka melalui penyedia staking likuid pihak ketiga, seperti Lido atau Rocket Pool, mendapatkan token staking likuid (LST) yang mewakili ETH yang mereka stake. Mereka dapat melakukan staking ulang LST ini untuk mendapatkan imbalan staking ulang sambil tetap mempertahankan stake ETH asli mereka.                                                                                  |
| **Operator**           | Operator menjalankan perangkat lunak staking ulang AVS, melakukan tugas validasi yang diperlukan setiap AVS. Operator biasanya adalah penyedia layanan profesional yang menjamin hal-hal seperti waktu aktif (uptime) dan kinerja. Seperti pelaku staking ulang non-operator, operator menggunakan ETH yang di-stake untuk mengamankan AVS, tetapi operator juga menerima imbalan ekstra sebagai ganti pekerjaan mereka. |
| **AVS**                | Ini adalah layanan terdesentralisasi — seperti oracle harga, jembatan token, dan sistem data — yang menerima keamanan dari pelaku staking ulang dan menawarkan imbalan token sebagai gantinya.                                                                                                                                                                              |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Senang untuk diketahui</strong>
  <p className="mt-2">Pelaku staking ulang asli dan likuid sering kali mendelegasikan ETH yang mereka stake kepada operator, alih-alih menjalankan perangkat lunak untuk mengamankan AVS sendiri.</p>
  <p className="mt-2">Dengan cara ini mereka tidak perlu khawatir tentang persyaratan teknis yang rumit dari AVS, meskipun mereka menerima tingkat imbalan yang lebih rendah daripada operator.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Apa saja contoh staking ulang? {#what-are-some-examples-of-restaking}

Meskipun merupakan ide baru, beberapa proyek telah muncul untuk mengeksplorasi kemungkinan staking ulang.

<RestakingList/>

<br/>

<Alert variant="warning" className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Peringatan salah kaprah</strong>
  <p className="mt-2">Beberapa orang mengacaukan "staking ulang" dengan peminjaman LST di keuangan terdesentralisasi (DeFi). Keduanya mempekerjakan ETH yang di-stake, tetapi staking ulang berarti mengamankan AVS, bukan sekadar mendapatkan hasil dari LST.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Berapa banyak yang bisa saya hasilkan dari staking ulang? {#how-much-can-i-make-from-restaking}

Meskipun AVS menawarkan tingkat yang berbeda, Token Staking Ulang Likuid (LRT) seperti eETH memberi Anda gambaran tentang berapa banyak yang dapat Anda hasilkan. Sama seperti Anda mendapatkan LST seperti stETH karena melakukan staking ETH Anda, Anda bisa mendapatkan LRT seperti eETH karena melakukan staking ulang stETH. Token ini mendapatkan imbalan staking ETH dan staking ulang.

**Penting untuk mengakui risiko dari staking ulang. Potensi imbalannya mungkin menarik, tetapi tidak bebas risiko.**

## Apa saja risiko staking ulang? {#what-are-the-risks-of-restaking}

| **Risiko**                     | **Deskripsi**                                                                                                                                                |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Penalti (atau "pemotongan")** | Seperti staking ETH, jika pelaku staking ulang/operator luring (offline), menyensor pesan, atau mencoba merusak jaringan, stake mereka dapat dipotong (dibakar) sebagian atau seluruhnya. |
| **Sentralisasi**            | Jika segelintir operator mendominasi sebagian besar staking ulang, mereka dapat memiliki pengaruh besar pada pelaku staking ulang, AVS, dan bahkan platform staking ulang.                             |
| **Reaksi berantai**           | Jika pelaku staking ulang terkena pemotongan saat mengamankan beberapa AVS, ini dapat menurunkan keamanan untuk AVS lainnya, sehingga membuatnya rentan.                             |
| **Akses langsung ke dana** | Ada waktu tunggu (atau "periode pelepasan ikatan") untuk menarik ETH yang di-stake ulang sehingga Anda mungkin tidak selalu memiliki akses secara langsung.                                       |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Salah satu pendiri Ethereum sedang mengetik…</strong>
  <p className="mt-2">
    Vitalik, salah satu pendiri Ethereum, memperingatkan tentang potensi risiko staking ulang dalam postingan blog tahun 2021 yang berjudul <a href="https://vitalik.eth.limo/general/2023/05/21/dont_overload.html">Don't Overload Consensus.</a>

</AlertDescription>
</AlertContent>
</Alert>

## Bagaimana cara memulai staking ulang? {#how-to-get-started-with-restaking}

| 🫡 Pemula                                                    | 🤓 Pengguna Tingkat Lanjut                                                                     |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 1. Lakukan stake ETH di platform seperti Lido atau Rocket Pool untuk mendapatkan LST. | 1. Lakukan stake ETH Anda sebagai validator di Ethereum.                                         |
| 2. Gunakan LST tersebut untuk memulai staking ulang di layanan staking ulang.    | 2. Bandingkan layanan staking ulang seperti EigenLayer, Symbiotic, dan lainnya.                  |
|                                                                 | 3. Ikuti petunjuk untuk menghubungkan validator Anda ke kontrak pintar staking ulang. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":eyes:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Staking Ethereum :</strong> Bagaimana cara kerjanya?
  <ButtonLink href="/staking/">
    Pelajari Lebih Lanjut
  </ButtonLink>
</AlertDescription>
</AlertContent>
</Alert>

## Tingkat Lanjut {#advanced}

<VideoWatch slug="eigenlayer-permissionless-features" />

## Bacaan lebih lanjut {#further-reading}

1. [ethereum.org - Panduan staking ETH](/staking/)
2. [Ledger Academy - Apa Itu Staking Ulang Ethereum?](https://www.ledger.com/academy/what-is-ethereum-restaking)
3. [Consensys - EigenLayer: Penjelasan Protokol Staking Ulang Ethereum Terdesentralisasi](https://consensys.io/blog/eigenlayer-decentralized-ethereum-restaking-protocol-explained)
4. [Vitalik Buterin - Jangan membebani konsensus Ethereum](https://vitalik.eth.limo/general/2023/05/21/dont_overload.html)
5. [Cointelegraph - Apa itu EigenLayer? Penjelasan protokol staking ulang Ethereum](https://cointelegraph.com/explained/what-is-eigenlayer-ethereums-restaking-protocol-explained)
6. [a16z crypto research - EigenLayer: Penambahan Fitur Tanpa Izin ke Ethereum bersama Sreeram Kannan](https://www.youtube.com/watch?v=-V-fG4J1N_M)
7. [Junion - Penjelasan EigenLayer: Apa itu Staking Ulang?](https://www.youtube.com/watch?v=5r0SooSQFJg)
8. [The Block - Dasbor Data Staking Ulang](https://www.theblock.co/data/decentralized-finance/restaking)