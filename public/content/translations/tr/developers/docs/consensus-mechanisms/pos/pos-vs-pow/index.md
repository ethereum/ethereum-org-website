---
title: Hisse Kanıtı (PoS) ve İş Kanıtı (PoW)
description: Ethereum'un Hisse Kanıtı ve İş Kanıtı tabanlı mutabakat mekanizmalarının bir karşılaştırması
lang: tr
---

[Ethereum](/) piyasaya sürüldüğünde, Hisse Kanıtı'nın (PoS) Ethereum'u güvence altına alması için güvenilmeden önce hâlâ çok fazla araştırma ve geliştirmeye ihtiyacı vardı. İş Kanıtı (PoW), Bitcoin tarafından zaten kanıtlanmış daha basit bir mekanizmaydı, bu da çekirdek geliştiricilerin Ethereum'u başlatmak için onu hemen uygulayabileceği anlamına geliyordu. Hisse Kanıtı'nı uygulanabilecek noktaya getirmek sekiz yıl daha sürdü.

Bu sayfa, Ethereum'un İş Kanıtı'ndan Hisse Kanıtı'na geçişinin ardındaki mantığı ve içerdiği ödünleşimleri açıklamaktadır.

## Güvenlik {#security}

Ethereum araştırmacıları, Hisse Kanıtı'nı İş Kanıtı'ndan daha güvenli bulmaktadır. Ancak, gerçek Ethereum Ana Ağı için henüz yakın zamanda uygulanmıştır ve İş Kanıtı'na kıyasla zaman içinde daha az kanıtlanmıştır. Aşağıdaki bölümler, Hisse Kanıtı'nın güvenlik modelinin İş Kanıtı'na kıyasla artılarını ve eksilerini tartışmaktadır.

### Saldırı maliyeti {#cost-to-attack}

Hisse Kanıtı'nda, doğrulayıcıların bir akıllı sözleşmeye en az 32 ETH emanet etmesi ("stake etmesi") gerekir. Ethereum, hatalı davranan doğrulayıcıları cezalandırmak için stake edilen Ether'i yok edebilir. Mutabakata varmak için, toplam stake edilen Ether'in en az %66'sının belirli bir blok kümesi lehine oy vermesi gerekir. Stake'in %66 veya daha fazlası tarafından oy alan bloklar "kesinleşmiş" hale gelir, yani kaldırılamaz veya yeniden düzenlenemezler.

Ağa saldırmak, zincirin kesinleşmesini engellemek veya kurallı (canonical) zincirde bir şekilde saldırgana fayda sağlayan belirli bir blok düzenlemesini sağlamak anlamına gelebilir. Bu, saldırganın büyük miktarda Ether biriktirip doğrudan onunla oy vererek veya dürüst doğrulayıcıları belirli bir şekilde oy vermeleri için kandırarak dürüst mutabakatın yolunu saptırmasını gerektirir. Dürüst doğrulayıcıları kandıran karmaşık, düşük olasılıklı saldırılar bir yana, Ethereum'a saldırmanın maliyeti, bir saldırganın mutabakatı kendi lehine etkilemek için biriktirmesi gereken stake maliyetidir.

En düşük saldırı maliyeti, toplam stake'in %33'ünden fazlasıdır. Toplam stake'in %33'ünden fazlasını elinde bulunduran bir saldırgan, sadece çevrimdışı kalarak bir kesinlik gecikmesine neden olabilir. Çevrimiçi çoğunluk stake'in %66'sını temsil edene ve zinciri tekrar kesinleştirebilene kadar çevrimdışı doğrulayıcılardan stake sızdıran "hareketsizlik sızıntısı" olarak bilinen bir mekanizma olduğu için bu, ağ için nispeten küçük bir sorundur. Ayrıca, bir saldırganın blok üreticisi olması istendiğinde bir yerine iki blok oluşturarak ve ardından tüm doğrulayıcılarıyla çifte oy vererek toplam stake'in %33'ünden biraz fazlasıyla çifte kesinliğe neden olması teorik olarak mümkündür. Her bir çatallanma, kalan dürüst doğrulayıcıların yalnızca %50'sinin her bloğu ilk önce görmesini gerektirir, bu nedenle mesajlarını tam olarak doğru zamanlamayı başarırlarsa, her iki çatallanmayı da kesinleştirebilirler. Bunun başarı olasılığı düşüktür, ancak bir saldırgan çifte kesinliğe neden olabilseydi, Ethereum topluluğu bir çatallanmayı takip etmeye karar vermek zorunda kalırdı, bu durumda saldırganın doğrulayıcıları diğerinde zorunlu olarak ceza kesintisine uğrardı.

