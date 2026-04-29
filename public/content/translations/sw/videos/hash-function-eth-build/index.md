---
title: "Kazi ya heshi — ETH.BUILD"
description: "Onyesho la kazi za heshi za kriptografia kwa kutumia zana ya kuelimisha ya ETH.BUILD. Jifunze jinsi kazi za heshi zinavyofanya kazi na kwa nini ni za msingi kwa akaunti ya Ethereum na muundo wa uadilifu wa data."
lang: sw
youtubeId: "QJ010l-pBpE"
uploadDate: 2021-01-14
duration: "0:04:39"
educationLevel: beginner
topic:
  - "akaunti"
  - "kriptografia"
format: tutorial
author: Austin Griffith
breadcrumb: "Kazi za Heshi (ETH.BUILD)"
---

Mafunzo na **Austin Griffith** yanayoonyesha jinsi kazi za heshi za kriptografia zinavyofanya kazi kwa kutumia zana ya upangaji inayoonekana ya ETH.BUILD, ikijumuisha uamuzi (determinism), matokeo ya urefu uliowekwa, sifa za mwelekeo mmoja, na miti ya Merkle.

*Nakala hii ni nakala inayofikika ya [nakala asili ya video](https://www.youtube.com/watch?v=QJ010l-pBpE) iliyochapishwa na Austin Griffith. Imehaririwa kidogo ili isomeke vizuri.*

### Utangulizi wa kazi za heshi (0:00) {#introduction-to-hash-functions-000}

Hii ni video ya kwanza ya mfululizo unaoitwa ETH.BUILD. Unaweza kwenda kwenye eth.build ili kutumia zana hii, lakini ni kwa ajili ya kujaribu tu na kupata wazo la jinsi mambo yanavyofanya kazi unapojenga kwenye Ethereum.

Moduli ya kwanza tutakayoangalia ni kazi ya heshi. Kazi ya heshi ni nini hasa? Kweli, ni kama alama ya kidole. Una ingizo — linaweza kuwa chochote — lakini kwa sasa tutatumia tu maandishi "hello world." Kwa upande mwingine utakuwa na matokeo, na matokeo hayo ni mfuatano wa heksadesimali wenye herufi 64. Inasema herufi 66 kwa sababu ya kiambishi awali cha "0x", lakini kwa kweli ni mfuatano wa heksi wa herufi 64.

### Kuona heshi kama rangi (0:50) {#visualizing-hashes-as-colors-050}

Ikiwa unaangalia heksi, inaonekana kama rangi, na inaweza kuwa rahisi kuelezea kile tunachokiona hapa ikiwa tutaifanya iwe rangi. Kwa hivyo kile tutakachofanya ni kuchukua herufi sita za kwanza za mfuatano wowote ule na kuuonyesha kama rangi. Tukiangalia hilo, tunaona ni rangi nzuri ya zambarau.

Hebu tuone jina langu lina rangi gani — haya basi, rangi nzuri ya kijani kibichi. Sasa turudi kwenye "hello world" — ni ile zambarau tena.

### Uamuzi na matokeo ya urefu uliowekwa (1:38) {#determinism-and-fixed-length-output-138}

Kile tulichogundua hivi punde ni kwamba ina uamuzi (deterministic). Kimsingi, chochote tunachoweka kama ingizo letu, kila wakati tutapata kitu kile kile kwa upande mwingine.

Sifa ya pili ni kwamba unaweza kuweka chochote cha ukubwa wowote. Naweza kubonyeza kibodi ovyo na kuona rangi ikibadilika, lakini mfuatano huo unabaki kwenye urefu huo wa herufi 66. Haijalishi unaweka nini hapa — hata faili — naweza kuweka faili hili la Leo, mwanangu, na kuliweka kama heshi na kupata rangi nzuri ya machungwa. Kisha naweza kuweka hati ya maandishi ya orodha ya maneno ya BIP na inakuwa rangi hii nzuri ya bluu isiyokolea. Nikimrudisha Leo, nadhani itakuwa rangi gani? Tunajua itakuwa ile ya machungwa. Unapata alama hii ya kidole ya uamuzi ya kitu ulichoweka.

### Sifa ya mwelekeo mmoja (2:37) {#one-directional-property-237}

Sifa inayofuata muhimu zaidi ni kwamba ina mwelekeo mmoja. Nikiweka "hello world" tena, tutapata heshi hii ya "4717". Tukichukua heshi hiyo na kumtumia mtu na kusema "hii hapa ni heshi ya siri yangu — ukiweza kukisia siri yangu, nitakupa dola mia moja," hawataweza hata kukaribia.

Tuseme heshi inaanza na "4717" na wanaanza kutafuta wakijaribu kupata inayolingana. Huwezi tu kubadilisha herufi ndogo na kukaribia — ama uipate au uikose. Kimsingi inabidi uikisie kwa kutumia nguvu (brute-force). Ikitokea wakakisia "hello world," watapata jibu, lakini wasipokisia, hawataipata kamwe. Hakuna njia ya kujua kama unakaribia.

Utagundua na kriptografia kwamba wakati mwingine inakatisha tamaa kama msanidi programu kwa sababu ama inafanya kazi au haifanyi — hupati vidokezo vyovyote kuhusu kama unakaribia. Lakini hilo ni jambo zuri. Hiyo ndiyo sifa tunayotaka ya kazi ya heshi.

### Muhtasari wa sifa za kazi ya heshi (3:43) {#summary-of-hash-function-properties-343}

Kwa hivyo tunayo: chochote cha ukubwa wowote kinaweza kuwekwa kwenye kazi ya heshi, na itatoa alama ya kidole kamili ya heksadesimali ya herufi 64 ya data hiyo. Ina uamuzi. Ina mwelekeo mmoja — huwezi kurudi nyuma. Ni rahisi sana kutengeneza heshi, lakini ni ngumu sana kukisia siri ya heshi.

### Miti ya Merkle na kuunganisha heshi (4:06) {#merkle-trees-and-combining-hashes-406}

Kile tunachoweza kufanya na hii ni mambo mazuri sana, kama mti wa Merkle. Tuna maingizo yetu matatu, na tunaweza kuyaunganisha pamoja. Tunaweza kuunganisha heshi hizo zote na kisha kuheshi muunganisho huo.

Rangi hii hapa — hiyo zambarau — inawakilisha heshi ya heshi hizi zote. Nikibadilisha "hello world" kuwa "hello world one," zambarau hiyo itabadilika. Mabadiliko yoyote madogo kwa maingizo haya yoyote yatasababisha heshi ya mwisho kubadilika. Unaweza kuleta kila aina ya data kwa njia tofauti tofauti — hata kuwa na mti wa heshi, mti wa Merkle — au kuwa na kundi la vitalu katika mstari, na heshi hii ya mwisho itategemea mambo haya yote. Ikiwa kitu chochote kidogo kitabadilika popote njiani, heshi ya mwisho itabadilika.

### Jambo kuu la kuzingatia (5:53) {#key-takeaway-553}

Jambo kuu la kuzingatia ni kwamba kazi ya heshi kimsingi ni kama alama ya kidole. Nikiandika kitu, itanipa kwa uamuzi matokeo ninayotarajia. Hiyo ni kazi ya heshi — karibu kwenye ETH.BUILD. Hebu tutengeneze mambo mazuri na tujifunze mengi njiani.