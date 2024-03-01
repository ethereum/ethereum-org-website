---
title: "Hardhat ve ethers ile Waffle'da merhaba dünya öğreticisi"
description: Hardhat ve ethers.js ile ilk Waffle projenizi yapın
author: "MiZiet"
tags:
  - "waffle"
  - "akıllı sözleşmeler"
  - "katılık"
  - "test"
  - "hardhat"
  - "ethers.js"
skill: beginner
lang: tr
published: 2020-10-16
---

Bu [Waffle](https://ethereum-waffle.readthedocs.io) öğreticisinde, [hardhat](https://hardhat.org/) ve [ethers.js](https://docs.ethers.io/v5/) kullanarak basit bir "Merhaba dünya" akıllı sözleşme projesinin nasıl kurulacağını öğreneceğiz. Ardından akıllı sözleşmemize nasıl yeni bir işlevsellik ekleyeceğimizi ve Waffle ile nasıl test edeceğimizi öğreneceğiz.

Yeni proje oluşturarak başlayalım:

```bash
yarn init
```

veya

```bash
npm init
```

ve gerekli paketleri kurarak başlayalım:

```bash
yarn add -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

veya

```bash
npm install -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

Sonraki adım, `npx hardhat` çalıştırarak örnek bir hardhat projesi oluşturmaktır.

```bash
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Hardhat v2.0.3 Hoşgeldin 👷‍

? Ne yapmak istersin? …
❯ Create a sample project
Create an empty hardhat.config.js
Quit
```

`Create a sample project`'i seçin

Projemizin yapısı bu şekilde gözükmeli:

```
MyWaffleProject
├── contracts
│   └── Greeter.sol
├── node_modules
├── scripts
│   └── sample-script.js
├── test
│   └── sample-test.js
├── .gitattributs
├── .gitignore
├── hardhat.config.js
└── package.json
```

### Biraz da bu dosyalardan bahsedelim: {#now-lets-talk}

- Greeter.sol - solidity ile yazılmış akıllı sözleşmemiz;

```solidity
contract Greeter {
string greeting;

constructor(string memory _greeting) public {
console.log("Deploying a Greeter with greeting:", _greeting);
greeting = _greeting;
}

function greet() public view returns (string memory) {
return greeting;
}

function setGreeting(string memory _greeting) public {
console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
greeting = _greeting;
}
}
```

Akıllı sözleşmemiz üç bölüme ayrılabilir:

1. constructor - burada `greeting` adında bir dize türü değişkeni bildiririz,
2. function greet - çağrıldığında `greeting` döndüren bir fonksiyon,
3. function setGreeting - `greeting` değerini değiştirmemizi sağlayan bir fonksiyon.

- sample-test.js - test dosyamız

```js
describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter")
    const greeter = await Greeter.deploy("Hello, world!")

    await greeter.deployed()
    expect(await greeter.greet()).to.equal("Hello, world!")

    await greeter.setGreeting("Hola, mundo!")
    expect(await greeter.greet()).to.equal("Hola, mundo!")
  })
})
```

### Sonraki adım, sözleşmemizi derlemek ve testleri çalıştırmaktan oluşur: {#compiling-and-testing}

Waffle testleri, Mocha'yı (bir test çerçevesi) ve Chai'yi (bir teyit kütüphanesi) kullanır. Tek yapmanız gereken `npx hardhat test` çalıştırmak ve aşağıdaki mesajın görünmesini beklemek.

```bash
✓ Should return the new greeting once it's changed
```

### Buraya kadar her şey harika görünüyor, hadi projemize biraz daha karmaşık hâle getirelim <Emoji text=":slightly_smiling_face:" size={1}/> {#adding-complexity}

Birinin selamlama olarak boş bir dize eklediği bir durum hayal edin. Pek sıcakkanlı bir selamlama olmaz, değil mi?  
Bunun önüne geçelim:

Birisi boş bir dizeyi geçirdiğinde, solidity'nin `revert` özelliğini kullanmak istiyoruz. Bu işlevselliği Waffle'ın chai eşleyicisi `to.be.revertedWith()` ile kolayca test edebilmemiz oldukça faydalıdır.

```js
it("Should revert when passing an empty string", async () => {
  const Greeter = await ethers.getContractFactory("Greeter")
  const greeter = await Greeter.deploy("Hello, world!")

  await greeter.deployed()
  await expect(greeter.setGreeting("")).to.be.revertedWith(
    "Greeting should not be empty"
  )
})
```

Görünüşe göre yeni testimiz geçemedi:

```bash
Deploying a Greeter with greeting: Hello, world!
Changing greeting from 'Hello, world!' to 'Hola, mundo!'
    ✓ Should return the new greeting once it's changed (1514ms)
Deploying a Greeter with greeting: Hello, world!
Changing greeting from 'Hello, world!' to ''
    1) Should revert when passing an empty string


  1 passing (2s)
  1 failing
```

Bu fonksiyonu akıllı sözleşmemize uygulayalım:

```solidity
require(bytes(_greeting).length > 0, "Greeting should not be empty");
```

Şimdi, setGreeting fonksiyonumuz bu şekilde gözüküyor:

```solidity
function setGreeting(string memory _greeting) public {
require(bytes(_greeting).length > 0, "Greeting should not be empty");
console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
greeting = _greeting;
}
```

Tekrar testleri çalıştıralım:

```bash
✓ Should return the new greeting once it's changed (1467ms)
✓ Should revert when passing an empty string (276ms)

2 passing (2s)
```

Tebrikler! Başardınız :)

### Sonuç {#conclusion}

Waffle, Hardhat ve ethers.js ile basit bir proje yaptık. Bir projenin nasıl kurulacağını, bir testin nasıl ekleneceğini ve yeni fonksiyonların nasıl uygulanacağını öğrendik.

Akıllı sözleşmelerinizi test edecek daha fazla harika chai eşleyiciler için [resmi Waffle belgelerine](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html) bakın.
