---
title: "Gazsız kullanıcılarınızın token tutmasına ve sözleşmeleri çağırmasına izin vermek"
description: "Hesap soyutlama kullanarak, belirli bir EOA tarafından gönderilen veya o EOA tarafından imzalanan işlemleri kabul eden akıllı sözleşme cüzdanları oluşturabiliriz. Bu akıllı sözleşmeler daha sonra EOA'nın kontrolü altında olan token'lara sahip olabilir."
author: Ori Pomerantz
tags:
  - gazsız
  - erc-20
  - hesap soyutlama
skill: intermediate
breadcrumb: "Gazsız token"
lang: tr
published: 2026-04-01
---

## Giriş {#introduction}

[Önceki bir makale](/developers/tutorials/gasless/), EIP-712 imzalarını kullanarak kendi uygulamanıza gazsız erişim sağlamayı tartışmıştı, ancak bu yalnızca kendi akıllı sözleşmelerinizle sınırlıdır. [Hesap soyutlama](/roadmap/account-abstraction/) kullanarak, iki tür işlemi kabul eden ve bunları istenen bir hedefe ileten akıllı sözleşme cüzdanları oluşturabiliriz:

- Belirli bir Harici Sahipli Hesap (EOA) tarafından gönderilen işlemler (bu, söz konusu EOA'nın ETH'ye sahip olmasını gerektirir)
- Herhangi bir yerden gönderilen, ancak aynı EOA tarafından imzalanan işlemler.

