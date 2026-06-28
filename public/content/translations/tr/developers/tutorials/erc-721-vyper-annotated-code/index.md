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

Vyper'daki yorumlar, Python'da olduğu gibi bir hash (`#`) ile başlar ve satır sonuna kadar devam eder. `@<keyword>` içeren yorumlar, insanlar tarafından okunabilir belgeler üretmek için [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) tarafından kullanılır.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

ERC-721 arayüzü Vyper diline yerleşiktir.
[Kod tanımını buradan görebilirsiniz](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py).
Arayüz tanımı Vyper yerine Python ile yazılmıştır, çünkü arayüzler yalnızca blokzincir içinde değil, aynı zamanda blokzincire Python ile yazılmış olabilecek harici bir istemciden bir işlem gönderilirken de kullanılır.

İlk satır arayüzü içe aktarır ve ikinci satır onu burada uyguladığımızı belirtir.

### ERC721Receiver Arayüzü {#receiver-interface}

```python
# safeTransferFrom() tarafından çağrılan Sözleşme için arayüz
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 iki tür transferi destekler:

- Gönderenin herhangi bir hedef adresi belirlemesine izin veren ve transfer sorumluluğunu gönderene yükleyen `transferFrom`. Bu, geçersiz bir adrese transfer yapabileceğiniz anlamına gelir; bu durumda NFT tamamen kaybolur.
- Hedef adresin bir sözleşme olup olmadığını kontrol eden `safeTransferFrom`. Eğer öyleyse, ERC-721 sözleşmesi alıcı sözleşmeye NFT'yi almak isteyip istemediğini sorar.

`safeTransferFrom` isteklerine yanıt vermek için alıcı bir sözleşmenin `ERC721Receiver` uygulaması gerekir.

```python
            _operator: address,
            _from: address,
```

`_from` adresi, token'ın mevcut sahibidir. `_operator` adresi ise transferi talep eden adrestir (harcama izinleri nedeniyle bu ikisi aynı olmayabilir).

```python
            _tokenId: uint256,
```

ERC-721 token kimlikleri (ID) 256 bittir. Genellikle token'ın temsil ettiği şeyin bir açıklamasının hashlenmesiyle oluşturulurlar.

```python
            _data: Bytes[1024]
```

İstek, 1024 bayta kadar kullanıcı verisi içerebilir.

```python
        ) -> bytes32: view
```

Bir sözleşmenin yanlışlıkla bir transferi kabul ettiği durumları önlemek için dönüş değeri bir boolean değil, belirli bir değere sahip 256 bittir.

Bu fonksiyon bir `view`'dur, yani blokzincirin durumunu okuyabilir ancak değiştiremez.

### Olaylar {#events}

[Olaylar](/developers/docs/smart-contracts/anatomy/#events-and-logs), blokzincir dışındaki kullanıcıları ve sunucuları olaylar hakkında bilgilendirmek için yayınlanır. Olayların içeriğinin blokzincirdeki sözleşmeler tarafından kullanılamayacağını unutmayın.

```python
# @dev Herhangi bir NFT'nin sahipliği herhangi bir mekanizma ile değiştiğinde tetiklenir. Bu olay, NFT'ler
#      oluşturulduğunda (`from` == 0) ve yok edildiğinde (`to` == 0) tetiklenir. İstisna: Sözleşme oluşturulması sırasında, herhangi bir
#      sayıda NFT, transfer tetiklenmeden oluşturulabilir ve atanabilir. Herhangi bir
#      transfer sırasında, o NFT için onaylanmış Adres (varsa) sıfırlanır.
# @param _from NFT'nin göndericisi (eğer Adres sıfır adresi ise Token oluşturulmasını belirtir).
# @param _to NFT'nin alıcısı (eğer Adres sıfır adresi ise Token yok edilmesini belirtir).
# @param _tokenId transfer edilen NFT.
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

Bu, bir miktar yerine bir `tokenId` bildirmemiz dışında ERC-20 Transfer olayına benzer. Sıfır adresine kimse sahip değildir, bu nedenle geleneksel olarak onu token'ların oluşturulmasını ve yok edilmesini bildirmek için kullanırız.

