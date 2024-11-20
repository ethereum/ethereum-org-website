---
title: Verkle-bomen
description: Een beschrijving op hoog niveau van Verkle Trees en hoe ze zullen worden gebruikt om Ethereum te upgraden
lang: nl
summaryPoints:
  - Ontdek wat Verkle Trees zijn
  - Ontdek waarom Verkle Trees een nuttige upgrade zijn voor Ethereum
---

# Verkle-bomen {#verkle-trees}

Verkle trees (een combinatie van een “vectorverbintenis” en “Merkle Trees”) zijn een gegevensstructuur die gebruikt kan worden om Ethereumnodes te upgraden zodat ze kunnen stoppen met het opslaan van grote hoeveelheden statusgegevens zonder de mogelijkheid te verliezen om blocks te valideren.

## Statelessness {#statelessness}

Verkle Trees zijn een kritieke stap op weg naar statusloze Ethereum-clients. Statusloze clients zijn clients die niet de hele statusdatabase hoeven op te slaan om binnenkomende blocks te valideren. In plaats van hun eigen lokale kopie van de status van Ethereum te gebruiken om blocks te verifiëren, gebruiken statusloze clients een “getuige” van de statusgegevens die samen met de block aankomt. Een getuige is een verzameling van individuele stukken van de statusgegevens die nodig zijn om een bepaalde reeks transacties uit te voeren, en een cryptografisch bewijs dat de getuige werkelijk deel uitmaakt van de volledige gegevens. De getuige wordt gebruikt _in plaats van_ de staatsdatabase. Om dit te laten werken, moeten de getuigen erg klein zijn, zodat ze veilig en op tijd over het netwerk kunnen worden uitgezonden zodat validators ze binnen een slot van 12 seconden kunnen verwerken. De huidige statusgegevensstructuur is niet geschikt omdat getuigen te groot zijn. Verkle Trees lossen dit probleem op door kleine getuigen toe te staan, waardoor één van de belangrijkste hindernissen voor statusloze clients uit de weg wordt geruimd.

<ExpandableCard title="Waarom willen we statusloze clients?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

Ethereum-clients gebruiken momenteel een gegevensstructuur die bekend staat als een Patricia Merkle Trie om de statusgegevens op te slaan. Informatie over individuele accounts wordt opgeslagen als "leaves" (bladeren) op de trie en paren van bladeren worden herhaaldelijk gehasht totdat er slechts één hash overblijft. Deze laatste hash staat bekend als de “root” (wortel). Om blocks te verifiëren, voeren Ethereum-clients alle transacties in een block uit en werken ze hun lokale state trie bij. De block wordt als geldig beschouwd als de root van de lokale tree identiek is aan degene die is aangeleverd door de blockvoorsteller, omdat elk verschil in de berekening door de blockvoorsteller en de validerende node ervoor zou zorgen dat de root hash compleet anders zou zijn. Het probleem hiermee is dat het verifiëren van de blockchain vereist dat elke client de hele state trie voor het head block en verschillende historische blocks opslaat (de standaard in Geth is om statusgegevens voor 128 blocks achter het head te bewaren). Dit vereist dat clients toegang hebben tot een grote hoeveelheid schijfruimte, wat een hindernis vormt voor het uitvoeren van volledige nodes op goedkope, energiezuinige hardware. Een oplossing hiervoor is om de state trie bij te werken naar een efficiëntere structuur (Verkle Tree) die kan worden samengevat met behulp van een kleine “getuige” van de gegevens die kunnen worden gedeeld in plaats van de volledige statusgegevens. Het herformatteren van de statusgegevens in een Verkle Tree is een opstapje om over te gaan op statusloze clients.

</ExpandableCard>

## Wat is een getuige en waarom hebben we ze nodig? {#what-is-a-witness}

Het verifiëren van een block betekent het opnieuw uitvoeren van de transacties in de block, het aanbrengen van de veranderingen in de state trie van Ethereum en het berekenen van de nieuwe root hash. Een geverifieerde block is een block waarvan de berekende hash van de state root hetzelfde is als degene die bij het block zit (omdat dit betekent dat de voorsteller van het block echt de berekening heeft gedaan waarvan hij/zij zegt dat hij/zij het heeft gedaan). Bij de huidige clients van Ethereum vereist het bijwerken van de status toegang tot de volledige state trie, wat een grote gegevensstructuur is die lokaal moet worden opgeslagen. Een getuige bevat alleen de fragmenten van de statusgegevens die nodig zijn om de transacties in de block uit te voeren. Een validator kan vervolgens alleen gebruik maken van die fragmenten om te verifiëren dat de blockvoorsteller de blocktransacties heeft uitgevoerd en de status correct heeft bijgewerkt. Dit betekent echter dat de getuige snel genoeg moet worden overgedragen tussen de verschillende gebruikers op het netwerk van Ethereum om veilig te worden ontvangen en verwerkt door elke node binnen een tijdspanne van 12 seconden. Als de getuige te groot is, kan het bij sommige nodes te lang duren om het te downloaden en de chain bij te benen. Dit is een centraliserende kracht omdat het betekent dat alleen nodes met een snelle internetverbinding kunnen deelnemen aan het valideren van blocks. Met Verkle trees is het niet nodig om de status op uw harde schijf te hebben. _Alles_ wat u nodig hebt om een block te verifiëren zit in de block zelf. Helaas zijn de getuigen die geproduceerd kunnen worden uit Merkle tries te groot om statusloze clients te ondersteunen.