Toplam stake'in %33'ünden fazlasıyla, bir saldırganın Ethereum ağı üzerinde küçük (kesinlik gecikmesi) veya daha ciddi (çifte kesinlik) bir etki yaratma şansı vardır. Ağda stake edilen 14.000.000'dan fazla ETH ve 1000$/ETH'lik temsili bir fiyatla, bu saldırıları gerçekleştirmenin minimum maliyeti `1000 x 14,000,000 x 0.33 = $4,620,000,000`'dir. Saldırgan bu parayı ceza kesintisi yoluyla kaybeder ve ağdan atılır. Tekrar saldırmak için, stake'in %33'ünden fazlasını (tekrar) biriktirmeleri ve (tekrar) yakmaları gerekir. Ağa saldırmaya yönelik her girişim 4,6 milyar dolardan fazlaya mal olacaktır (1000$/ETH ve 14 milyon ETH stake edildiğinde). Saldırgan ayrıca ceza kesintisine uğradığında ağdan atılır ve yeniden katılmak için bir etkinleştirme kuyruğuna girmesi gerekir. Bu, tekrarlanan bir saldırı oranının yalnızca saldırganın toplam stake'in %33'ünden fazlasını biriktirebileceği oranla değil, aynı zamanda tüm doğrulayıcılarını ağa dahil etmesi için geçen süreyle de sınırlı olduğu anlamına gelir. Saldırgan her saldırdığında çok daha fakirleşir ve ortaya çıkan arz şoku sayesinde topluluğun geri kalanı daha da zenginleşir.

%51 saldırıları veya toplam stake'in %66'sı ile kesinliğin geri alınması gibi diğer saldırılar, önemli ölçüde daha fazla ETH gerektirir ve saldırgan için çok daha maliyetlidir.

