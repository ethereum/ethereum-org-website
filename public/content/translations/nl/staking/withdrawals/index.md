---
title: Opnames staken
description: Pagina die samenvat wat staking push-opnames zijn, hoe ze werken en wat stakers moeten doen om hun beloningen te krijgen
lang: nl
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Leslie de neushoorn en haar staking-beloningen
sidebarDepth: 2
summaryPoints:
  - De Shanghai/Capella-upgrade maakte staking-opnames mogelijk op Ethereum
  - Validator-beheerders moeten een opnameadres aangeven om dit mogelijk te maken
  - Beloningen worden automatisch elke paar dagen verdeeld
  - Validators die het staken volledig afsluiten, zullen hun resterende saldo ontvangen
---

<UpgradeStatus dateKey="page-staking-withdrawals-when">
Staking-opnames werden mogelijk gemaakt met de Shanghai/Capella-upgrade die plaatsvond op 12 april 2023.&nbsp;<a href="#when" customEventOptions={{ eventCategory: "Anchor link", eventAction: "When's it shipping?", eventName: "click" }}>Meer over Shanghai/Capella</a>
</UpgradeStatus>

**Staking-opnames** verwijzen naar het verplaatsen van ETH van een validatoraccount op de consensuslaag van Ethereum (de Beacon Chain) naar de uitvoeringslaag waarop het kan worden gebruikt voor transacties.

**Beloningsbetalingen van saldo** dat hoger is dan 32 ETH worden automatisch en regelmatig naar een opnameadres gestuurd dat gekoppeld is aan elke validator, zodra dit is opgegeven door de gebruiker. Gebruikers kunnen ook ** geheel stoppen met staking** en daarmee hun volledig validatorsaldo ontgrendelen.

## Staking-beloningen {#staking-rewards}

Beloningsbetalingen worden automatisch verwerkt voor actieve validatoraccounts met een maximaal effectief saldo van 32 ETH.

Elk saldo hoger dan 32 ETH dat verdiend is door middel van beloningen, draagt feitelijk niet bij aan het hoofdbedrag en verhoogt niet de invloed van deze validator op het netwerk, en wordt dus automatisch elke paar dagen opgenomen als een beloningsbetaling. Afgezien van het eenmalig aangeven van een opnameadres, vereisen deze beloningen geen enkele actie van de validator-operator. Dit alles wordt gestart op de consensuslaag, dus er is voor geen enkele stap gas (transactiekosten) nodig.

### Hoe kwamen we hier terecht? {#how-did-we-get-here}

In de afgelopen jaren heeft Ethereum verschillende netwerkupgrades ondergaan, waarbij overgegaan is naar een netwerk dat wordt beveiligd door ETH zelf, in plaats van energie-intensieve mining zoals het ooit was. Deelnemen aan consensus op Ethereum staat nu bekend als "staking", aangezien deelnemers vrijwillig ETH hebben vastgelegd en deze "op het spel hebben gezet" om te kunnen deelnemen aan het netwerk. Gebruikers die zich aan de regels houden, worden beloond. Pogingen tot valsspelen kunnen echter bestraft worden.

Sinds de lancering van het staking-stortingscontract in november 2020 hebben enkele dappere Ethereum-pioniers vrijwillig fondsen vastgezet om 'validators' te activeren. Dit zijn speciale accounts die het recht hebben om blokken formeel te attesteren en voor te stellen, volgens de netwerkregels.

Vóór de upgrade van Shanghai/Capella kon je je gestakete ETH niet gebruiken of raadplegen. Maar nu kun je ervoor kiezen om je beloningen automatisch op een gekozen account te ontvangen. Ook kun je je gestakete ETH opnemen wanneer je maar wilt.

### Hoe bereid ik me voor? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Belangrijke opmerkingen {#important-notices}

Het opgeven van een opnameadres is een vereiste stap voor elk validatoraccount voordat er ETH van het saldo kan worden opgenomen.

<InfoBanner emoji="⚠️" isWarning>
  <strong>Aan elk validatoraccount kan slechts één opnameadres worden toegewezen, en wel één keer.</strong> Zodra een adres is gekozen en ingediend bij de consensuslaag, kan dit niet meer ongedaan worden gemaakt of worden gewijzigd. Controleer nogmaals of het opgegeven adres juist is en of het eigendomsrechtelijk is vastgelegd voordat je het indient.
</InfoBanner>

