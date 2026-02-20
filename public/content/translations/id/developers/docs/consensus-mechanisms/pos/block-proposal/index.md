---
title: Usulan blok
description: Penjelasan tentang bagaimana blok diusulkan dalam proof-of-stake Ethereum.
lang: id
---

Blok adalah unit dasar dari rantai blok. Blok adalah unit informasi diskrit yang dilalui di antara node, disepakati dan ditambahkan ke basis data setiap node. Halaman ini menjelaskan bagaimana mereka dihasilkan.

## Persyaratan {#prerequisites}

Usul blok adalah bagian dari protokol proof-of-stake. Untuk membantu memahami halaman ini, kami sarankan Anda membaca tentang [bukti taruhan](/developers/docs/consensus-mechanisms/pos/) dan [arsitektur blok](/developers/docs/blocks/).

## Siapa yang menghasilkan blok? {#who-produces-blocks}

Akun validator mengusulkan blok. Akun validator dikelola oleh operator simpul yang menjalankan perangkat lunak validator sebagai bagian dari eksekusi dan klien konsensus dan telah menyetor setidaknya 32 ETH ke dalam kontrak setoran. Namun, setiap validator hanya sesekali bertanggung jawab untuk mengusulkan blok. Ethereum mengukur waktu dalam ruang dan jangka waktu. Setiap ruang adalah dua belas detik, dan 32 ruang (6,4 menit) membentuk jangka waktu. Setiap ruang adalah kesempatan untuk menambahkan blok baru di Ethereum.

### Seleksi acak {#random-selection}

Validator tunggal dipilih secara acak semu untuk mengusulkan blok di setiap ruang. Tidak ada yang namanya keserampangan sejati dalam blockchain karena jika setiap node menghasilkan angka yang benar-benar acak, mereka tidak dapat mencapai konsensus. Sebaliknya, tujuannya adalah untuk membuat proses pemilihan validator tidak dapat diprediksi. Keserampangan ini dicapai di Ethereum menggunakan algoritme yang disebut RANDAO yang menggabungkan hash dari pengusul blok dengan seed yang diperbarui setiap blok. Nilai ini digunakan untuk memilih validator tertentu dari total set validator. Pemilihan validator ditetapkan dua jangka waktu sebelumnya sebagai cara untuk melindungi dari jenis manipulasi benih tertentu.

Meskipun validator menambah RANDAO di setiap ruang, nilai RANDAO global hanya diperbarui satu kali per jangka waktu. Untuk menghitung indeks untuk mengusulkan blok berikutnya, nilai RANDAO dicampur dengan nomor ruang untuk memberikan nilai unik di setiap ruang. Probabilitas seorang validator individu terpilih tidak hanya `1/N` (dengan `N` = total validator aktif). Sebaliknya, hal ini ditimbang oleh saldo ETH yang efektif dari setiap validator. Saldo efektif maksimum adalah 32 ETH (ini berarti bahwa `balance < 32 ETH` menghasilkan bobot yang lebih rendah daripada `balance == 32 ETH`, tetapi `balance > 32 ETH` tidak menghasilkan bobot yang lebih tinggi daripada `balance == 32 ETH`).

Hanya satu untuk mengusulkan blok yang dipilih di setiap ruang. Dalam kondisi normal, produsen blok tunggal membuat dan melepaskan satu blok di ruang khusus mereka. Membuat dua blok untuk celah yang sama adalah pelanggaran yang dapat dipangkas, yang sering dikenal sebagai "pengelakan".

## Bagaimana cara blok dibuat? {#how-is-a-block-created}

Untuk mengusulkan blok diharapkan untuk menyiarkan blok beacon yang telah dikontrak yang telah dibangun menuju chain yang terbaru sesuai dengan pandangan algoritme pilihan fork yang mereka jalankan secara lokal. Algoritme pilihan fork menerapkan antrean pengesahan yang tersisa dari ruang sebelumnya, kemudian menemukan blok dengan akumulasi bobot pengesahan terbesar dalam riwayatnya. Blok tersebut merupakan induk dari blok baru yang dibuat oleh pengusul.

Pengusul blok membuat blok dengan mengumpulkan data dari database lokalnya sendiri dan tampilan chain. Isi blok ditampilkan dalam cuplikan di bawah ini:

```rust
class BeaconBlockBody(Container):
    randao_reveal: BLSSignature
    eth1_data: Eth1Data
    graffiti: Bytes32
    proposer_slashings: List[ProposerSlashing, MAX_PROPOSER_SLASHINGS]
    attester_slashings: List[AttesterSlashing, MAX_ATTESTER_SLASHINGS]
    attestations: List[Attestation, MAX_ATTESTATIONS]
    deposits: List[Deposit, MAX_DEPOSITS]
    voluntary_exits: List[SignedVoluntaryExit, MAX_VOLUNTARY_EXITS]
    sync_aggregate: SyncAggregate
    execution_payload: ExecutionPayload
```

