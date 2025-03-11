---
title: Solo stake yor ETH
description: One ovaview of hau to start solo staking yor ETH
lang: pcm
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-solo.png
alt: Leslie di rhino on her own komputa chip.
sidebarDepth: 2
summaryPoints:
  - Risiv maximum riwod diret from di protokol to dey kip yor validator to dey funkshon wella and online
  - Run home hardwia and dey add pesinaly to di sekurity and disentralizashon of di Ethereum netwok
  - Make yu rimuv, and neva give up kontrol of di keys to yor funds
---

## Wetin bi solo staking? {#what-is-solo-staking}

Solo staking na di way to [run one Ethereum node](/run-a-node/) wey don konet to di intanet and dey deposit 32 ETH to aktivate one [validator](#faq), as dem give yu di ability to partisipate diret in netwok konsesus.

**Solo staking dey inkrease di disentralizashon of di Ethereum netwok**, wey dey make Ethereum more sensorship-resistant and robust against attaks. Oda staking metods fit nor helep di netwok in di same ways. Solo staking na di staking opshon wey betta pass to sekure Ethereum.

One Ethereum node konsist of both exekushon layer (EL) klient, as well as one konsensus layer (CL) klient. Dis klients na softwia wey dey work togeda, along wit one valid set of signing keys, to verify transakshons and blocks, attest to di koret head of di chain, gada attestashons, and propose blocks.

Solo stakers dey resposibol to dey operate di hardwia wey yu nid to run dis klients. Wi rekomend wella to yus one mashine wey yu dedikate for dis wey yu operate from home-dis get benefit to di health of di netwok.

One solo staker dey risiv riwods diret from di protokol to dey kip dia validator wey dey funkshon wella and online.

## Why yu nid stake solo? {#why-stake-solo}

Solo staking dey kome wit more responsibility but dey provide yu wit maximum kontrol ova yor funds and staking setup.

<CardGrid>
  <Card title="Make yu dey earn fresh ETH" emoji="💸" description="Earn ETH-denominated rewards directly from the protocol when your validator is online, without any middlemen taking a cut." />
  <Card title="Full kontrol" emoji="🎛️" description="Keep your own keys. Choose the combination of clients and hardware that allows you to minimize your risk and best contribute to the health and security of the network. Third-party staking services make these decisions for you, and they don't always make the safest choices." />
  <Card title="Netwok sekurity" emoji="🔐" description="Solo staking is the most impactful way to stake. By running a validator on your own hardware at home, you strengthen the robustness, decentralization, and security of the Ethereum protocol." />
</CardGrid>

## Konsiderashons bifor staking solo {#considerations-before-staking-solo}

As musch as wi wish make solo staking dey accessibol and risk free to efrione, dis nor bi reality. Some pratika and sirios konsidrashon dey to kip in mind bifor to dey shuse to solo stake yor ETH.

<InfoGrid>
<ExpandableCard title="Don rikwaya to dey read" eventCategory="SoloStaking" eventName="clicked required reading">
Wen yu dey run yor own node yu suppose spend some taim to dey learn hau to yus di softwia yu don shuse. Dis involve to dey read relevant dokumentashon and to start to dey komunikate channels of doz dev teams.

Di more yu ondastan abou di softwia yu dey run and hau pruf-of-stake works, di less risky im go bi as staker, and di izy en go bi to fix any issues wey fit arise along di way as one node operator.
</ExpandableCard>

<ExpandableCard title="Komfortabol wit komputas" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
Node setup nid one reasonabol komfot level wen yu dey work wit komputas, aldoh new tools dey make dis izy ova taim. To dey ondastand di komand-line intaface dey helepful, but wi nor too nis am.

Im also nid very basik hardwia setup, and some kain tins wey yu nid sabi for smoll smoll speks wey e rekomend.
</ExpandableCard>

<ExpandableCard title="Sikure key manajment" eventCategory="SoloStaking" eventName="clicked secure key management">
Just laik hau private keys dey sekure yor Ethereum address, yu go nid generate keys only for yor validator. Yu suppose sabi hau to kip any seed fraiz abi private keys safe and sekure.{' '}

<a href="/security/">Ethereum sekurity and skam privenshon</a>
</ExpandableCard>

<ExpandableCard title="Maintenance" eventCategory="SoloStaking" eventName="clicked maintenance">
Hardwia dey fail somtaims, netwok koneshons dey error out, and klient softwia somtaims nid upgrading. Node maintenance na wetin dem nor fit avoid and go somtaims nid yor atenshon. Yu go want dey sure to dey awia of any netwok upgrades wey wi want, abi oda kritika klient upgrades.
</ExpandableCard>

<ExpandableCard title="Uptaim wey yu fit trust" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Yor riwods align to di taim yor validashon dey online and hau e dey attest am wella. Downtime dey bring penaltis wey dey proporshonal wit hau many oda validators wey dey offline for di same taim, but <a href="#faq">e nor dey make dem slash am</a>. Bandwidth also dey matta, as riwod dey ridus for attestashon wey dem nor risiv on taim. Rikwayament go vary, but dem rekomemd minimum of 10 Mb/s up and down.
</ExpandableCard>

<ExpandableCard title="Slashing risk" eventCategory="SoloStaking" eventName="clicked slashing risk">
Difren from inactivity penaltis to dey offline, <em>slashing</em> na plenti sirious penalti wey dem risarve for malishios offense. As wi dey run one smoll klient wit yor keys wey dem load on only one mashine at taim, yor risk to slash am dey smoll. As wi don tok dat one, all stakers suppose sabi di risks of slashing.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> More on slashing and validator lifecycle</a>
</ExpandableCard>
</InfoGrid>

<StakingComparison page="solo" />

## Hau im dey work {#how-it-works}

<StakingHowSoloWorks />

As yu dey active yu go earn ETH riwods, wey go dey drop into yor witdrawal address.

If yu want, yu fit komot as validator wey dey komot wetin yu nid to dey online, and dey stop any oda riwod. Dem go kon witdraw yor balans wey rimainto di widrawal address wey yu shuse during setup.

[More on staking witdrawals](/staking/withdrawals/)

## Make yu start on di Staking Launchpad {#get-started-on-the-staking-launchpad}

Di Staking Launchpad na one open sorse aplikashon wey go helep yu bikom one staker. Im go guide yu as yu dey shuse yor klients, generate yor keys and dey deposite yor ETH to di staking deposit kontract. Wi don provide one sheklist to make sure sey yu don kova efritin to get yor validator wey yu setup safely.

<StakingLaunchpadWidget />

## Wetin to konsida wit node and klient setup tools {#node-tool-considerations}

Dis na numba of tools and savis wey dey grow to helep yu solo stake yor ETH, but ish dey kome wit difren risks and benefits.

Dem dey yus attribute indikators bilow to signal notabol strenght abi wikness wey dey in di listed staking tool wey yu get. Yus dis sekshon as one refrens for hau wi difine dis atribute as yu dey shuse wat tools to helep wit yor staking joni.

<StakingConsiderations page="solo" />

## Make yu eksplore node and klient setup tools {#node-and-client-tools}

Plenti of opshons dey afailabol to helep yu wit yor setup. Make yu yus di above indikators to helep guide yu thru di tools bilow.

<ProductDisclaimer />

### Node tools

<StakingProductsCardGrid category="nodeTools" />

Abeg note di impotans to dey shuse one [smoll klient](/developers/docs/nodes-and-clients/client-diversity/) as e dey impruf di sekurity of im netwok, and dey ridus yor risk. Dem make di tools wey dey allow yu setup minority klient as <em style={{ textTransform: "uppercase" }}>"multi-klient."</em>

### Key Generators

Dem fit yus dis tools as one altanative to di [Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli/) to helep wit key generashon.

<StakingProductsCardGrid category="keyGen" />

Shey yu get sugeshon for one staking toll wey wi miss? Yu fit shek out awa [product listing policy](/contributing/adding-staking-products/) to si if im go fit yu to submit am for review.

## Make yu eksplore solo staking guides {#staking-guides}

<StakingGuides />

## Frequently asked questions {#faq}

Dis na few of di plenti komon kweshons abou staking wey dem suppose sabi.

<ExpandableCard title="Wetin bi pesin wey dey validate?">

<em>validator</em> na virtual pesin wey dey live on Ethereum and dey partisipate in di konsensus of di Ethereum protokol. Na balans, publik key and oda propatis dey reprisent Validators. <em>validator</em> na im bi di softwia wey dey hapun on behalf of di validator by holding and dey yus im private key. One singol validator klient fit hold many key pairs, dey kontrol plenti validators.

</ExpandableCard>

<ExpandableCard title="Shey I fit deposit pass 32 ETH?">
Ish key-pair wey join wit one validator nid 32 ETH gangan to take aktivate am. More ETH dem deposit to one singol set of keys nor dey inkrease riwods potenshial, as ish validator dey limit to one <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">effektive balans</a> of 32 ETH. Dis mean sey dem dey do staking in 32 ETH inkrements, ish one get im own set of keys and im balans.

Make yu nor deposit pass 32 ETH for one singol validator. Im nor go inkrease yor riwods. If dem don set withdrawal address for di validator, money wey pass ova 32 ETH go komot go dis address automatikaly for di next <a href="/staking/withdrawals/#validator-sweeping">validator sweep</a>.

If solo staking wahala kon plenti for yu, make yu konsida to dey yus <a href="/staking/saas/">staking-as-a-savis</a> provida, abi if yu dey work wit wetin smoll pass 32 ETH, make yu sheck out di <a href="/staking/pools/">staking pools</a>.
</ExpandableCard>

<ExpandableCard title="Shey dem go slash mi if I go offline? (tldr: No.)">
If yu komot go offline wen di netwok dey try finalize imsef wella e NOR go make dem do slashing. Smoll <em>punishment for pipol wey nor dey aktive</em> dey boku if yor validator nor dey afailabol to confam di epoch wey dem give (ish 6.4 minutes long), but dis one difren from <em>slashing</em>. The punishment come small pass the reward wey you for get if to say the validator dey around to attest, and you fit get losses back wey equal to the amount of time wey you take come back online.

Make yu sabi sey di punishment on to sey yu nor dey aktive dey korrespond wit hau many validators offline for di same taim. For matta wey one big part of network kon dey offline for di same taim, di punishment for ish of dis validators go plenti pass wen one singol validator nor dey afailabol.

For big matta if di network stop to dey finalize again bikos say some of di validators dey offline, di pipol wey dey yus am go suffer wetin dem sabi as <em>quadratic inactivity leak</em>, wey bi big drain of ETH from offline validator akant. Dis dey make di network to later heal on im own as di ETH of validators wey no dey aktive dey burn till wen dem balans go rish 16 ETH, for di point wey dem go automatikaly komot am from di validator pool. Di validators wey dey online wey rimain go spoil 2/3 of di netwok las-las, as dem dey satisfy di supamajority wey dem nid to wons again finalize di chain.
</ExpandableCard>

<ExpandableCard title="Hau I go make sure sey dem nor slash mi?">
Smoll taim, dem fit nor guarantee di fully, but if yor faith strong and yu run di minority klient and dey kip keys wey yu yus sign for di mashine dat taim, di risk to dey slash nor dey at all.

E get some kain ways wey fit make validator dey slashed and komot from di netwok. At di taim wi dey write dis, di slashings wey don okkur na di product of hardwia setup wey dey redundant as dem store di signing keys for two seprate mashines at wons. Dis fit rizut in <em>doubol vote</em> from yor keys, wey bi slashabol offense.

As yu dey run supermajority klient (any klient wey ova 2/3 of di netwok dey yus) go also hold risk of wetin fit cause slashing if dis klient get bug wey go turn to chain fork. Dis fit rizut in one faulty fork wey dem go finalize. To koret back to di chain wey dey first wan put e go nid make yu submit <em>surround vote</em> as yu dey try undo di block wey dem don finalize. Dis na also fuckup wey fit kause slashing and yu fit afoid am as yu dey run minority client insted.

Bugs dey bi di same inside <em>minority klient nor dey eva finalize</em> and e nor go eva surround vote, and go just turn to inaktivity penatis, <em>nor bi slashing</em>.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">Make yu learn more abou di impotance of running minority klient.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Learn more about slashing privenshon.</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Wich klient betta pass?">
Klient pipol dey difren smoll from ish oda for paformana and user intafase, as difren teams don don divelop ish one and dem dey yus difren programming languajis. As wi don tok am, nor one of dem "betta pass." All di producshon klient dem na ogbonge softwia, wey dey pafom di same kore funkshon to sync and interat wit di blockchain.

Sinse all di produshon klients dey provide di same basik funkshonality, im dey very impotant dat yu shuse one <strong>minority klient</strong>, wey mean sey any klient wey majority of validators on di netwok nor dey yus. Dis fit sound laik wetin wey nor make sense, but to dey run one majority abi supamajority klient dey put yu for inkrease risk of slashing if bug dey for dat klient. To dey run one minority klient dey riduse dis risks wella.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Make yu learn more abou why klient diversity matta wella</a>
</ExpandableCard>

<ExpandableCard title="Shey I fit yus one VPS (virtual private server)?">
Aldoh dem fit yus virtual private server (VPS) take riplase dem home hardwia, di fisika access and lokashon of yor validator klient<em>matta</em>. Kloud solushons such as Amazon Web Savis abi Dijita Ocen dey allow di konveniens of not having to obtain and operate hardwia, insted make dem sentralize am on di netwok.

DI more validator klients dey run on one singol sentralized kloud storaj solushon, di more danja im go bikom for dis users. Any event wey dey take dis providas offline, weda by one attak, regulatory demands, abi just pawa.intanet outages, go risult in every validator klient wey dey rely on dis server to go offline at di same taim.

Punishment for pipol wey nor dey online na di same for all di pipol wey nor dey online at di same taim. To dey yus VPS dey inkrease di risk dat offline punishment go big wella, and go inkrease yor risk of quadratik leaking abi slashing if di outage don too big already. To fit ridus di, and di risk to di netwok, wi dey enkoraj users to get and run dia own hardwia.
</ExpandableCard>

<ExpandableCard title="Hau I fit unlock my riwods abi get my ETH back?">

Witdrawals of any kain from di Beacon Chain rikwaya make yu set witdrawal kredenshials.

New stakers set dis at di taim of key generashon and deposit. Stakers wey dey bifor wey neva set dis fit upgrade dia keys to support dis funkshonality.

Wons witdrawal kredenshials don set, dem go distribute di riwod payments (wey dem don akumulate ETH ova di first 32) to di witdrawal address automatikaly.

To unlock and risiv all yor balans back yu suppose also komplete di process to komot yor validator.

<ButtonLink href="/staking/withdrawals/">More on staking witdrawals</ButtonLink>
</ExpandableCard>

## Further reading {#further-reading}

- [Di Ethereum Staking Directory](https://www.staking.directory/) - _Eridian and Spacesider_
- [Ethereum's Klient Diversity Palava](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [To Dey Helep Klient Diversity](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Klient diversity for Ethereum konsensus layer](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [Hau To: Dey Shop For Ethereum Validator Hardware](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [Step by Step: Hau to join di EThereum 2.0 Testnet](https://kb.beaconcha.in/guides/tutorial-eth2-multiclient) - _Butta_
- [Tips Wey Dey Privent Eth2 Slashing](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />
