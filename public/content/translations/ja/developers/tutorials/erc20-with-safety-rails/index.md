---
title: "安全対策付きのERC-20"
description: "ユーザーの単純なミスを防ぐ方法"
author: "オリ・ポメランツ"
lang: ja
tags: ["erc-20"]
skill: beginner
breadcrumb: "ERC-20の安全性"
published: 2022-08-15
---

## はじめに {#introduction}

イーサリアムの素晴らしい点の1つは、トランザクションを変更したり取り消したりできる中央管理者が存在しないことです。イーサリアムの大きな問題の1つは、ユーザーのミスや不正なトランザクションを取り消す権限を持つ中央管理者が存在しないことです。この記事では、ユーザーが[ERC-20](/developers/docs/standards/tokens/erc-20/)トークンで犯しがちな一般的なミスについて学びます。また、ユーザーがそれらのミスを回避するのに役立つERC-20コントラクトを作成する方法や、中央管理者に（アカウントの凍結などの）一定の権限を与える方法についても学びます。

なお、この記事では[オープンツェッペリンのERC-20トークンコントラクト](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)を使用しますが、その詳細については説明しません。詳細な情報は[こちら](/developers/tutorials/erc20-annotated-code)で確認できます。

完全なソースコードを確認したい場合は、以下の手順に従ってください。

