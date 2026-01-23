---
title: Penaruhan Ulang
metaTitle: Apa itu penaruhan ulang? | Manfaat dan penggunaan penaruhan ulang
description: Gunakan ETH yang ditaruhkan untuk mengamankan layanan terdesentralisasi lainnya dan dapatkan imbalan tambahan.
lang: id
template: use-cases
emoji: ":recycle:"
image: /images/use-cases/restaking.png
alt: Representasi visual penaruhan ulang di Ethereum.
sidebarDepth: 2
summaryPoint1: Gunakan ETH yang ditaruhkan untuk mengamankan layanan terdesentralisasi lainnya dan dapatkan imbalan tambahan.
buttons:
  - content: Apa itu penaruhan ulang?
    toId: what-is-restaking
  - content: Bagaimana cara kerjanya?
    toId: how-does-restaking-work
    isSecondary: false
---

Jaringan Ethereum mengamankan nilai miliaran dolar 24/7, 365. Bagaimana?

Orang-orang di seluruh dunia mengunci (atau “menaruhkan”) [ether (ETH)](/eth/) di dalam kontrak pintar untuk menjalankan perangkat lunak yang memproses transaksi Ethereum dan mengamankan jaringan Ethereum. Sebagai imbalannya, mereka mendapatkan imbalan ETH tambahan.

Penaruhan ulang adalah teknologi yang dibuat untuk [para penaruh](/staking/) untuk memperluas keamanan ini ke layanan, aplikasi, atau jaringan lain. Sebagai imbalannya, mereka mendapatkan imbalan penaruhan ulang tambahan. Namun, mereka juga menempatkan ETH yang mereka taruhkan pada risiko yang lebih besar.

**Penjelasan penaruhan ulang dalam 18 menit**

<YouTube id="rOJo7VwPh7I" />

## Apa itu penaruhan ulang? {#what-is-restaking}

Penaruhan ulang adalah saat para penaruh menggunakan ETH yang sudah mereka taruhkan untuk mengamankan layanan terdesentralisasi lainnya. Sebagai imbalannya, para penaruh ulang dapat memperoleh imbalan tambahan dari layanan lain tersebut di atas imbalan penaruhan ETH reguler mereka.

Layanan terdesentralisasi yang diamankan dengan penaruhan ulang dikenal sebagai "Actively Validated Services" (AVS).
Sama seperti banyak penaruh ETH yang menjalankan perangkat lunak validasi Ethereum, banyak penaruh ulang yang menjalankan perangkat lunak AVS khusus.

<br/>
<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Baik untuk diketahui</strong></p>
  <p className="mt-2">Meskipun "Actively Validated Services" (AVS) adalah yang paling umum, platform penaruhan ulang yang berbeda mungkin menggunakan nama lain untuk layanan terdesentralisasi yang mereka bantu amankan, seperti "Autonomously Validated Services", "Distributed Secure Services", atau "Jaringan."</p>
</AlertDescription>
</AlertContent>
</Alert>

## Penaruhan vs penaruhan ulang {#staking-vs-restaking}

| Penaruhan                               | Penaruhan Ulang                                             |
| --------------------------------------- | ----------------------------------------------------------- |
| Dapatkan imbalan ETH                    | Dapatkan Imbalan ETH + imbalan AVS                          |
| Mengamankan jaringan Ethereum           | Mengamankan jaringan Ethereum + AVS                         |
| Tidak ada ETH minimum                   | Tidak ada ETH minimum                                       |
| Tingkat risiko rendah                   | Tingkat risiko rendah hingga tinggi                         |
| Waktu penarikan tergantung pada antrean | Waktu penarikan tergantung pada antrean + periode unbonding |

## Mengapa kita membutuhkan penaruhan ulang? {#why-do-we-need-restaking}

Bayangkan dua dunia; satu dengan penaruhan ulang dan satu tanpanya.

 <TabbedSection />

