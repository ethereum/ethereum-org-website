---
title: Durumsuzluk, durum sonlanması ve tarih sonlanması
description: Tarih sonlanması ve durumsuz Ethereum'un açıklanması
lang: tr
---

# Durumsuzluk, durum sonlanması ve tarih sonlanması {#statelessness}

Gerçek anlamda merkeziyetsizlik için Ethereum düğümlerini ılımlı donanımda yürütme yeteneği hayati önem taşır. Bu; düğüm yürütmenin kullanıcılara, veri ile beslenmeleri için üçüncül şahıslara güvenmektense bağımsız olarak kriptoprafik denetimler uygulayarak bilgiyi doğrulama yeteneği vermesinden ötürüdür. Bir düğüm yürütmek kullanıcılara, herhangi bir aracıya güvenmek zorunda kalmaktansa Ethereum'un eşler arası ağına doğrudan işlem kaydetme olanağı tanır. Eğer bu faydalar yalnızca pahalı donanımlara sahip kullanıcılar için ulaşılabilir olursa merkeziyetsizlik mümkün değildir. Bunun aksine düğümlerin yürütülmesi için o kadar ılımlı işlemci ve hazıfa gereklilikleri olmalıdır ki cep telefonları, mikro bilgisayarlar veya bir ev bilgisayarında bile fark edilmeden yürütülsün.

Bugün, yüksek disk hacmi gerekliliği düğümlere evrensel erişimi engelleyen ana engeldir. Bu, birincil olarak Ethereum durum verisinin büyük yığınlarını depolama gerekliliğindendir. Bu durum verisi, yeni bloklar ve işlemlerin doğru şekilde işlenmesi için kritik öneme sahip verileri içerir. Yazım sırasında, tam bir Ethereum düğümünü yürütmek için hızlı bir 2 TB SSD önerilmektedir. Herhangi bir eski veriyi kısaltmayan bir düğüm için; veri gereksinimi yaklaşık olarak 14 GB/hafta hızında büyür ve başlangıçtan beri tüm verileri depolayan arşiv düğümleri 12 TB'ye yaklaşıyor (Şubat 2023 itibarıyla, bu yazı hazırlanırken).

Daha eski verileri depolamak için daha ucuz sabit sürücüler kullanılabilir, ancak bunlar işlenmekte olan blokları yakalamak için oldukça yavaşlar. Veri depolanmasını daha ucuz ve kolay hale getirirken müşteriler için mevcut depolama modellerini tutmak, soruna yalnızca geçici ve kısmi bir çözümdür çünkü Ethereum'un durum büyümesi "sınırsızdır" yani depolama gereksinimi yalnızca artacaktır ve teknolojik iyileştirmeler her zaman devamlı durum büyümesine ayak uydurmak zorunda kalacaktır. Bunun yerine müşteriler, yerel veri tabanlarından gelecek veriye bel bağlamadan blok ve işlem onayı için yeni yollar bulmak zorundadır.

## Düğümler için depolamayı azaltma {#reducing-storage-for-nodes}

Her düğümün depolaması gereken veri miktarını azaltmak için birkaç yol vardır ve bunların her biri Ethereum'un çekirdek protokolünün farklı bir alanda güncellenmesine ihtiyaç duyar:

- **Tarih sonlanması**: düğümlerin X bloku öncesi durum verilerini kenara ayırmasına imkân vermek, ancak Ethereum müşterilerinin durum verisini nasıl tutacağını değitirmemek
- **Durum sonlanması**: sıkça kullanılmayan durum verisinin atıl hale geçmesine olanak vermek. Atıl veri canlanana kadar müşteriler tarafından görmezden gelinebilir.
- **Zayıf durumsuzluk**: tam durum verisine yalnızca blok üreticilerinin erişmesi gerekir, diğer düğümler yerel durum veritabanı olmadan blokları onaylayabilirler.
- **Güçlü durumsuzluk**: hiçbir düğümün tam durum verisine ihtiyaç duymaması.

## Veri sonlanması {#data-expiry}

### Tarih sonlanması {#history-expiry}

