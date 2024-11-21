---
title: Inleiding tot dapps
description:
lang: nl
---

Een gedecentraliseerd applicatie (decentralized application, dapp) is een applicatie die gebouwd is op een gedecentraliseerd netwerk dat een [smart contract](/developers/docs/smart-contracts/) en een frontend gebruikersinterface combineert. Op Ethereum zijn smart contracts toegankelijk en transparant (zoals open API's), dus uw dapp kan zelfs een smart contract bevatten dat iemand anders heeft geschreven.

## Randvoorwaarden {#prerequisites}

Voordat u meer te weten komt over dapps, moet u de [basisprincipes van de blockchain](/developers/docs/intro-to-ethereum/) leren. Verder moet u lezen over het Ethereum-netwerk en hoe het gedecentraliseerd is.

## Definitie van een dapp {#definition-of-a-dapp}

Bij een dapp werkt de achterliggende code op een gedecentraliseerd peer-to-peer netwerk. Dit in tegenstelling tot een app waarbij de backendcode op gecentraliseerde servers draait.

Een dapp kan frontend code en gebruikersinterfaces hebben die in elke taal geschreven zijn (net als een app) om aanroepen te doen naar zijn backend. Bovendien kan de frontend worden gehost op een gedecentraliseerde opslag zoals [IPFS](https://ipfs.io/).

- **Gedecentraliseerd**: dapps werken op Ethereum, een open, publiek, gedecentraliseerd platform waar geen enkele persoon of groep de controle over heeft
- **Deterministisch**: dapps voeren dezelfde functie uit, ongeacht de omgeving waarin ze worden uitgevoerd
- **Turing-compleet**: dapps kunnen elke actie uitvoeren met de benodigde bronnen
- **Geïsoleerd**: dapps worden uitgevoerd in een virtuele omgeving die Ethereum Virtual Machine wordt genoemd, zodat wanneer het smart contract een bug bevat, dit de normale werking van het blockchainnetwerk niet belemmert

### Over smart contracts {#on-smart-contracts}

Om dapps te introduceren, moeten we smart contracts introduceren. Dit is de backend van een dapp, bij gebrek aan een betere term. Ga voor een gedetailleerd overzicht naar ons gedeelte over [smart contracts](/developers/docs/smart-contracts/).

Een smart contract is code die op de Ethereum-blockchain staat en precies zo werkt als geprogrammeerd. Zodra smart contracts zijn ingezet op het netwerk, kunt u ze niet meer veranderen. Dapps kunnen gedecentraliseerd zijn omdat ze gecontroleerd worden door de logica die in het contract geschreven is, niet door een individu of bedrijf. Dit betekent ook dat u uw contracten heel zorgvuldig moet ontwerpen en grondig moet testen.

## Voordelen van dapp-ontwikkeling {#benefits-of-dapp-development}

- **Geen downtime**: zodra het smart contract is geïmplementeerd op de blockchain, is het netwerk als geheel altijd in staat om klanten te bedienen die op zoek zijn naar interactie met het contract. Kwaadwillende actoren kunnen daarom geen denial-of-service-aanvallen uitvoeren die gericht zijn op individuele dapps.
- **Privacy**: u hoeft geen echte identiteit op te geven om een dapp te implementeren of ermee te communiceren.
- **Weerstand tegen censuur**: geen enkele entiteit op het netwerk kan gebruikers blokkeren om transacties in te dienen, dapps te implementeren of gegevens van de blockchain te lezen.
- **Volledige data-integriteit**: gegevens die zijn opgeslagen op de blockchain, zijn onveranderlijk en onbetwistbaar, dankzij cryptografische primitieven. Kwaadwillende actoren kunnen geen transacties of andere gegevens vervalsen die al openbaar zijn gemaakt.
- **Vertrouwensloze berekening/verifieerbaar gedrag**: smart contracts kunnen worden geanalyseerd en worden gegarandeerd uitgevoerd op een voorspelbare manier, zonder de noodzaak om een centrale autoriteit te vertrouwen. Dit geldt niet voor traditionele modellen. Wanneer we bijvoorbeeld online banksystemen gebruiken, moeten we erop vertrouwen dat financiële instellingen onze financiële gegevens niet misbruiken, niet met de gegevens knoeien of gehackt worden.

## Nadelen van dapp-ontwikkeling {#drawbacks-of-dapp-development}

- **Onderhoud**: dapps kunnen moeilijker te onderhouden zijn omdat de code en gegevens die gepubliceerd zijn op de blockchain moeilijker te wijzigen zijn. Het is moeilijk voor ontwikkelaars om updates uit te voeren aan hun dapps (of de onderliggende gegevens die zijn opgeslagen door een dapp) als ze eenmaal zijn uitgerold, zelfs als er bugs of beveiligingsrisico's zijn ontdekt in een oude versie.
- **Prestatie-overhead**: er is een enorme prestatie-overhead en opschalen is erg moeilijk. Om het niveau van veiligheid, integriteit, transparantie en betrouwbaarheid te bereiken dat Ethereum nastreeft, voert elke node iedere transactie uit en slaat deze op. Bovendien kost proof-of-stake-consensus ook tijd.
- **Netwerkcongestie**: als één dapp te veel rekenkracht gebruikt, wordt het hele netwerk geback-upt. Op dit moment kan het netwerk slechts 10-15 transacties per seconde verwerken. Als transacties sneller worden verzonden dan dit, kan de pool van onbevestigde transacties snel oplopen.
- **Gebruikerservaring**: het kan moeilijker zijn om gebruiksvriendelijke ervaringen te ontwikkelen omdat de gemiddelde eindgebruiker het misschien te moeilijk vindt om een toolstack in te stellen die nodig is om op een volledig veilige manier te interageren met de blockchain.
- **Centralisatie**: gebruikers- en ontwikkelaarsvriendelijke oplossingen die bovenop de basislaag van Ethereum worden gebouwd, kunnen uiteindelijk toch op gecentraliseerde diensten gaan lijken. Dergelijke diensten kunnen bijvoorbeeld sleutels of andere gevoelige informatie aan de serverkant opslaan, een frontend bedienen met behulp van een gecentraliseerde server of belangrijke bedrijfslogica uitvoeren op een gecentraliseerde server voordat deze naar de blockchain wordt geschreven. Centralisatie elimineert veel (zo niet alle) voordelen van de blockchain ten opzichte van het traditionele model.

## Leer je liever visueel? {#visual-learner}

<YouTube id="F50OrwV6Uk8" />

## Tools voor het aanmaken van dapps {#dapp-tools}

**Scaffold-ETH: _Experimenteer snel met Solidity, met een frontend die zich aanpast aan uw smart contract_**

- [Github](https://github.com/scaffold-eth/scaffold-eth-2)
- [Voorbeeld dapp](https://punkwallet.io/)

**Eth-app aanmaken: _Creëer apps die werken via Ethereum met één commando._**

- [Github](https://github.com/paulrberg/create-eth-app)

**One Click Dapp: _FOSS-tool voor het genereren van dapp-frontends vanuit een [ABI](/glossary/#abi)._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [Github](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow: _FOSS-tool voor Ethereum-ontwikkelaars om hun node te testen en RPC-oproepen samen te stellen en te debuggen vanuit de browser._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [Github](https://github.com/abunsen/etherflow)

**thirdweb: _SDK's in elke taal, smart contracts, tools en infrastructuur voor web3-ontwikkeling._**

- [Homepage](https://thirdweb.com/)
- [Documentatie](https://portal.thirdweb.com/)
- [Github](https://github.com/thirdweb-dev/)

**Crossmint: _Ontwikkelingsplatform voor web3 op bedrijfsniveau om smart contracts te implementeren, creditcard- en cross chain-betalingen mogelijk te maken en API's te gebruiken om NFT's te creëren, verdelen, verkopen, op te slaan en te bewerken._**

- [crossmint.com](https://www.crossmint.com)
- [Documentatie](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## Verder lezen {#further-reading}

- [Verken dapps](/dapps)
- [De architectuur van een Web 3.0-applicatie](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
- [Een gids voor gedecentraliseerde toepassingen in 2021](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) - _LimeChain_
- [Wat zijn gedecentraliseerde apps?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) - _Gemini_
- [Populaire dapps](https://www.alchemy.com/dapps) - _Alchemy_

_Weet je van een community resource die je heeft geholpen? Bewerk deze pagina en voeg het toe!_

## Verwante onderwerpen {#related-topics}

- [Een introductie tot de Ethereum stack](/developers/docs/ethereum-stack/)
- [Ontwikkelingskaders](/developers/docs/frameworks/)
