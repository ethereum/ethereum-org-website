---
title: "NFT Minter Öğreticisi"
description: "Bu eğitimde, bir NFT minter oluşturacak ve akıllı sözleşmenizi MetaMask ve Web3 araçlarını kullanarak bir React ön ucuna bağlayarak tam yığınlı bir merkeziyetsiz uygulama oluşturmayı öğreneceksiniz."
author: "smudgil"
tags:
  [
    "solidity",
    "NFT",
    "alchemy",
    "akıllı kontratlar",
    "ön uç",
    "Pinata"
  ]
skill: intermediate
breadcrumb: "NFT minter dapp"
lang: tr
published: 2021-10-06
---

Web2 arka planından gelen geliştiriciler için en büyük zorluklardan biri, akıllı bağlantınızı bir ön uç projesine nasıl bağlayacağınızı ve onunla nasıl etkileşimde bulunacağınızı anlamaktır.

Dijital varlığınıza bir bağlantı, bir başlık ve bir açıklama girebileceğiniz basit bir kullanıcı arayüzü olan bir NFT minter oluşturarak şunları nasıl yapacağınızı öğreneceksiniz:

- Ön uç projeniz aracılığıyla MetaMask'a bağlanma
- Ön ucunuzdan akıllı sözleşme yöntemlerini arama
- MetaMask kullanarak işlemleri imzalama