Tarih sonlanması; müşteirlerin gelecekte ihtiyaç olmayacak eski verilerin fazlasını yeni veriler geldikçe eskilerini bırakarak ortadan kaldırmasına, bu sayede yalnızca küçük miktarda geçmiş verinin depolanmak zorunda olmasına karşılık gelir. Müşterilerin geçmiş veriye ihtiyaç duymalarının iki sebebi vardır: senkronizasyon ve veri isteklerini karşılamak. Aslen müşteriler, ardışık her bir bloku doğruluğunu onaylayarak zincirin başına kadar başlangıç blokundan başlayarak senkronize olmak zorundadır. Bugün müşteriler ''zayıf öznellik kontrol noktalarını'' zincirin başına giden yollarında önyükleme için kullanır. Bu kontrol noktaları, Ethereum en başındakiler yerine bugüne daha yakın başlangıç blokuna sahip, güvenilir başlama noktalarıdır. Bu; müşterilerin en güncel zayıf öznellik kontrol noktası öncesindeki tüm verileri, zincirin en başı ile senkronize olma yeteneklerini kaybetmeden bırakabileceği anlamına gelir. İstemciler şu anda (JSON-RPC ile geliyor) geçmiş verileri yerel veritabanlarından almak için bazı taleplere hizmet ediyorlar. Ancak tarih sonlanması ile bu durum, eğer talep edilen veri ortadan kaldırılmışsa mümkün olmayacak. Bu geçmiş veriyi sunmak, bazı yenilikçi çözümlerin gerekli olduğu yerdir.

Bir seçenek, Portal Ağı gibi bir çözüm kullanarak müşterilerin geçmiş veriyi eşlerden talep etmesidir. Portal Ağı; her bir düğümün Ethereum geçmişinin küçük bir kısmını depoladığı bu sayede de tüm geçmişin ağ boyunca dağıtıldığı, geçmiş veriler sunan, geliştirilme aşamasındaki eşler arası bir ağdır. İstekler; ilgiyi veriyi depolayanın aranıp bulunması ve verinin ondan istenmesiyle sununlur. Alternatif olarak, geçmiş veriye genellikle uygulamaların ihtiyacı olduğundan bu verileri depolamak onların sorumluluğuna da dönüşebilir. Ethereum alanında geçmiş arşivleri idare etmek isteyen, yeterli sayıda ve fedakar aktör de olabilir. Geçmiş veri deposunu yöneten bir DAO olabilir veya bu seçeneklerin hepsinin bir birleşimi. Bu sağlayıcılar veriyi torrent, FTP, Filecoin ya da IPFS gibi bir çok farklı yolla sunabilirler.

Tarih sonlanması konusu biraz tartışmalı çünkü Ethereum şu ana kadar dolaylı olarak her geçmiş verinin ulaşılabilir olacağını garanti etti. Başlangıçtan itibaren, tam bir senkronizasyon standart bir şekilde mümkündü, bazı eski verileri bellek kopyasından alıp yeniden inşa etmek gerekse de. Tarih sonlanması garantiyi sağlama sorumluluğunu Ethereum'un çekirdek protokolünün dışında tutuyor. Eğer merkezileştirilmiş organizasyonlar geçmiş veri sağlamak için adım atarsa bu sansürleme risklerini beraberinde getirebilir.

EIP-4444 henüz aktif olmaya hazır değil, ancak güncel olarak tartışılıyor. İlginç olan EIP-4444'deki çoğunlukla topluluk yönetimiyle alakalı olması ve pek de teknik olmaması. Bunun gelebilmesi için, sadece anlaşmayı değil, depolanacak taahhütler ve güvenilir kaynaklardan sunulacak geçmiş verileri de içeren bir topluluk satın alması gerekiyor.

Bu yükseltme temelde Ethereum düğümlerinin veriyi işlemesini değil, geçmiş verilere nasıl erişildiğini değiştiriyor.

### Durum sonlanması {#state-expiry}

Durum sonlanması eğer yakın zamanda erişilmediyse durumları bireysel düğümlerden silmekten bahseder. Bunu uygulamak için aşağıdakileri içeren birkaç yol vardır:

- **Kiraya göre sonlanma**: Hesaplardan kira ücreti almak ve kiraları 0'a ulaştığında sonlandırmak
- **Zamana göre sonlanma**: Eğer hesaplarda okuma/yazma durumu bir süredir yoksa hesapları inaktive etme

Kiraya göre sonlanma, hesapları veritabanında aktif durumda tutmak için direkt olarak kesilmiş bir kira olabilir. Zamana göre sonlanma ise son hesap etkileşiminden itibaren bir geri sayım ya da tüm hesaplara yapılan periyodik bir sonlanma olarak geçebilir. Elementleri hem zaman hem de kirayı baz alan modellerle birleştiren mekanizmalar da olabilir, örnek olarak bireysel hesapların zaman bazlı sonlanmaya yönelik yaptığı küçük ödemeler hesaplarını aktif tutabilir. Durum sonlanmasıyla ilgili inaktif durumu **silinmemiş** olarak bilmek de önemlidir, hesap sadece aktif durumdan ayrılıp depolanmış anlamına gelmektedir. İnaktif durum akfit duruma çevrilebilir.

Bunun çalışmasının yolu muhtemelen belli zaman aralıklarıyla (belki~1 yıl) bir durum ağacına sahip olmaktır. Ne zaman yeni bir zaman aralığı başlarsa, tamamen yeni bir durum ağacı da aynı şekilde başlar. Sadece güncel durum ağaçları değiştirilebilir, diğerlerinin hiçbiri değiştirilemez. Ethereum düğümlerinin sadece güncel ve sonraki en yakın durum ağacını tutması beklenir. Bu, bir adresi bulunduğu zaman aralığıyla damgalamayı gerektirir. Bunu yapmak için [birkaç yol](https://ethereum-magicians.org/t/types-of-resurrection-metadata-in-state-expiry/6607) var, ancak asıl seçenek [ek bilgileri ve faydaları içine katmak ve ayrıca güvenliği sağlamak için adresleri uzatmaya ihtiyaç duyar](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485). Yol haritasında bunu yapan öğenin adı[ adres alanını uzatma](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485)dır.

Tarih sonlanmasına benzer olarak, durum sonlanmasının eski durum verilerini depolama sorumuluğu da bireysel kullanıcılardan alınıp, merkezileştirilmiş sağlayıcı gibi bazı varlıklara verildi ve Portal Ağı gibi başkalarını da düşünen topluluk üyeleri ya da daha futuristik merkeziyetsiz çözümler bulundu.

Durum sonlanması hâlâ araştırma aşamasında ve henüz hazır değil. Durum sonlanması durumsuz istemcilerden ve tarih sonlanmasından sonra gayet de gerçekleşebilir çünkü o yükseltmeler büyük durum verilerini doğrulayıcıların çoğunluğu için kolayca yönbetilebilir hale getirecek.

## Durumsuzluk {#statelessness}

Durumsuzluk biraz yanlış bir isim çünkü durum konseptinin elimine edildiğini ifade etmiyor, aksine Ethereum Düğümlerinin durum verilerini işlemesi için bazı değişiklikler içeriyor. Durumsuzluğun kendisi iki kavram ile geliyor: zayıf durumsuzluk ve güçlü durumsuzluk. Zayıf durumsuzluk çoğu düğümün durumsuz hale gelmesini bazılarına durum depolama sorumluluğu vererek yapıyor. Güçlü durumsuzluk ise her düğümün tam durum verisi depolama gerekliliğini tamamen ortadan kaldırıyor. Hem zayıf hem de güçlü durumsuzluk normal doğrulayıcılara aşağıdaki bazı faydaları da beraberinde getiriyor:

- neredeyse anında senkronizasyon
- blokları sırasız şekilde doğrulayabilme
- düğümlerin çok düşük donanım gereklilikleriyle çalışabilmesini sağlama (ör. telefonlarda)
- düğümler ucuz donanımlarda çalışabilir çünkü disk okuma/yazmasına gerek yoktur
- Ethereum Kriptografisinin gelecekteki yükseltmeleriyle uyumludur

### Zayıf Durumsuzluk {#weak-statelessness}

Zayıf durumsuzluk Ethereum düğümlerinin durum değişikliklerini onaylamasıyla ilgili bazı değişiklikleri kapsar, ancak ağdaki her düğüm için durum depolamasını tamamen ortadan kaldırmaz. Onun yerine, zayıf durumsuzluk ağdaki diğer tüm düğümler blokları tüm durum verisini depolamadan onaylarken durum verisi sorumluluğunu blok önericilerine verir.

**Zayıf durumsuzlukta blok önerileri tüm durum verisine erişim gerektirir fakat blokları onaylamak hiç durum verisi gerektirmez**

Bunun olabilmesi için [Verkle ağaçları](/roadmap/verkle-trees/) Ethereum istemcilerinde çoktan uygulanmış olmalıdır. Verkle ağaçları, veri yapıları yerine kullanılan, Ethereum depolamada veriye eşler arasında küçük, ayarlanmış tanıklar gönderilmesini sağlayan ve yerel veritabanlarına karşı blok onaylamak yerine direkt olarak blok onaylamak için kullanılan bir yedektir. [Önerici-inşa edici ayrımı](/roadmap/pbs/) ayrıca gereklidir çünkü bu blok oluşturucularının daha güçlü donanımlarla uzmanlaşmış düğümler olmasının önünü açar ve bu uzmanlaşmış düğümler tüm durum verilerine ihtiyaç duyarlar.

<ExpandableCard title="Daha az blok önericisine güvenmek neden sorun değil?" eventCategory="/roadmap/statelessness" eventName="clicked why is it OK to rely on fewer block proposers?">

Durumsuzluk blok oluşturucularının tüm durum verilerinin bir kopyasını yönetmesine dayanır, bu sayede bloku onaylaması için tanıklar oluşturabilirler. Diğer düğümlerin ise tüm durum verilerine erişmeye ihtiyaçları yoktur, blokun onayı için gereken tüm bilgiler zaten tanık için ulaşılabilirdir. Bu durum blok önermenin masraflı, ancak blok onaylamanın pahalı olduğu bir olay yaratır, bu da daha az operatörün önerici düğüm için bir blok çalıştırmasıyla sonuçlanır. Ancak, blok önericilerinin merkeziyetsizleştirilmesi olabildiğince çok katılımcının bağımsız olarak önerilen blokların geçerli olduğunu onayladığı sürece çok da kritik bir konu değildir.

<ButtonLink variant="outline-color" href="https://notes.ethereum.org/WUUUXBKWQXORxpFMlLWy-w#So-why-is-it-ok-to-have-expensive-proposers">Dankrad'ın notlarında daha fazlasını bulabilirsiniz</ButtonLink>
</ExpandableCard>

Blok önericileri durum verisini "tanıklar" oluşturmak için kullanırlar, bu da durumdaki değerlerin bloktaki işlemler tarafından değiştirdiğini kanıtlayan minimal bir veri kümesidir. Diğer doğrulayıcılar durumu değil, durum kökünü depolarlar (durumun tamamından oluşan bir düğüm). Bir blok ve tanık alırlar ve bu blok ve tanığı durum köklerini güncellemek için kullanırlar. Bu, doğrulama düğümünü oldukça hafifleştirir.

Zayıf durumsuzluk geliştirilmiş bir araştırma aşamasındadır, ancak önerici-oluşturucu ayrımına ve Verkel Ağaçlarının eşler arasında küçük tanıkların iletilmesine dayanır. Bu zayıf durumsuzluğun muhtemelen Ethereum Ana Ağı'ndan birkaç yıl uzakta olduğu anlamına gelir.

### Güçlü durumsuzluk {#strong-statelessness}

Güçlü durumsuzluk, herhangi bir düğümün durum verisi depolamaya olan ihtiyacını ortadan kaldırır. Bunun yerine, işlemler blok oluşturucular tarafından toplanabilen tanıklar aracılığıyla gönderilir. Blok oluşturucular sonrasında sadece alakalı hesaplara gerekli tanıkları oluşturman durumu depolamaktan sorumludur. Durumun sorumluluğu neredeyse tamamen kullanıcılara verilmiştir, yani kullanıcılar hangi hesap ve depolama anahtarlarıyla etkileşimde olduklarını tanımlamak için tanıkları ve "erişim listelerini" gönderirler. Bu, son derece hafif düğümleri olanaklı kılardı ancak akıllı sözleşmelerle işlem yapmayı zorlaştırmak gibi bazı bedeller söz konusudur.

Güçlü durumsuzluk araştırmacılar tarafından incelendi fakat şu anda Ethereum Yol Haritasının bir parçası olması beklenmiyor - Ethereum'un ölçeklendirilme gereklilikleri için şu anda zayıf durumsuzluk yeterli gibi görünüyor.

## Güncel ilerleme {#current-progress}

Zayıf durumsuzluk, tarih sonlanması ve durum sonlanması hâlâ araştırma aşamasında ve birkaç sene içinde gelmesi bekleniyor. Bu tekliflerinin hepsinin uygulanacağına dair bir garanti yok, örneğin ilk durum sonlanması uygulanırsa diğerlerine ya da tarih sonlanmasına ihtiyaç duyulmayabilir. Ayrıca başka yol haritası öğeleri de var, [Verkle Ağaçları](/roadmap/verkle-trees) ve [Önerici-oluşturucu ayrımı](/roadmap/pbs)gibi. Önce bunların tamamlanması gerekiyor.

## Daha fazla bilgi {#further-reading}

- [Vitalik durumsuzluk AMA (bana her şeyi sorun)](https://www.reddit.com/r/ethereum/comments/o9s15i/impromptu_technical_ama_on_statelessness_and/)
- [Durum boyutu yönetimi teorisi](https://hackmd.io/@vbuterin/state_size_management)
- [Diriliş-anlaşmazlık-minimize edilmiş durum sınırlaması](https://ethresear.ch/t/resurrection-conflict-minimized-state-bounding-take-2/8739)
- [Durumsuzluğa giden yollar ve durum sonlanması](https://hackmd.io/@vbuterin/state_expiry_paths)
- [EIP-4444 özellikleri](https://eips.ethereum.org/EIPS/eip-4444)
- [Alex Stokes'un EIP-4444 hakkındaki görüşleri](https://youtu.be/SfDC_qUZaos)
- [Durumsuzluk neden bu kadar önemli](https://dankradfeist.de/ethereum/2021/02/14/why-stateless.html)
- [Orijinal durumsuz istemcinin konsept notları](https://ethresear.ch/t/the-stateless-client-concept/172)
- [Durum sonlanması hakkında daha fazlası](https://hackmd.io/@vbuterin/state_size_management#A-more-moderate-solution-state-expiry)
- [Durum sonlanması hakkında daha da fazlası](https://hackmd.io/@vbuterin/state_expiry_paths#Option-2-per-epoch-state-expiry)
