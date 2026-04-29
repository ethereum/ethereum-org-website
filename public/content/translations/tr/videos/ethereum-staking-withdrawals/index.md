---
title: "Ethereum çekim işlemleri nasıl çalışır?"
description: "Şanghay/Capella güncellemesinden sonra Ethereum'da staking çekim işlemlerinin nasıl çalıştığı; teknik süreci, çekim sırasını ve staker'ların stake ettikleri ETH'ye erişim hakkında bilmeleri gerekenleri kapsar."
lang: tr
youtubeId: "RwwU3P9n3uo"
uploadDate: 2023-03-30
duration: "0:11:39"
educationLevel: intermediate
topic:
  - "ethereum-nasıl-çalışır"
  - "staking"
  - "çekim-işlemleri"
format: explainer
author: Finematics
breadcrumb: "Staking Çekim İşlemleri"
---

**Finematics** tarafından hazırlanan, Şanghay/Capella (Shanghai/Capella) güncellemesinden sonra Ethereum'da staking çekim işlemlerinin nasıl çalıştığını, kısmi ve tam çekim işlemlerinin mekaniklerini, yaygın yanlış bilinenleri ve staking ekosistemi üzerindeki etkilerini kapsayan bir açıklayıcı video.

*Bu transkript, Finematics tarafından yayımlanan [orijinal video transkriptinin](https://www.youtube.com/watch?v=RwwU3P9n3uo) erişilebilir bir kopyasıdır. Okunabilirliği artırmak için üzerinde ufak düzenlemeler yapılmıştır.*

#### İşaret Zinciri (0:31) {#the-beacon-chain-031}

Şanghay/Capella güncellemesi hızla yaklaşırken, Ethereum staking çekim işlemleri ve bunun bir bütün olarak Ethereum ekosistemi için ne anlama geldiği hakkında pek çok tartışma var.

Buraya nasıl geldiğimizi ve Ethereum İş Kanıtı'ndan (PoW) Hisse Kanıtı'na (PoS) geçtiğinde staking çekim işlemlerinin neden etkinleştirilmediğini anlayarak başlayalım.

Hisse Kanıtı'na (PoS) geçiş, aynı anda gerçekleşen büyük değişikliklerin sayısını en aza indirmek için birden fazla adımda gerçekleşti. Bu yaklaşım, özellikle yılda trilyonlarca dolarlık değerin mutabakatını sağlayan köklü bir ağ için çok önemliydi. En önemli adımlar şunlardı: İşaret zincirinin başlatılması ve Birleşme.

2020'de İşaret zincirinin başlatılması, Ethereum İş Kanıtı (PoW) zinciriyle birlikte çalışan ayrı bir Hisse Kanıtı (PoS) mutabakat katmanı oluşturarak geçişin temelini attı. İşaret zincirinin daha erken başlatılması, gerçek değerli işlemlerin mutabakatı sağlanmadan önce ağı güvence altına almaya yetecek kadar ETH'nin birikmesine olanak tanıdı. Ayrıca, yeni Hisse Kanıtı (PoS) mutabakat modelinin gerçek fonların stake edildiği uzun bir süre boyunca test edilmesini sağladı.

İlk ağ katılımcıları, ETH'lerini çok daha sonrasına kadar çekemeyeceklerini bilmelerine rağmen Ethereum Hisse Kanıtı (PoS) ağını güvence altına almak için milyonlarca ETH taahhüt ettiler.

Bir sonraki büyük adım olan Birleşme, Hisse Kanıtı (PoS) mutabakat katmanını yürütme katmanıyla birleştirdi. Bu, nihayet İş Kanıtı'ndan (PoW) uzaklaşmaya ve artık milyonlarca stake edilmiş ETH ile güvence altına alınan tek bir kurallı zinciri (Ethereum) sürdürmeye olanak tanıdı. Birleşme, açık ara Ethereum'da şimdiye kadar yapılan en büyük değişiklikti. Güncellemenin doğası gereği, herhangi bir kesinti süresi olmadan gerçekleşmesi gerekiyordu.

Riski en aza indirmek için Birleşme'nin kapsamı daraltıldı ve İş Kanıtı'ndan (PoW) Hisse Kanıtı'na (PoS) geçiş dışında hiçbir özellik güncellemenin bir parçası olarak dahil edilmedi. Yapılması gereken en büyük "kesinti", yaklaşan Şanghay/Capella güncellemesinin odak noktası haline gelen çekim işlemlerini etkiledi.

#### Çekim İşlemleri (2:09) {#withdrawals-209}

Staking çekim işlemleri, adından da anlaşılacağı gibi, staker'ların kilitli ETH'lerini çekmelerine olanak tanıyacaktır. İki tür çekim işlemi vardır: "kısmi" ve "tam".

**Kısmi çekim**, doğrulayıcı birikmiş ödüllerini (maksimum efektif bakiye olan 32 ETH'nin üzerindeki ekstra bakiye) çektiğinde gerçekleşir. Kısmi çekim aynı zamanda "ödül ödemesi" veya "fazla bakiye ödemesi" olarak da adlandırılabilir.

**Tam çekim**, doğrulayıcı çıkış sürecini tamamladığında ve tüm bakiye çekildiğinde gerçekleşir. Bu, yalnızca doğrulayıcı sistemden gönüllü olarak çıktığında veya "kesinti" (slashing) adı verilen bir süreçte zorla çıkarıldığında meydana gelir.

Etkinleştirildikten sonra, staking çekim işlemleri birkaç günde bir otomatik olarak dağıtılacaktır. Ek olarak, çekim süreci mutabakat katmanında başlar, bu nedenle hiçbir adımda işlem ücreti gerekmez.

Staking ödüllerini çekmeye başlamak için, bir doğrulayıcının çekim adresini yalnızca bir kez sağlaması gerekecektir. Çekim işlemlerinin Ethereum'un hem mutabakat hem de yürütme katmanlarını etkilediği göz önüne alındığında, ağın her iki bölümünün de güncellenmesi gerekir. "Şanghay", EIP-4895'te belirtilen çekim işlemlerini içeren yürütme katmanı güncellemesinin adıdır. "Capella", aynı anda etkinleştirilen karşılık gelen mutabakat katmanı güncellemesinin adıdır. Bu iki güncelleme bazen "Şapella" olarak da adlandırılır.

#### Mekanikler (3:40) {#mechanics-340}

Ethereum ekosisteminde, her doğrulayıcının karşılık gelen bir endeks numarası vardır. Buna ek olarak, `0x00` veya `0x01` olarak tanımlanan iki tür çekim kimlik bilgisine de sahiptirler.

`0x00`, belirli bir doğrulayıcının ilişkili bir çekim adresine sahip olmadığını gösterir. Bu kimlik bilgileri, BLS açık anahtarının hash'inin ilk baytının sıfır baytıyla değiştirilmesiyle elde edilir; adı da buradan gelir.

`0x01`, bir doğrulayıcının çekim adresini sağladığı anlamına gelir. Bu çekim kimlik bilgileri, `0x01` ve ardından 11 baytlık sıfırlar, sonrasında da seçilen bir Ethereum adresi olarak temsil edilir.

Çekim işlemlerini etkinleştirmek için, `0x00` kimlik bilgilerine sahip doğrulayıcıların bir "BLSToExecutionChange" mesajı imzalaması gerekecektir. Bu, Capella güncellemesinden sonra mümkün olacaktır.

Çekim işlemleri etkinleştirildiğinde, bir blok öneren doğrulayıcı, aşağıdaki koşullardan birini sağlayan ve `0x01` kimlik bilgilerine sahip ilk 16 doğrulayıcıyı bulmak için doğrulayıcı endekslerini doğrusal olarak tarayacaktır:

- 32 ETH'yi aşan bir bakiyeye sahip olanlar (tahakkuk eden doğrulayıcı ödülleri)
- "Çekilebilir" durumda olanlar (doğrulayıcı setinden tamamen çıkış yapmış olanlar)

Doğrusal arama, bu kriterlerle eşleşen 16 doğrulayıcı bulunduktan veya 16.384 yinelemeden sonra durur. Algoritma, aramanın durduğu endeksi hatırlar, böylece bir blok öneren bir sonraki doğrulayıcı o endeksten devam edebilir. Son endekse ulaştıktan sonra algoritma baştan, yani 0 endeksinden başlar.

Buna iyi bir benzetme, akrebin saati gösterdiği, tek bir yönde ilerlediği, hiçbir saati atlamadığı ve son sayıya ulaşıldığında sonunda tekrar başa döndüğü analog bir saat olabilir.

Tarama tamamlandıktan sonra doğrulayıcı, yürütme yüküne dahil edilecek çekim işlemlerinin bir listesini oluşturur. Listedeki her öğe şunları içerir:

- **WithdrawalIndex** — her bir çekim işlemini benzersiz şekilde tanımlamak için 0'dan başlayan ve her çekim işleminde 1 artan, monoton olarak artan bir endeks
- **ValidatorIndex** — bakiyesi çekilen doğrulayıcının endeksi
- **ExecutionAddress** — çekim işleminin gönderilmesi gereken yürütme katmanındaki ETH adresi
- **Amount** — yürütme adresine gönderilecek Gwei cinsinden miktar

Bir blok oluştururken veya işlerken, yürütme katmanı istemcileri bu çekim işlemlerini bir bloğun sonunda uygular. Çekim işlemlerinin işlenmesi, blok alanı için kullanıcı işlemleriyle rekabet etmez. Blok başına işlenen maksimum 16 çekim işlemiyle, kaçırılan slot olmadığı varsayıldığında günde maksimum 115.200 çekim işlemi işlenmelidir.

Çekim işlemlerinin tasarımı basit ancak son derece sağlamdır.

#### Yanlış Bilinenler (6:30) {#misconceptions-630}

İlk yanlış bilinen şey, çekim işlemleri işlenirken öncelik veya sıralama açısından "tam" ve "kısmi" çekim arasında bir fark olduğudur. Hem tam hem de kısmi çekim işlemleri, doğrulayıcı seti üzerindeki doğrusal tarama bir doğrulayıcının endeksine ulaştığında gerçekleşir. Tek fark, tam çekim işlemlerinde, doğrusal taramanın onu alabilmesi için bir doğrulayıcının çıkış sırasından ayrılması ve "çekilebilir Dönem" (withdrawable epoch) aşamasına ulaşması gerektiğidir.

Bir diğer yanlış bilinen şey ise kullanıcıların bir çekim adresi sağlamamaları halinde ödüllerini kaybedecekleridir. Bu doğru değildir; bir doğrulayıcının çekim adresi sağlamayı unutması durumunda, çekim işlemleri etkinleştirildiğinde ETH ödülleri boşluğa gönderilmeyecektir. Bunun yerine tarama, çekim adreslerini sağlamayan doğrulayıcıları atlayacaktır.

Çekim adresinin değiştirilemeyeceğini ve yalnızca bir kez ayarlandığını unutmamak önemlidir. Staker'lar çekim adresini ayarlarken son derece dikkatli olmalı ve sağlanan adresin tam mülkiyetine sahip olduklarından emin olmalıdırlar.

Ayrıca, çekim işlemleri etkinleştirildiğinde staker'ların Ethereum ekosisteminden çok fazla ETH çekeceğine dair spekülasyonlar da var ve bu argümanın daha güçlü versiyonu bunun Hisse Kanıtı (PoS) mutabakat mekanizmasını istikrarsızlaştıracağını varsayıyor. Zaman içinde ne kadar ETH çekileceğini tam olarak tahmin edemesek de, birkaç önemli karşı argüman var:

İlk olarak, çoğu staker, çekim işlemlerinin ne zaman etkinleştirileceği henüz belirsizken stake edecek kadar cesur olan erken Ethereum benimseyenleridir. Birçok staker, ağı desteklemek ve ETH cinsinden ödüller kazanmaya devam etmek için stake etmeye devam etme arzularını dile getirmiştir.

İkinci olarak, Hisse Kanıtı (PoS) mutabakat mekanizmasının ve aktif doğrulayıcı setinin istikrarlı kalmasını sağlamak için Ethereum, çıkış yapmak isteyen tüm doğrulayıcılar için bir çekim sırası uyguladı. Bu sıra, ekosistemden aynı anda ayrılabilecek doğrulayıcı sayısını sınırlar.

İlk çekim taraması, temel olarak İşaret zincirinin başlangıcından bu yana biriken birçok ödülü çekecektir. Ancak, sonrakiler çok daha küçük miktarda ETH işleyecektir.

#### Etkiler (8:39) {#implications-839}

Çekim işlemlerinin etkinleştirilmesi açık, iki taraflı bir staking akışı yaratacaktır. Şu anda staking akışı tek taraflıdır; ETH yalnızca ağa akabilir ve ağdan asla çıkamaz. İlginç bir şekilde, çekim işlemlerinin etkinleştirilmesi, başka bir şey için ihtiyaç duymaları halinde ETH'lerini her zaman çekebileceklerini bilecekleri için daha fazla insanı stake etmeye teşvik edebilir.

Kendi doğrulayıcılarını çalıştırmayan ve merkezi bir staking sağlayıcısıyla stake eden staker'lar, sağlayıcılarını farklı bir sağlayıcıyla değiştirebilecekler. Daha düşük bir staking oranı sunan bir sağlayıcıdan daha iyi bir oran sunan bir sağlayıcıya fon çekebilir, merkezi bir sağlayıcıdan merkeziyetsiz bir sağlayıcıya geçebilir veya hatta kendi doğrulayıcılarını çalıştırabilirler.

Çekim işlemleri ayrıca Lido, Rocket Pool ve diğerleri gibi likit staking türevlerini de etkileyecektir. stETH veya rETH gibi likit staking tokeni (LST) varlıkları, piyasa çalkantıları sırasında ETH fiyatına olan fiyat çapası (peg) durumunu geçici olarak kaybetme geçmişine sahipti. Ancak, iki taraflı staking akışıyla, fiyat çapası üzerindeki herhangi bir önemli tutarsızlık hızlı bir şekilde arbitrajla ortadan kaldırılacaktır.

Likit staking ve merkezi staking'i erken benimseyenler, fazla rekabetleri olmadığı için pazarın büyük bir çoğunluğunu ele geçirdiler. Ancak, bu mevcut oyuncuların pazar payı, özellikle rekabetçi bir oran sunmazlarsa, çekim işlemleri etkinleştirildiğinde büyük bir değişiklik görebilir. Staking sağlayıcıları arasında serbestçe geçiş yapabilme yeteneği, ETH staking pazarına fayda sağlayacaktır.

#### Özet (10:01) {#summary-1001}

Staking çekim işlemlerinin etkinleştirilmesi, Ethereum için en çok beklenen güncellemelerden biridir. Bu değişikliğin sorunsuz bir şekilde yürütüldüğünden emin olmak son derece önemli olacaktır. Testlere yardımcı olmak için doğrulayıcılar, Ana Ağ üzerinde canlıya geçmeden önce süreci baştan sona yürütmek ve olası sorunları gidermek için çeşitli geliştirici ağlarına (devnet) ve test ağlarına (testnet) sahip olacaklardır.

Çekim işlemleri, Ethereum'u sürdürülebilir, güvenli ve merkeziyetsiz bir gelecek inşa etmeye bir adım daha yaklaştıran bir başka iyileştirmedir. Şapella güncellemesinin 2023'ün ilk yarısında gerçekleşmesi beklenmektedir.

Bu videonun çekildiği sırada İşaret zinciri, 530.000'den fazla doğrulayıcı genelinde 17 milyonun üzerinde ETH biriktirmişti. Bir doğrulayıcı için ortalama bakiye 34 ETH'nin biraz üzerindedir, bu da birikmiş ödüllerde 1 milyonun üzerinde ETH anlamına gelir. Çekim işlemlerinin bu sayıları nasıl etkileyeceğini görmek ilginç olacaktır.