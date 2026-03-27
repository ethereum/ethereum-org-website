---
title: Keamanan Ethereum dan pencegahan penipuan
description: Tetap aman di Ethereum
lang: id
---

# Keamanan Ethereum dan pencegahan penipuan {#introduction}

Meningkatnya minat pada mata uang kripto membawa serta risiko yang berkembang dari penipu dan peretas. Artikel ini menjabarkan beberapa praktik terbaik untuk memitigasi risiko ini.

**Ingat: Tidak ada seorang pun dari ethereum.org yang akan pernah menghubungi Anda. Jangan membalas email yang mengatakan bahwa mereka dari dukungan resmi Ethereum.**

<Divider />

## Dasar-dasar keamanan kripto {#crypto-security}

### Tingkatkan pengetahuan Anda {#level-up-your-knowledge}

Kesalahpahaman tentang cara kerja kripto dapat menyebabkan kesalahan yang merugikan. Misalnya, jika seseorang berpura-pura menjadi agen layanan pelanggan yang dapat mengembalikan ETH yang hilang dengan imbalan kunci pribadi Anda, mereka memangsa orang-orang yang tidak memahami bahwa [Ethereum](/) adalah jaringan desentralisasi yang tidak memiliki fungsionalitas semacam ini. Mengedukasi diri Anda sendiri tentang cara kerja Ethereum adalah investasi yang berharga.

<DocLink href="/what-is-ethereum/">
  Apa itu Ethereum?
</DocLink>

<DocLink href="/eth/">
  Apa itu ether?
</DocLink>
<Divider />

## Keamanan dompet {#wallet-security}

### Jangan pernah membagikan frasa pemulihan Anda {#protect-private-keys}

**Jangan pernah, dengan alasan apa pun, membagikan frasa pemulihan atau kunci pribadi Anda!**

Frasa pemulihan Anda (juga disebut frasa pemulihan rahasia atau frasa seed) adalah kunci utama ke dompet Anda. Siapa pun yang memilikinya dapat mengakses semua akun Anda dan menguras setiap aset. Kunci pribadi bekerja dengan cara yang sama untuk akun individu. Tidak ada layanan, agen dukungan, atau situs web yang sah yang akan pernah meminta ini dari Anda.

<DocLink href="/wallets/">
  Apa itu dompet Ethereum?
</DocLink>

#### Jangan mengambil tangkapan layar dari frasa seed/kunci pribadi Anda {#screenshot-private-keys}

Mengambil tangkapan layar dari frasa seed atau kunci pribadi Anda mungkin menyinkronkannya ke penyedia data cloud, yang dapat membuatnya dapat diakses oleh peretas. Mendapatkan kunci pribadi dari cloud adalah vektor serangan yang umum bagi peretas.

### Gunakan dompet perangkat keras {#use-hardware-wallet}

Dompet perangkat keras menyediakan penyimpanan luring untuk kunci pribadi. Mereka dianggap sebagai opsi dompet paling aman untuk menyimpan kunci pribadi Anda: kunci pribadi Anda tidak pernah menyentuh internet dan tetap sepenuhnya lokal di perangkat Anda.

Menyimpan kunci pribadi secara luring secara masif mengurangi risiko diretas, bahkan jika peretas mendapatkan kendali atas komputer Anda.

#### Coba dompet perangkat keras: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Periksa kembali transaksi sebelum mengirim {#double-check-transactions}

Secara tidak sengaja mengirim kripto ke alamat dompet yang salah adalah kesalahan umum. **Sebuah transaksi yang dikirim di Ethereum tidak dapat diubah.** Kecuali Anda mengetahui pemilik alamat dan dapat meyakinkan mereka untuk mengirimkan kembali dana Anda, Anda tidak akan dapat mengambil kembali dana Anda.

Selalu pastikan alamat yang Anda tuju sama persis dengan alamat penerima yang diinginkan sebelum mengirim transaksi.
Merupakan praktik yang baik saat berinteraksi dengan kontrak pintar untuk membaca pesan transaksi sebelum menandatangani.

### Tetapkan batas pengeluaran kontrak pintar {#spend-limits}

Saat berinteraksi dengan kontrak pintar, jangan izinkan batas pengeluaran tak terbatas. Pengeluaran tak terbatas dapat memungkinkan kontrak pintar untuk menguras dompet Anda. Sebaliknya, tetapkan batas pengeluaran hanya pada jumlah yang diperlukan untuk transaksi.

Banyak dompet Ethereum menawarkan perlindungan batas untuk menjaga agar akun tidak terkuras.

[Cara mencabut akses kontrak pintar ke dana kripto Anda](/guides/how-to-revoke-token-access/)

<Divider />

## Penipuan umum {#common-scams}

Tidak mungkin untuk menghentikan penipu sepenuhnya, tetapi kita dapat membuat mereka kurang efektif dengan menyadari teknik yang paling sering mereka gunakan. Ada banyak variasi dari penipuan ini, tetapi mereka umumnya mengikuti pola tingkat tinggi yang sama. Jika tidak ada yang lain, ingatlah:

- selalu bersikap skeptis
- tidak ada yang akan memberi Anda ETH gratis atau dengan diskon
- tidak ada yang membutuhkan akses ke kunci pribadi atau informasi pribadi Anda

### Phishing iklan Twitter {#ad-phishing}

![Phishing tautan Twitter](./twitterPhishingScam.png)

Ada metode untuk memalsukan fitur pratinjau tautan Twitter (juga dikenal sebagai X) (unfurling) untuk berpotensi menipu pengguna agar berpikir bahwa mereka mengunjungi situs web yang sah. Teknik ini mengeksploitasi mekanisme Twitter untuk menghasilkan pratinjau URL yang dibagikan dalam tweet, dan menampilkan _dari ethereum.org_ misalnya (ditunjukkan di atas), padahal sebenarnya mereka dialihkan ke situs berbahaya.

Selalu periksa bahwa Anda berada di domain yang benar, terutama setelah mengeklik tautan.

