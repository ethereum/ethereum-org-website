---
title: Zero-knowledge proofs
description: Een niet-technische inleiding tot zero-knowledge bewijzen voor beginners.
lang: nl
---

# Wat zijn zero-knowledge bewijzen? {#what-are-zk-proofs}

Een zero-knowledge bewijs is een manier om de geldigheid van een bewering te bewijzen zonder de bewering zelf te onthullen. De 'bewijzer' is de partij die een claim probeert te bewijzen, terwijl de 'verificateur' verantwoordelijk is voor het valideren van de claim.

Zero-knowledge bewijzen verschenen voor het eerst in een artikel uit 1985, “[The knowledge complexity of interactive proof systems](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)” dat een definitie geeft van zero-knowledge bewijzen die vandaag de dag veel gebruikt wordt:

> Een zero-knowledge protocol is een methode waarbij de ene partij (de bewijzer) **kan bewijzen** aan de andere partij (de verificateur) **dat iets waar is, zonder dat er informatie hoeft te worden prijsgegeven** behalve het feit dat deze specifieke bewering waar is.

Zero-knowledge bewijzen zijn in de loop der jaren verbeterd en worden nu gebruikt in verschillende toepassingen.

<YouTube id="fOGdb1CTu5c" />

## Waarom hebben we zero-knowledge bewijzen nodig? {#why-zero-knowledge-proofs-are-important}

Zero-knowledge bewijzen vertegenwoordigden een doorbraak in toegepaste cryptografie, omdat ze de beveiliging van informatie voor personen beloofden te verbeteren. Bedenk zelf hoe je een claim (bijv. "Ik ben staatsburger van X land") zou kunnen bewijzen aan een andere partij (bijv. een dienstverlener). Je zou "bewijs" moeten leveren om je claim te ondersteunen, zoals je paspoort of rijbewijs.

Maar er zijn problemen met deze aanpak, vooral het gebrek aan privacy. Persoonlijk Identificeerbare Informatie (PII) die wordt gedeeld met derden wordt opgeslagen in centrale databases, die gevoelig zijn voor hacks. Nu identiteitsdiefstal een kritiek probleem aan het worden is, stijgt de vraag naar meer privacybeschermende manieren om gevoelige informatie te delen.

Zero-knowledge bewijzen lossen dit probleem op door **de noodzaak voor het onthullen van informatie om de geldigheid van beweringen te bewijzen, weg te nemen**. Het zero-knowledge protocol gebruikt de bewering ('getuige' genoemd) als invoer om een beknopt bewijs van de geldigheid te genereren. Dit bewijs biedt sterke garanties dat een bewering waar is zonder de informatie bloot te leggen die gebruikt is om de bewering te maken.

Om terug te komen op ons eerdere voorbeeld: het enige bewijs dat je nodig hebt om je burgerschapsclaim te bewijzen is een zero-knowledge bewijs. De verificateur hoeft alleen maar te controleren of bepaalde eigenschappen van het bewijs waar zijn, om ervan overtuigd te zijn dat de onderliggende verklaring ook waar is.

## Toepassingsscenario's voor zero-knowledge bewijzen {#use-cases-for-zero-knowledge-proofs}

### Anonieme betalingen {#anonymous-payments}

Creditcardbetalingen zijn vaak zichtbaar voor meerdere partijen, waaronder de betalingsprovider, banken en andere belanghebbenden (bijvoorbeeld overheidsinstanties). Hoewel financieel toezicht voordelen heeft voor het identificeren van illegale activiteiten, ondermijnt het ook de privacy van gewone burgers.

Cryptovaluta's waren bedoeld als een middel voor gebruikers om privé-transacties uit te voeren. Maar de meeste cryptovalutatransacties zijn openlijk zichtbaar op openbare blockchains. Gebruikersidentiteiten zijn vaak pseudoniem en ofwel opzettelijk gekoppeld aan echte identiteiten (bijv. door ETH-adressen op te nemen op Twitter- of GitHub-profielen) of kunnen worden gekoppeld aan echte identiteiten met behulp van eenvoudige on- en off-chain gegevensanalyse.

Er zijn specifieke "privacymunten" ontworpen voor volledig anonieme transacties. Op privacy gerichte blockchains, zoals Zcash en Monero, schermen transactiedetails af, inclusief adressen van verzender/ontvanger, het type activa, de hoeveelheid en de tijdlijn van de transactie.

Door zero-knowledge technologie in het protocol te integreren, zorgen privacygerichte [blockchain](/glossary/#blockchain)-netwerken ervoor dat [nodes](/glossary/#node) transacties kunnen valideren zonder dat ze toegang hoeven te hebben tot transactiegegevens.

**Zero-knowledge bewijzen worden ook toegepast op het anonimiseren van transacties op openbare blockchains**. Een voorbeeld is Tornado Cash, een gedecentraliseerde, niet-custodiale dienst waarmee gebruikers privé-transacties op Ethereum kunnen uitvoeren. Tornado Cash maakt gebruik van zero-knowledge bewijzen om transactiegegevens te verdoezelen en financiële privacy te garanderen. Helaas worden deze "opt-in" privacytools geassocieerd met illegale activiteiten. Om dit te overstijgen moet privacy uiteindelijk de standaard worden op publieke blockchains.

### Identiteitsbescherming {#identity-protection}

De huidige identiteitsbeheersystemen brengen persoonlijke informatie in gevaar. Zero-knowledge bewijzen kunnen mensen helpen om hun identiteit te valideren en tegelijkertijd gevoelige gegevens te beschermen.

Nul-kennis bewijzen zijn vooral nuttig in de context van [gedecentraliseerde identiteit](/decentrale-identiteit/). Gedecentraliseerde identiteit (ook wel bekend als 'zelfsoevereine identiteity') geeft hde persoon de mogelijkheid om de toegang tot persoonlijke informatie te controleren. Je staatsburgerschap bewijzen zonder je paspoortgegevens te onthullen is een goed voorbeeld van hoe zero-knowledge technologie gedecentraliseerde identiteit mogelijk maakt.

### Authenticatie {#authentication}

Voor het gebruik van online diensten moet je je identiteit en recht op toegang tot deze platforms bewijzen. Hiervoor is vaak persoonlijke informatie nodig, zoals namen, e-mailadressen, geboortedatums, enzovoort. Het kan ook zijn dat je lange wachtwoorden moet onthouden, anders loop je het risico de toegang te verliezen.

Zero-knowledge bewijzen kunnen authenticatie vereenvoudigen voor zowel platforms als gebruikers. Zodra een ZK-bewijs is gegenereerd met behulp van openbare invoer (bijv. gegevens die het lidmaatschap van de gebruiker van het platform bevestigen) en privé-invoer (bijv. de gegevens van de gebruiker), kan de gebruiker het bewijs eenvoudig tonen om zijn identiteit te verifiëren wanneer hij toegang tot de service nodig heeft. Dit verbetert de gebruikerservaring en zorgt ervoor dat organisaties niet langer grote hoeveelheden gebruikersinformatie hoeven op te slaan.

### Verifieerbare berekeningen {#verifiable-computation}

Verifieerbare berekening is een andere toepassing van zero-knowledge technologie voor het verbeteren van blockchain-ontwerpen. Met verifieerbaar computergebruik kunnen we berekeningen uitbesteden aan een andere entiteit, terwijl we toch verifieerbare resultaten behouden. De entiteit levert het resultaat aan, samen met een bewijs dat het programma correct is uitgevoerd.

Verifieerbare berekeningen zijn **cruciaal voor het verbeteren van de verwerkingssnelheid op blockchains** zonder de veiligheid te verminderen. Om dit te begrijpen, moet je de verschillen kennen in de voorgestelde oplossingen voor het schalen van Ethereum.

[On-chain schaaloplossingen](/developers/docs/scaling/#on-chain-scaling), zoals sharding, vereisen uitgebreide aanpassingen van de basislaag van de blockchain. Deze aanpak is echter zeer complex en fouten in de implementatie kunnen het beveiligingsmodel van Ethereum ondermijnen.

[Off-chain schaaloplossingen](/developers/docs/scaling/#off-chain-scaling) vereisen geen herontwerp van het kernprotocol van Ethereum. In plaats daarvan vertrouwen ze op een uitbesteed rekenmodel om de doorvoer op de basislaag van Ethereum te verbeteren.

Dit is hoe het in de praktijk werkt:

- In plaats van elke transactie te verwerken, delegeert Ethereum de uitvoering naar een aparte chain.

- Na het verwerken van transacties, stuurt de andere chain de resultaten terug om toegepast te worden op de status van Ethereum.

Het voordeel hiervan is dat Ethereum geen uitvoering hoeft te doen en alleen resultaten van uitbestede berekeningen hoeft toe te passen op zijn eigen status. Dit vermindert de netwerkcongestie en verbetert bovendien de transactiesnelheid (off-chain protocollen zijn geoptimaliseerd voor snellere uitvoering).

De chain moet een manier hebben om off-chain transacties te valideren zonder ze opnieuw uit te voeren. Anders gaat de waarde van off-chain uitvoering verloren.

Dit is waar verifieerbare berekeningen om de hoek komen kijken. Wanneer een node een transactie buiten Ethereum uitvoert, dient het een zero-knowledge bewijs in om de juistheid van off-chain uitvoering te bewijzen. Dit bewijs (ook wel [geldigheidsbewijs](/glossary/#validity-proof) genoemd) garandeert dat een transactie geldig is, waardoor Ethereum het resultaat kan toepassen op zijn status zonder te wachten tot iemand het betwist.

[Zero-knowledge rollups](/developers/docs/scaling/zk-rollups) en [validiums](/developers/docs/scaling/validium/) zijn twee off-chain schaaloplossingen die gebruik maken van geldigheidsbewijzen om veilige schaalbaarheid te bieden. Deze protocollen voeren duizenden transacties off-chain uit en leveren bewijzen ter verificatie op Ethereum. Deze resultaten kunnen direct worden toegepast zodra het bewijs is geverifieerd, waardoor Ethereum meer transacties kan verwerken zonder dat de berekeningen op de basislaag worden verhoogd.

### Verminderen van omkoping en samenzwering bij on-chain stemmen {#secure-blockchain-voting}

Blockchain-stemsystemen hebben veel gunstige eigenschappen: ze zijn volledig controleerbaar, veilig tegen aanvallen, bestand tegen censuur en vrij van geografische beperkingen. Maar zelfs on-chain stemsystemen zijn niet immuun tegen **samenspanning**.

Gedefinieerd als "coördineren om open concurrentie te beperken door anderen te bedriegen, op te lichten en te misleiden," kan samenspanning de vorm aannemen van een kwaadwillende actor die de stemming beïnvloedt door smeergeld aan te bieden. Alice kan bijvoorbeeld worden omgekocht door Bob om op `optie B` te stemmen, zelfs als ze de voorkeur geeft aan `optie A`.

Omkoping en collusie beperken de effectiviteit van elk proces waarbij stemmen als signaalmechanisme wordt gebruikt (vooral wanneer gebruikers kunnen bewijzen hoe ze hebben gestemd). Dit kan grote gevolgen hebben, vooral als de stemmen bepalend zijn voor de toewijzing van schaarse middelen.

Zo zijn [kwadratische financieringsmechanismen](https://www.radicalxchange.org/concepts/plural-funding/) afhankelijk van donaties om de voorkeur voor bepaalde opties tussen verschillende publieke projecten te meten. Elke donatie telt als een 'stem' voor een specifiek project. Projecten die meer stemmen krijgen, krijgen meer geld uit de overeenkomende pool.

Door on-chain voting te gebruiken wordt kwadratische financiering vatbaar voor samenspanning: blockchaintransacties zijn openbaar, dus omkopers kunnen de on-chain-activiteit van een omkoper inspecteren om te zien hoe hij of zij heeft ‘gestemd’. Op deze manier is kwadratische financiering niet langer een effectief middel voor het toewijzen van fondsen op basis van de gezamenlijke voorkeuren van de gemeenschap.

Gelukkig maken nieuwere oplossingen zoals MACI (Minimum Anti-Collusion Infrastructure) gebruik van zero-knowledge bewijzen om on-chain stemmen (bijv. kwadratische financieringsmechanismen) bestand te maken tegen omkoping en samenspanning. MACI is een set slimme contracten en scripts waarmee een centrale beheerder (een zogenaamde "coördinator") stemmen kan samenvoegen en de resultaten kan tellen _zonder_ dat er details hoeven te worden prijsgegeven over hoe elke individuele persoon heeft gestemd. Toch is het nog steeds mogelijk om te verifiëren of de stemmen correct zijn geteld, of om te bevestigen dat een bepaalde persoon heeft deelgenomen aan de stemronde.

#### Hoe werkt MACI met zero-knowledge bewijzen? {#how-maci-works-with-zk-proofs}

Bij de start implementeert de coördinator het MACI-contract op Ethereum, waarna gebruikers zich kunnen aanmelden om te stemmen (door hun publieke sleutel te registreren in het slimme contract). Gebruikers brengen hun stem uit door berichten te versturen die zijn versleuteld met hun openbare sleutel naar het slimme contract (een geldige stem moet onder andere zijn ondertekend met de meest recente openbare sleutel die is gekoppeld aan de identiteit van de gebruiker). Nadat de stemperiode is afgelopen, verwerkt de coördinator alle berichten, telt de stemmen en verifieert de resultaten on-chain.

Bij MACI worden zero-knowledge bewijzen gebruikt om de juistheid van de berekening te garanderen. Dit wordt gedaan door het voor de coördinator onmogelijk te maken om stemmen en tellingen onjuist te verwerken. Dit wordt bereikt door van de coördinator te eisen dat hij ZK-SNARK-bewijzen genereert die verifiëren dat a) alle berichten correct zijn verwerkt en b) het uiteindelijke resultaat overeenkomt met de som van alle _geldige_ stemmen.

Zelfs zonder een overzicht van de stemmen per gebruiker te delen (zoals normaal gesproken het geval is), garandeert MACI de integriteit van de resultaten die tijdens het tellen zijn berekend. Deze functie is nuttig om de effectiviteit van fundamentele samenspanningslisten te verminderen. We kunnen deze mogelijkheid onderzoeken door het vorige voorbeeld te gebruiken, waarin Bob Alice omkoopt om voor een optie te stemmen:

- Alice registreert zich om te stemmen door haar publieke sleutel naar een slim contract te sturen.
- Alice stemt ermee in om voor `optie B` te stemmen in ruil voor een steekpenning van Bob.
- Alice stemt op `optie B`.
- Alice verstuurt in het geheim een ​​gecodeerde transactie om de openbare sleutel die aan haar identiteit is gekoppeld, te wijzigen.
- Alice stuurt een ander (gecodeerd) bericht naar het slimme contract en stemt voor `optie A` met behulp van de nieuwe openbare sleutel.
- Alice laat Bob een transactie zien waaruit blijkt dat ze heeft gestemd voor `optie B` (wat ongeldig is omdat de openbare sleutel niet langer is gekoppeld aan de identiteit van Alice in het systeem)
- Tijdens het verwerken van berichten slaat de coördinator de stem van Alice voor `optie B` over en telt alleen de stem voor `optie A`. Daarom mislukt Bobs poging om samen te werken met Alice en de on-chain stemming te manipuleren.

Om MACI te kunnen gebruiken, _moet_ je erop vertrouwen dat de coördinator niet samenwerkt met omkopers of zelf probeert kiezers om te kopen. De coördinator kan gebruikersberichten (noodzakelijk voor het maken van het bewijs) decoderen, zodat hij/zij nauwkeurig kan verifiëren hoe elke persoon heeft gestemd.

Maar in gevallen waarin de coördinator eerlijk blijft, is MACI een krachtig instrument om de onschendbaarheid van on-chain stemmen te garanderen. Dit verklaart de populariteit ervan bij kwadratische financieringsaanvragen (bijv. [clr.fund](https://clr.fund/#/about/maci)), die sterk afhankelijk zijn van de integriteit van de stemkeuzes van elke individuele persoon.

[Meer informatie over MACI](https://privacy-scaling-explorations.github.io/maci/).

## Hoe werken zero-knowledge bewijzen? {#how-do-zero-knowledge-proofs-work}

Met een zero-knowledge bewijs kun je de waarheid van een bewering bewijzen zonder de inhoud van de bewering te delen of te onthullen hoe je de waarheid hebt ontdekt. Om dit mogelijk te maken, vertrouwen zero-knowledge protocollen op algoritmes die bepaalde gegevens als invoer nemen en 'true' (waar) of 'false' (onwaar) als uitvoer teruggeven.

Een zero-knowledge protocol moet aan de volgende criteria voldoen:

1. **Volledigheid**: als de invoer geldig is, retourneert het zero-knowledge protocol altijd 'true'. Dus als de onderliggende bewering waar is en de bewijzer en verificateur eerlijk handelen, kan het bewijs geaccepteerd worden.

2. **Degelijkheid**: als de invoer ongeldig is, is het theoretisch onmogelijk om het zero-knowledge protocol te misleiden om 'true' te retourneren. Daarom kan een liegende bewijzer een eerlijke verificateur niet laten geloven dat een ongeldige bewering geldig is (behalve met een kleine waarschijnlijkheidsmarge).

3. **Zero-knowledge**: de verificateur komt niets te weten over een bewering, behalve de geldigheid of ongeldigheid ervan (hij heeft "zero-knowledge" over de bewering). Deze eis voorkomt ook dat de verificateur de originele invoer (de inhoud van de bewering) kan afleiden uit het bewijs.

In basisvorm bestaat een zero-knowledge bewijs uit drie elementen: **getuige**, **uitdaging** en **antwoord**.

- **Getuige**: met een zero-knowledge bewijs wil de bewijzer kennis van verborgen informatie aantonen. De geheime informatie is de ‘getuige’ van het bewijs, en de veronderstelde kennis van de bewijzer over de getuige, stelt een reeks vragen vast die alleen beantwoord kunnen worden door een partij die kennis heeft van de informatie. De bewijzer start het bewijsproces daarom door willekeurig een vraag te kiezen, het antwoord te berekenen en dit naar de verificateur te sturen.

- **Uitdaging**: de verificateur kiest willekeurig een andere vraag uit de verzameling en vraagt de bewijzer deze te beantwoorden.

- **Antwoord**: de bewijzer accepteert de vraag, berekent het antwoord en stuurt het terug naar de verificateur. Het antwoord van de bewijzer stelt de verificateur in staat om te controleren of de bewijzer echt toegang heeft tot de getuige. Om er zeker van te zijn dat de bewijzer niet blind gokt en per ongeluk de juiste antwoorden krijgt, kiest de verificateur meer vragen om te stellen. Door deze interactie vele malen te herhalen, daalt de kans dat de bewijzer de kennis van de getuige vervalst, dit wordt gedaan totdat de verificateur tevreden is.

Het bovenstaande beschrijft de structuur van een 'interactief zero-knowledge bewijs'. Vroege zero-knowledge protocollen maakten gebruik van interactieve bewijzen, waarbij het verifiëren van de geldigheid van een bewering heen-en-weer communicatie vereiste tussen bewijzers en verificateurs.

Een goed voorbeeld dat illustreert hoe interactieve bewijzen werken is het beroemde [Ali Baba grotverhaal](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave) van Jean-Jacques Quisquater. In het verhaal wil Peggy (de bewijzer) aan Victor (de verificateur) bewijzen dat ze de geheime zin kent om een magische deur te openen zonder de zin te onthullen.

### Niet-interactieve zero-knowledge bewijzen {#non-interactive-zero-knowledge-proofs}

Hoewel het revolutionair was, was interactief bewijzen beperkt bruikbaar omdat het vereiste dat de twee partijen beschikbaar waren en herhaaldelijk met elkaar communiceerden. Zelfs als een verificateur overtuigd was van de eerlijkheid van een bewijzer, zou het bewijs niet beschikbaar zijn voor onafhankelijke verificatie (het berekenen van een nieuw bewijs vereist een nieuwe verzameling berichten tussen de bewijzer en de verificateur).

Om dit probleem op te lossen, stelden Manuel Blum, Paul Feldman en Silvio Micali de eerste [niet-interactieve zero-knowledge bewijzen](https://dl.acm.org/doi/10.1145/62212.62222) voor waarbij de bewijzer en verificateur een gedeelde sleutel hebben. Hierdoor kan de bewijzer zijn/haar kennis van bepaalde informatie (d.w.z. getuige) aantonen zonder deze informatie zelf te verstrekken.

In tegenstelling tot interactieve bewijzen, vereisen niet-interactieve bewijzen slechts één communicatieronde tussen de deelnemers (bewijzer en verificateur). De bewijzer geeft de geheime informatie door aan een speciaal algoritme om een zero-knowledge bewijs te berekenen. Dit bewijs wordt naar de verificateur gestuurd, die controleert of de bewijzer de geheime informatie kent met behulp van een ander algoritme.

Niet-interactieve bewijzen verminderen de communicatie tussen bewijzer en verificateur, waardoor ZK-bewijzen efficiënter worden. Bovendien kan iedereen (met toegang tot de gedeelde sleutel en het verificatiealgoritme) een bewijs verifiëren zodra het gegenereerd is.

Niet-interactieve bewijzen vormden een doorbraak voor de zero-knowledge technologie en stimuleerden de ontwikkeling van de bewijssystemen die we vandaag de dag gebruiken. We bespreken deze bewijstypen hieronder:

### Soorten zero-knowledge bewijzen {#types-of-zero-knowledge-proofs}

#### ZK-SNARKs {#zk-snarks}

ZK-SNARK is een acroniem voor **Zero-Knowledge Succinct Non-Interactive Argument of Knowledge**. Het ZK-SNARK-protocol heeft de volgende kwaliteiten:

- **Zero-knowledge**: een verificateur kan de integriteit van een bewering valideren zonder iets anders over de bewering te weten. De enige kennis die de verificateur heeft over de bewering is of deze waar of onwaar is.

- **Beknopt**: het zero-knowledge bewijs is kleiner dan de getuige en kan snel geverifieerd worden.

- **Niet-interactief**: het bewijs is 'niet-interactief', omdat de bewijzer en verificateur maar één keer interactie hebben, in tegenstelling tot interactieve bewijzen die meerdere communicatierondes vereisen.

- **Argument**: het bewijs voldoet aan de eis van 'degelijkheid', dus valsspelen is extreem onwaarschijnlijk.

- **Kennis van**: het zero-knowledge bewijs kan niet worden geconstrueerd zonder toegang tot de geheime informatie (getuige). Het is moeilijk, zo niet onmogelijk, voor een bewijzer die de getuige niet heeft om een geldig zero-knowledge bewijs te berekenen.

De eerder genoemde "gedeelde sleutel" verwijst naar publieke parameters die de bewijzer en verificateur overeenkomen te gebruiken bij het genereren en verifiëren van bewijzen. Het genereren van de publieke parameters (ook bekend als de Common Reference String (CRS)) is een gevoelige bewerking vanwege het belang voor de veiligheid van het protocol. Als de entropie (willekeurigheid) die gebruikt wordt bij het genereren van de CRS in handen komt van een oneerlijke bewijzer, kan deze valse bewijzen berekenen.

[Multi-party computation (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) is een manier om de risico's bij het genereren van openbare parameters te verkleinen. Verschillende partijen nemen deel aan een [vertrouwde instellingsceremonie](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), waar elke persoon enkele willekeurige waarden bijdraagt om de CRS te genereren. Zolang één eerlijke partij zijn deel van de entropie vernietigt, behoudt het ZK-SNARK protocol zijn computationele degelijkheid.

Vertrouwde instellingen vereisen dat gebruikers de deelnemers in de parametergeneratie vertrouwen. De ontwikkeling van ZK-STARK's heeft het echter mogelijk gemaakt om protocollen te bewijzen die werken met een niet-vertrouwde instelling.

#### ZK-STARKs {#zk-starks}

ZK-STARK is een acroniem voor **Zero-Knowledge Scalable Transparent Argument of Knowledge**. ZK-STARK's zijn vergelijkbaar met ZK-SNARK's, behalve dat ze de volgende zijn:

- **Schaalbaar**: ZK-STARK is sneller dan ZK-SNARK in het genereren en verifiëren van bewijzen als de getuige groter is. Bij STARK-bewijzen nemen de tijden van de bewijzer en de verificatie slechts licht toe naarmate de getuige groter wordt (de tijden van de SNARK-bewijzer en -verificateur nemen lineair toe met de omvang van de getuige).

- **Transparant**: ZK-STARK vertrouwt op openbaar verifieerbare willekeur om openbare parameters te genereren voor bewijsvoering en verificatie in plaats van een vertrouwde instelling. Ze zijn daardoor transparanter dan ZK-SNARK's.

ZK-STARK's leveren grotere bewijzen op dan ZK-SNARK's, wat betekent dat ze over het algemeen hogere verificatiekosten met zich meebrengen. Er zijn echter gevallen (zoals het bewijzen van grote datasets) waarin ZK-STARK's kosteneffectiever kunnen zijn dan ZK-SNARK's.

## Nadelen van het gebruik van zero-knowledge bewijzen {#drawbacks-of-using-zero-knowledge-proofs}

### Hardwarekosten {#hardware-costs}

Het genereren van zero-knowledge bewijzen omvat zeer complexe berekeningen die het best uitgevoerd kunnen worden op gespecialiseerde machines. Omdat deze machines duur zijn, liggen ze vaak buiten het bereik van gewone mensen. Bovendien moeten applicaties die zero-knowledge technologie willen gebruiken, rekening houden met hardwarekosten - wat de kosten voor eindgebruikers kan verhogen.

### Bewijsverificatiekosten {#proof-verification-costs}

Het verifiëren van bewijzen vereist ook complexe berekeningen en verhoogt de kosten van het implementeren van zero-knowledge technologie in toepassingen. Deze kosten zijn vooral relevant in de context van het berekeningsvermogen voor bewijzen. ZK-rollups betalen bijvoorbeeld ~ 500.000 gas om één ZK-SNARK-bewijs op Ethereum te verifiëren, met ZK-STARK's die nog hogere kosten met zich meebrengen.

### Veronderstellingen omtrent vertrouwenj {#trust-assumptions}

In ZK-SNARK wordt de Common Reference String (openbare parameters) eenmalig gegenereerd en is deze beschikbaar voor hergebruik door partijen die willen deelnemen aan het zero-knowledge protocol. Openbare parameters worden gecreëerd via een vertrouwde instellingsceremonie, waarbij ervan wordt uitgegaan dat de deelnemers eerlijk zijn.

Maar gebruikers kunnen de eerlijkheid van de deelnemers niet beoordelen en moeten de ontwikkelaars op hun woord geloven. ZK-STARK's zijn vrij van veronderstellingen omtrent vertrouwen, omdat de willekeur die wordt gebruikt bij het genereren van de string openbaar verifieerbaar is. Ondertussen werken onderzoekers aan niet-vertrouwde instellingen voor ZK-SNARK's om de veiligheid van bewijsmechanismen te vergroten.

### Kwantumcomputerbedreigingen {#quantum-computing-threats}

ZK-SNARK maakt gebruik van elliptische kromme-cryptografie voor encryptie. Hoewel we er vooralsnog van uitgaan dat het probleem van het elliptische kromme discrete logaritme probleem (ECDLP) onoplosbaar is, zou de ontwikkeling van quantumcomputers dit beveiligingsmodel in de toekomst kunnen doorbreken.

ZK-STARK wordt als immuun beschouwd voor de dreiging van quantum computing, omdat het voor zijn beveiliging alleen gebruik maakt van botsingsbestendige hashfuncties. In tegenstelling tot publiek-private sleutelparen die gebruikt worden in elliptische kromme cryptografie, is botsingsbestendige hashing moeilijker te breken voor kwantumcomputeralgoritmen.

## Verder lezen {#further-reading}

- [Overview of use cases for zero-knowledge proofs](https://pse.dev/projects) — _Privacy and Scaling Explorations Team_
- [SNARKs vs. STARKS vs. Recursive SNARKs](https://www.alchemy.com/overviews/snarks-vs-starks) — _Alchemy Overviews_
- [A Zero-Knowledge Proof: Improving Privacy on a Blockchain](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) — _Dmitry Lavrenov_
- [zk-SNARKs — A Realistic Zero-Knowledge Example and Deep Dive](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) — _Adam Luciano_
- [ZK-STARKs — Create Verifiable Trust, even against Quantum Computers](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) — _Adam Luciano_
- [An approximate introduction to how zk-SNARKs are possible](https://vitalik.eth.limo/general/2021/01/26/snarks.html) — _Vitalik Buterin_
- [Why Zero Knowledge Proofs (ZKPs) is a Game Changer for Self-Sovereign Identity](https://frankiefab.hashnode.dev/why-zero-knowledge-proofs-zkps-is-a-game-changer-for-self-sovereign-identity) — _Franklin Ohaegbulam_

