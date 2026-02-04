---
title: Miti ya Verkle
description: Maelezo ya kiwango cha juu ya miti ya Verkle na jinsi itakavyotumika kusasisha Ethereum
lang: sw
summaryPoints:
  - Gundua miti ya Verkle ni nini
  - Soma kwa nini Miti ya Verkle ni sasisho muhimu kwa Ethereum
---

# Miti ya Verkle {#verkle-trees}

Miti ya Verkle (muunganiko wa \"Vector commitment\" na \"Miti ya Merkle\") ni muundo wa data unaoweza kutumika kusasisha nodi za Ethereum ili ziweze kuacha kuhifadhi kiasi kikubwa cha data ya hali bila kupoteza uwezo wa kuthibitisha bloku.

## Kutokuwa na hali {#statelessness}

Miti ya Verkle ni hatua muhimu katika njia ya kuelekea wateja wa Ethereum wasio na hali. Wateja wasio na hali ni wale ambao hawahitaji kuhifadhi hifadhidata nzima ya hali ili kuthibitisha bloku zinazoingia. Badala ya kutumia nakala yao ya ndani ya hali ya Ethereum ili kuthibitisha bloku, wateja wasio na hali hutumia \"ushahidi\" kwa data ya hali inayofika na bloku. Ushahidi ni mkusanyiko wa vipande vya mtu binafsi vya data ya hali vinavyohitajika ili kutekeleza seti fulani ya miamala, na uthibitisho wa kriptografia kwamba ushahidi huo ni sehemu halisi ya data kamili. Ushahidi hutumiwa _badala_ ya hifadhidata ya hali. Ili hili lifanye kazi, shahidi wanahitaji kuwa wadogo sana, ili waweze kutangazwa kwa usalama kwenye mtandao kwa wakati ili wathibitishaji wawachakate ndani ya muda uliopangwa wa sekunde 12. Muundo wa sasa wa data ya hali haufai kwa sababu shahidi ni wakubwa mno. Miti ya Verkle hutatua tatizo hili kwa kuwezesha shahidi wadogo, na hivyo kuondoa moja ya vizuizi vikuu kwa wateja wasio na hali.

<ExpandableCard title="Kwa nini tunataka wateja wasio na hali?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

Kwa sasa wateja wa Ethereum wanatumia muundo wa data unaojulikana kama Patricia Merkle Trie kuhifadhi data yake ya hali. Taarifa kuhusu akaunti za mtu binafsi huhifadhiwa kama majani kwenye trie na jozi za majani hupigwa hashi mara kwa mara hadi hashi moja tu ibaki. Hashi hii ya mwisho inajulikana kama \"mzizi\". Ili kuthibitisha bloku, wateja wa Ethereum hutekeleza miamala yote katika bloku na kusasisha trie yao ya hali ya ndani. Bloku inachukuliwa kuwa halali ikiwa mzizi wa mti wa ndani unafanana na ule uliotolewa na mpendekezaji wa bloku, kwa sababu tofauti zozote katika hesabu iliyofanywa na mpendekezaji wa bloku na nodi inayothibitisha zingesababisha hashi ya mzizi kuwa tofauti kabisa. Tatizo la hili ni kwamba kuthibitisha mnyororo wa bloku kunahitaji kila mteja kuhifadhi trie nzima ya hali kwa bloku ya kichwa na bloku kadhaa za kihistoria (chaguo-msingi katika Geth ni kuweka data ya hali kwa bloku 128 nyuma ya kichwa). Hii inahitaji wateja kuwa na ufikiaji wa nafasi kubwa ya diski, ambayo ni kizuizi cha kuendesha nodi kamili kwenye maunzi ya bei nafuu, ya nguvu ndogo. Suluhisho la hili ni kusasisha trie ya hali iwe muundo wenye ufanisi zaidi (mti wa Verkle) unaoweza kufupishwa kwa kutumia \"ushahidi\" mdogo kwa data unaoweza kushirikiwa badala ya data kamili ya hali. Kupanga upya data ya hali kuwa mti wa Verkle ni hatua ya mwanzo ya kuelekea kwa wateja wasio na hali.

</ExpandableCard>

## Ushahidi ni nini na kwa nini tunauhitaji? {#what-is-a-witness}

Kuthibitisha bloku kunamaanisha kutekeleza upya miamala iliyo kwenye bloku, kutumia mabadiliko kwenye trie ya hali ya Ethereum, na kukokotoa hashi mpya ya mzizi. Bloku iliyothibitishwa ni ile ambayo hashi yake ya mzizi wa hali iliyokokotolewa ni sawa na ile iliyotolewa na bloku (kwa sababu hii inamaanisha mpendekezaji wa bloku alifanya kweli hesabu aliyosema alifanya). Katika wateja wa leo wa Ethereum, kusasisha hali kunahitaji ufikiaji wa trie nzima ya hali, ambayo ni muundo mkubwa wa data ambao lazima uhifadhiwe ndani ya nchi. Ushahidi una vipande tu vya data ya hali vinavyohitajika ili kutekeleza miamala kwenye bloku. Kisha mthibitishaji anaweza kutumia vipande hivyo tu kuthibitisha kwamba mpendekezaji wa bloku ametekeleza miamala ya bloku na kusasisha hali kwa usahihi. Hata hivyo, hii inamaanisha kwamba ushahidi unahitaji kuhamishwa kati ya rika kwenye mtandao wa Ethereum haraka vya kutosha kupokewa na kuchakatwa na kila nodi kwa usalama ndani ya muda uliopangwa wa sekunde 12. Ikiwa ushahidi ni mkubwa mno, inaweza kuchukua baadhi ya nodi muda mrefu sana kuupakua na kuendelea na mnyororo. Hii ni nguvu ya uwekaji kati kwa sababu inamaanisha ni nodi tu zenye miunganisho ya haraka ya intaneti zinaweza kushiriki katika kuthibitisha bloku. Kwa miti ya Verkle hakuna haja ya kuwa na hali iliyohifadhiwa kwenye diski kuu yako; _kila kitu_ unachohitaji ili kuthibitisha bloku kimo ndani ya bloku yenyewe. Kwa bahati mbaya, shahidi wanaoweza kuzalishwa kutoka kwa trie za Merkle ni wakubwa mno kusaidia wateja wasio na hali.

## Kwa nini miti ya Verkle inawezesha shahidi wadogo? {#why-do-verkle-trees-enable-smaller-witnesses}

Muundo wa Merkle Trie hufanya ukubwa wa shahidi kuwa mkubwa sana - mkubwa mno kutangazwa kwa usalama kati ya rika ndani ya muda uliopangwa wa sekunde 12. Hii ni kwa sababu ushahidi ni njia inayounganisha data, ambayo inashikiliwa kwenye majani, na hashi ya mzizi. Ili kuthibitisha data ni muhimu kuwa na sio tu hashi zote za kati zinazounganisha kila jani na mzizi, bali pia nodi zote \"ndugu\". Kila nodi katika uthibitisho ina ndugu ambayo hupigwa hashi nayo ili kuunda hashi inayofuata juu ya trie. Hii ni data nyingi. Miti ya Verkle inapunguza ukubwa wa ushahidi kwa kufupisha umbali kati ya majani ya mti na mzizi wake na pia kuondoa hitaji la kutoa nodi ndugu kwa ajili ya kuthibitisha hashi ya mzizi. Ufanisi zaidi wa nafasi utapatikana kwa kutumia mpango wenye nguvu wa ahadi ya polinomiali badala ya ahadi ya vekta ya mtindo wa hashi. Ahadi ya polinomiali inaruhusu ushahidi kuwa na ukubwa maalum bila kujali idadi ya majani inayothibitisha.

Chini ya mpango wa ahadi ya polinomiali, shahidi wana ukubwa unaoweza kudhibitiwa ambao unaweza kuhamishwa kwa urahisi kwenye mtandao wa rika-kwa-rika. Hii inaruhusu wateja kuthibitisha mabadiliko ya hali katika kila bloku kwa kiwango kidogo cha data.

<ExpandableCard title="Ni kiasi gani hasa Miti ya Verkle inapunguza ukubwa wa shahidi?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

Ukubwa wa ushahidi hutofautiana kulingana na idadi ya majani inayojumuisha. Tukichukulia kuwa ushahidi unashughulikia majani 1000, ushahidi kwa trie ya Merkle utakuwa takriban MB 3.5 (tukichukulia viwango 7 vya trie). Ushahidi kwa data sawa katika mti wa Verkle (tukichukulia viwango 4 vya mti) utakuwa takriban kB 150 - **takriban 23x ndogo zaidi**. Upungufu huu wa ukubwa wa ushahidi utaruhusu shahidi wa wateja wasio na hali kuwa wadogo kwa kukubalika. Shahidi wa polinomiali ni kB 0.128 - 1 kulingana na ahadi maalum ya polinomiali inayotumiwa.

</ExpandableCard>

## Muundo wa mti wa Verkle ni upi? {#what-is-the-structure-of-a-verkle-tree}

Miti ya Verkle ni jozi za `(ufunguo, thamani)` ambapo funguo ni elementi za baiti-32 zinazoundwa na _shina_ la baiti-31 na _kiambishi tamati_ cha baiti moja. Funguo hizi zimepangwa katika nodi za _kiendelezi_ na nodi za _ndani_. Nodi za kiendelezi zinawakilisha shina moja kwa watoto 256 wenye viambishi tamati tofauti. Nodi za ndani pia zina watoto 256, lakini zinaweza kuwa nodi zingine za kiendelezi. Tofauti kuu kati ya muundo wa mti wa Verkle na mti wa Merkle ni kwamba mti wa Verkle ni bapa zaidi, ikimaanisha kuna nodi chache za kati zinazounganisha jani na mzizi, na hivyo data kidogo inahitajika kuzalisha uthibitisho.

![](./verkle.png)

[Soma zaidi kuhusu muundo wa miti ya Verkle](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## Maendeleo ya sasa {#current-progress}

Testnet za miti ya Verkle tayari ziko hewani na zinafanya kazi, lakini bado kuna masasisho makubwa ambayo hayajafanywa kwa wateja ambayo yanahitajika ili kusaidia miti ya Verkle. Unaweza kusaidia kuharakisha maendeleo kwa kupeleka mikataba kwenye mitandao ya majaribio au kuendesha wateja wa mitandao ya majaribio.

[Tazama Guillaume Ballet akielezea testnet ya Condrieu Verkle](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (kumbuka kuwa testnet ya Condrieu ilikuwa ya uthibitishaji-wa-kazi na sasa imebadilishwa na testnet ya Verkle Gen Devnet 6).

## Masomo zaidi {#further-reading}

- [Miti ya Verkle kwa ajili ya Kutokuwa na Hali](https://verkle.info/)
- [Dankrad Feist akielezea miti ya Verkle kwenye PEEPanEIP](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [Miti ya Verkle kwa Sisi Wengine](https://web.archive.org/web/20250124132255/https://research.2077.xyz/verkle-trees)
- [Anatomia ya Uthibitisho wa Verkle](https://ihagopian.com/posts/anatomy-of-a-verkle-proof)
- [Guillaume Ballet akielezea miti ya Verkle kwenye ETHGlobal](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- [\"Jinsi miti ya Verkle inavyoifanya Ethereum iwe nyepesi na bora\" na Guillaume Ballet kwenye Devcon 6](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [Piper Merriam kuhusu wateja wasio na hali kutoka ETHDenver 2020](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [Dankrad Fiest akielezea miti ya Verkle na kutokuwa na hali kwenye podikasti ya Zero Knowledge](https://zeroknowledge.fm/podcast/202/)
- [Vitalik Buterin kuhusu miti ya Verkle](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Dankrad Feist kuhusu miti ya Verkle](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [Nyaraka za EIP za mti wa Verkle](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)
