---
title: Potal Netwoki
description: Muhtasari wa Potal Netwoki - mtandao unaoendelezwa ulioundwa kusaidia wateja wenye rasilimali chache.
lang: sw
---

[Ethereum](/) ni mtandao unaoundwa na kompyuta zinazoendesha programu ya mteja wa Ethereum. Kila moja ya kompyuta hizi inaitwa 'nodi'. Programu ya mteja inaruhusu nodi kutuma na kupokea data kwenye mtandao wa Ethereum, na inathibitisha data dhidi ya sheria za itifaki ya Ethereum. Nodi huweka data nyingi za kihistoria katika hifadhi zao za diski na kuongeza juu yake zinapopokea pakiti mpya za taarifa, zinazojulikana kama vitalu, kutoka kwa nodi nyingine kwenye mtandao. Hili ni muhimu kwa kuangalia kila wakati kwamba nodi ina taarifa inayoendana na mtandao mzima. Hii inamaanisha kuendesha nodi kunaweza kuhitaji nafasi kubwa ya diski. Baadhi ya shughuli za nodi zinaweza kuhitaji RAM nyingi pia.

Ili kutatua tatizo hili la hifadhi ya diski, nodi 'nyepesi' zimeundwa ambazo huomba taarifa kutoka kwa nodi kamili badala ya kuhifadhi zote zenyewe. Hata hivyo, hii inamaanisha nodi nyepesi haithibitishi taarifa kwa kujitegemea na badala yake inaiamini nodi nyingine. Pia inamaanisha kuwa nodi kamili zinahitajika kufanya kazi ya ziada ili kuhudumia hizo nodi nyepesi.

Potal Netwoki ni muundo mpya wa mtandao kwa ajili ya Ethereum ambao unalenga kutatua tatizo la upatikanaji wa data kwa nodi "nyepesi" bila kulazimika kuamini au kuweka mzigo wa ziada kwenye nodi kamili, kwa kushiriki data muhimu katika vipande vidogo kwenye mtandao mzima.

Zaidi kuhusu [nodi na wateja](/developers/docs/nodes-and-clients/)

## Kwa nini tunahitaji Potal Netwoki {#why-do-we-need-portal-network}

Nodi za Ethereum huhifadhi nakala zao kamili au za sehemu za mnyororo wa vitalu wa Ethereum. Nakala hii ya ndani inatumika kuthibitisha miamala na kuhakikisha nodi inafuata mnyororo sahihi. Data hii iliyohifadhiwa ndani inaruhusu nodi kuthibitisha kwa kujitegemea kwamba data inayoingia ni halali na sahihi bila kuhitaji kuamini chombo kingine chochote.

