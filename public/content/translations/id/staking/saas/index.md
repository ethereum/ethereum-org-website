---
title: Mengunci sebagai layanan
description: Pelajari tentang mengunci sebagai layanan (staking as a service)
lang: id
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: Badak Leslie mengambang di awan.
sidebarDepth: 2
summaryPoints:
  - Operator node pihak ketiga menangani operasi klien validator Anda
  - Pilihan tepat bagi siapa saja yang memiliki 32 ETH yang merasa tidak nyaman berurusan dengan kerumitan teknis dalam menjalankan node
  - Mengurangi kepercayaan, dan mempertahankan hak asuh atas kunci penarikan Anda
---

## Apa itu mengunci sebagai layanan? {#what-is-staking-as-a-service}

Mengunci sebagai layanan ("SaaS") mewakili kategori layanan mengunci di mana Anda mendepositkan 32 ETH Anda sendiri untuk validator, tetapi mendelegasikan operasi node ke operator pihak ketiga. Proses ini biasanya melibatkan panduan melalui pengaturan awal, termasuk pembuatan kunci dan deposit, kemudian mengunggah kunci penandatanganan Anda ke operator. Hal ini memungkinkan layanan untuk mengoperasikan validator Anda atas nama Anda, biasanya dengan biaya bulanan.

## Mengapa mengunci dengan layanan? {#why-stake-with-a-service}

Protokol [Ethereum](/) tidak secara bawaan mendukung pendelegasian stake, sehingga layanan ini telah dibangun untuk memenuhi permintaan ini. Jika Anda memiliki 32 ETH untuk di-stake, tetapi merasa tidak nyaman berurusan dengan perangkat keras, layanan SaaS memungkinkan Anda untuk mendelegasikan bagian yang sulit sementara Anda mendapatkan hadiah blok bawaan.

<CardGrid>
  <Card title="Validator Anda sendiri" emoji=":desktop_computer:" description="Depositkan 32 ETH Anda sendiri untuk mengaktifkan set kunci penandatanganan Anda sendiri yang akan berpartisipasi dalam konsensus Ethereum. Pantau kemajuan Anda dengan dasbor untuk melihat akumulasi hadiah ETH tersebut." />
  <Card title="Mudah untuk memulai" emoji="🏁" description="Lupakan tentang spesifikasi perangkat keras, pengaturan, pemeliharaan node, dan peningkatan. Penyedia SaaS memungkinkan Anda mengalihdayakan bagian yang sulit dengan mengunggah kredensial penandatanganan Anda sendiri, memungkinkan mereka menjalankan validator atas nama Anda, dengan biaya kecil." />
  <Card title="Batasi risiko Anda" emoji=":shield:" description="Dalam banyak kasus, pengguna tidak perlu menyerahkan akses ke kunci yang memungkinkan penarikan atau transfer dana yang di-stake. Kunci ini berbeda dari kunci penandatanganan, dan dapat disimpan secara terpisah untuk membatasi (tetapi tidak menghilangkan) risiko Anda sebagai staker." />
</CardGrid>

<StakingComparison page="saas" />

## Apa yang perlu dipertimbangkan {#what-to-consider}

Ada semakin banyak penyedia SaaS untuk membantu Anda mengunci ETH Anda, tetapi semuanya memiliki manfaat dan risikonya masing-masing. Semua opsi SaaS memerlukan asumsi kepercayaan tambahan dibandingkan dengan mengunci di rumah (home-staking). Opsi SaaS mungkin memiliki kode tambahan yang membungkus klien Ethereum yang tidak terbuka atau dapat diaudit. SaaS juga memiliki efek merugikan pada desentralisasi jaringan. Bergantung pada pengaturannya, Anda mungkin tidak mengontrol validator Anda - operator dapat bertindak tidak jujur menggunakan ETH Anda.

Indikator atribut digunakan di bawah ini untuk menandakan kekuatan atau kelemahan penting yang mungkin dimiliki penyedia SaaS yang terdaftar. Gunakan bagian ini sebagai referensi tentang bagaimana kami mendefinisikan atribut-atribut ini saat Anda memilih layanan untuk membantu perjalanan mengunci Anda.

<StakingConsiderations page="saas" />

## Jelajahi penyedia layanan mengunci {#saas-providers}

Di bawah ini adalah beberapa penyedia SaaS yang tersedia. Gunakan indikator di atas untuk membantu memandu Anda melalui layanan ini

<ProductDisclaimer />

### Penyedia SaaS

<StakingProductsCardGrid category="saas" />

Harap perhatikan pentingnya mendukung [keragaman klien](/developers/docs/nodes-and-clients/client-diversity/) karena hal ini meningkatkan keamanan jaringan, dan membatasi risiko Anda. Layanan yang memiliki bukti membatasi penggunaan klien mayoritas ditunjukkan dengan <em style={{ textTransform: "uppercase" }}>"keragaman klien eksekusi"</em> dan <em style={{ textTransform: "uppercase" }}>"keragaman klien konsensus."</em>

### Pembuat Kunci

<StakingProductsCardGrid category="keyGen" />

Punya saran untuk penyedia mengunci sebagai layanan yang kami lewatkan? Lihat [kebijakan pendaftaran produk](/contributing/adding-staking-products/) kami untuk melihat apakah itu cocok, dan untuk mengirimkannya agar ditinjau.

