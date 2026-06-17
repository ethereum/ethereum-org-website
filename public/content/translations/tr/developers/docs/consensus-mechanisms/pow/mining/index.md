---
title: Madencilik
description: Ethereum'da madenciliğin nasıl çalıştığına dair bir açıklama.
lang: tr
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
İş Kanıtı (PoW) artık Ethereum'un mutabakat mekanizmasının temelini oluşturmuyor, bu da madenciliğin kapatıldığı anlamına geliyor. Bunun yerine, [Ethereum](/), ETH stake eden doğrulayıcılar tarafından güvence altına alınmaktadır. Bugün ETH'nizi stake etmeye başlayabilirsiniz. <a href='/roadmap/merge/'>Birleşme</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>Hisse Kanıtı (PoS)</a> ve <a href='/staking/'>staking</a> hakkında daha fazla bilgi edinin. Bu sayfa yalnızca tarihsel ilgi amaçlıdır.
</AlertDescription>
</AlertContent>
</Alert>

## Ön Koşullar {#prerequisites}

Bu sayfayı daha iyi anlamak için öncelikle [işlemler](/developers/docs/transactions/), [bloklar](/developers/docs/blocks/) ve [İş Kanıtı (PoW)](/developers/docs/consensus-mechanisms/pow/) hakkında okuma yapmanızı öneririz.

## Ethereum madenciliği nedir? {#what-is-ethereum-mining}

Madencilik, Ethereum'un artık kullanımdan kaldırılmış İş Kanıtı (PoW) mimarisinde Ethereum Blokzincirine eklenecek bir işlem bloğu oluşturma sürecidir.

Madencilik kelimesi, kripto paralar için kullanılan altın analojisi bağlamından gelmektedir. Altın veya değerli metaller kıttır, dijital tokenlar da öyledir ve bir İş Kanıtı (PoW) sisteminde toplam hacmi artırmanın tek yolu madenciliktir. İş Kanıtı (PoW) Ethereum'da tek ihraç yöntemi madencilikti. Ancak altın veya değerli metallerin aksine, Ethereum madenciliği aynı zamanda Blokzincirde bloklar oluşturarak, doğrulayarak, yayınlayarak ve yayarak ağı güvence altına almanın da yoluydu.

Ether madenciliği = Ağı Güvence Altına Almak

Madencilik, herhangi bir İş Kanıtı (PoW) Blokzincirinin can damarıdır. Ethereum madencileri (yazılım çalıştıran bilgisayarlar), Hisse Kanıtı (PoS) sistemine geçişten önce işlemleri işlemek ve bloklar üretmek için zamanlarını ve hesaplama güçlerini kullandılar.

## Madenciler neden var? {#why-do-miners-exist}

Ethereum gibi merkeziyetsiz sistemlerde, herkesin işlemlerin sırası konusunda hemfikir olduğundan emin olmamız gerekir. Madenciler, bloklar üretmek için hesaplama açısından zor bulmacaları çözerek ve ağı saldırılara karşı güvence altına alarak bunun gerçekleşmesine yardımcı oldular.

[İş Kanıtı (PoW) hakkında daha fazlası](/developers/docs/consensus-mechanisms/pow/)

Daha önce herkes bilgisayarını kullanarak Ethereum ağında madencilik yapabiliyordu. Ancak herkes kârlı bir şekilde Ether (ETH) madenciliği yapamıyordu. Çoğu durumda, madencilerin özel bilgisayar donanımı satın almaları ve ucuz enerji kaynaklarına erişimleri olması gerekiyordu. Ortalama bir bilgisayarın, madencilikle ilişkili maliyetleri karşılayacak kadar blok ödülü kazanması pek olası değildi.

### Madencilik maliyeti {#cost-of-mining}

- Bir madencilik teçhizatı kurmak ve sürdürmek için gerekli donanımın potansiyel maliyetleri
- Madencilik teçhizatına güç sağlamanın elektrik maliyeti
- Eğer bir havuzda madencilik yapıyorsanız, bu havuzlar genellikle havuz tarafından üretilen her bloktan sabit bir % ücret alırdı
- Madencilik teçhizatını destekleyecek ekipmanların potansiyel maliyeti (havalandırma, enerji izleme, elektrik tesisatı vb.)

