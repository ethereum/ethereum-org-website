---
title: Lapisan jaringan
description: Sebuah pengantar untuk layer jaringan Ethereum.
lang: id
sidebarDepth: 2
---

Ethereum adalah jaringan antar rekan dengan ribuan node yang harus dapat berkomunikasi satu sama lain menggunakan protokol standar. "Lapisan jaringan" adalah tumpukan protokol yang memungkinkan node-node tersebut untuk menemukan satu sama lain untuk bertukar informasi. Ini termasuk "menggosipkan" informasi (komunikasi satu ke banyak) melalui jaringan serta menukar permintaan dan tanggapan antar node tertentu (komunikasi satu per satu). Setiap node harus mematuhi aturan jaringan tertentu untuk memastikan bahwa mereka telah mengirim dan menerima informasi yang benar.

Ada dua bagian dari perangkat lunak klien (klien eksekusi dan klien konsensus), masing-masing dengan tumpukan jaringan yang berbeda. Selain berkomunikasi dengan node Ethereum lainnya, klien eksekusi dan konsensus harus berkomunikasi satu sama lainnya. Halaman ini memberikan penjelasan pengantar tentang protokol yang memungkinkan komunikasi ini.

Klien eksekusi menggosipkan transaksi melalui lapisan eksekusi jaringan antar rekan. Hal ini memerlukan komunikasi terenkripsi antara rekan yang telah di autentikkan. Ketika seorang pengesah dipilih untuk mengusulkan sebuah blok, transaksi dari kumpulan transaksi lokal nude akan di teruskan ke klien konsensus melalui koneksi RPC lokal, yang akan di kemas dalam blok-blok Suar. Klien konsensus kemudian akan menggosipkan tentang blok-blok Suar di seluruh jaringan p2p mereka. Hal ini membutuhkan dua jaringan p2p yang terpisah: satu jaringan yang menghubungkan klien eksekusi untuk gosip transaksi dan satu jaringan menghubungkan klien konsensus untuk gosip blok.

## Persyaratan {#prerequisites}

Sedikit pengetahuan tentang [node dan klien](/developers/docs/nodes-and-clients/) Ethereum akan membantu untuk memahami halaman ini.

## Lapisan Eksekusi {#execution-layer}

Protokol layer eksekusi dibagi menjadi dua tumpukan:

- tumpukan penemuan: di bangun di atas UDP dan memungkinkan node baru untuk menemukan rekan-rekannya untuk terhubung

- tumpukan DeVP2P: berada di atas TCP dan memungkinkan node bertukar informasi

Kedua tumpukan bekerja secara paralel. Tumpukan penemuan memasukkan peserta network baru ke dalam network, dan tumpukan DeVP2P memungkinkan interaksi mereka.

### Penemuan {#discovery}

Penemuan adalah proses menemukan node lain dalam jaringan. Ini di-bootstrap menggunakan sekumpulan kecil bootnode (node yang alamatnya di-[hardcode](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go) ke dalam klien sehingga dapat segera ditemukan dan menghubungkan klien ke peer). Bootnode ini hanya ada untuk memperkenalkan node baru ke sekumpulan rekan ini merupakan satu-satunya tujuan mereka, mereka tidak berpartisipasi dalam tugas-tugas klien normal seperti menghubungkan rantai, dan mereka hanya digunakan saat pertama kali sebuah klien dijalankan.

