---
title: Web3 arayüz tasarımı için 7 sezgisel yöntem
description: Web3'ün kullanılabilirliğini iyileştirmeye yönelik ilkeler
lang: tr
---

Kullanılabilirliğe ilişkin sezgisel yöntemler, sitenizin kullanılabilirliğini ölçmek için kullanabileceğiniz genel "temel kurallardır".
Bu sezgisel yöntemler Web3 için özel olarak uyarlanmıştır ve Jakob Nielsen'in [etkileşim tasarımının 10 genel ilkesi](https://www.nngroup.com/articles/ten-usability-heuristics/) ile birlikte kullanılmalıdır.

## Web3 için yedi kullanılabilirlik sezgisel yöntemi {#seven-usability-heuristics-for-web3}

1. Geribildirimler eylemi takip eder
2. Güvenlik ve güven
3. En önemli bilgi açıkça görünürdür
4. Anlaşılabilir terminoloji
5. Aksiyonlar olabildiği kadar kısadır
6. Ağ bağlanlantıları görülebilir ve esnektir
7. Cüzdandan değil, uygulamadan kontrol

## Tanımlar ve örnekler {#definitions-and-examples}

### 1. Geribildirimler eylemi takip eder {#feedback-follows-action}

**Bir şey yaşandığında ya da yaşanırken açıkça görünür olmalıdır.**

Kullanıcılar, önceki işlemlerinden gelen çıktıya göre sonraki işlemlerine karar verirler. Dolayısıyla sistemin durumu hakkında bilgi sahibi olmaları büyük önem taşır. Bu özellikle Web3'te önemlidir çünkü işlemlerin blokzincire işlenmesi bazen küçük bir zaman alabilir. Beklemeleri gerektiğini bildiren bir geribildirim yoksa, kullanıcılar herhangi bir şey olup olmadığından emin olamazlar.

**İpuçları:**

- Kullanıcıyı mesajla, bildirimle ya da diğer uyarılarla haberdar edin.
- Bekleme sürelerini açıkça belirtin.
- Bir eylem birkaç saniyeden uzun sürecekse, kullanıcıya bir şeylerin olduğunu hissettirmek için bir zamanlayıcı veya animasyonla güven verin.
- Sürecin birden fazla adımı varsa, her bir adımı gösterin.

**Örnek:**
Bir işlemde yer alan her adımın gösterilmesi, kullanıcıların süreçte nerede olduklarını bilmesine yardımcı olur. Uygun simgeler ile kullanıcıya eylemlerinin durumunu bildirir.

![Jeton takası yapılırken her adımda kullanıcıyı bilgilendirme](./Image1.png)

### 2. Güvenlik ve güven ön plandadır {#security-and-trust-are-backed-in}

Güvenlik öncelikli olmalıdır ve bu kullanıcıya belirtilmiş olmalıdır.
İnsanlar verilerini son derece önemsiyor. Güvenlik, kullanıcılar için çoğu zaman birincil endişe kaynağıdır, dolayısıyla tasarımın her seviyesinde dikkate alınmalıdır. Her zaman kullanıcılarınızın güvenini kazanmanın yollarını aramalısınız ancak bunu yapma yolunuz farklı uygulamalarda farklı anlamlara gelebilir. Sonradan düşünülmüş bir şey olmamalı, baştan sona bilinçli bir şekilde tasarlanmalıdır. Sosyal kanallar ve dokümantasyonun yanı sıra kullanıcı arayüzü de dahil olmak üzere kullanıcı deneyimini güvenle oluşturun. Merkeziyetçiliğin seviyesi, hazinenin birden fazla imzalı çalışabilmesi durumu ve ekibin doxxed olup olmadığı gibi şeylerin tümü kullanıcıların güvenini etkiler

**İpuçları:**

- Denetimlerinizi gururla listeleyin
- Birden fazla denetim geçirin
- Tasarladığınız güvenlik özelliklerinin reklamını yapın
- Sistemdeki entegrasyonlar da dahil olmak üzere olası riskleri vurgulayın
- Stratejilerin karmaşıklığını anlatın
- Kullanıcılarınızın güvenlik algısını etkileyebilecek kullanıcı arayüzü dışı konuları göz önünde bulundurun

**Örnek:**
Denetimlerinizi alt bilgiye belirgin bir boyutta ekleyin.

![Denetimler internet sitesinin alt bilgisinde belirtilir](./Image2.png)

### 3. En önemli bilgi barizdir {#the-most-important-info-is-obvious}

Karmaşık sistemler için sadece en ilgili verileri gösterin. Neyin önemli olduğuna karar verin ve onu gösterimini önceliklendirin.
Çok fazla bilgi bunaltıcıdır ve kullanıcılar karar alırken genellikle tek bir bilgiye odaklanırlar. DeFi'de bu muhtemelen getiri uygulamalarında APR ve borç verme uygulamalarında LTV'dir.

**İpuçları:**

- Kullanıcı araştırması en önemli metriği ortaya çıkarır
- Önemli olan bilgiyi göze çarpacak şekilde büyütün ve diğer detayları küçük, çok ilgi göstermeden belirtin
- İnsanlar okumaz, göz gezdirir; tasarımınızın rahar bir şekilde göz gezdirilebilir olduğundan emin olun

**Örneğin:** Büyük ve renkli tokenlar göz gezdirirken rahatlıkla fark edilebilir. APR büyük ve vurgulayıcı bir renkle öne çıkarılmış.

