---
title: Keamanan Ethereum dan pencegahan penipuan
description: Tetap aman di Ethereum
lang: id
---

# Keamanan ethereum dan pencegahan penipuan {#introduction}

Meningkatnya minat terhadap mata uang kripto disertai dengan risiko yang semakin besar dari penipu dan peretas. Artikel ini memaparkan beberapa praktik terbaik untuk mengurangi risiko tersebut.

<Divider />

## Keamanan crypto 101 {#crypto-security}

### Tingkatkan pengetahuan Anda {#level-up-your-knowledge}

Kesalahpahaman tentang cara kerja kripto dapat menyebabkan kesalahan yang mahal. Misalnya, jika seseorang berpura-pura menjadi agen layanan pelanggan yang dapat mengembalikan ETH yang hilang dengan imbalan kunci pribadi Anda, mereka memanfaatkan ketidaktahuan orang bahwa Ethereum adalah jaringan terdesentralisasi yang tidak memiliki fungsionalitas seperti itu. Mengedukasi diri Anda sendiri tentang bagaimana Ethereum bekerja adalah investasi yang sepadan.

<DocLink href="/what-is-ethereum/">
  Apa yang Dimaksud dengan Ethereum?
</DocLink>

<DocLink href="/eth/">
  Apa yang Dimaksud dengan ether?
</DocLink>
<Divider />

## Keamanan dompet {#wallet-security}

### Jangan berikan kunci pribadi Anda {#protect-private-keys}

**Jangan pernah, untuk alasan apapun, membagi kunci pribadi Anda!**

Kunci privat untuk dompet Anda adalah kata sandi untuk dompet Ethereum Anda. Ini satu-satunya cara menghentikan seseorang yang mengetahui alamat dompet Anda dari menghabisi akun Anda dan semua asetnya!

<DocLink href="/wallets/">
  Apa itu dompet Ethereum?
</DocLink>

#### Jangan mengambil tangkapan layar frasa benih/kunci pribadi Anda {#screenshot-private-keys}

Mengambil tangkapan layar frasa benih atau kunci privat Anda dapat menyinkronkannya ke penyedia data cloud, yang bisa membuatnya dapat diakses oleh peretas. Mendapatkan kunci pribadi dari cloud adalah vektor serangan umum bagi peretas.

### Gunakan dompet perangkat keras {#use-hardware-wallet}

Dompet perangkat keras menyediakan penyimpanan offline untuk kunci pribadi. Mereka dianggap sebagai pilihan dompet yang paling aman untuk menyimpan kunci pribadi Anda: kunci pribadi Anda tidak pernah terhubung ke internet dan tetap aman di perangkat Anda.

Menjaga kunci pribadi tetap offline secara besar-besaran mengurangi risiko diretas, bahkan jika peretas menguasai komputer Anda.

#### Coba dompet perangkat keras: {#try-hardware-wallet}

