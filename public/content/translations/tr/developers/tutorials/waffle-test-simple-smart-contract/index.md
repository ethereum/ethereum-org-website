---
title: "Waffle kütüphanesiyle basit bir akıllı sözleşmeyi test etme"
description: "Yeni başlayanlar için öğretici"
author: Ewa Kowalska
tags:
  [
    "akıllı kontratlar",
    "katılık",
    "Waffle",
    "test etmek"
  ]
skill: beginner
lang: tr
published: 2021-02-26
---

## Bu öğreticide şunları öğreneceksiniz {#in-this-tutorial-youll-learn-how-to}

- Cüzdan bakiyesindeki değişimleri test etme
- Belirtilen argümanlarla olay yayımlanmasını test etme
- Bir işlemin geri alındığını doğrulama

## Varsayımlar {#assumptions}

- Yeni bir JavaScript ya da TypeScript projesi oluşturabilirsiniz
- JavaScript'te testler konusunda temel deneyime sahipsiniz.
- Yarn ya da npm gibi bazı paket yöneticilerini daha önce kullandınız
- Akıllı sözleşmeler ve Solidity ile ilgili giriş seviyesinde bilgi sahibisiniz

## Başlarken {#getting-started}

Bu öğretici, yarn kullanarak test kurulumunu ve çalıştırmayı göstermektedir ancak npm'i tercih ederseniz de sorun olmaz - Resmi Waffle [dokümantasyonuna](https://ethereum-waffle.readthedocs.io/en/latest/index.html) yönlendiren uygun referansları sağlayacağım.

## Bağımlılıkları Yükleme {#install-dependencies}

