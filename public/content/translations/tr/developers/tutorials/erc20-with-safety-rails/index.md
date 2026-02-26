---
title: "Güvenlik Önlemli ERC-20"
description: "İnsanların Basit Hatalardan Kaçınmasına Yardımcı Olmak"
author: Ori Pomerantz
lang: tr
tags: [ "erc-20" ]
skill: beginner
published: 2022-08-15
---

## Giriş {#introduction}

Ethereum ile ilgili en güzel şeylerden biri, işlemlerinizi değiştirebilecek veya geri alabilecek merkezi herhangi bir otoritenin olmamasıdır. Ethereum ile ilgili en büyük sorunlardan biri, kullanıcı hatalarını veya yasa dışı işlemleri geri alma yetkisine sahip merkezi bir otoritenin olmamasıdır. Bu makalede, kullanıcıların [ERC-20](/developers/docs/standards/tokens/erc-20/) jetonlarıyla yaptıkları yaygın hatalardan bazılarını ve kullanıcıların bu hatalardan kaçınmasına yardımcı olan veya merkezi bir otoriteye bir miktar yetki (örneğin hesapları dondurmak için) veren ERC-20 sözleşmelerinin nasıl oluşturulacağını öğreneceksiniz.

Bu makalede [OpenZeppelin ERC-20 jeton sözleşmesini](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20) kullanacak olsak da, sözleşmenin bu makalede ayrıntılı olarak açıklanmadığını unutmayın. Bu bilgiyi [burada](/developers/tutorials/erc20-annotated-code) bulabilirsiniz.

Bütün kaynak kodunu görmek isterseniz:

