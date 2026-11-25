---
title: "Akıllı sözleşmeleri doğrulama"
description: "Ethereum akıllı sözleşmeleri için kaynak kodu doğrulamasına genel bir bakış"
lang: tr
---

[Akıllı sözleşmeler](/developers/docs/smart-contracts/) "güven gerektirmeyen" yapıda tasarlanmıştır, yani kullanıcıların bir sözleşmeyle etkileşime girmeden önce üçüncü taraflara (ör. geliştiriciler ve şirketler) güvenmek zorunda kalmamaları gerekir. Güven gereksinimsizliğinin bir gereği olarak, kullanıcılar ve diğer geliştiriciler bir akıllı sözleşmenin kaynak kodunu doğrulayabilmelidir. Kaynak kodu doğrulaması, kullanıcılara ve geliştiricilere yayınlanan sözleşme kodunun Ethereum blokzincirindeki sözleşme adresinde çalışan kodla aynı olduğunun güvencesini verir.

"Kaynak kodu doğrulaması" ile "[biçimsel doğrulama](/developers/docs/smart-contracts/formal-verification/)" arasındaki ayrımı yapmak önemlidir. Aşağıda ayrıntılı olarak açıklanacak olan kaynak kodu doğrulaması, bir akıllı sözleşmenin üst düzey bir dildeki (ör. Solidity) verilen kaynak kodunun, sözleşme adresinde yürütülecek olan aynı baytkoda derlendiğini doğrulamayı ifade eder. Ancak biçimsel doğrulama, bir akıllı sözleşmenin doğruluğunu, yani sözleşmenin beklendiği gibi davrandığını doğrulamayı tanımlar. Bağlama bağlı olmakla birlikte, sözleşme doğrulaması genellikle kaynak kodu doğrulamasını ifade eder.

## Kaynak kodu doğrulaması nedir? {#what-is-source-code-verification}

Geliştiriciler, bir akıllı sözleşmeyi [Ethereum Sanal Makinesi (EVM)](/developers/docs/evm/) üzerinde dağıtmadan önce, sözleşmenin kaynak kodunu (yani [Solidity](/developers/docs/smart-contracts/languages/) veya başka bir üst düzey programlama dilinde yazılmış talimatları) baytkoda [derler](/developers/docs/smart-contracts/compiling/). EVM üst düzey talimatları yorumlayamadığından, sözleşme mantığını EVM'de yürütmek için kaynak kodunu baytkoda (yani alt düzey makine talimatlarına) derlemek gereklidir.

Kaynak kodu doğrulaması, herhangi bir farklılığı tespit etmek için bir akıllı sözleşmenin kaynak kodu ile sözleşme oluşturma sırasında kullanılan derlenmiş baytkodun karşılaştırılmasıdır. Akıllı sözleşmeleri doğrulamak önemlidir çünkü tanıtılan sözleşme kodu blokzincirinde çalışan koddan farklı olabilir.

Akıllı sözleşme doğrulaması, makine kodunu okumak zorunda kalmadan, bir sözleşmenin ne yaptığını yazıldığı üst düzey dil aracılığıyla incelemeyi sağlar. İşlevler, değerler ve genellikle değişken adları ile yorumlar, derlenen ve dağıtılan orijinal kaynak koduyla aynı kalır. Bu, kodu okumayı çok daha kolay hale getirir. Kaynak doğrulaması ayrıca kod belgelendirmesine de olanak tanır, böylece son kullanıcılar bir akıllı sözleşmenin ne yapmak üzere tasarlandığını bilirler.

### Tam eşleşme nedir? {#full-verification}

Kaynak kodunun, yorumlar veya değişken adları gibi derlenmiş baytkodu etkilemeyen bazı kısımları vardır. Bu, farklı değişken adlarına ve farklı yorumlara sahip iki kaynak kodunun da aynı sözleşmeyi doğrulayabileceği anlamına gelir. Bununla birlikte, kötü niyetli bir aktör kaynak kodunun içine aldatıcı yorumlar ekleyebilir veya yanıltıcı değişken adları verebilir ve sözleşmeyi orijinal kaynak kodundan farklı bir kaynak koduyla doğrulayabilir.

