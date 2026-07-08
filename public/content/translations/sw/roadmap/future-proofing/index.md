---
title: Kuimarisha Ethereum kwa siku zijazo na usalama wa kwanta wa kriptografia
description: Maboresho haya yanaimarisha Ethereum kama tabaka la msingi thabiti na lililogatuliwa kwa ajili ya siku zijazo, haijalishi nini kitatokea.
lang: sw
image: /images/roadmap/roadmap-future.png
alt: "Ramani ya njia ya Ethereum"
template: roadmap
summaryPoints:
  - Kriptografia ya baada ya kwanta inahakikisha Ethereum inaweza kustahimili vitisho vya maunzi ya hali ya juu kadiri kompyuta za kwanta zinavyoendelea
  - Kurahisisha itifaki hufanya Ethereum iwe rahisi kudumisha, kukagua, na kulinda
  - Maboresho ya hivi karibuni tayari yameleta maendeleo makubwa ya ufanisi
---

Baadhi ya sehemu za ramani ya njia hazihusu kuongeza uwezo au kulinda Ethereum sasa hivi. Zinahusu kuifanya Ethereum **iwe thabiti na ya kutegemewa kwa siku zijazo**. Hii inamaanisha kujiandaa kwa aina mpya za vitisho na kuondoa utata usio wa lazima kutoka kwenye itifaki.

## Ustahimilivu dhidi ya kwanta {#quantum-resistance}

