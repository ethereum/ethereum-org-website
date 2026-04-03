---
title: zkEVM untuk verifikasi blok L1
description: Pelajari bagaimana bukti zero-knowledge dapat memverifikasi eksekusi blok Ethereum, memungkinkan throughput yang lebih tinggi dan persyaratan validator yang lebih rendah.
lang: id
---

# zkEVM untuk verifikasi blok L1 {#zkevm-l1}

zkEVM adalah teknologi yang menggunakan [bukti zero-knowledge](/zero-knowledge-proofs/) untuk memverifikasi eksekusi blok Ethereum. Alih-alih mengharuskan setiap [validator](/glossary/#validator) untuk mengeksekusi ulang semua transaksi dalam sebuah blok, satu aktor khusus (disebut "prover") mengeksekusi blok tersebut dan menghasilkan bukti kriptografi bahwa eksekusi tersebut benar. Setiap node kemudian dapat memverifikasi bukti ini—sebuah proses yang jauh lebih murah daripada mengeksekusi ulang semua transaksi.

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>Jangan disamakan dengan zkEVM rollup</AlertTitle>
<AlertDescription>
Halaman ini membahas penggunaan zkEVM untuk memverifikasi eksekusi blok L1 Ethereum. Untuk zkEVM rollup yang menggunakan bukti ZK untuk meningkatkan skala Ethereum sebagai solusi layer 2, lihat [zero-knowledge rollup](/developers/docs/scaling/zk-rollups/).
</AlertDescription>
</AlertContent>
</Alert>

## Masalah eksekusi ulang {#reexecution-problem}

Saat ini, Ethereum menggunakan model verifikasi "N-dari-N": setiap validator harus secara independen mengeksekusi ulang setiap transaksi di setiap blok untuk memverifikasi bahwa perubahan status yang diusulkan adalah benar. Meskipun pendekatan ini sangat trustless (tanpa kepercayaan), hal ini menciptakan hambatan mendasar.

Masalahnya adalah throughput Ethereum dibatasi oleh apa yang dapat diproses oleh rata-rata validator. Menaikkan [batas gas](/glossary/#gas-limit) akan memungkinkan lebih banyak transaksi per blok, tetapi juga akan meningkatkan persyaratan perangkat keras untuk validator. Hal ini mengancam desentralisasi—jika menjalankan validator membutuhkan perangkat keras yang mahal, lebih sedikit orang yang dapat berpartisipasi dalam mengamankan jaringan.

zkEVM menawarkan jalan keluar dari pertukaran (tradeoff) ini. Dengan beralih dari "semua orang mengeksekusi ulang" menjadi "satu membuktikan, semua orang memverifikasi," Ethereum dapat dengan aman meningkatkan batas gas tanpa menaikkan persyaratan perangkat keras validator.

## Bagaimana verifikasi L1 zkEVM bekerja {#how-it-works}

Verifikasi zkEVM mengubah validasi blok menjadi model "1-dari-N":

1. **Eksekusi**: Seorang prover mengeksekusi semua transaksi dalam sebuah blok, melacak setiap perubahan status
2. **Pembuktian**: Prover menghasilkan bukti kriptografi ([SNARK atau STARK](/zero-knowledge-proofs/#types-of-zero-knowledge-proofs)) yang membuktikan kebenaran eksekusi tersebut
3. **Verifikasi**: Validator memverifikasi bukti alih-alih mengeksekusi ulang transaksi—ini secara dramatis lebih murah daripada eksekusi ulang penuh

Jaminan keamanannya tetap sama: jika eksekusi salah, tidak ada bukti valid yang dapat dihasilkan. Namun sekarang, alih-alih setiap node melakukan komputasi yang mahal, hanya prover yang melakukannya—dan verifikasi cukup murah sehingga tidak membatasi batas gas.

### zkEVM Tipe 1 {#type-1-zkevm}

zkEVM diklasifikasikan ke dalam beberapa tipe berdasarkan kompatibilitasnya dengan Ethereum:

- **Tipe 1**: Sepenuhnya setara dengan Ethereum. Tidak ada modifikasi pada EVM, sehingga setiap blok Ethereum dapat dibuktikan persis seperti apa adanya
- **Tipe 2-4**: Membuat berbagai pertukaran, memodifikasi perilaku EVM untuk membuat pembuktian menjadi lebih mudah

Untuk verifikasi L1, Tipe 1 sangat penting. zkEVM harus mampu membuktikan setiap blok Ethereum yang valid, termasuk kasus ekstrem (edge cases) dan blok historis. Setiap penyimpangan dari perilaku pasti Ethereum akan menciptakan masalah konsensus.

Penelitian zkEVM dari Ethereum Foundation berfokus pada implementasi Tipe 1 yang sepenuhnya kompatibel dengan eksekusi Ethereum yang ada.

## Manfaat untuk Ethereum {#benefits}

### Throughput yang lebih tinggi {#higher-throughput}

Ketika verifikasi murah, batas gas dapat meningkat dengan aman. Hal ini memperluas kapasitas jaringan dan membantu menstabilkan biaya selama periode permintaan tinggi. Batas gas saat ini sebagian dibatasi oleh perangkat keras validator—zkEVM menghilangkan batasan ini.

### Desentralisasi yang lebih kuat {#stronger-decentralization}

Dengan verifikasi zkEVM, validator hanya perlu memverifikasi bukti daripada mengeksekusi transaksi. Hal ini secara dramatis menurunkan persyaratan perangkat keras untuk menjalankan validator, memungkinkan lebih banyak orang untuk berpartisipasi dalam mengamankan jaringan. Keragaman validator yang lebih besar memperkuat ketahanan dan resistensi sensor Ethereum.

Perhatikan bahwa pembuktian itu sendiri membutuhkan sumber daya komputasi yang signifikan, lebih besar daripada perangkat keras validator saat ini. Namun, tidak seperti validasi, pembuktian tidak perlu didesentralisasi dengan cara yang sama: hanya satu bukti yang benar yang diperlukan per blok, dan siapa pun dapat memverifikasinya dengan cepat. Penelitian tentang pasar prover, agregasi bukti, dan akselerasi perangkat keras bertujuan untuk memastikan bahwa pembuktian tetap kompetitif dan dapat diakses daripada terkonsentrasi di antara beberapa operator besar.

### Finalitas yang dapat diprediksi {#predictable-finality}

Verifikasi bukti beroperasi dalam waktu konstan terlepas dari kompleksitas blok. Hal ini membuat waktu pengesahan lebih dapat diprediksi dan mengurangi pengesahan yang terlewat yang dapat terjadi ketika validator kesulitan memproses blok kompleks tepat waktu.

## Tantangan pembuktian waktu nyata {#realtime-proving}

Tantangan utama untuk verifikasi L1 zkEVM adalah kecepatan. Blok Ethereum diproduksi setiap 12 detik, yang berarti bukti perlu dihasilkan dalam jangka waktu yang sama agar berguna untuk konsensus.

Implementasi zkEVM saat ini dapat memakan waktu beberapa menit hingga berjam-jam untuk membuktikan satu blok. Penelitian berfokus pada menutup kesenjangan ini melalui:

- **Paralelisasi**: Mendistribusikan pekerjaan pembuktian ke beberapa mesin
- **Perangkat keras khusus**: Merancang sirkuit dan perangkat keras yang dioptimalkan untuk pembuktian ZK
- **Peningkatan algoritma**: Sistem pembuktian dan desain sirkuit yang lebih efisien
- **Pembuktian inkremental**: Menghasilkan bukti saat transaksi dieksekusi, bukan setelahnya

## Penelitian dan implementasi saat ini {#current-research}

Ethereum Foundation mendanai penelitian zkEVM melalui tim [Privacy Stewards of Ethereum (PSE)](https://pse.dev/). Jalur penelitian utama meliputi:

- **Pembuktian waktu nyata**: Menghasilkan bukti blok penuh dalam slot 12 detik
- **Integrasi klien**: Menstandarkan antarmuka antara klien eksekusi dan prover
- **Insentif ekonomi**: Merancang pasar prover dan struktur biaya yang berkelanjutan

### Status implementasi {#implementations}

Beberapa implementasi zkVM sedang dikembangkan dan diuji untuk pembuktian blok Ethereum:

| Implementasi | Arsitektur |
|----------------|--------------|
| [OpenVM](https://github.com/openvm-org/openvm) | rv32im |
| [RISC Zero](https://github.com/risc0/risc0) | rv32im |
| [Airbender](https://github.com/matter-labs/zksync-airbender) | rv32im |
| [Jolt](https://github.com/a16z/jolt) | rv32im |
| [Zisk](https://github.com/0xPolygonHermez/zisk) | rv64ima |

Ini menggunakan mesin virtual berbasis RISC-V untuk mengeksekusi bytecode EVM, kemudian menghasilkan bukti ZK dari eksekusi yang benar. Hasil pengujian dan kemajuan terbaru dilacak di [pelacak zkVM Ethereum Foundation](https://zkevm.ethereum.foundation/zkvm-tracker).

## Bagaimana zkEVM cocok dengan peningkatan lainnya {#related-upgrades}

Verifikasi L1 zkEVM terhubung dengan beberapa item peta jalan Ethereum lainnya:

- **[Verkle Trees](/roadmap/verkle-trees/)**: Memungkinkan saksi (witness) yang lebih kecil untuk verifikasi stateless, mengurangi data yang perlu dikerjakan oleh prover
- **[Statelessness](/roadmap/statelessness/)**: zkEVM adalah pendorong utama—dengan bukti eksekusi ZK, node tidak memerlukan status penuh untuk memverifikasi blok
- **[PBS](/roadmap/pbs/)**: Pembangun blok berpotensi mengintegrasikan pembuatan bukti, atau pasar prover terpisah dapat muncul
- **[Single Slot Finality](/roadmap/single-slot-finality/)**: Pembuatan bukti yang lebih cepat dapat memungkinkan finalitas slot tunggal dengan jaminan kriptografi

<Alert variant="warning">
<AlertEmoji text="🧪" />
<AlertContent>
<AlertDescription>
Verifikasi L1 zkEVM sedang dalam penelitian aktif dan belum terintegrasi ke dalam klien Ethereum produksi.
</AlertDescription>
</AlertContent>
</Alert>

## Bacaan lebih lanjut {#further-reading}

- [zkEVM Foundation](https://zkevm.ethereum.foundation) - Pusat penelitian zkEVM resmi Ethereum Foundation
- [Ethproofs](https://ethproofs.org/) - Lacak perlombaan untuk membuktikan Ethereum secara waktu nyata
- [zkevm.fyi](https://zkevm.fyi) - Buku teknis tentang zkEVM untuk L1
- [Spesifikasi zkEVM PSE](https://github.com/privacy-scaling-explorations/zkevm-specs) - Spesifikasi teknis
- [The Verge](https://vitalik.eth.limo/general/2024/10/23/futures4.html) - Tinjauan Vitalik tentang peningkatan verifikasi
- [Blog zkEVM EF](https://zkevm.ethereum.foundation/blog) - Analisis kinerja dari tim EF