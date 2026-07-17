---
title: Miti ya Verkle
description: Maelezo ya kiwango cha juu ya miti ya Verkle na jinsi itakavyotumika kuboresha Ethereum
lang: sw
summaryPoints:
  - Gundua miti ya Verkle ni nini
  - Soma kwa nini Miti ya Verkle ni uboreshaji muhimu kwa Ethereum
---

Miti ya Verkle (muunganiko wa maneno "ufungamanisho wa Vecta" na "Miti ya Merkle") ni muundo wa data unaoweza kutumika kuboresha nodi za [Ethereum](/) ili ziweze kuacha kuhifadhi kiasi kikubwa cha data ya hali bila kupoteza uwezo wa kuthibitisha vitalu.

## Ubilahali {#statelessness}

Miti ya Verkle ni hatua muhimu katika njia ya kuelekea kwenye wateja wa Ethereum wa ubilahali. Wateja wa ubilahali ni wale ambao hawahitaji kuhifadhi hifadhidata nzima ya hali ili kuthibitisha vitalu vinavyoingia. Badala ya kutumia nakala yao wenyewe ya ndani ya hali ya Ethereum ili kuthibitisha vitalu, wateja wa ubilahali hutumia "shahidi" kwa data ya hali inayofika na kitalu. Shahidi ni mkusanyiko wa vipande binafsi vya data ya hali vinavyohitajika kutekeleza seti fulani ya miamala, na uthibitisho wa kificho kwamba shahidi huyo kwa kweli ni sehemu ya data kamili. Shahidi hutumika _badala_ ya hifadhidata ya hali. Ili hili lifanye kazi, mashahidi wanahitaji kuwa wadogo sana, ili waweze kutangazwa kwa usalama kwenye mtandao kwa wakati ili wathibitishaji waweze kuwachakata ndani ya sloti ya sekunde 12. Muundo wa sasa wa data ya hali haufai kwa sababu mashahidi ni wakubwa mno. Miti ya Verkle inatatua tatizo hili kwa kuwezesha mashahidi wadogo, na kuondoa mojawapo ya vizuizi vikuu kwa wateja wa ubilahali.

<ExpandableCard title="Kwa nini tunataka wateja bilahali?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

Wateja wa Ethereum kwa sasa wanatumia muundo wa data unaojulikana kama Patricia Merkle Trie kuhifadhi data yake ya hali. Taarifa kuhusu akaunti binafsi huhifadhiwa kama majani kwenye trie na jozi za majani zinaheshishwa mara kwa mara hadi heshi moja tu inabaki. Heshi hii ya mwisho inajulikana kama "mzizi". Ili kuthibitisha vitalu, wateja wa Ethereum hutekeleza miamala yote katika kitalu na kusasisha trie ya hali yao ya ndani. Kitalu kinachukuliwa kuwa halali ikiwa mzizi wa mti wa ndani unafanana na ule uliotolewa na mpendekezaji wa bloku, kwa sababu tofauti yoyote katika ukokotoaji uliofanywa na mpendekezaji wa bloku na nodi inayothibitisha itasababisha heshi ya mzizi kuwa tofauti kabisa. Tatizo la hili ni kwamba kuthibitisha mnyororo wa vitalu kunahitaji kila mteja kuhifadhi trie ya hali nzima kwa kitalu cha kichwa na vitalu kadhaa vya kihistoria (chaguo-msingi katika Geth ni kuweka data ya hali kwa vitalu 128 nyuma ya kichwa). Hili linahitaji wateja kuwa na ufikiaji wa kiasi kikubwa cha nafasi ya diski, ambayo ni kikwazo cha kuendesha nodi kamili kwenye maunzi ya bei nafuu, yenye nguvu ndogo. Suluhisho la hili ni kusasisha trie ya hali kuwa muundo bora zaidi (mti wa Verkle) ambao unaweza kufupishwa kwa kutumia "shahidi" mdogo kwa data inayoweza kushirikiwa badala ya data kamili ya hali. Kuunda upya data ya hali kuwa mti wa Verkle ni hatua ya kuelekea kwa wateja wa ubilahali.

