---
title: Akıllı sözleşme kütüphaneleri
description:
lang: tr
---

Projenizdeki her akıllı sözleşmeyi sıfırdan yazmanız gerekmez. Projenize yeniden kullanılabilir yapı taşları sağlayarak her şeyi sıfırdan yapmanıza gerek bırakmayacak birçok açık kaynak akıllı sözleşme kütüphanesi bulunmaktadır.

## Ön koşullar {#prerequisites}

Akıllı sözleşme kütüphanelerine dalmadan önce, bir akıllı sözleşmenin yapısı hakkında derin bir anlayışa sahip olmanız iyi olur. Henüz buna sahip değilseniz [akıllı sözleşme anatomisine](/developers/docs/smart-contracts/anatomy/) gidin.

## Kütüphanenin içindekiler {#whats-in-a-library}

Genelde akıllı sözleşme kütüphanelerinde iki tür yapı taşı bulunur: sözleşmelerinize ekleyebileceğiniz yeniden kullanılabilir davranışlar ve çeşitli standartların uygulamaları.

### Davranışlar {#behaviors}

Büyük ihtimalle, akıllı sözleşmeler yazarken bir sözleşmede korunan işlemler gerçekleştirmek için bir _yönetici_ adresi atamak veya beklenmeyen bir sıkıntı esnasında acil bir _duraklatma_ düğmesi eklemek gibi benzer kalıpları sürekli yazıp durduğunuzu göreceksiniz.

Akıllı sözleşme kütüphaneleri, genellikle bu davranışların yeniden kullanılabilir uygulamalarını Solidity'de [kütüphane](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) veya [kalıtım](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) olarak saklarlar.

