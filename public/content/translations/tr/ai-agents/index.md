---
title: "Yapay zeka ajanları"
metaTitle: "Yapay zeka ajanları | Ethereum'da yapay zeka ajanları"
description: "Ethereum'daki yapay zeka ajanlarına genel bir bakış"
lang: tr
template: use-cases
sidebarDepth: 2
image: /images/ai-agents/hero-image.png
alt: "Terminal masasında toplanmış insanlar"
summaryPoints:
  - "Blokzincir ile etkileşime giren ve bağımsız olarak alım satım yapan yapay zeka"
  - "Zincir içi cüzdanları ve fonları kontrol eder"
  - "İş için insanları veya diğer ajanları işe alır"
buttons:
  - content: Yapay zeka ajanları nedir?
    toId: what-are-ai-agents
  - content: Ajanları keşfedin
    toId: ai-agents-on-ethereum
    isSecondary: false
---

7/24 zincir içi piyasa trendlerini inceleyen, soruları yanıtlayan ve hatta sizin adınıza işlemler gerçekleştiren bir yapay zeka asistanıyla Ethereum'da gezindiğinizi hayal edin. Dijital yaşamınızı basitleştirmek için tasarlanmış akıllı sistemler olan Yapay Zeka Ajanları dünyasına hoş geldiniz.

Ethereum'da, sanal fenomenlerden ve otonom içerik oluşturuculardan gerçek zamanlı piyasa analizi platformlarına kadar uzanan, içgörüler, eğlence ve operasyonel verimlilik sunarak kullanıcıları güçlendiren yapay zeka ajanlarının yeniliklerini görüyoruz.

## Yapay zeka ajanları nedir? {#what-are-ai-agents}

Yapay zeka ajanları, görevleri yerine getirmek veya kendi kararlarını vermek için yapay zekayı kullanan yazılım programlarıdır. Verilerden öğrenir, değişikliklere uyum sağlar ve karmaşık görevlerin üstesinden gelirler. Kesintisiz çalışırlar ve fırsatları anında tespit edebilirler.

### Yapay zeka ajanları blokzincirlerle nasıl çalışır? {#how-ai-agents-work-with-blockchains}

Geleneksel finansta, yapay zeka ajanları genellikle sınırlı veri girdileriyle merkezi ortamlarda çalışır. Bu durum, onların otonom olarak öğrenme veya varlıkları yönetme yeteneklerini engeller.

Buna karşılık, Ethereum'un merkeziyetsiz ekosistemi birkaç temel avantaj sunar:

- <strong>Şeffaf veri:</strong> Gerçek zamanlı blokzincir bilgilerine erişim.
- <strong>Gerçek varlık sahipliği:</strong> Dijital varlıklar tamamen yapay zeka ajanlarına aittir.
- <strong>Güçlü zincir içi işlevsellik:</strong> Yapay Zeka Ajanlarının işlemleri gerçekleştirmesini, akıllı sözleşmelerle etkileşime girmesini, likidite sağlamasını ve protokoller arası iş birliği yapmasını sağlar.

Bu faktörler, yapay zeka ajanlarını basit botlardan birden fazla sektörde önemli değer sunan dinamik, kendi kendini geliştiren sistemlere dönüştürür:

<Grid>
  <Card title="Otomatik DeFi" emoji=":money_with_wings:" description="Yapay zeka ajanları piyasa trendlerini yakından takip eder, alım satım işlemlerini gerçekleştirir ve portföyleri yönetir; böylece DeFi'nin karmaşık dünyasını çok daha erişilebilir hale getirir."/>
  <Card title="Yeni yapay zeka ajanı ekonomisi" emoji="🌎" description="Yapay zeka ajanları, kendileri için uzmanlık gerektiren görevleri yerine getirmeleri amacıyla farklı becerilere sahip diğer ajanları (veya insanları) işe alabilir." />
  <Card title="Risk yönetimi" emoji="🛠️" description="Yapay zeka ajanları, işlem faaliyetlerini izleyerek dolandırıcılıkları tespit etmeye yardımcı olabilir ve dijital varlıklarınızı daha iyi ve daha hızlı bir şekilde koruyabilir." />
</Grid>

## Doğrulanabilir yapay zeka {#verifiable-ai}

