---
title: Zero-knowledge prufs
description: Non-teknika introdukshon to zero-knowlej pruf for biginas.
lang: pcm
---

# Wetin be zero-knowlej prufs? {#what-are-zk-proofs}

Zero-knowlej prufs na one way to dey pruf di validity of one statement witout showin di statement imsef. Di 'prova' na di party wey dey try to pruf one point, as di 'verifaya' dey responsibol to dey validate di point.

Zero-knowlej prufs first show face for 1985 paper, "[Di knowlej komplexity of interaktiv pruf systems](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)" wey dey provide one definishon of zero-knowledge prufs wey dem too dey yus tuday:

> Zero-knowlej protokol na one metod by wich one party (di prova) **fit pruf** to anoda party (di verifaya) **sey somtin dey true, witout showin any info** apart from di fact dat dis spesifik statement dey true.

Zero-knowledge prufs don impruf ova di years and dem don yus am for plenti real-world aplikashons.

<YouTube id="fOGdb1CTu5c" />

## Why wi nid zero-knowlej prufs? {#why-zero-knowledge-proofs-are-important}

Zero-knowledge prufs reprisent one success for applied cryptography, as dem don promise to impruf sekurity of infomashon for individuals. Konsida hau yu fit pruf one point (e.g., "I bi citizen of X kountry") to anoda party (e.g., one savis provida). Yu go nid to provide "evidens" to bak up yor point, such as one nashonal passpot abi driver license.

But palava dey wit di metod, wey lack of privacy full am. Dem store Pesinaly Identifiabol Infomashon (PII) wey dem shia wit third-party savis in sentral databases, wey dey vulnerabol to hacks. Wit identity theft wey bikom one kritika issue, plenti means dey for more privacy-protecting means to dey shia sensitiv infomashon.

Zero-knowlej prufs solve dis palava as **dem komot di nid to show infomashon to pruf validity of points**. Zero-knowlej protokol dey yus di statement (wey dem koll 'witness') as input to generate one koret pruf of im validity. Dis pruf dey provide strong asurans sey one statement dey true witout to dey ekspose di infomashon dem yus to dey kreate am.

If wi go back to awa eksampol bifor, di only evidens yu nid to pruf yor citizenship klaim na one zero-knowlej pruf. Di verifaya go only shek if satain propatis of di pruf dey koret to bolif sey di statement na tru one so.

## Yus-kases for zero-knowlej prufs {#use-cases-for-zero-knowledge-proofs}

### Payments wey wi nor sabi {#anonymous-payments}

Kredit kard payments somtaims dey show plenti partis, wey inklude di payments provida, banks, and oda partis wey get intrest (e.g., gofament autoritis). As finanshial surveillans get gud side to sabi aktivity wey nor legit, im also look down on di privacy of ordinary citizens.

Cryptocurrencies suppose provide one means for users to do private, peer-to-peer transakshons. But plenti cryptocurrency transakshons dey show wella for publik blockchains. User identitis dey often bi fake and fit link to real-world identitis (e.g. by inkludin ETH address for Twitter abi GitHub profiles) abi fit join wit real-world identitis as yu dey yus basik on and off-chain data analysis.

Spesifik "privacy coins" dey wey dem disign for transakshons wey wi nor sabi kpatakpata. Blockchains wey fokus on privacy, laik Zcash and Monero, dey kova transakshon ditails, plus senda/risiva address, asset type, kwontity, and di transakshon taimline.

By baking in zero-knowlej teknology to di protokol,  [blockchain](/glossary/#blockchain) netwoks wey fokus on privacy dey allow [nodes](/glossary/#node) to validate transakshons witout di nid to access transakshon data.

**Zero-knowlej prufs also apply to transakshons wey wi nor sabi for publik blockchains**. One eksampol na Tornado Cash, one disentralize, savis wey nor get kustody wey dey allow users to kondut private transakshons on Ethereum. Tornado cash dey use zero-knowlej prufs to komplete transakshons ditails and make sure sey finanshial privacy dey. E bad sey, bikos dis don "kome in" privacy tools dem rilate to bad aktivity. To ovakome dis, privacy don bikom di normal tin for publik blockchains las las.

### Identity protekshon {#identity-protection}

Kurent identity manajment system dey put pesina infomashon to palava. Zero-knowlej prufs fit helep pesin validate identity as im dey protet sensitive ditails.

Zero-knowlej prufs dey yusfulin di kontext of [disentralize identity](/decentralized-identity/). Disentralize identity (wey dem also diskribe as 'sef-sovereign identity') dey give pesin di ability to kontrol access to pesina identifayas. To dey pruf yor citizenship witout to dey riveal yor tax ID abi passport ditails na one gud eksampol of hau zero-knowlej teknology enabol disentralize identity.

### Autentikashon {#authentication}

To dey yus online savis rikwaya to dey pruf yor identity and koret to access doz platfoms. Di often rikwaya to dey provide pesina infomashon, laik names, email address, birth dates, and so on. Yu fit also nid to put long passwod for yor head abi risk to dey luz access.

Zero-knowlej prufs, haueva, fit make autentikashon for both platfoms and users simpol. Wons dem don generate one ZK-pruf yusin publik inputs (e.g., data wey dey attest to di user membaship of di platfom) and private input (e.g., di user ditails), di user fit prisent am to autentikate dem identity wen dem nid to access di savis. Dis dey impruf di ekperiens for users and frees organizashons from di nid to store big amounts of user infomashon.

### Komputashon wey yu fit verify {#verifiable-computation}

Komputashon wey yu fit verify na anoda aplikashon of zero-knowlej teknology to dey impruf blockchain disigns. Komputing wey yu fit verify dey allow us to outsorse komputashon to anoda entity as to dey maintain rizut wey yu fit verify. Di entity dey submit di rizut along wit one pruf to dey yus verify sey dem run di program wella.

Komputashon wey wi fit verify dey **impotant to dey impruf processin speeds for blockchains** witout ridusin sekurity. To dey ondastan di dey rikwaya to sabi di difren inside solushon dem propose to dey yus skale Ethereum.

[On-chain scaling solushon](/developers/docs/scaling/#on-chain-scaling), laik sharding, nid sirios modifikashon of di blockchain base layer. Haueva, dis metod hard wella and dem bi errors for di implimentashon fit ridus Ethereum sekurity model.

[Off-chain skaling solushons](/developers/docs/scaling/#off-chain-scaling) nor dey rilly nid plenti shanjis to di kore Ethereum protokol. Insted dem rely on one komputashon model wey dem outsorse to impruf thruput on Ethereum base layer.

Here na hau dat dey wok in praktis:

- Insted make im dey process efri transakshon, Ethereum dey push im exekushon to one seprate chain.

- Afta dem process transakshon, di oda chain dey riturn di rizut to apply am to Ethereum state.

Di benefit here bi sey Ethereum nor dey do any exekushon and dey only apply wetin im nid to apply rizuts from komputashon wey dem outsorse to im state. Dis dey ridus netwok konjeshon and also dey impruf transakshon speeds (off-chain protokols dey optimize to run am fast).

Di chain nid one way to validate off-chain transakshon witout exekutin dem again, if not di value of off-chain exekushon don lost.

Dis na wia komputashon wey dem verify kome into play. Wen one node dey exekute one transakshon outside Ethereum, im dey submit one zero-knowlej pruf to pruf di off-chain exekushon sey im koret. Dis pruf (wey dem koll [validity pruf](/glossary/#validity-proof)) make sure sey one transakshon dey valid, dey allow Ethereum apply di rizut to im state—witout waitin for anyone to dispute am.

[Zero-knowlej rollups](/developers/docs/scaling/zk-rollups) and [validiums](/developers/docs/scaling/validium/) na two off-chain skaling solushons wey dey yus validity prufs to provide sekure skalability. Dis protokols dey run plenti transakshons off-chain and submit prufs for verifikashon on Ethereum. Yu fit apply doz rizuts kwik kwik wons dem don verify di pruf, dey allow Ethereum to process plenti transakshons witout inkrease komputashon for di base layer.

### To dey ridus bribe and kollushon inside on-chain voting {#secure-blockchain-voting}

Blockchain voting schemes get plenti gud tins: yu fit audit dem fully, dem dey secure against attaks, dem dey resist sensorship, and dem nor get anytin wey fit block dem as per lokashon. But even on-chain voting schemes still dey get **collusion** palava.

As dem difine am as "somtin wey dey koordinate to limit open kompetishon as im dey disiv, difraud, and mislead odas," kollushon fit bi laik bad aktor wey dey affet voting as im dey offer bribes. For eksampol, Alice fit risiv one bribe from Bob to vote for `opshon B` for one ballot even if na `option A` en wan pick.

Bribe and kollushon dey ridus hou well any process wey dey yus voting as signal metod fit bi (espeshialy wia users fit pruf hau dem vote). Dis fit get big palava, espeshially wia di votes dey make dem allokate risorsis wey skarse.

For eksampol, [quadratic funding mechanisms](https://www.radicalxchange.org/concepts/plural-funding/) rely on donashons to meashure wetin im prifa for some opshons among difren publik gud projets. Ish donashon na di same as one "vote" for one spesifik projet, wit projet wey dey risiv plenti votes dey get plenti funds from di matching pool.

To dey dey on-chain voting dey make quadratic funding dey eksposed to kollushon; blockchains dey publik, so pesin wey dey bribe fit sheck hau pesin wey kollet bribe for on-chain aktivity dey "vote". Dis way quadratic funding nor bi ogbonge way to dey allokate funds base on di aggregate komunity dem prifa.

Gud tin bi sey, solushons wey new pass laik MACI (Minimum Anti-Collusion Infrastructure) dey yus zero-knowlej prufs to make on-chain voting (eg., quadratic funding mechanisms) dey resist bribe and kollushon. MACI na one set of smart kontracts and skripts wey dey allow one sentral administrator (wey dem koll "koordinator") to gada vote kon tally rizuts _witout_ showin spesifik on hau ish pesin don vote. Even so, im still dey posibol to verify sey dem don kount di vote wella, abi konfam sey one patikular pesin don patisipate for di voting round.

#### Hau MACI dey wok wit zero-knowlej prufs? {#how-maci-works-with-zk-proofs}

For di start, di koordinator yus di MACI kontract for Ethereum, afta wich users fit sign up for voting (as dem dey regista dem publik key for di smart kontract). Users dey kast votes as dem dey send messaj wey dem encrypt wi dem publik key to di smart kontract (dem suppose sign one valid vote wit di publik key wey risent pass wey join wit di user identity, among oda kriteria). Afta dat, di koordinator dey process al messajis wons di voting piriod don end, tally di votes, and verify di rizut on-chain.

For MACI, dem dey yus zero-knowlej prufs to make sure sey di komputashon dey koret as dem nor make am posibol for di koordinator make en nor process votes and tally rizut well. Dem dey ashieve dis as dem make di koordinator generate ZK-SNARK prufs wey dey konfam sey a) na all di messajis e process koret b) di end rizut dey di same wit di sum of all di votes wey _valid_.

So, even witout sharin one breakdown of vote per user (as im always bi), MACI go make sure sey di rizut wey dey kalkulate durin di tally process gallant well. Dis feashure dey yusful to dey ridus di pawa of basik kollushon schemes. Wi fit test dis way as wi dey yus di eksampol wey wi don yus bifor wey Bob dey bribe Alice to vote for one opshon:

- Alice regista to vote as en dey send dem publik key to one smart kontract.
- Alice agree to vote for `opshon B` kon kollet bribe from Bob.
- Alice vote for `opshon B`.
- Alice send one transakshon wey dem don encrypt for sikrit to shanj di publik key wey link to en identity.
- Alice kon yus new publik key to send anoda messaj (wey dem encrypt) to di smart kontract voting for `opshon A`.
- Alice dey show Bob transakshon wey show sey na `opshon B` en vote for (wey nor dey valid sinse di publik key nor longa dey wit Alice identity for di system)
- As en dey process messajis, di koordinator dey skip Alice vote for `opshon B` and kount only di vote for `opshon A`. So, di attempt wey Bob do to join Alice kon manipulate di on-chain vote don fail.

To dey yus MACI _dey_ rikwaya to trust di koordinator make en nor join hands wit pipol wey dey bribe abi wan bribe voters demsefs. Di koordinator fit decrypt user messajis (necessary to dey kreate di pruf), so dem fit konfam hau ish pesin don vote wella.

But if koordinator kon rimain honest, MACI dey reprisent one pawaful tool to make sure sey on-chain voting dey sekure. Dis dey eksplain why im dey popular among quadratic funding aplikashons (laik [clr.fund](https://clr.fund/#/about/maci)) wey go dey rely on di integrity of ish pesin voting wey dem shuse.

[Make yu learn more about MACI](https://privacy-scaling-explorations.github.io/maci/).

## Hau zero-knowlej prufs dey wok? {#how-do-zero-knowledge-proofs-work}

Zero-knowlej pruf dey allow yu to pruf di truth of one statement witout sharing di statement kontent abi dey show hau yu diskova di truth. To make dis posibol, zero-knowlej protokols dey rely on algorithms wey dey take some data as input and dey riturn 'true' abi 'false' as output.

One zero-knowlej protokol suppose satisfy di followin kriteria:

1. **Kompletnes**: If di input dey valid, di zero-knowlej protokol always riturn 'true'. So, if di statement dey true, and di pesin wey dey pruf and di pesin wey dey konfam am dey truthful, dem fit asept di pruf.

2. **Soundnes**: If di input dey invalid, im nor dey posibol to fool di zero-knowlej protokol to riturn 'true'. So, pesin wey dey pruf nor fit trick pesin wey honest to dey biliv one statement wey nor valid dey valid (eksept wit one tiny margin of probability).

3. **Zero-knowlej**: Di pesin weyd ey vefify nor learn anytin about statement wey pass im validity abi falsity (dem get "zero knowlej" of di statement). Dis rikwayament also dey block pesin wey dey verify to get di orijina input (di statement kontent) from di pruf.

For simpol languaj, zero-knowlej pruf go kontain three tins: **witnes**, **shalenj**, and **response**.

- **Witnes**: Wit one zero-knowlej pruf, di pesin wey dey pruf wan pruf knowlej of some infomashon wey dem hide. Di sikrit infomashon na di "witnes" to di pruf, na en di witnes to di pruf, and di knowlej wey di pesin wey dey pruf wan kreate kweshons wey bi sey na only pesin wey get knowlej of di info fit get ansa. So, pesin wey dey pruf start pruf process as en dey randomly shuse one kweshon, dey kalkulate di ansa, and dey send am to di pesin wey dey verify.

- **Shallenj**: Di pesin wey dey verify am go pick anoda kweshon randomly from di set kon dey ask for di pawa to ansa am.

- **Response**: Di pesin wey dey pruf goasept di kweshon, kalkulate di ansa, kon riturn am to di pesin wey dey verify. Di ansa wey di pesin wey dey pruf give go allow make di pesin wey dey verify sheck if di pesin wey dey pruf get access to di witness. To sure sey di pawa nor bi to dey guess anyhau and dey get di koret ansa by shans, di pesin wey dey verify pick more kweshon to ask. As dem dey ripeat dis interakshon plenti taims, di posibility of di pesin wey dey pruf wey dey fake knowlej of di witnes dey drop wella ontil di pesin wey dey verify don dey satisfy.

Di above dey diskribe di strukshure of one "interactive zero-knowlej pruf". Early zero-knowlej protokols don yus interaktiv pruf, wia to dey verify di validity of one statement rikwaya back-and-forth komunikashon bitwin pesin wey dey pruf and pesin wey dey verify.

Di popular [Ali Baba kave tori](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave) wey Jean-Jacques Quisquater write na gud eksampol wey dey show hau interaktiv pruf dey wok. For di tori, Peggy (di pesin wey dey pruf) wan pruf to Victor (di pesin wey dey verify) sey e sabi di sikrit fraiz to open one magik door witout showin di fraiz.

### Zero-knowlej prufs wey nor nid interakshon {#non-interactive-zero-knowledge-proofs}

As revolushonary, interaktive pruf get yus wey get limit sinse im rikwaya two partis to dey afailabol and interakt again and again. Even if one pesin wey dey verify dey sure of di truth of pesin wey dey pruf, di pruf nor dey afailabol for indipendent verifikashon (dey kompute one new pruf nid new set of messaj bitwin di pesin wey dey pruf and pesin wey dey verify).

To solve dis palava, Manuel Blum, Paul Feldman, and Silvio Micali sujest di first [non-interaktiv zero-knowlej prufs](https://dl.acm.org/doi/10.1145/62212.62222) wia di pawa and di pesin wey verify get one key wey dem shia. Dis dey allow di pawa to show dem knowlej of some infomashon (i.e., witnes) witout providin di infomashon imsef.

Onlaik interaktiv prufs, prufs wey nor dey interaktive nid only one round of komunikashon bitwin patisipants (pesin wey dey pruf and pesin wey dey verify). Di pesin wey dey pruf dey pass di sikrit infomashon to one speshial algorithm to kompute one zer-knowlej pruf. Dem send dis to di pesin wey dey verify, wey dey sheck sey di pesin wey dey pruf sabi di sikrit infomashon yusin anoda algorithm.

Pruf wey nor dey interaktive dey ridus komunikashon bitwin pesin wey dey pruf and pesin wey dey verify, dey make ZK-prufs dey wok wella. Anoda tin bi sey, wons dem don generate one pruf, im dey afailabol for anyone else (wit access to di key wey dem shia and verifikashon algorithm) to verify am.

Pruf wey nor dey interaktive reprisent one breakthru for zero-knowlej teknology and don spur di divelopment of pruf system dem dey yus tuday. Wi diskus dis types of pruf bilow:

### Types of zero-knowlej prufs {#types-of-zero-knowledge-proofs}

#### ZK-SNARKs {#zk-snarks}

ZK-SNARK na short form for **Zero-Knowledge Succinct Non-Interactive Argument of Knowledge**. Di ZK-SNARK protokol get di followin kwolitis:

- **Zero-knowlej**: One pesin wey dey verify fit validate di integrity of one statement as en nor sabi anytin else about di statement. Di only knowlej di pesin wey dey verify get for di statement na weda im true abi false.

- **Succinct**: Di zero-knowlej pruf dey smoll pass di witnes and dem fit confam am kwik-kwik.

- **Non-interaktive**: Di pruf na 'non-interaktive' bikos pesin wey dey pruf and di pesin wey dey verify only interakt wons, onlaik interaktive prufs wey rikwaya plenti rounds of komunikashon.

- **Argument**: Di pruf dey satisfy di 'soundnes' rikwayament, so e dey hard dey sheat.

- **(Of) Knowlej**: Wi nor fit build di zero-knowlej pruf witout access to di sikrit infmashon (witnes). Im dey difikut, if im nor dey posibol, for pesin wey dey pruf wey nor get di witnes to kompute valid zero-knowlej pruf.

Di 'key wey dem shia' wey wi menshon bifor refer to publik paramitas wey pesin wey dey pruf and pesin wey dey verify agree to yus to dey generate and dey verify prufs. To generate di publik paramitas (wey wi sabi togeda as di Komon Refrens String (CRS)) na teknikal palava, bikos e dey very impotant for di sekurity protokol. If di entropy (randomnes) wey dem yus generate di CRS enta hand of pesin wey nor dey honest and dey pruf, dem fit kompute false prufs.

[Multi-party komputashon (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) na one way to dey ridus di risks to dey generate publik paramitas. Plenti partis dey partisipate for [trusted setup ceremony](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), wia ish pesin dey kontribute some random values to generate di CRS. As long as one honest party dey destroy dem porshon of di entropy, di ZK-SNARK protokol dey ritain komputashonal soundnes.

Setups weyd em trust rikwaya make users trust di partisipants for paramita-generashon. Haueva, di divelopment of ZK-STARKs don enabol pruf protokols wey dey wok wit one setup wey dem nor trust.

#### ZK-STARKs {#zk-starks}

ZK-STARK na short form for **Zer-Knowlej Skalabol Transparent Argument of Knowlej**. ZK-STARKs dey di same as ZK-SNARKs, eksept dat dem dey:

- **Skalabol**: ZK-STARK dey fast pass ZK-SNARK wen im wan generate and konfam pruf if di witnes size dey big. Wit STARK prufs, taims wey pesin wey dey pruf and dey verify dey inkrease smoll smoll as di witnes dey grow (pesin wey dey pruf and dey verify SNARK dey inkrease as im witnes size dey inkrease).

- **Transparent**: ZK-STARK dey yus randomnes wey dem fit verify for publik to generate publik paramitas to dey yus pruf and verify insted of one setup wey dem trust. So, dem dey more transparent kompia to ZK-SNARKs.

ZK-STARKs dey produs big pruf pass ZK-SNARKs weu mean sey dem generaly get verifikashon oveheads wey high pass. Haueva, some kases dey (such as to dey pruf large datasets) wia ZK-STARKs fit dey kost-effektiv pass ZK-SNARKs.

## Drawbaks for yusin zero-knowlej prufs {#drawbacks-of-using-zero-knowledge-proofs}

### Hardwia kosts {#hardware-costs}

To dey generate zero-knowlej prufs involve very hard kalkulashons wey dem pafom best on speshializ mashines. As dis mashines dey ekspensive, and regular pesin for dey often get am. Also, aplikashons wey wan yus zero-knowlej teknology suppose konsida kosts of hardwia—wey fit inkrease kosts for end-users.

### Pruf verifikashon kosts {#proof-verification-costs}

To dey verify pruf also dey rikwaya hard komputashon and dey inkrease di kost to dey yus impliment zero-knowlej teknology for aplikashon. Dis kost dey patikular relivant in di way to dey pruf komputashon. For eksampol, ZK-rollups pay ~ 500,000 gas to verify singol ZK-SNARK pruf on Ethereum, wit ZK-STARKs wey rikwaya fees wey high.

### Trust assumpshons {#trust-assumptions}

For ZK-SNARK, dem generate di Komon Refrens String (publik paramitas) wons and dey afailabol for re-yus to partis wey wish to patisipate in di zero-knowlej protokol. Dem don kreate paramitas thru setup ceremony dem trust, wia patisipants assume to bi honest.

But nor way for users to access di honesty of patisipants and users suppose take divelopas for dem wod. ZK-STARKs dey free from trust asumpshon sinse dem don verify di randomnes wey dem yus to dey generate di string for publik. In di meantaim, risearchas dey wok on non-trusted setups for ZK-SNARKs to inkrease di sekurity to dey pruf mekanisims.

### Quantum komputin threats {#quantum-computing-threats}

Na elliptik kurve cryptography ZK-SNARK dey yus for dem encryption. As di elliptik kurve diskrete logarithm palava asume to bi intraktabol for nau, di divelopment of quantum komputas fit break dis sekurity model for di fushure.

Dem don konsida sey quantum komputin nor fit affect ZK-STARK, as im only rely on kollishon-resistant hash finshon for im sekurity. Onlaik publik-private key pairings wey dem yus in elliptik kurve cryptography, kollishon-resistant hashin dey more difikut for quantum komputin algorithms to break.

## Further reading {#further-reading}

- [Ovaview of yus kase for zero-knowlej prufs](https://pse.dev/projects) — _Privacy and Skaling Explorashon Team_
- [SNARKs vs. STARKS vs. Recursive SNARKs](https://www.alchemy.com/overviews/snarks-vs-starks) — _Alchemy Ovaviews_
- [A Zero-Knowlej Pruf: As dem dey take Impruf Privacy for Blockchain](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) — _Dmitry Lavrenov_
- [zk-SNARKs — Real Life Zero-Knowlej Eksampol and Deep Dive](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) — _Adam Luciano_
- [ZK-STARKs — Kreate Trust Wey Dem Fit Verify, even against di Quantum Komputas](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) — _Adam Luciano_
- [One approximate introdukshon to hau zk-SNARKs dey posibol](https://vitalik.eth.limo/general/2021/01/26/snarks.html) — _Vitalik Buterin_
- [Why Zero Knowlej Prufs (ZKPs) na Game Shanja for Sef-Sovereign Identity](https://frankiefab.hashnode.dev/why-zero-knowledge-proofs-zkps-is-a-game-changer-for-self-sovereign-identity) — _Franklin Ohaegbulam_

