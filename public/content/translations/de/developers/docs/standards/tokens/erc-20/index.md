---
title: ERC-20 Token-Standard
description: Erfahren Sie mehr über ERC-20, den Standard für fungible Token auf Ethereum, der interoperable Token Anwendungen ermöglicht.
lang: de
---

## Einführung {#introduction}

**Was ist ein Token?**

Token können praktisch alles in Ethereum darstellen:

- Reputationspunkte auf einer Online-Platform
- Fähigkeiten eines Charakters in einem Spiel
- Vermögenswerte wie Anteile an einer Firma
- Eine Fiat-Währung wie der US-Dollar
- Eine Goldunze
- und mehr...

Diese mächtigen Eigenschaften von Ethereum sollten in einem stabilen Standard bereitgestellt werden, oder? Und genau das ist der Punkt, an dem ERC-20 ins Spiel kommt! Dieser Standard ermöglicht es Entwicklern, Token zu erstellen, die mit anderen Produkten und Services interagieren können. Der ERC-20-Standard wird auch verwendet, um [Ether](/glossary/#ether) zusätzliche Funktionalität bereitzustellen.

**Was ist ERC-20?**

Der ERC-20 führt einen Standard für fungible Token ein, das heißt, sie haben eine Eigenschaft, die jeden Token genau gleich (in Art und Wert) wie einen anderen Token macht. Zum Beispiel verhält sich ein ERC-20-Token genau wie der ETH. Das bedeutet, dass ein Token
immer dem Wert aller anderen Token entspricht.

## Voraussetzungen {#prerequisites}

- [Konten](/developers/docs/accounts)
- [Smart Contracts](/developers/docs/smart-contracts/)
- [Token-Standards](/developers/docs/standards/tokens/)

## Hauptteil {#body}

Der im November 2015 von Fabian Vogelsteller eingereichte ERC-20-Antrag (Ethereum Request for Comments 20) ist ein Token-Standard, der
eine API für Tokens innerhalb von Smart Contracts implementiert.

Beispielfunktionalitäten, die ERC-20 bietet:

- Token von einem Konto auf ein anderes übertragen
- den aktuellen Token-Saldo eines Kontos abfragen
- den im Netz verfügbaren Gesamtvorrat an Token ermitteln
- genehmigen, ob ein Token-Betrag von einem Konto durch ein Drittkonto ausgegeben werden kann

Wenn ein Smart Contract die folgenden Methoden und Ereignisse implementiert, kann er als ERC-20-Token-Vertrag bezeichnet werden und ist nach der Bereitstellung dafür verantwortlich, die erstellten Token auf Ethereum zu verfolgen.

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

Sehen wir uns an, wie wichtig ein Standard ist, um uns die Überprüfung jedes ERC-20-Token-Vertrags auf Ethereum zu erleichtern.
Wir benötigen lediglich das Contract Application Binary Interface (ABI), um eine Schnittstelle zu einem beliebigen ERC-20-Token zu erstellen. Wie Sie
unten sehen können, werden wir ein vereinfachtes ABI verwenden, um es zu einem Beispiel mit geringer Reibung zu machen.

#### Web3.py-Beispiel {#web3py-example}

Stellen Sie zunächst sicher, dass Sie die Python-Bibliothek [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) installiert haben:

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Gedeckter Ether (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# Dies ist eine vereinfachte Contract Application Binary Interface (ABI) eines ERC-20-Token-Vertrags.
# Es werden nur die Methoden verfügbar gemacht: balanceOf(address), decimals(), symbol() und totalSupply()
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

## Bekannte Probleme {#erc20-issues}

### Problem beim Empfang von ERC-20-Token {#reception-issue}

**Bis zum 20.06.2024 gingen aufgrund dieses Problems ERC-20-Token im Wert von mindestens 83.656.418 US-Dollar verloren. Beachten Sie, dass eine reine ERC-20-Implementierung anfällig für dieses Problem ist, es sei denn, Sie implementieren zusätzlich zu dem Standard eine Reihe weiterer Einschränkungen, wie unten aufgeführt.**

Wenn ERC-20-Token an einen Smart Contract gesendet werden, der nicht für den Umgang mit ERC-20-Token ausgelegt ist, können diese Token dauerhaft verloren gehen. Das passiert, weil der empfangende Vertrag nicht die Funktionalität hat, die eingehenden Token zu erkennen oder darauf zu reagieren, und es gibt keinen Mechanismus im ERC-20-Standard, um den empfangenden Vertrag über die eingehenden Token zu benachrichtigen. Die Hauptursachen dieses Problems sind:

1. Token-Übertragungsmechanismus

- ERC-20-Token werden mit den Funktionen transfer oder transferFrom übertragen
  - Wenn ein Benutzer Token an eine Vertragsadresse mit diesen Funktionen sendet, werden die Token unabhängig davon übertragen, ob der empfangende Vertrag dafür ausgelegt ist oder nicht

2. Fehlende Benachrichtigung
   - Der empfangende Vertrag erhält keine Benachrichtigung oder Rückmeldung, dass Token an ihn gesendet wurden
   - Wenn der empfangende Vertrag keinen Mechanismus hat, um Token zu verarbeiten (z.B. eine Fallback-Funktion oder eine spezielle Funktion zur Verwaltung des Tokenempfangs), bleiben die Token effektiv in der Adresse des Vertrags hängen
3. Keine eingebaute Verarbeitung
   - Der ERC-20-Standard enthält keine obligatorische Funktion, die empfangende Verträge implementieren müssen, was dazu führt, dass viele Verträge nicht in der Lage sind, eingehende Token richtig zu verwalten

**Mögliche Lösungen**

Es ist zwar nicht möglich, dieses Problem mit ERC-20 vollständig zu verhindern, aber es gibt Methoden, mit denen die Wahrscheinlichkeit eines Sickerverlusts für den Endnutzer erheblich verringert werden kann:

- Das häufigste Problem tritt auf, wenn ein Benutzer Token an die Adresse des Token-Vertrags selbst sendet (z. B. USDT, die an die Adresse des USDT-Token-Vertrags eingezahlt werden). Es wird empfohlen, die transfer(..)-Funktion einzuschränken, um solche Übertragungsversuche rückgängig zu machen. Erwägen Sie, die Prüfung require(_to != address(this)); in die Implementierung der Funktion transfer(..) aufzunehmen.
- Die transfer(..)-Funktion ist im Allgemeinen nicht dafür ausgelegt, Token in Verträge einzuzahlen. `Genehmigung(..) & transferFrom(..)`-Muster wird stattdessen verwendet, um ERC-20-Token in Verträge einzuzahlen. Es ist möglich, die Transferfunktion so einzuschränken, dass keine Token in Verträge mit dieser Funktion eingezahlt werden können. Dies kann jedoch die Kompatibilität mit Verträgen beeinträchtigen, die davon ausgehen, dass Token mit der Funktion trasnfer(..) in Verträge eingezahlt werden können (z. B. Uniswap-Liquiditätspools).
- Gehen Sie immer davon aus, dass ERC-20-Token in Ihrem Vertrag landen können, auch wenn Ihr Vertrag eigentlich keine erhalten soll. Es gibt keine Möglichkeit, versehentliche Einzahlungen aufseiten des Empfängers zu verhindern oder abzulehnen. Es wird empfohlen, eine Funktion zu implementieren, mit der versehentlich hinterlegte ERC-20-Token extrahiert werden können.
- Erwägen Sie die Verwendung alternativer Token-Standards.

Aus diesem Problem sind einige alternative Standards hervorgegangen, wie zum Beispiel [ERC-223](/developers/docs/standards/tokens/erc-223) oder [ERC-1363](/developers/docs/standards/tokens/erc-1363).

## Weiterführende Lektüre {#further-reading}

- [EIP-20: ERC-20-Token-Standard](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin – Tokens](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin – ERC-20-Implementierung](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy – Leitfaden für Solidity-ERC20-Token](https://www.alchemy.com/overviews/erc20-solidity)

## Andere fungible Token-Standards {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 – Tokenisierte Vaults](/developers/docs/standards/tokens/erc-4626)
