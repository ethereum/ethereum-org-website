---
title: "NFT Basım Aracı Eğitimi"
description: "Bu eğitimde, bir NFT basım aracı oluşturacak ve MetaMask ile Web3 araçlarını kullanarak akıllı sözleşmenizi bir React ön yüzüne bağlayıp tam yığın bir merkeziyetsiz uygulama (dapp) oluşturmayı öğreneceksiniz."
author: "smudgil"
tags: ["Solidity", "NFT", "Alchemy", "akıllı sözleşmeler", "ön yüz", "Pinata", "erc-721"]
skill: intermediate
breadcrumb: "NFT basım dapp'i"
lang: tr
published: 2021-10-06
---

Web2 geçmişinden gelen geliştiriciler için en büyük zorluklardan biri, akıllı sözleşmenizi bir ön yüz projesine nasıl bağlayacağınızı ve onunla nasıl etkileşime gireceğinizi bulmaktır.

Dijital varlığınıza bir bağlantı, bir başlık ve bir açıklama girebileceğiniz basit bir kullanıcı arayüzü olan bir NFT basım aracı oluşturarak şunları öğreneceksiniz:

- Ön yüz projeniz aracılığıyla MetaMask'a bağlanmak
- Ön yüzünüzden akıllı sözleşme yöntemlerini çağırmak
- MetaMask kullanarak işlemleri imzalamak

