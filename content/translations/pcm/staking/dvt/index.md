---
title: Distributed validator teknologi
description: Distributed validator teknologi enabol di distributed operashon of one Ethereum validator by multipol partis.
lang: pcm
---

# Distributed validator teknologi {#distributed-validator-technology}

Distributed validator teknologi (DVT) na one way to validator sekurity wey dey spread out key managment and ey sign responsibilitis akross multipol partis, to ridus singol points of failure, and dey inkrease validator resiliensy.

Im dey run dis by **splitting di private key** wey dem yus to sikure one validator **akross plenti komputas** wey dem organize into one "klusta". Di benefit of dis bi sey im dey make am difikut wella for attakas to get di key, bikos dem nor store am in full on any singol mashine. Im also dey allow for some nodes to go offline, as dem fit do necessary signin by one subset of di mashines in ish klusta. Dis dey ridus singol points of failure from di netwok and dey make di whole validator set more big wella.

![One pikshure wey dey show hau singol validator key split into key shias and don distribute to plenti nodes wit difren komponents.](./dvt-cluster.png)

## Why do wi nid DVT? {#why-do-we-need-dvt}

### Security {#security}

Validators dey denerate two publik-private key pairs: validator keys to dey yus partisipate in konsensus and witdrawal keys to dey yus funds. As validators fit sikure witdrawal keys for cold storaj, validator private keys suppose dey online 24/7. If yu kompromise one validator private key, one attaka fit kontrol di validator, wey fit dey lead to slashing abi di loss of di ETH staka. DVT fit helep yu ridus dis risk. Hia na hau:

As wi dey yus DVT, stakas fit partisipate to dey stake while to dey kip di validator private key in kold storaj. Dem ashieve dis by kodin di orijina, full validator key and den to dey split am into key shias. Di key dey shia live online and dey on plenti nodes wey enabol di distributed operashon of di validator. Dis dey posibol bikos Ethereum validators dey yus BLS signashure wey dey additive, wey mean sey dem fit konstrut di full key again by summing dia komponent parts. Dis dey allow di stakers to kip di full, orijina 'masta' validator key sikurely offline.

### No singol point of failure {#no-single-point-of-failure}

Wen dem don divide validator akross plenti operators and plenti mashines, im fit witstand individual hardwia and softwia failures witout going offline. Dem fit also ridus di risk of failures as yu dey yus divarse hardwia and softwia konfigurashons akross di nodes in one klusta. Dis resiliens nor dey afailabol to singol-node validator konfigurashons - im dey kome from di DVT layer.

If one of di komponents of one mashine for one klusta go down (for eksampol, if four operators dey in one validator klusta and one dey yus spesifik klient wey get one bug), di odas ensure sey di validator go kontinu to dey run.

### Comot from only one place {#decentralization}

Di ideal scenario for Ethereum na to get as many operated validators wey dey indipendent as posibol. Haueva, a few staking providas don bikom very popular and akant for one big porshon of di total ETH on di netwok wey yu stake. DVT fit allow dis operators to exist while dey prisarve disentralizashon of stake. Dis na bikos di keys for ish validator dey distributed akross many mashines and im go take plenti big kollushon for one validator to turn malishious.

Witout DVT, im dey izy for staking providas to suppot only one abi two klient konfigurashons for all dia validators, as e dey inkrease di impact of one klient bug. Yu fit yus DVT to spread di risk akross plenti klient konfigurashons and difrent hardwia, wey dey kreate resiliens thru diversity.

**DVT dey offer di followin benefits to Ethereum:**

1. **Disentralizashon** of Ethereum's proof-of-stake konsensus
2. Make sure sey di **liveness** of di netwok
3. Dey kreate validator **fault tolerans**
4. **Trust minimized** validator operashon
5. **Minimized slashing** and downtime risks
6. **Dey impruf diversity** (client, data center, lokashon, regulashon, etc.)
7. **Enhanced sekurity** of validator key management

## Hau DVT dey work? {#how-does-dvt-work}

One DVT solushon kontain di following komponents:

- **[Shamir's sikrit sharing](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Validators yus [BLS keys](https://en.wikipedia.org/wiki/BLS_digital_signature). Individual BLS "key shia" ("key shia") fit dey kombine into one singol aggregated key (signature). In DVT, di private key for one validator na di kombine BLS signashure of ish operator in di klusta.
- **[Threshold signashure scheme](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Dey ditamine di numba of individual key shias wey wi nid to dey sign dutis, e.g., 3 out of 4.
- **[Distributed key generashon (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Cryptographic process wey dey generates di key shias and dey yus am distribute di shias of one validator key wey dey exist abi new to di nodes in one klusta.
- **[Multiparty computashon (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - Dem dey generate di full validator key in sikrit as dem dey yus multiparty computashon. Dem nor sabi full key to bi any individual operator—dem only eva sabi dem own part of am (dem "shia").
- **Konsensus protokol** - Di konsensus protokol dey select one node wey go bi di block proposer. Dem shai di book wit oda nodes in di klusta, wey add dem key shias to di aggregate signashure. Wen dem don gada enuf key shias, dem propose di block on Ethereum.

Distributed validators don built-in fault tolerans and fit kontinu to dey run even if some of di individual nodes go offline. E means sey di klusta dey risilient even if some of di nodes within am turn out to bi malishios abi lazy.

## DVT dey yus kase {#dvt-use-cases}

DVT get strong implikashons for di big staking industry:

### Solo stakers {#solo-stakers}

DVT also enabols non-kustodial staking as dem allow yu distribute yor validator key akross remote nodes as dem dey kip di full key offline kpatakpata. Dis means home stakers nor necessarily nid to outlay for hardwia, as to dey distribute di key shias fit helep dem stand against hacks wey fit hapun.

### To dey stake as service (SaaS) {#saas}

Operators (such as to dey stake pools and institushonal stakers) wey dey manaj many validators fit yus DVT to ridus dia risk. By distributin dia infrastrukshure, dem fit add resundansy to dia operashons and diversify di types of hardwia dem yus.

DVT sey shai responsibility for key manajment akross multipol nodes, wey mean dem fit shia some operashonal kost. DVT fit also ridus operashonal risk and insurans kost to dey stake providas.

### Places wey dem dey stake {#staking-pools}

Due to standard validator setups, dem don kompel dem to dey stake pools and liquid staking providas to have varying levels of singol-operator trust sinse dem don soshialize gains and losses thruout di pool. Dem also rely on operators to safeguard signing keys bikos, ontil nau, nor oda opshon dey for dem.

Even doh tdem don make radishonal efforts to spread risk as dem dey distribute stakes akross plenti operators, ish operator still manaj one koko stake on dem own. To dey rely on one singol operator dey pose big risk if dem nor pafom well, enkounta downtaim, get kompromise, abi do malishiosly.

By dipending on DVT, di trust rikwaya from operators don ridus wella. **Pools fit enabol operators to hold stakes wit nor nid of kustody of validator keys** (as dem fit yus only key shias). Im dey also allow yu manaj stakes to distribute bitwin more operators (e.g., insted to get one singol operator wey dey manaj 1000 validators, DVT dey enabol plenti operators to gada run doz validators). Divarse operator konfigurashons go make sure sey if one operator suppose go down, di odas go still fit konfam am. Dis dey kause redundansy and diversifikashon wey lead to betta perfomans and risiliens, as yu dey maximize riwods.

Anoda benefit to dey maximize sigol-operator trust bi sey staking pools fit allow more open and operator participashon wey nor get pamishon. As we dey do dis, savis fit ridus dia risk and suppot Ethereum disentralizashon as dem dey yus sets of operators wey dey kurated and nor get pamishon.

## Potenshial drawbacks to dey yus DVT {#potential-drawbacks-of-using-dvt}

- **Addishonal komponent** - to dey introdus one DVT node adds wey be anoda part wey fit get fault abi dey vulnerabol. One way to mitigate dis na to strive plenti implimentashons of one DVT node, meaning plenti DVT klients (similarly as plenti klients dey for di konsensus and exekushon layers).
- **Operashonal kost** - as DVT dey distribute di validator bitwin plenti partis, plenti nodes wey wi sabi for operashon insted of only one singol node, wey dey introdus inkrease operating kost.
- **Potenshialy inkreased latency** - sinse DVT dey yus one konsensus protokol to ashieve konsensus bitwin plenti nodes wey dey operate one validator, im fit introdus increased latency.

## Further Reading {#further-reading}

- [Ethereum distributed validator speks (high level)](https://github.com/ethereum/distributed-validator-specs)
- [Ethereum distributed validator teknika speks](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Shamir sikrit to dey shia demo app](https://iancoleman.io/shamir/)