Projenizin geliştirme bağımlılıklarına ethereum-waffle ve typescript bağımlılıklarını [ekleyin](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#installation).

```bash
yarn add --dev ethereum-waffle ts-node typescript @types/jest
```

## Örnek akıllı sözleşme {#example-smart-contract}

Öğretici boyunca basit bir akıllı sözleşme örneği olan EtherSplitter üzerinde çalışacağız. Bu, herhangi birinin belirli bir miktarda wei göndermesine ve bu miktarı önceden tanımlanmış iki alıcı arasında eşit olarak bölmesine izin vermenin haricinde pek bir şey yapmaz.
Bölme işlevi, wei miktarının çift olmasını gerektirir, aksi takdirde geri alınır. Her iki alıcı için de bir wei transferi gerçekleştirir ve ardından Transfer olayını yayar.

EtherSplitter kod parçacığını `src/EtherSplitter.sol` içine yerleştirin.

```solidity
pragma solidity ^0.6.0;\n\ncontract EtherSplitter {\n    address payable receiver1;\n    address payable receiver2;\n\n    event Transfer(address from, address to, uint256 amount);\n\n    constructor(address payable _address1, address payable _address2) public {\n        receiver1 = _address1;\n        receiver2 = _address2;\n    }\n\n    function split() public payable {\n        require(msg.value % 2 == 0, 'Tek wei miktarına izin verilmez');\n        receiver1.transfer(msg.value / 2);\n        emit Transfer(msg.sender, receiver1, msg.value / 2);\n        receiver2.transfer(msg.value / 2);\n        emit Transfer(msg.sender, receiver2, msg.value / 2);\n    }\n}
```

## Sözleşmeyi derleme {#compile-the-contract}

Sözleşmeyi [derlemek](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#compiling-the-contract) için package.json dosyasına aşağıdaki girdiyi ekleyin:

```json
\"scripts\": {\n    \"build\": \"waffle\"\n  }
```

Ardından, proje kök dizininde `waffle.json` Waffle yapılandırma dosyasını oluşturun ve aşağıdaki yapılandırmayı oraya yapıştırın:

```json
{\n  \"compilerType\": \"solcjs\",\n  \"compilerVersion\": \"0.6.2\",\n  \"sourceDirectory\": \"./src\",\n  \"outputDirectory\": \"./build\"\n}
```

`yarn build` komutunu çalıştırın. Sonuç olarak, `build` dizini, içinde JSON formatında derlenmiş EtherSplitter sözleşmesiyle birlikte görünecektir.

## Test kurulumu {#test-setup}

Waffle ile test yapmak Chai eşleştiricileri ve Mocha kullanımını gerektirir, bu nedenle bunları projenize [eklemeniz](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests) gerekir. `package.json` dosyanızı güncelleyin ve komut dosyaları bölümüne `test` girdisini ekleyin:

```json
\"scripts\": {\n    \"build\": \"waffle\",\n    \"test\": \"export NODE_ENV=test && mocha -r ts-node/register 'test/**/*.test.ts'\"\n  }
```

Testlerinizi [çalıştırmak](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#running-tests) isterseniz, `yarn test` komutunu çalıştırmanız yeterlidir.

## Test etme {#testing}

Şimdi `test` dizinini ve `test\\EtherSplitter.test.ts` adlı yeni dosyayı oluşturun.
Aşağıdaki kod parçasını kopyalayın ve test dosyanıza yapıştırın.

```ts
import { expect, use } from \"chai\"\nimport { Contract } from \"ethers\"\nimport { deployContract, MockProvider, solidity } from \"ethereum-waffle\"\nimport EtherSplitter from \"../build/EtherSplitter.json\"\n\nuse(solidity)\n\ndescribe(\"Ether Bölücü\", () => {\n  const [sender, receiver1, receiver2] = new MockProvider().getWallets()\n  let splitter: Contract\n\n  beforeEach(async () => {\n    splitter = await deployContract(sender, EtherSplitter, [\n      receiver1.address,\n      receiver2.address,\n    ])\n  })\n\n  // testleri buraya ekleyin\n})
```

Başlamadan önce birkaç kelime.
`MockProvider`, blokzincirinin sahte bir sürümünü sunar. Ayrıca, EtherSplitter sözleşmesini test etmek için sahte cüzdanlar da sunar. Sağlayıcıda `getWallets()` yöntemini çağırarak en fazla on cüzdan alabiliriz. Örnekte üç cüzdan alıyoruz: biri gönderici, ikisi de alıcılar için.

Ardından, 'splitter' adında bir değişken tanımlıyoruz - bu bizim sahte EtherSplitter sözleşmemiz. `deployContract` yöntemi tarafından her bir testin yürütülmesinden önce oluşturulur. Bu yöntem, ilk parametre olarak aktarılan cüzdandan (bizim durumumuzda göndericinin cüzdanı) bir sözleşmenin dağıtımını simüle eder. İkinci parametre, test edilen sözleşmenin ABI'si ve bayt kodudur - buraya `build` dizininden derlenmiş EtherSplitter sözleşmesinin json dosyasını iletiyoruz. Üçüncü parametre, sözleşmenin oluşturucu argümanlarının bir dizisidir; bizim durumumuzda ise alıcıların iki adresidir.

## changeBalances {#changebalances}

İlk olarak, bölme yönteminin alıcıların cüzdan bakiyelerini gerçekten değiştirip değiştirmediğini kontrol edeceğiz. Göndericinin hesabından 50 wei bölersek, her iki alıcının bakiyesinin de 25 wei artmasını bekleriz. Waffle'ın `changeBalances` eşleştiricisini kullanacağız:

```ts
it(\"Hesap bakiyelerini değiştirir\", async () => {\n  await expect(() => splitter.split({ value: 50 })).to.changeBalances(\n    [receiver1, receiver2],\n    [25, 25]\n  )\n})
```

Eşleştiricinin ilk parametresi olarak alıcıların cüzdanlarının bir dizisini ve ikinci olarak da ilgili hesaplarda beklenen artışları içeren bir diziyi aktarırız.
Belirli bir cüzdanın bakiyesini kontrol etmek isteseydik, aşağıdaki örnekte olduğu gibi dizi geçmeyi gerektirmeyen `changeBalance` eşleştiricisini de kullanabilirdik:

```ts
it(\"Hesap bakiyesini değiştirir\", async () => {\n  await expect(() => splitter.split({ value: 50 })).to.changeBalance(\n    receiver1,\n    25\n  )\n})
```

Hem `changeBalance` hem de `changeBalances` durumlarında, eşleştiricinin çağrıdan önceki ve sonraki bakiye durumlarına erişmesi gerektiği için bölme işlevini bir callback olarak geçtiğimizi unutmayın.

Sonra, her wei transferi sonrası Transfer olayının yayımlanıp yayımlanmadığını test ediyoruz. Waffle'daki başka bir eşleştiriciye geçeceğiz:

## Emit {#emit}

```ts
it(\"İlk alıcıya yapılan transferde olayı yayar\", async () => {\n  await expect(splitter.split({ value: 50 }))\n    .to.emit(splitter, \"Transfer\")\n    .withArgs(sender.address, receiver1.address, 25)\n})\n\nit(\"İkinci alıcıya yapılan transferde olayı yayar\", async () => {\n  await expect(splitter.split({ value: 50 }))\n    .to.emit(splitter, \"Transfer\")\n    .withArgs(sender.address, receiver2.address, 25)\n})
```

`emit` eşleştiricisi, bir sözleşmenin bir yöntemi çağırırken bir olay yayımlayıp yayımlamadığını kontrol etmemizi sağlar. `emit` eşleştiricisinin parametreleri olarak, olayı yayacağını tahmin ettiğimiz sahte sözleşmeyi ve o olayın adını belirtiriz. Bizim durumumuzda, sahte sözleşme `splitter` ve olayın adı `Transfer`'dır. Ayrıca olayın yayımlandığı argümanların kesin değerlerini de doğrulayabiliriz - olay bildirimimizin beklediği kadar argümanı `withArgs` eşleştiricisine geçiririz. EtherSplitter sözleşmesi durumunda ise, gönderici ve alıcının adresleri ile transfer edilen wei miktarını aktarırız.

## revertedWith {#revertedwith}

Son örnek olarak, tek sayıda wei olması durumunda işlemin geri alınıp alınmadığını kontrol edeceğiz. `revertedWith` eşleştiricisini kullanacağız:

```ts
it(\"Wei miktarı tek olduğunda geri döner\", async () => {\n  await expect(splitter.split({ value: 51 })).to.be.revertedWith(\n    \"Tek wei miktarına izin verilmez\"\n  )\n})
```

Test geçerse, işlemin gerçekten geri alındığından emin olacağız. Ancak `require` ifadesinde geçtiğimiz mesaj ile `revertedWith` içinde beklediğimiz mesaj arasında tam bir eşleşme olmalıdır. EtherSplitter sözleşmesinin koduna geri dönersek, wei miktarı için `require` ifadesinde şu mesajı sağlıyoruz: 'Tek wei miktarına izin verilmez'. Bu, testimizde beklediğimiz mesajla eşleşir. Eğer eşit değillerse, test başarısız olacaktır.

## Tebrikler! {#congratulations}

Waffle ile akıllı sözleşmeleri test etmenin ilk büyük adımını tamamladınız!
