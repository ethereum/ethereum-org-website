---
title: Masoko ya ubashiri
lang: sw
template: use-cases
image: /images/use-cases/prediction-markets.png
sidebarDepth: 2
summaryPoints:
  - "Fanya biashara kulingana na matokeo ya matukio ya baadaye"
  - "Bei hufanya kazi kama makadirio ya moja kwa moja na ya umma ya uwezekano wa jambo kutokea"
buttons:
  - content: Jifunze zaidi
    toId: how-prediction-markets-work
  - content: Gundua programu
    toId: find-a-prediction-market
    isSecondary: false
---

Masoko ya ubashiri huruhusu watu kununua na kuuza hisa kulingana na matokeo ya matukio ya baadaye. Bei ya hisa inaonyesha jinsi soko kwa ujumla linavyofikiri uwezekano wa matokeo hayo. Yalivutia hisia za wengi wakati wa uchaguzi wa Marekani wa 2024.

## Jinsi masoko ya ubashiri yanavyofanya kazi {#how-prediction-markets-work}

Kila soko huuliza swali lenye jibu la wazi, kama "Je, itanyesha Lisbon kesho?". Hisa ya **Ndiyo** hulipa $1 ikiwa jibu litakuwa ndiyo na haitapata chochote ikiwa sivyo. Hisa ya **Hapana** hufanya kazi kinyume chake.

Ikiwa hisa za Ndiyo zinafanya biashara kwa senti 67, soko linasema kuna takriban asilimia 67 ya uwezekano wa mvua. Mtu yeyote anayefikiri uwezekano halisi ni tofauti anaweza kununua au kuuza, na hilo hubadilisha bei. Kwa sababu watu wanaojua zaidi wana sababu ya kufanya biashara, taarifa mpya huonekana kwenye bei haraka. Ndiyo maana masoko ya ubashiri yanaweza kuwa utabiri muhimu. Sio kamilifu.

Kila hisa inayoshinda hulipwa na mtu aliyeshikilia upande ulioshindwa. Masoko ya ubashiri ni **sifuri-jumla** (zero-sum): mbali na ada, kile washindi wanachopata, walioshindwa hupoteza.

## Kwa nini hii ni muhimu? {#why-does-this-matter}

Masoko ya ubashiri yanayotegemea mnyororo wa vitalu huongeza mambo machache ambayo tovuti za jadi za kamari na mabadilishano hazina:

<Grid>
  <Card title="Data wazi" emoji="🔍" description="Kila biashara hurekodiwa mnyororoni, kwa hivyo mtu yeyote anaweza kuangalia bei, viwango, na nani alishinda au kushindwa."/>
  <Card title="Malipo mnyororoni" emoji="🌎" description="Nafasi ni tokeni kwenye mkoba wako mwenyewe, na mikataba mahiri hulipa hisa zinazoshinda mara tu matokeo yanaporipotiwa." />
  <Card title="Uwezekano unaoendeshwa na soko" emoji="🤝" description="Bei huwekwa na wafanyabiashara wanaonunua na kuuza hisa za matokeo, badala ya kuwekwa mapema na mweka dau mkuu." />
</Grid>

