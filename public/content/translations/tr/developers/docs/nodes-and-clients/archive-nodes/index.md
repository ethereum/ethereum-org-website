---
title: Ethereum Arşiv Düğümü
description: Arşiv düğümlerine genel bakış
lang: tr
sidebarDepth: 2
---

Bir arşiv düğümü, tüm geçmiş durumların arşivini oluşturacak şekilde inşa edilmiş bir ethereum istemcisi örneğidir. Berlirli kullanım durumlarında kullanışlı bir araçtır, ancak çalıştırmak tam bir düğümü çalıştırmaktan daha zor olabilir.

## Ön Koşullar {#prerequisites}

Bir [Ethereum düğümü](/developers/docs/nodes-and-clients/) kavramını, [mimarisi](/developers/docs/nodes-and-clients/node-architecture/), [senkronizasyon stratejileri](/developers/docs/nodes-and-clients/#sync-modes), [çalıştırma](/developers/docs/nodes-and-clients/run-a-node/) ve [kullanma](/developers/docs/apis/json-rpc/) pratiklerini anlamalısınız.

## Arşiv düğümü nedir

Arşiv düğümünün önemini kavramak için, "durum" kavramını zihninizde netleştirin Ethereum, _işlem tabanlı durum makinesi_ olarak adlandırılabilir. Durumlarını değiştiren hesaplar ve uygulamaların işlemlerini yürütmeyi içerir. Tüm hesaplar ve sözleşmeler hakkında bilgi içeren global veriler durum adı verilen trie veritabanında saklanır. Bu, yürütüm katmanı (EL) istemcisi tarafından işlenir ve şunları içerir:

- Hesap bakiyeleri ve nonce'ler
- Sözleşme kodu ve depolama
- Mutabakatla ilgili veriler, örn. Hisseleme Mevduat Sözleşmesi

Ethereum istemcileri, ağ ile etkileşime girmek, yeni bloklar üretmek ve oluşturmak için, en güncel değişiklikleri (zinricin ucunu) ve dolayısıyla mevcut durumu takip etmelidir. Tam düğüm olarak yapılandırılmış bir yürütme katmanı istemcisi, ağın en son durumunu doğrular ve takip eder, ancak yalnızca geçmişteki birkaç durumu, örn. son 128 blokla ilişkili durumu önbelleğe alır; böylece zincir yeniden düzenlemelerini işleyebilir ve son verilere hızlı erişim sağlayabilir. Son durum, istemcilerin gelen işlemleri doğrulaması ve ağı kullanması için gereken şeydir.

Durumu, bloklardaki anlık bir ağ görüntüsü olarak ve arşivi ise geçmişin tekrarı gibi düşünebilirsiniz.

Daha eski durumlar, ağın çalışması için gerekli olmadığından ve zamanı geçmiş verilerin tutulması istemci için gereksiz ve yararsız olacağından güvenli bir şekilde kaldırılabilir. Yakın zamandaki bir bloktan (örn. tepeden 128 blok öncesi) önce var olan durumlar etkili bir şekilde atılır. Tam düğümler sadece eski blok zincir verilerini (blokları ve işemleri) ve ara sıra geçmiş görüntüleri tutar böylece istendiğinde eski durumları yeniden yaratabilir. Bunu eski işlemleri EVM'de (Ethereum Sanal Makinesi'nde) tekrar gerçekleştirerek yaparlar ama bu, istenen durum en yakındaki geçmiş görüntüden uzaksa hesaplama açısından maliyetli olabilir.

Ancak bu, tam düğümde eski bir duruma erişmenin yüksek düzeyde hesaplama gerektirdiğini gösterir. İstemcinin tüm işlemleri tekrardan gerçekleştirmesi ve eski bir durumu başlangıç blokundan itibaren hesaplaması gerekebilir. Arşiv düğümleri bu sorunu, en yeni durumlar yerine her blok oluşturulduktan sonra oluşan durumların hepsini depolayarak çözer. Bu daha yüksek saklama alanı gerektiren bir seçimdir.