## Waarom maken Verkle Trees kleinere getuigen mogelijk? {#why-do-verkle-trees-enable-smaller-witnesses}

De structuur van een Merkle Trie maakt de getuigen erg groot. Te groot om dit veilig uit te zenden tussen de verschillende gebruikers binnen een slot van 12 seconden. Dit komt omdat de getuige een pad is dat de gegevens, die in de leaves (bladeren) zitten, verbindt met de hash van de root. Om de gegevens te verifiëren, zijn niet alleen alle tussenliggende hashes nodig die elk blad met de wortel verbinden, maar ook alle verwante nodes. Elke node in het bewijs heeft een verwante node waarmee hij gehasht wordt om de volgende hash in de trie te maken. Dat zijn een hoop gegevens. Verkle Trees verkleinen de grootte van de getuige door de afstand tussen de bladeren van de boom en de wortel te verkorten en ook door de noodzaak te elimineren om verwante nodes voor te stellen voor het verifiëren van de hash van de wortel. Er wordt nog meer ruimte gewonnen door een krachtig polynomiaal verbintenisschema te gebruiken in plaats van de vectorverbintenis in hash-stijl. De polynomiale verbintenis zorgt ervoor dat de getuige een vaste grootte heeft, ongeacht het aantal bladeren dat hij/zij bewijst.

Onder het polynomiale verbintenisschema hebben de getuigen een beheersbare grootte die gemakkelijk kan worden overgedragen op het peer-to-peer netwerk. Hierdoor kunnen clients statusveranderingen in elke block verifiëren met een minimale hoeveelheid gegevens.

<ExpandableCard title="Hoe veel kunnen Verkle Trees precies getuigen verkleinen?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

De grootte van de getuige varieert afhankelijk van het aantal bladeren (leaves). Ervan uitgaande dat de getuige 1000 bladeren (leaves) beslaat, zou een getuige voor een Merkle trie ongeveer 3.5MB groot zijn (uitgaande van 7 niveaus op de trie). Een getuige voor dezelfde gegevens in een Verkle Tree (uitgaande van 4 niveaus in de Tree) is ongeveer 150 kB - **ongeveer 23x kleiner**. Door deze verkleining van de getuige kunnen statusloze client-getuigen acceptabel klein zijn. Polynomiale getuigen zijn 0,128 -1 kB, afhankelijk van welke specifieke polynomiale verbintenis wordt gebruikt.

</ExpandableCard>

## Wat is de structuur van een Verkle Tree? {#what-is-the-structure-of-a-verkle-tree}

Verkle Trees zijn `(key,value)` paren waarbij de sleutels elementen van 32 bytes zijn die bestaan uit een _stam_ van 31 bytes en een enkele byte _suffix_. Deze sleutels zijn georganiseerd in _extensie_-nodes en _binnenste_ nodes. Extensie-nodes staan voor een enkele stam voor 256 afstammelingen met verschillende suffixen. Binnenste nodes hebben ook 256 afstammelingen, maar dit kunnen andere extensie-nodes zijn. Het belangrijkste verschil tussen de Verkle Tree en de Merkle Tree-structuur is dat de Verkle Tree veel platter is, wat betekent dat er minder tussenliggende nodes zijn die een blad met de wortel verbinden, en dat er dus minder gegevens nodig zijn om een bewijs te genereren.

![](./verkle.png)

[Ontdek meer over de structuur van Verkle Trees](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## Huidige vooruitgang {#current-progress}

De testnetten van Verkle Trees zijn al in gebruik genomen, maar er zijn nog steeds belangrijke updates van clients nodig om Verkle Trees te ondersteunen. U kunt helpen de voortgang te versnellen door contracten op de testnets te implementeren of testnetclients uit te voeren.

[Ontdek het Verkle Gen Devnet 6 testnet](https://verkle-gen-devnet-6.ethpandaops.io/)

[Kijk hoe Guillaume Ballet het Condrieu Verkle-testnet uitlegt](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (merk op dat het Condrieu-testnet proof-of-work was en nu is vervangen door het Verkle Gen Devnet 6 testnet).

## Verder lezen {#further-reading}

- [Verkle Trees voor statusloosheid](https://verkle.info/)
- [Dankrad Feist legt Verkle Trees uit op PEEPanEIP](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [Guillaume Ballet legt Verkle Trees uit op ETHGlobal](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- [“Hoe Verkle bomen Ethereum mager en gedreven maken” door Guillaume Ballet op Devcon 6](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [Piper Merriam over statusloze clients op ETHDenver 2020](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [Dankrad Fiest legt Verkle Trees en statusloosheid uit op de Zero Knowledge-podcast](https://zeroknowledge.fm/episode-202-stateless-ethereum-verkle-tries-with-dankrad-feist/)
- [Vitalik Buterin over Verkle Trees](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Dankrad Feist over Verkle Trees](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [EIP documentatie Verkle Tree](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)
