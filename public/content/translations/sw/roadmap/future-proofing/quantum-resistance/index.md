---
title: Kriptografia ya baada ya kwanta kwenye Ethereum
description: Jinsi Ethereum inavyojiandaa kwa enzi ya baada ya kwanta, nini kiko hatarini, na nini kinajengwa ili kuilinda.
lang: sw
image: /images/roadmap/roadmap-future.png
alt: "Ramani ya njia ya Ethereum"
template: roadmap
summaryPoints:
  - Kompyuta za kwanta hatimaye zitatishia kriptografia ambayo Ethereum inatumia leo
  - Taasisi ya Ethereum ina timu maalum ya utafiti wa baada ya kwanta, na ramani ya njia iliyopangwa ya "Lean Ethereum" inayolenga 2029 kwa ulinzi kamili wa baada ya kwanta
  - Fedha zako ziko salama leo na programu ya mkoba itakuongoza kupitia uhamiaji wa siku zijazo
---

Kompyuta za kwanta hatimaye zitaweza kuvunja mbinu za kriptografia zinazolinda Ethereum na mifumo mingine mingi ya kidijitali leo. Ukurasa huu unaeleza maana ya hilo, jinsi mtandao unavyoendeleza maboresho kwa vitendo ili kupunguza hatari hii, na kile unachohitaji kujua.

## Kwa nini kriptografia ya baada ya kwanta ni muhimu {#why-post-quantum-matters}

