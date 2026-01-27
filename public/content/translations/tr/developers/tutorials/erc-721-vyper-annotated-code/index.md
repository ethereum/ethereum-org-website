---
title: "Vyper ERC-721 Sözleşmesine Genel Bakış"
description: Ryuya Nakamura'nın ERC-721 sözleşmesi ve nasıl çalıştığı
author: Ori Pomerantz
lang: tr
tags: [ "vyper", "erc-721", "python" ]
skill: beginner
published: 01.04.2021
---

## Giriş {#introduction}

[ERC-721](/developers/docs/standards/tokens/erc-721/) standardı, Değiştirilemez Jetonların (NFT) sahipliğini tutmak için kullanılır.
[ERC-20](/developers/docs/standards/tokens/erc-20/) jetonları, bireysel jetonlar arasında bir fark olmadığı için bir emtia gibi davranır.
Bunun aksine, ERC-721 jetonları, farklı kedi
çizgi filmleri veya farklı gayrimenkullerin tapuları gibi benzer ancak birebir aynı olmayan varlıklar için tasarlanmıştır.

Bu makalede [Ryuya Nakamura'nın ERC-721 sözleşmesini](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) analiz edeceğiz.
Bu sözleşme, güvensiz kod yazmayı Solidity'de olduğundan daha zorlaştırmak için tasarlanmış Python benzeri bir sözleşme dili olan [Vyper](https://vyper.readthedocs.io/en/latest/index.html) ile yazılmıştır.

## Sözleşme {#contract}

```python
# @dev ERC-721 değiştirilemez jeton standardının uygulaması.
# @yazar Ryuya Nakamura (@nrryuya)
# Şuradan değiştirildi: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Python'da olduğu gibi Vyper'da da yorumlar bir kare işareti (`#`) ile başlar ve satırın sonuna kadar devam eder. `@<anahtar kelime>` içeren yorumlar, [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) tarafından insanlar tarafından okunabilir belgeler oluşturmak için kullanılır.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

ERC-721 arayüzü, Vyper dilinde yerleşiktir.
[Kod tanımını burada görebilirsiniz](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py).
Arayüz tanımı Vyper yerine Python'da yazılmıştır, çünkü arayüzler yalnızca blokzincir içinde değil, blokzincire Python ile yazılabilen harici bir istemciden bir işlem gönderilirken de kullanılır.

İlk satır, arayüzü içe aktarır ve ikincisi onu burada uyguladığımızı belirtir.

### ERC721Receiver Arayüzü {#receiver-interface}

```python
# safeTransferFrom() tarafından çağrılan sözleşme için arayüz
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 iki tür aktarımı destekler:

- `transferFrom`, göndericinin herhangi bir hedef adresi belirtmesine olanak tanır ve aktarım sorumluluğunu göndericiye yükler. Bu, geçersiz bir adrese aktarım yapabileceğiniz anlamına gelir, bu durumda
  NFT tamamen kaybolur.
- `safeTransferFrom`, hedef adresin bir sözleşme olup olmadığını kontrol eder. Eğer öyleyse, ERC-721 sözleşmesi alıcı sözleşmeye NFT'yi almak isteyip istemediğini sorar.

`safeTransferFrom` isteklerine yanıt vermek için alıcı bir sözleşmenin `ERC721Receiver`'ı uygulaması gerekir.

```python
            _operator: address,
            _from: address,
```

`_from` adresi jetonun mevcut sahibidir. `_operator` adresi, aktarımı talep eden adrestir (ödenekler nedeniyle bu ikisi aynı olmayabilir).

```python
            _tokenId: uint256,
```

ERC-721 jeton ID'leri 256 bittir. Tipik olarak, jetonun temsil ettiği şeyin bir açıklamasının hash edilmesiyle oluşturulurlar.

```python
            _data: Bytes[1024]
```

İstek, 1024 bayta kadar kullanıcı verisine sahip olabilir.

```python
        ) -> bytes32: view
