---
title: "EIP-1271: Akıllı Sözleşme İmzalarını İmzalamak ve Doğrulamak"
description: "EIP-1271 ile akıllı sözleşme imzası oluşturma ve doğrulamaya genel bir bakış. Ayrıca akıllı sözleşme geliştiricilerinin üzerine inşa edebileceği somut bir örnek sağlamak için Safe'te (eski adıyla Gnosis Safe) kullanılan EIP-1271 uygulamasına da göz atıyoruz."
author: Nathan H. Leung
lang: tr
tags: ["eip-1271", "akıllı sözleşmeler", "doğrulama", "imzalama"]
skill: intermediate
breadcrumb: "EIP-1271 imzaları"
published: 2023-01-12
---

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) standardı, akıllı sözleşmelerin imzaları doğrulamasına olanak tanır.

Bu eğitimde, dijital imzalara, EIP-1271'in arka planına ve [Safe](https://safe.global/) (eski adıyla Gnosis Safe) tarafından kullanılan spesifik EIP-1271 uygulamasına genel bir bakış sunuyoruz. Tüm bunlar, kendi sözleşmelerinizde EIP-1271'i uygulamak için bir başlangıç noktası görevi görebilir.

## İmza nedir? {#what-is-a-signature}

Bu bağlamda bir imza (daha doğrusu bir "dijital imza"), bir mesaj ve bu mesajın belirli bir kişiden/göndericiden/adresten geldiğine dair bir tür kanıttır.

Örneğin, bir dijital imza şu şekilde görünebilir:

1. Mesaj: "Bu web sitesine Ethereum cüzdanımla giriş yapmak istiyorum."
2. İmzalayan: Adresim `0x000…`
3. Kanıt: İşte benim, yani `0x000…` adresinin, aslında tüm bu mesajı oluşturduğuma dair bir kanıt (bu genellikle kriptografik bir şeydir).

Bir dijital imzanın hem bir "mesaj" hem de bir "imza" içerdiğini unutmamak önemlidir.

Neden mi? Örneğin, bana imzalamam için bir sözleşme verseydiniz ve ben de imza sayfasını kesip sözleşmenin geri kalanı olmadan size sadece imzalarımı geri verseydim, sözleşme geçerli olmazdı.

Aynı şekilde, bir dijital imza ilişkili bir mesaj olmadan hiçbir anlam ifade etmez!

## EIP-1271 neden var? {#why-does-eip-1271-exist}

Ethereum tabanlı blokzincirlerinde kullanılmak üzere bir dijital imza oluşturmak için genellikle sizden başka kimsenin bilmediği gizli bir özel anahtara ihtiyacınız vardır. İmzanızı size ait yapan şey budur (gizli anahtarı bilmeden başka hiç kimse aynı imzayı oluşturamaz).

Ethereum hesabınızla (yani harici olarak sahip olunan hesabınız/EOA) ilişkili bir özel anahtar vardır ve bu, bir web sitesi veya merkeziyetsiz uygulama (dapp) sizden bir imza istediğinde (örneğin, "Ethereum ile Giriş Yap" için) tipik olarak kullanılan özel anahtardır.

