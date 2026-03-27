---
title: Standard dei Token ERC-20
description: Scopri l'ERC-20, lo standard per i token fungibili su Ethereum che consente applicazioni di token interoperabili.
lang: it
---

## Introduzione {#introduction}

**Cos'è un Token?**

I token possono rappresentare virtualmente qualsiasi cosa in [Ethereum](/):

- punti reputazione in una piattaforma online
- abilità di un personaggio in un gioco
- attività finanziarie come un'azione in una società
- una valuta fiat come l'USD
- un'oncia d'oro
- e molto altro...

Una funzionalità così potente di Ethereum deve essere gestita da uno standard robusto, giusto? È esattamente qui che l'ERC-20 entra in gioco! Questo standard consente agli sviluppatori di creare applicazioni di token interoperabili con altri prodotti e servizi. Lo standard ERC-20 è utilizzato anche per fornire funzionalità aggiuntive all'[ether](/glossary/#ether).

**Cos'è l'ERC-20?**

L'ERC-20 introduce uno standard per i Token Fungibili, in altre parole, hanno una proprietà che rende ogni Token esattamente uguale (per tipo e valore) a un altro Token. Ad esempio, un Token ERC-20 agisce proprio come l'ETH, il che significa che 1 Token è e sarà sempre uguale a tutti gli altri Token.

## Prerequisiti {#prerequisites}

- [Account](/developers/docs/accounts)
- [Contratti intelligenti](/developers/docs/smart-contracts/)
- [Standard dei token](/developers/docs/standards/tokens/)

## Corpo {#body}

L'ERC-20 (Ethereum Request for Comments 20), proposto da Fabian Vogelsteller nel novembre 2015, è uno Standard dei Token che implementa un'API per i token all'interno dei contratti intelligenti.

Esempi di funzionalità fornite dall'ERC-20:

- trasferire token da un account a un altro
- ottenere il saldo attuale dei token di un account
- ottenere l'offerta totale del token disponibile sulla rete
- approvare se una quantità di token di un account può essere spesa da un account di terze parti

Se un contratto intelligente implementa i seguenti metodi ed eventi, può essere definito un Contratto di Token ERC-20 e, una volta distribuito, sarà responsabile di tenere traccia dei token creati su Ethereum.

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

Vediamo come uno Standard sia così importante per semplificarci l'ispezione di qualsiasi Contratto di Token ERC-20 su Ethereum. Abbiamo solo bisogno dell'Application Binary Interface (ABI) del contratto per creare un'interfaccia per qualsiasi Token ERC-20. Come puoi vedere di seguito, utilizzeremo un'ABI semplificata, per renderlo un esempio a basso attrito.

#### Esempio con Web3.py {#web3py-example}

Innanzitutto, assicurati di aver installato la libreria Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F" # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" # Wrapped ether (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11" # Uniswap V2: DAI 2

# Questa è una Contract Application Binary Interface (ABI) semplificata di un contratto token ERC-20.
# Esporrà solo i metodi: balanceOf(address), decimals(), symbol() e totalSupply()
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

# DAI
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)

weth_contract = w3.eth.contract(address=w3.to_checksum_address(weth_token_addr), abi=simplified_abi)
symbol = weth_contract.functions.symbol().call()
decimals = weth_contract.functions.decimals().call()
totalSupply = weth_contract.functions.totalSupply().call() / 10**decimals
addr_balance = weth_contract.functions.balanceOf(acc_address).call() / 10**decimals

