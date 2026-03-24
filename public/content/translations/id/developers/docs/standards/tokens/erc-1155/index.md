---
title: Standar Multi-Token ERC-1155
description: Pelajari tentang ERC-1155, standar multi-token yang menggabungkan token fungible dan non-fungible dalam satu kontrak.
lang: id
---

## Pengantar {#introduction}

Antarmuka standar untuk kontrak yang mengelola beberapa jenis token. Satu kontrak yang diterapkan dapat mencakup kombinasi apa pun dari token fungible, non-fungible token, atau konfigurasi lainnya (misalnya, token semi-fungible).

**Apa yang dimaksud dengan Standar Multi-Token?**

Idenya sederhana dan berupaya membuat antarmuka kontrak pintar yang dapat mewakili dan mengontrol sejumlah jenis token fungible dan non-fungible token. Dengan cara ini, token ERC-1155 dapat melakukan fungsi yang sama seperti token [ERC-20](/developers/docs/standards/tokens/erc-20/) dan [ERC-721](/developers/docs/standards/tokens/erc-721/), dan bahkan keduanya pada saat yang bersamaan. Ini meningkatkan fungsionalitas standar ERC-20 dan ERC-721, membuatnya lebih efisien dan memperbaiki kesalahan implementasi yang jelas.

Token ERC-1155 dijelaskan sepenuhnya dalam [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155).

## Prasyarat {#prerequisites}

Untuk lebih memahami halaman ini, kami sarankan Anda membaca terlebih dahulu tentang [standar token](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/), dan [ERC-721](/developers/docs/standards/tokens/erc-721/).

## Fungsi dan Fitur ERC-1155: {#body}

- [Transfer Batch](#batch_transfers): Mentransfer beberapa aset dalam satu panggilan.
- [Saldo Batch](#batch_balance): Mendapatkan saldo dari beberapa aset dalam satu panggilan.
- [Persetujuan Batch](#batch_approval): Menyetujui semua token ke sebuah alamat.
- [Hook](#receive_hook): Hook penerimaan token.
- [Dukungan NFT](#nft_support): Jika pasokan hanya 1, perlakukan sebagai NFT.
- [Aturan Transfer Aman](#safe_transfer_rule): Serangkaian aturan untuk transfer yang aman.

### Transfer Batch {#batch-transfers}

Transfer batch bekerja sangat mirip dengan transfer ERC-20 biasa. Mari kita lihat fungsi `transferFrom` ERC-20 biasa:

```solidity
// ERC-20 // ERC-20
function transferFrom(address from, address to, uint256 value) external returns (bool);

// ERC-1155 // ERC-1155
function safeBatchTransferFrom(
    address _from,
    address _to,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external;
```

Satu-satunya perbedaan dalam ERC-1155 adalah kita meneruskan nilai sebagai array dan kita juga meneruskan array id. Misalnya diberikan `ids=[3, 6, 13]` dan `values=[100, 200, 5]`, transfer yang dihasilkan akan menjadi

1. Mentransfer 100 token dengan id 3 dari `_from` ke `_to`.
2. Mentransfer 200 token dengan id 6 dari `_from` ke `_to`.
3. Mentransfer 5 token dengan id 13 dari `_from` ke `_to`.

Dalam ERC-1155 kita hanya memiliki `transferFrom`, tidak ada `transfer`. Untuk menggunakannya seperti `transfer` biasa, cukup atur alamat asal (from) ke alamat yang memanggil fungsi tersebut.

### Saldo Batch {#batch-balance}

Panggilan `balanceOf` ERC-20 masing-masing juga memiliki fungsi pasangannya dengan dukungan batch. Sebagai pengingat, ini adalah versi ERC-20:

```solidity
// ERC-20 // ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155 // ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

Bahkan lebih sederhana untuk panggilan saldo, kita dapat mengambil beberapa saldo dalam satu panggilan. Kita meneruskan array pemilik, diikuti oleh array id token.

Misalnya diberikan `_ids=[3, 6, 13]` dan `_owners=[0xbeef..., 0x1337..., 0x1111...]`, nilai yang dikembalikan akan menjadi

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### Persetujuan Batch {#batch-approval}

```solidity
// ERC-1155 // ERC-1155
function setApprovalForAll(
    address _operator,
    bool _approved
) external;

function isApprovedForAll(
    address _owner,
    address _operator
) external view returns (bool);
```

Persetujuan sedikit berbeda dari ERC-20. Alih-alih menyetujui jumlah tertentu, Anda mengatur operator menjadi disetujui atau tidak disetujui melalui `setApprovalForAll`.

Membaca status saat ini dapat dilakukan melalui `isApprovedForAll`. Seperti yang Anda lihat, ini adalah operasi semua-atau-tidak-sama-sekali. Anda tidak dapat menentukan berapa banyak token yang akan disetujui atau bahkan kelas token mana.

Ini sengaja dirancang dengan mempertimbangkan kesederhanaan. Anda hanya dapat menyetujui semuanya untuk satu alamat.

### Hook Penerimaan {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

Mengingat dukungan [EIP-165](https://eips.ethereum.org/EIPS/eip-165), ERC-1155 mendukung hook penerimaan hanya untuk kontrak pintar. Fungsi hook harus mengembalikan nilai bytes4 ajaib yang telah ditentukan sebelumnya yang diberikan sebagai:

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

Ketika kontrak penerima mengembalikan nilai ini, diasumsikan kontrak menerima transfer dan tahu cara menangani token ERC-1155. Hebat, tidak ada lagi token yang tersangkut di dalam kontrak!

### Dukungan NFT {#nft-support}

Ketika pasokan hanya satu, token tersebut pada dasarnya adalah non-fungible token (NFT). Dan seperti standar untuk ERC-721, Anda dapat menentukan URL metadata. URL tersebut dapat dibaca dan dimodifikasi oleh klien, lihat [di sini](https://eips.ethereum.org/EIPS/eip-1155#metadata).

### Aturan Transfer Aman {#safe-transfer-rule}

Kita telah menyinggung beberapa aturan transfer aman dalam penjelasan sebelumnya. Namun mari kita lihat aturan yang paling penting:

1. Pemanggil harus disetujui untuk membelanjakan token untuk alamat `_from` atau pemanggil harus sama dengan `_from`.
2. Panggilan transfer harus di-revert jika
   1. alamat `_to` adalah 0.
   2. panjang `_ids` tidak sama dengan panjang `_values`.
   3. salah satu saldo pemegang untuk token dalam `_ids` lebih rendah dari jumlah masing-masing dalam `_values` yang dikirim ke penerima.
   4. terjadi kesalahan lainnya.

_Catatan_: Semua fungsi batch termasuk hook juga ada sebagai versi tanpa batch. Ini dilakukan untuk efisiensi gas, mengingat mentransfer hanya satu aset kemungkinan masih akan menjadi cara yang paling umum digunakan. Kami telah mengabaikannya demi kesederhanaan dalam penjelasan, termasuk aturan transfer aman. Namanya identik, cukup hapus kata 'Batch'.

## Bacaan lebih lanjut {#further-reading}

- [EIP-1155: Standar Multi Token](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155: Dokumentasi Openzeppelin](https://docs.openzeppelin.com/contracts/5.x/erc1155)
- [ERC-1155: Repositori GitHub](https://github.com/enjin/erc-1155)
- [API NFT Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)