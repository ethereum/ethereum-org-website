---
title: Pooled stakin
description: Ovaview of hau to start wit pooled ETH staking
lang: pcm
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-pool.png
alt: Leslie na di rhino weh deh swim for di pool.
sidebarDepth: 2
summaryPoints:
  - Stake and earn riwods wit any amount of TEH as yu dey join forces wit odas
  - Skip di hard part and entrust validator operashon to one third-party
  - Hold to dey stake tokens in yor own wallet
---

## Wetin bi staking pools? {#what-are-staking-pools}

Staking pools na kollaborative way to allow many wit amount of ETH wey smoll pass to obtain di 32 ETH wey wi nid to aktivate one set of validator keys. Di protokol not rily dey suppot hau pooling dey funkshon, so dem don build seprate out solushons out to solve dis nid.

Some pools dey operate wit smart kontracts, wia dem fit deposit funds to one kontract, wey dey manaj and trak yor stake wit trust, and dey give yu token wey dey reprisent dis value. Oda pools nor fit get smart kontracts and insted dey mediate off-chain.

## Why yu dey stake wit one pool? {#why-stake-with-a-pool}

In addishon to di benefits wi outline for waw [intro to staking](/staking/), to dey stake wit pool dey kome wit one numba of difren benefits.

<CardGrid>
  <Card title="Smoll tins wey nor fit make yu enta" emoji="🐟" description="Not a whale? No problem. Most staking pools let you stake virtually any amount of ETH by joining forces with other stakers, unlike staking solo which requires 32 ETH." />
  <Card title="Make yu put money tuday" emoji=":stopwatch:" description="Staking with a pool is as easy as a token swap. No need to worry about hardware setup and node maintenance. Pools allow you to deposit your ETH which enables node operators to run validators. Rewards are then distributed to contributors minus a fee for node operations." />
  <Card title="Staking tokens" emoji=":droplet:" description="Many staking pools provide a token that represents a claim on your staked ETH and the rewards it generates. This allows you to make use of your staked ETH, e.g. as collateral in DeFi applications." />
</CardGrid>

<StakingComparison page="pools" />

## Wetin to konsida {#what-to-consider}

Ethereum protokol nor dey suppot pooled abi delegated staking, but bikos plenti pipol wan stake less than 32 ETH, dem don build plenti solushons to take kia of dis dimand.

Efri pool and di tools abi smart kontracts dem yus to build difren teams, and ish get im own benefits and risks. Pools dey make users to swap dia ETH for token wey dey reprisent ETH wey dem don stake. Di token dey yusful bikos im dey allow users to swap any amount of ETH to ekwol amount wey dey produs token dat generate return from di staking riwods wey dem apply to di ETH wey dem don stake bifor (and smae for di oda) on top di didentralized ekshanjis even doh dem still dey stake di akshual ETH on di konsensus layer. Dis means swaps wey dey hapun up and down from ield-bearing staked-ETH product and "raw ETH" dey kwik, izy and nor only dey afailabol for multipols of 32 ETH.

Haueva, dis tokens wey dem stake wan kreate bihavior wey bi laik cartel wia big amount of ETH wey dem stake end up onda di kontrol of few sentralized organizashon rada dan spread akross many indipendent pesins. Dis dey kreate kondishons for sensorship abi value ekstrashon. Di gold standard to dey stake suppose always bi for pesin wey dey run validators on dem own hardwia weneva posibol.

[More on risks of staking tokens](https://notes.ethereum.org/@djrtwo/risks-of-lsd).

Dem dey yus attribute indikators bilow to signal notabol strengths abi wikness wey list of staking pool fit get. Yus dis sekshon as one referens for hau wi difine dis atribute as yu dey shuse one pool to join.

<StakingConsiderations page="pools" />

## Make yu explore staking pools {#explore-staking-pools}

Plenti of opshons dey afailabol to helep yu wit yor setup. Make yu yus di above indikators to helep guide yu thru di tools bilow.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Abeg make yu note di impotans to shuse one savis wey dey take [klient diversity](/developers/docs/nodes-and-clients/client-diversity/) sirious, as im dey impruf di sikurity of di netwok, and dey ridus yor risk. Savis wey get evidens to dey ridus plenti klient dey yus na im dem don indikate wit <em style={{ textTransform: "uppercase" }}>"exekushon klient diversity"</em> and <em style={{ textTransform: "uppercase" }}>"konsensus klient diversity."</em>

Shey yu get sugeshon for one staking toll wey wi miss? Yu fit shek out awa [product listing policy](/contributing/adding-staking-products/) to si if im go fit yu to submit am for review.

## Frequently asked questions {#faq}

<ExpandableCard title="Hau I fit earn riwods?">
Normal, dem dey give ERC-20 staking tokens to pipol wey dey stake and dey reprisent di value of ETH wey dem stake plus riwods. Make yu kip in mind dat difren pools go distribute staking riwods to dia users thru smoll difren metods, but dis na di komon theme.
</ExpandableCard>

<ExpandableCard title="Wen I fit witdraw my stake?">
Nau nau! Di Shanghai/Capella netwok upgrade wey hapun for April 2023, and don introdus staking witdrawals. Validator akants wey dey back staking pools nau get ability to komot and witdraw ETH to dia witdrawal address wey dem want. Dis enabol di ability to get yor porshon of stake back for di ETH dem stake. Shek wit yor provida to see hau dem suppot dis funshonality.

Anoda tin bi sey, pools wey dey yus one ERC-20 dey stake token wey dey allow users to trade dis token in di open market, and dey allow yu sell yor staking posishon, effektively "witdrawing" witout rimuving ETH from di staking kontract.

<ButtonLink href="/staking/withdrawals/">More on staking witdrawals</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Shey dis dey difren from staking wit my ekshanj?">
Plenti tins dey di same bitwin dis pooled staking opshons and sentalized ekshanjis, such as di ability to stake smoll amounts of ETH and gada dem togeda to aktivate validators.

Unlaik sentralized ekshanjis, many oda pooled staking opshons dey yus smart kontracts and/abi staking tokens, wey ushualy bi ERC-20 tokens wey yu fit hold in yor own wallet, and don buy or sell just laik any oda token. Dis give one layer of pawa and sikurity as im dey give yu kontrol ova yor tokens, but still nor dey give yu diret kontrol ova di validator klient to dey attest on yor behalf in di bakground.

Some pooling opshons dey more disentralized pass odas wen im kome to di nodes wey dey back dem. To promote di health and disentralizashon of di netwok, dem dey enkoraj pipol wey dey stake to always selet one pooling savis wey dey enabol disentralized set of nodes operators wey nor get pamishon.
</ExpandableCard>

## Further reading {#further-reading}

- [Di Ethereum Staking Directory](https://www.staking.directory/) - _Eridian and Spacesider_
- [Staking wit Rocket Pool - Staking Ovaview](https://docs.rocketpool.net/guides/staking/overview.html) - _RocketPool docs_
- [Hau dem dey take stake Wit Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Lido helep docs_
