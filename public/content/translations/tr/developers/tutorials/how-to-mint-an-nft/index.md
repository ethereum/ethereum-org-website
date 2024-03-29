---
title: Bir NFT Nasıl Basılır (NFT Eğitim Serisi Bölüm 2/3)
description: Bu öğretici, akıllı sözleşmemizi ve Web3'ü kullanarak Ethereum blok zincirinde bir NFT'nin nasıl basılacağını açıklar.
author: "Sumi Mudgil"
tags:
  - "ERC-721"
  - "alchemy"
  - "katılık"
  - "akıllı sözleşmeler"
skill: advanced
lang: tr
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): 69 Milyon ABD Doları[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): 11 Milyon ABD Doları [Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): 6 Milyon ABD Doları

Hepsi, Alchemy'nin güçlü API'sini kullanarak NFT'lerini bastı. Bu öğreticide, aynısını <10 dakikada nasıl yapacağınızı size öğreteceğiz.

“NFT basımı”, blok zincirinde ERC-721 token'ınızın benzersiz bir örneğini yayınlama eylemidir. [NFT eğitim serisinin 1. Bölümündeki](/developers/tutorials/how-to-write-and-deploy-an-nft/) akıllı sözleşmemizi kullanarak Web3 becerilerimizi geliştirelim ve bir NFT basalım. Bu eğitimin sonunda, keyfinizin (ve cüzdanınızın) istediği kadar NFT basabileceksiniz!

Başlayalım!

## Adım 1: Web3'ü yükleme {#install-web3}

NFT akıllı sözleşmenizi oluşturmaya ilişkin ilk öğreticiyi izlediyseniz, zaten Ethers.js kullanma deneyiminiz vardır. Web3, Ethereum blok zincirine istek oluşturmayı kolaylaştırmak için kullanılan bir kütüphane olduğu için Ethers'a benzer. Bu öğreticide, otomatik yeniden denemeler ve güçlü WebSocket desteği sunan gelişmiş bir Web3 kütüphanesi olan [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3)'ü kullanacağız.

Projenizin ana dizininde şunu çalıştırın:

```
npm install @alch/alchemy-web3
```

## Adım 2: Bir `mint-nft.js` dosyası oluşturma {#create-mintnftjs}

Komut dosyaları dizininizin içinde bir `mint-nft.js` dosyası oluşturun ve aşağıdaki kod satırlarını ekleyin:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Adım 3: Sözleşme ABI'nizi alın {#contract-abi}

Sözleşme ABI'miz (Uygulama İkili Arayüzü), akıllı sözleşmemizle etkileşim kurmak için kullanılan arayüzdür. Sözleşme ABI'lerı hakkında daha fazlasını [buradan](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is) öğrenebilirsiniz. Hardhat bizim için otomatik olarak bir ABI oluşturur ve bunu `MyNFT.json` dosyasına kaydeder. Bunu kullanmak için `mint-nft.js` dosyamıza aşağıdaki kod satırlarını ekleyerek içeriği ayrıştırmamız gerekir:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

ABI'yi görmek istiyorsanız onu konsolunuza yazdırabilirsiniz:

```js
console.log(JSON.stringify(contract.abi))
```

`mint-nft.js` dosyasını çalıştırmak ve ABI'nizin konsola yazdırıldığını görmek için terminalinize gidin ve şunu çalıştırın:

```js
node scripts/mint-nft.js
```

## Adım 4: IPFS kullanarak NFT'niz için meta verileri yapılandırın {#config-meta}

Bölüm 1'deki eğitimimizden hatırlarsanız, `mintNFT` akıllı sözleşme işlevimiz, NFT'nin meta verilerini tanımlayan bir JSON belgesine çözümlenmesi gereken bir tokenURI parametresi alır - bu gerçekten NFT'yi hayata geçiren şeydir ve bir ad, açıklama, resim ve diğer nitelikler gibi yapılandırılabilir özelliklere sahip olmasını sağlar.

> _Gezegenler Arası Dosya Sistemi (IPFS), dağıtılmış bir dosya sisteminde veri depolamak ve paylaşmak için merkeziyetsiz bir protokol ve eşler arası ağdır._

Uygun bir IPFS API'si ve araç takımı olan Pinata'yı, NFT'mizin gerçekten merkeziyetsiz olmasını sağlamak için, NFT varlığımızı ve meta verilerimizi depolamak için kullanacağız. Pinata hesabınız yoksa [buradan](https://app.pinata.cloud) ücretsiz bir hesap açın ve e-postanızı doğrulamak için adımları tamamlayın.

Bir hesap oluşturduğunuzda:

- "Files" (Dosyalar) sayfasına gidin ve sayfanın sol üst köşesindeki mavi "Upload" (Yükle) düğmesine tıklayın.

- Pinata'ya bir görüntü yükleyin; bu görüntü, NFT'nizin görüntü varlığı olacaktır. Varlığa istediğiniz adı verin

- Yükledikten sonra, dosya bilgilerini "Dosyalar" sayfasındaki tabloda göreceksiniz. Ayrıca bir CID sütunu göreceksiniz. Yanındaki kopyala düğmesine tıklayarak CID'yi kopyalayabilirsiniz. Yüklemenizi `https://gateway.pinata.cloud/ipfs/<CID>` adresinde görebilirsiniz. Örnek olarak IPFS üzerinde kullandığımız resmi [burada](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5) bulabilirsiniz.

Görsel olarak daha iyi öğrenenler için yukarıdaki adımlar burada özetlenmiştir:

![Sürücünüzü Pinata'ya nasıl yüklersiniz](./instructionsPinata.gif)

Şimdi Pinata'ya bir belge daha yüklememiz gerekecek. Ama bunu yapmadan önce, onu yaratmamız gerekiyor!

Kök dizininizde `nft-metadata.json` adında yeni bir dosya oluşturun ve aşağıdaki json kodunu ekleyin:

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

JSON dosyasını düzenlemeyi tamamladıktan sonra kaydedin ve resmi yüklemek için kullandığımız adımları izleyerek Pinata'ya yükleyin.

![nft-metadata.json dosyanızı Pinata'ya nasıl yüklersiniz](./uploadPinata.gif)

## Adım 5: Sözleşmenizin bir örneğini oluşturun {#instance-contract}

Şimdi, sözleşmemizle etkileşime geçmek için, kodumuzda onun bir örneğini oluşturmalıyız. Bunu yapmak için dağıtımdan veya [Etherscan](https://sepolia.etherscan.io/)'den sözleşmeyi dağıtmak amacıyla kullandığınız adresi arayarak alabileceğimiz sözleşme adresimize ihtiyacımız olacak.

![Etherscan'da sözleşme adresinizi görüntüleyin](./view-contract-etherscan.png)

Yukarıdaki örnekte, sözleşme adresimiz 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778'dir.

Daha sonra, ABI ve adresi kullanarak sözleşmemizi oluşturmak için Web3 [sözleşme yöntemini](https://docs.web3js.org/api/web3-eth-contract/class/Contract) kullanacağız. `mint-nft.js` dosyanıza aşağıdakini ekleyin:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Adım 6: `.env` dosyasını güncelleme {#update-env}

Şimdi, Ethereum zincirine işlemler oluşturmak ve göndermek amacıyla, hesap nonce değeri almak için genel Ethereum hesap adresinizi kullanacağız (aşağıda açıklanacaktır).

Açık anahtarınızı `.env` dosyanıza ekleyin; öğreticinin 1. bölümünü tamamladıysanız, `.env` dosyamız artık aşağıdaki gibi görünmelidir:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Adım 7: İşleminizi oluşturma {#create-txn}

İlk olarak, `mintNFT(tokenData)` isimli bir fonksiyon tanımlayalım ve sıradakileri yaparak işlemimizi oluşturalım:

1. _PRIVATE_KEY_ ve _PUBLIC_KEY_ anahtarlarınızı `.env` dosyasından alın.

1. Sonrasında, hesap nonce değerini bulmamız gerekecek. Nonce değeri detayı, adresinizden gönderilen işlem sayısını takip etmek için kullanılır: Buna, güvenlik amaçlarından dolayı ve [tekrar saldırılarını](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce) engellemek için ihtiyacımız vardır. Adresinizden gönderilmiş işlem sayısını almak için, [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount) kullanırız.

1. Son olarak, işlemimizi aşağıdaki bilgilerle ayarlayacağız:

- `'from': PUBLIC_KEY` — İşleminizin kaynağı, açık adresimizdir

- `'to': ContractAddress` — Etkileşimde bulunmak ve işlemi göndermek istediğimiz sözleşme

- `'nonce': nonce` — Adresimizden gönderilen işlem sayısını içeren hesap nonce değeri

- `'gas': trialGas` — İşlemi tamamlamak için gereken tahmini gaz

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — Bu işlemde gerçekleştirmek istediğimiz hesaplama: Bu durumda bir NFT basımıdır

`mint-nft.js` dosyanız artık bu şekilde görünmelidir:

```js
   require('dotenv').config();
   const API_URL = process.env.API_URL;
   const PUBLIC_KEY = process.env.PUBLIC_KEY;
   const PRIVATE_KEY = process.env.PRIVATE_KEY;

   const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
   const web3 = createAlchemyWeb3(API_URL);

   const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
   const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778";
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

## Adım 8: İşlemi imzalama {#sign-txn}

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
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
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

## Adım 9: `mintNFT`'yi çağırma ve `mint-nft.js` düğümünü çalıştırma {#call-mintnft-fn}

Pinata'ya yüklediğiniz `metadata.json`'ı hatırlıyor musunuz? Pinata'dan karma kodunu alın ve aşağıdakileri `mintNFT` `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` işlevine parametre olarak aktarın

Karma kodunu şu şekilde alırsınız:

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
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
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

    The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8

    Check Alchemy's Mempool to view the status of your transaction!

Sonrasında, işleminizin durumunu (beklemede, kazılmış veya ağdan düşürülmüş) görmek için [Alchemy bellek havuzunuzu](https://dashboard.alchemyapi.io/mempool) ziyaret edin. İşleminiz düştüyse, [Sepolia Etherscan](https://sepolia.etherscan.io/)'i kontrol etmek ve işlem karmanızı aramak da faydalı olur.

![Etherscan'da NFT işlem hash değerinizi görüntüleyin](./view-nft-etherscan.png)_Etherscan'da NFT işlem hash değerinizi görüntüleyin_

İşte bu kadar! Ethereum blok zincirinde bir NFT ile dağıtım VE basım yaptınız <Emoji text=":money_mouth_face:" size={1} />

`mint-nft.js` kullanarak canınızın (ve cüzdanınızın) istediği kadar NFT basabilirsiniz! NFT'nin meta verilerini açıklayan yeni bir tokenURI'yi ilettiğinizden emin olun (aksi takdirde, sonuç olarak farklı kimliklere sahip bir sürü özdeş NFT oluşturursunuz).

Büyük ihtimalle cüzdanınızda NFT'nizi gösterebilmek istersiniz: Bu nedenle [3. Bölüm: NFT'nizi Cüzdanınızda Nasıl Görüntüleyebilirsiniz](/developers/tutorials/how-to-view-nft-in-metamask/) kısmına göz atmayı unutmayın!
