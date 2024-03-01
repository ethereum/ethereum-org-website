---
title: "Vyper ERC-721 Sözleşmesine Genel Bakış"
description: Ryuya Nakamura'nın ERC-721 sözleşmesi ve nasıl çalıştığı
author: Ori Pomerantz
lang: tr
tags:
  - "vyper"
  - "erc-721"
  - "python"
skill: beginner
published: 2021-04-01
---

## Giriş {#introduction}

[ERC-721](/developers/docs/standards/tokens/erc-721/) standardı, Değiştirilemez Token'ların (NFT) sahipliğini tutmak için kullanılır. [ERC-20](/developers/docs/standards/tokens/erc-20/) token'ları, bireysel token'lar arasında bir fark olmadığı için bir emtia gibidir. Bunun aksine ERC-721 token'ları, farklı [kedi karikatürleri](https://www.cryptokitties.co/) veya farklı gayrimenkul parçalarına verilen unvanlar gibi benzer ancak aynı olmayan varlıklar için tasarlanmıştır.

Bu makalede [Ryuya Nakamura'nın ERC-721 sözleşmesini](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) analiz edeceğiz. Bu sözleşme, güvensiz kod yazmayı Solidity'de olduğundan daha zorlaştırmak için dizayn edilmiş Python benzeri bir sözleşme dili olan [Vyper](https://vyper.readthedocs.io/en/latest/index.html) ile yazılmıştır.

## Sözleşme {#contract}

```python
# @dev Implementation of ERC-721 non-fungible token standard.
# @author Ryuya Nakamura (@nrryuya)
# Modified from: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Python'da olduğu gibi Vyper'da da yorumlar bir hash (`#`) ile başlar ve satırın sonuna kadar devam eder. `@<keyword>` içeren yorumlar insan tarafından okunabilir belgeler oluşturmak için [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) tarafından kullanılır.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

ERC-721 arayüzü, Vyper dilinde yerleşiktir. [Kod tanımlamasını burada görebilirsiniz](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py). Arayüz tanımı Vyper yerine Python'da yazılmıştır, çünkü arayüzler yalnızca blok zinciri içinde değil, blok zincirine Python'da yazılabilen harici bir istemciden bir işlem gönderirken de kullanılır.

İlk satır, arayüzü içe aktarır ve ikincisi onu burada uyguladığımızı belirtir.

### ERC721Receiver Arayüzü {#receiver-interface}

```python
# Interface for the contract called by safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 iki tür aktarımı destekler:

- `transferFrom`, gönderenin herhangi bir hedef adresi belirlemesine izin verir ve transfer sorumluluğunu gönderene yükler. Bu, geçersiz bir adrese transfer yapabileceğiniz anlamına gelir, bu durumda NFT tamamen kaybolur.
- Hedef adresin bir sözleşme olduğunu kontrol eden `safeTransferFrom`. Eğer öyleyse, ERC-721 sözleşmesi alıcı sözleşmeye NFT'yi almak isteyip istemediğini sorar.

`safeTransferFrom` isteklerini yanıtlamak için bir alıcı sözleşmesinin `ERC721Receiver` uygulaması gerekir.

```python
            _operator: address,
            _from: address,
```

`_from` adresi token'ın mevcut sahibidir. `_operator` adresi, transferi talep eden adrestir (ödenekler nedeniyle bu ikisi aynı olmayabilir).

```python
            _tokenId: uint256,
```

ERC-721 token ID'leri 256 bittir. Tipik olarak, token'ın temsil ettiği şeyin bir açıklamasının hash edilmesiyle oluşturulurlar.

```python
            _data: Bytes[1024]
```

İstek, 1024 bayta kadar kullanıcı verisine sahip olabilir.

```python
        ) -> bytes32: view
```

Bir sözleşmenin yanlışlıkla bir transferi kabul ettiği durumları önlemek için, dönüş değeri bir boolean değil, belirli bir değere sahip 256 bittir.

Bu işlev bir `view`'dur, yani blok zincirinin durumunu okuyabilir, ancak değiştiremez.

### Etkinlikler {#events}

[Olaylar](https://media.consensys.net/technical-introduction-to-events-and-logs-in-ethereum-a074d65dd61e) blok zincirinin dışındaki kullanıcıları ve sunucuları bilgilendirmek için yayınlanır. Olayların içeriğinin blok zincirindeki sözleşmeler için mevcut olmadığını unutmayın.

```python
# @dev Emits when ownership of any NFT changes by any mechanism. This event emits when NFTs are
#      created (`from` == 0) and destroyed (`to` == 0). Exception: during contract creation, any
#      number of NFTs may be created and assigned without emitting Transfer. At the time of any
#      transfer, the approved address for that NFT (if any) is reset to none.
# @param _from Sender of NFT (if address is zero address it indicates token creation).
# @param _to Receiver of NFT (if address is zero address it indicates token destruction).
# @param _tokenId The NFT that got transferred.
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

Bu, bir miktar yerine bir `tokenId` bildirmemiz dışında, ERC-20 Transfer olayına benzer. Hiç kimse sıfır adresine sahip değildir, bu nedenle geleneksel olarak onu token'ların oluşturulmasını ve yok edilmesini bildirmek için kullanırız.

```python
# @dev This emits when the approved address for an NFT is changed or reaffirmed. The zero
#      address indicates there is no approved address. When a Transfer event emits, this also
#      indicates that the approved address for that NFT (if any) is reset to none.
# @param _owner Owner of NFT.
# @param _approved Address that we are approving.
# @param _tokenId NFT which we are approving.
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

ERC-721 onayı, ERC-20 ödeneğine benzer. Belirli bir adresin belirli bir token'ı aktarmasına izin verilir. Bu, sözleşmelerin bir token'ı kabul ettiklerinde yanıt vermeleri için bir mekanizma sağlar. Sözleşmeler olayları dinleyemez, bu nedenle token'ı onlara aktarırsanız bunu "bilmezler". Bu şekilde, mal sahibi önce bir onay gönderir ve ardından sözleşmeye bir istek gönderir: "X token'ını aktarmanız için onay verdim, lütfen yapın...".

Bu, ERC-721 standardını ERC-20 standardına benzer kılmak için yapılmış bir tasarım tercihidir. ERC-721 token'ları değiştirilemez olduğundan, bir sözleşme token'ın mülkiyetine bakarak belirli bir token aldığını da belirleyebilir.

```python
# @dev This emits when an operator is enabled or disabled for an owner. The operator can manage
#      all NFTs of the owner.
# @param _owner Owner of NFT.
# @param _operator Address to which we are setting operator rights.
# @param _approved Status of operator rights(true if operator rights are given and false if
# revoked).
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

Bir hesabın, adeta bir vekaletname gibi belirli bir türdeki (belirli bir sözleşmeyle yönetilenler) tüm simgelerini yönetebilen bir _operatöre_ sahip olmak bazen yararlıdır. Örneğin, altı aydır iletişime geçmediğimi kontrol eden ve varsa mal varlığımı mirasçılarıma dağıtan bir sözleşmeye öyle bir yetki vermek isteyebilirim (eğer bir sözleşme bunu isterse, bir işlem tarafından çağrılmadan herhangi bir şey yapamaz). ERC-20'de bir miras sözleşmesine sadece yüksek bir ödenek verebiliriz ancak bu, ERC-721 için işe yaramaz çünkü token'lar değiştirilebilir değildir. Bu, bunun dengidir.

`approved` değeri bize etkinliğin bir onay için mi yoksa bir onayın geri çekilmesi için mi olduğunu söyler.

### Durum Değişkenleri {#state-vars}

Bu değişkenler, token'ların mevcut durumunu içerir: hangilerinin mevcut olduğu ve onlara kimin sahip olduğu. Bunların çoğu, [iki tür arasında var olan tek yönlü eşleştirmeler](https://vyper.readthedocs.io/en/latest/types.html#mappings) olan `HashMap` nesneleridir.

```python
# @dev Mapping from NFT ID to the address that owns it.
idToOwner: HashMap[uint256, address]

# @dev Mapping from NFT ID to approved address.
idToApprovals: HashMap[uint256, address]
```

Ethereum'daki kullanıcı ve sözleşme kimlikleri 160 bitlik adreslerle temsil edilir. Bu iki değişken, token ID'lerinden sahiplerine ve bunları aktarmak için onaylananlara eşleştirilir (her biri için en fazla bir tane). Ethereum'da, başlatılmamış veriler her zaman sıfırdır, bu nedenle herhangi bir sahip veya onaylanmış aktarıcı yoksa, o token'ın değeri sıfırdır.

```python
# @dev Mapping from owner address to count of his tokens.
ownerToNFTokenCount: HashMap[address, uint256]
```

Bu değişken, her sahip için token sayısını tutar. Sahiplerden token'lara eşleştirme yoktur, bu nedenle belirli bir sahibin sahip olduğu token'ları tanımlamanın tek yolu blok zincirinin olay geçmişine bakmak ve uygun `Transfer` olaylarını görmektir. Bu değişkeni, tüm NFT'lere ne zaman sahip olduğumuzu ve zamanda daha fazla aramamıza gerek olmadığını bilmek için kullanabiliriz.

Bu algoritmanın yalnızca kullanıcı arayüzleri ve harici sunucular için çalıştığını unutmayın. Blok zincirinde çalışan kod, geçmiş olayları okuyamaz.

```python
# @dev Mapping from owner address to mapping of operator addresses.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Bir hesap birden fazla operatöre sahip olabilir. Basit bir `HashMap` onları takip etmek için yetersizdir, çünkü her anahtar tek bir değere bağlıdır. Bunun yerine, değer olarak `HashMap[address, bool]` kullanabilirsiniz. Varsayılan olarak, her adresin değeri `False`'dur, bu da bir operatör olmadığı anlamına gelir. Değerleri gerektiği gibi `True` olarak ayarlayabilirsiniz.

```python
# @dev Address of minter, who can mint a token
minter: address
```

Yeni token'lar bir şekilde oluşturulmalıdır. Bu sözleşmede bunu yapmasına izin verilen tek bir varlık vardır: `minter`. Bu, örneğin bir oyun için yeterli olabilir. Diğer amaçlar için daha karmaşık bir iş mantığı oluşturmak gerekebilir.

```python
# @dev Mapping of interface id to bool about whether or not it's supported
supportedInterfaces: HashMap[bytes32, bool]

# @dev ERC165 interface ID of ERC165
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ERC165 interface ID of ERC721
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165), uygulamaların kendisiyle nasıl iletişim kurabileceğini ve hangi ERC'lere uyduğunu ifşa etmek için bir sözleşme için bir mekanizma belirtir. Bu durumda sözleşme ERC-165 ve ERC-721'e uygundur.

### Fonksiyonlar {#functions}

Bunlar, ERC-721'i gerçekten uygulayan fonksiyonlardır.

#### Yapıcı {#constructor}

```python
@external
def __init__():
```

Vyper'da, Python'da olduğu gibi yapıcı fonksiyona `__init__` adı verilir.

```python
    """
    @dev Contract constructor.
    """
```

Python'da ve Vyper'da, çok satırlı bir dize (`"""` ile başlayan ve biten) belirterek ve onu hiçbir şekilde kullanmayarak bir yorum oluşturabilirsiniz. Bu yorumlar ayrıca [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) içerebilir.

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

Durum değişkenlerine erişmek için `self.<variable name>` kullanırsınız (yine Python'da olduğu gibi).

#### Fonksiyonları gör {#views}

Bunlar blok zincirinin durumunu değiştirmeyen fonksiyonlardır ve bu nedenle dışarıdan çağrıldıklarında ücretsiz olarak yürütülebilirler. Görünüm fonksiyonları bir sözleşme ile çağrılırsa, yine de her düğümde yürütülmeleri gerekir ve bu nedenle gaz harcarlar.

```python
@view
@external
```

Bir `@` işaretiyle başlayan bir fonksiyon tanımından önceki bu anahtar kelimelere _dekorasyon_ denir. Bir fonksiyonun çağrılabileceği durumları belirtirler.

- `@view` bu fonksiyonun bir view olduğunu belirtir.
- `@external` bu fonksiyonun işlemler ve diğer sözleşmeler tarafından çağrılabileceğini belirtir.

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

Python'un aksine, Vyper [statik türlendirilmiş bir dildir](https://wikipedia.org/wiki/Type_system#Static_type_checking). [Veri türünü](https://vyper.readthedocs.io/en/latest/types.html) tanımlamadan bir değişken veya fonksiyon parametresi bildiremezsiniz. Bu durumda giriş parametresi 256 bitlik bir değer olan `bytes32`'dir, (256 bit, [Ethereum Sanal Makinesi](/developers/docs/evm/)'nin yerel kelime boyutudur). Çıktı boolean bir değerdir. Kural olarak, fonksiyon parametrelerinin adları bir alt çizgi (`_`) ile başlar.

```python
    """
    @dev Interface identification is specified in ERC-165.
    @param _interfaceID Id of the interface
    """
    return self.supportedInterfaces[_interfaceID]
```

Değeri, yapıcıda (`__init__`) belirlenmiş olan `self.supportedInterfaces` HashMap'inden döndürün.

```python
### VIEW FUNCTIONS ###
```

Bunlar, token'lar hakkında bilgileri kullanıcılara ve diğer sözleşmelere sunan görüntüleme fonksiyonlarıdır.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev Returns the number of NFTs owned by `_owner`.
         Throws if `_owner` is the zero address. NFTs assigned to the zero address are considered invalid.
    @param _owner Address for whom to query the balance.
    """
    assert _owner != ZERO_ADDRESS
```

Bu satır `_owner`'ın sıfır olmadığını [teyit eder](https://vyper.readthedocs.io/en/latest/statements.html#assert). Eğer öyleyse, bir hata vardır ve işlem geri alınır.

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev Returns the address of the owner of the NFT.
         Throws if `_tokenId` is not a valid NFT.
    @param _tokenId The identifier for an NFT.
    """
    owner: address = self.idToOwner[_tokenId]
    # Throws if `_tokenId` is not a valid NFT
    assert owner != ZERO_ADDRESS
    return owner
```

Ethereum Sanal Makinesinde (evm), içinde depolanmış bir değeri olmayan herhangi bir depolama sıfırdır. Eğer `_tokenId` yerinde bir token yoksa `self.idToOwner[_tokenId]` değeri sıfırdır. Bu durumda fonksiyon geri dönüş yapar.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Get the approved address for a single NFT.
         Throws if `_tokenId` is not a valid NFT.
    @param _tokenId ID of the NFT to query the approval of.
    """
    # Throws if `_tokenId` is not a valid NFT
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

`getApproved`'un sıfır _döndürebileceğini_ unutmayın. Eğer token geçerliyse `self.idToApprovals[_tokenId]` döndürür. Onaylayan yoksa bu değer sıfırdır.

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev Checks if `_operator` is an approved operator for `_owner`.
    @param _owner The address that owns the NFTs.
    @param _operator The address that acts on behalf of the owner.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

Bu fonksiyon, `_operator`'un bu sözleşmedeki tüm `_owner` token'larını yönetmesine izin verilip verilmediğini kontrol eder. Birden fazla operatör olabileceğinden, bu iki seviyeli bir HashMap'tir.

#### Transfer Yardımcı Fonksiyonları {#transfer-helpers}

Bu fonksiyonlar, token'ları transfer etmenin veya yönetmenin parçası olan işlemleri uygular.

```python

### TRANSFER FUNCTION HELPERS ###

@view
@internal
```

Bu dekorasyon, `@internal`, fonksiyona yalnızca aynı sözleşmedeki diğer fonksiyonlardan erişilebilir olduğu anlamına gelir. Kural olarak, bu fonksiyon adları ayrıca bir alt çizgi (`_`) ile başlar.

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev Returns whether the given spender can transfer a given token ID
    @param spender address of the spender to query
    @param tokenId uint256 ID of the token to be transferred
    @return bool whether the msg.sender is approved for the given token ID,
        is an operator of the owner, or is the owner of the token
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

Bir adresin bir token'ı transfer etmesine izin vermenin üç yolu vardır:

1. Adres, token'ın sahibidir
2. Adresin bu token'ı harcaması onaylanmıştır
3. Adres, token'ın sahibi için bir operatördür

Durumu değiştirmediği için yukarıdaki fonksiyon bir görünüm olabilir. İşletim maliyetlerini azaltmak için, bir görünüm _olabilen_ herhangi bir fonksiyon bir görünüm _olmalıdır_.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Add a NFT to a given address
         Throws if `_tokenId` is owned by someone.
    """
    # Throws if `_tokenId` is owned by someone
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # Change the owner
    self.idToOwner[_tokenId] = _to
    # Change count tracking
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Remove a NFT from a given address
         Throws if `_from` is not the current owner.
    """
    # Throws if `_from` is not the current owner
    assert self.idToOwner[_tokenId] == _from
    # Change the owner
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # Change count tracking
    self.ownerToNFTokenCount[_from] -= 1
```

Transfer ile ilgili bir sorun olduğunda isteği geri çeviriyoruz.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Clear an approval of a given address
         Throws if `_owner` is not the current owner.
    """
    # Throws if `_owner` is not the current owner
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # Reset approvals
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

Değeri sadece gerekirse değiştirin. Durum değişkenleri depolamada yaşar. Depolamaya yazmak, EVM'nin (Ethereum Sanal Makinesi) yaptığı en pahalı işlemlerden biridir ([gaz](/developers/docs/gas/) açısından). Bu nedenle en aza indirmek iyi bir fikirdir, mevcut değeri yazmanın bile maliyeti yüksektir.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Execute transfer of a NFT.
         Throws unless `msg.sender` is the current owner, an authorized operator, or the approved
         address for this NFT. (NOTE: `msg.sender` not allowed in private function so pass `_sender`.)
         Throws if `_to` is the zero address.
         Throws if `_from` is not the current owner.
         Throws if `_tokenId` is not a valid NFT.
    """
```

Token'ları aktarmanın iki yolu olduğu için (düzenli ve güvenli) bu dahili fonksiyona sahibiz ancak denetimi kolaylaştırmak için kodda yalnızca tek bir konum istiyoruz.

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

Vyper'da bir olay yaymak için `log` ifadesi kullanırsınız ([daha fazla detay için buraya bakınız](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).

#### Transfer Fonksiyonları {#transfer-funs}

```python

### TRANSFER FUNCTIONS ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev Throws unless `msg.sender` is the current owner, an authorized operator, or the approved
         address for this NFT.
         Throws if `_from` is not the current owner.
         Throws if `_to` is the zero address.
         Throws if `_tokenId` is not a valid NFT.
    @notice The caller is responsible to confirm that `_to` is capable of receiving NFTs or else
            they maybe be permanently lost.
    @param _from The current owner of the NFT.
    @param _to The new owner.
    @param _tokenId The NFT to transfer.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Bu fonksiyon, isteğe bağlı bir adrese aktarım yapmanızı sağlar. Adres bir kullanıcı veya token'ların nasıl transfer edileceğini bilen bir sözleşme olmadığı sürece, transfer ettiğiniz herhangi bir token o adrese takılıp işe yaramaz olacaktır.

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev Transfers the ownership of an NFT from one address to another address.
         Throws unless `msg.sender` is the current owner, an authorized operator, or the
         approved address for this NFT.
         Throws if `_from` is not the current owner.
         Throws if `_to` is the zero address.
         Throws if `_tokenId` is not a valid NFT.
         If `_to` is a smart contract, it calls `onERC721Received` on `_to` and throws if
         the return value is not `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
         NOTE: bytes4 is represented by bytes32 with padding
    @param _from The current owner of the NFT.
    @param _to The new owner.
    @param _tokenId The NFT to transfer.
    @param _data Additional data with no specified format, sent in call to `_to`.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Önce transferi yapmakta bir sakınca yok çünkü bir sorun olursa yine geri döneceğiz, bu yüzden çağrıda yapılan her şey iptal edilecek.

```python
    if _to.is_contract: # check if `_to` is a contract address
```

İlk önce adresin bir sözleşme olup olmadığını kontrol edin (kodu varsa). Değilse, bunun bir kullanıcı adresi olduğunu varsayın ve kullanıcı token'ı kullanabilecek veya aktarabilecektir. Ama bunun yüzünden yalancı bir güvenlik duygusuna kapılmayın. Token'ları, özel anahtarı kimsenin bilmediği bir adrese aktarırsanız `safeTransferFrom` ile bile kaybedebilirsiniz.

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

ERC-721 token'larını alıp alamayacağını görmek için hedef sözleşmeyi çağırın.

```python
        # Throws if transfer destination is a contract which does not implement 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

Hedef bir sözleşmeyse, ancak ERC-721 token'larını kabul etmeyen (veya bu özel aktarımı kabul etmemeye karar veren) bir sözleşmeyse, geri döndürün.

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Set or reaffirm the approved address for an NFT. The zero address indicates there is no approved address.
         Throws unless `msg.sender` is the current NFT owner, or an authorized operator of the current owner.
         Throws if `_tokenId` is not a valid NFT. (NOTE: This is not written the EIP)
         Throws if `_approved` is the current owner. (NOTE: This is not written the EIP)
    @param _approved Address to be approved for the given NFT ID.
    @param _tokenId ID of the token to be approved.
    """
    owner: address = self.idToOwner[_tokenId]
    # Throws if `_tokenId` is not a valid NFT
    assert owner != ZERO_ADDRESS
    # Throws if `_approved` is the current owner
    assert _approved != owner
```

Normalde, bir onaylayıcıya sahip olmak istemiyorsanız sıfır adresini kendiniz atmazsınız.

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
    @dev Enables or disables approval for a third party ("operator") to manage all of
         `msg.sender`'s assets. It also emits the ApprovalForAll event.
         Throws if `_operator` is the `msg.sender`. (NOTE: This is not written the EIP)
    @notice This works even if sender doesn't own any tokens at the time.
    @param _operator Address to add to the set of authorized operators.
    @param _approved True if the operators is approved, false to revoke approval.
    """
    # Throws if `_operator` is the `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### Yeni Token'lar Basma ve Mevcut Olanları Yok Etme {#mint-burn}

Sözleşmeyi oluşturan hesap, yeni NFT'leri basmaya yetkili süper kullanıcı olan `minter`'dır. Ancak, onun bile mevcut token'ları yakmasına izin verilmez. Bunu yalnızca mal sahibi veya mal sahibi tarafından yetkilendirilmiş bir varlık yapabilir.

```python
### MINT & BURN FUNCTIONS ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

Bu fonksiyon her zaman `True` döndürür, çünkü işlem başarısız olursa geri alınır.

```python
    """
    @dev Function to mint tokens
         Throws if `msg.sender` is not the minter.
         Throws if `_to` is zero address.
         Throws if `_tokenId` is owned by someone.
    @param _to The address that will receive the minted tokens.
    @param _tokenId The token id to mint.
    @return A boolean that indicates if the operation was successful.
    """
    # Throws if `msg.sender` is not the minter
    assert msg.sender == self.minter
```

Yalnızca "minter" (ERC-721 sözleşmesini oluşturan hesap) yeni token'lar basabilir. Bu, "minter"ın kimliğini değiştirmek istersek gelecekte bir sorun yaratabilir. Bir üretim sözleşmesinde, muhtemelen minter'ın minter ayrıcalıklarını başka birine devretmesine izin veren bir fonksiyonun olmasını istersiniz.

```python
    # Throws if `_to` is zero address
    assert _to != ZERO_ADDRESS
    # Add NFT. Throws if `_tokenId` is owned by someone
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

Geleneksel olarak, yeni token'ların basımı sıfır adresinden bir transfer olarak sayılır.

```python

@external
def burn(_tokenId: uint256):
    """
    @dev Burns a specific ERC721 token.
         Throws unless `msg.sender` is the current owner, an authorized operator, or the approved
         address for this NFT.
         Throws if `_tokenId` is not a valid NFT.
    @param _tokenId uint256 id of the ERC721 token to be burned.
    """
    # Check requirements
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # Throws if `_tokenId` is not a valid NFT
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

Bir token'ı transfer etmesine izin verilen herkesin onu yakmasına izin verilir. Bir yakma işlemi, sıfır adresine aktarıma eş değer görünse de, sıfır adresi aslında token'ı almaz. Bu, token için kullanılan tüm depolama alanını boşaltmamızı sağlar ve bu da işlemin gasz maliyetini azaltabilir.

# Bu Sözleşmeyi Kullanmak {#using-contract}

Solidity'nin aksine, Vyper'ın kalıtımı yoktur. Bu, kodu daha net hâle getirmek ve dolayısıyla güvenliğini sağlamak için bilinçli bir tasarım seçimidir. Bu nedenle, kendi Vyper ERC-721 sözleşmenizi oluşturmak için [bu sözleşmeyi](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) alın ve istediğiniz iş mantığını uygulamak için değiştirin.

# Sonuç {#conclusion}

İnceleme için, bu sözleşmedeki en önemli fikirlerden bazıları şunlardır:

- ERC-721 token'larını güvenli bir aktarımla almak için sözleşmelerin `ERC721Receiver` arayüzünü uygulaması gerekir.
- Güvenli transfer kullansanız bile, özel anahtarı bilinmeyen bir adrese gönderirseniz token'lar takılıp kalabilir.
- Bir operasyonla ilgili bir sorun olduğunda çağrıyı `revert` etmek, bir başarısızlık değeri döndürmekten daha iyi bir fikirdir.
- ERC-721 token'ları, bir sahibi olduğunda var olurlar.
- Bir NFT'yi transfer etme yetkisine sahip olmanın üç yolu vardır. Sahibi olabilir, belirli bir token için onay alabilir veya sahibinin tüm token'ları için operatör olabilirsiniz.
- Geçmiş olaylar sadece blok zincirinin dışında görülebilir. Blok zincirinin içinde çalışan kod onları göremez.

Artık güvenli Vyper sözleşmelerini uygulayabilirsiniz.