```python
# @dev Bu, bir NFT için onaylanmış Adres değiştirildiğinde veya yeniden onaylandığında tetiklenir. Sıfır
#      adresi, onaylanmış bir Adres olmadığını belirtir. Bir transfer olayı tetiklendiğinde, bu aynı zamanda
#      o NFT için onaylanmış Adresin (varsa) sıfırlandığını belirtir.
# @param _owner NFT'nin sahibi.
# @param _approved Onayladığımız Adres.
# @param _tokenId Onayladığımız NFT.
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

Bir ERC-721 onayı, bir ERC-20 harcama iznine benzer. Belirli bir adresin belirli bir token'ı transfer etmesine izin verilir. Bu, sözleşmelerin bir token'ı kabul ettiklerinde yanıt vermeleri için bir mekanizma sağlar. Sözleşmeler olayları dinleyemez, bu yüzden token'ı onlara sadece transfer ederseniz bundan "haberleri" olmaz. Bu şekilde sahip önce bir onay sunar ve ardından sözleşmeye bir istek gönderir: "X token'ını transfer etmenizi onayladım, lütfen yapın...".

Bu, ERC-721 standardını ERC-20 standardına benzer hale getirmek için bir tasarım seçimidir. ERC-721 token'ları değiştirilemez olduğundan, bir sözleşme token'ın sahipliğine bakarak belirli bir token'ı aldığını da belirleyebilir.

```python
# @dev Bu, bir sahip için bir operatör etkinleştirildiğinde veya devre dışı bırakıldığında tetiklenir. Operatör,
#      sahibinin tüm NFT'lerini yönetebilir.
# @param _owner NFT'nin sahibi.
# @param _operator Operatör haklarını ayarladığımız Adres.
# @param _approved Operatör haklarının durumu (operatör hakları verilmişse true, geri alınmışsa
# false).
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

Bazen, bir vekaletnameye benzer şekilde, bir hesabın belirli bir türdeki (belirli bir sözleşme tarafından yönetilen) tüm token'larını yönetebilen bir _operatör_ (operator) olması yararlıdır. Örneğin, altı ay boyunca onunla iletişime geçip geçmediğimi kontrol eden ve eğer geçmediysem varlıklarımı mirasçılarıma dağıtan bir sözleşmeye böyle bir yetki vermek isteyebilirim (eğer onlardan biri bunu isterse, sözleşmeler bir işlem tarafından çağrılmadan hiçbir şey yapamaz). ERC-20'de bir miras sözleşmesine yüksek bir harcama izni verebiliriz, ancak bu ERC-721 için işe yaramaz çünkü token'lar değiştirilemez. Bu onun eşdeğeridir.

`approved` değeri, olayın bir onay için mi yoksa bir onayın geri alınması için mi olduğunu bize söyler.

### Durum Değişkenleri {#state-vars}

Bu değişkenler token'ların mevcut durumunu içerir: hangilerinin mevcut olduğu ve kime ait oldukları. Bunların çoğu `HashMap` nesneleridir, yani [iki tür arasında var olan tek yönlü eşlemelerdir](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev NFT ID'sinden ona sahip olan Adrese eşleme.
idToOwner: HashMap[uint256, address]

