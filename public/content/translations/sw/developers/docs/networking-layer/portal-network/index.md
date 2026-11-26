---
title: Potal Netwoki
description: Muhtasari wa Potal Netwoki, mtandao wa rika-kwa-rika ambao huweka historia ya Ethereum kupatikana wakati wateja wanaacha kuihifadhi yote.
lang: sw
---

[Ethereum](/) ni mtandao unaoundwa na kompyuta zinazoendesha programu ya mteja wa Ethereum. Kila moja ya kompyuta hizi inaitwa 'nodi'. Programu ya mteja inaruhusu nodi kutuma na kupokea data kwenye mtandao wa Ethereum, na inathibitisha data dhidi ya sheria za itifaki ya Ethereum. Nodi huweka data nyingi za kihistoria katika hifadhi zao za diski na kuongeza juu yake zinapopokea pakiti mpya za taarifa, zinazojulikana kama vitalu, kutoka kwa nodi nyingine kwenye mtandao. Hili ni muhimu kwa kuangalia kila wakati kwamba nodi ina taarifa zinazoendana na mtandao uliosalia. Hii inamaanisha kuendesha nodi kunaweza kuhitaji nafasi kubwa ya diski. Baadhi ya shughuli za nodi zinaweza kuhitaji RAM nyingi pia.

Wateja wa utekelezaji hawahitaji tena kuweka data hiyo yote. Tangu Julai 2025 wanaweza kuacha miili na stakabadhi za vitalu kutoka kabla ya [Unganisho](/roadmap/merge/), na ramani ya njia ya Ethereum inajumuisha kuacha historia zaidi ya mnyororo kadiri muda unavyopita. Historia hiyo bado inapaswa kupatikana kwa yeyote anayeihitaji, kama vile wavinjari wa vitalu, waorodheshaji au mkoba unaotafuta muamala wa zamani.

Potal Netwoki huweka historia hii kupatikana kwa kuishiriki katika vipande vidogo kwenye nodi nyingi. Hakuna nodi inayopaswa kuihifadhi yote, na nodi inaweza kuchukua kipande chochote na kukiangalia dhidi ya data ambayo tayari inayo, bila kuiamini nodi iliyoituma.

Zaidi kuhusu [nodi na wateja](/developers/docs/nodes-and-clients/)

## Kwa nini tunahitaji Potal Netwoki {#why-do-we-need-portal-network}

Nodi za Ethereum huhifadhi nakala zao kamili au za sehemu za mnyororo wa vitalu wa Ethereum. Nakala hii ya ndani inatumika kuthibitisha miamala na kuhakikisha nodi inafuata mnyororo sahihi. Data hii iliyohifadhiwa ndani inaruhusu nodi kuthibitisha kwa kujitegemea kwamba data inayoingia ni halali na sahihi bila kuhitaji kuamini chombo kingine chochote.

