---
title: PeerDAS
description: Fusaka Ethereum protokolü yükseltmesinin bir parçası olarak PeerDAS hakkında bilgi edinin
lang: tr
---

# PeerDAS {#peer-das}

Ethereum protokolü, [EIP-4844 ile blob işlemlerinin tanıtılmasından](/roadmap/danksharding/) bu yana en önemli ölçeklendirme yükseltmesinden geçiyor. [Fusaka yükseltmesinin](/roadmap/fusaka/) bir parçası olarak PeerDAS, blob verilerini işlemenin yeni bir yolunu sunarak L2'ler için **[veri kullanılabilirliği (DA)](/developers/docs/data-availability/)** kapasitesinde kabaca on kat artış sağlıyor.

[Blob ölçeklendirme yol haritası hakkında daha fazlası](https://blog.ethereum.org/2025/08/22/protocol-update-002)

## Ölçeklenebilirlik {#scalability}

Ethereum'un vizyonu, dünyadaki herkes için mevcut olan tarafsız, güvenli ve ademi merkeziyetçi bir platform olmaktır. Ağ kullanımı arttıkça bu, ağın ölçek, güvenlik ve ademi merkeziyet üçlemini dengelemeyi gerektirir. Ethereum, mevcut tasarımı dahilinde ağ tarafından işlenen verileri basitçe artırırsa, [Ethereum'un ademi merkeziyet için güvendiği düğümleri](/developers/docs/nodes-and-clients/) aşırı yükleme riskiyle karşı karşıya kalır. Ölçeklenebilirlik, ödünleri en aza indiren titiz bir mekanizma tasarımı gerektirir.

