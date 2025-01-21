---
title: Akıllı sözleşmelere giriş
description: Akıllı sözleşmelerin benzersiz özelliklerine ve kısıtlamalarına odaklanan genel bir bakış.
lang: tr
---

## Akıllı sözleşme nedir? {#what-is-a-smart-contract}

Bir "akıllı sözleşme" basitçe Ethereum blok zincirinde çalışan bir programdır. Ethereum blok zincirindeki özel bir adreste bulunan bir kod (sözleşmenin fonksiyonları) ve veri (sözleşmenin durumu) koleksiyonudur.

Akıllı sözleşmeler bir tür [Ethereum hesabıdır](/developers/docs/accounts/). Bu, onların bir dengeye sahip olduğu ve işlemlerinin hedefi olabilecekleri anlamına gelir. Ancak bir kullanıcı tarafından kontrol edilmezler, bunun yerine ağa dağıtılırlar ve programlandıkları gibi çalışırlar. Sonrasında kullanıcı hesapları akıllı sözleşmede tanımlanmış bir fonksiyonu yürüten işlemler göndererek akıllı sözleşme ile etkileşime geçebilirler. Akıllı sözleşmeler, normal bir sözleşmeye benzer şekilde kurallar belirleyebilir ve bu kuralları kod aracılığıyla zorunlu kılabilirler. Akıllı sözleşmeler varsayılan olarak silinemezler ve onlarla yapılan etkileşimler geri alınamaz.

## Ön Koşullar {#prerequisites}

Yeni başlıyorsanız veya daha az teknik bir giriş arıyorsanız, [akıllı sözleşmelere girişimizi](/smart-contracts/) öneririz.

Akıllı sözleşmelerin dünyasına atlamadan önce [hesaplar](/developers/docs/accounts/), [işlemler](/developers/docs/transactions/) ve [Ethereum Sanal Makinesi](/developers/docs/evm/) hakkında yeterince bilgi sahibi olduğunuzdan emin olun.

## Dijital bir otomat {#a-digital-vending-machine}