```

Bir sözleşmenin yanlışlıkla bir aktarımı kabul ettiği durumları önlemek için, dönüş değeri bir boole değil, belirli bir değere sahip 256 bittir.

Bu işlev bir `view`'dur, yani blokzincirin durumunu okuyabilir, ancak değiştiremez.

### Olaylar {#events}

[Olaylar](https://media.consensys.net/technical-introduction-to-events-and-logs-in-ethereum-a074d65dd61e) blokzincir dışındaki kullanıcıları ve sunucuları olaylar hakkında bilgilendirmek için yayınlanır. Olayların içeriğinin blokzincirdeki sözleşmeler için mevcut olmadığını unutmayın.

```python
# @dev Herhangi bir NFT'nin mülkiyeti herhangi bir mekanizma ile değiştiğinde yayınlanır. Bu olay, NFT'ler
#      oluşturulduğunda (`from` == 0) ve yok edildiğinde (`to` == 0) yayınlanır. İstisna: sözleşme oluşturma sırasında, herhangi
#      bir sayıda NFT, Transfer yayınlanmadan oluşturulabilir ve atanabilir. Herhangi bir
#      aktarım sırasında, o NFT için onaylanmış adres (varsa) sıfırlanır.
# @param _from NFT'nin göndericisi (adres sıfır adresi ise jeton oluşturmayı belirtir).
# @param _to NFT'nin alıcısı (adres sıfır adresi ise jeton yok etmeyi belirtir).
# @param _tokenId Aktarılan NFT.
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

Bu, bir miktar yerine bir `tokenId` bildirmemiz dışında, ERC-20 Transfer olayına benzer.
Hiç kimse sıfır adresine sahip değildir, bu nedenle geleneksel olarak onu jetonların oluşturulmasını ve yok edilmesini bildirmek için kullanırız.

```python
# @dev Bu, bir NFT için onaylanmış adres değiştirildiğinde veya yeniden onaylandığında yayınlanır. Sıfır
#      adresi, onaylanmış bir adres olmadığını gösterir. Bir Transfer olayı yayınlandığında, bu aynı zamanda
#      o NFT için onaylanmış adresin (varsa) sıfırlandığını gösterir.
# @param _owner NFT'nin sahibi.
# @param _approved Onayladığımız adres.
# @param _tokenId Onayladığımız NFT.
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

ERC-721 onayı, ERC-20 ödeneğine benzer. Belirli bir adresin belirli bir
jetonu aktarmasına izin verilir. Bu, sözleşmelerin bir jetonu kabul ettiklerinde yanıt vermeleri için bir mekanizma sağlar. Sözleşmeler olayları
dinleyemez, bu nedenle jetonu onlara aktarırsanız bunu "bilmezler". Bu şekilde, mal sahibi önce bir onay gönderir ve ardından sözleşmeye bir istek gönderir: "X jetonunu aktarmanız için onay verdim, lütfen yapın ...".

Bu, ERC-721 standardını ERC-20 standardına benzer kılmak için yapılmış bir tasarım tercihidir. ERC-721 jetonları değiştirilemez olduğundan, bir sözleşme, jetonun mülkiyetine bakarak belirli bir jeton aldığını da belirleyebilir.

```python
# @dev Bu, bir operatör bir sahip için etkinleştirildiğinde veya devre dışı bırakıldığında yayınlanır. Operatör, sahibinin tüm NFT'lerini
#      yönetebilir.
# @param _owner NFT'nin sahibi.
# @param _operator Operatör haklarını ayarladığımız adres.
# @param _approved Operatör haklarının durumu (operatör hakları verilmişse true, geri alınmışsa
# false).
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

Bir hesabın, adeta bir vekaletname gibi belirli bir türdeki (belirli bir sözleşmeyle yönetilenler) tüm jetonlarını yönetebilen bir _operatöre_ sahip olmak bazen yararlıdır. Örneğin, altı aydır temas kurup kurmadığımı kontrol eden ve kurmadıysam varlıklarımı mirasçılarıma dağıtan bir sözleşmeye böyle bir yetki vermek isteyebilirim (mirasçılardan biri talep ederse, sözleşmeler bir işlemle çağrılmadan hiçbir şey yapamaz). ERC-20'de bir miras sözleşmesine sadece yüksek bir ödenek verebiliriz ancak bu, ERC-721 için işe yaramaz çünkü jetonlar değiştirilemezdir. Bu, bunun dengidir.

`approved` değeri bize etkinliğin bir onay için mi yoksa bir onayın geri çekilmesi için mi olduğunu söyler.

### Durum Değişkenleri {#state-vars}

