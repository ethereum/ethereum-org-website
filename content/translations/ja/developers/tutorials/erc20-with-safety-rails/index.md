---
title: ERC-20の安全策
description: つまらないミスをするのを避ける方法
author: Ori Pomerantz
lang: ja
tags:
  - "ERC-20"
skill: beginner
published: 2022-08-15
---

## はじめに {#introduction}

イーサリアムの素晴らしい点の1つとして、トランザクションを変更したり取り消したりできる中央機関が存在しないことがあります。 反対に、イーサリアムでは、ユーザーの間違いや不正なトランザクションを取り消す権限を持つ中央機関が存在しないことがデメリットになりえます。 この記事では、[ERC-20](/developers/docs/standards/tokens/erc-20/)トークンでユーザーがしてしまうよくあるミスや、そのミスを防ぐトークンの作成方法について説明します。また、中央機関に権限を与えることについても説明します (例えば、アカウントの凍結など) 。

注意: [OpenZeppelin ERC-20トークンコントラクト](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)を使いますが、このコントラクト自体について詳しくは説明しません。 ERC-20トークンコントラクトの詳細については、[こちら](/developers/tutorials/erc20-annotated-code)をご覧ください。

全てのソースコードを表示したい場合は、次のようにします。

1. [Remix IDE](https://remix.ethereum.org/)を開きます。
2. クローンGitHubアイコン (![clone github icon](icon-clone.png)) をクリックします。
3. GitHubリポジトリ`https://github.com/qbzzt/20220815-erc20-safety-rails`をクローンします。
4. 「**contracts > erc20-safety-rails.sol**」を開きます。

## ERC-20コントラクトの作成 {#creating-an-erc-20-contract}

安全策を講じるための機能を追加する前に、ERC-20コントラクトが必要になります。 この記事では、[OpenZeppelin Contracts Wizard](https://docs.openzeppelin.com/contracts/4.x/wizard)を使って加えます。 もう一つブラウザで開いて、次の手順に従ってください。

1. **ERC20**を選びます。
2. 次の設定値を入力します。

   | パラメータ          | 値                |
   | -------------- | ---------------- |
   | 名前             | SafetyRailsToken |
   | Symbol         | SAFE             |
   | Premint        | 1000             |
   | 機能             | なし               |
   | Access Control | Ownable          |
   | Upgradability  | なし               |

3. 上にスクロールして (Remixを使う場合は) **Open in Remix**をクリックしてください。別の環境を使う場合は、**ダウンロード**をクリックしてください。 ここでは、Remixを使用していることとします。他の環境を使用する場合は、適宜変更してください。
4. これで完全なERC-20コントラクトがあります。 「`.deps` > `npm`」でインポートしたコードを展開して確認できます。
5. コントラクトをコンパイル、デプロイ、そして操作してERC-20 コントラクトとして機能していることを確認します。 Remixの使用方法を学びたいならば、[このチュートリアルが役立ちます](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth)。

## よくあるミス {#common-mistakes}

### ミスのタイプ {#the-mistakes}

ユーザーは、間違ったアドレスへトークンを送信してしまうことがあります。 なぜ間違って送ってしまった理由を知ることはできませんが、よく発生するミスのタイプで頻繁に検出できる次のものがあります。

1. トークンをコントラクト自身のアドレスに送信する。 例えば、[OptimismのOPトークン](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c)では、[12万](https://optimistic.etherscan.io/address/0x4200000000000000000000000000000000000042#tokentxns)を超えるOPトークンが2か月もしないうちに累積していることがわかります。 これは、人々の膨大な資産がただ単に失われていることを表しています。

2. トークンを[外部所有アカウント](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)や[スマートコントラクト](/developers/docs/smart-contracts)に相当しない空アドレスへ送信する。 このミスがどのくらいの頻度で発生するかについての統計はありません。[1件のインシデントで2千万トークンを失っているものもあります](https://gov.optimism.io/t/message-to-optimism-community-from-Wintermute/2595)。

### 送金を防止する {#preventing-transfers}

OpenZeppelinのERC-20コントラクトには、[`_beforeTokenTransfer`というフック](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368)があり、トークンを送金する前に呼び出されます。 デフォルトでは、このフックは何も行いません。しかし、独自の機能をフックに掛けることで、問題がある場合に元に戻すなどのチェックが可能です。

このフックを使用するには、コンストラクタの後に次の関数を加えます。

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

Solidityにあまり詳しくない人ならば、次の関数の箇所は馴染みがないかもしれません。

```solidity
        internal virtual
```

上記の`virtual`キーワードでは、`ERC20`から機能を継承し、関数をオーバーライドして、他のコントラクトも同様にこのコントラクトの機能を継承して、この関数をオーバーライドできるようにしています。

```solidity
        override(ERC20)
```

ERC20トークンの`_beforeTokenTransfer`の定義を[オーバーライド](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding)することを明示的に指定しなければなりません。 一般的なセキュリティの観点において、暗黙的な定義よりも明示的な定義の方がはるかに良いとされています。記述されていれば、それが実行されることを忘れないからです。 オーバーライドするスーパークラスの `_beforeTokenTransfer`を指定しなければならないのも同様の理由です。

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

上記は、継承しているコントラクトから継承元のコントラクトの `_beforeTokenTransfer`関数を呼び出しています。 この場合は、`ERC20`のみであり、`Ownable`にはこのフックがありません。 現時点では、`ERC20._beforeTokenTransfer`は何も行いません。コントラクトはデプロイ後に変更できないため、再デプロイによって将来に機能が追加された場合に備えて呼び出しています。

### 要件のコーディング {#coding-the-requirements}

次の要件を関数に対して加えたいと思います。

- `to`アドレスをERC-20コントラクト自体のアドレスである`address(this)`と等しくできないようにすること。
- `to`アドレスを空にすることができないこと。また、次のいずれかであること。
  - 外部所有アカウント (EOA) 。 アドレスがEOAであるかどうかを直接確認することはできませんが、アドレスのETH残高を確認することはできます。 EOAは、たとえ使用されなくなったとしても、ほとんどの場合、残高が残っています。これは、最後のweiまで使うのは困難だからです。
  - スマートコントラクト。 アドレスがスマートコントラクトであるかどうかのテストは少し大変です。 [`EXTCODESIZE`](https://www.evm.codes/#3b)という外部コードの長さをチェックするオペコードがありますが、Solidityでは直接使用することはできません。 これには、[Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html)というEVMアセンブリを使う必要があります。 Solidityから使用できる他の値 ([ `<address>.code`および `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types)) もありますが、コストがそれよりも高くなります。

新しいコードを1行ずつ見てみましょう。

```solidity
        require(to != address(this), "Can't send tokens to the contract address");
```

これが最初の要件です。`to`と`this(address)`が等しくないことを確認しています。

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

上記は、アドレスがコントラクトかどうかを確認する方法です。 Yulから出力を直接受け取ることはできません。そのため、代わりに結果を保持する変数を定義しています (この場合は `isToContract`) 。 Yulでは、すべてのオペコードが関数として動作します。 したがって、最初に[`EXTCODESIZE`](https://www.evm.codes/#3b)を呼び出してコントラクトサイズを取得し、次に[`GT`](https://www.evm.codes/#11)でゼロでないことを確認します (符号なし整数を扱っているため、当然、負の値にすることはできません) 。 その後、結果を`isToContract`に書き込んでいます。

```solidity
        require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
```

最後に、空アドレスのチェックをしています。

## 管理者アクセス {#admin-access}

間違いを取り消せる管理者がいると、便利なことがあります。 悪用される可能性を減らすには、管理者を[マルチシグ](https://blog.logrocket.com/security-choices-multi-signature-wallets/)にして、各アクションに対する複数人の同意を必要にします。 この記事では、次の2つの管理機能を持つものとします。

1. アカウントの凍結と解凍。 これは、アカウントが侵害された可能性がある場合などに役立ちます。
2. アセットのクリーンアップ。

   時には、詐欺師が正当であると思わせるために、本物のトークンコントラクトに偽物のトークンを送信することがあります。 [こちら](https://optimistic.etherscan.io/token/0x2348b1a1228ddcd2db668c3d30207c3e1852fbbe?a=0x4200000000000000000000000000000000000042)に、その例があります。 正当なERC-20コントラクトは、[0x4200....0042](https://optimistic.etherscan.io/address/0x4200000000000000000000000000000000000042)です。 装っているスキャムは、[0x234....bbe](https://optimistic.etherscan.io/address/0x2348b1a1228ddcd2db668c3d30207c3e1852fbbe)です。

   また、正当なERC-20トークンを誤ってコントラクト自体に送信してしまう可能性もあります。これが、アセットのクリーンアップ方法が必要になるもう1つの理由です。

OpenZeppelinでは、管理者アクセスを可能にする次の2つのメカニズムを提供しています。

- [`Ownable`](https://docs.openzeppelin.com/contracts/4.x/access-control#ownership-and-ownable)コントラクトでは、所有者は1人です。 `onlyOwner` [modifier](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm)のある関数は、その所有者のみしか呼び出せません。 所有者は、所有権を他の人に譲渡することも、完全に放棄することもできます。 通常、それ以外のアカウントの権限は変わりません。
- [`AccessControl`](https://docs.openzeppelin.com/contracts/4.x/access-control#role-based-access-control)コントラクトでは、[ロールベースのアクセス制御 (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control)機能があります。

この記事では、簡潔にするために`Ownable`を使っています。

### コントラクトの凍結および解凍 {#freezing-and-thawing-contracts}

コントラクトの凍結と解凍において、次のいくつかの変更が必要になります。

- どのアドレスが凍結されているかを追跡するために、アドレスを[ブール値](https://en.wikipedia.org/wiki/Boolean_data_type)で[マッピング](https://www.tutorialspoint.com/solidity/solidity_mappings.htm)します。 すべての値の初期値はゼロです。これは、ブール値でfalseとして解釈されます。 デフォルトでは、アカウントを凍結しないため、このようにしています。

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- アカウントが凍結または解除されたときに、関係者に対して[イベント](https://www.tutorialspoint.com/solidity/solidity_events.htm)で通知します。 技術的観点では、アカウントの凍結および解除におけるアクションでは、イベントは必要ありません。しかし、オフチェーンのコードで、これらのイベントをリッスンして何が起こっているかわかると便利です。 関係者に対して何かが発生したときに、スマートコントラクトでイベントを発行することは、良いマナーであるとされています。

  どのタイミングでアカウントの凍結または解除されたかを検索できるように、イベントにインデックスを付けています。

  ```solidity
    // When accounts are frozen or unfrozen
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- アカウントを凍結および解凍するための関数。 これらの2つの関数は、ほぼ同一であるため凍結する関数についてのみ説明します。

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm)が付けられた関数では、他のスマートコントラクトまたはトランザクションから直接呼び出すことができます。

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  アカウントがすでに凍結されている場合は、処理を取消します。 それ以外の場合は、凍結してイベントを`emit`します。

- `_beforeTokenTransfer`を凍結されたアカウントから資金が移動されないよう変更します。 凍結されたアカウントへの送金は、引き続き可能であることに注意してください。

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
  ```

### アセットのクリーンアップ {#asset-cleanup}

コントラクト自体が保持しているERC-20トークンを解放するには、それに属しているトークンコントラクトの関数である[`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer)または[`approve`](https://eips.ethereum.org/EIPS/eip-20#approve)を呼び出す必要があります。 この場合、Allowanceで無駄にガスを消費するのはもったいないため、直接送金 (transfer) の方がよいでしょう。

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

これは、アドレスがトークンを受け取った場合に、コントラクトにオブジェクトを作成するための構文です。 ERC20トークンがソースコード (4行目を参照) の一部として定義されており、OpenZeppelinのERC-20コントラクトのインターフェースである[IERC20の定義](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)がそのファイルに含まれているためこれが可能です。

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

上記は、すべてのトークンをクリーンアップする関数です。 このプロセスを自動化することで、ユーザーから手動で残高を取得するよりも効率化できます。

## まとめ {#conclusion}

「ユーザーの間違い」によって発生する問題に完璧な解決策はないため、これらは完全な解決策ではありません。 しかしながら、この記事のようなチェックをすることで、少なくともいくつかのミスを防止できます。 アカウントの凍結機能は危険を伴うものの、ハッカーが資金を盗むことを防ぎ、ハッキングによる被害を特定の範囲内におさめるために使うことができます。
