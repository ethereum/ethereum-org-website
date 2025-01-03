---
title: Keselamatan Ethereum dan pencegahan penipuan
description: Kekal Selamat dalam Ethereum
lang: ms
---

# Keselamatan Ethereum dan pencegahan penipuan {#introduction}

Minat yang meningkat dalam mata wang kripto membawa risiko yang semakin meningkat daripada penipu dan penggodam. Artikel ini membentangkan beberapa amalan terbaik untuk mengurangkan risiko ini.

**Ingat: Tiada sesiapa pun dari ethereum.org akan menghubungi anda. Jangan balas e-mel yang mengatakan ia daripada sokongan rasmi Ethereum.**

<Divider />

## Keselamatan Kripto 101 {#crypto-security}

### Tingkatkan pengetahuan anda {#level-up-your-knowledge}

Salah faham tentang cara kripto berfungsi boleh membawa kepada kesilapan yang mahal. Contohnya, jika seseorang berpura-pura menjadi ejen perkhidmatan pelanggan yang boleh mengembalikan ETH yang hilang sebagai pertukaran untuk kunci peribadi anda, mereka memangsa orang yang tidak memahami bahawa Ethereum ialah rangkaian teragih yang tidak mempunyai fungsi seperti ini. Mendidik diri anda mengenai bagaimana Ethereum berfungsi merupakan pelaburan yang berbaloi.

<DocLink href="/what-is-ethereum/">
  Apa itu Ethereum?
</DocLink>

<DocLink href="/eth/">
  Apakah itu Ether?
</DocLink>
<Divider />

## Keselamatan dompet {#wallet-security}

### Jangan berikan kunci peribadi anda {#protect-private-keys}

**Jangan sesekali, atas sebarang sebab, berkongsi kunci peribadi anda!**

Kunci peribadi kepada dompet anda ialah kata laluan kepada dompet Ethereum anda. Ia adalah satu-satunya perkara yang menghalang seseorang yang tahu alamat dompet anda daripada mengalirkan semua aset daripada akaun anda!

<DocLink href="/wallets/">
  Apa itu dompet Ethereum?
</DocLink>

#### Jangan mengambil tangkapan skrin frasa benih/kunci peribadi anda {#screenshot-private-keys}

Tangkapan skrin frasa benih atau kunci peribadi anda mungkin menyegerakkannya ke penyedia data awan, yang boleh menjadikannya boleh diakses oleh penggodam. Mendapatkan kunci peribadi daripada awan adalah vektor serangan biasa untuk penggodam.

### Gunakan dompet perkakasan {#use-hardware-wallet}

Dompet perkakasan menyediakan storan luar talian untuk kunci peribadi. Ia dianggap pilihan dompet yang paling selamat untuk menyimpan kunci peribadi anda: kunci peribadi anda tidak pernah menyentuh internet dan kekal setempat sepenuhnya pada peranti anda.

Menyimpan kunci peribadi di luar talian secara drastik mengurangkan risiko digodam, walaupun jika penggodam mengawal komputer anda.

#### Cuba dompet perkakasan: {#try-hardware-wallet}

