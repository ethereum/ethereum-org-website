---
title: Lapisan jaringan
description: "Pengantar tentang lapisan jaringan Ethereum: bagaimana node menemukan peer dan membagikan blok, transaksi, dan atestasi melalui devp2p dan libp2p."
lang: id
sidebarDepth: 2
---

[Ethereum](/) adalah jaringan peer-to-peer dengan ribuan node yang harus dapat berkomunikasi satu sama lain menggunakan protokol standar. "Lapisan jaringan" adalah tumpukan protokol yang memungkinkan node-node tersebut menemukan satu sama lain dan bertukar informasi. Ini termasuk "menggosipkan" informasi (komunikasi satu-ke-banyak) melalui jaringan serta bertukar permintaan dan respons antara node tertentu (komunikasi satu-ke-satu). Setiap node harus mematuhi aturan jaringan tertentu untuk memastikan mereka mengirim dan menerima informasi yang benar.

Ada dua bagian pada perangkat lunak klien (klien eksekusi dan klien konsensus), masing-masing dengan tumpukan jaringannya sendiri yang berbeda. Selain berkomunikasi dengan node Ethereum lainnya, klien eksekusi dan konsensus harus berkomunikasi satu sama lain. Halaman ini memberikan penjelasan pengantar tentang protokol yang memungkinkan komunikasi ini.

Klien eksekusi menggosipkan transaksi melalui jaringan peer-to-peer lapisan eksekusi. Ini membutuhkan komunikasi terenkripsi antara peer yang diautentikasi. Ketika validator dipilih untuk mengusulkan blok, transaksi dari pool transaksi lokal node akan diteruskan ke klien konsensus melalui koneksi RPC lokal, yang akan dikemas ke dalam blok suar. Klien konsensus kemudian akan menggosipkan blok suar di seluruh jaringan p2p mereka. Ini membutuhkan dua jaringan p2p terpisah: satu menghubungkan klien eksekusi untuk gosip transaksi dan satu menghubungkan klien konsensus untuk gosip blok.

## Prasyarat {#prerequisites}

Beberapa pengetahuan tentang [node dan klien](/developers/docs/nodes-and-clients/) Ethereum akan sangat membantu untuk memahami halaman ini.

## Lapisan Eksekusi {#execution-layer}

Protokol jaringan lapisan eksekusi dibagi menjadi dua tumpukan:

- tumpukan penemuan: dibangun di atas UDP dan memungkinkan node baru untuk menemukan peer untuk terhubung

- tumpukan DevP2P: berada di atas TCP dan memungkinkan node untuk bertukar informasi

Kedua tumpukan bekerja secara paralel. Tumpukan penemuan memasukkan peserta jaringan baru ke dalam jaringan, dan tumpukan DevP2P memungkinkan interaksi mereka.

### Penemuan {#discovery}

Penemuan adalah proses menemukan node lain di jaringan. Ini di-bootstrap menggunakan sekumpulan kecil simpul boot (node yang alamatnya [di-hardcode](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go) ke dalam klien sehingga mereka dapat segera ditemukan dan menghubungkan klien ke peer). Simpul boot ini hanya ada untuk memperkenalkan node baru ke sekumpulan peer - ini adalah satu-satunya tujuan mereka, mereka tidak berpartisipasi dalam tugas klien normal seperti sinkronisasi rantai, dan mereka hanya digunakan saat pertama kali klien dijalankan.