Bu değişkenler, jetonların mevcut durumunu içerir: hangilerinin mevcut olduğu ve onlara kimin sahip olduğu. Bunların çoğu, [iki tür arasında var olan tek yönlü eşlemeler](https://vyper.readthedocs.io/en/latest/types.html#mappings) olan `HashMap` nesneleridir.

```python
# @dev NFT ID'sinden sahibinin adresine eşleme.
idToOwner: HashMap[uint256, address]

# @dev NFT ID'sinden onaylanan adrese eşleme.
idToApprovals: HashMap[uint256, address]
```

Ethereum'daki kullanıcı ve sözleşme kimlikleri 160 bitlik adreslerle temsil edilir. Bu iki değişken, jeton ID'lerinden sahiplerine ve bunları aktarmak için onaylananlara eşleştirilir (her biri için en fazla bir tane). Ethereum'da, başlatılmamış veriler her zaman sıfırdır, bu nedenle herhangi bir sahip veya onaylanmış aktarıcı yoksa, o jetonun değeri sıfırdır.

```python
# @dev Sahip adresinden sahip olduğu jeton sayısına eşleme.
ownerToNFTokenCount: HashMap[address, uint256]
```

Bu değişken, her sahip için jeton sayısını tutar. Sahiplerden jetonlara eşleştirme yoktur, bu nedenle belirli bir sahibin sahip olduğu jetonları tanımlamanın tek yolu blokzincirin olay geçmişine bakmak ve uygun `Transfer` olaylarını görmektir. Bu değişkeni, tüm NFT'lere ne zaman sahip olduğumuzu ve zamanda daha fazla aramamıza gerek olmadığını bilmek için kullanabiliriz.

Bu algoritmanın yalnızca kullanıcı arayüzleri ve harici sunucular için çalıştığını unutmayın. Blokzincirinin
kendisinde çalışan kod geçmiş olayları okuyamaz.

```python
# @dev Sahip adresinden operatör adreslerinin eşlemesine eşleme.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Bir hesap birden fazla operatöre sahip olabilir. Basit bir `HashMap` onları takip etmek için yetersizdir, çünkü her anahtar tek bir değere bağlıdır. Bunun yerine, değer olarak `HashMap[address, bool]` kullanabilirsiniz. Varsayılan olarak, her adresin değeri `False`'dur, bu da bir operatör olmadığı anlamına gelir. Değerleri gerektiği gibi `True` olarak ayarlayabilirsiniz.

```python
# @dev Bir jeton basabilen minter'ın adresi
minter: address
```

Yeni jetonlar bir şekilde oluşturulmalıdır. Bu sözleşmede bunu yapmasına izin verilen tek bir varlık vardır, `minter`. Bu, örneğin bir oyun için yeterli olabilir. Diğer amaçlar için daha karmaşık bir iş mantığı oluşturmak gerekebilir.

```python
# @dev Arayüz kimliğinden desteklenip desteklenmediğine dair bool'a eşleme
supportedInterfaces: HashMap[bytes32, bool]

# @dev ERC165'in ERC165 arayüzü ID'si
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ERC721'in ERC165 arayüzü ID'si
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) bir sözleşmenin, uygulamaların onunla nasıl iletişim kurabileceğini, yani hangi ERC'lere uyduğunu açıklaması için bir mekanizma belirtir. Bu durumda sözleşme ERC-165 ve ERC-721'e uygundur.

### Fonksiyonlar {#functions}

Bunlar, ERC-721'i gerçekten uygulayan fonksiyonlardır.

#### Yapıcı {#constructor}

```python
@external
def __init__():
```

Vyper'da, Python'da olduğu gibi, yapıcı fonksiyona `__init__` adı verilir.

```python
    """
    @dev Sözleşme yapıcısı.
    """
```

Python'da ve Vyper'da, çok satırlı bir dize (`"""` ile başlayan ve biten) belirterek ve onu hiçbir şekilde kullanmayarak bir yorum oluşturabilirsiniz. Bu yorumlar [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) de içerebilir.

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

