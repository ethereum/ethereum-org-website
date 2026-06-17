---
title: Kuweka hisa kama huduma
description: Jifunze kuhusu kuweka hisa kama huduma
lang: sw
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: Kifaru Leslie akielea mawinguni.
sidebarDepth: 2
summaryPoints:
  - Waendeshaji wa nodi wa tatu hushughulikia uendeshaji wa kiteja chako cha mthibitishaji
  - Chaguo zuri kwa yeyote aliye na 32 ETH ambaye hajisikii vizuri kushughulika na utata wa kiufundi wa kuendesha nodi
  - Punguza uaminifu, na udumishe umiliki wa funguo zako za utoaji
---

## Kuweka hisa kama huduma ni nini? {#what-is-staking-as-a-service}

Kuweka hisa kama huduma (“SaaS") inawakilisha kategoria ya huduma za uwekaji dhamana ambapo unaweka 32 ETH zako mwenyewe kwa ajili ya mthibitishaji, lakini unakaimisha shughuli za nodi kwa mwendeshaji wa tatu. Mchakato huu kwa kawaida unahusisha kuongozwa kupitia usanidi wa awali, ikijumuisha uzalishaji wa ufunguo na uwekaji, kisha kupakia funguo zako za kusaini kwa mwendeshaji. Hii inaruhusu huduma kuendesha mthibitishaji wako kwa niaba yako, kwa kawaida kwa ada ya kila mwezi.

## Kwa nini uweke dhamana na huduma? {#why-stake-with-a-service}

Itifaki ya [Ethereum](/) haiauni asili ukaimishaji wa dhamana, kwa hivyo huduma hizi zimejengwa ili kukidhi hitaji hili. Ikiwa una 32 ETH za kuweka dhamana, lakini hujisikii vizuri kushughulika na maunzi, huduma za SaaS zinakuruhusu kukaimisha sehemu ngumu huku ukipata tuzo za asili za kitalu.

<Grid>
  <Card title="Your own validator" emoji=":desktop_computer:" description="Deposit your own 32 ETH to activate your own set of signing keys that will participate in Ethereum consensus. Monitor your progress with dashboards to watch those ETH rewards accumulate." />
  <Card title="Easy to start" emoji="🏁" description="Forget about hardware specs, setup, node maintenance and upgrades. SaaS providers let you outsource the hard part by uploading your own signing credentials, allowing them to run a validator on your behalf, for a small cost." />
  <Card title="Limit your risk" emoji=":shield:" description="In many cases users do not have to give up access to the keys that enable withdrawing or transferring staked funds. These are different from the signing keys, and can be stored separately to limit (but not eliminate) your risk as a staker." />
</Grid>

<StakingComparison page="saas" />

## Mambo ya kuzingatia {#what-to-consider}

Kuna idadi inayokua ya watoa huduma za SaaS wa kukusaidia kuweka dhamana ya ETH yako, lakini wote wana faida na hatari zao wenyewe. Chaguzi zote za SaaS zinahitaji dhana za uaminifu za ziada ikilinganishwa na uwekaji dhamana wa nyumbani. Chaguzi za SaaS zinaweza kuwa na msimbo wa ziada unaofunika wateja wa Ethereum ambao hauko wazi au unaoweza kukaguliwa. SaaS pia ina athari mbaya kwa ugatuzi wa mtandao. Kulingana na usanidi, unaweza usidhibiti mthibitishaji wako - mwendeshaji anaweza kutenda kwa udanganyifu akitumia ETH yako.

Viashiria vya sifa vinatumika hapa chini kuashiria nguvu au udhaifu unaojulikana ambao mtoa huduma wa SaaS aliyeorodheshwa anaweza kuwa nao. Tumia sehemu hii kama rejeleo la jinsi tunavyofafanua sifa hizi unapochagua huduma ya kusaidia katika safari yako ya uwekaji dhamana.

<StakingConsiderations page="saas" />

## Chunguza watoa huduma za uwekaji dhamana {#saas-providers}

Hapa chini kuna baadhi ya watoa huduma za SaaS wanaopatikana. Tumia viashiria vilivyo hapo juu kukusaidia kukuongoza kupitia huduma hizi

<ProductDisclaimer />

### Watoa huduma za SaaS {#saas-providers-2}

<StakingProductsCardGrid category="saas" />

Tafadhali kumbuka umuhimu wa kuunga mkono [anuwai ya wateja](/developers/docs/nodes-and-clients/client-diversity/) kwani inaboresha usalama wa mtandao, na kupunguza hatari yako. Huduma ambazo zina ushahidi wa kupunguza matumizi ya wateja walio wengi zinaonyeshwa kwa <em style={{ textTransform: "uppercase" }}>"anuwai ya kiteja cha utekelezaji"</em> na <em style={{ textTransform: "uppercase" }}>"anuwai ya mteja wa mwafaka."</em>

### Waundaji wa Funguo {#key-generators}

<StakingProductsCardGrid category="keyGen" />

Una pendekezo la mtoa huduma wa kuweka hisa kama huduma ambaye tumemkosa? Angalia [sera yetu ya uorodheshaji wa bidhaa](/contributing/adding-staking-products/) ili kuona kama itafaa, na kuiwasilisha kwa ukaguzi.

## Maswali yanayoulizwa mara kwa mara {#faq}

<ExpandableCard title="Nani anashikilia funguo zangu?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Mipangilio itatofautiana kutoka kwa mtoa huduma hadi mtoa huduma, lakini kwa kawaida utaongozwa kupitia usanidi wa funguo zozote za kusaini unazohitaji (moja kwa kila 32 ETH), na kupakia hizi kwa mtoa huduma wako ili kuwaruhusu kuthibitisha kwa niaba yako. Funguo za kusaini pekee hazitoi uwezo wowote wa kutoa, kuhamisha, au kutumia fedha zako. Hata hivyo, zinatoa uwezo wa kupiga kura kuelekea mwafaka, ambayo isipofanywa ipasavyo inaweza kusababisha adhabu za nje ya mtandao au ukataji.
</ExpandableCard>

<ExpandableCard title="Kwa hivyo kuna seti mbili za funguo?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Ndiyo. Kila akaunti inajumuisha funguo za <em>kusaini</em> za BLS, na funguo za <em>utoaji</em> za BLS. Ili mthibitishaji athibitishe hali ya mnyororo, ashiriki katika kamati za usawazishaji na kupendekeza vitalu, funguo za kusaini lazima zifikike kwa urahisi na kiteja cha mthibitishaji. Hizi lazima ziunganishwe kwenye intaneti kwa namna fulani, na hivyo kiasili huchukuliwa kuwa funguo "moto". Hili ni hitaji kwa mthibitishaji wako kuweza kuthibitisha, na hivyo funguo zinazotumika kuhamisha au kutoa fedha zinatenganishwa kwa sababu za kiusalama.

Funguo za utoaji za BLS zinatumika kusaini ujumbe wa mara moja unaotangaza ni akaunti gani ya tabaka la utekelezaji ambayo tuzo za uwekaji dhamana na fedha zilizotolewa zinapaswa kwenda. Pindi ujumbe huu unapotangazwa, funguo za <em>utoaji za BLS</em> hazihitajiki tena. Badala yake, udhibiti wa fedha zilizotolewa unakaimishwa kabisa kwa anwani uliyotoa. Hii inakuruhusu kuweka anwani ya utoaji iliyolindwa kupitia hifadhi yako baridi, ikipunguza hatari kwa fedha za mthibitishaji wako, hata kama mtu mwingine anadhibiti funguo za kusaini za mthibitishaji wako.

Kusasisha vitambulisho vya uondoaji ni hatua inayohitajika ili kuwezesha utoaji\*. Mchakato huu unahusisha kuzalisha funguo za utoaji kwa kutumia kirai cha mbegu chako cha kukumbukwa.

<strong>Hakikisha unahifadhi nakala ya kirai cha mbegu hiki kwa usalama au hutaweza kuzalisha funguo zako za utoaji wakati utakapofika.</strong>

\*Waweka dhamana waliotoa anwani ya utoaji wakati wa uwekaji wa awali hawahitaji kuweka hii. Wasiliana na mtoa huduma wako wa SaaS kwa usaidizi kuhusu jinsi ya kuandaa mthibitishaji wako.
</ExpandableCard>

<ExpandableCard title="Ninaweza kutoa lini?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Waweka dhamana wanahitaji kutoa anwani ya utoaji (kama haikutolewa kwenye uwekaji wa awali), na malipo ya tuzo yataanza kusambazwa kiotomatiki kwa msingi wa mara kwa mara kila baada ya siku chache.

Wathibitishaji wanaweza pia kujitoa kikamilifu kama mthibitishaji, ambayo itafungua salio lao la ETH lililosalia kwa utoaji. Akaunti ambazo zimetoa anwani ya utoaji ya utekelezaji na kukamilisha mchakato wa kujitoa zitapokea salio lao lote kwenye anwani ya utoaji iliyotolewa wakati wa ufagiaji unaofuata wa mthibitishaji.

<ButtonLink href="/staking/withdrawals/">Zaidi kuhusu utoaji wa uwekaji dhamana</ButtonLink>
</ButtonLink>

<ExpandableCard title="Nini kinatokea ikiwa nitakatwa?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Kwa kutumia mtoa huduma wa SaaS, unakabidhi uendeshaji wa nodi yako kwa mtu mwingine. Hii inakuja na hatari ya utendakazi duni wa nodi, ambayo haiko chini ya udhibiti wako. Ikitokea mthibitishaji wako amekumbwa na ukataji, salio la mthibitishaji wako litaadhibiwa na kuondolewa kwa nguvu kutoka kwenye kundi la wathibitishaji.

Baada ya kukamilika kwa mchakato wa ukataji/kujitoa, fedha hizi zitahamishiwa kwenye anwani ya utoaji iliyopewa mthibitishaji. Hii inahitaji kutoa anwani ya utoaji ili kuwezesha. Hii inaweza kuwa ilitolewa kwenye uwekaji wa awali. Kama sivyo, funguo za utoaji za mthibitishaji zitahitaji kutumika kusaini ujumbe unaotangaza anwani ya utoaji. Ikiwa hakuna anwani ya utoaji iliyotolewa, fedha zitasalia zimefungwa hadi itakapotolewa.

Wasiliana na mtoa huduma binafsi wa SaaS kwa maelezo zaidi kuhusu dhamana zozote au chaguzi za bima, na kwa maelekezo ya jinsi ya kutoa anwani ya utoaji. Ikiwa ungependelea kuwa na udhibiti kamili wa usanidi wa mthibitishaji wako, [jifunze zaidi kuhusu jinsi ya kuweka dhamana ya ETH yako peke yako](/staking/solo/).
</ExpandableCard>

## Usomaji zaidi {#further-reading}

- [Saraka ya Uwekaji Dhamana ya Ethereum](https://www.staking.directory/) - _Eridian na Spacesider_
- [Kutathmini Huduma za Uwekaji Dhamana](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_