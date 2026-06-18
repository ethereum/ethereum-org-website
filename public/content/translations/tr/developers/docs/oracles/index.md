---
title: Kâhinler
description: Kâhinler, Ethereum akıllı sözleşmelerine gerçek dünya verilerine erişim sağlayarak kullanıcılar için daha fazla kullanım senaryosunun ve daha büyük değerin kilidini açar.
lang: tr
authors: ["Patrick Collins"]
---

Kâhinler, zincir dışı veri kaynaklarını akıllı sözleşmeler için blokzincirde kullanılabilir hâle getiren veri beslemeleri üreten uygulamalardır. Bu gereklidir çünkü Ethereum tabanlı akıllı sözleşmeler, varsayılan olarak blokzincir ağı dışında depolanan bilgilere erişemez.

Akıllı sözleşmelere zincir dışı verileri kullanarak çalışma yeteneği kazandırmak, merkeziyetsiz uygulamaların (dapp) faydasını ve değerini artırır. Örneğin, zincir içi tahmin piyasaları, kullanıcı tahminlerini doğrulamak için kullandıkları sonuçlar hakkında bilgi sağlamak üzere kâhinlere güvenir. Diyelim ki Alice, bir sonraki ABD Başkanı'nın kim olacağı üzerine 20 ETH bahis yaptı. Bu durumda, tahmin piyasası merkeziyetsiz uygulamasının (dapp), seçim sonuçlarını onaylamak ve Alice'in ödeme almaya hak kazanıp kazanmadığını belirlemek için bir kâhine ihtiyacı vardır.

## Ön Koşullar {#prerequisites}

Bu sayfa, okuyucunun [düğümler](/developers/docs/nodes-and-clients/), [mutabakat mekanizmaları](/developers/docs/consensus-mechanisms/) ve [EVM](/developers/docs/evm/) dâhil olmak üzere [Ethereum](/) temellerine aşina olduğunu varsaymaktadır. Ayrıca [akıllı sözleşmeler](/developers/docs/smart-contracts/) ve [akıllı sözleşme anatomisi](/developers/docs/smart-contracts/anatomy/), özellikle de [olaylar](/glossary/#events) hakkında iyi bir anlayışa sahip olmalısınız.

## Blokzincir kâhini nedir? {#what-is-a-blockchain-oracle}

Kâhinler, harici bilgileri (yani zincir dışı depolanan bilgileri) kaynaklayan, doğrulayan ve blokzincirde çalışan akıllı sözleşmelere ileten uygulamalardır. Zincir dışı verileri "çekmek" ve Ethereum'da yayınlamak dışında kâhinler, blokzincirden harici sistemlere bilgi de "itebilir"; örneğin, kullanıcı bir Ethereum işlemi aracılığıyla bir ücret gönderdiğinde akıllı bir kilidi açmak gibi.

Bir kâhin olmadan, bir akıllı sözleşme tamamen zincir içi verilerle sınırlı kalırdı.

Kâhinler veri kaynağına (bir veya birden fazla kaynak), güven modellerine (merkezi veya merkeziyetsiz) ve sistem mimarisine (anında okuma, yayınla-abone ol ve istek-yanıt) göre farklılık gösterir. Kâhinleri ayrıca zincir içi sözleşmelerin kullanımı için harici verileri alıp almadıklarına (girdi kâhinleri), blokzincirden zincir dışı uygulamalara bilgi gönderip göndermediklerine (çıktı kâhinleri) veya zincir dışı hesaplama görevleri gerçekleştirip gerçekleştirmediklerine (hesaplamalı kâhinler) göre de ayırt edebiliriz.

## Akıllı sözleşmeler neden kâhinlere ihtiyaç duyar? {#why-do-smart-contracts-need-oracles}

Birçok geliştirici akıllı sözleşmeleri blokzincirdeki belirli adreslerde çalışan kodlar olarak görür. Ancak, [akıllı sözleşmelere daha genel bir bakış](/smart-contracts/), belirli koşullar yerine getirildiğinde taraflar arasındaki anlaşmaları uygulayabilen, kendi kendini yürüten yazılım programları oldukları yönündedir - bu nedenle "akıllı sözleşmeler" terimi kullanılır.

Ancak Ethereum'un deterministik olduğu göz önüne alındığında, insanlar arasındaki anlaşmaları uygulamak için akıllı sözleşmeleri kullanmak o kadar da basit değildir. [Deterministik bir sistem](https://en.wikipedia.org/wiki/Deterministic_algorithm), başlangıç durumu ve belirli bir girdi verildiğinde her zaman aynı sonuçları üreten sistemdir; yani girdilerden çıktıları hesaplama sürecinde hiçbir rastgelelik veya varyasyon yoktur.

Deterministik yürütmeyi sağlamak için blokzincirler, düğümleri _yalnızca_ blokzincirin kendisinde depolanan verileri kullanarak basit ikili (doğru/yanlış) sorular üzerinde mutabakata varmakla sınırlar. Bu tür sorulara örnekler şunlardır:

- "Hesap sahibi (bir açık anahtar ile tanımlanan) bu işlemi eşleştirilmiş özel anahtar ile imzaladı mı?"
- "Bu hesap işlemi karşılayacak yeterli fona sahip mi?"
- "Bu işlem bu akıllı sözleşme bağlamında geçerli mi?", vb.

Blokzincirler harici kaynaklardan (yani gerçek dünyadan) bilgi alsaydı, determinizmi sağlamak imkânsız olurdu ve bu da düğümlerin blokzincirin durumundaki değişikliklerin geçerliliği üzerinde anlaşmasını engellerdi. Örneğin, geleneksel bir fiyat API'sinden elde edilen mevcut ETH-USD döviz kuruna dayalı olarak bir işlem yürüten bir akıllı sözleşmeyi ele alalım. Bu rakamın sık sık değişmesi muhtemeldir (API'nin kullanımdan kaldırılabileceği veya hacklenebileceği gerçeğinden bahsetmiyoruz bile), bu da aynı sözleşme kodunu yürüten düğümlerin farklı sonuçlara ulaşacağı anlamına gelir.

