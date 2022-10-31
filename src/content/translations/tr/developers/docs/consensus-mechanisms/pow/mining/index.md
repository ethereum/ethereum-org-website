---
title: Madencilik
description: Ethereum'da madenciliğin nasıl çalıştığına ve Ethereum'un güvenli ve merkeziyetsiz kalmasına nasıl yardımcı olduğuna dair bir açıklama.
lang: tr
incomplete: true
---

## Ön koşullar {#prerequisites}

Bu sayfayı daha iyi anlamak için, önce [işlemleri](/developers/docs/transactions/), [blokları](/developers/docs/blocks/) ve [iş ispatını](/developers/docs/consensus-mechanisms/pow/) okumanızı öneririz.

## Ethereum madenciliği nedir? {#what-is-ethereum-mining}

Madencilik, Ethereum blok zincirine eklenecek bir işlem bloğu oluşturma sürecidir.

Ethereum, Bitcoin gibi şu anda bir [iş ispatı (PoW)](/developers/docs/consensus-mechanisms/pow/) mutabakat mekanizmasını kullanıyor. Madencilik, iş ispatının can damarıdır. Ethereum madencileri, yazılım çalıştıran bilgisayarlar, işlemleri işlemek ve bloklar üretmek için zamanlarını ve bilgi işlem güçlerini kullanırlar.

<InfoBanner emoji=":wave:">
   Önümüzdeki yıl hisse ispatı, madenciliğin ve iş ispatının yerine geçecektir. ETH'nizi stake etmeye bugün başlayabilirsiniz. <a href="/staking/">Stake etme hakkında daha fazla bilgi</a>    
</InfoBanner>

## Madenciler neden var? {#why-do-miners-exist}

Ethereum gibi merkeziyetsiz sistemlerde, herkesin işlemlerin sırası konusunda anlaşmasını sağlamalıyız. Madenciler, ağı saldırılardan korumanın bir yolu olarak hizmet veren bloklar üretmek için hesaplama açısından zor bulmacaları çözerek bunun gerçekleşmesine yardımcı olur.

[Çalışma prensibi hakkında daha fazla bilgi](/developers/docs/consensus-mechanisms/pow/)

## Ethereum'da kimler madenci olabilir? {#who-can-become-a-miner}

Teknik olarak, herkes Ethereum ağı üzerinde bilgisayarını kullanarak madencilik yapabilir. Ancak herkes kârlı şekilde ether (ETH) madenciliği yapamaz. Çoğu zaman, madenciler kârlı şekilde kazım yapabilmek için özel bilgisayar donanımları satın almalıdır. Herhangi birinin bilgisayarında madencilik yazılımı çalıştırabileceği doğru olsa da, ortalama bir bilgisayarın madencilik maliyetlerini karşılamak için yeterli blok ödülü kazanabilme ihtimali düşüktür.

### Madenciliğin maliyeti {#cost-of-mining}

- Bir madencilik teçhizatı inşa etmek ve yürütmek için gerekli donanımların potansiyel maliyeti
- Madencilik teçhizatına güç vermenin elektriksel maliyeti
- Bir havuzda madencilik yapıyorsanız, madencilik havuzları genelde havuz tarafından üretilen her blok için sabit yüzdelik bir ödeme talep ederler
- Madencilik teçhizatını desteklemek için gereken ekipmanların potansiyel maliyeti (havalandırma, enerji takibi, elektrik tesisatı vb.)

Madencilik kârlılığını daha yakından incelemek için [Etherscan](https://etherscan.io/ether-mining-calculator) tarafından sağlanan gibi bir madencilik hesaplayıcısı kullanın.

## Ethereum işlemlerinin madencilik süreci nasıl işler {#how-ethereum-transactions-are-mined}

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

Her işlem bir kez madencilik sürecinden geçer (yeni bir bloğa dahil edilir ve ilk kez yayılır) ancak kurallı EVM durumunu geliştirme sürecinde her katılımcı tarafından yürütülür ve doğrulanır. Bu, blok zincirinin temel deyimlerinden birini vurgular: **Güvenme, doğrula**.

## Görsel bir demo {#a-visual-demo}

Austin'in madenciliği ve iş ispatı blok zincirini size açıklamasını izleyin.

<YouTube id="zcX7OJ-L8XQ" />

## Daha fazla okuma {#further-reading}

- [Ethereum madenciliği yapmak ne anlama geliyor?](https://docs.ethhub.io/using-ethereum/mining/) _EthHub_

## İlgili araçlar {#related-tools}

- [En iyi Ethereum madencileri](https://etherscan.io/stat/miner?range=7&blocktype=blocks)
- [Etherscan madencilik hesaplayıcısı](https://etherscan.io/ether-mining-calculator)
- [Minerstat madencilik hesaplayıcısı](https://minerstat.com/coin/ETH)

## İlgili konular {#related-topics}

- [Gaz](/developers/docs/gas/)
- [Ethereum Sanal Makinesi](/developers/docs/evm/)
- [İş ispatı](/developers/docs/consensus-mechanisms/pow/)
