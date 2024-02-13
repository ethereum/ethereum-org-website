---
title: Oracles
description: Kâhinler, Ethereum akıllı sözleşmelerine gerçek dünya verilerine erişim olanağı sunarak daha fazla kullanım alanının ve kullanıcılar için daha büyük değerlerin kilidini açar.
lang: tr
---

Kâhinler, blokzincir harici (zincir dışındaki) veri kaynaklarından veri çeken ve bu verileri, akıllı sözleşmelerin kullanımı için blokzincire (zincir üstüne) yerleştiren veri akışlarıdır. Bu, Ethereum'da çalışan akıllı sözleşmeler blokzincir ağı dışında depolanan verilere erişemediği için gereklidir.

Akıllı sözleşmelere zincir dışı veri girdilerini kullanarak yürütme olanağı tanımak, merkeziyetsiz uygulamaların değerini artırır. Örneğin merkeziyetsiz tahmin piyasaları, kullanıcı tahminlerini doğrulayabilecekleri çıktılar hakkında bilgi sağlamak için kâhinlere güvenir. Alice'in, bir sonraki ABD başkanının kim olacağına dair 20 ETH bahis oynadığını varsayalım. Bu durumda, tahmin piyasası merkeziyetsiz uygulamasının seçim sonuçlarını onaylamak ve Alice'in ödeme almak için uygun olup olmadığını belirleyebilmek için bir kâhine ihtiyacı vardır.

## Ön koşullar {#prerequisites}

Bu sayfa, okuyucunun [düğümler](/developers/docs/nodes-and-clients/), [mutabakat mekanizmaları](/developers/docs/consensus-mechanisms/) ve [Ethereum Sanal Makinesi](/developers/docs/evm/) dahil olmak üzere Ethereum'un temellerine aşina olduğunu varsayar. Ayrıca [akıllı sözleşmelere](/developers/docs/smart-contracts/), [akıllı sözleşme anatomisine](/developers/docs/smart-contracts/anatomy/) ve özellikle de [olaylara](/glossary/#events) hakim olmalısınız.

## Blokzincir kâhini nedir? {#what-is-a-blockchain-oracle}

Kâhinler; harici bilgileri (yani zincir dışında depolanan bilgiler) tedarik eden, doğrulayan ve blokzincirde çalışan akıllı sözleşmelere ileten uygulamalardır. Kâhinler, zincir dışındaki verileri "çekip" Ethereum'da yayımlamanın dışında bilgileri blokzincirden alıp harici sistemlere de "iletebilir". İkinci kullanıma bir örnek, kullanıcının ücretini Ethereum üzerinden göndermesinin ardından akıllı kilidi açan bir kâhin olabilir.

Kâhinler, blokzincirlerdeki akıllı sözleşmeleri zincir dışındaki veri sağlayıcılarına bağlayan bir "köprü" görevi görür. Kâhinler olmadan akıllı sözleşme uygulamaları sadece zincir üstündeki verilere erişebilir. Kâhin, zincir dışındaki verileri kullanarak akıllı sözleşme işlevlerinin tetiklenmesini sağlayan bir mekanizma sunar.

Kâhinler, veri kaynağına ( bir veya birden fazla kaynak) güven modellerine (merkezi ya da merkeziyetsiz) ve sistem mimarisine (hemen-okuma, yayımlama-abone olma ve istek-yanıt) göre farklılık gösterir. Ayrıca kâhinleri zincir üstündeki sözleşmeler (girdi kâhinleri) tarafından kullanılmak üzere harici veri alıp almadıklarına, blokzincirden zincir dışındaki uygulamalara (çıkış kâhinleri) bilgi gönderip göndermemelerine veya zincir dışında hesaplama gerçekleştirip gerçekleştirmemelerine (hesaplama kâhinleri) dayalı olarak da birbirinden ayırabiliriz.

## Akıllı sözleşmelerin neden kâhinlere ihtiyacı vardır? {#why-do-smart-contracts-need-oracles}

Geliştiricilerin çoğu, akıllı sözleşmeleri blokzincir üzerinde spesifik adreslerde çalışan basit kod parçaları olarak görür. Bununla birlikte, akıllı sözleşmelere ilişkin daha [genel bir görüş](/smart-contracts/); belirli koşullar yerine getirildiğinde taraflar arasındaki anlaşmaları yürürlüğe koyabilen, kendi kendini yürüten yazılım programları olduğu şeklindedir ve "akıllı sözleşmeler" terimi de buradan gelir.

Ancak akıllı sözleşmelerin insanlar arasında anlaşmaları yürürlüğe koymak amacıyla kullanımı, Ethereum'un belirleyici olduğu göz önüne alındığında oldukça karmaşıktır. Bir [belirleyici sistem](https://en.wikipedia.org/wiki/Deterministic_algorithm), başlangıç durumu ve belirli bir girdi verildiğinde her zaman aynı sonuçları üreten sistemdir; girdilerden çıktıları hesaplama sürecinde rastgelelik veya değişkenlik yoktur.

Belirleyici yürütme elde etmek için blokzincir, düğümleri _sadece_ blokzincir üzerinde depolanan verileri kullanarak basit ikili (doğru/yanlış) sorularda mutabakata varmakla sınırlandırır. Bu soruların örnekleri aşağıdaki gibidir:

- ''Hesap sahibi (açık anahtar ile kimliği belirlenen) bu işlemi eşlenmiş özel anahtar ile imzaladı mı?''
- ''Bu hesap, işlemi karşılayabilmek için yeterli fona sahip mi?''
- ''Bu işlem, bu akıllı sözleşme bağlamında geçerli mi?'' vb.

