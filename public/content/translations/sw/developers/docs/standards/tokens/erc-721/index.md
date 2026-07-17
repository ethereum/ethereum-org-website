---
title: Kiwango cha Tokeni Isiyo Mbadala cha ERC-721
description: Jifunze kuhusu ERC-721, kiwango cha tokeni zisizo mbadala (NFTs) zinazowakilisha rasilimali za kipekee za kidijitali kwenye Ethereum.
lang: sw
---

## Utangulizi {#introduction}

**Tokeni Isiyo Mbadala ni nini?**

Tokeni Isiyo Mbadala (NFT) hutumika kutambua kitu au mtu kwa njia ya kipekee. Aina hii ya Tokeni ni kamilifu kutumika kwenye majukwaa yanayotoa vikusanywa, funguo za ufikiaji, tiketi za bahati nasibu, viti vilivyo na nambari kwa ajili ya matamasha na mechi za michezo, n.k. Aina hii maalum ya Tokeni ina uwezekano wa kushangaza kwa hivyo inastahili Kiwango kinachofaa, ERC-721 ilikuja kutatua hilo!

**ERC-721 ni nini?**

ERC-721 inaleta kiwango cha NFT, kwa maneno mengine, aina hii ya Tokeni ni ya kipekee na inaweza kuwa na thamani tofauti na Tokeni nyingine kutoka kwenye Mkataba Mahiri ule ule, labda kutokana na umri wake, uhaba au hata kitu kingine kama mwonekano wake. Subiri, mwonekano?

Ndiyo! NFTs zote zina kigezo cha `uint256` kinachoitwa `tokenId`, kwa hivyo kwa Mkataba wowote wa ERC-721, jozi ya `contract address, uint256 tokenId` lazima iwe ya kipekee ulimwenguni. Kwa kusema hivyo, programu tumizi iliyogatuliwa (dapp) inaweza kuwa na "kigeuzi" kinachotumia `tokenId` kama ingizo na kutoa picha ya kitu kizuri, kama vile mazombi, silaha, ujuzi au paka wa kushangaza!

## Mahitaji ya awali {#prerequisites}

- [Akaunti](/developers/docs/accounts/)
- [Mikataba Mahiri](/developers/docs/smart-contracts/)
- [Viwango vya tokeni](/developers/docs/standards/tokens/)

## Mwili {#body}

ERC-721 ([Ethereum](/) Request for Comments 721), iliyopendekezwa na William Entriken, Dieter Shirley, Jacob Evans, Nastassia Sachs mnamo Januari 2018, ni Kiwango cha Tokeni Isiyo Mbadala kinachotekeleza API kwa ajili ya tokeni ndani ya Mikataba Mahiri.

Inatoa utendaji kama vile kuhamisha tokeni kutoka akaunti moja hadi nyingine, kupata salio la sasa la tokeni la akaunti, kupata mmiliki wa tokeni mahususi na pia jumla ya usambazaji wa tokeni inayopatikana kwenye mtandao.
Kando na haya pia ina utendaji mwingine kama vile kuidhinisha kwamba kiasi cha tokeni kutoka kwenye akaunti kinaweza kuhamishwa na akaunti ya mtu mwingine.

Ikiwa Mkataba Mahiri utatekeleza mbinu na matukio yafuatayo unaweza kuitwa Mkataba wa Tokeni Isiyo Mbadala wa ERC-721 na, ukishasambazwa, utawajibika kufuatilia tokeni zilizoundwa kwenye Ethereum.

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

Hebu tuone jinsi Kiwango kilivyo muhimu sana kurahisisha mambo kwetu kukagua Mkataba wowote wa Tokeni wa ERC-721 kwenye Ethereum. Tunahitaji tu Kiolesura cha Uwili cha Programu Tumizi ya Mkataba (ABI) ili kuunda kiolesura cha Tokeni yoyote ya ERC-721. Kama unavyoona hapa chini tutatumia ABI iliyorahisishwa, ili kuifanya iwe mfano usio na msuguano mkubwa.

#### Mfano wa Web3.py {#web3py-example-2}

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

# Hii ni Application Binary Interface (ABI) ya Mkataba iliyorahisishwa ya Mkataba wa NFT wa ERC-721.
# Itafichua tu mbinu za: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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

# Kutumia ABI ya Tukio la Hamisho kupata maelezo kuhusu Kitties waliohamishwa.
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

# Vidokezo:
#   - Ongeza idadi ya vitalu kutoka 120 ikiwa hakuna tukio la Hamisho litakalorudishwa.
#   - Ikiwa hukupata tukio lolote la Hamisho unaweza pia kujaribu kupata tokenId kwenye:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       Bofya ili kupanua kumbukumbu za tukio na unakili hoja yake ya "tokenId"
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # Bandika "tokenId" hapa kutoka kwenye kiungo kilicho hapo juu
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