1. [Remix IDE](https://remix.ethereum.org/)を開きます。
2. GitHubのクローンアイコン（![clone github icon](icon-clone.png)）をクリックします。
3. GitHubリポジトリ `https://github.com/qbzzt/20220815-erc20-safety-rails` をクローンします。
4. **contracts > erc20-safety-rails.sol** を開きます。

## ERC-20コントラクトの作成 {#creating-an-erc-20-contract}

安全対策の機能を追加する前に、ERC-20コントラクトが必要です。この記事では、[オープンツェッペリンのContracts Wizard](https://docs.openzeppelin.com/contracts/5.x/wizard)を使用します。別のブラウザで開き、以下の手順に従ってください。

1. **ERC20** を選択します。
2. 以下の設定を入力します。

   | パラメータ | 値 |
   | -------------- | ---------------- |
   | Name | SafetyRailsToken |
   | Symbol | SAFE |
   | Premint | 1000 |
   | Features | None |
   | Access Control | Ownable |
   | Upgradability | None |

3. 上にスクロールして、**Open in Remix**（Remixの場合）をクリックするか、別の環境を使用する場合は**Download**をクリックします。ここではRemixを使用していると想定して進めますが、別の環境を使用する場合は適宜変更してください。
4. これで、完全に機能するERC-20コントラクトが完成しました。`.deps` > `npm` を展開すると、インポートされたコードを確認できます。
5. コンパイル、デプロイし、コントラクトを操作して、ERC-20コントラクトとして機能することを確認します。Remixの使い方がわからない場合は、[こちらのチュートリアル](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth)を参照してください。

## 一般的なミス {#common-mistakes}

### ミスの内容 {#the-mistakes}

ユーザーは時折、間違ったアドレスにトークンを送金してしまうことがあります。ユーザーが何を意図していたのか心を読んで知ることはできませんが、頻繁に発生し、簡単に検出できる2つのタイプのエラーがあります。

1. コントラクト自身のアドレスにトークンを送金してしまうこと。例えば、[オプティミズムのOPトークン](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c)は、2か月足らずで[120,000以上](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042)のOPトークンを蓄積してしまいました。これは、おそらく人々が単に失ってしまったかなりの額の資産を表しています。

2. 空のアドレス、つまり[外部所有アカウント（EOA）](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)や[スマート・コントラクト](/developers/docs/smart-contracts)に対応していないアドレスにトークンを送金してしまうこと。これがどのくらいの頻度で発生するかについての統計はありませんが、[あるインシデントでは20,000,000トークンが失われる可能性がありました](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595)。

### 送金の防止 {#preventing-transfers}

オープンツェッペリンのERC-20コントラクトには、トークンが送金される前に呼び出される[フック `_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368)が含まれています。デフォルトではこのフックは何も行いませんが、問題がある場合にリバートするチェックなど、独自の機能を追加することができます。

このフックを使用するには、コンストラクタの後に以下の関数を追加します。

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

Solidityにあまり詳しくない場合、この関数のいくつかの部分は新しく感じるかもしれません。

```solidity
        internal virtual
```

`virtual` キーワードは、私たちが `ERC20` から機能を継承してこの関数をオーバーライドしたのと同じように、他のコントラクトが私たちから継承してこの関数をオーバーライドできることを意味します。

```solidity
        override(ERC20)
```

ERC20トークンの `_beforeTokenTransfer` の定義を[オーバーライド](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding)していることを明示的に指定する必要があります。一般的に、セキュリティの観点からは、暗黙的な定義よりも明示的な定義の方がはるかに優れています。目の前にあれば、何かをしたことを忘れることはありません。これが、どのスーパークラスの `_beforeTokenTransfer` をオーバーライドしているかを指定する必要がある理由でもあります。

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

この行は、継承元のコントラクトのうち、このフックを持つコントラクトの `_beforeTokenTransfer` 関数を呼び出します。この場合、それは `ERC20` のみであり、`Ownable` にはこのフックはありません。現在 `ERC20._beforeTokenTransfer` は何も行いませんが、将来機能が追加された場合に備えて呼び出します（コントラクトはデプロイ後に変更できないため、その場合はコントラクトを再デプロイすることになります）。

### 要件のコーディング {#coding-the-requirements}

この関数に以下の要件を追加したいと思います。

- `to` アドレスは、ERC-20コントラクト自身のアドレスである `address(this)` と等しくすることはできません。
- `to` アドレスは空であってはならず、以下のいずれかである必要があります。
  - 外部所有アカウント（EOA）。アドレスがEOAであるかどうかを直接確認することはできませんが、アドレスのETH残高を確認することはできます。EOAは、使用されなくなったとしても、ほとんどの場合残高を持っています。最後の1Weiまで空にするのは困難だからです。
  - スマート・コントラクト。アドレスがスマート・コントラクトであるかどうかをテストするのは少し難しくなります。外部コードの長さを確認するオペコードとして [`EXTCODESIZE`](https://www.evm.codes/#3b) がありますが、Solidityでは直接利用できません。そのためには、EVMアセンブリである[Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html)を使用する必要があります。Solidityから使用できる他の値（[`<address>.code` と `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types)）もありますが、これらはより多くのコストがかかります。

新しいコードを1行ずつ見ていきましょう。

```solidity
        require(to != address(this), "Can't send tokens to the contract address");
```

これが最初の要件です。`to` と `this(address)` が同じでないことを確認します。

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

これが、アドレスがコントラクトであるかどうかを確認する方法です。Yulから直接出力を受け取ることはできないため、代わりに結果を保持する変数（この場合は `isToContract`）を定義します。Yulの仕組みでは、すべてのオペコードが関数と見なされます。そのため、まず [`EXTCODESIZE`](https://www.evm.codes/#3b) を呼び出してコントラクトのサイズを取得し、次に [`GT`](https://www.evm.codes/#11) を使用してそれがゼロでないことを確認します（符号なし整数を扱っているため、当然マイナスにはなりません）。その後、結果を `isToContract` に書き込みます。

```solidity
        require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
```

そして最後に、空のアドレスに対する実際のチェックを行います。

## 管理者アクセス {#admin-access}

ミスを取り消すことができる管理者がいると便利な場合があります。悪用の可能性を減らすために、この管理者を[マルチシグ](https://blog.logrocket.com/security-choices-multi-signature-wallets/)にして、複数の人がアクションに同意しなければならないようにすることができます。この記事では、2つの管理者機能を実装します。

1. アカウントの凍結と凍結解除。これは、例えばアカウントが侵害された可能性がある場合などに役立ちます。
2. 資産のクリーンアップ。

   詐欺師は、正当性を得るために、本物のトークンのコントラクトに不正なトークンを送金することがあります。例えば、[こちらをご覧ください](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders)。正当なERC-20コントラクトは [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042) です。それを装った詐欺は [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe) です。

   また、人々が誤って正当なERC-20トークンを私たちのコントラクトに送金してしまう可能性もあります。これも、トークンを取り出す方法を用意しておきたい理由の1つです。

オープンツェッペリンは、管理者アクセスを有効にするための2つのメカニズムを提供しています。

- [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) コントラクトには単一の所有者がいます。`onlyOwner` [修飾子](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm)を持つ関数は、その所有者のみが呼び出すことができます。所有者は、所有権を他の誰かに譲渡したり、完全に放棄したりすることができます。他のすべてのアカウントの権利は通常同一です。
- [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) コントラクトには、[ロールベースのアクセス制御（RBAC）](https://en.wikipedia.org/wiki/Role-based_access_control)があります。

わかりやすくするために、この記事では `Ownable` を使用します。

### コントラクトの凍結と凍結解除 {#freezing-and-thawing-contracts}

コントラクトの凍結と凍結解除には、いくつかの変更が必要です。

- どのアドレスが凍結されているかを追跡するための、アドレスから[ブール値](https://en.wikipedia.org/wiki/Boolean_data_type)への[マッピング](https://www.tutorialspoint.com/solidity/solidity_mappings.htm)。すべての値は初期状態ではゼロであり、ブール値の場合はfalseとして解釈されます。デフォルトではアカウントは凍結されていないため、これは私たちが望む動作です。

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- アカウントが凍結または凍結解除されたときに、関心のある人に知らせるための[イベント](https://www.tutorialspoint.com/solidity/solidity_events.htm)。技術的に言えば、これらのアクションにイベントは必須ではありませんが、オフチェーンのコードがこれらのイベントをリッスンして何が起こっているかを知るのに役立ちます。他の誰かに関連する可能性のある何かが発生したときにイベントを発行することは、スマート・コントラクトにとって良いマナーと考えられています。

  イベントはインデックス化されているため、アカウントが凍結または凍結解除されたすべての回数を検索することが可能になります。

  ```solidity
    // アカウントが凍結または凍結解除されたとき
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- アカウントを凍結および凍結解除するための関数。これら2つの関数はほぼ同じであるため、凍結関数についてのみ説明します。

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm) とマークされた関数は、他のスマート・コントラクトから、またはトランザクションによって直接呼び出すことができます。

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  アカウントがすでに凍結されている場合は、リバートします。そうでない場合は、凍結してイベントを `emit` します。

- 凍結されたアカウントから資金が移動されるのを防ぐために、`_beforeTokenTransfer` を変更します。凍結されたアカウントへの送金は引き続き可能であることに注意してください。

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
  ```

### 資産のクリーンアップ {#asset-cleanup}

このコントラクトが保持しているERC-20トークンを解放するには、それらが属するトークンコントラクトの関数（[`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) または [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve)）を呼び出す必要があります。この場合、アローワンス（許可）にガスを浪費しても意味がないため、直接送金した方がよいでしょう。

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

これは、アドレスを受け取ったときにコントラクトのオブジェクトを作成するための構文です。ソースコードの一部としてERC20トークンの定義があり（4行目を参照）、そのファイルにオープンツェッペリンのERC-20コントラクトのインターフェースである[IERC20の定義](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)が含まれているため、これを行うことができます。

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

これはクリーンアップ関数であるため、おそらくトークンを残したくはないでしょう。ユーザーから手動で残高を取得する代わりに、プロセスを自動化した方がよいでしょう。

## まとめ {#conclusion}

これは完璧な解決策ではありません。「ユーザーがミスをした」という問題に対する完璧な解決策はありません。しかし、このようなチェックを使用することで、少なくともいくつかのミスを防ぐことができます。アカウントを凍結する機能は危険ではありますが、ハッカーが盗んだ資金を使用できないようにすることで、特定のハッキングの被害を制限するために使用できます。

[私の他の記事はこちらをご覧ください](https://cryptodocguy.pro/)。