Blokzincir bilgiyi dış kaynaklardan (örneğin gerçek dünyadan) edinmişse belirleyiciliğe ulaşmak, blok zincir durumundaki değişikliklerin doğruluğu üzerinde düğümlerin hemfikir olmasını engelleyeceğinden imkansız hale gelecektir. Örnek olarak, geleneksel fiyat API'sinden şu anki ETH-USD takas fiyatına dayalı bir işlemi yürüten bir akıllı sözleşmeyi ele alalım. Bu rakam, büyük olasılıkla sık sık değişecektir (API'nin kullanımdan kaldırılma veya hacklenme olasılığı da mevcuttur). Bir başka ifadeyle, aynı sözleşme kodunu yürüten düğümler, farklı sonuçlara ulaşacaktır.

İşlem yürüten dünya çapında binlerce düğüme sahip Ethereum gibi açık bir blokzincir için belirleyicilik hayati önemdedir. Doğru bilgi kaynağı olarak görev yapan merkezi bir otoritenin olmaması nedeniyle düğümlerin, aynı işlemleri uyguladıktan sonra aynı duruma varmaları beklenir. Düğüm A'nın bir akıllı sözleşme kodunu yürütüp sonuç olarak "3" aldığı, ancak aynı işlemi yürüten düğüm B'nin "7" aldığı bir durum, mutabakatın çözülmesine ve Ethereum'un merkezi olmayan bir hesaplama platformu olarak değerini yitirmesine neden olabilir.

Daha önce açıklanan senaryo, harici kaynaklardan bilgi çeken blokzincirler tasarlama sorununa da işaret etmektedir. Ancak kâhinler bu sorunu, bilgiyi zincir dışındaki kaynaklardan alıp akıllı sözleşmelerin tüketmesi için blokzincirde depolayarak çözer. Zincir üstünde depolanan bilgi değiştirilemez ve açıkça erişilebilir olduğundan Ethereum düğümleri, mutabakatı bozmadan durum değişimlerini işlemek için içeri aktarılmış zincir dışı verileri güvenilir şekilde kullanabilir.

Bunu yapmak için kâhin, tipik olarak zincir üstünde yürütülen bir akıllı sözleşmeden ve bazı zincir dışı unsurlardan oluşturulur. Zincir üstündeki sözleşme, diğer akıllı sözleşmelerden veri istekleri alır ve zincir dışındaki bileşene (kâhin düğümü olarak isimlendirilir) aktarır. Bu kâhin düğümü, veri kaynaklarını sorgulayabilir (örneğin uygulama programlama arayüzleri (API) kullanarak) ve istenen verileri akıllı sözleşmenin deposunda saklamak için işlemler gönderebilir.

Bir blokzincir kâhini, temel olarak blokzincir ile dış çevre arasındaki bilgi açığını ''hibrid akıllı sözleşmeler'' oluşturarak kapatır. Hibrit akıllı sözleşme, zincir üstünde sözleşme kodu ile zincir dışında altyapıların bir kombinasyonuna dayanarak işleyen bir sözleşmedir. Giriş bölümünde açıklanan merkeziyetsiz tahmin piyasaları, hibrit akıllı sözleşmelerin harika bir örneğidir. Diğer örnekler arasında, bir kâhin kümesinin belirli bir hava olayının gerçekleştiğine karar vermesi durumunda ödeme yapan mahsul sigortası akıllı sözleşmeleri sayılabilir.

## Kâhin sorunu nedir? {#the-oracle-problem}

Akıllı sözleşmelere zincir dışından verilere erişim olanağı sağlamak, bir varlığın (veya birden fazla varlığın) dış kaynaklı bilgileri bir işlemin veri yükünde depolamak suretiyle bu bilgileri blokzincire dahil ederek kolaylıkla gerçekleştirilebilir. Ancak bu, yeni sorunları beraberinde getirir:

- İçeriye aktarılan bilginin doğru kaynaktan alınıp alınmadığını ya da bu bilgi üzerinde oynanıp oynanmadığını nasıl doğrularız?

- Bu verinin her zaman kullanılabilir olduğundan ve düzenli olarak güncellendiğinden nasıl emin olabiliriz?

''Kâhin sorunu", akıllı sözleşmelere girdi göndermek için blokzincir kâhinleri kullanımıyla birlikte gelen sorunları ortaya koyar. Bir kâhinden gelen bilginin doğruluğundan veya akıllı sözleşme yürütmesinin kusursuz sonuçlar üreteceğinden emin olabilmek açısından hayati öneme sahiptir. Bir başka önemli nokta ise güven gerektirmezliktir; kâhin operatörlerinein güvenilir olarak doğru veri sağlayacağına "güvenmek" zorunda olmak, akıllı sözleşmelerin onları en iyi açıklayan niteliklerinin çoğunun kaybına neden olur.

Farklı kâhinler, kâhin sorununun çözümüne farklı yaklaşımlar gösterir; bu yaklaşımları daha sonra keşfedeceğiz. Hiçbir kâhin mükemmel olmadığı için bir kâhinin yararları aşağıdaki zorluklarla nasıl baş ettiğine dayalı olarak ölçülebilir:

1. **Doğruluk**: Bir kâhin, akıllı sözleşmelerin geçersiz zincir dışı verilere dayanarak durum değişikliklerini tetiklemesine neden olmamalıdır. Bu sebeple bir kâhin, verilerin _orijinalliğini_ ve _bütünlüğünü_ garanti etmek zorundadır. Bütünlük, zincir üstünde gönderilmeden önce verinin sağlam (örneğin değiştirilmemiş) kalması anlamına gelirken doğrulama, verinin doğru kaynaktan edinildiği anlamını taşır.

2. **Kullanılabilirlik**: Bir kâhin, akıllı sözleşmelerin eylem yürütmelerini ve durum değişliklerini tetiklemelerini engellememeli veya geciktirmemelidir. Bu nitelik, kâhinden elde edilen verinin kesintisiz bir biçimde _istek üzerine kullanılabilir_ olmasını gerektirir.

