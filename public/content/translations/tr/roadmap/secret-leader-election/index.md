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

Günümüzdeki [hisse ispatı](/developers/docs/consensus-mechanisms/pos) tabanlı mutabakat mekanizmasında, gelecek blok önericilerinin listesi halka açıktır ve IP adreslerini eşleştirmek mümkündür. Bu saldırganların hangi doğrulayıcıların blok önermek üzere olduğunu bulup onları bir DOS (hizmet reddi) saldırısı ile hedef alarak blok önerilerini zamanında yapmasına engel olabileceği anlamına geliyor.

Bu olay saldırganların kâr sağlaması için bir fırsat. Örneğin, `n+1` yuvası için seçilen bir blok önericisi, `n` yuvasındaki önericiye DOS saldırısı yaparak blok önerme fırsatını kaçırmasına neden olabilir. Bu saldırıyı yapan blok önericisinin iki yuvadan da MEV çıkarabilmesine ya da bu iki bloka ayrılmış tüm işlemleri alıp hepsini tek bir blokta toplayabilmesine ve tüm parayı cebe indirmesine olanak sağlar. Bu muhtemelen daha üstün metodlara erişimi olan ve gerektiğinde kendilerini DOS saldırılarından koruyabilecek doğrulayıcılardan çok enstitülü ve komplike doğrulayıcılardan çok ana doğrulayıcıları etkileyecektir ve bu yüzden merkeziyetçi bir güç haline gelebilir.

Bu sorun için birkaç çözüm var. Biri, bir doğrulayıcıyı çalıştırmakla ilgili çeşitli görevleri yedekli bir şekilde birden çok makineye yaymayı amaçlayan [Dağıtılmış Doğrulayıcı Teknolojisi](https://github.com/ethereum/distributed-validator-specs)'dir; böylece bir saldırganın belirli bir yuvada bir blok önerilmesini engellemesi çok daha zor hale gelir. Ancak en sağlam çözüm **Tekli Gizli Lider Seçimi (SSLE)**'dir.

## Tekli gizli lider seçimi {#secret-leader-election}

SSLE'de, sadece doğrulayıcının kendisinin seçildiğini öğrendiğinden emin olan zeki bir kriptografi kullanılır. Bu her doğrulayıcının tuttuğu sır ile alakalı bir taahhüt göndermesi usülüyle çalışır. Kimsenin doğrulayıcılar ve taahhütlerden iz sürememesi için taahhütler karıştırılır ve tekrar onaylanır fakat her doğrulayıcı hangi taahhüdün kendisine ait olduğunu bilir. Sonra, bir taahhüt rasgele seçilir. Eğer bir doğrulayıcı kendi taahhütlerinin seçildiğini tespit ederse, blok önerisi sırasının kendisinde olduğunu bilir.

Bu fikrin önde gelen uygulamasına [Whisk](https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763) denir. Şu şekilde çalışır:

1. Doğrulayıcılar paylaşılan bir sırra atanırlar. Taahhüt şeması doğrulayıcılara bağlanabilecek, ancak üçüncü taraf bir varlığın ters mühendislik yapamayacağı şekilde rastgele hale getirilmiş olarak tasarlanır ve belli bir doğrulayıcıyla belli bir bağ kurulamaz.
2. Bir dönemin başında, rastgele bir doğrulayıcı kümesi RanDao kullanılarak taahhüt örneklendirmesi için 16.384 doğrulayıcı arasından seçilir.
3. Sonraki 8182 yuva (1 gün) için blok önericileri kendi özel entropilerini kullanarak rastgele bir taahhüt alt kümesi hazırlar ve karıştırır.
4. Karıştırma işlemi bittikten sonra, sıralı bir taahhüt listesi için RanDao kullanılır. Listenin haritası Ethereum yuvalarına işlenir.
5. Doğrulayıcılar taahhütlerinin spesifik bir yuvaya atandığını görürler ve o spesifik yuva kendilerine ulaştığında blok öneri işlemlerini yaparlar.
6. Bu adımlar taahhüt yuvalarının her zaman şu anki yuvadan daha ilerde olması için tekrar edilir.

Bu olay saldırganları hangi spesifik doğrulayıcının sonraki bloku önereceğini bilmesini engeller, dolayısıyla DOS saldırısı yapılamaz.

## Gizli tekli olmayan lider seçimi (SnSLE) {#secret-non-single-leader-election}

Ayrıca, **gizli tekli olmayan lider seçimi (SnSLE)** olarak bilinen ve doğrulayıcıların her birinin her yuvada bir blok önermek için rastgele bir şansa sahip olduğu, iş ispatı altında blok önerisine nasıl karar verildiğine benzer bir senaryo oluşturmayı amaçlayan ayrı bir teklif de vardır. Bunu yapmanın basit bir yolu da, bugünün protokolünde doğrulayıcıları rastgele seçmeyi sağlayan bir RanDao fonksiyonunu kullanmaktır. RanDao fikri, çok sayıda bağımsız doğrulayıcı tarafından gönderilen karmalar karıştırılarak yeterince rastgele sayının oluşturulmasıdır. SnSLE'de bu karmalar sonraki blok önericisini seçmek için kullanılabilir, burada örnek olarak en düşük değerli karmayı seçmek verilebilir. Geçerli karmaların alanı her yuvada farklı bireysel doğrulayıcıların seçilmesi olasılığını ayarlamak için kısıtlanabilir. Karmanın `2^256 * 5 / N` değerinden küçük olması gerektiği ve burada `N` = aktif doğrulayıcı sayısı olduğu ileri sürülerek, her bir yuvada herhangi bir bireysel doğrulayıcının seçilme şansı `5/N` olacaktır. Bu örnekte, her yuvada en az bir önericinin geçerli bir karma oluşturmasının %99,3 şansı olur.

## Mevcut ilerleme {#current-progress}

Hem SSLE hem de SnSLE şu anda araştırma aşamasında. Henüz iki fikrin de sonuçlanmış bir özelliği yok. SSLE ve SnSLE ikisi de hâlâ uygulanamayan öneriler için rekabet halinde. Uygulamaya geçmeden önce halka açık test ağlarında biraz daha araştırmaya, geliştirmeye, prototiplemeye ve denenmeye ihtiyacı var.

## Daha fazla kaynak {#further-reading}

- [SnSLE](https://ethresear.ch/t/secret-non-single-leader-election/11789)
