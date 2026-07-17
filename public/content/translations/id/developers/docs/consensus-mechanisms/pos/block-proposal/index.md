---
title: Proposal blok
description: Penjelasan tentang bagaimana blok diusulkan dalam Bukti Kepemilikan (PoS) Ethereum.
lang: id
---

Blok adalah unit fundamental dari rantai blok. Blok adalah unit informasi diskret yang diteruskan antar node, disepakati, dan ditambahkan ke basis data setiap node. Halaman ini menjelaskan bagaimana blok diproduksi.

## Prasyarat {#prerequisites}

Proposal blok adalah bagian dari protokol Bukti Kepemilikan (PoS). Untuk membantu memahami halaman ini, kami menyarankan Anda membaca tentang [Bukti Kepemilikan (PoS)](/developers/docs/consensus-mechanisms/pos/) dan [arsitektur blok](/developers/docs/blocks/).

## Siapa yang memproduksi blok? {#who-produces-blocks}

Akun validator mengusulkan blok. Akun validator dikelola oleh operator node yang menjalankan perangkat lunak validator sebagai bagian dari klien eksekusi dan konsensus mereka serta telah menyetorkan setidaknya 32 ETH ke dalam kontrak deposit. Namun, setiap validator hanya sesekali bertanggung jawab untuk mengusulkan blok. [Ethereum](/) mengukur waktu dalam slot dan Epok. Setiap slot berdurasi dua belas detik, dan 32 slot (6,4 menit) membentuk satu Epok. Setiap slot adalah kesempatan untuk menambahkan blok baru di Ethereum.

### Pemilihan acak {#random-selection}

Satu validator dipilih secara pseudo-acak untuk mengusulkan blok di setiap slot. Tidak ada yang namanya keacakan sejati dalam rantai blok karena jika setiap node menghasilkan angka yang benar-benar acak, mereka tidak akan bisa mencapai konsensus. Sebaliknya, tujuannya adalah membuat proses pemilihan validator tidak dapat diprediksi. Keacakan dicapai di Ethereum menggunakan algoritme yang disebut RANDAO yang mencampur hash dari pengusul blok dengan seed yang diperbarui setiap blok. Nilai ini digunakan untuk memilih validator tertentu dari total kumpulan validator. Pemilihan validator ditetapkan dua Epok sebelumnya sebagai cara untuk melindungi dari jenis manipulasi seed tertentu.

Meskipun validator menambahkan ke RANDAO di setiap slot, nilai RANDAO global hanya diperbarui sekali per Epok. Untuk menghitung indeks dari pengusul blok berikutnya, nilai RANDAO dicampur dengan nomor slot untuk memberikan nilai unik di setiap slot. Probabilitas seorang validator individu dipilih tidak sesederhana `1/N` (di mana `N` = total validator aktif). Sebaliknya, ini ditimbang oleh saldo ETH efektif dari setiap validator. Saldo efektif maksimum adalah 32 ETH (ini berarti bahwa `balance < 32 ETH` menghasilkan bobot yang lebih rendah daripada `balance == 32 ETH`, tetapi `balance > 32 ETH` tidak menghasilkan pembobotan yang lebih tinggi daripada `balance == 32 ETH`).

Hanya satu pengusul blok yang dipilih di setiap slot. Dalam kondisi normal, satu produsen blok membuat dan merilis satu blok di slot khusus mereka. Membuat dua blok untuk slot yang sama adalah pelanggaran yang dapat dikenakan pemotongan, sering dikenal sebagai "ekivokasi".

## Bagaimana blok dibuat? {#how-is-a-block-created}

Pengusul blok diharapkan untuk menyiarkan blok suar yang ditandatangani yang dibangun di atas kepala rantai terbaru menurut pandangan dari algoritme pilihan cabang yang dijalankan secara lokal oleh mereka sendiri. Algoritme pilihan cabang menerapkan atestasi dalam antrean yang tersisa dari slot sebelumnya, kemudian menemukan blok dengan akumulasi bobot atestasi terbesar dalam sejarahnya. Blok tersebut adalah induk dari blok baru yang dibuat oleh pengusul.

Pengusul blok membuat blok dengan mengumpulkan data dari basis data lokalnya sendiri dan pandangannya terhadap rantai. Isi dari blok ditunjukkan dalam cuplikan di bawah ini:

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

