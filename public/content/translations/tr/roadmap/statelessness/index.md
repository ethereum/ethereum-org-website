---
title: "Durumsuzluk, durum zaman aşımı ve geçmiş sonlanması"
description: "Geçmiş sonlanması, durum zaman aşımı ve durumsuzluğun bir Ethereum düğümü çalıştırmak için gereken disk alanını nasıl azaltabileceğini ve ağı nasıl merkeziyetsiz tutabileceğini öğrenin."
lang: tr
template: roadmap
---

[Ethereum](/) düğümlerini mütevazı donanımlarda çalıştırabilme yeteneği, gerçek merkeziyetsizlik için kritik öneme sahiptir. Bunun nedeni, bir düğüm çalıştırmanın kullanıcılara, kendilerine veri sağlaması için üçüncü bir tarafa güvenmek yerine bağımsız olarak kriptografik kontroller gerçekleştirerek bilgileri doğrulama yeteneği vermesidir. Bir düğüm çalıştırmak, kullanıcıların bir aracıya güvenmek zorunda kalmadan işlemleri doğrudan Ethereum eşler arası ağına göndermelerine olanak tanır. Bu faydalar yalnızca pahalı donanıma sahip kullanıcılar için mevcutsa merkeziyetsizlik mümkün değildir. Bunun yerine düğümler, cep telefonlarında, mikro bilgisayarlarda veya bir ev bilgisayarında fark edilmeden çalışabilmeleri için son derece mütevazı işlem ve bellek gereksinimleriyle çalışabilmelidir.

Günümüzde yüksek disk alanı gereksinimleri, düğümlere evrensel erişimi engelleyen ana bariyerdir. Bu, temel olarak Ethereum'un durum verilerinin büyük parçalarını depolama ihtiyacından kaynaklanmaktadır. Bu durum verileri, yeni blokları ve işlemleri doğru bir şekilde işlemek için gereken kritik bilgileri içerir. Bu yazının yazıldığı sırada, tam bir Ethereum düğümü çalıştırmak için hızlı bir 4TB SSD önerilmektedir ve bu, tam zincir geçmişini tuttuğunda (Eylül 2026 itibarıyla) 2TB'a yakın alan kullanır. Tüm geçmiş durumu depolayan arşiv düğümleri, istemciye bağlı olarak yaklaşık 2TB ile 12TB'tan fazla alana ihtiyaç duyar.

Daha eski verileri depolamak için daha ucuz sabit diskler kullanılabilir ancak bunlar gelen bloklara ayak uyduramayacak kadar yavaştır. Verileri daha ucuz ve depolaması daha kolay hale getirirken istemciler için mevcut depolama modellerini korumak, soruna yalnızca geçici ve kısmi bir çözümdür çünkü Ethereum'un durum büyümesi 'sınırsızdır', yani depolama gereksinimleri yalnızca artabilir ve teknolojik gelişmelerin her zaman sürekli durum büyümesine ayak uydurması gerekecektir. Bunun yerine istemciler, yerel veritabanlarından veri aramaya dayanmayan blokları ve işlemleri doğrulamanın yeni yollarını bulmalıdır.

## Düğümler için depolamayı azaltmak {#reducing-storage-for-nodes}

Her bir düğümün depolaması gereken veri miktarını azaltmanın birkaç yolu vardır ve her biri Ethereum'un çekirdek protokolünün farklı bir ölçüde güncellenmesini gerektirir:

- **Geçmiş sonlanması**: düğümlerin X bloktan daha eski durum verilerini atmasını sağlar, ancak Ethereum istemcilerinin durum verilerini nasıl işlediğini değiştirmez.
- **Durum zaman aşımı**: sık kullanılmayan durum verilerinin pasif hale gelmesine izin verir. Pasif veriler, yeniden canlandırılana kadar istemciler tarafından göz ardı edilebilir.
- **Zayıf durumsuzluk**: yalnızca blok üreticilerinin tam durum verilerine erişmesi gerekir, diğer düğümler yerel bir durum veritabanı olmadan blokları doğrulayabilir.
- **Güçlü durumsuzluk**: hiçbir düğümün tam durum verilerine erişmesi gerekmez.

## Veri sonlanması {#data-expiry}

### Geçmiş sonlanması {#history-expiry}

Geçmiş sonlanması, istemcilerin ihtiyaç duymaları pek olası olmayan daha eski verileri budaması anlamına gelir, böylece yalnızca küçük bir miktar geçmiş veri depolarlar ve yeni veriler geldiğinde eski verileri atarlar. İstemcilerin geçmiş verilere ihtiyaç duymasının iki nedeni vardır: eşzamanlama ve veri taleplerini karşılama. Başlangıçta istemciler, zincirin başına kadar birbirini izleyen her bloğun doğru olduğunu doğrulayarak başlangıç bloğundan itibaren eşzamanlama yapmak zorundaydı. Günümüzde istemciler, zincirin başına ulaşmak için "zayıf öznellik kontrol noktaları" kullanmaktadır. Bu kontrol noktaları, Ethereum'un en başından ziyade günümüze yakın bir başlangıç bloğuna sahip olmak gibi güvenilir başlangıç noktalarıdır. Bu, istemcilerin zincirin başına eşzamanlama yeteneğini kaybetmeden en son zayıf öznellik kontrol noktasından önceki tüm bilgileri atabileceği anlamına gelir. İstemciler şu anda geçmiş veriler için (JSON-RPC aracılığıyla gelen) talepleri yerel veritabanlarından alarak karşılamaktadır. Ancak geçmiş sonlanması ile, talep edilen veriler budanmışsa bu mümkün olmayacaktır. Bu geçmiş verilerin sunulması, bazı yenilikçi çözümlerin gerektiği yerdir.

Bir seçenek, istemcilerin Portal Ağı gibi bir çözüm kullanarak eşlerden geçmiş verileri talep etmesidir. [Portal Ağı](/developers/docs/networking-layer/portal-network/), her bir düğümün Ethereum'un geçmişinin küçük bir parçasını depoladığı ve böylece tüm geçmişin ağ genelinde dağıtılmış olarak var olduğu, geçmiş verileri sunmak için eşler arası bir ağdır. Talepler, ilgili verileri depolayan eşler aranarak ve onlardan talep edilerek karşılanır. Alternatif olarak, geçmiş verilere erişim gerektiren genellikle uygulamalar olduğundan, bunları depolamak onların sorumluluğu haline gelebilir. Ethereum alanında geçmiş arşivleri sürdürmeye istekli olacak yeterince fedakar aktör de olabilir. Geçmiş veri depolamasını yönetmek için kurulan merkeziyetsiz otonom organizasyon (DAO) olabilir veya ideal olarak tüm bu seçeneklerin bir kombinasyonu olacaktır. Bu sağlayıcılar verileri torrent, FTP, Filecoin veya IPFS gibi birçok yolla sunabilir.

Geçmiş sonlanması biraz tartışmalıdır çünkü şimdiye kadar Ethereum her zaman herhangi bir geçmiş verinin kullanılabilirliğini örtük olarak garanti etmiştir. Anlık görüntülerden bazı eski verilerin yeniden oluşturulmasına dayansa bile, başlangıçtan itibaren tam bir eşzamanlama standart olarak her zaman mümkün olmuştur. Geçmiş sonlanması, bu garantiyi sağlama sorumluluğunu Ethereum çekirdek protokolünün dışına taşır. Geçmiş verileri sağlamak için devreye girenler merkezi kuruluşlar olursa, bu yeni sansür riskleri getirebilir.

İlk adım kullanıma sunuldu: Temmuz 2025'teki [kısmi geçmiş sonlanmasından](https://blog.ethereum.org/2025/07/08/partial-history-exp) bu yana, yürütme istemcileri Birleşme'den önceki her bloğun gövdelerini ve makbuzlarını atabilir. Bu geçmiş hala arşivlerden, torrentlerden ve Portal Ağı'ndan edinilebilir. EIP-4444'ün önerdiği gibi geçmişin sürekli olarak sonlandırılması hala tartışılmaktadır. İlginç bir şekilde, EIP-4444 ile ilgili zorluklar teknik olmaktan çok topluluk yönetimi ile ilgilidir. Bunun kullanıma sunulabilmesi için, yalnızca anlaşmayı değil, aynı zamanda güvenilir kuruluşlardan geçmiş verileri depolama ve sunma taahhütlerini de içeren topluluk katılımına ihtiyaç vardır.

