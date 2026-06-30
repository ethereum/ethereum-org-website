---
title: "Bir NFT Nasıl Basılır (NFT Eğitim Serisi Bölüm 2/3)"
description: "Bu eğitim, akıllı sözleşmemizi ve Web3'ü kullanarak Ethereum blokzincirinde nasıl bir NFT basılacağını açıklamaktadır."
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "akıllı sözleşmeler"]
skill: beginner
breadcrumb: NFT Basmak
lang: tr
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): 69 Milyon Dolar
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): 11 Milyon Dolar
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): 6 Milyon Dolar

Hepsi NFT'lerini Alchemy'nin güçlü API'sini kullanarak bastı. Bu eğitimde, size aynı şeyi 10 dakikadan kısa bir sürede nasıl yapacağınızı öğreteceğiz.

“Bir NFT basmak”, ERC-721 token'ınızın benzersiz bir örneğini blokzincirinde yayınlama eylemidir. [Bu NFT eğitim serisinin 1. Bölümündeki](/developers/tutorials/how-to-write-and-deploy-an-nft/) akıllı sözleşmemizi kullanarak, Web3 becerilerimizi gösterelim ve bir NFT basalım. Bu eğitimin sonunda, kalbinizin (ve cüzdanınızın) arzu ettiği kadar çok NFT basabileceksiniz!

Hadi başlayalım!

## 1. Adım: Web3'ü Yükleyin {#install-web3}

NFT akıllı sözleşmenizi oluşturmaya yönelik ilk eğitimi takip ettiyseniz, Ethers.js kullanma konusunda zaten deneyiminiz var demektir. Web3, [Ethereum](/) blokzincirine istek oluşturmayı kolaylaştırmak için kullanılan bir kütüphane olması bakımından Ethers'a benzer. Bu eğitimde, otomatik yeniden denemeler ve sağlam WebSocket desteği sunan gelişmiş bir Web3 kütüphanesi olan [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)'ü kullanacağız.

Projenizin ana dizininde şunu çalıştırın:

```
npm install @alch/alchemy-web3
```

## 2. Adım: Bir `mint-nft.js` dosyası oluşturun {#create-mintnftjs}

scripts dizininizin içinde bir `mint-nft.js` dosyası oluşturun ve aşağıdaki kod satırlarını ekleyin:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## 3. Adım: Sözleşme ABI'nizi alın

