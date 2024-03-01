---
title: ERC-20 ve Güvenlik Önlemleri
description: İnsanların aptalca hatalar yapmasını önleme
author: Ori Pomerantz
lang: tr
tags:
  - "erc-20"
skill: beginner
published: 2022-08-15
---

## Giriş {#introduction}

Ethereum ile ilgili en güzel şeylerden biri, işlemlerinizi değiştirebilecek veya geri alabilecek merkezi herhangi bir otoritenin olmamasıdır. Ethereum ile ilgili en büyük sorunlardan biri, kullanıcı hatalarını veya yasa dışı işlemleri geri alma yetkisine sahip merkezi bir otoritenin olmamasıdır. Bu makalede, kullanıcıların [ERC-20](/developers/docs/standards/tokens/erc-20/) jetonlarıyla yaptıkları bazı yaygın hataların yanı sıra; kullanıcıların bu hatalardan kaçınmasına yardımcı olan veya merkezi bir otoriteye bir miktar yetki veren (örneğin hesapları dondurmak için) ERC-20 sözleşmelerinin nasıl oluşturulacağını öğreneceksiniz.

[Open Zeppelin ERC-20 jeton sözleşmesini](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20) hala kullanıyor olsak da bu makalenin bunu ayrıntılı olarak açıklamadığını söylemiş olalım. Bu bilgiyi [burada bulabilirsiniz](/developers/tutorials/erc20-annotated-code).

Bütün kaynak kodunu görmek isterseniz:

1. [Remix IDE](https://remix.ethereum.org/)'yi açın.
2. Github'ı klonla simgesine tıklayın (![clone github icon](icon-clone.png)).
3. Github deposunu kopyalayın `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. **Sözleşmeler > erc20-safety-rails.sol** öğesini açın.

## ERC-20 sözleşmesi oluşturma {#creating-an-erc-20-contract}

Güvenlik önlemi işlevini eklemeden önce bize bir ERC-20 sözleşmesi lazım. Bu makalede [OpenZeppelin'in Sözleşme Sihirbazı'nı](https://docs.openzeppelin.com/contracts/4.x/wizard) kullanacağız. Başka bir sekmede açın ve şu yönergeleri izleyin:

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
4. Şimdi tamamen işlevsel bir ERC-20 sözleşmemiz var. İçeri aktarılan kodu görmek için `.deps` > `npm`'yi genişletebilirsiniz.
5. Bir ERC-20 sözleşmesi olarak işlev gördüğünü anlamak için sözleşmeyi derleyin, dağıtın ve sözleşmeyle oynayın. Remix'in nasıl kullanıldığını öğrenmek istiyorsanız [bu rehberi kullanın](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Yaygın hatalar {#common-mistakes}

### Hatalar {#the-mistakes}

Kullanıcılar bazen jetonları yanlış adrese gönderir. Ne yapmak istediklerini anlamak için zihinlerini okuyamasak da sık sık meydana gelen ve tespit edilmesi kolay olan iki hata türü vardır:

1. Jetonları sözleşmenin kendi adresine göndermek. Örneğin, [Optimism'in OP jetonu](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) iki aydan kısa bir sürede [120.000'den](https://optimistic.etherscan.io/address/0x4200000000000000000000000000000000000042#tokentxns) fazla OP jetonu biriktirmeyi başardı. Bu, muhtemelen insanların kaybettiği önemli miktarda bir serveti temsil ediyor.

2. Jetonları harici bir [dışarıdan sahip olunan hesaba](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) veya [akıllı sözleşmeye](/developers/docs/smart-contracts) karşılık gelmeyen boş bir adrese göndermek. Bunun ne sıklıkla gerçekleştiğine dair istatistiklere sahip olmasam da [tek bir olay 20.000.000 jetona mal olabilir.](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Transferleri önleme {#preventing-transfers}

OpenZeppelin ERC-20 sözleşmesi, jeton aktarılmadan önce çağrılan bir `_beforeTokenTransfer`

kancası içerir. Bu kanca çalışırken varsayılan olarak hiçbir şey yapmaz ancak örneğin bir sorun olduğunda geri dönen kontroller gibi kendi işlevselliğimizi içerisine ekleyebiliriz.

Kancayı kullanmak için oluşturucudan sonra şu işlevi ekleyin:

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

`virtual` anahtar sözcüğü tıpkı bizim `ERC-20`'den işlevsellik devraldığımız ve bu işlevi geçersiz kıldığımız gibi diğer sözleşmelerin de bizden miras alıp bu işlevi geçersiz kılabileceği anlamına gelir.

```solidity
        override(ERC20)
```

`_beforeTokenTransfer`'in ERC-20 jeton tanımını [geçersiz kıldığımızın](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding) altını çizmeliyiz. Genel olarak net tanımlar örtülü tanımlara göre çok daha iyidir; bir şey gözünüzün tam önündeyse ne yaptığınızı unutmazsınız. Hangi üst sınıfa ait `_beforeTokenTransfer`'i geçersiz kıldığımızı belirtmemizin sebebi de budur.

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

Bu satır, sözleşmenin veya ona sahip olan devraldığımız sözleşmelerin `_beforeTokenTransfer` işlevini çağırır. Bu durumda, bahsettiğimiz sadece `ERC-20`'dir, `Ownable` bu kancaya sahip değildir. Halihazırda `ERC20._beforeTokenTransfer` hiçbir şey yapmasa da, gelecekte işlevsellik eklenmesi durumunda onu çağırabiliriz (ve sonra, dağıtımdan sonra sözleşmeler değişmediği için sözleşmeyi yeniden dağıtmaya karar veririz).

### Gereksinimlerin kodlanması {#coding-the-requirements}

Aşağıdaki gereksinimleri işleve eklemek istiyoruz:

- `to` adresi, ERC-20 sözleşmesinin kendi adresi olan `address(this)` ile eşit olamaz.
- `to` adresi boş olamaz, aşağıdakilerden birisi olmalıdır:
  - Dışarıdan sahip olunan hesap (EOA). Bir adresin EOA olup olmadığını doğrudan kontrol edemeyiz ancak bir adresin ETH bakiyesini kontrol edebiliriz. EOA'ların artık kullanılmasalar bile neredeyse her zaman bir bakiyesi vardır; onları son wei'ye kadar temizlemek zordur.
  - Akıllı sözleşme. Bir adresin akıllı sözleşme olup olmadığını test etmek biraz daha zordur. Harici kod uzunluğunu kontrol eden, [`EXTCODESIZE`](https://www.evm.codes/#3b) isimli bir işlem kodu vardır ancak doğrudan Solidity'de mevcut değildir. Bunun için EVM derlemesi olan [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html)'u kullanmamız gerekir. Solidity'den kullanabileceğimiz ([`<address>.code` ve `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types)) gibi başka değerler de vardır ancak maliyetleri daha yüksektir.

