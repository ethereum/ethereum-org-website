---
title: Oracles
description: Kâhinler (Oracle), gerçek dünya verilerini Ethereum uygulamanıza almanıza yardımcı olur çünkü akıllı sözleşmeler gerçek dünya verilerini kendi başlarına sorgulayamaz.
lang: tr
incomplete: true
---

Kâhinler, akıllı sözleşmelerinizdeki verileri sorgulayabilmeniz için Ethereum'u zincir dışı ve gerçek dünya bilgilerine bağlayan veri akışlarıdır. Örneğin, tahmin piyasası uygulamaları, olaylara dayalı olarak ödemeleri tamamlamak için kâhinleri kullanır. Bir tahmin piyasası, Amerika Birleşik Devletleri'nin bir sonraki başkanına ETH'nize bahse girmenizi isteyebilir. Sonucu onaylamak ve kazananlara ödeme yapmak için bir kâhin kullanırlar.

## Ön koşullar {#prerequisites}

[Düğümlere](/developers/docs/nodes-and-clients/), [mutabakat mekanizmalarına](/developers/docs/consensus-mechanisms/) ve özellikle olaylar olmak üzere [akıllı sözleşme anatomisine](/developers/docs/smart-contracts/anatomy/) aşina olduğunuzdan emin olun.

## Kâhin nedir {#what-is-an-oracle}

Kâhin, blok zinciri ile gerçek dünya arasında bir köprüdür. Akıllı sözleşmelerinize bilgi almak için sorgulayabileceğiniz zincir üstü API görevi görürler. Bu, fiyat bilgisinden hava durumu raporlarına kadar her şey olabilir. Kâhinler, verileri gerçek dünyaya "göndermek" için iki yönlü olarak da kullanılabilir.

Patrick'in Kâhinler hakkındaki açıklamasını izleyin:

<YouTube id="ZJfkNzyO7-U" start="10" />

## Bunlar neden gereklidir? {#why-are-they-needed}

Ethereum gibi bir blok zinciri ile her işlemi tekrar yapmak ve aynı sonucu garanti etmek için ağdaki her düğüme ihtiyacınız vardır. API'ler potansiyel olarak değişken veriler sunar. Bir fiyat API'si kullanarak kabul edilmiş bir $USD değerine dayalı olarak ETH gönderiyorsanız, sorgu bir günden diğerine farklı bir sonuç döndürür. Ayrıca API hack'lenebilir veya kullanımdan kaldırılabilir. Bu olursa, ağdaki düğümler Ethereum'un mevcut durumu üzerinde anlaşamaz ve [mutabakatı](/developers/docs/consensus-mechanisms/) etkin bir şekilde bozar.

Kâhinler, bu sorunu verileri blok zincirine göndererek çözer. Bu nedenle, işlemi yeniden yürüten herhangi bir düğüm, herkesin görmesi için gönderilen aynı değişmez verileri kullanacaktır. Bunu yapmak için, bir kâhin tipik olarak bir akıllı sözleşmeden ve API'leri sorgulayabilen ve ardından akıllı sözleşmenin verilerini güncellemek için periyodik olarak işlemler gönderebilen bazı zincir dışı bileşenlerden oluşur.

### Kâhin sorunu {#oracle-problem}

Bahsettiğimiz gibi, Ethereum işlemleri zincir dışı verilere doğrudan erişemez. Aynı zamanda, veri sağlamak için tek bir gerçek kaynağına güvenmek güvenli değildir ve akıllı bir sözleşmenin merkeziyetsizliğini geçersiz kılar. Bu, kâhin problemi olarak bilinir.

Birden çok veri kaynağından veri alan merkeziyetsiz bir kâhin kullanarak Kâhin probleminden kaçınabiliriz; bir veri kaynağı saldırıya uğrarsa veya başarısız olursa, akıllı sözleşme amaçlandığı gibi çalışmaya devam eder.

### Güvenlik {#security}

