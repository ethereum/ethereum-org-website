---
title: Utaratibu rahisi wa kupanga
description: Ufafanuzi wa muundo wa SSZ wa Ethereum.
lang: sw
sidebarDepth: 2
---

**Serializesheni Rahisi (SSZ)** ni mbinu ya userializesheni inayotumika kwenye Mnyororo Kioleza. Inachukua nafasi ya usanifu wa RLP unaotumiwa kwenye safu ya utekelezaji kila mahali kwenye safu ya makubaliano isipokuwa itifaki ya ugunduzi wa programu zingine. Ili kupata maelezo zaidi kuhusu serializesheni ya RLP, tazama [Kiambishi awali cha urefu kinachojirudia (RLP)](/developers/docs/data-structures-and-encoding/rlp/). SSZ imeundwa kubainisha na pia Merkleize kwa ufanisi. SSZ inaweza kuzingatiwa kuwa na vipengee viwili: mpango wa kuratibu na mpango wa Merkleization ambao umeundwa kufanya kazi kwa ufanisi na muundo wa data uliosanifiwa.

## SSZ inafanya kazi vipi? {#how-does-ssz-work}

### Serializesheni {#serialization}

SSZ ni mpango wa kuratibu ambao haujielezi - badala yake unategemea mpango ambao lazima ujulikane mapema. Kusudi la usanifu wa SSZ ni kuwakilisha vitu vya ugumu wa kiholela kama kamba za baiti. Huu ni mchakato rahisi sana kwa "aina za msingi". Kipengele kinabadilishwa tu kuwa baiti za hexadecimal. Aina za msingi ni pamoja na:

- nambari kamili ambazo hazijasainiwa
- Thamani za Mantiki

Kwa aina tata za "mchanganyiko", usakinishaji ni mgumu zaidi kwa sababu aina ya mchanganyiko ina vipengele vingi ambavyo vinaweza kuwa na aina tofauti au ukubwa tofauti, au zote mbili. Ikiwa vitu hivi vyote vina urefu usiobadilika (yaani, ukubwa wa vipengele daima ni wa kudumu bila kujali thamani zao halisi), userializesheni ni ubadilishaji rahisi wa kila kipengele katika aina ya mchanganyiko, unaopangwa katika mifuatano ya baiti ya mwisho-mdogo. Mlolongo huu wa baiti huunganishwa pamoja. Kitu kilichofanyiwa usanifu huwa na mwakilishi wa orodha ya baiti wa vipengele vyenye urefu wa kudumu katika mpangilio uleule kama vinavyoonekana kwenye kitu kilichorudishwa.

Kwa aina zilizo na urefu tofauti, data halisi hubadilishwa na thamani ya "kukabiliana" katika nafasi ya kipengele hicho katika kitu kilichosanifiwa. Data halisi huongezwa kwenye lundo mwishoni mwa kitu kilichopangwa mfululizo. Thamani ya kukabiliana ni tofauti tofauti ya kuanza kwa data halisi kwenye lundo, ikifanya kazi kama kiashirio kwa baiti husika.

Mfano hapa chini unaonyesha jinsi urekebishaji unavyofanya kazi kwa kontena iliyo na vitu vilivyowekwa na vya urefu tofauti:

```Rust

    struct Dummy {

        number1: u64,
        number2: u64,
        vector: Vec<u8>,
        number3: u64
    }

    dummy = Dummy{

        number1: 37,
        number2: 55,
        vector: vec![1,2,3,4],
        number3: 22,
    }

    serialized = ssz.serialize(dummy)

```

`serialized` ingekuwa na muundo ufuatao (imejazwa kwa biti 4 tu hapa, imejazwa kwa biti 32 katika uhalisia, na kuweka uwakilishi wa `int` kwa uwazi):

```
[37, 0, 0, 0, 55, 0, 0, 0, 16, 0, 0, 0, 22, 0, 0, 0, 1, 2, 3, 4]
------------  -----------  -----------  -----------  ----------
      |             |            |           |            |
   namba1       namba2    punguzo kwa    namba 3     thamani ya
                              vekta                    vekta

```

