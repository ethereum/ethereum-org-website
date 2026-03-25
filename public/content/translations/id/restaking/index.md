---
title: Restaking
metaTitle: Apa itu restaking? | Manfaat dan penggunaan restaking
description: Gunakan ETH yang di-stake untuk mengamankan layanan terdesentralisasi lainnya dan dapatkan hadiah tambahan.
lang: id
template: use-cases
emoji: ":recycle:"
image: /images/use-cases/restaking.png
alt: Representasi visual dari restaking di Ethereum.
sidebarDepth: 2
summaryPoint1: Gunakan ETH yang di-stake untuk mengamankan layanan terdesentralisasi lainnya dan dapatkan hadiah tambahan.
buttons:
  - content: Apa itu restaking?
    toId: what-is-restaking
  - content: Bagaimana cara kerjanya?
    toId: how-does-restaking-work
    isSecondary: false
---

Jaringan Ethereum mengamankan nilai miliaran dolar 24/7, 365 hari. Bagaimana caranya?

Orang-orang di seluruh dunia mengunci (atau melakukan “stake”) [ether (ETH)](/what-is-ether/) dalam kontrak pintar untuk menjalankan perangkat lunak yang memproses transaksi Ethereum dan mengamankan jaringan Ethereum. Sebagai imbalannya, mereka mendapatkan hadiah berupa lebih banyak ETH.

Restaking adalah teknologi yang dibangun untuk [staker](/staking/) guna memperluas keamanan ini ke layanan, aplikasi, atau jaringan lain. Sebagai imbalannya, mereka mendapatkan hadiah restaking tambahan. Namun, mereka juga menempatkan ETH yang di-stake pada risiko yang lebih besar.

**Penjelasan restaking dalam 18 menit**

<YouTube id="rOJo7VwPh7I" />

## Apa itu restaking? {#what-is-restaking}

Restaking adalah ketika staker menggunakan ETH mereka yang sudah di-stake untuk mengamankan layanan terdesentralisasi lainnya. Sebagai imbalannya, restaker bisa mendapatkan hadiah tambahan dari layanan lain tersebut di atas hadiah mengunci ETH reguler mereka.

Layanan terdesentralisasi yang diamankan oleh restaking dikenal sebagai "Actively Validated Services" (AVS).
Sama seperti banyak staker ETH yang menjalankan perangkat lunak validasi Ethereum, banyak restaker menjalankan perangkat lunak AVS khusus.

<br/>
<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Senang untuk diketahui</strong></p>
  <p className="mt-2">Meskipun "Actively Validated Services" (AVS) adalah yang paling umum, platform restaking yang berbeda mungkin menggunakan nama lain untuk layanan terdesentralisasi yang mereka bantu amankan, seperti "Autonomously Validated Services," "Distributed Secure Services," atau "Networks."</p>
</AlertDescription>
</AlertContent>
</Alert>

## Mengunci vs restaking {#staking-vs-restaking}

| Mengunci                       | Restaking                                         |
| ------------------------------ | ------------------------------------------------- |
| Mendapatkan hadiah ETH         | Mendapatkan hadiah ETH + hadiah AVS               |
| Mengamankan jaringan Ethereum  | Mengamankan jaringan Ethereum + AVS               |
| Tidak ada minimum ETH          | Tidak ada minimum ETH                             |
| Tingkat risiko rendah          | Tingkat risiko rendah hingga tinggi               |
| Waktu penarikan bergantung pada antrean | Waktu penarikan bergantung pada antrean + periode pelepasan ikatan (unbonding) |

## Mengapa kita membutuhkan restaking? {#why-do-we-need-restaking}

Bayangkan dua dunia; satu dengan restaking dan satu tanpa restaking.

 <TabbedSection />

