---
title: "ERC-1363 Payable Token標準"
description: "ERC-1363は、送金後の受信先コントラクト、または承認後のspenderコントラクトでカスタムロジックを実行することを、すべて単一のトランザクション内でサポートするERC-20トークンの拡張インターフェースです。"
lang: ja
---

## はじめに {#introduction}

### ERC-1363とは? {#what-is-erc1363}

ERC-1363は、送金後の受信先コントラクト、または承認後のspenderコントラクトでカスタムロジックを実行することを、すべて単一のトランザクション内でサポートするERC-20トークンの拡張インターフェースです。

### ERC-20との違い {#erc20-differences}

`transfer`、`transferFrom`、`approve`のような標準的なERC-20の操作では、別のトランザクションを使用せずに受信先やspenderコントラクトでコードを実行することはできません。
ユーザーは最初のトランザクションが実行されるのを待ってから2つ目のトランザクションを送信しなければならないため、これはユーザーインターフェース (UI) 開発における複雑さや、普及における摩擦をもたらします。
また、ガスを2回支払う必要もあります。

ERC-1363により、代替可能トークン (Fungible Token) はより簡単にアクションを実行できるようになり、オフチェーンのリスナーを使用せずに機能するようになります。
これにより、送金や承認の後に、受信先またはspenderコントラクトへのコールバックを単一のトランザクションで行うことができます。

## 前提条件 {#prerequisites}

このページをより深く理解するために、まずは以下の記事を読むことをお勧めします。

- [トークン標準](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## 本文 {#body}

ERC-1363は、`transfer`、`transferFrom`、または`approve`の後にERC-20トークンがスマート・コントラクトと対話するための標準APIを導入します。

この標準は、トークンを送金する基本的な機能を提供するだけでなく、オンチェーンの第三者が消費できるようにトークンを承認し、その後、受信先またはspenderコントラクトでコールバックを行う機能を提供します。

ERC-20のコールバックを受け入れることができるスマート・コントラクトの用途は数多く提案されています。

例としては以下の通りです。

- **クラウドセール**: トークンの送信により、即座に報酬の割り当てがトリガーされます。
- **サービス**: 支払いがワンステップでサービスへのアクセスを有効にします。
- **請求書**: トークンが自動的に請求書を決済します。
- **サブスクリプション**: 年間料金を承認することで、最初の月の支払いと同時にサブスクリプションが有効になります。

これらの理由から、当初は**「Payable Token」**と名付けられました。

コールバックの動作はその有用性をさらに広げ、以下のようなシームレスな対話を可能にします。

- **ステーキング**: 送金されたトークンが、ステーキングコントラクトでの自動ロックをトリガーします。
- **投票**: 受け取ったトークンが、ガバナンスシステムに投票を登録します。
- **スワップ**: トークンの承認が、ワンステップでスワップロジックを有効にします。

ERC-1363トークンは、送金や承認の受け取り後にコールバックを実行する必要があるすべてのケースにおいて、特定のユーティリティとして使用できます。
また、ERC-1363は、受信者がトークンを処理する能力があるかを確認することで、スマート・コントラクト内でのトークンの喪失やロックを回避するのにも役立ちます。

他のERC-20拡張提案とは異なり、ERC-1363はERC-20の`transfer`および`transferFrom`メソッドをオーバーライドせず、ERC-20との下位互換性を維持しながら実装すべきインターフェースIDを定義しています。

[EIP-1363](https://eips.ethereum.org/EIPS/eip-1363)より:

### メソッド {#methods}

ERC-1363標準を実装するスマート・コントラクトは、`ERC1363`インターフェースのすべての関数、および`ERC20`と`ERC165`インターフェースを実装**しなければなりません (MUST)**。

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev 単一のトランザクションで、`transfer` または `transferFrom` の後に受信者コントラクトでコードを実行したり、`approve` の後にspenderコントラクトでコードを実行したりすることをサポートする、ERC-20 トークンの拡張インターフェース。
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * NOTE: このインターフェースのERC-165識別子は 0xb0202a11 です。
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev 呼び出し元のアカウントから `to` へ `value` 量のトークンを送金し、
   * その後 `to` で `ERC1363Receiver::onTransferReceived` を呼び出します。
   * @param to トークンが送金されるアドレス。
   * @param value 送金されるトークンの量。
   * @return 例外がスローされない限り、操作が成功したことを示すブール値。
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev 呼び出し元のアカウントから `to` へ `value` 量のトークンを送金し、
   * その後 `to` で `ERC1363Receiver::onTransferReceived` を呼び出します。
   * @param to トークンが送金されるアドレス。
   * @param value 送金されるトークンの量。
   * @param data `to` への呼び出しで送信される、指定されたフォーマットのない追加データ。
   * @return 例外がスローされない限り、操作が成功したことを示すブール値。
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev アローワンスメカニズムを使用して `from` から `to` へ `value` 量のトークンを送金し、
   * その後 `to` で `ERC1363Receiver::onTransferReceived` を呼び出します。
   * @param from トークンを送信する元のアドレス。
   * @param to トークンが送金されるアドレス。
   * @param value 送金されるトークンの量。
   * @return 例外がスローされない限り、操作が成功したことを示すブール値。
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev アローワンスメカニズムを使用して `from` から `to` へ `value` 量のトークンを送金し、
   * その後 `to` で `ERC1363Receiver::onTransferReceived` を呼び出します。
   * @param from トークンを送信する元のアドレス。
   * @param to トークンが送金されるアドレス。
   * @param value 送金されるトークンの量。
   * @param data `to` への呼び出しで送信される、指定されたフォーマットのない追加データ。
   * @return 例外がスローされない限り、操作が成功したことを示すブール値。
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev 呼び出し元のトークンに対する `spender` のアローワンスとして `value` 量のトークンを設定し、
   * その後 `spender` で `ERC1363Spender::onApprovalReceived` を呼び出します。
   * @param spender 資金を消費するアドレス。
   * @param value 消費されるトークンの量。
   * @return 例外がスローされない限り、操作が成功したことを示すブール値。
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev 呼び出し元のトークンに対する `spender` のアローワンスとして `value` 量のトークンを設定し、
   * その後 `spender` で `ERC1363Spender::onApprovalReceived` を呼び出します。
   * @param spender 資金を消費するアドレス。
   * @param value 消費されるトークンの量。
   * @param data `spender` への呼び出しで送信される、指定されたフォーマットのない追加データ。
   * @return 例外がスローされない限り、操作が成功したことを示すブール値。
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

`transferAndCall`または`transferFromAndCall`を介してERC-1363トークンを受け入れたいスマート・コントラクトは、`ERC1363Receiver`インターフェースを実装**しなければなりません (MUST)**。

```solidity
/**
 * @title ERC1363Receiver
 * @dev ERC-1363 トークンコントラクトからの `transferAndCall` または `transferFromAndCall` をサポートしたい任意のコントラクトのためのインターフェース。
 */
interface ERC1363Receiver {
  /**
   * @dev ERC-1363 トークンが `operator` によって `from` から `ERC1363::transferAndCall` または `ERC1363::transferFromAndCall` を介してこのコントラクトに送金されるたびに、この関数が呼び出されます。
   *
   * NOTE: 送金を受け入れるには、これは
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * （すなわち 0x88a7ca5c、またはそれ自身の関数セレクタ）を返さなければなりません。
   *
   * @param operator `transferAndCall` または `transferFromAndCall` 関数を呼び出したアドレス。
   * @param from トークンが送金される元のアドレス。
   * @param value 送金されたトークンの量。
   * @param data 指定されたフォーマットのない追加データ。
   * @return 例外がスローされず送金が許可される場合は `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`。
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

`approveAndCall`を介してERC-1363トークンを受け入れたいスマート・コントラクトは、`ERC1363Spender`インターフェースを実装**しなければなりません (MUST)**。

```solidity
/**
 * @title ERC1363Spender
 * @dev ERC-1363 トークンコントラクトからの `approveAndCall` をサポートしたい任意のコントラクトのためのインターフェース。
 */
interface ERC1363Spender {
  /**
   * @dev ERC-1363 トークンの `owner` が `ERC1363::approveAndCall` を介してこのコントラクトにトークンの消費を承認するたびに、この関数が呼び出されます。
   *
   * NOTE: 承認を受け入れるには、これは
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * （すなわち 0x7b04a2d0、またはそれ自身の関数セレクタ）を返さなければなりません。
   *
   * @param owner `approveAndCall` 関数を呼び出し、以前にトークンを所有していたアドレス。
   * @param value 消費されるトークンの量。
   * @param data 指定されたフォーマットのない追加データ。
   * @return 例外がスローされず承認が許可される場合は `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`。
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## 参考文献 {#further-reading}

- [ERC-1363: Payable Token標準](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: GitHubリポジトリ](https://github.com/vittominacori/erc1363-payable-token)