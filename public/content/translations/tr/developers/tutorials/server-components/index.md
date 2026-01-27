---
title: "Web3 uygulamaları için sunucu bileşenleri ve aracılar"
description: "Bu öğreticiyi okuduktan sonra, bir blokzincir üzerindeki olayları dinleyen ve buna göre kendi işlemleriyle yanıt veren TypeScript sunucuları yazabileceksiniz. Bu, merkezi uygulamalar yazmanızı sağlayacaktır (çünkü sunucu bir hata noktasıdır) ancak web3 varlıklarıyla etkileşime girebilir. Aynı teknikler, döngüde bir insan olmadan zincir üstündeki olaylara yanıt veren bir aracı yazmak için de kullanılabilir."

author: Ori Pomerantz
lang: tr
tags: [ "aracı", "sunucu", "zincir dışında" ]
skill: beginner
published: 2024-07-15
---

## Giriş {#introduction}

Çoğu durumda, merkeziyetsiz bir uygulama yazılımı dağıtmak için bir sunucu kullanır, ancak tüm gerçek etkileşim istemci (genellikle web tarayıcısı) ve blokzincir arasında gerçekleşir.

![Web sunucusu, istemci ve blokzincir arasındaki normal etkileşim](./fig-1.svg)

Ancak, bir uygulamanın bağımsız olarak çalışan bir sunucu bileşenine sahip olmaktan fayda sağlayacağı bazı durumlar vardır. Böyle bir sunucu, işlemler yayınlayarak olaylara ve API gibi diğer kaynaklardan gelen isteklere yanıt verebilir.

![Bir sunucunun eklenmesiyle etkileşim](./fig-2.svg)

Böyle bir sunucunun yerine getirebileceği birkaç olası görev vardır.

- Gizli durum sahibi. Oyunlarda, oyunun bildiği tüm bilgilerin oyunculara açık olmaması genellikle faydalıdır. Ancak, _blokzincirde sır yoktur_, blokzincirdeki herhangi bir bilgiyi herkesin anlaması kolaydır. Bu nedenle, oyun durumunun bir kısmı gizli tutulacaksa, başka bir yerde saklanması gerekir (ve muhtemelen bu durumun etkilerinin [sıfır bilgi ispatları](/zero-knowledge-proofs) kullanılarak doğrulanması gerekir).

- Merkezi kâhin. Riskler yeterince düşükse, çevrimiçi olarak bazı bilgileri okuyan ve sonra bunu zincire gönderen harici bir sunucu, [kâhin](/developers/docs/oracles/) olarak kullanılmaya yeterli olabilir.

