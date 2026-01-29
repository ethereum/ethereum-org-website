---
title: Yapay zeka temsilcileri
metaTitle: "Yapay zeka aracıları | Ethereum üzerindeki yapay zeka aracıları"
description: "Ethereum üzerindeki yapay zeka aracılarına genel bir bakış"
lang: tr
template: use-cases
emoji: ":robot:"
sidebarDepth: 2
image: /images/ai-agents/hero-image.png
alt: "Terminal masasında toplanan insanlar"
summaryPoint1: "Blokzincirle etkileşime giren ve bağımsız olarak ticaret yapan yapay zeka"
summaryPoint2: "Zincir üstü cüzdanları ve fonları kontrol eder"
summaryPoint3: "İş için insanları veya diğer aracıları işe alır"
buttons:
  - content: Yapay zeka aracıları nedir?
    toId: what-are-ai-agents
  - content: Aracıları keşfedin
    toId: ai-agents-on-ethereum
    isSecondary: false
---

Zincir üstü piyasa trendlerini 7/24 inceleyen, soruları yanıtlayan ve hatta sizin adınıza işlemler gerçekleştiren bir yapay zeka asistanıyla Ethereum'da gezindiğinizi hayal edin. Dijital yaşamınızı basitleştirmek için tasarlanmış akıllı sistemler olan Yapay Zeka Aracıları dünyasına hoş geldiniz.

Ethereum'da, sanal etkileyicilerden ve otonom içerik oluşturuculardan gerçek zamanlı piyasa analizi platformlarına kadar uzanan yapay zeka aracı yeniliklerinin, kullanıcılara öngörüler, eğlence ve operasyonel verimlilik sunarak onları güçlendirdiğini görüyoruz.

## Yapay zeka aracıları nedir? {#what-are-ai-agents}

Yapay zeka aracıları, görevleri yerine getirmek veya kendi kararlarını vermek için yapay zekayı kullanan yazılım programlarıdır. Verilerden öğrenir, değişikliklere uyum sağlar ve karmaşık görevleri yerine getirirler. Durmaksızın çalışırlar ve fırsatları anında tespit edebilirler.

### Yapay zeka aracıları blokzincirlerle nasıl çalışır {#how-ai-agents-work-with-blockchains}

Geleneksel finansta, yapay zeka aracıları genellikle sınırlı veri girdileriyle merkezi ortamlarda çalışır. Bu, varlıkları otonom bir şekilde öğrenme veya yönetme yeteneklerini engeller.

Buna karşılık, Ethereum'un merkeziyetsiz ekosistemi birkaç temel avantaj sunar:

- <strong>Şeffaf veriler:</strong> Gerçek zamanlı blokzincir bilgilerine erişim.
- <strong>Gerçek varlık mülkiyeti:</strong> Dijital varlıklar tamamen yapay zeka aracılarına aittir.
- <strong>Sağlam zincir üstü işlevsellik:</strong> Yapay Zeka Aracıları'nın işlem yapmasını, akıllı sözleşmelerle etkileşim kurmasını, likidite sağlamasını ve protokoller arasında iş birliği yapmasını sağlar.

Bu faktörler, yapay zeka aracılarını basit botlardan, birden fazla sektörde önemli değer sunan dinamik, kendi kendini geliştiren sistemlere dönüştürür:

<CardGrid>
  <Card title="Otomatik DeFi" emoji=":money_with_wings:" description="Yapay zeka ajanları piyasa trendlerini izler, alım satım yapar ve portföyleri yöneterek DeFi'nin karmaşık dünyasını daha erişilebilir hale getirir."/>
  <Card title="Yeni yapay zeka ajanı ekonomisi" emoji="🌎" description="Yapay zeka ajanları, özel görevler için farklı yeteneklere sahip diğer ajanları (veya insanları) kiralayabilir." />
  <Card title="Risk yönetimi" emoji="🛠️" description="Yapay zeka ajanları, işlem faaliyetlerini izleyerek dolandırıcılıkları tespit etmeye yardımcı olabilir ve dijital varlıklarınızı daha hızlı ve daha iyi koruyabilir." />