[Nick Szabo](https://unenumerated.blogspot.com/)'nun açıkladığı gibi, bir akıllı sözleşme için en iyi metafor, muhtemelen bir otomattır. Doğru girdilerle, belli bir çıktı garanti edilir.

Otomattan bir atıştırmalık almak için:

```
money + snack selection = snack dispensed
```

Bu mantık otomatın içine programlanmıştır.

Bir akıllı sözleşme, tıpkı bir otomat gibi içine programlanmış bir mantığa sahiptir. Solidity'de yazılmış bir akıllı sözleşme olsaydı otomatın nasıl görüneceğini aşağıdaki basit örnekte görebilirsiniz:

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Declare state variables of the contract
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // When 'VendingMachine' contract is deployed:
    // 1. set the deploying address as the owner of the contract
    // 2. set the deployed smart contract's cupcake balance to 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Allow the owner to increase the smart contract's cupcake balance
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // Allow anyone to purchase cupcakes
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Bir otomatın bir kasiyere olan ihtiyacı yok etmesi gibi, akıllı sözleşmeler de birçok endüstrideki aracıların yerini alabilir.

## İzne dayalı olmama {#permissionless}

Herkes bir akıllı sözleşme yazabilir ve onu ağa dağıtabilir. Sadece bir [akıllı sözleşme dilinde](/developers/docs/smart-contracts/languages/) kod yazmayı öğrenmeniz ve sözleşmenizi dağıtmaya yetecek kadar ETH sahibi olmanız gerekir. Bir akıllı sözleşmenin dağıtılması, teknik olarak bir işlem olduğundan basit bir ETH transferi için gaz ödediğiniz gibi bunun için de [gaz](/developers/docs/gas/) ödemeniz gerekir. Ancak akıllı sözleşme dağıtımının gaz masrafı çok daha fazladır.

Ethereum, akıllı sözleşme yazmak için geliştirici dostu dillere sahiptir:

- Solidity
- Vyper

[Diller hakkında daha fazlası](/developers/docs/smart-contracts/languages/)

Ancak, Ethereum sanal makinesinin sözleşmeyi yorumlayabilmesi ve depolayabilmesi için dağıtılmadan önce derlenmeleri gerekir. [Derleme üzerine daha fazla bilgi](/developers/docs/smart-contracts/compiling/)

## Birleştirilebilirlik {#composability}

Akıllı sözleşmeler Ethereum üzerinde herkese açıktır ve açık API'ler olarak düşünülebilirler. Bu, kendi akıllı sözleşmenizde başka akıllı sözleşmeleri çağırarak olanakları büyük ölçüde genişletebileceğiniz anlamına gelir. Sözleşmeler, başka sözleşmeleri bile dağıtabilir.

[Akıllı sözleşme birleştirilebilirliği](/developers/docs/smart-contracts/composability/) hakkında fazlasını öğrenin.

## Kısıtlamalar {#limitations}

Akıllı sözleşmeler, zincir dışındaki kaynaklardan veri çekemedikleri için kendi başlarına ''gerçek dünya'' olayları hakkında bilgi toplayamaz. Dolayısıyla gerçek dünyada gerçekleşen olaylara yanıt veremezler. Bu, tasarımlarının bir gereğidir. Dış bilgiye bağımlı olmak, güvenlik ve merkeziyetsizlik için önemli olan mutabakatı riske atabilir.

Ancak blokzincir uygulamaları için zincir dışından edinilen verileri kullanabilmek önemlidir. Çözüm ise zincir dışından edinilen verileri sentezleyip akıllı sözleşmeler için kullanılabilir hale getiren araçlar olan [kâhinlerdir](/developers/docs/oracles/).

Akıllı sözleşmelerin diğer bir kısıtlaması ise maksimum sözleşme boyutudur. Bir akıllı sözleşme maksimum 24 KB olabilir: Aksi takdirde sahip olduğu gaz tükenir. Bu, [Elmas Deseni](https://eips.ethereum.org/EIPS/eip-2535) kullanılarak aşılabilir.

## Çoklu imza sözleşmeleri {#multisig}

Çoklu imza sözleşmeleri, bir işlemi gerçekleştirmek için birden fazla geçerli imza gerektiren akıllı sözleşme hesaplarıdır. Bu, önemli miktarda ether veya diğer tokenleri tutan sözleşmeler için tek başarısızlık noktalarından kaçınmak için çok kullanışlıdır. Çoklu imzalar, ayrıca sözleşme yürütme ve anahtar yönetimi sorumluluğunu birden fazla taraf arasında bölüştürür ve tek bir özel anahtarın geri dönüşü olmayan fon kaybına yol açmasını önler. Bu nedenlerle, basit DAO yönetişimi için çoklu imza sözleşmeleri kullanılabilir. Çoklu imzalar, yürütmek için M olası kabul edilebilir imzadan (burada N ≤ M ve M > 1 olduğunda) N imza gerektirir. `N = 3, M = 5` ve `N = 4, M = 7` yaygın olarak kullanılır. 4/7 çoklu imza, olası yedi geçerli imzadan dördünü gerektirir. Bu, üç imza kaybolsa bile fonların geri alınabileceği anlamına gelir. Bu durumda, sözleşmenin uygulanabilmesi için anahtar sahiplerinin çoğunluğunun kabul etmesi ve imzalaması gerektiği anlamına da gelir.

## Akıllı sözleşme kaynakları {#smart-contract-resources}

**OpenZeppelin Kontratları -** **_Güvenli akıllı sözleşme geliştirme kütüphanesidir._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Topluluk Forumu](https://forum.openzeppelin.com/c/general/16)

## Daha fazla okuma {#further-reading}

- [Coinbase: Akıllı sözleşme nedir?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink: Akıllı sözleşme nedir?](https://chain.link/education/smart-contracts)
- [Video: Basit Anlatım - Akıllı Sözleşmeler](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft: Web3 öğrenme ve denetim platformu](https://updraft.cyfrin.io)
