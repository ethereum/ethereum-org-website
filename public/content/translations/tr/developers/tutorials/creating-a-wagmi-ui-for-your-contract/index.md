---
title: "Sözleşmeniz için bir kullanıcı arayüzü oluşturma"
description: "TypeScript, React, Vite ve Wagmi gibi modern bileşenleri kullanarak modern ama minimal bir kullanıcı arayüzünü inceleyeceğiz ve bir cüzdanı kullanıcı arayüzüne bağlamayı, bilgi okumak için bir akıllı sözleşmeyi çağırmayı, bir akıllı sözleşmeye işlem göndermeyi ve değişiklikleri belirlemek için bir akıllı sözleşmedeki olayları izlemeyi öğreneceğiz."
author: Ori Pomerantz
tags: [ "typescript", "react", "vite", "wagmi", "ön uç" ]
skill: beginner
published: 2023-11-01
lang: tr
sidebarDepth: 3
---

Ethereum ekosisteminde ihtiyaç duyduğumuz bir özelliği buldunuz. Bunu uygulamak için akıllı sözleşmeleri ve hatta zincir dışında çalışan bazı ilgili kodları yazdınız. Bu harika! Maalesef, bir kullanıcı arayüzü olmadan herhangi bir kullanıcınız olmayacak ve son web sitesi yazdığınızda insanlar çevirmeli modem kullanıyordu ve JavaScript yeniydi.

Bu makale sizin için. Programlama bildiğinizi, hatta belki biraz JavaScript ve HTML bildiğinizi, ancak kullanıcı arayüzü becerilerinizin körelmiş ve güncelliğini yitirmiş olduğunu varsayıyorum. Bugünlerde işlerin nasıl yapıldığını görmeniz için birlikte basit ve modern bir uygulamayı inceleyeceğiz.

## Bu neden önemli {#why-important}