Zincir dışı çalışan yapay zeka ajanları genellikle "kara kutular" gibi davranır; mantıkları, girdileri ve çıktıları bağımsız olarak doğrulanamaz. Ethereum bunu değiştiriyor. Geliştiriciler, ajan davranışlarını zincir içine sabitleyerek _güvene dayalı olmayan_, _şeffaf_ ve _ekonomik olarak otonom_ ajanlar oluşturabilirler. Bu tür ajanların eylemleri denetlenebilir, kısıtlanabilir ve kanıtlanabilir.

### Doğrulanabilir çıkarım {#verifiable-inference}

Yapay zeka çıkarımı geleneksel olarak, yürütmenin ucuz ancak model yürütmesinin opak olduğu zincir dışı ortamlarda gerçekleşir. Ethereum'da geliştiriciler, çeşitli teknikler kullanarak ajanları doğrulanabilir hesaplama ile eşleştirebilir:

- [**zkML (sıfır bilgi makine öğrenimi)**](https://opengradient.medium.com/a-gentle-introduction-to-zkml-8049a0e10a04), ajanların modeli veya girdileri ifşa etmeden bir modelin doğru şekilde yürütüldüğünü kanıtlamasını sağlar
- [**TEE (güvenilir yürütme ortamı) onaylamaları**](https://en.wikipedia.org/wiki/Trusted_execution_environment), bir ajanın belirli bir modeli veya kod yolunu çalıştırdığına dair donanım destekli kanıtlara olanak tanır
- **Zincir içi değişmezlik**, bu kanıtların ve onaylamaların herhangi bir sözleşme veya ajan tarafından referans alınabilmesini, yeniden oynatılabilmesini ve güvenilebilmesini sağlar

## x402 ile ödemeler ve ticaret {#x402}

Ethereum ve L2'lerde dağıtımı yapılan [x402 protokolü](https://www.x402.org/), ajanlara insan müdahalesi olmadan kaynaklar için ödeme yapmaları ve ekonomik olarak etkileşime girmeleri için yerel bir yol sunar. Ajanlar şunları yapabilir:

- Sabit coinler kullanarak hesaplama, veri ve API çağrıları için ödeme yapabilir
- Diğer ajanlardan veya hizmetlerden onaylama talep edebilir veya doğrulayabilir
- Hesaplama, veri veya model çıktıları alıp satarak ajanlar arası ticarete katılabilir

x402, Ethereum'u otonom ajanlar için programlanabilir bir ekonomik katmana dönüştürerek hesaplar, abonelikler veya merkezi faturalandırma yerine kullanım başına ödeme etkileşimlerine olanak tanır.

### Ajan finansmanı güvenliği {#agentic-finance-security}

Otonom ajanların korkuluklara (güvenlik önlemlerine) ihtiyacı vardır. Ethereum bunları cüzdan ve sözleşme düzeyinde sağlar:

- [Akıllı hesaplar (EIP-4337)](https://eips.ethereum.org/EIPS/eip-4337), geliştiricilerin harcama limitleri, beyaz listeler, oturum anahtarları ve ayrıntılı izinler uygulamasına olanak tanır
- Akıllı sözleşmelerdeki programlanmış kısıtlamalar, bir ajanın yapmasına izin verilenleri sınırlayabilir
- Çıkarım tabanlı sınırlar (örneğin, yüksek riskli bir eylemi gerçekleştirmeden önce bir zkML kanıtı gerektirmek) başka bir güvenlik katmanı ekler

Bu kontroller, sınırsız olmayan otonom ajanların dağıtımını sağlar.

### Zincir içi kayıt defterleri: ERC-8004 {#erc-8004}

[ERC-8004](https://eips.ethereum.org/EIPS/eip-8004), ajan kimliği, itibarı ve doğrulaması için zincir içi kayıt defterlerini tanımlar. MetaMask, Ethereum Vakfı, Google ve Coinbase'den katkıda bulunanlar tarafından ortaklaşa yazılmış olup, Ethereum Ana Ağı, Base, Polygon, Arbitrum ve diğerleri dahil olmak üzere 16 ağda dağıtımı yapılmıştır.

Şunları sağlar:

- Taşınabilir, sansüre dirençli ajan tanımlayıcıları için bir **kimlik kayıt defteri**
- Uygulamalar genelinde standartlaştırılmış geri bildirim sinyalleri için bir **itibar kayıt defteri**
- Bağımsız doğrulama (zkML, TEE, stake edilmiş yeniden yürütme) talep etmek için bir **doğrulama kayıt defteri**

ERC-8004, ajanların tamamen merkeziyetsiz bir ortamda birbirlerini keşfetmelerini, doğrulamalarını ve birbirleriyle işlem yapmalarını kolaylaştırır.

## Ethereum'da yapay zeka ajanları {#ai-agents-on-ethereum}

Yapay zeka ajanlarının tam potansiyelini keşfetmeye başlıyoruz ve projeler şimdiden yapay zeka ile blokzincir arasındaki sinerjiden, özellikle de şeffaflık ve para kazanma konularında yararlanıyor.

<AiAgentProductLists list="ai-agents" />

<strong>Luna'nın bir podcast konuğu olarak ilk görünümü</strong>

<VideoWatch slug="ai-agents-interview-luna" />

## Ajan kontrollü cüzdanlar {#agent-controlled-wallets}

Luna veya AIXBT gibi ajanlar kendi zincir içi cüzdanlarını ([AIXBT'nin cüzdanı](https://clusters.xyz/aixbt), [Luna'nın cüzdanı](https://zapper.xyz/account/0x0d177181e3763b20d47dc3a72dd584368bd8bf43)) kontrol ederek hayranlarına bahşiş vermelerini ve ekonomik faaliyetlere katılmalarını sağlar.

Luna'nın X sosyal kampanyası #LunaMuralChallenge sırasında Luna, kazananları Base cüzdanı aracılığıyla seçti ve ödüllendirdi; bu, <strong>bir yapay zekanın kripto ödülü karşılığında insanları işe aldığı ilk örnek</strong> oldu.

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<p className="mt-0"><strong>Bilmenizde fayda var</strong></p>
<p className="mt-2">Yapay zeka ajanları ve ilgili araçlar hala erken geliştirme aşamasındadır ve oldukça deneyseldir; dikkatli kullanın.</p>
</AlertContent>
</Alert>

## Sohbet komutlarını kullanarak cüzdanınızı kontrol edin {#control-your-wallet-using-chat-commands}

Merkeziyetsiz finansın (DeFi) karmaşık arayüzlerini atlayabilir ve kriptonuzu basit sohbet komutlarıyla yönetebilirsiniz.

Bu sezgisel yaklaşım, işlemleri daha hızlı, daha kolay ve fonları yanlış adrese göndermek veya ücretler için fazla ödeme yapmak gibi hatalara daha az eğilimli hale getirir.

<AiAgentProductLists list="chat" />

## Yapay zeka ajanları ve yapay zeka botları {#ai-agents-vs-ai-bots}

Her ikisi de girdiye dayalı olarak otomatik eylemler gerçekleştirdiğinden, yapay zeka ajanları ile yapay zeka botları arasındaki ayrım bazen kafa karıştırıcı olabilir.

- Yapay zeka botları otomatik asistanlar gibidir — Rutin görevleri yerine getirmek için belirli, önceden programlanmış talimatları izlerler.
- Yapay zeka ajanları daha çok akıllı yoldaşlar gibidir — Deneyimlerden öğrenir, yeni bilgilere uyum sağlar ve kendi başlarına kararlar alırlar.

|                     | Yapay zeka ajanları                                                                    | Yapay zeka botları                          |
| ------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------- |
| **Etkileşimler**    | Karmaşık, uyarlanabilir, otonom                                                        | Basit, önceden tanımlanmış kapsam, kodlanmış|
| **Öğrenme**         | Sürekli öğrenir, gerçek zamanlı olarak deney yapabilir ve yeni verilere uyum sağlayabilir | Önceden eğitilmiş veriler veya sabit kurallar üzerinde çalışır |
| **Görev tamamlama** | Daha geniş hedeflere ulaşmayı amaçlar                                                  | Yalnızca belirli görevlere odaklanır        |

## Daha derinlemesine inceleyin {#dive-deeper}

<AiAgentProductLists list="dive-deeper" />

## Kendi yapay zeka ajanınızı oluşturabilirsiniz {#you-can-build-your-own-ai-agent}

<BuildYourOwnAIAgent />