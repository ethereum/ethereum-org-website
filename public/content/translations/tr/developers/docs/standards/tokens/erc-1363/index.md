---
title: ERC-1363 Ödenebilir Jeton Standardı
description: ERC-1363, transferlerden sonra alıcı bir sözleşmede veya onaylardan sonra harcayan bir sözleşmede, tümü tek bir işlemde olmak üzere özel mantık yürütmeyi destekleyen ERC-20 jetonları için bir genişletme arayüzüdür.
lang: tr
---

## Giriş {#introduction}

### ERC-1363 nedir? {#what-is-erc1363}

ERC-1363, transferlerden sonra alıcı bir sözleşmede veya onaylardan sonra harcayan bir sözleşmede, tümü tek bir işlemde olmak üzere özel mantık yürütmeyi destekleyen ERC-20 jetonları için bir genişletme arayüzüdür.

### ERC-20'den farkları {#erc20-differences}

`transfer`, `transferFrom` ve `approve` gibi standart ERC-20 işlemleri, ayrı bir işlem olmaksızın alıcı veya harcayan sözleşmesinde kod yürütülmesine izin vermez.
Bu durum, kullanıcı arayüzü geliştirmede karmaşıklığa ve benimsenmesinde zorluğa neden olur çünkü kullanıcıların ilk işlemin yürütülmesini beklemesi ve ardından ikinci işlemi göndermesi gerekir.
Ayrıca iki kez GAZ ödemeleri gerekir.

ERC-1363, misli jetonların eylemleri daha kolay gerçekleştirmesini ve herhangi bir zincir dışı dinleyici kullanmadan çalışmasını sağlar.
Tek bir işlemde, bir transferden veya onaydan sonra bir alıcı veya harcayan sözleşmesinde geri arama yapılmasına olanak tanır.

## Ön Koşullar {#prerequisites}

Bu sayfayı daha iyi anlamak için önce şunları okumanızı öneririz:

