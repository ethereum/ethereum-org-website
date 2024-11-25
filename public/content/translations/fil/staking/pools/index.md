---
title: Pooled staking
description: Pangkalahatang-ideya tungkol sa kung paano magsimula sa pooled staking ng ETH
lang: fil
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-pool.png
alt: Lumalangoy sa pool ang rhino na si Leslie.
sidebarDepth: 2
summaryPoints:
  - Mag-stake at makakuha ng mga reward sa anumang halaga ng ETH sa pamamagitan ng pakikipagtulungan sa iba
  - Ipaubaya ang validator sa third party para sa mas madali at simpleng proseso
  - Ilagay ang mga staking token sa sarili mong wallet
---

## Ano ang mga staking pool? {#what-are-staking-pools}

Isang collaborative approach ang mga staking pool para payagan ang maraming may mas maliliit na halaga ng ETH na makuha ang 32 ETH na kailangan para ma-activate ang isang set ng mga key ng validator. Hindi native na sinusuportahan sa protocol ang pooling functionality, kaya hiwalay na gumawa ng mga solution para tugunan ang pangangailangang ito.

May ilang pool na gumagamit ng mga smart contract, kung saan maaaring ideposito ang mga pondo sa isang contract, na namamahala at sumusubaybay sa stake mo nang hindi umaasa sa third party, at nagbibigay sa iyo ng token na kumakatawan sa halagang ito. Maaaring hindi gumagamit ang ibang pool ng mga smart contract at off-chain na lang isinasaayos.

## Bakit dapat mag-stake sa isang pool? {#why-stake-with-a-pool}

Bukod sa mga benepisyo na aming inilahad sa aming [panimula sa staking](/staking/), ang staking sa isang pool ay may iba't ibang natatanging benepisyo.

<CardGrid>
  <Card title="Madaling makapasok" emoji="🐟" description="Not a whale? No problem. Most staking pools let you stake virtually any amount of ETH by joining forces with other stakers, unlike staking solo which requires 32 ETH." />
  <Card title="Mag-stake ngayon" emoji=":stopwatch:" description="Staking with a pool is as easy as a token swap. No need to worry about hardware setup and node maintenance. Pools allow you to deposit your ETH which enables node operators to run validators. Rewards are then distributed to contributors minus a fee for node operations." />
  <Card title="Mga Staking token" emoji=":droplet:" description="Many staking pools provide a token that represents a claim on your staked ETH and the rewards it generates. This allows you to make use of your staked ETH, e.g. as collateral in DeFi applications." />
</CardGrid>

<StakingComparison page="pools" />

## Ano ang dapat isaalang-alang {#what-to-consider}

Ang pooled o delegated staking ay hindi native na sinusuportahan ng Ethereum protocol, ngunit dahil sa demand ng mga user na mag-stake ng wala pang 32 ETH, mas maraming solution ang binuo upang punan ang demand na ito.

Ang bawat tool at ang mga tool o smart contract na ginagamit ng mga ito ay ginawa ng iba't ibang team, at may mga benepisyo at panganib ang bawat isa sa mga ito. Binibigyang-daan ng mga pool ang mga user na i-swap ang ETH nila sa token na kumakatawan sa staked ETH. Ang token ay kapaki-pakinabang dahil ito'y binibigyang-daan nito ang mga user na i-swap ang kahit anong halaga ng ETH sa yield-bearing token na may katumbas na halaga na kumikita mula sa mga reward sa staking na inilalapat sa kasalukuyang staked ETH (at vice versa) sa mga decentralized exchange kahit na ang mismong ETH ay mananatiling staked sa consensus layer. Nangangahulugan ito na ang pag-swap sa at mula sa yield-bearing staked-ETH product at "raw ETH" ay mabilis, madali, at hindi lang available sa mga multiple ng 32 ETH.

Gayunpaman, ang mga staked-ETH token na ito ay karaniwang nagdudulot ng mga kagawiang mala-cartel kung saan nakokontrol ng ilang centralized na organisasyon ang malaking halaga ng staked ETH sa halip na sa maraming independiyenteng indibidwal. Dahil dito, nagkakaroon ng sitwasyong nagbibigay-daan sa censorship o pagkuha ng halaga. Sa staking, palaging ang pinakamainam na sitwasyon ay ang mga indibidwal ang nagpapatakbo ng mga validator sa sarili nilang hardware hangga't maaari.

