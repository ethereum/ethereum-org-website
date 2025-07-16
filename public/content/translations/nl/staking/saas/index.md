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
  <Card title="Uw eigen validator" emoji=":desktop_computer:" description="Deposit your own 32 ETH to activate your own set of signing keys that will participate in Ethereum consensus. Monitor your progress with dashboards to watch those ETH rewards accumulate." />
  <Card title="Eenvoudig om te starten" emoji="🏁" description="Forget about hardware specs, setup, node maintenance and upgrades. SaaS providers let you outsource the hard part by uploading your own signing credentials, allowing them to run a validator on your behalf, for a small cost." />
  <Card title="Beperk uw risico" emoji=":shield:" description="In many cases users do not have to give up access to the keys that enable withdrawing or transferring staked funds. These are different from the signing keys, and can be stored separately to limit (but not eliminate) your risk as a staker." />
</CardGrid>

<StakingComparison page="saas" />

## Wat te overwegen {#what-to-consider}

Er is een groeiend aantal SaaS-aanbieders om je te helpen je ETH in te zetten, maar elk van hen komt met verschillende voordelen en risico's. Je moet er rekening mee houden dat alle SaaS-opties bijkomende vertrouwensaannames vereisen in vergelijking met home-staking. Saas-opties kunnen extra code hebben die de Ethereum-clients omhult en die niet open of controleerbaar is. SaaS heeft ook een nadelig effect op de netwerkdecentralisatie. Afhankelijk van de opzet kan het zijn dat je je validator niet controleert - de operator zou oneerlijk kunnen handelen met jouw ETH.

Attribuutindicatoren worden hieronder gebruikt om opmerkelijke of zwakke punten te signaleren die een genoemde SaaS-provider kan hebben. Gebruik deze sectie als referentie voor hoe we deze attributen definiëren, wanneer u een service kiest om u te helpen met uw staking-traject.

<StakingConsiderations page="saas" />

## Verken staking-serviceproviders {#saas-providers}

Hieronder staat een aantal beschikbare SaaS-providers. Gebruik bovenstaande indicatoren om u te helpen door de onderstaande services te gaan

<ProductDisclaimer />

### SaaS-providers

<StakingProductsCardGrid category="saas" />

Houd rekening met het belang van het ondersteunen van [diversiteit van clients](/developers/docs/nodes-and-clients/client-diversity/), omdat dit de veiligheid van het netwerk verbetert en uw risico's beperkt. Services waarvan er bewijs is dat ze het gebruik door de meerderheid van de cliënten beperken, worden aangegeven met <em style={{ textTransform: "uppercase" }}>"uitvoeringscliëntendiversiteit"</em> en <em style={{ textTransform: "uppercase" }}>"consensuscliëntendiversiteit."</em>

### Sleutelgenerators

<StakingProductsCardGrid category="keyGen" />

Heeft u een suggestie voor een staking-as-a-service provider die we gemist hebben? Bekijk ons [productlijstbeleid](/contributing/adding-staking-products/) om te zien of het passend zou zijn en om het ter beoordeling in te dienen.

## Veelgestelde vragen {#faq}

<ExpandableCard title="Wie heeft mijn sleutels?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Regelingen zullen verschillen van provider tot provider, maar gewoonlijk wordt u begeleid bij het instellen van de benodigde ondertekeningssleutels (één per 32 ETH) en het uploaden ervan naar uw provider zodat ze namens u kunnen valideren. De ondertekeningssleutels alleen bieden geen mogelijkheid om uw geld op te nemen, over te schrijven of uit te geven. Ze bieden echter wel de mogelijkheid om op consensus te stemmen, wat kan leiden tot offline boetes of slashing als het niet juist wordt gedaan.
</ExpandableCard>

