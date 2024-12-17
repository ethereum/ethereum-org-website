---
title: Panimula sa mga blockchain bridge
description: Binibigyang-daan ng mga bridge ang mga user ang paglipat-lipat sa iba't ibang blockchain ang kanilang pondo
lang: tl
---

# Mga blockchain bridges {#prerequisites}

_Ang Web3 ay naging ecosystem ng mga L1 blockchain at L2 scaling solution, dinisenyo ang bawat isa na may mga natatanging kakayahan at trade-off. Habang tumataas ang bilang ng mga protocol ng blockchain, tumataas din ang pangangailangan na ilipat ang mga asset sa mga chain. Upang mapunan ang pangangailangan na ito, kailangan natin ng mga bridge._

<Divider />

## Ano ang mga bridge? {#what-are-bridges}

Gumagana ang mga blockchain bridge na parang mga tulay sa tunay na buhay. Tulad ng kung paano pinag-uugnay ng pisikal na tulay ang dalawang pisikal na lokasyon, pinag-uugnay ng isang blockchain bridge ang dalawang blockchain ecosystem. **Ang mga bridge ay nagpapadali ng komunikasyon sa pagitan ng mga blockchain sa pamamagitan ng paglilipat ng impormasyon at mga asset**.

Isaalang-alang natin ang isang halimbawa:

Naninirahan ka sa USA at nagpaplano kang bumiyahe papuntang Europe. Mayroon kang USD, pero kailangan mo ng EUR para sa mga gastusin. Upang ipalit sa EUR ang iyong USD, maaari kang gumamit ng currency exchange na maliit ang bayad.