[Iba pang detalye tungkol sa mga panganib ng pag-stake ng mga token](https://notes.ethereum.org/@djrtwo/risks-of-lsd).

Gumagamit ng mga attribute indicator sa ibaba para ipakita ang mga kapansin-pansing kalakasan o kahinaan ng isang nakalistang staking pool. Gamitin ang seksyong ito bilang sanggunian sa kung paano namin tinutukoy ang mga attribute na ito habang pumipili ka ng pool na sasalihan.

<StakingConsiderations page="pools" />

## Tingnan ang mga staking pool {#explore-staking-pools}

May iba't ibang opsyon na available upang tulungan ka sa iyong setup. Gamitin ang mga indicator sa itaas para magabayan ka sa mga tool sa ibaba.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Tandaan ang kahalagahan ng pagpili ng serbisyo na seryoso sa [client diversity](/developers/docs/nodes-and-clients/client-diversity/), dahil pinapaigting nito ang seguridad ng network, at nililimitahan nito ang iyong panganib. Matutukoy ang mga serbisyo na may patunay ng paglilimita ng pangunahing paggamit ng kliyente sa pamamagitan ng <em style={{ textTransform: "uppercase" }}>"execution client diversity"</em> at <em style={{ textTransform: "uppercase" }}>"consensus client diversity."</em>

May mungkahi para sa staking tool na hindi namin nabanggit? Tingnan ang aming [patakaran sa product listing](/contributing/adding-staking-products/) para malaman kung ito ay angkop, at isumite ito para masuri.

## Mga karaniwang itanong {#faq}

<ExpandableCard title="Paano ako makakakuha ng mga reward?">
Karaniwan, ang mga ERC-20 staking token ay iniisyu sa mga staker at kumakatawan sa halaga ng kanilang na-stake na ETH kasama ang mga gantimpala. Tandaan na medyo magkakaiba ang paraan ng iba't ibang pool ng pamamahagi ng mga reward para sa staking sa kanilang mga user, pero pangkaraniwan ito.
</ExpandableCard>

<ExpandableCard title="Kailan ko puwedeng i-withdraw ang aking mga staked token?">
Ngayon na! Ang Shanghai/Capella network upgrade ay nangyari noong Abril 2023, at inilunsad nito ang mga pag-withdraw sa staking. Ang mga validator accounts na sumusuporta sa mga staking pool ngayon ay may kakayahang umalis at i-withdraw ang ETH at ilagay sa kanilang itinakdang withdrawal address. Dahil dito, magkakaroon ka ng kakayahang i-redeem ang bahagi mo sa stake para sa kasalukuyang ETH. Magtanong sa iyong provider upang malaman kung paano nila sinusuportahan ang functionality na ito.

Binibigyang-daan naman ng mga pool na gumagamit ng ERC-20 staking token ang mga user na i-trade ang token na ito sa open market. Kung gayon, maibebenta mo ang iyong staking position at makakapag-"withdraw" ka nang hindi inaalis ang EH sa staking contract.

<ButtonLink href="/staking/withdrawals/">Iba pang detalye tungkol sa mga pag-withdraw sa staking</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Iba ba ito sa pag-stake sa aking exchange?">
Maraming pagkakatulad ang mga opsyong ito sa pooled staking at mga centralized exchange, gaya ng kakayahang mag-stake ng maliliit na halaga ng ETH at pagsama-samahin ang mga ito upang mapagana ang mga validator.

Hindi katulad ng mga centralized exchange, gumagamit ang maraming iba pang opsyon sa pooled staking ng mga smart contract a/o mga staking token, na karaniwang mga ERC-20 token na puwedeng ilagay sa sarili mong wallet, at mabili o maibenta gaya ng ibang token. Nagbibigay ito ng layer ng sovereignty at seguridad sa pamamagitan ng pagbibigay sa iyo ng kontrol sa iyong mga token, pero hindi ka pa rin nito bibigyan ng direktang kontrol sa validator client na nagpapatunay para sa iyo sa background.

May ilang opsyon sa pooling na mas decentralized kumpara sa iba pagdating sa mga node na sumusuporta sa mga ito. Upang itaguyod ang kalagayan at decentralization ng network, palaging hinihikayat ang mga staker na pumili ng pooling service na nag-e-enable ng isang set ng mga node operator na hindi kailangan ng pahintulot at decentralized.
</ExpandableCard>

## Karagdagang pagbabasa {#further-reading}

- [The Ethereum Staking Directory](https://www.staking.directory/) - _Eridian at Spacesider_
- [Pag-stake gamit ang Rocket Pool - Pangkalahatang-ideya ng Staking](https://docs.rocketpool.net/guides/staking/overview.html) - _Mga dokumento ng RocketPool_
- [Pag-stake ng Ethereum gamit ang Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Mga pantulong na dokumento ng Lido_
