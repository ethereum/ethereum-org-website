---
title: "viem Kullanarak İşlem Gönderme"
description: "Bu, viem kütüphanesini kullanarak Ethereum işlemleri göndermeye yönelik başlangıç dostu bir rehberdir. Ethereum blokzincirine bir işlem göndermek için üç ana adım vardır: oluşturma, imzalama ve yayınlama. Bu üçünü de inceleyeceğiz."
author: "Elan Halpern"
tags: ["işlemler", "viem", "Alchemy"]
skill: beginner
breadcrumb: "İşlem gönder"
lang: tr
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

Bu, [viem](https://viem.sh/) kütüphanesini kullanarak Ethereum işlemleri göndermeye yönelik başlangıç dostu bir rehberdir. Ethereum blokzincirine bir işlem göndermek için üç ana adım vardır: oluşturma, imzalama ve yayınlama. Aklınıza gelebilecek tüm soruları yanıtlamayı umarak bu üçünü de inceleyeceğiz! Bu eğitimde, işlemlerimizi Ethereum zincirine göndermek için [Alchemy](https://www.alchemy.com/) kullanacağız. Buradan [ücretsiz bir Alchemy hesabı oluşturabilirsiniz](https://auth.alchemy.com/signup).

**NOT:** Bu rehber, uygulamanızın _arka ucunda (backend)_ işlemlerinizi imzalamak içindir. İşlemlerinizi ön uçta (frontend) imzalamayı entegre etmek istiyorsanız, [MetaMask sağlayıcı API'sine (provider API)](https://docs.metamask.io/wallet/reference/provider-api/) göz atın.

## Temeller {#the-basics}

Çoğu blokzincir geliştiricisinin ilk başladığında yaptığı gibi, bir işlemin nasıl gönderileceği (oldukça basit olması gereken bir şey) hakkında biraz araştırma yapmış ve her biri farklı şeyler söyleyen, sizi biraz bunaltan ve kafanızı karıştıran çok sayıda rehberle karşılaşmış olabilirsiniz. Eğer bu durumdaysanız endişelenmeyin; hepimiz bir noktada aynı durumdaydık! Bu yüzden, başlamadan önce birkaç şeyi açıklığa kavuşturalım:

### 1\. Alchemy özel anahtarlarınızı saklamaz {#alchemy-does-not-store-your-private-keys}

- Bu, Alchemy'nin sizin adınıza işlemleri imzalayamayacağı ve gönderemeyeceği anlamına gelir. Bunun nedeni güvenlik amaçlıdır. Alchemy sizden asla özel anahtarınızı paylaşmanızı istemez ve özel anahtarınızı asla barındırılan bir düğümle (veya bu konuda herhangi biriyle) paylaşmamalısınız.
- Alchemy'nin çekirdek API'sini kullanarak blokzincirden okuma yapabilirsiniz, ancak ona yazmak için işlemlerinizi Alchemy aracılığıyla göndermeden önce imzalamak üzere başka bir şey kullanmanız gerekecektir (bu, diğer herhangi bir [düğüm hizmeti](/developers/docs/nodes-and-clients/nodes-as-a-service/) için de aynıdır).

### 2\. "İmzalayıcı (signer)" nedir? {#what-is-a-signer}

- İmzalayıcılar, özel anahtarınızı kullanarak sizin için işlemleri imzalar. Bu eğitimde işlemimizi imzalamak için [viem](https://viem.sh/) kullanacağız, ancak başka herhangi bir Web3 kütüphanesini de kullanabilirsiniz.
- Ön uçta, sizin adınıza işlemleri imzalayacak ve gönderecek olan [MetaMask](https://metamask.io/), bir imzalayıcıya iyi bir örnektir.

### 3\. İşlemlerimi neden imzalamam gerekiyor? {#why-do-i-need-to-sign-my-transactions}

- Ethereum ağında bir işlem göndermek isteyen her kullanıcı, işlemin kaynağının iddia ettiği kişi olduğunu doğrulamak için işlemi (özel anahtarını kullanarak) imzalamalıdır.
- Bu özel anahtarı korumak son derece önemlidir, çünkü ona erişim sağlamak Ethereum hesabınız üzerinde tam kontrol sağlayarak sizin (veya erişimi olan herhangi birinin) adınıza işlemler gerçekleştirmesine olanak tanır.

### 4\. Özel anahtarımı nasıl korurum? {#how-do-i-protect-my-private-key}

- Özel anahtarınızı korumanın ve onu işlemler göndermek için kullanmanın birçok yolu vardır. Bu eğitimde bir `.env` dosyası kullanacağız. Ancak, özel anahtarları saklayan ayrı bir sağlayıcı kullanabilir, bir anahtar deposu dosyası veya başka seçenekler de kullanabilirsiniz.

### 5\. `eth_sendTransaction` ve `eth_sendRawTransaction` arasındaki fark nedir? {#difference-between-send-and-send-raw}

`eth_sendTransaction` ve `eth_sendRawTransaction`, gelecekteki bir bloğa eklenmesi için Ethereum ağına bir işlem yayınlayan Ethereum API işlevleridir. İşlemlerin imzalanmasını nasıl ele aldıkları konusunda farklılık gösterirler.

- [`eth_sendTransaction`](/developers/docs/apis/json-rpc/#eth-sendtransaction), _imzasız_ işlemleri göndermek için kullanılır; bu, gönderdiğiniz düğümün işlemi zincire yayınlamadan önce imzalayabilmesi için özel anahtarınızı yönetmesi gerektiği anlamına gelir. Alchemy kullanıcıların özel anahtarlarını tutmadığı için bu yöntemi desteklemez.
- [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction), halihazırda imzalanmış işlemleri yayınlamak için kullanılır. Bu, önce işlemi özel anahtarınızla imzalamanız (viem'de, [yerel bir hesap](https://viem.sh/docs/accounts/local/privateKeyToAccount) ile [`signTransaction`](https://viem.sh/docs/actions/wallet/signTransaction) kullanarak), ardından sonucu `eth_sendRawTransaction` içine geçirmeniz gerektiği anlamına gelir.

viem kullanırken, `eth_sendRawTransaction` işlevine [`sendRawTransaction`](https://viem.sh/docs/actions/wallet/sendRawTransaction) işlevi çağrılarak erişilir.

Bu eğitimde kullanacağımız şey budur.

### 6\. Web3 kütüphanesi nedir? {#what-is-the-web3-library}

- Bir Web3 kütüphanesi, Ethereum geliştirmede kullanımı oldukça yaygın olan standart [JSON-RPC çağrıları](/developers/docs/apis/json-rpc/) etrafında bir sarmalayıcıdır.
- Farklı diller için birçok Web3 kütüphanesi vardır. Bu eğitimde, TypeScript ile yazılmış ve herhangi bir JavaScript projesinde çalışan [viem](https://viem.sh/) kullanacağız. [ethers.js](https://docs.ethers.org/v6/) gibi diğer seçeneklere [buradan](/developers/docs/apis/javascript/) göz atabilirsiniz.

Pekala, bu sorulardan birkaçını aradan çıkardığımıza göre, eğitime geçelim. Alchemy [Discord](https://discord.gg/gWuC7zB) sunucusunda istediğiniz zaman soru sormaktan çekinmeyin!

### 7\. Güvenli, gaz için optimize edilmiş ve gizli işlemler nasıl gönderilir? {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy'nin bir dizi işlem kaynağı vardır](https://www.alchemy.com/docs/sending-transactions). Bunları işlemler göndermek, gerçekleşmeden önce işlemleri simüle etmek, gizli işlemler göndermek ve gaz için optimize edilmiş işlemler göndermek için kullanabilirsiniz.
- İşleminiz bellek havuzundan çekilip zincire eklendiğinde uyarılmak için [Alchemy web kancalarını (webhooks)](https://www.alchemy.com/docs/reference/webhooks-overview) da kullanabilirsiniz.

**NOT:** Bu rehber bir Alchemy hesabı, bir Ethereum adresi veya MetaMask cüzdanı, Node.js ve npm'in kurulu olmasını gerektirir. Eğer kurulu değilse, şu adımları izleyin:

1.  [Ücretsiz bir Alchemy hesabı oluşturun](https://auth.alchemy.com/signup)
2.  [MetaMask hesabı oluşturun](https://metamask.io/) (veya bir Ethereum adresi edinin)
3.  [Node.js ve npm'i kurun](https://nodejs.org/en/download/)
## İşleminizi Gönderme Adımları {#steps-to-sending-your-transaction}

### 1\. Sepolia test ağında bir Alchemy uygulaması oluşturun {#create-an-alchemy-app-on-the-sepolia-testnet}

[Alchemy Kontrol Panelinize](https://dashboard.alchemy.com/) gidin ve ağınız için Sepolia'yı (veya başka bir test ağını) seçerek yeni bir uygulama oluşturun.

### 2\. Sepolia musluğundan ETH talep edin {#request-eth-from-sepolia-faucet}

ETH almak için [Alchemy Sepolia musluğundaki](https://www.alchemy.com/faucets/ethereum-sepolia) talimatları izleyin veya diğer [Sepolia musluklarından](/developers/docs/networks/#sepolia) birini kullanın. Musluklar küçük miktarlar verir (Alchemy musluğu günde 0,1 ETH verir), bu da bu eğitim için fazlasıyla yeterlidir. Başka bir ağın değil, **Sepolia** Ethereum adresinizi (MetaMask'ten) eklediğinizden emin olun. Talimatları izledikten sonra, cüzdanınıza ETH'nin ulaştığını iki kez kontrol edin.

### 3\. Yeni bir proje dizini oluşturun ve içine `cd` yapın {#create-a-new-project-direction}

Komut satırından (Mac'ler için terminal) yeni bir proje dizini oluşturun ve içine gidin:

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. viem'i (veya herhangi bir Web3 kütüphanesini) kurun {#install-alchemy-web3}

[viem](https://viem.sh/)'i kurmak için proje dizininizde aşağıdaki komutu çalıştırın:

Ethers.js kütüphanesini kullanmak isterseniz, [buradaki talimatları izleyin](https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```sh
npm init -y
npm install viem
```

### 5\. dotenv'i kurun {#install-dotenv}

API anahtarımızı ve özel anahtarımızı güvenli bir şekilde saklamak için bir `.env` dosyası kullanacağız.

```
npm install dotenv --save
```

### 6\. `.env` dosyasını oluşturun {#create-the-dotenv-file}

Proje dizininizde bir `.env` dosyası oluşturun ve aşağıdakileri ekleyin ("`your-api-url`" ve "`your-private-key`" kısımlarını değiştirerek)

- Alchemy API URL'nizi bulmak için, kontrol panelinizde yeni oluşturduğunuz uygulamanın uygulama ayrıntıları sayfasına gidin, sağ üst köşedeki "View Key" (Anahtarı Görüntüle) seçeneğine tıklayın ve HTTP URL'sini alın.
- MetaMask kullanarak özel anahtarınızı bulmak için bu [rehbere](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) göz atın. Yalnızca test ağı ETH'si tutan bir hesap kullanın.

```sh
API_URL="your-api-url"
PRIVATE_KEY="your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
<code>.env</code> dosyasını işlemeyin (commit etmeyin)! Lütfen <code>.env</code> dosyanızı asla kimseyle paylaşmadığınızdan veya ifşa etmediğinizden emin olun, çünkü bunu yaparak sırlarınızı tehlikeye atarsınız. Sürüm kontrolü kullanıyorsanız, <code>.env</code> dosyanızı bir <a href="https://git-scm.com/docs/gitignore">gitignore</a> dosyasına ekleyin.
</AlertDescription>
</AlertContent>
</Alert>

### 7\. `sendTx.js` dosyasını oluşturun {#create-sendtx-js}

Harika, artık hassas verilerimizi bir `.env` dosyasında koruduğumuza göre kodlamaya başlayalım. İşlem gönderme örneğimiz için, MetaMask'teki ikinci bir hesap gibi kontrol ettiğiniz başka bir adrese 0,001 ETH göndereceğiz.

Örnek işlemimizi yapılandıracağımız ve göndereceğimiz yer olan bir `sendTx.js` dosyası oluşturun ve içine aşağıdaki kod satırlarını ekleyin:

```js
require("dotenv").config({ quiet: true })
const { createPublicClient, createWalletClient, http, parseEther } = require("viem")
const { privateKeyToAccount } = require("viem/accounts")
const { sepolia } = require("viem/chains")

async function main() {
  const { API_URL, PRIVATE_KEY } = process.env
  const account = privateKeyToAccount(
    PRIVATE_KEY.startsWith("0x") ? PRIVATE_KEY : `0x${PRIVATE_KEY}`
  )
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(API_URL),
  })
  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(API_URL),
  })

  const nonce = await publicClient.getTransactionCount({
    address: account.address,
    blockTag: "pending",
  }) // nonce 0'dan saymaya başlar

  const transaction = await walletClient.prepareTransactionRequest({
    to: "0xYourSecondAddress", // TODO: ETH göndermek istediğiniz Adres ile değiştirin
    value: parseEther("0.001"), // 0.001 ETH
    gas: 21000n,
    nonce,
    // mesaj göndermek veya Akıllı sözleşme yürütmek için isteğe bağlı veri alanı
  })

  const signedTx = await walletClient.signTransaction(transaction)

  try {
    const hash = await walletClient.sendRawTransaction({
      serializedTransaction: signedTx,
    })
    console.log("🎉 The hash of your transaction is:", hash)

    const receipt = await publicClient.waitForTransactionReceipt({ hash })
    console.log(`Transaction ${receipt.status} in block ${receipt.blockNumber}`)
  } catch (error) {
    console.log(
      "❗Something went wrong while submitting your transaction:",
      error.details ?? error.message
    )
  }
}

main()
```

`0xYourSecondAddress` kısmını ETH göndermek istediğiniz adresle değiştirdiğinizden emin olun. Komut dosyası kendi (gönderen) adresinizi `PRIVATE_KEY`'den türetir, bu nedenle onu girmenize gerek yoktur.

Şimdi, bu kodu çalıştırmaya geçmeden önce, buradaki bazı bileşenler hakkında konuşalım.

- `account`: [`privateKeyToAccount`](https://viem.sh/docs/accounts/local/privateKeyToAccount) ile özel anahtarınızdan oluşturulan yerel bir hesap. İmzalama makinenizde gerçekleşir ve özel anahtar asla Alchemy'ye gönderilmez.
- `publicClient` ve `walletClient`: Alchemy URL'nize JSON-RPC istekleri gönderen viem istemcileri. Genel istemci (public client) zincirden okuma yapar ve cüzdan istemcisi (wallet client) hesabınız için işlemleri hazırlar ve imzalar.
- `nonce` : Nonce belirtimi, adresinizden gönderilen işlemlerin sayısını takip etmek için kullanılır. Buna güvenlik amacıyla ve tekrarlama (replay) saldırılarını önlemek için ihtiyacımız var. Adresinizden gönderilen işlemlerin sayısını almak için [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count) kullanırız. viem bunu sizin için de doldurabilir, ancak nereden geldiğini göstermek için burada açıkça getiriyoruz.
- `transaction`: İşlem nesnesinin belirtmemiz gereken birkaç yönü vardır. [`prepareTransactionRequest`](https://viem.sh/docs/actions/wallet/prepareTransactionRequest), mevcut ağ koşullarına bağlı olarak `chainId` ve [EIP-1559](/developers/docs/gas/) ücret alanları `maxFeePerGas` ile `maxPriorityFeePerGas` dahil olmak üzere geri kalanını bizim için doldurur.
  - `to`: Bu, ETH göndermek istediğimiz adrestir.
  - `value`: Bu, 10^18 Wei = 1 ETH olacak şekilde Wei cinsinden belirtilen, göndermek istediğimiz miktardır. [`parseEther`](https://viem.sh/docs/utilities/parseEther), bir ETH miktarını bizim için Wei'ye dönüştürür. Hesabınızın bundan biraz daha fazlasına ihtiyacı vardır, çünkü aynı zamanda gaz için de ödeme yapar.
  - `gas`: İşleminize dahil edilecek doğru gaz miktarını belirlemenin birçok yolu vardır. Alchemy, zincir içi etkinlikler hakkında sizi bilgilendirebilecek [web kancalarını (webhooks)](https://www.alchemy.com/docs/reference/webhooks-overview) destekler. Ana Ağ işlemleri için, dahil edilecek doğru gaz miktarını belirlemek üzere mevcut gaz koşullarını kontrol etmek iyi bir uygulamadır. Sıradan bir adrese yapılan düz bir ETH transferi her zaman tam olarak 21000 gaz kullanır, bu da herhangi bir işlem için minimum değerdir, bu yüzden buraya 21000 koyuyoruz. `gas` değerini dışarıda bırakırsanız, viem bunu sizin için tahmin eder.
  - `nonce`: yukarıdaki nonce tanımına bakın. Nonce sıfırdan saymaya başlar.
  - [İSTEĞE BAĞLI] data: Transferinizle birlikte ek bilgi göndermek veya bir akıllı sözleşmeyi çağırmak için kullanılır, bakiye transferleri için gerekli değildir, aşağıdaki nota göz atın.
- `signedTx`: İşlem nesnemizi imzalamak için, onu `PRIVATE_KEY`'imizden oluşturulan hesapla yerel olarak imzalayan `signTransaction` yöntemini kullanacağız.
- `sendRawTransaction`: İmzalı bir işlemimiz olduğunda, `eth_sendRawTransaction`'ı çağıran `sendRawTransaction`'ı kullanarak onu sonraki bir bloğa dahil edilmek üzere gönderebiliriz.
- `waitForTransactionReceipt`: İşlemin bir bloğa dahil edilmesini bekler ve makbuzunu döndürür.

**Veri (data) üzerine bir Not**
Ethereum'da gönderilebilecek iki ana işlem türü vardır.

- Bakiye transferi: Bir adresten diğerine ETH gönderin. Veri alanı gerekmez, ancak işleminizle birlikte ek bilgi göndermek isterseniz, bu bilgiyi bu alana HEX formatında dahil edebilirsiniz.
  - Örneğin, değişmez bir zaman damgası vermek için bir IPFS belgesinin hash'ini Ethereum zincirine yazmak istediğimizi varsayalım. Veri alanımız, viem'in [`toHex`](https://viem.sh/docs/utilities/toHex) işlevini kullanarak `data: toHex("IPFS hash")` gibi görünmelidir. Ve artık herkes zinciri sorgulayabilir ve o belgenin ne zaman eklendiğini görebilir.
- Akıllı sözleşme işlemi: Zincir üzerinde bir akıllı sözleşme kodu yürütün. Bu durumda, veri alanı, herhangi bir parametreyle birlikte yürütmek istediğiniz akıllı işlevi içermelidir.
  - Pratik bir örnek için [Merhaba Dünya Akıllı Sözleşme eğitimine](/developers/tutorials/hello-world-smart-contract/) göz atın.

### 8\. `node sendTx.js` kullanarak kodu çalıştırın {#run-the-code-using-node-sendtx-js}

Terminalinize veya komut satırınıza geri dönün ve şunu çalıştırın:

```
node sendTx.js
```

### 9\. İşleminizi bir blok gezgininde görün {#see-your-transaction-in-the-mempool}

Komut dosyası, düğüm işlemi kabul eder etmez işlem hash'ini yazdırır, ardından bir bloğa dahil edilene kadar bekler (genellikle birkaç saniye içinde) ve sonucu yazdırır. Ayrıntıları görmek için hash'i [Sepolia Etherscan](https://sepolia.etherscan.io/) veya [Blockscout](https://eth-sepolia.blockscout.com/) gibi bir Sepolia blok gezginine yapıştırın. Orada işlemin beklemeden dahil edilmeye geçişini izleyebilir ve miktarını, ücretlerini ve indiği bloğu görebilirsiniz.

Bunun yerine bir `insufficient funds` (yetersiz bakiye) hatası görürseniz, hesabınızda değer artı gazı karşılayacak kadar Sepolia ETH'si yoktur. 2. adıma geri dönün ve bir musluktan daha fazlasını talep edin.

**Yaşasıııın! Alchemy kullanarak ilk Ethereum işleminizi gönderdiniz 🎉**

_Bu rehber hakkındaki geri bildirimleriniz ve önerileriniz için lütfen Alchemy'nin [Discord](https://discord.gg/gWuC7zB) sunucusunda Elan'a mesaj gönderin!_

_İlk olarak Alchemy tarafından yayınlanmıştır._
