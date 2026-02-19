---
title: "Solidity akıllı sözleşmeleri test etmek için nasıl taklit edilir?"
description: "Neden sözleşmelerinizi test ederken dalga geçmelisiniz?"
author: Markus Waas
lang: tr
tags:
  [
    "solidity",
    "akıllı kontratlar",
    "test etmek",
    "taklit etme"
  ]
skill: intermediate
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[Taklit nesneler](https://wikipedia.org/wiki/Mock_object), nesne yönelimli programlamada yaygın olarak kullanılan bir tasarım modelidir. Fransızca'dan gelen "mocquer" kelimesi "dalga geçmek" anlamındadır. Bu kelime "gerçek olan bir şeyi taklit etmek" anlamına evrilmiştir ki bu, tam olarak programlamada yaptığımız şeydir. Akıllı sözleşmelerinizle lütfen sadece istediğiniz zaman dalga geçin ama her boş vaktinizde onları taklit edin. Bu, hayatınızı kolaylaştıracak.

## Taklit nesnelerle sözleşmelerin birim testi {#unit-testing-contracts-with-mocks}

Bir sözleşmeyi taklit etmek, sözleşmenin gerçek hali gibi davranan ve geliştirici tarafından kolayca kontrol edilebilen ikinci bir versiyonunu oluşturmak anlamına gelir. Çoğu zaman, yalnızca [sözleşmenin küçük kısımlarına birim testi yapmak](/developers/docs/smart-contracts/testing/) istediğiniz karmaşık sözleşmelerle karşılaşırsınız. Buradaki sorun, ya bu ufak parçanın test edilmesi çok detaylı bir sözleşme durumu gerektiriyorsa ve buna ulaşmak zorsa?

Her seferinde sözleşmeyi istenen duruma getiren karmaşık bir test yazabilir veya "taklitlerle" işinizi kolayca halledebilirsiniz. Bir sözleşme, kalıtım yöntemiyle kolayca taklit edilebilir. Orijinal sözleşmeyi içeren ikinci bir taklit sözleşme yazın. Şimdi fonksiyonları taklit sözleşmeniz için geçersiz kılabilirsiniz. Bir örnekle görelim.

## Örnek: Özel ERC20 {#example-private-erc20}

Başlangıç özel zamanı olan örnek bir ERC-20 sözleşmesi kullanıyoruz. Sözleşmenin sahibi özel kullanıcıları yönetebilir ve başlangıçta yalnızca bu kullanıcıların jeton almasına izin verir. Belirli bir zaman geçtikten sonra herkes jetonları kullanabilecektir. Merak ediyorsanız, yeni OpenZeppelin sözleşmeleri v3'ten gelen [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) kancasını kullanıyoruz.

```solidity
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PrivateERC20 is ERC20, Ownable {
    mapping (address => bool) public isPrivateUser;
    uint256 private publicAfterTime;

    constructor(uint256 privateERC20timeInSec) ERC20("PrivateERC20", "PRIV") public {
        publicAfterTime = now + privateERC20timeInSec;
    }

    function addUser(address user) external onlyOwner {
        isPrivateUser[user] = true;
    }

    function isPublic() public view returns (bool) {
        return now >= publicAfterTime;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);

        require(_validRecipient(to), "PrivateERC20: geçersiz alıcı");
    }

    function _validRecipient(address to) private view returns (bool) {
        if (isPublic()) {
            return true;
        }

        return isPrivateUser[to];
    }
}
```

Şimdi sözleşmeyi taklit edelim.

```solidity
pragma solidity ^0.6.0;
import "../PrivateERC20.sol";

contract PrivateERC20Mock is PrivateERC20 {
    bool isPublicConfig;

    constructor() public PrivateERC20(0) {}

    function setIsPublic(bool isPublic) external {
        isPublicConfig = isPublic;
    }

    function isPublic() public view returns (bool) {
        return isPublicConfig;
    }
}
```

Şu hata mesajlarından birini alacaksınız:

- `PrivateERC20Mock.sol: TypeError: Geçersiz kılan fonksiyon "override" niteleyicisini içermiyor.`
- `PrivateERC20.sol: TypeError: Sanal olmayan bir işlevi geçersiz kılmaya çalışılıyor. "virtual" eklemeyi unuttunuz mu?.`

Yeni Solidity 0.6 sürümünü kullandığımız için, üzerine yazılabilecek fonksiyonlar için `virtual` anahtar kelimesini ve üzerine yazan fonksiyon için de override anahtar kelimesini eklemeliyiz. Öyleyse bunları her iki `isPublic` fonksiyonuna da ekleyelim.

Artık birim testlerinizde bunun yerine `PrivateERC20Mock` kullanabilirsiniz. Özel kullanım süresi sırasındaki davranışı test etmek istediğinizde `setIsPublic(false)` kullanın ve benzer şekilde, genel kullanım süresini test etmek için `setIsPublic(true)` kullanın. Elbette örneğimizde, zamanları buna göre değiştirmek için [zaman yardımcılarını](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) da kullanabiliriz. Ancak taklit amacı artık açık olmalıdır ve bunun sadece zamanı ilerletmek kadar kolay olmadığı durumları hayal edebilirsiniz.

## Birçok sözleşmeyi taklit etme {#mocking-many-contracts}

Her taklit için ayrı bir sözleşme oluşturmak karışıklık oluşturabilir. Bu durum sizi rahatsız ediyorsa, [MockContract](https://github.com/gnosis/mock-contract) kütüphanesine göz atabilirsiniz. Size anlık olarak sözleşmelerin davranışlarını değiştirme ve geçersiz kılma olanağı sağlar. Ancak, yalnızca diğer bir sözleşmeye yapılan taklitler için çalışır; bu nedenle, örneğimizde işe yaramaz.

## Taklit etme daha da güçlü olabilir {#mocking-can-be-even-more-powerful}

Taklit etmenin gücü burada bitmiyor.

- Fonksiyon ekleme: Sadece belirli bir işlevi geçersiz kılmak açısından değil, aynı zamanda ilave fonksiyonlar eklemek açısından da kullanışlıdır. Jetonlar için iyi bir örnek, herhangi bir kullanıcının ücretsiz olarak yeni jetonlar almasını sağlamak için ek bir `mint` işlevine sahip olmaktır.
- Test ağlarında kullanım: Sözleşmelerinizi merkeziyetsiz uygulamalarınızla birlikte test ağlarına dağıtıp test ettiğinizde, taklit sürümlerini kullanmayı düşünün. Mecbur kalmadıkça fonksiyonları geçersiz kılmaktan kaçının. Sonuçta arkasındaki gerçek mantığı test etmek istiyorsunuz. Fakat örneğin, sözleşme durumunu en başa sıfırlayan ve yeni bir dağıtım gerektirmeyen bir sıfırlama işlevi eklemek de yararlı olabilir. Tabii ki de bunu bir Ana Ağ sözleşmesinde kullanmak istemezsiniz.
