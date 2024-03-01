---
title: Waffle kütüphanesiyle basit bir akıllı sözleşmeyi test etme
description: Yeni başlayanlar için öğretici
author: Ewa Kowalska
tags:
  - "akıllı sözleşmeler"
  - "solidity"
  - "Waffle"
  - "test"
skill: beginner
lang: tr
published: 2021-02-26
---

## Bu öğreticide aşağıdakilerin nasıl yapılacağını öğreneceksiniz {#in-this-tutorial-youll-learn-how-to}

- Cüzdan bakiyesindeki değişimleri test etme
- Belirtilen argümanlarla işlemlerin emisyonunu test etme
- Bir işlemin geri alındığını doğrulama

## Varsayımlar {#assumptions}

- Yeni bir JavaScript ya da TypeScript projesi oluşturabilirsiniz
- JavaScript'teki testlerle ilgili bazı basit deneyimleriniz mevcuttur
- Yarn ya da npm gibi bazı paket yöneticilerini daha önce kullandınız
- Akıllı sözleşmeler ve Solidity ile ilgili giriş seviyesinde bilgi sahibisiniz

# Başlarken {#getting-started}

Bu öğretici, yarn kullanarak test kurulumunu ve çalıştırmasını göstermektedir ancak npm tercihinde bulunmanız da sorun teşkil etmez. Resmi Waffle [dokümanlarına](https://ethereum-waffle.readthedocs.io/en/latest/index.html) uygun referanslar sunacağım.

## Bağımlılıkları Yükleme {#install-dependencies}

Ethereum-waffle ve typescript bağımlılıklarını projenizin dev bağımlılıklarına [ekleyin](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#installation).

```bash
yarn add --dev ethereum-waffle ts-node typescript @types/jest
```

## Örnek akıllı sözleşme {#example-smart-contract}

Öğretici boyunca basit bir akıllı sözleşme örneği olan EtherSplitter üzerinde çalışacağız. Bu, herhangi birinin belirli bir miktarda wei göndermesine ve bu miktarı önceden tanımlanmış iki alıcı arasında eşit olarak bölmesine izin vermenin haricinde pek bir şey yapmaz. Bölme işleminin gerçekleşmesi için wei sayısının çift olması gerekir, aksi takdirde işlem geri döner. Her iki alıcı için de, önce bir wei transferi ve ardından Transfer olayı gerçekleştirilir.

EtherSplitter kod parçasını `src/EtherSplitter.sol` içine yerleştirin.

```solidity
pragma solidity ^0.6.0;

contract EtherSplitter {
    address payable receiver1;
    address payable receiver2;

    event Transfer(address from, address to, uint256 amount);

    constructor(address payable _address1, address payable _address2) public {
        receiver1 = _address1;
        receiver2 = _address2;
    }

    function split() public payable {
        require(msg.value % 2 == 0, 'Uneven wei amount not allowed');
        receiver1.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver1, msg.value / 2);
        receiver2.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver2, msg.value / 2);
    }
}
```

## Sözleşmeyi derleme {#compile-the-contract}

Sözleşmeyi [derlemek](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#compiling-the-contract) için aşağıdaki girdiyi package.json dosyasına ekleyin:

```json
"scripts": {
    "build": "waffle"
  }
```

Sonraki adım olarak, proje kök dizininde - `waffle.json` - Waffle yapılandırma dosyasını oluşturun ve ardından aşağıdaki yapılandırmayı buraya yapıştırın:

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./src",
  "outputDirectory": "./build"
}
```

`yarn build` komutunu çalıştırın. Sonuç olarak, JSON formatında derlenmiş EtherSplitter sözleşmesinin bulunduğu `build` dizini görünecektir.

## Test kurulumu {#test-setup}

Waffle ile test yapmak için Chai eşleştiricilerini ve Mocha'yı kullanmanız gerekeceğinden, bunları projenize [eklemeniz](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests) gerekir. Package.json dosyanızı güncelleyin ve komut dosyaları bölümüne `test` girdisini ekleyin:

```json
"scripts": {
    "build": "waffle",
    "test": "export NODE_ENV=test && mocha -r ts-node/register 'test/**/*.test.ts'"
  }
```

Eğer testlerinizi [çalıştırmak](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#running-tests) istiyorsanız, sadece `yarn test` komutunu çalıştırmanız yeterlidir.

# Test {#testing}

Şimdi `test` dizinini ve `test\EtherSplitter.test.ts` yeni dosyasını oluşturun. Aşağıdaki kod parçasını kopyalayın ve test dosyanıza yapıştırın.

```ts
import { expect, use } from "chai"
import { Contract } from "ethers"
import { deployContract, MockProvider, solidity } from "ethereum-waffle"
import EtherSplitter from "../build/EtherSplitter.json"

use(solidity)

describe("Ether Splitter", () => {
  const [sender, receiver1, receiver2] = new MockProvider().getWallets()
  let splitter: Contract

  beforeEach(async () => {
    splitter = await deployContract(sender, EtherSplitter, [
      receiver1.address,
      receiver2.address,
    ])
  })

  // add the tests here
})
```

Başlamadan önce bir kaç kelime. `MockProvider`, blokzinciri taklit eden bir sürüm oluşturur. Ayrıca, EtherSplitter sözleşmesini test etmek için sahte cüzdanlar da sunar. Sağlayıcı üzerinde `getWallets()` yöntemini çağırarak on cüzdana kadar cüzdan elde edebiliriz. Örnekte, üç tane gönderici için iki tane de alıcılar için cüzdan elde ediyoruz.

Sonraki adımda, "splitter" adında bir değişken tanımlıyoruz; bu, taklit EtherSplitter sözleşmemizdir. Bu, tek bir testin her yürütülmesinden önce `deployContract` yöntemi ile oluşturulur. Bu yöntem, ilk parametre olarak aktarılan cüzdandan (bizim durumumuzda göndericinin cüzdanı) bir sözleşmenin dağıtımını simüle eder. İkinci parametre, test edilen sözleşmenin ABI'si ve bit kodudur; burada `build` dizininden derlenmiş EtherSplitter sözleşmesinin json dosyasını aktarıyoruz. Üçüncü parametre, sözleşmenin oluşturucu argümanlarının bir dizisidir; bizim durumumuzda ise alıcıların iki adresidir.

## changeBalances {#changebalances}

İlk olarak, bölme yönteminin alıcıların cüzdan bakiyelerini gerçekten değiştirip değiştirmediğini kontrol edeceğiz. Eğer gönderen hesaptan 50 wei bölersek, her iki alıcının bakiyelerinin de 25 wei artmasını bekleriz. Waffle'ın `changeBalances` eşleştiricisini kullanacağız:

```ts
it("Changes accounts balances", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalances(
    [receiver1, receiver2],
    [25, 25]
  )
})
```

Eşleştiricinin ilk parametresi olarak alıcıların cüzdanlarının bir dizisini ve ikinci olarak da ilgili hesaplarda beklenen artışları içeren bir diziyi aktarırız. Eğer belirli bir cüzdanın bakiyesini kontrol etmek isteseydik, aşağıdaki örnekte olduğu gibi dizileri aktarmayı gerektirmeyen `changeBalance` eşleştiricisini de kullanabilirdik:

```ts
it("Changes account balance", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalance(
    receiver1,
    25
  )
})
```

Hem `changeBalance` hem de `changeBalances` durumlarında, eşleştiricinin çağrıdan önceki ve sonraki bakiye durumuna erişmesi gerektiği için bölme işlevini bir geri çağrı olarak aktardığımızı unutmayın.

Sonra, her wei transferi sonrası Transfer olayının yayımlanıp yayımlanmadığını test ediyoruz. Waffle'daki başka bir eşleştiriciye geçeceğiz:

## Emit {#emit}

```ts
it("Emits event on the transfer to the first receiver", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver1.address, 25)
})

