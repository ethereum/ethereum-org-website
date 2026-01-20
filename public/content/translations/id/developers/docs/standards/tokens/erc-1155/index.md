---
title: Standar Token Multi ERC-1155
description: Pelajari tentang ERC-1155, standar multi-token yang menggabungkan token yang dapat dipertukarkan dan token yang tidak dapat dipertukarkan dalam satu kontrak.
lang: id
---

## Pengenalan {#introduction}

Sebuah antarmuka standar untuk kontrak yang mengelola jenis token multiple. Satu kontrak yang diterapkan dapat menyertakan kombinasi apa pun dari token yang dapat dipertukarkan, token yang tidak dapat dipertukarkan, atau konfigurasi lainnya (misalnya, token semi yang dapat dipertukarkan).

**Apa yang dimaksud dengan Standar Multitoken?**

Idenya sederhana dan bertujuan untuk membuat antarmuka kontrak pintar yang dapat mewakili dan mengontrol berapa pun jumlah tipe token yang dapat dipertukarkan dan tidak dapat dipertukarkan. Dengan cara ini, token ERC-1155 dapat melakukan fungsi yang sama seperti token [ERC-20](/developers/docs/standards/tokens/erc-20/) dan [ERC-721](/developers/docs/standards/tokens/erc-721/), dan bahkan keduanya pada saat yang bersamaan. Hal ini meningkatkan fungsionalitas standar ERC-20 dan ERC-721, membuatnya lebih efisien sekaligus memperbaiki kesalahan implementasi yang jelas.

Token ERC-1155 dijelaskan secara lengkap dalam [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155).

## Persyaratan {#prerequisites}

Untuk lebih memahami halaman ini, kami sarankan Anda membaca terlebih dahulu tentang [standar token](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/), dan [ERC-721](/developers/docs/standards/tokens/erc-721/).

## Fungsi dan Fitur ERC-1155: {#body}

- [Transfer Kelompok](#batch_transfers): Transfer beberapa aset dalam satu panggilan.
- [Saldo Kelompok](#batch_balance): Dapatkan saldo beberapa aset dalam satu panggilan.
- [Persetujuan Kelompok](#batch_approval): Menyetujui semua token ke sebuah alamat.
- [Kaitan](#receive_hook): Kaitan untuk menerima token.
- [Dukungan NFT](#nft_support): Jika pasokan hanya 1, perlakukan sebagai NFT.
- [Aturan Transfer Aman](#safe_transfer_rule): Kumpulan aturan untuk transfer yang aman.

### Transfer Kelompok {#batch-transfers}

Transfer kelompok bekerja dalam cara yang sangat mirip dengan transfer ERC-20 reguler. Mari kita lihat fungsi `transferFrom` ERC-20 yang reguler:

```solidity
// ERC-20
function transferFrom(address from, address to, uint256 value) external returns (bool);

// ERC-1155
function safeBatchTransferFrom(
    address _from,
    address _to,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external;
```

Perbedaan utama pada ERC-1155 adalah kita mengirimkan nilai dalam bentuk array dan juga mengirimkan array ID. Misalnya, dengan `ids=[3, 6, 13]` dan `values=[100, 200, 5]`, transfer yang dihasilkan adalah

1. Transfer 100 token dengan id 3 dari `_from` ke `_to`.
2. Transfer 200 token dengan id 6 dari `_from` ke `_to`.
3. Transfer 5 token dengan id 13 dari `_from` ke `_to`.

Di ERC-1155, kami hanya memiliki `transferFrom`, tidak ada `transfer`. Untuk menggunakannya seperti `transfer` biasa, cukup atur alamat 'from' ke alamat yang memanggil fungsi.

### Saldo Kelompok {#batch-balance}

Panggilan `balanceOf` ERC-20 yang sesuai juga memiliki fungsi pasangannya dengan dukungan kelompok. Sebagai pengingat, ini adalah versi ERC-20:

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

Bahkan lebih sederhana untuk pemanggilan saldo, kita dapat mengambilkan beberapa saldo dalam sekali pemanggilan. Kita melewatkan larik pemilik, yang diikuti dengan larik id token.

Misalnya, dengan `_ids=[3, 6, 13]` dan `_owners=[0xbeef..., 0x1337..., 0x1111...]`, nilai yang dikembalikan adalah

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### Persetujuan Kelompok {#batch-approval}

```solidity
// ERC-1155
function setApprovalForAll(
    address _operator,
    bool _approved
) external;

function isApprovedForAll(
    address _owner,
    address _operator
) external view returns (bool);
```

Persetujuannya sedikit berbeda dengan ERC-20. Alih-alih menyetujui jumlah tertentu, Anda mengatur operator menjadi disetujui atau tidak disetujui melalui `setApprovalForAll`.

Membaca status saat ini dapat dilakukan melalui `isApprovedForAll`. Seperti yang bisa kamu lihat, ini adalah operasi semua atau tidak sama sekali. Anda tidak dapat mendefinisikan berapa banyak token yang akan disetujui atau bahkan kelas token.

Ini dengan sengaja dirancang sedemikian rupa dengan tujuan kemudahan. Anda juga dapat menyetujui semua hal untuk satu alamat.

### Kaitan Penerimaan {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

Dengan dukungan [EIP-165](https://eips.ethereum.org/EIPS/eip-165), ERC-1155 mendukung kaitan penerimaan hanya untuk kontrak pintar. Fungsi kaitan harus mengembalikan nilai magic yang ditentukan sebelumnya dalam bytes4 yang diberikan sebagai:

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

Ketika kontrak yang menerima mengembalikan nilai ini, kontrak dianggap menerima transfer dan mengetahui cara menangani token ERC-1155. Bagus, tidak ada lagi token yang macet dalam kontrak!

### Dukungan NFT {#nft-support}

Ketika persediaan hanya berjumlah satu, token pada dasarnya merupakan token yang tidak dapat dipertukarkan (NFT). Dan karena ini adalah standar untuk ERC-721, Anda dapat menentukan suatu URL metadata. URL dapat dibaca dan diubah oleh klien, lihat [di sini](https://eips.ethereum.org/EIPS/eip-1155#metadata).

### Aturan Transfer Aman {#safe-transfer-rule}

Kita telah membahas beberapa aturan transfer yang aman di penjelasan sebelumnya. Tetapi, mari kita lihat pada bagian terpenting dari aturannya:

1. Pemanggil harus disetujui untuk menggunakan token untuk alamat `_from` atau pemanggil harus sama dengan `_from`.
2. Pemanggilan transfer harus dibalikkan jika
   1. Alamat `_to` adalah 0.
   2. Panjang `_ids` tidak sama dengan panjang `_values`.
   3. Saldo pemegang mana pun untuk token dalam `_ids` lebih rendah dari jumlah masing-masing dalam `_values` yang dikirim ke penerima.
   4. kesalahan lain mana pun terjadi.

_Catatan_: Semua fungsi kelompok termasuk kaitan juga ada dalam versi tanpa kelompok. Ini semua demi efisiensi gas, dengan pertimbangan untuk mentransfer hanya satu aset mungkin masih menjadi cara yang paling banyak digunakan. Kita telah melewatkannya untuk penjelasan yang sederhana, termasuk untuk aturan transfer yang aman. Namanya mirip, cukup hilangkan 'Batch'.

## Bacaan lebih lanjut {#further-reading}

- [EIP-1155: Standar Multi Token](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155: Dokumen Openzeppelin](https://docs.openzeppelin.com/contracts/5.x/erc1155)
- [ERC-1155: Repo GitHub](https://github.com/enjin/erc-1155)
- [API NFT Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)
