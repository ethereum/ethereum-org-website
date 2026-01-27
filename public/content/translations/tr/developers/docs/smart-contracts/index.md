---
title: Akıllı sözleşmelere giriş
description: Akıllı sözleşmelerin benzersiz özelliklerine ve kısıtlamalarına odaklanan genel bir bakış.
lang: tr
---

## Akıllı sözleşme nedir? Akıllı sözleşme nedir? {#what-is-a-smart-contract}

Bir "akıllı sözleşme" basitçe Ethereum blok zincirinde çalışan bir programdır. Ethereum blok zincirindeki özel bir adreste bulunan bir kod (sözleşmenin fonksiyonları) ve veri (sözleşmenin durumu) koleksiyonudur.

Akıllı sözleşmeler bir tür [Ethereum hesabıdır](/developers/docs/accounts/). Bu, onların bir dengeye sahip olduğu ve işlemlerinin hedefi olabilecekleri anlamına gelir. Ancak bir kullanıcı tarafından kontrol edilmezler, bunun yerine ağa dağıtılırlar ve programlandıkları gibi çalışırlar. Sonrasında kullanıcı hesapları akıllı sözleşmede tanımlanmış bir fonksiyonu yürüten işlemler göndererek akıllı sözleşme ile etkileşime geçebilirler. Akıllı sözleşmeler, normal bir sözleşmeye benzer şekilde kurallar belirleyebilir ve bu kuralları kod aracılığıyla zorunlu kılabilirler. Akıllı sözleşmeler varsayılan olarak silinemezler ve onlarla yapılan etkileşimler geri alınamaz.

## Ön Koşullar {#prerequisites}

Yeni başlıyorsanız veya daha az teknik bir giriş arıyorsanız, [akıllı sözleşmelere giriş](/smart-contracts/) yazımızı öneririz.

Akıllı sözleşmeler dünyasına dalmadan önce [hesaplar](/developers/docs/accounts/), [işlemler](/developers/docs/transactions/) ve [ethereum sanal makinesi](/developers/docs/evm/) hakkında bilgi edindiğinizden emin olun.

## Dijital bir otomat {#a-digital-vending-machine}

[Nick Szabo'nun da](https://unenumerated.blogspot.com/) belirttiği gibi, bir akıllı sözleşme için en iyi metafor belki de bir otomattır. Doğru girdilerle, belli bir çıktı garanti edilir.

Otomattan bir atıştırmalık almak için:

```
para + atıştırmalık seçimi = atıştırmalık verildi
```

Bu mantık otomatın içine programlanmıştır.

Bir akıllı sözleşme, tıpkı bir otomat gibi içine programlanmış bir mantığa sahiptir. Solidity'de yazılmış bir akıllı sözleşme olsaydı otomatın nasıl görüneceğini aşağıdaki basit örnekte görebilirsiniz:

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Sözleşmenin durum değişkenlerini bildirin
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // 'VendingMachine' sözleşmesi dağıtıldığında:
    // 1. dağıtan adresi sözleşmenin sahibi olarak ayarlayın
    // 2. dağıtılan akıllı sözleşmenin kek bakiyesini 100'e ayarlayın
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Sahibin akıllı sözleşmenin kek bakiyesini artırmasına izin verin
    function refill(uint amount) public {
        require(msg.sender == owner, "Yalnızca sahibi yeniden doldurabilir.");
        cupcakeBalances[address(this)] += amount;
    }

    // Herkesin kek satın almasına izin verin
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "Kek başına en az 1 ETH ödemelisiniz");
        require(cupcakeBalances[address(this)] >= amount, "Bu satın alımı tamamlamak için stokta yeterli kek yok");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Bir otomatın bir kasiyere olan ihtiyacı yok etmesi gibi, akıllı sözleşmeler de birçok endüstrideki aracıların yerini alabilir.

## İzin gerektirmeyen {#permissionless}

Herkes bir akıllı sözleşme yazabilir ve onu ağa dağıtabilir. Tek yapmanız gereken bir [akıllı sözleşme dilinde](/developers/docs/smart-contracts/languages/) kod yazmayı öğrenmek ve sözleşmenizi dağıtmak için yeterli ETH'ye sahip olmaktır. Bir akıllı sözleşmenin dağıtılması teknik olarak bir işlem olduğundan, basit bir ETH transferi için gaz ödediğiniz gibi bunun için de [gaz](/developers/docs/gas/) ödemeniz gerekir. Ancak akıllı sözleşme dağıtımının gaz masrafı çok daha fazladır.

