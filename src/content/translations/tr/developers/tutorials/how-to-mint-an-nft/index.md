---
title: Bir NFT Nasıl Basılır (NFT Eğitim Serisi Bölüm 2/3)
description: Bu öğretici, akıllı sözleşmemizi ve Web3'ü kullanarak Ethereum blok zincirinde bir NFT'nin nasıl basılacağını açıklar.
author: "Sumi Mudgil"
tags:
  - "NFT'ler"
  - "ERC-721"
  - "Alchemy"
  - "Solidity"
  - "akıllı sözleşmeler"
skill: beginner
lang: tr
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): 69 Milyon ABD Doları[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): 11 Milyon ABD Doları [Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): 6 Milyon ABD Doları

Hepsi, Alchemy'nin güçlü API'sini kullanarak NFT'lerini bastı. Bu öğreticide, aynısını <10 dakikada nasıl yapacağınızı size öğreteceğiz.

“NFT basımı”, blok zincirinde ERC-721 token'ınızın benzersiz bir örneğini yayınlama eylemidir. Bu NFT eğitim serisinin [1. Bölümünde](/developers/tutorials/how-to-write-and-deploy-an-nft/) hazırladığımız akıllı sözleşmemizi kullanarak web3 becerilerimizi gösterelim ve bir NFT basalım. Bu eğitimin sonunda, keyfinizin (ve cüzdanınızın) istediği kadar NFT basabileceksiniz!

Başlayalım!

## Adım 1: Web3'ü kurun {#install-web3}

NFT akıllı sözleşmenizi oluşturmaya ilişkin ilk öğreticiyi izlediyseniz, zaten Ethers.js kullanma deneyiminiz vardır. Web3, Ethereum blok zincirine istek oluşturmayı kolaylaştırmak için kullanılan bir kütüphane olduğu için Ethers'a benzer. Bu eğitimde, otomatik yeniden denemeler ve güçlü WebSocket desteği sunan gelişmiş bir web3 kütüphanesi olan [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3)'ü kullanacağız.

Projenizin ana dizininde şunu çalıştırın:

```
npm install @alch/alchemy-web3
```

## Adım 2: Bir mint-nft.js dosyası oluşturun {#create-mintnftjs}

Komut dosyaları dizininizin içinde bir mint-nft.js dosyası oluşturun ve aşağıdaki kod satırlarını ekleyin:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Adım 3: Sözleşme ABI'nizi alın {#contract-abi}

Sözleşme ABI'miz (Uygulama İkili Arayüzü), akıllı sözleşmemizle etkileşim kurmak için kullanılan arayüzdür. Sözleşme ABI'lerı hakkında daha fazlasını [buradan](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is) öğrenebilirsiniz. Hardhat, bizim için otomatik olarak bir ABI oluşturur ve bunu MyNFT.json dosyasına kaydeder. Bunu kullanmak için mint-nft.js dosyamıza aşağıdaki kod satırlarını ekleyerek içeriği ayrıştırmamız gerekecek:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

ABI'yi görmek istiyorsanız onu konsolunuza yazdırabilirsiniz:

```js
console.log(JSON.stringify(contract.abi))
```

Mint-nft.js'yi çalıştırmak ve ABI'nizin konsola yazdırıldığını görmek için terminalinize gidin ve şunu yürütün

```js
node scripts/mint-nft.js
```

## Adım 4: IPFS kullanarak NFT'niz için meta verileri yapılandırın {#config-meta}

Bölüm 1'deki öğreticimizden hatırlarsanız, mintNFT akıllı sözleşme fonksiyonumuz, NFT'nin meta verilerini açıklayan bir JSON belgesine çözümlemesi gereken bir tokenURI parametresini alır; bu, NFT'yi gerçekten hayata geçiren ve yapılandırılabilir özelliklere sahip olmasını sağlayan şeylerdir: ad, açıklama, resim ve diğer nitelikler gibi.

> _Gezegenler Arası Dosya Sistemi (IPFS), dağıtılmış bir dosya sisteminde veri depolamak ve paylaşmak için merkeziyetsiz bir protokol ve eşler arası ağdır._

Uygun bir IPFS API'si ve araç takımı olan Pinata'yı, NFT'mizin gerçekten merkeziyetsiz olmasını sağlamak için, NFT varlığımızı ve meta verilerimizi depolamak için kullanacağız. Pinata hesabınız yoksa [buradan](https://app.pinata.cloud) ücretsiz bir hesap açın ve e-postanızı doğrulamak için adımları tamamlayın.

Bir hesap oluşturduğunuzda:

- "Files" (Dosyalar) sayfasına gidin ve sayfanın sol üst köşesindeki mavi "Upload" (Yükle) düğmesine tıklayın.

- Pinata'ya bir resim yükleyin: Bu, NFT'niz için resim varlığı olacaktır. Varlığa istediğiniz adı verin

- Yükledikten sonra, Dosyalar sayfasındaki tabloda dosya bilgilerini göreceksiniz. Ayrıca bir CID sütunu göreceksiniz. Yanındaki kopyala düğmesine tıklayarak CID'yi kopyalayabilirsiniz. Yüklemenizi `https://gateway.pinata.cloud/ipfs/<CID>` adresinde görebilirsiniz. Örnek olarak IPFS üzerinde kullandığımız resmi [burada](https://gateway.pinata.cloud/ipfs/QmarPqdEuzh5RsWpyH2hZ3qSXBCzC5RyK3ZHnFkAsk7u2f) bulabilirsiniz.

Görsel olarak daha iyi öğrenenler için yukarıdaki adımlar burada özetlenmiştir:

![Sürücünüzü Pinata'ya nasıl yüklersiniz](https://gateway.pinata.cloud/ipfs/Qmcdt5VezYzAJDBc4qN5JbANy5paFg9iKDjq8YksRvZhtL)

Şimdi Pinata'ya bir belge daha yüklememiz gerekecek. Ama bunu yapmadan önce, onu yaratmamız gerekiyor!

Kök dizininizde nft-metadata.json adında yeni bir dosya oluşturun ve aşağıdaki json kodunu ekleyin:

```json
{
  "attributes": [
    {
      "trait_type": "Breed",
      "value": "Maltipoo"
    },
    {
      "trait_type": "Eye color",
      "value": "Mocha"
    }
  ],
  "description": "The world's most adorable and sensitive pup.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

json'daki veriyi değiştirmekten çekinmeyin. Nitelikler bölümündekileri kaldırabilir veya buraya ekleme yapabilirsiniz. En önemlisi, görüntü alanının IPFS görüntünüzün konumunu gösterdiğinden emin olun: Aksi takdirde NFT'niz (çok sevimli!) bir köpeğin fotoğrafını içerecektir.

Json dosyasını düzenlemeyi bitirdikten sonra, görüntüyü yüklemek için yaptığımız adımları izleyerek kaydedin ve Pinata'ya yükleyin.

![nft-metadata.json dosyanızı Pinata'ya nasıl yüklersiniz](./uploadPinata.gif)

## Adım 5: Sözleşmenizin bir örneğini oluşturun {#instance-contract}

Şimdi, sözleşmemizle etkileşime geçmek için, kodumuzda onun bir örneğini oluşturmalıyız. Bunu yapmak için dağıtımdan veya [Etherscan](https://ropsten.etherscan.io/)dan sözleşmeyi dağıtmak için kullandığınız adresi arayarak alabileceğimiz sözleşme adresimize ihtiyacımız olacak.

![Etherscan'da sözleşme adresinizi görüntüleyin](./viewContractEtherscan.png)

Yukarıdaki örnekte, sözleşme adresimiz 0x81c587EB0fE773404c42c1d2666b5f557C470eED'dir.

Sonrasında ise ABI ve adresi kullanarak sözleşmemizi oluşturmak için web3 [sözleşme metodunu](https://docs.web3js.org/api/web3-eth-contract/class/Contract) kullanacağız. mint-nft.js dosyanızda, şunu ekleyin:

```js
const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Adım 6: .env dosyasını güncelleyin {#update-env}

Şimdi, Ethereum zincirine işlemler oluşturmak ve göndermek amacıyla, hesap nonce değeri almak için genel Ethereum hesap adresinizi kullanacağız (aşağıda açıklanacaktır).

Genel anahtarınızı .env dosyanıza ekleyin: Öğreticinin 1. bölümünü tamamladıysanız, .env dosyamız şimdi şöyle görünmelidir:

```js
API_URL = "https://eth-ropsten.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Adım 7: İşleminizi oluşturun {#create-txn}

İlk olarak, `mintNFT(tokenData)` isimli bir fonksiyon tanımlayalım ve sıradakileri yaparak işlemimizi oluşturalım:

1. _PRIVATE_KEY_ ve _PUBLIC_KEY_ anahtarlarınızı `.env` dosyasından alın.

1. Sonrasında, hesap nonce değerini bulmamız gerekecek. Nonce değeri detayı, adresinizden gönderilen işlem sayısını takip etmek için kullanılır: Buna, güvenlik amaçlarından dolayı ve [tekrar saldırılarını](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce) engellemek için ihtiyacımız vardır. Adresinizden gönderilmiş işlem sayısını almak için, [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount) kullanırız.

1. Son olarak, işlemimizi aşağıdaki bilgilerle ayarlayacağız:

- `'from': PUBLIC_KEY` — İşleminizin kaynağı, açık adresimizdir

- `'to': ContractAddress` — Etkileşimde bulunmak ve işlemi göndermek istediğimiz sözleşme

- `'nonce': nonce` — Adresimizden gönderilen işlem sayısını içeren hesap nonce değeri

- `'gas': trialGas` — İşlemi tamamlamak için gereken tahmini gaz

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — Bu işlemde gerçekleştirmek istediğimiz hesaplama: Bu durumda bir NFT basımıdır

Mint-nft.js dosyanız şimdi şöyle görünmelidir:

```js
   require('dotenv').config();
   const API_URL = process.env.API_URL;
   const PUBLIC_KEY = process.env.PUBLIC_KEY;
   const PRIVATE_KEY = process.env.PRIVATE_KEY;

   const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
   const web3 = createAlchemyWeb3(API_URL);

   const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
   const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED";
   const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

   async function mintNFT(tokenURI) {
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

   //the transaction
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```

## Adım 8: İşlemi imzalayın {#sign-txn}

Artık işlemimizi oluşturduğumuza göre, göndermek için imzalamamız gerekiyor. Özel anahtarımızı burada kullanacağız.

`web3.eth.sendSignedTransaction` bize, işlemimizin kazıldığından ve ağdan düşmediğinden emin olmak için kullanabileceğimiz işlem hash değeri verecektir. İşlem imzalama bölümünde, işlemimizin başarılı olup olmadığını anlamamız için bazı hata kontrolleri eklediğimizi göreceksiniz.

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}
```

## Adım 9: mintNFT'yi çağırın ve mint-nft.js düğümünü çalıştırın {#call-mintnft-fn}

Pinata'ya yüklediğiniz metadata.json'ı hatırlıyor musunuz? Pinata'dan hash kodunu alın ve mintNFT `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` fonksiyonuna parametre olarak aşağıdakini iletin

Hash kodunu şu şekilde alırsınız:

![Pinata'da nft meta veri hash kodunuzu nasıl alırsınız](./metadataPinata.gif)_Pinata'da nft meta veri hash kodunuzu nasıl alırsınız_

> Kopyaladığınız hash kodunun **metadata.json**'unuza yönlendirdiğini `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` sayfasını ayrı bir pencereye iki kez kontrol edin. Sayfa aşağıdaki ekran görüntüsüne benzer görünmelidir:

![Sayfanız json meta verilerini göstermelidir](./metadataJSON.png)_Sayfanız json meta verilerini göstermelidir_

Sonuç olarak kodunuz şöyle görünmelidir:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x81c587EB0fE773404c42c1d2666b5f557C470eED"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise failed:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Şimdi, NFT'nizi dağıtmak için `node scripts/mint-nft.js` komutunu çalıştırın. Birkaç saniye sonra terminalinizde şöyle bir yanıt görmelisiniz:

    The hash of your transaction is: 0x10e5062309de0cd0be7edc92e8dbab191aa2791111c44274483fa766039e0e00

    Check Alchemy's Mempool to view the status of your transaction!

Sonrasında, işleminizin durumunu (beklemede, kazılmış veya ağdan düşürülmüş) görmek için [Alchemy bellek havuzunuzu](https://dashboard.alchemyapi.io/mempool) ziyaret edin. İşleminiz düştüyse, [Ropsten Etherscan](https://ropsten.etherscan.io/)'i kontrol etmek ve işlem hash değerinizi aramak da faydalı olur.

![Etherscan'da NFT işlem hash değerinizi görüntüleyin](./viewNFTEtherscan.png)_Etherscan'da NFT işlem hash değerinizi görüntüleyin_

İşte bu kadar! Ethereum blok zincirinde bir NFT ile dağıtım VE basım yaptınız <Emoji text=":money_mouth_face:" size={1} />

Keyfinizin (ve cüzdanınızın) istediği kadar NFT'yi mint-nft.js'yi kullanarak basabilirsiniz! NFT'nin meta verilerini açıklayan yeni bir tokenURI'yi ilettiğinizden emin olun (aksi takdirde, sonuç olarak farklı kimliklere sahip bir sürü özdeş NFT oluşturursunuz).

Büyük ihtimalle cüzdanınızda NFT'nizi gösterebilmek istersiniz: Bu nedenle [3. Bölüm: NFT'nizi Cüzdanınızda Nasıl Görüntüleyebilirsiniz](/developers/tutorials/how-to-view-nft-in-metamask/) kısmına göz atmayı unutmayın!
