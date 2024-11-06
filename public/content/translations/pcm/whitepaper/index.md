---
title: Ethereum whitepaper
description: One introduktory paper to Ethereum, wey dem publish in 2013 bifor im launch.
lang: pcm
sidebarDepth: 2
hideEditButton: true
---

# Ethereum whitepaper {#ethereum-whitepaper}

_Dem don orijinaly publish dis introduktory paper in 2014 by Vitalik Buterin, di founda of [Ethereum](/what-is-ethereum/), bifor di project launch for 2015. Im worth to note dat Ethereum, laik plenti komunity-driven, open-sorse softwia project, don grow pass sinse im first start._

_As im don old for plenti years, wi maintain dis paper bikos im dey kontinu to serve as one yusful referens and one akurate reprisentashon of Ethereum and im vishon. To learn about di latest divelopment of Ethereum, and hau dem don make shanjis to di protokol, wi rekomend [dis guide](/learn/)._

[Pipol wey dey research and wey sabi book wey dey look for historikal vashon of di whitepaper [from December 2014] supose yus dis PDF.](./whitepaper-pdf/Ethereum_Whitepaper_-_Buterin_2014.pdf)

## One Next-Generashon Smart Kontract and Disentralized Aplikashon Platfom {#a-next-generation-smart-contract-and-decentralized-application-platform}

Satoshi Nakamoto divelopment Bitcoin for 2009 na im dem don hail often as radikal divelopment in moni and kurrensy mata, as im bi di first eksampol of dijital asset wey nor get backin abi "[ strong value](http://bitcoinmagazine.com/8640/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it/)" and im nor anyone wey dey give abi kontrol am. But anoda part of dis Bitcoin eksperiment wey fit even dey more important pass, na di blockchain teknology wey dem dey yus as tool for konsensus dem shia, and pipol don start to dey shift to dis oda aspet of Bitcoin. Aplikashons of blockchain teknology wey pipol dey cite wella na to dey yus dijital assets wey dey on-blockchain to reprisent kustom kurrensis and finanshial instruments ("[kolored koins](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)"), di ownaship od one fisikal devise ("[smart property](https://en.bitcoin.it/wiki/Smart_Property)"), non-funjibol assets laik domain names ("[Namecoin](http://namecoin.org)"), and plenti komplex aplikashons wey involve dijital assets makin piece of kode implementing arbitrary rules to dey kontrol dijital assets ("[smart kontracts](http://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/idea.html)") abi even blockchain-based "[disentralized autonomous organizashons](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)" (DAOs). Wetin Ethereum wan provide na blockchain wey get strong-strong programming languaj inside wey dem fit yus make "kontracts" wey dem fit yusto enkode any kain state transishon funshons, wey dey allow users kreate any of di systems wey we don tok about, and many oda ones wey wi neva even imajin, just by writing kode wey nor plenti at all.

## Introdukshon to Bitcoin and Konsept Wey Dey Exist {#introduction-to-bitcoin-and-existing-concepts}

### History {#history}

