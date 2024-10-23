---
title: Birleştirme
description: 'Birleşim: Ana Ağ Ethereum''un hisse ispatını kullanmaya başlama zamanı hakkında bilgi edinin.'
lang: tr
template: upgrade
image: /images/upgrades/merge.png
alt:
summaryPoint1: Ethereum Ana Ağı hisse ispatı kullanır, ancak her zaman geçerli olan durum bu değildi.
summaryPoint2: Özgün iş ispatı mekanizmasının hisse ispatına yükseltilmesi Birleşim olarak adlandırılır.
summaryPoint3: Birleşim, esas Ethereum Ana Ağının İşaret Zinciri olarak adlandırılan ayrı bir iş ispatı blok zinciri ile birleşmesi ile artık tek bir zincir olarak varlığını sürdürmesini ifade eder.
summaryPoint4: Birleşim, Ethereum'un enerji tüketimini ~ %99,95 oranında azalttı.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  Birleşim 15 Eylül 2022 de gerçekleştirildi. Bu, iş ispatını resmi olarak kullanım dışı bırakarak ve enerji tüketimini yaklaşık %99,95 azaltarak Ethereum'un iş ispatı mutabakatına geçişini tamamladı.
</UpgradeStatus>

## Birleşim neydi? {#what-is-the-merge}

Birleşim Ethereum'un orijinal yürütüm katmanı ([başlangıç](/history/#frontier) zamanından beri olan Ana Ağ) ile yeni hisse ispatı fikir birliği katmanı olan İşaret Zinciri'nin birleşmesiydi. Yoğun enerji tüketen madenciliğe olan ihtiyacı kaldırdı ve ağın hisselenmiş ETH aracılığıyla güvenli kılınmasına ön ayak oldu. Ethereum vizyonunun gerçekleştirilmesinde gerçekten heyecan verici bir adımdı; daha fazla ölçeklenebilirlik, güvenlik ve sürdürülebilirlik.

<MergeInfographic />

