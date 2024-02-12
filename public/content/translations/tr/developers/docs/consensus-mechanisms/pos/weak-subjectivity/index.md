---
title: Zayıf öznellik
description: Zayıf öznelliğin ve PoS Ethereum'daki rolünün açıklaması.
lang: tr
---

Blok zincirlerinde öznellik, mevcut durum üzerinde anlaşmak için sosyal bilgilere güvenmeyi ifade eder. Ağ üzerindeki diğer eşlerden toplanan bilgilere göre seçilen, birden fazla geçerli çatal olabilir. Bunun tersi, tüm düğümlerin kodlanmış kurallarını uygulayarak zorunlu olarak üzerinde anlaşmaya varacağı tek bir olası geçerli zincirin olduğu zincirlere atıfta bulunan nesnelliktir. Zayıf öznellik olarak bilinen üçüncü bir durum da vardır. Bu, bazı ilk bilgi tohumları sosyal olarak alındıktan sonra nesnel olarak ilerleyebilen bir zinciri ifade eder.

## Ön koşullar {#prerequisites}

Bu sayfayı anlamak için önce [hisse kanıtı](/developers/docs/consensus-mechanisms/pos/) temellerini anlamak gerekir.

## Zayıf öznellik hangi sorunları çözer? {#problems-ws-solves}

Hisse kanıtı, blok zincirlerinin özünde öznellik vardır, çünkü çoklu çatallardan doğru zinciri seçmek, geçmiş oyları sayarak yapılır. Bu, blok zincirini, zincire çok erken katılan düğümlerin, kendi avantajları için çok daha sonra serbest bırakacakları, alternatif bir çatal tuttuğu uzun menzilli saldırılar da dahil olmak üzere çeşitli saldırı vektörlerine maruz bırakır. Alternatif olarak, onaylayıcıların %33'ü hisselerini geri çeker ancak blokları onaylamaya ve üretmeye devam ederse, kurallı zincirle çelişen alternatif bir çatal oluşturabilirler. Uzun süredir çevrimdışı olan yeni düğümler veya düğümler, saldıran bu doğrulayıcıların paralarını geri çektiğinin farkında olmayabilir, bu nedenle saldırganlar onları yanlış bir zinciri takip etmeleri için kandırabilir. Ethereum, mekanizmanın öznel yönlerini azaltan kısıtlamalar getirerek bu saldırı vektörlerini çözebilir - ve dolayısıyla varsayımlara güvenir - minimuma indirir.

## Zayıf öznellik kontrol noktası {#ws-checkpoints}

Zayıf öznellik, "zayıf öznellik kontrol noktaları" kullanılarak hisse kanıtı Ethereum'da uygulanır. Bunlar, ağdaki tüm düğümlerin kanonik zincire ait olduğu konusunda hemfikir olduğu durum kökleridir. Blok zincirindeki oluşum konumunda oturmamaları dışında, oluşum bloklarına aynı "evrensel gerçek" amacına hizmet ederler. Çatal seçim algoritması, bu kontrol noktasında tanımlanan blok zinciri durumunun doğru olduğuna ve bu noktadan itibaren zinciri bağımsız ve nesnel olarak doğruladığına güvenir. Zayıf öznellik kontrol noktalarından önce bulunan bloklar değiştirilemediğinden, kontrol noktaları "geri dönüş limitleri" olarak hareket eder. Bu, uzun menzilli çatalları mekanizma tasarımının bir parçası olarak ve geçersiz tanımlayarak uzun menzilli saldırıları zayıflatır. Zayıf öznellik kontrol noktalarının, doğrulayıcının çekilme süresinden daha küçük bir mesafeyle ayrılmasını sağlamak, zinciri çatallayan bir doğrulayıcının, hisselerini geri çekmeden önce en azından bir miktar eşik miktarının kesilmesini ve yeni girenlerin, hissesi geri çekilen doğrulayıcılar tarafından yanlış çatallara kandırılamamasını sağlar.

## Zayıf öznellik kontrol noktaları ve kesinleşmiş bloklar arasındaki fark {#difference-between-ws-and-finalized-blocks}

