---
title: Kâhinler
description: Kâhinler, Ethereum akıllı sözleşmelerine gerçek dünya verilerine erişim olanağı sunarak daha fazla kullanım alanının ve kullanıcılar için daha büyük değerlerin kilidini açar.
lang: tr
---

Kâhinler, zincir dışındaki veri kaynaklarını akıllı sözleşmeler için blokzincirin kullanımına sunan veri beslemelerini üreten uygulamalardır. Bu, Ethereum tabanlı akıllı sözleşmeler varsayılan olarak blokzincir ağının dışında depolanan bilgilere erişemediği için gereklidir.

Akıllı sözleşmelere zincir dışındaki verileri kullanarak yürütme olanağı tanımak, merkeziyetsiz uygulamaların fayda ve değerini artırır. Örneğin zincir üstü tahmin piyasaları, kullanıcı tahminlerini doğrulamak için kullandıkları sonuçlar hakkında bilgi sağlamak için kâhinlere güvenir. Alice'in, bir sonraki ABD başkanının kim olacağına dair 20 ETH bahis oynadığını varsayalım.   Bu durumda, tahmin piyasası merkeziyetsiz uygulamasının seçim sonuçlarını onaylamak ve Alice'in ödeme almak için uygun olup olmadığını belirleyebilmek için bir kâhine ihtiyacı vardır.

## Ön Koşullar {#prerequisites}

Bu sayfa, okuyucunun [düğümler](/developers/docs/nodes-and-clients/), [mutabakat mekanizmaları](/developers/docs/consensus-mechanisms/) ve [EVM](/developers/docs/evm/) dahil olmak üzere Ethereum'un temellerine aşina olduğunu varsayar. Ayrıca [akıllı sözleşmeler](/developers/docs/smart-contracts/) ve [akıllı sözleşme anatomisi](/developers/docs/smart-contracts/anatomy/) hakkında, özellikle de [olaylar](/glossary/#events) konusunda iyi bir anlayışa sahip olmalısınız.

## Blokzincir kâhini nedir? {#what-is-a-blockchain-oracle}

Kâhinler; harici bilgileri (yani zincir dışında depolanan bilgiler) tedarik eden, doğrulayan ve blokzincirde çalışan akıllı sözleşmelere ileten uygulamalardır. Kâhinler, zincir dışındaki verileri "çekip" Ethereum'da yayınlamanın yanı sıra, blokzincirden harici sistemlere bilgi de "gönderebilir"; örneğin kullanıcı bir Ethereum işlemi aracılığıyla bir ücret gönderdiğinde bir akıllı kilidi açabilir.

Bir kâhin olmadan, bir akıllı sözleşme tamamen zincir üstü verilerle sınırlı kalırdı.

Kâhinler, veri kaynağına ( bir veya birden fazla kaynak) güven modellerine (merkezi ya da merkeziyetsiz) ve sistem mimarisine (hemen-okuma, yayımlama-abone olma ve istek-yanıt) göre farklılık gösterir. Ayrıca kâhinleri, zincir üstü sözleşmeler tarafından kullanılmak üzere harici veri alıp almadıklarına (girdi kâhinleri), blokzincirden zincir dışı uygulamalara bilgi gönderip göndermediklerine (çıktı kâhinleri) veya zincir dışında hesaplama görevleri gerçekleştirip gerçekleştirmediklerine (hesaplama kâhinleri) göre de ayırt edebiliriz.

## Akıllı sözleşmelerin neden kâhinlere ihtiyacı vardır? {#why-do-smart-contracts-need-oracles}

Birçok geliştirici, akıllı sözleşmeleri blokzincir üzerinde spesifik adreslerde çalışan kodlar olarak görür. Ancak, [akıllı sözleşmelere ilişkin daha genel bir görüş](/smart-contracts/), belirli koşullar karşılandığında taraflar arasındaki anlaşmaları uygulayabilen kendi kendini yürüten yazılım programları olmalarıdır - dolayısıyla "akıllı sözleşmeler" terimi de buradan gelir.

Ancak akıllı sözleşmelerin insanlar arasında anlaşmaları yürürlüğe koymak amacıyla kullanımı, Ethereum'un belirleyici olduğu göz önüne alındığında oldukça karmaşıktır. [Deterministik bir sistem](https://en.wikipedia.org/wiki/Deterministic_algorithm), belirli bir başlangıç durumu ve belirli bir girdi verildiğinde her zaman aynı sonuçları üreten bir sistemdir; yani, girdilerden çıktıları hesaplama sürecinde hiçbir rastgelelik veya varyasyon yoktur.

Deterministik yürütmeyi sağlamak için, blokzincirler düğümleri _yalnızca_ blokzincirin kendisinde depolanan verileri kullanarak basit ikili (doğru/yanlış) sorular üzerinde mutabakata varmakla sınırlar. Bu soruların örnekleri aşağıdaki gibidir:

- ''Hesap sahibi (açık anahtar ile kimliği belirlenen) bu işlemi eşlenmiş özel anahtar ile imzaladı mı?''
- ''Bu hesap, işlemi karşılayabilmek için yeterli fona sahip mi?''
- ''Bu işlem, bu akıllı sözleşme bağlamında geçerli mi?'' vb.

Blokzincir bilgiyi dış kaynaklardan (örneğin gerçek dünyadan) edinmişse belirleyiciliğe ulaşmak, blok zincir durumundaki değişikliklerin doğruluğu üzerinde düğümlerin hemfikir olmasını engelleyeceğinden imkansız hale gelecektir. Örnek olarak, geleneksel fiyat API'sinden şu anki ETH-USD takas fiyatına dayalı bir işlemi yürüten bir akıllı sözleşmeyi ele alalım. Bu rakam, büyük olasılıkla sık sık değişecektir (API'nin kullanım dışı kalması veya saldırıya uğraması ihtimalini de unutmamak gerekir) ve dolayısıyla aynı sözleşme kodunu çalıştıran düğümler farklı sonuçlara ulaşacaktır.

