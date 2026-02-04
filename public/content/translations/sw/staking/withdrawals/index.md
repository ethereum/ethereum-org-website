---
title: Uondoji wa hisa
description: Ukurasa unaofupisha nini ni "staking push withdrawals", jinsi zinavyofanya kazi, na nini stakers wanahitaji kufanya ili kupata zawadi zao
lang: sw
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Leslie kifaru akiwa na zawadi zake za staking
sidebarDepth: 2
summaryPoints:
  - Sasisho la Shanghai/Capella liliwezesha uondoaji wa staking kwenye Ethereum
  - Waendeshaji wa validator lazima watoe anwani ya uondoaji ili kuwezesha
  - Zawadi zinasambazwa kiotomatiki kila baada ya siku chache
  - Validator wanaoacha kabisa staking watapokea salio lao lililobaki
---

**Uondoaji wa staking** unarejelea uhamisho wa ETH kutoka kwa akaunti ya mthibitishaji kwenye safu ya makubaliano ya Ethereum (Mnyororo Kioleza), hadi kwenye safu ya utekelezaji ambapo inaweza kufanyiwa miamala.

**Malipo ya zawadi ya salio la ziada** zaidi ya 32 ETH yatatumwa kiotomatiki na mara kwa mara kwa anwani ya uondoaji iliyounganishwa kwa kila mthibitishaji, pindi itakapowekwa na mtumiaji. Watumiaji wanaweza pia **kuacha staking kabisa**, na kufungua salio lao lote la mthibitishaji.

## Zawadi za Kusimamisha {#staking-rewards}

Malipo ya zawadi yanashughulikiwa kiotomatiki kwa akaunti za validator zinazofanya kazi na salio la juu la 32 ETH.

Salio lolote zaidi ya 32 ETH lililopatikana kupitia zawadi halichangii kwenye mtaji mkuu, au kuongeza uzito wa validator huyu kwenye mtandao, na hivyo hutolewa kiotomatiki kama malipo ya zawadi kila baada ya siku chache. Kando na kutoa anwani ya uondoaji mara moja, zawadi hizi hazihitaji hatua yoyote kutoka kwa mwendeshaji wa validator. Hii yote inaanzishwa kwenye safu ya makubaliano, hivyo hakuna gesi (ada ya muamala) inayohitajika katika hatua yoyote.

### Tumefikaje hapa? {#how-did-we-get-here}

Katika miaka michache iliyopita, Ethereum imepitia maboresho kadhaa ya mtandao ikibadilika kuwa mtandao unaolindwa na ETH yenyewe, badala ya uchimbaji unaotumia nishati nyingi kama ilivyokuwa awali. Kushiriki katika makubaliano kwenye Ethereum sasa kunajulikana kama "staking", ambapo washiriki wamefunga ETH kwa hiari, kuiweka "hatarini" kwa uwezo wa kushiriki kwenye mtandao. Watumiaji wanaofuata sheria watapata zawadi, wakati majaribio ya kudanganya yanaweza kuadhibiwa.

Tangu kuzinduliwa kwa mkataba wa amana ya staking mnamo Novemba 2020, baadhi ya waanzilishi wa Ethereum wamefunga fedha kwa hiari ili kuanzisha "validators", akaunti maalum ambazo zina haki ya kuthibitisha na kupendekeza vitalu, zikifuata sheria za mtandao.

Kabla ya sasisho la Shanghai/Capella, hukuweza kutumia au kufikia ETH yako iliyowekwa kwenye staking. Lakini sasa, unaweza kuchagua kupokea zawadi zako kiotomatiki kwenye akaunti uliyochagua, na pia unaweza kutoa ETH yako iliyowekwa kwenye staking wakati wowote unapotaka.

### Niandae vipi? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Matangazo muhimu {#important-notices}

