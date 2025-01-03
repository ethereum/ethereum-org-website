---
title: De merge
description: 'Ontdek meer over de samenvoeging: toen het hoofdnet Ethereum proof-of-stake ging gebruiken.'
lang: nl
template: upgrade
image: /images/upgrades/merge.png
alt:
summaryPoint1: Het hoofdnet van Ethereum gebruikt proof-of-stake, maar dit was niet altijd het geval.
summaryPoint2: De upgrade van het oorspronkelijke proof-of-workmechanisme naar proof-of-stake werd de samenvoeging genoemd.
summaryPoint3: De samenvoeging verwijst naar het samenvoegen van het originele hoofdnet van Ethereum met een aparte proof-of-stake blockchain die Beacon Chain wordt genoemd, en nu als één chain bestaat.
summaryPoint4: De samenvoeging verminderde het energieverbruik van Ethereum met ~99,95%.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  De samenvoeging werd uitgevoerd op 15 september 2022. Dit voltooide de overgang van Ethereum naar proof-of-stake consensus, waarbij proof-of-work officieel werd afgeschaft en het energieverbruik met ~99,95% werd verminderd.
</UpgradeStatus>

## Wat is de samenvoeging? {#what-is-the-merge}

De samenvoeging was het bij elkaar brengen van de oorspronkelijke uitvoeringslaag van Ethereum (het hoofdnet dat sinds [het ontstaan](/history/#frontier) bestaat) met de nieuwe proof-of-stake consensuslaag, de Beacon Chain. Het elimineerde de noodzaak voor energie-intensieve mining en maakte het in plaats daarvan mogelijk om het netwerk te beveiligen met behulp van staked ETH. Het was echt een geweldige stap in de realisatie van de Ethereum-visie: meer schaalbaarheid, veiligheid en duurzaamheid.

<MergeInfographic />

Aanvankelijk werd de [Beacon Chain](/roadmap/beacon-chain/) niet tegelijkertijd beschikbaar gesteld in combinatie met het [hoofdnet](/glossary/#mainnet). Het Ethereum-hoofdnet met al zijn accounts, balansen, smart contracts en blockchainstatus bleef beveiligd door [proof-of-work](/developers/docs/consensus-mechanisms/pow/), zelfs terwijl de Beacon Chain parallel werd uitgevoerd met [proof-of-stake](/developers/docs/consensus-mechanisms/pos/). Bij de samenvoeging kwamen deze twee systemen eindelijk samen en werd proof-of-work definitief vervangen door proof-of-stake.

Stel u voor dat Ethereum een ruimteschip is dat werd gelanceerd voordat het helemaal klaar was voor een interstellaire reis. Met de Beacon Chain bouwde de gemeenschap een nieuwe motor en een geharde romp. Na veel tests werd het tijd om de oude motor tijdens de vlucht om te wisselen voor de nieuwe. Hierdoor werd de nieuwe, efficiëntere motor samengevoegd in het bestaande schip, waardoor het een flink aantal lichtjaren kon gaan maken en het heelal kon veroveren.

## Samenvoeging met het hoofdnet {#merging-with-mainnet}

Hoofdnet van Ethereum beveiligd met proof-of-work vanaf het ontstaan tot de samenvoeging. Hierdoor kon de Ethereum-blockchain waar we allemaal aan gewend zijn in juli 2015 ontstaan met al zijn bekende functies: transacties, smart contracts, accounts, enz.

Doorheen de geschiedenis van Ethereum hebben ontwikkelaars zich voorbereid op een uiteindelijke overgang van proof-of-work naar proof-of-stake. Op 1 december 2020 werd de Beacon Chain gecreëerd als een aparte blockchain van het hoofdnet, die parallel werd uitgevoerd.

De Beacon Chain verwerkte oorspronkelijk geen hoofdnettransacties. In plaats daarvan bereikte het een consensus over de eigen status door het eens te worden over actieve validators en hun accountsaldi. Na uitgebreid testen werd het tijd voor de Beacon Chain om een consensus te bereiken over gegevens uit de echte wereld. Na de samenvoeging werd de Beacon Chain de consensusmotor voor alle netwerkgegevens, waaronder uitvoeringslaagtransacties en accountsaldi.

De samenvoeging betekende de officiële overstap naar het gebruik van de Beacon Chain als de motor van de blockproductie. Mining is niet langer de manier om geldige blocks te produceren. In plaats daarvan hebben de proof-of-stake validators deze rol overgenomen en zijn nu verantwoordelijk voor het verwerken van de geldigheid van alle transacties en het voorstellen van blocks.

Geen enkele geschiedenis ging verloren tijdens de samenvoeging. Toen het hoofdnet fuseerde met de Beacon Chain, werd ook de hele transactiegeschiedenis van Ethereum samengevoegd.

<InfoBanner>
Deze overgang naar proof-of-stake veranderde de manier waarop ether wordt uitgegeven. Ontdek meer over de <a href="/roadmap/merge/issuance/">ether-uitgifte voor en na de samenvoeging</a>.
</InfoBanner>

### Gebruikers en houders {#users-holders}

**De samenvoeging heeft niets veranderd voor houders/gebruikers.**

_Dit vraagt om herhaling_: als gebruiker of houder van ETH of een andere digitale activa op Ethereum, evenals stakers die werken zonder nodes, **hoeft u niets te doen met uw middelen of wallet om u voor te bereiden op de samenvoeging.** ETH blijft gewoon ETH. Er bestaat niets zoiets als "oude ETH"/"nieuwe ETH" of "ETH1"/"ETH2" en wallets werken exact hetzelfde na de samenvoeging als ervoor. Personen die u iets anders wijsmaken, zijn waarschijnlijk scammers.

Ondanks de afschaffing van proof-of-work, bleef de hele geschiedenis van Ethereum sinds zijn ontstaan intact en onveranderd door de overgang naar proof-of-stake. Alle middelen die vóór de samenvoeging in uw wallet zaten, zijn na de samenvoeging nog steeds toegankelijk. **U hoeft zelf niets te doen voor deze upgrade.**

[Meer over Ethereum-beveiliging](/security/#eth2-token-scam)

### Node-operators en dapp-ontwikkelaars {#node-operators-dapp-developers}

<ExpandableCard
title="Staking node-operators en providers"
contentPreview="If you are a staker running your own node setup or a node infrastructure provider, there are a few things you need to be aware of after The Merge."
id="staking-node-operators">

De belangrijkste actiepunten zijn:

1. Voer zowel een consensusclient als een uitvoeringsclient uit. Eindpunten van derden voor het verkrijgen van uitvoeringsgegevens werken niet meer sinds de samenvoeging.
2. Authenticeer zowel uitvoerings- als consensusclients met een gedeeld JWT-geheim zodat ze veilig kunnen communiceren.
3. Stel een adres in voor de “ontvanger van kosten” om de verdiende transactiefooien/MEV te ontvangen.

Als u de eerste twee items hierboven niet uitvoert, wordt uw node als “offline” beschouwd totdat beide lagen zijn gesynchroniseerd en geverifieerd.

Als u geen “ontvanger van kosten” instelt, zal uw validator zich nog steeds zoals gebruikelijk gedragen, maar u zult niet-verbrande fooien en alle MEV mislopen die u anders zou hebben verdiend in blocks die uw validator voorstelt.
</ExpandableCard>

<ExpandableCard
title="Niet-validerende node-operators en infrastructuur-providers"
contentPreview="If you're operating a non-validating Ethereum node, the most significant change that came with The Merge was the requirement to run clients for BOTH the execution layer AND the consensus layer."
id="node-operators">

Tot aan de samenvoeging was een uitvoeringsclient (zoals Geth, Erigon, Besu of Nethermind) voldoende om blocks die door het netwerk werden gegossiped te ontvangen, op de juiste manier te valideren en te propageren. Na de samenvoeging hangt de geldigheid van transacties in een uitvoeringspayload nu ook af van de geldigheid van het “consensusblock” waarin het is opgenomen.

Als gevolg hiervan heeft een volledige Ethereum-node nu zowel een uitvoeringsclient als een consensusclient nodig. Deze twee clients werken samen via een nieuwe Engine API. De Engine API vraagt om authenticatie met behulp van een JWT-token, die aan beide clients wordt verstrekt om te zorgen voor een veilige communicatie.

De belangrijkste actiepunten zijn:

- Het installeren van een consensusclient naast een uitvoeringsclient
- Het verifiëren van uitvoerings- en consensusclients met een gedeeld JWT-token zodat ze veilig met elkaar kunnen communiceren.

Als u de bovenstaande zaken niet uitvoert, zal uw node "offline" lijken totdat beide lagen zijn gesynchroniseerd en geverifieerd.

</ExpandableCard>

<ExpandableCard
title="Ontwikkelaars van dapp en smart contracts"
contentPreview="The Merge was designed to have minimal impact on smart contract and dapp developers."
id="developers">

De samenvoeging ging gepaard met wijzigingen in de consensus, waaronder ook wijzigingen met betrekking tot:<

<ul>
  <li>blockstructuur</li>
  <li>timing slot/block</li>
  <li>opcode-wijzigingen</li>
  <li>bronnen van on-chain willekeurigheid</li>
  <li>concept van <em>safe head</em> en <em>gefinaliseerde blocks</em></li>
</ul>

Lees voor meer informatie deze blogpost van Tim Beiko over <a href="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer/">Hoe de samenvoeging Ethereum's applicatielaag beïnvloedt</a>.

</ExpandableCard>

## De samenvoeging en energieverbruik {#merge-and-energy}

De samenvoeging betekende het einde van proof-of-work voor Ethereum en luidde het tijdperk in van een duurzamer, milieuvriendelijker Ethereum. Het energieverbruik van Ethereum daalde met naar schatting 99,95%, waardoor Ethereum een groene blockchain is geworden. Ontdek meer over [het energieverbruik van Ethereum](/energy-consumption/).

## De samenvoeging en opschaling {#merge-and-scaling}

De samenvoeging heeft ook de weg vrijgemaakt voor verdere opschalingsupgrades die niet mogelijk waren onder proof-of-work, en brengt Ethereum een stap dichter bij het bereiken van zijn volledige schaalbaarheid, veiligheid en duurzaamheid zoals beschreven in [de visie van Ethereum](/roadmap/vision/).

## Misvattingen over de samenvoeging {#misconceptions}

<ExpandableCard
title="Misvatting: &quot;voor het uitvoeren van een node moet u 32 ETH staken.&quot;"
contentPreview="False. Anyone is free to sync their own self-verified copy of Ethereum (i.e. run a node). No ETH is required—not before The Merge, not after The Merge, not ever.">

Er zijn twee soorten Ethereum-nodes: nodes die blocks kunnen voorstellen en nodes die dat niet kunnen.

Nodes die blocks voorstellen zijn slechts een klein aantal van het totale aantal nodes op Ethereum. Deze categorie omvat mining-nodes onder proof-of-work (PoW) en validatienodes onder proof-of-stake (PoS). Deze categorie vereist de inzet van economische bronnen (zoals GPU hash-power in proof-of-work of gestakete ETH in proof-of-stake) in ruil voor de mogelijkheid om af en toe het volgende block voor te stellen en protocolbeloningen te verdienen.

Voor de andere nodes op het netwerk (d.w.z. de meerderheid) zijn geen andere economische bronnen nodig dan een standaardcomputer met 1-2 TB beschikbare opslagruimte en een internetverbinding. Deze nodes stellen geen blocks voor, maar ze spelen nog steeds een cruciale rol in het beveiligen van het netwerk door alle blockvoorstellers verantwoordelijk te houden door te luisteren naar nieuwe blocks en hun geldigheid te verifiëren bij aankomst volgens de consensusregels van het netwerk. Als de block geldig is, gaat de node verder met het propageren ervan door het netwerk. Als de block om welke reden dan ook ongeldig is, zal de software van de node het als ongeldig markeren en de propagatie stoppen.

Het uitvoeren van een node die geen blocks produceert is mogelijk voor iedereen onder beide consensusmechanismen (proof-of-work of proof-of-stake). We <em>raden dit sterk aan</em> voor alle gebruikers als ze de middelen hebben. Het uitvoeren van een node is enorm waardevol voor Ethereum en biedt extra voordelen voor iedereen die er een uitvoert, zoals een betere beveiliging, privacy en censuurbestendigheid.

De mogelijkheid voor iedereen om zijn/haar eigen node uit te voeren is <em>absoluut essentieel</em> om de decentralisatie van het Ethereum-netwerk te behouden.

<a href="/run-a-node/">Meer over het uitvoeren van uw eigen node</a>

</ExpandableCard>

<ExpandableCard
title="Misvatting: &quot;de samenvoeging kon de gaskosten niet verlagen.&quot;"
contentPreview="False. The Merge was a change of consensus mechanism, not an expansion of network capacity, and was never intended to lower gas fees.">

Gaskosten zijn een product van de netwerkvraag in verhouding tot de capaciteit van het netwerk. De samenvoeging schafte het gebruik van proof-of-work af en schakelde over op proof-of-stake voor consensus, maar veranderde niet significant de parameters die direct van invloed zijn op de netwerkcapaciteit of verwerkingscapaciteit.

Met een <a href="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">rollup-centrische routekaart</a> zijn de inspanningen gericht op het opschalen van gebruikersactiviteit op <a href="/layer-2/">laag 2</a>, terwijl het hoofdnet op laag 1 wordt gebruikt als een veilige gedecentraliseerde afwikkelingslaag die is geoptimaliseerd voor de opslag van rollup-gegevens om rollup-transacties exponentieel goedkoper te maken. De overgang naar proof-of-stake is een kritieke voorloper om dit te realiseren. <a href="/developers/docs/gas/">Meer over gas en kosten.</a>

</ExpandableCard>

<ExpandableCard
title="Misvatting: &quot;transacties werden aanzienlijk versneld door de samenvoeging.&quot;"
contentPreview="False. Though some slight changes exist, transaction speed is mostly the same on layer 1 now as it was before The Merge.">
De "snelheid" van een transactie kan op een paar manieren worden gemeten, waaronder de tijd om in een block te worden opgenomen en de tijd tot de voltooiing. Beide veranderingen zijn licht, maar niet op een manier die gebruikers zullen opmerken.

Historisch gezien was het doel bij proof-of-work om elke ~13,3 seconden een nieuwe block te hebben. Onder proof-of-stake komen slots precies elke 12 seconden voor, die elk een kans zijn voor een validator om een block te publiceren. De meeste slots hebben blocks, maar niet noodzakelijk allemaal (d.w.z. een validator die offline is). Bij proof-of-stake worden blocks ~10% vaker geproduceerd dan bij proof-of-work. Dit was een tamelijk onbeduidende wijziging die gebruikers waarschijnlijk niet zullen opmerken.

Proof-of-stake introduceerde het concept van transactie-finaliteit dat voorheen niet bestond. Bij proof-of-work wordt de mogelijkheid om een block terug te draaien exponentieel moeilijker met elk voorbijgaand block dat bovenop een transactie wordt gemined. Toch bereikt het nooit helemaal nul. Onder proof-of-stake worden blocks gebundeld in epochs (tijdspannes van 6,4 minuten die 32 kansen voor blocks bevatten) waarop validators stemmen. Wanneer een epoch eindigt, stemmen de validators of ze het epoch als 'terecht' beschouwen. Als validators akkoord gaan met het rechtvaardigen van het epoch, wordt het in het volgende epoch afgerond. Het ongedaan maken van afgeronde transacties is economisch niet haalbaar, omdat daarvoor meer dan een derde van het totaal gestakete ETH zou moeten worden verkregen en verbrand.

</ExpandableCard>

<ExpandableCard
title="Misvatting: &quot;de samenvoeging maakte opnames van staking mogelijk.&quot;"
contentPreview="False, but staking withdrawals have since been enabled via the Shanghai/Capella upgrade.">

Aanvankelijk hadden stakers na de samenvoeging enkel toegang tot fooien en MEV die waren verdiend als gevolg van blockvoorstellen. Deze beloningen worden bijgeschreven op een niet-stakingaccount dat wordt beheerd door de validator (bekend als de <em>ontvanger van kosten</em>), en zijn onmiddellijk beschikbaar. Deze beloningen staan los van de protocolbeloningen voor het uitvoeren van validatortaken.

Sinds de Shanghai/Capella-netwerkupgrade kunnen stakers nu een <em>opname-adres</em> invoeren om automatische uitbetalingen van overtollige stakesaldi te ontvangen (ETH hoger dan 32 van protocolbeloningen). Deze upgrade zorgde er ook voor dat een validator zijn/haar volledige saldo kon ontgrendelen en terugvorderen wanneer hij/zij het netwerk verliet.

<a href="/staking/withdrawals/">Meer over staking-opnames</a>

</ExpandableCard>

<ExpandableCard
title="Misvatting: &quot;nu de samenvoeging is voltooid en opnames mogelijk zijn, kunnen stakers allemaal tegelijk vertrekken.&quot;"
contentPreview="False. Validator exits are rate limited for security reasons.">
Sinds dat de Shanghai/Capella-upgrade opnames mogelijk maakt, worden validators gestimuleerd om hun stakingsaldo boven 32 ETH op te nemen, omdat deze middelen niet bijdragen aan de opbrengst en anders vergrendeld staan. Afhankelijk van het jaarlijks rentepercentage (bepaald door het totaal aantal gestakete ETH), kunnen ze gestimuleerd worden om hun validator(en) te verlaten om hun volledige saldo terug te vorderen of om mogelijk nog meer te staken met behulp van hun beloningen om meer te kunnen verdienen.

Een belangrijke kanttekening hierbij is dat de snelheid waarmee een validator wordt verlaten, wordt beperkt door het protocol en dat er slechts een bepaald aantal validatoren per epoch (elke 6,4 minuten) kan worden afgesloten. Deze limiet schommelt afhankelijk van het aantal actieve validatoren, maar komt neer op ongeveer 0,33% van het totale aantal gestakete ETH die in één dag uit het netwerk kan worden verwijderd.

Dit voorkomt een massale exodus van gestakete middelen. Bovendien voorkomt het dat een potentiële aanvaller met toegang tot een groot deel van de totale gestakete ETH een overtreding begaat die in aanmerking komt voor slashing en alle overtredende validatorsaldi in hetzelfde epoch verlaat/opneemt voordat het protocol de sanctie voor slashing kan afdwingen.

Het jaarlijks rentepercentage is ook opzettelijk dynamisch, zodat een markt van stakers kan bepalen hoeveel ze willen betalen om het netwerk te helpen beveiligen. Als het percentage te laag is, dan zullen validators afsluiten met een door het protocol beperkt percentage. Geleidelijk aan zal dit de jaarlijks rentepercentage verhoogd worden voor iedereen die blijft, waardoor nieuwe of terugkerende stakers worden aangetrokken.
</ExpandableCard>

## Wat is er met 'Eth2' gebeurd? {#eth2}

De term 'Eth2' wordt niet langer gebruikt. Na het samenvoegen van 'Eth1' en 'Eth2' in één enkele chain, is het niet langer nodig om onderscheid te maken tussen twee Ethereumnetwerken. Er is maar één Ethereum.

Om verwarring te beperken, heeft de gemeenschap deze voorwaarden bijgewerkt:

- 'Eth1' is nu de 'uitvoeringslaag', die de transacties en uitvoering regelt.
- 'Eth2' is nu de 'consensuslaag', die de proof-of-stake-consensus regelt.

Deze terminologie-updates veranderen alleen de naamgevingsconventies. Dit verandert niets aan de doelen of de routekaart van Ethereum.

[Ontdek meer over het hernoemen van 'Eth2'](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/)

## Relatie tussen upgrades {#relationship-between-upgrades}

Alle Ethereum-upgrades zijn ietwat met elkaar verbonden. Daarom vatten we nu even samen hoe de samenvoeging zich verhoudt tot de andere upgrades.

### De samenvoeging en de Beacon Chain {#merge-and-beacon-chain}

De samenvoeging vertegenwoordigt de formele invoering van de Beacon Chain als de nieuwe consensuslaag voor de oorspronkelijke uitvoeringslaag van het hoofdnet. Sinds de samenvoeging worden validators toegewezen om het hoofdnet van Ethereum te beveiligen en is mining op [proof-of-work](/developers/docs/consensus-mechanisms/pow/) niet langer een geldige manier om blocks te produceren.

Blocks worden daarentegen voorgesteld door validerende nodes die ETH hebben gestaket in ruil voor het recht om deel te nemen aan de consensus. Deze upgrades vormen de basis voor toekomstige schaalbaarheidsupgrades, waaronder sharding.

<ButtonLink href="/roadmap/beacon-chain/">
  De Beacon Chain
</ButtonLink>

### De samenvoeging en de Shanghai-upgrade {#merge-and-shanghai}

Om te kunnen vereenvoudigen en de focus te maximaliseren op een succesvolle overgang naar proof-of-stake, bevatte de overgangsupgrade bepaalde verwachtte functies niet, zoals de mogelijkheid om gestakete ETH op te nemen. Deze functionaliteit werd apart beschikbaar gesteld bij de Shanghai/Capella-upgrade.

Nieuwsgierig? Ontdek meer over [Wat er na de samenvoeging gebeurt](https://youtu.be/7ggwLccuN5s?t=101), gepresenteerd door Vitalik op het ETHGlobal-evenement in april 2021.

### De samenvoeging en sharding {#merge-and-data-sharding}

Oorspronkelijk was het plan om vóór de samenvoeging aan sharding te werken om de schaalbaarheid aan te pakken. Echter, met de opkomst van [schaaloplossingen op laag 2](/layer-2/), verschoof de prioriteit naar het omschakelen van proof-of-work naar proof-of-stake.

Plannen voor sharding ontwikkelen zich snel, maar gezien de opkomst en het succes van technologieën voor laag 2 om de uitvoering van transacties op te schalen, zijn de plannen voor sharding verschoven naar het vinden van de meest optimale manier om de last van het opslaan van gecomprimeerde calldata van rollup-contracten te verdelen, waardoor exponentiële groei in de netwerkcapaciteit mogelijk wordt. Dit zou niet mogelijk zijn geweest zonder eerst over te stappen op proof-of-stake.

<ButtonLink href="/roadmap/danksharding/">
  Sharden
</ButtonLink>

## Lees verder {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />
