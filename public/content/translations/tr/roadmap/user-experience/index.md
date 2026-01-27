---
title: Kullanıcı deneyimini iyileştirme
description: Ethereum'u kullanmak çoğu kişi için hâlâ oldukça karmaşık. Kitlesel kullanımı teşvik etmek için Ethereum, giriş engellerini büyük ölçüde azaltmalıdır - kullanıcılar, Ethereum'a merkeziyetsiz, izinsiz ve sansüre dirençli erişimin avantajlarından yararlanmalıdır; ancak bu, geleneksel bir web2 uygulamasını kullanmak kadar sorunsuz olmalıdır.
lang: tr
image: /images/roadmap/roadmap-ux.png
alt: "Ethereum yol haritası"
template: roadmap
---

**[Anahtarları](/glossary/#key) ve [cüzdanları](/glossary/#wallet) yönetmekten işlem başlatmaya kadar Ethereum kullanımının basitleştirilmesi gerekiyor.** Kitlesel benimsemeyi kolaylaştırmak adına Ethereum, kullanıcıların [Web2](/glossary/#web2) uygulamalarını kullanırken yaşadıkları pürüzsüz deneyimle Ethereum'a izinsiz ve sansüre dayanıklı bir şekilde erişmelerini sağlayarak, kullanım kolaylığını büyük ölçüde artırmalıdır.

## Güvenlik kelimelerinin ötesi {#no-more-seed-phrases}

Ethereum hesapları, hesapların tanınması (açık anahtar) ve mesajların imzalanması (özel anahtar) için bir çift anahtar ile korunmaktadır. Bir özel anahtar üst düzey parola gibidir, Ethereum hesabına tam erişim imkânı sunar. Bu; hesapların kullanıcılar adına bankalar ve Web2 uygulamaları tarafından yönetilen insanlar için farklı bir işlem metodudur. Merkezi üçüncü şahıslara muhtaç olmadan Ethereum'un kitlesel kullanımı amacıyla, kullanıcı için varlıklarının sorumluluğunu üstlenecek ve kendi verilerinin kontrolünü açık-özel anahtar kriptografisi ile anahtar yönetimini anlamasını zorunlu kılmayacak, açık ve düz bir yol olmak zorundadır.

Bunun çözümü, Ethereum ile etkileşim kurmak için [akıllı sözleşme](/glossary/#smart-contract) cüzdanlarını kullanmaktır. Akıllı sözleşme cüzdanları; anahtarlar kaybolur veya çalınırsa korunma yolları ile daha iyi sahtekarlık denetimi ve savunma yaratır ve cüzdanların yeni işlevsellik kazanmalarını sağlar. Bugün dahi akıllı sözleşme cüzdanları var olsa da üzerine inşa etmek için henüz kullanışsızdır çünkü Ethereum protokolünün bunları daha iyi desteklemesi gerekir. Bu fazladan destek, hesap soyutlaması olarak bilinmektedir.

<ButtonLink variant="outline-color" href="/roadmap/account-abstraction/">Hesap soyutlaması hakkında daha fazlası</ButtonLink>

## Herkes için düğümler

[Düğüm](/glossary/#node) çalıştıran kullanıcıların veri sağlamaları için üçüncü taraflara güvenmeleri gerekmez ve Ethereum [blokzinciri](/glossary/#blockchain) ile hızlı, özel ve izinsiz bir şekilde etkileşim kurabilirler. Ancak bir düğümü yürütmek, birçok insanın aracılara güven duymak zorunda kalacağı anlamına gelen teknik bilgi ve azımsanmayacak disk hacmi gerektirir.

Düğümleri yürütmeyi çok daha kolay ve daha az kaynak bağımlı hale getirecek birçok yükseltme vardır. Verilerin saklanma şekli, **Verkle Ağacı** olarak bilinen, alan açısından daha verimli bir yapı kullanacak şekilde değiştirilecektir. Ayrıca, [durumsuzluk](/roadmap/statelessness) veya [veri sonlanması](/roadmap/statelessness/#data-expiry) ile Ethereum düğümlerinin tüm Ethereum durum verilerinin bir kopyasını saklaması gerekmeyecek, bu da sabit disk alanı gereksinimlerini büyük ölçüde azaltacaktır. [Hafif düğümler](/developers/docs/nodes-and-clients/light-clients/), tam düğüm çalıştırmanın birçok avantajını sunacak ancak mobil telefonlarda veya basit tarayıcı uygulamaları içinde kolayca çalıştırılabilecektir.

<ButtonLink variant="outline-color" href="/roadmap/verkle-trees/">Verkle ağaçları hakkında okuyun</ButtonLink>

Bu yükseltmelerle bir düğüm yürütmenin önündeki engeller işlevsel olarak sıfıra indirilir. Kullanıcılar, bilgisayar veya cep telefonlarından, fark edilebilir disk hacmi veya CPU feda etmek zorunda kalmadan ve uygulama kullanırken veri ya da ağ erişimi için üçüncü şahıslara bel bağlamak zorunda olmadan Ethereum'a güvenli ve izne ihtiyaç duymayan erişimden faydalanacak.

## Mevcut ilerleme {#current-progress}

Akıllı sözleşme cüzdanları çoktan beri mevcut, ancak bu cüzdanları olabildiğinde merkeziyetsiz ve izinsiz hale getirmek için daha fazla yükseltme gerekiyor. EIP-4337, Ethereum'un protokülende hiçbir değişiklik gerektirmeyen, olgun bir öneridir. EIP-4337 için gereken ana akıllı sözleşme **Mart 2023'te dağıtıldı**.

**Tam durumsuzluk hâlâ araştırma aşamasındadır** ve uygulanmasına muhtemelen birkaç yıl daha vardır. Tam durumsuzluğa giden yolda, daha yakın tarihte yürürlüğe konabilecek veri sonlanmasını da içeren birçok kilometre taşı vardır. [Verkle Ağaçları](/roadmap/verkle-trees/) ve [Önerici-inşa edici ayrımı](/roadmap/pbs/) gibi diğer yol haritası maddelerinin önce tamamlanması gerekir.

Verkle ağacı test ağları şu an aktif ve çalışıyor ve sonraki safha öncelikle özel sonrasında da açık test ağlarında Verkle ağacı kullanan istemcilerin yürütülmesidir. Test ağlarında sözleşme dağıtarak veya test ağı istemcilerini yürüterek gelişimin hızlanmasına yardımcı olabilirsiniz.