Bir kâhin, yalnızca kendi veri kaynakları kadar güvenlidir. Bir dapp, ETH/DAI fiyat beslemesi için bir kâhin olarak Uniswap'i kullanırsa bir saldırgan, dapp'in mevcut fiyat anlayışını manipüle etmek için Uniswap'teki fiyatı hareket ettirebilir. Bununla nasıl mücadele edileceğine dair bir örnek, MakerDAO tarafından kullanılan, sadece tek bir kaynağa güvenmek yerine birçok harici fiyat beslemelerinden fiyat verilerini toplayan [bir besleme sistemidir](https://developer.makerdao.com/feeds/).

### Mimari {#architecture}

Bu, basit bir Kâhin mimarisinin bir örneğidir, ancak zincir dışı hesaplamayı tetiklemek için bundan daha fazla yol vardır.

1. [Akıllı sözleşme olayınızla](/developers/docs/smart-contracts/anatomy/#events-and-logs) bir kayıt yayınlayın
2. Zincir dışı bir hizmet (genellikle JSON-RPC `eth_subscribe` komutu gibi bir şey kullanarak) bu belirli günlüklere abone olmuştur.
3. Zincir dışı hizmet, kayıtlarda tanımlanan bazı görevleri yerine getirmeye devam eder.
4. Zincir dışı hizmet, akıllı sözleşmeye ikincil bir işlemde istenen verilerle yanıt verir.

Verileri 1'e 1 şeklinde böyle alabilirsiniz ancak güvenliği artırmak için zincir dışı verileri toplama şeklinizi merkeziyetsizleştirmek isteyebilirsiniz.

Bir sonraki adım, farklı API'lere ve kaynaklara bu çağrıları yapan ve zincirdeki verileri toplayan bu düğümlerden oluşan bir ağa sahip olmak olabilir.

[Chainlink Zincir Dışı Raporlaması](https://blog.chain.link/off-chain-reporting-live-on-mainnet/) (Chainlink OCR), zincir dışı kâhin ağının birbirleriyle iletişim kurması, yanıtlarını kriptografik olarak imzalaması, yanıtlarını zincir dışı olarak toplaması ve sonuçta zincir üstünde yalnızca bir işlem göndermesi ile bu metodolojiyi geliştirdi. Bu şekilde daha az gaz harcanmasının yanı sıra her düğüm, işlemin kendi bölümünü imzaladığı ve işlemi gönderen düğüm tarafından değiştirilemez hâle getirdiği için merkeziyetsiz veri garantisine sahip olursunuz. Düğüm işlem yapmazsa yükseltme politikası devreye girer ve sonraki düğüm işlemi gönderir.

## Kullanım {#usage}

Chainlink gibi hizmetleri kullanarak, halihazırda gerçek dünyadan alınmış ve bir araya getirilmiş zincir üzerindeki merkeziyetsiz verileri referans verebilirsiniz. Merkeziyetsiz veriler için bir tür ortak ortak alan gibidir. Aradığınız herhangi bir özelleştirilmiş veriyi elde etmek için kendi modüler kâhin ağlarınızı da oluşturabilirsiniz. Ek olarak, zincir dışı hesaplama yapabilir ve gerçek dünyaya da bilgi gönderebilirsiniz. Chainlink şunları yapabilmeniz için altyapılara sahiptir:

- [Sözleşmenizde kripto fiyat bilgileri alın](https://chain.link/solutions/defi)
- [Doğrulanabilir rastgele sayılar oluşturun (oyunlar için kullanışlıdır)](https://chain.link/solutions/chainlink-vrf)
- [Harici API'leri çağırma](https://docs.chain.link/docs/request-and-receive-data) - Bunun yeni bir kullanımı, [ wBTC rezervlerini kontrol etmektir](https://cointelegraph.com/news/1b-in-wrapped-bitcoin-now-being-audited-using-chainlink-s-proof-of-reserve)

Bir Chainlink fiyat beslemesi kullanarak akıllı sözleşmenizde en son ETH fiyatını nasıl alacağınıza dair bir örnek:

### Chainlink Bilgi Beslemeleri {#chainlink-data-feeds}

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

[Bunu, bu bağlantı ile remix'te test edebilirsiniz](https://remix.ethereum.org/#version=soljson-v0.6.7+commit.b8d736ae.js&optimize=false&evmVersion=null&gist=0c5928a00094810d2ba01fd8d1083581)

[Belgeleri görüntüle](https://docs.chain.link/docs/get-the-latest-price)

### Chainlink VRF {#chainlink-vrf}

Chainlink VRF (Doğrulanabilir Rastgele İşlev), akıllı sözleşmeler için tasarlanmış, kanıtlanabilir şekilde adil ve doğrulanabilir bir rastgelelik kaynağıdır. Akıllı sözleşme geliştiricileri, öngörülemeyen sonuçlara dayanan herhangi bir uygulama için güvenilir akıllı sözleşmeler oluşturmak üzere kurcalamaya karşı korumalı rastgele sayı oluşturma (RNG) olarak Chainlink VRF'yi kullanabilir:

- Blok zinciri oyunları ve NFT'ler
- Görevlerin ve kaynakların rastgele atanması (örneğin yargıçların davalara rastgele atanması)
- Mutabakat mekanizmaları için temsili bir örnek seçme

Blok zincirleri deterministik olduğu için Rrastgele sayılar zordur.

Chainlink Kâhinleri ile veri akışlarının dışında çalışmak, Chainlink ile çalışmanın [talep ve alma döngüsünü](https://docs.chain.link/docs/architecture-request-model) takip eder. Yanıtları döndürmek için Kâhin sağlayıcılarına Kâhin gazı göndermek için LINK token'ını kullanırlar. LINK token, özellikle kâhinlerle çalışmak üzere tasarlanmıştır ve [ERC-20](/developers/docs/standards/tokens/erc-20/) ile geriye dönük uyumlu olan yükseltilmiş ERC-677 token'ı temel alır. Aşağıdaki kod, Kovan test ağında dağıtılırsa kriptografik olarak kanıtlanmış bir rastgele sayı alır. Talepte bulunmak için sözleşmeyi, [Kovan LINK Faucet](https://kovan.chain.link/)'ten alabileceğiniz bir test ağı LINK token'ı ile finanse edin.

```javascript

pragma solidity 0.6.6;

import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";

contract RandomNumberConsumer is VRFConsumerBase {

    bytes32 internal keyHash;
    uint256 internal fee;

    uint256 public randomResult;

    /**
     * Constructor inherits VRFConsumerBase
     *
     * Network: Kovan
     * Chainlink VRF Coordinator address: 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9
     * LINK token address:                0xa36085F69e2889c224210F603D836748e7dC0088
     * Key Hash: 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4
     */
    constructor()
        VRFConsumerBase(
            0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9, // VRF Coordinator
            0xa36085F69e2889c224210F603D836748e7dC0088  // LINK Token
        ) public
    {
        keyHash = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4;
        fee = 0.1 * 10 ** 18; // 0.1 LINK (varies by network)
    }

    /**
     * Requests randomness from a user-provided seed
     */
    function getRandomNumber(uint256 userProvidedSeed) public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        return requestRandomness(keyHash, fee, userProvidedSeed);
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        randomResult = randomness;
    }
}
```

### Chainlink Keepers {#chainlink-keepers}

Akıllı sözleşmeler, keyfi zamanlarda veya keyfi koşullar altında kendi işlevlerini tetikleyemez veya başlatamaz. Durum değişiklikleri, yalnızca başka bir hesap bir işlem (bir kullanıcı, kâhin veya sözleşme gibi) başlattığında gerçekleşir. [Chainlink Keeper Network](https://docs.chain.link/docs/chainlink-keepers/introduction/), düzenli bakım görevlerini güvenle en aza indirilmiş ve merkeziyetsiz bir şekilde dışarıdan temin etmek için akıllı sözleşmeler için seçenekler sunar.

Chainlink Keepers'ı kullanmak için, bir akıllı sözleşme [KeeperCompatibleInterface](https://docs.chain.link/docs/chainlink-keepers/compatible-contracts/) arayüzünü sağlamalıdır, bu arayüz iki fonksiyondan oluşur:

- `checkUpkeep` - Sözleşmede iş yapılmasının gerekip gerekmediğini kontrol eder.
- `performUpkeep` - checkUpkeep tarafından emir verilirse işi sözleşme üzerinde gerçekleştirir.

Aşağıdaki örnek basit bir sayaç sözleşmesidir. `counter` değişkeni, `performUpkeep` öğesine yapılan her çağrıda birer birer artırılır. [Sıradaki kodu Remix kullanarak deneyebilirsiniz](https://remix.ethereum.org/#url=https://docs.chain.link/samples/Keepers/KeepersCounter.sol)

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

// KeeperCompatible.sol imports the functions from both ./KeeperBase.sol and
// ./interfaces/KeeperCompatibleInterface.sol
import "@chainlink/contracts/src/v0.7/KeeperCompatible.sol";

contract Counter is KeeperCompatibleInterface {
    /**
    * Public counter variable
    */
    uint public counter;

    /**
    * Use an interval in seconds and a timestamp to slow execution of Upkeep
    */
    uint public immutable interval;
    uint public lastTimeStamp;

    constructor(uint updateInterval) {
      interval = updateInterval;
      lastTimeStamp = block.timestamp;

      counter = 0;
    }

    function checkUpkeep(bytes calldata /* checkData */) external override returns (bool upkeepNeeded, bytes memory /* performData */) {
        upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;
        // We don't use the checkData in this example. CheckData, Upkeep kaydedildiğinde tanımlanır.
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        lastTimeStamp = block.timestamp;
        counter = counter + 1;
        // We don't use the performData in this example. PerformData, Keeper'ın checkUpkeep işlevinize yaptığı çağrıyla oluşturulur.
     }
}
```

Keeper uyumlu bir sözleşmeyi dağıttıktan sonra, sözleşmeyi [Bakım](https://docs.chain.link/docs/chainlink-keepers/register-upkeep/) için kaydettirmeli ve sözleşmeniz hakkında Keeper Network'ü bilgilendirmek amacıyla LINK ile bunu finans etmelisiniz, böylece işiniz sürekli olarak yapılır.

### Keepers projeleri {#keepers}

- [Chainlink Keepers](https://keepers.chain.link/)
- [Keep3r Network](https://docs.keep3r.network/)

### Chainlink API Çağrısı {#chainlink-api-call}

[Chainlink API Çağrıları](https://docs.chain.link/docs/make-a-http-get-request), web'in geleneksel şekilde çalıştığı şekilde zincir dışı dünyadan veri almanın en kolay yoludur: API çağrıları. Bunun tek bir örneğini yapmak ve tek bir kâhine sahip olmak, bunu doğası gereği merkezileştirir. Bir akıllı sözleşme platformunun, gerçekten merkeziyetsiz şekilde kalmak için bir [harici veri pazarında](https://market.link/) bulunan çok sayıda düğümü kullanması gerekir.

[Test etmek için aşağıdaki kodu kovan ağında remix'te dağıtın](https://remix.ethereum.org/#version=soljson-v0.6.7+commit.b8d736ae.js&optimize=false&evmVersion=null&gist=8a173a65099261582a652ba18b7d96c1)

Bu aynı zamanda kâhinlerin talep ve alma döngüsünü de takip eder ve çalışması için Kovan LINK (kâhin gazı) ile finanse edilecek sözleşmeye ihtiyaç duyar.

```javascript
pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

contract APIConsumer is ChainlinkClient {

    uint256 public volume;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    /**
     * Network: Kovan
     * Oracle: 0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e
     * Job ID: 29fa9aa13bf1468788b7cc4a500a45b8
     * Fee: 0.1 LINK
     */
    constructor() public {
        setPublicChainlinkToken();
        oracle = 0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e;
        jobId = "29fa9aa13bf1468788b7cc4a500a45b8";
        fee = 0.1 * 10 ** 18; // 0.1 LINK
    }

    /**
     * Create a Chainlink request to retrieve API response, find the target
     * data, then multiply by 1000000000000000000 (to remove decimal places from data).
     */
    function requestVolumeData() public returns (bytes32 requestId)
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        // Set the URL to perform the GET request on
        request.add("get", "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD");

        // Set the path to find the desired data in the API response, where the response format is:
        // {"RAW":
        //   {"ETH":
        //    {"USD":
        //     {
        //      "VOLUME24HOUR": xxx.xxx,
        //     }
        //    }
        //   }
        //  }
        request.add("path", "RAW.ETH.USD.VOLUME24HOUR");

        // Multiply the result by 1000000000000000000 to remove decimals
        int timesAmount = 10**18;
        request.addInt("times", timesAmount);

        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    /**
     * Receive the response in the form of uint256
     */
    function fulfill(bytes32 _requestId, uint256 _volume) public recordChainlinkFulfillment(_requestId)
    {
        volume = _volume;
    }
}
```

[Chainlink geliştiricileri bloğunu](https://blog.chain.link/tag/developers/) okuyarak Chainlink uygulamaları hakkında daha fazla bilgi edinebilirsiniz.

## Kâhin hizmetleri {#other-services}

- [Chainlink](https://chain.link/)
- [Witnet](https://witnet.io/)
- [Provable](https://provable.xyz/)
- [Paralink](https://paralink.network/)
- [Dos.Network](https://dos.network/)

### Bir Kâhin akıllı sözleşmesi oluşturun {#build-an-oracle-smart-contract}

İşte Pedro Costa'nın örnek bir kâhin sözleşmesi. [Ethereum'da Blok Zinciri Kâhin Uygulaması](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) makalesinde daha fazla açıklama bulabilirsiniz.

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
    mapping(uint => string) anwers;     //answers provided by the oracles
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
        if(bytes(currRequest.anwers[tmpI]).length == 0){
          found = true;
          currRequest.anwers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //iterate through oracle list and check if enough oracles(minimum quorum)
      //have voted the same answer has the current one
      for(uint i = 0; i < totalOracleCount; i++){
        bytes memory a = bytes(currRequest.anwers[i]);
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

_Bir Kâhin akıllı sözleşmesi oluşturmaya ilişkin daha fazla belgeye sahip olmak istiyoruz. Yardım edebilecekseniz, bir PR oluşturun!_

## Daha fazla bilgi {#further-reading}

**Makaleler**

- [Bir Blok Zinciri Kâhini nedir?](https://chain.link/education/blockchain-oracles) - _Chainlink_
- [Blok Zinciri Kâhini nedir?](https://betterprogramming.pub/what-is-a-blockchain-oracle-f5ccab8dbd72) - _Patrick Collins_
- [Merkeziyetsiz Kâhinler: kapsamlı bir genel bakış](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) – _Julien Thevenard_
- [Ethereum'da Blok Zinciri Kâhin Uygulaması](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [Akıllı sözleşmeler neden API çağrıları yapamıyor?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) - _StackExchange_
- [Neden merkeziyetsiz kâhinlere ihtiyaç duyuyoruz](https://newsletter.banklesshq.com/p/why-we-need-decentralized-oracles) - _Bankless_
- [Demek bir fiyat kâhini kullanmak istiyorsunuz](https://samczsun.com/so-you-want-to-use-a-price-oracle/) -_samczsun_

**Videolar**

- [Kâhinler ve Blok Zinciri Hizmetlerinin Genişlemesi](https://youtu.be/BVUZpWa8vpw) - _Real Vision Finance_

**Öğreticiler**

- [Solidity'de Mevcut Ethereum Fiyatı Nasıl Alınır](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) - _Chainlink_