Kutoa anwani ya uondoaji ni hatua inayohitajika kwa akaunti yoyote ya validator kabla ya kuwa na sifa ya kutoa ETH kutoka kwenye salio lake.

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription><strong>Kila akaunti ya mthibitishaji inaweza tu kupewa anwani moja ya uondoaji, mara moja.</strong> Mara tu anwani inapochaguliwa na kuwasilishwa kwenye safu ya makubaliano, hii haiwezi kutenduliwa au kubadilishwa tena. Hakiki maradufu umiliki na usahihi wa anwani iliyotolewa kabla ya kuwasilisha.
</AlertDescription>
</AlertContent>
</Alert>

Hakuna <strong>tishio lolote kwa fedha zako kwa sasa</strong> kwa kutotoa hii, ikichukuliwa kuwa fungu la maneno yako ya mnemonic/msingi limebaki salama nje ya mtandao, na halijaathiriwa kwa njia yoyote. Kukosa kuongeza stakabadhi za uondoaji kutaacha tu ETH ikiwa imefungwa kwenye akaunti ya mthibitishaji kama ilivyokuwa hadi anwani ya uondoaji itakapotolewa.

## Kuacha staking kabisa {#exiting-staking-entirely}

Kutoa anwani ya uondoaji kunahitajika kabla _fedha zozote_ haziwezi kuhamishwa kutoka kwa salio la akaunti ya mthibitishaji.

Watumiaji wanaotaka kuacha staking kabisa na kutoa salio lao lote lazima pia watie sahihi na kutangaza ujumbe wa "kujiondoa kwa hiari" na funguo za mthibitishaji ambao utaanza mchakato wa kujiondoa kwenye staking. Hii inafanywa na mteja wako wa kithibitishaji na kuwasilishwa kwenye nodi yako ya makubaliano, na haihitaji gesi.

Mchakato wa mthibitishaji kujiondoa kwenye staking huchukua muda tofauti, kulingana na wangapi wengine wanajiondoa kwa wakati mmoja. Mara tu itakapokamilika, akaunti hii haitawajibika tena kwa kutekeleza majukumu ya mtandao wa mthibitishaji, haistahiki tena zawadi, na haina tena ETH yake "iliyowekwa hisa". Kwa wakati huu akaunti itawekwa alama kuwa "inayoweza kutolewa" kikamilifu.

Mara tu akaunti itakapotiwa alama ya "inayoweza kutolewa", na stakabadhi za uondoaji zimetolewa, hakuna kingine ambacho mtumiaji anahitaji kufanya isipokuwa kusubiri. Akaunti hufagiliwa kiotomatiki na mfululizo na wapendekezaji wa bloku kwa ajili ya fedha zinazostahiki zilizotolewa, na salio la akaunti yako litahamishwa kikamilifu (pia inajulikana kama "uondoaji kamili") wakati wa <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>ufagiaji</a> unaofuata.

## Uondoaji wa staking uliwashwa lini? {#when}

Utendaji wa uondoaji uliwezeshwa kama sehemu ya sasisho la Shanghai/Capella lililotokea **tarehe 12 Aprili 2023**.

Sasisho la Shanghai/Capella liliwezesha ETH iliyokuwa imewekwa hisa awali kurejeshwa kwenye akaunti za kawaida za Ethereum. Hii ilifunga mduara juu ya ukwasi wa staking, na kuleta Ethereum hatua moja karibu zaidi katika safari yake ya kujenga mfumo ikolojia endelevu, unaoweza kupanuka, na salama uliogatuliwa.

- [Zaidi kuhusu historia ya Ethereum](/ethereum-forks/)
- [Zaidi kuhusu mpango wa maendeleo wa Ethereum](/roadmap/)

## Malipo ya uondoaji hufanyaje kazi? {#how-do-withdrawals-work}

Iwapo mthibitishaji fulani anastahiki uondoaji au la huamuliwa na hali ya akaunti ya mthibitishaji yenyewe. Hakuna ingizo la mtumiaji linalohitajika wakati wowote ili kubaini kama akaunti inapaswa kuanzishiwa uondoaji au la—mchakato mzima unafanywa kiotomatiki na safu ya makubaliano katika mzunguko unaoendelea.

### Wewe ni mwanafunzi wa kuona zaidi? {#visual-learner}

Angalia maelezo haya ya uondoaji wa staking wa Ethereum na Finematics:

<YouTube id="RwwU3P9n3uo" />

