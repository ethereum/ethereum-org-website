---
title: Mazoezi bora ya ubunifu wa Mabadilishano yaliyogatuliwa (DEX)
description: Mwongozo unaoelezea maamuzi ya UX/UI kwa ajili ya kubadilishana tokeni.
lang: sw
---

Tangu kuzinduliwa kwa Uniswap mnamo 2018, kumekuwa na mamia ya mabadilishano yaliyogatuliwa yaliyozinduliwa katika makumi ya minyororo tofauti.
Mengi ya haya yalileta vipengele vipya au kuongeza mabadiliko yao, lakini kiolesura kimebaki sawa kwa ujumla.

Sababu moja ya hii ni [Sheria ya Jakob](https://lawsofux.com/jakobs-law/):

> Watumiaji hutumia muda wao mwingi kwenye tovuti zingine. Hii inamaanisha kuwa watumiaji wanapendelea tovuti yako ifanye kazi kwa njia sawa na tovuti zingine zote ambazo tayari wanazijua.

Shukrani kwa wavumbuzi wa awali kama Uniswap, Pancakeswap, na Sushiswap, watumiaji wa DeFi wana wazo la pamoja la jinsi DEX inavyoonekana.
Kwa sababu hii, kitu kama “mazoezi bora” sasa kinaibuka. Tunaona maamuzi zaidi na zaidi ya ubunifu yakisanifishwa katika tovuti zote. Unaweza kuona mabadiliko ya DEXes kama mfano mkubwa wa kuijaribu moja kwa moja. Vitu vilivyofanya kazi vilibaki, visivyofanya kazi, vilitupiliwa mbali. Bado kuna nafasi ya mtindo wa kipekee, lakini kuna viwango fulani ambavyo DEX inapaswa kuzingatia.

Makala hii ni muhtasari wa:

- nini cha kujumuisha
- jinsi ya kuifanya iweze kutumika iwezekanavyo
- njia kuu za kubinafsisha ubunifu

Violezo vyote vya mfano vilitengenezwa mahususi kwa ajili ya makala hii, ingawa vyote vinatokana na miradi halisi.

Seti ya Figma pia imejumuishwa chini - jisikie huru kuitumia na kuharakisha violezo vyako mwenyewe!

## Muundo wa msingi wa DEX {#basic-anatomy-of-a-dex}

Kwa ujumla, UI ina vipengele vitatu:

1. Fomu kuu
2. Kitufe
3. Paneli ya maelezo

![UI ya DEX ya kawaida, inayoonyesha vipengele vitatu vikuu](./1.png)

## Tofauti {#variations}

Hii itakuwa mada ya kawaida katika makala hii, lakini kuna njia mbalimbali tofauti ambazo vipengele hivi vinaweza kupangwa. “Paneli ya maelezo” inaweza kuwa:

- Juu ya kitufe
- Chini ya kitufe
- Imefichwa kwenye paneli ya akodioni
- Na/au kwenye modal ya “hakikisho”

Zingatia Modal ya “hakikisho” si ya lazima, lakini ikiwa unaonyesha maelezo machache sana kwenye UI kuu, inakuwa muhimu.

## Muundo wa fomu kuu {#structure-of-the-main-form}

Hili ndilo kisanduku ambapo unachagua tokeni unayotaka kubadilisha. Sehemu hiyo ina sehemu ya kuingiza data na kitufe kidogo mfululizo.

Kwa kawaida DEX huonyesha maelezo ya ziada katika safu moja juu na safu moja chini, ingawa hii inaweza kusanidiwa tofauti.

![Safu ya kuingiza, yenye safu ya maelezo juu na chini](./2.png)

## Tofauti {#variations2}

Tofauti mbili za UI zimeonyeshwa hapa; moja bila mipaka yoyote, na kutengeneza ubunifu ulio wazi sana, na moja ambapo safu ya kuingiza ina mpaka, na kutengeneza mwelekeo kwenye kipengele hicho.

![Tofauti mbili za UI za fomu kuu](./3.png)

Muundo huu wa msingi huruhusu **maelezo manne muhimu** kuonyeshwa katika ubunifu: moja katika kila kona. Ikiwa kuna safu moja tu ya juu/chini, basi kuna nafasi mbili tu.

Wakati wa mabadiliko ya DeFi, mambo mengi tofauti yamejumuishwa hapa.

## Maelezo muhimu ya kujumuisha {#key-info-to-include}

- Salio katika mkoba
- Kitufe cha Max
- Thamani sawa ya Fiat
- Athari ya bei kwenye kiasi “kilichopokelewa”

Katika siku za mwanzo za DeFi, thamani sawa ya fiat mara nyingi ilikuwa haipo. Ikiwa unaunda mradi wa aina yoyote wa Web3, ni muhimu thamani sawa ya fiat ionyeshwe. Watumiaji bado wanafikiri kulingana na sarafu za ndani, kwa hivyo ili kuendana na mifumo ya akili ya ulimwengu halisi, hii inapaswa kujumuishwa.

Kwenye sehemu ya pili (ile unayochagua tokeni unayobadilisha) unaweza pia kujumuisha athari ya bei karibu na kiasi cha sarafu ya fiat, kwa kukokotoa tofauti kati ya kiasi cha kuingiza na kiasi kinachokadiriwa cha kutoa. Haya ni maelezo muhimu sana ya kujumuisha.

Vitufe vya asilimia (k.m., 25%, 50%, 75%) vinaweza kuwa kipengele muhimu, lakini vinachukua nafasi zaidi, huongeza wito zaidi wa kuchukua hatua, na kuongeza mzigo zaidi wa kiakili. Sawa na vitelezi vya asilimia. Baadhi ya maamuzi haya ya UI yatategemea chapa yako na aina ya mtumiaji wako.

Maelezo ya ziada yanaweza kuonyeshwa chini ya fomu kuu. Kwa kuwa aina hii ya maelezo ni kwa ajili ya watumiaji wa kitaalamu, inaleta maana ama:

- kuweka iwe ndogo iwezekanavyo, au;
- kuificha kwenye paneli ya akodioni

![Maelezo yaliyoonyeshwa kwenye pembe za fomu hiyo kuu](./4.png)

## Maelezo ya ziada ya kujumuisha {#extra-info-to-include}

- Bei ya tokeni
- Slippage
- Kiwango cha chini kilichopokelewa
- Matokeo yanayotarajiwa
- Athari ya bei
- Makadirio ya gharama ya gesi
- Ada zingine
- Uelekezaji wa agizo

Kwa ubishi, baadhi ya maelezo haya yanaweza kuwa ya hiari.

Uelekezaji wa agizo unavutia, lakini haileti tofauti kubwa kwa watumiaji wengi.

Baadhi ya maelezo mengine ni kurudia tu jambo lile lile kwa njia tofauti. Kwa mfano “kiwango cha chini kilichopokelewa” na “slippage” ni pande mbili za sarafu moja. Ikiwa umeweka slippage kuwa 1%, basi kiwango cha chini unachoweza kutarajia kupokea = matokeo yanayotarajiwa-1%. Baadhi ya UI zitaonyesha kiasi kinachotarajiwa, kiasi cha chini, na slippage… Ambayo ni muhimu lakini labda ni kuzidisha.

Watumiaji wengi wataacha slippage chaguo-msingi hata hivyo.

“Athari ya bei” mara nyingi huonyeshwa kwenye mabano karibu na thamani sawa ya fiat katika sehemu ya “kwa”. Haya ni maelezo mazuri ya UX ya kuongeza, lakini ikiwa yameonyeshwa hapa, je, kweli yanahitaji kuonyeshwa tena hapa chini? Na kisha tena kwenye skrini ya hakikisho?

Watumiaji wengi (hasa wale wanaobadilisha kiasi kidogo) hawatajali kuhusu maelezo haya; wataingiza tu nambari na kubonyeza badilisha.

![Baadhi ya maelezo yanaonyesha kitu kile kile](./5.png)

Ni maelezo gani hasa yanaonyeshwa yatategemea hadhira yako na hisia gani unataka programu iwe nayo.

Ikiwa utajumuisha uvumilivu wa slippage katika paneli ya maelezo, unapaswa pia kuifanya iweze kuhaririwa moja kwa moja kutoka hapa. Huu ni mfano mzuri wa “kiongeza kasi”; mbinu nadhifu ya UX inayoweza kuharakisha mtiririko wa watumiaji wenye uzoefu, bila kuathiri utumiaji wa jumla wa programu.

![Slippage inaweza kudhibitiwa kutoka kwa paneli ya maelezo](./6.png)

Ni wazo zuri kufikiria kwa makini si tu kuhusu taarifa moja maalum kwenye skrini moja, bali kuhusu mtiririko mzima kupitia:
Kuingiza nambari katika Fomu Kuu → Kuchanganua Maelezo → Kubofya hadi kwenye Skrini ya Hakikisho (ikiwa una skrini ya hakikisho).
Je, paneli ya maelezo inapaswa kuonekana wakati wote, au mtumiaji anahitaji kubofya ili kuipanua?
Je, unapaswa kuongeza ugumu kwa kuongeza skrini ya hakikisho? Hii inamlazimu mtumiaji kupunguza kasi na kufikiria biashara yake, ambayo inaweza kuwa muhimu. Lakini je, wanataka kuona maelezo yale yale tena? Ni nini muhimu zaidi kwao katika hatua hii?

## Chaguo za ubunifu {#design-options}

Kama ilivyotajwa, mengi ya haya yanategemea mtindo wako binafsi
Mtumiaji wako ni nani?
Chapa yako ni ipi?
Je, unataka kiolesura cha “kitaalamu” kinachoonyesha kila undani, au unataka kuwa na muonekano mdogo?
Hata kama unawalenga watumiaji wa kitaalamu wanaotaka maelezo yote iwezekanavyo, bado unapaswa kukumbuka maneno ya busara ya Alan Cooper:

> Haijalishi kiolesura chako ni kizuri kiasi gani, haijalishi ni cha kuvutia kiasi gani, ingekuwa bora kama kingekuwa kidogo.

### Muundo {#structure}

- tokeni upande wa kushoto, au tokeni upande wa kulia
- Safu 2 au 3
- maelezo juu au chini ya kitufe
- maelezo yamepanuliwa, yamepunguzwa, au hayaonyeshwi

### Mtindo wa sehemu {#component-style}

- tupu
- yenye mpaka
- iliyojazwa

Kwa mtazamo safi wa UX, mtindo wa UI ni muhimu kidogo kuliko unavyofikiria. Mitindo ya kuona huja na kuondoka kwa mzunguko, na upendeleo mwingi ni wa kibinafsi.

Njia rahisi zaidi ya kupata hisia ya hili - na kufikiria juu ya usanidi mbalimbali tofauti - ni kuangalia baadhi ya mifano na kisha kufanya majaribio mwenyewe.

Seti ya Figma iliyojumuishwa ina sehemu tupu, zenye mpaka na zilizojazwa.

Angalia mifano ifuatayo ili kuona njia tofauti unazoweza kuweka yote pamoja:

![safu 3 katika mtindo uliojazwa](./7.png)

![safu 3 katika mtindo wenye mpaka](./8.png)

![safu 2 katika mtindo tupu](./9.png)

![safu 3 katika mtindo wenye mpaka, na paneli ya maelezo](./10.png)

![safu 3 na safu ya kuingiza katika mtindo wenye mpaka](./11.png)

![safu 2 katika mtindo uliojazwa](./12.png)

## Lakini tokeni inapaswa kwenda upande gani? {#but-which-side-should-the-token-go-on}

Jambo la msingi ni kwamba labda haileti tofauti kubwa kwa utumiaji. Hata hivyo, kuna mambo machache ya kuzingatia, ambayo yanaweza kukushawishi kwa njia moja au nyingine.

Imekuwa ya kuvutia kiasi kuona mtindo ukibadilika na wakati. Hapo awali Uniswap ilikuwa na tokeni upande wa kushoto, lakini tangu wakati huo imeiweka upande wa kulia. Sushiswap pia ilifanya mabadiliko haya wakati wa uboreshaji wa ubunifu. Itifaki nyingi, lakini si zote, zimefuata mkondo.

Kawaida ya kifedha kwa jadi huweka alama ya sarafu kabla ya nambari, k.m., $50, €50, £50, lakini sisi _tunasema_ dola 50, Euro 50, pauni 50.

Kwa mtumiaji wa jumla - hasa mtu anayesoma kutoka kushoto kwenda kulia, juu hadi chini - tokeni upande wa kulia labda huhisi asili zaidi.

![UI yenye tokeni upande wa kushoto](./13.png)

Kuweka tokeni upande wa kushoto na nambari zote upande wa kulia huonekana kuwa na ulinganifu wa kupendeza, ambayo ni faida, lakini kuna hasara nyingine kwa mpangilio huu.

Sheria ya ukaribu inasema kuwa vitu vilivyo karibu pamoja huonekana kama vinahusiana. Kwa hiyo, tunataka kuweka vitu vinavyohusiana karibu na kila kimoja. Salio la tokeni linahusiana moja kwa moja na tokeni yenyewe, na litabadilika kila tokeni mpya inapochaguliwa. Kwa hivyo inaleta maana zaidi kidogo kwa salio la tokeni kuwa karibu na kitufe cha kuchagua tokeni. Inaweza kuhamishwa chini ya tokeni, lakini hiyo inavunja ulinganifu wa mpangilio.

Hatimaye, kuna faida na hasara kwa chaguo zote mbili, lakini inavutia jinsi mwelekeo unavyoonekana kuwa kuelekea tokeni upande wa kulia.

## Tabia ya kitufe {#button-behavior}

Usiwe na kitufe tofauti cha Kuidhinisha. Pia usiwe na bofyo tofauti la Kuidhinisha. Mtumiaji anataka Kubadilisha, kwa hivyo sema tu “badilisha” kwenye kitufe na uanzishe uidhinishaji kama hatua ya kwanza. Modal inaweza kuonyesha maendeleo kwa hatua, au arifa rahisi ya “tx 1 kati ya 2 - inaidhinisha”.

![UI yenye vitufe tofauti vya kuidhinisha na kubadilisha](./14.png)

![UI yenye kitufe kimoja kinachosema idhinisha](./15.png)

### Kitufe kama msaada wa kimuktadha {#button-as-contextual-help}

Kitufe kinaweza kufanya kazi mara mbili kama arifa!

Huu kwa kweli ni muundo wa ubunifu usio wa kawaida nje ya Web3, lakini umekuwa wa kawaida ndani yake. Huu ni uvumbuzi mzuri kwani unaokoa nafasi, na kuweka umakini.

Ikiwa kitendo kikuu - KUBADILISHA - hakipatikani kwa sababu ya hitilafu, sababu inaweza kuelezewa kwa kutumia kitufe, k.m.:

- badilisha mtandao
- unganisha mkoba
- hitilafu mbalimbali

Kitufe pia kinaweza **kupangwa kwa kitendo** kinachohitaji kufanywa. Kwa mfano, ikiwa mtumiaji hawezi kubadilisha kwa sababu yuko kwenye mtandao usio sahihi, kitufe kinapaswa kusema “badilisha hadi Ethereum”, na mtumiaji anapobofya kitufe, kinapaswa kubadilisha mtandao hadi Ethereum. Hii inaharakisha mtiririko wa mtumiaji kwa kiasi kikubwa.

![Vitendo muhimu vinavyoanzishwa kutoka kwa CTA kuu](./16.png)

![Ujumbe wa hitilafu umeonyeshwa ndani ya CTA kuu](./17.png)

## Jenga yako mwenyewe na faili hii ya figma {#build-your-own-with-this-figma-file}

Shukrani kwa kazi ngumu ya itifaki nyingi, ubunifu wa DEX umeboreka sana. Tunajua ni maelezo gani mtumiaji anahitaji, jinsi tunapaswa kuyaonyesha, na jinsi ya kufanya mtiririko uwe laini iwezekanavyo.
Tunatumahi makala hii inatoa muhtasari thabiti wa kanuni za UX.

Ikiwa unataka kujaribu, tafadhali jisikie huru kutumia seti ya violezo vya Figma. Imewekwa rahisi iwezekanavyo, lakini ina unyumbufu wa kutosha kujenga muundo wa msingi kwa njia mbalimbali.

[Seti ya violezo vya Figma](https://www.figma.com/community/file/1393606680816807382/dex-wireframes-kit)

DeFi itaendelea kubadilika, na daima kuna nafasi ya kuboresha.

Kila la kheri!
