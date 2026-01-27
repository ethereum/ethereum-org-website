---
title: "EIP-1271: Akıllı Sözleşme İmzalarını İmzalama ve Doğrulama"
description: EIP-1271 ile Akıllı sözleşme imzası oluşturmaya ve doğrulamaya yönelik bir genel görünüm. Ayrıca akıllı sözleşme geliştiricilerinin üzerine geliştirme yapmaları amaçlı somut bir örnek sağlamak için "Safe"te (önceden adı Gnosis Safe'ti) kullanılan EIP-1271 uygulamasının üstünden geçeceğiz.
author: Nathan H. Leung
lang: tr
tags:
  [
    "eip-1271",
    "akıllı kontratlar",
    "doğrulama",
    "imzalama"
  ]
skill: intermediate
published: 12/01/2023
---

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) standardı, akıllı sözleşmelerin imzaları doğrulamasına olanak tanır.

Bu öğreticide, dijital imzalara, EIP-1271'in arka planına ve [Safe](https://safe.global/) (eski adıyla Gnosis Safe) tarafından kullanılan özel EIP-1271 uygulamasına genel bir bakış sunuyoruz. Kısaca bu, EIP-1271'i kendi sözleşmelerinizde uygulayabilmek için bir başlangıç noktası olarak hizmet edebilir.

## İmza nedir?

Bu bağlamda imza (daha doğrusu “dijital imza”), bir mesaj ve onunla birlikte mesajın belirli bir kişiden/göndericiden/adresten geldiğine ilişkin bir tür kanıttır.

Örnek olarak, bir dijital imza şu şekilde görünebilir:

1. Mesaj: "Bu siteye Ethereum cüzdanımla girmek istiyorum".
2. İmzalayıcı: Adresim `0x000…`
3. Kanıt: İşte ben, `0x000…`, bu mesajın tamamını gerçekten oluşturduğumun kanıtı (bu genellikle kriptografik bir şeydir).

Dijital imzanın hem "mesaj" hem de "imza" içerdiğini tekrar hatırlatmakta fayda var.

Neden? Mesela bana imzalamam için bir sözleşme verseniz ve ben de imzalama sayfasını yırtıp sözleşmenin geri kalanı olmadan size versem, sözleşmenin hiçbir geçerliliği olmaz.

Aynı nedenle, dijital imzalar da ilişkili bir mesaj olmadan bir hiçtir!

## EIP-1271 neden var?

Ethereum tabanlı blokzincirlerde kullanılacak bir dijital imza oluşturmak için genelde kimsenin bilmediği gizli bir özel anahtara ihtiyacınız vardır. Bu, imzanızı sizin yapan şeydir (kimse gizli anahtarı bilmeden aynı imzayı yaratamaz).

Ethereum hesabınızın (yani harici olarak sahip olunan hesabınızın/EOA) ilişkili bir özel anahtarı vardır ve bu, bir web sitesi veya merkeziyetsiz uygulama sizden bir imza istediğinde (ör. “Ethereum ile Oturum Aç” için) genellikle kullanılan özel anahtardır.

Bir uygulama, ethers.js gibi bir üçüncü taraf kütüphanesi kullanarak oluşturduğunuz bir imzayı [özel anahtarınızı bilmeden](https://en.wikipedia.org/wiki/Public-key_cryptography) [doğrulayabilir](https://www.alchemy.com/docs/how-to-verify-a-message-signature-on-ethereum) ve imzanın _sizin_ tarafınızdan oluşturulduğundan emin olabilir.

> Aslında, EOA dijital imzaları açık anahtar kriptografisi kullandığından, **zincir dışı** olarak oluşturulabilir ve doğrulanabilirler! Gazsız DAO oylaması bu şekilde çalışır — oyları zincir üstünde göndermek yerine, dijital imzalar kriptografik kütüphaneler kullanılarak zincir dışında oluşturulabilir ve doğrulanabilir.

EOA hesapları bir özel anahtara sahipken, akıllı sözleşme hesaplarının bu türde bir özel ya da gizli anahtarı yoktur (yani "Ethereum'la giriş yapın" ve benzerleri, akıllı sözleşme hesaplarınızla yerel biçimde çalışamaz).

EIP-1271'in çözmeyi hedeflediği problem: Eğer bir akıllı sözleşmenin imzanın içine yerleştirdiği bir "giz" yoksa akıllı sözleşmenin imzasının geçerli olduğunu nasıl anlarız?

## EIP-1271 nasıl çalışır?

Akıllı sözleşmelerin mesaj imzalamak için kullanabilecekleri özel anahtarları yoktur. O zaman bir imzanın özgün olduğunu nasıl anlayabiliriz?

Bir fikir de, bir imzanın orijinal olup olmadığını doğrudan akıllı sözleşmeye _sormaktır_!

EIP'nin yaptığı şey, bir akıllı sözleşmeye belirli bir imzanın geçerli olup olmadığını sorma fikrini standart hale getirmektir.

EIP-1271'i uygulayan bir sözleşmenin, bir mesaj ve bir imza alan `isValidSignature` adında bir fonksiyonu olmalıdır. Sözleşme, sonrasında bir tür doğrulama mantığı yürütüp (burada spesifikasyon belirli bir şeyi uygulatmaz) ve imzanın geçerli olup olmadığını belirten bir değer döndürebilir.

Eğer `isValidSignature` geçerli bir sonuç döndürürse, bu, sözleşmenin “evet, bu imzayı + mesajı onaylıyorum!” dediği anlamına gelir.

### Arayüz

İşte EIP-1271 spesifikasyonundaki arayüzün tam hali (aşağıda `_hash` parametresinden bahsedeceğiz, ancak şimdilik bunu doğrulanan mesaj olarak düşünebilirsiniz):

```jsx
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /**
   * @dev Sağlanan imzanın, sağlanan karma için geçerli olup olmadığını döndürmelidir
   * @param _hash      İmzalanacak verinin karması
   * @param _signature _hash ile ilişkili imza bayt dizisi
   *
   * Fonksiyon başarılı olduğunda 0x1626ba7e sihirli bytes4 değerini döndürmelidir.
   * Durumu değiştirmemelidir (solc < 0.5 için STATICCALL, solc > 0.5 için view değiştiricisi kullanılır)
   * Harici çağrılara izin vermelidir
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

Sözleşmeler `isValidSignature` fonksiyonunu birçok farklı şekilde uygulayabilir — spesifikasyon tam olarak nasıl uygulanacağı hakkında pek bir şey söylemez.

EIP-1271'i uygulayan göze çarpan sözleşmelerden biri Safe'tir (önceden adı Gnosis Safe'ti).

Safe'in kodunda `isValidSignature`, imzaların [iki şekilde](https://ethereum.stackexchange.com/questions/122635/signing-messages-as-a-gnosis-safe-eip1271-support) oluşturulup doğrulanabilmesi için [şu şekilde uygulanmıştır](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol):

1. Zincir üstü mesajlar
   1. Oluşturma: bir Safe sahibi bir mesajı "imzalamak" için yeni bir Safe işlemi oluşturarak mesajı veri olarak işleme aktarır. Çoklu imza eşiğine ulaşabilmek için yeterli sayıda sahip işlemi imzaladığında, işlem yayımlanır ve çalıştırılır. İşlemde, mesajı “onaylanmış” mesajlar listesine ekleyen `signMessage(bytes calldata _data)` adında bir Safe fonksiyonu bulunur.
   2. Doğrulama: Safe sözleşmesinde `isValidSignature` fonksiyonunu çağırın ve mesaj parametresi olarak doğrulanacak mesajı ve [imza parametresi için boş bir değeri](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L32) (yani `0x`) geçin. Safe, imza parametresinin boş olduğunu görecek ve kriptografik olarak imzayı doğrulamak yerine, sadece devam etmesi ve mesajın "onaylanmış" mesajlar listesi içinde olup olmadığını kontrol etmesi gerektiğini bilecektir.
2. Zincir dışı mesajlar:
   1. Oluşturma: Bir Safe sahibi zincir dışı bir mesaj oluşturur, ardından çoklu imza onay eşiğini aşmak için yeterli imza olana kadar diğer Safe sahiplerinin her birinin mesajı ayrı ayrı imzalamasını sağlar.
   2. Doğrulama: `isValidSignature` fonksiyonunu çağırın. Mesaj parametresinde, doğrulanması gereken mesajı aktarın. İmza parametresinde, Safe sahiplerinin her birinin bireysel imzalarını sıralanmış şekilde arka arkaya aktarın. Safe, eşiği karşılamak için yeterli imza olup olmadığını **ve** her imzanın geçerli olup olmadığını kontrol edecektir. Eğer geçerliyse, imza doğrulamasının başarılı olduğunu belirten bir değer döndürecektir.

## `_hash` parametresi tam olarak nedir? Neden tüm mesajı aktarmıyoruz?

[EIP-1271 arayüzündeki](https://eips.ethereum.org/EIPS/eip-1271) `isValidSignature` fonksiyonunun mesajın kendisini değil, bunun yerine bir `_hash` parametresi aldığını fark etmiş olabilirsiniz. Bunun anlamı, `isValidSignature`'a değişken uzunluktaki mesajın tamamını geçmek yerine, mesajın 32 baytlık bir karmasını (genellikle keccak256) geçmemizdir.

`calldata`nın her baytı — yani, bir akıllı sözleşme fonksiyonuna geçirilen fonksiyon parametre verileri — [16 gaz maliyetindedir (sıfır bayt ise 4 gaz)](https://eips.ethereum.org/EIPS/eip-2028), bu nedenle bir mesaj uzunsa çok fazla gaz tasarrufu sağlayabilir.

### Önceki EIP-1271 Spesifikasyonları

Piyasada, `isValidSignature` fonksiyonunun ilk parametresinin `message` adında ve `bytes` türünde (sabit uzunluklu `bytes32` yerine değişken uzunluklu) olduğu EIP-1271 spesifikasyonları bulunmaktadır. Bu, EIP-1271 standardının [eski bir sürümüdür](https://github.com/safe-global/safe-contracts/issues/391#issuecomment-1075427206).

## EIP-1271 benim sözleşmelerime nasıl uygulanmalıdır?

Burada spesifikasyon oldukça açık uçludur. Safe uygulamasının birkaç iyi fikri vardır:

- Sözleşmenin "sahibinden" gelen EOA imzalarının geçerli olduğunu varsayabilirsiniz.
- Onaylanmış mesajlardan oluşan bir listeyi kaydedip sadece onların geçerli olduğunu varsayabilirsiniz.

Sonuçta, bu sözleşme geliştiricisi olarak size kalmış!

## Sonuç

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271), akıllı sözleşmelerin imzaları doğrulamasına olanak tanıyan çok yönlü bir standarttır. Akıllı sözleşmelerin EOA'lar gibi hareket edebilmelerini sağlar; örnek olarak, "Ethereum'la giriş yapın" ifadesinin akıllı sözleşmelerle çalışabilmesine olanak tanır ve birçok farklı şekilde uygulanabilir (Safe'in anlaşılması zor ve ilginç uygulamasını da göz önünde bulundurarak).