Bu hedefe ulaşma stratejilerinden biri, tüm işlemleri [katman 1 (L1)](/glossary/#layer-1) Ana Ağı'nda işlemek yerine, çeşitli katman 2 ölçeklendirme çözümleri ekosistemine izin vermektir. [Katman 2'ler (L2'ler)](/glossary/#layer-2) veya [toplamalar](/glossary#rollups), işlemleri kendi ayrı zincirlerinde işler ve doğrulama ile güvenlik için Ethereum'u kullanır. Yalnızca güvenlik açısından kritik taahhütleri yayınlamak ve yükleri sıkıştırmak, L2'lerin Ethereum'un DA kapasitesini daha verimli kullanmasını sağlar. Buna karşılık, L1 güvenlik garantilerinden ödün vermeden daha az veri taşırken, L2'ler daha düşük gaz maliyetleriyle daha fazla kullanıcıyı ağa dahil eder. Başlangıçta, L2'ler verileri normal işlemlerde `calldata` olarak yayınlıyordu, bu da gaz için L1 işlemleriyle rekabet ediyordu ve toplu veri kullanılabilirliği için pratik değildi.

## Proto-Danksharding {#proto-danksharding}

L2'yi ölçeklendirmeye yönelik ilk büyük adım, [Proto-Danksharding](/roadmap/danksharding/) (EIP-4844)'i tanıtan Dencun yükseltmesiydi. Bu yükseltme, toplamalar için bloblar adı verilen yeni, özel bir veri türü oluşturdu. [Bloblar](/developers/docs/data-availability/blockchain-data-storage-strategies/#eip-4844-blobs) veya ikili büyük nesneler, EVM yürütmesine ihtiyaç duymayan ve düğümlerin yalnızca sınırlı bir süre için sakladığı geçici keyfi veri parçalarıdır. Bu daha verimli işleme, L2'lerin Ethereum'a daha fazla veri yayınlamasına ve daha da fazla ölçeklenmesine olanak sağladı.

Ölçeklendirme için zaten güçlü faydaları olmasına rağmen, blob kullanmak nihai hedefin yalnızca bir parçasıdır. Mevcut protokolde, ağdaki her düğümün hâlâ her blobu indirmesi gerekir. Daha yüksek blob sayılarıyla doğrudan indirilmesi gereken veri miktarı arttıkça, darboğaz bireysel düğümlerin gerektirdiği bant genişliği hâline gelir.

Ethereum ademi merkeziyetten ödün vermez ve bant genişliği en hassas ayarlardan biridir. Güçlü bilgi işleme gücüne herkesin kolayca erişebilmesine rağmen, gelişmiş ülkelerin ([Almanya](https://www.speedtest.net/global-index/germany), [Belçika](https://www.speedtest.net/global-index/belgium), [Avustralya](https://www.speedtest.net/global-index/australia) veya [Amerika Birleşik Devletleri](https://www.speedtest.net/global-index/united-states) gibi) büyük şehirlerinde bile [yükleme bant genişliği sınırlamaları](https://www.speedtest.net/global-index), bant genişliği gereksinimleri dikkatli bir şekilde ayarlanmazsa düğümleri yalnızca veri merkezlerinden çalıştırılabilmekle sınırlayabilir.

Blob'lar arttıkça düğüm operatörlerinin bant genişliği ve disk alanı gereksinimleri de giderek artar. Blob'ların boyutu ve miktarı bu kısıtlamalarla sınırlıdır. Her blob, blok başına ortalama 6 blob ile 128 kb'a kadar veri taşıyabilir. Bu, blobları daha da verimli bir şekilde kullanan gelecekteki bir tasarıma yönelik yalnızca ilk adımdı.

## Veri kullanılabilirliği örneklemesi {#das}

[Veri kullanılabilirliği](/developers/docs/data-availability/), zinciri bağımsız olarak doğrulamak için gereken tüm verilerin tüm ağ katılımcıları tarafından erişilebilir olmasının garantisidir. Verilerin tamamen yayınlandığını ve zincirin yeni durumunu veya gelen işlemleri güvene dayalı olmadan doğrulamak için kullanılabileceğini garanti eder.

Ethereum blobları, L2'lerin güvenliğini sağlayan güçlü bir veri kullanılabilirliği garantisi sunar. Bunu yapmak için Ethereum düğümlerinin blobları bütünüyle indirmesi ve saklaması gerekir. Peki ya blobları ağda daha verimli bir şekilde dağıtabilir ve bu sınırlamadan kaçınabilirsek?

Verileri depolamak ve kullanılabilirliğini sağlamak için farklı bir yaklaşım **veri kullanılabilirliği örneklemesidir (DAS)**. Ethereum çalıştıran her bilgisayarın her bir blobu tamamen depolaması yerine, DAS ademi merkeziyetçi bir iş bölümü getirir. Daha küçük, yönetilebilir görevleri tüm düğüm ağına dağıtarak veri işleme yükünü böler. Bloblar parçalara ayrılır ve her düğüm, tüm düğümler arasında tek tip rastgele dağıtım için bir mekanizma kullanarak yalnızca birkaç parça indirir.

Bu yeni bir sorun ortaya çıkarır: verilerin kullanılabilirliğini ve bütünlüğünü kanıtlamak. Bireysel düğümler yalnızca küçük parçaları tutarken ağ, verilerin kullanılabilir olduğunu ve tamamının doğru olduğunu nasıl garanti edebilir? Kötü niyetli bir düğüm sahte veri sunabilir ve güçlü veri kullanılabilirliği garantilerini kolayca kırabilir! İşte burada kriptografi yardıma koşuyor.

Verilerin bütünlüğünü sağlamak için EIP-4844, KZG taahhütleriyle zaten uygulanmıştı. Bunlar, ağa yeni bir blob eklendiğinde oluşturulan kriptografik kanıtlardır. Her bloğa küçük bir kanıt eklenir ve düğümler alınan blobların bloğun KZG taahhüdüne karşılık geldiğini doğrulayabilir.

DAS, bunun üzerine inşa edilen ve verilerin hem doğru hem de kullanılabilir olmasını sağlayan bir mekanizmadır. Örnekleme, bir düğümün verilerin yalnızca küçük bir bölümünü sorguladığı ve bunu taahhüde göre doğruladığı bir süreçtir. KZG, polinom eğrisi üzerindeki herhangi bir tek noktanın doğrulanabileceği anlamına gelen bir polinom taahhüt şemasıdır. Polinom üzerindeki yalnızca birkaç noktayı kontrol ederek, örnekleme yapan istemci, verilerin mevcut olduğuna dair güçlü bir olasılıksal güvenceye sahip olabilir.

## PeerDAS {#peer-das}

[PeerDAS (EIP-7594)](https://eips.ethereum.org/EIPS/eip-7594), Ethereum'da DAS mekanizmasını uygulayan özel bir tekliftir ve muhtemelen Birleşim'den bu yana en büyük yükseltmeyi işaret eder. PeerDAS, blob verilerini genişletmek, sütunlara bölmek ve bir alt kümeyi düğümlere dağıtmak için tasarlanmıştır.

Ethereum bunu başarmak için zekice bir matematikten yararlanır: blob verilerine Reed-Solomon tarzı silme kodlaması uygular. Blob verileri, katsayıları verileri kodlayan bir polinom olarak temsil edilir, ardından genişletilmiş bir blob oluşturmak için bu polinom ek noktalarda değerlendirilir ve değerlendirme sayısı iki katına çıkarılır. Bu eklenen fazlalık, silme kurtarmayı mümkün kılar: bazı değerlendirmeler eksik olsa bile, genişletilmiş parçalar da dâhil olmak üzere toplam verinin en az yarısı mevcut olduğu sürece orijinal blob yeniden oluşturulabilir.

![Genişletilmiş polinom](./polynomial.png)

Gerçekte bu polinomun binlerce katsayısı vardır. KZG taahhütleri, tüm düğümler tarafından bilinen, bir karma gibi birkaç baytlık değerlerdir. Yeterli veri noktasına sahip her düğüm, [tüm blob veri kümesini verimli bir şekilde yeniden oluşturabilir](https://arxiv.org/abs/2207.11079).

> Eğlenceli bilgi: Aynı kodlama tekniği DVD'ler tarafından da kullanılmıştır. Bir DVD'yi çizdiyseniz, polinomun eksik parçalarını ekleyen Reed-Solomon kodlaması sayesinde oynatıcı onu yine de okuyabiliyordu.

Tarihsel olarak, blokzincirlerindeki veriler, ister bloklar ister bloblar olsun, tüm düğümlere yayınlanırdı. PeerDAS'ın böl ve örnekle yaklaşımıyla, her şeyi herkese yayınlamak artık gerekli değildir. Fusaka sonrası, fikir birliği katmanı ağı dedikodu konuları/alt ağlar şeklinde düzenlenir: blob sütunları belirli alt ağlara atanır ve her düğüm önceden belirlenmiş alt kümelere abone olur ve yalnızca bu parçaları saklar.

PeerDAS ile genişletilmiş blob verileri sütun adı verilen 128 parçaya bölünür. Veriler, abone oldukları belirli alt ağlardaki özel bir dedikodu protokolü aracılığıyla bu düğümlere dağıtılır. Ağdaki her normal düğüm, rastgele seçilmiş en az 8 sütun alt ağına katılır. Yalnızca 128 alt ağdan 8'inden veri almak, bu varsayılan düğümün tüm verilerin yalnızca 1/16'sını aldığı anlamına gelir, ancak veriler genişletildiği için bu, orijinal verilerin 1/8'idir.

Bu, mevcut "herkes her şeyi indirir" şemasının 8 katı yeni bir teorik ölçeklendirme sınırına izin verir. Blob sütunlarına hizmet veren farklı rastgele alt ağlara abone olan düğümlerle, bunların tekdüze dağılma olasılığı çok yüksektir ve bu nedenle her veri parçasının ağın bir yerinde mevcut olma olasılığı da çok yüksektir. Doğrulayıcıları çalıştıran düğümlerin, çalıştırdıkları her doğrulayıcı ile daha fazla alt ağa abone olmaları gerekir.

> Her düğümün rastgele oluşturulmuş benzersiz bir kimliği vardır, bu normalde bağlantılar için genel kimliği olarak hizmet eder. PeerDAS'ta bu numara, abone olması gereken rastgele küme alt ağlarını belirlemek için kullanılır ve bu da tüm blob verilerinin tek tip rastgele dağılımıyla sonuçlanır.

Bir düğüm orijinal verileri başarıyla yeniden oluşturduktan sonra, kurtarılan sütunları ağa yeniden dağıtarak veri boşluklarını aktif olarak iyileştirir ve genel sistem direncini artırır. Birleştirilmiş bakiyesi ≥4096 ETH olan doğrulayıcılara bağlı düğümler bir süper düğüm olmalı ve bu nedenle tüm veri sütunu alt ağlarına abone olmalı ve tüm sütunları saklamalıdır. Bu süper düğümler veri boşluklarını sürekli olarak iyileştirecektir. Protokolün olasılıksal olarak kendi kendini iyileştirme doğası, verilerin yalnızca bir kısmını elinde tutan ev operatörlerini sınırlamadan güçlü kullanılabilirlik garantileri sağlar.

![Alt ağlar aracılığıyla dağıtılan sütunlara abone olan düğümler](./subnets.png)

Yukarıda açıklanan örnekleme mekanizması sayesinde, veri kullanılabilirliği, blob verilerinin yalnızca küçük bir alt kümesini tutan herhangi bir düğüm tarafından doğrulanabilir. Bu kullanılabilirlik zorunludur: doğrulayıcılar yeni çatal seçimi kurallarını izlemelidir, yani verilerin kullanılabilirliğini doğruladıktan sonra yalnızca blokları kabul edecek ve oylayacaklardır.

Kullanıcılar (özellikle L2 kullanıcıları) üzerindeki doğrudan etki, daha düşük ücretlerdir. Toplama verileri için 8 kat daha fazla alanla, kullanıcıların zincirlerindeki işlemleri zamanla daha da ucuzlar. Ancak Fusaka sonrası daha düşük ücretler zaman alacak ve BPO'lara bağlı olacaktır.

## Yalnızca Blob Parametresi (BPO'lar) {#bpo}

Ağ teorik olarak 8 kat daha fazla blob işleyebilecek, ancak blob artışları, uygun şekilde test edilmesi ve kademeli bir şekilde güvenli bir şekilde yürütülmesi gereken bir değişikliktir. Test ağları, özellikleri Ana Ağ'da dağıtmak için yeterli güveni sağlar, ancak önemli ölçüde daha yüksek sayıda blobu etkinleştirmeden önce p2p ağının kararlılığını sağlamamız gerekir.

Ağı bunaltmadan blok başına hedef blob sayısını kademeli olarak artırmak için Fusaka, **[Yalnızca Blob Parametresi (BPO)](https://ethereum-magicians.org/t/blob-parameter-only-bpo-forks/22623)** çatallanmalarını sunar. Geniş ekosistem koordinasyonu, anlaşma ve yazılım güncellemeleri gerektiren normal çatallanmaların aksine, [BPO'lar (EIP-7892)](https://eips.ethereum.org/EIPS/eip-7892), müdahale olmaksızın zamanla maksimum blob sayısını artıran önceden programlanmış yükseltmelerdir.

Bu, Fusaka etkinleştirildikten ve PeerDAS canlıya geçtikten hemen sonra blob sayısının değişmeyeceği anlamına gelir. Blob sayısı, maksimum 48'e ulaşana kadar birkaç haftada bir ikiye katlanmaya başlayacak, bu sırada geliştiriciler mekanizmanın beklendiği gibi çalıştığından ve ağı çalıştıran düğümler üzerinde olumsuz etkileri olmadığından emin olmak için izleme yapacak.

## Gelecekteki yönelimler {#future-directions}

PeerDAS, [FullDAS'ın daha büyük bir ölçeklendirme vizyonuna](https://ethresear.ch/t/fulldas-towards-massive-scalability-with-32mb-blocks-and-beyond/19529) veya Danksharding'e doğru atılmış yalnızca bir adımdır. PeerDAS her bir bloba ayrı ayrı 1D silme kodlaması kullanırken, tam Danksharding, tüm blob veri matrisi üzerinde daha eksiksiz bir 2D silme kodlama şeması kullanacaktır. Verileri iki boyutta genişletmek, daha da güçlü fazlalık özellikleri ve daha verimli yeniden yapılandırma ve doğrulama yaratır. FullDAS'ı gerçekleştirmek, ek araştırmaların yanı sıra önemli ağ ve protokol optimizasyonları gerektirecektir.

## Daha fazla kaynak {#further-reading}

- [PeerDAS: Francesco D'Amato tarafından Eş Veri Kullanılabilirliği örneklemesi](https://www.youtube.com/watch?v=WOdpO1tH_Us)
- [Ethereum'un PeerDAS'ının bir Dokümantasyonu](https://eprint.iacr.org/2024/1362.pdf)
- [AGM olmadan PeerDAS'ın Güvenliğini Kanıtlama](https://eprint.iacr.org/2025/1683)
- [Vitalik'in PeerDAS, etkileri ve Fusaka'yı test etme üzerine düşünceleri](https://x.com/VitalikButerin/status/1970983281090085200)