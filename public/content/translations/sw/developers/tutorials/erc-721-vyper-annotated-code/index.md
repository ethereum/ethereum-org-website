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

Maoni katika Vyper, kama ilivyo katika Python, huanza na heshi (`ethereum.ercs`) na kuendelea hadi mwisho wa mstari. Maoni yanayojumuisha
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

```python
#pragma version >0.3.10
```

```python
#pragma version >0.3.10
```
### Kiolesura cha ERC721Receiver

```python
# Kiolesura cha mkataba kinachoitwa na safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 inasaidia aina mbili za hamisho:

- `transferFrom`, ambayo inamruhusu mtumaji kubainisha anwani yoyote ya mwisho na kuweka jukumu la hamisho kwa mtumaji. Hii inamaanisha kuwa unaweza kuhamisha kwenda kwenye anwani batili, ambapo NFT itapotea kabisa.
- `safeTransferFrom`, ambayo inakagua ikiwa anwani ya mwisho ni mkataba. Ikiwa ndivyo, mkataba wa ERC-721 unauliza mkataba unaopokea ikiwa unataka kupokea NFT.

Ili kujibu maombi ya `safeTransferFrom` mkataba unaopokea unapaswa kutekeleza `ERC721Receiver`.

```python
            _operator: address,
            _from: address,
```

Anwani ya `_from` ni mmiliki wa sasa wa tokeni. Anwani ya `_operator` ni ile iliyoomba hamisho (hizo mbili zinaweza zisiwe sawa, kwa sababu ya vibali). Kwa kawaida, vigezo vingi vya kazi katika mkataba huu huanza na mstari wa chini (`_`).

```python
            _tokenId: uint256,
```

Vitambulisho vya tokeni za ERC-721 ni biti 256. Kwa kawaida huundwa kwa kuheshi maelezo ya chochote ambacho tokeni inawakilisha.

```python
            _data: Bytes[1024]
```

Ombi linaweza kuwa na hadi baiti 1024 za data ya mtumiaji.

```python
        ) -> bytes4: nonpayable
```

Ili kuzuia visa ambapo mkataba unakubali hamisho kwa bahati mbaya, thamani inayorejeshwa si boolean, bali ni thamani maalum ya baiti nne, kiteuzi cha kazi cha `onERC721Received`. Kazi hii ni `nonpayable` kwa sababu mkataba unaopokea unaweza kubadilisha hali yake wenyewe unapokubali tokeni.
### Matukio

[Matukio](/developers/docs/smart-contracts/anatomy/#events-and-logs)
hutolewa ili kuwajulisha watumiaji na seva zilizo nje ya mnyororo wa vitalu kuhusu matukio. Kumbuka kwamba maudhui ya matukio hayapatikani kwa mikataba kwenye mnyororo wa vitalu. Matukio matatu ya ERC-721 yamefafanuliwa na kiolesura cha `IERC721` tulichoingiza, kwa hivyo mkataba huu hauyatangazi wenyewe; unayatoa kwa `log IERC721.<Event>(...)`, kama tutakavyoona katika kazi za hamisho hapa chini.

`Transfer` (`sender`, `receiver`, `token_id`) inaripoti mabadiliko katika umiliki wa NFT. Hii inafanana na tukio la Hamisho la ERC-20, isipokuwa kwamba tunaripoti `token_id` badala ya kiasi. Hakuna anayemiliki anwani sifuri, kwa hivyo kwa kawaida tunaitumia kuripoti uundaji na uteketezaji wa tokeni. Ubaguzi mmoja ni uundaji wa mkataba, ambapo idadi yoyote ya NFT inaweza kuundwa na kugawiwa bila kutoa `Transfer`.

Idhini ya ERC-721 inafanana na kibali cha ERC-20: anwani maalum inaruhusiwa kuhamisha tokeni maalum, na `Approval` (`owner`, `approved`, `token_id`) hutolewa kila wakati anwani hiyo iliyoidhinishwa inapowekwa au kuthibitishwa tena. Hii inatoa utaratibu kwa mikataba kujibu inapokubali tokeni. Mikataba haiwezi kusikiliza matukio, kwa hivyo ikiwa utaihamishia tokeni tu "haijui" kuihusu. Kwa njia hii mmiliki kwanza anawasilisha idhini na kisha kutuma ombi kwa mkataba: "Nimekuidhinisha kuhamisha tokeni X, tafadhali fanya ...". Hili ni chaguo la muundo ili kufanya kiwango cha ERC-721 kifanane na kiwango cha ERC-20. Kwa sababu tokeni za ERC-721 hazifungiki, mkataba unaweza pia kutambua kwamba ulipata tokeni maalum kwa kuangalia umiliki wa tokeni.

Hatimaye, `ApprovalForAll` (`owner`, `operator`, `approved`) hutolewa wakati _mhudumu_ anapowezeshwa au kulemazwa kwa mmiliki. Wakati mwingine ni muhimu kuwa na mhudumu anayeweza kusimamia tokeni zote za akaunti za aina maalum (zile zinazosimamiwa na mkataba maalum), sawa na nguvu ya kisheria. Kwa mfano, ninaweza kutaka kutoa nguvu kama hiyo kwa mkataba ambao unakagua ikiwa sijawasiliana nao kwa miezi sita, na ikiwa ndivyo unasambaza rasilimali zangu kwa warithi wangu (ikiwa mmoja wao ataiomba, mikataba haiwezi kufanya chochote bila kuitwa na muamala). Katika ERC-20 tunaweza tu kutoa kibali kikubwa kwa mkataba wa urithi, lakini hiyo haifanyi kazi kwa ERC-721 kwa sababu tokeni hazifungiki. Hii ndiyo sawa yake. Thamani ya `approved` inatuambia ikiwa tukio ni la idhini, au utoaji wa idhini.
### Vigezo vya Hali

Vigezo hivi vina hali ya sasa ya tokeni: zipi zinapatikana na nani anazimiliki. Vingi vya hivi ni vitu vya `HashMap`, [ramani za mwelekeo mmoja zilizopo kati ya aina mbili](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev Ramani kutoka Kitambulisho cha NFT hadi anwani inayoimiliki.
idToOwner: HashMap[uint256, address]

# @dev Ramani kutoka Kitambulisho cha NFT hadi anwani iliyoidhinishwa.
idToApprovals: HashMap[uint256, address]
```