- [Lejar](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Semak semula transaksi sebelum menghantar {#double-check-transactions}

Secara tidak sengaja menghantar kripto ke alamat dompet yang salah ialah kesilapan biasa. **Transaksi yang dihantar pada Ethereum tidak boleh dibalikkan.** Melainkan anda tahu pemilik alamat dan boleh meyakinkan mereka untuk menghantar semula dana anda, anda tidak akan dapat mendapatkan semula dana anda.

Sentiasa pastikan alamat yang anda hantar sepadan dengan tepat dengan alamat penerima yang diinginkan sebelum menghantar transaksi. Membaca mesej transaksi sebelum menandatangan adalah amalan yang baik apabila berinteraksi dengan kontrak pintar.

### Tetapkan had perbelanjaan kontrak pintar {#spend-limits}

Apabila berinteraksi dengan kontrak pintar, jangan membenarkan had perbelanjaan tanpa had. Perbelanjaan tanpa had boleh membolehkan kontrak pintar untuk mengalirkan dompet anda. Sebaliknya, tetapkan had perbelanjaan kepada hanya jumlah yang diperlukan untuk transaksi.

Banyak dompet Ethereum menawarkan had perlindungan untuk melindungi akaun daripada disalirkan.

[Bagaimana untuk memansuhkan akses smart contract ke dana kripto anda](/guides/how-to-revoke-token-access/)

<Divider />

## Penipuan biasa {#common-scams}

Adalah mustahil untuk menghentikan penipu sepenuhnya, tetapi kita boleh menjadikan mereka kurang berkesan dengan mengetahui teknik mereka yang paling banyak digunakan. Terdapat banyak variasi penipuan ini, tetapi mereka biasanya mengikuti corak peringkat tinggi yang sama. Jika tiada yang lain, ingatlah:

- sentiasa bersikap skeptikal
- tiada sesiapa yang akan memberi anda ETH percuma atau diskaun
- tiada sesiapa yang memerlukan akses kepada kunci peribadi atau maklumat peribadi anda

### Pancingan data iklan Twitter {#ad-phishing}

![Pancingan data pautan Twitter](./twitterPhishingScam.png)

Terdapat kaedah untuk memalsukan ciri pratonton pautan Twitter (juga dikenali sebagai X) (membubarkan) untuk berpotensi memperdaya pengguna untuk menganggap mereka melawat tapak web yang sah. Teknik ini mengeksploitasi mekanisme Twitter untuk menjana pratonton URL yang dikongsi dalam tweet, dan menunjukkan _daripada ethereum.org_ contohnya (ditunjukkan di atas), padahal sebenarnya mereka sedang diubah hala ke tapak berniat jahat.

Sentiasa pastikan anda berada di domain yang betul, terutamanya selepas mengklik pautan.

[Maklumat lanjut di sini](https://harrydenley.com/faking-twitter-unfurling).

### Penipuan pemberian {#giveaway}

Salah satu penipuan yang paling biasa dalam mata wang kripto ialah penipuan pemberian. Penipuan pemberian boleh berlaku dalam pelbagai bentuk, tetapi idea umum ialah jika anda menghantar ETH ke alamat dompet yang diberikan, anda akan menerima kembali ETH anda tetapi berganda. * Atas sebab ini, ia juga dikenali sebagai penipuan 2-untuk-1. *

Penipuan ini biasanya menetapkan masa terhad peluang untuk menuntut pemberian untuk mewujudkan rasa tergesa-gesa palsu.

### Penggodaman media sosial {#social-media-hacks}

Versi berprofil tinggi ini berlaku pada Julai 2020, apabila akaun Twitter selebriti dan organisasi terkemuka telah digodam. Penggodam serentak menyiarkan pemberian Bitcoin pada akaun digodam. Walaupun ciapan yang menipu itu cepat disedari dan dipadamkan, penggodam masih berjaya melarikan diri dengan 11 bitcoin (atau $500,000 pada September 2021).

![Penipuan di Twitter](./appleTwitterScam.png)

### Pemberian selebriti {#celebrity-giveaway}

Pemberian selebriti merupakan satu lagi bentuk penipuan pemberian yang lazim. Penipu akan mengambil rakaman video temu bual atau ceramah persidangan yang diberikan oleh seorang selebriti dan menyiarkannya secara langsung di YouTube - menjadikannya kelihatan seolah-olah selebriti itu sedang memberikan temu bual video secara langsung yang menyokong pemberian mata wang kripto.

Vitalik Buterin digunakan paling kerap dalam penipuan ini, tetapi ramai orang lain yang terlibat dalam kripto juga digunakan (contohnya Elon Musk atau Charles Hoskinson). Termasuk seorang yang terkenal memberi siaran langsung penipu itu rasa kesahihan (ini kelihatan mencurigakan, tetapi Vitalik terlibat, jadi ia mesti baik!).

**Pemberian sentiasa penipuan. Jika anda menghantar dana anda ke akaun-akaun ini, anda akan kehilangan dana anda.**

![Penipuan di YouTube](./youtubeScam.png)

### Penipuan sokongan {#support-scams}

Mata wang kripto ialah teknologi yang agak muda dan disalah faham. Penipuan biasa yang mengambil kesempatan daripada ini ialah penipuan sokongan, di mana penipu akan menyamar sebagai kakitangan sokongan untuk dompet popular, pertukaran, atau blok rantai.

Banyak perbincangan mengenai Ethereum berlaku pada Discord. Penipu sokongan biasanya akan mencari sasaran mereka dengan mencari soalan sokongan dalam saluran discord awam dan kemudian menghantar mesej peribadi kepada penanya untuk menawarkan sokongan. Dengan membina kepercayaan, penipu sokongan cuba untuk menipu anda untuk mendedahkan kunci peribadi anda atau menghantar dana anda kepada dompet mereka.

![Penipuan sokongan pada Discord](./discordScam.png)

Sebagai peraturan umum, kakitangan tidak akan berkomunikasi dengan anda melalui saluran peribadi, tidak rasmi. Beberapa perkara mudah yang perlu diingat apabila berurusan dengan sokongan:

- Jangan sesekali berkongsi kunci peribadi anda, frasa benih atau kata laluan
- Jangan sekali-kali membenarkan sesiapa sahaja akses jauh kepada komputer anda
- Jangan sesekali berkomunikasi di luar saluran yang telah ditetapkan organisasi

<InfoBanner emoji=":lock:">
  <div>
    Berhati-hati: walaupun penipuan gaya sokongan biasanya berlaku pada Discord, mereka juga berleluasa di mana-mana aplikasi sembang di mana perbincangan kripto berlaku, termasuk e-mel.
  </div>
</InfoBanner>

### Penipuan token 'Eth2' {#eth2-token-scam}

Menjelang [The Merge](/roadmap/merge/), penipu mengambil kesempatan daripada kekeliruan mengenai istilah 'Eth2' untuk cuba mendapatkan pengguna menebus ETH mereka untuk token 'ETH2'. Tidak ada 'ETH2', dan tiada token sah lain telah diperkenalkan dengan The Merge. ETH yang anda miliki sebelum The Merge ialah ETH yang sama sekarang. Terdapat **tiada perlu mengambil apa-apa tindakan yang berkaitan dengan ETH anda untuk mengambil kira suis dari bukti kerja kepada bukti kepemilikan**.

Penipu mungkin muncul sebagai "sokongan", memberitahu anda bahawa jika anda mendepositkan ETH anda, anda akan menerima kembali 'ETH2'. Tidak ada [ sokongan Ethereum rasmi](/community/support/), dan tiada token baru. Jangan sesekali berkongsi frasa benih dompet anda dengan sesiapa.

_Nota: Terdapat token/ticker derivatif yang mungkin mewakili ETH yang dipertaruhkan (contohnya, rETH dari Rocket Pool, stETH dari Lido, ETH2 dari Coinbase), tetapi ini bukan sesuatu yang anda perlu "pindahkan."_

### Penipuan pancingan data {#phishing-scams}

Penipuan pancingan data merupakan satu lagi sudut yang semakin biasa yang penipu akan digunakan untuk cuba mencuri dana dompet anda.

Sesetengah e-mel pancingan data meminta pengguna untuk klik pada pautan yang akan mengarahkan mereka ke laman tiruan, meminta mereka untuk memasukkan frasa benih mereka, menetapkan semula kata laluan mereka atau menghantar ETH. Lain-lain boleh meminta anda untuk memasang malware tanpa disedari untuk menjangkiti komputer anda dan memberi penipu akses kepada fail komputer anda.

Jika anda menerima e-mel daripada penghantar yang tidak diketahui, ingat:

- Jangan sekali-kali membuka pautan atau lampiran daripada alamat e-mel yang anda tidak kenali
- Jangan sekali-kali mendedahkan maklumat peribadi atau kata laluan anda kepada sesiapa
- Memadamkan e-mel daripada penghantar yang tidak diketahui

[Lagi tentang mengelakkan penipuan pemancingan data](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Penipuan broker dagangan kripto {#broker-scams}

Broker perdagangan kripto penipuan mendakwa sebagai broker mata wang kripto pakar yang akan menawarkan untuk mengambil wang anda dan melabur bagi pihak anda. Setelah penipu menerima dana anda, mereka mungkin akan memujuk anda, meminta anda untuk menghantar lebih banyak dana, supaya anda tidak terlepas peluang untuk mendapatkan keuntungan pelaburan lanjut, atau mereka mungkin menghilangkan diri sepenuhnya.

Penipu ini sering mencari sasaran dengan menggunakan akaun palsu di YouTube untuk memulakan perbualan yang seolah-olah semula jadi tentang 'broker' itu. Perbualan ini sering kali mendapat undian yang tinggi untuk meningkatkan kesahihan, tetapi undian tersebut semuanya dari akaun bot.

**Jangan percaya kepada orang asing internet untuk melabur bagi pihak anda. Anda akan kehilangan kripto anda.**

![Penipuan broker dagangan di YouTube](./brokerScam.png)

### Penipuan kolam perlombongan kripto {#mining-pool-scams}

Bermula September 2022, perlombongan di Ethereum tidak lagi boleh. Walau bagaimanapun, penipuan kolam perlombongan masih wujud. Penipuan kolam perlombongan melibatkan orang yang menghubungi anda tanpa diminta dan mendakwa bahawa anda boleh memperoleh pulangan besar dengan menyertai kolam perlombongan Ethereum. Penipu akan membuat tuntutan dan kekal berhubung dengan anda selama tempoh yang diperlukan. Pada asasnya, penipu akan cuba meyakinkan anda bahawa apabila anda menyertai kumpulan perlombongan Ethereum, mata wang kripto anda akan digunakan untuk mencipta ETH dan bahawa anda akan dibayar dividen ETH. Anda kemudian akan melihat bahawa mata wang kripto anda menghasilkan pulangan yang kecil. Ini semata-mata untuk memancing anda agar melabur lebih banyak. Akhirnya, semua dana anda akan dihantar ke alamat yang tidak diketahui, dan penipu akan hilang atau dalam beberapa kes akan terus berhubung seperti yang telah berlaku dalam kes baru-baru ini.

Intinya: berhati-hati terhadap orang yang menghubungi anda di media sosial yang meminta anda menjadi sebahagian daripada kolam perlombongan. Sebaik sahaja anda kehilangan kripto anda, ia telah hilang.

Beberapa perkara yang perlu diingat:

- Berhati-hati dengan sesiapa yang menghubungi anda mengenai cara untuk membuat wang daripada kripto anda
- Lakukan penyelidikan anda mengenai pertaruhan, kolam kecairan, atau cara lain untuk melabur kripto anda
- Jarang sekali, jika pernah, skim sebegitu adalah sah. Jika mereka sah, mereka mungkin arus perdana dan anda akan telah mendengar tentang mereka.

[Lelaki kehilangan $ 200k dalam penipuan kolam perlombongan](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Penipuan Airdrop {#airdrop-scams}

Penipuan Airdrop melibatkan projek penipuan yang menurunkan aset (NFT, token) ke dalam dompet anda dan menghantar anda ke laman web penipuan untuk menuntut aset yang telah diturunkan. Anda akan diminta untuk log masuk dengan dompet Ethereum anda dan "meluluskan" transaksi apabila cuba untuk membuat tuntutan. Transaksi ini menjejaskan akaun anda dengan menghantar kunci awam dan swasta anda kepada penipu. Bentuk alternatif penipuan ini mungkin meminta anda mengesahkan transaksi yang menghantar dana ke akaun penipu.

[Lagi tentang penipuan airdrop](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Keselamatan web 101 {#web-security}

### Gunakan kata laluan yang kuat {#use-strong-passwords}

[Lebih 80% daripada penggodaman akaun adalah hasil daripada kata laluan yang lemah atau dicuri](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Gabungan panjang aksara, nombor dan simbol akan membantu memastikan akaun anda selamat.

Kesilapan biasa ialah menggunakan gabungan beberapa perkataan biasa yang berkaitan. Kata laluan seperti ini tidak selamat kerana ia terdedah kepada teknik penggodaman yang dipanggil serangan kamus.

```md
Contoh kata laluan yang lemah: CuteFluffyKittens!

Contoh kata laluan yang kuat: ymv\*azu.EAC8eyp8umf
```

Satu lagi kesilapan biasa ialah menggunakan kata laluan yang boleh diteka atau diterokai dengan mudah melalui [kejuruteraan sosial](https://wikipedia.org/wiki/Social_engineering_(security)). Termasuk nama sulung ibu anda, nama anak atau haiwan peliharaan anda, atau tarikh lahir dalam kata laluan anda akan meningkatkan risiko digodam.

#### Amalan kata laluan yang baik: {#good-password-practices}

- Buat kata laluan selagi dibenarkan oleh penjana kata laluan anda atau borang yang anda isi
- Gunakan campuran huruf besar, huruf kecil, nombor, dan simbol
- Jangan gunakan butiran peribadi, seperti nama keluarga, dalam kata laluan anda
- Elakkan perkataan biasa

[Lagi tentang mewujudkan kata laluan yang kuat](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Gunakan kata laluan unik untuk semua {#use-unique-passwords}

Kata laluan yang kuat yang telah didedahkan dalam pelanggaran data bukan lagi kata laluan yang kukuh. Tapak web[Adakah Saya Telah Dipindah](https://haveibeenpwned.com)membolehkan anda menyemak sama ada akaun anda terlibat dalam sebarang pelanggaran data awam. Jika ada,**tukar kata laluan tersebut dengan segera**. Menggunakan kata laluan unik untuk setiap akaun mengurangkan risiko penggodam mendapat akses kepada semua akaun anda jika salah satu kata laluan anda terjejas.

### Gunakan pengurus kata laluan {#use-password-manager}

<InfoBanner emoji=":bulb:">
  <div>
    Menggunakan pengurus kata laluan memastikan ciptaan kata laluan yang kuat, unik dan diingati! Kami <strong>menggesa</strong> anda menggunakannya, dan kebanyakan daripadanya adalah percuma!
  </div>
</InfoBanner>

Mengingati kata laluan yang kuat dan unik untuk setiap akaun yang anda miliki bukanlah sesuatu yang ideal. Pengurus kata laluan menawarkan penyimpanan yang selamat dan disulitkan untuk semua kata laluan anda, yang boleh anda akses melalui satu kata laluan utama yang kukuh. Ia juga mencadangkan kata laluan yang kukuh apabila mendaftar untuk perkhidmatan baru, jadi anda tidak perlu mencipta kata laluan sendiri. Banyak pengurus kata laluan juga akan memberitahu anda jika anda telah terlibat dalam pelanggaran data, membolehkan anda menukar kata laluan sebelum sebarang serangan berniat jahat.

![Contoh menggunakan pengurus kata laluan](./passwordManager.png)

#### Cuba pengurus kata laluan: {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Kata Laluan](https://1password.com/)
- Atau semak [pengurus kata laluan lain yang disyorkan](https://www.privacytools.io/secure-password-manager)

### Gunakan Pengesahan Dua-Faktor {#two-factor-authentication}

Kadangkala anda mungkin diminta untuk mengesahkan identiti anda melalui bukti unik. Ini dikenali sebagai **faktor**. Tiga faktor utama ialah:

- Sesuatu yang anda tahu (seperti kata laluan atau soalan keselamatan)
- Sesuatu milik diri anda (seperti cap jari atau pengimbas iris/muka)
- Sesuatu yang anda miliki (kunci keselamatan atau aplikasi pengesahan pada telefon anda)

Menggunakan **Pengesahan Dua Faktor (2FA)** menyediakan *faktor keselamatan tambahan* untuk akaun dalam talian anda. 2FA memastikan dengan hanya mempunyai kata laluan tidak mencukupi untuk mengakses akaun. Yang paling lazim, faktor kedua ialah kod 6 digit rawak, dikenali sebagai **kata laluan sekali pakai berasaskan masa (TOTP)**, yang boleh anda akses melalui aplikasi pengesahan seperti Google Authenticator atau Authy. Ia berfungsi sebagai faktor "sesuatu yang anda miliki" kerana benih yang menjana kod masa disimpan pada peranti anda.

<InfoBanner emoji=":lock:">
  <div>
    Nota: Menggunakan 2FA berasaskan SMS terdedah kepada <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">pencurian SIM</a> dan tidak selamat. Untuk keselamatan terbaik, gunakan perkhidmatan seperti <a href="https://mashable.com/article/how-to-set-up-google-authenticator">Google Authenticator</a> atau <a href="https://authy.com/">Authy</a>.
  </div>
</InfoBanner>

#### Kunci keselamatan {#security-keys}

Kunci keselamatan ialah jenis 2FA yang lebih maju dan selamat. Kunci keselamatan ialah peranti pengesahan perkakasan fizikal yang berfungsi seperti apl pengesah. Menggunakan kunci keselamatan merupakan cara yang paling selamat untuk 2FA. Banyak kunci ini menggunakan Standard Faktor Kedua Universal FIDO (U2F). [Ketahui lebih lanjut mengenai FIDO U2F](https://www.yubico.com/authentication-standards/fido-u2f/).

Tonton lebih lanjut di 2FA:

<YouTube id="m8jlnZuV1i4" start="3479" />

### Nyahpasang sambungan pelayar {#uninstall-browser-extensions}

Sambungan pelayar, seperti sambungan Chrome atau Tambahan untuk Firefox, boleh meningkatkan fungsi pelayar tetapi turut mempunyai risiko. Secara lalai, kebanyakan sambungan pelayar meminta capaian untuk 'baca dan tukar data laman', membolehkan mereka melakukan hampir apa-apa sahaja dengan data anda. Sambungan Chrome sentiasa dikemas kini secara automatik, jadi sambungan selamat sebelum ini boleh mengemas kini kemudian dan menyertakan kod berniat jahat. Kebanyakan sambungan pelayar tidak cuba mencuri data anda, tetapi anda perlu sedar bahawa mereka boleh.

#### Kekal selamat dengan: {#browser-extension-safety}

- Hanya memasang sambungan pelayar daripada sumber yang dipercayai
- Menghapuskan sambungan pelayar yang tidak digunakan
- Pasang sambungan Chrome setempat untuk menghentikan kemas kini automatik (Lanjutan)

[Lebih lanjut mengenai risiko sambungan pelayar](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Bacaan lanjut {#further-reading}

### Keselamatan web {#reading-web-security}

- [ Sehingga 3 juta peranti dijangkiti oleh tambahan Chrome dan Edge yang disertakan dengan perisian hasad](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _ Dan Goodin_
- [Cara Mencipta Kata Laluan yang Kukuh — Yang Tidak Akan Anda Lupa](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [Apakah kunci keselamatan?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _Coinbase_

### Keselamatan Kripto {#reading-crypto-security}

- [Melindungi Diri Anda dan Dana Anda](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [Isu keselamatan dalam perisian komunikasi kripto biasa](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media) - _Salus_
- [Panduan Keselamatan Untuk Boneka Dan Juga Orang Pintar](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [Keselamatan Kripto: Kata laluan dan Pengesahan](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### Pendidikan penipuan {#reading-scam-education}

- [Panduan: Cara mengenal pasti token penipuan](/guides/how-to-id-scam-tokens/)
- [Kekal Selamat: Penipuan Lazim](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [Mengelakkan Penipuan](https://bitcoin.org/en/scams) - _ Bitcoin.org _
- [Twitter merungkai e-mel dan mesej pancingan data kripto lazim](https://twitter.com/tayvano_/status/1516225457640787969) - _Taylor Monahan_

<QuizWidget quizKey="security" />