Gelin yeni kodu satır satır inceleyelim:

```solidity
        require(to != address(this), "Can't send tokens to the contract address");
```

`to` ile `this(address)`'in aynı şey olmadığını kontrol edin; bu, ilk gerekliliktir.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

Biz bir adresin sözleşme olup olmadığını bu şekilde kontrol ederiz. Yul'dan çıktıyı doğrudan alamayız, bunun yerine sonucu tutabilecek bir değişken tanımlarız (bu durumda `isToContract`). Yul'un çalışma şekli, her işlem kodunun bir işlev olarak kabul edilmesidir. Öncelikle sözleşme boyutunu almak için [`EXTCODESIZE`](https://www.evm.codes/#3b)'ı çağırır ve sonra sıfır olmadığını doğrulamak için [`GT`](https://www.evm.codes/#11)'yi kullanırız (negatif olamaz, çünkü işaretsiz tam sayılarla uğraşıyoruz). Sonrasında sonucu, `isToContrac`'a yazarız.

```solidity
        require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
```

Son olarak sırada, boş adresler için gerçek kontrolümüz var.

## Yönetici erişimi {#admin-access}

Hataları geri alabilen bir yöneticiye sahip olmak bazen faydalı olabilir. Kötüye kullanım olasılığını azaltmak için bu yönetici bir [çoklu imza](https://blog.logrocket.com/security-choices-multi-signature-wallets/) olabilir, böylece birden fazla kişinin bir eylem üzerinde anlaşması gerekir. Bu makale içerisinde iki yönetici özelliğinden bahsedeceğiz:

1. Hesapları dondurmak ve çözmek. Bu, örneğin bir hesabın güvenliği ihlal edildiğinde faydalı olabilir.
2. Varlık temizlemesi.

   Bazen dolandırıcılar, meşruiyet kazanmak için gerçek jetonun sözleşmesine hileli jetonlar gönderir. Örneğin, [buraya bakın](https://optimistic.etherscan.io/token/0x2348b1a1228ddcd2db668c3d30207c3e1852fbbe?a=0x4200000000000000000000000000000000000042). Meşru ERC-20 sözleşmesi [0x4200....0042](https://optimistic.etherscan.io/address/0x4200000000000000000000000000000000000042)'dir. [0x234....bbe](https://optimistic.etherscan.io/address/0x2348b1a1228ddcd2db668c3d30207c3e1852fbbe) imiş gibi davranan bir dolandırıcılıktır.

   İnsanların sözleşmemize yanlışlıkla başka geçerli jetonlar göndermesi ise onları oradan çıkarmanın bir yolunu bulmamız için başka bir nedendir.

OpenZeppelin, yönetici erişimini etkinleştirmek için iki çeşit mekanizma sunar:

- [`Ownable`](https://docs.openzeppelin.com/contracts/4.x/access-control#ownership-and-ownable) sözleşmelerinin sadece bir sahibi vardır. `OnlyOwner`[ özelliğine](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) sahip işlevler yalnızca o sahip tarafından çağrılabilir. Sahipler bu sahipliği bir başkasına devredebilir ya da tamamen sahiplikten feragat edebilir. Tüm diğer hesapların hakları ise genelde aynıdır.
- [`AccessControl`](https://docs.openzeppelin.com/contracts/4.x/access-control#role-based-access-control) sözleşmelerinde [rol tabanlı erişim kontrolü (RBAC) bulunur](https://en.wikipedia.org/wiki/Role-based_access_control).

Basit olması için biz bu makalede `Ownable`'ı kullanacağız.

### Sözleşmeleri dondurma ve çözme {#freezing-and-thawing-contracts}

Sözleşmeleri dondurmak ve çözmek, birtakım değişiklikler gerektirir:

- Hangi adreslerin dondurulduğunu takip etmeye yarayan adresler ile [boole değerleri](https://en.wikipedia.org/wiki/Boolean_data_type) [eşlemesi](https://www.tutorialspoint.com/solidity/solidity_mappings.htm). Tüm değerler başlangıçta sıfırdır ve bu boole değerleri için yanlış olarak yorumlanır. Hesaplar varsayılan olarak dondurulmuş halde gelmediği için istediğimiz budur.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- Bir hesap dondurulduğunda veya çözüldüğünde ilgilenen herkesi bilgilendirmek için [olay akışı](https://www.tutorialspoint.com/solidity/solidity_events.htm). Teknik olarak yaklaşacak olursak olay akışı bu eylemler için gerekli değildir ancak zincir dışı kodların olayı izlemesi ve olan biteni anlamasına yardımcı olurlar. Akıllı bir sözleşmenin başkasıyla alakalı olabilecek bir şey olduğunda bunları yayımlaması iyi bir davranış olarak kabul edilir.

  Olay akışı dizine eklenir, böylece bir hesabın dondurulduğu veya çözüldüğü tüm zamanları aramak mümkün olur.

  ```solidity
    // When accounts are frozen or unfrozen
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- Hesapları dondurmaya ve çözmeye yarayan işlevler. Bu iki fonksiyon neredeyse aynıdır; bu yüzden, dondurma fonksiyonu üzerinden ilerleyeceğiz.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

[`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm) olarak işaretlenmiş işlevler, diğer akıllı sözleşmelerden veya doğrudan bir işlemle çağrılabilir.

```solidity
  {
      require(!frozenAccounts[addr], "Account already frozen");
      frozenAccounts[addr] = true;
      emit AccountFrozen(addr);
  }  // freezeAccount
```

Hesap önceden dondurulmuşsa, eski haline döndürün. Aksi takdirde, dondurun ve bir olay `emit` edin.

- Paranın donmuş bir hesaptan taşınmasını önlemek için `_beforeTokenTransfer`'i değiştirin. Donmuş hesaba halen para aktarılabileceğini unutmayın.

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
  ```

### Varlık temizlemesi {#asset-cleanup}

Bu sözleşmede tutulan ERC-20 jetonlarını serbest bırakmak için ait oldukları jeton sözleşmesinde [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) veya [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve) işlevlerinden birini çağırmamız gerekir. Bu durumda ödenekler için gaz harcamaya gerek yoktur, doğrudan transfer edebiliriz.

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

Bu, adresi aldığımızda bir sözleşme için nesne oluşturma söz dizimidir. Kaynak kodun bir parçası olarak ERC-20 jetonlarının tanımına sahip olduğumuzdan (bkz. Satır 4) ve bu dosya bir OpenZeppelin ERC-20 sözleşmesinin arayüzü olan [IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) tanımını içerdiğinden bunu yapabiliriz.

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

Bu bir temizleme işlevidir, bu yüzden muhtemelen herhangi bir jeton bırakmak istemeyiz. Bakiyeyi kullanıcıdan manuel olarak almak yerine süreci otomatikleştirebiliriz.

## Sonuç {#conclusion}

Anlattığımız süreç mükemmel bir çözüm değildir, zaten "kullanıcı bir hata yaptı" sorunları için mükemmel bir çözüm de yoktur. Ancak bu tür kontrollerin kullanılması en azından bazı hataları önleyebilir. Hesapları dondurma yeteneği, tehlikeli olmakla birlikte belirli hacker'ların çaldığı fonları reddederek hacker'ların yarattığı zararı sınırlandırmak için kullanılabilir.
