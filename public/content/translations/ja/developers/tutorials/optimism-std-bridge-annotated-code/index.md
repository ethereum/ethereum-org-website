---
title: "オプティミズムの標準ブリッジコントラクトの解説"
description: "オプティミズムの標準ブリッジはどのように機能するのでしょうか？なぜこのように機能するのでしょうか？"
author: "オリ・ポメランツ"
tags: ["Solidity", "ブリッジ", "レイヤー2"]
skill: intermediate
breadcrumb: "オプティミズムのブリッジ"
published: 2022-03-30
lang: ja
---

[オプティミズム](https://www.optimism.io/)は[オプティミスティック・ロールアップ](/developers/docs/scaling/optimistic-rollups/)です。
オプティミスティック・ロールアップは、ネットワーク上のすべてのノードではなく、少数のノードのみがトランザクションを処理するため、イーサリアム・メインネット（レイヤー1 (L1) とも呼ばれます）よりもはるかに低価格でトランザクションを処理できます。
同時に、データはすべてL1に書き込まれるため、メインネットの完全性と可用性の保証をすべて備えた状態で、すべてを証明および再構築できます。

オプティミズム（またはその他のL2）でL1の資産を使用するには、資産を[ブリッジ](/bridges/#prerequisites)する必要があります。
これを実現する1つの方法は、ユーザーがL1で資産（ETHと[ERC-20トークン](/developers/docs/standards/tokens/erc-20/)が最も一般的です）をロックし、L2で使用するための同等の資産を受け取ることです。
最終的に、それらを手にした人は、それらをL1にブリッジして戻したいと思うかもしれません。
これを行う際、資産はL2でバーンされ、その後L1でユーザーに返還されます。

これが[オプティミズムの標準ブリッジ](https://docs.optimism.io/app-developers/bridging/standard-bridge)の仕組みです。
この記事では、そのブリッジのソースコードを見て仕組みを確認し、よく書かれたSolidityコードの例として学習します。

## 制御フロー {#control-flows}

ブリッジには2つの主なフローがあります。

- 入金（L1からL2へ）
- 引き出し（L2からL1へ）

### 入金フロー {#deposit-flow}

#### レイヤー1 {#deposit-flow-layer-1}

1. ERC-20を入金する場合、入金者はブリッジに入金される金額を消費するためのアローワンスを与えます。
2. 入金者はL1ブリッジを呼び出します（`depositERC20`、`depositERC20To`、`depositETH`、または`depositETHTo`）。
3. L1ブリッジはブリッジされた資産を所有します。
   - ETH: 資産は呼び出しの一部として入金者によって送金されます。
   - ERC-20: 資産は、入金者によって提供されたアローワンスを使用して、ブリッジ自身によって送金されます。
4. L1ブリッジはクロスドメインメッセージメカニズムを使用して、L2ブリッジの`finalizeDeposit`を呼び出します。

#### レイヤー2 {#deposit-flow-layer-2}

5. L2ブリッジは、`finalizeDeposit`への呼び出しが正当であることを検証します。
   - クロスドメインメッセージコントラクトから来たものであること。
   - 元々はL1のブリッジからのものであること。
6. L2ブリッジは、L2のERC-20トークンコントラクトが正しいものであるかを確認します。
   - L2コントラクトは、そのL1の対応物が、L1でトークンが送られてきたものと同じであると報告します。
   - L2コントラクトは、正しいインターフェースをサポートしていると報告します（[ERC-165を使用](https://eips.ethereum.org/EIPS/eip-165)）。
7. L2コントラクトが正しいものである場合、それを呼び出して適切な数のトークンを適切なアドレスにミントします。そうでない場合は、ユーザーがL1でトークンを請求できるように引き出しプロセスを開始します。

### 引き出しフロー {#withdrawal-flow}

#### レイヤー2 {#withdrawal-flow-layer-2}

1. 引き出し者はL2ブリッジを呼び出します（`withdraw`または`withdrawTo`）。
2. L2ブリッジは、`msg.sender`に属する適切な数のトークンをバーンします。
3. L2ブリッジはクロスドメインメッセージメカニズムを使用して、L1ブリッジの`finalizeETHWithdrawal`または`finalizeERC20Withdrawal`を呼び出します。

#### レイヤー1 {#withdrawal-flow-layer-1}

4. L1ブリッジは、`finalizeETHWithdrawal`または`finalizeERC20Withdrawal`への呼び出しが正当であることを検証します。
   - クロスドメインメッセージメカニズムから来たものであること。
   - 元々はL2のブリッジからのものであること。
5. L1ブリッジは、適切な資産（ETHまたはERC-20）を適切なアドレスに送金します。

## レイヤー1のコード {#layer-1-code}

これはL1、つまりイーサリアム・メインネットで実行されるコードです。

### IL1ERC20Bridge {#il1erc20bridge}

[このインターフェースはここで定義されています](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol)。
これには、ERC-20トークンをブリッジするために必要な関数と定義が含まれています。

```solidity
// SPDX-License-Identifier: MIT
```

[オプティミズムのコードの大部分はMITライセンスの下でリリースされています](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-)。

```solidity
pragma solidity >0.5.0 <0.9.0;
```

執筆時点でのSolidityの最新バージョンは0.8.12です。
バージョン0.9.0がリリースされるまで、このコードがそれと互換性があるかどうかはわかりません。

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * イベント *
     **********/

    event ERC20DepositInitiated(
```

オプティミズムのブリッジの用語では、_入金（deposit）_はL1からL2への送金を意味し、_引き出し（withdrawal）_はL2からL1への送金を意味します。

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

ほとんどの場合、L1上のERC-20のアドレスは、L2上の同等のERC-20のアドレスと同じではありません。
[トークンアドレスのリストはここで確認できます](https://static.optimism.io/optimism.tokenlist.json)。
`chainId`が1のアドレスはL1（メインネット）上にあり、`chainId`が10のアドレスはL2（オプティミズム）上にあります。
他の2つの`chainId`の値は、Kovanテストネットワーク（42）とOptimistic Kovanテストネットワーク（69）のためのものです。

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

送金にメモを追加することが可能であり、その場合、それらは送金を報告するイベントに追加されます。

```solidity
    event ERC20WithdrawalFinalized(
        address indexed _l1Token,
        address indexed _l2Token,
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

同じブリッジコントラクトが双方向の送金を処理します。
L1ブリッジの場合、これは入金の初期化と引き出しの完了を意味します。

```solidity

    /********************
     * パブリック関数 *
     ********************/

    /**
     * @dev 対応するレイヤー2 (L2)ブリッジコントラクトのアドレスを取得します。
     * @return 対応するレイヤー2 (L2)ブリッジコントラクトのアドレス。
     */
    function l2TokenBridge() external returns (address);
```

L2では事前にデプロイされたコントラクトであり、常にアドレス`0x4200000000000000000000000000000000000010`にあるため、この関数は実際には必要ありません。
L1ブリッジのアドレスを知ることは簡単では_ない_ため、L2ブリッジとの対称性のためにここにあります。

```solidity
    /**
     * @dev レイヤー2 (L2)の呼び出し元の残高にERC-20の金額を入金します。
     * @param _l1Token 入金するレイヤー1 (L1)のERC-20のアドレス
     * @param _l2Token レイヤー1 (L1)に対応するレイヤー2 (L2)のERC-20のアドレス
     * @param _amount 入金するERC-20の金額
     * @param _l2Gas レイヤー2 (L2)での入金を完了するために必要なガスリミット。
     * @param _data レイヤー2 (L2)に転送するオプションのデータ。このデータは、
     *        外部コントラクトの利便性のためにのみ提供されます。最大長の強制を除き、
     *        これらのコントラクトはその内容についていかなる保証も提供しません。
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

`_l2Gas`パラメータは、トランザクションが消費を許可されているL2ガスの量です。
[特定の（高い）制限までは無料](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2)であるため、ERC-20コントラクトがミント時に本当に奇妙なことをしない限り、問題にはならないはずです。
この関数は、ユーザーが異なるブロックチェーン上の同じアドレスに資産をブリッジするという一般的なシナリオを処理します。

```solidity
    /**
     * @dev レイヤー2 (L2)の受信者の残高にERC-20の金額を入金します。
     * @param _l1Token 入金するレイヤー1 (L1)のERC-20のアドレス
     * @param _l2Token レイヤー1 (L1)に対応するレイヤー2 (L2)のERC-20のアドレス
     * @param _to 引き出しをクレジットするレイヤー2 (L2)のアドレス。
     * @param _amount 入金するERC-20の金額。
     * @param _l2Gas レイヤー2 (L2)での入金を完了するために必要なガスリミット。
     * @param _data レイヤー2 (L2)に転送するオプションのデータ。このデータは、
     *        外部コントラクトの利便性のためにのみ提供されます。最大長の強制を除き、
     *        これらのコントラクトはその内容についていかなる保証も提供しません。
     */
    function depositERC20To(
        address _l1Token,
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

この関数は`depositERC20`とほぼ同じですが、ERC-20を別のアドレスに送信することができます。

```solidity
    /*************************
     * クロスチェーン関数 *
     *************************/

    /**
     * @dev レイヤー2 (L2)からレイヤー1 (L1)への引き出しを完了し、受信者のレイヤー1 (L1)ERC-20トークンの
     * 残高に資金をクレジットします。
     * レイヤー2 (L2)から初期化された引き出しがファイナライズされていない場合、この呼び出しは失敗します。
     *
     * @param _l1Token finalizeWithdrawalを行うレイヤー1 (L1)トークンのアドレス。
     * @param _l2Token 引き出しが開始されたレイヤー2 (L2)トークンのアドレス。
     * @param _from 送金を開始するレイヤー2 (L2)のアドレス。
     * @param _to 引き出しをクレジットするレイヤー1 (L1)のアドレス。
     * @param _amount 入金するERC-20の金額。
     * @param _data レイヤー2 (L2)の送信者によって提供されるデータ。このデータは、
     *   外部コントラクトの利便性のためにのみ提供されます。最大長の強制を除き、
     *   これらのコントラクトはその内容についていかなる保証も提供しません。
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

オプティミズムでの引き出し（およびL2からL1へのその他のメッセージ）は、2段階のプロセスです。

1. L2での開始トランザクション。
2. L1での完了または請求トランザクション。
   このトランザクションは、L2トランザクションの[フォールトチャレンジ期間](https://community.optimism.io/docs/how-optimism-works/#fault-proofs)が終了した後に発生する必要があります。

### IL1StandardBridge {#il1standardbridge}

[このインターフェースはここで定義されています](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol)。
このファイルには、ETHのイベントと関数の定義が含まれています。
これらの定義は、上記のERC-20用に定義された`IL1ERC20Bridge`と非常によく似ています。

一部のERC-20トークンはカスタム処理を必要とし、標準ブリッジでは処理できないため、ブリッジインターフェースは2つのファイルに分割されています。
これにより、そのようなトークンを処理するカスタムブリッジは`IL1ERC20Bridge`を実装でき、ETHもブリッジする必要がなくなります。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * イベント *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

このイベントは、L1およびL2のトークンアドレスがないことを除いて、ERC-20バージョン（`ERC20DepositInitiated`）とほぼ同じです。
他のイベントや関数についても同様です。

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * パブリック関数 *
     ********************/

    /**
     * @dev レイヤー2 (L2)の呼び出し元の残高にETHの金額を入金します。
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev レイヤー2 (L2)の受信者の残高にETHの金額を入金します。
            .
            .
            .
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable;

    /*************************
     * クロスチェーン関数 *
     *************************/

    /**
     * @dev レイヤー2 (L2)からレイヤー1 (L1)への引き出しを完了し、受信者のレイヤー1 (L1)ETHトークンの
     * 残高に資金をクレジットします。xDomainMessengerのみがこの関数を呼び出すことができるため、
     * 引き出しがファイナライズされる前に呼び出されることはありません。
                .
                .
                .
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

### CrossDomainEnabled {#crossdomainenabled}

[このコントラクト](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol)は、他のレイヤーにメッセージを送信するために、両方のブリッジ（[L1](#the-l1-bridge-contract)および[L2](#l2-bridge-code)）によって継承されます。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* インターフェースのインポート */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[このインターフェース](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol)は、クロスドメインメッセンジャーを使用して他のレイヤーにメッセージを送信する方法をコントラクトに伝えます。
このクロスドメインメッセンジャーはまったく別のシステムであり、それ自体で記事にする価値があるため、将来書きたいと思っています。

```solidity
/**
 * @title CrossDomainEnabled
 * @dev クロスドメイン通信を実行するコントラクトのためのヘルパーコントラクト
 *
 * 使用されるコンパイラ: 継承するコントラクトによって定義されます
 */
contract CrossDomainEnabled {
    /*************
     * 変数 *
     *************/

    // 他のドメインとの間でメッセージを送受信するために使用されるメッセンジャーコントラクト。
    address public messenger;

    /***************
     * コンストラクタ *
     ***************/

    /**
     * @param _messenger 現在のレイヤー上のCrossDomainMessengerのアドレス。
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

コントラクトが知る必要がある1つのパラメータは、このレイヤー上のクロスドメインメッセンジャーのアドレスです。
このパラメータはコンストラクタで一度だけ設定され、変更されることはありません。

```solidity

    /**********************
     * 関数修飾子 *
     **********************/

    /**
     * 修飾された関数が特定のクロスドメインアカウントからのみ呼び出し可能であることを強制します。
     * @param _sourceDomainAccount この関数を呼び出すことが認証されている、送信元ドメイン上の唯一のアカウント。
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

クロスドメインメッセージングは、それが実行されているブロックチェーン（イーサリアム・メインネットまたはオプティミズムのいずれか）上の任意のコントラクトからアクセスできます。
しかし、各側のブリッジは、反対側のブリッジから来た特定のメッセージ_のみ_を信頼する必要があります。

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

適切なクロスドメインメッセンジャー（以下に示すように`messenger`）からのメッセージのみを信頼できます。

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

クロスドメインメッセンジャーが他のレイヤーにメッセージを送信したアドレスを提供する方法は、[`.xDomainMessageSender()`関数](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128)です。
メッセージによって開始されたトランザクションで呼び出される限り、この情報を提供できます。

受信したメッセージが他のブリッジから来たものであることを確認する必要があります。

```solidity

        _;
    }

    /**********************
     * 内部関数 *
     **********************/

    /**
     * 通常はストレージからメッセンジャーを取得します。この関数は、子コントラクトが
     * オーバーライドする必要がある場合に備えて公開されています。
     * @return 使用すべきクロスドメインメッセンジャーコントラクトのアドレス。
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

この関数はクロスドメインメッセンジャーを返します。
変数`messenger`ではなく関数を使用するのは、このコントラクトを継承するコントラクトが、どのクロスドメインメッセンジャーを使用するかを指定するアルゴリズムを使用できるようにするためです。

```solidity

    /**
     * 別のドメインのアカウントにメッセージを送信します
     * @param _crossDomainTarget 宛先ドメイン上の意図された受信者
     * @param _message ターゲットに送信するデータ（通常は`onlyFromCrossDomainAccount()`を持つ関数へのコールデータ）
     * @param _gasLimit ターゲットドメインでのメッセージ受信のためのガスリミット。
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

最後に、他のレイヤーにメッセージを送信する関数です。

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[スリザー](https://github.com/crytic/slither)は、オプティミズムがすべてのコントラクトで実行し、脆弱性やその他の潜在的な問題を探す静的アナライザーです。
この場合、次の行が2つの脆弱性を引き起こします。

1. [リエントランシーイベント](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [良性リエントランシー](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

この場合、スリザーがそれを知る方法がなくても、`getCrossDomainMessenger()`が信頼できるアドレスを返すことがわかっているため、リエントランシーについて心配する必要はありません。

### L1ブリッジコントラクト {#the-l1-bridge-contract}

[このコントラクトのソースコードはここにあります](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol)。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

インターフェースは他のコントラクトの一部になる可能性があるため、幅広いSolidityバージョンをサポートする必要があります。
しかし、ブリッジ自体は私たちのコントラクトであり、どのSolidityバージョンを使用するかについて厳密にすることができます。

```solidity
/* インターフェースのインポート */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#il1erc20bridge)と[IL1StandardBridge](#il1standardbridge)については上記で説明しました。

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[このインターフェース](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol)を使用すると、L2の標準ブリッジを制御するメッセージを作成できます。

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[このインターフェース](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)を使用すると、ERC-20コントラクトを制御できます。
[詳細についてはこちらをご覧ください](/developers/tutorials/erc20-annotated-code/#the-interface)。

```solidity
/* ライブラリのインポート */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[上記で説明したように](#crossdomainenabled)、このコントラクトはレイヤー間メッセージングに使用されます。

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol)には、常に同じアドレスを持つL2コントラクトのアドレスが含まれています。これにはL2の標準ブリッジが含まれます。

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[オープンツェッペリンのAddressユーティリティ](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol)。これは、コントラクトアドレスと外部所有アカウント（EOA）に属するアドレスを区別するために使用されます。

直接の呼び出しとコントラクトのコンストラクタからの呼び出しを区別する方法がないため、これは完璧な解決策ではありませんが、少なくともこれにより、一般的なユーザーエラーを特定して防ぐことができます。

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[ERC-20標準](https://eips.ethereum.org/EIPS/eip-20)は、コントラクトが失敗を報告するための2つの方法をサポートしています。

1. リバート
2. `false`を返す

両方のケースを処理するとコードが複雑になるため、代わりに[オープンツェッペリンの`SafeERC20`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol)を使用します。これにより、[すべての失敗がリバートになる](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96)ことが保証されます。

```solidity
/**
 * @title L1StandardBridge
 * @dev レイヤー1 (L1)のETHおよびERC-20ブリッジは、入金されたレイヤー1 (L1)の資金と、レイヤー2 (L2)で使用されている標準
 * トークンを保存するコントラクトです。対応するレイヤー2 (L2)ブリッジと同期し、入金を通知し、
 * 新たにファイナライズされた引き出しをリッスンします。
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

この行は、`IERC20`インターフェースを使用するたびに`SafeERC20`ラッパーを使用するように指定する方法です。

```solidity

    /********************************
     * 外部コントラクトの参照 *
     ********************************/

    address public l2TokenBridge;
```

[L2StandardBridge](#l2-bridge-code)のアドレス。

```solidity

    // レイヤー1 (L1)トークンをレイヤー2 (L2)トークンにマッピングし、入金されたレイヤー1 (L1)トークンの残高にマッピングします
    mapping(address => mapping(address => uint256)) public deposits;
```

このような二重の[マッピング](https://www.tutorialspoint.com/solidity/solidity_mappings.htm)は、[2次元の疎配列](https://en.wikipedia.org/wiki/Sparse_matrix)を定義する方法です。
このデータ構造内の値は`deposit[L1 token addr][L2 token addr]`として識別されます。
デフォルト値はゼロです。
異なる値に設定されたセルのみがストレージに書き込まれます。

```solidity

    /***************
     * コンストラクタ *
     ***************/

    // このコントラクトはプロキシの背後に存在するため、コンストラクタのパラメータは使用されません。
    constructor() CrossDomainEnabled(address(0)) {}
```

ストレージ内のすべての変数をコピーすることなく、このコントラクトをアップグレードできるようにしたいと考えています。
そのために、[`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy)を使用します。これは、[`delegatecall`](https://solidity-by-example.org/delegatecall/)を使用して、プロキシ・コントラクトによってアドレスが保存されている別のコントラクトに呼び出しを転送するコントラクトです（アップグレード時に、そのアドレスを変更するようにプロキシに指示します）。
`delegatecall`を使用すると、ストレージは_呼び出し元_のコントラクトのストレージのままになるため、すべてのコントラクトの状態変数の値は影響を受けません。

このパターンの1つの効果は、`delegatecall`の_呼び出し先_であるコントラクトのストレージが使用されないため、それに渡されるコンストラクタの値が重要ではないことです。
これが、`CrossDomainEnabled`コンストラクタに無意味な値を提供できる理由です。
また、以下の初期化がコンストラクタから分離されている理由でもあります。

```solidity
    /******************
     * 初期化 *
     ******************/

    /**
     * @param _l1messenger クロスチェーン通信に使用されているレイヤー1 (L1)メッセンジャーのアドレス。
     * @param _l2TokenBridge レイヤー2 (L2)標準ブリッジのアドレス。
     */
    // slither-disable-next-line external-function
```

この[スリザーテスト](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external)は、コントラクトコードから呼び出されないため、`public`の代わりに`external`として宣言できる関数を特定します。
`external`関数のガスコストは低くなる可能性があります。なぜなら、コールデータでパラメータを提供できるからです。
`public`として宣言された関数は、コントラクト内からアクセス可能でなければなりません。
コントラクトは自身のコールデータを変更できないため、パラメータはメモリ内にある必要があります。
そのような関数が外部から呼び出される場合、コールデータをメモリにコピーする必要があり、これにはガスがかかります。
この場合、関数は一度しか呼び出されないため、非効率性は問題になりません。

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

`initialize`関数は一度だけ呼び出されるべきです。
L1クロスドメインメッセンジャーまたはL2トークンブリッジのいずれかのアドレスが変更された場合、新しいプロキシとそれを呼び出す新しいブリッジを作成します。
これは、システム全体がアップグレードされる場合を除いて起こりそうになく、非常にまれな出来事です。

この関数には、_誰が_それを呼び出すことができるかを制限するメカニズムがないことに注意してください。
これは、理論的には、攻撃者がプロキシとブリッジの最初のバージョンをデプロイするまで待ち、その後[フロントランニング](https://solidity-by-example.org/hacks/front-running/)を行って、正当なユーザーよりも先に`initialize`関数に到達できることを意味します。しかし、これを防ぐための2つの方法があります。

1. コントラクトがEOAによって直接デプロイされるのではなく、[別のコントラクトにそれらを作成させるトランザクションで](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595)デプロイされる場合、プロセス全体をアトミックにすることができ、他のトランザクションが実行される前に完了します。
2. `initialize`への正当な呼び出しが失敗した場合、新しく作成されたプロキシとブリッジを無視して新しいものを作成することが常に可能です。

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

これらは、ブリッジが知る必要がある2つのパラメータです。

```solidity

    /**************
     * 入金 *
     **************/

    /** @dev 送信者がEOAであることをリクワイアする修飾子。このチェックは、悪意のある
     *  コントラクトによってinitcode経由でバイパスされる可能性がありますが、回避したいユーザーエラーに対処します。
     */
    modifier onlyEOA() {
        // コントラクトからの入金を停止するために使用されます（誤ってトークンを失うのを防ぐため）
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

これが、オープンツェッペリンの`Address`ユーティリティが必要だった理由です。

```solidity
    /**
     * @dev この関数はデータなしで呼び出すことができ、
     * レイヤー2 (L2)の呼び出し元の残高にETHの金額を入金します。
     * receive関数はデータを受け取らないため、保守的な
     * デフォルトの金額がレイヤー2 (L2)に転送されます。
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

この関数はテスト目的で存在します。
インターフェース定義には表示されていないことに注意してください。これは通常の使用を目的としていません。

```solidity
    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable {
        _initiateETHDeposit(msg.sender, _to, _l2Gas, _data);
    }
```

これら2つの関数は、実際のETH入金を処理する関数である`_initiateETHDeposit`のラッパーです。

```solidity
    /**
     * @dev ETHを保存し、レイヤー2 (L2)のETHゲートウェイに入金を通知することで、入金のロジックを実行します。
     * @param _from レイヤー1 (L1)で入金を引き出すアカウント。
     * @param _to レイヤー2 (L2)で入金を与えるアカウント。
     * @param _l2Gas レイヤー2 (L2)での入金を完了するために必要なガスリミット。
     * @param _data レイヤー2 (L2)に転送するオプションのデータ。このデータは、
     *        外部コントラクトの利便性のためにのみ提供されます。最大長の強制を除き、
     *        これらのコントラクトはその内容についていかなる保証も提供しません。
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // finalizeDeposit呼び出しのためのコールデータを構築します
        bytes memory message = abi.encodeWithSelector(
```

クロスドメインメッセージの仕組みは、宛先コントラクトがメッセージをコールデータとして呼び出されるというものです。
Solidityコントラクトは常に、[ABI仕様](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html)に従ってコールデータを解釈します。
Solidity関数の[`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions)は、そのコールデータを作成します。

```solidity
            IL2ERC20Bridge.finalizeDeposit.selector,
            address(0),
            Lib_PredeployAddresses.OVM_ETH,
            _from,
            _to,
            msg.value,
            _data
        );
```

ここでのメッセージは、以下のパラメータを使用して[`finalizeDeposit`関数](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148)を呼び出すことです。

| パラメータ | 値                          | 意味                                                                                                                                      |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                     | L1上のETH（ERC-20トークンではない）を表す特別な値                                                                           |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | オプティミズム上でETHを管理するL2コントラクト、`0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000`（このコントラクトはオプティミズムの内部使用専用です） |
| \_from    | \_from                         | ETHを送信するL1上のアドレス                                                                                                         |
| \_to      | \_to                           | ETHを受信するL2上のアドレス                                                                                                      |
| amount    | msg.value                      | 送信されたWeiの量（すでにブリッジに送信されています）                                                                               |
| \_data    | \_data                         | 入金に添付する追加データ                                                                                                     |

```solidity
        // レイヤー2 (L2)にコールデータを送信します
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

クロスドメインメッセンジャーを通じてメッセージを送信します。

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

イベントを発行して、この送金をリッスンしている分散型アプリケーション (dapp) に通知します。

```solidity
    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20(
		.
		.
		.
    ) external virtual onlyEOA {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, msg.sender, _amount, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20To(
		.
		.
		.
    ) external virtual {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, _to, _amount, _l2Gas, _data);
    }
```

これら2つの関数は、実際のERC-20入金を処理する関数である`_initiateERC20Deposit`のラッパーです。

```solidity
    /**
     * @dev レイヤー2 (L2)のDeposited Tokenコントラクトに入金を通知し、
     * レイヤー1 (L1)の資金をロックするハンドラー（例：transferFrom）を呼び出すことで、入金のロジックを実行します。
     *
     * @param _l1Token 入金するレイヤー1 (L1)のERC-20のアドレス
     * @param _l2Token レイヤー1 (L1)に対応するレイヤー2 (L2)のERC-20のアドレス
     * @param _from レイヤー1 (L1)で入金を引き出すアカウント
     * @param _to レイヤー2 (L2)で入金を与えるアカウント
     * @param _amount 入金するERC-20の金額。
     * @param _l2Gas レイヤー2 (L2)での入金を完了するために必要なガスリミット。
     * @param _data レイヤー2 (L2)に転送するオプションのデータ。このデータは、
     *        外部コントラクトの利便性のためにのみ提供されます。最大長の強制を除き、
     *        これらのコントラクトはその内容についていかなる保証も提供しません。
     */
    function _initiateERC20Deposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) internal {
```

この関数は上記の`_initiateETHDeposit`に似ていますが、いくつかの重要な違いがあります。
最初の違いは、この関数がトークンアドレスと送金する量をパラメータとして受け取ることです。
ETHの場合、ブリッジへの呼び出しにはすでにブリッジアカウントへの資産の送金が含まれています（`msg.value`）。

```solidity
        // レイヤー1 (L1)で入金が開始されると、レイヤー1 (L1)ブリッジは将来の
        // 引き出しのために資金を自身に送金します。safeTransferFromはコントラクトにコードがあるかどうかもチェックするため、
        // _fromがEOAまたはアドレス(0)の場合は失敗します。
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

ERC-20トークンの送金は、ETHとは異なるプロセスに従います。

1. ユーザー（`_from`）は、適切なトークンを送金するためのアローワンスをブリッジに与えます。
2. ユーザーは、トークンコントラクトのアドレス、量などを指定してブリッジを呼び出します。
3. ブリッジは、入金プロセスの一部としてトークンを（自身に）送金します。

最初のステップは、最後の2つとは別のトランザクションで発生する場合があります。
ただし、`_initiateERC20Deposit`を呼び出す2つの関数（`depositERC20`と`depositERC20To`）は、`_from`パラメータとして`msg.sender`を使用してのみこの関数を呼び出すため、フロントランニングは問題になりません。

```solidity
        // _l2Token.finalizeDeposit(_to, _amount)のためのコールデータを構築します
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // レイヤー2 (L2)にコールデータを送信します
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

入金されたトークンの量を`deposits`データ構造に追加します。
同じL1 ERC-20トークンに対応するL2上のアドレスが複数存在する可能性があるため、入金を追跡するためにL1 ERC-20トークンのブリッジの残高を使用するだけでは不十分です。

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * クロスチェーン関数 *
     *************************/

    /**
     * @inheritdoc IL1StandardBridge
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

L2ブリッジはL2クロスドメインメッセンジャーにメッセージを送信し、それによりL1クロスドメインメッセンジャーがこの関数を呼び出します（もちろん、[メッセージを完了するトランザクション](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions)がL1で送信された後です）。

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

これがクロスドメインメッセンジャーから来ており、L2トークンブリッジを送信元とする_正当な_メッセージであることを確認します。
この関数はブリッジからETHを引き出すために使用されるため、承認された呼び出し元によってのみ呼び出されることを確認する必要があります。

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

ETHを送金する方法は、`msg.value`にWeiの量を指定して受信者を呼び出すことです。

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

引き出しに関するイベントを発行します。

```solidity
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

この関数は上記の`finalizeETHWithdrawal`に似ていますが、ERC-20トークンに必要な変更が加えられています。

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

`deposits`データ構造を更新します。

```solidity

        // レイヤー1 (L1)で引き出しがファイナライズされると、レイヤー1 (L1)ブリッジは引き出し者に資金を送金します
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * 一時的 - ETHの移行 *
     *****************************/

    /**
     * @dev アカウントにETH残高を追加します。これは、古いゲートウェイから新しいゲートウェイへ
     * ETHを移行できるようにすることを目的としています。
     * 注: 古いコントラクトから移行されたETHを受け取ることができるように、これは1回のアップグレードのためだけに残されています
     */
    function donateETH() external payable {}
}
```

ブリッジの以前の実装がありました。
その実装からこの実装に移行したとき、すべての資産を移動する必要がありました。
ERC-20トークンは単に移動させることができます。
しかし、コントラクトにETHを送金するには、そのコントラクトの承認が必要であり、それが`donateETH`が提供するものです。

## L2上のERC-20トークン {#erc-20-tokens-on-l2}

ERC-20トークンが標準ブリッジに適合するためには、標準ブリッジに、そして標準ブリッジに_のみ_、トークンをミントすることを許可する必要があります。
これは、オプティミズム上で流通しているトークンの数が、L1ブリッジコントラクト内にロックされているトークンの数と等しいことをブリッジが保証する必要があるため必要です。
L2にトークンが多すぎる場合、一部のユーザーは資産をL1にブリッジして戻すことができなくなります。
信頼できるブリッジの代わりに、本質的に[部分準備銀行制度](https://www.investopedia.com/terms/f/fractionalreservebanking.asp)を再現することになります。
L1にトークンが多すぎる場合、L2トークンをバーンせずにそれらを解放する方法がないため、それらのトークンの一部は永遠にブリッジコントラクト内にロックされたままになります。

### IL2StandardERC20 {#il2standarderc20}

標準ブリッジを使用するL2上のすべてのERC-20トークンは、標準ブリッジが必要とする関数とイベントを持つ[このインターフェース](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol)を提供する必要があります。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[標準のERC-20インターフェース](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)には、`mint`および`burn`関数は含まれていません。
これらのメソッドは[ERC-20標準](https://eips.ethereum.org/EIPS/eip-20)では要求されておらず、トークンを作成および破棄するメカニズムは指定されていません。

```solidity
import { IERC-165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[ERC-165インターフェース](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol)は、コントラクトが提供する関数を指定するために使用されます。
[標準はこちらで読むことができます](https://eips.ethereum.org/EIPS/eip-165)。

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

この関数は、このコントラクトにブリッジされているL1トークンのアドレスを提供します。
逆方向の同様の関数はないことに注意してください。
実装時にL2サポートが計画されていたかどうかに関係なく、任意のL1トークンをブリッジできるようにする必要があります。

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

トークンをミント（作成）およびバーン（破棄）するための関数とイベント。
トークンの数が正しい（L1でロックされているトークンの数と等しい）ことを保証するために、ブリッジがこれらの関数を実行できる唯一のエンティティであるべきです。

### L2StandardERC20 {#l2standarderc20}

[これは`IL2StandardERC20`インターフェースの私たちの実装です](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol)。
何らかのカスタムロジックが必要ない限り、これを使用する必要があります。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[オープンツェッペリンのERC-20コントラクト](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)。
オプティミズムは車輪の再発明を信じていません。特に、その車輪が十分に監査されており、資産を保持するのに十分な信頼性が必要な場合はなおさらです。

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

これらは、私たちが必要とし、ERC-20が通常は必要としない2つの追加の構成パラメータです。

```solidity

    /**
     * @param _l2Bridge レイヤー2 (L2)標準ブリッジのアドレス。
     * @param _l1Token 対応するレイヤー1 (L1)トークンのアドレス。
     * @param _name ERC-20の名前。
     * @param _symbol ERC-20のシンボル。
     */
    constructor(
        address _l2Bridge,
        address _l1Token,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        l1Token = _l1Token;
        l2Bridge = _l2Bridge;
    }
```

最初に継承元のコントラクト（`ERC20(_name, _symbol)`）のコンストラクタを呼び出し、次に独自の変数を設定します。

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Only L2 Bridge can mint and burn");
        _;
    }


    // slither-disable-next-line external-function
    function supportsInterface(bytes4 _interfaceId) public pure returns (bool) {
        bytes4 firstSupportedInterface = bytes4(keccak256("supportsInterface(bytes4)")); // ERC165
        bytes4 secondSupportedInterface = IL2StandardERC20.l1Token.selector ^
            IL2StandardERC20.mint.selector ^
            IL2StandardERC20.burn.selector;
        return _interfaceId == firstSupportedInterface || _interfaceId == secondSupportedInterface;
    }
```

これが[ERC-165](https://eips.ethereum.org/EIPS/eip-165)の仕組みです。
すべてのインターフェースはサポートされている関数の数であり、それらの関数の[ABI関数セレクタ](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector)の[排他的論理和](https://en.wikipedia.org/wiki/Exclusive_or)として識別されます。

L2ブリッジは、資産を送信するERC-20コントラクトが`IL2StandardERC20`であることを確認するための健全性チェックとしてERC-165を使用します。

**注:** 悪意のあるコントラクトが`supportsInterface`に誤った回答を提供するのを防ぐものは何もないため、これは健全性チェックのメカニズムであり、セキュリティメカニズムでは_ありません_。

```solidity
    // slither-disable-next-line external-function
    function mint(address _to, uint256 _amount) public virtual onlyL2Bridge {
        _mint(_to, _amount);

        emit Mint(_to, _amount);
    }

    // slither-disable-next-line external-function
    function burn(address _from, uint256 _amount) public virtual onlyL2Bridge {
        _burn(_from, _amount);

        emit Burn(_from, _amount);
    }
}
```

L2ブリッジのみが資産をミントおよびバーンすることを許可されています。

`_mint`と`_burn`は、実際には[オープンツェッペリンのERC-20コントラクト](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn)で定義されています。
トークンをミントおよびバーンする条件は、ERC-20の使用方法の数と同じくらい多様であるため、そのコントラクトはそれらを外部に公開していないだけです。

## L2ブリッジコード {#l2-bridge-code}

これはオプティミズム上でブリッジを実行するコードです。
[このコントラクトのソースはここにあります](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol)。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* インターフェースのインポート */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

[IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol)インターフェースは、上記で見た[L1の同等物](#il1erc20bridge)と非常によく似ています。
2つの重要な違いがあります。

1. L1では、入金を開始し、引き出しを完了します。
   ここでは、引き出しを開始し、入金を完了します。
2. L1では、ETHとERC-20トークンを区別する必要があります。
   L2では、オプティミズム上のETH残高は内部的にアドレス[0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000)のERC-20トークンとして処理されるため、両方に同じ関数を使用できます。

```solidity
/* ライブラリのインポート */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* コントラクトのインポート */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev レイヤー2 (L2)標準ブリッジは、レイヤー1 (L1)標準ブリッジと連携して機能し、
 * レイヤー1 (L1)とレイヤー2 (L2)間のETHおよびERC-20の移行を可能にするコントラクトです。
 * このコントラクトは、レイヤー1 (L1)標準ブリッジへの入金を検知した際に、新しいトークンのミンターとして機能します。
 * また、このコントラクトは引き出しを意図したトークンのバーナーとしても機能し、レイヤー1 (L1)
 * ブリッジにレイヤー1 (L1)の資金を解放するように通知します。
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * 外部コントラクトの参照 *
     ********************************/

    address public l1TokenBridge;
```

L1ブリッジのアドレスを追跡します。
L1の同等物とは対照的に、ここではこの変数が_必要_であることに注意してください。
L1ブリッジのアドレスは事前にはわかりません。

```solidity

    /***************
     * コンストラクタ *
     ***************/

    /**
     * @param _l2CrossDomainMessenger このコントラクトで使用されるクロスドメインメッセンジャー。
     * @param _l1TokenBridge メインチェーンにデプロイされたレイヤー1 (L1)ブリッジのアドレス。
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * 引き出し *
     ***************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdraw(
        address _l2Token,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, msg.sender, _amount, _l1Gas, _data);
    }

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdrawTo(
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, _to, _amount, _l1Gas, _data);
    }
```

これら2つの関数は引き出しを開始します。
L1トークンアドレスを指定する必要はないことに注意してください。
L2トークンは、L1の同等物のアドレスを教えてくれることが期待されています。

```solidity

    /**
     * @dev トークンをバーンし、レイヤー1 (L1)トークンゲートウェイに引き出しを通知することで、
     *      引き出しのロジックを実行します。
     * @param _l2Token 引き出しが開始されるレイヤー2 (L2)トークンのアドレス。
     * @param _from レイヤー2 (L2)で引き出しを引き出すアカウント。
     * @param _to レイヤー1 (L1)で引き出しを与えるアカウント。
     * @param _amount 引き出すトークンの金額。
     * @param _l1Gas 未使用ですが、将来の互換性を考慮して含まれています。
     * @param _data レイヤー1 (L1)に転送するオプションのデータ。このデータは、
     *        外部コントラクトの利便性のためにのみ提供されます。最大長の強制を除き、
     *        これらのコントラクトはその内容についていかなる保証も提供しません。
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // 引き出しが開始されると、引き出し者の資金をバーンし、その後のレイヤー2 (L2)での
        // 使用を防ぎます
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

`_from`パラメータに依存しているの_ではなく_、偽造がはるかに困難な（私の知る限り不可能な）`msg.sender`に依存していることに注意してください。

```solidity

        // l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)のためのコールデータを構築します
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

L1では、ETHとERC-20を区別する必要があります。

```solidity
            message = abi.encodeWithSelector(
                IL1StandardBridge.finalizeETHWithdrawal.selector,
                _from,
                _to,
                _amount,
                _data
            );
        } else {
            message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                l1Token,
                _l2Token,
                _from,
                _to,
                _amount,
                _data
            );
        }

        // レイヤー1 (L1)ブリッジにメッセージを送信します
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * クロスチェーン関数: 入金 *
     ************************************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function finalizeDeposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

この関数は`L1StandardBridge`によって呼び出されます。

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

メッセージの送信元が正当であることを確認します。
この関数は`_mint`を呼び出し、ブリッジがL1で所有するトークンでカバーされていないトークンを与えるために使用される可能性があるため、これは重要です。

```solidity
        // ターゲットトークンが準拠しているかチェックし、
        // レイヤー1 (L1)で入金されたトークンが、ここでのレイヤー2 (L2)の入金されたトークンの表現と一致するか検証します
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

健全性チェック：

1. 正しいインターフェースがサポートされていること
2. L2 ERC-20コントラクトのL1アドレスが、トークンのL1送信元と一致すること

```solidity
        ) {
            // 入金がファイナライズされると、レイヤー2 (L2)のアカウントに同額の
            // トークンをクレジットします。
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

健全性チェックに合格した場合、入金を完了します。

1. トークンをミントする
2. 適切なイベントを発行する

```solidity
        } else {
            // 入金先のレイヤー2 (L2)トークンが、そのレイヤー1 (L1)トークンの正しいアドレスについて
            // 一致しないか、正しいインターフェースをサポートしていません。
            // これは、悪意のあるレイヤー2 (L2)トークンが存在する場合、またはユーザーが何らかの方法で
            // 入金先として誤ったレイヤー2 (L2)トークンのアドレスを指定した場合にのみ発生するはずです。
            // いずれの場合も、ここでプロセスを停止し、引き出し
            // メッセージを構築して、ユーザーが場合によっては資金を引き出せるようにします。
            // 悪意のあるトークンコントラクトを完全に防ぐ方法はありませんが、これにより
            // ユーザーエラーを制限し、悪意のあるコントラクトの動作の一部を軽減します。
```

ユーザーが間違ったL2トークンアドレスを使用するという検出可能なエラーを犯した場合、入金をキャンセルしてL1でトークンを返還したいと考えます。
L2からこれを行う唯一の方法は、フォールトチャレンジ期間を待たなければならないメッセージを送信することですが、これはユーザーがトークンを永久に失うよりもはるかに優れています。

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // 入金を送信者にバウンスバックするために、ここで_toと_fromを切り替えました
                _from,
                _amount,
                _data
            );

            // レイヤー1 (L1)ブリッジにメッセージを送信します
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## 結論 {#conclusion}

標準ブリッジは、資産の送金において最も柔軟なメカニズムです。
しかし、非常に汎用的であるため、常に最も使いやすいメカニズムであるとは限りません。
特に引き出しの場合、ほとんどのユーザーは、チャレンジ期間を待たず、引き出しを完了するためにマークル証明を必要としない[サードパーティのブリッジ](https://optimism.io/apps#bridge)を使用することを好みます。

これらのブリッジは通常、L1に資産を持ち、少額の手数料（多くの場合、標準ブリッジの引き出しのガスコストよりも安い）ですぐに提供することで機能します。
ブリッジ（またはそれを運営する人々）がL1の資産が不足すると予想した場合、L2から十分な資産を送金します。これらは非常に大きな引き出しであるため、引き出しコストは大量の資産に分散され、はるかに小さな割合になります。

この記事が、レイヤー2の仕組みや、明確で安全なSolidityコードの書き方について理解を深めるのに役立つことを願っています。

[私の他の作品についてはこちらをご覧ください](https://cryptodocguy.pro/)。