Protokol yang digunakan untuk interaksi node-bootnode adalah bentuk modifikasi dari [Kademlia](https://medium.com/coinmonks/a-brief-overview-of-kademlia-and-its-use-in-various-decentralized-platforms-da08a7f72b8f) yang menggunakan [tabel hash terdistribusi](https://en.wikipedia.org/wiki/Distributed_hash_table) untuk berbagi daftar node. Setiap node memiliki versi tabel ini yang berisi informasi yang di butuhkan untuk terhubung ke node terdekat. 'Kedekatan' ini tidak bersifat geografis - jarak ditentukan oleh kesamaan ID node. Tabel setiap node secara teratur di-muat ulang sebagai fitur keamanan. Sebagai contoh, dalam protokol penemuan [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5), node juga dapat mengirim 'iklan' yang menampilkan subprotokol yang didukung oleh klien, memungkinkan peer untuk bernegosiasi tentang protokol yang dapat mereka gunakan bersama untuk berkomunikasi.

Penelusuran dimulai dengan permainan Ping-Pong. Sebuah PING-PONG yang berhasil akan "mengikat"node baru ke sebuah bootnode. Pesan awal yang memberitahu bootnode tentang adanya node baru yang masuk ke jaringan adalah `PING`. `PING` ini menyertakan informasi yang di-hash tentang node baru, bootnode, dan stempel waktu kedaluwarsa. Bootnode menerima `PING` dan mengembalikan `PONG` yang berisi hash `PING`. Jika hash `PING` dan `PONG` cocok, maka koneksi antara node baru dan bootnode diverifikasi dan mereka dianggap telah "bonded".

Setelah terikat, node baru dapat mengirimkan permintaan `FIND-NEIGHBOURS` ke bootnode. Data yang dikembalikan oleh bootnode termasuk daftar peer yang dapat disambungkan ke node baru. Jika node tidak terikat, permintaan `FIND-NEIGHBOURS` akan gagal, sehingga node baru tidak akan dapat masuk ke jaringan.

Setelah node baru menerima daftar tetangga dari bootnode, node baru akan memulai pertukaran PING-PONG dengan masing-masing tetangga. PING-PONG yang berhasil akan mengikat bond node baru dengan tetangganya, sehingga memungkinkan pertukaran pesan.

```
mulai klien --> sambungkan ke bootnode --> ikat ke bootnode --> temukan tetangga --> ikat ke tetangga
```

Klien eksekusi saat ini menggunakan protokol penemuan [Discv4](https://github.com/ethereum/devp2p/blob/master/discv4.md) dan ada upaya aktif untuk bermigrasi ke protokol [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5).

#### ENR: Catatan Node Ethereum {#enr}

[Catatan Node Ethereum (ENR)](/developers/docs/networking-layer/network-addresses/) adalah objek yang berisi tiga elemen dasar: tanda tangan (hash dari konten catatan yang dibuat sesuai dengan skema identitas yang disepakati), nomor urut yang melacak perubahan pada catatan, dan daftar pasangan kunci:nilai yang arbitrer. Ini adalah format future-proof yang memungkinkan pertukaran informasi identitas yang lebih mudah antara peer baru dan merupakan format [alamat jaringan](/developers/docs/networking-layer/network-addresses) yang lebih disukai untuk node Ethereum.

#### Mengapa penelusuran nya dibangun pada UDP? {#why-udp}

UDP tidak mendukung pemeriksaan kesalahan, pengiriman ulang paket yang gagal, atau pembukaan dan penutupan koneksi secara dinamis - melainkan itu hanya menghasilkan aliran informasi secara terus-menerus ke target, terlepas dari sukses atau tidak informasi tersebut diterima. Fungsi yang minim ini juga menghasilkan overhead yang minim, sehingga jenis koneksi ini sangat cepat. UDP sudah cukup untuk penemuan di mana sebuah simpul hanya ingin membuat kehadirannya diketahui untuk kemudian membangun koneksi formal dengan seorang rekan. Namun, untuk sisa dari tumpukan jaringan, UDP tidak cocok untuk tujuan ini. Pertukaran informasi antar simpul cukup rumit sehingga membutuhkan protokol dengan fitur lebih lengkap yang dapat mendukung pengiriman ulang, pemeriksaan kesalahan, dan lain lain. Overhead tambahan yang terkait dengan TCP sepadan dengan adanya tambahan fungsionalitas. Maka dari itu, sebagian besar tumpukan P2P beroperasi melalui TCP.

### DevP2P {#devp2p}

DevP2P adalah sebuah tumpukan protokol utuh yang diimplementasikan Ethereum untuk mendirikan dan mempertahankan jaringan peer-to-peer. Setelah node baru masuk ke jaringan, interaksi mereka diatur oleh protokol dalam stack [DevP2P](https://github.com/ethereum/devp2p). Semua ini berjalan di atas TCP dan mencakup protokol transport RLPx, wire protocol, dan beberapa sub-protokol. [RLPx](https://github.com/ethereum/devp2p/blob/master/rlpx.md) adalah protokol yang mengatur inisiasi, autentikasi, dan pemeliharaan sesi antar node. RLPx menyandikan pesan menggunakan RLP (Recursive Length Prefix) yang merupakan metode sangat efisien dalam penggunaan ruang untuk menyandikan data ke dalam struktur minimal agar dapat dikirim antar node.

Sebuah sesi RLPx antara dua simpul dimulai dengan sesi awal jabat tangan kriptografis. Hal ini melibatkan satu simpul mengirim pesan auth yang kemudian di verifikasi oleh rekan nya. Pada verifikasi yang berhasil, rekan menghasilkan pesan auth-acknowledgement untuk dikembalikan ke simpul awal. Hal ini merupakan proses pertukaran kunci yang memungkinkan simpul untuk melakukan komunikasi secara pribadi dan aman. Sesi jabat tangan kriptografis yang berhasil akan memicu kedua simpul untuk saling mengirim pesan "halo" secara tersambung. Protokol kabel di inisiasi oleh pertukaran pesan halo yang berhasil.

Pesan halo tersebut berisi:

- versi protokol
- id klien
- terminal
- id simpul
- daftar sub-protokol yang didukung

Ini merupakan informasi yang diperlukan untuk menghasilkan interaksi yang berhasil karena hal itu menentukan kemampuan apa yang di bagikan antara kedua simpul dan menyusun komunikasi nya. Terdapat proses negosiasi sub-protokol di mana daftar sub-protokol yang didukung oleh masing-masing simpul dibandingkan dan yang umum di antara keduanya dapat digunakan pada sesi tersebut.

Bersamaan dengan pesan halo, protokol kabel juga dapat mengirim pesan "disconnect" yang memberi peringatan kepada seorang rekan bahwa koneksi akan ditutup. Protokol kabel juga mencakup pesan PING dan PONG yang dikirim secara berkala untuk menjaga sesi tetap terbuka. Pertukaran RLPx dan protokol kabel menetapkan dasar komunikasi antara simpul, menyediakan perancah untuk pertukaran informasi yang berguna sesuai dengan sub-protokol tertentu.

### Sub-protokol {#sub-protocols}

#### Protokol wire {#wire-protocol}

Setelah rekan peers terhubung dan sesi RLPx dimulai, wire protocol menentukan bagaimana para rekan berkomunikasi. Awalnya, wire protocol mendefinisikan tiga tugas utama: sinkronisasi rantai, propagasi blok, dan pertukaran transaksi. Namun, setelah Ethereum beralih ke proof-of-stake, propagasi blok dan sinkronisasi rantai menjadi bagian dari consensus layer. Bursa Transaksi masih menjadi tanggung jawab Klien Eksekusi. Bursa Transaksi mengacu pada pertukaran transaksi yang tertunda antar node sehingga pembangun blok dapat memilih beberapa diantaranya untuk dimasukan ke dalam Blok berikutnya. Informasi terperinci tentang tugas-tugas ini tersedia [di sini](https://github.com/ethereum/devp2p/blob/master/caps/eth.md). Klien yang mendukung sub-protokol ini mengeksposnya melalui [JSON-RPC](/developers/docs/apis/json-rpc/).

#### les (subprotokol Ethereum ringan) {#les}

Ini adalah protokol minimal untuk melakukan sinkronisasi light client. Secara tradisional protokol ini jarang digunakan karena node penuh harus menyediakan data untuk light client tanpa mendapatkan insentif. Perilaku bawaan dari execution client adalah tidak menyediakan data light client melalui les. Informasi lebih lanjut tersedia di [spesifikasi](https://github.com/ethereum/devp2p/blob/master/caps/les.md) les.

#### Snap {#snap}

[Protokol snap](https://github.com/ethereum/devp2p/blob/master/caps/snap.md#ethereum-snapshot-protocol-snap) adalah ekstensi opsional yang memungkinkan peer untuk bertukar snapshot dari state terbaru, yang memungkinkan peer untuk memverifikasi data akun dan penyimpanan tanpa harus mengunduh node Merkle trie perantara.

#### Wit (protokol witness) {#wit}

[Protokol witness](https://github.com/ethereum/devp2p/blob/master/caps/wit.md#ethereum-witness-protocol-wit) adalah ekstensi opsional yang memungkinkan pertukaran state witness antar-peer, membantu menyinkronkan klien ke ujung rantai.

#### Whisper {#whisper}

Whisper adalah sebuah protokol yang bertujuan untuk menyediakan pengiriman pesan yang aman antar-peer tanpa menuliskan informasi apa pun ke dalam blockchain. Protokol ini dulunya merupakan bagian dari protokol wire DevP2P tetapi sekarang sudah tidak digunakan. [Proyek terkait](https://wakunetwork.com/) lainnya ada dengan tujuan serupa.

## Lapisan konsensus {#consensus-layer}

Klien konsensus berpartisipasi dalam jaringan peer-to-peer terpisah dengan spesifikasi yang berbeda. Klien konsensus perlu berpartisipasi dalam block gossip agar dapat menerima blok baru dari peer dan menyiarkannya ketika giliran mereka menjadi proposer blok. Sama seperti execution layer, hal ini terlebih dahulu memerlukan protokol discovery agar sebuah node dapat menemukan peer dan membangun sesi yang aman untuk bertukar blok, atestasi, dan lain-lain.

### Penemuan {#consensus-discovery}

Serupa dengan klien eksekusi, klien konsensus menggunakan [discv5](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#the-discovery-domain-discv5) melalui UDP untuk menemukan peer. Implementasi discv5 di lapisan konsensus berbeda dari klien eksekusi hanya karena menyertakan adaptor yang menghubungkan discv5 ke dalam stack [libP2P](https://libp2p.io/), yang menghentikan penggunaan DevP2P. Sesi RLPx di execution layer sudah tidak digunakan lagi, digantikan oleh handshake saluran aman noise dari libP2P.

### ENR {#consensus-enr}

ENR untuk node konsensus mencakup kunci publik node, alamat IP, port UDP dan TCP, dan dua bidang khusus konsensus: bitfield subnet atestasi dan kunci `eth2`. Yang pertama memudahkan simpul-simpul untuk menemukan rekan yang berpartisipasi dalam sub-jaringan pengesahan isu tertentu. Kunci `eth2` berisi informasi tentang versi fork Ethereum mana yang digunakan node, memastikan peer terhubung ke Ethereum yang benar.

### libP2P {#libp2p}

Tumpukan libP2P mendukung semua komunikasi setelah proses penemuan. Klien dapat melakukan panggilan dan mendengarkan pada IPv4 dan/atau IPv6 sesuai dengan yang ditentukan dalam ENR mereka. Protokol pada lapisan libP2P dapat dibagi menjadi dua domain utama: gossip dan req/resp.

### Gossip {#gossip}

Domain gossip mencakup semua informasi yang harus menyebar dengan cepat ke seluruh jaringan. Ini mencakup beacon block, bukti, attestation, exit, dan slashing. Ini dikirim menggunakan libP2P gossipsub v1 dan bergantung pada berbagai metadata yang disimpan secara lokal di setiap node, termasuk ukuran maksimum payload gosip yang dapat diterima dan dikirim. Informasi terperinci tentang domain gosip tersedia [di sini](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#the-gossip-domain-gossipsub).

### Permintaan-respons {#request-response}

Domain request-response berisi protokol untuk klien yang meminta informasi spesifik dari peer. Contohnya termasuk meminta blok Beacon tertentu yang cocok dengan root hash tertentu atau yang berada dalam rentang slot tertentu. Respons selalu dikembalikan dalam bentuk bytes SSZ yang dikompresi menggunakan Snappy.

## Mengapa klien consensus lebih memilih SSZ dibanding RLP? {#ssz-vs-rlp}

SSZ singkatan dari serialisasi sederhana. Ini menggunakan offset tetap yang memudahkan dekode bagian-bagian individual dari pesan yang telah dienkode tanpa harus mendekode seluruh struktur, yang sangat berguna bagi klien konsensus karena dapat mengambil informasi tertentu dari pesan yang dienkode dengan efisien. Ini juga dirancang khusus untuk terintegrasi dengan protokol Merkle, dengan keuntungan efisiensi terkait untuk proses Merkleization. Karena semua hash di lapisan konsensus adalah Merkle root, hal ini menghasilkan peningkatan yang signifikan. SSZ juga menjamin representasi nilai yang unik.

## Menghubungkan klien eksekusi dan konsensus {#connecting-clients}

Baik klien konsensus maupun eksekusi berjalan secara paralel. Keduanya harus terhubung agar klien konsensus dapat memberikan instruksi ke klien eksekusi, dan klien eksekusi dapat mengirimkan bundel transaksi ke klien konsensus untuk dimasukkan ke dalam blok Beacon. Komunikasi antara kedua klien dapat dilakukan menggunakan koneksi RPC lokal. API yang dikenal sebagai ['Engine-API'](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) mendefinisikan instruksi yang dikirim antara kedua klien. Karena kedua klien berada di balik satu identitas jaringan, mereka berbagi ENR (Ethereum Node Record) yang berisi kunci terpisah untuk masing-masing klien (kunci eth1 dan kunci eth2).

Ringkasan alur kontrol ditunjukkan di bawah ini, dengan tumpukan jaringan yang relevan dalam tanda kurung.

### Saat klien konsensus bukan produsen blok: {#when-consensus-client-is-not-block-producer}

- Klien konsensus menerima blok melalui protokol gosip blok (konsensus p2p)
- Klien konsensus melakukan pra-validasi blok, yaitu memastikan blok tersebut tiba dari pengirim yang valid dengan metadata yang benar.
- Transaksi dalam blok dikirim ke lapisan eksekusi sebagai muatan eksekusi (koneksi RPC lokal)
- Lapisan eksekusi mengeksekusi transaksi dan memvalidasi state di header blok (yaitu, memeriksa kecocokan hash).
- Lapisan eksekusi mengirimkan kembali data validasi ke lapisan konsensus, sehingga blok tersebut kini dianggap tervalidasi (melalui koneksi RPC lokal)
- Lapisan konsensus menambahkan blok ke ujung rantai bloknya sendiri dan melakukan attestasi terhadapnya, lalu menyiarkan attestasi tersebut ke seluruh jaringan (p2p konsensus)

### Saat klien konsensus adalah produsen blok: {#when-consensus-client-is-block-producer}

- Klien konsensus menerima pemberitahuan bahwa ia adalah produsen blok berikutnya (p2p konsensus)
- Lapisan konsensus memanggil metode `create block` di klien eksekusi (RPC lokal).
- Lapisan eksekusi mengakses transaksi mempool yang telah diisi oleh protokol transaksi gossip (p2p eksekusi)
- Klien eksekusi menggabungkan transaksi ke dalam sebuah blok, mengeksekusi transaksi tersebut, dan menghasilkan blok hash
- Klien konsensus mengambil transaksi dan block hash dari klien eksekusi, lalu menambahkannya ke dalam beacon block (melalui koneksi RPC lokal)
- Klien konsensus menyiarkan blok melalui protokol gosip blok (konsensus p2p)
- Klien lain menerima blok yang diusulkan melalui protokol block gossip dan melakukan validasi sebagaimana dijelaskan sebelumnya (melalui consensus p2p)

Setelah sebuah blok mendapatkan cukup banyak attestation dari para validator, blok tersebut ditambahkan ke ujung rantai, kemudian dijustifikasi dan akhirnya difinalisasi.

![](cons_client_net_layer.png)
![](exe_client_net_layer.png)

Skema lapisan jaringan untuk klien konsensus dan eksekusi, dari [ethresear.ch](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)

## Bacaan Lebih Lanjut {#bacaan-lebih lanjut}

[DevP2P](https://github.com/ethereum/devp2p)
[LibP2p](https://github.com/libp2p/specs)
[Spesifikasi jaringan lapisan konsensus](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#enr-structure)
[Kademlia ke discv5](https://vac.dev/kademlia-to-discv5)
[Makalah Kademlia](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf)
[Pengantar P2P Ethereum](https://p2p.paris/en/talks/intro-ethereum-networking/)
[Hubungan eth1/eth2](http://ethresear.ch/t/eth1-eth2-client-relationship/7248)
[Video detail Merge dan klien eth2](https://www.youtube.com/watch?v=zNIrIninMgg)