Durum değişkenlerine erişmek için `self.<değişken adı>` kullanırsınız\` (yine Python'daki gibi).

#### Görünüm Fonksiyonları {#views}

Bunlar blokzincirin durumunu değiştirmeyen fonksiyonlardır ve bu nedenle dışarıdan çağrıldıklarında ücretsiz olarak yürütülebilirler. Görünüm fonksiyonları bir sözleşme ile çağrılırsa, yine de her düğümde yürütülmeleri gerekir ve bu nedenle gaz harcarlar.

```python
@view
@external
```

Bir at işareti (`@`) ile başlayan bir fonksiyon tanımından önceki bu anahtar kelimelere _dekoratörler_ denir. Bir fonksiyonun çağrılabileceği durumları belirtirler.

- `@view` bu fonksiyonun bir görünüm olduğunu belirtir.
- `@external` bu fonksiyonun işlemler ve diğer sözleşmeler tarafından çağrılabileceğini belirtir.

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

Python'un aksine Vyper [statik tipli bir dildir](https://wikipedia.org/wiki/Type_system#Static_type_checking).
[veri türünü](https://vyper.readthedocs.io/en/latest/types.html) belirtmeden bir değişken veya fonksiyon parametresi bildiremezsiniz. Bu durumda giriş parametresi, 256 bitlik bir değer olan `bytes32`'dir
(256 bit, [Ethereum Sanal Makinesi'nin](/developers/docs/evm/) doğal kelime boyutudur). Çıktı bir boole
değeridir. Kural olarak, fonksiyon parametrelerinin adları bir alt çizgi (`_`) ile başlar.

```python
    """
    @dev Arayüz kimliği ERC-165'te belirtilmiştir.
    @param _interfaceID Arayüzün kimliği
    """
    return self.supportedInterfaces[_interfaceID]
```

Değeri, yapıcıda (`__init__`) belirlenmiş olan `self.supportedInterfaces` HashMap'inden döndürün.

```python
### GÖRÜNÜM FONKSİYONLARI ###
```

Bunlar, jetonlar hakkında bilgileri kullanıcılara ve diğer sözleşmelere sunan görünüm fonksiyonlarıdır.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev `_owner`'ın sahip olduğu NFT sayısını döndürür.
         `_owner` sıfır adresi ise hata verir. Sıfır adresine atanan NFT'ler geçersiz kabul edilir.
    @param _owner Bakiyenin sorgulanacağı adres.
    """
    assert _owner != ZERO_ADDRESS
```

Bu satır, `_owner`'ın sıfır olmadığını [denetler](https://vyper.readthedocs.io/en/latest/statements.html#assert). Eğer öyleyse, bir hata vardır ve işlem geri alınır.

```python
@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev NFT'nin sahibinin adresini döndürür.
         `_tokenId` geçerli bir NFT değilse hata verir.
    @param _tokenId Bir NFT'nin tanımlayıcısı.
    """
    owner: address = self.idToOwner[_tokenId]
    # `_tokenId` geçerli bir NFT değilse hata verir
    assert owner != ZERO_ADDRESS
    return owner
```

