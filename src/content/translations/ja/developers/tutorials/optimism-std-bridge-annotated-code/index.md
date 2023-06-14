---
title: "Optimismの標準ブリッジコントラクトを紹介します"
description: Optimismの標準ブリッジは、どのように機能するか。 および、その理由。
author: Ori Pomerantz
tags:
  - "Solidity"
  - "Optimism"
  - "ブリッジ"
  - "レイヤー2"
skill: intermediate
published: 2022-03-30
lang: ja
---

[Optimism](https://www.optimism.io/)は、[Optimisitc ロールアップ](/developers/docs/scaling/optimistic-rollups/)を行うメカニズムのひとつです。 Optimistic ロールアップでは、ネットワークに含まれるすべてノードではなく一部のノードのみを対象としてトランザクションが処理されるため、イーサリアム・メインネット（「レイヤー 1」または「L1」とも呼ばれます）よりも手数料が低くなります。 一部のノードのみを対象として処理されるものの、すべてのデータは L1 に書き込まれるため、あらゆる事項につき、メインネットにおける完全性および可用性についての保証に基づいて証明、再構築することが可能です。

Optimism（またはその他の L2）上で L1 のアセットを使用するには、当該アセットを[ブリッジ](/bridges/#prerequisites)する必要があります。 アセットをブリッジする方法のひとつとして、アセット（最も一般的なのは、ETH や[ERC-20 トークン](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/)です）を L1 上でロックし、L2 上で同等のアセットを受け取る方法があります。 最終的に、これらのアセットを所持するユーザーは、再度 L1 にブリッジする必要があるでしょう。 L1 にアセットをブリッジすると、L2 上のアセットはバーンされ、L1 上のアセットがユーザーに戻されます。

以上が、[Optimism における標準ブリッジ](https://community.optimism.io/docs/developers/bridge/standard-bridge)の仕組みです。 この記事では、このブリッジ機能について Solidity 上で適切に作成したソースコードを確認しながら、その仕組みを学びます。

## 制御フロー {#control-flows}

ブリッジは、2 つのメインフローで構成されます：

- L1 から L2 への入金
- L2 から L1 への出金

### 入金フロー {#deposit-flow}

#### L1 {#deposit-flow-layer-1}

1. ERC-20 を入金する場合、入金者はブリッジに対し、入金額を使用するためのアローワンスを与えます。
2. 入金者は、L1 ブリッジ（`depositERC20`、`depositERC20To`、 `depositETH`あるいは `depositETHTo`）を呼び出します。
3. L1 ブリッジが、ブリッジされたアセットを保持します。
   - ETH の場合：アセットは、呼び出しを通じて入金者に送信されます。
   - ERC-20 トークンの場合：アセットは、入金者が提供するアローワンスを使用して、ブリッジ自体に送信されます。
4. L1 のブリッジが、クロスドメインのメッセージメカニズムを通じて、L2 のブリッジ上で`finalizeDeposit`を呼び出します。

#### L2 {#deposit-flow-layer-2}

5. L2 のブリッジは、`finalizeDeposit`の呼び出しにつき、以下が適切であることを確認します：
   - クロスドメインのメッセージ・コントラクトからの呼び出しであること。
   - ブリッジが L1 上で作成されたものであること。
6. L2 のブリッジはさらに、L2 上の ERC-20 トークンコントラクトにつき、以下が適切であることを確認します：
   - L2 のコントラクトにおいて、L1 における対応するコントラクトが、L1 上で送信されたトークンと同一であると報告していること。
   - L2 のコントラクトが、（[ERC-165 を使用した](https://eips.ethereum.org/EIPS/eip-165)）適切なインターフェイスをサポートすると報告していること。
7. L2 のコントラクトが適切であると確認できた場合は、適切なアドレスに対して希望する量のトークンをミントするために、そのコントラクトを呼び出してください。 そうでない場合は、出金プロセスを開始して、ユーザーが L1 上のトークンを請求できるようにします。

### 出金フロー {#withdrawal-flow}

#### L2 {#withdrawl-flow-layer-2}

1. 出金者は、L2 のブリッジ（`withdraw`または`withdrawTo`）を呼び出します 。
2. L2 のブリッジは、`msg.sender`が所有する適切な数のトークンをバーンします。
3. L2 のブリッジは、クロスドメインのメッセージ・メカニズムを利用して、L1 のブリッジ上で、 `finalizeETHWithdrawal`または`finalizeERC20Withdrawal`を呼び出します。

#### L1 {#withdrawl-flow-layer-1}

4. L1 のブリッジは、`finalizeETHWithdraw`または`finalizeERC20Withdral`の呼び出しにつき、以下が適切であるかを確認します：
   - クロスドメインのメッセージ・メカニズムを経由していること。
   - L2 のブリッジで作成されていること。
5. L1 のブリッジは、適切な資産（ETH または ERC-20）を適切なアドレスに送信します。

## レイヤー 1 のコード {#layer-1-code}

以下は、イーサリアム・メインネット（L1）で実行されるコードです。

### IL1ERC20Bridge {#IL1ERC20Bridge}

このインターフェイスは、[こちら](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol)で定義されています。 このインターフェイスには、ERC-20 トークンをブリッジするために必要な機能と定義が含まれます。

```solidity
// SPDX-License-Identifier: MIT
```

Optimism のコードの大部分は、[MIT ライセンス](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-)に基づいています。

```solidity
pragma solidity >0.5.0 <0.9.0;
```

本記事の執筆時点で、Solidity の最新バージョンは 0.8.12 です。 バージョン 0.9.0 においてこのコードが利用できるかは、同バージョンがリリースされるまで不明です。

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * Events *
     **********/

    event ERC20DepositInitiated(
```

Optimism のブリッジ関連用語において、*入金*とは、L1 から L2 に送金することを意味し、*出金*とは、L2 から L1 へ送金することを意味します。

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

ほとんどの場合、L1 上の ERC-20 のアドレスは、L2 上で対応する ERC-20 のアドレスとは異なります。 トークンアドレスのリストは、[こちら](https://static.optimism.io/optimism.tokenlist.json)を参照してください。 `chainId`が 1 のアドレスであれば、L1 (メインネット) 上のトークンであり、`chainId`が 10 のアドレスでれば、L2（Optimism）上のトークンです。 残りの 2 つの`chainId`の値は、Kovan テストネットワーク（42）と Optimistic Kovan テストネットワーク（69）のためのものです。

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

転送にはメモを追加することができ、メモは転送を報告するイベントに追加されます。

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

入金と出金の両方向につき、同じブリッジのコントラクトが処理します。 つまり、L1 のブリッジでは入金を初期化し、出金を確定します。

```solidity

    /********************
     * Public Functions *
     ********************/

    /**
     * @dev get the address of the corresponding L2 bridge contract.
     * @return Address of the corresponding L2 bridge contract.
     */
    function l2TokenBridge() external returns (address);
```

実際には、L2 のブリッジは事前にデプロイされており、常に「`0x42000000000000000000000000000000000000000010`」のアドレスとなるため、この機能は必要ではありません。 この機能は、L2 上のブリッジとの対称性を確保するためのものです。というのも、L1 ブリッジのアドレスを確認することは無意味とは*言えない*ためです。

```solidity
    /**
     * @dev deposit an amount of the ERC20 to the caller's balance on L2.
     * @param _l1Token Address of the L1 ERC20 we are depositing
     * @param _l2Token Address of the L1 respective L2 ERC20
     * @param _amount Amount of the ERC20 to deposit
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

`_l2Gas`のパラメータは、このトランザクションが使用できる L2 上のガス量です。 この値は、[一定の（高い）上限まで無料であるため](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2)、ミント時に ERC-20 がコントラクトが特に異常な動作を行わない限り、問題は発生しません。 以下の関数は、異なるブロックチェーンにおける同一アドレスにアセットをブリッジしたいという一般的なシナリオで用いることができます。

```solidity
    /**
     * @dev deposit an amount of ERC20 to a recipient's balance on L2.
     * @param _l1Token Address of the L1 ERC20 we are depositing
     * @param _l2Token Address of the L1 respective L2 ERC20
     * @param _to L2 address to credit the withdrawal to.
     * @param _amount Amount of the ERC20 to deposit.
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
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

次のコードは`depositERC20`とほぼ同一の関数ですが、ERC-20 トークンを異なるアドレスに送信することができます。

```solidity
    /*************************
     * Cross-chain Functions *
     *************************/

    /**
     * @dev Complete a withdrawal from L2 to L1, and credit funds to the recipient's balance of the
     * L1 ERC20 token.
     * This call will fail if the initialized withdrawal from L2 has not been finalized.
     *
     * @param _l1Token Address of L1 token to finalizeWithdrawal for.
     * @param _l2Token Address of L2 token where withdrawal was initiated.
     * @param _from L2 address initiating the transfer.
     * @param _to L1 address to credit the withdrawal to.
     * @param _amount Amount of the ERC20 to deposit.
     * @param _data Data provided by the sender on L2. This data is provided
     *   solely as a convenience for external contracts. Aside from enforcing a maximum
     *   length, these contracts provide no guarantees about its content.
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

Optimism における出金（および、他の L2 から L1 へのメッセージ送信）は、2 つのステップで実行されます：

1. L2 でトランザクションを開始する。
2. L1 で、トランザクションを確定／クレームする。 L1 でのトランザクションは、L2 でのトランザクションに対する[異議申し立て期間](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) が終了した後で実行可能になります。

### IL1StandardBridge {#il1standardbridge}

このインターフェイスは、[こちら](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol)で定義されています。 このブリッジには、ETH を対象とするイベントおよび関数の定義が含まれています。 これらの定義は、ERC-20 トークンを対象とする`IL1ERC20Bridge`の定義とほぼ同一です。

一部の ERC-20 トークンは、標準ブリッジでは処理できず、カスタム処理が必要となるため、このブリッジのインターフェイスは 2 つのファイルで構成されています。 これにより、カスタム処理が必要なトークンを取り扱うブリッジについては`IL1ERC20Bridge`を実装すればよく、ETH のブリッジ機能を実装する必要はありません。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * Events *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

このイベントは、ERC-20 トークン用のイベント（`ERC20DepositInitiated`）とほぼ同一ですが、L1 および L2 上のトークンアドレスが含まれていない点が異なります。 他のイベントおよび関数についても、この点が異なります。

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * Public Functions *
     ********************/

    /**
     * @dev Deposit an amount of the ETH to the caller's balance on L2.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev Deposit an amount of ETH to a recipient's balance on L2.
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
     * Cross-chain Functions *
     *************************/

    /**
     * @dev Complete a withdrawal from L2 to L1, and credit funds to the recipient's balance of the
     * L1 ETH token. Since only the xDomainMessenger can call this function, it will never be called
     * before the withdrawal is finalized.
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

[このコントラクト](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol)は、[L1](#the-l1-bridge-contract)および[L2](#the-l2-bridge-contract)の両方のブリッジにおいて継承され、相手のレイヤーに対してメッセージを送信します。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Interface Imports */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[このインターフェース](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol)は、クロスドメインのメッセンジャーを用いて、相手のレイヤーに対するメッセージの送信方法をコントラクトに通知するものです。 このクロスドメインのメッセンジャーは完全に別個のシステムであるため、今後改めて記事を執筆したいと考えています。

```solidity
/**
 * @title CrossDomainEnabled
 * @dev Helper contract for contracts performing cross-domain communications
 *
 * Compiler used: defined by inheriting contract
 */
contract CrossDomainEnabled {
    /*************
     * Variables *
     *************/

    // Messenger contract used to send and receive messages from the other domain.
    address public messenger;

    /***************
     * Constructor *
     ***************/

    /**
     * @param _messenger Address of the CrossDomainMessenger on the current layer.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

このコントラクトが知る必要がある唯一のパラメータは、当該レイヤーにおけるクロスドメイン・メッセンジャーのアドレスです。 このパラメータは、コンストラクタ上で設定された後は変更されません。

```solidity

    /**********************
     * Function Modifiers *
     **********************/

    /**
     * Enforces that the modified function is only callable by a specific cross-domain account.
     * @param _sourceDomainAccount The only account on the originating domain which is
     *  authenticated to call this function.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

クロスドメインのメッセージング機能は、ブロックチェーン（イーサリアム・メインネットまたは Optimism）上で実行されているあらゆるコントラクトからアクセス可能です。 ただし、相手方のブリッジから送信された特定のメッセージ*のみ*を信頼するためには、双方のブリッジが必要になります。

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

適切なクロスドメイン・メッセンジャー （以下の`messenger`を参照）から送信されたメッセージのみ、信頼できます。

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

クロスドメイン・メッセンジャーでは、[the `.xDomainMessageSender()` 関数](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128)を用いて、相手方のレイヤーにメッセージを送信するアドレスを提供します。 当該メッセージで開始されたトランザクションで呼び出す場合に限り、メッセージの送信元アドレスを表示することができます。

このメッセージにつき、相手方のブリッジから送信されたものであることを確認する必要があります。

```solidity

        _;
    }

    /**********************
     * Internal Functions *
     **********************/

    /**
     * Gets the messenger, usually from storage. This function is exposed in case a child contract
     * needs to override.
     * @return The address of the cross-domain messenger contract which should be used.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

この機能は、クロスドメイン・メッセンジャーを返します。 `messenger`の変数ではなく関数を使うのは、この値を継承するコントラクトに対し、どのクロスドメイン・メッセンジャーを使用するかを特定するアルゴリズムを使用できるようにするためです。

```solidity

    /**
     * Sends a message to an account on another domain
     * @param _crossDomainTarget The intended recipient on the destination domain
     * @param _message The data to send to the target (usually calldata to a function with
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit The gasLimit for the receipt of the message on the target domain.
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

最後に、次の関数は相手方のレイヤーにメッセージを送信するものです。

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither)は、Optimism において、すべてのコントラクトの脆弱性やその他の潜在的な問題箇所を特定するために実行される静的解析ツールです。 ここでは、以下の行により 2 つの脆弱性がトリガーされます。

1. [リエントランシーのイベント](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [無害のリエントランシー](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

このケースでは、Slither が当該情報を把握する方法を持たない場合でも、`getCrossDomainMessenger()`が信頼できるアドレスを返すと分かっているため、リエントランシーについて心配する必要はありません。

### L1 上のブリッジコントラクト {#the-l1-bridge-contract}

このコントラクトのソースコードは、[こちら](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol)で入手してください。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

このインターフェイスは、他のコントラクトにも含まれる場合があるため、Solidity のさまざまなバージョンをサポートする必要があります。 しかしここでは、ブリッジ自体がコントラクトであるため、使用できる Solidity のバージョンを限定することが可能です。

```solidity
/* Interface Imports */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge)と[IL1StandardBridge](#IL1StandardBridge)については、すでに説明しました。

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[このインターフェイス](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol)では、L2 上で標準ブリッジを制御するためのメッセージを作成します。

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[このインターフェイス](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)は、ERC-20 のコントラクトを制御するために使用します。 詳細については、[こちら](/developers/tutorials/erc20-annotated-code/#the-interface)をご覧ください。

```solidity
/* Library Imports */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[上記](#crossdomainenabled)で説明したように、このコントラクトはレイヤー間のメッセージングに使用します。

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol)には、常に同じアドレスを持つ L2 上のコントラクトのアドレスが含まれています。 これには、L2 上の標準ブリッジが含まれます。

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[OpenZeppelin のアドレス・ユーティリティ](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol)です。 これは、コントラクト上のアドレスと外部所有アカウント（EOA）に含まれるアドレスを区別するために使われます。

これは、直接の呼び出しとコントラクトのコンストラクタで作成した呼び出しを区別できないため完全なソリューションとは言えませんが、少なくとも、よくあるユーザーエラーを特定、防止することは可能です。

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[ERC-20 標準](https://eips.ethereum.org/EIPS/eip-20)では、コントラクトが実行失敗を報告する手段として以下の 2 つがあります：

1. 元に戻す
2. `false`を返す

両方のケースに対応するとコードがより複雑になるため、代わりに[OpenZeppelin の`SafeERC20`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol)を使用します。これにより、[失敗した場合は常に元に戻されます](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96)。

```solidity
/**
 * @title L1StandardBridge
 * @dev The L1 ETH and ERC20 Bridge is a contract which stores deposited L1 funds and standard
 * tokens that are in use on L2. It synchronizes a corresponding L2 Bridge, informing it of deposits
 * and listening to it for newly finalized withdrawals.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

この行は、`IERC20`インターフェイスを使用する際に、常に`IERC20`ラッパーを用いることを指定するものです。

```solidity

    /********************************
     * External Contract References *
     ********************************/

    address public l2TokenBridge;
```

[L2StandardBridge](#the-l2-bridge-contract)のアドレスです。

```solidity

    // Maps L1 token to L2 token to balance of the L1 token deposited
    mapping(address => mapping(address => uint256)) public deposits;
```

[2 次元スパース配列](https://en.wikipedia.org/wiki/Sparse_matrix)を定義するには、このようなダブル[マッピング](https://www.tutorialspoint.com/solidity/solidity_mappings.htm)を用います。 このデータ構造の値は、`deposit[L1 token addr][L2 token addr]`として識別されます。 初期値はゼロになります。 ゼロ以外の値が設定されたセルのみが、ストレージに書き込まれます。

```solidity

    /***************
     * Constructor *
     ***************/

    // This contract lives behind a proxy, so the constructor parameters will go unused.
    constructor() CrossDomainEnabled(address(0)) {}
```

ストレージ内のすべての変数をコピーせずに、このコントラクトを更新するには、 [`プロキシ`](https://docs.openzeppelin.com/contracts/3.x/api/proxy)を使用します。プロキシは、[`delegatecall`](https://solidity-by-example.org/delegatecall/)を用いて、プロキシのコントラクトにおいてアドレスが保存された別個のコントラクトに対して呼び出しを転送するものです（コントラクトを更新する際に、プロキシに対してこのアドレスを変更するように指示することになります）。 「`delegatecall`」を使用すると、ストレージは、*呼び出し元の*コントラクトのストレージのままになるため、すべてのコントラクト状態変数の値は影響を受けません。

このパターンを用いる効果のひとつとして、`delegatecall`の*呼び出し先*であるコントラクトのストレージが使用されないため、送信されたコンストラクタの値が意味を持たない点が挙げられます。 これこそ、`CrossDomainEnabled`のコンストラクタに対して無意味な値を入力できる理由です。 同時に、以下の初期化がコンストラクタとは別個に存在するである理由でもあります。

```solidity
    /******************
     * Initialization *
     ******************/

    /**
     * @param _l1messenger L1 Messenger address being used for cross-chain communications.
     * @param _l2TokenBridge L2 standard bridge address.
     */
    // slither-disable-next-line external-function
```

この[Slither のテスト](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external)は、コントラクトのコードにより呼び出される関数以外の関数であり、`public`ではなく、`external`と宣言される関数を特定するものです。 `external`関数のガス代は、コールデータに含まれるパラメータで指定できるため、安価に抑えることができます。 `public`と宣言された関数は、コントラクト内でアクセス可能である必要があります。 コントラクトはそれ自体のコールデータを変更できないため、パラメータはメモリに保存する必要があります。 このような関数を外部から呼び出す場合、コールデータをメモリにコピーする必要があるため、ガス代が発生します。 今回は関数を 1 回のみ呼び出すため、コスト上の非効率性は度外視できます。

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

`initialize`関数は、1 回だけ呼び出す必要があります。 L1 のクロスドメイン・メッセンジャーまたは L2 のトークンブリッジのいずれかのアドレスが変更されると、新しいプロキシとそれを呼び出す新しいブリッジが作成されます。 これは、システム全体がアップグレードされた場合を除いて発生する可能性は低く、非常にまれです。

この関数には、呼び出し可能な*アカウント*を制限するメカニズムが含まれない点に注意してください。 つまり理論的には、ネットワークに対する攻撃者は、プロキシとブリッジの最初のバージョンがデプロイされるまで待機し、正当なユーザーが`initialize`関数にアクセスできる前に[フロントラン](https://solidity-by-example.org/hacks/front-running/)を実行することが可能です。 これを防ぐには、以下の 2 つの方法があります：

1. コントラクトが EOA により直接デプロイされるのではなく、[別のコントラクトが作成したトランザクションにおいて](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595)デプロイされる場合、全体のプロセスがアトミックになり、他のトランザクションが実行される前に終了する場合があります。
2. 正当な`initialize`呼び出しが失敗した場合、常に、新たに作成されたプロキシおよびブリッジを無視し、さらに新しいものを作成することが可能です。

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

これらは、ブリッジが知る必要がある 2 つのパラメータです。

```solidity

    /**************
     * Depositing *
     **************/

    /** @dev Modifier requiring sender to be EOA.  This check could be bypassed by a malicious
     *  contract via initcode, but it takes care of the user error we want to avoid.
     */
    modifier onlyEOA() {
        // Used to stop deposits from contracts (avoid accidentally lost tokens)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

これは、OpenZeppelin の`Address`ユーティリティが必要となる理由です。

```solidity
    /**
     * @dev This function can be called with no data
     * to deposit an amount of ETH to the caller's balance on L2.
     * Since the receive function doesn't take data, a conservative
     * default amount is forwarded to L2.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

この関数は、テスト用のものです。 通常の使用を目的とするものではないため、インターフェイスの定義には含まれない点に注意してください。

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

これら 2 つの関数は、実際の ETH 入金を処理する関数である`_initiateETHDeposit`に関連したラッパーです。

```solidity
    /**
     * @dev Performs the logic for deposits by storing the ETH and informing the L2 ETH Gateway of
     * the deposit.
     * @param _from Account to pull the deposit from on L1.
     * @param _to Account to give the deposit to on L2.
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // Construct calldata for finalizeDeposit call
        bytes memory message = abi.encodeWithSelector(
```

クロスドメインのメッセージは、メッセージをコールデータとして宛先のコントラクトを呼び出す仕組みとして機能します。 Solidity のコントラクトは常に、コールデータを[ABI 仕様](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html)に従って解釈します。 Solidity の[`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions)は、このコールデータを作成するものです。

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

ここでのメッセージは、[ `finalizeDeposit`関数](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148)を以下のパラメータで呼び出すことです。

| パラメータ | 値                             | 説明                                                                                                                                           |
| ---------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token  | address(0)                     | L1 上の ETH (ERC-20 トークンではない) を表す特別な値                                                                                           |
| \_l2Token  | Lib_PredeployAddresses.OVM_ETH | Optimism 上で ETH を管理する L2 のコントラクト`0xDeadDeAddeAddEAddeadDEaDDeaDDeAD0000` （このコントラクトは、Optimism 内部でのみ使用されます） |
| \_from     | \_from                         | L1 上の ETH 送信元アドレス                                                                                                                     |
| \_to       | \_to                           | L2 上の ETH 受領用アドレス                                                                                                                     |
| amount     | msg.value                      | 送信された wei 額（すでにブリッジに送信済みの額）                                                                                              |
| \_data     | \_data                         | 入金に添付する追加の日付                                                                                                                       |

```solidity
        // Send calldata into L2
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

クロスドメイン・メッセンジャーを通じて、メッセージを送信します。

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

この送信をリッスンするすべての分散型アプリケーションに対し、通知イベントを発行します。

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

これら 2 つの関数は、実際の ERC-20 トークンの入金を処理する関数である`_initiateERC20Deposit`に関連したラッパーです。

```solidity
    /**
     * @dev Performs the logic for deposits by informing the L2 Deposited Token
     * contract of the deposit and calling a handler to lock the L1 funds. (e.g. transferFrom)
     *
     * @param _l1Token Address of the L1 ERC20 we are depositing
     * @param _l2Token Address of the L1 respective L2 ERC20
     * @param _from Account to pull the deposit from on L1
     * @param _to Account to give the deposit to on L2
     * @param _amount Amount of the ERC20 to deposit.
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
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

この関数は、上記の`_initiateETHDeposit`に似ていますが、いくつかの重要な点が異なります。 最大の違いは、この関数では、トークンのアドレスおよび送信額をパラメータとして受け取るという点です。 ETH の場合、ブリッジへの呼び出しにはすでに、ブリッジアカウントへの資産の移転（`msg.value`）が含まれています。

```solidity
        // When a deposit is initiated on L1, the L1 Bridge transfers the funds to itself for future
        // withdrawals. safeTransferFrom also checks if the contract has code, so this will fail if
        // _from is an EOA or address(0).
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

ERC-20 トークンについては、ETH の場合とは異なる送信プロセスが実行されます：

1. ユーザー（`_from`）は、ブリッジに対し、送信したいトークン量に見合ったアローワンスを与えます。
2. 次に、トークンコントラクトのアドレスや金額等で、ブリッジを呼び出します。
3. ブリッジは、入金プロセスの一環として、トークンをブリッジ自体に送信します。

最初のステップは、第 2、3 のステップとは別のトランザクションで実行しても構いません。 ただし、`_initiateERC20Deposit`を呼び出す 2 つの関数 （`depositERC20`と`depositERC20To`）は、`_from`をパラメータとして`msg.sender`を含むこの関数を呼び出すだけなので、フロントランニングの問題は発生しません。

```solidity
        // Construct calldata for _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // Send calldata into L2
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

`deposits`のデータ構造に、トークンの入金額を追加します。 L2 上には、L1 上にある同一の ERC-20 トークンに対応した複数のアドレスが存在する場合があるため、入金の推移を追跡するには、L1 上の ERC-20 トークンに関するブリッジ上の残高を参照するだけでは不十分です。

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * Cross-chain Functions *
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

L2 のブリッジは、L2 のクロスドメイン・メッセンジャーに対して、L1 のクロスドメイン・メッセンジャーがこの関数を呼び出すことを指示するメッセージを送信します（もちろん、L1 上で、[このメッセージを確定するトランザクション](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions)が送信された後においてです）。

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

このメッセージにつき、L2 のトークン・ブリッジで作成され、クロスドメイン・メッセンジャーを経由して送信された*正当な*メッセージであることを確認してください。 この関数は、ブリッジから ETH を出金するために使用するため、承認された呼び出し元だけが呼び出したことを確認する必要があります。

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

ETH を送信するには、`msg.value`で wei 金額を指定して、受領者を呼び出します。

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

出金イベントを発行します。

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

この関数は、上記の `finalizeETHWithdrawal`関数に類似していますが、ERC-20 トークンに関する事項が異なります。

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

`deposits`のデータ構造を更新します。

```solidity

        // When a withdrawal is finalized on L1, the L1 Bridge transfers the funds to the withdrawer
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * Temporary - Migrating ETH *
     *****************************/

    /**
     * @dev Adds ETH balance to the account. This is meant to allow for ETH
     * to be migrated from an old gateway to a new gateway.
     * NOTE: This is left for one upgrade only so we are able to receive the migrated ETH from the
     * old contract
     */
    function donateETH() external payable {}
}
```

このブリッジは、従来の実装から変更されています。 以前の実装から現在の実装に移行した際に、すべての資産を移転させる必要がありました。 ERC-20 トークンについては、移転のみが可能でした。 一方、ETH をコントラクトに移転するには、そのコントラクトの承認が必要であり、これは`donateETH`で実行できます。

## L2 上の ERC-20 トークン {#erc-20-tokens-on-l2}

ERC-20 トークンを標準ブリッジに適合させるためには、標準ブリッジ*のみが*トークンをミントできるようにする必要があります。 これが必要になるのは、各ブリッジにおいて、Optimism 上で流通するトークンの数が L1 のブリッジコントラクト内でロックされたトークンの数と一致することを保証する必要があるためです。 L2 上のトークンが多すぎる場合、L2 上のアセット L1 にブリッジして戻すことができないユーザーが発生します。 この場合、信頼できるブリッジが存在せず、事実上、[部分準備銀行制度](https://www.investopedia.com/terms/f/fractionalreservebanking.asp)を生み出すことになってしまいます。 一方、L1 上でのトークンが多くなりすぎると、L2 トークンをバーンしない限りトークンをリリースできなくなるため、ブリッジコントラクト内の一部のトークンは永遠にロックされた状態になってしまいます。

### IL2StandardERC20 {#il2standarderc20}

標準ブリッジを使用する L2 上のすべての ERC-20 トークンは、標準ブリッジが必要とする関数およびイベントが搭載された[このインターフェイス](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol)を提供する必要があります。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[ERC-20 に対する標準インターフェイス](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)には、`mint`および`burn`関数が含まれません。 これらのメソッドは、[ERC-20 標準](https://eips.ethereum.org/EIPS/eip-20)において必須でないため、トークンを作成、破壊するメカニズムは指定されていないのです。

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[ERC-165 インターフェイス](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol)は、コントラクトが提供する機能を特定するために用います。 [この標準については、こちらで読むことができます](https://eips.ethereum.org/EIPS/eip-165)。

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

この関数は、このコントラクトに対してブリッジされた L1 上のトークンアドレスを提供するものです。 同じ機能の逆方向の関数が存在しない点に注意してください。 L1 上のトークンについては、L2 のサポートが計画されていたか、あるいはいつ実装されたかを問わず、常にブリッジ可能である必要があります。

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

トークンをミント (作成) およびバーン (破棄) するための関数とイベントです。 トークン数が適切である（L1 上でロックされたトークン数と一致する）ことを保証するため、これらの関数を実行できるのはこのブリッジのみである必要があります。

### L2StandardERC20 {#L2StandardERC20}

[これは](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol)、`IL2StandardERC20`インターフェイスの実装です。 カスタムロジックが必要ない場合は、常にこの関数を用いてください。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[OpenZeppelin で作成した ERC-20 コントラクト](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)です。 Optimism では、既存の機能がよく監査され、資産を保持する上で十分信頼できる場合は、新たな機能を追加すべきではないと考えています。

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

これらは、通常 ERC-20 では必要になりませんが、ここでは追加で必要となる 2 つの設定パラメータです。

```solidity

    /**
     * @param _l2Bridge Address of the L2 standard bridge.
     * @param _l1Token Address of the corresponding L1 token.
     * @param _name ERC20 name.
     * @param _symbol ERC20 symbol.
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

まず、`ERC20(_name, _symbol)`で継承したコントラクトのコンストラクタを呼び出し、新たに変数を設定します。

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

[ERC-165](https://eips.ethereum.org/EIPS/eip-165)は、このように動作します。 各インターフェイスは、サポートする一連の関数を含んでおり、これらの機能の[exclusive](https://en.wikipedia.org/wiki/Exclusive_or)または[ABI 関数セレクタ](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector)として特定されます。

L2 のブリッジは、ERC-165 を健全性チェックとして用いて、資産を送信するのに用いる ERC-20 コントラクトが `IL2StandardERC20`であるか確認します。

\*\*注意：不正なコントラクトが`supportsInterface`に対して虚偽の値を返すことを防ぐメカニズムは含まれていないため、これはセキュリティ保護のメカニズム*ではなく*、健全性チェックのメカニズムです。

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

資産をミント／バーンできるのは、L2 のブリッジのみです。

`_mint`および`_burn`は、実際には、[OpenZeppelin で作成した ERC-20 コントラクト](https://ethereum.org/en/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn)で定義されています。 トークンをミント／バーンできる条件は、ERC-20 を使用する方法と同じように多種多様であるため、このコントラクトは単純に外部に露出していないのです。

## L2 ブリッジのコード {#l2-bridge-code}

これは、Optimism でブリッジを実行するコードです。 このコントラクトのソースコードは、[こちら](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol)から入手できます。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Interface Imports */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

[IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol)のインターフェースは、上述した[L1 用のインターフェイス](#IL1ERC20Bridge)とほぼ同様ですが、 以下の 2 点が大きく異なります。

1. L1 では、あなたが入金を開始し、出金を確定します。 L2 の場合、あなたは出金を開始し、入金を確定します。
2. L1 では、ETH と ERC-20 トークンを区別する必要があります。 L2 では、Optimism 上の ETH 残高は内部で、アドレス「[0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://optimistic.etherscan.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000)」の ERC-20 トークンとして処理されるため、両方で同じ関数を使います。

```solidity
/* Library Imports */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Contract Imports */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev The L2 Standard bridge is a contract which works together with the L1 Standard bridge to
 * enable ETH and ERC20 transitions between L1 and L2.
 * This contract acts as a minter for new tokens when it hears about deposits into the L1 Standard
 * bridge.
 * This contract also acts as a burner of the tokens intended for withdrawal, informing the L1
 * bridge to release L1 funds.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * External Contract References *
     ********************************/

    address public l1TokenBridge;
```

これは、L1 ブリッジのアドレスを追跡する関数です。 L1 用のブリッジの場合とは異なり、この変数は*必須*です。 L1 ブリッジのアドレスは、事前に知ることはできません。

```solidity

    /***************
     * Constructor *
     ***************/

    /**
     * @param _l2CrossDomainMessenger Cross-domain messenger used by this contract.
     * @param _l1TokenBridge Address of the L1 bridge deployed to the main chain.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * Withdrawing *
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

これら 2 つの関数は、出金を開始するものです。 L1 上のトークンアドレスを指定する必要がない点に注意してください。 L1 上で対応するトークンのアドレスは、L2 トークンが伝達するからです。

```solidity

    /**
     * @dev Performs the logic for withdrawals by burning the token and informing
     *      the L1 token Gateway of the withdrawal.
     * @param _l2Token Address of L2 token where withdrawal is initiated.
     * @param _from Account to pull the withdrawal from on L2.
     * @param _to Account to give the withdrawal to on L1.
     * @param _amount Amount of the token to withdraw.
     * @param _l1Gas Unused, but included for potential forward compatibility considerations.
     * @param _data Optional data to forward to L1. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // When a withdrawal is initiated, we burn the withdrawer's funds to prevent subsequent L2
        // usage
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

`_from`パラメータに依存*するのではなく*、`msg.sender`を使用する点に注意してください。これにより、偽造がより困難になります（私の知る限り、不可能です）。

```solidity

        // Construct calldata for l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

L1 では、ETH と ERC-20 トークンを区別する必要があります。

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

        // Send message up to L1 bridge
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * Cross-chain Function: Depositing *
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

この関数は、`L1StandardBridge`が呼び出します。

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

メッセージの発信元が適切であることを確認します。 この関数は、`_mint`を呼び出すものであり、L1 上でブリッジが所有するトークンに含まれないトークンを提供するために使用できるため、重要です。

```solidity
        // Check the target token is compliant and
        // verify the deposited token on L1 matches the L2 deposited token representation here
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

以下の健全性チェックを実行してください：

1. 正しいインターフェースがサポートされていること。
2. L2 上の ERC-20 コントラクトにおける L1 アドレスが、L1 上のトークンソースと一致すること。

```solidity
        ) {
            // When a deposit is finalized, we credit the account on L2 with the same amount of
            // tokens.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

健全性チェックに合格したら、入金を確定します。

1. トークンをミントします。
2. 適切なイベントを発行します。

```solidity
        } else {
            // Either the L2 token which is being deposited-into disagrees about the correct address
            // of its L1 token, or does not support the correct interface.
            // This should only happen if there is a  malicious L2 token, or if a user somehow
            // specified the wrong L2 token address to deposit into.
            // In either case, we stop the process here and construct a withdrawal
            // message so that users can get their funds out in some cases.
            // There is no way to prevent malicious token contracts altogether, but this does limit
            // user error and mitigate some forms of malicious contract behavior.
```

L2 のトークンアドレスが間違っており、検知可能なエラーが発生した場合、入金をキャンセルし、トークンを L1 に返却する必要があります。 これを L2 から実行する唯一の方法は、不正申し立て期間が経過してからメッセージを送信することですが、それでも、トークンを永遠に失うよりは、ユーザーにとってははるかにベターな選択でしょう。

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // switched the _to and _from here to bounce back the deposit to the sender
                _from,
                _amount,
                _data
            );

            // Send message up to L1 bridge
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## まとめ {#conclusion}

標準ブリッジは、アセットを移転する上で最も柔軟なメカニズムです。 しかし、汎用性が高いため、必ずしも使いやすいメカニズムではない場合もあります。 特に出金については、大部分のユーザーは、異議申し立て期間が存在せず、出金を最終確認するために Merkle プルーフを必要としない[サードパーティーのブリッジ](https://www.optimism.io/apps/bridges)を使いたいと考えるでしょう。

サードパーティのブリッジは通常、少額の手数料（標準ブリッジの出金にかかるガス代よりも安価な場合が多いです）で、L1 上でアセットを保持する機能を提供します。 ブリッジ（または、ブリッジを稼働するスタッフ）が L1 上での資産不足を予想する場合、L2 から必要な資産が移転されます。 これらは非常に大規模な出金になるため、出金コストは高額を対象として償却され、手数料が全体に占める割合が非常に低くなります。

この記事が、レイヤー 2 の仕組みと、明確で安全な Solidity コードの書き方について、より理解を深めることに役立つことを願っています。
