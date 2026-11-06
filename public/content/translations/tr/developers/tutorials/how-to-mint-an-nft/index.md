---
title: "Bir NFT Nasıl Basılır (NFT Eğitim Serisi Bölüm 2/3)"
description: "Bu eğitim, akıllı sözleşmemizi, Hardhat ve Ethers.js'yi kullanarak Ethereum Blokzinciri üzerinde nasıl bir değiştirilemez token (NFT) basılacağını açıklamaktadır."
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "akıllı sözleşmeler"]
skill: beginner
breadcrumb: NFT Basmak
lang: tr
published: 2021-04-22
---

“Bir değiştirilemez token (NFT) basımı”, ERC-721 Token'ınızın benzersiz bir örneğini Blokzincir üzerinde yayınlama eylemidir. [Bu NFT eğitim serisinin 1. Bölümündeki](/developers/tutorials/how-to-write-and-deploy-an-nft/) akıllı sözleşmemizi kullanarak Web3 becerilerimizi gösterelim ve bir NFT basalım. Bu eğitimin sonunda, kalbinizin (ve Cüzdanınızın) arzu ettiği kadar çok NFT basabileceksiniz!

Hadi başlayalım!

## Adım 1: Kurulumunuzu kontrol edin {#install-web3}

Değiştirilemez token (NFT) akıllı sözleşmenizi oluşturmaya yönelik ilk eğitimi takip ettiyseniz, ihtiyacınız olan her şeye zaten sahipsiniz: [Ethers eklentisi](https://hardhat.org/docs/plugins/hardhat-ethers) ve [Ethereum](/) Blokzincirine istek oluşturmayı kolaylaştırmak için kullanılan bir Kütüphane olan [Ethers.js](https://docs.ethers.org/v6/) ile bir Hardhat 3 projesi. Basım kodumuzu bir Hardhat betiği olarak yazacağız, böylece Sepolia ağ ayarlarını ve 1. Bölümdeki `API_URL` ile `PRIVATE_KEY` değerlerini yeniden kullanacak — yüklenecek yeni bir şey yok.

## Adım 2: Bir `mint-nft.js` dosyası oluşturun {#create-mintnftjs}

Betikler (scripts) dizininizin içinde bir `mint-nft.js` dosyası oluşturun ve aşağıdaki kod satırlarını ekleyin:

```js
import { network } from "hardhat"

const { ethers } = await network.create()
```

Dağıtma betiğimizde olduğu gibi, `network.create()`, betiği çalıştırdığınızda `--network` ile seçtiğiniz ağa bağlanır ve bunun için bize bir `ethers` nesnesi verir.

## Adım 3: Sözleşme ABI'nizi alın {#contract-abi}

Sözleşme Uygulama İkili Arayüzümüz (ABI), akıllı sözleşmemizle etkileşime geçmek için kullanılan arayüzdür. [Sözleşme ABI'leri](/glossary/#abi) hakkında daha fazla bilgi edinebilirsiniz. Hardhat, Sözleşmeyi derlediğinde bizim için otomatik olarak bir ABI oluşturur ve bunu `artifacts/contracts/MyNFT.sol/MyNFT.json` dosyasına kaydeder. Hardhat Ethers eklentisi, 5. adımda Sözleşme örneğimizi oluşturduğumuzda bunu bizim için oradan okur, bu nedenle kendimiz yüklememize gerek kalmaz.

ABI'yi görmek isterseniz konsolunuza yazdırabilirsiniz. Projenizin kök dizininden şunu çalıştırın:

```sh
node -p "JSON.stringify(require('./artifacts/contracts/MyNFT.sol/MyNFT.json').abi)"
```

## Adım 4: IPFS kullanarak NFT'niz için meta verileri yapılandırın {#config-meta}

Bölüm 1'deki eğitimimizden hatırlarsanız, `mintNFT` akıllı sözleşme fonksiyonumuz, değiştirilemez token'ın (NFT) meta verilerini açıklayan bir JSON belgesine çözümlenmesi gereken bir tokenURI parametresi alır; bu, NFT'ye gerçekten hayat veren ve isim, açıklama, resim ve diğer nitelikler gibi yapılandırılabilir özelliklere sahip olmasını sağlayan şeydir.

> _Gezegenlerarası Dosya Sistemi (IPFS), dağıtık bir dosya sisteminde veri depolamak ve paylaşmak için kullanılan merkeziyetsiz bir Protokol ve eşler arası bir ağdır._

NFT'mizin gerçekten merkeziyetsiz olmasını sağlamak amacıyla NFT varlığımızı ve meta verilerimizi depolamak için kullanışlı bir IPFS uygulama programlama arayüzü (API) ve araç seti olan Pinata'yı kullanacağız. Bir Pinata hesabınız yoksa, [buradan](https://app.pinata.cloud) ücretsiz bir hesap için kaydolun ve e-postanızı doğrulamak için adımları tamamlayın.

Bir hesap oluşturduktan sonra:

- [Dosyalar sayfasına](https://app.pinata.cloud/ipfs/files) gidin ve sayfanın sağ üst köşesindeki "Add" (Ekle) düğmesine tıklayın.

- Pinata'ya bir resim yükleyin — bu, NFT'niz için resim varlığı olacaktır. Varlığa dilediğiniz ismi vermekten çekinmeyin. Herkese açık IPFS'ye yüklediğinizden emin olun: [Özel IPFS](https://docs.pinata.cloud/files/private-ipfs) üzerindeki dosyalar, NFT'nizi görüntüleyen Cüzdanlar ve pazar yerleri tarafından getirilemez.

- Yükledikten sonra, dosyayı Dosyalar sayfasında CID'si (içerik tanımlayıcısı) ile birlikte listelenmiş olarak göreceksiniz. CID'yi kopyalayın. Yüklemenizi `https://gateway.pinata.cloud/ipfs/<CID>` adresinde veya Pinata kenar çubuğunda "Gateways" (Ağ Geçitleri) altında listelenen özel ağ geçidi aracılığıyla görüntüleyebilirsiniz. Örneğin, IPFS'de kullandığımız resmi [burada](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5) bulabilirsiniz.

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

Json'daki verileri değiştirmekten çekinmeyin. Nitelikler (attributes) bölümünden çıkarma yapabilir veya ekleme yapabilirsiniz. En önemlisi, resim alanının `ipfs://<image-CID>` biçiminde IPFS resminizin konumunu işaret ettiğinden emin olun — aksi takdirde NFT'niz (çok sevimli!) bir köpeğin fotoğrafını içerecektir.

JSON dosyasını düzenlemeyi bitirdiğinizde, resmi yüklemek için yaptığımız adımların aynısını izleyerek kaydedin ve Pinata'ya yükleyin. `nft-metadata.json` dosyasının CID'sini de kopyalayın; 9. adımda buna ihtiyacımız olacak.

## Adım 5: Sözleşmenizin bir örneğini oluşturun {#instance-contract}

Şimdi, Sözleşmemizle etkileşime geçmek için kodumuzda onun bir örneğini oluşturmamız gerekiyor. Bunu yapmak için, 1. Bölümde dağıtma betiğimizin yazdırdığı Sözleşme Adresimize ihtiyacımız olacak. Ayrıca Sözleşmeyi dağıtmak için kullandığınız Adresi aratarak [Etherscan](https://sepolia.etherscan.io/) veya [Blockscout](https://eth-sepolia.blockscout.com/) üzerinde de bulabilirsiniz.

![Sözleşme adresinizi Etherscan'de görüntüleyin](./view-contract-etherscan.png)

Yukarıdaki örnekte Sözleşme Adresimiz 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778'dir.

Ardından, Sözleşmemizi adını (hangi Uygulama İkili Arayüzünü (ABI) kullanacağını söyler) ve Adresini kullanarak oluşturmak için Hardhat Ethers eklentisinin `getContractAt` metodunu kullanacağız. `mint-nft.js` dosyanıza, Adresi kendinizinkiyle değiştirerek aşağıdakileri ekleyin:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)
```

## Adım 6: `.env` dosyasını kontrol edin {#update-env}

Gönderdiğimiz her işlemin Hesabınızın özel anahtarı ile imzalanması gerekir. Eğitimin 1. bölümünü tamamladıysanız, `.env` dosyamız zaten şu şekilde görünmelidir:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Herkese açık Adresinizi eklemenize gerek yoktur: ethers bunu özel anahtardan çözer.

## Adım 7: İşleminizi oluşturun {#create-txn}

İlk olarak, `mintNFT(tokenURI)` adında bir fonksiyon tanımlayalım ve aşağıdakileri yaparak işlemimizi oluşturalım:

1. İşlemi gönderdiğimiz Hesabı alın. `ethers.getSigners()`, ağ için yapılandırılmış Hesapları döndürür; bu, Sepolia'da özel anahtarı `.env` içinde bulunan Hesaptır. `mintNFT` `onlyOwner` (sadece sahip) olduğundan, bu Sözleşmeyi dağıtan Hesapla aynı olmalıdır.

1. Alıcı olarak kendi Adresimiz ve meta veri URI'si ile Sözleşme örneğimizdeki `mintNFT` fonksiyonunu çağırın. Bu, bu işlemde gerçekleştirmek istediğimiz hesaplamadır — ki bu durumda bir değiştirilemez token (NFT) basımıdır.

Nonce'ı (Adresinizden gönderilen ve tekrarlama saldırılarını önleyen işlem sayısı), gaz limitini veya ücretleri kendiniz hesaplamanıza gerek yoktur: ethers, işlemi göndermeden önce bunları getirir veya tahmin eder.

`mint-nft.js` dosyanız şimdi şu şekilde görünmelidir:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  // İşlemi gönderin. ethers bizim için nonce, gas limiti ve ücretleri doldurur.
  const tx = await nftContract.mintNFT(signer.address, tokenURI)
}
```

## Adım 8: İşlemi imzalayın {#sign-txn}

Ağ özel anahtarımızla yapılandırıldığından, ethers işlemi göndermeden önce otomatik olarak onunla imzalar.

`mintNFT` çağrısı, işlem gönderildikten sonra döner ve işlemimizin madenciliğinin yapıldığından ve ağ tarafından düşürülmediğinden emin olmak için kullanabileceğimiz işlem hash'ini verir. `tx.wait()` daha sonra işlem bir Bloğa dahil edilene kadar bekler. İşlemimizin başarıyla gerçekleşip gerçekleşmediğini bilmek için bazı hata kontrolleri de ekledik.

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // İşlemi gönderin. ethers bizim için nonce, gas limiti ve ücretleri doldurur.
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // İşlemin bir bloğa dahil edilmesini bekleyin
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}
```

## Adım 9: `mintNFT` çağrısı yapın ve `mint-nft.js` dosyasını çalıştırın {#call-mintnft-fn}

Pinata'ya yüklediğiniz `nft-metadata.json` dosyasını hatırlıyor musunuz? Pinata'dan CID'sini alın ve `ipfs://<metadata-CID>` değerini `mintNFT` fonksiyonuna parametre olarak geçirin. Cüzdanlar ve pazar yerleri `ipfs://` URI'lerini kendi seçtikleri bir IPFS ağ geçidi üzerinden çözer, böylece değiştirilemez token'ınız (NFT) tek bir ağ geçidine bağlı kalmaz.

> Ayrı bir pencerede `https://gateway.pinata.cloud/ipfs/<metadata-CID>` adresini yükleyerek kopyaladığınız CID'nin **nft-metadata.json** dosyanıza bağlandığını iki kez kontrol edin. Sayfa aşağıdaki ekran görüntüsüne benzer görünmelidir:

![Sayfanız json meta verilerini göstermelidir](./metadataJSON.png)_Sayfanız json meta verilerini göstermelidir_

Genel olarak kodunuz şuna benzer görünmelidir:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // İşlemi gönderin. ethers bizim için nonce, gas limiti ve ücretleri doldurur.
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // İşlemin bir bloğa dahil edilmesini bekleyin
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}

await mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Şimdi, NFT'nizi basmak için betiği Sepolia'ya karşı çalıştırın:

```sh
npx hardhat run scripts/mint-nft.js --network sepolia
```

Birkaç saniye sonra terminalinizde şuna benzer bir yanıt görmelisiniz:

```text
The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
Your NFT was minted in block <block number>
```

İşleminizin ayrıntılarını görmek için [Etherscan](https://sepolia.etherscan.io/) veya [Blockscout](https://eth-sepolia.blockscout.com/) üzerinde hash'ini aratın.

![NFT işlem hash'inizi Etherscan'de görüntüleyin](./view-nft-etherscan.png)_NFT işlem hash'inizi Etherscan'de görüntüleyin_

Ve işte bu kadar! Artık Ethereum Blokzinciri üzerinde bir NFT dağıttınız VE bastınız <Emoji text=":money_mouth_face:" size={1} />

`mint-nft.js` kullanarak kalbinizin (ve Cüzdanınızın) arzu ettiği kadar çok NFT basabilirsiniz! Sadece NFT'nin meta verilerini açıklayan yeni bir tokenURI geçirdiğinizden emin olun (aksi takdirde, farklı kimliklere sahip bir sürü aynı NFT'den yapmış olursunuz).

Muhtemelen NFT'nizi Cüzdanınızda sergilemek istersiniz — bu yüzden [Bölüm 3: NFT'nizi Cüzdanınızda Nasıl Görüntülersiniz](/developers/tutorials/how-to-view-nft-in-metamask/) kısmına göz atmayı unutmayın!
