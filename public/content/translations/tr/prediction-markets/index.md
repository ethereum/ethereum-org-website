---
title: "Tahmin piyasaları"
lang: tr
template: use-cases
image: /images/use-cases/prediction-markets.png
sidebarDepth: 2
summaryPoints:
  - "Gelecekteki olayların sonuçları üzerinden işlem yapın"
  - "Fiyatlar, bir şeyin olma olasılığının canlı ve halka açık bir tahmini olarak çalışır"
buttons:
  - content: Daha fazla bilgi edin
    toId: how-prediction-markets-work
  - content: Uygulamaları keşfet
    toId: find-a-prediction-market
    isSecondary: false
---

Tahmin piyasaları, insanların gelecekteki olayların sonuçlarına dair pay alıp satmalarını sağlar. Bir payın fiyatı, piyasanın bir bütün olarak o sonucun gerçekleşme olasılığını nasıl gördüğünü gösterir. 2024 ABD seçimleri sırasında geniş ilgi topladılar.

## Tahmin piyasaları nasıl çalışır? {#how-prediction-markets-work}

Her piyasa, "Yarın Lizbon'da yağmur yağacak mı?" gibi net bir cevabı olan bir soru sorar. Bir **Evet** payı, cevap evet çıkarsa 1$ öder, çıkmazsa hiçbir şey ödemez. Bir **Hayır** payı ise tam tersi şekilde çalışır.

Eğer Evet payları 67 sentten işlem görüyorsa, piyasa yağmur yağma ihtimalinin kabaca %67 olduğunu söylüyordur. Gerçek ihtimalin farklı olduğunu düşünen herkes alım veya satım yapabilir ve bu da fiyatı hareket ettirir. Daha fazla bilgiye sahip olan kişilerin işlem yapmak için bir nedeni olduğundan, yeni bilgiler fiyata hızla yansıma eğilimindedir. Tahmin piyasalarının yararlı öngörüler olabilmesinin nedeni budur. Ancak kusursuz değillerdir.

Kazanan her pay, kaybeden tarafı elinde tutan biri tarafından ödenir. Tahmin piyasaları **sıfır toplamlıdır**: ücretler dışında, kazananların elde ettiği kâr, kaybedenlerin zararıdır.

## Bu neden önemli? {#why-does-this-matter}

Blokzincir tabanlı tahmin piyasaları, geleneksel bahis sitelerinin ve borsaların sunmadığı birkaç şey ekler:

<Grid>
  <Card title="Açık veri" emoji="🔍" description="Her işlem zincir içi kaydedilir, böylece herkes fiyatları, hacimleri ve kimin kazanıp kimin kaybettiğini kontrol edebilir."/>
  <Card title="Zincir içi mutabakat" emoji="🌎" description="Pozisyonlar kendi cüzdanınızdaki Token'lardır ve sonuç bildirildiğinde akıllı sözleşmeler kazanan payları öder." />
  <Card title="Piyasa odaklı oranlar" emoji="🤝" description="Fiyatlar, merkezi bir bahisçi tarafından önceden belirlenmek yerine, sonuç paylarını alıp satan yatırımcılar tarafından belirlenir." />
</Grid>

