---
title: "Waffle: Dinamik taklit ve sözleşme çağrılarını test etme"
description: Dinamik taklit kullanmak ve sözleşme çağrılarını test etmek için gelişmiş Waffle eğitimi
author: "Daniel Izdebski"
tags:
  - "waffle"
  - "akıllı sözleşmeler"
  - "katılık"
  - "test"
  - "taklit"
skill: intermediate
lang: tr
published: 2020-11-04
---

## Bu öğretici ne ile ilgili? {#what-is-this-tutorial-about}

Bu eğitimde şunları nasıl yapacağınızı öğreneceksiniz:

- dinamik taklit kullanımı
- akıllı sözleşmeler arasındaki test etkileşimleri

Varsayımlar:

- `Solidity`'de basit bir akıllı sözleşmenin nasıl yazılacağını zaten biliyorsunuz
- `JavaScript` ve `TypeScript`'e aşinasınız
- başka `Waffle` öğreticilerini tamamladınız veya bu konuda bir iki şey biliyorsunuz

## Dinamik taklit {#dynamic-mocking}

Dinamik taklit neden yararlıdır? Şey, entegrasyon testleri yerine birim testleri yazmamıza izin veriyor. Bu ne demek? Bu, akıllı sözleşmelerin bağımlılıkları hakkında endişelenmemize gerek olmadığı anlamına gelir, böylece hepsini tamamen ayrı ayrı test edebiliriz. Size tam olarak nasıl yapabileceğinizi göstermeme izin verin.

### **1. Proje** {#1-project}

Başlamadan önce basit bir node.js projesi hazırlamamız gerekiyor:

```bash
mkdir dynamic-mocking
cd dynamic-mocking
mkdir contracts src

yarn init
# or if you're using npm
npm init
```

Typescript ve test bağımlılıkları ekleyerek başlayalım - mocha ve chai:

```bash
yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# or if you're using npm
npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

Şimdi `Waffle` ve `ethers` ekleyelim:

```bash
yarn add --dev ethereum-waffle ethers
# or if you're using npm
npm install ethereum-waffle ethers --save-dev
```

Proje yapınız şimdi şöyle görünmeli:

```
.
├── contracts
├── package.json
└── test
```

### **2. Akıllı sözleşme** {#2-smart-contract}

Dinamik taklit etmeye başlamak için bağımlılıkları olan akıllı bir sözleşmeye ihtiyacımız var. Kaygılanmayın, bunu size anlatacağım!

İşte tek amacı zengin olup olmadığımızı kontrol etmek olan `Solidity` ile yazılmış basit bir akıllı sözleşme. Yeterli token'ımız olup olmadığını kontrol etmek için ERC20 token'ını kullanır. Onu `./contracts/AmIRichAlready.sol` içine koyun.

```solidity
pragma solidity ^0.6.2;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}

contract AmIRichAlready {
    IERC20 private tokenContract;
    uint public richness = 1000000 * 10 ** 18;

    constructor (IERC20 _tokenContract) public {
        tokenContract = _tokenContract;
    }

    function check() public view returns (bool) {
        uint balance = tokenContract.balanceOf(msg.sender);
        return balance > richness;
    }
}
```

Dinamik taklit kullanmak istediğimiz için tüm ERC20'ye ihtiyacımız yok, bu yüzden IERC20 arayüzünü sadece bir fonksiyonda kullanıyoruz.

Bu sözleşmeyi yapma zamanı! Bunun için `Waffle` kullanacağız. İlk olarak, derleme seçeneklerini belirten basit bir `waffle.json` yapılandırma dosyası oluşturacağız.

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./contracts",
  "outputDirectory": "./build"
}
```

Artık Waffle ile sözleşme yapmaya hazırız:

```bash
npx waffle
```

Kolay, değil mi? `build/` klasöründe sözleşmeye ve arayüze karşılık gelen iki dosya belirdi. Onları daha sonra test için kullanacağız.

### **3. Test** {#3-testing}

Gerçek test için `AmIRichAlready.test.ts` adında bir dosya oluşturalım. Her şeyden önce, ithalatı halletmemiz gerekiyor. Onlara daha sonra ihtiyaç duyacağız:

```typescript
import { expect, use } from "chai"
import { Contract, utils, Wallet } from "ethers"
import {
  deployContract,
  deployMockContract,
  MockProvider,
  solidity,
} from "ethereum-waffle"
```

JS bağımlılıkları dışında, yerleşik sözleşmemizi ve arayüzümüzü içe aktarmamız gerekiyor:

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

Waffle test için `chai` kullanır. Ancak kullanmadan önce, Waffle'ın eşleyicilerini chai'nin kendisine enjekte etmemiz gerekiyor:

```typescript
use(solidity)
```

Her testten önce sözleşmenin durumunu sıfırlayacak `beforeEach()` fonksiyonunu uygulamamız gerekiyor. Önce orada neye ihtiyacımız olduğunu düşünelim. Bir sözleşmeyi dağıtmak için iki şeye ihtiyacımız var: Bir cüzdan ve onu `AmIRichAlready` sözleşmesi için bir argüman olarak iletmek üzere konuşlandırılmış bir ERC20 sözleşmesi.

İlk olarak bir cüzdan oluşturuyoruz:

```typescript
const [wallet] = new MockProvider().getWallets()
```

O zaman bir ERC20 sözleşmesi dağıtmamız gerekiyor. İşin zor yanı şu: Elimizde sadece bir arayüz var. Waffle'ın bizi kurtarmaya geldiği kısım burası. Waffle'ın sihirli `deployMockContract()` fonksiyonu sadece arayüzün _abi_'sini kullanarak bir sözleşme oluşturur:

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

