---
title: Kiwango cha Tokeni isiyoweza kubadilishwa cha ERC-721
description: Jifunze kuhusu ERC-721, kiwango cha tokeni zisizoweza kubadilishwa (NFTs) zinazowakilisha mali za kipekee za kidijitali kwenye Ethereum.
lang: sw
---

## Utangulizi {#introduction}

**Tokeni isiyoweza kubadilishwa ni nini?**

Tokeni isiyoweza kubadilishwa (NFT) hutumika kutambua kitu au mtu kwa njia ya kipekee. Aina hii ya Tokeni inafaa sana kutumika kwenye majukwaa yanayotoa vitu vya kukusanywa, funguo za ufikiaji, tiketi za bahati nasibu, viti vilivyo na nambari kwa ajili ya matamasha na mechi za michezo, n.k. Aina hii maalum ya Tokeni ina uwezekano wa ajabu kwa hivyo inastahili Kiwango kinachofaa, ERC-721 ilikuja kutatua hilo!

**ERC-721 ni nini?**

ERC-721 inaleta kiwango cha NFT, kwa maneno mengine, aina hii ya Tokeni ni ya kipekee na inaweza kuwa na thamani tofauti kuliko Tokeni nyingine kutoka kwa Mkataba-erevu uleule, labda kutokana na umri wake, uhaba wake au hata kitu kingine kama mwonekano wake.
Subiri, mwonekano?

Ndiyo! NFT zote zina kigezo cha `uint256` kinachoitwa `tokenId`, kwa hivyo kwa Mkataba wowote wa ERC-721, jozi ya `anwani ya mkataba, uint256 tokenId` lazima iwe ya kipekee duniani kote. Kwa kusema hivyo, mfumo mtawanyo wa kimamlaka unaweza kuwa na "kigeuzi" kinachotumia `tokenId` kama ingizo na kutoa picha ya kitu kizuri, kama mazombi, silaha, ujuzi au paka wa ajabu!

## Mahitaji ya awali {#prerequisites}

- Hifadhi ya fedha (/developers/docs/accounts/)
- [Mkataba erevu](/developers/docs/smart-contracts/)
- [Viwango vya tokeni](/developers/docs/standards/tokens/)

## Mwili {#body}

ERC-721 (Ombi la Maoni la Ethereum 721), iliyopendekezwa na William Entriken, Dieter Shirley, Jacob Evans, Nastassia Sachs mnamo Januari 2018, ni Kiwango cha Tokeni isiyoweza kubadilishwa kinachotekeleza API ya tokeni ndani ya Mikataba-erevu.

Hutoa utendaji kama vile kuhamisha tokeni kutoka akaunti moja hadi nyingine, kupata salio la sasa la tokeni la akaunti, kupata mmiliki wa tokeni maalum na pia jumla ya usambazaji wa tokeni inayopatikana kwenye mtandao.
Kando na hizi, pia ina utendaji mwingine kama kuidhinisha kwamba kiasi cha tokeni kutoka kwa akaunti kinaweza kuhamishwa na akaunti ya wahusika wengine.

Ikiwa Mkataba-erevu unatekeleza mbinu na matukio yafuatayo unaweza kuitwa Mkataba wa Tokeni isiyoweza kubadilishwa wa ERC-721 na, mara tu utakapowekwa, utakuwa na jukumu la kufuatilia tokeni zilizoundwa kwenye Ethereum.