## Pertanyaan yang sering diajukan {#faq}

<ExpandableCard title="Siapa yang memegang kunci saya?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Pengaturan akan berbeda dari satu penyedia ke penyedia lainnya, tetapi umumnya Anda akan dipandu melalui pengaturan kunci penandatanganan apa pun yang Anda butuhkan (satu per 32 ETH), dan mengunggahnya ke penyedia Anda untuk memungkinkan mereka memvalidasi atas nama Anda. Kunci penandatanganan saja tidak memberikan kemampuan apa pun untuk menarik, mentransfer, atau membelanjakan dana Anda. Namun, kunci tersebut memberikan kemampuan untuk memberikan suara menuju konsensus, yang jika tidak dilakukan dengan benar dapat mengakibatkan hukuman luring atau pemotongan.
</ExpandableCard>

<ExpandableCard title="Jadi ada dua set kunci?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Ya. Setiap akun terdiri dari kunci <em>penandatanganan</em> BLS, dan kunci <em>penarikan</em> BLS. Agar validator dapat mengesahkan status chain, berpartisipasi dalam komite sinkronisasi, dan mengusulkan blok, kunci penandatanganan harus mudah diakses oleh klien validator. Kunci ini harus terhubung ke internet dalam beberapa bentuk, dan dengan demikian secara inheren dianggap sebagai kunci "panas" (hot keys). Ini adalah persyaratan agar validator Anda dapat mengesahkan, dan dengan demikian kunci yang digunakan untuk mentransfer atau menarik dana dipisahkan karena alasan keamanan.

Kunci penarikan BLS digunakan untuk menandatangani pesan satu kali yang menyatakan ke akun lapisan eksekusi mana hadiah mengunci dan dana yang keluar harus dikirim. Setelah pesan ini disiarkan, kunci <em>penarikan BLS</em> tidak lagi diperlukan. Sebaliknya, kendali atas dana yang ditarik secara permanen didelegasikan ke alamat yang Anda berikan. Hal ini memungkinkan Anda untuk mengatur alamat penarikan yang diamankan melalui penyimpanan dingin (cold storage) Anda sendiri, meminimalkan risiko pada dana validator Anda, bahkan jika orang lain mengontrol kunci penandatanganan validator Anda.

Memperbarui kredensial penarikan adalah langkah yang diperlukan untuk mengaktifkan penarikan\*. Proses ini melibatkan pembuatan kunci penarikan menggunakan frasa seed mnemonik Anda.

<strong>Pastikan Anda mencadangkan frasa seed ini dengan aman atau Anda tidak akan dapat membuat kunci penarikan Anda saat waktunya tiba.</strong>

\*Staker yang memberikan alamat penarikan dengan deposit awal tidak perlu mengatur ini. Periksa dengan penyedia SaaS Anda untuk dukungan mengenai cara menyiapkan validator Anda.
</ExpandableCard>

<ExpandableCard title="Kapan saya bisa menarik dana?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Staker perlu memberikan alamat penarikan (jika tidak diberikan pada deposit awal), dan pembayaran hadiah akan mulai didistribusikan secara otomatis secara berkala setiap beberapa hari.

Validator juga dapat sepenuhnya keluar sebagai validator, yang akan membuka kunci sisa saldo ETH mereka untuk penarikan. Akun yang telah memberikan alamat penarikan eksekusi dan menyelesaikan proses keluar akan menerima seluruh saldo mereka ke alamat penarikan yang diberikan selama penyapuan validator berikutnya.

<ButtonLink href="/staking/withdrawals/">Lebih lanjut tentang penarikan mengunci</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Apa yang terjadi jika saya terkena pemotongan (slashing)?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Dengan menggunakan penyedia SaaS, Anda mempercayakan operasi node Anda kepada orang lain. Ini datang dengan risiko kinerja node yang buruk, yang tidak berada dalam kendali Anda. Jika validator Anda terkena pemotongan, saldo validator Anda akan dihukum dan dikeluarkan secara paksa dari kumpulan validator.

Setelah selesainya proses pemotongan/keluar, dana ini akan ditransfer ke alamat penarikan yang ditetapkan ke validator. Ini memerlukan penyediaan alamat penarikan untuk diaktifkan. Ini mungkin telah diberikan pada deposit awal. Jika tidak, kunci penarikan validator perlu digunakan untuk menandatangani pesan yang menyatakan alamat penarikan. Jika tidak ada alamat penarikan yang diberikan, dana akan tetap terkunci sampai diberikan.

Hubungi masing-masing penyedia SaaS untuk detail lebih lanjut tentang jaminan atau opsi asuransi apa pun, dan untuk instruksi tentang cara memberikan alamat penarikan. Jika Anda lebih suka memegang kendali penuh atas pengaturan validator Anda, [pelajari lebih lanjut tentang cara melakukan solo stake ETH Anda](/staking/solo/).
</ExpandableCard>

## Bacaan lebih lanjut {#further-reading}

- [Direktori Mengunci Ethereum](https://www.staking.directory/) - _Eridian dan Spacesider_
- [Mengevaluasi Layanan Mengunci](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_