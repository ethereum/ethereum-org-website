---
title: Keamanan Ethereum dan pencegahan penipuan
description: Tetap aman di Ethereum
lang: id
---

# Keamanan ethereum dan pencegahan penipuan {#introduction}

Dengan berkembangnya ketertarikan pada mata uang digital, mempelajari cara terbaik menggunakan mata uang digital menjadi perlu. Mata uang digital dapat menjadi menyenangkan dan menarik, tetapi juga ada risiko serius. Jika Anda mengerjakan sejumlah pekerjaan awal ini, Anda dapat mengurangi risiko tersebut.

<Divider />

## Keamanan Situs 101 {#web-security}

### Gunakan kata sandi yang kuat {#use-strong-passwords}

[Lebih dari 80% pembajakan akun adalah akibat dari lemahnya atau tercurinya kata sandi](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Kombinasi karakter, angka, dan simbol yang panjang adalah cara terbaik untuk menjaga keamanan akun Anda.

Kesalahan individu yang umum terjadi adalah menggunakan kombinasi dua atau tiga kata yang umum dan berhubungan. Kata sandi seperti ini tidaklah aman karena sangat rentan terhadap teknik peretasan sederhana yang dikenal dengan sebutan [dictionary attack](https://wikipedia.org/wiki/Dictionary_attack).

```md
Contoh kata sandi yang lemah: CuteFluffyKittens!

Contoh kata sandi yang kuat: ymv\*azu.EAC8eyp8umf
```

Beberapa kesalahan yang sering terjadi adalah penggunaan kata sandi yang sangat mudah ditebak atau ditemukan melalui [rekayasa sosial](https://wikipedia.org/wiki/Social_engineering_(security)). Menyertakan nama pembantu ibu Anda, nama anak atau hewan peliharaan Anda, atau tanggal lahir dalam kata sandi Anda tidaklah aman dan meningkatkan resiko kata sandi Anda diretas.

#### Beberapa langkah yang perlu diperhatikan dalam membentuk kata sandi: {#good-password-practices}

- Buatlah kata sandi dengan panjang karakter maksimal sesuai dengan yang diperbolehkan pembuat kata sandi atau sesuai dengan ketentuan formulir yang anda isi
- Gunakan gabungan huruf kapital, huruf kecil, angka dan simbol
- Hindari penggunaan informasi personal, seperti nama keluarga, di dalam kata sandi anda
- Hindari penggunaan kata yang sering digunakan

[Selanjutnya, langkah dalam membuat kata sandi yang kuat](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Gunakan kata sandi yang unik untuk semua hal {#use-unique-passwords}

Kata sandi yang kuat tidak akan memberikan perlindungan yang kuat ketika diretas saat terjadi serangan data. Situs web [Have I Been Pwned](https://haveibeenpwned.com) memungkinkan Anda untuk memeriksa apakah akun Anda terlibat dalam pelanggaran data yang disimpan dalam database mereka. Jika sudah, **Anda harus segera mengubah kata sandi pwned**. Menggunakan kata sandi yang unik untuk setiap akun mengurangi resiko peretas untuk mendapatkan akses semua akun Anda ketika salah satu kata sandi akun tersebut diretas.

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

Untuk memastikan diri Anda yang sebenarnya, terdapat berabgai bukti yang dapat digunakan sebagai autentikasi. Ini dikenal sebagai **faktor**, ada tiga jenis faktor utama:

- Sesuatu yang Anda ketahui (seperti kata sandi atau pertanyaan keamanan)
- Sesuatu yang melekat pada diri Anda (seperti sidik jari atau hasil pindaian mata/wajah)
- Sesuatu yang Anda miliki (sebuah kunci atau autentikasi aplikasi dalam perangkat yang Anda miliki)

Menggunakan **Autentikasi Dua Faktor (2FA)** menambahkan *faktor keamanan* pada akun daring Anda sehingga mengetahui kata sandi akun (sesuatu yang anda ketahui) tidak cukup untuk mengakses akun tersebut. Umumnya, faktor autentikasi kedua adalah 6 digit kode yang dikenal sebagai **kata sandi satu kali berbais waktu (TOTP)**, yang Anda dapat akses dengan sebuah aplikasi autentikasi seperti Google Authenticator atau Authy. Ini berfungsi sebagai faktor "sesuatu yang Anda miliki" karena benih yang menghasilkan kode waktunya disimpan di perangkat Anda.

<InfoBanner emoji=":lock:">
  <div>
    Catatan: Menggunakan 2FA berbasis SMS rentan terhadap 
    <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">
      SIM jacking
    </a>
    dan tidak aman. Untuk keamanan terbaik, gunakan layanan seperti{" "}
    <a href="https://mashable.com/article/how-to-set-up-google-authenticator">
      Google Authenticator
    </a>
    atau <a href="https://authy.com/">Authy</a>.
  </div>
</InfoBanner>

#### Kunci keamanan {#security-keys}

Untuk meningkatkan keamanan melampaui 2FA, anda dapat menggunakan kunci keamanan. Kunci keamanan adalah perangkat keras untuk auntentikasi yang bekerja sama seperti aplikasi autentikasi. Menggunakan kunci keamanan merupakan cara paling aman dalam 2FA. Umumnya kunci ini menggunakan standar FIDO Universal 2nd Factor (U2F). [Pelajari lebih lanjut mengenai FIDO U2F](https://www.yubico.com/authentication-standards/fido-u2f/).

Tonton lebih lanjut mengenai 2FA:

<YouTube id="m8jlnZuV1i4" start="3479" />

### Hapus ekstensi peramban {#uninstall-browser-extensions}

Ekstensi peramban seperti Chrome extension atau pengaya dalam Firefox dapat menambah fungsionalitas dan meningkatkan pengalaman pengguna, namun hal ini juga membawa resiko. Secara bawaan, sebagian besar ekstensi peramban menanyakan akses untuk 'membaca dan mengubah data', mengizinkan mereka melakukan hampir apapun pada data Anda. Ekstensi Chrome selalu melakukan pembaruan otomatis, jadi ekstensi yang sebelumnya aman bisa diperbarui belakangan dan mengandung kode jahat. Sebagian besar ekstensi peramban tidak bermaksud mencuri data Anda, tetapi Anda harus waspada bahwa mereka dapat melakukannya.

#### Tetaplah aman dengan cara: {#browser-extension-safety}

- Hanya menginstal ekstensi peramban dari sumber terpercaya
- Hapus ekstensi peramban yang tidak digunakan
- Instal ekstensi Chrome secara lokal untuk menghentikan pembaruan-otomatis (Lanjutan)

[Selengkapnya mengenai risiko ekstensi browser](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Keamanan crypto 101 {#crypto-security}

### Tingkatkan pengetahuan Anda {#level-up-your-knowledge}

Salah satu alasan terbesar orang tertipu dalam kripto secara umum adalah kurangnya pemahaman. Sebagai contoh, jika Anda tidak mengerti bahwa jaringan Ethereum terdesentralisasi dan tidak dimiliki siapapun, maka mudah untuk jatuh pada jebakan seseorang yang mencoba menjadi agen layanan konsumen yang menjanjikan Anda mengembalikan hilangnya ETH di bursa dengan memberi kunci privat Anda. Mengedukasi diri Anda sendiri tentang bagaimana Ethereum bekerja adalah investasi yang sepadan.

<DocLink to="/what-is-ethereum/">
  Apa yang Dimaksud dengan Ethereum?
</DocLink>

<DocLink to="/eth/">
  Apa yang Dimaksud dengan ether?
</DocLink>
<Divider />

## Keamanan dompet {#wallet-security}

### Jangan berikan kunci pribadi Anda {#protect-private-keys}

**Jangan pernah, untuk alasan apapun, membagi kunci pribadi Anda!**

Kunci privat dompet Anda bertindak sebagai kata sandi ke dompet Ethereum Anda. Ini satu-satunya cara menghentikan seseorang yang mengetahui alamat dompet Anda dari menghabisi akun Anda dan semua asetnya!

<DocLink to="/wallets/">
  Apa itu dompet Ethereum?
</DocLink>

#### Jangan mengambil tangkapan layar frase seed/kunci pribadi Anda {#screenshot-private-keys}

Dengan menangkap layar frase seed atau kunci pribadi, Anda berisiko mensinkronisasikannya ke cloud dan berpotensi membuatnya dapat diakses pembajak. Mendapatkan kunci pribadi dari cloud adalah vektor serangan umum bagi peretas.

### Gunakan dompet perangkat keras {#use-hardware-wallet}

Dompet perangkat keras menyediakan penyimpanan offline untuk kunci pribadi. Mereka dianggap sebagai pilihan dompet yang paling aman untuk menyimpan kunci pribadi Anda: kunci pribadi Anda tidak pernah terhubung ke internet dan tetap aman di perangkat Anda.

Menjaga kunci pribadi tetap offline secara besar-besaran mengurangi risiko diretas, bahkan jika peretas menguasai komputer Anda.

#### Coba dompet perangkat keras: {#try-hardware-wallet}

- [Buku besar](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Periksa kembali transaksi sebelum mengirim {#double-check-transactions}

Secara tidak sengaja mengirim crypto ke alamat dompet yang salah adalah kesalahan umum. **Transaksi yang dikirim melalui Ethereum tidak dapat dibatalkan.** Kecuali jika Anda mengetahui pemilik alamat dan dapat meyakinkan mereka untuk mengirimkan kembali dana Anda, Anda tidak dapat mengambil dana Anda.

Selalu pastikan alamat yang Anda kirim sama persis dengan alamat penerima yang diinginkan sebelum melakukan transaksi. Juga disarankan saat berinteraksi dengan kontrak pintar untuk membaca pesan transaksi sebelum menandatangani.

### Tetapkan batas pengeluaran kontrak pintar {#spend-limits}

Saat berinteraksi dengan kontrak pintar, jangan izinkan batas pembelanjaan tak terbatas. Pengeluaran tak terbatas dapat memungkinkan kontrak pintar menguras dompet Anda. Sebaliknya, tetapkan batas pengeluaran hanya untuk jumlah yang diperlukan untuk transaksi.

Banyak dompet Ethereum menawarkan perlindungan batas untuk melindungi dari akun yang terkuras.

[Cara mencabut akses smart contract ke dana kripto anda](/guides/how-to-revoke-token-access/)

<Divider />

## Penipuan umum {#common-scams}

Penipu selalu mencari cara untuk mengambil dana dari Anda. Tidak mungkin menghentikan penipu sepenuhnya, tetapi kami dapat membuatnya kurang efektif dengan mengetahui sebagian besar teknik yang digunakan. Ada banyak variasi penipuan ini, tetapi umumnya mengikuti pola tingkat tinggi yang sama. Jika tidak ada yang lain, ingat:

- selalu skeptis
- tidak ada yang akan memberi Anda ETH gratis atau diskon
- tidak ada yang membutuhkan akses ke kunci pribadi atau informasi pribadi Anda

### Penipuan berhadiah {#giveaway}

Salah satu penipuan paling umum dalam mata uang kripto adalah penipuan giveaway. Penipuan giveaway dapat mengambil banyak bentuk, tetapi premis umumnya adalah bahwa jika Anda mengirim ETH ke alamat dompet yang disediakan, Anda akan menerima kembali ETH Anda tetapi berlipat ganda. *Untuk alasan ini, ini juga dikenal sebagai penipuan 2-untuk-1.*

Penipuan ini biasanya menetapkan kesempatan dalam waktu terbatas untuk mengklaim hadiah agar menyebabkan pengambilan keputusan yang buruk dan menciptakan rasa urgensi palsu.

#### Peretasan media sosial {#social-media-hacks}

Riwayat tinggi dari versi ini terjadi pada Juli 2020, ketika akun Twitter selebritas dan organisasi terkemuka diretas. Peretas secara bersamaan memposting hadiah Bitcoin di akun yang diretas. Meskipun tweet yang menipu dengan cepat diketahui dan dihapus, para peretas masih berhasil lolos dengan 11 bitcoin (atau $500.000 pada September 2021).

![Penipuan di Twitter](./appleTwitterScam.png)

#### Hadiah selebriti {#celebrity-giveaway}

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

Menjelang [Penggabungan](/roadmap/merge/), penipu memanfaatkan kebingungan seputar istilah 'Eth2' untuk mencoba meminta pengguna menukar ETH mereka dengan token 'ETH2'. Tidak ada 'ETH2', dan tidak ada token sah lain yang diperkenalkan bersamaan dengan Penggabungan. ETH yang Anda miliki sebelum Penggabungan masih sama dengan ETH yang sekarang. **Tidak perlu melakukan tindakan apa pun yang terkait dengan ETH Anda untuk akun peralihan dari bukti kerja ke bukti kepemilikan**.

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

Broker penipu perdagangan crypto mengklaim sebagai pialang mata uang kripto spesialis yang akan menawarkan untuk mengambil uang Anda dan menginvestasikannya atas nama Anda. Perjanjian pengembalian yang tidak realistis biasanya menyertai penawaran ini. Setelah penipu menerima dana Anda, mereka mungkin mengarahkan Anda, meminta Anda mengirim lebih banyak dana, sehingga Anda tidak kehilangan keuntungan investasi lebih lanjut, atau mungkin hilang sama sekali.

Broker penipu ini menemukan target mereka dengan menggunakan akun palsu di YouTube untuk memulai percakapan yang tampaknya wajar tentang broker. Percakapan ini sering kali mendapat dukungan tinggi untuk meningkatkan legitimasi, tetapi suara positif semuanya berasal dari akun bot.

**Jangan percaya orang asing di internet untuk berinvestasi atas nama Anda. Anda akan kehilangan kripto Anda.**

![Penipuan broker perdagangan di YouTube](./brokerScam.png)

### Penipuan pool penambangan crypto {#mining-pool-scams}

Mulai September 2022, menambang di Ethereum sudah tidak bisa dilakukan lagi. Namun, penipuan yang terkait dengan kelompok penambangan masih ada. Penipuan kelompok penambangan terjadi ketika seseorang menghubungi Anda tanpa Anda memintanya, lalu mengatakan bahwa Anda bisa mendapatkan keuntungan besar dengan bergabung dalam kelompok penambangan Ethereum. Penipu akan membuat klaim dan tetap berhubungan dengan Anda selama waktu yang dibutuhkan. Pada dasarnya, penipu akan mencoba dan meyakinkan Anda bahwa ketika Anda bergabung dengan pool penambangan Ethereum, mata uang kripto Anda akan digunakan untuk membuat ETH dan Anda akan dibayar dividen dalam bentuk ETH. Apa yang akhirnya terjadi adalah, Anda akan melihat bahwa mata uang kripto Anda menghasilkan keuntungan kecil. Ini hanya untuk memancing Anda berinvestasi lebih banyak. Pada akhirnya, semua dana Anda akan dikirim ke alamat yang tidak dikenal, dan si penipu entah akan menghilang atau dalam beberapa kasus akan terus berhubungan seperti yang terjadi dalam kasus baru-baru ini.

Intinya, waspadalah terhadap orang-orang yang menghubungi Anda di media sosial yang meminta Anda untuk menjadi bagian dari penambangan pool. Setelah Anda kehilangan crypto Anda, itu hilang.

Beberapa hal yang perlu diingat:

- Berhati-hatilah terhadap siapa pun yang menghubungi Anda tentang cara menghasilkan uang dari crypto Anda
- Lakukan riset Anda tentang staking, kumpulan likuiditas, atau cara lain untuk menginvestasikan crypto Anda
- Jarang, jika pernah, skema seperti itu sah. Jika ya, mereka mungkin akan menjadi arus utama dan Anda pasti pernah mendengarnya.

[Seorang pria kehilangan $200 ribu dalam penipuan pool penambangan](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Penipuan airdrop {#airdrop-scams}

Penipuan Airdrop melibatkan proyek penipuan dengan memasukkan aset (NFT, token) ke dompet Anda dan mengirim Anda ke situs web scam untuk mengklaim aset yang dijadikan Airdrop. Anda akan diminta untuk masuk dengan dompet Ethereum Anda dan "menyetujui" transaksi saat mencoba mengklaim. Transaksi ini membahayakan akun Anda dengan mengirimkan kunci publik dan privat Anda ke penipu. Bentuk alternatif penipuan ini mungkin mengharuskan Anda mengonfirmasi transaksi yang mengirimkan dana ke akun penipu.

[Lebih lanjut tentang penipuan Airdrop](https://www.youtube.com/watch?v=LLL_nQp1lGk)

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