kugawanywa juu ya mistari kwa uwazi:

```
[
  37, 0, 0, 0,  # usimbaji wa mwisho-mdogo wa `namba1`.
  55, 0, 0, 0,  # usimbaji wa mwisho-mdogo wa `namba2`.
  16, 0, 0, 0,  # "Punguzo" linaloonyesha mahali ambapo thamani ya `vekta` huanza (mwisho-mdogo 16).
  22, 0, 0, 0,  # usimbaji wa mwisho-mdogo wa `namba3`.
  1, 2, 3, 4,   # Thamani halisi katika `vekta`.
]
```

Bado hii ni kurahisisha - nambari kamili na sifuri kwenye michoro hapo juu zingehifadhiwa kwa njia, kama hii:

```
[
  10100101000000000000000000000000  # usimbaji wa mwisho-mdogo wa `namba1`
  10110111000000000000000000000000  # usimbaji wa mwisho-mdogo wa `namba2`.
  10010000000000000000000000000000  # "Punguzo" linaloonyesha mahali ambapo thamani ya `vekta` huanza (mwisho-mdogo 16).
  10010110000000000000000000000000  # usimbaji wa mwisho-mdogo wa `namba3`.
  10000001100000101000001110000100   # Thamani halisi ya sehemu ya `baiti`.
]
```

Kwa hivyo maadili halisi ya aina za urefu tofauti huhifadhiwa kwenye lundo mwishoni mwa kitu kilichopangwa kwa mpangilio na urekebishaji wao ukihifadhiwa katika nafasi zao sahihi katika orodha ya sehemu zilizoagizwa.