Teoride, sözleşmelerinizle etkileşim kurmaları için insanların [Etherscan](https://holesky.etherscan.io/address/0x432d810484add7454ddb3b5311f0ac2e95cecea8#writeContract) veya [Blockscout](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=write_contract) kullanmasını sağlayabilirsiniz. Bu, deneyimli Ethereum'cular için harika olacaktır. Ancak biz [bir milyar insana daha](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion) hizmet vermeye çalışıyoruz. Bu, harika bir kullanıcı deneyimi olmadan gerçekleşmez ve kullanıcı dostu bir arayüz bunun büyük bir parçasıdır.

## Greeter uygulaması {#greeter-app}

Modern bir kullanıcı arayüzünün nasıl çalıştığının arkasında pek çok teori ve [bunu açıklayan](https://wagmi.sh/core/getting-started) [birçok iyi site](https://react.dev/learn/thinking-in-react) var. Bu sitelerin yaptığı güzel işleri tekrarlamak yerine, yaparak öğrenmeyi tercih ettiğinizi varsayacağım ve oynayabileceğiniz bir uygulamayla başlayacağım. İşleri halletmek için yine de teoriye ihtiyacınız var ve buna da geleceğiz - sadece kaynak dosyadan kaynak dosyaya gideceğiz ve karşılaştıkça konuları tartışacağız.

### Kurulum {#installation}

1. Gerekirse, [Holesky blokzincirini](https://chainlist.org/?search=holesky&testnets=true) cüzdanınıza ekleyin ve [test ETH'si alın](https://www.holeskyfaucet.io/).

2. Github deposunu klonlayın.

   ```sh
   git clone https://github.com/qbzzt/20230801-modern-ui.git
   ```

3. Gerekli paketleri yükleyin.

   ```sh
   cd 20230801-modern-ui
   pnpm install
   ```

4. Uygulamayı başlatın.

   ```sh
   pnpm dev
   ```

5. Uygulamanın gösterdiği URL'ye gidin. Çoğu durumda bu [http://localhost:5173/](http://localhost:5173/) adresidir.

6. Sözleşme kaynak kodunu, Hardhat'in Greeter'ının biraz değiştirilmiş bir sürümünü [bir blokzincir gezgininde](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contract) görebilirsiniz.

### Dosya incelemesi {#file-walk-through}

#### `index.html` {#index-html}

Bu dosya, betik dosyasını içeri aktaran bu satır dışında standart bir HTML basmakalıp kodudur.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

Dosya uzantısı bize bu dosyanın, [tür denetimini](https://en.wikipedia.org/wiki/Type_system#Type_checking) destekleyen bir JavaScript uzantısı olan [TypeScript](https://www.typescriptlang.org/) ile yazılmış bir [React bileşeni](https://www.w3schools.com/react/react_components.asp) olduğunu söyler. TypeScript, JavaScript'e derlenir, bu nedenle istemci tarafında yürütme için kullanabiliriz.

```tsx
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import { chains, config } from './wagmi'
```

İhtiyacımız olan kütüphane kodunu içe aktarın.

```tsx
import { App } from './App'
```

Uygulamayı uygulayan React bileşenini içe aktarın (aşağıya bakın).

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

Kök React bileşenini oluşturun. `render` parametresi, hem HTML hem de JavaScript/TypeScript kullanan bir uzantı dili olan [JSX](https://www.w3schools.com/react/react_jsx.asp)'tir. Buradaki ünlem işareti, TypeScript bileşenine şunu söyler: "`document.getElementById('root')` ifadesinin `ReactDOM.createRoot` için geçerli bir parametre olacağını bilmiyorsun, ama endişelenme - ben geliştiriciyim ve sana olacağını söylüyorum".

```tsx
  <React.StrictMode>
```

Uygulama, [bir `React.StrictMode` bileşeninin](https://react.dev/reference/react/StrictMode) içine giriyor. Bu bileşen, React kütüphanesine, geliştirme sırasında yararlı olan ek hata ayıklama kontrolleri eklemesini söyler.

```tsx
    <WagmiConfig config={config}>
```

Uygulama ayrıca [bir `WagmiConfig` bileşeninin](https://wagmi.sh/react/api/WagmiProvider) içindedir. [wagmi (başaracağız) kütüphanesi](https://wagmi.sh/), bir Ethereum merkeziyetsiz uygulaması yazmak için React UI tanımlarını [viem kütüphanesi](https://viem.sh/) ile birleştirir.

```tsx
      <RainbowKitProvider chains={chains}>
```

Ve son olarak, [bir `RainbowKitProvider` bileşeni](https://www.rainbowkit.com/). Bu bileşen, oturum açmayı ve cüzdan ile uygulama arasındaki iletişimi yönetir.

```tsx
        <App />
```

Şimdi, kullanıcı arayüzünü gerçekten uygulayan uygulama bileşenine sahip olabiliriz. Bileşenin sonundaki `/>`, XML standardına göre bu bileşenin içinde herhangi bir tanım olmadığını React'e bildirir.

```tsx
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
```

Elbette diğer bileşenleri de kapatmamız gerekiyor.

#### `src/App.tsx` {#app-tsx}

```tsx
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Greeter } from './components/Greeter'

export function App() {
```

Bu, bir React bileşeni oluşturmanın standart yoludur - her işlenmesi gerektiğinde çağrılan bir işlev tanımlayın. Bu işlevin genellikle en üstünde TypeScript veya JavaScript kodu bulunur, ardından JSX kodunu döndüren bir `return` ifadesi gelir.

```tsx
  const { isConnected } = useAccount()
```

Burada, bir cüzdan aracılığıyla bir blokzincire bağlı olup olmadığımızı kontrol etmek için [`useAccount`](https://wagmi.sh/react/api/hooks/useAccount) kullanıyoruz.

Geleneksel olarak, React'ta `use...` olarak adlandırılan işlevler, bir tür veri döndüren [kancalardır](https://www.w3schools.com/react/react_hooks.asp). Bu tür kancaları kullandığınızda, bileşeniniz yalnızca verileri almakla kalmaz, aynı zamanda bu veriler değiştiğinde bileşen güncellenmiş bilgilerle yeniden oluşturulur.

```tsx
  return (
    <>
```

Bir React bileşeninin JSX'i tek bir bileşen döndürmek _zorundadır_. Birden çok bileşenimiz olduğunda ve bunları "doğal olarak" saran bir şeyimiz olmadığında, boş bir bileşen kullanırız (`<> ...` </>`) onları tek bir bileşen haline getirmek için.

```tsx
      <h1>Greeter</h1>
      <ConnectButton />
```

[`ConnectButton` bileşenini](https://www.rainbowkit.com/docs/connect-button) RainbowKit'ten alıyoruz. Bağlı olmadığımızda, cüzdanları açıklayan ve hangisini kullandığınızı seçmenize izin veren bir kalıp açan bir `Cüzdan Bağla` düğmesi verir. Bağlandığımızda, kullandığımız blokzinciri, hesap adresimizi ve ETH bakiyemizi görüntüler. Ağı değiştirmek veya bağlantıyı kesmek için bu ekranları kullanabiliriz.

```tsx
      {isConnected && (
```

Gerçek JavaScript'i (veya JavaScript'e derlenecek TypeScript'i) bir JSX'e eklememiz gerektiğinde, parantez (`{}`) kullanırız.

`a && b` sözdizimi, [`a ?` için kısadır. b : a`](https://www.w3schools.com/react/react_es6_ternary.asp). Yani, `a`doğruysa`b`olarak değerlendirilir, aksi takdirde`a` olarak değerlendirilir (`false`, `0` vb. olabilir). Bu, React'e bir bileşenin yalnızca belirli bir koşul yerine getirildiğinde görüntülenmesi gerektiğini söylemenin kolay bir yoludur.

Bu durumda, kullanıcıyı `Greeter` yalnızca kullanıcı bir blokzincire bağlıysa göstermek istiyoruz.

```tsx
          <Greeter />
      )}
    </>
  )
}
```

#### `src/components/Greeter.tsx` {#greeter-tsx}

Bu dosya, kullanıcı arayüzü işlevselliğinin çoğunu içerir. Normalde birden çok dosyada olacak tanımları içerir, ancak bu bir öğretici olduğu için program, performans veya bakım kolaylığından ziyade ilk seferde anlaşılması kolay olacak şekilde optimize edilmiştir.

```tsx
import { useState, ChangeEventHandler } from 'react'
import {  useNetwork,
          useReadContract,
          usePrepareContractWrite,
          useContractWrite,
          useContractEvent
        } from 'wagmi'
```

Bu kütüphane fonksiyonlarını kullanıyoruz. Yine, kullanıldıkları yerde aşağıda açıklanmıştır.

```tsx
import { AddressType } from 'abitype'
```

[`abitype` kütüphanesi](https://abitype.dev/) bize [`AddressType`](https://abitype.dev/config#addresstype) gibi çeşitli Ethereum veri türleri için TypeScript tanımları sağlar.

```tsx
let greeterABI = [
  .
  .
  .
] as const   // greeterABI
```

`Greeter` sözleşmesi için ABI.
Sözleşmeleri ve kullanıcı arayüzünü aynı anda geliştiriyorsanız, normalde bunları aynı depoya koyar ve Solidity derleyicisi tarafından oluşturulan ABI'yi uygulamanızda bir dosya olarak kullanırsınız. Ancak, sözleşme zaten geliştirildiği ve değişmeyeceği için burada bu gerekli değildir.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript güçlü bir şekilde yazılmıştır. `Greeter` sözleşmesinin farklı zincirlerde dağıtıldığı adresi belirtmek için bu tanımı kullanırız. Anahtar bir sayıdır (chainId) ve değer bir `AddressType`'tır (bir adres).

```tsx
const contractAddrs: AddressPerBlockchainType = {
  // Holesky
  17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',

  // Sepolia
  11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
}
```

Desteklenen iki ağdaki sözleşmenin adresi: [Holesky](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contact_code) ve [Sepolia](https://eth-sepolia.blockscout.com/address/0x7143d5c190F048C8d19fe325b748b081903E3BF0?tab=contact_code).

Not: Aslında Redstone Holesky için üçüncü bir tanım var, aşağıda açıklanacaktır.

```tsx
type ShowObjectAttrsType = {
  name: string,
  object: any
}
```

Bu tür, `ShowObject` bileşenine (daha sonra açıklanacaktır) bir parametre olarak kullanılır. Hata ayıklama amacıyla görüntülenen nesnenin adını ve değerini içerir.

```tsx
type ShowGreetingAttrsType = {
  greeting: string | undefined
}
```

Herhangi bir zamanda, ya selamlamanın ne olduğunu biliyor olabiliriz (çünkü onu blokzincirden okuduk) ya da bilmiyor olabiliriz (çünkü henüz almadık). Bu nedenle, bir dize veya hiçbir şey olabilen bir türe sahip olmak yararlıdır.

##### `Greeter` bileşeni {#greeter-component}

```tsx
const Greeter = () => {
```

Sonunda bileşeni tanımlayacağız.

```tsx
  const { chain } = useNetwork()
```

[wagmi](https://wagmi.sh/react/hooks/useNetwork) sayesinde kullandığımız zincir hakkındaki bilgiler.
Bu bir kanca (`use...`) olduğu için, bu bilgi her değiştiğinde bileşen yeniden çizilir.

```tsx
  const greeterAddr = chain && contractAddrs[chain.id]
```

Greeter sözleşmesinin adresi, zincire göre değişir (ve zincir bilgimiz yoksa veya bu sözleşmenin olmadığı bir zincirdeysek `undefined` olur).

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet" , // No arguments
    watch: true
  })
```

[`useReadContract` kancası](https://wagmi.sh/react/api/hooks/useReadContract), bir sözleşmeden bilgi okur. Kullanıcı arayüzünde `readResults`'ı genişleterek tam olarak hangi bilgileri döndürdüğünü görebilirsiniz. Bu durumda, selamlama değiştiğinde bilgilendirilmek için bakmaya devam etmesini istiyoruz.

**Not:** Selamlamanın ne zaman değiştiğini bilmek ve bu şekilde güncelleme yapmak için [`setGreeting` olaylarını](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=logs) dinleyebiliriz. Ancak, daha verimli olsa da, her durumda geçerli olmayacaktır. Kullanıcı farklı bir zincire geçtiğinde selamlama da değişir, ancak bu değişikliğe bir olay eşlik etmez. Kodun bir kısmı olayları dinlerken, diğeri zincir değişikliklerini belirlemek için kullanılabilir, ancak bu, sadece [`watch` parametresini](https://wagmi.sh/react/api/hooks/useReadContract#watch-optional) ayarlamaktan daha karmaşık olurdu.

```tsx
  const [ newGreeting, setNewGreeting ] = useState("")
```

React'in [`useState` kancası](https://www.w3schools.com/react/react_usestate.asp), değeri bileşenin bir oluşturulmasından diğerine devam eden bir durum değişkeni belirtmemizi sağlar. Başlangıç değeri, bu durumda boş dize olan parametredir.

`useState` kancası iki değer içeren bir liste döndürür:

1. Durum değişkeninin geçerli değeri.
2. Gerektiğinde durum değişkenini değiştirmek için bir işlev. Bu bir kanca olduğu için, her çağrıldığında bileşen yeniden oluşturulur.

Bu durumda, kullanıcının ayarlamak istediği yeni selamlama için bir durum değişkeni kullanıyoruz.

```tsx
  const greetingChange : ChangeEventHandler<HTMLInputElement> = (evt) =>
    setNewGreeting(evt.target.value)
```

Bu, yeni selamlama giriş alanı değiştiğinde olay işleyicisidir. Tür, [`ChangeEventHandler<HTMLInputElement>`](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/), bunun bir HTML giriş öğesinin değer değişikliği için bir işleyici olduğunu belirtir. `<HTMLInputElement>` kısmı, bunun bir [genel tür](https://www.w3schools.com/typescript/typescript_basic_generics.php) olması nedeniyle kullanılır.

```tsx
  const preparedTx = usePrepareContractWrite({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [ newGreeting ]
  })
  const workingTx = useContractWrite(preparedTx.config)
```

Bu, istemci perspektifinden bir blokzincir işlemini gönderme sürecidir:

1. [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas) kullanarak işlemi blokzincirdeki bir düğüme gönderin.
2. Düğümden bir yanıt bekleyin.
3. Yanıt alındığında, kullanıcıdan işlemi cüzdan aracılığıyla imzalamasını isteyin. Bu adım, düğüm yanıtı alındıktan sonra gerçekleşmek _zorundadır_, çünkü kullanıcıya işlemi imzalamadan önce işlemin gaz maliyeti gösterilir.
4. Kullanıcının onaylamasını bekleyin.
5. İşlemi bu kez [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction) kullanarak tekrar gönderin.

Adım 2'nin algılanabilir bir süre alması muhtemeldir; bu süre zarfında kullanıcılar, komutlarının kullanıcı arayüzü tarafından gerçekten alınıp alınmadığını ve neden zaten işlemi imzalamaları istenmediğini merak ederler. Bu kötü bir kullanıcı deneyimi (UX) yaratır.

Çözüm, [hazırlık kancalarını](https://wagmi.sh/react/prepare-hooks) kullanmaktır. Bir parametre her değiştiğinde, düğüme hemen `eth_estimateGas` isteğini gönderin. Ardından, kullanıcı işlemi gerçekten göndermek istediğinde (bu durumda **Selamlamayı güncelle**'ye basarak), gaz maliyeti bilinir ve kullanıcı cüzdan sayfasını hemen görebilir.

```tsx
  return (
```

Şimdi nihayet döndürülecek gerçek HTML'yi oluşturabiliriz.

```tsx
    <>
      <h2>Greeter</h2>
      {
        !readResults.isError && !readResults.isLoading &&
          <ShowGreeting greeting={readResults.data} />
      }
      <hr />
```

Bir `ShowGreeting` bileşeni oluşturun (aşağıda açıklanmıştır), ancak yalnızca selamlama blokzincirden başarıyla okunduysa.

```tsx
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />
```

Bu, kullanıcının yeni bir selamlama ayarlayabileceği giriş metin alanıdır. Kullanıcı bir tuşa her bastığında, `setNewGreeting`'i çağıran `greetingChange`'i çağırırız. `setNewGreeting`, `useState` kancasından geldiği için, `Greeter` bileşeninin yeniden oluşturulmasına neden olur. Bunun anlamı şudur:

- Yeni selamlamanın değerini korumak için `değer` belirtmemiz gerekiyor, çünkü aksi takdirde varsayılan olan boş dizeye geri dönerdi.
- `usePrepareContractWrite`, `newGreeting` her değiştiğinde çağrılır, bu da hazırlanan işlemde her zaman en son `newGreeting`'e sahip olacağı anlamına gelir.

```tsx
      <button disabled={!workingTx.write}
              onClick={workingTx.write}
      >
        Selamlamayı güncelle
      </button>
```

`workingTx.write` yoksa, selamlama güncellemesini göndermek için gerekli bilgileri hâlâ bekliyoruz demektir, bu nedenle düğme devre dışı bırakılır. Bir `workingTx.write` değeri varsa, bu, işlemi göndermek için çağrılacak fonksiyondur.

```tsx
      <hr />
      <ShowObject name="readResults" object={readResults} />
      <ShowObject name="preparedTx" object={preparedTx} />
      <ShowObject name="workingTx" object={workingTx} />
    </>
  )
}
```

Son olarak, ne yaptığımızı görmenize yardımcı olması için kullandığımız üç nesneyi gösterin:

- `readResults`
- `preparedTx`
- `workingTx`

##### `ShowGreeting` bileşeni {#showgreeting-component}

Bu bileşen gösterir

```tsx
const ShowGreeting = (attrs : ShowGreetingAttrsType) => {
```

Bir bileşen işlevi, bileşenin tüm özniteliklerini içeren bir parametre alır.

```tsx
  return <b>{attrs.greeting}</b>
}
```

##### `ShowObject` bileşeni {#showobject-component}

Bilgi amaçlı olarak, önemli nesneleri (`readResults` selamlamayı okumak için ve `preparedTx` ve `workingTx` oluşturduğumuz işlemler için) göstermek için `ShowObject` bileşenini kullanırız.

```tsx
const ShowObject = (attrs: ShowObjectAttrsType ) => {
  const keys = Object.keys(attrs.object)
  const funs = keys.filter(k => typeof attrs.object[k] == "function")
  return <>
    <details>
```

Kullanıcı arayüzünü tüm bilgilerle doldurmak istemiyoruz, bu nedenle bunları görüntülemeyi veya kapatmayı mümkün kılmak için bir [`ayrıntılar`](https://www.w3schools.com/tags/tag_details.asp) etiketi kullanıyoruz.

```tsx
      <summary>{attrs.name}</summary>
      <pre>
        {JSON.stringify(attrs.object, null, 2)}
```

Alanların çoğu [`JSON.stringify`](https://www.w3schools.com/js/js_json_stringify.asp) kullanılarak görüntülenir.

```tsx
      </pre>
      { funs.length > 0 &&
        <>
          Functions:
          <ul>
```

İstisna, [JSON standardının](https://www.json.org/json-en.html) bir parçası olmayan işlevlerdir, bu nedenle ayrı olarak görüntülenmeleri gerekir.

```tsx
          {funs.map((f, i) =>
```

JSX içinde, `{` küme parantezleri `}` içindeki kod, JavaScript olarak yorumlanır. Daha sonra, `(` normal parantezler `)` içindeki kod, tekrar JSX olarak yorumlanır.

```tsx
           (<li key={i}>{f}</li>)
                )}
```

React, [DOM Ağacındaki](https://www.w3schools.com/js/js_htmldom.asp) etiketlerin ayrı tanımlayıcılara sahip olmasını gerektirir. Bu, aynı etiketin alt öğelerinin (bu durumda, [sırasız liste](https://www.w3schools.com/tags/tag_ul.asp)) farklı `anahtar` özniteliklerine ihtiyaç duyduğu anlamına gelir.

```tsx
          </ul>
        </>
      }
    </details>
  </>
}
```

Çeşitli HTML etiketlerini sonlandırın.

##### Son `export` {#the-final-export}

```tsx
export { Greeter }
```

`Greeter` bileşeni, uygulama için dışa aktarmamız gereken bileşendir.

#### `src/wagmi.ts` {#wagmi-ts}

Son olarak, WAGMI ile ilgili çeşitli tanımlar `src/wagmi.ts` içindedir. Burada her şeyi açıklamayacağım, çünkü çoğu değiştirmeniz gerekmeyecek basmakalıp bir koddur.

Buradaki kod, [github'daki](https://github.com/qbzzt/20230801-modern-ui/blob/main/src/wagmi.ts) kodla tam olarak aynı değil, çünkü makalenin ilerleyen bölümlerinde başka bir zincir ekliyoruz ([Redstone Holesky](https://redstone.xyz/docs/network-info)).

```ts
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { holesky, sepolia } from 'wagmi/chains'
```

Uygulamanın desteklediği blokzincirleri içe aktarın. Desteklenen zincirlerin listesini [viem github'da](https://github.com/wagmi-dev/viem/tree/main/src/chains/definitions) görebilirsiniz.

```ts
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = 'c96e690bb92b6311e8e9b2a6a22df575'
```

[WalletConnect](https://walletconnect.com/) kullanabilmek için uygulamanız için bir proje kimliğine ihtiyacınız var. [cloud.walletconnect.com](https://cloud.walletconnect.com/sign-in) adresinden alabilirsiniz.

```ts
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [ holesky, sepolia ],
  [
    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'My wagmi + RainbowKit App',
  chains,
  projectId: walletConnectProjectId,
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export { chains }
```

### Başka bir blokzincir ekleme {#add-blockchain}

Bu günlerde çok sayıda [L2 ölçeklendirme çözümü](/layer-2/) var ve viem'in henüz desteklemediği bazılarını desteklemek isteyebilirsiniz. Bunu yapmak için `src/wagmi.ts` dosyasını değiştirin. Bu talimatlar, [Redstone Holesky](https://redstone.xyz/docs/network-info) nasıl ekleneceğini açıklar.

1. Viem'den `defineChain` türünü içe aktarın.

   ```ts
   import { defineChain } from 'viem'
   ```

2. Ağ tanımını ekleyin.

   ```ts
   const redstoneHolesky = defineChain({
      id: 17_001,
      name: 'Redstone Holesky',
      network: 'redstone-holesky',
      nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
      },
      rpcUrls: {
        default: {
          http: ['https://rpc.holesky.redstone.xyz'],
          webSocket: ['wss://rpc.holesky.redstone.xyz/ws'],
      },
      public: {
          http: ['https://rpc.holesky.redstone.xyz'],
          webSocket: ['wss://rpc.holesky.redstone.xyz/ws'],
        },
      },
      blockExplorers: {
        default: { name: 'Explorer', url: 'https://explorer.holesky.redstone.xyz' },
      },
   })
   ```

3. Yeni zinciri `configureChains` çağrısına ekleyin.

   ```ts
    const { chains, publicClient, webSocketPublicClient } = configureChains(
      [ holesky, sepolia, redstoneHolesky ],
      [ publicProvider(), ],
    )
   ```

4. Uygulamanın yeni ağdaki sözleşmelerinizin adresini bildiğinden emin olun. Bu durumda, `src/components/Greeter.tsx` dosyasını değiştiriyoruz:

    ```ts
    const contractAddrs : AddressPerBlockchainType = {
      // Holesky
      17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',
    
      // Redstone Holesky
      17001: '0x4919517f82a1B89a32392E1BF72ec827ba9986D3',
    
      // Sepolia
      11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
    }
    ```

## Sonuç {#conclusion}

Elbette, `Greeter` için bir kullanıcı arayüzü sağlamakla gerçekten ilgilenmiyorsunuz. Kendi sözleşmeleriniz için bir kullanıcı arayüzü oluşturmak istiyorsunuz. Kendi uygulamanızı oluşturmak için şu adımları uygulayın:

1. Bir wagmi uygulaması oluşturmayı belirtin.

   ```sh copy
   pnpm create wagmi
   ```

2. Uygulamayı adlandırın.

3. **React** çerçevesini seçin.

4. **Vite** varyantını seçin.

5. [Rainbow kit ekleyebilirsiniz](https://www.rainbowkit.com/docs/installation#manual-setup).

Şimdi gidin ve sözleşmelerinizi tüm dünyada kullanılabilir hale getirin.

[Çalışmalarımdan daha fazlası için buraya bakın](https://cryptodocguy.pro/).