1. [Remix IDE](https://remix.ethereum.org/)'yi açın.
2. Github klonlama simgesine tıklayın (![github klonlama simgesi](icon-clone.png)).
3. `https://github.com/qbzzt/20220815-erc20-safety-rails` github deposunu klonlayın.
4. **contracts > erc20-safety-rails.sol** dosyasını açın.

## Bir ERC-20 sözleşmesi oluşturma {#creating-an-erc-20-contract}

Güvenlik önlemi işlevselliğini eklemeden önce bir ERC-20 sözleşmesine ihtiyacımız var. Bu makalede [OpenZeppelin Sözleşme Sihirbazı'nı](https://docs.openzeppelin.com/contracts/5.x/wizard) kullanacağız. Başka bir tarayıcıda açın ve şu talimatları izleyin:

1. **ERC20**'yi seçin.

2. Bu ayarları girin:

   | Parametre          | Değer            |
   | ------------------ | ---------------- |
   | İsim               | SafetyRailsToken |
   | Sembol             | SAFE             |
   | Premint            | 1000             |
   | Özellikler         | Hiçbiri          |
   | Erişim Kontrolü    | Sahiplenilebilir |
   | Yükseltilebilirlik | Hiçbiri          |

3. Yukarı kaydırın ve farklı bir ortam kullanmak için **Remix'te Aç**'a (Remix için) veya **İndir**'e tıklayın. Remix kullandığınızı varsayacağım, başka bir şey kullanıyorsanız sadece uygun değişiklikleri yapın.

4. Artık tamamen işlevsel bir ERC-20 sözleşmemiz var. İçe aktarılan kodu görmek için `.deps` > `npm` yolunu genişletebilirsiniz.

5. Bir ERC-20 sözleşmesi olarak işlev gördüğünü anlamak için sözleşmeyi derleyin, dağıtın ve sözleşmeyle oynayın. Remix'i nasıl kullanacağınızı öğrenmeniz gerekiyorsa [bu öğreticiyi kullanın](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Yaygın hatalar {#common-mistakes}

### Hatalar {#the-mistakes}

Kullanıcılar bazen jetonları yanlış adrese gönderir. Ne yapmak istediklerini bilmek için akıllarını okuyamasak da, sıkça meydana gelen ve tespit edilmesi kolay olan iki hata türü vardır:

1. Jetonları sözleşmenin kendi adresine göndermek. Örneğin, [Optimism'in OP jetonu](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) iki aydan kısa bir sürede [120.000'in üzerinde](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) OP jetonu biriktirmeyi başardı. Bu, muhtemelen insanların kaybettiği önemli miktarda bir serveti temsil ediyor.

2. Jetonları boş bir adrese, yani bir [Harici Olarak Sahiplenilmiş hesaba](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) veya bir [akıllı sözleşmeye](/developers/docs/smart-contracts) karşılık gelmeyen bir adrese göndermek. Bunun ne sıklıkla olduğuna dair istatistiklerim olmasa da, [bir olay 20.000.000 jetona mal olabilirdi](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Transferleri önleme {#preventing-transfers}

OpenZeppelin ERC-20 sözleşmesi, bir jeton transfer edilmeden önce çağrılan [`_beforeTokenTransfer` adında bir kanca](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368) içerir. Varsayılan olarak bu kanca hiçbir şey yapmaz, ancak bir sorun olduğunda geri dönen kontroller gibi kendi işlevselliğimizi ona bağlayabiliriz.

Kancayı kullanmak için bu işlevi kurucudan sonra ekleyin:

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

Solidity'ye pek aşina değilseniz işlevin bazı kısımları sizin için yeni olabilir:

```solidity
        internal virtual
```

`virtual` anahtar kelimesi, tıpkı `ERC20`'den işlevsellik devraldığımız ve bu işlevi geçersiz kıldığımız gibi, diğer sözleşmelerin de bizden miras alıp bu işlevi geçersiz kılabileceği anlamına gelir.

```solidity
        override(ERC20)
```

`_beforeTokenTransfer`'in ERC20 jeton tanımını [geçersiz kıldığımızı](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding) açıkça belirtmeliyiz. Genel olarak net tanımlar örtülü tanımlara göre çok daha iyidir; bir şey gözünüzün tam önündeyse ne yaptığınızı unutmazsınız. Hangi üst sınıfa ait `_beforeTokenTransfer`'i geçersiz kıldığımızı belirtmemizin sebebi de budur.

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

Bu satır, sözleşmenin veya ona sahip olan devraldığımız sözleşmelerin `_beforeTokenTransfer` işlevini çağırır. Bu durumda, bahsettiğimiz sadece `ERC20`'dir, `Ownable` bu kancaya sahip değildir. Halihazırda `ERC20._beforeTokenTransfer` hiçbir şey yapmasa da, gelecekte işlevsellik eklenmesi durumunda onu çağırabiliriz (ve sonra, dağıtımdan sonra sözleşmeler değişmediği için sözleşmeyi yeniden dağıtmaya karar veririz).

### Gereksinimleri kodlama {#coding-the-requirements}

Aşağıdaki gereksinimleri işleve eklemek istiyoruz:

- `to` adresi, ERC-20 sözleşmesinin kendi adresi olan `address(this)` ile eşit olamaz.
- `to` adresi boş olamaz, aşağıdakilerden birisi olmalıdır:
  - Bir Harici Olarak Sahiplenilmiş hesap (EOA). Bir adresin EOA olup olmadığını doğrudan kontrol edemeyiz ancak bir adresin ETH bakiyesini kontrol edebiliriz. EOA'ların artık kullanılmasalar bile neredeyse her zaman bir bakiyesi vardır; onları son wei'ye kadar temizlemek zordur.
  - Bir akıllı sözleşme. Bir adresin akıllı sözleşme olup olmadığını test etmek biraz daha zordur. Harici kod uzunluğunu kontrol eden, [`EXTCODESIZE`](https://www.evm.codes/#3b) olarak adlandırılan bir işlem kodu vardır, ancak bu doğrudan Solidity'de mevcut değildir. Bunun için EVM assembly'si olan [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html)'u kullanmalıyız. Solidity'den kullanabileceğimiz başka değerler de var ([`<address>.code` ve `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types)) ama bunlar daha maliyetli.

Gelin yeni kodu satır satır inceleyelim:

```solidity
        require(to != address(this), "Jetonlar sözleşme adresine gönderilemez");
```

`to` ile `this(address)`'in aynı şey olmadığını kontrol edin; bu, ilk gerekliliktir.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

Biz bir adresin sözleşme olup olmadığını bu şekilde kontrol ederiz. Yul'dan çıktıyı doğrudan alamayız, bunun yerine sonucu tutabilecek bir değişken tanımlarız (bu durumda `isToContract`). Yul'un çalışma şekli, her işlem kodunun bir işlev olarak kabul edilmesidir. Öncelikle sözleşme boyutunu almak için [`EXTCODESIZE`](https://www.evm.codes/#3b) öğesini çağırır ve sonra sıfır olmadığını doğrulamak için [`GT`](https://www.evm.codes/#11) kullanırız (negatif olamaz, çünkü işaretsiz tam sayılarla uğraşıyoruz). Sonrasında sonucu, `isToContract`'a yazarız.

```solidity
        require(to.balance != 0 || isToContract, "Jetonlar boş bir adrese gönderilemez");
```

Son olarak sırada, boş adresler için gerçek kontrolümüz var.

## Yönetici erişimi {#admin-access}

Hataları geri alabilen bir yöneticiye sahip olmak bazen faydalı olabilir. Kötüye kullanım potansiyelini azaltmak için bu yönetici bir [çoklu imza](https://blog.logrocket.com/security-choices-multi-signature-wallets/) olabilir, böylece bir eylem üzerinde birden fazla kişinin anlaşması gerekir. Bu makale içerisinde iki yönetici özelliğinden bahsedeceğiz:

1. Hesapları dondurmak ve çözmek. Bu, örneğin bir hesabın güvenliği ihlal edildiğinde faydalı olabilir.
2. Varlık temizlemesi.

   Bazen dolandırıcılar, meşruiyet kazanmak için gerçek jetonun sözleşmesine hileli jetonlar gönderir. Örneğin, [buraya bakın](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders). Meşru ERC-20 sözleşmesi [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042)'dir. Onun gibi davranan dolandırıcılık [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe)'dir.

   İnsanların sözleşmemize yanlışlıkla başka geçerli jetonlar göndermesi ise onları oradan çıkarmanın bir yolunu bulmamız için başka bir nedendir.

OpenZeppelin, yönetici erişimini etkinleştirmek için iki mekanizma sunar:

- [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) sözleşmelerinin tek bir sahibi vardır. `onlyOwner` [değiştiricisine](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) sahip işlevler yalnızca o sahip tarafından çağrılabilir. Sahipler bu sahipliği bir başkasına devredebilir ya da tamamen sahiplikten feragat edebilir. Tüm diğer hesapların hakları ise genelde aynıdır.
- [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) sözleşmeleri [rol tabanlı erişim kontrolüne (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control) sahiptir.

Basit olması için bu makalede `Ownable` kullanıyoruz.

### Sözleşmeleri dondurma ve çözme {#freezing-and-thawing-contracts}

Sözleşmeleri dondurmak ve çözmek, birtakım değişiklikler gerektirir:

- Hangi adreslerin dondurulduğunu takip etmek için adreslerden [boolean'lara](https://en.wikipedia.org/wiki/Boolean_data_type) bir [eşleme](https://www.tutorialspoint.com/solidity/solidity_mappings.htm). Tüm değerler başlangıçta sıfırdır ve bu boole değerleri için yanlış olarak yorumlanır. Hesaplar varsayılan olarak dondurulmuş halde gelmediği için istediğimiz budur.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- Bir hesap dondurulduğunda veya çözüldüğünde ilgilenen herkesi bilgilendirmek için [Olaylar](https://www.tutorialspoint.com/solidity/solidity_events.htm). Teknik olarak bu eylemler için olaylar gerekli değildir, ancak zincir dışı kodların bu olayları dinlemesine ve ne olduğunu bilmesine yardımcı olur. Akıllı bir sözleşmenin başkasıyla alakalı olabilecek bir şey olduğunda bunları yayımlaması iyi bir davranış olarak kabul edilir.

  Olaylar dizine eklendiğinden, bir hesabın dondurulduğu veya çözüldüğü tüm zamanlar aranabilir.

  ```solidity
    // Hesaplar dondurulduğunda veya çözüldüğünde
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- Hesapları dondurmaya ve çözmeye yarayan işlevler. Bu iki fonksiyon neredeyse aynıdır; bu yüzden, dondurma fonksiyonu üzerinden ilerleyeceğiz.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm) olarak işaretlenen işlevler, diğer akıllı sözleşmelerden veya doğrudan bir işlemle çağrılabilir.

  ```solidity
    {
        require(!frozenAccounts[addr], "Hesap zaten dondurulmuş");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  Hesap zaten dondurulmuşsa, geri alın. Aksi takdirde, dondurun ve bir olay `emit` edin.

- Dondurulmuş bir hesaptan para taşınmasını önlemek için `_beforeTokenTransfer`'i değiştirin. Donmuş hesaba halen para aktarılabileceğini unutmayın.

  ```solidity
       require(!frozenAccounts[from], "Hesap dondurulmuş");
  ```

### Varlık temizleme {#asset-cleanup}

Bu sözleşme tarafından tutulan ERC-20 jetonlarını serbest bırakmak için, ait oldukları jeton sözleşmesinde [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) veya [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve) işlevlerinden birini çağırmamız gerekir. Bu durumda ödenekler için gaz harcamaya gerek yoktur, doğrudan transfer edebiliriz.

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

Bu, adresi aldığımızda bir sözleşme için nesne oluşturma söz dizimidir. Bunu yapabiliriz çünkü kaynak kodun bir parçası olarak ERC20 jetonlarının tanımına sahibiz (bkz. satır 4) ve bu dosya, bir OpenZeppelin ERC-20 sözleşmesinin arayüzü olan [IERC20 tanımını](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) içerir.

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

Bu bir temizleme işlevidir, bu yüzden muhtemelen herhangi bir jeton bırakmak istemeyiz. Bakiyeyi kullanıcıdan manuel olarak almak yerine süreci otomatikleştirebiliriz.

## Sonuç {#conclusion}

Bu mükemmel bir çözüm değildir; "kullanıcı hata yaptı" sorununun mükemmel bir çözümü yoktur. Ancak bu tür kontrollerin kullanılması en azından bazı hataları önleyebilir. Hesapları dondurma yeteneği, tehlikeli olmakla birlikte belirli hacker'ların çaldığı fonları reddederek hacker'ların yarattığı zararı sınırlandırmak için kullanılabilir.

[Çalışmalarımdan daha fazlası için buraya bakın](https://cryptodocguy.pro/).