Er bestaat <strong>geen dreiging voor je geld in de tussentijd</strong> als je dit niet doet, ervan uitgaande dat je geheugensteuntje/zaadzin offline veilig offline is gebleven en op geen enkele manier is gecompromitteerd. Als je geen opnamegegevens invoert, blijft de ETH zoals tevoren geblokkeerd in het validatoraccount totdat er een opnameadres wordt opgegeven.

## Staking geheel afsluiten {#exiting-staking-entirely}

Je moet een opnameadres opgeven voordat er _enig_ geld van het saldo van een validatoraccount kan worden overgemaakt.

Gebruikers die volledig willen stoppen met staken en hun volledige saldo willen opnemen, moeten ook een bericht met 'vrijwillige afsluiting' en de validatorsleutels ondertekenen en verzenden. Hiermee wordt het proces voor het afsluiten van staken gestart. Dit wordt gedaan met je validator-client en ingediend bij je consensus-node. Hiervoor is geen gas nodig.

De tijd die nodig is om een ​​validator de staking af te laten sluiten, varieert, afhankelijk van hoeveel anderen er tegelijkertijd mee stoppen. Zodra dit is voltooid, is dit account niet langer verantwoordelijk voor het uitvoeren van taken binnen het validatornetwerk, komt het niet langer in aanmerking voor beloningen en staat er geen ETH meer 'op het spel'. Op dit moment wordt het account gemarkeerd als volledig ‘opneembaar’.

Zodra een account als 'opneembaar' is gemarkeerd en de opnamegegevens zijn verstrekt, hoeft de gebruiker niets anders te doen dan wachten. Accounts worden automatisch en continu door blokvoorstellers geveegd voor in aanmerking komende beëindigde fondsen, en je accountsaldo wordt volledig overgemaakt (ook bekend als een "volledige opname") tijdens de volgende <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>sweep</a>.

## Wanneer worden staking-opnames mogelijk gemaakt? {#when}

Staking-opnames zijn live! De opnamefunctionaliteit werd ingeschakeld als onderdeel van de Shanghai/Capella-upgrade die op 12 april 2023 plaatsvond.

De opnamefunctionaliteit werd ingeschakeld als onderdeel van de Shanghai/Capella-upgrade die op 12 april 2023 plaatsvond. Hiermee werd de cirkel rond staking van liquiditeit gesloten en kwam Ethereum een ​​stap dichterbij de opbouw van een duurzaam, schaalbaar en veilig gedecentraliseerd ecosysteem.

- [Meer over de geschiedenis van Ethereum](/history/)
- [Meer over de roadmap van Ethereum](/roadmap/)

## Hoe werken opnamebetalingen? {#how-do-withdrawals-work}

Of een bepaalde validator in aanmerking komt voor een opname of niet, wordt bepaald door de status van het validatoraccount zelf. Er is op geen enkel moment invoer van de gebruiker nodig om te bepalen of er een opname via een account moet worden uitgevoerd of niet. Het hele proces wordt automatisch en doorlopend uitgevoerd door de consensuslaag.

### Leer je liever visueel? {#visual-learner}

Bekijk deze uitleg van Finematics over Ethereum staking-opnames:

<YouTube id="RwwU3P9n3uo" />

### Validator "sweeping" {#validator-sweeping}

Wanneer een validator het volgende blok moet voorstellen, moet hij een opnamewachtrij samenstellen van maximaal 16 in aanmerking komende opnames. Dit wordt gedaan door te beginnen met de validatorindex 0 en te bepalen of er een opname in aanmerking komt voor dit account volgens de regels van het protocol. Als dit het geval is, wordt het account toegevoegd aan de wachtrij. De validator die is ingesteld om het volgende blok voor te stellen, gaat verder waar het vorige blok is gestopt en gaat oneindig door.

<InfoBanner emoji="🕛">
Denk aan een analoge klok. De wijzer op de klok wijst naar het uur, beweegt in één richting, slaat geen uren over en komt uiteindelijk weer terecht bij het begin nadat het laatste nummer is bereikt.<br/><br/>
Stel je nu voor dat de klok in plaats van 1 tot en met 12 0 tot en met N heeft <em>(het totale aantal validatoraccounts dat ooit is geregistreerd op de consensuslaag, meer dan 500.000 in januari 2023).</em><br/><br/>
De wijzer op de klok wijst naar de volgende validator die moet worden gecontroleerd op in aanmerking komende opnames. Hij begint bij 0 en gaat door tot het einde, zonder dat er accounts worden overgeslagen. Wanneer de laatste validator bereikt is, begint de cyclus weer opnieuw vanaf het begin.
</InfoBanner>

