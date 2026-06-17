---
title: Faragha kwenye Ethereum
description: Zana na mbinu za kulinda faragha yako kwenye Ethereum
lang: sw
---

Faragha sio tu muhimu kwa usalama wa kibinafsi, ni msingi wa uhuru na [mdhamini mkuu wa ugatuzi](https://vitalik.eth.limo/general/2025/04/14/privacy.html). Faragha huwapa watu uwezo wa kujieleza, kufanya miamala na wengine, na kuandaa jamii kwa uhuru. Lakini kama minyororo ya vitalu yote, leja ya umma ya Ethereum inafanya faragha kuwa changamoto.

Ethereum ni wazi kwa muundo. Kila kitendo mnyororoni kinaonekana kwa yeyote anayetazama. Ingawa Ethereum inatoa utambulisho bandia kwa kuunganisha shughuli yako na [ufunguo wa umma](/decentralized-identity/#public-key-cryptography) badala ya utambulisho wa ulimwengu halisi, mifumo ya shughuli inaweza kuchambuliwa ili kufichua taarifa nyeti na kutambua watumiaji.

Kujenga zana za kuhifadhi faragha kwenye Ethereum kunaweza kusaidia watu, mashirika, na taasisi kuingiliana kwa usalama huku wakipunguza ufichuaji usio wa lazima. Hii inafanya mfumo ikolojia kuwa salama na wa vitendo zaidi kwa anuwai ya matumizi.

<VideoWatch slug="privacy-is-existential" />

## Faragha kwa uandishi {#privacy-of-writes}

Kwa chaguo-msingi, kila muamala ulioandikwa kwenye Ethereum ni wa umma na wa kudumu. Hii inajumuisha sio tu kutuma ETH, bali pia kusajili majina ya ENS, kukusanya POAP, au kufanya biashara ya NFT. Vitendo vya kila siku kama vile malipo, kupiga kura, au uthibitishaji wa utambulisho vinaweza kufichua taarifa zako kwa wahusika wasiokusudiwa. Kuna zana na mbinu kadhaa zinazoweza kusaidia kufanya haya kuwa ya faragha zaidi:

### Itifaki za kuchanganya (au "mixers") {#mixing-protocols}

Mixers huvunja kiungo kati ya watumaji na wapokeaji kwa kuweka miamala ya watumiaji wengi kwenye "bwawa" la pamoja na kisha kuruhusu watu kufanya utoaji baadaye kwenye anwani mpya. Kwa kuwa amana na utoaji zimechanganywa pamoja, ni vigumu sana kwa waangalizi kuziunganisha.

_Mifano: [PrivacyPools](https://docs.privacypools.com/), [Tornado Cash](https://tornado.cash/)_

### Mabwawa Yaliyokingwa (Shielded Pools) {#shielded-pools}

Mabwawa yaliyokingwa yanafanana na mixers lakini yanaruhusu watumiaji kushikilia na kufanya hamisho la fedha kwa faragha ndani ya bwawa lenyewe. Badala ya kuficha tu kiungo kati ya amana na utoaji, mabwawa yaliyokingwa hudumisha hali ya faragha inayoendelea, mara nyingi ikilindwa na uthibitisho wa maarifa-sifuri. Hii inafanya iwezekane kujenga hamisho za faragha, salio za faragha, na zaidi.

_Mifano: [Railgun](https://www.railgun.org/), [Aztec](https://aztec.network/), Nightfall_

### Anwani fiche {#stealth-addresses}

[Anwani fiche](https://vitalik.eth.limo/general/2023/01/20/stealth.html) ni kama kumpa kila mtumaji sanduku la posta la kipekee la mara moja ambalo wewe pekee unaweza kulifungua. Kila wakati mtu anapokutumia kripto, inaenda kwenye anwani mpya, kwa hivyo hakuna mtu mwingine anayeweza kuona kuwa malipo hayo yote ni yako. Hii huweka historia yako ya malipo kuwa ya faragha na ngumu kufuatilia.

_Mifano: [UmbraCash](https://app.umbra.cash/faq), [FluidKey](https://www.fluidkey.com/)_

### Matumizi mengine {#other-use-cases}

Miradi mingine inayochunguza uandishi wa faragha inajumuisha [PlasmaFold](https://pse.dev/projects/plasma-fold) (malipo ya faragha) na mifumo kama [MACI](https://pse.dev/projects/maci) na [Semaphore](https://pse.dev/projects/semaphore) (kupiga kura kwa faragha).

Zana hizi hupanua chaguzi za kuandika kwa faragha kwenye Ethereum, lakini kila moja inakuja na mapungufu. Baadhi ya mbinu bado ni za majaribio, baadhi huongeza gharama au utata, na baadhi ya zana kama mixers zinaweza kukabiliwa na uchunguzi wa kisheria au udhibiti kulingana na jinsi zinavyotumika.

## Faragha kwa usomaji {#privacy-of-reads}

Kusoma au kuangalia taarifa yoyote kwenye Ethereum (k.m. salio la mkoba wako) kwa kawaida hupitia huduma kama vile mtoa huduma wako wa mkoba, mtoa huduma wa nodi, au kichunguzi cha bloku. Kwa sababu unawategemea kusoma mnyororo wa vitalu kwa ajili yako, wanaweza pia kuona maombi yako pamoja na data fafanuzi kama vile anwani yako ya IP au eneo. Ikiwa utaendelea kuangalia akaunti hiyo hiyo, taarifa hii inaweza kuunganishwa ili kuhusisha utambulisho wako na shughuli yako.

Kuendesha nodi yako mwenyewe ya Ethereum kungezuia hili, lakini kuhifadhi na kufanya usawazishaji wa mnyororo wa vitalu kamili bado ni ghali na si jambo la vitendo kwa watumiaji wengi, hasa kwenye vifaa vya mkononi.

Baadhi ya miradi inayochunguza usomaji wa faragha inajumuisha [Urejeshaji wa Taarifa za Faragha](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (PIR, kuchukua data bila kufichua unachotafuta), [zkID](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (ukaguzi wa utambulisho wa faragha kwa uthibitisho wa maarifa-sifuri), [vOPRF](https://pse.dev/projects/voprf) (kutumia akaunti za Web2 kwa utambulisho bandia katika Web3), [vFHE](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (kukokotoa kwenye data iliyofanyiwa usimbaji fiche), na [MachinaIO](https://pse.dev/projects/machina-io) (kuficha maelezo ya programu huku ukihifadhi utendaji).

## Faragha kwa kuthibitisha {#privacy-of-proving}

Uthibitisho unaohifadhi faragha ni zana unazoweza kutumia kwenye Ethereum kuonyesha kuwa jambo fulani ni la kweli bila kufichua maelezo yasiyo ya lazima. Kwa mfano, unaweza:

- Kuthibitisha una zaidi ya miaka 18 bila kushiriki tarehe yako kamili ya kuzaliwa
- Kuthibitisha umiliki wa NFT au tokeni bila kufichua mkoba wako wote
- Kuthibitisha ustahiki wa uanachama, tuzo, au kura bila kufichua data nyingine za kibinafsi

Zana nyingi kwa haya zinategemea mbinu za kriptografia kama vile uthibitisho wa maarifa-sifuri, lakini changamoto ni kuzifanya ziwe na ufanisi wa kutosha kuendeshwa kwenye vifaa vya kila siku, kubebeka kwa jukwaa lolote, na kuwa salama.

Baadhi ya miradi inayochunguza faragha kwa kuthibitisha inajumuisha [Uthibitishaji wa Upande wa Mteja](https://pse.dev/projects/client-side-proving) (mifumo ya kuthibitisha ya ZK), [TLSNotary](https://tlsnotary.org/), (uthibitisho wa uhalisi kwa data yoyote kwenye wavuti), [Mopro](https://pse.dev/projects/mopro) (uthibitishaji wa upande wa mteja wa simu), [Ukaimishaji wa Uthibitisho wa Faragha](https://pse.dev/projects/private-proof-delegation) (mifumo ya ukaimishaji inayoepuka dhana za uaminifu), na [Noir](https://noir-lang.org/) (lugha kwa ajili ya ukokotoaji wa faragha na unaoweza kuthibitishwa).

## Faharasa ya Faragha {#privacy-glossary}

**Bila jina (Anonymous)**: Kuingiliana huku vitambulisho vyote vikiwa vimeondolewa kabisa kwenye data yako, na kufanya iwezekane kufuatilia taarifa kurudi kwa mtu binafsi

**Usimbaji fiche**: Mchakato unaovuruga data ili mtu aliye na ufunguo sahihi pekee ndiye anayeweza kuisoma

**[Usimbaji Fiche Kamili wa Homomofiki](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (FHE)**: Njia ya kufanya ukokotoaji moja kwa moja kwenye data iliyofanyiwa usimbaji fiche, bila kuifumbua

**[Ufichaji Usiotofautishika](https://pse.dev/projects/machina-io) (iO)**: Mbinu za faragha zinazofanya programu au data zisieleweke huku zikiwa bado zinaweza kutumika

**[Ukokotoaji wa Pande Nyingi](https://pse.dev/blog/secure-multi-party-computation) (MPC)**: Mbinu zinazoruhusu pande nyingi kukokotoa matokeo pamoja bila kufichua michango yao ya faragha

**Kriptografia Inayoweza Kupangwa**: Kriptografia inayobadilika, inayoendeshwa na sheria ambayo inaweza kubinafsishwa katika programu ili kudhibiti jinsi na wakati gani data inashirikiwa, kuthibitishwa, au kufichuliwa

**Utambulisho bandia (Pseudonymous)**: Kutumia misimbo au nambari za kipekee (kama anwani ya Ethereum) badala ya vitambulisho vya kibinafsi

**Ufichuaji Teule**: Uwezo wa kushiriki tu kile kinachohitajika (k.m. kuthibitisha unamiliki NFT bila kufichua historia nzima ya mkoba wako)

**Kutounganishika (Unlinkability)**: Kuhakikisha vitendo tofauti kwenye mnyororo wa vitalu haviwezi kuhusishwa tena na anwani hiyo hiyo

**Uwezo wa kuthibitishwa (Verifiability)**: Kuhakikisha wengine wanaweza kuthibitisha dai ni la kweli, kama vile kuhalalisha muamala au uthibitisho kwenye Ethereum

**Ukaimishaji Unaoweza Kuthibitishwa**: Kukabidhi jukumu—kama vile kuzalisha uthibitisho—kwa upande mwingine (k.m. mkoba wa simu unaotumia seva kwa kriptografia nzito) huku ukiwa bado na uwezo wa kuthibitisha kuwa lilifanywa kwa usahihi

**[Uthibitisho wa Maarifa-Sifuri](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) (ZKPs)**: Itifaki za kriptografia zinazomruhusu mtu kuthibitisha taarifa ni ya kweli bila kufichua data ya msingi

**ZK Rollup**: Mfumo wa uwezo wa kuongezeka unaokusanya miamala nje ya mnyororo na kuwasilisha uthibitisho wa uhalali mnyororoni—sio ya faragha kwa chaguo-msingi, lakini huwezesha mifumo bora ya faragha (kama mabwawa yaliyokingwa) kwa kupunguza gharama

## Rasilimali {#resources}

- [Wasimamizi wa Faragha wa Ethereum](https://pse.dev/) (PSE), maabara ya utafiti na maendeleo ya Taasisi ya Ethereum inayolenga faragha kwa mfumo ikolojia
- [Web3PrivacyNow](https://web3privacy.info/), mtandao wa watu, miradi, na mashirika yaliyokubaliana ambayo yanalinda na kuendeleza haki za binadamu mtandaoni
- [WalletBeat](https://beta.walletbeat.eth.limo/wallet/summary/), tovuti ya kukadiria mkoba wa Ethereum inayolenga kutoa orodha ya kina ya mikoba, utendaji wao, mbinu, na usaidizi kwa viwango fulani.
- [Zk-kit](https://zkkit.pse.dev/): Seti ya maktaba (algorithms, kazi za matumizi, na miundo ya data) zinazoweza kutumika tena katika miradi tofauti na itifaki za sifuri-maarifa.
- [Programu za Faragha](/apps/categories/privacy/) - Gundua orodha ya programu za Faragha zilizoratibiwa zinazoendeshwa kwenye Ethereum.