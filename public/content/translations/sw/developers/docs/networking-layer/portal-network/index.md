---
title: Mtandao wa Portal
description: Muhtasari wa Mtandao wa Portal - mtandao unaoendelezwa ulioundwa kusaidia wateja wenye rasilimali chache.
lang: sw
---

Ethereum ni mtandao unaoundwa na kompyuta zinazoendesha programu ya mteja wa Ethereum. Kila moja ya kompyuta hizi inaitwa 'nodi'. Programu ya mteja inaruhusu nodi kutuma na kupokea data kwenye mtandao wa Ethereum, na inathibitisha data dhidi ya sheria za itifaki ya Ethereum. Nodi huweka data nyingi za kihistoria katika hifadhi zao za diski na huongeza juu yake zinapopokea pakiti mpya za habari, zinazojulikana kama bloku, kutoka kwa nodi zingine kwenye mtandao. Hii ni muhimu ili kuhakikisha kila wakati kwamba nodi ina taarifa inayoendana na mtandao wote. Hii inamaanisha kuendesha nodi kunaweza kuhitaji nafasi kubwa ya diski. Baadhi ya operesheni za nodi zinaweza kuhitaji RAM nyingi pia.

Ili kukabiliana na tatizo hili la hifadhi ya diski, nodi 'nyepesi' zimeundwa ambazo huomba taarifa kutoka kwa nodi kamili badala ya kuzihifadhi zote zenyewe. Hata hivyo, hii inamaanisha kuwa nodi nyepesi haithibitishi taarifa kwa kujitegemea na badala yake inaamini nodi nyingine. Inamaanisha pia kwamba nodi kamili zinahitajika kufanya kazi ya ziada ili kuhudumia nodi hizo nyepesi.

Mtandao wa Portal ni muundo mpya wa mtandao kwa ajili ya Ethereum unaolenga kutatua tatizo la upatikanaji wa data kwa nodi "nyepesi" bila kulazimika kuamini au kuongeza mzigo kwa nodi kamili, kwa kushiriki data muhimu katika vipande vidogo kwenye mtandao.

Zaidi kuhusu [nodi na wateja](/developers/docs/nodes-and-clients/)

## Kwa nini tunahitaji Mtandao wa Portal {#why-do-we-need-portal-network}

Nodi za Ethereum huhifadhi nakala zao kamili au sehemu ya mnyororo wa bloku wa Ethereum. Nakala hii ya ndani hutumiwa kuthibitisha miamala na kuhakikisha nodi inafuata mnyororo sahihi. Data hii iliyohifadhiwa ndani inaruhusu nodi kuthibitisha kwa kujitegemea kuwa data inayoingia ni halali na sahihi bila kuhitaji kuamini chombo kingine chochote.

