---
title: Kullanıcı deneyimini iyileştirme
description: Ethereum'u kullanmak çoğu kişi için hâlâ oldukça karmaşık. Kitlesel kullanımı teşvik etmek için Ethereum, giriş engellerini büyük ölçüde azaltmalıdır - kullanıcılar, Ethereum'a merkeziyetsiz, izinsiz ve sansüre dirençli erişimin avantajlarından yararlanmalıdır; ancak bu, geleneksel bir web2 uygulamasını kullanmak kadar sorunsuz olmalıdır.
lang: tr
image: /images/roadmap/roadmap-ux.png
alt: "Ethereum yol haritası"
template: roadmap
---

Anahtar ve cüzdan kullanımından işlemlerin başlatılmasına kadar Ethereum'un kullanımı basitleştirilmeli. Ethereum, kitlesel kullanımı hafifletmek için, kullanıcılara izinsizliği deneyimlemesini ve Ethereuma Web2 uygulamaları kullanarak sansürsüz ve sıkıntısız bir şekilde erişmesini sağlayarak kullanımı ciddi olanda kolaylaştırmalıdır.

## Güvenlik kelimelerinin ötesinde {#no-more-seed-phrases}

Ethereum hesapları, hesapların tanınması (açık anahtar) ve mesajların imzalanması (özel anahtar) için bir çift anahtar ile korunmaktadır. Bir özel anahtar üst düzey parola gibidir, Ethereum hesabına tam erişim imkânı sunar. Bu; hesapların kullanıcılar adına bankalar ve Web2 uygulamaları tarafından yönetilen insanlar için farklı bir işlem metodudur. Merkezi üçüncü şahıslara muhtaç olmadan Ethereum'un kitlesel kullanımı amacıyla, kullanıcı için varlıklarının sorumluluğunu üstlenecek ve kendi verilerinin kontrolünü açık-özel anahtar kriptografisi ile anahtar yönetimini anlamasını zorunlu kılmayacak, açık ve düz bir yol olmak zorundadır.

Bunun için çözüm, Ethereum ile etkileşecek akıllı sözleşme cüzdanlarının kullanımıdır. Akıllı sözleşme cüzdanları; anahtarlar kaybolur veya çalınırsa korunma yolları ile daha iyi sahtekarlık denetimi ve savunma yaratır ve cüzdanların yeni işlevsellik kazanmalarını sağlar. Bugün dahi akıllı sözleşme cüzdanları var olsa da üzerine inşa etmek için henüz kullanışsızdır çünkü Ethereum protokolünün bunları daha iyi desteklemesi gerekir. Bu fazladan destek, hesap soyutlaması olarak bilinmektedir.

<ButtonLink variant="outline-color" href="/roadmap/account-abstraction/">Hesap soyutlaması hakkında daha fazlası</ButtonLink>

## Herkes için düğümler

Düğüm işleten kullanıcılar, veri sağlamaları için üçüncü şahıslara güven duymak zorunda değillerdir ve hızlı, özel ve izne ihtiyaç duymayan bir biçimde Ethereum blok zinciri ile etkileşebilirler. Ancak bir düğümü yürütmek, birçok insanın aracılara güven duymak zorunda kalacağı anlamına gelen teknik bilgi ve azımsanmayacak disk hacmi gerektirir.

Düğümleri yürütmeyi çok daha kolay ve daha az kaynak bağımlı hale getirecek birçok yükseltme vardır. Verinin depolanma yolu, hacmi daha etkili kullanmak adına **Verkle Ağacı** olarak da bilinen bir yapı ile değiştirilecektir. Aynı zamanda [durumsuzluk](/roadmap/statelessness) veya [veri sonlanması](/roadmap/statelessness/#data-expiry) ile beraber Ethereum düğümleri, hard disk boşluğu gereksinimini azımsanamayacak miktarda düşürecek olan tüm Ethereum durum verilerinin bir kopyasını depolamaya gerek duymayacaklar. [Hafif düğümler](/developers/docs/nodes-and-clients/light-clients/), tam bir düğümü yürütmenin çoğu getirisini sunacak, ancak cep telefonları veya temel tarayıcı uygulamalarının içinde kolaylıkla yürütülebilecektir.

<ButtonLink variant="outline-color" href="/roadmap/verkle-trees/">Verkle ağaçları hakkındakileri okuyun</ButtonLink>

Bu yükseltmelerle bir düğüm yürütmenin önündeki engeller işlevsel olarak sıfıra indirilir. Kullanıcılar, bilgisayar veya cep telefonlarından, fark edilebilir disk hacmi veya CPU feda etmek zorunda kalmadan ve uygulama kullanırken veri ya da ağ erişimi için üçüncü şahıslara bel bağlamak zorunda olmadan Ethereum'a güvenli ve izne ihtiyaç duymayan erişimden faydalanacak.

## Güncel ilerleme {#current-progress}

Akıllı sözleşme cüzdanları çoktan beri mevcut, ancak bu cüzdanları olabildiğinde merkeziyetsiz ve izinsiz hale getirmek için daha fazla yükseltme gerekiyor. EIP-4337, Ethereum'un protokülende hiçbir değişiklik gerektirmeyen, olgun bir öneridir. EIP-4337 için gerekli temel akıllı sözleşme Mart 2023'te dağıtıldı.

Tam durumsuzluk hâlâ araştırma safhasında ve yürürlüğe geçirilmesine uzun yıllar var gibi. Tam durumsuzluğa giden yolda, daha yakın tarihte yürürlüğe konabilecek veri sonlanmasını da içeren birçok kilometre taşı vardır. [Verkle Ağacı](/roadmap/verkle-trees/) ve [önerici-inşa edici ayrımı](/roadmap/pbs/) gibi diğer yol haritası elemanları öncelikle tamamlanmalıdır.

Verkle ağacı test ağları şu an aktif ve çalışıyor ve sonraki safha öncelikle özel sonrasında da açık test ağlarında Verkle ağacı kullanan istemcilerin yürütülmesidir. Test ağlarında sözleşme dağıtarak veya test ağı istemcilerini yürüterek gelişimin hızlanmasına yardımcı olabilirsiniz.