Nihayetlendirilmiş bloklar ve zayıf öznellik kontrol noktaları, Ethereum düğümleri tarafından farklı şekilde ele alınır. Bir düğüm, birbiriyle rekabet eden iki nihai bloğun farkına varırsa, ikisi arasında kalır - hangisinin kurallı çatal olduğunu otomatik olarak belirlemenin bir yolu yoktur. Bu, bir konsensüs başarısızlığının belirtisidir. Buna karşılık, bir düğüm, zayıf öznellik kontrol noktasıyla çelişen herhangi bir bloğu basitçe reddeder. Düğümün bakış açısından, zayıf öznellik kontrol noktası, emsallerinden gelen yeni bilgiler tarafından zayıflatılamayan mutlak bir gerçeği temsil eder.

## Zayıf ne kadar zayıf? {#how-weak-is-weak}

Ethereum'un hisse kanıtının öznel yönü, güvenilir bir kaynaktan senkronizasyon için yakın tarihli bir durum (zayıf öznellik kontrol noktası) gerekliliğidir. Kötü bir zayıf öznellik kontrol noktası alma riski çok düşüktür, çünkü bunlar blok kaşifleri veya çoklu düğümler gibi birkaç bağımsız kamu kaynağına karşı kontrol edilebilir. Bununla birlikte, herhangi bir yazılım uygulamasını çalıştırmak için her zaman bir dereceye kadar güven gerekir; örneğin, yazılım geliştiricilerin dürüst yazılım ürettiğine güvenmek gibi.

Zayıf bir öznellik kontrol noktası, istemci yazılımının bir parçası olarak bile gelebilir. Muhtemelen bir saldırgan yazılımdaki kontrol noktasını bozabilir ve aynı kolaylıkla yazılımın kendisini de bozabilir. Bu problemin etrafında gerçek bir kripto-ekonomik yol yoktur, ancak Ethereum'da güvenilmez geliştiricilerin etkisi, her biri farklı dillerde eşdeğer yazılımlar oluşturan birden fazla bağımsız istemci ekibine sahip olarak en aza indirilir ve hepsi de dürüst bir zinciri sürdürme konusunda kazanılmış bir çıkara sahiptir. Blok kaşifleri ayrıca zayıf öznellik kontrol noktaları veya başka bir yerden elde edilen kontrol noktalarına, ek bir kaynağa karşı çapraz referans vermenin bir yolunu sağlayabilir.

Son olarak, diğer düğümlerden kontrol noktaları talep edilebilir; belki de tam bir düğüm çalıştıran başka bir Ethereum kullanıcısı, doğrulayıcıların daha sonra bir blok gezgininden gelen verilere karşı doğrulayabileceği bir kontrol noktası sağlayabilir. Genel olarak, zayıf bir öznellik kontrol noktası sağlayıcısına güvenmek, istemci geliştiricilere güvenmek kadar sorunlu olarak kabul edilebilir. Bütünsel güven gerekliliği azdır. Bu hususların yalnızca, doğrulayıcıların çoğunluğunun blok zincirinin alternatif bir çatalını üretmek için bir araya gelmesi gibi pek olası olmayan bir olayda önemli hale geldiğini belirtmek önemlidir. Başka herhangi bir koşulda, seçim yapabileceğiniz yalnızca bir Ethereum zinciri vardır.

## Daha Fazla Okuma {#further-reading}

- [Eth2'de zayıf öznellik](https://notes.ethereum.org/@adiasg/weak-subjectvity-eth2)
- [Vitalik: Zayıf öznelliği sevmeyi nasıl öğrendim](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/)
- [Zayıf öznellik (Teku dökümanları)](https://docs.teku.consensys.net/en/latest/Concepts/Weak-Subjectivity/)
- [Aşama 0 Zayıf öznellik rehberi](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/weak-subjectivity.md)
- [Ethereum 2.0'da zayıf öznellik analizi](https://github.com/runtimeverification/beacon-chain-verification/blob/master/weak-subjectivity/weak-subjectivity-analysis.pdf)
