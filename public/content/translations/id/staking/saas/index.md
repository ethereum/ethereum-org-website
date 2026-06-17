---
title: Staking sebagai layanan
description: Pelajari tentang staking sebagai layanan
lang: id
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: Badak Leslie mengambang di awan.
sidebarDepth: 2
summaryPoints:
  - Operator node pihak ketiga menangani operasi klien validator Anda
  - Pilihan tepat bagi siapa saja yang memiliki 32 ETH yang tidak merasa nyaman berurusan dengan kompleksitas teknis dalam menjalankan node
  - Kurangi kepercayaan, dan pertahankan hak asuh atas kunci penarikan Anda
---

## Apa itu staking sebagai layanan? {#what-is-staking-as-a-service}

Staking sebagai layanan ("SaaS") mewakili kategori layanan staking di mana Anda menyetorkan 32 ETH Anda sendiri untuk sebuah validator, tetapi mendelegasikan operasi node ke operator pihak ketiga. Proses ini biasanya melibatkan panduan melalui pengaturan awal, termasuk pembuatan kunci dan penyetoran, kemudian mengunggah kunci penandatanganan Anda ke operator. Hal ini memungkinkan layanan untuk mengoperasikan validator Anda atas nama Anda, biasanya dengan biaya bulanan.

## Mengapa melakukan staking dengan sebuah layanan? {#why-stake-with-a-service}

Protokol [Ethereum](/) secara bawaan tidak mendukung pendelegasian stake, sehingga layanan ini telah dibangun untuk memenuhi permintaan ini. Jika Anda memiliki 32 ETH untuk di-stake, tetapi tidak merasa nyaman berurusan dengan perangkat keras, layanan SaaS memungkinkan Anda untuk mendelegasikan bagian yang sulit sementara Anda mendapatkan imbalan blok bawaan.

<Grid>
  <Card title="Your own validator" emoji=":desktop_computer:" description="Deposit your own 32 ETH to activate your own set of signing keys that will participate in Ethereum consensus. Monitor your progress with dashboards to watch those ETH rewards accumulate." />
  <Card title="Easy to start" emoji="🏁" description="Forget about hardware specs, setup, node maintenance and upgrades. SaaS providers let you outsource the hard part by uploading your own signing credentials, allowing them to run a validator on your behalf, for a small cost." />
  <Card title="Limit your risk" emoji=":shield:" description="In many cases users do not have to give up access to the keys that enable withdrawing or transferring staked funds. These are different from the signing keys, and can be stored separately to limit (but not eliminate) your risk as a staker." />
</Grid>

<StakingComparison page="saas" />

## Apa yang perlu dipertimbangkan {#what-to-consider}

Ada semakin banyak penyedia SaaS untuk membantu Anda melakukan staking ETH Anda, tetapi semuanya memiliki manfaat dan risikonya masing-masing. Semua opsi SaaS mensyaratkan asumsi kepercayaan tambahan dibandingkan dengan staking di rumah. Opsi SaaS mungkin memiliki kode tambahan yang membungkus klien Ethereum yang tidak terbuka atau dapat diaudit. SaaS juga memiliki efek merugikan pada desentralisasi jaringan. Bergantung pada pengaturannya, Anda mungkin tidak mengontrol validator Anda - operator dapat bertindak tidak jujur menggunakan ETH Anda.

Indikator atribut digunakan di bawah ini untuk menandakan kekuatan atau kelemahan penting yang mungkin dimiliki oleh penyedia SaaS yang terdaftar. Gunakan bagian ini sebagai referensi tentang bagaimana kami mendefinisikan atribut-atribut ini saat Anda memilih layanan untuk membantu perjalanan staking Anda.

<StakingConsiderations page="saas" />

## Jelajahi penyedia layanan staking {#saas-providers}

Di bawah ini adalah beberapa penyedia SaaS yang tersedia. Gunakan indikator di atas untuk membantu memandu Anda melalui layanan-layanan ini

<ProductDisclaimer />

### Penyedia SaaS {#saas-providers-2}

<StakingProductsCardGrid category="saas" />

Harap perhatikan pentingnya mendukung [keragaman klien](/developers/docs/nodes-and-clients/client-diversity/) karena hal ini meningkatkan keamanan jaringan, dan membatasi risiko Anda. Layanan yang memiliki bukti membatasi penggunaan klien mayoritas ditandai dengan <em style={{ textTransform: "uppercase" }}>"keragaman klien eksekusi"</em> dan <em style={{ textTransform: "uppercase" }}>"keragaman klien konsensus."</em>

### Pembuat Kunci {#key-generators}

<StakingProductsCardGrid category="keyGen" />

Punya saran untuk penyedia staking sebagai layanan yang kami lewatkan? Lihat [kebijakan pendaftaran produk](/contributing/adding-staking-products/) kami untuk melihat apakah itu cocok, dan untuk mengirimkannya agar ditinjau.

## Pertanyaan yang sering diajukan {#faq}