</ExpandableCard>

## Shahidi ni nini na kwa nini tunawahitaji? {#what-is-a-witness}

Kuthibitisha kitalu kunamaanisha kutekeleza upya miamala iliyomo kwenye kitalu, kutumia mabadiliko kwenye trie ya hali ya Ethereum, na kukokotoa heshi mpya ya mzizi. Kitalu kilichothibitishwa ni kile ambacho heshi ya mzizi wa hali iliyokokotolewa ni sawa na ile iliyotolewa na kitalu (kwa sababu hii inamaanisha mpendekezaji wa bloku kweli alifanya ukokotoaji anaosema alifanya). Katika wateja wa Ethereum wa leo, kusasisha hali kunahitaji ufikiaji wa trie ya hali nzima, ambayo ni muundo mkubwa wa data ambao lazima uhifadhiwe ndani. Shahidi ana vipande tu vya data ya hali vinavyohitajika kutekeleza miamala katika kitalu. Mthibitishaji anaweza kisha kutumia vipande hivyo tu kuthibitisha kwamba mpendekezaji wa bloku ametekeleza miamala ya kitalu na kusasisha hali kwa usahihi. Hata hivyo, hii inamaanisha kwamba shahidi anahitaji kuhamishwa kati ya marika kwenye mtandao wa Ethereum kwa haraka vya kutosha ili kupokelewa na kuchakatwa na kila nodi kwa usalama ndani ya sloti ya sekunde 12. Ikiwa shahidi ni mkubwa mno, inaweza kuchukua baadhi ya nodi muda mrefu sana kuipakua na kuendana na mnyororo. Hili ni nguvu ya kuweka kati kwa sababu inamaanisha nodi zilizo na miunganisho ya intaneti ya haraka pekee ndizo zinazoweza kushiriki katika kuthibitisha vitalu. Ukiwa na miti ya Verkle hakuna haja ya kuwa na hali iliyohifadhiwa kwenye diski kuu yako; _kila kitu_ unachohitaji ili kuthibitisha kitalu kimo ndani ya kitalu chenyewe. Kwa bahati mbaya, mashahidi wanaoweza kuzalishwa kutoka kwa trie za Merkle ni wakubwa mno kusaidia wateja wa ubilahali.

## Kwa nini miti ya Verkle inawezesha mashahidi wadogo zaidi? {#why-do-verkle-trees-enable-smaller-witnesses}

Muundo wa Trie ya Merkle hufanya ukubwa wa shahidi kuwa mkubwa sana - mkubwa mno kutangazwa kwa usalama kati ya marika ndani ya sloti ya sekunde 12. Hii ni kwa sababu shahidi ni njia inayounganisha data, ambayo inashikiliwa kwenye majani, kwenye heshi ya mzizi. Ili kuthibitisha data ni lazima kuwa na sio tu heshi zote za kati zinazounganisha kila jani kwenye mzizi, lakini pia nodi zote "ndugu". Kila nodi katika uthibitisho ina ndugu ambayo inaheshishwa nayo ili kuunda heshi inayofuata juu ya trie. Hii ni data nyingi. Miti ya Verkle hupunguza ukubwa wa shahidi kwa kufupisha umbali kati ya majani ya mti na mzizi wake na pia kuondoa hitaji la kutoa nodi ndugu kwa ajili ya kuthibitisha heshi ya mzizi. Ufanisi zaidi wa nafasi utapatikana kwa kutumia mpango wenye nguvu wa ufungamanisho wa polinomiali badala ya ufungamanisho wa vekta wa mtindo wa heshi. Ufungamanisho wa polinomiali unaruhusu shahidi kuwa na ukubwa uliowekwa bila kujali idadi ya majani anayothibitisha.

Chini ya mpango wa ufungamanisho wa polinomiali, mashahidi wana ukubwa unaodhibitiwa ambao unaweza kuhamishwa kwa urahisi kwenye mtandao wa rika-kwa-rika. Hii inaruhusu wateja kuthibitisha mabadiliko ya hali katika kila kitalu kwa kiasi kidogo cha data.