Madencilik kârlılığını daha fazla incelemek için, [Etherscan](https://etherscan.io/ether-mining-calculator) tarafından sağlanan gibi bir madencilik hesaplayıcısı kullanın.

## Ethereum işlemleri nasıl kazılırdı {#how-ethereum-transactions-were-mined}

Aşağıda, Ethereum İş Kanıtı (PoW) sisteminde işlemlerin nasıl kazıldığına dair bir genel bakış sunulmaktadır. Ethereum Hisse Kanıtı (PoS) için bu sürecin benzer bir açıklaması [burada](/developers/docs/consensus-mechanisms/pos/#transaction-execution-ethereum-pos) bulunabilir.

1. Bir kullanıcı, bir [Hesabın](/developers/docs/accounts/) özel anahtarı ile bir [işlem](/developers/docs/transactions/) talebi yazar ve imzalar.
2. Kullanıcı, işlem talebini bir [Düğüm](/developers/docs/nodes-and-clients/) üzerinden tüm Ethereum ağına yayınlar.
3. Yeni işlem talebini duyan Ethereum ağındaki her Düğüm, talebi yerel bellek havuzuna (henüz Blokzincirde bir bloğa işlenmemiş, duydukları tüm işlem taleplerinin bir listesi) ekler.
4. Bir noktada, bir madenci Düğümü, blok gaz limitinin altında kalırken kazandığı [işlem ücretlerini](/developers/docs/gas/) en üst düzeye çıkaracak şekilde birkaç düzine veya yüzlerce işlem talebini potansiyel bir [Blok](/developers/docs/blocks/) içinde bir araya getirir. Madenci Düğümü daha sonra:
   1. Her işlem talebinin geçerliliğini doğrular (örneğin, kimsenin imza üretmediği bir Hesaptan Ether transfer etmeye çalışmadığını, talebin hatalı biçimlendirilmediğini vb. kontrol eder) ve ardından talebin kodunu yürüterek EVM'nin yerel kopyasının durumunu değiştirir. Madenci, bu tür her işlem talebi için işlem ücretini kendi Hesabına ödül olarak ekler.
   2. Bloktaki tüm işlem talepleri doğrulandıktan ve yerel EVM kopyasında yürütüldükten sonra, potansiyel blok için İş Kanıtı (PoW) "meşruiyet sertifikası" üretme sürecine başlar.
5. Sonunda bir madenci, belirli işlem talebimizi içeren bir blok için sertifika üretmeyi bitirir. Madenci daha sonra sertifikayı ve iddia edilen yeni EVM durumunun bir sağlama toplamını (checksum) içeren tamamlanmış bloğu yayınlar.
6. Diğer Düğümler yeni bloğu duyar. Sertifikayı doğrularlar, bloktaki tüm işlemleri (kullanıcımız tarafından ilk yayınlanan işlem dahil) kendileri yürütürler ve tüm işlemlerin yürütülmesinden sonraki yeni EVM durumlarının sağlama toplamının, madencinin bloğu tarafından iddia edilen durumun sağlama toplamıyla eşleştiğini doğrularlar. Ancak o zaman bu Düğümler bu bloğu Blokzincirlerinin sonuna ekler ve yeni EVM durumunu kurallı (canonical) durum olarak kabul ederler.
7. Her Düğüm, yeni bloktaki tüm işlemleri, yerine getirilmemiş işlem taleplerinin bulunduğu yerel bellek havuzundan çıkarır.
8. Ağa katılan yeni Düğümler, ilgilendiğimiz işlemi içeren blok da dahil olmak üzere tüm blokları sırayla indirir. Yerel bir EVM kopyası başlatırlar (bu, boş durumlu bir EVM olarak başlar) ve ardından yerel EVM kopyalarının üzerinde her bloktaki her işlemi yürütme sürecinden geçerler ve yol boyunca her blokta durum sağlama toplamlarını doğrularlar.

Her işlem bir kez kazılır (yeni bir bloğa dahil edilir ve ilk kez yayılır), ancak kurallı EVM durumunu ilerletme sürecinde her katılımcı tarafından yürütülür ve doğrulanır. Bu, Blokzincirin temel mantralarından birini vurgular: **Güvenme, doğrula**.

## Ommer (amca) blokları {#ommer-blocks}

İş Kanıtı (PoW) üzerinde blok madenciliği olasılıksaldı, yani bazen ağ gecikmesi nedeniyle iki geçerli blok aynı anda yayınlanabiliyordu. Bu durumda Protokol, önerilen ancak dahil edilmeyen geçerli bloğu kısmen ödüllendirerek madencilere karşı adaleti sağlarken en uzun (ve dolayısıyla en "geçerli") Zinciri belirlemek zorundaydı. Bu, daha fazla gecikmeyle karşılaşabilecek daha küçük madencilerin [ommer (amca) bloğu](/glossary/#ommer) ödülleri aracılığıyla hala getiri elde edebilmesi sayesinde ağın daha fazla merkeziyetsizliğini teşvik etti.

"Ommer" terimi, bir ebeveyn bloğun kardeşi için tercih edilen cinsiyetsiz bir terimdir, ancak buna bazen "amca" (uncle) da denir. **Ethereum'un Hisse Kanıtı (PoS) sistemine geçişinden bu yana, her slotta yalnızca bir teklif edici seçildiği için ommer (amca) blokları artık kazılmamaktadır.** Kazılan ommer (amca) bloklarının [tarihsel grafiğini](https://ycharts.com/indicators/ethereum_uncle_rate) görüntüleyerek bu değişikliği görebilirsiniz.

## Görsel bir demo {#a-visual-demo}

Austin'in size madencilik ve İş Kanıtı (PoW) Blokzincirini adım adım anlatmasını izleyin.

<VideoWatch slug="blockchain-eth-build" />

## Madencilik algoritması {#mining-algorithm}

Ethereum Ana Ağı yalnızca tek bir madencilik algoritması kullandı: ['Ethash'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/). Ethash, ['Dagger-Hashimoto'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/) olarak bilinen orijinal bir Ar-Ge algoritmasının halefiydi.

[Madencilik algoritmaları hakkında daha fazlası](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/).

## İlgili konular {#related-topics}

- [Gaz](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [İş Kanıtı (PoW)](/developers/docs/consensus-mechanisms/pow/)