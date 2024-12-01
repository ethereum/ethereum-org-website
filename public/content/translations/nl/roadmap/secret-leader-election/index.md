---
title: Geheime verkiezing van leider
description: Uitleg over hoe een geheime leidersselectie kan helpen om validators te beschermen tegen aanvallen
lang: nl
summaryPoints:
  - Het IP-adres van blockvoorstellers kan van tevoren bekend zijn, waardoor ze kwetsbaar zijn voor aanvallen
  - Een geheime leidersselectie verbergt de identiteit van de validators zodat ze niet van tevoren bekend zijn
  - Een uitbreiding van dit idee is om de selectie van de validator willekeurig te maken in elk slot.
---

# Geheime verkiezing van leider {#single-secret-leader-election}

In het huidige consensusmechanisme op basis van [proof-of-stake](/developers/docs/consensus-mechanisms/pos) is de lijst van aankomende blockvoorstellers openbaar en is het mogelijk om hun IP-adressen in kaart te brengen. Dit betekent dat aanvallers kunnen zien welke validators een block moeten voorstellen en hen kunnen aanvallen met een DOS-aanval (denial-of-service), waardoor ze hun block niet op tijd kunnen voorstellen.

Dit kan kansen creëren voor een aanvaller om hiervan te profiteren. Een indiener van een block die is geselecteerd voor slot `n+1` kan bijvoorbeeld een DOS-aanval uitoefenen op de indiener in slot `n`, zodat deze zijn/haar kans mist om een block voor te stellen. Dit kan de aanvallende blockvoorsteller toestaan om de MEV van beide slots te extraheren, of alle transacties te verzamelen die over twee blocks verdeeld hadden moeten worden en ze in plaats daarvan allemaal in één block op te nemen, met alle bijbehorende kosten. Dit heeft waarschijnlijk meer gevolgen voor validators in een thuissituatie dan voor geavanceerde institutionele validators die geavanceerdere methodes kunnen gebruiken om zichzelf te beschermen tegen DOS-aanvallen, en kan daarom een centraliserende kracht zijn.

Er zijn verschillende oplossingen voor dit probleem. Eén daarvan is [Gedistribueerde validatortechnologie](https://github.com/ethereum/distributed-validator-specs), die erop gericht is om de verschillende taken met betrekking tot het uitvoeren van een validator te verdelen over verschillende apparaten, met redundantie, zodat het voor een aanvaller veel moeilijker is om te voorkomen dat een block in een bepaald slot wordt voorgesteld. De meest robuuste oplossing is echter **enkelvoudige geheime leidersselectie (Single Secret Leader Election, SSLE)**.

## Enkelvoudige geheime leidersselectie {#secret-leader-election}

In SSLE wordt slimme cryptografie gebruikt om ervoor te zorgen dat alleen de geselecteerde validator weet dat hij/zij geselecteerd is. Dit werkt door elke validator een verbintenis aan te laten gaan met een geheim dat ze allemaal delen. De verbintenissen worden geshuffeld en opnieuw geconfigureerd zodat niemand verbintenissen kan koppelen aan validators, maar elke validator weet welke verbintenis bij hem/haar hoort. Vervolgens wordt willekeurig één verbintenis gekozen. Als een validator merkt dat zijn/haar verplichting werd gekozen, dan weet hij/zij dat het zijn/haar beurt is om een block voor te stellen.

De belangrijkste implementatie van dit idee heet [Whisk](https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763). Het werkt als volgt:

1. Validators verbinden zich tot een gedeeld geheim. Het verbintenissenschema is zo ontworpen dat het gebonden kan worden aan een validatoridentiteit, maar dat het ook gerandomiseerd is zodat derden de binding niet kunnen omkeren en een specifieke verbintenis aan een specifieke validator kunnen koppelen.
2. Aan het begin van een epoch wordt met behulp van RANDAO een willekeurige set validators gekozen om verbintenissen met een steekproef van 16.384 validators te controleren.
3. Voor de volgende 8182 slots (1 dag) shuffelen en randomiseren de indieners van blocks een subset van de verbintenissen met behulp van hun eigen persoonlijke entropie.
4. Nadat het shuffelen is voltooid, wordt RANDAO gebruikt om een geordende lijst van de verbintenissen te maken. Deze lijst wordt toegewezen aan Ethereum-slots.
5. Validators zien dat hun verbintenis gekoppeld is aan een specifiek slot en wanneer dat slot arriveert, stellen ze een block voor.
6. Herhaal deze stappen zodat de toewijzing van verbintenissen aan slots altijd ver voor de huidige slot ligt.

Dit voorkomt dat aanvallers van tevoren weten welke specifieke validator het volgende block zal voorstellen, waardoor DOS-aanvallen onmogelijk worden.

## Geheime selectie met geen enkele leider (Secret non-Single Leader Election, SnSLE) {#secret-non-single-leader-election}

Er is ook een apart voorstel dat tot doel heeft om een scenario te creëren waar validators elk een willekeurige kans hebben om een block voor te stellen in elk slot, vergelijkbaar met hoe het blockvoorstel werd beslist onder proof-of-work, bekend als **geheime selectie zonder één leider (SnSLE)**. Een eenvoudige manier om dit te doen is door gebruik te maken van de RANDAO-functie die wordt gebruikt om willekeurig validators te selecteren in het huidige protocol. Het idee van RANDAO is dat een voldoende willekeurig getal wordt gegenereerd door hashes te combineren die door veel onafhankelijke validators zijn ingediend. In SnSLE kunnen deze hashes gebruikt worden om de volgende blockvoorsteller te kiezen, bijvoorbeeld door de hash met de laagste waarde te kiezen. Het bereik van geldige hashes kan worden beperkt om de waarschijnlijkheid af te stemmen dat individuele validators in elk slot worden geselecteerd. Door te beweren dat de hash kleiner moet zijn dan `2^256 * 5 / N` waarbij `N` het aantal actieve validators is, is de kans dat een individuele validator wordt geselecteerd in elk slot `5/N`. In dit voorbeeld is er 99,3% kans dat ten minste één voorsteller een geldige hash genereert in elk slot.

## Huidige vooruitgang {#current-progress}

SSLE en SnSLE bevinden zich beide in de onderzoeksfase. Er is nog geen definitieve specificatie voor beide ideeën. SSLE en SnSLE zijn met elkaar concurrerende voorstellen die niet allebei geïmplementeerd kunnen worden. Voordat ze beschikbaar kunnen worden gesteld, is er meer onderzoek en ontwikkeling, prototypering en implementatie op openbare testnetten nodig.

## Verder lezen {#further-reading}

- [SnSLE](https://ethresear.ch/t/secret-non-single-leader-election/11789)
