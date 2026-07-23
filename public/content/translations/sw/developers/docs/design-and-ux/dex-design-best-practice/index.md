---
title: Mbinu bora za muundo wa soko la ubadilishanaji lililogatuliwa (DEX)
description: Mwongozo unaoelezea maamuzi ya UX/UI kwa ajili ya kubadilishana tokeni.
lang: sw
---

Tangu kuzinduliwa kwa Uniswap mnamo 2018, kumekuwa na mamia ya masoko ya ubadilishanaji yaliyogatuliwa yaliyozinduliwa kwenye makumi ya misururu tofauti.
Mengi ya haya yalianzisha vipengele vipya au kuongeza mtindo wao wenyewe, lakini kiolesura kimebaki kuwa sawa kwa ujumla.

Sababu moja ya hii ni [Sheria ya Jakob](https://lawsofux.com/jakobs-law/):

> Watumiaji hutumia muda wao mwingi kwenye tovuti nyingine. Hii inamaanisha kuwa watumiaji wanapendelea tovuti yako ifanye kazi kwa njia sawa na tovuti nyingine zote wanazozijua tayari.

Shukrani kwa wavumbuzi wa mapema kama Uniswap, Pancakeswap, na Sushiswap, watumiaji wa fedha zilizogatuliwa (DeFi) wana wazo la pamoja la jinsi soko la ubadilishanaji lililogatuliwa (DEX) linavyoonekana.
Kwa sababu hii, kitu kama "mbinu bora" sasa kinaibuka. Tunaona maamuzi mengi zaidi ya muundo yakisanifiwa kwenye tovuti mbalimbali. Unaweza kuona mabadiliko ya DEX kama mfano mkubwa wa kufanya majaribio katika matumizi halisi. Mambo yaliyofanya kazi yalibaki, mambo ambayo hayakufanya kazi, yalitupwa nje. Bado kuna nafasi ya kuweka mtindo binafsi, lakini kuna viwango fulani ambavyo DEX inapaswa kufuata.

Makala haya ni muhtasari wa:
- nini cha kujumuisha
- jinsi ya kuifanya iwe rahisi kutumia iwezekanavyo
- njia kuu za kubinafsisha muundo

Mifano yote ya michoro ya awali (wireframes) ilitengenezwa mahususi kwa ajili ya makala haya, ingawa yote inategemea miradi halisi.

Kifurushi cha Figma pia kimejumuishwa chini - jisikie huru kukitumia na kuharakisha michoro yako ya awali!

## Muundo wa kimsingi wa DEX {#basic-anatomy-of-a-dex}

Kiolesura cha mtumiaji (UI) kwa ujumla kina vipengele vitatu:
1. Fomu kuu
2. Kitufe
3. Paneli ya maelezo

![Generic DEX UI, showing the three main elements](./1.png)


## Tofauti {#variations}

Hii itakuwa mada ya kawaida katika makala haya, lakini kuna njia mbalimbali tofauti ambazo vipengele hivi vinaweza kupangwa. "Paneli ya maelezo" inaweza kuwa:
- Juu ya kitufe
- Chini ya kitufe
- Imefichwa katika paneli kunjufu (accordion)
- Na/au kwenye kidirisha cha "kuhakiki"
  
Zingatia: Kidirisha cha "kuhakiki" ni cha hiari, lakini ikiwa unaonyesha maelezo machache sana kwenye UI kuu, inakuwa muhimu.

## Muundo wa fomu kuu {#structure-of-the-main-form}

Hili ni sanduku ambapo unachagua ni tokeni gani unataka kufanyia badilishano. Kipengele hiki kinajumuisha sehemu ya kuingiza data na kitufe kidogo katika mstari mmoja.

DEX kwa kawaida huonyesha maelezo ya ziada katika mstari mmoja juu na mstari mmoja chini, ingawa hii inaweza kusanidiwa tofauti.

![Input row, with a details row above and below](./2.png)

## Tofauti {#variations2}

Tofauti mbili za UI zinaonyeshwa hapa; moja isiyo na mipaka yoyote, na kuunda muundo ulio wazi sana, na moja ambapo mstari wa kuingiza data una mpaka, na kuunda mwelekeo kwenye kipengele hicho.

![Two UI variations of the main form](./3.png)

Muundo huu wa kimsingi unaruhusu **vipande vinne muhimu vya maelezo** kuonyeshwa katika muundo: kimoja katika kila kona. Ikiwa kuna mstari mmoja tu wa juu/chini, basi kuna nafasi mbili tu.

Wakati wa mabadiliko ya DeFi, mambo mengi tofauti yamejumuishwa hapa.

## Maelezo muhimu ya kujumuisha {#key-info-to-include}

- Salio katika mkoba
- Kitufe cha kiwango cha juu (Max)
- Thamani sawa katika sarafu ya serikali (fiat)
- Athari ya bei kwenye kiasi "kilichopokelewa"

Katika siku za mwanzo za DeFi, thamani sawa ya sarafu ya serikali mara nyingi ilikosekana. Ikiwa unaunda aina yoyote ya mradi wa Web3, ni muhimu kwamba thamani sawa ya sarafu ya serikali ionyeshwe. Watumiaji bado wanafikiria kwa kutumia sarafu za ndani, kwa hivyo ili kuendana na mifumo ya kiakili ya ulimwengu halisi, hii inapaswa kujumuishwa.

Kwenye sehemu ya pili (ile ambayo unachagua tokeni unayobadilisha kwenda) unaweza pia kujumuisha athari ya bei karibu na kiasi cha sarafu ya serikali, kwa kukokotoa tofauti kati ya kiasi kilichoingizwa na kiasi kinachokadiriwa kutoka. Hili ni jambo muhimu sana la kujumuisha.

Vitufe vya asilimia (k.m., 25%, 50%, 75%) vinaweza kuwa kipengele muhimu, lakini vinachukua nafasi zaidi, vinaongeza wito zaidi wa kuchukua hatua, na kuongeza mzigo zaidi wa kiakili. Sawa na vitelezi vya asilimia. Baadhi ya maamuzi haya ya UI yatategemea chapa yako na aina ya mtumiaji wako.

Maelezo ya ziada yanaweza kuonyeshwa chini ya fomu kuu. Kwa kuwa aina hii ya maelezo ni zaidi kwa watumiaji wataalamu, inaleta maana:
- kuiweka kwa uchache iwezekanavyo, au;
- kuificha katika paneli kunjufu (accordion)

![Details shown in the corners of that main form](./4.png)

## Maelezo ya ziada ya kujumuisha {#extra-info-to-include}

- Bei ya tokeni
- Tofauti ya utekelezaji
- Kiasi cha chini kilichopokelewa
- Kiasi kinachotarajiwa
- Athari ya bei
- Makadirio ya gharama ya gesi
- Ada nyingine
- Uelekezaji wa oda

Inawezekana, baadhi ya maelezo haya yanaweza kuwa ya hiari.

Uelekezaji wa oda unavutia, lakini haileti tofauti kubwa kwa watumiaji wengi.

Baadhi ya maelezo mengine yanarudia tu kitu kile kile kwa njia tofauti. Kwa mfano "kiasi cha chini kilichopokelewa" na "tofauti ya utekelezaji" ni pande mbili za sarafu moja. Ikiwa umeweka tofauti ya utekelezaji kwa 1%, basi kiasi cha chini unachoweza kutarajia kupokea = kiasi kinachotarajiwa-1%. Baadhi ya UI zitaonyesha kiasi kinachotarajiwa, kiasi cha chini, na tofauti ya utekelezaji... Ambayo ni muhimu lakini inawezekana ni maelezo yaliyozidi. 

Watumiaji wengi wataacha tofauti ya utekelezaji ya msingi hata hivyo.

"Athari ya bei" mara nyingi huonyeshwa kwenye mabano karibu na thamani sawa ya sarafu ya serikali katika sehemu ya "kwenda". Hili ni jambo zuri la UX la kuongeza, lakini ikiwa linaonyeshwa hapa, je, kweli linahitaji kuonyeshwa tena hapa chini? Na kisha tena kwenye skrini ya kuhakiki?

Watumiaji wengi (hasa wale wanaofanya badilishano la kiasi kidogo) hawatajali kuhusu maelezo haya; wataingiza tu nambari na kubofya badilishano.

![Some details show the same thing](./5.png)

Ni maelezo gani hasa yanayoonyeshwa yatategemea hadhira yako na hisia gani unataka programu iwe nayo.

Ikiwa utajumuisha uvumilivu wa tofauti ya utekelezaji katika paneli ya maelezo, unapaswa pia kuifanya iweze kuhaririwa moja kwa moja kutoka hapa. Huu ni mfano mzuri wa "kiharakishi"; mbinu nzuri ya UX inayoweza kuharakisha mtiririko wa watumiaji wenye uzoefu, bila kuathiri matumizi ya jumla ya programu.

![Slippage can be controlled from the details panel](./6.png)

Ni wazo zuri kufikiria kwa makini sio tu kuhusu kipande kimoja maalum cha taarifa kwenye skrini moja, bali kuhusu mtiririko mzima:
Kuingiza nambari katika Fomu Kuu → Kukagua Maelezo → Kubofya kwenye Skrini ya Kuhakiki (ikiwa una skrini ya kuhakiki). 
Je, paneli ya maelezo inapaswa kuonekana wakati wote, au mtumiaji anahitaji kuibofya ili kuipanua?
Je, unapaswa kuunda msuguano kwa kuongeza skrini ya kuhakiki? Hii inamlazimu mtumiaji kupunguza mwendo na kufikiria biashara yake, jambo ambalo linaweza kuwa muhimu. Lakini je, wanataka kuona maelezo yale yale tena? Ni nini muhimu zaidi kwao wakati huu?

## Chaguzi za muundo {#design-options}

Kama ilivyotajwa, mengi ya haya yanategemea mtindo wako binafsi
Mtumiaji wako ni nani?
Chapa yako ni nini?
Je, unataka kiolesura cha "kitaalamu" kinachoonyesha kila maelezo, au unataka kuwa na muundo rahisi?
Hata kama unalenga watumiaji wataalamu wanaotaka maelezo yote iwezekanavyo, bado unapaswa kukumbuka maneno ya busara ya Alan Cooper:

> Haijalishi kiolesura chako ni kizuri kiasi gani, haijalishi kinavutia kiasi gani, ingekuwa bora ikiwa kingekuwa na mambo machache.

### Muundo {#structure}

- tokeni upande wa kushoto, au tokeni upande wa kulia
- mistari 2 au 3
- maelezo juu au chini ya kitufe
- maelezo yaliyopanuliwa, yaliyopunguzwa, au ambayo hayaonyeshwi

### Mtindo wa kipengele {#component-style}

- tupu
- yenye muhtasari
- iliyojazwa

Kutoka kwa mtazamo halisi wa UX, mtindo wa UI haujalishi sana kama unavyofikiria. Mitindo ya kuona huja na kuondoka katika mizunguko, na mapendeleo mengi ni ya kibinafsi.

Njia rahisi zaidi ya kupata hisia ya hili - na kufikiria kuhusu usanidi mbalimbali tofauti - ni kuangalia baadhi ya mifano na kisha kufanya majaribio wewe mwenyewe.

Kifurushi cha Figma kilichojumuishwa kina vipengele vitupu, vyenye muhtasari na vilivyojazwa.

Angalia mifano hapa chini ili kuona njia tofauti unazoweza kuweka yote pamoja:

![3 rows in a filled style](./7.png)

![3 rows in a outlined style](./8.png)

![2 rows in an empty style](./9.png)

![3 rows in an outlined style, with a details panel](./10.png)

![3 rows with the input row in an outlined style](./11.png)

![2 rows in a filled style](./12.png)

## Lakini tokeni inapaswa kwenda upande gani? {#but-which-side-should-the-token-go-on}

Jambo la msingi ni kwamba labda haileti tofauti kubwa kwa matumizi. Kuna mambo machache ya kuzingatia, hata hivyo, ambayo yanaweza kukushawishi kwa njia moja au nyingine.

Imekuwa ya kuvutia kiasi kuona mtindo ukibadilika na wakati. Uniswap mwanzoni ilikuwa na tokeni upande wa kushoto, lakini tangu wakati huo imeihamishia upande wa kulia. Sushiswap pia ilifanya mabadiliko haya wakati wa uboreshaji wa muundo. Itifaki nyingi, lakini sio zote, zimefuata mkondo huo.

Kawaida ya kifedha kwa asili huweka alama ya sarafu kabla ya nambari, k.m., $50, €50, £50, lakini sisi *husema* dola 50, Euro 50, pauni 50.

Kwa mtumiaji wa kawaida - hasa mtu anayesoma kutoka kushoto kwenda kulia, juu hadi chini - tokeni upande wa kulia labda inahisi asili zaidi.

![A UI with tokens on the left](./13.png)

Kuweka tokeni upande wa kushoto na nambari zote upande wa kulia kunaonekana kwa ulinganifu wa kupendeza, ambayo ni faida, lakini kuna hasara nyingine kwa mpangilio huu.

Sheria ya ukaribu inasema kwamba vitu vilivyo karibu pamoja huchukuliwa kuwa vinahusiana. Kwa hivyo, tunataka kuweka vitu vinavyohusiana karibu na kila kimoja. Salio la tokeni linahusiana moja kwa moja na tokeni yenyewe, na litabadilika wakati wowote tokeni mpya inapochaguliwa. Kwa hivyo inaleta maana kidogo zaidi kwa salio la tokeni kuwa karibu na kitufe cha kuchagua tokeni. Inaweza kuhamishwa chini ya tokeni, lakini hiyo inavunja ulinganifu wa mpangilio.

Hatimaye, kuna faida na hasara kwa chaguzi zote mbili, lakini inavutia jinsi mwelekeo unavyoonekana kuwa kuelekea tokeni upande wa kulia.

## Tabia ya kitufe {#button-behavior}

Usiwe na kitufe tofauti cha Idhinisha. Pia usiwe na mbofyo tofauti wa Idhinisha. Mtumiaji anataka kufanya Badilishano, kwa hivyo sema tu "badilishano" kwenye kitufe na uanzishe uidhinishaji kama hatua ya kwanza. Kidirisha kinaweza kuonyesha maendeleo kwa kutumia kiashiria cha hatua, au arifa rahisi ya "muamala 1 kati ya 2 - inaidhinisha".

![A UI with separate buttons for approve and swap](./14.png)

![A UI with one button that says approve](./15.png)

### Kitufe kama msaada wa kimuktadha {#button-as-contextual-help}

Kitufe kinaweza kufanya kazi mbili kama arifa!

Kwa kweli huu ni muundo usio wa kawaida nje ya Web3, lakini umekuwa kiwango ndani yake. Huu ni uvumbuzi mzuri kwani unaokoa nafasi, na kuweka umakini ukilenga.

Ikiwa kitendo kikuu - BADILISHANO - hakipatikani kutokana na hitilafu, sababu ya kwa nini inaweza kuelezewa na kitufe, k.m.:

- badilisha mtandao
- unganisha mkoba
- hitilafu mbalimbali

Kitufe pia kinaweza **kuhusishwa na kitendo** kinachohitaji kufanywa. Kwa mfano, ikiwa mtumiaji hawezi kufanya badilishano kwa sababu yuko kwenye mtandao usio sahihi, kitufe kinapaswa kusema "badilisha kwenda Ethereum", na wakati mtumiaji anabofya kwenye kitufe, inapaswa kubadilisha mtandao kwenda Ethereum. Hii inaharakisha mtiririko wa mtumiaji kwa kiasi kikubwa.

![Key actions being initiated from the main CTA](./16.png)

![Error message shown within the main CTA](./17.png)

## Jenga yako mwenyewe na faili hili la figma {#build-your-own-with-this-figma-file}

Shukrani kwa kazi ngumu ya itifaki nyingi, muundo wa DEX umeboreshwa sana. Tunajua ni maelezo gani mtumiaji anahitaji, jinsi tunavyopaswa kuyaonyesha, na jinsi ya kufanya mtiririko uwe laini iwezekanavyo.
Tunatumai makala haya yanatoa muhtasari thabiti wa kanuni za UX. 

Ikiwa unataka kufanya majaribio, tafadhali jisikie huru kutumia kifurushi cha michoro ya awali cha Figma. Kimewekwa rahisi iwezekanavyo, lakini kina unyumbufu wa kutosha kujenga muundo wa kimsingi kwa njia mbalimbali.

[Kifurushi cha michoro ya awali cha Figma](https://www.figma.com/community/file/1393606680816807382/dex-wireframes-kit)

Fedha zilizogatuliwa (DeFi) zitaendelea kubadilika, na daima kuna nafasi ya kuboresha. 

Kila la heri!