Şunu belirtmekte fayda vardır ki, ağlar eski verileri saklamak ve sağlamak işin arşiv düğümlerine bağlı değillerdir. Bahsedildiği gibi tüm geçmiş ara durumlar tam düğümden çıkarılabilir. Tüm işlemler her bir tam düğümde saklanır (şimdilik 400 G'den az) ve tüm arşivi inşa etmek için tekrar oynatılabilir.

### Kullanım alanları

İşlem göndermek, sözleşme dağıtmak, mutabakat doğrulamak gibi Ethereum'un günlük kullanımları eski verilere erişimi gerektirmez. Kullanıcılar bu standart etkileşimler için arşiv düğümlerine ulaşmaya ihtiyaç duymaz.

Durum arşivinin en büyük avantajı, geçmiş durumlarla ilgili sorulara hızlı erişimidir. Örneğin arşiv düğümü aşağıdaki gibi sonuçlar döndürür:

- _0x1337... nolu hesabın ETH bakiyesi neydi... 15537393 numaralı blokta?_
- _Blok 1920000'daki sözleşme 0x'in token 0x bakiyesi nedir?_

Yukarıda açıklandığı gibi, tam düğümler bu verileri EVM (Ethereum Sanal Makinesi) uygulaması ile üretir ve bu CPU ve zaman gerektirir. Arşiv düğümleri bunlara disk üzerinden erişir ve anında yanıt verir. Bu, altyapının belirli bölümleri için kullanışlı bir özelliktir, örneğin:

- Blok arayıcıları gibi servis sağlayıcılar
- Araştırmacılar
- Güvenlik analistleri
- Merkezisyetsiz uygulama geliştiricileri
- Denetim ve uyum

Geçmiş verilere erişim sağlayan çeşitli ücretsiz [hizmetler](/developers/docs/nodes-and-clients/nodes-as-a-service/) de vardır. Arşiv düğümlerini çalıştırmak daha maliyetli olduğu için bu hizmetlere erişim genellikle sınırlıdır ve sürekli değildir. Eğer projeniz geçmiş verilere sürekli erişim gerektiriyorsa, kendiniz bir tane çalıştırmayı düşünmelisiniz.

## Uygulamalar ve kullanim

Bu bağlamda arşiv düğümleri, durum veritabanı işlerken ve JSON-RPC uç noktaları sağlarken kullanıcılara bakan yürütüm katmanı tarafından sağlanan veri anlamına gelir. Yapılandırma seçenekleri, senkronizasyon süresi ve veritabanı boyutu istemciye göre değişebilir. Detaylar için lütfen istemci tarafından sağlanan dökümanları referans alın.

Kendi arşiv düğümünüzü başlatmadan önce, istemciler arasındaki farklar ve özellikle çeşitli [donanım gereksinimleri](/developers/docs/nodes-and-clients/run-a-node/#requirements) hakkında bilgi edinin. Pek çok istemci bu özellik için optimize edilmemiştir ve arşivleri 12 TB'den daha fazla alan gerektirir. Buna karşın Erigon gibi uygulamalar aynı veriyi 3 TB altında saklayabilir. Dolayısıyla bu uygulamalar arşiv düğümü çalıştırmanın en verimli yolu haline gelir.

## Tavsiye edilen uygulamalar

[Bir düğüm çalıştırmaya yönelik genel önerilerin](/developers/docs/nodes-and-clients/run-a-node/) yanı sıra, bir arşiv düğümü donanım ve bakım açısından daha zorlayıcı olabilir. Erigon'un [temel özellikleri](https://github.com/ledgerwatch/erigon#key-features) göz önüne alındığında, en pratik yaklaşım [Erigon](/developers/docs/nodes-and-clients/#erigon) istemci uygulamasını kullanmaktır.

### Donanım

Belirli bir mod için donanım gereksinimlerini müşteri dökümanlarında doğruladığınızdan her zaman emin olun.
Arşiv düğümleri için en büyük gereklilik disk alanıdır. İstemciye bağlı olarak 3 TB ile 12 TB arasında değişir. Daha büyük miktardaki veriler için HDD daha iyi bir çözüm olarak düşünülse bile, senkronize etmek ve zincirin başını sürekli güncellemek SSD sürücülerini gerektirir. [SATA](https://www.cleverfiles.com/help/sata-hard-drive.html) sürücüler yeterince iyidir ancak en az [TLC](https://blog.synology.com/tlc-vs-qlc-ssds-what-are-the-differences) olmak üzere güvenilir kalitede olmalıdır. Diskler yeterli yuvaya sahip bir masaüstü bilgisayara veya sunucuya yerleştirilebilir. Bunun gibi özel cihazlar, yüksek çalışma süresi gerektiren düğümleri çalıştırmak için idealdir. Bir dizüstü bilgisayarda çalıştırmak tamamıyla mümkün, ancak taşıması ek bir maliyete tabi olacaktır.

Tüm verilerin tek bir birime sığması gerekir, bu nedenle disklerin, örn. [RAID0](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_0) veya LVM ile birleştirilmesi gerekir. Verilerin düşük seviyeli hatalar olmadan diske doğru bir şekilde yazılmasını sağlayan "Yazma sırasında kopyalama" özelliğini desteklediği için [ZFS](https://en.wikipedia.org/wiki/ZFS) kullanmayı düşünmek de faydalı olabilir.

Kazara gerçekleşebilecek veritabanı bozulmalarını daha kararlı ve güvenli bir şekilde önlemek için, özellikle profesyonel kurulumlarda sisteminiz destekliyorsa [ECC memory](https://en.wikipedia.org/wiki/ECC_memory) kullanmayı düşünebilirsiniz. RAM boyutunun genellikle bir tam düğümle aynı olması tavsiye edilir, ancak daha fazla RAM senkronizasyonu hızlandırmaya yardımcı olabilir.

İlk senronizasyon sırasında arşiv modundaki istemciler başlangıç blokundan itibaren tüm işlemleri yeniden gerçekleştirir. Yürütme hızı çoğunlukla CPU tarafından sınırlanır, bu nedenle daha hızlı bir CPU, ilk senkronizasyon süresine yardımcı olabilir. Ortalama bir tüketici bilgisayarında, ilk senkronizasyon bir aya yakın sürebilir.

## Daha fazla kaynak {#further-reading}

- [Ethereum Tam Düğümü ve Arşiv Düğümü](https://www.quicknode.com/guides/infrastructure/ethereum-full-node-vs-archive-node) - _QuickNode, Eylül 2022_
- [Kendi Ethereum Arşiv Düğümünüzü Oluşturma](https://tjayrush.medium.com/building-your-own-ethereum-archive-node-72c014affc09) - _Thomas Jay Rush, Ağustos 2021_
- [Erigon, Erigon RPC ve TrueBlocks'un (scrape ve API) hizmet olarak nasıl kurulacağı](https://magnushansson.xyz/blog_posts/crypto_defi/2022-01-10-Erigon-Trueblocks) _– Magnus Hansson, Eylül 2022'de güncellendi_

## Alakalı başlıklar {#related-topics}

- [Düğümler ve istemciler](/developers/docs/nodes-and-clients/)
- [Bir düğüm çalıştırma](/developers/docs/nodes-and-clients/run-a-node/)
