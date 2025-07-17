---
title: Single-slot finaliteit
description: Uitleg over single-slot finaliteit
lang: nl
---

# Single-slot finaliteit {#single-slot-finality}

Het duurt ongeveer 15 minuten voordat een Ethereumblock is gefinaliseerd. We kunnen het consensusmechanisme van Ethereum echter efficiënter blocks laten valideren en de tijd tot finaliteit drastisch verlagen. In plaats van vijftien minuten te wachten, konden blocks in hetzelfde slot worden voorgesteld en gefinaliseerd. Dit concept staat bekend als **single-slot finaliteit (SSF)**.

## Wat is finaliteit? {#what-is-finality}

In het op proof-of-stake gebaseerde consensusmechanisme van Ethereum verwijst finaliteit naar de garantie dat een block niet kan worden gewijzigd of verwijderd van de blockchain zonder ten minste 33% van het totaal gestakete ETH te verbranden. Dit is “crypto-economische” beveiliging omdat het vertrouwen voortkomt uit de extreem hoge kosten die gepaard gaan met het veranderen van de volgorde of inhoud van de chain, waardoor elke rationele economische actor het niet zou proberen.

## Waarom streven naar snellere finaliteit? {#why-aim-for-quicker-finality}

De huidige tijd tot finaliteit blijkt te lang te zijn. De meeste gebruikers willen geen 15 minuten wachten op hun finaliteit, en het is onhandig voor apps en crypto-uitwisselingen die een hoge verwerkingscapaciteit van transacties willen, om zo lang te moeten wachten om er zeker van te zijn dat hun transacties permanent zijn. Een vertraging tussen het voorstel van een block en de finalisatie creëert ook een mogelijkheid voor korte reorgs die een aanvaller zou kunnen gebruiken om bepaalde blocks te censureren of MEV te extraheren. Het mechanisme dat zich bezighoudt met het upgraden van blocks in fases is ook behoorlijk complex en is meerdere keren gepatcht om beveiligingsproblemen op te lossen, waardoor het een van de delen van de Ethereum-codebase is waar subtiele bugs meer kans hebben om te ontstaan. Deze problemen kunnen allemaal worden opgelost door de tijd tot finaliteit terug te brengen tot één slot.

## De afweging decentralisatie / tijd / overhead {#the-decentralization-time-overhead-tradeoff}

De finaliteitsgarantie is geen onmiddellijke eigenschap van een nieuw block. Het kost tijd om een nieuwe block te finaliseren. De reden hiervoor is dat validators die ten minste 2/3 van de totale gestakete ETH op het netwerk vertegenwoordigen, voor de block moeten stemmen (“attesteren”) om het als gefinaliseerd te kunnen beschouwen. Elke validerende node op het netwerk moet bevestigingen van andere nodes verwerken om te weten of een block die drempel van 2/3 al dan niet heeft gehaald.

Hoe korter de tijd die nodig is om tot finalisatie te komen, hoe meer rekenkracht er nodig is op elke node omdat de verwerking van de bevestiging sneller moet gebeuren. Hoe meer validerende nodes er op het netwerk aanwezig zijn, hoe meer bevestigingen er voor elke block verwerkt moeten worden, waardoor ook de benodigde verwerkingskracht toeneemt. Hoe meer verwerkingskracht nodig is, hoe minder mensen kunnen deelnemen omdat er duurdere hardware nodig is om elke validerende node te laten werken. Door de tijd tussen de blocks te verlengen, wordt de benodigde rekenkracht op elke node verminderd, maar wordt ook de tijd tot finaliteit verlengd, omdat bevestigingen langzamer worden verwerkt.

Daarom is er een afweging tussen de overhead (rekenkracht), decentralisatie (aantal nodes dat kan deelnemen aan het valideren van de chain) en de tijd tot finaliteit. Het ideale systeem is een balans tussen minimale rekenkracht, maximale decentralisatie en minimale tijd tot finaliteit.

Het huidige consensusmechanisme van Ethereum heeft deze drie parameters in evenwicht gebracht door:

- **De minimale stake in te stellen op 32 ETH**. Dit stelt een bovengrens aan het aantal bevestigingen van validators dat verwerkt moet worden door individuele nodes, en dus een bovengrens aan de rekenkundige vereisten voor elke node.
- **De tijd tot finaliteit instellen op ~15 minuten**. Dit geeft validators die op normale thuiscomputers werken voldoende tijd om bevestigingen voor elke block veilig te verwerken.