Kutoka [EIP-721](https://eips.ethereum.org/EIPS/eip-721):

### Mbinu {#methods}

```solidity
    function balanceOf(address _owner) external view returns (uint256);
    function ownerOf(uint256 _tokenId) external view returns (address);
    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable;
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;
    function transferFrom(address _from, address _to, uint256 _tokenId) external payable;
    function approve(address _approved, uint256 _tokenId) external payable;
    function setApprovalForAll(address _operator, bool _approved) external;
    function getApproved(uint256 _tokenId) external view returns (address);
    function isApprovedForAll(address _owner, address _operator) external view returns (bool);
```

### Matukio {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### Mifano {#web3py-example}

Hebu tuone jinsi Kiwango kilivyo muhimu sana kurahisisha mambo kwetu kukagua Mkataba wowote wa Tokeni wa ERC-721 kwenye Ethereum.
Tunahitaji tu Kiolesura cha Binary cha Programu ya Mkataba (ABI) ili kuunda kiolesura cha Tokeni yoyote ya ERC-721. Ama unaweza
Tazama chini kutumia ABI rahisi, kuifanya mfano wa msuguano mdogo.

#### Mfano wa Web3.py {#web3py-example}

Kwanza, hakikisha umesakinisha maktaba ya Python ya [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # Mkataba wa CryptoKitties

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # Mnada wa Mauzo wa CryptoKitties

# Hiki ni Kiolesura cha Binary cha Programu ya Mkataba (ABI) kilichorahisishwa cha Mkataba wa NFT wa ERC-721.
# Kitaonyesha tu mbinu: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
simplified_abi = [
    {
        'inputs': [{'internalType': 'address', 'name': 'owner', 'type': 'address'}],
        'name': 'balanceOf',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'name',
        'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [{'internalType': 'uint256', 'name': 'tokenId', 'type': 'uint256'}],
        'name': 'ownerOf',
        'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'symbol',
        'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'totalSupply',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
]

ck_extra_abi = [
    {
        'inputs': [],
        'name': 'pregnantKitties',
        'outputs': [{'name': '', 'type': 'uint256'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [{'name': '_kittyId', 'type': 'uint256'}],
        'name': 'isPregnant',
        'outputs': [{'name': '', 'type': 'bool'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    }
]

ck_contract = w3.eth.contract(address=w3.to_checksum_address(ck_token_addr), abi=simplified_abi+ck_extra_abi)
name = ck_contract.functions.name().call()
symbol = ck_contract.functions.symbol().call()
kitties_auctions = ck_contract.functions.balanceOf(acc_address).call()
print(f"{name} [{symbol}] NFTs in Auctions: {kitties_auctions}")

pregnant_kitties = ck_contract.functions.pregnantKitties().call()
print(f"{name} [{symbol}] NFTs Pregnants: {pregnant_kitties}")

# Kutumia ABI ya Tukio la Uhamisho kupata maelezo kuhusu Paka waliohamishwa.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# Tunahitaji saini ya tukio ili kuchuja kumbukumbu
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# Kumbuka:
#   - Ongeza idadi ya bloku kutoka 120 ikiwa hakuna tukio la Uhamisho linalorejeshwa.
#   - Ikiwa haukupata tukio lolote la Uhamisho unaweza pia kujaribu kupata tokenId kwenye:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       Bofya ili kupanua kumbukumbu za tukio na kunakili hoja yake ya "tokenId"
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # Bandika "tokenId" hapa kutoka kwa kiungo hapo juu
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

Mkataba wa CryptoKitties una Matukio kadhaa ya kuvutia zaidi ya yale ya Kiwango.

Hebu tuangalie mawili kati yao, `Pregnant` na `Birth`.

```python
# Kutumia ABI ya Matukio ya Pregnant na Birth kupata maelezo kuhusu Paka wapya.
ck_extra_events_abi = [
    {
        'anonymous': False,
        'inputs': [
            {'indexed': False, 'name': 'owner', 'type': 'address'},
            {'indexed': False, 'name': 'matronId', 'type': 'uint256'},
            {'indexed': False, 'name': 'sireId', 'type': 'uint256'},
            {'indexed': False, 'name': 'cooldownEndBlock', 'type': 'uint256'}],
        'name': 'Pregnant',
        'type': 'event'
    },
    {
        'anonymous': False,
        'inputs': [
            {'indexed': False, 'name': 'owner', 'type': 'address'},
            {'indexed': False, 'name': 'kittyId', 'type': 'uint256'},
            {'indexed': False, 'name': 'matronId', 'type': 'uint256'},
            {'indexed': False, 'name': 'sireId', 'type': 'uint256'},
            {'indexed': False, 'name': 'genes', 'type': 'uint256'}],
        'name': 'Birth',
        'type': 'event'
    }]

# Tunahitaji saini ya tukio ili kuchuja kumbukumbu
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# Hili ni Tukio la Pregnant:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# Hili ni Tukio la Birth:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## NFT maarufu {#popular-nfts}

- [Kifuatiliaji cha NFT cha Etherscan](https://etherscan.io/nft-top-contracts) huorodhesha NFT maarufu kwenye Ethereum kwa ujazo wa uhamisho.
- [CryptoKitties](https://www.cryptokitties.co/) ni mchezo unaohusu viumbe wanaoweza kuzalishwa, kukusanywa, na wa kupendeza sana tunaowaita CryptoKitties.
- [Sorare](https://sorare.com/) ni mchezo wa kimataifa wa soka ya njozi ambapo unaweza kukusanya vitu vya toleo pungufu vya kukusanya, kusimamia timu zako na kushindana ili kujishindia zawadi.
- [Huduma ya Majina ya Ethereum (ENS)](https://ens.domains/) hutoa njia salama na iliyogatuliwa ya kuweka anwani kwa rasilimali ndani na nje ya mnyororo wa bloku kwa kutumia majina rahisi, yanayosomeka na binadamu.
- [POAP](https://poap.xyz) huwasilisha NFT za bure kwa watu wanaohudhuria matukio au kukamilisha vitendo maalum. POAP ni za bure kuunda na kusambaza.
- [Unstoppable Domains](https://unstoppabledomains.com/) ni kampuni iliyoko San Francisco inayounda vikoa kwenye minyororo wa bloku. Vikoa vya mnyororo wa bloku hubadilisha anwani za sarafu ya kidigitali na majina yanayosomeka na binadamu na vinaweza kutumika kuwezesha tovuti zinazostahimili udhibiti.
- [Gods Unchained Cards](https://godsunchained.com/) ni TCG kwenye mnyororo wa bloku wa Ethereum inayotumia NFT kuleta umiliki halisi kwa mali za ndani ya mchezo.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) ni mkusanyiko wa NFT 10,000 za kipekee, ambazo, pamoja na kuwa kazi ya sanaa adimu inayoweza kuthibitishwa, hufanya kazi kama tokeni ya uanachama wa klabu, ikitoa marupurupu na manufaa kwa wanachama yanayoongezeka kadri muda unavyopita kutokana na juhudi za jumuiya.

## Masomo zaidi {#further-reading}

- [EIP-721: Kiwango cha Tokeni isiyoweza kubadilishwa cha ERC-721](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - Hati za ERC-721](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - Utekelezaji wa ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [API ya NFT ya Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)
