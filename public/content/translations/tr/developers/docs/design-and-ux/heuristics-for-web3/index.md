---
title: Web3 arayüz tasarımı için 7 buluşsal yöntem
description: Web3'ün kullanılabilirliğini artırmaya yönelik ilkeler
lang: tr
---

Kullanılabilirlik buluşsal yöntemleri, sitenizin kullanılabilirliğini ölçmek için kullanabileceğiniz genel "pratik kurallar"dır.
Buradaki 7 buluşsal yöntem Web3 için özel olarak uyarlanmıştır ve Jakob Nielsen'in [etkileşim tasarımı için 10 genel ilkesi](https://www.nngroup.com/articles/ten-usability-heuristics/) ile birlikte kullanılmalıdır.

## Web3 için yedi kullanılabilirlik buluşsal yöntemi {#seven-usability-heuristics-for-web3}

1. Geri bildirim eylemi takip eder
2. Güvenlik ve güven
3. En önemli bilgi belirgindir
4. Anlaşılır terminoloji
5. Eylemler olabildiğince kısadır
6. Ağ bağlantıları görünür ve esnektir
7. Kontrol cüzdandan değil, uygulamadandır


## Tanımlar ve örnekler {#definitions-and-examples}

### 1. Geri bildirim eylemi takip eder {#feedback-follows-action}

**Bir şeyin olduğu veya olmakta olduğu açık olmalıdır.**

Kullanıcılar, önceki adımlarının sonucuna göre sonraki adımlarına karar verirler. Bu nedenle, sistem durumu hakkında bilgilendirilmeye devam etmeleri çok önemlidir. İşlemlerin Blokzincir'e kaydedilmesi bazen kısa bir süre alabildiğinden, bu durum Web3'te özellikle önemlidir. Beklemeleri gerektiğini bildiren bir geri bildirim yoksa, kullanıcılar herhangi bir şey olup olmadığından emin olamazlar.

**İpuçları:** 
- Kullanıcıyı mesajlaşma, bildirimler ve diğer uyarılar aracılığıyla bilgilendirin.
- Bekleme sürelerini açıkça iletin.
- Bir eylem birkaç saniyeden uzun sürecekse, bir şeylerin gerçekleştiğini hissettirmek için bir zamanlayıcı veya animasyonla kullanıcıya güven verin.
- Bir sürecin birden fazla adımı varsa, her adımı gösterin.

**Örnek:**
Bir işlemdeki her adımı göstermek, kullanıcıların süreçte nerede olduklarını bilmelerine yardımcı olur. Uygun simgeler, kullanıcının eylemlerinin durumunu bilmesini sağlar.

![Informing the user about each step when swapping tokens](./Image1.png)

### 2. Güvenlik ve güven yerleşiktir {#security-and-trust-are-backed-in}

Güvenliğe öncelik verilmeli ve bu durum kullanıcı için vurgulanmalıdır. 
İnsanlar verilerine çok önem verir. Güvenlik genellikle kullanıcılar için birincil endişe kaynağıdır, bu nedenle tasarımın her seviyesinde dikkate alınmalıdır. Her zaman kullanıcılarınızın güvenini kazanmaya çalışmalısınız, ancak bunu yapma şekliniz farklı uygulamalarda farklı anlamlara gelebilir. Bu sonradan düşünülen bir şey olmamalı, baştan sona bilinçli bir şekilde tasarlanmalıdır. Nihai kullanıcı arayüzünün yanı sıra sosyal kanallar ve belgeler de dahil olmak üzere kullanıcı deneyimi boyunca güven inşa edin. Merkeziyetsizlik düzeyi, hazine çoklu imza (multi-sig) durumu ve ekibin kimliklerinin açık (doxxed) olup olmadığı gibi unsurların tümü kullanıcıların güvenini etkiler.

**İpuçları:**
- Denetimlerinizi gururla listeleyin
- Birden fazla denetim alın
- Tasarladığınız tüm güvenlik özelliklerini tanıtın
- Temel entegrasyonlar da dahil olmak üzere olası riskleri vurgulayın
- Stratejilerin karmaşıklığını iletin
- Kullanıcılarınızın güvenlik algısını etkileyebilecek kullanıcı arayüzü dışı sorunları göz önünde bulundurun

**Örnek:** 
Denetimlerinizi alt bilgide (footer) belirgin bir boyutta ekleyin.

![Audits referenced in the website footer](./Image2.png)

### 3. En önemli bilgi belirgindir {#the-most-important-info-is-obvious}

Karmaşık sistemler için yalnızca en alakalı verileri gösterin. Neyin en önemli olduğunu belirleyin ve görüntülenmesine öncelik verin. 
Çok fazla bilgi bunaltıcıdır ve kullanıcılar karar verirken genellikle tek bir bilgiye odaklanırlar. Merkeziyetsiz finansta (DeFi), bu muhtemelen getiri uygulamalarında APR ve borç verme uygulamalarında LTV olacaktır.

**İpuçları:**
- Kullanıcı araştırması en önemli metriği ortaya çıkaracaktır
- Temel bilgileri büyük, diğer ayrıntıları ise küçük ve göze batmayacak şekilde yapın
- İnsanlar okumaz, göz gezdirir; tasarımınızın göz gezdirilebilir olduğundan emin olun

**Örnek:** Tam renkli büyük Token'ları göz gezdirirken bulmak kolaydır. APR büyüktür ve vurgu rengiyle öne çıkarılmıştır.

![The token and APR are easy to find](./Image3.png)

### 4. Net terminoloji {#clear-terminology}

Terminoloji anlaşılır ve uygun olmalıdır.
Teknik jargon büyük bir engel olabilir, çünkü tamamen yeni bir zihinsel modelin inşasını gerektirir. Kullanıcılar tasarımı zaten bildikleri kelimeler, ifadeler ve kavramlarla ilişkilendiremezler. Her şey kafa karıştırıcı ve yabancı görünür ve kullanmaya bile teşebbüs etmeden önce dik bir öğrenme eğrisi vardır. Bir kullanıcı biraz para biriktirmek isteyerek merkeziyetsiz finansa (DeFi) yaklaşabilir ve bulduğu şey şudur: Madencilik, farming, staking, emisyonlar, rüşvetler (bribes), kasalar (vaults), kilitler (lockers), veToken'lar, hak ediş, dönemler (epochs), merkeziyetsiz algoritmalar, protokole ait likidite...
En geniş insan grubu tarafından anlaşılabilecek basit terimler kullanmaya çalışın. Sadece projeniz için yepyeni terimler icat etmeyin.

**İpuçları:**
- Basit ve tutarlı bir terminoloji kullanın
- Mümkün olduğunca mevcut dili kullanın
- Kendi terimlerinizi uydurmayın
- Ortaya çıktıkça gelenekleri takip edin
- Kullanıcıları mümkün olduğunca eğitin

**Örnek:**
"Ödülleriniz" geniş çapta anlaşılan, tarafsız bir terimdir; bu proje için uydurulmuş yeni bir kelime değildir. Ödüllerin kendisi başka bir Token cinsinden olsa bile, ödüller gerçek dünyadaki zihinsel modellerle eşleşmesi için USD cinsinden ifade edilir.

![Token rewards, displayed in U.S. dollars](./Image4.png)

### 5. Eylemler olabildiğince kısadır {#actions-are-as-short-as-possible}

Alt eylemleri gruplayarak kullanıcının etkileşimlerini hızlandırın. 
Bu, kullanıcı arayüzünün yanı sıra akıllı sözleşme düzeyinde de yapılabilir. Kullanıcı, yaygın bir işlemi tamamlamak için sistemin bir bölümünden diğerine geçmek veya sistemden tamamen ayrılmak zorunda kalmamalıdır. 

**İpuçları:**
- Mümkün olan yerlerde "Onayla" eylemini diğer eylemlerle birleştirin
- İmzalama adımlarını mümkün olduğunca birbirine yakın paketleyin

**Örnek:** "Likidite ekle" ve "stake" işlemlerini birleştirmek, kullanıcıya hem zaman hem de Gaz tasarrufu sağlayan bir hızlandırıcının basit bir örneğidir.

![Modal showing a switch to combine the deposit and stake actions](./Image5.png)

### 6. Ağ bağlantıları görünür ve esnektir {#network-connections-are-visible-and-flexible}

Kullanıcıyı hangi ağa bağlı olduğu konusunda bilgilendirin ve ağı değiştirmek için net kısayollar sağlayın. 
Bu, özellikle çok zincirli (multichain) uygulamalarda önemlidir. Uygulamanın ana işlevleri, bağlantı kesildiğinde veya desteklenmeyen bir ağa bağlanıldığında bile görünür olmalıdır.

**İpuçları:**
- Bağlantı kesildiğinde uygulamanın mümkün olduğunca büyük bir kısmını gösterin
- Kullanıcının şu anda hangi ağa bağlı olduğunu gösterin
- Kullanıcıyı ağ değiştirmek için cüzdana gitmek zorunda bırakmayın
- Uygulama kullanıcının ağ değiştirmesini gerektiriyorsa, eylemi ana eylem çağrısından (call to action) isteyin
- Uygulama birden fazla ağ için piyasalar veya kasalar içeriyorsa, kullanıcının şu anda hangi sete baktığını açıkça belirtin

**Örnek:** Kullanıcıya hangi ağa bağlı olduğunu gösterin ve uygulama çubuğunda (appbar) bunu değiştirmesine izin verin.

![Dropdown button showing the connected network](./Image6.png)

### 7. Kontrol cüzdandan değil, uygulamadandır {#control-from-the-app-not-the-wallet}

Kullanıcı arayüzü, kullanıcıya bilmesi gereken her şeyi söylemeli ve yapması gereken her şey üzerinde kontrol sağlamalıdır. 
Web3'te, kullanıcı arayüzünde gerçekleştirdiğiniz eylemler ve cüzdanda gerçekleştirdiğiniz eylemler vardır. Genellikle, kullanıcı arayüzünde bir eylem başlatır ve ardından bunu cüzdanda onaylarsınız. Bu iki kol dikkatlice entegre edilmezse kullanıcılar rahatsız hissedebilir.

**İpuçları:**
- Sistem durumunu kullanıcı arayüzündeki geri bildirimler aracılığıyla iletin
- Geçmişlerinin bir kaydını tutun
- Eski işlemler için blok gezginlerine bağlantılar sağlayın
- Ağları değiştirmek için kısayollar sağlayın. 

**Örnek:** İnce bir kapsayıcı, kullanıcıya cüzdanında hangi ilgili Token'lara sahip olduğunu gösterir ve ana eylem çağrısı (CTA) ağı değiştirmek için bir kısayol sağlar.

![Main CTA is prompting the user to switch network](./Image7.png)