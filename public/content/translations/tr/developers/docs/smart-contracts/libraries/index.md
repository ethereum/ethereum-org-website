---
title: Akıllı sözleşme kütüphaneleri
description: Ethereum geliştirme projelerinizi hızlandırmak için yeniden kullanılabilir akıllı sözleşme kütüphanelerini ve yapı taşlarını keşfedin.
lang: tr
---

Projenizdeki her akıllı sözleşmeyi sıfırdan yazmanız gerekmez. Projenize yeniden kullanılabilir yapı taşları sağlayarak her şeyi sıfırdan yapmanıza gerek bırakmayacak birçok açık kaynak akıllı sözleşme kütüphanesi bulunmaktadır.

## Ön Koşullar {#prerequisites}

Akıllı sözleşme kütüphanelerine dalmadan önce, bir akıllı sözleşmenin yapısı hakkında derin bir anlayışa sahip olmanız iyi olur. Henüz yapmadıysanız [akıllı sözleşme anatomisi](/developers/docs/smart-contracts/anatomy/) sayfasına gidin.

## Bir kütüphanede neler var? {#whats-in-a-library}

Genelde akıllı sözleşme kütüphanelerinde iki tür yapı taşı bulunur: sözleşmelerinize ekleyebileceğiniz yeniden kullanılabilir davranışlar ve çeşitli standartların uygulamaları.

### Davranışlar {#behaviors}

Akıllı sözleşmeler yazarken, bir sözleşmede korumalı işlemleri gerçekleştirmek için bir _admin_ adresi atamak veya beklenmedik bir sorun durumunda acil bir _duraklatma_ düğmesi eklemek gibi benzer kalıpları tekrar tekrar yazdığınızı fark etme olasılığınız yüksektir.

Akıllı sözleşme kütüphaneleri genellikle bu davranışların yeniden kullanılabilir uygulamalarını Solidity'de [kütüphaneler](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) olarak veya [kalıtım](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) yoluyla sağlar.

Örnek olarak, [OpenZeppelin Contracts kütüphanesinden](https://github.com/OpenZeppelin/openzeppelin-contracts) alınan ve bir adresi bir sözleşmenin sahibi olarak belirleyen ve bir yönteme erişimi yalnızca o sahiple kısıtlamak için bir değiştirici sağlayan [`Ownable` sözleşmesinin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) basitleştirilmiş bir sürümü aşağıdadır.

```solidity
contract Ownable {
    address public owner;

    constructor() internal {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: çağıran kişi sahip değil");
        _;
    }
}
```

Sözleşmenizde bunun gibi bir yapı taşı kullanmak istiyorsanız, ilk olarak onu içeri aktarmanız, sonrasında ise kendi sözleşmelerinizi onun üzerinden yapılandırmanız gerekir. Bu, kendi işlevlerinizi güvence altına almak için temel `Ownable` sözleşmesi tarafından sağlanan değiştiriciyi kullanmanıza olanak tanır.

```solidity
import ".../Ownable.sol"; // İçe aktarılan kütüphanenin yolu

contract MyContract is Ownable {
    // Aşağıdaki işlev yalnızca sahip tarafından çağrılabilir
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

Diğer bir popüler örnek [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) veya [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html)'tir. Bunlar, dil tarafından sağlanmayan taşma kontrollü aritmetik fonksiyonlar sağlayan kütüphanelerdir (temel sözleşme yerine). Ana aritmetik işlemler yerine sözleşmenizi feci sonuçlar oluşturan taşmalardan korumak için bu kütüphanelerden birini kullanmak iyi bir yöntemdir!

### Standartlar {#standards}

[Oluşturulabilirliği ve birlikte çalışabilirliği](/developers/docs/smart-contracts/composability/) kolaylaştırmak için Ethereum topluluğu, **ERC'ler** şeklinde çeşitli standartlar tanımlamıştır. Bunlar hakkında daha fazlasını [standartlar](/developers/docs/standards/) bölümünde okuyabilirsiniz.

Sözleşmelerinize bir ERC dahil ederken, kendi başınıza dağıtmaktansa standart uygulamalar aramak iyi bir fikirdir. Birçok akıllı sözleşme kütüphanesi en popüler ERC'ler için uygulamalar içerir. Örneğin, yaygın olan [ERC20 değiştirilebilir jeton standardı](/developers/tutorials/understand-the-erc-20-token-smart-contract/) [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token) ve [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20) kütüphanelerinde bulunabilir. Ek olarak, bazı ERC'ler yerleşik olarak kurallı uygulamalar sağlarlar.

Bazı ERC'lerin yekpare değil, başka ERC'lerin ekleri olduğunu söylemek gerekir. Örneğin, [ERC2612](https://eips.ethereum.org/EIPS/eip-2612) kullanılabilirliğini artırmak için ERC20'ye bir uzantı ekler.

## Kütüphane nasıl eklenir {#how-to}

Her zaman dahil ettiğiniz kütüphanenin belgelerinde bulunan, projenin nasıl dahil edileceğine dair özel yönergelere başvurun. Birçok Solidity sözleşme kütüphanesi `npm` kullanılarak paketlenir, bu yüzden onları `npm install` komutuyla kurabilirsiniz. Sözleşmeleri [derlemek](/developers/docs/smart-contracts/compiling/) için kullanılan çoğu araç, akıllı sözleşme kütüphaneleri için `node_modules` klasörünüze bakar, bu yüzden aşağıdakileri yapabilirsiniz:

```solidity
// Bu, @openzeppelin/contracts kütüphanesini node_modules klasörünüzden yükleyecektir
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

Kullandığınız yöntem ne olursa olsun, bir kütüphane eklerken her zaman [dil](/developers/docs/smart-contracts/languages/) sürümüne dikkat edin. Misal, eğer sözleşmelerinizi Solidity 0.5'te yazıyorsanız Solidity 0.6 için olan bir kütüphaneyi kullanamazsınız.

## Ne zaman kullanılır {#when-to-use}

Projeniz için bir akıllı sözleşme kütüphanesi kullanmanın birçok yararı vardır. İlk ve en önemlisi, kendiniz kodlamanızdansa size kullanıma hazır, sisteminize dahil edebileceğiniz yapı taşları sunarak zamandan tasarruf etmenizi sağlar.

Güvenlik ayrıca büyük bir artısıdır. Açık kaynak akıllı sözleşme kütüphaneleri sık sık ciddi ölçüde denetlenir. Birçok projenin onlara dayandığı ele alındığında, onların sürekli teftiş altında tutulması topluluk tarafından güçlü bir teşvik bulmaktadır. Uygulama kodunda hatalar bulmak, yeniden kullanılabilir sözleşme kütüphanelerinden çok daha yaygındır. Bazı kütüphaneler ek güvenlik için [harici denetimlerden](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits) de geçer.

Ancak, akıllı sözleşme kütüphanelerini kullanmak aşina olmadığınız kodu projenize dahil etme riskini de beraberinde getirir. Bir sözleşmeyi aktarmak ve projenize doğrudan dahil etmek çekici gelebilir, ancak o sözleşmenin ne yaptığı hakkında iyi bir anlayışa sahip olmadan, farkında olmadan sisteminizde beklenmeyen davranışlara bağlı olarak bir soruna neden olabilirsiniz. Her zaman dahil ettiğiniz kodun belgelerini okuduğunuzdan emin olun ve kodu projenizin bir parçası yapmadan önce gözden geçirin!

Son olarak, bir kütüphaneyi dahil edip etmeyeceğinize karar verirken, onun genel kullanımını göz önünde bulundurun. Geniş çapta kabul edilmiş bir tanesi, daha büyük bir topluluğa sahip olma ve sorunlar için daha çok gözden geçirme gibi yararlara sahiptir. Akıllı sözleşmeler yaparken güvenlik ana odağınız olmalıdır!

## İlgili araçlar {#related-tools}

**OpenZeppelin Contracts -** **_Güvenli akıllı sözleşme geliştirme için en popüler kütüphane._**

- [Dokümantasyon](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Topluluk Forumu](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Akıllı sözleşmeler için güvenli, basit, esnek yapı taşları._**

- [Dokümantasyon](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_Gerçek dünya için tam özellikli dağıtık uygulamalar oluşturmanıza yardımcı olacak sözleşmeler, kütüphaneler ve örnekler içeren bir Solidity projesi._**

- [GitHub](https://github.com/HQ20/contracts)

**thirdweb Solidity SDK -** **_Özel akıllı sözleşmeleri verimli bir şekilde oluşturmak için gereken araçları sağlar_**

- [Dokümantasyon](https://portal.thirdweb.com/contracts/build/overview)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## İlgili öğreticiler {#related-tutorials}

- [Ethereum geliştiricileri için güvenlik konuları](/developers/docs/smart-contracts/security/) _– Kütüphane kullanımı da dahil olmak üzere akıllı sözleşmeler oluştururken dikkat edilmesi gereken güvenlik konuları üzerine bir öğretici._
- [ERC-20 jeton akıllı sözleşmesini anlama](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _-Birden fazla kütüphane tarafından sağlanan ERC20 standardı hakkında bir öğretici._

## Daha fazla kaynak {#further-reading}

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_
