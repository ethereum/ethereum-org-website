---
title: Peta jalan privasi untuk Ethereum
description: Ethereum berupaya menjadikan privasi sebagai properti kelas satu dari jaringan melalui peningkatan yang melindungi privasi transaksi, mengamankan akses data pengguna, dan memungkinkan identitas yang dapat diverifikasi namun tetap privat.
lang: id
image: /images/roadmap/roadmap-security.png
alt: "Peta jalan Ethereum"
template: roadmap
---

**Privasi di Ethereum sedang beralih dari tambahan opsional menjadi bawaan tingkat jaringan.** Peta jalan privasi yang diusulkan Ethereum menargetkan titik koneksi rentan tertentu di mana data pengguna dapat bocor saat ini. Penelitian di seluruh ekosistem bertujuan untuk menjadikan Ethereum sebagai platform di mana privasi bersifat struktural, bukan sekadar pilihan (opt-in).

Para peneliti di Yayasan Ethereum telah [menggabungkan tiga prioritas inti peta jalan](https://pse.dev/blog/pse-roadmap-2025) dari penelitian terdistribusi di seluruh ekosistem:

- **Pembacaan privat** - melakukan kueri dan menelusuri Ethereum tanpa mengungkapkan alamat, kontrak, atau data mana yang sedang diakses pengguna. Melindungi pembacaan akan menghentikan pengambilan data bahkan sebelum transaksi ditandatangani.
- **Penulisan privat** - mengirim transaksi yang tahan terhadap penyensoran dan kebocoran metadata, mulai dari penyertaan mempool hingga penyelesaian akhir. Melindungi penulisan memastikan transaksi privat tidak disensor atau dikaitkan kembali ke asalnya.
- **Pembuktian privat** - memverifikasi identitas, kelayakan, atau data tanpa mengungkapkan informasi pribadi yang mendasarinya, menggunakan bukti zero-knowledge yang efisien. Pembuktian privat memungkinkan pengguna untuk berpartisipasi dalam jaringan sambil memilih untuk hanya mengungkapkan informasi minimum yang diperlukan (pengungkapan selektif).

Bersama-sama, ketiga area ini membentuk model privasi ujung-ke-ujung (end-to-end). Tujuannya adalah **kedaulatan komputasional**, memastikan Ethereum menjadi platform di mana individu dan institusi dapat berinteraksi, berkoordinasi, dan bertransaksi secara global tanpa pengambilan data yang tidak disetujui, pengawasan, atau penyensoran terpusat.

**Mengapa privasi itu penting?** Pelajari tentang privasi, cara melindungi privasi Anda secara online, dan melindungi privasi Anda di Ethereum saat ini.

<ButtonLink variant="outline" href="/privacy/">Lebih lanjut tentang privasi</ButtonLink>

## Pembacaan privat melindungi kueri pengguna dan data akses {#private-reads}

Sebelum transaksi ditandatangani, pengguna perlu membaca data dari rantai blok. Untuk memeriksa saldo, memperkirakan gas, atau memverifikasi state dari kontrak pintar, perangkat lunak dompet mengirimkan kueri ke penyedia node. Kueri **Remote Procedure Call (RPC)** standar ini mengekspos sejumlah besar metadata.

Penyedia node dapat melihat alamat IP pengguna, sidik jari perangkat, alamat spesifik yang dikueri, serta waktu dan frekuensi aktivitas mereka. Bahkan jika pengguna kemudian mengirimkan transaksi privat, penyedia infrastruktur sudah memiliki akses ke peta terperinci dari niat mereka.

<VideoWatch slug="ethereum-privacy-stack-andy-guzman" />

Kebocoran metadata pada lapisan akses adalah salah satu masalah privasi yang paling persisten di semua sistem rantai blok. Ethereum bertujuan untuk mengatasi kebocoran metadata melalui privasi pada asal (menyembunyikan siapa yang bertanya), privasi pada konten (menyembunyikan apa yang ditanyakan), dan memverifikasi kebenaran informasi yang dikembalikan.

**Privasi asal** menggunakan [RPC anonim](https://privreads.ethereum.foundation/feed/anon-rpc/) dan solusi jaringan anonim untuk mengaburkan entitas yang meminta data, **privasi konten** menggunakan taktik seperti pengambilan informasi privat dan [RAM tidak sadar (oblivious RAM)](https://en.wikipedia.org/wiki/Oblivious_RAM) untuk menyembunyikan data yang dikueri, sementara **verifikasi kebenaran** menggunakan klien ringan (light client) untuk membuktikan bahwa data yang dikembalikan akurat.

Blok pembangun kriptografi di balik privasi konten adalah [**Private Information Retrieval (PIR)**](https://en.wikipedia.org/wiki/Private_information_retrieval), sebuah teknik kriptografi yang memungkinkan klien untuk melakukan kueri ke basis data dan mengambil informasi tertentu tanpa mengungkapkan kepada server item mana yang diakses. Server memproses permintaan secara buta dan mengembalikan respons terenkripsi yang hanya dapat didekripsi oleh dompet yang melakukan kueri.

PIR beroperasi pada lapisan akses, berada di antara perangkat lunak dompet dan penyedia node. Seiring matangnya implementasi PIR, mereka akan diintegrasikan ke dalam kit pengembangan perangkat lunak (SDK) dompet dan penyedia infrastruktur, memungkinkan pengguna untuk melakukan kueri ke jaringan tanpa mengekspos aktivitas mereka ke perantara terpusat.

Pembacaan privat juga mengurangi paparan terhadap serangan front-running dan pengurutan transaksi. Jika penyedia infrastruktur tidak dapat melihat kontrak pintar atau alamat mana yang sedang dikueri pengguna, mereka tidak dapat menjual informasi tersebut kepada aktor yang mengambil keuntungan dari mengantisipasi aktivitas onchain.

## Penulisan privat mencegah penyensoran dan kebocoran transaksi {#private-writes}

Setelah transaksi dikirim, transaksi tersebut melewati infrastruktur jaringan yang dapat mengamati atau memblokirnya sebelum dicatat secara onchain. Di sinilah banyak protokol privasi gagal dalam praktiknya. Pembangun blok terpusat yang besar memantau mempool dan dapat secara diam-diam mengesampingkan atau menyensor transaksi yang berasal dari alat privasi. Bahkan jika kriptografi yang mendasarinya kuat, transaksi yang tidak pernah disertakan dalam blok tidak memberikan perlindungan apa pun.

Dua peningkatan tingkat protokol mengatasi masalah ini bersama-sama:

[**EIP-8141 (Transaksi Bingkai/Frame Transactions)**](https://eips.ethereum.org/EIPS/eip-8141) memperkenalkan jenis transaksi baru yang membagi transaksi menjadi beberapa segmen untuk validasi tanda tangan dan otorisasi biaya, serta untuk instruksi transaksi yang sebenarnya. Transaksi bingkai memungkinkan [akun pintar](/roadmap/account-abstraction/) untuk menentukan skema tanda tangan mereka sendiri dan menggunakan kontrak eksternal untuk menutupi biaya gas. Aturan sandboxing yang ketat di mempool mencegah transaksi ini membuka jaringan terhadap serangan penolakan layanan (denial-of-service).

Transaksi bingkai sedang dipertimbangkan untuk [peningkatan Hegotá](https://forkcast.org/upgrade/hegota/) Ethereum, peningkatan jaringan berikutnya setelah [peningkatan Glamsterdam](/roadmap/glamsterdam/) yang akan datang. Peningkatan yang sama juga akan memungkinkan akun pintar untuk mengadopsi [tanda tangan tahan kuantum (quantum-safe)](/roadmap/security/quantum-resistance/) sebelum transisi jaringan pasca-kuantum penuh selesai.

<ExpandableCard title="Bagaimana transaksi frame (EIP-8141) memungkinkan privasi?" eventCategory="/roadmap/privacy" eventName="clicked how do frame transactions enable privacy?">

Transaksi bingkai memungkinkan akun untuk memilih metode verifikasi tanda tangan mereka sendiri. Untuk privasi, ini berarti pengguna dapat mengadopsi skema tanda tangan yang menjaga privasi tanpa menunggu migrasi berskala besar di seluruh jaringan. Transaksi bingkai juga memungkinkan abstraksi biaya gas, memungkinkan alat privasi untuk menutupi biaya transaksi tanpa mengekspos alamat pengguna secara onchain.

</ExpandableCard>

[**EIP-7805 (Daftar Penyertaan yang Ditegakkan oleh Pilihan Percabangan, atau FOCIL)**](https://eips.ethereum.org/EIPS/eip-7805) menyediakan mekanisme penegakan untuk penulisan privat. Pengusul blok diwajibkan oleh aturan konsensus untuk menyertakan transaksi dalam blok mereka dari daftar penyertaan lokal yang digabungkan, yang mengumpulkan transaksi dari berbagai sumber. Jika pembangun blok mencoba menyensor transaksi yang muncul di daftar penyertaan, node pengesah (attesting nodes) akan menolak blok yang diusulkan sepenuhnya. FOCIL saat ini sedang dipertimbangkan untuk [peningkatan Hegotá](https://forkcast.org/upgrade/hegota/).

Transaksi bingkai memberi pengguna fleksibilitas untuk membangun transaksi yang menjaga privasi dengan skema tanda tangan kustom, sementara FOCIL memastikan transaksi tersebut tidak dapat disensor secara selektif setelah masuk ke mempool. Bersama-sama mereka mengatasi dua titik kegagalan yang berbeda: satu memungkinkan format transaksi privat, yang lain menjamin penyertaannya. Tidak ada aktor pusat yang dapat memblokir transfer privat yang valid.

<VideoWatch slug="eip-7805-focil-explained" />

Titik rentan kedua untuk privasi pengguna adalah bagaimana Ethereum melacak urutan transaksi, yang disebut sistem nonce berurutan. Dalam model akun Ethereum standar, setiap akun menggunakan penghitung tunggal yang meningkat secara linier. Jika satu transaksi privat tertunda di mempool, semua transaksi berikutnya dari akun tersebut akan terhenti di belakangnya. Urutan nonce juga memungkinkan pengamat jaringan untuk mengaitkan beberapa transaksi kembali ke akun asal yang sama, sehingga merusak privasi.

[**EIP-8250 (Nonce Berkunci untuk Transaksi Bingkai)**](https://eips.ethereum.org/EIPS/eip-8250), yang saat ini sedang dipertimbangkan untuk Hegotá, menyelesaikan masalah ini dengan memungkinkan satu akun untuk mengelola beberapa urutan transaksi paralel secara bersamaan. Pengguna dapat mengeksekusi banyak transaksi privat di berbagai konteks pada saat yang sama, dan pengamat tidak dapat lagi secara andal mengkorelasikan aktivitas yang berbeda kembali ke akun induk yang sama.

### Pembayaran privat dan transfer nilai {#private-payments}

Selain perutean transaksi dan manajemen nonce, melindungi penulisan memerlukan perlindungan identitas dan aset yang terlibat dalam transfer. Bahkan ketika pengguna melakukan kueri secara privat dan menyiarkan transaksi tanpa penyensoran, data transaksi yang dicatat secara onchain tetap terlihat oleh publik. Siapa pun dapat melihat siapa yang mengirim berapa banyak kepada siapa, dan firma analisis rantai menggabungkan data ini ke dalam profil yang dapat dicari yang bertahan tanpa batas waktu.

[**EIP-8182 (Transfer ETH dan ERC-20 Privat)**](https://eips.ethereum.org/EIPS/eip-8182), yang diusulkan untuk peningkatan Hegotá, memperkenalkan kumpulan terlindung (shielded pool) bersama secara bawaan langsung ke dalam protokol Ethereum untuk transfer ETH dan ERC-20. Kumpulan privasi menggunakan pencampuran kriptografi untuk memutuskan tautan antara setoran dan penarikan, tetapi saat ini hanya tersedia melalui aplikasi privasi, dompet, dan jaringan lapisan 2 (l2).

Secara historis, solusi privasi tingkat aplikasi telah memecah Likuiditas dan menderita karena himpunan anonimitas yang rendah. EIP-8182 mengkonsolidasikan transfer terlindung di tingkat protokol, memungkinkan pengguna untuk merutekan dana melalui kunci pengiriman tersembunyi tanpa memerlukan arsitektur dompet khusus atau berinteraksi dengan aplikasi opt-in yang terfragmentasi.

Pendekatan penelitian lain yang sedang dikembangkan untuk privasi transaksi mencakup bukti yang memungkinkan pengguna untuk mendemonstrasikan bahwa jumlah transaksi valid tanpa mengungkapkan nilai sebenarnya (seperti bulletproofs dan range proofs). Penelitian tentang **transaksi rahasia (confidential transactions)** bertujuan untuk menyembunyikan jumlah sambil tetap memungkinkan jaringan untuk memverifikasi bahwa tidak ada nilai yang diciptakan atau dihancurkan.

Solusi lapisan pembayaran ini dibangun di atas infrastruktur yang dijelaskan sebelumnya di bagian ini. PIR melindungi fase persiapan, transaksi bingkai dan FOCIL memastikan pembayaran privat mencapai mempool tanpa penyensoran, dan zkVM memungkinkan kriptografi kompleks yang diperlukan untuk menyembunyikan nilai sambil mempertahankan jaminan keamanan jaringan.

## Pembuktian privat dan perlindungan identitas {#private-proving}

Privasi bukanlah tentang penyembunyian total. Ini tentang **pengungkapan selektif**, atau memilih informasi apa yang akan diungkapkan, kepada siapa, dan dengan syarat apa. Ethereum mendukung pengungkapan selektif melalui [**bukti zero-knowledge (ZKP)**](/zero-knowledge-proofs/), yang memungkinkan satu pihak untuk membuktikan bahwa suatu pernyataan benar tanpa mengungkapkan data yang mendasarinya. Misalnya, membuktikan kewarganegaraan tanpa mengungkapkan detail paspor, atau membuktikan ambang batas usia tanpa mengungkapkan tanggal lahir yang tepat.

Pembuktian privat terhubung ke peta jalan privasi dengan memungkinkan identitas yang dapat diverifikasi tanpa paparan data di tingkat protokol. Sementara pembacaan dan penulisan privat melindungi metadata transaksi, pembuktian privat memastikan bahwa pemeriksaan identitas dan kelayakan yang diperlukan untuk partisipasi dunia nyata tidak memerlukan penyerahan data pribadi ke sistem verifikasi terpusat.

Pada peta jalan privasi Ethereum, pembuktian privat didukung oleh jalur infrastruktur pelengkap, satu di lapisan eksekusi untuk memungkinkan komputasi privat di tingkat protokol, dan satu di lapisan akses, yang membuat komputasi privat praktis di perangkat konsumen.

**Mesin virtual zero-knowledge (zkVM)** memungkinkan kontrak pintar untuk menjalankan logikanya dan menghasilkan bukti kriptografi bahwa pekerjaan tersebut dilakukan dengan benar. Ketika bukti tersebut benar-benar zero-knowledge, ia tidak mengungkapkan apa pun tentang input, state perantara, atau output, membuka kunci komputasi privat di tingkat jaringan.

Nama "zkVM" membawa nuansa tersendiri; sebagian besar sistem yang disebut zkVM saat ini lebih bersifat ringkas (succinct) daripada zero-knowledge. Bukti mereka kecil dan cepat untuk diverifikasi, tetapi tidak selalu menyembunyikan data yang digunakan untuk menghasilkannya. Saat ini, hanya segelintir sistem pembuktian yang menyediakan properti penyembunyian yang diandalkan oleh aplikasi privasi. [Tolok ukur Pembuktian Sisi Klien (Client-Side Proving)](https://ethproofs.org/csp-benchmarks) melacak zkVM mana yang telah dianalisis untuk zero-knowledge aktual dalam properti sistem mereka. Menutup celah tersebut adalah bagian dari pekerjaan pembuktian privat dalam peta jalan ini.

Transaksi bingkai (EIP-8141) juga terhubung dengan implementasi zkVM. Mereka dapat menggunakan skema verifikasi kustom untuk mengirimkan transisi state yang diverifikasi oleh bukti, memungkinkan aplikasi untuk menawarkan lingkungan eksekusi privat dan mengirimkan bukti kriptografi ke jaringan publik Ethereum bahwa tindakan tersebut dilakukan dengan benar, tanpa mengekspos data transaksi itu sendiri.

Bukti zero-knowledge sangat baik untuk memungkinkan individu membuktikan bahwa data mereka valid sambil menjaganya tetap privat, tetapi mereka tidak dapat dengan mudah mengelola kontrak pintar di mana banyak pengguna perlu berinteraksi dengan kumpulan data rahasia bersama pada saat yang sama.

Untuk menjembatani celah ini, peta jalan Ethereum menggabungkan **Enkripsi Homomorfik Penuh (Fully Homomorphic Encryption/FHE)**. FHE memungkinkan kontrak pintar untuk menjalankan perhitungan langsung pada data terenkripsi tanpa harus mendekripsi atau mengekspos informasi yang mendasarinya. Mengintegrasikan blok pembangun FHE dan koprosesor kriptografi khusus ke dalam Ethereum sangat penting untuk aplikasi terdesentralisasi yang mengandalkan "state tersembunyi" bersama, seperti pembuat pasar otomatis (AMM) privat, kumpulan peminjaman rahasia, atau lelang tawaran tertutup di mana input semua orang harus berinteraksi sambil tetap sepenuhnya rahasia.

**Pembuktian sisi klien** membuat pembuatan bukti privasi ini praktis di perangkat sehari-hari. Proyek Pembuktian Sisi Klien memelihara rangkaian tolok ukur publik yang membandingkan sistem pembuktian dan zkVM pada perangkat keras konsumen, menerbitkan hasilnya di [ethproofs.org](https://ethproofs.org). Penelitian teknis bertujuan untuk bukti [pasca-kuantum](/roadmap/security/quantum-resistance/) yang transparan dengan verifikasi onchain langsung, membuat komputasi privat lebih cepat, lebih mudah diverifikasi langsung di jaringan Ethereum, dan layak digunakan di perangkat seluler.

[**Inisiatif zkID**](https://pse.dev/projects/zk-id) telah menghasilkan infrastruktur sumber terbuka yang selaras dengan kerangka kerja identitas global, termasuk dompet Identitas Digital Eropa (EUDI). Sistem Kredensial Anonim Terbuka (Open Anonymous Credentials/OpenAC) menyediakan ketidaktertautan (unlinkability) untuk kredensial yang diterbitkan, memastikan bahwa beberapa bukti yang dihasilkan oleh pengguna yang sama di berbagai platform tidak dapat dikorelasikan kembali ke satu profil tunggal.

Di ruang tata kelola, protokol [**Infrastruktur Anti-Kolusi Minimal (Minimal Anti-Collusion Infrastructure/MACI)**](https://maci.pse.dev/) menyediakan **kebebasan dari tanda terima (receipt-freeness)**, membuatnya secara kriptografis mustahil untuk membuktikan bagaimana sebuah akun memberikan suara. Karena pemilih tidak dapat menghasilkan tanda terima yang menunjukkan pilihan mereka, pembelian suara dan pemaksaan kehilangan insentif ekonomi mereka. MACI telah mengamankan keputusan pendanaan dunia nyata sejak tahun 2020 melalui [clr.fund](https://clr.fund/), yang telah mendistribusikan jutaan dolar dalam pendanaan kuadratik untuk barang publik Ethereum.

Pemungutan suara yang menjaga privasi telah melindungi pemilih nyata dalam pengaturan berisiko tinggi. [Freedom Tool dari Rarimo](https://docs.rarimo.com/freedom-tool/) menggunakan verifikasi paspor zero-knowledge untuk memungkinkan warga negara membuktikan bahwa mereka memenuhi syarat untuk memilih tanpa mengungkapkan siapa mereka. Ini telah mendukung pemilihan bayangan anonim dan jajak pendapat oposisi di negara-negara termasuk Rusia (pemungutan suara oposisi [Russia2024](https://rarimo.medium.com/russian-opposition-use-rarimos-freedom-tool-to-launch-surveillance-free-voting-app-0d73ebea5e8a)), Georgia (aplikasi jajak pendapat United Space), dan Iran (proyek Iranians Vote), di mana keselamatan pemilih bergantung pada kerahasiaan surat suara kriptografi.

Pembuktian privat juga memungkinkan **privasi yang sadar kepatuhan (compliance-aware privacy)**. Solusi privasi seperti kumpulan privasi menerima setoran secara bebas tetapi mewajibkan pengguna untuk menghasilkan bukti zero-knowledge bahwa dana mereka tidak bersinggungan dengan alamat berbahaya yang diketahui sebelum melakukan penarikan. Model kepatuhan yang dapat diprogram memisahkan tindakan melindungi transaksi dari tindakan mendemonstrasikan kepatuhan terhadap peraturan, memungkinkan pengguna sehari-hari untuk bertransaksi secara privat sambil memenuhi persyaratan institusional.

zkEVM dapat mengeksekusi pemeriksaan kepatuhan ini secara privat, memverifikasi status peraturan tanpa mengekspos detail transaksi atau identitas pengguna.

## Kemajuan peta jalan saat ini {#current-progress}

Arah pengembangan privasi di Ethereum dibentuk oleh penyelarasan di seluruh ekosistem, bukan oleh satu organisasi mana pun. Peta jalan [strawmap.org](https://strawmap.org/) mengumpulkan usulan peningkatan dari seluruh ekosistem untuk melacak dan mengusulkan di mana komunitas telah mencapai konsensus. Para peneliti di Yayasan Ethereum membantu mengelola peta jalan penelitian dan pengembangan paralel di seluruh ekosistem penelitian, yang berfokus pada memajukan alat privasi lapisan akses, infrastruktur identitas, dan sistem yang sadar kepatuhan. Kedua contoh tersebut mencerminkan prioritas mendasar yang sama untuk menjadikan privasi di Ethereum bersifat struktural, bukan sekadar opsional.

Penelitian dan pengembangan privasi di Ethereum mencakup puluhan tim di seluruh ekosistem. Pekerjaan sedang mengalami kemajuan pada peningkatan protokol, solusi lapisan akses, infrastruktur identitas, dan alat yang sadar kepatuhan.

**Peningkatan protokol**: EIP-8141 (Transaksi Bingkai), EIP-7805 (FOCIL), EIP-8250 (Nonce Berkunci), dan EIP-8182 (Kumpulan Terlindung Tingkat Protokol) sedang dalam pengembangan aktif dan dipertimbangkan untuk [peningkatan Hegotá](https://forkcast.org/upgrade/hegota/), peningkatan jaringan berikutnya setelah [Glamsterdam](/roadmap/glamsterdam/). EIP-8025 (bukti eksekusi opsional) dan Pohon Verkle juga ditargetkan untuk Hegotá, menyediakan fondasi untuk komputasi privat berbasis zkEVM di Mainnet Ethereum. Secara paralel, penelitian semakin matang seputar koprosesor FHE untuk memungkinkan kontrak pintar terenkripsi multi-pihak.

**Lapisan akses**: Penelitian PIR sedang mengalami kemajuan dengan implementasi aktif yang diuji oleh tim infrastruktur. SDK dompet Kohaku sedang dalam pengembangan sebagai referensi sumber terbuka untuk dompet yang menjaga privasi.

**Pembuktian sisi klien**: Tim secara aktif menggunakan hasil pengujian berbasis tolok ukur untuk mengoptimalkan bagaimana bukti zero-knowledge berjalan pada perangkat standar. Proyek seperti Spartan-WHIR memajukan bukti yang aman dan tahan kuantum yang dapat dengan mudah diverifikasi langsung di jaringan Ethereum. Inisiatif penelitian seperti leanVM menyediakan zkVM ringan yang dirancang untuk menggabungkan beberapa tanda tangan kriptografi bersama-sama, menyusutkan ukuran data tanda tangan tahan kuantum hingga 250x untuk menghemat ruang dan mengurangi biaya jaringan.

**Identitas dan pembuktian**: Inisiatif zkID memproduksi skema pembuktian yang dioptimalkan untuk perangkat seluler. MACI terus mengamankan putaran pendanaan kuadratik dan tata kelola DAO, alat seperti Freedom Tool dari Rarimo membawa pemungutan suara zero-knowledge ke dalam pemilihan dunia nyata, dan penelitian berkelanjutan terus berlanjut ke standar identitas yang menjaga privasi.

Tidak ada bagian dari pekerjaan ini yang telah selesai. Garis waktu adalah target, bukan jaminan, dan [proses tata kelola berbasis konsensus](/governance/) Ethereum berarti bahwa peta jalan dapat berubah seiring kemajuan penelitian. Namun, ruang lingkup pengembangan aktif dan jumlah tim yang mengerjakan privasi mewakili komitmen yang jelas untuk menjadikan Ethereum tahan ekstraksi secara bawaan.

## Bacaan lebih lanjut {#further-reading}

- [Privasi di Ethereum](/privacy/)
- [Peta Jalan PSE: 2025 dan Seterusnya](https://pse.dev/blog/pse-roadmap-2025)
- [Mandat Yayasan Ethereum](/foundation/mandate/)
- [strawmap.org](https://strawmap.org/)
- [Bukti zero-knowledge](/zero-knowledge-proofs/)
- [Identitas terdesentralisasi](/decentralized-identity/)
- [Peta Jalan Kohaku](https://notes.ethereum.org/@niard/KohakuRoadmap)
- [Tolok ukur Pembuktian Sisi Klien](https://ethproofs.org/csp-benchmarks)
- [zkEVM dalam Angka](https://zkevm.ethereum.foundation/)