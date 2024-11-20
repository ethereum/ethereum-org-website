---
title: Wat is Wrapped Ether (WETH)
description: "Een introductie tot Wrapped ether (WETH): een ERC20-compatibele wrapper voor ether (ETH)."
lang: nl
---

# Wrapped ether (WETH) {#intro-to-weth}

Ether (ETH) is de belangrijkste valuta van Ethereum. Het wordt voor verschillende doeleinden gebruikt, zoals staken, als valuta en voor het betalen van gaskosten voor berekeningen. **WETH is in feite een opgewaardeerde vorm van ETH met wat extra functionaliteit die vereist is door veel applicaties en [ERC-20 tokens](/woordenlijst/#erc-20)**, wat andere soorten digitale activa op Ethereum zijn. Om met deze tokens te kunnen werken, moet ETH dezelfde regels volgen als deze tokens, bekend als de ERC-20-standaard.

Om deze kloof te overbruggen, werd wrapped ETH (WETH) gecreëerd. **Wrapped ETH is een smart contract waarmee u een willekeurig bedrag aan ETH in het contract kunt storten en hetzelfde bedrag ontvangt in geminte WETH** dat voldoet aan de ERC-20 tokenstandaard. WETH is een weergave van ETH waarmee interactie mogelijk is als een ERC-20-token, niet als de eigen activa ETH. U zult nog steeds eigen ETH nodig hebben om de gaskosten te betalen, dus zorg ervoor dat u iets extra bewaart bij het storten.

Het is mogelijk om WETH te "unwrappen" voor ETH door het WETH smart contract te gebruiken. U kunt elk gewenst bedrag aan WETH inwisselen met het WETH smart contract, en u ontvangt hetzelfde bedrag in ETH. De gestorte WETH wordt vervolgens verbrand en uit de circulerende hoeveelheid WETH gehaald.

**Ongeveer ~3% van de circulerende ETH-hoeveelheid zit vast in het WETH-tokencontract**, waardoor het een van de meest gebruikte [smart contracts] is (/woordenlijst/#smart-contract). WETH is vooral belangrijk bij gebruikers die interactie hebben met applicaties in gedecentraliseerde financiën (decentralized finance, DeFi).

## Waarom moeten we ETH "wrappen" als een ERC-20? {#why-do-we-need-to-wrap-eth}

[ERC-20](/ontwikkelaars/documenten/standaarden/tokens/erc-20/) definieert een standaardinterface voor overdraagbare tokens, zodat iedereen tokens kan creëren die naadloos samenwerken met applicaties en tokens die deze standaard gebruiken in het ecosysteem van Ethereum. Aangezien **ETH dateert van voor de ERC-20-standaard**, voldoet ETH niet aan deze specificatie. Dit betekent dat **u ETH niet gemakkelijk** kunt inwisselen voor andere ERC-20 tokens of **ETH kunt gebruiken in apps die gebruikmaken van de ERC-20-standaard**. ETH “wrappen” geeft u de mogelijkheid om het volgende te doen:

- **Wissel ETH in voor ERC-20-tokens**: u kunt ETH niet direct inwisselen voor andere ERC-20 tokens. WETH is een weergave van ether die voldoet aan de ERC-20 vervangbare tokenstandaard en kan worden uitgewisseld met andere ERC-20 tokens.

- **ETH gebruiken in dapps**: omdat ETH niet ERC20-compatibel is, moeten ontwikkelaars aparte interfaces maken (één voor ETH- en één voor ERC-20 tokens) in dapps. ETH “wrappen” neemt dit obstakel weg en biedt ontwikkelaars de mogelijkheid om ETH en andere tokens binnen dezelfde dapp te verwerken. Veel gedecentraliseerde financiële applicaties gebruiken deze standaard en creëren markten voor het uitwisselen van deze tokens.

## Wrapped ether (WETH) vs ether (ETH): wat is het verschil? {#weth-vs-eth-differences}

|           | **Ether (ETH)**                                                                                                                                                                                                                                 | **Wrapped Ether (WETH)**                                                                                                                                                                                                                                                                                 |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aanvoer   | De aanvoer van ETH wordt aangestuurd door het Ethereum-protocol. De [uitgifte](/routekaart/samenvoeging/uitgifte) van ETH wordt afgehandeld door Ethereum-validators bij het verwerken van transacties en het aanmaken van blocks. | WETH is een ERC-20-token waarvan de levering wordt aangestuurd door een smart contract. Nieuwe eenheden van WETH worden uitgegeven door het contract nadat het ETH-stortingen ontvangt van gebruikers, of eenheden van WETH worden verbrand als een gebruiker WETH wil inwisselen voor ETH. |
| Eigendom  | Het eigendom wordt door het Ethereum-protocol bijgehouden via uw accountsaldo.                                                                                                                                                                     | Het eigendom van WETH wordt beheerd door het smart contract van de WETH-token, beveiligd door het Ethereum-protocol.                                                                                                                                                                                        |
| Brandstof | Ether (ETH) is de geaccepteerde betalingseenheid voor berekeningen op het Ethereum-netwerk. Gasvergoedingen worden uitgedrukt in gwei (een eenheid van ether).                               | Gas betalen met WETH-munten wordt niet rechtstreeks ondersteund.                                                                                                                                                                                                                                            |

## Veelgestelde vragen {#faq}

<ExpandableCard title="Do you pay to wrap/unwrap ETH?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

U betaalt gaskosten om ETH te "wrappen" of te "unwrappen" met behulp van het WETH-contract.

</ExpandableCard>

<ExpandableCard title="Is WETH safe?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETH wordt over het algemeen als veilig beschouwd omdat het gebaseerd is op een eenvoudig, beproefd smart contract. Het WETH-contract is ook formeel geverifieerd, wat de hoogste veiligheidsstandaard is voor smart contracts op Ethereum.

</ExpandableCard>

<ExpandableCard title="Why am I seeing different WETH tokens?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Naast de [canonieke implementatie van WETH](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) die op deze pagina wordt beschreven, zijn er andere varianten in het wild. Dit kunnen aangepaste tokens zijn die zijn gemaakt door app-ontwikkelaars of versies die zijn uitgegeven op andere blockchains, en kunnen zich anders gedragen of andere beveiligingseigenschappen hebben. **Controleer altijd zorgvuldig de tokeninformatie om te weten te komen met welke WETH-implementatie u interactie heeft.**

</ExpandableCard>

<ExpandableCard title="What are the WETH contracts on other networks?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Ethereum Mainnet](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)

</ExpandableCard>

## Further reading {#further-reading}

- [WTF is WETH?](https://weth.tkn.eth.limo/)
- [WETH-tokeninformatie op Etherscan](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
- [Formele verificatie van WETH](https://zellic.io/blog/formal-verification-weth)
