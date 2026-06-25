---
title: "Mwongozo wa Mkataba wa Vyper ERC-721"
description: Mkataba wa ERC-721 wa Ryuya Nakamura na jinsi unavyofanya kazi
author: Ori Pomerantz
lang: sw
tags: ["Vyper", "erc-721", "Python"]
skill: beginner
breadcrumb: Vyper ERC-721
published: 2021-04-01
---

## Utangulizi {#introduction}

Kiwango cha [ERC-721](/developers/docs/standards/tokens/erc-721/) kinatumika kushikilia umiliki wa Tokeni Zisizoweza Kubadilishana (NFT).
Tokeni za [ERC-20](/developers/docs/standards/tokens/erc-20/) hufanya kazi kama bidhaa, kwa sababu hakuna tofauti kati ya tokeni moja na nyingine.
Tofauti na hilo, tokeni za ERC-721 zimeundwa kwa ajili ya rasilimali zinazofanana lakini si sawa kabisa, kama vile [katuni tofauti za paka](https://www.cryptokitties.co/)
au hati miliki za vipande tofauti vya ardhi.

Katika makala haya tutachambua [mkataba wa ERC-721 wa Ryuya Nakamura](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy).
Mkataba huu umeandikwa kwa [Vyper](https://vyper.readthedocs.io/en/latest/index.html), lugha ya mkataba inayofanana na Python iliyoundwa kufanya iwe vigumu kuandika msimbo usio salama kuliko ilivyo katika Solidity.

## Mkataba {#contract}

```python
# @dev Utekelezaji wa kiwango cha tokeni isiyofungika cha ERC-721.
# @author Ryuya Nakamura (@nrryuya)
# Imebadilishwa kutoka: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Maoni katika Vyper, kama ilivyo katika Python, huanza na heshi (`#`) na kuendelea hadi mwisho wa mstari. Maoni yanayojumuisha
`@<keyword>` hutumiwa na [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) kutoa nyaraka zinazosomeka na binadamu.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

Kiolesura cha ERC-721 kimejengwa ndani ya lugha ya Vyper.
[Unaweza kuona ufafanuzi wa msimbo hapa](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py).
Ufafanuzi wa kiolesura umeandikwa kwa Python, badala ya Vyper, kwa sababu violesura havitumiki tu ndani ya
mnyororo wa vitalu, bali pia wakati wa kutuma muamala kwenye mnyororo wa vitalu kutoka kwa mteja wa nje, ambao unaweza kuwa umeandikwa kwa
Python.

Mstari wa kwanza unaingiza kiolesura, na wa pili unabainisha kuwa tunakitekeleza hapa.

### Kiolesura cha ERC721Receiver {#receiver-interface}

```python
# Kiolesura cha mkataba kinachoitwa na safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 inasaidia aina mbili za hamisho:

- `transferFrom`, ambayo inamruhusu mtumaji kubainisha anwani yoyote ya marudio na kuweka jukumu
  la hamisho kwa mtumaji. Hii inamaanisha kuwa unaweza kuhamisha kwenda kwenye anwani batili, ambapo
  NFT itapotea moja kwa moja.
- `safeTransferFrom`, ambayo hukagua ikiwa anwani ya marudio ni mkataba. Ikiwa ndivyo, mkataba wa ERC-721
  huuliza mkataba unaopokea ikiwa unataka kupokea NFT.

Ili kujibu maombi ya `safeTransferFrom` mkataba unaopokea unapaswa kutekeleza `ERC721Receiver`.

```python
            _operator: address,
            _from: address,
```

Anwani ya `_from` ndiye mmiliki wa sasa wa tokeni. Anwani ya `_operator` ndiyo iliyoomba
hamisho (hizo mbili zinaweza zisiwe sawa, kwa sababu ya vibali).

```python
            _tokenId: uint256,
```

Vitambulisho vya tokeni za ERC-721 ni biti 256. Kwa kawaida huundwa kwa kuheshi maelezo ya chochote kile
ambacho tokeni inawakilisha.

```python
            _data: Bytes[1024]
```

Ombi linaweza kuwa na hadi baiti 1024 za data ya mtumiaji.

```python
        ) -> bytes32: view
```

Ili kuzuia matukio ambapo mkataba unakubali hamisho kwa bahati mbaya thamani inayorejeshwa si boolean,
bali ni biti 256 zenye thamani maalum.

Kazi hii ni `view`, ambayo inamaanisha inaweza kusoma hali ya mnyororo wa vitalu, lakini haiwezi kuibadilisha.

### Matukio {#events}

[Matukio](/developers/docs/smart-contracts/anatomy/#events-and-logs)
hutolewa ili kuwajulisha watumiaji na seva zilizo nje ya mnyororo wa vitalu kuhusu matukio. Kumbuka kwamba maudhui ya matukio
hayapatikani kwa mikataba iliyo kwenye mnyororo wa vitalu.

```python
# @dev Hutoa wakati umiliki wa NFT yoyote unapobadilika kwa utaratibu wowote. Tukio hili hutoa wakati NFT
#      zinaundwa (`from` == 0) na kuharibiwa (`to` == 0). Upekee: wakati wa uundaji wa mkataba, idadi yoyote
#      ya NFT inaweza kuundwa na kugawiwa bila kutoa Transfer. Wakati wa hamisho
#      lolote, anwani iliyoidhinishwa kwa NFT hiyo (kama ipo) huwekwa upya kuwa hakuna.
# @param _from Mtumaji wa NFT (kama anwani ni anwani sifuri inaashiria uundaji wa tokeni).
# @param _to Mpokeaji wa NFT (kama anwani ni anwani sifuri inaashiria uharibifu wa tokeni).
# @param _tokenId NFT iliyofanyiwa hamisho.
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

Hili linafanana na tukio la Hamisho la ERC-20, isipokuwa kwamba tunaripoti `tokenId` badala ya kiasi.
Hakuna anayemiliki anwani sifuri, kwa hivyo kwa kawaida tunaitumia kuripoti uundaji na uteketezaji wa tokeni.

```python
# @dev Hii hutoa wakati anwani iliyoidhinishwa kwa NFT inabadilishwa au kuthibitishwa tena. Anwani
#      sifuri inaashiria hakuna anwani iliyoidhinishwa. Wakati tukio la Transfer linatoa, hii pia
#      inaashiria kwamba anwani iliyoidhinishwa kwa NFT hiyo (kama ipo) imewekwa upya kuwa hakuna.
# @param _owner Mmiliki wa NFT.
# @param _approved Anwani tunayoidhinisha.
# @param _tokenId NFT tunayoidhinisha.
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

Idhini ya ERC-721 inafanana na kibali cha ERC-20. Anwani maalum inaruhusiwa kuhamisha tokeni
maalum. Hii inatoa utaratibu kwa mikataba kujibu inapokubali tokeni. Mikataba haiwezi
kusikiliza matukio, kwa hivyo ikiwa utahamisha tu tokeni kwao "hawatajua" kuihusu. Kwa njia hii
mmiliki kwanza anawasilisha idhini na kisha kutuma ombi kwa mkataba: "Nimekuidhinisha kuhamisha tokeni
X, tafadhali fanya ...".

Huu ni uamuzi wa muundo ili kufanya kiwango cha ERC-721 kifanane na kiwango cha ERC-20. Kwa sababu
tokeni za ERC-721 haziwezi kubadilishana, mkataba unaweza pia kutambua kwamba umepata tokeni maalum kwa
kuangalia umiliki wa tokeni hiyo.

```python
# @dev Hii hutoa wakati mhudumu anawashwa au kuzimwa kwa mmiliki. Mhudumu anaweza kusimamia
#      NFT zote za mmiliki.
# @param _owner Mmiliki wa NFT.
# @param _operator Anwani ambayo tunaiwekea haki za mhudumu.
# @param _approved Hali ya haki za mhudumu (kweli ikiwa haki za mhudumu zimetolewa na si kweli ikiwa
# zimebatilishwa).
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

Wakati mwingine ni muhimu kuwa na _mwendeshaji_ anayeweza kusimamia tokeni zote za akaunti za aina maalum (zile zinazosimamiwa na
mkataba maalum), sawa na nguvu ya kisheria. Kwa mfano, ninaweza kutaka kutoa nguvu kama hiyo kwa mkataba ambao unakagua ikiwa
sijawasiliana nao kwa miezi sita, na ikiwa ndivyo unasambaza rasilimali zangu kwa warithi wangu (ikiwa mmoja wao ataiomba, mikataba
haiwezi kufanya chochote bila kuitwa na muamala). Katika ERC-20 tunaweza tu kutoa kibali kikubwa kwa mkataba wa urithi,
lakini hilo halifanyi kazi kwa ERC-721 kwa sababu tokeni haziwezi kubadilishana. Hii ndiyo sawa yake.

Thamani ya `approved` inatuambia ikiwa tukio ni la idhini, au utoaji wa idhini.

### Vigezo vya Hali {#state-vars}

Vigezo hivi vina hali ya sasa ya tokeni: zipi zinapatikana na nani anazimiliki. Nyingi ya hizi
ni vitu vya `HashMap`, [upangaji wa mwelekeo mmoja uliopo kati ya aina mbili](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev Ramani kutoka Kitambulisho cha NFT kwenda kwa anwani inayoimiliki.
idToOwner: HashMap[uint256, address]

# @dev Ramani kutoka Kitambulisho cha NFT kwenda kwa anwani iliyoidhinishwa.
idToApprovals: HashMap[uint256, address]
```

Vitambulisho vya mtumiaji na mkataba katika Ethereum vinawakilishwa na anwani za biti 160. Vigezo hivi viwili vinapanga
kutoka kwenye vitambulisho vya tokeni hadi kwa wamiliki wake na wale walioidhinishwa kuzihamisha (kwa kiwango cha juu cha mmoja kwa kila moja). Katika Ethereum,
data ambayo haijaanzishwa huwa sifuri kila wakati, kwa hivyo ikiwa hakuna mmiliki au mhamishaji aliyeidhinishwa thamani ya tokeni hiyo
ni sifuri.

```python
# @dev Ramani kutoka anwani ya mmiliki kwenda kwa idadi ya tokeni zake.
ownerToNFTokenCount: HashMap[address, uint256]
```

Kigezo hiki kinashikilia idadi ya tokeni kwa kila mmiliki. Hakuna upangaji kutoka kwa wamiliki hadi kwenye tokeni, kwa hivyo
njia pekee ya kutambua tokeni ambazo mmiliki maalum anamiliki ni kuangalia nyuma katika historia ya matukio ya mnyororo wa vitalu
na kuona matukio yanayofaa ya `Transfer`. Tunaweza kutumia kigezo hiki kujua wakati tuna NFT zote na hatuhitaji
kuangalia zaidi nyuma kwa wakati.

Kumbuka kwamba algoriti hii inafanya kazi tu kwa violesura vya mtumiaji na seva za nje. Msimbo unaoendeshwa kwenye mnyororo wa vitalu
wenyewe hauwezi kusoma matukio yaliyopita.

```python
# @dev Ramani kutoka anwani ya mmiliki kwenda kwa ramani ya anwani za wahudumu.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Akaunti inaweza kuwa na zaidi ya mwendeshaji mmoja. `HashMap` rahisi haitoshi
kufuatilia, kwa sababu kila ufunguo unaongoza kwenye thamani moja. Badala yake, unaweza kutumia
`HashMap[address, bool]` kama thamani. Kwa chaguo-msingi thamani ya kila anwani ni `False`, ambayo inamaanisha
si mwendeshaji. Unaweza kuweka thamani kuwa `True` kama inavyohitajika.

```python
# @dev Anwani ya mfuzi, anayeweza kufua tokeni
minter: address
```

Tokeni mpya zinapaswa kuundwa kwa namna fulani. Katika mkataba huu kuna chombo kimoja kinachoruhusiwa kufanya hivyo,
`minter`. Hii inawezekana ikatosha kwa mchezo, kwa mfano. Kwa madhumuni mengine, inaweza kuwa muhimu
kuunda mantiki ya biashara iliyochangamano zaidi.

```python
# @dev Ramani ya kitambulisho cha kiolesura kwenda kwa bool kuhusu kama inasaidiwa au la
supportedInterfaces: HashMap[bytes32, bool]

# @dev Kitambulisho cha kiolesura cha ERC-165 cha ERC-165
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev Kitambulisho cha kiolesura cha ERC-165 cha ERC-721
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) inabainisha utaratibu wa mkataba kufichua jinsi programu
zinavyoweza kuwasiliana nao, na ni ERC zipi unazofuata. Katika kesi hii, mkataba unafuata ERC-165 na ERC-721.

### Kazi {#functions}

Hizi ndizo kazi ambazo zinatekeleza ERC-721 haswa.

#### Konstrukta {#constructor}

```python
@external
def __init__():
```

Katika Vyper, kama ilivyo katika Python, kazi ya konstrukta inaitwa `__init__`.

```python
    """
    @dev Konstrukta ya mkataba.
    """
```

Katika Python, na katika Vyper, unaweza pia kuunda maoni kwa kubainisha mfuatano wa mistari mingi (ambao huanza na kuishia
na `"""`), na kutoutumia kwa njia yoyote. Maoni haya yanaweza pia kujumuisha
[NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html).

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

Ili kufikia vigezo vya hali unatumia `self.<variable name>` (tena, sawa na katika Python).

#### Kazi za Kutazama {#views}

Hizi ni kazi ambazo hazibadilishi hali ya mnyororo wa vitalu, na kwa hivyo zinaweza kutekelezwa bila malipo
ikiwa zitaitwa kutoka nje. Ikiwa kazi za kutazama zitaitwa na mkataba bado zinapaswa kutekelezwa kwenye
kila nodi na kwa hivyo kugharimu gesi.

```python
@view
@external
```

Maneno haya muhimu kabla ya ufafanuzi wa kazi ambayo huanza na alama ya at (`@`) yanaitwa _mapambo_. Yanabainisha
mazingira ambayo kazi inaweza kuitwa.

- `@view` inabainisha kuwa kazi hii ni ya kutazama.
- `@external` inabainisha kuwa kazi hii maalum inaweza kuitwa na miamala na na mikataba mingine.

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

Tofauti na Python, Vyper ni [lugha yenye aina tuli](https://wikipedia.org/wiki/Type_system#Static_type_checking).
Huwezi kutangaza kigezo, au kigezo cha kazi, bila kutambua [aina ya data](https://vyper.readthedocs.io/en/latest/types.html). Katika kesi hii kigezo cha kuingiza ni `bytes32`, thamani ya biti 256
(biti 256 ni ukubwa wa neno asili wa [Ethereum Virtual Machine](/developers/docs/evm/)). Toleo ni thamani ya boolean.
Kwa kawaida, majina ya vigezo vya kazi huanza na mstari wa chini (`_`).

```python
    """
    @dev Utambulisho wa kiolesura umebainishwa katika ERC-165.
    @param _interfaceID Kitambulisho cha kiolesura
    """
    return self.supportedInterfaces[_interfaceID]
```

Rejesha thamani kutoka kwenye HashMap ya `self.supportedInterfaces`, ambayo imewekwa kwenye konstrukta (`__init__`).

```python
### KAZI ZA KUTAZAMA ###
```

Hizi ni kazi za kutazama ambazo hufanya taarifa kuhusu tokeni kupatikana kwa watumiaji na mikataba mingine.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev Hurejesha idadi ya NFT zinazomilikiwa na `_owner`.
         Hutengua ikiwa `_owner` ni anwani sifuri. NFT zilizogawiwa kwa anwani sifuri huchukuliwa kuwa batili.
    @param _owner Anwani ya kuulizia salio.
    """
    assert _owner != ZERO_ADDRESS
```

Mstari huu [unathibitisha](https://vyper.readthedocs.io/en/latest/statements.html#assert) kwamba `_owner` si
sifuri. Ikiwa ndivyo, kuna hitilafu na operesheni inatenguliwa.

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev Hurejesha anwani ya mmiliki wa NFT.
         Hutengua ikiwa `_tokenId` si NFT halali.
    @param _tokenId Kitambulishi cha NFT.
    """
    owner: address = self.idToOwner[_tokenId]
    # Hutengua ikiwa `_tokenId` si NFT halali
    assert owner != ZERO_ADDRESS
    return owner
```

Katika Ethereum Virtual Machine (evm) hifadhi yoyote ambayo haina thamani iliyohifadhiwa ndani yake ni sifuri.
Ikiwa hakuna tokeni kwenye `_tokenId` basi thamani ya `self.idToOwner[_tokenId]` ni sifuri. Katika
kesi hiyo kazi inatenguliwa.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Pata anwani iliyoidhinishwa kwa NFT moja.
         Hutengua ikiwa `_tokenId` si NFT halali.
    @param _tokenId Kitambulisho cha NFT cha kuulizia idhini.
    """
    # Hutengua ikiwa `_tokenId` si NFT halali
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

Kumbuka kwamba `getApproved` _inaweza_ kurejesha sifuri. Ikiwa tokeni ni halali inarejesha `self.idToApprovals[_tokenId]`.
Ikiwa hakuna muidhinishaji thamani hiyo ni sifuri.

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev Hukagua ikiwa `_operator` ni mhudumu aliyeidhinishwa kwa `_owner`.
    @param _owner Anwani inayomiliki NFT.
    @param _operator Anwani inayotenda kwa niaba ya mmiliki.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

Kazi hii inakagua ikiwa `_operator` inaruhusiwa kusimamia tokeni zote za `_owner` katika mkataba huu.
Kwa sababu kunaweza kuwa na waendeshaji wengi, hii ni HashMap ya ngazi mbili.

#### Kazi za Kusaidia Hamisho {#transfer-helpers}

Kazi hizi zinatekeleza operesheni ambazo ni sehemu ya kuhamisha au kusimamia tokeni.

```python

### WASAIDIZI WA KAZI ZA HAMISHO ###

@view
@internal
```

Pambo hili, `@internal`, linamaanisha kuwa kazi inapatikana tu kutoka kwa kazi zingine ndani ya
mkataba huo huo. Kwa kawaida, majina ya kazi hizi pia huanza na mstari wa chini (`_`).

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev Hurejesha ikiwa mtumiaji aliyepewa anaweza kufanya hamisho la Kitambulisho cha tokeni kilichopewa
    @param spender anwani ya mtumiaji wa kuulizia
    @param tokenId uint256 Kitambulisho cha tokeni itakayofanyiwa hamisho
    @return bool ikiwa msg.sender imeidhinishwa kwa Kitambulisho cha tokeni kilichopewa,
        ni mhudumu wa mmiliki, au ni mmiliki wa tokeni
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

Kuna njia tatu ambazo anwani inaweza kuruhusiwa kuhamisha tokeni:

1. Anwani ndiyo mmiliki wa tokeni
2. Anwani imeidhinishwa kutumia tokeni hiyo
3. Anwani ni mwendeshaji kwa mmiliki wa tokeni

Kazi iliyo hapo juu inaweza kuwa ya kutazama kwa sababu haibadilishi hali. Ili kupunguza gharama za uendeshaji, kazi yoyote
ambayo _inaweza_ kuwa ya kutazama _inapaswa_ kuwa ya kutazama.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Ongeza NFT kwenye anwani iliyopewa
         Hutengua ikiwa `_tokenId` inamilikiwa na mtu.
    """
    # Hutengua ikiwa `_tokenId` inamilikiwa na mtu
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # Badilisha mmiliki
    self.idToOwner[_tokenId] = _to
    # Badilisha ufuatiliaji wa idadi
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Ondoa NFT kutoka kwa anwani iliyopewa
         Hutengua ikiwa `_from` si mmiliki wa sasa.
    """
    # Hutengua ikiwa `_from` si mmiliki wa sasa
    assert self.idToOwner[_tokenId] == _from
    # Badilisha mmiliki
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # Badilisha ufuatiliaji wa idadi
    self.ownerToNFTokenCount[_from] -= 1
```

Kunapokuwa na tatizo na hamisho tunatengua wito.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Futa idhini ya anwani iliyopewa
         Hutengua ikiwa `_owner` si mmiliki wa sasa.
    """
    # Hutengua ikiwa `_owner` si mmiliki wa sasa
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # Weka upya idhini
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

Badilisha thamani tu ikiwa ni lazima. Vigezo vya hali huishi kwenye hifadhi. Kuandika kwenye hifadhi ni
mojawapo ya operesheni ghali zaidi ambazo EVM (Ethereum Virtual Machine) hufanya (kwa upande wa
[gesi](/developers/docs/gas/)). Kwa hivyo, ni wazo zuri kuipunguza, hata kuandika
thamani iliyopo kuna gharama kubwa.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Tekeleza hamisho la NFT.
         Hutengua isipokuwa `msg.sender` ni mmiliki wa sasa, mhudumu aliyeidhinishwa, au anwani
         iliyoidhinishwa kwa NFT hii. (KUMBUKA: `msg.sender` hairuhusiwi katika kazi ya faragha kwa hivyo pitisha `_sender`.)
         Hutengua ikiwa `_to` ni anwani sifuri.
         Hutengua ikiwa `_from` si mmiliki wa sasa.
         Hutengua ikiwa `_tokenId` si NFT halali.
    """
```

Tuna kazi hii ya ndani kwa sababu kuna njia mbili za kuhamisha tokeni (kawaida na salama), lakini
tunataka eneo moja tu kwenye msimbo ambapo tunafanya hivyo ili kurahisisha ukaguzi.

```python
    # Kagua mahitaji
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Hutengua ikiwa `_to` ni anwani sifuri
    assert _to != ZERO_ADDRESS
    # Futa idhini. Hutengua ikiwa `_from` si mmiliki wa sasa
    self._clearApproval(_from, _tokenId)
    # Ondoa NFT. Hutengua ikiwa `_tokenId` si NFT halali
    self._removeTokenFrom(_from, _tokenId)
    # Ongeza NFT
    self._addTokenTo(_to, _tokenId)
    # Rekodi hamisho
    log Transfer(_from, _to, _tokenId)
```

Ili kutoa tukio katika Vyper unatumia taarifa ya `log` ([tazama hapa kwa maelezo zaidi](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).

#### Kazi za Hamisho {#transfer-funs}

```python

### KAZI ZA HAMISHO ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev Hutengua isipokuwa `msg.sender` ni mmiliki wa sasa, mhudumu aliyeidhinishwa, au anwani
         iliyoidhinishwa kwa NFT hii.
         Hutengua ikiwa `_from` si mmiliki wa sasa.
         Hutengua ikiwa `_to` ni anwani sifuri.
         Hutengua ikiwa `_tokenId` si NFT halali.
    @notice Mpigaji ana jukumu la kuthibitisha kwamba `_to` ina uwezo wa kupokea NFT la sivyo
            zinaweza kupotea kabisa.
    @param _from Mmiliki wa sasa wa NFT.
    @param _to Mmiliki mpya.
    @param _tokenId NFT ya kufanyia hamisho.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Kazi hii inakuruhusu kuhamisha kwenda kwenye anwani yoyote. Isipokuwa anwani ni mtumiaji, au mkataba unaojua
jinsi ya kuhamisha tokeni, tokeni yoyote unayohamisha itakwama kwenye anwani hiyo na kukosa faida.

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev Hufanya hamisho la umiliki wa NFT kutoka anwani moja hadi anwani nyingine.
         Hutengua isipokuwa `msg.sender` ni mmiliki wa sasa, mhudumu aliyeidhinishwa, au
         anwani iliyoidhinishwa kwa NFT hii.
         Hutengua ikiwa `_from` si mmiliki wa sasa.
         Hutengua ikiwa `_to` ni anwani sifuri.
         Hutengua ikiwa `_tokenId` si NFT halali.
         Ikiwa `_to` ni mkataba mahiri, inaita `onERC721Received` kwenye `_to` na hutengua ikiwa
         thamani inayorejeshwa si `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
         KUMBUKA: bytes4 inawakilishwa na bytes32 yenye padding
    @param _from Mmiliki wa sasa wa NFT.
    @param _to Mmiliki mpya.
    @param _tokenId NFT ya kufanyia hamisho.
    @param _data Data ya ziada isiyo na umbizo maalum, iliyotumwa katika wito kwa `_to`.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Ni Sawa kufanya hamisho kwanza kwa sababu ikiwa kuna tatizo tutatengua hata hivyo,
kwa hivyo kila kitu kilichofanywa kwenye wito kitaghairiwa.

```python
    if _to.is_contract: # kagua ikiwa `_to` ni anwani ya mkataba
```

Kwanza kagua ili kuona ikiwa anwani ni mkataba (ikiwa ina msimbo). Ikiwa sivyo, chukulia ni anwani ya mtumiaji
na mtumiaji ataweza kutumia tokeni au kuihamisha. Lakini usiruhusu ikupe hisia potofu za usalama.
Unaweza kupoteza tokeni, hata kwa `safeTransferFrom`, ikiwa utazihamisha kwenda kwenye anwani ambayo hakuna anayejua ufunguo wa siri.

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Ita mkataba lengwa ili kuona ikiwa unaweza kupokea tokeni za ERC-721.

```python
        # Hutengua ikiwa kituo cha hamisho ni mkataba ambao hautekelezi 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

Ikiwa marudio ni mkataba, lakini ambao haukubali tokeni za ERC-721 (au ambao umeamua kutokubali hamisho hili
maalum), tengua.

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Weka au thibitisha tena anwani iliyoidhinishwa kwa NFT. Anwani sifuri inaashiria hakuna anwani iliyoidhinishwa.
         Hutengua isipokuwa `msg.sender` ni mmiliki wa sasa wa NFT, au mhudumu aliyeidhinishwa wa mmiliki wa sasa.
         Hutengua ikiwa `_tokenId` si NFT halali. (KUMBUKA: Hili halijaandikwa kwenye EIP)
         Hutengua ikiwa `_approved` ni mmiliki wa sasa. (KUMBUKA: Hili halijaandikwa kwenye EIP)
    @param _approved Anwani itakayoidhinishwa kwa Kitambulisho cha NFT kilichopewa.
    @param _tokenId Kitambulisho cha tokeni itakayoidhinishwa.
    """
    owner: address = self.idToOwner[_tokenId]
    # Hutengua ikiwa `_tokenId` si NFT halali
    assert owner != ZERO_ADDRESS
    # Hutengua ikiwa `_approved` ni mmiliki wa sasa
    assert _approved != owner
```

Kwa kawaida ikiwa hutaki kuwa na muidhinishaji unateua anwani sifuri, si wewe mwenyewe.

```python
    # Kagua mahitaji
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
    @dev Huwasha au kuzima idhini kwa mtu wa tatu ("mhudumu") kusimamia rasilimali zote za
         `msg.sender`. Pia hutoa tukio la ApprovalForAll.
         Hutengua ikiwa `_operator` ni `msg.sender`. (KUMBUKA: Hili halijaandikwa kwenye EIP)
    @notice Hii inafanya kazi hata kama mtumaji hamiliki tokeni zozote kwa wakati huo.
    @param _operator Anwani ya kuongeza kwenye kundi la wahudumu walioidhinishwa.
    @param _approved Kweli ikiwa wahudumu wameidhinishwa, si kweli kubatilisha idhini.
    """
    # Hutengua ikiwa `_operator` ni `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### Kufua Tokeni Mpya na Kuteketeza Zilizopo {#mint-burn}

Akaunti iliyounda mkataba ni `minter`, mtumiaji mkuu ambaye ameidhinishwa kufua
NFT mpya. Hata hivyo, hata yeye haruhusiwi kuteketeza tokeni zilizopo. Mmiliki pekee, au chombo
kilichoidhinishwa na mmiliki, ndiye anayeweza kufanya hivyo.

```python
### KAZI ZA KUFUA NA KUTEKETEZA ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

Kazi hii kila wakati inarejesha `True`, kwa sababu ikiwa operesheni itashindwa inatenguliwa.

```python
    """
    @dev Kazi ya kufua tokeni
         Hutengua ikiwa `msg.sender` si mfuzi.
         Hutengua ikiwa `_to` ni anwani sifuri.
         Hutengua ikiwa `_tokenId` inamilikiwa na mtu.
    @param _to Anwani itakayopokea tokeni zilizofuawa.
    @param _tokenId Kitambulisho cha tokeni cha kufua.
    @return Boolean inayoashiria ikiwa operesheni ilifanikiwa.
    """
    # Hutengua ikiwa `msg.sender` si mfuzi
    assert msg.sender == self.minter
```

Mfuaji pekee (akaunti iliyounda mkataba wa ERC-721) ndiye anayeweza kufua tokeni mpya. Hili linaweza kuwa
tatizo katika siku zijazo ikiwa tunataka kubadilisha utambulisho wa mfuaji. Katika
mkataba wa uzalishaji labda ungetaka kazi inayomruhusu mfuaji kuhamisha
mapendeleo ya mfuaji kwa mtu mwingine.

```python
    # Hutengua ikiwa `_to` ni anwani sifuri
    assert _to != ZERO_ADDRESS
    # Ongeza NFT. Hutengua ikiwa `_tokenId` inamilikiwa na mtu
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

Kwa kawaida, ufuzi wa tokeni mpya huhesabiwa kama hamisho kutoka kwenye anwani sifuri.

```python

@external
def burn(_tokenId: uint256):
    """
    @dev Huteketeza tokeni maalum ya ERC-721.
         Hutengua isipokuwa `msg.sender` ni mmiliki wa sasa, mhudumu aliyeidhinishwa, au anwani
         iliyoidhinishwa kwa NFT hii.
         Hutengua ikiwa `_tokenId` si NFT halali.
    @param _tokenId uint256 kitambulisho cha tokeni ya ERC-721 itakayoteketezwa.
    """
    # Kagua mahitaji
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # Hutengua ikiwa `_tokenId` si NFT halali
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

Mtu yeyote anayeruhusiwa kuhamisha tokeni anaruhusiwa kuiteketeza. Ingawa uteketezaji unaonekana sawa na
hamisho kwenda kwenye anwani sifuri, anwani sifuri haipokei tokeni haswa. Hii inaturuhusu
kufungua hifadhi yote iliyotumika kwa tokeni, ambayo inaweza kupunguza gharama ya gesi ya muamala.

## Kutumia Mkataba Huu {#using-contract}

Tofauti na Solidity, Vyper haina urithi. Huu ni uamuzi wa makusudi wa muundo ili kufanya
msimbo uwe wazi zaidi na kwa hivyo rahisi kulinda. Kwa hivyo ili kuunda mkataba wako wa Vyper ERC-721 unachukua [mkataba
huu](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) na kuubadilisha
ili kutekeleza mantiki ya biashara unayotaka.

## Hitimisho {#conclusion}

Kwa ukaguzi, haya ni baadhi ya mawazo muhimu zaidi katika mkataba huu:

- Ili kupokea tokeni za ERC-721 kwa hamisho salama, mikataba inapaswa kutekeleza kiolesura cha `ERC721Receiver`.
- Hata kama unatumia hamisho salama, tokeni bado zinaweza kukwama ikiwa utazituma kwenye anwani ambayo ufunguo wa siri
  wake haujulikani.
- Kunapokuwa na tatizo na operesheni ni wazo zuri kutumia `revert` kwa wito, badala ya kurejesha tu
  thamani ya kushindwa.
- Tokeni za ERC-721 huwepo zinapokuwa na mmiliki.
- Kuna njia tatu za kuidhinishwa kuhamisha NFT. Unaweza kuwa mmiliki, kuidhinishwa kwa tokeni maalum,
  au kuwa mwendeshaji kwa tokeni zote za mmiliki.
- Matukio yaliyopita yanaonekana tu nje ya mnyororo wa vitalu. Msimbo unaoendeshwa ndani ya mnyororo wa vitalu hauwezi kuyaona.

Sasa nenda katekeleze mikataba salama ya Vyper.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).