Nakala hii ya ndani ya mnyororo wa bloku na data inayohusiana ya hali na risiti huchukua nafasi nyingi kwenye diski kuu ya nodi. Kwa mfano, diski kuu ya 2TB inapendekezwa kwa ajili ya kuendesha nodi kwa kutumia [Geth](https://geth.ethereum.org) iliyooanishwa na mteja wa makubaliano. Kwa kutumia ulandanishi wa haraka (snap sync), ambao huhifadhi tu data ya mnyororo kutoka kwa seti ya bloku za hivi karibuni, Geth kwa kawaida huchukua takriban 650GB ya nafasi ya diski lakini huongezeka kwa takriban 14GB/wiki (unaweza kupunguza nodi kurudi hadi 650GB mara kwa mara).

Hii inamaanisha kuendesha nodi kunaweza kuwa ghali, kwa sababu kiasi kikubwa cha nafasi ya diski kinapaswa kutengewa Ethereum. Kuna suluhisho kadhaa kwa tatizo hili katika mpango mkakati wa Ethereum, ikiwa ni pamoja na [kuisha muda wa historia](/roadmap/statelessness/#history-expiry), [kuisha muda wa hali](/roadmap/statelessness/#state-expiry) na [kutokuwa na hali (statelessness)](/roadmap/statelessness/). Hata hivyo, kuna uwezekano bado miaka kadhaa kabla ya haya kutekelezwa. Pia kuna [nodi nyepesi](/developers/docs/nodes-and-clients/light-clients/) ambazo hazihifadhi nakala zao za data ya mnyororo, zinaomba data wanayohitaji kutoka kwa nodi kamili. Hata hivyo, hii inamaanisha nodi nyepesi zinapaswa kuamini nodi kamili kutoa data ya kweli na pia huweka shinikizo kwa nodi kamili ambazo zinapaswa kutoa data ambayo nodi nyepesi zinahitaji.

Mtandao wa Portal unalenga kutoa njia mbadala kwa nodi nyepesi kupata data zao ambayo haihitaji kuamini au kuongeza kwa kiasi kikubwa kazi inayopaswa kufanywa na nodi kamili. Njia hii itafanywa kwa kuanzisha njia mpya kwa nodi za Ethereum kushiriki data kwenye mtandao.

## Mtandao wa Portal unafanyaje kazi? {#how-does-portal-network-work}

Nodi za Ethereum zina itifaki kali zinazofafanua jinsi zinavyowasiliana. Wateja wa utekelezaji huwasiliana kwa kutumia seti ya itifaki ndogo zinazojulikana kama [DevP2P](/developers/docs/networking-layer/#devp2p), wakati wateja wa makubaliano hutumia rundo tofauti la itifaki ndogo liitwalo [libP2P](/developers/docs/networking-layer/#libp2p). Hizi hufafanua aina za data zinazoweza kupitishwa kati ya nodi.

![devP2P na libP2P](portal-network-devp2p-libp2p.png)

Nodi pia zinaweza kutoa data maalum kupitia [API ya JSON-RPC](/developers/docs/apis/json-rpc/), ambayo ndiyo jinsi programu na mikoba hubadilishana habari na nodi za Ethereum. Hata hivyo, hakuna kati ya hizi ambazo ni itifaki bora za kutoa data kwa wateja wepesi.

Wateja wepesi kwa sasa hawawezi kuomba vipande maalum vya data ya mnyororo kupitia DevP2P au libP2p kwa sababu itifaki hizo zimeundwa tu kuwezesha ulandanishi wa mnyororo na usambazaji wa bloku na miamala. Wateja wepesi hawataki kupakua taarifa hii kwa sababu hiyo ingewazuia kuwa "wepesi".

API ya JSON-RPC si chaguo bora kwa maombi ya data ya mteja mwepesi pia, kwa sababu inategemea muunganisho kwa nodi kamili maalum au mtoa huduma wa RPC wa kati anayeweza kutoa data. Hii inamaanisha mteja mwepesi anapaswa kuamini nodi/mtoa huduma huyo maalum kuwa mwaminifu, na pia nodi kamili inaweza kulazimika kushughulikia maombi mengi kutoka kwa wateja wengi wepesi, na kuongeza mahitaji yao ya kipimo data.

Lengo la Mtandao wa Portal ni kufikiria upya muundo mzima, ukijenga mahsusi kwa ajili ya wepesi, nje ya vikwazo vya muundo wa wateja waliopo wa Ethereum.

Wazo kuu la Mtandao wa Portal ni kuchukua sehemu bora zaidi za rundo la sasa la mtandao kwa kuwezesha taarifa inayohitajika na wateja wepesi, kama vile data ya kihistoria na utambulisho wa kiongozi wa sasa wa mnyororo kutolewa kupitia mtandao mwepesi wa rika-kwa-rika uliogatuliwa wa mtindo wa DevP2P kwa kutumia [DHT](https://en.wikipedia.org/wiki/Distributed_hash_table) (sawa na Bittorrent).

Wazo ni kuongeza sehemu ndogo za jumla ya data ya kihistoria ya Ethereum na baadhi ya majukumu maalum ya nodi kwa kila nodi. Kisha, maombi yanashughulikiwa kwa kutafuta nodi zinazohifadhi data maalum iliyoombwa na kuichukua kutoka kwao.

Hii inageuza mtindo wa kawaida wa nodi nyepesi kupata nodi moja na kuomba wachuje na kutoa kiasi kikubwa cha data; badala yake, wanachuja haraka mtandao mkubwa wa nodi ambapo kila moja hushughulikia kiasi kidogo cha data.

Lengo ni kuruhusu mtandao uliogatuliwa wa wateja wepesi wa Portal kuweza:

- kufuatilia kiongozi wa mnyororo
- kulandanisha data ya hivi karibuni na ya kihistoria ya mnyororo
- kurejesha data ya hali
- kutangaza miamala
- kutekeleza miamala kwa kutumia [EVM](/developers/docs/evm/)

Faida za muundo huu wa mtandao ni:

- kupunguza utegemezi kwa watoa huduma wa kati
- Kupunguza matumizi ya kipimo data cha Intaneti
- Ulandanishi mdogo au sifuri
- Inapatikana kwa vifaa vyenye rasilimali chache (\<1 GB RAM, \<100 MB nafasi ya diski, 1 CPU)

Jedwali lililo hapa chini linaonyesha kazi za wateja waliopo ambazo zinaweza kutolewa na Mtandao wa Portal, na kuwawezesha watumiaji kupata kazi hizi kwenye vifaa vyenye rasilimali chache sana.

### Mitandao ya Portal

| Mteja mwepesi wa Beacon    | Mtandao wa hali               | Usambazaji wa miamala | Mtandao wa historia |
| -------------------------- | ----------------------------- | --------------------- | ------------------- |
| Mnyororo mwepesi wa Beacon | Hifadhi ya akaunti na mkataba | Mempool nyepesi       | Vichwa              |
| Data ya itifaki            |                               |                       | Miili ya bloku      |
|                            |                               |                       | Risiti              |

## Utofauti wa wateja kama chaguo-msingi {#client-diversity-as-default}

Wasanidi programu wa Mtandao wa Portal pia walifanya chaguo la kubuni ili kujenga wateja wanne tofauti wa Mtandao wa Portal tangu siku ya kwanza.

Wateja wa Mtandao wa Portal ni:

- [Trin](https://github.com/ethereum/trin): imeandikwa kwa Rust
- [Fluffy](https://fluffy.guide): imeandikwa kwa Nim
- [Ultralight](https://github.com/ethereumjs/ultralight): imeandikwa kwa Typescript
- [Shisui](https://github.com/zen-eth/shisui): imeandikwa kwa Go

Kuwa na utekelezaji mwingi wa wateja huru huongeza ustahimilivu na ugatuzi wa mtandao wa Ethereum.

Ikiwa mteja mmoja atapata matatizo au udhaifu, wateja wengine wanaweza kuendelea kufanya kazi vizuri, na kuzuia chanzo kimoja cha kushindwa. Zaidi ya hayo, utekelezaji mbalimbali wa wateja huchochea uvumbuzi na ushindani, na kusababisha maboresho na kupunguza hatari ya utamaduni mmoja ndani ya mfumo ikolojia.

## Masomo zaidi {#further-reading}

- [Mtandao wa Portal (Piper Merriam katika Devcon Bogota)](https://www.youtube.com/watch?v=0stc9jnQLXA).
- [Discord ya Mtandao wa Portal](https://discord.gg/CFFnmE7Hbs)
- [Tovuti ya Mtandao wa Portal](https://www.ethportal.net/)