Şimdi hem cüzdan hem de dağıtılan ERC20 ile devam edip `AmIRichAlready` sözleşmesini uygulayabiliriz:

```typescript
const contract = await deployContract(wallet, AmIRichAlready, [
  mockERC20.address,
])
```

Bunların tamamı ile, `beforeEach()` fonksiyonumuz tamamlandı. Şimdiye dek `AmIRichAlready.test.ts` dosyanız şu şekilde gözükmeli:

```typescript
import { expect, use } from "chai"
import { Contract, utils, Wallet } from "ethers"
import {
  deployContract,
  deployMockContract,
  MockProvider,
  solidity,
} from "ethereum-waffle"

import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"

use(solidity)

describe("Am I Rich Already", () => {
  let mockERC20: Contract
  let contract: Contract
  let wallet: Wallet

  beforeEach(async () => {
    ;[wallet] = new MockProvider().getWallets()
    mockERC20 = await deployMockContract(wallet, IERC20.abi)
    contract = await deployContract(wallet, AmIRichAlready, [mockERC20.address])
  })
})
```

Hadi `AmIRichAlready` sözleşmesine ilk testi yazalım. Sizce testimiz ne hakkında olmalı? Evet, haklısınız! Zaten zengin olup olmadığımızı kontrol etmeliyiz :)

Ama bir saniye durun. Taklit sözleşmemiz hangi değerlerin döndürüleceğini nasıl bilecek? `balanceOf()` fonksiyonu için herhangi bir mantık eklemedik. Tekrardan, Waffle burada yardımcı olabilir. Sahte sözleşmemizde şimdi bazı yeni ilginç şeyler var:

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

Bu bilgiyle nihayet ilk testimizi yazabiliriz:

```typescript
it("returns false if the wallet has less than 1000000 tokens", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Bu testi parçalara ayıralım:

1. Taklit ERC20 sözleşmemizi her zaman 999999 token'lık bakiyeyi iade edecek şekilde ayarladık.
2. `contract.check()` yönteminin `false` döndürüp döndürmediğini kontrol edin.

Canavarı başlatmaya hazırız:

![Bir test geçişi](test-one.png)

Yani, test işe yarıyor ama... biraz daha geliştirilebilir. `balanceOf()` fonksiyonu her zaman 99999 döndürür. Fonksiyonun bir şey döndürmesi gereken bir cüzdan belirterek onu iyileştirebiliriz: Tıpkı gerçek bir sözleşme gibi:

```typescript
it("returns false if the wallet has less than 1000001 tokens", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Şimdiye kadar sadece yeterince zengin olmadığımız durumu test ettik. Bunun yerine zıttını test edelim:

```typescript
it("returns true if the wallet has at least 1000001 tokens", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

Testleri çalıştırırsınız...

![İki test geçişi](test-two.png)

...ve buradasınız! Sözleşmemiz istendiği gibi çalışıyor gibi görünüyor :)

## Sözleşme çağrılarını test etme {#testing-contract-calls}

Şimdiye kadar yaptıklarımı özetleyelim. `AmIRichAlready` sözleşmemizin işlevselliğini test ettik ve düzgün çalışıyor gibi görünüyor. Bu işimizin bittiği anlamına gelir, değil mi? Tam olarak değil! Waffle, sözleşmemizi daha da test etmemizi sağlıyor. Ama nasıl? Waffle'ın zulasıda `calledOnContract()` ve `calledOnContractWith()` eşleyicileri bulunmaktadır. Sözleşmemizin ERC20 taklit sözleşme olarak adlandırılıp adlandırılmadığını kontrol etmemizi sağlayacaklar. İşte bu eşleyicilerden biriyle yapılan temel bir test:

```typescript
it("checks if contract called balanceOf on the ERC20 token", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

Daha da ileri gidebilir ve size bahsettiğim diğer eşleyiciyle bu testi iyileştirebiliriz:

```typescript
it("checks if contract called balanceOf with certain wallet on the ERC20 token", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContractWith(mockERC20, [wallet.address])
})
```

Testlerin doğru olup olmadığını kontrol edelim:

![Üç test geçişi](test-three.png)

Müthiş, tüm testler yeşil ışık yakıyor.

Waffle ile sözleşme çağrılarını test etmek aşırı kolaydır. En güzel tarafı ise şu: Bu eşleyiciler hem normal hem de taklit sözleşmelerle çalışır! Bunun nedeni, Waffle'ın diğer teknolojiler için popüler test kütüphanelerinde olduğu gibi, kod enjekte etmek yerine EVM çağrılarını kaydetmesi ve filtrelemesidir.

## Bitiş Çizgisi {#the-finish-line}

Tebrikler! Artık sözleşme çağrılarını test etmek ve sözleşmeleri dinamik olarak taklit etmek için Waffle'ı nasıl kullanacağınızı biliyorsunuz. Keşfedilecek çok daha ilginç özellikler var. Waffle'ın belgelerine dalmanızı öneririm.

Waffle'ın belgeleri [burada](https://ethereum-waffle.readthedocs.io/) mevcuttur.

Bu öğreticinin kaynak kodu [burada](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls) bulunabilir.

Ayrıca ilginizi çekebilecek öğreticiler:

- [Waffle ile akıllı sözleşmeleri test etme](/developers/tutorials/testing-smart-contract-with-waffle/)
