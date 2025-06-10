---
title: Smart contract-bibliotheken
description:
lang: nl
---

U hoeft niet elk smart contract in uw project vanaf nul te schrijven. Er zijn veel smart contract-bibliotheken met open broncode beschikbaar die herbruikbare bouwstenen bevatten voor uw project, zodat u niet het wiel opnieuw hoeft uit te vinden.

## Vereisten {#prerequisites}

Voordat u in smart contract-bibliotheken duikt, raden we aan om de structuur van een smart contract goed onder de knie te hebben. Ga naar [anatomie van smart contracts](/developers/docs/smart-contracts/anatomy/) als u dit nog niet hebt gedaan.

## Wat zit er in een bibliotheek {#whats-in-a-library}

Meestal vindt u twee soorten bouwstenen in smart contract-bibliotheken: herbruikbaar gedrag dat u kunt toevoegen aan uw contracten, en implementaties van verschillende standaarden.

### Gedrag {#behaviors}

Bij het schrijven van slimme contracten is de kans groot dat u steeds weer dezelfde patronen schrijft, zoals het toewijzen van een _admin_-adres om beschermde handelingen in een contract uit te voeren, of het toevoegen van een _pauze_-noodknop in het geval van een onverwacht probleem.

Smart contract-bibliotheken zorgen meestal voor herbruikbare implementaties van deze gedragingen als [bibliotheken](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) of via [overerving](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) in Solidity.

