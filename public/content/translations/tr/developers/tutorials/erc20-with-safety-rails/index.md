---
title: Güvenlik Önlemleriyle ERC-20
description: İnsanların aptalca hatalardan kaçınmasına nasıl yardımcı olunur
author: Ori Pomerantz
lang: tr
tags: ["erc-20"]
skill: beginner
breadcrumb: ERC-20 güvenliği
published: 2022-08-15
---

## Giriş {#introduction}

Ethereum'un harika yanlarından biri, işlemlerinizi değiştirebilecek veya geri alabilecek merkezi bir otoritenin olmamasıdır. Ethereum ile ilgili en büyük sorunlardan biri de kullanıcı hatalarını veya yasa dışı işlemleri geri alma yetkisine sahip merkezi bir otoritenin olmamasıdır. Bu makalede, kullanıcıların [ERC-20](/developers/docs/standards/tokens/erc-20/) token'ları ile yaptıkları bazı yaygın hataların yanı sıra, kullanıcıların bu hatalardan kaçınmasına yardımcı olan veya merkezi bir otoriteye bir miktar güç (örneğin hesapları dondurmak için) veren ERC-20 sözleşmelerinin nasıl oluşturulacağını öğreneceksiniz.

Bu makalede [OpenZeppelin ERC-20 token sözleşmesini](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20) kullanacak olsak da, bunun çok ayrıntılı bir şekilde açıklanmadığını unutmayın. Bu bilgiyi [burada](/developers/tutorials/erc20-annotated-code) bulabilirsiniz.

Tam kaynak kodunu görmek isterseniz:

1. [Remix IDE](https://remix.ethereum.org/)'yi açın.
2. GitHub'ı klonla simgesine tıklayın (![clone github icon](icon-clone.png)).
3. `https://github.com/qbzzt/20220815-erc20-safety-rails` GitHub deposunu klonlayın.
4. **contracts > erc20-safety-rails.sol** dosyasını açın.

## Bir ERC-20 sözleşmesi oluşturmak {#creating-an-erc-20-contract}

Güvenlik önlemi işlevselliğini eklemeden önce bir ERC-20 sözleşmesine ihtiyacımız var. Bu makalede [OpenZeppelin Sözleşme Sihirbazı'nı (Contracts Wizard)](https://docs.openzeppelin.com/contracts/5.x/wizard) kullanacağız. Bunu başka bir tarayıcıda açın ve şu talimatları izleyin:

1. **ERC20**'yi seçin.
2. Şu ayarları girin:

   | Parametre      | Değer            |
   | -------------- | ---------------- |
   | İsim           | SafetyRailsToken |
   | Sembol         | SAFE             |
   | Ön basım (Premint) | 1000             |
   | Özellikler     | Yok              |
   | Erişim Kontrolü| Sahiplenilebilir (Ownable) |
   | Yükseltilebilirlik | Yok              |

3. Yukarı kaydırın ve (Remix için) **Open in Remix**'e veya farklı bir ortam kullanmak için **Download**'a tıklayın. Remix kullandığınızı varsayacağım, başka bir şey kullanıyorsanız uygun değişiklikleri yapmanız yeterlidir.
4. Artık tamamen işlevsel bir ERC-20 sözleşmemiz var. İçe aktarılan kodu görmek için `.deps` > `npm` bölümünü genişletebilirsiniz.
5. Bir ERC-20 sözleşmesi olarak çalıştığını görmek için sözleşmeyi derleyin, dağıtın ve onunla denemeler yapın. Remix'i nasıl kullanacağınızı öğrenmeniz gerekiyorsa, [bu öğreticiyi kullanın](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Yaygın hatalar {#common-mistakes}

### Hatalar {#the-mistakes}

Kullanıcılar bazen token'ları yanlış adrese gönderirler. Ne yapmak istediklerini bilmek için zihinlerini okuyamasak da, çok sık meydana gelen ve tespit edilmesi kolay iki hata türü vardır:

1. Token'ları sözleşmenin kendi adresine göndermek. Örneğin, [Optimism'in OP token'ı](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) iki aydan kısa bir sürede [120.000'den fazla](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) OP token biriktirmeyi başardı. Bu, muhtemelen insanların öylece kaybettiği önemli miktarda bir serveti temsil ediyor.

2. Token'ları boş bir adrese, yani [dışarıdan sahipli bir hesaba (EOA)](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) veya bir [akıllı sözleşmeye](/developers/docs/smart-contracts) karşılık gelmeyen bir adrese göndermek. Bunun ne sıklıkla gerçekleştiğine dair istatistiklerim olmasa da, [tek bir olay 20.000.000 token'a mal olabilirdi](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Transferleri önlemek {#preventing-transfers}

OpenZeppelin ERC-20 sözleşmesi, bir token transfer edilmeden önce çağrılan [bir kanca (hook) olan `_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368) içerir. Varsayılan olarak bu kanca hiçbir şey yapmaz, ancak bir sorun olduğunda işlemi geri alan kontroller gibi kendi işlevselliğimizi ona ekleyebiliriz.

Kancayı kullanmak için, bu işlevi kurucudan sonra ekleyin:

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

Solidity'ye çok aşina değilseniz bu işlevin bazı kısımları yeni olabilir:

```solidity
        internal virtual
```

`virtual` anahtar kelimesi, tıpkı `ERC20`'den işlevselliği devraldığımız ve bu işlevi geçersiz kıldığımız (override) gibi, diğer sözleşmelerin de bizden devralabileceği ve bu işlevi geçersiz kılabileceği anlamına gelir.

```solidity
        override(ERC20)
```

`_beforeTokenTransfer`'un ERC20 token tanımını [geçersiz kıldığımızı (override)](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding) açıkça belirtmeliyiz. Genel olarak, açık tanımlar güvenlik açısından örtük olanlardan çok daha iyidir; eğer tam önünüzdeyse bir şey yaptığınızı unutamazsınız. Hangi üst sınıfın `_beforeTokenTransfer` işlevini geçersiz kıldığımızı belirtmemizin nedeni de budur.

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

Bu satır, devraldığımız ve bu işleve sahip olan sözleşmenin veya sözleşmelerin `_beforeTokenTransfer` işlevini çağırır. Bu durumda, bu sadece `ERC20`'dir, `Ownable` bu kancaya sahip değildir. Şu anda `ERC20._beforeTokenTransfer` hiçbir şey yapmasa da, gelecekte işlevsellik eklenmesi ihtimaline karşı onu çağırıyoruz (ve daha sonra sözleşmeyi yeniden dağıtmaya karar veririz, çünkü sözleşmeler dağıtımdan sonra değişmez).

### Gereksinimleri kodlamak {#coding-the-requirements}

İşleve şu gereksinimleri eklemek istiyoruz:

- `to` adresi, ERC-20 sözleşmesinin kendi adresi olan `address(this)`'e eşit olamaz.
- `to` adresi boş olamaz, şunlardan biri olmalıdır:
  - Dışarıdan sahipli bir hesap (EOA). Bir adresin doğrudan bir EOA olup olmadığını kontrol edemeyiz, ancak bir adresin ETH bakiyesini kontrol edebiliriz. EOA'lar artık kullanılmasalar bile neredeyse her zaman bir bakiyeye sahiptir; onları son Wei'ye kadar temizlemek zordur.
  - Bir akıllı sözleşme. Bir adresin akıllı sözleşme olup olmadığını test etmek biraz daha zordur. Harici kod uzunluğunu kontrol eden [`EXTCODESIZE`](https://www.evm.codes/#3b) adında bir işlem kodu vardır, ancak bu doğrudan Solidity'de mevcut değildir. Bunun için EVM assembly'si olan [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html)'u kullanmalıyız. Solidity'den kullanabileceğimiz başka değerler de vardır ([`<address>.code` ve `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types)), ancak bunların maliyeti daha yüksektir.

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

Bir adresin sözleşme olup olmadığını bu şekilde kontrol ederiz. Yul'dan doğrudan çıktı alamayız, bu yüzden bunun yerine sonucu tutacak bir değişken tanımlarız (bu durumda `isToContract`). Yul'un çalışma şekli, her işlem kodunun bir işlev olarak kabul edilmesidir. Bu yüzden önce sözleşme boyutunu almak için [`EXTCODESIZE`](https://www.evm.codes/#3b) çağırırız ve ardından sıfır olmadığını kontrol etmek için [`GT`](https://www.evm.codes/#11) kullanırız (işaretsiz tam sayılarla uğraşıyoruz, bu yüzden elbette negatif olamaz). Daha sonra sonucu `isToContract` değişkenine yazarız.

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

- [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) sözleşmelerinin tek bir sahibi vardır. `onlyOwner` [değiştiricisine (modifier)](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) sahip işlevler yalnızca o sahip tarafından çağrılabilir. Sahipler, sahipliği başkasına devredebilir veya tamamen feragat edebilirler. Diğer tüm hesapların hakları tipik olarak aynıdır.
- [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) sözleşmeleri [role dayalı erişim kontrolüne (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control) sahiptir.

Basitlik adına, bu makalede `Ownable` kullanıyoruz.

### Sözleşmeleri dondurmak ve çözmek {#freezing-and-thawing-contracts}

Sözleşmeleri dondurmak ve çözmek birkaç değişiklik gerektirir:

- Hangi adreslerin dondurulduğunu takip etmek için adreslerden [boolean](https://en.wikipedia.org/wiki/Boolean_data_type) değerlere bir [eşleme (mapping)](https://www.tutorialspoint.com/solidity/solidity_mappings.htm). Tüm değerler başlangıçta sıfırdır, bu da boolean değerler için yanlış (false) olarak yorumlanır. İstediğimiz de budur çünkü varsayılan olarak hesaplar dondurulmamıştır.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- Bir hesap dondurulduğunda veya çözüldüğünde ilgilenen herkesi bilgilendirmek için [olaylar](https://www.tutorialspoint.com/solidity/solidity_events.htm). Teknik olarak konuşursak, bu eylemler için olaylar gerekli değildir, ancak zincir dışı kodun bu olayları dinleyebilmesine ve ne olduğunu bilmesine yardımcı olur. Başkasıyla ilgili olabilecek bir şey olduğunda bir akıllı sözleşmenin bunları yayması (emit) iyi bir davranış olarak kabul edilir.

  Olaylar indekslenmiştir, böylece bir hesabın dondurulduğu veya çözüldüğü tüm zamanları aramak mümkün olacaktır.

  ```solidity
    // Hesaplar dondurulduğunda veya çözüldüğünde
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- Hesapları dondurmak ve çözmek için işlevler. Bu iki işlev neredeyse aynıdır, bu yüzden sadece dondurma işlevinin üzerinden geçeceğiz.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm) olarak işaretlenmiş işlevler, diğer akıllı sözleşmelerden veya doğrudan bir işlem tarafından çağrılabilir.

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  Hesap zaten dondurulmuşsa, işlemi geri alın. Aksi takdirde, dondurun ve bir olay `emit` (yayınlayın).

- Dondurulmuş bir hesaptan para taşınmasını önlemek için `_beforeTokenTransfer` işlevini değiştirin. Dondurulmuş hesaba hala para transfer edilebileceğini unutmayın.

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

Bu, adresi aldığımızda bir sözleşme için nesne oluşturmanın sözdizimidir. Bunu yapabiliriz çünkü kaynak kodunun bir parçası olarak ERC20 token'ları için tanıma sahibiz (bkz. satır 4) ve bu dosya, bir OpenZeppelin ERC-20 sözleşmesinin arayüzü olan [IERC20 tanımını](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) içerir.

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

Bu bir temizleme işlevidir, bu yüzden muhtemelen hiçbir token bırakmak istemiyoruz. Bakiyeyi kullanıcıdan manuel olarak almak yerine, süreci otomatikleştirebiliriz.

## Sonuç {#conclusion}

Bu mükemmel bir çözüm değildir - "kullanıcı hata yaptı" sorunu için mükemmel bir çözüm yoktur. Ancak, bu tür kontrolleri kullanmak en azından bazı hataları önleyebilir. Hesapları dondurma yeteneği, tehlikeli olsa da, bilgisayar korsanının çalınan fonlara erişimini reddederek belirli saldırıların (hack) hasarını sınırlamak için kullanılabilir.

[Çalışmalarımın daha fazlası için buraya bakın](https://cryptodocguy.pro/).