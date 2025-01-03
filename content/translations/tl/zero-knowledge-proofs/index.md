---
title: Mga zero-knowledge proof
description: Isang hindi teknikal na panimula sa mga zero-knowledge proof para sa mga baguhan.
lang: tl
---

# Ano ang mga zero-knowledge proof? {#what-are-zk-proofs}

Ang zero-knowledge proof ay isang paraan para patunayan ang validity ng isang pahayag nang hindi ipinapakita ang mismong pahayag. Ang ‘prover’ ang partidong sumusubok na patunayan ang isang pahayag, samantalang ang ‘verifier’ ang responsable sa pag-validate ng claim.

Ang mga zero-knowledge proof ay unang lumitaw sa isang artikulo noong 1985 na, “[ "Ang knowledge complexity ng mga interactive proof system](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)” na nagbibigay ng pagpapakahulugan ng mga zero-knowledge proof na malawakang ginagamit ngayon:

> Ang zero-knowledge na protokol ay isang pamamaraan kung saan ang isang tao (ang prover) **ay maaring magpatunay**sa isa pang tao (ang verifier) **na isang bagay ay totoo, nang hindi inilalantad ang anumang impormasyon** maliban sa katotohanan na ang partikular na pahayag na ito ay totoo.

Ang mga zero-knowledge proof ay humusay sa paglipas ng mga taon at ginagamit na ngayon sa ilang sitwasyon sa totoong buhay.

<YouTube id="fOGdb1CTu5c" />

## Bakit natin kailangan ang mga zero-knowledge proof? {#why-zero-knowledge-proofs-are-important}

Iitinuring na pagsulong sa applied cryptography ang mga zero-knowledge proof, dahil ipinangako ng mga itong paigtingin ang seguridad ng impormasyon para sa mga indibidwal. Isipin kung paano mo mapapatunayan ang isang pahayag (hal., "Ako ay mamamayan ng bansang X") sa ibang partido (hal., isang service provider). Kakailanganin mong magbigay ng “patunay” upang suportahan ang iyong pahayag, tulad ng pambansang passport o lisensya sa pagmamaneho.

Ngunit may mga problema sa paraang ito, lalo na pagdating sa kakulangan sa privacy. Ang Personal Identifiable Information (PII) na ibinabahagi sa mga third-party na serbisyo ay iniimbak sa mga central database, na maaaring maging biktima ng mga hack. Dahil nagiging kritikal na isyu ang pagnanakaw ng pagkakakilanlan, may mga panawagan para sa mas maraming paraan ng pagprotekta sa privacy kapag ibinabahagi ang sensitibong impormasyon.

Nilulutas ng mga zero-knowledge na patunay ang problemang ito sa pamamagitan **ng pag-aalis ng pangangailangang maglantad ng impormasyon upang patunayan ang pagiging may bisa ng mga pahayag**. Ginagamit ng zero-knowledge na protokol ang pahayag (tinatawag na ‘witness’) bilang input upang gumawa ng maikling patunay ng pagiging may bisa nito. Lubusang iginagarantiya ng patunay na ito na totoo ang pahayag nang hindi ibinubunyag ang impormasyong ginamit para gawin ito.

Kapag binalikan natin ang nauna nating halimabawa, ang tanging ebidensyang kailangan mo upang patunayan ang iyong pahayag ng pagkamamamayan ay isang zero-knowledge na patunay. Kailangan lang tingnan ng verifier kung totoo ang ilang partikular na katangian ng patunay para makumbinsing totoo rin ang pangunahing pahayag.

## Mga kasong nagamit para sa mga zero-knowledge na patunay {#use-cases-for-zero-knowledge-proofs}

### Mga anonymous na pagbabayad {#anonymous-payments}

Kadalasan, nakikita ng maraming partido ang mga pagbabayad gamit ang credit card, kasama na ang payments provider, mga bangko, at iba pang interesadong partido (hal., mga awtoridad ng pamahalaan). Bagama't makakatulong ang financial surveillance sa pagtukoy ng ilegal na aktibidad, inilalagay din nito sa panganib ang privacy ng mga ordinaryong mamamayan.

Ang mga cryptocurrency ay ginawa para magbigay ng paraan para makapagsagawa ang mga user ng mga pribado at peer-to-peer na transaksyon. Ngunit hayagang nakikita sa mga pampublikong blockchain ang karamihan sa mga transaksyon ng cryptocurrency. Ang mga pagkakakilanlan ng user ay madalas na gumagamit ng mga pseudonym at sadyang naka-link ang mga ito sa mga tunay na pagkakakilanlan (hal., sa pamamagitan ng paglalagay ng mga ETH address sa Twitter o Github profile) o maiuugnay sa mga tunay na pagkakakilanlan gamit ang basic na pagsusuri sa on at off-chain data.

May partikular na “mga privacy coin” na idinisenyo para maging ganap na anonymous ang mga transaksyon. Itinatago ng mga blockchains na nakatuon sa privacy, tulad ng Zcash at Monero, ang mga detalye ng transaksyon, kabilang ang mga address ng sender/receiver, uri ng asset, dami, at ang timeline ng transaksyon.

Sa pamamagitan ng paglalagay ng zero-knowledge technology sa protokol, nakatuon sa privacy na [blockchain](/glossary/#blockchain) na network ay pinapayagan [ang mga node](/glossary/#node) na mag-validate ng mga transaksyon nang hindi kinakailangang ma-access ang data ng transaksyon.

**Ang mga zero-knowledge na patunay ay ginagamit din sa mga pagaalis ng pagkakakilanlan na transaksyon sa mga pampublikong blockchain**. Halimbawa nito ang Tornado Cash, na isang decentralized at non-custodial na serbisyong nagbibigay-daan sa mga user na magsagawa ng mga pribadong transaksyon sa Ethereum. Ang Tornado Cash ay gumagamit ng mga zero-knowledge proof upang i-obfuscate ang mga detalye ng transaksyon at tiyakin ang financial privacy. Sa kasamaang-palad, iniuugnay ang mga ito sa ilegal na aktibidad dahil mga "opt-in" na privacy tool ang mga ito. Upang malabanan ito, dapat maging default ang privacy sa mga pampublikong blockchain.

### Proteksyon ng pagkakakilanlan {#identity-protection}

Inilalagay ng mga kasalukuyang identity management system ang personal na impormasyon sa panganib. Ang mga zero-knowledge proof ay makakatulong sa mga indibidwal na mag-validate ng pagkakakilanlan habang pinoprotektahan ang mga sensitibong detalye.

Ang mga zero-knowledge proof ay partikular na kapaki-pakinabang sa konteksto ng [decentralized identity](/decentralized-identity/). Binibigyan ng decentralized identity (na tinatawag din na 'self-sovereign identity') ang indibidwal ng kakayahang kontrolin ang access sa mga personal identifier. Ang pagpapatunay ng iyong pagkamamamayan nang hindi ipinapakita ang detalye ng iyong tax ID o pasaporte ay magandang halimbawa ng kung paano binibigyang-daan ng zero-knowledge technology ang decentralized identity.

### Pag-authenticate {#authentication}

Kapag gumagamit ng mga online na serbisyo, kailangan mong patunayan ang iyong pagkakakilanlan at karapatang i-access ang mga platform na iyon. Kadalasan, kailangan mong magbigay ng personal na impormasyon, tulad ng mga pangalan, email address, petsa ng kapanganakan, at iba pa. Maaaring kailanganin mo ring tandaan ang mahahabang password para hindi mawalan ng access.

Gayunpaman, mapapasimple ng mga zero-knowledge proof ang pag-authenticate para sa mga platform at user. Kapag gumawa ng ZK-proof gamit ang mga pampublikong input (hal., data na nagpapatunay sa pagiging miyembro ng user sa plataporma) at mga pribadong input (hal., mga detalye ng user), puwedeng ipakita na lang ito ng user para i-authenticate ang kanyang pagkakakilanlan kapag kailangan nilang i-access ang serbisyo. Pinapaganda nito ang karanasan para sa mga user at dahil dito, hindi na kailangan ng mga organisasyon na mag-store ng napakaraming impormasyon ng user.

### Nave-verify na computation {#verifiable-computation}

Ang nave-verify na computation ay isa pang paggamit ng zero-knowledge technology para sa pagpapaganda ng mga disenyo ng blockchain. Binibigyang-daan tayo ng nave-verify na computing na ipaubaya ang computation sa ibang entity habang pinapanatiling nave-verify ang mga resulta. Isinisumite ng entity ang resulta kasama ng patunay na nagve-verify na isinagawa nang tama ang programa.

Ang verifiable na pagkukuwenta ay **mahalaga sa pagpapabilis ng pagpoproseso sa mga blockchain** nang hindi binabawasan ang seguridad. Para maunawaan ito, kailangang malaman ang mga pagkakaiba sa mga iminumungkahiing solution para sa pag-scale ng Ethereum.

Sa [mga on-chain scaling solution](/developers/docs/scaling/#on-chain-scaling), gaya ng sharding, kailangang baguhin nang husto ang base layer ng blockchain. Gayunpaman, napakakumplikado ng paraang ito at maaaring makaapekto sa security model ng Ethereum ang mga pagkakamali sa pagpapatupad.

Sa [mga off-chain scaling solution](/developers/docs/scaling/#off-chain-scaling), hindi kailangang ibahin ang disenyo ng core protocol ng Ethereum. Sa halip, umaasa ang mga ito sa isang outsourced computation model upang mapabuti ang throughput sa base layer ng Ethereum.

Ganito ito gumagana sa totoong buhay:

- Sa halip na i-proseso ang bawat transaksyon, inililipat ng Ethereum ang pag-execute sa isang hiwalay na chain.

- Pagkatapos i-proseso ang mga transaksyon, ibinabalik ng kabilang chain ang mga resulta para mailapat sa state ng Ethereum.

Ang kagandahan nito, walang pag-execute na kailangang gawin ang Ethereum at kailangan lang nitong ilapat ang mga resulta mula sa in-outsource na computation sa state nito. Iniiwasan nitong magkaroon ng congestion sa network at pinapabilis din nito ang mga transaksyon (ang mga off-chain protocol ay nag-o-optimize para sa mas mabilis na pag-execute).

Ang chain ay nangangailangan ng paraan para mag-validate ng mga off-chain na transaksyon nang hindi ine-execute ulit ang mga ito, kung hindi ay mawawala ang halaga ng off-chain execution.

Dito papasok ang nave-verify na computation. Kapag nag-execute ang isang node ng transaksyon sa labas ng Ethereum, nagsusumite ito ng zero-knowledge proof upang patunayang tama ang off-chain execution. Iginagarantiya ng patunay na ito (tinatawag na [validity proof](/glossary/#validity-proof)) na valid ang isang transaksyon, kaya mailalapat ng Ethereum ang resulta sa state nito—nang hindi naghihintay na may mag-dispute nito.

Ang [mga zero-knowledge rollup](/developers/docs/scaling/zk-rollups) at [validium](/developers/docs/scaling/validium/) ay dalawang off-chain scaling solution na gumagamit ng mga validity proof upang magbigay ng secure na scalability. Ang mga protocol na ito ay nag-e-execute ng libo-libong transaksyon off-chain at nagsusumite ng mga patunay para ma-verify sa Ethereum. Maaaring ilapat kaagad ang mga resultang iyon kapag na-verify na ang patunay, kaya makakapagproseso ang Ethereum ng mas maraming transaksyon nang hindi dinadagdagan ang computation sa base layer.

### Pagpigil sa panunuhol at pagsasabwatan sa on-chain voting {#secure-blockchain-voting}

Maraming magagandang katangian ang mga blockchain voting scheme: ganap na mao-audit, secure laban sa mga atake, matibay laban sa censorship, at walang heograpikal na limitasyon ang mga ito. Pero may nangyayari pa ring **pagsasabwatan** sa mga on-chain voting scheme.

Ang pagsasabwatan, na tinutukoy bilang “pag-uusap upang limitahan ang bukas na kompetisyon sa pamamagitan ng panlilinlang, pandaraya, at panloloko ng iba,” ay maaaring mapansin sa isang mapanlinlang na actor na nakakaapekto sa botohan sa pamamagitan ng pag-aalok ng suhol. Halimbawa, maaaring makatanggap si Alice ng suhol mula kay Bob upang iboto ang `opsyon B` sa isang balota kahit na mas gusto niya ang `opsyon A`.

Nililimitahan ng panunuhol at pagsasabwatan ang pagiging epektibo ng anumang prosesong gumagamit ng botohan bilang signaling mechanism (lalo na kung maipapakita ng mga user kung paano sila bumoto). Maaari itong magkaroon ng matitinding epekto, lalo na kung ang mga boto ay para sa paglalaan ng mga limitadong resource.

Halimbawa, ang [mga quadratic funding mechanism](https://www.radicalxchange.org/concepts/plural-funding/) ay umaasa sa mga donasyon upang sukatin ang pinipili sa ilang partikular na opsyon sa iba't ibang public goods project. Ang bawat donasyon ay ibinibilang bilang isang "boto" para sa isang partikular na proyekto, at ang mga proyektong makakatanggap ng mas maraming boto ay makakakuha ng mas maraming pondo mula sa matching pool.

Sa paggamit ng on-chain voting, madaling magsabwatan sa quadratic funding: pampubliko ang mga blockchain transaction, kaya matitingnan ng mga nanunuhol ang on-chain activity ng sinusuhulan para alamin kung paano sila “bumoto”. Sa ganitong paraan, hindi nagiging epektibong paraan ang quadratic funding para sa pag-allocate ng mga pondo batay sa pinagsama-samang kagustuhan ng komunidad.

Sa kabutihang-palad, ang mga mas bagong solution tulad ng MACI (Minimum Anti-Collusion Infrastructure) ay gumagamit ng mga zero-knowledge proof upang gawing matibay laban sa panunuhol at pagsasabwatan ang on-chain voting (hal., mga quadratic funding mechanism). Ang MACI ay isang hanay ng mga smart contract at mga script na nagpapahintulot sa isang central administrator (tinatawag na "coordinator") na pagsama-samahin ang mga boto at itala ang mga resulta nang _hindi_ inilalantad ang mga detalye sa pagboto ng bawat indibidwal. Kahit ganito, maaari pa ring i-verify na wasto ang pagbibilang ng mga boto, o kumpirmahing bumoto ang isang partikular na indibidwal sa botohan.

#### Paano gumagana ang MACI kasama ng mga zero-knowledge proof? {#how-maci-works-with-zk-proofs}

Sa simula, dine-deploy ng coordinator ang MACI contract sa Ethereum, at pagkatapos nito, makakapag-sign up ang mga user upang makaboto (sa pamamagitan ng pagrerehistro ng kanilang pampublikong key sa smart contract). Bumoboto ang mga user sa pamamagitan ng pagpapadala ng mensaheng na-encrypt ng kanilang pampublikong key sa smart contract (dapat na-sign ang valid na boto ng pinakabagong pampublikong key na nauugnay sa identity ng user, at may iba pang pamantayan). Pagkatapos nito, ipinoproseso ng coordinator ang lahat ng mensahe kapag natapos na ang panahon ng pagboto, itinatala niya ang mga boto, at vine-verify niya ang mga resulta on-chain.

Sa MACI, ginagamit ang mga zero-knowledge proof para tiyaking tama ang computation, kaya hindi magagawa ng coordinator na magkamali sa pagpoproseso ng mga boto at pagtatala ng mga resulta. Naisasagawa ito sa pamamagitan ng paghiling sa coordinator na mag-generate ng mga ZK-SNARK proof na nagve-verify na a) naiproseso nang tama ang lahat ng mensahe b) naaayon ang pinal na resulta sa kabuuang bilang ng lahat ng _valid_ na boto.

Kung gayon, kahit walang ibinabahaging breakdwon ng mga boto kada user (na karaniwang nangyayari), iginagarantiya ng MACI ang integridad ng mga resultang kinalkula habang itinatala ang mga ito. Ang feature na ito ay nakakatulong para hindi maging epektibo ang mga basic scheme ng pagsasabwatan. Maaari natin itong suriin sa pamamagitan ng paggamit ng naunang halimbawa tungkol sa panunuhol ni Bob kay Alice para iboto ang partikular na opsyon:

- Si Alice ay nagparehistro para bumoto sa pamamagitan ng pagpapadala ng kanyang pampublikong key sa isang smart contract.
- Si Alice ay pumayag na iboto ang `opsyon B` kapalit ng suhol mula kay Bob.
- Ibinoto ni Alice ang `opsyon B`.
- Palihim na nagpadala si Alice ng encrypted na transaksyon para palitan ang pampublikong key na nauugnay sa identity niya.
- Nagpadala si Alice ng isa pang (encrypted) na mensahe sa smart contract na bumoboto sa `opsyon A` gamit ang bagong pampublikong key.
- Ipinakita ni Alice kay Bob ang transaksyon kung saan `opsyon B` ang ibinoto niya (na hindi valid dahil hindi na nauugnay ang pampublikong key sa identity ni Alice sa system)
- Habang ipinoproseso ang mga mensahe, nilaktawan ng coordinator ang boto ni Alice para sa `opsyon B` at ang boto para sa `opsyon A` lang ang ibinilang niya. Samakatuwid, hindi matagumpay ang pagtatangka ni Bob na makipagsabwatan kay Alice at manipulahin ang on-chain vote.

Sa paggamit ng MACI, _talagang_ kailangang magtiwala na hindi makikipagsabwatan sa mga manunuhol ang coordinator o hindi niya susubukang suhulan ang mga botante. Maaaring i-decrypt ng coordinator ang mga mensahe ng user (kinakailangan para sa paggawa ng proof), kaya tumpak niyang mave-verify kung paano bumoto ang bawat tao.

Ngunit kung mananatiling matapat ang coordinator, ang MACI ay isang mahusay na tool para sa pagtitiyak ng kalinisan ng on-chain na pagboto. Ito ang dahilan sa likod ng kasikatan nito sa mga quadratic funding application (hal., [clr.fund](https://clr.fund/#/about/maci)) na umaasa nang husto sa integridad ng pagboto ng bawat indibidwal.

[Magbasa pa tungkol sa MACI](https://privacy-scaling-explorations.github.io/maci/).

## Paano gumagana ang mga zero-knowledge proof? {#how-do-zero-knowledge-proofs-work}

Sa tulong ng zero-knowledge proof, mapapatunayan mo ang katotohanan ng isang statement nang hindi ibinabahagi ang nilalaman ng statement o ibinubunyag kung paano mo natuklasan ang katotohanan. Upang gawin itong posible, umaasa ang mga zero-knowledge protocol sa mga algorithm na kumukuha ng ilang data bilang input at nagbabalik ng ‘true’ o ‘false’ bilang output.

Dapat matugunan ng isang zero-knowledge protocol ang sumusunod na pamantayan:

1. **Pagiging kumpleto**: Kung valid ang input, palaging ‘true’ ang ibabalik ng zero-knowledge protocol. Kaya, kung totoo ang pangunahing pahayag, at matapat na kikilos ang prover at verifier, maaaring tanggapin ang patunay.

2. **Katumpakan**: Kung hindi valid ang input, imposibleng malinlang ang zero-knowledge protocol na ‘true’ ang ibalik. Kaya, hindi mapapaniwala ng isang nagsisinungaling na prover ang isang matapat na verifier na valid ang hindi valid na statement (maliban na lang sa napakaliit na posibilidad).

3. **Zero-knowledge**: Wala nang ibang malalaman ang verifier tungkol sa isang statement bukod sa pagiging valid o false nito (“zero knowledge” sila sa statement). Mapipigilan din ng kahingiang ito na i-derive ng verifier mula sa orihinal na input (ang nilalaman ng statement) mula sa patunay.

Sa basic na anyo, ang isang zero-knowledge proof ay binubuo ng tatlong element: **witness**, **hamon**, at **tugon**.

- **Witness**: Sa isang zero-knowledge proof, nais ng prover na patunayan ang kaalaman sa ilang nakatagong impormasyon. Ang lihim na impormasyon ang “witness” sa patunay, at ipinagpapalagay na kaalaman ng prover tungkol sa witness ay gumagawa ng isang hanay ng mga tanong na masasagot lang ng partidong nakakaalam ng impormasyon. Kung kaya, sinisimulan ng prover ang proseso ng pagpapatunay sa pamamagitan ng random na pagpili ng isang tanong, pagkalkula sa sagot, at pagpapadala nito sa verifier.

- **Hamon**: Random na pipili ang verifier ng isa pang tanong mula sa hanay at hihilingin nito sa prover na sagutin ito.

- **Tugon**: Tatanggapin ng prover ang tanong, kakalkulahin ang sagot, at ibabalik ito sa verifier. Ang tugon ng prover ay nagbibigay-daan sa verifier na alamin kung talagang may access ang prover sa witness. Upang tiyaking nanghuhula at sinusuwerte sa pamimili ng tamang sagot ang prover, pipili pa ng mga itatanong ang verifier. Sa pamamagitan ng pagpapaulit-ulit ng interaction na ito nang maraming beses, lumiliit ang posibilidad na pinepeke lang ng prover ang kaalaman niya tungkol sa witness hanggang sa masiyahan ang verifier.

Inilalarawan sa itaas ang structure ng ‘interactive na zero-knowledge proof’. Gumamit ng interactive na pagpapatunay sa mga unang zero-knowledge protocol, kung saan nakikipag-ugnayan sa isa't isa ang mga prover at verifier para i-verify ang pagiging valid ng statement.

Isang magandang halimbawa na nagpapakita kung paano gumagana ang mga interactive na proof ay ang sikat na [kuwento ni Ali Baba sa kuweba](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave) na gawa ni Jean-Jacques Quisquater. Sa kuwento, gustong patunayan ni Peggy (ang prover) kay Victor (ang verifier) na alam niya ang secret phrase upang buksan ang mahiwagang pinto nang hindi ito sinasabi.

### Mga hindi interactive na zero-knowledge proof {#non-interactive-zero-knowledge-proofs}

Bagama't makabago, hindi palaging magagamit ang interactive na pagpapatunay dahil kailangang available at nag-i-interact nang paulit-ulit ang dalawang partido. Kahit na kumbinsido ang verifier sa katapatan ng prover, hindi magagamit para sa independent verification ang patunay (sa pag-compute ng bagong patunay, kailangan ng bagong set ng mga mensahe sa pagitan ng prover at verifier).

Upang malutas ang problemang ito, iminungkahi nina Manuel Blum, Paul Feldman, at Silvio Micali ang unang [mga hindi interactive na zero-knowledge proof](https://dl.acm.org/doi/10.1145/62212.62222) kung saan may shared key ang prover at verifier. Binibigyang-daan nito ang prover na ipakita ang kanyang kaalaman sa ilang impormasyon (ibig sabihin, witness) nang hindi ibinibigay ang mismong impormasyon.

Hindi tulad ng mga interactive na proof, isang round lang ng komunikasyon sa pagitan ng mga kalahok (prover at verifier) ang kailangan sa mga hindi interactive na proof. Ipinapasa ng prover ang lihim na impormasyon sa isang espesyal na algoritjm para mag-compute ng zero-knowledge proof. Ipinapadala ang patunay na ito sa verifier, na susuri kung alam ng prover ang lihim na impormasyon gamit ang ibang algorithm.

Sa hindi interactive na proofing, nababawasan ang komunikasyon sa pagitan ng prover at verifier, kaya nagiging mas epektibo ang mga ZK-proof. Bukod pa rito, kapag nagawa na ang isang proof, mave-verify ito ng kahit sino (na may access sa shared key at verification algorithm).

Itinuring na pagsulong sa zero-knowledge technology ang mga hindi interactive na proof at pinasigla nito ang pag-develop ng mga proving system na ginagamit ngayon. Pag-uusapan natin ang mga uri na ito ng proof sa ibaba:

### Mga uri ng mga zero-knowledge proof {#types-of-zero-knowledge-proofs}

#### ZK-SNARKs {#zk-snarks}

Ang ZK-SNARK ay isang acronym para sa **Zero-Knowledge Succinct Non-Interactive Argument of Knowledge**. Ang protocol ng ZK-SNARK ay may mga sumusunod na katangian:

- **Zero-knowledge**: Puwedeng i-validate ng verifier ang integridad ng statement nang hindi inaalam ang anupamang detalye tungkol sa statement. Ang alam lang ng verifier tungkol sa statement ay kung totoo ito o hindi.

- **Succinct**: Ang zero-knowledge proof ay mas maliit kaysa sa witness at mabilis na mave-verify.

- **Hindi interactive**: ‘Hindi interactive’ ang proof dahil minsanan lang mag-i-interact ang prover at verifier, hindi tulad ng mga interactive proof na nangangailangan ng maraming round ng komunikasyon.

- **Argument**: Natutugunan ng proof ang kahingiang ‘katumpakan’, kaya napakaliit ng posibilidad na magkaroon ng pandaraya.

- **(Of) Knowledge**: Ang zero-knowledge proof ay hindi magagawa nang walang access sa lihim na impormasyon (witness). Mahirap, kung hindi man imposible, para sa isang prover na hindi hawak ang witness na mag-compute ng valid na zero-knowledge proof.

Ang ‘shared key’ na nabanggit kanina ay tumutukoy sa mga pampublikong parameter na napagkasunduan ng prover at verifier na gamitin sa pag-generate at pag-verify ng mga proof. Ang pag-generate ng mga pampublikong parameter (sama-samang tinatawag bilang Common Reference String (CRS)) ay isang sensitibong operasyon dahil sa kahalagahan nito sa seguridad ng protocol. Kung ang entropy (randomness) na ginamit sa pag-generate ng CRS ay mapupunta sa mga kamay ng isang hindi matapat na prover, puwede siyang mag-compute ng mga pekeng proof.

Ang [Multi-party computation (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) ay isang paraan para mabawasan ang mga panganib sa pag-generate ng mga pampublikong parameter. Maraming partido ang nakikiisa sa isang [trusted setup ceremony](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), kung saan nagko-contribute ang bawat tao ng mga random value para mag-generate ng CRS. Basta't sisirain ng isang matapat na partido ang bahagi nito ng entropy, mananatili ang computational soundness ng ZK-SNARK protocol.

Sa mga trusted setup, hinihiling sa mga user na pagkatiwalaan ang mga kalahok sa pag-generate ng parameter. Gayunpaman, noong na-develop ang ZK-STARKs, nagkaroon na ng mga protocol sa pagpapatunay na gumagana sa non-trusted setup.

#### ZK-STARKs {#zk-starks}

Ang ZK-STARK ay isang acronym para sa **Zero-Knowledge Scalable Transparent Argument of Knowledge**. Ang ZK-STARKs ay katulad ng ZK-SNARKs, pero ang mga ito ay:

- **Scalable**: Ang ZK-STARK ay mas mabilis kaysa sa ZK-SNARK sa pag-generate at pag-verify ng mga proof kapag mas malaki ang witness. Sa mga STARK proof, medyo tumatagal lang ang paggawa ng proof at pag-verify habang lumalaki ang witness (tumatagal ang paggawa ng proof at pag-verify habang lumalaki ang witness).

- **Transparent**: Ang ZK-STARK ay umaasa sa publicly verifiable randomness upang mag-generate ng mga pampublikong parameter para sa pagpapatunay at pag-verify sa halip na isang trusted setup. Kung kaya, mas transparent ang mga ito kumpara sa ZK-SNARK.

Ang mga ZK-STARK ay nagpo-produce ng mas malalaking proof kaysa sa mga ZK-SNARK, ibig sabihin, karaniwang mas malalaki ang overhead ng mga ito para sa pag-verify. Gayunpaman, may mga pagkakataon (tulad ng pagpapatunay ng malalaking dataset) kung saan mas makakatipid sa mga ZK-STARK kaysa sa mga ZK-SNARK.

## Mga problema sa paggamit ng mga zero-knowledge proof {#drawbacks-of-using-zero-knowledge-proofs}

### Gastos sa hardware {#hardware-costs}

Kapag gumagawa ng mga zero-knowledge proof, kailangan ng mga napakakumplikadong kalkulasyon na pinakamainam na isinasagawa sa mga specialized machine. Dahil mahal ang mga machine na ito, madalas na hindi ito kayang bilhin ng mga regular na indibidwal. Dagdag pa rito, dapat isaalang-alang ng mga application na gustong gumamit ng zero-knowledge technology ang mga gastos sa hardware—na maaaring magpalaki ng gastusin ng mga end user.

### Gastos sa pag-verify sa proof {#proof-verification-costs}

Ang pag-verify ng mga proof ay nangangailangan din ng kumplikadong computation at nagpapalaki ng gastos sa pagpapatupad ng zero-knowledge technology sa mga application. Ang gastos na ito ay partikular na may kaugnayan sa pagpapatunay ng computation. Halimbawa, ang mga ZK-rollup ay nagbabayad ng ~ 500,000 gas para sa pag-verify ng iisang ZK-SNARK proof sa Ethereum, at mas mahal pang bayarin ang kailangan para sa ZK-STARKs.

### Mga trust assumption {#trust-assumptions}

Sa ZK-SNARK, ang Common Reference String (mga pampublikong parameter) ay ginagawa nang isang beses at maaaring gamitin ulit ng mga partidong nais sumali sa zero-knowledge protocol. Ang mga pampublikong parameter ay ginagawa sa pamamagitan ng isang trusted setup ceremony, kung saan inaasahang magiging matapat ang mga kalahok.

Subalit wala talagang paraan para masukat ng mga user ang katapatan ng mga kalahok at kailangang pagkatiwalaan ng mga user ang sinasabi ng mga developer. Walang trust assumption ang ZK-STARKs dahil hayagang mave-verify ang randomness na ginamit sa paggawa sa string. Samantala, pinagsusumikapan ng mga mananaliksik ang mga non-trusted setup para sa mga ZK-SNARK upang mapaigting ang seguridad ng ng mga mekanismo ng pagpapatunay.

### Mga panganib ng quantum computing {#quantum-computing-threats}

Ang ZK-SNARK ay gumagamit ng elliptic curve cryptography para sa encryption. Bagamat ang elliptic curve discrete logarithm problem ay itinuturing na mahirap lutasin sa ngayon, ang pag-usbong ng mga quantum computer ay maaaring magbago ng security model na ito sa hinaharap.

Ang ZK-STARK ay itinuturing na immune sa banta ng quantum computing, dahil umaasa lamang ito sa collision-resistant hash functions para sa seguridad nito. Kumpara sa mga pares ng pampublikong key at pribadong key na ginagamit sa elliptic curve cryptography, mas mahihirapan ang mga quantum computing algorithm na pasukin ang collision-resistant hashing.

## Karagdagang pagbabasa {#further-reading}

- [Pangkalahatang-ideya ng mga use case para sa mga zero-knowledge proof](https://pse.dev/projects) — _Privacy and Scaling Explorations Team_
- [SNARKs vs. STARKS vs. Recursive SNARKs](https://www.alchemy.com/overviews/snarks-vs-starks) — _Mga Pangkalahatang-ideya ng Alchemy_
- [Isang Zero-Knowledge Proof: Pagpapahusay ng Privacy sa Blockchain](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) — _Dmitry Lavrenov_
- [zk-SNARKs — Isang Makatotohanang Halimbawa at Malalimang Pagsusuri ng Zero-Knowledge](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) — _Adam Luciano_
- [ZK-STARK — Gumawa ng Nave-verify na Trust, kahit laban sa mga Quantum Computer](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) — _Adam Luciano_
- [Isang panimula sa pagiging posible ng zk-SNARKs](https://vitalik.eth.limo/general/2021/01/26/snarks.html) — _Vitalik Buterin_
- [Bakit ang Zero Knowledge Proofs (ZKPs) ay Game Changer para sa Self-Sovereign Identity](https://frankiefab.hashnode.dev/why-zero-knowledge-proofs-zkps-is-a-game-changer-for-self-sovereign-identity) — _Franklin Ohaegbulam_