Pia kuna baadhi ya kesi maalum zinazohitaji matibabu maalum, kama vile aina ya `BitList` inayohitaji kikomo cha urefu kuongezwa wakati wa userializesheni na kuondolewa wakati wa uondoaji-serializesheni. Maelezo kamili yanapatikana katika [maelezo ya SSZ](https://github.com/ethereum/consensus-specs/blob/dev/ssz/simple-serialize.md).

### Uondoaji-serializesheni {#deserialization}

Uondoaji-serializesheni wa kitu hiki unahitaji <b>skema</b>. Ratiba inafafanua mpangilio sahihi wa data iliyosawazishwa ili kila kipengele mahususi kiweze kuondolewa kutoka kwenye sehemu ya baiti hadi kwenye kitu fulani cha maana na vipengele vilivyo na aina, thamani, ukubwa na nafasi sahihi. Ni muundo wa data unaomwambia msanifukwa ni maadili gani ni maadili halisi na ni yapi ambayo yamepunguzwa. Majina yote ya sehemu hupotea wakati kitu kinapofanyiwa usanifu, lakini hurudishwa tena wakati wa Urejeshaji wa data katika muundo wake wa asili kulingana na muundo wa data.

Tazama [ssz.dev](https://www.ssz.dev/overview) kwa maelezo shirikishi kuhusu hili.

## Umerkleizesheni {#merkleization}

Kipengee hiki cha serialized cha SSZ kinaweza kisha kuwa merkleized - ambacho kinabadilishwa kuwa uwakilishi wa mti wa Merkle wa data sawa. Kwanza, idadi ya Vipande 32-baiti katika Kipengele kilichoorodheshwa kimeamuliwa. Hizi ni "majani" ya mti. Idadi ya jumla ya majani lazima iwe na nguvu ya 2 ili kuharakisha pamoja majani hatimaye kutoa mzizi mmoja wa mti wa hashi. Ikiwa hii sio kawaida, majani ya ziada yaliyo na baiti 32 za zero huongezwa. Kielelezo:

```
        mzizi wa mti wa hashi
            /     \
           /       \
          /         \
         /           \
   hashi ya majani  hashi ya majani
     1 na 2          3 na 4
      /   \            /  \
     /     \          /    \
    /       \        /      \
 jani1     jani2    jani3     jani4
```

Pia kuna matukio ambapo majani ya mti hayana kawaida sawasawa kusambaza kwa njia ya kufanya katika mfano hapo juu. Kwa mfano, jani la 4 linaweza kuwa chombo chenye vipengele vingi vinavyohitaji "kina" cha ziada ili kuongezwa kwenye mti wa Merkle, na kuunda mti usio na usawa.

Badala ya kurejelea vipengele hivi vya mti kama jani X, nodi X n. k, tunaweza kuvipa viashiria vya jumla, tukianza na mzizi = 1 na kuhesabu kutoka kushoto kwenda kulia kwa kila ngazi. Hiki ni kiashiria juimuishi kiliyoelezwa hapo juu. Kila kipengele katika orodha iliyofanyiwa userializesheni kina faharasa ya jumla sawa na `2**depth + idx` ambapo idx ni nafasi yake yenye faharasa-sifuri katika kitu kilichofanyiwa userializesheni na kina ni idadi ya viwango katika mti wa Merkle, ambayo inaweza kubainishwa kama logariti ya msingi-mbili ya idadi ya vipengele (majani).

## Faharasa za jumla {#generalized-indices}

Faharasa ya jumla ni nambari kamili inayowakilisha nodi katika mti wa Merkle wa binary ambapo kila nodi ina faharasa ya jumla `2 ** depth + index in row`.

```
        1           --kina = 0  2**0 + 0 = 1
    2       3       --kina = 1  2**1 + 0 = 2, 2**1+1 = 3
  4   5   6   7     --kina = 2  2**2 + 0 = 4, 2**2 + 1 = 5...

```

"Uwakilishi huu unatoa kiashiria cha nodi kwa kila kipande cha data katika mti wa Merkle."

## Uthibitisho-anuwai {#multiproofs}

"Kutoa orodha ya viashiria vilivyopanuliwa vinavyo wakilisha kipengele fulani kunaturuhusu kukithibitisha dhidi ya mizizi ya mti wa hash." Mzizi huu ni toleo letu la ukweli linalokubalika. Data yoyote tunayopewa inaweza kuthibitishwa dhidi ya ukweli huo kwa kuiingiza mahali pazuri katika mti wa Merkle na kuzingatia kwamba mzizi unabaki bila kubadilika. Kuna kazi katika maelezo [hapa](https://github.com/ethereum/consensus-specs/blob/dev/ssz/merkle-proofs.md#merkle-multiproofs) zinazoonyesha jinsi ya kukokotoa seti ndogo iwezekanavyo ya nodi zinazohitajika ili kuthibitisha maudhui ya seti maalum ya faharasa za jumla.

Kwa mfano, ili kuthibitisha data katika fahirisi ya 9 kwenye mti ulio hapa chini, tunahitaji heshi ya data katika kiashiria 8, 9, 5, 3, 1.
Heshi ya (8,9) inapaswa kuwa sawa na (4), ambayo heshi na 5 kutoa 2, ambayo heshi yenye 3 ili kutoa mzizi wa mti 1. Ikiwa data isiyo sahihi ilitolewa kwa 9, mzizi ungebadilika - tungegundua hii na kushindwa kuthibitisha tawi.

```
* = data inayohitajika ili kutoa uthibitisho

                    1*
          2                      3*
    4          5*          6          7
8*     9*   10    11   12    13    14    15

```

## Masomo zaidi {#further-reading}

- [Kuboresha Ethereum: SSZ](https://eth2book.info/altair/part2/building_blocks/ssz)
- [Kuboresha Ethereum: Umerkleizesheni](https://eth2book.info/altair/part2/building_blocks/merkleization)
- [Utekelezaji wa SSZ](https://github.com/ethereum/consensus-specs/issues/2138)
- [Kikokotoo cha SSZ](https://simpleserialize.com/)
- [SSZ.dev](https://www.ssz.dev/)