#### Een account controleren op opnames {#checking-an-account-for-withdrawals}

Terwijl een voorsteller de validators doorzoekt op mogelijke opnames, wordt elke validator die wordt gecontroleerd, geëvalueerd aan de hand van een korte reeks vragen om te bepalen of er een opname moet worden geactiveerd en, zo ja, hoeveel ETH er moet worden opgenomen.

1. **Is er een opnameadres opgegeven?** Als er geen opnameadres is opgegeven, wordt de account overgeslagen en wordt er geen opname uitgevoerd.
2. **Is de validator afgesloten en opneembaar?** Als de validator volledig is afgesloten en we de epoch hebben bereikt waarin hun account als "opneembaar" wordt beschouwd, wordt een volledige opname verwerkt. Hiermee wordt het volledige resterende saldo overgemaakt naar het opnameadres.
3. **Is het effectieve saldo maximaal 32?** Als de account opnamegegevens heeft, niet volledig is afgesloten en er beloningen boven de 32 in de wacht staan, wordt een gedeeltelijke opname verwerkt. Alleen de beloningen boven de 32 worden overgemaakt naar het opnameadres van de gebruiker.

Er zijn slechts twee acties die validatoroperators uitvoeren tijdens de levenscyclus van een validator die deze stroom rechtstreeks beïnvloeden:

- Opnamegegevens opgeven om elke vorm van opname mogelijk te maken
- Het netwerk verlaten, wat een volledige opname zal veroorzaken

### Gas-vrij {#gas-free}

Deze aanpak ten aanzien van staking-opnames vermijdt dat stakers handmatig een transactie moeten indienen om een bepaalde hoeveelheid ETH op te nemen. Dit betekent dat er **geen gas (transactiekost) nodig is**, en opnames concurreren ook niet om bestaande blokruimte op de executielaag.

### Hoe vaak krijg ik mijn staking-beloningen? {#how-soon}

Er kunnen maximaal 16 opnames in één blok worden verwerkt. In dat tempo kunnen er 115.200 validatoropnames per dag worden verwerkt (als we er vanuitgaan dat er geen slots worden gemist). Zoals hierboven vermeld, worden validators zonder in aanmerking komende opnames overgeslagen, waardoor de tijd om de sweep te voltooien verkort wordt.

Als we deze berekeningen uitbreiden, kunnen we schatten hoeveel tijd het kost om een bepaald aantal opnames te verwerken:

<TableContainer>

| Aantal opnames | Tijd voor voltooiing |
| :-------------------: | :--------------: |
|        400.000        |     3,5 dagen     |
|        500.000        |     4,3 dagen     |
|        600.000        |     5,2 dagen     |
|        700.000        |     6,1 dagen     |
|        800.000        |     7,0 dagen     |

</TableContainer>

Zoals je ziet vertraagt dit naarmate er meer validators op het netwerk zitten. Een toename van het aantal gemiste slots zou dit proces proportioneel kunnen vertragen, maar dit zal over het algemeen de langzamere kant van de mogelijke uitkomsten zijn.

## Veelgestelde vragen {#faq}

<ExpandableCard
title="Kan ik, nadat ik een opnameadres heb opgegeven, dit veranderen in een alternatief opnameadres?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
Nee, het proces om opnamegegevens te verstrekken is eenmalig en ze kunnen niet worden gewijzigd als ze eenmaal zijn ingediend.
</ExpandableCard>

<ExpandableCard
title="Waarom kan een opnameadres slechts eenmaal worden ingesteld?"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
Door het instellen van een opnameadres in de uitvoeringslaag zijn de opnamegegevens voor die validator permanent gewijzigd. Dit betekent dat de oude gegevens niet meer werken en dat de nieuwe gegevens verwijzen naar een uitvoeringslaagaccount.

Opnameadressen kunnen bestaan ​​uit een slim contract (beheerd door de code ervan) of een account dat in extrene handen is (EOA, beheerd door de privé-sleutel). Momenteel hebben deze accounts geen mogelijkheid om een ​​bericht terug te sturen naar de consensuslaag dat een wijziging van de validatorgegevens zou signaleren. Het toevoegen van deze functionaliteit zou onnodige complexiteit aan het protocol toevoegen.