Vitambulisho vya mtumiaji na mkataba katika Ethereum vinawakilishwa na anwani za biti 160. Vigezo hivi viwili vinachora ramani kutoka kwa vitambulisho vya tokeni hadi kwa wamiliki wake na wale walioidhinishwa kuzihamisha (kwa kiwango cha juu cha mmoja kwa kila moja). Katika Ethereum, data ambayo haijaanzishwa kila wakati ni sifuri, kwa hivyo ikiwa hakuna mmiliki au mhamishaji aliyeidhinishwa thamani ya tokeni hiyo ni sifuri.

```python
# @dev Ramani kutoka anwani ya mmiliki hadi idadi ya tokeni zake.
ownerToNFTokenCount: HashMap[address, uint256]
```

Kigezo hiki kinashikilia idadi ya tokeni kwa kila mmiliki. Hakuna ramani kutoka kwa wamiliki hadi tokeni, kwa hivyo njia pekee ya kutambua tokeni ambazo mmiliki maalum anamiliki ni kuangalia nyuma katika historia ya matukio ya mnyororo wa vitalu na kuona matukio yanayofaa ya `Transfer`. Tunaweza kutumia kigezo hiki kujua wakati tuna NFT zote na hatuhitaji kuangalia zaidi nyuma kwa wakati.

Kumbuka kwamba algoriti hii inafanya kazi tu kwa violesura vya mtumiaji na seva za nje. Msimbo unaoendeshwa kwenye mnyororo wa vitalu wenyewe hauwezi kusoma matukio yaliyopita.

