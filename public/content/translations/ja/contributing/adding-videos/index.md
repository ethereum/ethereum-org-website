---
title: "ビデオの追加"
description: "ethereum.orgへのビデオ追加に関するポリシー"
lang: ja
---

# ビデオの追加 {#adding-videos}

[ethereum.orgのビデオギャラリー](/videos/)では、コミュニティのクリエイターや信頼できる情報源による、イーサリアムおよびイーサリアムエコシステムに関するビデオを紹介しています。誰でも追加するビデオを提案できます。

## 掲載ポリシー {#listing-policy}

ethereum.orgは中立的で教育的なリソースです。ビデオギャラリーは以下の目的でキュレーションされています。

- イーサリアムの技術、エコシステム、コミュニティについてユーザーを**教育する**
- 技術的な内容の**正確性を維持する**
- イーサリアムコミュニティとの**関連性を保つ**

当サイトでは、特定の製品、トークン、または商用サービスの宣伝を主目的とするビデオは掲載しません。


## 掲載基準
## 掲載基準 {#criteria-for-inclusion}

### 必須条件 {#must-haves}

- **イーサリアムに焦点を当てている** – ビデオは主にイーサリアム、その技術、エコシステム、またはコミュニティに関するものである必要があります。一般的なブロックチェーンのトピックに関するビデオは、サイト上の教育ページを実質的にサポートまたは関連している場合、あるいはイーサリアムに言及している場合にのみ受け入れられます。
- **教育的価値** – ビデオは視聴者にイーサリアムについて何かを教えるもの、またはグローバルなイーサリアムコミュニティを称賛するものであるべきです。宣伝やマーケティングコンテンツは受け入れられません。
- **正確な情報** – 技術的な内容は事実に基づいて正確であり、最新である必要があります。非推奨となった機能に関する古いビデオは削除される場合があります。
- **高品質な制作** – ビデオは、適度にクリアな音声と映像の品質を備えている必要があります。
- **一般公開されている** – ビデオは、オープンなリソースまたはYouTubeのようなアクセス可能なプラットフォームでホストされており、ペイウォールやサインアップの要件なしに無料でアクセスできる必要があります。

### 歓迎する条件 {#nice-to-haves}

- **トランスクリプト（文字起こし）がある** – トランスクリプト付きのビデオは、アクセシビリティとSEOを向上させます。用意できない場合は、ethereum.orgチームが作成をサポートします。
- **信頼できる情報源からの提供** – 確立された教育者、研究者、および情報源からのコンテンツが優先されます。
- **タイムリーかつエバーグリーン** – 時間の経過とともに古くなる素材よりも、長期にわたって関連性を保つコンテンツが好まれます。


## ビデオの追加方法
## ビデオの追加方法 {#how-to-add-a-video}

### オプション1: イシューを作成する {#open-an-issue}

ビデオを提案したいが、自分でファイルを作成したくない場合は、ビデオの詳細を記載したGitHubイシューを作成してください。コントリビューターが追加をサポートします。

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?template=suggest_video.yaml">
  ビデオを提案する
</ButtonLink>

### オプション2: プルリクエストを作成する {#open-a-pull-request}

自分でビデオを追加したい場合は、以下の手順に従ってください。

#### ステップ1: ビデオファイルを作成する {#step-1}

以下の場所に新しいディレクトリと`index.md`ファイルを作成します。

```
public/content/videos/{your-video-slug}/index.md
```

スラッグはURLセーフで、小文字を使用し、ハイフンで区切る必要があります（例: `blockchain-101-visual-demo`）。

#### ステップ2: フロントマターを追加する {#step-2}

`index.md`に以下のYAMLフロントマターを追加します。

```yaml
---
title: "Your Video Title"
description: "A brief 1–3 sentence summary of the video."
lang: en
youtubeId: "dQw4w9WgXcQ"
uploadDate: 2025-01-15
duration: "12:30"
educationLevel: beginner
topic:
  - "your-topic"
  - "another-topic"
format: explainer
author: Channel Name
---
```

**フィールドの参照:**

| フィールド | 必須 | 説明 |
|---|---|---|
| `title` | はい | ビデオのタイトル |
| `description` | はい | 1〜3文の要約 |
| `lang` | はい | 現在は常に`en` |
| `youtubeId` | はい | YouTubeのビデオID（URLの`v=`以降の部分） |
| `uploadDate` | はい | `YYYY-MM-DD`形式の元のアップロード日 |
| `duration` | はい | `H:MM:SS`または`M:SS`形式のビデオの長さ |
| `educationLevel` | はい | `beginner`、`intermediate`、または`advanced` |
| `topic` | はい | ギャラリーのフィルタリング用トピックタグの配列 |
| `format` | はい | `explainer`、`presentation`、`interview`、`tutorial`、または`panel` |
| `author` | はい | クリエイターまたはチャンネル名 |
| `breadcrumb` | いいえ | パンくずリストナビゲーション用のカスタムショートラベル |
| `customThumbnailUrl` | いいえ | カスタムサムネイルのURL（デフォルトはYouTubeのサムネイル） |

#### ステップ3: トランスクリプトを追加する（推奨） {#step-3}

フロントマターの`---`の下に、マークダウン形式でビデオのトランスクリプトを追加します。

```markdown
---
title: "..."
# ... フロントマターの残りの部分
---

ビデオコンテンツの簡単な紹介。

### セクションタイトル (0:00)

このセクションのトランスクリプトテキスト...

### 次のセクション (5:30)

さらにトランスクリプトテキスト...
```

主要なセクションをマークするには、タイムスタンプ付きの`###`見出しを使用します。これにより、トランスクリプトが読みやすくなり、SEOが向上します。

トランスクリプトがない場合は、本文を空のままにしておけば、チームが作成します。

#### ステップ4: トピックタグを選択する {#step-4}

ギャラリーで使用されている既存のカテゴリーに一致するトピックタグを選択します。現在のカテゴリーとそのタグは以下の通りです。

- **イーサリアムの仕組み**: `how-ethereum-works`、`consensus`、`blockchain`、`cryptography`、`accounts`、`ethereum`、`intro`、`transactions`、`pos`、`smart-contracts`
- **ネットワークのアップグレード**: `network-upgrades`、`upgrades`、`pectra`、`dencun`、`eip-4844`、`blobs`、`fusaka`
- **ロードマップと優先事項**: `roadmap-and-priorities`、`pbs`、`mev`
- **スケーリングとレイヤー2**: `scaling-and-layer-2`、`scaling`、`layer-2`、`rollups`、`optimistic-rollups`、`zk-rollups`
- **ユースケース**: `use-cases`、`defi`、`finance`、`nfts`、`erc-721`、`erc-1155`、`lending`、`dapps`、`restaking`、`eigenlayer`、`dao`、`identity`、`desci`、`refi`
- **プライバシーとセキュリティ**: `privacy-and-security`、`privacy`、`authentication`
- **コミュニティストーリー**: `community-stories`、`contributing`、`translations`、`community`

ビデオがギャラリーのカテゴリーシェルフに確実に表示されるようにするには、少なくとも1つのカテゴリーキータグ（ケバブケースの太字の名前、例: `use-cases`や`scaling-and-layer-2`）を含めてください。認識されたカテゴリータグがないビデオは、「すべて」のビューと検索結果にのみ表示されます。

新しいタグを使用することもできます。これらは将来のカテゴリーのグループ化に利用できるようになります。

#### ステップ5: PRを提出する {#step-5}

`dev`ブランチに変更を加えたプルリクエストを作成します。チームが提出内容をレビューし、フィードバックを提供します。


## メンテナンス
掲載されているビデオは、以下の点を確認するために定期的にレビューされます。

- 引き続き掲載基準を満たしているか
- 正確で最新の情報が含まれているか
- ホスティングやユーチューブのリンクが機能しているか

掲載されているビデオに問題があることに気づいた場合は、[イシューを作成する](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+✨,content+🖋️&template=suggest_video.yaml)か、[website@ethereum.org](mailto:website@ethereum.org)までメールを送信してください。
## メンテナンス {#maintenance}

掲載されているビデオは、以下の点を確認するために定期的にレビューされます。

- 引き続き掲載基準を満たしているか
- 正確で最新の情報が含まれているか
- ホスティングやYouTubeのリンクが機能しているか

掲載されているビデオに問題があることに気づいた場合は、[イシューを作成する](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+✨,content+🖋️&template=suggest_video.yaml)か、[website@ethereum.org](mailto:website@ethereum.org)宛てにメールを送信してください。


## 利用規約
ethereum.orgの[利用規約](/terms-of-use/)を参照してください。ethereum.org上の情報は、一般的な情報提供のみを目的として提供されています。
## 利用規約 {#terms-of-use}

ethereum.orgの[利用規約](/terms-of-use/)をご参照ください。ethereum.org上の情報は、一般的な情報提供のみを目的として提供されています。
