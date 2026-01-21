---
title: 安全策を備えたERC-20
description: ユーザーのうっかりミスを防ぐ方法
author: Ori Pomerantz
lang: ja
tags: [ "ERC-20" ]
skill: beginner
published: 2022-08-15
---

## はじめに {#introduction}

イーサリアムの素晴らしい点の1つとして、トランザクションを変更したり取り消したりできる中央機関が存在しないことがあります。 反対に、イーサリアムでは、ユーザーの間違いや不正なトランザクションを取り消す権限を持つ中央機関が存在しないことがデメリットになりえます。 この記事では、[ERC-20](/developers/docs/standards/tokens/erc-20/)トークンでユーザーがしてしまうよくあるミスや、そのミスを防ぐトークンの作成方法について説明します。また、中央機関に権限を与えることについても説明します (例えば、アカウントの凍結など) 。

この記事では[OpenZeppelin ERC-20トークンコントラクト](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)を使用しますが、その詳細については説明しませんのでご注意ください。 この情報については、[こちら](/developers/tutorials/erc20-annotated-code)をご覧ください。

完全なソースコードを確認したい場合は、以下を参照してください。

1. [Remix IDE](https://remix.ethereum.org/)を開きます。
2. GitHubのクローンアイコン(![GitHubのクローンアイコン](icon-clone.png))をクリックします。
3. GitHubリポジトリ`https://github.com/qbzzt/20220815-erc20-safety-rails`をクローンします。
4. **contracts > erc20-safety-rails.sol**を開きます。

## ERC-20コントラクトの作成 {#creating-an-erc-20-contract}

安全策を講じるための機能を追加する前に、ERC-20コントラクトが必要になります。 この記事では、[OpenZeppelin Contracts Wizard](https://docs.openzeppelin.com/contracts/5.x/wizard)を使用します。 別のブラウザで開き、以下の手順に従ってください。

1. **ERC20**を選択します。

2. 次の設定値を入力します。

   | パラメータ          | 値                |
   | -------------- | ---------------- |
   | 名前             | SafetyRailsToken |
   | 記号             | SAFE             |
   | Premint        | 1000             |
   | 機能             | なし               |
   | Access Control | Ownable          |
   | Upgradability  | なし               |

3. 上にスクロールして、(Remixの場合は) **Open in Remix** を、別の環境を使用する場合は **Download** をクリックします。 ここでは、Remixを使用していることとします。他の環境を使用する場合は、適宜変更してください。

4. これで完全に機能するERC-20コントラクトができました。 `.deps` > `npm` を展開すると、インポートされたコードを確認できます。

5. コントラクトをコンパイル、デプロイ、そして操作して、ERC-20コントラクトとして機能していることを確認します。 Remixの使い方を学ぶ必要がある場合は、[このチュートリアル](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth)を使用してください。

## よくある間違い {#common-mistakes}

### 間違い {#the-mistakes}

ユーザーは、間違ったアドレスへトークンを送信してしまうことがあります。 ユーザーが何を意図していたかを知ることはできませんが、頻繁に発生し、かつ検出しやすいエラーには2つのタイプがあります。

1. トークンをコントラクト自身のアドレスに送信する。 例えば、[OptimismのOPトークン](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c)は、2か月足らずで[120,000](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042)以上のOPトークンを蓄積してしまいました。 これは、おそらく人々が失ってしまったであろう、かなりの額の資産に相当します。

2. トークンを空のアドレス、つまり[外部所有アカウント](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)や[スマートコントラクト](/developers/docs/smart-contracts)ではないアドレスに送信してしまうこと。 これがどのくらいの頻度で発生するかについての統計はありませんが、[あるインシデントでは20,000,000トークンが失われる可能性がありました](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595)。

### 送金の防止 {#preventing-transfers}

OpenZeppelinのERC-20コントラクトには、トークンが送金される前に呼び出される[`_beforeTokenTransfer`というフック](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368)が含まれています。 デフォルトでは、このフックは何も行いませんが、問題がある場合にトランザクションをリバートするチェックなど、独自の機能を実装するために利用できます。

このフックを使用するには、コンストラクタの後に次の関数を加えます。

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

Solidityにあまり詳しくない方には、この関数の一部の要素は目新しいかもしれません。

```solidity
        internal virtual
```

`virtual`キーワードは、私たちが`ERC20`から機能を継承してこの関数をオーバーライドしたのと同じように、他のコントラクトが私たちのコントラクトから継承してこの関数をオーバーライドできることを意味します。

```solidity
        override(ERC20)
```

`_beforeTokenTransfer`のERC20トークン定義を[オーバーライド](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding)していることを明示的に指定する必要があります。 一般的に、セキュリティの観点からは、暗黙的な定義よりも明示的な定義の方がはるかに優れています。目の前にあれば、何かをしたことを忘れることはありません。 これが、どのスーパークラスの`_beforeTokenTransfer`をオーバーライドしているかを指定する必要がある理由でもあります。

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

この行は、継承元のコントラクトのうち、`_beforeTokenTransfer`関数を持つものの関数を呼び出します。 この場合、それは`ERC20`のみです。`Ownable`にはこのフックはありません。 現在`ERC20._beforeTokenTransfer`は何も行いませんが、将来機能が追加された場合に備えて呼び出します (コントラクトはデプロイ後に変更できないため、その場合はコントラクトを再デプロイすることになります)。

### 要件のコーディング {#coding-the-requirements}

この関数に以下の要件を追加します。

- `to`アドレスは、ERC-20コントラクト自体のアドレスである`address(this)`であってはならない。
- `to`アドレスは空であってはならず、以下のいずれかでなければならない。
  - 外部所有アカウント (EOA)。 アドレスがEOAであるかどうかを直接確認することはできませんが、アドレスのETH残高は確認できます。 EOAは、使用されなくなった後でもほとんどの場合、残高が残っています。最後のweiまで使い切るのは困難だからです。
  - スマートコントラクト。 アドレスがスマートコントラクトであるかどうかのテストは、少し難しくなります。 外部コード長をチェックする[`EXTCODESIZE`](https://www.evm.codes/#3b)というオペコードがありますが、Solidityで直接利用することはできません。 そのためには、EVMアセンブリである[Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html)を使用する必要があります。 Solidityから使用できる他の値 ([`<address>.code` や `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types)) もありますが、それらはより多くのコストがかかります。

新しいコードを1行ずつ見ていきましょう。

```solidity
        require(to != address(this), "コントラクトアドレスにトークンを送信することはできません");
```

これが最初の要件で、`to`と`address(this)`が同じでないことを確認します。

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

このようにして、アドレスがコントラクトであるかどうかを確認します。 Yulから直接出力を受け取ることはできないので、代わりに結果を保持する変数(この場合は`isToContract`)を定義します。 Yulは、すべてのオペコードが関数としてみなされる仕組みになっています。 そこで、まず[`EXTCODESIZE`](https://www.evm.codes/#3b)を呼び出してコントラクトのサイズを取得し、次に[`GT`](https://www.evm.codes/#11)を使ってそれがゼロでないことを確認します(符号なし整数を扱っているので、もちろん負になることはありません)。 そして、その結果を`isToContract`に書き込みます。

```solidity
        require(to.balance != 0 || isToContract, "空のアドレスにトークンを送信することはできません");
```

そして最後に、空のアドレスに対する実際のチェックを行います。

## 管理者アクセス {#admin-access}

間違いを取り消せる管理者がいると、便利なことがあります。 悪用の可能性を減らすため、この管理者を[マルチシグ](https://blog.logrocket.com/security-choices-multi-signature-wallets/)にして、あるアクションに対して複数の人が合意しなければならないようにすることができます。 この記事では、2つの管理機能について説明します。

1. アカウントの凍結と凍結解除。 これは、例えば、アカウントが侵害された可能性がある場合に便利です。
2. アセットのクリーンアップ。

   詐欺師が正当性を装うために、本物のトークンコントラクトに偽のトークンを送ることがあります。 例えば、[こちら](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders)をご覧ください。 正規のERC-20コントラクトは [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042) です。 それになりすました詐欺コントラクトは [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe) です。

   また、ユーザーが正規のERC-20トークンを誤って私たちのコントラクトに送ってしまう可能性もあります。これも、それらを取り出す方法が必要となるもう一つの理由です。

OpenZeppelinは、管理者アクセスを可能にする2つのメカニズムを提供しています。

- [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable)コントラクトには、単一の所有者がいます。 `onlyOwner` [修飾子](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm)を持つ関数は、その所有者のみが呼び出すことができます。 所有者は、所有権を他の誰かに譲渡したり、完全に放棄したりすることができます。 他のすべてのアカウントの権限は、通常は同一です。
- [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control)コントラクトには、[ロールベースのアクセス制御(RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control)があります。

この記事では、簡潔にするために`Ownable`を使用します。

### コントラクトの凍結と凍結解除 {#freezing-and-thawing-contracts}

コントラクトの凍結と凍結解除には、いくつかの変更が必要です。

- どのアドレスが凍結されているかを追跡するための、アドレスから[ブール値](https://en.wikipedia.org/wiki/Boolean_data_type)への[マッピング](https://www.tutorialspoint.com/solidity/solidity_mappings.htm)。 すべての値は最初はゼロで、ブール値の場合はfalseと解釈されます。 デフォルトではアカウントは凍結されていないので、これは望ましい動作です。

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- アカウントが凍結または凍結解除されたときに関係者に通知するための[イベント](https://www.tutorialspoint.com/solidity/solidity_events.htm)。 技術的には、これらのアクションにイベントは必須ではありませんが、オフチェーンのコードがこれらのイベントをリッスンして何が起こっているかを知るのに役立ちます。 他の誰かに関連する可能性のあることが起こったときに、スマートコントラクトがイベントを発行することは、良いマナーとされています。

  イベントにはインデックスが付けられるため、あるアカウントが凍結または凍結解除されたすべての回を検索できるようになります。

  ```solidity
    // アカウントが凍結または凍結解除されたとき
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- アカウントを凍結および凍結解除するための関数。 これらの2つの関数はほぼ同一なので、ここでは凍結関数についてのみ説明します。

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm)とマークされた関数は、他のスマートコントラクトから、またはトランザクションによって直接呼び出すことができます。

  ```solidity
    {
        require(!frozenAccounts[addr], "アカウントはすでに凍結されています");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  アカウントがすでに凍結されている場合は、リバートします。 そうでなければ、アカウントを凍結し、イベントを`emit`します。

- 凍結されたアカウントから資金が移動されないように`_beforeTokenTransfer`を変更します。 凍結されたアカウントへの送金は、引き続き可能であることに注意してください。

  ```solidity
       require(!frozenAccounts[from], "アカウントは凍結されています");
  ```

### アセットのクリーンアップ {#asset-cleanup}

このコントラクトが保有するERC-20トークンを解放するには、それらが属するトークンコントラクトの[`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer)または[`approve`](https://eips.ethereum.org/EIPS/eip-20#approve)のいずれかの関数を呼び出す必要があります。 この場合、Allowanceでガスを無駄にする意味はないので、直接送金した方が良いでしょう。

```solidity
    function cleanupERC20(
        address erc20,
        address dest
    )
        public
        onlyOwner
    {
        IERC20 token = IERC20(erc20);
```

これは、アドレスを受け取ったときにコントラクトのオブジェクトを作成するための構文です。 これが可能なのは、ソースコードの一部としてERC20トークンの定義があり(4行目を参照)、そのファイルにはOpenZeppelinのERC-20コントラクトのインターフェースである[IERC20の定義](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)が含まれているためです。

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

これはクリーンアップ関数なので、トークンを残さないようにします。 ユーザーから手動で残高を取得する代わりに、プロセスを自動化した方が良いでしょう。

## 結論 {#conclusion}

これは完璧な解決策ではありません。「ユーザーの間違い」によって発生する問題に完璧な解決策はないのです。 しかし、この種のチェックを使用することで、少なくともいくつかの間違いを防ぐことができます。 アカウントを凍結する機能は危険を伴いますが、ハッカーから盗まれた資金を奪うことで、特定のハッキングによる被害を限定するために使用できます。

[私の他の作品はこちらでご覧いただけます](https://cryptodocguy.pro/).