Nakala hii ya ndani ya mnyororo wa vitalu na data inayohusiana ya hali na stakabadhi inachukua nafasi kubwa kwenye diski kuu ya nodi. Kwa mfano, SSD ya 4TB inapendekezwa kwa kuendesha nodi kwa kutumia [Geth](https://geth.ethereum.org) iliyooanishwa na mteja wa mwafaka. Pamoja na historia kamili ya mnyororo, Geth inachukua zaidi ya 1.8TB ya nafasi ya diski (kuanzia Septemba 2026), na hiyo inaendelea kukua pamoja na mnyororo.

Hii inamaanisha kuendesha nodi kunaweza kuwa ghali, kwa sababu kiasi kikubwa cha nafasi ya diski kinapaswa kutengwa kwa ajili ya Ethereum. [Ukomo wa historia](/roadmap/statelessness/#history-expiry) unaipunguza kwa kuruhusu wateja kufuta data ya zamani ya kitalu ambayo hawaihitaji ili kufuata mnyororo: tangu [ukomo wa historia wa sehemu](https://blog.ethereum.org/2025/07/08/partial-history-exp) mnamo Julai 2025, wateja wa utekelezaji wanaweza kuacha miili na stakabadhi za kila kitalu kabla ya Unganisho. [Ukomo wa hali](/roadmap/statelessness/#state-expiry) na [ubilahali](/roadmap/statelessness/) ni suluhisho zaidi ambazo bado zinafanyiwa utafiti.

Mara tu nodi zinapoacha kuhifadhi historia ya zamani, haziwezi tena kuitumikia kwa wengine. Kumbukumbu, torrents na watoa huduma huweka nakala zake; Potal Netwoki inaisambaza kwenye nodi nyingi, kwa hivyo inabaki kupatikana bila kutegemea yoyote kati yao.

## Je, Potal Netwoki inafanyaje kazi? {#how-does-portal-network-work}

Nodi za Ethereum zina itifaki kali zinazofafanua jinsi zinavyowasiliana zenyewe kwa zenyewe. Wateja wa utekelezaji huwasiliana kwa kutumia seti ya itifaki ndogo zinazojulikana kama [devp2p](/developers/docs/networking-layer/#devp2p), wakati wateja wa mwafaka hutumia mkusanyiko tofauti wa itifaki ndogo unaoitwa [libp2p](/developers/docs/networking-layer/#libp2p). devp2p inaruhusu nodi kuomba miili ya kitalu na stakabadhi kutoka kwa wenza wake, lakini mwenza ambaye ameacha historia ya zamani hawezi kuitumikia. Programu na mikoba pia zinaweza kupata data kutoka kwa nodi kupitia [Kiolesura cha Kupanga Programu Tumizi (API) cha JSON-RPC](/developers/docs/apis/json-rpc/), lakini hiyo inategemea nodi moja au mtoa huduma kuhifadhi data na kuiamini kuwa mwaminifu.

Potal Netwoki ni mtandao tofauti wa rika-kwa-rika uliojengwa kwa ajili ya kushiriki historia. Inaendeshwa kwenye [discv5](https://github.com/ethereum/devp2p/blob/master/discv5/discv5.md), itifaki ya ugunduzi wa nodi ambayo wateja wa mwafaka pia hutumia kupata wenza, na hupanga nodi zake kama [jedwali la heshi lililosambazwa (DHT)](https://en.wikipedia.org/wiki/Distributed_hash_table), sawa na la BitTorrent. Kila nodi ina kitambulisho cha nodi, na kila kipande cha maudhui, kama vile stakabadhi za kitalu kimoja, kina kitambulisho cha maudhui katika nafasi sawa ya kitambulisho, inayotokana na nambari yake ya kitalu. Kila nodi huhifadhi maudhui ambayo vitambulisho vyake viko karibu zaidi na kitambulisho chake yenyewe, hadi umbali inaouchagua, unaoitwa rediasi yake. Ili kuchukua kipande cha maudhui, nodi huwauliza wenza inaowajua ambao wako karibu zaidi na kitambulisho cha maudhui. Wenza ambao hawana hujibu na nodi ambazo ziko karibu zaidi, hadi ombi lifikie nodi inayoihifadhi.

<PortalHistoryDiagram />

Nodi haipaswi kamwe kuamini data inayopokea. Inaweka kila kichwa cha kizuizi, na kila kichwa hujitolea kwa miamala na stakabadhi za kitalu chake kupitia mizizi kama vile `transactionsRoot` na `receiptsRoot`. Nodi huangalia mwili wa kitalu au stakabadhi za kitalu dhidi ya mizizi hiyo kabla ya kuzitumia.

### Mitandao ya Potal {#the-portal-networks}

Potal Netwoki ilibuniwa kwanza kama mitandao midogo kadhaa ambayo ingeruhusu wateja wepesi kufuata mnyororo bila kuamini nodi kamili: mtandao wa kiteja chepesi cha Mnyororo wa Beacon, mtandao wa hali, mtandao wa uvumi wa muamala na mtandao wa historia. Mnamo 2025, vipimo vya yote isipokuwa moja vilihamishiwa kwenye urithi, na maendeleo sasa yanalenga **Mtandao wa historia**, ambao huhifadhi miili na stakabadhi za vitalu vya zamani kwa wateja wa utekelezaji ambao huweka kila kichwa cha kizuizi lakini wameacha historia iliyosalia.

## Wateja wa Potal Netwoki {#client-diversity-as-default}

Timu kadhaa zilijenga wateja wa Potal Netwoki:

- [Mteja wa Potal wa Nimbus](https://fluffy.guide) (zamani Fluffy): imeandikwa kwa Nim, na ndiyo bado iko katika maendeleo endelevu
- [Trin](https://github.com/ethereum/trin): imeandikwa kwa Rust, haitunzwi tena
- [Ultralight](https://github.com/ethereumjs/ultralight): imeandikwa kwa TypeScript, bila sasisho tangu katikati ya 2025
- [Shisui](https://github.com/zen-eth/shisui): imeandikwa kwa Go, bila sasisho tangu katikati ya 2025

## Usomaji zaidi {#further-reading}

- [Vipimo vya Potal Netwoki](https://github.com/ethereum/portal-network-specs)
- [Kutumia itifaki ya Potal Netwoki kwa ukomo wa historia](https://ethresear.ch/t/using-portal-network-protocol-for-history-expiry/22658)
- [Ukomo wa historia wa sehemu](https://blog.ethereum.org/2025/07/08/partial-history-exp)
- [Potal Netwoki (Piper Merriam katika Devcon Bogota)](https://www.youtube.com/watch?v=0stc9jnQLXA)
- [Discord ya Potal Netwoki](https://discord.gg/CFFnmE7Hbs)
- [Tovuti ya Potal Netwoki](https://www.ethportal.net/)
