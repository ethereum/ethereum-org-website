---
title: "Madencilik algoritmaları"
description: "Ethereum madenciliği için kullanılan algoritmalara detaylı bir bakış."
lang: tr
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
İş Kanıtı (PoW) artık Ethereum'un mutabakat mekanizmasının temelini oluşturmuyor, bu da madenciliğin kapatıldığı anlamına geliyor. Bunun yerine Ethereum, ETH stake eden doğrulayıcılar tarafından güvence altına alınmaktadır. ETH'nizi bugün stake etmeye başlayabilirsiniz. <a href='/roadmap/merge/'>Birleşme</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>Hisse Kanıtı (PoS)</a> ve <a href='/staking/'>staking</a> hakkında daha fazla bilgi edinin. Bu sayfa yalnızca tarihsel ilgi amaçlıdır.
</AlertDescription>
</AlertContent>
</Alert>

Ethereum madenciliği, Ethash olarak bilinen bir algoritma kullanıyordu. Algoritmanın temel fikri, bir madencinin kaba kuvvet hesaplaması kullanarak bir nonce girdisi bulmaya çalışmasıdır; böylece ortaya çıkan hash, hesaplanan zorluk tarafından belirlenen bir eşikten daha küçük olur. Bu zorluk seviyesi dinamik olarak ayarlanabilir, bu da blok üretiminin düzenli bir aralıkta gerçekleşmesini sağlar.

## Ön koşullar {#prerequisites}

Bu sayfayı daha iyi anlamak için öncelikle [İş Kanıtı (PoW) mutabakatı](/developers/docs/consensus-mechanisms/pow) ve [madencilik](/developers/docs/consensus-mechanisms/pow/mining) hakkında okuma yapmanızı öneririz.

## Dagger Hashimoto {#dagger-hashimoto}

Dagger Hashimoto, Ethash'in yerini aldığı Ethereum madenciliği için bir öncü araştırma algoritmasıydı. İki farklı algoritmanın birleşimiydi: Dagger ve Hashimoto. Yalnızca bir araştırma uygulamasıydı ve Ethereum Ana Ağı başlatıldığında yerini Ethash'e bıraktı.

[Dagger](http://www.hashcash.org/papers/dagger.html), rastgele dilimlerinin birlikte hash'lendiği bir [Yönlendirilmiş Asiklik Grafik (DAG)](https://en.wikipedia.org/wiki/Directed_acyclic_graph) oluşturulmasını içerir. Temel prensip, her bir nonce'un büyük bir toplam veri ağacının yalnızca küçük bir kısmını gerektirmesidir. Her nonce için alt ağacı yeniden hesaplamak madencilik için engelleyicidir - bu nedenle ağacı depolama ihtiyacı doğar - ancak tek bir nonce'luk doğrulama için uygundur. Dagger, bellek açısından zor olan ancak bellek zorlukları gerçekten güvenli seviyelere çıktığında doğrulanması zorlaşan Scrypt gibi mevcut algoritmalara bir alternatif olarak tasarlanmıştır. Ancak Dagger, paylaşımlı bellek donanım hızlandırmasına karşı savunmasızdı ve diğer araştırma yolları lehine terk edildi.

[Hashimoto](http://diyhpl.us/%7Ebryan/papers2/bitcoin/meh/hashimoto.pdf), G/Ç (I/O) bağımlı olarak (yani, bellek okumalarının madencilik sürecindeki sınırlayıcı faktör olması) ASIC direnci ekleyen bir algoritmadır. Teori, RAM'in hesaplamadan daha erişilebilir olduğudur; milyarlarca dolarlık araştırma, genellikle rastgele erişim modellerini (dolayısıyla "rastgele erişimli bellek") içeren farklı kullanım durumları için RAM'i optimize etmeyi zaten incelemiştir. Sonuç olarak, mevcut RAM'in algoritmayı değerlendirmek için optimuma orta derecede yakın olması muhtemeldir. Hashimoto, Blokzincir'i bir veri kaynağı olarak kullanır ve aynı anda yukarıdaki (1) ve (3) numaralı koşulları karşılar.

Dagger-Hashimoto, Dagger ve Hashimoto algoritmalarının değiştirilmiş versiyonlarını kullandı. Dagger Hashimoto ile Hashimoto arasındaki fark, Dagger Hashimoto'nun veri kaynağı olarak Blokzincir'i kullanmak yerine, her N blokta bir blok verilerine göre güncellenen özel olarak oluşturulmuş bir veri seti kullanmasıdır. Veri seti, hafif istemci doğrulama algoritması için her nonce'a özgü bir alt kümenin verimli bir şekilde hesaplanmasına olanak tanıyan Dagger algoritması kullanılarak oluşturulur. Dagger Hashimoto ile Dagger arasındaki fark, orijinal Dagger'ın aksine, bloğu sorgulamak için kullanılan veri setinin yarı kalıcı olması ve yalnızca ara sıra (örneğin haftada bir kez) güncellenmesidir. Bu, veri setini oluşturma çabasının sıfıra yakın olduğu anlamına gelir, bu nedenle Sergio Lerner'ın paylaşımlı bellek hızlandırmalarına ilişkin argümanları önemsiz hale gelir.

[Dagger-Hashimoto](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto) hakkında daha fazla bilgi.

## Ethash {#ethash}

Ethash, artık kullanımdan kaldırılan İş Kanıtı (PoW) mimarisi altında gerçek Ethereum Ana Ağı'nda fiilen kullanılan madencilik algoritmasıydı. Ethash, algoritma önemli ölçüde güncellendikten sonra Dagger-Hashimoto'nun belirli bir sürümüne verilen yeni bir isimdi ve selefinin temel ilkelerini hala miras alıyordu. Ethereum Ana Ağı yalnızca Ethash'i kullandı - Dagger Hashimoto, Ethereum Ana Ağı'nda madencilik başlamadan önce yerini alan madencilik algoritmasının bir Ar-Ge sürümüydü.

[Ethash hakkında daha fazla bilgi](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash).

## Daha fazla bilgi {#further-reading}

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve ekleyin!_