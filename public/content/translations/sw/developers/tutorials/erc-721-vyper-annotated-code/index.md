---
title: "Mwongozo wa Mkataba wa ERC-721 wa Vyper"
description: Mkataba wa ERC-721 wa Ryuya Nakamura na jinsi unavyofanya kazi
author: Ori Pomerantz
lang: sw
tags: [ "vyper", "erc-721", "python" ]
skill: beginner
published: 2021-04-01
---

## Utangulizi {#introduction}

Kiwango cha [ERC-721](/developers/docs/standards/tokens/erc-721/) kinatumika kushikilia umiliki wa Tokeni Zisizobadilishika (NFT).
Tokeni za [ERC-20](/developers/docs/standards/tokens/erc-20/) hufanya kazi kama bidhaa, kwa sababu hakuna tofauti kati ya tokeni binafsi.
Tofauti na hiyo, tokeni za ERC-721 zimeundwa kwa ajili ya mali zinazofanana lakini si sawa, kama vile katuni
za paka tofauti
au hati miliki za vipande tofauti vya mali isiyohamishika.

Katika makala haya tutachambua [mkataba wa ERC-721 wa Ryuya Nakamura](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy).
Mkataba huu umeandikwa kwa [Vyper](https://vyper.readthedocs.io/en/latest/index.html), lugha ya mkataba inayofanana na Python iliyoundwa ili iwe
vigumu zaidi kuandika msimbo usio salama kuliko ilivyo katika Solidity.

## Mkataba {#contract}

```python
# @dev Utekelezaji wa kiwango cha tokeni isiyobadilishika ya ERC-721.
# @author Ryuya Nakamura (@nrryuya)
# Imebadilishwa kutoka: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Maoni katika Vyper, kama ilivyo katika Python, huanza na alama ya reli (`#`) na kuendelea hadi mwisho wa mstari. Maoni yanayojumuisha
`@<keyword>` hutumiwa na [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) kuzalisha nyaraka
zinazoweza kusomwa na binadamu.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

Kiolesura cha ERC-721 kimejengewa ndani ya lugha ya Vyper.
[Unaweza kuona ufafanuzi wa msimbo hapa](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py).
Ufafanuzi wa kiolesura umeandikwa kwa Python, badala ya Vyper, kwa sababu violesura hutumika si tu ndani ya
mnyororo wa bloku, bali pia wakati wa kutuma muamala kwenye mnyororo wa bloku kutoka kwa wateja wa nje, ambao unaweza kuandikwa kwa
Python.

Mstari wa kwanza huingiza kiolesura, na wa pili unabainisha kuwa tunakitekeleza hapa.

### Kiolesura cha ERC721Receiver {#receiver-interface}

```python
# Kiolesura cha mkataba unaoitwa na safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 inasaidia aina mbili za uhamishaji:

- `transferFrom`, ambayo inamruhusu mtumaji kubainisha anwani yoyote ya marudio na kuweka jukumu
  la uhamishaji kwa mtumaji. Hii ina maana kwamba unaweza kuhamisha kwenda anwani batili, ambapo
  NFT inapotea kabisa.
- `safeTransferFrom`, ambayo huangalia kama anwani ya marudio ni mkataba. Ikiwa ndivyo, mkataba wa ERC-721
  huuliza mkataba mpokeaji kama unataka kupokea NFT.

Ili kujibu maombi ya `safeTransferFrom`, mkataba mpokeaji unapaswa kutekeleza `ERC721Receiver`.

```python
            _operator: address,
            _from: address,
```

Anwani ya `_from` ni mmiliki wa sasa wa tokeni. Anwani ya `_operator` ndiyo
iliyoitisha uhamishaji (hizi mbili zinaweza zisiwe sawa, kwa sababu ya posho).

```python
            _tokenId: uint256,
```

Vitambulisho vya tokeni za ERC-721 vina biti 256. Kwa kawaida huundwa kwa kuhashi maelezo ya chochote
kinachowakilishwa na tokeni.

```python
            _data: Bytes[1024]
```

Ombi linaweza kuwa na baiti hadi 1024 za data ya mtumiaji.

```python
        ) -> bytes32: view