Ngunit, ano ang dapat mong gawin kung gusto mong gumawa ng katulad na palitan upang gumamit ng ibang [blockchain](/glossary/#blockchain)? Sabihin natin na gusto mong makipagpalitan [ETH](/glossary/#ether) sa Ethereum Mainnet para sa ETH sa [Arbitrum](https://arbitrum.io/). Tulad ng currency exchange na ginawa natin para sa EUR, kailangan natin ng paraan upang ilipat ang ating ETH sa Arbitrum mula sa Ethereum. Ginagawang posible ng mga bridge ang ganitong transaksyon. Sa ganitong sitwasyon, [may native na bridge ang Arbitrum](https://bridge.arbitrum.io/) na maaaring maglipat ng ETH sa Arbitrum mula sa Mainnet.

## Bakit kailangan natin ang mga bridge? {#why-do-we-need-bridges}

May mga limitasyon ang lahat ng blockchain. Para makapag-scale at makasabay ang Ethereum sa demand, kinailangan nito ang [rollups](/glossary/#rollups). Iba naman ang pagkakadisenyo ng mga L1 tulad ng Solana at Avalanche upang magbigay-daan sa mas mataas na throughput pero ang kapalit nito ay desentralisasyon.

Gayunpaman, lahat ng blockchain ay nabubuo sa magkakahiwalay na kapaligiran at may iba't ibang mga patakaran at [mga mekanismo](/glossary/#consensus) ng consensus. Ibig sabihin nito ay hindi makakakonekta sa orihinal na paraan ang mga ito, at hindi magagawa ng mga token na magpalipat-lipat sa mga blockchain.

Ginagamit ang mga bridge para pagkonektahin ang mga blockchain para makapaglipat ng impormasyon at mga token na ito sa isa't isa.

**Gumagana ang mga Bridge**:

- ang paglipat ng mga asset at impormasyon sa pagitan ng mga blockchain.
- [dapps](/glossary/#dapp) ay upang ma-access ang lakas ng iba't ibang mga blockchain – kaya't pinapataas ang kanilang kakayahan (dahil ang mga protocol ay may higit na espasyo para sa inobasyon).
- pag-access ng mga user sa mga bagong platform at pakinabangan ang mga benepisyo ng iba't ibang chain.
- pakikipagtulungan at paggawa ng mga developer mula sa iba't ibang blockchain ecosystem ng mga bagong platform para sa mga user.

[Paano madadala ang mga token sa layer 2](/guides/how-to-use-a-bridge/)

<Divider />

## Mga kaso na magagamit ang Bridge {#bridge-use-cases}

Narito ang ilang sitwasyon kung saan maaari kang gumamit ng bridge:

### Mas murang bayarin sa transaksyon {#transaction-fees}

Sabihin nating mayroon kang ETH sa Ethereum Mainnet ngunit mas gusto mo ng mas murang bayarin sa transaksyon upang subukan ang iba't ibang dapp. Sa pamamagitan ng pag-bridge ng iyong ETH sa Ethereum L2 rollup mula sa Mainnet, matutuwa ka sa mababang mga bayarin sa transaksyon.

### Mga dapp sa iba pang blockchain {#dapps-other-chains}

Kung gumagamit ka ng Aave sa Ethereum Mainnet para magpautang ng USDT ngunit mas mataas ang interest rate para sa pagpapautang ng USDT gamit ang Aave sa Polygon.

### Tingnan ang mga blockchain ecosystem {#explore-ecosystems}

Kung mayroon kang ETH sa Ethereum Mainnet at nais mong magsaliksik ng isang alternatibong L1 para subukan ang mga orihinal nitong dapp. Maaari kang gumamit ng bridge upang ilipat ang iyong ETH sa alt L1 mula sa Ethereum Mainnet.

### Mga sariling orihinal na crypto asset {#own-native}

Sabihin nating gusto mong magkaroon ng orihinal na Bitcoin (BTC), ngunit nasa Ethereum Mainnet lang ang iyong pondo. Upang magkaroon ng pagkakalantad sa BTC sa Ethereum, maaari kang bumili ng Wrapped Bitcoin (WBTC). Gayunpaman, ang WBTC ay isang [ERC-20](/glossary/#erc-20) orihinal na token sa network ng Ethereum, na nangangahulugang ito ay isang bersyon ng Bitcoin sa Ethereum at hindi ang orihinal na asset sa Bitcoin blockchain. Para magkaroon ng native na BTC, kailangan mong i-bridge ang iyong mga asset sa Bitcoin mula sa Ethereum gamit ang bridge. Ibi-bridge nito ang WBTC mo at gagawin nito itong original na BTC. Bilang kahalili, maaari kang magmay-ari ng BTC at gusto mong gamitin sa mga protocol [DeFi](/glossary/#defi) sa Ethereum. Magiging baliktad ang pag-bridge nito, mula sa BTC patungong WBTC na siyang magagamit bilang asset sa Ethereum.

<InfoBanner shouldCenter emoji=":bulb:">
  Maaari mo ring gawin ang lahat ng nabanggit gamit ang isang <a href="/get-eth/">sentralisadong palitan</a>. Gayunpaman, maliban kung nasa isang palitan na ang iyong mga pondo, maraming hakbang ang kailangan para dito, at magiging mas mainam kung gumamit ka na lang ng bridge.
</InfoBanner>

<Divider />

## Mga uri ng bridge {#types-of-bridge}

Maraming uri ng disenyo at detalye ang mga bridge. Karaniwang nahahati sa dalawang kategorya ang mga bridge: mapagkakatiwalaan at hindi mapagkakatiwalaan na mga bridge.

| Mga Mapagkakatiwalaan na Bridge                                                                                                                                                                                                            | Hindi Mapagkakatiwalaan na Mga Bridge                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ang mapagkakatiwalaan na mga bridge ay umaasa sa isang sentral na entidad o sistema para sa operasyon ng mga ito.                                                                                                                          | Pinapatakbo ang mga mapagkakatiwalaang bridge gamit ang mga smart contract at algoritmo.                                                                                                |
| May mga pagsasaalang-alang ng tiwala ang mga ito kaugnay ng pag-iingat ng pondo at seguridad ng bridge. Hindi mapagkakatiwalaan ang mga ito. Ibig sabihin, ang seguridad ng bridge ay kapareho ng seguridad ng pinagbabatayang blockchain. | Kailangang ipaubaya ng mga user ang pagkontrol sa kanilang mga crypto asset.                                                                                                            |
| Kailangang ipaubaya ng mga user ang pagkontrol sa kanilang mga crypto asset.                                                                                                                                                               | Sa pamamagitan ng [smart contracts](/glossary/#smart-contract), ang hindi mapagkakatiwalaang mga bridge ay nagbibigay-daan sa mga user na manatiling may kontrol sa kanilang mga pondo. |

Sa madaling salita, masasabi nating may mga pagsasaalang-alang ng tiwala ang mga mapagkakatiwalaang bridge, habang trust-minimized ang mga mapagkakatiwalaang bridge at hindi gumagawa ito ng mga bagong pagsasaalang-alang ng tiwala maliban para sa mga pangunahing domain. Narito kung paano maaaring ilarawan ang mga terminong ito:

- **Mapagkakatiwalaan**: may seguridad na katumbas ng seguridad ng mga pangunahing domain. Gaya ng pagsasalarawan ni [Arjun Bhuptani sa artikulong ito.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **Mga pagsasaalang-alang ng tiwala:** pag-alis sa seguridad ng mga pangunahing domain sa pamamagitan ng pagdaragdag ng mga external na verifier sa sistema, dahilan para maging hindi masyadong crypto-economically secure ito.

Upang mas maintindihan ang mga pangunahing pagkakaiba ng dalawang pamamaraan, tingnan natin ang isang halimbawa:

Isiping nasa security checkpoint ka sa airport. May dalawang uri ng mga checkpoint:

1. Mga Manual Checkpoint — pinapangasiwaan ng mga opisyal na mano-manong tinitingnan ang lahat ng detalye ng iyong ticket at pagkakakilanlan bago ibigay ang boarding pass.
2. Self Check-In — pinapangasiwaan ng machine kung saan ilalagay mo ang mga detalye ng iyong flight at matatanggap mo ang boarding pass kung tama ang lahat ng detalye.

Ang isang manual na checkpoint ay katulad ng isang pinagkakatiwalaang modelo dahil umaasa ito sa ikatlong partido, ibig sabihin, ang mga opisyal, para sa mga operasyon nito. Bilang user, pinagkakatiwalaan mo ang mga opisyal na gumawa ng mga tamang pasya at gamitin ang iyong pribadong impormasyon sa angkop na paraan.

Ang self check-in ay katulad ng hindi pinagkakatiwalaang modelo dahil inaalis nito ang papel ng operator at gumagamit ito ng teknolohiya para sa operasyon nito. Palaging mananatiling kontrolado ng mga user ang kanilang data at hindi nila kailangang ipaubaya sa ikatlong partido ang kanilang pribadong impormasyon.

Gumagamit ang maraming bridging solution ng mga modelo sa pagitan ng dalawang uring ito, na may iba't ibang antas ng pagiging hindi mapagkakatiwalaan.

<Divider />

## Use bridge {#use-bridge}

Using bridges allows you to move your assets across different blockchains. Here are some resources that can help you find and use bridges:

- **[L2BEAT Bridges Summary](https://l2beat.com/bridges/summary) & [L2BEAT Bridges Risk Analysis](https://l2beat.com/bridges/risk)**: A comprehensive summary of various bridges, including details on market share, bridge type, and destination chains. L2BEAT also has a risk analysis for bridges, helping users make informed decisions when selecting a bridge.
- **[DefiLlama Bridge Summary](https://defillama.com/bridges/Ethereum)**: A summary of bridge volumes across Ethereum networks.

<Divider />

## Panganib sa paggamit ng mga bridge {#bridge-risk}

Nasa mga unang yugto pa lang ng paga-unlad ang mga bridge. Malaki ang posibilidad na hindi pa natutuklasan ang pinakamagandang disenyo ng bridge. May kaakibat na panganib ang pag-interact sa anumang uri ng bridge:

- **Panganib sa Smart Contract —** ang panganib ng pagkakaroon ng bug sa code na maaaring magresulta sa pagkawala ng pondo ng user
- **Panganib sa Teknolohiya — **posibleng maabala ang operasyon ng user ng pagpalya ng software, buggy code, kamalian ng tao, spam, at mga mapaminsalang atake

Dagdag pa rito, dahil ang mga mapagkakatiwalaang bridge ay nagdadagdag ng mga pagsasaalang-alang ng tiwala, may kaakibat ang mga ito na mga karagdagang panganib tulad ng:

- **Panganib sa Censorship —** maaaring hadlangan ng mga operator ng bridge ang mga user sa paglipat ng kanilang mga asset gamit ang bridge
- **Panganib sa Pag-aari —** maaaring magsabwatan ang mga operator ng bridge upang nakawin ang mga pondo ng mga user

Nanganganib ang mga pondo ng user kung:

- may bug sa smart contract
- magkakamali ang user
- na-hack ang pangunahing blockchain
- may masamang hangarin ang mga operator ng bridge sa isang mapagkakatiwalaang bridge
- na-hack ang bridge

Ang isang kamakailang hack ay ang Wormhole bridge ng Solana, [kung saan 120k wETH ($325 milyong USD) ang nanakaw matapos ang pag-hack](https://rekt.news/wormhole-rekt/). Marami sa mga [pinakamalalaking hack sa mga blockchain ay may kinalaman sa mga bridge](https://rekt.news/leaderboard/).

Mahalaga ang mga bridge sa mga user na nasa onboarding sa mga Ethereum L2, at maging sa mga user na gustong gumamit ng iba't ibang ecosystem. Gayunpaman, dahil sa mga panganib na kaakibat ng pag-interact sa mga bridge, dapat maunawaan ng mga user ang mga trade-off ng mga bridge. Ito ang ilang [estratehiya para sa cross-chain security](https://blog.debridge.finance/10-strategies-for-cross-chain-security-8ed5f5879946).

<Divider />

## Karagdagang pagbabasa {#further-reading}

- [EIP-5164: Cross-Chain Execution](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) _Hunyo 18, 2022 - Brendan Asselstine_
- [L2Bridge Risk Framework](https://gov.l2beat.com/t/l2bridge-risk-framework/31) _Hulyo 5, 2022 - Bartek Kiepuszewski_
- ["Bakit ang kinabukasan ay magiging maraming chain, pero hindi magiging cross-chain."](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) _Enero 8, 2022 - Vitalik Buterin_