```python
# @dev Ramani kutoka anwani ya mmiliki hadi ramani ya anwani za wahudumu.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Akaunti inaweza kuwa na zaidi ya mhudumu mmoja. `HashMap` rahisi haitoshi kufuatilia, kwa sababu kila ufunguo unaongoza kwenye thamani moja. Badala yake, unaweza kutumia `HashMap[address, bool]` kama thamani. Kwa chaguo-msingi thamani ya kila anwani ni `False`, ambayo inamaanisha si mhudumu. Unaweza kuweka thamani kuwa `True` kama inavyohitajika.

```python
# @dev Anwani ya mfuaji, anayeweza kufua tokeni
minter: address
```

Tokeni mpya zinapaswa kuundwa kwa namna fulani. Katika mkataba huu kuna chombo kimoja kinachoruhusiwa kufanya hivyo, `minter`. Hii inawezekana inatosha kwa mchezo, kwa mfano. Kwa madhumuni mengine, inaweza kuwa muhimu kuunda mantiki ngumu zaidi ya biashara.

```python
# @dev Orodha tuli ya vitambulisho vya kiolesura vya ERC165 vinavyotumika
SUPPORTED_INTERFACES: constant(bytes4[2]) = [
    # Kitambulisho cha kiolesura cha ERC165 cha ERC165
    0x01ffc9a7,
    # Kitambulisho cha kiolesura cha ERC165 cha ERC721
    0x80ac58cd,
]
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) inabainisha utaratibu wa mkataba kufichua jinsi programu zinavyoweza kuwasiliana nao, ni ERC zipi unazofuata. `SUPPORTED_INTERFACES` ni orodha isiyobadilika ya vitambulisho viwili vya kiolesura vya baiti nne ambavyo mkataba huu unafuata: ERC-165 yenyewe na ERC-721.
### Kazi {#functions}

Hizi ndizo kazi ambazo zinatekeleza ERC-721 haswa.

#### Konstrukta

```python
@deploy
def __init__():
```

Katika Vyper, kama ilivyo katika Python, kazi ya konstrukta inaitwa `__init__`. Imewekwa alama ya mapambo ya `@deploy`, ambayo inamaanisha inaendeshwa mara moja, wakati mkataba unaposambazwa.

```python
    """
    @dev Konstrukta ya mkataba.
    """
```

Katika Python, na katika Vyper, unaweza pia kuunda maoni kwa kubainisha mfuatano wa mistari mingi (ambao huanza na kuishia na `"""`), na kutoutumia kwa njia yoyote. Maoni haya yanaweza pia kujumuisha
[NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html).

```python
    self.minter = msg.sender
```

Ili kufikia vigezo vya hali unatumia `self.<variable name>` (tena, sawa na katika Python). Konstrukta inarekodi akaunti iliyosambaza mkataba kama `minter`.
#### Kazi za Kutazama

Hizi ni kazi ambazo hazibadilishi hali ya mnyororo wa vitalu, na kwa hivyo zinaweza kutekelezwa bila malipo ikiwa zinaitwa kutoka nje. Ikiwa kazi za kutazama zinaitwa na mkataba bado zinapaswa kutekelezwa kwenye kila nodi na kwa hivyo zinagharimu gesi.

```python
@view
@external
```

Maneno haya muhimu kabla ya ufafanuzi wa kazi ambayo huanza na alama ya at (`@`) yanaitwa _mapambo_. Yanabainisha mazingira ambayo kazi inaweza kuitwa.

- `@view` inabainisha kuwa kazi hii ni ya kutazama.
- `@external` inabainisha kuwa kazi hii maalum inaweza kuitwa na miamala na mikataba mingine.

```python
def supportsInterface(interface_id: bytes4) -> bool:
```

