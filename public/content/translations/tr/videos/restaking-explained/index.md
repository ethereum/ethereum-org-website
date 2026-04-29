---
title: "Yeniden staking açıklaması"
description: "Ethereum'un temel katmanının ötesindeki ek protokoller ve hizmetler için güvenlik sağlamak amacıyla halihazırda stake edilmiş ETH'yi kullanan yeniden staking üzerine bir açıklama."
lang: tr
youtubeId: "rOJo7VwPh7I"
uploadDate: 2024-02-05
duration: "0:12:33"
educationLevel: intermediate
topic:
  - "yeniden staking"
  - "güvenlik"
format: explainer
author: CBER Forum
breadcrumb: "Yeniden Staking"
---

CBER Forum etkinliğinde **Mike Neuder** tarafından yapılan ve yeniden staking'in nasıl çalıştığını kapsayan bir sunum. Sunum; bireysel staking'i, yetki devredilmiş staking'i, yerel ve yerel olmayan yeniden staking'i, likit staking ve likit yeniden staking tokenlerinin mekaniklerini ve ceza kesintisinin yeniden stake edilmiş pozisyonlarla nasıl etkileşime girdiğini tanımlamaktadır.

*Bu transkript, CBER Forum tarafından yayımlanan [orijinal video transkriptinin](https://www.youtube.com/watch?v=rOJo7VwPh7I) erişilebilir bir kopyasıdır. Okunabilirliği artırmak için hafifçe düzenlenmiştir.*

#### Giriş (0:00) {#introduction-000}

Herkese merhaba, ben Mike. LRT'ler ve LST'ler hakkında konuşacağım. LRT'ler — yeniden staking yeni staking mi? İkinci bir soruyla başlayacağım ve bunu LST'ler ve LRT'ler hakkındaki tartışmayı teşvik etmek ve bunların ne olduğunu tanımlamak için kullanacağım. Bu çoğunlukla grafiksel bir sunum, bu yüzden umarım en baştan başlayıp birlikte inşa edebiliriz.

Hızlı bir özet: en baştan başlayarak, iki staking modunu tanımlayacağız. Birincisi bireysel staking, ikincisi yetki devredilmiş staking. Sonra yeniden staking kavramına gireceğiz ve onu tanımlayacağız. İncelemek istediğim dört farklı model var — bireysel ve yetki devredilmiş ayrımını kullanarak, ardından yerel yeniden staking ile yerel olmayan yeniden staking'e odaklanarak. Daha sonra likitleştirmeye geçeceğiz, likit tokenler — likit staking tokenleri (LST) ve likit yeniden staking tokenleri (LRT) hakkında konuşacağız. Bunu ceza kesintisi ve yeniden staking'e ve ardından her iki token türüne bakarak teşvik edeceğiz. Son olarak, bugün Ethereum'da var olduğu şekliyle staking ile ilgili bazı verilerle bitireceğiz.

#### Bireysel staking (0:48) {#self-staking-048}

En baştan başlarsak, Alice'in bunu kendisinin yaptığı staking var. Doğrudan protokolle etkileşime girer, protokole stake eder ve bunu yaptığı için yerel tokenin ihracı yoluyla ödüllendirilir. Ethereum durumunda, Alice 32 ETH stake eder ve mutabakata katıldığı için ETH cinsinden ödüllendirilir.

Burada odaklanılması gereken iki şey var. Birincisi, staking bu Sybil karşıtı mekanizma olarak hizmet eder — ağı birçok kimliğiniz olduğuna inandıramazsınız çünkü her kimlik, bu sabit token arzının belirli bir miktarına mal olur. İkincisi, risk altındaki teminattır — bu, ceza kesintisi açısından protokol kurallarıyla ilgilidir. Alice çok iyi tanımlanmış bazı spesifikasyonlara göre yanlış davranırsa, protokol onun sermayesini elinden alacak ve bunu yaptığı için onu cezalandıracaktır.

#### Yetki devredilmiş staking (2:52) {#delegated-staking-252}

Yetki devredilmiş staking, Alice ile protokol arasına başka bir katman ekler. Alice artık Ethereum protokolüne stake eden Bob'a yetki devreder. Ödüller Bob'a gönderilir ve ücretler düşüldükten sonra kalan ödüller Alice'e iletilir. Bu, yetki devredilmiş staking'in en basit versiyonudur — Alice yazılımı kendisi çalıştırmak istemiyor, belki tam 32 ETH'si yok veya bir doğrulayıcı çalıştırmak için donanıma veya teknik uzmanlığa sahip değil.

Çeşitli güven seviyelerinde bu yetki devrinin birçok farklı modu vardır. En çok güvenilen versiyon emanetlidir — ETH'nizi Coinbase'e gönderirsiniz ve "benim adıma stake et" dersiniz. Varlığı sizin adınıza gözetim altında tuttukları için onlara tamamen güvenirsiniz. Stake'inizi, düğümleri kimin çalıştıracağına oy veren bir DAO tarafından belirlenen birine devrettiğiniz gözetimsiz ancak DAO tarafından yönetilen bir versiyon vardır — bu Lido tarzı staking'dir. Üçüncüsü, hem Alice'in hem de Bob'un bir miktar teminat koyduğu güveni minimize edilmiş bir versiyondur. Alice, Bob'un teminatının geri kalanını sübvanse eder ve Bob yanlış davranır ve ceza kesintisine uğrarsa, teminatı kaldırılan ilk dilim olur. "Güven gerektirmeyen" değil "güveni minimize edilmiş" diyorum çünkü ne olursa olsun, Bob'un ne yaptığına bağlı olarak Alice'in teminatının tamamen silindiği dünyalar vardır.

#### Yerel ETH ile bireysel yeniden staking (4:42) {#self-restaking-with-native-eth-442}

Artık yeniden staking'in ne olduğu hakkında konuşabiliriz. Bu yepyeni bir kavram — Sreeram ve EigenLayer'ın bu terimi belki bir buçuk veya iki yıl önce tanıtmasından bu yana var.

Bu modelde Alice daha önce yaptığı şeyin aynısını yapar — stake'ini Ethereum protokolüne gönderir ve mutabakata katıldığı için ödüller alır. Şimdi Alice'in yeniden stake ettiği yeni bir protokolümüz var — buna "Retheum" diyelim. Buradaki önemli şey, bu ikinci protokolü güvence altına almak için Ethereum protokolünde stake ettiği aynı tokenleri kullanmasıdır.

Bunun için ödüller alır. Bu harika görünüyor — Alice artık aynı miktarda stake için potansiyel olarak iki kat ödüle sahip. Ancak risk, her iki protokolde de stake ettiği sermayenin artık her iki protokolün kurallarıyla yükümlü olmasıdır. Alice Ethereum'da yanlış davranırsa, ceza kesintisine uğrayarak sermayesini kaybedebilir. "Retheum"da yanlış davranırsa, yine ceza kesintisine uğrayabilir. Ek getiri ile birlikte ek sorumluluklar gelir — staking tokeninizi birçok farklı protokolde yükümlü kılarsanız, zorunlu kılınan ve daha fazla şekilde cezalandırılabilen protokol davranışları.

#### Yetki devredilmiş yerel yeniden staking (8:28) {#delegated-native-restaking-828}

İkinci versiyon, yerel ETH ile yetki devredilmiş yeniden staking'dir. Alice Ethereum ile stake ediyor ve şimdi stake'ini "Retheum" protokolüne devretmek için Bob'u kullanmak istiyor. Bob'a yetki devreder, Bob yeniden stake eder, protokol ödülleri Bob'a ihraç eder ve Bob ücretler düşüldükten sonra kalan ödülleri Alice'e ihraç eder.

Bu model altında, Ethereum protokolündeki 32 ETH, hem Alice'in hem de Bob'un — potansiyel olarak bu ETH'nin ceza kesintisine uğramasına neden olabilecek iki kişinin — eylemlerinden sorumludur. Token, iki farklı protokol kuralları setiyle yükümlüdür.

**İzleyici sorusu:** Ethereum protokolünde ETH stake ettiğinizde, protokolün size daha sonra sunacağınız bir şey vermesi gerekir — bu şey nedir?

Bu yerel versiyonda, Alice stake eder ve Ethereum ekosisteminden çekim kimlik bilgisi adı verilen şeye sahip olur. Bu çekim kimlik bilgisi, Ethereum üzerinde ikinci staking katmanını işleyen bir sözleşmeye yönlendirilebilir. Bu, varlıkları Ethereum'dan çektiğinizde onları kontrol eden bir sözleşmedir — ikinci katman ceza kesintilerini uygulayan akıllı sözleşmedeki güven gerektirmeyen gözetim gibidir.

Buna neden "yerel" deniyor? Çünkü Alice hala doğrudan Ethereum ile etkileşime giriyor — stake'i, Ethereum mutabakat katmanını güvence altına almak için kullanılan sahip olduğu 32 ETH'dir.

#### Yerel olmayan yeniden staking (10:57) {#non-native-restaking-1057}

Yerel olmayan ortamda bireysel yeniden staking: Alice yalnızca "Retheum" protokolüyle etkileşime giriyor. Ethereum'da bir düğüm çalıştırmıyor. Yeniden stake ediyor — gerçi "yeniden" kelimesini tırnak içine alıyorum çünkü aslında yeniden stake etmiyor, en başta stake ediyor. Buna yeniden staking denmesinin tek nedeni, bunun diğer yeniden staking türlerini de kolaylaştıran bir protokol aracılığıyla gerçekleşmesidir.

Yerel olmayan tokenleri alır — bu USDC, bir euro sabitcoini, sarılmış Bitcoin, her neyse olabilir — bunu protokole ekonomik güvenlik ve Sybil direnci olarak sağlar ve ödüller kazanır. Bu, yeniden staking'i, güvenin risk altındaki sermayenin ekonomik değerini ifade ettiği merkeziyetsiz güven için bir pazar yeri olarak yeniden tanımlamaktır.

Yerel olmayan tokenlerle yetki devredilmiş yeniden staking aynı modeli izler — Alice, Bob aracılığıyla yetki devreder ve ücretler düşüldükten sonra kalan ödülleri alır.

#### Ceza kesintisi ve yeniden staking (13:55) {#slashing-and-restaking-1355}

Likiditeye girmeden önce ceza kesintisi hakkında konuşalım. Normal ceza kesintisi modunda, Alice Ethereum protokolünde stake ediyor. Protokolün yanlış olarak gördüğü bir şey yaparsa — örneğin, birbiriyle çelişen iki bilgi parçasını imzalamak için kriptografik anahtarını kullandığı bir çifte imza — bu nesnel bir hatadır. Herkes her iki imzanın da Alice tarafından imzalandığını doğrulayabilir ve bu, tokenlerine ceza kesintisi uygulamak için yeterli bir kanıttır.

Yeniden staking ve ceza kesintisi nasıl etkileşime girer? En basit versiyonda — yerel varlıkla bireysel yeniden staking — Alice Ethereum'a stake eder ve ayrıca "Retheum" aracılığıyla yeniden stake eder. Alice "Retheum" protokolündeki işini yapmaya devam eder ancak Ethereum'da çifte imza atarsa, artık bir sorunumuz var: Ethereum'da ceza kesintisine uğradı, ancak "Retheum" kendi kurallarına göre ona atfedilebilecek yanlış bir şey görmedi. İki protokol arasında bir iletişim olması gerekir.

İletişimin bu yönü aslında oldukça kolaydır çünkü "Retheum" Ethereum üzerinde bir akıllı sözleşmedir — Ethereum durumundan okuyabilir ve "bu doğrulayıcı Ethereum'a göre ceza kesintisine uğradı" diyebilir, böylece ikinci dereceden protokolde Alice de ceza kesintisine uğrar.

Diğer yön daha zordur. Alice yeniden staking platformunda ceza kesintisine uğrarsa, Ethereum'un bilgilendirilmesi gerekir. Ancak Ethereum, mutabakat mekanizması açısından sözleşme katmanında olup biten her şeyden kasıtlı olarak habersizdir.

**İzleyici sorusu:** Bu neden önemli olsun? Ethereum'un yaptığı şey için stake'e ihtiyacı var, ancak yeniden stake miktarı orijinalin bir türevidir.

Sorun şu ki, Alice yeniden staking platformunda ceza kesintisine uğrarsa, aslında artık o stake'e sahip değildir. Gerçekte risk altında hiçbir sermayesi olmadan Ethereum protokolünde ne isterse yapabilir — ki en başta stake'e sahip olmanın tüm amacı budur. Sanki parayı iki şey için kullanıyormuşsunuz, bir şeyde kaybolmuş ve diğer şeyin paranın artık sizin olmadığının farkına varması gerekiyormuş gibi. Bir anlamda hala ekonomik değeri var, ancak onu siz kontrol etmiyorsunuz — bu yüzden ona ne olduğu umurunuzda değil çünkü zaten gitti.