<ExpandableCard title="Siapa yang memegang kunci saya?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Pengaturan akan berbeda dari satu penyedia ke penyedia lainnya, tetapi umumnya Anda akan dipandu melalui pengaturan kunci penandatanganan apa pun yang Anda butuhkan (satu per 32 ETH), dan mengunggahnya ke penyedia Anda untuk memungkinkan mereka memvalidasi atas nama Anda. Kunci penandatanganan saja tidak memberikan kemampuan apa pun untuk melakukan penarikan, transfer, atau membelanjakan dana Anda. Namun, kunci tersebut memberikan kemampuan untuk memberikan suara terhadap konsensus, yang jika tidak dilakukan dengan benar dapat mengakibatkan penalti luring atau pemotongan.
</ExpandableCard>

<ExpandableCard title="Jadi ada dua set kunci?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Ya. Setiap akun terdiri dari kunci <em>penandatanganan</em> BLS, dan kunci <em>penarikan</em> BLS. Agar validator dapat membuktikan state dari rantai, berpartisipasi dalam komite sinkronisasi dan mengusulkan blok, kunci penandatanganan harus mudah diakses oleh klien validator. Kunci ini harus terhubung ke internet dalam beberapa bentuk, dan dengan demikian secara inheren dianggap sebagai kunci "panas" (hot keys). Ini adalah persyaratan agar validator Anda dapat membuktikan, dan dengan demikian kunci yang digunakan untuk mentransfer atau menarik dana dipisahkan demi alasan keamanan.

Kunci penarikan BLS digunakan untuk menandatangani pesan satu kali yang menyatakan ke akun lapisan eksekusi mana imbalan staking dan dana yang keluar harus dikirim. Setelah pesan ini disiarkan, kunci <em>penarikan BLS</em> tidak lagi diperlukan. Sebaliknya, kendali atas dana yang ditarik secara permanen didelegasikan ke alamat yang Anda berikan. Hal ini memungkinkan Anda untuk mengatur alamat penarikan yang diamankan melalui penyimpanan dingin (cold storage) Anda sendiri, meminimalkan risiko terhadap dana validator Anda, bahkan jika orang lain mengontrol kunci penandatanganan validator Anda.

Memperbarui kredensial penarikan adalah langkah yang diwajibkan untuk mengaktifkan penarikan\*. Proses ini melibatkan pembuatan kunci penarikan menggunakan frasa benih mnemonik Anda.

<strong>Pastikan Anda mencadangkan frasa benih ini dengan aman atau Anda tidak akan dapat membuat kunci penarikan Anda ketika saatnya tiba.</strong>

\*Staker yang memberikan alamat penarikan pada setoran awal tidak perlu mengatur ini. Periksa dengan penyedia SaaS Anda untuk dukungan mengenai cara menyiapkan validator Anda.
</ExpandableCard>

<ExpandableCard title="Kapan saya bisa melakukan penarikan?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Staker perlu memberikan alamat penarikan (jika tidak diberikan pada setoran awal), dan pembayaran imbalan akan mulai didistribusikan secara otomatis secara berkala setiap beberapa hari.

Validator juga dapat sepenuhnya keluar sebagai validator, yang akan membuka kunci sisa saldo ETH mereka untuk penarikan. Akun yang telah memberikan alamat penarikan eksekusi dan menyelesaikan proses keluar akan menerima seluruh saldo mereka ke alamat penarikan yang diberikan selama penyapuan validator berikutnya.

<ButtonLink href="/staking/withdrawals/">Lebih lanjut tentang penarikan staking</ButtonLink>
</ButtonLink>

<ExpandableCard title="Apa yang terjadi jika saya terkena pemotongan?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Dengan menggunakan penyedia SaaS, Anda mempercayakan operasi node Anda kepada orang lain. Hal ini disertai dengan risiko kinerja node yang buruk, yang tidak berada dalam kendali Anda. Jika validator Anda dipotong, saldo validator Anda akan dikenakan penalti dan dikeluarkan secara paksa dari kumpulan validator.

Setelah menyelesaikan proses pemotongan/keluar, dana ini akan ditransfer ke alamat penarikan yang ditetapkan ke validator. Hal ini mensyaratkan pemberian alamat penarikan untuk mengaktifkannya. Ini mungkin telah diberikan pada setoran awal. Jika tidak, kunci penarikan validator perlu digunakan untuk menandatangani pesan yang menyatakan alamat penarikan. Jika tidak ada alamat penarikan yang diberikan, dana akan tetap terkunci sampai diberikan.

Hubungi masing-masing penyedia SaaS untuk detail lebih lanjut tentang jaminan atau opsi asuransi apa pun, dan untuk instruksi tentang cara memberikan alamat penarikan. Jika Anda lebih suka memegang kendali penuh atas pengaturan validator Anda, [pelajari lebih lanjut tentang cara melakukan solo staking ETH Anda](/staking/solo/).
</ExpandableCard>

## Bacaan lebih lanjut {#further-reading}

- [Direktori Staking Ethereum](https://www.staking.directory/) - _Eridian dan Spacesider_
- [Mengevaluasi Layanan Staking](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_