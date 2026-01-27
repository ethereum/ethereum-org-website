---
title: Bir NFT Nasıl Basılır (NFT Eğitim Serisi Bölüm 2/3)
description: Bu öğretici, akıllı sözleşmemizi ve Web3'ü kullanarak Ethereum blokzincirinde bir NFT'nin nasıl basılacağını açıklar.
author: "Sumi Mudgil"
tags: [ "ERC-721", "alchemy", "katılık", "akıllı kontratlar" ]
skill: beginner
lang: tr
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): 69 Milyon Dolar
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): 11 Milyon Dolar
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): 6 Milyon Dolar

Hepsi, Alchemy'nin güçlü API'sini kullanarak NFT'lerini bastı. Bu öğreticide, aynısını \<10 dakika içinde nasıl yapacağınızı öğreteceğiz.

“Bir NFT basmak”, ERC-721 jetonunuzun benzersiz bir örneğini blokzincirde yayınlama eylemidir. [Bu NFT öğretici serisinin 1. Bölümündeki](/developers/tutorials/how-to-write-and-deploy-an-nft/) akıllı sözleşmemizi kullanarak Web3 becerilerimizi sergileyelim ve bir NFT basalım. Bu öğreticinin sonunda, gönlünüzün (ve cüzdanınızın) çektiği kadar NFT basabileceksiniz!

Hadi başlayalım!

## Adım 1: Web3'ü yükleyin {#install-web3}

NFT akıllı sözleşmenizi oluşturmayla ilgili ilk öğreticiyi takip ettiyseniz Ethers.js kullanma konusunda zaten deneyiminiz vardır. Web3, Ethereum blokzincirine istek oluşturmayı kolaylaştırmak için kullanılan bir kütüphane olduğu için Ethers'a benzer. Bu öğreticide, otomatik yeniden denemeler ve sağlam WebSocket desteği sunan gelişmiş bir Web3 kütüphanesi olan [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3)'ü kullanacağız.

Projenizin ana dizininde şunu çalıştırın:

```
npm install @alch/alchemy-web3
```

## Adım 2: Bir `mint-nft.js` dosyası oluşturun {#create-mintnftjs}

Komut dosyaları dizininizin içinde bir `mint-nft.js` dosyası oluşturun ve aşağıdaki kod satırlarını ekleyin:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Adım 3: Sözleşme ABI'nizi alın {#contract-abi}

Sözleşme ABI'miz (Uygulama İkili Arayüzü), akıllı sözleşmemizle etkileşim kurma arayüzüdür. Sözleşme ABI'leri hakkında daha fazla bilgiyi [buradan](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is) edinebilirsiniz. Hardhat bizim için otomatik olarak bir ABI oluşturur ve bunu `MyNFT.json` dosyasına kaydeder. Bunu kullanabilmek için `mint-nft.js` dosyamıza aşağıdaki kod satırlarını ekleyerek içeriği ayrıştırmamız gerekecek:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

ABI'yi görmek isterseniz konsolunuza yazdırabilirsiniz:

```js
console.log(JSON.stringify(contract.abi))
```

`mint-nft.js` dosyasını çalıştırmak ve ABI'nizin konsola yazdırıldığını görmek için terminalinize gidin ve şunu çalıştırın:

```js
node scripts/mint-nft.js
```

## Adım 4: IPFS kullanarak NFT'nizin meta verilerini yapılandırın {#config-meta}

1. Bölüm'deki öğreticimizden hatırlayacağınız üzere, `mintNFT` akıllı sözleşme fonksiyonumuz, NFT'nin meta verilerini açıklayan bir JSON belgesine çözümlenmesi gereken bir tokenURI parametresi alır. Bu meta veriler, NFT'yi gerçekten hayata geçiren, ad, açıklama, resim ve diğer nitelikler gibi yapılandırılabilir özelliklere sahip olmasını sağlayan şeydir.

> _Gezegenler Arası Dosya Sistemi (IPFS), dağıtılmış bir dosya sisteminde veri depolamak ve paylaşmak için merkeziyetsiz bir protokol ve eşler arası ağdır._

