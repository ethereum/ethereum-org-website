---
title: Ethereum Arşiv Düğümü
description: Arşiv düğümlerine genel bakış
lang: tr
sidebarDepth: 2
---

Bir arşiv düğümü, tüm geçmiş durumların arşivini oluşturacak şekilde inşa edilmiş bir ethereum istemcisi örneğidir. Berlirli kullanım durumlarında kullanışlı bir araçtır, ancak çalıştırmak tam bir düğümü çalıştırmaktan daha zor olabilir.

## Ön koşullar {#prerequisites}

[Ethereum düğümünü](/developers/docs/nodes-and-clients/), [mimarisini](/developers/docs/nodes-and-clients/node-architecture/), [senkronizasyon stratejilerini](/developers/docs/nodes-and-clients/#sync-modes), [çalıştırma](/developers/docs/nodes-and-clients/run-a-node/) uygulamalarını ve [kullanımını](/developers/docs/apis/json-rpc/) anlamalısınız.

## Arşiv düğümü nedir

Arşiv düğümünün önemini kavramak için, "durum" kavramını zihninizde netleştirin Ethereum _işlem tabanlı bir durum makinesi_ olarak adlandırılabilir. Durumlarını değiştiren hesaplar ve uygulamaların işlemlerini yürütmeyi içerir. Tüm hesaplar ve sözleşmeler hakkında bilgi içeren global veriler durum adı verilen trie veritabanında saklanır. Bu, yürütüm katmanı (EL) istemcisi tarafından işlenir ve şunları içerir:

- Hesap bakiyeleri ve nonce'ler
- Sözleşme kodu ve depolama
- Mutabakat ile ilgili veriler, örn. Hisseleme Mevduat Sözleşmesi

Ethereum istemcileri, ağ ile etkileşime girmek, yeni bloklar üretmek ve oluşturmak için, en güncel değişiklikleri (zinricin ucunu) ve dolayısıyla mevcut durumu takip etmelidir. Tam düğüm olarak ayarlanmış yürütüm katmanı istemcileri ağın durumunu doğrular ve takip eder fakat yalnızca birkaç geçmiş durumu önbellekte tutar. Örneğin durum sondaki 128 bloka bağlıdır, böylece yeni zincir düzenlemeleri işlenebilir ve son verilere hızlı erişim sağlanabilir. Son durum, istemcilerin gelen işlemleri doğrulaması ve ağı kullanması için gereken şeydir.

Durumu, bloklardaki anlık bir ağ görüntüsü olarak ve arşivi ise geçmişin tekrarı gibi düşünebilirsiniz.

Daha eski durumlar, ağın çalışması için gerekli olmadığından ve zamanı geçmiş verilerin tutulması istemci için gereksiz ve yararsız olacağından güvenli bir şekilde kaldırılabilir. Belli bir blok öncesine ait bloklar (ör. baştan 128 blok gerisi) verimli bir şekilde atılır. Tam düğümler sadece eski blok zincir verilerini (blokları ve işemleri) ve ara sıra geçmiş görüntüleri tutar böylece istendiğinde eski durumları yeniden yaratabilir. Bunu eski işlemleri EVM'de (Ethereum Sanal Makinesi'nde) tekrar gerçekleştirerek yaparlar ama bu, istenen durum en yakındaki geçmiş görüntüden uzaksa hesaplama açısından maliyetli olabilir.

Ancak bu, tam düğümde eski bir duruma erişmenin yüksek düzeyde hesaplama gerektirdiğini gösterir. İstemcinin tüm işlemleri tekrardan gerçekleştirmesi ve eski bir durumu başlangıç blokundan itibaren hesaplaması gerekebilir. Arşiv düğümleri bu sorunu, en yeni durumlar yerine her blok oluşturulduktan sonra oluşan durumların hepsini depolayarak çözer. Bu daha yüksek saklama alanı gerektiren bir seçimdir.