Bunu İş Kanıtı ile karşılaştırın. İş Kanıtı Ethereum'una bir saldırı başlatmanın maliyeti, toplam ağ hash oranının %50'sinden fazlasına sürekli olarak sahip olmanın maliyetiydi. Bu, İş Kanıtı çözümlerini tutarlı bir şekilde hesaplamak için diğer madencileri geride bırakacak yeterli bilgi işlem gücünün donanım ve işletme maliyetlerine eşitti. Ethereum çoğunlukla ASIC'ler yerine GPU'lar kullanılarak kazılıyordu, bu da maliyeti düşük tutuyordu (gerçi Ethereum İş Kanıtı'nda kalsaydı, ASIC madenciliği daha popüler hale gelebilirdi). Bir düşmanın, bir İş Kanıtı Ethereum ağına saldırmak için çok fazla donanım satın alması ve onu çalıştırmak için elektriği ödemesi gerekirdi, ancak toplam maliyet, bir saldırı başlatmak için yeterli ETH biriktirmek için gereken maliyetten daha az olurdu. Bir %51 saldırısı, İş Kanıtı'nda Hisse Kanıtı'na göre ~[20 kat daha az](https://youtu.be/1m12zgJ42dI?t=1562) maliyetlidir. Saldırı tespit edilirse ve değişikliklerini kaldırmak için zincir sert çatallanmaya uğrarsa, saldırgan yeni çatallanmaya saldırmak için aynı donanımı tekrar tekrar kullanabilirdi.

### Karmaşıklık {#complexity}

Hisse Kanıtı, İş Kanıtı'ndan çok daha karmaşıktır. Daha basit protokollere yanlışlıkla hatalar veya istenmeyen etkiler sokmak daha zor olduğundan, bu İş Kanıtı lehine bir nokta olabilir. Ancak karmaşıklık, yıllarca süren araştırma ve geliştirme, simülasyonlar ve test ağı uygulamalarıyla ehlileştirilmiştir. Hisse Kanıtı protokolü, beş ayrı ekip tarafından (yürütme ve mutabakat katmanlarının her birinde) beş programlama dilinde bağımsız olarak uygulanmış ve istemci hatalarına karşı dayanıklılık sağlamıştır.

Hisse Kanıtı mutabakat mantığını güvenli bir şekilde geliştirmek ve test etmek için İşaret zinciri, Hisse Kanıtı Ethereum Ana Ağı'nda uygulanmadan iki yıl önce başlatıldı. İşaret zinciri, Hisse Kanıtı mutabakat mantığını uygulayan ancak gerçek Ethereum işlemlerine dokunmayan canlı bir blokzincir olduğu için Hisse Kanıtı testi için bir korumalı alan (sandbox) görevi gördü - etkili bir şekilde sadece kendi üzerinde mutabakata varıyordu. Bu, yeterli bir süre boyunca istikrarlı ve hatasız olduktan sonra, İşaret zinciri Ethereum Ana Ağı ile "birleştirildi". Tüm bunlar, Hisse Kanıtı'nın karmaşıklığını, istenmeyen sonuçlar veya istemci hataları riskinin çok düşük olduğu bir noktaya kadar ehlileştirmeye katkıda bulundu.

### Saldırı yüzeyi {#attack-surface}

Hisse Kanıtı, İş Kanıtı'ndan daha karmaşıktır, bu da ele alınması gereken daha fazla potansiyel saldırı vektörü olduğu anlamına gelir. İstemcileri birbirine bağlayan tek bir eşler arası ağ yerine, her biri ayrı bir protokol uygulayan iki ağ vardır. Her slotta bir blok önermek için önceden seçilmiş belirli bir doğrulayıcıya sahip olmak, büyük miktarda ağ trafiğinin o belirli doğrulayıcıyı çevrimdışı bıraktığı hizmet reddi potansiyeli yaratır.

Saldırganların bloklarının veya onaylamalarının yayınlanmasını dikkatlice zamanlayarak dürüst ağın belirli bir oranı tarafından alınmasını sağlayabilecekleri ve onları belirli şekillerde oy vermeye etkileyebilecekleri yollar da vardır. Son olarak, bir saldırgan stake etmek ve mutabakat mekanizmasına hükmetmek için yeterli ETH biriktirebilir. Bu [saldırı vektörlerinin her birinin ilişkili savunmaları vardır](/developers/docs/consensus-mechanisms/pos/attack-and-defense), ancak bunlar İş Kanıtı altında savunulmak üzere mevcut değildir.

## Merkeziyetsizlik {#decentralization}

Hisse Kanıtı, İş Kanıtı'ndan daha merkeziyetsizdir çünkü madencilik donanımı silahlanma yarışları, bireyleri ve küçük kuruluşları piyasa dışına itme eğilimindedir. Teknik olarak herkes mütevazı bir donanımla madenciliğe başlayabilse de, kurumsal madencilik operasyonlarına kıyasla herhangi bir ödül alma olasılıkları yok denecek kadar azdır. Hisse Kanıtı ile staking maliyeti ve bu stake'in yüzde getirisi herkes için aynıdır. Şu anda bir doğrulayıcı çalıştırmanın maliyeti 32 ETH'dir.

Öte yandan, likit staking türevlerinin icadı, birkaç büyük sağlayıcının büyük miktarlarda stake edilmiş ETH'yi yönetmesi nedeniyle merkezileşme endişelerine yol açmıştır. Bu sorunludur ve mümkün olan en kısa sürede düzeltilmesi gerekir, ancak aynı zamanda göründüğünden daha nüanslıdır. Merkezi staking sağlayıcıları, doğrulayıcılar üzerinde mutlaka merkezi bir kontrole sahip değildir - genellikle bu, her katılımcının kendi 32 ETH'sine ihtiyaç duymadan birçok bağımsız düğüm operatörünün stake edebileceği merkezi bir ETH havuzu oluşturmanın bir yoludur.

Ethereum için en iyi seçenek, doğrulayıcıların ev bilgisayarlarında yerel olarak çalıştırılması ve merkeziyetsizliğin en üst düzeye çıkarılmasıdır. Bu nedenle Ethereum, bir düğüm/doğrulayıcı çalıştırmak için donanım gereksinimlerini artıran değişikliklere direnir.

## Sürdürülebilirlik {#sustainability}

Hisse Kanıtı, blokzinciri güvence altına almanın karbon açısından ucuz bir yoludur. İş Kanıtı altında madenciler bir blok kazma hakkı için rekabet ederler. Madenciler hesaplamaları daha hızlı yapabildiklerinde daha başarılı olurlar, bu da donanıma ve enerji tüketimine yatırımı teşvik eder. Bu, Hisse Kanıtı'na geçmeden önce Ethereum için gözlemlenmişti. Hisse Kanıtı'na geçişten kısa bir süre önce Ethereum, küçük bir ülke kadar, yılda yaklaşık 78 TWh tüketiyordu. Ancak Hisse Kanıtı'na geçiş, bu enerji harcamasını ~%99,98 oranında azalttı. Hisse Kanıtı, Ethereum'u enerji açısından verimli, düşük karbonlu bir platform haline getirdi.

[Ethereum'un enerji tüketimi hakkında daha fazlası](/energy-consumption)

## İhraç {#issuance}

Hisse Kanıtı Ethereum'u, doğrulayıcıların yüksek elektrik maliyetleri ödemesi gerekmediğinden, İş Kanıtı Ethereum'undan çok daha az coin ihraç ederek güvenliğinin bedelini ödeyebilir. Sonuç olarak, ETH enflasyonunu azaltabilir veya büyük miktarlarda ETH yakıldığında deflasyonist bile olabilir. Daha düşük enflasyon seviyeleri, Ethereum'un güvenliğinin İş Kanıtı altında olduğundan daha ucuz olduğu anlamına gelir.

## Görsel öğrenmeyi mi tercih ediyorsunuz? {#visual-learner}


<VideoWatch slug="pow-vs-pos" />

## Daha fazla bilgi {#further-reading}

- [Vitalik'in Hisse Kanıtı tasarım felsefesi](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [Vitalik'in Hisse Kanıtı SSS'leri](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)
- [PoS ve PoW hakkında "Basitçe Açıklanmış" video](https://www.youtube.com/watch?v=M3EFi_POhps)