---
title: Usanjari rahisi
description: Maelezo ya umbizo la SSZ la Ethereum.
lang: sw
sidebarDepth: 2
---

**Usanjari rahisi (SSZ)** ni mbinu ya usanjari inayotumika kwenye Mnyororo wa Beacon. Inachukua nafasi ya usanjari wa RLP unaotumika kwenye tabaka la utekelezaji kila mahali kwenye tabaka la mwafaka isipokuwa kwenye itifaki ya ugunduzi wa mwenza. Ili kujifunza zaidi kuhusu usanjari wa RLP, tazama [Kiambishi awali cha urefu wa kujirudia (RLP)](/developers/docs/data-structures-and-encoding/rlp/). SSZ imeundwa kuwa thabiti na pia kufanya umerkle kwa ufanisi. SSZ inaweza kufikiriwa kuwa na vijenzi viwili: mpango wa usanjari na mpango wa kugeuza kuwa mti wa Merkle ambao umeundwa kufanya kazi kwa ufanisi na muundo wa data uliosanjariwa.

## SSZ inafanyaje kazi? {#how-does-ssz-work}

### Usanjari {#serialization}

SSZ ni mpango wa usanjari ambao haujielezi wenyewe - badala yake unategemea skema ambayo lazima ijulikane mapema. Lengo la usanjari wa SSZ ni kuwakilisha vipengee vya utata wowote kama mifuatano ya baiti. Huu ni mchakato rahisi sana kwa "aina za msingi". Kipengele hubadilishwa tu kuwa baiti za heksadesimali. Aina za msingi ni pamoja na:

- nambari kamili zisizo na ishara (unsigned integers)
- Buleani (Booleans)

Kwa aina changamano za "mchanganyiko", usanjari ni mgumu zaidi kwa sababu aina ya mchanganyiko ina vipengele vingi ambavyo vinaweza kuwa na aina tofauti au ukubwa tofauti, au vyote viwili. Ambapo vipengee hivi vyote vina urefu usiobadilika (yaani, ukubwa wa vipengele utakuwa wa kudumu kila wakati bila kujali thamani zake halisi) usanjari ni ubadilishaji tu wa kila kipengele katika aina ya mchanganyiko kilichopangwa katika mifuatano ya baiti ya little-endian. Mifuatano hii ya baiti huunganishwa pamoja. Kipengee kilichosanjariwa kina uwakilishi wa orodha ya baiti ya vipengele vya urefu usiobadilika katika mpangilio sawa na jinsi vinavyoonekana katika kipengee kilichotolewa kwenye usanjari.

Kwa aina zenye urefu unaobadilika, data halisi hubadilishwa na thamani ya "kifidia" (offset) katika nafasi ya kipengele hicho katika kipengee kilichosanjariwa. Data halisi huongezwa kwenye lundo mwishoni mwa kipengee kilichosanjariwa. Thamani ya kifidia ni faharisi ya kuanza kwa data halisi kwenye lundo, ikifanya kazi kama kielekezi kwa baiti husika.

Mfano hapa chini unaonyesha jinsi ufidiaji unavyofanya kazi kwa kontena lenye vipengele vya urefu usiobadilika na unaobadilika:

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

`serialized` ingekuwa na muundo ufuatao (imejazwa tu hadi biti 4 hapa, imejazwa hadi biti 32 kiuhalisia, na kuweka uwakilishi wa `int` kwa uwazi):

```
[37, 0, 0, 0, 55, 0, 0, 0, 16, 0, 0, 0, 22, 0, 0, 0, 1, 2, 3, 4]
------------  -----------  -----------  -----------  ----------
      |             |            |           |            |
   nambari1      nambari2   kifidia cha   nambari 3   thamani ya
                               vekta                    vekta
```

imegawanywa kwenye mistari kwa uwazi:

```
[
  37, 0, 0, 0,  # usimbaji wa little-endian wa `number1`.
  55, 0, 0, 0,  # usimbaji wa little-endian wa `number2`.
  16, 0, 0, 0,  # "Kifidia" kinachoonyesha mahali thamani ya `vector` inapoanzia (little-endian 16).
  22, 0, 0, 0,  # usimbaji wa little-endian wa `number3`.
  1, 2, 3, 4,   # Thamani halisi katika `vector`.
]
```

Huu bado ni urahisishaji - nambari kamili na sufuri katika michoro hapo juu kwa kweli zingehifadhiwa kama orodha za baiti, kama hivi:

```
[
  10100101000000000000000000000000  # usimbaji wa little-endian wa `number1`
  10110111000000000000000000000000  # usimbaji wa little-endian wa `number2`.
  10010000000000000000000000000000  # "Kifidia" kinachoonyesha mahali thamani ya `vector` inapoanzia (little-endian 16).
  10010110000000000000000000000000  # usimbaji wa little-endian wa `number3`.
  10000001100000101000001110000100   # Thamani halisi ya uga wa `bytes`.
]
```

Kwa hivyo thamani halisi za aina zenye urefu unaobadilika huhifadhiwa kwenye lundo mwishoni mwa kipengee kilichosanjariwa huku vifidia vyake vikihifadhiwa katika nafasi zake sahihi katika orodha iliyopangwa ya nyanja.

Pia kuna baadhi ya matukio maalum ambayo yanahitaji matibabu maalum, kama vile aina ya `BitList` ambayo inahitaji kikomo cha urefu kuongezwa wakati wa usanjari na kuondolewa wakati wa kutoa kwenye usanjari. Maelezo kamili yanapatikana katika [vipimo vya SSZ](https://github.com/ethereum/consensus-specs/blob/master/ssz/simple-serialize.md).

### Kutoa kwenye usanjari {#deserialization}

Kutoa kipengee hiki kwenye usanjari kunahitaji <b>skema</b>. Skema inafafanua mpangilio kamili wa data iliyosanjariwa ili kila kipengele maalum kiweze kutolewa kwenye usanjari kutoka kwenye blobu ya baiti hadi kwenye kipengee chenye maana huku vipengele vikiwa na aina, thamani, ukubwa na nafasi sahihi. Ni skema inayomwambia mtoaji kwenye usanjari ni thamani zipi ni thamani halisi na zipi ni vifidia. Majina yote ya nyanja hupotea wakati kipengee kinaposanjariwa, lakini hurejeshwa wakati wa kutoa kwenye usanjari kulingana na skema.
## Kugeuza kuwa mti wa Merkle (Merkleization) {#merkleization}

Kipengee hiki kilichosanjariwa cha SSZ kinaweza kugeuzwa kuwa mti wa Merkle - yaani kubadilishwa kuwa uwakilishi wa mti wa Merkle wa data hiyo hiyo. Kwanza, idadi ya vipande vya baiti 32 katika kipengee kilichosanjariwa hubainishwa. Haya ni "majani" ya mti. Jumla ya idadi ya majani lazima iwe kipeo cha 2 ili kuheshiji pamoja majani hatimaye kuzalishe mzizi mmoja wa mti wa heshi. Ikiwa hii si hivyo kiasili, majani ya ziada yenye baiti 32 za sufuri huongezwa. Kwa mchoro:

```
mzizi wa mti wa heshi
            /     \
           /       \
          /         \
         /           \
   heshi ya majani  heshi ya majani
       1 na 2           3 na 4
      /   \            /  \
     /     \          /    \
    /       \        /      \
 jani1     jani2  jani3     jani4
```

Pia kuna matukio ambapo majani ya mti hayasambaaji kwa usawa kiasili kwa njia yanayofanya katika mfano hapo juu. Kwa mfano, jani la 4 linaweza kuwa kontena lenye vipengele vingi vinavyohitaji "kina" cha ziada kuongezwa kwenye mti wa Merkle, na kuunda mti usio sawa.

Badala ya kurejelea vipengele hivi vya mti kama jani X, nodi X n.k., tunaweza kuvipa faharisi za jumla, kuanzia na mzizi = 1 na kuhesabu kutoka kushoto kwenda kulia kando ya kila kiwango. Hii ndiyo faharisi ya jumla iliyoelezwa hapo juu. Kila kipengele katika orodha iliyosanjariwa kina faharisi ya jumla sawa na `2**depth + idx` ambapo idx ni nafasi yake yenye faharisi ya sufuri katika kipengee kilichosanjariwa na kina ni idadi ya viwango katika mti wa Merkle, ambayo inaweza kubainishwa kama logariti ya msingi wa mbili ya idadi ya vipengele (majani).

## Faharisi za jumla {#generalized-indices}

Faharisi ya jumla ni nambari kamili inayowakilisha nodi katika mti wa Merkle wa mfumo wa jozi ambapo kila nodi ina faharisi ya jumla `2 ** depth + index in row`.

```
1           --kina = 0  2**0 + 0 = 1
    2       3       --kina = 1  2**1 + 0 = 2, 2**1+1 = 3
  4   5   6   7     --kina = 2  2**2 + 0 = 4, 2**2 + 1 = 5...
```

Uwakilishi huu hutoa faharisi ya nodi kwa kila kipande cha data katika mti wa Merkle.

## Uthibitisho mwingi (Multiproofs) {#multiproofs}

Kutoa orodha ya faharisi za jumla zinazowakilisha kipengele maalum huturuhusu kukithibitisha dhidi ya mzizi wa mti wa heshi. Mzizi huu ndio toleo letu linalokubalika la uhalisia. Data yoyote tunayopewa inaweza kuthibitishwa dhidi ya uhalisia huo kwa kuiingiza mahali sahihi katika mti wa Merkle (inayobainishwa na faharisi yake ya jumla) na kuchunguza kwamba mzizi unabaki kuwa wa kudumu. Kuna vipengele vya utendaji katika vipimo [hapa](https://github.com/ethereum/consensus-specs/blob/master/ssz/merkle-proofs.md#merkle-multiproofs) vinavyoonyesha jinsi ya kukokotoa seti ya chini zaidi ya nodi zinazohitajika ili kuthibitisha yaliyomo katika seti fulani ya faharisi za jumla.

Kwa mfano, ili kuthibitisha data katika faharisi ya 9 katika mti ulio hapa chini, tunahitaji heshi ya data katika faharisi za 8, 9, 5, 3, 1.
Heshi ya (8,9) inapaswa kuwa sawa na heshi (4), ambayo huheshiji na 5 ili kuzalisha 2, ambayo huheshiji na 3 ili kuzalisha mzizi wa mti 1. Ikiwa data isiyo sahihi ilitolewa kwa 9, mzizi ungebadilika - tungegundua hili na kushindwa kuthibitisha tawi.

```
* = data inayohitajika ili kuzalisha uthibitisho

                    1*
          2                      3*
    4          5*          6          7
8*     9*   10    11   12    13    14    15
```

## Usomaji zaidi {#further-reading}

- [Kuboresha Ethereum: SSZ](https://eth2book.info/altair/part2/building_blocks/ssz)
- [Kuboresha Ethereum: Kugeuza kuwa mti wa Merkle](https://eth2book.info/altair/part2/building_blocks/merkleization)
- [Utekelezaji wa SSZ](https://github.com/ethereum/consensus-specs/issues/2138)
- [Kikokotoo cha SSZ](https://simpleserialize.com/)