[OpenZeppelin Contracts kütüphanesinden](https://github.com/OpenZeppelin/openzeppelin-contracts) alınmış, [`Ownable` sözleşmesinin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) basitleştirilmiş hâli örnek olarak aşağıda sunulmuştur. Bu sözleşme, bir adresi bir sözleşmenin sahipliğine atar ve bir yönteme erişimi sadece adresin sahibiyle sınırlamak için bir niteleyici sağlar.

```solidity
contract Ownable {
    address public owner;

    constructor() internal {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }
}
```

Sözleşmenizde bunun gibi bir yapı taşı kullanmak istiyorsanız, ilk olarak onu içeri aktarmanız, sonrasında ise kendi sözleşmelerinizi onun üzerinden yapılandırmanız gerekir. Bu, temel `Ownable` sözleşmesinden sağlanan niteleyiciyi kendi ilşevlerinizi güvenli hâle getirmek için kullanmanıza izin verecektir.

```solidity
import ".../Ownable.sol"; // Path to the imported library

contract MyContract is Ownable {
    // The following function can only be called by the owner
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

[SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) ya da [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html) de diğer ünlü örnekler arasındadır. Bunlar, dil tarafından sağlanmayan taşma kontrollü aritmetik fonksiyonlar sağlayan kütüphanelerdir (temel sözleşme yerine). Ana aritmetik işlemler yerine sözleşmenizi feci sonuçlar oluşturan taşmalardan korumak için bu kütüphanelerden birini kullanmak iyi bir yöntemdir!

### Standartlar {#standards}

[Birleştirilebilirliği ve birlikte çalışabilirliği](/developers/docs/smart-contracts/composability/) kolaylaştırmak için, Ethereum topluluğu **ERC** denilen birtakım standartlar belirlemiştir. Bunlar hakkında daha fazlasını [standartlar](/developers/docs/standards/) kısmında okuyabilirsiniz.

Sözleşmelerinize bir ERC dahil ederken, kendi başınıza dağıtmaktansa standart uygulamalar aramak iyi bir fikirdir. Birçok akıllı sözleşme kütüphanesi en popüler ERC'ler için uygulamalar içerir. Örnek olarak, her yerde yaygın olan [ERC20 değiştirilebilir token standartı](/developers/tutorials/understand-the-erc-20-token-smart-contract/) [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token/) ve [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20)'de bulunabilir. Ek olarak, bazı ERC'ler yerleşik olarak kurallı uygulamalar sağlarlar.

Bazı ERC'lerin yekpare değil, başka ERC'lerin ekleri olduğunu söylemek gerekir. Örneğin [ERC2612](https://eips.ethereum.org/EIPS/eip-2612), kullanılabilirliğini geliştirmek için ERC20'ye bir eklenti ekler.

## Kütüphane ekleme {#how-to}

Her zaman dahil ettiğiniz kütüphanenin belgelerinde bulunan, projenin nasıl dahil edileceğine dair özel yönergelere başvurun. Birçok Solidity sözleşme kütüphanesi `npm` kullanılarak paketlenmiştir, bu yüzden onları sadece `npm install` ile indirebilirsiniz. Sözleşmeleri [derlemeye](/developers/docs/smart-contracts/compiling/) yarayan birçok araç, akıllı sözleşme kütüphaneleri için `node_modules` klasörünüze bakacaktır, bu yüzden aşağıdakileri yapabilirsiniz:

```solidity
// This will load the @openzeppelin/contracts library from your node_modules
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

Kullandığınız yola bakmaksızın, bir kütüphane dahil ederken, her zaman gözünüz [dil](/developers/docs/smart-contracts/languages/) sürümünün üzerinde olsun. Misal, eğer sözleşmelerinizi Solidity 0.5'te yazıyorsanız Solidity 0.6 için olan bir kütüphaneyi kullanamazsınız.

## Ne zaman kullanmalı {#when-to-use}

Projeniz için bir akıllı sözleşme kütüphanesi kullanmanın birçok yararı vardır. İlk ve en önemlisi, kendiniz kodlamanızdansa size kullanıma hazır, sisteminize dahil edebileceğiniz yapı taşları sunarak zamandan tasarruf etmenizi sağlar.

Güvenlik ayrıca büyük bir artısıdır. Açık kaynak akıllı sözleşme kütüphaneleri sık sık ciddi ölçüde denetlenir. Birçok projenin onlara dayandığı ele alındığında, onların sürekli teftiş altında tutulması topluluk tarafından güçlü bir teşvik bulmaktadır. Uygulama kodunda hatalar bulmak, yeniden kullanılabilir sözleşme kütüphanelerinden çok daha yaygındır. Bazı kütüphaneler, ek güvenlik için [dış denetimlerden](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits) de geçer.

Ancak, akıllı sözleşme kütüphanelerini kullanmak aşina olmadığınız kodu projenize dahil etme riskini de beraberinde getirir. Bir sözleşmeyi aktarmak ve projenize doğrudan dahil etmek çekici gelebilir, ancak o sözleşmenin ne yaptığı hakkında iyi bir anlayışa sahip olmadan, farkında olmadan sisteminizde beklenmeyen davranışlara bağlı olarak bir soruna neden olabilirsiniz. Her zaman dahil ettiğiniz kodun belgelerini okuduğunuzdan emin olun ve kodu projenizin bir parçası yapmadan önce gözden geçirin!

Son olarak, bir kütüphaneyi dahil edip etmeyeceğinize karar verirken, onun genel kullanımını göz önünde bulundurun. Geniş çapta kabul edilmiş bir tanesi, daha büyük bir topluluğa sahip olma ve sorunlar için daha çok gözden geçirme gibi yararlara sahiptir. Akıllı sözleşmeler yaparken güvenlik ana odağınız olmalıdır!

## İlgili araçlar {#related-tools}

**OpenZeppelin Contracts -** **_Güvenli akıllı sözleşme geliştirme için en popüler kütüphanedir._**

- [Belgeler](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Topluluk Forumu](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Akıllı sözleşmeler için güvenli, basit ve esnek yapılı yapı taşlarıdır._**

- [Belgeler](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_Gerçek dünya için çok özellikli dağıtılmış uygulamalar inşa etmenize yardımcı olacak; sözleşmeleri, kütüphaneleri ve örnekleri olan bir Solidity projesi._**

- [GitHub](https://github.com/HQ20/contracts)

**thirdweb Solidity SDK -** **_Özel akıllı sözleşmeleri verimli bir şekilde oluşturmak için gereken araçları sağlar_**

- [Dokümanlar](https://portal.thirdweb.com/solidity/)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## İlgili eğitimler {#related-tutorials}

- [Ethereum geliştiricilerinin güvenlik konusunda dikkat etmesi gereken hususlar](/developers/docs/smart-contracts/security/) _– Akıllı sözleşme oluşturma sırasında, kütüphane kullanımı da dahil olmak üzere güvenlik konusunda dikkat edilmesi gereken hususlar hakkında bir öğretici._
- [ERC-20 jeton akıllı sözleşmesini anlamak](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _-Birden fazla kütüphane tarafından sağlanan, ERC20 standardı hakkında bir öğretici._

## Daha fazla bilgi {#further-reading}

_Size yardımcı olan bir topluluk kaynağı biliyor musunuz? Bu sayfayı düzenleyin ve ekleyin!_
