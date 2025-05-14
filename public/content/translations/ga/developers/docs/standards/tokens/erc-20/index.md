---
title: ERC-20 Caighdeán Chomhartha
description:
lang: ga
---

## Réamhrá {#introduction}

**Cad is Comhartha ann?**

Is féidir le comharthaí ionadaíocht a dhéanamh ar bheagnach rud ar bith in Ethereum:

- pointí clú ar ardán ar líne
- scileanna carachtair i gcluiche
- sócmhainní airgeadais amhail scair i gcuideachta
- airgeadra fiat cosúil le USD
- unsa óir
- agus tuilleadh...

Nach mór gné chomh chumhachtach de Ethereum a láimhseáil le caighdeán láidir? Sin é go díreach an ról atá ag ERC-20! Ligeann an caighdeán seo d’fhorbróirí feidhmchláir chomharthaí a thógáil atá idir-inoibritheach le táirgí agus seirbhísí eile. Úsáidtear an caighdeán ERC-20 freisin chun feidhmiúlacht bhreise a sholáthar do [éitear](/glossary/#ether).

**Cad é ERC-20?**

Tugann an ERC-20 isteach caighdeán le haghaidh Comharthaí Idirmhalartacha, i bhfocail eile, tá maoin acu a fhágann go bhfuil gach Comhartha go díreach mar an gcéanna (i gcineál agus luach) le Comhartha eile. Mar shampla, feidhmíonn Comhartha ERC-20 díreach cosúil leis an ETH, rud a chiallaíonn go bhfuil 1 Chomhartha cothrom i gcónaí le gach Comhartha eile.

## Réamhriachtanais {#prerequisites}

- [Cuntais](/developers/docs/accounts)
- [Conarthaí Cliste](/developers/docs/smart-contracts/)
- [Caighdeáin comharthaí](/developers/docs/standards/tokens/)

## Comhlacht {#body}

Is Caighdeán Comhartha é an ERC-20 (Iarratas Ethereum ar Thuairimí 20), a mhol Fabian Vogelsteller i mí na Samhna 2015. Cuireann sé API le haghaidh comharthaí laistigh de Chonarthaí Cliste i bhfeidhm.

Feidhmiúlachtaí samplacha a sholáthraíonn ERC-20:

- comharthaí a aistriú ó chuntas amháin go cuntas eile
- iarmhéid comharthaíochta reatha an chuntais a fháil
- soláthar iomlán an chomhartha atá ar fáil ar an líonra a fháil
- a cheadú cibé an féidir le cuntas tríú páirtí méid dearbhán ó chuntas a chaitheamh

Má chuireann Conradh Cliste na modhanna agus na himeachtaí seo a leanas i bhfeidhm is féidir Conradh Comhartha ERC-20 a thabhairt air agus, nuair a imscartar é, beidh sé freagrach as súil a choinneáil ar na comharthaí cruthaithe ar Ethereum.

Ó [EIP-20](https://eips.ethereum.org/EIPS/eip-20):

### Modhanna {#methods}

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

### Imeachtaí {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### Samplaí {#web3py-example}

Feicimis conas atá Caighdeán chomh tábhachtach chun go mbeadh sé simplí dúinn iniúchadh a dhéanamh ar aon Chonradh Chomhartha ERC-20 ar Ethereum. Níl uainn ach Comhéadan Dénártha Iarratas Conartha (ABI) chun comhéadan a chruthú d’aon Chomhartha ERC-20. Mar atá le feiceáil thíos bainfimid úsáid as ABI simplithe, chun sampla frithchuimilte íseal a dhéanamh de.

#### Sampla Web3.py {#web3py-example}

Ar dtús, déan cinnte go bhfuil [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) leabharlann Python suiteáilte agat:

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Wrapped ether (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# This is a simplified Contract Application Binary Interface (ABI) of an ERC-20 Token Contract.
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

## Saincheisteanna aitheanta {#erc20-issues}

### Saincheist ghlactha comhartha ERC-20 {#reception-issue}

Nuair a sheoltar comharthaí ERC-20 chuig conradh cliste nach bhfuil deartha chun comharthaí ERC-20 a láimhseáil, is féidir na comharthaí sin a chailliúint go buan. Tarlaíonn sé seo toisc nach bhfuil an fheidhmiúlacht ag an gconradh fála chun na comharthaí isteach a aithint nó freagairt dóibh, agus níl aon mheicníocht sa chaighdeán ERC-20 chun fógra a thabhairt don chonradh fála faoi na comharthaí isteach. Is iad na príomhbhealaí a dtagann an cheist seo i gcrích ná trí:

1.  Meicníocht aistrithe comhartha
  - Aistrítear comharthaí ERC-20 ag baint úsáide as na feidhmeanna aistrithe nó transferFrom
    -   Nuair a sheolann úsáideoir comharthaí chuig seoladh conartha ag baint úsáide as na feidhmeanna seo, aistrítear na comharthaí gan aird ar an bhfuil an conradh glactha deartha chun iad a láimhseáil
2.  Easpa fógra
    -   Ní fhaigheann an conradh fála fógra nó aisghlao go bhfuil comharthaí seolta chuige
    -   Mura bhfuil meicníocht ag an gconradh fála chun comharthaí a láimhseáil (m.sh. feidhm chúltaca nó feidhm thiomnaithe chun glacadh comharthaí a bhainistiú), tá na comharthaí i bhfostú go héifeachtach i seoladh an chonartha
3.  Gan láimhseáil ionsuite
    -   Ní áirítear i gcaighdeán ERC-20 feidhm shainordaitheach chun conarthaí a fháil le cur chun feidhme, rud a fhágann nach féidir le go leor conarthaí comharthaí isteach a bhainistiú i gceart

D'eascair roinnt caighdeán malartacha as an gceist seo ar nós [ERC-223](/developers/docs/standards/tokens/erc-223)

## Tuilleadh léitheoireachta {#further-reading}

- [EIP-20: Caighdeán Comhartha ERC-20](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - Comharthaí](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - ERC-20 Cur i bhfeidhm](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Ailceimic - Treoir maidir le Comharthaí Solidity ERC20](https://www.alchemy.com/overviews/erc20-solidity)


## Caighdeáin chomharthaí idirmhalartacha eile {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - boghtaí comharthaithe](/developers/docs/standards/tokens/erc-4626)