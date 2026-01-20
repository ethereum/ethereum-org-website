---
title: Apa itu Wrapped Ether (WETH)
description: Pengantar Wrapped Ether (WETH) — sebuah pembungkus (wrapper) ETH agar kompatibel dengan ERC20.
lang: id
---

# Eter terbungkus (WETH) {#intro-to-weth}

<Alert variant="update">
<Emoji text="🎁" />
<div>Hubungkan dompet Anda untuk membungkus atau membuka eth di rantai mana pun di [wrapeth.com](https://www.wrapeth.com/)</div>
</Alert>

Ether (ETH) adalah mata uang utama dari Ethereum. Ini digunakan untuk berbagai tujuan seperti staking, sebagai mata uang, dan untuk membayar biaya gas komputasi. \*\*WETH pada dasarnya adalah bentuk ETH yang ditingkatkan dengan beberapa fungsi tambahan yang dibutuhkan oleh banyak aplikasi dan token [ERC-20](/glossary/#erc-20), yang merupakan jenis aset digital lain di Ethereum. Untuk dapat berinteraksi dengan token-token ini, ETH harus mengikuti aturan yang sama seperti mereka, yang dikenal sebagai standar ERC-20.

Untuk menjembatani kesenjangan ini, diciptakan wrapped ETH (WETH). **Wrapped ETH adalah sebuah smart contract yang memungkinkan Anda menyetorkan sejumlah ETH ke dalam kontrak dan menerima jumlah yang sama dalam bentuk WETH** yang dicetak, sesuai dengan standar token ERC-20. WETH adalah representasi dari ETH yang memungkinkan Anda berinteraksi dengannya sebagai token ERC-20, bukan sebagai aset asli ETH. Anda tetap memerlukan ETH asli untuk membayar biaya gas, jadi pastikan Anda menyisakan sebagian saat melakukan deposit.

Anda dapat menukar WETH menjadi ETH dengan menggunakan smart contract WETH. Anda dapat menukarkan sejumlah WETH apa pun dengan smart contract WETH, dan Anda akan menerima jumlah yang sama dalam bentuk ETH. WETH yang disetorkan kemudian dibakar dan dikeluarkan dari peredaran pasokan WETH.

**Kira-kira ~3% dari pasokan ETH yang beredar terkunci dalam kontrak token WETH** menjadikannya salah satu [kontrak pintar](/glossary/#smart-contract) yang paling banyak digunakan. WETH sangat penting terutama bagi pengguna yang berinteraksi dengan aplikasi di keuangan terdesentralisasi (DeFi).

## Kenapa kita perlu mengubah ETH dalam bentuk ERC-20? {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) mendefinisikan antarmuka standar untuk token yang dapat dipindahkan, sehingga siapa pun dapat membuat token yang berinteraksi secara mulus dengan aplikasi dan token lain yang menggunakan standar ini di dalam ekosistem Ethereum. Karena **ETH mendahului standar ERC-20**, ETH tidak sesuai dengan spesifikasi ini. Ini berarti **Anda tidak dapat dengan mudah** menukar ETH dengan token ERC-20 lainnya atau **menggunakan ETH dalam aplikasi yang menggunakan standar ERC-20**. Pembungkus eth memberi Anda kesempatan untuk melakukan hal berikut:

- **tukar eth dengan token erc-20**: Anda tidak dapat menukar ETH secara langsung dengan token ERC-20 lainnya. WETH adalah representasi dari ether yang mematuhi standar token fungible ERC-20 dan dapat ditukar dengan token ERC-20 lainnya.

- **Menggunakan ETH di dapps**: Karena ETH tidak kompatibel dengan ERC-20, para pengembang perlu membuat antarmuka terpisah (satu untuk ETH dan satu lagi untuk token ERC-20) di dapps. Membungkus ETH menghilangkan hambatan ini dan memungkinkan pengembang untuk menangani ETH dan token lainnya dalam dapp yang sama. Banyak aplikasi keuangan terdesentralisasi menggunakan standar ini, dan membuat pasar untuk memperdagangkan token-token tersebut.

## Eter terbungkus (weth) vs eter (eth): Apa bedanya? {#weth-vs-eth-differences}

|             | **Eter (ETH)**                                                                                                                                                                                       | **Eter Terbungkus (WETH)**                                                                                                                                                                                                                              |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Memasok     | Pasokan ETH dikelola oleh protokol Ethereum. [Penerbitan](/roadmap/merge/issuance) ETH ditangani oleh validator Ethereum saat memproses transaksi dan membuat blok.                     | WETH adalah token ERC-20 yang pasokannya dikelola oleh sebuah smart contract. Unit baru WETH diterbitkan oleh kontrak setelah menerima deposit ETH dari pengguna, atau unit WETH dibakar ketika pengguna ingin menukarkan WETH dengan ETH. |
| Kepemilikan | Kepemilikan dikelola oleh protokol Ethereum melalui saldo akun Anda.                                                                                                                                    | Kepemilikan WETH dikelola oleh smart contract token WETH, yang diamankan oleh protokol Ethereum.                                                                                                                                                           |
| Gas         | Ether (ETH) adalah satuan pembayaran yang diterima untuk menjalankan komputasi di jaringan Ethereum. Biaya gas dihitung dalam gwei (satuan eter). | Membayar gas dengan token WETH tidak didukung secara asli.                                                                                                                                                                                                 |

## Pertanyaan yang sering diajukan {#faq}

<ExpandableCard title="Apakah ada biaya untuk wrap/unwrap ETH?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

Anda membayar biaya gas saat melakukan wrap atau unwrap ETH menggunakan kontrak WETH.

</ExpandableCard>

<ExpandableCard title="Apakah WETH aman?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETH umumnya dianggap aman karena didasarkan pada kontrak pintar yang sederhana dan telah teruji waktu. Kontrak WETH juga telah diverifikasi secara formal, yang merupakan standar keamanan tertinggi untuk kontrak pintar di Ethereum.

</ExpandableCard>

<ExpandableCard title="Kenapa ada berbagai token WETH?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Selain [implementasi kanonik weth](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) yang dijelaskan di halaman ini, ada varian lain di alam liar. Ini bisa berupa token khusus yang dibuat oleh pengembang aplikasi atau versi yang diterbitkan di blockchain lain, dan mungkin berperilaku berbeda atau memiliki sifat keamanan yang berbeda. **Selalu periksa ulang informasi token untuk mengetahui implementasi WETH mana yang sedang Anda gunakan.**

</ExpandableCard>

<ExpandableCard title="Apa saja kontrak WETH di jaringan lain?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [jaringan utama ethereum](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [optimisme](https://optimistic.etherscan.io/token/0x42000000000000000000000000000000000000000000006)

</ExpandableCard>

## Bacaan lebih lanjut {#further-reading}

- [WTF is WETH?](https://weth.tkn.eth.limo/)
- [informasi token weth di blockscout](https://eth.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [verifikasi formal WETH](https://zellic.io/blog/formal-verification-weth)