Ethereum Sanal Makinesinde (EVM) içinde depolanmış bir değeri olmayan herhangi bir depolama sıfırdır.
Eğer `_tokenId` yerinde bir jeton yoksa `self.idToOwner[_tokenId]` değeri sıfırdır. Bu
durumda fonksiyon geri alınır.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Tek bir NFT için onaylanmış adresi alın.
         `_tokenId` geçerli bir NFT değilse hata verir.
    @param _tokenId Onayını sorgulamak için NFT'nin ID'si.
    """
    # `_tokenId` geçerli bir NFT değilse hata verir
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

`getApproved`'un sıfır _döndürebileceğini_ unutmayın. Eğer jeton geçerliyse `self.idToApprovals[_tokenId]` döndürür.
Onaylayan yoksa bu değer sıfırdır.

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev `_operator`'ın `_owner` için onaylı bir operatör olup olmadığını kontrol eder.
    @param _owner NFT'lerin sahibi olan adres.
    @param _operator Sahip adına hareket eden adres.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

Bu fonksiyon, `_operator`'un bu sözleşmedeki tüm `_owner` jetonlarını yönetmesine izin verilip verilmediğini kontrol eder.
Birden fazla operatör olabileceğinden, bu iki seviyeli bir HashMap'tir.

#### Aktarım Yardımcı Fonksiyonları {#transfer-helpers}

Bu fonksiyonlar, jetonları aktarmanın veya yönetmenin parçası olan işlemleri uygular.

```python

### AKTARIM FONKSİYONU YARDIMCILARI ###

@view
@internal
```

Bu dekoratör, `@internal`, fonksiyonun yalnızca aynı sözleşme içindeki diğer fonksiyonlardan erişilebilir olduğu anlamına gelir. Kural olarak, bu fonksiyon adları ayrıca bir alt çizgi (`_`) ile başlar.

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev Verilen harcayıcının belirli bir jeton kimliğini aktarıp aktaramayacağını döndürür
    @param spender sorgulanacak harcayıcının adresi
    @param tokenId aktarılacak jetonun uint256 ID'si
    @return bool msg.sender'ın verilen jeton ID'si için onaylanıp onaylanmadığını,
        sahibin bir operatörü olup olmadığını veya jetonun sahibi olup olmadığını belirtir
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

Bir adresin bir jetonu aktarmasına izin verilmesinin üç yolu vardır:

1. Adres, jetonun sahibidir
2. Adresin bu jetonu harcaması onaylanmıştır
3. Adres, jetonun sahibi için bir operatördür

Durumu değiştirmediği için yukarıdaki fonksiyon bir görünüm olabilir. İşletim maliyetlerini azaltmak için, görünüm _olabilen_ herhangi bir fonksiyon görünüm _olmalıdır_.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Belirli bir adrese bir NFT ekle
         `_tokenId`'nin bir sahibi varsa hata verir.
    """
    # `_tokenId`'nin bir sahibi varsa hata verir
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # Change the owner
    self.idToOwner[_tokenId] = _to
    # Change count tracking
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Belirli bir adresten bir NFT'yi kaldır
         `_from` mevcut sahip değilse hata verir.
    """
    # `_from` mevcut sahip değilse hata verir
    assert self.idToOwner[_tokenId] == _from
    # Change the owner
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # Change count tracking
    self.ownerToNFTokenCount[_from] -= 1
```

Aktarım ile ilgili bir sorun olduğunda çağrıyı geri alırız.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Belirli bir adresin onayını temizle
         `_owner` mevcut sahip değilse hata verir.
    """
    # `_owner` mevcut sahip değilse hata verir
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # Reset approvals
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

