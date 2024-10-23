---
title: Scam-tokens identificeren
description: Scam-tokens begrijpen, hoe ze zichzelf legitiem laten lijken en hoe je ze kunt vermijden.
lang: nl
---

# Scam-tokens identificeren {#identify-scam-tokens}

Een van de meest voorkomende toepassingen van Ethereum is dat een groep een verhandelbaar token creëert, in zekere zin hun eigen valuta. Deze tokens volgen meestal een standaard, [ERC-20](/developers/docs/standards/tokens/erc-20/). Helaas zijn er overal waar legitieme toepassingsscenario's zijn die waarde opleveren, ook criminelen die proberen die waarde voor zichzelf te stelen.

Er zijn twee manieren waarop ze je kunnen misleiden:

- **Je een scam-token verkopen**, die eruit kan zien als een echt token dat je wilt kopen, maar die door de scammers zijn uitgegeven en niets waard zijn.
- **Je verleiden tot het ondertekenen van valse transacties**, meestal door je naar hun eigen gebruikersinterface te leiden. Ze kunnen proberen om je zover te krijgen om hun contracten toestemming te geven voor jouw ERC-20 tokens, gevoelige informatie vrij te geven waardoor ze toegang kunnen krijgen tot je activa, enz. Deze gebruikersinterfaces kunnen bijna perfecte klonen zijn van de echte sites, maar met verborgen trucjes.

Om te illustreren wat scam-tokens zijn en hoe je ze kunt herkennen, gaan we kijken naar een voorbeeld van een scam-token: [`wARB`](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82). Dit token probeert eruit te zien als het legitieme [`ARB`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1)-token.

<ExpandableCard
title="Wat is ARB?"
contentPreview=''>

Arbitrum is een organisatie die <a href="/developers/docs/scaling/optimistic-rollups/">optimistic rollups</a> ontwikkelt en beheert. In eerste instantie werd Arbitrum georganiseerd als een bedrijf met winstoogmerk, maar daarna nam het stappen om te decentraliseren. Als onderdeel van dat proces gaven ze een verhandelbaar <a href="/dao/#token-based-membership">bestuurstoken</a> uit.

</ExpandableCard>

<ExpandableCard
title="Waarom heet het scam-token wARB?"
contentPreview=''>

Er is een conventie in Ethereum dat wanneer een activum niet conform is met ERC-20 is, we er een "wrapped" versie van maken met een naam die begint met "w". Zo hebben we bijvoorbeeld wBTC voor bitcoin en <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">wETH voor ether</a>.

Het heeft geen zin om een gewrapte versie te maken van een ERC-20 token dat al op Ethereum staat, maar oplichters vertrouwen eerder op de schijn van legitimiteit dan op de onderliggende realiteit.

</ExpandableCard>

## Hoe werken scam-tokens? {#how-do-scam-tokens-work}

Het hele punt van Ethereum is decentralisatie. Dit betekent dat er geen centrale autoriteit is die je activa in beslag kan nemen of kan voorkomen dat je een slim contract gebruikt. Maar dit betekent ook dat oplichters eender welk slim contract kunnen implementeren dat ze maar willen.

<ExpandableCard
title="Wat zijn smart contracts?"
contentPreview=''>

<a href="/developers/docs/smart-contracts/">Slimme contracten</a> zijn de programma's die boven op de Ethereum-blockchain draaien. Elk ERC-20 token is bijvoorbeeld geïmplementeerd als een slim contract.

</ExpandableCard>

Specifiek heeft Arbitrum een contract ingezet dat het `ARB`-symbool gebruikt. Maar dat weerhoudt anderen er niet van om ook een contract te lanceren dat exact hetzelfde of een soortgelijk symbool gebruikt. Degene die het contract schrijft, bepaalt ook wat het contract doet.

## Legitiem lijken {#appearing-legitimate}

Er zijn verschillende trucjes die makers van scam-tokens toepassen om legitiem te lijken.

- **Legitieme naam en symbool**. Zoals eerder vermeld, kunnen ERC-20-contracten hetzelfde symbool en dezelfde naam hebben als andere ERC-20-contracten. Je kunt niet op deze velden rekenen voor veiligheid.

