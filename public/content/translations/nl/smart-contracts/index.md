---
title: Smart contracts
description: Een niet-technische introductie tot smart contracts
lang: nl
---

# Inleiding tot smart contracts {#introduction-to-smart-contracts}

Slimme contracten zijn de fundamentele bouwstenen van de applicatielaag van Ethereum. Het zijn computerprogramma's die zijn opgeslagen op de [blockchain](/glossary/#blockchain) die de "als dit dan dat"-logica volgen en gegarandeerd worden uitgevoerd volgens de regels die zijn gedefinieerd in de code, die niet kan worden gewijzigd zodra deze is aangemaakt.

Nick Szabo heeft de term "smart contract" bedacht. In 1994 schreef hij [een inleiding tot het concept](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html), en in 1996 schreef hij [een onderzoek van wat slimme contracten zouden kunnen doen](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Szabo had een digitale marktplaats voor ogen waar automatische, [cryptografisch beveiligde](/glossary/#cryptography) processen transacties en bedrijfsfuncties mogelijk maken zonder vertrouwde tussenpersonen. Slimme contracten op Ethereum brengen deze visie in de praktijk.

Bekijk slimme contracten uitgelegd door Finematics:

<YouTube id="pWGLtjG-F5c" />

## Vertrouwen in traditionele contracten {#trust-and-contracts}

Een van de grootste problemen met een traditioneel contract is de noodzaak dat vertrouwde personen zich houden aan de resultaten van het contract.

Hier is een voorbeeld:

Alice en Bob houden een fietsrace. Laten we zeggen dat Alice $ 10 wed dat ze de race zal winnen. Bob heeft er alle vertrouwen in dat hij de winnaar zal zijn en gaat akkoord met de weddenschap. Uiteindelijk beëindigt Alice de race eerder dan Bob en is zij de duidelijke winnaar. Maar Bob weigert de weddenschap uit te betalen en beweert dat Alice heeft gesjoemeld.

Dit dwaze voorbeeld illustreert het probleem van een niet-slimme overeenkomst. Zelfs als aan de voorwaarden van de overeenkomst wordt voldaan (d.w.z. je bent de winnaar van de race), moet je nog steeds een ander persoon vertrouwen om de overeenkomst uit te voeren (d.w.z. de uitbetaling van de weddenschap).

## Een digitale verkoopautomaat {#vending-machine}

Een eenvoudige metafoor voor een slim contract is een verkoopautomaat die op ongeveer dezelfde manier werkt als een slim contract: specifieke inputs garanderen een vooraf bepaalde output.

- Je selecteert een product
- De verkoopautomaat toont de prijs
- Je betaalt de prijs
- De verkoopautomaat controleert of je het juiste bedrag hebt betaald
- De verkoopautomaat geeft je je item

De verkoopautomaat zal het gewenste product pas afgeven als aan alle vereisten is voldaan. Als je geen product selecteert of niet genoeg geld invoert, zal de automaat het product niet afgeven.

## Automatische uitvoering {#automation}

Het belangrijkste voordeel van een slim contract is dat het deterministisch duidelijke code uitvoert wanneer aan bepaalde voorwaarden is voldaan. Het is niet nodig om te wachten tot een mens het resultaat interpreteert. Hierdoor zijn er geen vertrouwde tussenpersonen meer nodig.

Je kunt bijvoorbeeld een slim contract opstellen dat fondsen in escrow houdt voor een kind, waarna het kind het geld kan opnemen na een bepaalde datum. Als het kind probeert om het geld op te nemen vóór de opgegeven datum, wordt het slimme contract simpelweg niet uitgevoerd. Of je kunt een contract opstellen waarbij je automatisch een digitale versie van het eigendomsbewijs van een auto krijgt wanneer je de dealer betaalt.

## Voorspelbare resultaten {#predictability}

Traditionele contracten zijn meerduidig omdat ze afhankelijk zijn van mensen om ze te interpreteren en uit te voeren. Twee rechters kunnen een contract bijvoorbeeld anders interpreteren, wat kan leiden tot inconsistente beslissingen en ongelijke uitkomsten. Slimme contracten nemen deze mogelijkheid weg. Slimme contracten worden in plaats daarvan precies uitgevoerd op basis van de voorwaarden die zijn geschreven in de code van het contract. Deze precisie betekent dat het slimme contract onder dezelfde omstandigheden, altijd hetzelfde resultaat zal opleveren.

## Openbaar register {#public-record}

Slimme contracten zijn ook nuttig voor audits en tracking. Omdat de slimme contracten van Ethereum op een openbare blockchain staan, kan iedereen informatie over activaoverdrachten en andere gerelateerde informatie direct bijhouden. Zo kun je bijvoorbeeld controleren of iemand geld naar jouw adres heeft gestuurd.

## Privacybescherming {#privacy-protection}

Slimme contracten beschermen ook je privacy. Omdat Ethereum een pseudonymeus netwerk is (een netwerk waar je transacties publiekelijk verbonden zijn aan een uniek cryptografisch adres, en niet aan je identiteit), kun je je privacy beschermen tegen observeerders.

## Zichtbare voorwaarden {#visible-terms}

Tot slot kun je, net als bij traditionele contracten, controleren wat er in een slim contract staat voordat je het ondertekent (of er anderszins mee interageert). De transparantie van een slim contract garandeert dat iedereen het kan onderzoeken.

## Toepassingsscenario's voor slimme contracten {#use-cases}

Slimme contracten kunnen in wezen alles doen wat computerprogramma's kunnen doen.

Ze kunnen berekeningen uitvoeren, valuta creëren, gegevens opslaan, [NFT's](/glossary/#nft) minten, communicatie verzenden en zelfs afbeeldingen genereren. Hier zijn enkele populaire praktijkvoorbeelden:

- [Stablecoins](/stablecoins/)
- [Creëren en distribueren van unieke digitale activa](/nft/)
- [Een automatische, open wisselkoers](/get-eth/#dex)
- [Gedecentraliseerde gaming](/dapps/?category=gaming#explore)
- [Een verzekeringsbeleid dat automatisch uitbetaalt](https://etherisc.com/)
- [Een standaard waarmee mensen aangepaste, interoperabele valuta's kunnen maken](/developers/docs/standards/tokens/)

## Verder lezen {#further-reading}

- [Hoe smart contracts de wereld zullen veranderen](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Smart contracts: de blockchain-technologie die advocaten zal vervangen](https://blockgeeks.com/guides/smart-contracts/)
- [Smart contracts voor ontwikkelaars](/developers/docs/smart-contracts/)
- [Leer smart contracts te schrijven](/developers/learning-tools/)
- [Ethereum begrijpen - Wat is een smart contract?](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)