Nakala hii ya ndani ya mnyororo wa vitalu na data inayohusiana ya hali na stakabadhi inachukua nafasi kubwa kwenye diski kuu ya nodi. Kwa mfano, diski kuu ya 2TB inapendekezwa kwa kuendesha nodi kwa kutumia [Geth](https://geth.ethereum.org) iliyounganishwa na mteja wa mwafaka. Kwa kutumia usawazishaji wa haraka (snap sync), ambao huhifadhi tu data ya mnyororo kutoka kwa seti ya hivi karibuni ya vitalu, Geth kwa kawaida huchukua takriban 650GB ya nafasi ya diski lakini inakua kwa takriban 14GB/kwa wiki (unaweza kupunguza nodi kurudi kwenye 650GB mara kwa mara).

Hii inamaanisha kuendesha nodi kunaweza kuwa ghali, kwa sababu kiasi kikubwa cha nafasi ya diski kinapaswa kutengwa kwa ajili ya Ethereum. Kuna suluhisho kadhaa kwa tatizo hili kwenye ramani ya njia ya Ethereum, ikiwa ni pamoja na [ukomo wa historia](/roadmap/statelessness/#history-expiry), [ukomo wa hali](/roadmap/statelessness/#state-expiry) na [ubilahali](/roadmap/statelessness/). Hata hivyo, hizi huenda zikachukua miaka kadhaa kabla ya kutekelezwa. Pia kuna [nodi nyepesi](/developers/docs/nodes-and-clients/light-clients/) ambazo hazihifadhi nakala zao za data ya mnyororo, zinaomba data zinazohitaji kutoka kwa nodi kamili. Hata hivyo, hii inamaanisha nodi nyepesi zinapaswa kuamini nodi kamili kutoa data ya kweli na pia inaleta mkazo kwa nodi kamili ambazo zinapaswa kutoa data ambayo nodi nyepesi zinahitaji.

Potal Netwoki inalenga kutoa njia mbadala kwa nodi nyepesi kupata data zao ambayo haihitaji kuamini au kuongeza kwa kiasi kikubwa kazi inayopaswa kufanywa na nodi kamili. Njia ambayo hii itafanywa ni kuanzisha njia mpya kwa nodi za Ethereum kushiriki data kwenye mtandao mzima.

## Potal Netwoki inafanyaje kazi? {#how-does-portal-network-work}

Nodi za Ethereum zina itifaki kali zinazofafanua jinsi zinavyowasiliana zenyewe kwa zenyewe. Wateja wa utekelezaji huwasiliana kwa kutumia seti ya itifaki ndogo zinazojulikana kama [devp2p](/developers/docs/networking-layer/#devp2p), wakati wateja wa mwafaka hutumia mkusanyiko tofauti wa itifaki ndogo unaoitwa [libp2p](/developers/docs/networking-layer/#libp2p). Hizi hufafanua aina za data zinazoweza kupitishwa kati ya nodi.

![devP2P and libP2P](portal-network-devp2p-libp2p.png)

Nodi pia zinaweza kutoa data maalum kupitia [JSON-RPC API](/developers/docs/apis/json-rpc/), ambayo ndiyo njia programu na pochi hubadilishana taarifa na nodi za Ethereum. Hata hivyo, hakuna kati ya hizi iliyo itifaki bora kwa kutoa data kwa wateja wepesi.

Wateja wepesi kwa sasa hawawezi kuomba vipande maalum vya data ya mnyororo kupitia devp2p au libp2p kwa sababu itifaki hizo zimeundwa tu kuwezesha usawazishaji wa mnyororo na usambazaji wa taarifa (gossiping) wa vitalu na miamala. Wateja wepesi hawataki kupakua taarifa hii kwa sababu hiyo ingewazuia kuwa "wepesi".

JSON-RPC API pia si chaguo bora kwa maombi ya data ya mteja mwepesi, kwa sababu inategemea muunganisho kwa nodi kamili maalum au mtoa huduma wa RPC aliyewekwa kati ambaye anaweza kutoa data. Hii inamaanisha mteja mwepesi anapaswa kuamini nodi/mtoa huduma huyo maalum kuwa mkweli, na pia nodi kamili inaweza kulazimika kushughulikia maombi mengi kutoka kwa wateja wepesi wengi, na kuongeza mahitaji yao ya kipimo data.

Lengo la Potal Netwoki ni kufikiria upya muundo mzima, kujenga hasa kwa ajili ya wepesi, nje ya vikwazo vya muundo wa wateja wa Ethereum waliopo.

Wazo kuu la Potal Netwoki ni kuchukua sehemu bora zaidi za mkusanyiko wa sasa wa mtandao kwa kuwezesha taarifa zinazohitajika na wateja wepesi, kama vile data ya kihistoria na utambulisho wa kichwa cha sasa cha mnyororo kutolewa kupitia mtandao mwepesi uliogatuliwa wa rika-kwa-rika wa mtindo wa devp2p kwa kutumia [DHT](https://en.wikipedia.org/wiki/Distributed_hash_table) (sawa na Bittorrent).

Wazo ni kuongeza sehemu ndogo za jumla ya data ya kihistoria ya Ethereum na baadhi ya majukumu maalum ya nodi kwa kila nodi. Kisha, maombi yanahudumiwa kwa kutafuta nodi zinazohifadhi data maalum iliyoombwa na kuirejesha kutoka kwao.

Hii inageuza mtindo wa kawaida wa nodi nyepesi kupata nodi moja na kuiomba kuchuja na kutoa kiasi kikubwa cha data; badala yake, zinachuja haraka mtandao mkubwa wa nodi ambazo kila moja inashughulikia kiasi kidogo cha data.

Lengo ni kuruhusu mtandao uliogatuliwa wa wateja wepesi wa Potal:

- kufuatilia kichwa cha mnyororo
- kufanya usawazishaji wa data ya mnyororo ya hivi karibuni na ya kihistoria
- kurejesha data ya hali
- kutangaza miamala
- kutekeleza miamala kwa kutumia [EVM](/developers/docs/evm/)

Faida za muundo huu wa mtandao ni:

- kupunguza utegemezi kwa watoa huduma waliowekwa kati
- Kupunguza matumizi ya kipimo data cha Intaneti
- Usawazishaji uliopunguzwa au sifuri
- Inapatikana kwa vifaa vyenye rasilimali chache (\<1 GB RAM, \<100 MB nafasi ya diski, 1 CPU)

Jedwali hapa chini linaonyesha kazi za wateja waliopo ambazo zinaweza kutolewa na Potal Netwoki, kuwezesha watumiaji kufikia kazi hizi kwenye vifaa vyenye rasilimali chache sana.

### Potal Netwoki {#the-portal-networks}

| Kiteja chepesi cha Beacon | Mtandao wa hali                | Usambazaji wa miamala  | Mtandao wa historia | Faharisi ya Miamala ya Kikanonika  |
| ------------------- | ---------------------------- | ------------------- | --------------- | -------------------  |
| Kiteja chepesi cha mnyororo wa Beacon  | Hifadhi ya akaunti na mkataba | Mempool nyepesi | Vihusishi (Headers)         | TxHash > Heshi, Faharisi |
| Data ya itifaki       |                              |                     | Miili ya vitalu    |                      |
|                     |                              |                     | Stakabadhi        |                      |

## Anuwai ya wateja kwa chaguo-msingi {#client-diversity-as-default}

Wasanidi wa Potal Netwoki pia walifanya uamuzi wa kimuundo wa kujenga wateja wanne tofauti wa Potal Netwoki kuanzia siku ya kwanza.

Wateja wa Potal Netwoki ni:

- [Trin](https://github.com/ethereum/trin): imeandikwa kwa Rust
- [Fluffy](https://fluffy.guide): imeandikwa kwa Nim
- [Ultralight](https://github.com/ethereumjs/ultralight): imeandikwa kwa TypeScript
- [Shisui](https://github.com/zen-eth/shisui): imeandikwa kwa Go

Kuwa na utekelezaji wa wateja wengi wanaojitegemea huongeza uthabiti na ugatuzi wa mtandao wa Ethereum.

Ikiwa mteja mmoja atapata matatizo au udhaifu, wateja wengine wanaweza kuendelea kufanya kazi vizuri, na kuzuia hatari ya kushindwa kwa mfumo mzima (single point of failure). Zaidi ya hayo, utekelezaji wa anuwai ya wateja hukuza ubunifu na ushindani, na kuchochea maboresho na kupunguza hatari ya utamaduni mmoja (monoculture) ndani ya mfumo ikolojia.

## Usomaji zaidi {#further-reading}

- [Potal Netwoki (Piper Merriam katika Devcon Bogota)](https://www.youtube.com/watch?v=0stc9jnQLXA).
- [Discord ya Potal Netwoki](https://discord.gg/CFFnmE7Hbs)
- [Tovuti ya Potal Netwoki](https://www.ethportal.net/)