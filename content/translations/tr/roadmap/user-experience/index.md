---
title: Kullanıcı deneyimini iyileştirme
description: Ethereum'u kullanmak çoğu kişi için hâlâ oldukça karmaşık. Kitlesel kullanımı teşvik etmek için Ethereum, giriş engellerini büyük ölçüde azaltmalıdır - kullanıcılar, Ethereum'a merkeziyetsiz, izinsiz ve sansüre dirençli erişimin avantajlarından yararlanmalıdır; ancak bu, geleneksel bir web2 uygulamasını kullanmak kadar sorunsuz olmalıdır.
lang: tr
image: /images/roadmap/roadmap-ux.png
alt: "Ethereum yol haritası"
template: roadmap
---

[Anahtarların](/glossary/#key) ve [cüzdanların](/glossary/#wallet) yönetilmesinden işlemlerin başlatılmasına kadar **Ethereum kullanımı her yönüyle basitleştirilmelidir**. Ethereum'un kitlesel olarak daha kolay benimsenebilmesi için kullanım kolaylığını önemli ölçüde artırması ve kullanıcıların [Web2](/glossary/#web2) uygulamalarını kullanmanın sağladığı sorunsuz deneyimle birlikte Ethereum'a izinsiz ve sansüre dirençli erişim deneyimi yaşamasına olanak tanıması gerekir.

## Güvenlik kelimelerinin ötesinde {#no-more-seed-phrases}

Ethereum hesapları, hesapların tanınması (açık anahtar) ve mesajların imzalanması (özel anahtar) için bir çift anahtar ile korunmaktadır. Bir özel anahtar üst düzey parola gibidir, Ethereum hesabına tam erişim imkânı sunar. Bu; hesapların kullanıcılar adına bankalar ve Web2 uygulamaları tarafından yönetilen insanlar için farklı bir işlem metodudur. Merkezi üçüncü şahıslara muhtaç olmadan Ethereum'un kitlesel kullanımı amacıyla, kullanıcı için varlıklarının sorumluluğunu üstlenecek ve kendi verilerinin kontrolünü açık-özel anahtar kriptografisi ile anahtar yönetimini anlamasını zorunlu kılmayacak, açık ve düz bir yol olmak zorundadır.

Bunun çözümü ise Ethereum ile etkileşime girmek için [akıllı sözleşme](/glossary/#smart-contract) cüzdanlarını kullanmaktır. Akıllı sözleşme cüzdanları; anahtarlar kaybolur veya çalınırsa korunma yolları ile daha iyi sahtekarlık denetimi ve savunma yaratır ve cüzdanların yeni işlevsellik kazanmalarını sağlar. Bugün dahi akıllı sözleşme cüzdanları var olsa da üzerine inşa etmek için henüz kullanışsızdır çünkü Ethereum protokolünün bunları daha iyi desteklemesi gerekir. Bu fazladan destek, hesap soyutlaması olarak bilinmektedir.

<ButtonLink variant="outline-color" href="/roadmap/account-abstraction/">Hesap soyutlaması hakkında daha fazlası</ButtonLink>

## Herkes için düğümler

[Düğüm](/glossary/#node) çalıştıran kullanıcılar, kendilerine veri sağlamak için üçüncü taraf organizasyonlara güvenmek zorunda değildir ve Ethereum [blokzinciri](/glossary/#blockchain) ile hızlı, özel ve izinsiz bir şekilde etkileşime girebilirler. Ancak bir düğümü yürütmek, birçok insanın aracılara güven duymak zorunda kalacağı anlamına gelen teknik bilgi ve azımsanmayacak disk hacmi gerektirir.

Düğümleri yürütmeyi çok daha kolay ve daha az kaynak bağımlı hale getirecek birçok yükseltme vardır. Verinin depolanma yolu, hacmi daha etkili kullanmak adına **Verkle Ağacı** olarak da bilinen bir yapı ile değiştirilecektir. Aynı zamanda [durumsuzluk](/roadmap/statelessness) veya [veri sonlanması](/roadmap/statelessness/#data-expiry) ile beraber Ethereum düğümleri, hard disk boşluğu gereksinimini azımsanamayacak miktarda düşürecek olan tüm Ethereum durum verilerinin bir kopyasını depolamaya gerek duymayacaklar. [Hafif düğümler](/developers/docs/nodes-and-clients/light-clients/), tam bir düğümü yürütmenin çoğu getirisini sunacak, ancak cep telefonları veya temel tarayıcı uygulamalarının içinde kolaylıkla yürütülebilecektir.

<ButtonLink variant="outline-color" href="/roadmap/verkle-trees/">Verkle ağaçları hakkındakileri okuyun</ButtonLink>

Bu yükseltmelerle bir düğüm yürütmenin önündeki engeller işlevsel olarak sıfıra indirilir. Kullanıcılar, bilgisayar veya cep telefonlarından, fark edilebilir disk hacmi veya CPU feda etmek zorunda kalmadan ve uygulama kullanırken veri ya da ağ erişimi için üçüncü şahıslara bel bağlamak zorunda olmadan Ethereum'a güvenli ve izne ihtiyaç duymayan erişimden faydalanacak.

## Güncel ilerleme {#current-progress}

Akıllı sözleşme cüzdanları çoktan beri mevcut, ancak bu cüzdanları olabildiğinde merkeziyetsiz ve izinsiz hale getirmek için daha fazla yükseltme gerekiyor. EIP-4337, Ethereum'un protokülende hiçbir değişiklik gerektirmeyen, olgun bir öneridir. EIP-4337 için gereken ana akıllı sözleşme **2023 yılının Mart ayında kullanıma alındı**.

**Tam durumsuzluk halen araştırma aşamasındadır** ve uygulamaya geçmesi için birkaç yıl daha vardır. Tam durumsuzluğa giden yolda, daha yakın tarihte yürürlüğe konabilecek veri sonlanmasını da içeren birçok kilometre taşı vardır. [Verkle Ağacı](/roadmap/verkle-trees/) ve [önerici-inşa edici ayrımı](/roadmap/pbs/) gibi diğer yol haritası elemanları öncelikle tamamlanmalıdır.

Verkle ağacı test ağları şu an aktif ve çalışıyor ve sonraki safha öncelikle özel sonrasında da açık test ağlarında Verkle ağacı kullanan istemcilerin yürütülmesidir. Test ağlarında sözleşme dağıtarak veya test ağı istemcilerini yürüterek gelişimin hızlanmasına yardımcı olabilirsiniz.
