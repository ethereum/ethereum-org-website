---
title: Panimula sa mga blockchain bridge
description: Binibigyang-daan ng mga bridge ang mga user na ilipat-ilipat sa iba't ibang blockchain ang pondo nila
lang: fil
---

# Mga blockchain bridge {#prerequisites}

_Ang Web3 ay naging ecosystem ng mga L1 blockchain at L2 scaling solution, kung saan may mga natatanging kakayahan at trade-off ang bawat isa. Habang dumarami ang mga blockchain protocol, lumalaki rin [ang demand na ilipat-lipat ng chain ang mga asset](<https://dune.xyz/eliasimos/Bridge-Away-(from-Ethereum)>). Upang mapunan ang demand na ito, kailangan natin ng mga bridge._

<Divider />

## Ano ang mga bridge? {#what-are-bridges}

Gumagana ang mga blockchain bridge na parang mga tulay sa tunay na buhay. Tulad kung paano pinag-uugnay ng pisikal na tulay ang dalawang pisikal na lokasyon, pinag-uugnay ng isang blockchain bridge ang dalawang blockchain ecosystem. Pinapadali ng mga bridge ang komunikasyon sa pagitan ng mga blockchain sa pamamagitan ng pag-transfer ng impormasyon at mga asset.

Tingnan natin ang isang halimbawa:

Naninirahan ka sa USA at nagpaplano kang bumiyahe sa Europe. Mayroon kang USD, pero kailangan mo ng EUR para sa mga gastusin. Upang gawing EUR ang USD mo, maaari kang gumamit ng currency exchange na may maliit na bayarin.

Ngunit ano ang gagawin mo kung nais mong magsagawa ng katulad na exchange para gumamit ng ibang blockchain? Sabihin nating gusto mong i-exchange ang ETH sa Ethereum Mainnet sa ETH sa [Arbitrum](https://arbitrum.io/). Tulad ng currency exchange na ginawa natin para sa EUR, kailangan natin ng paraan upang ilipat ang ating ETH sa Arbitrum mula sa Ethereum. Ginagawang posible ng mga bridge ang ganitong transaksyon. Sa ganitong sitwasyon, [may native na bridge ang Arbitrum](https://bridge.arbitrum.io/) na makakapag-transfer ng ETH sa Arbitrum mula sa Mainnet.

## Bakit kailangan natin ang mga bridge? {#why-do-we-need-bridges}

May kanya-kanyang limitasyon ang lahat ng blockchain. Upang makasabay ang Ethereum sa demand, iniatas nito ang mga rollup. Iba naman ang pagkakadisenyo ng mga L1 tulad ng Solana at Avalanche upang magbigay-daan sa mas mataas na throughput pero ang kapalit nito ay decentralization.

Gayunpaman, ang lahat ng blockchain ay dinede-develop sa mga isolated na environment at may iba't ibang panuntunan at consensus mechanism. Ibig sabihin nito, hindi makakakonekta sa native na paraan ang mga ito, at hindi magagawa ng mga token na magpalipat-lipat sa mga blockchain.

Ginagamit ang mga bridge para pagkonektahin ang mga blockchain para makapag-transfer ng impormasyon at mga token ang mga ito sa isa't isa.

Sa tulong ng mga bridge, naisasagawa ang mga sumusunod:

- cross-chain na pag-transfer ng mga asset at impormasyon
- pag-access ng mga dapp sa mga kakayahan ng iba't ibang blockchain – na nagpapahusay sa kakayahan ng mga ito (dahil mayroon nang mas malawak na design space para sa inobasyon ang mga protocol).
- pag-access ng mga user sa mga bagong platform at paggamit ng mga benepisyo ng iba't ibang chain.
- pag-collaborate at paggawa ng mga developer mula sa iba't ibang blockchain ecosystem ng mga bagong platform para sa mga user.

[Paano maidurugtong ang tokens sa layer 2](/guides/how-to-use-a-bridge/)

<Divider />

## Mga use case ng bridge {#bridge-use-cases}

Narito ang ilang sitwasyon kung saan maaari kang gumamit ng bridge:

### Mas murang bayarin sa transaksyon {#transaction-fees}

Sabihin nating mayroon kang ETH sa Ethereum Mainnet ngunit mas gusto mo ng mas murang bayarin sa transaksyon upang subukan ang iba't ibang dapp. Sa pamamagitan ng pag-bridge ng ETH mo sa Ethereum L2 rollup mula sa Mainnet, magiging mas mura ang iyong mga bayarin sa transaksyon.

### Mga dapp sa iba pang blockchain {#dapps-other-chains}

Kung gumagamit ka ng Aave sa Ethereum Mainnet para magpautang ng USDT ngunit mas mataas ang interest rate para sa pagpapautang ng USDT gamit ang Aave sa Polygon.

### Tingnan ang mga blockchain ecosystem {#explore-ecosystems}

Kung mayroon kang ETH sa Ethereum Mainnet at nais mong subukan ang isang alternatibong L1 para subukan ang mga native nitong dapp. Maaari kang gumamit ng bridge upang i-transfer ang iyong ETH sa alt L1 mula sa Ethereum Mainnet.

### Mga sariling native na crypto asset {#own-native}

Sabihin nating gusto mong magkaroon ng native na Bitcoin (BTC), ngunit nasa Ethereum Mainnet lang ang pondo mo. Upang magkaroon ng exposure sa BTC sa Ethereum, maaari kang bumili ng Wrapped Bitcoin (WBTC). Gayunpaman, ang WBTC ay isang ERC-20 token na native sa Ethereum network. Ibig sabihin, ito ay isang bersyon ng Bitcoin sa Ethereum at hindi ang orihinal na asset sa Bitcoin blockchain. Para magkaroon ng native na BTC, kailangan mong i-bridge ang iyong mga asset sa Bitcoin mula sa Ethereum gamit ang bridge. Ibi-bridge nito ang WBTC mo at gagawin nito itong native na BTC. Puwede ring mayroon ka nang BTC at gusto mo itong gamitin sa mga Ethereum DeFi protocol. Pabaligtad ang magiging pag-bridge nito, mula sa BTC patungong WBTC na siyang magagamit bilang asset sa Ethereum.

<InfoBanner shouldCenter emoji=":bulb:">
  Maaari mo ring gawin ang lahat ng nabanggit gamit ang isang <a href="/get-eth/">centralized exchange</a>. Gayunpaman, maliban kung nasa isang exchange na ang iyong mga pondo, maraming hakbang ang kailangan para dito, at magiging mas mainam kung gumamit ka na lang ng bridge.
</InfoBanner>

<Divider />

## Mga uri ng bridge {#types-of-bridge}

Maraing uri ng disenyo at detalye ang mga bridge. Karaniwang nahahati sa dalawang kategorya ang mga bridge: mga trusted at trustless bridge.

| Mga Trusted Bridge                                                                                                                                             | Mga Trustless Bridge                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Ang mga trusted bridge ay umaasa sa isang central entity o system para sa operasyon ng mga ito.                                                                | Pinapatakbo ang mga trust bridge gamit ang mga smart contract at algorithm.                                                         |
| May mga trust assumption ang mga ito kaugnay ng custody ng pondo at seguridad ng bridge. Umaasa ang karamihan sa mga user sa reputasyon ng operator ng bridge. | Trustless ang mga ito. Ibig sabihin, ang seguridad ng bridge ay kapareho ng seguridad ng pangunahing blockchain.                    |
| Kailangang ipaubaya ng mga user ang pagkontrol sa kanilang mga crypto asset.                                                                                   | Sa pamamagitan ng mga smart contract, binibigyang-daan ng mga trustless bridge ang mga user na kontrolin pa rin ang mga pondo nila. |

Sa madaling salita, masasabi nating may mga trust assumption ang mga trust bridge, habang trust-minimized ang mga trust bridge at hindi gumagawa ang mga ito ng mga bagong trust assumption maliban para sa mga pangunahing domain. Narito kung paano maaaring ilarawan ang mga terminong ito:

- **Trustless**: may seguridad na katumbas ng seguridad ng mga pangunahing domain. Gaya ng pagsasalarawan ni [Arjun Bhuptani sa artikulong ito.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **Mga trust assumption:** pag-alis sa seguridad ng mga pangunahing domain sa pamamagitan ng pagdaragdag ng mga external na verifier sa system, dahilan para maging hindi masyadong crypto-economically secure ito.

Upang mas maintindihan ang mga pangunahing pagkakaiba ng dalawang pamamaraan, tingnan natin ang isang halimbawa:

Isiping nasa security checkpoint ka sa airport. May dalawang uri ng mga checkpoint:

1. Mga Manual Checkpoint — pinapangasiwaan ng mga opisyal na mano-manong tinitingnan ang lahat ng detalye ng iyong ticket at pagkakakilanlan bago ibigay ang boarding pass.
2. Self Check-In — pinapangasiwaan ng machine kung saan ilalagay mo ang mga detalye ng iyong flight at matatanggap mo ang boarding pass kung tama ang lahat ng detalye.

Ang mga manual checkpoint ay katulad ng isang trusted model dahil pinapangasiwaan ito ng third party, ibig sabihin, ang mga opisyal. Bilang user, pinagkakatiwalaan mo ang mga opisyal na gumawa ng mga tamang pasya at gamitin ang iyong pribadong impormasyon sa angkop na paraan.

Ang self check-in ay katulad ng trustless model dahil inaalis nito ang papel ng operator at gumagamit ito ng teknolohiya para sa operasyon nito. Palaging mananatiling kontrolado ng mga user ang kanilang data at hindi nila kailangang ipaubaya sa third party ang kanilang pribadong impormasyon.

Gumagamit ang maraming bridging solution ng mga model sa pagitan ng dalawang uring ito, na may iba't ibang antas ng pagiging trustless.

<Divider />

## Panganib sa paggamit ng mga bridge {#bridge-risk}

Nasa mga unang yugto pa lang ng development ang mga bridge. Malaki ang posibilidad na hindi pa natutuklasan ang pinakamagandang disenyo ng bridge. May kaakibat na panganib ang pag-interact sa anumang uri ng bridge:

- **Panganib sa Smart Contract —** ang panganib ng pagkakaroon ng bug sa code na maaaring magresulta sa pagkawala ng pondo ng user
- **Panganib sa Teknolohiya — **posibleng maabala ang operasyon ng user ng pagpalya ng software, buggy code, kamalian ng tao, spam, at mga mapaminsalang atake

Dagdag pa rito, dahil ang mga trusted bridge ay nagdadagdag ng mga trust assumption, may kaakibat ang mga ito na mga karagdagang panganib tulad ng:

- **Panganib sa Censorship —** maaaring hadlangan ng mga operator ng bridge ang mga user sa pag-transfer ng kanilang mga asset gamit ang bridge
- **Panganib sa Pag-aari —** maaaring magsabwatan ang mga operator ng bridge upang nakawin ang mga pondo ng mga user

Nanganganib ang mga pondo ng user kung:

- may bug sa smart contract
- magkakamali ang user
- na-hack ang pangunahing blockchain
- may masamang hangarin ang mga operator ng bridge sa isang trusted bridge
- na-hack ang bridge

Ang isang kamakailang hack ay ang Wormhole bridge ng Solana, [kung saan 120k wETH ($325 milyong USD) ang nanakaw matapos ang pag-hack](https://rekt.news/wormhole-rekt/). Marami sa mga [pinakamalalaking hack sa mga blockchain ay may kinalaman sa mga bridge](https://rekt.news/leaderboard/).

Mahalaga ang mga bridge sa mga user na nasa onboarding sa mga Ethereum L2, at maging sa mga user na gustong gumamit ng iba't ibang ecosystem. Gayunpaman, dahil sa mga panganib na kaakibat ng pag-interact sa mga bridge, dapat maunawaan ng mga user ang mga trade-off ng mga bridge. Ito ang ilang [estratehiya para sa cross-chain security](https://blog.debridge.finance/10-strategies-for-cross-chain-security-8ed5f5879946).

<Divider />

## Karagdagang pagbabasa {#further-reading}

- [EIP-5164: Cross-Chain Execution](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) _Hunyo 18, 2022 - Brendan Asselstine_
- [L2Bridge Risk Framework](https://gov.l2beat.com/t/l2bridge-risk-framework/31) _Hulyo 5, 2022 - Bartek Kiepuszewski_
- ["Bakit ang kinabukasan ay magiging maraming chain, pero hindi magiging cross-chain."](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) _Enero 8, 2022 - Vitalik Buterin_
- [Ano ang Mga Blockchain Bridge at Paano Natin Maiuuri ang Mga Ito?](https://blog.li.finance/what-are-blockchain-bridges-and-how-can-we-classify-them-560dc6ec05fa) _Pebrero 18, 2021 - Arjun Chand_
- [Ano ang Mga Cross-Chain Bridge?](https://www.alchemy.com/overviews/cross-chain-bridges) _Mayo 10, 2022 - Alchemy_
- [Mga Blockchain Bridge: Pagbuo ng Mga Network ng Mga Cryptonetwork](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) _Setyembre 8, 2021 - Dmitriy Berenzon_
- [Mga Bridge sa Crypto-Space](https://medium.com/chainsafe-systems/bridges-in-crypto-space-12e158f5fd1e) _Agosto 23, 2021 - Ben Adar Hyman_
- [Ang Interoperability Trilemma](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17) _Okt 1, 2021 - Arjun Bhuptani_
- [I-secure ang Bridge: Maayos na Cross-Chain Communication](https://medium.com/dragonfly-research/secure-the-bridge-cross-chain-communication-done-right-part-i-993f76ffed5d) _Agosto 23, 2021 - Celia Wan_
