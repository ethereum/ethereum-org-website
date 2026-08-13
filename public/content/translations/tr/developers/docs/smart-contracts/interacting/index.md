---
title: Akıllı sözleşmelerle etkileşim kurma
description: Ethereum'da halihazırda dağıtılmış olan akıllı sözleşmelerden nasıl veri okunacağını ve onlara nasıl veri yazılacağını öğrenin.
lang: tr
---

Her zaman kendi akıllı sözleşmenizi yazıp dağıtmanız gerekmez. Bir geliştirici olarak çoğu zaman, başkalarının Ethereum ağına halihazırda dağıtmış olduğu akıllı sözleşmelerle etkileşim kurmak isteyeceksiniz.

Bu sayfa, bir akıllı sözleşmeyle etkileşim kurmanın iki temel yolunu (veri **okuma** ve veri **yazma**) ve her ikisini de yapmak için ihtiyaç duyduğunuz araçları kapsar.

## Ön koşullar {#prerequisites}

Şunları anlamış olmalısınız:

- [Akıllı sözleşmeler nasıl çalışır](/developers/docs/smart-contracts/)
- [Ethereum hesapları ve işlemleri nasıl imzaladıkları](/developers/docs/accounts/)
- [İşlem nedir](/developers/docs/transactions/)

## Bir akıllı sözleşmeyle etkileşim kurmanın iki yolu {#two-ways}

Bir akıllı sözleşmeyle etkileşim kurmak iki kategoriye ayrılır:

### Bir sözleşmeden okuma yapma {#reading-from-a-contract}

Okuma, bir işlem oluşturmayan ve blokzincir üzerindeki hiçbir durumu değiştirmeyen **ücretsiz** bir operasyondur.

Bir sözleşmeden okuma yaptığınızda, sadece halihazırda var olan verileri sorgularsınız. Örneğin:

- Bir ERC-20 token bakiyesini kontrol etme
- Merkeziyetsiz bir borsadan güncel fiyatı okuma
- Bir NFT'nin sahibini öğrenme

Okuma işlemleri durumu değiştirmediği için [gaz](/developers/docs/gas/) maliyeti gerektirmez ve ETH'ye ihtiyaç duymadan herkes tarafından gerçekleştirilebilir.

### Bir sözleşmeye yazma {#writing-to-a-contract}

Yazma, bir işlem gerektiren ve gaz maliyeti olan **durum değiştiren** bir operasyondur.

Bir sözleşmeye yazdığınızda, blokzincir durumunu değiştiren bir fonksiyonu tetiklersiniz. Örneğin:

- Token transfer etme
- Merkeziyetsiz bir borsada token takas etme
- Bir NFT basma

Yazma işlemi her zaman şunları gerektirir:

1. Gaz için yeterli ETH'ye sahip [Dışarıdan Sahipli bir Hesap (EOA)](/developers/docs/accounts/#types-of-account)
2. Hesabın özel anahtarı tarafından imzalanmış bir işlem
3. İşlemin madenciliğinin yapılması ve bir bloğa dahil edilmesi

[Hesap soyutlama](/roadmap/account-abstraction/) ile, bir akıllı sözleşme hesabı da yazma işlemlerini başlatabilir ve bir ödemeci kullanıcı adına gazı karşılayabilir; bu nedenle ETH tutan bir EOA kesinlikle gerekli değildir.

## Sözleşme ABI'lerini anlama {#understanding-contract-abis}

Bir akıllı sözleşmeyle etkileşim kurmak için uygulamanızın sözleşmenin *neler* yapabileceğini bilmesi gerekir. İşte burada **Uygulama İkili Arayüzü (ABI)** devreye girer.

Bir ABI, şunları açıklayan bir JSON belgesidir:

- Sözleşmenin sunduğu her fonksiyon (isim, girdiler, çıktılar)
- Sözleşmenin yayabileceği her olay
- Sözleşmeyle iletişim kurarken verilerin nasıl kodlanacağı ve çözüleceği

ABI'yi sözleşmenin kullanım kılavuzu olarak düşünün; o olmadan uygulamanız hangi fonksiyonların var olduğunu veya hangi parametreleri beklediklerini bilemez.

### Bir sözleşmenin ABI'si nerede bulunur {#where-to-find-abis}

- **Etherscan'deki doğrulanmış sözleşmeler** - [Etherscan](https://etherscan.io), doğrulanmış kaynak kodu için ABI'yi otomatik olarak sunar
- **Geliştiriciden** - birçok proje ABI'lerini belgelerinde veya npm paketlerinde yayınlar
- **Kaynaktan oluşturma** - Solidity kaynak koduna sahipseniz, ABI'yi üretmek için onu [derleyebilirsiniz](/developers/docs/smart-contracts/compiling/)

## Sözleşmelerle etkileşim kurmak için araçlar ve kütüphaneler {#tools-and-libraries}

Geliştiriciler genellikle bir web uygulamasından, arka uçtan veya betikten sözleşmelerle etkileşim kurmak için bir JavaScript/TypeScript kütüphanesi kullanırlar.