Bu eğitimde, ön yüz çerçevemiz olarak [React](https://react.dev/) kullanacağız. Bu eğitim öncelikle Web3 geliştirmeye odaklandığından, React temellerini parçalara ayırmak için fazla zaman harcamayacağız. Bunun yerine, projemize işlevsellik kazandırmaya odaklanacağız.

Ön koşul olarak, başlangıç seviyesinde bir React anlayışına sahip olmalısınız; bileşenlerin, propların, useState/useEffect'in ve temel işlev çağırmanın nasıl çalıştığını bilmelisiniz. Bu terimlerden herhangi birini daha önce hiç duymadıysanız, bu [React'e Giriş eğitimine](https://react.dev/learn/tutorial-tic-tac-toe) göz atmak isteyebilirsiniz. Daha görsel öğrenenler için, Net Ninja'nın bu mükemmel [Tam Modern React Eğitimi](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) video serisini şiddetle tavsiye ediyoruz.

Ve eğer henüz yapmadıysanız, bu eğitimi tamamlamak ve Blokzincir üzerinde herhangi bir şey oluşturmak için kesinlikle bir Alchemy hesabına ihtiyacınız olacak. [Buradan](https://alchemy.com/) ücretsiz bir hesap için kaydolun.

Daha fazla uzatmadan başlayalım!

## NFT Yapımı 101 {#making-nfts-101}

Herhangi bir koda bakmaya başlamadan önce, bir NFT yapmanın nasıl çalıştığını anlamak önemlidir. İki adımı içerir:

### Ethereum blokzincirinde bir NFT akıllı sözleşmesi yayınlamak {#publish-nft}

İki NFT akıllı sözleşme standardı arasındaki en büyük fark, ERC-1155'in çoklu token standardı olması ve toplu işlem işlevselliği içermesi, ERC-721'in ise tek token standardı olması ve bu nedenle aynı anda yalnızca bir token transferini desteklemesidir.

### Basım işlevini çağırmak {#minting-function}

Genellikle, bu basım işlevi parametre olarak iki değişken geçirmenizi gerektirir; birincisi, yeni basılan NFT'nizi alacak adresi belirten `recipient` ve ikincisi, NFT'nin meta verilerini açıklayan bir JSON belgesine çözümlenen bir dize olan NFT'nin `tokenURI` değişkenidir.

Bir NFT'nin meta verisi, ona isim, açıklama, resim (veya farklı bir dijital varlık) ve diğer nitelikler gibi özelliklere sahip olmasını sağlayarak onu gerçekten hayata geçiren şeydir. İşte bir NFT'nin meta verilerini içeren [bir tokenURI örneği](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2).

Bu eğitimde, React kullanıcı arayüzümüzü kullanarak mevcut bir NFT'nin akıllı sözleşme basım işlevini çağırmak olan 2. bölüme odaklanacağız.

Bu eğitimde çağıracağımız ERC-721 NFT akıllı sözleşmesine [buradan ulaşabilirsiniz](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE). Nasıl yaptığımızı öğrenmek isterseniz, diğer eğitimimiz olan ["Nasıl NFT Oluşturulur"](https://www.alchemy.com/docs/how-to-create-an-nft) eğitimine göz atmanızı şiddetle tavsiye ederiz.

Harika, artık bir NFT yapmanın nasıl çalıştığını anladığımıza göre, başlangıç dosyalarımızı klonlayalım!

## Başlangıç dosyalarını klonlayın {#clone-the-starter-files}

İlk olarak, bu proje için başlangıç dosyalarını almak üzere [nft-minter-tutorial GitHub deposuna](https://github.com/alchemyplatform/nft-minter-tutorial) gidin. Bu depoyu yerel ortamınıza klonlayın.

Bu klonlanmış `nft-minter-tutorial` deposunu açtığınızda, iki klasör içerdiğini fark edeceksiniz: `minter-starter-files` ve `nft-minter`.

- `minter-starter-files`, bu proje için başlangıç dosyalarını (temelde React kullanıcı arayüzü) içerir. Bu eğitimde, bu kullanıcı arayüzünü Ethereum cüzdanınıza ve bir NFT akıllı sözleşmesine bağlayarak nasıl hayata geçireceğinizi öğrenirken **bu dizinde çalışacağız**.
- `nft-minter`, tamamlanmış eğitimin tamamını içerir ve **takılırsanız** bir **referans** olarak sizin için oradadır.

Ardından, kod düzenleyicinizde `minter-starter-files` kopyanızı açın ve ardından `src` klasörünüze gidin.

Yazacağımız tüm kodlar `src` klasörü altında yer alacaktır. Projemize Web3 işlevselliği kazandırmak için `Minter.js` bileşenini düzenleyecek ve ek javascript dosyaları yazacağız.

## 2. Adım: Başlangıç dosyalarımızı inceleyin {#step-2-check-out-our-starter-files}

Kodlamaya başlamadan önce, başlangıç dosyalarında bizim için nelerin sağlandığını kontrol etmek önemlidir.

### React projenizi çalıştırın {#get-your-react-project-running}

React projesini tarayıcımızda çalıştırarak başlayalım. React'in güzelliği, projemizi tarayıcımızda çalıştırdıktan sonra, kaydettiğimiz tüm değişikliklerin tarayıcımızda canlı olarak güncellenmesidir.

Projeyi çalıştırmak için `minter-starter-files` klasörünün kök dizinine gidin ve projenin bağımlılıklarını yüklemek için terminalinizde `npm install` komutunu çalıştırın:

```bash
cd minter-starter-files
npm install
```

Bunların yüklenmesi bittiğinde, terminalinizde `npm start` komutunu çalıştırın:

```bash
npm start
```

Bunu yapmak, tarayıcınızda projemizin ön yüzünü göreceğiniz http://localhost:3000/ adresini açmalıdır. 3 alandan oluşmalıdır: NFT'nizin varlığına bir bağlantı girmek için bir yer, NFT'nizin adını girmek ve bir açıklama sağlamak.

"Connect Wallet" (Cüzdanı Bağla) veya "Mint NFT" (NFT Bas) düğmelerine tıklamayı denerseniz, çalışmadıklarını fark edeceksiniz; bunun nedeni hala işlevlerini programlamamız gerekmesidir! :\)

### Minter.js bileşeni {#minter-js}

**NOT:** `nft-minter` klasöründe değil, `minter-starter-files` klasöründe olduğunuzdan emin olun!

Düzenleyicimizde `src` klasörüne geri dönelim ve `Minter.js` dosyasını açalım. Üzerinde çalışacağımız birincil React bileşeni olduğu için bu dosyadaki her şeyi anlamamız çok önemlidir.

Bu dosyamızın en üstünde, belirli olaylardan sonra güncelleyeceğimiz durum değişkenlerimiz var.

```javascript
//Durum değişkenleri
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

React durum değişkenlerini veya durum kancalarını (state hooks) hiç duymadınız mı? [Bu](https://legacy.reactjs.org/docs/hooks-state.html) belgelere göz atın.

İşte değişkenlerin her birinin temsil ettiği şeyler:

- `walletAddress` - kullanıcının cüzdan adresini saklayan bir dize
- `status` - kullanıcı arayüzünün altında görüntülenecek bir mesaj içeren bir dize
- `name` - NFT'nin adını saklayan bir dize
- `description` - NFT'nin açıklamasını saklayan bir dize
- `url` - NFT'nin dijital varlığına giden bir bağlantı olan bir dize

Durum değişkenlerinden sonra, uygulanmamış üç işlev göreceksiniz: `useEffect`, `connectWalletPressed` ve `onMintPressed`. Bu işlevlerin hepsinin `async` olduğunu fark edeceksiniz, bunun nedeni içlerinde asenkron API çağrıları yapacak olmamızdır! İsimleri işlevleriyle aynıdır:

```javascript
useEffect(async () => {
  //TODO: uygula
}, [])

const connectWalletPressed = async () => {
  //TODO: uygula
}

const onMintPressed = async () => {
  //TODO: uygula
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - bu, bileşeniniz oluşturulduktan sonra çağrılan bir React kancasıdır. İçine boş bir dizi `[]` prop'u geçirildiği için (bkz. satır 3), yalnızca bileşenin _ilk_ oluşturulmasında çağrılacaktır. Burada, bir cüzdanın zaten bağlı olup olmadığını yansıtacak şekilde kullanıcı arayüzümüzü güncellemek için cüzdan dinleyicimizi ve başka bir cüzdan işlevini çağıracağız.
- `connectWalletPressed` - bu işlev, kullanıcının MetaMask cüzdanını dapp'imize bağlamak için çağrılacaktır.
- `onMintPressed` - bu işlev, kullanıcının NFT'sini basmak için çağrılacaktır.

Bu dosyanın sonuna doğru, bileşenimizin kullanıcı arayüzü var. Bu kodu dikkatlice incelerseniz, ilgili metin alanlarındaki girdi değiştiğinde `url`, `name` ve `description` durum değişkenlerimizi güncellediğimizi fark edeceksiniz.

Ayrıca, sırasıyla `mintButton` ve `walletButton` kimliklerine sahip düğmelere tıklandığında `connectWalletPressed` ve `onMintPressed` işlevlerinin çağrıldığını göreceksiniz.

```javascript
//bileşenimizin kullanıcı arayüzü
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
    <p>
      Simply add your asset's link, name, and description, then press "Mint."
    </p>
    <form>
      <h2>🖼 Link to asset: </h2>
      <input
        type="text"
        placeholder="e.g., https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Name: </h2>
      <input
        type="text"
        placeholder="e.g., My first NFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Description: </h2>
      <input
        type="text"
        placeholder="e.g., Even cooler than cryptokitties ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      Mint NFT
    </button>
    <p id="status">{status}</p>
 
</div>
)
```

Son olarak, bu Minter bileşeninin nereye eklendiğini ele alalım.

React'te diğer tüm bileşenler için bir kapsayıcı görevi gören ana bileşen olan `App.js` dosyasına giderseniz, Minter bileşenimizin 7. satırda enjekte edildiğini göreceksiniz.

**Bu eğitimde, yalnızca `Minter.js file` dosyasını düzenleyecek ve `src` klasörümüze dosyalar ekleyeceğiz.**

Artık neyle çalıştığımızı anladığımıza göre, Ethereum cüzdanımızı kuralım!

## Ethereum cüzdanınızı kurun {#set-up-your-ethereum-wallet}

Kullanıcıların akıllı sözleşmenizle etkileşime girebilmesi için Ethereum cüzdanlarını dapp'inize bağlamaları gerekecektir.

### MetaMask'ı İndirin {#download-metamask}

Bu eğitim için, Ethereum hesap adresinizi yönetmek için kullanılan tarayıcıdaki sanal bir cüzdan olan MetaMask'ı kullanacağız. Ethereum'daki işlemlerin nasıl çalıştığı hakkında daha fazla bilgi edinmek istiyorsanız, [bu sayfaya](/developers/docs/transactions/) göz atın.

[Buradan](https://metamask.io/download) ücretsiz olarak MetaMask'ı indirebilir ve bir hesap oluşturabilirsiniz. Bir hesap oluştururken veya zaten bir hesabınız varsa, sağ üstteki “Ropsten Test Network” (Ropsten Test Ağı) seçeneğine geçtiğinizden emin olun \(böylece gerçek parayla uğraşmamış oluruz\).

### Bir Musluktan (Faucet) Ether Ekleyin {#add-ether-from-faucet}

NFT'lerimizi basmak (veya Ethereum blokzincirindeki herhangi bir işlemi imzalamak) için biraz sahte Eth'ye ihtiyacımız olacak. Eth almak için [Ropsten musluğuna](https://faucet.ropsten.be/) gidebilir ve Ropsten hesap adresinizi girebilir, ardından “Send Ropsten Eth” (Ropsten Eth Gönder) düğmesine tıklayabilirsiniz. Kısa bir süre sonra MetaMask hesabınızda Eth görmelisiniz!

### Bakiyenizi kontrol edin {#check-your-balance}

Bakiyemizin orada olduğunu iki kez kontrol etmek için, [Alchemy'nin oluşturucu aracını](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) kullanarak bir [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) isteği yapalım. Bu, cüzdanımızdaki Eth miktarını döndürecektir. MetaMask hesap adresinizi girip “Send Request” (İstek Gönder) düğmesine tıkladıktan sonra, şöyle bir yanıt görmelisiniz:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**NOT:** Bu sonuç eth değil Wei cinsindendir. Wei, ether'in en küçük birimi olarak kullanılır. Wei'den eth'ye dönüşüm şöyledir: 1 eth = 10¹⁸ Wei. Yani 0xde0b6b3a7640000 değerini ondalık sayıya çevirirsek 1\*10¹⁸ elde ederiz, bu da 1 eth'ye eşittir.

Oh be! Sahte paramızın hepsi orada! <Emoji text=":money_mouth_face:" size={1} />

## MetaMask'ı Kullanıcı Arayüzünüze Bağlayın {#connect-metamask-to-your-ui}

Artık MetaMask cüzdanımız kurulduğuna göre, dapp'imizi ona bağlayalım!

[MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) paradigmasına uymak istediğimizden, dapp'imizin mantığını, verilerini ve kurallarını yönetecek işlevlerimizi içeren ayrı bir dosya oluşturacağız ve ardından bu işlevleri ön yüzümüze (Minter.js bileşenimize) aktaracağız.

### `connectWallet` işlevi {#connect-wallet-function}

Bunu yapmak için, `src` dizininizde `utils` adında yeni bir klasör oluşturalım ve içine tüm cüzdan ve akıllı sözleşme etkileşim işlevlerimizi içerecek olan `interact.js` adında bir dosya ekleyelim.

`interact.js` dosyamızda, daha sonra `Minter.js` bileşenimize içe aktarıp çağıracağımız bir `connectWallet` işlevi yazacağız.

`interact.js` dosyanıza aşağıdakileri ekleyin

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Bu kodun ne yaptığını inceleyelim:

İlk olarak, işlevimiz tarayıcınızda `window.ethereum` nesnesinin etkin olup olmadığını kontrol eder.

`window.ethereum`, MetaMask ve diğer cüzdan sağlayıcıları tarafından enjekte edilen ve web sitelerinin kullanıcıların Ethereum hesaplarını talep etmesine olanak tanıyan küresel bir API'dir. Onaylanırsa, kullanıcının bağlı olduğu blokzincirlerden veri okuyabilir ve kullanıcının mesajları ve işlemleri imzalamasını önerebilir. Daha fazla bilgi için [MetaMask belgelerine](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) göz atın!

Eğer `window.ethereum` mevcut _değilse_, bu MetaMask'ın yüklü olmadığı anlamına gelir. Bu, döndürülen `address` değerinin boş bir dize olduğu ve `status` JSX nesnesinin kullanıcının MetaMask'ı yüklemesi gerektiğini ilettiği bir JSON nesnesinin döndürülmesiyle sonuçlanır.

**Yazdığımız işlevlerin çoğu, durum değişkenlerimizi ve kullanıcı arayüzümüzü güncellemek için kullanabileceğimiz JSON nesneleri döndürecektir.**

Şimdi eğer `window.ethereum` mevcut _ise_, işte o zaman işler ilginçleşir.

Bir try/catch döngüsü kullanarak, [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) çağrısı yaparak MetaMask'a bağlanmaya çalışacağız. Bu işlevi çağırmak, tarayıcıda MetaMask'ı açacak ve kullanıcıdan cüzdanını dapp'inize bağlaması istenecektir.

- Kullanıcı bağlanmayı seçerse, `method: "eth_requestAccounts"`, kullanıcının dapp'e bağlı olan tüm hesap adreslerini içeren bir dizi döndürecektir. Sonuç olarak, `connectWallet` işlevimiz, bu dizideki _ilk_ `address` adresini \(bkz. satır 9\) ve kullanıcıdan akıllı sözleşmeye bir mesaj yazmasını isteyen bir `status` mesajı içeren bir JSON nesnesi döndürecektir.
- Kullanıcı bağlantıyı reddederse, JSON nesnesi döndürülen `address` için boş bir dize ve kullanıcının bağlantıyı reddettiğini yansıtan bir `status` mesajı içerecektir.

### Minter.js Kullanıcı Arayüzü Bileşeninize connectWallet işlevini ekleyin {#add-connect-wallet}

Artık bu `connectWallet` işlevini yazdığımıza göre, onu `Minter.js.` bileşenimize bağlayalım.

İlk olarak, `Minter.js` dosyasının en üstüne `import { connectWallet } from "./utils/interact.js";` ekleyerek işlevimizi `Minter.js` dosyamıza içe aktarmamız gerekecek. `Minter.js` dosyanızın ilk 11 satırı artık şöyle görünmelidir:

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  //Durum değişkenleri
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
```

Ardından, `connectWalletPressed` işlevimizin içinde, içe aktarılan `connectWallet` işlevimizi şu şekilde çağıracağız:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

İşlevselliğimizin çoğunun `interact.js` dosyasından `Minter.js` bileşenimizden nasıl soyutlandığına dikkat ettiniz mi? Bu, M-V-C paradigmasına uymamız içindir!

`connectWalletPressed` içinde, içe aktarılan `connectWallet` işlevimize basitçe bir await çağrısı yaparız ve yanıtını kullanarak `status` ve `walletAddress` değişkenlerimizi durum kancaları aracılığıyla güncelleriz.

Şimdi, hem `Minter.js` hem de `interact.js` dosyalarını kaydedelim ve şimdiye kadarki kullanıcı arayüzümüzü test edelim.

Tarayıcınızı localhost:3000 adresinde açın ve sayfanın sağ üst köşesindeki "Connect Wallet" (Cüzdanı Bağla) düğmesine basın.

MetaMask yüklüyse, cüzdanınızı dapp'inize bağlamanız istenecektir. Bağlanma davetini kabul edin.

Cüzdan düğmesinin artık adresinizin bağlı olduğunu yansıttığını görmelisiniz.

Ardından, sayfayı yenilemeyi deneyin... bu garip. Cüzdan düğmemiz, zaten bağlı olmasına rağmen bizden MetaMask'ı bağlamamızı istiyor...

Yine de endişelenmeyin! Bir adresin dapp'imize zaten bağlı olup olmadığını kontrol edecek ve kullanıcı arayüzümüzü buna göre güncelleyecek olan `getCurrentWalletConnected` adlı bir işlevi uygulayarak bunu kolayca düzeltebiliriz!

### getCurrentWalletConnected işlevi {#get-current-wallet}

`interact.js` dosyanıza aşağıdaki `getCurrentWalletConnected` işlevini ekleyin:

```javascript
export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Bu kod, az önce yazdığımız `connectWallet` işlevine _çok_ benzer.

Temel fark, kullanıcının cüzdanını bağlaması için MetaMask'ı açan `eth_requestAccounts` yöntemini çağırmak yerine, burada basitçe şu anda dapp'imize bağlı olan MetaMask adreslerini içeren bir dizi döndüren `eth_accounts` yöntemini çağırmamızdır.

Bu işlevi çalışırken görmek için, onu `Minter.js` bileşenimizin `useEffect` işlevinde çağıralım.

`connectWallet` için yaptığımız gibi, bu işlevi `interact.js` dosyamızdan `Minter.js` dosyamıza şu şekilde içe aktarmalıyız:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //buraya içe aktar
} from "./utils/interact.js"
```

Şimdi, onu basitçe `useEffect` işlevimizde çağırıyoruz:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

Dikkat edin, `walletAddress` ve `status` durum değişkenlerimizi güncellemek için `getCurrentWalletConnected` çağrımızın yanıtını kullanıyoruz.

Bu kodu ekledikten sonra tarayıcı penceremizi yenilemeyi deneyin. Düğme bağlı olduğunuzu söylemeli ve yeniledikten sonra bile bağlı cüzdanınızın adresinin bir önizlemesini göstermelidir!

### addWalletListener'ı uygulayın {#implement-add-wallet-listener}

Dapp cüzdan kurulumumuzdaki son adım, kullanıcı bağlantıyı kestiğinde veya hesap değiştirdiğinde olduğu gibi cüzdanımızın durumu değiştiğinde kullanıcı arayüzümüzün güncellenmesi için cüzdan dinleyicisini uygulamaktır.

`Minter.js` dosyanıza, aşağıdakine benzeyen bir `addWalletListener` işlevi ekleyin:

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

Burada neler olduğunu hızlıca inceleyelim:

- İlk olarak, işlevimiz `window.ethereum` nesnesinin etkin olup olmadığını \(yani MetaMask'ın yüklü olup olmadığını\) kontrol eder.
  - Değilse, `status` durum değişkenimizi kullanıcıdan MetaMask'ı yüklemesini isteyen bir JSX dizesine ayarlarız.
  - Etkinse, 3. satırda MetaMask cüzdanındaki durum değişikliklerini dinleyen `window.ethereum.on("accountsChanged")` dinleyicisini kurarız; bu değişiklikler kullanıcının dapp'e ek bir hesap bağlamasını, hesap değiştirmesini veya bir hesabın bağlantısını kesmesini içerir. En az bir hesap bağlıysa, `walletAddress` durum değişkeni, dinleyici tarafından döndürülen `accounts` dizisindeki ilk hesap olarak güncellenir. Aksi takdirde, `walletAddress` boş bir dize olarak ayarlanır.

Son olarak, onu `useEffect` işlevimizde çağırmalıyız:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

Ve işte oldu! Tüm cüzdan işlevselliğimizi programlamayı tamamladık! Artık cüzdanımız kurulduğuna göre, NFT'mizi nasıl basacağımızı bulalım!

## NFT Meta Verisi 101 {#nft-metadata-101}

Bu eğitimin 0. Adımında bahsettiğimiz NFT meta verilerini hatırlayın; bir NFT'yi hayata geçirerek dijital varlık, isim, açıklama ve diğer nitelikler gibi özelliklere sahip olmasını sağlar.

Bu meta veriyi bir JSON nesnesi olarak yapılandırmamız ve saklamamız gerekecek, böylece akıllı sözleşmemizin `mintNFT` işlevini çağırırken onu `tokenURI` parametresi olarak geçirebiliriz.

"Link to Asset" (Varlığa Bağlantı), "Name" (İsim), "Description" (Açıklama) alanlarındaki metinler, NFT'mizin meta verilerinin farklı özelliklerini oluşturacaktır. Bu meta veriyi bir JSON nesnesi olarak biçimlendireceğiz, ancak bu JSON nesnesini nerede saklayabileceğimiz konusunda birkaç seçenek var:

- Onu Ethereum blokzincirinde saklayabiliriz; ancak bunu yapmak çok pahalı olacaktır.
- Onu AWS veya Firebase gibi merkezi bir sunucuda saklayabiliriz. Ancak bu, merkeziyetsizlik anlayışımıza ters düşer.
- Dağıtılmış bir dosya sisteminde veri depolamak ve paylaşmak için merkeziyetsiz bir protokol ve eşler arası ağ olan IPFS'yi kullanabiliriz. Bu protokol merkeziyetsiz ve ücretsiz olduğu için en iyi seçeneğimizdir!

Meta verilerimizi IPFS'de saklamak için kullanışlı bir IPFS API'si ve araç seti olan [Pinata](https://pinata.cloud/)'yı kullanacağız. Bir sonraki adımda, bunu tam olarak nasıl yapacağımızı açıklayacağız!

## Meta verilerinizi IPFS'ye sabitlemek için Pinata'yı kullanın {#use-pinata-to-pin-your-metadata-to-ipfs}

Bir [Pinata](https://pinata.cloud/) hesabınız yoksa, [buradan](https://app.pinata.cloud/auth/signup) ücretsiz bir hesap için kaydolun ve e-postanızı ve hesabınızı doğrulamak için adımları tamamlayın.

### Pinata API anahtarınızı oluşturun {#create-pinata-api-key}

[https://pinata.cloud/keys](https://pinata.cloud/keys) sayfasına gidin, ardından üstteki "New Key" (Yeni Anahtar) düğmesini seçin, Admin (Yönetici) aracını etkin olarak ayarlayın ve anahtarınızı adlandırın.

Daha sonra API bilgilerinizi içeren bir açılır pencere gösterilecektir. Bunu güvenli bir yere koyduğunuzdan emin olun.

Artık anahtarımız ayarlandığına göre, kullanabilmemiz için onu projemize ekleyelim.

### Bir .env dosyası oluşturun {#create-a-env}

Pinata anahtarımızı ve gizli anahtarımızı bir ortam dosyasında güvenle saklayabiliriz. Proje dizininize [dotenv paketini](https://www.npmjs.com/package/dotenv) kuralım.

Terminalinizde \(yerel ana bilgisayarı çalıştıran sekmeden ayrı olarak\) yeni bir sekme açın ve `minter-starter-files` klasöründe olduğunuzdan emin olun, ardından terminalinizde aşağıdaki komutu çalıştırın:

```text
npm install dotenv --save
```

Ardından, komut satırınıza aşağıdakileri girerek `minter-starter-files` klasörünüzün kök dizininde bir `.env` dosyası oluşturun:

```javascript
vim.env
```

Bu, `.env` dosyanızı vim'de \(bir metin düzenleyici\) açacaktır. Kaydetmek için klavyenizde sırasıyla "esc" + ":" + "q" tuşlarına basın.

Ardından, VSCode'da `.env` dosyanıza gidin ve Pinata API anahtarınızı ve API gizli anahtarınızı şu şekilde ekleyin:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

Dosyayı kaydedin ve ardından JSON meta verilerinizi IPFS'ye yüklemek için işlevi yazmaya başlamaya hazırsınız!

### pinJSONToIPFS'yi uygulayın {#pin-json-to-ipfs}

Neyse ki bizim için Pinata'nın [JSON verilerini IPFS'ye yüklemek için özel bir API'si](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) ve bazı küçük değişikliklerle kullanabileceğimiz axios içeren kullanışlı bir JavaScript örneği var.

`utils` klasörünüzde, `pinata.js` adında başka bir dosya oluşturalım ve ardından Pinata gizli anahtarımızı ve anahtarımızı .env dosyasından şu şekilde içe aktaralım:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

Ardından, aşağıdaki ek kodu `pinata.js` dosyanıza yapıştırın. Endişelenmeyin, her şeyin ne anlama geldiğini açıklayacağız!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //Pinata'ya axios POST isteği yapılıyor ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      }
    })
    .catch(function (error) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }
    })
}
```

Peki bu kod tam olarak ne yapıyor?

İlk olarak, Pinata'ya bir istekte bulunmak için kullanacağımız, tarayıcı ve node.js için promise tabanlı bir HTTP istemcisi olan [axios](https://www.npmjs.com/package/axios)'u içe aktarır.

Ardından, `pinJSONToIPFS` API'lerine bir POST isteği yapmak için girdi olarak bir `JSONBody` ve başlığında Pinata api anahtarı ile gizli anahtarını alan asenkron `pinJSONToIPFS` işlevimiz var.

- Bu POST isteği başarılı olursa, işlevimiz `success` boolean değeri true olan ve meta verilerimizin sabitlendiği `pinataUrl` değerini içeren bir JSON nesnesi döndürür. Döndürülen bu `pinataUrl` değerini akıllı sözleşmemizin basım işlevine `tokenURI` girdisi olarak kullanacağız.
- Bu post isteği başarısız olursa, işlevimiz `success` boolean değeri false olan ve hatamızı ileten bir `message` dizesi içeren bir JSON nesnesi döndürür.

`connectWallet` işlevi dönüş türlerimizde olduğu gibi, parametrelerini durum değişkenlerimizi ve kullanıcı arayüzümüzü güncellemek için kullanabilmemiz amacıyla JSON nesneleri döndürüyoruz.

## Akıllı sözleşmenizi yükleyin {#load-your-smart-contract}

Artık `pinJSONToIPFS` işlevimiz aracılığıyla NFT meta verilerimizi IPFS'ye yüklemenin bir yoluna sahip olduğumuza göre, `mintNFT` işlevini çağırabilmemiz için akıllı sözleşmemizin bir örneğini yüklemenin bir yoluna ihtiyacımız olacak.

Daha önce de belirttiğimiz gibi, bu eğitimde [bu mevcut NFT akıllı sözleşmesini](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) kullanacağız; ancak, onu nasıl yaptığımızı öğrenmek veya kendiniz bir tane yapmak isterseniz, diğer eğitimimiz olan ["Nasıl NFT Oluşturulur"](https://www.alchemy.com/docs/how-to-create-an-nft) eğitimine göz atmanızı şiddetle tavsiye ederiz.

### Sözleşme ABI'si {#contract-abi}

Dosyalarımızı yakından incelediyseniz, `src` dizinimizde bir `contract-abi.json` dosyası olduğunu fark etmişsinizdir. Bir ABI, bir sözleşmenin hangi işlevi çağıracağını belirlemenin yanı sıra işlevin verileri beklediğiniz biçimde döndürmesini sağlamak için gereklidir.

Ayrıca Ethereum blokzincirine bağlanmak ve akıllı sözleşmemizi yüklemek için bir Alchemy API anahtarına ve Alchemy Web3 API'sine ihtiyacımız olacak.

### Alchemy API anahtarınızı oluşturun {#create-alchemy-api}

Henüz bir Alchemy hesabınız yoksa, [buradan ücretsiz kaydolun.](https://alchemy.com/?a=eth-org-nft-minter)

Bir Alchemy hesabı oluşturduktan sonra, bir uygulama oluşturarak bir API anahtarı üretebilirsiniz. Bu, Ropsten test ağına istekte bulunmamızı sağlayacaktır.

Gezinme çubuğundaki “Apps” (Uygulamalar) üzerine gelip “Create App” (Uygulama Oluştur) seçeneğine tıklayarak Alchemy Kontrol Panelinizdeki “Create App” sayfasına gidin.

Uygulamanızı adlandırın (biz "My First NFT!" seçtik), kısa bir açıklama sunun, uygulamanızın defter tutma işlemi için kullanılan Ortam (Environment) için “Staging”i seçin ve ağınız için “Ropsten”i seçin.

“Create app” (Uygulama oluştur) düğmesine tıklayın ve işte bu kadar! Uygulamanız aşağıdaki tabloda görünmelidir.

Harika, artık HTTP Alchemy API URL'mizi oluşturduğumuza göre, onu panonuza kopyalayın...

…ve ardından onu `.env` dosyamıza ekleyelim. Sonuç olarak, .env dosyanız şöyle görünmelidir:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

Artık sözleşme ABI'mize ve Alchemy API anahtarımıza sahip olduğumuza göre, [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) kullanarak akıllı sözleşmemizi yüklemeye hazırız.

### Alchemy Web3 uç noktanızı ve sözleşmenizi kurun {#setup-alchemy-endpoint}

İlk olarak, eğer henüz sahip değilseniz, terminalde ana dizine: `nft-minter-tutorial` giderek [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)'ü kurmanız gerekecektir:

```text
cd ..
npm install @alch/alchemy-web3
```

Ardından `interact.js` dosyamıza geri dönelim. Dosyanın en üstüne, Alchemy anahtarınızı .env dosyanızdan içe aktarmak ve Alchemy Web3 uç noktanızı kurmak için aşağıdaki kodu ekleyin:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3), bir web3 geliştiricisi olarak hayatınızı kolaylaştırmak için gelişmiş API yöntemleri ve diğer önemli avantajlar sağlayan [Web3.js](https://docs.web3js.org/) etrafında bir sarmalayıcıdır. Uygulamanızda hemen kullanmaya başlayabilmeniz için minimum yapılandırma gerektirecek şekilde tasarlanmıştır!

Ardından, sözleşme ABI'mizi ve sözleşme adresimizi dosyamıza ekleyelim.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

Bunların her ikisine de sahip olduğumuzda, basım işlevimizi kodlamaya başlamaya hazırız!

## mintNFT işlevini uygulayın {#implement-the-mintnft-function}

`interact.js` dosyanızın içinde, adından da anlaşılacağı gibi NFT'mizi basacak olan `mintNFT` işlevimizi tanımlayalım.

Çok sayıda asenkron çağrı yapacağımız için \(meta verilerimizi IPFS'ye sabitlemek için Pinata'ya, akıllı sözleşmemizi yüklemek için Alchemy Web3'e ve işlemlerimizi imzalamak için MetaMask'a\), işlevimiz de asenkron olacaktır.

İşlevimize üç girdi, dijital varlığımızın `url` değeri, `name` ve `description` olacaktır. `connectWallet` işlevinin altına aşağıdaki işlev imzasını ekleyin:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### Girdi hatası işleme {#input-error-handling}

Doğal olarak, işlevin başlangıcında bir tür girdi hatası işlemeye sahip olmak mantıklıdır, böylece girdi parametrelerimiz doğru değilse bu işlevden çıkarız. İşlevimizin içine aşağıdaki kodu ekleyelim:

```javascript
export const mintNFT = async (url, name, description) => {
  //hata yönetimi
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }
}
```

Temel olarak, girdi parametrelerinden herhangi biri boş bir dizeyse, `success` boolean değerinin false olduğu ve `status` dizesinin kullanıcı arayüzümüzdeki tüm alanların eksiksiz olması gerektiğini ilettiği bir JSON nesnesi döndürürüz.

### Meta verileri IPFS'ye yükleyin {#upload-metadata-to-ipfs}

Meta verilerimizin düzgün biçimlendirildiğini bildiğimizde, bir sonraki adım onu bir JSON nesnesine sarmak ve yazdığımız `pinJSONToIPFS` aracılığıyla IPFS'ye yüklemektir!

Bunu yapmak için, önce `pinJSONToIPFS` işlevini `interact.js` dosyamıza içe aktarmamız gerekir. `interact.js` dosyasının en üstüne şunu ekleyelim:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

`pinJSONToIPFS` işlevinin bir JSON gövdesi aldığını hatırlayın. Bu yüzden ona bir çağrı yapmadan önce, `url`, `name` ve `description` parametrelerimizi bir JSON nesnesi olarak biçimlendirmemiz gerekecek.

`metadata` adında bir JSON nesnesi oluşturmak için kodumuzu güncelleyelim ve ardından bu `metadata` parametresiyle `pinJSONToIPFS` işlevine bir çağrı yapalım:

```javascript
export const mintNFT = async (url, name, description) => {
  //hata yönetimi
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //meta veri oluştur
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //Pinata çağrısı yap
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

Dikkat edin, `pinJSONToIPFS(metadata)` çağrımızın yanıtını `pinataResponse` nesnesinde saklıyoruz. Ardından, bu nesneyi herhangi bir hata için ayrıştırıyoruz.

Bir hata varsa, `success` boolean değerinin false olduğu ve `status` dizemizin çağrımızın başarısız olduğunu ilettiği bir JSON nesnesi döndürürüz. Aksi takdirde, `pinataURL` değerini `pinataResponse` nesnesinden çıkarır ve `tokenURI` değişkenimiz olarak saklarız.

Şimdi dosyamızın en üstünde başlattığımız Alchemy Web3 API'sini kullanarak akıllı sözleşmemizi yükleme zamanı. Sözleşmeyi `window.contract` küresel değişkeninde ayarlamak için `mintNFT` işlevinin altına aşağıdaki kod satırını ekleyin:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

`mintNFT` işlevimize eklenecek son şey Ethereum işlemimizdir:

```javascript
//Ethereum işleminizi ayarlayın
const transactionParameters = {
  to: contractAddress, // Sözleşme yayınları dışında gereklidir.
  from: window.ethereum.selectedAddress, // kullanıcının aktif adresiyle eşleşmelidir.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //NFT akıllı sözleşmesine çağrı yap
}

//işlemi MetaMask aracılığıyla imzala
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 Something went wrong: " + error.message,
  }
}
```

Ethereum işlemlerine zaten aşinaysanız, yapının gördüklerinize oldukça benzer olduğunu fark edeceksiniz.

- İlk olarak, işlem parametrelerimizi ayarlıyoruz.
  - `to` alıcı adresini \(akıllı sözleşmemizi\) belirtir
  - `from` işlemin imzalayıcısını \(kullanıcının MetaMask'a bağlı adresi: `window.ethereum.selectedAddress`\) belirtir
  - `data`, `tokenURI` değerimizi ve kullanıcının cüzdan adresi olan `window.ethereum.selectedAddress` değerini girdi olarak alan akıllı sözleşme `mintNFT` yöntemimize yapılan çağrıyı içerir
- Ardından, MetaMask'tan işlemi imzalamasını istediğimiz bir await çağrısı olan `window.ethereum.request,` yaparız. Dikkat edin, bu istekte eth yöntemimizi \(eth_SentTransaction\) belirtiyor ve `transactionParameters` parametremizi geçiriyoruz. Bu noktada, MetaMask tarayıcıda açılacak ve kullanıcıdan işlemi imzalamasını veya reddetmesini isteyecektir.
  - İşlem başarılı olursa, işlev `success` boolean değerinin true olarak ayarlandığı ve `status` dizesinin kullanıcıdan işlemi hakkında daha fazla bilgi için Etherscan'i kontrol etmesini istediği bir JSON nesnesi döndürecektir.
  - İşlem başarısız olursa, işlev `success` boolean değerinin false olarak ayarlandığı ve `status` dizesinin hata mesajını ilettiği bir JSON nesnesi döndürecektir.

Sonuç olarak, `mintNFT` işlevimiz şöyle görünmelidir:

```javascript
export const mintNFT = async (url, name, description) => {
  //hata yönetimi
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //meta veri oluştur
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //Pinata sabitleme isteği
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //akıllı sözleşmeyi yükle
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //Ethereum işleminizi ayarlayın
  const transactionParameters = {
    to: contractAddress, // Sözleşme yayınları dışında gereklidir.
    from: window.ethereum.selectedAddress, // kullanıcının aktif adresiyle eşleşmelidir.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //NFT akıllı sözleşmesine çağrı yap
  }

  //işlemi MetaMask aracılığıyla imzala
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
}
```

Bu devasa bir işlev! Şimdi, sadece `mintNFT` işlevimizi `Minter.js` bileşenimize bağlamamız gerekiyor...

## mintNFT'yi Minter.js ön yüzümüze bağlayın {#connect-our-frontend}

`Minter.js` dosyanızı açın ve en üstteki `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` satırını şu şekilde güncelleyin:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

Son olarak, içe aktarılan `mintNFT` işlevinize await çağrısı yapmak için `onMintPressed` işlevini uygulayın ve işlemimizin başarılı olup olmadığını yansıtacak şekilde `status` durum değişkenini güncelleyin:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## NFT'nizi canlı bir web sitesine dağıtın {#deploy-your-nft}

Kullanıcıların etkileşime girmesi için projenizi canlıya almaya hazır mısınız? Minter'ınızı canlı bir web sitesine dağıtmak için [bu eğitime](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online) göz atın.

Son bir adım...

## Blokzincir dünyasını kasıp kavurun {#take-the-blockchain-world-by-storm}

Şaka yapıyorum, eğitimin sonuna geldiniz!

Özetlemek gerekirse, bir NFT basım aracı oluşturarak şunları başarıyla öğrendiniz:

- Ön yüz projeniz aracılığıyla MetaMask'a bağlanmak
- Ön yüzünüzden akıllı sözleşme yöntemlerini çağırmak
- MetaMask kullanarak işlemleri imzalamak

Muhtemelen, dapp'iniz aracılığıyla basılan NFT'leri cüzdanınızda sergilemek istersiniz; bu nedenle [Cüzdanınızda NFT'nizi Nasıl Görüntülersiniz](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet) adlı hızlı eğitimimize göz atmayı unutmayın!

Ve her zaman olduğu gibi, herhangi bir sorunuz varsa, [Alchemy Discord](https://discord.gg/gWuC7zB)'unda yardımcı olmak için buradayız. Bu eğitimdeki kavramları gelecekteki projelerinize nasıl uygulayacağınızı görmek için sabırsızlanıyoruz!