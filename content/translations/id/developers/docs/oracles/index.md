---
title: Oracle
description: Oracle membantu memasukkan data dunia nyata ke dalam aplikasi Ethereum Anda karena kontrak pintar tidak dapat membuat kueri data dunia nyata dengan sendirinya.
lang: id
incomplete: true
---

Oracle adalah pengumpan data yang menghubungkan Ethereum ke informasi dunia nyata off-chain, sehingga Anda dapat membuat kueri data dalam kontrak pintar Anda. Sebagai contoh, dapp pasar prediksi menggunakan oracle untuk menyelesaikan pembayaran berdasarkan kejadian. Pasar prediksi mungkin meminta Anda untuk mempertaruhkan ETH siapa yang akan menjadi presiden Amerika Serikat berikutnya. Mereka akan menggunakan oracle untuk mengonfirmasi hasilnya dan membayar kepada para pemenang.

## Prasyarat {#prerequisites}

Pastikan Anda sudah familiar dengan [node](/developers/docs/nodes-and-clients/), [mekanisme konsensus](/developers/docs/consensus-mechanisms/), dan [anatomi kontrak pintar](/developers/docs/smart-contracts/anatomy/), khususnya aksi.

## Apa itu oracle {#what-is-an-oracle}

Oracle merupakan sebuah jembatan yang menghubungkan antara blockchain dan dunia nyata. Oracle bertindak sebagai API on-chain yang dapat Anda tanya untuk mendapatkan informasi tentang kontrak pintar Anda. Ini bisa berupa apa saja mulai dari informasi harga hingga laporan cuaca. Oracle dapat juga bersifat dua arah, yang digunakan untuk "mengirim" data ke dunia nyata.

Tonton Patrick menjelaskan Oracle:

<YouTube id="ZJfkNzyO7-U" start="10" />

## Mengapa oracle dibutuhkan? {#why-are-they-needed}

Dengan blockchain seperti Ethereum, Anda membutuhkan setiap node di jaringan untuk dapat memutar ulang setiap transaksi dan berakhir dengan hasil yang sama, yang terjamin. API mengenalkan data yang berpotensi menjadi variabel. Jika Anda mengirimkan ETH sesuai nilai $USD yang disetujui menggunakan API harga, kueri akan kembali dengan hasil yang berbeda setiap harinya. Belum lagi, API bisa diretas atau tidak digunakan lagi. Jika ini terjadi, node di jaringan tidak akan bisa berkesesuaian dengan state Ethereum saat ini, yang secara efektif melanggar [konsensus](/developers/docs/consensus-mechanisms/).

Oracle menyelesaikan masalah ini dengan mencatatkan data pada blockchain. Jadi node mana saja yang memutar ulang transaksi akan menggunakan data sama yang tidak bisa dirubah yang dicatatkan untuk dilihat semua orang. Untuk melakukan ini, oracle biasanya terdiri dari kontrak pintar dan beberapa komponen off-chain yang dapat meminta API, lalu mengirim transaksi secara berkala untuk memperbarui data kontrak pintar.

### Masalah oracle {#oracle-problem}

Seperti yang kami sebutkan, transaksi Ethereum tidak dapat mengakses data off-chain secara langsung. Pada saat yang sama, mengandalkan satu sumber kebenaran untuk menyediakan data tidaklah aman dan melanggar desentralisasi sebuah kontrak pintar. Ini dikenal sebagai masalah oracle.

Kita dapat menghindari masalah oracle dengan menggunakan oracle terdesentralisasi yang menarik data dari berbagai sumber data; jika sata sumber data diretas atau gagal, kontrak pintar akan tetap berfungsi sebagaimana mestinya.

### Keamanan {#security}

Oracle seaman sumber datanya. Jika dapp menggunakan Uniswap sebagai oracle untuk pengumpan harga ETH/DAI-nya, penyerang dapat memindahkan harga di Uniswap untuk memanipulasi kemampuan dapp dalam memahami harga terkini. Contoh cara melawannya adalah [sistem pengumpan](https://developer.makerdao.com/feeds/) seperti yang digunakan oleh MakerDAO, yang menyusun data harga dari banyak pengumpan harga eksternal ketimbang hanya bergantung pada satu sumber.

### Arsitektur {#architecture}

Ini adalah sebuah contoh arsitektur Oracle sederhana, tetapi masih ada lebih banyak cara dari pada hanya ini untuk memicu komputasi off-chain.

1. Keluarkan log dengan [aksi kontrak pintar](/developers/docs/smart-contracts/anatomy/#events-and-logs) Anda
2. Layanan off-chain telah berlangganan (biasanya menggunakan sesuatu seperti perintah `eth_subscribe` JSON-RPC) untuk jenis log khusus ini.
3. Layanan off-chain melanjutkan dengan melakukan beberapa tugas yang ditentukan oleh log.
4. Layanan off-chain menanggapi dengan mengirimkan data yang diminta dalam transaksi sekunder ke kontrak pintar.

Inilah cara mendapatkan data dengan cara 1 lawan 1, namun untuk meningkatkan keamanan, Anda mungkin ingin mendesentralisasikan cara mengumpulkan data off-chain Anda.

Langkah berikutnya mungkin membuat jaringan node ini melakukan pemanggilan terhadap API dan sumber yang beragam, dan mengumpulkan datanya secara on-chain.

[Chainlink Off-Chain Reporting](https://blog.chain.link/off-chain-reporting-live-on-mainnet/) (Chainlink OCR) telah meningkatkan metodologi ini dengan membuat jaringan oracle off-chain berkomunikasi satu sama lain, secara kriptografi menandatangani respons mereka, mengumpulkan respons off-chain mereka, dan hanya mengirim satu transaksi on-chain dengan hasilnya. Dengan cara ini, lebih sedikit gas terpakai, tetapi Anda masih mendapatkan jaminan data terdesentralisasi karena setiap node telah menandatangani bagian transaksi mereka, yang membuatnya tidak dapat diubah oleh node yang mengirimkan transaksi. Kebijakan eskalasi melakukan fungsinya jika node tidak melakukan transaksi, dan node berikutnya mengirimkan transaksi.

## Penggunaan {#usage}

Dengan menggunakan layanan seperti Chainlink, Anda dapat memberi referensi data terdesentralisasi on-chain yang telah ditarik dari dunia nyata dan dikumpulkan. Ini seperti kepemilikan umum, tetapi untuk data terdesentralisasi. Anda dapat juga membangun jaringan oracle modular sendiri untuk mendapatkan data yang disesuaikan yang Anda cari. Selain itu, Anda dapat melakukan komputasi off-chain dan sekaligus mengirimkan informasi ke dunia nyata. Chainlink memiliki infrastruktur bawaan untuk:

- [Mendapatkan pengumpan harga kripto di kontrak Anda](https://chain.link/solutions/defi)
- [Menghasilkan nomor acak yang terverifikasi (berguna untuk bermain game)](https://chain.link/solutions/chainlink-vrf)
- [Memanggil API eksternal](https://docs.chain.link/docs/request-and-receive-data) – Satu penggunaan baru untuk ini adalah [Memeriksa cadangan wBTC](https://cointelegraph.com/news/1b-in-wrapped-bitcoin-now-being-audited-using-chainlink-s-proof-of-reserve)

Ini adalah contoh cara mendapatkan harga ETH terbaru di dalam kontrak pintar Anda dengan menggunakan sebuah pengumpan harga Chainlink:

### Pengumpan Data Chainlink {#chainlink-data-feeds}

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

[Anda dapat menguji ini dalam remix dengan mengklik tautan ini](https://remix.ethereum.org/#version=soljson-v0.6.7+commit.b8d736ae.js&optimize=false&evmVersion=null&gist=0c5928a00094810d2ba01fd8d1083581)

[Lihat dokumen](https://docs.chain.link/docs/get-the-latest-price)

### Chainlink VRF {#chainlink-vrf}

Chainlink VRF (Verifiable Random Function) adalah sumber keacakan yang terbukti adil dan terverifikasi yang dirancang untuk kontrak pintar. Para pengembang kontrak pintar dapat menggunakan Chainlink VRF sebagai random number generation (RNG) yang tahan perubahan untuk membangun kontrak pintar handal untuk aplikasi apa pun yang mengandalkan hasil yang tidak terprediksi:

- Game dan NFT blockchain
- Penetapan acak untuk tugas dan sumber daya (misalnya secara acak menetapkan para hakim untuk menangani kasus)
- Memilih sampel representatif untuk mekanisme konsensus

Angka acak sulit dihasilkan karena blockchain bersifat deterministik.

Bekerja dengan Oracle Chainlink di luar pengumpan data mengikuti [siklus minta dan terima](https://docs.chain.link/docs/architecture-request-model) dengan Chainlink. Ini menggunakan token LINK untuk mengirimkan gas oracle kepada para penyedia oracle sebagai respons pengembalian. Token LINK khususnya dirancang untuk berfungsi dengan oracle dan didasarkan pada token ERC-677 yang ditingkatkan, yang kompatibel ke belakang dengan [ERC-20](/developers/docs/standards/tokens/erc-20/). Kode berikut ini, jika digunakan pada testnet Kovan akan mengambil angka acak yang terbukti secara kriptografis. Untuk membuat permintaan, taruhlah dana dalam kontrak dengan beberapa token LINK testnet yang bisa Anda dapatkan dari [Keran LINK Kovan](https://kovan.chain.link/).

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

### Penjaga Chainlink {#chainlink-keepers}

Kontrak pintar tidak dapat memicu atau memulai fungsinya sendiri pada waktu arbitrari atau dalam kondisi arbitrari. Perubahan state hanya akan terjadi ketika akun lainnya memulai transaksi (seperti pengguna, oracle, atau kontrak). [Jaringan Penjaga Chainlink](https://docs.chain.link/docs/chainlink-keepers/introduction/) menyediakan opsi bagi kontrak pintar untuk men-outsource tugas pemeliharaan reguler dalam cara yang terpercaya, sederhana, dan terdesentralisasi.

Untuk menggunakan Penjaga Chainlink, suatu kontrak pintar harus mengimplementasikan [KeeperCompatibleInterface](https://docs.chain.link/docs/chainlink-keepers/compatible-contracts/), yang terdiri dari dua fungsi:

- `checkUpkeep` - Memeriksa apakah kontrak membutuhkan pemeliharaan yang perlu dilakukan.
- `performUpkeep` - Melakukan pemeliharaan pada kontrak, jika diinstruksikan oleh checkUpkeep.

Contoh di bawah adalah suatu kontrak penghitung sederhana. Variabel `counter` ditambahkan sebanyak satu oleh setiap pemanggilan ke `performUpkeep`. Anda dapat [melihat kode berikut ini dengan menggunakan Remix](https://remix.ethereum.org/#url=https://docs.chain.link/samples/Keepers/KeepersCounter.sol)

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
        // We don't use the checkData in this example. checkData ditentukan ketika Upkeep didaftarkan.
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        lastTimeStamp = block.timestamp;
        counter = counter + 1;
        // We don't use the performData in this example. performData dibuat oleh pemanggilan Penjaga ke fungsi checkUpkeep Anda
    }
}
```

Setelah menyebarkan kontrak yang kompatibel dengan Penjaga, Anda harus mendaftarkan kontrak untuk [Upkeep](https://docs.chain.link/docs/chainlink-keepers/register-upkeep/) dan membiayainya dengan LINK, untuk memberitahu Jaringan Penjaga tentang kontrak Anda, sehingga pemeliharaan Anda dilakukan secara berkelanjutan.

### Proyek Penjaga {#keepers}

- [Penjaga Chainlink](https://keepers.chain.link/)
- [Jaringan Keep3r](https://docs.keep3r.network/)

### Pemanggilan API Chainlink {#chainlink-api-call}

[Pemanggilan API Chainlink](https://docs.chain.link/docs/make-a-http-get-request) merupakan cara termudah untuk mendapatkan data dari dunia off-chain dengan cara tradisional yang memfungsikan web: pemanggilan API. Melakukan satu instance ini dan hanya memiliki satu oracle akan membuatnya terpusat secara alami. Agar benar-benar terdesentralisasi, platform kontrak pintar perlu menggunakan banyak node yang ditemukan di [pasar data eksternal](https://market.link/).

[Sebarkan kode berikut ini di remix pada jaringan kovan untuk mengujinya](https://remix.ethereum.org/#version=soljson-v0.6.7+commit.b8d736ae.js&optimize=false&evmVersion=null&gist=8a173a65099261582a652ba18b7d96c1)

Ini juga mengikuti siklus minta dan terima oracle dan mengharuskan kontrak untuk didanai dengan LINK Kovan (gas oracle) agar berfungsi.

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

Anda dapat mempelajari lebih lanjut tentang penerapan Chainlink dengan membaca [Blog pengembang Chainlink](https://blog.chain.link/tag/developers/).

## Layanan Oracle {#other-services}

- [Chainlink](https://chain.link/)
- [Witnet](https://witnet.io/)
- [Dapat dibuktikan](https://provable.xyz/)
- [Paralink](https://paralink.network/)
- [Dos.Network](https://dos.network/)

### Membuat sebuah oracle kontrak pintar {#build-an-oracle-smart-contract}

Ini adalah suatu contoh kontrak oracle oleh Pedro Costa. Anda dapat menemukan penjelasan lebih lanjut di artikelnya: [Mengimplementasikan Oracle Blockchain di Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e).

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

_Kami ingin lebih banyak dokumentasi tentang pembuatan sebuah oracle kontrak pintar. Jika Anda dapat membantu, buat sebuah PR!_

## Bacaan lebih lanjut {#further-reading}

**Artikel**

- [Apa itu Oracle Blockchain?](https://chain.link/education/blockchain-oracles) - _Chainlink_
- [Apa itu Oracle Blockchain?](https://betterprogramming.pub/what-is-a-blockchain-oracle-f5ccab8dbd72) - _Patrick Collins_
- [Oracle Terdesentralisasi: gambaran umum lengkap](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) – _Julien Thevenard_
- [Mengimplementasikan Oracle Blockchain di Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) – _Pedro Costa_
- [Mengapa kontrak pintar tidak bisa melakukan pemanggilan API?](https://ethereum.stackexchange.com/questions/301/why-cant-contracts-make-api-calls) - _StackExchange_
- [Mengapa kita memerlukan oracle terdesentralisasi](https://newsletter.banklesshq.com/p/why-we-need-decentralized-oracles) - _Bankless_
- [Jadi, Anda ingin menggunakan oracle harga](https://samczsun.com/so-you-want-to-use-a-price-oracle/) -_samczsun_

**Video**

- [Oracle dan Ekspansi Utilitas Blockchain](https://youtu.be/BVUZpWa8vpw) - _Real Vision Finance_

**Tutorial**

- [Bagaimana cara Mengambil Harga Ethereum Saat Ini di Solidity](https://blog.chain.link/fetch-current-crypto-price-data-solidity/) - _Chainlink_