Bu şekilde, bir hesabın varlıkları (token'lar vb.) tutması ve gazı olan bir EOA'nın yapabileceği tüm işlevleri yerine getirmesi için gazsız bir yol sağlayabiliriz.

### Neden isteği sadece iletemiyoruz? {#why-no-tx-origin}

ERC-20 ve ilgili standartlarda hesap sahibi, token sözleşmesini çağıran adres olan [`msg.sender`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties)'dir ve bu adres her zaman işlemin başlatıcısı olan [`tx.origin`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties) olmak zorunda değildir. Bu, [güvenlik nedenleriyle](https://docs.soliditylang.org/en/v0.8.35-pre.1/security-considerations.html#tx-origin) gereklidir. Bu, token transfer isteklerini iletirsek, token'ları kullanıcı tarafından kontrol edilen bir adres yerine ileticinin adresinden transfer etmeye çalışacakları anlamına gelir.

EOA adresini [EIP-7702](https://eip7702.io/) aracılığıyla kullanmanıza izin veren bir çözüm vardır, ancak bu potansiyel olarak tehlikeli bir yetki devri imzalamayı gerektirir, bu nedenle bunu yalnızca cüzdan sağlayıcısının onayladığı bir akıllı sözleşmeye yetki devretmek için kullanabilirsiniz. Bu eğitim için, kullanıcıya bir proxy (vekil) olarak bir akıllı sözleşme oluşturmanın çok daha basit olan yöntemini tercih ediyorum.

## İşbaşında görmek {#in-action}

1. Hem [Node](https://nodejs.org/en/download) hem de [Foundry](https://www.getfoundry.sh/introduction/installation)'ye sahip olduğunuzdan emin olun.

2. Uygulamayı klonlayın ve gerekli yazılımı yükleyin.

   ```sh
   git clone https://github.com/qbzzt/260315-gasless-tokens.git
   cd 260315-gasless-tokens
   forge build
   cd server
   npm install
   ```

3. `SEPOLIA_PRIVATE_KEY` değerini Sepolia'da ETH'si olan bir cüzdana ayarlamak için `.env` dosyasını düzenleyin. Sepolia ETH'ye ihtiyacınız varsa, almak için [bir musluk kullanın](/developers/docs/networks/#sepolia). İdeal olarak, bu özel anahtar tarayıcı cüzdanınızdakinden farklı olmalıdır.

4. Sunucuyu başlatın.

   ```sh
   npm run dev
   ```

5. [`http://localhost:5173`](http://localhost:5173) URL'sindeki uygulamaya gidin.

6. Bir cüzdana bağlanmak için **Connect with Injected** (Enjekte Edilen ile Bağlan) seçeneğine tıklayın. Cüzdanda onaylayın ve gerekirse Sepolia'ya geçişi onaylayın.

7. Aşağı kaydırın ve **Deploy UserProxy (slow process)** (UserProxy'yi Dağıt (yavaş işlem)) seçeneğine tıklayın.

8. Kullanıcı proxy'sinin ne zaman dağıtıldığını görebilirsiniz çünkü **UserProxy access** (UserProxy erişimi) yanında bir adres belirir. 24 saniye (2 blok) beklediyseniz ve hala gerçekleşmediyse, değişiklikleri algılamada bir sorun olabilir.

   Eğer durum buysa, [Sepolia Gezgini](https://eth-sepolia.blockscout.com/)'ne gidin ve sunucu çıktısında `npm run dev` adresinde gördüğünüz dağıtım işlem hash'ini girin. Adresini görüntülemek için oluşturulan sözleşmeye tıklayın, ardından kopyalayın. Adresi _Or enter existing proxy address_ (Veya mevcut proxy adresini girin) alanına yapıştırın, ardından **Set proxy address** (Proxy adresini ayarla) seçeneğine tıklayın.

9. Token almak üzere ERC-20 sözleşmesinin [`faucet`](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=read_write_contract#0xde5f72fd) işlevine bir çağrı göndermek için **Request more tokens for proxy** (Proxy için daha fazla token iste) seçeneğine tıklayın. Cüzdandaki imzayı **Onaylayın** (Confirm). Elbette token'lar kullanıcının adresine değil, proxy'nin adresine ulaşır.

10. Aşağı kaydırın ve _Last transaction:_ (Son işlem:) altındaki bağlantıya tıklayın. Bu, size `faucet` işlemini göstermek için tarayıcıyı açacaktır.

11. _amount to transfer_ (transfer edilecek miktar) kısmına bir ile bin arasında bir sayı girin. Token'ları kendi adresinize transfer etmek için **Transfer**'e tıklayın. İstek için **Onayla**'ya (Confirm) tıklamadan önce, imzalanan verinin opak (anlaşılmaz) olduğunu görün. Kullanıcılar ne imzaladıklarını anlamakta zorlanırlardı. Bunu [aşağıda](#vulnerabilities) tartışacağımızı unutmayın.

12. İşlem onaylandıktan sonra, hem _your balance_ (bakiyeniz) hem de _proxy balance_ (proxy bakiyesi) içindeki değişikliği görmek için bekleyin. Sepolia'nın 12 saniyelik bir blok süresi olduğu için bunun da biraz zaman alacağını unutmayın.

## Nasıl çalışır {#how-work}

Gazsız bir deneyim için, kullanıcıya yönelik bir kullanıcı arayüzüne, mesajları kullanıcı arayüzünden zincire yönlendirecek bir sunucuya ve bunları alıp doğrulayacak bir akıllı sözleşmeye ihtiyacımız var.

### Cüzdan akıllı sözleşmesi {#wallet-smart-contract}

Bu, [akıllı sözleşmedir](https://github.com/qbzzt/260315-gasless-tokens/blob/main/contracts/src/UserProxy.sol). Amacı, talep etmek için kullanılan kanaldan bağımsız olarak gerçek sahibin talep ettiği her şeyi yapmak ve diğer her şeyi görmezden gelmektir. Bunu yapmak için, işlevleri çağrılacak bir hedef adres ve onu çağırmak için kullanılacak veriyi alır.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract UserProxy {
    address immutable OWNER;
    uint public nonce = 0;
```

Sahibinin kimliği ve mesajların tekrarlanmasını önlemek için bir [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). Nonce bir `public` değişkeni olduğu için, Solidity derleyicisi ayrıca zincir dışı kodun değerini okumasına izin veren bir görünüm (view) işlevi olan [`nonce()`](https://eth-sepolia.blockscout.com/address/0x9Ba259C15B46ee4b72dEf7b93D85Ec18f5f6e50E?tab=read_write_contract#0xaffed0e0) oluşturur.

```solidity
    bytes32 private constant SIGNED_ACCESS_TYPEHASH =
        keccak256("SignedAccess(address target,bytes data,uint256 nonce)");

    bytes32 private constant SIGNED_ACCESS_PAYABLE_TYPEHASH =
        keccak256("SignedAccessPayable(address target,bytes data,uint256 nonce,uint256 value)");

    bytes32 immutable DOMAIN_SEPARATOR;
```

[EIP-712 imzalarını](https://eips.ethereum.org/EIPS/eip-712) doğrulamak için gereken bilgiler.

```solidity
    constructor(address owner_) {
        OWNER = owner_;
```

Bir `UserProxy`, tek bir sahip adresine bağlıdır. Bu gereklidir çünkü varlıklara (ERC-20 token'ları, NFT'ler vb.) sahip olabilir. Farklı sahiplere ait varlıkları birbirine karıştırmak istemiyoruz.

```solidity
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes("UserProxy")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }
```

[Etki alanı ayırıcısı (domain separator)](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator). Derleme zamanında hesaplanamaz, çünkü zincir kimliğine (chain ID) ve sözleşme adresine bağlıdır. Bu, bir UserProxy'nin bir başkası için hazırlanmış bir mesajla kandırılmasını imkansız hale getirir.

```solidity
    event CallResult(address target, bytes returnData);
```

Bir çağrının sonuçlarını günlüğe kaydedin.

```solidity
    function directAccess(address target, bytes calldata data)
            external returns (bytes memory) {
```

Bu işlev doğrudan sahip tarafından çağrılabilir. Hiçbir iletici mevcut değilse, sahip yine de varlıklara doğrudan blokzincir üzerinden erişebilir (kullanıcının ETH'si varsa).

```solidity
        require(msg.sender == OWNER, "Only owner can call");
        (bool success, bytes memory returnData) = target.call(data);
        require(success, "Call failed");

        emit CallResult(target, returnData);

        return returnData;
    }
```

Eğer sahip tarafından _doğrudan_ çağrılırsak, sağlanan çağrı verisi ile hedefi çağırın.

```solidity
    function signedAccess(
        address target,
        bytes calldata data,
        uint8 v,
        bytes32 r,
        bytes32 s)
```

Bu, `UserProxy`'nin ana işlevidir. `target` ve `data`'nun yanı sıra bir imza alır.

```solidity
    external returns (bytes memory) {
        // EIP-712 özetini hesapla
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        SIGNED_ACCESS_TYPEHASH,
                        target,
                        keccak256(data),
                        nonce
                    )
                )
            )
        );
```

Özet (digest) ayrıca nonce'u da içerir, ancak bunu işlemden almamıza gerek yoktur; doğru değeri zaten biliyoruz. Yanlış nonce'a sahip bir imza reddedilecektir.

```solidity

    // İmzalayanı kurtar
    address signer = ecrecover(digest, v, r, s);
    require(signer == OWNER, "Signature invalid or not by owner");
```

İmza geçersizse, `ecrecover` genellikle farklı bir adres döndürür ve kabul edilmez.

```solidity
    (bool success, bytes memory returnData) = target.call(data);
    require(success, "Call failed");
```

Kullanıcının bize çağırmamızı söylediği sözleşmeyi çağırın ve başarılı olmazsa geri alın.

```solidity
    emit CallResult(target, returnData);

    nonce++; // Tekrarlamayı önlemek için nonce değerini artır

    return returnData;
}
```

Başarılı olursa, bir günlük olayı yayınlayın ve nonce'u artırın.

```solidity
    function directAccessPayable(address target, uint value, bytes calldata data)
            external payable returns (bytes memory) {
        .
        .
        .
    }

    function signedAccessPayable(
        .
        .
        .
    }
}
```

Bunlar, sözleşmeden ETH transfer etmenize de olanak tanıyan neredeyse aynı varyantlardır.

### İletici (Relayer) {#relayer}

İletici bir [sunucu bileşenidir](/developers/tutorials/server-components/). JavaScript ile yazılmıştır; kaynak kodunu [buradan](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/index.js) görebilirsiniz.

```js
import express from "express";
import { createServer as createViteServer } from "vite";
import { createWalletClient, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia } from 'viem/chains'
import dotenv from 'dotenv'
```

İhtiyacımız olan kütüphaneler. Bu, kullanıcı arayüzü kodunu sunmak için [Vite](https://vite.dev/) kullanan bir [Express](https://expressjs.com/) sunucusudur. Blokzincir ile iletişim kurmak için [Viem](https://viem.sh/)'i ve işlemi gönderen adresin özel anahtarını okumak için [dotenv](https://www.dotenv.org/)'i kullanıyoruz.

```js
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const UserProxy = require('../contracts/out/UserProxy.sol/UserProxy.json')
```

Bu, derlenmiş `UserProxy`'yi okumanın basit bir yoludur. `UserProxy`'yi çağırabilmek için ABI'ye ve onu bir kullanıcı için dağıtabilmek için derlenmiş koda ihtiyacımız var.

```js
dotenv.config()
const sepoliaAccount = privateKeyToAccount(process.env.SEPOLIA_PRIVATE_KEY)
console.log("Using account:", sepoliaAccount.address)
```

`.env` dosyasını okuyun, adresi çıkarın ve konsola yazdırın.

```js
const sepoliaClient = createWalletClient({
  account: sepoliaAccount,
  chain: sepolia,
  transport: http("https://rpc.sentio.xyz/sepolia"),
})

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
})
```

Blokzincir ile konuşan Viem istemcileri.

```js
const start = async () => {
  const app = express()
```

Bir Express sunucusu çalıştırın.

```js
  app.use(express.json())
```

Express'e istek gövdesini okumasını ve eğer JSON ise ayrıştırmasını söyleyin.

```js
  app.post("/server/deploy", async (req, res) => {
```

Bu, proxy'yi dağıtma isteklerini işleyen koddur. Burada [hizmet reddi (denial-of-service)](https://en.wikipedia.org/wiki/Denial-of-service_attack) saldırılarına karşı savunmasız olduğumuzu unutmayın, çünkü bir saldırgan ETH'miz tükenene kadar proxy'yi dağıtma istekleriyle bize spam yapabilir. Bir üretim sisteminde, muhtemelen proxy'yi dağıtma isteğinin imzalanmasını ve imzalayanın mevcut bir müşteri olmasını şart koşardık.

```js
    try {
      const ownerAddress = req.body.ownerAddress
```

İstekten sahibin adresini alın.

```js
      const txHash = await sepoliaClient.deployContract({
        abi: UserProxy.abi,
        bytecode: UserProxy.bytecode.object,
        args: [ownerAddress],
        account: sepoliaAccount,
      })

      console.log("Deployment transaction hash:", txHash)

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      })
```

[Sözleşmeyi dağıtın](https://viem.sh/docs/contract/deployContract#deploycontract) ve [dağıtılana kadar bekleyin](https://viem.sh/docs/actions/public/waitForTransactionReceipt).

```js
      res.json({ contractAddress: receipt.contractAddress })
```

Her şey yolundaysa, proxy adresini kullanıcı arayüzüne döndürün.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

Bir sorun varsa, bildirin.

```js
  app.post("/server/message", async (req, res) => {
```

Bu, `UserProxy` sözleşmesi için kullanıcı mesajlarını işleyen koddur. Bu, hizmet reddi saldırısına karşı savunmasız olan başka bir noktadır.

```js
    try {
      const { proxy, target, data, v, r, s } = req.body

      const txHash = await sepoliaClient.writeContract({
        address: proxy,
        abi: UserProxy.abi,
        functionName: 'signedAccess',
        args: [target, data, v, r, s],
        account: sepoliaAccount,
      })
```

İstek verilerini alın ve proxy üzerinde `signedAccess`'i çağırmak için kullanın.

```js
      console.log("Message transaction hash:", txHash)

      res.json({ txHash })
```

İşlem hash'ini geri bildirin. Bu, kullanıcı arayüzünün kullanıcının işlemi kontrol etmesi için bir URL görüntülemesini sağlar.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

Yine, bir sorun varsa bildirin.

```js
  // Geri kalan her şeyi Vite halletsin
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)

  app.listen(5173, () => {
    console.log("Dev server running on http://localhost:5173");
  })
}

start()
```

Diğer her şey için, kullanıcı arayüzünü bizim için sunmayı halleden Vite'i kullanın.

### Kullanıcı arayüzü {#user-interface}

[Bu, kullanıcı arayüzü kodudur](https://github.com/qbzzt/260315-gasless-tokens/tree/main/server/src). Kodun çoğu, [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx) istisnası dışında, [bu makalede](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/#file-walk-through) belgelenenle neredeyse aynıdır.

[`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx)'nin bazı kısımları, [bu makaledeki](/developers/tutorials/gasless/#ui-changes) [`Greeter.jsx`](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx)'e benzer. İşte yeni kısımlar.

```js
import {
   encodeFunctionData
       } from 'viem'
```

[Bu işlev](https://viem.sh/docs/contract/encodeFunctionData), bir EVM işlev çağrısı için çağrı verisini oluşturur. Bu, kullanıcının çağrı verisini imzalayabilmesi için gereklidir.

```js
import UserProxy from '../../contracts/out/UserProxy.sol/UserProxy.json'
```

Yukarıda açıklanan `UserProxy`.

```js
import Erc20 from '../../contracts/out/Faucet.sol/FaucetToken.json'
```

[Bu sözleşme](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=contract), önemli bir işlev olan `faucet()`'nin eklenmesiyle çoğunlukla normal bir ERC-20 sözleşmesidir. Bu işlev, test amacıyla isteyen herkese token verir.

```js
const erc20Addrs = {
  // Sepolia
    11155111: '0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78'
}
```

`FaucetToken` için adres.

```js
const Address = ({ address }) => {
   if (!address) return null
   return (
      <a href={`https://eth-sepolia.blockscout.com/address/${address}?tab=read_write_contract`} target="_blank">{address}</a>
   )
}
```

Bu bileşen, bir blok gezginindeki sözleşmeye giden bir bağlantıyla birlikte bir adres çıktısı verir.

```js
const Token = () => {
    ...
```

Bu, işin çoğunu yapan ana bileşendir.

```js
  const [ balanceAmount, setBalanceAmount ] = useState("Loading...")
```

Kullanıcı adresinin token bakiyesi.

```js
  const [ proxyAddr, setProxyAddr ] = useState(null)
```

Kullanıcıya ait bir proxy'nin adresi.

```js
  const [ proxyBalanceAmount, setProxyBalanceAmount ] = useState("Loading...")
```

Proxy'nin token bakiyesi.

```js
  const [ newProxyAddr, setNewProxyAddr ] = useState("")
```

Bu alan, kullanıcı proxy adresini manuel olarak ayarladığında kullanılır. Proxy adresini manuel olarak ayarlama yeteneğine sahip olmak, kullanıcının her seferinde yeni bir tane dağıtmak (ve eski proxy'nin sahip olduğu tüm token'ları kaybetmek) yerine mevcut bir proxy'yi kullanmasına olanak tanır.

```js
  const [ txHash, setTxHash ] = useState(null)
```

Kullanıcının o işlemi kontrol edebilmesi için gezgine bir bağlantı göstermek amacıyla kullanılan son işlemin hash'i.

```js
  const [ transferToken, setTransferToken ] = useState("")
  const [ transferAmount, setTransferAmount ] = useState("")
  const [ transferTo, setTransferTo ] = useState("")
```

Bu alanların tümü, bir ERC-20 sözleşmesine token transfer komutları göndermek için kullanılır. Bu `FaucetToken` olabilir, ancak olmak zorunda değildir. [`transfer`](/developers/tutorials/erc20-annotated-code/#transfer-tokens) işlevi ERC-20 standardının bir parçasıdır.

```js
  const balance = useReadContract({
    ...
  })


  const proxyBalance = useReadContract({
    ...
  })
```

İlgilendiğimiz iki token bakiyesini, kullanıcının ne kadarına sahip olduğunu ve proxy'nin ne kadarına sahip olduğunu okuyun.

```js
  const nonce = useReadContract({
      address: proxyAddr,
      abi: UserProxy.abi,
      functionName: 'nonce',
      args: [],
  })
```

Tekrarlama saldırılarını (örneğin, bir satıcının kendisine para veren bir işlemi tekrarlaması) önlemek için bir [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) kullanıyoruz. İmzaladığımız veriye eklemek için mevcut değeri bilmemiz gerekiyor.

```js
  useEffect(() => {
    if (balance?.status === "success")
      setBalanceAmount(balance.data / 10n**18n)
    else
      setBalanceAmount("Loading...")
  }, [balance])

  useEffect(() => {
    if (proxyBalance?.status === "success")
      setProxyBalanceAmount(proxyBalance.data / 10n**18n)
    else
      setProxyBalanceAmount("Loading...")
  }, [proxyBalance])
```

Blokzincirden okunan bilgi değiştiğinde kullanıcıya gösterilen bakiyeyi güncellemek için [`useEffect`](https://react.dev/reference/react/useEffect) kullanın.

```js
  useEffect(() => {
    setTransferToken(faucetAddr)
  }, [faucetAddr])

  useEffect(() => {
    setTransferTo(account.address)
  }, [account.address])
```

Varsayılan, `FaucetToken` token'larını kullanıcının kendi hesabına transfer etmektir. Burada bu değerleri Viem'den aldığımızda ayarlıyoruz.

```js
  const proxyAddressChange = (evt) => setNewProxyAddr(evt.target.value)
  const transferTokenChange = (evt) => setTransferToken(evt.target.value)
  const transferToChange = (evt) => setTransferTo(evt.target.value)
  const transferAmountChange = (evt) => setTransferAmount(evt.target.value)
```

Metin alanları değiştiğinde çalışacak olay işleyicileri.

```js
  const deployUserProxy = async () => {
    try {
      const response = await fetch("/server/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerAddress: account.address })
      })

      const data = await response.json()
      setProxyAddr(data.contractAddress)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

Sunucudan bu kullanıcı için bir proxy dağıtmasını isteyin.

```js
  const signMessage = async(proxyAddr, target, calldata) => {
```

Zincir içi `UserProxy`'ye göndermesi için sunucuya iletmeden önce bir mesaj imzalayın. Bu [burada](/developers/tutorials/gasless/#ui-changes) açıklanmıştır. Hem hedef adres (çağırdığımız token'ın adresi) hem de gönderilecek çağrı verisi ile bir mesaj imzalamamız gerekiyor.

```js
    const domain = {
      .
      .
      .
    return {v, r, s}
  }

  const messageUserProxy = async (proxy, target, data, v, r, s) => {
```

İmzayı doğrulayacak ve ardından `target`'a gönderecek olan `UserProxy`'ye imzalı bir mesaj gönderin.

```js
    try {
      const response = await fetch("/server/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proxy, target,  // her iki adres
          data,           // hedefe gönderilecek çağrı verisi
          v, r, s         // imza
        })
      })
      const serverResponse = await response.json()
      setTxHash(serverResponse.txHash)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

Sunucuya bir istek gönderin ve yanıtı aldığınızda işlem hash'ini alın.

```js
  const faucetSimulation = useSimulateContract({
    address: faucetAddr,
    abi: Erc20.abi,
    functionName: 'faucet',
    account: account.address
  })
```

`faucet` işlevini çağırmayı simüle edin. Musluk düğmesini yalnızca bu başarılı olursa etkinleştiririz.

```js
  const proxyFaucet = async () => {
    const calldata = encodeFunctionData({
      abi: Erc20.abi,
      functionName: 'faucet',
      args: [],
    })

    const {v, r, s} = await signMessage(proxyAddr, calldata)
    messageUserProxy(proxyAddr, faucetAddr, calldata, v, r, s)
  }

  const proxyTransfer = async () => {
    const calldata = encodeFunctionData({
      abi: Erc20.abi,
      functionName: 'transfer',
      args: [transferTo, BigInt(transferAmount) * 10n**18n],
    })

    const {v, r, s} = await signMessage(proxyAddr, transferToken, calldata)
    messageUserProxy(proxyAddr, transferToken, calldata, v, r, s)
  }
```

Sunucu ve `UserProxy` aracılığıyla bir işlevi çağırmak için üç adımı izleriz:

1. [`encodeFunctionData`](https://viem.sh/docs/contract/encodeFunctionData) kullanarak imzalanacak ve gönderilecek çağrı verisini oluşturun.

2. Mesajı imzalayın (hedef adres, çağrı verisi ve nonce).

3. Mesajı sunucuya gönderin.

```js
  return (
    <>
      <div align="left">
         <h2>Token</h2>
         <h4>Token contract address <Address address={faucetAddr} /></h4>
         <hr />
         <h4>Direct access (as <Address address={account?.address} />)</h4>
         Your balance: {balanceAmount}
         <br />
         <button disabled={!faucetSimulation.data}
               onClick={() => writeContract(
                  faucetSimulation.data.request
               )}
         >
         Request more tokens
         </button>
         <hr />
```

Bileşenin bu kısmı, `FaucetToken`'yi doğrudan tarayıcıdan kullanmanıza olanak tanır. Temel amacı hata ayıklamayı kolaylaştırmaktır.

```js
         <h4>UserProxy access <Address address={proxyAddr} /></h4>
         <button onClick={deployUserProxy}>
         Deploy UserProxy (slow process)
         </button>
```

Kullanıcının yeni bir `UserProxy` dağıtmasına izin verin.

```js
         <br /><br />
         <input type="text" placeholder="Veya mevcut proxy adresini girin" value={newProxyAddr} onChange={proxyAddressChange} />
         <br /><br />
         <button
            onClick={() => setProxyAddr(newProxyAddr)}
            disabled={newProxyAddr.match(/^0x[a-fA-F0-9]{40}$/) === null}
         >
            Set proxy address
         </button>
```

Kullanıcıların yalnızca meşru bir adres girdiklerinde **Set proxy address** (Proxy adresini ayarla) seçeneğine tıklamasına izin verin. Bunun, söz konusu adresin gerçekten bir `UserProxy` sözleşmesi olduğunu garanti etmediğini unutmayın. Böyle bir kontrol eklemek mümkündür, ancak çok daha yavaş olacaktır (daha kötü kullanıcı deneyimi) ve güvenliği artırmayacaktır (saldırganlar kullanıcı arayüzü için her zaman kendi kodlarını kullanabilirler).

```js
         <br /><br />
         { proxyAddr && (
```

Geri kalanını _yalnızca_ meşru bir proxy adresi varsa gösterin.

```js
            <>
               Proxy balance: {proxyBalanceAmount}
               <br />
               Proxy nonce: {nonce?.data?.toString() ?? "Loading..."}
```

Kullanıcının nonce'u bilmesine gerek yoktur; bu sadece hata ayıklama amaçlıdır.

```js
               <br />
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyFaucet}
               >
                  Request more tokens for proxy
               </button>
```

Proxy üzerinden `faucet()`'ye yapılan bir çağrıyı simüle edemeyiz. Ancak, en azından bir proxy'miz olduğundan ve proxy'nin bize bir nonce bildirdiğinden emin olabiliriz.

```js
               <hr />
               <h4>Transfer tokens from proxy</h4>
               <ul>
                  <li> Token to transfer: <input type="text" placeholder="Token to transfer" value={transferToken} onChange={transferTokenChange} /> </li>
                  <li> Recipient address: <input type="text" placeholder="Recipient address" value={transferTo} onChange={transferToChange} /> </li>
                  <li> Amount to transfer: <input type="number" placeholder="Amount to transfer" value={transferAmount} onChange={transferAmountChange} /> </li>
               </ul>
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyTransfer}
               >
                  Transfer
               </button>
            </>
         )}
```

Kullanıcının ERC-20 transfer işlemleri düzenlemesine izin verin.

```js
         <hr />
         { txHash && (
            <>
               <h4>Last transaction:</h4>
               <a href={`https://eth-sepolia.blockscout.com/tx/${txHash}`} target="_blank">
                 {txHash}
               </a>
            </>
         )}
```

Son bir işlem hash'i varsa, kullanıcının bunu bir blok gezgininde görüntüleyebilmesi için bir bağlantı gösterin.

```js
 
</div>
    </>
  )
}

