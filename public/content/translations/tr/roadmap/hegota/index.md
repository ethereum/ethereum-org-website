---
title: "Hegotá"
metaTitle: "Heze-Bogotá (Hegotá)"
description: "Hegotá protokol yükseltmesi hakkında bilgi edinin"
lang: tr
template: upgrade
---

Hegotá, [Glamsterdam](/roadmap/glamsterdam/)'ı takip etmesi beklenen [Ethereum](/) ağ yükseltmesidir. Adını "Bogotá" (önceki bir Devcon konumunun adını taşıyan yürütme katmanı yükseltmesi) ve "Heze" (bir yıldızın adını taşıyan mutabakat katmanı yükseltmesi) kelimelerinin birleşiminden alır.

Hegotá erken planlama aşamasındadır. Ana özelliği seçilmiş ve o zamandan beri ikinci bir değişiklik planlanmıştır, ancak kapsamın geri kalanı hala kararlaştırılmaktadır ve henüz bir tarih belirlenmemiştir.

## Ana Özellik: FOCIL {#focil}

<EipTag upgrade="hegota" id={7805} />

Çatallanma seçimi ile zorunlu kılınan dahil etme listeleri (FOCIL veya EIP-7805), [sansür direnci](/roadmap/security/#censorship-resistance) ile ilgilidir: blok oluşturan kişiler onu dışarıda bırakmayı tercih etse bile geçerli bir işlemin bir bloğa girmesini sağlamak.

Bugün her bloğu tek bir [doğrulayıcı](/glossary/#validator) oluşturur ve hangi işlemleri içereceğine karar verir. Bu nedenle, yeterli sayıda blok oluşturucuyu etkileyebilen herkes bir işlemi geciktirebilir ve bir kullanıcının beklemek ve umut etmek dışında bu durumu zorlamasının bir yolu yoktur.

FOCIL bu kararı birçok doğrulayıcıya yayar. Bir komite, dahil edilmesi gereken işlemlerin bir listesini teklif eder ve protokol kuralları, blok oluşturucuyu bu listelere uymakla yükümlü kılar. Bir işlemi sansürlemek, tek bir tarafın tek başına yapabileceği bir şey olmaktan çıkar.

## Çerçeve işlemleri {#frame-transactions}

<EipTag upgrade="hegota" id={8141} />

Çerçeve işlemleri (EIP-8141), protokolün sabit bir imza şemasında ısrar etmesi yerine, bir [hesabın](/glossary/#account) neyin geçerli bir işlem sayılacağına kendisinin karar vermesini sağlar.

Bugün her işlem aynı şekilde yetkilendirilir: tek bir anahtardan tek bir imza. [Akıllı sözleşme hesapları](/roadmap/account-abstraction/), işlemleri ekstra altyapı üzerinden yönlendirerek bu durumu aşar; bu da gaz maliyeti yaratır ve arızalanabilecek hareketli parçalar ekler.

Bir çerçeve işlemi, kontrolü hesabın kendisine taşır. Hesap kendi doğrulama mantığını çalıştırır, böylece şu anda bu ekstra altyapıya ihtiyaç duyan yetenekler — sosyal kurtarma, harcama limitleri, birkaç onay gerektirme, gazı başkasının ödemesine izin verme — protokolün doğrudan desteklediği şeyler haline gelir.

Hesap kendi kurallarını seçtiği için, kuantum bilgisayarın kıramayacağı bir imza şeması da seçebilir. Bu, daha iyi cüzdanların yanı sıra [kuantum direncine](/roadmap/security/#quantum-resistance) doğru atılmış bir adım olmasını sağlar.

## Hegotá'da başka neler var {#scope}

Henüz karar verilmedi. FOCIL ve çerçeve işlemleri şu ana kadar planlanan iki değişikliktir; düzinelerce daha fazlası teklif edildi ve hiçbiri henüz kesinleşmedi. Kapsam netleşene kadar bu sayfa kısa kalacaktır — tartışmanın mevcut durumu için aşağıdaki kaynaklara bakın.

## Daha fazla bilgi {#further-reading}

- [Forkcast: Hegotá](https://forkcast.org/upgrade/hegota) — her teklifin canlı durumu
- [Hegotá Meta EIP (EIP-8081)](https://eips.ethereum.org/EIPS/eip-8081)
- [EIP-7805 teknik spesifikasyonu](https://eips.ethereum.org/EIPS/eip-7805)
- [EIP-8141 teknik spesifikasyonu](https://eips.ethereum.org/EIPS/eip-8141)
- [Ethereum yol haritası](/roadmap/)