### "Ufagiaji" wa Mthibitishaji {#validator-sweeping}

Wakati mthibitishaji amepangiwa kupendekeza bloku inayofuata, inatakiwa kuunda foleni ya uondoaji, ya hadi uondoaji 16 unaostahiki. Hii inafanywa kwa kuanza na faharasa ya mthibitishaji 0, kubaini kama kuna uondoaji unaostahiki kwa akaunti hii kulingana na sheria za itifaki, na kuiongeza kwenye foleni ikiwa ipo. Seti ya mthibitishaji iliyopangwa kupendekeza bloku inayofuata itaendelea pale ambapo ya mwisho iliishia, ikiendelea kwa utaratibu bila kikomo.

<Alert variant="update">
<AlertEmoji text="🕛"/>
<AlertContent>
<AlertDescription>
Fikiria kuhusu saa ya analojia. Mkono kwenye saa unaelekeza kwenye saa, huendelea kwa mwelekeo mmoja, hauruki saa zozote, na hatimaye huzunguka na kurudi mwanzo tena baada ya nambari ya mwisho kufikiwa.<br/><br/>
Sasa badala ya 1 hadi 12, fikiria saa ina 0 hadi N <em>(jumla ya idadi ya akaunti za wathibitishaji ambazo zimewahi kusajiliwa kwenye safu ya makubaliano, zaidi ya 500,000 kufikia Jan 2023).</em><br/><br/>
Mkono kwenye saa unaelekeza kwa mthibitishaji anayefuata anayehitaji kukaguliwa kwa ajili ya uondoaji unaostahiki. Huanza saa 0, na huendelea kuzunguka bila kuruka akaunti zozote. Mthibitishaji wa mwisho anapofikiwa, mzunguko unaendelea tena mwanzoni.
</AlertDescription>
</AlertContent>
</Alert>

#### Kukagua akaunti kwa ajili ya uondoaji {#checking-an-account-for-withdrawals}

Wakati mpendekezaji anafagia wathibitishaji kwa ajili ya uondoaji unaowezekana, kila mthibitishaji anayekaguliwa anapimwa dhidi ya mfululizo mfupi wa maswali ili kubaini kama uondoaji unapaswa kuanzishwa, na ikiwa ndivyo, ni kiasi gani cha ETH kinapaswa kutolewa.

1. **Je, anwani ya uondoaji imetolewa?** Ikiwa hakuna anwani ya uondoaji iliyotolewa, akaunti inarukwa na hakuna uondoaji unaoanzishwa.
2. **Je, mthibitishaji amejiondoa na anaweza kutoa?** Ikiwa mthibitishaji amejiondoa kabisa, na tumefikia epoki ambapo akaunti yake inachukuliwa kuwa "inayoweza kutolewa", basi uondoaji kamili utachakatwa. Hii itahamisha salio lote lililobaki kwenye anwani ya uondoaji.
3. **Je, salio halisi limefikia kiwango cha juu cha 32?** Ikiwa akaunti ina stakabadhi za uondoaji, haijatoka kikamilifu, na ina zawadi zaidi ya 32 zinazosubiri, uondoaji kiasi utachakatwa ambao utahamisha tu zawadi zilizo juu ya 32 kwenye anwani ya uondoaji ya mtumiaji.

Kuna vitendo viwili tu vinavyochukuliwa na waendeshaji wa vithibitishaji wakati wa mzunguko wa maisha wa mthibitishaji ambavyo huathiri mtiririko huu moja kwa moja:

- Toa stakabadhi za uondoaji ili kuwezesha aina yoyote ya uondoaji
- Toka kwenye mtandao, jambo ambalo litaanzisha uondoaji kamili

### Bila gesi {#gas-free}

Njia hii ya uondoaji wa staking huepuka kuwataka waweka hisa kuwasilisha muamala wao wenyewe wakiomba kiasi fulani cha ETH kitolewe. Hii inamaanisha hakuna **gesi (ada ya muamala) inayohitajika**, na uondoaji pia haushindani na nafasi iliyopo ya bloku ya safu ya utekelezaji.

