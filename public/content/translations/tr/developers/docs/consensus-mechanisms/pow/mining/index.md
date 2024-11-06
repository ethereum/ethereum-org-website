---
title: Madencilik
description: Ethereum'da madenciliğin nasıl çalıştığına dair bir açıklama.
lang: tr
---

<InfoBanner emoji=":wave:">
İş ispatı artık Ethereum'un mutabakat mekanizmasının bir parçası değil, yani madencilik kapatıldı. Bunun yerine Ethereum, ETH hisseleyen doğrulayıcılar tarafından güvence altına alınır. ETH'nizi hisselemeye bugün başlayabilirsiniz. <a href='/roadmap/merge/'>Birleşim</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>hisse ispatı </a> ve <a href='/staking/'>hisseleme</a> hakkında daha fazla bilgi edinin. Bu sayfa sadece tarihsel ilgi içindir.
</InfoBanner>

## Ön Koşullar {#prerequisites}

Bu sayfayı daha iyi anlamak için, önce [işlemleri](/developers/docs/transactions/), [blokları](/developers/docs/blocks/) ve [iş ispatını](/developers/docs/consensus-mechanisms/pow/) okumanızı öneririz.

## Ethereum madenciliği nedir? {#what-is-ethereum-mining}

Madencilik, Ethereum'un artık kullanımdan kaldırdığı iş ispatı mimarisinde Ethereum blok zincirine eklenecek bir işlem blokunu oluşturma sürecidir.

Madencilik kelimesi, kripto para birimleri için altın analojisinden gelmektedir. Dijital token'lar da tıpkı altın ya da diğer kıymetli metaller gibi sınırlı bulunur ve bir iş ispatı sistemindeki toplam hacmi artırmanın tek yolu madenciliktir. İş ispatına dayalı Ethereum'da tek ihraç şekli madencilik yoluyla yapıldı. Ancak altın analojisinden farklı olarak madencilik; blok zincirde bloklar oluşturarak, doğrulayarak, yayımlayarak ve yayarak ağı güvence altına almanın bir yoludur.

Ether madenciliği = Ağ Güvenliği

Madencilik herhangi bir iş ispatına dayalı blok zincir modelinin can damarıdır. Ethereum madencileri - yazılımı çalıştıran bilgisayarlar - hisse ispatına geçmeden önce işlemleri işlemek ve bloklar üretmek için zamanlarını ve hesaplama güçlerini kullandılar.

## Madenciler neden var? {#why-do-miners-exist}

Ethereum gibi merkeziyetsiz sistemlerde, herkesin işlemlerin sırası konusunda anlaşmasını sağlamalıyız. Madenciler, ağı saldırılardan korumanın bir yolu olarak hizmet veren bloklar üretmek için hesaplama açısından zor bulmacaları çözerek bunun gerçekleşmesine yardımcı oldular.

[İş kanıtı hakkında daha fazlası](/developers/docs/consensus-mechanisms/pow/)

Daha önceleri herhangi bir kişi bilgisayarını kullanarak Ethereum ağında madencilik yapabiliyordu. Ancak herkes kârlı şekilde Ether (ETH) madenciliği yapamazdı. Birçok durumda madencilerin bu konuya özelleşmiş bilgisayar donanımları almaları ve ucuz enerji kaynaklarına erişimlerinin olması gerekiyordu. Ortalama bir bilgisayarın madencilikle ilgili maliyetleri karşılamaya yetecek kadar blok ödülü kazanması pek olası değildi.

### Madenciliğin maliyeti {#cost-of-mining}

- Bir madencilik teçhizatı inşa etmek ve yürütmek için gerekli donanımların potansiyel maliyeti
- Madencilik teçhizatına güç vermenin elektriksel maliyeti
- Bir havuzda madencilik yapıyorsanız, madencilik havuzları genelde havuz tarafından üretilen her blok için sabit bir yüzdelik ödeme alırlar
- Madencilik teçhizatını desteklemek için gereken ekipmanların potansiyel maliyeti (havalandırma, enerji takibi, elektrik tesisatı vb.)

