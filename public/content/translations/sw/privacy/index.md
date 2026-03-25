---
title: Faragha kwenye Ethereum
description: Zana na mbinu za kulinda faragha yako kwenye Ethereum
lang: sw
---

# Faragha kwenye Ethereum {#introduction}

Faragha si muhimu tu kwa usalama wa kibinafsi, ni msingi wa uhuru na [mdhamini muhimu wa ugatuaji](https://vitalik.eth.limo/general/2025/04/14/privacy.html). Faragha huwapa watu uwezo wa kujieleza, kufanya miamala na wengine, na kupanga jumuiya kwa uhuru. Lakini kama minyororo yote ya bloku, leja ya umma ya Ethereum hufanya faragha kuwa changamoto.

Ethereum ni ya uwazi kwa muundo. Kila kitendo cha kwenye mnyororo kinaonekana kwa yeyote anayeangalia. Wakati Ethereum inatoa matumizi ya jina bandia kwa kuunganisha shughuli zako na [ufunguo wa umma](/decentralized-identity/#public-key-cryptography) badala ya utambulisho halisi, mienendo ya shughuli inaweza kuchambuliwa ili kufichua taarifa nyeti na kuwatambua watumiaji.

Kujenga zana za kuhifadhi faragha katika Ethereum kunaweza kusaidia watu, mashirika, na taasisi kuingiliana kwa usalama huku ikipunguza ufichuzi usio wa lazima. Hii inafanya mfumo ikolojia kuwa salama na wa vitendo zaidi kwa anuwai ya matukio ya utumiaji.

## Faragha ya maandishi {#privacy-of-writes}

Kwa chaguo-msingi, kila muamala ulioandikwa kwenye Ethereum ni wa umma na wa kudumu. Hii inajumuisha sio tu kutuma ETH, lakini pia kusajili majina ya ENS, kukusanya POAP, au kufanya biashara ya NFT. Vitendo vya kila siku kama malipo, upigaji kura, au uthibitishaji wa utambulisho vinaweza kufichua taarifa zako kwa wahusika wasiotarajiwa. Kuna zana na mbinu kadhaa ambazo zinaweza kusaidia kufanya haya yawe ya faragha zaidi:

### Itifaki za kuchanganya (au "vichanganyaji") {#mixing-protocols}

Vichanganyaji huvunja uhusiano kati ya watumaji na wapokeaji kwa kuweka miamala ya watumiaji wengi kwenye "kidimbwi" cha pamoja na kisha kuwaruhusu watu kutoa baadaye kwenda anwani mpya. Kwa kuwa amana na uondoaji huchanganywa pamoja, ni vigumu zaidi kwa waangalizi kuviunganisha.

_Mifano: [PrivacyPools](https://docs.privacypools.com/), [Tornado Cash](https://tornado.cash/)_

### Vidimbwi Vilivyolindwa {#shielded-pools}

Vidimbwi vilivyolindwa ni sawa na vichanganyaji lakini huruhusu watumiaji kushikilia na kuhamisha fedha kwa faragha ndani ya kidimbwi chenyewe. Badala ya kuficha tu uhusiano kati ya amana na uondoaji, vidimbwi vilivyolindwa hudumisha hali ya faragha inayoendelea, mara nyingi hulindwa kwa uthibitisho wa zero-knowledge. Hii inafanya iwezekanavyo kujenga uhamisho wa faragha, salio za faragha, na zaidi.

_Mifano: [Railgun](https://www.railgun.org/), [Aztec](https://aztec.network/), Nightfall_

### Anwani za siri {#stealth-addresses}

[Anwani ya siri](https://vitalik.eth.limo/general/2023/01/20/stealth.html) ni kama kumpa kila mtumaji P.O. ya kipekee, ya mara moja. sanduku ambalo ni wewe tu unaweza kufungua. Kila wakati mtu anakutumia sarafu ya kidigitali, huenda kwenye anwani mpya, kwa hivyo hakuna mtu mwingine anayeweza kuona kuwa malipo hayo yote ni yako. Hii huweka historia yako ya malipo kuwa ya faragha na ngumu kufuatilia.

_Mifano: [UmbraCash](https://app.umbra.cash/faq), [FluidKey](https://www.fluidkey.com/)_

### Matukio mengine ya utumiaji {#other-use-cases}

Miradi mingine inayochunguza maandishi ya faragha ni pamoja na [PlasmaFold](https://pse.dev/projects/plasma-fold) (malipo ya faragha) na mifumo kama [MACI](https://pse.dev/projects/maci) na [Semaphore](https://pse.dev/projects/semaphore) (upigaji kura wa faragha).

Zana hizi hupanua chaguzi za kuandika kwa faragha kwenye Ethereum, lakini kila moja huja na maafikiano. Baadhi ya mbinu bado ni za majaribio, zingine huongeza gharama au ugumu, na zana zingine kama vichanganyaji zinaweza kukabiliwa na uchunguzi wa kisheria au wa kidhibiti kulingana na jinsi zinavyotumiwa.

## Faragha ya usomaji {#privacy-of-reads}

Kusoma au kuangalia habari yoyote kwenye Ethereum (k.m., salio la pochi yako) kawaida hupitia huduma kama vile mtoa huduma wako wa pochi, mtoa huduma wa nodi, au wachunguzi wa bloku. Kwa sababu unawategemea wakusomee mnyororo wa bloku, wanaweza pia kuona maombi yako pamoja na metadata kama anwani yako ya IP au eneo. Ukiendelea kuangalia akaunti ileile, taarifa hii inaweza kuunganishwa pamoja ili kuunganisha utambulisho wako na shughuli zako.

Kuendesha nodi yako mwenyewe ya Ethereum kungezuia hili, lakini kuhifadhi na kusawazisha mnyororo kamili wa bloku bado ni ghali na si vitendo kwa watumiaji wengi, haswa kwenye vifaa vya mkononi.

Baadhi ya miradi inayochunguza usomaji wa faragha ni pamoja na [Private Information Retrieval](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (PIR, pata data bila kufichua kile unachotafuta), [zkID](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (ukaguzi wa utambulisho wa faragha na uthibitisho wa zero-knowledge), [vOPRF](https://pse.dev/projects/voprf) (tumia akaunti za Web2 kwa jina bandia katika Web3), [vFHE](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (hesabu data iliyosimbwa kwa njia fiche), na [MachinaIO](https://pse.dev/projects/machina-io) (ficha maelezo ya programu huku ukiweka utendaji).

## Faragha kwa ajili ya kuthibitisha {#privacy-of-proving}

Uthibitisho wa kuhifadhi faragha ni zana unazoweza kutumia kwenye Ethereum kuonyesha kuwa kitu ni kweli bila kufichua maelezo yasiyo ya lazima. Kwa mfano, unaweza:

- Thibitisha una zaidi ya miaka 18 bila kushiriki tarehe yako kamili ya kuzaliwa
- Thibitisha umiliki wa NFT au tokeni bila kufichua pochi yako yote
- Thibitisha ustahiki wa uanachama, zawadi, au kura bila kufichua data nyingine za kibinafsi

Zana nyingi za hizi hutegemea mbinu za kriptografia kama vile uthibitisho wa zero-knowledge, lakini changamoto ni kuzifanya ziwe na ufanisi wa kutosha kufanya kazi kwenye vifaa vya kila siku, zinazoweza kubebeka kwenye jukwaa lolote, na salama.

Baadhi ya miradi inayochunguza faragha kwa ajili ya kuthibitisha ni pamoja na [Client Side Proving](https://pse.dev/projects/client-side-proving) (Mifumo ya kuthibitisha ya ZK), [TLSNotary](https://tlsnotary.org/), (uthibitisho wa uhalisi kwa data yoyote kwenye wavuti), [Mopro](https://pse.dev/projects/mopro) (uthibitisho wa upande wa mteja kwa simu), [Private Proof Delegation](https://pse.dev/projects/private-proof-delegation) (mifumo ya ugawaji ambayo huepuka dhana za uaminifu), na [Noir](https://noir-lang.org/) (lugha ya kompyuta ya faragha na inayoweza kuthibitishwa).

## Faharasa ya Faragha {#privacy-glossary}

**Kutokujulikana**: Kuwasiliana huku vitambulishi vyote vimeondolewa kabisa kwenye data yako, na kufanya iwe vigumu kufuatilia taarifa hadi kwa mtu binafsi

**Usimbaji fiche**: Mchakato unaochanganya data ili mtu aliye na ufunguo sahihi pekee ndiye anayeweza kuisoma

**[Usimbaji Fiche wa Homomorphic Kamili](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (FHE)**: Njia ya kufanya hesabu moja kwa moja kwenye data iliyosimbwa kwa njia fiche, bila kuiharibu kamwe

**[Ufichaji Usiotofautishwa](https://pse.dev/projects/machina-io) (iO)**: Mbinu za faragha zinazofanya programu au data zisiweze kueleweka huku zikiwa bado zinatumika

**[Hesabu ya Vyama Vingi](https://pse.dev/blog/secure-multi-party-computation) (MPC)**: Mbinu zinazoruhusu pande nyingi kuhesabu matokeo pamoja bila kufichua data zao za faragha

**Kriptografia Inayoweza Kupangwa**: Kriptografia inayobadilika, inayoendeshwa na sheria ambayo inaweza kubinafsishwa katika programu ili kudhibiti jinsi na wakati data inashirikiwa, kuthibitishwa, au kufichuliwa

**Jina Bandia**: Kutumia misimbo au nambari za kipekee (kama anwani ya Ethereum) badala ya vitambulishi vya kibinafsi

**Ufichuaji Teule**: Uwezo wa kushiriki tu kile kinachohitajika (k.m. kuthibitisha unamiliki NFT bila kufichua historia yako yote ya pochi)

**Kutokuunganishwa**: Kuhakikisha vitendo tofauti kwenye mnyororo wa bloku haviwezi kuunganishwa tena na anwani ileile

**Uwezo wa Kuthibitishwa**: Kuhakikisha wengine wanaweza kuthibitisha dai ni kweli, kama vile kuthibitisha muamala au uthibitisho kwenye Ethereum

**Uwakilishi Unaoweza Kuthibitishwa**: Kugawa kazi—kama vile kutengeneza uthibitisho—kwa upande mwingine (k.m. pochi ya rununu inayotumia seva kwa kriptografia nzito) huku ukiwa bado unaweza kuthibitisha kuwa ilifanywa ipasavyo

**[Uthibitisho wa Zero-Knowledge](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) (ZKPs)**: Itifaki za kriptografia zinazomruhusu mtu kuthibitisha taarifa ni kweli bila kufichua data msingi

**ZK Rollup**: Mfumo wa kuongeza viwango unaokusanya miamala nje ya mnyororo na kuwasilisha uthibitisho wa uhalali kwenye mnyororo—sio ya faragha kwa chaguo-msingi, lakini huwezesha mifumo bora ya faragha (kama vidimbwi vilivyolindwa) kwa kupunguza gharama

## Rasilimali {#resources}

- [Wasimamizi wa Faragha wa Ethereum](https://pse.dev/) (PSE), maabara ya utafiti na maendeleo ya Msingi wa Ethereum inayolenga faragha kwa mfumo ikolojia
- [Web3PrivacyNow](https://web3privacy.info/), mtandao wa watu, miradi, na mashirika yanayolingana ambayo hulinda na kuendeleza haki za binadamu mtandaoni
- [WalletBeat](https://beta.walletbeat.eth.limo/wallet/summary/), tovuti ya ukadiriaji wa pochi za Ethereum inayolenga kutoa orodha pana ya pochi, utendaji wao, mazoea, na usaidizi kwa viwango fulani.
- [Zk-kit](https://zkkit.pse.dev/): Seti ya maktaba (algoriti, kazi za matumizi, na miundo ya data) ambayo inaweza kutumika tena katika miradi tofauti na itifaki za zero-knowledge.
- [Programu za Faragha](/apps/categories/privacy/) - Gundua orodha ya programu za faragha zilizoratibiwa zinazoendeshwa kwenye Ethereum.