Met het huidige mechanisme-ontwerp is het nodig om het aantal validators op het netwerk te verminderen of de hardwarevereisten voor elke node te verhogen om de tijd tot finaliteit te verminderen. Er kunnen echter verbeteringen worden aangebracht in de manier waarop bevestigingen worden verwerkt, waardoor meer attestaties kunnen worden geteld zonder dat de overhead op elke node toeneemt. Door de efficiëntere verwerking kan de finaliteit binnen één slot worden bepaald, in plaats van over twee epochs.

## Routes naar SSF {#routes-to-ssf}

<ExpandableCard title= "Waarom kunnen we vandaag geen SSF hebben?" eventCategory="/roadmap/single-slot-finality" eventName="clicked Why can't we hear SSF today?">

Het huidige consensusmechanisme combineert bevestigingen van verschillende validators, bekend als comités, om het aantal berichten te verminderen dat elke validator moet verwerken om een block te valideren. Elke validator heeft een kans om te attesteren in elke epoch (32 slots), maar in elke slot attesteert alleen een subset van validators, bekend als een "comité". Dit doen ze door zich op te delen in subnetten waarin een paar validators worden geselecteerd om "aggregators" te zijn. Deze aggregators combineren alle handtekeningen die ze te zien krijgen van andere validators in hun subnet in een enkele geaggregeerde handtekening. De aggregator met het grootste aantal individuele bijdragen geeft zijn/haar geaggregeerde handtekening door aan de voorsteller van de block, die deze in de block opneemt samen met de geaggregeerde handtekening van de andere comités.

Dit proces biedt voldoende capaciteit voor elke validator om in elke epoch te stemmen, want "32 slots * 64 comités * 256 validators per comité = 524.288 validators per epoch". Op het moment van schrijven (februari 2023) zijn er ~513.000 actieve validators.

In dit schema is het alleen mogelijk voor elke validator om op een block te stemmen door hun bevestigingen over de gehele epoch te verdelen. Er zijn echter mogelijk manieren om het mechanisme te verbeteren, zodat elke validator de kans krijgt om in elk slot te attesteren.
</ExpandableCard>

Sinds het consensusmechanisme van Ethereum is ontworpen, is gebleken dat het handtekeningenaggregatieschema (BLS) veel schaalbaarder is dan aanvankelijk werd gedacht, terwijl het vermogen van clients om handtekeningen te verwerken en te verifiëren ook is verbeterd. Het blijkt dat het verwerken van bevestigingen van een enorm aantal validators daadwerkelijk mogelijk is binnen een enkele slot. Bijvoorbeeld, met een miljoen validators die elk twee keer stemmen in elke slot, en slottijden aangepast tot 16 seconden, zouden nodes handtekeningen moeten verifiëren met een minimumsnelheid van 125.000 aggregaties per seconde om alle 1 miljoen bevestigingen binnen het slot te verwerken. In werkelijkheid doet een normale computer er ongeveer 500 nanoseconden over om één handtekening te verifiëren, wat betekent dat 125.000 in ~62,5 ms kunnen worden uitgevoerd. Dit is dus ver onder de drempel van één seconde.

