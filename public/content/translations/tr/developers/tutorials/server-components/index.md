---
title: "Web3 uygulamaları için sunucu bileşenleri ve temsilciler"
description: "Bu öğreticiyi okuduktan sonra, bir blokzincirdeki olayları dinleyen ve kendi işlemleriyle buna göre yanıt veren TypeScript sunucuları yazabileceksiniz. Bu, merkezi uygulamalar (sunucu bir hata noktası olduğu için) yazmanıza olanak tanıyacak, ancak web3 varlıklarıyla etkileşime girebilecektir. Aynı teknikler, döngüde bir insan olmadan zincir içi olaylara yanıt veren bir temsilci yazmak için de kullanılabilir."
author: Ori Pomerantz
lang: tr
tags: ["temsilci", "sunucu", "zincir dışı", "dapp'ler"]
skill: beginner
breadcrumb: "Sunucu bileşenleri"
published: 2024-07-15
---

## Giriş {#introduction}

Çoğu durumda, merkeziyetsiz bir uygulama (dapp) yazılımı dağıtmak için bir sunucu kullanır, ancak asıl etkileşimin tamamı istemci (genellikle web tarayıcısı) ile Blokzincir arasında gerçekleşir.

![Normal interaction between web server, client, and blockchain](./fig-1.svg)

Ancak, bir uygulamanın bağımsız olarak çalışan bir sunucu bileşenine sahip olmaktan fayda sağlayacağı bazı durumlar vardır. Böyle bir sunucu, olaylara ve bir API gibi diğer kaynaklardan gelen isteklere işlemler göndererek yanıt verebilir.

![The interaction with the addition of a server](./fig-2.svg)

Böyle bir sunucunun yerine getirebileceği birkaç olası görev vardır.

- Gizli durum tutucusu. Oyunlarda, oyunun bildiği tüm bilgilerin oyunculara açık olmaması genellikle yararlıdır. Ancak, _Blokzincir üzerinde sır yoktur_, Blokzincirde bulunan herhangi bir bilgiyi herkesin anlaması kolaydır. Bu nedenle, oyun durumunun bir kısmının gizli tutulması gerekiyorsa, başka bir yerde saklanması (ve muhtemelen bu durumun etkilerinin [sıfır bilgi ispatları](/zero-knowledge-proofs) kullanılarak doğrulanması) gerekir.

- Merkezi kâhin. Riskler yeterince düşükse, çevrim içi bazı bilgileri okuyan ve ardından bunları Zincire gönderen harici bir sunucu, bir [kâhin](/developers/docs/oracles/) olarak kullanmak için yeterince iyi olabilir.

- Temsilci. Blokzincir üzerinde onu etkinleştirecek bir işlem olmadan hiçbir şey olmaz. Bir sunucu, fırsat ortaya çıktığında [arbitraj](/developers/docs/mev/#mev-examples-dex-arbitrage) gibi eylemleri gerçekleştirmek için bir kullanıcı adına hareket edebilir.

## Örnek program {#sample-program}

Örnek bir sunucuyu [GitHub'da](https://github.com/qbzzt/20240715-server-component) görebilirsiniz. Bu sunucu, Hardhat'in Greeter'ının değiştirilmiş bir versiyonu olan [bu Sözleşmeden](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code) gelen olayları dinler. Selamlama değiştirildiğinde, onu eski haline getirir.

Çalıştırmak için:

1. Depoyu klonlayın.

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. Gerekli paketleri yükleyin. Eğer henüz sahip değilseniz, [önce Node'u yükleyin](https://nodejs.org/en/download/package-manager).

   ```sh copy
   npm install
   ```

3. Holesky test ağında ETH'si olan bir Hesabın özel anahtarını belirtmek için `.env` dosyasını düzenleyin. Holesky'de ETH'niz yoksa, [bu musluğu kullanabilirsiniz](https://holesky-faucet.pk910.de/).

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <private key goes here>
   ```

4. Sunucuyu başlatın.

   ```sh copy
   npm start
   ```

5. [Bir blok gezginine](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract) gidin ve özel anahtara sahip olandan farklı bir Adres kullanarak selamlamayı değiştirin. Selamlamanın otomatik olarak eski haline getirildiğini görün.

### Nasıl çalışır? {#how-it-works}

Bir sunucu bileşeninin nasıl yazılacağını anlamanın en kolay yolu, örnek üzerinden satır satır gitmektir.

#### `src/app.ts` {#src-app-ts}

Programın büyük çoğunluğu [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts) içinde yer almaktadır.

##### Ön koşul nesnelerini oluşturma

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

Bunlar ihtiyacımız olan [Viem](https://viem.sh/) varlıkları, işlevleri ve [`Address` türüdür](https://viem.sh/docs/glossary/types#address). Bu sunucu, JavaScript'in onu [sıkı tipli (strongly typed)](https://en.wikipedia.org/wiki/Strong_and_weak_typing) yapan bir uzantısı olan [TypeScript](https://www.typescriptlang.org/) ile yazılmıştır.

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[Bu işlev](https://viem.sh/docs/accounts/privateKey), bir özel anahtara karşılık gelen Adres de dahil olmak üzere Cüzdan bilgilerini oluşturmamızı sağlar.

```typescript
import { holesky } from "viem/chains"
```

Viem'de bir Blokzincir kullanmak için tanımını içe aktarmanız gerekir. Bu durumda, [Holesky](https://github.com/eth-clients/holesky) test Blokzincirine bağlanmak istiyoruz.

```typescript
// .env içindeki tanımları process.env'ye bu şekilde ekliyoruz.
import * as dotenv from "dotenv"
dotenv.config()
```

`.env` dosyasını ortama bu şekilde okuruz. Buna özel anahtar için ihtiyacımız var (daha sonrasına bakın).

```typescript
const greeterAddress : Address = "0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6"
const greeterABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
         .
         .
         .
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "name": "setGreeting",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const
```

Bir Sözleşmeyi kullanmak için Adresine ve onun [ABI](/glossary/#abi)'sine ihtiyacımız var. Burada her ikisini de sağlıyoruz.

JavaScript'te (ve dolayısıyla TypeScript'te) bir sabite yeni bir değer atayamazsınız, ancak içinde saklanan nesneyi _değiştirebilirsiniz_. `as const` son ekini kullanarak TypeScript'e listenin kendisinin sabit olduğunu ve değiştirilemeyeceğini söylüyoruz.

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

Bir Viem [genel istemcisi (public client)](https://viem.sh/docs/clients/public.html) oluşturun. Genel istemcilerin ekli bir özel anahtarı yoktur ve bu nedenle işlem gönderemezler. [`view` işlevlerini](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) çağırabilir, Hesap bakiyelerini okuyabilir vb.

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

Ortam değişkenleri [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env) içinde mevcuttur. Ancak, TypeScript sıkı tiplidir. Bir ortam değişkeni herhangi bir dize veya boş olabilir, bu nedenle bir ortam değişkeninin türü `string | undefined` şeklindedir. Ancak, bir anahtar Viem'de `0x${string}` (`0x` ve ardından bir dize) olarak tanımlanır. Burada TypeScript'e `PRIVATE_KEY` ortam değişkeninin bu türde olacağını söylüyoruz. Eğer değilse, bir çalışma zamanı hatası alırız.

[`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) işlevi daha sonra tam bir Hesap nesnesi oluşturmak için bu özel anahtarı kullanır.

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

Ardından, bir [Cüzdan istemcisi](https://viem.sh/docs/clients/wallet) oluşturmak için Hesap nesnesini kullanırız. Bu istemcinin bir özel anahtarı ve bir Adresi vardır, bu nedenle işlem göndermek için kullanılabilir.

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

Artık tüm ön koşullara sahip olduğumuza göre, nihayet bir [Sözleşme örneği](https://viem.sh/docs/contract/getContract) oluşturabiliriz. Zincir içi Sözleşme ile iletişim kurmak için bu Sözleşme örneğini kullanacağız.

##### Blokzincirden okuma

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

Salt okunur olan Sözleşme işlevleri ([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) ve [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)) `read` altında mevcuttur. Bu durumda, selamlamayı döndüren [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217) işlevine erişmek için kullanırız.

JavaScript tek iş parçacıklıdır, bu nedenle uzun süren bir işlemi başlattığımızda [bunu eşzamansız (asenkron) olarak yaptığımızı belirtmemiz](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE) gerekir. Blokzinciri çağırmak, salt okunur bir işlem için bile olsa, bilgisayar ile bir Blokzincir Düğümü arasında gidiş-dönüş gerektirir. Bu nedenle burada kodun sonuç için `await` (beklemesi) gerektiğini belirtiyoruz.

Bunun nasıl çalıştığıyla ilgileniyorsanız [buradan okuyabilirsiniz](https://www.w3schools.com/js/js_promise.asp), ancak pratik anlamda bilmeniz gereken tek şey, uzun süren bir işlem başlatırsanız sonuçları `await` ile beklemeniz gerektiği ve bunu yapan herhangi bir işlevin `async` olarak bildirilmesi gerektiğidir.

##### İşlem gönderme

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

Bu, selamlamayı değiştiren bir işlem göndermek için çağırdığınız işlevdir. Bu uzun bir işlem olduğundan, işlev `async` olarak bildirilir. Dahili uygulama nedeniyle, herhangi bir `async` işlevinin bir `Promise` nesnesi döndürmesi gerekir. Bu durumda `Promise<any>`, `Promise` içinde tam olarak neyin döndürüleceğini belirtmediğimiz anlamına gelir.

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

Sözleşme örneğinin `write` alanı, [`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862) gibi Blokzincir durumuna yazan (bir işlem gönderilmesini gerektiren) tüm işlevlere sahiptir. Varsa parametreler bir liste olarak sağlanır ve işlev işlemin hash'ini döndürür.

```typescript
    console.log(`Working on a fix, see https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

İşlemin hash'ini (görüntülemek için blok gezginine giden bir URL'nin parçası olarak) bildirin ve döndürün.

##### Olaylara yanıt verme

```typescript
greeter.watchEvent.SetGreeting({
```

[`watchEvent` işlevi](https://viem.sh/docs/actions/public/watchEvent), bir olay yayınlandığında çalıştırılacak bir işlevi belirtmenizi sağlar. Yalnızca bir tür olayla ilgileniyorsanız (bu durumda `SetGreeting`), kendinizi o olay türüyle sınırlamak için bu sözdizimini kullanabilirsiniz.

```typescript
    onLogs: logs => {
```

`onLogs` işlevi, Günlük girişleri olduğunda çağrılır. Ethereum'da "Günlük" ve "olay" genellikle birbirinin yerine kullanılabilir.

```typescript
console.log(
  `Address ${logs[0].args.sender} changed the greeting to ${logs[0].args.greeting}`
)
```

Birden fazla olay olabilir, ancak basitlik adına yalnızca ilkiyle ilgileniyoruz. `logs[0].args`, olayın argümanlarıdır, bu durumda `sender` ve `greeting`.

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} insists on it being Hello!`)
    }
})
```

Gönderen bu sunucu _değilse_, selamlamayı değiştirmek için `setGreeting` kullanın.

#### `package.json` {#package-json}

[Bu dosya](https://github.com/qbzzt/20240715-server-component/blob/main/package.json) [Node.js](https://nodejs.org/en) yapılandırmasını kontrol eder. Bu makale yalnızca önemli tanımları açıklamaktadır.

```json
{
  "main": "dist/index.js",
```

Bu tanım, hangi JavaScript dosyasının çalıştırılacağını belirtir.

```json
  "scripts": {
    "start": "tsc && node dist/app.js",
  },
```

Betikler çeşitli uygulama eylemleridir. Bu durumda, sahip olduğumuz tek betik, sunucuyu derleyen ve ardından çalıştıran `start` betiğidir. `tsc` komutu `typescript` paketinin bir parçasıdır ve TypeScript'i JavaScript'e derler. Manuel olarak çalıştırmak isterseniz, `node_modules/.bin` içinde bulunur. İkinci komut sunucuyu çalıştırır.

```json
  "type": "module",
```

Birden fazla JavaScript Node uygulaması türü vardır. `module` türü, en üst düzey kodda `await` kullanmamıza izin verir, bu da yavaş (ve dolayısıyla eşzamansız) işlemler yaptığınızda önemlidir.

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

Bunlar yalnızca geliştirme için gerekli olan paketlerdir. Burada `typescript` paketine ihtiyacımız var ve bunu Node.js ile kullandığımız için `process` gibi node değişkenleri ve nesneleri için türleri de alıyoruz. [`^<version>` gösterimi](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004), o sürüm veya bozucu değişiklikleri olmayan daha yüksek bir sürüm anlamına gelir. Sürüm numaralarının anlamı hakkında daha fazla bilgi için [buraya](https://semver.org) bakın.

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

Bunlar, `dist/app.js` çalıştırılırken çalışma zamanında gerekli olan paketlerdir.

## Sonuç {#conclusion}

Burada oluşturduğumuz merkezi sunucu, bir kullanıcı için temsilci olarak hareket etmek olan işini yapar. Dapp'in çalışmaya devam etmesini isteyen ve Gaz harcamaya istekli olan herkes, kendi Adresiyle sunucunun yeni bir örneğini çalıştırabilir.

Ancak bu, yalnızca merkezi sunucunun eylemleri kolayca doğrulanabildiğinde işe yarar. Merkezi sunucunun herhangi bir gizli durum bilgisi varsa veya zor hesaplamalar çalıştırıyorsa, uygulamayı kullanmak için güvenmeniz gereken merkezi bir varlıktır ki bu tam olarak Blokzincirlerin kaçınmaya çalıştığı şeydir. Gelecekteki bir makalede, bu sorunu aşmak için [sıfır bilgi ispatlarının](/zero-knowledge-proofs) nasıl kullanılacağını göstermeyi planlıyorum.

[Çalışmalarımın daha fazlası için buraya bakın](https://cryptodocguy.pro/).