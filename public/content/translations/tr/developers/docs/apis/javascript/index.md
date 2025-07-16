---
title: JavaScript API kütüphaneleri
description: Uygulamanızdan blok zinciri ile etkileşime girmenizi sağlayan JavaScript istemci kütüphanelerine giriş.
lang: tr
---

Bir web uygulamasının Ethereum blok zinciri ile etkileşime girebilmesi için (yani blok zinciri verilerini okuması ve/veya ağa işlem gönderebilmesi) bir Ethereum düğümüne bağlanması gerekir.

Bu amaçla, her Ethereum istemcisi [JSON-RPC](/developers/docs/apis/json-rpc/) özelliklerini uygular, böylece uygulamaların güvenebileceği tek tip [metotlar](/developers/docs/apis/json-rpc/#json-rpc-methods) olur.

Eğer bir Ethereum düğümüne bağlanmak için JavaScript kullanmak istiyorsanız, düz JavaScript'i kullanmak mümkündür ancak ekosistem içinde bunu çok daha kolay hâle getiren birkaç kolaylık kütüphanesi bulunur. Bu kütüphanelerle geliştiriciler, Ethereum ile etkileşime giren JSON RPC taleplerini (arka planda) başlatmak için sezgisel ve tek satırlı yöntemler yazabilirler.

Lütfen "[Birleşim](/roadmap/merge/) olayından bu yana, bir düğümü çalıştırmak için iki bağlantılı Ethereum yazılımının parçası olan bir yürütüm istemcisi ve bir fikir birliği istemcisi gerektiğini unutmayın. Lütfen düğümünüzün hem bir yürütüm hem de fikir birliği istemcisini içerdiğinden emin olun. Eğer düğümünüz yerel makinanızda değilse (ör. düğümünüz bir AWS örneğinde çalışıyorsa) bu eğitimdeki IP adreslerini buna göre güncelleyin. Daha fazla bilgi için lütfen [bir düğüm çalıştırma](/developers/docs/nodes-and-clients/run-a-node/) sayfamıza bakın.

## Ön koşullar {#prerequisites}

JavaScript'i anlamanın yanı sıra, [Ethereum Yığınını](/developers/docs/ethereum-stack/) ve [Ethereum istemcilerini](/developers/docs/nodes-and-clients/) de anlamak faydalı olabilir.

## Neden bir kitaplık kullanılır? {#why-use-a-library}

Bu kütüphaneler, bir Ethereum düğümü ile doğrudan etkileşim kurmanın karmaşıklığının çoğunu ortadan kaldırır. Ayrıca, bir geliştirici olarak Ethereum istemcilerinin karmaşıklıkları ile daha az zaman harcayarak ve uygulamanızın benzersiz işlevselliğine daha fazla zaman ayırabilmeniz için yardımcı işlevler (örneğin, ETH'yi Gwei'ye dönüştürmek) sağlarlar.

## Kütüphane özellikleri {#library-features}

### Ethereum düğümlerine bağlanın {#connect-to-ethereum-nodes}

Bu kütüphaneler, sağlayıcıları kullanarak JSON-RPC, INFURA, Etherscan, Alchemy veya MetaMask üzerinden Ethereum'a bağlanmanıza ve Ethereum verilerini okumanıza olanak tanır.

**Ethers örneği**

```js
// Bir BrowserProvider, MetaMask'ın her sayfaya window.ethereum
// olarak enjekte ettiği standart bir Web3 sağlayıcısını sarar
// sabit sağlayıcı = yeni ethers.BrowserProvider(window.ethereum)

// MetaMask eklentisi ayrıca işlemlerin imzalanmasına, ether göndermeye ve
// blokzincirdeki durumu değiştirmek için ödeme yapmaya olanak tanır.
// Bunun için hesap imzalayana ihtiyacımız var...
sabit imzalayan = sağlayıcı.getSigner()
```

**Web3js örneği**

```js
var web3 = new Web3("http://localhost:8545")
// or
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// change provider
web3.setProvider("ws://localhost:8546")
// or
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// Using the IPC provider in node.js
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // mac os path
// or
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // mac os path
// on windows the path is: "\\\\.\\pipe\\geth.ipc"
// on linux the path is: "/users/myuser/.ethereum/geth.ipc"
```

Kurulduktan sonra blok zinciri aşağıdakiler için sorgulayabileceksiniz:

- blok numaraları
- gaz tahminleri
- akıllı sözleşme olayları
- ağ kimliği
- ve daha fazlası...

### Cüzdan işlevselliği {#wallet-functionality}

Bu kitaplıklar size cüzdan oluşturma, anahtarları yönetme ve işlemleri imzalama işlevleri sunar.

İşte Ether'lerden bir örnek

```js
// Bir anımsatıcıdan bir cüzdan örneği oluşturun...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...ya da özel anahtardan
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// Signer API'si uyarınca bir Promise olarak adres
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// Bir cüzdan adresi de senkronize olarak müsaittir
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// Dahili kriptografik bileşenler
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// Cüzdan mnemonic'i
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// Not: Özel anahtarla oluşturulan bir cüzdan
//       mnemonic'e sahip değildir (türetme bunu engeller)
walletPrivateKey.mnemonic
// null

// Mesaj imzalama
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// İşlem imzalama
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// Bağlanma metodu yeni bir örneği
// sağlayıcıya bağlı olan cüzdana gönderir
wallet = walletMnemonic.connect(provider)

// Ağı sorgulama
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// Ether gönderme
wallet.sendTransaction(tx)
```

[Belgelerin tamamını okuyun](https://docs.ethers.io/v5/api/signer/#Wallet)

Kurulduktan sonra şunları yapabileceksiniz:

- hesap oluşturabilirsiniz
- işlem gönderebilirsiniz
- işlemleri imzalayabilirsiniz
- ve daha fazlası...

### Akıllı sözleşme fonksiyonlarıyla etkileşim kurmak {#interact-with-smart-contract-functions}

Javascript istemci kütüphaneleri, derlenmiş bir sözleşmenin Uygulama İkili Arayüzünü (ABI) okuyarak uygulamanızın akıllı sözleşme fonksiyonlarını çağırmasına olanak tanır.

ABI, esasen sözleşmenin işlevlerini bir JSON formatında açıklar ve bunu normal bir JavaScript nesnesi gibi kullanmanıza izin verir.

Yani aşağıdaki Solidity sözleşmesi:

```solidity
contract Test {
    uint a;
    address d = 0x12345678901234567890123456789012;

    function Test(uint testInt)  { a = testInt;}

    event Event(uint indexed b, bytes32 c);

    event Event2(uint indexed b, bytes32 c);

    function foo(uint b, bytes32 c) returns(address) {
        Event(b, c);
        return d;
    }
}
```

Aşağıdaki JSON ile sonuçlanır:

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

Bu, şunları yapabileceğiniz anlamına gelir:

- Akıllı sözleşmeye bir işlem gönderin ve yöntemini uygulayın
- EVM'de yürütüldüğünde bir yöntem yürütmesinin harcayacağı gazı tahmin etme çağrısı
- Sözleşme dağıtmak
- Ve daha fazlası...

### Yardımcı fonksiyonlar {#utility-functions}

Yardımcı fonksiyonlar, Ethereum ile oluşturmayı biraz daha kolaylaştıran kullanışlı kısayollar sunar.

ETH değerleri varsayılan olarak Wei cinsindendir. 1 ETH = 1.000.000.000.000.000.000 WEI – bu, çok sayıda sayıyla uğraştığınız anlamına gelir! `web3.utils.toWei`, ether'ı sizin için Wei'ye dönüştürür.

Ve ethers cinsinden şöyle görünür:

```js
// Get the balance of an account (by address or ENS name)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// Often you will need to format the output for the user
// which prefer to see values in ether (instead of wei)
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Web3js yardımcı fonksiyonları](https://docs.web3js.org/api/web3-utils)
- [Ethers yardımcı fonksiyonları](https://docs.ethers.io/v5/api/utils/)

## Mevcut kütüphaneler {#available-libraries}

**Web3.js -** **_Ethereum JavaScript API._**

- [Belgeler](https://docs.web3js.org/)
- [GitHub](https://github.com/ethereum/web3.js/)

**Ethers.js -** **_JavaScript ve TypeScript'te eksiksiz Ethereum cüzdan uygulamaları ve araçları._**

- [Belgeler](https://docs.ethers.io/)
- [GitHub](https://github.com/ethers-io/ethers.js/)

**The Graph -** **_Ethereum ve IPFS verilerini endekslemek ve GraphQL kullanarak sorgulamak için bir protokol._**

- [The Graph](https://thegraph.com/)
- [Graph Gezgini](https://thegraph.com/explorer/)
- [Belgeler](https://thegraph.com/docs/)
- [GitHub](https://github.com/graphprotocol/)
- [Discord](https://thegraph.com/discord)

**light.js -** **_Hafif istemciler için yüksek seviyede duyarlı JS kütüphanesidir._**

- [GitHub](https://github.com/openethereum/js-libs/tree/master/packages/light.js)

**Web3-wrapper -** **_Web3.js için alternatif yazı tipi._**

- [Belgeler](https://0x.org/docs/web3-wrapper#introduction)
- [GitHub](https://github.com/0xProject/0x-monorepo/tree/development/packages/web3-wrapper)

**Alchemyweb3 -** **_Otomatik yeniden denemeler ve geliştirilmiş API'lar ile Web3.js odaklı paketleyici._**

- [Belgeler](https://docs.alchemy.com/reference/api-overview)
- [GitHub](https://github.com/alchemyplatform/alchemy-web3)

**Alchemy NFT API -** **_Sahiplik, meta veri özellikleri ve daha fazlası dahil olmak üzere NFT verilerini almak için API._**

- [Belgeler](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
- [GitHub](https://github.com/alchemyplatform/alchemy-web3)

**viem -** **_Ethereum için TypeScript Arayüzü_**

- [Dokümanlar](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

## Daha fazla bilgi {#further-reading}

_Size yardımcı olan bir topluluk kaynağı biliyor musunuz? Bu sayfayı düzenleyin ve ekleyin!_

## İlgili konular {#related-topics}

- [ Düğümler ve İstemciler](/developers/docs/nodes-and-clients/)
- [Geliştirici çerçeveleri](/developers/docs/frameworks/)

## İlgili öğreticiler {#related-tutorials}

- [JavaScript'te Ethereum blok zincirini kullanmak için Web3js'yi kurun](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Projenizde web3.js kurulumu için talimatlar._
- [JavaScript'ten akıllı sözleşme çağırma](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI belirtecini kullanarak, JavaScript kullanan sözleşme işlevini nasıl çağıracağınızı görün._
- [Web3 ve Alchemy kullanarak işlem gönderme](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– Arka uçtan işlem göndermek için adım adım izlenecek yol._