# @dev NFT ID'sinden onaylanmış Adrese eşleme.
idToApprovals: HashMap[uint256, address]
```

Ethereum'daki kullanıcı ve sözleşme kimlikleri 160 bitlik adreslerle temsil edilir. Bu iki değişken, token kimliklerinden sahiplerine ve onları transfer etmesi onaylananlara (her biri için en fazla bir tane) eşleme yapar. Ethereum'da başlatılmamış veriler her zaman sıfırdır, bu nedenle bir sahip veya onaylanmış transfer eden yoksa o token için değer sıfırdır.

```python
# @dev Sahip Adresinden Token sayısına eşleme.
ownerToNFTokenCount: HashMap[address, uint256]
```

Bu değişken, her sahip için token sayısını tutar. Sahiplerden token'lara bir eşleme yoktur, bu nedenle belirli bir sahibin sahip olduğu token'ları belirlemenin tek yolu blokzincirin olay geçmişine dönüp bakmak ve uygun `Transfer` olaylarını görmektir. Tüm NFT'lere ne zaman sahip olduğumuzu bilmek ve zamanda daha da geriye bakmaya gerek kalmaması için bu değişkeni kullanabiliriz.

Bu algoritmanın yalnızca kullanıcı arayüzleri ve harici sunucular için çalıştığını unutmayın. Blokzincirin kendisinde çalışan kod geçmiş olayları okuyamaz.

```python
# @dev Sahip Adresinden operatör Adreslerinin eşlemesine eşleme.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Bir hesabın birden fazla operatörü olabilir. Basit bir `HashMap` onları takip etmek için yetersizdir, çünkü her anahtar tek bir değere yönlendirir. Bunun yerine, değer olarak `HashMap[address, bool]` kullanabilirsiniz. Varsayılan olarak her adres için değer `False`'dur, bu da onun bir operatör olmadığı anlamına gelir. Değerleri gerektiği gibi `True` olarak ayarlayabilirsiniz.

```python
# @dev Token basabilen basıcının Adresi
minter: address
```

Yeni token'ların bir şekilde oluşturulması gerekir. Bu sözleşmede bunu yapmasına izin verilen tek bir varlık vardır, o da `minter`'dır. Bu, örneğin bir oyun için muhtemelen yeterli olacaktır. Diğer amaçlar için daha karmaşık bir iş mantığı oluşturmak gerekebilir.

```python
# @dev Arayüz kimliğinden desteklenip desteklenmediğine dair bool değerine eşleme
supportedInterfaces: HashMap[bytes32, bool]

# @dev ERC-165'in ERC-165 arayüz kimliği
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ERC-721'in ERC-165 arayüz kimliği
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165), bir sözleşmenin uygulamaların onunla nasıl iletişim kurabileceğini, hangi ERC'lere uyduğunu açıklaması için bir mekanizma belirtir. Bu durumda, sözleşme ERC-165 ve ERC-721'e uyar.

### Fonksiyonlar {#functions}

Bunlar, ERC-721'i fiilen uygulayan fonksiyonlardır.

#### Kurucu {#constructor}

```python
@external
def __init__():
```

Vyper'da, Python'da olduğu gibi, kurucu fonksiyon `__init__` olarak adlandırılır.

```python
    """
    @dev Sözleşme kurucu.
    """
```

Python'da ve Vyper'da, çok satırlı bir dize belirterek (`"""` ile başlayıp biten) ve bunu hiçbir şekilde kullanmayarak da bir yorum oluşturabilirsiniz. Bu yorumlar [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) de içerebilir.

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

Durum değişkenlerine erişmek için `self.<variable name>` kullanırsınız (yine Python'daki gibi).

#### Görünüm (View) Fonksiyonları {#views}

Bunlar blokzincirin durumunu değiştirmeyen ve bu nedenle harici olarak çağrılırlarsa ücretsiz olarak yürütülebilen fonksiyonlardır. Görünüm fonksiyonları bir sözleşme tarafından çağrılırsa, yine de her düğüm üzerinde yürütülmeleri gerekir ve bu nedenle gaz maliyeti oluştururlar.

```python
@view
@external
```

Bir fonksiyon tanımından önce gelen ve at işareti (`@`) ile başlayan bu anahtar kelimelere _dekorasyonlar_ (decorations) denir. Bir fonksiyonun hangi koşullarda çağrılabileceğini belirtirler.

- `@view`, bu fonksiyonun bir görünüm olduğunu belirtir.
- `@external`, bu belirli fonksiyonun işlemler ve diğer sözleşmeler tarafından çağrılabileceğini belirtir.

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

Python'un aksine, Vyper [statik tipli bir dildir](https://wikipedia.org/wiki/Type_system#Static_type_checking). [Veri tipini](https://vyper.readthedocs.io/en/latest/types.html) tanımlamadan bir değişken veya fonksiyon parametresi bildiremezsiniz. Bu durumda girdi parametresi 256 bitlik bir değer olan `bytes32`'dir (256 bit, [Ethereum Sanal Makinesi](/developers/docs/evm/)'nin yerel kelime boyutudur). Çıktı bir boolean değeridir. Geleneksel olarak, fonksiyon parametrelerinin adları bir alt çizgi (`_`) ile başlar.

```python
    """
    @dev Arayüz tanımlaması ERC-165'te belirtilmiştir.
    @param _interfaceID Arayüzün kimliği
    """
    return self.supportedInterfaces[_interfaceID]
```

Kurucuda (`__init__`) ayarlanan `self.supportedInterfaces` HashMap'inden değeri döndürün.

```python
### GÖRÜNTÜLEME FONKSİYONLARI ###
```

Bunlar, token'lar hakkındaki bilgileri kullanıcılara ve diğer sözleşmelere sunan görünüm fonksiyonlarıdır.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev `_owner` tarafından sahip olunan NFT sayısını döndürür.
         `_owner` sıfır adresi ise hata fırlatır. Sıfır adresine atanan NFT'ler geçersiz kabul edilir.
    @param _owner Bakiyesi sorgulanacak Adres.
    """
    assert _owner != ZERO_ADDRESS