3. **Teşvik uyumluluğu**: Bir kâhin, zincir dışı veri sağlayıcılarını akıllı sözleşmelere doğru bilgi göndermeye teşvik etmelidir. Teşvik uyumluluğu, _dayandırılabilirlik_ ve _hesap verebilirlik_ unsurlarını içerir. Dayandırılabilirlik, harici bir bilgi parçasını sağlayıcısıyla ilişkilendirmeye olanak tanırken hesap verebilirlik, veri sağlayıcılarını verdikleri bilgiye bağlar; böylece sağladıkları bilginin kalitesine göre ödüllendirilebilecekleri veya cezalandırılabilecekleri bir yapı oluşturur.

## Blokzincir kâhin hizmeti nasıl çalışır? {#how-does-a-blockchain-oracle-service-work}

### Kullanıcılar {#users}

Kullanıcılar, belirli aksiyonları tamamlayabilmek için blokzincir dışı bilgiye ihtiyaç duyan varlıklardır (örneğin akıllı sözleşmeler). Bir kâhin hizmetinin temel iş akışı, kullanıcının kâhin sözleşmesine veri isteği göndermesiyle başlar. Veri istekleri genellikle aşağıdaki soruların bazılarını veya tamamını cevaplar:

1. İstenen bilgi için zincir dışı düğümler hangi kaynaklara danışabilir?

2. Raporlayıcılar, veri kaynaklarından gelen veriyi nasıl işler ve kullanışlı veri noktalarını nasıl çıkartır?

3. Verilarin alınmasında kaç kâhin düğümü yer alabilir?

4. Kâhin raporlarındaki uyumsuzluklar nasıl yönetilmelidir?

5. Gönderimleri süzmek ve raporları tek bir değerde toplamak için hangi yöntem uygulanmalıdır?

### Kâhin sözleşmesi {#oracle-contract}

Kâhin sözleşmesi, kâhin hizmetinin zincir üstü bileşenidir; diğer sözleşmelerden gelen veri isteklerini dinler, veri sorgulamalarını kâhin düğümlerine aktarır ve geri gelen verileri müşteri sözleşmelerinde yayımlar. Bu sözleşme, döndürülen veri noktalarında bazı hesaplamalar yaparak isteyen sözleşmeye göndermek üzere toplu bir değer de üretebilir.