Ethereum inategemea aina kadhaa za [kriptografia](/glossary/#cryptography) ili kuweka mtandao salama na kulinda fedha za watumiaji. Muhimu zaidi ni:

- **Kanuni ya sahihi ya kidijitali ya tao la duaradufu (ECDSA)**: Kriptografia inayotumika kutia sahihi miamala. Usalama wa akaunti yako ya Ethereum unategemea hili.
- **Sahihi za BLS**: Hutumiwa na [wathibitishaji](/glossary/#validator) kufikia [mwafaka](/glossary/#consensus) kuhusu hali ya mtandao.
- **Vifungamanisho vya polinomiali vya KZG**: Hutumiwa kwa [upatikanaji wa data](/glossary/#data-availability) katika ramani ya njia ya kuongeza viwango ya Ethereum.
- **Mifumo ya uthibitisho wa ZK**: Hutumiwa na mikusanyiko na programu zingine kuthibitisha ukokotoaji nje ya mnyororo.

Hizi zote zinategemea miundo ya kihisabati, kama vile makundi ya Abelian, ambayo ni magumu kwa kompyuta za kawaida lakini yanaweza kutatuliwa kwa ufanisi na kompyuta ya kwanta kwa kutumia [kanuni ya Shor](https://en.wikipedia.org/wiki/Shor%27s_algorithm).

### Lini kompyuta za kwanta zitatishia Ethereum? {#when-will-quantum-computers-threaten-ethereum}

Mnamo Machi 2026, Google Quantum AI ilichapisha utafiti unaokadiria kuwa kuvunja kriptografia ya tao la duaradufu ya biti 256 (aina ambayo Ethereum inatumia kwa sahihi za akaunti) kunaweza kuhitaji takriban kyubiti 1,200 za kimantiki. Makadirio ya awali yaliweka nambari hii juu zaidi. Google imeweka tarehe ya mwisho ya ndani ya 2029 kwa kuhamisha mifumo yake yenyewe kwenye kriptografia ya baada ya kwanta.

Vifaa vya sasa vya kwanta viko mbali na kiwango hiki, vikifanya kazi na maelfu machache ya kyubiti za kimwili zenye kelele. Kyubiti za kimantiki (ambazo husahihisha makosa na kufanya ukokotoaji wa kuaminika) zinahitaji kyubiti nyingi za kimwili kila moja. **Pengo kati ya vifaa vya sasa na kile kinachohitajika kuvunja kriptografia ya Ethereum bado ni kubwa, lakini linapungua kwa kasi zaidi kuliko wengi walivyotarajia.** Hasa, Taasisi ya Kitaifa ya Viwango na Teknolojia ya Marekani (NIST) inatarajia kuacha kutumia ECDSA ifikapo 2030 na kuipiga marufuku ifikapo 2035.

Hili si tishio la karibu. Lakini mabadiliko ya kriptografia huchukua miaka, na muundo wa usalama wa Ethereum umeundwa kudumu kwa karne nyingi. Jibu la Ethereum ni ramani ya njia ya **Lean Ethereum**, dhamira ya makusudi, ya miaka mingi ya kujenga upya Ethereum kuzunguka misingi ambayo itanusurika tishio lolote la kriptografia.

## Maeneo manne yaliyo hatarini kwa shambulio la kwanta {#four-vulnerable-areas}

Mnamo Februari 2026, Vitalik Buterin [alichapisha ramani ya njia](https://x.com/VitalikButerin/status/2027075026378543132) inayotambua maeneo manne tofauti ya kriptografia ya Ethereum ambayo yanahitaji uboreshaji wa baada ya kwanta. Kila moja ina changamoto tofauti na njia tofauti za utatuzi.

### 1. Sahihi za BLS za tabaka la mwafaka {#consensus-bls}

**Inachofanya**: Itifaki ya [Uthibitisho wa Dau (PoS)](/glossary/#pos) ya Ethereum inatumia sahihi za BLS kukusanya kura kutoka kwa mamia ya maelfu ya wathibitishaji. BLS inaruhusu sahihi nyingi kuunganishwa kuwa moja, kuweka mtandao kuwa na ufanisi.

**Kwa nini iko hatarini**: Sahihi za BLS zinategemea uoanishaji wa tao la duaradufu, ambao kompyuta ya kwanta inaweza kuvunja.

**Mbinu**: Ramani ya njia ya Lean Consensus inajumuisha kuunda zana mbili zinazokamilishana:
- **leanXMSS**: Ethereum itabadilisha sahihi za BLS na leanXMSS, mpango wa sahihi unaotegemea heshi kwa wathibitishaji. Sahihi zinazotegemea heshi zinachukuliwa kuwa salama kwa kwanta kwa sababu zinategemea tu usalama wa vitendaji vya heshi, ambavyo kompyuta za kwanta hudhoofisha lakini hazivunji.
- **leanVM**: zkVM (mashine pepe ya sifuri-maarifa) ndogo kwa ajili ya mkusanyiko wa sahihi unaotegemea SNARK. Kwa sababu sahihi zinazotegemea heshi ni kubwa zaidi (takriban baiti 3,000 ikilinganishwa na baiti 96 kwa BLS), kubadili kwenda leanXMSS kutazalisha data nyingi zaidi kwa kila sloti. Ili kutatua hili, leanVM inafanya kazi kama injini ya mkusanyiko, ikikandamiza data kwa mara 250. Hii inahifadhi faida za ufanisi za kuunganisha sahihi nyingi kuwa moja, hata baada ya kubadili kwenda kwenye mipango salama kwa kwanta.

<ExpandableCard title="Kwa nini Ethereum haiwezi tu kubadilisha BLS na mfumo salama dhidi ya kwanta?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked why cant ethereum just replace BLS?">

Sifa ya mkusanyiko inayofanya BLS iwe na ufanisi (kuunganisha mamia ya maelfu ya sahihi kuwa moja) haina mbadala wa wazi ulio salama kwa kwanta. Sahihi za baada ya kwanta pia ni kubwa zaidi kuliko sahihi za BLS. Kubadilisha tu moja kwa nyingine kungefanya tabaka la mwafaka la Ethereum kuwa polepole zaidi na ghali zaidi. Ndiyo maana timu inajenga leanVM, zana inayotumia uthibitisho wa maarifa-sifuri kukusanya sahihi salama kwa kwanta kwa ufanisi.

</ExpandableCard>

### 2. Upatikanaji wa data: Vifungamanisho vya KZG {#data-availability-kzg}

**Inachofanya**: Vifungamanisho vya polinomiali vya KZG vinahakikisha kuwa data (hasa data ya [blobu](/glossary/#blob) kutoka kwenye mikusanyiko) inapatikana kwenye mtandao bila kuhitaji kila nodi kupakua yote.

**Kwa nini iko hatarini**: Vifungamanisho vya KZG vinategemea uoanishaji wa tao la duaradufu, muundo uleule wa kihisabati ambao kompyuta za kwanta zinaweza kushambulia.

**Upunguzaji wa sasa**: Vifungamanisho vya KZG vinatumia "usanidi unaoaminika" ambapo washiriki wengi walichangia unasibu. Ilimradi angalau mshiriki mmoja alikuwa mwaminifu na kutupa siri yake, usanidi huo ni salama, hata dhidi ya kompyuta za kwanta zinazojaribu kuubadilisha baada ya tukio.

**Suluhisho la muda mrefu**: Badilisha KZG na mpango wa ufungamanisho ulio salama kwa kwanta. Wagombea wawili wanaoongoza ni:
- **Vifungamanisho vinavyotegemea STARK**: Vinategemea vitendaji vya heshi badala ya matao ya duaradufu. Tayari vinatumika katika baadhi ya mikusanyiko ya ZK.
- **Vifungamanisho vinavyotegemea latisi**: Vinategemea ugumu wa matatizo ya latisi, ambayo yanaaminika kuwa sugu kwa kwanta.

Mbinu zote mbili bado zinafanyiwa utafiti kwa ufanisi na utendaji katika kiwango cha Ethereum.

### 3. Sahihi za akaunti: ECDSA {#eoa-signatures}

**Inachofanya**: Kila akaunti ya kawaida ya Ethereum (akaunti inayomilikiwa na nje, au [EOA](/glossary/#eoa)) inatumia ECDSA kwenye tao la secp256k1 kutia sahihi miamala. Hiki ndicho kinacholinda fedha zako.

**Kwa nini iko hatarini**: Kwa akaunti yoyote ambayo imetuma muamala, ufunguo wa umma unafichuliwa mnyororoni. Kompyuta ya kwanta inaweza kupata ufunguo wa siri kutoka kwa data hii ya ufunguo wa umma iliyofichuliwa.

**Tofauti muhimu**: Akaunti ambazo zimepokea Etha pekee na hazijawahi kutuma muamala hazijafichua ufunguo wao wa umma. Anwani pekee (heshi ya ufunguo wa umma) ndiyo inayoonekana, ambayo hutoa ulinzi wa ziada.

**Mbinu**: Badala ya uhamiaji mmoja wa itifaki nzima, Ethereum inapanga kutumia [udhanifu wa akaunti](/roadmap/account-abstraction/) (haswa EIP-8141, inayozingatiwa kwa Hegotá katika nusu ya pili ya 2026) kuwapa watumiaji **wepesi wa sahihi**. Akaunti binafsi zinaweza kubadili kwenda kwenye mpango wa sahihi wa baada ya kwanta bila kusubiri itifaki nzima kubadilika.

Hii ni mbinu ya kiutendaji. Watumiaji na mikoba inayotaka ulinzi wa baada ya kwanta mapema wanaweza kuikubali kwa hiari, huku uhamiaji mpana ukifanyika kadiri muda unavyopita.

### 4. Uthibitisho wa ZK wa tabaka la programu {#zk-proofs}

**Inachofanya**: Mifumo ya uthibitisho wa maarifa-sifuri inatumiwa na mikusanyiko ya tabaka la 2 (l2) na programu zingine kuthibitisha ukokotoaji bila kufichua data ya msingi.

**Kwa nini iko hatarini**: Mifumo mingi maarufu ya uthibitisho wa ZK (SNARKs zinazotumia uoanishaji wa tao la duaradufu) inategemea mawazo yaliyo hatarini kwa kwanta.

**Mbinu**: STARKs, ambazo zinategemea vitendaji vya heshi badala ya matao ya duaradufu, tayari ni sugu kwa kwanta na zinatumiwa na mikusanyiko kadhaa. Kupitishwa kwa asili kwa mfumo wa ikolojia kwa mifumo inayotegemea STARK tayari kunatoa usalama wa baada ya kwanta kwenye tabaka la programu.

## Viwango vya NIST {#nist-standards}

Mnamo Agosti 2024, Taasisi ya Kitaifa ya Viwango na Teknolojia ya Marekani (NIST) [ilikamilisha viwango vitatu vya kriptografia ya baada ya kwanta](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards). Hivi ni muhimu kwa sababu vinaipa tasnia nzima ya teknolojia, ikiwa ni pamoja na Ethereum, seti ya pamoja ya kanuni zilizokaguliwa za kujenga juu yake badala ya kila mradi kuvumbua zake.

| Kiwango | Jina | Aina | Kesi ya matumizi |
|----------|------|------|----------|
| FIPS 203 | ML-KEM | Inayotegemea latisi | Ufungaji wa ufunguo (ubadilishanaji wa ufunguo) |
| FIPS 204 | ML-DSA (Dilithium) | Inayotegemea latisi | Sahihi za kidijitali |
| FIPS 205 | SLH-DSA (SPHINCS+) | Inayotegemea heshi | Sahihi za kidijitali |

Viwango hivi vinatoa msingi kwa mpito mpana wa tasnia wa baada ya kwanta. Kazi ya Ethereum inajenga na kupanua haya, kwa kuzingatia hasa changamoto za kipekee za mtandao uliogatuliwa ambapo ufanisi na mkusanyiko ni muhimu.

## Mbinu ya Taasisi ya Ethereum {#ef-approach}

Taasisi ya Ethereum iliunda timu maalum ya Usalama wa Baada ya Kwanta mnamo Januari 2026, ikiongozwa na Thomas Coratger. Kazi ya timu inafuatiliwa hadharani kwenye [pq.ethereum.org](https://pq.ethereum.org).

### Shughuli ya sasa (kuanzia Aprili 2026) {#current-activity}

- **Mitandao ya wasanidi ya mwingiliano ya kila wiki**: Zaidi ya timu 10 za wateja zinashiriki katika majaribio ya mara kwa mara ya mwingiliano wa baada ya kwanta, ikiwa ni pamoja na Lighthouse, Grandine, Zeam, Ream Labs, na PierTwo.
- **Tuzo ya Poseidon**: Tuzo ya utafiti ya dola milioni 1 inayolenga maboresho katika misingi ya kriptografia inayotegemea heshi.
- **Utekelezaji wa chanzo wazi**: leanXMSS, leanVM, leanSpec (Python), leanSig (Rust), na leanMultisig zote zinapatikana chini ya [shirika la GitHub la leanEthereum](https://github.com/leanEthereum).
- **Mafungo ya 2 ya Kila Mwaka ya Utafiti wa PQ**: Yamepangwa kuanzia tarehe 9-Okt-2026 hadi 12-Okt-2026 huko Cambridge, Uingereza.
- **Ulinganifu wa NIST**: Kazi ya Ethereum inajengwa juu ya viwango vya kriptografia ya baada ya kwanta vilivyokamilishwa na NIST mnamo Agosti 2024 (kama vile ML-KEM, ML-DSA, na SLH-DSA).

### Hatua muhimu za uhamiaji {#migration-milestones}

Timu imeelezea mfululizo wa uboreshaji wa itifaki ili kuanzisha hatua kwa hatua kriptografia ya baada ya kwanta kwenye Ethereum. Hizi ni hatua muhimu za kupanga, sio ahadi zilizohakikishwa. Majina na mpangilio vinaweza kubadilika.

| Hatua muhimu | Inachotambulisha |
|-----------|--------------------|
| I* | Sajili ya ufunguo wa PQ. Wathibitishaji wanaweza kusajili funguo za umma za baada ya kwanta pamoja na funguo zilizopo za BLS. |
| J* | Mikusanyiko ya awali ya uthibitishaji wa sahihi ya PQ. Mikataba mahiri na mikoba inaweza kuthibitisha sahihi za PQ kiasili. |
| L* | Uthibitisho wa PQ na uthibitisho wa wakati halisi wa tabaka la mwafaka kupitia leanVM. Wathibitishaji wanaanza kutumia sahihi za PQ kwa mwafaka. |
| M* | Mkusanyiko kamili wa sahihi ya PQ na vifungamanisho vya blobu vilivyo salama kwa PQ. |

**Lengo**: Hatua muhimu za mchepuo zilizopangwa zinalenga kukamilika kwa miundombinu ya msingi ya baada ya kwanta ifikapo takriban 2029. Uhamiaji kamili wa tabaka la utekelezaji na mfumo wa ikolojia unaendelea zaidi ya hapo.

## Watumiaji wanahitaji kufanya nini? {#what-users-need-to-do}

**Sasa hivi: hakuna.** Fedha zako ziko salama. Hakuna kompyuta ya kwanta leo inayoweza kutishia kriptografia ya Ethereum.

**Katika siku zijazo**: Pindi mipango ya sahihi ya baada ya kwanta itakapoungwa mkono kwa upana kwenye Ethereum (inatarajiwa kufuatia mchepuo mgumu wa Hegotá na utekelezaji wa EIP-8141), utataka kuhamisha akaunti yako kwenye sahihi salama kwa kwanta. Programu ya mkoba itakuongoza kupitia mpito huu.

Ikiwa akaunti yako haijawahi kutuma muamala (ikimaanisha ufunguo wako wa umma haujafichuliwa mnyororoni), ina tabaka la ziada la ulinzi. Lakini akaunti zote zinapaswa kuhamia hatimaye.

Swali la jinsi ya kushughulikia mikoba iliyolala (akaunti ambazo wamiliki wake wanaweza wasijue hitaji la kuhamia) ni mada wazi ya utawala. Jumuiya ya Ethereum bado haijafikia mwafaka kuhusu hili.

## Maswali yanayoulizwa mara kwa mara {#faq}

<ExpandableCard title="Je, kompyuta za kwanta zinaweza kuiba ETH yangu leo?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked can quantum computers steal my ETH today?">

**Hapana.** Hakuna kompyuta ya kwanta leo inayoweza kuvunja kriptografia ya Ethereum. Vifaa vya sasa vya kwanta viko mbali na kiwango kinachohitajika. Kazi iliyoelezwa kwenye ukurasa huu ni maandalizi kwa ajili ya siku zijazo, si jibu kwa tishio linaloendelea.

</ExpandableCard>

<ExpandableCard title="Lini kompyuta za kwanta zinaweza kuwa tishio?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked when could quantum computers become a threat?">

Makadirio yanatofautiana. Utafiti wa Google wa Machi 2026 unapendekeza vifaa vinavyohitajika kuvunja kriptografia ya tao la duaradufu ya biti 256 vinaweza kufika wakati fulani karibu na mwisho wa muongo huu mapema zaidi, lakini changamoto kubwa za uhandisi zimesalia. Watafiti wengi wanaona tishio la kweli kuwa miaka kadhaa mbali kwa kiwango cha chini. Jibu la kweli ni kwamba hakuna anayejua ratiba kamili, ambayo ndiyo sababu hasa kujiandaa sasa ni muhimu.

</ExpandableCard>

<ExpandableCard title="Je, nitahitaji kufanya chochote ili kulinda mkoba wangu?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked will I need to do anything?">

Hatimaye, ndiyo. Pindi mipango ya sahihi ya baada ya kwanta itakapopatikana kwenye Ethereum, watumiaji watataka kuhamisha akaunti zao. Programu ya mkoba huenda itashughulikia mpito huu kwa ajili yako. Kwa sasa, hakuna unachohitaji kufanya. Wakati hatua inahitajika, jumuiya ya Ethereum na wasanidi wa mkoba watatoa mwongozo wazi na zana.

</ExpandableCard>

<ExpandableCard title="Vipi kuhusu tokeni zangu, NFT, na nafasi za DeFi?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked what about tokens NFTs DeFi?">

Mali kwenye Ethereum zinadhibitiwa na sahihi za akaunti. Pindi akaunti yako itakapohamishiwa kwenye mpango wa sahihi ulio salama kwa kwanta, kila kitu katika akaunti hiyo kinalindwa. Huhitaji kuhamisha kila mali moja moja. Mikataba mahiri inayoshikilia fedha (kama itifaki za fedha zilizogatuliwa (DeFi)) inaweza kuhitaji uboreshaji wao wenyewe kulingana na misingi gani ya kriptografia wanayotumia ndani.

</ExpandableCard>

<ExpandableCard title="Je, Ethereum iko nyuma ya minyororo mingine ya vitalu kwenye hili?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked is Ethereum behind?">

Hapana. Ethereum ina mojawapo ya programu zilizopangwa zaidi za baada ya kwanta za mnyororo wa vitalu wowote: timu maalum, utafiti unaofadhiliwa, mitandao ya wasanidi ya kila wiki, na ramani ya njia ya uhamiaji iliyochapishwa, ikichukulia kompyuta ya kwanta kama kizuizi cha muundo wa daraja la kwanza. Hakuna mnyororo wa vitalu ambao umekamilisha mpito kamili wa baada ya kwanta bado. Kulingana na makadirio ya Taasisi ya Ethereum, mfiduo wa fedha zilizolala zilizo hatarini kwa kwanta za Ethereum ni takriban 0.1%, chini sana kuliko mitandao mingine mikubwa ya mnyororo wa vitalu.

</ExpandableCard>

<ExpandableCard title="Je, 'vuna sasa, fumbua fiche baadaye' ni nini?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked what is harvest now decrypt later?">

"Vuna sasa, simbusa baadaye" ni shambulio ambapo mtu hurekodi data iliyosimbwa fiche au funguo za umma zilizofichuliwa leo, kisha huvunja usimbaji fiche baadaye pindi kompyuta ya kwanta yenye nguvu ya kutosha itakapokuwepo. Kwa Ethereum, hii inafaa zaidi kwa akaunti ambazo funguo zake za umma tayari zimefichuliwa mnyororoni (akaunti yoyote ambayo imetuma muamala). Hii ni sababu moja inayofanya jumuiya ichukulie uhamiaji wa baada ya kwanta kama unaozingatia wakati ingawa tishio la kwanta bado si la mara moja.

</ExpandableCard>

## Usomaji zaidi {#further-reading}

- [pq.ethereum.org](https://pq.ethereum.org) - _Taasisi ya Ethereum_
- [Mradi wa Kriptografia ya Baada ya Kwanta](https://pse.dev/projects/post-quantum-cryptography) - _Privacy Stewards of Ethereum (PSE)_
- [Viwango vya Kriptografia ya Baada ya Kwanta vya NIST](https://csrc.nist.gov/projects/post-quantum-cryptography) - _NIST_
- [Kulinda sarafu-fiche kwa kufichua udhaifu wa kwanta kwa uwajibikaji](https://research.google/blog/safeguarding-cryptocurrency-by-disclosing-quantum-vulnerabilities-responsibly/) - _Google Quantum AI_
- [Mipaka ya kwanta inaweza kuwa karibu kuliko inavyoonekana](https://blog.google/innovation-and-ai/technology/safety-security/cryptography-migration-timeline/) - _Google_
- [KZG na usanidi unaoaminika](/roadmap/danksharding/#what-is-kzg)
- [Rasilimali za warsha ya leanVM + PQ ya Lean Week Cambridge (2025)](https://github.com/leanEthereum/pm/blob/main/workshops-and-interops/2025/lean-week-cambridge/index.md) - _Lean Ethereum_
- [Simu za Mapumziko za ACD za Sahihi za Muamala wa PQ](https://youtube.com/playlist?list=PLJqWcTqh_zKEOum3uR0odkH59fmGUYuZB) - _Taasisi ya Ethereum_
- [Simu za Mapumziko za ACD za Mwingiliano wa PQ](https://youtube.com/playlist?list=PLJqWcTqh_zKF_Q9HNXBLW_AtktsjToTIu) - _Taasisi ya Ethereum_
- [Orodha ya Kucheza ya YouTube ya Lean Ethereum na Usalama wa Baada ya Kwanta](https://youtube.com/playlist?list=PLJqWcTqh_zKGGuO_q1dgYLsfUoX1sNhWM) - _Taasisi ya Ethereum_
- [Mahojiano ya jopo kuhusu usugu wa baada ya kwanta](https://youtu.be/5DRDjeMmOPw) - _Bankless Podcast_
- [Udhanifu wa akaunti kwenye Ethereum](/roadmap/account-abstraction/)
- [strawmap.org](https://strawmap.org/) - _Usanifu wa EF_
- [Iliyowekwa Juu: Uchambuzi wa Tasnia ya Kompyuta ya Kwanta](https://www.superpositioned.co/) - _Saneel Sreeni_