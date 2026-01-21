---
title: "Optimism標準ブリッジコントラクトのウォークスルー"
description: "Optimismの標準ブリッジはどのように機能するのでしょうか？ なぜこのように機能するのでしょうか？"
author: Ori Pomerantz
tags: [ "Solidity", "ブリッジ", "レイヤー2" ]
skill: intermediate
published: 2022-03-30
lang: ja
---

[Optimism](https://www.optimism.io/)は[オプティミスティック・ロールアップ](/developers/docs/scaling/optimistic-rollups/)です。
オプティミスティック・ロールアップは、ネットワーク上のすべてのノードではなく一部のノードのみでトランザクションが処理されるため、イーサリアムメインネット(レイヤー1またはL1とも呼ばれる)よりもはるかに低い価格でトランザクションを処理できます。
同時に、すべてのデータがL1に書き込まれるため、メインネットの完全性と可用性の保証の元で、すべてを証明、再構築することが可能です。

Optimism（またはその他のL2）でL1アセットを使用するには、アセットを[ブリッジ](/bridges/#prerequisites)する必要があります。
これを実現する一つの方法は、ユーザーがL1でアセット(最も一般的なのはETHと[ERC-20トークン](/developers/docs/standards/tokens/erc-20/)です)をロックし、L2で使用する同等のアセットを受け取ることです。
最終的に、それらのアセットを手にした人は、L1にブリッジして戻したいと思うかもしれません。
このとき、L2のアセットはバーンされ、L1でユーザーに返還されます。

これが、[Optimism標準ブリッジ](https://docs.optimism.io/app-developers/bridging/standard-bridge)の仕組みです。
この記事では、そのブリッジのソースコードをレビューし、その仕組みを確認し、適切に記述されたSolidityコードの例として学習します。

## 制御フロー {#control-flows}

ブリッジには、2つの主要なフローがあります:

- デポジット (L1からL2へ)
- 引き出し (L2からL1へ)

### デポジットフロー {#deposit-flow}

#### レイヤー1 {#deposit-flow-layer-1}

1. ERC-20をデポジットする場合、デポジットする人は、デポジットされる金額を使用する権限をブリッジに与えます。
2. デポジットする人はL1ブリッジを呼び出します(`depositERC20`、`depositERC20To`、`depositETH`、または`depositETHTo`)
3. L1ブリッジは、ブリッジされた資産の所有権を取得します。
   - ETH: アセットは呼び出しの一部として、デポジットする人によって転送されます。
   - ERC-20: アセットは、デポジットする人から提供された権限を使用して、ブリッジによってそれ自体に転送されます。
4. L1ブリッジは、クロスドメインメッセージメカニズムを使用して、L2ブリッジの`finalizeDeposit`を呼び出します。

#### レイヤー2 {#deposit-flow-layer-2}

5. L2ブリッジは`finalizeDeposit`への呼び出しが正当なものであることを検証します:
   - クロスドメインメッセージコントラクトからの呼び出しであること
   - もともとL1のブリッジからの呼び出しであること
6. L2ブリッジは、L2上のERC-20トークンコントラクトが正しいものであるかを確認します:
   - L2コントラクトは、そのL1の対応物がL1から来たトークンと同じものであることを報告します。
   - L2コントラクトは正しいインターフェースをサポートしていることを報告します([ERC-165を使用](https://eips.ethereum.org/EIPS/eip-165))。
7. L2コントラクトが正しい場合、それを呼び出して適切な数のトークンを適切なアドレスにミントします。 そうでない場合、ユーザーがL1でトークンを要求できるように、引き出しプロセスを開始します。

### 引き出しフロー {#withdrawal-flow}

#### レイヤー2 {#withdrawal-flow-layer-2}

1. 引き出す人はL2ブリッジを呼び出します(`withdraw`または`withdrawTo`)
2. L2ブリッジは、`msg.sender`に属する適切な数のトークンをバーンします。
3. L2ブリッジは、クロスドメインメッセージメカニズムを使用して、L1ブリッジで`finalizeETHWithdrawal`または`finalizeERC20Withdrawal`を呼び出します。

#### レイヤー1 {#withdrawal-flow-layer-1}

4. L1ブリッジは、`finalizeETHWithdrawal`または`finalizeERC20Withdrawal`への呼び出しが正当であることを検証します:
   - クロスドメインメッセージメカニズムからの呼び出しであること
   - もともとL2のブリッジからの呼び出しであること
5. L1ブリッジは、適切な資産(ETHまたはERC-20)を適切なアドレスに転送します。

## レイヤー1コード {#layer-1-code}

これは、L1であるイーサリアムメインネットで実行されるコードです。

### IL1ERC20Bridge {#IL1ERC20Bridge}

[このインターフェースはここで定義されています](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol)。
これには、ERC-20トークンのブリッジングに必要な関数と定義が含まれています。

```solidity
// SPDX-License-Identifier: MIT
```

[OptimismのコードのほとんどはMITライセンスの下でリリースされています](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-)。

```solidity
pragma solidity >0.5.0 <0.9.0;
```

執筆時点で、Solidityの最新バージョンは0.8.12です。
バージョン0.9.0がリリースされるまで、このコードに互換性があるかどうかはわかりません。

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

Optimismのブリッジ用語では、「デポジット」はL1からL2への転送を意味し、「引き出し」はL2からL1への転送を意味します。

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

ほとんどの場合、L1上のERC-20のアドレスは、L2上の同等のERC-20のアドレスとは異なります。
[トークンアドレスのリストはこちらで確認できます](https://static.optimism.io/optimism.tokenlist.json)。
`chainId`が1のアドレスはL1 (メインネット) 上にあり、`chainId`が10のアドレスはL2 (Optimism) 上にあります。
他の2つの`chainId`の値は、Kovanテストネットワーク(42)とOptimistic Kovanテストネットワーク(69)のものです。

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

転送にメモを追加することが可能で、その場合、それらを報告するイベントに追加されます。

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

同じブリッジコントラクトが、両方向の転送を処理します。
L1ブリッジの場合、これはデポジットの開始と引き出しの完了を意味します。

```solidity

    /********************
     * 公開関数 *
     ********************/

    /**
     * @dev 対応するL2ブリッジコントラクトのアドレスを取得します。
     * @return 対応するL2ブリッジコントラクトのアドレス。
     */
    function l2TokenBridge() external returns (address);
```

この関数は、L2では事前にデプロイされたコントラクトであるため、実際には必要ありません。したがって、常にアドレス`0x4200000000000000000000000000000000000010`にあります。
これはL2ブリッジとの対称性のためにあります。なぜなら、L1ブリッジのアドレスは簡単にはわからないからです。

```solidity
    /**
     * @dev L2の呼び出し元残高にERC20の金額をデポジットします。
     * @param _l1Token デポジットするL1 ERC20のアドレス
     * @param _l2Token L1の各L2 ERC20のアドレス
     * @param _amount デポジットするERC20の金額
     * @param _l2Gas L2でデポジットを完了するために必要なガスリミット。
     * @param _data L2に転送するオプションのデータ。このデータは、外部コントラクトの便宜のためにのみ提供されます。
     *        最大長を強制する以外、これらのコントラクトはその内容について何の保証も提供しません。
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

`_l2Gas`パラメータは、トランザクションが使用できるL2ガスの量です。
[一定の(高い)制限まで、これは無料です](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2)。そのため、ミント時にERC-20コントラクトが本当に奇妙なことをしない限り、問題にはならないはずです。
この関数は、ユーザーが異なるブロックチェーン上の同じアドレスに資産をブリッジするという、一般的なシナリオに対応します。

```solidity
    /**
     * @dev L2の受取人の残高にERC20の金額をデポジットします。
     * @param _l1Token デポジットするL1 ERC20のアドレス
     * @param _l2Token L1の各L2 ERC20のアドレス
     * @param _to 引き出しの入金先L2アドレス。
     * @param _amount デポジットするERC20の金額。
     * @param _l2Gas L2でデポジットを完了するために必要なガスリミット。
     * @param _data L2に転送するオプションのデータ。このデータは、外部コントラクトの便宜のためにのみ提供されます。
     *        最大長を強制する以外、これらのコントラクトはその内容について何の保証も提供しません。
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

この関数は`depositERC20`とほぼ同じですが、ERC-20を異なるアドレスに送信できます。

```solidity
    /*************************
     * クロスチェーン関数 *
     *************************/

    /**
     * @dev L2からL1への引き出しを完了し、受取人のL1 ERC20トークン残高に資金を入金します。
     * この呼び出しは、L2からの初期化された引き出しが完了していない場合、失敗します。
     *
     * @param _l1Token finalizeWithdrawalの対象となるL1トークンのアドレス。
     * @param _l2Token 引き出しが開始されたL2トークンのアドレス。
     * @param _from 転送を開始するL2アドレス。
     * @param _to 引き出しの入金先L1アドレス。
     * @param _amount デポジットするERC20の金額。
     * @param _data L2の送信者から提供されたデータ。このデータは、外部コントラクトの便宜のためにのみ提供されます。
     *   最大長を強制する以外、これらのコントラクトはその内容について何の保証も提供しません。
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

Optimismでの引き出し(およびL2からL1への他のメッセージ)は、2段階のプロセスです:

1. L2での開始トランザクション。
2. L1での完了または請求トランザクション。
   このトランザクションは、L2トランザクションの[フォールトチャレンジ期間](https://community.optimism.io/docs/how-optimism-works/#fault-proofs)が終了した後に実行される必要があります。

### IL1StandardBridge {#il1standardbridge}

[このインターフェースはここで定義されています](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol)。
このファイルには、ETHのイベントと関数の定義が含まれています。
これらの定義は、上記の`IL1ERC20Bridge`で定義されたERC-20のものと非常によく似ています。

ブリッジインターフェースは2つのファイルに分かれています。なぜなら、一部のERC-20トークンはカスタム処理が必要で、標準ブリッジでは処理できないからです。
これにより、そのようなトークンを処理するカスタムブリッジは、`IL1ERC20Bridge`を実装でき、ETHもブリッジする必要がありません。

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

このイベントは、ERC-20バージョン(`ERC20DepositInitiated`)とほぼ同じですが、L1とL2のトークンアドレスがない点が異なります。
他のイベントや関数についても同様です。

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * 公開関数 *
     ********************/

    /**
     * @dev L2の呼び出し元残高にETHの金額をデポジットします。
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev L2の受取人の残高にETHの金額をデポジットします。
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
     * @dev L2からL1への引き出しを完了し、受取人のL1 ETHトークン残高に資金を入金します。
     * この関数はxDomainMessengerのみが呼び出せるため、引き出しが完了する前に呼び出されることはありません。
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

[このコントラクト](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol)は、両方のブリッジ([L1](#the-l1-bridge-contract)と[L2](#the-l2-bridge-contract))によって継承され、他のレイヤーにメッセージを送信します。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Interface Imports */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[このインターフェース](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol)は、クロスドメインメッセンジャーを使用して、他のレイヤーにメッセージを送信する方法をコントラクトに伝えます。
このクロスドメインメッセンジャーはまったく別のシステムであり、それ自体で記事にする価値があるため、将来的に書きたいと思っています。

```solidity
/**
 * @title CrossDomainEnabled
 * @dev クロスドメイン通信を実行するコントラクトのヘルパーコントラクト
 *
 * 使用されるコンパイラ: 継承するコントラクトによって定義
 */
contract CrossDomainEnabled {
    /*************
     * 変数 *
     *************/

    // 他のドメインからメッセージを送受信するために使用されるメッセンジャーコントラクト
    address public messenger;

    /***************
     * コンストラクタ *
     ***************/

    /**
     * @param _messenger 現在のレイヤー上のCrossDomainMessengerのアドレス
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

コントラクトが知る必要がある唯一のパラメータは、このレイヤー上のクロスドメインメッセンジャーのアドレスです。
このパラメータはコンストラクタで一度設定され、変更されることはありません。

```solidity

    /**********************
     * 関数修飾子 *
     **********************/

    /**
     * 変更された関数が特定のクロスドメインアカウントによってのみ呼び出し可能であることを強制します。
     * @param _sourceDomainAccount この関数を呼び出すことが認証されている、発信元ドメインの唯一のアカウント。
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

クロスドメインメッセージングは、実行されているブロックチェーン(イーサリアムメインネットまたはOptimism)上のどのコントラクトからもアクセスできます。
しかし、各側のブリッジが、他の側のブリッジから来た場合にのみ特定のメッセージを信頼するようにする必要があります。

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

適切なクロスドメインメッセンジャー(以下で見るように`messenger`)からのメッセージのみが信頼できます。

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

クロスドメインメッセンジャーが、他のレイヤーでメッセージを送信したアドレスを提供する方法は、[`.xDomainMessageSender()`関数](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128)です。
メッセージによって開始されたトランザクションで呼び出される限り、この情報を提供できます。

受け取ったメッセージが他のブリッジから来たことを確認する必要があります。

```solidity

        _;
    }

    /**********************
     * 内部関数 *
     **********************/

    /**
     * 通常はストレージからメッセンジャーを取得します。この関数は、子コントラクトがオーバーライドする必要がある場合に公開されます。
     * @return 使用すべきクロスドメインメッセンジャーコントラクトのアドレス。
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

この関数は、クロスドメインメッセンジャーを返します。
変数`messenger`ではなく関数を使用するのは、これから継承するコントラクトが、どのクロスドメインメッセンジャーを使用するかを指定するアルゴリズムを使用できるようにするためです。

```solidity

    /**
     * 他のドメインのアカウントにメッセージを送信します。
     * @param _crossDomainTarget 宛先ドメインの意図した受信者
     * @param _message ターゲットに送信するデータ(通常は`onlyFromCrossDomainAccount()`を持つ関数へのcalldata)
     * @param _gasLimit ターゲットドメインでのメッセージのレシートのgasLimit。
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

[Slither](https://github.com/crytic/slither)は、Optimismがすべてのコントラクトで実行し、脆弱性やその他の潜在的な問題を検出するための静的アナライザーです。
この場合、次の行は2つの脆弱性を引き起こします:

1. [再入可能性イベント](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [良性の再入可能性](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

この場合、`getCrossDomainMessenger()`が信頼できるアドレスを返すことがわかっているため、再入可能性について心配する必要はありません。たとえSlitherがそれを知る方法がなくてもです。

### L1ブリッジコントラクト {#the-l1-bridge-contract}

[このコントラクトのソースコードはこちらです](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol)。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

インターフェースは他のコントラクトの一部になる可能性があるため、幅広いSolidityバージョンをサポートする必要があります。
しかし、ブリッジ自体は私たちのコントラクトであり、使用するSolidityバージョンについて厳密にすることができます。

```solidity
/* Interface Imports */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge)と[IL1StandardBridge](#IL1StandardBridge)については、上記で説明しました。

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[このインターフェース](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol)により、L2の標準ブリッジを制御するためのメッセージを作成できます。

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[このインターフェース](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)により、ERC-20コントラクトを制御できます。
[詳細はこちらで読むことができます](/developers/tutorials/erc20-annotated-code/#the-interface)。

```solidity
/* Library Imports */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[上で説明したように](#crossdomainenabled)、このコントラクトはレイヤー間メッセージングに使用されます。

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

`Lib_PredeployAddresses`には、常に同じアドレスを持つL2コントラクトのアドレスが含まれています。 これにはL2の標準ブリッジが含まれます。

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[OpenZeppelinのアドレスユーティリティ](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol)。 これは、コントラクトアドレスと外部所有アカウント(EOA)に属するアドレスを区別するために使用されます。

これは、直接の呼び出しとコントラクトのコンストラクタからの呼び出しを区別する方法がないため、完璧な解決策ではないことに注意してください。しかし、少なくともこれにより、一般的なユーザーエラーを特定し、防ぐことができます。

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[ERC-20標準](https://eips.ethereum.org/EIPS/eip-20)は、コントラクトが失敗を報告する2つの方法をサポートしています:

1. 元に戻す
2. `false`を返す

両方のケースを処理するとコードが複雑になるため、代わりにOpenZeppelinの[`SafeERC20`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol)を使用します。これにより、[すべての失敗が revert になる](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96)ことが保証されます。

```solidity
/**
 * @title L1StandardBridge
 * @dev L1 ETHおよびERC20ブリッジは、デポジットされたL1資金と、L2で使用されている標準トークンを保存するコントラクトです。
 * 対応するL2ブリッジと同期し、デポジットを通知し、新しく完了した引き出しをリッスンします。
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

この行は、`IERC20`インターフェースを使用するたびに`SafeERC20`ラッパーを使用するように指定する方法です。

```solidity

    /********************************
     * 外部コントラクト参照 *
     ********************************/

    address public l2TokenBridge;
```

[L2StandardBridge](#the-l2-bridge-contract)のアドレス。

```solidity

    // L1トークンをL2トークンにマッピングし、デポジットされたL1トークンの残高にマッピングします。
    mapping(address => mapping(address => uint256)) public deposits;
```

このような二重の[マッピング](https://www.tutorialspoint.com/solidity/solidity_mappings.htm)は、[2次元スパース配列](https://en.wikipedia.org/wiki/Sparse_matrix)を定義する方法です。
このデータ構造の値は、`deposit[L1トークンアドレス][L2トークンアドレス]`として識別されます。
デフォルト値はゼロです。
異なる値に設定されたセルのみがストレージに書き込まれます。

```solidity

    /***************
     * コンストラクタ *
     ***************/

    // このコントラクトはプロキシの背後にあるため、コンストラクタのパラメータは使用されません。
    constructor() CrossDomainEnabled(address(0)) {}
```

ストレージ内のすべての変数をコピーすることなく、このコントラクトをアップグレードできるようにしたいです。
そのためには、[`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy)を使用します。これは、[`delegatecall`](https://solidity-by-example.org/delegatecall/)を使用して、プロキシコントラクトによってアドレスが保存されている別のコントラクトに呼び出しを転送するコントラクトです(アップグレード時に、プロキシにそのアドレスを変更するように指示します)。
`delegatecall`を使用すると、ストレージは呼び出し元コントラクトのストレージのままになるため、すべてのコントラクトの状態変数の値は影響を受けません。

このパターンの1つの効果は、`delegatecall`の呼び出し先であるコントラクトのストレージが使用されないため、それに渡されるコンストラクタの値は重要ではないということです。
これが、`CrossDomainEnabled`コンストラクタに無意味な値を提供できる理由です。
また、以下の初期化がコンストラクタから分離されている理由でもあります。

```solidity
    /******************
     * 初期化 *
     ******************/

    /**
     * @param _l1messenger クロスチェーン通信に使用されるL1メッセンジャーアドレス。
     * @param _l2TokenBridge L2標準ブリッジアドレス。
     */
    // slither-disable-next-line external-function
```

この[Slitherテスト](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external)は、コントラクトコードから呼び出されず、したがって`public`ではなく`external`として宣言できる関数を特定します。
`external`関数のガス代は、calldataでパラメータを提供できるため、低くなる可能性があります。
`public`と宣言された関数は、コントラクト内からアクセス可能である必要があります。
コントラクトは自身のcalldataを変更できないため、パラメータはメモリに保存する必要があります。
そのような関数が外部から呼び出される場合、calldataをメモリにコピーする必要があり、ガス代がかかります。
この場合、関数は一度しか呼び出されないため、非効率性は問題になりません。

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

`initialize`関数は、一度だけ呼び出す必要があります。
L1クロスドメインメッセンジャーまたはL2トークンブリッジのアドレスが変更された場合、新しいプロキシとそれを呼び出す新しいブリッジを作成します。
これは、システム全体がアップグレードされる場合を除き、起こる可能性は低く、非常にまれな出来事です。

この関数には、誰が呼び出せるかを制限するメカニズムがないことに注意してください。
つまり理論的には、攻撃者はプロキシとブリッジの最初のバージョンがデプロイされるのを待ち、正当なユーザーが`initialize`関数にアクセスする前に[フロントラン](https://solidity-by-example.org/hacks/front-running/)を実行することができます。 しかし、これを防ぐ方法は2つあります:

1. コントラクトがEOAによって直接デプロイされるのではなく、[別のコントラクトがそれらを作成するトランザクション](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595)でデプロイされる場合、プロセス全体がアトミックになり、他のトランザクションが実行される前に完了することができます。
2. `initialize`への正当な呼び出しが失敗した場合、新しく作成されたプロキシとブリッジを無視して、新しいものを作成することは常に可能です。

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

これらは、ブリッジが知る必要がある2つのパラメータです。

```solidity

    /**************
     * デポジット *
     **************/

    /** @dev 送信者がEOAであることを要求する修飾子。このチェックは、悪意のあるコントラクトによって
     *  initcode経由で回避される可能性がありますが、私たちが避けたいユーザーエラーに対応します。
     */
    modifier onlyEOA() {
        // コントラクトからのデポジットを停止するために使用(誤って失われたトークンを避けるため)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

これが、OpenZeppelinの`Address`ユーティリティが必要だった理由です。

```solidity
    /**
     * @dev この関数は、データを指定せずに呼び出すことができ、L2の呼び出し元残高にETHの金額をデポジットします。
     * receive関数はデータを取らないため、保守的なデフォルト金額がL2に転送されます。
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

この関数は、テスト目的で存在します。
インターフェース定義には表示されないことに注意してください。通常の使用のためではありません。

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

これら2つの関数は、実際のETHデポジットを処理する関数である`_initiateETHDeposit`のラッパーです。

```solidity
    /**
     * @dev ETHを保存し、L2 ETHゲートウェイにデポジットを通知することで、デポジットのロジックを実行します。
     * @param _from L1でデポジットを引き出すアカウント。
     * @param _to L2でデポジットを与えるアカウント。
     * @param _l2Gas L2でデポジットを完了するために必要なガスリミット。
     * @param _data L2に転送するオプションのデータ。このデータは、外部コントラクトの便宜のためにのみ提供されます。
     *        最大長を強制する以外、これらのコントラクトはその内容について何の保証も提供しません。
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // finalizeDeposit呼び出しのcalldataを構築
        bytes memory message = abi.encodeWithSelector(
```

クロスドメインメッセージの仕組みは、宛先コントラクトがメッセージをcalldataとして呼び出されることです。
Solidityコントラクトは、常に[ABI仕様](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html)に従ってcalldataを解釈します。
Solidity関数[`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions)は、そのcalldataを作成します。

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

ここでのメッセージは、これらのパラメータで[`finalizeDeposit`関数](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148)を呼び出すことです:

| パラメータ                           | 値                                                                                        | 意味                                                                                                                      |
| ------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                                                            | L1上のETH(ERC-20トークンではない)を表す特別な値                                                                       |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | OptimismでETHを管理するL2コントラクト、`0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000`(このコントラクトはOptimism内部でのみ使用されます) |
| \_from    | \_from                                                             | L1でETHを送信するアドレス                                                                                                         |
| \_to      | \_to                                                               | L2でETHを受信するアドレス                                                                                                         |
| 金額                              | msg.value                                                                | 送信されたweiの量(すでにブリッジに送信済み)                                                                             |
| \_data    | \_data                                                             | デポジットに添付する追加データ                                                                                                         |

```solidity
        // calldataをL2に送信
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

クロスドメインメッセンジャーを介してメッセージを送信します。

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

この転送をリッスンしている分散型アプリケーションに通知するためにイベントを発行します。

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

これら2つの関数は、実際のERC-20デポジットを処理する`_initiateERC20Deposit`関数のラッパーです。

```solidity
    /**
     * @dev L2デポジットトークンコントラクトにデポジットを通知し、ハンドラを呼び出してL1資金をロックするロジックを実行します。(例: transferFrom)
     *
     * @param _l1Token デポジットするL1 ERC20のアドレス
     * @param _l2Token L1の各L2 ERC20のアドレス
     * @param _from L1でデポジットを引き出すアカウント
     * @param _to L2でデポジットを与えるアカウント
     * @param _amount デポジットするERC20の金額。
     * @param _l2Gas L2でデポジットを完了するために必要なガスリミット。
     * @param _data L2に転送するオプションのデータ。このデータは、外部コントラクトの便宜のためにのみ提供されます。
     *        最大長を強制する以外、これらのコントラクトはその内容について何の保証も提供しません。
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
最初の違いは、この関数がトークンアドレスと転送量をパラメータとして受け取ることです。
ETHの場合、ブリッジへの呼び出しには、すでにブリッジアカウントへの資産の移転(`msg.value`)が含まれています。

```solidity
        // L1でデポジットが開始されると、L1ブリッジは将来の引き出しのために資金を自身に転送します。
        // safeTransferFromは、コントラクトにコードがあるかどうかもチェックするため、_fromがEOAまたはaddress(0)の場合、これは失敗します。
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

ERC-20トークンの転送は、ETHとは異なるプロセスに従います:

1. ユーザー(`_from`)は、適切なトークンを転送するための権限をブリッジに与えます。
2. ユーザーは、トークンコントラクトのアドレス、金額などでブリッジを呼び出します。
3. ブリッジは、デポジットプロセスの一環として、トークンを(自身に)転送します。

最初のステップは、最後の2つのステップとは別のトランザクションで行われる場合があります。
ただし、`_initiateERC20Deposit`を呼び出す2つの関数(`depositERC20`と`depositERC20To`)は、`_from`パラメータとして`msg.sender`を使用してこの関数を呼び出すだけなので、フロントランニングは問題になりません。

```solidity
        // _l2Token.finalizeDeposit(_to, _amount)のcalldataを構築
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // calldataをL2に送信
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

デポジットされたトークンの量を`deposits`データ構造に追加します。
L2には同じL1 ERC-20トークンに対応する複数のアドレスが存在する可能性があるため、ブリッジのL1 ERC-20トークン残高を使用してデポジットを追跡するだけでは不十分です。

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

L2ブリッジはL2クロスドメインメッセンジャーにメッセージを送信し、これによりL1クロスドメインメッセンジャーがこの関数を呼び出します(もちろん、[メッセージを完了するトランザクション](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions)がL1で送信された後)。

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

これが、クロスドメインメッセンジャーから来て、L2トークンブリッジから発信された正当なメッセージであることを確認してください。
この関数はブリッジからETHを引き出すために使用されるため、承認された呼び出し元によってのみ呼び出されることを確認する必要があります。

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

ETHを転送する方法は、`msg.value`にweiの量を指定して受信者を呼び出すことです。

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
        // L1で引き出しが完了すると、L1ブリッジは資金を引き出し人に転送します。
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * 一時的 - ETHの移行 *
     *****************************/

    /**
     * @dev アカウントにETH残高を追加します。これは、古いゲートウェイから新しいゲートウェイにETHを移行できるようにすることを目的としています。
     * 注意: これは、古いコントラクトから移行されたETHを受け取ることができるように、1回のアップグレードのみに残されます。
     */
    function donateETH() external payable {}
}
```

ブリッジの以前の実装がありました。
その実装からこの実装に移行したとき、すべての資産を移動する必要がありました。
ERC-20トークンは移動するだけです。
ただし、ETHをコントラクトに転送するには、そのコントラクトの承認が必要であり、それが`donateETH`が提供するものです。

## L2上のERC-20トークン {#erc-20-tokens-on-l2}

ERC-20トークンが標準ブリッジに適合するためには、標準ブリッジ、そして標準ブリッジのみがトークンをミントできるようにする必要があります。
これは、Optimismで流通しているトークンの数が、L1ブリッジコントラクト内にロックされているトークンの数と等しいことをブリッジが保証する必要があるためです。
L2にトークンが多すぎると、一部のユーザーは資産をL1に戻すことができなくなります。
信頼できるブリッジの代わりに、私たちは本質的に[部分準備銀行制度](https://www.investopedia.com/terms/f/fractionalreservebanking.asp)を再現することになります。
L1にトークンが多すぎると、L2トークンをバーンしない限り解放する方法がないため、それらのトークンの一部はブリッジコントラクト内に永久にロックされたままになります。

### IL2StandardERC20 {#il2standarderc20}

標準ブリッジを使用するL2上のすべてのERC-20トークンは、[このインターフェース](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol)を提供する必要があります。これには、標準ブリッジが必要とする関数とイベントが含まれています。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[標準のERC-20インターフェース](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)には、`mint`および`burn`関数は含まれていません。
これらのメソッドは、[ERC-20標準](https://eips.ethereum.org/EIPS/eip-20)では要求されておらず、トークンを作成および破棄するメカニズムは指定されていません。

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[ERC-165インターフェース](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol)は、コントラクトが提供する関数を指定するために使用されます。
[こちらで標準を読むことができます](https://eips.ethereum.org/EIPS/eip-165)。

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

この関数は、このコントラクトにブリッジされたL1トークンのアドレスを提供します。
逆方向の同様の関数がないことに注意してください。
L2サポートが実装時に計画されていたかどうかに関係なく、任意のL1トークンをブリッジできる必要があります。

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

トークンをミント(作成)およびバーン(破棄)するための関数とイベント。
トークンの数が正しいこと(L1にロックされているトークンの数と等しいこと)を保証するため、ブリッジはこれらの関数を実行できる唯一のエンティティである必要があります。

### L2StandardERC20 {#L2StandardERC20}

[これは`IL2StandardERC20`インターフェースの実装です](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol)。
何らかのカスタムロジックが必要でない限り、これを使用する必要があります。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[OpenZeppelin ERC-20コントラクト](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)。
Optimismは、特に車輪が十分に監査され、資産を保持するのに十分信頼できる必要がある場合に、車輪を再発明することを信じていません。

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

これらは、私たちが要求し、通常ERC-20が必要としない2つの追加の設定パラメータです。

```solidity

    /**
     * @param _l2Bridge L2標準ブリッジのアドレス。
     * @param _l1Token 対応するL1トークンのアドレス。
     * @param _name ERC20名。
     * @param _symbol ERC20シンボル。
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

まず、継承元のコントラクトのコンストラクタ(`ERC20(_name, _symbol)`)を呼び出し、次に独自の変数を設定します。

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
すべてのインターフェースは、サポートされている関数の数であり、それらの関数の[ABI関数セレクタ](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector)の[排他的論理和](https://en.wikipedia.org/wiki/Exclusive_or)として識別されます。

L2ブリッジは、ERC-165をサニティチェックとして使用して、資産を送信するERC-20コントラクトが`IL2StandardERC20`であることを確認します。

**注:** 不正なコントラクトが`supportsInterface`に偽の回答を提供することを防ぐものはないため、これはサニティチェックメカニズムであり、セキュリティメカニズムではありません。

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

資産をミントおよびバーンできるのは、L2ブリッジのみです。

`_mint`と`_burn`は、実際には[OpenZeppelin ERC-20コントラクト](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn)で定義されています。
そのコントラクトは、トークンをミントおよびバーンする条件がERC-20の使用方法と同じくらい多様であるため、それらを外部に公開しないだけです。

## L2ブリッジコード {#l2-bridge-code}

これは、Optimismでブリッジを実行するコードです。
[このコントラクトのソースはこちらです](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol)。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Interface Imports */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

[IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol)インターフェースは、上で見た[L1の同等のもの](#IL1ERC20Bridge)と非常に似ています。
2つの大きな違いがあります:

1. L1では、デポジットを開始し、引き出しを完了します。
   ここでは、引き出しを開始し、デポジットを完了します。
2. L1では、ETHとERC-20トークンを区別する必要があります。
   L2では、Optimismの内部ETH残高はアドレス[0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000)のERC-20トークンとして処理されるため、両方に同じ関数を使用できます。

```solidity
/* ライブラリのインポート */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* コントラクトのインポート */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev L2標準ブリッジは、L1標準ブリッジと連携して、L1とL2間のETHおよびERC20の移行を可能にするコントラクトです。
 * このコントラクトは、L1標準ブリッジへのデポジットを聞くと、新しいトークンのミンターとして機能します。
 * このコントラクトは、引き出しを意図したトークンのバーナーとしても機能し、L1ブリッジにL1資金を解放するように通知します。
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * 外部コントラクト参照 *
     ********************************/

    address public l1TokenBridge;
```

L1ブリッジのアドレスを追跡します。
L1の同等のものとは対照的に、ここではこの変数が必要であることに注意してください。
L1ブリッジのアドレスは事前にわかりません。

```solidity

    /***************
     * コンストラクタ *
     ***************/

    /**
     * @param _l2CrossDomainMessenger このコントラクトで使用されるクロスドメインメッセンジャー。
     * @param _l1TokenBridge メインチェーンにデプロイされたL1ブリッジのアドレス。
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

これら2つの関数は、引き出しを開始します。
L1トークンアドレスを指定する必要はないことに注意してください。
L2トークンは、L1の同等のアドレスを教えてくれることが期待されています。

```solidity

    /**
     * @dev トークンをバーンし、L1トークンゲートウェイに引き出しを通知することで、引き出しのロジックを実行します。
     * @param _l2Token 引き出しが開始されたL2トークンのアドレス。
     * @param _from L2で引き出しを引き出すアカウント。
     * @param _to L1で引き出しを与えるアカウント。
     * @param _amount 引き出すトークンの量。
     * @param _l1Gas 未使用ですが、将来の互換性の考慮事項のために含まれています。
     * @param _data L1に転送するオプションのデータ。このデータは、外部コントラクトの便宜のためにのみ提供されます。
     *        最大長を強制する以外、これらのコントラクトはその内容について何の保証も提供しません。
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // 引き出しが開始されると、その後のL2での使用を防ぐために、引き出し人の資金をバーンします。
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

`_from`パラメータに依存するのではなく、偽造するのがはるかに難しい(私の知る限り不可能) `msg.sender`に依存していることに注意してください。

```solidity

        // l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)のcalldataを構築
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

        // メッセージをL1ブリッジに送信
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * クロスチェーン関数: デポジット *
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

メッセージのソースが正当であることを確認してください。
この関数は`_mint`を呼び出し、ブリッジがL1で所有するトークンでカバーされていないトークンを与えるために使用できるため、これは重要です。

```solidity
        // ターゲットトークンが準拠していることを確認し、
        // L1でデポジットされたトークンがここのL2デポジットトークン表現と一致することを検証します。
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

サニティチェック:

1. 正しいインターフェースがサポートされていること
2. L2 ERC-20コントラクトのL1アドレスが、トークンのL1ソースと一致すること

```solidity
        ) {
            // デポジットが完了すると、L2のアカウントに同額のトークンを入金します。
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

サニティチェックに合格した場合、デポジットを完了します:

1. トークンをミントします。
2. 適切なイベントを発行します。

```solidity
        } else {
            // デポジット先のL2トークンが、そのL1トークンの正しいアドレスについて同意しないか、正しいインターフェースをサポートしていないかのいずれかです。
            // これは、悪意のあるL2トークンがある場合、またはユーザーが何らかの方法でデポジット先の間違ったL2トークンアドレスを指定した場合にのみ発生するはずです。
            // いずれの場合も、ここでプロセスを停止し、引き出しメッセージを構築して、ユーザーが場合によっては資金を取り出せるようにします。
            // 悪意のあるトークンコントラクトを完全に防ぐ方法はありませんが、これによりユーザーエラーが制限され、悪意のあるコントラクトの動作のいくつかの形態が軽減されます。
```

ユーザーが間違ったL2トークンアドレスを使用して検出可能なエラーを犯した場合、デポジットをキャンセルしてL1でトークンを返したいです。
これをL2から行う唯一の方法は、フォールトチャレンジ期間を待つ必要があるメッセージを送信することですが、それはユーザーがトークンを永久に失うよりもはるかに良いです。

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // ここで_toと_fromを切り替えて、デポジットを送信者に跳ね返す
                _from,
                _amount,
                _data
            );

            // メッセージをL1ブリッジに送信
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## 結論 {#conclusion}

標準ブリッジは、資産転送のための最も柔軟なメカニズムです。
しかし、非常に汎用的であるため、必ずしも最も使いやすいメカニズムではありません。
特に、出金に関しては、ほとんどのユーザーが、チャレンジ期間を待つ必要がなく、出金をファイナライズするためにマークル証明を必要としない[サードパーティ製ブリッジ](https://optimism.io/apps#bridge)を使用することを好みます。

これらのブリッジは通常、L1に資産を持ち、それを少額の手数料(多くの場合、標準ブリッジの引き出しのガス代よりも安い)ですぐに提供することで機能します。
ブリッジ(またはそれを運営する人々)がL1の資産が不足すると予想する場合、L2から十分な資産を転送します。 これらは非常に大きな引き出しであるため、引き出しコストは多額にわたって償却され、はるかに小さい割合になります。

この記事が、レイヤー2の仕組みと、明確で安全なSolidityコードの書き方について、より理解を深めるのに役立ったことを願っています。

[私の他の作品はこちらでご覧いただけます](https://cryptodocguy.pro/).
