---
title: Ethereum Virtual Machine (EVM)
description: Een inleiding tot de virtual machine van Ethereum en hoe deze zich verhoudt tot de status, transacties en smart contracts.
lang: nl
---

De Ethereum Virtual Machine (EVM) is een gedecentraliseerde virtuele omgeving die code consistent en veilig uitvoert op alle Ethereum-nodes. Nodes voeren de EVM uit om smart contracts te kunnen uitvoeren, waarbij "[gas](/gas/)" wordt gebruikt om de rekenkracht te meten die nodig is voor [handelingen](/developers/docs/evm/opcodes/), wat zorgt voor efficiënte toewijzing van bronnen en netwerkbeveiliging.

## Randvoorwaarden {#prerequisites}

Wat basiskennis van de veelgebruikte terminologie in informatica, zoals [bytes](https://wikipedia.org/wiki/Byte), [geheugen](https://wikipedia.org/wiki/Computer_memory), en een [stack](https://wikipedia.org/wiki/Stack_(abstract_data_type)) is nodig om de EVM te begrijpen. Het kan ook handig zijn om vertrouwd te raken met cryptografie-/blockchainconcepten zoals [hashfuncties](https://wikipedia.org/wiki/Cryptographic_hash_function) en de [Merkle Tree](https://wikipedia.org/wiki/Merkle_tree).

## Van ledger tot statusmachine {#from-ledger-to-state-machine}

De analogie van een “gedistribueerde ledger” wordt vaak gebruikt om blockchains zoals Bitcoin te beschrijven, die zorgen voor een gedecentraliseerde valuta door gebruik te maken van fundamentele hulpmiddelen uit de cryptografie. De ledger houdt een verslag bij van activiteiten die moeten voldoen aan een aantal regels die bepalen wat iemand wel en niet kan doen om de ledger te wijzigen. Een Bitcoin-adres kan bijvoorbeeld niet meer Bitcoin uitgeven dan het eerder heeft ontvangen. Deze regels liggen ten grondslag aan alle transacties op Bitcoin en veel andere blockchains.

Hoewel Ethereum haar eigen cryptovaluta (Ether) heeft die bijna exact dezelfde intuïtieve regels volgt, biedt het ook een veel krachtigere functie: [smart contracts](/developers/docs/smart-contracts/). Voor deze complexere functie is een meer geavanceerde analogie nodig. In plaats van een gedistribueerde ledger is Ethereum een gedistribueerde [statusmachine](https://wikipedia.org/wiki/Finite-state_machine). De status van Ethereum is een grote datastructuur die niet alleen alle rekeningen en saldi bevat, maar ook een _apparaatstatus_, die van block tot block kan veranderen volgens een vooraf gedefinieerde set regels, en die willekeurige machinecode kan uitvoeren. De specifieke regels voor het veranderen van status van block naar block worden gedefinieerd door de EVM.

![Een diagram dat de samenstelling van de EVM laat zien](./evm.png) _Aangepast diagram van [Ethereum EVM geïllustreerd](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## De overgangsfunctie van de Ethereum-status {#the-ethereum-state-transition-function}

De EVM gedraagt zich als een wiskundige functie: op basis van een invoer produceert het een deterministische uitvoer. Het is daarom heel handig om Ethereum formeel te beschrijven als het hebben van een **statusovergangsfunctie**:

```
Y(S, T)= S'
```

Op basis van een oude geldige status `(S)` en een nieuwe set geldige transacties `(T)`, produceert de Ethereum-statustransitie `Y(S, T)` een nieuwe geldige uitvoerstatus `S'`

### Status {#state}

In de context van Ethereum is de status een enorme gegevensstructuur die [aangepaste Merkle Patricia Trie](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/) wordt genoemd. Deze houdt alle [accounts](/developers/docs/accounts/) met elkaar verbonden door hashes en herleidbaar zijn tot een enkele root-hash die is opgeslagen op de blockchain.

### Transacties {#transactions}

Transacties zijn cryptografisch getekende instructies van accounts. Er zijn twee soorten transacties: transacties die resulteren in het oproepen van berichten en transacties die resulteren in het aanmaken van contracten.

Contractaanmaak leidt tot de aanmaak van een nieuw contract dat gecompileerde bytecode voor een [smart contract](/developers/docs/smart-contracts/anatomy/) bevat. Telkens wanneer een ander account een bericht oproept naar dat contract, voert het zijn bytecode uit.

## EVM-instructies {#evm-instructions}

De EVM wordt uitgevoerd als een [stackmachine](https://wikipedia.org/wiki/Stack_machine) met een diepte van 1024 items. Elk item is een 256-bits woord, dat is gekozen vanwege het gebruiksgemak met 256-bits cryptografie (zoals Keccak-256-hashes of secp256k1-handtekeningen).

Tijdens de uitvoering maakt de EVM een tijdelijk _geheugen_ (als een byte-array met woordadres) aan, dat niet tussen transacties blijft bestaan.

Contracten bevatten echter wel een Merkle Patricia-_opslagtrie_ (als een woordadresseerbare woordarray), geassocieerd met het account in kwestie en een deel van de globale status.

Gecompileerde smart contract bytecode wordt uitgevoerd als een aantal EVM-[opcodes](/developers/docs/evm/opcodes), die standaard stackhandelingen uitvoeren zoals `XOR`, `EN`, `ADD`, `SUB`, etc. De EVM implementeert ook een aantal blockchainspecifieke stackhandelingen, zoals `ADRESS`, `BALANCE`, `BLOCKHASH`, enz.

![Een diagram dat toont waar gas nodig is voor EVM-handelingen](../gas/gas.png) _Aangepaste diagrammen van [Ethereum EVM geïllustreerd](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## EVM-implementaties {#evm-implementations}

Alle implementaties van de EVM moeten zich houden aan de specificatie beschreven in de Ethereum Yellowpaper.

In de negen jaar dat Ethereum bestaat, heeft de EVM verschillende wijzigingen ondergaan en zijn er verschillende implementaties van de EVM in verschillende programmeertalen.

[Ethereum-uitvoeringsclients](/developers/docs/nodes-and-clients/#execution-clients) bevatten een EVM-implementatie. Bovendien zijn er nog verschillende aparte implementaties, waaronder:

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/ethereum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [revm](https://github.com/bluealloy/revm) - _Rust_

## Verder lezen {#further-reading}

- [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Jellopaper aka KEVM: Semantics of EVM in K](https://jellopaper.org/)
- [The Beigepaper](https://github.com/chronaeon/beigepaper)
- [Ethereum Virtual Machine Opcodes](https://www.ethervm.io/)
- [Ethereum Virtual Machine Opcodes Interactive Reference](https://www.evm.codes/)
- [A short introduction in Solidity's documentation](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)
- [Mastering Ethereum - The Ethereum Virtual Machine](https://github.com/ethereumbook/ethereumbook/blob/develop/13evm.asciidoc)

## Verwante onderwerpen {#related-topics}

- [Gas](/developers/docs/gas/)