- [Jeton standartları](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Gövde {#body}

ERC-1363, ERC-20 jetonlarının `transfer`, `transferFrom` veya `approve` işlemlerinden sonra akıllı sözleşmelerle etkileşime girmesi için standart bir API sunar.

Bu standart, jetonları transfer etmek için temel işlevsellik sağlar, ayrıca jetonların zincir üzerindeki başka bir üçüncü tarafça harcanabilmesi için onaylanmasına ve ardından alıcı veya harcayan sözleşmesinde bir geri arama yapılmasına olanak tanır.

ERC-20 geri aramalarını kabul edebilen akıllı sözleşmeler için önerilen birçok kullanım alanı vardır.

Örneğin:

- **Kitle satışları**: gönderilen jetonlar anında ödül dağıtımını tetikler.
- **Hizmetler**: ödeme, hizmet erişimini tek adımda etkinleştirir.
- **Faturalar**: jetonlar faturaları otomatik olarak öder.
- **Abonelikler**: yıllık ücretin onaylanması, ilk ayın ödemesi dahilinde aboneliği etkinleştirir.

Bu nedenlerle başlangıçta **"Ödenebilir Jeton"** olarak adlandırılmıştır.

Geri arama davranışı, kullanım alanını daha da genişleterek şunlar gibi sorunsuz etkileşimleri mümkün kılar:

- **Hisseleme**: transfer edilen jetonlar bir hisseleme sözleşmesinde otomatik kilitlemeyi tetikler.
- **Oylama**: alınan jetonlar bir yönetişim sisteminde oyları kaydeder.
- **Takas**: jeton onayları, takas mantığını tek adımda etkinleştirir.

ERC-1363 jetonları, alınan bir transfer veya onaydan sonra bir geri aramanın yürütülmesini gerektiren tüm durumlarda belirli yardımcı programlar için kullanılabilir.
ERC-1363, alıcının jetonları işleme yeteneğini doğrulayarak akıllı sözleşmelerde jeton kaybını veya jeton kilitlenmesini önlemek için de kullanışlıdır.

Diğer ERC-20 genişletme önerilerinin aksine ERC-1363, ERC-20 `transfer` ve `transferFrom` yöntemlerini geçersiz kılmaz ve ERC-20 ile geriye dönük uyumluluğu koruyarak uygulanacak arayüz kimliklerini tanımlar.

[EIP-1363'den](https://eips.ethereum.org/EIPS/eip-1363):

### Yöntemler {#methods}

ERC-1363 standardını uygulayan akıllı sözleşmeler, `ERC1363` arayüzündeki tüm fonksiyonların yanı sıra `ERC20` ve `ERC165` arayüzlerini de **MUTLAKA** uygulamalıdır.

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev Tek bir işlemde, `transfer` veya `transferFrom` sonrası alıcı bir sözleşmede kod yürütmeyi veya `approve` sonrası harcayan bir sözleşmede kod yürütmeyi destekleyen ERC-20 jetonları için bir genişletme arayüzü.
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * NOT: bu arayüz için ERC-165 tanımlayıcısı 0xb0202a11'dir.
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev Çağıranın hesabından `to` adresine `value` miktarında jeton taşır
   * ve ardından `to` üzerinde `ERC1363Receiver::onTransferReceived` fonksiyonunu çağırır.
   * @param to Jetonların transfer edildiği adres.
   * @param value Transfer edilecek jeton miktarı.
   * @return Bir hata oluşmadığı sürece işlemin başarılı olduğunu gösteren bir boole değeri.
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev Çağıranın hesabından `to` adresine `value` miktarında jeton taşır
   * ve ardından `to` üzerinde `ERC1363Receiver::onTransferReceived` fonksiyonunu çağırır.
   * @param to Jetonların transfer edildiği adres.
   * @param value Transfer edilecek jeton miktarı.
   * @param data Belirtilen bir formatı olmayan, `to` adresine yapılan çağrıda gönderilen ek veriler.
   * @return Bir hata oluşmadığı sürece işlemin başarılı olduğunu gösteren bir boole değeri.
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Ödenek mekanizmasını kullanarak `from` adresinden `to` adresine `value` miktarında jeton taşır
   * ve ardından `to` üzerinde `ERC1363Receiver::onTransferReceived` fonksiyonunu çağırır.
   * @param from Jetonların gönderileceği adres.
   * @param to Jetonların transfer edildiği adres.
   * @param value Transfer edilecek jeton miktarı.
   * @return Bir hata oluşmadığı sürece işlemin başarılı olduğunu gösteren bir boole değeri.
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev Ödenek mekanizmasını kullanarak `from` adresinden `to` adresine `value` miktarında jeton taşır
   * ve ardından `to` üzerinde `ERC1363Receiver::onTransferReceived` fonksiyonunu çağırır.
   * @param from Jetonların gönderileceği adres.
   * @param to Jetonların transfer edildiği adres.
   * @param value Transfer edilecek jeton miktarı.
   * @param data Belirtilen bir formatı olmayan, `to` adresine yapılan çağrıda gönderilen ek veriler.
   * @return Bir hata oluşmadığı sürece işlemin başarılı olduğunu gösteren bir boole değeri.
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Çağıranın jetonları üzerinde `spender` için `value` miktarında jetonu ödenek olarak ayarlar
   * ve ardından `spender` üzerinde `ERC1363Spender::onApprovalReceived` fonksiyonunu çağırır.
   * @param spender Fonları harcayacak adres.
   * @param value Harcanacak jeton miktarı.
   * @return Bir hata oluşmadığı sürece işlemin başarılı olduğunu gösteren bir boole değeri.
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev Çağıranın jetonları üzerinde `spender` için `value` miktarında jetonu ödenek olarak ayarlar
   * ve ardından `spender` üzerinde `ERC1363Spender::onApprovalReceived` fonksiyonunu çağırır.
   * @param spender Fonları harcayacak adres.
   * @param value Harcanacak jeton miktarı.
   * @param data Belirtilen bir formatı olmayan, `spender` adresine yapılan çağrıda gönderilen ek veriler.
   * @return Bir hata oluşmadığı sürece işlemin başarılı olduğunu gösteren bir boole değeri.
   */
  function approveAndCall(address spender, uint256 value, bytes calldata data) external returns (bool);
}

interface ERC20 {
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
  function transfer(address to, uint256 value) external returns (bool);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  function approve(address spender, uint256 value) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address account) external view returns (uint256);
  function allowance(address owner, address spender) external view returns (uint256);
}

interface ERC165 {
  function supportsInterface(bytes4 interfaceId) external view returns (bool);
}
```

`transferAndCall` veya `transferFromAndCall` aracılığıyla ERC-1363 jetonlarını kabul etmek isteyen bir akıllı sözleşme, `ERC1363Receiver` arayüzünü **MUTLAKA** uygulamalıdır:

```solidity
/**
 * @başlık ERC1363Receiver
 * @dev ERC-1363 jeton sözleşmelerinden `transferAndCall` veya `transferFromAndCall` desteklemek isteyen herhangi bir sözleşme için arayüz.
 */
interface ERC1363Receiver {
  /**
   * @dev ERC-1363 jetonları bu sözleşmeye `ERC1363::transferAndCall` veya `ERC1363::transferFromAndCall` aracılığıyla
   * `operator` tarafından `from` adresinden transfer edildiğinde bu fonksiyon çağrılır.
   *
   * NOT: Transferi kabul etmek için bu,
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (yani 0x88a7ca5c veya kendi fonksiyon seçicisi) döndürmelidir.
   *
   * @param operator `transferAndCall` veya `transferFromAndCall` fonksiyonunu çağıran adres.
   * @param from Jetonların transfer edildiği adres.
   * @param value Transfer edilen jeton miktarı.
   * @param data Belirtilen bir formatı olmayan ek veriler.
   * @return Bir hata oluşmadığı sürece transfere izin verilirse `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` döndürür.
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

`approveAndCall` aracılığıyla ERC-1363 jetonlarını kabul etmek isteyen bir akıllı sözleşme, `ERC1363Spender` arayüzünü **MUTLAKA** uygulamalıdır:

```solidity
/**
 * @başlık ERC1363Spender
 * @dev ERC-1363 jeton sözleşmelerinden `approveAndCall` desteklemek isteyen herhangi bir sözleşme için arayüz.
 */
interface ERC1363Spender {
  /**
   * @dev Bir ERC-1363 jeton `sahibi` bu sözleşmeyi `ERC1363::approveAndCall` aracılığıyla
   * jetonlarını harcamak için onayladığında bu fonksiyon çağrılır.
   *
   * NOT: Onayı kabul etmek için bu,
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (yani 0x7b04a2d0 veya kendi fonksiyon seçicisi) döndürmelidir.
   *
   * @param owner `approveAndCall` fonksiyonunu çağıran ve daha önce jetonlara sahip olan adres.
   * @param value Harcanacak jeton miktarı.
   * @param data Belirtilen bir formatı olmayan ek veriler.
   * @return Bir hata oluşmadığı sürece onaya izin verilirse `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` döndürür.
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## Daha fazla kaynak {#further-reading}

- [ERC-1363: Ödenebilir Jeton Standardı](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: GitHub Deposu](https://github.com/vittominacori/erc1363-payable-token)
