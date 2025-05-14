---
title: Netwerken
description: Een overzicht van de netwerken van Ethereum en waar u testnet-ether (ETH) kunt krijgen om uw applicatie te testen.
lang: nl
---

Ethereum-netwerken zijn groepen met onderling verbonden computers die met elkaar communiceren via het Ethereum-protocol. Er is maar één Ethereum-hoofdnet, maar onafhankelijke netwerken die voldoen aan dezelfde protocolregels kunnen worden gemaakt voor test- en ontwikkelingsdoeleinden. Er zijn veel onafhankelijke "netwerken" die zich aan het protocol houden zonder met elkaar interactie te hebben. U kunt er zelfs één lokaal starten op uw eigen computer om uw smart contracts en web3-apps te testen.

Uw Ethereum-account werkt op de verschillende netwerken, maar uw accountsaldo en transactiegeschiedenis worden niet overgenomen van het hoofdnetwerk van Ethereum. Voor testdoeleinden is het handig om te weten welke netwerken beschikbaar zijn en hoe u testnet-ETH kunt krijgen om mee te spelen. Over het algemeen is het uit veiligheidsoverwegingen niet aan te raden om hoofdnetaccounts te hergebruiken op testnetten of andersom.

## Randvoorwaarden {#prerequisites}

U moet de [basisprincipes van Ethereum](/developers/docs/intro-to-ethereum/) begrijpen voordat u zich in de verschillende netwerken inleest, omdat de testnetwerken u een goedkope, veilige versie van Ethereum geven om mee te spelen.

## Publieke netwerken {#public-networks}

Publieke netwerken zijn toegankelijk voor iedereen in de wereld met een internetverbinding. Iedereen kan transacties lezen of aanmaken op een publieke blockchain en de transacties die worden uitgevoerd, valideren. De consensus tussen de verschillende gebruikers beslist over de opname van transacties en de status van het netwerk.

### Ethereum Mainnet {#ethereum-mainnet}

Het hoofdnet is de primaire, publieke Ethereum-productieblockchain, waar transacties van werkelijke waarde plaatsvinden op de gedistribueerde ledger.

Wanneer mensen en crypto-uitwisselingen praten over ETH-prijzen, hebben ze het over hoofdnet ETH.

### Ethereum-testnetten {#ethereum-testnets}

Naast het hoofdnet zijn er ook openbare testnetten. Dit zijn netwerken die worden gebruikt door protocolontwikkelaars of smart contract-ontwikkelaars om zowel protocolupgrades als potentiële smart contracts te testen in een productie-achtige omgeving voordat ze worden uitgerold op het hoofdnet. Zie dit als een analogie van productie versus stagingservers.

U moet alle contractcode die u schrijft testen op een testnet voordat u het uitrolt op het hoofdnet. Van de dapps die integreren met bestaande smart contracts hebben de meeste projecten kopieën ingezet in testnetten.

De meeste testnetten begonnen met het gebruik van een proof-of-authority consensusmechanisme met toestemming. Dit betekent dat een klein aantal nodes wordt gekozen om transacties te valideren en nieuwe blocks te creëren, waarbij hun identiteit wordt gestaked. Als alternatief hebben sommige testnetten een open proof-of-stake consensusmechanisme waar iedereen een test kan uitvoeren met een validator, net als bij het Ethereum-hoofdnet.

Er wordt aangenomen dat ETH op testnetten geen echte waarde heeft, maar er zijn markten gecreëerd voor bepaalde soorten ETH op testnetten die schaars of moeilijk te verkrijgen zijn. Aangezien u ETH nodig hebt om daadwerkelijk interactie te hebben met Ethereum (zelfs op testnetten), krijgen de meeste mensen gratis testnet-ETH via faucets. De meeste faucets zijn webapps waar u een adres kunt opgeven waar u ETH naartoe wilt laten sturen.

#### Welk testnet moet ik gebruiken?

De twee openbare testnetten die clientontwikkelaars op dit moment beheren zijn Sepolia en Hoodi. Sepolia is een netwerk voor contract- en applicatieontwikkelaars om hun applicaties te testen. Via het Hoodi-netwerk kunnen protocolontwikkelaars netwerkupgrades testen en kunnen stakers validators testen.

#### Sepolia {#sepolia}

**Sepolia is de aanbevolen standaard testnet voor applicatieontwikkeling**. Het Sepolia-netwerk gebruikt een gesloten set validators. Het is relatief nieuw, wat betekent dat zowel de staat als de geschiedenis ervan zeer klein zijn. Dit betekent dat het netwerk snel te synchroniseren is en dat het uitvoeren van een node erop minder opslag vereist. Dit is handig voor gebruikers die snel een node willen opstarten en direct met het netwerk willen communiceren.

- Gesloten validator set, beheerd door client- en testteams
- Nieuw testnet, minder gedistribueerde applicaties dan andere testnets
- Snel te synchroniseren en vereist minimale schijfruimte om een node te draaien

##### Bronnen