it("Emits event on the transfer to the second receiver", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver2.address, 25)
})
```

`emit` eşleştiricisi, bir sözleşmenin bir yöntemi çağırırken bir etkinlik yayımlayıp yayımlamadığını kontrol etmemizi sağlar. `emit` eşleştiricisinin parametreleri olarak, olayı yayımlayacağını tahmin ettiğimiz taklit sözleşmeyi ve bu olayın adını sağlıyoruz. Bizim durumumuzda, taklit sözleşme `splitter` ve olayın adı `Transfer`'dir. Ayrıca, olayın yayımlandığı sırada verilen argümanların kesin değerlerini de doğrulayabiliriz; `withArgs` eşleştiricisine, olay bildirimi beklediğimiz sayıda argümanı aktarırız. EtherSplitter sözleşmesi durumunda ise, gönderici ve alıcının adresleri ile transfer edilen wei miktarını aktarırız.

## revertedWith {#revertedwith}

Son örnek olarak, wei miktarının çift olmadığı durumlarda işlemin geri dönüp dönmediğini kontrol edeceğiz. `revertedWith` eşleştiricisini kullanacağız:

```ts
it("Reverts when Vei amount uneven", async () => {
  await expect(splitter.split({ value: 51 })).to.be.revertedWith(
    "Uneven wei amount not allowed"
  )
})
```

Eğer test başarılı olursa, işlemin gerçekten geri döndüğüne emin olacağız. Ancak `require` ifadesine aktardığımız mesajlar ile `revertedWith` içinde beklediğimiz mesaj arasında kesin bir eşleşme olmalıdır. EtherSplitter sözleşmesinin koduna geri dönersek, wei miktarı için `require` ifadesine mesaj olarak "Tek wei miktarına izin verilmiyor" ifadesini giriyoruz. Bu, testimizde beklediğimiz mesajla eşleşir. Eğer eşit değillerse, test başarısız olacaktır.

# Tebrikler! {#congratulations}

Waffle ile akıllı sözleşmeleri test etmenin ilk büyük adımını tamamladınız! Diğer Waffle öğreticileri de ilginizi çekebilir:

- [ERC20 sözleşmelerini Waffle ile test etme](/developers/tutorials/testing-erc-20-tokens-with-waffle/)
- [Waffle: Dinamik taklit ve sözleşme çağrılarını test etme](/developers/tutorials/waffle-dynamic-mocking-and-testing-calls/#gatsby-focus-wrapper)
- [Hardhat ve ethers ile Waffle'da merhaba dünya öğreticisi](/developers/tutorials/waffle-hello-world-with-buidler-tutorial/)
