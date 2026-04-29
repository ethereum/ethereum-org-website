---
title: "Ethereum'un ölçeklendirmesinin kilidini açmak: EIP-4844 açıklandı"
description: "Finematics, Ethereum'daki katman 2 (l2) toplamaları için maliyetleri önemli ölçüde azaltmak amacıyla blob işlemlerini tanıtan Dencun sert çatallanmasındaki kilit güncelleme olan EIP-4844'ü (Proto-Danksharding) açıklıyor."
lang: tr
youtubeId: "HT9PHWloIiU"
uploadDate: 2024-03-11
duration: "0:10:56"
educationLevel: intermediate
topic:
  - "ethereum-nasil-calisir"
  - "olceklendirme"
  - "eip-4844"
  - "dencun"
  - "guncellemeler"
format: explainer
author: Finematics
breadcrumb: "EIP-4844 Açıklandı"
---

Ethereum'daki katman 2 (l2) toplamaları için maliyetleri önemli ölçüde azaltmak amacıyla blob işlemlerini tanıtan Dencun sert çatallanmasındaki kilit güncelleme olan EIP-4844'ü (Proto-Danksharding) kapsayan, **Finematics** tarafından hazırlanmış bir açıklayıcı.

*Bu transkript, Finematics tarafından yayımlanan [orijinal video transkriptinin](https://www.youtube.com/watch?v=HT9PHWloIiU) erişilebilir bir kopyasıdır. Okunabilirliği artırmak için üzerinde ufak düzenlemeler yapılmıştır.*

#### Giriş (0:00) {#introduction-000}

Ethereum'un ölçeklendirmesi bir süredir hararetle tartışılan bir konu. Katman 2 (l2) çözümleri, tıkanıklığı hafifletmek ve ücretleri düşürmek için işlemleri ana Zincir dışında gerçekleştirmenin bir yolunu sunarak bu savaşın ön saflarında yer aldı. Ancak bir sorun var — l2'ler bile verimliliklerini ve ölçeklenebilirliklerini engelleyen sınırlamalarla karşı karşıya. EIP-4844, l2'nin potansiyelini artırmada ve Ethereum'u ölçeklendirme yol haritasıyla uyumlu hale getirmede bir sonraki adımdır.

Peki, EIP-4844 tam olarak nedir? l2'leri ölçeklendirmeye tam olarak nasıl yardımcı olur? Hangi yeni olasılıkların kilidini açar? Ve l2'lerdeki işlem ücretlerini %90'ın üzerinde azaltabileceği doğru mu?

#### EIP-4844 ve Proto-Danksharding nedir (0:52) {#what-is-eip-4844-and-proto-danksharding-052}

Hatırlatmak gerekirse, EIP, geliştiricilerin Ethereum Protokolü üzerinde değişiklikler önerebileceği bir süreç olan Ethereum İyileştirme Teklifi (Ethereum Improvement Proposal) anlamına gelir. EIP-4844, özellikle Ethereum'da verilerin işlenme ve ele alınma şeklini önemli ölçüde geliştirebilecek yeni bir işlem türü önerir. Artık EIP-4844 ile birbirinin yerine kullanılan "Proto-Danksharding" adını da duymuş olabilirsiniz.

Proto-Danksharding, tam danksharding'in ilk uygulamasıdır. Gelecekte danksharding ile daha fazla ölçeklendirme için temel atar. Bu, gerçek veri parçalamayı uygulamadan, tam bir danksharding spesifikasyonunu oluşturan mantığın ve "iskeletin" çoğunun uygulanmasıyla elde edilir. Bunu bu şekilde yapmak, tek bir güncellemede Ethereum'a çok fazla risk getirmeden birden fazla ağ güncellemesi üzerinden gerçekleşebilecek daha kolay ve daha az yıkıcı bir geçişe olanak tanır.

EIP-4844'ün arkasındaki temel fikir, Ethereum'un "Rollup merkezli" geleceğini desteklemektir. Toplamalar, işlemleri ana Ethereum Zinciri dışında işleyen ancak Ethereum'un güvenliğini devralan katman 2 (l2) çözümleridir. EIP-4844, toplamalar tarafından operasyonel maliyetlerini bir büyüklük sırası kadar azaltmalarına olanak tanımak için kullanılabilecek yeni bir işlem türü sunarak toplamaları daha ucuz ve daha verimli hale getirmeyi amaçlamaktadır. Bu da, toplamalar üzerine inşa edilen uygulamaların kullanımının çok daha ucuz olmasını sağlayacak ve tüm Ethereum ekosisteminin benimsenmesini artıracaktır.

Toplamalardan birinde bir DEX takası yaptığınızı hayal edin. Böyle bir işlemin mevcut maliyeti diyelim ki 1$ ise, EIP-4844 sonrasında büyük olasılıkla 0,10$ civarına düşecektir. Ancak bu örnekteki etkinin, videonun ilerleyen kısımlarında ele alacağımız bazı ince noktaları vardır.

EIP-4844, diğer birkaç EIP ile birlikte yaklaşan Dencun güncellemesine dahil edilecektir.

#### Teknik detaylar (2:50) {#technical-details-250}

Şimdi, EIP-4844'ün nasıl çalıştığına daha yakından bakalım.

EIP-4844, Ethereum'a kısa bir süreliğine işaret düğümünde kalıcı hale getirilecek veri "blob"larını kabul eden yeni bir işlem türü sunar. Bu değişiklikler Ethereum'un ölçeklendirme yol haritasıyla ileriye dönük olarak uyumludur ve blob'lar disk kullanımını yönetilebilir tutacak kadar küçüktür. Blob işlemleri, nihai danksharding spesifikasyonunda bulunmaları beklenen formatla aynıdır.

Bu, blob alanının verimli bir şekilde kullanılmasını ve ekonomik olarak uygulanabilir kalmasını sağlayan bir "blob ücreti piyasası" ile birlikte gelir. Bu, yeni bir Gaz türü olarak blob gazının tanıtılmasıyla elde edilir. Normal Gazdan bağımsızdır. Şimdilik, yalnızca blob'lar blob gazı cinsinden fiyatlandırılmaktadır.

Blob'lar, her biri 32 bayt olan 4.096 alan elemanıdır. Blok başına blob sınırı, MAX_BLOBS_PER_BLOCK parametresi tarafından kontrol edilir. Sınır düşük başlayabilir ve birden fazla ağ güncellemesi boyunca büyüyebilir. Başlangıçta Dencun, Blok başına 6 blob hedeflemektedir. 4.096 × 32 bayt × Blok başına 6 = Blok başına 0,75 MB.

Blob'lar yürütme katmanında değil, işaret düğümlerinde (mutabakat katmanı) kalıcı hale getirilir. Gelecekteki parçalama çalışmaları yalnızca işaret düğümünde değişiklik gerektirir, bu da yürütme katmanının paralel olarak diğer girişimler üzerinde çalışmasını sağlar.

Blob'lar kısa ömürlüdür ve yaklaşık iki hafta sonra budanır. Bir Rollup'ın tüm aktörlerinin onları alabilmesi için yeterince uzun, ancak disk kullanımını yönetilebilir tutmak için yeterince kısa bir süre boyunca mevcutturlar. Bu, blob'ların tarihte sonsuza kadar saklanan veri olan çağrı verisinden daha ucuza fiyatlandırılmasını sağlar.

EIP-4844'ün kriptografik omurgası KZG taahhütleridir. Çok fazla detaya girmeden, blob işlemlerinin işlevselliği için çok önemli olan verimli ve güvenli veri dahil edilmesine olanak tanırlar. Bu şekilde, yürütme katmanındaki EVM tarafından blob'ların kendileri değil, yalnızca blob'lara yönelik taahhütlerin yorumlanması gerekir.

KZG taahhütleri için paylaşılan sırrı oluşturmak amacıyla, tüm Ethereum ağ katılımcılarının bunun doğru ve güvenli bir şekilde oluşturulduğundan emin olma şansına sahip olması için tarayıcı tabanlı, geniş çapta dağıtılmış bir tören düzenlendi.

EIP-4844, bir blob'un (bir taahhüt ile temsil edilen) belirli bir noktada belirli bir değere ulaştığını iddia eden bir KZG kanıtını doğrulayan nokta değerlendirmesi adı verilen yeni bir ön derleme ekler.

Peki tüm bunlar toplamalar için tam olarak nasıl geçerli? Yeni blob alanıyla birlikte toplamalar, Blok verilerini şimdiye kadar bu amaç için kullanılan daha pahalı çağrı verisi yerine blob'lara koyabilecekler. Mutabakat katmanında kısa ömürlü bir blob alanından yararlanmak mümkündür, çünkü toplamaların dürüst aktörlerin Rollup alanını oluşturabilmesini sağlamak için verilerin yalnızca yeterince uzun süre kullanılabilir olmasına ihtiyacı vardır.

Optimism veya Arbitrum gibi iyimser toplamalar söz konusu olduğunda, temel verileri yalnızca sahtekarlık itiraz penceresi açık olduğu sürece sağlamaları gerekir. Sahtekarlık kanıtı, çağrı verisi aracılığıyla bir seferde blob'un en fazla birkaç değerini yükleyerek geçişi daha küçük adımlarla doğrulayabilir.

ZK toplamaları, işlem veya durum deltası verilerine iki taahhüt sağlar: blob taahhüdü ve Rollup'ın dahili olarak kullandığı kanıt sistemi ne olursa olsun ZK Rollup'ın kendi taahhüdü. Ayrıca, iki taahhüdün aynı veriye atıfta bulunduğunu kanıtlamak için daha önce bahsedilen nokta değerlendirmesi ön derlemesini kullanarak bir eşdeğerlik kanıtı Protokolü kullanırlar.

#### Etki (6:25) {#impact-625}

EIP-4844'ün Ethereum ekosistemi üzerindeki etkisi ne kadar vurgulansa azdır. Yeni başlayanlar için, katman 2 (l2) çözümlerinin ölçeklenebilirliğini önemli ölçüde artırır, operasyonel maliyetlerini düşürür ve onları diğer ucuz, alternatif Blokzincirlerle daha rekabetçi hale getirir. Operasyonel maliyetteki düşüş mümkündür çünkü şu anda toplamalar tarafından katlanılan maliyetin büyük çoğunluğu çağrı verisi için ödenen ücretlerden kaynaklanmaktadır.

Dahası, EIP-4844 tam danksharding yoluyla daha da fazla ölçeklendirme için zemin hazırlar. Gelecekteki bu güncelleme, Ethereum ağını her biri verileri bağımsız olarak depolayabilen birden fazla veri parçasına bölecek ve ağın kapasitesini daha da artıracaktır.

Operasyonel maliyetlerin düşmesiyle birlikte, geliştiricileri toplamalar üzerinde yenilikçi uygulamalar oluşturmaya çeken yeni katman 2 (l2) çözümlerinin ortaya çıktığına tanık olabiliriz.

Önceki DEX takası örneğimizde gösterildiği gibi, toplamalardaki işlem maliyetlerindeki düşüş söz konusu olduğunda durum karmaşıktır. EIP-4844 sonrasında toplamalara olan talebin sabit kaldığını varsayarsak, kullanıcılar için maliyetlerde gerçekten önemli bir düşüş öngörebiliriz. Ancak, ölçeklenebilirlikteki iyileştirmeler öngörülemeyen ekonomik etkilere yol açabilir. Örneğin, son kullanıcılar için daha düşük işlem ücretleri daha fazla insanı toplamaları kullanmaya itebilir, bu da ağ kaynaklarına olan talebi artırabilir ve potansiyel olarak işlem maliyetlerini yükseltebilir.

Kesin olan bir şey var — ana sonuç işlem kapasitesindeki artış olsa ve işlemlerin maliyeti aynı kalsa bile, EIP-4844 gelecekte kullanıcılar için daha ucuz işlemlerle sonuçlanacak daha da büyük bir ölçeklenebilirliğin temelini atıyor.

#### Özet (8:04) {#summary-804}

Ethereum topluluğu, 13 Mart'ta Ana Ağ lansmanı beklenen EIP-4844'ü çeşitli test ağlarında test etmeyi çoktan tamamladı. Bu, Ethereum için benzersiz bir ölçeklenebilirlik elde etme yolunda anıtsal bir adımdır. Büyük l2'lerin çoğunun, Dencun güncellemesi gerçekleşir gerçekleşmez yeni blob alanını kullanmaya başlama taahhüdünde bulunduğunu şimdiden görebiliyoruz.

Sonuç olarak, EIP-4844 bir güncellemeden çok daha fazlasıdır. Ethereum'un daha ölçeklenebilir, verimli ve kullanıcı dostu bir Blokzincir olma yolculuğunda çok önemli bir andır. Katman 2 (l2) çözümlerinin maliyetlerini düşürerek ve verimliliğini artırarak Ethereum, merkeziyetsiz uygulamalar için lider platform olarak konumunu sağlamlaştırmaya hazırlanıyor.