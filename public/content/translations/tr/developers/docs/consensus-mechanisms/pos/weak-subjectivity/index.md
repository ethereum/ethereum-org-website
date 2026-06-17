---
title: Zayıf öznellik
description: Zayıf öznelliğin ve PoS Ethereum'daki rolünün bir açıklaması.
lang: tr
---

Blokzincirlerde öznellik, mevcut durum üzerinde anlaşmaya varmak için sosyal bilgiye güvenmeyi ifade eder. Ağdaki diğer eşlerden toplanan bilgilere göre seçilen birden fazla geçerli çatallanma olabilir. Bunun tersi, tüm düğümlerin kodlanmış kurallarını uygulayarak zorunlu olarak üzerinde anlaşacağı tek bir olası geçerli zincirin bulunduğu zincirleri ifade eden nesnelliktir. Zayıf öznellik olarak bilinen üçüncü bir durum da vardır. Bu, bazı başlangıç bilgi tohumları sosyal olarak alındıktan sonra nesnel olarak ilerleyebilen bir zinciri ifade eder.

## Ön Koşullar {#prerequisites}

Bu sayfayı anlamak için öncelikle [Hisse Kanıtı (PoS)](/developers/docs/consensus-mechanisms/pos/) temellerini anlamak gerekir.

## Zayıf öznellik hangi sorunları çözer? {#problems-ws-solves}

Öznellik, Hisse Kanıtı (PoS) blokzincirlerinin doğasında vardır çünkü birden fazla çatallanma arasından doğru zinciri seçmek, geçmiş oyların sayılmasıyla yapılır. Bu durum, blokzinciri, zincire çok erken katılan düğümlerin kendi avantajlarına çok daha sonra yayınladıkları alternatif bir çatallanmayı sürdürdükleri uzun menzilli saldırılar da dahil olmak üzere çeşitli saldırı vektörlerine maruz bırakır. Alternatif olarak, doğrulayıcıların %33'ü stake'lerini çeker ancak onaylamaya ve blok üretmeye devam ederse, kurallı zincirle çelişen alternatif bir çatallanma oluşturabilirler. Yeni düğümler veya uzun süredir çevrimdışı olan düğümler, bu saldıran doğrulayıcıların fonlarını çektiklerinin farkında olmayabilir, bu nedenle saldırganlar onları yanlış bir zinciri takip etmeleri için kandırabilir. [Ethereum](/), mekanizmanın öznel yönlerini ve dolayısıyla güven varsayımlarını en aza indiren kısıtlamalar getirerek bu saldırı vektörlerini çözebilir.

## Zayıf öznellik kontrol noktaları {#ws-checkpoints}

Zayıf öznellik, Hisse Kanıtı (PoS) Ethereum'da "zayıf öznellik kontrol noktaları" kullanılarak uygulanır. Bunlar, ağdaki tüm düğümlerin kurallı zincire ait olduğu konusunda hemfikir olduğu durum kökleridir. Blokzincirde başlangıç (genesis) konumunda yer almamaları dışında, başlangıç bloklarıyla aynı "evrensel gerçek" amacına hizmet ederler. Çatallanma seçimi algoritması, o kontrol noktasında tanımlanan blokzincir durumunun doğru olduğuna ve o noktadan itibaren zinciri bağımsız ve nesnel olarak doğruladığına güvenir. Kontrol noktaları "geri al sınırları" olarak işlev görür çünkü zayıf öznellik kontrol noktalarından önce bulunan bloklar değiştirilemez. Bu, mekanizma tasarımının bir parçası olarak uzun menzilli çatallanmaları geçersiz olarak tanımlayarak uzun menzilli saldırıları zayıflatır. Zayıf öznellik kontrol noktalarının doğrulayıcı çekim süresinden daha küçük bir mesafeyle ayrılmasını sağlamak, zinciri çatallandıran bir doğrulayıcının stake'ini çekmeden önce en azından belirli bir eşik miktarında kesintiye uğramasını ve yeni katılanların, stake'i çekilmiş doğrulayıcılar tarafından yanlış çatallanmalara kandırılamamasını sağlar.