Als alternatief voor het wijzigen van het opnameadres voor een specifieke validator, kunnen gebruikers ervoor kiezen om een ​​slim contract in te stellen als opnameadres dat de sleutelrotatie kan verwerken, zoals een kluis. Gebruikers die hun geld op hun eigen EOA zetten, kunnen een volledige exit uitvoeren om al hun gestakete fondsen op te nemen en vervolgens opnieuw te staken met nieuwe gegevens.
</ExpandableCard>

<ExpandableCard
title="Wat als ik deelneem aan staking van tokens of gepoolde staking?"
eventCategory="FAQ"
eventAction="What if I participate in staking tokens or pooled staking"
eventName="read more">

Als je deel uitmaakt van een <a href="/staking/pools/">staking-pool</a> of staking-tokens bezit, dient je bij je provider navraag te doen naar de manier waarop staking-opnames worden afgehandeld. Elke service werkt namelijk anders.

Over het algemeen moeten gebruikers de vrijheid hebben om hun onderliggende gestakete ETH terug te vorderen, of om te veranderen van staking-provider. Als een bepaalde pool te groot wordt, kun je het geld eruit halen, inwisselen en opnieuw staken bij een <a href="https://rated.network/">kleinere aanbieder</a>. Of als je genoeg ETH hebt verzameld, kun je <a href="/staking/solo/">vanuit huis staken</a>.

</ExpandableCard>

<ExpandableCard
title="Worden beloningsbetalingen (gedeeltelijke opnames) automatisch uitgevoerd?"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">
Ja, zolang je validator een opnameadres heeft opgegeven. Deze moet eenmalig worden opgegeven om opnames mogelijk te maken. Vervolgens worden de beloningsbetalingen automatisch elke paar dagen geactiveerd bij elke validator-sweep.
</ExpandableCard>

<ExpandableCard
title="Vinden volledige opnames automatisch plaats?"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

Nee, zolang je validator nog actief is op het netwerk, zal er niet automatisch een volledige opname plaatsvinden. Hiervoor moet je handmatig een vrijwillige exit initiëren.

Zodra een validator het afsluitproces heeft voltooid en ervan uitgaande dat de rekening over opnamegegevens beschikt, wordt het resterende saldo <em>vervolgens</em> afgeschreven tijdens de volgende <a href="#validator-sweeping">validator-sweep</a>.

</ExpandableCard>

<ExpandableCard title="Kan ik een aangepast bedrag opnemen?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
Opnames worden automatisch verwerkt, waarbij alle ETH die niet actief bijdraagt ​​aan de stake, wordt overgedragen. Dit omvat volledige saldi voor accounts waarvan het afsluitproces is voltooid.

Het is niet mogelijk om handmatig een specifiek bedrag aan ETH op te vragen.
</ExpandableCard>

<ExpandableCard
title="Ik beheer een validator. Waar kan ik meer informatie vinden over het mogelijk maken van opnames?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information on enabling withdrawals?"
eventName="read more">

Validator-operators wordt aangeraden de pagina <a href="https://launchpad.ethereum.org/withdrawals/">Staking Launchpad-opnames</a> te bezoeken. Daar vind je meer informatie over het voorbereiden van je validator op opnames, de timing van gebeurtenissen en meer informatie over hoe opnames werken.

Als je je instellingen eerst op een testnet wilt uitproberen, ga je naar <a href="https://holesky.launchpad.ethereum.org">Holesky Testnet Staking Launchpad</a> om te beginnen.

</ExpandableCard>

<ExpandableCard
title="Kan ik mijn validator opnieuw activeren nadat ik hem heb afgesloten, door meer ETH te storten?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
Nee. Zodra een validator is afgesloten en het volledige saldo is opgenomen, worden eventuele extra fondsen die op die validator zijn gestort, automatisch overgemaakt naar het opnameadres tijdens de volgende validator-sweep.
 Een nieuwe validator moet geactiveerd worden om ETH opnieuw te staken.
</ExpandableCard>

## Verder lezen {#further-reading}

- [Staking Launchpad-opnames](https://launchpad.ethereum.org/withdrawals)
- [EIP-4895: Beacon chain push-opnames als activiteiten](https://eips.ethereum.org/EIPS/eip-4895)
- [Ethereum Cat Herders - Shanghai](https://www.ethereumcatherders.com/shanghai_upgrade/index.html)
- [PEEPanEIP #94: opname van gestakete ETH (test) met Potuz & Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Beacon chain push-opnames als activiteiten met Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Inzicht in effectief saldo van validators](https://www.attestant.io/posts/understanding-validator-effective-balance/)