Değeri sadece gerekirse değiştirin. Durum değişkenleri depolamada yaşar. Depolama alanına yazmak, EVM'nin (Ethereum Sanal Makinesi) gerçekleştirdiği en pahalı işlemlerden biridir ([gaz](/developers/docs/gas/) açısından). Bu nedenle en aza indirmek iyi bir fikirdir, mevcut değeri yazmanın bile maliyeti yüksektir.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Bir NFT'nin aktarımını gerçekleştirin.
         `msg.sender` mevcut sahip, yetkili bir operatör veya bu NFT için onaylanmış
         adres değilse hata verir. (NOT: `msg.sender`'a özel fonksiyonda izin verilmez, bu yüzden `_sender`'ı geçin.)
         `_to` sıfır adresi ise hata verir.
         `_from` mevcut sahip değilse hata verir.
         `_tokenId` geçerli bir NFT değilse hata verir.
    """
```

Jetonları aktarmanın iki yolu olduğu için (normal ve güvenli) bu dahili fonksiyona sahibiz ancak denetimi kolaylaştırmak için kodda yalnızca tek bir konum istiyoruz.

```python
    # Check requirements
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Throws if `_to` is the zero address
    assert _to != ZERO_ADDRESS
    # Clear approval. Throws if `_from` is not the current owner
    self._clearApproval(_from, _tokenId)
    # Remove NFT. Throws if `_tokenId` is not a valid NFT
    self._removeTokenFrom(_from, _tokenId)
    # Add NFT
    self._addTokenTo(_to, _tokenId)
    # Log the transfer
    log Transfer(_from, _to, _tokenId)
```

Vyper'da bir olay yayınlamak için bir `log` ifadesi kullanırsınız ([daha fazla ayrıntı için buraya bakın](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).

#### Aktarım Fonksiyonları {#transfer-funs}

```python

### AKTARIM FONKSİYONLARI ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev `msg.sender` mevcut sahip, yetkili bir operatör veya bu NFT için onaylanmış
         adres değilse hata verir.
         `_from` mevcut sahip değilse hata verir.
         `_to` sıfır adresi ise hata verir.
         `_tokenId` geçerli bir NFT değilse hata verir.
    @notice Çağıran, `_to`'nun NFT'leri alabileceğinden emin olmaktan sorumludur, aksi takdirde
            kalıcı olarak kaybolabilirler.
    @param _from NFT'nin mevcut sahibi.
    @param _to Yeni sahip.
    @param _tokenId Aktarılacak NFT.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Bu fonksiyon, isteğe bağlı bir adrese aktarım yapmanızı sağlar. Adres bir kullanıcı veya jetonların nasıl aktarılacağını bilen bir sözleşme olmadığı sürece, aktardığınız herhangi bir jeton o adreste takılıp kalır ve işe yaramaz hale gelir.

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev Bir NFT'nin mülkiyetini bir adresten başka bir adrese aktarır.
         `msg.sender` mevcut sahip, yetkili bir operatör veya bu NFT için
         onaylanmış adres değilse hata verir.
         `_from` mevcut sahip değilse hata verir.
         `_to` sıfır adresi ise hata verir.
         `_tokenId` geçerli bir NFT değilse hata verir.
         `_to` bir akıllı sözleşme ise, `_to` üzerinde `onERC721Received`'ı çağırır ve
         dönüş değeri `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))` değilse hata verir.
         NOT: bytes4, dolgu ile bytes32 ile temsil edilir
    @param _from NFT'nin mevcut sahibi.
    @param _to Yeni sahip.
    @param _tokenId Aktarılacak NFT.
    @param _data Belirtilen bir formatı olmayan, `_to`'ya yapılan çağrıda gönderilen ek veriler.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Önce transferi yapmakta bir sakınca yok çünkü bir sorun olursa yine de geri döneceğiz, bu yüzden çağrıda yapılan her şey iptal edilecek.

```python
    if _to.is_contract: # `_to`'nun bir sözleşme adresi olup olmadığını kontrol et
```

İlk önce adresin bir sözleşme olup olmadığını kontrol edin (kodu varsa). Değilse, bunun bir kullanıcı adresi olduğunu
varsayın ve kullanıcı jetonu kullanabilecek veya aktarabilecektir. Ama bunun yüzünden yalancı bir
güvenlik duygusuna kapılmayın. Jetonları, özel anahtarı kimsenin bilmediği bir adrese aktarırsanız `safeTransferFrom` ile bile kaybedebilirsiniz.

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

ERC-721 jetonlarını alıp alamayacağını görmek için hedef sözleşmeyi çağırın.

```python
        # Aktarım hedefi 'onERC721Received' uygulamayan bir sözleşme ise hata verir
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

Hedef bir sözleşmeyse, ancak ERC-721 jetonlarını kabul etmeyen (veya bu özel aktarımı kabul etmemeye karar veren) bir sözleşmeyse, işlemi geri alın.

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Bir NFT için onaylanmış adresi ayarlayın veya yeniden onaylayın. Sıfır adresi, onaylanmış bir adres olmadığını gösterir.
         `msg.sender` mevcut NFT sahibi veya mevcut sahibin yetkili bir operatörü değilse hata verir.
         `_tokenId` geçerli bir NFT değilse hata verir. (NOT: Bu, EIP'de yazılmamıştır)
         `_approved` mevcut sahip ise hata verir. (NOT: Bu, EIP'de yazılmamıştır)
    @param _approved Verilen NFT ID'si için onaylanacak adres.
    @param _tokenId Onaylanacak jetonun ID'si.
    """
    owner: address = self.idToOwner[_tokenId]
    # `_tokenId` geçerli bir NFT değilse hata verir
    assert owner != ZERO_ADDRESS
    # `_approved` mevcut sahip ise hata verir
    assert _approved != owner
```

Geleneksel olarak, bir onaylayıcınız olmasını istemiyorsanız, kendinizi değil, sıfır adresini atarsınız.

```python
    # Check requirements
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

Bir onay ayarlamak için, sahibi veya sahibi tarafından yetkilendirilmiş bir operatör olabilirsiniz.

```python
    # Set the approval
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Üçüncü bir taraf ("operatör") için `msg.sender`'ın tüm varlıklarını yönetme onayını etkinleştirir veya devre dışı bırakır.
         Ayrıca ApprovalForAll olayını da yayınlar.
         `_operator`'ın `msg.sender` olması durumunda hata verir. (NOT: Bu, EIP'de yazılmamıştır)
    @notice Bu, göndericinin o anda hiçbir jetona sahip olmasa bile çalışır.
    @param _operator Yetkili operatörler kümesine eklenecek adres.
    @param _approved Operatör onaylanmışsa True, onayı iptal etmek için false.
    """
    # `_operator`'ın `msg.sender` olması durumunda hata verir
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### Yeni Jetonlar Basma ve Mevcut Olanları Yok Etme {#mint-burn}

Sözleşmeyi oluşturan hesap, yeni NFT'leri basmaya yetkili süper kullanıcı olan `minter`'dır. Ancak, onun bile mevcut jetonları yakmasına izin verilmez. Bunu yalnızca mal sahibi veya mal sahibi tarafından yetkilendirilmiş bir varlık yapabilir.

```python
### BASMA VE YAKMA FONKSİYONLARI ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