Bu yükseltme, Ethereum düğümlerinin durum verilerini nasıl işlediğini temelden değiştirmez, yalnızca geçmiş verilere nasıl erişildiğini değiştirir.

### Durum zaman aşımı {#state-expiry}

Durum zaman aşımı, yakın zamanda erişilmemişse durumun bireysel düğümlerden kaldırılmasını ifade eder. Bunun uygulanabilmesinin birkaç yolu vardır, bunlara şunlar dahildir:

- **Kiraya göre zaman aşımı**: hesaplardan "kira" almak ve kiraları sıfıra ulaştığında zaman aşımlarını gerçekleştirmek
- **Zamana göre zaman aşımı**: bir hesaba belirli bir süre boyunca okuma/yazma yapılmazsa hesapları pasif hale getirmek

Kiraya göre zaman aşımı, hesapları aktif durum veritabanında tutmak için hesaplardan alınan doğrudan bir kira olabilir. Zamana göre zaman aşımı, son hesap etkileşiminden itibaren geri sayım yoluyla olabilir veya tüm hesapların periyodik olarak zaman aşımına uğraması olabilir. Hem zaman hem de kira tabanlı modellerin unsurlarını birleştiren mekanizmalar da olabilir, örneğin bireysel hesaplar, zamana dayalı zaman aşımından önce küçük bir ücret öderlerse aktif durumda kalmaya devam ederler. Durum zaman aşımı ile ilgili olarak, pasif durumun **silinmediğini**, sadece aktif durumdan ayrı olarak depolandığını belirtmek önemlidir. Pasif durum, aktif duruma yeniden canlandırılabilir.