Als voorbeeld volgt hier een vereenvoudigde versie van het [`Ownable` contract](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) uit de [OpenZeppelin-contractenbibliotheek](https://github.com/OpenZeppelin/openzeppelin-contracts), die een adres als eigenaar van een contract aanwijst en voor een modifier zorgt om de toegang tot een methode alleen aan die eigenaar te beperken.

```solidity
contract Ownable {
    address public owner;

    constructor() internal {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }
}
```

Om een bouwsteen als deze in uw contract te gebruiken, moet u deze eerst importeren en vervolgens uitbouwen in uw eigen contracten. Hierdoor kunt u de modifier van het basiscontract `Ownable` gebruiken om uw eigen functies te beveiligen.

```solidity
import ".../Ownable.sol"; // Path to the imported library

contract MyContract is Ownable {
    // The following function can only be called by the owner
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

Een ander populair voorbeeld is [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) of [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html). Dit zijn bibliotheken (in tegenstelling tot basiscontracten) die rekenkundige functies leveren met overflow-controles, die niet door de taal worden aangeboden. Het is een goede gewoonte om een van deze bibliotheken te gebruiken in plaats van rekenkundige bewerkingen om uw contract te beschermen tegen overflows, die desastreuze gevolgen kunnen hebben!

### Standaarden {#standards}

Om de [componeerbaarheid en interoperabiliteit](/developers/docs/smart-contracts/composability/) te vergemakkelijken, heeft de Ethereum-gemeenschap verschillende standaarden gedefinieerd in de vorm van **ERC's**. U kunt er meer over lezen in het gedeelte [standaarden](/developers/docs/standards/).

Bij het opnemen van een ERC als onderdeel van uw contracten, is het een goed idee om te zoeken naar standaardimplementaties in plaats van te proberen uw eigen implementatie uit te rollen. Veel smart contract-bibliotheken bevatten implementaties voor de populairste ERC's. De alomtegenwoordige [ERC20 fungible tokenstandaard](/developers/tutorials/understand-the-erc-20-token-smart-contract/) is bijvoorbeeld te vinden in [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token/) en [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20). Daarnaast bieden sommige ERC's ook canonieke implementaties als onderdeel van de ERC zelf.

Het is het vermelden waard dat sommige ERC's niet op zichzelf staan, maar aanvullingen zijn op andere ERC's. Zo voegt [ERC2612](https://eips.ethereum.org/EIPS/eip-2612) een extensie toe aan ERC20 om de bruikbaarheid te verbeteren.

## Hoe voeg ik een bibliotheek toe {#how-to}

Raadpleeg altijd de documentatie van de bibliotheek die u wilt gebruiken voor specifieke instructies over hoe u deze in uw project kunt opnemen. Verschillende Solidity-contractbibliotheken zijn verpakt met `npm`, dus u kunt gewoon `npm install` uitvoeren. De meeste tools voor [compiling](/developers/docs/smart-contracts/compiling/)-contracten kijken in uw `node_modules` voor smart contract-bibliotheken, dus u kunt het volgende doen:

```solidity
// This will load the @openzeppelin/contracts library from your node_modules
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

Ongeacht de methode die u gebruikt, houd bij het gebruiken van een bibliotheek altijd de [taal](/developers/docs/smart-contracts/languages/)-versie in de gaten. U kunt bijvoorbeeld geen bibliotheek voor Solidity 0.6 gebruiken als u uw contracten in Solidity 0.5 schrijft.

## Wanneer te gebruiken {#when-to-use}

Het gebruik van een smart contract-bibliotheek voor uw project heeft verschillende voordelen. Eerst en vooral bespaart het u tijd door gebruiksklare bouwstenen te verschaffen die u in uw systeem kunt opnemen, in plaats van ze zelf te moeten programmeren.

Veiligheid is ook een groot pluspunt. Open source smart contract-bibliotheken worden ook vaak zeer kritisch bekeken. Aangezien veel projecten ervan afhankelijk zijn, is er een sterke stimulans vanuit de gemeenschap om deze voortdurend te evalueren. Het is veel gebruikelijker om fouten te vinden in applicatiecode dan in herbruikbare contractbibliotheken. Sommige bibliotheken ondergaan ook [externe audits](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits) voor extra beveiliging.

Maar het gebruik van smart contract-bibliotheken brengt het risico met zich mee dat er code in uw project wordt opgenomen waar u niet vertrouwd mee bent. Het is verleidelijk om een contract te importeren en het direct in uw project te zetten, maar zonder goed te begrijpen wat dit contract doet, kunt u onbedoeld een probleem in uw systeem introduceren door onverwacht gedrag. Zorg er altijd voor dat u de documentatie leest van de code die u importeert en controleer vervolgens de code zelf voordat u deze deel laat uitmaken van uw project!

Tot slot moet u bij het nemen van een beslissing over het al dan niet gebruiken van een bibliotheek rekening houden met het totale gebruik ervan. Een breed geaccepteerde versie heeft als voordeel dat er een grotere gemeenschap is en dat er meer mensen kunnen zien of er problemen zijn. Veiligheid moet voorop staan wanneer u iets bouwt met smart contracts!

## Gerelateerde tools {#related-tools}

**OpenZeppelin Contracts -** **_Meest populaire bibliotheek voor veilige ontwikkeling van smart contracts._**

- [Documentatie](https://docs.openzeppelin.com/contracts/)
- [Github](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Community-forum](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Veilige, eenvoudige, flexibele bouwstenen voor smart contracts._**

- [Documentatie](https://dappsys.readthedocs.io/)
- [Github](https://github.com/dapphub/dappsys)

**HQ20 -** **_Een Solidity-project met contracten, bibliotheken en voorbeelden om u te helpen bij het bouwen van volledig uitgeruste gedistribueerde applicaties voor de echte wereld._**

- [Github](https://github.com/HQ20/contracts)

**thirdweb Solidity SDK -** **_Biedt de tools die nodig zijn om aangepaste smart contracts efficiënt te bouwen_**

- [Documentatie](https://portal.thirdweb.com/solidity/)
- [Github](https://github.com/thirdweb-dev/contracts)

## Gerelateerde tutorials {#related-tutorials}

- [Security considerations for Ethereum developers](/developers/docs/smart-contracts/security/) _- Een tutorial over beveiligingsoverwegingen bij het bouwen van smart contracts, inclusief het gebruik van bibliotheken._a
- [Het smart contract van de ERC-20-token begrijpen](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _-Tutorial over de ERC20-standaard, afkomstig van verschillende bibliotheken._

## Verder lezen {#further-reading}

_Weet je van een community resource die je heeft geholpen? Bewerk deze pagina en voeg het toe!_
