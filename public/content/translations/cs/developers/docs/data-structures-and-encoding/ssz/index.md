---
title: "Jednoduchá serializace"
description: "Vysvětlení formátu SSZ Etherea."
lang: cs
sidebarDepth: 2
---

**Jednoduchá serializace (SSZ)** je metoda serializace používaná na Beacon Chainu. Nahrazuje RLP serializaci, která je používána na exekuční vrstvě a všude v rámci konsensuální vrstvy kromě protokolu pro objevování peerů. Více informací o serializaci RLP naleznete v článku [Recursive-length prefix (RLP)](/developers/docs/data-structures-and-encoding/rlp/). SSZ je navržena tak, aby byla deterministická a také efektivně merkelizovatelná. Na SSZ můžeme pohlížet jako na dvě složky: Schéma serializace a schéma merkelizace, které je navrženo tak, aby efektivně fungovalo se serializovanou datovou strukturou.

## Jak SSZ funguje? {#how-does-ssz-work}

### Serializace {#serialization}

SSZ je schéma serializace, které není samo o sobě popisné - spíše spoléhá na schéma, které musí být předem známo. Cílem SSZ serializace je reprezentovat objekty libovolné složitosti jako řetězce bajtů. Tento proces je velmi jednoduchý pro "základní typy". Element je jednoduše převeden na hexadecimální bajty. Mezi základní typy patří:

- celá čísla bez znaménka
- booleovské hodnoty

Pro složité "kompozitní" typy je serializace složitější, protože kompozitní typ obsahuje více prvků, které mohou mít různé typy nebo různé velikosti, nebo obojí. V případech, kdy mají všechny tyto objekty pevnou délku (tj. velikost prvků bude vždy konstantní bez ohledu na jejich skutečné hodnoty), je serializace jednoduše konverzí každého prvku ve složeném typu, seřazeného do little-endian bajtových řetězců. Tyto bajtové řetězce jsou spojeny dohromady. Serializovaný objekt má bytelistovou reprezentaci prvků s pevnou délkou ve stejném pořadí, v jakém se objevují v deserializovaném objektu.

Pro typy s proměnlivou délkou se skutečná data nahrazují hodnotou "offsetu" na pozici toho prvku v serializovaném objektu. Skutečná data se přidávají do zásobníku na konci serializovaného objektu. Hodnota offsetu je indexem pro začátek skutečných dat v zásobníku, což funguje jako ukazatel na příslušné bajty.

Následující příklad ilustruje, jak funguje offsetování pro kontejner s prvky s pevnou i proměnlivou délkou:

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

`serialized` by mělo následující strukturu (zde pouze doplněno na 4 bity, ve skutečnosti doplněno na 32 bitů a pro přehlednost je zachována reprezentace `int`):

```
[37, 0, 0, 0, 55, 0, 0, 0, 16, 0, 0, 0, 22, 0, 0, 0, 1, 2, 3, 4]
------------  -----------  -----------  -----------  ----------
      |             |            |           |            |
   number1       number2    posun pro    number 3    hodnota pro
                              vektor                   vektor

```

pro přehlednost je rozdělíme do řádků:

```
[
  37, 0, 0, 0,  # kódování `number1` v pořadí little-endian.
  55, 0, 0, 0,  # kódování `number2` v pořadí little-endian.
  16, 0, 0, 0,  # „Posun“, který udává, kde začíná hodnota `vector` (little-endian 16).
  22, 0, 0, 0,  # kódování `number3` v pořadí little-endian.
  1, 2, 3, 4,   # Skutečné hodnoty ve `vector`.
]
```

Toto je stále zjednodušení - celá čísla a nuly ve schématech výše by ve skutečnosti byly uloženy bytelisty, jako je tento:

```
[
  10100101000000000000000000000000  # kódování `number1` v pořadí little-endian
  10110111000000000000000000000000  # kódování `number2` v pořadí little-endian.
  10010000000000000000000000000000  # „Posun“, který udává, kde začíná hodnota `vector` (little-endian 16).
  10010110000000000000000000000000  # kódování `number3` v pořadí little-endian.
  10000001100000101000001110000100   # Skutečná hodnota pole `bytes`.
]
```

Takže skutečné hodnoty pro typy s proměnlivou délkou jsou uloženy v zásobníku na konci serializovaného objektu, přičemž jejich offsety jsou uloženy na správných pozicích v uspořádaném seznamu polí.

