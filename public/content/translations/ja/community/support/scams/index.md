---
title: 詐欺に関するヘルプと報告
description: 詐欺にあった場合の対処法、残りの資産を保護する方法、詐欺の報告先について説明します。
lang: ja
---

# 詐欺に遭った、または資金を失った場合 {#scam-help}

暗号通貨詐欺は、金融やテクノロジーの専門家を含め、経験レベルを問わずあらゆる人々をターゲットにしています。 あなたは一人ではありません。このページを見ていることは、正しい第一歩です。

<Alert variant="error">
<AlertEmoji text=":rotating_light:"/>
<AlertContent>
<AlertDescription>

**ブロックチェーンのトランザクションを元に戻すことは誰にもできません。** 手数料を支払えば資金を回収できると主張してあなたに連絡してくる人がいれば、それはほぼ間違いなく二次的な詐欺です。 以下の[リカバリー詐欺](#recovery-scams)をご覧ください。

</AlertDescription>
</AlertContent>
</Alert>

## 残りの資産を保護する {#secure-assets}

詐欺師とやり取りした場合や、ウォレットが不正使用された疑いがある場合は、直ちに以下の手順を実行してください。

1. **残りの資金を移動する:** 詐欺師がアクセスできない新しい安全なウォレットに移動します。
2. **トークンの承認を取り消す。** 詐欺師は、無制限のトークン消費を承認させようとすることがよくあります。 これらの権限を取り消すことで、ウォレットからのさらなる資金流出を防ぎます。
3. **パスワードを変更する:** リンクされている可能性のある取引所アカウントのパスワードを変更します。
4. **2要素認証(2FA)を有効にする:** すべての暗号通貨関連のアカウントで有効にします。

### トークンの承認を取り消す方法 {#revoke-approvals}

dappやスマートコントラクトとやり取りする際、トークンを使用する権限を与えている場合があります。 詐欺師に騙されて悪意のある契約を承認してしまった場合、最初の詐欺の後もトークンを流出させ続ける可能性があります。

以下のツールを使用して承認を確認し、取り消してください。

- [Revoke.cash](https://revoke.cash/): ウォレットを接続して、すべてのアクティブな承認を確認し、取り消します。
- [Revokescout](https://revoke.blockscout.com/): Blockscoutを介して承認を確認し、取り消します。
- [Etherscan Token Approval Checker](https://etherscan.io/tokenapprovalchecker): Etherscanを介してトークンの承認を確認し、取り消します。

<DocLink href="/guides/how-to-revoke-token-access/">
  ステップバイステップガイド: トークンアクセスを取り消す方法
</DocLink>

## 詐欺アドレスとウェブサイトを報告する {#report}

報告は他のユーザーへの警告となり、法執行機関の調査に役立つ場合があります。 トランザクションハッシュ、ウォレットアドレス、スクリーンショット、詐欺師とのあらゆるコミュニケーションなど、すべてを記録してください。

### 詐欺アドレスを報告する {#report-address}

- [Chainabuse](https://www.chainabuse.com/): コミュニティ主導の詐欺および不正行為報告データベースです。 報告を提出し、既知の詐欺アドレスを検索します。
- [Etherscanレポート](https://info.etherscan.com/report-address/): 最も使用されているイーサリアムブロックエクスプローラーでアドレスにフラグを立てます。
- [CryptoScamDB](https://cryptoscamdb.org/): 暗号通貨詐欺を追跡するオープンソースデータベースです。

### 詐欺ウェブサイトまたはソーシャルメディアアカウントを報告する {#report-website}

- [PhishTank](https://phishtank.org/): フィッシングURLを提出して検証します。
- [Googleセーフブラウジング](https://safebrowsing.google.com/safebrowsing/report_phish/): フィッシングサイトをGoogleに報告して、Chromeやその他のブラウザでブロックされるようにします。
- [Netcraft](https://report.netcraft.com/report/mistake): 悪意のある不正なウェブサイトを報告します。
- 詐欺が発生したソーシャルメディアプラットフォームで直接報告します(Twitter/X、Discord、Telegramにはすべて報告機能があります)。

### 法執行機関に報告する {#report-law-enforcement}

- **米国:** [FBIインターネット犯罪苦情センター(IC3)](https://www.ic3.gov/)
- **英国:** [Action Fraud](https://www.actionfraud.police.uk/)
- **欧州連合:** [ユーロポール](https://www.europol.europa.eu/report-a-crime)
- **その他の国:** 現地の警察に報告書を提出してください。 暗号通貨詐欺は、ほとんどの法域で犯罪とされています。

## 何が起こったかを分析する {#analyze}

資金がどこに送金されたかを理解することは、報告に役立ち、資金が中央集権型取引所に送金された場合には、回収活動を支援する可能性があります。

- [Blockscout](https://eth.blockscout.com/): トランザクションハッシュやウォレットアドレスを検索して資金の送金先を確認できる、オープンソースのブロックエクスプローラーです。
- [Etherscan](https://etherscan.io/): トランザクションハッシュやウォレットアドレスを検索して、資金の送金先を確認できます。
- [Chainabuseルックアップ](https://www.chainabuse.com/): アドレスが他の被害者によってすでに報告されているかどうかを確認します。
- BlockSecによる[MetaSleuth](https://metasleuth.io/): 資金の流れをマッピングする視覚的なトランザクション追跡ツールです。

**資金が中央集権型取引所**(Coinbase、Binance、Krakenなど)に送金された場合は、直ちにサポートチームに連絡し、取引の詳細を伝えてください。 取引所は、詐欺のフラグが立てられたアカウントを凍結することがあります。

## 厳しい現実 {#hard-truth}

イーサリアムは分散型であるため、中央集権的な機関がトランザクションを元に戻したり、盗まれた資金を回収したりすることはできません。 トランザクションがブロックチェーン上で確認されると、それは確定となります。

それでも報告することには価値があります。 報告は、法執行機関が組織的な詐欺グループを追跡するのに役立ち、ChainabuseやEtherscanでアドレスにフラグを立てることで、将来の潜在的な被害者に警告することができます。

## 注意すべき詐欺の種類 {#scam-types}

<ExpandableCard
title="景品やエアドロップ詐欺"
contentPreview="無料でETHを配布している人はいません。 これらのオファーは常に詐欺です。"
eventCategory="SupportScamPage"
eventName="clicked giveaway scam"

>

詐欺師は、あなたのETHを増やすとか、無料のトークンをあげると約束して、偽の景品企画を作成します。 彼らはしばしばヴィタリック・ブテリンのような有名人になりすまします。 「景品企画」のアドレスにETHを送っても、何も返ってきません。

**覚えておいてください:** ヴィタリックやその他の著名人が、あなたにETHを送るように頼むことは決してありません。

[よくある詐欺の詳細](/security/#common-scams)

</ExpandableCard>

<ExpandableCard
title="なりすましと偽のサポート"
contentPreview="イーサリアムやethereum.orgの誰も、あなたに最初に連絡することはありません。"
eventCategory="SupportScamPage"
eventName="clicked impersonation scam"

>

詐欺師は、Discord、Telegram、ソーシャルメディア上でイーサリアムのチームメンバー、モデレーター、またはサポート担当者になりすまします。 彼らは、ヘルプを提供したり、アカウントに問題があると主張したりするダイレクトメッセージを送ってくることがあります。

**覚えておいてください:**

- 「イーサリアムサポートチーム」というものは存在しません。
- 本物のモデレーターが最初にDMを送ってくることはありません。
- いかなる理由があっても、シードフレーズや秘密鍵を誰とも共有しないでください。
- 未承諾のメッセージで送られてきたリンクは絶対にクリックしないでください。

</ExpandableCard>

<ExpandableCard
title="リカバリー詐欺"
contentPreview="詐欺に遭った後は、偽の'暗号通貨回収の専門家'に注意してください。"
eventCategory="SupportScamPage"
eventName="clicked recovery scam"

>

リカバリー詐欺は、すでに資金を失った人々を特にターゲットにしています。 詐欺師は、ソーシャルメディアで詐欺に遭ったと話している人々を監視し、「ブロックチェーン調査員」や「暗号通貨回収の専門家」を装って接触してきます。

彼らは、前払いの手数料で盗まれた暗号通貨を追跡・回収すると約束します。 あなたが支払った後、彼らは姿を消します。

**正当なサービスでブロックチェーンのトランザクションを元に戻すことはできません。** これを約束する者は誰であれ、嘘をついています。 これは最も一般的な二次被害詐欺の一つです。

</ExpandableCard>

<ExpandableCard
title="フィッシングサイトと偽アプリ"
contentPreview="詐欺サイトは本物のウォレットや取引所を模倣して、あなたの認証情報を盗みます。"
eventCategory="SupportScamPage"
eventName="clicked phishing scam"

>

フィッシングサイトは、本物のウォレットアプリ、取引所、またはDeFiプラットフォームとそっくりに見えます。 彼らはあなたを騙してシードフレーズを入力させたり、ウォレットを接続させたりして、資金を抜き取ります。

**自分を守るために:**

- ウォレットを接続する前に、必ずURLを確認してください。
- 定期的に使用する公式サイトをブックマークしてください。
- どのウェブサイトにもシードフレーズを入力しないでください。 正当なアプリがそれを要求することはありません。
- [PhishTank](https://phishtank.org/)を使用して、疑わしいURLを確認してください。

<DocLink href="/guides/how-to-id-scam-tokens/">
  詐欺トークンの見分け方
</DocLink>

</ExpandableCard>

<DocLink href="/security/">
  イーサリアムのセキュリティと詐欺対策の完全ガイド
</DocLink>