- Aracı. Onu etkinleştirecek bir işlem olmadan blokzincirde hiçbir şey olmaz. Bir sunucu, fırsat ortaya çıktığında bir kullanıcı adına [arbitraj](/developers/docs/mev/#mev-examples-dex-arbitrage) gibi eylemleri gerçekleştirmek için hareket edebilir.

## Örnek program {#sample-program}

Örnek bir sunucuyu [github'da](https://github.com/qbzzt/20240715-server-component) görebilirsiniz. Bu sunucu, Hardhat'in Greeter'ının değiştirilmiş bir sürümü olan [bu sözleşmeden](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code) gelen olayları dinler. Selamlama değiştirildiğinde, onu geri değiştirir.

Çalıştırmak için:

1. Depoyu klonlayın.

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. Gerekli paketleri yükleyin. Eğer zaten kurulu değilse, [önce Node'u yükleyin](https://nodejs.org/en/download/package-manager).

   ```sh copy
   npm install
   ```

3. Holesky test ağında ETH'si olan bir hesabın özel anahtarını belirtmek için `.env` dosyasını düzenleyin. Holesky'de ETH'niz yoksa [bu musluğu kullanabilirsiniz](https://holesky-faucet.pk910.de/).

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <özel anahtar buraya gelecek>
   ```

4. Sunucuyu başlatın.

   ```sh copy
   npm start
   ```

5. [Bir blok gezginine](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract) gidin ve özel anahtara sahip olandan farklı bir adres kullanarak selamlamayı değiştirin. Selamlamanın otomatik olarak geri değiştirildiğini görün.

### Nasıl çalışır? {#how-it-works}

Bir sunucu bileşeninin nasıl yazılacağını anlamanın en kolay yolu, örneği satır satır incelemektir.

#### `src/app.ts` {#src-app-ts}

Programın büyük çoğunluğu [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts) dosyasında yer almaktadır.

##### Önkoşul nesnelerini oluşturma

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

Bunlar, ihtiyacımız olan [Viem](https://viem.sh/) varlıkları, işlevler ve [`Address` türüdür](https://viem.sh/docs/glossary/types#address). Bu sunucu, JavaScript'in onu [güçlü tipli](https://en.wikipedia.org/wiki/Strong_and_weak_typing) yapan bir uzantısı olan [TypeScript](https://www.typescriptlang.org/) ile yazılmıştır.

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[Bu işlev](https://viem.sh/docs/accounts/privateKey), bir özel anahtara karşılık gelen adres de dahil olmak üzere cüzdan bilgilerini oluşturmamızı sağlar.

```typescript
import { holesky } from "viem/chains"
```

Viem'de bir blokzincir kullanmak için tanımını içe aktarmanız gerekir. Bu durumda [Holesky](https://github.com/eth-clients/holesky) test blokzincirine bağlanmak istiyoruz.

```typescript
// .env içindeki tanımları process.env'ye bu şekilde ekleriz.
import * as dotenv from "dotenv"
dotenv.config()
```

`.env` dosyasını ortama bu şekilde okuruz. Özel anahtar için buna ihtiyacımız var (daha sonrasına bakın).

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

Bir sözleşmeyi kullanmak için adresine ve onun [ABI](/glossary/#abi) bilgisine ihtiyacımız var. İkisini de burada sağlıyoruz.

JavaScript'te (ve dolayısıyla TypeScript'te) bir sabite yeni bir değer atayamazsınız, ancak içinde depolanan nesneyi _değiştirebilirsiniz_. `as const` son ekini kullanarak, TypeScript'e listenin kendisinin sabit olduğunu ve değiştirilemeyeceğini söylüyoruz.

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

Bir Viem [genel istemcisi](https://viem.sh/docs/clients/public.html) oluşturun. Genel istemcilerin ekli bir özel anahtarı yoktur ve bu nedenle işlem gönderemezler. [`view` işlevlerini](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) çağırabilir, hesap bakiyelerini okuyabilirler vb.

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

Ortam değişkenleri [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env) içinde mevcuttur. Ancak, TypeScript güçlü tiplidir. Bir ortam değişkeni herhangi bir dize olabilir veya boş olabilir, bu nedenle bir ortam değişkeninin türü `string | undefined`'dır. Ancak, Viem'de bir anahtar `0x${string}` (`0x` ve ardından gelen bir dize) olarak tanımlanır. Burada TypeScript'e `PRIVATE_KEY` ortam değişkeninin bu türde olacağını söylüyoruz. Eğer değilse, bir çalışma zamanı hatası alırız.

[`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) işlevi daha sonra bu özel anahtarı tam bir hesap nesnesi oluşturmak için kullanır.

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

Ardından, bir [cüzdan istemcisi](https://viem.sh/docs/clients/wallet) oluşturmak için hesap nesnesini kullanırız. Bu istemcinin bir özel anahtarı ve adresi vardır, bu yüzden işlem göndermek için kullanılabilir.

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

Artık tüm önkoşullara sahip olduğumuza göre, sonunda bir [sözleşme örneği](https://viem.sh/docs/contract/getContract) oluşturabiliriz. Zincir üstündeki sözleşmeyle iletişim kurmak için bu sözleşme örneğini kullanacağız.

##### Blokzincirden okuma

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

Salt okunur olan sözleşme işlevleri ([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) ve [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)) `read` altında mevcuttur. Bu durumda, selamlamayı döndüren [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217) işlevine erişmek için bunu kullanırız.

JavaScript tek iş parçacıklıdır, bu nedenle uzun süren bir işlemi başlattığımızda bunu [eşzamansız olarak yaptığımızı belirtmemiz gerekir](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE). Salt okunur bir işlem için bile olsa blokzinciri çağırmak, bilgisayar ile bir blokzincir düğümü arasında bir gidiş-dönüş gerektirir. İşte bu yüzden burada kodun sonucu `await` etmesi gerektiğini belirtiyoruz.

Bunun nasıl çalıştığıyla ilgileniyorsanız [buradan okuyabilirsiniz](https://www.w3schools.com/js/js_promise.asp), ancak pratik anlamda bilmeniz gereken tek şey, uzun süren bir işlem başlatırsanız sonuçları `await` etmeniz gerektiği ve bunu yapan herhangi bir işlevin `async` olarak bildirilmesi gerektiğidir.

##### İşlemleri yayınlama

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

Bu, selamlamayı değiştiren bir işlemi yayınlamak için çağırdığınız işlevdir. Bu uzun bir işlem olduğundan, işlev `async` olarak bildirilmiştir. Dahili uygulama nedeniyle, herhangi bir `async` işlevinin bir `Promise` nesnesi döndürmesi gerekir. Bu durumda, `Promise<any>` ifadesi `Promise` içinde tam olarak neyin döndürüleceğini belirtmediğimiz anlamına gelir.

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

Sözleşme örneğinin `write` alanı, [`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862) gibi blokzincir durumuna yazan tüm işlevlere (yani bir işlem göndermeyi gerektirenlere) sahiptir. Parametreler, varsa, bir liste olarak sağlanır ve işlev, işlemin karmasını döndürür.

```typescript
    console.log(`Bir düzeltme üzerinde çalışılıyor, bakın https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

İşlemin karmasını (görüntülemek için blok gezginine yönlendiren bir URL'nin parçası olarak) bildirin ve döndürün.

##### Olaylara yanıt verme

```typescript
greeter.watchEvent.SetGreeting({
```

[`watchEvent` işlevi](https://viem.sh/docs/actions/public/watchEvent), bir olay yayınlandığında bir işlevin çalıştırılacağını belirtmenize olanak tanır. Yalnızca tek bir olay türüyle ilgileniyorsanız (bu durumda, `SetGreeting`), kendinizi bu olay türüyle sınırlamak için bu sözdizimini kullanabilirsiniz.

```typescript
    onLogs: logs => {
```

`onLogs` işlevi, günlük girdileri olduğunda çağrılır. Ethereum'da "log" ve "olay" genellikle birbirinin yerine kullanılabilir.

```typescript
console.log(
  `${logs[0].args.sender} adresi selamlamayı ${logs[0].args.greeting} olarak değiştirdi`
)
```

Birden fazla olay olabilir, ancak basitlik adına yalnızca ilkiyle ilgileniyoruz. `logs[0].args`, olayın argümanlarıdır, bu durumda `sender` ve `greeting`.

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} bunun Hello! olmasında ısrar ediyor`)
    }
})
```

Gönderici bu sunucu _değilse_, selamlamayı değiştirmek için `setGreeting` kullanın.

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

Betikler çeşitli uygulama eylemleridir. Bu durumda, sahip olduğumuz tek betik, sunucuyu derleyip ardından çalıştıran `start`'tır. `tsc` komutu `typescript` paketinin bir parçasıdır ve TypeScript'i JavaScript'e derler. Manuel olarak çalıştırmak isterseniz, `node_modules/.bin` konumunda bulunur. İkinci komut sunucuyu çalıştırır.

```json
  "type": "module",
```

Birden fazla JavaScript Node uygulaması türü vardır. `module` türü, en üst düzey kodda `await` kullanmamızı sağlar; bu, yavaş (ve dolayısıyla eşzamansız) işlemler yaptığınızda önemlidir.

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

Bunlar yalnızca geliştirme için gerekli olan paketlerdir. Burada `typescript`'e ihtiyacımız var ve bunu Node.js ile kullandığımız için, `process` gibi Node değişkenleri ve nesneleri için türleri de alıyoruz. [`^<sürüm>` gösterimi](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004), bu sürümün veya bozucu değişiklikler içermeyen daha yüksek bir sürümün kullanılacağı anlamına gelir. Sürüm numaralarının anlamı hakkında daha fazla bilgi için [buraya](https://semver.org) bakın.

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

Bunlar, `dist/app.js` çalıştırılırken çalışma zamanında gerekli olan paketlerdir.

## Sonuç {#conclusion}

Burada oluşturduğumuz merkezi sunucu, bir kullanıcı için aracı olarak hareket etme işini yapıyor. Merkeziyetsiz uygulamanın çalışmaya devam etmesini isteyen ve gaz harcamaya razı olan herkes, sunucunun yeni bir örneğini kendi adresiyle çalıştırabilir.

Ancak bu, yalnızca merkezi sunucunun eylemleri kolayca doğrulanabildiğinde işe yarar. Merkezi sunucunun herhangi bir gizli durum bilgisi varsa veya zor hesaplamalar yapıyorsa, uygulamayı kullanmak için güvenmeniz gereken merkezi bir varlık hâline gelir ki bu, blokzincirlerin tam olarak kaçınmaya çalıştığı şeydir. Gelecekteki bir makalede, bu sorunun üstesinden gelmek için [sıfır bilgi ispatlarının](/zero-knowledge-proofs) nasıl kullanılacağını göstermeyi planlıyorum.

[Çalışmalarımdan daha fazlası için buraya bakın](https://cryptodocguy.pro/).
