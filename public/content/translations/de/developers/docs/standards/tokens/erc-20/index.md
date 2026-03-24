---
title: ERC-20-Token-Standard
description: "Erfahren Sie mehr über ERC-20, den Standard für fungible Token auf Ethereum, der interoperable Token-Anwendungen ermöglicht."
lang: de
---

## Einführung {#introduction}

**Was ist ein Token?**

Token können in [Ethereum](/) praktisch alles repräsentieren:

- Reputationspunkte auf einer Online-Plattform
- Fähigkeiten eines Charakters in einem Spiel
- Finanzanlagen wie eine Unternehmensaktie
- eine Fiatwährung wie USD
- eine Unze Gold
- und vieles mehr...

Eine so mächtige Funktion von Ethereum muss durch einen robusten Standard gehandhabt werden, richtig? Genau hier kommt ERC-20 ins Spiel! Dieser Standard ermöglicht es Entwicklern, Token-Anwendungen zu erstellen, die mit anderen Produkten und Dienstleistungen interoperabel sind. Der ERC-20-Standard wird auch verwendet, um [Ether](/glossary/#ether) zusätzliche Funktionen bereitzustellen.

**Was ist ERC-20?**

ERC-20 führt einen Standard für fungible Token ein. Mit anderen Worten: Sie haben eine Eigenschaft, die jeden Token (in Art und Wert) exakt gleich wie einen anderen Token macht. Ein ERC-20-Token verhält sich beispielsweise genau wie ETH, was bedeutet, dass 1 Token immer gleich allen anderen Token ist und sein wird.

## Voraussetzungen {#prerequisites}

- [Konten](/developers/docs/accounts)
- [Smart Contracts](/developers/docs/smart-contracts/)
- [Token-Standards](/developers/docs/standards/tokens/)

## Hauptteil {#body}

Der ERC-20 (Ethereum Request for Comments 20), der im November 2015 von Fabian Vogelsteller vorgeschlagen wurde, ist ein Token-Standard, der eine API für Token innerhalb von Smart Contracts implementiert.

Beispielfunktionen, die ERC-20 bietet:

- Token von einem Konto auf ein anderes übertragen
- den aktuellen Token-Kontostand eines Kontos abrufen
- das Gesamtangebot des im Netzwerk verfügbaren Tokens abrufen
- genehmigen, ob eine bestimmte Menge an Token von einem Konto durch ein Drittanbieter-Konto ausgegeben werden darf

Wenn ein Smart Contract die folgenden Methoden und Ereignisse implementiert, kann er als ERC-20-Token-Vertrag bezeichnet werden. Sobald er bereitgestellt ist, ist er dafür verantwortlich, die erstellten Token auf Ethereum zu verfolgen.

Aus [EIP-20](https://eips.ethereum.org/EIPS/eip-20):

### Methoden {#methods}

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

### Ereignisse {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### Beispiele {#web3py-example}

Lassen Sie uns sehen, warum ein Standard so wichtig ist, um es uns einfach zu machen, jeden ERC-20-Token-Vertrag auf Ethereum zu überprüfen. Wir benötigen lediglich das Contract Application Binary Interface (ABI), um eine Schnittstelle zu einem beliebigen ERC-20-Token zu erstellen. Wie Sie unten sehen können, werden wir ein vereinfachtes ABI verwenden, um es zu einem reibungslosen Beispiel zu machen.

#### Web3.py-Beispiel {#web3py-example}

Stellen Sie zunächst sicher, dass Sie die Python-Bibliothek [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) installiert haben:

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F" # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" # Wrapped Ether (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11" # Uniswap V2: DAI 2

# Dies ist eine vereinfachte Contract Application Binary Interface (ABI) eines ERC-20-Token-Contracts.
# Es stellt nur die Methoden: balanceOf(address), decimals(), symbol() und totalSupply() bereit.
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

## Bekannte Probleme {#erc20-issues}

### Problem beim Empfang von ERC-20-Token {#reception-issue}

**Bis zum 20.06.2024 gingen aufgrund dieses Problems ERC-20-Token im Wert von mindestens 83.656.418 $ verloren. Beachten Sie, dass eine reine ERC-20-Implementierung für dieses Problem anfällig ist, es sei denn, Sie implementieren zusätzlich zum Standard eine Reihe von Einschränkungen, wie unten aufgeführt.**

Wenn ERC-20-Token an einen Smart Contract gesendet werden, der nicht für die Verarbeitung von ERC-20-Token ausgelegt ist, können diese Token dauerhaft verloren gehen. Dies geschieht, weil der empfangende Vertrag nicht über die Funktionalität verfügt, die eingehenden Token zu erkennen oder darauf zu reagieren, und es im ERC-20-Standard keinen Mechanismus gibt, um den empfangenden Vertrag über die eingehenden Token zu benachrichtigen. Dieses Problem tritt hauptsächlich auf folgende Weise auf:

1.	Token-Übertragungsmechanismus
  - ERC-20-Token werden mit den Funktionen transfer oder transferFrom übertragen
	-	Wenn ein Benutzer Token mit diesen Funktionen an eine Vertragsadresse sendet, werden die Token übertragen, unabhängig davon, ob der empfangende Vertrag für deren Verarbeitung ausgelegt ist
2.	Fehlende Benachrichtigung
	-	Der empfangende Vertrag erhält keine Benachrichtigung oder keinen Rückruf, dass Token an ihn gesendet wurden
	-	Wenn dem empfangenden Vertrag ein Mechanismus zur Verarbeitung von Token fehlt (z. B. eine Fallback-Funktion oder eine dedizierte Funktion zur Verwaltung des Token-Empfangs), stecken die Token effektiv in der Adresse des Vertrags fest
3.	Keine integrierte Verarbeitung
	-	Der ERC-20-Standard enthält keine obligatorische Funktion, die empfangende Verträge implementieren müssen, was zu einer Situation führt, in der viele Verträge eingehende Token nicht ordnungsgemäß verwalten können

**Mögliche Lösungen**

Obwohl es nicht möglich ist, dieses Problem bei ERC-20 vollständig zu verhindern, gibt es Methoden, mit denen die Wahrscheinlichkeit eines Token-Verlusts für den Endbenutzer erheblich verringert werden kann:

- Das häufigste Problem tritt auf, wenn ein Benutzer Token an die Adresse des Token-Vertrags selbst sendet (z. B. USDT, die an die Adresse des USDT-Token-Vertrags eingezahlt werden). Es wird empfohlen, die Funktion `transfer(..)` einzuschränken, um solche Übertragungsversuche rückgängig zu machen. Erwägen Sie das Hinzufügen der Überprüfung `require(_to != address(this));` innerhalb der Implementierung der Funktion `transfer(..)`.
- Die Funktion `transfer(..)` ist im Allgemeinen nicht für die Einzahlung von Token in Verträge vorgesehen. Stattdessen wird das Muster `approve(..) & transferFrom(..)` verwendet, um ERC-20-Token in Verträge einzuzahlen. Es ist möglich, die Übertragungsfunktion so einzuschränken, dass die Einzahlung von Token in beliebige Verträge damit nicht zulässig ist. Dies kann jedoch die Kompatibilität mit Verträgen beeinträchtigen, die davon ausgehen, dass Token mit der Funktion `transfer(..)` in Verträge eingezahlt werden können (z. B. Uniswap-Liquiditätspools).
- Gehen Sie immer davon aus, dass ERC-20-Token in Ihrem Vertrag landen können, selbst wenn Ihr Vertrag niemals welche erhalten soll. Es gibt keine Möglichkeit, versehentliche Einzahlungen auf Empfängerseite zu verhindern oder abzulehnen. Es wird empfohlen, eine Funktion zu implementieren, mit der versehentlich eingezahlte ERC-20-Token extrahiert werden können.
- Erwägen Sie die Verwendung alternativer Token-Standards.

Aus diesem Problem sind einige alternative Standards hervorgegangen, wie z. B. [ERC-223](/developers/docs/standards/tokens/erc-223) oder [ERC-1363](/developers/docs/standards/tokens/erc-1363).

## Weiterführende Literatur {#further-reading}

- [EIP-20: ERC-20-Token-Standard](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - Token](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - ERC-20-Implementierung](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Leitfaden zu Solidity-ERC20-Token](https://www.alchemy.com/overviews/erc20-solidity)

## Andere Standards für fungible Token {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - Tokenisierte Tresore](/developers/docs/standards/tokens/erc-4626)

## Tutorials: Mit ERC-20 auf Ethereum bauen {#tutorials}

- [ERC-20-Vertrag-Walkthrough](/developers/tutorials/erc20-annotated-code/) _– Ein zeilenweise kommentierter Walkthrough der OpenZeppelin-ERC-20-Vertragsimplementierung._
- [ERC-20 mit Sicherheitsvorkehrungen](/developers/tutorials/erc20-with-safety-rails/) _– Wie man ERC-20-Token mit Schutzmaßnahmen versieht, um Benutzern zu helfen, häufige Fehler zu vermeiden._
- [Senden von Token mit ethers.js](/developers/tutorials/send-token-ethersjs/) _– Ein anfängerfreundlicher Leitfaden zur Übertragung von ERC-20-Token mit ethers.js._
- [Einige Tricks von Betrugs-Token und wie man sie erkennt](/developers/tutorials/scam-token-tricks/) _– Ein tiefer Einblick in Muster von betrügerischen ERC-20-Token und wie man sie identifiziert._