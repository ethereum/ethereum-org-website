---
title: JavaScript API kütüphaneleri
description: Uygulamanızdan blokzincir ile etkileşime girmenizi sağlayan JavaScript istemci kütüphanelerine giriş.
lang: tr
---

Bir web uygulamasının Ethereum blokzinciri ile etkileşime girebilmesi (yani blokzincir verilerini okuması ve/veya ağa işlemler göndermesi) için bir Ethereum düğümüne bağlanması gerekir.

Bu amaçla, her Ethereum istemcisi [JSON-RPC](/developers/docs/apis/json-rpc/) spesifikasyonunu uygular, böylece uygulamaların güvenebileceği tek tip bir [yöntemler](/developers/docs/apis/json-rpc/#json-rpc-methods) seti bulunur.

Bir Ethereum düğümüne bağlanmak için JavaScript kullanmak istiyveyasanız, saf (vanilla) JavaScript kullanmak mümkündür ancak ekosistemde bunu çok daha kolaylaştıran çeşitli kolaylık kütüphaneleri mevcuttur. Bu kütüphanelerle geliştiriciler, Ethereum ile etkileşime giren JSON-RPC isteklerini (arka planda) başlatmak için sezgisel, tek satırlık yöntemler yazabilirler.

Lütfen [Birleşme](/roadmap/merge/)'den bu yana, bir düğümü çalıştırmak için birbirine bağlı iki Ethereum yazılımı parçasının (bir yürütme istemcisi ve bir fikir birliği istemcisi) gerekli olduğunu unutmayın. Lütfen düğümünüzün hem bir yürütme hem de fikir birliği istemcisi içerdiğinden emin olun. Düğümünüz yerel makinenizde değilse (örneğin, düğümünüz bir AWS bulut sunucusunda çalışıyveyasa) eğitimdeki IP adreslerini buna göre güncelleyin. Daha fazla bilgi için lütfen [bir düğüm çalıştırma](/developers/docs/nodes-and-clients/run-a-node/) sayfamıza bakın.

## Ön koşullar {#prerequisites}

JavaScript'i anlamanın yanı sıra, [Ethereum yığınını](/developers/docs/ethereum-stack/) ve [Ethereum istemcilerini](/developers/docs/nodes-and-clients/) anlamak da faydalı olabilir.

## Neden bir kütüphane kullanmalısınız? {#why-use-a-library}

Bu kütüphaneler, doğrudan bir Ethereum düğümüyle etkileşime girmenin karmaşıklığının çoğunu soyutlar. Ayrıca yardımcı işlevler (örneğin, ETH'yi Gwei'ye dönüştürmek) sağlarlar, böylece bir geliştirici olarak Ethereum istemcilerinin incelikleriyle uğraşmak için daha az, uygulamanızın benzersiz işlevselliğine odaklanmak için daha fazla zaman harcayabilirsiniz.

## Kütüphane özellikleri {#library-features}

### Ethereum düğümlerine bağlanma {#connect-to-ethereum-nodes}

Sağlayıcıları kullanarak bu kütüphaneler, ister JSON-RPC, ister INFURA, Etherscan, Alchemy veya MetaMask üzerinden olsun, Ethereum'a bağlanmanıza ve verilerini okumanıza olanak tanır.

> **Uyarı:** Web3.js, 4 Mart 2025'te arşivlendi. [Duyuruyu okuyun](https://blog.chainsafe.io/web3-js-sunset/). Yeni projeler için [ethers.js](https://ethers.veyag) veya [viem](https://viem.sh) gibi alternatif kütüphaneler kullanmayı düşünün.

**Ethers örneği**

```js
// Bir BrowserProvider, standart bir Web3 sağlayıcısını sarar, ki bu
// MetaMask'ın her sayfaya window.ethereum olarak enjekte ettiği şeydir
const provider = new ethers.BrowserProvider(window.ethereum)

// MetaMask eklentisi ayrıca şunlar için işlemleri imzalamaya olanak tanır:
// ether göndermek ve Blokzincir içindeki durumu değiştirmek için ödeme yapmak.
// Bunun için hesap imzalayıcısına ihtiyacımız var...
const signer = provider.getSigner()
```

**Web3js örneği**

```js
var web3 = new Web3("http://localhost:8545")
// or
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// sağlayıcıyı değiştir
web3.setProvider("ws://localhost:8546")
// or
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// node.js'te IPC sağlayıcısını kullanma
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // mac os yolu
// or
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // mac os yolu
// windows'ta yol şudur: "\\\\.\\pipe\\geth.ipc"
// linux'ta yol şudur: "/users/myuser/.ethereum/geth.ipc"
```

Kurulum tamamlandıktan sonra blokzinciri şunlar için sorgulayabileceksiniz:

- blok numaraları
- gaz tahminleri
- akıllı sözleşme olayları
- ağ kimliği
- ve daha fazlası...

### Cüzdan işlevselliği {#wallet-functionality}

Bu kütüphaneler size cüzdan oluşturma, anahtarları yönetme ve işlemleri imzalama işlevselliği sunar.

İşte Ethers'tan bir örnek

```js
// Bir anımsatıcıdan bir Cüzdan örneği oluşturun...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...veya bir özel anahtardan
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// İmzalayıcı API'sine göre bir Promise olarak adres
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// Bir Cüzdan adresi senkron olarak da mevcuttur
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// Dahili kriptografik bileşenler
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// Cüzdan anımsatıcısı
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// Not: Özel anahtarla oluşturulan bir Cüzdan
//       bir anımsatıcıya sahip değildir (türetme bunu engeller)
walletPrivateKey.mnemonic
// null

// Bir mesajı imzalama
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// Bir işlemi imzalama
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// connect yöntemi, bir sağlayıcıya bağlı
// Cüzdanın yeni bir örneğini döndürür
wallet = walletMnemonic.connect(provider)

// Ağı sorgulama
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// Ether gönderme
wallet.sendTransaction(tx)
```

[Tüm belgeleri okuyun](https://docs.ethers.io/v5/api/signer/#Wallet)

Kurulum tamamlandıktan sonra şunları yapabileceksiniz:

- hesaplar oluşturmak
- işlemler göndermek
- işlemleri imzalamak
- ve daha fazlası...

### Akıllı sözleşme işlevleriyle etkileşim {#interact-with-smart-contract-functions}

JavaScript istemci kütüphaneleri, derlenmiş bir sözleşmenin Uygulama İkili Arabirimini (ABI) okuyarak uygulamanızın akıllı sözleşme işlevlerini çağırmasına olanak tanır.

ABI temel olarak sözleşmenin işlevlerini JSON formatında açıklar ve onu normal bir JavaScript nesnesi gibi kullanmanıza olanak tanır.

Yani aşağıdaki Solidity sözleşmesi:

```solidity
contract Test {
    uint a;
    address d = 0x12345678901234567890123456789012;

    constructor(uint testInt)  { a = testInt;}

    event Event(uint indexed b, bytes32 c);

    event Event2(uint indexed b, bytes32 c);

    function foo(uint b, bytes32 c) returns(address) {
        Event(b, c);
        return d;
    }
}
```

Aşağıdaki JSON ile sonuçlanacaktır:

```json
[{
    "type":"constructor",
    "payable":false,
    "stateMutability":"nonpayable"
    "inputs":[{"name":"testInt","type":"uint256"}],
  },{
    "type":"function",
    "name":"foo",
    "constant":false,
    "payable":false,
    "stateMutability":"nonpayable",
    "inputs":[{"name":"b","type":"uint256"}, {"name":"c","type":"bytes32"}],
    "outputs":[{"name":"","type":"address"}]
  },{
    "type":"event",
    "name":"Event",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"}, {"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
  },{
    "type":"event",
    "name":"Event2",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"},{"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
}]
```

Bu şu anlama gelir:

- Akıllı sözleşmeye bir işlem gönderip yöntemini yürütebilirsiniz
- EVM'de yürütüldüğünde bir yöntem yürütmesinin alacağı gazı tahmin etmek için çağrı yapabilirsiniz
- Bir sözleşme dağıtabilirsiniz
- Ve daha fazlası...

### Yardımcı işlevler {#utility-functions}

Yardımcı işlevler, Ethereum ile geliştirmeyi biraz daha kolaylaştıran kullanışlı kısayollar sunar.

ETH değerleri varsayılan olarak Wei cinsindendir. 1 ETH = 1.000.000.000.000.000.000 WEI – bu, çok sayıda rakamla uğraştığınız anlamına gelir! `web3.utils.toWei`, Ether'i sizin için Wei'ye dönüştürür.

Ve ethers'ta şu şekilde görünür:

```js
// Bir hesabın bakiyesini alma (adres veya ENS adına göre)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// Genellikle çıktıyı, değerleri ether (Wei yerine) cinsinden
// görmeyi tercih eden kullanıcı için biçimlendirmeniz gerekecektir
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Web3js yardımcı işlevleri](https://docs.web3js.org/api/web3-utils)
- [Ethers yardımcı işlevleri](https://docs.ethers.org/v6/api/utils/)

## Mevcut kütüphaneler {#available-libraries}

**Web3.js -** **_Ethereum JavaScript API._**

- [Belgeler](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_JavaScript ve TypeScript'te eksiksiz Ethereum cüzdan uygulaması ve yardımcı programları._**

- [Ethers.js ana sayfası](https://ethers.org/)
- [Belgeler](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph -** **_Ethereum ve IPFS verilerini indekslemek ve GraphQL kullanarak sorgulamak için bir protokol._**

- [The Graph](https://thegraph.com)
- [Graph Gezgini](https://thegraph.com/explorer)
- [Belgeler](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [Discord](https://thegraph.com/discord)

**Alchemy SDK -** **_Gelişmiş API'lere sahip Ethers.js sarmalayıcısı._**

- [Belgeler](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem -** **_Ethereum için TypeScript Arayüzü._**

- [Belgeler](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Codex -** **_Düzinelerce zincirde gerçek zamanlı, zenginleştirilmiş blokzincir veri API'si._**

- [Belgeler](https://docs.codex.io)
- [Gezgin](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [Discord](https://discord.com/invite/mFpUhT3vAq)

**Drift -** **_Yerleşik önbelleğe alma, kancalar (hooks) ve test taklitleri (mocks) içeren TypeScript meta kütüphanesi._**

- [Belgeler](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## Daha fazla bilgi {#further-reading}

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve ekleyin!_

## İlgili konular {#related-topics}

- [Düğümler ve istemciler](/developers/docs/nodes-and-clients/)
- [Geliştirme çerçeveleri](/developers/docs/frameworks/)

## İlgili eğitimler {#related-tutorials}

- [JavaScript'te Ethereum blokzincirini kullanmak için Web3js'i kurun](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Projenizde web3.js'i kurmak için talimatlar._
- [JavaScript'ten bir akıllı sözleşme çağırma](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI token'ını kullanarak, JavaScript ile sözleşme işlevlerinin nasıl çağrılacağını görün._
- [web3 ve Alchemy kullanarak işlem gönderme](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– Arka uçtan işlem göndermek için adım adım kılavuz._

## Eğitimler: Ethereum'da JavaScript API'leri ve WebSocket'ler {#tutorials}

- [WebSocket'leri Kullanma](/developers/tutorials/using-websockets/) _– Ethereum olaylarına abone olmak ve gerçek zamanlı JSON-RPC istekleri yapmak için Alchemy ile WebSocket'lerin nasıl kullanılacağı._