İşlem yürüten dünya çapında binlerce düğüme sahip Ethereum gibi açık bir blokzincir için belirleyicilik hayati önemdedir. Doğruluk kaynağı olarak hizmet eden merkezi bir otorite olmadığında, düğümler aynı işlemleri uyguladıktan sonra aynı duruma ulaşmak için mekanizmalara ihtiyaç duyar. Düğüm A'nın bir akıllı sözleşme kodunu yürütüp sonuç olarak "3" aldığı, ancak aynı işlemi yürüten düğüm B'nin "7" aldığı bir durum, mutabakatın çözülmesine ve Ethereum'un merkezi olmayan bir hesaplama platformu olarak değerini yitirmesine neden olabilir.

Bu senaryo, harici kaynaklardan bilgi çeken blokzincirler tasarlama sorununa da işaret etmektedir. Ancak kâhinler, zincir dışı kaynaklardan bilgi alıp akıllı sözleşmelerin kullanması için blokzincirde depolayarak bu sorunu çözerler. Zincir üstünde depolanan bilgiler değiştirilemez ve halka açık olduğundan, Ethereum düğümleri, kâhin tarafından içe aktarılan zincir dışı verileri, mutabakatı bozmadan durum değişikliklerini hesaplamak için güvenle kullanabilir.

Bunu yapmak için bir kâhin, tipik olarak zincir üstünde çalışan bir akıllı sözleşmeden ve bazı zincir dışı bileşenlerden oluşur. Zincir üstü sözleşme, diğer akıllı sözleşmelerden veri talepleri alır ve bu talepleri zincir dışı bileşene (kâhin düğümü olarak adlandırılır) iletir. Bu kâhin düğümü, veri kaynaklarını sorgulayabilir (örneğin uygulama programlama arayüzleri (API) kullanarak) ve istenen verileri akıllı sözleşmenin deposunda saklamak için işlemler gönderebilir.

Bir blokzincir kâhini, temel olarak blokzincir ile dış çevre arasındaki bilgi açığını ''hibrid akıllı sözleşmeler'' oluşturarak kapatır. Hibrit bir akıllı sözleşme, zincir üstü sözleşme kodu ve zincir dışı altyapının bir birleşimine dayalı olarak çalışan bir sözleşmedir. Merkeziyetsiz tahmin piyasaları, hibrit akıllı sözleşmelerin harika bir örneğidir. Diğer örnekler arasında, bir kâhin kümesinin belirli bir hava olayının gerçekleştiğine karar vermesi durumunda ödeme yapan mahsul sigortası akıllı sözleşmeleri sayılabilir.

## Kâhin sorunu nedir? Kâhin sorunu {#the-oracle-problem}

Kâhinler önemli bir sorunu çözer ancak bazı komplikasyonları da beraberinde getirir, ör.,:

- İçeriye aktarılan bilginin doğru kaynaktan alınıp alınmadığını ya da bu bilgi üzerinde oynanıp oynanmadığını nasıl doğrularız?

- Bu verinin her zaman kullanılabilir olduğundan ve düzenli olarak güncellendiğinden nasıl emin olabiliriz?

''Kâhin sorunu", akıllı sözleşmelere girdi göndermek için blokzincir kâhinleri kullanımıyla birlikte gelen sorunları ortaya koyar. Kâhinden alınan veri, akıllı sözleşme tarafından doğru yürütülebilmek için mutlaka doğru olmalıdır. Ayrıca, kâhin operatörlerinin doğru bilgi sağlayacağına "güvenmek" zorunda kalmak, akıllı sözleşmelerin "güven gerektirmeyen" yönünü zayıflatır.

Farklı kâhinler, kâhin problemine daha sonra inceleyeceğimiz farklı çözümler sunar. Kâhinler genellikle aşağıdaki zorlukların üstesinden ne kadar iyi gelebildiklerine göre değerlendirilir:

1. **Doğruluk**: Bir kâhin, akıllı sözleşmelerin geçersiz zincir dışı verilere dayanarak durum değişikliklerini tetiklemesine neden olmamalıdır. Bir kâhin, verilerin _özgünlüğünü_ ve _bütünlüğünü_ garanti etmelidir. Özgünlük, verilerin doğru kaynaktan alındığı anlamına gelirken, bütünlük verilerin zincir üstüne gönderilmeden önce bozulmadan kaldığı (yani değiştirilmediği) anlamına gelir.

2. **Kullanılabilirlik**: Bir kâhin, akıllı sözleşmelerin eylemleri yürütmesini ve durum değişikliklerini tetiklemesini geciktirmemeli veya engellememelidir. Bu, bir kâhin'den gelen verilerin kesintisiz olarak _talep üzerine mevcut olması_ gerektiği anlamına gelir.

3. **Teşvik uyumluluğu**: Bir kâhin, zincir dışı veri sağlayıcılarını akıllı sözleşmelere doğru bilgi göndermeleri için teşvik etmelidir. Teşvik uyumluluğu, _atfedilebilirlik_ ve _hesap verebilirlik_ içerir. Dayandırılabilirlik, harici bir bilgi parçasını sağlayıcısıyla ilişkilendirmeye olanak tanırken hesap verebilirlik, veri sağlayıcılarını verdikleri bilgiye bağlar; böylece sağladıkları bilginin kalitesine göre ödüllendirilebilecekleri veya cezalandırılabilecekleri bir yapı oluşturur.

## Blokzincir kâhin hizmeti nasıl çalışır? Bir blokzincir kâhin hizmeti nasıl çalışır? {#how-does-a-blockchain-oracle-service-work}

### Kullanıcılar {#users}

Kullanıcılar, belirli aksiyonları tamamlayabilmek için blokzincir dışı bilgiye ihtiyaç duyan varlıklardır (örneğin akıllı sözleşmeler). Bir kâhin hizmetinin temel iş akışı, kullanıcının kâhin sözleşmesine veri isteği göndermesiyle başlar. Veri istekleri genellikle aşağıdaki soruların bazılarını veya tamamını cevaplar:

1. Zincir dışı düğümler, istenen bilgi için hangi kaynaklara danışabilir?

2. Raporlayıcılar, veri kaynaklarından gelen veriyi nasıl işler ve kullanışlı veri noktalarını nasıl çıkartır?

3. Verilarin alınmasında kaç kâhin düğümü yer alabilir?

4. Kâhin raporlarındaki uyumsuzluklar nasıl yönetilmelidir?

5. Gönderimleri süzmek ve raporları tek bir değerde toplamak için hangi yöntem uygulanmalıdır?

### Kâhin sözleşmesi {#oracle-contract}

Kâhin sözleşmesi, kâhin hizmetinin zincir üstü bileşenidir. Diğer sözleşmelerden gelen veri taleplerini dinler, veri sorgularını kâhin düğümlerine iletir ve döndürülen verileri istemci sözleşmelerinde yayınlar. Bu sözleşme, talep eden sözleşmeye gönderilecek toplu bir değer üretmek üzere döndürülen veri noktaları üzerinde bazı hesaplamalar da gerçekleştirebilir.

Kâhin sözleşmesi, müşteri sözleşmelerinin veri isteği yaparken çağırdığı bazı fonksiyonları açığa çıkarır. Yeni bir sorgu aldığında, akıllı sözleşme veri talebinin ayrıntılarını içeren bir [günlük olayı](/developers/docs/smart-contracts/anatomy/#events-and-logs) yayınlar. Bu, günlüğe abone olan zincir dışı düğümleri (genellikle JSON-RPC `eth_subscribe` komutu gibi bir şey kullanarak) bilgilendirir ve bu düğümler günlük olayında tanımlanan verileri almaya devam eder.

Aşağıda Pedro Costa'ya ait bir [örnek kâhin sözleşmesi](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) bulunmaktadır. Bu, diğer akıllı sözleşmelerin talebi üzerine zincir dışı API'leri sorgulayabilen ve istenen bilgileri blokzincirde depolayabilen basit bir kâhin hizmetidir:

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //sözleşmeye yapılan isteklerin listesi
  uint currentId = 0; //artan istek kimliği
  uint minQuorum = 2; //nihai sonucu ilan etmeden önce alınacak minimum yanıt sayısı
  uint totalOracleCount = 3; // Sabit kodlanmış kâhin sayısı

  // genel bir api isteği tanımlar
  struct Request {
    uint id;                            //istek kimliği
    string urlToQuery;                  //API url'si
    string attributeToFetch;            //yanıtta alınacak json özniteliği (anahtar)
    string agreedValue;                 //anahtardan gelen değer
    mapping(uint => string) answers;     //kâhinler tarafından sağlanan cevaplar
    mapping(address => uint) quorum;    //cevabı sorgulayacak kâhinler (1=kâhin oy kullanmadı, 2=kâhin oy kullandı)
  }

  //blokzincir dışındaki kâhini tetikleyen olay
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  //nihai sonuç üzerinde bir mutabakat olduğunda tetiklenir
  event UpdatedRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch,
    string agreedValue
  );

  function createRequest (
    string memory _urlToQuery,
    string memory _attributeToFetch
  )
  public
  {
    uint length = requests.push(Request(currentId, _urlToQuery, _attributeToFetch, ""));
    Request storage r = requests[length-1];

    // Sabit kodlanmış kâhin adresleri
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // blokzincir dışındaki kâhin tarafından tespit edilecek bir olay başlat
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // istek kimliğini artır
    currentId++;
  }

  //cevabını kaydetmek için kâhin tarafından çağrılır
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    //kâhinin güvenilir kâhinler listesinde olup olmadığını kontrol et
    //ve kâhinin henüz oy kullanıp kullanmadığını kontrol et
    if(currRequest.quorum[address(msg.sender)] == 1){

      //bu adresin oy kullandığını işaretle
      currRequest.quorum[msg.sender] = 2;

      //bir pozisyon boşalana kadar cevaplar "dizisi" boyunca yinele ve alınan değeri kaydet
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        //ilk boş yuvayı bul
        if(bytes(currRequest.answers[tmpI]).length == 0){
          found = true;
          currRequest.answers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //kâhin listesini yinele ve yeterli sayıda kâhinin (minimum yeter sayı)
      //mevcut cevapla aynı yönde oy kullanıp kullanmadığını kontrol et
      for(uint i = 0; i < totalOracleCount; i++){
        bytes memory a = bytes(currRequest.answers[i]);
        bytes memory b = bytes(_valueRetrieved);

        if(keccak256(a) == keccak256(b)){
          currentQuorum++;
          if(currentQuorum >= minQuorum){
            currRequest.agreedValue = _valueRetrieved;
            emit UpdatedRequest (
              currRequest.id,
              currRequest.urlToQuery,
              currRequest.attributeToFetch,
              currRequest.agreedValue
            );
          }
        }
      }
    }
  }
}
```

### Kâhin düğümleri {#oracle-nodes}

Kâhin düğümü, kâhin hizmetinin zincir dışı bileşenidir. Üçüncü taraf sunucularda barındırılan API'ler gibi harici kaynaklardan bilgi ayıklar ve akıllı sözleşmelerin kullanması için zincir üstüne koyar. Kâhin düğümleri, zincir üstü kâhin sözleşmesinden gelen olayları dinler ve günlükte açıklanan görevi tamamlamaya devam eder.

Kâhin düğümleri için yaygın bir görev, bir API hizmetine [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp) isteği göndermek, ilgili verileri ayıklamak için yanıtı ayrıştırmak, blokzincir tarafından okunabilir bir çıktıya biçimlendirmek ve kâhin sözleşmesine yapılan bir işleme dahil ederek zincir üstüne göndermektir. Kâhin düğümü ayrıca, daha sonra keşfedeceğimiz ''özgünlük kanıtları'' kullanılarak kaydedilmiş bilginin bütünlüğünü ve doğruluğunu sorgulamak için gerekli olabilir.

Hesaplamalı kâhinler ayrıca, gaz maliyetleri ve blok boyutu sınırları göz önüne alındığında zincir üstünde yürütülmesi pratik olmayan hesaplama görevlerini gerçekleştirmek için zincir dışı düğümlere güvenir. Örneğin kâhin düğümü, kanıtlanabilir rastgele bir figürü (örneğin blokzincir tabanlı oyunlar için) oluşturmakla görevlendirilebilir.

## Kâhin tasarım desenleri {#oracle-design-patterns}

Kâhinler, _anında okuma_, _yayınla-abone ol_ ve _istek-yanıt_ dahil olmak üzere farklı türlerde gelir; son ikisi Ethereum akıllı sözleşmeleri arasında en popüler olanlardır. Burada yayınlama-abone olma ve istek-yanıt modellerini kısaca açıklıyoruz.

### Yayınla-abone ol kâhinleri {#publish-subscribe-oracles}

Bu tip kâhinler, diğer sözleşmelerin bilgi edinmek için düzenli olarak okuyabileceği bir "veri akışı" ortaya koyar. Bu durumdaki verinin sık sık değişmesi beklenir, bu nedenle istemci sözleşmelerinin, kâhinin depolamasındaki verilerde yapılacak güncellemelerini dinlemesi gerekir. ETH-USD'nin güncel fiyat bilgisini kullanıcılara sunan bir kâhin buna bir örnek teşkil eder.

### İstek-yanıt kâhinleri {#request-response-oracles}

Bir istek-yanıt kurulumu, istemci sözleşmesinin yayımlama-abonelik kâhini tarafından sağlanmış olan veri dışındaki keyfi verileri de talep edebilmesini sağlar. İstek-yanıt kâhinleri, veri kümesinin akıllı sözleşmenin depolama alanında saklanamayacak kadar büyük olduğu ve/veya kullanıcıların herhangi bir anda verilerin yalnızca küçük bir kısmına ihtiyaç duyacağı durumlar için ideal seçenektir.

Yayımlama-abonelik modellerinden daha karmaşık olsa da, istek-yanıt kâhinleri basitçe önceki bölümde anlattığımız şeydir. Kâhinin, bir veri talebi alan ve işlenmesi için zincir dışı bir düğüme ileten bir zincir üstü bileşeni olacaktır.

Veri sorgularını başlatan kullanıcılar, zincir dışı kaynaktan bilgi almanın maliyetini karşılamalıdır. Ayrıca istemci sözleşmesinin, kâhin sözleşmesinin istekte belirtilen geri çağırma fonksiyonu aracılığıyla gelen cevabı döndürmesiyle ortaya çıkan gaz maliyetlerini de karşılaması gerekecektir.

## Merkezi ve merkeziyetsiz kâhinler {#types-of-oracles}

### Merkezi kâhinler {#centralized-oracles}

Merkezi bir kâhin, zincir dışı bilgileri toplamaktan ve talep edildiğinde kâhin sözleşmesinin verilerini güncellemekten sorumlu tek bir kuruluş tarafından kontrol edilir. Merkezi kâhinler tek bir doğruluk kaynağına dayandıkları için verimlidir. Sahipli veri kümelerinin doğrudan sahipleri tarafından geniş çapta kabul gören bir imza ile yayımlandığı durumlarda daha iyi işlev görebilirler. Ancak, bunların olumsuz yanları da vardır:

#### Düşük doğruluk garantileri {#low-correctness-guarantees}

Merkezi kâhinler söz konusu olduğunda sağlanan bilginin doğru olup olmadığını onaylamanın bir yolu yoktur. "İtibarlı" sağlayıcılar bile hile yapabilir veya saldırıya uğrayabilir. Kâhin yozlaşmış bir hale gelirse, akıllı sözleşmeler kötü veriler üzerinde çalışacaktır.

#### Zayıf kullanılabilirlik {#poor-availability}

Merkezi kâhinlerin, zincir dışı verileri diğer akıllı sözleşmeler için her zaman kullanılabilir kılacağı garanti edilmez. Sağlayıcı hizmeti kapatmaya karar verirse veya bir bilgisayar korsanı kâhinin zincir dışı bileşenini ele geçirirse akıllı sözleşmeniz hizmet reddi (DoS) saldırısı riskiyle karşı karşıya kalır.

#### Zayıf teşvik uyumluluğu {#poor-incentive-compatibility}

Merkezi kâhinler genellikle kötü tasarlanmıştır veya veri sağlayıcının doğru/değiştirilmemiş bilgi göndermesi için var olmayan teşviklere sahiptir. Bir kâhine doğruluk için ödeme yapmanız dürüstlüğü garanti etmez. Bu problem, akıllı sözleşmelerin kontrolünde bulunan değer arttıkça daha da büyür.

### Merkeziyetsiz kâhinler {#decentralized-oracles}

Merkezi olmayan kâhinler, tek başarısızlık noktalarını ortadan kaldırarak merkezi kâhinlerin tabi olduğu sınırlamaların üstesinden gelmek için tasarlanmıştır. Merkeziyetsiz bir kâhin hizmeti, bir akıllı sözleşmeye göndermeden önce zincir dışı veriler üzerinde mutabakat oluşturan, eşler arası bir ağdaki birden fazla katılımcıdan oluşur.

Merkezi olmayan bir kâhin (ideal olarak) izin ve güven gerektirmez olmalı ve merkezi bir tarafın idaresine dayalı olmamalıdır; gerçekte, kâhinler arasında merkeziyetsizlik bir spektrumun farklı bölgelerindedir. Herkesin katılabileceği yarı merkeziyetsiz kâhin ağları olsa da, bu ağlarda düğümleri geçmiş performansa göre onaylayan ve kaldıran bir "sahip" vardır. Tamamen merkeziyetsiz kâhin ağları da mevcuttur: bunlar genellikle bağımsız blokzincirler olarak çalışır ve düğümleri koordine etmek ve kötü davranışları cezalandırmak için tanımlanmış mutabakat mekanizmalarına sahiptir.

Merkezi olmayan kâhinleri kullanmak aşağıdaki faydaları beraberinde getirir:

### Yüksek doğruluk garantileri {#high-correctness-guarantees}

Merkezi olmayan kâhinler, veri doğruluğunu farklı yaklaşımlar kullanarak elde etmeye çalışır. Bu, döndürülen bilgilerin özgünlüğünü ve bütünlüğünü tasdik eden kanıtların kullanılmasını ve birden fazla kuruluşun zincir dışı verilerin geçerliliği konusunda toplu olarak anlaşmasını gerektirmeyi içerir.

#### Özgünlük kanıtları {#authenticity-proofs}

Özgünlük kanıtları, dış kaynaklardan alınan bilginin bağımsız doğrulamasını mümkün kılan kriptografik mekanizmalardır. Bu kanıtlar, bilginin kaynağını doğrulayabilir ve alımdan sonra veri üzerindeki muhtemel oynamaları tespit edebilir.

Özgünlük kanıtlarının örnekleri şunlardır:

**Aktarım Katmanı Güvenliği (TLS) kanıtları**: Kâhin düğümleri, genellikle harici kaynaklardan Aktarım Katmanı Güvenliği (TLS) protokolüne dayalı güvenli bir HTTP bağlantısı kullanarak veri alır. Bazı merkeziyetsiz kâhinler TLS oturumlarını doğrulamak (yani bir düğüm ile spesifik bir sunucu arasındaki bilgi aktarımını onaylamak) için özgünlük kanıtları kullanır ve oturumun içerikleriyle oynanmadığını onaylar.

**Güvenilir Yürütme Ortamı (TEE) tasdikleri**: Bir [güvenilir yürütme ortamı](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE), ana bilgisayar sisteminin operasyonel süreçlerinden yalıtılmış, sanal alanlı bir hesaplama ortamıdır. TEE'ler bilgi işlem ortamında depolanan/kullanılan herhangi bir uygulama kodunun veya verinin bütünlüğünü, gizliliğini ve değiştirilemezliğini sağlar. Kullanıcılar ayrıca bir uygulamanın güvenilir yürütme ortamının içinde çalıştığını kanıtlayan bir tasdik oluşturabilirler.

Merkezi olmayan kâhinlerin belirli sınıfları, kâhin düğümü operatörlerinin TEE tasdikleri sağlamasını gerektirir. Bu, bir kullanıcı için düğüm operatörünün kâhin istemcisinin bir örneğini güvenilir yürütme ortamında çalıştırdığını doğrular. TEE'ler dış süreçlerin bir uygulamanın kodunu ve verilerini değiştirmesini veya okumasını önler; dolayısıyla bu tasdikler, kâhin düğümünün bilgiyi bütün ve gizli tuttuğunu kanıtlar.

#### Bilginin mutabakat tabanlı doğrulanması {#consensus-based-validation-of-information}

Merkezi kâhinler akıllı sözleşmelere veri sağlarken tek bir doğruluk kaynağına güvenirler, bu da isabetsiz bilgilerin yayınlanma ihtimalini ortaya çıkarır. Merkeziyetsiz kâhinler, zincir dışı bilgileri sorgulamak için birden fazla kâhin düğümüne dayanarak bu sorunu çözerler. Merkeziyetsiz kâhinler, birden fazla kaynaktan gelen verileri karşılaştırarak zincir üstü sözleşmelere geçersiz bilgi aktarma riskini azaltır.

Ancak merkeziyetsiz kâhinler, birden fazla zincir dışı kaynaktan alınan bilgilerdeki tutarsızlıklarla başa çıkmak zorundadır. Bilgideki farklılıkları minimize etmek ve kâhin sözleşmesine aktarılan verinin kâhin düğümlerinin müşterek fikrini yansıtmasını sağlamak için merkezi olmayan kâhinler şu mekanizmaları kullanır:

##### Verilerin doğruluğu üzerine oylama/hisseleme

Bazı merkezi olmayan kâhin ağları, ağın yerel jetonlarını kullanarak katılımcıların veri sorgularına verilen yanıtların doğruluğu konusunda (örneğin, "2020 ABD seçimlerini kim kazandı?") oy vermesini veya üzerine oynamasını gerektirir. Bir birleştirme protokolü, daha sonra oyları ve hisseleri birleştirip çoğunluk tarafından desteklenen cevabı geçerli olarak kabul eder.

Çoğunluk cevabından sapan cevaplara sahip olan düğümler, jetonları daha doğru değerler sağlayanlara dağıtılarak cezalandırılır. Düğümleri veri sağlamadan önce bir bono sağlamaya zorlamak, gelirleri en yüksek seviyeye çıkarmaya çalışan rasyonel ekonomik aktörler olarak varsayıldıkları için dürüst cevapları teşvik eder.

Hisseleme/oylama, merkeziyetsiz kâhinleri, kötü niyetli aktörlerin mutabakat sistemini manipüle etmek için birden fazla kimlik oluşturduğu [Sybil saldırılarından](/glossary/#sybil-attack) da korur. Ancak hisseleme, "avantacılığı" (başkalarından bilgi kopyalayan kâhin düğümlerini) ve "tembel doğrulamayı" (kendileri bilgiyi doğrulamadan çoğunluğu takip eden kâhin düğümlerini) önleyemez.

##### Schelling noktası mekanizmaları

[Schelling noktası](https://en.wikipedia.org/wiki/Focal_point_\(game_theory\)), birden fazla varlığın herhangi bir iletişim olmadığında bir soruna yönelik ortak bir çözümü her zaman varsayılan olarak seçeceğini varsayan bir oyun teorisi kavramıdır. Schelling noktası mekanizmaları, merkezi olmayan kâhin ağlarında genellikle düğümlerin veri isteklerine verilen cevaplarda mutabakata ulaşmasını sağlamak için kullanılır.

Bunun için ilk fikirlerden biri, katılımcıların bir teminatla birlikte "skaler" sorulara (cevapları büyüklükle tanımlanan sorular, örneğin, "ETH'nin fiyatı nedir?") yanıtlar gönderdiği önerilen bir veri akışı olan [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/) idi. 25. ve 75. [yüzdelik dilim](https://en.wikipedia.org/wiki/Percentile) arasında değerler sağlayan kullanıcılar ödüllendirilirken, değerleri medyan değerden büyük ölçüde sapanlar cezalandırılır.

SchellingCoin bugün mevcut olmasa da, bir dizi merkeziyetsiz kâhin — özellikle [Maker Protokolü'nün Kâhinleri](https://docs.makerdao.com/smart-contract-modules/oracle-module) — kâhin verilerinin doğruluğunu artırmak için schelling noktası mekanizmasını kullanır. Her bir Maker Kâhini, teminat varlıkları için piyasa fiyatlarını gönderen bir zincir dışı P2P düğüm ağından ("aktarıcılar" ve "beslemeler") ve sağlanan tüm değerlerin medyanını hesaplayan zincir üstü bir "Medianizer" sözleşmesinden oluşur. Belirtilen gecikme süresi bittikten sonra bu ortalama değer, ilgili varlık için yeni referans değeri olur.

Schelling noktası mekanizmalarını kullanan kâhinlere diğer örnekler arasında [Chainlink Offchain Reporting](https://docs.chain.link/architecture-overview/off-chain-reporting) ve [Witnet](https://witnet.io/) bulunmaktadır. İki sistemde de eşler arası ağdaki kâhin düğümlerinden gelen cevaplar ortalama veya orta gibi tek bir toplu değerde birleştirilir. Düğümler cevaplarının toplam değer ile ne kadar uyumlu olduğuna veya bu değerden ne kadar saptığına göre ödüllendirilir veya cezalandırılırlar.

Schelling noktası mekanizmaları, merkeziyetsizliği garanti ederken zincir üstü ayak izini en aza indirdikleri için (yalnızca tek bir işlem gönderilmesi gerekir) çekicidir. İkincisi, gönderilen cevaplar listesindeki düğümlerin orta/ortalama değeri oluşturan algoritmaya aktarılmadan önce tamamlanması gerektiği için mümkündür.

### Kullanılabilirlik {#availability}

Merkeziyetsiz kâhin hizmetleri, akıllı sözleşmelere zincir dışı verilerin yüksek düzeyde kullanılabilirliğini sağlar. Bu, hem zincir dışı bilgi kaynağını hem de bilgiyi zincir üstüne aktarmaktan sorumlu düğümleri merkeziyetsizleştirerek elde edilir.

Kâhin sözleşmesi diğer sözleşmelerden sorgular yürütmek için birden fazla düğüme dayandığından (ayrıca birden çok veri kaynağına da dayanır) hata toleransı da sağlanmış olur. Kaynak _ve_ düğüm operatörü düzeyinde merkeziyetsizleştirme çok önemlidir — aynı kaynaktan alınan bilgileri sunan bir kâhin düğümleri ağı, merkezi bir kâhin ile aynı sorunla karşılaşacaktır.

Hisseye dayalı kâhinlerin veri taleplerine hızlı yanıt vermeyen düğüm operatörlerini kesmesi de mümkündür. Bu, kâhin düğümlerinin hata toleransı altyapısına yatırım yapmasını ve zamanında veri sağlamasını önemli ölçüde teşvik eder.

### İyi teşvik uyumluluğu {#good-incentive-compatibility}

Merkeziyetsiz kâhinler, kâhin düğümleri arasında [Bizans](https://en.wikipedia.org/wiki/Byzantine_fault) davranışını önlemek için çeşitli teşvik tasarımları uygular. Spesifik olarak, _atfedilebilirlik_ ve _hesap verebilirlik_ sağlarlar:

1. Merkezi olmayan kâhin düğümlerinin genelde veri isteklerine karşı cevap olarak sağladıkları verileri imzalamaları gerekir. Bu bilgi, kullanıcıların veri isteklerinde bulunurken güvenilir olmayan düğümleri filtreleyebilmesini sağlamak adına kâhin düğümlerinin geçmiş performansının değerlendirilmesine yardımcı olur. Bir örnek, Witnet'in [Algoritmik İtibar Sistemi](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system)'dir.

2. Merkezi olmayan kâhinler, önceden açıklandığı üzere düğümlerin bildirdikleri verinin doğruluğuna olan güvenleri üzerine bir hisse koymasını gerektirebilir. Eğer iddia doğru çıkarsa, bu hisse dürüst hizmet karşılığı verilen ödüller ile birlikte geri dönebilir. Ancak bilginin yanlış olduğu durumda da kesilebilir, bu da bir ölçüde hesap verilebilirlik sağlar.

## Akıllı sözleşmelerde kâhin uygulamaları {#applications-of-oracles-in-smart-contracts}

Ethereum'da kâhinler için yaygın kullanım alanları aşağıdadır:

### Finansal verileri alma {#retrieving-financial-data}

[Merkeziyetsiz finans](/defi/) (DeFi) uygulamaları, varlıkların eşler arası borç verilmesine, borç alınmasına ve takas edilmesine olanak tanır. Bu, genelde takas oranı verileri (kripto paraların itibari değerlerini hesaplamak ya da jeton fiyatlarını karşılaştırmak için) ve sermaye piyasaları verilerini (altın ya da Amerikan doları gibi jetonlaştırılmış varlıkların değerlerini hesaplamak için) de kapsayan farklı finansal bilgileri almayı gerektirir.

Örneğin bir DeFi borç verme protokolünün teminat olarak yatırılan varlıklar (ETH gibi) için güncel piyasa fiyatlarını sorgulaması gerekir. Bu, sözleşmenin teminat varlıklarının değerinin ve sistemden ne kadar borç alınabileceğinin belirlenmesini sağlar.

DeFi'de popüler "fiyat kâhinleri" (genellikle bu şekilde adlandırılırlar) arasında Chainlink Fiyat Beslemeleri, Compound Protokolü'nün [Açık Fiyat Beslemesi](https://compound.finance/docs/prices), Uniswap'ın [Zaman Ağırlıklı Ortalama Fiyatları (TWAP'ler)](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) ve [Maker Kâhinleri](https://docs.makerdao.com/smart-contract-modules/oracle-module) bulunur.

Oluşturucular, bu fiyat kâhinlerini projelerine dahil etmeden önce bunlarla birlikte gelen uyarıları kavramalıdır. Bu [makale](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles), bahsedilen fiyat kâhinlerinden herhangi birini kullanmayı planlarken nelerin dikkate alınması gerektiğine dair ayrıntılı bir analiz sunmaktadır.

Aşağıda, bir Chainlink fiyat akışı kullanarak akıllı sözleşmenizdeki en son ETH fiyatını nasıl alabileceğinizi gösteren bir örnek bulunmaktadır:

```solidity
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
}
```

### Doğrulanabilir rastgelelik oluşturma {#generating-verifiable-randomness}

Blokzincir tabanlı oyunlar veya piyango şemaları gibi belirli blokzincir uygulamalarının etkili bir şekilde çalışması için yüksek düzeyde öngörülemezlik ve rastgelelik gerekir. Fakat blokzincirlerin belirleyici yürütümü, rastgeleliği ortadan kaldırır.

`blockhash` gibi sözde rastgele kriptografik fonksiyonların kullanılması özgün bir yaklaşımdı ancak bunlar [madenciler tarafından manipüle edilebilir](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.) iş ispatı algoritmasını çözerken. Ayrıca Ethereum'un [hisse ispatına geçişi](/roadmap/merge/), geliştiricilerin artık zincir üstü rastgelelik için `blockhash`'e güvenemeyecekleri anlamına geliyor. Bunun yerine Beacon Chain'in [RANDAO mekanizması](https://eth2book.info/altair/part2/building_blocks/randomness) alternatif bir rastgelelik kaynağı sağlar.

Rastgele değeri zincir dışında oluşturup zincir üstüne göndermek mümkündür ancak bunu yapmak kullanıcılara yüksek güven gereksinimleri yükler. Değerin tahmin edilemeyecek mekanizmalarla gerçekten oluşturulduğuna ve geçiş sırasında değiştirilmediğine inanmak zorundadırlar.

Zincir dışı hesaplama için tasarlanmış kâhinler, sürecin öngörülemezliğini tasdik eden kriptografik kanıtlarla birlikte zincir üstünde yayınladıkları rastgele sonuçları zincir dışında güvenli bir şekilde üreterek bu sorunu çözerler. Bir örnek, öngörülemeyen sonuçlara dayanan uygulamalar için güvenilir akıllı sözleşmeler oluşturmak için kullanışlı, kanıtlanabilir derecede adil ve kurcalamaya karşı korumalı bir rastgele sayı üreteci (RNG) olan [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/)'dir (Doğrulanabilir Rastgele Fonksiyon).

### Olaylar için sonuçları alma {#getting-outcomes-for-events}

Kâhinler sayesinde gerçek hayat olaylarına tepkiler verebilen bir akıllı sözleşme kolaylıkla oluşturulabilir. Kâhin hizmetleri, sözleşmelerin zincir dışı bileşenler aracılığıyla harici API'lere bağlanmasına ve bu veri kaynaklarındaki bilgileri kullanmasına olanak tanıyarak bunu mümkün kılar. Örneğin, daha önce bahsedilen tahmin merkeziyetsiz uygulaması, bir kâhin'den güvenilir bir zincir dışı kaynaktan (örneğin Associated Press) seçim sonuçlarını döndürmesini isteyebilir.

Gerçek dünya sonuçlarına dayalı verileri alabilmek için kâhinleri kullanmak, başka yeni kullanım durumlarına da olanak tanır; örneğin, merkeziyetsiz bir sigorta ürününün etkili bir şekilde çalışabilmesi için hava durumu, afetler vb. hakkında doğru bilgilere ihtiyaç vardır.

### Akıllı sözleşmeleri otomatikleştirme {#automating-smart-contracts}

Akıllı sözleşmeler otomatik olarak çalışmaz; bundan ziyade sözleşmenin kodunu çalıştırabilmek için bir dışarıdan sahip olunan hesap (EOA) ya da başka bir sözleşme hesabı doğru fonksiyonları tetiklemelidir. Çoğu durumda, sözleşmenin fonksiyonlarının büyük kısmı herkese açıktır ve EOA'lar ve diğer sözleşmeler tarafından çağrılabilir.

Ancak bir sözleşme içinde başkalarının erişemeyeceği, ancak bir merkeziyetsiz uygulamanın genel işlevselliği için kritik olan _özel fonksiyonlar_ da vardır. Örnekler arasında, kullanıcılar için periyodik olarak yeni NFT'ler basan bir `mintERC721Token()` fonksiyonu, bir tahmin piyasasında ödemeleri ödüllendirme fonksiyonu veya bir DEX'te stake edilmiş tokenlerin kilidini açma fonksiyonu bulunur.

Geliştiricilerin bu gibi fonksiyonları, uygulamalarının sorunsuz şekilde çalışabilmesi için aralıklı olarak tetiklemeleri gerekir. Bununla birlikte, bu durum geliştiriciler için sıradan görevlerde daha fazla saat kaybedilmesine sebep olabilir, bu yüzden akıllı sözleşmelerin yürütülmesini otomatik hale getirme fikri ilgi çekicidir.

Bazı merkeziyetsiz kâhin ağları, zincir dışı kâhin düğümlerinin kullanıcı tarafından tanımlanan parametrelere göre akıllı sözleşme fonksiyonlarını tetiklemesine olanak tanıyan otomasyon hizmetleri sunar. Bu, tipik olarak hedef sözleşmeyi kâhin ağına "kaydetmeyi", kâhin operatörüne ödeme yapmak için fon sağlamayı ve sözleşmenin tetikleneceği şartları ya da zamanları belirtmeyi gerektirir.

Chainlink'in [Keeper Ağı](https://chain.link/keepers), akıllı sözleşmelerin düzenli bakım görevlerini güveni en aza indirilmiş ve merkeziyetsiz bir şekilde dış kaynaklardan sağlamaları için seçenekler sunar. Sözleşmenizi Keeper uyumlu hale getirme ve Upkeep hizmetini kullanma hakkında bilgi için resmi [Keeper belgelerini](https://docs.chain.link/docs/chainlink-keepers/introduction/) okuyun.

## Blokzincir kâhinleri nasıl kullanılır {#use-blockchain-oracles}

Ethereum merkeziyetsiz uygulamanıza entegre edebileceğiniz birden fazla kâhin uygulaması mevcuttur:

**[Chainlink](https://chain.link/)** - _Chainlink merkeziyetsiz kâhin ağları, herhangi bir blokzincirdeki gelişmiş akıllı sözleşmeleri desteklemek için kurcalamaya karşı korumalı girdiler, çıktılar ve hesaplamalar sağlar._

**[RedStone Oracles](https://redstone.finance/)** - _RedStone, gaz optimizasyonlu veri akışları sağlayan merkeziyetsiz modüler bir kâhindir. _Likit stake tokenleri (LST'ler), likit yeniden stake tokenleri (LRT'ler) ve Bitcoin stake türevleri gibi gelişmekte olan varlıklar için fiyat beslemeleri sunma konusunda uzmanlaşmıştır._

**[Chronicle](https://chroniclelabs.org/)** - _Chronicle, gerçekten ölçeklenebilir, uygun maliyetli, merkeziyetsiz ve doğrulanabilir kâhinler geliştirerek verileri zincir üstünde aktarmanın mevcut sınırlamalarının üstesinden gelir._

**[Witnet](https://witnet.io/)** - _Witnet, akıllı sözleşmelerin güçlü kripto-ekonomik garantilerle gerçek dünya olaylarına tepki vermesine yardımcı olan izinsiz, merkeziyetsiz ve sansüre dayanıklı bir kâhindir._

**[UMA Oracle](https://uma.xyz)** - _UMA'nın iyimser kâhini, akıllı sözleşmelerin sigorta, finansal türevler ve tahmin piyasaları dahil olmak üzere farklı uygulamalar için her türlü veriyi hızlı bir şekilde almasını sağlar._

**[Tellor](https://tellor.io/)** - _Tellor, akıllı sözleşmenizin ihtiyaç duyduğu her an herhangi bir veriyi kolayca alması için şeffaf ve izinsiz bir kâhin protokolüdür._

**[Band Protocol](https://bandprotocol.com/)** - _Band Protocol, gerçek dünya verilerini ve API'lerini toplayan ve akıllı sözleşmelere bağlayan zincirler arası bir veri kâhini platformudur._

**[Pyth Network](https://pyth.network/)** - _Pyth ağı, kurcalamaya karşı dayanıklı, merkeziyetsiz ve kendi kendine yeten bir ortamda sürekli gerçek dünya verilerini zincir üstünde yayınlamak için tasarlanmış birinci taraf bir finansal kâhin ağıdır._

**[API3 DAO](https://www.api3.org/)** - _API3 DAO, akıllı sözleşmeler için merkeziyetsiz bir çözümde daha fazla kaynak şeffaflığı, güvenlik ve ölçeklenebilirlik sunan birinci taraf kâhin çözümleri sunar_

**[Supra](https://supra.com/)** - Tüm blokzincirleri, halka açık (L1'ler ve L2'ler) veya özel (işletmeler) birbirine bağlayan, zincir üstü ve zincir dışı kullanım durumları için kullanılabilecek merkeziyetsiz kâhin fiyat akışları sağlayan, dikey olarak entegre edilmiş bir zincirler arası çözüm araç takımıdır.

**[Gas Network](https://gas.network/)** - Blokzincir genelinde gerçek zamanlı gaz fiyatı verileri sağlayan dağıtık bir kâhin platformu. Gas Network, önde gelen gaz fiyatı veri sağlayıcılarından zincir üstü veriler getirerek birlikte çalışabilirliği artırmaya yardımcı olur. Gas Network, Ethereum Ana Ağı ve birçok önde gelen L2 dahil olmak üzere 35'ten fazla zincir için veriyi destekler.

## Daha fazla kaynak {#further-reading}

**Makaleler**

- [Blokzincir Kâhini Nedir?](https://chain.link/education/blockchain-oracles) — _Chainlink_
- [Blokzincir Kâhini Nedir?](https://medium.com/better-programming/what-is-a-blockchain-oracle-f5ccab8dbd72) — _Patrick Collins_
- [Merkeziyetsiz Kâhinler: kapsamlı bir genel bakış](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) — _Julien Thevenard_
- [Ethereum'da Bir Blokzincir Kâhini Uygulamak](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [Akıllı sözleşmeler neden API çağrıları yapamaz?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) — _StackExchange_
- [Yani bir fiyat kâhini kullanmak istiyorsunuz](https://samczsun.com/so-you-want-to-use-a-price-oracle/) — _samczsun_

**Videolar**

- [Kâhinler ve Blokzincir Faydasının Genişlemesi](https://youtu.be/BVUZpWa8vpw) — _Real Vision Finance_

**Öğreticiler**

- [Solidity'de Ethereum'un Güncel Fiyatı Nasıl Alınır](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) — _Chainlink_
- [Kâhin Verilerini Tüketme](https://docs.chroniclelabs.org/Developers/tutorials/Remix) — _Chronicle_

**Örnek projeler**

- [Solidity'de Ethereum için Tam Chainlink başlangıç projesi](https://github.com/hackbg/chainlink-fullstack) — _HackBG_
