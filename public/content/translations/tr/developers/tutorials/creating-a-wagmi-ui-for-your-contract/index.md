---
title: "Sözleşmeniz için bir kullanıcı arayüzü oluşturma"
description: "TypeScript, React, Vite ve Wagmi gibi modern bileşenleri kullanarak modern ancak minimal bir kullanıcı arayüzünü inceleyecek ve bir cüzdanı kullanıcı arayüzüne nasıl bağlayacağımızı, bilgi okumak için bir akıllı sözleşmeyi nasıl çağıracağımızı, bir akıllı sözleşmeye nasıl işlem göndereceğimizi ve değişiklikleri belirlemek için bir akıllı sözleşmedeki olayları nasıl izleyeceğimizi öğreneceğiz."
author: Ori Pomerantz
tags: ["TypeScript", "React", "Vite", "Wagmi", "ön yüz"]
skill: beginner
breadcrumb: "WAGMI ile Kullanıcı Arayüzü"
published: 2023-11-01
lang: tr
sidebarDepth: 3
---

Ethereum ekosisteminde ihtiyacımız olan bir özellik buldunuz. Bunu uygulamak için akıllı sözleşmeleri ve hatta belki zincir dışı çalışan bazı ilgili kodları yazdınız. Bu harika! Ne yazık ki, bir kullanıcı arayüzü olmadan hiç kullanıcınız olmayacak ve en son bir web sitesi yazdığınızda insanlar çevirmeli (dial-up) modemler kullanıyordu ve JavaScript henüz yeniydi.

Bu makale sizin için. Programlamayı ve belki biraz JavaScript ile HTML bildiğinizi, ancak kullanıcı arayüzü becerilerinizin paslanmış ve modası geçmiş olduğunu varsayıyorum. Birlikte basit ve modern bir uygulamanın üzerinden geçeceğiz, böylece günümüzde işlerin nasıl yapıldığını göreceksiniz.

## Bu neden önemli {#why-important}