Bidang `randao_reveal` mengambil nilai acak yang dapat diverifikasi yang dibuat oleh pengusul blok dengan menandatangani nomor epoch saat ini. `eth1_data` adalah suara untuk pandangan pengusul blok tentang kontrak setoran, termasuk root dari Merkle trie setoran dan jumlah total setoran yang memungkinkan setoran baru untuk diverifikasi. `graffiti` adalah bidang opsional yang dapat digunakan untuk menambahkan pesan ke blok. `proposer_slashings` dan `attester_slashings` adalah bidang yang berisi bukti bahwa validator tertentu telah melakukan pelanggaran yang dapat di-slash menurut pandangan pengusul tentang rantai tersebut. `deposits` adalah daftar setoran validator baru yang diketahui oleh pengusul blok, dan `voluntary_exits` adalah daftar validator yang ingin keluar yang telah didengar oleh pengusul blok di jaringan gosip lapisan konsensus. `sync_aggregate` adalah sebuah vektor yang menunjukkan validator mana yang sebelumnya ditugaskan ke komite sinkronisasi (subset dari validator yang melayani data klien ringan) dan berpartisipasi dalam penandatanganan data.

`execution_payload` memungkinkan informasi tentang transaksi untuk diteruskan antara klien eksekusi dan klien konsensus. `execution_payload` adalah sebuah blok data eksekusi yang bersarang di dalam blok suar. Bidang-bidang di dalam `execution_payload` mencerminkan struktur blok yang diuraikan dalam yellow paper Ethereum, kecuali bahwa tidak ada ommer dan `prev_randao` ada sebagai pengganti `difficulty`. Klien eksekusi memiliki akses ke pool transaksi lokal yang telah didengarnya di jaringan gosipnya sendiri. Transaksi-transaksi ini dieksekusi secara lokal untuk menghasilkan pohon status yang diperbarui yang dikenal sebagai post-state. Transaksi-transaksi tersebut termasuk dalam `execution_payload` sebagai daftar yang disebut `transactions` dan post-state disediakan di bidang `state-root`.

Semua data ini dikumpulkan dalam sebuah blok suar, dikontrak, dan disiarkan ke rekan pengusul blok, yang kemudian menyebarkannya ke rekan mereka, dll.

Baca lebih lanjut tentang [anatomi blok](/developers/docs/blocks).

## Apa yang terjadi pada blok? {#what-happens-to-blocks}

Blok ditambahkan ke basis data lokal pengusul blok dan disiarkan ke rekan-rekan melalui jaringan gosip lapisan konsensus. Ketika validator menerima blok, validator akan memverifikasi data di dalamnya, termasuk memeriksa apakah blok tersebut memiliki induk yang benar, sesuai dengan ruang yang benar, bahwa indeks pengusul sesuai dengan yang diharapkan, bahwa pengungkapan RANDAO valid, dan pengusul tidak terpotong. `execution_payload` diurai, dan klien eksekusi validator mengeksekusi ulang transaksi dalam daftar untuk memeriksa perubahan status yang diusulkan. Dengan asumsi bahwa blok tersebut lolos dari semua pemeriksaan ini, setiap validator menambahkan blok tersebut ke chain resmi sendiri. Proses kemudian dimulai lagi di ruang berikutnya.

## Hadiah blok {#block-rewards}

Untuk mengusulkan blok menerima pembayaran untuk pekerjaan mereka. Ada `base_reward` yang dihitung sebagai fungsi dari jumlah validator aktif dan saldo efektif mereka. Pengusul blok kemudian menerima sebagian kecil dari `base_reward` untuk setiap pengesahan yang valid yang disertakan dalam blok; semakin banyak validator yang mengesahkan blok tersebut, semakin besar hadiah pengusul blok. Ada juga hadiah untuk melaporkan validator yang seharusnya di-slash, sama dengan `1/512 * saldo efektif` untuk setiap validator yang di-slash.

[Selengkapnya tentang hadiah dan penalti](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)

## Bacaan lebih lanjut {#further-reading}

- [Pengantar blok](/developers/docs/blocks/)
- [Pengantar tentang proof-of-stake](/developers/docs/consensus-mechanisms/pos/)
- [Spesifikasi konsensus Ethereum](https://github.com/ethereum/consensus-specs)
- [Pengantar Gasper](/developers/docs/consensus-mechanisms/pos/gasper/)
- [Meningkatkan Ethereum](https://eth2book.info/)