Açık veri pratikte önemlidir. Araştırmacılar, işlemleri halka açık bir blokzincir üzerinde gerçekleştiği için Kasım 2022'den Mart 2026'ya kadar 2,4 milyondan fazla kullanıcıyı kapsayan [Polymarket'teki her işlemi inceleyebildiler](https://cepr.org/publications/dp21615). Bu tür bağımsız bir kontrol, işlemlerin ve ödemelerin şirketin kendi sistemlerinde gerçekleştiği Kalshi gibi merkezi platformlarda mümkün değildir. Denetlenecek halka açık bir kayıt ve kazanan pozisyonların ödeneceğini garanti eden bir akıllı sözleşme yoktur.

Bir piyasa baştan sona şu şekilde işler:

1. Nasıl karara bağlanacağına dair net kuralları olan bir soru etrafında bir piyasa oluşturulur.
2. Yatırımcılar Evet ve Hayır payları alıp satarlar ve onlar işlem yaptıkça fiyat hareket eder.
3. Olay gerçekleştiğinde, bir [kâhin](/developers/docs/oracles/) sonucu zincir içi bildirir. Polymarket'te herkes bir teminat yatırarak sonucu teklif edebilir ve başka herhangi biri buna itiraz edebilir. Bir anlaşmazlık çözülmezse, UMA Token sahipleri sonuç üzerine oy kullanır.
4. Kazanan her pay 1$ karşılığında bozdurulabilir. Kaybeden payların hiçbir değeri yoktur.
5. Herkes araştırma veya tartışma için fiyat geçmişini ve işlem verilerini kullanabilir.

## Bir tahmin piyasası bulun {#find-a-prediction-market}

Bu tahmin piyasaları işlemleri zincir içi sonuçlandırır, böylece herkes fiyatları ve işlem geçmişini kontrol edebilir:

<PredictionMarketLists />

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Risklere karşı dikkatli olun</strong></p>
  <p className="mt-2">Tahmin piyasalarında işlem yapan çoğu insan para kaybeder. Yalnızca kaybetmeyi göze alabileceğiniz miktarlarla işlem yapın ve olası bağımlılık yapan davranışların farkında olun.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Zorluklar ve Riskler {#challenges-and-risks}

Tahmin piyasaları adilliği, yasallığı ve doğruluğu etkileyen gerçek zorluklarla karşı karşıyadır.

📉 **Çoğu yatırımcı kaybeder** – Kasım 2022'den Mart 2026'ya kadar [her Polymarket işlemini inceleyen bir çalışma](https://cepr.org/publications/dp21615), kullanıcıların yaklaşık %69'unun kayıpla sonuçlandığını buldu. Para kazanan kullanıcılar arasında en üstteki %1'lik kesim kârın %76,5'ini aldı. En büyük kazananlar çoğunlukla limit emirleriyle, genellikle profesyonel olarak ve yüksek hacimde Likidite sağlayan yatırımcılardı.

🕵️ **İçeriden öğrenenlerin ticareti** – Sonucu önceden bilen kişiler, diğer yatırımcıların zararına kâr edebilir. [Columbia Hukuk Fakültesi ve Hayfa Üniversitesi'ndeki araştırmacılar](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6426778), şüpheli bilgili yatırımcıların Şubat 2024 ile Şubat 2026 arasında Polymarket'te yaklaşık 143 milyon dolar kazandığını tahmin ettiler.

⚖️ **Tartışmalı sonuçlar** – Akıllı sözleşmeler otomatik olarak ödeme yapabilir, ancak yine de birinin ne olduğunu bildirmesi gerekir. Bir soru gevşek bir şekilde ifade edildiğinde veya gerçekler belirsiz olduğunda, bildirilen sonuca itiraz edilebilir.

⚠️ **Piyasa manipülasyonu** – Çok parası olan yatırımcılar, özellikle küçük piyasalarda fiyatları hareket ettirebilir. Sahte işlem (wash trading - kendinizle işlem yapmak), bir piyasayı olduğundan daha hareketli gösterebilir.

💧 **Likidite sorunları** – Düşük katılım ([sığ Likidite](https://www.investopedia.com/terms/t/thinmarket.asp)), fiyatları daha az güvenilir hale getirebilir.

🏛 **Düzenleyici belirsizliği** – Kurallar ülkeye göre farklılık gösterir ve hızla değişir. ABD'de düzenleyiciler ve mahkemeler, özellikle sporla ilgili bazı olay sözleşmelerinin finansal ürün mü yoksa kumar mı sayılacağına hala karar veriyor. Birçok platform belirli ülkelerdeki kullanıcıları engellemektedir.

## Tahmin piyasalarıyla denemeler yapmak {#experimenting-with-prediction-markets}

Tahmin piyasaları kâr amaçlı işlemlerin ötesinde de yararlı olabilir. Futarşi (futarchy) adı verilen bir fikir daha da ileri giderek piyasaları sadece tahmin etmek için değil, karar vermeye yardımcı olmak için de kullanır.

Örneğin, bir [Devcon İyileştirme Teklifi](https://forum.devcon.org/t/futarchy-decision-markets-for-deciding-next-devcon/5305) (DIP), Devcon organizatörlerinin olası gelecekteki konumlardaki katılımı tahmin etmek için tahmin piyasalarını kullanmasını teklif etti. Bu, hangi şehrin en büyük olayı çekeceği ile hangisinin uluslararası alanda en erişilebilir olacağını tartmalarına yardımcı olabilir. Ayrıca vize politikalarını, havaalanı erişimini ve yaşam maliyetini karşılaştırmak için harcanan zamandan tasarruf sağlarken, olası katılımcıların nereye gitmekten heyecan duyacağını da gösterebilir.

## Daha fazla okuma {#further-reading}

[Tahmin piyasalarından bilgi finansmanına](https://vitalik.eth.limo/general/2024/11/09/infofinance.html) - Vitalik Buterin  
[Tahmin piyasalarında kim kazanır, kim kaybeder? Polymarket'ten kanıtlar](https://cepr.org/publications/dp21615) - Akey, Grégoire, Harvie ve Martineau  
[Augur Projesi Tanıtım belgesi](https://github.com/AugurProject/whitepaper)
