---
title: Gizli lider seçimi
description: Gizli lider seçimlerinin doğrulayıcıları saldırılardan korumada ne gibi etkileri olduğunun açıklaması
lang: tr
summaryPoints:
  - Blok önericilerinin IP adresleri bilinirse saldırılara karşı kırılgan olurlar
  - Gizli lider seçimleri doğrulayıcının kimliğini gizli tutar ve bu sayede kim oldukları sonrasında da bilinemez
  - Bu fikrin bir uzantısı da her yuvada doğrulayıcı seçimini rastgele şekilde yapmaktır.
---

# Gizli lider seçimi {#single-secret-leader-election}

Bugünün [hisse ispatına](/developers/docs/consensus-mechanisms/pos) bağlı taahhüt mekanizmaasında, yeni blok önericilerinin listeleri halka açık ve IP adreslerinin bulunması da olası. Bu saldırganların hangi doğrulayıcıların blok önermek üzere olduğunu bulup onları bir DOS (hizmet reddi) saldırısı ile hedef alarak blok önerilerini zamanında yapmasına engel olabileceği anlamına geliyor.

Bu olay saldırganların kâr sağlaması için bir fırsat. Örnek olarak `n+1`'deki blok önericisi `n`'deki blok önericisine saldırabilir ve blok önerisi fırsatlarını kaçırmalarına neden olabilir. Bu saldırıyı yapan blok önericisinin iki yuvadan da MEV çıkarabilmesine ya da bu iki bloka ayrılmış tüm işlemleri alıp hepsini tek bir blokta toplayabilmesine ve tüm parayı cebe indirmesine olanak sağlar. Bu muhtemelen daha üstün metodlara erişimi olan ve gerektiğinde kendilerini DOS saldırılarından koruyabilecek doğrulayıcılardan çok enstitülü ve komplike doğrulayıcılardan çok ana doğrulayıcıları etkileyecektir ve bu yüzden merkeziyetçi bir güç haline gelebilir.

Bu sorun için birkaç çözüm var. Bunlardan biri farklı görevleri ilgili doğrulayıcıya çoklu makinelerden göndermek ve fazlalık yaratarak blokun önerilmesine yapılacak olası bir saldırıyı engellemeyi hedefleyen [Dağıtılmış Doğrulayıcı Teknolojisi](https://github.com/ethereum/distributed-validator-specs)'dir. Buna rağmen, en güçlü çözüm yolu **Gizli Tek Lider Seçimi'dir (SSLE)**.

## Tekli gizli lider seçimi {#secret-leader-election}

SSLE'de, sadece doğrulayıcının kendisinin seçildiğini öğrendiğinden emin olan zeki bir kriptografi kullanılır. Bu her doğrulayıcının tuttuğu sır ile alakalı bir taahhüt göndermesi usülüyle çalışır. Kimsenin doğrulayıcılar ve taahhütlerden iz sürememesi için taahhütler karıştırılır ve tekrar onaylanır fakat her doğrulayıcı hangi taahhüdün kendisine ait olduğunu bilir. Sonra, bir taahhüt rasgele seçilir. Eğer bir doğrulayıcı kendi taahhütlerinin seçildiğini tespit ederse, blok önerisi sırasının kendisinde olduğunu bilir.

Bu fikrin öncül uygulamasına [Whisk (Hızla çıkarma)](https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763) denir. Şu şekilde çalışır:

1. Doğrulayıcılar paylaşılan bir sırra atanırlar. Taahhüt şeması doğrulayıcılara bağlanabilecek, ancak üçüncü taraf bir varlığın ters mühendislik yapamayacağı şekilde rastgele hale getirilmiş olarak tasarlanır ve belli bir doğrulayıcıyla belli bir bağ kurulamaz.
2. Bir dönemin başında, rastgele bir doğrulayıcı kümesi RanDao kullanılarak taahhüt örneklendirmesi için 16.384 doğrulayıcı arasından seçilir.
3. Sonraki 8182 yuva (1 gün) için blok önericileri kendi özel entropilerini kullanarak rastgele bir taahhüt alt kümesi hazırlar ve karıştırır.
4. Karıştırma işlemi bittikten sonra, sıralı bir taahhüt listesi için RanDao kullanılır. Listenin haritası Ethereum yuvalarına işlenir.
5. Doğrulayıcılar taahhütlerinin spesifik bir yuvaya atandığını görürler ve o spesifik yuva kendilerine ulaştığında blok öneri işlemlerini yaparlar.
6. Bu adımlar taahhüt yuvalarının her zaman şu anki yuvadan daha ilerde olması için tekrar edilir.

Bu olay saldırganları hangi spesifik doğrulayıcının sonraki bloku önereceğini bilmesini engeller, dolayısıyla DOS saldırısı yapılamaz.

## Tek olmayan gizli lider seçimi (SnSLE) {#secret-non-single-leader-election}

Ayrıca, doğrulayıcıların hepsinin her bir kümede bir blok önermek için rastgele bir şansa sahip olduğu senaryoyu yaratmayı amaçlayan bir ayrıştırılmış öneri seçeneği de vardır, iş ispatı dönemindeki blok önerisi seçme sürecine benzeyen bu uygulamanın adı, **Tek olmayan gizli lider seçimidir (SnSLE)**. Bunu yapmanın basit bir yolu da, bugünün protokolünde doğrulayıcıları rastgele seçmeyi sağlayan bir RanDao fonksiyonunu kullanmaktır. RanDao fikri, çok sayıda bağımsız doğrulayıcı tarafından gönderilen karmalar karıştırılarak yeterince rastgele sayının oluşturulmasıdır. SnSLE'de bu karmalar sonraki blok önericisini seçmek için kullanılabilir, burada örnek olarak en düşük değerli karmayı seçmek verilebilir. Geçerli karmaların alanı her yuvada farklı bireysel doğrulayıcıların seçilmesi olasılığını ayarlamak için kısıtlanabilir. Karmanın `2^256 * 5/N` olduğunda `N` = aktif doğrulayıcı sayısı olduğu ileri sürülürse, her yuvada herhangi bir ayrı bireysel doğrulayıcının seçilme ihtimali de `5/N` olur. Bu örnekte, her yuvada en az bir önericinin geçerli bir karma oluşturmasının %99,3 şansı olur.

## Güncel ilerleme {#current-progress}

Hem SSLE hem de SnSLE şu anda araştırma aşamasında. Henüz iki fikrin de sonuçlanmış bir özelliği yok. SSLE ve SnSLE ikisi de hâlâ uygulanamayan öneriler için rekabet halinde. Uygulamaya geçmeden önce halka açık test ağlarında biraz daha araştırmaya, geliştirmeye, prototiplemeye ve denenmeye ihtiyacı var.

## Daha fazla bilgi {#further-reading}

- [SnSLE](https://ethresear.ch/t/secret-non-single-leader-election/11789)