Ethereum, akıllı sözleşme yazmak için geliştirici dostu dillere sahiptir:

- Solidity
- Vyper

[Diller hakkında daha fazlası](/developers/docs/smart-contracts/languages/)

Ancak, Ethereum sanal makinesinin sözleşmeyi yorumlayabilmesi ve depolayabilmesi için dağıtılmadan önce derlenmeleri gerekir. [Derleme hakkında daha fazlası](/developers/docs/smart-contracts/compiling/)

## Birleştirilebilirlik {#composability}

Akıllı sözleşmeler Ethereum üzerinde herkese açıktır ve açık API'ler olarak düşünülebilirler. Bu, kendi akıllı sözleşmenizde başka akıllı sözleşmeleri çağırarak olanakları büyük ölçüde genişletebileceğiniz anlamına gelir. Sözleşmeler, başka sözleşmeleri bile dağıtabilir.

[Akıllı sözleşme birleştirilebilirliği](/developers/docs/smart-contracts/composability/) hakkında daha fazla bilgi edinin.

## Sınırlamalar {#limitations}

Akıllı sözleşmeler, zincir dışı kaynaklardan veri çekemedikleri için tek başlarına "gerçek dünya" olayları hakkında bilgi toplayamazlar. Dolayısıyla gerçek dünyada gerçekleşen olaylara yanıt veremezler. Bu, tasarımlarının bir gereğidir. Dış bilgiye bağımlı olmak, güvenlik ve merkeziyetsizlik için önemli olan mutabakatı riske atabilir.

Ancak blokzincir uygulamaları için zincir dışından edinilen verileri kullanabilmek önemlidir. Çözüm, zincir dışı verileri alıp akıllı sözleşmeler için kullanılabilir hale getiren araçlar olan [kâhinlerdir](/developers/docs/oracles/).

Akıllı sözleşmelerin diğer bir kısıtlaması ise maksimum sözleşme boyutudur. Bir akıllı sözleşme maksimum 24 KB olabilir: Aksi takdirde sahip olduğu gaz tükenir. Bu, [Elmas Modeli (The Diamond Pattern)](https://eips.ethereum.org/EIPS/eip-2535) kullanılarak aşılabilir.

## Çoklu imzalı (Multisig) sözleşmeler {#multisig}

Çoklu imza sözleşmeleri, bir işlemi gerçekleştirmek için birden fazla geçerli imza gerektiren akıllı sözleşme hesaplarıdır. Bu, önemli miktarda ether veya diğer tokenleri tutan sözleşmeler için tek başarısızlık noktalarından kaçınmak için çok kullanışlıdır. Çoklu imzalar, ayrıca sözleşme yürütme ve anahtar yönetimi sorumluluğunu birden fazla taraf arasında bölüştürür ve tek bir özel anahtarın geri dönüşü olmayan fon kaybına yol açmasını önler. Bu nedenlerle, basit DAO yönetişimi için çoklu imza sözleşmeleri kullanılabilir. Çoklu imzalar, yürütülmek için M olası kabul edilebilir imza arasından N imza gerektirir (burada N ≤ M ve M > 1). `N = 3, M = 5` ve `N = 4, M = 7` yaygın olarak kullanılır. 4/7 çoklu imza, olası yedi geçerli imzadan dördünü gerektirir. Bu, üç imza kaybolsa bile fonların geri alınabileceği anlamına gelir. Bu durumda, sözleşmenin uygulanabilmesi için anahtar sahiplerinin çoğunluğunun kabul etmesi ve imzalaması gerektiği anlamına da gelir.

## Akıllı sözleşme kaynakları {#smart-contract-resources}

**OpenZeppelin Contracts -** **_Güvenli akıllı sözleşme geliştirme kütüphanesi._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Topluluk Forumu](https://forum.openzeppelin.com/c/general/16)

## Daha fazla kaynak {#further-reading}

- [Coinbase: Akıllı sözleşme nedir?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink: Akıllı sözleşme nedir?](https://chain.link/education/smart-contracts)
- [Video: Basit Anlatım - Akıllı Sözleşmeler](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft: Web3 öğrenme ve denetim platformu](https://updraft.cyfrin.io)