Dünya çapında işlemleri işleyen binlerce düğüme sahip Ethereum gibi halka açık bir blokzincir için determinizm kritik öneme sahiptir. Doğruluk kaynağı olarak hizmet eden merkezi bir otorite olmadığından, düğümlerin aynı işlemleri uyguladıktan sonra aynı duruma ulaşmak için mekanizmalara ihtiyacı vardır. A düğümünün bir akıllı sözleşmenin kodunu yürütüp sonuç olarak "3" elde ettiği, B düğümünün ise aynı işlemi çalıştırdıktan sonra "7" elde ettiği bir durum, mutabakatın bozulmasına neden olur ve Ethereum'un merkeziyetsiz bir bilgi işlem platformu olarak değerini ortadan kaldırır.

Bu senaryo aynı zamanda blokzincirleri harici kaynaklardan bilgi çekecek şekilde tasarlamanın yarattığı sorunu da vurgulamaktadır. Ancak kâhinler, zincir dışı kaynaklardan bilgi alıp akıllı sözleşmelerin tüketmesi için blokzincirde depolayarak bu sorunu çözer. Zincir içi depolanan bilgiler değiştirilemez ve herkese açık olduğundan, Ethereum düğümleri mutabakatı bozmadan durum değişikliklerini hesaplamak için kâhin tarafından içe aktarılan zincir dışı verileri güvenle kullanabilir.

