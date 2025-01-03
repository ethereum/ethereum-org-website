---
title: Transacties
description: 'Een overzicht van Ethereum-transacties: hoe ze werken, hun datastructuur en hoe ze te versturen via een applicatie.'
lang: nl
---

Transacties zijn cryptografisch ondertekende instructies van accounts. Een account zal een transactie starten om de status van het Ethereum-netwerk bij te werken. De eenvoudigste transactie is het overmaken van ETH van het ene account naar het andere.

## Randvoorwaarden {#prerequisites}

Om u te helpen om deze pagina beter te begrijpen, raden we u aan om eerst onze [Accounts](/developers/docs/accounts/) en onze [inleiding tot Ethereum](/developers/docs/intro-to-ethereum/) te lezen.

## Wat is een transactie? {#whats-a-transaction}

Een Ethereum-transactie verwijst naar een actie die gestart wordt door een account in externe eigendom, met andere woorden een account dat beheerd wordt door een mens, en niet door een contract. Als Bob bijvoorbeeld 1 ETH naar Alice stuurt, moet het account van Bob gedebiteerd worden en dat van Alice gecrediteerd. Deze actie waarbij de status wordt gewijzigd, vindt plaats binnen een transactie.

![Diagram die een transactie toont die een statuswijziging veroorzaakt](./tx.png) _Aangepast diagram van [Ethereum-EVM geïllustreerd](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Transacties die de toestand van de EVM veranderen, moeten naar het hele netwerk worden uitgezonden. Elke node kan een verzoek uitzenden om een transactie uit te voeren op de EVM; nadat dit is gebeurd, zal een validator de transactie uitvoeren en de resulterende statuswijziging verspreiden naar de rest van het netwerk.

Transacties vragen om een kost en moeten worden opgenomen in een gevalideerde block. Om dit overzicht eenvoudiger te maken, behandelen we de gaskosten en validatie ergens anders.

Een ingediende transactie bevat de volgende informatie:

- `from`: het adres van de afzender die de transactie zal ondertekenen. Dit is een account in externe eigendom, aangezien contractaccounts geen transacties kunnen verzenden.
- `to`: het ontvangende adres (als het een account in externe eigendom is, zal de transactie de waarde overdragen. Als het een contractaccount is, zal de transactie de contractcode uitvoeren)
- `signature`: de identificator van de afzender. Dit wordt gegenereerd wanneer de persoonlijke sleutel van de afzender de transactie ondertekent en bevestigt dat de afzender deze transactie heeft geautoriseerd
- `nonce`: een sequentieel oplopende teller die het transactienummer van het account aangeeft
- `value`: hoeveelheid ETH over te dragen van afzender naar ontvanger (uitgedrukt in WEI, waarbij 1ETH gelijk is aan 1e+18wei)
- `input data`: optioneel veld om willekeurige gegevens in te plaatsen
- `gasLimit`: de maximale hoeveelheid gaseenheden die door de transactie kan worden verbruikt. De [EVM](/developers/docs/evm/opcodes) specificeert de benodigde gaseenheden voor elke rekenstap
- `maxPriorityFeePerGas`: de maximumprijs van het verbruikte gas dat als fooi aan de validator wordt gegeven
- `maxFeePerGas` - de maximale kost per eenheid gas bereid te betalen voor de transactie (inclusief `baseFeePerGas` en `maxPriorityFeePerGas`)

Gas is een verwijzing naar de berekening die nodig is om de transactie te verwerken door een validator. Gebruikers moeten een kost betalen voor deze berekening. De `gasLimit` en `maxPriorityFeePerGas` bepalen de maximale transactiekost die aan de validator wordt betaald. [Meer over gas](/developers/docs/gas/).

Het transactie-object zal er ongeveer zo uitzien:

```js
{
  from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
  to: "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
  gasLimit: "21000",
  maxFeePerGas: "300",
  maxPriorityFeePerGas: "10",
  nonce: "0",
  value: "10000000000"
}
```

Maar een transactie-object moet worden ondertekend met de persoonlijke sleutel van de afzender. Dit bewijst dat de transactie alleen van de afzender afkomstig kan zijn en niet frauduleus is verzonden.

Een Ethereum client zoals Geth zal dit ondertekeningsproces afhandelen.

Voorbeeld [JSON-RPC](/developers/docs/apis/json-rpc) call:

```json
{
  "id": 2,
  "jsonrpc": "2.0",
  "method": "account_signTransaction",
  "params": [
    {
      "from": "0x1923f626bb8dc025849e00f99c25fe2b2f7fb0db",
      "gas": "0x55555",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "input": "0xabcd",
      "nonce": "0x0",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234"
    }
  ]
}
```

Voorbeeldreactie:

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "raw": "0xf88380018203339407a565b7ed7d7a678680a4c162885bedbb695fe080a44401a6e4000000000000000000000000000000000000000000000000000000000000001226a0223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20ea02aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
    "tx": {
      "nonce": "0x0",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "gas": "0x55555",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234",
      "input": "0xabcd",
      "v": "0x26",
      "r": "0x223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20e",
      "s": "0x2aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
      "hash": "0xeba2df809e7a612a0a0d444ccfa5c839624bdc00dd29e3340d46df3870f8a30e"
    }
  }
}
```

- de `raw` is de ondertekende transactie in [Recursive Length Prefix (RLP)](/developers/docs/data-structures-and-encoding/rlp)-gecodeerde vorm
- de `tx` is de ondertekende transactie in JSON-vorm

Met de hash van de handtekening kan cryptografisch bewezen worden dat de transactie afkomstig is van de afzender en ingediend is bij het netwerk.

### Het dataveld {#the-data-field}

De overgrote meerderheid van de transacties heeft toegang tot een contract vanaf een account in externe eigendom. De meeste contracten zijn geschreven in Solidity en interpreteren hun gegevensveld in overeenstemming met de [application binary interface (ABI)](/glossary/#abi).

De eerste vier bytes geven aan welke functie moet worden opgeroepen, met behulp van de hash van de naam en argumenten van de functie. Soms kunt u de functie uit de selector identificeren met behulp van [deze database](https://www.4byte.directory/signatures/).

De rest van de calldata zijn de argumenten, [gecodeerd zoals aangegeven in de ABI-specificaties](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Laten we bijvoorbeeld eens kijken naar [deze transactie](https://etherscan.io/tx/0xd0dcbe007569fcfa1902dae0ab8b4e078efe42e231786312289b1eee5590f6a1). Gebruik **Klik om meer te zien** om de calldata te bekijken.

De functieselector is `0xa9059cbb`. Er zijn verschillende [bekende functies met deze handtekening](https://www.4byte.directory/signatures/?bytes4_signature=0xa9059cbb). In dit geval is [de contractbroncode](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#code) geüpload naar Etherscan, dus we weten dat de functie `transfer(address,uint256)` is.

De rest van de gegevens zijn:

```
0000000000000000000000004f6742badb049791cd9a37ea913f2bac38d01279
000000000000000000000000000000000000000000000000000000003b0559f4
```

Volgens de ABI-specificaties verschijnen gehele waarden (zoals adressen, die gehele getallen van 20 bytes zijn) in de ABI als woorden van 32 bytes, opgevuld met nullen vooraan. We weten dus dat het `to`-adres [`4f6742badb049791cd9a37ea913f2bac38d01279`](https://etherscan.io/address/0x4f6742badb049791cd9a37ea913f2bac38d01279) is. De `value` is 0x3b0559f4 = 990206452.

## Types transacties {#types-of-transactions}

Op Ethereum zijn er verschillende soorten transacties:

- Reguliere transacties: een transactie van het ene account naar het andere.
- Contractimplementatietransacties: een transactie zonder een 'to'-adres, waarbij het gegevensveld wordt gebruikt voor de contractcode.
- Uitvoering van een contract: een transactie die interactie heeft met een ingezet smart contract. In dit geval is het 'to'-adres het smart contract-adres.

### Over gas {#on-gas}

Zoals gezegd, kosten transacties [gas](/developers/docs/gas/) om uit te voeren. Eenvoudige overschrijvingstransacties vereisen 21.000 eenheden gas.

Dus als Bob 1 ETH zou sturen naar Alice met een `baseFeePerGas` van 190 gwei en een `maxPriorityFeePerGas` van 10 gwei, zal Bob de volgende kosten moeten betalen:

```
(190 + 10) * 21000 = 4.200.000 gwei
--of-
0,0042 ETH
```

Bob's account zal worden gedebiteerd met **-1,0042 ETH** (1 ETH voor Alice + 0,0042 ETH aan gaskosten)

Alice's account zal worden gecrediteerd met **+1,0 ETH**

De basiskost van **-0,00399 ETH** wordt verbrand

Validator houdt de fooi van **+0,000210 ETH** zelf bij


![Schema dat toont hoe ongebruikt gas wordt terugbetaald](./gas-tx.png) _Aangepast diagram van [Ethereum-EVM geïllustreerd](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Gas dat niet wordt gebruikt in een transactie, wordt terugbetaald op het gebruikersaccount.

### Smart contract-interactions {#smart-contract-interactions}

Gas is vereist voor elke transactie waar een smart contract bij betrokken is.

Smart contracts kunnen ook functies bevatten die bekend staan als [`view`](https://docs.soliditylang.org/en/latest/contracts.html#view-functions)- of [`pure`](https://docs.soliditylang.org/en/latest/contracts.html#pure-functions) functies, die de status van het contract niet veranderen. Voor het aanroepen van deze functies vanuit een EOA is dus geen gas nodig. De onderliggende RPC-aanroep voor dit scenario is [`eth_call`](/developers/docs/apis/json-rpc#eth_call)

In tegenstelling tot wanneer `eth_call` wordt gebruikt, worden deze `view`- of `pure`-functies ook vaak intern aangeroepen (d.w.z. vanuit het contract zelf of vanuit een ander contract), wat gas kost.

## Transactielevenscyclus {#transaction-lifecycle}

Zodra de transactie is ingediend, gebeurt het volgende:

1. Een transactie-hash wordt cryptografisch gegenereerd: `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. De transactie wordt vervolgens uitgezonden naar het netwerk en toegevoegd aan een transactiepool die bestaat uit alle andere netwerktransacties die in behandeling zijn.
3. Een validator moet uw transactie kiezen en in een block opnemen om de transactie te verifiëren en als “succesvol” te beschouwen.
4. Na verloop van tijd wordt de block die uw transactie bevat geüpgraded naar “gerechtvaardigd” en vervolgens naar “gefinaliseerd”. Deze upgrades maken het veel zekerder dat uw transactie succesvol was en nooit zal worden gewijzigd. Als een block eenmaal “gefinaliseerd” is, kan het alleen worden veranderd door een aanval op netwerkniveau die vele miljarden dollars zou kosten.

