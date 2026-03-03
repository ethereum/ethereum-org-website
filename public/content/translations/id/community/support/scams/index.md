---
title: Bantuan & pelaporan penipuan
description: Apa yang harus dilakukan jika Anda telah ditipu, cara mengamankan sisa aset Anda, dan di mana harus melaporkan penipuan.
lang: id
---

# Saya ditipu atau kehilangan dana {#scam-help}

Penipuan mata uang kripto menargetkan orang-orang dari semua tingkat pengalaman, termasuk para profesional di bidang keuangan dan teknologi. Anda tidak sendirian, dan berada di sini adalah langkah pertama yang tepat.

<Alert variant="error">
<AlertEmoji text=":rotating_light:"/>
<AlertContent>
<AlertDescription>

**Tidak ada yang bisa membalikkan transaksi blockchain.** Jika seseorang menghubungi Anda dan mengklaim bahwa mereka dapat memulihkan dana Anda dengan biaya tertentu, itu hampir pasti merupakan penipuan kedua. Lihat [penipuan pemulihan](#recovery-scams) di bawah.
</AlertDescription>
</AlertContent>
</Alert>

## Amankan sisa aset Anda {#secure-assets}

Jika Anda berinteraksi dengan penipu atau mencurigai dompet Anda disusupi, segera ambil langkah-langkah berikut:

1. **Pindahkan dana yang tersisa** ke dompet baru yang aman yang tidak dapat diakses oleh penipu
2. **Cabut persetujuan token.** Penipu sering kali menipu Anda untuk menyetujui pembelanjaan token tanpa batas. Mencabut izin ini mencegah pengurasan lebih lanjut dari dompet Anda
3. **Ubah kata sandi** pada akun bursa apa pun yang mungkin tertaut
4. **Aktifkan autentikasi dua faktor (2FA)** di semua akun yang terkait dengan kripto

### Cara mencabut persetujuan token {#revoke-approvals}

Saat Anda berinteraksi dengan dapp atau kontrak pintar, Anda mungkin telah memberinya izin untuk membelanjakan token Anda. Jika seorang penipu menipu Anda untuk menyetujui kontrak jahat, mereka dapat terus menguras token Anda bahkan setelah penipuan awal.

Gunakan alat ini untuk memeriksa dan mencabut persetujuan:

- [Revoke.cash](https://revoke.cash/): hubungkan dompet Anda untuk melihat semua persetujuan aktif dan mencabutnya
- [Revokescout](https://revoke.blockscout.com/): periksa dan cabut persetujuan melalui Blockscout
- [Pemeriksa Persetujuan Token Etherscan](https://etherscan.io/tokenapprovalchecker): periksa dan cabut persetujuan melalui Etherscan

<DocLink href="/guides/how-to-revoke-token-access/">
  Panduan langkah demi langkah: Cara mencabut akses token
</DocLink>

## Laporkan alamat dan situs web penipuan {#report}

Melaporkan membantu memperingatkan pengguna lain dan dapat membantu penyelidikan penegakan hukum. Dokumentasikan semuanya: hash transaksi, alamat dompet, tangkapan layar, dan komunikasi apa pun dengan penipu.

### Laporkan alamat penipuan {#report-address}

- [Chainabuse](https://www.chainabuse.com/): basis data pelaporan penipuan dan kejahatan yang didorong oleh komunitas. Kirim laporan dan cari alamat penipuan yang diketahui
- [Laporan Etherscan](https://info.etherscan.com/report-address/): tandai alamat di penjelajah blok Ethereum yang paling banyak digunakan
- [CryptoScamDB](https://cryptoscamdb.org/): basis data sumber terbuka yang melacak penipuan mata uang kripto

### Laporkan situs web penipuan atau akun media sosial {#report-website}

- [PhishTank](https://phishtank.org/): kirim dan verifikasi URL phishing
- [Penjelajahan Aman Google](https://safebrowsing.google.com/safebrowsing/report_phish/): laporkan situs phishing ke Google agar diblokir di Chrome dan peramban lainnya
- [Netcraft](https://report.netcraft.com/report/mistake): melaporkan situs web jahat dan penipuan
- Laporkan langsung di platform media sosial tempat penipuan terjadi (Twitter/X, Discord, Telegram semuanya memiliki fitur pelaporan)

### Laporkan ke penegak hukum {#report-law-enforcement}

- **Amerika Serikat:** [Pusat Pengaduan Kejahatan Internet FBI (IC3)](https://www.ic3.gov/)
- **Britania Raya:** [Action Fraud](https://www.actionfraud.police.uk/)
- **Uni Eropa:** [Europol](https://www.europol.europa.eu/report-a-crime)
- **Negara lain:** ajukan laporan ke polisi setempat. Penipuan mata uang kripto adalah kejahatan di sebagian besar yurisdiksi

## Analisis apa yang terjadi {#analyze}

Memahami ke mana dana Anda pergi dapat membantu laporan dan dapat mendukung upaya pemulihan jika dana tersebut mendarat di bursa terpusat.

- [Blockscout](https://eth.blockscout.com/): penjelajah blok sumber terbuka untuk mencari hash transaksi atau alamat dompet apa pun untuk melihat ke mana dana dikirim
- [Etherscan](https://etherscan.io/): cari hash transaksi atau alamat dompet apa pun untuk melihat ke mana dana dikirim
- [Pencarian Chainabuse](https://www.chainabuse.com/): periksa apakah suatu alamat telah dilaporkan oleh korban lain
- [MetaSleuth](https://metasleuth.io/) oleh BlockSec: alat pelacakan transaksi visual yang memetakan alur dana

**Jika dana dikirim ke bursa terpusat** (seperti Coinbase, Binance, Kraken), segera hubungi tim dukungan mereka dengan detail transaksi. Bursa terkadang dapat membekukan akun yang ditandai karena penipuan.

## Kenyataan pahit {#hard-truth}

Karena Ethereum terdesentralisasi, tidak ada otoritas pusat yang dapat membalikkan transaksi atau memulihkan dana yang dicuri. Setelah transaksi dikonfirmasi di blockchain, transaksi tersebut bersifat final.

Melaporkan tetap berharga. Laporan membantu penegak hukum melacak jaringan penipuan yang terorganisir, dan menandai alamat di Chainabuse dan Etherscan akan memperingatkan calon korban di masa depan.

## Jenis-jenis penipuan yang harus diwaspadai {#scam-types}

<ExpandableCard
title="Penipuan giveaway dan airdrop"
contentPreview="Tidak ada yang memberikan ETH gratis. Penawaran ini selalu merupakan penipuan."
eventCategory="SupportScamPage"
eventName="clicked giveaway scam"

>

Penipu membuat giveaway palsu yang menjanjikan untuk melipatgandakan ETH Anda atau memberi Anda token gratis. Mereka sering menyamar sebagai tokoh terkenal seperti Vitalik Buterin. Jika Anda mengirim ETH ke alamat "giveaway", Anda tidak akan menerima apa pun kembali.

**Ingat:** Vitalik dan tokoh terkemuka lainnya tidak akan pernah meminta Anda untuk mengirimkan ETH kepada mereka.

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
- Moderator sungguhan tidak akan pernah mengirimi Anda DM terlebih dahulu
- Jangan pernah membagikan frase benih atau kunci pribadi Anda kepada siapa pun, dengan alasan apa pun
- Jangan pernah mengeklik tautan yang dikirim dalam pesan yang tidak diminta
</ExpandableCard>

<ExpandableCard
title="Penipuan pemulihan"
contentPreview="Setelah ditipu, waspadai 'ahli pemulihan kripto' palsu."
eventCategory="SupportScamPage"
eventName="clicked recovery scam"

>

Penipuan pemulihan secara khusus menargetkan orang-orang yang telah kehilangan dana. Penipu memantau media sosial untuk mencari orang-orang yang membicarakan tentang ditipu, lalu menghubungi mereka dengan menyamar sebagai "penyelidik blockchain" atau "ahli pemulihan kripto."

Mereka berjanji untuk melacak dan memulihkan kripto Anda yang dicuri dengan biaya di muka. Setelah Anda membayar, mereka menghilang.

**Tidak ada layanan sah yang dapat membalikkan transaksi blockchain.** Siapa pun yang menjanjikan hal ini berarti berbohong. Ini adalah salah satu penipuan tindak lanjut yang paling umum.
</ExpandableCard>

<ExpandableCard
title="Situs web phishing dan aplikasi palsu"
contentPreview="Situs penipuan meniru dompet dan bursa asli untuk mencuri kredensial Anda."
eventCategory="SupportScamPage"
eventName="clicked phishing scam"

>

Situs phishing terlihat identik dengan aplikasi dompet, bursa, atau platform DeFi asli. Mereka menipu Anda untuk memasukkan frase benih Anda atau menghubungkan dompet Anda, lalu menguras dana Anda.

**Lindungi diri Anda:**

- Selalu verifikasi URL sebelum menghubungkan dompet Anda
- Tandai situs resmi yang sering Anda gunakan
- Jangan pernah memasukkan frase benih Anda di situs web mana pun. Aplikasi yang sah tidak pernah memintanya
- Gunakan [PhishTank](https://phishtank.org/) untuk memeriksa URL yang mencurigakan

<DocLink href="/guides/how-to-id-scam-tokens/">
  Cara mengidentifikasi token penipuan
</DocLink>
</ExpandableCard>

<DocLink href="/security/">
  Panduan lengkap untuk keamanan Ethereum dan pencegahan penipuan
</DocLink>