Bu öğreticide, ön uç çerçevemiz olarak [React](https://react.dev/) kullanacağız. Bu eğitim öncelikle Web3 geliştirmeye odaklandığından, React temellerini açıklamak için fazla zaman harcamayacağız. Bunun yerine, projemize işlevsellik getirmeye odaklanacağız.

Bir ön koşul olarak, başlangıç ​​düzeyinde bir React anlayışına sahip olmalısınız; bileşenlerin, donanımların, useState/useEffect ve temel fonksiyon çağırmanın nasıl çalıştığını bilmeniz gerekir. Bu terimlerden herhangi birini daha önce hiç duymadıysanız, bu [React'e Giriş öğreticisine](https://react.dev/learn/tutorial-tic-tac-toe) göz atmak isteyebilirsiniz. Daha çok görsel öğrenenler için Net Ninja'nın bu mükemmel [Tam Modern React Öğreticisi](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) video serisini şiddetle tavsiye ederiz.

Ve henüz yapmadıysanız, bu öğreticiyi tamamlamak ve blok zincirinde herhangi bir şey oluşturmak için kesinlikle bir Alchemy hesabına ihtiyacınız olacak. [Buradan](https://alchemy.com/) ücretsiz bir hesap için kaydolun.

Lafı fazla uzatmadan başlayalım!

## NFT Yapımına Giriş {#making-nfts-101}

Herhangi bir koda bakmaya başlamadan önce, bir NFT yapmanın nasıl çalıştığını anlamak önemlidir. İki adım içerir:

### Ethereum blokzincirinde bir NFT akıllı sözleşmesi yayımlayın {#publish-nft}

İki NFT akıllı iletişim standardı arasındaki en büyük fark, ERC-1155'in çok token'lı bir standart olması ve toplu işlevsellik içermesi; ERC-721'in ise tek token'lı bir standart olması ve bu nedenle bir seferde yalnızca bir token'ın aktarılmasını desteklemesidir.

### Basım fonksiyonunu çağırın {#minting-function}

Genellikle bu basım fonksiyonu, parametre olarak iki değişken iletmenizi gerektirir: birincisi, yeni basılmış NFT'nizi alacak adresi belirten `recipient` ve ikincisi, NFT'nin meta verilerini açıklayan bir JSON belgesine çözümlenen bir dize olan NFT'nin `tokenURI`'sidir.

Bir NFT'nin meta verileri gerçekten onu hayata geçiren şeydir ve bir isim, açıklama, görüntü (veya farklı dijital varlık) ve diğer nitelikler gibi özelliklere sahip olmasına izin verir. İşte bir NFT'nin meta verilerini içeren [bir tokenURI örneği](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2).

Bu öğreticide, React UI'ımızı kullanarak mevcut bir NFT'nin akıllı sözleşme basım fonksiyonunu çağırarak 2. bölüme odaklanacağız.

Bu öğreticide çağıracağımız ERC-721 NFT akıllı sözleşmesinin [bağlantısı buradadır](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE). Bunu nasıl yaptığımızı öğrenmek isterseniz, diğer öğreticimiz olan ["Bir NFT Nasıl Oluşturulur"](https://www.alchemy.com/docs/how-to-create-an-nft) belgesine göz atmanızı önemle tavsiye ederiz.

Harika, şimdi bir NFT yapmanın nasıl çalıştığını anladığımıza göre, başlangıç ​​dosyalarımızı klonlayalım!

## Başlangıç dosyalarını klonlayın {#clone-the-starter-files}

Öncelikle, bu projenin başlangıç dosyalarını almak için [nft-minter-tutorial GitHub deposuna](https://github.com/alchemyplatform/nft-minter-tutorial) gidin. Bu depoyu yerel ortamınıza klonlayın.

Bu klonlanmış `nft-minter-tutorial` deposunu açtığınızda, iki klasör içerdiğini fark edeceksiniz: `minter-starter-files` ve `nft-minter`.

- `minter-starter-files` bu proje için başlangıç dosyalarını (temel olarak React kullanıcı arayüzünü) içerir. Bu öğreticide, bu kullanıcı arayüzünü Ethereum cüzdanınıza ve bir NFT akıllı sözleşmesine bağlayarak nasıl hayata geçireceğinizi öğrenirken **bu dizinde çalışacağız**.
- `nft-minter`, tamamlanmış öğreticinin tamamını içerir ve **takılırsanız referans olması için** oradadır.

Ardından, `minter-starter-files` kopyanızı kod düzenleyicinizde açın ve `src` klasörünüze gidin.

Yazacağımız tüm kodlar `src` klasörünün altında yer alacaktır. Projemize Web3 işlevselliği kazandırmak için `Minter.js` bileşenini düzenleyecek ve ek javascript dosyaları yazacağız.

## Adım 2: Başlangıç dosyalarımıza göz atın {#step-2-check-out-our-starter-files}

Kodlamaya başlamadan önce, başlangıç ​​dosyalarında bizim için nelerin sağlandığını kontrol etmek önemlidir.

### React projenizi çalıştırın {#get-your-react-project-running}

Tarayıcımızda React projesini çalıştırarak başlayalım. React'in güzelliği, projemizi tarayıcımızda çalıştırdıktan sonra, kaydettiğimiz tüm değişikliklerin tarayıcımızda canlı olarak güncellenmesidir.

Projeyi çalıştırmak için `minter-starter-files` klasörünün kök dizinine gidin ve projenin bağımlılıklarını yüklemek için terminalinizde `npm install` komutunu çalıştırın:

```bash
cd minter-starter-files
npm install
```

Bunların kurulumu tamamlandıktan sonra terminalinizde `npm start` komutunu çalıştırın:

```bash
npm start
```

Bunu yapmak, tarayıcınızda projemizin ön ucunu göreceğiniz http://localhost:3000/ adresini açmalıdır. 3 alandan oluşmalıdır: NFT'nizin varlığına bir bağlantı yerleştireceğiniz, NFT'nizin adını gireceğiniz ve bir açıklama sağlayabileceğiniz bir yer.

"Connect Wallet" (Cüzdanı Bağla) veya "Mint NFT" (NFT Bas) düğmelerinE tıklamayı denerseniz, çalışmadıklarını fark edeceksiniz. Çünkü hâlâ işlevlerini kodlamamız gerekiyor! :)

### `Minter.js` bileşeni {#minter-js}

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

React durum değişkenlerini veya durum kancalarını hiç duymadınız mı? [Bu](https://legacy.reactjs.org/docs/hooks-state.html) belgelere göz atın.

Değişkenlerin her birinin temsil ettiği şey:

- `walletAddress` - kullanıcının cüzdan adresini saklayan bir dizedir
- `status` - kullanıcı arayüzünün altında görüntülenecek bir mesaj içeren bir dizedir
- `name` - NFT'nin adını saklayan bir dizedir
- `description` - NFT'nin açıklamasını saklayan bir dizedir
- `url` - NFT'nin dijital varlığına bir bağlantı olan bir dizedir

Durum değişkenlerinden sonra, uygulanmamış üç fonksiyon göreceksiniz: `useEffect`, `connectWalletPressed` ve `onMintPressed`. Tüm bu fonksiyonların `async` olduğunu fark edeceksiniz, çünkü içlerinde eşzamansız API çağrıları yapacağız! Adları, fonksiyonlarıyla aynıdır:

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

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - bu, bileşeniniz oluşturulduktan sonra çağrılan bir React kancasıdır. İçine boş bir `[]` dizisi prop'u aktarıldığı için (bkz. 3. satır), yalnızca bileşenin _ilk_ render işleminde çağrılacaktır. Burada, bir cüzdanın zaten bağlı olup olmadığını yansıtacak şekilde kullanıcı arayüzünü güncellemek için cüzdan dinleyicimizi ve başka bir cüzdan fonksiyonunu çağıracağız.
- `connectWalletPressed` - bu fonksiyon, kullanıcının MetaMask cüzdanını merkeziyetsiz uygulamamıza bağlamak için çağrılacaktır.
- `onMintPressed` - bu fonksiyon, kullanıcının NFT'sini basmak için çağrılacaktır.

Bu dosyanın sonuna doğru, bileşenimizin kullanıcı arayüzü bulunuyor. Bu kodu dikkatlice incelerseniz, ilgili metin alanlarındaki girdi değiştiğinde `url`, `name` ve `description` durum değişkenlerimizi güncellediğimizi fark edeceksiniz.

Ayrıca, sırasıyla `mintButton` ve `walletButton` kimlikli düğmelere tıklandığında `connectWalletPressed` ve `onMintPressed` fonksiyonlarının çağrıldığını göreceksiniz.

```javascript
//bileşenimizin kullanıcı arayüzü
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Bağlandı: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Cüzdanı Bağla</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Alchemy NFT Basıcısı</h1>
    <p>
      Varlığınızın bağlantısını, adını ve açıklamasını ekleyin, ardından "Bas" düğmesine basın.
    </p>
    <form>
      <h2>🖼 Varlık bağlantısı: </h2>
      <input
        type="text"
        placeholder="örn. https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Ad: </h2>
      <input
        type="text"
        placeholder="örn. İlk NFT'm!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Açıklama: </h2>
      <input
        type="text"
        placeholder="örn. Cryptokitties'den bile daha havalı ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      NFT Bas
    </button>
    <p id="status">{status}</p>
</div>
)
```

Son olarak bu Minter bileşeninin nereye eklendiğine değinelim.

`App.js` dosyasına giderseniz, ki bu dosya React'te diğer tüm bileşenler için bir kapsayıcı görevi gören ana bileşendir, Minter bileşenimizin 7. satıra eklendiğini görürsünüz.

**Bu öğreticide, yalnızca `Minter.js` dosyasını düzenleyecek ve `src` klasörümüze dosyalar ekleyeceğiz.**

Artık ne üzerinde çalıştığımızı anladığımıza göre, Ethereum cüzdanımızı oluşturalım!

## Ethereum cüzdanınızı kurun {#set-up-your-ethereum-wallet}

Kullanıcıların akıllı sözleşmenizle etkileşime girebilmeleri için Ethereum cüzdanlarını merkeziyetsiz uygulamanıza bağlamaları gerekir.

### MetaMask'ı indirin {#download-metamask}

Bu öğretici için, Ethereum hesap adresinizi yönetmek için kullanılan tarayıcıda sanal bir cüzdan olan MetaMask'ı kullanacağız. Ethereum'daki işlemlerin nasıl çalıştığı hakkında daha fazla bilgi edinmek isterseniz, [bu sayfaya](/developers/docs/transactions/) göz atın.

MetaMask'ı [buradan](https://metamask.io/download) ücretsiz indirip bir hesap oluşturabilirsiniz. Bir hesap oluşturuyorsanız veya zaten bir hesabınız varsa, sağ üstteki "Ropsten Test Ağı"na geçtiğinizden emin olun \(böylece gerçek parayla uğraşmayız\).

### Musluktan ether ekleyin {#add-ether-from-faucet}

NFT'lerimizi basmak (veya Ethereum blok zincirindeki herhangi bir işlemi imzalamak) için biraz sahte Eth'e ihtiyacımız olacak. Eth almak için [Ropsten musluğuna](https://faucet.ropsten.be/) gidip Ropsten hesap adresinizi girebilir, ardından “Send Ropsten Eth” (Ropsten Eth Gönder) düğmesine tıklayabilirsiniz. Kısa bir süre sonra MetaMask hesabınızda Eth'i görmelisiniz!

### Bakiyenizi kontrol edin {#check-your-balance}

Bakiyemizin orada olup olmadığını iki kez kontrol etmek için [Alchemy’nin composer aracını](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) kullanarak bir [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) isteği yapalım. Bu, cüzdanımızdaki Eth miktarını döndürür. MetaMask hesap adresinizi girdikten ve "Send Request"e tıkladıktan sonra aşağıdaki gibi bir yanıt görmelisiniz:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**NOT:** Bu sonuç eth cinsinden değil wei cinsindendir. Wei, ether'ın en küçük birimi olarak kullanılır. Wei'den eth'e dönüşüm: 1 eth = 10¹⁸ wei. Yani 0xde0b6b3a7640000'ı ondalık sayıya dönüştürürsek 1\*10¹⁸ elde ederiz, bu da 1 eth'e eşittir.

Vay be! Tüm sahte paramız yerinde! <Emoji text=":money_mouth_face:" size={1} />

## MetaMask'ı kullanıcı arayüzünüze bağlayın {#connect-metamask-to-your-UI}

Artık MetaMask cüzdanımız kurulduğuna göre, merkeziyetsiz uygulamamızı ona bağlayalım!

[MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) paradigmasına uymak istediğimiz için, merkeziyetsiz uygulamamızın mantığını, verilerini ve kurallarını yöneten fonksiyonlarımızı içeren ayrı bir dosya oluşturacak ve ardından bu fonksiyonları ön uca (Minter.js bileşenimiz) aktaracağız.

### `connectWallet` fonksiyonu {#connect-wallet-function}

Bunu yapmak için `src` dizininizde `utils` adında yeni bir klasör oluşturalım ve içine tüm cüzdan ve akıllı sözleşme etkileşim fonksiyonlarımızı içerecek olan `interact.js` adlı bir dosya ekleyelim.

`interact.js` dosyamızda bir `connectWallet` fonksiyonu yazacağız, bunu daha sonra `Minter.js` bileşenimize aktarıp çağıracağız.

`interact.js` dosyanıza aşağıdakileri ekleyin

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Yukarıdaki metin alanına bir mesaj yazın.",
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
              Tarayıcınıza sanal bir Ethereum cüzdanı olan MetaMask'i yüklemeniz gerekir.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Şimdi bu kodun ne yaptığını inceleyelim:

İlk olarak, fonksiyonumuz tarayıcınızda `window.ethereum`'un etkin olup olmadığını kontrol eder.

`window.ethereum`, MetaMask ve diğer cüzdan sağlayıcıları tarafından eklenen ve web sitelerinin kullanıcıların Ethereum hesaplarını talep etmesine olanak tanıyan küresel bir API'dir. Onaylanırsa, kullanıcının bağlı olduğu blok zincirlerinden verileri okuyabilir ve kullanıcının mesajları ve işlemleri imzalamasını önerebilir. Daha fazla bilgi için [MetaMask belgelerine](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) göz atın!

Eğer `window.ethereum` mevcut _değilse_, bu MetaMask'in kurulu olmadığı anlamına gelir. Bu, döndürülen `address`'in boş bir dize olduğu ve `status` JSX nesnesinin kullanıcının MetaMask'i yüklemesi gerektiğini ilettiği bir JSON nesnesinin döndürülmesiyle sonuçlanır.

**Yazdığımız fonksiyonların çoğu, durum değişkenlerimizi ve kullanıcı arayüzümüzü güncellemek için kullanabileceğimiz JSON nesneleri döndürecektir.**

Eğer `window.ethereum` mevcut _ise_, o zaman işler ilginçleşir.

Bir try/catch döngüsü kullanarak, [`window.ethereum.request({ method: \"eth_requestAccounts\" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) çağrısı yaparak MetaMask'e bağlanmaya çalışacağız. Bu fonksiyonun çağrılması, tarayıcıda MetaMask'i açar ve bu sayede kullanıcıdan cüzdanını merkeziyetsiz uygulamanıza bağlaması istenir.

- Kullanıcı bağlanmayı seçerse `method: \"eth_requestAccounts\"`, kullanıcının merkeziyetsiz uygulamaya bağlı tüm hesap adreslerini içeren bir dizi döndürür. Sonuç olarak, `connectWallet` fonksiyonumuz bu dizideki _ilk_ `address`'i (bkz. satır 9) ve kullanıcıyı akıllı sözleşmeye bir mesaj yazmaya yönlendiren bir `status` mesajını içeren bir JSON nesnesi döndürecektir.
- Kullanıcı bağlantıyı reddederse JSON nesnesi, döndürülen `address` için boş bir dize ve kullanıcının bağlantıyı reddettiğini yansıtan bir `status` mesajı içerir.

### `connectWallet` fonksiyonunu `Minter.js` kullanıcı arayüzü bileşeninize ekleyin {#add-connect-wallet}

Bu `connectWallet` fonksiyonunu yazdığımıza göre, şimdi onu `Minter.js.` bileşenimize bağlayalım.

İlk olarak, `Minter.js` dosyasının en üstüne `import { connectWallet } from \"./utils/interact.js\";` satırını ekleyerek fonksiyonumuzu `Minter.js` dosyamıza aktarmamız gerekecek. `Minter.js` dosyanızın ilk 11 satırı şimdi şöyle görünmelidir:

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

Ardından, `connectWalletPressed` fonksiyonumuzun içinde, içe aktardığımız `connectWallet` fonksiyonunu şu şekilde çağıracağız:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

İşlevselliğimizin çoğunun `interact.js` dosyasından `Minter.js` bileşenimizden nasıl soyutlandığına dikkat edin. Bu, M-V-C paradigmasına uymamız içindir!

`connectWalletPressed` içinde, içe aktarılan `connectWallet` fonksiyonumuza bir `await` çağrısı yaparız ve yanıtını kullanarak `status` ve `walletAddress` değişkenlerimizi durum kancaları aracılığıyla güncelleriz.

Şimdi, `Minter.js` ve `interact.js` dosyalarını kaydedelim ve şimdiye kadarki kullanıcı arayüzümüzü test edelim.

Tarayıcınızı localhost:3000 üzerinde açın ve sayfanın sağ üst köşesindeki "Connect Wallet" düğmesine basın.

MetaMask yüklüyse, cüzdanınızı merkeziyetsiz uygulamanıza bağlamanız istenecektir. Bağlanmak için daveti kabul edin.

Cüzdan düğmesinin artık adresinizin bağlı olduğunu yansıttığını görmelisiniz.

Şimdi, sayfayı yenilemeyi deneyin... bu garip. Cüzdan düğmemiz zaten bağlı olmasına rağmen MetaMask'i bağlamamızı istiyor...

Ama merak etmeyin! Bunu, bir adresin merkeziyetsiz uygulamamıza zaten bağlı olup olmadığını kontrol edecek ve kullanıcı arayüzümüzü buna göre güncelleyecek olan `getCurrentWalletConnected` adlı bir fonksiyonu uygulayarak kolayca düzeltebiliriz!

### `getCurrentWalletConnected` fonksiyonu {#get-current-wallet}

`interact.js` dosyanıza aşağıdaki `getCurrentWalletConnected` fonksiyonunu ekleyin:

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
          status: "👆🏽 Yukarıdaki metin alanına bir mesaj yazın.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Sağ üstteki düğmeyi kullanarak MetaMask'e bağlanın.",
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
              Tarayıcınıza sanal bir Ethereum cüzdanı olan MetaMask'i yüklemeniz gerekir.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Bu kod, az önce yazdığımız `connectWallet` fonksiyonuna _çok_ benzer.

Temel fark, kullanıcının cüzdanını bağlaması için MetaMask'i açan `eth_requestAccounts` yöntemini çağırmak yerine, burada yalnızca merkeziyetsiz uygulamamıza bağlı olan MetaMask adreslerini içeren bir dizi döndüren `eth_accounts` yöntemini çağırıyoruz.

Bu fonksiyonu çalışırken görmek için `Minter.js` bileşenimizin `useEffect` fonksiyonunda çağıralım.

`connectWallet` için yaptığımız gibi, bu fonksiyonu `interact.js` dosyamızdan `Minter.js` dosyamıza şu şekilde aktarmalıyız:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //buraya aktar
} from "./utils/interact.js"
```

Şimdi, onu sadece `useEffect` fonksiyonumuzda çağırıyoruz:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

Dikkat edin, `getCurrentWalletConnected` çağrımızın yanıtını `walletAddress` ve `status` durum değişkenlerimizi güncellemek için kullanıyoruz.

Bu kodu ekledikten sonra tarayıcı penceremizi yenilemeyi deneyin. Düğme, bağlı olduğunuzu söylemeli ve yeniledikten sonra bile bağlı cüzdanınızın adresinin bir önizlemesini göstermelidir!

### `addWalletListener` fonksiyonunu uygulayın {#implement-add-wallet-listener}

Merkeziyetsiz uygulama cüzdanı kurulumumuzun son adımı, örneğin kullanıcı bağlantısını keserek veya hesap değiştirerek cüzdanımızın durumunu değiştirdiğinde kullanıcı arayüzümüzün güncellenmesi için cüzdan dinleyicisini uygulamaktır.

`Minter.js` dosyanıza, aşağıdakine benzeyen bir `addWalletListener` fonksiyonu ekleyin:

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Yukarıdaki metin alanına bir mesaj yazın.")
      } else {
        setWallet("")
        setStatus("🦊 Sağ üstteki düğmeyi kullanarak MetaMask'e bağlanın.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          Tarayıcınıza sanal bir Ethereum cüzdanı olan MetaMask'i yüklemeniz gerekir.
        </a>
      </p>
    )
  }
}
```

Burada neler olduğunu hızlıca çözelim:

- İlk olarak fonksiyonumuz `window.ethereum`'un etkin olup olmadığını kontrol eder (yani MetaMask'in kurulu olup olmadığını).
  - Etkin değilse, `status` durum değişkenimizi, kullanıcıyı MetaMask'i yüklemeye yönlendiren bir JSX dizesine ayarlarız.
  - Etkinleştirilmişse, kullanıcının merkeziyetsiz uygulamaya ek bir hesap bağlaması, hesapları değiştirmesi veya bir hesabın bağlantısını kesmesi gibi MetaMask cüzdanındaki durum değişikliklerini dinleyen `window.ethereum.on(\"accountsChanged\")` dinleyicisini 3. satırda kurarız. Bağlı en az bir hesap varsa, `walletAddress` durum değişkeni, dinleyici tarafından döndürülen `accounts` dizisindeki ilk hesap olarak güncellenir. Aksi takdirde, `walletAddress` boş bir dize olarak ayarlanır.

Son olarak, onu `useEffect` fonksiyonumuzda çağırmalıyız:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

İşte oldu! Cüzdan fonksiyonlarımızın tümünü programlamayı tamamladık! Cüzdanımız kurulduğuna göre, şimdi NFT'mizi nasıl basacağımızı bulalım!

## NFT Meta Verilerine Giriş {#nft-metadata-101}

Bu öğreticinin 0. Adımında bahsettiğimiz NFT meta verilerini hatırlayın; dijital varlık, ad, açıklama ve diğer nitelikler gibi özelliklere sahip olmasını sağlayarak bir NFT'ye hayat verirler.

Bu meta verileri bir JSON nesnesi olarak yapılandırıp saklamamız gerekecek, böylece akıllı sözleşmemizin `mintNFT` fonksiyonunu çağırırken bunu `tokenURI` parametresi olarak geçirebiliriz.

"Link to Asset" (Varlığa Bağlantı), "Name" (Ad) ve "Description" (Açıklama) alanlarındaki metin, NFT'mizin meta verisinin farklı özelliklerini oluşturacaktır. Bu meta verileri bir JSON nesnesi olarak biçimlendireceğiz, ancak bu JSON nesnesini nerede depolayabileceğimiz konusunda birkaç seçenek var:

- Bunu Ethereum blok zincirinde saklayabiliriz ama bunu yapmak çok pahalı olacaktır.
- AWS veya Firebase gibi merkezi bir sunucuda depolayabiliriz. Ancak bu, merkeziyetsizlik anlayışımızı bozar.
- Dağıtılmış bir dosya sisteminde veri depolamak ve paylaşmak için merkeziyetsiz bir protokol ve eşler arası ağ olan IPFS'yi kullanabiliriz. Bu protokol merkeziyetsiz ve ücretsiz olduğu için en iyi seçeneğimizdir!

Meta verilerimizi IPFS'de depolamak için, kullanışlı bir IPFS API'si ve araç takımı olan [Pinata](https://pinata.cloud/)'yı kullanacağız. Bir sonraki adımda, bunun tam olarak nasıl yapılacağını açıklayacağız!

## Meta verilerinizi IPFS'e sabitlemek için Pinata'yı kullanın {#use-pinata-to-pin-your-metadata-to-IPFS}

Bir [Pinata](https://pinata.cloud/) hesabınız yoksa, [buradan](https://app.pinata.cloud/auth/signup) ücretsiz bir hesap için kaydolun ve e-postanızı ve hesabınızı doğrulamak için adımları tamamlayın.

### Pinata API anahtarınızı oluşturun {#create-pinata-api-key}

[https://pinata.cloud/keys](https://pinata.cloud/keys) sayfasına gidin, ardından üstteki "New Key" (Yeni Anahtar) düğmesini seçin, Yönetici aracını etkinleştirin ve anahtarınızı adlandırın.

Ardından, API bilgilerinizi içeren bir açılır pencere gösterilecektir. Bunu güvenli bir yere koyduğunuzdan emin olun.

Artık anahtarımız ayarlandığına göre onu kullanabilmek için projemize ekleyelim.

### Bir .env dosyası oluşturun {#create-a-env}

Pinata anahtarımızı ve sırrımızı bir ortam dosyasında güvenle saklayabiliriz. Proje dizininize [dotenv paketini](https://www.npmjs.com/package/dotenv) yükleyelim.

Terminalinizde yeni bir sekme açın (yerel ana bilgisayarı çalıştırandan ayrı) ve `minter-starter-files` klasöründe olduğunuzdan emin olun, ardından terminalinizde aşağıdaki komutu çalıştırın:

```text
npm install dotenv --save
```

Ardından, komut satırınıza aşağıdakileri girerek `minter-starter-files` kök dizininizde bir `.env` dosyası oluşturun:

```javascript
vim.env
```

Bu, `.env` dosyanızı vim (bir metin düzenleyici) içinde açacaktır. Kaydetmek için klavyenizdeki "esc" + ":" + "q" tuşlarına bu sırayla basın.

Ardından, VSCode'da `.env` dosyanıza gidin ve Pinata API anahtarınızı ve API sırrınızı şu şekilde ekleyin:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

Dosyayı kaydettikten sonra JSON meta verilerinizi IPFS'ye yüklemek için fonksiyonu yazmaya başlamaya hazırsınız!

### `pinJSONToIPFS` fonksiyonunu uygulayın {#pin-json-to-ipfs}

Neyse ki Pinata'nın, JSON verilerini IPFS'ye yüklemek için özel bir [API'si](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) ve bazı küçük değişikliklerle kullanabileceğimiz, axios içeren kullanışlı bir JavaScript örneği var.

`utils` klasörünüzde `pinata.js` adında başka bir dosya oluşturalım ve ardından Pinata sırrımızı ve anahtarımızı .env dosyasından şu şekilde içe aktaralım:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

Ardından, aşağıdaki ek kodu `pinata.js` dosyanıza yapıştırın. Endişelenmeyin, her şeyin ne anlama geldiğini anlatacağız!

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

İlk olarak, Pinata'ya bir istekte bulunmak için kullanacağımız, tarayıcı ve node.js için promise tabanlı bir HTTP istemcisi olan [axios](https://www.npmjs.com/package/axios) içe aktarılır.

Ardından, `pinJSONToIPFS` API'lerine bir POST isteği yapmak için girişi olarak bir `JSONBody` ve başlığında Pinata api anahtarını ve sırrını alan eş zamansız `pinJSONToIPFS` fonksiyonumuz var.

- Bu POST isteği başarılı olursa, fonksiyonumuz `success` boole değeri `true` olan ve meta verilerimizin sabitlendiği `pinataUrl`'yi içeren bir JSON nesnesi döndürür. Akıllı sözleşmemizin mint fonksiyonuna `tokenURI` girdisi olarak döndürülen bu `pinataUrl` öğesini kullanacağız.
- Bu post isteği başarısız olursa, fonksiyonumuz `success` boole değeri `false` olan bir JSON nesnesi ve hatamızı ileten bir `message` dizesi döndürür.

`connectWallet`fonksiyon dönüş türlerimizde olduğu gibi, durum değişkenlerimizi ve kullanıcı arayüzünü güncellemek amacıyla parametrelerini kullanabilmemiz için JSON nesneleri döndürüyoruz.

## Akıllı sözleşmenizi yükleyin {#load-your-smart-contract}

Artık `pinJSONToIPFS` fonksiyonumuz aracılığıyla NFT meta verilerimizi IPFS'ye yüklemenin bir yolu olduğuna göre, `mintNFT` fonksiyonunu çağırabilmemiz için akıllı sözleşmemizin bir örneğini yüklemenin bir yoluna ihtiyacımız olacak.

Daha önce de belirttiğimiz gibi, bu öğreticide [bu mevcut NFT akıllı sözleşmesini](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) kullanıyor olacağız; ancak, bunu nasıl yaptığımızı öğrenmek veya kendiniz yapmak isterseniz, diğer öğreticimiz olan ["Bir NFT Nasıl Oluşturulur."](https://www.alchemy.com/docs/how-to-create-an-nft) başlıklı yazımıza göz atmanızı şiddetle tavsiye ederiz.

### Sözleşme ABI'si {#contract-abi}

Dosyalarımızı yakından incelediyseniz `src` dizinimizde bir `contract-abi.json` dosyası olduğunu fark etmişsinizdir. Bir sözleşmenin hangi fonksiyonu çağıracağını belirlemek ve fonksiyonun beklediğiniz biçimde veri döndürmesini sağlamak için bir ABI gereklidir.

Ayrıca Ethereum blok zincirine bağlanmak ve akıllı sözleşmemizi yüklemek için bir Alchemy API anahtarına ve Alchemy Web3 API'sine ihtiyacımız olacak.

### Alchemy API anahtarınızı oluşturun {#create-alchemy-api}

Henüz bir Alchemy hesabınız yoksa, [buradan ücretsiz kaydolun.](https://alchemy.com/?a=eth-org-nft-minter)

Bir Alchemy hesabı oluşturduktan sonra, bir uygulama yaratarak bir API anahtarı oluşturabilirsiniz. Bu, Ropsten test ağına istekte bulunmamıza izin verecektir.

İmlecinizi gezinme çubuğundaki "Apps"in (Uygulamalar) üzerine gelip "Create App"e (Uygulama Oluştur) tıklayarak Alchemy Gösterge Panelinizdeki "Create App" sayfasına gidin.

Uygulamanıza bir ad verin (biz, "İlk NFT'm!"i seçtik), kısa bir açıklama yazın, Environment (Ortam) için "Staging"i (Hazırlama) seçin (uygulamanızın muhasebesi için kullanılır) ve network (ağ) için "Ropsten"i seçin.

"Create app"e (Uygulama oluştur) tıklamanız yeterlidir! Uygulamanız aşağıdaki tabloda görünmelidir.

Harika, şimdi HTTP Alchemy API URL'mizi oluşturduğumuza göre, onu panonuza kopyalayın...

…ve sonra onu .env dosyamıza ekleyelim. Toplamda, .env dosyanız şöyle görünmelidir:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

Artık sözleşme ABI'mız ve Alchemy API anahtarımız olduğuna göre [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) kullanarak akıllı sözleşmemizi yüklemeye hazırız.

### Alchemy Web3 uç noktanızı ve sözleşmenizi ayarlayın {#setup-alchemy-endpoint}

Öncelikle, henüz sahip değilseniz terminalde ana dizine giderek [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)'ü yüklemeniz gerekir: `nft-minter-tutorial`:

```text
cd ..
npm install @alch/alchemy-web3
```

Şimdi `interact.js` dosyamıza geri dönelim. Alchemy anahtarınızı .env dosyanızdan içe aktarmak için dosyanın en üstüne aşağıdaki kodu ekleyin ve Alchemy Web3 uç noktanızı ayarlayın:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3), [Web3.js](https://docs.web3js.org/) için bir sarmalayıcıdır ve bir web3 geliştiricisi olarak hayatınızı kolaylaştırmak için gelişmiş API yöntemleri ve diğer önemli avantajları sağlar. Uygulamanızda hemen kullanmaya başlayabilmeniz için minimum yapılandırma gerektirecek şekilde tasarlanmıştır!

Ardından sözleşme ABI'ımızı ve sözleşme adresimizi dosyamıza ekleyelim.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

Her ikisine de sahip olduğumuzda, mint fonksiyonumuzu kodlamaya başlamaya hazırız!

## `mintNFT` fonksiyonunu uygulayın {#implement-the-mintnft-function}

`interact.js` dosyanızın içinde, NFT'mizi aynı adla basacak olan `mintNFT` fonksiyonumuzu tanımlayalım.

Çok sayıda eş zamansız çağrı yapacağımız için \(meta verilerimizi IPFS'ye sabitlemek için Pinata'ya, akıllı sözleşmemizi yüklemek için Alchemy Web3'e ve işlemlerimizi imzalamak için MetaMask'e\), fonksiyonumuz da eş zamansız olacaktır.

Fonksiyonumuza üç girdi, dijital varlığımızın `url`'si, `name` ve `description` olacaktır. `connectWallet` fonksiyonunun altına aşağıdaki fonksiyon imzasını ekleyin:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### Giriş hata yönetimi {#input-error-handling}

Doğal olarak, girdi parametrelerimiz doğru değilse bu fonksiyondan çıkmak için fonksiyonun başlangıcında bir tür girdi hatası işlemeye sahip olmak mantıklıdır. Fonksiyonumuzun içine aşağıdaki kodu ekleyelim:

```javascript
export const mintNFT = async (url, name, description) => {
  //hata yönetimi
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Lütfen basım yapmadan önce tüm alanların doldurulduğundan emin olun.",
    }
  }
}
```

Esasen, girdi parametrelerinden herhangi biri boş bir dizeyse, `success` boole değerinin `false` olduğu bir JSON nesnesi döndürürüz ve `status` dizesi, kullanıcı arayüzümüzdeki tüm alanların doldurulması gerektiğini belirtir.

### Meta verileri IPFS'e yükleyin {#upload-metadata-to-ipfs}

Meta verilerimizin doğru şekilde biçimlendirildiğini öğrendikten sonraki adım, onu bir JSON nesnesi olarak paketlemek ve yazdığımız `pinJSONToIPFS` aracılığıyla IPFS'ye yüklemektir!

Bunu yapmak için önce `pinJSONToIPFS` fonksiyonunu `interact.js` dosyamıza aktarmamız gerekiyor. `interact.js`'nin en üstüne şunu ekleyelim:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

`pinJSONToIPFS`'in bir JSON gövdesi aldığını hatırlayın. Bu nedenle onu çağırmadan önce `url`, `name` ve `description` parametrelerimizi bir JSON nesnesi olarak biçimlendirmemiz gerekecek.

Şimdi `metadata` adında bir JSON nesnesi oluşturmak için kodumuzu güncelleyelim ve ardından bu `metadata` parametresiyle `pinJSONToIPFS`'a bir çağrı yapalım:

```javascript
export const mintNFT = async (url, name, description) => {
  //hata yönetimi
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Lütfen basım yapmadan önce tüm alanların doldurulduğundan emin olun.",
    }
  }

  //meta veri oluştur
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //pinata çağrısı yap
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 tokenURI'niz yüklenirken bir şeyler ters gitti.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

Dikkat edin, `pinJSONToIPFS(metadata)` çağrımızın yanıtını `pinataResponse` nesnesinde saklıyoruz. Ardından, bu nesneyi herhangi bir hata için ayrıştırırız.

Bir hata varsa, `success` boole değerinin `false` olduğu bir JSON nesnesi döndürürüz ve `status` dizemiz çağrımızın başarısız olduğunu belirtir. Aksi takdirde, `pinataURL`'u `pinataResponse`'tan çıkarır ve onu `tokenURI` değişkenimiz olarak saklarız.

Şimdi dosyamızın başında başlattığımız Alchemy Web3 API'sini kullanarak akıllı sözleşmemizi yükleme zamanı. Sözleşmeyi `window.contract` global değişkeninde ayarlamak için `mintNFT` fonksiyonunun altına aşağıdaki kod satırını ekleyin:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

`mintNFT` fonksiyonumuza eklenecek son şey Ethereum işlemimizdir:

```javascript
//Ethereum işleminizi ayarlayın
const transactionParameters = {
  to: contractAddress, // Sözleşme yayınları dışında gereklidir.
  from: window.ethereum.selectedAddress, // kullanıcının aktif adresiyle eşleşmelidir.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //NFT akıllı sözleşmesine çağrı yapın
}

//işlemi MetaMask aracılığıyla imzalayın
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ İşleminizi Etherscan'de kontrol edin: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 Bir şeyler ters gitti: " + error.message,
  }
}
```

Ethereum işlemlerine zaten aşinaysanız, yapının gördüklerinize oldukça benzer olduğunu fark edeceksiniz.

- İlk olarak işlem parametrelerimizi oluşturuyoruz.
  - `to` alıcı adresini belirtir (akıllı sözleşmemiz)
  - `from`, işlemi imzalayanı belirtir (kullanıcının MetaMask'a bağlı adresi: `window.ethereum.selectedAddress`)
  - `data`, girdi olarak `tokenURI`'ımızı ve kullanıcının cüzdan adresi olan `window.ethereum.selectedAddress`'ı alan akıllı sözleşme `mintNFT` yöntemimize yapılan çağrıyı içerir
- Ardından, MetaMask'ten işlemi imzalamasını istediğimiz bir `window.ethereum.request` bekleme çağrısı yaparız. Dikkat edin, bu istekte eth yöntemimizi (`eth_SentTransaction`) belirtiyor ve `transactionParameters`'ımızı aktarıyoruz. Bu noktada, MetaMask tarayıcıda açılır ve kullanıcıdan işlemi imzalamasını veya reddetmesini ister.
  - İşlem başarılı olursa fonksiyon, `success` boole değerinin `true` olarak ayarlandığı bir JSON nesnesi döndürür ve `status` dizesi kullanıcıdan işlemleri hakkında daha fazla bilgi için Etherscan'i kontrol etmesini ister.
  - İşlem başarısız olursa fonksiyon, `success` boole değerinin `false` olarak ayarlandığı bir JSON nesnesi döndürür ve `status` dizesi hata mesajını aktarır.

Sonuç olarak, `mintNFT` fonksiyonumuz şöyle görünmelidir:

```javascript
export const mintNFT = async (url, name, description) => {
  //hata yönetimi
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Lütfen basım yapmadan önce tüm alanların doldurulduğundan emin olun.",
    }
  }

  //meta veri oluştur
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //pinata pin isteği
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 tokenURI'niz yüklenirken bir şeyler ters gitti.",
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
      .encodeABI(), //NFT akıllı sözleşmesine çağrı yapın
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
        "✅ İşleminizi Etherscan'de kontrol edin: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Bir şeyler ters gitti: " + error.message,
    }
  }
}
```

Bu dev bir fonksiyon! Şimdi, sadece `mintNFT` fonksiyonumuzu `Minter.js` bileşenimize bağlamamız gerekiyor...

## `mintNFT`'yi `Minter.js` ön ucumuza bağlayın {#connect-our-frontend}

`Minter.js` dosyanızı açın ve en üstteki `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` satırını şu şekilde güncelleyin:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

Son olarak, içe aktarılan `mintNFT`fonksiyonunuza bekleme çağrısı yapmak için `onMintPressed` fonksiyonunu uygulayın ve işlemimizin başarılı mı yoksa başarısız mı olduğunu yansıtmak için `status` durum değişkenini güncelleyin:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## NFT'nizi yayındaki bir web sitesinde yayınlayın {#deploy-your-NFT}

Kullanıcıların etkileşim kurması için projenizi yayınlamaya hazır mısınız? Minter'ınızı canlı bir web sitesinde dağıtmak için [bu öğreticiye](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online) göz atın.

Son bir adım...

## Blokzincir dünyasını kasıp kavurun {#take-the-blockchain-world-by-storm}

Şaka yapıyorum, öğreticiyi tamamladınız!

Özetlemek gerekirse, bir NFT minter oluşturarak şunları nasıl yapacağınızı başarıyla öğrendiniz:

- Ön uç projeniz aracılığıyla MetaMask'a bağlanma
- Ön ucunuzdan akıllı sözleşme yöntemlerini arama
- MetaMask kullanarak işlemleri imzalama

Muhtemelen, merkeziyetsiz uygulamanız aracılığıyla basılan NFT'leri cüzdanınızda sergilemek istersiniz — bu yüzden hızlı öğreticimiz olan [NFT'nizi Cüzdanınızda Nasıl Görüntülersiniz](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet) başlıklı yazımıza göz atmayı unutmayın!

Ve her zaman olduğu gibi, herhangi bir sorunuz olursa [Alchemy Discord](https://discord.gg/gWuC7zB)'da size yardım etmeye hazırız. Bu öğreticideki kavramları gelecekteki projelerinize nasıl uygulayacağınızı görmek için sabırsızlanıyoruz!
