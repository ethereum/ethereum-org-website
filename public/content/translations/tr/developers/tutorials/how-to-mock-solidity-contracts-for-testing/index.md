---
title: Test için Solidity akıllı sözleşmeleri nasıl mock'lanır
description: Test yaparken sözleşmelerinizle neden dalga geçmelisiniz
author: Markus Waas
lang: tr
tags: ["solidity", "akıllı sözleşmeler", "test etme", "mocking"]
skill: intermediate
breadcrumb: Sözleşmeleri mock'lamak
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[Mock (taklit) nesneleri](https://wikipedia.org/wiki/Mock_object), nesne yönelimli programlamada yaygın bir tasarım desenidir. 'Dalga geçmek' anlamına gelen eski Fransızca 'mocquer' kelimesinden gelerek, aslında programlamada yaptığımız şey olan 'gerçek bir şeyi taklit etme' anlamını kazanmıştır. Lütfen sadece isterseniz akıllı sözleşmelerinizle dalga geçin, ancak yapabildiğiniz her zaman onları mock'layın (taklit edin). Bu, hayatınızı kolaylaştırır.

## Sözleşmeleri mock'lar ile birim testine tabi tutmak {#unit-testing-contracts-with-mocks}

Bir sözleşmeyi mock'lamak, temel olarak o sözleşmenin orijinaline çok benzer davranan, ancak geliştirici tarafından kolayca kontrol edilebilecek şekilde ikinci bir versiyonunu oluşturmak anlamına gelir. Genellikle sadece [sözleşmenin küçük parçalarını birim testine tabi tutmak](/developers/docs/smart-contracts/testing/) istediğiniz karmaşık sözleşmelerle karşılaşırsınız. Sorun şu ki, ya bu küçük parçayı test etmek, ulaşılması zor olan çok spesifik bir sözleşme durumu gerektiriyorsa?

Sözleşmeyi her seferinde gerekli duruma getiren karmaşık bir test kurulum mantığı yazabilirsiniz veya bir mock yazabilirsiniz. Bir sözleşmeyi mock'lamak kalıtım (inheritance) ile kolaydır. Sadece orijinalinden kalıtım alan ikinci bir mock sözleşmesi oluşturun. Artık mock'unuzdaki işlevleri geçersiz kılabilirsiniz (override). Bunu bir örnekle görelim.

## Örnek: Özel ERC-20 {#example-private-erc20}

Başlangıçta özel bir süresi olan örnek bir ERC-20 sözleşmesi kullanıyoruz. Sahibi özel kullanıcıları yönetebilir ve başlangıçta yalnızca bu kullanıcıların token almasına izin verilir. Belirli bir süre geçtikten sonra, herkesin token'ları kullanmasına izin verilecektir. Merak ediyorsanız, yeni OpenZeppelin sözleşmeleri v3'teki [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) kancasını (hook) kullanıyoruz.

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

        require(_validRecipient(to), "PrivateERC20: invalid recipient");
    }

    function _validRecipient(address to) private view returns (bool) {
        if (isPublic()) {
            return true;
        }

        return isPrivateUser[to];
    }
}
```

Ve şimdi onu mock'layalım.

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

Aşağıdaki hata mesajlarından birini alacaksınız:

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

Yeni 0.6 Solidity sürümünü kullandığımız için, geçersiz kılınabilen işlevler için `virtual` anahtar kelimesini ve geçersiz kılan işlev için override anahtar kelimesini eklemeliyiz. Öyleyse bunları her iki `isPublic` işlevine de ekleyelim.

Artık birim testlerinizde bunun yerine `PrivateERC20Mock` kullanabilirsiniz. Özel kullanım süresi boyunca davranışı test etmek istediğinizde `setIsPublic(false)` ve benzer şekilde genel kullanım süresini test etmek için `setIsPublic(true)` kullanın. Elbette örneğimizde, zamanları buna göre değiştirmek için sadece [zaman yardımcılarını (time helpers)](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) da kullanabilirdik. Ancak mock'lama fikri artık netleşmiş olmalı ve zamanı basitçe ileri sarmak kadar kolay olmayan senaryoları hayal edebilirsiniz.

## Birçok sözleşmeyi mock'lamak {#mocking-many-contracts}

Her bir mock için başka bir sözleşme oluşturmanız gerekirse işler karışabilir. Eğer bu sizi rahatsız ediyorsa, [MockContract](https://github.com/gnosis/mock-contract) kütüphanesine göz atabilirsiniz. Sözleşmelerin davranışlarını anında (on-the-fly) geçersiz kılmanıza ve değiştirmenize olanak tanır. Ancak, yalnızca başka bir sözleşmeye yapılan çağrıları mock'lamak için çalışır, bu nedenle örneğimiz için işe yaramayacaktır.

## Mock'lamak daha da güçlü olabilir {#mocking-can-be-even-more-powerful}

Mock'lamanın gücü bununla sınırlı değildir.

- İşlevler eklemek: Sadece belirli bir işlevi geçersiz kılmak değil, aynı zamanda ek işlevler eklemek de faydalıdır. Token'lar için iyi bir örnek, herhangi bir kullanıcının ücretsiz olarak yeni token'lar almasına izin veren ek bir `mint` işlevine sahip olmaktır.
- Test ağlarında kullanım: Sözleşmelerinizi merkeziyetsiz uygulamanız (dapp) ile birlikte test ağlarında dağıttığınızda ve test ettiğinizde, mock'lanmış bir sürüm kullanmayı düşünün. Gerçekten zorunda kalmadıkça işlevleri geçersiz kılmaktan kaçının. Sonuçta gerçek mantığı test etmek istersiniz. Ancak örneğin, sözleşme durumunu başlangıca sıfırlayan ve yeni bir dağıtım gerektirmeyen bir sıfırlama işlevi eklemek faydalı olabilir. Açıkçası bunu bir Ana Ağ sözleşmesinde bulundurmak istemezsiniz.