Bunu yapmak için bir kâhin tipik olarak zincir içi çalışan bir akıllı sözleşme ve bazı zincir dışı bileşenlerden oluşur. Zincir içi sözleşme, diğer akıllı sözleşmelerden gelen veri taleplerini alır ve bunları zincir dışı bileşene (kâhin düğümü olarak adlandırılır) iletir. Bu kâhin düğümü, örneğin uygulama programlama arayüzlerini (API'ler) kullanarak veri kaynaklarını sorgulayabilir ve talep edilen verileri akıllı sözleşmenin depolama alanında saklamak için işlemler gönderebilir.

Temel olarak, bir blokzincir kâhini, blokzincir ile dış ortam arasındaki bilgi boşluğunu doldurarak "hibrit akıllı sözleşmeler" yaratır. Hibrit bir akıllı sözleşme, zincir içi sözleşme kodu ve zincir dışı altyapının bir kombinasyonuna dayalı olarak işlev gören bir sözleşmedir. Merkeziyetsiz tahmin piyasaları, hibrit akıllı sözleşmelerin mükemmel bir örneğidir. Diğer örnekler arasında, bir dizi kâhinin belirli hava olaylarının gerçekleştiğini belirlediğinde ödeme yapan mahsul sigortası akıllı sözleşmeleri yer alabilir.

## Oracle problemi nedir? {#the-oracle-problem}

Kâhinler önemli bir sorunu çözer, ancak aynı zamanda bazı komplikasyonları da beraberinde getirir, örneğin:

- Enjekte edilen bilginin doğru kaynaktan çıkarıldığını veya üzerinde oynanmadığını nasıl doğrularız?

- Bu verilerin her zaman kullanılabilir olmasını ve düzenli olarak güncellenmesini nasıl sağlarız?

Sözde "oracle problemi", akıllı sözleşmelere girdi göndermek için blokzincir kâhinlerini kullanmanın getirdiği sorunları gösterir. Bir akıllı sözleşmenin doğru şekilde yürütülmesi için bir kâhinden gelen verilerin doğru olması gerekir. Ayrıca, doğru bilgi sağlamaları için kâhin operatörlerine 'güvenmek' zorunda kalmak, akıllı sözleşmelerin 'güven gerektirmeyen' yönünü zayıflatır.

Farklı kâhinler, daha sonra inceleyeceğimiz oracle problemine farklı çözümler sunar. Kâhinler tipik olarak aşağıdaki zorlukların üstesinden ne kadar iyi gelebildiklerine göre değerlendirilir:

1. **Doğruluk**: Bir kâhin, akıllı sözleşmelerin geçersiz zincir dışı verilere dayanarak durum değişikliklerini tetiklemesine neden olmamalıdır. Bir kâhin, verilerin _özgünlüğünü_ ve _bütünlüğünü_ garanti etmelidir. Özgünlük, verilerin doğru kaynaktan alındığı anlamına gelirken, bütünlük, verilerin zincir içine gönderilmeden önce bozulmadan kaldığı (yani değiştirilmediği) anlamına gelir.

2. **Kullanılabilirlik**: Bir kâhin, akıllı sözleşmelerin eylemleri yürütmesini ve durum değişikliklerini tetiklemesini geciktirmemeli veya engellememelidir. Bu, bir kâhinden gelen verilerin kesintisiz olarak _istek üzerine kullanılabilir_ olması gerektiği anlamına gelir.

3. **Teşvik uyumluluğu**: Bir kâhin, zincir dışı veri sağlayıcılarını akıllı sözleşmelere doğru bilgi sunmaya teşvik etmelidir. Teşvik uyumluluğu _ilişkilendirilebilirlik_ ve _hesap verebilirlik_ içerir. İlişkilendirilebilirlik, harici bir bilginin sağlayıcısıyla bağlantılandırılmasına olanak tanırken, hesap verebilirlik veri sağlayıcılarını verdikleri bilgilere bağlar, böylece sağlanan bilginin kalitesine göre ödüllendirilebilir veya cezalandırılabilirler.

## Bir blokzincir kâhin hizmeti nasıl çalışır? {#how-does-a-blockchain-oracle-service-work}

### Kullanıcılar {#users}

Kullanıcılar, belirli eylemleri tamamlamak için blokzincir dışındaki bilgilere ihtiyaç duyan varlıklardır (yani akıllı sözleşmeler). Bir kâhin hizmetinin temel iş akışı, kullanıcının kâhin sözleşmesine bir veri talebi göndermesiyle başlar. Veri talepleri genellikle aşağıdaki soruların bazılarını veya tamamını yanıtlayacaktır:

1. Zincir dışı düğümler talep edilen bilgi için hangi kaynaklara başvurabilir?

2. Raporlayıcılar veri kaynaklarından gelen bilgileri nasıl işler ve yararlı veri noktalarını nasıl çıkarır?

3. Verilerin alınmasına kaç kâhin düğümü katılabilir?

4. Kâhin raporlarındaki tutarsızlıklar nasıl yönetilmelidir?

5. Gönderimleri filtrelemede ve raporları tek bir değerde birleştirmede hangi yöntem uygulanmalıdır?

### Kâhin sözleşmesi {#oracle-contract}

Kâhin sözleşmesi, kâhin hizmetinin zincir içi bileşenidir. Diğer sözleşmelerden gelen veri taleplerini dinler, veri sorgularını kâhin düğümlerine iletir ve dönen verileri istemci sözleşmelerine yayınlar. Bu sözleşme ayrıca, talep eden sözleşmeye gönderilecek bir toplu değer üretmek için dönen veri noktaları üzerinde bazı hesaplamalar yapabilir.

Kâhin sözleşmesi, istemci sözleşmelerinin bir veri talebinde bulunurken çağırdığı bazı işlevleri ortaya çıkarır. Yeni bir sorgu aldığında, akıllı sözleşme veri talebinin ayrıntılarını içeren bir [günlük olayı](/developers/docs/smart-contracts/anatomy/#events-and-logs) yayacaktır. Bu, günlüğe abone olan zincir dışı düğümleri (genellikle JSON-RPC `eth_subscribe` komutu gibi bir şey kullanarak) bilgilendirir ve onlar da günlük olayında tanımlanan verileri almaya devam eder.

Aşağıda Pedro Costa tarafından hazırlanan bir [örnek kâhin sözleşmesi](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) bulunmaktadır. Bu, diğer akıllı sözleşmelerin talebi üzerine zincir dışı API'leri sorgulayabilen ve talep edilen bilgileri blokzincirde depolayabilen basit bir kâhin hizmetidir:

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //Sözleşmeye yapılan isteklerin listesi
  uint currentId = 0; //artan istek kimliği
  uint minQuorum = 2; //nihai sonucu açıklamadan önce alınması gereken minimum yanıt sayısı
  uint totalOracleCount = 3; // Sabit kodlanmış kâhin sayısı

  // genel bir API isteğini tanımlar
  struct Request {
    uint id;                            //istek kimliği
    string urlToQuery;                  //API url'si
    string attributeToFetch;            //yanıtta alınacak json özniteliği (anahtarı)
    string agreedValue;                 //anahtardan gelen değer
    mapping(uint => string) answers;     //kâhinler tarafından sağlanan cevaplar
    mapping(address => uint) quorum;    //cevabı sorgulayacak kâhinler (1=kâhin oy vermedi, 2=kâhin oy verdi)
  }

  //Blokzincir dışındaki kâhini tetikleyen olay
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  //nihai sonuç üzerinde bir mutabakat sağlandığında tetiklenir
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

    // Sabit kodlanmış kâhinlerin adresi
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // Blokzincir dışındaki kâhin tarafından algılanacak bir olay başlat
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
    //ve kâhinin henüz oy verip vermediğini
    if(currRequest.quorum[address(msg.sender)] == 1){

      //bu adresin oy verdiğini işaretleme
      currRequest.quorum[msg.sender] = 2;

      //boş bir konum bulana kadar cevaplar "dizisi" üzerinde yinele ve alınan değeri kaydet
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

      //kâhin listesi üzerinde yinele ve yeterli kâhinin (minimum nisap)
      //mevcut olanla aynı cevaba oy verip vermediğini kontrol et
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

Kâhin düğümü, kâhin hizmetinin zincir dışı bileşenidir. Üçüncü taraf sunucularda barındırılan API'ler gibi harici kaynaklardan bilgi çıkarır ve akıllı sözleşmeler tarafından tüketilmesi için zincir içine koyar. Kâhin düğümleri, zincir içi kâhin sözleşmesinden gelen olayları dinler ve günlükte açıklanan görevi tamamlamaya devam eder.

Kâhin düğümleri için yaygın bir görev, bir API hizmetine bir [HTTP GET](https://www.w3schools.com/tags/ref_httpmethods.asp) isteği göndermek, ilgili verileri çıkarmak için yanıtı ayrıştırmak, blokzincir tarafından okunabilir bir çıktıya biçimlendirmek ve kâhin sözleşmesine yapılan bir işleme dâhil ederek zincir içine göndermektir. Kâhin düğümünün ayrıca, daha sonra inceleyeceğimiz "özgünlük kanıtlarını" kullanarak sunulan bilgilerin geçerliliğini ve bütünlüğünü onaylaması gerekebilir.

Hesaplamalı kâhinler ayrıca, gas maliyetleri ve blok boyutu sınırları göz önüne alındığında zincir içinde yürütülmesi pratik olmayan hesaplama görevlerini gerçekleştirmek için zincir dışı düğümlere güvenir. Örneğin, kâhin düğümü doğrulanabilir şekilde rastgele bir rakam üretmekle (örneğin, blokzincir tabanlı oyunlar için) görevlendirilebilir.

## Kâhin tasarım kalıpları {#oracle-design-patterns}

Kâhinler, _anında okuma_, _yayınla-abone ol_ ve _istek-yanıt_ dâhil olmak üzere farklı türlerde gelir ve son ikisi Ethereum akıllı sözleşmeleri arasında en popüler olanlarıdır. Burada yayınla-abone ol ve istek-yanıt modellerini kısaca açıklıyoruz.

### Yayınla-abone ol kâhinleri {#publish-subscribe-oracles}

Bu tür bir kâhin, diğer sözleşmelerin bilgi için düzenli olarak okuyabileceği bir "veri beslemesi" sunar. Bu durumda verilerin sık sık değişmesi beklenir, bu nedenle istemci sözleşmeleri kâhinin depolama alanındaki verilere yönelik güncellemeleri dinlemelidir. Kullanıcılara en son ETH-USD fiyat bilgisini sağlayan bir kâhin buna örnektir.

### İstek-yanıt kâhinleri {#request-response-oracles}

Bir istek-yanıt kurulumu, istemci sözleşmesinin yayınla-abone ol kâhini tarafından sağlananlar dışında rastgele veriler talep etmesine olanak tanır. İstek-yanıt kâhinleri, veri kümesi bir akıllı sözleşmenin depolama alanında saklanamayacak kadar büyük olduğunda ve/veya kullanıcıların herhangi bir zamanda verilerin yalnızca küçük bir kısmına ihtiyaç duyacağı durumlarda idealdir.

Yayınla-abone ol modellerinden daha karmaşık olmalarına rağmen, istek-yanıt kâhinleri temel olarak önceki bölümde anlattıklarımızdır. Kâhin, bir veri talebini alan ve işlenmesi için zincir dışı bir düğüme ileten zincir içi bir bileşene sahip olacaktır.

Veri sorgularını başlatan kullanıcılar, zincir dışı kaynaktan bilgi alma maliyetini karşılamalıdır. İstemci sözleşmesi ayrıca, kâhin sözleşmesinin istekte belirtilen geri çağırma işlevi aracılığıyla yanıtı döndürürken maruz kaldığı gas maliyetlerini karşılamak için fon sağlamalıdır.

## Merkezi ve merkeziyetsiz kâhinler {#types-of-oracles}

### Merkezi kâhinler {#centralized-oracles}

Merkezi bir kâhin, zincir dışı bilgileri bir araya getirmekten ve kâhin sözleşmesinin verilerini istendiği gibi güncellemekten sorumlu tek bir varlık tarafından kontrol edilir. Merkezi kâhinler, tek bir doğruluk kaynağına dayandıkları için verimlidir. Tescilli veri kümelerinin doğrudan sahibi tarafından geniş çapta kabul gören bir imza ile yayınlandığı durumlarda daha iyi işlev görebilirler. Ancak, dezavantajları da beraberinde getirirler:

#### Düşük doğruluk garantileri {#low-correctness-guarantees}

Merkezi kâhinlerde, sağlanan bilgilerin doğru olup olmadığını teyit etmenin bir yolu yoktur. "Saygın" sağlayıcılar bile kontrolden çıkabilir veya hacklenebilir. Kâhin bozulursa, akıllı sözleşmeler kötü verilere dayanarak yürütülür.

#### Zayıf kullanılabilirlik {#poor-availability}

Merkezi kâhinlerin zincir dışı verileri diğer akıllı sözleşmeler için her zaman kullanılabilir hâle getirmesi garanti edilmez. Sağlayıcı hizmeti kapatmaya karar verirse veya bir bilgisayar korsanı kâhinin zincir dışı bileşenini ele geçirirse, akıllı sözleşmeniz bir hizmet reddi (DoS) saldırısı riski altındadır.

#### Zayıf teşvik uyumluluğu {#poor-incentive-compatibility}

Merkezi kâhinler genellikle veri sağlayıcısının doğru/değiştirilmemiş bilgi göndermesi için kötü tasarlanmış teşviklere sahiptir veya hiç teşvike sahip değildir. Bir kâhine doğruluk için ödeme yapmak dürüstlüğü garanti etmez. Akıllı sözleşmeler tarafından kontrol edilen değer miktarı arttıkça bu sorun daha da büyür.

### Merkeziyetsiz kâhinler {#decentralized-oracles}

Merkeziyetsiz kâhinler, tek hata noktalarını ortadan kaldırarak merkezi kâhinlerin sınırlamalarının üstesinden gelmek için tasarlanmıştır. Merkeziyetsiz bir kâhin hizmeti, zincir dışı verileri bir akıllı sözleşmeye göndermeden önce üzerinde mutabakat oluşturan eşler arası bir ağdaki birden fazla katılımcıdan oluşur.

Merkeziyetsiz bir kâhin (ideal olarak) izinsiz, güven gerektirmeyen ve merkezi bir tarafın yönetiminden bağımsız olmalıdır; gerçekte, kâhinler arasındaki merkeziyetsizlik bir spektrum üzerindedir. Herkesin katılabileceği, ancak geçmiş performansa dayalı olarak düğümleri onaylayan ve kaldıran bir "sahibi" olan yarı merkeziyetsiz kâhin ağları vardır. Tamamen merkeziyetsiz kâhin ağları da mevcuttur: bunlar genellikle bağımsız blokzincirler olarak çalışır ve düğümleri koordine etmek ve kötü davranışları cezalandırmak için tanımlanmış mutabakat mekanizmalarına sahiptir.

Merkeziyetsiz kâhinleri kullanmak aşağıdaki avantajları beraberinde getirir:

### Yüksek doğruluk garantileri {#high-correctness-guarantees}

Merkeziyetsiz kâhinler, farklı yaklaşımlar kullanarak verilerin doğruluğunu sağlamaya çalışır. Bu, döndürülen bilgilerin özgünlüğünü ve bütünlüğünü onaylayan kanıtların kullanılmasını ve birden fazla varlığın zincir dışı verilerin geçerliliği üzerinde toplu olarak anlaşmasını gerektirmeyi içerir.

#### Özgünlük kanıtları {#authenticity-proofs}

Özgünlük kanıtları, harici kaynaklardan alınan bilgilerin bağımsız olarak doğrulanmasını sağlayan kriptografik mekanizmalardır. Bu kanıtlar bilginin kaynağını doğrulayabilir ve alındıktan sonra verilerdeki olası değişiklikleri tespit edebilir.

Özgünlük kanıtlarına örnekler şunlardır:

**Aktarım Katmanı Güvenliği (TLS) kanıtları**: Kâhin düğümleri genellikle Aktarım Katmanı Güvenliği (TLS) protokolüne dayalı güvenli bir HTTP bağlantısı kullanarak harici kaynaklardan veri alır. Bazı merkeziyetsiz kâhinler, TLS oturumlarını doğrulamak (yani bir düğüm ile belirli bir sunucu arasındaki bilgi alışverişini onaylamak) ve oturumun içeriğinin değiştirilmediğini onaylamak için özgünlük kanıtları kullanır.

**Güvenilir Yürütme Ortamı (TEE) onayları**: Bir [güvenilir yürütme ortamı](https://en.wikipedia.org/wiki/Trusted_execution_environment) (TEE), ana sisteminin operasyonel süreçlerinden izole edilmiş, korumalı bir hesaplama ortamıdır. TEE'ler, hesaplama ortamında depolanan/kullanılan uygulama kodu veya verilerin bütünlüğünü, gizliliğini ve değişmezliğini korumasını sağlar. Kullanıcılar ayrıca bir uygulama örneğinin güvenilir yürütme ortamında çalıştığını kanıtlamak için bir onay oluşturabilir.

Belirli merkeziyetsiz kâhin sınıfları, kâhin düğümü operatörlerinin TEE onayları sağlamasını gerektirir. Bu, bir kullanıcıya düğüm operatörünün güvenilir bir yürütme ortamında bir kâhin istemcisi örneği çalıştırdığını onaylar. TEE'ler harici süreçlerin bir uygulamanın kodunu ve verilerini değiştirmesini veya okumasını engeller, bu nedenle bu onaylar kâhin düğümünün bilgileri sağlam ve gizli tuttuğunu kanıtlar.

#### Bilgilerin mutabakata dayalı doğrulanması {#consensus-based-validation-of-information}

Merkezi kâhinler, akıllı sözleşmelere veri sağlarken tek bir doğruluk kaynağına güvenir ve bu da yanlış bilgi yayınlama olasılığını ortaya çıkarır. Merkeziyetsiz kâhinler, zincir dışı bilgileri sorgulamak için birden fazla kâhin düğümüne güvenerek bu sorunu çözer. Birden fazla kaynaktan gelen verileri karşılaştırarak merkeziyetsiz kâhinler, zincir içi sözleşmelere geçersiz bilgi aktarma riskini azaltır.

Ancak merkeziyetsiz kâhinler, birden fazla zincir dışı kaynaktan alınan bilgilerdeki tutarsızlıklarla başa çıkmalıdır. Bilgilerdeki farklılıkları en aza indirmek ve kâhin sözleşmesine aktarılan verilerin kâhin düğümlerinin ortak görüşünü yansıtmasını sağlamak için merkeziyetsiz kâhinler aşağıdaki mekanizmaları kullanır:

##### Verilerin doğruluğu üzerine oylama/staking {#availability}

Bazı merkeziyetsiz kâhin ağları, katılımcıların ağın yerel tokenini kullanarak veri sorgularına verilen yanıtların doğruluğu üzerine oy vermesini veya stake etmesini gerektirir (örneğin, "2020 ABD seçimlerini kim kazandı?"). Daha sonra bir toplama protokolü oyları ve stakeleri bir araya getirir ve çoğunluk tarafından desteklenen cevabı geçerli olarak kabul eder.

Cevapları çoğunluğun cevabından sapan düğümler, tokenlerinin daha doğru değerler sağlayan diğer kişilere dağıtılmasıyla cezalandırılır. Düğümleri veri sağlamadan önce bir teminat sağlamaya zorlamak, getirileri en üst düzeye çıkarmaya niyetli rasyonel ekonomik aktörler oldukları varsayıldığından dürüst yanıtları teşvik eder.

Staking/oylama ayrıca merkeziyetsiz kâhinleri, kötü niyetli aktörlerin mutabakat sistemini manipüle etmek için birden fazla kimlik oluşturduğu [Sybil saldırılarından](/glossary/#sybil-attack) korur. Ancak staking, "beleşçiliği" (kâhin düğümlerinin bilgileri başkalarından kopyalaması) ve "tembel doğrulamayı" (kâhin düğümlerinin bilgileri kendileri doğrulamadan çoğunluğu takip etmesi) engelleyemez.

##### Schelling noktası mekanizmaları {#good-incentive-compatibility}

[Schelling noktası](<https://en.wikipedia.org/wiki/Focal_point_(game_theory)>), herhangi bir iletişim olmadığında birden fazla varlığın her zaman bir soruna ortak bir çözüm bulacağını varsayan bir oyun teorisi kavramıdır. Schelling noktası mekanizmaları, düğümlerin veri taleplerine verilen yanıtlar üzerinde mutabakata varmasını sağlamak için genellikle merkeziyetsiz kâhin ağlarında kullanılır.

Bunun için erken bir fikir, katılımcıların bir depozito ile birlikte "skaler" sorulara (cevapları büyüklükle açıklanan sorular, örneğin "ETH'nin fiyatı nedir?") yanıtlar sunduğu önerilen bir veri beslemesi olan [SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed) idi. 25. ve 75. [yüzdelik dilim](https://en.wikipedia.org/wiki/Percentile) arasında değerler sağlayan kullanıcılar ödüllendirilirken, değerleri medyan değerden büyük ölçüde sapanlar cezalandırılır.

SchellingCoin bugün mevcut olmasa da, başta [Maker Protokolü Kâhinleri](https://docs.makerdao.com/smart-contract-modules/oracle-module) olmak üzere bir dizi merkeziyetsiz kâhin, kâhin verilerinin doğruluğunu artırmak için schelling noktası mekanizmasını kullanır. Her Maker Kâhini, teminat varlıkları için piyasa fiyatlarını sunan zincir dışı bir eşler arası düğüm ağından ("aktarıcılar" ve "beslemeler") ve sağlanan tüm değerlerin medyanını hesaplayan zincir içi bir "Medianizer" sözleşmesinden oluşur. Belirtilen gecikme süresi sona erdiğinde, bu medyan değer ilgili varlık için yeni referans fiyatı olur.

Schelling noktası mekanizmalarını kullanan diğer kâhin örnekleri arasında [Chainlink Zincir Dışı Raporlama](https://docs.chain.link/architecture-overview/off-chain-reporting) ve [Witnet](https://witnet.io/) yer alır. Her iki sistemde de, eşler arası ağdaki kâhin düğümlerinden gelen yanıtlar, ortalama veya medyan gibi tek bir toplu değerde birleştirilir. Düğümler, yanıtlarının toplu değerle ne ölçüde uyumlu olduğuna veya ondan ne ölçüde saptığına göre ödüllendirilir veya cezalandırılır.

Schelling noktası mekanizmaları caziptir çünkü merkeziyetsizliği garanti ederken zincir içi ayak izini en aza indirirler (yalnızca bir işlem gönderilmesi gerekir). İkincisi mümkündür çünkü düğümler, ortalama/medyan değeri üreten algoritmaya beslenmeden önce sunulan yanıtlar listesini imzalamalıdır.

### Kullanılabilirlik {#applications-of-oracles-in-smart-contracts}

Merkeziyetsiz kâhin hizmetleri, zincir dışı verilerin akıllı sözleşmeler için yüksek düzeyde kullanılabilirliğini sağlar. Bu, hem zincir dışı bilginin kaynağının hem de bilgiyi zincir içine aktarmaktan sorumlu düğümlerin merkeziyetsizleştirilmesiyle elde edilir.

Bu, kâhin sözleşmesinin diğer sözleşmelerden gelen sorguları yürütmek için birden fazla düğüme (ki bunlar da birden fazla veri kaynağına güvenir) güvenebilmesi nedeniyle hata toleransı sağlar. Kaynak _ve_ düğüm operatörü düzeyinde merkeziyetsizlik çok önemlidir; aynı kaynaktan alınan bilgileri sunan bir kâhin düğümleri ağı, merkezi bir kâhinle aynı sorunla karşılaşacaktır.

Stake tabanlı kâhinlerin, veri taleplerine hızlı yanıt veremeyen düğüm operatörlerine ceza kesintisi uygulaması da mümkündür. Bu, kâhin düğümlerini hata toleranslı altyapıya yatırım yapmaya ve verileri zamanında sağlamaya önemli ölçüde teşvik eder.

### İyi teşvik uyumluluğu {#retrieving-financial-data}

Merkeziyetsiz kâhinler, kâhin düğümleri arasında [Bizans](https://en.wikipedia.org/wiki/Byzantine_fault) davranışını önlemek için çeşitli teşvik tasarımları uygular. Özellikle, _ilişkilendirilebilirlik_ ve _hesap verebilirlik_ sağlarlar:

1. Merkeziyetsiz kâhin düğümlerinin genellikle veri taleplerine yanıt olarak sağladıkları verileri imzalamaları gerekir. Bu bilgi, kâhin düğümlerinin geçmiş performansını değerlendirmeye yardımcı olur, böylece kullanıcılar veri taleplerinde bulunurken güvenilmez kâhin düğümlerini filtreleyebilir. Witnet'in [Algoritmik İtibar Sistemi](https://docs.witnet.io/intro/about/architecture#algorithmic-reputation-system) buna bir örnektir.

2. Merkeziyetsiz kâhinler, daha önce açıklandığı gibi, düğümlerin sundukları verilerin doğruluğuna olan güvenleri üzerine bir stake koymalarını gerektirebilir. Talep doğrulanırsa, bu stake dürüst hizmet ödülleriyle birlikte iade edilebilir. Ancak bilginin yanlış olması durumunda ceza kesintisine de uğrayabilir, bu da bir ölçüde hesap verebilirlik sağlar.

## Akıllı sözleşmelerde kâhin uygulamaları {#generating-verifiable-randomness}

Aşağıdakiler Ethereum'daki kâhinler için yaygın kullanım senaryolarıdır:

### Finansal verileri alma {#getting-outcomes-for-events}

[Merkeziyetsiz finans](/defi/) (DeFi) uygulamaları, eşler arası borç verme, borç alma ve varlık ticaretine olanak tanır. Bu genellikle, döviz kuru verileri (kripto para birimlerinin itibari değerini hesaplamak veya token fiyatlarını karşılaştırmak için) ve sermaye piyasaları verileri (altın veya ABD doları gibi tokenize edilmiş varlıkların değerini hesaplamak için) dâhil olmak üzere farklı finansal bilgilerin alınmasını gerektirir.

Örneğin bir DeFi borç verme protokolü, teminat olarak yatırılan varlıkların (örneğin ETH) mevcut piyasa fiyatlarını sorgulamalıdır. Bu, sözleşmenin teminat varlıklarının değerini belirlemesine ve sistemden ne kadar borç alabileceğini belirlemesine olanak tanır.

DeFi'deki popüler "fiyat kâhinleri" (genellikle adlandırıldıkları şekliyle) arasında Chainlink Fiyat Beslemeleri, Compound Protokolü'nün [Açık Fiyat Beslemesi](https://compound.finance/docs/prices), Uniswap'ın [Zaman Ağırlıklı Ortalama Fiyatları (TWAP'ler)](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) ve [Maker Kâhinleri](https://docs.makerdao.com/smart-contract-modules/oracle-module) bulunur.

Geliştiriciler, bu fiyat kâhinlerini projelerine entegre etmeden önce onlarla birlikte gelen uyarıları anlamalıdır. Bu [makale](https://blog.openzeppelin.com/secure-smart-contract-guidelines-the-dangers-of-price-oracles/), bahsedilen fiyat kâhinlerinden herhangi birini kullanmayı planlarken nelerin dikkate alınması gerektiğine dair ayrıntılı bir analiz sunmaktadır.

Aşağıda, bir Chainlink fiyat beslemesi kullanarak akıllı sözleşmenizdeki en son ETH fiyatını nasıl alabileceğinize dair bir örnek verilmiştir:

```solidity
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Ağ: Kovan
     * Toplayıcı: ETH/USD
     * Adres: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    /**
     * En son fiyatı döndürür
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

### Doğrulanabilir rastgelelik üretme {#automating-smart-contracts}

Blokzincir tabanlı oyunlar veya piyango planları gibi belirli blokzincir uygulamaları, etkili bir şekilde çalışmak için yüksek düzeyde öngörülemezlik ve rastgelelik gerektirir. Ancak, blokzincirlerin deterministik yürütülmesi rastgeleliği ortadan kaldırır.

Orijinal yaklaşım, `blockhash` gibi sözde rastgele kriptografik işlevleri kullanmaktı, ancak bunlar iş kanıtı algoritmasını çözen [madenciler tarafından manipüle edilebilirdi](https://ethereum.stackexchange.com/questions/3140/risk-of-using-blockhash-other-miners-preventing-attack#:~:text=So%20while%20the%20miners%20can,to%20one%20of%20the%20players.). Ayrıca, Ethereum'un [hisse kanıtına geçişi](/roadmap/merge/), geliştiricilerin zincir içi rastgelelik için artık `blockhash` işlevine güvenemeyeceği anlamına gelir. Bunun yerine İşaret zincirinin [RANDAO mekanizması](https://eth2book.info/altair/part2/building_blocks/randomness) alternatif bir rastgelelik kaynağı sağlar.

Rastgele değeri zincir dışında üretmek ve zincir içine göndermek mümkündür, ancak bunu yapmak kullanıcılara yüksek güven gereksinimleri yükler. Değerin gerçekten öngörülemeyen mekanizmalar aracılığıyla üretildiğine ve aktarım sırasında değiştirilmediğine inanmaları gerekir.

Zincir dışı hesaplama için tasarlanan kâhinler, sürecin öngörülemezliğini onaylayan kriptografik kanıtlarla birlikte zincir içinde yayınladıkları rastgele sonuçları zincir dışında güvenli bir şekilde üreterek bu sorunu çözer. Buna bir örnek, öngörülemeyen sonuçlara dayanan uygulamalar için güvenilir akıllı sözleşmeler oluşturmada yararlı olan, kanıtlanabilir derecede adil ve kurcalamaya karşı korumalı bir rastgele sayı üreteci (RNG) olan [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/)'dir (Doğrulanabilir Rastgele İşlev).

### Olaylar için sonuçlar alma {#use-blockchain-oracles}

Kâhinlerle, gerçek dünyadaki olaylara yanıt veren akıllı sözleşmeler oluşturmak kolaydır. Kâhin hizmetleri, sözleşmelerin zincir dışı bileşenler aracılığıyla harici API'lere bağlanmasına ve bu veri kaynaklarından gelen bilgileri tüketmesine olanak tanıyarak bunu mümkün kılar. Örneğin, daha önce bahsedilen tahmin merkeziyetsiz uygulaması (dapp), bir kâhinden seçim sonuçlarını güvenilir bir zincir dışı kaynaktan (örneğin Associated Press) döndürmesini talep edebilir.

Gerçek dünya sonuçlarına dayalı verileri almak için kâhinleri kullanmak, diğer yeni kullanım senaryolarını mümkün kılar; örneğin, merkeziyetsiz bir sigorta ürününün etkili bir şekilde çalışması için hava durumu, felaketler vb. hakkında doğru bilgilere ihtiyacı vardır.

### Akıllı sözleşmeleri otomatikleştirme {#further-reading}

Akıllı sözleşmeler otomatik olarak çalışmaz; bunun yerine, harici olarak sahip olunan bir hesap (EOA) veya başka bir kontrat hesabı, sözleşmenin kodunu yürütmek için doğru işlevleri tetiklemelidir. Çoğu durumda, sözleşmenin işlevlerinin büyük bir kısmı herkese açıktır ve EOA'lar ile diğer sözleşmeler tarafından çağrılabilir.

Ancak bir sözleşme içinde başkaları tarafından erişilemeyen, ancak bir merkeziyetsiz uygulamanın (dapp) genel işlevselliği için kritik olan _özel işlevler_ de vardır. Örnekler arasında kullanıcılar için periyodik olarak yeni NFT'ler basan bir `mintERC721Token()` işlevi, bir tahmin piyasasında ödemeleri ödüllendirmek için bir işlev veya bir DEX'te stake edilmiş tokenlerin kilidini açmak için bir işlev yer alır.

Geliştiricilerin uygulamanın sorunsuz çalışmasını sağlamak için bu tür işlevleri belirli aralıklarla tetiklemesi gerekecektir. Ancak bu, geliştiriciler için sıradan görevlerde daha fazla saat kaybedilmesine yol açabilir, bu nedenle akıllı sözleşmelerin yürütülmesini otomatikleştirmek caziptir.

Bazı merkeziyetsiz kâhin ağları, zincir dışı kâhin düğümlerinin kullanıcı tarafından tanımlanan parametrelere göre akıllı sözleşme işlevlerini tetiklemesine olanak tanıyan otomasyon hizmetleri sunar. Tipik olarak bu, hedef sözleşmeyi kâhin hizmetine "kaydetmeyi", kâhin operatörüne ödeme yapmak için fon sağlamayı ve sözleşmeyi tetikleyecek koşulları veya zamanları belirlemeyi gerektirir.

Chainlink'in [Keeper Ağı](https://chain.link/keepers), akıllı sözleşmelerin düzenli bakım görevlerini güveni en aza indirilmiş ve merkeziyetsiz bir şekilde dış kaynaklardan sağlaması için seçenekler sunar. Sözleşmenizi Keeper uyumlu hâle getirme ve Upkeep hizmetini kullanma hakkında bilgi için resmî [Keeper belgelerini](https://docs.chain.link/docs/chainlink-keepers/introduction/) okuyun.

## Blokzincir kâhinleri nasıl kullanılır

Ethereum merkeziyetsiz uygulamanıza (dapp) entegre edebileceğiniz birden fazla kâhin uygulaması vardır:

**[Chainlink](https://chain.link/)** - _Chainlink merkeziyetsiz kâhin ağları, herhangi bir blokzincirdeki gelişmiş akıllı sözleşmeleri desteklemek için kurcalamaya karşı korumalı girdiler, çıktılar ve hesaplamalar sağlar._

**[RedStone Kâhinleri](https://redstone.finance/)** - _RedStone, gas için optimize edilmiş veri beslemeleri sağlayan merkeziyetsiz modüler bir kâhindir. Likit staking tokenleri (LST'ler), likit yeniden staking tokenleri (LRT'ler) ve Bitcoin staking türevleri gibi gelişmekte olan varlıklar için fiyat beslemeleri sunma konusunda uzmanlaşmıştır._

**[Chronicle](https://chroniclelabs.org/)** - _Chronicle, gerçekten ölçeklenebilir, uygun maliyetli, merkeziyetsiz ve doğrulanabilir kâhinler geliştirerek verileri zincir içine aktarmanın mevcut sınırlamalarının üstesinden gelir._

**[Witnet](https://witnet.io/)** - _Witnet, akıllı sözleşmelerin güçlü kripto-ekonomik garantilerle gerçek dünya olaylarına tepki vermesine yardımcı olan izinsiz, merkeziyetsiz ve sansüre dirençli bir kâhindir._

**[UMA Kâhini](https://uma.xyz)** - _UMA'nın iyimser kâhini, akıllı sözleşmelerin sigorta, finansal türevler ve tahmin piyasaları dâhil olmak üzere farklı uygulamalar için her türlü veriyi hızlı bir şekilde almasına olanak tanır._

**[Tellor](https://tellor.io/)** - _Tellor, akıllı sözleşmenizin ihtiyaç duyduğu her an herhangi bir veriyi kolayca alması için şeffaf ve izinsiz bir kâhin protokolüdür._

**[Band Protokolü](https://bandprotocol.com/)** - _Band Protokolü, gerçek dünya verilerini ve API'leri bir araya getiren ve akıllı sözleşmelere bağlayan zincirler arası bir veri kâhini platformudur._

**[Pyth Ağı](https://pyth.network/)** - _Pyth ağı, kurcalamaya karşı korumalı, merkeziyetsiz ve kendi kendini idame ettiren bir ortamda sürekli gerçek dünya verilerini zincir içinde yayınlamak için tasarlanmış birinci taraf bir finansal kâhin ağıdır._

**[API3 DAO](https://www.api3.org/)** - _API3 DAO, akıllı sözleşmeler için merkeziyetsiz bir çözümde daha fazla kaynak şeffaflığı, güvenlik ve ölçeklenebilirlik sağlayan birinci taraf kâhin çözümleri sunmaktadır_

**[Supra](https://supra.com/)** - Tüm blokzincirleri, halka açık (L1'ler ve L2'ler) veya özel (işletmeler) birbirine bağlayan, zincir içi ve zincir dışı kullanım senaryoları için kullanılabilecek merkeziyetsiz kâhin fiyat beslemeleri sağlayan dikey olarak entegre edilmiş bir zincirler arası çözümler araç takımı. 

**[Gas Ağı](https://gas.network/)** - Blokzincir genelinde gerçek zamanlı gas fiyatı verileri sağlayan dağıtık bir kâhin platformu. Önde gelen gas fiyatı veri sağlayıcılarından gelen verileri zincir içine taşıyarak Gas Ağı, birlikte çalışabilirliği artırmaya yardımcı olmaktadır. Gas Ağı, Ethereum Ana Ağı ve birçok önde gelen L2 dâhil olmak üzere 35'ten fazla zincir için verileri destekler.

**[DIA](https://www.diadata.org/)** - Tüm büyük varlık sınıflarında 20.000'den fazla varlık için doğrulanabilir veri beslemeleri sunan zincirler arası bir kâhin ağı. DIA, ham ticaret verilerini doğrudan 100'den fazla birincil piyasadan alır ve zincir içinde hesaplayarak, herhangi bir kullanım senaryosu için özel yapılandırmalarla tam veri şeffaflığı ve doğrulanabilirliği sağlar.

**[Stork](https://stork.network)** - Stork, sürekli vadeli işlem piyasaları, borç verme protokolleri ve DeFi ekosistemleri dâhil olmak üzere çok çeşitli kullanım senaryolarını destekleyerek ultra düşük gecikme süresiyle fiyat verileri sunar ve yeni varlıklar listelendiğinde hızla desteklenir.

## Daha fazla bilgi

**Makaleler**

- [Blokzincir Kâhini Nedir?](https://chain.link/education/blockchain-oracles) — _Chainlink_
- [Blokzincir Kâhini Nedir?](https://medium.com/better-programming/what-is-a-blockchain-oracle-f5ccab8dbd72) — _Patrick Collins_
- [Merkeziyetsiz Kâhinler: kapsamlı bir genel bakış](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) — _Julien Thevenard_
- [Ethereum'da Bir Blokzincir Kâhini Uygulamak](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [Akıllı sözleşmeler neden API çağrıları yapamaz?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) — _StackExchange_
- [Demek bir fiyat kâhini kullanmak istiyorsunuz](https://samczsun.com/so-you-want-to-use-a-price-oracle/) — _samczsun_

**Videolar**

- [Kâhinler ve Blokzincir Faydasının Genişlemesi](https://youtu.be/BVUZpWa8vpw) — _Real Vision Finance_

**Eğiticiler**

- [Solidity'de Ethereum'un Mevcut Fiyatı Nasıl Alınır](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) — _Chainlink_
- [Kâhin Verilerini Tüketmek](https://docs.chroniclelabs.org/Developers/tutorials/Remix) — _Chronicle_
- [Kâhinler Görevi](https://speedrunethereum.com/challenge/oracles) - _Speedrun Ethereum_

**Örnek projeler**

- [Solidity'de Ethereum için tam Chainlink başlangıç projesi](https://github.com/hackbg/chainlink-fullstack) — _HackBG_