Di konsept of disentralized dijital kurency, and oda aplikashons laik property registris, don dey around for plenti-plenti years. For 1980s and 1990s dem bin get anonymous e-cash protokols wey dey yus one cryptographic primitive wey dem dey koll Chaumian blinding, provide kurensy wey get strong privacy, but di protokols nor really hold ground bikos dem still dey dipend on sentralized midolman. For 1998, Wei Dai [b-money](http://www.weidai.com/bmoney.txt) bikom di first proposal to introdus di idias to dey kreate money by solving komputashonal puzzles and disentralized konsensus, but di proposal nor really eksplain hau dem go take impliment di disentralized konsensus. For 2005, Hal Finney introdus di konsept of "[ proofs of work wey yu fit yus again](https://nakamotoinstitute.org/finney/rpow/)", one system wey dey yus idias from b-money togeda wit Adam Back komputashonally difikut Hashcash puzzles to make di idia for cryptocurrency, but wons again im nor reach bikos im still dey dipend on trusted komputing as backend. For 2009, dem impliment disentralized kurensy for di first taim in praktis by Satoshi Nakamoto, as e kombine primitives wey don establish to dey manaj ownaship thru publik key cryptography wit konsensus algorithm to dey kip track of who get koins, wey dem dey koll "proof-of-work".

Di metod behind proof-of-work na breakthru for di space bikos im dey solve two palava at di same taim. First, im dey provide simpol and normal effective konsensus algorithm, wey dey allow nodes for di netwok to join togeda agree on set of end updates to di state of di Bitcoin ledger. Nomba two, im don provide one metod to dey allow free entry into di konsensus process, as im dey solve di politikal palava of desiding who go fit influens di konsensus, and dem dem privent sybil attaks. Im dey do dis by replacing one formal barrier to partisipashon, laik di rikwayament to regista as one unik entity on one patikular list, wit one ekonomik barrier - di weight of singol node in di konsensus voting process dey directly proporshonal to di komputing pawa wey di node dey bring. Sinse dat taim, dem don propose one altanative way wey dem dey koll _proof-of-stake_, dey kalkulate di weight of node as e dey proportional to im kurensy holdings and nor bi komputashonal risorsis; to diskuss which one beta pass nor bi wetin we wan tok for dis paper but make yu sabi sey dem fit yus both metods as di backbone of cryptocurrency.

### Bitcoin As A State Transishon System {#bitcoin-as-a-state-transition-system}

![State transishon for Ethereum](./ethereum-state-transition.png)

If wi wan look am from teknical angol, di ledger of cryptocurrency laik Bitcoin na laik state transishon system, wia "state" na di ownaship status of all bitcoins wey dey exist and "state transishon funshon" na wetin dey take state and transakshon kon give new state wey be di rizut. For normal banking system nau, di state na balans sheet, a transakshon na rikwest to move $X from A to B, and di state transishon funshon go ridus di value for di akant of A by$X and inkrease di value for B's akant by $X. If A akant nor get up to $X from di biginning, di state transishon funshon go riturn error. Hence, one fit formaly difine:

```
APPLY(S,TX) -> S' or ERROR
```

For di banking system wey wi don difine:

```js
APPLY({ Alice: $50, Bob: $50 },"send $20 from Alice to Bob") = { Alice: $30, Bob: $70 }
```

But:

```js
APPLY({ Alice: $50, Bob: $50 },"send $70 from Alice to Bob") = ERROR
```

Di "state" for Bitcoin na koleshon of all koins (teknikaly dem bi, "unspent transakshon outputs" abi UTXO) wey dem don mint and neva spend, wit ish UTXO dey get denominashon and owna (wey dem difine by 20-byte address wey bi laik cryptographic publik key<sup>[fn1](#notes)</sup>). Transakshon dey get one abi more inputs, wit ish input wey konain referens to UTXO and cryptographic signature wey dey exist wey di private key associated wit di owna address produs, and one abi more outputs, wit ish output wey kontain new UTXO to add to di state.

Dem fit difine di state transishon funshon `APPLY(S,TX) -> S'` as folows:

<ol>
  <li>
    For ish input wey dey <code>TX</code>:
    <ul>
    <li>
        If di referenced UTXO nor dey in<code>S</code>, make yu riturn error.
    </li>
    <li>
        If di signature wey dem provide nor match di owna of di UTXO, make yu riturn error.
    </li>
    </ul>
  </li>
  <li>
    If di sum of di denominashons of all input UTXO dey less pass di sum of di denominashons of all output UTXO, make yu riturn error.
  </li>
  <li>
    Riturn <code>S</code> wit all input wey UTXO don rimuv and all output UTXO wey don add.
  </li>
</ol>

Di first half of di first step dey privent pipol wey dey send transakshon from spendin koins wey nor exist, di sekond half of di first step dey privent pipol wey dey send transakshon from spendin oda pipol koins, and di sekond step dey also make sure dem konserve value. If yu wan yus dis payment, di protokol dey go laik dis. Supose sey Alice wan send 11.7BTC give Bob. First, Alice go look for set of afailabol UTXO wey en own wey total up to at least 11.7 BTC. For real life, Alice nor go fit get 11.7 BTC gan-gan; make wi sey di smollest wey e fit get na 6+4+2=12. En kon kreate one transakshon wit doz three inputs and two outputs. Di first output go be 11.7 BTC wit Bob address as im owna, and di sekond output go bi di remaining 0.3 BTC "shanj", and Alice go bi di owna.

### Mining {#mining}

![Ethereum blocks](./ethereum-blocks.png)

If wi get access to one trustworthy sentralized savis, dis system go dey izy to run dis system; im fit simply dey koded exactly as dem diskribe am, as dem dey yus sentralized server hard drive to kip track of di state. But, wit Bitcoin wei dey try build disentralized kurensy system, so wi go nid kombine di state transakshon system wit di agreement system to make sure sey efribody agree on di order of transakshons. Bitcoin disentralized agreement process nid make nodes for di netwok dey always try make packajis of transakshons wey dem dey koll "blocks". Di netwok supose produs laik one block efri ten minutes, wit efri block make im dey get taimstamp, nonce, refrens to (i.e. hash of) di previous block and list of all di transakshons wey don hapun sinse di previous block. Ova taim, dis one go kreate pasistent, eva-growing, "blockchain" wey dey konstantly update to reprisent di latest state of di Bitcoin ledger.

Di algorithm to dey sheck if one block dey valid, don ekpress in dis paradigm, na laik dis:

1. Sheck if di previous block dem refrens by di block exist and dey valid.
2. Sheck dat di taimstamp of di block dey great pass dat of di block wey don pass <sup>[fn2](#notes)</sup> and im nor reach 2 hawas into di fushure
3. Make yu sheck sey di proof-of-work for di block dey valid.
4. Let `S[0]` bi di state at di end of di previous block.
5. Supose `TX` na di block's transakshon list wit `n` transakshons. For all `i` in `0...n-1`, set `S[i+1] = APPLY(S[i],TX[i])` If any aplikashon bring error kome, e go exit and riturn false.
6. Riturn true, and regista `S[n]` as di state at di end of dis block.

Basikaly, ish transakshon in di block supose provide one valid state transishon from wetin bi kanonikal state bifor dem exekute di transakshon to some new state. Note dat dem nor enkode di state in di block for any way; na just abstrakshon make dem rimemba by validating node and fit only (sekurely) kompute for any block by starting from di start and den dey apply efri transakshon step by step for efri block. Adishonaly, make yu note sey di order in wich di miner inklude transakshons into di block matta; if two transakshons A and B for one block such dat B dey spend UTXO kreate by A, den di block go valid if A kome bifor B but not odawise.

Di one validity kondishon present in di above list wey nor dey inside oda systems in di rikwayament for "proof-of-work". Di exact kondishon na di doubol-SHA256 hash of efri block, wey dem treat as 256-bit numba, gats dey less dan di target wey dem yus style adjust, wey approximately 2<sup>187</sup> as of di taim dem write dis. Di purpose of dis one na to make block kreatshon "hard", so dat e go privent bad-bad pipol from remaking di entaya blockchain for dia favor. Bikos dem disign SHA256 make hin bi a completely unpredictabol pseudorandom funshon, di only way pesin fit make valid block na just trial and error, to dey inkrease di nonce and si if di new hash match.

Wit di target wey dem don set for nau of ~2<sup>187</sup>, di netwok gats make an averaj of ~2<sup>69</sup> tries bifor im fit find valid block. Di netwok dey shanj di target efri 2016 blocks so dat on averaj some node for di netwok go produs new block efri ten minutes. In oda to kompensate miners for dis komputashonal work, di miner of efri block get rite to inklude transakshonon wey dey give demsefs 25 BTC from nowia. If any transakshon get higher total denominashon for im inputs pass im outputs, di difrens go also go to di miner as "transakshon fee". By di way, dis na also di only metod wey dem take dey issue BTC; di start nor kontain any koins at all.

To beta ondastand di purpose of mining, make wi examine wetin go hapun if di attacker wey wan do bad dey. Sinse dem sabi say Bitcoin underlying cryptography dey sekure, di attacka go target di one part of di Bitcoin system wey cryptography nor dey protect directly: na di order of transakshons. Di attacka strategy dey very simpol:

1. Send 100 BTC to merchant in ekshanj for some product (preferably rapid-delivery dijital good)
2. Wait for di delivery of di product
3. Produs anoda transakshon as e dey send di same 100 BTC to ensef
4. Try to konvins di netwok wey en transakshon to ensef bi di one wey first kome.

Wons step (1) don hapun, afta few minutes some miner go inklude di transakshon for block, make wi sey block numba 270000. Afta about one hawa, dem for don add five more blocks to di chain afta dat block, wit ish of doz block wey nor dey point to di transakshon diret and thus "dey konfa" am. At dis point, di merchant go asept di payment as final and deliver di product; sinse wi dey assume say na dijital good, delivery go bi instant. Nau, di attacka go kreate anoda transakshon wey dey send di 100 BTC to ensef. If di attacka just riliz am to di wild, dem nor go process di transakshon; miners go try run `APPLY(S,TX)` and notis sey `TX` dey yus UTXO wey nor dey in di state again. So insted, di attacka go kreate one "fork" of di blockchain, wey en dey start by mining anoda vashon of block 270000 as im dey point to di same block 269999 as parent but wit di new transakshon in place of di old one. Bikos di block data dey difrent, dis rikwaya to do di proof-of-work again. In adishon, di attacka new vashon of block 270000 get difren hash, so di orijinal blocks 270001 to 270005 nor dey "point" to am; so, di orijinal chain and di attacka new chain go dey kompletely separate. Di rule bi sey in one fork di longest blockchain na im dem dey take as di truth, and so legitimate miners go work on di 270005 chain while di attacka alone dey work on di 270000 chain. For di attacka to make im blockchain di one wey long pass, e go nid to have more komputashonal pawa pass di rest of di netwok komnine in order to katch up (hence, "51% attack").

### Merkle Trees {#merkle-trees}

![SPV inside Bitcoin](./spv-bitcoin.png)

_Left: im dey enuf to prisent only one smoll numba of nodes in one Merkle tree to give one pruf of di validity of one branch._

_Right: Any attempt to shanj any part of di Merkle tree go lead to inkonsistency somewia up di chain las-las._

One impotant skalability feature for Bitcoin bi sey dem store di block for multi-level data structure. Di "hash" of one block no be just di hash of di block heada, but na roughly 200-byte piece of data wey get di taimstamp, nonce, previous block hash and di root hash of one data structure wey dem dey koll Merkle tree wey dey store all transakshons for di block. Merkle tree na one kain binary tree, wey get set of nodes wit plenti leaf nodes for di bottom of di tree wey get di basik data, set of intamediate nodes wia ish node na di hash of im two pikin dem, and finally one singol root node, wey dem also form from di hash of im two pikin dem, wey dey reprisent di "top" of di tree. Di purpose of di Merkle tree na to allow make dem fit deliva di data for block smoll-smoll: di node fit download only di heada of one block from one source, di smoll part of di tree wey konsan am from anoda sorse, and still dey sure sey all di data dey koret. Di rizin why dis dey work na say hashes dey muv up: if bad bad pipol try swap fake transakshon for di bottom of Merkle tree, dis shanj go kause shanj for di node above am, den e go kause shanj for di node above dat one, finally e go shanj di root of di tree and diafor di hash of di block, wey go make di protokol regista am as kompletely diferen block (wey go get invalid proof-of-work).

Di Merkle tree protokol dey very impotant for di tin to last long. "Full node" for di Bitcoin network, na dat one dey store and process efritin for efri block, dey take about 15 GB of disk space for di Bitcoin netwok as of April 2014, and im dey grow by ova one gigabyte per month. For nau, dis one dey viabol for some desktop komputas but nor bi for fones, and later for fushure only biznes and hobbyists go fit partisipate. One protokol wey dem dey koll "simplified payment verifikashon" (SPV) dey allow anoda klass of nodes to exist, wey dem dey koll "lite nodes", wey dey download di block headas, verify di proof-of-work on di block headas, and den download only di "branches" wey assoshiate wit transakshons wey konsan dem. Dis allow lite nodes to ditamin wit one strong ashurans of sekurity wetin di status of any Bitcoin transakshon bi, and dia kurent balans, na as dem dey download only very smoll part of di entaya blockchain.

### Altanative Blockchain Aplikashons {#alternative-blockchain-applications}

Di idia to dey take basik blockchain idia and to dey apply am to oda konsepts also get long history. For 2005, Nick Szabo don kome out wit di konsept of "[sekure propaty titols wit owna authority](https://nakamotoinstitute.org/secure-property-titles/)", one dokument wey dey deskribe hau "new advans in replikated database teknology" go allow for one blockchain-based system to dey store registry of who get wetin land, dey kreate one big framework wey inklude konsepts laik homesteading, adverse posseshon and Georgian land tax. But, di sad tin bi sey nor effective replikated database system dey afailabol dat taim, and so di protokol neva impliment in praktis. Afta 2009, haueva, wen dem divelop Bitcoin disentralized konsensus, plenti oda aplikashons kwik-kwik start to dey show fase.

- **Namecoin** - wey dem kreate for 2010, [Namecoin](https://namecoin.org/) na im dem best deskribe as disentralized name registrashon database. For disentralized protokols laik Tor, Bitcoin and BitMessage, dem nids to bi some way to dey identify akants so dat oda pipol fit interact wit dem, but for all solushons wey exist di only kain identifier afailabol na pseudorandom hash laik `1LW79wp5ZBqaHW1jL5TCiBCrhQYtHagUWy`. Normal, one go laik to bi abol to get akant wit name laik "george". But, di palava bi sey if one pesin fit kreate akant wey di name bi "george" den anoda pesin fit yus di same process to regista "george" for demsefs too and impersinate dem. Di only solushon na first-to-file paradigm, wia di first pesin wey regista go succeed and di sekond one go fail - one palava pafectly fit for di Bitcoin konsensus protokol. Namecoin na di oldest, and di more wey dey successful pass, implimentashon of one name registrashon system wey dey yus dat kain idia.
- **Colored coins** - di purpose of di [kolored koins](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit) na to serve as protokol wey go allow pipol kreate dia own dijital kurensis - abi, for di impotant smoll kase of curency wit one unit, dijital tokens, on top of di Bitcoin blockchain. In di kolored koins protokol, one dey "give" new kurency by givin publik kolor to spesifik Bitcoin UTXO, and di protokol dey difine di kolor of oda UTXO to bi di same as di kolor of di inputs wey di transakshon dat kreate dem spend (some speshial rules dey apply for case of mixed-kolor inputs). Dis dey allow users to maintain wallets wey get only UTXO of spesifik kolor and send dem around much laik regular bitcoins, dem fit backtrack thru di blockchain to ditamin di kolor of any UTXO wey dem get.
- **Metacoins** - di idia wey dey behind metacoin na to get protokol wey dey live on top of Bitcoin, dey yus Bitcoin transakshons to store metacoin transakshons but get difren state transishon funshon, `APPLY'`. Bikos di metacoin protokol nor fit privent invalid metacoin transakshons from to appear for di Bitcoin blockchain, dem add rule sey if `APPLY'(S,TX)` riturn error, di protokol go default go `APPLY'(S,TX) = S`. Dis one dey provide izy metod to kreate any cryptocurrency protokol, wey fit get advans features wey dem nor fit impliment inside Bitcoin imsef, but wit very low divelopment kost sinse di hard tins of mining and netwoking na im Bitcoin protocol don take kia of. Dem don yus metacoins to run some klasses of finanshial kontracts, name registrashon and disentralized ekshanj.

In general, two approach dey to build konsensus protokol: to build indipendent netwok, and to build protokol on top of Bitcoin. Di forma approach, even doh e dey successful for kase of aplikashons laik Namecoin, dey difikut to run; ish individual dey run nids to bootstrap indipendent blockchain, and also build and test all di necessary state transishon and netwoking kode. Adishonaly, wi dey predict sey di set of aplikashons for disentralized konsensus teknology go follow pawa law distribushon wia plenti of di aplikashons go too smoll to warrant dia own blockchain, and wi note sey e get large klasses of disentralized aplikashons, partikularly disentralized autonomous organizashons, wey nid to interact wit ish oda.

Di Bitcoin-based approach, on di oda hand, get di flaw sey im nor inherit di simpol payment sheck features of Bitcoin. SPV dey work for Bitcoin bikos im fit yus di fact sey blockchain deep as proxy for validity; at some point, wons di ancestors of transakshon go far enuf back, e dey safe to say dat dem dey legitimately part of di state. Blockchain-based meta-protokols, on di oda hand, nor fit forse di blockchain make im nor inklude transakshons wey nor valid inside di context of dia own protokols. So, fully sekure SPV meta-protokol implimentashon go nid to backward scan all di way to di biginning of di Bitcoin blockchain to sabi weda abi nor bi some transakshons dey valid. Rite nau, all "lite" implimentashons of Bitcoin-based meta-protokols dey rely on trusted server to giv di data, wey if pesin argue am di rizut dey up espeshialy wen one of di primary purposes of cryptocurrency na to end di nid for trust.

### Skripting {#scripting}

Even witout any extenshons, di Bitcoin protokol akshualy dey facilitate wik vashon of konsept of "smart kontracts". Publik key nor just own UTXO for Bitcoin, but also by more hard skript wey dem show for simpol stack-based programming languaj. For dis situashon, one transakshon wey dey spend dat UTXO gats giv data wey go satisfy di skript. For real, even di basik publik key ownaship metod dey run via skript: di skript dey take elliptic kurve signashure as input, dey verify am against di transakshon and di address wey own di UTXO, and riturn 1 if di verifikashon dey successful and 0 if e nor bi. Oda, more hard, skripts dey exist for varios extra yus kases. For eksampol nau, pesin fit konstruct skript wey rikwaya signashures from two out of given three private keys to validate ("multisig"), setup wey dey yusful for korporate akants, sekure savings akants and some merchant escrow situashons. Dem fit also yus skripts to pay bountis for solushons to komputashonal palava, and pesin fit even konstruct skript wey sey somtin laik "dis Bitcoin UTXO na yor own if yu fit provide SPV pruf sey yu send Dogecoin transakshon of dis denominashon to mi", basikaly making sure sey disentralized kross-cryptocurrency ekshanj dey.

Haueva, di skripting languaj as dem run am for Bitcoin get many limitashons:

- **Lack of Turing-completeness** - dat na to say, while e get big subset of komputashon wey di Bitcoin skripting languaj dey support, en nor almost support efritin. Di main category wey dey miss na loops. Dem dey do dis to afoid infinite loops during transakshon verifikashon; theoretikaly dem nor fit ridus big palava for skript programas, sinse any loop fit simulate wen anybodi do di basik kode many taims wit one if statement, but im nor lead to skripts wey get very space-inefishient. For eksampol, to run difren elliptik kurve signashure algorithm go fit rikwaya 256 repeated multiplikashon rounds all put one by one for di kode.
- **Value-blindness** - wey nor dey for UTXO skript to giv fine-grained kontrol ova di amount wey dey fit witdraw. For eksampol, one pawaful yus kase of orakol kontract go bi hedging kontract, wia A and B go put $1000 worth of BTC and afta 30 days di skript go send $1000 worth of BTC to A and di rest to B. Dis one go rikwaya orakol make im ditamin di value of 1 BTC for USD, but even den e bi big growth for terms of trust and infrastrukshure rikwayament ova di fully sentralized solushons wey dey afailabol nau. But bikos dem UTXO na all-or-nothing, di only way wey e fit get dis na thru very unstabol hack wey go make di pesin get UTXO of difren amount (eg. one UTXO of 2<sup>k</sup> for efri k up to 30) and having di orakol pick wich UTXO e go send give A and wich one e go send giv B.
- **Lack of state** - UTXO fit dey spend abi nor spend. Oportunity nor dey for multi-stage kontracts abi skripts wey dey kip any oda internal state biyond dat. Dis one dey make am hard to make multi-stage opshons kontracts, disentralized ekshanj offas abi two-stage cryptographic komitment protokols (wey dey necessary for sekure komputashonal bountis). Im also mean sey dem fiy only yus UTXO to build simpol, kontracts wey go work just wons. Im nor fit build more komplex "stateful" kontracts laik disentralized organizashons, and e dey make meta-protokols hard to run. Binary state kombine wit value-blindness also mean sey anoda important aplikashon, witdrawal limits, nor dey posibol.
- **Blockchain-blindness** - UTXO dey blind to blockchain data laik di nonce, di taimstamp and block hash wey don hapun bifor. Dis one dey limit aplikashons for gambol wella, and plenti oda kategoris, by blokin di skripting languaj of important sorse of randomness wey fit hapun.

So, wi dey si three ways to build advans aplikashons on top of cryptocurrency and dem bi: building new blockchain, to dey yus skripting on top of Bitcoin, and dey build meta-protokol on top of Bitcoin. To dey build new blockchain dey allow for unlimited freedom for building feature set, but at di kost of divelopment taim, bootstrapping effort and sekurity. To dey skript dey izy to run and standardize, but e dey very limited for im kapabilitis, and meta-protokols, as im dey izy to yus, dem dey suffer from faults for skalability. Wit Ethereum, we dey try build difren framework wey go giv big-big gains to make divelopment izy as well as even stronga lite klient propatis, while at di same taim go allow aplikashons shia ekonomik environment and blockchain sekurity.

## Ethereum {#ethereum}

Di intent of Ethereum na to kreate a difren protokol to dey build disentralized aplikashons, givin difren set of tradeoffs wey wi believe sey e go dey very yusful for big klass of disentralized aplikashons, wit speshial emphasis for situashons wia rapid divelopment taim, sekurity for smoll and aplikashons wey dey nor too dey yus, and di ability of difren aplikashons to interact, dey important. Ethereum dey do dis by making wetin bi koko di abstract fondashonal layer wey high pass: blockchain wit built-in Turing-complete programming languaj, wey go allow anybody write smart kontracts and disentralized aplikashons wia dem fit kreate dia own rules for ownaship, transakshon formats and state transishon funshons. Dem fit write di bare-bone vashon of Namecoin for just 2 line of kode, and dem fit build oda protokols laik kurrensis and reputashon systems for onda twenty. Some smart kontracts, cryptographic "boxes" fit kontain value and go only unlock am if some tins dey met, e fit also dey built on top of di platfom, wit more pawa pass wetin Bitcoin skripting dey offer bikos of di pawas wey dem add of Turing-completeness, value-awianess, blockchain-awianess and state.

### Ethereum Akants {#ethereum-accounts}

For Ethereum, di state dey made up of objects wey dem dey call "akants", wey ish akant dey get 20-byte address and state transishons and na direct transfas of value and informashon bitwin akants. Ethereum akant dey normally kontain four fields:

- Di **nonce**, na kanta wey dem dey yus to make sure sey ish transakshon fit only dey processed wons
- Di akants kurent **ether balans**
- Di akants **kontract kode**, if e dey present
- Di akant's **storaj** (dis one dey dey empty by default)

"Ether" na di main internal crypto-fuel of Ethereum, and dem dey yus am pay transakshon fees. Generally, e get two types of akant's: **externally owned akants**, wey private keys dey kontrol, and ** kontract akants**, wey kontract kode dey kontrol. One ekstanal akant wey dem own nor get kode, and pesin fit send messaj from ekstanal akant wey dem own by just making and signing transakshon; for kontract akant, efri taim di kontract akant risiv messaj im kode dey aktivate, wey dey allow am read and write to internal storaj and send oda messajis abi kreate kontracts in turn.

Note sey "kontracts" for Ethereum nor bi somtin wey dem suppose "fulfill" abi "komply wit"; rada, dem bi more laik "autonomous agents" wey dey live inside di Ethereum exekushon environment, always dey exekute spesifik piece of kode wen dem "poke" am by messaj abi transakshon, and dem get direct kontrol ova dia own ether balans and dia own key/value store wey dem dey yus kip track of dem persistent variabols.

### Messajis and Transakshons {#messages-and-transactions}

Dem dey yus di term "transakshon" for Ethereum to refer to di data package wey dem sign and dey store messaj wey dem suppose send from akant dem own externally. Transakshons dey kontain:

- Di pesin wey go get di messaj
- Signashure wey go konfam di senda
- Di amount of ether to transfa from di pesin wey dey send to di pesin dey risiv am
- Data field wey dey opshonal
- Di `STARTGAS` value, wey go reprisent di maximum numba of komputashonal steps wey di transakshon exekushon suppose take
- Di `GASPRICE` value, wey dey reprisent di fee wey di senda dey pay per komputashonal step

Di first three na normal fields wey dem dey ekspect for any cryptocurrency. Di data field nor get funshon by default, but di virtual machine get opcode wey kontract fit yus to access di data; as eksampol yus kase, if kontract dey funshon as on-blockchain domain registrashon savis, den e fit wish to intapret di data wey dem dey pass to am as im kontain two "fields", di first field go bi domain to regista and di sekond field go bi di IP address to regista am to. Di kontract go kon read dis values from di messaj data and put dem for storaj.

Di `STARTGAS` and `GASPRICE` fields dey important for Ethereum anti-denial of savis model. To privent asidental abi hostile infinite loops abi oda komputashonal wastaj for kode, ish transakshon gats set limit to hau many komputashonal steps of kode exekushon e fit yus. Di fundamental unit of komputashon na "gas"; ushualy, komputashonal step dey cost 1 gas, but some operashons dey kost higher amounts of gas bikos dem dey more komputashonaly expensive, abi dem dey inkrease di amount of data wey suppose store as part of di state. Fee of 5 gas also dey for efri byte of di transakshon data. Di intent of di fee system na to rikwaya attaka to pay same tin for efri risorsis wey dem yus, wey inklude komputashon, bandwidth and storaj; so, any transakshon wey dey make di netwok konsume big amount of any of dis risorsis suppose get gas fee wey bi di ekwol to di fee wey inkrease.

### Messajis {#messages}

Kontracts get di ability to send "messajis" to oda kontracts. Messajis na virtual objects wey dem neva serialize and wey exist only for di Ethereum environment. One messaj dey kontain:

- Di pesin wey send di messaj (implicit)
- Di pesin wey go get di messaj
- Di amount of ether wey dem suppose send wit di messaj
- Data field wey dey opshonal
- A `STARTGAS` value

For real, messaj bi laik transakshon, eksept sey na kontract dey produce am and im nor get any aktor for outside. Dem dey produs messaj wen kontract wey dey kurrently exekute kode exekute di `CALL` opcode, wey dey produs and exekute messaj. Laik transakshon, messaj dey lead to di resipient akant wey dey run im kode. So, kontracts fit get rilashonships wit oda kontracts in di same way gan-gan wey ekstanal aktors fit.

Make yu note sey di gas allawans wey transashon abi kontract assign dey apply to di total gas wey dat transakshon and all sub-exekushon dey konsume. For eksampol, if ekstanal aktor A send transakshon to B wit 1000 gas, and B konsume 600 gas bifor im send messaj to C, and di internal exekushon of C konsume 300 gas bifor e riturn, den B fit spend anoda 100 gas bifor im gas finish.

### Di Ethereum State Transishon Funshon {#ethereum-state-transition-function}

![Ether state transishon](./ether-state-transition.png)

Dem define di Ethereum state transishon funshon, `APPLY(S,TX) -> S'` laik dis:

1. Sheck if di transakshon dem form wella (i. e. e get di koret numba of values), di signashure dey valid, and di nonce match di nonce for di akant of di pesin wey send am. If im nor bi so, riturn error.
2. Kalkulate di transakshon fee as `STARTGAS * GASPRICE` and ditamin di sending address from di signashure. Rimuv di fee from di akant balans of di pesin wey send am kon inkrease di nonce of di senda. If di balans nor dey enuf to spend, im go riturn error.
3. Set `GAS = STARTGAS`, and make yu rimuv some gas per byte to pay for di bytes for di transakshon.
4. Send di transakshon value from di akant of di senda to di akant of di pesin wey go risiv am. If di akant wey go risiv nor exixt, make yu make am. If di akant wey wan risiv na kontract, run di kontract kode till im komplete abi till di exekushon gas out.
5. If di value transfa fail bikos di senda nor get enuf money, abi di kode exekushon gas out, make yu rivarse all state shanjis eksept di payment of di fees, and add di fees to di miner akant.
6. If nor bi so, make yu refund di fees for all gas fee wey rimain to di senda, and send di fees wey dem pay for gas wey dem konsume to di miner.

For eksampol, make wi sey di kontract kode bi:

```py
if !self.storage[calldataload(0)]:
  self.storage[calldataload(0)] = calldataload(32)
```

Note sey for real life, dem dey write di kontract kode for low-level EVM kode; dis eksampol na for Serpent, one high-level languajis, for klarity, and dem fit join am down to EVM kode. Make wi sey di kontract storaj start empty, and dem send transakshon wit 10 ether value, 2000 gas, 0.001 ether gasprice, and 64 bytes of data, wit bytes 0-31 wey dey reprisent di numba `2` and bytes 32-63 wey dey reprisent di string `CHARLIE`. Di process for di state transishon funshon for dis kase go bi laik dis:

1. Sheck sey di transakshon dey valid and dem form am well.
2. Sheck sey di transakshon senda get at least 2000 \* 0.001 = 2 ether. If na so, den subtract 2 ether from di senda akant.
3. Start gas = 2000; wey dey assume di transakshon na 170 bytes long and di byte-fee na 5, subtract 850 so dat 1150 gas go rimain.
4. Rimuv 10 more ether from di akant of di senda, and add am to di kontract akant.
5. Make yu run di kode. For dis kase, dis one simpol: im dey sheck if dem yus di kontract storaj `2`for index, dey notis sey dem nor dey yus am, and so im dey set di storaj at index `2` to di value `CHARLIE`. Make wi sey dis one take 187 gas, so di amount of gas wey rimain na 1150 - 187 = 963
6. Make yu add 963 * 0.001 = 0.963 ether back to di akant of di senda and riturn di state wey rizut.

If nor kontract dey for di receiving end of di transakshon, den di total transakshon fee go dey ekwol to di `GASPRICE` wey dem give, multiply by di length of di transakshon for bytes, and di data wey dem send alongside di transakshon nor go mata.

Make yu note sey messajis dey work di same way as transakshons for terms of reverts: if messaj exekushon gas out, den dat messaj exekushon, and all oda exekushons wey dat exekushon trigga, go revert, but parent exekushons nor nid to revert. Dis one mean say e dey "safe" for kontract to koll anoda kontract, as if A koll B wit G gas den A exekushon dey ashured to lose pata pata G gas. Make yu also note sey opcode dey, `CREATE`, wey dey make kontract; im exekushon mekaniks generally similar to `CALL`, wit di eksepshon sey di output of di eksepshon dey ditamin di kode of kontract wey dem just kreat.

### Kode Exekushon {#code-execution}

Dem write di kode for Ethereum kontracts for low-level, stack-based bytecode languaj, wey dem dey koll "Ethereum virtual machine kode" abi "EVM kode". Di kode get bytes, wia ish byte dey reprisent operashon. Kode exekushon na infinite loop wey mean sey im go dey do di operashon for di kurent program kounta (wey start from zero) ova and oava again and den inkrease di program kounta by one, until di kode end abi one error abi `STOP` abi `RETURN` instrukshon wey dem detect. Di operashons dey get access to three types of space wia dem fit store data:

- Di **stack**, last-in-first-out kontaina wia dem fit push and pop values
- **Memory**, did one na byte array wey yu fit ekspand foreva
- Di kontract long-term **storaj**, key/value store. Unlaik stack and memory, wey dey start ova afta komputashon end, storaj dey stay for a long taim.

Di kode fit also access di value, senda and data of di massaj wey dey kome in, and block heada data, and di kode fit also riturn byte array of data as output.

Di propa exekushon model of EVM kode akshualy dey simpol. Wen di Ethereum virtual machine dey run, dem fit define im full komputashonal state by di tuple `(block_state, transakshon, messaj, kode, memory, stack, pc, gas)` wer `block_state` na di global state wey kontain all akants and inklude balans and storaj. At di start of efri round of exekushon, dem dey find di kurent instrukshon by takin di `pc`th byte of `kode` (or 0 if `pc >= len(code)`), ish instrukshon get im own definishon for terms of hau e dey affect di tuple. For eksampol, `ADD` dey pop two items off di stack and push dia sum, ridus`gas` by 1 and inkrease `pc` by 1, and `SSTORE`dey pop di top two items off di stack and insert di sekond item into di kontract storaj for di index wey di first item tok. Aldoh plenti ways dey to optimize Ethereum virtual machine exekushon via just-in-time komplikashon, pesin fit do basik implimentashon of Ethereum for few hundred lines of kode.

### Blockchain and Mining {#blockchain-and-mining}

![Ethereum apply block diagram](./ethereum-apply-block-diagram.png)

Di Ethereum blockchain in many ways dey similar to di Bitcoin blockchain, but im get some tins wey difren. Di main difrens bitwin Ethereum and Bitcoin for dia blockchain architecture bi sey, unlaik Bitcoin, Ethereum blocks dey karry kopy of both di transakshon list and di most risent state. Apart from dat one, two oda tins, di block numba and di difikulty, dem dey also kip am for inside block. Di basik block validashon algorithm for Ethereum dey go laik dis:

1. Sheck if di privious block wey dem refrens dey exist and is valid.
2. Sheck sey di taimstamp of di block dey pass di one of di privious block wey dem refrens and im also nor reach 15 minutes into fushure
3. Sheck sey di block numba, difikulty, transakshon root, uncle root and gas limit (different low-level Ethereum-specific concepts) dey valid.
4. Make yu sheck sey di proof-of-work for di block dey valid.
5. Let `S[0]` bi di state at di end of di previous block.
6. Make `TX` bi d block transakshon list, wit `n` transakshons. For all `i` in `0...n-1`, set `S[i+1] = APPLY(S[i],TX[i])`. If any of di aplikashons return error, abi if di total gas wey dem yus for di block ontil dis point pass di `GASLIMIT`, return error.
7. Make `S_FINAL` bi `S[n]`, but add di block riwod wey dem pay to di miner.
8. Sheck if di Merkle tree root of di state `S_FINAL` dey ekwol to di final state root wey dem giv for de block heada. If im dey so, di block dey valid; if not, im nor valid.

Dis approach fit look laik sey e nor dey work at first, bikos im nid to store di whole state wit ish block, but for real laif, yu fir kompia am wit to dat of Bitcoin for hau good im dey work. Di rizin bi sey dem dey store di state inside tree strukshure, and afta efri block na only smoll part of di tree nid shanj. So, in general, bitwin two blocks wey dey klose to ish oda, most of di tree go bi di same, and so dem fit store di data wons and refrena am two taims as dem dey yus pointas (wey bi hashes of subtrees). Dem dey yus speshial kain tree wey dem dey koll "Patricia tree" to do dis one. E fit shanj di Merkle tree konsept wey go allow make dem fit put and delete nodes, and nor bi just to shanj dem, im go do am wella. Also, bikos all di state infomashon dey part of di last block, im nor nid to store di whole blockchain history - strategy wey, if dem fit apply am to Bitcoin, fit give 5-20 taims savings for space.

Kweshon wey pipol dey always ask na "wia" dem dey run kontract kode, in terms of fisikal hardwia. Di ansa simpol: di process wey dem dey yus run kontract kode na part of di definishon of di state transishon funshon, wey bi part of di block validashon algorithm, so if dem add transakshon into block `B` di nodes go run di kode exekushon wey di transakshon start, nau and in di fushure, wey download and validate block `B`.

## Aplikashons {#applications}

In general, three types of aplikashons dey on top Ethereum. Di first kategory na finanshial aplikashons, wey dey giv users more pawaful ways wey dem fit yus manaj and enta kontracts as yu dey yus dia money. Dis one inklude sub-kurensis, finanshial derivatives, hedging kontracts, savings wallets, wills, and im even get some kain full-skale employment kontracts. Di sekond kategory na semi-finanshial aplikashons, wia money dey involve but im still get heavy non-monetary side to wetin dem dey do; pafect eksampol na sef-enforsing bountis wey solushons to komputashonal palava. Las-las, aplikashons laik online voting and disentralize gofanans dey wey nor bi finanshial at all.

### Token Systems {#token-systems}

Token systems wey dey on-blockchain dey get plenti aplikashons wey range from sub-kurensis wey dey reprisent assets laik USD abi gold to kompany stocks, individual tokens wey dey reprisent smart propaty, sekure koupons wey dem nor fit forge, and even token systems wey nor get any tie to konvenshonal value sef, wey dem dey yus as point systems for insentivizashon. Token systems dey surprise isy to impliment in Ethereum. Di key point to ondastand bi sey all kurency, abi token system, fundamentally na database wit one operashon: subtract X units from A and give X units to B, wit di kondishon sey (i) A bin get at least X units bifor di transakshon and (2) A approve di transakshon. All im nid to impliment token system na to put dis logik inside kontract.

Di basik kode dem fit yus run token system for Serpent dey look laik dis:

```py
def send(to, value):
  if self.storage[msg.sender] >= value:
    self.storage[msg.sender] = self.storage[msg.sender] - value
    self.storage[to] = self.storage[to] + value
```

Dis one na literal implimentashon of di "banking system" state transishon funshon wey dem deskribe for dis dokument. Dem go nid add smoll extra lines of kode to provide for di first step of distributing di kurency units for di first place and some oda edge kases, and normally dem gats add funshon wey go allow oda kontracts to sheck di balans of di address. But na all wey dey to am bi dat. Base on theory, Ethereum-based token systems wey dey act as sub-kurensis fit get anoda important feature wey on-chain Bitcoin-based meta-kurensis nor get: dis one na di ability to pay transakshon fees diret for dat kurensy. Hau dem go run dis one bi sey di kontract go maintain ether balans wey im go take rifund ether wey dem yus pay fees to di senda, and im go refill dis balans as im dey kolet di internal kurensy units wey im dey take as fees and resell dem to dey yus run aukshon wella. So users go nid "activate" dia akants wit ether, but wons di ether don dey dia yus fit yus am again bikos di kontract go rifund am ish taim.

### Finanshial derivatives and dem Stabol-Value Kurensis {#financial-derivatives-and-stable-value-currencies}

Finanshial derivatives na di aplikashon wey kommon passfor di "smart kontract", and one of di tin wey simpol pass to run for kode. Di main palava to dey run finanshal kontracts bi sey most of dem nid refrens for price ticker wey dey outside; for eksampol, one aplikashon dem disaya pass na smart kontract wey dey hedge against di volatility of ether (or anoda cryptocurrency) wit respect to US dollar, but to do dis one, di kontract nid sabi wetin di value of ETH/USD bi. Di way wey simpol pass to do dis na thru one "data feed" kontract wey spesifik party (laik NASDAQ) dey dem disign so dat dat party get di ability to update di kontract as dem nid am, and im dey provide intaface wey allow oda kontracts to send messaj to dat kontract and get response wey dey provide di price.

For dat kritikal ingrident, di hedging kontract go look as follows:

1. Wait for party A to input 1000 ether.
2. Wait for party B to input 1000 ether.
3. Rekod di USD value of 1000 ether, wey dem kalkulate by asking di data feed kontract, for storaj, make wi sey na $x.
4. Afta 30 days don reach, allow A abi B to "reactivate" di kontract to send $x worth of ether (wey dem kalkulate by asking di data feed kontract again to get di new price) to A and di rimaining to B.

Dis kain kontract go get big potenshial for crypto-commerce. One of di main palava pipol tok about cryptocurrency na di fact dat im dey volatile; aldoh plenti users and merchants fit wont di sekurity and conveniens to dey deal wit cryptographic assets, dem nor fit wont to face dat possibility of losing 23% of di value of dia funds for just one day. Ontil nau, di solushon wey pipol dey propose pass na issuer-backed assets; di idia bi sey issuer go make sub-kurrency wey dem get rite to issue and revoke units, den dem dey provide one unit of di kurrency to anybodi wey giv dem (offline) wit one unit of di asset wey dem spesify (laik gold, USD). Di pesin wey kon issue kon promise to giv one unit of di basik asset to anybodi wey send back one unit of di crypto-asset. Dis metod dey allow any non-cryptographic asset to dey "uplifted" into one cryptographic asset, if dem fit trust di pesin wey issue am.

In praktis, haueva, pesin wey issue nor dey always trustworthy, and for some cases di banking infrastrukshure sef go dey too weak, abi too hostile, for such savis to komot. Finanshial derivatives dey provide alternative. For here, insted of one one singol issuer wey dey provide di funds to back up asset, disentralize market watchers, wey dey bet di price of cryptographic refrens asset (laik ETH) go go up, kon play dat role. Unlaik di pipol wey dey issue, pipol wey dey watch nor get opshon to default on dia side of di bargain bikos di hedging kontract dey hold dia funds for eskrow. Make you note sey dis approach nor dey fully disentralize, bikos dem still nid trusted sorse to giv di price ticker, aldoh yu fit argue sey dis one still bi big growth wen you dey look am from di angle of ridusing wetin infrastrukshure rikwaya (unlaik to bi issuer, to dey issue price feed nor nid licenses and dem fit size am as free speech) and e dey ridus di potenshial for 419.

### Identity and Reputashon Systems {#identity-and-reputation-systems}

Di first alternative cryptocurrency of all, [Namecoin](http://namecoin.org/), wey try to yus Bitcoin-laik blockchain to provide name registrashon system, wia users fit regista dia names for publik database alongside oda data. Di main yus kase wey dem dey tokk about na for [DNS](https://wikipedia.org/wiki/Domain_Name_System) system, wey dey map domain names laik "bitcoin.org" (abi, for Namecoin kase, "bitcoin.bit") to IP address. Oda yus kases na email authentikashon and even more advans reputashon systems. Here na di basik kontract wey dem fit yus giv Namecoin-laik name registrashon system for Ethereum:

```py
def register(name, value):
  if !self.storage[name]:
    self.storage[name] = value
```

Di kontract simpol wella; all im bi na just database inside di Ethereum netwok wey dem fit add to, but dem nor fit adjust abi rimuv from am. Anybodi fit regista name wit some value, and dat registrashon go stick foreva. More advans name registrashon kontract go also get "funshon klause" wey go allow oda kontracts to ask am kweshons, im go also get metod for di "owna" (wey bi di first pesin wey regista) wit name wey im fit yus shanj di data abi transfa ownaship. Pesin fit even add reputashon and web-of-trust funshonality on top.

### File storaj wey nor dey sentralize {#decentralized-file-storage}

Ova di past few years, plenti popular online file storaj startups don show, di most popular one na Dropbox, wey dey try allow users to upload backup of dia hard drive den di savis go store di backup and allow di user access am in ekshanj for monthly fee. But, for dis taim, di file storaj market sometaims nor dey effishient; if yu just look smoll for diferen solushons wey exist, yu go see sey, espeshially for di "uncanny valley" 20-200 GB level wia free quotas abi enterprise-level diskounts nor dey work, monthly prices for mainstream file storaj kost so tey yu dey pay pass di kost of di entaya hard drive for just one month. Ethereum kontracts fit allow for di growth of disentralize file storaj ekosystem, wia individual users fit earn smoll money as dem dey rent out dia own hard drives and den dem fit yus di space wey dem nor yus to further ridus di kosts of file storaj.

Di main foundashon piece for dis device go bi wetin wi don koll di "disentralize Dropbox Kontract". Dis na laik kontract works as follows. First, pesin go separate di data wey dem wont into blocks, encrypt ish block so im go dey private, and dey build Merkle tree from am. Pesin go den make kontract wit rule sey, efri N blocks, di kontract go pick random index for di Merkle tree (using di block hash wey don pass, wey dey accessibol from kontract kode, as source of randomness), den giv X ether to di first entity wey provide transakshon wit simplol payment verifikashon-laik pruf of ownaship of di block for dat index for di tree. Wen user wan download dia file again, dem fit yus mikropayment shannel protokol (laik pay 1 szabo per 32 kilobytes) to get di file back; di aproach wey dey fee-effishient past na for di pesin wey dey pay make im nor publish di transakshon ontil di end, insted dem go riplace di transakshon wit one wey get more money wit di same nonce afta im reach efri 32 kilobytes.

One very important feature of di protokol bi sey, aldoh im fit look laik pesin dey trust many random nodes sey dem nor go deside to forget di file, pesin fit ridus dat risk to almost zero by separating di file into many pieces thru sikrit sharing, den watching di kontracts to see if ish piece still dey for some node posseshon. If one kontract still dey pay out money, dat one dey provide cryptographic pruf sey somebody somewia still dey store di file.

### Disentralized Autonomous Organizashons {#decentralized-autonomous-organizations}

Di general konsept of one "disentralized autonomous organizashon" na of virtual entity wey get some set of membas abi shiaholdas wey, maybe wit 67% majority, get di rite to spend di entity money and modify im kode. Di membas go kollectively deside hau di organizashon go allocate im funds. Ways wey dem dey yus shia DAO funds fit range from bountis, salaris to even more exotik metods laik intanal kurensy to tins laik riwod work. Dis one dey essenshialy replikate di legal strukshure of tradishonal kompany abi nonprofit but im dey yus only di cryptographic blockchain teknology to enforse am. So far, plenti of di tori around DAOs don dey around di "kapitalist" model of "disentralized autonomous korporashon" (DAC) wit shiaholdas wey dey risiv dividends and tradabol shia; na anoda models, wey dem fit eksplain as "disentralize autonomous komunity", go make all membas get ekwol shia for desishon making and go rikwaya 67% of membas wey dey exist make dem agree to add abi rimuv memba. Wetin pesin rikwaya fit only get only one membaship wey dem go nid to enforse di group koletively.

One general outline for hau to kode one DAO na laik dis. Di disign wey simpol pass na simpol piece of sef-modifying kode wey dey shanj if two-thirds of di membas agree on di shanj. Aldoh kode dey hard to shanj for theory, pesin fit get around dis izy and get de-facto mutability by having chunks of di kode to separate kontracts, and having di address of which kontracts to koll stored wey dey stored for di storaj dem fit modify. To run dat simpol DAO kontract, im go get three transakshon types, wey dem dey distinguish by di data wey dem provide for di transakshon:

- `[0,i,K,V]` to regista di proposal wit index `i` to shanj di address at storaj index `K` to value `V`
- `[1,i]` to regista vote wey dey proposal `i`
- `[2,i]` to take finalize proposal `i` if dem don make enuf votes

Di kontract go den get klauses for ish of dis. E go maintain rekod of all open storaj shanjis, wit list of di pipol wey vote for dem. E go also get list of all di membas. Wen any storaj shanj don reach two thirds of membas wey dey vote for am, di final transakshon fit exekute di shanj. Dem go also don build sophistikated skeleton wey go also get built-in voting ability for feashures laik sending transakshon, make en add membas and make en rimuv membas, and e fit even provide for [Liquid Demokrasy](https://wikipedia.org/wiki/Liquid_democracy)-style vote delegashon (wey bi sey anybody fit assign someone make en vote for dem, and assignment dey transitive so if A assign B and B assign C den C dey ditamin A vote). Dis disign go kon allow di DAO make im grow normally as komunity wey nor dey sentralized, wey dey allow pipol to delegate di task of filtering out who bi memba to speshialists las-las, but for di "kurent system" speshialists fit pop in and out of existence izy ova taim as individual komunity membas shanj hau dem align.

Anoda model na for disentralized korporashon, wia any akant fit get zero abi more shares, and two thirds of di shares rikwaya to make desishon. Komplete skeleton go involve asset manajment funshonality, di ability to make offer to buy abi sell shares, and di ability to asept offers (hopefully wit order-matching metods inside di kontract). Delegashon go also exist Liquid Demokracy-style, generalizing di idia of "board of directors".

### Hau yu fit apply am more {#further-applications}

**1. Wallets wey dem dey yus save**. Make wi sey Alice wan kip en funds safe, but she dey worried sey she go luz am abi sombody go hack en private key. She put ether for kontract wit Bob, wey bi bank, laik dis:

- Na Alice alone fit rimuv highes 1% of di funds for ish day.
- Na Bob alone fit rimuv maximum of 1% of di funds per day, but Alice get di pawa to make transakshon wit her key wey go shut off dis ability.
- Alice and Bob togeda fit witdraw anytin.

Normally, 1% efri day dey enuf for Alice, and if Alice wan kollet more moni she fit ask Bob for helep. If dem hack Alice key, she go run go meet Bob tell am sey make im muv di funds to new kontract. If her key lost, Bob go find way rimuv di funds las-las. If Bob turn out to bi bad pesin, den she fit turn off im ability to witdraw.

**2. Crop insurans**. Pesin fit make finanshial derivatives kontract izy but dem go yus data feed of di weather, e nor go yus di one of any price index. If farmer for Iowa buy derivative wey dey pay out opposite based on di rainfoll for Iowa, den if drought dey hapun, di farmer go risiv di moni sharp-sharp and if rain plenti di farmer go happy bikos dia crops go do well. Dem fit also expand dis one to natural disaster insurans generally.

**3. Data feed wey no dey sentralized **. For finanshial kontracts, e fit dey posibol to disentralize di data feed thru protokol wey dem dey koll "[SchellingCoin](http://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/)". SchellingCoin dey work like dis: N parties all go put into di system di value of di given data (like de ETH/USD price), im go sort di values, and efribody bitwin di 25th and 75th percentile go get one token as riwod. Efribodi get di insentive to provide di ansa wey efribodi else go provide, and di only value wey plenti playas fit realistikaly agree on na di obvious default: di truth. Dis one go kreate disentralized protokol wey fit for theory giv any numba of values, e go also give di ETH/USD price, di temperashure for Berlin abi even di rizut of one hard computashon.

**4. Smart multisignature eskrow**. Bitcoin dey allow multisignature transakshon kontracts wia, for eksampol, three out of di five keys fit spend di funds. Ethereum dey allow for more granularity; for eksampol, four out of five fit spend efritin, three out of five fit spend up to 10% per day, and two out of five fit spend up to 0.5% per day. Di Ethereum multisig also dey asynchronous - dis one mean say two parties fit regista dia signatures for di blockchain at difren taims and di last signature go automatikaly send di transakshon.

**5. Cloud komputing**. Dem fit also yus di EVM teknology take make verifiabol komputing environment, wey go allow users make dem ask odas to karry out komputashons and den opshonaly ask for proofs sey dem do komputashons koretly for some sheckpoints wey dem randomly pick. Dis one dey allow for di kreashon of kloud komputing market wia any user fit participate with dia desktop, laptop or speshialized server, and to dey spot check togeda wit sekurity deposits fit dey used to make sure say di system dey trustworthy (like nodes no fit cheat den make profit). Aldoh dis kind system fit nor dey suitabol for all tasks; tasks wey rikwaya high level of inter-process komunikashon, for eksampol, nor fit do am izy on top large kloud of nodes. Oda tasks sha dey izy pass to parallelize; projects laik SETI@home, folding@home and genetik algorithms fit dey izy to run on top dis platfom.

**6. Peer-to-peer gambling**. Any numba of peer-to-peer gambling protokols, laik Frank Stajano and Richard Clayton [Cyberdice](http://www.cl.cam.ac.uk/~fms27/papers/2008-StajanoCla-cyberdice.pdf), fit dey run on di Ethereum blockchain. Di gambling protokol wey simpol pass na akshualy just kontract for difrens on di next block hash. Dem fit build more advans protokols from dia, dis one go kreate gambling savis wit near-zero fees wey nor get ability to sheat.

**7. Markets wey dem dey predict**. If dem provide orakol abi SchellingCoin, markets wey dem dey predict also dey izy to run, and prediction markets togeda wit SchellingCoin fit prove to be di first mainstream aplikashon of [futarchy](http://hanson.gmu.edu/futarchy.html) as gofanans protokol for disentralized organizashons.

**8. On-chain disentralized marketplaces**, wey dey yus di identity and reputashon system as base.

## Miscellanea And Koncerns {#miscellanea-and-concerns}

### Modified GHOST Implimentashon {#modified-ghost-implementation}

Di "Greedy Heaviest Observed Subtree" (GHOST) protokol na new tin wey Yonatan Sompolinsky and Aviv Zohar first bring out for [December 2013](https://eprint.iacr.org/2013/881.pdf). Wetin make dem kreate GHOST na say blockchains wey dey konfam tins kwik-kwik dey suffer from sekurity palava bikos of high old rate - as e take dey hapun, if miner A mine one block and den miner B kome mine anoda block bifor miner A own reach B side, miner B block go waste and e nor go helep sekurity for di netwok. Again sef, anoda palava dey: if miner A na mining pool wey get 30% hashpawa and B get 10% hashpawa, A go get 70% shans to produs stale block (bikos di oda 30% of di taim, na A produs di last block so e go get mining data sharp-sharp) while B go get 90% shans to produs stale block. So, if di block interval short wella make stale rate high, A go dey more effishient just bikos of im size. As dis two tins join, blockchains wey dey produs blocks kwik-kwik fit make one mining pool get enuf persentaj of di netwok hashpawa to dey kontrol di mining process by imsef.

As Sompolinsky and Zohar tok am, GHOST dey solve di first palava of netwok sekurity loss by putting old blocks for di kalkulashon of wich chain long pass; dat one mean sey, nor bi just di parent and ancestors of one block, but also di old descendants of di block ancestor (for Ethereum languaj, wi dey koll dem "uncles") dem go add for di kalkulashon of wey dey block get di total proof-of-work wey big pass behind am. To solve di sekond palava of sentralizashon bias, wi go pass di protokol wey Sompolinsky and Zohar deskribe, and wi go also give block riwods to stales: one old block go risiv 87.5% of im base riwod, and di nephew wey get di old block go risiv di rimaining 12.5%. Dem nor dey giv transakshon fees to uncles.

Ethereum dey yus simpol vashon of GHOST wey dey only go down seven levels. Na laik dis dem define am:

- One block suppose tok wey bi one be im parent, and en suppose tok at least 0 abi more uncles
- Uncle wey dey block B gats get dis kain propatis:
  - Im suppose bi diret pikin of di kth generashon ancestor of B, wia `2 <= k <= 7`.
  - En nor fit be ancestor of B
  - Uncle gats bi korect block heada, but im nor nid to bi block wey dem don verify bifor abi even koret bloc
  - Di uncle gats dey difren from all uncles wey dem don put for blocks bifor and all oda uncles wey dem put for di same block (nor doubol-inklushon)
- For efri uncle U for block B, di miner of B go get extra 3.125% on top im coinbase riwod and di miner of U go get 93.75% of normal coinbase riwod.

Dis limit vashon of GHOST, wey uncles fit only reach 7 generashons, na im dem yus for two rizins. First one, if GHOST nor get limit, e go bring too many palava for di kalkulashon of which uncles dey koret for one block. Sekond one, if GHOST nor get limit wit kompensashon as dem dey yus for Ethereum, e go rimuv di rizin wey make miner go want mine for di main chain insted of di chain of publik attacka.

### Fees {#fees}

Bikos efri transakshon wey dem publish for blockchain dey make netwok spend money to download and sheck am, im nid somtin to kontrol am, wey bi laik transakshon fees, so pipol nor go dey misuse am. Di way wey dem dey do am for Bitcoin, na to make di fees voluntary, dem dey trust miners to bi di gatekipas and set difren minimums. Bitcoin pipol laik dis approach wella bikos im bi laik "market-based", wey dey make supply and dimand bitwin miners and pipol wey dey send transakshon ditamin di price. But di palava wit dis way to dey rizin bi sey, transakshon processing nor bi market; even doh im sweet for mouth to tink sey transakshon to dey process na savis wey miner dey offer pesin wey send am, for real laif efri transakshon wey miner inklude go nid make efri node for di netwok process am, so na third parties dey bear most of di kost of transakshon to dey yus process, nor bi di miner wey dey deside weda to put am abi not. So, wahala wey dey affect efribody go fit hapun.

But as im bi, di fault for di market-based metod bi sey, wen dem give am one partikular wrong asumpshon wey simpol, e go just kancel imsef out laik magik. Di argument na laik dis. Suppose sey:

1. One transakshon dey lead to `k` operashons, wey dey offa riwod `kR` to any miner wey inklude am wia im senda set `R` and miner fit don see `k` and `R` (roughly) bifor.
2. One operashon get processing kost of`C` for any node (wey mean sey all nodes get ekwol efishiensy)
3. Dem `N` mining nodes dey, wey ish one get ekwol processing pawa gan-gan (wey mean `1/N` for di total)
4. Nor full nodes wey nor dey mine exist.

Miner go gree process transakshon if di riwod wey en expect pass di kost. So, di riwod wey en dey ekspet na `kR/N` sinse di miner get `1/N` shans to process di next block, and di processing kost for di miner na just`kC`. So, miners go put transakshons wey `kR/N > kC`, or `R > NC`. Make yu note sey `R` na di per-operashon fee wey di senda provide, and na one lower bound on di benefit wey di senda get from di transakshon, and `NC` na di kost for di entaya netwok togeda to dey process one operashon. So, miners get di insentive to inklude only doz transakshons wey di total utilitarian benefit pass di kost.

But, some impotant tins dey difren for real life from doz asumpshons:

1. Di miner dey pay kost wey high pass to process di transakshon pass di oda nodes wey im dey verify, sinse di extra taim to verify dey delay block propagashon and so e dey inkrease di shans sey di block go bikom old.
2. Full nodes wey nor dey mine dey exist.
3. Di mining pawa distribushon fit end up radikaly inegalitarian in praktis.
4. Pipol wey dey spekulate, politikal enemis and krazy pipol wey just want kause palava for di netwok dey exist, and dem fit smartly set up kontracts wia dia kost low pass di kost wey oda nodes wey dey verify dey pay.

(1) dey make miner wan inklude fewer transakshons, and (2) dey inkrease `NC`; so, dis two effects dey partly kancel ish oda out.(<sup>[Hau?](https://github.com/ethereum/wiki/issues/447#issuecomment-316972260)</sup> 3) and (4) na di main palava; to solve dem wi just put floating cap: nor block fit get more operashons pass `BLK_LIMIT_FACTOR` taims di long-term eksponenshal moving averaj. Spesifikally:

```js
blk.oplimit = floor((blk.parent.oplimit \* (EMAFACTOR - 1) +
floor(parent.opcount \* BLK\_LIMIT\_FACTOR)) / EMA\_FACTOR)
```

`BLK_LIMIT_FACTOR` and `EMA_FACTOR` na konstants wey dem go set to 65536 and 1.5 for nau, but dem fit shanj am afta further analysis.

Anoda faktor dey wey dey diskraj large block sizes for Bitcoin: blocks wey big go take longa taim to spread, and so dem get higher shans to bikom old. For Ethereum, blocks wey yus plenti gas fit also take longa taim to spread both bikos dem big for body and bikos dem take longa taim to process di transakshon state transishons to validate. Dis delay wey dey diskoraj na impotant tin for Bitcoin, but im nor too matta for Ethereum bikos of di GHOST protokol; so, to dipend on regulated block limits dey provide more stabol baseline.

### Komputashon And Turing-Kompleteness {#computation-and-turing-completeness}

One impotant tin bi sey di Ethereum virtual machine dey Turing-komplete; dis one mean sey EVM kode fit enkode any komputashon wey pesin fit tink of, wey inklude loops wey nor dey end. EVM kode dey allow looping for two ways. First, e get `JUMP` instrukshon wey allow di program to jump back to wia e don pass bifor for di kode, and `JUMPI` instrukshon to do kondishonal jumping, wey allow for statements laik `while x < 27: x = x * 2`. Sekond, kontracts fit koll oda kontracts, wey fit allow for looping thru rekurshon. Dis one dey naturaly bring one palava: shey bad users fit shut down miners and full nodes as im dey force dem to enta loop wey nor dey end? Di issue dey kome up bikos of one wahala for komputa science wey dem dey koll di halting palava: e nor get way to tell, for general kase, weda one program go eva stop abi not.

As wi don tok for di state transishon seshon, di solushon na to make sure say transashon gats set maximum numba of komputashonal steps wey en fit take, and if exekushon take longa, komputashon go rivarse but dem go still pay fees. Messajis dey work for di same way. To show di motivashon behind awa solushon, konsida di following eksampol:

- One attaka kreates one kontact wey dey run one inifite loop, and den send one transakshon to dey aktivate dat loop to di miner. Di miner go process di transakshon, run di infinite loop, and den wait for am to run out of gas. Even doh di exekushon run out of gas and stop for middol, di transakshon still valid and di miner still kolet di fee from di attacka for ish komputashonal step.
- Attacka go make very long infinite loop wit plan to forse di miner to kip komputing for so long sotey by di taim komputashon finish, some more blocks don kome out and en nor go posibol for di miner to put di transakshon wey go allow am kolet di fee. But, dem go rikwaya di attacka to submit value for `STARTGAS` wey go limit di numba of komputashonal steps wey exekushon fit take, so di miner go sabi bifor taim sey di komputashon go take too many steps.
- Attacka see kontract wit kode laik `"send(A,kontract.storaj[A]); kontract.storaj[A] =0`", and den send transakshon wit just enuf gas to run di first step but not enuf wey en go take reach di sekond one (wey mean sey en dey make witdrawal but nor let di balans go down). Di pesin wey write di kontract nor nid worry about proteshon against dis kain attack, bikos if exekushon stop for middol, di shanjis go rivarse.
- Finanshial kontract dey work by taking di median of nine proprietary data feeds to ridus risk. Attacka go take ova one of di data feeds, wey dem disign to fit shanj thru di variabol-address-koll metod wey wi don tok about for di sekshon about DAOs, and shanj am to run infinite loop, so e dey try to forse any attempt to klaim funds from di finanshia kontract to run out of gas. But, di finanshial kontract fit set gas limit for di messaj to privent dis palava.

Di oda opshon to Turing-kompleteness na Turing-inkompleteness, wia `JUMP` and `JUMPI` no dey exist and only one kopy of ish kontract fit dey for di koll stack at any taim. Wit dis system, di fee system wey wi don tok and di wahala wey dey around hau awa solushon go work fit nor dey necessary, as di kost to exekute kontract go get upper limit based on im size. Also, Turing-inkompletenes nor even bi big limitashon; out of all di kontract eksampols wey wi don tink of inside, na only one nid loop, and even dat loop wi fit rimuv am if we make 26 repitishons of one-line piece of kode. Wit di sirious implikashons of Turing-kompleteness, and di smoll benefit, why wey we nor wan just yus Turing-inkomplete languaj? For real life, haueva, Turing-inkompleteness nor bi neat solushon to di palava at all. To see why, look dis kontracts:

```sh
C0: call(C1); call(C1);
C1: call(C2); call(C2);
C2: call(C3); call(C3);
...
C49: call(C50); call(C50);
C50: (run one step of a program and record the change in storage)
```

Now, send transakshon giv A. So, for 51 transakshons, wi get kontract wey dey take 2<sup>50</sup> komputashonal steps. Miners fit try detect dis kain logik bombs bifor taim by kipin value alongside ish kontract wey dey show di maximum numba of komputashonal steps wey e fit take, and kalkulate dis one for kontracts wey dey koll oda kontracts ova and ova, but dat one go rikwaya miners to forbid kontracts wey dey kreate oda kontracts (sinse dem fit roll di kreashon and execushon izy of all 26 kontracts above into one kontract). Anoda palava bi sey di address field of messaj na variabol, so generally e fit nor even posibol to sabi wich oda kontracts one kontract go koll bifor taim. So, all in all, we get konklushon wey dey surprising: Turing-kompleteness dey izy to manaj, and di lack of Turing-kompleteness dey difikut to manaj unless di exact same kontrols dey - but for dat kase why wi nor just let di protokol dey Turing-komplete?

### Kurrency And Issuans {#currency-and-issuance}

Di Ethereum netwok get im own built-in kurrensy, ether, wey dey serve two purposes: e dey provide primary liquidity layer to allow for efishient ekshanj bitwin difren types of dijital assets and, di more impotant, e dey provide one metod to dey pay transakshon fees. For conveniens and to stop any future argument (see di kurent mBTC/uBTC/satoshi debate for Bitcoin), dem don already label di denominashons:

- 1: wei
- 10<sup>12</sup>: szabo
- 10<sup>15</sup>: finney
- 10<sup>18</sup>: ether

Make yu take dis one as ekspand vashon of di koncept of "dollars" and "cents" or "BTC" and "satoshi". For di near future, wi dey ekspet sey dem go yus "ether" for ordinary transakshon, "finney" for mikrotransakshons and "szabo" and "wei" for teknika diskushons about fees and protokol implimentashon; di rimaining denominashons fit bikom yusful later and dem nor nid inklude dem for klients nau.

Di issuans model go bi laik dis:

- Dem go riliz Ether for kurensy sale at di price of 1000-2000 ether per BTC, dis na way wey dem wan yus fund di Ethereum organizashon and pay for divelopment wey oda platfoms laik Mastercoin and NXT don yus succeed bifor. Pipol wey buy early go benefit from bigga diskounts. Di BTC wey dem kollet from di sale, dem go yus am komplete to pay salaris and bountis to divelopas and invest into difren for-profit and non-profit projects for di Ethereum and cryptokurensy ekosystem.
- 0.099x di total amount wey dem sell (60102216 ETH) dem go allokate am to di organizashon to kompensate early kontributors and pay ETH-denominated ekspensis bifor di genesis block.
- 0.099x of di total amount wey dem sell dem go keep am as long-term risarve.
- 0.26x of di total amount wey dem sell dem go giv am to miners per year foreva afta dat point.

| Group                            | Wen dem launch | Afta 1 year | Afta 5 years |
| -------------------------------- | -------------- | ----------- | ------------ |
| Kurensy units                    | 1.198X         | 1.458X      | 2.498X       |
| Purchasers                       | Purchasers     | 68.6%       | 40.0%        |
| Risarve wey dem spend bifor sale | 8.26%          | 6.79%       | 3.96%        |
| Risarve wey dem spend afta sale  | 8.26%          | 6.79%       | 3.96%        |
| Miners                           | 0%             | 17.8%       | 52.0%        |

#### Long-Term Supply Growth Rate (percent)

![Inflashon for Ethereum](./ethereum-inflation.png)

_Even doh di way dem dey issue di kurensy dey linear, just laik Bitcoin ova taim di supply growth rate still dey tend to zero._

Di two main shoices for di model above na (1) di existence and size of endowment pool, and (2) di existence of permanently growing linear supply, as opposed to supply wey dey capped laik for Bitcoin. Di rizin for di endowment pool na laik dis. If di endowment pool nor exist, and dem ridus di linear issuans to 0.217x to give di same inflashon rate, den di total quantity of ether go be 16.5% less and so ish unit go bi 19.8% more valuabol. So, for di ekwiilibrium 19.8% more ether dem go buy for di sale, so ish unit go again be exactly as valuabol as bifor. Di organizashon go also den get 1.198x as much BTC, wey we fit konsida to be split into two slices: di original BTC, and di adishonal 0.198x. So, dis situashon di same as di _same tin as_endowment, but wit one impotant difrens: di organizashon dey hold only BTC, so e no get motivashon to suppot di value of di ether unit.

Di pamanent linear supply growth model dey ridus di risk of wetin some pipol see as too much wealth koncentrashon for Bitcoin, and e dey give pipol wey dey live for present and future taims fair shans to akwaya kurensy units, while for di same taim en still dey kip strong insentive to get and hold ether bikos di "supply growth rate" as persentaj still dey tend to zero ova taim. Wi dey also theorize sey bikos koins dey always lost ova taim due to kialessness, death, etc, and wi fit model koin loss as persentaj of di total supply per year, say di total kurensy supply for cirkulashon go in fact eventually stabilize at value wey equal to di annual issuans divided by di loss rate (for eksampol, at loss rate of 1%, wons di supply reach 26X den 0.26X dem go mine and 0.26X dem go luz efri year, dey kreate ekwilibrium).

Make yu note sey for di future, e fit hapun sey Ethereum go switch to proof-of-stake model for sekurity, wey go ridus di issuans rikwayament to bitwin zero and 0.05X per year. In kase sey di Ethereum organizashon luz funding abi for any oda rizin disappia, wi dey leave open "soshial kontract": anybodi get di rite to kreate future kandidate vashon of Ethereum, wit di only kondishon as sey di Kwontity of ether suppose bi at most ekwol to `60102216 * (1.198 + 0.26 * n)` wia `n` na di numba of years afta di genesis block. Kreators dey free to krowd-sell abi make dem assign some abi all of di difrens bitwin di PoS-driven supply ekspanshon and di maximum allowabol supply ekspanshon to pay for divelopment. Kandidate upgrades wey nor komply wit di soshial kontract dem fit dey justifiably fork into vashon wey go komply.

### Mining Kentralizashon {#mining-centralization}

Di Bitcoin mining algorithm dey work by making miners kompute SHA256 on slightly modified vashons of di block header millions of taims ova and ova again, ontil one node kome up wit vashon wey im hash dey less pass di target (dis one kurently dey around 2<sup>192</sup>). But, dis mining algorithm dey vulnerabol to two type of sentralizashon. First, di mining ekosystem don dey dominated by ASICs (aplikashon-spesifik integrated kircuits), komputa chips wey dem disign for, and so thousands of taims more efishient at, di spesifik task of Bitcoin mining. Dis one mean say Bitcoin mining nor longa dey disentralized wella again, e kon dey nid millions of dollars of kapital to participate wella. Sekond, most Bitcoin miners nor dey akshualy paform block validashon lokally; dem dey rely on sentralized mining pool to giv di block headas. Dis palava na im worse pass: as of di taim wey dem write dis, di top three mining pools dey indirectly kontrol 50% of processing pawa for di Bitcoin netwok, aldoh dis one dey ridus by di fact say miners fit switch to oda mining pools if pool abi koalishon attempt 51% attack.

Di kurent plan for Ethereum na to yus mining algorithm wia miners go nid fetch random data from di state, kompute some randomly transakshons wey dem select from di last N blocks for di blockchain, den riturn di hash of di rizut. Dis one get two impotant benefits. First one na, Ethereum kontracts fit get any kind of komputashon, so Ethereum ASIC go bi ASIC for general komputashon - wey mean sey na betta CPU. Sekond, mining rikwaya access to di entaya blockchain, dey forse miners to store di entaya blockchain and dey make dem dey kapabol to dey verify efri transakshon. Dis one dey rimuv di nid for sentralized mining pools; aldoh mining pools fit still sarve di legitimate role of makin di randomness of riwod distribushon level, peer-to-peer pools wit nor sentral kontrol fit also sarve dis funshon wella.

Dem neva test dis model, and e fit get difikultis along di way to dey afoid satain kleva optimizashons wen im dey yus kontract exekushon as mining algorithm. But one tin wey dey intrest for dis algorithm bi sey im dey allow anybodi to "poison di well", e dey do am as im dey bring large numba of kontracts into di blockchain spesifikaly disign to stymie satain ASICs. Di ekonomik insentives exist for ASIC manufacturers to yus dis kain trick take attack ish oda. So, di solushon wey wi dey divelop na ultimately adaptive ekonomik human solushon rada dan one wey dey purely teknical.

### Scalability {#scalability}

One komon worry about Ethereum na di issue of skalability. Laik Bitcoin, Ethereum dey suffer from di flaw sey efri transakshon nid make efri node for di netwok process am. Wit Bitcoin, di size of di kurent blockchain dey rest at about 15 GB, and e dey grow by about 1 MB per hour. If di Bitcoin netwok go process Visa 2000 transakshon per sekond, im go grow by 1 MB per three sekonds (1 GB per hawa, 8 TB per year). Ethereum go suffer similar growth pattan, dis bad pass by di fact sey plenti aplikashons go dey on top of di Ethereum blockchain insted of just kurensy as e bi for Bitcoin, but e betta smoll bikos Ethereum full nodes only nid to store di state insted of di entaya blockchain history.

Di wahala wit blockchain size wey big laik dat na sentralization risk. If di blockchain size inkrease reach, sey, 100 TB, den wetin go fit hapun bi sey na only smoll numba of big biznes go run full nodes, and all di regular users go dey yus lite SPV nodes. For dat kain situashon, possibility dey sey di full nodes fit join togeda and agree to sheat for some way wey go benefit dem (laik shange di block riwod, give demsefs BTC). Lite nodes nor go get way to take detect dis nau-nau. Normal, one honest full node go still exist, and afta few hawas, infomashon about di fraud go spread thru shannels laik Reddit, but at dat point e go don too late: e go bi up to di ordinary users to organize effort to blacklist di blocks, one big and almost impossibol koordinashon palava on similar scale as dat of pulling off successful 51% attack. For di kase of Bitcoin, na di kurrent palava bi dis, but blockchain modifikashon wey [Peter Todd don sujest](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/) wey go ridus dis issue.

For di near term, Ethereum go yus two adishonal strategis take kope wit dis palava. First, bikos of di blockchain-based mining algorithms, efri miner go dey forsed to bi full node, wey dey kreate lower bound on di numba of full nodes. Sekond and more important bi sey, wi go inklude intamediate state tree root for di blockchain afta ish transakshon don process. Even if di block validashon dey sentralized, as long as one honest verifying node exist, dem fit stop di sentralizashon palava thru verifikashon protokol. If miner publish invalid block, dat block suppose dey badly formatted, abi di state `S[n]` dey inkorect. Sinse wi sabi sey `S[0]` di korect, some first state suppose dey `S[i]` wey nor korect wia `S[i-1]` im korect. Di verifying node go provide di index`i`, e go also provide di "proof of invalidity" wey go konsist of di subset of Patricia tree nodes wey nid to process `APPLY(S[i-1],TX[i]) -> S[i]`. Nodes go fit yus dose nodes run dat part of di komputashon, and see sey di `S[i]`wey dem generate nor match di `S[i]` wey dem provide.

Anoda, more sophistikated, attak go involve di bad-bad miners wey dey publish inkomplete blocks, so di full informashon nor go even dey to ditamin weda di blocks dey valid abi dem nor dey valid. Di solushon to dis na shallenj-response protokol: verifikashon nodes go dey issue "challenjis" for di form of target transakshon indices, and upon receiving node lite node go dey treat di block as untrusted ontil anoda node, weda di miner abi anoda verifier, provide subset of Patricia nodes as proof of validity.

## Konclushon {#conclusion}

Di Ethereum protokol dey originally konceive as upgraded vashon of cryptocurrency, wey dey provide advans features such as on-blockchain eskrow, witdrawal limits, finanshal kontracts, gambling markets and di laik via highly generalized programming languaj. Di Ethereum protokol nor go "support" any of di aplikashons direct, but di existens of Turing-komplete programming languaj mean sey dem fit yus theory kreate kontracts for any transakshon type abi aplikashon. Wetin dey very interesting about Ethereum na dat di Ethereum protokol dey muv far far dan just kurensy. Protokols wey dey around disentralized file storaj, disentralized komputashon and disentralized predikshon markets, among dozens of oda such koncepts, get di potenshial to substantially inkrease di efishiensy of di komputashonal industry, and giv big boost to oda peer-to-peer protokols by adding for di first taim di ekonomik layer. Finally, plenti amount of aplikashons dey wey nor get anytin to do wit money at all.

Di koncept of arbitrary state transishon funshon as run by di Ethereum protokol dey provide for platfom wit unik potenshial; rada dan for am to dey klosed-ended, singol-purpose protokol intend for spesifik array of aplikashons for data storaj, gambling abi finans, Ethereum na open-ended by disign, and wi biliv sey e dey suited wella to serve as foundashonal layer for very large numba of both finanshial and non-finanshial protokols for di years to kome.

## Notes and Further Reading {#notes-and-further-reading}

### Notes {#notes}

1. Sophistikated reada fit notis say Bitcoin address na di hash of di elliptik kurve publik key, and nor bi di publik key imsef. Haueva, im dey in act pafectly legitimate cryptographic terminology to refer to di pubkey as one publik key imsef. Dis na bikos wi fit konsida Bitcoin cryptography to bi kustom digital signature algorithm, wia di publik key konsist of di hash of di ECC pubkey, di signature konsist of di ECC pubkey togeda wit di ECC signature, and di verifikashon algorithm dey sheck di ECC pubkey for di signature against di ECC pubkey hash wey dem provide as publik key and den e dey verify di ECC signature wit di ECC pubkey.
2. Teknikaly, di median of di 11 previous blocks.
3. For inside, 2 and "CHARLIE" na both numbas<sup>[fn3](#notes)</sup>, wit di last one being for big-endian base 256 reprisentashon. Numbeas fit dey at smollest 0 and at highest 2<sup>256</sup>-1.

### Further Reading {#further-reading}

1. [Follow kome value](http://bitcoinmagazine.com/8640/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it/)
2. [Smart propaty](https://en.bitcoin.it/wiki/Smart_Property)
3. [Smart contracts](https://en.bitcoin.it/wiki/Contracts)
4. [B-money](http://www.weidai.com/bmoney.txt)
5. [Proofs of works wey dem fit yus again](https://nakamotoinstitute.org/finney/rpow/)
6. [Propaty titols wey sekure wit di owna authority](https://nakamotoinstitute.org/secure-property-titles/)
7. [Di Bitcoin whitepaper](http://bitcoin.org/bitcoin.pdf)
8. [Namecoin](https://namecoin.org/)
9. [Zooko's triangol](https://wikipedia.org/wiki/Zooko's_triangle)
10. [Whitepaper of dem Kolored koins](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)
11. [Di Mastercoin whitepaper](https://github.com/mastercoin-MSC/spec)
12. [Decentralized autonomous korporashons wey dey for Bitcoin Magazine](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)
13. [Payment verifikashon wey dem don make simpol](https://en.bitcoin.it/wiki/Scalability#Simplified_payment_verification)
14. [Merkle trees](https://wikipedia.org/wiki/Merkle_tree)
15. [Patricia trees](https://wikipedia.org/wiki/Patricia_tree)
16. [GHOST](https://eprint.iacr.org/2013/881.pdf)
17. [StorJ and Autonomous Agents, Jeff Garzik](http://garzikrants.blogspot.ca/2013/01/storj-and-bitcoin-autonomous-agents.html)
18. [Wen Mike Hearn dey tok on Smart Propaty for Turing Festival](https://www.youtube.com/watch?v=MVyv4t0OKe4)
19. [Ethereum RLP](https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-RLP)
20. [Ethereum Merkle Patricia trees](https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-Patricia-Tree)
21. [Wen Peter Todd dey tok on Merkle sum trees](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/)

_If yu wan sheck di history of di whitepaper make yu sheck [dis wiki](https://github.com/ethereum/wiki/blob/old-before-deleting-all-files-go-to-wiki-wiki-instead/old-whitepaper-for-historical-reference.md)._

_Ethereum, laik plenti komunity-driven, softwia project wey open sorse, don grow pass wen im first arrive. To learn about di latest divelopment of Ethereum, and hau dem don make shanjis to di protokol, wi rekomend [dis guide](/learn/)._
