---
title: "Ethereum Arşiv Düğümü"
description: "Arşiv düğümlerine genel bir bakış"
lang: tr
sidebarDepth: 2
---

Bir arşiv düğümü, tüm geçmiş durumların bir arşivini oluşturmak üzere yapılandırılmış bir [Ethereum](/) istemcisi örneğidir. Belirli kullanım durumları için yararlı bir araçtır ancak çalıştırılması bir tam düğümden daha zor olabilir.

## Ön koşullar {#prerequisites}

Bir [Ethereum düğümü](/developers/docs/nodes-and-clients/) kavramını, [mimarisini](/developers/docs/nodes-and-clients/node-architecture/), [eşzamanlama stratejilerini](/developers/docs/nodes-and-clients/#sync-modes), bunları [çalıştırma](/developers/docs/nodes-and-clients/run-a-node/) ve [kullanma](/developers/docs/apis/json-rpc/) uygulamalarını anlamalısınız.

## Arşiv düğümü nedir {#what-is-an-archive-node}

Bir arşiv düğümünün önemini kavramak için "durum" kavramını netleştirelim. Ethereum, _işlem tabanlı durum makinesi_ olarak adlandırılabilir. Durumlarını değiştiren işlemleri yürüten hesaplardan ve uygulamalardan oluşur. Her hesap ve sözleşme hakkındaki bilgileri içeren küresel veri, durum adı verilen bir trie veritabanında saklanır. Bu, yürütme katmanı (EL) istemcisi tarafından işlenir ve şunları içerir:

- Hesap bakiyeleri ve nonce'lar
- Sözleşme kodu ve depolama
- Mutabakat ile ilgili veriler, örn. Staking Depozitosu Sözleşmesi

Ağ ile etkileşime girmek, yeni blokları doğrulamak ve üretmek için Ethereum istemcilerinin en son değişikliklere (zincirin ucuna) ve dolayısıyla mevcut duruma ayak uydurması gerekir. Tam düğüm olarak yapılandırılmış bir yürütme katmanı istemcisi, ağın en son durumunu doğrular ve takip eder, ancak zincir yeniden düzenlemelerini (reorg) idare edebilmek ve son verilere hızlı erişim sağlayabilmek için yalnızca geçmiş birkaç durumu, örn. son 128 blokla ilişkili durumu önbelleğe alır. Son durum, tüm istemcilerin gelen işlemleri doğrulamak ve ağı kullanmak için ihtiyaç duyduğu şeydir.

Durumu, belirli bir bloktaki anlık bir ağ anlık görüntüsü (snapshot) ve arşivi de bir geçmişin yeniden oynatılması olarak düşünebilirsiniz.

Geçmiş durumlar güvenli bir şekilde budanabilir (pruned) çünkü ağın çalışması için gerekli değildirler ve istemcinin tüm güncel olmayan verileri tutması gereksiz yere fazlalık yaratır. Yakın zamandaki bir bloktan (örn. en son bloktan 128 blok öncesi) önce var olan durumlar fiilen atılır. Tam düğümler yalnızca geçmiş blokzincir verilerini (bloklar ve işlemler) ve talep üzerine eski durumları yeniden oluşturmak için kullanabilecekleri ara sıra alınan geçmiş anlık görüntüleri tutarlar. Bunu, EVM'deki geçmiş işlemleri yeniden yürüterek yaparlar; bu, istenen durum en yakın anlık görüntüden uzak olduğunda hesaplama açısından zorlayıcı olabilir.

Ancak bu, bir tam düğümde geçmiş bir duruma erişmenin çok fazla hesaplama tükettiği anlamına gelir. İstemcinin tüm geçmiş işlemleri yürütmesi ve başlangıçtan (genesis) itibaren bir geçmiş durumu hesaplaması gerekebilir. Arşiv düğümleri, yalnızca en son durumları değil, her bloktan sonra oluşturulan her geçmiş durumu depolayarak bunu çözer. Temel olarak daha büyük disk alanı gereksinimi ile bir ödünleşim (trade-off) yapar.

Ağın tüm geçmiş verileri tutmak ve sağlamak için arşiv düğümlerine bağlı olmadığını belirtmek önemlidir. Yukarıda belirtildiği gibi, tüm geçmiş ara durumlar bir tam düğümde türetilebilir. İşlemler herhangi bir tam düğüm tarafından saklanır (şu anda 400 GB'tan az) ve tüm arşivi oluşturmak için yeniden oynatılabilir.

### Kullanım durumları {#use-cases}

İşlem göndermek, sözleşme dağıtmak, mutabakatı doğrulamak vb. gibi düzenli Ethereum kullanımı geçmiş durumlara erişim gerektirmez. Kullanıcıların ağ ile standart bir etkileşim için asla bir arşiv düğümüne ihtiyacı yoktur.

Durum arşivinin ana faydası, geçmiş durumlarla ilgili sorgulara hızlı erişimdir. Örneğin, arşiv düğümü aşağıdaki gibi sonuçları anında döndürür:

- _15537393 numaralı blokta 0x1337... hesabının ETH bakiyesi neydi?_
- _1920000 numaralı blokta 0x sözleşmesindeki 0x Token bakiyesi nedir?_

Yukarıda açıklandığı gibi, bir tam düğümün bu verileri CPU kullanan ve zaman alan EVM yürütmesi ile üretmesi gerekir. Arşiv düğümleri bunlara disk üzerinden erişir ve yanıtları anında sunar. Bu, altyapının belirli bölümleri için yararlı bir özelliktir, örneğin:

- Blok gezginleri gibi hizmet sağlayıcılar
- Araştırmacılar
- Güvenlik analistleri
- Merkeziyetsiz uygulama (dapp) geliştiricileri
- Denetim ve uyumluluk

Geçmiş verilere erişime izin veren çeşitli ücretsiz [hizmetler](/developers/docs/nodes-and-clients/nodes-as-a-service/) de vardır. Bir arşiv düğümü çalıştırmak daha zorlu olduğundan, bu erişim çoğunlukla sınırlıdır ve yalnızca ara sıra erişim için çalışır. Projeniz geçmiş verilere sürekli erişim gerektiriyorsa, kendiniz bir tane çalıştırmayı düşünmelisiniz.

## Uygulamalar ve kullanım {#implementations-and-usage}

Bu bağlamda arşiv düğümü, durum veritabanını işledikleri ve JSON-RPC uç noktaları sağladıkları için kullanıcıya dönük yürütme katmanı istemcileri tarafından sunulan veriler anlamına gelir. Yapılandırma seçenekleri, eşzamanlama süresi ve veritabanı boyutu istemciye göre değişebilir. Ayrıntılar için lütfen istemciniz tarafından sağlanan belgelere bakın.

Kendi arşiv düğümünüzü başlatmadan önce, istemciler arasındaki farkları ve özellikle çeşitli [donanım gereksinimlerini](/developers/docs/nodes-and-clients/run-a-node/#requirements) öğrenin. Çoğu istemci bu özellik için optimize edilmemiştir ve arşivleri 12 TB'tan fazla alan gerektirir. Buna karşılık, Erigon gibi uygulamalar aynı verileri 3 TB'ın altında depolayabilir, bu da onları bir arşiv düğümü çalıştırmanın en etkili yolu yapar.

## Önerilen uygulamalar {#recommended-practices}

Bir düğüm çalıştırmak için genel [önerilerin](/developers/docs/nodes-and-clients/run-a-node/) yanı sıra, bir arşiv düğümü donanım ve bakım açısından daha zorlu olabilir. Erigon'un [temel özellikleri](https://github.com/ledgerwatch/erigon#key-features) göz önüne alındığında, en pratik yaklaşım [Erigon](/developers/docs/nodes-and-clients/#erigon) istemci uygulamasını kullanmaktır.

### Donanım {#hardware}

Bir istemcinin belgelerinde belirli bir mod için donanım gereksinimlerini her zaman doğruladığınızdan emin olun.
Arşiv düğümleri için en büyük gereksinim disk alanıdır. İstemciye bağlı olarak 3 TB ile 12 TB arasında değişir. Büyük miktarda veri için HDD daha iyi bir çözüm olarak düşünülse bile, onu eşzamanlamak ve zincirin ucunu sürekli güncellemek SSD sürücüleri gerektirecektir. [SATA](https://www.cleverfiles.com/help/sata-hard-drive.html) sürücüleri yeterince iyidir ancak güvenilir kalitede, en azından [TLC](https://blog.synology.com/tlc-vs-qlc-ssds-what-are-the-differences) olmalıdır. Diskler bir masaüstü bilgisayara veya yeterli yuvaya sahip bir sunucuya takılabilir. Bu tür özel cihazlar, yüksek çalışma süresine sahip düğüm çalıştırmak için idealdir. Bir dizüstü bilgisayarda çalıştırmak tamamen mümkündür ancak taşınabilirlik ek bir maliyet getirecektir.

Tüm verilerin tek bir birime sığması gerekir, bu nedenle disklerin örneğin [RAID0](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_0) veya LVM ile birleştirilmesi gerekir. Verilerin herhangi bir düşük seviyeli hata olmadan diske doğru şekilde yazılmasını sağlayan "Yazarken kopyala" (Copy-on-write) özelliğini desteklediği için [ZFS](https://en.wikipedia.org/wiki/ZFS) kullanmayı düşünmek de faydalı olabilir.

Özellikle profesyonel bir kurulumda, kazara veritabanı bozulmasını önlemede daha fazla kararlılık ve güvenlik için, sisteminiz destekliyorsa [ECC belleği](https://en.wikipedia.org/wiki/ECC_memory) kullanmayı düşünün. RAM boyutunun genellikle bir tam düğüm için olanla aynı olması tavsiye edilir, ancak daha fazla RAM eşzamanlamayı hızlandırmaya yardımcı olabilir.

İlk eşzamanlama sırasında, arşiv modundaki istemciler başlangıçtan (genesis) bu yana her işlemi yürütecektir. Yürütme hızı çoğunlukla CPU ile sınırlıdır, bu nedenle daha hızlı bir CPU ilk eşzamanlama süresine yardımcı olabilir. Ortalama bir tüketici bilgisayarında ilk eşzamanlama bir aya kadar sürebilir.

## Daha fazla bilgi {#further-reading}

- [Ethereum Tam Düğüm ve Arşiv Düğümü Karşılaştırması](https://www.quicknode.com/guides/infrastructure/ethereum-full-node-vs-archive-node) - _QuickNode, Eylül 2022_
- [Kendi Ethereum Arşiv Düğümünüzü Oluşturma](https://tjayrush.medium.com/building-your-own-ethereum-archive-node-72c014affc09) - _Thomas Jay Rush, Ağustos 2021_
- [Erigon, Erigon'un RPC'si ve TrueBlocks (kazıma ve API) hizmet olarak nasıl kurulur](https://magnushansson.xyz/blog_posts/crypto_defi/2022-01-10-Erigon-Trueblocks) _– Magnus Hansson, güncellenme tarihi Eylül 2022_

## İlgili konular {#related-topics}

- [Düğümler ve istemciler](/developers/docs/nodes-and-clients/)
- [Bir düğüm çalıştırma](/developers/docs/nodes-and-clients/run-a-node/)