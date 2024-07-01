---
title: Penaruhan sebagai layanan
description: Gambaran umum mengenai bagaimana cara memulai staking untuk pooled ETH
lang: id
template: staking
emoji: ":money_with_wings:"
image: /staking/leslie-saas.png
alt: Leslie si badak mengapung di awan.
sidebarDepth: 2
summaryPoints:
  - Operator simpul pihak ketiga menangani operasi dari klien validator Anda
  - Pilihan yang bagus bagi siapa pun yang memiliki 32 ETH dan tidak merasa nyaman menghadapi kompleksitas teknis dalam menjalankan simpul
  - Mengurangi kepercayaan, dan tetap memegang kendali kunci penarikan Anda
---

## Apa yang dimaksud dengan penaruhan sebagai layanan? {#what-is-staking-as-a-service}

Penaruhan sebagai layanan ("SaaS") merupakan kategori layanan penguncian di mana Anda menyetor sendiri 32 ETH untuk validator, tetapi menugaskan operasi simpul kepada operator pihak ketiga. Proses ini biasanya melibatkan panduan dalam pengaturan awal, termasuk pembuatan kunci dan setoran, kemudian menampilkan kunci tanda tangan Anda ke operator. Ini memungkinkan layanan tersebut menggunakan validator Anda atas nama Anda, biasanya dengan membayar biaya bulanan.

## Mengapa melakukan taruhan dengan layanan? {#why-stake-with-a-service}

Protokol Ethereum tidak secara asli mendukung delegasi taruhan, sehingga layanan-layanan ini dibangun untuk memenuhi permintaan tersebut. Jika Anda memiliki 32 ETH untuk taruhan, namun tidak merasa nyaman menghadapi perangkat keras, layanan SaaS memungkinkan Anda menugaskan bagian yang sulit sementara Anda mendapatkan imbalan blok asli.

<CardGrid>
  <Card title="Validator milik Anda" emoji=":desktop_computer:" description="Deposit your own 32 ETH to activate your own set of signing keys that will participate in Ethereum consensus. Monitor your progress with dashboards to watch those ETH rewards accumulate." />
  <Card title="Mudah untuk memulai" emoji="🏁" description="Forget about hardware specs, setup, node maintenance and upgrades. SaaS providers let you outsource the hard part by uploading your own signing credentials, allowing them to run a validator on your behalf, for a small cost." />
  <Card title="Batasi risiko Anda" emoji=":shield:" description="In many cases users do not have to give up access to the keys that enable withdrawing or transferring staked funds. These are different from the signing keys, and can be stored separately to limit (but not eliminate) your risk as a staker." />
</CardGrid>

<StakingComparison page="saas" />

## Apa yang perlu ditentukan {#what-to-consider}

Ada semakin banyak penyedia SaaS yang dapat membantu Anda melakukan taruhan ETH, tetapi setiap penyedia memiliki manfaat dan risikonya sendiri. Semua pilihan layanan SaaS memerlukan keyakinan tambahan dibandingkan dengan penaruhan di beranda. Opsi Saas mungkin memiliki kode tambahan yang melingkupi klien Ethereum yang tidak terbuka atau dapat diaudit. SaaS juga berdampak buruk pada desentralisasi jaringan. Tergantung pada pengaturan, Anda mungkin tidak mengendalikan validator Anda - operator dapat bertindak tidak jujur dengan menggunakan ETH Anda.

Indikator atribut digunakan di bawah ini untuk menandakan kekuatan atau kelemahan yang mencolok yang mungkin dimiliki oleh penyedia SaaS yang terdaftar. Gunakan bagian ini sebagai referensi untuk bagaimana kami mendefinisikan atribut-atribut ini saat Anda memilih layanan untuk membantu perjalanan penaruhan Anda.

<StakingConsiderations page="saas" />

## Eksplorasi penyedia layanan penaruhan {#saas-providers}

Berikut adalah beberapa penyedia layanan SaaS yang tersedia. Gunakan indikator-indikator di atas untuk membantu memandu Anda melalui layanan-layanan ini

<ProductDisclaimer />

### Penyedia layanan SaaS

<StakingProductsCardGrid category="saas" />

Harap perhatikan pentingnya mendukung [diversitas klien](/developers/docs/nodes-and-clients/client-diversity/) karena ini meningkatkan keamanan jaringan, dan membatasi risiko Anda. Layanan-layanan yang memiliki bukti pembatasan penggunaan mayoritas klien ditandai dengan <em style={{ textTransform: "uppercase" }}>"diversitas klien eksekusi"</em> dan <em style={{ textTransform: "uppercase" }}>"diversitas klien konsensus."</em>

### Pembangkit Kunci

<StakingProductsCardGrid category="keyGen" />

Punya saran untuk penyedia penaruhan sebagai layanan yang kami lewatkan? Lihat [kebijakan daftar produk](/contributing/adding-staking-products/) kami untuk melihat apakah cocok, dan untuk mengirimkannya untuk ditinjau.

## Pertanyaan yang sering diajukan {#faq}

