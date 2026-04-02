---
title: Pengusulan blok
description: Penjelasan tentang bagaimana blok diusulkan dalam proof-of-stake Ethereum.
lang: id
---

Blok adalah unit fundamental dari blockchain. Blok adalah unit informasi diskrit yang diteruskan antar node, disepakati, dan ditambahkan ke database setiap node. Halaman ini menjelaskan bagaimana blok diproduksi.

## Prasyarat {#prerequisites}

Pengusulan blok adalah bagian dari protokol proof-of-stake. Untuk membantu memahami halaman ini, kami sarankan Anda membaca tentang [proof-of-stake](/developers/docs/consensus-mechanisms/pos/) dan [arsitektur blok](/developers/docs/blocks/).

## Siapa yang memproduksi blok? {#who-produces-blocks}

Akun validator mengusulkan blok. Akun validator dikelola oleh operator node yang menjalankan perangkat lunak validator sebagai bagian dari klien eksekusi dan klien konsensus mereka dan telah menyetorkan setidaknya 32 ETH ke dalam kontrak deposit. Namun, setiap validator hanya sesekali bertanggung jawab untuk mengusulkan blok. [Ethereum](/) mengukur waktu dalam slot dan epoch. Setiap slot adalah dua belas detik, dan 32 slot (6,4 menit) membentuk satu epoch. Setiap slot adalah kesempatan untuk menambahkan blok baru di Ethereum.

### Pemilihan acak {#random-selection}

Satu validator dipilih secara pseudo-acak untuk mengusulkan blok di setiap slot. Tidak ada yang namanya keacakan sejati dalam blockchain karena jika setiap node menghasilkan angka yang benar-benar acak, mereka tidak akan bisa mencapai konsensus. Sebaliknya, tujuannya adalah membuat proses pemilihan validator tidak dapat diprediksi. Keacakan dicapai di Ethereum menggunakan algoritma yang disebut RANDAO yang mencampur hash dari pengusul blok dengan seed yang diperbarui setiap blok. Nilai ini digunakan untuk memilih validator tertentu dari total kumpulan validator. Pemilihan validator ditetapkan dua epoch sebelumnya sebagai cara untuk melindungi dari jenis manipulasi seed tertentu.

Meskipun validator menambahkan ke RANDAO di setiap slot, nilai RANDAO global hanya diperbarui sekali per epoch. Untuk menghitung indeks pengusul blok berikutnya, nilai RANDAO dicampur dengan nomor slot untuk memberikan nilai unik di setiap slot. Probabilitas validator individu dipilih tidak hanya `1/N` (di mana `N` = total validator aktif). Sebaliknya, ini ditimbang oleh saldo ETH efektif dari setiap validator. Saldo efektif maksimum adalah 32 ETH (ini berarti bahwa `balance < 32 ETH` mengarah ke bobot yang lebih rendah daripada `balance == 32 ETH`, tetapi `balance > 32 ETH` tidak mengarah ke pembobotan yang lebih tinggi daripada `balance == 32 ETH`).

Hanya satu pengusul blok yang dipilih di setiap slot. Dalam kondisi normal, satu produsen blok membuat dan merilis satu blok di slot khusus mereka. Membuat dua blok untuk slot yang sama adalah pelanggaran yang dapat dikenakan pemotongan (slashable), sering dikenal sebagai "ekuivokasi" (equivocation).

## Bagaimana blok dibuat? {#how-is-a-block-created}

Pengusul blok diharapkan untuk menyiarkan blok beacon yang ditandatangani yang dibangun di atas kepala rantai terbaru menurut pandangan algoritma pilihan fork yang dijalankan secara lokal. Algoritma pilihan fork menerapkan pengesahan yang antre yang tersisa dari slot sebelumnya, kemudian menemukan blok dengan akumulasi bobot pengesahan terbesar dalam sejarahnya. Blok tersebut adalah induk dari blok baru yang dibuat oleh pengusul.

Pengusul blok membuat blok dengan mengumpulkan data dari database lokalnya sendiri dan pandangan tentang rantai. Isi blok ditunjukkan dalam cuplikan di bawah ini:

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

Bidang `randao_reveal` mengambil nilai acak yang dapat diverifikasi yang dibuat oleh pengusul blok dengan menandatangani nomor epoch saat ini. `eth1_data` adalah suara untuk pandangan pengusul blok tentang kontrak deposit, termasuk akar dari deposit Merkle trie dan jumlah total deposit yang memungkinkan deposit baru untuk diverifikasi. `graffiti` adalah bidang opsional yang dapat digunakan untuk menambahkan pesan ke blok. `proposer_slashings` dan `attester_slashings` adalah bidang yang berisi bukti bahwa validator tertentu telah melakukan pelanggaran yang dapat dikenakan pemotongan menurut pandangan pengusul tentang rantai. `deposits` adalah daftar deposit validator baru yang diketahui oleh pengusul blok, dan `voluntary_exits` adalah daftar validator yang ingin keluar yang telah didengar oleh pengusul blok di jaringan gosip lapisan konsensus. `sync_aggregate` adalah vektor yang menunjukkan validator mana yang sebelumnya ditugaskan ke komite sinkronisasi (subset validator yang melayani data klien ringan) dan berpartisipasi dalam menandatangani data.

`execution_payload` memungkinkan informasi tentang transaksi diteruskan antara klien eksekusi dan klien konsensus. `execution_payload` adalah blok data eksekusi yang bersarang di dalam blok beacon. Bidang di dalam `execution_payload` mencerminkan struktur blok yang diuraikan dalam yellow paper Ethereum, kecuali bahwa tidak ada ommer dan `prev_randao` ada sebagai pengganti `difficulty`. Klien eksekusi memiliki akses ke kumpulan transaksi lokal yang telah didengarnya di jaringan gosipnya sendiri. Transaksi ini dieksekusi secara lokal untuk menghasilkan trie status yang diperbarui yang dikenal sebagai pasca-status. Transaksi disertakan dalam `execution_payload` sebagai daftar yang disebut `transactions` dan pasca-status disediakan di bidang `state-root`.

Semua data ini dikumpulkan dalam blok beacon, ditandatangani, dan disiarkan ke rekan-rekan pengusul blok, yang menyebarkannya ke rekan-rekan mereka, dll.

Baca lebih lanjut tentang [anatomi blok](/developers/docs/blocks).

## Apa yang terjadi pada blok? {#what-happens-to-blocks}

Blok ditambahkan ke database lokal pengusul blok dan disiarkan ke rekan-rekan melalui jaringan gosip lapisan konsensus. Ketika validator menerima blok, ia memverifikasi data di dalamnya, termasuk memeriksa bahwa blok memiliki induk yang benar, sesuai dengan slot yang benar, bahwa indeks pengusul adalah yang diharapkan, bahwa pengungkapan RANDAO valid dan bahwa pengusul tidak dipotong. `execution_payload` dibongkar, dan klien eksekusi validator mengeksekusi ulang transaksi dalam daftar untuk memeriksa perubahan status yang diusulkan. Dengan asumsi blok melewati semua pemeriksaan ini, setiap validator menambahkan blok ke rantai kanonikalnya sendiri. Proses kemudian dimulai lagi di slot berikutnya.

## Hadiah blok {#block-rewards}

Pengusul blok menerima pembayaran untuk pekerjaan mereka. Ada `base_reward` yang dihitung sebagai fungsi dari jumlah validator aktif dan saldo efektif mereka. Pengusul blok kemudian menerima sebagian kecil dari `base_reward` untuk setiap pengesahan valid yang disertakan dalam blok; semakin banyak validator yang mengesahkan blok, semakin besar hadiah pengusul blok. Ada juga hadiah untuk melaporkan validator yang harus dipotong, sama dengan `1/512 * saldo efektif` untuk setiap validator yang dipotong.

[Lebih lanjut tentang hadiah dan penalti](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)

## Bacaan lebih lanjut {#further-reading}

- [Pengantar blok](/developers/docs/blocks/)
- [Pengantar proof-of-stake](/developers/docs/consensus-mechanisms/pos/)
- [Spesifikasi konsensus Ethereum](https://github.com/ethereum/consensus-specs)
- [Pengantar Gasper](/developers/docs/consensus-mechanisms/pos/gasper/)
- [Memperbarui Ethereum](https://eth2book.info/)