---
title: Accountabstractie
description: Een overzicht van de plannen van Ethereum om gebruikersaccounts eenvoudiger en veiliger te maken
lang: nl
summaryPoints:
  - Accountabstractie maakt het veel gemakkelijker om smart contract-wallets aan te maken
  - Smart contract-wallets maken het veel gemakkelijker om de toegang tot Ethereum-accounts te regelen
  - Verloren en blootgelegde sleutels kunnen worden hersteld met behulp van verschillende back-ups
---

# Accountabstractie {#account-abstraction}

Gebruikers communiceren met Ethereum via **[accounts in externe eigendom (EOA's)](/glossary/#eoa)**. Dit is de enige manier om een transactie te starten of een smart contract uit te voeren. Dit beperkt gebruikers in hun interactie met Ethereum. Hierdoor wordt het bijvoorbeeld moeilijk om batches van transacties uit te voeren en moeten gebruikers altijd een ETH- saldo aanhouden om gas te kunnen dekken.

Accountabstractie is een manier om deze problemen op te lossen door gebruikers in staat te stellen om op een flexibele manier meer beveiliging en betere gebruikerservaringen in hun accounts te programmeren. Dit kan gebeuren door [EOA's te upgraden](https://eips.ethereum.org/EIPS/eip-3074) zodat ze gecontroleerd kunnen worden door smart contracts, of door [smart contracten te upgraden](https://eips.ethereum.org/EIPS/eip-2938) zodat ze transacties kunnen opstarten. Deze opties vereisen allebei wijzigingen in het protocol van Ethereum. Er is ook nog een derde manier, waarbij er een [tweede, apart transactiesysteem](https://eips.ethereum.org/EIPS/eip-4337) wordt toegevoegd dat parallel aan het bestaande protocol mee wordt uitgevoerd. Wat het traject ook is, het eindresultaat is toegang tot Ethereum via smart contract-wallets, die van nature ondersteund worden als onderdeel van het bestaande protocol of via een extra transactienetwerk.

Smart contract-wallets bieden veel voordelen voor de gebruiker, waaronder:

- het definiëren van uw eigen flexibele beveiligingsregels
- het herstellen van uw account als u de sleutels verliest
- het delen van de beveiliging van uw account met vertrouwde apparaten of individuen
- het betalen iemand anders zijn/haar gas of iemand anders het uwe laten betalen
- het bundelen van transacties (bijvoorbeeld een ruil in één keer goedkeuren en uitvoeren)
- meer mogelijkheden voor dapps en ontwikkelaars van wallets om innovatie te brengen in gebruikerservaringen

Deze voordelen worden momenteel niet standaard ondersteund omdat alleen accounts in externe eigendom ([EOA's](/glossary/#eoa)) transacties kunnen starten. EOA's zijn gewoon publiek-persoonlijke sleutelparen. Ze werken als volgt:

- als u de persoonlijke sleutel hebt, kunt u _alles_ doen binnen de regels van de Ethereum Virtual Machine (EVM)
- als u de persoonlijke sleutel niet hebt, kunt u _niets_ doen.

Als u uw sleutels verliest, kunnen ze niet worden teruggevonden en gestolen sleutels geven criminelen direct toegang tot al het geld op een account.

Smart contract-wallets zijn de oplossing voor deze problemen, maar vandaag de dag zijn ze moeilijk te programmeren omdat uiteindelijk elke logica die ze implementeren vertaald moet worden in een set EOA-transacties voordat ze door Ethereum verwerkt kunnen worden. Accountabstractie zorgt ervoor dat smart contracts zelf transacties kunnen starten, zodat elke logica die de gebruiker wil implementeren, gecodeerd kan worden in de smart contract-wallet zelf en uitgevoerd kan worden op Ethereum.

Uiteindelijk verbetert accountabstractie de ondersteuning voor smart contract-wallets, waardoor ze eenvoudiger te bouwen en veiliger te gebruiken zijn. Uiteindelijk kunnen gebruikers met accountabstractie genieten van alle voordelen van Ethereum zonder dat ze de onderliggende technologie kennen of zich er zorgen over hoeven te maken.

## Voorbij seed phrases {#beyond-seed-phrases}

De accounts van tegenwoordig zijn beveiligd met privésleutels die worden berekend op basis van seed phrases. Iedereen die toegang heeft tot een seed phrase kan eenvoudig de persoonlijke sleutel achterhalen die een account beschermt en toegang krijgen tot alle activa die deze beschermt. Als een persoonlijke sleutel en seed phrase verloren gaan, kunnen ze nooit meer teruggehaald worden en worden de activa die ze controleren voor altijd bevroren. Het beveiligen van deze seed phrases is lastig, zelfs voor ervaren gebruikers. Seed phrase-phishing is een van de meest voorkomende manieren waarop gebruikers worden opgelicht.

Accountabstractie zal dit probleem oplossen door een smart contract te gebruiken om activa vast te houden en transacties te autoriseren. Deze smart contracts kunnen vervolgens worden voorzien van aangepaste logica om ze zo veilig mogelijk te maken en zo goed mogelijk af te stemmen op de gebruiker. Uiteindelijk gebruikt u nog steeds persoonlijke sleutels om de toegang tot uw account te beheren, maar met veiligheidsmaatregelen die het eenvoudiger en veiliger maken om ze te beheren.

Er kunnen bijvoorbeeld reservesleutels worden toegevoegd aan een wallet, zodat als u uw hoofdsleutel verliest of per ongeluk blootgeeft, deze kan worden vervangen door een nieuwe, veilige sleutel met toestemming van de reservesleutels. Elk van deze sleutels zou op een andere manier beveiligd kunnen worden, of verdeeld over vertrouwde beheerders. Dit maakt het veel moeilijker voor een crimineel om de volledige controle over uw middelen te krijgen. Zo kunt u bijvoorbeeld toestaan dat transacties van lage waarde worden geverifieerd door een enkele handtekening, terwijl transacties van hogere waarde goedkeuring vereisen van verschillende geverifieerde ondertekenaars. Er zijn ook andere manieren waarop smart contract-wallets u kunnen helpen om criminelen te dwarsbomen. Een toestemmingslijst kan bijvoorbeeld gebruikt worden om elke transactie te blokkeren, tenzij deze naar een vertrouwd adres gaat of geverifieerd is door verschillende van uw vooraf goedgekeurde sleutels.

### Voorbeelden van beveiligingslogica die kan worden ingebouwd in een smart contract-wallet:

- **Multisig-autorisatie**: u kunt autorisatiegegevens delen met verschillende vertrouwde personen of apparaten. Vervolgens kan het contract zo worden geconfigureerd dat transacties van meer dan een vooraf ingestelde waarde toestemming vereisen van een bepaald deel (bijv. 3/5) van de vertrouwde partijen. Voor transacties van hoge waarde kan bijvoorbeeld goedkeuring nodig zijn van zowel een mobiel apparaat als een hardwarewallet, of handtekeningen van accounts die zijn verdeeld onder vertrouwde familieleden.
- **Bevriezen van accounts**: als een apparaat zoekraakt of in gevaar komt, kan het account worden vergrendeld vanaf een ander geautoriseerd apparaat, waardoor de bezittingen van de gebruiker worden beschermd.
- **Accountherstel**: apparaat kwijt of wachtwoord vergeten? In het huidige paradigma betekent dit dat uw activa voor altijd bevroren kunnen worden. Met een smart contract-wallet kunt u een toestemmingslijst van accounts instellen die nieuwe apparaten kunnen autoriseren en toegang opnieuw kunnen instellen.
- **Transactielimieten instellen**: geef dagelijkse drempels op voor hoeveel waarde er in een dag/week/maand kan worden overgeschreven van het account. Dit betekent dat als een aanvaller toegang krijgt tot uw account, hij/zij niet alles in één keer kan buitmaken en dat u de mogelijkheid hebt om de toegang te bevriezen en opnieuw in te stellen.
- **Toestemmingslijsten maken**: sta alleen transacties toe naar bepaalde adressen waarvan u weet dat ze veilig zijn. Dit betekent dat _zelfs als_ uw persoonlijke sleutel wordt gestolen, de aanvaller alleen geld kan sturen naar bestemmingsaccounts op uw lijst. Deze toestemmingslijsten vereisen verschillende handtekeningen om ze te wijzigen, zodat een aanvaller zijn/haar eigen adres niet aan de lijst kan toevoegen tenzij hij/zij toegang heeft tot verschillende van uw reservesleutels.

## Betere gebruikerservaring {#better-user-experience}

Accountabstractie zorgt voor een **betere algemene gebruikerservaring** en een **betere beveiliging** omdat het ondersteuning toevoegt voor smart contract-wallets op protocolniveau. De belangrijkste reden hiervoor is dat het ontwikkelaars van smart contracts, wallets en applicaties veel meer vrijheid zal geven om innovatie door te voeren in de gebruikerservaring op manieren die we nu misschien nog niet kunnen voorspellen. Enkele voor de hand liggende verbeteringen die samengaan met accountabstractie zijn het bundelen van transacties voor snelheid en efficiëntie. Een eenvoudige omruiling zou bijvoorbeeld in één klik moeten kunnen, maar vandaag de dag moeten er verschillende transacties worden ondertekend om de uitgaven van individuele tokens goed te keuren voordat de omruiling wordt uitgevoerd. Abstractie van accounts neemt dit probleem weg door het bundelen van transacties mogelijk te maken. Bovendien zou de gebundelde transactie precies de juiste waarde van tokens kunnen goedkeuren die nodig is voor elke transactie en vervolgens de goedkeuringen herroepen nadat de transactie is voltooid, wat zorgt voor extra veiligheid.

Het gasbeheer is ook sterk verbeterd met accountabstractie. Applicaties kunnen niet alleen aanbieden om de gaskosten van hun gebruikers te betalen, maar gaskosten kunnen ook worden betaald in andere tokens dan ETH, waardoor gebruikers geen ETH-saldo meer hoeven aan te houden voor het bekostigen van transacties. Dit werkt door de tokens van de gebruiker om te ruilen voor ETH binnen het contract en vervolgens de ETH te gebruiken om te betalen voor gas.

<ExpandableCard title="Hoe kan accountabstractie helpen bij gas?" eventCategory="/roadmap/account-abstraction" eventName="clicked how can account abstraction help with gas?">

Gasbeheer is een van de primaire problemen voor gebruikers van Ethereum, voornamelijk omdat ETH de enige activa is waarmee transacties kunnen worden betaald. Stel u voor dat u een wallet hebt met een USDC-saldo, maar geen ETH. U kunt die USDC-tokens niet verplaatsen of omruilen omdat u geen gas kunt betalen. U kunt de USDC ook niet omruilen voor ETH, want dat op zich kost al gas. Om het probleem op te lossen, zou u meer ETH naar uw account moeten sturen vanaf een crypto-uitwisseling of een ander adres. Met smart contract-wallets kunt u simpelweg gas in USDC betalen, waardoor uw account vrijkomt. U hoeft niet langer een ETH-saldo op al uw accounts aan te houden.

Door accountabstractie kunnen dapp-ontwikkelaars ook creatief zijn met gasbeheer. U kunt bijvoorbeeld beginnen met uw favoriete DEX elke maand een vast bedrag te betalen voor onbeperkte transacties. Dapps kunnen aanbieden om al uw gaskosten voor u te betalen als beloning voor het gebruik van hun platform, of als een onboarding-aanbod. Het wordt veel gemakkelijker voor ontwikkelaars om te innoveren op het gebied van gas als smart contract-wallets worden ondersteund op protocolniveau.

</ExpandableCard>

Vertrouwde sessies zijn ook potentieel transformatief voor gebruikerservaringen, vooral bij toepassingen zoals gaming, waar grote aantallen kleine transacties in korte tijd moeten worden goedgekeurd. Elke transactie afzonderlijk goedkeuren zou de spelbeleving verstoren, maar permanente goedkeuring is onveilig. Een smart contract-wallet kan bepaalde transacties goedkeuren voor een vaste tijd, tot een specifieke waarde of alleen naar bepaalde adressen.

Het kan ook interessant zijn om na te denken over hoe aankopen kunnen veranderen door accountabstractie. Vandaag de dag moet elke transactie worden goedgekeurd en uitgevoerd vanaf een wallet die van tevoren is voorzien van een voldoende hoeveelheid van het juiste token. Dankzij accountabstractie zou de ervaring meer kunnen lijken op het vertrouwde online winkelen, waarbij een gebruiker een "mandje" met artikelen kan vullen en één keer kan klikken om alles in één keer te kopen, waarbij alle benodigde logica wordt afgehandeld door het contract, niet door de gebruiker.

Dit zijn slechts een paar voorbeelden van hoe gebruikerservaringen op een hoger niveau kunnen worden gebracht door accountabstractie, maar er zullen nog veel meer voorbeelden volgen die we ons nog niet kunnen voorstellen. Accountabstractie bevrijdt ontwikkelaars van de beperkingen van de huidige EOA's, laat hen toe om de goede aspecten van web2 naar web3 te halen zonder zichzelf op te offeren. Bovendien kunnen ze creatief hacken om inventieve nieuwe gebruikerservaringen te creëren.

## Hoe wordt accountabstractie geïmplementeerd? {#how-will-aa-be-implemented}

Smart contract-wallets bestaan nu al, maar zijn lastig te implementeren omdat de EVM ze niet ondersteunt. In plaats daarvan vertrouwen ze op het gebruik van relatief complexe code rond standaard Ethereum-transacties. Ethereum kan dit veranderen door smart contracts de mogelijkheid te bieden om transacties te starten, waarbij de benodigde logica wordt afgehandeld in smart contracts van Ethereum in plaats van off-chain. Door logica in smart contracts te integreren, wordt de decentralisatie van Ethereum ook vergroot, omdat er geen “relayers” meer nodig zijn die door walletontwikkelaars worden uitgevoerd om berichten die door de gebruiker zijn ondertekend, te vertalen naar reguliere Ethereum-transacties.

<ExpandableCard title="EIP-2771: accountabstractie met metatransacties" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-2771: account abstraction using meta-transactions">

EIP-2771 introduceert het concept van metatransacties waarmee derde partijen kunnen betalen voor de gaskosten van een gebruiker zonder wijzigingen aan te brengen in het Ethereumprotocol. Het idee is dat transacties ondertekend door een gebruiker naar een "Forwarder"-contract worden gestuurd. De forwarder is een vertrouwde entiteit die controleert of transacties geldig zijn voordat hij/zij ze doorstuurt naar een gasrelay. Dit gebeurt off-chain, zodat er geen gas hoeft te worden betaald. De gasrelay geeft de transactie door aan een "ontvanger"-contract, dat het benodigde gas betaalt om de transactie uitvoerbaar te maken op Ethereum. De transactie wordt uitgevoerd als de "Forwarder" bekend is bij en vertrouwd wordt door de "Ontvanger". Dit model maakt het gemakkelijk voor ontwikkelaars om gasloze transacties voor gebruikers te implementeren.

</ExpandableCard>

<ExpandableCard title="EIP-4337: accountabstractie zonder het protocol van Ethereum te veranderen" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-4337: account abstraction without changing the Ethereum protocol">

EIP-4337 is de eerste stap in de richting van een eigen smart contract-walletondersteuning op een gedecentraliseerde manier <em>zonder dat er veranderingen nodig zijn in het protocol van Ethereum</em>. In plaats van de consensuslaag aan te passen om smart contract-wallets te ondersteunen, wordt er een nieuw systeem toegevoegd los van het normale transactie-gossipprotocol. Dit systeem op een hoger niveau is gebouwd rond een nieuw object dat een <code>UserOperation</code> heet. Dit verpakt acties van een gebruiker samen met de relevante handtekeningen. Deze <code>UserOperation</code>-objecten worden dan uitgezonden naar een speciale mempool waar validators ze kunnen verzamelen in een "bundeltransactie". De bundeltransactie staat voor een opeenvolging van vele individuele <code>UserOperations</code> en kan worden opgenomen in Ethereumblocks zoals een normale transactie, en wordt opgepikt door validators die een soortgelijk selectiemodel gebruiken dat de kosten maximaliseert.

De manier waarop wallets werken gaat wellicht ook veranderen onder EIP-4337. In plaats van dat elke wallet de gebruikelijke maar complexe veiligheidslogica opnieuw moet implementeren, worden deze functies uitbesteed aan een globaal walletcontract dat bekend staat als het &quot;entry point&quot;. Dit zou handelingen zoals het betalen van kosten en het uitvoeren van EVM-code op zich nemen, zodat walletontwikkelaars zich kunnen richten op het leveren van een uitstekende gebruikerservaring.

<strong>Opgelet:</strong> het EIP 4337 entry point-contract werd op 1 maart 2023 uitgerold naar het hoofdnet van Ethereum. U kunt het contract bekijken op <a href="https://etherscan.io/address/0x0576a174D229E3cFA37253523E645A78A0C91B57">Etherscan</a>.

</ExpandableCard>

<ExpandableCard title="EIP-2938: het protocol van Ethereum veranderen om accountabstractie te ondersteunen" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-2938: changing the Ethereum protocol to support account abstraction">

<a href="https://eips.ethereum.org/EIPS/eip-2938">EIP-2938</a> is bedoeld om het protocol van Ethereum bij te werken door een nieuw transactietype te introduceren, <code>AA_TX_TYPE</code> dat drie velden bevat: <code>nonce</code>, <code>target</code> en <code>data</code>, waarbij <code>nonce</code> een transactieteller is, <code>target</code> het entry point-contractadres is en <code>data</code> de EVM-bytecode is. Om deze transacties uit te voeren, moeten twee nieuwe instructies (bekend als opcodes) worden toegevoegd aan de EVM: <code>NONCE</code> en <code>PAYGAS</code>. De <code>NONCE</code>-opcode houdt de transactievolgorde bij en <code>PAYGAS</code> berekent en haalt het gas dat nodig is om de transactie uit te voeren uit het saldo van het contract. Met deze nieuwe functies kan Ethereum smart contract-wallets volledig zelfstandig ondersteunen, omdat de benodigde infrastructuur is ingebouwd in het protocol van Ethereum.

Let op: EIP-2938 is momenteel niet actief. De gemeenschap geeft momenteel de voorkeur aan EIP-4337 omdat het geen wijzigingen aan het protocol vereist.

</ExpandableCard>

<ExpandableCard title="EIP-3074: accounts in externe eigendom upgraden voor accountabstractie" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-3074: upgrading externally-owned accounts for account abstraction">

<a href="https://eips.ethereum.org/EIPS/eip-3074">EIP-3074</a> heeft als doel om de accounts in externe eigendom van Ethereum te updaten door ze de controle te laten delegeren aan een smart contract. Dit betekent dat de logica van smart contracts de transacties die afkomstig zijn van een EOA zou kunnen goedkeuren. Hierdoor zouden functies zoals gassponsoring en gebundelde transacties mogelijk worden. Om dit mogelijk te maken, moeten er twee nieuwe opcodes worden toegevoegd aan de EVM: <code>AUTH</code> en <code>AUTHCALL</code>. Met EIP-3074 worden de voordelen van een smart contract-wallet beschikbaar gemaakt <em>zonder dat er een contract nodig is</em>. Daarom worden de transacties afgehandeld door een specifiek type statusloos, vertrouwenloos, niet te upgraden contract dat bekend staat als een “invoker”.

Let op: EIP-3074 is momenteel niet actief. De gemeenschap geeft momenteel de voorkeur aan EIP-4337 omdat het geen wijzigingen aan het protocol vereist.

</ExpandableCard>

## Huidige vooruitgang {#current-progress}

Smart contract-wallets zijn al beschikbaar, maar er zijn meer upgrades nodig om ze zo gedecentraliseerd en toestemmingsvrij mogelijk te maken. EIP-4337 is een uitgewerkt voorstel dat geen veranderingen aan het protocol van Ethereum vereist, dus het is mogelijk dat dit snel geïmplementeerd kan worden. Upgrades die het protocol van Ethereum veranderen, zijn momenteel echter nog niet in een actieve ontwikkelingsfase, dus het kan veel langer duren voordat deze veranderingen worden beschikbaar worden. Het is ook mogelijk dat accountabstractie voldoende wordt bereikt door EIP-4337 dat er nooit protocolwijzigingen nodig zijn.

## Verder lezen {#further-reading}

- [erc4337.io](https://www.erc4337.io/)
- [Paneldiscussie over accountabstractie op Devcon Bogota](https://www.youtube.com/watch?app=desktop&v=WsZBymiyT-8)
- [“Waarom accountabstractie een gamechanger is voor dapps” op Devcon Bogota](https://www.youtube.com/watch?v=OwppworJGzs)
- ["Accountabstractie ELI5" op Devcon Bogota](https://www.youtube.com/watch?v=QuYZWJj65AY)
- [Vitaliks noties "De weg naar accountabstractie"](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Vitaliks blogpost over wallets die kunnen hersteld worden via social media](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Notities EIP-2938](https://hackmd.io/@SamWilsn/ryhxoGp4D#What-is-EIP-2938)
- [Documentatie EIP-2938](https://eips.ethereum.org/EIPS/eip-2938)
- [Notities EIP-4337](https://medium.com/infinitism/erc-4337-account-abstraction-without-ethereum-protocol-changes-d75c9d94dc4a)
- [Documentatie EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
- [Documentatie EIP-2771](https://eips.ethereum.org/EIPS/eip-2771)
- ["Basisprincipes van accountabstractie" -- Wat is accountabstractie Deel I](https://www.alchemy.com/blog/account-abstraction)