<ExpandableCard title="Siapa yang menyimpan kunci-kunci saya?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Perjanjian akan berbeda dari penyedia ke penyedia, tetapi umumnya Anda akan dipandu melalui pengaturan kunci tanda tangan yang Anda butuhkan (satu per 32 ETH), dan mengunggahnya ke penyedia Anda agar mereka dapat memvalidasi atas nama Anda. Kunci tanda tangan sendiri tidak memberikan kemampuan untuk menarik, mentransfer, atau menghabiskan dana Anda. Namun, kunci tanda tangan juga memberikan kemampuan untuk memberikan suara terhadap konsensus, yang jika tidak dilakukan dengan benar dapat mengakibatkan hukuman offline atau pemotongan.
</ExpandableCard>

<ExpandableCard title="Jadi ada dua set kunci?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Ya. Setiap akun terdiri dari kunci BLS untuk <em>tanda tangan</em> dan kunci BLS untuk <em>penarikan</em>. Agar seorang validator dapat memberikan tanda tangan atas keadaan jaringan, berpartisipasi dalam komite sinkronisasi, dan mengajukan blok, kunci tanda tangan harus mudah diakses oleh klien validator. Kunci-kunci ini harus terhubung ke internet dalam bentuk tertentu, dan oleh karena itu secara inheren dianggap sebagai kunci "panas" (hot keys). Ini merupakan persyaratan agar validator Anda dapat memberikan tanda tangan, dan oleh karena itu kunci yang digunakan untuk mentransfer atau menarik dana dipisahkan karena alasan keamanan.

Kunci penarikan BLS digunakan untuk menandatangani pesan satu kali yang menyatakan akun lapisan eksekusi mana yang harus menerima imbalan penaruhan dan dana yang ditarik. Setelah pesan ini disiarkan, kunci <em>penarikan BLS</em> tidak lagi diperlukan. Sebagai gantinya, kendali atas dana yang ditarik secara permanen didelegasikan ke alamat yang Anda berikan. Hal ini memungkinkan Anda untuk mengatur alamat penarikan yang diamankan melalui penyimpanan dingin (cold storage) milik Anda sendiri, meminimalkan risiko terhadap dana validator Anda, bahkan jika orang lain mengontrol kunci tanda tangan validator Anda.

Memperbarui kredensial penarikan adalah langkah yang diperlukan untuk mengaktifkan penarikan\*. Proses ini melibatkan pembuatan kunci penarikan dengan menggunakan frase benih mnemonik Anda.

<strong>Pastikan Anda mencadangkan frase benih ini dengan aman, jika tidak Anda tidak akan dapat menghasilkan kunci penarikan Anda saat waktunya tiba.</strong>

\*Penaruh yang telah menyediakan alamat penarikan pada saat deposit awal tidak perlu mengatur ini. Hubungi penyedia SaaS Anda untuk mendapatkan dukungan mengenai cara menyiapkan validator Anda.
</ExpandableCard>

<ExpandableCard title="Kapan saya bisa menarik dana?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Penarikan penaruhan diimplementasikan dalam peningkatan Shanghai/Capella pada April 2023. Para penaruh perlu menyediakan alamat penarikan (jika tidak disediakan saat deposit awal), dan pembayaran imbalan akan mulai didistribusikan secara otomatis secara berkala setiap beberapa hari.

Para validator juga dapat sepenuhnya keluar sebagai validator, yang akan membuka kunci saldo ETH mereka yang tersisa untuk penarikan. Akun yang telah menyediakan alamat penarikan eksekusi dan menyelesaikan proses keluar akan menerima seluruh saldo mereka ke alamat penarikan yang disediakan selama sweep validator berikutnya.

<ButtonLink to="/staking/withdrawals/">Lebih lanjut tentang penarikan penaruhan</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Apa yang terjadi jika saya terkena pengurangan hadiah pemotongan?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Dengan menggunakan penyedia SaaS, Anda mempercayakan operasi simpul Anda kepada pihak lain. Ini membawa risiko kinerja simpul yang buruk, yang tidak berada dalam kendali Anda. Jika validator Anda terkena pemotongan, saldo validator Anda akan dikenai hukuman dan secara paksa dihapus dari pool validator.

Setelah selesai proses pemotongan hadiah/keluar, dana tersebut akan ditransfer ke alamat penarikan yang ditetapkan untuk validator tersebut. Ini memerlukan menyediakan alamat penarikan untuk diaktifkan. Alamat penarikan mungkin telah disediakan saat deposit awal. Jika tidak, kunci penarikan validator harus digunakan untuk menandatangani pesan yang menyatakan alamat penarikan. Jika tidak ada alamat penarikan yang disediakan, dana akan tetap terkunci sampai alamat penarikan diberikan.

Hubungi penyedia SaaS secara individu untuk mendapatkan informasi lebih lanjut tentang jaminan atau opsi asuransi, dan petunjuk tentang cara menyediakan alamat penarikan. Jika Anda lebih suka memiliki kendali penuh atas pengaturan validator Anda, <a href="/staking/solo/">pelajari lebih lanjut tentang cara melakukan taruhan solo untuk ETH</a>.
</ExpandableCard>

## Bacaan lebih lanjut {#further-reading}

- [Direktori Penaruhan Ethereum](https://www.staking.directory/) - _Eridian dan Spacesider_
- [Menilai Layanan Penaruhan](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
