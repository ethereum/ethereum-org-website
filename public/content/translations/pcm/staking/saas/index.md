---
title: To dey stake as one savis
description: Ovaview of hau to start wit pooled ETH staking
lang: pcm
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: Leslie di rhino wey dey float ontop klouds.
sidebarDepth: 2
summaryPoints:
  - Third-party node operators dey yus di operashon of yor validator klient
  - Dis opshon for anyone wit 32 ETH wey nor feel komfotabol to deal wit di teknika komplexity to dey run node
  - Ridus trust, and maintain kustody of yor witdrawal keys
---

## Wetin bi staking as one savis? {#what-is-staking-as-a-service}

Staking as a savis (“SaaS") dey reprisent one kategory of staking savis wia yu deposit yor own 32 ETH for one validator, but delegate node operashons to one third-party operator. Dis process ushualy involve make dem guide yu thru di initial setup, inkludin key generashon and deposit, den to dey upload yor signing keys to di operator. Dis dey allow di savis to operate yor validator on yor behalf, ushualy for one monthly fee.

## Why stake wit one savis? {#why-stake-with-a-service}

Di Ethereum protokol nor dey suppot delegashon of stake, so dem don build dis savis to fill dis dimand. If yu get 32 ETH to stake, but nor feel komfotabol to dey deal wit hardwia, SaaS savis allow yu to delegate di hard part as yu dey earn native block riwods.

<CardGrid>
  <Card title="Yor own validator" emoji=":desktop_computer:" description="Deposit your own 32 ETH to activate your own set of signing keys that will participate in Ethereum consensus. Monitor your progress with dashboards to watch those ETH rewards accumulate." />
  <Card title="Izy to start" emoji="🏁" description="Forget about hardware specs, setup, node maintenance and upgrades. SaaS providers let you outsource the hard part by uploading your own signing credentials, allowing them to run a validator on your behalf, for a small cost." />
  <Card title="Ridus yor risk" emoji=":shield:" description="In many cases users do not have to give up access to the keys that enable withdrawing or transferring staked funds. These are different from the signing keys, and can be stored separately to limit (but not eliminate) your risk as a staker." />
</CardGrid>

<StakingComparison page="saas" />

## Wetin to konsida {#what-to-consider}

A growing memba of SaaS providas dey to helep yu stake yor ETH, but dem all have dia own benefits and risks. All SaaS opshons nid adishonal trust asumpshons kompia to home-staking. Saas opshons fit get adishonal kode wey dey wrap di Ethereum klients wey nor dey open abi auditabol. SaaS also get detrimental effect on netwok disentralizashon. Dipending on di setup, yu fit nor kontrol yor validator - di operator fit nor dey true as yu dey yus yor ETH.

Dem yus attribute indikators bilow to signal notabol strengths abi wikness wey one listed SaaS provida fit get. Yus dis sekshon as refrens for hau wi difine dis attribute as yu dey shuse one savis to helep yu wit yor staking journey.

<StakingConsiderations page="saas" />

## Make yu eksplore staking savis providas {#saas-providers}

Bilow na some afailabol SaaS providas. Yus di above indikators to helep guide yu thru dis savis.

<ProductDisclaimer />

### SaaS providas

<StakingProductsCardGrid category="saas" />

Abeg note di impotans to dey suppot [klient diversity](/developers/docs/nodes-and-clients/client-diversity/) as im dey impruf di sekurity of di netwok, and ridus yor risk. Savis wey get evidens to dey ridus plenti klient dey yus na im dem don indikate wit <em style={{ textTransform: "uppercase" }}>"exekushon klient diversity"</em> and <em style={{ textTransform: "uppercase" }}>"konsensus klient diversity."</em>

### Key Generators

<StakingProductsCardGrid category="keyGen" />

Get one sugeshon for one staking-as-a-service provida wey wi miss? Yu fit shek out awa [product listing policy](/contributing/adding-staking-products/) to si if im go fit yu to submit am for review.

## Frequently asked questions {#faq}

<ExpandableCard title="Who dey hold my keys?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Arrangements go dey difren from provida-to-provida, but wi go guide yu thru setting up any signing keys yu nid (one per 32 ETH), and dey uoload dis to yor provida to allow dem to validate on yor behalf. Di signing keys alone do not give any ability to witdraw, transfa, abi spend yor funds. Haueva, dem do provide di ability to kast votes towods konsensus, wich if wi nor do am well fit rizut in offline penatis abi slashing.
</ExpandableCard>

<ExpandableCard title="So two sets of keys dey?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Na so. Ish akant dey kompromise of both BLS <em>signing</em> keys, and BLS <em>withdrawal</em> keys. In order for one validator to attest to di state of di chain, partisipate in sync kommittees and propose blocks, di signing keys suppose dey readily accessibol by validator klient. Dis suppose dey konet to di intanet in some form, and thus dey konsida to bi "hot" keys. Dis na one rikwayament for yor validator to bi abol to attest, and thus di keys wey wi yus to transfa abi witdraw funds wey wi don seprate for sekurity rizins.

Wi dey yus di BLS witdrawals keys to sign one-taim messaj wey dey diklare wich exekushon layer akant staking riwods and wia funds wey go komot suppose go to. Wons dis messaj komot, wi nor longa nid di <em>BLS withdrawal</em> keys. Insted, kontrol ova funds wey yu don witdraw dey always go to di address yu don provide. Dis dey allow yu set one witdrawal address wey dey sikure thru yor own kold storaj, minimizing risk to yor validator funds, even if someone else dey kontrol yor validator to dey sign keys.

To dey update witdrawal kredenshials na rikwayad step to enabol witdrawals\*. Dis process involve to dey generate di witdrawal keys as yu dey yus mnemonik seed fraiz.

<strong>Make sure sey yu dey back dis seed fraiz up safely abi yu nor go fit generate yor witdraw keys wen di taim komes.</strong>

\*Stakers wey provide one witdrawal address wit first deposit nor nid to set dis. Sheck wit yor SaaS provida for suppot as rigads hau to dey pripia yor validator.
</ExpandableCard>

<ExpandableCard title="Wen I fit witdraw?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Dem don impliment staking witdrawals in di Shanghai/Capella upgrade for April 2023. Stakers nid to provide one witdrawal address (if yu nor provide am for first deposit), and riwod payments go bigin dey distribute automatikaly on one piriodik basis efri few days.

Validators fit komot kpatakpata as validator, wich go unlock dia ETH balans for witdrawal wey dey rimain. Akants wey don provide one exekushon witdrawal address and don komplete di process to komot go risiv dia entaya balans to di witdrawal address wey dem provide durin di next validator sweep.

<ButtonLink href="/staking/withdrawals/">More on staking witdrawals</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Wetin dey hapun if dem slash me?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
As yu dey yus one SaaS provida, yu dey entrust di operashon of yor node to someone else. Dis kome wit di risk of poor node paformans, wich nor dey yor kontrol. In di event yor validator dey slashed, dem go penalize yor validator balans and rimuv yu by forse from di validator pool.

Afta kompleshon of di slashing/exiting process, dem go transfa dis funds to di witdrawal address wey dem assign to di validator. Di rikwaya to dey provide one witdrawal address to enabol. Dis for don provide di first deposit. If not, yu go nid di validator witdrawal keys to sign one messaj wey dey diklare witdrawal address. If yu nor provide any witdrawal address, funds go rimain lock ontil yu provide am.

Make yu kontact SaaS provida for more details on any guaratees abi insurans opshons, and for instrukshons on hau to provide one witdrawal address. If yu go laik to dey in kontrol of yor validator setup, <a href="/staking/solo/">make yu learn more abou hau yu fit stake yor ETH</a>.
</ExpandableCard>

## Further reading {#further-reading}

- [Di Ethereum Staking Directory](https://www.staking.directory/) - _Eridian and Spacesider_
- [Evaluating Staking Savis](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
