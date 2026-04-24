---
title: Video Ekleme
description: ethereum.org'a video ekleme politikası
lang: tr
---

# Video Ekleme {#adding-videos}

[ethereum.org video galerisi](/videos/), topluluk içerik üreticilerinden ve güvenilir kaynaklardan Ethereum ve Ethereum ekosistemi hakkında videolar içerir. Herkes eklenecek bir video önerebilir.

## Listeleme politikası {#listing-policy}

Ethereum.org tarafsız, eğitici bir kaynaktır. Video galerisi şunlar için derlenmiştir:

- Kullanıcıları Ethereum teknolojisi, ekosistemi ve topluluğu hakkında **eğitmek**
- Teknik içeriğinde **doğru kalmak**
- Ethereum topluluğuyla **alakalı kalmak**

Site, öncelikli olarak belirli bir ürünü, Token'ı veya ticari hizmeti tanıtan videoları listelemez.

## Dahil edilme kriterleri {#criteria-for-inclusion}

### Olmazsa olmazlar {#must-haves}

- **Ethereum odaklı** – Video öncelikli olarak Ethereum, teknolojisi, ekosistemi veya topluluğu hakkında olmalıdır. Genel Blokzincir konuları hakkındaki videolar, yalnızca sitedeki eğitici bir sayfayı önemli ölçüde destekliyor veya onunla ilişkiliyse ya da Ethereum'a atıfta bulunuyorsa kabul edilebilir.
- **Eğitici değer** – Video, izleyicilere Ethereum hakkında bir şeyler öğretmeli veya küresel Ethereum topluluğunu kutlamalıdır. Promosyon veya pazarlama içeriği kabul edilmeyecektir.
- **Doğru bilgi** – Teknik içerik olgusal olarak doğru ve güncel olmalıdır. Kullanımdan kaldırılan özellikler hakkındaki güncel olmayan videolar kaldırılabilir.
- **Kaliteli prodüksiyon** – Video makul ölçüde net bir ses ve görüntü kalitesine sahip olmalıdır.
- **Herkese açık** – Video, açık bir kaynakta veya YouTube gibi erişilebilir bir platformda barındırılmalı ve bir ödeme duvarı veya kayıt zorunluluğu olmadan serbestçe erişilebilir olmalıdır.

### Olsa iyi olurlar {#nice-to-haves}

- **Transkripti olması** – Transkripti olan videolar erişilebilirliği ve SEO'yu iyileştirir. Eğer bir transkriptiniz yoksa, ethereum.org ekibi bir tane oluşturmanıza yardımcı olabilir.
- **Güvenilir bir kaynaktan olması** – Köklü eğitimcilerden, araştırmacılardan ve kaynaklardan gelen içeriklere öncelik verilir.
- **Zamanında ve her zaman geçerli** – Zaman içinde geçerliliğini koruyan içerikler, zamana duyarlı materyallere tercih edilir.

## Nasıl video eklenir {#how-to-add-a-video}

### 1. Seçenek: Bir sorun (issue) açın {#open-an-issue}

Bir video önermek istiyor ancak dosyaları kendiniz oluşturmak istemiyorsanız, video ayrıntılarını içeren bir GitHub sorunu (issue) açın; bir katkıda bulunan, videoyu sizin için eklemenize yardımcı olabilir.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?template=suggest_video.yaml">
  Bir video önerin
</ButtonLink>

### 2. Seçenek: Bir çekme isteği (pull request) açın {#open-a-pull-request}

Videoyu kendiniz eklemek isterseniz şu adımları izleyin:

#### 1. Adım: Video dosyasını oluşturun {#step-1}

Şu konumda yeni bir dizin ve `index.md` dosyası oluşturun:

```
public/content/videos/{videonuzun-kisa-adi}/index.md
```

Kısa ad (slug) URL için güvenli, küçük harfli olmalı ve kısa çizgiler kullanmalıdır (örn. `blockchain-101-visual-demo`).

#### 2. Adım: Frontmatter ekleyin {#step-2}

`index.md` dosyanıza aşağıdaki YAML frontmatter'ını ekleyin:

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

**Alan referansı:**

| Alan | Gerekli | Açıklama |
|---|---|---|
| `title` | Evet | Video başlığı |
| `description` | Evet | 1–3 cümlelik özet |
| `lang` | Evet | Şimdilik her zaman `en` |
| `youtubeId` | Evet | YouTube video kimliği (URL'de `v=` kısmından sonraki bölüm) |
| `uploadDate` | Evet | `YYYY-MM-DD` formatında orijinal yükleme tarihi |
| `duration` | Evet | `H:MM:SS` veya `M:SS` olarak video uzunluğu |
| `educationLevel` | Evet | `beginner`, `intermediate` veya `advanced` |
| `topic` | Evet | Galeri filtrelemesi için konu etiketleri dizisi |
| `format` | Evet | `explainer`, `presentation`, `interview`, `tutorial` veya `panel` |
| `author` | Evet | İçerik üreticisi veya kanal adı |
| `breadcrumb` | Hayır | İçerik haritası (breadcrumb) gezinmesi için özel kısa etiket |
| `customThumbnailUrl` | Hayır | Özel küçük resim URL'si (varsayılan olarak YouTube küçük resmi kullanılır) |

#### 3. Adım: Bir transkript ekleyin (önerilir) {#step-3}

Frontmatter `---` kısmının altına, video transkriptini markdown formatında ekleyin:

```markdown
---
title: "..."
# ... frontmatter'ın geri kalanı
---

Video içeriğine kısa bir giriş.

### Bölüm Başlığı (0:00)

Bu bölüm için transkript metni...

### Sonraki Bölüm (5:30)

Daha fazla transkript metni...
```

Ana bölümleri işaretlemek için zaman damgalarına sahip `###` başlıklarını kullanın. Bu, transkripti taranabilir hale getirir ve SEO'yu iyileştirir.

Eğer bir transkriptiniz yoksa, gövdeyi boş bırakabilirsiniz ve ekip bir tane oluşturacaktır.

#### 4. Adım: Konu etiketlerini seçin {#step-4}

Galeride kullanılan mevcut kategorilerle eşleşen konu etiketlerini seçin. Mevcut kategoriler ve etiketleri şunları içerir:

- **Ethereum Nasıl Çalışır**: `how-ethereum-works`, `consensus`, `blockchain`, `cryptography`, `accounts`, `ethereum`, `intro`, `transactions`, `pos`, `smart-contracts`
- **Ağ Yükseltmeleri**: `network-upgrades`, `upgrades`, `pectra`, `dencun`, `eip-4844`, `blobs`, `fusaka`
- **Yol Haritası ve Öncelikler**: `roadmap-and-priorities`, `pbs`, `mev`
- **Ölçeklendirme ve Katman 2**: `scaling-and-layer-2`, `scaling`, `layer-2`, `rollups`, `optimistic-rollups`, `zk-rollups`
- **Kullanım Durumları**: `use-cases`, `defi`, `finance`, `nfts`, `erc-721`, `erc-1155`, `lending`, `dapps`, `restaking`, `eigenlayer`, `dao`, `identity`, `desci`, `refi`
- **Gizlilik ve Güvenlik**: `privacy-and-security`, `privacy`, `authentication`
- **Topluluk Hikayeleri**: `community-stories`, `contributing`, `translations`, `community`

Videonuzun bir galeri kategori rafında görünmesini sağlamak için en az bir kategori anahtar etiketi (kebab-case formatındaki kalın isim, örn. `use-cases` veya `scaling-and-layer-2`) ekleyin. Tanınan bir kategori etiketi olmayan videolar yalnızca "Tümü" görünümünde ve arama sonuçlarında görünecektir.

Ayrıca yeni etiketler de kullanabilirsiniz; bunlar gelecekteki kategori gruplandırmaları için kullanılabilir olacaktır.

#### 5. Adım: PR'ınızı gönderin {#step-5}

Değişikliklerinizle birlikte `dev` dalına (branch) bir çekme isteği (pull request) açın. Ekip gönderiminizi inceleyecek ve geri bildirim sağlayacaktır.

## Bakım {#maintenance}

Listelenen videolar, aşağıdakilerden emin olmak için düzenli olarak incelenir:

- Listeleme kriterlerini hâlâ karşıladığından
- Doğru ve güncel bilgiler içerdiğinden
- Çalışan barındırma/YouTube bağlantılarına sahip olduğundan

Listelenen bir videoyla ilgili bir sorun fark ederseniz, [bir sorun (issue) oluşturun](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+✨,content+🖋️&template=suggest_video.yaml) veya [website@ethereum.org](mailto:website@ethereum.org) adresine bir e-posta gönderin.

## Kullanım koşulları {#terms-of-use}

Lütfen ethereum.org'un [kullanım koşullarına](/terms-of-use/) başvurun. ethereum.org'daki bilgiler yalnızca genel bilgilendirme amacıyla sağlanmaktadır.