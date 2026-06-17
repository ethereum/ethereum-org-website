---
title: Akıllı sözleşmelere giriş
description: Akıllı sözleşmelerin benzersiz özelliklerine ve sınırlamalarına odaklanan bir genel bakış.
lang: tr
---

## Akıllı sözleşme nedir? {#what-is-a-smart-contract}

Bir "akıllı sözleşme", basitçe [Ethereum](/) blokzincirinde çalışan bir programdır. Ethereum blokzincirinde belirli bir adreste bulunan kod (işlevleri) ve verilerin (durumu) bir koleksiyonudur.

Akıllı sözleşmeler bir tür [Ethereum hesabıdır](/developers/docs/accounts/). Bu, bir bakiyeleri olduğu ve işlemlerin hedefi olabilecekleri anlamına gelir. Ancak bir kullanıcı tarafından kontrol edilmezler, bunun yerine ağa dağıtılırlar ve programlandığı gibi çalışırlar. Kullanıcı hesapları daha sonra, akıllı sözleşmede tanımlanan bir işlevi yürüten işlemler göndererek bir akıllı sözleşme ile etkileşime girebilir. Akıllı sözleşmeler, normal bir sözleşme gibi kurallar tanımlayabilir ve bunları kod aracılığıyla otomatik olarak uygulayabilir. Akıllı sözleşmeler varsayılan olarak silinemez ve onlarla olan etkileşimler geri alınamaz.

## Ön koşullar {#prerequisites}

Eğer yeni başlıyorsanız veya daha az teknik bir giriş arıyorsanız, [akıllı sözleşmelere giriş](/smart-contracts/) bölümümüzü öneririz.

Akıllı sözleşmeler dünyasına dalmadan önce [hesaplar](/developers/docs/accounts/), [işlemler](/developers/docs/transactions/) ve [Ethereum sanal makinesi](/developers/docs/evm/) hakkında okuduğunuzdan emin olun.

## Dijital bir otomat {#a-digital-vending-machine}

