---
title: "ERC-1363 支払い可能トークン標準"
description: "ERC-1363はERC-20トークンの拡張インターフェースであり、送金後に受信者コントラクトで、または承認後にスペンダーコントラクトでカスタムロジックを実行することを、すべて単一のトランザクション内でサポートします。"
lang: ja
---

## はじめに {#introduction}

### ERC-1363とは何か？ {#what-is-erc1363}

ERC-1363はERC-20トークンの拡張インターフェースであり、送金後に受信者コントラクトで、または承認後にスペンダーコントラクトでカスタムロジックを実行することを、すべて単一のトランザクション内でサポートします。

### ERC-20との違い {#erc20-differences}

`transfer`、`transferFrom`、`approve`などの標準的なERC-20の操作では、別のトランザクションなしで受信者またはスペンダーコントラクト上でコードを実行することはできません。
これによりUI開発が複雑化し、導入の障壁となります。ユーザーは最初のトランザクションの実行を待ってから2つ目を送信する必要があるためです。
また、ガスも2回支払わなければなりません。

ERC-1363は、代替可能トークンがより簡単にアクションを実行し、オフチェーンリスナーを使用せずに動作できるようにします。
これにより、単一のトランザクションで、送金または承認後に、受信者またはスペンダーコントラクトへのコールバックが可能になります。

## 前提条件 {#prerequisites}

このページをよりよく理解するために、まず以下について読むことをお勧めします。

