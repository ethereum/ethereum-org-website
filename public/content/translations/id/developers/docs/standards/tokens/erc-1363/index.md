---
title: Standar Token Payable ERC-1363
description: ERC-1363 adalah antarmuka ekstensi untuk token ERC-20 yang mendukung eksekusi logika khusus pada kontrak penerima setelah transfer, atau pada kontrak pembelanja setelah persetujuan, semua dalam satu transaksi tunggal.
lang: id
---

## Pengenalan {#introduction}

### Apa itu ERC-1363? {#what-is-erc1363}

ERC-1363 adalah antarmuka ekstensi untuk token ERC-20 yang mendukung eksekusi logika khusus pada kontrak penerima setelah transfer, atau pada kontrak pembelanja setelah persetujuan, semua dalam satu transaksi tunggal.

### Perbedaan dari ERC-20 {#erc20-differences}

Operasi standar ERC-20 seperti `transfer`, `transferFrom`, dan `approve`, tidak mengizinkan eksekusi kode pada kontrak penerima atau pembelanja tanpa transaksi terpisah.
Hal ini menimbulkan kerumitan dalam pengembangan UI dan hambatan dalam adopsi karena pengguna harus menunggu transaksi pertama dieksekusi dan kemudian mengirimkan yang kedua.
Mereka juga harus membayar GAS dua kali.

ERC-1363 membuat token fungible mampu melakukan tindakan dengan lebih mudah dan bekerja tanpa menggunakan listener off-chain.
Ini memungkinkan untuk melakukan callback pada kontrak penerima atau pembelanja, setelah transfer atau persetujuan, dalam satu transaksi tunggal.

## Persyaratan {#prerequisites}

Untuk lebih memahami halaman ini, kami sarankan Anda membaca terlebih dahulu tentang:

- [Standar token](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Body {#body}

ERC-1363 memperkenalkan API standar untuk token ERC-20 untuk berinteraksi dengan kontrak pintar setelah `transfer`, `transferFrom`, atau `approve`.

Standar ini menyediakan fungsionalitas dasar untuk mentransfer token, serta memungkinkan token untuk disetujui sehingga dapat dibelanjakan oleh pihak ketiga on-chain lainnya, dan kemudian melakukan callback pada kontrak penerima atau pembelanja.

Ada banyak usulan penggunaan kontrak pintar yang dapat menerima callback ERC-20.

Contohnya bisa berupa:

- **Crowdsales**: token yang dikirim memicu alokasi imbalan instan.
- **Layanan**: pembayaran mengaktifkan akses layanan dalam satu langkah.
- **Faktur**: token menyelesaikan faktur secara otomatis.
- **Langganan**: menyetujui tarif tahunan akan mengaktifkan langganan dalam pembayaran bulan pertama.

Karena alasan ini, awalnya dinamai **"Payable Token"**.

Perilaku callback lebih lanjut memperluas kegunaannya, memungkinkan interaksi yang lancar seperti:

- **Penaruhan**: token yang ditransfer memicu penguncian otomatis dalam kontrak penaruhan.
- **Pemungutan suara**: token yang diterima mendaftarkan suara dalam sistem tata kelola.
- **Penukaran**: persetujuan token mengaktifkan logika penukaran dalam satu langkah.

Token ERC-1363 dapat digunakan untuk utilitas tertentu dalam semua kasus yang memerlukan callback untuk dieksekusi setelah transfer atau persetujuan diterima.
ERC-1363 juga berguna untuk menghindari kehilangan token atau penguncian token dalam kontrak pintar dengan memverifikasi kemampuan penerima untuk menangani token.

Tidak seperti proposal ekstensi ERC-20 lainnya, ERC-1363 tidak menimpa metode `transfer` dan `transferFrom` ERC-20 dan mendefinisikan ID antarmuka yang akan diimplementasikan dengan mempertahankan kompatibilitas mundur dengan ERC-20.

Dari [EIP-1363](https://eips.ethereum.org/EIPS/eip-1363):

### Methods {#methods}

Kontrak pintar yang mengimplementasikan standar ERC-1363 **HARUS** mengimplementasikan semua fungsi di antarmuka `ERC1363`, serta antarmuka `ERC20` dan `ERC165`.

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev Antarmuka ekstensi untuk token ERC-20 yang mendukung eksekusi kode pada kontrak penerima
 * setelah `transfer` atau `transferFrom`, atau kode pada kontrak pembelanja setelah `approve`, dalam satu transaksi tunggal.
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * CATATAN: pengidentifikasi ERC-165 untuk antarmuka ini adalah 0xb0202a11.
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev Memindahkan sejumlah `value` token dari akun pemanggil ke `to`
   * dan kemudian memanggil `ERC1363Receiver::onTransferReceived` pada `to`.
   * @param to Alamat ke mana token ditransfer.
   * @param value Jumlah token yang akan ditransfer.
   * @return Nilai boolean yang menunjukkan operasi berhasil kecuali jika terjadi kesalahan.
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev Memindahkan sejumlah `value` token dari akun pemanggil ke `to`
   * dan kemudian memanggil `ERC1363Receiver::onTransferReceived` pada `to`.
   * @param to Alamat ke mana token ditransfer.
   * @param value Jumlah token yang akan ditransfer.
   * @param data Data tambahan tanpa format yang ditentukan, dikirim dalam panggilan ke `to`.
   * @return Nilai boolean yang menunjukkan operasi berhasil kecuali jika terjadi kesalahan.
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Memindahkan sejumlah `value` token dari `from` ke `to` menggunakan mekanisme alokasi
   * dan kemudian memanggil `ERC1363Receiver::onTransferReceived` pada `to`.
   * @param from Alamat dari mana token dikirim.
   * @param to Alamat ke mana token ditransfer.
   * @param value Jumlah token yang akan ditransfer.
   * @return Nilai boolean yang menunjukkan operasi berhasil kecuali jika terjadi kesalahan.
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev Memindahkan sejumlah `value` token dari `from` ke `to` menggunakan mekanisme alokasi
   * dan kemudian memanggil `ERC1363Receiver::onTransferReceived` pada `to`.
   * @param from Alamat dari mana token dikirim.
   * @param to Alamat ke mana token ditransfer.
   * @param value Jumlah token yang akan ditransfer.
   * @param data Data tambahan tanpa format yang ditentukan, dikirim dalam panggilan ke `to`.
   * @return Nilai boolean yang menunjukkan operasi berhasil kecuali jika terjadi kesalahan.
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Menetapkan sejumlah `value` token sebagai alokasi `spender` atas token pemanggil
   * dan kemudian memanggil `ERC1363Spender::onApprovalReceived` pada `spender`.
   * @param spender Alamat yang akan membelanjakan dana.
   * @param value Jumlah token yang akan dibelanjakan.
   * @return Nilai boolean yang menunjukkan operasi berhasil kecuali jika terjadi kesalahan.
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev Menetapkan sejumlah `value` token sebagai alokasi `spender` atas token pemanggil
   * dan kemudian memanggil `ERC1363Spender::onApprovalReceived` pada `spender`.
   * @param spender Alamat yang akan membelanjakan dana.
   * @param value Jumlah token yang akan dibelanjakan.
   * @param data Data tambahan tanpa format yang ditentukan, dikirim dalam panggilan ke `spender`.
   * @return Nilai boolean yang menunjukkan operasi berhasil kecuali jika terjadi kesalahan.
   */
  function approveAndCall(address spender, uint256 value, bytes calldata data) external returns (bool);
}

interface ERC20 {
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
  function transfer(address to, uint256 value) external returns (bool);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  function approve(address spender, uint256 value) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address account) external view returns (uint256);
  function allowance(address owner, address spender) external view returns (uint256);
}

interface ERC165 {
  function supportsInterface(bytes4 interfaceId) external view returns (bool);
}
```

Kontrak pintar yang ingin menerima token ERC-1363 melalui `transferAndCall` atau `transferFromAndCall` **HARUS** mengimplementasikan antarmuka `ERC1363Receiver`:

```solidity
/**
 * @title ERC1363Receiver
 * @dev Antarmuka untuk kontrak apa pun yang ingin mendukung `transferAndCall` atau `transferFromAndCall` dari kontrak token ERC-1363.
 */
interface ERC1363Receiver {
  /**
   * @dev Setiap kali token ERC-1363 ditransfer ke kontrak ini melalui `ERC1363::transferAndCall` atau `ERC1363::transferFromAndCall`
   * oleh `operator` dari `from`, fungsi ini dipanggil.
   *
   * CATATAN: Untuk menerima transfer, ini harus mengembalikan
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (yaitu 0x88a7ca5c, atau penyeleksi fungsinya sendiri).
   *
   * @param operator Alamat yang memanggil fungsi `transferAndCall` atau `transferFromAndCall`.
   * @param from Alamat dari mana token ditransfer.
   * @param value Jumlah token yang ditransfer.
   * @param data Data tambahan tanpa format yang ditentukan.
   * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` jika transfer diizinkan kecuali jika terjadi kesalahan.
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

Kontrak pintar yang ingin menerima token ERC-1363 melalui `approveAndCall` **HARUS** mengimplementasikan antarmuka `ERC1363Spender`:

```solidity
/**
 * @title ERC1363Spender
 * @dev Antarmuka untuk kontrak apa pun yang ingin mendukung `approveAndCall` dari kontrak token ERC-1363.
 */
interface ERC1363Spender {
  /**
   * @dev Setiap kali `owner` token ERC-1363 menyetujui kontrak ini melalui `ERC1363::approveAndCall`
   * untuk membelanjakan token mereka, fungsi ini dipanggil.
   *
   * CATATAN: Untuk menerima persetujuan, ini harus mengembalikan
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (yaitu 0x7b04a2d0, atau penyeleksi fungsinya sendiri).
   *
   * @param owner Alamat yang memanggil fungsi `approveAndCall` dan sebelumnya memiliki token.
   * @param value Jumlah token yang akan dibelanjakan.
   * @param data Data tambahan tanpa format yang ditentukan.
   * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` jika persetujuan diizinkan kecuali jika terjadi kesalahan.
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## Bacaan lebih lanjut {#further-reading}

- [ERC-1363: Standar Token Payable](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: Repo GitHub](https://github.com/vittominacori/erc1363-payable-token)