Başlangıçta, [İşaret Zinciri](/roadmap/beacon-chain/) [Ana Ağ'dan](/glossary/#mainnet) farklı olarak yayımlandı. Ethereum Ana Ağı - tüm hesapları, bakiyeleri, akıllı sözleşmeleri ve blok zincir durumu dahil - [iş ispatı](/developers/docs/consensus-mechanisms/pow/) ile güvence altına alınmaya devam ediyordu, İşaret Zinciri, [hisse ispatı](/developers/docs/consensus-mechanisms/pos/) kullanarak paralel olarak çalışırken de dahil olmak üzere. Birleşim bu iki sistemin bir araya geldiği ve hisse ispatının iş kanıtının yerini kalıcı olarak aldığı zamandı.

Ethereum'un yıldızlar arası bir yolculuğa pek hazır olmadan önce fırlatılan bir uzay gemisi olduğunu düşünün. İşaret Zinciri ile topluluk, yeni bir motor ve sertleştirilmiş bir gövde inşa etti. Kayda değer testlerden sonra, uçuş esnasında yeni motoru eski motorla çalışma esnasında değiştirme vakti geldi. Bu yeni ve daha etkili olan motoru mevcut gemiyle birleştirdi ve ciddi miktarda ışık yılı ortaya koyarak evrene meydan okudu.

## Ana Ağ ile birleştirme {#merging-with-mainnet}

İş ispatı Ethereum Ana Ağı'nı başlangıçtan Birleşim'e kadar güvenli kıldı. Bu aşina olduğumuz Ethereum blok zincirinin bilinen özellikleriyle Temmuz 2015'te var olmasını sağladı; işlemler, akıllı sözleşmeler, hesaplar ve benzeri.

Ethereum'un tarihi boyunca geliştiriciler, iş ispatından hisse ispatına nihai bir geçiş için hazırlandılar. 1 Aralık 2020'de, Ana Ağ'dan ayrı bir blok zincir olarak var olan ve paralel olarak çalışan İşaret Zinciri oluşturuldu.

İşaret Zinciri, normalde Ana Ağ işlemlerini işlemiyordu. Bunun yerine, aktif doğrulayıcılar ve hesap bakiyeleri üzerinde anlaşmaya vararak kendi durumu üzerinde fikir birliğine varıyordu. Geniş testler sonrası, İşaret Zinciri'nin gerçek verilere göre fikir birliğine varmasının zamanı geldi. Birleşim sonrası, İşaret Zinciri yürütüm katmanı işlemleri ve hesap bakiyeleri dahil tüm ağ verisi için mutabakat motoru haline geldi.

Birleşim blok üretim motoru olarak İşaret Zinciri'ne resmi geçişi temsil eder. Madencilik artık geçerli bloklar üretmenin yolu değildir. Yerine, hisse ispatı doğrulayıcıları bu rolü almıştır ve artık tüm işlemlerin doğruluğunu işlemekten ve bloklar önermekten sorumludur.

Birleşim'de herhangi bir geçmiş kaybedilmedi. Ana Ağ İşaret Zinciri ile birleşti, ayrıca Ethereum'un tüm işlemsel geçmişini de birleştirdi.

<InfoBanner>
Hisse ispatına geçiş ether basım şeklini değiştirdi. <a href="/roadmap/merge/issuance/">Birleşim'den önce ve sonra ether verilmesi</a> hakkında daha fazla bilgi edinin.
</InfoBanner>

### Kullanıcılar ve sahipler {#users-holders}

**Birleşim, sahipler/kullanıcılar için herhangi bir şey değiştirmedi.**

_Bu tekrar ister_: Ya düğüm yönetmeyen bir kilitleyici olarak ya da Ethereum üzerinde bir ETH veya herhangi diğer bir dijital varlığın sahibi olarak, **Birleşim için fonlarınız, cüzdanınız veya hesabınız için herhangi bir şey yapmanız gerekmez.** ETH sadece ETH'dir. "Eski ETH"/"yeni ETH" veya "ETH1"/"ETH2" diye bir şey yoktur ve cüzdanlar Birleşim'den önce nasıl çalışıyorsa sonrasında da öyle çalışacaktır, size bunun aksini söyleyenler muhtemelen dolandırıcılardır.

İş ispatından ayrılmasına rağmen, Ethereum'un başlangıçtan itibaren tüm geçmişi sabit kalmıştır ve hisse ispatına geçişten etkilenmemiştir. Birleşim'den önce cüzdanınızda bulunan herhangi bir fon Birleşim'den sonra da erişilebilirdir. **Yeni sürüme geçmek için herhangi bir işlem yapmanız gerekmez.**

[Ethereum güvenliği hakkında daha fazlası](/security/#eth2-token-scam)

### Düğüm operatörleri ve dapp geliştiricileri {#node-operators-dapp-developers}

<ExpandableCard
title="Hisseleme düğüm operatörleri ve sağlayıcıları"
contentPreview="If you are a staker running your own node setup or a node infrastructure provider, there are a few things you need to be aware of after The Merge."
id="staking-node-operators">

Anahtar eylem maddeleri şunları içerir:

1. _Hem_ bir fikir birliği istemcisi hem de yürütüm istemcisi çalıştırın; yürütme verisi elde etmek için kullanılan üçüncü şahıs uç noktaları Birleşim'den itibaren çalışmaz.
2. Güvenli bir şekilde iletişim kurabilmeleri için hem yürütme hem de fikir birliği istemcilerinin kimliğini paylaşılan bir JWT sırrıyla doğrulayın.
3. Kazanılmış işlem ücreti/MEV ücretinizini almak için bir "ücret alıcısı" adresi belirleyin.

İlk iki maddeyi tamamlamamak iki katman da eşlenene ve doğrulanana kadar düğümünüzün "çevrimdışı" olarak görülmesine sebep olur.

Bir "ücret alıcısı" ayarlamamak doğrulayıcınızın davranışını etkilemez, ancak doğrulayıcınızın önerdiği bloklarda kazanılan yakılmamış ücretleri ve MEV ücretlerini kaçırırsınız.
</ExpandableCard>

<ExpandableCard
title="Doğrulamasız düğüm operatörleri ve altyapı sağlayıcıları"
contentPreview="If you're operating a non-validating Ethereum node, the most significant change that came with The Merge was the requirement to run clients for BOTH the execution layer AND the consensus layer."
id="node-operators">

Birleşim'e kadar bir yürütüm istemcisi (Geth, Erigon, Besu veya Nethermind gibi) ağdan anlatılan blokları almak, düzgünce doğrulamak ve yaymak için yeterliydi. _Birleşim sonrası_, bir yürütme yükü içinde bulunan işlemlerin geçerliliği artık ayrıca bulunduğu "mutabakat blokunun" geçerliliğine bağlı olacaktır.

Bunun bir sonucu olarak, bir Ethereum düğümü artık hem bir yürütüm istemcisi hem de fikir birliği istemcisi gerektirir. Bu iki müşteri, yeni bir Motor API'sı kullanarak birlikte çalışır. Motor API'sı, her iki müşteriye de sağlanan ve güvenli iletişime izin veren bir JWT sırrı kullanılarak kimlik doğrulaması gerektirir.

Anahtar eylem maddeleri şunları içerir:

- Yürütüm istemcisine ek olarak bir fikir birliği istemcisinin kurulumunu yapma
- Birbirleriyle güvenli bir biçimde iletişime geçebilmeleri için yürütüm ve fikir birliği istemcilerini paylaşımlı bir JWT sırrı ile doğrulama.

Yukarıdaki maddeleri tamamlamamak iki katman da eşlenene ve doğrulanana kadar düğümünüzün "çevrim dışı" olarak görülmesine sebep olur.

</ExpandableCard>

<ExpandableCard
title="Dapp ve akıllı sözleşme geliştiricileri"
contentPreview="The Merge was designed to have minimal impact on smart contract and dapp developers."
id="developers">

Birleşim, mutabakata değişikliklerle beraber geldi, bu değişiklikler şunlarla ilişkili olanları da içerir:<

<ul>
  <li>blok yapısı</li>
  <li>yuva/blok zamanlaması</li>
  <li>işlem kodu değişiklikleri</li>
  <li>zincir üstündeki rastgeleliğin kaynakları</li>
  <li><em>güvenli baş</em> ve <em>kesinleştirilmiş bloklar</em> konsepti</li>
</ul>

Daha fazla bilgi için, Tim Beiko tarafından yazılmış <a href="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer/">Birleşim Ethereum'un Uygulama Katmanını Nasıl Etkiler</a> üzerine blog gönderisine bakın.

</ExpandableCard>

## Birleşim ve enerji tüketimi {#merge-and-energy}

Birleşim, Ethereum için iş ispatının sonunu getirdi ve daha sürdürülebilir, doğa dostu bir Ethereum çağının başlangıcı oldu. Ethereum'un enerji tüketimi %99,95 düştü ve Ethereum çevre dostu bir blok zincir haline geldi. [Ethereum enerji tüketimi](/energy-consumption/) hakkında daha fazla bilgi edinin.

## Birleşim ve ölçeklendirme {#merge-and-scaling}

Birleşim aynı zamanda, iş ispatı altında mümkün olmayan daha fazla ölçeklenebilirlik yükseltmeleri için zemin hazırlayacak ve Ethereum'u [Ethereum vizyonunda](/roadmap/vision/) belirtilen tam ölçek, güvenlik ve sürdürülebilirliğe bir adım daha yaklaştıracak.

## Birleşim hakkında yanlış bilinenler {#misconceptions}

<ExpandableCard
title="Yanılgı: &quot;Bir düğüm çalıştırmak 32 ETH gerektirir.&quot;"
contentPreview="False. Anyone is free to sync their own self-verified copy of Ethereum (i.e. run a node). No ETH is required—not before The Merge, not after The Merge, not ever.">

İki tip Ethereum düğümü bulunur: Blok önerebilen ve öneremeyen düğümler.

Blok önerebilen düğümler Ethereum üzerindeki toplam düğüm sayısının küçük bir kısmıdır. Bu kategori, iş ispatı (PoW) altındaki madencilik düğümleri ile hisse ispatı (PoS) altındaki doğrulayıcı düğümleri kapsar. Bu kategori ekonomik kaynakların (iş ipatındaki GPU karma gücü ya da hisse ispatında hisselenmiş ETH gibi), yeni bloku kimi zaman önerme ve protokol ödülleri kazanma yetenekleri karşılığında buraya adanmasını gerektirir.

Ağdaki diğer düğümler (yani çoğunluğu)1-2 TB'lik depolama alanı ve internet bağlantısı olan tüketici seviyesindeki bir bilgisarın ötesinde bir ekonomik kaynağa ihtiyaç duymaz. Bu düğümler blok önermezler, ancak yine de yeni bloklardan haberdar olarak ve blokların geçerliliğini ağ mutabakat kurallarına göre onaylayarak blok önericilerini açıklanabilir tutarlar ve ağı güvende tutmada önemli bir rol oynarlar. Eğer blok geçerliyse, düğüm ağ içinde yayılmaya devam eder. Eğer blok herhangi bir sebepten dolayı geçersizse, düğüm yazılımı geçersiz olduğu için bloku umursamayacak ve yayılmasını durduracaktır.

Blok üretimi yapmayan bir düğümü çalıştırmak da mutabakat mekanizması (iş ispatı ya da hisse ispatı) altındaki herkes için yapılabilirdir ve bu konuda imkân ve niyetleri varsa <em>şiddetle</em> tavsiye edilir. Bir düğümü çalıştırmak Ethereum için son derece önemlidir ve çalıştıran bireye gelişmiş güvenlik, gizlilik ve sansüre dayanıklılık gibi birçok avantaj sağlar.

Herhangi bir kişinin kendi düğümünü çalıştırabilmesi Ethereum ağının merkeziyestizliğinin korunması konusu için <em>kesinlikle gereklidir</em>.

<a href="/run-a-node/">Kendi kodunuzu çalıştırmanızla ilgili daha fazlası</a>

</ExpandableCard>

<ExpandableCard
title="Yanılgı: &quot;Birleşim gaz ücretini düşürememiştir.&quot;"
contentPreview="False. The Merge was a change of consensus mechanism, not an expansion of network capacity, and was never intended to lower gas fees.">

Gaz ücretleri ağın kapasitesine bağlı olan bir ağ talebidir. Birleşim iş ispatı modasını bitirip onun yerine mutabakat için hisse ispatını getirdi, ancak hiçbir parametreyi ciddi şekilde değiştirmedi ya da ağ kapasitesini ve iş hacmini etkilemedi.

Toplama merkezli bir <a href="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">yol haritasıyla</a>, K2'deki <a href="/layer-2/">Katman 2</a>deki kullanıcı aktivitesini ölçeklendirmeye odaklanılırken, Katman 1 Ana Ağı'nı toplama işlemlerinin kat kat ucuz olmasına yardım eden bir optimize edilmiş veri deposu ve güvenli merkeziyesiz bir uzlaşma katmanı olmasını sağlıyor. Hisse ispatına geçiş bunu fark etmede öncü rol oynuyor. <a href="/developers/docs/gas/">Gaz ve ücretler hakkında daha fazlası</a>

</ExpandableCard>

<ExpandableCard
title="Yanılgı: &quot;İşlemler Birleşim ile oldukça hızlanmıştır.&quot;"
contentPreview="False. Though some slight changes exist, transaction speed is mostly the same on layer 1 now as it was before The Merge.">
Bir işlemin "hızı", bloka dahil edilme ve sonuçlandırma süresini de kapsayan birkaç farklı yolla ölçülebilir. Bunların ikisi de biraz farklıdır, ancak kullanıcıların fark edeceği bir şekilde değil.

Tarihi olarak, iş ispatı döneminde, hedef her ~13,3 saniyede yeni bir bloka sahip olmaktı. Hisse ispatında ise yuvalar kesin olarak her 12 saniyede bir ortaya çıkar, hepsi doğrulayıcının bir blok yayınlaması için bir fırsattır. Yuvaların çoğunun blokları vardır, ancak hepsinin olması gerekmez (doğrulayıcı çevrimdışı olabilir). Hisse ispatında, bloklar iş ispatına göre ~%10 daha sık üretilir. Bu epey önemsiz bir değişiklikti ve muhtemelen kullanıcılar tarafından fark edilmeyecekti.

Hisse ispatı daha önce var olmayan işlem kesinliiğii konseptini tanıttı. İş ispatında, bir bloku ters çevirebilmekmek her geçen blokun işlemin en tepesine çıkarılmış olmasıyla katlanarak zorlaşıyordu, ancak hiçbir zaman da 0'a ulaşmıyordu. Hisse ispatında, bloklar doğrulayıcının oyladıkları dönemlere ayrılmıştır (bloklar için 32 şans içeren 6,4 saniyelik zaman açıklıkları). Bir dönem sonlandığında doğrulayıcılar dönemin "makul" olarak değerlendirilmesi konusunda oylama yapar. Eğer doğrulayıcılar dönemin makul olduğunda fikir birliğine varırlarsa o, bir sonraki dönemde sonuçlandırılır. Kesinleşmiş işlemleri geri çevirmek ekonomik olarak yaşamaz çünkü bu toplam pay edilmiş Ethereum'un üçte birini yakmak demekti.

</ExpandableCard>

<ExpandableCard
title="Yanılgı: &quot;Birleşim hisselenmiş parayı çekmeyi mümkün kılmıştır.&quot;"
contentPreview="False, but staking withdrawals have since been enabled via the Shanghai/Capella upgrade.">

Birleşim'den sonraki ilk zamanlarda, paydaşlar sadece masraf tüyolarına ve blok önerileriyle kazandıkları MEV'lere erişebiliyorlardı. Bu ödüller doğrulayıcı (<em>ücret alıcı</em> olarak da bilinir) tarafından kontrol edilen ve hisseleme yapmayan hesaplara yatırılır ve anında ulaşılabilir olurlar. Bu ödüller doğrulayıcı görevlerini yapmak için verilen protokol ödüllerinden farklıdır.

Shangai/Capella ağ yükseltmesinden bu yana, paydaşlar herhangi bir hisse bakiyesinden artan ödemeleri alabilmek için (protokol ödüllerinden gelen 32'den fazla Ethereum) artık bir <em>para çekme adresi</em> belirleyebiliyor. Bu yükseltme aynı zamanda bir doğrulayıcının ağdan çıktıktan sonra da bakiyelerinin kilitlerini açabilmesini ve tekrar alabilmesini sağladı.

<a href="/staking/withdrawals/">Hisseleme çekimleri hakkında daha fazlası</a>

</ExpandableCard>

<ExpandableCard
title="Yanılgı: &quot;Birleşim tamamlandığı için, para çekmeye izin verilir ve paydaşlar bir anda çıkabilir.&quot;"
contentPreview="False. Validator exits are rate limited for security reasons.">
Shanghai/Capella yükseltmesi çekimleri yapılabilir hale getirdiğinden beri, doğrulayıcılar da 32 Ethereum'dan yüksek olan hisse bakiyelerini çekmeye teşvik edildiler, zaten bunlar getiriye eklenmiyordu ve eğer aksi bir durum varsa da kilitleniyordu. APR'ye (toplam hisselenen ETH tarafından belirlenir) bağlı olarak, tüm bakiyelerini geri almak için doğrulayıcılarından çıkmaya veya daha fazla getiri elde etmek için ödüllerini kullanarak potansiyel olarak daha fazla hisselemeye teşvik edilebilirler.

Önemli bir uyarı, tam doğrulayıcı çıkışlarının hızı protokol tarafından sınırlandırılmıştır ve bir dönem (6,4 dakika) başına sadece izin verilen sayıda doğrulayıcı çıkabilir. Bu limit dalgalanmaları aktif doğrulayıcı sayısına bağlıdır, ancak bir günde toplam hisselenmiş Ethereum'un yaklaşık olarak %0,33'ünün ağdan çıkarılabilmesiyle sonuçlanır.

Bu hisselenmiş kaynaklar için büyük bir hareketi, "sermaye kaçışı"nı engeller. Ayrıca, hisselenen ETH'nin büyük bir kısmına erişimi olan potansiyel saldırganlar, protokolün kesilme cezasını uygulayabilmesinden önce, tehdit ettiği tüm doğrulayıcı bakiyelerinden çekilmesi engellenir.

APR ayrıca kasten dinamik yapılmıştır, bu da bir grup paydaşın ağı güvende tutmaya yardımcı olmak için ne kadar ödeme almak istediklerini belirlemelerine olanak verir. Eğer oran çok düşükse, doğrulayıcılar protokol tarafından kısıtlanmış bir oranda çıkacaklardır. Yavaş yavaş bu, kalan herkes için APR'yi artıracak, yeni veya geri dönen paydaşları tekrar çekecektir.
</ExpandableCard>

## "Eth2"ye ne oldu? {#eth2}

"Eth2" terimi artık kullanım dışı. "Eth1" ve "Eth2"nin tek bir zincirde birleşiminin ardından 2 Ethereum ağının ayırt edilmesine gerek kalmayacak, artık yalnızca bir Ethereum var.

Karışıklığı önlemek için topluluk şu şartları güncelledi:

- "Eth1" artık, işlemleri ve çalışmayı yapan "çalıştırma katmanı"dır.
- "Eth2" artık, hisse ispatı mutabakatını yöneten "mutabakat katmanı"dır.

Bu terminoloji güncellemeleri yalnızca adlandırma alışkanlıklarını değiştirir; bu, Ethereum'un hedeflerini veya yol haritasını değiştirmez.

["Eth2" ad değişimi hakkında daha fazla bilgi edinin](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/)

## Yükseltmeler arasındaki ilişki {#relationship-between-upgrades}

Ethereum yükseltmelerinin tamamı bir şekilde ilişkilidir. Öyleyse Birleşim'in diğer yükseltmelerle nasıl ilişkili olduğunu özetleyelim.

### Birleşim ve İşaret Zinciri {#merge-and-beacon-chain}

Birleşim, yeni fikir birliği katmanı olarak İşaret Zinciri'nin asıl Ana Ağ yürütüm katmanına resmi olarak eklenmesini temsil eder. Birleşim'den beri doğrulayıcılar, Ethereum Ana Ağı'nı güvence altına almakla görevlendirildiler ve [iş ispatı](/developers/docs/consensus-mechanisms/pow/) artık geçerli bir blok üretimi anlamına gelmiyor.

Bloklar, mutabakata katılma hakkı karşılığında hisselenmiş ETH sahibi doğrulayan düğümler tarafından önerilmektedir. Bu yükseltmeler, parçalama da dahil olmak üzere gelecekteki ölçeklenebilirlik yükseltmeleri için zemin hazırlar.

<ButtonLink href="/roadmap/beacon-chain/">
  İşaret Zinciri
</ButtonLink>

### Birleşim ve Shanghai yükseltmesi {#merge-and-shanghai}

Hisse ispatına başarıyla geçişe en yüksek düzeyde odaklanma ve bunu basitleştirmek için Birleşim yükseltmesi, hisselenmiş ETH'nin çekilme yeteneği gibi beklenen özellikleri içermemektedir. Bu işlevsellik Shanghai/Capella yükseltmesi ile ayrıca mümkün kılınmıştır.

Merak edenler için, 2021 yılının Nisan ayında ETHGlobal etkinliğinde Vitalik tarafından sunulan [Birleşimden Sonra Ne Olacağı](https://youtu.be/7ggwLccuN5s?t=101) hakkında daha fazla bilgi edinin.

### Birleşim ve parçalama {#merge-and-data-sharding}

Başlangıçta plan, ölçeklenebilirliği ele almak için Birleşim'den önce parçalama üzerinde çalışmaktı. Buna rağmen [katman 2 ölçeklendirme çözümlerinin](/layer-2/) patlaması ile, öncelik ilk olarak iş isparını hisse ispatı ile değiştirmeye kaymıştır.

Parçalama planları hızla gelişiyor, ancak işlem yürütmeyi ölçeklendirmek için katman 2 teknolojilerinin yükselişi ve başarısı göz önüne alındığında, parçalama planları, toplama sözleşmelerinden sıkıştırılmış çağrı verilerini depolamanın yükünü dağıtmak için en uygun yolu bulmaya kaydı ve ağ kapasitesinde katlanarak büyümeye izin verdi. Bu, ilk olarak hisse ispatına geçmeden mümkün olmazdı.

<ButtonLink href="/roadmap/danksharding/">
  Parçalama
</ButtonLink>

## Daha fazla okuma {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />
