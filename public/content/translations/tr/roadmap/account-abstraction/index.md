---
title: Hesap soyutlama
description: Ethereum'un kullanıcı hesaplarını daha basit ve daha güvenli hale getirme planlarına genel bir bakış
lang: tr
summaryPoints:
  - Hesap soyutlama, akıllı sözleşme cüzdanları oluşturmayı çok daha kolay hale getirir
  - Akıllı sözleşme cüzdanları, Ethereum hesaplarına erişimi yönetmeyi çok daha kolay hale getirir
  - Kaybolan ve açığa çıkan anahtarlar, birden fazla yedekleme kullanılarak kurtarılabilir
---

Mevcut kullanıcıların çoğu [Ethereum](/) ile **[harici olarak sahip olunan hesaplar (EOA'lar)](/glossary/#eoa)** kullanarak etkileşime girer. Bu, kullanıcıların Ethereum ile nasıl etkileşime girebileceğini sınırlar. Örneğin, işlem grupları yapmayı zorlaştırır ve kullanıcıların işlem ücretlerini ödemek için her zaman bir ETH bakiyesi tutmasını gerektirir.

Hesap soyutlama, kullanıcıların hesaplarına daha fazla güvenlik ve daha iyi kullanıcı deneyimlerini esnek bir şekilde programlamalarına olanak tanıyarak bu sorunları çözmenin bir yoludur. Bu, akıllı sözleşmeler tarafından kontrol edilebilmeleri için [EOA'ları yükselterek](https://eips.ethereum.org/EIPS/eip-7702) (EIP-7702) gerçekleşebilir. Mevcut protokole paralel olarak çalışacak [ikinci, ayrı bir işlem sistemi](https://eips.ethereum.org/EIPS/eip-4337) (EIP-4337) eklemeyi içeren başka bir yol daha vardır. Hangi yol seçilirse seçilsin, sonuç, mevcut protokolün bir parçası olarak yerel olarak desteklenen veya eklenti bir işlem ağı aracılığıyla akıllı sözleşme cüzdanları üzerinden Ethereum'a erişimdir.

Akıllı sözleşme cüzdanları, kullanıcı için aşağıdakiler de dahil olmak üzere birçok avantajın kilidini açar:

- kendi esnek güvenlik kurallarınızı tanımlama
- anahtarları kaybederseniz hesabınızı kurtarma
- hesap güvenliğinizi güvenilir cihazlar veya kişiler arasında paylaşma
- başkasının gazını ödeme veya başkasının sizinkini ödemesini sağlama
- işlemleri gruplama (örneğin, bir takası tek seferde onaylamak ve yürütmek)
- merkeziyetsiz uygulama (dapp) ve cüzdan geliştiricilerinin kullanıcı deneyimlerinde yenilik yapmaları için daha fazla fırsat

Bu avantajlar bugün yerel olarak desteklenmemektedir çünkü yalnızca harici olarak sahip olunan hesaplar ([EOA'lar](/glossary/#eoa)) işlemleri başlatabilir. EOA'lar basitçe genel-özel anahtar çiftleridir. Şu şekilde çalışırlar:

- özel anahtara sahipseniz, Ethereum Sanal Makinesi (EVM) kuralları dahilinde _her şeyi_ yapabilirsiniz
- özel anahtara sahip değilseniz _hiçbir şey_ yapamazsınız.

Anahtarlarınızı kaybederseniz kurtarılamazlar ve çalınan anahtarlar, hırsızlara bir hesaptaki tüm fonlara anında erişim sağlar.

Akıllı sözleşme cüzdanları bu sorunların çözümüdür, ancak bugün programlanmaları zordur çünkü sonuçta, uyguladıkları herhangi bir mantığın Ethereum tarafından işlenebilmesi için bir dizi EOA işlemine çevrilmesi gerekir. Hesap soyutlama, akıllı sözleşmelerin işlemleri kendilerinin başlatmasını sağlar, böylece kullanıcının uygulamak istediği herhangi bir mantık akıllı sözleşme cüzdanının kendisine kodlanabilir ve Ethereum üzerinde yürütülebilir.

Sonuç olarak, hesap soyutlama, akıllı sözleşme cüzdanları için desteği iyileştirerek onları oluşturmayı daha kolay ve kullanmayı daha güvenli hale getirir. Hesap soyutlama ile kullanıcılar, altta yatan teknolojiyi anlamaya gerek kalmadan Ethereum'un tüm avantajlarından yararlanabilirler.

## Kurtarma ifadelerinin ötesinde {#beyond-seed-phrases}

Günümüzün hesapları, kurtarma ifadelerinden hesaplanan özel anahtarlar kullanılarak güvence altına alınmaktadır. Bir kurtarma ifadesine erişimi olan herkes, bir hesabı koruyan özel anahtarı kolayca keşfedebilir ve koruduğu tüm varlıklara erişim sağlayabilir. Bir özel anahtar ve kurtarma ifadesi kaybolursa, varlıklara kalıcı olarak erişilemez. Bu kurtarma ifadelerini güvence altına almak, uzman kullanıcılar için bile zordur ve kurtarma ifadesi oltalama saldırıları en yaygın dolandırıcılıklardan biridir.

Hesap soyutlama, varlıkları tutmak ve işlemleri yetkilendirmek için bir akıllı sözleşme kullanarak bunu çözer. Akıllı sözleşmeler, maksimum güvenlik ve kullanılabilirlik için uyarlanmış özel mantık içerebilir. Kullanıcılar erişimi kontrol etmek için hala özel anahtarları kullanırlar, ancak gelişmiş güvenlik önlemleriyle.

Örneğin, bir cüzdana yedek anahtarlar eklenebilir, bu da birincil anahtarın tehlikeye girmesi durumunda anahtar değişimini sağlar. Her anahtar farklı şekilde güvence altına alınabilir veya güvenilir kişiler arasında dağıtılabilir, bu da güvenliği önemli ölçüde artırır. Ek cüzdan kuralları, yüksek değerli işlemler için birden fazla imza gerektirmek veya işlemleri güvenilir adreslerle sınırlamak gibi anahtarın açığa çıkmasından kaynaklanan hasarı hafifletebilir.

## Daha iyi kullanıcı deneyimi {#better-user-experience}

Hesap soyutlama, akıllı sözleşme cüzdanlarını protokol düzeyinde destekleyerek kullanıcı deneyimini ve güvenliği büyük ölçüde artırır. Geliştiriciler, hız ve verimlilik için işlem gruplamayı iyileştirerek özgürce yenilik yapabilirler. Basit takaslar tek tıklamalı işlemler haline gelebilir ve kullanım kolaylığını önemli ölçüde artırabilir.

Gaz yönetimi önemli ölçüde iyileşir. Uygulamalar kullanıcıların gaz ücretlerini ödeyebilir veya ETH dışındaki tokenlarla ödeme yapılmasına izin vererek ETH bakiyesi tutma ihtiyacını ortadan kaldırabilir.

## Hesap soyutlama nasıl uygulanacak? {#how-will-aa-be-implemented}

Şu anda, akıllı sözleşme cüzdanlarının uygulanması zordur çünkü standart işlemleri saran karmaşık kodlara dayanırlar. Ethereum, akıllı sözleşmelerin işlemleri doğrudan başlatmasına izin vererek, harici aktarıcılara güvenmek yerine mantığı Ethereum akıllı sözleşmelerine yerleştirerek bunu değiştirebilir.

### EIP-4337: Protokol değişiklikleri olmadan hesap soyutlama {#eip-4337-account-abstraction-without-protocol-changes}

EIP-4337, Ethereum'un çekirdek protokolünü değiştirmeden yerel akıllı sözleşme cüzdanı desteği sağlar. Doğrulayıcılar tarafından işlem grupları halinde toplanan `UserOperation` nesnelerini tanıtarak cüzdan geliştirmeyi basitleştirir. EIP-4337 EntryPoint sözleşmesi 1 Mart 2023'te Ethereum Ana Ağı'na dağıtıldı ve 26 milyondan fazla akıllı cüzdanın ve 170 milyondan fazla UserOperations'ın oluşturulmasını kolaylaştırdı.

## Mevcut ilerleme {#current-progress}

Ethereum'un Pectra yükseltmesinin bir parçası olarak, EIP-7702'nin 7 Mayıs 2025'te yapılması planlanıyor. EIP-4337, [dağıtılan 26 milyondan fazla akıllı hesap ve işlenen 170 milyondan fazla UserOperations ile](https://www.bundlebear.com/erc4337-overview/all) geniş çapta benimsenmiştir.

## Daha fazla bilgi {#further-reading}

- [erc4337.io](https://docs.erc4337.io/)
- [EIP-4337 belgeleri](https://eips.ethereum.org/EIPS/eip-4337)
- [EIP-7702 belgeleri](https://eips.ethereum.org/EIPS/eip-7702)
- [ERC-4337 benimsenme panosu](https://www.bundlebear.com/erc4337-overview/all)
- [Vitalik'in "Hesap Soyutlamaya Giden Yol" yazısı](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Vitalik'in sosyal kurtarma cüzdanları hakkındaki blog yazısı](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Awesome Account Abstraction](https://github.com/4337Mafia/awesome-account-abstraction)