- [Website](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Faucets

- [QuickNode Sepolia Faucet](https://faucet.quicknode.com/drip)
- [Grabteeth](https://grabteeth.xyz/)
- [PoW Faucet](https://sepolia-faucet.pk910.de/)
- [Coinbase Wallet Faucet | Sepolia](https://coinbase.com/faucets/ethereum-sepolia-faucet)
- [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
- [Infura Sepolia Faucet](https://www.infura.io/faucet)
- [Chainstack Sepolia Faucet](https://faucet.chainstack.com/sepolia-faucet)
- [Ethereum Ecosystem Faucets](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)

#### Hoodi {#hoodi}

_Opmerking: [Het Goerli testnet is verouderd](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17) en is vervangen door Hoodi. Overweeg om je applicaties te migreren naar Sepolia._

Hoodi is een testnet voor het testen van validatie en staking. Het Hoodi-netwerk is open voor gebruikers die een validator van het testnet willen draaien. Stakers die protocol-updates willen testen voordat ze op het mainnet worden uitgerold, zouden Hoodi moeten gebruiken.

- Open validator set, stakers kunnen netwerkupdates testen
- Grote staat, nuttig voor het testen van complexe smart contract-interacties
- Langere synchronisatietijd en vereist meer opslag om een node te draaien

##### Bronnen

- [Website](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Explorer](https://explorer.hoodi.ethpandaops.io/)
- [Checkpoint Sync](https://checkpoint-sync.hoodi.ethpandaops.io/)

##### Faucets

- [Hoodi Faucet](https://hoodi.ethpandaops.io/)

Om een Validator te starten op het Hoodi testnet, gebruik de [Hoodi launchpad](https://hoodi.launchpad.ethereum.org/en/).

### Laag 2-testnetten {#layer-2-testnets}

[Laag 2 (L2)](/layer-2/) is een verzamelnaam om een specifieke set van Ethereum-opschalingsoplossingen te beschrijven. Een laag 2 is een aparte blockchain die Ethereum uitbreidt en de veiligheidsgaranties van Ethereum overneemt. Laag 2-testnetten zijn meestal nauw gekoppeld aan publieke Ethereum-testnetten.

#### Arbitrum Sepolia {#arbitrum-sepolia}

Een testnet voor [Arbitrum](https://arbitrum.io/).

##### Faucets

- [Chainlink faucet](https://faucets.chain.link/arbitrum-sepolia)
- [Alchemy faucet](https://www.alchemy.com/faucets/arbitrum-sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

Een testnet voor [Optimism](https://www.optimism.io/).

##### Faucets

- [Chainlink faucet](https://faucets.chain.link/optimism-sepolia)
- [Alchemy faucet](https://www.alchemy.com/faucets/optimism-sepolia)

#### Starknet Sepolia {#starknet-sepolia}

Een testnet voor [Starknet](https://www.starknet.io).

##### Faucets

- [Alchemy faucet](https://www.alchemy.com/faucets/starknet-sepolia)

## Persoonlijke netwerken {#private-networks}

Een Ethereum-netwerk is een persoonlijk netwerk als de nodes ervan niet verbonden zijn met een publiek netwerk (d.w.z. het hoofdnet of een testnet). In deze context betekent persoonlijk alleen gereserveerd of geïsoleerd, in plaats van beveiligd of veilig.

### Ontwikkelings netwerken {#development-networks}

Wilt u een Ethereum-toepassing ontwikkelen? Dan moet u ze eerst uitvoeren op een persoonlijk netwerk om te zien hoe ze werkt voordat u ze uitrolt. Net zoals u een lokale server op uw computer aanmaakt voor webontwikkeling, kunt u een lokale blockchaininstantie aanmaken om uw dapp te testen. Dit zorgt voor veel snellere iteratie dan een publiek testnet.

Er zijn projecten en tools die u hierbij kunnen helpen. Ontdek meer over [ontwikkelingsnetwerken](/developers/docs/development-networks/).

### Consortiumnetwerken {#consortium-networks}

Het consensusproces wordt gecontroleerd door een vooraf gedefinieerde reeks nodes die wordt vertrouwd. Bijvoorbeeld een privénetwerk van bekende academische instellingen die elk een enkele node besturen, en blocks worden gevalideerd door een drempel van ondertekenaars binnen het netwerk.

Als een publiek Ethereum-netwerk te vergelijken is met het publieke internet, dan is een consortium-netwerk te vergelijken met een privé-intranet.

## Gerelateerde tools {#related-tools}

- [Chainlist](https://chainlist.org/) _lijst van EVM-netwerken om wallets en aanbieders te verbinden met de juiste chain-ID en netwerk-ID_
- [Op EVM gebaseerde chains](https://github.com/ethereum-lists/chains) _GitHub-repo van chain-metadata die Chainlist aandrijft_

## Verder lezen {#further-reading}

- [Voorstel: voorspelbare levenscyclus Ethereum-testnet](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [De evolutie van Ethereum-testnetten](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