- [Buku besar](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Periksa kembali transaksi sebelum mengirim {#double-check-transactions}

Secara tidak sengaja mengirim crypto ke alamat dompet yang salah adalah kesalahan umum. **Transaksi yang dikirim di Ethereum tidak dapat dibatalkan.** Anda tidak akan dapat mendapatkan kembali dana kecuali mengetahui pemilik alamat dan dapat meyakinkan mereka untuk mengembalikan dana tersebut.

Selalu pastikan alamat yang Anda kirim sama persis dengan alamat penerima yang diinginkan sebelum melakukan transaksi. Sebaiknya, saat berinteraksi dengan kontrak pintar, bacalah pesan transaksi sebelum menandatanganinya.

### Tetapkan batas pengeluaran kontrak pintar {#spend-limits}

Saat berinteraksi dengan kontrak pintar, jangan izinkan batas pembelanjaan tak terbatas. Pengeluaran tak terbatas dapat memungkinkan kontrak pintar menguras dompet Anda. Sebaliknya, tetapkan batas pengeluaran hanya untuk jumlah yang diperlukan untuk transaksi.

Banyak dompet Ethereum menawarkan perlindungan batas untuk melindungi dari akun yang terkuras.

[Cara mencabut akses smart contract ke dana kripto anda](/guides/how-to-revoke-token-access/)

<Divider />

## Penipuan umum {#common-scams}

Meskipun tidak mungkin menghentikan penipu sepenuhnya, kita bisa membuat mereka kurang efektif dengan menyadari teknik-teknik yang paling sering mereka gunakan. Ada banyak variasi penipuan ini, tetapi umumnya mengikuti pola tingkat tinggi yang sama. Jika tidak ada yang lain, ingat:

- selalu skeptis
- tidak ada yang akan memberi Anda ETH gratis atau diskon
- tidak ada yang membutuhkan akses ke kunci pribadi atau informasi pribadi Anda

### Twitter dan penipuan {#ad-phishing}

![Phishing melalui tautan Twitter](./twitterPhishingScam.png)

Ada metode untuk memalsukan fitur pratayang tautan (unfurling) Twitter (juga dikenal sebagai X) untuk mungkin menipu pengguna agar berpikir mereka mengunjungi situs web yang sah. Teknik ini memanfaatkan mekanisme Twitter untuk menghasilkan pratayang URL yang dibagikan dalam tweet, dan menunjukkan _dari ethereum.org_ (seperti yang ditunjukkan di atas), padahal sebenarnya mereka diarahkan ke situs jahat.

Selalu periksa bahwa Anda berada di domain yang benar, terutama setelah mengklik tautan.

[Informasi lebih lanjut di sini](https://harrydenley.com/faking-twitter-unfurling).

### Penipuan berhadiah {#giveaway}

Salah satu penipuan paling umum dalam mata uang kripto adalah penipuan giveaway. Penipuan giveaway dapat muncul dalam berbagai bentuk, tetapi ide umumnya adalah jika mengirim ETH ke alamat dompet yang diberikan, Anda akan menerima ETH kembali dengan jumlah yang digandakan. *Untuk alasan ini, ini juga dikenal sebagai penipuan 2-untuk-1.*

Penipuan semacam ini biasanya menetapkan waktu yang terbatas untuk mengeklaim giveaway, untuk menciptakan rasa urgensi yang palsu.

### Peretasan media sosial {#social-media-hacks}

Riwayat tinggi dari versi ini terjadi pada Juli 2020, ketika akun Twitter selebritas dan organisasi terkemuka diretas. Peretas secara bersamaan memposting hadiah Bitcoin di akun yang diretas. Meskipun tweet yang menipu dengan cepat diketahui dan dihapus, para peretas masih berhasil lolos dengan 11 bitcoin (atau $500.000 pada September 2021).

![Penipuan di Twitter](./appleTwitterScam.png)

### Hadiah selebriti {#celebrity-giveaway}

Pemberian selebriti adalah bentuk umum lain dari penipuan giveaway. Para penipu akan merekam wawancara video atau pembicaraan konferensi yang diberikan selebriti dan menyiarkannya secara langsung di YouTube - membuatnya tampak seolah-olah selebriti tersebut memberikan wawancara video langsung yang mendukung pemberian mata uang kripto.

Vitalik Buterin paling sering digunakan dalam penipuan ini, tetapi banyak orang terkemuka lainnya yang terlibat dalam kripto juga digunakan (misalnya Elon Musk atau Charles Hoskinson). Menyertakan orang terkenal untuk memberikan legitimasi dalam siaran langsung penipu (ini terlihat samar, tetapi Vitalik terlibat, jadi itu pasti baik-baik saja!).

**Giveaways selalu penipuan. Jika Anda mengirim dana ke akun ini, Anda akan kehilangannya selamanya.**

![Penipuan di YouTube](./youtubeScam.png)

### Dukung penipuan {#support-scams}

Mata uang kripto adalah teknologi yang relatif masih baru dan disalahpahami. Penipuan umum yang memanfaatkan ini adalah penipuan dukungan, di mana penipu akan menyamar sebagai personel pendukung untuk dompet, bursa, atau rantai blok populer.

Banyak diskusi tentang Ethereum berlangsung di Discord. Penipu dukungan biasanya akan menemukan target mereka dengan mencari pertanyaan dukungan di saluran perselisihan publik dan kemudian mengirimkan pesan pribadi yang menawarkan dukungan kepada penanya. Dengan membangun kepercayaan, penipu dukungan mencoba menipu Anda untuk mengungkapkan kunci pribadi Anda atau mengirim dana Anda ke dompet mereka.

![Penipuan dukungan di Discord](./discordScam.png)

Sebagai aturan umum, staf tidak akan pernah berkomunikasi dengan Anda melalui saluran pribadi dan tidak resmi. Beberapa hal sederhana yang perlu diingat ketika berhadapan dengan dukungan:

- Jangan pernah membagikan kunci pribadi, frasa awal, atau kata sandi Anda
- Jangan pernah izinkan siapa pun mengakses komputer Anda dari jarak jauh
- Jangan pernah berkomunikasi di luar kanal yang ditunjuk organisasi

<InfoBanner emoji=":lock:">
  <div>
    Hati-hati: meskipun penipuan gaya dukungan biasanya terjadi di Discord, penipuan ini juga dapat terjadi pada aplikasi obrolan tempat diskusi kripto berlangsung, termasuk email.
  </div>
</InfoBanner>

### Penipuan token 'Eth2' {#eth2-token-scam}

Menjelang [Penggabungan](/roadmap/merge/), penipu memanfaatkan kebingungan seputar istilah 'Eth2' untuk mencoba meminta pengguna menukar ETH mereka dengan token 'ETH2'. Tidak ada 'ETH2', dan tidak ada token sah lain yang diperkenalkan bersamaan dengan Penggabungan. ETH yang Anda miliki sebelum Penggabungan masih sama dengan ETH yang sekarang. **Tidak perlu melakukan tindakan apa pun yang terkait dengan ETH Anda untuk akun peralihan dari bukti kerja ke bukti taruhan**.

Penipu mungkin muncul dalam bentuk "bantuan", memberi tahu Anda bahwa jika Anda mendepositkan ETH Anda, Anda akan menerima 'ETH2' kembali. Tidak ada [dukungan Ethereum resmi](/community/support/), dan tidak ada token baru. Jangan pernah membagikan frasa benih dompet Anda dengan siapa pun.

_Catatan: Ada token/ticker turunan yang mungkin mewakili ETH yang dipertaruhkan (mis. rETH dari Rocket Pool, stETH dari Lido, ETH2 dari Coinbase), tetapi ini bukanlah sesuatu yang Anda butuhkan untuk "memindahkan ke."_

### Penipuan phishing {#phishing-scams}

Penipuan phishing adalah sudut lain yang semakin umum yang akan digunakan scammer untuk mencoba mencuri dana dompet Anda.

Beberapa email phishing meminta pengguna untuk mengklik tautan yang akan mengarahkan mereka kembali ke situs web tiruan, meminta mereka memasukkan frase benih, mengatur ulang kata sandi, atau mengirim ETH. Orang lain mungkin meminta Anda untuk secara tidak sadar memasang malware untuk menginfeksi komputer Anda dan memberikan akses kepada scammers ke file komputer Anda.

Jika Anda menerima email dari pengirim yang tidak dikenal, ingatlah:

- Jangan pernah membuka tautan atau lampiran dari alamat email yang tidak Anda kenal
- Jangan pernah membocorkan informasi pribadi atau kata sandi Anda kepada siapa pun
- Hapus email dari pengirim yang tidak dikenal

[Lebih lanjut tentang menghindari penipuan phishing](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Penipuan broker perdagangan kripto {#broker-scams}

Penipu broker perdagangan kripto mengklaim sebagai broker mata uang kripto spesialis yang akan menawarkan untuk mengambil uang Anda dan berinvestasi atas nama Anda. Setelah penipu menerima dana Anda, mereka mungkin mengarahkan Anda, meminta Anda mengirim lebih banyak dana, sehingga Anda tidak kehilangan keuntungan investasi lebih lanjut, atau mungkin hilang sama sekali.

Para penipu ini sering kali mencari target dengan menggunakan akun palsu di YouTube untuk memulai percakapan yang tampak alami tentang 'broker'. Percakapan ini sering kali mendapat dukungan tinggi untuk meningkatkan legitimasi, tetapi suara positif semuanya berasal dari akun bot.

**Jangan percaya orang asing di internet untuk berinvestasi atas nama Anda. Anda akan kehilangan kripto Anda.**

![Penipuan broker perdagangan di YouTube](./brokerScam.png)

### Penipuan pool penambangan crypto {#mining-pool-scams}

Mulai September 2022, menambang di Ethereum sudah tidak bisa dilakukan lagi. Namun, penipuan yang terkait dengan kelompok penambangan masih ada. Penipuan kelompok penambangan terjadi ketika seseorang menghubungi Anda tanpa Anda memintanya, lalu mengatakan bahwa Anda bisa mendapatkan keuntungan besar dengan bergabung dalam kelompok penambangan Ethereum. Penipu akan membuat klaim dan tetap berhubungan dengan Anda selama waktu yang dibutuhkan. Pada dasarnya, penipu akan mencoba meyakinkan Anda bahwa ketika bergabung dengan kolam penambangan Ethereum, mata uang kripto Anda akan digunakan untuk membuat ETH dan Anda akan dibayar dividen ETH. Anda kemudian akan melihat bahwa mata uang kripto Anda menghasilkan keuntungan kecil. Ini hanya untuk memancing Anda berinvestasi lebih banyak. Pada akhirnya, semua dana Anda akan dikirim ke alamat yang tidak dikenal, dan si penipu entah akan menghilang atau dalam beberapa kasus akan terus berhubungan seperti yang terjadi dalam kasus baru-baru ini.

Intinya: berhati-hatilah dengan orang yang menghubungi Anda di media sosial meminta untuk bergabung dengan pool penambangan. Setelah Anda kehilangan crypto Anda, itu hilang.

Beberapa hal yang perlu diingat:

- Berhati-hatilah terhadap siapa pun yang menghubungi Anda tentang cara menghasilkan uang dari crypto Anda
- Lakukan riset Anda tentang staking, kumpulan likuiditas, atau cara lain untuk menginvestasikan crypto Anda
- Jarang, jika pernah, skema seperti itu sah. Jika ya, mereka mungkin akan menjadi arus utama dan Anda pasti pernah mendengarnya.

[Seorang pria kehilangan $200 ribu dalam penipuan pool penambangan](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Penipuan airdrop {#airdrop-scams}

Penipuan Airdrop melibatkan proyek penipuan dengan memasukkan aset (NFT, token) ke dompet dan mengirim Anda ke situs web scam untuk mengeklaim aset yang dijadikan Airdrop. Anda akan diminta untuk masuk dengan dompet Ethereum Anda dan "menyetujui" transaksi saat mencoba mengklaim. Transaksi ini membahayakan akun Anda dengan mengirimkan kunci publik dan privat Anda ke penipu. Bentuk alternatif penipuan ini mungkin mengharuskan Anda mengonfirmasi transaksi yang mengirimkan dana ke akun penipu.

[Lebih lanjut tentang penipuan Airdrop](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Keamanan Situs 101 {#web-security}

### Gunakan kata sandi yang kuat {#use-strong-passwords}

[Lebih dari 80% pembajakan akun adalah akibat dari lemahnya atau tercurinya kata sandi](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Kombinasi panjang dari karakter, angka, dan simbol akan membantu menjaga keamanan akun Anda.

Kesalahan umum adalah menggunakan kombinasi beberapa kata umum yang saling terkait. Kata sandi seperti ini tidak aman karena rentan terhadap teknik peretasan yang disebut serangan kamus.

```md
Contoh kata sandi yang lemah: CuteFluffyKittens!

Contoh kata sandi yang kuat: ymv\*azu.EAC8eyp8umf
```

Kesalahan umum lainnya adalah menggunakan kata sandi yang mudah ditebak atau ditemukan melalui [rekayasa sosial](https://wikipedia.org/wiki/Social_engineering_(security)). Menyertakan nama gadis ibu, nama anak-anak atau hewan peliharaan, atau tanggal lahir dalam kata sandi Anda akan meningkatkan risiko akun diretas.

#### Beberapa langkah yang perlu diperhatikan dalam membentuk kata sandi: {#good-password-practices}

- Buatlah kata sandi dengan panjang karakter maksimal sesuai dengan yang diperbolehkan pembuat kata sandi atau sesuai dengan ketentuan formulir yang anda isi
- Gunakan gabungan huruf kapital, huruf kecil, angka dan simbol
- Hindari penggunaan informasi personal, seperti nama keluarga, di dalam kata sandi anda
- Hindari kata-kata umum

[Selanjutnya, langkah dalam membuat kata sandi yang kuat](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Gunakan kata sandi yang unik untuk semua hal {#use-unique-passwords}

Kata sandi yang kuat yang telah terungkap dalam pelanggaran data tidak lagi merupakan kata sandi yang kuat. Situs web [Have I Been Pwned](https://haveibeenpwned.com) memungkinkan Anda memeriksa apakah akun terlibat dalam pelanggaran data publik. Jika iya, **gantilah kata sandi tersebut segera**. Menggunakan kata sandi yang unik untuk setiap akun mengurangi risiko peretas mendapatkan akses ke semua akun Anda jika salah satu kata sandi tersebut terkompromi.

### Menggunakan pengelola kata sandi {#use-password-manager}

<InfoBanner emoji=":bulb:">
  <div>
    Menggunakan pengelola kata sandi akan membantu Anda membuat kata sandi yang kuat dan unik serta mengingatnya! Kami <strong>sangat</strong> menyarankan untuk menggunakannya, dan sebagian besar dari mereka gratis!
  </div>
</InfoBanner>

Mengingat kata sandi yang kuat dan unik untuk setiap akun tidaklah ideal. Pengatur kata sandi memberikan tempat yang terenkripsi dan aman untuk setiap kata sandi Anda. Mereka juga menyarankan kata sandi yang kuat saat mendaftar ke layanan baru, jadi Anda tidak perlu membuatnya sendiri. Banyak pengelola kata sandi akan memberitahukan Anda jika kata sandi Anda diretas, sehingga memberikan Anda kesemaptan untuk mengubah kata sandi Anda sebelum serangan yang berbahaya.

![Contoh penggunaan pengelola kata sandi](./passwordManager.png)

#### Contoh jasa pengelola kata sandi: {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- Atau coba lihat [pengelola kata sandi yang direkomendasikan](https://www.privacytools.io/secure-password-manager) lainnya

### Menggunakan Autentikasi Dua Faktor {#two-factor-authentication}

Anda mungkin terkadang diminta untuk mengautentikasi identitas melalui bukti unik. Ini dikenal sebagai **faktor**. Tiga faktor utama adalah:

- Sesuatu yang Anda ketahui (seperti kata sandi atau pertanyaan keamanan)
- Sesuatu yang melekat pada diri Anda (seperti sidik jari atau hasil pindaian mata/wajah)
- Sesuatu yang Anda miliki (sebuah kunci atau autentikasi aplikasi dalam perangkat yang Anda miliki)

Menggunakan **Autentikasi Dua Faktor (2FA)** memberikan *faktor keamanan* tambahan untuk akun online Anda. 2FA memastikan bahwa hanya memiliki kata sandi saja tidak cukup untuk mengakses akun. Umumnya, faktor autentikasi kedua adalah 6 digit kode yang dikenal sebagai **kata sandi satu kali berbais waktu (TOTP)**, yang Anda dapat akses dengan sebuah aplikasi autentikasi seperti Google Authenticator atau Authy. Ini berfungsi sebagai faktor "sesuatu yang Anda miliki" karena benih yang menghasilkan kode waktunya disimpan di perangkat Anda.

<InfoBanner emoji=":lock:">
  <div>
    Catatan: Menggunakan 2FA berbasis SMS rentan terhadap <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">SIM jacking</a> dan tidak aman. Untuk keamanan terbaik, gunakan layanan seperti <a href="https://mashable.com/article/how-to-set-up-google-authenticator">Google Authenticator</a> atau <a href="https://authy.com/">Authy</a>.
  </div>
</InfoBanner>

#### Kunci keamanan {#security-keys}

Kunci keamanan adalah jenis 2FA yang lebih canggih dan aman. Kunci keamanan adalah perangkat autentikasi perangkat keras fisik yang bekerja mirip dengan aplikasi autentikator. Menggunakan kunci keamanan merupakan cara paling aman dalam 2FA. Umumnya kunci ini menggunakan standar FIDO Universal 2nd Factor (U2F). [Pelajari lebih lanjut mengenai FIDO U2F](https://www.yubico.com/authentication-standards/fido-u2f/).

Tonton lebih lanjut tentang 2FA:

<YouTube id="m8jlnZuV1i4" start="3479" />

### Hapus ekstensi peramban {#uninstall-browser-extensions}

Ekstensi browser, seperti ekstensi Chrome atau Add-on untuk Firefox, dapat meningkatkan fungsionalitas browser tetapi juga membawa risiko. Secara bawaan, sebagian besar ekstensi peramban menanyakan akses untuk 'membaca dan mengubah data', mengizinkan mereka melakukan hampir apapun pada data Anda. Ekstensi Chrome selalu melakukan pembaruan otomatis, jadi ekstensi yang sebelumnya aman bisa diperbarui belakangan dan mengandung kode jahat. Sebagian besar ekstensi peramban tidak bermaksud mencuri data Anda, tetapi Anda harus waspada bahwa mereka dapat melakukannya.

#### Tetaplah aman dengan cara: {#browser-extension-safety}

- Hanya menginstal ekstensi peramban dari sumber terpercaya
- Hapus ekstensi peramban yang tidak digunakan
- Instal ekstensi Chrome secara lokal untuk menghentikan pembaruan-otomatis (Lanjutan)

[Selengkapnya mengenai risiko ekstensi browser](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Bacaan lebih Lanjut {#further-reading}

### Keamanan web {#reading-web-security}

- [Hingga 3 juta perangkat terinfeksi oleh pengaya Chrome dan Edge yang mengandung malware](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _Dan Goodin_
- [Cara Membuat Kata Sandi yang Kuat — Yang Anda Tidak Akan Lupakan](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [Apa itu kunci keamanan?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _Coinbase_

### Keamanan kripto {#reading-crypto-security}

- [Melindungi diri Anda dan dana Anda](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [Masalah keamanan pada perangkat lunak komunikasi kripto yang umum](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media) - _Salus_
- [Panduan Keamanan Untuk Dummies Dan Orang Pintar Juga](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [Keamanan Crypto: Sandi dan Otentikasi](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### Edukasi penipuan {#reading-scam-education}

- [Panduan: Cara mengidentifikasi token penipuan](/guides/how-to-id-scam-tokens/)
- [Tetap Aman: Penipuan Umum](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [Menghindari penipuan](https://bitcoin.org/en/scams) - _Bitcoin.org_
- [Utasan Twitter tentang Email dan Pesan Penipuan Umum Kripto](https://twitter.com/tayvano_/status/1516225457640787969) - _Taylor Monahan_

<QuizWidget quizKey="security" />
