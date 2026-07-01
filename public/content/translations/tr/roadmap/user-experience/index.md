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

[Düğüm](/glossary/#node) çalıştıran kullanıcılar, kendilerine veri sağlaması için üçüncü taraflara güvenmek zorunda kalmazlar ve Ethereum [blokzinciri](/glossary/#blockchain) ile hızlı, gizli ve izinsiz bir şekilde etkileşime girebilirler. Ancak, şu anda bir düğüm çalıştırmak teknik bilgi ve önemli miktarda disk alanı gerektirir, bu da birçok kişinin bunun yerine aracılara güvenmesi gerektiği anlamına gelir.

Düğüm çalıştırmayı çok daha kolay ve çok daha az kaynak yoğun hale getirecek çeşitli yükseltmeler vardır. Verilerin depolanma şekli, **Verkle Ağacı** olarak bilinen, alan açısından daha verimli bir yapı kullanacak şekilde değiştirilecektir. Ayrıca, [durumsuzluk](/roadmap/statelessness) veya [veri süresi sonu](/roadmap/statelessness/#data-expiry) ile Ethereum düğümlerinin tüm Ethereum durum verilerinin bir kopyasını depolamasına gerek kalmayacak ve sabit disk alanı gereksinimleri büyük ölçüde azalacaktır. [Hafif düğümler](/developers/docs/nodes-and-clients/light-clients/), tam düğüm çalıştırmanın birçok avantajını sunacak ancak cep telefonlarında veya basit tarayıcı uygulamalarında kolayca çalışabilecektir.

<ButtonLink variant="outline-color" href="/roadmap/verkle-trees/">Verkle ağaçları hakkında bilgi edinin</ButtonLink>

Bu yükseltmelerle, bir düğüm çalıştırmanın önündeki engeller fiilen sıfıra inmektedir. Kullanıcılar, bilgisayarlarında veya cep telefonlarında belirgin bir disk alanı veya CPU feda etmek zorunda kalmadan Ethereum'a güvenli, izinsiz erişimden yararlanacak ve uygulamaları kullandıklarında veri veya ağ erişimi için üçüncü taraflara güvenmek zorunda kalmayacaklardır.

## Mevcut ilerleme {#current-progress}

Akıllı sözleşme cüzdanları halihazırda mevcuttur, ancak bunları mümkün olduğunca merkeziyetsiz ve izinsiz hale getirmek için daha fazla yükseltme gereklidir. EIP-4337, Ethereum protokolünde herhangi bir değişiklik gerektirmeyen olgun bir tekliftir. EIP-4337 için gerekli olan ana akıllı sözleşme **Mart 2023'te dağıtılmıştır**.

**Tam durumsuzluk hâlâ araştırma aşamasındadır** ve uygulanmasına muhtemelen birkaç yıl vardır. Tam durumsuzluğa giden yolda, veri süresi sonu da dahil olmak üzere daha erken uygulanabilecek birkaç dönüm noktası bulunmaktadır. [Verkle Ağaçları](/roadmap/verkle-trees/) ve [Teklifçi-oluşturucu ayrımı (PBS)](/roadmap/pbs/) gibi diğer yol haritası öğelerinin öncelikle tamamlanması gerekmektedir.

Verkle ağacı test ağları halihazırda çalışır durumdadır ve bir sonraki aşama, Verkle ağacı etkinleştirilmiş istemcileri önce özel, ardından genel test ağlarında çalıştırmaktır. Test ağlarına sözleşmeler dağıtarak veya test ağı istemcilerini çalıştırarak ilerlemeyi hızlandırmaya yardımcı olabilirsiniz.