```

Ili kuzuia visa ambapo mkataba unakubali uhamishaji kimakosa, thamani ya kurejesha si ya Boolean,
bali ni biti 256 zenye thamani maalum.

Kazi hii ni `view`, ambayo ina maana inaweza kusoma hali ya mnyororo wa bloku, lakini si kuibadilisha.

### Matukio {#events}

[Matukio](https://media.consensys.net/technical-introduction-to-events-and-logs-in-ethereum-a074d65dd61e)
hutolewa ili kuwajulisha watumiaji na seva zilizo nje ya mnyororo wa bloku kuhusu matukio. Kumbuka kwamba maudhui ya matukio
hayapatikani kwa mikataba kwenye mnyororo wa bloku.

```python
# @dev Hutoa wakati umiliki wa NFT yoyote unapobadilika kwa utaratibu wowote. Tukio hili hutolewa wakati NFTs
#      zinapoundwa (`from` == 0) na kuharibiwa (`to` == 0). Isipokuwa: wakati wa uundaji wa mkataba, idadi
#      yoyote ya NFT inaweza kuundwa na kugawiwa bila kutoa Transfer. Wakati wa uhamishaji
#      wowote, anwani iliyoidhinishwa kwa NFT hiyo (ikiwa ipo) huwekwa upya kuwa hakuna.
# @param _from Mtumaji wa NFT (kama anwani ni anwani sifuri inaashiria uundaji wa tokeni).
# @param _to Mpokeaji wa NFT (kama anwani ni anwani sifuri inaashiria uharibifu wa tokeni).
# @param _tokenId NFT iliyohamishwa.
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

Hili ni sawa na tukio la Uhamishaji wa ERC-20, isipokuwa kwamba tunaripoti `tokenId` badala ya kiasi.
Hakuna anayemiliki anwani sifuri, kwa hivyo kwa kawaida tunaitumia kuripoti uundaji na uharibifu wa tokeni.

```python
# @dev Hii hutolewa wakati anwani iliyoidhinishwa kwa NFT inapobadilishwa au kuthibitishwa tena. Anwani sifuri
#      inaonyesha hakuna anwani iliyoidhinishwa. Tukio la Uhamishaji linapotolewa, hii pia
#      inaonyesha kwamba anwani iliyoidhinishwa kwa NFT hiyo (ikiwa ipo) huwekwa upya kuwa hakuna.
# @param _owner Mmiliki wa NFT.
# @param _approved Anwani tunayoidhinisha.
# @param _tokenId NFT tunayoidhinisha.
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

Idhini ya ERC-721 inafanana na posho ya ERC-20. Anwani maalum inaruhusiwa kuhamisha tokeni
maalum. Hii inatoa utaratibu kwa mikataba kujibu wanapokubali tokeni. Mikataba haiwezi
kusikiliza matukio, kwa hivyo ukihamisha tokeni kwao tu "hawajui" kuihusu. Kwa njia hii,
mmiliki kwanza huwasilisha idhini kisha hutuma ombi kwa mkataba: "Nimekuidhinisha uhamishe tokeni
X, tafadhali fanya ...".

Hii ni chaguo la muundo ili kufanya kiwango cha ERC-721 kifanane na kiwango cha ERC-20. Kwa sababu
tokeni za ERC-721 hazibadiliki, mkataba unaweza pia kutambua kuwa umepata tokeni maalum kwa
kuangalia umiliki wa tokeni.

```python
# @dev Hii hutolewa wakati mwendeshaji anapowezeshwa au kuzimwa kwa mmiliki. Mwendeshaji anaweza kusimamia
#      NFT zote za mmiliki.
# @param _owner Mmiliki wa NFT.
# @param _operator Anwani ambayo tunaweka haki za mwendeshaji.
# @param _approved Hali ya haki za mwendeshaji (kweli ikiwa haki za mwendeshaji zimetolewa na uongo ikiwa
# zimefutwa).
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