### İstemci kütüphaneleri (JavaScript/TypeScript) {#client-libraries}

- **[Viem](https://viem.sh)** - Birinci sınıf tip güvenliğine sahip, Ethereum için modern, hafif TypeScript arayüzü
- **[ethers.js](https://docs.ethers.org/)** - Ethereum blokzinciri ile etkileşim kurmak için zorlu testlerden geçmiş kütüphane
- **[web3.js](https://web3js.org/)** - Orijinal Ethereum JavaScript API'si

### Arka uç kütüphaneleri {#backend-libraries}

- **[ethers.js](https://docs.ethers.org/)** - Sunucu tarafı betikleri ve botlar için Node.js'de de çalışır
- **[web3.py](https://web3py.readthedocs.io/)** - Ethereum etkileşimi için Python kütüphanesi
- **[go-ethereum](https://geth.ethereum.org/docs/interact-with-geth)** - Geth ekibinden resmi Go kütüphanesi

### Örnek: Viem ile bir token bakiyesini okuma {#example-viem}

```ts
import { createPublicClient, http, formatUnits } from 'viem'
import { mainnet } from 'viem/chains'

// USDC sözleşme adresi ve ABI (kısmi, balanceOf için)
const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const abi = [{
  name: 'balanceOf',
  type: 'function',
  stateMutability: 'view',
  inputs: [{ name: 'account', type: 'address' }],
  outputs: [{ name: '', type: 'uint256' }],
}] as const

const client = createPublicClient({ chain: mainnet, transport: http() })

const balance = await client.readContract({
  address: USDC,
  abi,
  functionName: 'balanceOf',
  args: ['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'], // vitalik.eth
})

console.log(formatUnits(balance, 6)) // USDC'nin 6 ondalık basamağı vardır
```

### Örnek: ethers.js ile bir işlem gönderme {#example-ethers}

```js
const { ethers } = require('ethers')

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

// ERC-20 transfer ABI
const abi = ['function transfer(address to, uint256 amount) returns (bool)']
const contract = new ethers.Contract(tokenAddress, abi, wallet)

const tx = await contract.transfer(recipient, ethers.parseUnits('10', 18))
await tx.wait() // işlemin kazılmasını bekle
console.log(`Transferred! TX: ${tx.hash}`)
```

## Olaylar ve günlükler {#events-and-logs}

Akıllı sözleşmeler, bir şeyin gerçekleştiğini bildirmek için **olaylar** yayabilir. Uygulamanız, gerçek zamanlı olarak tepki vermek için bu olayları dinleyebilir.

```ts
import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })

// USDC Transfer olaylarını izle
const unwatch = client.watchEvent({
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  onLogs: (logs) => console.log(logs),
})
```

## İşlemleri simüle etme {#simulating}

Bir işlemi göndermeden önce, başarılı olup olmayacağını kontrol etmek ve gaz harcamadan dönüş değerini görmek için onu **simüle** edebilirsiniz. Bu, hataları erkenden yakalamak ve sonuçları önizlemek için faydalıdır.

Çoğu istemci kütüphanesi bunu `eth_call` aracılığıyla destekler:

```ts
// Viem ile
const result = await client.simulateContract({
  address: contractAddress,
  abi,
  functionName: 'swap',
  args: [amountIn],
  account: userAddress,
})
```

## Cüzdanlar ve imzalama {#wallets-and-signing}

Bir merkeziyetsiz uygulamada (dapp), kullanıcının cüzdanı (MetaMask, Rainbow veya WalletConnect gibi) imzalama işlemini halleder. Özel anahtarları doğrudan yönetmezsiniz.

[Cüzdan kütüphaneleri ve bağlantı araçları](/developers/docs/apis/javascript/) bunu soyutlar, böylece uygulama mantığınızı oluşturmaya odaklanabilirsiniz.

## İlgili eğitimler {#related-tutorials}

- [JavaScript'ten bir akıllı sözleşmeyi çağırma](/developers/tutorials/calling-a-smart-contract-from-javascript/)
- [web3.js ve Alchemy kullanarak işlem gönderme](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
- [Cüzdanınızda NFT'nizi nasıl görüntüleyebilirsiniz](/developers/tutorials/how-to-view-nft-in-metamask/)

## Daha fazla bilgi {#further-reading}

- [Viem belgeleri: Sözleşmelere okuma ve yazma](https://viem.sh/docs/contract/readContract)
- [ethers.js belgeleri: Sözleşmeler](https://docs.ethers.org/v6/api/contract/)
- [Solidity ABI spesifikasyonu](https://docs.soliditylang.org/en/latest/abi-spec.html)
- [ABI nedir? - Alchemy](https://www.alchemy.com/overviews/what-is-an-abi)

## İlgili konular {#related-topics}

- [Akıllı sözleşmeleri derleme](/developers/docs/smart-contracts/compiling/)
- [Akıllı sözleşmeleri dağıtmak](/developers/docs/smart-contracts/deploying/)
- [JavaScript API'leri](/developers/docs/apis/javascript/)
- [Arka uç API'leri](/developers/docs/apis/backend/)