<ExpandableCard title="Ni kwa kiasi gani hasa Miti ya Verkle inaweza kupunguza ukubwa wa shahidi?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

Ukubwa wa shahidi hutofautiana kulingana na idadi ya majani anayojumuisha. Kwa kudhani shahidi anashughulikia majani 1000, shahidi wa trie ya Merkle atakuwa takriban 3.5MB (kwa kudhani viwango 7 kwenye trie). Shahidi wa data sawa katika mti wa Verkle (kwa kudhani viwango 4 kwenye mti) atakuwa takriban 150 kB - **takriban mara 23 ndogo zaidi**. Upunguzaji huu wa ukubwa wa shahidi utaruhusu mashahidi wa mteja wa ubilahali kuwa wadogo kwa kiwango kinachokubalika. Mashahidi wa polinomiali ni 0.128 -1 kB kulingana na ufungamanisho gani maalum wa polinomiali unatumika.

</ExpandableCard>

## Muundo wa mti wa Verkle ni upi? {#what-is-the-structure-of-a-verkle-tree}

Miti ya Verkle ni jozi za `(key,value)` ambapo funguo ni vipengele vya baiti 32 vinavyoundwa na _shina_ la baiti 31 na _kiambishi tamati_ cha baiti moja. Funguo hizi zimepangwa katika nodi za _upanuzi_ na nodi za _ndani_. Nodi za upanuzi zinawakilisha shina moja kwa watoto 256 wenye viambishi tamati tofauti. Nodi za ndani pia zina watoto 256, lakini zinaweza kuwa nodi zingine za upanuzi. Tofauti kuu kati ya mti wa Verkle na muundo wa mti wa Merkle ni kwamba mti wa Verkle ni tambarare zaidi, ikimaanisha kuna nodi chache za kati zinazounganisha jani kwenye mzizi, na hivyo data kidogo inahitajika ili kuzalisha uthibitisho.

![Diagram of a Verkle tree data structure](./verkle.png)

[Soma zaidi kuhusu muundo wa miti ya Verkle](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## Maendeleo ya sasa {#current-progress}

Mitandao ya majaribio ya mti wa Verkle tayari inafanya kazi, lakini bado kuna sasisho kubwa ambazo hazijakamilika kwa wateja zinazohitajika kusaidia miti ya Verkle. Unaweza kusaidia kuharakisha maendeleo kwa kusambaza mikataba kwenye mitandao ya majaribio au kuendesha wateja wa mtandao wa majaribio.

[Tazama Guillaume Ballet akielezea mtandao wa majaribio wa Condrieu Verkle](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (kumbuka kwamba mtandao wa majaribio wa Condrieu ulikuwa Uthibitisho wa Kazi (PoW) na sasa umebadilishwa na mtandao wa majaribio wa Verkle Gen Devnet 6).

## Usomaji zaidi {#further-reading}

- [Miti ya Verkle kwa Ubilahali](https://verkle.info/)
- [Dankrad Feist anaelezea miti ya Verkle kwenye PEEPanEIP](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [Miti ya Verkle Kwa Ajili Yetu Sote](https://web.archive.org/web/20250124132255/https://research.2077.xyz/verkle-trees)
- [Anatomia ya Uthibitisho wa Verkle](https://ihagopian.com/posts/anatomy-of-a-verkle-proof)
- [Guillaume Ballet anaelezea miti ya Verkle kwenye ETHGlobal](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- ["Jinsi miti ya Verkle inavyofanya Ethereum kuwa nyepesi na yenye nguvu" na Guillaume Ballet kwenye Devcon 6](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [Piper Merriam kuhusu wateja wa ubilahali kutoka ETHDenver 2020](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [Dankrad Fiest anaelezea miti ya Verkle na ubilahali kwenye podikasti ya Zero Knowledge](https://zeroknowledge.fm/podcast/202/)
- [Vitalik Buterin kuhusu miti ya Verkle](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Dankrad Feist kuhusu miti ya Verkle](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [Nyaraka za EIP za mti wa Verkle](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)