Kâhin sözleşmesi, müşteri sözleşmelerinin veri isteği yaparken çağırdığı bazı fonksiyonları açığa çıkarır. Yeni bir sorgulama alındığında akıllı sözleşme, veri isteğinin detaylarını içeren bir [günlük olayı](/developers/docs/smart-contracts/anatomy/#events-and-logs) yayar. Bu, günlüğe abone olmuş zincir dışındaki düğümleri (genellikle JSON-RPC `eth_subscribe` komutu gibi bir komut kullanarak) bilgilendirir ve ardından bu düğümler günlük olayında tanımlanan verileri alır.

Aşağıda, Pedro Costa tarafından hazırlanmış [örnek kâhin sözleşmesini](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) bulabilirsiniz. Bu, diğer akıllı sözleşmelerin istekleri doğrultusunda zincir dışı API'leri sorgulayan ve istenen bilgiyi blokzincir üzerinde depolayan basit bir kâhin hizmetidir:

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //list of requests made to the contract
  uint currentId = 0; //increasing request id
  uint minQuorum = 2; //minimum number of responses to receive before declaring final result
  uint totalOracleCount = 3; // Hardcoded oracle count

  // defines a general api request
  struct Request {
    uint id;                            //request id
    string urlToQuery;                  //API url
    string attributeToFetch;            //json attribute (key) to retrieve in the response
    string agreedValue;                 //value from key
    mapping(uint => string) answers;     //answers provided by the oracles
    mapping(address => uint) quorum;    //oracles which will query the answer (1=oracle hasn't voted, 2=oracle has voted)
  }

  //event that triggers oracle outside of the blockchain
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  //triggered when there's a consensus on the final result
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

    // Hardcoded oracles address
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // launch an event to be detected by oracle outside of blockchain
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // increase request id
    currentId++;
  }

  //called by the oracle to record its answer
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    //check if oracle is in the list of trusted oracles
    //and if the oracle hasn't voted yet
    if(currRequest.quorum[address(msg.sender)] == 1){

      //marking that this address has voted
      currRequest.quorum[msg.sender] = 2;

      //iterate through "array" of answers until a position if free and save the retrieved value
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        //find first empty slot
        if(bytes(currRequest.answers[tmpI]).length == 0){
          found = true;
          currRequest.answers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //iterate through oracle list and check if enough oracles(minimum quorum)
      //have voted the same answer has the current one
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

Kâhin düğümü, kâhin hizmetinin zincir dışı unsurudur; üçüncül partilerde kurulmuş API'ler gibi dış kaynaklardan bilgi çeker ve bu bilgileri, akıllı sözleşmelerin tüketimi için zincir üzerine yerleştirir. Kâhin düğümleri, zincir üstündeki kâhin sözleşmelerinden gelen olayları dinler ve günlükte açıklanan görevi tamamlama aşamasına geçer.

Kâhin düğümleri için yaygın bir görev; bir API hizmetine [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp) isteği yollaması, ilgili veriyi çekmek için yanıtı ayrıştırması, blokzincir tarafından okunabilir bir çıktı haline getirmesi ve kâhin sözleşmesi yürütmesine ekleyerek zincir üstünde yollamasıdır. Kâhin düğümü ayrıca, daha sonra keşfedeceğimiz ''özgünlük kanıtları'' kullanılarak kaydedilmiş bilginin bütünlüğünü ve doğruluğunu sorgulamak için gerekli olabilir.

Hesaplama kâhinleri ayrıca, gaz masrafı ve blok hacim sınırlamaları göz önüne alındığında zincir üstünde yürütmesi kullanışsız olacak yoğun hesaplama görevlerinin yerine getirilmesi için zincir dışı düğümlere güvenir. Örneğin kâhin düğümü, kanıtlanabilir rastgele bir figürü (örneğin blokzincir tabanlı oyunlar için) oluşturmakla görevlendirilebilir.

## Kâhin tasarım kalıpları {#oracle-design-patterns}

Kâhinler, _anında okuma_, _yayımlama-abonelik_ ve _istek-yanıt_ gibi farklı türlerde olur; bunların ikincisi ve üçüncüsü Ethereum akıllı sözleşmeleri arasında en popüler olanlarıdır. Aşağıda, iki tür kâhin hizmetine ilişkin kısa bir açıklama bulunmaktadır:

### Yayımlama-abonelik kâhinleri {#publish-subscribe-oracles}

Bir yayımlama-abonelik mekanizması üzerine kurulu kâhin hizmeti, diğer sözleşmelerin düzenli olarak bilgi almak için "veri akışını" kullanmasını sağlar. Bu durumdaki verinin sık sık değişmesi beklenir, bu nedenle istemci sözleşmelerinin, kâhinin depolamasındaki verilerde yapılacak güncellemelerini dinlemesi gerekir. Kullanıcılara en son ETH-USD fiyat bilgisini sağlayan bir kâhin, bu konuda harika bir örnektir.

### İstek-yanıt kâhinleri {#request-response-oracles}

Bir istek-yanıt kurulumu, istemci sözleşmesinin yayımlama-abonelik kâhini tarafından sağlanmış olan veri dışındaki keyfi verileri de talep edebilmesini sağlar. İstek-yanıt kâhinleri aşağıdaki durumlar için idealdir:

- Veri kümesinin bir akıllı sözleşmenin depolamasında depolanabilmek için çok büyük olduğu durumlar

- Kullanıcıların sürecin herhangi bir noktasında verinin sadece küçük bir kısmına ihtiyaç duyacağı durumlar

Yayımlama-abonelik modellerinden daha karmaşık olsa da, istek-yanıt kâhinleri basitçe önceki bölümde anlattığımız şeydir. Kâhinin veri taleplerini alan ve işlenmeleri için zincir dışında bir düğüme gönderen bir zincir üstü bileşeni olacaktır.

Veri sorgulamaları başlatan kullanıcılar, zincir dışı kaynaktan bilgi alma maliyetini karşılamak zorundadır. Ayrıca istemci sözleşmesinin, kâhin sözleşmesinin istekte belirtilen geri çağırma fonksiyonu aracılığıyla gelen cevabı döndürmesiyle ortaya çıkan gaz maliyetlerini de karşılaması gerekecektir.

## Kâhin türleri {#types-of-oracles}

### Merkezi kâhinler {#centralized-oracles}

Merkezi kâhin, zincir dışı bilgiyi toplamaktan ve kâhinin sözleşme verilerini talebe göre güncellemekten sorumlu olan tek bir varlık tarafından kontrol edilir. Merkezi kâhinler tek bir doğruluk kaynağına dayandıkları için verimlidir. Sahipli veri kümelerinin doğrudan sahipleri tarafından geniş çapta kabul gören bir imza ile yayımlandığı durumlarda bile tercih edilebilirler. Bununla birlikte, merkezi kâhin kullanmak çeşitli sorunları da beraberinde getirir.

#### Düşük doğruluk garantileri {#low-correctness-guarantees}

Merkezi kâhinler söz konusu olduğunda sağlanan bilginin doğru olup olmadığını onaylamanın bir yolu yoktur. Kâhin sağlayıcı "saygın" olabilir ancak bu birilerinin hırsızlık yapması ya da bir hacker'ın sistemi kurcalaması ihtimallerini ortadan kaldırmaz. Kâhin yozlaşmış bir hale gelirse, akıllı sözleşmeler kötü veriler üzerinde çalışacaktır.

#### Yetersiz kullanılabilirlik {#poor-availability}

Merkezi kâhinler zincir dışı verilerin diğer akıllı sözleşmeler için erişilebilir kılınmasını her zaman garanti etmez. Sağlayıcı servisi kapatmaya karar verirse ya da bir hacker kâhinin zincir dışı bileşenini ele geçirirse, akıllı sözleşmeniz bir hizmet reddi saldırısına (DoS) maruz kalma riski altında olur.

#### Zayıf teşvik uyumluluğu {#poor-incentive-compatibility}

Merkezi kâhinler genellikle kötü tasarlanmıştır veya veri sağlayıcının doğru/değiştirilmemiş bilgi göndermesi için var olmayan teşviklere sahiptir. Kâhine hizmetleri için ödeme yapmak dürüst davranışı teşvik edebilir, ancak bu yeterli olmayabilir. Büyük miktarda değeri kontrol eden akıllı sözleşmelerle, kâhin verisini manipüle etmenin getirisi her zamankinden daha fazladır.

### Merkezi olmayan kâhinler {#decentralized-oracles}

Merkezi olmayan kâhinler, tek başarısızlık noktalarını ortadan kaldırarak merkezi kâhinlerin tabi olduğu sınırlamaların üstesinden gelmek için tasarlanmıştır. Merkezi olmayan bir kâhin hizmeti, zincir dışı verileri bir akıllı sözleşmeye göndermeden önce üzerinde mutabakat sağlayan eşler arası bir ağdaki birden çok katılımcıyı içerir.

Merkezi olmayan bir kâhin (ideal olarak) izin ve güven gerektirmez olmalı ve merkezi bir tarafın idaresine dayalı olmamalıdır; gerçekte, kâhinler arasında merkeziyetsizlik bir spektrumun farklı bölgelerindedir. Herkesin katılabileceği yarı merkeziyetsiz kâhin ağları olsa da, bu ağlarda düğümleri geçmiş performansa göre onaylayan ve kaldıran bir "sahip" vardır. Tamamen merkeziyetsiz kâhin ağları da mevcuttur: bunlar genellikle bağımsız blokzincirler olarak çalışır ve düğümleri koordine etmek ve kötü davranışları cezalandırmak için tanımlanmış mutabakat mekanizmalarına sahiptir.

Merkezi olmayan kâhinleri kullanmak aşağıdaki faydaları beraberinde getirir:

### Yüksek doğruluk garantileri {#high-correctness-guarantees}

Merkezi olmayan kâhinler, veri doğruluğunu farklı yaklaşımlar kullanarak elde etmeye çalışır. Buna, geri döndürülen bilginin özgünlüğünü ve bütünlüğünü tasdikleyecek kanıtlar kullanmak ve birden çok şahsın zincir dışı verinin doğruluğu üzerinde anlaşmasını şart koşmak dahildir.

#### Özgünlük kanıtları {#authenticity-proofs}

Özgünlük kanıtları, dış kaynaklardan alınan bilginin bağımsız doğrulamasını mümkün kılan kriptografik mekanizmalardır. Bu kanıtlar, bilginin kaynağını doğrulayabilir ve alımdan sonra veri üzerindeki muhtemel oynamaları tespit edebilir.

Özgünlük kanıtlarının örnekleri şunlardır:

**Taşıma Katmanı Güvenliği (TLS) kanıtları**: Kâhin düğümleri genelde dış kaynaklardan Taşıma Katmanı Güvenliği (TLS) protokolü tabanlı bir güvenli HTTP bağlantısı kullanarak veri alır. Bazı merkeziyetsiz kâhinler TLS oturumlarını doğrulamak (yani bir düğüm ile spesifik bir sunucu arasındaki bilgi aktarımını onaylamak) için özgünlük kanıtları kullanır ve oturumun içerikleriyle oynanmadığını onaylar.

**Güvenilir Yürütme Ortamı (TEE) tasdikleri**: [Güvenilir yürütme ortamı](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE), barındığı sistemin operasyonel süreçlerinden izole edilmiş kum havuzu tabanlı bir bilgi işlem ortamıdır. TEE'ler bilgi işlem ortamında depolanan/kullanılan herhangi bir uygulama kodunun veya verinin bütünlüğünü, gizliliğini ve değiştirilemezliğini sağlar. Kullanıcılar ayrıca bir uygulamanın güvenilir yürütme ortamının içinde çalıştığını kanıtlayan bir tasdik oluşturabilirler.

Merkezi olmayan kâhinlerin belirli sınıfları, kâhin düğümü operatörlerinin TEE tasdikleri sağlamasını gerektirir. Bu, bir kullanıcı için düğüm operatörünün kâhin istemcisinin bir örneğini güvenilir yürütme ortamında çalıştırdığını doğrular. TEE'ler dış süreçlerin bir uygulamanın kodunu ve verilerini değiştirmesini veya okumasını önler; dolayısıyla bu tasdikler, kâhin düğümünün bilgiyi bütün ve gizli tuttuğunu kanıtlar.

#### Bilginin mutabakata dayalı olarak doğrulanması {#consensus-based-validation-of-information}

Merkezi kâhinler akıllı sözleşmelere veri sağlarken tek bir doğruluk kaynağına güvenirler, bu da isabetsiz bilgilerin yayınlanma ihtimalini ortaya çıkarır. Merkezi olmayan kâhinler bu sorunu zincir dışı bilgiyi sorgulamak için birden fazla kâhin düğümüne dayanarak çözerler. Merkezi olmayan kâhinler, birden fazla kaynaktan alınan verileri karşılaştırarak zincir üzerindeki sözleşmelere geçersiz bilgiler sağlanma riskini düşürür.

Ancak merkezi olmayan kâhinler, birden fazla zincir dışı kaynaktan alınan bilgilerdeki uyumsuzlukların üstesinden gelmek zorundadır. Bilgideki farklılıkları minimize etmek ve kâhin sözleşmesine aktarılan verinin kâhin düğümlerinin müşterek fikrini yansıtmasını sağlamak için merkezi olmayan kâhinler şu mekanizmaları kullanır:

##### Verilerin doğruluğu üzerine oylama/hisseleme

Bazı merkezi olmayan kâhin ağları, ağın yerel jetonlarını kullanarak katılımcıların veri sorgularına verilen yanıtların doğruluğu konusunda (örneğin, "2020 ABD seçimlerini kim kazandı?") oy vermesini veya üzerine oynamasını gerektirir. Bir birleştirme protokolü, daha sonra oyları ve hisseleri birleştirip çoğunluk tarafından desteklenen cevabı geçerli olarak kabul eder.

Çoğunluk cevabından sapan cevaplara sahip olan düğümler, jetonları daha doğru değerler sağlayanlara dağıtılarak cezalandırılır. Düğümleri veri sağlamadan önce bir bono sağlamaya zorlamak, gelirleri en yüksek seviyeye çıkarmaya çalışan rasyonel ekonomik aktörler olarak varsayıldıkları için dürüst cevapları teşvik eder.

Hisseleme/oylama, merkezi olmayan kâhinleri kötü niyetli aktörlerin mutabakat sistemini kandırmak için birden fazla kimlik oluşturduğu "Sybil saldırıları"ndan da korur. Ancak hisseleme, "avantacılığı" (başkalarından bilgi kopyalayan kâhin düğümlerini) ve "tembel doğrulamayı" (kendileri bilgiyi doğrulamadan çoğunluğu takip eden kâhin düğümlerini) önleyemez.

##### Schelling noktası mekanizmaları

[Schelling noktası](<https://en.wikipedia.org/wiki/Focal_point_(game_theory)>), bir sorunla ilgili olarak birden çok varlığın iletişim yokluğunda her zaman ortak bir çözüme varacağını varsayan bir oyun teorisi konseptidir. Schelling noktası mekanizmaları, merkezi olmayan kâhin ağlarında genellikle düğümlerin veri isteklerine verilen cevaplarda mutabakata ulaşmasını sağlamak için kullanılır.

Bunun ilk örneklerinden biri, katılımcıların bir yatırma ile beraber "sayıl" sorulara (cevapları büyüklük ile açıklanan sorular, örn. "ETH'nin fiyatı nedir?") cevaplar gönderdiği önerilen bir veri akışı olan [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/)'dir. 25. ile 75. [yüzdelikler](https://en.wikipedia.org/wiki/Percentile) arasında değerler sağlayan kullanıcılar ödüllendirilirken, değerleri ortalama değerden büyük ölçüde sapanlar ise cezalandırılır.

SchellingCoin günümüzde var olmasa da, çok sayıda merkezi olmayan kâhin, özellikle [Maker Protokolü Kâhinleri](https://docs.makerdao.com/smart-contract-modules/oracle-module) schelling noktası mekanizmasını kâhin verilerinin doğruluğunu artırmak amacıyla kullanır. Her Maker Kâhini teminat varlıkları için piyasa fiyatlarını bildiren bir zincir dışı P2P düğümleri ağından ("aktarıcılar" ile "akışlar") ve sağlanan tüm değerlerin ortalamasını hesaplayan bir zincir üzeri "Ortalayıcı" sözleşmesinden oluşur. Belirtilen gecikme süresi bittikten sonra bu ortalama değer, ilgili varlık için yeni referans değeri olur.

Schelling noktası mekanizmalarını kullanan diğer kâhin örnekleri arasında [Chainlink Zincir Dışında Raporlama](https://docs.chain.link/docs/off-chain-reporting/) ve Witnet yer alır. İki sistemde de eşler arası ağdaki kâhin düğümlerinden gelen cevaplar ortalama veya orta gibi tek bir toplu değerde birleştirilir. Düğümler cevaplarının toplam değer ile ne kadar uyumlu olduğuna veya bu değerden ne kadar saptığına göre ödüllendirilir veya cezalandırılırlar.

Schelling noktası mekanizmaları, zincir üzerindeki ayak izini minimize ederken (tek bir işlem gönderilmesi gerekir) aynı anda merkeziyetsizliği de garanti ettikleri için çekicidir. İkincisi, gönderilen cevaplar listesindeki düğümlerin orta/ortalama değeri oluşturan algoritmaya aktarılmadan önce tamamlanması gerektiği için mümkündür.

### Kullanılabilirlik {#availability}

Merkezi olmayan kâhin hizmetleri, akıllı sözleşmelere yüksek zincir dışı veri kullanılabilirliği sağlar. Bu, hem zincir dışı bilgi kaynağının hem de bilgiyi zincir üstünde aktarmaktan sorumlu olan düğümlerin merkeziyetsizleştirilmesi ile gerçekleşir.

Kâhin sözleşmesi diğer sözleşmelerden sorgular yürütmek için birden fazla düğüme dayandığından (ayrıca birden çok veri kaynağına da dayanır) hata toleransı da sağlanmış olur. Kaynak _ve_ düğüm operatörü seviyesinde merkeziyetsizlik önemlidir; aynı kaynaktan sağlanan bilgiyi sunan kâhin düğümlerinden oluşan bir ağ, merkezi bir kâhin ile aynı sorunla karşılaşacaktır.

Aynı zamanda hisse tabanlı kâhinlerin veri isteklerine çabuk cevap veremeyen düğüm operatörlerini kesmesi de mümkündür. Bu, kâhin düğümlerinin hata toleransı altyapısına yatırım yapmasını ve zamanında veri sağlamasını önemli ölçüde teşvik eder.

### İyi teşvik uyumluluğu {#good-incentive-compatibility}

Merkezi olmayan kâhinler, kâhin düğümleri arasında [Bizans](https://en.wikipedia.org/wiki/Byzantine_fault) davranışını önlemek için çeşitli teşvik tasarımları uygular. Özellikle, _dayandırılabilirlik_ ve _hesap verebilirliğe_ sahiptirler:

1. Merkezi olmayan kâhin düğümlerinin genelde veri isteklerine karşı cevap olarak sağladıkları verileri imzalamaları gerekir. Bu bilgi, kullanıcıların veri isteklerinde bulunurken güvenilir olmayan düğümleri filtreleyebilmesini sağlamak adına kâhin düğümlerinin geçmiş performansının değerlendirilmesine yardımcı olur. Bunun bir örneği, Witnet'in [Algoritmik İtibar Sistemi](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system)'dir.

2. Merkezi olmayan kâhinler, önceden açıklandığı üzere düğümlerin bildirdikleri verinin doğruluğuna olan güvenleri üzerine bir hisse koymasını gerektirebilir. Eğer iddia doğru çıkarsa, bu hisse dürüst hizmet karşılığı verilen ödüller ile birlikte geri dönebilir. Ancak bilginin yanlış olduğu durumda da kesilebilir, bu da bir ölçüde hesap verilebilirlik sağlar.

## Kâhinlerin akıllı sözleşmelerde uygulama alanları {#applications-of-oracles-in-smart-contracts}

Ethereum'da kâhinler için yaygın kullanım alanları aşağıdadır:

### Finansal verileri alma {#retrieving-financial-data}

[Merkeziyetsiz finans](/defi/) (DeFi) uygulamaları, eşler arası borç verme, borç alma ve varlık takasına olanak tanır. Bu genelde takas oranı verileri (kripto paraların itibari değerlerini hesaplamak ya da iki jetonun fiyatını karşılaştırmak için) ve sermaye piyasaları verilerini (altın ya da Amerikan doları gibi jetonlaştırılmış varlıkların değerlerini hesaplamak için) de kapsayan farklı finansal bilgileri almayı gerektirir.

Bir DeFi borç verme protokolü oluşturmayı planlıyorsanız, örneğin, teminat olarak yatırılmış varlıkların (örn. ETH) güncel piyasa fiyatlarını sorgulamanız gerekecektir. Bunun amacı, akıllı sözleşmenizin teminat varlıklarının değerini ve sistemden ne kadar ödünç alabileceğini belirleyebilmesini sağlamaktır.

DeFi'daki popüler "fiyat kâhinleri" (genelde böyle adlandırılırlar) arasında Chainlink Fiyat Akışları, Compound Protocol’ün [Açık Fiyat Akışı](https://compound.finance/docs/prices), Uniswap’ın [Zaman Ağırlıklı Ortalama Fiyatları (TWAP'lar)](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) ve [Maker Kâhinleri](https://docs.makerdao.com/smart-contract-modules/oracle-module) yer alır. Bu fiyat kâhinleri ile birlikte gelen uyarıları projenize entegre etmeden önce anlamanız tavsiye edilir. Bu [makalede](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/), bahsedilen fiyat kâhinlerinden herhangi birini kullanmayı planlarken nelerin dikkate alınması gerektiği konusunda ayrıntılı bir analiz sunulmaktadır.

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

Blokzincir tabanlı oyunlar veya piyango şemaları gibi belirli blokzincir uygulamalarının etkili bir şekilde çalışması için yüksek düzeyde öngörülemezlik ve rastgelelik gerekir. Fakat blokzincirlerin belirleyici yürütümü, herhangi bir rastgelelik kaynağını ortadan kaldırır.

Genel yaklaşım, `blockhash` gibi yalancı rastgele kriptografik fonksiyonları kullanmaktır ancak bu, iş ispati algoritmasını çözen madenciler olarak adlandırılan [diğer oyuncuların manipülasyonuna](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.) bağımlıdır. Aynı zamanda, Ethereum'un [hisse ispatına geçişi](/roadmap/merge/) de zincir üstünde rastgelelik için geliştiricilerin artık `blockhash`'e güvenemeyeceği anlamına gelir (ancak İşaret Zinciri'nin [RANDAO mekanizması](https://eth2book.info/altair/part2/building_blocks/randomness) alternatif bir rastgelelik kaynağı sunar).

Rastgele değeri zincir dışında oluşturup zincir üstünde göndermek mümkündür, fakat bunu yapmak kullanıcılara yüksek güven gereklilikleri de yükler. Değerin tahmin edilemeyecek mekanizmalarla gerçekten oluşturulduğuna ve geçiş sırasında değiştirilmediğine inanmak zorundadırlar.

Zincir dışında bilgi işlem için tasarlanmış kâhinler bu sorunu, sürecin tahmin edilemezliğini tasdik eden kriptografik kanıtlarla birlikte zincir üstünde yayımladıkları zincir dışı rastgele sonuçları güvenli bir şekilde oluşturarak çözerler. Bunun bir örneği, tahmin edilemez sonuçlara dayanan uygulamalar için güvenilir akıllı sözleşmeler oluşturmak açısından kullanışlı, kanıtlanabilir şekilde adil ve kurcalanamaz bir rastgele sayı oluşturucusu (RNG) olan [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/)'dir (Onaylanabilir Rastgele Fonksiyon). Bir diğer örnek ise, Quantum rastgele sayı oluşturucusu (QRNG) görevi gören[API3 QRNG](https://docs.api3.org/explore/qrng/)'dir. Kuantum fenomeni bazlı herkese açık bir Web3 RNG yöntemidir ve Avustralya Ulusal Üniversitesi'nin (ANU) izniyle hizmet vermektedir.

### Olaylar için sonuçlar alma {#getting-outcomes-for-events}

Kahinler sayesinde gerçek hayat olaylarına tepkiler verebilen bir akıllı sözleşme kolaylıkla oluşturulabilir. Kahin servisleri, sözleşmelerin zincir dışındaki harici API'lere bağlanmasını ve o veri kaynaklarından bilgi toplayabilmesini sağlayarak bunu mümkün kılar. Örnek olarak, daha önceden bahsedilmiş olan tahmin merkeziyetsiz uygulaması, kâhinlerin güvenilir bir zincir dışı kaynaktan (örneğin, Associated Press) seçim sonuçlarını döndürmesini isteyebilir.

Gerçek hayattan alınmış sonuçlara sayalı verileri almak için kâhinleri kullanmak, merkeziyetsiz sigorta uygulamalarını da kapsayan başka yenilikçi kullanım alanlarının da önünü açar. Kullanıcılara ödeme yapan bir sigorta akıllı sözleşmesi, etkin bir şekilde çalışabilmek için doğru bilgiye (hava durumu verileri, felaket raporları vs.) ihtiyaç duyacaktır.

### Akıllı sözleşmeleri otomatikleştirme {#automating-smart-contracts}

Popüler açıklamaların aksine, akıllı sözleşmeler otomatik olarak çalışmaz; sözleşmenin kodunu çalıştırabilmek için bir dışarıdan sahip olunan hesap (EOA) ya da başka bir sözleşme hesabı doğru fonksiyonları tetiklemelidir. Çoğu durumda, sözleşmenin fonksiyonlarının büyük kısmı herkese açıktır ve EOA'lar ve diğer sözleşmeler tarafından çağrılabilir.

Fakat bir sözleşmenin içinde başkaları tarafından erişilebilir olmayan _özel fonksiyonlar_ da vardır ve bunlar genelde merkeziyetsiz uygulamanın genel işlevselliği açısından kritiktir. Potansiyel örnekler arasında kullanıcılar için periyodik olarak yeni NFT'ler basan `mintERC721Token()` fonksiyonu, tahmin piyasasında ödül ödemeleri yapan bir fonksiyon ve bir merkeziyetsiz borsada hisselenmiş jetonların kilitlerini açan bir fonksiyon sayılabilir.

Geliştiricilerin bu gibi fonksiyonları, uygulamalarının sorunsuz şekilde çalışabilmesi için aralıklı olarak tetiklemeleri gerekir. Bununla birlikte, bu durum geliştiriciler için sıradan görevlerde daha fazla saat kaybedilmesine sebep olabilir, bu yüzden akıllı sözleşmelerin yürütülmesini otomatik hale getirme fikri ilgi çekicidir.

Bazı merkezi olmayan kâhin ağları, zincir dışı kâhin düğümlerinin kullanıcı tarafından ifade edilen parametrelere göre akıllı sözleşme fonksiyonlarını tetiklemesini sağlayan otomasyon hizmetleri sunar. Bu, tipik olarak hedef sözleşmeyi kâhin ağına "kaydetmeyi", kâhin operatörüne ödeme yapmak için fon sağlamayı ve sözleşmenin tetikleneceği şartları ya da zamanları belirtmeyi gerektirir.

Akıllı sözleşmeler için olağan bakım görevlerini güvenin asgariye indirildiği ve merkeziyetsizleştirilmiş bir şekilde dış kaynak kullanımı yoluyla tamamlamaya yönelik seçenekler sunan Chainlink'in [ Keeper Ağı](https://chain.link/keepers) buna bir örnektir. Sözleşmenizi Keeper ile uyumlu hale getirme ve Upkeep hizmetini kullanma hakkında daha fazla bilgi edinmek için resmi [Keeper dokümantasyonunu](https://docs.chain.link/docs/chainlink-keepers/introduction/) okuyun.

## Blokzincir kâhinlerini kullanın {#use-blockchain-oracles}

Ethereum merkeziyetsiz uygulamanıza entegre edebileceğiniz birden fazla kâhin uygulaması mevcuttur:

**[Chainlink](https://chain.link/)** - _Chainlink merkezi olmayan kâhin ağları, herhangi bir blokzincirde gelişmiş akıllı sözleşmeleri desteklemek için kurcalamaya dayanıklı girdiler, çıktılar ve hesaplamalar sağlar._

**[Witnet](https://witnet.io/)** - _Witnet, akıllı sözleşmelerin gerçek dünya olaylarına güçlü kripto-ekonomik garantilerle tepki vermesine yardımcı olan izin gerektirmez, merkezi olmayan ve sansüre dayanıklı bir kâhindir._

**[UMA Oracle](https://uma.xyz)** - _UMA'nın iyimser kâhini, akıllı sözleşmelerin sigorta, finansal türevler ve tahmin piyasaları dahil olmak üzere farklı uygulamalar için her türlü veriyi hızla almasına olanak tanır._

**[Tellor](https://tellor.io/)** - _Tellor, akıllı sözleşmenizin ihtiyaç duyduğu anda herhangi bir veriyi kolayca almasına yönelik şeffaf ve izin gerektirmeyen bir kâhin protokolüdür._

**[Band Protocol](https://bandprotocol.com/)** - _Band Protocol, gerçek dünya verilerini ve API'leri toplayan ve akıllı sözleşmelere bağlayan zincirler arası bir veri kâhin platformudur._

**[Paralink](https://paralink.network/)** - _Paralink, Ethereum ve diğer popüler blok zincirlerinde çalışan akıllı sözleşmeler için açık kaynaklı ve merkezi olmayan bir kâhin platformu sağlar._

**[Pyth Network](https://pyth.network/)** - _Pyth ağı, kurcalanmaya-dayanıklı, merkeziyetsiz ve kendini sürdürebilir bir ortamda zincir üstünde sürekli gerçek hayat verileri yayımlamak üzere tasarlanmış finansal bir birinci taraf bir kâhin ağıdır._

**[API3 DAO](https://www.api3.org/)** - _API3 DAO, akıllı sözleşmeler için merkezi olmayan bir çözümde daha fazla kaynak şeffaflığı, güvenlik ve ölçeklenebilirlik sağlayan birinci taraf kâhin çözümleri sunar._

## Daha fazla okuma {#further-reading}

**Makaleler**

- [Blokzincir Kâhini Nedir?](https://chain.link/education/blockchain-oracles) — _Chainlink_
- [Blokzincir Kâhini Nedir?](https://betterprogramming.pub/what-is-a-blockchain-oracle-f5ccab8dbd72) — _Patrick Collins_
- [Merkezi Olmayan Kâhinler: kapsamlı bir genel bakış](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) — _Julien Thevenard_
- [Ethereum'da Blokzinciri Kâhini Uygulaması](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [Akıllı sözleşmeler neden API çağrıları yapamıyor?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) — _StackExchange_
- [Merkezi olmayan kâhinlere neden ihtiyaç duyarız?](https://newsletter.banklesshq.com/p/why-we-need-decentralized-oracles) — _Bankless_
- [Demek bir fiyat kâhini kullanmak istiyorsunuz](https://samczsun.com/so-you-want-to-use-a-price-oracle/) — _samczsun_

**Videolar**

- [Kâhinler ve Blokzincir Yardımcı Programının Genişletilmesi](https://youtu.be/BVUZpWa8vpw) — _Real Vision Finance_
- [Birinci taraf ile üçüncü taraf kâhinler arasındaki farklar](https://blockchainoraclesummit.io/first-party-vs-third-party-oracles/) - _Blokzincir Kâhini Zirvesi_

**Sunumlar**

- [Solidity'de Ethereum'un Güncel Fiyatını Alma](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) — _Chainlink_

**Örnek projeler**

- [Solidity'de Ethereum için tam Chainlink başlangıç ​​projesi](https://github.com/hackbg/chainlink-fullstack) — _HackBG_