</CardGrid>

## Doğrulanabilir Yapay Zeka {#verifiable-ai}

Zincir dışında çalışan yapay zeka aracıları genellikle "kara kutular" gibi davranır — akıl yürütmeleri, girdileri ve çıktıları bağımsız olarak doğrulanamaz. Ethereum bunu değiştirir. Aracı davranışını zincir üstüne sabitleyerek, geliştiriciler _güven gerektirmeyen_, _şeffaf_ ve _ekonomik olarak otonom_ aracılar oluşturabilirler. Bu tür aracıların eylemleri denetlenebilir, kısıtlanabilir ve kanıtlanabilir.

### Doğrulanabilir çıkarım {#verifiable-inference}

Yapay zeka çıkarımı geleneksel olarak, yürütmenin ucuz olduğu ancak model yürütmesinin opak olduğu zincir dışında gerçekleşir. Ethereum'da, geliştiriciler çeşitli teknikler kullanarak aracıları doğrulanabilir hesaplamayla eşleştirebilirler:

- [**zkML (sıfır bilgi makine öğrenimi)**](https://opengradient.medium.com/a-gentle-introduction-to-zkml-8049a0e10a04) aracıların modeli veya girdileri ortaya çıkarmadan bir modelin doğru bir şekilde yürütüldüğünü kanıtlamasına olanak tanır
- [**TEE (güvenilir yürütme ortamı) tasdikleri**](https://en.wikipedia.org/wiki/Trusted_execution_environment), bir aracının belirli bir modeli veya kod yolunu çalıştırdığına dair donanım destekli kanıtlara izin verir
- **Zincir üstü değişmezlik**, bu kanıtların ve tasdiklerin herhangi bir sözleşme veya aracı tarafından referans gösterilebilmesini, yeniden oynatılabilmesini ve güvenilebilmesini sağlar

## x402 ile ödemeler ve ticaret {#x402}

Ethereum ve L2'lerde dağıtılan [x402 protokolü](https://www.x402.org/), aracılara insan müdahalesi olmadan kaynaklar için ödeme yapmaları ve ekonomik olarak etkileşimde bulunmaları için yerel bir yol sunar. Aracılar şunları yapabilir:

- Sabit coin'leri kullanarak hesaplama, veri ve API çağrıları için ödeme yapma
- Diğer aracılardan veya hizmetlerden tasdik talep etme veya doğrulama
- Hesaplama, veri veya model çıktıları alıp satarak aracıdan aracıya ticarete katılma

x402, Ethereum'u otonom aracılar için programlanabilir bir ekonomik katmana dönüştürerek hesaplar, abonelikler veya merkezi faturalandırma yerine kullandıkça öde etkileşimlerini mümkün kılar.

### Aracısal finans güvenliği {#agentic-finance-security}

Otonom aracıların korkuluklara ihtiyacı vardır. Ethereum bunları cüzdan ve sözleşme düzeyinde sağlar:

- [Akıllı hesaplar (EIP-4337)](https://eips.ethereum.org/EIPS/eip-4337), geliştiricilerin harcama limitleri, beyaz listeler, oturum anahtarları ve ayrıntılı izinler uygulamasını sağlar
- Akıllı sözleşmelerdeki programlanmış kısıtlamalar, bir aracının yapmasına izin verilen şeyleri kısıtlayabilir
- Çıkarım tabanlı sınırlar (örneğin, yüksek riskli bir eylem gerçekleştirmeden önce bir zkML kanıtı gerektirmek) başka bir güvenlik katmanı ekler

Bu kontroller, sınırsız olmayan otonom aracıların dağıtılmasını sağlar.

### Zincir üstü kayıtlar: ERC-8004 {#erc-8004}

[ERC-8004](https://eips.ethereum.org/EIPS/eip-8004), aracı kimliği, yetenekleri ve tasdikleri için zincir üstü kayıtlar öneren, gelişmekte olan bir standarttır (şu anda uzman değerlendirmesindedir).

Kabul edilirse, şunları sağlayabilir:

- Aracıların paylaşılan, güven gerektirmeyen bir dizini
- Standartlaştırılmış tasdik biçimleri
- Doğrudan Ethereum ana ağında "güven gerektirmeyen aracı altyapısı" için bir temel

Bu, aracıların tamamen merkeziyetsiz bir ortamda birbirlerini keşfetmelerini, doğrulamalarını ve birbirleriyle işlem yapmalarını kolaylaştıracaktır.

## Ethereum üzerindeki yapay zeka aracıları {#ai-agents-on-ethereum}

Yapay zeka aracılarının tam potansiyelini keşfetmeye başlıyoruz ve projeler şimdiden yapay zeka ile blokzincir arasındaki sinerjiden, özellikle şeffaflık ve para kazanma alanlarında yararlanıyor.

<AiAgentProductLists list="ai-agents" />

<strong>Luna'nın bir podcast konuğu olarak ilk kez görünmesi</strong>

<YouTube id="ZCsOMxnIruA" />

## Aracı kontrollü cüzdanlar {#agent-controlled-wallets}

Luna veya AIXBT gibi aracılar kendi zincir üstü cüzdanlarını ([AIXBT cüzdanı](https://clusters.xyz/aixbt), [Luna cüzdanı](https://zapper.xyz/account/0x0d177181e3763b20d47dc3a72dd584368bd8bf43)) kontrol ederek hayranlarına bahşiş vermelerini ve ekonomik faaliyetlere katılmalarını sağlar.

Luna, X sosyal kampanyası #LunaMuralChallenge sırasında kazananları Base cüzdanı aracılığıyla seçip ödüllendirdi — bu, <strong>bir yapay zekanın kripto ödülü için insanları işe aldığı ilk örnek</strong> oldu.

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<p className="mt-0"><strong>Bilmekte fayda var</strong></p>
<p className="mt-2">Yapay zeka aracıları ve ilgili araçlar henüz geliştirme aşamasının başındadır ve oldukça deneyseldir — dikkatli kullanın.</p>
</AlertContent>
</Alert>

## Sohbet komutlarını kullanarak cüzdanınızı kontrol edin {#control-your-wallet-using-chat-commands}

DeFi'nin karmaşık arayüzlerini atlayabilir ve kriptonuzu basit sohbet komutlarıyla yönetebilirsiniz.

Bu sezgisel yaklaşım, işlemleri daha hızlı, daha kolay hale getirir ve yanlış adrese para gönderme veya ücretler için fazla ödeme yapma gibi hatalara daha az eğilimli kılar.

<AiAgentProductLists list="chat" />

## Yapay zeka aracıları ve yapay zeka botları karşılaştırması {#ai-agents-vs-ai-bots}

Yapay zeka aracıları ile yapay zeka botları arasındaki ayrım bazen kafa karıştırıcı olabilir, çünkü her ikisi de girdilere dayalı olarak otomatik eylemler gerçekleştirir.

- Yapay zeka botları otomatik asistanlar gibidir — Rutin görevleri yerine getirmek için belirli, önceden programlanmış talimatları izlerler.
- Yapay zeka aracıları daha çok akıllı yoldaşlar gibidir — Deneyimlerden öğrenir, yeni bilgilere uyum sağlar ve kendi başlarına kararlar alırlar.

|                     | Yapay zeka temsilcileri                                                                   | Yapay zeka botları                                             |
| ------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| **Etkileşimler**    | Karmaşık, uyarlanabilir, otonom                                                           | Basit, önceden tanımlanmış kapsam, sabit kodlu                 |
| **Öğrenme**         | Sürekli öğrenir, deney yapabilir ve gerçek zamanlı olarak yeni verilere uyum sağlayabilir | Önceden eğitilmiş veriler veya sabit kurallar üzerinde çalışır |
| **Görev tamamlama** | Daha geniş hedeflere ulaşmayı amaçlar                                                     | Yalnızca belirli görevlere odaklanır                           |

## Daha derine dalın {#dive-deeper}

<AiAgentProductLists list="dive-deeper" />

## Kendi yapay zeka aracınızı oluşturabilirsiniz {#you-can-build-your-own-ai-agent}

<BuildYourOwnAIAgent />
