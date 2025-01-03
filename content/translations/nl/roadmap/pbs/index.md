---
title: Scheiding proposer-builder
description: Leer hoe en waarom Ethereum-validators hun verantwoordelijkheden voor het bouwen en uitzenden van blocks gaan opsplitsen.
lang: nl
---

# Scheiding proposer-builder {#proposer-builder-separation}

De huidige Ethereum-validators maken blocks _en_ zenden ze uit. Ze bundelen transacties waarover ze iets hebben gehoord via het gossip-netwerk en verpakken ze in een block die naar andere gebruikers op het Ethereum-netwerk wordt gestuurd. **Scheiding tussen voorstellers en bouwers (proposer-builder separation, PBS)** verdeelt deze taken over verschillende validators. Block builders worden verantwoordelijk voor het maken van blocks en het aanbieden ervan aan de blockvoorsteller in elk slot. De blockvoorsteller kan de inhoud van de block niet zien, hij/zij kiest gewoon de meest winstgevende en betaalt een kost aan de blockbouwer voordat hij/zij de block naar andere gebruikers verstuurt.

Dit is een belangrijke upgrade om verschillende redenen. Ten eerste creëert het mogelijkheden om transactiecensuur op protocolniveau te voorkomen. Ten tweede voorkomt het dat hobbyistische validators worden weggeconcurreerd door institutionele actoren die de winstgevendheid van de bouw van hun blocks beter kunnen optimaliseren. Ten derde helpt het bij het opschalen van Ethereum door de Danksharding-upgrades mogelijk te maken.

## PBS en weerstand tegen censuur {#pbs-and-censorship-resistance}

Het scheiden van blockbouwers en blockvoorstellers maakt het veel moeilijker voor blockbouwers om transacties te censureren. Dit komt omdat er relatief complexe inclusiecriteria kunnen worden toegepast die ervoor zorgen dat er geen censuur heeft plaatsgevonden voordat de block wordt voorgesteld. Aangezien de blockvoorsteller een aparte entiteit is ten opzichte van de blockbouwer, kan deze de rol van beschermer op zich nemen tegen censurerende blockbouwers.

Er kunnen bijvoorbeeld inclusielijsten worden geïntroduceerd zodat validators, als ze op de hoogte zijn van transacties maar ze niet opgenomen zien in blocks, deze kunnen opleggen als verplicht in de volgende block. De inclusielijst wordt gegenereerd uit de lokale mempool van de blockvoorsteller (de lijst van transacties waarvan hij/zij op de hoogte is) en wordt door hem/haar naar de andere gebruikers gestuurd vlak voordat een block wordt voorgesteld. Als een van de transacties van de inclusielijst ontbreekt, kan de voorsteller de block afwijzen, de ontbrekende transacties toevoegen voordat hij/zij de block voorstelt, of de block voorstellen en laten afwijzen door andere validators wanneer zij de block ontvangen. Er is ook een mogelijk efficiëntere versie van dit idee die stelt dat bouwers de beschikbare blockruimte volledig moeten benutten. Als ze dat niet doen, worden transacties toegevoegd via de inclusielijst van de voorsteller. Dit wordt nog steeds actief onderzocht en de optimale configuratie voor de inclusielijsten is nog niet vastgesteld.