```

Bu satır, `_owner`'nin sıfır olmadığını [doğrular](https://vyper.readthedocs.io/en/latest/statements.html#assert). Eğer sıfırsa, bir hata vardır ve işlem geri alınır.

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev NFT sahibinin Adresini döndürür.
         `_tokenId` geçerli bir NFT değilse hata fırlatır.
    @param _tokenId Bir NFT için tanımlayıcı.
    """
    owner: address = self.idToOwner[_tokenId]
    # `_tokenId` geçerli bir NFT değilse hata fırlatır
    assert owner != ZERO_ADDRESS
    return owner
```

Ethereum Sanal Makinesi'nde (EVM) içinde bir değer saklanmayan herhangi bir depolama alanı sıfırdır. Eğer `_tokenId`'te bir token yoksa, `self.idToOwner[_tokenId]` değeri sıfırdır. Bu durumda fonksiyon geri alınır.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Tek bir NFT için onaylanmış Adresi getirir.
         `_tokenId` geçerli bir NFT değilse hata fırlatır.
    @param _tokenId Onayı sorgulanacak NFT'nin kimliği.
    """
    # `_tokenId` geçerli bir NFT değilse hata fırlatır
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

`getApproved`'nin sıfır döndürebileceğini unutmayın. Token geçerliyse `self.idToApprovals[_tokenId]` döndürür. Eğer bir onaylayan yoksa bu değer sıfırdır.

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev `_operator`'ün `_owner` için onaylanmış bir operatör olup olmadığını kontrol eder.
    @param _owner NFT'lere sahip olan Adres.
    @param _operator Sahibi adına hareket eden Adres.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

Bu fonksiyon, `_operator`'ün bu sözleşmedeki tüm `_owner` token'larını yönetmesine izin verilip verilmediğini kontrol eder. Birden fazla operatör olabileceğinden, bu iki seviyeli bir HashMap'tir.

#### Transfer Yardımcı Fonksiyonları {#transfer-helpers}

Bu fonksiyonlar, token'ları transfer etmenin veya yönetmenin bir parçası olan işlemleri uygular.

```python

### TRANSFER FONKSİYONU YARDIMCILARI ###

@view
@internal
```

Bu dekorasyon, `@internal`, fonksiyonun yalnızca aynı sözleşme içindeki diğer fonksiyonlardan erişilebilir olduğu anlamına gelir. Geleneksel olarak, bu fonksiyon adları da bir alt çizgi (`_`) ile başlar.

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev Belirtilen harcayıcının belirli bir Token kimliğini transfer edip edemeyeceğini döndürür
    @param spender sorgulanacak harcayıcının Adresi
    @param tokenId transfer edilecek Token'ın uint256 kimliği
    @return bool msg.sender'ın belirtilen Token kimliği için onaylı olup olmadığı,
        sahibinin bir operatörü olup olmadığı veya Token'ın sahibi olup olmadığı
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

Bir adresin bir token'ı transfer etmesine izin verilmesinin üç yolu vardır:

1. Adres, token'ın sahibidir
2. Adresin o token'ı harcaması onaylanmıştır
3. Adres, token sahibinin bir operatörüdür

Yukarıdaki fonksiyon durumu değiştirmediği için bir görünüm olabilir. İşletme maliyetlerini azaltmak için, bir görünüm _olabilen_ herhangi bir fonksiyon bir görünüm _olmalıdır_.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Belirli bir Adrese bir NFT ekler
         `_tokenId` birine aitse hata fırlatır.
    """
    # `_tokenId` birine aitse hata fırlatır
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # Sahibi değiştir
    self.idToOwner[_tokenId] = _to
    # Sayı takibini değiştir
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Belirli bir Adresten bir NFT'yi kaldırır
         `_from` mevcut sahip değilse hata fırlatır.
    """
    # `_from` mevcut sahip değilse hata fırlatır
    assert self.idToOwner[_tokenId] == _from
    # Sahibi değiştir
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # Sayı takibini değiştir
    self.ownerToNFTokenCount[_from] -= 1
```

Bir transferle ilgili bir sorun olduğunda çağrıyı geri alırız.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Belirli bir Adresin onayını temizler
         `_owner` mevcut sahip değilse hata fırlatır.
    """
    # `_owner` mevcut sahip değilse hata fırlatır
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # Onayları sıfırla
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

