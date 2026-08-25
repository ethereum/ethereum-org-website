---
title: "Vyper ERC-721 Sözleşmesi İncelemesi"
description: "Ryuya Nakamura'nın ERC-721 sözleşmesi ve nasıl çalıştığı"
author: Ori Pomerantz
lang: tr
tags: ["Vyper", "erc-721", "Python"]
skill: beginner
breadcrumb: "Vyper ERC-721"
published: 2021-04-01
---

## Giriş {#introduction}

[ERC-721](/developers/docs/standards/tokens/erc-721/) standardı, Değiştirilemez Token'ların (NFT) sahipliğini tutmak için kullanılır.
[ERC-20](/developers/docs/standards/tokens/erc-20/) token'ları bir emtia gibi davranır, çünkü bireysel token'lar arasında hiçbir fark yoktur.
Buna karşılık, ERC-721 token'ları, farklı [kedi karikatürleri](https://www.cryptokitties.co/) veya farklı gayrimenkul tapuları gibi benzer ancak aynı olmayan varlıklar için tasarlanmıştır.

Bu makalede [Ryuya Nakamura'nın ERC-721 sözleşmesini](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) inceleyeceğiz.
Bu sözleşme, güvensiz kod yazmayı Solidity'ye kıyasla daha zor hale getirmek için tasarlanmış Python benzeri bir sözleşme dili olan [Vyper](https://vyper.readthedocs.io/en/latest/index.html) ile yazılmıştır.

## Sözleşme {#contract}

```python
# @dev ERC-721 değiştirilemez Token standardının uygulaması.
# @author Ryuya Nakamura (@nrryuya)
# Şuradan değiştirildi: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Vyper'daki yorumlar, Python'da olduğu gibi bir hash (`ethereum.ercs`) ile başlar ve satır sonuna kadar devam eder. `@<keyword>` içeren yorumlar, insanlar tarafından okunabilir belgeler üretmek için [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) tarafından kullanılır.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

ERC-721 arayüzü Vyper diline yerleşiktir.
[Kod tanımını buradan görebilirsiniz](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py).
Arayüz tanımı Vyper yerine Python ile yazılmıştır, çünkü arayüzler yalnızca blokzincir içinde değil, aynı zamanda blokzincire Python ile yazılmış olabilecek harici bir istemciden bir işlem gönderilirken de kullanılır.

İlk satır arayüzü içe aktarır ve ikinci satır onu burada uyguladığımızı belirtir.

```python
#pragma version >0.3.10
```

```python
#pragma version >0.3.10
```
### ERC721Receiver Arayüzü

```python
# safeTransferFrom() tarafından çağrılan Sözleşme için arayüz
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 iki tür transferi destekler:

- `transferFrom`, göndericinin herhangi bir hedef Adres belirlemesine olanak tanır ve transfer sorumluluğunu göndericiye yükler. Bu, geçersiz bir adrese transfer yapabileceğiniz anlamına gelir; bu durumda NFT tamamen kaybolur.
- `safeTransferFrom`, hedef adresin bir Sözleşme olup olmadığını kontrol eder. Eğer öyleyse, ERC-721 sözleşmesi alıcı sözleşmeye NFT'yi almak isteyip istemediğini sorar.

`safeTransferFrom` isteklerine yanıt vermek için alıcı bir sözleşmenin `ERC721Receiver` arayüzünü uygulaması gerekir.

```python
            _operator: address,
            _from: address,
```

`_from` adresi, Token'ın mevcut sahibidir. `_operator` adresi ise transferi talep eden adrestir (harcama izinleri nedeniyle bu ikisi aynı olmayabilir). Geleneksel olarak, bu sözleşmedeki çoğu fonksiyon parametresi bir alt çizgi (`_`) ile başlar.

```python
            _tokenId: uint256,
```

ERC-721 Token kimlikleri (ID) 256 bittir. Genellikle Token'ın temsil ettiği şeyin bir açıklamasının hashlenmesiyle oluşturulurlar.

```python
            _data: Bytes[1024]
```

İstek, 1024 bayta kadar kullanıcı verisi içerebilir.

```python
        ) -> bytes4: nonpayable
```

Bir sözleşmenin yanlışlıkla bir transferi kabul etmesini önlemek için dönüş değeri bir boolean değil, belirli bir dört baytlık değerdir: `onERC721Received` fonksiyon seçicisi. Fonksiyon `nonpayable` olarak işaretlenmiştir çünkü alıcı bir Sözleşme bir Token'ı kabul ettiğinde kendi durumunu değiştirebilir.
### Olaylar

[Olaylar](/developers/docs/smart-contracts/anatomy/#events-and-logs), Blokzincir dışındaki kullanıcıları ve sunucuları olaylar hakkında bilgilendirmek için yayınlanır. Olayların içeriğinin Blokzincir üzerindeki sözleşmeler tarafından erişilebilir olmadığını unutmayın. Üç ERC-721 olayı, içe aktardığımız `IERC721` arayüzü tarafından tanımlanır, bu nedenle bu Sözleşme bunları kendisi bildirmez; aşağıdaki transfer fonksiyonlarında göreceğimiz gibi bunları `log IERC721.<Event>(...)` ile yayınlar.

`Transfer` (`sender`, `receiver`, `token_id`), bir NFT'nin sahipliğindeki bir değişikliği bildirir. Bu, bir miktar yerine bir `token_id` bildirmemiz dışında ERC-20 Transfer olayına benzer. Hiç kimse sıfır adresine sahip değildir, bu nedenle geleneksel olarak Token'ların oluşturulmasını ve yok edilmesini bildirmek için onu kullanırız. Bunun tek istisnası, herhangi bir sayıda NFT'nin oluşturulup `Transfer` yayınlanmadan atanabildiği Sözleşme oluşturma sürecidir.

Bir ERC-721 onayı, bir ERC-20 harcama iznine benzer: belirli bir adresin belirli bir Token'ı transfer etmesine izin verilir ve bu onaylanmış Adres ayarlandığında veya yeniden onaylandığında `Approval` (`owner`, `approved`, `token_id`) yayınlanır. Bu, sözleşmelerin bir Token'ı kabul ettiklerinde yanıt vermeleri için bir mekanizma sağlar. Sözleşmeler olayları dinleyemez, bu nedenle Token'ı onlara sadece transfer ederseniz bundan "haberleri" olmaz. Bu şekilde sahip önce bir onay gönderir ve ardından sözleşmeye bir istek gönderir: "X Token'ını transfer etmenizi onayladım, lütfen ... yapın". Bu, ERC-721 standardını ERC-20 standardına benzer hale getirmek için bir tasarım seçimidir. ERC-721 Token'ları değiştirilemez olduğundan, bir Sözleşme Token'ın sahipliğine bakarak belirli bir Token'ı aldığını da belirleyebilir.

Son olarak, bir sahip için bir _operatör_ etkinleştirildiğinde veya devre dışı bırakıldığında `ApprovalForAll` (`owner`, `operator`, `approved`) yayınlanır. Bazen, bir vekaletnameye benzer şekilde, bir Hesabın belirli bir türdeki (belirli bir Sözleşme tarafından yönetilen) tüm Token'larını yönetebilen bir operatöre sahip olmak yararlıdır. Örneğin, altı ay boyunca onunla iletişime geçip geçmediğimi kontrol eden ve eğer geçmediysem varlıklarımı mirasçılarıma dağıtan bir sözleşmeye böyle bir yetki vermek isteyebilirim (eğer onlardan biri bunu isterse, sözleşmeler bir işlem tarafından çağrılmadan hiçbir şey yapamaz). ERC-20'de bir miras sözleşmesine yüksek bir harcama izni verebiliriz, ancak bu ERC-721 için işe yaramaz çünkü Token'lar değiştirilemez. Bu onun eşdeğeridir. `approved` değeri, olayın bir onay için mi yoksa bir onayın geri alınması için mi olduğunu bize söyler.
### Durum Değişkenleri

Bu değişkenler Token'ların mevcut durumunu içerir: hangilerinin mevcut olduğu ve kime ait oldukları. Bunların çoğu, [iki tür arasında var olan tek yönlü eşlemeler](https://vyper.readthedocs.io/en/latest/types.html#mappings) olan `HashMap` nesneleridir.

```python
# @dev NFT kimliğinden ona sahip olan adrese eşleme.
idToOwner: HashMap[uint256, address]

# @dev NFT kimliğinden onaylanmış adrese eşleme.
idToApprovals: HashMap[uint256, address]
```

Ethereum'daki kullanıcı ve Sözleşme kimlikleri 160 bitlik adreslerle temsil edilir. Bu iki değişken, Token kimliklerinden sahiplerine ve onları transfer etmesi onaylananlara (her biri için en fazla bir tane) eşleme yapar. Ethereum'da, başlatılmamış veriler her zaman sıfırdır, bu nedenle bir sahip veya onaylanmış transfer eden yoksa o Token için değer sıfırdır.

```python
# @dev Sahip adresinden Token sayısına eşleme.
ownerToNFTokenCount: HashMap[address, uint256]
```

Bu değişken, her sahip için Token sayısını tutar. Sahiplerden Token'lara bir eşleme yoktur, bu nedenle belirli bir sahibin sahip olduğu Token'ları belirlemenin tek yolu Blokzincirin olay geçmişine bakmak ve uygun `Transfer` olaylarını görmektir. Tüm NFT'lere ne zaman sahip olduğumuzu ve zamanda daha geriye bakmamıza gerek olmadığını bilmek için bu değişkeni kullanabiliriz.

Bu algoritmanın yalnızca kullanıcı arayüzleri ve harici sunucular için çalıştığını unutmayın. Blokzincirin kendisinde çalışan kod geçmiş olayları okuyamaz.

```python
# @dev Sahip adresinden operatör adreslerinin eşlemesine eşleme.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Bir Hesabın birden fazla operatörü olabilir. Basit bir `HashMap` onları takip etmek için yetersizdir, çünkü her anahtar tek bir değere yönlendirir. Bunun yerine, değer olarak `HashMap[address, bool]` kullanabilirsiniz. Varsayılan olarak her Adres için değer `False`'tur, bu da onun bir operatör olmadığı anlamına gelir. Gerektiğinde değerleri `True` olarak ayarlayabilirsiniz.

```python
# @dev Bir Token basabilen basıcının adresi
minter: address
```

Yeni Token'ların bir şekilde oluşturulması gerekir. Bu sözleşmede bunu yapmasına izin verilen tek bir varlık vardır: `minter` (basıcı). Bu, örneğin bir oyun için muhtemelen yeterli olacaktır. Diğer amaçlar için daha karmaşık bir iş mantığı oluşturmak gerekebilir.

```python
# @dev Desteklenen ERC165 arayüz kimliklerinin statik listesi
SUPPORTED_INTERFACES: constant(bytes4[2]) = [
    # ERC165'in ERC165 arayüz kimliği
    0x01ffc9a7,
    # ERC721'in ERC165 arayüz kimliği
    0x80ac58cd,
]
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165), bir sözleşmenin uygulamaların onunla nasıl iletişim kurabileceğini, hangi ERC'lere uyduğunu açıklaması için bir mekanizma belirtir. `SUPPORTED_INTERFACES`, bu sözleşmenin uyduğu iki dört baytlık arayüz kimliğinin sabit bir listesidir: ERC-165'in kendisi ve ERC-721.
### Fonksiyonlar {#functions}

Bunlar, ERC-721'i fiilen uygulayan fonksiyonlardır.

#### Kurucu

```python
@deploy
def __init__():
```

Vyper'da, Python'da olduğu gibi, kurucu fonksiyon `__init__` olarak adlandırılır. `@deploy` dekorasyonu ile işaretlenmiştir, bu da Sözleşme dağıtıldığında bir kez çalıştığı anlamına gelir.

```python
    """
    @dev Sözleşme kurucusu.
    """
```

Python'da ve Vyper'da, çok satırlı bir dize ( `"""` ile başlayıp biten) belirterek ve bunu hiçbir şekilde kullanmayarak da bir yorum oluşturabilirsiniz. Bu yorumlar [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) de içerebilir.

```python
    self.minter = msg.sender
```

Durum değişkenlerine erişmek için `self.<variable name>` kullanırsınız (yine Python'daki gibi). Kurucu, sözleşmeyi dağıtan Hesabı `minter` olarak kaydeder.
#### Görünüm Fonksiyonları

Bunlar, Blokzincirin durumunu değiştirmeyen ve bu nedenle harici olarak çağrıldıklarında ücretsiz olarak yürütülebilen fonksiyonlardır. Görünüm fonksiyonları bir Sözleşme tarafından çağrılırsa, yine de her Düğüm üzerinde yürütülmeleri gerekir ve bu nedenle Gaz maliyeti oluştururlar.

```python
@view
@external
```

Bir fonksiyon tanımından önce gelen ve at işareti (`@`) ile başlayan bu anahtar kelimelere _dekorasyonlar_ denir. Bir fonksiyonun hangi koşullarda çağrılabileceğini belirtirler.

- `@view`, bu fonksiyonun bir görünüm olduğunu belirtir.
- `@external`, bu belirli fonksiyonun işlemler ve diğer sözleşmeler tarafından çağrılabileceğini belirtir.

```python
def supportsInterface(interface_id: bytes4) -> bool:
```

Python'un aksine, Vyper [statik tipli bir dildir](https://wikipedia.org/wiki/Type_system#Static_type_checking). [Veri türünü](https://vyper.readthedocs.io/en/latest/types.html) tanımlamadan bir değişken veya bir fonksiyon parametresi bildiremezsiniz. Bu durumda girdi parametresi dört baytlık bir değer olan `bytes4`'tür ve çıktı bir boolean değeridir.

```python
    """
    @dev Arayüz tanımlaması ERC-165'te belirtilmiştir.
    @param interface_id Arayüzün kimliği
    """
    return interface_id in SUPPORTED_INTERFACES
```

`interface_id`, `SUPPORTED_INTERFACES` listesindeki arayüz kimliklerinden biriyse `True` döndürür.

```python
### GÖRÜNÜM FONKSİYONLARI ###
```

Bunlar, Token'lar hakkındaki bilgileri kullanıcılara ve diğer sözleşmelere sunan görünüm fonksiyonlarıdır.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev `_owner` tarafından sahip olunan NFT sayısını döndürür.
         `_owner` sıfır adresi ise hata fırlatır. Sıfır adresine atanan NFT'ler geçersiz kabul edilir.
    @param _owner Bakiyesi sorgulanacak Adres.
    """
    assert _owner != empty(address)
```

Bu satır, `_owner`'ın `empty(address)` olarak yazılan sıfır adresi olmadığını [doğrular](https://vyper.readthedocs.io/en/latest/statements.html#assert). Eğer öyleyse, bir hata oluşur ve işlem geri alınır.

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev NFT sahibinin adresini döndürür.
         `_tokenId` geçerli bir NFT değilse hata fırlatır.
    @param _tokenId Bir NFT için tanımlayıcı.
    """
    owner: address = self.idToOwner[_tokenId]
    # `_tokenId` geçerli bir NFT değilse hata fırlatır
    assert owner != empty(address)
    return owner
```

Ethereum Sanal Makinesi'nde (EVM), içinde bir değer saklanmayan herhangi bir depolama alanı sıfırdır. `_tokenId`'de bir Token yoksa, `self.idToOwner[_tokenId]` değeri sıfırdır. Bu durumda fonksiyon geri alınır.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Tek bir NFT için onaylanmış adresi alır.
         `_tokenId` geçerli bir NFT değilse hata fırlatır.
    @param _tokenId Onayı sorgulanacak NFT'nin kimliği.
    """
    # `_tokenId` geçerli bir NFT değilse hata fırlatır
    assert self.idToOwner[_tokenId] != empty(address)
    return self.idToApprovals[_tokenId]
```

`getApproved`'un sıfır döndürebileceğini unutmayın. Token geçerliyse `self.idToApprovals[_tokenId]` döndürür. Bir onaylayan yoksa bu değer sıfırdır.

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev `_operator`'ün `_owner` için onaylanmış bir operatör olup olmadığını kontrol eder.
    @param _owner NFT'lere sahip olan Adres.
    @param _operator Sahip adına hareket eden Adres.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

Bu fonksiyon, `_operator`'ün bu sözleşmedeki `_owner`'ın tüm Token'larını yönetmesine izin verilip verilmediğini kontrol eder. Birden fazla operatör olabileceğinden, bu iki seviyeli bir HashMap'tir.
#### Transfer Yardımcı Fonksiyonları

Bu fonksiyonlar, Token'ları transfer etmenin veya yönetmenin bir parçası olan işlemleri uygular.

```python

### TRANSFER FONKSİYONU YARDIMCILARI ###

@view
@internal
```

Bu dekorasyon, `@internal`, fonksiyonun yalnızca aynı Sözleşme içindeki diğer fonksiyonlardan erişilebilir olduğu anlamına gelir. Geleneksel olarak, bu fonksiyon adları da bir alt çizgi (`_`) ile başlar.

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev Verilen harcayıcının belirli bir Token kimliğini transfer edip edemeyeceğini döndürür
    @param spender sorgulanacak harcayıcının adresi
    @param tokenId transfer edilecek Token'ın uint256 kimliği
    @return bool msg.sender'ın verilen Token kimliği için onaylanıp onaylanmadığı,
        sahibin bir operatörü olup olmadığı veya Token'ın sahibi olup olmadığı
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

Bir adresin bir Token'ı transfer etmesine izin verilmesinin üç yolu vardır:

1. Adres, Token'ın sahibidir
2. Adresin o Token'ı harcaması onaylanmıştır
3. Adres, Token sahibinin bir operatörüdür

Yukarıdaki fonksiyon durumu değiştirmediği için bir görünüm olabilir. İşletme maliyetlerini azaltmak için, bir görünüm _olabilen_ herhangi bir fonksiyon bir görünüm _olmalıdır_.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Belirli bir adrese bir NFT ekler
         `_tokenId` birine aitse hata fırlatır.
    """
    # `_tokenId` birine aitse hata fırlatır
    assert self.idToOwner[_tokenId] == empty(address)
    # Sahibi değiştir
    self.idToOwner[_tokenId] = _to
    # Sayım takibini değiştir
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Belirli bir adresten bir NFT'yi kaldırır
         `_from` mevcut sahip değilse hata fırlatır.
    """
    # `_from` mevcut sahip değilse hata fırlatır
    assert self.idToOwner[_tokenId] == _from
    # Sahibi değiştir
    self.idToOwner[_tokenId] = empty(address)
    # Sayım takibini değiştir
    self.ownerToNFTokenCount[_from] -= 1
```

Bir transferle ilgili bir sorun olduğunda çağrıyı geri alırız.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Belirli bir adresin onayını temizler
         `_owner` mevcut sahip değilse hata fırlatır.
    """
    # `_owner` mevcut sahip değilse hata fırlatır
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != empty(address):
        # Onayları sıfırla
        self.idToApprovals[_tokenId] = empty(address)
```

Değeri yalnızca gerekliyse değiştirin. Durum değişkenleri depolamada yaşar. Depolamaya yazmak, EVM'nin (Ethereum Sanal Makinesi) yaptığı en pahalı işlemlerden biridir ([Gaz](/developers/docs/gas/) açısından). Bu nedenle, bunu en aza indirmek iyi bir fikirdir, mevcut değeri yazmanın bile yüksek bir maliyeti vardır.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Bir NFT'nin transferini gerçekleştirir.
         `msg.sender` mevcut sahip, yetkili bir operatör veya bu NFT için onaylanmış
         Adres değilse hata fırlatır. (NOT: `msg.sender` özel fonksiyonda kullanılamaz, bu yüzden `_sender`'ı geçin.)
         `_to` sıfır adresi ise hata fırlatır.
         `_from` mevcut sahip değilse hata fırlatır.
         `_tokenId` geçerli bir NFT değilse hata fırlatır.
    """
```

Bu dahili fonksiyona sahibiz çünkü Token'ları transfer etmenin iki yolu vardır (normal ve güvenli), ancak denetimi kolaylaştırmak için kodda bunu yaptığımız tek bir yer olmasını istiyoruz.

```python
    # Gereksinimleri kontrol et
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # `_to` sıfır adresi ise hata fırlatır
    assert _to != empty(address)
    # Onayı temizle. `_from` mevcut sahip değilse hata fırlatır
    self._clearApproval(_from, _tokenId)
    # NFT'yi kaldır. `_tokenId` geçerli bir NFT değilse hata fırlatır
    self._removeTokenFrom(_from, _tokenId)
    # NFT ekle
    self._addTokenTo(_to, _tokenId)
    # Transferi günlüğe kaydet
    log IERC721.Transfer(sender=_from, receiver=_to, token_id=_tokenId)
```

Vyper'da bir olay yayınlamak için bir `log` ifadesi kullanırsınız ([daha fazla ayrıntı için buraya bakın](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)). Olaylar içe aktarılan arayüze ait olduğundan, onlara `IERC721.Transfer` olarak atıfta bulunuruz ve alanlarını anahtar kelimeyle geçiririz.
#### Transfer Fonksiyonları

```python

### TRANSFER FONKSİYONLARI ###

@external
@payable
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev `msg.sender` mevcut sahip, yetkili bir operatör veya bu NFT için onaylanmış
         Adres değilse hata fırlatır.
         `_from` mevcut sahip değilse hata fırlatır.
         `_to` sıfır adresi ise hata fırlatır.
         `_tokenId` geçerli bir NFT değilse hata fırlatır.
    @notice Çağıran, `_to`'nun NFT'leri alabileceğinden emin olmakla sorumludur, aksi takdirde
            kalıcı olarak kaybolabilirler.
    @param _from NFT'nin mevcut sahibi.
    @param _to Yeni sahip.
    @param _tokenId Transfer edilecek NFT.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Bu fonksiyon, rastgele bir adrese transfer yapmanızı sağlar. Adres bir kullanıcı veya Token'ları nasıl transfer edeceğini bilen bir Sözleşme olmadığı sürece, transfer ettiğiniz herhangi bir Token o adreste sıkışıp kalacak ve işe yaramaz hale gelecektir.

`@payable` dekorasyonu buradadır çünkü `IERC721` arayüzü `transferFrom`, `safeTransferFrom` ve `approve`'u ödenebilir (payable) olarak bildirir, bu nedenle arayüzü uygulayan bir sözleşmenin bu imzalarla eşleşmesi gerekir.

```python
@external
@payable
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev Bir NFT'nin sahipliğini bir adresten başka bir adrese transfer eder.
         `msg.sender` mevcut sahip, yetkili bir operatör veya bu NFT için
         onaylanmış Adres değilse hata fırlatır.
         `_from` mevcut sahip değilse hata fırlatır.
         `_to` sıfır adresi ise hata fırlatır.
         `_tokenId` geçerli bir NFT değilse hata fırlatır.
         `_to` bir akıllı Sözleşme ise, `_to` üzerinde `onERC721Received` çağırır ve
         dönüş değeri `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))` değilse hata fırlatır.
    @param _from NFT'nin mevcut sahibi.
    @param _to Yeni sahip.
    @param _tokenId Transfer edilecek NFT.
    @param _data Belirli bir formatı olmayan, `_to` çağrısında gönderilen ek veri.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Önce transferi yapmak sorun değildir çünkü bir sorun olursa zaten geri alacağız, bu nedenle çağrıda yapılan her şey iptal edilecektir.

```python
    if _to.is_contract: # `_to`'nun bir Sözleşme adresi olup olmadığını kontrol et
```

Önce adresin bir Sözleşme olup olmadığını (kod içerip içermediğini) kontrol edin. Değilse, bunun bir kullanıcı adresi olduğunu ve kullanıcının Token'ı kullanabileceğini veya transfer edebileceğini varsayın. Ancak bunun sizi sahte bir güvenlik hissine kaptırmasına izin vermeyin. Token'ları, hiç kimsenin özel anahtarını bilmediği bir adrese transfer ederseniz, `safeTransferFrom` ile bile kaybedebilirsiniz.

```python
        returnValue: bytes4 = extcall ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

ERC-721 Token'larını alıp alamayacağını görmek için hedef sözleşmeyi çağırın. Vyper 0.4, diğer sözleşmelere yapılan çağrıların işaretlenmesini gerektirir, bu nedenle çağrının önüne `extcall` eklenir.

```python
        # Transfer hedefi 'onERC721Received' uygulamayan bir Sözleşme ise hata fırlatır
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes4)
```

Hedef bir Sözleşme ise, ancak ERC-721 Token'larını kabul etmeyen (veya bu belirli transferi kabul etmemeye karar veren) bir sözleşmeyse, geri alın.

```python
@external
@payable
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Bir NFT için onaylanmış adresi ayarlar veya yeniden onaylar. Sıfır adresi, onaylanmış bir Adres olmadığını gösterir.
         `msg.sender` mevcut NFT sahibi veya mevcut sahibin yetkili bir operatörü değilse hata fırlatır.
         `_tokenId` geçerli bir NFT değilse hata fırlatır. (NOT: Bu EIP'de yazılı değildir)
         `_approved` mevcut sahipse hata fırlatır. (NOT: Bu EIP'de yazılı değildir)
    @param _approved Verilen NFT kimliği için onaylanacak Adres.
    @param _tokenId Onaylanacak Token'ın kimliği.
    """
    owner: address = self.idToOwner[_tokenId]
    # `_tokenId` geçerli bir NFT değilse hata fırlatır
    assert owner != empty(address)
    # `_approved` mevcut sahipse hata fırlatır
    assert _approved != owner
```

Geleneksel olarak, bir onaylayana sahip olmak istemiyorsanız, kendinizi değil sıfır adresini atarsınız.

```python
    # Gereksinimleri kontrol et
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

Bir onay ayarlamak için ya sahip olabilirsiniz ya da sahip tarafından yetkilendirilmiş bir operatör olabilirsiniz.

```python
    # Onayı ayarla
    self.idToApprovals[_tokenId] = _approved
    log IERC721.Approval(owner=owner, approved=_approved, token_id=_tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Üçüncü bir tarafın ("operatör") `msg.sender`'ın tüm varlıklarını yönetmesi için
         onayı etkinleştirir veya devre dışı bırakır. Ayrıca ApprovalForAll olayını yayınlar.
         `_operator`, `msg.sender` ise hata fırlatır. (NOT: Bu EIP'de yazılı değildir)
    @notice Bu, gönderici o sırada herhangi bir Token'a sahip olmasa bile çalışır.
    @param _operator Yetkili operatörler kümesine eklenecek Adres.
    @param _approved Operatörler onaylanmışsa True, onayı iptal etmek için false.
    """
    # `_operator`, `msg.sender` ise hata fırlatır
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log IERC721.ApprovalForAll(owner=msg.sender, operator=_operator, approved=_approved)
```
#### Yeni Token'lar Basmak ve Mevcut Olanları Yok Etmek {#mint-burn}

Sözleşmeyi oluşturan hesap, yeni NFT'ler basmaya yetkili süper kullanıcı olan `minter`'dır. Ancak, onun bile mevcut token'ları yakmasına izin verilmez. Bunu yalnızca sahip veya sahip tarafından yetkilendirilmiş bir varlık yapabilir.

```python
### BASMAK VE YAKIM FONKSİYONLARI ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

Bu fonksiyon her zaman `True` döndürür, çünkü işlem başarısız olursa geri alınır.

```python
    """
    @dev Token basmak için fonksiyon
         `msg.sender` basıcı değilse hata fırlatır.
         `_to` sıfır adresi ise hata fırlatır.
         `_tokenId` birine aitse hata fırlatır.
    @param _to Basılan Token'ları alacak Adres.
    @param _tokenId Basılacak Token kimliği.
    @return İşlemin başarılı olup olmadığını belirten bir bool.
    """
    # `msg.sender` basıcı değilse hata fırlatır
    assert msg.sender == self.minter
```

Yalnızca basıcı (ERC-721 sözleşmesini oluşturan hesap) yeni token'lar basabilir. Gelecekte basıcının kimliğini değiştirmek istersek bu bir sorun olabilir. Bir üretim sözleşmesinde muhtemelen basıcının basım ayrıcalıklarını başka birine devretmesine izin veren bir fonksiyon istersiniz.

```python
    # `_to` sıfır adresi ise hata fırlatır
    assert _to != ZERO_ADDRESS
    # NFT ekle. `_tokenId` birine aitse hata fırlatır
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

Geleneksel olarak, yeni token'ların basımı sıfır adresinden bir transfer olarak sayılır.

```python

@external
def burn(_tokenId: uint256):
    """
    @dev Belirli bir ERC-721 Token'ı için yakım işlemi yapar.
         `msg.sender` mevcut sahip, yetkili bir operatör veya bu NFT için onaylanmış
         Adres değilse hata fırlatır.
         `_tokenId` geçerli bir NFT değilse hata fırlatır.
    @param _tokenId yakım işlemi yapılacak ERC-721 Token'ının uint256 kimliği.
    """
    # Gereksinimleri kontrol et
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # `_tokenId` geçerli bir NFT değilse hata fırlatır
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

Bir token'ı transfer etmesine izin verilen herkes onu yakabilir. Bir yakım işlemi sıfır adresine transfere eşdeğer görünse de, sıfır adresi aslında token'ı almaz. Bu, token için kullanılan tüm depolama alanını boşaltmamızı sağlar, bu da işlemin gaz maliyetini azaltabilir.

## Bu Sözleşmeyi Kullanmak {#using-contract}

Solidity'nin aksine, Vyper'da kalıtım yoktur. Bu, kodu daha net ve dolayısıyla güvenliğini sağlamayı daha kolay hale getirmek için kasıtlı bir tasarım seçimidir. Bu nedenle kendi Vyper ERC-721 sözleşmenizi oluşturmak için [bu sözleşmeyi](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) alır ve istediğiniz iş mantığını uygulamak üzere değiştirirsiniz.

## Sonuç {#conclusion}

Gözden geçirmek gerekirse, bu sözleşmedeki en önemli fikirlerden bazıları şunlardır:

- Güvenli bir transferle ERC-721 token'larını almak için sözleşmelerin `ERC721Receiver` arayüzünü uygulaması gerekir.
- Güvenli transfer kullansanız bile, token'ları özel anahtarı bilinmeyen bir adrese gönderirseniz yine de sıkışıp kalabilirler.
- Bir işlemle ilgili bir sorun olduğunda, sadece bir başarısızlık değeri döndürmek yerine çağrıyı `revert` (geri almak) iyi bir fikirdir.
- ERC-721 token'ları bir sahipleri olduğunda var olurlar.
- Bir NFT'yi transfer etmeye yetkili olmanın üç yolu vardır. Sahip olabilirsiniz, belirli bir token için onaylanmış olabilirsiniz veya sahibin tüm token'ları için bir operatör olabilirsiniz.
- Geçmiş olaylar yalnızca blokzincirin dışında görülebilir. Blokzincir içinde çalışan kod bunları görüntüleyemez.

Şimdi gidin ve güvenli Vyper sözleşmeleri uygulayın.

[Çalışmalarımın daha fazlası için buraya bakın](https://cryptodocguy.pro/).