[Versleutelde mempools](https://www.youtube.com/watch?v=fHDjgFcha0M&list=PLpktWkixc1gUqkyc1-iE6TT0RWQTBJELe&index=3) zouden het ook onmogelijk kunnen maken voor bouwers en indieners om te weten welke transacties ze in een block opnemen totdat de block al is uitgezonden.

<ExpandableCard title="Welke vormen van censuur lost PBS op?" eventCategory="/roadmap/pbs" eventName="clicked what kinds of censorship does PBS solve?">

Machtige organisaties kunnen validators onder druk zetten om transacties van of naar bepaalde adressen te censureren. Validators voldoen aan deze druk door adressen die op de zwarte lijst staan te detecteren in hun transactiepool en ze weg te laten uit de blocks die ze voorstellen. Na PBS zal dit niet langer mogelijk zijn omdat blockvoorstellers niet weten welke transacties ze uitzenden in hun blocks. Het kan belangrijk zijn voor bepaalde individuen of apps om zich aan censuurregels te houden, bijvoorbeeld wanneer dit in hun regio bij wet is vastgelegd. In deze gevallen wordt de regelgeving op applicatieniveau nageleefd, terwijl het protocol toestemmingsvrij en censuurvrij blijft.

</ExpandableCard>

## PBS en MEV {#pbs-and-mev}

**Maximum extraheerbare waarde (MEV)** verwijst naar validators die hun winstgevendheid maximaliseren door transacties gunstig te ordenen. Veel voorkomende voorbeelden zijn het arbitreren van omruilingen op gedecentraliseerde crypto-uitwisselingen (bv. vooruitlopen op een grote verkoop of aankoop) of het identificeren van mogelijkheden om DeFi-posities te liquideren. Het maximaliseren van MEV vereist een geavanceerde technische kennis en aangepaste software voor normale validators, waardoor het veel waarschijnlijker is dat institutionele operators beter presteren dan individuele en hobbyistische validators bij het extraheren van MEV. Dit betekent dat stakingrendementen wellicht hoger zijn bij gecentraliseerde operators, wat een centraliserende kracht creëert die staking in een thuisomgeving ontmoedigt.

PBS lost dit probleem op door de economische aspecten van MEV te herconfigureren. In plaats van dat de blockvoorsteller zijn/haar eigen MEV-zoekwerk uitvoert, kiest hij/zij gewoon een block uit de verschillende blocks die hem/haar door blockbouwers worden aangeboden. De blockbouwers hebben wellicht geavanceerde MEV-extractie uitgevoerd, maar de beloning hiervoor gaat naar de blockvoorsteller. Dit betekent dat zelfs als een kleine groep gespecialiseerde blockbouwers de MEV-extractie domineert, de beloning hiervoor naar elke validator op het netwerk kan gaan, ook naar individuele stakers in een thuisomgeving.

<ExpandableCard title="Waarom is het OK om het bouwen van blocks te centraliseren?" eventCategory="/roadmap/pbs" eventName="clicked why is it OK to centralize block building?">

Individuen kunnen worden gestimuleerd om te staken met pools in plaats van op eigen houtje, vanwege de grotere beloningen die geavanceerde MEV-strategieën opleveren. Het scheiden van de blockbouw van het blockvoorstel betekent dat de geëxtraheerde MEV verdeeld wordt over meer validators in plaats van te centraliseren bij de meest effectieve MEV-zoeker. Tegelijkertijd neemt het toestaan van het ontstaan van gespecialiseerde blockbouwers de last van het bouwen van blocks weg bij individuen en voorkomt het ook dat individuen MEV voor zichzelf stelen, terwijl het aantal individuele, onafhankelijke validators die kunnen controleren of de blocks eerlijk zijn, gemaximaliseerd wordt. Het belangrijke concept is “assymmetrie tussen de bewijzer en de verificator”, wat wijst op het idee dat een gecentraliseerde productie van blocks prima is zolang er een robuust en maximaal gedecentraliseerd netwerk van validators bestaat dat kan bewijzen dat de blocks eerlijk zijn. Decentralisatie is een middel, en geen einddoel. Wat we willen, zijn eerlijke blocks.
</ExpandableCard>

## PBS en Danksharding {#pbs-and-danksharding}

Danksharding is de manier waarop Ethereum gaat opschalen naar >100.000 transacties per seconde en de kosten voor rollup-gebruikers minimaliseert. Het vertrouwt op PBS omdat het de werklast voor blockbouwers verhoogt, die bewijzen moeten berekenen voor tot wel 64 MB aan rollupgegevens in minder dan 1 seconde. Hiervoor zijn er waarschijnlijk gespecialiseerde bouwers nodig die behoorlijk wat hardware kunnen inzetten voor deze taak. In de huidige situatie zou het bouwen van blocks echter steeds meer gecentraliseerd kunnen worden rond geavanceerdere en krachtigere operators, hoe dan ook als gevolg van MEV-extractie. De scheiding tussen voorsteller en bouwer is een manier om deze realiteit te aanvaarden en te voorkomen dat het een centraliserende kracht uitoefent op blockvalidatie (het belangrijke deel) of de verdeling van stakingbeloningen. Een groot bijkomend voordeel is dat de gespecialiseerde blockbouwers ook bereid en in staat zijn om de benodigde gegevensbewijzen voor Danksharding te berekenen.

## Huidige vooruitgang {#current-progress}

PBS bevindt zich in een vergevorderd onderzoeksstadium, maar er zijn nog enkele belangrijke ontwerpvragen die moeten worden opgelost voordat het prototype kan worden toegepast in Ethereum-clients. Er is nog geen definitieve specificatie. Dit betekent dat PBS waarschijnlijk nog een jaar of langer op zich zal laten wachten. Bekijk hier de laatste [stand van het onderzoek](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance).

## Verder lezen {#further-reading}

- [Stand van onderzoek: weerstand tegen censuur onder PBS](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)
- [PBS-vriendelijke kostmarktontwerpen](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725)
- [PBS en weerstand tegen censuur](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Secondary-auctions)
- [Inclusielijsten](https://notes.ethereum.org/@fradamt/H1ZqdtrBF)