Madencilik kârlılığını daha yakından incelemek için [Etherscan](https://etherscan.io/ether-mining-calculator) tarafından sağlanan gibi bir madencilik hesaplayıcısı kullanın.

## Ethereum işlemleri için nasıl madencilik yapıldı? {#how-ethereum-transactions-were-mined}

Aşağıda Ethereum iş ispatında işlemler için nasıl madencilik yapıldığına dair bir genel bakış verilmektedir. Ethereum hisse ispatı için bu sürecin benzer bir açıklamasına [buradan](/developers/docs/consensus-mechanisms/pos/#transaction-execution-ethereum-pos) ulaşılabilir.

1. Bir kullanıcı, bir [hesabın](/developers/docs/accounts/) özel anahtarı ile bir [işlem](/developers/docs/transactions/) talebi yazar ve imzalar.
2. Kullanıcı, işlem talebini bir [düğüm](/developers/docs/nodes-and-clients/)den tüm Ethereum ağına yayınlar.
3. Ethereum ağındaki her düğüm, yeni işlem talebini duyduktan sonra talebi, duydukları ve henüz bir blokta blok zincirine taahhüt edilmemiş tüm işlem isteklerinin bir listesi olan yerel bellek havuzuna ekler.
4. Bir noktada, bir madencilik düğümü birkaç düzine veya birkaç yüz işlem talebini potansiyel bir [bloğa](/developers/docs/blocks/) toplar; bu şekilde blok gaz limitinin altında kalınarak kazanılan [işlem ücretleri](/developers/docs/gas/) en yüksek seviyeye çıkartılır. Madencilik düğümü daha sonra:
   1. Her işlem talebinin geçerliliğini doğrular (yani, hiç kimsenin imza oluşturmadığı bir hesaptan ether aktarmaya çalışmaması, talebin hatalı biçimlendirilmemesi vb.) ve sonra talebin kodunu yürüterek Ethereum Sanal Makinesi'nin (EVM) yerel kopyasının durumunu değiştirirler. Madenci, bu tür her bir işlem talebinin işlem ücretini kendi hesabına aktarır.
   2. Bloktaki tüm işlem talepleri doğrulandıktan ve yerel EVM kopyasında yürütüldükten sonra, potansiyel blok için iş ispatı "meşruiyet sertifikası" üretme sürecine başlar.
5. Sonunda bir madenci, belirli işlem talebimizi içeren bir blok için sertifika üretmeyi tamamlar. Madenci daha sonra, talep edilen yeni EVM durumunun sertifikasını ve sağlama toplamını içeren tamamlanmış bloğu yayınlar.
6. Diğer düğümler yeni bloğu duyar. Sertifikayı doğrularlar, bloktaki tüm işlemleri kendileri yürütürler (başlangıçta kullanıcımız tarafından yayınlanan işlem dahil) ve tüm işlemlerin yürütülmesinden sonra yeni EVM durumlarının sağlama toplamının, madenci bloğu tarafından talep edilen durumun sağlama toplamı ile eşleştiğini doğrularlar. Ancak o zaman bu düğümler bu bloğu blok zincirlerinin kuyruğuna ekler ve yeni EVM durumunu kurallı durum olarak kabul eder.
7. Her düğüm, yeni bloktaki tüm işlemleri, yerine getirilmemiş işlem taleplerinin yerel bellek havuzlarından kaldırır.
8. Ağa katılan yeni düğümler, ilgilendiğimiz işlemi içeren blok da dahil olmak üzere tüm blokları sırayla indirir. Yerel bir EVM kopyasını başlatırlar (boş durumlu bir EVM olarak başlar) ve ardından yol boyunca her blokta durum sağlama toplamlarını doğrulayarak yerel EVM kopyalarının üzerindeki her bloktaki her işlemi yürütme sürecinden geçerler.

Her işlem bir kez madencilik sürecinden geçer (yeni bir bloka dahil edilir ve ilk kez yayılır) ancak kurallı Ethereum Sanal Makinesi durumunu geliştirme sürecinde her katılımcı tarafından yürütülür ve doğrulanır. Bu, blok zincirin temel deyimlerinden birini vurgular: **Güvenme, doğrula**.

## Ommer (amca) blokları {#ommer-blocks}

İş ispatında blok madenciliği olasılıksaldır, bu da bazen ağ gecikmesi nedeniyle aynı anda iki geçerli blokun ağda yayımlandığı anlamına gelir. Bu durumda protokol, önerilen dahil edilmemiş geçerli bloku kısmen ödüllendirerek madencilere karşı adaleti sağlarken en uzun (yani en "geçerli") zinciri belirlemek zorundaydı. Bu, daha fazla gecikmeyle karşı karşıya kalabilecek daha küçük madencilerin yine de [ommer](/glossary/#ommer) blok ödülleri aracılığıyla getiri sağlayabildikleri için ağın daha fazla merkezsizleştirilmesini teşvik etti.

"Ommer" terimi, bir ebeveyn bloğunun kardeşi için tercih edilen, cinsiyetten bağımsız bir terimdir ancak buna bazen "amca" da denir. Her yuva için bir teklif verici seçildiği için **Ethereum'un hisse ispatına geçişinden beri ommer bloklarına madencilik yapılmamaktadır**. Bu değişimi kazılmış ommer bloklarının [tarihsel tablosunda](https://ycharts.com/indicators/ethereum_uncle_rate) görebilirsiniz.

## Görsel bir demo {#a-visual-demo}

Austin'in madenciliği ve iş ispatı blok zincirini, size açıklamasını izleyin.

<YouTube id="zcX7OJ-L8XQ" />

## Madencilik algoritması {#mining-algorithm}

Ethereum Ana Ağı şimdiye kadar yalnızca bir madencilik algoritması kullandı - ["Ethash"](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/). Ethash, ["Dagger-Hashimoto"](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/) olarak bilinen orijinal bir Ar-Ge algoritmasının halefiydi.

[Madencilik algoritmaları ile ilgili daha fazla bilgi](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/).

## İlgili Konular {#related-topics}

- [Gaz](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [İş İspatı](/developers/docs/consensus-mechanisms/pow/)
