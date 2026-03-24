---
title: Standar Token Payable ERC-1363
description: ERC-1363 adalah antarmuka ekstensi untuk token ERC-20 yang mendukung eksekusi logika kustom pada kontrak penerima setelah transfer, atau pada kontrak pembelanja setelah persetujuan, semuanya dalam satu transaksi tunggal.
lang: id
---

## Pengantar {#introduction}

### Apa itu ERC-1363? {#what-is-erc1363}

ERC-1363 adalah antarmuka ekstensi untuk token ERC-20 yang mendukung eksekusi logika kustom pada kontrak penerima setelah transfer, atau pada kontrak pembelanja setelah persetujuan, semuanya dalam satu transaksi tunggal.

### Perbedaan dari ERC-20 {#erc20-differences}

Operasi standar ERC-20 seperti `transfer`, `transferFrom`, dan `approve`, tidak mengizinkan eksekusi kode pada kontrak penerima atau pembelanja tanpa transaksi terpisah.
Hal ini menimbulkan kompleksitas dalam pengembangan UI dan hambatan pada adopsi karena pengguna harus menunggu transaksi pertama dieksekusi dan kemudian mengirimkan yang kedua.
Mereka juga harus membayar GAS dua kali.

ERC-1363 membuat token yang sepadan (fungible) mampu melakukan tindakan dengan lebih mudah dan bekerja tanpa menggunakan pendengar offchain apa pun.
Ini memungkinkan untuk melakukan panggilan balik (callback) pada kontrak penerima atau pembelanja, setelah transfer atau persetujuan, dalam satu transaksi tunggal.

## Prasyarat {#prerequisites}

Untuk lebih memahami halaman ini, kami sarankan Anda membaca terlebih dahulu tentang:

- [Standar token](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Isi {#body}

ERC-1363 memperkenalkan API standar untuk token ERC-20 agar dapat berinteraksi dengan kontrak pintar setelah `transfer`, `transferFrom`, atau `approve`.

Standar ini menyediakan fungsionalitas dasar untuk mentransfer token, serta memungkinkan token untuk disetujui sehingga dapat dibelanjakan oleh pihak ketiga onchain lainnya, dan kemudian melakukan panggilan balik pada kontrak penerima atau pembelanja.

Ada banyak usulan penggunaan kontrak pintar yang dapat menerima panggilan balik ERC-20.

Contohnya bisa berupa:

- **Crowdsale**: token yang dikirim memicu alokasi hadiah instan.
- **Layanan**: pembayaran mengaktifkan akses layanan dalam satu langkah.
- **Faktur**: token menyelesaikan faktur secara otomatis.
- **Langganan**: menyetujui tarif tahunan mengaktifkan langganan dalam pembayaran bulan pertama.

Karena alasan ini, standar ini awalnya dinamakan **"Payable Token"**.

Perilaku panggilan balik semakin memperluas utilitasnya, memungkinkan interaksi yang mulus seperti:

- **Mengunci**: token yang ditransfer memicu penguncian otomatis dalam kontrak mengunci.
- **Pemungutan Suara**: token yang diterima mendaftarkan suara dalam sistem tata kelola.
- **Menukar**: persetujuan token mengaktifkan logika tukar dalam satu langkah tunggal.

Token ERC-1363 dapat digunakan untuk utilitas spesifik dalam semua kasus yang memerlukan panggilan balik untuk dieksekusi setelah transfer atau persetujuan diterima.
ERC-1363 juga berguna untuk menghindari kehilangan token atau penguncian token dalam kontrak pintar dengan memverifikasi kemampuan penerima untuk menangani token.

Tidak seperti proposal ekstensi ERC-20 lainnya, ERC-1363 tidak menimpa metode `transfer` dan `transferFrom` ERC-20 dan mendefinisikan ID antarmuka yang akan diimplementasikan dengan mempertahankan kompatibilitas ke belakang dengan ERC-20.

Dari [EIP-1363](https://eips.ethereum.org/EIPS/eip-1363):

### Metode {#methods}

Kontrak pintar yang mengimplementasikan standar ERC-1363 **HARUS** mengimplementasikan semua fungsi dalam antarmuka `ERC1363`, serta antarmuka `ERC20` dan `ERC165`.

```solidity
pragma solidity ^0.8.0;

/* *
 * @title ERC1363
 * @dev Antarmuka ekstensi untuk token ERC-20 yang mendukung pengeksekusian kode pada kontrak penerima
 * setelah `transfer` atau `transferFrom`, atau kode pada kontrak pembelanja setelah `approve`, dalam satu transaksi tunggal. */
/**
 * @title ERC1363
 * @dev An extension interface for ERC-20 tokens that supports executing code on a recipient contract
 * after `transfer` or `transferFrom`, or code on a spender contract after `approve`, in a single transaction.
 */
interface ERC1363 is ERC20, ERC165 {
  /* * CATATAN: pengidentifikasi ERC-165 untuk antarmuka ini adalah 0xb0202a11.
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)')) */
  /*
   * NOTE: the ERC-165 identifier for this interface is 0xb0202a11.
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /* *
   * @dev Memindahkan sejumlah `value` token dari akun pemanggil ke `to`
   * dan kemudian memanggil `ERC1363Receiver::onTransferReceived` pada `to`.
   * @param to Alamat tujuan transfer token.
   * @param value Jumlah token yang akan ditransfer.
   * @return Nilai boolean yang menunjukkan operasi berhasil kecuali jika terjadi kesalahan (throwing). */
  /**
   * @dev Moves a `value` amount of tokens from the caller's account to `to`
   * and then calls `ERC1363Receiver::onTransferReceived` on `to`.
   * @param to The address to which tokens are being transferred.
   * @param value The amount of tokens to be transferred.
   * @return A boolean value indicating the operation succeeded unless throwing.
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /* *
   * @dev Memindahkan sejumlah `value` token dari akun pemanggil ke `to`
   * dan kemudian memanggil `ERC1363Receiver::onTransferReceived` pada `to`.
   * @param to Alamat tujuan transfer token.
   * @param value Jumlah token yang akan ditransfer.
   * @param data Data tambahan tanpa format yang ditentukan, dikirim dalam panggilan ke `to`.
   * @return Nilai boolean yang menunjukkan operasi berhasil kecuali jika terjadi kesalahan (throwing). */
  /**
   * @dev Moves a `value` amount of tokens from the caller's account to `to`
   * and then calls `ERC1363Receiver::onTransferReceived` on `to`.
   * @param to The address to which tokens are being transferred.
   * @param value The amount of tokens to be transferred.
   * @param data Additional data with no specified format, sent in call to `to`.
   * @return A boolean value indicating the operation succeeded unless throwing.
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /* *
   * @dev Memindahkan sejumlah `value` token dari `from` ke `to` menggunakan mekanisme jatah (allowance)
   * dan kemudian memanggil `ERC1363Receiver::onTransferReceived` pada `to`.
   * @param from Alamat asal pengiriman token.
   * @param to Alamat tujuan transfer token.
   * @param value Jumlah token yang akan ditransfer.
   * @return Nilai boolean yang menunjukkan operasi berhasil kecuali jika terjadi kesalahan (throwing). */
  /**
   * @dev Moves a `value` amount of tokens from `from` to `to` using the allowance mechanism
   * and then calls `ERC1363Receiver::onTransferReceived` on `to`.
   * @param from The address from which to send tokens.
   * @param to The address to which tokens are being transferred.
   * @param value The amount of tokens to be transferred.
   * @return A boolean value indicating the operation succeeded unless throwing.
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /* *
   * @dev Memindahkan sejumlah `value` token dari `from` ke `to` menggunakan mekanisme jatah (allowance)
   * dan kemudian memanggil `ERC1363Receiver::onTransferReceived` pada `to`.
   * @param from Alamat asal pengiriman token.
   * @param to Alamat tujuan transfer token.
   * @param value Jumlah token yang akan ditransfer.
   * @param data Data tambahan tanpa format yang ditentukan, dikirim dalam panggilan ke `to`.
   * @return Nilai boolean yang menunjukkan operasi berhasil kecuali jika terjadi kesalahan (throwing). */
  /**
   * @dev Moves a `value` amount of tokens from `from` to `to` using the allowance mechanism
   * and then calls `ERC1363Receiver::onTransferReceived` on `to`.
   * @param from The address from which to send tokens.
   * @param to The address to which tokens are being transferred.
   * @param value The amount of tokens to be transferred.
   * @param data Additional data with no specified format, sent in call to `to`.
   * @return A boolean value indicating the operation succeeded unless throwing.
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /* *
   * @dev Menetapkan sejumlah `value` token sebagai jatah (allowance) bagi `spender` atas token pemanggil
   * dan kemudian memanggil `ERC1363Spender::onApprovalReceived` pada `spender`.
   * @param spender Alamat yang akan membelanjakan dana.
   * @param value Jumlah token yang akan dibelanjakan.
   * @return Nilai boolean yang menunjukkan operasi berhasil kecuali jika terjadi kesalahan (throwing). */
  /**
   * @dev Sets a `value` amount of tokens as the allowance of `spender` over the caller's tokens
   * and then calls `ERC1363Spender::onApprovalReceived` on `spender`.
   * @param spender The address which will spend the funds.
   * @param value The amount of tokens to be spent.
   * @return A boolean value indicating the operation succeeded unless throwing.
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /* *
   * @dev Menetapkan sejumlah `value` token sebagai jatah (allowance) bagi `spender` atas token pemanggil
   * dan kemudian memanggil `ERC1363Spender::onApprovalReceived` pada `spender`.
   * @param spender Alamat yang akan membelanjakan dana.
   * @param value Jumlah token yang akan dibelanjakan.
   * @param data Data tambahan tanpa format yang ditentukan, dikirim dalam panggilan ke `spender`.
   * @return Nilai boolean yang menunjukkan operasi berhasil kecuali jika terjadi kesalahan (throwing). */
  /**
   * @dev Sets a `value` amount of tokens as the allowance of `spender` over the caller's tokens
   * and then calls `ERC1363Spender::onApprovalReceived` on `spender`.
   * @param spender The address which will spend the funds.
   * @param value The amount of tokens to be spent.
   * @param data Additional data with no specified format, sent in call to `spender`.
   * @return A boolean value indicating the operation succeeded unless throwing.
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
/* *
 * @title ERC1363Receiver
 * @dev Antarmuka untuk kontrak apa pun yang ingin mendukung `transferAndCall` atau `transferFromAndCall` dari kontrak token ERC-1363. */
/**
 * @title ERC1363Receiver
 * @dev Interface for any contract that wants to support `transferAndCall` or `transferFromAndCall` from ERC-1363 token contracts.
 */
interface ERC1363Receiver {
  /* *
   * @dev Kapan pun token ERC-1363 ditransfer ke kontrak ini melalui `ERC1363::transferAndCall` atau `ERC1363::transferFromAndCall`
   * oleh `operator` dari `from`, fungsi ini dipanggil.
   *
   * CATATAN: Untuk menerima transfer, ini harus mengembalikan
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (yaitu 0x88a7ca5c, atau pemilih fungsinya sendiri).
   *
   * @param operator Alamat yang memanggil fungsi `transferAndCall` atau `transferFromAndCall`.
   * @param from Alamat asal transfer token.
   * @param value Jumlah token yang ditransfer.
   * @param data Data tambahan tanpa format yang ditentukan.
   * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` jika transfer diizinkan kecuali jika terjadi kesalahan (throwing). */
  /**
   * @dev Whenever ERC-1363 tokens are transferred to this contract via `ERC1363::transferAndCall` or `ERC1363::transferFromAndCall`
   * by `operator` from `from`, this function is called.
   *
   * NOTE: To accept the transfer, this must return
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (i.e. 0x88a7ca5c, or its own function selector).
   *
   * @param operator The address which called `transferAndCall` or `transferFromAndCall` function.
   * @param from The address which are tokens transferred from.
   * @param value The amount of tokens transferred.
   * @param data Additional data with no specified format.
   * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` if transfer is allowed unless throwing.
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

Kontrak pintar yang ingin menerima token ERC-1363 melalui `approveAndCall` **HARUS** mengimplementasikan antarmuka `ERC1363Spender`:

```solidity
/* *
 * @title ERC1363Spender
 * @dev Antarmuka untuk kontrak apa pun yang ingin mendukung `approveAndCall` dari kontrak token ERC-1363. */
/**
 * @title ERC1363Spender
 * @dev Interface for any contract that wants to support `approveAndCall` from ERC-1363 token contracts.
 */
interface ERC1363Spender {
  /* *
   * @dev Kapan pun `owner` token ERC-1363 menyetujui kontrak ini melalui `ERC1363::approveAndCall`
   * untuk membelanjakan token mereka, fungsi ini dipanggil.
   *
   * CATATAN: Untuk menerima persetujuan, ini harus mengembalikan
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (yaitu 0x7b04a2d0, atau pemilih fungsinya sendiri).
   *
   * @param owner Alamat yang memanggil fungsi `approveAndCall` dan sebelumnya memiliki token tersebut.
   * @param value Jumlah token yang akan dibelanjakan.
   * @param data Data tambahan tanpa format yang ditentukan.
   * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` jika persetujuan diizinkan kecuali jika terjadi kesalahan (throwing). */
  /**
   * @dev Whenever an ERC-1363 tokens `owner` approves this contract via `ERC1363::approveAndCall`
   * to spend their tokens, this function is called.
   *
   * NOTE: To accept the approval, this must return
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (i.e. 0x7b04a2d0, or its own function selector).
   *
   * @param owner The address which called `approveAndCall` function and previously owned the tokens.
   * @param value The amount of tokens to be spent.
   * @param data Additional data with no specified format.
   * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` if approval is allowed unless throwing.
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## Bacaan lebih lanjut {#further-reading}

- [ERC-1363: Standar Token Payable](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: Repo GitHub](https://github.com/vittominacori/erc1363-payable-token)