### Nitapata zawadi zangu za staking mara ngapi? {#how-soon}

Uondoaji wa juu wa 16 unaweza kuchakatwa katika bloku moja. Kwa kiwango hicho, uondoaji wa wathibitishaji 115,200 unaweza kuchakatwa kwa siku (kwa kuchukulia hakuna nafasi zilizokosekana). Kama ilivyoelezwa hapo juu, wathibitishaji wasio na uondoaji unaostahiki watarukwa, na kupunguza muda wa kumaliza ufagiaji.

Kwa kupanua hesabu hii, tunaweza kukadiria muda utakaotumika kuchakata idadi fulani ya uondoaji:

<TableContainer>

| Idadi ya uondoaji |    Muda wa kukamilisha   |
| :---------------: | :----------------------: |
|      400,000      | siku 3.5 |
|      500,000      | siku 4.3 |
|      600,000      | siku 5.2 |
|      700,000      | siku 6.1 |
|      800,000      | siku 7.0 |

</TableContainer>

Kama unavyoona, hii hupungua kasi kadiri wathibitishaji wengi wanavyokuwa kwenye mtandao. Ongezeko la nafasi zilizokosekana linaweza kupunguza kasi hii kwa uwiano, lakini kwa ujumla hii itawakilisha upande wa polepole wa matokeo yanayowezekana.

## Maswali yanayoulizwa mara kwa mara {#faq}

<ExpandableCard
title="Mara tu nitakapotoa anwani ya uondoaji, naweza kuibadilisha na anwani mbadala ya uondoaji?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
Hapana, mchakato wa kutoa stakabadhi za uondoaji ni wa mara moja tu, na hauwezi kubadilishwa baada ya kuwasilishwa. </ExpandableCard>

<ExpandableCard
title="Kwa nini anwani ya uondoaji inaweza kuwekwa mara moja tu?"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
Kwa kuweka anwani ya uondoaji ya safu ya utekelezaji, stakabadhi za uondoaji za mthibitishaji huyo hubadilishwa kabisa. Hii inamaanisha stakabadhi za zamani hazitafanya kazi tena, na stakabadhi mpya zinaelekeza kwenye akaunti ya safu ya utekelezaji.

Anwani za uondoaji zinaweza kuwa mkataba-erevu (unadhibitiwa na msimbo wake), au akaunti inayomilikiwa nje (EOA, inayodhibitiwa na ufunguo wake binafsi). Kwa sasa akaunti hizi hazina njia ya kuwasiliana na ujumbe kurudi kwenye safu ya makubaliano ambayo ingeashiria mabadiliko ya stakabadhi za mthibitishaji, na kuongeza utendaji huu kungeongeza ugumu usio wa lazima kwenye itifaki.

Kama mbadala wa kubadilisha anwani ya uondoaji kwa mthibitishaji fulani, watumiaji wanaweza kuchagua kuweka mkataba-erevu kama anwani yao ya uondoaji ambayo inaweza kushughulikia uzungushaji wa funguo, kama vile Safe. Watumiaji wanaoweka fedha zao kwenye EOA zao wenyewe wanaweza kutoka kikamilifu ili kutoa fedha zao zote zilizowekwa hisa, na kisha kuweka hisa tena kwa kutumia stakabadhi mpya. </ExpandableCard>

<ExpandableCard
title="Vipi nikishiriki kwenye staking ya tokeni au staking ya pamoja?"
eventCategory="FAQ"
eventAction="What if I participate in staking tokens or pooled staking"
eventName="read more">

Ikiwa wewe ni sehemu ya [bwawa la staking](/staking/pools/) au unamiliki tokeni za staking, unapaswa kuwasiliana na mtoa huduma wako kwa maelezo zaidi kuhusu jinsi uondoaji wa staking unavyoshughulikiwa, kwani kila huduma hufanya kazi tofauti.

