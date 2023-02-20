---
title: Akıllı sözleşmelere giriş
description: Akıllı sözleşmelerin benzersiz özelliklerine ve kısıtlamalarına odaklanan genel bir bakış.
lang: tr
---

## Akıllı sözleşme nedir? {#what-is-a-smart-contract}

Bir "akıllı sözleşme" basitçe Ethereum blok zincirinde çalışan bir programdır. Ethereum blok zincirindeki özel bir adreste bulunan bir kod (sözleşmenin fonksiyonları) ve veri (sözleşmenin durumu) koleksiyonudur.

Akıllı sözleşmeler bir tür [Ethereum hesabıdır](/developers/docs/accounts/). Bu, bir bakiyeye sahip oldukları ve ağ üzerinde işlemler gönderebildikleri anlamına gelir. Ancak bir kullanıcı tarafından kontrol edilmezler, bunun yerine ağa dağıtılırlar ve programlandıkları gibi çalışırlar. Sonrasında kullanıcı hesapları akıllı sözleşmede tanımlanmış bir fonksiyonu yürüten işlemler göndererek akıllı sözleşme ile etkileşime geçebilirler. Akıllı sözleşmeler, normal bir sözleşmeye benzer şekilde kurallar belirleyebilir ve bu kuralları kod aracılığıyla zorunlu kılabilirler. Akıllı sözleşmeler varsayılan olarak silinemezler ve onlarla yapılan etkileşimler geri alınamaz.

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

Bir akıllı sözleşme, tıpkı bir otomat gibi içine programlanmış bir mantığa sahiptir. Burada bu otomat bir akıllı sözleşme olsaydı nasıl gözükebileceğinin basit bir örneği bulunuyor:

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

Herkes bir akıllı sözleşme yazabilir ve onu ağa dağıtabilir. Sadece bir [akıllı sözleşme dilinde](/developers/docs/smart-contracts/languages/) kod yazmayı öğrenmeniz ve sözleşmenizi dağıtmaya yetecek kadar ETH sahibi olmanız gerekir. Bir akıllı sözleşme dağıtmak teknik olarak bir işlem olduğu için basit bir ETH aktarımında gaz ödeyeceğiniz gibi bunda da [Gaz](/developers/docs/gas/) ödemeniz gerekir. Ancak sözleşme dağıtımları için gaz ücretleri çok daha yüksektir.

Ethereum, akıllı sözleşme yazmak için geliştirici dostu dillere sahiptir:

- Solidity
- Vyper

[Diller hakkında daha fazlası](/developers/docs/smart-contracts/languages/)

Ancak, Ethereum sanal makinesinin sözleşmeyi yorumlayabilmesi ve depolayabilmesi için dağıtılmadan önce derlenmeleri gerekir. [Derleme üzerine daha fazla bilgi](/developers/docs/smart-contracts/compiling/)

## Birleştirilebilirlik {#composability}

Akıllı sözleşmeler Ethereum üzerinde herkese açıktır ve açık API'ler olarak düşünülebilirler. Bu, olanakları büyük ölçüde genişletmek için kendi akıllı sözleşmenizde başka akıllı sözleşmeleri çağırabileceğiniz anlamına gelir. Sözleşmeler, başka sözleşmeleri bile dağıtabilir.

[Akıllı sözleşme birleştirilebilirliği](/developers/docs/smart-contracts/composability/) hakkında fazlasını öğrenin.

## Kısıtlamalar {#limitations}

Akıllı sözleşmeler "gerçek hayat" olayları hakkında tek başlarına bilgi edinemezler çünkü HTTP istekleri gönderemezler. Bu şekilde tasarlanmıştır. Dış bilgiye bağlı kalmak, güvenlik ve merkeziyetsizlik için önemli olan mutabakatı riske atabilir.

Bu, [kâhinler](/developers/docs/oracles/) ile çözülebilir.

Akıllı sözleşmelerin diğer bir kısıtlaması ise maksimum sözleşme boyutudur. Bir akıllı sözleşme maksimum 24 KB olabilir: Aksi takdirde sahip olduğu gaz tükenir. Bu, [Elmas Deseni](https://eips.ethereum.org/EIPS/eip-2535) kullanılarak aşılabilir.

## Akıllı sözleşme kaynakları {#smart-contract-resources}

**OpenZeppelin Contracts -** **_Güvenli akıllı sözleşme geliştirme kütüphanesidir._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Topluluk Forumu](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Akıllı sözleşmeler için güvenli, basit ve esnek yapılı yapı taşlarıdır._**

- [Dappsys](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

## Daha fazla bilgi {#further-reading}

- [Akıllı Sözleşmeler: Avukatların Yerini Alacak Blok Zinciri Teknolojisi](https://blockgeeks.com/guides/smart-contracts/) _– Blockgeeks_
- [Akıllı Sözleşme Geliştirme için En İyi Yöntemler](https://yos.io/2019/11/10/smart-contract-development-best-practices/) _– 10 Kasım 2019 - Yos Riady_
- [Temiz sözleşmeler: akıllı sözleşme desenleri ve yöntemleri hakkında kılavuz](https://www.wslyvh.com/clean-contracts/) _– 30 Nisan 2020 - wslyvh_
