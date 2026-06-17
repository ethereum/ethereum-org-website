---
title: "ERC-1363 Ödenebilir Token Standardı"
description: "ERC-1363, transferlerden sonra bir alıcı sözleşmesinde veya onaylardan sonra bir harcayıcı sözleşmesinde özel mantık yürütmeyi tek bir işlem içinde destekleyen ERC-20 token'ları için bir uzantı arayüzüdür."
lang: tr
---

## Giriş {#introduction}

### ERC-1363 nedir? {#what-is-erc1363}

ERC-1363, transferlerden sonra bir alıcı sözleşmesinde veya onaylardan sonra bir harcayıcı sözleşmesinde özel mantık yürütmeyi tek bir işlem içinde destekleyen ERC-20 token'ları için bir uzantı arayüzüdür.

### ERC-20'den Farkları {#erc20-differences}

Standart ERC-20 işlemleri olan `transfer`, `transferFrom` ve `approve`, ayrı bir işlem olmadan alıcı veya harcayıcı sözleşmesinde kod yürütülmesine izin vermez.
Bu durum, kullanıcıların ilk işlemin yürütülmesini beklemesi ve ardından ikinci işlemi göndermesi gerektiğinden, kullanıcı arayüzü (UI) geliştirmede karmaşıklığa ve benimsemede zorluğa neden olur.
Ayrıca iki kez Gaz ödemeleri gerekir.

ERC-1363, misli (fungible) token'ların eylemleri daha kolay gerçekleştirmesini ve herhangi bir zincir dışı dinleyici kullanmadan çalışmasını sağlar.
Bir transfer veya onaydan sonra, tek bir işlemde alıcı veya harcayıcı sözleşmesinde bir geri çağırma (callback) yapılmasına olanak tanır.

## Ön Koşullar {#prerequisites}

Bu sayfayı daha iyi anlamak için öncelikle şunları okumanızı öneririz:

- [Token standartları](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Gövde {#body}

ERC-1363, ERC-20 token'larının `transfer`, `transferFrom` veya `approve` sonrasında akıllı sözleşmelerle etkileşime girmesi için standart bir API sunar.

Bu standart, token'ları transfer etmek için temel işlevsellik sağlamanın yanı sıra, token'ların zincir içi başka bir üçüncü tarafça harcanabilmesi için onaylanmasına ve ardından alıcı veya harcayıcı sözleşmesinde bir geri çağırma yapılmasına olanak tanır.

ERC-20 geri çağırmalarını kabul edebilen akıllı sözleşmelerin önerilen birçok kullanım alanı vardır.

Örnekler şunlar olabilir:

- **Kitle Satışları (Crowdsales)**: gönderilen token'lar anında ödül tahsisini tetikler.
- **Hizmetler**: ödeme, hizmet erişimini tek adımda etkinleştirir.
- **Faturalar**: token'lar faturaları otomatik olarak öder.
- **Abonelikler**: yıllık ücretin onaylanması, ilk ayın ödemesiyle birlikte aboneliği etkinleştirir.

Bu nedenlerden dolayı başlangıçta **"Ödenebilir Token (Payable Token)"** olarak adlandırılmıştır.

Geri çağırma davranışı, kullanım alanını daha da genişleterek aşağıdaki gibi sorunsuz etkileşimlere olanak tanır:

- **Staking**: transfer edilen token'lar, bir staking sözleşmesinde otomatik kilitlemeyi tetikler.
- **Oylama**: alınan token'lar, bir yönetişim sisteminde oyları kaydeder.
- **Takas**: token onayları, takas mantığını tek bir adımda etkinleştirir.

ERC-1363 token'ları, bir transfer veya onay alındıktan sonra bir geri çağırmanın yürütülmesini gerektiren tüm durumlarda belirli faydalar için kullanılabilir.
ERC-1363, alıcının token'ları işleme yeteneğini doğrulayarak akıllı sözleşmelerde token kaybını veya token kilitlenmesini önlemek için de yararlıdır.

Diğer ERC-20 uzantı tekliflerinin aksine ERC-1363, ERC-20'nin `transfer` ve `transferFrom` yöntemlerini geçersiz kılmaz ve ERC-20 ile geriye dönük uyumluluğu koruyarak uygulanacak arayüz kimliklerini (ID) tanımlar.

[EIP-1363](https://eips.ethereum.org/EIPS/eip-1363)'ten:

### Yöntemler {#methods}

ERC-1363 standardını uygulayan akıllı sözleşmeler, `ERC1363` arayüzündeki tüm işlevlerin yanı sıra `ERC20` ve `ERC165` arayüzlerini de uygulamak **ZORUNDADIR**.

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev `transfer` veya `transferFrom` sonrasında bir alıcı Sözleşme üzerinde veya `approve` sonrasında bir harcayıcı Sözleşme üzerinde tek bir işlem içinde kod yürütmeyi destekleyen ERC-20 Token'ları için bir uzantı arayüzü.
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
   * @dev Çağırıcının hesabından `to` adresine `value` miktarında Token taşır
   * ve ardından `to` üzerinde `ERC1363Receiver::onTransferReceived` çağırır.
   * @param to Token'ların transfer edildiği adres.
   * @param value transfer edilecek Token miktarı.
   * @return Hata fırlatılmadığı sürece işlemin başarılı olduğunu belirten bir boolean değer.
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev Çağırıcının hesabından `to` adresine `value` miktarında Token taşır
   * ve ardından `to` üzerinde `ERC1363Receiver::onTransferReceived` çağırır.
   * @param to Token'ların transfer edildiği adres.
   * @param value transfer edilecek Token miktarı.
   * @param data Belirli bir formatı olmayan, `to` çağrısında gönderilen ek veri.
   * @return Hata fırlatılmadığı sürece işlemin başarılı olduğunu belirten bir boolean değer.
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev İzin (allowance) mekanizmasını kullanarak `from` adresinden `to` adresine `value` miktarında Token taşır
   * ve ardından `to` üzerinde `ERC1363Receiver::onTransferReceived` çağırır.
   * @param from Token'ların gönderileceği adres.
   * @param to Token'ların transfer edildiği adres.
   * @param value transfer edilecek Token miktarı.
   * @return Hata fırlatılmadığı sürece işlemin başarılı olduğunu belirten bir boolean değer.
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev İzin (allowance) mekanizmasını kullanarak `from` adresinden `to` adresine `value` miktarında Token taşır
   * ve ardından `to` üzerinde `ERC1363Receiver::onTransferReceived` çağırır.
   * @param from Token'ların gönderileceği adres.
   * @param to Token'ların transfer edildiği adres.
   * @param value transfer edilecek Token miktarı.
   * @param data Belirli bir formatı olmayan, `to` çağrısında gönderilen ek veri.
   * @return Hata fırlatılmadığı sürece işlemin başarılı olduğunu belirten bir boolean değer.
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Çağırıcının Token'ları üzerinde `spender` için izin (allowance) olarak `value` miktarında Token ayarlar
   * ve ardından `spender` üzerinde `ERC1363Spender::onApprovalReceived` çağırır.
   * @param spender Fonları harcayacak adres.
   * @param value Harcanacak Token miktarı.
   * @return Hata fırlatılmadığı sürece işlemin başarılı olduğunu belirten bir boolean değer.
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev Çağırıcının Token'ları üzerinde `spender` için izin (allowance) olarak `value` miktarında Token ayarlar
   * ve ardından `spender` üzerinde `ERC1363Spender::onApprovalReceived` çağırır.
   * @param spender Fonları harcayacak adres.
   * @param value Harcanacak Token miktarı.
   * @param data Belirli bir formatı olmayan, `spender` çağrısında gönderilen ek veri.
   * @return Hata fırlatılmadığı sürece işlemin başarılı olduğunu belirten bir boolean değer.
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

`transferAndCall` veya `transferFromAndCall` aracılığıyla ERC-1363 token'larını kabul etmek isteyen bir akıllı sözleşme, `ERC1363Receiver` arayüzünü uygulamak **ZORUNDADIR**:

```solidity
/**
 * @title ERC1363Receiver
 * @dev ERC-1363 Token Sözleşmelerinden `transferAndCall` veya `transferFromAndCall` desteklemek isteyen herhangi bir Sözleşme için arayüz.
 */
interface ERC1363Receiver {
  /**
   * @dev ERC-1363 Token'ları bu Sözleşmeye `operator` tarafından `from` adresinden `ERC1363::transferAndCall` veya `ERC1363::transferFromAndCall` aracılığıyla transfer edildiğinde bu fonksiyon çağrılır.
   *
   * NOT: transfer işlemini kabul etmek için bu fonksiyonun
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (yani 0x88a7ca5c veya kendi fonksiyon seçicisi) döndürmesi gerekir.
   *
   * @param operator `transferAndCall` veya `transferFromAndCall` fonksiyonunu çağıran adres.
   * @param from Token'ların transfer edildiği kaynak adres.
   * @param value transfer edilen Token miktarı.
   * @param data Belirli bir formatı olmayan ek veri.
   * @return Hata fırlatılmadığı sürece transfer işlemine izin veriliyorsa `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`.
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

`approveAndCall` aracılığıyla ERC-1363 token'larını kabul etmek isteyen bir akıllı sözleşme, `ERC1363Spender` arayüzünü uygulamak **ZORUNDADIR**:

```solidity
/**
 * @title ERC1363Spender
 * @dev ERC-1363 Token Sözleşmelerinden `approveAndCall` desteklemek isteyen herhangi bir Sözleşme için arayüz.
 */
interface ERC1363Spender {
  /**
   * @dev Bir ERC-1363 Token `owner`ı, Token'larını harcaması için bu Sözleşmeye `ERC1363::approveAndCall` aracılığıyla onay verdiğinde bu fonksiyon çağrılır.
   *
   * NOT: Onayı kabul etmek için bu fonksiyonun
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (yani 0x7b04a2d0 veya kendi fonksiyon seçicisi) döndürmesi gerekir.
   *
   * @param owner `approveAndCall` fonksiyonunu çağıran ve daha önce Token'lara sahip olan adres.
   * @param value Harcanacak Token miktarı.
   * @param data Belirli bir formatı olmayan ek veri.
   * @return Hata fırlatılmadığı sürece onaya izin veriliyorsa `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`.
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## Daha fazla bilgi {#further-reading}

- [ERC-1363: Ödenebilir Token Standardı](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: GitHub Deposu](https://github.com/vittominacori/erc1363-payable-token)