---
title: "EIP-1271: Akıllı Sözleşme İmzalarını İmzalama ve Doğrulama"
description: EIP-1271 ile Akıllı sözleşme imzası oluşturmaya ve doğrulamaya yönelik bir genel görünüm. Ayrıca akıllı sözleşme geliştiricilerinin üzerine geliştirme yapmaları amaçlı somut bir örnek sağlamak için "Safe"te (önceden adı Gnosis Safe'ti) kullanılan EIP-1271 uygulamasının üstünden geçeceğiz.
author: Nathan H. Leung
lang: tr
tags:
  - "eip-1271"
  - "akıllı sözleşmeler"
  - "doğrulama"
  - "imzalama"
skill: intermediate
published: 2023-01-12
---

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) standardı, akıllı sözleşmelerin imzaları doğrulayabilmesini sağlar.

Bu öğreticide dijital imzalar, EIP-1271in arka planı ve [Safe](https://safe.global/)(önceden adı Gnosis Safe'ti) tarafından kullanılan spesifik EIP-1271 uygulaması hakkında genel bilgiler vereceğiz. Kısaca bu, EIP-1271'i kendi sözleşmelerinizde uygulayabilmek için bir başlangıç noktası olarak hizmet edebilir.

## İmza nedir?

Bu bağlamda imza (daha doğrusu “dijital imza”), bir mesaj ve onunla birlikte mesajın belirli bir kişiden/göndericiden/adresten geldiğine ilişkin bir tür kanıttır.

Örnek olarak, bir dijital imza şu şekilde görünebilir:

1. Mesaj: "Bu siteye Ethereum cüzdanımla girmek istiyorum".
2. İmzalayıcı: Benim adresim `0x000…`
3. Kanıt: İşte benim, `0x000…`, bu mesajın tamamını gerçekten oluşturduğumu gösteren kanıt (bu genelde kriptografik bir şeydir).

Dijital imzanın hem "mesaj" hem de "imza" içerdiğini tekrar hatırlatmakta fayda var.

Neden? Mesela bana imzalamam için bir sözleşme verseniz ve ben de imzalama sayfasını yırtıp sözleşmenin geri kalanı olmadan size versem, sözleşmenin hiçbir geçerliliği olmaz.

Aynı nedenle, dijital imzalar da ilişkili bir mesaj olmadan bir hiçtir!

## EIP-1271 neden var?

Ethereum tabanlı blokzincirlerde kullanılacak bir dijital imza oluşturmak için genelde kimsenin bilmediği gizli bir özel anahtara ihtiyacınız vardır. Bu, imzanızı sizin yapan şeydir (kimse gizli anahtarı bilmeden aynı imzayı yaratamaz).

Ethereum hesabınızın (harici olarak sahiplenilmiş hesabınız/EOA) kendisine bağlı bir özel anahtarı vardır ve bu, bir site veya merkeziyetsiz uygulama sizden bir imza istediğinizde tipik olarak kullandığınız anahtardır (örnek: "Ethereum ile giriş yapın" için).

Bir uygulama, [özel anahtarınızı bilmeden](https://en.wikipedia.org/wiki/Public-key_cryptography) ethers.js gibi bir üçüncü taraf kullanarak oluşturduğunuz bir [imzayı onaylayabilir](https://docs.alchemy.com/docs/how-to-verify-a-message-signature-on-ethereum)ve imzayı yaratanın _siz_ olduğunuza güvenebilir.

> EOA dijital imzaları, herkese açık anahtar kriptografisi kullandığı için **zincir dışında** oluşturulabilir ve doğrulanabilir! Gazsız DAO oylaması bu şekilde çalışır; oyları zincir üstünde göndermek yerine, kriptografik kütüphaneler kullanılarak zincir dışında dijital imzalar oluşturulabilir ve doğrulanabilir.

EOA hesapları bir özel anahtara sahipken, akıllı sözleşme hesaplarının bu türde bir özel ya da gizli anahtarı yoktur (yani "Ethereum'la giriş yapın" ve benzerleri, akıllı sözleşme hesaplarınızla yerel biçimde çalışamaz).

EIP-1271'in çözmeyi hedeflediği problem: Eğer bir akıllı sözleşmenin imzanın içine yerleştirdiği bir "giz" yoksa akıllı sözleşmenin imzasının geçerli olduğunu nasıl anlarız?

## EIP-1271 nasıl çalışır?

Akıllı sözleşmelerin mesaj imzalamak için kullanabilecekleri özel anahtarları yoktur. O zaman bir imzanın özgün olduğunu nasıl anlayabiliriz?

Bir yolu, imzanın özgün olup olmadığını doğrudan akıllı sözleşmeye _sormak_ olabilir!

EIP'nin yaptığı şey, bir akıllı sözleşmeye belirli bir imzanın geçerli olup olmadığını sorma fikrini standart hale getirmektir.

EIP-1271'i uygulayan bir sözleşmenin bir mesaj ve imzayı alan `isValidSignature` adında bir fonksiyonu olması gerekir. Sözleşme, sonrasında bir tür doğrulama mantığı yürütüp (burada spesifikasyon belirli bir şeyi uygulatmaz) ve imzanın geçerli olup olmadığını belirten bir değer döndürebilir.

Eğer `isValidSignature` geçerli bir sonuç döndürürse, sözleşmenin hemen hemen "evet, bu imzayı + mesajı onaylıyorum" dediği sonucuna ulaşılabilir!

### Arayüz

EIP-1271 spesifikasyonundaki arayüz tam olarak budur (aşağıda `hash` parametresi hakkında konuşacağız, fakat şimdilik bunu doğrulanmakta olan mesaj gibi düşünün):

```jsx
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /**
   * @dev Should return whether the signature provided is valid for the provided hash
   * @param _hash      Hash of the data to be signed
   * @param _signature Signature byte array associated with _hash
   *
   * MUST return the bytes4 magic value 0x1626ba7e when function passes.
   * MUST NOT modify state (using STATICCALL for solc < 0.5, view modifier for solc > 0.5)
   * MUST allow external calls
   */
  function isValidSignature(
    bytes32 _hash,
    bytes memory _signature)
    public
    view
    returns (bytes4 magicValue);
}
```

## Örnek EIP-1271 Uygulaması: Safe

Sözleşmeler, `isValidSignature`'ı farklı şekillerde uygulayabilir; spesifikasyon kendi başına uygulama hakkında pek bir şey demez.

EIP-1271'i uygulayan göze çarpan sözleşmelerden biri Safe'tir (önceden adı Gnosis Safe'ti).

Safe'in kodunda `isValidSignature` [uygulanır](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol), bu sayede imzalar [iki farklı şekilde](https://ethereum.stackexchange.com/questions/122635/signing-messages-as-a-gnosis-safe-eip1271-support) oluşturulabilir ve doğrulanabilir:

1. Zincir üstü mesajlar
   1. Oluşturma: bir Safe sahibi bir mesajı "imzalamak" için yeni bir Safe işlemi oluşturarak mesajı veri olarak işleme aktarır. Çoklu imza eşiğine ulaşabilmek için yeterli sayıda sahip işlemi imzaladığında, işlem yayımlanır ve çalıştırılır. İşlemde, mesajı onaylanmış mesajlar listesine ekleyen, çağrılan güvenli bir fonksiyon vardır.
   2. Doğrulama: Safe sözleşmesinde `isValidSignature`'ı çağırın ve mesajı, mesaj parametresi ve [imza parametresi için boş bir değer olarak doğrulamak üzere aktarın](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L32) (yani `0x`). Safe, imza parametresinin boş olduğunu görecek ve kriptografik olarak imzayı doğrulamak yerine, sadece devam etmesi ve mesajın "onaylanmış" mesajlar listesi içinde olup olmadığını kontrol etmesi gerektiğini bilecektir.
2. Zincir dışı mesajlar:
   1. Oluşturma: bir Safe sahibi zincir dışı bir mesaj oluşturur, sonra da diğer Safe sahiplerin her birinin çoklu imza onaylanma eşiğine gelene kadar mesajı imzalamasını sağlar.
   2. Doğrulama: `isValidSignature`'ı çağırın. Mesaj parametresinde, doğrulanması gereken mesajı aktarın. İmza parametresinde, Safe sahiplerinin her birinin bireysel imzalarını sıralanmış şekilde arka arkaya aktarın. Safe, eşiğe ulaşmak için gerekli sayıda imza olup olmadığını **ve** her bir imzanın geçerli olup olmadığını kontrol edecektir. Eğer geçerliyse, imza doğrulamasının başarılı olduğunu belirten bir değer döndürecektir.

## `_hash` parametresi tam olarak nedir? Neden tüm mesajı aktarmıyoruz?

[EIP-1271 arayüzündeki](https://eips.ethereum.org/EIPS/eip-1271) `isValidSignature` fonksiyonunun mesaj yerine bir `_hash` parametresini aldığını fark etmiş olabilirsiniz. Bunun anlamı, `isValidSignature`'a keyfi uzunluktaki mesajın tamamını aktarmak yerine, mesajın 32 baytlık bir düğümünü (genelde keccak256) aktarıyor olmamızdır.

Çağrı verisinin her baytı, yani bir akıllı sözleşmeye aktarılan fonksiyon parametresi verilerinin maliyeti [16 gazdır (sıfır baytsa 4 gaz)](https://eips.ethereum.org/EIPS/eip-2028), yani bir mesaj uzunsa gazdan ciddi şekilde tasarruf edilebilir.

### Önceki EIP-1271 Spesifikasyonları

Etrafta ilk parametresi `bytes` (sabit uzunluk yerine keyfi uzunlukta `bytes32`) olan ve parametre ismi `message` olan `isValidSignature` fonksiyonlu EIP-1271 spesifikasyonları mevcuttur. Bu, EIP-1271 standardının [eski](https://github.com/safe-global/safe-contracts/issues/391#issuecomment-1075427206) bir versiyonudur.

## EIP-1271 benim sözleşmelerime nasıl uygulanmalıdır?

Burada spesifikasyon oldukça açık uçludur. Safe uygulamasının birkaç iyi fikri vardır:

- Sözleşmenin "sahibinden" gelen EOA imzalarının geçerli olduğunu varsayabilirsiniz.
- Onaylanmış mesajlardan oluşan bir listeyi kaydedip sadece onların geçerli olduğunu varsayabilirsiniz.

Sonuçta, bu sözleşme geliştiricisi olarak size kalmış!

## Sonuç

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271), akıllı sözleşmelerin imzaları doğrulayabilmelerini sağlayan çok yönlü bir standarttır. Akıllı sözleşmelerin EOA'lar gibi hareket edebilmelerini sağlar; örnek olarak, "Ethereum'la giriş yapın" ifadesinin akıllı sözleşmelerle çalışabilmesine olanak tanır ve birçok farklı şekilde uygulanabilir (Safe'in anlaşılması zor ve ilginç uygulamasını da göz önünde bulundurarak).