NFT varlığımızı ve meta verilerimizi depolamak ve NFT'mizin gerçekten merkeziyetsiz olmasını sağlamak için kullanışlı bir IPFS API ve araç takımı olan Pinata'yı kullanacağız. Pinata hesabınız yoksa [buradan](https://app.pinata.cloud) ücretsiz bir hesap için kaydolun ve e-postanızı doğrulamak için adımları tamamlayın.

Bir hesap oluşturduktan sonra:

- "Dosyalar" sayfasına gidin ve sayfanın sol üst köşesindeki mavi "Yükle" düğmesine tıklayın.

- Pinata'ya bir resim yükleyin — bu, NFT'nizin resim varlığı olacaktır. Varlığa dilediğiniz adı verebilirsiniz

- Yükleme yaptıktan sonra, "Dosyalar" sayfasındaki tabloda dosya bilgilerini göreceksiniz. Ayrıca bir CID sütunu da göreceksiniz. Yanındaki kopyalama düğmesine tıklayarak CID'yi kopyalayabilirsiniz. Yüklemenizi şu adresten görüntüleyebilirsiniz: `https://gateway.pinata.cloud/ipfs/<CID>`. Örneğin, IPFS'de kullandığımız görseli [burada](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5) bulabilirsiniz.

Görsel öğrenenler için yukarıdaki adımlar burada özetlenmiştir:

![Resminizi Pinata'ya nasıl yüklersiniz](./instructionsPinata.gif)

Şimdi Pinata'ya bir belge daha yükleyeceğiz. Ama bunu yapmadan önce onu oluşturmamız gerekiyor!

Kök dizininizde `nft-metadata.json` adında yeni bir dosya oluşturun ve aşağıdaki json kodunu ekleyin:

```json
{
  "attributes": [
    {
      "trait_type": "Cins",
      "value": "Maltipoo"
    },
    {
      "trait_type": "Göz Rengi",
      "value": "Mocha"
    }
  ],
  "description": "Dünyanın en sevimli ve hassas köpeği.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

json'daki verileri değiştirmekten çekinmeyin. Nitelikler bölümüne ekleme veya çıkarma yapabilirsiniz. En önemlisi, resim alanının IPFS resminizin konumunu gösterdiğinden emin olun — aksi takdirde NFT'niz (çok sevimli!) bir fotoğraf içerecektir köpek.

JSON dosyasını düzenlemeyi bitirdikten sonra, kaydedin ve resmi yüklemek için yaptığımız adımların aynısını izleyerek Pinata'ya yükleyin.

![nft-metadata.json dosyanızı Pinata'ya nasıl yüklersiniz](./uploadPinata.gif)

## Adım 5: Sözleşmenizin bir örneğini oluşturun {#instance-contract}

Şimdi, sözleşmemizle etkileşim kurmak için kodumuzda onun bir örneğini oluşturmamız gerekiyor. Bunu yapmak için, sözleşmeyi dağıtmak için kullandığınız adresi arayarak dağıtımdan veya [Blockscout](https://eth-sepolia.blockscout.com/) üzerinden alabileceğimiz sözleşme adresimize ihtiyacımız olacak.

![Sözleşme adresinizi Etherscan'de görüntüleyin](./view-contract-etherscan.png)

Yukarıdaki örnekte sözleşme adresimiz 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778'dir.

Ardından, ABI ve adresi kullanarak sözleşmemizi oluşturmak için Web3 [sözleşme yöntemini](https://docs.web3js.org/api/web3-eth-contract/class/Contract) kullanacağız. `mint-nft.js` dosyanıza aşağıdakileri ekleyin:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Adım 6: `.env` dosyasını güncelleyin {#update-env}

Şimdi, Ethereum zincirine işlem oluşturmak ve göndermek için, hesap nonce'unu (aşağıda açıklanacaktır) almak üzere halka açık Ethereum hesap adresinizi kullanacağız.

Açık anahtarınızı `.env` dosyanıza ekleyin — öğreticinin 1. bölümünü tamamladıysanız, `.env` dosyanız şimdi şöyle görünmelidir:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Adım 7: İşleminizi oluşturun {#create-txn}

Öncelikle, `mintNFT(tokenData)` adında bir fonksiyon tanımlayalım ve aşağıdakileri yaparak işlemimizi oluşturalım:

1. `.env` dosyasından _PRIVATE_KEY_ ve _PUBLIC_KEY_ değerlerinizi alın.

2. Sırada, hesap nonce'unu bulmamız gerekiyor. Nonce belirtimi, adresinizden gönderilen işlem sayısını takip etmek için kullanılır. Buna güvenlik amacıyla ve [tekrar saldırılarını](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce) önlemek için ihtiyacımız vardır. Adresinizden gönderilen işlem sayısını almak için [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount) kullanırız.

3. Son olarak işlemimizi aşağıdaki bilgilerle ayarlayacağız:

- `'from': PUBLIC_KEY` — İşlemimizin kaynağı, halka açık adresimizdir

- `'to': contractAddress` — Etkileşimde bulunmak ve işlemi göndermek istediğimiz sözleşme

- `'nonce': nonce` — Adresimizden gönderilen işlem sayısını içeren hesap nonce'u

- `'gas': estimatedGas` — İşlemi tamamlamak için gereken tahmini gaz

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — Bu işlemde gerçekleştirmek istediğimiz hesaplama, ki bu durumda bir NFT basmaktır

`mint-nft.js` dosyanız şimdi şöyle görünmelidir:

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
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //en son nonce'u al

   //işlem
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

İşlemimizi oluşturduğumuza göre, göndermek için imzalamamız gerekiyor. İşte burada özel anahtarımızı kullanacağız.

`web3.eth.sendSignedTransaction`, bize işlem hash değerini verir. Bunu, işlemimizin mine edildiğinden ve ağ tarafından düşürülmediğinden emin olmak için kullanabiliriz. İşlem imzalama bölümünde, işlemimizin başarılı olup olmadığını bilmemiz için bazı hata denetimleri eklediğimizi fark edeceksiniz.

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //en son nonce'u al

  //işlem
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
              "İşleminizin hash değeri: ",
              hash,
              "\nİşleminizin durumunu görüntülemek için Alchemy'nin Mempool'unu kontrol edin!"
            )
          } else {
            console.log(
              "İşleminizi gönderirken bir şeyler ters gitti:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise başarısız oldu:", err)
    })
}
```

## Adım 9: `mintNFT`'yi çağırın ve `node mint-nft.js`'yi çalıştırın {#call-mintnft-fn}

Pinata'ya yüklediğiniz `metadata.json`'ı hatırlıyor musunuz? Pinata'dan hash kodunu alın ve `mintNFT` fonksiyonuna parametre olarak şunu geçin: `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

Hash kodu şu şekilde alınır:

![Pinata'da NFT meta veri hash kodunuzu nasıl alırsınız](./metadataPinata.gif)_Pinata'da NFT meta veri hash kodunuzu nasıl alırsınız_

> `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` adresini ayrı bir pencerede yükleyerek kopyaladığınız hash kodunun **metadata.json** dosyanıza bağlandığını iki kez kontrol edin. Sayfa aşağıdaki ekran görüntüsüne benzer görünmelidir:

![Sayfanız json meta verilerini görüntülemelidir](./metadataJSON.png)_Sayfanız json meta verilerini görüntülemelidir_

Sonuç olarak, kodunuz şuna benzer görünmelidir:

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //en son nonce'u al

  //işlem
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
              "İşleminizin hash değeri: ",
              hash,
              "\nİşleminizin durumunu görüntülemek için Alchemy'nin Mempool'unu kontrol edin!"
            )
          } else {
            console.log(
              "İşleminizi gönderirken bir şeyler ters gitti:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise başarısız oldu:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Şimdi, NFT'nizi dağıtmak için `node scripts/mint-nft.js` komutunu çalıştırın. Birkaç saniye sonra, terminalinizde şuna benzer bir yanıt görmelisiniz:

    ```
    İşleminizin hash değeri: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
    
    İşleminizin durumunu görüntülemek için Alchemy'nin Mempool'unu kontrol edin!
    ```

Ardından, işleminizin durumunu (beklemede, mine edilmiş veya ağdan düşürülmüş) görmek için [Alchemy mempool'unuzu](https://dashboard.alchemyapi.io/mempool) ziyaret edin. İşleminiz düşürüldüyse, [Blockscout](https://eth-sepolia.blockscout.com/)'u kontrol etmek ve işlem hash değerinizi aramak da yararlıdır.

![NFT işlem hash değerinizi Etherscan'de görüntüleyin](./view-nft-etherscan.png)_NFT işlem hash değerinizi Etherscan'de görüntüleyin_

İşte bu kadar! Artık Ethereum blokzincirinde bir NFT'yi dağıttınız VE bastınız <Emoji text=":money_mouth_face:" size={1} />

`mint-nft.js` kullanarak gönlünüzün (ve cüzdanınızın) çektiği kadar NFT basabilirsiniz! NFT'nin meta verilerini açıklayan yeni bir tokenURI girdiğinizden emin olun (aksi takdirde, farklı kimliklere sahip bir sürü aynı NFT'yi oluşturmuş olursunuz).

Muhtemelen NFT'nizi cüzdanınızda sergileyebilmek istersiniz — bu yüzden [Bölüm 3: NFT'nizi Cüzdanınızda Nasıl Görüntülersiniz](/developers/tutorials/how-to-view-nft-in-metamask/) bölümüne göz atmayı unutmayın!
