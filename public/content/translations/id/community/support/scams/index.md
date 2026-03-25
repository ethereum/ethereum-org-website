---
title: Bantuan & pelaporan penipuan
description: Apa yang harus dilakukan jika Anda telah ditipu, cara mengamankan aset Anda yang tersisa, dan ke mana harus melaporkan penipuan.
lang: id
---

# Saya ditipu atau kehilangan dana {#scam-help}

Penipuan mata uang kripto menargetkan orang-orang dari semua tingkat pengalaman, termasuk profesional di bidang keuangan dan teknologi. Anda tidak sendirian, dan berada di sini adalah langkah pertama yang tepat.

<Alert variant="error">
<AlertEmoji text=":rotating_light:"/>
<AlertContent>
<AlertDescription>

**Tidak ada yang dapat membatalkan transaksi blockchain.** Jika seseorang menghubungi Anda dan mengklaim bahwa mereka dapat memulihkan dana Anda dengan imbalan biaya, itu hampir pasti merupakan penipuan kedua. Lihat [penipuan pemulihan](#recovery-scams) di bawah ini.
</AlertDescription>
</AlertContent>
</Alert>

## Amankan aset Anda yang tersisa {#secure-assets}

Jika Anda berinteraksi dengan penipu atau curiga dompet Anda telah disusupi, segera ambil langkah-langkah berikut:

1. **Pindahkan dana yang tersisa** ke dompet baru yang aman dan tidak dapat diakses oleh penipu
2. **Cabut persetujuan token.** Penipu sering kali mengelabui Anda agar menyetujui pengeluaran token tanpa batas. Mencabut izin ini mencegah pengurasan dompet Anda lebih lanjut
3. **Ubah kata sandi** pada akun bursa mana pun yang mungkin tertaut
4. **Aktifkan autentikasi dua faktor (2FA)** pada semua akun yang terkait dengan kripto

### Cara mencabut persetujuan token {#revoke-approvals}

Saat Anda berinteraksi dengan dapp atau kontrak pintar, Anda mungkin telah memberikannya izin untuk membelanjakan token Anda. Jika penipu mengelabui Anda agar menyetujui kontrak berbahaya, mereka dapat terus menguras token Anda bahkan setelah penipuan awal.

Gunakan alat-alat ini untuk memeriksa dan mencabut persetujuan:

- [Revoke.cash](https://revoke.cash/): hubungkan dompet Anda untuk melihat semua persetujuan aktif dan mencabutnya
- [Revokescout](https://revoke.blockscout.com/): periksa dan cabut persetujuan melalui Blockscout
- [Etherscan Token Approval Checker](https://etherscan.io/tokenapprovalchecker): periksa dan cabut persetujuan melalui Etherscan

<DocLink href="/guides/how-to-revoke-token-access/">
  Panduan langkah demi langkah: Cara mencabut akses token
</DocLink>

## Laporkan alamat dan situs web penipuan {#report}

Pelaporan membantu memperingatkan pengguna lain dan dapat membantu penyelidikan penegak hukum. Dokumentasikan semuanya: hash transaksi, alamat dompet, tangkapan layar, dan komunikasi apa pun dengan penipu.

### Laporkan alamat penipuan {#report-address}

- [Chainabuse](https://www.chainabuse.com/): basis data pelaporan penipuan dan kecurangan yang digerakkan oleh komunitas. Kirim laporan dan cari alamat penipuan yang diketahui
- [Etherscan report](https://info.etherscan.com/report-address/): tandai alamat di penjelajah blok Ethereum yang paling banyak digunakan
- [CryptoScamDB](https://cryptoscamdb.org/): basis data sumber terbuka yang melacak penipuan mata uang kripto

### Laporkan situs web atau akun media sosial penipuan {#report-website}

- [PhishTank](https://phishtank.org/): kirim dan verifikasi URL phishing
- [Google Safe Browsing](https://safebrowsing.google.com/safebrowsing/report_phish/): laporkan situs phishing ke Google agar diblokir di Chrome dan peramban lainnya
- [Netcraft](https://report.netcraft.com/report/mistake): laporkan situs web berbahaya dan curang
- Laporkan langsung di platform media sosial tempat penipuan terjadi (Twitter/X, Discord, Telegram semuanya memiliki fitur pelaporan)

### Laporkan ke penegak hukum {#report-law-enforcement}

- **Amerika Serikat:** [FBI Internet Crime Complaint Center (IC3)](https://www.ic3.gov/)
- **Inggris Raya:** [Action Fraud](https://www.actionfraud.police.uk/)
- **Uni Eropa:** [Europol](https://www.europol.europa.eu/report-a-crime)
- **Negara lain:** ajukan laporan ke polisi setempat Anda. Penipuan mata uang kripto adalah kejahatan di sebagian besar yurisdiksi

## Analisis apa yang terjadi {#analyze}

Memahami ke mana dana Anda pergi dapat membantu pelaporan dan mungkin mendukung upaya pemulihan jika dana tersebut mendarat di bursa terpusat.

- [Blockscout](https://eth.blockscout.com/): penjelajah blok sumber terbuka untuk mencari hash transaksi atau alamat dompet apa pun untuk melihat ke mana dana dikirim
- [Etherscan](https://etherscan.io/): cari hash transaksi atau alamat dompet apa pun untuk melihat ke mana dana dikirim
- [Chainabuse lookup](https://www.chainabuse.com/): periksa apakah suatu alamat telah dilaporkan oleh korban lain
- [MetaSleuth](https://metasleuth.io/) oleh BlockSec: alat pelacakan transaksi visual yang memetakan aliran dana

**Jika dana dikirim ke bursa terpusat** (seperti Coinbase, Binance, Kraken), segera hubungi tim dukungan mereka dengan detail transaksi. Bursa terkadang dapat membekukan akun yang ditandai karena penipuan.

## Kenyataan pahit {#hard-truth}

Karena Ethereum terdesentralisasi, tidak ada otoritas pusat yang dapat membatalkan transaksi atau memulihkan dana yang dicuri. Setelah transaksi dikonfirmasi di blockchain, transaksi tersebut bersifat final.

Pelaporan tetap berharga. Laporan membantu penegak hukum melacak sindikat penipuan terorganisir, dan menandai alamat di Chainabuse dan Etherscan memperingatkan calon korban di masa mendatang.

## Jenis penipuan yang harus diwaspadai {#scam-types}

<ExpandableCard
title="Penipuan giveaway dan airdrop"
contentPreview="Tidak ada yang membagikan ETH gratis. Penawaran ini selalu merupakan penipuan."
eventCategory="SupportScamPage"
eventName="clicked giveaway scam"
>

Penipu membuat giveaway palsu yang menjanjikan untuk melipatgandakan ETH Anda atau memberi Anda token gratis. Mereka sering kali menyamar sebagai tokoh terkenal seperti Vitalik Buterin. Jika Anda mengirim ETH ke alamat "giveaway", Anda tidak akan menerima apa pun kembali.

**Ingat:** Vitalik dan tokoh terkemuka lainnya tidak akan pernah meminta Anda untuk mengirimi mereka ETH.

[Lebih lanjut tentang penipuan umum](/security/#common-scams)
</ExpandableCard>

<ExpandableCard
title="Peniruan identitas dan dukungan palsu"
contentPreview="Tidak ada seorang pun dari Ethereum atau ethereum.org yang akan menghubungi Anda terlebih dahulu."
eventCategory="SupportScamPage"
eventName="clicked impersonation scam"
>

Penipu menyamar sebagai anggota tim Ethereum, moderator, atau agen dukungan di Discord, Telegram, dan media sosial. Mereka mungkin mengirimi Anda pesan langsung yang menawarkan bantuan atau mengklaim ada masalah dengan akun Anda.

**Ingat:**

- Tidak ada "tim dukungan Ethereum"
- Moderator asli tidak akan pernah mengirim DM kepada Anda terlebih dahulu
- Jangan pernah membagikan frasa seed atau kunci pribadi Anda kepada siapa pun, untuk alasan apa pun
- Jangan pernah mengeklik tautan yang dikirim dalam pesan yang tidak diminta
</ExpandableCard>

<ExpandableCard
title="Penipuan pemulihan"
contentPreview="Setelah ditipu, waspadalah terhadap 'pakar pemulihan kripto' palsu."
eventCategory="SupportScamPage"
eventName="clicked recovery scam"
>

Penipuan pemulihan secara khusus menargetkan orang-orang yang telah kehilangan dana. Penipu memantau media sosial untuk mencari orang-orang yang berbicara tentang penipuan, lalu menghubungi mereka dengan menyamar sebagai "penyelidik blockchain" atau "pakar pemulihan kripto."

Mereka berjanji untuk melacak dan memulihkan kripto Anda yang dicuri dengan biaya di muka. Setelah Anda membayar, mereka menghilang.

**Tidak ada layanan sah yang dapat membatalkan transaksi blockchain.** Siapa pun yang menjanjikan hal ini berbohong. Ini adalah salah satu penipuan lanjutan yang paling umum.
</ExpandableCard>

<ExpandableCard
title="Situs web phishing dan aplikasi palsu"
contentPreview="Situs penipuan meniru dompet dan bursa asli untuk mencuri kredensial Anda."
eventCategory="SupportScamPage"
eventName="clicked phishing scam"
>

Situs phishing terlihat identik dengan aplikasi dompet, bursa, atau platform DeFi asli. Mereka mengelabui Anda agar memasukkan frasa seed atau menghubungkan dompet Anda, lalu menguras dana Anda.

**Lindungi diri Anda:**

- Selalu verifikasi URL sebelum menghubungkan dompet Anda
- Tandai situs resmi yang rutin Anda gunakan
- Jangan pernah memasukkan frasa seed Anda di situs web mana pun. Aplikasi yang sah tidak pernah memintanya
- Gunakan [PhishTank](https://phishtank.org/) untuk memeriksa URL yang mencurigakan

<DocLink href="/guides/how-to-id-scam-tokens/">
  Cara mengidentifikasi token penipuan
</DocLink>
</ExpandableCard>

<DocLink href="/security/">
  Panduan lengkap tentang keamanan Ethereum dan pencegahan penipuan
</DocLink>