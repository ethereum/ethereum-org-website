---
title: Intrdukshon to blockchain bridges
description: Bridges dey give users shans to karry dem funds go difren blockchains
lang: pcm
---

# Blockchain bridges {#prerequisites}

_Web3 don turn to ekosystem of L1 blockchains and L2 skaling solushons, dem disign ish wit unik kapabilitis and trade-offs. As di numba of blockchain protokols dey grow, na so di dimand to muv assets akross chains dey grow too. To fulful dis dimand, wi nid bridges._

<Divider />

## Wetin bi bridges? {#what-are-bridges}

Blockchain bridges wok juz laik di bridges wey wi sabi for di fisika world. As bridges for real world dey take connect two physical places, na so blockchain bridge dey konet two blockchain ekosystems. **Bridges dey make am izy to komunikate bitwin blockchains thru di transfa of informashon and assets**.

Make wi sheck one eksampol:

Yu kome from USA and dey plan one trip to Europe. Yu get USD, but yu nid EUR to spend. To ekshanj yor USD for EUR yu fit yus one kurensy ekshanj for one smoll fee.

But, wetin yu go do if yu wan make same ekshanj to yus one difren [blockchain](/glossary/#blockchain)? Make wi sey yu wan ekshanj [ETH](/glossary/#ether) for Ethereum Mainnet for ETH on [Arbitrum](https://arbitrum.io/). Laik di kurensy ekshanj wi don make for EUR, wi nid one metod to muv awa ETH from Ethereum to Arbitrum. Bridges make such transakshon posibol. In dis kase, [Arbitrum get one native bridge](https://bridge.arbitrum.io/) wey fit transfa ETH from Mainnet go Arbitrum.

## Why wi kon nid bridges? {#why-do-we-need-bridges}

All blockchains get dem limitashons. For Ethereum to scale and kip up wit dimand, im nid [rollups](/glossary/#rollups). Also, dem don disign L1s laik Solana and Avalanche for difren ways to enabol thruput wey high pass for di kost of disentralizashon.

Haueva, all blockchains divelop for isolated environment kon get difren rules and [konsensus](/glossary/#consensus) metods. Dis means dem nor fit komunikate, and tokens nor fit muv freely bitwin blockchains.

Bridges exist to konet blockchains, as e dey allow di transfa of informashon and tokens bitwin dem.

**Bridges dey enabol**:

- di kross-chain transfa of assets and infornashon.
- [dapps](/glossary/#dapp) to dey access di pawa of difren blockchains - as im dey inkrease dem ability (as protokols kon get more disign space for innovashon).
- users to access new platfoms and leveraj di benefits of difren chains.
- divelopas, wey dey difren blockchain ekosystems to kolaborate and build new platfoms for di users.

[Hau yu fit bridge tokens to layer2](/guides/how-to-use-a-bridge/)

<Divider />

## Bridge yus kases {#bridge-use-cases}

Di followin na some eksampol wia yu fit yus one bridge:

### Lowa transakshon fees {#transaction-fees}

Make wi sey yu get ETH on Ethereum Mainnet but wont transakshon fees wey sheap pass to eksplore difren dapps. If yu bridge yor ETH from Mainnet to one Ethereum L2 rollup, yu fit enjoy lowa transakshon fees.

### Dapps wey dey oda blockchains {#dapps-other-chains}

If yu don dey yus Aave on Ethereum Mainnet to lend USDT but di intrest rate to dey yus lend USDT wey dey yus Aave on Polygon dey high pass.

### Eksplor blockchain ekosystems {#explore-ecosystems}

If yu get ETH on top Ethereum Mainnet and yu wan eksplor one alt L1 to try out dem native dapps. Yu fit yus one bridge to transfa yor ETH from Ethereum Mainnet to di alt L1.

### Own native crypto assets {#own-native}

Make wi sey yu wan own mative Bitcoin (BTC), but yu only get funds for Ethereum Mainnet. If yu wan gain eksposure to BTC for Ethereum, yu fit buy Wrapped Bitcoin (WBTC). Haueva, WBTC na [ERC-20](/glossary/#erc-20) token native to Ethereum netwok, and dis tin mean sey na Ethereum vashon of Bitcoin, and nor bi original asset for Bitcoin blockchain. To own native BTC, yu go nid bridge yor assets from Ethereum to Bitcoin as yu dey yus one bridge. Dis go bridge yor WBTC and konvert am into native BTC. Also, yu fit own BTC and wan yus am for Ethereum [DeFi](/glossary/#defi) protokols. Dis go nid to dey bridge di oda way, from BTC to WBTC wey dem fit kon yus as one asset on Ethereum.

<InfoBanner shouldCenter emoji=":bulb:">
  Yu fit also do all of di above as yu dey yus one <a href="/get-eth/">sentralized ekshanj</a>. Haueva, onless yor funds don already dey on one ekshanj, im go nid plenti steps, and yu go fit get betta as yu dey yus bridge.
</InfoBanner>

<Divider />

## Types of bridge {#types-of-bridge}

Bridges get plenti types of disigns and komplex tins. Generaly, bridges foll into two kategoris: bridges wey dem trust and wey dem nor trust.

| Bridges Wey Dem Trust                                                                                                                              | Bridges Wey Dem Nor Trust                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Bridges wey dem trust dipend on sentral entity abi system for dem operashons.                                                                      | Bridges wey dem nor trust dey operate yusin smart kontracts and algorithms.                                                      |
| Dem get trust asumpshons as per respet to di kustody of funds and di sekurity of di bridge. Users rily dipend on di reputashon of bridge operator. | Pipol nor trust dem, as in, di sekurity of di bridge na di same tin wit onderlying blockchain.                                   |
| Users nid to give up kontrol of dem crypto assets.                                                                                                 | Thru [smart kontracts](/glossary/#smart-contract), bridges wey dem nor trust dey enabol users to rimain in kontrol of dem funds. |

In smoll tok, wi fit sey di bridges wey dem trust get trust asumpshons, but bridges wey dem nor trust dey trust-minimized and nor make new trust asumpshons pass doz of di onderlying domains. Hia na hau dem fit diskribe dis terms:

- **Wey nor get trust**: to get same sekurity to di onderlying domains. As dem diskribe by [Arjun Bhuptani in dis artikol.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **Trust asumpshons:** to dey muv away from sekurity of di onderlying domains by addin ekstanal verifiers in di system, dis dey make am less sekure crypto-ekonomikaly.

To divelop one betta ondastandin of di key difrens bitwin di two ways, make wi take one eksampol:

Imagin yu dey for airport sekurity sheckpoint. Two types of sheckpoints dey:

1. Manual sheckpoints — wey dem offishials wey dey manualy sheck all di ditails of yor ticket and identity dey operate bifor dem hand ova di boarding pass.
2. Sef Sheck-In — wey mashine dey operate wia yu put yor flight ditails and dey risiv di boarding pass if efritin sheck out.

Manual sheckpoints na di same tin to model wey dem trust as im dipend upon one third party, as in., di offishials, for im operashons. As one user, yu trust di offishials to make di rite disishon and yus yor private infomashon wella.

Sef sheck-in na di same model dem nor trust as im rimuv di operator role and dey yus teknology for im operashons. Users dey always rimain in kontrol of dem data and nor get to trust one third party wit dem private infomashon.

Plenti solushons wey dey bridge dey adopt model bitwin dis two oposite ends wit digree of trust wey dey shanj.

<Divider />

## Yus bridge {#use-bridge}

To dey yus bridges dey allow yu muv yor assets akross difren blockchains. Here na some risorsis wey fit helep yu find and yus bridges:

- **[L2BEAT Bridges Summary](https://l2beat.com/bridges/summary) & [L2BEAT Bridges Risk Analysis](https://l2beat.com/bridges/risk)**: One ogbonge summary of difren bridges, wey inklude ditails on market shia, bridge type, and destinashon chains. L2BEAT also get one risk analysis for bridges, as im dey helep users make koret disishons wen dem dey selet one bridge.
- **[DefiLlama Bridge Summary](https://defillama.com/bridges/Ethereum)**: One summary of bridge volumes akross Ethereum netwoks.

<Divider />

## Risk to dey yus bridges {#bridge-risk}

Bridges dey early stajis of divelopment. Im fit bi sey dem neva diskova di bridge disign wey beta pass. To dey interact wit any type of bridge dey karry risk:

- **Smart Kontract Risk —** di risk of one bug in di kode wey fit kause user funds to lost
- **Teknology Risk —** softwia failure, kode wey dey bug, human error, spam, and malishios attaks fit spoil user operashons

Moreova, sinse bridges dem trust dey add trust asumpshons, dem karry adishonal risks laik:

- **Sensorship Risk —** bridge operators fit stop users make dem nor transfa dem assets as dem dey yus di bridge
- **Kustodial Risk —** bridge operators fit jam to steal di users funds

User funds dey at risk if:

- one bug dey di smart kontract
- di user dey make error
- dem don hack di onderlying blockchain
- di bridge operators get malishios intent for one bridge wey dem trust
- dem hack di bridge

One risent hack na Solana wormhole bridge, [wia dem steal 120k wETH ($325million USD) durin di hack](https://rekt.news/wormhole-rekt/). Plenti of [top hacks for blockchains involve bridges](https://rekt.news/leaderboard/).

Bridges dey impotant to start to yus users onto Ethereum L2s, even for users wey wan eksplor plenti ekosystems. Haueva, wit di risk wey involve to dey interact wit bridges, users suppose onderstan di trade-offs wey di bridges dey make. Dis na some [strategis for kross-chain sekurity](https://blog.debridge.finance/10-strategies-for-cross-chain-security-8ed5f5879946).

<Divider />

## Further reading {#further-reading}

- [EIP-5164: Kross-Chain Exekushon](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) _June 18, 2022 - Brendan Asselstine_
- [L2Bridge Risk Framework](https://gov.l2beat.com/t/l2bridge-risk-framework/31) _July 5, 2022 - Bartek Kiepuszewski_
- ["Why bi sey di fushure go bi multi-chain, but im nor go bi kross-chain."](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) _January 8, 2022 - Vitalik Buterin_