Existují také některé speciální případy, které vyžadují specifické zacházení, například typ `BitList`, který vyžaduje přidání délkového limitu během serializace a jeho odstranění během deserializace. Veškeré podrobnosti jsou k dispozici ve [specifikaci SSZ](https://github.com/ethereum/consensus-specs/blob/dev/ssz/simple-serialize.md).

### Deserializace {#deserialization}

K deserializaci tohoto objektu je zapotřebí <b>schéma</b>. Schéma definuje přesné uspořádání serializovaných dat tak, aby každý konkrétní prvek mohl být deserializován z blobu bajtů do nějakého smysluplného objektu s prvky majícími správný typ, hodnotu, velikost a pozici. Je to právě schéma, které říká deserializátoru, které hodnoty jsou skutečné hodnoty a které jsou offsety. Všechny názvy polí zmizí, když je objekt serializován, ale při deserializaci se podle schématu znovu vytvoří.

Pro interaktivní vysvětlení se podívejte na [ssz.dev](https://www.ssz.dev/overview).

## Merkleizace {#merkleization}

Tento SSZ serializovaný objekt pak může být merkelizován - to znamená transformován do Merkleova stromu reprezentujícího stejná data. Nejprve se určí počet 32bajtových bloků v serializovaném objektu. Tyto bloky tvoří „listy“ stromu. Celkový počet listů musí být mocnina dvou, aby hašování listů nakonec vytvořilo jediný hašový kořen stromu. Pokud tomu tak přirozeně není, jsou přidány další listy obsahující 32 bajtů nul. Schématicky:

```
        kořen hašového stromu
            /     \
           /       \
          /         \
         /           \
   haš listů     haš listů
     1 a 2           3 a 4
      /   \            /  \
     /     \          /    \
    /       \        /      \
 list1     list2  list3     list4
```

Existují také případy, kdy se listy stromu přirozeně nerozdělují rovnoměrně, jako tomu bylo v předchozím příkladu. Například list 4 by mohl být kontejner s více prvky, které vyžadují přidání další "hloubky" do Merkle tree, čímž se vytvoří nerovnoměrný strom.

Místo toho, abychom tyto prvky stromu označovali jako list X, uzel X atd., můžeme jim přiřadit zobecněné indexy, počínaje kořenem = 1 a číslováním zleva doprava na každé úrovni. Toto je zobecněný index, který jsme vysvětlili výše. Každý prvek v serializovaném seznamu má zobecněný index rovný `2**depth + idx`, kde idx je jeho pozice s indexem nula v serializovaném objektu a hloubka je počet úrovní v Merkle tree, který lze určit jako logaritmus počtu prvků (listů) při základu 2.

## Zobecněné indexy {#generalized-indices}

Zobecněný index je celé číslo, které představuje uzel v binárním Merkle tree, kde každý uzel má zobecněný index `2 ** depth + index in row`.

```
        1           --hloubka = 0  2**0 + 0 = 1
    2       3       --hloubka = 1  2**1 + 0 = 2, 2**1+1 = 3
  4   5   6   7     --hloubka = 2  2**2 + 0 = 4, 2**2 + 1 = 5...

```

Toto zobrazení poskytuje index uzlu pro každý datový prvek v Merkletree.

## Multiproofy {#multiproofs}

Poskytnutí seznamu zobecněných indexů představujících konkrétní prvek nám umožňuje jej ověřit vůči hašovému kořenovému stromu. Tento kořen je naším přijatým zobrazením reality. Jakákoli data, která nám jsou poskytnuta, mohou být ověřena vůči této realitě vložením do správného místa v Merkle tree (určeného jeho zobecněným indexem) a pozorováním, zda kořen zůstává konstantní. Ve specifikaci [zde](https://github.com/ethereum/consensus-specs/blob/dev/ssz/merkle-proofs.md#merkle-multiproofs) jsou funkce, které ukazují, jak vypočítat minimální sadu uzlů potřebnou k ověření obsahu konkrétní sady zobecněných indexů.

Například k ověření dat na indexu 9 v níže uvedeném stromu potřebujeme haš dat na indexech 8, 9, 5, 3, 1.
Haš (8,9) by měl být roven haši (4), který se hašuje s 5 a vytváří 2, který se hašuje s 3 a vytváří kořen stromu 1. Pokud by byla poskytnuta nesprávná data pro 9, kořen by se změnil – to bychom zjistili a ověření větve by selhalo.

```
* = data potřebná k vygenerování důkazu

                    1*
          2                      3*
    4          5*          6          7
8*     9*   10    11   12    13    14    15

```

## Další čtení {#further-reading}

- [Vylepšení Etherea: SSZ](https://eth2book.info/altair/part2/building_blocks/ssz)
- [Vylepšení Etherea: Merkleizace](https://eth2book.info/altair/part2/building_blocks/merkleization)
- [Implementace SSZ](https://github.com/ethereum/consensus-specs/issues/2138)
- [Kalkulačka SSZ](https://simpleserialize.com/)
- [SSZ.dev](https://www.ssz.dev/)
