---
title: "Waffle: Dinamik taklit ve sözleşme çağrılarını test etme"
description: Dinamik taklit kullanmak ve sözleşme çağrılarını test etmek için gelişmiş Waffle öğreticisi
author: "Daniel Izdebski"
tags:
  [
    "waffle",
    "akıllı kontratlar",
    "katılık",
    "test etmek",
    "taklit etme"
  ]
skill: intermediate
lang: tr
published: 2020-11-14
---

## Bu öğretici ne hakkında? {#what-is-this-tutorial-about}

Bu öğreticide şunları nasıl yapacağınızı öğreneceksiniz:

- dinamik taklit kullanma
- akıllı sözleşmeler arasındaki etkileşimleri test etme

Varsayımlar:

- `Solidity`'de basit bir akıllı sözleşme yazmayı zaten biliyorsunuz
- `JavaScript` ve `TypeScript`'e aşinasınız
- diğer `Waffle` öğreticilerini tamamladınız veya bu konuda bir iki şey biliyorsunuz

## Dinamik taklit {#dynamic-mocking}

Dinamik taklit neden yararlıdır? Entegrasyon testleri yerine birim testleri yazmamıza olanak tanır. Bu ne anlama geliyor? Bu, akıllı sözleşmelerin bağımlılıkları hakkında endişelenmemize gerek olmadığı anlamına gelir, dolayısıyla hepsini tamamen izole bir şekilde test edebiliriz. Bunu tam olarak nasıl yapabileceğinizi size göstereyim.

### **1. Proje** {#1-project}

Başlamadan önce basit bir node.js projesi hazırlamamız gerekiyor:

```bash
mkdir dynamic-mocking
cd dynamic-mocking
mkdir contracts src

yarn init
# veya npm kullanıyorsanız
npm init
```

TypeScript ve test bağımlılıklarını (mocha ve chai) ekleyerek başlayalım:

```bash
yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# veya npm kullanıyorsanız
npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

Şimdi `Waffle` ve `ethers` ekleyelim:

```bash
yarn add --dev ethereum-waffle ethers
# veya npm kullanıyorsanız
npm install ethereum-waffle ethers --save-dev
```

Proje yapınız şimdi şöyle görünmelidir:

```
.
├── contracts
├── package.json
└── test
```

### **2. Akıllı sözleşme** {#2-smart-contract}

Dinamik taklit etmeye başlamak için bağımlılıkları olan bir akıllı sözleşmeye ihtiyacımız var. Endişelenmeyin, bu konuyu ele alacağız!

İşte tek amacı zengin olup olmadığımızı kontrol etmek olan `Solidity` ile yazılmış basit bir akıllı sözleşme. Yeterli token'ımız olup olmadığını kontrol etmek için bir ERC20 token'ı kullanır. Bunu `./contracts/AmIRichAlready.sol` içine koyun.

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

Dinamik taklit kullanmak istediğimizden, ERC20'nin tamamına ihtiyacımız yok; bu yüzden yalnızca tek bir fonksiyona sahip olan IERC20 arayüzünü kullanıyoruz.

Bu sözleşmeyi derleme zamanı! Bunun için `Waffle` kullanacağız. İlk olarak, derleme seçeneklerini belirten basit bir `waffle.json` yapılandırma dosyası oluşturacağız.

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./contracts",
  "outputDirectory": "./build"
}
```

Artık Waffle ile sözleşmeyi derlemeye hazırız:

```bash
npx waffle
```

Kolay, değil mi? `build/` klasöründe sözleşmeye ve arayüze karşılık gelen iki dosya belirdi. Bunları daha sonra test için kullanacağız.

### **3. Test etme** {#3-testing}

Asıl testi yapmak için `AmIRichAlready.test.ts` adında bir dosya oluşturalım. Öncelikle, içe aktarma işlemlerini halletmeliyiz. Bunlara daha sonra ihtiyacımız olacak:

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

JS bağımlılıkları haricinde, derlenmiş sözleşmemizi ve arayüzümüzü de içe aktarmamız gerekiyor:

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

`Waffle`, test için `chai` kullanır. Ancak, bunu kullanmadan önce Waffle'ın eşleştiricilerini `chai`'nin kendisine enjekte etmemiz gerekir:

```typescript
use(solidity)
```

Her testten önce sözleşmenin durumunu sıfırlayacak olan `beforeEach()` fonksiyonunu uygulamamız gerekiyor. Önce orada neye ihtiyacımız olacağını düşünelim. Bir sözleşmeyi dağıtmak için iki şeye ihtiyacımız var: bir cüzdan ve `AmIRichAlready` sözleşmesine argüman olarak geçmek için dağıtılmış bir ERC20 sözleşmesi.

İlk olarak bir cüzdan oluşturalım:

```typescript
const [wallet] = new MockProvider().getWallets()
```

Ardından bir ERC20 sözleşmesi dağıtmamız gerekiyor. İşte işin zor kısmı: Elimizde sadece bir arayüz var. İşte bu noktada Waffle imdadımıza yetişiyor. `Waffle`, yalnızca arayüzün _abi_'sini kullanarak bir sözleşme oluşturan sihirli bir `deployMockContract()` fonksiyonuna sahiptir:

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

