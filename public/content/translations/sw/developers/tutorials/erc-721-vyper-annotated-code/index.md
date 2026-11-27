---
title: "Mwongozo wa Mkataba wa Vyper ERC-721"
description: "Mkataba wa ERC-721 wa Ryuya Nakamura na jinsi unavyofanya kazi"
author: Ori Pomerantz
lang: sw
tags: ["Vyper", "erc-721", "Python"]
skill: beginner
breadcrumb: "Vyper ERC-721"
published: 2021-04-01
---

## Utangulizi {#introduction}

Kiwango cha [ERC-721](/developers/docs/standards/tokens/erc-721/) kinatumika kushikilia umiliki wa tokani isiyobadilishika (NFT).
Tokeni za [ERC-20](/developers/docs/standards/tokens/erc-20/) hufanya kazi kama bidhaa, kwa sababu hakuna tofauti kati ya tokeni moja na nyingine.
Tofauti na hilo, tokeni za ERC-721 zimeundwa kwa ajili ya rasilimali zinazofanana lakini si sawa kabisa, kama vile [katuni tofauti za paka](https://www.cryptokitties.co/)
au hatimiliki za vipande tofauti vya ardhi.

Katika makala haya tutachambua [mkataba wa ERC-721 wa Ryuya Nakamura](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy).
Mkataba huu umeandikwa kwa [Vyper](https://vyper.readthedocs.io/en/latest/index.html), lugha ya mkataba inayofanana na Python iliyoundwa kufanya iwe vigumu kuandika msimbo usio salama kuliko ilivyo katika Solidity.

## Mkataba {#contract}

```python
#pragma version >0.3.10
```

Mstari wa `#pragma version` unaiambia kompayla ni matoleo yapi ya Vyper ambayo mkataba umeandikiwa. `>0.3.10` inakubali toleo lolote jipya zaidi ya 0.3.10, lakini mkataba huu kwa kweli unahitaji Vyper 0.4.1 au matoleo ya baadaye: inarekodi matukio yenye hoja za maneno muhimu (kwa mfano `log IERC721.Transfer(...)`), kipengele kilichoongezwa katika Vyper 0.4.1, kwa hivyo haikusanyiki kwenye 0.4.0.

```python
# @dev Utekelezaji wa kiwango cha tokani isiyobadilishika (NFT) cha ERC-721.
# @author Ryuya Nakamura (@nrryuya)
# Imebadilishwa kutoka: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Maoni katika Vyper, kama ilivyo katika Python, huanza na heshi (`#`) na kuendelea hadi mwisho wa mstari. Maoni yanayojumuisha `@<keyword>` hutumiwa na [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) kutoa nyaraka zinazosomeka na binadamu.

```python
from ethereum.ercs import IERC165
from ethereum.ercs import IERC721

implements: IERC721
implements: IERC165
```

Violesura vya ERC-165 na ERC-721 huja na kompayla ya Vyper, kwa hivyo tunaviingiza kutoka `ethereum.ercs` badala ya kuviandika wenyewe. [Unaweza kuona ufafanuzi wa kiolesura cha ERC-721 hapa](https://github.com/vyperlang/vyper/blob/master/vyper/builtins/interfaces/IERC721.vyi).
Mistari ya `implements:` inatangaza kwamba mkataba huu unatoa violesura vyote viwili, na kompayla inakagua kwamba kila kipengele wanachohitaji kimefafanuliwa hapa chini.

### Kiolesura cha ERC721Receiver {#receiver-interface}

```python
# Kiolesura cha mkataba kinachoitwa na safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 inasaidia aina mbili za hamisho:

- `transferFrom`, ambayo inamruhusu mtumaji kubainisha anwani yoyote ya marudio na kuweka jukumu la hamisho kwa mtumaji. Hii inamaanisha kuwa unaweza kuhamisha kwenda kwenye anwani batili, ambapo NFT itapotea kabisa.
- `safeTransferFrom`, ambayo inakagua ikiwa anwani ya marudio ni mkataba. Ikiwa ndivyo, mkataba wa ERC-721 unauliza mkataba unaopokea ikiwa unataka kupokea NFT.

Ili kujibu maombi ya `safeTransferFrom` mkataba unaopokea unapaswa kutekeleza `ERC721Receiver`.

```python
            _operator: address,
            _from: address,
```

Anwani ya `_from` ndiye mmiliki wa sasa wa tokeni. Anwani ya `_operator` ndiyo iliyoomba hamisho (hizo mbili zinaweza zisiwe sawa, kwa sababu ya vibali). Kwa kawaida, vigezo vingi vya utendaji katika mkataba huu huanza na mstari wa chini (`_`).

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

Ili kuzuia visa ambapo mkataba unakubali hamisho kwa bahati mbaya thamani inayorejeshwa si boolean, bali ni thamani maalum ya baiti nne, kiteuzi cha utendaji cha `onERC721Received`. Utendaji ni `nonpayable` kwa sababu mkataba unaopokea unaweza kubadilisha hali yake wenyewe unapokubali tokeni.

### Matukio {#events}

[Matukio](/developers/docs/smart-contracts/anatomy/#events-and-logs)
hutolewa ili kuwajulisha watumiaji na seva nje ya mnyororo wa vitalu kuhusu matukio. Kumbuka kwamba maudhui ya matukio hayapatikani kwa mikataba kwenye mnyororo wa vitalu. Matukio matatu ya ERC-721 yamefafanuliwa na kiolesura cha `IERC721` tulichoingiza, kwa hivyo mkataba huu hauyatangazi wenyewe; unayatoa kwa `log IERC721.<Event>(...)`, kama tutakavyoona katika utendaji wa hamisho hapa chini.

`Transfer` (`sender`, `receiver`, `token_id`) inaripoti mabadiliko katika umiliki wa NFT. Hii inafanana na tukio la Hamisho la ERC-20, isipokuwa kwamba tunaripoti `token_id` badala ya kiasi. Hakuna anayemiliki anwani sifuri, kwa hivyo kwa kawaida tunaitumia kuripoti uundaji na uharibifu wa tokeni. Ubaguzi mmoja ni uundaji wa mkataba, ambapo idadi yoyote ya NFT inaweza kuundwa na kugawiwa bila kutoa `Transfer`.

Idhini ya ERC-721 inafanana na kibali cha ERC-20: anwani maalum inaruhusiwa kuhamisha tokeni maalum, na `Approval` (`owner`, `approved`, `token_id`) inatolewa kila wakati anwani hiyo iliyoidhinishwa inapowekwa au kuthibitishwa tena. Hii inatoa utaratibu kwa mikataba kujibu inapokubali tokeni. Mikataba haiwezi kusikiliza matukio, kwa hivyo ikiwa utahamisha tu tokeni kwao "hawajui" kuihusu. Kwa njia hii mmiliki kwanza anawasilisha idhini na kisha kutuma ombi kwa mkataba: "Nimekuidhinisha kuhamisha tokeni X, tafadhali fanya ...". Hili ni chaguo la muundo kufanya kiwango cha ERC-721 kifanane na kiwango cha ERC-20. Kwa sababu tokeni za ERC-721 hazibadilishiki, mkataba unaweza pia kutambua kwamba ulipata tokeni maalum kwa kuangalia umiliki wa tokeni.

Hatimaye, `ApprovalForAll` (`owner`, `operator`, `approved`) inatolewa wakati _mwendeshaji_ anapowezeshwa au kulemazwa kwa mmiliki. Wakati mwingine ni muhimu kuwa na mwendeshaji anayeweza kusimamia tokeni zote za akaunti za aina maalum (zile zinazosimamiwa na mkataba maalum), sawa na nguvu ya uwakili. Kwa mfano, ninaweza kutaka kutoa nguvu kama hiyo kwa mkataba unaokagua ikiwa sijawasiliana nao kwa miezi sita, na ikiwa ndivyo unasambaza rasilimali zangu kwa warithi wangu (ikiwa mmoja wao ataiomba, mikataba haiwezi kufanya chochote bila kuitwa na muamala). Katika ERC-20 tunaweza tu kutoa kibali cha juu kwa mkataba wa urithi, lakini hiyo haifanyi kazi kwa ERC-721 kwa sababu tokeni hazibadilishiki. Hii ndiyo sawa yake. Thamani ya `approved` inatuambia ikiwa tukio ni la idhini, au utoaji wa idhini.

### Vigezo vya Hali {#state-vars}

Vigezo hivi vina hali ya sasa ya tokeni: zipi zinapatikana na nani anazimiliki. Nyingi ya hizi ni vitu vya `HashMap`, [ramani za mwelekeo mmoja zilizopo kati ya aina mbili](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev Ramani kutoka kitambulisho cha NFT kwenda kwenye anwani inayoimiliki.
idToOwner: HashMap[uint256, address]

# @dev Ramani kutoka kitambulisho cha NFT kwenda kwenye anwani iliyoidhinishwa.
idToApprovals: HashMap[uint256, address]
```

Vitambulisho vya mtumiaji na mkataba katika Ethereum vinawakilishwa na anwani za biti 160. Vigezo hivi viwili vinachora kutoka kwa vitambulisho vya tokeni hadi kwa wamiliki wao na wale walioidhinishwa kuzihamisha (kwa kiwango cha juu cha mmoja kwa kila moja). Katika Ethereum, data ambayo haijaanzishwa daima ni sifuri, kwa hivyo ikiwa hakuna mmiliki au mhamishaji aliyeidhinishwa thamani ya tokeni hiyo ni sifuri.

```python
# @dev Ramani kutoka anwani ya mmiliki kwenda kwenye idadi ya tokeni zake.
ownerToNFTokenCount: HashMap[address, uint256]
```

Kigezo hiki kinashikilia hesabu ya tokeni kwa kila mmiliki. Hakuna ramani kutoka kwa wamiliki hadi tokeni, kwa hivyo njia pekee ya kutambua tokeni ambazo mmiliki maalum anamiliki ni kuangalia nyuma katika historia ya matukio ya mnyororo wa vitalu na kuona matukio yanayofaa ya `Transfer`. Tunaweza kutumia kigezo hiki kujua wakati tuna NFT zote na hatuhitaji kuangalia zaidi nyuma kwa wakati.

Kumbuka kwamba algoriti hii inafanya kazi tu kwa violesura vya mtumiaji na seva za nje. Msimbo unaoendeshwa kwenye mnyororo wa vitalu wenyewe hauwezi kusoma matukio yaliyopita.

```python
# @dev Ramani kutoka anwani ya mmiliki kwenda kwenye ramani ya anwani za waendeshaji.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Akaunti inaweza kuwa na zaidi ya mwendeshaji mmoja. `HashMap` rahisi haitoshi kufuatilia, kwa sababu kila ufunguo unaongoza kwa thamani moja. Badala yake, unaweza kutumia `HashMap[address, bool]` kama thamani. Kwa chaguo-msingi thamani ya kila anwani ni `False`, ambayo inamaanisha si mwendeshaji. Unaweza kuweka thamani kuwa `True` kama inavyohitajika.

```python
# @dev Anwani ya mfua, ambaye anaweza kufua tokeni
minter: address
```

Tokeni mpya zinapaswa kuundwa kwa namna fulani. Katika mkataba huu kuna chombo kimoja kinachoruhusiwa kufanya hivyo, `minter`. Hii inawezekana kutosha kwa mchezo, kwa mfano. Kwa madhumuni mengine, inaweza kuwa muhimu kuunda mantiki ya biashara ngumu zaidi.

```python
# @dev Orodha tuli ya vitambulisho vya kiolesura vya ERC-165 vinavyotumika
SUPPORTED_INTERFACES: constant(bytes4[2]) = [
    # Kitambulisho cha kiolesura cha ERC-165 cha ERC-165
    0x01ffc9a7,
    # Kitambulisho cha kiolesura cha ERC-165 cha ERC-721
    0x80ac58cd,
]
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) inabainisha utaratibu wa mkataba kufichua jinsi programu zinavyoweza kuwasiliana nao, ni ERC zipi unazofuata. `SUPPORTED_INTERFACES` ni orodha isiyobadilika ya vitambulisho viwili vya kiolesura vya baiti nne ambavyo mkataba huu unafuata: ERC-165 yenyewe na ERC-721.

### Utendaji {#functions}

Hizi ndizo kazi zinazotekeleza ERC-721 kwa vitendo.

#### Konstrukta {#constructor}

```python
@deploy
def __init__():
```

Katika Vyper, kama ilivyo katika Python, utendaji wa konstrukta unaitwa `__init__`. Imewekwa alama na mapambo ya `@deploy`, ambayo inamaanisha inaendeshwa mara moja, wakati mkataba unaposambazwa.

```python
    """
    @dev Konstrukta ya mkataba.
    """
```

Katika Python, na katika Vyper, unaweza pia kuunda maoni kwa kubainisha mfuatano wa mistari mingi (ambayo huanza na kuishia na `"""`), na kutoitumia kwa njia yoyote. Maoni haya yanaweza pia kujumuisha [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html).

```python
    self.minter = msg.sender
```

Ili kufikia vigezo vya hali unatumia `self.<variable name>` (tena, sawa na katika Python). Konstrukta inarekodi akaunti iliyosambaza mkataba kama `minter`.

#### Utendaji wa Kutazama {#views}

Hizi ni kazi ambazo hazibadilishi hali ya mnyororo wa vitalu, na kwa hivyo zinaweza kutekelezwa bila malipo ikiwa zinaitwa kutoka nje. Ikiwa utendaji wa kutazama unaitwa na mkataba bado unapaswa kutekelezwa kwenye kila nodi na kwa hivyo kugharimu gesi.

```python
@view
@external
```

Maneno haya muhimu kabla ya ufafanuzi wa utendaji ambayo huanza na alama ya at (`@`) yanaitwa _mapambo_. Yanabainisha mazingira ambayo utendaji unaweza kuitwa.

- `@view` inabainisha kuwa utendaji huu ni wa kutazama.
- `@external` inabainisha kuwa utendaji huu maalum unaweza kuitwa na miamala na mikataba mingine.

```python
def supportsInterface(interface_id: bytes4) -> bool:
```

Tofauti na Python, Vyper ni [lugha ya aina tuli](https://wikipedia.org/wiki/Type_system#Static_type_checking).
Huwezi kutangaza kigezo, au kigezo cha utendaji, bila kutambua [aina ya data](https://vyper.readthedocs.io/en/latest/types.html). Katika kesi hii kigezo cha kuingiza ni `bytes4`, thamani ya baiti nne, na pato ni thamani ya boolean.

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

Hizi ni kazi za kutazama zinazofanya taarifa kuhusu tokeni kupatikana kwa watumiaji na mikataba mingine.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev Inarejesha idadi ya NFT zinazomilikiwa na `_owner`.
         Inatengua ikiwa `_owner` ni anwani sifuri. NFT zilizokabidhiwa kwa anwani sifuri huchukuliwa kuwa batili.
    @param _owner Anwani ya kuulizia salio.
    """
    assert _owner != empty(address)
```

Mstari huu [unathibitisha](https://vyper.readthedocs.io/en/latest/statements.html#assert) kwamba `_owner` si anwani sifuri, iliyoandikwa kama `empty(address)`. Ikiwa ndivyo, kuna kosa na operesheni inatenguliwa.

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev Inarejesha anwani ya mmiliki wa NFT.
         Inatengua ikiwa `_tokenId` si NFT halali.
    @param _tokenId Kitambulisho cha NFT.
    """
    owner: address = self.idToOwner[_tokenId]
    # Inatengua ikiwa `_tokenId` si NFT halali
    assert owner != empty(address)
    return owner
```

Katika Mashine Pepe ya Ethereum (EVM) hifadhi yoyote ambayo haina thamani iliyohifadhiwa ndani yake ni sifuri.
Ikiwa hakuna tokeni kwenye `_tokenId` basi thamani ya `self.idToOwner[_tokenId]` ni sifuri. Katika kesi hiyo utendaji unatengua.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Pata anwani iliyoidhinishwa kwa NFT moja.
         Inatengua ikiwa `_tokenId` si NFT halali.
    @param _tokenId Kitambulisho cha NFT cha kuulizia idhini.
    """
    # Inatengua ikiwa `_tokenId` si NFT halali
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
    @dev Inakagua ikiwa `_operator` ni mwendeshaji aliyeidhinishwa kwa `_owner`.
    @param _owner Anwani inayomiliki NFT.
    @param _operator Anwani inayotenda kwa niaba ya mmiliki.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

Utendaji huu unakagua ikiwa `_operator` inaruhusiwa kusimamia tokeni zote za `_owner` katika mkataba huu.
Kwa sababu kunaweza kuwa na waendeshaji wengi, hii ni HashMap ya viwango viwili.

#### Utendaji Msaidizi wa Hamisho {#transfer-helpers}

Kazi hizi zinatekeleza operesheni ambazo ni sehemu ya kuhamisha au kusimamia tokeni.

```python

### WASAIDIZI WA KAZI ZA HAMISHO ###

@view
@internal
```

Pambo hili, `@internal`, linamaanisha kuwa utendaji unaweza kufikiwa tu kutoka kwa kazi zingine ndani ya mkataba huo huo. Kwa kawaida, majina haya ya utendaji pia huanza na mstari wa chini (`_`).

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev Inarejesha ikiwa mtumiaji aliyepewa anaweza kufanya hamisho la kitambulisho cha tokeni kilichopewa
    @param spender anwani ya mtumiaji wa kuulizia
    @param tokenId uint256 Kitambulisho cha tokeni itakayofanyiwa hamisho
    @return bool ikiwa msg.sender imeidhinishwa kwa kitambulisho cha tokeni kilichopewa,
        ni mwendeshaji wa mmiliki, au ni mmiliki wa tokeni
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

Utendaji hapo juu unaweza kuwa wa kutazama kwa sababu haubadilishi hali. Ili kupunguza gharama za uendeshaji, utendaji wowote ambao _unaweza_ kuwa wa kutazama _unapaswa_ kuwa wa kutazama.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Ongeza NFT kwenye anwani iliyopewa
         Inatengua ikiwa `_tokenId` inamilikiwa na mtu.
    """
    # Inatengua ikiwa `_tokenId` inamilikiwa na mtu
    assert self.idToOwner[_tokenId] == empty(address)
    # Badilisha mmiliki
    self.idToOwner[_tokenId] = _to
    # Badilisha ufuatiliaji wa idadi
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Ondoa NFT kutoka kwa anwani iliyopewa
         Inatengua ikiwa `_from` si mmiliki wa sasa.
    """
    # Inatengua ikiwa `_from` si mmiliki wa sasa
    assert self.idToOwner[_tokenId] == _from
    # Badilisha mmiliki
    self.idToOwner[_tokenId] = empty(address)
    # Badilisha ufuatiliaji wa idadi
    self.ownerToNFTokenCount[_from] -= 1
```

Wakati kuna tatizo na hamisho tunatengua wito.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Futa idhini ya anwani iliyopewa
         Inatengua ikiwa `_owner` si mmiliki wa sasa.
    """
    # Inatengua ikiwa `_owner` si mmiliki wa sasa
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != empty(address):
        # Weka upya idhini
        self.idToApprovals[_tokenId] = empty(address)
```

Badilisha thamani tu ikiwa ni lazima. Vigezo vya hali huishi kwenye hifadhi. Kuandika kwenye hifadhi ni
mojawapo ya operesheni ghali zaidi ambazo Mashine Pepe ya Ethereum (EVM) hufanya (kwa upande wa
[gesi](/developers/docs/gas/)). Kwa hivyo, ni wazo zuri kuipunguza, hata kuandika thamani iliyopo ina gharama kubwa.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Tekeleza hamisho la NFT.
         Inatengua isipokuwa `msg.sender` ni mmiliki wa sasa, mwendeshaji aliyeidhinishwa, au anwani
         iliyoidhinishwa kwa NFT hii. (KUMBUKA: `msg.sender` hairuhusiwi katika kazi ya faragha kwa hivyo pitisha `_sender`.)
         Inatengua ikiwa `_to` ni anwani sifuri.
         Inatengua ikiwa `_from` si mmiliki wa sasa.
         Inatengua ikiwa `_tokenId` si NFT halali.
    """
```

Tuna utendaji huu wa ndani kwa sababu kuna njia mbili za kuhamisha tokeni (kawaida na salama), lakini
tunataka eneo moja tu katika msimbo ambapo tunafanya hivyo ili kurahisisha ukaguzi.

```python
    # Kagua mahitaji
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Inatengua ikiwa `_to` ni anwani sifuri
    assert _to != empty(address)
    # Futa idhini. Inatengua ikiwa `_from` si mmiliki wa sasa
    self._clearApproval(_from, _tokenId)
    # Ondoa NFT. Inatengua ikiwa `_tokenId` si NFT halali
    self._removeTokenFrom(_from, _tokenId)
    # Ongeza NFT
    self._addTokenTo(_to, _tokenId)
    # Rekodi hamisho
    log IERC721.Transfer(sender=_from, receiver=_to, token_id=_tokenId)
```

Ili kutoa tukio katika Vyper unatumia taarifa ya `log` ([tazama hapa kwa maelezo zaidi](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).
Kwa sababu matukio ni ya kiolesura kilichoingizwa, tunayarejelea kama `IERC721.Transfer` na kupitisha nyanja zao kwa neno muhimu.

#### Utendaji wa Hamisho {#transfer-funs}

```python

### KAZI ZA HAMISHO ###

@external
@payable
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev Inatengua isipokuwa `msg.sender` ni mmiliki wa sasa, mwendeshaji aliyeidhinishwa, au anwani
         iliyoidhinishwa kwa NFT hii.
         Inatengua ikiwa `_from` si mmiliki wa sasa.
         Inatengua ikiwa `_to` ni anwani sifuri.
         Inatengua ikiwa `_tokenId` si NFT halali.
    @notice Mpigaji ana jukumu la kuthibitisha kuwa `_to` ina uwezo wa kupokea NFT au sivyo
            zinaweza kupotea kabisa.
    @param _from Mmiliki wa sasa wa NFT.
    @param _to Mmiliki mpya.
    @param _tokenId NFT ya kufanyia hamisho.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Utendaji huu unakuruhusu kuhamisha kwenda kwenye anwani yoyote. Isipokuwa anwani ni mtumiaji, au mkataba unaojua jinsi ya kuhamisha tokeni, tokeni yoyote unayohamisha itakwama kwenye anwani hiyo na kukosa faida.

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
    @dev Inafanya hamisho la umiliki wa NFT kutoka anwani moja kwenda anwani nyingine.
         Inatengua isipokuwa `msg.sender` ni mmiliki wa sasa, mwendeshaji aliyeidhinishwa, au
         anwani iliyoidhinishwa kwa NFT hii.
         Inatengua ikiwa `_from` si mmiliki wa sasa.
         Inatengua ikiwa `_to` ni anwani sifuri.
         Inatengua ikiwa `_tokenId` si NFT halali.
         Ikiwa `_to` ni mkataba mahiri, inaita `onERC721Received` kwenye `_to` na inatengua ikiwa
         thamani inayorejeshwa si `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
    @param _from Mmiliki wa sasa wa NFT.
    @param _to Mmiliki mpya.
    @param _tokenId NFT ya kufanyia hamisho.
    @param _data Data ya ziada isiyo na umbizo maalum, iliyotumwa katika wito kwa `_to`.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Ni Sawa kufanya hamisho kwanza kwa sababu ikiwa kuna tatizo tutatengua hata hivyo,
kwa hivyo kila kitu kilichofanywa katika wito kitaghairiwa.

```python
    if _to.is_contract: # kagua ikiwa `_to` ni anwani ya mkataba
```

Kwanza kagua ili kuona ikiwa anwani ni mkataba (ikiwa ina msimbo). Ikiwa sivyo, chukulia ni anwani ya mtumiaji
na mtumiaji ataweza kutumia tokeni au kuihamisha. Lakini usiruhusu ikupe hisia potofu za usalama.
Unaweza kupoteza tokeni, hata kwa `safeTransferFrom`, ikiwa utazihamisha kwenda kwenye anwani ambayo hakuna anayejua ufunguo wa siri.

```python
        returnValue: bytes4 = extcall ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Piga simu kwa mkataba lengwa ili kuona ikiwa unaweza kupokea tokeni za ERC-721. Vyper 0.4 inahitaji wito kwa mikataba mingine
kuwekwa alama, kwa hivyo wito unaanza na `extcall`.

```python
        # Inatengua ikiwa mwishilio wa hamisho ni mkataba ambao hautekelezi 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes4)
```

Ikiwa marudio ni mkataba, lakini ambao haukubali tokeni za ERC-721 (au ambao umeamua kutokubali hamisho hili maalum), tengua.

```python
@external
@payable
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Weka au thibitisha upya anwani iliyoidhinishwa kwa NFT. Anwani sifuri inaonyesha hakuna anwani iliyoidhinishwa.
         Inatengua isipokuwa `msg.sender` ni mmiliki wa sasa wa NFT, au mwendeshaji aliyeidhinishwa wa mmiliki wa sasa.
         Inatengua ikiwa `_tokenId` si NFT halali. (KUMBUKA: Hili halijaandikwa kwenye EIP)
         Inatengua ikiwa `_approved` ni mmiliki wa sasa. (KUMBUKA: Hili halijaandikwa kwenye EIP)
    @param _approved Anwani itakayoidhinishwa kwa kitambulisho cha NFT kilichopewa.
    @param _tokenId Kitambulisho cha tokeni itakayoidhinishwa.
    """
    owner: address = self.idToOwner[_tokenId]
    # Inatengua ikiwa `_tokenId` si NFT halali
    assert owner != empty(address)
    # Inatengua ikiwa `_approved` ni mmiliki wa sasa
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
    log IERC721.Approval(owner=owner, approved=_approved, token_id=_tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Inawezesha au kulemaza idhini kwa mtu wa tatu ("mwendeshaji") kusimamia rasilimali zote za
         `msg.sender`. Pia inatoa tukio la ApprovalForAll.
         Inatengua ikiwa `_operator` ni `msg.sender`. (KUMBUKA: Hili halijaandikwa kwenye EIP)
    @notice Hii inafanya kazi hata kama mtumaji hamiliki tokeni zozote kwa wakati huo.
    @param _operator Anwani ya kuongeza kwenye seti ya waendeshaji walioidhinishwa.
    @param _approved Kweli ikiwa waendeshaji wameidhinishwa, si kweli ili kubatilisha idhini.
    """
    # Inatengua ikiwa `_operator` ni `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log IERC721.ApprovalForAll(owner=msg.sender, operator=_operator, approved=_approved)
```

#### Kufua Tokeni Mpya na Kuteketeza Zilizopo {#mint-burn}

Akaunti iliyounda mkataba ni `minter`, mtumiaji mkuu ambaye ameidhinishwa kufua
NFT mpya. Hata hivyo, hata yeye haruhusiwi kuteketeza tokeni zilizopo. Ni mmiliki tu, au chombo
kilichoidhinishwa na mmiliki, anayeweza kufanya hivyo.

```python
### KAZI ZA KUFUA NA KUTEKETEZA ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

Utendaji huu daima unarejesha `True`, kwa sababu ikiwa operesheni inashindwa inatenguliwa.

```python
    """
    @dev Kazi ya kufua tokeni
         Inatengua ikiwa `msg.sender` si mfua.
         Inatengua ikiwa `_to` ni anwani sifuri.
         Inatengua ikiwa `_tokenId` inamilikiwa na mtu.
    @param _to Anwani itakayopokea tokeni zilizofuliwa.
    @param _tokenId Kitambulisho cha tokeni cha kufua.
    @return Thamani ya kweli/si kweli inayoonyesha ikiwa operesheni ilifanikiwa.
    """
    # Inatengua ikiwa `msg.sender` si mfua
    assert msg.sender == self.minter
```

Ni mfuzi tu (akaunti iliyounda mkataba wa ERC-721) anayeweza kufua tokeni mpya. Hili linaweza kuwa
tatizo katika siku zijazo ikiwa tunataka kubadilisha utambulisho wa mfuzi. Katika
mkataba wa uzalishaji labda ungetaka utendaji unaoruhusu mfuzi kuhamisha
mapendeleo ya mfuzi kwa mtu mwingine.

```python
    # Inatengua ikiwa `_to` ni anwani sifuri
    assert _to != empty(address)
    # Ongeza NFT. Inatengua ikiwa `_tokenId` inamilikiwa na mtu
    self._addTokenTo(_to, _tokenId)
    log IERC721.Transfer(sender=empty(address), receiver=_to, token_id=_tokenId)
    return True
```

Kwa kawaida, ufuzi wa tokeni mpya huhesabiwa kama hamisho kutoka kwa anwani sifuri.

```python

@external
def burn(_tokenId: uint256):
    """
    @dev Inateketeza tokeni maalum ya ERC-721.
         Inatengua isipokuwa `msg.sender` ni mmiliki wa sasa, mwendeshaji aliyeidhinishwa, au anwani
         iliyoidhinishwa kwa NFT hii.
         Inatengua ikiwa `_tokenId` si NFT halali.
    @param _tokenId uint256 kitambulisho cha tokeni ya ERC-721 itakayoteketezwa.
    """
    # Kagua mahitaji
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # Inatengua ikiwa `_tokenId` si NFT halali
    assert owner != empty(address)
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log IERC721.Transfer(sender=owner, receiver=empty(address), token_id=_tokenId)
```

Mtu yeyote anayeruhusiwa kuhamisha tokeni anaruhusiwa kuiteketeza. Ingawa kuteketeza kunaonekana sawa na
kuhamisha kwenda kwenye anwani sifuri, anwani sifuri kwa kweli haipokei tokeni. Hii inaturuhusu
kufungua hifadhi yote iliyotumika kwa tokeni, ambayo inaweza kupunguza gharama ya gesi ya muamala.

## Kutumia Mkataba Huu {#using-contract}

Tofauti na Solidity, Vyper haina urithi. Hili ni chaguo la makusudi la muundo ili kufanya
msimbo uwe wazi zaidi na kwa hivyo rahisi kulinda. Kwa hivyo ili kuunda mkataba wako wa Vyper ERC-721 unachukua [mkataba
huu](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) na kuubadilisha
ili kutekeleza mantiki ya biashara unayotaka.

## Hitimisho {#conclusion}

Kwa ukaguzi, haya ni baadhi ya mawazo muhimu zaidi katika mkataba huu:

- Ili kupokea tokeni za ERC-721 kwa hamisho salama, mikataba inapaswa kutekeleza kiolesura cha `ERC721Receiver`.
- Hata kama unatumia hamisho salama, tokeni bado zinaweza kukwama ikiwa utazituma kwenye anwani ambayo ufunguo wa siri wake haujulikani.
- Wakati kuna tatizo na operesheni ni wazo zuri kutengua wito kwa `revert`, badala ya kurejesha tu
  thamani ya kushindwa.
- Tokeni za ERC-721 zipo wakati zina mmiliki.
- Kuna njia tatu za kuidhinishwa kuhamisha NFT. Unaweza kuwa mmiliki, kuidhinishwa kwa tokeni maalum,
  au kuwa mwendeshaji kwa tokeni zote za mmiliki.
- Matukio yaliyopita yanaonekana tu nje ya mnyororo wa vitalu. Msimbo unaoendeshwa ndani ya mnyororo wa vitalu hauwezi kuyaona.

Sasa nenda na utekeleze mikataba salama ya Vyper.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).