Bu fonksiyon her zaman `True` döndürür, çünkü işlem başarısız olursa geri alınır.

```python
    """
    @dev Jeton basma fonksiyonu
         `msg.sender` minter değilse hata verir.
         `_to` sıfır adresi ise hata verir.
         `_tokenId`'nin bir sahibi varsa hata verir.
    @param _to Basılan jetonları alacak olan adres.
    @param _tokenId Basılacak jeton kimliği.
    @return İşlemin başarılı olup olmadığını gösteren bir boole değeri.
    """
    # `msg.sender` minter değilse hata verir
    assert msg.sender == self.minter
```

Yalnızca minter (ERC-721 sözleşmesini oluşturan hesap) yeni jetonlar basabilir. Bu, gelecekte minter'ın kimliğini değiştirmek istersek bir sorun yaratabilir. Bir üretim sözleşmesinde, muhtemelen minter'ın minter ayrıcalıklarını başka birine devretmesine izin veren bir fonksiyonun olmasını istersiniz.

```python
    # `_to` sıfır adresi ise hata verir
    assert _to != ZERO_ADDRESS
    # Add NFT. Throws if `_tokenId` is owned by someone
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

Geleneksel olarak, yeni jetonların basımı sıfır adresinden bir aktarım olarak sayılır.

```python

@external
def burn(_tokenId: uint256):
    """
    @dev Belirli bir ERC721 jetonunu yakar.
         `msg.sender` mevcut sahip, yetkili bir operatör veya bu NFT için onaylanmış
         adres değilse hata verir.
         `_tokenId` geçerli bir NFT değilse hata verir.
    @param _tokenId Yakılacak ERC721 jetonunun uint256 id'si.
    """
    # Check requirements
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # `_tokenId` geçerli bir NFT değilse hata verir
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

Bir jetonu aktarmasına izin verilen herkesin onu yakmasına izin verilir. Bir yakma işlemi, sıfır adresine aktarıma eş değer görünse de, sıfır adresi aslında jetonu almaz. Bu, jeton için kullanılan tüm depolama alanını boşaltmamızı sağlar ve bu da işlemin gaz maliyetini azaltabilir.

## Bu Sözleşmeyi Kullanma {#using-contract}

Solidity'nin aksine, Vyper'ın kalıtımı yoktur. Bu, kodu daha net hâle getirmek ve dolayısıyla güvenliğini sağlamak için bilinçli bir tasarım seçimidir. Yani kendi Vyper ERC-721 sözleşmenizi oluşturmak için bu
sözleşmeyi alır ve istediğiniz iş mantığını uygulamak için değiştirirsiniz.

## Sonuç {#conclusion}

İnceleme için, bu sözleşmedeki en önemli fikirlerden bazıları şunlardır:

- ERC-721 jetonlarını güvenli bir aktarımla almak için sözleşmelerin `ERC721Receiver` arayüzünü uygulaması gerekir.
- Güvenli aktarım kullansanız bile, özel anahtarı bilinmeyen bir adrese gönderirseniz jetonlar takılıp kalabilir.
- Bir işlemle ilgili bir sorun olduğunda yalnızca bir hata değeri döndürmek yerine çağrıyı `geri almak` iyi bir fikirdir.
- ERC-721 jetonları, bir sahibi olduğunda var olurlar.
- Bir NFT'yi aktarma yetkisine sahip olmanın üç yolu vardır. Sahibi olabilir, belirli bir jeton için onay alabilir
  veya sahibinin tüm jetonları için operatör olabilirsiniz.
- Geçmiş olaylar sadece blokzincirin dışında görülebilir. Blokzincirin içinde çalışan kod onları göremez.

Artık güvenli Vyper sözleşmelerini uygulayabilirsiniz.

[Çalışmalarımdan daha fazlası için buraya bakın](https://cryptodocguy.pro/).