Wakati mwingine ni muhimu kuwa na _operator_ anayeweza kusimamia tokeni zote za akaunti za aina fulani (zile zinazosimamiwa na
mkataba maalum), sawa na mamlaka ya uwakili. Kwa mfano, ninaweza kutaka kutoa mamlaka kama hayo kwa mkataba unaoangalia ikiwa
sijauwasiliana nao kwa miezi sita, na ikiwa ni hivyo unagawanya mali zangu kwa warithi wangu (kama mmoja wao ataomba, mikataba
haiwezi kufanya chochote bila kuitwa na muamala). Katika ERC-20 tunaweza kutoa posho kubwa kwa mkataba wa urithi,
lakini hilo halifanyi kazi kwa ERC-721 kwa sababu tokeni hazibadiliki. Hii ni sawa na hiyo.

Thamani ya `approved` inatuambia kama tukio ni la idhini, au uondoaji wa idhini.

### Vigezo vya Hali {#state-vars}

Vigezo hivi vina hali ya sasa ya tokeni: ni zipi zinapatikana na nani anazimiliki. Nyingi za hizi
ni vitu vya `HashMap`, [ramani za mwelekeo mmoja ambazo zipo kati ya aina mbili](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev Ramani kutoka kitambulisho cha NFT kwenda kwenye anwani inayomiliki.
idToOwner: HashMap[uint256, address]

# @dev Ramani kutoka kitambulisho cha NFT kwenda kwenye anwani iliyoidhinishwa.
idToApprovals: HashMap[uint256, address]
```

Utambulisho wa watumiaji na mikataba katika Ethereum unawakilishwa na anwani za biti 160. Vigezo hivi viwili vinapanga ramani
kutoka vitambulisho vya tokeni kwenda kwa wamiliki wao na wale walioidhinishwa kuzihamisha (kwa kiwango cha juu cha mmoja kwa kila moja). Katika Ethereum,
data ambayo haijaanziwa huwa ni sifuri, kwa hivyo kama hakuna mmiliki au mhamishaji aliyeidhinishwa, thamani ya tokeni hiyo
ni sifuri.

```python
# @dev Ramani kutoka anwani ya mmiliki kwenda kwenye hesabu ya tokeni zake.
ownerToNFTokenCount: HashMap[address, uint256]
```

Kigezo hiki kinashikilia hesabu ya tokeni kwa kila mmiliki. Hakuna ramani kutoka kwa wamiliki kwenda kwenye tokeni, kwa hivyo
njia pekee ya kutambua tokeni ambazo mmiliki maalum anamiliki ni kuangalia nyuma katika historia ya matukio ya mnyororo wa bloku
na kuona matukio sahihi ya `Transfer`. Tunaweza kutumia kigezo hiki kujua wakati tuna NFT zote na hatuhitaji
kuangalia mbele zaidi kwa wakati.

Kumbuka kuwa kanuni hii inafanya kazi tu kwa violesura vya mtumiaji na seva za nje. Msimbo unaoendeshwa kwenye mnyororo wa bloku
wenyewe hauwezi kusoma matukio yaliyopita.

```python
# @dev Ramani kutoka anwani ya mmiliki kwenda kwenye ramani ya anwani za waendeshaji.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Akaunti inaweza kuwa na mwendeshaji zaidi ya mmoja. `HashMap` rahisi haitoshi
kufuatilia, kwa sababu kila ufunguo unaelekea kwenye thamani moja. Badala yake, unaweza kutumia
`HashMap[address, bool]` kama thamani. Kwa chaguo-msingi, thamani kwa kila anwani ni `Uongo`, ambayo ina maana
si mwendeshaji. Unaweza kuweka thamani kuwa `Kweli` inapohitajika.

```python
# @dev Anwani ya mchapaji, anayeweza kuchapa tokeni
minter: address
```

Tokeni mpya zinapaswa kuundwa kwa namna fulani. Katika mkataba huu kuna huluki moja tu inayoruhusiwa kufanya hivyo, yaani
`minter`. Hii inawezekana kutosha kwa mchezo, kwa mfano. Kwa madhumuni mengine, inaweza kuwa muhimu
kuunda mantiki ya biashara ngumu zaidi.

```python
# @dev Ramani ya kitambulisho cha kiolesura kwenda kwa bool kuhusu kama inasaidiwa au la
supportedInterfaces: HashMap[bytes32, bool]

# @dev Kitambulisho cha kiolesura cha ERC165 cha ERC165
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev Kitambulisho cha kiolesura cha ERC165 cha ERC721
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) inabainisha utaratibu kwa mkataba kufichua jinsi programu
zinavyoweza kuwasiliana nayo, na ni ERC zipi inazoendana nazo. Katika kesi hii, mkataba unaendana na ERC-165 na ERC-721.

### Kazi {#functions}

Hizi ni kazi zinazotekeleza ERC-721.

#### Kiunda {#constructor}

```python
@external
def __init__():
```

Katika Vyper, kama ilivyo katika Python, kazi ya kiunda inaitwa `__init__`.

```python
    """
    @dev Kiunda cha mkataba.
    """
```

Katika Python, na katika Vyper, unaweza pia kuunda maoni kwa kubainisha mfuatano wa mistari mingi (unaoanza na kumalizika
kwa `"""`), na usiutumie kwa njia yoyote. Maoni haya pia yanaweza kujumuisha
[NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html).

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

Ili kufikia vigezo vya hali unatumia `self.<variable name>` (tena, sawa na katika Python).

#### Kazi za Kuangalia {#views}

Hizi ni kazi ambazo hazibadilishi hali ya mnyororo wa bloku, na kwa hivyo zinaweza kutekelezwa
bure zikiitwa kutoka nje. Ikiwa kazi za kuangalia zinaitwa na mkataba, bado zinapaswa kutekelezwa kwenye
kila nodi na kwa hivyo hugharimu gesi.

```python
@view
@external
```

Maneno haya muhimu kabla ya ufafanuzi wa kazi ambayo huanza na ishara ya at (`@`) huitwa _mapambo_. Zinabainisha
hali ambazo kazi inaweza kuitwa.

- `@view` inabainisha kuwa kazi hii ni ya kuangalia.
- `@external` inabainisha kuwa kazi hii maalum inaweza kuitwa na miamala na kwa mikataba mingine.

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

Tofauti na Python, Vyper ni [lugha ya aina tuli](https://wikipedia.org/wiki/Type_system#Static_type_checking).
Huwezi kutangaza kigezo, au kigezo cha kazi, bila kutambua [aina ya data](https://vyper.readthedocs.io/en/latest/types.html). Katika kesi hii, kigezo cha kuingiza ni `bytes32`, thamani ya biti 256
(biti 256 ndio ukubwa wa neno la asili la [Mashine Halisi ya Ethereum](/developers/docs/evm/)). Toleo ni thamani ya
boolean. Kwa kawaida, majina ya vigezo vya kazi huanza na alama ya chini (`_`).

```python
    """
    @dev Utambulisho wa kiolesura umebainishwa katika ERC-165.
    @param _interfaceID Kitambulisho cha kiolesura
    """
    return self.supportedInterfaces[_interfaceID]
```

Rejesha thamani kutoka kwenye HashMap ya `self.supportedInterfaces`, ambayo imewekwa katika kiunda (`__init__`).

```python
### KAZI ZA KUANGALIA ###

```

Hizi ni kazi za kuangalia ambazo hufanya habari kuhusu tokeni zipatikane kwa watumiaji na mikataba mingine.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev Inarejesha idadi ya NFT zinazomilikiwa na `_owner`.
         Hutoa kosa ikiwa `_owner` ni anwani sifuri. NFT zilizogawiwa kwa anwani sifuri huchukuliwa kuwa batili.
    @param _owner Anwani ambayo itauliziwa salio.
    """
    assert _owner != ZERO_ADDRESS
```

Mstari huu [unathibitisha](https://vyper.readthedocs.io/en/latest/statements.html#assert) kuwa `_owner` si
sifuri. Ikiwa ni hivyo, kuna kosa na operesheni inarejeshwa nyuma.

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev Inarejesha anwani ya mmiliki wa NFT.
         Hutoa kosa ikiwa `_tokenId` si NFT halali.
    @param _tokenId Kitambulisho cha NFT.
    """
    owner: address = self.idToOwner[_tokenId]
    # Hutoa kosa ikiwa `_tokenId` si NFT halali
    assert owner != ZERO_ADDRESS
    return owner
```

Katika Mashine Halisi ya Ethereum (evm) hifadhi yoyote ambayo haina thamani iliyohifadhiwa ndani yake ni sifuri.
Ikiwa hakuna tokeni kwenye `_tokenId` basi thamani ya `self.idToOwner[_tokenId]` ni sifuri. Katika kesi
hiyo, kazi inarejeshwa nyuma.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Pata anwani iliyoidhinishwa kwa NFT moja.
         Hutoa kosa ikiwa `_tokenId` si NFT halali.
    @param _tokenId Kitambulisho cha NFT cha kuulizia idhini yake.
    """
    # Hutoa kosa ikiwa `_tokenId` si NFT halali
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

Kumbuka kuwa `getApproved` _inaweza_ kurejesha sifuri. Ikiwa tokeni ni halali, inarejesha `self.idToApprovals[_tokenId]`.
Ikiwa hakuna muidhinishaji, thamani hiyo ni sifuri.

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev Inaangalia kama `_operator` ni mwendeshaji aliyeidhinishwa kwa `_owner`.
    @param _owner Anwani inayomiliki NFT.
    @param _operator Anwani inayofanya kazi kwa niaba ya mmiliki.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

Kazi hii inaangalia kama `_operator` anaruhusiwa kusimamia tokeni zote za `_owner` katika mkataba huu.
Kwa sababu kunaweza kuwa na waendeshaji wengi, hii ni HashMap ya viwango viwili.

#### Kazi Saidizi za Uhamishaji {#transfer-helpers}

Kazi hizi zinatekeleza operesheni ambazo ni sehemu ya kuhamisha au kusimamia tokeni.

```python

### KAZI SAIDIZI ZA KAZI ZA UHAMISHAJI ###

@view
@internal
```

Mapambo haya, `@internal`, inamaanisha kuwa kazi inapatikana tu kutoka kwa kazi zingine ndani ya
mkataba uleule. Kwa kawaida, majina ya kazi hizi pia huanza na alama ya chini (`_`).

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev Inarejesha kama mtumiaji aliyetajwa anaweza kuhamisha kitambulisho cha tokeni kilichotajwa
    @param spender anwani ya mtumiaji wa kuulizia
    @param tokenId kitambulisho cha uint256 cha tokeni ya kuhamishwa
    @return bool kama msg.sender ameidhinishwa kwa kitambulisho cha tokeni kilichotajwa,
        ni mwendeshaji wa mmiliki, au ni mmiliki wa tokeni
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

Kuna njia tatu ambazo anwani inaweza kuruhusiwa kuhamisha tokeni:

1. Anwani ni mmiliki wa tokeni
2. Anwani imehidhinishwa kutumia tokeni hiyo
3. Anwani ni mwendeshaji wa mmiliki wa tokeni

Kazi iliyo hapo juu inaweza kuwa ya kuangalia kwa sababu haibadilishi hali. Ili kupunguza gharama za uendeshaji, kazi
yoyote ambayo _inaweza_ kuwa ya kuangalia _inapaswa_ kuwa ya kuangalia.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Ongeza NFT kwenye anwani iliyotajwa
         Hutoa kosa ikiwa `_tokenId` inamilikiwa na mtu.
    """
    # Hutoa kosa ikiwa `_tokenId` inamilikiwa na mtu
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # Badilisha mmiliki
    self.idToOwner[_tokenId] = _to
    # Badilisha ufuatiliaji wa hesabu
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Ondoa NFT kutoka kwa anwani iliyotajwa
         Hutoa kosa ikiwa `_from` si mmiliki wa sasa.
    """
    # Hutoa kosa ikiwa `_from` si mmiliki wa sasa
    assert self.idToOwner[_tokenId] == _from
    # Badilisha mmiliki
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # Badilisha ufuatiliaji wa hesabu
    self.ownerToNFTokenCount[_from] -= 1
```

Kunapokuwa na tatizo na uhamishaji, tunarejesha wito nyuma.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Futa idhini ya anwani iliyotajwa
         Hutoa kosa ikiwa `_owner` si mmiliki wa sasa.
    """
    # Hutoa kosa ikiwa `_owner` si mmiliki wa sasa
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # Weka upya idhini
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

Badilisha tu thamani ikiwa ni lazima. Vigezo vya hali huishi kwenye hifadhi. Kuandika kwenye hifadhi ni
mojawapo ya operesheni ghali zaidi ambayo EVM (Mashine Halisi ya Ethereum) hufanya (kwa upande wa
[gesi](/developers/docs/gas/)). Kwa hivyo, ni wazo zuri kuipunguza, hata kuandika
thamani iliyopo kuna gharama kubwa.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Tekeleza uhamishaji wa NFT.
         Hutoa kosa isipokuwa `msg.sender` ni mmiliki wa sasa, mwendeshaji aliyeidhinishwa, au anwani
         iliyoidhinishwa kwa NFT hii. (KUMBUKA: `msg.sender` hairuhusiwi katika kazi ya faragha kwa hivyo pitisha `_sender`.)
         Hutoa kosa ikiwa `_to` ni anwani sifuri.
         Hutoa kosa ikiwa `_from` si mmiliki wa sasa.
         Hutoa kosa ikiwa `_tokenId` si NFT halali.
    """
```

Tuna kazi hii ya ndani kwa sababu kuna njia mbili za kuhamisha tokeni (kawaida na salama), lakini
tunataka eneo moja tu katika msimbo ambapo tunafanya hivyo ili kurahisisha ukaguzi.

```python
    # Angalia mahitaji
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Hutoa kosa ikiwa `_to` ni anwani sifuri
    assert _to != ZERO_ADDRESS
    # Futa idhini. Hutoa kosa ikiwa `_from` si mmiliki wa sasa
    self._clearApproval(_from, _tokenId)
    # Ondoa NFT. Hutoa kosa ikiwa `_tokenId` si NFT halali
    self._removeTokenFrom(_from, _tokenId)
    # Ongeza NFT
    self._addTokenTo(_to, _tokenId)
    # Ingiza uhamishaji kwenye kumbukumbu
    log Transfer(_from, _to, _tokenId)
```

Ili kutoa tukio katika Vyper unatumia taarifa ya `log` ([ona hapa kwa maelezo zaidi](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).

#### Kazi za Uhamishaji {#transfer-funs}

```python

### KAZI ZA UHAMISHAJI ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev Hutoa kosa isipokuwa `msg.sender` ni mmiliki wa sasa, mwendeshaji aliyeidhinishwa, au anwani
         iliyoidhinishwa kwa NFT hii.
         Hutoa kosa ikiwa `_from` si mmiliki wa sasa.
         Hutoa kosa ikiwa `_to` ni anwani sifuri.
         Hutoa kosa ikiwa `_tokenId` si NFT halali.
    @notice Mwitaji anawajibika kuthibitisha kuwa `_to` ina uwezo wa kupokea NFT, vinginevyo
            zinaweza kupotea kabisa.
    @param _from Mmiliki wa sasa wa NFT.
    @param _to Mmiliki mpya.
    @param _tokenId NFT ya kuhamisha.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Kazi hii inakuwezesha kuhamisha kwenda kwenye anwani yoyote. Isipokuwa anwani ni ya mtumiaji, au mkataba ambao
unajua jinsi ya kuhamisha tokeni, tokeni yoyote utakayohamisha itakwama kwenye anwani hiyo na kuwa isiyofaa.

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev Huhamisha umiliki wa NFT kutoka anwani moja kwenda nyingine.
         Hutoa kosa isipokuwa `msg.sender` ni mmiliki wa sasa, mwendeshaji aliyeidhinishwa, au anwani
         iliyoidhinishwa kwa NFT hii.
         Hutoa kosa ikiwa `_from` si mmiliki wa sasa.
         Hutoa kosa ikiwa `_to` ni anwani sifuri.
         Hutoa kosa ikiwa `_tokenId` si NFT halali.
         Ikiwa `_to` ni mkataba-erevu, inaita `onERC721Received` kwenye `_to` na hutoa kosa ikiwa
         thamani ya kurejesha si `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
         KUMBUKA: bytes4 inawakilishwa na bytes32 na padding
    @param _from Mmiliki wa sasa wa NFT.
    @param _to Mmiliki mpya.
    @param _tokenId NFT ya kuhamisha.
    @param _data Data ya ziada bila umbizo maalum, iliyotumwa kwenye wito kwa `_to`.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Ni sawa kufanya uhamishaji kwanza kwa sababu ikiwa kuna tatizo tutarejesha nyuma hata hivyo,
kwa hivyo kila kitu kilichofanywa kwenye wito kitaghairishwa.

```python
    if _to.is_contract: # angalia kama `_to` ni anwani ya mkataba
```

Kwanza angalia kuona kama anwani ni mkataba (kama ina msimbo). Kama sivyo, chukulia ni anwani ya
mtumiaji na mtumiaji ataweza kutumia tokeni au kuihamisha. Lakini usiruhusu ikudanganye
katika hisia za uongo za usalama. Unaweza kupoteza tokeni, hata kwa `safeTransferFrom`, ukizihamisha
kwenda anwani ambayo hakuna anayejua ufunguo wake binafsi.

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Piga simu mkataba lengwa kuona kama unaweza kupokea tokeni za ERC-721.

```python
        # Hutoa kosa ikiwa marudio ya uhamishaji ni mkataba ambao hautekelezi 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

Ikiwa marudio ni mkataba, lakini ambao haukubali tokeni za ERC-721 (au ambao umeamua kutokubali uhamishaji huu
maalum), rejeshwa nyuma.

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Weka au thibitisha tena anwani iliyoidhinishwa kwa NFT. Anwani sifuri inaonyesha hakuna anwani iliyoidhinishwa.
         Hutoa kosa isipokuwa `msg.sender` ni mmiliki wa sasa wa NFT, au mwendeshaji aliyeidhinishwa wa mmiliki wa sasa.
         Hutoa kosa ikiwa `_tokenId` si NFT halali. (KUMBUKA: Hii haijaandikwa kwenye EIP)
         Hutoa kosa ikiwa `_approved` ni mmiliki wa sasa. (KUMBUKA: Hii haijaandikwa kwenye EIP)
    @param _approved Anwani ya kuidhinishwa kwa kitambulisho cha NFT kilichotajwa.
    @param _tokenId Kitambulisho cha tokeni ya kuidhinishwa.
    """
    owner: address = self.idToOwner[_tokenId]
    # Hutoa kosa ikiwa `_tokenId` si NFT halali
    assert owner != ZERO_ADDRESS
    # Hutoa kosa ikiwa `_approved` ni mmiliki wa sasa
    assert _approved != owner
```

Kwa kawaida, ikiwa hutaki kuwa na muidhinishaji, unateua anwani sifuri, si wewe mwenyewe.

```python
    # Angalia mahitaji
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

Ili kuweka idhini unaweza kuwa mmiliki, au mwendeshaji aliyeidhinishwa na mmiliki.

```python
    # Weka idhini
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Inawezesha au inalemaza idhini kwa mhusika wa tatu ("mwendeshaji") kusimamia mali zote za
         `msg.sender`. Pia hutoa tukio la ApprovalForAll.
         Hutoa kosa ikiwa `_operator` ni `msg.sender`. (KUMBUKA: Hii haijaandikwa kwenye EIP)
    @notice Hii inafanya kazi hata kama mtumaji hamiliki tokeni zozote kwa wakati huo.
    @param _operator Anwani ya kuongeza kwenye seti ya waendeshaji walioidhinishwa.
    @param _approved Kweli kama waendeshaji wameidhinishwa, uongo kufuta idhini.
    """
    # Hutoa kosa ikiwa `_operator` ni `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### Chapa Tokeni Mpya na Uharibu Zilizopo {#mint-burn}

Akaunti iliyounda mkataba ndiye `minter`, mtumiaji mkuu aliyeidhinishwa kuchapa
NFT mpya. Hata hivyo, hairuhusiwi kuchoma tokeni zilizopo. Ni mmiliki tu, au huluki
iliyoihdinishwa na mmiliki, ndiyo inayoweza kufanya hivyo.

```python
### KAZI ZA KUCHAPA NA KUCHOMA ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

Kazi hii daima inarejesha `Kweli`, kwa sababu ikiwa operesheni itashindwa, inarejeshwa nyuma.

```python
    """
    @dev Kazi ya kuchapa tokeni
         Hutoa kosa ikiwa `msg.sender` si mchapaji.
         Hutoa kosa ikiwa `_to` ni anwani sifuri.
         Hutoa kosa ikiwa `_tokenId` inamilikiwa na mtu.
    @param _to Anwani itakayopokea tokeni zilizochapwa.
    @param _tokenId Kitambulisho cha tokeni cha kuchapa.
    @return Boolean inayoonyesha kama operesheni ilifanikiwa.
    """
    # Hutoa kosa ikiwa `msg.sender` si mchapaji
    assert msg.sender == self.minter
```

Ni mchapaji tu (akaunti iliyounda mkataba wa ERC-721) anayeweza kuchapa tokeni mpya. Hili linaweza kuwa
tatizo siku zijazo ikiwa tunataka kubadilisha utambulisho wa mchapaji. Katika
mkataba wa uzalishaji, labda utataka kazi inayoruhusu mchapaji kuhamisha
marupurupu ya mchapaji kwa mtu mwingine.

```python
    # Hutoa kosa ikiwa `_to` ni anwani sifuri
    assert _to != ZERO_ADDRESS
    # Ongeza NFT. Hutoa kosa ikiwa `_tokenId` inamilikiwa na mtu
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

Kwa kawaida, uchapaji wa tokeni mpya huhesabiwa kama uhamishaji kutoka kwa anwani sifuri.

```python

@external
def burn(_tokenId: uint256):
    """
    @dev Inachoma tokeni maalum ya ERC721.
         Hutoa kosa isipokuwa `msg.sender` ni mmiliki wa sasa, mwendeshaji aliyeidhinishwa, au anwani
         iliyoidhinishwa kwa NFT hii.
         Hutoa kosa ikiwa `_tokenId` si NFT halali.
    @param _tokenId kitambulisho cha uint256 cha tokeni ya ERC721 itakayochomwa.
    """
    # Angalia mahitaji
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # Hutoa kosa ikiwa `_tokenId` si NFT halali
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

Mtu yeyote anayeruhusiwa kuhamisha tokeni anaruhusiwa kuichoma. Wakati uchomaji unaonekana sawa na
uhamishaji kwenda kwa anwani sifuri, anwani sifuri haipokei tokeni hiyo. Hii inaturuhusu
kuachilia hifadhi yote iliyotumika kwa tokeni, ambayo inaweza kupunguza gharama ya gesi ya muamala.

## Kutumia Mkataba Huu {#using-contract}

Tofauti na Solidity, Vyper haina urithi. Hili ni chaguo la muundo la makusudi ili kufanya
msimbo uwe wazi zaidi na kwa hivyo iwe rahisi kuulinda. Kwa hivyo, ili kuunda mkataba wako wa Vyper ERC-721, unachukua mkataba
huu na kuubadilisha
ili kutekeleza mantiki ya biashara unayotaka.

## Hitimisho {#conclusion}

Kwa mapitio, haya ni baadhi ya mawazo muhimu zaidi katika mkataba huu:

- Ili kupokea tokeni za ERC-721 kwa uhamishaji salama, mikataba inapaswa kutekeleza kiolesura cha `ERC721Receiver`.
- Hata ukitumia uhamishaji salama, tokeni bado zinaweza kukwama ukizituma kwa anwani ambayo ufunguo wake binafsi
  haujulikani.
- Kunapokuwa na tatizo na operesheni, ni wazo zuri `kurejesha nyuma` wito, badala ya kurejesha tu
  thamani ya kushindwa.
- Tokeni za ERC-721 zipo zinapokuwa na mmiliki.
- Kuna njia tatu za kuidhinishwa kuhamisha NFT. Unaweza kuwa mmiliki, kuidhinishwa kwa tokeni maalum,
  au kuwa mwendeshaji wa tokeni zote za mmiliki.
- Matukio yaliyopita yanaonekana tu nje ya mnyororo wa bloku. Msimbo unaoendeshwa ndani ya mnyororo wa bloku hauwezi kuyaona.

Sasa nenda na utekeleze mikataba salama ya Vyper.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).