Artık hem cüzdan hem de dağıtılmış ERC20 ile `AmIRichAlready` sözleşmesini dağıtmaya devam edebiliriz:

```typescript
const contract = await deployContract(wallet, AmIRichAlready, [
  mockERC20.address,
])
```

Böylece `beforeEach()` fonksiyonumuz tamamlanmış oldu. Şu ana kadar `AmIRichAlready.test.ts` dosyanız şöyle görünmelidir:

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

`AmIRichAlready` sözleşmesi için ilk testimizi yazalım. Sizce testimiz ne hakkında olmalı? Evet, haklısınız! Zaten zengin olup olmadığımızı kontrol etmeliyiz :)

Fakat bir saniye bekleyin. Taklit sözleşmemiz hangi değerleri döndüreceğini nasıl bilecek? `balanceOf()` fonksiyonu için herhangi bir mantık uygulamadık. Waffle bu konuda da yardımcı olabilir. Taklit sözleşmemizde artık bazı yeni havalı şeyler var:

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

Bu bilgiyle nihayet ilk testimizi yazabiliriz:

```typescript
it("cüzdanda 1.000.000'dan az token varsa false değerini döndürür", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Bu testi parçalara ayıralım:

1. Taklit ERC20 sözleşmemizi her zaman 999.999 token'lık bir bakiye döndürecek şekilde ayarlıyoruz.
2. `contract.check()` yönteminin `false` döndürüp döndürmediğini kontrol edin.

Canavarı ateşlemeye hazırız:

![Geçen bir test](./test-one.png)

Test çalışıyor, ama... hâlâ geliştirilebilecek bazı yönleri var. `balanceOf()` fonksiyonu her zaman 99999 değerini döndürecektir. Tıpkı gerçek bir sözleşmede olduğu gibi, fonksiyonun bir değer döndürmesi gereken bir cüzdan belirterek bunu iyileştirebiliriz:

```typescript
it("cüzdanda 1.000.001'den az token varsa false değerini döndürür", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Şimdiye kadar sadece yeterince zengin olmadığımız durumu test ettik. Şimdi de tam tersini test edelim:

```typescript
it("cüzdanda en az 1.000.001 token varsa true değerini döndürür", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

Testleri çalıştırın...

![Geçen iki test](test-two.png)

...ve işte oldu! Sözleşmemiz istendiği gibi çalışıyor gibi görünüyor :)

## Sözleşme çağrılarını test etme {#testing-contract-calls}

Şimdiye kadar yaptıklarımızı özetleyelim. `AmIRichAlready` sözleşmemizin işlevselliğini test ettik ve düzgün çalışıyor gibi görünüyor. Bu, işimizin bittiği anlamına gelir, değil mi? Tam olarak değil! Waffle, sözleşmemizi daha da ileri düzeyde test etmemize olanak tanır. Peki ama tam olarak nasıl? `Waffle`'ın araç setinde `calledOnContract()` ve `calledOnContractWith()` eşleştiricileri bulunur. Bunlar, sözleşmemizin ERC20 taklit sözleşmesini çağırıp çağırmadığını kontrol etmemize olanak tanır. İşte bu eşleştiricilerden biriyle yapılmış temel bir test:

```typescript
it("sözleşmenin ERC20 token'ında balanceOf fonksiyonunu çağırıp çağırmadığını kontrol eder", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

Daha da ileri giderek bu testi size bahsettiğim diğer eşleştirici ile geliştirebiliriz:

```typescript
it("sözleşmenin ERC20 token'ında belirli bir cüzdan ile balanceOf fonksiyonunu çağırıp çağırmadığını kontrol eder", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContractWith(mockERC20, [wallet.address])
})
```

Testlerin doğru olup olmadığını kontrol edelim:

![Geçen üç test](test-three.png)

Harika, tüm testler başarılı.

Waffle ile sözleşme çağrılarını test etmek çok kolaydır. Ve en iyi kısmı da şu. Bu eşleştiriciler hem normal hem de taklit sözleşmelerle çalışır! Bunun nedeni, `Waffle`'ın, diğer teknolojiler için popüler test kütüphanelerinde olduğu gibi kod enjekte etmek yerine, EVM çağrılarını kaydedip filtrelemesidir.

## Bitiş Çizgisi {#the-finish-line}

Tebrikler! Artık sözleşme çağrılarını test etmek ve sözleşmeleri dinamik olarak taklit etmek için Waffle'ı nasıl kullanacağınızı biliyorsunuz. Keşfedilecek çok daha ilginç özellikler var. Waffle'ın belgelerine göz atmanızı öneririm.

Waffle'ın belgelerine [buradan](https://ethereum-waffle.readthedocs.io/) ulaşabilirsiniz.

Bu öğreticinin kaynak kodunu [burada](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls) bulabilirsiniz.

İlginizi çekebilecek diğer öğreticiler:

- [Waffle ile akıllı sözleşmeleri test etme](/developers/tutorials/waffle-test-simple-smart-contract/)
