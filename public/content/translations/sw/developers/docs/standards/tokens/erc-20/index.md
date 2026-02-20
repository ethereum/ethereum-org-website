---
title: ERC-20 ishara kiwango
description: Kujifunza kuhusu ERC-20, kiwango kwa ishara kubadilisha juu ya Ethereum kwamba kuwezesha maombi ishara kuingiliana.
lang: sw
---

## Utangulizi {#introduction}

**Ishara Ni Nini?**

Ishara inaweza kuwakilisha kitu chochote katika Ethereum:

- sifa hatua katika jukwaa Mtandao
- ujuzi wa tabia katika mchezo
- mali ya kifedha kama sehemu katika kampuni
- sarafu ya fedha kama USD
- pauni moja ya dhahabu
- na zaidi...

Kama kipengele nguvu ya Ethereum lazima kuangaliwa na kiwango imara, haki? Hiyo ni hasa
ambapo ERC-20 ina jukumu yake! Kiwango hiki kuruhusu watengenezaji kujenga maombi ishara kwamba ni kulingana na bidhaa nyingine na huduma. Kiwango cha ERC-20 pia hutumiwa kutoa utendaji zaidi kwa [ether](/glossary/#ether).

**ERC-20 ni nini?**

Ya ERC-20 utangulizi kiwango kwa badilishwa ishara, kwa maneno mengine, wana mali ambayo kueneza kila ishara kuwa hasa
sawa (katika aina na thamani) kama ishara nyingine. Kwa mfano, ERC-20 ishara vitendo tu kama ETH, maana yake ni kwamba 1 ishara
ni na siku zote itakuwa sawa na ishara nyingine zote.

## Mahitaji ya awali {#prerequisites}

- Hifadhi ya fedha (/developers/docs/accounts)
- [Mkataba erevu](/developers/docs/smart-contracts/)
- [Viwango vya tokeni](/developers/docs/standards/tokens/)

## Mwili {#body}

ERC-20 (Ethereum Ombi la Maoni 20), kupendekeza na Fabian Vogelsteller mnamo Novemba 2015, ni Kiwango cha ishara ambacho
kutekeleza API kwa ishara ndani ya Mikataba erevu.

Mfano utendaji ERC-20 hutoa:

- kuhamisha ishara kutoka hifadhi ya fedha moja hadi nyingine
- kupata usawa wa sasa ishara ya hifadhi ya fedha
- kupata ugavi jumla ya ishara inapatikana kwenye Mtandao
- kupitisha kama kiasi cha ishara kutoka hifadhi ya fedha inaweza kutumika kwa hifadhi ya mtu wa tatu

Kama erevu mkataba kutekeleza mbinu kufuatia na matukio inaweza kuitwa ERC-20 ishara ya mkataba na, mara moja kupelekwa, ni
itakuwa na jukumu la kufuatilia ishara iliyoundwa kwenye Ethereum.

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

Hebu angalia jinsi kiwango ni muhimu sana kufanya jambo rahisi kwa ajili yetu ya kukagua yoyote ERC-20 ishara ya mkataba juu ya Ethereum.
Sisi tu haja ya Mkataba wa Maombi jozi Mtandao (ABI) kujenga Mtandao kwa yoyote ERC-20 ishara. Ama unaweza
Tazama chini kutumia ABI rahisi, kuifanya mfano wa msuguano mdogo.

#### Mfano wa Web3.py {#web3py-example}

Kwanza, hakikisha umesakinisha maktaba ya Python ya [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Ether iliyofungwa (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# Huu ni Kiolesura Kilichorahisishwa cha Programu ya Mkataba (ABI) ya Mkataba wa Tokeni wa ERC-20.
# Itaonyesha tu mbinu: balanceOf(address), decimals(), symbol() na totalSupply()
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

### Suala la upokeaji wa tokeni ya ERC-20 {#reception-issue}

**Kufikia 06/20/2024, angalau tokeni za ERC-20 zenye thamani ya $83,656,418 zilipotea kutokana na suala hili. Kumbuka kwamba utekelezaji halisi wa ERC-20 unakabiliwa na tatizo hili isipokuwa utekeleze seti ya vikwazo vya ziada juu ya kiwango kama ilivyoorodheshwa hapa chini.**

Wakati ishara za ERC-20 kutumwa kwa mkataba mzuri ambao hakuna iliyoundwa kushughulikia ishara za ERC-20, ishara hizo zinaweza kupotea kabisa. Hii hutokea kwa sababu ya kupokea mkataba hana utendaji wa kutambua au kujibu ishara inayoingia, na hakuna utaratibu katika ERC-20 kiwango kuwajulisha kupokea mkataba kuhusu ishara inayoingia. Njia kuu suala hili inachukua sura ni kupitia:

1. Ishara uhamisho utaratibu

- ERC-20 ishara ni kuhamisha kwa kutumia uhamisho au uhamisho kutoka kazi
  - Wakati mtumiaji tuma ishara kwa anwani ya mkataba kwa kutumia kazi hizi, ishara ni kuhamisha bila kujali kama mkataba kupokea ni iliyoundwa kushughulikia yao

2. Ukosefu wa taarifa
   - Mkataba kupokea haina kupokea taarifa au wito nyuma kwamba ishara wamekuwa alituma yake
   - Kama mkataba kupokea haina utaratibu wa kushughulikia ishara (kwa mfano, kazi ya kurudi au kazi ya kujitolea kusimamia mapokezi ishara), ishara ni ufanisi kukwama katika anwani ya mkataba
3. Hakuna kujengwa katika utunzaji
   - Kiwango ERC-20 haina ni pamoja na kazi ya lazima kwa ajili ya kupokea mikataba ya kutekeleza, na kusababisha hali ambapo mikataba mengi ni hawawezi kusimamia ishara inayokuja vizuri

**Suluhisho inawezekana**

Wakati haiwezekani kuzuia suala hili na ERC-20 kabisa kuna mbinu ambayo kuruhusu kwa kiasi kikubwa kupunguza uwezekano wa kupoteza ishara kwa mtumiaji wa mwisho:

- Tatizo la kawaida zaidi ni wakati mtumiaji anapotuma tokeni kwenye anwani ya mkataba wa tokeni yenyewe (k.m., USDT imewekwa kwenye anwani ya mkataba wa tokeni ya USDT). Inapendekezwa kuzuia kazi ya `transfer(..)` ili kurudisha majaribio kama hayo ya uhamisho. Fikiria kuongeza uhakiki wa `require(_to != address(this));` ndani ya utekelezaji wa kazi ya `transfer(..)`.
- Kazi ya `transfer(..)` kwa ujumla haikuundwa kwa ajili ya kuweka tokeni kwenye mikataba. `kukubali(..) Mfumo wa `& transferFrom(..)`hutumika kuweka tokeni za ERC-20 kwenye mikataba badala yake. Inawezekana kuzuia kazi ya uhamisho ili kutoruhusu kuweka tokeni kwenye mikataba yoyote nayo, hata hivyo inaweza kuvunja uoanifu na mikataba ambayo inachukulia kuwa tokeni zinaweza kuwekwa kwenye mikataba kwa kutumia kazi ya`trasnfer(..)` (k.m., mabwawa ya ukwasi ya Uniswap).
- Njia kudhani kwamba ERC-20 ishara inaweza kumaliza katika mkataba wako hata kama mkataba huo si lazima milele kupokea yoyote. Hakuna njia ya kuzuia au kukataa amana ya bahati mbaya juu ya mwisho wa wapokeaji. Kushauriwa kutekeleza kazi ambayo kuruhusu kuchimba ishara za ERC-20 zilizowekwa kwa bahati mbaya.
- Fikiria kutumia viwango vya ishara mabadala.

Baadhi ya viwango mbadala vimetokana na suala hili kama vile [ERC-223](/developers/docs/standards/tokens/erc-223) au [ERC-1363](/developers/docs/standards/tokens/erc-1363).

## Masomo zaidi {#further-reading}

- [EIP-20: ERC-20 ishara kiwango](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - Tokeni](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - Utekelezaji wa ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Mwongozo wa Tokeni za Solidity ERC20](https://www.alchemy.com/overviews/erc20-solidity)

## Viwango vingine vya tokeni vinavyoweza kubadilishwa {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - Hifadhi za tokeni](/developers/docs/standards/tokens/erc-4626)