export {Token}
```

Bu sadece React şablon kodudur (boilerplate).

## Güvenlik Açıkları {#vulnerabilities}

Sunucumuz hizmet reddi saldırılarına karşı savunmasızdır. Bu saldırı [serinin önceki makalesinde](/developers/tutorials/gasless/#dos-on-server) açıklanmıştır.

Ek olarak, kötü kullanıcı davranışını teşvik ediyoruz. Kullanıcıdan imzalamasını istediğimiz şey şudur:

![Screen capture with opaque calldata](./fig-1-opaque-calldata.png)

Bunun, kullanıcının transfer etmek istediği token, miktar ve hedef adres için meşru bir ERC-20 transferi olduğunu _biz_ biliyoruz. Ancak çoğu kullanıcı çağrı verisini nasıl yorumlayacağını bilmez ve ne imzaladıkları hakkında hiçbir fikirleri yoktur. Bu, iki nedenden dolayı kötü bir tasarımdır:

- Bazı kullanıcılar, imzalamalarını söylediğimiz verilere güvenmedikleri için bizi kullanmayacaktır.
- Diğer kullanıcılar bize güvenecek _ve_ ne olduğunu anlamadan sadece çağrı verisini imzalamaları gerektiğini öğreneceklerdir. Bu, Saldırgan Adam onları kendi web sitesine yönlendirmeyi başarırsa, kullanıcının sahip olduğu tüm USDC'yi (veya DAI veya başka herhangi bir ERC-20'yi) kendisine veren bir işlemi imzalamalarını sağlayabileceği anlamına gelir.

Çözüm, `UserProxy` içinde transfer gibi yaygın olarak kullanılan işlevler için ayrı işlevlere sahip olmaktır. O zaman kullanıcılar anladıkları bir şeyi imzalayabilirler.

![Screen capture with transfer details](./fig-2-transparent-signature.png)

**Not:** Kullanıcılar istedikleri herhangi bir cüzdanı kullanabilseler de, EIP-712 kullanan uygulamaların onları [tüm imza verilerini gösteren](https://rabby.io/) bir cüzdan kullanmaya teşvik etmesi şiddetle tavsiye edilir. Bazı cüzdanlar adresi keser, bu da güvensizdir. Bir saldırgan, aynı başlangıç ve bitiş karakterlerine sahip olan ancak ortası farklı olan bir adres oluşturabilir.

![Screen capture with truncated addresses](./fig-3-truncated-addresses.png)

## Sonuç {#conclusion}

Yukarıdaki güvenlik açıklarına ek olarak, bu eğitimdeki çözümün Ethereum'un ele almamıza yardımcı olabileceği birkaç dezavantajı vardır.

- _Sansür direnci_. Şu anda kullanıcılar sizin sunucunuzu, başkası tarafından kurulan rakip bir sunucuyu kullanabilir veya doğrudan Ethereum'a bağlanabilir, bu da gaz maliyetlerine neden olur. [ERC-4337](https://docs.erc4337.io/#what-is-erc-4337) kullanmak, kullanıcıların işlemlerini geniş bir sunucu havuzuna sunmalarına olanak tanıyarak işlemlerinin sansürlenme olasılığını azaltır.
- _EOA'nın sahip olduğu varlıklar_. Yukarıda belirtildiği gibi, [EIP-7702](https://eip7702.io/), halihazırda bir EOA adresine ait olan varlıkları yönetmek için kullanılabilir. Bunun zorlukları vardır, ancak bazen gereklidir.

Yakın gelecekte bu özellikleri eklemekle ilgili eğitimler yayınlamayı umuyorum.

[Çalışmalarımın daha fazlası için buraya bakın](https://cryptodocguy.pro/).