Data wazi ni muhimu katika utendaji. Watafiti waliweza [kusoma kila biashara kwenye Polymarket](https://cepr.org/publications/dp21615), ikijumuisha zaidi ya watumiaji milioni 2.4 kuanzia Novemba 2022 hadi Machi 2026, kwa sababu biashara zake hulipwa kwenye mnyororo wa vitalu wa umma. Aina hiyo ya ukaguzi huru haiwezekani kwenye majukwaa yaliyowekwa kati kama Kalshi, ambapo biashara na malipo hufanyika kwenye mifumo ya kampuni yenyewe. Hakuna rekodi ya umma ya kukagua, na hakuna mkataba mahiri unaohakikisha kuwa nafasi zinazoshinda zinalipwa.

Hivi ndivyo soko linavyoendeshwa kuanzia mwanzo hadi mwisho:

1. Soko huundwa kulingana na swali lenye sheria wazi za jinsi litakavyoamuliwa.
2. Wafanyabiashara hununua na kuuza hisa za Ndiyo na Hapana, na bei hubadilika wanavyofanya hivyo.
3. Mara tu tukio linapotokea, [orakeli](/developers/docs/oracles/) huripoti matokeo mnyororoni. Kwenye Polymarket, mtu yeyote anaweza kupendekeza matokeo kwa kuweka amana, na mtu mwingine yeyote anaweza kuyapinga. Ikiwa mzozo hautatuliwi, wamiliki wa tokeni ya UMA hupiga kura juu ya matokeo.
4. Kila hisa inayoshinda inaweza kukombolewa kwa $1. Hisa zinazoshindwa hazina thamani yoyote.
5. Mtu yeyote anaweza kutumia historia ya bei na data ya biashara kwa utafiti au majadiliano.

## Tafuta soko la ubashiri {#find-a-prediction-market}

Masoko haya ya ubashiri hulipa biashara mnyororoni, kwa hivyo mtu yeyote anaweza kuangalia bei na historia ya biashara:

<PredictionMarketLists />

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Kumbuka hatari zilizopo</strong></p>
  <p className="mt-2">Watu wengi wanaofanya biashara kwenye masoko ya ubashiri hupoteza pesa. Fanya biashara tu kwa kile unachoweza kumudu kupoteza, na uwe mwangalifu na tabia zinazoweza kusababisha uraibu.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Changamoto na Hatari {#challenges-and-risks}

Masoko ya ubashiri yanakabiliwa na changamoto halisi zinazoathiri usawa, uhalali, na usahihi.

📉 **Wafanyabiashara wengi hupoteza** – [Utafiti wa kila biashara ya Polymarket](https://cepr.org/publications/dp21615) kuanzia Novemba 2022 hadi Machi 2026 uligundua kuwa takriban asilimia 69 ya watumiaji waliishia na hasara. Miongoni mwa watumiaji waliotengeneza pesa, asilimia 1 ya juu walichukua asilimia 76.5 ya faida. Washindi wakubwa walikuwa zaidi wafanyabiashara wanaotoa ukwasi kwa maagizo ya kikomo (limit orders), mara nyingi kitaaluma na kwa kiwango kikubwa.

🕵️ **Biashara ya ndani (Insider trading)** – Watu wanaojua matokeo mapema wanaweza kufaidika kwa gharama ya wafanyabiashara wengine. [Watafiti katika Shule ya Sheria ya Columbia na Chuo Kikuu cha Haifa](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6426778) walikadiria kuwa wafanyabiashara wanaoshukiwa kuwa na taarifa za ndani walitengeneza takriban dola milioni 143 kwenye Polymarket kati ya Februari 2024 na Februari 2026.

⚖️ **Matokeo yanayobishaniwa** – Mikataba mahiri inaweza kulipa kiotomatiki, lakini bado mtu anapaswa kuripoti kilichotokea. Wakati swali limeundwa kwa ulegevu au ukweli hauko wazi, matokeo yaliyoripotiwa yanaweza kupingwa.

⚠️ **Udanganyifu wa soko** – Wafanyabiashara wenye pesa nyingi wanaweza kubadilisha bei, hasa katika masoko madogo. Biashara ya kuosha (wash trading) inaweza kufanya soko lionekane lenye shughuli nyingi kuliko lilivyo.

💧 **Masuala ya ukwasi** – Ushiriki mdogo ([ukwasi mdogo](https://www.investopedia.com/terms/t/thinmarket.asp)) unaweza kufanya bei ziwe zisizoaminika.

🏛 **Kutokuwa na uhakika wa udhibiti** – Sheria hutofautiana kulingana na nchi na hubadilika haraka. Nchini Marekani, wadhibiti na mahakama bado wanaamua ikiwa baadhi ya mikataba ya matukio, hasa kwenye michezo, inahesabika kama bidhaa za kifedha au kamari. Majukwaa mengi huzuia watumiaji katika nchi fulani.

## Kufanya majaribio na masoko ya ubashiri {#experimenting-with-prediction-markets}

Masoko ya ubashiri yanaweza kuwa muhimu zaidi ya kufanya biashara kwa faida. Wazo moja, linaloitwa futarchy, linaenda mbali zaidi na kutumia masoko kusaidia kufanya maamuzi, sio tu kuyatabiri.

Kwa mfano, [Pendekezo la Uboreshaji la Devcon](https://forum.devcon.org/t/futarchy-decision-markets-for-deciding-next-devcon/5305) (DIP) lilipendekeza kwamba waandaaji wa Devcon watumie masoko ya ubashiri kutabiri mahudhurio katika maeneo yanayowezekana ya baadaye. Hii inaweza kuwasaidia kupima ni jiji lipi litakalovutia tukio kubwa zaidi dhidi ya lipi litakalofikika zaidi kimataifa. Inaweza pia kuokoa muda unaotumika kulinganisha sera za viza, ufikiaji wa uwanja wa ndege, na gharama za maisha, huku ikionyesha ni wapi wahudhuriaji watarajiwa wangefurahi kwenda.

## Kusoma zaidi {#further-reading}

[Kutoka masoko ya ubashiri hadi fedha za taarifa (info finance)](https://vitalik.eth.limo/general/2024/11/09/infofinance.html) - Vitalik Buterin  
[Nani anashinda na nani anashindwa katika masoko ya ubashiri? Ushahidi kutoka Polymarket](https://cepr.org/publications/dp21615) - Akey, Grégoire, Harvie, na Martineau  
[Waraka Mweupe wa Mradi wa Augur](https://github.com/AugurProject/whitepaper)