Tofauti na Python, Vyper ni [lugha yenye aina tuli](https://wikipedia.org/wiki/Type_system#Static_type_checking).
Huwezi kutangaza kigezo, au kigezo cha kazi, bila kutambua [aina ya data](https://vyper.readthedocs.io/en/latest/types.html). Katika kesi hii kigezo cha kuingiza ni `bytes4`, thamani ya baiti nne, na pato ni thamani ya boolean.

```python
    """
    @dev Utambulisho wa kiolesura umebainishwa katika ERC-165.
    @param interface_id Kitambulisho cha kiolesura
    """
    return interface_id in SUPPORTED_INTERFACES
```

Rejesha `True` ikiwa `interface_id` ni mojawapo ya vitambulisho vya kiolesura katika orodha ya `SUPPORTED_INTERFACES`.

```python
### KAZI ZA KUTAZAMA ###
```

Hizi ni kazi za kutazama zinazofanya taarifa kuhusu tokeni zipatikane kwa watumiaji na mikataba mingine.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev Inarejesha idadi ya NFT zinazomilikiwa na `_owner`.
         Inatupa kosa ikiwa `_owner` ni anwani sifuri. NFT zilizogawiwa kwa anwani sifuri huchukuliwa kuwa batili.
    @param _owner Anwani ya kuulizia salio.
    """
    assert _owner != empty(address)
```

Mstari huu [unathibitisha](https://vyper.readthedocs.io/en/latest/statements.html#assert) kwamba `_owner` si
anwani sifuri, iliyoandikwa kama `empty(address)`. Ikiwa ndivyo, kuna kosa na operesheni inatenguliwa.

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev Inarejesha anwani ya mmiliki wa NFT.
         Inatupa kosa ikiwa `_tokenId` si NFT halali.
    @param _tokenId Kitambulisho cha NFT.
    """
    owner: address = self.idToOwner[_tokenId]
    # Inatupa kosa ikiwa `_tokenId` si NFT halali
    assert owner != empty(address)
    return owner
```

Katika Mashine Pepe ya Ethereum (EVM) hifadhi yoyote ambayo haina thamani iliyohifadhiwa ndani yake ni sifuri.
Ikiwa hakuna tokeni kwenye `_tokenId` basi thamani ya `self.idToOwner[_tokenId]` ni sifuri. Katika
kesi hiyo kazi inatengua.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Pata anwani iliyoidhinishwa kwa NFT moja.
         Inatupa kosa ikiwa `_tokenId` si NFT halali.
    @param _tokenId Kitambulisho cha NFT cha kuulizia idhini yake.
    """
    # Inatupa kosa ikiwa `_tokenId` si NFT halali
    assert self.idToOwner[_tokenId] != empty(address)
    return self.idToApprovals[_tokenId]
```

Kumbuka kwamba `getApproved` _inaweza_ kurejesha sifuri. Ikiwa tokeni ni halali inarejesha `self.idToApprovals[_tokenId]`.
Ikiwa hakuna muidhinishaji thamani hiyo ni sifuri.

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev Inakagua ikiwa `_operator` ni mhudumu aliyeidhinishwa kwa `_owner`.
    @param _owner Anwani inayomiliki NFT.
    @param _operator Anwani inayofanya kazi kwa niaba ya mmiliki.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

Kazi hii inakagua ikiwa `_operator` inaruhusiwa kusimamia tokeni zote za `_owner` katika mkataba huu.
Kwa sababu kunaweza kuwa na wahudumu wengi, hii ni HashMap ya viwango viwili.
#### Kazi za Kusaidia Hamisho

Kazi hizi zinatekeleza operesheni ambazo ni sehemu ya kuhamisha au kusimamia tokeni.

```python

### WASAIDIZI WA KAZI ZA HAMISHO ###

@view
@internal
```

Pambo hili, `@internal`, linamaanisha kuwa kazi inapatikana tu kutoka kwa kazi zingine ndani ya mkataba huo huo. Kwa kawaida, majina ya kazi hizi pia huanza na mstari wa chini (`_`).

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev Inarejesha ikiwa mtumiaji aliyepewa anaweza kuhamisha Kitambulisho cha tokeni kilichopewa
    @param spender anwani ya mtumiaji wa kuulizia
    @param tokenId uint256 Kitambulisho cha tokeni itakayohamishwa
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

1. Anwani ni mmiliki wa tokeni
2. Anwani imeidhinishwa kutumia tokeni hiyo
3. Anwani ni mhudumu kwa mmiliki wa tokeni

Kazi iliyo hapo juu inaweza kuwa ya kutazama kwa sababu haibadilishi hali. Ili kupunguza gharama za uendeshaji, kazi yoyote ambayo _inaweza_ kuwa ya kutazama _inapaswa_ kuwa ya kutazama.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Ongeza NFT kwenye anwani iliyopewa
         Inatupa kosa ikiwa `_tokenId` inamilikiwa na mtu.
    """
    # Inatupa kosa ikiwa `_tokenId` inamilikiwa na mtu
    assert self.idToOwner[_tokenId] == empty(address)
    # Badilisha mmiliki
    self.idToOwner[_tokenId] = _to
    # Badilisha ufuatiliaji wa idadi
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Ondoa NFT kutoka kwa anwani iliyopewa
         Inatupa kosa ikiwa `_from` si mmiliki wa sasa.
    """
    # Inatupa kosa ikiwa `_from` si mmiliki wa sasa
    assert self.idToOwner[_tokenId] == _from
    # Badilisha mmiliki
    self.idToOwner[_tokenId] = empty(address)
    # Badilisha ufuatiliaji wa idadi
    self.ownerToNFTokenCount[_from] -= 1
```

Kunapokuwa na tatizo na hamisho tunatengua wito.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Futa idhini ya anwani iliyopewa
         Inatupa kosa ikiwa `_owner` si mmiliki wa sasa.
    """
    # Inatupa kosa ikiwa `_owner` si mmiliki wa sasa
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != empty(address):
        # Weka upya idhini
        self.idToApprovals[_tokenId] = empty(address)
```

Badilisha thamani tu ikiwa ni lazima. Vigezo vya hali huishi kwenye hifadhi. Kuandika kwenye hifadhi ni
mojawapo ya operesheni ghali zaidi ambazo EVM (Mashine Pepe ya Ethereum) hufanya (kwa upande wa
[gesi](/developers/docs/gas/)). Kwa hivyo, ni wazo zuri kuipunguza, hata kuandika thamani
iliyopo kuna gharama kubwa.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Tekeleza hamisho la NFT.
         Inatupa kosa isipokuwa `msg.sender` ni mmiliki wa sasa, mhudumu aliyeidhinishwa, au anwani
         iliyoidhinishwa kwa NFT hii. (KUMBUKA: `msg.sender` hairuhusiwi katika kazi ya faragha kwa hivyo pitisha `_sender`.)
         Inatupa kosa ikiwa `_to` ni anwani sifuri.
         Inatupa kosa ikiwa `_from` si mmiliki wa sasa.
         Inatupa kosa ikiwa `_tokenId` si NFT halali.
    """
```

Tuna kazi hii ya ndani kwa sababu kuna njia mbili za kuhamisha tokeni (ya kawaida na salama), lakini
tunataka eneo moja tu katika msimbo ambapo tunafanya hivyo ili kurahisisha ukaguzi.

```python
    # Kagua mahitaji
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Inatupa kosa ikiwa `_to` ni anwani sifuri
    assert _to != empty(address)
    # Futa idhini. Inatupa kosa ikiwa `_from` si mmiliki wa sasa
    self._clearApproval(_from, _tokenId)
    # Ondoa NFT. Inatupa kosa ikiwa `_tokenId` si NFT halali
    self._removeTokenFrom(_from, _tokenId)
    # Ongeza NFT
    self._addTokenTo(_to, _tokenId)
    # Rekodi hamisho
    log IERC721.Transfer(sender=_from, receiver=_to, token_id=_tokenId)
```

Ili kutoa tukio katika Vyper unatumia taarifa ya `log` ([tazama hapa kwa maelezo zaidi](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).
Kwa sababu matukio ni ya kiolesura kilichoingizwa, tunayarejelea kama `IERC721.Transfer` na kupitisha nyanja zake kwa
neno muhimu.
#### Kazi za Hamisho

```python

### KAZI ZA HAMISHO ###

@external
@payable
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev Inatupa kosa isipokuwa `msg.sender` ni mmiliki wa sasa, mhudumu aliyeidhinishwa, au anwani
         iliyoidhinishwa kwa NFT hii.
         Inatupa kosa ikiwa `_from` si mmiliki wa sasa.
         Inatupa kosa ikiwa `_to` ni anwani sifuri.
         Inatupa kosa ikiwa `_tokenId` si NFT halali.
    @notice Mpigaji anawajibika kuthibitisha kwamba `_to` ina uwezo wa kupokea NFT au sivyo
            zinaweza kupotea kabisa.
    @param _from Mmiliki wa sasa wa NFT.
    @param _to Mmiliki mpya.
    @param _tokenId NFT ya kuhamisha.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Kazi hii inakuwezesha kuhamisha kwenda kwenye anwani yoyote. Isipokuwa anwani ni mtumiaji, au mkataba unaojua jinsi ya kuhamisha tokeni, tokeni yoyote unayohamisha itakwama kwenye anwani hiyo na kukosa faida.

Pambo la `@payable` liko hapa kwa sababu kiolesura cha `IERC721` kinatangaza `transferFrom`, `safeTransferFrom`, na
`approve` kama zinazolipwa, kwa hivyo mkataba unaotekeleza kiolesura unapaswa kulingana na saini hizo.

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
    @dev Inahamisha umiliki wa NFT kutoka anwani moja hadi anwani nyingine.
         Inatupa kosa isipokuwa `msg.sender` ni mmiliki wa sasa, mhudumu aliyeidhinishwa, au
         anwani iliyoidhinishwa kwa NFT hii.
         Inatupa kosa ikiwa `_from` si mmiliki wa sasa.
         Inatupa kosa ikiwa `_to` ni anwani sifuri.
         Inatupa kosa ikiwa `_tokenId` si NFT halali.
         Ikiwa `_to` ni mkataba mahiri, inaita `onERC721Received` kwenye `_to` na inatupa kosa ikiwa
         thamani inayorejeshwa si `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
    @param _from Mmiliki wa sasa wa NFT.
    @param _to Mmiliki mpya.
    @param _tokenId NFT ya kuhamisha.
    @param _data Data ya ziada isiyo na muundo maalum, iliyotumwa katika wito kwa `_to`.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Ni Sawa kufanya hamisho kwanza kwa sababu ikiwa kuna tatizo tutatengua hata hivyo,
kwa hivyo kila kitu kilichofanywa katika wito kitaghairiwa.

```python
    if _to.is_contract: # kagua ikiwa `_to` ni anwani ya mkataba
```

Kwanza kagua ili kuona ikiwa anwani ni mkataba (ikiwa ina msimbo). Ikiwa sivyo, chukulia ni anwani ya mtumiaji
na mtumiaji ataweza kutumia tokeni au kuihamisha. Lakini usiruhusu ikupe hisia potofu
za usalama. Unaweza kupoteza tokeni, hata kwa `safeTransferFrom`, ikiwa utazihamisha
kwenye anwani ambayo hakuna anayejua ufunguo wa siri wake.

```python
        returnValue: bytes4 = extcall ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Ita mkataba lengwa ili kuona ikiwa unaweza kupokea tokeni za ERC-721. Vyper 0.4 inahitaji wito kwa mikataba mingine
kuwekewa alama, kwa hivyo wito unawekewa kiambishi awali cha `extcall`.

```python
        # Inatupa kosa ikiwa mwisho wa hamisho ni mkataba ambao hautekelezi 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes4)
```

Ikiwa mwisho ni mkataba, lakini ambao haukubali tokeni za ERC-721 (au ambao umeamua kutokubali hamisho hili
maalum), tengua.

```python
@external
@payable
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Weka au thibitisha tena anwani iliyoidhinishwa kwa NFT. Anwani sifuri inaonyesha hakuna anwani iliyoidhinishwa.
         Inatupa kosa isipokuwa `msg.sender` ni mmiliki wa sasa wa NFT, au mhudumu aliyeidhinishwa wa mmiliki wa sasa.
         Inatupa kosa ikiwa `_tokenId` si NFT halali. (KUMBUKA: Hili halijaandikwa kwenye EIP)
         Inatupa kosa ikiwa `_approved` ni mmiliki wa sasa. (KUMBUKA: Hili halijaandikwa kwenye EIP)
    @param _approved Anwani itakayoidhinishwa kwa Kitambulisho cha NFT kilichopewa.
    @param _tokenId Kitambulisho cha tokeni itakayoidhinishwa.
    """
    owner: address = self.idToOwner[_tokenId]
    # Inatupa kosa ikiwa `_tokenId` si NFT halali
    assert owner != empty(address)
    # Inatupa kosa ikiwa `_approved` ni mmiliki wa sasa
    assert _approved != owner
```

Kwa kawaida ikiwa hutaki kuwa na muidhinishaji unateua anwani sifuri, si wewe mwenyewe.

```python
    # Kagua mahitaji
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

Ili kuweka idhini unaweza kuwa mmiliki, au mhudumu aliyeidhinishwa na mmiliki.

```python
    # Weka idhini
    self.idToApprovals[_tokenId] = _approved
    log IERC721.Approval(owner=owner, approved=_approved, token_id=_tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Inawezesha au kulemaza idhini kwa mtu wa tatu ("mhudumu") kusimamia rasilimali zote za
         `msg.sender`. Pia inatoa tukio la ApprovalForAll.
         Inatupa kosa ikiwa `_operator` ni `msg.sender`. (KUMBUKA: Hili halijaandikwa kwenye EIP)
    @notice Hii inafanya kazi hata kama mtumaji hamiliki tokeni zozote kwa wakati huo.
    @param _operator Anwani ya kuongeza kwenye seti ya wahudumu walioidhinishwa.
    @param _approved True ikiwa wahudumu wameidhinishwa, false kubatilisha idhini.
    """
    # Inatupa kosa ikiwa `_operator` ni `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log IERC721.ApprovalForAll(owner=msg.sender, operator=_operator, approved=_approved)
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
