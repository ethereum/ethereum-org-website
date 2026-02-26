---
title: Kujenga jamii ya Ethereum ambazo zinaweza kustahimili mabadiliko ya teknolojia na soko
description: "''Maboresho haya yanaimarisha Ethereum kama safu ya msingi yenye uthabiti na usambazaji wa madaraka na kuifanya iwe tayari kustahimili changamoto zozote zitakazojitokeza.\""
lang: sw
image: /images/roadmap/roadmap-future.png
alt: "Ramani ya maendeleo ya Ethereum"
template: roadmap
---

Kuna baadhi ya mambo kwenye ramani ya maendeleo ambayo si ya haraka kwa ukuaji au usalama wa Ethereum sasa, lakini yanaandaa Ethereum kuwa thabiti na ya kuaminika hata miaka mingi zijazo

## Ukinzani wa quantum {#quantum-resistance}

Baadhi ya [kriptografia](/glossary/#cryptography) inayolinda Ethereum ya sasa itahujumiwa wakati kompyuta ya quantum itakapokuwa ukweli. Ingawa huenda kompyuta za quantum ziko miongo mingi kabla ya kuwa tishio la kweli kwa kriptografia ya kisasa, Ethereum inajengwa kuwa salama kwa karne nyingi zijazo. Hii inamaanisha kuifanya [Ethereum iwe na ukinzani wa quantum](https://consensys.net/blog/developers/how-will-quantum-supremacy-affect-blockchain/) haraka iwezekanavyo.

Changamoto inayowakabili wasanidi programu wa Ethereum ni kwamba itifaki ya sasa ya [proof-of-stake](/glossary/#pos) inategemea mpango mzuri sana wa sahihi unaojulikana kama BLS ili kujumlisha kura kwenye [bloku](/glossary/#block) halali. Mpango huu wa sahihi unavunjwa na kompyuta za quantum, lakini njia mbadala zenye ukinzani wa quantum hazina ufanisi sawa.

Mipango ya ahadi ya [“KZG”](/roadmap/danksharding/#what-is-kzg) inayotumiwa katika maeneo kadhaa kwenye Ethereum ili kutengeneza siri za kriptografia inajulikana kuwa inaweza kuathiriwa na quantum. Kwa sasa, hili linakwepwa kwa kutumia “mipangilio inayoaminika” (ambapo sherehe kuu ya usanidi ilikamilika kwa mafanikio mwaka wa 2023), ambapo watumiaji wengi walitengeneza nasibu isiyoweza kubadilishwa na kompyuta ya quantum. Hata hivyo, suluhisho bora la muda mrefu litakuwa ni kujumuisha kriptografia salama dhidi ya quantum badala yake. Kuna mbinu mbili kuu ambazo zinaweza kuwa mbadala bora kwa mpango wa BLS: usahihi wa [kulingana na STARK](https://hackmd.io/@vbuterin/stark_aggregation) na [kulingana na lattice](https://medium.com/asecuritysite-when-bob-met-alice/so-what-is-lattice-encryption-326ac66e3175). **Hizi bado zinafanyiwa utafiti na kujaribiwa kikamilifu**.

[Soma kuhusu KZG na mipangilio inayoaminika](/roadmap/danksharding#what-is-kzg)

## Ethereum rahisi na yenye ufanisi zaidi {#simpler-more-efficient-ethereum}

Utata huleta fursa za hitilafu au udhaifu ambao unaweza kutumiwa na washambuliaji. Kwa hivyo, sehemu ya ramani ni kurahisisha Ethereum na kuondoa au kurekebisha msimbo ambao umedumu kupitia masasisho mbalimbali lakini hauhitajiki tena au sasa unaweza kuboreshwa. Msingi wa msimbo mwepesi na rahisi ni rahisi kwa wasanidi programu kudumisha na kufikiria.

Ili kufanya [Mashine Halisi ya Ethereum (EVM)](/developers/docs/evm) iwe rahisi na yenye ufanisi zaidi, maboresho yanaendelea kufanyiwa utafiti na kutekelezwa. Hii inahusisha kushughulikia vipengele vya zamani na kuanzisha uboreshaji.

**Mabadiliko ya Hivi Karibuni Yaliyotekelezwa:**

- **Marekebisho ya Ukokotoaji wa Gesi:** Njia ambayo [gesi](/glossary/#gas) inakokotolewa iliboreshwa kwa kiasi kikubwa na **EIP-1559 (iliyotekelezwa katika sasisho la London, 2021)**, na kuanzisha ada ya msingi na utaratibu wa kuchoma kwa bei ya muamala inayotabirika zaidi.
- **Vizuizi vya `SELFDESTRUCT`:** Opcode ya `SELFDESTRUCT`, ingawa haitumiki sana, ilileta hatari zinazowezekana. Utendakazi wake **ulizuiliwa sana katika sasisho la Dencun (Machi 2024) kupitia EIP-6780** ili kupunguza hatari, hasa kuhusu usimamizi wa hali.
- **Aina za Miamala za Kisasa:** Fomati mpya za miamala zimeanzishwa (k.m., kupitia **EIP-2718** na **EIP-4844** kwa blopu katika sasisho la Dencun) ili kusaidia vipengele vipya na kuboresha ufanisi juu ya aina za zamani.

**Malengo yanayoendelea na ya baadaye:**

- **Ushughulikiaji Zaidi wa `SELFDESTRUCT`:** Ingawa imezuiliwa, **uwezekano wa kuondolewa kabisa** kwa opcode ya `SELFDESTRUCT` bado unafikiriwa kwa masasisho yajayo ili kurahisisha zaidi hali ya EVM. ([Muktadha zaidi kuhusu masuala ya SELFDESTRUCT](https://hackmd.io/@vbuterin/selfdestruct)).
- **Kuondoa Miamala ya Kizamani Taratibu:** Ingawa [wateja wa Ethereum](/glossary/#consensus-client) bado wanaauni aina za zamani za miamala kwa ajili ya uoanifu wa nyuma, lengo ni kuhimiza uhamiaji kwenda aina mpya na **uwezekano wa kuacha kutumia au kuondoa kabisa usaidizi kwa fomati za zamani zaidi** katika siku zijazo.
- **Utafiti Unaoendelea wa Ufanisi wa Gesi:** Utafiti unaendelea kuhusu **marekebisho zaidi ya ukokotoaji wa gesi**, ikiwezekana ikijumuisha dhana kama gesi ya pande nyingi ili kuonyesha vizuri zaidi matumizi ya rasilimali.
- **Operesheni za Kriptografia Zilizoboreshwa:** Juhudi zinaendelea **kuleta mbinu bora zaidi za hesabu** zinazotegemeza operesheni za kriptografia zinazotumiwa ndani ya EVM.

Vile vile, kuna masasisho yanayoweza kufanywa kwa sehemu nyingine za wateja wa sasa wa Ethereum. Mfano mmoja ni kwamba wateja wa sasa wa utekelezaji na makubaliano wanatumia aina tofauti ya ukandamizaji wa data. Itakuwa rahisi zaidi na dhahiri kushiriki data kati ya wateja wakati mpango wa ukandamizaji utakapounganishwa kwenye mtandao mzima. Hili linabaki kuwa eneo la utafiti.

## Maendeleo ya sasa {#current-progress}

Mengi ya masasisho ya muda mrefu ya kujiandaa kwa siku zijazo, hasa **ukinzani kamili wa quantum kwa itifaki za msingi, bado ziko katika hatua ya utafiti na zinaweza kuwa miaka kadhaa mbali** na kutekelezwa.

Hata hivyo, **maendeleo makubwa tayari yamefanywa katika juhudi za kurahisisha.** Kwa mfano, mabadiliko muhimu kama vile **kizuizi cha `SELFDESTRUCT` (EIP-6780)** na kuanzishwa kwa **miamala inayobeba blopu (EIP-4844)** yalitekelezwa katika **sasisho la Dencun (Machi 2024)**. Kazi ya kuoanisha mipango ya ukandamizaji ya wateja na maboresho mengine ya ufanisi pia inaendelea.

**Kusoma zaidi**

- [Gesi](/developers/docs/gas)
- [EVM](/developers/docs/evm)
- [Miundo ya data](/developers/docs/data-structures-and-encoding)