Di dunia dengan penaruhan ulang ini, baik AVS maupun penaruh mendapat manfaat karena dapat menemukan satu sama lain dan menukarkan keamanan dengan imbalan tambahan.

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Manfaat tambahan dari penaruhan ulang</strong></p>
  <p className="mt-2">AVS dapat mencurahkan semua sumber daya mereka untuk membangun dan memasarkan layanan mereka, alih-alih terganggu dengan desentralisasi dan keamanan.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Bagaimana cara kerja penaruhan ulang? {#how-does-restaking-work}

Ada beberapa entitas yang terlibat dalam penaruhan ulang — masing-masing memainkan peran penting.

| **Istilah**                  | **Deskripsi**                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Platform penaruhan ulang** | Platform penaruhan ulang adalah layanan yang menghubungkan AVS, penaruh ETH, dan operator. Mereka membangun aplikasi terdesentralisasi bagi para penaruh untuk melakukan penaruhan ulang ETH mereka, dan marketplace tempat para penaruh, AVS, dan operator dapat menemukan satu sama lain.                                                                                                                                           |
| **Penaruh ulang asli**       | Orang-orang yang menaruhkan ETH mereka dengan menjalankan validator Ethereum mereka sendiri dapat menghubungkan ETH yang mereka taruhkan ke platform penaruhan ulang, termasuk EigenLayer dan lainnya, untuk mendapatkan imbalan penaruhan ulang di atas imbalan validator ETH.                                                                                                                                                                       |
|                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Penaruh ulang likuid**     | Orang yang menaruhkan ETH mereka melalui penyedia penaruhan likuid pihak ketiga, seperti Lido atau Rocket Pool, mendapatkan Token Penaruhan Likuid (LST) yang mewakili ETH yang mereka taruhkan. Mereka dapat melakukan penaruhan ulang LST ini untuk mendapatkan imbalan penaruhan ulang sambil menjaga agar ETH asli mereka tetap ditaruhkan.                                                                    |
|                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Operator**                 | Operator menjalankan perangkat lunak penaruhan ulang AVS, melakukan tugas validasi yang dibutuhkan setiap AVS. Operator biasanya adalah penyedia layanan profesional yang menjamin hal-hal seperti waktu aktif dan kinerja. Seperti penaruh ulang non-operator, operator menggunakan ETH yang ditaruhkan untuk mengamankan AVS, tetapi operator juga menerima imbalan tambahan sebagai imbalan atas pekerjaan mereka. |
|                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **AVS**                      | Ini adalah layanan terdesentralisasi — seperti oracle harga, jembatan token, dan sistem data — yang menerima keamanan dari para penaruh ulang dan menawarkan imbalan token sebagai imbalannya.                                                                                                                                                                                                                                                        |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Baik untuk diketahui</strong></p>
  <p className="mt-2">Penaruh ulang asli dan likuid sering kali mendelegasikan ETH yang mereka taruhkan ke operator, alih-alih menjalankan sendiri perangkat lunak untuk mengamankan AVS.</p>
  <p className="mt-2">Dengan cara ini, mereka tidak perlu khawatir tentang persyaratan teknis yang rumit dari AVS, meskipun mereka menerima tingkat imbalan yang lebih rendah daripada operator.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Apa saja contoh penaruhan ulang? {#what-are-some-examples-of-restaking}

Meskipun merupakan ide baru, beberapa proyek telah muncul untuk mengeksplorasi kemungkinan penaruhan ulang.

<RestakingList/>

<br/>

<Alert variant="warning" className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Peringatan salah kaprah</strong></p>
  <p className="mt-2">Beberapa orang keliru menganggap "penaruhan ulang" sama dengan memberi dan meminjam LST di DeFi. Keduanya memanfaatkan ETH yang ditaruhkan, tetapi penaruhan ulang berarti mengamankan AVS, bukan hanya mendapatkan imbal hasil dari LST.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Berapa banyak yang bisa saya hasilkan dari penaruhan ulang? {#how-much-can-i-make-from-restaking}

Meskipun AVS menawarkan suku bunga yang berbeda, Token Penaruhan Ulang Likuid (LRT) seperti eETH memberi Anda gambaran tentang berapa banyak yang dapat Anda hasilkan. Sama seperti Anda mendapatkan LST seperti stETH untuk menaruhkan ETH Anda, Anda bisa mendapatkan LRT seperti eETH untuk melakukan penaruhan ulang stETH. Token ini menghasilkan imbalan penaruhan ETH dan penaruhan ulang.

**Penting untuk menyadari risiko yang terkait dengan penaruhan ulang. Potensi imbalannya bisa menarik, tetapi tidak bebas risiko.**

## Apa saja risiko penaruhan ulang? {#what-are-the-risks-of-restaking}

| **Risiko**                                         | **Deskripsi**                                                                                                                                                                                                  |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Penalti (atau “pemotongan”)** | Seperti penaruhan ETH, jika penaruh ulang/operator offline, menyensor pesan, atau mencoba merusak jaringan, stake mereka dapat dipotong (dibakar) sebagian atau seluruhnya. |
| **Sentralisasi**                                   | Jika beberapa operator mendominasi sebagian besar penaruhan ulang, mereka dapat memiliki pengaruh besar pada penaruh ulang, AVS, dan bahkan platform penaruhan ulang.                          |
| **Reaksi berantai**                                | Jika seorang penaruh ulang terkena pemotongan (slashing) saat mengamankan beberapa AVS, hal ini dapat menurunkan keamanan untuk AVS lain, membuat mereka menjadi rentan.    |
| **Akses langsung ke dana**                         | Ada waktu tunggu (atau “periode unbonding”) untuk menarik ETH yang dilakukan penaruhan ulang, jadi Anda mungkin tidak selalu dapat mengaksesnya secara langsung.            |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Salah satu pendiri Ethereum sedang mengetik…</strong></p>
  <p className="mt-2">
    Vitalik, salah satu pendiri Ethereum, memperingatkan tentang potensi risiko penaruhan ulang dalam postingan blog tahun 2021 yang berjudul <a href = "https://vitalik.eth.limo/general/2023/05/21/dont_overload.html"> Jangan Terlalu Membebani Konsensus.</a> </a>  
</p>
</AlertDescription>
</AlertContent>
</Alert>

## Bagaimana cara memulai penaruhan ulang? {#how-to-get-started-with-restaking}

| 🫡 Pemula                                                                                                                | 🤓 Pengguna Tingkat Lanjut                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| 1. Taruhkan ETH di platform seperti Lido atau Rocket Pool untuk mendapatkan LST.  | 1. Taruhkan ETH Anda sebagai validator di Ethereum.                                      |
| 2. Gunakan LST tersebut untuk memulai penaruhan ulang di layanan penaruhan ulang. | 2. Bandingkan layanan penaruhan ulang seperti EigenLayer, Symbiotic, dan lainnya.        |
|                                                                                                                          | 3. Ikuti instruksi untuk menghubungkan validator Anda ke kontrak pintar penaruhan ulang. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":eyes:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Penaruhan Ethereum:</strong> Bagaimana cara kerjanya?</p>
  <ButtonLink href="/staking/">
    Pelajari Selengkapnya
  </ButtonLink>
</AlertDescription>
</AlertContent>
</Alert>

## Lanjutan {#advanced}

<YouTube id="-V-fG4J1N_M" />

## Bacaan lebih lanjut {#further-reading}

1. [ethereum.org - panduan penaruhan ETH](https://ethereum.org/en/staking/)
2. [Ledger Academy - Apa Itu Penaruhan Ulang Ethereum?](https://www.ledger.com/academy/what-is-ethereum-restaking)
3. [Consensys - EigenLayer: Penjelasan Protokol Penaruhan Ulang Ethereum Terdesentralisasi](https://consensys.io/blog/eigenlayer-decentralized-ethereum-restaking-protocol-explained)
4. [Vitalik Buterin - Jangan terlalu membebani konsensus Ethereum](https://vitalik.eth.limo/general/2023/05/21/dont_overload.html)
5. [Cointelegraph - Apa itu EigenLayer? Penjelasan protokol penaruhan ulang Ethereum](https://cointelegraph.com/explained/what-is-eigenlayer-ethereums-restaking-protocol-explained)
6. [a16z crypto research - EigenLayer: Penambahan Fitur Tanpa Izin ke Ethereum bersama Sreeram Kannan](https://www.youtube.com/watch?v=-V-fG4J1N_M)
7. [Junion - Penjelasan EigenLayer: Apa itu Penaruhan Ulang?](https://www.youtube.com/watch?v=5r0SooSQFJg)
8. [The Block - Dasbor Data Penaruhan Ulang](https://www.theblock.co/data/decentralized-finance/restaking)