# WETH
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)
```

## Problemi noti {#erc20-issues}

### Problema di ricezione dei token ERC-20 {#reception-issue}

**Al 20/06/2024, almeno 83.656.418 $ in token ERC-20 sono stati persi a causa di questo problema. Nota che un'implementazione ERC-20 pura è soggetta a questo problema a meno che non si implementi una serie di restrizioni aggiuntive oltre allo standard, come elencato di seguito.**

Quando i token ERC-20 vengono inviati a un contratto intelligente che non è progettato per gestire i token ERC-20, tali token possono andare persi in modo permanente. Questo accade perché il contratto ricevente non ha la funzionalità per riconoscere o rispondere ai token in arrivo e non c'è alcun meccanismo nello standard ERC-20 per notificare al contratto ricevente i token in arrivo. I modi principali in cui questo problema prende forma sono attraverso:

1.	Meccanismo di trasferimento dei token
  - I token ERC-20 vengono trasferiti utilizzando le funzioni transfer o transferFrom
	-	Quando un utente invia token all'indirizzo del contratto utilizzando queste funzioni, i token vengono trasferiti indipendentemente dal fatto che il contratto ricevente sia progettato per gestirli
2.	Mancanza di notifica
	-	Il contratto ricevente non riceve una notifica o un callback che i token gli sono stati inviati
	-	Se il contratto ricevente non ha un meccanismo per gestire i token (ad es., una funzione di fallback o una funzione dedicata per gestire la ricezione dei token), i token rimangono effettivamente bloccati nell'indirizzo del contratto
3.	Nessuna gestione integrata
	-	Lo standard ERC-20 non include una funzione obbligatoria da implementare per i contratti riceventi, portando a una situazione in cui molti contratti non sono in grado di gestire correttamente i token in arrivo

**Possibili Soluzioni**

Sebbene non sia possibile prevenire completamente questo problema con l'ERC-20, esistono metodi che consentirebbero di ridurre significativamente la possibilità di perdita di token per l'utente finale:

- Il problema più comune si verifica quando un utente invia token all'indirizzo del contratto del token stesso (ad es., USDT depositati all'indirizzo del contratto del token USDT). Si consiglia di limitare la funzione `transfer(..)` per annullare tali tentativi di trasferimento. Considera l'aggiunta del controllo `require(_to != address(this));` all'interno dell'implementazione della funzione `transfer(..)`.
- La funzione `transfer(..)` in generale non è progettata per depositare token nei contratti. Il pattern `approve(..) & transferFrom(..)` viene invece utilizzato per depositare token ERC-20 nei contratti. È possibile limitare la funzione di trasferimento per impedire il deposito di token in qualsiasi contratto con essa, tuttavia ciò potrebbe interrompere la compatibilità con i contratti che presumono che i token possano essere depositati nei contratti con la funzione `transfer(..)` (ad es., le pool di liquidità di Uniswap).
- Presumi sempre che i token ERC-20 possano finire nel tuo contratto anche se il tuo contratto non dovrebbe mai riceverne. Non c'è modo di prevenire o rifiutare depositi accidentali da parte del destinatario. Si consiglia di implementare una funzione che consenta di estrarre i token ERC-20 depositati accidentalmente.
- Considera l'utilizzo di standard dei token alternativi.

Da questo problema sono emersi alcuni standard alternativi come l'[ERC-223](/developers/docs/standards/tokens/erc-223) o l'[ERC-1363](/developers/docs/standards/tokens/erc-1363).

## Letture consigliate {#further-reading}

- [EIP-20: Standard dei Token ERC-20](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - Token](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - Implementazione ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Guida ai Token ERC20 in Solidity](https://www.alchemy.com/overviews/erc20-solidity)

## Altri standard di token fungibili {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - Caveau tokenizzati](/developers/docs/standards/tokens/erc-4626)

## Tutorial: Sviluppare con l'ERC-20 su Ethereum {#tutorials}

- [Panoramica del contratto ERC-20](/developers/tutorials/erc20-annotated-code/) _– Una panoramica annotata riga per riga dell'implementazione del contratto ERC-20 di OpenZeppelin._
- [ERC-20 con misure di sicurezza](/developers/tutorials/erc20-with-safety-rails/) _– Come aggiungere salvaguardie ai token ERC-20 per aiutare gli utenti a evitare errori comuni._
- [Inviare token utilizzando ethers.js](/developers/tutorials/send-token-ethersjs/) _– Una guida per principianti al trasferimento di token ERC-20 utilizzando ethers.js._
- [Alcuni trucchi utilizzati dai token truffa e come rilevarli](/developers/tutorials/scam-token-tricks/) _– Un'analisi approfondita dei pattern dei token ERC-20 truffa e come identificarli._