Ethereum hutumia [kriptografia](/glossary/#cryptography) kuweka mtandao salama na kulinda fedha za watumiaji. Hatimaye, baadhi ya mbinu hizi za kriptografia zitakuwa **katika hatari dhidi ya kompyuta za kwanta**, ambazo zinaweza kutatua matatizo maalum ya hisabati kwa haraka sana kuliko mashine za kawaida.

**Hakuna kompyuta ya kwanta inayoweza kuvunja kriptografia ya Ethereum leo.** Maunzi yanayohitajika bado hayapo kwa kiwango kikubwa. Lakini utafiti wa hivi karibuni unapendekeza pengo linapungua kwa kasi zaidi kuliko ilivyotarajiwa hapo awali. Mnamo Machi 2026, Google Quantum AI ilichapisha karatasi inayokadiria kuwa kuvunja kriptografia ya tao la duaradufu ya biti 256 (aina ambayo Ethereum hutumia kwa sahihi za akaunti) kunaweza kuhitaji takriban kiyubiti (qubits) za kimantiki 1,200, karibu mara 20 chini ya makadirio ya awali. Google imeweka tarehe ya mwisho ya ndani ya 2029 kwa ajili ya kuhamisha mifumo yake yenyewe kwenda kwenye kriptografia salama dhidi ya kwanta.

Mabadiliko ya kriptografia huchukua miaka kupanga na kutekeleza kwa usalama. Kwa sababu muundo wa usalama wa Ethereum umeundwa kudumu kwa miongo kadhaa, maandalizi ya baada ya kwanta yalikuwa kwenye ramani ya njia ya Ethereum kabla hayajawa kwenye vichwa vya habari kuu. Maandalizi ya mtandao yanafanyika sasa ili kuhakikisha mpito usio na mshikemshike, si kama jibu la dharura.

### Nini kiko hatarini? {#what-is-at-risk}

Maeneo manne makuu ya kriptografia ya Ethereum yametambuliwa kama yanayohitaji maboresho ya baada ya kwanta:

1. **Sahihi za mwafaka (BLS)**: [Wathibitishaji](/glossary/#validator) hutumia sahihi za BLS kupiga kura kwenye [vitalu](/glossary/#block) halali. Kompyuta ya kwanta inaweza kughushi sahihi hizi.
2. **Upatikanaji wa data (mafungamanisho ya KZG)**: [Mifumo ya ufungamanisho](/roadmap/danksharding/#what-is-kzg) inayosaidia Ethereum kuongeza uwezo inategemea hisabati (haswa, uoanishaji wa tao la duaradufu) ambayo iko hatarini dhidi ya mashambulizi ya kwanta.
3. **Sahihi za akaunti (ECDSA)**: Mfumo wa sahihi unaolinda akaunti binafsi za Ethereum. Wakati akaunti inatuma muamala, ufunguo wa umma wake unawekwa wazi mnyororoni. Kompyuta ya kwanta inaweza kupata ufunguo wa siri kutoka kwenye ufunguo huu wa umma uliowekwa wazi, na hivyo kuruhusu wizi wa fedha.
4. **Uthibitisho wa ZK wa tabaka la programu**: Mifumo ya uthibitisho wa maarifa-sifuri inayotumiwa na mikusanyiko na programu zingine inategemea dhana za kriptografia ambazo kompyuta za kwanta zinaweza kudhoofisha.

<ExpandableCard title="Je, kompyuta za kwanta zinaweza kuiba ETH yangu leo?" eventCategory="/roadmap/future-proofing" eventName="clicked can quantum computers steal my ETH today?">

Hapana. Hakuna kompyuta ya kwanta leo inayoweza kuvunja kriptografia ya Ethereum. Kazi iliyoelezwa kwenye ukurasa huu ni maandalizi kwa ajili ya siku zijazo, si jibu kwa tishio linaloendelea. Wakati mikoba ya baada ya kwanta itakapopatikana, programu ya mkoba itakuongoza kupitia uhamishaji. Kwa sasa, hakuna unachohitaji kufanya.

</ExpandableCard>

### Nini kinafanyika? {#what-is-being-done}

Kwa sasa Ethereum ndiyo mtetezi anayechukua hatua madhubuti zaidi dhidi ya vitisho vya kwanta katika mfumo wa ikolojia wa mnyororo wa vitalu. Taasisi ya Ethereum iliunda **timu maalum ya Usalama wa Baada ya Kwanta** mnamo Januari 2026, na kazi inayoendelea inahusisha timu nyingi za wateja na vikundi vya utafiti. Kazi ya timu ya Baada ya Kwanta ya EF inafuatiliwa hadharani kwenye [pq.ethereum.org](https://pq.ethereum.org).

Kazi inayoendelea inajumuisha:

- **Sahihi zinazotegemea heshi (leanXMSS)**: Mbadala salama dhidi ya kwanta kwa ajili ya sahihi za mthibitishaji, uliojengwa kwenye utendakazi wa heshi ambao kompyuta za kwanta haziwezi kuvunja kwa ufanisi.
- **zkVM ndogo (leanVM)**: Kwa sababu sahihi salama dhidi ya kwanta ni kubwa kuliko sahihi zinazotumika sasa, leanXMSS inaunganishwa na zkVM ndogo (leanVM). Injini hii inakusanya sahihi salama dhidi ya kwanta kwa ufanisi, ikikandamiza data mara 250, ili mtandao ubaki na kasi baada ya mpito.
- **Majaribio ya mwingiliano ya kila wiki**: Zaidi ya timu 10 za wateja zinashiriki katika mitandao ya wasanidi (devnets) ya kawaida ya baada ya kwanta.
- **Upatikanaji wa data:** Kuboresha kriptografia ya msingi inayotumika kushughulikia kiasi kikubwa cha data ya mtandao kutahakikisha Ethereum inabaki na kasi na nafuu kutumia bila kuhatarisha udhaifu wa kwanta wa siku zijazo.
- **Tuzo ya Poseidon**: Tuzo ya utafiti ya dola milioni 1 inayolenga maboresho katika misingi ya kriptografia inayotegemea heshi.
- **Viwango vya NIST**: Taasisi ya Kitaifa ya Viwango na Teknolojia ya Marekani ilikamilisha viwango vitatu vya kriptografia ya baada ya kwanta mnamo Agosti 2024 (ML-KEM, ML-DSA, SLH-DSA). Kazi ya Ethereum inajengwa kwenye misingi hii.

Sehemu muhimu ya mkakati wa mpito ni **EIP-8141**, ambayo inaleta [udhanifu wa akaunti](/roadmap/account-abstraction/) asilia. Hii inaruhusu akaunti binafsi kuchagua uthibitishaji wao wenyewe wa sahihi, ikimaanisha watumiaji wanaweza kubadili kwenda kwenye sahihi salama dhidi ya kwanta **bila kusubiri uhamishaji mmoja wa itifaki nzima**. EIP-8141 inafikiriwa kwa ajili ya mchepuo mgumu wa Hegotá (uliopangwa kwa nusu ya pili ya 2026).

Taasisi ya Ethereum imeainisha hatua muhimu za mchepuo zilizopangwa zinazolenga kukamilika kwa miundombinu ya msingi ya baada ya kwanta ifikapo takriban 2029. Haya ni malengo ya kupanga, si ahadi zilizohakikishwa.

<ButtonLink variant="outline" href="/roadmap/future-proofing/quantum-resistance/">Zaidi kuhusu ustahimilivu dhidi ya kwanta</ButtonLink>
## Ethereum rahisi na yenye ufanisi zaidi {#simpler-more-efficient-ethereum}

Utata hutengeneza fursa za hitilafu na udhaifu. Sehemu ya ramani ya njia inalenga **kurahisisha Ethereum na kuondoa deni la kiufundi** ili itifaki iwe rahisi kudumisha, kukagua, na kuelewa.

### Nini kimetolewa {#what-has-been-delivered}

Maboresho kadhaa ya hivi karibuni yameifanya Ethereum kuwa rahisi na yenye ufanisi zaidi:

- **[Pectra (Mei 2025)](/roadmap/pectra/)**: Ilileta EIP-7702, ambayo inaruhusu akaunti zinazomilikiwa na watu wa nje kukaimisha kwa muda kwenye msimbo wa mkataba mahiri, hatua kuelekea [udhanifu wa akaunti](/roadmap/account-abstraction/) kamili. Pia iliongeza prikampaili ya BLS12-381 (EIP-2537), ushughulikiaji wa amana mnyororoni (EIP-6110), ufikiaji wa heshi ya kitalu cha kihistoria katika EVM (EIP-2935), na kuongeza salio la juu zaidi la ufanisi kwa wathibitishaji (EIP-7251).
- **[Fusaka (Desemba 2025)](/roadmap/fusaka/)**: Ilisambaza PeerDAS (EIP-7594), mfumo wa sampuli wa upatikanaji wa data wa rika-kwa-rika ambao unasambaza mzigo wa kazi wa upatikanaji wa data kwenye mtandao. Pia iliongeza vigezo vya blobu, ikipanua uwezo wa upitishaji wa data kwa ajili ya [mikusanyiko](/glossary/#rollups).
- **[Dencun (Machi 2024)](/roadmap/dencun/)**: Ilileta miamala ya blobu (EIP-4844) kwa ajili ya data ya rollup ya bei nafuu na kuzuia `SELFDESTRUCT` (EIP-6780) ili kuondoa chanzo cha muda mrefu cha utata.
- **[London (Agosti 2021)](/ethereum-forks/#london)**: Ilifanyia marekebisho makubwa upangaji bei wa [gesi](/glossary/#gas) kwa EIP-1559, ikileta ada ya msingi na utaratibu wa kuteketeza kwa ajili ya gharama za muamala zinazotabirika zaidi.

### Nini kinaendelea {#what-is-in-progress}

- **[Glamsterdam (iliyopangwa nusu ya kwanza ya 2026)](/roadmap/glamsterdam/)**: Inafikiriwa kujumuishwa: utengano wa mpendekezaji na mjengaji (PBS) uliowekwa rasmi (EIP-7732), orodha za ufikiaji za kiwango cha kitalu (EIP-7928), na kupanga upya bei ya gesi ili kuoanisha vyema gharama na matumizi halisi ya rasilimali.
- **Hegotá (iliyopangwa nusu ya pili ya 2026)**: Inafikiriwa kujumuishwa: [Miti ya Verkle](/roadmap/verkle-trees/), ikibadilisha muundo wa sasa wa data na ule wenye ufanisi zaidi unaowezesha wateja wasio na hali (stateless clients). Pia inalengwa kwa EIP-8141 (udhanifu wa akaunti asilia).
- **Inayoendelea**: Juhudi za kurahisisha [EVM](/developers/docs/evm/), kuoanisha utekelezaji wa wateja, na kuondoa hatua kwa hatua vipengele vilivyopitwa na wakati zinaendelea katika jumuiya nzima ya maendeleo ya Ethereum.

## Maendeleo ya sasa {#current-progress}

Kufikia mapema 2026:

**Kurahisisha na ufanisi**: Pectra na Fusaka zilileta maboresho halisi katika unyumbufu wa akaunti, upatikanaji wa data, na shughuli za mthibitishaji. Glamsterdam na Hegotá ziko katika maendeleo endelevu zikiwa na malengo wazi ya kuufanya mtandao uwe thabiti na wenye ufanisi zaidi, huku zikiondoa utegemezi wa nje.

**Kriptografia ya baada ya kwanta**: Utafiti unaoendelea na utekelezaji wa mapema unafanyika. Mfumo wa ikolojia umefadhili tuzo za utafiti na kuendesha mitandao ya wasanidi (devnets) ya mwingiliano ya kila wiki kwenye wateja wengi, pamoja na utafiti unaofanywa na timu maalum ya Baada ya Kwanta ya Taasisi ya Ethereum. Ingawa hatua muhimu za mchepuo zilizopangwa zinalenga takriban 2029 kwa ajili ya kukamilika, utafiti wa mapema unatoa vidokezo vya uthibitisho vinavyoonekana vinavyoonyesha kuwa utekelezaji wa baada ya kwanta unawezekana leo.

**Udhanifu wa akaunti na wepesi wa sahihi**: EIP-7702 ilitolewa katika Pectra. EIP-8141, inayofikiriwa kwa ajili ya Hegotá, itaruhusu akaunti kutumia mfumo wowote wa sahihi, ikiwapa watumiaji njia ya kupitisha sahihi salama dhidi ya kwanta kabla ya mpito kamili wa itifaki kukamilika.

Hakuna sehemu ya kazi hii iliyokamilika. Ratiba ni malengo, si ahadi. Lakini upeo na kasi ya maendeleo inayoendelea inawakilisha dhamira ya wazi ya kuiweka Ethereum salama na yenye ufanisi kwa muda mrefu.

**Usomaji zaidi**

- [Kriptografia ya baada ya kwanta kwenye Ethereum](/roadmap/future-proofing/quantum-resistance/)
- [strawmap.org](https://strawmap.org/) - _Usanifu wa EF_
- [pq.ethereum.org](https://pq.ethereum.org)
- [Gesi](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Miundo ya data](/developers/docs/data-structures-and-encoding/)