<ExpandableCard title="Er zijn dus twee sets sleutels?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Ja. Elk account bestaat uit sleutels voor BLS-<em>ondertekening</em> en BLS-<em>opname</em>. Om een validator de status van de chain te laten bevestigen, deel te laten nemen aan sync-comités en blokken te laten voorstellen, moeten de ondertekeningssleutels gemakkelijk toegankelijk zijn door een validator-client. Deze moeten op een of andere manier met het internet worden verbonden en worden dus per definitie beschouwd als "hot" keys. Dit is een vereiste voor uw validator om te kunnen attesteren, en dus zijn de sleutels die worden gebruikt om fondsen over te schrijven of op te nemen om veiligheidsredenen gescheiden.

De BLS-opnamesleutels worden gebruikt om een eenmalig bericht te ondertekenen dat verklaart naar welke uitvoeringslaag de beloningen en uitbetaalde fondsen moeten gaan. Zodra dit bericht is uitgezonden, zijn de <em>BLS-opnamesleutels</em> niet langer nodig. In plaats daarvan wordt de controle over de opgenomen fondsen permanent gedelegeerd naar het adres dat je hebt opgegeven. Dit stelt je in staat om een opnameadres in te stellen dat beveiligd is via je eigen koude opslag, waardoor het risico voor je validatorfondsen wordt geminimaliseerd, zelfs als iemand anders de ondertekeningssleutels van je validator beheert.

Het bijwerken van opnamegegevens is een vereiste stap om opnames mogelijk te maken\*. Dit proces omvat het genereren van de opnamesleutels met behulp van je zaadzin dat als geheugensteuntje dient.

<strong>Wees zeker dat je een veilige back-up maakt van deze zaadzin, anders kun je je opnamesleutels niet genereren als het zover is.</strong>

\*Stakers die een opnameadres hebben opgegeven bij de initiele storting hoeven dit niet te doen. Neem contact op met je SaaS-provider voor ondersteuning bij het voorbereiden van je validator.
</ExpandableCard>

<ExpandableCard title="Wanneer kan ik mijn fondsen opnemen?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Staking-opnames werden geimplementeerd in de Shanghai/Capella-upgrade in april 2023. Stakers moeten een opnameadres opgeven (als dit niet werd gedaan bij de initiële storting), en de uitbetaling van de beloningen begint automatisch om de paar dagen op periodieke basis.

Validators kunnen ook volledig ophouden als validator, waardoor hun resterende ETH-saldo vrijkomt voor opname. Accounts die een uitvoeringsopnameadres hebben opgegeven en het afsluitproces hebben voltooid, ontvangen hun volledige saldo op het opgegeven opnameadres bij de volgende validatorsweep.

<ButtonLink href="/staking/withdrawals/">Meer over staking-opnames</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Wat gebeurt er als ik geslashed wordt?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Door een SaaS-provider te gebruiken, vertrouwt u de werking van uw node toe aan iemand anders. Dit brengt het risico van slechte node-prestaties met zich mee, wat u niet kunt controleren. In het geval dat uw validator wordt geslashed, wordt uw validatorsaldo bestraft en onder dwang verwijderd uit de validator-pool.

Na voltooiing van het shashing-/afsluitproces worden deze fondsen overgemaakt naar het opnameadres dat aan de validator is toegewezen. Hiervoor moet een opnameadres worden opgegeven. Het kan zijn dat dit al is verstrekt bij de initiële storting. Zo niet, dan moeten de validatorsleutels worden gebruikt om een bericht te ondertekenen waarin een opnameadres wordt aangegeven. Als er geen opnameadres wordt opgegeven, blijven fondsen geblokkeerd totdat er een adres is opgegeven.

Neem contact op met de individuele SaaS-provider voor meer informatie over eventuele garanties of verzekeringsopties en voor instructies over het opgeven van een opnameadres. Als u liever de volledige controle over uw validatorinstallatie heeft, <a href="/staking/solo/">leer dan meer over hoe u uw ETH solo kunt staken</a>.
</ExpandableCard>

## Verder lezen {#further-reading}

- [De staking-directory van Ethereum](https://www.staking.directory/) - _Eridian en Spacesider_
- [Evaluating Staking Services](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
