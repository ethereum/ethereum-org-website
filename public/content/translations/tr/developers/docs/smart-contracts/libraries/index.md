---
title: "Akıllı sözleşme kütüphaneleri"
description: "Ethereum geliştirme projelerinizi hızlandırmak için yeniden kullanılabilir akıllı sözleşme kütüphanelerini ve yapı taşlarını keşfedin."
lang: tr
---

Projenizdeki her akıllı sözleşmeyi sıfırdan yazmanıza gerek yoktur. Projeniz için tekerleği yeniden icat etmekten sizi kurtarabilecek, yeniden kullanılabilir yapı taşları sağlayan birçok açık kaynaklı akıllı sözleşme kütüphanesi mevcuttur.

## Ön koşullar {#prerequisites}

Akıllı sözleşme kütüphanelerine dalmadan önce, bir akıllı sözleşmenin yapısını iyi anlamak iyi bir fikirdir. Henüz yapmadıysanız [akıllı sözleşme anatomisi](/developers/docs/smart-contracts/anatomy/) bölümüne göz atın.

## Bir kütüphanede neler bulunur {#whats-in-a-library}

Akıllı sözleşme kütüphanelerinde genellikle iki tür yapı taşı bulabilirsiniz: sözleşmelerinize ekleyebileceğiniz yeniden kullanılabilir davranışlar ve çeşitli standartların uygulamaları.

### Davranışlar {#behaviors}

Akıllı sözleşmeler yazarken, bir sözleşmede korumalı işlemleri gerçekleştirmek için bir _yönetici_ adresi atamak veya beklenmedik bir sorun durumunda acil durum _duraklatma_ düğmesi eklemek gibi benzer kalıpları tekrar tekrar yazarken bulma ihtimaliniz yüksektir.

Akıllı sözleşme kütüphaneleri genellikle bu davranışların yeniden kullanılabilir uygulamalarını [kütüphaneler](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) olarak veya Solidity'de [kalıtım](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) yoluyla sağlar.

Örnek olarak, aşağıda bir adresi bir sözleşmenin sahibi olarak belirleyen ve bir yönteme erişimi yalnızca o sahiple kısıtlamak için bir değiştirici sağlayan [OpenZeppelin Sözleşme kütüphanesinden](https://github.com/OpenZeppelin/openzeppelin-contracts) [`Ownable` sözleşmesinin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) basitleştirilmiş bir sürümü bulunmaktadır.

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

Sözleşmenizde bunun gibi bir yapı taşı kullanmak için, önce onu içe aktarmanız ve ardından kendi sözleşmelerinizde ondan genişletmeniz gerekir. Bu, kendi işlevlerinizi güvence altına almak için temel `Ownable` sözleşmesi tarafından sağlanan değiştiriciyi kullanmanıza olanak tanır.

```solidity
import ".../Ownable.sol"; // İçe aktarılan kütüphanenin yolu

contract MyContract is Ownable {
    // Aşağıdaki fonksiyon sadece sahibi tarafından çağrılabilir
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

Bir başka popüler örnek [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) veya [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html)'tir. Bunlar, dil tarafından sağlanmayan, taşma kontrollerine sahip aritmetik işlevler sağlayan kütüphanelerdir (temel sözleşmelerin aksine). Sözleşmenizi feci sonuçlara yol açabilecek taşmalara karşı korumak için yerel aritmetik işlemler yerine bu kütüphanelerden birini kullanmak iyi bir uygulamadır!

### Standartlar {#standards}

[Birleştirilebilirlik ve birlikte çalışabilirliği](/developers/docs/smart-contracts/composability/) kolaylaştırmak için Ethereum topluluğu, **ERC'ler** biçiminde çeşitli standartlar tanımlamıştır. Bunlar hakkında daha fazla bilgiyi [standartlar](/developers/docs/standards/) bölümünde okuyabilirsiniz.

Sözleşmelerinizin bir parçası olarak bir ERC'yi dahil ederken, kendi uygulamanızı oluşturmaya çalışmak yerine standart uygulamaları aramak iyi bir fikirdir. Birçok akıllı sözleşme kütüphanesi, en popüler ERC'ler için uygulamalar içerir. Örneğin, her yerde bulunan [ERC-20 misli token standardı](/developers/tutorials/understand-the-erc-20-token-smart-contract/) [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token/) ve [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20) içinde bulunabilir. Ek olarak, bazı ERC'ler ERC'nin kendisinin bir parçası olarak kurallı uygulamalar da sağlar.

Bazı ERC'lerin bağımsız olmadığını, diğer ERC'lere eklemeler olduğunu belirtmekte fayda var. Örneğin, [ERC-2612](https://eips.ethereum.org/EIPS/eip-2612), kullanılabilirliğini artırmak için ERC-20'ye bir uzantı ekler.

## Bir kütüphane nasıl eklenir {#how-to}

Projenize nasıl dahil edeceğinize dair özel talimatlar için her zaman dahil ettiğiniz kütüphanenin belgelerine başvurun. Çeşitli Solidity sözleşme kütüphaneleri `npm` kullanılarak paketlenmiştir, bu nedenle onları sadece `npm install` yapabilirsiniz. Sözleşmeleri [derleme](/developers/docs/smart-contracts/compiling/) araçlarının çoğu, akıllı sözleşme kütüphaneleri için `node_modules` klasörünüze bakacaktır, bu nedenle aşağıdakileri yapabilirsiniz:

```solidity
// Bu, @openzeppelin/contracts kütüphanesini node_modules dizininizden yükleyecektir
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

Kullandığınız yöntem ne olursa olsun, bir kütüphaneyi dahil ederken her zaman [dil](/developers/docs/smart-contracts/languages/) sürümüne dikkat edin. Örneğin, sözleşmelerinizi Solidity 0.5'te yazıyorsanız Solidity 0.6 için olan bir kütüphaneyi kullanamazsınız.

## Ne zaman kullanılmalı {#when-to-use}

Projeniz için bir akıllı sözleşme kütüphanesi kullanmanın çeşitli faydaları vardır. Her şeyden önce, bunları kendiniz kodlamak zorunda kalmak yerine sisteminize dahil edebileceğiniz kullanıma hazır yapı taşları sağlayarak size zaman kazandırır.

Güvenlik de büyük bir artıdır. Açık kaynaklı akıllı sözleşme kütüphaneleri de genellikle sıkı bir şekilde incelenir. Birçok projenin bunlara bağlı olduğu göz önüne alındığında, topluluk tarafından bunları sürekli inceleme altında tutmak için güçlü bir teşvik vardır. Uygulama kodunda hata bulmak, yeniden kullanılabilir sözleşme kütüphanelerinde bulmaktan çok daha yaygındır. Bazı kütüphaneler ek güvenlik için [harici denetimlerden](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits) de geçer.

Ancak, akıllı sözleşme kütüphanelerini kullanmak, aşina olmadığınız kodları projenize dahil etme riskini taşır. Bir sözleşmeyi içe aktarmak ve doğrudan projenize dahil etmek caziptir, ancak o sözleşmenin ne yaptığını iyi anlamadan, beklenmedik bir davranış nedeniyle sisteminize yanlışlıkla bir sorun sokabilirsiniz. İçe aktardığınız kodun belgelerini okuduğunuzdan her zaman emin olun ve ardından projenizin bir parçası yapmadan önce kodun kendisini inceleyin!

Son olarak, bir kütüphaneyi dahil edip etmemeye karar verirken genel kullanımını göz önünde bulundurun. Yaygın olarak benimsenen bir kütüphane, daha büyük bir topluluğa sahip olma ve sorunlar için daha fazla gözün onu incelemesi avantajlarına sahiptir. Akıllı sözleşmelerle geliştirme yaparken güvenlik birincil odak noktanız olmalıdır!

## İlgili araçlar {#related-tools}

**OpenZeppelin Sözleşmeleri -** **_Güvenli akıllı sözleşme geliştirme için en popüler kütüphane._**

- [Belgeler](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Topluluk Forumu](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Akıllı sözleşmeler için güvenli, basit, esnek yapı taşları._**

- [Belgeler](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_Gerçek dünya için tam özellikli dağıtık uygulamalar oluşturmanıza yardımcı olacak sözleşmeler, kütüphaneler ve örnekler içeren bir Solidity projesi._**

- [GitHub](https://github.com/HQ20/contracts)

**thirdweb Solidity SDK -** **_Özel akıllı sözleşmeleri verimli bir şekilde oluşturmak için gereken araçları sağlar_**

- [Belgeler](https://portal.thirdweb.com/contracts/build/overview)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## İlgili eğitimler {#related-tutorials}

- [Ethereum geliştiricileri için güvenlik hususları](/developers/docs/smart-contracts/security/) _– Kütüphane kullanımı da dahil olmak üzere akıllı sözleşmeler oluştururken dikkat edilmesi gereken güvenlik hususları üzerine bir eğitim._
- [ERC-20 token akıllı sözleşmesini anlayın](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _-Birden fazla kütüphane tarafından sağlanan ERC-20 standardı üzerine eğitim._

## Daha fazla bilgi {#further-reading}

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve ekleyin!_