Protokol yang digunakan untuk interaksi node-simpul boot adalah bentuk modifikasi dari [Kademlia](https://medium.com/coinmonks/a-brief-overview-of-kademlia-and-its-use-in-various-decentralized-platforms-da08a7f72b8f) yang menggunakan [tabel hash terdistribusi](https://en.wikipedia.org/wiki/Distributed_hash_table) untuk membagikan daftar node. Setiap node memiliki versi tabel ini yang berisi informasi yang diperlukan untuk terhubung ke peer terdekatnya. 'Kedekatan' ini bukan secara geografis - jarak ditentukan oleh kesamaan ID node. Tabel setiap node disegarkan secara teratur sebagai fitur keamanan. Misalnya, dalam [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5), node protokol penemuan juga dapat mengirim 'iklan' yang menampilkan subprotokol yang didukung klien, memungkinkan peer untuk bernegosiasi tentang protokol yang dapat mereka gunakan bersama untuk berkomunikasi.

Penemuan dimulai dengan permainan PING-PONG. PING-PONG yang berhasil "mengikat" node baru ke simpul boot. Pesan awal yang memperingatkan simpul boot tentang keberadaan node baru yang memasuki jaringan adalah `PING`. `PING` ini mencakup informasi yang di-hash tentang node baru, simpul boot, dan stempel waktu kedaluwarsa. Simpul boot menerima `PING` dan mengembalikan `PONG` yang berisi hash `PING`. Jika hash `PING` dan `PONG` cocok, maka koneksi antara node baru dan simpul boot diverifikasi dan mereka dikatakan telah "terikat".

Setelah terikat, node baru dapat mengirim permintaan `FIND-NEIGHBOURS` ke simpul boot. Data yang dikembalikan oleh simpul boot mencakup daftar peer yang dapat dihubungkan oleh node baru. Jika node tidak terikat, permintaan `FIND-NEIGHBOURS` akan gagal, sehingga node baru tidak akan dapat memasuki jaringan.

Setelah node baru menerima daftar tetangga dari simpul boot, ia memulai pertukaran PING-PONG dengan masing-masing dari mereka. PING-PONG yang berhasil mengikat node baru dengan tetangganya, memungkinkan pertukaran pesan.

```
start client --> connect to bootnode --> bond to bootnode --> find neighbours --> bond to neighbours
```

Klien eksekusi saat ini menggunakan protokol penemuan [Discv4](https://github.com/ethereum/devp2p/blob/master/discv4.md) dan ada upaya aktif untuk bermigrasi ke protokol [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5).

#### ENR: Catatan Node Ethereum {#enr}

[Catatan Node Ethereum (ENR)](/developers/docs/networking-layer/network-addresses/) adalah objek yang berisi tiga elemen dasar: tanda tangan (hash dari konten catatan yang dibuat menurut beberapa skema identitas yang disepakati), nomor urut yang melacak perubahan pada catatan, dan daftar pasangan kunci:nilai arbitrer. Ini adalah format tahan masa depan yang memungkinkan pertukaran informasi identifikasi yang lebih mudah antara peer baru dan merupakan format [alamat jaringan](/developers/docs/networking-layer/network-addresses) yang disukai untuk node Ethereum.

#### Mengapa penemuan dibangun di atas UDP? {#why-udp}

UDP tidak mendukung pemeriksaan kesalahan apa pun, pengiriman ulang paket yang gagal, atau membuka dan menutup koneksi secara dinamis - sebaliknya, ia hanya menembakkan aliran informasi yang berkelanjutan ke target, terlepas dari apakah itu berhasil diterima. Fungsionalitas minimal ini juga berarti overhead yang minimal, membuat jenis koneksi ini sangat cepat. Untuk penemuan, di mana sebuah node hanya ingin membuat kehadirannya diketahui untuk kemudian membuat koneksi formal dengan peer, UDP sudah cukup. Namun, untuk sisa tumpukan jaringan, UDP tidak sesuai dengan tujuannya. Pertukaran informasi antara node cukup kompleks dan oleh karena itu membutuhkan protokol berfitur lebih lengkap yang dapat mendukung pengiriman ulang, pemeriksaan kesalahan, dll. Overhead tambahan yang terkait dengan TCP sepadan dengan fungsionalitas tambahannya. Oleh karena itu, sebagian besar tumpukan P2P beroperasi melalui TCP.

### DevP2P {#devp2p}

DevP2P itu sendiri adalah seluruh tumpukan protokol yang diimplementasikan Ethereum untuk membangun dan memelihara jaringan peer-to-peer. Setelah node baru memasuki jaringan, interaksi mereka diatur oleh protokol dalam tumpukan [DevP2P](https://github.com/ethereum/devp2p). Semuanya berada di atas TCP dan mencakup protokol transportasi RLPx, protokol kawat (wire protocol), dan beberapa sub-protokol. [RLPx](https://github.com/ethereum/devp2p/blob/master/rlpx.md) adalah protokol yang mengatur inisiasi, autentikasi, dan pemeliharaan sesi antar node. RLPx menyandikan pesan menggunakan Awalan Panjang Rekursif (RLP) yang merupakan metode penyandian data yang sangat hemat ruang ke dalam struktur minimal untuk dikirim antar node.

Sesi RLPx antara dua node dimulai dengan jabat tangan kriptografi awal. Ini melibatkan node yang mengirim pesan autentikasi yang kemudian diverifikasi oleh peer. Pada verifikasi yang berhasil, peer menghasilkan pesan pengakuan autentikasi untuk dikembalikan ke node inisiator. Ini adalah proses pertukaran kunci yang memungkinkan node untuk berkomunikasi secara pribadi dan aman. Jabat tangan kriptografi yang berhasil kemudian memicu kedua node untuk mengirim pesan "hello" satu sama lain "di atas kawat" (on the wire). Protokol kawat diinisiasi oleh pertukaran pesan hello yang berhasil.

Pesan hello berisi:

- versi protokol
- ID klien
- port
- ID node
- daftar sub-protokol yang didukung

Ini adalah informasi yang diperlukan untuk interaksi yang berhasil karena mendefinisikan kemampuan apa yang dibagikan antara kedua node dan mengonfigurasi komunikasi. Ada proses negosiasi sub-protokol di mana daftar sub-protokol yang didukung oleh setiap node dibandingkan dan yang umum untuk kedua node dapat digunakan dalam sesi tersebut.

Bersamaan dengan pesan hello, protokol kawat juga dapat mengirim pesan "disconnect" yang memberikan peringatan kepada peer bahwa koneksi akan ditutup. Protokol kawat juga mencakup pesan PING dan PONG yang dikirim secara berkala untuk menjaga sesi tetap terbuka. Oleh karena itu, pertukaran RLPx dan protokol kawat membangun fondasi komunikasi antar node, menyediakan perancah untuk informasi berguna yang akan dipertukarkan menurut sub-protokol tertentu.

### Sub-protokol {#sub-protocols}

#### Protokol kawat {#wire-protocol}

Setelah peer terhubung, dan sesi RLPx telah dimulai, protokol kawat mendefinisikan bagaimana peer berkomunikasi. Awalnya, protokol kawat mendefinisikan tiga tugas utama: sinkronisasi rantai, propagasi blok, dan pertukaran transaksi. Namun, setelah Ethereum beralih ke Bukti Kepemilikan (PoS), propagasi blok dan sinkronisasi rantai menjadi bagian dari lapisan konsensus. Pertukaran transaksi masih menjadi kewenangan klien eksekusi. Pertukaran transaksi mengacu pada pertukaran transaksi yang tertunda antar node sehingga pembuat blok dapat memilih beberapa di antaranya untuk dimasukkan ke dalam blok berikutnya. Informasi terperinci tentang tugas-tugas ini tersedia [di sini](https://github.com/ethereum/devp2p/blob/master/caps/eth.md). Klien yang mendukung sub-protokol ini mengeksposnya melalui [JSON-RPC](/developers/docs/apis/json-rpc/).

#### les (subprotokol Ethereum ringan) {#les}

Ini adalah protokol minimal untuk menyinkronkan klien ringan. Secara tradisional, protokol ini jarang digunakan karena node penuh diharuskan menyajikan data ke klien ringan tanpa diberi insentif. Perilaku default klien eksekusi adalah tidak menyajikan data klien ringan melalui les. Informasi lebih lanjut tersedia dalam [spesifikasi](https://github.com/ethereum/devp2p/blob/master/caps/les.md) les.

#### Snap {#snap}

[Protokol snap](https://github.com/ethereum/devp2p/blob/master/caps/snap.md#ethereum-snapshot-protocol-snap) adalah ekstensi opsional yang memungkinkan peer untuk bertukar snapshot dari state terbaru, memungkinkan peer untuk memverifikasi akun dan data penyimpanan tanpa harus mengunduh node trie Merkle perantara.

#### Wit (protokol saksi) {#wit}

[Protokol saksi](https://github.com/ethereum/devp2p/blob/master/caps/wit.md#ethereum-witness-protocol-wit) adalah ekstensi opsional yang memungkinkan pertukaran Saksi state antar peer, membantu menyinkronkan klien ke ujung rantai.

#### Whisper {#whisper}

Whisper adalah protokol yang bertujuan untuk mengirimkan pesan aman antar peer tanpa menulis informasi apa pun ke rantai blok. Ini adalah bagian dari protokol kawat DevP2P tetapi sekarang sudah usang. [Proyek terkait](https://wakunetwork.com/) lainnya ada dengan tujuan serupa.

## Lapisan konsensus {#consensus-layer}

Klien konsensus berpartisipasi dalam jaringan peer-to-peer terpisah dengan spesifikasi yang berbeda. Klien konsensus perlu berpartisipasi dalam gosip blok sehingga mereka dapat menerima blok baru dari peer dan menyiarkannya saat giliran mereka menjadi pengusul blok. Mirip dengan lapisan eksekusi, ini pertama-tama membutuhkan protokol penemuan sehingga sebuah node dapat menemukan peer dan membuat sesi aman untuk bertukar blok, atestasi, dll.

### Penemuan {#consensus-discovery}

Mirip dengan klien eksekusi, klien konsensus menggunakan [discv5](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#the-discovery-domain-discv5) melalui UDP untuk menemukan peer. Implementasi lapisan konsensus dari discv5 berbeda dari klien eksekusi hanya karena ia menyertakan adaptor yang menghubungkan discv5 ke dalam tumpukan [libp2p](https://libp2p.io/), menghentikan penggunaan DevP2P. Sesi RLPx lapisan eksekusi dihentikan dan digantikan oleh jabat tangan saluran aman noise libp2p.

### ENR {#consensus-enr}

ENR untuk node konsensus mencakup kunci publik node, alamat IP, port UDP dan TCP, serta dua bidang khusus konsensus: bitfield subnet atestasi dan kunci `eth2`. Yang pertama memudahkan node untuk menemukan peer yang berpartisipasi dalam sub-jaringan gosip atestasi tertentu. Kunci `eth2` berisi informasi tentang versi percabangan Ethereum mana yang digunakan node, memastikan peer terhubung ke Ethereum yang tepat.

### libp2p {#libp2p}

Tumpukan libp2p mendukung semua komunikasi setelah penemuan. Klien dapat memanggil dan mendengarkan pada IPv4 dan/atau IPv6 seperti yang didefinisikan dalam ENR mereka. Protokol pada lapisan libp2p dapat dibagi lagi menjadi domain gosip dan req/resp (permintaan/respons).

### Gosip {#gossip}

Domain gosip mencakup semua informasi yang harus menyebar dengan cepat ke seluruh jaringan. Ini termasuk blok suar, bukti, atestasi, keluar (exit), dan pemotongan (slashing). Ini ditransmisikan menggunakan gossipsub v1 libp2p dan bergantung pada berbagai metadata yang disimpan secara lokal di setiap node, termasuk ukuran maksimum muatan gosip untuk diterima dan ditransmisikan. Informasi terperinci tentang domain gosip tersedia [di sini](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#the-gossip-domain-gossipsub).

### Permintaan-respons {#request-response}

Domain permintaan-respons berisi protokol untuk klien yang meminta informasi spesifik dari peer mereka. Contohnya termasuk meminta blok suar tertentu yang cocok dengan hash akar tertentu atau dalam rentang slot. Respons selalu dikembalikan sebagai byte yang disandikan SSZ dan dikompresi dengan snappy.

## Mengapa klien konsensus lebih memilih SSZ daripada RLP? {#ssz-vs-rlp}

SSZ adalah singkatan dari serialisasi sederhana (simple serialization). Ia menggunakan offset tetap yang memudahkan untuk memecahkan kode bagian individual dari pesan yang disandikan tanpa harus memecahkan kode seluruh struktur, yang sangat berguna bagi klien konsensus karena dapat secara efisien mengambil potongan informasi spesifik dari pesan yang disandikan. Ia juga dirancang khusus untuk berintegrasi dengan protokol Merkle, dengan perolehan efisiensi terkait untuk Merkleisasi. Karena semua hash di lapisan konsensus adalah akar Merkle, ini menambah peningkatan yang signifikan. SSZ juga menjamin representasi nilai yang unik.

## Menghubungkan klien eksekusi dan konsensus {#connecting-clients}

Klien konsensus dan eksekusi berjalan secara paralel. Mereka perlu dihubungkan sehingga klien konsensus dapat memberikan instruksi kepada klien eksekusi, dan klien eksekusi dapat meneruskan bundel transaksi ke klien konsensus untuk dimasukkan ke dalam blok suar. Komunikasi antara kedua klien dapat dicapai menggunakan koneksi RPC lokal. Antarmuka Pemrograman Aplikasi (API) yang dikenal sebagai ['Engine-API'](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) mendefinisikan instruksi yang dikirim antara kedua klien. Kedua klien tidak berbagi identitas jaringan: masing-masing memiliki kunci node sendiri dan [catatan node (ENR)](/developers/docs/networking-layer/network-addresses/) sendiri di jaringan peer-to-peer-nya sendiri.

Ringkasan alur kontrol ditunjukkan di bawah ini, dengan tumpukan jaringan yang relevan di dalam tanda kurung.

### Ketika klien konsensus bukan produsen blok: {#when-consensus-client-is-not-block-producer}

- Klien konsensus menerima blok melalui protokol gosip blok (p2p konsensus)
- Klien konsensus mempra-validasi blok, yaitu, memastikan blok tersebut tiba dari pengirim yang valid dengan metadata yang benar
- Transaksi di dalam blok dikirim ke lapisan eksekusi sebagai muatan eksekusi (koneksi RPC lokal)
- Lapisan eksekusi mengeksekusi transaksi dan memvalidasi state di header blok (yaitu, memeriksa kecocokan hash)
- Lapisan eksekusi meneruskan data validasi kembali ke lapisan konsensus, blok sekarang dianggap telah divalidasi (koneksi RPC lokal)
- Lapisan konsensus menambahkan blok ke kepala rantai bloknya sendiri dan mengatestasinya, menyiarkan atestasi tersebut melalui jaringan (p2p konsensus)

### Ketika klien konsensus adalah produsen blok: {#when-consensus-client-is-block-producer}

- Klien konsensus mengetahui dari salinan state suarnya bahwa salah satu validatornya mengusulkan blok berikutnya (tidak diperlukan jaringan)
- Klien konsensus memanggil `engine_forkchoiceUpdated` dengan atribut muatan, meminta klien eksekusi untuk mulai membangun blok (RPC lokal)
- Lapisan eksekusi mengakses mempool transaksi yang telah diisi oleh protokol gosip transaksi (p2p eksekusi)
- Klien eksekusi membundel transaksi ke dalam muatan eksekusi, mengeksekusi transaksi, dan menghasilkan hash blok
- Klien konsensus mengambil muatan dengan `engine_getPayload` dan menambahkannya ke blok suar, yang ditandatangani oleh validatornya (RPC lokal)
- Klien konsensus menyiarkan blok melalui protokol gosip blok (p2p konsensus)
- Klien lain menerima blok yang diusulkan melalui protokol gosip blok dan memvalidasinya seperti yang dijelaskan di atas (p2p konsensus)

Setelah blok diatestasi oleh validator yang cukup, blok tersebut ditambahkan ke kepala rantai, terjustifikasi, dan akhirnya difinalisasi.

<NodeNetworksDiagram />

## Bacaan Lebih Lanjut {#further-reading}

[DevP2P](https://github.com/ethereum/devp2p)
[LibP2p](https://github.com/libp2p/specs)
[Spesifikasi jaringan lapisan konsensus](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#enr-structure)
[kademlia ke discv5](https://vac.dev/kademlia-to-discv5)
[makalah kademlia](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf)
[pengantar p2p Ethereum](https://p2p.paris/en/talks/intro-ethereum-networking/)
[hubungan eth1/eth2](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)
[video detail klien merge dan eth2](https://www.youtube.com/watch?v=zNIrIninMgg)