![Jetonu ve APR'yi bulmak kolay](./Image3.png)

### 4. Anlaşılır terminoloji {#clear-terminology}

Terminoloji uygun ve anlaşılabilir olmalıdır.
Teknik jargon büyük bir engel olabilir, çünkü tamamen yeni bir zihinsel modelin oluşturulmasını gerektirir. Kullanıcılar tasarımı zaten bildikleri kelimeler, ifadeler ve kavramlarla ilişkilendiremeyebilir. Her şey kafa karıştırıcı ve yabancı görünüyor ve kullanıcıların bunu kullanmayı denemeden önce halletmeleri gereken bir öğrenme eğrisi var. Bir kullanıcı para biriktirmek amacıyla DeFi'a başvurup şunlarla karşılaşabilir: Madencilik, çiftçilik, hisseleme, emisyonlar, rüşvetler, kasalar, dolaplar, veToken'lar, dağıtım, dönemler, merkeziyetsiz algoritmalar, protokole ait likidite…
En geniş kitle tarafından anlaşılabilecek basit terimler kullanmaya çalışın. Sadece kendi projeniz için yeni terimler icat etmeyin.

**İpuçları:**

- Basit ve tutarlı bir terminoloji kullanın
- Mümkün olduğu sürece mevcut dili kullanın
- Kendi terimlerinizi uydurmayın
- Mevcut gelenekleri takip edin
- Kullanıcıları olabildiğince eğitin

**Örnek:**
"Ödülleriniz" ifadesi geniş çapta anlaşılan, doğal bir terimdir, proje için uydurulmuş yeni bir terim değildir. Ödüller, gerçek dünya zihinsel alışkanlıklarına uygun olacak şekilde USD cinsinden ifade edilir, ödüllerin kendisi bir başka jetonda olsa bile.

![Jeton ödülleri, A.B.D. doları cinsinden](./Image4.png)

### 5. Eylemler olabildiğince basit tutulur {#actions-are-as-short-as-possible}

Alt eylemleri gruplandırarak kullanıcının etkileşimlerini hızlandırın.
Bu, akıllı sözleşme seviyesinde yapılabilecek bir hareket olduğu gibi kullanıcı arayüzünde de yapılabilir. Kullanıcının yaygın bir eylemi tamamlamak için sistemin bir bölümünden diğerine geçmesi veya sistemi tamamen terk etmesi gerekmemelidir.

**İpuçları:**

- "Onaylama" işlemini mümkün olduğunda diğer işlemler birleştirin
- İmza adımlarını mümkün olduğunca bir araya toplayın

**Örneğin:** "Likidite ekle" ve "hissele" işlemlerini birleştirmek, kullanıcıya hem zaman hem de gaz ücreti tasarrufu sağlayan bir eylem basitleştirme örneğidir.

![Yatırma ve hisseleme işlemlerini birleştirme seçeneğini gösteren bir modal](./Image5.png)

### 6. Ağ bağlantıları görünür ve esnektir {#network-connections-are-visible-and-flexible}

Kullanıcıları hangi ağa bağlı oldukları hakkında bilgilendirin ve ağı değiştirebilmeleri için basit kısayollar sağlayın.
Bu özellikle çoklu ağ destekleyen uygulamalar için önemlidir. Uygulamanın temel fonksiyonları, bağlantınız kesildiğinde veya desteklenmeyen bir ağa bağlandığınızda da görünür olmalıdır.

**İpuçları:**

- Bağlantı kesikken uygulamanın gösterebildiğiniz kadar çok kısmını gösterin
- Kullanıcının o an hangi ağa bağlı olduğunu gösterin
- Kullanıcıyı cüzdanına dönüp ağı değiştirmek zorunda bırakmayın
- Uygulama kullanıcının ağı değiştirmesini gerektiriyorsa, bu eylemi ana işlem çağrısından bildirin
- Uygulama birden fazla ağ için pazar veya kasa içeriyorsa, kullanıcının şu anda hangi sete baktığını açıkça belirtin

**Örnek:** Kullanıcıya hangi ağa bağlı olduğunu gösterin ve uygulama çubuğu üzerinden ağı değiştirmesine izin verin.

![Bağlı olunan ağı gösteren açılır menü butonu](./Image6.png)

### 7. Kontrol cüzdandan değil, uygulamadan sağlanmalıdır {#control-from-the-app-not-the-wallet}

Kullanıcı arayüzü, kullanıcının bilmesi gereken her şeyi belirtmeli ve yapması gereken her şey üzerinde kontrol sağlamalıdır.
Web3'te, bir kullanıcı arayüzünde yaptığınız işlemler, bir de cüzdan üzerinden gerçekleştirdiğiniz işlemler vardır. Genellikle arayüz üzerinden bir işlem başlatıp cüzdan üzerinden onaylarsınız. Bu iki işlem dikkatli bir şekilde birleştirilmezse kullanıcılar rahatsızlık hissedebilir.

**İpuçları:**

- Sistem durumunu, kullanıcı arayüzünde geribildirim yoluyla iletin
- Geçmişlerini kaydedin
- Eski işlemler için blok arayıcılarına bağlantılar sağlayın
- Ağı değiştirmek için kısayollar sağlayın.

\*\*Örnek: \*\* Belirgin olmayan bir kapsayıcı, kullanıcıya cüzdanında hangi ilgili jetonların bulunduğunu gösterir ve ana CTA, ağı değiştirmeye yarayan bir kısayol sağlar.

![Ana CTA, kullanıcıyı ağı değiştirmeye yönlendiriyor](./Image7.png)
