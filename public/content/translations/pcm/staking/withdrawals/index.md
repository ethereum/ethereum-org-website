---
title: To dey stake witdrawals
description: Page wey dey sumaraize wetin staking push witdrawal bi, hau dem dey wok, and wetin stakers nid to do to get dia riwods.
lang: pcm
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Leslie di rhino wit en staking riwods
sidebarDepth: 2
summaryPoints:
  - Di Shangai/Capella upgrade don enabol staking witdrawals on Ethereum
  - Validator operators suppose provide one witdrawal address to enabol
  - Riwods don automatikaly distribute efri few days
  - Validadors wey fully komot staking go risiv dia balans wey rimain.
---

<UpgradeStatus dateKey="page-staking-withdrawals-when">
Dem don enabol staking witdrawals wit di Shanghai/Capella upgrade wey okkur on April 12, 2023.&nbsp;<a href="#when" customEventOptions={{ eventCategory: "Anchor link", eventAction: "When's it shipping?", eventName: "click" }}>More about Shanghai/Capella</a>
</UpgradeStatus>

**Staking Withdrawals** refer to transfas of ETH from one validator akant on Ethereum konsensus layer (di Beacon Chain), to di exekushon layer wia dem fit dey transact wit.

**Dem go send riwod payments of excess balans** ova 32 ETH go automatikaly and regularly to one witdrawal address wey dem link to ish validator, wons dem provide by di user. Users fit also **komot for staking kpatakpata**, as yu dey unlock full validator balans.

## Staking riwods {#staking-rewards}

Riwod payments go dey enta aktive validator akants automatikaly wit max out effektive balans of 32 ETH.

Any balans above 32 ETH wey dem earn thru riwods nor akshualy kontribute to prinsipal, abi inkrease di weight of dis validator on di netwok, and thus dey automatikaly efri few days witdraw as riwod payment. Apart from providing witdrawal address, dis riwods nor nid any akshon from di validator operator. Dem don start all on di konsensus layer, thus im nor nid gas (transakshon fee) at any step.

### Hau wi take rish here? {#how-did-we-get-here}

Ova di past few years Ethereum don go thru plenti netwok upgrades, wey dey turn to netwok wey dey sikure by ETH imsef, insted to dey mine am wit plenti enagi as e dey bifor. To dey partisipate in konsensus for Ethereum nau na wetin wi koll "staking", as partisipants don voluntarily lock dia ETH, and dey put am "at stake" for di ability to partisipate in di netwok. Users wey dey follow di rules go get riwod, as dem fit punish attempt to dey sheat.

Sinse Ethereum don launch staking deposit kontract for November 2020, some brave pipol wey start to dey yus Ethereum don voluntarily lock funds up to aktivate "validators", speshial akants wey get di rite to formaly konfam and propose blocks, as e dey follow netwok rules.

Bifor di Shenghai/Capella upgrade, yu nor fit yus abi access yor ETH wey yu stake. But nau laik dis, yu fit get in to automatikaly risiv yor riwods into akant wey wi shuse, and yu fit also witdraw yor staked ETH weneva yu wont.

### Hau I go pripia? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Impotant notis {#important-notices}

To dey provide witdrawal address na step wi nid for any validator akant bifor im go dey eligibol to witdraw ETH from im balans.

<InfoBanner emoji="⚠️" isWarning>
  <strong> Ish validator akant fit only get one singol witdrawal address, one taim.</strong> Wons dem don shuse one address and don submit to di konsensus layer, wi nor fit undo abi shanj am again. Make yu doubol-sheck ownaship and akurasy of di address wey dem provide bifor yu submit.
</InfoBanner>

Nor threat <strong>dey to dey fund in di meantaim</strong> as yu nor dey provide dis, assuming yor mnemonic/seed fraiz don rimain safe offline, and dem neva spoil in any way. Failure to add witdrawal kredenshials go simply leave di ETH wey dem lock in di validator akant as im don bi ontil dem provide witdrawal address.

## To dey komot staking kpatakpata {#exiting-staking-entirely}

Dem nid to dey provide one witdrawal address bifor _any_ funds fit komot for yor validator akant balans.

Users wey wan komot staking kpatakpata and witdraw dia full balans back suppose also sign and broadkast one "voluntary exit" messaj wit validator keys wey go start di process to komot from staking. Dem don do dis wit yor validator klient and submit to yor konsensus node, and nor nid gas.

Di process of one validator dey komot from staking dey take variabol amounts of taim, as im dipend on hau many pipol wey dey komot at di same taim. Wons e don komplete laik dis, dis akant nor longa dey responsibol to dey pafom validator netwok dutis, nor longa dey eligibol for riwods, and no longa get dem ETH "at stake". At dis taim di akant go dey mark as fully "witdrawabol".

Wons dem don flag akant as "witdrawabol", and dem don witdrawal kredenshials, nortin dey wey a user nid to do aside from wait. Block proposer dey automatikaly and kontinuosly sweep akants for eligibol komot funds, and dem go transfa yor akant balans in full (wey dem also sabi as "full witdrawal") durin di next <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>sweep</a>.

## Wen dem enabol staking witdrawals? {#when}

Staking witdrawals don dey live! Dem don enabol witdrawal funkshonality as part of di Shanghai/Capella upgrade wey okkur on April 12, 2023.

Di Shanghai/Capella upgrade don allow ETH wey dem stake bifor make dem  riklaim am into regular Ethereum akants. Dis don klose di loop on staking liquidity, and don bring Ethereum one step klosa on im joni towods building one sustainabol, kcalabol, sekure disentralized ekosystem.

- [More on Ethereum history](/history/)
- [More on di Ethereum roadmap](/roadmap/)

## Hau witdrawal payments dey work? {#how-do-withdrawals-work}

Weda one validator dey eligibol for one witdrawal abi nor dey ditamin by di state of di validator akant imsef. Dem nor nid user input for any taim to ditamin weda one akant suppose get witdrawal wey dem start abi nor bi hau dem do di entaya process automatikaly by di konsensus layer on one kontinous loop.

### More of a. visual learner? {#visual-learner}

Make yu shek dis explanashon of Ethereum staking withdrawals by Finematiks:

<YouTube id="RwwU3P9n3uo" />

### Validator "wey dey sweep" {#validator-sweeping}

Wen dem schedule one validator to propose di next block, dem nid am to build one witdrawal queue, of up to 16 eligibol witdrawals. Dem dey do dis by orijinaly starting wit validator index 0, wey dey ditamin if dia is one eligibol witdrawal for dis akant par di rules of di protokol, and dey add am to di queue if im dey. Di validator wan propose di folowing block go pick up wia di last one wey rimain, dey progress in order indefinitely.

<InfoBanner emoji="🕛">
Tink abou one analogue clock. Di hand on di clock dey point to di hawa, dey progress on one direkshon, nor dey skip any hawas, and wraps around las las to di start again afta di last numba don rish.<br/><br/>
Nua insted of 1 thru 12, imajin sey di clock get 0 thru N <em>(di komplete numba of validator akounts wey dem don eva regista on di konsensus layer, ova 500,000 as of Jan 2023).</em><br/><br/>
Di hand on di clock points to di next validator wey nid to dey shek for eligibol witdrawals. Im start for 0, and kontinu all di way around witout skipping any akants. Wen di last validator don rish, di cykol kontinu back at di start.
</InfoBanner>

#### To dey shek one akant for witdrawals {#checking-an-account-for-withdrawals}

As one proposa dey sweep thru validators for posibol witdrawals, dem don evaluate ish validator wey dem don shek against one short siris of kweshons to ditamin if one witdrawal suppose bigin, and if so, hau mush ETH yu suppose witdraw.

1. **Shey dem don provide witdrawal address?** If dem neva provide witdrawal address, dem don skip di akant and neva start witdrawal.
2. **Shey dem fit komot di validator and witdraw?** If di validator don fully komot, and wi don rish di epoch wia dem don konsida dia akant "one wey dem fit witdraw", dem go kon process one full witdrawal. Dis go transfa di entaya balans wey rimain to di witdrawal address.
3. **Shey di effective balans don max out at 32?** If di akant get witdrawal kredenshials, im neva komot kpatakpata, and get riwods above 32 wey dey wait, dem go process one pashial witdrawal wey dey transfa only di riwods above 32 to di user witdrawal address.

E get only two akshons wey dem validator operators don take during di validator life cykol wey influens di flow diret:

- Make yu provide witdrawal kredenshials to enabol any form of witdrawal
- Komot from di netwok, wey go trigga one full witdrawal

### Gas free {#gas-free}

Dis way to dey stake witdrawals dey afoid to dey rikwaya stakers to manualy submit one transakshon wey dey ask to witdraw one partikular amount of ETH. E mean sey **dem nor nid gas (transakshon fee)**, and witdrawals also nor dey drag wit exekushon layer block space wey dey komot.

### Hau frikwent I go get my staking riwods? {#how-soon}

Dem fit dey process one maximum of 16 witdrawals for one singol block. For di rate, 115,200 validator witdrawals fit process per day (assuming nor slots dey miss). As dem note am above, dem go skip validators witout eligibol witdraw, as im dey dikrease di taim to finish di sweep.

To dey ekspand dis kalkulashon, we fit estimate di taim im go take to process numba of witdrawal wey dem give:

<TableContainer>

| Numba of witdrawals | Taim to komplete |
| :-------------------: | :--------------: |
|        400,000        |     3.5 days     |
|        500,000        |     4.3 days     |
|        600,000        |     5.2 days     |
|        700,000        |     6.1 days     |
|        800,000        |     7.0 days     |

</TableContainer>

As yu dey see di slow down as more validators dey di netwok. Inkrease in slots wey dey miss fit slow down proposhonaly, but dis go generaly reprisent di slowa side of posibol outkomes.

## Frequently asked questions {#faq}

<ExpandableCard
title="Wons I don provide witdrawal address, I fit shanj am to anoda witdrawal address?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
No, di process to provide witdrawal kredenshials na one-taim process, and nor fit shanj wons dem submit.
</ExpandableCard>

<ExpandableCard
title="Why wi fit only sey witdrawal address wons?"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
To dey set one exekushon layer witdrawal address wey di witdrawal kresenshials for dat validator wey don pamanently shanj. Di means sey di old kredenshials nor go work again, and di new kredenshials dey diret to one exekushonlayer akant.

Witdrawal address fit bi one smart kontract (wey im kode dey kontrol), abi one akant wey dem own outside di akant (EOA, wey im private key dey kontrol). Dis akants nor get ways to dey komunikate messaj back to di konsensus layer wey go give one shanj of validator kredenshials, and dey add dis funkshonality go add komplexity wey nor dey necessary to di protokol.

For anoda way to dey shanj di witdrawal address for one partikular validator, users fit shuse to set one smart kontract as dem witdrawal address wey fit handol key rotating, such as one Safe. Users wey set dem funds to dem own EOA fit komot kpatkpata to witdraw all of dem staked funds, and den re-stake as dem dey yus new kredenshials.
</ExpandableCard>

<ExpandableCard
title="Wat if I patisipate in staking tokens abi pooled staking"
eventCategory="FAQ"
eventAction="What if I participate in staking tokens or pooled staking"
eventName="read more">

If yu dey part of one <a href="/staking/pools/">staking pool</a> abi dey hold staking tokens, go shek wit yor provida for more details on hau dem dey handol staking witdrawals as ish savis dey operate difrent.

In general, users suppose dey free to take dem ETH wey dem stake normal, abi dey shanj wey staking provida dey yus. If one partikular pool dey gettoo big, dem fit komot, ridim, and re-stake funds wit one <a href="https://rated.network/">provida wey smoll pass</a>. Abi, if yu don gada enuf ETH wey yu fit <a href="/staking/solo/">stake from home</a>.

</ExpandableCard>

<ExpandableCard
title="Shey riwod payments (pashial witdrawals) hapun automatikaly?"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">
Yes, as long as yor validator don provide witdrawal address. Dem suppose provide dis wons to first start any witdrawals, den riwod payments go automatikaly trigga efri few days wit ish validator sweep.
</ExpandableCard>

<ExpandableCard
title="Shey full witdrawal dey hapun automatikaly?"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

No, if yor validator still dey aktive on di netwok, full witdrawal nor go hapun automatikaly. Dis nid to manualy start to komot demsefs.

Wons validator don komot di process finish, and to tink sey di akant get witdrawal kredenshials, dem <em>go</em> witdraw di balans wey rimain for di next <a href="#validator-sweeping">validator sweep</a>.

</ExpandableCard>

<ExpandableCard title="I fit witdraw kustom amount?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
Dem don disign witdrawals to automatikaly push, to dey transfa any ETH wey nor dey kontribute to stake aktively. Dis inklude full balans for akants wey don komplete di exit process.

E nor posibol to manualy rikwest spesifik amounts of ETH to witdraw.
</ExpandableCard>

<ExpandableCard
title="I dey operate validator. Wia I fit find more infomashon to enabol witdrawals?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information on enabling withdrawals?"
eventName="read more">

Dem don rekomend Validator operators to visit di <a href="https://launchpad.ethereum.org/withdrawals/">Staking Launchpad Witdrawals</a> page wia yu fit find more ditails on hau to pripia yor validator for witdrawals, timing of events, and more ditails on hau witdrawals dey funkshon.

To first try out yor setup on one testnet, visit di <a href="https://holesky.launchpad.ethereum.org">Holesky Testnet Staking Launchpad</a> to start.

</ExpandableCard>

<ExpandableCard
title="I fit re-activate my validator afta I komot by depositing more ETH?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
No. Wons one validator don komot and don witdraw en full balans, any funds wey dem deposit join to dat validator go dey transfa automatikaly to di witdrawal address during the next validator sweep. To re-stake ETH, dem suppose aktivate new validator.
</ExpandableCard>

## Further reading {#further-reading}

- [To Dey Stake Launchpad Withdrawals](https://launchpad.ethereum.org/withdrawals)
- [EIP-4895: Beacon chain push withdrawals as operashons](https://eips.ethereum.org/EIPS/eip-4895)
- [Ethereum Cat Herders - Shanghai](https://www.ethereumcatherders.com/shanghai_upgrade/index.html)
- [PEEPanEIP #94: Staked ETH Withdrawal (Testing) wit Potuz & Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Beacon chain push witdrawals as operashons wit Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [To dey ondastand Validator Effective Balans](https://www.attestant.io/posts/understanding-validator-effective-balance/)
