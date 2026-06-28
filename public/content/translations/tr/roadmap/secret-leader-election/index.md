---
title: Gizli lider seçimi
description: Gizli lider seçiminin doğrulayıcıları saldırılardan korumaya nasıl yardımcı olabileceğinin açıklaması
lang: tr
summaryPoints:
  - Blok teklifçilerinin IP adresleri önceden bilinebilir, bu da onları saldırılara karşı savunmasız hale getirir
  - Gizli lider seçimi, doğrulayıcıların kimliğini gizleyerek önceden bilinmelerini engeller
  - Bu fikrin bir uzantısı, her slotta doğrulayıcı seçimini rastgele hale getirmektir.
---

Günümüzün [Hisse Kanıtı (PoS)](/developers/docs/consensus-mechanisms/pos) tabanlı mutabakat mekanizmasında, yaklaşan blok teklifçilerinin listesi herkese açıktır ve IP adreslerini eşleştirmek mümkündür. Bu, saldırganların hangi doğrulayıcıların bir blok teklif edeceğini belirleyebileceği ve onları zamanında blok teklif edemez hale getiren bir hizmet reddi (DOS) saldırısıyla hedef alabileceği anlamına gelir.

Bu, bir saldırganın kâr elde etmesi için fırsatlar yaratabilir. Örneğin, `n+1` slotu için seçilen bir blok teklifçisi, `n` slotundaki teklif ediciye DOS saldırısı düzenleyerek blok teklif etme fırsatını kaçırmasına neden olabilir. Bu, saldıran blok teklifçisinin her iki slotun MEV'sini çıkarmasına veya iki bloğa bölünmesi gereken tüm işlemleri alıp hepsini tek bir bloğa dahil ederek ilgili tüm ücretleri kazanmasına olanak tanır. Bunun, kendilerini DOS saldırılarından korumak için daha gelişmiş yöntemler kullanabilen karmaşık kurumsal doğrulayıcılardan ziyade ev doğrulayıcılarını etkilemesi muhtemeldir ve bu nedenle merkezileştirici bir güç olabilir.

Bu sorunun birkaç çözümü vardır. Bunlardan biri, bir doğrulayıcı çalıştırmayla ilgili çeşitli görevleri yedekli bir şekilde birden fazla makineye yaymayı amaçlayan ve böylece bir saldırganın belirli bir slotta bir bloğun teklif edilmesini engellemesini çok daha zor hale getiren [Dağıtık Doğrulayıcı Teknolojisi (DVT)](https://github.com/ethereum/distributed-validator-specs)'dir. Ancak en sağlam çözüm **Tekli Gizli Lider Seçimi (SSLE)**'dir.

## Tekli gizli lider seçimi {#secret-leader-election}

SSLE'de, yalnızca seçilen doğrulayıcının seçildiğini bilmesini sağlamak için akıllı kriptografi kullanılır. Bu, her doğrulayıcının hepsinin paylaştığı bir sırra bir taahhüt sunmasıyla çalışır. Taahhütler karıştırılır ve yeniden yapılandırılır, böylece hiç kimse taahhütleri doğrulayıcılarla eşleştiremez ancak her doğrulayıcı hangi taahhüdün kendisine ait olduğunu bilir. Ardından, rastgele bir taahhüt seçilir. Bir doğrulayıcı kendi taahhüdünün seçildiğini tespit ederse, blok teklif etme sırasının kendisinde olduğunu anlar.

Bu fikrin önde gelen uygulamasına [Whisk](https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763) adı verilir. Şu şekilde çalışır:

1. Doğrulayıcılar paylaşılan bir sırra taahhütte bulunurlar. Taahhüt şeması, bir doğrulayıcı kimliğine bağlanabilecek ancak aynı zamanda hiçbir üçüncü tarafın bu bağı tersine mühendislikle çözemeyeceği ve belirli bir taahhüdü belirli bir doğrulayıcıyla ilişkilendiremeyeceği şekilde rastgeleleştirilecek biçimde tasarlanmıştır.
2. Bir dönemin başlangıcında, RANDAO kullanılarak 16.384 doğrulayıcıdan taahhütleri örneklemek için rastgele bir doğrulayıcı kümesi seçilir.
3. Sonraki 8182 slot (1 gün) boyunca, blok teklifçileri kendi özel entropilerini kullanarak taahhütlerin bir alt kümesini karıştırır ve rastgeleleştirir.
4. Karıştırma işlemi bittikten sonra, taahhütlerin sıralı bir listesini oluşturmak için RANDAO kullanılır. Bu liste Ethereum slotlarıyla eşleştirilir.
5. Doğrulayıcılar, taahhütlerinin belirli bir slota eklendiğini görürler ve o slot geldiğinde bir blok teklif ederler.
6. Taahhütlerin slotlara atanmasının her zaman mevcut slotun çok ilerisinde olması için bu adımları tekrarlayın.

Bu, saldırganların bir sonraki bloğu hangi belirli doğrulayıcının teklif edeceğini önceden bilmesini engelleyerek DOS saldırısı olasılığını ortadan kaldırır.

## Gizli tekli olmayan lider seçimi (SnSLE) {#secret-non-single-leader-election}

Ayrıca, **gizli tekli olmayan lider seçimi (SnSLE)** olarak bilinen, İş Kanıtı (PoW) altında blok teklifinin nasıl kararlaştırıldığına benzer şekilde, doğrulayıcıların her birinin her slotta bir blok teklif etme konusunda rastgele bir şansa sahip olduğu bir senaryo yaratmayı amaçlayan ayrı bir teklif de vardır. Bunu yapmanın basit bir yolu, günümüz protokolünde doğrulayıcıları rastgele seçmek için kullanılan RANDAO işlevinden yararlanmaktır. RANDAO'nun temel fikri, birçok bağımsız doğrulayıcı tarafından sunulan hash'lerin karıştırılmasıyla yeterince rastgele bir sayının üretilmesidir. SnSLE'de bu hash'ler, örneğin en düşük değerli hash seçilerek bir sonraki blok teklifçisini seçmek için kullanılabilir. Geçerli hash'lerin aralığı, bireysel doğrulayıcıların her slotta seçilme olasılığını ayarlamak için sınırlandırılabilir. Hash'in `2^256 * 5 / N` değerinden küçük olması gerektiği öne sürülerek (burada `N` = aktif doğrulayıcı sayısı), herhangi bir bireysel doğrulayıcının her slotta seçilme şansı `5/N` olacaktır. Bu örnekte, her slotta en az bir teklif edicinin geçerli bir hash üretme şansı %99,3 olacaktır.

## Mevcut ilerleme {#current-progress}

SSLE ve SnSLE'nin her ikisi de araştırma aşamasındadır. Henüz her iki fikir için de kesinleşmiş bir spesifikasyon yoktur. SSLE ve SnSLE, her ikisi birden uygulanamayacak rakip tekliflerdir. Piyasaya sürülmeden önce daha fazla araştırma ve geliştirme, prototipleme ve halka açık test ağlarında uygulanmaya ihtiyaçları vardır.

## Daha fazla okuma {#further-reading}

- [SnSLE](https://ethresear.ch/t/secret-non-single-leader-election/11789)