Bir akıllı sözleşme için belki de en iyi metafor, [Nick Szabo](https://unenumerated.blogspot.com/) tarafından tanımlandığı gibi bir otomattır. Doğru girdilerle, belirli bir çıktı garanti edilir.

Bir otomattan atıştırmalık almak için:

```
para + atıştırmalık seçimi = atıştırmalık verildi
```

Bu mantık otomata programlanmıştır.

Bir akıllı sözleşme, tıpkı bir otomat gibi, içine programlanmış bir mantığa sahiptir. İşte bu otomatın Solidity ile yazılmış bir akıllı sözleşme olsaydı nasıl görüneceğine dair basit bir örnek:

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Sözleşmenin durum değişkenlerini tanımla
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // 'VendingMachine' sözleşmesi dağıtıldığında:
    // 1. dağıtan adresi sözleşmenin sahibi olarak ayarla
    // 2. dağıtılan akıllı sözleşmenin cupcake bakiyesini 100 olarak ayarla
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Sahibinin akıllı sözleşmenin cupcake bakiyesini artırmasına izin ver
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // Herkesin cupcake satın almasına izin ver
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Bir otomatın bir satıcı çalışanına olan ihtiyacı ortadan kaldırması gibi, akıllı sözleşmeler de birçok sektörde aracıların yerini alabilir.

## İzinsiz {#permissionless}

Herkes bir akıllı sözleşme yazabilir ve bunu ağa dağıtabilir. Sadece bir [akıllı sözleşme dilinde](/developers/docs/smart-contracts/languages/) nasıl kod yazılacağını öğrenmeniz ve sözleşmenizi dağıtmak için yeterli ETH'ye sahip olmanız gerekir. Bir akıllı sözleşmeyi dağıtmak teknik olarak bir işlemdir, bu nedenle basit bir ETH transferi için gaz ödemeniz gerektiği gibi [gaz](/developers/docs/gas/) ödemeniz gerekir. Ancak, sözleşme dağıtımı için gaz maliyetleri çok daha yüksektir.

Ethereum, akıllı sözleşmeler yazmak için geliştirici dostu dillere sahiptir:

- Solidity
- Vyper

[Diller hakkında daha fazlası](/developers/docs/smart-contracts/languages/)

Ancak, Ethereum'un sanal makinesinin sözleşmeyi yorumlayabilmesi ve saklayabilmesi için dağıtılmadan önce derlenmeleri gerekir. [Derleme hakkında daha fazlası](/developers/docs/smart-contracts/compiling/)

## Birleştirilebilirlik {#composability}

Akıllı sözleşmeler Ethereum'da herkese açıktır ve açık API'ler olarak düşünülebilir. Bu, nelerin mümkün olduğunu büyük ölçüde genişletmek için kendi akıllı sözleşmenizde diğer akıllı sözleşmeleri çağırabileceğiniz anlamına gelir. Sözleşmeler başka sözleşmeleri bile dağıtabilir.

[Akıllı sözleşme birleştirilebilirliği](/developers/docs/smart-contracts/composability/) hakkında daha fazla bilgi edinin.

## Sınırlamalar {#limitations}

Akıllı sözleşmeler tek başlarına "gerçek dünya" olayları hakkında bilgi alamazlar çünkü zincir dışı kaynaklardan veri alamazlar. Bu, gerçek dünyadaki olaylara yanıt veremeyecekleri anlamına gelir. Bu, tasarım gereğidir. Dış bilgilere güvenmek, güvenlik ve merkeziyetsizlik için önemli olan mutabakatı tehlikeye atabilir.

Ancak, blokzincir uygulamalarının zincir dışı verileri kullanabilmesi önemlidir. Çözüm, zincir dışı verileri alan ve bunları akıllı sözleşmelerin kullanımına sunan araçlar olan [kâhinlerdir](/developers/docs/oracles/).

Akıllı sözleşmelerin bir diğer sınırlaması da maksimum sözleşme boyutudur. Bir akıllı sözleşme maksimum 24KB olabilir, aksi takdirde gazı biter. Bu durum, [Elmas Deseni (The Diamond Pattern)](https://eips.ethereum.org/EIPS/eip-2535) kullanılarak aşılabilir.

## Çoklu imza sözleşmeleri {#multisig}

Çoklu imza (multisig) sözleşmeleri, bir işlemi yürütmek için birden fazla geçerli imza gerektiren akıllı sözleşme hesaplarıdır. Bu, önemli miktarda Ether veya diğer tokenleri tutan sözleşmeler için tek bir hata noktasından kaçınmak açısından çok yararlıdır. Çoklu imzalar ayrıca sözleşme yürütme ve anahtar yönetimi sorumluluğunu birden fazla taraf arasında böler ve tek bir özel anahtarın kaybının geri döndürülemez fon kaybına yol açmasını önler. Bu nedenlerle, çoklu imza sözleşmeleri basit DAO yönetişimi için kullanılabilir. Çoklu imzalar, yürütmek için M olası kabul edilebilir imzadan N imza gerektirir (burada N ≤ M ve M > 1). `N = 3, M = 5` ve `N = 4, M = 7` yaygın olarak kullanılır. 4/7'lik bir çoklu imza, yedi olası geçerli imzadan dördünü gerektirir. Bu, üç imza kaybolsa bile fonların hala geri alınabileceği anlamına gelir. Bu durumda, sözleşmenin yürütülebilmesi için anahtar sahiplerinin çoğunluğunun aynı fikirde olması ve imzalaması gerektiği anlamına da gelir.

## Akıllı sözleşme kaynakları {#smart-contract-resources}

**OpenZeppelin Contracts -** **_Güvenli akıllı sözleşme geliştirme kütüphanesi._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Topluluk Forumu](https://forum.openzeppelin.com/c/general/16)

## Daha fazla bilgi {#further-reading}

- [Coinbase: Akıllı sözleşme nedir?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink: Akıllı sözleşme nedir?](https://chain.link/education/smart-contracts)
- [Video: Basitçe Açıklandı - Akıllı Sözleşmeler](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft: Web3 öğrenme ve denetim platformu](https://updraft.cyfrin.io)

## Eğitimler: Ethereum üzerinde akıllı sözleşme imzaları (EIP-1271) {#tutorials}

- [EIP-1271: Akıllı Sözleşme İmzalarını İmzalama ve Doğrulama](/developers/tutorials/eip-1271-smart-contract-signatures/) _– EIP-1271'in akıllı sözleşmelerin imzaları doğrulamasına nasıl olanak tanıdığı ve Safe uygulamasının bir incelemesi._