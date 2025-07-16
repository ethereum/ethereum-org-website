---
title: Standard token ERC-20
description:
lang: it
---

## Introduzione {#introduction}

**Cos'è un token?**

I token possono rappresentare praticamente tutto in Ethereum:

- punti di reputazione in piattaforme online
- abilità di un personaggio di un videogioco
- strumenti finanziari come una partecipazione in una società
- una valuta legale come il dollaro statunitense
- un'oncia d'oro
- e molto altro...

Una caratteristica così potente di Ethereum deve essere gestita da uno standard robusto. Questo è esattamente il ruolo di ERC-20! Questo standard permette agli sviluppatori di creare applicazioni token interoperabili con altri prodotti e servizi. Lo standard ERC-20 è anche utilizzato per fornire funzionalità aggiuntive a [ether](/glossary/#ether).

**Cos'è ERC-20?**

ERC-20 introduce uno standard per i token fungibili. In altre parole, questi token hanno una proprietà che rende ogni token esattamente uguale (per tipo e valore) a un altro token. Per esempio, un token ERC-20 funziona esattamente come ETH, ossia 1 token è e sarà sempre uguale a tutti gli altri token.

## Prerequisiti {#prerequisites}

- [Conti](/developers/docs/accounts)
- [Contratti Intelligenti](/developers/docs/smart-contracts/)
- [Standard per i token](/developers/docs/standards/tokens/)

## Corpo {#body}

L'ERC-20 (Ethereum Request for Comments 20), proposto da Fabian Vogelsteller nel novembre del 2015, è uno Standard del Token che implementa un'API per i token nei Contratti Intelligenti.

Esempio di funzionalità fornite da ERC-20:

- trasferire token da un conto all'altro
- ottenere il saldo corrente di token di un conto
- richiedere la quantità totale di token disponibile sulla rete
- approvare se un importo di token da un conto è spendibile da un conto di terze parti

Se un Contratto Intelligente implementa i seguenti metodi ed eventi, può esser definito un Contratto a Token ERC-20 e, una volta distribuito, sarà responsabile di tenere traccia dei token creati su Ethereum.

Da [EIP-20](https://eips.ethereum.org/EIPS/eip-20):

### Metodi {#methods}

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

### Eventi {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### Esempi {#web3py-example}

Vediamo perché uno standard è così importante per semplificare l'ispezione dei contratti token ERC-20 su Ethereum. Ci serve solo la Contract Application Binary Interface (ABI) per creare un'interfaccia per qualsiasi token ERC-20. Come puoi vedere di seguito, useremo un'ABI semplificata per fornire un esempio semplice da capire.

#### Esempio Web3.py {#web3py-example}

Prima di tutto, controlla di avere installato la libreria Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Wrapped ether (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# questa è un'ABI (Contract Application Binary Interface) semplificata per un contratto token ERC-20.
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

## Problemi noti {#erc20-issues}

### Problema di ricezione del token ERC-20 {#reception-issue}

Quando i token ERC-20 sono inviati a un contratto intelligente non progettato per gestirli, questi potrebbero essere perduti permanentemente. Questo si verifica perché il contratto ricevente non dispone della funzionalità per riconoscere o rispondere ai token in entrata e perché nello standard ERC-20 non è presente alcun meccanismo per avvertire il contratto ricevente dei token in entrata. Le forme principali assunte da questo problema sono:

1.  Meccanismo di trasferimento del token
  - I token ERC-20 sono trasferiti utilizzando le funzioni transfer e transferFrom
    -   Quando un utente invia i token a un indirizzo del contratto utilizzando queste funzioni, i token sono trasferiti indipendentemente dal fatto che il contratto ricevente sia progettato per gestirli
2.  Mancanza di notifica
    -   Il contratto ricevente non riceve una notifica o callback quando gli vengono inviati i token
    -   Se il contratto ricevente manca di un meccanismo per gestire i token (ad es. una funzione di ripiego o una funzione dedicata per gestirne la ricezione), i token restano di fatto bloccati nell'indirizzo del contratto
3.  Nessuna gestione integrata
    -   Lo standard ERC-20 non include una funzione obbligatoria che i contratti riceventi devono implementare, il che comporta situazioni in cui molti contratti non riescono a gestire adeguatamente i token in entrata

Alcuni standard alternativi hanno risolto questo problema, come l'[ERC-223](/developers/docs/standards/tokens/erc-223)

## Letture consigliate {#further-reading}

- [EIP-20: Standard dei token ERC-20](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - Token](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - Implementazione ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Guida ai token ERC20 di Solidity](https://www.alchemy.com/overviews/erc20-solidity)


## Altri standard di token fungibili {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - Casseforti tokenizzate](/developers/docs/standards/tokens/erc-4626)