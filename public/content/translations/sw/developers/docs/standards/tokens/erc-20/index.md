---
title: Kiwango cha Tokeni cha ERC-20
description: Jifunze kuhusu ERC-20, kiwango cha tokheni mbadala kwenye Ethereum kinachowezesha programu za tokeni zinazoingiliana.
lang: sw
---

## Utangulizi {#introduction}

**Tokeni ni nini?**

Tokeni zinaweza kuwakilisha karibu chochote katika [Ethereum](/):

- pointi za sifa katika jukwaa la mtandaoni
- ujuzi wa mhusika katika mchezo
- mali za kifedha kama hisa katika kampuni
- sarafu ya fiat kama USD
- aunsi ya dhahabu
- na zaidi...

Kipengele chenye nguvu kama hiki cha Ethereum lazima kishughulikiwe na kiwango thabiti, sivyo? Hapo ndipo hasa ERC-20 inapotekeleza jukumu lake! Kiwango hiki kinaruhusu wasanidi programu kujenga programu za tokeni zinazoingiliana na bidhaa na huduma zingine. Kiwango cha ERC-20 pia kinatumika kutoa utendaji wa ziada kwa [Etha](/glossary/#ether).

**ERC-20 ni nini?**

ERC-20 inaleta kiwango cha Tokheni Mbadala, kwa maneno mengine, zina sifa inayofanya kila Tokeni iwe sawa kabisa (kwa aina na thamani) na Tokeni nyingine. Kwa mfano, Tokeni ya ERC-20 inafanya kazi kama ETH, ikimaanisha kwamba Tokeni 1 ni na itakuwa sawa na Tokeni nyingine zote.

## Mahitaji ya Awali {#prerequisites}

- [Akaunti](/developers/docs/accounts)
- [Mikataba Mahiri](/developers/docs/smart-contracts/)
- [Viwango vya tokeni](/developers/docs/standards/tokens/)

## Kiini {#body}

ERC-20 (Ethereum Request for Comments 20), iliyopendekezwa na Fabian Vogelsteller mnamo Novemba 2015, ni Kiwango cha Tokeni kinachotekeleza API kwa ajili ya tokeni ndani ya Mikataba Mahiri.

Mifano ya utendaji ambayo ERC-20 inatoa:

- kuhamisha tokeni kutoka akaunti moja hadi nyingine
- kupata salio la sasa la tokeni la akaunti
- kupata jumla ya usambazaji wa tokeni inayopatikana kwenye mtandao
- idhinisha ikiwa kiasi cha tokeni kutoka kwenye akaunti kinaweza kutumiwa na akaunti ya mtu wa tatu

Ikiwa Mkataba Mahiri unatekeleza mbinu na matukio yafuatayo unaweza kuitwa Mkataba wa Tokeni wa ERC-20 na, ukishasambazwa, utawajibika kufuatilia tokeni zilizoundwa kwenye Ethereum.

Kutoka [EIP-20](https://eips.ethereum.org/EIPS/eip-20):

### Mbinu {#methods}

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)
```

### Matukio {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### Mifano {#web3py-example}

Hebu tuone jinsi Kiwango kilivyo muhimu sana kurahisisha mambo kwetu kukagua Mkataba wowote wa Tokeni wa ERC-20 kwenye Ethereum. Tunahitaji tu Contract Application Binary Interface (ABI) ili kuunda kiolesura cha Tokeni yoyote ya ERC-20. Kama unavyoona hapa chini tutatumia ABI iliyorahisishwa, ili kuifanya iwe mfano rahisi kueleweka.

#### Mfano wa Web3.py {#web3py-example-2}

Kwanza, hakikisha umesakinisha maktaba ya Python ya [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Etha iliyofungwa (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# Hii ni Application Binary Interface (ABI) ya Mkataba iliyorahisishwa ya Mkataba wa Tokeni ya ERC-20.
# Itaweka wazi tu mbinu hizi: balanceOf(anwani), decimals(), symbol() na totalSupply()
simplified_abi = [
    {
        'inputs': [{'internalType': 'address', 'name': 'account', 'type': 'address'}],
        'name': 'balanceOf',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'decimals',
        'outputs': [{'internalType': 'uint8', 'name': '', 'type': 'uint8'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
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
    }
]

dai_contract = w3.eth.contract(address=w3.to_checksum_address(dai_token_addr), abi=simplified_abi)
symbol = dai_contract.functions.symbol().call()
decimals = dai_contract.functions.decimals().call()
totalSupply = dai_contract.functions.totalSupply().call() / 10**decimals
addr_balance = dai_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  DAI
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)

weth_contract = w3.eth.contract(address=w3.to_checksum_address(weth_token_addr), abi=simplified_abi)
symbol = weth_contract.functions.symbol().call()
decimals = weth_contract.functions.decimals().call()
totalSupply = weth_contract.functions.totalSupply().call() / 10**decimals
addr_balance = weth_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  WETH
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)
```

## Masuala yanayojulikana {#erc20-issues}

### Suala la upokeaji wa tokeni za ERC-20 {#reception-issue}

**Kufikia tarehe 06/20/2024 angalau tokeni za ERC-20 zenye thamani ya $83,656,418 zilipotea kutokana na suala hili. Kumbuka kwamba utekelezaji halisi wa ERC-20 unakabiliwa na tatizo hili isipokuwa utekeleze seti ya vizuizi vya ziada juu ya kiwango kama ilivyoorodheshwa hapa chini.**

Wakati tokeni za ERC-20 zinatumwa kwenye mkataba mahiri ambao haujaundwa kushughulikia tokeni za ERC-20, tokeni hizo zinaweza kupotea kabisa. Hili hutokea kwa sababu mkataba unaopokea hauna utendaji wa kutambua au kujibu tokeni zinazoingia, na hakuna utaratibu katika kiwango cha ERC-20 wa kuarifu mkataba unaopokea kuhusu tokeni zinazoingia. Njia kuu ambazo suala hili hujitokeza ni kupitia:

1.	Utaratibu wa hamisho la tokeni
  - Tokeni za ERC-20 zinahamishwa kwa kutumia fanksheni za transfer au transferFrom
	-	Wakati mtumiaji anatuma tokeni kwenye anwani ya mkataba akitumia fanksheni hizi, tokeni zinahamishwa bila kujali kama mkataba unaopokea umeundwa kuzishughulikia
2.	Ukosefu wa arifa
	-	Mkataba unaopokea haupokei arifa au wito wa kurudi (callback) kwamba tokeni zimetumwa kwake
	-	Ikiwa mkataba unaopokea unakosa utaratibu wa kushughulikia tokeni (k.m., fanksheni mbadala au fanksheni maalum ya kusimamia upokeaji wa tokeni), tokeni zinakwama kabisa katika anwani ya mkataba
3.	Hakuna ushughulikiaji uliojengewa ndani
	-	Kiwango cha ERC-20 hakijumuishi fanksheni ya lazima kwa mikataba inayopokea kutekeleza, na kusababisha hali ambapo mikataba mingi inashindwa kusimamia vizuri tokeni zinazoingia

**Masuluhisho Yanayowezekana**

Ingawa haiwezekani kuzuia suala hili kabisa na ERC-20 kuna mbinu ambazo zingeruhusu kupunguza kwa kiasi kikubwa uwezekano wa upotezaji wa tokeni kwa mtumiaji wa mwisho:

- Tatizo la kawaida zaidi ni wakati mtumiaji anatuma tokeni kwenye anwani ya mkataba wa tokeni yenyewe (k.m., USDT iliyowekwa kwenye anwani ya mkataba wa tokeni wa USDT). Inapendekezwa kuzuia fanksheni ya `transfer(..)` ili kutengua majaribio kama haya ya hamisho. Fikiria kuongeza ukaguzi wa `require(_to != address(this));` ndani ya utekelezaji wa fanksheni ya `transfer(..)`.
- Fanksheni ya `transfer(..)` kwa ujumla haijaundwa kwa ajili ya kuweka tokeni kwenye mikataba. Badala yake, muundo wa `approve(..) & transferFrom(..)` unatumika kuweka tokeni za ERC-20 kwenye mikataba. Inawezekana kuzuia fanksheni ya hamisho ili kutoruhusu kuweka tokeni kwenye mikataba yoyote kwayo, hata hivyo inaweza kuvunja uoanifu na mikataba inayochukulia kuwa tokeni zinaweza kuwekwa kwenye mikataba kwa kutumia fanksheni ya `transfer(..)` (k.m., mabwawa ya ukwasi ya Uniswap).
- Kila wakati chukulia kwamba tokeni za ERC-20 zinaweza kuishia kwenye mkataba wako hata kama mkataba wako haupaswi kupokea yoyote. Hakuna njia ya kuzuia au kukataa amana za bahati mbaya upande wa mpokeaji. Inapendekezwa kutekeleza fanksheni ambayo ingeruhusu kutoa tokeni za ERC-20 zilizowekwa kwa bahati mbaya.
- Fikiria kutumia viwango mbadala vya tokeni.

Baadhi ya viwango mbadala vimetokana na suala hili kama vile [ERC-223](/developers/docs/standards/tokens/erc-223) au [ERC-1363](/developers/docs/standards/tokens/erc-1363).

## Usomaji zaidi {#further-reading}

- [EIP-20: Kiwango cha Tokeni cha ERC-20](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - Tokeni](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - Utekelezaji wa ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Mwongozo wa Tokeni za ERC20 za Solidity](https://www.alchemy.com/overviews/erc20-solidity)

## Viwango vingine vya tokheni mbadala {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - Vaults zilizofanywa kuwa tokeni](/developers/docs/standards/tokens/erc-4626)

## Mafunzo: Jenga na ERC-20 kwenye Ethereum {#tutorials}

- [Mwongozo wa Mkataba wa ERC-20](/developers/tutorials/erc20-annotated-code/) _– Mwongozo uliofafanuliwa mstari kwa mstari wa utekelezaji wa mkataba wa ERC-20 wa OpenZeppelin._
- [ERC-20 yenye Njia za Usalama](/developers/tutorials/erc20-with-safety-rails/) _– Jinsi ya kuongeza ulinzi kwenye tokeni za ERC-20 ili kusaidia watumiaji kuepuka makosa ya kawaida._
- [Kutuma Tokeni Kwa Kutumia Ethers.js](/developers/tutorials/send-token-ethersjs/) _– Mwongozo rafiki kwa wanaoanza wa kuhamisha tokeni za ERC-20 kwa kutumia Ethers.js._
- [Baadhi ya mbinu zinazotumiwa na tokeni za utapeli na jinsi ya kuzigundua](/developers/tutorials/scam-token-tricks/) _– Uchunguzi wa kina kuhusu mifumo ya tokeni za utapeli za ERC-20 na jinsi ya kuzitambua._