- **Legitieme eigenaren**. Scam-tokens zetten vaak aanzienlijke bedragen over naar adressen waarvan verwacht kan worden dat het legitieme houders van het echte token zijn.

  Laten we bijvoorbeeld nog eens kijken naar `wARB`. [Ongeveer 16% van de tokens](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?a=0x1c8db745abe3c8162119b9ef2c13864cd1fdd72f) worden bewaard op een adres waarvan de publieke tag [Arbitrum Foundation: Deployer](https://etherscan.io/address/0x1c8db745abe3c8162119b9ef2c13864cd1fdd72f) is. Dit is _geen_ vals adres, het is echt het adres dat [het ARB-contract op het Ethereum mainnet](https://etherscan.io/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670) implementeerde.

  Omdat het ERC-20-saldo van een adres deel uitmaakt van de opslag van het ERC-20-contract, kan het gespecificeerd worden als wat de ontwikkelaar van het contract maar wil. Het is ook mogelijk dat een contract overdrachten verbiedt, zodat de legitieme gebruikers niet van die scam-tokens af kunnen komen.

- **Legitieme overdrachten**. _Legitieme eigenaren zouden niet betalen om een scam-token te versturen naar anderen, dus als er overdrachten zijn, moet het legitiem zijn, toch? _ **Fout**. `Overdrachten` worden geproduceerd door het ERC-20-contract. Een oplichter kan gemakkelijk zodanig een contract schrijven dat het deze acties uitvoert.

## Scam-websites {#websites}

Oplichters kunnen ook zeer overtuigende websites maken, soms zelfs exacte klonen van authentieke sites met identieke UI's, maar met subtiele trucjes. Voorbeelden hiervan zijn externe links die legitiem lijken, maar die de gebruiker eigenlijk naar een externe scam-site sturen of onjuiste instructies die de gebruiker ertoe aanzetten zijn sleutels bloot te geven of fondsen te sturen naar het adres van een oplichter.

De beste manier om dit te voorkomen is om de URL van de sites die je bezoekt zorgvuldig te controleren en adressen van bekende authentieke sites op te slaan in je bladwijzers. Dan kun je via je bladwijzers naar de echte site gaan zonder per ongeluk spelfouten te maken of te vertrouwen op externe links.

## Hoe kun je jezelf beschermen? {#protect-yourself}

1. **Controleer het contractadres**. Legitieme tokens komen van legitieme organisaties, je kunt de contractadressen nakijken op de website van de organisatie. Bijvoorbeeld [voor `ARB` kun je hier de legitieme adressen zien](https://docs.arbitrum.foundation/deployment-addresses#token).

2. **Echte tokens hebben liquiditeit**. Een andere optie is om te kijken naar de grootte van de liquiditeitspool op [Uniswap](https://uniswap.org/), een van de meest gebruikte token-ruilprotocollen. Dit protocol werkt met liquiditeitspools, waarin investeerders hun tokens storten in de hoop op een rendement uit handelskosten.

Scam-tokens hebben meestal kleine liquiditeitspools, als die er al zijn, omdat de oplichters geen echte activa willen riskeren. De `ARB`/`ETH` Uniswap-pool bevat bijvoorbeeld ongeveer een miljoen dollar ([zie hier voor de actuele waarde](https://info.uniswap.org/#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)) en het kopen of verkopen van een klein bedrag zal de prijs niet veranderen:

![Een legitiem token kopen](./uniswap-real.png)

Maar bij het kopen van de scam-token `wARB`, zou zelfs een kleine aankoop de prijs met meer dan 90% veranderen:

![Een scam-token kopen](./uniswap-scam.png)

Dit is nog een bewijs dat ons laat zien dat `wARB` waarschijnlijk geen legitiem token is.

3. **Kijk op Etherscan**. Een groot deel van de scam-tokens zijn al geïdentificeerd en gerapporteerd door de community. Zulke tokens zijn [gemarkeerd in Etherscan](https://info.etherscan.com/etherscan-token-reputation/). Hoewel Etherscan geen gezaghebbende bron van waarheid is (het is de aard van gedecentraliseerde netwerken dat er geen gezaghebbende bron voor legitimiteit kan zijn), is het waarschijnlijk dat tokens die door Etherscan worden geïdentificeerd als scams, scams zijn.

   ![Scam-token in Etherscan](./etherscan-scam.png)

## Conclusion {#conclusion}

Zolang er waarde in de wereld is, zullen er oplichters zijn die het voor zichzelf proberen te stelen, en in een gedecentraliseerde wereld is er niemand om je hiertegen te beschermen behalve jezelf. Hopelijk onthoud je deze punten om legitieme tokens van scam-tokens te kunnen onderscheiden:

- Scam-tokens doen zich voor als legitieme tokens, ze kunnen dezelfde naam, hetzelfde symbool, enz. gebruiken.
- Scam-tokens _kunnen niet_ hetzelfde contractadres gebruiken.
- De beste bron voor het adres van het legitieme token is de organisatie waarvan het token is.
- Als dat niet lukt, kun je populaire, vertrouwde applicaties gebruiken zoals [Uniswap](https://app.uniswap.org/#/swap) en [Etherscan](https://etherscan.io/).