Bunun çalışma şekli muhtemelen belirli zaman dilimleri (belki ~1 yıl) için bir durum ağacına sahip olmaktır. Yeni bir dönem başladığında, tamamen yeni bir durum ağacı da başlar. Yalnızca mevcut durum ağacı değiştirilebilir, diğerleri değişmezdir. Ethereum düğümlerinin yalnızca mevcut durum ağacını ve bir öncekini tutması beklenir. Bu, bir adresi içinde bulunduğu dönemle zaman damgalamanın bir yolunu gerektirir. Bunu yapmanın [birkaç olası yolu](https://ethereum-magicians.org/t/types-of-resurrection-metadata-in-state-expiry/6607) vardır, ancak önde gelen seçenek, daha uzun adreslerin çok daha güvenli olması gibi ek bir avantajla birlikte ek bilgileri barındırmak için [adreslerin uzatılmasını](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485) gerektirir. Bunu yapan yol haritası öğesine [adres alanı genişletmesi](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485) denir.

Geçmiş sonlanmasına benzer şekilde, durum zaman aşımı kapsamında eski durum verilerini depolama sorumluluğu bireysel kullanıcılardan alınır ve merkezi sağlayıcılar, fedakar topluluk üyeleri veya Portal Ağı gibi daha fütüristik merkeziyetsiz çözümler gibi diğer varlıklara itilir.

Durum zaman aşımı hala araştırma aşamasındadır ve henüz kullanıma sunulmaya hazır değildir. Durum zaman aşımı, durumsuz istemcilerden ve geçmiş sonlanmasından daha sonra gerçekleşebilir çünkü bu yükseltmeler, doğrulayıcıların çoğunluğu için büyük durum boyutlarını kolayca yönetilebilir hale getirir.

## Durumsuzluk {#statelessness-2}

Durumsuzluk biraz yanlış bir isimlendirmedir çünkü "durum" kavramının ortadan kalktığı anlamına gelmez, ancak Ethereum düğümlerinin durum verilerini nasıl işlediğine dair değişiklikleri içerir. Durumsuzluğun kendisi iki çeşittir: zayıf durumsuzluk ve güçlü durumsuzluk. Zayıf durumsuzluk, durum depolama sorumluluğunu birkaçına yükleyerek çoğu düğümün durumsuz hale gelmesini sağlar. Güçlü durumsuzluk, herhangi bir düğümün tam durum verilerini depolama ihtiyacını tamamen ortadan kaldırır. Hem zayıf hem de güçlü durumsuzluk, normal doğrulayıcılara aşağıdaki avantajları sunar:

- neredeyse anında eşzamanlama
- blokları sıra dışı doğrulama yeteneği
- çok düşük donanım gereksinimleriyle (örneğin telefonlarda) çalışabilen düğümler
- disk okuma/yazma gerekmediği için düğümler ucuz sabit diskler üzerinde çalışabilir
- Ethereum'un kriptografisine yönelik gelecekteki yükseltmelerle uyumlu

### Zayıf Durumsuzluk {#weak-statelessness}

Zayıf durumsuzluk, Ethereum düğümlerinin durum değişikliklerini doğrulama biçiminde değişiklikler içerir, ancak ağdaki tüm düğümlerde durum depolama ihtiyacını tamamen ortadan kaldırmaz. Bunun yerine zayıf durumsuzluk, durum depolama sorumluluğunu blok teklifçilerine yüklerken, ağdaki diğer tüm düğümler tam durum verilerini depolamadan blokları doğrular.

**Zayıf durumsuzlukta blok teklif etmek tam durum verilerine erişim gerektirir ancak blokları doğrulamak hiçbir durum verisi gerektirmez**

Bunun gerçekleşmesi için Ethereum istemcilerinin öncelikle, verilere yönelik küçük "tanıkların" eşler arasında aktarılmasına ve blokları yerel veritabanlarına karşı doğrulamak yerine blokları doğrulamak için kullanılmasına olanak tanıyan, Ethereum durum verilerini depolamak için yeni bir veri yapısını benimsemesi gerekir. Mevcut teklif, daha önceki bir [Verkle ağacı](/roadmap/verkle-trees/) tasarımının yerini alan birleşik bir ikili ağaçtır ([EIP-7864](https://eips.ethereum.org/EIPS/eip-7864)). [Teklifçi-oluşturucu ayrımı (PBS)](/roadmap/pbs/) da gereklidir çünkü bu, blok oluşturucuların daha güçlü donanıma sahip uzmanlaşmış düğümler olmasına olanak tanır ve tam durum verilerine erişim gerektirenler bunlardır.

<ExpandableCard title="Daha az blok teklifçisine güvenmek neden sorun değil?" eventCategory="/roadmap/statelessness" eventName="clicked why is it OK to rely on fewer block proposers?">

Durumsuzluk, bloğu doğrulamak için kullanılabilecek tanıklar oluşturabilmeleri için tam durum verilerinin bir kopyasını tutan blok oluşturuculara dayanır. Diğer düğümlerin durum verilerine erişmesine gerek yoktur, bloğu doğrulamak için gereken tüm bilgiler tanıkta mevcuttur. Bu, bir blok teklif etmenin pahalı olduğu, ancak bloğu doğrulamanın ucuz olduğu bir durum yaratır, bu da daha az operatörün bir blok teklif etme düğümü çalıştıracağı anlamına gelir. Ancak, mümkün olduğunca çok katılımcı teklif ettikleri blokların geçerli olduğunu bağımsız olarak doğrulayabildiği sürece blok teklifçilerinin merkeziyetsizliği kritik değildir.

<ButtonLink variant="outline" href="https://notes.ethereum.org/WUUUXBKWQXORxpFMlLWy-w#So-why-is-it-ok-to-have-expensive-proposers">Dankrad'ın notlarında daha fazlasını okuyun</ButtonLink>
</ExpandableCard>

Blok teklifçileri, bir bloktaki işlemler tarafından değiştirilen durumun değerlerini kanıtlayan minimum veri kümesi olan "tanıklar" oluşturmak için durum verilerini kullanır. Diğer doğrulayıcılar durumu tutmaz, yalnızca durum kökünü (tüm durumun bir hash'i) depolarlar. Bir blok ve bir tanık alırlar ve bunları durum köklerini güncellemek için kullanırlar. Bu, doğrulayıcı bir düğümü son derece hafif hale getirir.

Zayıf durumsuzluk ileri bir araştırma aşamasındadır, ancak küçük tanıkların eşler arasında aktarılabilmesi için teklifçi-oluşturucu ayrımına ve yeni bir durum ağacının uygulanmış olmasına dayanır. Bu, zayıf durumsuzluğun muhtemelen Ethereum Ana Ağı'ndan birkaç yıl uzakta olduğu anlamına gelir.

[L1 doğrulaması için zkEVM](/roadmap/zkevm/), durumsuz doğrulamayı daha da geliştirebilecek tamamlayıcı bir teknolojidir. Doğrulayıcılar yalnızca tanıkları kontrol etmek yerine, tüm bloğun doğru bir şekilde yürütüldüğüne dair bir sıfır bilgi ispatı doğrulayabilir; bu da işlemleri yeniden yürütmeden kriptografik kesinlik sağlar.

### Güçlü durumsuzluk {#strong-statelessness}

Güçlü durumsuzluk, herhangi bir düğümün durum verilerini depolama ihtiyacını ortadan kaldırır. Bunun yerine işlemler, blok üreticileri tarafından bir araya getirilebilen tanıklarla gönderilir. Blok üreticileri daha sonra yalnızca ilgili hesaplar için tanıklar oluşturmak üzere gereken durumu depolamaktan sorumludur. Kullanıcılar hangi hesaplarla ve depolama anahtarlarıyla etkileşime girdiklerini beyan etmek için tanıklar ve 'erişim listeleri' gönderdiklerinden, durum sorumluluğu neredeyse tamamen kullanıcılara taşınır. Bu, son derece hafif düğümlere olanak tanır, ancak akıllı sözleşmelerle işlem yapmayı zorlaştırmak da dahil olmak üzere bazı ödünleşimler vardır.

Güçlü durumsuzluk araştırmacılar tarafından incelenmiştir ancak şu anda Ethereum'un yol haritasının bir parçası olması beklenmemektedir - zayıf durumsuzluğun Ethereum'un ölçeklendirme ihtiyaçları için yeterli olması daha olasıdır.

## Mevcut ilerleme {#current-progress}

Kısmi geçmiş sonlanması Temmuz 2025'te kullanıma sunuldu ve yürütme istemcilerinin Birleşme'den önceki geçmişi atmasına olanak tanıdı. Zayıf durumsuzluk, sürekli geçmiş sonlanması ve durum zaman aşımı hala araştırma aşamasındadır ve bundan birkaç yıl sonra kullanıma sunulması beklenmektedir. Tüm bu tekliflerin uygulanacağının bir garantisi yoktur, örneğin, durum zaman aşımı önce uygulanırsa geçmiş sonlanmasını da uygulamaya gerek kalmayabilir. Ayrıca, ilk olarak tamamlanması gereken yeni bir durum ağacı (şu anda [EIP-7864](https://eips.ethereum.org/EIPS/eip-7864) içinde bir ikili ağaç olarak önerilmektedir) ve [Teklifçi-oluşturucu ayrımı (PBS)](/roadmap/pbs) gibi başka yol haritası öğeleri de vardır.

## Daha fazla bilgi {#further-reading}

- [Durumsuz Ethereum Nedir?](https://stateless.fyi/)
- [Vitalik durumsuzluk AMA (Bana İstediğini Sor)](https://www.reddit.com/r/ethereum/comments/o9s15i/impromptu_technical_ama_on_statelessness_and/)
- [Durum boyutu yönetimi teorisi](https://hackmd.io/@vbuterin/state_size_management)
- [Yeniden canlandırma çatışması en aza indirilmiş durum sınırlaması](https://ethresear.ch/t/resurrection-conflict-minimized-state-bounding-take-2/8739)
- [Durumsuzluğa ve durum zaman aşımına giden yollar](https://hackmd.io/@vbuterin/state_expiry_paths)
- [EIP-4444 spesifikasyonu](https://eips.ethereum.org/EIPS/eip-4444)
- [Alex Stokes'un EIP-4444 hakkındaki görüşleri](https://youtu.be/SfDC_qUZaos)
- [Durumsuz hale gelmek neden bu kadar önemli?](https://dankradfeist.de/ethereum/2021/02/14/why-stateless.html)
- [Orijinal durumsuz istemci konsept notları](https://ethresear.ch/t/the-stateless-client-concept/172)
- [Durum zaman aşımı hakkında daha fazlası](https://hackmd.io/@vbuterin/state_size_management#A-more-moderate-solution-state-expiry)
- [Durum zaman aşımı hakkında daha da fazlası](https://hackmd.io/@vbuterin/state_expiry_paths#Option-2-per-epoch-state-expiry)
- [Durumsuz Ethereum Bilgi Sayfası](https://stateless.fyi)
