---
title: Hesap soyutlama
description: Ethereum'un kullanıcı hesaplarını daha basit ve daha güvenli hale getirme planlarına genel bir bakış
lang: tr
summaryPoints:
  - Hesap soyutlama, akıllı sözleşme cüzdanları oluşturmayı kolaylaştırır
  - Akıllı sözleşme cüzdanları, Ethereum hesaplarına erişimi yönetmeyi kolaylaştırır
  - Kaybolmuş ve ifşa olmuş anahtarlar, birden çok yedekleme yolu kullanılarak kurtarılabilir
---

# Hesap soyutlama {#account-abstraction}

Mevcut kullanıcıların çoğu, Ethereum ile **[harici olarak sahiplenilmiş hesapları (EOA'lar)](/glossary/#eoa)** kullanarak etkileşim kurar. Bu durum, kullanıcıların Ethereum ile etkileşime girmesini sınırlamaktadır. Örneğin, bu durum toplu işlem yapmayı zorlaştırır ve kullanıcıların işlem ücretlerini ödemek için her zaman bir ETH bakiyesine sahip olmalarını gerektirir.

Hesap soyutlama, kullanıcıların hesaplarına esnek bir şekilde daha fazla güvenlik ve daha iyi kullanıcı deneyimi planlamasına olanak tanıyarak bu sorunları çözmeyi amaçlayan bir yoldur. Bu, akıllı sözleşmeler tarafından kontrol edilebilmeleri için [EOA'ların yükseltilmesiyle](https://eips.ethereum.org/EIPS/eip-7702) (EIP-7702) gerçekleşebilir. Ayrıca mevcut protokole paralel olarak çalışacak [ikinci, ayrı bir işlem sistemi](https://eips.ethereum.org/EIPS/eip-4337) (EIP-4337) eklemeyi içeren başka bir yol daha vardır. Seçilen yol her ne olursa olsun sonuç, Ethereum'a akıllı sözleşme cüzdanları aracılığıyla erişmektir. Bu, ya mevcut protokolün bir parçası olarak yerel olarak desteklenir ya da bir eklenti işlem ağı vasıtasıyla gerçekleşir.

Akıllı sözleşme cüzdanları, kullanıcı için aşağıdakiler de dahil olmak üzere pek çok avantajın kilidini açar:

- kendi esnek güvenlik kurallarınızı tanımlamak
- cüzdan şifrelerinizi/anahtarlarınızı kaybederseniz hesabınızı kurtarabilmek
- hesap güvenliğinizi güvenilir cihazlar veya kişiler arasında paylaşmak
- başkalarının işlem ücretlerini ödemek veya başkasının sizin işlem ücretlerinizi ödemesini sağlamak
- işlemleri birlikte gruplama (örneğin bir takası tek seferde onaylayıp yürütme)
- merkeziyetsiz uygulamalar ve cüzdan geliştiricileri için kullanıcı deneyimlerinde yenilik yapma konusunda daha pek çok fırsat

Bu faydalar bugün yerel olarak desteklenmemektedir çünkü yalnızca harici olarak sahiplenilmiş hesaplar ([EOA'lar](/glossary/#eoa)) işlem başlatabilir. EOA'lar basitçe genel-özel anahtar çiftlerinden oluşur. Şu şekilde çalışmaktadırlar:

- eğer özel anahtara sahipseniz, Ethereum Sanal Makinesi (EVM) kuralları dahilinde _her şeyi_ yapabilirsiniz
- eğer özel anahtara sahip değilseniz, _hiçbir şey_ yapamazsınız.

Anahtarlarınızı kaybederseniz, hesaplar kurtarılamazlar. Çalınan anahtarlar, hırsızların bir hesaptaki tüm paraya anında erişmesini sağlar.

Akıllı sözleşme cüzdanları bu sorunların çözümüdür, ancak günümüzde bunları programlamak zordur çünkü nihayetinde uyguladıkları herhangi bir mantığın, Ethereum tarafından işlenmeden önce bir dizi EOA işlemine çevrilmesi gerekir. Hesap soyutlama, akıllı sözleşmelerin işlemleri kendilerinin başlatabilmesini. sağlar. Böylece kullanıcının uygulamak istediği herhangi bir mantık, akıllı sözleşme cüzdanının kendisi üzerine kodlanabilir ve Ethereum üzerinde yürütülebilir.

Sonuç olarak hesap soyutlama, akıllı sözleşme cüzdanlarına yönelik desteği geliştirerek, bunların oluşturulmasını kolaylaştırır ve kullanımını daha güvenli hale getirir. Hesap soyutlama ile kullanıcılar, temelindeki teknolojiyi anlamak zorunda kalmadan Ethereum'un tüm avantajlarından yararlanabilirler.

## Güvenlik kelimelerinin ötesinde {#beyond-seed-phrases}

Bugün mevcut olan hesaplar, güvenlik kelimelerinden hesaplanan özel anahtarlar kullanılarak güvence altına alınmıştır. Güvenlik kelimelerine erişimi olan herhangi bir kişi, bir hesabı koruyan özel anahtarı kolayca keşfedebilir ve koruduğu tüm varlıklara erişim sağlayabilir. Özel anahtar ve güvenlik kelimeleri kaybolursa varlıklara kalıcı olarak erişilemez. Bu güvenlik kelimelerini güvence altına almak uzman kullanıcılar için bile zahmetlidir ve güvenlik kelimesi oltalama dolandırıcılığı, en yaygın dolandırıcılık türlerinden biridir.

Hesap soyutlama, varlıkları tutmak ve işlemleri yetkilendirmek için bir akıllı sözleşme kullanarak bu sorunu çözer. Akıllı sözleşmeler, maksimum güvenlik ve kullanılabilirlik için özel olarak tasarlanmış özel mantık içerebilir. Kullanıcılar erişimi kontrol etmek için yine de özel anahtarları kullanır, ancak bu, gelişmiş güvenlik önlemleriyle yapılır.

Örneğin, birincil anahtarın ele geçirilmesi durumunda anahtarın değiştirilmesini sağlamak için bir cüzdana yedek anahtarlar eklenebilir. Her anahtar farklı şekilde güvence altına alınabilir veya güvenilir kişiler arasında dağıtılabilir, bu da güvenliği önemli ölçüde artırır. Ek cüzdan kuralları, yüksek değerli işlemler için birden fazla imza gerektirmek veya işlemleri güvenilir adreslerle kısıtlamak gibi önlemlerle anahtarın açığa çıkmasından kaynaklanan hasarı azaltabilir.

## Daha iyi kullanıcı deneyimi {#better-user-experience}

Hesap soyutlama, protokol düzeyinde akıllı sözleşme cüzdanlarını destekleyerek kullanıcı deneyimini ve güvenliği büyük ölçüde artırır. Geliştiriciler, hız ve verimlilik için işlem gruplamayı iyileştirerek özgürce yenilik yapabilir. Basit takaslar tek tıklamayla gerçekleştirilen işlemlere dönüşerek kullanım kolaylığını önemli ölçüde artırabilir.

Gaz yönetimi önemli ölçüde iyileşir. Uygulamalar, kullanıcıların gaz ücretlerini ödeyebilir veya ETH dışındaki jetonlarla ödeme yapılmasına izin vererek ETH bakiyesi bulundurma ihtiyacını ortadan kaldırabilir.

## Hesap soyutlama uygulamaya nasıl geçecek? {#how-will-aa-be-implemented}

Şu anda, akıllı sözleşme cüzdanlarını uygulamak zordur çünkü standart işlemleri sarmalayan karmaşık kodlara dayanırlar. Ethereum, akıllı sözleşmelerin doğrudan işlem başlatmasına izin vererek ve mantığı harici aktarıcılara dayanmak yerine Ethereum akıllı sözleşmelerine gömerek bunu değiştirebilir.

### EIP-4337: Protokol değişiklikleri olmadan hesap soyutlama

EIP-4337, Ethereum'un çekirdek protokolünü değiştirmeden yerel akıllı sözleşme cüzdanı desteği sağlar. Doğrulayıcılar tarafından işlem paketleri halinde toplanan `UserOperation` nesnelerini tanıtarak cüzdan geliştirmeyi basitleştirir. EIP-4337 Giriş Noktası sözleşmesi 1 Mart 2023'te Ethereum Ana Ağı'na dağıtıldı ve 26 milyondan fazla akıllı cüzdan ile 170 milyon UserOperation'ın oluşturulmasını kolaylaştırdı.

## Mevcut ilerleme {#current-progress}

Ethereum'un Pectra yükseltmesinin bir parçası olarak EIP-7702, 7 Mayıs 2025 için planlanmıştır. EIP-4337, [26 milyondan fazla akıllı hesabın dağıtılması ve 170 milyondan fazla UserOperation'ın işlenmesiyle](https://www.bundlebear.com/erc4337-overview/all) yaygın olarak benimsenmiştir.

## Daha fazla kaynak {#further-reading}

- [erc4337.io](https://docs.erc4337.io/)
- [EIP-4337 dökümanları](https://eips.ethereum.org/EIPS/eip-4337)
- [EIP-7702 dökümanları](https://eips.ethereum.org/EIPS/eip-7702)
- [ERC-4337 benimsenme panosu](https://www.bundlebear.com/erc4337-overview/all)
- [Vitalik'in "Hesap Soyutlamaya Giden Yol"u](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Vitalik'in sosyal kurtarma cüzdanları hakkındaki blog yazısı](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Harika Hesap Soyutlama](https://github.com/4337Mafia/awesome-account-abstraction)
