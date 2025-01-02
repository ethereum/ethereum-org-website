---
title: ERC-20 Tokenszabvány
description:
lang: hu
---

## Bevezetés {#introduction}

**Mi is az a token?**

A tokenek gyakorlatilag bármit képviselhetnek az Ethereumon:

- reputációs pontokat egy online platformon
- egy karakter képességeit egy játékban
- pénzügyi eszközöket, mint például részesedést egy cégben
- fiat valutát, mint az USD
- egy uncia aranyat
- és még sok mást...

Egy ilyen erős Ethereum funkciót egy szintén erős szabványnak kell kezelnie, igaz? És pontosan itt jön képbe az ERC-20 szerepe! Ez a szabvány lehetővé teszi a fejlesztők számára, hogy olyan tokenalkalmazásokat fejlesszenek, amelyek együttműködnek más termékekkel és szolgáltatásokkal. Az ERC-20 szabványt arra is használják, hogy további funkciókat biztosítsanak az [ether](/glossary/#ether) számára.

**Mi az az ERC-20?**

Az ERC-20 bevezeti a helyettesíthető tokenekre vonatkozó szabványt, vagyis minden egyes token pontosan ugyanaz (típusban és értékben), mint egy másik. Például egy ERC-20 token úgy viselkedik, mint az ETH, vagyis 1 token egyenlő és egyenlő is marad az összes többi tokennel.

## Előfeltételek {#prerequisites}

- [Számlák](/developers/docs/accounts)
- [Okosszerződések](/developers/docs/smart-contracts/)
- [Token szabványok](/developers/docs/standards/tokens/)

## Törzs {#body}

Az ERC-20 (Ethereum Request for Comments 20), melyet Fabian Vogelsteller javasolt 2015. novemberében, egy tokenszabvány, mely egy API-t implementál a tokenek számára az okosszerződéseken belül.

Az ERC-20 által biztosított funkciók például:

- tokenek átutalása egyik számláról a másikra
- egy számla aktuális tokenegyenlegének lekérdezése
- a hálózaton rendelkezésre álló tokenek teljes készlete
- jóváhagyja, hogy egy számláról származó token összegét elköltheti-e egy másik számla

Ha egy okosszerződés implementálja a következő metódusokat és eseményeket, akkor egy ERC-20 tokenszerződésnek lehet nevezni, és a telepítés után a létrejött tokenek számontartásáért lesz felelős az Ethereumon.

Az [EIP-20-ból](https://eips.ethereum.org/EIPS/eip-20):

### Metódusok {#methods}

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

### Események {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### Példák {#web3py-example}

Nézzük meg, miért olyan fontos egy szabvány, hogy egyszerűbbé tegye számunkra azt, hogy bármely ERC-20 tokenszerződést megtekinthessük az Ethereumon. Csak a szerződés Alkalmazás bináris interfészére (ABI) lesz szükség, hogy egy felületet készítsünk bármely ERC-20 tokennek. Ahogy lentebb láthatja, egy egyszerűsített ABI-t használunk, hogy egyszerűbb példával éljünk.

#### Web3.py példa {#web3py-example}

Először győződjön meg arról, hogy a [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python könyvtár telepítve van:

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Wrapped ether (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# Ez egy ERC-20 token szerződés egyszerűsített Application Binary Interface-e (ABI).
# It will expose only the methods: balanceOf(address), decimals(), symbol() and totalSupply()
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

## Ismert problémák {#erc20-issues}

### ERC-20-token-elfogadási problémák {#reception-issue}

Amikor ERC-20 tokeneket küldenek olyan okosszerződésbe, amely nem tudja azokat kezelni, akkor ezek végleg elvesznek. Ennek az az oka, hogy a befogadó szerződésnek nincs olyan funkcionalitása, hogy felismerje vagy válaszoljon a bejövő tokenekre, és nincs olyan mechanizmus az ERC-20-szabványban, ami figyelmeztetné a szerződést az érkező tokenekről. Ez a probléma a következő módokon nyilvánul meg:

1.  Tokenátviteli mechanizmus
  - Az ERC-20 tokeneket a transfer vagy a transferFrom függvényekkel lehet küldeni
    -   Amikor a felhasználó tokeneket küld egy szerződéscímre ezekkel a függvényekkel, a tokenek elmennek attól függetlenül, hogy a szerződés képes-e azokat fogadni
2.  A figyelmeztetés hiánya
    -   A befogadó szerződés nem kap figyelmeztetést vagy visszahívást, hogy tokenek érkeztek hozzá
    -   Ha a befogadó szerződés nem tud tokeneket kezelni (például nincs egy fallback függvény vagy egy dedikált függvény, ami a tokent fogadná), akkor a tokenek beragadnak a szerződés címén
3.  Nincs beépített kezelés
    -   Az ERC-20 szabvány nem köti ki a kötelező funkciót a befogadó szerződésnek, ezért számos szerződés képtelen a beérkező tokenek megfelelő kezelésére

Néhány alternatív szabvány létezik ennek a problémának a kezelésére, mint az [ERC-223](/developers/docs/standards/tokens/erc-223)

## További olvasnivaló {#further-reading}

- [EIP-20: ERC-20 tokenszabvány](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin – Tokenek](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin – ERC-20-implementáció](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy – Útmutató a Solidity ERC-20 tokenekhez](https://www.alchemy.com/overviews/erc20-solidity)


## További helyettesíthető tokenekről szóló szabványok {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - Tokenizált értékmegőrzőre vonatkozó szabvány](/developers/docs/standards/tokens/erc-4626)