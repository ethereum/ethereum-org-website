---
title: "Madencilik algoritmaları"
description: "Ethereum madenciliği için kullanılan algoritmalara ayrıntılı bir bakış."
lang: tr
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
İş ispatı artık Ethereum'un mutabakat mekanizmasının bir parçası değil, yani madencilik kapatıldı. Bunun yerine Ethereum, ETH hisseleyen doğrulayıcılar tarafından güvence altına alınır. ETH'nizi hisselemeye bugün başlayabilirsiniz. <a href='/roadmap/merge/'>Birleşim</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>hisse ispatı </a> ve <a href='/staking/'>hisseleme</a> hakkında daha fazla bilgi edinin. Bu sayfa sadece tarihsel ilgi içindir.
</AlertDescription>
</AlertContent>
</Alert>

Ethereum madencilik dönemi Ethereum 1.0 için bir iş ispatı algoritması olan Ethash'i kullanmıştır. Algoritmanın temel tasarımı, bir madencinin kaba kuvvet hesaplaması kullanarak belirli bir nonce değeri bulmasıdır. Bu bulunan değer sayesinde, oluşturulan karma değeri belli bir zorluk seviyesinin altında kalacaktır. Böylece madenci, bu nonce değeriyle iş ispatını oluşturarak yeni bir blok ekler. Bu zorluk seviyesi dinamik olarak ayarlanabilir, böylece blok üretiminin düzenli bir aralıkta gerçekleşmesine olanak tanınır.

## Ön Koşullar {#prerequisites}

Bu sayfayı daha iyi anlamak için, öncelikle [iş ispatı mutabakatı](/developers/docs/consensus-mechanisms/pow) ve [madencilik](/developers/docs/consensus-mechanisms/pow/mining) hakkında bilgi edinmenizi öneririz.

## Dagger Hashimoto {#dagger-hashimoto}

Dagger Hashimoto, Ethash'ın yerini aldığı Ethereum madenciliği için öncü bir araştırma algoritmasıydı. İki farklı algoritmanın birleşimiydi: Dagger ve Hashimoto. Sadece bir araştırma uygulaması olarak kaldı ve Ethereum Ana Ağı başlatıldığında, Ethereum 1.0 için iş ispatı algoritması yani Ethash çalıştırıldığında geçerliliği kalmadı.

[Dagger](http://www.hashcash.org/papers/dagger.html), rastgele dilimlerinin birlikte hash'lendiği bir [Yönlendirilmiş Asiklik Grafik](https://en.wikipedia.org/wiki/Directed_acyclic_graph) oluşturulmasını içerir. Temel ilke, her nonce'nin büyük bir toplam veri ağacının yalnızca küçük bir bölümünü gerektirmesidir. Her bir nonce için alt ağacı yeniden hesaplamak, madencilik için yasaklayıcıdır - bu nedenle ağacı depolama ihtiyacı vardır - ancak tek bir nonce'nin doğrulama değeri için tamamdır. Dagger, Scrypt gibi bellek açısından zor olan ancak bellek sertliği gerçekten güvenli seviyelere yükseldiğinde doğrulanması zor olan mevcut algoritmalara bir alternatif olacak şekilde tasarlanmıştır. Bununla birlikte, Dagger paylaşılan bellek donanım hızlandırmasına karşı savunmasızdı ve diğer araştırma yollarının lehine düştü.

[Hashimoto](http://diyhpl.us/%7Ebryan/papers2/bitcoin/meh/hashimoto.pdf), G/Ç'ye bağlı olarak ASIC direnci ekleyen bir algoritmadır (yani bellek okumaları, madencilik sürecinde sınırlayıcı faktördür). Teori, RAM'in hesaplamadan daha erişilebilir olmasıdır; milyarlarca dolarlık araştırma, RAM'i, genellikle neredeyse rastgele erişim kalıplarını (dolayısıyla "rastgele erişim belleği") içeren farklı kullanım durumları için optimize etmeyi zaten araştırdı. Sonuç olarak, mevcut RAM'in algoritmayı değerlendirmek için optimale orta derecede yakın olması muhtemeldir. Hashimoto, blok zincirini bir veri kaynağı olarak kullanır ve aynı anda yukarıdaki (1) ve (3)'ü sağlar.

Dagger-Hashimoto, Dagger ve Hashimoto algoritmalarının değiştirilmiş versiyonlarını kullandı. Dagger Hashimoto ve Hashimoto arasındaki fark, veri kaynağı olarak blok zinciri kullanmak yerine Dagger Hashimoto'nun her N blokta blok verisine dayalı olarak güncellenen özel olarak oluşturulmuş bir veri seti kullanmasıdır. Veri kümesi, hafif istemci doğrulama algoritması için her nonce'ye özgü bir alt kümenin verimli bir şekilde hesaplanmasına olanak tanıyan Dagger algoritması kullanılarak oluşturulur. Dagger Hashimoto ve Dagger arasındaki fark, orijinal Dagger'dan farklı olarak, bloğu sorgulamak için kullanılan veri kümesinin yarı kalıcı olması ve yalnızca ara sıra (örneğin haftada bir) güncellenmesidir. Bu, veri kümesi oluşturma çabasının sıfıra yakın olduğu anlamına gelir, bu nedenle Sergio Lerner'in paylaşılan bellek hızlandırmalarıyla ilgili argümanları ihmal edilebilir hale gelir.

[Dagger-Hashimoto](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto) hakkında daha fazlası.

## Ethash {#ethash}

Ethash, güncelde kullanımdan kalkmış bir iş ispatı mimarisinin altında gerçek Ethereum Ana Ağı'nda kullanılan madencilik algoritmasıydı. Ethash, algoritma önemli ölçüde güncellendikten sonra Dagger-Hashimoto'nun belirli bir versiyonuna verilen yeni bir isimdi, ancak yine de selefinin temel ilkelerini devraldı. Ethereum Ana Ağı sadece Ethash'ı kullandı - Dagger Hashimoto, Ethereum ana ağında madenciliğin başlamasından önce geçerliliğini yitirmiş madencilik algoritmasının bir Ar-Ge sürümüydü.

[Ethash hakkında daha fazlası](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash).

## Daha fazla kaynak {#further-reading}

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_