Teorik olarak, insanların sözleşmelerinizle etkileşime girmesi için sadece [Etherscan](https://sepolia.etherscan.io/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA#readContract) veya [Blockscout](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=read_write_contract) kullanmasını sağlayabilirsiniz. Bu, deneyimli Ethereum kullanıcıları için harikadır. Ancak biz [bir milyar insana daha](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion) hizmet etmeye çalışıyoruz. Bu, harika bir kullanıcı deneyimi olmadan gerçekleşmeyecektir ve kullanıcı dostu bir arayüz bunun büyük bir parçasıdır.

## Greeter uygulaması {#greeter-app}

Modern kullanıcı arayüzünün nasıl çalıştığının arkasında pek çok teori vardır ve [bunu açıklayan](https://wagmi.sh/core/getting-started) [pek çok iyi site](https://react.dev/learn/thinking-in-react) bulunur. Bu sitelerin yaptığı iyi işi tekrarlamak yerine, yaparak öğrenmeyi tercih ettiğinizi varsayacağım ve oynayabileceğiniz bir uygulamayla başlayacağım. İşleri halletmek için hâlâ teoriye ihtiyacınız var ve buna da değineceğiz; sadece kaynak dosyaları tek tek inceleyecek ve konulara geldikçe onları tartışacağız.

### Kurulum {#installation}

1. Uygulama [Sepolia](https://sepolia.dev/) test ağını kullanır. Gerekirse, [Sepolia test ETH'si alın](/developers/docs/networks/#sepolia) ve [Sepolia'yı cüzdanınıza ekleyin](https://chainlist.org/chain/11155111).

2. GitHub deposunu klonlayın ve gerekli paketleri kurun.

   ```sh
   git clone https://github.com/qbzzt/260301-modern-ui-web3.git
   cd 260301-modern-ui-web3
   npm install
   ```

3. Uygulama, performans sınırlamaları olan ücretsiz erişim noktalarını kullanır. Bir [Hizmet olarak düğüm (Node as a service)](/developers/docs/nodes-and-clients/nodes-as-a-service/) sağlayıcısı kullanmak istiyorsanız, [`src/wagmi.ts`](#wagmi-ts) içindeki URL'leri değiştirin.

4. Uygulamayı başlatın.

   ```sh
   npm run dev
   ```

5. Uygulama tarafından gösterilen URL'ye gidin. Çoğu durumda bu [http://localhost:5173/](http://localhost:5173/) adresidir.

6. Hardhat'in Greeter'ının değiştirilmiş bir versiyonu olan sözleşme kaynak kodunu [bir blokzincir gezgininde](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract_code) görebilirsiniz.

### Dosya incelemesi {#file-walk-through}

#### `index.html` {#index-html}

Bu dosya, betik dosyasını içe aktaran bu satır dışında standart bir HTML şablonudur.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

Dosya uzantısı, bunun [tür denetimini](https://en.wikipedia.org/wiki/Type_system#Type_checking) destekleyen bir JavaScript uzantısı olan [TypeScript](https://www.typescriptlang.org/) ile yazılmış bir [React bileşeni](https://www.w3schools.com/react/react_components.asp) olduğunu gösterir. TypeScript, JavaScript'e derlenir, böylece onu istemci tarafında kullanabiliriz.

Bu dosya çoğunlukla ilgilenmeniz ihtimaline karşı açıklanmıştır. Genellikle bu dosyayı değil, [`src/App.tsx`](#app-tsx) dosyasını ve onun içe aktardığı dosyaları değiştirirsiniz.

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
```

İhtiyacımız olan kütüphane kodunu içe aktarın.

```tsx
import App from './App.tsx'
```

Uygulamayı uygulayan React bileşenini içe aktarın (aşağıya bakın).

```tsx
import { config } from './wagmi.ts'
```

Blokzincir yapılandırmasını içeren [wagmi](https://wagmi.sh/) yapılandırmasını içe aktarın.

```tsx
const queryClient = new QueryClient()
```

[React Query'nin](https://tanstack.com/query/latest/docs/framework/react/overview) önbellek yöneticisinin yeni bir örneğini oluşturur. Bu nesne şunları depolayacaktır:

- Önbelleğe alınmış RPC çağrıları
- Sözleşme okumaları
- Arka planda yeniden getirme durumu

Önbellek yöneticisine ihtiyacımız var çünkü wagmi v3 dahili olarak React Query kullanır.

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

Kök React bileşenini oluşturun. `render` parametresi, hem HTML hem de JavaScript/TypeScript kullanan bir uzantı dili olan [JSX](https://www.w3schools.com/react/react_jsx.asp)'tir. Buradaki ünlem işareti TypeScript bileşenine şunu söyler: "`document.getElementById('root')` öğesinin `ReactDOM.createRoot` için geçerli bir parametre olacağını bilmiyorsun, ama endişelenme - ben geliştiriciyim ve sana olacağını söylüyorum".

```tsx
  <React.StrictMode>
```

Uygulama [bir `React.StrictMode` bileşeninin](https://react.dev/reference/react/StrictMode) içine giriyor. Bu bileşen, React kütüphanesine geliştirme sırasında yararlı olan ek hata ayıklama kontrolleri eklemesini söyler.

```tsx
    <WagmiProvider config={config}>
```

Uygulama aynı zamanda [bir `WagmiProvider` bileşeninin](https://wagmi.sh/react/api/WagmiProvider) içindedir. [Wagmi (bunu biz yapacağız) kütüphanesi](https://wagmi.sh/), bir Ethereum merkeziyetsiz uygulaması yazmak için React kullanıcı arayüzü tanımlarını [viem kütüphanesi](https://viem.sh/) ile bağlar.

```tsx
      <QueryClientProvider client={queryClient}>
```

Ve son olarak, herhangi bir uygulama bileşeninin önbelleğe alınmış sorguları kullanabilmesi için bir React Query sağlayıcısı ekleyin.

```tsx
        <App />
```

Artık uygulama için kullanıcı arayüzünü fiilen uygulayan bileşene sahip olabiliriz. Bileşenin sonundaki `/>`, XML standardına göre React'e bu bileşenin içinde herhangi bir tanım olmadığını söyler.

```tsx
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
```

Elbette diğer bileşenleri de kapatmalıyız.

#### `src/App.tsx` {#app-tsx}

```tsx
import {
  useConnect,
  useConnection,
  useDisconnect,
  useSwitchChain
} from 'wagmi'

import { useEffect } from 'react'
import { Greeter } from './Greeter'
```

İhtiyacımız olan kütüphaneleri ve [`Greeter` bileşenini](#greeter-tsx) içe aktarın.

```tsx
const SEPOLIA_CHAIN_ID = 11155111
```

Sepolia zincir kimliği (chain ID).

```
function App() {
```

Bu, bir React bileşeni oluşturmanın standart yoludur: işlenmesi (render) gerektiğinde çağrılan bir işlev tanımlayın. Bu işlev tipik olarak TypeScript veya JavaScript kodu içerir ve ardından JSX kodunu döndüren bir `return` ifadesi gelir.

```tsx
  const connection = useConnection()
```

Adres ve `chainId` gibi mevcut bağlantıyla ilgili bilgileri almak için [`useConnection`](https://wagmi.sh/react/api/hooks/useConnection) kullanın.

Geleneksel olarak, React'te `use...` olarak adlandırılan işlevler [kancalardır (hooks)](https://www.w3schools.com/react/react_hooks.asp). Bu işlevler yalnızca bileşene veri döndürmekle kalmaz; aynı zamanda bu veri değiştiğinde bileşenin yeniden işlenmesini (bileşen işlevi tekrar yürütülür ve çıktısı HTML'deki eskisinin yerini alır) sağlarlar.

```tsx
  const { connectors, connect, status, error } = useConnect()
```

Cüzdan bağlantısı hakkında bilgi almak için [`useConnect`](https://wagmi.sh/react/api/hooks/useConnect) kullanın.

```tsx
  const { disconnect } = useDisconnect()
```

[Bu kanca](https://wagmi.sh/react/api/hooks/useDisconnect) bize cüzdan bağlantısını kesme işlevini verir.

```tsx
  const { switchChain } = useSwitchChain()
```

[Bu kanca](https://wagmi.sh/react/api/hooks/useSwitchChain) zincirleri değiştirmemizi sağlar.

```tsx
  useEffect(() => {
```

React kancası [`useEffect`](https://react.dev/reference/react/useEffect), harici bir sistemi senkronize etmek için bir değişkenin değeri her değiştiğinde bir işlev çalıştırmanıza olanak tanır.

```tsx
    if (connection.status === 'connected' &&
        connection.chainId !== SEPOLIA_CHAIN_ID
    ) {
      switchChain({ chainId: SEPOLIA_CHAIN_ID })
    }
```

Bağlıysak ancak Sepolia blokzincirine bağlı değilsek, Sepolia'ya geçin.

```tsx
  }, [connection.status, connection.chainId])
```

Bağlantı durumu veya bağlantı chainId'si her değiştiğinde işlevi yeniden çalıştırın.

```tsx
  return (
    <>
```

Bir React bileşeninin JSX'i tek bir HTML bileşeni döndürmek _zorundadır_. Birden fazla bileşenimiz olduğunda ve hepsini sarmak için bir kapsayıcıya ihtiyaç duymadığımızda, bunları tek bir bileşende birleştirmek için boş bir bileşen (`<> ... </>`) kullanırız.

```tsx
      <h2>Connection</h2>
      <div>
        status: {connection.status}
        <br />
        addresses: {JSON.stringify(connection.addresses)}
        <br />
        chainId: {connection.chainId}
 
</div>
```

Mevcut bağlantı hakkında bilgi sağlayın. JSX içinde `{<expression>}`, ifadeyi JavaScript olarak değerlendirmek anlamına gelir.

```tsx
      {connection.status === 'connected' && (
```

Sözdizimi `{<condition> && <value>} means "if the condition is `true`, evaluate to the value; if it isn't, evaluate to `false`".

Bu, JSX içine if ifadeleri koymanın standart yoludur.

```tsx
        <div>
          <Greeter />
          <hr />
```

JSX, HTML'den daha katı olan XML standardını izler. Bir etiketin karşılık gelen bir bitiş etiketi yoksa, onu sonlandırmak için sonunda bir eğik çizgi (`/`) _olmalıdır_.

Burada bu tür iki etiketimiz var: `<Greeter />` (aslında sözleşmeyle konuşan HTML kodunu içerir) ve [yatay bir çizgi için `<hr />`](https://www.w3schools.com/tags/tag_hr.asp).

```tsx
          <button type="button" onClick={disconnect}>
            Disconnect
          </button>
 
</div>
      )}
```

Kullanıcı bu düğmeye tıklarsa, `disconnect` işlevini çağırın.

```tsx
      {connection.status !== 'connected' && (
```

Eğer bağlı _değilsek_, cüzdana bağlanmak için gerekli seçenekleri gösterin.

```tsx
        <div>
          <h2>Connect</h2>
          {connectors.map((connector) => (
```

`connectors` içinde bir bağlayıcı listemiz var. Bunu görüntülenecek bir JSX düğmeleri listesine dönüştürmek için [`map`](https://www.w3schools.com/jsref/jsref_map.asp) kullanırız.

```tsx
            <button
              key={connector.uid}
```

JSX'te "kardeş" etiketlerin (aynı ebeveynden gelen etiketler) farklı tanımlayıcılara sahip olması gerekir.

```tsx
              onClick={() => connect({ connector })}
              type="button"
            >
              {connector.name}
            </button>
          ))}
```

Bağlayıcı düğmeleri.

```tsx
          <div>{status}</div>
          <div>{error?.message}</div>
 
</div>
      )}
```

Ek bilgi sağlayın. `<variable>?.<field>` ifade sözdizimi JavaScript'e, değişken tanımlanmışsa o alanı değerlendirmesini söyler. Değişken tanımlanmamışsa, bu ifade `undefined` olarak değerlendirilir.

`error.message` ifadesi, hata olmadığında bir istisna (exception) oluşturur. `error?.message` kullanmak bu sorundan kaçınmamızı sağlar.

#### `src/Greeter.tsx` {#greeter-tsx}

Bu dosya, kullanıcı arayüzü işlevselliğinin çoğunu içerir. Normalde birden fazla dosyada bulunacak tanımları içerir, ancak bu bir eğitim olduğu için program, performans veya bakım kolaylığından ziyade ilk seferde anlaşılması kolay olacak şekilde optimize edilmiştir.

```tsx
import {
          useState,
          useEffect,
       } from 'react'
import {  useChainId,
          useAccount,
          useReadContract,
          useWriteContract,
          useWatchContractEvent,
          useSimulateContract
       } from 'wagmi'
```

Bu kütüphane işlevlerini kullanıyoruz. Yine, kullanıldıkları yerlerde aşağıda açıklanmışlardır.

```tsx
import { AddressType } from 'abitype'
```

[`abitype` kütüphanesi](https://abitype.dev/), bize [`AddressType`](https://abitype.dev/config#addresstype) gibi çeşitli Ethereum veri türleri için TypeScript tanımları sağlar.

```tsx
let greeterABI = [
  { "type": "function", "name": "greet", ... },
  { "type": "function", "name": "setGreeting", ... },
  { "type": "event", "name": "SetGreeting", ... },
] as const   // greeterABI
```

`Greeter` sözleşmesi için ABI.
Sözleşmeleri ve kullanıcı arayüzünü aynı anda geliştiriyorsanız, normalde bunları aynı depoya koyar ve Solidity derleyicisi tarafından oluşturulan ABI'yi uygulamanızda bir dosya olarak kullanırsınız. Ancak, sözleşme zaten geliştirilmiş olduğu ve değişmeyeceği için burada buna gerek yoktur.

TypeScript'e bunun _gerçek_ bir sabit olduğunu söylemek için [`as const`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) kullanırız. Normalde, JavaScript'te `const x = {"a": 1}` belirttiğinizde, `x` içindeki değeri değiştirebilirsiniz, sadece ona atama yapamazsınız.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript güçlü bir şekilde türlendirilmiştir (strongly typed). `Greeter` sözleşmesinin farklı zincirlerde dağıtıldığı adresi belirtmek için bu tanımı kullanırız. Anahtar bir sayıdır (chainId) ve değer bir `AddressType`'dir (bir adres).

```tsx
const contractAddrs : AddressPerBlockchainType = {
  // Sepolia
    11155111: '0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA'
}
```

[Sepolia](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract) üzerindeki sözleşmenin adresi.

##### `Timer` bileşeni {#timer-component}

`Timer` bileşeni, belirli bir zamandan bu yana geçen saniye sayısını gösterir. Bu, kullanılabilirlik amaçları için önemlidir. Kullanıcılar bir şey yaptıklarında anında bir tepki beklerler. Blokzincirlerde bu genellikle imkansızdır çünkü bir işlem bir bloğa yerleştirilene kadar hiçbir şey olmaz. Çözümlerden biri, kullanıcının işlemi gerçekleştirmesinden bu yana ne kadar zaman geçtiğini göstermektir, böylece kullanıcı gereken sürenin makul olup olmadığına karar verebilir.

```tsx
type TimerProps = {
  lastUpdate: Date
}
```

`Timer` bileşeni, son eylemin zamanı olan `lastUpdate` adında bir parametre alır.

```tsx
const Timer = ({ lastUpdate }: TimerProps) => {
  const [_, setNow] = useState(new Date())
```

Bileşenin doğru çalışması için bir duruma (bileşene bağlı bir değişken) sahip olmamız ve onu güncellememiz gerekir. Ancak onu okumaya asla ihtiyacımız olmaz, bu yüzden bir değişken oluşturmakla uğraşmayın.

```tsx
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
```

[`setInterval`](https://www.w3schools.com/jsref/met_win_setinterval.asp) işlevi, bir işlevi periyodik olarak çalışacak şekilde zamanlamamızı sağlar. Bu durumda, her saniye. İşlev, durumu güncellemek için `setNow` çağrısı yapar, böylece `Timer` bileşeni yeniden işlenir. Bunu, bileşen her işlendiğinde değil, yalnızca bir kez gerçekleşmesi için boş bir bağımlılık listesiyle [`useEffect`](https://react.dev/reference/react/useEffect) içine sararız.

```tsx
  const secondsSinceUpdate = Math.floor(
    (Date.now() - lastUpdate.getTime()) / 1000
  )

  return (
    <span>{secondsSinceUpdate} seconds ago</span>
  )
}
```

Son güncellemeden bu yana geçen saniye sayısını hesaplayın ve döndürün.

##### `Greeter` bileşeni {#greeter-component}

```tsx
const Greeter = () => {
```

Son olarak, bileşeni tanımlamaya geçiyoruz.

```tsx
  const chainId = useChainId()
  const account = useAccount()
```

[Wagmi](https://wagmi.sh/) sayesinde kullandığımız zincir ve hesap hakkında bilgiler. Bu bir kanca (`use...`) olduğu için, bu bilgi her değiştiğinde bileşen yeniden işlenir.

```tsx
  const greeterAddr = chainId && contractAddrs[chainId] 
```

Zincir bilgimiz yoksa veya bu sözleşmenin olmadığı bir zincirdeysek `undefined` olan Greeter sözleşmesinin adresi.

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet", // Argüman yok
  })
```

[`useReadContract` kancası](https://wagmi.sh/react/api/hooks/useReadContract), [sözleşmenin](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract) `greet` işlevini çağırır.

```tsx
  const [ currentGreeting, setCurrentGreeting ] = 
    useState("Please wait while we fetch the greeting from the blockchain...")
  const [ newGreeting, setNewGreeting ] = useState("")
```

React'in [`useState` kancası](https://www.w3schools.com/react/react_usestate.asp), değeri bileşenin bir işlemesinden diğerine kalıcı olan bir durum değişkeni belirlememizi sağlar. Başlangıç değeri parametredir, bu durumda boş dizedir.

`useState` kancası iki değerli bir liste döndürür:

1. Durum değişkeninin mevcut değeri.
2. Gerektiğinde durum değişkenini değiştirmek için bir işlev. Bu bir kanca olduğu için, her çağrıldığında bileşen yeniden işlenir.

Bu durumda, kullanıcının ayarlamak istediği yeni selamlama için bir durum değişkeni kullanıyoruz.

```tsx
  const [ lastSetterAddress, setLastSetterAddress ] = useState("")
```

Birden fazla kullanıcı aynı sözleşmeyi aynı anda kullanıyorsa, birbirlerinin selamlamalarının üzerine yazabilirler. Bu, kullanıcılara uygulama arızalıymış gibi görünecektir. Uygulama selamlamayı en son kimin ayarladığını gösterirse, kullanıcı bunun başka biri olduğunu ve uygulamanın doğru çalıştığını bilecektir.

```tsx
  const [ status, setStatus ] = useState("")
  const [ statusTime, setStatusTime ] = useState(new Date())
```

Kullanıcılar eylemlerinin anında bir etkiye sahip olduğunu görmeyi severler. Ancak, bir blokzincirde durum böyle değildir. Bu durum değişkenleri, en azından kullanıcılara bir şeyler göstermemizi sağlar, böylece eylemlerinin devam ettiğini bilirler.

```tsx
  useEffect(() => {
    if (readResults.data) {
      setCurrentGreeting(readResults.data)
      setStatus("Greeting fetched from blockchain")
    }
  }, [readResults.data])
```

Yukarıdaki `readResults` veriyi değiştirirse ve yanlış (false) bir değere (örneğin `undefined`) ayarlanmamışsa, mevcut selamlamayı blokzincirden okunanla güncelleyin. Ayrıca durumu da güncelleyin.

```tsx
  useWatchContractEvent({
    address: greeterAddr,
    abi: greeterABI,
    eventName: 'SetGreeting',
    chainId,
```

`SetGreeting` olaylarını dinleyin.

```tsx
    enabled: !!greeterAddr,
```

`!!<value>`, değer `false` ise veya `undefined`, `0` veya boş bir dize gibi yanlış (false) olarak değerlendirilen bir değerse, ifadenin genel olarak `false` olduğu anlamına gelir. Diğer herhangi bir değer için `true` olur. Bu, değerleri boolean'lara dönüştürmenin bir yoludur, çünkü `greeterAddr` yoksa olayları dinlemek istemeyiz.

```tsx
    onLogs: logs => {
      const greetingFromContract = logs[0].args.greeting
      setCurrentGreeting(greetingFromContract)
      setLastSetterAddress(logs[0].args.sender)
      updateStatus("Greeting updated by event")
    },
  })
```

Günlükleri (log) gördüğümüzde (ki bu yeni bir olay gördüğümüzde olur), bu selamlamanın değiştirildiği anlamına gelir. Bu durumda, `currentGreeting` ve `lastSetterAddress` değerlerini yeni değerlerle güncelleyebiliriz. Ayrıca, durum ekranını da güncellemek istiyoruz.

```tsx
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus)
    setStatusTime(new Date())
  }
```

Durumu güncellediğimizde iki şey yapmak istiyoruz:

1. Durum dizesini güncellemek (`status`)
2. Son durum güncelleme zamanını (`statusTime`) şimdi olarak güncellemek.

```tsx
  const greetingChange = (evt) =>
    setNewGreeting(evt.target.value)
```

Bu, yeni selamlama giriş alanındaki değişiklikler için olay işleyicisidir (event handler). `evt` parametresinin türünü belirtebilirdik, ancak TypeScript türü isteğe bağlı bir dildir. Bu işlev yalnızca bir kez, bir HTML olay işleyicisinde çağrıldığı için bunun gerekli olduğunu düşünmüyorum.

```tsx
  const { writeContractAsync } = useWriteContract()
```

Bir sözleşmeye yazma işlevi. [`writeContracts`](https://wagmi.sh/core/api/actions/writeContracts#writecontracts) ile benzerdir, ancak daha iyi durum güncellemeleri sağlar.

```tsx
  const simulation = useSimulateContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [newGreeting],
    account: account.address    
  })
```

İstemci perspektifinden bir blokzincir işlemi gönderme süreci şöyledir:

1. [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas) kullanarak işlemi blokzincirdeki bir düğüme gönderin.
2. Düğümden bir yanıt bekleyin.
3. Yanıt alındığında, kullanıcıdan işlemi cüzdan aracılığıyla imzalamasını isteyin. Bu adım, düğüm yanıtı alındıktan sonra gerçekleşmek _zorundadır_ çünkü kullanıcıya imzalamadan önce işlemin gaz maliyeti gösterilir.
4. Kullanıcının onaylamasını bekleyin.
5. İşlemi bu kez [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction) kullanarak tekrar gönderin.

Adım 2'nin algılanabilir bir zaman alması muhtemeldir, bu süre zarfında kullanıcılar komutlarının kullanıcı arayüzü tarafından alınıp alınmadığını ve neden henüz işlemi imzalamalarının istenmediğini merak edebilirler. Bu, zayıf bir kullanıcı deneyimi (UX) yaratır.

Çözümlerden biri, bir parametre her değiştiğinde `eth_estimateGas` göndermektir. Ardından, kullanıcı işlemi gerçekten göndermek istediğinde (bu durumda **Update greeting** düğmesine basarak), gaz maliyeti bilinir ve kullanıcı cüzdan sayfasını hemen görebilir.

```tsx
  return (
```

Artık nihayet döndürülecek asıl HTML'i oluşturabiliriz.

```tsx
    <>
      <h2>Greeter</h2>
      {currentGreeting}
```

Mevcut selamlamayı gösterin.

```tsx
      {lastSetterAddress && (
        <p>Last updated by {
          lastSetterAddress === account.address ? "you" : lastSetterAddress
        }</p>
      )}
```

Selamlamayı en son kimin ayarladığını biliyorsak, bu bilgiyi görüntüleyin. `Greeter` bu bilginin kaydını tutmaz ve `SetGreeting` olayları için geriye dönüp bakmak istemiyoruz, bu yüzden bunu yalnızca biz çalışırken selamlama değiştirildiğinde alırız.

```tsx
      <hr />      
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />      
      <br />
```

Bu, kullanıcının yeni bir selamlama ayarlayabileceği giriş metni alanıdır. Kullanıcı her tuşa bastığında, `setNewGreeting` öğesini çağıran `greetingChange` öğesini çağırırız. `setNewGreeting`, `useState` öğesinden geldiği için `Greeter` bileşeninin yeniden işlenmesine neden olur. Bu şu anlama gelir:

- Yeni selamlamanın değerini korumak için `value` belirtmemiz gerekir, aksi takdirde varsayılan olan boş dizeye geri döner.
- `simulation` ayrıca `newGreeting` her değiştiğinde güncellenir, bu da doğru selamlama ile bir simülasyon alacağımız anlamına gelir. Bu önemli olabilir çünkü gaz maliyeti, dizenin uzunluğuna bağlı olan çağrı verisinin boyutuna bağlıdır.

```tsx
      <button disabled={!simulation.data}
```

Düğmeyi yalnızca işlemi göndermek için ihtiyacımız olan bilgiye sahip olduğumuzda etkinleştirin.

```tsx
        onClick={async () => {
          updateStatus("Please confirm in wallet...")
```

Durumu güncelleyin. Bu noktada, kullanıcının cüzdanda onaylaması gerekir.

```tsx
          await writeContractAsync(simulation.data.request)
          updateStatus("Transaction sent, waiting for greeting to change...")
        }}
      >
        Update greeting
      </button>

```

`writeContractAsync` yalnızca işlem gerçekten gönderildikten sonra döner. Bu, kullanıcıya işlemin blokzincire dahil edilmek üzere ne kadar süredir beklediğini göstermemizi sağlar.

```tsx
      <h4>Status: {status}</h4>
      <p>Updated <Timer lastUpdate={statusTime} /> </p>
    </>
  )
}
```

Durumu ve güncellenmesinden bu yana ne kadar zaman geçtiğini gösterin.

```
export {Greeter}
```

Bileşeni dışa aktarın.

#### `src/wagmi.ts` {#wagmi-ts}

Son olarak, wagmi ile ilgili çeşitli tanımlar `src/wagmi.ts` içindedir. Burada her şeyi açıklamayacağım, çünkü bunların çoğu değiştirmeniz gerekmeyecek şablon kodlardır.

```ts
import { http, webSocket, createConfig, fallback } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
```

Wagmi yapılandırması, bu uygulama tarafından desteklenen zincirleri içerir. [Mevcut zincirlerin listesini](https://wagmi.sh/core/api/chains) görebilirsiniz.

```ts
  connectors: [
    injected(),
  ],
```

[Bu bağlayıcı](https://wagmi.sh/core/api/connectors/injected), tarayıcıda yüklü bir cüzdanla konuşmamızı sağlar.

```ts
  transports: {
    [sepolia.id]: http()
```

Viem ile birlikte gelen varsayılan HTTP uç noktası yeterince iyidir. Farklı bir URL istiyorsak, `http("https:// hostname ")` veya `webSocket("wss:// hostname ")` kullanabiliriz.

```ts
  },
  multiInjectedProviderDiscovery: false,
})
```

## Başka bir blokzincir ekleme {#add-blockchain}

Bugünlerde pek çok [L2 ölçeklendirme çözümü](https://ethereum.org/layer-2/) var ve viem'in henüz desteklemediği bazılarını desteklemek isteyebilirsiniz. Bunu yapmak için `src/wagmi.ts` dosyasını değiştirirsiniz. Bu talimatlar [Optimism Sepolia'nın](https://chainlist.org/chain/11155420) nasıl ekleneceğini açıklar.

1.  `src/wagmi.ts` dosyasını düzenleyin

    A. Viem'den `defineChain` türünü içe aktarın.

          ```ts
          import { defineChain } from 'viem'
          ```

    B. Ağ tanımını ekleyin. Optimism Sepolia için bunu yapmanıza aslında gerek yoktur, [zaten `viem` içindedir](https://github.com/wevm/viem/blob/main/src/chains/definitions/optimismSepolia.ts), ancak bu şekilde `viem` içinde olmayan bir blokzinciri nasıl ekleyeceğinizi öğrenirsiniz.

          ```ts
          const optimismSepolia = defineChain({
              id: 11_155_420,
              name: 'OP Sepolia',
              nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
              rpcUrls: {
                default: {
                  http: ['https://sepolia.optimism.io'],
                  webSocket: ['wss://optimism-sepolia.drpc.org'],
                },
              },
              blockExplorers: {
                default: {
                  name: 'Blockscout',
                  url: 'https://optimism-sepolia.blockscout.com',
                  apiUrl: 'https://optimism-sepolia.blockscout.com/api',
                }
              },
          })
          ```

    C. Yeni zinciri `createConfig` çağrısına ekleyin.

          ```ts
          export const config = createConfig({
            chains: [sepolia, optimismSepolia],
            connectors: [
              injected(),
            ],
            transports: {
              [optimismSepolia.id]: http(),
              [sepolia.id]: http()
            },
            multiInjectedProviderDiscovery: false,
          })
          ```

2.  Sepolia'ya otomatik geçişi yorum satırı yapmak için `src/App.tsx` dosyasını düzenleyin. Bir üretim sisteminde, muhtemelen desteklediğiniz blokzincirlerin her birine bağlantılar içeren düğmeler gösterirsiniz.

    ```ts
    /*
    useEffect(() => {
      if (connection.status === 'connected' &&
          connection.chainId !== SEPOLIA_CHAIN_ID
      ) {
        switchChain({ chainId: SEPOLIA_CHAIN_ID })
      }
    }, [connection.status, connection.chainId])
    */
    ```

3.  Uygulamanın yeni ağdaki sözleşmelerinizin adresini bildiğinden emin olmak için `src/Greeter.tsx` dosyasını düzenleyin.

    ```ts
    const contractAddrs: AddressPerBlockchainType = {
      // Optimism Sepolia
      11155420: "0x4dd85791923E9294E934271522f63875EAe5806f",

      // Sepolia
      11155111: "0x7143d5c190F048C8d19fe325b748b081903E3BF0",
    }
    ```

4.  Tarayıcınızda.

    A. [ChainList](https://chainlist.org/chain/11155420?testnets=true)'e gidin ve zinciri cüzdanınıza eklemek için tablonun sağ tarafındaki düğmelerden birine tıklayın.

    B. Uygulamada, blokzinciri değiştirmek için **Disconnect** (Bağlantıyı Kes) seçeneğine tıklayın ve ardından yeniden bağlanın. Bunu halletmenin daha güzel yolları vardır, ancak bunlar uygulama değişiklikleri gerektirir.

## Sonuç {#conclusion}

Elbette, `Greeter` için bir kullanıcı arayüzü sağlamak aslında umurunuzda değil. Kendi sözleşmeleriniz için bir kullanıcı arayüzü oluşturmak istiyorsunuz. Kendi uygulamanızı oluşturmak için şu adımları çalıştırın:

1. Bir wagmi uygulaması oluşturmayı belirtin.

   ```sh copy
   npm create wagmi
   ```

2. Devam etmek için `y` yazın.

3. Uygulamayı adlandırın.

4. **React** çerçevesini (framework) seçin.

5. **Vite** varyantını seçin.

Şimdi gidin ve sözleşmelerinizi tüm dünya için kullanılabilir hale getirin.

[Çalışmalarımın daha fazlası için buraya bakın](https://cryptodocguy.pro/).