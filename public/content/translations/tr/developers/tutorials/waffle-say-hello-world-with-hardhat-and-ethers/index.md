---
title: "Hardhat ve ethers ile Waffle'da merhaba dünya öğreticisi"
description: Hardhat ve ethers.js ile ilk Waffle projenizi yapın
author: "MiZiet"
tags:
  [
    "waffle",
    "akıllı kontratlar",
    "katılık",
    "test etmek",
    "hardhat",
    "ethers.js"
  ]
skill: beginner
lang: tr
published: 2020-10-16
---

Bu [Waffle](https://ethereum-waffle.readthedocs.io) öğreticisinde, [hardhat](https://hardhat.org/) ve [ethers.js](https://docs.ethers.io/v5/) kullanarak basit bir "Merhaba dünya" akıllı sözleşme projesinin nasıl kurulacağını öğreneceğiz. Ardından akıllı sözleşmemize nasıl yeni bir işlevsellik ekleyeceğimizi ve Waffle ile nasıl test edeceğimizi öğreneceğiz.

Yeni bir proje oluşturarak başlayalım:

```bash
yarn init
```

veya

```bash
npm init
```

ve gerekli paketleri kurarak:

```bash
yarn add -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

veya

```bash
npm install -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

Sonraki adım, `npx hardhat` komutunu çalıştırarak örnek bir hardhat projesi oluşturmaktır.

```bash
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Hardhat v2.0.3 sürümüne hoş geldiniz 👷‍

? Ne yapmak istersiniz? …
❯ Örnek bir proje oluştur
Boş bir hardhat.config.js oluştur
Çık
```

`Create a sample project` seçeneğini seçin

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
├── .gitattributes
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
console.log("Bir Greeter şu selamlama ile dağıtılıyor:", _greeting);
greeting = _greeting;
}

function greet() public view returns (string memory) {
return greeting;
}

function setGreeting(string memory _greeting) public {
console.log("'%s' olan selamlama '%s' olarak değiştiriliyor", greeting, _greeting);
greeting = _greeting;
}
}
```

Akıllı sözleşmemiz üç bölüme ayrılabilir:

1. constructor - `greeting` adında bir dize türü değişkeni bildirdiğimiz yer,
2. function greet - çağrıldığında `greeting` değerini döndüren bir fonksiyon,
3. function setGreeting - `greeting` değerini değiştirmemizi sağlayan bir fonksiyon.

- sample-test.js - test dosyamız

```js
describe("Greeter", function () {
  it("Değiştirildiğinde yeni selamlamayı döndürmelidir", async function () {
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

Waffle testleri, Mocha'yı (bir test çerçevesi) ve Chai'yi (bir teyit kütüphanesi) kullanır. Tek yapmanız gereken `npx hardhat test` komutunu çalıştırmak ve aşağıdaki mesajın görünmesini beklemektir.

```bash
✓ Değiştirildiğinde yeni selamlamayı döndürmelidir
```

### Şu ana kadar her şey harika görünüyor, projemize biraz daha karmaşıklık ekleyelim <Emoji text=":slightly_smiling_face:" size={1}/> {#adding-complexity}

Birinin selamlama olarak boş bir dize eklediği bir durum hayal edin. Bu sıcak bir karşılama olmazdı, değil mi?  
Bunun olmamasını sağlayalım:

Birisi boş bir dize geçtiğinde solidity'nin `revert` özelliğini kullanmak istiyoruz. İyi yanı ise bu işlevselliği Waffle'ın chai eşleştiricisi `to.be.revertedWith()` ile kolayca test edebilmemizdir.

```js
it("Boş bir dize geçirildiğinde geri alınmalıdır", async () => {
  const Greeter = await ethers.getContractFactory("Greeter")
  const greeter = await Greeter.deploy("Hello, world!")

  await greeter.deployed()
  await expect(greeter.setGreeting("")).to.be.revertedWith(
    "Selamlama boş olmamalıdır"
  )
})
```

Görünüşe göre yeni testimiz geçemedi:

```bash
Bir Greeter şu selamlama ile dağıtılıyor: Hello, world!
'Hello, world!' olan selamlama 'Hola, mundo!' olarak değiştiriliyor
    ✓ Değiştirildiğinde yeni selamlamayı döndürmelidir (1514ms)
Bir Greeter şu selamlama ile dağıtılıyor: Hello, world!
'Hello, world!' olan selamlama '' olarak değiştiriliyor
    1) Boş bir dize geçirildiğinde geri alınmalıdır


  1 geçen (2s)
  1 başarısız
```

Bu işlevselliği akıllı sözleşmemize uygulayalım:

```solidity
require(bytes(_greeting).length > 0, "Selamlama boş olmamalıdır");
```

Şimdi, setGreeting fonksiyonumuz bu şekilde gözüküyor:

```solidity
function setGreeting(string memory _greeting) public {
require(bytes(_greeting).length > 0, "Selamlama boş olmamalıdır");
console.log("'%s' olan selamlama '%s' olarak değiştiriliyor", greeting, _greeting);
greeting = _greeting;
}
```

Tekrar testleri çalıştıralım:

```bash
✓ Değiştirildiğinde yeni selamlamayı döndürmelidir (1467ms)
✓ Boş bir dize geçirildiğinde geri alınmalıdır (276ms)

2 geçen (2s)
```

Tebrikler! Başardınız :)

### Sonuç {#conclusion}

Waffle, Hardhat ve ethers.js ile basit bir proje yaptık. Bir projenin nasıl kurulacağını, bir testin nasıl ekleneceğini ve yeni işlevselliklerin nasıl uygulanacağını öğrendik.

Akıllı sözleşmelerinizi test etmek için daha fazla harika chai eşleştiricisi için [Waffle'ın resmi belgelerine](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html) göz atın.
