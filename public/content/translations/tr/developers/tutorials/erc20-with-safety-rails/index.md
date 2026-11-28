---
title: "Güvenlik Önlemleriyle ERC-20"
description: "İnsanların aptalca hatalardan kaçınmasına nasıl yardımcı olunur"
author: Ori Pomerantz
lang: tr
tags: ["erc-20"]
skill: beginner
breadcrumb: "ERC-20 güvenliği"
published: 2022-08-15
---

## Giriş {#introduction}

Ethereum hakkındaki harika şeylerden biri, işlemlerinizi değiştirebilecek veya geri alabilecek merkezi bir otoritenin olmamasıdır. Ethereum ile ilgili büyük sorunlardan biri de, kullanıcı hatalarını veya yasa dışı işlemleri geri alma gücüne sahip merkezi bir otoritenin olmamasıdır. Bu makalede, kullanıcıların [ERC-20](/developers/docs/standards/tokens/erc-20/) token'ları ile yaptıkları bazı yaygın hataların yanı sıra, kullanıcıların bu hatalardan kaçınmasına yardımcı olan veya merkezi bir otoriteye bir miktar güç veren (örneğin hesapları dondurmak için) ERC-20 sözleşmelerinin nasıl oluşturulacağını öğreneceksiniz.

[OpenZeppelin ERC-20 token sözleşmesini](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20) kullanacak olsak da, bu makalenin onu çok ayrıntılı olarak açıklamadığını unutmayın. Bu bilgiyi [burada](/developers/tutorials/erc20-annotated-code) bulabilirsiniz.

Tam kaynak kodunu görmek isterseniz:

1. [Remix IDE](https://remix.ethereum.org/)'yi açın.
2. GitHub'ı klonla simgesine tıklayın (![clone github icon](icon-clone.png)).
3. `https://github.com/qbzzt/20220815-erc20-safety-rails` GitHub deposunu klonlayın.
4. **contracts > erc20-safety-rails.sol** dosyasını açın.

Deponun, bu makalenin geçersiz kıldığı işlevin `_beforeTokenTransfer` olarak adlandırıldığı OpenZeppelin Contracts 4.7.2 için yazıldığını unutmayın. Bu makale, bunun yerine `_update` işlevini geçersiz kıldığınız mevcut OpenZeppelin Contracts 5.x'i kullanır, bu nedenle bu makaledeki kod depodaki koddan biraz farklıdır.

## Bir ERC-20 sözleşmesi oluşturmak {#creating-an-erc-20-contract}

Güvenlik önlemi işlevselliğini eklemeden önce bir ERC-20 sözleşmesine ihtiyacımız var. Bu makalede [OpenZeppelin Contracts Wizard](https://docs.openzeppelin.com/contracts/5.x/wizard) kullanacağız. Başka bir tarayıcıda açın ve şu talimatları izleyin:

1. **ERC20**'yi seçin.
2. Şu ayarları girin:

   | Parametre      | Değer                     |
   | -------------- | ------------------------- |
   | Name           | SafetyRailsToken          |
   | Symbol         | SAFE                      |
   | Premint        | 1000                      |
   | Features       | None (**Permit** işaretini kaldırın) |
   | Access Control | Ownable                   |
   | Upgradability  | None                      |

3. Yukarı kaydırın ve farklı bir ortam kullanmak için **Open in Remix** (Remix için) veya **Download** seçeneğine tıklayın. Remix kullandığınızı varsayacağım, başka bir şey kullanıyorsanız uygun değişiklikleri yapın.
4. Artık tamamen işlevsel bir ERC-20 sözleşmemiz var. İçe aktarılan kodu görmek için `.deps` > `npm` öğesini genişletebilirsiniz.
5. Bir ERC-20 sözleşmesi olarak çalıştığını görmek için sözleşmeyi derleyin, dağıtın ve onunla oynayın. Remix'i nasıl kullanacağınızı öğrenmeniz gerekiyorsa, [bu öğreticiyi kullanın](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Yaygın hatalar {#common-mistakes}

### Hatalar {#the-mistakes}

Kullanıcılar bazen token'ları yanlış adrese gönderirler. Ne yapmak istediklerini bilmek için zihinlerini okuyamasak da, çok sık meydana gelen ve tespit edilmesi kolay iki hata türü vardır:

1. Token'ları sözleşmenin kendi adresine göndermek. Örneğin, [Optimism'in OP token'ı](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) iki aydan kısa bir sürede [120.000'den fazla](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) OP token biriktirmeyi başardı. Bu, muhtemelen insanların öylece kaybettiği önemli miktarda bir serveti temsil ediyor.

2. Token'ları boş bir adrese, yani [dışarıdan sahipli bir hesaba (EOA)](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) veya bir [akıllı sözleşmeye](/developers/docs/smart-contracts) karşılık gelmeyen bir adrese göndermek. Bunun ne sıklıkla gerçekleştiğine dair istatistiklerim olmasa da, [tek bir olay 20.000.000 token'a mal olabilirdi](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Transferleri önlemek {#preventing-transfers}

OpenZeppelin ERC-20 sözleşmesinde, ister bir transfer, ister bir basım veya bir yakım olsun, bakiyelerdeki her değişiklik [dahili bir işlev olan `_update`](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20#ERC20-_update-address-address-uint256-) üzerinden geçer. Bir sorun varsa geri alan kontroller gibi kendi işlevselliğimizi ona eklemek için onu geçersiz kılabiliriz (override).

Bunu yapmak için, bu işlevi kurucudan sonra ekleyin:

```solidity
    function _update(address from, address to, uint256 value)
        internal virtual
        override(ERC20)
    {
        super._update(from, to, value);
    }
```

Solidity'ye çok aşina değilseniz bu işlevin bazı kısımları yeni olabilir:

```solidity
        internal virtual
```

`virtual` anahtar kelimesi, tıpkı `ERC20`'den işlevselliği miras aldığımız ve bu işlevi geçersiz kıldığımız gibi, diğer sözleşmelerin de bizden miras alabileceği ve bu işlevi geçersiz kılabileceği anlamına gelir.

```solidity
        override(ERC20)
```

`_update`'nin ERC20 token tanımını [geçersiz kıldığımızı](https://docs.soliditylang.org/en/latest/contracts.html#function-overriding) açıkça belirtmeliyiz. Genel olarak, açık tanımlar güvenlik açısından örtük olanlardan çok daha iyidir - tam önünüzdeyse bir şey yaptığınızı unutamazsınız. Hangi üst sınıfın `_update` işlevini geçersiz kıldığımızı belirtmemizin nedeni de budur.

```solidity
        super._update(from, to, value);
```

Bu satır, miras aldığımız ve bu işleve sahip olan sözleşmenin veya sözleşmelerin `_update` işlevini çağırır. Bu durumda, bu yalnızca `ERC20`'dir, `Ownable` bu işleve sahip değildir. Boş bir kancanın (hook) aksine, `ERC20._update` token'ları gerçekten taşıyan şeydir, bu nedenle onu çağırmak çok önemlidir. Kontrollerimiz bu çağrıdan önce gelir, böylece herhangi bir bakiye değişikliğinden önce geri alabilirler.

### Gereksinimleri kodlamak {#coding-the-requirements}

Bu gereksinimleri işleve eklemek istiyoruz. `_update` ayrıca token'lar yakıldığında da çağrıldığından ve `to` `address(0)` olarak ayarlandığından, `to`'yu yalnızca `address(0)` olmadığında kontrol ederiz:

- `to` adresi, ERC-20 sözleşmesinin kendi adresi olan `address(this)`'e eşit olamaz.
- `to` adresi boş olamaz, şunlardan biri olmalıdır:
  - Harici sahipli hesap (EOA). Bir adresin EOA olup olmadığını doğrudan kontrol edemeyiz, ancak bir adresin ETH bakiyesini kontrol edebiliriz. EOA'lar artık kullanılmasalar bile neredeyse her zaman bir bakiyeye sahiptir - onları son Wei'ye kadar temizlemek zordur.
  - Akıllı sözleşme. Bir adresin akıllı sözleşme olup olmadığını test etmek biraz daha zordur. Harici kod uzunluğunu kontrol eden [`EXTCODESIZE`](https://www.evm.codes/#3b) adında bir işlem kodu vardır. Solidity'de bunu, derleyicinin `EXTCODESIZE`'a dönüştürdüğü [`<address>.code.length`](https://docs.soliditylang.org/en/latest/units-and-global-variables.html#members-of-address-types) ile alabilirsiniz. Burada, işlem kodunu doğrudan nasıl çağıracağımızı göstermek için EVM assembly'si olan [Yul](https://docs.soliditylang.org/en/latest/yul.html) kullanıyoruz. [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702)'den bu yana bir EOA'nın da koda (bir sözleşmeye yetki devri) sahip olabileceğini unutmayın, bu nedenle bu kontrol kesinlikle sözleşmeleri değil, koda sahip hesapları tanımlar. Amacımız olan boş adresleri reddetmek için bu uygundur.

İşte işlevin tamamı:

```solidity
    function _update(address from, address to, uint256 value)
        internal virtual
        override(ERC20)
    {
        // Yakım, Token'ları Adres(0)'a gönderir, bunu Bloklamayın
        if (to != address(0)) {
            require(to != address(this), "Can't send tokens to the contract address");

            bool isToContract;
            assembly {
               isToContract := gt(extcodesize(to), 0)
            }

            require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
        }

        super._update(from, to, value);
    }
```

Yeni kodun üzerinden satır satır geçelim:

```solidity
        require(to != address(this), "Can't send tokens to the contract address");
```

Bu ilk gereksinimdir, `to` ve `this(address)`'in aynı şey olmadığını kontrol edin.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

Bir adresin sözleşme olup olmadığını bu şekilde kontrol ederiz. Yul'dan doğrudan çıktı alamayız, bu nedenle bunun yerine sonucu tutacak bir değişken tanımlarız (bu durumda `isToContract`). Yul'un çalışma şekli, her işlem kodunun bir işlev olarak kabul edilmesidir. Bu yüzden önce sözleşme boyutunu almak için [`EXTCODESIZE`](https://www.evm.codes/#3b)'i çağırırız ve ardından sıfır olmadığını kontrol etmek için [`GT`](https://www.evm.codes/#11)'i kullanırız (işaretsiz tam sayılarla uğraşıyoruz, bu yüzden elbette negatif olamaz). Daha sonra sonucu `isToContract`'e yazarız.

```solidity
        require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
```

Ve son olarak, boş adresler için asıl kontrolümüz var.

## Yönetimsel erişim {#admin-access}

Bazen hataları geri alabilen bir yöneticiye sahip olmak faydalıdır. Kötüye kullanım potansiyelini azaltmak için, bu yönetici bir [çoklu imza (multisig)](https://blog.logrocket.com/security-choices-multi-signature-wallets/) olabilir, böylece birden fazla kişinin bir eylem üzerinde anlaşması gerekir. Bu makalede iki yönetimsel özelliğimiz olacak:

1. Hesapları dondurmak ve çözmek. Bu, örneğin bir hesabın ele geçirilmiş olabileceği durumlarda faydalı olabilir.
2. Varlık temizliği.

   Bazen dolandırıcılar meşruiyet kazanmak için gerçek token'ın sözleşmesine sahte token'lar gönderirler. Örneğin, [buraya bakın](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders). Meşru ERC-20 sözleşmesi [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042)'dir. Oymuş gibi davranan dolandırıcılık ise [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe)'dir.

   İnsanların yanlışlıkla sözleşmemize meşru ERC-20 token'ları göndermesi de mümkündür, bu da onları dışarı çıkarmanın bir yolunu istemek için başka bir nedendir.

OpenZeppelin, yönetimsel erişimi sağlamak için iki mekanizma sunar:

- [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) sözleşmelerinin tek bir sahibi vardır. `onlyOwner` [değiştiricisine (modifier)](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers) sahip işlevler yalnızca o sahip tarafından çağrılabilir. Sahipler, sahipliği başkasına devredebilir veya tamamen feragat edebilirler. Diğer tüm hesapların hakları tipik olarak aynıdır.
- [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) sözleşmeleri [role dayalı erişim kontrolüne (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control) sahiptir.

Basitlik adına, bu makalede `Ownable` kullanıyoruz.

### Sözleşmeleri dondurmak ve çözmek {#freezing-and-thawing-contracts}

Sözleşmeleri dondurmak ve çözmek birkaç değişiklik gerektirir:

- Hangi adreslerin dondurulduğunu takip etmek için adreslerden [boolean'lara](https://en.wikipedia.org/wiki/Boolean_data_type) bir [eşleme (mapping)](https://docs.soliditylang.org/en/latest/types.html#mapping-types). Tüm değerler başlangıçta sıfırdır, bu da boolean değerler için yanlış (false) olarak yorumlanır. İstediğimiz şey budur çünkü varsayılan olarak hesaplar dondurulmaz.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- Bir hesap dondurulduğunda veya çözüldüğünde ilgilenen herkesi bilgilendirmek için [olaylar](https://docs.soliditylang.org/en/latest/contracts.html#events). Teknik olarak konuşursak, bu eylemler için olaylar gerekli değildir, ancak zincir dışı kodun bu olayları dinleyebilmesine ve ne olduğunu bilmesine yardımcı olur. Başkasıyla ilgili olabilecek bir şey olduğunda bir akıllı sözleşmenin bunları yayınlaması (emit) iyi bir davranış olarak kabul edilir.

  Olaylar indekslenir, böylece bir hesabın dondurulduğu veya çözüldüğü tüm zamanları aramak mümkün olacaktır.

  ```solidity
    // Hesaplar dondurulduğunda veya çözüldüğünde
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- Hesapları dondurmak ve çözmek için işlevler. Bu iki işlev neredeyse aynıdır, bu nedenle yalnızca dondurma işlevinin üzerinden geçeceğiz.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  [`public`](https://docs.soliditylang.org/en/latest/contracts.html#function-visibility) olarak işaretlenmiş işlevler, diğer akıllı sözleşmelerden veya doğrudan bir işlem tarafından çağrılabilir.

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // hesabıDondur
  ```

  Hesap zaten dondurulmuşsa, geri alın. Aksi takdirde, dondurun ve bir olayı `emit`.

- Dondurulmuş bir hesaptan para taşınmasını önlemek için `_update`'yi değiştirin. Dondurulmuş hesaba hala para transfer edilebileceğini unutmayın. Bu satırı işlevin başına, `if` bloğunun dışına koyun, böylece dondurulmuş bir hesaptan token yakılmasını da önler.

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
  ```

### Varlık temizliği {#asset-cleanup}

Bu sözleşme tarafından tutulan ERC-20 token'larını serbest bırakmak için, ait oldukları token sözleşmesinde [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) veya [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve) işlevini çağırmamız gerekir. Bu durumda izinler (allowances) için Gaz israf etmenin bir anlamı yoktur, doğrudan transfer edebiliriz.

```solidity
    function cleanupERC20(
        address erc20,
        address dest
    )
        public
        onlyOwner
    {
        IERC20 token = IERC20(erc20);
```

Bu, adresi aldığımızda bir sözleşme için nesne oluşturmanın sözdizimidir. Bunu kullanmak için, bir OpenZeppelin ERC-20 sözleşmesinin arayüzü olan [IERC20 tanımına](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) ihtiyacımız var. Sihirbazın `import {ERC20} from ...` satırı yalnızca `ERC20`'yi getirir, bu nedenle bu satırı dosyanın en üstündeki diğer içe aktarmaların yanına ekleyin:

```solidity
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

Bu bir temizleme işlevidir, bu nedenle muhtemelen hiçbir token bırakmak istemiyoruz. Bakiyeyi kullanıcıdan manuel olarak almak yerine, süreci otomatikleştirebiliriz.

## Sonuç {#conclusion}

Bu mükemmel bir çözüm değildir - "kullanıcı hata yaptı" sorunu için mükemmel bir çözüm yoktur. Ancak, bu tür kontrolleri kullanmak en azından bazı hataları önleyebilir. Hesapları dondurma yeteneği, tehlikeli olsa da, bilgisayar korsanının çalınan fonlara erişimini reddederek belirli saldırıların (hack) hasarını sınırlamak için kullanılabilir.

[Çalışmalarımın daha fazlası için buraya bakın](https://cryptodocguy.pro/).