- [トークン規格](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## 規格の概要 {#body}

ERC-1363は、`transfer`、`transferFrom`または`approve`の後にERC-20トークンがスマートコントラクトと対話するための標準APIを導入します。

この標準は、トークンを送金する基本的な機能を提供します。また、トークンを承認して別のオンチェーンの第三者が使用できるようにし、その後、受信者またはスペンダーコントラクトでコールバックを実行することも可能です。

ERC-20のコールバックを受け入れることができるスマートコントラクトには、多くの使用法が提案されています。

例としては:

- **クラウドセール**：送信されたトークンが、即時の報酬割り当てをトリガーします。
- **サービス**：支払いがワンステップでサービスアクセスを有効化します。
- **請求書**：トークンが請求書を自動的に決済します。
- **サブスクリプション**：年間レートを承認すると、最初の月の支払いでサブスクリプションが有効になります。

これらの理由から、元々は\*\*「Payable Token」\*\*と名付けられました。

コールバックの動作はその有用性をさらに広げ、以下のようなシームレスなインタラクションを可能にします。

- **ステーキング**：送金されたトークンが、ステーキングコントラクトでの自動ロックをトリガーします。
- **投票**：受け取ったトークンが、ガバナンスシステムで投票を登録します。
- **スワッピング**：トークンの承認が、ワンステップでスワップロジックを有効化します。

ERC-1363トークンは、送金または承認を受けた後にコールバックを実行する必要があるすべてのケースで、特定のユーティリティに使用できます。
ERC-1363は、受信者がトークンを処理できる能力があるか検証することで、スマートコントラクトでのトークンの紛失やロックを回避するのにも役立ちます。

他のERC-20拡張提案とは異なり、ERC-1363はERC-20の`transfer`および`transferFrom`メソッドを上書きせず、ERC-20との後方互換性を維持しながら実装すべきインターフェースIDを定義します。

[EIP-1363](https://eips.ethereum.org/EIPS/eip-1363) から引用：

### メソッド {#methods}

ERC-1363標準を実装するスマートコントラクトは、`ERC1363`インターフェース、ならびに`ERC20`および`ERC165`インターフェースのすべての関数を**必ず**実装しなければなりません。

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev `transfer`または`transferFrom`の後、受信者コントラクト上でコードを実行するか、または`approve`の後、スペンダーコントラクト上でコードを実行することを単一のトランザクションでサポートする、ERC-20トークンの拡張インターフェースです。
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * 注：このインターフェースのERC-165識別子は0xb0202a11です。
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev 呼び出し元のアカウントから`to`に`value`量のトークンを移動させ、
   * その後、`to`で`ERC1363Receiver::onTransferReceived`を呼び出します。
   * @param to トークンの転送先アドレス。
   * @param value 転送するトークンの量。
   * @return スローされない限り、操作が成功したことを示すブール値。
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev 呼び出し元のアカウントから`to`に`value`量のトークンを移動させ、
   * その後、`to`で`ERC1363Receiver::onTransferReceived`を呼び出します。
   * @param to トークンの転送先アドレス。
   * @param value 転送するトークンの量。
   * @param data 指定されたフォーマットのない追加データで、`to`への呼び出しで送信されます。
   * @return スローされない限り、操作が成功したことを示すブール値。
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev アローワンスメカニズムを使用して`from`から`to`に`value`量のトークンを移動させ、
   * その後、`to`で`ERC1363Receiver::onTransferReceived`を呼び出します。
   * @param from トークンを送信するアドレス。
   * @param to トークンの転送先アドレス。
   * @param value 転送するトークンの量。
   * @return スローされない限り、操作が成功したことを示すブール値。
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev アローワンスメカニズムを使用して`from`から`to`に`value`量のトークンを移動させ、
   * その後、`to`で`ERC1363Receiver::onTransferReceived`を呼び出します。
   * @param from トークンを送信するアドレス。
   * @param to トークンの転送先アドレス。
   * @param value 転送するトークンの量。
   * @param data 指定されたフォーマットのない追加データで、`to`への呼び出しで送信されます。
   * @return スローされない限り、操作が成功したことを示すブール値。
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev 呼び出し元のトークンに対する`spender`のアローワンスとして、`value`量のトークンを設定し、
   * その後、`spender`で`ERC1363Spender::onApprovalReceived`を呼び出します。
   * @param spender 資金を使用するアドレス。
   * @param value 使用されるトークンの量。
   * @return スローされない限り、操作が成功したことを示すブール値。
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev 呼び出し元のトークンに対する`spender`のアローワンスとして、`value`量のトークンを設定し、
   * その後、`spender`で`ERC1363Spender::onApprovalReceived`を呼び出します。
   * @param spender 資金を使用するアドレス。
   * @param value 使用されるトークンの量。
   * @param data 指定されたフォーマットのない追加データで、`spender`への呼び出しで送信されます。
   * @return スローされない限り、操作が成功したことを示すブール値。
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

`transferAndCall`または`transferFromAndCall`を介してERC-1363トークンを受け入れたいスマートコントラクトは、`ERC1363Receiver`インターフェースを**必ず**実装しなければなりません：

```solidity
/**
 * @title ERC1363Receiver
 * @dev ERC-1363トークンコントラクトからの`transferAndCall`または`transferFromAndCall`をサポートしたいすべてのコントラクトのためのインターフェースです。
 */
interface ERC1363Receiver {
  /**
   * @dev ERC-1363トークンが、`operator`によって`from`からこのコントラクトに`ERC1363::transferAndCall`または`ERC1363::transferFromAndCall`を介して転送されるたびに、この関数が呼び出されます。
   *
   * 注：転送を受け入れるには、この関数は
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (つまり0x88a7ca5c、またはそれ自身の関数セレクター) を返さなければなりません。
   *
   * @param operator `transferAndCall`または`transferFromAndCall`関数を呼び出したアドレス。
   * @param from トークンが転送された元のアドレス。
   * @param value 転送されたトークンの量。
   * @param data 指定されたフォーマットのない追加データ。
   * @return スローされない限り、転送が許可されている場合は`bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`。
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

`approveAndCall`を介してERC-1363トークンを受け入れたいスマートコントラクトは、`ERC1363Spender`インターフェースを**必ず**実装しなければなりません：

```solidity
/**
 * @title ERC1363Spender
 * @dev ERC-1363トークンコントラクトからの`approveAndCall`をサポートしたいすべてのコントラクトのためのインターフェースです。
 */
interface ERC1363Spender {
  /**
   * @dev ERC-1363トークンの`owner`が、自身のトークンを使用するために`ERC1363::approveAndCall`を介してこのコントラクトを承認するたびに、この関数が呼び出されます。
   *
   * 注：承認を受け入れるには、この関数は
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (つまり0x7b04a2d0、またはそれ自身の関数セレクター) を返さなければなりません。
   *
   * @param owner `approveAndCall`関数を呼び出し、以前はトークンを所有していたアドレス。
   * @param value 使用されるトークンの量。
   * @param data 指定されたフォーマットのない追加データ。
   * @return スローされない限り、承認が許可されている場合は`bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`。
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## 参考リンク {#further-reading}

- [ERC-1363: 支払い可能トークン標準](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: GitHubリポジトリ](https://github.com/vittominacori/erc1363-payable-token)