Bidang `randao_reveal` mengambil nilai acak yang dapat diverifikasi yang dibuat oleh pengusul blok dengan menandatangani nomor Epok saat ini. `eth1_data` adalah suara untuk pandangan pengusul blok terhadap kontrak deposit, termasuk akar dari trie Merkle deposit dan jumlah total deposit yang memungkinkan deposit baru untuk diverifikasi. `graffiti` adalah bidang opsional yang dapat digunakan untuk menambahkan pesan ke blok. `proposer_slashings` dan `attester_slashings` adalah bidang yang berisi bukti bahwa validator tertentu telah melakukan pelanggaran yang dapat dikenakan pemotongan menurut pandangan pengusul terhadap rantai. `deposits` adalah daftar deposit validator baru yang diketahui oleh pengusul blok, dan `voluntary_exits` adalah daftar validator yang ingin keluar yang telah didengar oleh pengusul blok di jaringan gosip lapisan konsensus. `sync_aggregate` adalah vektor yang menunjukkan validator mana yang sebelumnya ditugaskan ke komite sinkronisasi (subset validator yang melayani data klien ringan) dan berpartisipasi dalam penandatanganan data.

`execution_payload` memungkinkan informasi tentang transaksi diteruskan antara klien eksekusi dan konsensus. `execution_payload` adalah blok data eksekusi yang disarangkan di dalam blok suar. Bidang-bidang di dalam `execution_payload` mencerminkan struktur blok yang diuraikan dalam kertas kuning Ethereum, kecuali bahwa tidak ada ommer dan `prev_randao` ada sebagai pengganti `difficulty`. Klien eksekusi memiliki akses ke kumpulan transaksi lokal yang telah didengarnya di jaringan gosipnya sendiri. Transaksi-transaksi ini dieksekusi secara lokal untuk menghasilkan trie keadaan yang diperbarui yang dikenal sebagai pasca-state. Transaksi-transaksi tersebut disertakan dalam `execution_payload` sebagai daftar yang disebut `transactions` dan pasca-state disediakan di bidang `state-root`.

Semua data ini dikumpulkan dalam blok suar, ditandatangani, dan disiarkan ke rekan-rekan pengusul blok, yang menyebarkannya ke rekan-rekan mereka, dan seterusnya.

Baca lebih lanjut tentang [anatomi blok](/developers/docs/blocks).

## Apa yang terjadi pada blok? {#what-happens-to-blocks}

Blok ditambahkan ke basis data lokal pengusul blok dan disiarkan ke rekan-rekan melalui jaringan gosip lapisan konsensus. Ketika validator menerima blok, ia memverifikasi data di dalamnya, termasuk memeriksa bahwa blok memiliki induk yang benar, sesuai dengan slot yang benar, bahwa indeks pengusul adalah yang diharapkan, bahwa pengungkapan RANDAO valid dan bahwa pengusul tidak dipotong. `execution_payload` dibongkar, dan klien eksekusi validator mengeksekusi ulang transaksi dalam daftar untuk memeriksa perubahan state yang diusulkan. Dengan asumsi blok melewati semua pemeriksaan ini, setiap validator menambahkan blok ke rantai kanonikalnya sendiri. Proses tersebut kemudian dimulai lagi di slot berikutnya.

## Imbalan blok {#block-rewards}

Pengusul blok menerima pembayaran atas pekerjaan mereka. Terdapat `base_reward` yang dihitung sebagai fungsi dari jumlah validator aktif dan saldo efektif mereka. Pengusul blok kemudian menerima sebagian dari `base_reward` untuk setiap atestasi valid yang disertakan dalam blok; semakin banyak validator yang melakukan atestasi terhadap blok, semakin besar imbalan pengusul blok. Terdapat juga imbalan untuk melaporkan validator yang harus dipotong, setara dengan `1/512 * effective balance` untuk setiap validator yang dipotong.

[Lebih lanjut tentang imbalan dan penalti](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)

## Bacaan lebih lanjut {#further-reading}

- [Pengantar tentang blok](/developers/docs/blocks/)
- [Pengantar tentang Bukti Kepemilikan (PoS)](/developers/docs/consensus-mechanisms/pos/)
- [Spesifikasi konsensus Ethereum](https://github.com/ethereum/consensus-specs)
- [Pengantar tentang Gasper](/developers/docs/consensus-mechanisms/pos/gasper/)
- [Memutakhirkan Ethereum](https://eth2book.info/)