Di dunia dengan restaking ini, baik AVS maupun staker mendapat manfaat karena dapat menemukan satu sama lain dan menukar keamanan dengan hadiah ekstra.

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Manfaat tambahan dari restaking</strong></p>
  <p className="mt-2">AVS dapat mencurahkan seluruh sumber daya mereka untuk membangun dan memasarkan layanan mereka, alih-alih terganggu dengan desentralisasi dan keamanan.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Bagaimana cara kerja restaking? {#how-does-restaking-work}

Ada beberapa entitas yang terlibat dalam restaking — masing-masing memainkan peran penting.

| **Istilah**             | **Deskripsi**                                                                                                                                                                                                                                                                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Platform restaking**  | Platform restaking adalah layanan yang menghubungkan AVS, staker ETH, dan operator. Mereka membangun aplikasi terdesentralisasi bagi staker untuk melakukan restaking ETH mereka, dan pasar tempat staker, AVS, dan operator dapat menemukan satu sama lain.                                                                                      |
| **Restaker asli (native)** | Orang yang melakukan stake ETH mereka dengan menjalankan validator Ethereum mereka sendiri dapat menghubungkan ETH yang di-stake ke platform restaking, termasuk EigenLayer dan lainnya, untuk mendapatkan hadiah restaking di atas hadiah validator ETH.                                                                                         |
| **Restaker likuid**     | Orang yang melakukan stake ETH mereka melalui penyedia liquid staking pihak ketiga, seperti Lido atau Rocket Pool, mendapatkan Liquid Staking Tokens (LST) yang mewakili ETH yang mereka stake. Mereka dapat melakukan restaking LST ini untuk mendapatkan hadiah restaking sambil tetap mempertahankan stake ETH asli mereka.                    |
| **Operator**            | Operator menjalankan perangkat lunak restaking AVS, melakukan tugas validasi yang dibutuhkan setiap AVS. Operator biasanya adalah penyedia layanan profesional yang menjamin hal-hal seperti waktu aktif (uptime) dan kinerja. Seperti restaker non-operator, operator menggunakan ETH yang di-stake untuk mengamankan AVS, tetapi operator juga menerima hadiah ekstra sebagai imbalan atas pekerjaan mereka. |
| **AVS**                 | Ini adalah layanan terdesentralisasi — seperti oracle harga, jembatan token, dan sistem data — yang menerima keamanan dari restaker dan menawarkan hadiah token sebagai imbalannya.                                                                                                                                                               |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Senang untuk diketahui</strong></p>
  <p className="mt-2">Restaker asli dan likuid sering kali mendelegasikan ETH yang di-stake ke operator, alih-alih menjalankan perangkat lunak untuk mengamankan AVS sendiri.</p>
  <p className="mt-2">Dengan cara ini mereka tidak perlu khawatir tentang persyaratan teknis yang rumit dari AVS, meskipun mereka menerima tingkat hadiah yang lebih rendah daripada operator.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Apa saja contoh restaking? {#what-are-some-examples-of-restaking}

Meskipun merupakan ide baru, beberapa proyek telah muncul untuk mengeksplorasi kemungkinan restaking.

<RestakingList/>

<br/>

<Alert variant="warning" className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Peringatan salah kaprah</strong></p>
  <p className="mt-2">Beberapa orang mengacaukan "restaking" dengan meminjamkan dan meminjam LST di DeFi. Keduanya mempekerjakan ETH yang di-stake, tetapi restaking berarti mengamankan AVS, bukan sekadar mendapatkan imbal hasil dari LST.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Berapa banyak yang bisa saya hasilkan dari restaking? {#how-much-can-i-make-from-restaking}

Meskipun AVS menawarkan tingkat yang berbeda, Liquid Restaking Tokens (LRT) seperti eETH memberi Anda gambaran tentang berapa banyak yang bisa Anda hasilkan. Sama seperti Anda mendapatkan LST seperti stETH karena mengunci ETH Anda, Anda bisa mendapatkan LRT seperti eETH karena melakukan restaking stETH. Token ini mendapatkan hadiah mengunci ETH dan restaking.

**Penting untuk mengakui risiko dari restaking. Potensi hadiahnya mungkin menarik, tetapi tidak bebas risiko.**

## Apa saja risiko restaking? {#what-are-the-risks-of-restaking}

| **Risiko**                    | **Deskripsi**                                                                                                                                                  |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hukuman (atau “pemotongan”)** | Seperti mengunci ETH, jika restaker/operator offline, menyensor pesan, atau mencoba merusak jaringan, stake mereka dapat dipotong (dibakar) sebagian atau seluruhnya. |
| **Sentralisasi**              | Jika segelintir operator mendominasi sebagian besar restaking, mereka dapat memiliki pengaruh besar pada restaker, AVS, dan bahkan platform restaking.         |
| **Reaksi berantai**           | Jika seorang restaker dipotong saat mengamankan beberapa AVS, ini dapat menurunkan keamanan untuk AVS lainnya, membuat mereka rentan.                          |
| **Akses langsung ke dana**    | Ada waktu tunggu (atau “periode pelepasan ikatan”) untuk menarik ETH yang di-restake sehingga Anda mungkin tidak selalu memiliki akses dengan segera.          |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Salah satu pendiri Ethereum sedang mengetik…</strong></p>
  <p className="mt-2">
    Vitalik, salah satu pendiri Ethereum, memperingatkan tentang potensi risiko restaking dalam postingan blog tahun 2021 yang berjudul <a href="https://vitalik.eth.limo/general/2023/05/21/dont_overload.html">Don't Overload Consensus.</a>
  </p>
</AlertDescription>
</AlertContent>
</Alert>

## Bagaimana cara memulai restaking? {#how-to-get-started-with-restaking}

| 🫡 Pemula                                                       | 🤓 Pengguna Tingkat Lanjut                                                            |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 1. Stake ETH di platform seperti Lido atau Rocket Pool untuk mendapatkan LST. | 1. Stake ETH Anda sebagai validator di Ethereum.                                      |
| 2. Gunakan LST tersebut untuk memulai restaking di layanan restaking. | 2. Bandingkan layanan restaking seperti EigenLayer, Symbiotic, dan lainnya.           |
|                                                                 | 3. Ikuti instruksi untuk menghubungkan validator Anda ke kontrak pintar restaking.    |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":eyes:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Mengunci Ethereum :</strong> Bagaimana cara kerjanya?</p>
  <ButtonLink href="/staking/">
    Pelajari Lebih Lanjut
  </ButtonLink>
</AlertDescription>
</AlertContent>
</Alert>

## Tingkat Lanjut {#advanced}

<YouTube id="-V-fG4J1N_M" />

## Bacaan lebih lanjut {#further-reading}

1. [ethereum.org - Panduan mengunci ETH](/staking/)
2. [Ledger Academy - What Is Ethereum Restaking?](https://www.ledger.com/academy/what-is-ethereum-restaking)
3. [Consensys - EigenLayer: Decentralized Ethereum Restaking Protocol Explained](https://consensys.io/blog/eigenlayer-decentralized-ethereum-restaking-protocol-explained)
4. [Vitalik Buterin - Don't overload Ethereum's consensus](https://vitalik.eth.limo/general/2023/05/21/dont_overload.html)
5. [Cointelegraph - What is EigenLayer? Ethereum’s restaking protocol explained](https://cointelegraph.com/explained/what-is-eigenlayer-ethereums-restaking-protocol-explained)
6. [a16z crypto research - EigenLayer: Permissionless Feature Addition to Ethereum with Sreeram Kannan](https://www.youtube.com/watch?v=-V-fG4J1N_M)
7. [Junion - EigenLayer Explained: What is Restaking?](https://www.youtube.com/watch?v=5r0SooSQFJg)
8. [The Block - Restaking Data Dash](https://www.theblock.co/data/decentralized-finance/restaking)