Mkataba wa CryptoKitties una Matukio ya kuvutia zaidi ya yale ya Kiwango.

Hebu tuangalie mawili kati yao, `Pregnant` na `Birth`.

```python
# Kutumia ABI ya Matukio ya Ujauzito na Kuzaliwa kupata maelezo kuhusu Kitties wapya.
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

# Hapa kuna Tukio la Ujauzito:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# Hapa kuna Tukio la Kuzaliwa:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## NFTs Maarufu {#popular-nfts}

- [Kifuatiliaji cha NFT cha Etherscan](https://etherscan.io/nft-top-contracts) huorodhesha NFT bora kwenye Ethereum kwa kiasi cha uhamisho.
- [CryptoKitties](https://www.cryptokitties.co/) ni mchezo unaozingatia viumbe wanaoweza kuzalishwa, vikusanywa, na wa kupendeza sana tunaowaita CryptoKitties.
- [Sorare](https://sorare.com/) ni mchezo wa soka wa kufikirika wa kimataifa ambapo unaweza kukusanya vikusanywa vya matoleo machache, kusimamia timu zako na kushindana ili kujishindia zawadi.
- [Huduma ya Jina la Ethereum (ENS)](https://ens.domains/) inatoa njia salama na iliyogatuliwa ya kushughulikia rasilimali ndani na nje ya mnyororo wa vitalu kwa kutumia majina rahisi, yanayosomeka na binadamu.
- [POAP](https://poap.xyz) hutoa NFTs bila malipo kwa watu wanaohudhuria matukio au kukamilisha vitendo mahususi. POAP ni za bure kuunda na kusambaza.
- [Unstoppable Domains](https://unstoppabledomains.com/) ni kampuni yenye makao yake San Francisco inayounda vikoa kwenye minyororo ya vitalu. Vikoa vya mnyororo wa vitalu huchukua nafasi ya anwani za sarafu-fiche kwa majina yanayosomeka na binadamu na vinaweza kutumika kuwezesha tovuti zinazostahimili udhibiti.
- [Kadi za Gods Unchained](https://godsunchained.com/) ni TCG kwenye mnyororo wa vitalu wa Ethereum inayotumia NFTs kuleta umiliki halisi kwa rasilimali za ndani ya mchezo.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) ni mkusanyiko wa NFTs 10,000 za kipekee, ambazo, pamoja na kuwa sanaa adimu inayothibitishwa, hufanya kazi kama tokeni ya uanachama kwenye klabu, ikitoa marupurupu na manufaa ya mwanachama yanayoongezeka kadiri muda unavyopita kutokana na juhudi za jamii.

## Usomaji zaidi {#further-reading}

- [EIP-721: Kiwango cha Tokeni Isiyo Mbadala cha ERC-721](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - Hati za ERC-721](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - Utekelezaji wa ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [API ya NFT ya Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)

## Mafunzo: Jenga kwa kutumia tokeni zisizo mbadala (ERC-721) kwenye Ethereum {#tutorials}

- [Mwongozo wa Mkataba wa ERC-721 wa Vyper](/developers/tutorials/erc-721-vyper-annotated-code/) _– Mwongozo uliofafanuliwa wa mkataba kamili wa NFT wa ERC-721 ulioandikwa katika Vyper._
- [Jinsi ya Kuandika na Kusambaza NFT (Sehemu ya 1/3)](/developers/tutorials/how-to-write-and-deploy-an-nft/) _– Mwongozo wa hatua kwa hatua wa kuandika na kusambaza mkataba wako mahiri wa kwanza wa ERC-721._
- [Jinsi ya Kufua NFT (Sehemu ya 2/3)](/developers/tutorials/how-to-mint-an-nft/) _– Jinsi ya kufua NFT ya ERC-721 kwa kutumia mkataba wako mahiri uliosambazwa na Web3._
- [Jinsi ya Kutazama NFT Yako kwenye Mkoba Wako (Sehemu ya 3/3)](/developers/tutorials/how-to-view-nft-in-metamask/) _– Jinsi ya kuonyesha NFT yako iliyofuliwa kwenye MetaMask baada ya usambazaji._
- [Mafunzo ya Kifua NFT](/developers/tutorials/nft-minter/) _– Jenga programu tumizi iliyogatuliwa (dapp) ya ufuzi wa NFT yenye mrundikano kamili ukiwa na mandhari ya mbele ya React, MetaMask, na Alchemy._