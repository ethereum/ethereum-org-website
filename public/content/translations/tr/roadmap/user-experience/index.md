---
title: "Kullanıcı deneyimini iyileştirme"
description: "Çoğu insan için Ethereum'u kullanmak hâlâ çok karmaşık. Kitlesel benimsenmeyi teşvik etmek için Ethereum giriş engellerini büyük ölçüde azaltmalıdır; kullanıcılar Ethereum'a merkeziyetsiz, izinsiz ve sansüre dirençli erişimin avantajlarından yararlanmalı, ancak bu geleneksel bir Web2 uygulaması kullanmak kadar sorunsuz olmalıdır."
lang: tr
image: /images/roadmap/roadmap-ux.png
alt: "Ethereum yol haritası"
template: roadmap
---

**Ethereum kullanımının basitleştirilmesi gerekiyor**; [anahtarları](/glossary/#key) ve [cüzdanları](/glossary/#wallet) yönetmekten işlem başlatmaya kadar. Kitlesel benimsenmeyi kolaylaştırmak için Ethereum kullanım kolaylığını büyük ölçüde artırmalı, kullanıcıların [Web2](/glossary/#web2) uygulamalarını kullanmanın sorunsuz deneyimiyle Ethereum'a izinsiz ve sansüre dirençli erişimi deneyimlemelerine olanak tanımalıdır.

## Kurtarma ifadelerinin ötesinde {#no-more-seed-phrases}

Ethereum hesapları, hesapları tanımlamak (açık anahtar) ve mesajları imzalamak (özel anahtar) için kullanılan bir çift anahtar ile korunur. Özel anahtar bir ana parola gibidir; bir Ethereum hesabına tam erişim sağlar. Bu, hesapları kullanıcı adına yöneten bankalara ve Web2 uygulamalarına daha aşina olan kişiler için farklı bir çalışma şeklidir. Ethereum'un merkezi üçüncü taraflara güvenmeden kitlesel benimsenmeye ulaşması için, bir kullanıcının açık-özel anahtar kriptografisini ve anahtar yönetimini anlamak zorunda kalmadan varlıklarının gözetimini üstlenmesi ve verilerinin kontrolünü elinde tutması için basit, sorunsuz bir yol olmalıdır.

Bunun çözümü, Ethereum ile etkileşime girmek için [akıllı sözleşme](/glossary/#smart-contract) cüzdanlarını kullanmaktır. Akıllı sözleşme cüzdanları, anahtarların kaybolması veya çalınması durumunda hesapları korumanın yollarını, daha iyi dolandırıcılık tespiti ve savunması için fırsatlar yaratır ve cüzdanların yeni işlevler kazanmasına olanak tanır. Akıllı sözleşme cüzdanları bugün mevcut olsa da, Ethereum protokolünün onları daha iyi desteklemesi gerektiğinden bunları oluşturmak zordur. Bu ek destek, hesap soyutlama olarak bilinir.

<ButtonLink variant="outline-color" href="/roadmap/account-abstraction/">Hesap soyutlama hakkında daha fazlası</ButtonLink>

## Herkes için düğümler {#nodes-for-everyone}

[Düğümleri](/glossary/#node) çalıştıran kullanıcılar, kendilerine veri sağlamaları için üçüncü taraflara güvenmek zorunda kalmazlar ve Ethereum [blokzinciri](/glossary/#blockchain) ile hızlı, gizli ve izinsiz bir şekilde etkileşime girebilirler. Ancak, şu anda bir düğüm çalıştırmak teknik bilgi ve önemli miktarda disk alanı gerektirir, bu da birçok kişinin bunun yerine aracılara güvenmesi gerektiği anlamına gelir.

Düğüm çalıştırmayı çok daha kolay ve çok daha az kaynak yoğun hale getirecek çeşitli güncellemeler vardır. Ethereum'un durumunun, şu anda [EIP-7864](https://eips.ethereum.org/EIPS/eip-7864) içinde bir ikili ağaç olarak teklif edilen ve çok daha küçük kanıtlar üreten yeni bir ağaç yapısına geçmesi beklenmektedir. Ayrıca, [durumsuzluk](/roadmap/statelessness) veya [veri süresinin dolması](/roadmap/statelessness/#data-expiry) ile Ethereum düğümleri, tüm Ethereum durum verilerinin bir kopyasını depolamak zorunda kalmayacak ve sabit disk alanı gereksinimlerini büyük ölçüde azaltacaktır. [Hafif düğümler](/developers/docs/nodes-and-clients/light-clients/), tam düğüm çalıştırmanın birçok avantajını sunacak ancak cep telefonlarında veya basit tarayıcı uygulamalarında kolayca çalışabilecektir.

<ButtonLink variant="outline" href="/roadmap/statelessness/">Durumsuzluk hakkında daha fazlası</ButtonLink>

Bu güncellemelerle, bir düğüm çalıştırmanın önündeki engeller fiilen sıfıra inmektedir. Kullanıcılar, bilgisayarlarında veya cep telefonlarında fark edilebilir bir disk alanı veya CPU feda etmek zorunda kalmadan Ethereum'a güvenli, izinsiz erişimden faydalanacak ve uygulamaları kullandıklarında veri veya ağ erişimi için üçüncü taraflara güvenmek zorunda kalmayacaklardır.

## Mevcut ilerleme {#current-progress}

Akıllı sözleşme cüzdanları halihazırda mevcuttur, ancak bunları mümkün olduğunca merkeziyetsiz ve izinsiz hale getirmek için daha fazla güncelleme gereklidir. EIP-4337, Ethereum protokolünde herhangi bir değişiklik gerektirmeyen olgun bir tekliftir. EIP-4337 için gerekli olan ana akıllı sözleşme **Mart 2023'te dağıtıldı**.

**Tam durumsuzluk hâlâ araştırma aşamasındadır** ve uygulanmasına muhtemelen birkaç yıl vardır. Tam durumsuzluğa giden yolda, daha erken uygulanabilecek veri süresinin dolması da dahil olmak üzere çeşitli kilometre taşları vardır. Yeni bir durum ağacı (şu anda [EIP-7864](https://eips.ethereum.org/EIPS/eip-7864) içinde bir ikili ağaç olarak teklif edilmektedir) ve [Teklifçi-oluşturucu ayrımı](/roadmap/pbs/) gibi diğer yol haritası öğelerinin öncelikle tamamlanması gerekmektedir.

Bu rol için [Verkle Ağaçları](/roadmap/verkle-trees/) araştırılmıştı, ancak Verkle ağacı teklifi ([EIP-6800](https://eips.ethereum.org/EIPS/eip-6800)) şu anda durgun durumdadır. EIP-7864 hâlâ bir taslaktır ve bir ağ güncellemesi için planlanmamıştır.
