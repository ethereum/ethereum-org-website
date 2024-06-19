---
title: Staking-as-a-service
description: Een overzicht van hoe u aan de slag kunt met gepoolde ETH-staking
lang: nl
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: Leslie de neushoorn zweeft in de wolken.
sidebarDepth: 2
summaryPoints:
  - Node operators van derden beheren de werking van uw validator-client
  - Geweldige optie voor iedereen met 32 ETH, die zich niet comfortabel voelt met de technische complexiteit van het draaien van een node
  - Verminder het vertrouwen en bewaar zelf uw opnamesleutels
---

## Wat is staking-as-a-service? {#what-is-staking-as-a-service}

Staking-as-a-service ("SaaS") is een categorie van stakingdiensten waarbij u uw eigen 32 ETH stort voor een validator, maar node-activiteiten naar een externe operator worden gedelegeerd. Dit proces omvat meestal een begeleiding door de initiële set-up, inclusief sleutelgeneratie en storting, met daarna het uploaden van uw ondertekeningssleutels naar de operator. Hiermee kan de service uw validator namens u beheren, meestal tegen een maandelijkse vergoeding.

## Waarom staken met een service? {#why-stake-with-a-service}

Het Ethereum-protocol ondersteunt zelf geen stake-delegering, daarom zijn deze diensten gebouwd om aan deze vraag te voldoen. Als u 32 ETH hebt om te staken, maar u zich niet op uw gemak voelt om met hardware om te gaan, kunt u met SaaS-diensten het moeilijke deel delegeren terwijl u eigen blokbeloningen verdient.

<CardGrid>
  <Card title="Uw eigen validator" emoji=":desktop_computer:">
    Stort uw eigen 32 ETH om uw eigen set ondertekeningssleutels te activeren die zullen deelnemen aan de Ethereum-consensus. Volg uw voortgang met dashboards om de ETH-beloningen te zien accumuleren.
  </Card>
  <Card title="Eenvoudig om te starten" emoji="🏁">
    Vergeet hardwarespecificaties, installatie, node-onderhoud en upgrades.
    Met SaaS-providers kunt u het moeilijke deel uitbesteden door uw eigen ondertekeningsgegevens te uploaden, waardoor namens u een validator kan worden uitgevoerd tegen een kleine vergoeding.
  </Card>
  <Card title="Beperk uw risico" emoji=":shield:">
    In veel gevallen hoeven gebruikers de toegang tot de sleutels voor het opnemen of overschrijven van gestakete fondsen niet op te geven. Deze zijn anders dan de ondertekeningssleutels en kunnen apart worden opgeslagen om uw risico als staker te beperken (maar niet te verwijderen).
  </Card>
</CardGrid>

<StakingComparison page="saas" />

## Wat te overwegen {#what-to-consider}

Er is een groeiend aantal staking-as-a-service providers om u te helpen uw ETH te staken, maar elk met verschillende risico's en voordelen.

Attribuutindicatoren worden hieronder gebruikt om opmerkelijke of zwakke punten te signaleren die een genoemde SaaS-provider kan hebben. Gebruik deze sectie als referentie voor hoe we deze attributen definiëren, wanneer u een service kiest om u te helpen met uw staking-traject.

<StakingConsiderations page="saas" />

## Verken staking-serviceproviders {#saas-providers}

Hieronder staat een aantal beschikbare SaaS-providers. Gebruik bovenstaande indicatoren om u te helpen door de onderstaande services te gaan

<InfoBanner emoji="⚠️" isWarning>
Houd rekening met het belang van het ondersteunen van <a href="/developers/docs/nodes-and-clients/client-diversity/">diversiteit van clients</a>, omdat dit de veiligheid van het netwerk verbetert en uw risico's beperkt. Services die bewijs hebben van het beperken van het gebruik van meerderheid-clients zijn gemarkeerd als <em style={{ textTransform: "uppercase" }}>"diverse clients."</em>
</InfoBanner>

### SaaS-providers

<StakingProductsCardGrid category="saas" />

### Sleutelgenerators

<StakingProductsCardGrid category="keyGen" />

Heeft u een suggestie voor een staking-as-a-service provider die we gemist hebben? Bekijk ons [productlijstbeleid](/contributing/adding-staking-products/) om te zien of het een goede fit is en om het ter beoordeling in te dienen.

## Veelgestelde vragen {#faq}

<ExpandableCard title="Wie heeft mijn sleutels?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
  Regelingen zullen verschillen van provider tot provider, maar gewoonlijk wordt u begeleid bij het instellen van de benodigde ondertekeningssleutels (één per 32 ETH) en het uploaden ervan naar uw provider zodat ze namens u kunnen valideren. De ondertekeningssleutels alleen bieden geen mogelijkheid om uw geld op te nemen, over te schrijven of uit te geven. Ze bieden echter wel de mogelijkheid om op consensus te stemmen, wat kan leiden tot offline boetes of slashing als het niet juist wordt gedaan.
</ExpandableCard>

<ExpandableCard title="Er zijn dus twee sets sleutels?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Ja. Elk account bestaat uit sleutels voor <em>ondertekening</em> en <em>opname</em>. Om een validator de status van de chain te laten bevestigen, deel te laten nemen aan sync-comités en blokken te laten voorstellen, moeten de ondertekeningssleutels gemakkelijk toegankelijk zijn door een validator-client. Deze moeten op een of andere manier met het internet worden verbonden en worden dus per definitie beschouwd als "hot" keys. Dit is een vereiste voor uw validator om te kunnen attesteren, en dus zijn de sleutels die worden gebruikt om fondsen over te schrijven of op te nemen om veiligheidsredenen gescheiden.

Al deze sleutels kunnen altijd op een reproduceerbare manier worden gegenereerd met behulp van uw uit 24 woorden bestaande mnemonische herstelzin. <em>Zorg ervoor dat u uw herstelzin veilig bewaard, anders kunt u uw opnamesleutels niet genereren wanneer dat nodig is</em>.
</ExpandableCard>

<ExpandableCard title="Wanneer kan ik mijn fondsen opnemen?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
  Wanneer u 32 ETH staket met een SaaS-provider, wordt die ETH nog steeds gestort op het officiële staking-stortingscontract. Als zodaning zijn SaaS-stakers momenteel beperkt door dezelfde opnamebeperkingen als solo stakers. Dit betekent dat het staken van uw ETH momenteel een eenrichtings storting is. Dit zal het geval zijn tot aan de Shanghai upgrade.
</ExpandableCard>

<ExpandableCard title="Wat gebeurt er als ik geslashed wordt?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Door een SaaS-provider te gebruiken, vertrouwt u de werking van uw node toe aan iemand anders. Dit brengt het risico van slechte node-prestaties met zich mee, wat u niet kunt controleren. In het geval dat uw validator wordt geslashed, wordt uw validatorsaldo bestraft en onder dwang verwijderd uit de validator-pool. Deze fondsen wordt vergrendeld totdat opnames op protocolniveau worden ingeschakeld.

Neem contact op met de individuele SaaS-providers voor meer informatie over garanties of verzekeringsopties. Als u liever de volledige controle over uw validatorinstallatie heeft, <a href="/staking/solo/">leer dan meer over hoe u uw ETH solo kunt staken</a>.
</ExpandableCard>

## Verder lezen {#further-reading}

- [Evaluating Staking Services](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