Şunu belirtmekte fayda vardır ki, ağlar eski verileri saklamak ve sağlamak işin arşiv düğümlerine bağlı değillerdir. Bahsedildiği gibi tüm geçmiş ara durumlar tam düğümden çıkarılabilir. Tüm işlemler her bir tam düğümde saklanır (şimdilik 400 G'den az) ve tüm arşivi inşa etmek için tekrar oynatılabilir.

### Kullanım alanları

İşlem göndermek, sözleşme dağıtmak, mutabakat doğrulamak gibi Ethereum'un günlük kullanımları eski verilere erişimi gerektirmez. Kullanıcılar bu standart etkileşimler için arşiv düğümlerine ulaşmaya ihtiyaç duymaz.

Durum arşivinin en büyük avantajı, geçmiş durumlarla ilgili sorulara hızlı erişimidir. Örneğin arşiv düğümü aşağıdaki gibi sonuçlar döndürür:

- _0x1337... hesabının blok 15537393'teki ETH bakiyesi neydi?_
- _Blok 1920000'daki sözleşme 0x'in token 0x bakiyesi nedir?_

Yukarıda açıklandığı gibi, tam düğümler bu verileri EVM (Ethereum Sanal Makinesi) uygulaması ile üretir ve bu CPU ve zaman gerektirir. Arşiv düğümleri bunlara disk üzerinden erişir ve anında yanıt verir. Bu altyapının belirli bölümleri için kullanışlıdır, örneğin:

- Blok arayıcıları gibi servis sağlayıcılar
- Araştırmacılar
- Güvenlik analistleri
- Merkezisyetsiz uygulama geliştiricileri
- Denetim ve uyum

Eski verilere ulaşmayı sağlayan bazı ücretsiz [hizmetler](/developers/docs/nodes-and-clients/nodes-as-a-service/) vardır. Arşiv düğümlerini çalıştırmak daha maliyetli olduğu için bu hizmetlere erişim genellikle sınırlıdır ve sürekli değildir. Eğer projeniz geçmiş verilere sürekli erişim gerektiriyorsa, kendiniz bir tane çalıştırmayı düşünmelisiniz.

## Uygulamalar ve kullanim

Bu bağlamda arşiv düğümleri, durum veritabanı işlerken ve JSON-RPC uç noktaları sağlarken kullanıcılara bakan yürütüm katmanı tarafından sağlanan veri anlamına gelir. Yapılandırma seçenekleri, senkronizasyon süresi ve veritabanı boyutu istemciye göre değişebilir. Detaylar için lütfen istemci tarafından sağlanan dökümanları referans alın.

Kendi arşiv düğümünüzü başlatmadan önce, istemciler arasındaki farklar hakkında bilgi sahibi olun, özellikle çeşitli [donanım gereklilikleri](/developers/docs/nodes-and-clients/run-a-node/#requirements) hakkında. Pek çok istemci bu özellik için optimize edilmemiştir ve arşivleri 12 TB'den daha fazla alan gerektirir. Buna karşın Erigon gibi uygulamalar aynı veriyi 3 TB altında saklayabilir. Dolayısıyla bu uygulamalar arşiv düğümü çalıştırmanın en verimli yolu haline gelir.

## Tavsiye edilen uygulamalar

[Bir düğümü çalıştırmaya yönelik genel tavsiyeler](/developers/docs/nodes-and-clients/run-a-node/) dışında, bir arşiv düğümü donanım ve bakım açısından daha fazla şey gerektirebilir. Erigon'un [ana özellikleri](https://github.com/ledgerwatch/erigon#key-features) düşünüldüğünde en pratik bakış açısı [Erigon](/developers/docs/nodes-and-clients/#erigon) istemci ugulamasının kullanılmasıdır.

### Donanım

Belirli bir mod için donanım gereksinimlerini müşteri dökümanlarında doğruladığınızdan her zaman emin olun. Arşiv düğümleri için en büyük gereklilik disk alanıdır. İstemciye bağlı olarak 3 TB ile 12 TB arasında değişir. Daha büyük miktardaki veriler için HDD daha iyi bir çözüm olarak düşünülse bile, senkronize etmek ve zincirin başını sürekli güncellemek SSD sürücülerini gerektirir. [SATA](https://www.cleverfiles.com/help/sata-hard-drive.html) sürücüleri yeterlidi fakat güvenilir kalitede, en az [TLC'de](https://blog.synology.com/tlc-vs-qlc-ssds-what-are-the-differences) olmalıdırlar. Diskler yeterli yuvaya sahip bir masaüstü bilgisayara veya sunucuya yerleştirilebilir. Bunun gibi özel cihazlar, yüksek çalışma süresi gerektiren düğümleri çalıştırmak için idealdir. Bir dizüstü bilgisayarda çalıştırmak tamamıyla mümkün, ancak taşıması ek bir maliyete tabi olacaktır.

Tüm veri bir hacme sığmalıdır, bu yüzden diskler bağlı olmalıdır, örneğin [RAID0](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_0) veya [LVM](https://web.mit.edu/rhel-doc/5/RHEL-5-manual/Deployment_Guide-en-US/ch-lvm.html) ile. Verilerin herhangi bir düşük seviyeli hata olmadan doğru bir şekilde diske yazılmasını sağlayan "Yazma sırasında kopyalama" özelliğini desteklediği için [ZFS](https://en.wikipedia.org/wiki/ZFS) kullanmayı da düşünmek faydalı olabilir.

Kazara gerçekleşebilecek veritabanı bozulmalarını daha kararlı ve güvenli bir şekilde önlemek için, özellikle profesyonel kurulumlarda sisteminiz destekliyorsa [ECC memory](https://en.wikipedia.org/wiki/ECC_memory) kullanmayı düşünebilirsiniz. RAM boyutunun genellikle bir tam düğümle aynı olması tavsiye edilir, ancak daha fazla RAM senkronizasyonu hızlandırmaya yardımcı olabilir.

İlk senronizasyon sırasında arşiv modundaki istemciler başlangıç blokundan itibaren tüm işlemleri yeniden gerçekleştirir. Yürütme hızı çoğunlukla CPU tarafından sınırlanır, bu nedenle daha hızlı bir CPU, ilk senkronizasyon süresine yardımcı olabilir. Ortalama bir tüketici bilgisayarında, ilk senkronizasyon bir aya yakın sürebilir.

## Daha fazla bilgi {#further-reading}

- [Ethereum Tam Düğümü - Arşiv Düğümü](https://www.quicknode.com/guides/infrastructure/ethereum-full-node-vs-archive-node) - _QuickNode, Eylül 2022_
- [Kendi Ethereum Arşiv Düğümünü İnşa Et](https://tjayrush.medium.com/building-your-own-ethereum-archive-node-72c014affc09) - _Thomas Jay Rush, Ağustos 2021_
- [Erigon, Erigon'un RPC (Uzaktan Prosedür Çağrısı) ve TrueBlocks (scrape ve API) hizmet olarak nasıl kurulur](https://magnushansson.xyz/blog_posts/crypto_defi/2022-01-10-Erigon-Trueblocks) _– Magnus Hansson, Eylül 2022'de güncellendi_

## İlgili konular {#related-topics}

- [ Düğümler ve İstemciler](/developers/docs/nodes-and-clients/)
- [Bir düğüm çalıştırma](/developers/docs/nodes-and-clients/run-a-node/)
