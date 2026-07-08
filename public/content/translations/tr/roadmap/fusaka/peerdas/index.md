---
title: PeerDAS
description: Fusaka Ethereum protokolü güncellemesinin bir parçası olarak PeerDAS hakkında bilgi edinin
lang: tr
authors: ["Nixo", "Mario Havel"]
---

[Ethereum](/) protokolü, [EIP-4844 ile blob işlemlerinin tanıtılmasından](/roadmap/danksharding/) bu yana en önemli ölçeklendirme güncellemesinden geçiyor. [Fusaka güncellemesinin](/roadmap/fusaka/) bir parçası olarak PeerDAS, blob verilerini işlemenin yeni bir yolunu sunarak katman 2'ler (l2) için **[veri kullanılabilirliği (DA)](/developers/docs/data-availability/)** kapasitesinde yaklaşık bir büyüklük mertebesinde artış sağlar.

[Blob ölçeklendirme yol haritası hakkında daha fazlası](https://blog.ethereum.org/2025/08/22/protocol-update-002)

## Ölçeklenebilirlik {#scalability}

Ethereum'un vizyonu, dünyadaki herkes için erişilebilir olan tarafsız, güvenli ve merkeziyetsiz bir platform olmaktır. Ağ kullanımı arttıkça bu, ağın ölçek, güvenlik ve merkeziyetsizlik üçlemini (trilemma) dengelemeyi gerektirir. Ethereum, mevcut tasarımı içinde ağ tarafından işlenen verileri basitçe artırsaydı, [merkeziyetsizliği için güvendiği düğümleri](/developers/docs/nodes-and-clients/) aşırı yükleme riskiyle karşı karşıya kalırdı. Ölçeklenebilirlik, ödünleşimleri (trade-offs) en aza indiren titiz bir mekanizma tasarımı gerektirir.

Bu hedefe ulaşma stratejilerinden biri, tüm işlemleri [katman 1 (l1)](/glossary/#layer-1) Ana Ağ üzerinde işlemek yerine çeşitli bir katman 2 ölçeklendirme çözümleri ekosistemine izin vermektir. [Katman 2'ler (l2)](/glossary/#layer-2) veya [toplamalar](/glossary#rollups), işlemleri kendi ayrı zincirlerinde işler ve doğrulama ile güvenlik için Ethereum'u kullanır. Yalnızca güvenlik açısından kritik taahhütleri yayınlamak ve yükleri sıkıştırmak, l2'lerin Ethereum'un DA kapasitesini daha verimli kullanmasını sağlar. Buna karşılık l1, güvenlik garantilerinden ödün vermeden daha az veri taşırken, l2'ler daha düşük gaz maliyetleriyle daha fazla kullanıcıyı sisteme dahil eder. Başlangıçta l2'ler, verileri sıradan işlemlerde `calldata` olarak yayınlıyordu; bu da gaz için l1 işlemleriyle rekabet ediyordu ve toplu veri kullanılabilirliği için pratik değildi.

## Proto-Danksharding {#proto-danksharding}

L2'yi ölçeklendirmeye yönelik ilk büyük adım, [Proto-Danksharding](/roadmap/danksharding/)'i (EIP-4844) tanıtan Dencun güncellemesiydi. Bu güncelleme, toplamalar için blob adı verilen yeni ve özel bir veri türü oluşturdu. [Blob'lar](/developers/docs/data-availability/blockchain-data-storage-strategies/#eip-4844-blobs) veya ikili büyük nesneler (binary large objects), EVM yürütmesine ihtiyaç duymayan ve düğümlerin yalnızca sınırlı bir süre için depoladığı geçici rastgele veri parçalarıdır. Bu daha verimli işleme, l2'lerin Ethereum'a daha fazla veri yayınlamasına ve daha da ölçeklenmesine olanak tanıdı. 

Ölçeklendirme için halihazırda güçlü faydaları olmasına rağmen, blob'ları kullanmak nihai hedefin yalnızca bir parçasıdır. Mevcut protokolde, ağdaki her düğümün hala her blob'u indirmesi gerekir. Darboğaz, daha yüksek blob sayılarıyla doğrudan artan indirilmesi gereken veri miktarı ile birlikte, bireysel düğümlerin ihtiyaç duyduğu bant genişliği haline gelir. 

Ethereum merkeziyetsizlikten ödün vermez ve bant genişliği en hassas ayarlardan biridir. Güçlü bilgi işlem gücü, bunu karşılayabilen herkes için yaygın olarak mevcut olsa bile, gelişmiş ülkelerdeki ([Almanya](https://www.speedtest.net/global-index/germany), [Belçika](https://www.speedtest.net/global-index/belgium), [Avustralya](https://www.speedtest.net/global-index/australia) veya [Amerika Birleşik Devletleri](https://www.speedtest.net/global-index/united-states) gibi) oldukça kentsel şehirlerde bile [yükleme bant genişliği sınırlamaları](https://www.speedtest.net/global-index), bant genişliği gereksinimleri dikkatlice ayarlanmazsa düğümleri yalnızca veri merkezlerinden çalıştırılabilecek şekilde kısıtlayabilir.

Düğüm operatörleri, blob'lar arttıkça giderek daha yüksek bant genişliği ve disk alanı gereksinimlerine sahip olur. Blob'ların boyutu ve miktarı bu kısıtlamalarla sınırlıdır. Her blob, blok başına ortalama 6 blob ile 128 kb'a kadar veri taşıyabilir. Bu, blob'ları daha da verimli bir şekilde kullanan gelecekteki bir tasarıma doğru atılan yalnızca ilk adımdı.

## Veri kullanılabilirliği örneklemesi {#das}

[Veri kullanılabilirliği](/developers/docs/data-availability/), zinciri bağımsız olarak doğrulamak için gereken tüm verilerin tüm ağ katılımcıları tarafından erişilebilir olduğunun garantisidir. Verilerin tam olarak yayınlandığından ve zincirin yeni durumunu veya gelen işlemleri güvene dayalı olmadan (trustlessly) doğrulamak için kullanılabileceğinden emin olmayı sağlar. 

Ethereum blob'ları, l2'lerin güvenliğini sağlayan güçlü bir veri kullanılabilirliği garantisi sunar. Bunu yapmak için Ethereum düğümlerinin blob'ları bütünüyle indirmesi ve depolaması gerekir. Peki ya blob'ları ağda daha verimli bir şekilde dağıtabilir ve bu sınırlamadan kaçınabilirsek? 

Verileri depolamak ve kullanılabilirliğini sağlamak için farklı bir yaklaşım **veri kullanılabilirliği örneklemesidir (DAS)**. Ethereum çalıştıran her bilgisayarın her bir blob'u tamamen depolaması yerine DAS, merkeziyetsiz bir iş bölümü sunar. Daha küçük, yönetilebilir görevleri tüm düğüm ağına dağıtarak verileri işleme yükünü hafifletir. Blob'lar parçalara bölünür ve her düğüm, tüm düğümler arasında tekdüze rastgele dağıtım için bir mekanizma kullanarak yalnızca birkaç parça indirir. 

Bu yeni bir sorunu beraberinde getirir: verilerin kullanılabilirliğini ve bütünlüğünü kanıtlamak. Bireysel düğümler yalnızca küçük parçalar tutarken ağ, verilerin kullanılabilir olduğunu ve hepsinin doğru olduğunu nasıl garanti edebilir? Kötü niyetli bir düğüm sahte veriler sunabilir ve güçlü veri kullanılabilirliği garantilerini kolayca bozabilir! İşte bu noktada kriptografi yardıma koşar. 

Verilerin bütünlüğünü sağlamak için EIP-4844 halihazırda KZG taahhütleri ile uygulanmıştı. Bunlar, ağa yeni bir blob eklendiğinde oluşturulan kriptografik kanıtlardır. Her bloğa küçük bir kanıt dahil edilir ve düğümler, alınan blob'ların bloğun KZG taahhüdüne karşılık geldiğini doğrulayabilir.

DAS, bunun üzerine inşa edilen ve verilerin hem doğru hem de kullanılabilir olmasını sağlayan bir mekanizmadır. Örnekleme, bir düğümün verilerin yalnızca küçük bir bölümünü sorguladığı ve bunu taahhüde karşı doğruladığı bir süreçtir. KZG, polinom eğrisi üzerindeki herhangi bir tek noktanın doğrulanabileceği anlamına gelen bir polinom taahhüt şemasıdır. Örneklemeyi yapan istemci, polinom üzerinde yalnızca birkaç noktayı kontrol ederek verilerin kullanılabilir olduğuna dair güçlü bir olasılıksal garantiye sahip olabilir. 

## PeerDAS {#peer-das-2}

[PeerDAS (EIP-7594)](https://eips.ethereum.org/EIPS/eip-7594), Ethereum'da DAS mekanizmasını uygulayan ve muhtemelen Birleşme'den bu yana en büyük güncellemeyi işaret eden özel bir tekliftir. PeerDAS, blob verilerini genişletmek, sütunlara bölmek ve bir alt kümeyi düğümlere dağıtmak için tasarlanmıştır.

Ethereum bunu başarmak için bazı zekice matematiksel yöntemler ödünç alır: blob verilerine Reed-Solomon tarzı silme kodlaması uygular. Blob verileri, katsayıları verileri kodlayan bir polinom olarak temsil edilir, ardından genişletilmiş bir blob oluşturmak için bu polinomu ek noktalarda değerlendirerek değerlendirme sayısını iki katına çıkarır. Eklenen bu yedeklilik, silme kurtarmasını (erasure recovery) mümkün kılar: bazı değerlendirmeler eksik olsa bile, genişletilmiş parçalar da dahil olmak üzere toplam verinin en az yarısı mevcut olduğu sürece orijinal blob yeniden oluşturulabilir.

![Extended polynomial](./polynomial.png)

Gerçekte, bu polinomun binlerce katsayısı vardır. KZG taahhütleri, tüm düğümler tarafından bilinen, hash gibi birkaç baytlık değerlerdir. Yeterli veri noktasına sahip her düğüm, [tam bir blob veri setini verimli bir şekilde yeniden oluşturabilir](https://arxiv.org/abs/2207.11079). 

> İlginç bilgi: Aynı kodlama tekniği DVD'ler tarafından da kullanılıyordu. Bir DVD'yi çizdiğinizde, polinomun eksik parçalarını ekleyen Reed-Solomon kodlaması sayesinde oynatıcı onu hala okuyabiliyordu. 

Tarihsel olarak, blok zincirlerindeki veriler, ister blok ister blob olsun, tüm düğümlere yayınlanırdı. PeerDAS'ın böl ve örnekle yaklaşımıyla, her şeyi herkese yayınlamak artık gerekli değildir. Fusaka sonrasında, mutabakat katmanı ağı dedikodu konuları/alt ağları (gossip topics/subnets) şeklinde düzenlenir: blob sütunları belirli alt ağlara atanır ve her düğüm önceden belirlenmiş alt kümelere abone olur ve yalnızca bu parçaları muhafaza eder.

PeerDAS ile genişletilmiş blob verileri, sütun adı verilen 128 parçaya bölünür. Veriler, abone oldukları belirli alt ağlardaki özel bir dedikodu protokolü aracılığıyla bu düğümlere dağıtılır. Ağdaki her normal düğüm, rastgele seçilmiş en az 8 sütun alt ağına katılır. 128 alt ağdan yalnızca 8'inden veri almak, bu varsayılan düğümün tüm verilerin yalnızca 1/16'sını aldığı anlamına gelir, ancak veriler genişletildiği için bu, orijinal verilerin 1/8'idir. 

Bu, mevcut "herkes her şeyi indirir" şemasının 8 katı olan yeni bir teorik ölçeklendirme sınırına olanak tanır. Blob sütunlarına hizmet veren farklı rastgele alt ağlara abone olan düğümlerle, bunların tekdüze bir şekilde dağıtılma olasılığı çok yüksektir ve bu nedenle her veri parçası ağın bir yerinde mevcuttur. Doğrulayıcı çalıştıran düğümlerin, çalıştırdıkları her doğrulayıcı ile daha fazla alt ağa abone olmaları gerekir.

> Her düğümün rastgele oluşturulmuş benzersiz bir kimliği (ID) vardır, bu normalde bağlantılar için genel kimliği olarak hizmet eder. PeerDAS'ta bu sayı, abone olması gereken rastgele alt ağ kümelerini belirlemek için kullanılır ve bu da tüm blob verilerinin tekdüze rastgele dağılımıyla sonuçlanır.

Bir düğüm orijinal verileri başarıyla yeniden oluşturduğunda, kurtarılan sütunları ağa geri dağıtarak veri boşluklarını aktif olarak iyileştirir ve genel sistem dayanıklılığını artırır. Toplam bakiyesi ≥4096 ETH olan doğrulayıcılara bağlı düğümler bir süper düğüm (supernode) olmalıdır ve bu nedenle tüm veri sütunu alt ağlarına abone olmalı ve tüm sütunları muhafaza etmelidir. Bu süper düğümler veri boşluklarını sürekli olarak iyileştirecektir. Protokolün olasılıksal olarak kendi kendini iyileştiren doğası, verilerin yalnızca bir kısmını tutan ev operatörlerini sınırlamazken güçlü kullanılabilirlik garantilerine olanak tanır. 

![Nodes subscribing to columns distributed via subnets](./subnets.png)

Veri kullanılabilirliği, yukarıda açıklanan örnekleme mekanizması sayesinde blob verilerinin yalnızca küçük bir alt kümesini tutan herhangi bir düğüm tarafından onaylanabilir. Bu kullanılabilirlik zorunlu kılınmıştır: doğrulayıcılar yeni çatallanma seçimi (fork-choice) kurallarına uymalıdır, yani blokları yalnızca verilerin kullanılabilirliğini doğruladıktan sonra kabul edecek ve onlar için oy vereceklerdir.

Kullanıcılar (özellikle l2 kullanıcıları) üzerindeki doğrudan etki daha düşük ücretlerdir. Rollup verileri için 8 kat daha fazla alanla, kullanıcıların kendi zincirlerindeki işlemleri zamanla daha da ucuz hale gelir. Ancak Fusaka sonrası daha düşük ücretler zaman alacaktır ve BPO'lara bağlı olacaktır.

## Yalnızca Blob Parametresi (BPO'lar) {#bpo}

Ağ teorik olarak 8 kat daha fazla blob işleyebilecektir, ancak blob artışları düzgün bir şekilde test edilmesi ve adım adım güvenli bir şekilde yürütülmesi gereken bir değişikliktir. Test ağları, özellikleri Ana Ağ'da dağıtmak için yeterli güveni sağlar, ancak önemli ölçüde daha yüksek sayıda blob'u etkinleştirmeden önce p2p ağının kararlılığından emin olmamız gerekir. 

Ağı aşırı yüklemeden blok başına hedeflenen blob sayısını kademeli olarak artırmak için Fusaka, **[Yalnızca Blob Parametresi (BPO)](https://ethereum-magicians.org/t/blob-parameter-only-bpo-forks/22623)** çatallanmalarını sunar. Geniş ekosistem koordinasyonu, anlaşma ve yazılım güncellemeleri gerektiren normal çatallanmaların aksine, [BPO'lar (EIP-7892)](https://eips.ethereum.org/EIPS/eip-7892), müdahale olmadan zaman içinde maksimum blob sayısını artıran önceden programlanmış güncellemelerdir.

Bu, Fusaka etkinleştirildikten ve PeerDAS yayına girdikten hemen sonra blob sayısının değişmeden kalacağı anlamına gelir. Geliştiriciler mekanizmanın beklendiği gibi çalıştığından ve ağı çalıştıran düğümler üzerinde olumsuz etkileri olmadığından emin olmak için izlerken, blob sayısı maksimum 48'e ulaşana kadar birkaç haftada bir ikiye katlanmaya başlayacaktır.

## Gelecekteki yönelimler {#future-directions}

PeerDAS, [FullDAS'ın veya danksharding'in daha büyük bir ölçeklendirme vizyonuna doğru](https://ethresear.ch/t/fulldas-towards-massive-scalability-with-32mb-blocks-and-beyond/19529) atılmış sadece bir adımdır. PeerDAS her bir blob'a ayrı ayrı 1B (1D) silme kodlaması kullanırken, tam danksharding tüm blob veri matrisi boyunca daha eksiksiz bir 2B (2D) silme kodlaması şeması kullanacaktır. Verileri iki boyutta genişletmek, daha da güçlü yedeklilik özellikleri ve daha verimli yeniden oluşturma ve doğrulama yaratır. FullDAS'ı gerçekleştirmek, ek araştırmalarla birlikte önemli ağ ve protokol optimizasyonları gerektirecektir.

## Daha fazla okuma {#further-reading}

- [PeerDAS: Francesco D'Amato'dan Eşler Arası Veri Kullanılabilirliği Örneklemesi (Peer Data Availability sampling)](https://www.youtube.com/watch?v=WOdpO1tH_Us)
- [Ethereum'un PeerDAS'ının Bir Dokümantasyonu](https://eprint.iacr.org/2024/1362.pdf)
- [AGM Olmadan PeerDAS'ın Güvenliğini Kanıtlamak](https://eprint.iacr.org/2025/1683)
- [Vitalik'in PeerDAS, etkisi ve Fusaka'yı test etme üzerine yazısı](https://x.com/VitalikButerin/status/1970983281090085200)