Bir uygulama, ethers.js gibi üçüncü taraf bir kütüphane kullanarak oluşturduğunuz bir imzayı [özel anahtarınızı bilmeden](https://en.wikipedia.org/wiki/Public-key_cryptography) [doğrulayabilir](https://www.alchemy.com/docs/how-to-verify-a-message-signature-on-ethereum) ve imzayı oluşturanın _siz_ olduğunuzdan emin olabilir.

> Aslında, EOA dijital imzaları açık anahtarlı kriptografi kullandığından, **zincir dışı** olarak oluşturulabilir ve doğrulanabilirler! Gazsız DAO oylaması bu şekilde çalışır; oyları zincir içi göndermek yerine, kriptografik kütüphaneler kullanılarak zincir dışı dijital imzalar oluşturulabilir ve doğrulanabilir.

EOA hesaplarının bir özel anahtarı varken, akıllı sözleşme hesaplarının herhangi bir özel veya gizli anahtarı yoktur (bu nedenle "Ethereum ile Giriş Yap" vb. akıllı sözleşme hesaplarıyla yerel olarak çalışamaz).

EIP-1271'in çözmeyi amaçladığı sorun: Akıllı sözleşmenin imzaya dahil edebileceği bir "sırrı" yoksa, bir akıllı sözleşme imzasının geçerli olduğunu nasıl anlayabiliriz?

## EIP-1271 nasıl çalışır? {#how-does-eip-1271-work}

Akıllı sözleşmelerin mesajları imzalamak için kullanılabilecek özel anahtarları yoktur. Peki bir imzanın gerçek olup olmadığını nasıl anlayabiliriz?

Bir fikir, akıllı sözleşmeye bir imzanın gerçek olup olmadığını sadece _sormaktır_!

EIP-1271'in yaptığı şey, bir akıllı sözleşmeye belirli bir imzanın geçerli olup olmadığını "sorma" fikrini standartlaştırmaktır.

EIP-1271'i uygulayan bir sözleşmenin, bir mesaj ve bir imza alan `isValidSignature` adında bir işlevi olmalıdır. Sözleşme daha sonra bazı doğrulama mantıklarını çalıştırabilir (spesifikasyon burada belirli bir şeyi zorunlu kılmaz) ve ardından imzanın geçerli olup olmadığını belirten bir değer döndürebilir.

Eğer `isValidSignature` geçerli bir sonuç döndürürse, bu hemen hemen sözleşmenin "evet, bu imza + mesajı onaylıyorum!" demesidir.

### Arayüz {#interface}

İşte EIP-1271 spesifikasyonundaki tam arayüz (aşağıda `_hash` parametresi hakkında konuşacağız, ancak şimdilik bunu doğrulanan mesaj olarak düşünün):

```jsx
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /**
   * @dev Sağlanan imzanın sağlanan hash için geçerli olup olmadığını döndürmelidir
   * @param _hash      İmzalanacak verinin hash'i
   * @param _signature _hash ile ilişkili imza bayt dizisi
   *
   * İşlev başarılı olduğunda 0x1626ba7e bytes4 sihirli değerini döndürmelidir.
   * Durumu değiştirmemelidir (solc < 0.5 için STATICCALL, solc > 0.5 için view değiştiricisi kullanarak)
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

## Örnek EIP-1271 Uygulaması: Safe {#example-eip-1271-implementation-safe}

Sözleşmeler `isValidSignature` işlevini birçok şekilde uygulayabilir; spesifikasyon tam uygulama hakkında pek bir şey söylemez.

EIP-1271'i uygulayan dikkate değer bir sözleşme Safe'tir (eski adıyla Gnosis Safe).

Safe'in kodunda, `isValidSignature` imzaların [iki şekilde](https://ethereum.stackexchange.com/questions/122635/signing-messages-as-a-gnosis-safe-eip1271-support) oluşturulup doğrulanabileceği şekilde [uygulanmıştır](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol):

1. Zincir içi mesajlar
   1. Oluşturma: Bir Safe sahibi, bir mesajı "imzalamak" için yeni bir Safe işlemi oluşturur ve mesajı işleme veri olarak geçirir. Çoklu imza eşiğine ulaşmak için yeterli sayıda sahip işlemi imzaladığında, işlem yayınlanır ve çalıştırılır. İşlemde, mesajı "onaylanmış" mesajlar listesine ekleyen (`signMessage(bytes calldata _data)`) adında bir Safe işlevi vardır.
   2. Doğrulama: Safe sözleşmesinde `isValidSignature` işlevini çağırın ve doğrulanacak mesajı mesaj parametresi olarak ve [imza parametresi için boş bir değer](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L32) (yani `0x`) geçirin. Safe, imza parametresinin boş olduğunu görecek ve imzayı kriptografik olarak doğrulamak yerine, sadece devam edip mesajın "onaylanmış" mesajlar listesinde olup olmadığını kontrol etmesi gerektiğini bilecektir.
2. Zincir dışı mesajlar:
   1. Oluşturma: Bir Safe sahibi zincir dışı bir mesaj oluşturur, ardından çoklu imza onay eşiğini aşmak için yeterli imza olana kadar diğer Safe sahiplerinin mesajı tek tek imzalamasını sağlar.
   2. Doğrulama: `isValidSignature` işlevini çağırın. Mesaj parametresinde, doğrulanacak mesajı geçirin. İmza parametresinde, her bir Safe sahibinin bireysel imzalarını arka arkaya birleştirilmiş olarak geçirin. Safe, eşiği karşılamak için yeterli imza olup olmadığını **ve** her bir imzanın geçerli olup olmadığını kontrol edecektir. Eğer öyleyse, başarılı imza doğrulamasını belirten bir değer döndürecektir.

## `_hash` parametresi tam olarak nedir? Neden tüm mesajı geçirmiyoruz? {#what-exactly-is-the-hash-parameter-why-not-pass-the-whole-message}

[EIP-1271 arayüzündeki](https://eips.ethereum.org/EIPS/eip-1271) `isValidSignature` işlevinin mesajın kendisini değil, bunun yerine bir `_hash` parametresi aldığını fark etmiş olabilirsiniz. Bunun anlamı, rastgele uzunluktaki tam mesajı `isValidSignature` işlevine geçirmek yerine, mesajın 32 baytlık bir hash'ini (genellikle keccak256) geçirmemizdir.

Çağrı verisinin (calldata) her bir baytı — yani bir akıllı sözleşme işlevine geçirilen işlev parametresi verisi — [16 gaz (sıfır bayt ise 4 gaz) maliyetindedir](https://eips.ethereum.org/EIPS/eip-2028), bu nedenle bir mesaj uzunsa bu çok fazla gaz tasarrufu sağlayabilir.

### Önceki EIP-1271 Spesifikasyonları {#previous-eip-1271-specifications}

Pratikte, ilk parametresi `bytes` türünde (sabit uzunluklu `bytes32` yerine rastgele uzunlukta) ve parametre adı `message` olan bir `isValidSignature` işlevine sahip EIP-1271 spesifikasyonları vardır. Bu, EIP-1271 standardının [daha eski bir sürümüdür](https://github.com/safe-global/safe-contracts/issues/391#issuecomment-1075427206).

## EIP-1271 kendi sözleşmelerimde nasıl uygulanmalıdır? {#how-should-eip-1271-be-implemented-in-my-own-contracts}

Spesifikasyon burada çok ucu açıktır. Safe uygulamasının bazı iyi fikirleri vardır:

- Sözleşmenin "sahibinden" gelen EOA imzalarını geçerli kabul edebilirsiniz.
- Onaylanmış mesajların bir listesini saklayabilir ve yalnızca bunları geçerli kabul edebilirsiniz.

Sonuçta, sözleşme geliştiricisi olarak bu size kalmış!

## Sonuç {#conclusion}

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271), akıllı sözleşmelerin imzaları doğrulamasına olanak tanıyan çok yönlü bir standarttır. Akıllı sözleşmelerin daha çok EOA'lar gibi davranmasına kapı açar — örneğin "Ethereum ile Giriş Yap"ın akıllı sözleşmelerle çalışması için bir yol sağlar — ve birçok şekilde uygulanabilir (Safe'in dikkate alınması gereken, basit olmayan, ilginç bir uygulaması vardır).