## Een visuele demo {#a-visual-demo}

Austin leidt u door transacties, gas en mining.

<YouTube id="er-0ihqFQB0" />

## Getypte transactie-envelop {#typed-transaction-envelope}

Ethereum had oorspronkelijk één formaat voor transacties. Elke transactie bevatte een nonce, gasprijs, gaslimiet, to-adres, waarde, gegevens, v, r en s. Deze velden zijn [RLP-gecodeerd](/developers/docs/data-structures-and-encoding/rlp/), om er ongeveer zo uit te zien:

`RLP([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`

Ethereum heeft zich ontwikkeld om meerdere soorten transacties te ondersteunen om nieuwe functies, zoals toegangslijsten en [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) te kunnen implementeren, zonder oudere transactieformaten te beïnvloeden.

[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) maakt dit gedrag mogelijk. Transacties worden geïnterpreteerd als:

`TransactionType || TransactionPayload`

Waar de velden worden gedefinieerd als:

- `TransactionType`: een getal tussen 0 en 0x7f, voor een totaal van 128 mogelijke transactietypes.
- `TransactionPayload`: een willekeurige byte array gedefinieerd door het transactietype.

Op basis van de waarde `TransactionType` kan een transactie worden geclassificeerd als

1. **Type 0 (oudere) transacties:** het oorspronkelijke transactieformaat dat sinds de lancering van Ethereum wordt gebruikt. Ze bevatten geen functies uit [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) zoals dynamische berekeningen van gaskosten of toegangslijsten voor smart contracts. Oudere transacties hebben geen specifieke prefix die hun type aangeeft in hun seriële vorm, beginnend met de byte `0xf8` bij gebruik van [Recursive Length Prefix (RLP)](/developers/docs/data-structures-and-encoding/rlp)-codering. De TransactionType-waarde voor deze transacties is `0x0`.

