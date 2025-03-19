---
title: Smart contract veiligheid
description: Een overzicht van richtlijnen voor het bouwen van veilige smart contracts voor Ethereum
lang: nl
---

Smart contracts zijn extreem flexibel en kunnen grote hoeveelheden waarden en gegevens beheren, terwijl ze onveranderlijke logica uitvoeren op basis van code die op de blockchain is geïnstalleerd. Hierdoor is een levendig ecosysteem ontstaan van vertrouwensloze en gedecentraliseerde toepassingen die veel voordelen bieden ten opzichte van oudere systemen. Ze vormen ook kansen voor aanvallers die winst willen maken door kwetsbaarheden in smart contracts uit te buiten.

Openbare blockchains, zoals Ethereum, maken de beveiliging van smart contracts nog ingewikkelder. Ingezette contractcode kan _gewoonlijk_ niet worden gewijzigd om beveiligingsproblemen op te lossen, terwijl activa die zijn gestolen van smart contracts extreem moeilijk te traceren zijn en meestal niet kunnen worden teruggehaald vanwege de onveranderlijkheid.

Hoewel de cijfers variëren, wordt geschat dat het totale bedrag aan waarde dat gestolen of verloren is gegaan door beveiligingsfouten in smart contracts al gauw meer dan $1 miljard bedraagt. Hieronder vallen ook opvallende incidenten, zoals de [DAO-hack](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/) (3,6M ETH gestolen, met een waarde van meer dan 1 miljard dollar in de huidige prijzen), [Parity multisig-wallethack](https://www.coindesk.com/30-million-ether-reported-stolen-parity-wallet-breach) ($30M verloren aan hackers), en het [Parity frozen wallet-probleem](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether) (meer dan $300M in ETH voor altijd vergrendeld).

De bovengenoemde problemen maken het noodzakelijk voor ontwikkelaars om te investeren in het bouwen van veilige, robuuste en veerkrachtige smart contracts. De beveiliging van smart contracts is een serieuze zaak en iedere ontwikkelaar doet er goed aan om dit te leren. Deze gids behandelt de beveiligingsaspecten voor Ethereum-ontwikkelaars en gaat in op bronnen voor het verbeteren van de beveiliging van smart contracts.

## Vereisten {#prerequisites}

Zorg ervoor dat u zich eerst inleest over de [basisprincipes van de ontwikkeling van smart contracts](/developers/docs/smart-contracts/) voordat u met de beveiliging ervan begint.

## Richtlijnen voor het bouwen van veilige smart contracts met Ethereum {#smart-contract-security-guidelines}

### 1. Ontwerp de juiste toegangscontroles {#design-proper-access-controls}

In smart contracts kunnen functies met de markering `public` of `external` worden aangeroepen door accounts in externe eigendom (EOA's) of contractaccounts. Het is noodzakelijk om de openbare zichtbaarheid van functies op te geven als u wilt dat anderen kunnen communiceren met uw contract. Functies met de markering `private` kunnen echter alleen worden opgeroepen door functies binnen het smart contract, en niet door externe accounts. Elke netwerkdeelnemer toegang geven tot contractfuncties kan problemen veroorzaken, vooral als dit betekent dat iedereen gevoelige handelingen kan uitvoeren (zoals het "minten" van nieuwe tokens).

Om ongeoorloofd gebruik van smart contract-functies te voorkomen, is het noodzakelijk om veilige toegangscontroles te implementeren. Mechanismen voor toegangscontrole beperken de mogelijkheid om bepaalde functies in een smart contract te gebruiken tot goedgekeurde entiteiten, zoals accounts die verantwoordelijk zijn voor het beheer van het contract. Het **Ownable-patroon** en **rolgebaseerde controle** zijn twee patronen die nuttig zijn voor het implementeren van toegangscontrole in smart contracts:

#### Ownable-patroon {#ownable-pattern}

In het Ownable-patroon wordt een adres ingesteld als de “eigenaar” van het contract tijdens het aanmaken van het contract. Beschermde functies krijgen een `OnlyOwner`-modifier, die ervoor zorgt dat het contract de identiteit van het oproepende adres verifieert voordat de functie wordt uitgevoerd. Oproepen naar beschermde functies vanaf andere adressen dan de eigenaar van het contract worden altijd teruggedraaid, waardoor ongewenste toegang wordt voorkomen.

#### Op rol gebaseerde toegangscontrole {#role-based-access-control}

Het registreren van een enkel adres als `Owner` in een smart contract brengt het risico van centralisatie met zich mee en vormt een single point-of-failure. Als de accountsleutels van de eigenaar in gevaar komen, kunnen aanvallers het contract dat eigendom is van de eigenaar aanvallen. Daarom kan het gebruik van een op rollen gebaseerd toegangscontrolepatroon met verschillende beheerdersaccounts een betere optie zijn.

Bij een op rol gebaseerd toegangsbeheer wordt de toegang tot gevoelige functies verdeeld over een reeks vertrouwde deelnemers. Eén account kan bijvoorbeeld verantwoordelijk zijn voor het minten van tokens, terwijl een andere account upgrades uitvoert of het contract pauzeert. Door toegangscontrole op deze manier te decentraliseren, worden single points of failure geëlimineerd en worden aannames ten aanzien van vertrouwen van gebruikers verminderd.

##### Wallets met verschillende handtekeningen gebruiken

Een andere benadering voor het implementeren van een veilige toegangscontrole is het gebruik van een [account met verschillende handtekeningen](/developers/docs/smart-contracts/#multisig) om een contract te beheren. In tegenstelling tot een gewone EOA, zijn accounts met verschillende handtekeningen eigendom van verschillende entiteiten en vereisen ze handtekeningen van een minimum aantal accounts. Bijvoorbeeld tussen de 3 en de 5 om transacties uit te voeren.

Het gebruik van een multisig (multi signature) voor toegangscontrole zorgt voor een extra beveiligingslaag, omdat acties op het doelcontract toestemming vereisen van verschillende partijen. Dit is vooral handig als het Ownable-patroon gebruikt moet worden, omdat het dan voor een aanvaller of kwaadwillende insider moeilijker wordt om gevoelige contractfuncties te manipuleren voor kwaadwillende doeleinden.

### 2. Gebruik de elementen require(), assert() en revert() om contracthandelingen te bewaken {#use-require-assert-revert}

Zoals gezegd kan iedereen publieke functies in uw smart contract oproepen zodra het is ingezet op de blockchain. Omdat u niet van tevoren kunt weten hoe externe accounts met een contract zullen omgaan, is het ideaal om interne beveiligingen tegen problematische handelingen te implementeren voordat u het contract inzet. U kunt correct gedrag afdwingen in smart contracts door de elementen `require()`, `assert()`, en `revert()` te gebruiken om uitzonderingen te activeren en statusveranderingen terug te draaien als de uitvoering niet aan bepaalde eisen voldoet.

**`require()`**: `require` worden gedefinieerd aan het begin van functies en zorgen ervoor dat aan vooraf gedefinieerde voorwaarden wordt voldaan voordat de opgeroepen functie wordt uitgevoerd. Een `require`-element kan worden gebruikt om gebruikersinvoer te valideren, toestandsvariabelen te controleren of de identiteit van het oproepende account te verifiëren voordat er verder wordt gegaan met een functie.

**`assert()`**: `assert()` wordt gebruikt om interne fouten op te sporen en te controleren op schendingen van “invarianten” in uw code. Een invariant is een logische bewering over de status van een contract die waar moet zijn voor alle functie-uitvoeringen. Een voorbeeld van een invariant is het maximale totale aanbod of saldo van een tokencontract. Het gebruik van `assert()` zorgt ervoor dat uw contract nooit een kwetsbare status bereikt, en als dat toch gebeurt, worden alle wijzigingen aan statusvariabelen teruggedraaid.

**`revert()`**: `revert()` kan worden gebruikt in een if-else-element dat een uitzondering activeert als niet aan de vereiste voorwaarde wordt voldaan. Het voorbeeldcontract hieronder gebruikt `revert()` om de uitvoering van functies te bewaken:

```
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Not enough Ether provided.");
        // Perform the purchase.
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

### 3. Smart contracts testen en de juistheid van de code verifiëren {#test-smart-contracts-and-verify-code-correctness}

De onveranderlijkheid van code die wordt uitgevoerd in de [Ethereum Virtual Machine](/developers/docs/evm/) betekent dat smart contracts een hoger niveau van kwaliteitsbeoordeling vereisen tijdens de ontwikkelingsfase. Door uw contract uitgebreid te testen en te observeren op onverwachte resultaten, verbetert u de beveiliging aanzienlijk en beschermt u uw gebruikers op lange termijn.

De gebruikelijke methode is om kleine unit tests te schrijven met behulp van nepgegevens die het contract naar verwachting zal ontvangen van gebruikers. [Unit testing](/developers/docs/smart-contracts/testing/#unit-testing) is goed voor het testen van de functionaliteit van bepaalde functies en om ervoor te zorgen dat een smart contract werkt zoals verwacht.

Helaas is unit testing minimaal effectief voor het verbeteren van de veiligheid van smart contracts als het geïsoleerd wordt gebruikt. Een unit test kan bewijzen dat een functie correct wordt uitgevoerd voor nepgegevens, maar unit tests zijn slechts zo effectief als de tests die worden geschreven. Dit maakt het moeilijk om gemiste randgevallen en kwetsbaarheden op te sporen die de veiligheid van uw smart contract kunnen doorbreken.

Een betere aanpak is om unit testing te combineren met eigendomsgerichte testing, uitgevoerd met [statische en dynamische analyse](/developers/docs/smart-contracts/testing/#static-dynamic-analysis). Statische analyse vertrouwt op representaties op laag niveau, zoals [controlestroomdiagrammen](https://en.wikipedia.org/wiki/Control-flow_graph) en [abstracte syntaxistrees](https://deepsource.io/glossary/ast/) om bereikbare programmatoestanden en uitvoeringspaden te analyseren. Ondertussen voeren dynamische analysetechnieken, zoals [smart contract fuzzing](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry), contractcode uit met willekeurige invoerwaarden om bewerkingen te detecteren die de beveiligingseigenschappen schenden.

[Formele verificatie](/developers/docs/smart-contracts/formal-verification) is een andere techniek voor het verifiëren van beveiligingseigenschappen in smart contracts. In tegenstelling tot gewone tests, kan formele verificatie onomstotelijk de afwezigheid van fouten in een smart contract aantonen. Dit wordt bereikt door een formele specificatie te creëren die de gewenste beveiligingseigenschappen vastlegt en te bewijzen dat een formeel model van de contracten aan deze specificatie voldoet.

### 4. Vraag om een onafhankelijke beoordeling van uw code {#get-independent-code-reviews}

Na het testen van uw contract is het goed om anderen te vragen de broncode te controleren op eventuele beveiligingsproblemen. Tests zullen niet elke fout in een smart contract blootleggen, maar een onafhankelijke beoordeling vergroot de kans op het ontdekken van kwetsbaarheden.

#### Audits {#audits}

Het laten uitvoeren van een audit voor uw smart contract is een mogelijkheid om een onafhankelijke codebeoordeling uit te voeren. Auditors spelen een belangrijke rol om ervoor te zorgen dat smart contracts veilig zijn en vrij van kwaliteitsdefecten en ontwerpfouten.

Toch moet u audits niet zien als een wondermiddel. Audits op smart contracts kunnen niet elke bug opsporen en zijn vooral bedoeld voor een extra beoordelingsronde, die kan helpen bij het opsporen van problemen die ontwikkelaars hebben gemist tijdens de initiële ontwikkeling en het testen. U moet ook best practices volgen voor het werken met auditors, zoals het goed documenteren van code en het toevoegen van inline opmerkingen, om het voordeel van een audit op uw smart contract te maximaliseren.

- [Auditingtips en -trucs voor smart contracts](https://twitter.com/tinchoabbate/status/1400170232904400897) - _@tinchoabbate_
- [Haal het meeste uit uw audit](https://inference.ag/blog/2023-08-14-tips/) - _Inference_

#### Bug bounties {#bug-bounties}

Een bug bounty programma organiseren is een andere manier om externe codebeoordelingen te implementeren. Een bug bounty is een financiële beloning die wordt gegeven aan individuele personen (meestal whitehat hackers) die kwetsbaarheden ontdekken in een applicatie.

Als bug bounties op de juiste manier worden gebruikt, geven ze leden van de hackergemeenschap een stimulans om uw code te inspecteren op kritieke fouten. Een voorbeeld uit het echte leven is de “infinite money bug” waarmee een aanvaller een onbeperkte hoeveelheid Ether zou kunnen creëren op [Optimism](https://www.optimism.io/), een protocol op [laag 2](/layer-2/) dat functioneert op Ethereum. Gelukkig ontdekte een whitehat hacker [de fout](https://www.saurik.com/optimism.html) en bracht deze het team op de hoogte. [Zo verdiende de hacker een groot bedrag](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/).

Een nuttige strategie is om de uitbetaling van een bug bounty-programma vast te stellen in verhouding tot het bedrag dat op het spel staat. Deze benadering, die wordt omschreven als de “[scaling bug bounty](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)”, biedt een financiële stimulans voor individuen om kwetsbaarheden op verantwoorde wijze op te sporen in plaats van ze uit te buiten.

### 5. Volg best practices tijdens de ontwikkeling van smart contracts {#follow-smart-contract-development-best-practices}

Het bestaan van audits en bug bounties is geen excuus voor uw verantwoordelijkheid om code van hoge kwaliteit te schrijven. Een goede beveiliging van smart contracts begint met het volgen van de juiste ontwerp- en ontwikkelingsprocessen:

- Sla alle code op in een versiebeheersysteem, zoals git

- Doe alle code-aanpassingen via pull requests

- Zorg ervoor dat pull requests minstens één onafhankelijke reviewer hebben. Als u alleen aan een project werkt, probeer dan andere ontwikkelaars te vinden en wissel code-reviews uit

- Gebruik een [ontwikkelomgeving](/developers/docs/frameworks/) voor het testen, compileren en implementeren van smart contracts

- Voer uw code uit op standaard codeanalyse-programma's, zoals [Cyfrin Aaderyn](https://github.com/Cyfrin/aderyn), Mythril en Slither. Idealiter zou u dit moeten doen voordat elke pull request wordt samengevoegd en de verschillen in uitvoer vergelijken

- Zorg ervoor dat uw code zonder fouten wordt gecompileerd en dat de Solidity-compiler geen waarschuwingen afgeeft

- Documenteer uw code goed (met [NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html)) en beschrijf details over de contractarchitectuur in eenvoudig te begrijpen taal. Dit maakt het gemakkelijker voor anderen om uw code te controleren en te beoordelen.

### 6. Implementeer robuuste noodherstelplannen {#implement-disaster-recovery-plans}

Het ontwerpen van veilige toegangscontroles, het implementeren van functiemodifiers en andere suggesties kunnen de veiligheid van smart contracts verbeteren, maar ze kunnen de mogelijkheid van kwaadaardige uitbuitingen niet uitsluiten. Het bouwen van veilige smart contracts vereist “voorbereiding op mislukking”. Daarnaast moet er een noodplan bestaan om effectief te kunnen reageren op aanvallen. Een goed rampherstelplan bevat enkele of alle van de volgende onderdelen:

#### Contractupgrades {#contract-upgrades}

Hoewel smart contracts van Ethereum standaard onveranderlijk zijn, is het mogelijk om een zekere mate van veranderlijkheid te verkrijgen door upgradepatronen te gebruiken. Het upgraden van contracten is nodig in gevallen waar een kritieke fout uw oude contract onbruikbaar maakt en het inzetten van nieuwe logica de meest haalbare optie is.

Contractupgrademechanismes werken verschillend, maar het “proxypatroon” is één van de meer populaire benaderingen voor het upgraden van smart contracts. [Proxypatronen](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern) splitsen de status en logica van een applicatie op tussen _twee_ contracten. Het eerste contract (een “proxycontract” genoemd) slaat statusvariabelen op (bijv. gebruikerssaldi), terwijl het tweede contract (een “logisch contract” genoemd) de code bevat voor het uitvoeren van contractfuncties.

Accounts werken samen met het proxycontract, dat alle functie-oproepen doorstuurt naar het logisch contract met behulp van de oproep op laag niveau [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries). In tegenstelling tot een gewone berichtoproep, zorgt `delegatecall()` ervoor dat de code die wordt uitgevoerd op het adres van het logische contract wordt uitgevoerd in de context van het oproepende contract. Dit betekent dat het logische contract altijd naar de opslag van de proxy schrijft (in plaats van de eigen opslag) en dat de oorspronkelijke waarden van `msg.sender` en `msg.value` behouden blijven.

Het delegeren van oproepen naar het logische contract vereist het opslaan van het adres in de opslag van het proxycontract. Daarom is het upgraden van de logica van het contract slechts een kwestie van een ander logisch contract inzetten en het nieuwe adres opslaan in het proxycontract. Aangezien volgende oproepen naar het proxycontract automatisch worden doorgestuurd naar het nieuwe logische contract, hebt u het contract “geüpgraded” zonder de code te wijzigen.

[Meer over het upgraden van contracten](/developers/docs/smart-contracts/upgrading/).

#### Noodstops {#emergency-stops}

Zoals gezegd kunnen uitgebreide controles en tests onmogelijk alle bugs in een smart contract opsporen. Als er na de inzet een kwetsbaarheid in uw code verschijnt, is patchen onmogelijk omdat u de code die op het contractadres wordt uitgevoerd niet kunt wijzigen. Ook kunnen upgrademechanismen (zoals proxypatronen) tijd kosten om te implementeren (ze vereisen vaak goedkeuring van verschillende partijen), wat aanvallers alleen maar meer tijd geeft om meer schade aan te richten.

De nucleaire optie is om een “noodstop”-functie te implementeren die oproepen naar kwetsbare functies in een contract blokkeert. Noodstops bestaan meestal uit de volgende onderdelen:

1. Een globale Booleaanse variabele die aangeeft of het smart contract zich in een gestopte status bevindt of niet. Deze variabele wordt ingesteld op `false` bij het opzetten van het contract, maar zal terugkeren naar `true` zodra het contract wordt gestopt.

2. Functies die in hun uitvoering verwijzen naar de Booleaanse variabele. Dergelijke functies zijn toegankelijk als het smart contract niet gestopt is, en worden ontoegankelijk als de noodstopfunctie geactiveerd wordt.

3. Een entiteit die toegang heeft tot de noodstopfunctie, die de Booleaanse variabele op `true` zet. Om kwaadaardige acties te voorkomen, kunnen oproepen naar deze functie beperkt worden tot een vertrouwd adres (bijv. de eigenaar van het contract).

Zodra het contract de noodstop activeert, kunnen bepaalde functies niet meer worden opgeroepen. Dit wordt bereikt door selectiefuncties te omhullen met een modifier die verwijst naar de globale variabele. Hieronder staat [een voorbeeld](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol) dat een implementatie van dit patroon in contracten beschrijft:

```solidity
// This code has not been professionally audited and makes no promises about safety or correctness. Use at your own risk.

contract EmergencyStop {

    bool isStopped = false;

    modifier stoppedInEmergency {
        require(!isStopped);
        _;
    }

    modifier onlyWhenStopped {
        require(isStopped);
        _;
    }

    modifier onlyAuthorized {
        // Check for authorization of msg.sender here
        _;
    }

    function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }

    function deposit() public payable stoppedInEmergency {
        // Deposit logic happening here
    }

    function emergencyWithdraw() public onlyWhenStopped {
        // Emergency withdraw happening here
    }
}
```

Dit voorbeeld toont de basisfuncties van noodstops:

- `isStopped` is een Boolean die evalueert naar `false` aan het begin en `true` wanneer het contract in noodmodus gaat.

- De functiemodifiers `onlyWhenStopped` en `stoppedInEmergency` controleren de variabele `isStopped`. `stoppedInEmergency` wordt gebruikt om functies te controleren die ontoegankelijk moeten zijn als het contract kwetsbaar is (bv. `deposit()`). Oproepen naar deze functies worden gewoon teruggedraaid.

`onlyWhenStopped` wordt gebruikt voor functies die oproepbaar moeten zijn tijdens een noodgeval (bv. `emergencyWithdraw()`). Dergelijke functies kunnen helpen om de situatie op te lossen, vandaar hun uitsluiting van de lijst met “beperkte functies”.

Het gebruik van een noodstopfunctie zorgt voor een effectieve noodoplossing voor het omgaan met ernstige kwetsbaarheden in uw smart contract. Het vergroot echter de noodzaak voor gebruikers om ontwikkelaars te vertrouwen dat ze het niet om zelfzuchtige redenen activeren. Daarom is het mogelijk om de controle over de noodstop te decentraliseren door deze te onderwerpen aan een on-chain stemmechanisme, tijdslot of goedkeuring van een multisig-wallet.

#### Evenementenmonitoring {#event-monitoring}

Met [Evenementen](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events) kunt u oproepen naar functies van smart contracts opvolgen en wijzigingen aan statusvariabelen controleren. Het is ideaal om uw smart contract te programmeren om een evenement uit te zenden wanneer een partij een veiligheidskritieke actie uitvoert (bv. middelen opnemen).

Gebeurtenissen loggen en ze off-chain monitoren biedt inzicht in contracthandelingen en helpt bij het sneller ontdekken van kwaadaardige acties. Dit betekent dat uw team sneller kan reageren op hacks en actie kan ondernemen om de gevolgen voor gebruikers te beperken, zoals het pauzeren van functies of het uitvoeren van een upgrade.

U kunt ook kiezen voor een kant-en-klare bewakingstool die automatisch waarschuwingen doorstuurt wanneer iemand interactie heeft met uw contracten. Met deze tools kunt u aangepaste waarschuwingen creëren op basis van verschillende triggers, zoals transactievolume, frequentie van functieoproepen of de betrokken specifieke functies. U kunt bijvoorbeeld een waarschuwing programmeren die wordt weergegeven wanneer het opgenomen bedrag in een enkele transactie een bepaalde drempel overschrijdt.

### 7. Ontwerp van veilige bestuurssystemen {#design-secure-governance-systems}

Mogelijk wilt u uw applicatie decentraliseren door de controle over de belangrijkste smart contracts over te dragen aan leden van de gemeenschap. In dit geval bevat het smart contractsysteem een bestuursmodule. Dit is een mechanisme waarmee leden van de gemeenschap bestuurlijke acties kunnen goedkeuren via een on-chain bestuurssysteem. Er kan bijvoorbeeld door tokenhouders worden gestemd over een voorstel om een proxycontract te upgraden naar een nieuwe implementatie.

Gedecentraliseerd bestuur kan gunstig zijn, vooral omdat het de belangen van ontwikkelaars en eindgebruikers op één lijn brengt. Desondanks kunnen bestuursmechanismen voor smart contracts leiden tot nieuwe risico's als ze verkeerd worden geïmplementeerd. Een aannemelijk scenario is als een aanvaller enorme stemmacht verwerft (gemeten in aantal tokens in bewaring) door een [snelle lening](/defi/#flash-loans) (flash loan) af te sluiten en een kwaadaardig voorstel doordrukt.

Een manier om problemen met betrekking tot on-chain bestuur te voorkomen is het [gebruiken van een tijdslot](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/). Een tijdslot zorgt ervoor dat een smart contract bepaalde acties niet kan uitvoeren tot een bepaalde tijd voorbij is. Andere strategieën zijn onder andere het toekennen van een “stemgewicht” aan elke token op basis van hoe lang het is vergrendeld, of het meten van de stemkracht van een adres op een historische periode (bijvoorbeeld 2-3 blocks in het verleden) in plaats van de huidige block. Beide methoden verminderen de mogelijkheid om snel stemmacht te vergaren om de stemmen op de chain te beïnvloeden.

Meer over [het ontwerpen van veilige bestuurssystemen](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/), [verschillende stemmechanismen in DAO's](https://hackernoon.com/governance-is-the-holy-grail-for-daos), en [de veelvoorkomende DAO-aanvalsvectoren die gebruikmaken van DeFi](https://dacian.me/dao-governance-defi-attacks) in de gedeelde links.

### 8. Beperk complexiteit in code tot een minimum {#reduce-code-complexity}

Traditionele software-ontwikkelaars zijn bekend met het KISS-principe (“keep it simple, stupid”), dat adviseert om geen onnodige complexiteit te introduceren in het ontwerp van software. Dit sluit aan bij de lang gekoesterde gedachte dat “complexe systemen op complexe manieren defect raken” en vatbaarder zijn voor kostbare fouten.

Dingen eenvoudig houden is van bijzonder belang bij het schrijven van smart contracts, aangezien smart contracts potentieel grote hoeveelheden waarde controleren. Een tip om alles eenvoudig te houden bij het schrijven van smart contracts, is het waar mogelijk hergebruiken van bestaande bibliotheken, zoals [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/4.x/). Omdat deze bibliotheken uitgebreid zijn gecontroleerd en getest door ontwikkelaars, verkleint het gebruik ervan de kans op het introduceren van bugs door nieuwe functionaliteit vanaf nul te schrijven.

Een ander veelgebruikt advies is om kleine functies te schrijven en contracten modulair te houden door bedrijfslogica te verdelen over verschillende contracten. Niet alleen verkleint het schrijven van eenvoudigere code het aanvalsoppervlak in een smart contract, het maakt het ook eenvoudiger om te redeneren over de correctheid van het totale systeem en mogelijke ontwerpfouten vroegtijdig op te sporen.

### 9. Verdediging tegen veelvoorkomende kwetsbaarheden in smart contracts {#mitigate-common-smart-contract-vulnerabilities}

#### Reentrancy {#reentrancy}

De EVM staat geen gelijktijdigheid toe, wat betekent dat twee contracten die betrokken zijn bij een berichtoproep niet gelijktijdig kunnen worden uitgevoerd. Een externe oproep pauzeert de uitvoering en het geheugen van het oproepende contract totdat de oproep terugkomt, waarna de uitvoering op de normale manier verdergaat. Dit proces kan formeel beschreven worden als het overdragen van [besturingsstroom](https://www.computerhope.com/jargon/c/contflow.htm) naar een ander contract.

Hoewel dit meestal geen kwaad kan, kan het overbrengen van besturingsstroom naar niet-vertrouwde contracten problemen veroorzaken, zoals reentrancy. Een reentrancy-aanval treedt op wanneer een kwaadaardig contract terug een kwetsbaar contract oproept voordat de oorspronkelijke oproeping van de functie is voltooid. Dit type aanval kan het beste worden uitgelegd met een voorbeeld.

Denk aan een eenvoudig smart contract ('Victim') waarmee iedereen Ether kan storten en opnemen:

```solidity
// This contract is vulnerable. Do not use in production

contract Victim {
    mapping (address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
        balances[msg.sender] = 0;
    }
}
```

Dit contract heeft een `withdraw()`-functie waarmee gebruikers ETH kunnen opnemen die ze eerder in het contract hebben gestort. Bij het verwerken van een opname voert het contract de volgende handelingen uit:

1. Controleert het ETH-saldo van de gebruiker
2. Stuurt middelen naar het oproepadres
3. Zet zijn/haar saldo terug op 0, zodat er geen middelen meer kunnen worden opgenomen van de gebruiker

De `withdraw()`-functie in het `Victim`-contract volgt een “controles-interacties-effecten”-patroon. Het _controleert_ of aan de voorwaarden voor uitvoering is voldaan (d.w.z. de gebruiker heeft een positief ETH-saldo) en voert de _interactie_ uit door ETH naar het adres van de oproeper te sturen, voordat de _effecten_ van de transactie worden toegepast (d.w.z. het saldo van de gebruiker wordt verlaagd).

Als `withdraw()` wordt opgeroepen vanaf een account in externe eigendom (EOA), wordt de functie uitgevoerd zoals verwacht: `msg.sender.call.value()` stuurt ETH naar de oproeper. Maar als `msg.sender` een smart contract-account is dat `withdraw()` aanroept, zal het verzenden van middelen met `msg.sender.call.value()` ook code activeren die op dat adres is opgeslagen om uit te voeren.

Stel dat dit de code is die wordt ingezet op het contractadres:

```solidity
 contract Attacker {
    function beginAttack() external payable {
        Victim(victim_address).deposit.value(1 ether)();
        Victim(victim_address).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(victim_address).withdraw();
        }
    }
}
```

Dit contract is ontworpen om drie dingen te doen:

1. Een storting accepteren van een ander account (waarschijnlijk de EOA van de aanvaller)
2. 1 ETH storten in het Victim-contract
3. De 1 ETH opnemen die is opgeslagen in het smart contract

Er is hier niets aan de hand, behalve dat `Attacker` een andere functie heeft die `withdraw()` in `Victim` opnieuw oproept als het overgebleven gas van de inkomende `msg.sender.call.value` meer dan 40.000 bedraagt. Dit geeft `Attacker` de mogelijkheid om `Victim` opnieuw binnen te dringen en meer middelen op te nemen _voordat_ de eerste aanroep van `withdraw` voltooid is. De cyclus ziet er als volgt uit:

```solidity
- Attacker's EOA calls `Attacker.beginAttack()` with 1 ETH
- `Attacker.beginAttack()` deposits 1 ETH into `Victim`
- `Attacker` calls `withdraw() in `Victim`
- `Victim` checks `Attacker`’s balance (1 ETH)
- `Victim` sends 1 ETH to `Attacker` (which triggers the default function)
- `Attacker` calls `Victim.withdraw()` again (note that `Victim` hasn’t reduced `Attacker`’s balance from the first withdrawal)
- `Victim` checks `Attacker`’s balance (which is still 1 ETH because it hasn’t applied the effects of the first call)
- `Victim` sends 1 ETH to `Attacker` (which triggers the default function and allows `Attacker` to reenter the `withdraw` function)
- The process repeats until `Attacker` runs out of gas, at which point `msg.sender.call.value` returns without triggering additional withdrawals
- `Victim` finally applies the results of the first transaction (and subsequent ones) to its state, so `Attacker`’s balance is set to 0
```

De conclusie is dat omdat het saldo van de oproeper niet op 0 wordt gezet totdat de uitvoering van de functie is voltooid, latere oproepen zullen slagen en de oproeper in staat stellen zijn/haar saldo meerdere keren op te nemen. Dit soort aanval kan gebruikt worden om middelen van een smart contract leeg te halen, zoals gebeurde in de [2016 DAO hack](https://www.coindesk.com/learn/2016/06/25/understanding-the-dao-attack/). Reentrancy-aanvallen zijn vandaag de dag nog steeds een kritiek probleem voor smart contracts, zoals blijkt uit [openbare lijsten van reentrancy-exploitaties](https://github.com/pcaversaccio/reentrancy-attacks).

##### Hoe reentrancy-aanvallen voorkomen

U kunt best het [patroon controles-effecten-interacties](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern) volgen om om te gaan met reentrancy. Dit patroon ordent de uitvoering van functies op dusdanige wijze dat code die noodzakelijke controles uitvoert voordat er verder wordt gegaan met de uitvoering als eerste komt, gevolgd door code die de contractstatus manipuleert, waarbij code die interactie heeft met andere contracten of EOA's als laatste komt.

Het patroon controles-effecten-interacties wordt gebruikt in een herziene versie van het `Victim`-contract dat hieronder wordt weergegeven:

```solidity
contract NoLongerAVictim {
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
    }
}
```

Dit contract voert een _controle_ uit op het saldo van de gebruiker, past de _effecten_ toe van de functie `withdraw()` (door het saldo van de gebruiker op 0 te zetten) en gaat verder met het uitvoeren van de _interactie_ (het verzenden van ETH naar het adres van de gebruiker). Dit zorgt ervoor dat het contract zijn opslag bijwerkt voor de externe oproep, waardoor de reentrancy conditie die de eerste aanval mogelijk maakte, wordt geëlimineerd. Het `Attacker`-contract kan nog terug een oproep doen naar `NoLongerAVictim`, maar omdat `balances[msg.sender]` op 0 is gezet, zullen extra opnames een fout geven.

Een andere optie is het gebruik van een wederzijdse uitsluitingsvergrendeling (vaak omschreven als "mutual exclusion lock" of "mutex") die een deel van de status van een contract vergrendelt totdat een oproep voor een functie is voltooid. Dit wordt geïmplementeerd met behulp van een Booleaanse variabele die wordt ingesteld op `true` voordat de functie wordt uitgevoerd en wordt teruggezet naar `false` nadat de oproep is uitgevoerd. Zoals in het onderstaande voorbeeld te zien is, beschermt het gebruik van een mutex een functie tegen recursieve oproepen terwijl de oorspronkelijke oproep nog steeds wordt verwerkt, waardoor reentrancy effectief wordt gestopt.

```solidity
pragma solidity ^0.7.0;

contract MutexPattern {
    bool locked = false;
    mapping(address => uint256) public balances;

    modifier noReentrancy() {
        require(!locked, "Blocked from reentrancy.");
        locked = true;
        _;
        locked = false;
    }
    // This function is protected by a mutex, so reentrant calls from within `msg.sender.call` cannot call `withdraw` again.
    //  The `return` statement evaluates to `true` but still evaluates the `locked = false` statement in the modifier
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "No balance to withdraw.");

        balances[msg.sender] -= _amount;
        bool (success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

U kunt ook een [pull payments](https://docs.openzeppelin.com/contracts/4.x/api/security#PullPayment)-systeem gebruiken waarbij gebruikers middelen moeten opnemen van de smart contracts, in plaats van een "push payments"-systeem dat middelen naar accounts stuurt. Dit voorkomt de mogelijkheid om onbedoeld code op onbekende adressen te activeren (en kan ook bepaalde denial-of-service-aanvallen voorkomen).

#### Integer underflows en overflows {#integer-underflows-and-overflows}

Een integer overflow treedt op wanneer de resultaten van een rekenkundige bewerking buiten het aanvaardbare waardenbereik vallen, waardoor het “doorrolt” naar de laagste representeerbare waarde. Een `uint8` kan bijvoorbeeld alleen waarden tot 2^8-1=255 opslaan. Rekenkundige bewerkingen die resulteren in waarden hoger dan `255` zullen overgaan tot een overflow en `uint` resetten naar `0`, vergelijkbaar met hoe de kilometerteller van een auto wordt gereset naar 0 zodra deze de maximale kilometerstand bereikt (999999).

Integer underflows gebeuren om vergelijkbare redenen: de resultaten van een rekenkundige bewerking vallen onder het acceptabele bereik. Stel dat u `0` probeert te verlagen in een `uint8`, dan rolt het resultaat gewoon door naar de maximaal representeerbare waarde (`255`).

Zowel integer overflows als underflows kunnen leiden tot onverwachte veranderingen in de statusvariabelen van een contract en resulteren in ongeplande uitvoering. Hieronder staat een voorbeeld dat toont hoe een aanvaller een rekenkundige overloop in een smart contract kan misbruiken om een ongeldige handeling uit te voeren:

```
pragma solidity ^0.7.6;

// This contract is designed to act as a time vault.
// User can deposit into this contract but cannot withdraw for at least a week.
// User can also extend the wait time beyond the 1 week waiting period.

/*
1. Deploy TimeLock
2. Deploy Attack with address of TimeLock
3. Call Attack.attack sending 1 ether. You will immediately be able to
   withdraw your ether.

What happened?
Attack caused the TimeLock.lockTime to overflow and was able to withdraw
before the 1 week waiting period.
*/

contract TimeLock {
    mapping(address => uint) public balances;
    mapping(address => uint) public lockTime;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
        lockTime[msg.sender] = block.timestamp + 1 weeks;
    }

    function increaseLockTime(uint _secondsToIncrease) public {
        lockTime[msg.sender] += _secondsToIncrease;
    }

    function withdraw() public {
        require(balances[msg.sender] > 0, "Insufficient funds");
        require(block.timestamp > lockTime[msg.sender], "Lock time not expired");

        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
}

contract Attack {
    TimeLock timeLock;

    constructor(TimeLock _timeLock) {
        timeLock = TimeLock(_timeLock);
    }

    fallback() external payable {}

    function attack() public payable {
        timeLock.deposit{value: msg.value}();
        /*
        if t = current lock time then we need to find x such that
        x + t = 2**256 = 0
        so x = -t
        2**256 = type(uint).max + 1
        so x = type(uint).max + 1 - t
        */
        timeLock.increaseLockTime(
            type(uint).max + 1 - timeLock.lockTime(address(this))
        );
        timeLock.withdraw();
    }
}
```

##### Hoe integer underflows en overflows voorkomen

Vanaf versie 0.8.0 weigert de Solidity-compiler code die resulteert in integer underflows en overflows. Contracten die gecompileerd zijn met een lagere compilerversie moeten echter controles uitvoeren op functies met rekenkundige bewerkingen of een bibliotheek gebruiken (bv. [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)) die controleert op underflow/overflow.

#### Oracle-manipulatie {#oracle-manipulation}

[Oracles](/developers/docs/oracles/) verzamelen off-chain-informatie en sturen het on-chain zodat smart contracts het kunnen gebruiken. Met oracles kunt u smart contracts ontwerpen die samenwerken met off-chain-systemen, zoals kapitaalmarkten, waardoor hun toepassing enorm wordt uitgebreid.

Maar als het orakel beschadigd is en onjuiste informatie op de chain zet, zullen smart contracts worden uitgevoerd op basis van onjuiste invoer, wat problemen kan veroorzaken. Dit is de basis van het “oracle-probleem”, dat zich richt op de taak om ervoor te zorgen dat informatie van een blockchain-oracle correct, up-to-date en tijdig is.

Een gerelateerd beveiligingsprobleem is het gebruik van een on-chain oracle, zoals een gedecentraliseerde crypto-uitwisseling, om de spotprijs voor een activum te verkrijgen. Uitleenplatforms in de [decentrale financiering (DeFi)](/defi/)-sector doen dit vaak om de waarde van het onderpand van een gebruiker te bepalen om vast te stellen hoeveel ze kunnen lenen.

DEX-prijzen zijn vaak nauwkeurig, grotendeels dankzij arbitrageurs die de pariteit in de markten herstellen. Ze zijn echter vatbaar voor manipulatie, vooral als de on-chain oracle activaprijzen berekent op basis van historische handelspatronen (zoals meestal het geval is).

Een aanvaller kan bijvoorbeeld de spotprijs van een activum kunstmatig opdrijven door een snelle lening af te sluiten vlak voordat er interactie plaatsvindt met uw uitleencontract. De DEX vragen naar de prijs van het activum zou een hoger dan normale waarde opleveren (door de grote “kooporder” van de aanvaller die de vraag naar het activum verstoort), waardoor ze meer kunnen lenen dan ze eigenlijk mogen. Dergelijke “snelle leningsaanvallen” zijn gebruikt om misbruik te maken van het vertrouwen op prijs-oracles bij DeFi-toepassingen, wat protocollen miljoenen aan verloren geld heeft gekost.

##### Hoe oracle-manipulatie voorkomen

De minimale vereiste om [oracle-manipulatie](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples) te voorkomen is het gebruik van een gedecentraliseerd oracle-netwerk dat informatie opvraagt uit verschillende bronnen om single points-of-failure te vermijden. In de meeste gevallen hebben gedecentraliseerde oracles ingebouwde crypto-economische stimulansen om oracle-nodes aan te moedigen om correcte informatie te rapporteren, waardoor ze veiliger zijn dan gecentraliseerde oracles.

Als u van plan bent om een on-chain oracle te raadplegen voor activaprijzen, gebruik dan een oracle die een mechanisme voor tijdgewogen gemiddelde prijzen (Time-Weighted Average Price TWAP) implementeert. Een [TWAP-oracle](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) vraagt de prijs op van een activum op twee verschillende tijdstippen (die u kunt wijzigen) en berekent de spotprijs op basis van het verkregen gemiddelde. Door langere tijdsperioden te kiezen, beschermt u uw protocol tegen prijsmanipulatie, omdat grote orders die recent zijn uitgevoerd de activaprijzen niet kunnen beïnvloeden.

## Beveiligingsbronnen slimme contracten voor ontwikkelaars {#smart-contract-security-resources-for-developers}

### Tools voor het analyseren van smart contracts en het verifiëren van de correctheid van code {#code-analysis-tools}

- **[Testtools en bibliotheken](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** - _Verzameling van tools met industriestandaard en bibliotheken voor het uitvoeren van unit tests, statische analyse en dynamische analyse op smart contracts._

- **[Formele verificatietools](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** - _Tools voor het verifiëren van functionele correctheid in smart contracts en het controleren van invarianten._

- **[Auditingservices voor smart contracts](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** - _Lijst van organisaties die auditingservices voor smart contracts leveren voor Ethereum-ontwikkelingsprojecten._

- **[Bug bounty-platforms](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** - _Platforms voor het coördineren van bug bounty's en het belonen van verantwoorde openbaarmaking van kritieke kwetsbaarheden in smart contracts._

- **[Fork Checker](https://forkchecker.hashex.org/)** - _Een gratis online tool voor het controleren van alle beschikbare informatie over een forked contract._

- **[ABI Encoder](https://abi.hashex.org/)** - _Een gratis online service voor het programmeren van uw Solidity-contractfuncties en constructorargumenten._

- **[Aderyn](https://github.com/Cyfrin/aderyn)** - _Statische analysator van Solidity, die de abstracte syntaxistrees (Abstract Syntax Trees, AST) doorzoekt om vermoedelijke kwetsbaarheden op te sporen en problemen af te drukken in een gemakkelijk te gebruiken markdown-formaat._

### Tools voor het monitoren van smart contracts {#smart-contract-monitoring-tools}

- **[OpenZeppelin Defender Sentinels](https://docs.openzeppelin.com/defender/v1/sentinel)** - _Een tool voor het automatisch monitoren van en reageren op evenementen, functies en transactieparameters op uw smart contracts._

- **[Tenderly Real-Time Alerting](https://tenderly.co/alerting/)** - _Een tool voor het ontvangen van realtime meldingen wanneer ongebruikelijke of onverwachte evenementen plaatsvinden op uw smart contracts of wallets._

### Tools voor veilig beheer van smart contracts {#smart-contract-administration-tools}

- **[OpenZeppelin Defender Admin](https://docs.openzeppelin.com/defender/v1/admin)** - _Interface voor smart contractbeheer, met toegangscontroles, upgrades en pauzeren._

- **[Safe](https://safe.global/)** - _Smart contract-wallet die werken op Ethereum en waarbij een minimaal aantal mensen nodig is om een transactie goed te keuren voordat deze kan plaatsvinden (M-van-N)._

- **[OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/4.x/)** - _Contractbibliotheken voor het implementeren van administratieve functies, waaronder contracteigendom, upgrades, toegangscontroles, bestuur, pauzeerbaarheid en meer._

### Auditingservices voor smart contracts {#smart-contract-auditing-services}

- **[ConsenSys Diligence](https://consensys.net/diligence/)** - _Auditingservice voor smart contracts die projecten in het hele ecosysteem van de blockchain helpt om ervoor te zorgen dat hun protocollen klaar zijn voor lancering en gebouwd zijn om gebruikers te beschermen._

- **[CertiK](https://www.certik.com/)** - _Blockchain-beveiligingsfirma die toonaangevend is op het gebruik van geavanceerde formele verificatietechnologie op smart contracts en blockchainnetwerken._

- **[Trail of Bits](https://www.trailofbits.com/)** - _Cybersecuritybedrijf dat beveiligingsonderzoek combineert met een aanvallersmentaliteit om risico's te verminderen en code te versterken._

- **[PeckShield](https://peckshield.com/)** - _Blockchain-beveiligingsbedrijf dat producten en diensten aanbiedt voor de beveiliging, privacy en bruikbaarheid van het hele ecosysteem van de blockchain._

- **[QuantStamp](https://quantstamp.com/)** - _Auditingservice die de algemene invoering van blockchaintechnologie faciliteert via beveiligings- en risicobeoordelingsservices._

- **[OpenZeppelin](https://www.openzeppelin.com/security-audits)** - _Beveiligingsbedrijf voor smart contracts dat beveiligingsaudits uitvoert voor gedistribueerde systemen._

- **[Runtime Verification](https://runtimeverification.com/)** - _Beveiligingsbedrijf dat gespecialiseerd is in formele modellering en verificatie van smart contracts._

- **[Hacken](https://hacken.io)** - _Web3-cyberbeveiligingsauditor die een 360-gradenaanpak levert voor blockchainbeveiliging._

- **[Nethermind](https://nethermind.io/smart-contracts-audits)** - _Solidity- en Cairo-auditservices, die de integriteit van smart contracts en de beveiliging van gebruikers op Ethereum en Starknet waarborgen._

- **[HashEx](https://hashex.org/)** - _HashEx richt zich op blockchain- en smart contract-auditing om de beveiliging van cryptovaluta te garanderen, en levert services zoals smart contract-ontwikkeling, penetratietesten en blockchain-consulting._

- **[Code4rena](https://code4rena.com/)** - _Competitief auditplatform dat experts in de beveiliging van smart contracts stimuleert om kwetsbaarheden op te sporen en te helpen web3 veiliger te maken._

- **[CodeHawks](https://codehawks.com/)** - _Competitief auditplatform dat auditingwedstrijden voor smart contracts host voor beveiligingsonderzoekers._

- **[Cyfrin](https://cyfrin.io)** - _Web3-beveiligingskrachtpatser die cryptobeveiliging stimuleert via producten en auditservices voor smart contracts._

- **[ImmuneBytes](https://www.immunebytes.com//smart-contract-audit/)** - _Web3-beveiligingsfirma die beveiligingsaudits aanbiedt voor blockchainsystemen via een team van ervaren auditors en eersteklas tools._

- **[Oxorio](https://oxor.io/)** - _Audits van smart contracts en blockchain-beveiligingsservices met expertise in EVM, Solidity, ZK, Cross-chain tech voor cryptofirma's en DeFi-projecten._

- **[Inference](https://inference.ag/)** - _Auditbedrijf rond beveiliging, en gespecialiseerd in smart contract-audits voor blockchains op basis van EVM's. Dankzij de deskundige auditors identificeren ze potentiële problemen en stellen ze bruikbare oplossingen voor om ze op te lossen voordat ze worden ingezet._

### Bug bounty-platformen {#bug-bounty-platforms}

- **[Immunefi](https://immunefi.com/)** - _Bug bounty-platform voor smart contracts en DeFi-projecten, waar beveiligingsonderzoekers code nakijken, kwetsbaarheden opsporen, betaald worden en crypto veiliger maken._

- **[HackerOne](https://www.hackerone.com/)** - _Coördinatie van kwetsbaarheden en bug bounty-platform dat bedrijven in contact brengt met penetratietesters en cyberbeveiligingsonderzoekers._

- **[HackenProof](https://hackenproof.com/)** - _Vakkundig bug bounty-platform voor cryptoprojecten (DeFi, smart contracts, wallets, CEX en meer), waar beveiligingsprofessionals triagediensten leveren en onderzoekers betaald worden voor relevante, geverifieerde bugrapporten._

-  **[Sherlock](https://www.sherlock.xyz/)** - _Underwriter in Web3 voor de beveiliging van smart contracts, met uitbetalingen voor auditors die via smart contracts worden beheerd om ervoor te zorgen dat relevante bugs eerlijk worden betaald._

-  **[CodeHawks](https://www.codehawks.com/)** - _Competitief bug bounty-platform waar auditors deelnemen aan beveiligingswedstrijden en -uitdagingen, en (binnenkort) aan hun eigen privéaudits._

### Publicaties van bekende kwetsbaarheden in en uitbuitingen van smart contracts {#common-smart-contract-vulnerabilities-and-exploits}

- **[ConsenSys: Smart Contract Known Attacks](https://consensys.github.io/smart-contract-best-practices/attacks/)** - _Beginnersvriendelijke toelichting op de belangrijkste contractkwetsbaarheden, met voorbeeldcode voor de meeste situaties._

- **[SWC Registry](https://swcregistry.io/)** - _Samengestelde lijst van Common Weakness Enumeration (CWE)-items die van toepassing zijn op smart contracts van Ethereum._

- **[Rekt](https://rekt.news/)** - _Regelmatig bijgewerkte publicatie van opvallende cryptohacks en uitbuitingen, samen met gedetailleerde post-mortemrapporten._

### Uitdagingen voor het leren beveiligen van smart contracts {#challenges-for-learning-smart-contract-security}

- **[Awesome BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)** - _Samengestelde lijst van blockchain-beveiligingswargames, uitdagingen en [Verover de vlag](https://www.webopedia.com/definitions/ctf-event/amp/)-wedstrijden en oplossingsbeschrijvingen._

- **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)** - _Wargame om offensieve beveiliging van DeFi smart contracts te leren en vaardigheden op te bouwen in het opsporen van bugs en beveiligingsaudits._

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** - _Op Web3/Solidity gebaseerde wargame waarin elk level een smart contract is dat moet worden "gehackt"._

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)** - _Hackuitdaging voor smart contracts in een fantasy-avontuur. Succesvolle voltooiing van de uitdaging geeft ook toegang tot een persoonlijk bug bounty-programma._

### Beste praktijken voor het beveiligen van smart contracts {#smart-contract-security-best-practices}

- **[ConsenSys: Ethereum Smart Contract Security Best Practices](https://consensys.github.io/smart-contract-best-practices/)** - _Uitgebreide lijst met richtlijnen voor het beveiligen van smart contracts van Ethereum._

- **[Nascent: Simple Security Toolkit](https://github.com/nascentxyz/simple-security-toolkit)** - _Verzameling praktische, op beveiliging gerichte gidsen en checklists voor de ontwikkeling van smart contracts._

- **[Solidity Patterns](https://fravoll.github.io/solidity-patterns/)** - _Handige compilatie van beveiligingspatronen en beste praktijken voor de Solidity-programmeertaal voor smart contracts._

- **[Solidity Docs: Security Considerations](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** - _Richtlijnen voor het schrijven van beveiligde smart contracts met Solidity._

- **[Smart Contract Security Verification Standard](https://github.com/securing/SCSVS)** - _Veertiendelige checklist om de beveiliging van smart contracts te standaardiseren voor ontwikkelaars, architecten, beveiligingsbeoordelaars en verkopers._

- **[Learn Smart Contract Security and Auditing](https://updraft.cyfrin.io/courses/security) - _Ultieme beveiliging van smart contracts en auditingcursus, gemaakt voor smart contract-ontwikkelaars die hun beste beveiligingspraktijken willen verbeteren en beveiligingsonderzoekers willen worden._

### Tutorials over de beveiliging van smart contracts {#tutorials-on-smart-contract-security}

- [Hoe veilige smart contracts schrijven](/developers/tutorials/secure-development-workflow/)

- [Hoe u Slither gebruikt om bugs in smart contracts te vinden](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [How to use Manticore to find smart contract bugs](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [Richtlijnen voor de beveiliging van smart contracts](/developers/tutorials/smart-contract-security-guidelines/)

- [Hoe uw tokencontract veilig integreren met willekeurige tokens](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft - Volledige cursus over de beveiliging en auditing van smart contracts](https://updraft.cyfrin.io/courses/security)