Sözleşme ABI'miz (Uygulama İkili Arayüzü), akıllı sözleşmemizle etkileşime girmek için kullanılan arayüzdür. [Sözleşme ABI'leri](/glossary/#abi) hakkında daha fazla bilgi edinebilirsiniz. Hardhat bizim için otomatik olarak bir ABI oluşturur ve bunu `MyNFT.json` dosyasına kaydeder. Bunu kullanmak için, `mint-nft.js` dosyamıza aşağıdaki kod satırlarını ekleyerek içerikleri ayrıştırmamız gerekecek:

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
## 4. Adım: IPFS kullanarak NFT'niz için meta verileri yapılandırın {#config-meta}

Bölüm 1'deki eğitimimizden hatırlarsanız, `mintNFT` akıllı sözleşme fonksiyonumuz, NFT'nin meta verilerini açıklayan bir JSON belgesine çözümlenmesi gereken bir tokenURI parametresi alır; bu, NFT'ye hayat veren ve onun bir isim, açıklama, görüntü ve diğer nitelikler gibi yapılandırılabilir özelliklere sahip olmasını sağlayan şeydir.

> _Gezegenlerarası Dosya Sistemi (IPFS), dağıtılmış bir dosya sisteminde veri depolamak ve paylaşmak için kullanılan merkeziyetsiz bir protokol ve eşler arası ağdır._

NFT'mizin gerçekten merkeziyetsiz olmasını sağlamak amacıyla NFT varlığımızı ve meta verilerimizi depolamak için kullanışlı bir IPFS API'si ve araç seti olan Pinata'yı kullanacağız. Bir Pinata hesabınız yoksa, [buradan](https://app.pinata.cloud) ücretsiz bir hesaba kaydolun ve e-postanızı doğrulamak için adımları tamamlayın.

Bir hesap oluşturduktan sonra:

- "Files" (Dosyalar) sayfasına gidin ve sayfanın sol üst köşesindeki mavi "Upload" (Yükle) düğmesine tıklayın.

- Pinata'ya bir görüntü yükleyin — bu, NFT'niz için görüntü varlığı olacaktır. Varlığı istediğiniz gibi adlandırmaktan çekinmeyin.

- Yükledikten sonra, "Files" sayfasındaki tabloda dosya bilgilerini göreceksiniz. Ayrıca bir CID sütunu da göreceksiniz. Yanındaki kopyala düğmesine tıklayarak CID'yi kopyalayabilirsiniz. Yüklemenizi şu adreste görüntüleyebilirsiniz: `https://gateway.pinata.cloud/ipfs/<CID>`. Örneğin, IPFS'te kullandığımız görüntüyü [burada](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5) bulabilirsiniz.

Daha görsel öğrenenler için yukarıdaki adımlar burada özetlenmiştir:

![How to upload your image to Pinata](./instructionsPinata.gif)

Şimdi, Pinata'ya bir belge daha yüklemek isteyeceğiz. Ancak bunu yapmadan önce onu oluşturmamız gerekiyor!

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

Json'daki verileri değiştirmekten çekinmeyin. Nitelikler (attributes) bölümünden çıkarma yapabilir veya ekleme yapabilirsiniz. En önemlisi, image alanının IPFS görüntünüzün konumunu işaret ettiğinden emin olun — aksi takdirde NFT'niz (çok sevimli!) bir köpeğin fotoğrafını içerecektir.

JSON dosyasını düzenlemeyi bitirdiğinizde, kaydedin ve görüntüyü yüklemek için yaptığımız adımların aynısını izleyerek Pinata'ya yükleyin.

![How to upload your nft-metadata.json to Pinata](./uploadPinata.gif)

## 5. Adım: Sözleşmenizin bir örneğini oluşturun {#instance-contract}

Şimdi, sözleşmemizle etkileşime girmek için kodumuzda onun bir örneğini oluşturmamız gerekiyor. Bunu yapmak için, dağıtımdan veya sözleşmeyi dağıtmak için kullandığınız adresi aratarak [Blockscout](https://eth-sepolia.blockscout.com/)'tan alabileceğimiz sözleşme adresimize ihtiyacımız olacak.

![View your contract address on Etherscan](./view-contract-etherscan.png)

Yukarıdaki örnekte, sözleşme adresimiz 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778'dir.

Ardından, ABI ve adresi kullanarak sözleşmemizi oluşturmak için Web3 [contract metodunu](https://docs.web3js.org/api/web3-eth-contract/class/Contract) kullanacağız. `mint-nft.js` dosyanıza aşağıdakileri ekleyin:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## 6. Adım: `.env` dosyasını güncelleyin {#update-env}

Şimdi, Ethereum zincirine işlemler oluşturmak ve göndermek için, hesap nonce'unu (aşağıda açıklanacaktır) almak üzere açık Ethereum hesap adresinizi kullanacağız.

Açık anahtarınızı `.env` dosyanıza ekleyin — eğitimin 1. bölümünü tamamladıysanız, `.env` dosyamız artık şu şekilde görünmelidir:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## 7. Adım: İşleminizi oluşturun

İlk olarak, `mintNFT(tokenData)` adında bir fonksiyon tanımlayalım ve aşağıdakileri yaparak işlemimizi oluşturalım:

1. `.env` dosyasından _PRIVATE_KEY_ ve _PUBLIC_KEY_ değerlerinizi alın.

1. Ardından, hesap nonce'unu bulmamız gerekecek. Nonce spesifikasyonu, adresinizden gönderilen işlemlerin sayısını takip etmek için kullanılır — buna güvenlik amacıyla ve tekrarlama saldırılarını önlemek için ihtiyacımız vardır. Adresinizden gönderilen işlemlerin sayısını almak için [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count) kullanırız.

1. Son olarak işlemimizi aşağıdaki bilgilerle kuracağız:

- `'from': PUBLIC_KEY` — İşlemimizin kaynağı açık adresimizdir

- `'to': contractAddress` — Etkileşime girmek ve işlemi göndermek istediğimiz sözleşme

- `'nonce': nonce` — Adresimizden gönderilen işlemlerin sayısını içeren hesap nonce'u

- `'gas': estimatedGas` — İşlemi tamamlamak için gereken tahmini gaz

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — Bu işlemde gerçekleştirmek istediğimiz hesaplama — ki bu durumda bir NFT basmaktır

`mint-nft.js` dosyanız şimdi şu şekilde görünmelidir:

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
## 8. Adım: İşlemi imzalayın {#sign-txn}

İşlemimizi oluşturduğumuza göre, onu göndermek için imzalamamız gerekiyor. İşte burada özel anahtarımızı kullanacağız.

`web3.eth.sendSignedTransaction` bize işlem hash'ini verecektir, bunu işlemimizin madenciliğinin yapıldığından ve ağ tarafından düşürülmediğinden emin olmak için kullanabiliriz. İşlem imzalama bölümünde, işlemimizin başarıyla gerçekleşip gerçekleşmediğini bilmek için bazı hata kontrolleri eklediğimizi fark edeceksiniz.

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

## 9. Adım: `mintNFT` çağrısı yapın ve node `mint-nft.js` çalıştırın {#call-mintnft-fn}

Pinata'ya yüklediğiniz `metadata.json` dosyasını hatırlıyor musunuz? Pinata'dan onun hash kodunu alın ve aşağıdakini `mintNFT` fonksiyonuna parametre olarak geçirin `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

Hash kodunu şu şekilde alabilirsiniz:

![How to get your nft metadata hashcode on Pinata](./metadataPinata.gif)_Pinata'da nft meta veri hash kodunuzu nasıl alırsınız_

> Ayrı bir pencereye `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` yükleyerek kopyaladığınız hash kodunun **metadata.json** dosyanıza bağlandığını iki kez kontrol edin. Sayfa aşağıdaki ekran görüntüsüne benzer görünmelidir:

![Your page should display the json metadata](./metadataJSON.png)_Sayfanız json meta verilerini göstermelidir_

Bütünüyle, kodunuz şuna benzer görünmelidir:

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

Şimdi, NFT'nizi dağıtmak için `node scripts/mint-nft.js` komutunu çalıştırın. Birkaç saniye sonra, terminalinizde şuna benzer bir yanıt görmelisiniz:

    İşleminizin hash'i: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8

    İşleminizin durumunu görüntülemek için Alchemy'nin Bellek Havuzunu kontrol edin!

Ardından, işleminizin durumunu (beklemede mi, madenciliği yapıldı mı veya ağ tarafından düşürüldü mü) görmek için [Alchemy bellek havuzunuzu](https://dashboard.alchemy.com/mempool) ziyaret edin. İşleminiz düşürüldüyse, [Blockscout](https://eth-sepolia.blockscout.com/)'u kontrol etmek ve işlem hash'inizi aramak da yararlı olacaktır.

![View your NFT transaction hash on Etherscan](./view-nft-etherscan.png)_Etherscan'de NFT işlem hash'inizi görüntüleyin_

Ve işte bu kadar! Artık Ethereum blokzincirinde bir NFT dağıttınız VE bastınız <Emoji text=":money_mouth_face:" size={1} />

`mint-nft.js` kullanarak kalbinizin (ve cüzdanınızın) arzu ettiği kadar çok NFT basabilirsiniz! Sadece NFT'nin meta verilerini açıklayan yeni bir tokenURI geçirdiğinizden emin olun (aksi takdirde, farklı kimliklere sahip bir sürü aynı NFT'den yapmış olursunuz).

Muhtemelen NFT'nizi cüzdanınızda sergileyebilmek istersiniz — bu yüzden [Bölüm 3: NFT'nizi Cüzdanınızda Nasıl Görüntülersiniz](/developers/tutorials/how-to-view-nft-in-metamask/) kısmına göz atmayı unutmayın!