2. **Transacties van type 1:** Sinds [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) geïntroduceerd als onderdeel van de [Berlin-upgrade](/history/#berlin) van Ethereum, bevatten deze transacties een `accessList`-parameter. Deze lijst geeft adressen en opslagsleutels aan waartoe de transactie toegang verwacht te krijgen, wat helpt om mogelijk de [gaskosten](/developers/docs/gas/) te verminderen voor complexe transacties waarbij smart contracts betrokken zijn. De marktwijzigingen voor EIP-1559-kosten zijn niet opgenomen in transacties van type 1. Transacties van type 1 bevatten ook een `yParity`-parameter, die `0x0` of `0x1` kan zijn, waarmee de pariteit van de y-waarde van de secp256k1-handtekening wordt aangegeven. Ze worden geïdentificeerd door te beginnen met de byte `0x01`, en hun TransactionType-waarde is `0x1`.

3. **Transacties van type 2**, ook wel EIP-1559-transacties genoemd, zijn transacties geïntroduceerd in [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), in de [London-upgrade](/history/#london) van Ethereum. Ze zijn het standaard transactietype geworden op het Ethereum-netwerk. Deze transacties introduceren een nieuw kostenmarktmechanisme waardoor de voorspelbaarheid wordt verbeterd door de transactiekosten te splitsen in een basiskost en een prioriteitskost. Ze beginnen met de byte `0x02` en bevatten velden zoals `maxPriorityFeePerGas` en `maxFeePerGas`. Transacties van type 2 zijn nu standaard dankzij hun flexibiliteit en efficiëntie, en zijn vooral interessant tijdens periodes van hoge netwerkcongestie omdat ze gebruikers helpen om transactiekosten voorspelbaarder te beheren. De TransactionType-waarde voor deze transacties is `0x2`.



## Verder lezen {#further-reading}

- [EIP-2718: getypte transactie-envelop](https://eips.ethereum.org/EIPS/eip-2718)

_Weet je van een community resource die je heeft geholpen? Bewerk deze pagina en voeg het toe!_

## Verwante onderwerpen {#related-topics}

- [Accounts](/developers/docs/accounts/)
- [Ethereum virtuele machine (EVM)](/developers/docs/evm/)
- [Brandstof](/developers/docs/gas/)