Kaynak kodunun doğruluğu için bir _kriptografik garanti_ ve derleme bilgisinin bir _parmak izi_ olarak hizmet etmesi amacıyla baytkoda ekstra veri ekleyerek bundan kaçınmak mümkündür. Gerekli bilgiler [Solidity'nin sözleşme meta verilerinde](https://docs.soliditylang.org/en/latest/metadata.html) bulunur ve bu dosyanın hash'i sözleşmenin baytkodunun sonuna eklenir. Bunu [meta veri oyun alanında](https://playground.sourcify.dev) çalışırken görebilirsiniz.

Meta veri dosyası, derleyici ayarları ile kaynak dosyalarının adları ve hash'leri dahil olmak üzere sözleşmenin derlenmesi hakkında bilgiler içerir. Yani, derleme ayarlarından herhangi biri veya kaynak dosyalarından birindeki tek bir bayt bile değişirse, meta veri dosyası değişir. Sonuç olarak, baytkoda eklenen meta veri dosyasının hash'i de değişir. Bu, bir sözleşmenin baytkodu + eklenen meta veri hash'i verilen kaynak kodu ve derleme ayarlarıyla eşleşiyorsa, bunun orijinal derlemede kullanılan kaynak kodunun tamamen aynısı olduğundan ve tek bir baytın bile farklı olmadığından emin olabileceğimiz anlamına gelir.

Meta veri hash'inden yararlanan bu tür doğrulamaya **"[tam eşleşme](https://docs.sourcify.dev/docs/exact-match-vs-match/)"** (eskiden "eksiksiz" veya "mükemmel" eşleşme) denir. Meta veri hash'leri eşleşmiyorsa veya doğrulamada dikkate alınmıyorsa, bu bir **"eşleşmedir"** (eskiden "kısmi eşleşme"): sözleşmenin kodu doğrulanır, ancak kaynak dosyaları örneğin yorumlarda veya dosya adlarında orijinallerinden farklı olabilir. Tam bir eşleşme olmadan doğrulanmış kaynak koduna yansımayacak [kötü niyetli kod eklemek](https://samczsun.com/hiding-in-plain-sight/) mümkündür. Çoğu geliştirici tam eşleşmelerin farkında değildir ve derlemelerinin meta veri dosyasını saklamaz, bu nedenle meta veri hash'i olmayan eşleşmeler şimdiye kadar sözleşmeleri doğrulamanın en yaygın yolu olmuştur.

## Kaynak kodu doğrulaması neden önemlidir? {#importance-of-source-code-verification}

### Güven gereksinimsizliği {#trustlessness}

Güven gereksinimsizliği, tartışmasız akıllı sözleşmeler ve [merkeziyetsiz uygulamalar (dapp'ler)](/developers/docs/dapps/) için en büyük öncüldür. Akıllı sözleşmeler "değişmezdir" ve değiştirilemez; bir sözleşme yalnızca dağıtım sırasında kodda tanımlanan iş mantığını yürütecektir. Bu, geliştiricilerin ve işletmelerin Ethereum'da dağıttıktan sonra bir sözleşmenin kodunu kurcalayamayacağı anlamına gelir.

Bir akıllı sözleşmenin güven gerektirmeyen yapıda olması için, sözleşme kodunun bağımsız doğrulama için erişilebilir olması gerekir. Her akıllı sözleşme için derlenmiş baytkod blokzincirinde herkese açık olsa da, alt düzey dili anlamak hem geliştiriciler hem de kullanıcılar için zordur.

Projeler, sözleşmelerinin kaynak kodunu yayınlayarak güven varsayımlarını azaltır. Ancak bu başka bir soruna yol açar: yayınlanan kaynak kodunun sözleşme baytkoduyla eşleştiğini doğrulamak zordur. Bu senaryoda, güven gereksinimsizliğinin değeri kaybolur çünkü kullanıcılar, blokzincirinde dağıtmadan önce bir sözleşmenin iş mantığını (yani baytkodu değiştirerek) değiştirmeyecekleri konusunda geliştiricilere güvenmek zorundadır.

Kaynak kodu doğrulama araçları, bir akıllı sözleşmenin kaynak kodu dosyalarının çevirici (assembly) koduyla eşleştiğine dair garantiler sağlar. Sonuç, kullanıcıların üçüncü taraflara körü körüne güvenmediği ve bunun yerine bir sözleşmeye fon yatırmadan önce kodu doğruladığı, güven gerektirmeyen bir ekosistemdir.

### Kullanıcı Güvenliği {#user-safety}

Akıllı sözleşmelerde genellikle stake edilen çok fazla para söz konusudur. Bu, daha yüksek güvenlik garantileri ve bir akıllı sözleşmenin mantığının kullanılmadan önce doğrulanmasını gerektirir. Sorun şu ki, vicdansız geliştiriciler bir akıllı sözleşmeye kötü niyetli kod ekleyerek kullanıcıları aldatabilir. Doğrulama olmadan, kötü niyetli akıllı sözleşmelerde [arka kapılar](https://www.trustnodes.com/2018/11/10/concerns-rise-over-backdoored-smart-contracts), tartışmalı erişim kontrol mekanizmaları, istismar edilebilir güvenlik açıkları ve kullanıcı güvenliğini tehlikeye atan diğer şeyler tespit edilemeyebilir.

Bir akıllı sözleşmenin kaynak kodu dosyalarını yayınlamak, denetçiler gibi ilgilenenlerin sözleşmeyi potansiyel saldırı vektörleri açısından değerlendirmesini kolaylaştırır. Birden fazla tarafın bir akıllı sözleşmeyi bağımsız olarak doğrulamasıyla, kullanıcılar sözleşmenin güvenliği konusunda daha güçlü garantilere sahip olur.

## Ethereum akıllı sözleşmeleri için kaynak kodu nasıl doğrulanır {#source-code-verification-for-ethereum-smart-contracts}

[Ethereum'da bir akıllı sözleşme dağıtmak](/developers/docs/smart-contracts/deploying/), özel bir adrese veri yükü (derlenmiş baytkod) içeren bir işlem göndermeyi gerektirir. Veri yükü, kaynak kodunun derlenmesi ve işlemdeki veri yüküne eklenen sözleşme örneğinin [kurucu argümanları](https://docs.soliditylang.org/en/v0.8.14/contracts.html#constructor) ile oluşturulur. Derleme deterministiktir, yani aynı kaynak dosyaları ve derleme ayarları (ör. derleyici sürümü, optimize edici) kullanıldığında her zaman aynı çıktıyı (yani sözleşme baytkodunu) üretir. Kaynak dosyalarının adları ve yolları da bu girdinin bir parçasıdır: meta verilerde kaydedilirler, bu nedenle bir dosyayı yeniden adlandırmak meta veri hash'ini değiştirir.

<SourceVerifyDiagram />

Bir akıllı sözleşmeyi doğrulamak temel olarak aşağıdaki adımları içerir:

1. Kaynak dosyalarını ve derleme ayarlarını bir derleyiciye girin.

2. Derleyici sözleşmenin baytkodunu çıkarır

3. Belirli bir adreste dağıtılan sözleşmenin baytkodunu alın (`eth_getCode` ile)

4. Dağıtılan baytkodu yeniden derlenen baytkodla karşılaştırın. Kodlar eşleşirse, sözleşme verilen kaynak kodu ve derleme ayarlarıyla doğrulanır.

5. Ek olarak, baytkodun sonundaki meta veri hash'leri eşleşirse, bu tam bir eşleşme olacaktır.

Doğrulayıcılar ayrıca sözleşmenin oluşturma baytkodunu da karşılaştırabilir: onu dağıtan kod (doğrudan bir hesaptan dağıtılan bir sözleşme için, dağıtım işleminin girdisi), bu derlenmiş baytkod ve ardından kodlanmış [kurucu argümanlarıdır](https://docs.soliditylang.org/en/latest/contracts.html#constructor).

Bunun doğrulamanın basit bir açıklaması olduğunu ve [değişmez değişkenlere](https://docs.sourcify.dev/docs/immutables/) sahip olmak gibi bununla çalışmayacak birçok istisna olduğunu unutmayın.

## Kaynak kodu doğrulama araçları {#source-code-verification-tools}

Sözleşmeleri doğrulamanın geleneksel süreci karmaşık olabilir. Bu nedenle Ethereum'da dağıtılan akıllı sözleşmelerin kaynak kodunu doğrulamak için araçlarımız var. Bu araçlar, kaynak kodu doğrulamasının büyük bölümlerini otomatikleştirir ve ayrıca kullanıcıların yararına doğrulanmış sözleşmeleri derler.

### Etherscan {#etherscan}

Çoğunlukla bir [Ethereum blok gezgini](/developers/docs/data-and-analytics/block-explorers/) olarak bilinmesine rağmen, Etherscan ayrıca akıllı sözleşme geliştiricileri ve kullanıcıları için bir [kaynak kodu doğrulama hizmeti](https://etherscan.io/verifyContract) sunar.

Etherscan, sözleşme baytkodunu orijinal veri yükünden (kaynak kodu, kütüphane adresi, derleyici ayarları, sözleşme adresi vb.) yeniden derlemenize olanak tanır. Yeniden derlenen baytkod, zincir içi sözleşmenin baytkodu (ve kurucu parametreleri) ile ilişkiliyse, [sözleşme doğrulanır](https://info.etherscan.com/types-of-contract-verification/).

Doğrulandıktan sonra, sözleşmenizin kaynak kodu "Doğrulandı" (Verified) etiketini alır ve başkalarının denetlemesi için Etherscan'de yayınlanır. Ayrıca, doğrulanmış kaynak kodlarına sahip akıllı sözleşmelerin bir deposu olan [Doğrulanmış Sözleşmeler](https://etherscan.io/contractsVerified/) bölümüne eklenir.

Etherscan, sözleşmeleri doğrulamak için en çok kullanılan araçtır. Doğrulanmış her sözleşmeyi [nasıl eşleştiğine](https://info.etherscan.com/types-of-contract-verification/) göre etiketler: sözleşmenin oluşturma baytkodu ve kurucu argümanlarının tam eşleşmesi, yalnızca dağıtılan baytkodunun çalışma zamanı eşleşmesi veya bir sözleşmenin baytkodu zaten doğrulanmış bir sözleşmeninkiyle eşleştiğinde otomatik olarak verilen benzer bir eşleşme. Etherscan'in tam eşleşmesi, oluşturma baytkodu ve kurucu argümanlarıyla ilgilidir; yukarıda açıklanan tam eşleşme ve eşleşme ile aynı ayrım değildir.

[Etherscan'de sözleşmeleri doğrulama hakkında daha fazla bilgi](https://medium.com/etherscan-blog/verifying-contracts-on-etherscan-f995ab772327).

### Blockscout {#blockscout}

[Blockscout](https://blockscout.com/), akıllı sözleşme geliştiricileri ve kullanıcıları için bir [sözleşme doğrulama hizmeti](https://eth.blockscout.com/contract-verification) de sağlayan açık kaynaklı bir blok gezginidir. Açık kaynaklı bir alternatif olarak Blockscout, doğrulamanın nasıl gerçekleştirildiği konusunda şeffaflık sunar ve doğrulama sürecini iyileştirmek için topluluk katkılarına olanak tanır.

Diğer doğrulama hizmetlerine benzer şekilde Blockscout, baytkodu yeniden derleyerek ve dağıtılan sözleşmeyle karşılaştırarak sözleşmenizin kaynak kodunu doğrulamanıza olanak tanır. Doğrulandıktan sonra, sözleşmeniz doğrulama durumu alır ve kaynak kodu denetim ve etkileşim için herkese açık hale gelir. Doğrulanmış sözleşmeler ayrıca kolay gezinme ve keşif için Blockscout'un [doğrulanmış sözleşmeler deposunda](https://eth.blockscout.com/verified-contracts) listelenir.

### Sourcify {#sourcify}

[Sourcify](https://verify.sourcify.dev), sözleşmeleri doğrulamak için açık kaynaklı ve merkeziyetsiz olan başka bir araçtır. Bir blok gezgini değildir ve yalnızca [farklı EVM tabanlı ağlardaki](https://docs.sourcify.dev/docs/chains) sözleşmeleri doğrular. Diğer araçların üzerine inşa edilmesi için halka açık bir altyapı görevi görür ve meta veri dosyasında bulunan [Uygulama İkili Arayüzü (ABI)](/developers/docs/smart-contracts/compiling/#web-applications) ve [NatSpec](https://docs.soliditylang.org/en/v0.8.15/natspec-format.html) yorumlarını kullanarak daha insan dostu sözleşme etkileşimleri sağlamayı amaçlar.

Sourcify, bir sözleşmenin hem oluşturma hem de dağıtılan baytkodu için meta veri hash'i ile tam bir eşleşme mi yoksa onsuz bir eşleşme mi olduğunu bildirir. Doğrulanmış sözleşmeleri herkese açıktır: uygulama programlama arayüzü (API) aracılığıyla sorgulanabilir ve bir [veri kümesi](https://docs.sourcify.dev/docs/repository/) olarak indirilebilirler. Sourcify, doğrulamalarını Blockscout, Routescan ve Etherscan dahil olmak üzere blok gezginlerine aktarır ve [Verifier Alliance](https://verifieralliance.org/) aracılığıyla Blockscout ve Routescan ile doğrulanmış sözleşmelerin bir veritabanını paylaşır.

Meta veri dosyası ayrıca kaynak dosyalarının IPFS hash'lerini de tutar ve baytkoda eklenen meta veri hash'i de bir IPFS hash'idir. Bir geliştirici meta verileri ve kaynak dosyalarını [IPFS](https://docs.ipfs.tech/concepts/what-is-ipfs/) üzerinde yayınlarsa, dosyalar IPFS'te erişilebilir kaldığı sürece herkes bir sözleşmenin tam kaynaklarını yalnızca baytkodundan getirebilir. Bir sözleşme, meta veri dosyası ve kaynak dosyaları API'si veya [kullanıcı arayüzü (UI)](https://verify.sourcify.dev) üzerinden sağlanarak veya Hardhat ve Foundry gibi geliştirme araçları için eklentiler kullanılarak doğrulanabilir. Sourcify'ın [monitörü](https://docs.sourcify.dev/docs/monitoring/) ayrıca takip ettiği zincirlerdeki yeni sözleşmeleri izler ve meta verileri ile kaynak dosyaları IPFS'te yayınlandığında bunları otomatik olarak doğrular.

[Sourcify'da sözleşmeleri doğrulama hakkında daha fazla bilgi](https://soliditylang.org/blog/2020/06/25/sourcify-faq/).

### Tenderly {#tenderly}

[Tenderly platformu](https://tenderly.co/), Web3 geliştiricilerinin akıllı sözleşmeler oluşturmasına, test etmesine, izlemesine ve işletmesine olanak tanır. Hata ayıklama araçlarını gözlemlenebilirlik ve altyapı yapı taşlarıyla birleştiren Tenderly, geliştiricilerin akıllı sözleşme geliştirmeyi hızlandırmasına yardımcı olur. Tenderly özelliklerini tam olarak etkinleştirmek için geliştiricilerin çeşitli yöntemler kullanarak [kaynak kodu doğrulaması gerçekleştirmesi](https://docs.tenderly.co/contract-verification) gerekir.

Bir sözleşmeyi gizli veya herkese açık olarak doğrulamak mümkündür. Gizli olarak doğrulanırsa, akıllı sözleşme yalnızca sizin (ve projenizdeki diğer üyeler) tarafından görülebilir. Bir sözleşmeyi herkese açık olarak doğrulamak, onu Tenderly platformunu kullanan herkes için görünür kılar.

Sözleşmelerinizi [Kontrol Paneli](https://docs.tenderly.co/contract-verification), [Tenderly Hardhat eklentisi](https://docs.tenderly.co/contract-verification/hardhat) veya [Foundry](https://docs.tenderly.co/contract-verification/foundry) kullanarak doğrulayabilirsiniz.

Sözleşmeleri Kontrol Paneli üzerinden doğrularken, kaynak dosyasını veya Solidity derleyicisi tarafından oluşturulan meta veri dosyasını, adresi/ağı ve derleyici ayarlarını içe aktarmanız gerekir.

Tenderly Hardhat eklentisini kullanmak, daha az çabayla doğrulama süreci üzerinde daha fazla kontrol sağlar ve otomatik (kodsuz) ile manuel (kod tabanlı) doğrulama arasında seçim yapmanıza olanak tanır.

## Daha fazla bilgi {#further-reading}

- [Sözleşme kaynak kodunu doğrulama](https://programtheblockchain.com/posts/2018/01/16/verifying-contract-source-code/)