Kwa ujumla, watumiaji wanapaswa kuwa huru kudai ETH yao ya msingi iliyowekwa hisa, au kubadilisha mtoa huduma wa staking wanayemtumia. Ikiwa bwawa fulani linakuwa kubwa sana, fedha zinaweza kutolewa, kukombolewa, na kuwekwa hisa tena na <a href="https://rated.network/">mtoa huduma mdogo</a>. Au, ikiwa umekusanya ETH ya kutosha unaweza [kuweka hisa kutoka nyumbani](/staking/solo/).

</ExpandableCard>

<ExpandableCard
title="Je, malipo ya zawadi (uondoaji kiasi) hufanyika kiotomatiki?"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">
Ndiyo, mradi tu mthibitishaji wako ametoa anwani ya uondoaji. Hii lazima itolewe mara moja ili kuwezesha uondoaji wowote, kisha malipo ya zawadi yataanzishwa kiotomatiki kila baada ya siku chache kwa kila ufagiaji wa mthibitishaji. </ExpandableCard>

<ExpandableCard
title="Je, uondoaji kamili hufanyika kiotomatiki?"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

Hapana, ikiwa mthibitishaji wako bado anafanya kazi kwenye mtandao, uondoaji kamili hautafanyika kiotomatiki. Hii inahitaji kuanzisha mwenyewe kujiondoa kwa hiari.

Mara tu mthibitishaji anapokamilisha mchakato wa kutoka, na kwa kuchukulia kuwa akaunti ina stakabadhi za uondoaji, salio lililobaki <em>litatolewa</em> wakati wa <a href="#validator-sweeping">ufagiaji wa mthibitishaji</a> unaofuata.

</ExpandableCard>

<ExpandableCard title="Je, naweza kutoa kiasi maalum?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
Uondoaji umeundwa kusukumwa kiotomatiki, ukihamisha ETH yoyote ambayo haichangii kikamilifu kwenye hisa. Hii inajumuisha salio kamili kwa akaunti ambazo zimekamilisha mchakato wa kutoka.

Haiwezekani kuomba mwenyewe kiasi maalum cha ETH kitolewe. </ExpandableCard>

<ExpandableCard
title="Ninaendesha mthibitishaji. Ninaweza kupata wapi habari zaidi juu ya kuwezesha uondoaji?"
eventCategory="FAQ"
eventAction="I operate a validator. Ninaweza kupata wapi habari zaidi juu ya kuwezesha uondoaji?"
eventName="read more">

Waendeshaji wa vithibitishaji wanapendekezwa kutembelea ukurasa wa <a href="https://launchpad.ethereum.org/withdrawals/">Staking Launchpad Withdrawals</a> ambapo utapata maelezo zaidi kuhusu jinsi ya kuandaa mthibitishaji wako kwa ajili ya uondoaji, muda wa matukio, na maelezo zaidi kuhusu jinsi uondoaji unavyofanya kazi.

Ili kujaribu usanidi wako kwenye testnet kwanza, tembelea <a href="https://hoodi.launchpad.ethereum.org">Hoodi Testnet Staking Launchpad</a> ili kuanza.

</ExpandableCard>

<ExpandableCard
title="Je, naweza kuamilisha tena mthibitishaji wangu baada ya kutoka kwa kuweka ETH zaidi?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
Hapana. Mara tu mthibitishaji anapotoka na salio lake lote limetolewa, fedha zozote za ziada zilizowekwa kwa mthibitishaji huyo zitahamishiwa kiotomatiki kwenye anwani ya uondoaji wakati wa ufagiaji wa mthibitishaji unaofuata. Ili kuweka hisa tena ETH, mthibitishaji mpya lazima aamilishwe. </ExpandableCard>

## Masomo zaidi {#further-reading}

- [Staking Launchpad Withdrawals](https://launchpad.ethereum.org/withdrawals)
- [EIP-4895: Uondoaji wa kushinikiza wa Mnyororo Kioleza kama operesheni](https://eips.ethereum.org/EIPS/eip-4895)
- [PEEPanEIP #94: Uondoaji wa ETH Iliyowekwa Hisa (Majaribio) na Potuz & Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Uondoaji wa kushinikiza wa Mnyororo Kioleza kama operesheni na Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Kuelewa Salio Halisi la Mthibitishaji](https://www.attestant.io/posts/understanding-validator-effective-balance/)