De efficiëntie zou nog verder kunnen worden bevorderd door supercomités op te richten van bijvoorbeeld 125.000 willekeurig gekozen validators per slot. Enkel deze validators mogen stemmen over een block en daarom beslist enkel deze subset van validators of een block wordt gefinaliseerd. Of dit een goed idee is of niet, hangt af van hoe duur de gemeenschap een succesvolle aanval op Ethereum zou willen maken. Dit komt doordat een aanvaller, in plaats van 2/3 van het totaal gestakete ether nodig te hebben, een oneerlijke block zou kunnen finaliseren met 2/3 van het gestakete ether _in dat supercomité_. Dit wordt nog steeds actief onderzocht, maar het lijkt aannemelijk dat voor een validatorverzameling die groot genoeg is om überhaupt supercomités nodig te hebben, de kosten om één van die subcomités aan te vallen extreem hoog zullen zijn (de aanvalskosten uitgedrukt in ETH zouden dan bijvoorbeeld `2/3 * 125.000 * 32 = ~2,6 miljoen ETH`) zijn. De aanvalskosten kunnen worden aangepast door de grootte van de validatorset te vergroten (stem bijvoorbeeld de grootte van de validator af zodat de aanvalskosten gelijk zijn aan 1 miljoen ether, 4 miljoen ether, 10 miljoen ether, enzovoort). [Voorlopige peilingen](https://youtu.be/ojBgyFl6-v4?t=755) van de gemeenschap lijken aan te geven dat 1-2 miljoen ether een acceptabele aanvalskost is, wat neerkomt op ~65.536 - 97.152 validators per supercomité.

Verificatie is echter niet het echte probleem. Het is de aggregatie van handtekeningen die een echte uitdaging vormt voor validatornodes. Om handtekeningaggregatie op te schalen, zal waarschijnlijk het aantal validators in elk subnet moeten worden verhoogd, het aantal subnetten moeten worden verhoogd of extra aggregatielagen moeten worden toegevoegd (d.w.z. comités van comités implementeren). Een deel van de oplossing kan eventueel bestaan uit het toestaan van gespecialiseerde aggregators. Dit is vergelijkbaar met hoe het bouwen van blocks en het genereren van verbintenissen voor rollupgegevens zal worden uitbesteed aan gespecialiseerde blockbouwers onder de scheiding van voorstellers en bouwers (Proposer-Builder Separation, PBS) en Danksharding.

## Wat is de rol van de forkkeuzeregel in SSF? {#role-of-the-fork-choice-rule}

Het consensusmechanisme van vandaag berust op een nauwe koppeling tussen de finaliteitsgadget (het algoritme dat bepaalt of 2/3 van de validators een bepaalde chain heeft geattesteerd) en de forkkeuzeregel (het algoritme dat beslist welke chain de juiste is als er verschillende opties zijn). Het forkkeuze-algoritme houdt alleen rekening met blocks _sinds_ de laatste gefinaliseerde block. Onder SSF zijn er geen blocks waar de “forkkeuze”-regel rekening mee moet houden, omdat finaliteit plaatsvindt in hetzelfde slot als waarin de block wordt voorgesteld. Dit betekent dat onder SSF _of_ het forkkeuze-algoritme _of_ het finaliteitsgadget op elk moment actief is. De finaliteitsgadget finaliseert blocks waarbij 2/3 van de validators online waren en eerlijk attesteerden. Als een block niet in staat is om de 2/3-drempel te overschrijden, dan zal de “forkkeuze”-regel in werking treden om te bepalen welke chain gevolgd moet worden. Dit creëert ook een mogelijkheid om het inactiviteitslekmechanisme te behouden dat een chain herstelt waar >1/3 validators offline gaan, zij het met enkele extra nuances.

## Onopgeloste problemen {#outstanding-issues}

Het probleem met het opschalen van aggregatie door het aantal validators per subnet te verhogen is dat het leidt tot een grotere belasting van het peer-to-peernetwerk. Het probleem met het toevoegen van aggregatielagen is dat het vrij complex is om te ontwikkelen en dat het vertraging veroorzaakt (d.w.z. het kan langer duren voordat de voorsteller van de block iets hoort van alle subnetaggregators). Het is ook niet duidelijk hoe om te gaan met het scenario dat er meer actieve validators op het netwerk aanwezig zijn dan er per slot verwerkt kunnen worden, zelfs met BLS-handtekeningaggregatie. Een mogelijke oplossing is dat, omdat alle validators attesteren in elk slot en er geen comités zijn onder SSF, de limiet van 32 ETH op het effectieve saldo volledig kan worden verwijderd, wat betekent dat operators die meerdere validators beheren hun stake kunnen consolideren en er minder kunnen uitvoeren, waardoor het aantal berichten dat validerende nodes moeten verwerken om rekening te houden met de volledige validatorset, vermindert. Dit is afhankelijk van grote stakers die ermee instemmen hun validators te consolideren. Het is ook mogelijk om een vast maximum op te leggen aan het aantal validators of de hoeveelheid gestakete ETH op elk moment. Dit vereist echter een mechanisme om te beslissen welke validators mogen deelnemen en welke niet, wat ongewenste neveneffecten kan veroorzaken.

## Huidige vooruitgang {#current-progress}

SSF bevindt zich in de onderzoeksfase. De verwachting is dat dit pas over enkele jaren beschikbaar wordt, waarschijnlijk na andere substantiële upgrades zoals [Verkle Trees](/roadmap/verkle-trees/) en [Danksharding](/roadmap/danksharding/).

## Verder lezen {#further-reading}

- [Vitalik over SSF op EDCON 2022](https://www.youtube.com/watch?v=nPgUKNPWXNI)
- [Vitalik's opmerkingen: trajecten naar single slot-finaliteit](https://notes.ethereum.org/@vbuterin/single_slot_finality)