Değeri yalnızca gerekliyse değiştirin. Durum değişkenleri depolamada yaşar. Depolamaya yazmak, EVM'nin (Ethereum Sanal Makinesi) yaptığı en pahalı işlemlerden biridir ([gaz](/developers/docs/gas/) açısından). Bu nedenle, bunu en aza indirmek iyi bir fikirdir, mevcut değeri yazmanın bile yüksek bir maliyeti vardır.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Bir NFT'nin transfer işlemini gerçekleştirir.
         `msg.sender` mevcut sahip, yetkili bir operatör veya bu NFT için onaylanmış
         Adres değilse hata fırlatır. (NOT: `msg.sender` özel fonksiyonda izin verilmez, bu yüzden `_sender` geçin.)
         `_to` sıfır adresi ise hata fırlatır.
         `_from` mevcut sahip değilse hata fırlatır.
         `_tokenId` geçerli bir NFT değilse hata fırlatır.
    """
```

Bu dahili fonksiyona sahibiz çünkü token'ları transfer etmenin iki yolu vardır (normal ve güvenli), ancak denetimi kolaylaştırmak için kodda bunu yaptığımız tek bir yer olmasını istiyoruz.

```python
    # Gereksinimleri kontrol et
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # `_to` sıfır adresi ise hata fırlatır
    assert _to != ZERO_ADDRESS
    # Onayı temizle. `_from` mevcut sahip değilse hata fırlatır
    self._clearApproval(_from, _tokenId)
    # NFT'yi kaldır. `_tokenId` geçerli bir NFT değilse hata fırlatır
    self._removeTokenFrom(_from, _tokenId)
    # NFT ekle
    self._addTokenTo(_to, _tokenId)
    # transfer işlemini kaydet
    log Transfer(_from, _to, _tokenId)
```

Vyper'da bir olay yayınlamak için bir `log` ifadesi kullanırsınız ([daha fazla ayrıntı için buraya bakın](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).

#### Transfer Fonksiyonları {#transfer-funs}

```python

### TRANSFER FONKSİYONLARI ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev `msg.sender` mevcut sahip, yetkili bir operatör veya bu NFT için onaylanmış
         Adres değilse hata fırlatır.
         `_from` mevcut sahip değilse hata fırlatır.
         `_to` sıfır adresi ise hata fırlatır.
         `_tokenId` geçerli bir NFT değilse hata fırlatır.
    @notice Çağırıcı, `_to` adresinin NFT'leri alabileceğinden emin olmakla sorumludur, aksi takdirde
            kalıcı olarak kaybolabilirler.
    @param _from NFT'nin mevcut sahibi.
    @param _to Yeni sahip.
    @param _tokenId transfer edilecek NFT.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Bu fonksiyon, rastgele bir adrese transfer yapmanızı sağlar. Adres bir kullanıcı veya token'ları nasıl transfer edeceğini bilen bir sözleşme olmadığı sürece, transfer ettiğiniz herhangi bir token o adreste sıkışıp kalacak ve işe yaramaz hale gelecektir.

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev Bir NFT'nin sahipliğini bir Adresten başka bir Adrese transfer eder.
         `msg.sender` mevcut sahip, yetkili bir operatör veya bu NFT için
         onaylanmış Adres değilse hata fırlatır.
         `_from` mevcut sahip değilse hata fırlatır.
         `_to` sıfır adresi ise hata fırlatır.
         `_tokenId` geçerli bir NFT değilse hata fırlatır.
         Eğer `_to` bir akıllı Sözleşme ise, `_to` üzerinde `onERC721Received` çağırır ve
         dönüş değeri `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))` değilse hata fırlatır.
         NOT: bytes4, dolgulu bytes32 ile temsil edilir
    @param _from NFT'nin mevcut sahibi.
    @param _to Yeni sahip.
    @param _tokenId transfer edilecek NFT.
    @param _data Belirli bir formatı olmayan, `_to` çağrısında gönderilen ek veri.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Önce transferi yapmak sorun değildir çünkü bir sorun olursa zaten geri alacağız, bu nedenle çağrıda yapılan her şey iptal edilecektir.

```python
    if _to.is_contract: # `_to` adresinin bir Sözleşme Adresi olup olmadığını kontrol et
```

Önce adresin bir sözleşme olup olmadığını (kodu olup olmadığını) kontrol edin. Değilse, bunun bir kullanıcı adresi olduğunu ve kullanıcının token'ı kullanabileceğini veya transfer edebileceğini varsayın. Ancak bunun sizi sahte bir güvenlik hissine kaptırmasına izin vermeyin. Token'ları, kimsenin özel anahtarını bilmediği bir adrese transfer ederseniz, `safeTransferFrom` ile bile kaybedebilirsiniz.

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

ERC-721 token'larını alıp alamayacağını görmek için hedef sözleşmeyi çağırın.

```python
        # transfer hedefi 'onERC721Received' uygulamayan bir Sözleşme ise hata fırlatır
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

Hedef bir sözleşmeyse, ancak ERC-721 token'larını kabul etmeyen (veya bu belirli transferi kabul etmemeye karar veren) bir sözleşmeyse, geri alın.

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Bir NFT için onaylanmış Adresi ayarlar veya yeniden onaylar. Sıfır adresi, onaylanmış bir Adres olmadığını belirtir.
         `msg.sender` mevcut NFT sahibi veya mevcut sahibin yetkili bir operatörü değilse hata fırlatır.
         `_tokenId` geçerli bir NFT değilse hata fırlatır. (NOT: Bu EIP'de yazılı değildir)
         `_approved` mevcut sahipse hata fırlatır. (NOT: Bu EIP'de yazılı değildir)
    @param _approved Belirtilen NFT kimliği için onaylanacak Adres.
    @param _tokenId Onaylanacak Token'ın kimliği.
    """
    owner: address = self.idToOwner[_tokenId]
    # `_tokenId` geçerli bir NFT değilse hata fırlatır
    assert owner != ZERO_ADDRESS
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

Bir onay ayarlamak için ya sahip ya da sahip tarafından yetkilendirilmiş bir operatör olabilirsiniz.

```python
    # Onayı ayarla
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Üçüncü bir tarafın ("operatör") `msg.sender`'ın tüm varlıklarını yönetmesi için onayı etkinleştirir veya devre dışı bırakır.
         Ayrıca ApprovalForAll olayını tetikler.
         `_operator` `msg.sender` ise hata fırlatır. (NOT: Bu EIP'de yazılı değildir)
    @notice Bu, gönderici o anda herhangi bir Token'a sahip olmasa bile çalışır.
    @param _operator Yetkili operatörler kümesine eklenecek Adres.
    @param _approved Operatörler onaylanmışsa true, onayı iptal etmek için false.
    """
    # `_operator` `msg.sender` ise hata fırlatır
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
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