## Zayıf öznellik kontrol noktaları ile kesinleşmiş bloklar arasındaki fark {#difference-between-ws-and-finalized-blocks}

Kesinleşmiş bloklar ve zayıf öznellik kontrol noktaları, Ethereum düğümleri tarafından farklı şekilde ele alınır. Bir düğüm rekabet eden iki kesinleşmiş bloğun farkına varırsa, ikisi arasında kalır; hangisinin kurallı çatallanma olduğunu otomatik olarak belirlemenin bir yolu yoktur. Bu, bir mutabakat hatasının belirtisidir. Buna karşılık, bir düğüm zayıf öznellik kontrol noktasıyla çelişen herhangi bir bloğu basitçe reddeder. Düğümün bakış açısına göre, zayıf öznellik kontrol noktası, eşlerinden gelen yeni bilgilerle zayıflatılamayacak mutlak bir gerçeği temsil eder.

## Zayıf ne kadar zayıftır? {#how-weak-is-weak}

Ethereum'un Hisse Kanıtı'nın (PoS) öznel yönü, eşzamanlama yapmak için güvenilir bir kaynaktan alınan yeni bir duruma (zayıf öznellik kontrol noktası) duyulan gereksinimdir. Kötü bir zayıf öznellik kontrol noktası alma riski çok düşüktür çünkü bunlar blok gezginleri veya birden fazla düğüm gibi çeşitli bağımsız halka açık kaynaklara karşı kontrol edilebilir. Bununla birlikte, herhangi bir yazılım uygulamasını çalıştırmak için her zaman bir dereceye kadar güven gerekir, örneğin yazılım geliştiricilerinin dürüst bir yazılım ürettiğine güvenmek gibi.

Bir zayıf öznellik kontrol noktası, istemci yazılımının bir parçası olarak bile gelebilir. Tartışmalı bir şekilde, bir saldırgan yazılımdaki kontrol noktasını bozabilir ve yazılımın kendisini de aynı kolaylıkla bozabilir. Bu sorunun etrafından dolaşacak gerçek bir kripto-ekonomik yol yoktur, ancak güvenilmez geliştiricilerin etkisi, Ethereum'da her biri farklı dillerde eşdeğer yazılımlar oluşturan ve hepsinin dürüst bir zinciri sürdürmekte çıkarı olan birden fazla bağımsız istemci ekibine sahip olunarak en aza indirilir. Blok gezginleri ayrıca zayıf öznellik kontrol noktaları veya başka bir yerden elde edilen kontrol noktalarını ek bir kaynağa karşı çapraz referanslama yolu sağlayabilir.

Son olarak, kontrol noktaları diğer düğümlerden talep edilebilir; belki de tam düğüm çalıştıran başka bir Ethereum kullanıcısı, doğrulayıcıların daha sonra bir blok gezgininden gelen verilere karşı doğrulayabileceği bir kontrol noktası sağlayabilir. Genel olarak, bir zayıf öznellik kontrol noktası sağlayıcısına güvenmek, istemci geliştiricilerine güvenmek kadar sorunlu kabul edilebilir. Gerekli olan genel güven düşüktür. Bu hususların yalnızca doğrulayıcıların çoğunluğunun blokzincirin alternatif bir çatallanmasını üretmek için komplo kurması gibi çok düşük bir ihtimal durumunda önemli hale geldiğini belirtmek önemlidir. Diğer herhangi bir koşul altında, aralarından seçim yapılabilecek tek bir Ethereum zinciri vardır.

## Daha Fazla Okuma {#further-reading}

- [Eth2'de zayıf öznellik](https://notes.ethereum.org/@adiasg/weak-subjectvity-eth2)
- [Vitalik: Zayıf öznelliği sevmeyi nasıl öğrendim](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity)
- [Zayıf öznellik (Teku belgeleri)](https://docs.teku.consensys.io/concepts/weak-subjectivity)
- [Aşama-0 Zayıf öznellik rehberi](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/weak-subjectivity.md)
- [Ethereum 2.0'da zayıf öznellik analizi](https://github.com/runtimeverification/beacon-chain-verification/blob/master/weak-subjectivity/weak-subjectivity-analysis.pdf)