[Informasi lebih lanjut di sini](https://harrydenley.com/faking-twitter-unfurling).

### Penipuan giveaway {#giveaway}

Salah satu penipuan paling umum dalam mata uang kripto adalah penipuan giveaway. Penipuan giveaway dapat mengambil banyak bentuk, tetapi gagasan umumnya adalah jika Anda mengirim ETH ke alamat dompet yang disediakan, Anda akan menerima kembali ETH Anda tetapi digandakan. *Karena alasan ini, ini juga dikenal sebagai penipuan 2-untuk-1.*

Penipuan ini biasanya menetapkan waktu kesempatan yang terbatas untuk mengklaim giveaway guna menciptakan rasa urgensi yang palsu.

### Peretasan media sosial {#social-media-hacks}

Versi tingkat tinggi dari hal ini terjadi pada Juli 2020, ketika akun Twitter selebritas dan organisasi terkemuka diretas. Peretas secara bersamaan memposting giveaway Bitcoin di akun yang diretas. Meskipun tweet yang menipu dengan cepat diperhatikan dan dihapus, para peretas masih berhasil lolos dengan 11 bitcoin (atau $500.000 pada September 2021).

![Penipuan di Twitter](./appleTwitterScam.png)

### Giveaway selebritas {#celebrity-giveaway}

Giveaway selebritas adalah bentuk umum lain dari penipuan giveaway. Para penipu akan mengambil rekaman wawancara video atau pembicaraan konferensi yang diberikan oleh seorang selebritas dan menyiarkannya secara langsung di YouTube - membuatnya tampak seolah-olah selebritas tersebut memberikan wawancara video langsung yang mendukung giveaway mata uang kripto.

Vitalik Buterin paling sering digunakan dalam penipuan ini, tetapi banyak orang terkemuka lainnya yang terlibat dalam kripto juga digunakan (misalnya, Elon Musk atau Charles Hoskinson). Memasukkan orang terkenal memberikan siaran langsung penipu rasa legitimasi (ini terlihat mencurigakan, tetapi Vitalik terlibat, jadi pasti tidak apa-apa!).

**Giveaway selalu merupakan penipuan. Jika Anda mengirim dana Anda ke akun ini, Anda akan kehilangannya selamanya.**

![Penipuan di YouTube](./youtubeScam.png)

### Penipuan dukungan {#support-scams}

Mata uang kripto adalah teknologi yang relatif muda dan sering disalahpahami. Penipuan umum yang memanfaatkan hal ini adalah penipuan dukungan, di mana penipu akan menyamar sebagai personel dukungan untuk dompet, bursa, atau blockchain populer.

Sebagian besar diskusi tentang Ethereum terjadi di Discord. Penipu dukungan umumnya akan menemukan target mereka dengan mencari pertanyaan dukungan di saluran discord publik dan kemudian mengirimkan pesan pribadi kepada penanya yang menawarkan dukungan. Dengan membangun kepercayaan, penipu dukungan mencoba menipu Anda agar mengungkapkan kunci pribadi Anda atau mengirim dana Anda ke dompet mereka.

![Penipuan dukungan di Discord](./discordScam.png)

Sebagai aturan umum, staf tidak akan pernah berkomunikasi dengan Anda melalui saluran pribadi yang tidak resmi. Beberapa hal sederhana yang perlu diingat saat berurusan dengan dukungan:

- Jangan pernah membagikan kunci pribadi, frasa seed, atau kata sandi Anda
- Jangan pernah mengizinkan siapa pun mengakses komputer Anda dari jarak jauh
- Jangan pernah berkomunikasi di luar saluran yang ditunjuk organisasi

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    Hati-hati: meskipun penipuan bergaya dukungan umumnya terjadi di Discord, mereka juga dapat lazim di aplikasi obrolan apa pun tempat diskusi kripto terjadi, termasuk email.
</AlertDescription>
</AlertContent>
</Alert>

### Penipuan token 'Eth2' {#eth2-token-scam}

Menjelang [The Merge](/roadmap/merge/), penipu memanfaatkan kebingungan seputar istilah 'Eth2' untuk mencoba dan membuat pengguna menukarkan ETH mereka dengan token 'ETH2'. Tidak ada 'ETH2', dan tidak ada token sah lainnya yang diperkenalkan dengan The Merge. ETH yang Anda miliki sebelum The Merge adalah ETH yang sama sekarang. **Tidak perlu mengambil tindakan apa pun terkait ETH Anda untuk memperhitungkan peralihan dari proof-of-work ke proof-of-stake**.

Penipu mungkin muncul sebagai "dukungan", memberi tahu Anda bahwa jika Anda menyetorkan ETH Anda, Anda akan menerima kembali 'ETH2'. Tidak ada [dukungan resmi Ethereum](/community/support/), dan tidak ada token baru. Jangan pernah membagikan frasa seed dompet Anda kepada siapa pun.

_Catatan: Ada token/ticker turunan yang mungkin mewakili ETH yang di-stake (yaitu, rETH dari Rocket Pool, stETH dari Lido, ETH2 dari Coinbase), tetapi ini bukanlah sesuatu yang mengharuskan Anda untuk "bermigrasi."_

### Penipuan phishing {#phishing-scams}

Penipuan phishing adalah sudut pandang lain yang semakin umum yang akan digunakan penipu untuk mencoba mencuri dana dompet Anda.

Beberapa email phishing meminta pengguna untuk mengeklik tautan yang akan mengarahkan mereka ke situs web tiruan, meminta mereka untuk memasukkan frasa seed mereka, mengatur ulang kata sandi mereka, atau mengirim ETH. Yang lain mungkin meminta Anda untuk tanpa sadar menginstal malware untuk menginfeksi komputer Anda dan memberi penipu akses ke file komputer Anda.

Jika Anda menerima email dari pengirim yang tidak dikenal, ingatlah:

- Jangan pernah membuka tautan atau lampiran dari alamat email yang tidak Anda kenali
- Jangan pernah membocorkan informasi pribadi atau kata sandi Anda kepada siapa pun
- Hapus email dari pengirim yang tidak dikenal

[Lebih lanjut tentang menghindari penipuan phishing](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Penipuan pialang perdagangan kripto {#broker-scams}

Pialang perdagangan kripto penipu mengklaim sebagai pialang mata uang kripto spesialis yang akan menawarkan untuk mengambil uang Anda dan berinvestasi atas nama Anda. Setelah penipu menerima dana Anda, mereka mungkin menuntun Anda, meminta Anda mengirim lebih banyak dana, sehingga Anda tidak ketinggalan keuntungan investasi lebih lanjut, atau mereka mungkin menghilang sama sekali.

Para penipu ini sering menemukan target dengan menggunakan akun palsu di YouTube untuk memulai percakapan yang tampaknya alami tentang 'pialang'. Percakapan ini sering kali mendapat banyak upvote untuk meningkatkan legitimasi, tetapi semua upvote tersebut berasal dari akun bot.

**Jangan percaya orang asing di internet untuk berinvestasi atas nama Anda. Anda akan kehilangan kripto Anda.**

![Penipuan pialang perdagangan di YouTube](./brokerScam.png)

### Penipuan kolam penambangan kripto {#mining-pool-scams}

Sejak September 2022, penambangan di Ethereum tidak lagi memungkinkan. Namun, penipuan kolam penambangan masih ada. Penipuan kolam penambangan melibatkan orang-orang yang menghubungi Anda tanpa diminta dan mengklaim bahwa Anda dapat memperoleh keuntungan besar dengan bergabung dengan kolam penambangan Ethereum. Penipu akan membuat klaim dan tetap berhubungan dengan Anda selama apa pun yang diperlukan. Pada dasarnya, penipu akan mencoba meyakinkan Anda bahwa ketika Anda bergabung dengan kolam penambangan Ethereum, mata uang kripto Anda akan digunakan untuk membuat ETH dan bahwa Anda akan dibayar dividen ETH. Anda kemudian akan melihat bahwa mata uang kripto Anda menghasilkan keuntungan kecil. Ini hanya untuk memancing Anda agar berinvestasi lebih banyak. Pada akhirnya, semua dana Anda akan dikirim ke alamat yang tidak diketahui, dan penipu akan menghilang atau dalam beberapa kasus akan terus tetap berhubungan seperti yang terjadi dalam kasus baru-baru ini.

Intinya: waspadalah terhadap orang-orang yang menghubungi Anda di media sosial yang meminta Anda untuk menjadi bagian dari kolam penambangan. Setelah Anda kehilangan kripto Anda, itu hilang.

Beberapa hal yang perlu diingat:

- Waspadalah terhadap siapa pun yang menghubungi Anda tentang cara menghasilkan uang dari kripto Anda
- Lakukan riset Anda tentang mengunci, kolam likuiditas, atau cara lain untuk menginvestasikan kripto Anda
- Jarang, jika pernah, skema semacam itu sah. Jika memang demikian, mereka mungkin akan menjadi arus utama dan Anda pasti sudah mendengarnya.

[Pria kehilangan $200rb dalam penipuan kolam penambangan](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Penipuan airdrop {#airdrop-scams}

Penipuan airdrop melibatkan proyek penipuan yang melakukan airdrop aset (NFT, token) ke dompet Anda dan mengirim Anda ke situs web penipuan untuk mengklaim aset yang di-airdrop. Anda akan diminta untuk masuk dengan dompet Ethereum Anda dan "menyetujui" transaksi saat mencoba mengklaim. Transaksi ini membahayakan akun Anda dengan mengirimkan kunci publik dan pribadi Anda ke penipu. Bentuk alternatif dari penipuan ini mungkin meminta Anda mengonfirmasi transaksi yang mengirimkan dana ke akun penipu.

[Lebih lanjut tentang penipuan airdrop](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Dasar-dasar keamanan web {#web-security}

### Gunakan kata sandi yang kuat {#use-strong-passwords}

[Lebih dari 80% peretasan akun adalah akibat dari kata sandi yang lemah atau dicuri](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Kombinasi panjang karakter, angka, dan simbol akan membantu menjaga keamanan akun Anda.

Kesalahan umum adalah menggunakan kombinasi beberapa kata umum yang saling terkait. Kata sandi seperti ini tidak aman karena rentan terhadap teknik peretasan yang disebut serangan kamus.

```md
Example of a weak password: CuteFluffyKittens!

Example of a strong password: ymv\*azu.EAC8eyp8umf
```

Kesalahan umum lainnya adalah menggunakan kata sandi yang dapat dengan mudah ditebak atau ditemukan melalui [rekayasa sosial](<https://wikipedia.org/wiki/Social_engineering_(security)>). Memasukkan nama gadis ibu Anda, nama anak atau hewan peliharaan Anda, atau tanggal lahir dalam kata sandi Anda akan meningkatkan risiko diretas.

#### Praktik kata sandi yang baik: {#good-password-practices}

- Buat kata sandi sepanjang yang diizinkan oleh pembuat kata sandi Anda atau formulir yang Anda isi
- Gunakan campuran huruf besar, huruf kecil, angka, dan simbol
- Jangan gunakan detail pribadi, seperti nama keluarga, dalam kata sandi Anda
- Hindari kata-kata umum

[Lebih lanjut tentang membuat kata sandi yang kuat](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Gunakan kata sandi unik untuk semuanya {#use-unique-passwords}

Kata sandi kuat yang telah terungkap dalam pelanggaran data bukan lagi kata sandi yang kuat. Situs web [Have I Been Pwned](https://haveibeenpwned.com) memungkinkan Anda untuk memeriksa apakah akun Anda terlibat dalam pelanggaran data publik. Jika ya, **segera ubah kata sandi tersebut**. Menggunakan kata sandi unik untuk setiap akun menurunkan risiko peretas mendapatkan akses ke semua akun Anda jika salah satu kata sandi Anda disusupi.

### Gunakan pengelola kata sandi {#use-password-manager}

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
    Menggunakan pengelola kata sandi akan mengurus pembuatan kata sandi yang kuat, unik, dan mengingatnya! Kami <strong>sangat</strong> menyarankan untuk menggunakannya, dan sebagian besar gratis!
</AlertDescription>
</AlertContent>
</Alert>

Mengingat kata sandi yang kuat dan unik untuk setiap akun yang Anda miliki tidaklah ideal. Pengelola kata sandi menawarkan penyimpanan terenkripsi yang aman untuk semua kata sandi Anda yang dapat Anda akses melalui satu kata sandi utama yang kuat. Mereka juga menyarankan kata sandi yang kuat saat mendaftar untuk layanan baru, sehingga Anda tidak perlu membuatnya sendiri. Banyak pengelola kata sandi juga akan memberi tahu Anda jika Anda telah terlibat dalam pelanggaran data, memungkinkan Anda untuk mengubah kata sandi sebelum serangan berbahaya apa pun.

![Contoh penggunaan pengelola kata sandi](./passwordManager.png)

#### Coba pengelola kata sandi: {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- Atau periksa [pengelola kata sandi yang disarankan](https://www.privacytools.io/secure-password-manager) lainnya

### Gunakan Autentikasi Dua Faktor {#two-factor-authentication}

Anda terkadang mungkin diminta untuk mengautentikasi identitas Anda melalui bukti unik. Ini dikenal sebagai **faktor**. Tiga faktor utama adalah:

- Sesuatu yang Anda ketahui (seperti kata sandi atau pertanyaan keamanan)
- Sesuatu yang ada pada diri Anda (seperti sidik jari atau pemindai iris/wajah)
- Sesuatu yang Anda miliki (kunci keamanan atau aplikasi autentikasi di ponsel Anda)

Menggunakan **Autentikasi Dua Faktor (2FA)** memberikan *faktor keamanan* tambahan untuk akun daring Anda. 2FA memastikan bahwa hanya memiliki kata sandi Anda tidak cukup untuk mengakses akun. Paling umum, faktor kedua adalah kode 6 digit acak, yang dikenal sebagai **kata sandi satu kali berbasis waktu (TOTP)**, yang dapat Anda akses melalui aplikasi autentikator seperti Google Authenticator atau Authy. Ini berfungsi sebagai faktor "sesuatu yang Anda miliki" karena seed yang menghasilkan kode berwaktu disimpan di perangkat Anda.

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    Catatan: Menggunakan 2FA berbasis SMS rentan terhadap <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">pembajakan SIM</a> dan tidak aman. Untuk keamanan terbaik, gunakan layanan seperti <a href="https://mashable.com/article/how-to-set-up-google-authenticator">Google Authenticator</a> atau <a href="https://authy.com/">Authy</a>.
</AlertDescription>
</AlertContent>
</Alert>

#### Kunci keamanan {#security-keys}

Kunci keamanan adalah jenis 2FA yang lebih canggih dan aman. Kunci keamanan adalah perangkat autentikasi perangkat keras fisik yang berfungsi seperti aplikasi autentikator. Menggunakan kunci keamanan adalah cara paling aman untuk 2FA. Banyak dari kunci ini menggunakan standar FIDO Universal 2nd Factor (U2F). [Pelajari lebih lanjut tentang FIDO U2F](https://www.yubico.com/resources/glossary/fido-u2f/).

Tonton lebih lanjut tentang 2FA:

<YouTube id="m8jlnZuV1i4" start="3479" />

### Copot pemasangan ekstensi peramban {#uninstall-browser-extensions}

Ekstensi peramban, seperti ekstensi Chrome atau Add-on untuk Firefox, dapat meningkatkan fungsionalitas peramban tetapi juga memiliki risiko. Secara default, sebagian besar ekstensi peramban meminta akses untuk 'membaca dan mengubah data situs', yang memungkinkan mereka melakukan hampir apa saja dengan data Anda. Ekstensi Chrome selalu diperbarui secara otomatis, sehingga ekstensi yang sebelumnya aman dapat diperbarui nanti untuk menyertakan kode berbahaya. Sebagian besar ekstensi peramban tidak mencoba mencuri data Anda, tetapi Anda harus menyadari bahwa mereka bisa melakukannya.

#### Tetap aman dengan: {#browser-extension-safety}

- Hanya menginstal ekstensi peramban dari sumber tepercaya
- Menghapus ekstensi peramban yang tidak digunakan
- Menginstal ekstensi Chrome secara lokal untuk menghentikan pembaruan otomatis (Lanjutan)

[Lebih lanjut tentang risiko ekstensi peramban](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Bacaan lebih lanjut {#further-reading}

### Keamanan web {#reading-web-security}

- [Hingga 3 juta perangkat terinfeksi oleh add-on Chrome dan Edge yang disusupi malware](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _Dan Goodin_
- [Cara Membuat Kata Sandi yang Kuat — Yang Tidak Akan Anda Lupakan](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [Apa itu kunci keamanan?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _Coinbase_

### Keamanan kripto {#reading-crypto-security}

- [Melindungi Diri Anda dan Dana Anda](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [Masalah keamanan dalam perangkat lunak komunikasi kripto umum](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media) - _Salus_
- [Panduan Keamanan Untuk Pemula Dan Orang Pintar Juga](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [Keamanan Kripto: Kata Sandi dan Autentikasi](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### Edukasi penipuan {#reading-scam-education}

- [Panduan: Cara mengidentifikasi token penipuan](/guides/how-to-id-scam-tokens/)
- [Tetap Aman: Penipuan Umum](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [Menghindari Penipuan](https://bitcoin.org/en/scams) - _Bitcoin.org_
- [Utas Twitter tentang email dan pesan phishing kripto umum](https://twitter.com/tayvano_/status/1516225457640787969) - _Taylor Monahan_

<QuizWidget quizKey="security" />