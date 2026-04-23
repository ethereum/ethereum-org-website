---
title: Apa itu Wrapped Ether (WETH)
description: "Pengantar tentang Wrapped ether (WETH)—pembungkus yang kompatibel dengan ERC20 untuk ether (ETH)."
lang: id
---

# Wrapped ether (WETH) {#intro-to-weth}

<Alert variant="update">
<Emoji text="🎁" />
<div>Hubungkan dompet Anda untuk membungkus (wrap) atau membuka bungkus (unwrap) ETH di chain mana pun di [WrapETH.com](https://www.wrapeth.com/)</div>
</Alert>

Ether (ETH) adalah mata uang utama Ethereum. Ini digunakan untuk beberapa tujuan seperti mengunci (staking), sebagai mata uang, dan membayar biaya gas untuk komputasi. **WETH secara efektif adalah bentuk ETH yang ditingkatkan dengan beberapa fungsionalitas tambahan yang diperlukan oleh banyak aplikasi dan [token ERC-20](/glossary/#erc-20)**, yang merupakan jenis aset digital lain di Ethereum. Untuk bekerja dengan token-token ini, ETH harus mengikuti aturan yang sama dengan mereka, yang dikenal sebagai standar ERC-20.

Untuk menjembatani kesenjangan ini, wrapped ETH (WETH) diciptakan. **Wrapped ETH adalah kontrak pintar yang memungkinkan Anda menyetor sejumlah ETH ke dalam kontrak dan menerima jumlah yang sama dalam WETH yang di-mint** yang sesuai dengan standar token ERC-20. WETH adalah representasi dari ETH yang memungkinkan Anda berinteraksi dengannya sebagai token ERC-20, bukan sebagai aset asli ETH. Anda masih akan membutuhkan ETH asli untuk membayar biaya gas, jadi pastikan Anda menyisihkan sebagian saat menyetor. 

Anda dapat membuka bungkus (unwrap) WETH menjadi ETH dengan menggunakan kontrak pintar WETH. Anda dapat menukarkan sejumlah WETH dengan kontrak pintar WETH, dan Anda akan menerima jumlah yang sama dalam ETH. WETH yang disetorkan kemudian dibakar dan dikeluarkan dari pasokan WETH yang beredar.

**Kira-kira ~3% dari pasokan ETH yang beredar terkunci dalam kontrak token WETH** menjadikannya salah satu [kontrak pintar](/glossary/#smart-contract) yang paling banyak digunakan. WETH sangat penting bagi pengguna yang berinteraksi dengan aplikasi dalam keuangan terdesentralisasi (DeFi).

## Mengapa kita perlu membungkus ETH sebagai ERC-20? {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) mendefinisikan antarmuka standar untuk token yang dapat ditransfer, sehingga siapa pun dapat membuat token yang berinteraksi secara mulus dengan aplikasi dan token yang menggunakan standar ini dalam ekosistem Ethereum. Karena **ETH ada sebelum standar ERC-20**, ETH tidak sesuai dengan spesifikasi ini. Ini berarti **Anda tidak dapat dengan mudah** menukar ETH dengan token ERC-20 lainnya atau **menggunakan ETH dalam aplikasi yang menggunakan standar ERC-20**. Membungkus ETH memberi Anda kesempatan untuk melakukan hal berikut:

- **Menukar ETH dengan token ERC-20**: Anda tidak dapat menukar ETH secara langsung dengan token ERC-20 lainnya. WETH adalah representasi dari ether yang mematuhi standar token sepadan (fungible) ERC-20 dan dapat ditukar dengan token ERC-20 lainnya. 

- **Menggunakan ETH di dapps**: Karena ETH tidak kompatibel dengan ERC20, pengembang perlu membuat antarmuka terpisah (satu untuk ETH dan satu lagi untuk token ERC-20) di dapps. Membungkus ETH menghilangkan hambatan ini dan memungkinkan pengembang untuk menangani ETH dan token lainnya dalam dapp yang sama. Banyak aplikasi keuangan terdesentralisasi menggunakan standar ini, dan menciptakan pasar untuk menukar token-token ini.

## Wrapped ether (WETH) vs ether (ETH): Apa perbedaannya? {#weth-vs-eth-differences}


|            | **Ether (ETH)**                                                                                                                                                                                                                 | **Wrapped Ether (WETH)**                                                                                                                                                                                                                                                                                    |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Pasokan     | [Pasokan ETH](/eth/supply/) dikelola oleh protokol [Ethereum](/). [Penerbitan](/roadmap/merge/issuance) ETH ditangani oleh validator Ethereum saat memproses transaksi dan membuat blok.                           | WETH adalah token ERC-20 yang pasokannya dikelola oleh kontrak pintar. Unit baru WETH diterbitkan oleh kontrak setelah menerima setoran ETH dari pengguna, atau unit WETH dibakar ketika pengguna ingin menukarkan WETH dengan ETH.                                                                                                                                        |
| Kepemilikan  | Kepemilikan dikelola oleh protokol Ethereum melalui saldo akun Anda.  | Kepemilikan WETH dikelola oleh kontrak pintar token WETH, yang diamankan oleh protokol Ethereum.                                                                                                                                         |
| Gas        | Ether (ETH) adalah unit pembayaran yang diterima untuk komputasi di jaringan Ethereum. Biaya gas didenominasi dalam gwei (unit dari ether).                                                                                    | Membayar gas dengan token WETH tidak didukung secara bawaan.                                                                                                                                                                                              |

## Pertanyaan yang sering diajukan {#faq}
 
<ExpandableCard title="Apakah Anda membayar untuk membungkus/membuka bungkus ETH?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

Anda membayar biaya gas untuk membungkus (wrap) atau membuka bungkus (unwrap) ETH menggunakan kontrak WETH.
</ExpandableCard>

<ExpandableCard title="Apakah WETH aman?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETH umumnya dianggap aman karena didasarkan pada kontrak pintar yang sederhana dan telah teruji. Kontrak WETH juga telah diverifikasi secara formal, yang merupakan standar keamanan tertinggi untuk kontrak pintar di Ethereum.
</ExpandableCard>

<ExpandableCard title="Mengapa saya melihat token WETH yang berbeda?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Selain [implementasi kanonikal WETH](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) yang dijelaskan di halaman ini, ada varian lain di luar sana. Ini mungkin token kustom yang dibuat oleh pengembang aplikasi atau versi yang diterbitkan di blockchain lain, dan mungkin berperilaku berbeda atau memiliki properti keamanan yang berbeda. **Selalu periksa kembali informasi token untuk mengetahui implementasi WETH mana yang sedang Anda gunakan untuk berinteraksi.**
</ExpandableCard>

<ExpandableCard title="Apa saja kontrak WETH di jaringan lain?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Ethereum Mainnet](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)
</ExpandableCard>

## Bacaan lebih lanjut {#further-reading}

- [Apa itu WETH?](https://weth.tkn.eth.limo/)
- [Informasi token WETH di Blockscout](https://eth.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Verifikasi Formal WETH](https://zellic.io/blog/formal-verification-weth)