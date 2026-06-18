---
title: Simple serialize
description: Vysvětlení formátu SSZ na Ethereu.
lang: cs
sidebarDepth: 2
---

**Simple serialize (SSZ)** je metoda serializace používaná na Beacon chainu. Nahrazuje RLP serializaci používanou na exekuční vrstvě všude napříč vrstvou konsensu s výjimkou protokolu pro objevování peerů (peer discovery protocol). Chcete-li se dozvědět více o RLP serializaci, podívejte se na [Recursive-length prefix (RLP)](/developers/docs/data-structures-and-encoding/rlp/). SSZ je navržena tak, aby byla deterministická a také aby se dala efektivně převádět do Merkleova stromu (merkleizovat). SSZ si lze představit jako systém se dvěma komponentami: schématem pro serializaci a schématem pro merkleizaci, které je navrženo tak, aby efektivně pracovalo se serializovanou datovou strukturou.

## Jak SSZ funguje? {#how-does-ssz-work}

### Serializace {#serialization}

SSZ je schéma serializace, které není samopopisné – spoléhá se na schéma, které musí být známo předem. Cílem SSZ serializace je reprezentovat objekty libovolné složitosti jako řetězce bajtů. Pro „základní typy“ jde o velmi jednoduchý proces. Prvek je jednoduše převeden na hexadecimální bajty. Mezi základní typy patří:

- celá čísla bez znaménka (unsigned integers)
- booleovské hodnoty

Pro složité „složené“ typy je serializace komplikovanější, protože složený typ obsahuje více prvků, které mohou mít různé typy, různé velikosti, nebo obojí. Tam, kde mají všechny tyto objekty pevnou délku (tj. velikost prvků bude vždy konstantní bez ohledu na jejich skutečné hodnoty), je serializace jednoduše převodem každého prvku ve složeném typu, seřazeného do bajtových řetězců ve formátu little-endian. Tyto bajtové řetězce jsou spojeny dohromady. Serializovaný objekt má reprezentaci prvků s pevnou délkou ve formě seznamu bajtů ve stejném pořadí, v jakém se objevují v deserializovaném objektu.

U typů s proměnnou délkou jsou skutečná data nahrazena hodnotou „offsetu“ (posunu) na pozici daného prvku v serializovaném objektu. Skutečná data se přidají na haldu (heap) na konec serializovaného objektu. Hodnota offsetu je index začátku skutečných dat na haldě a funguje jako ukazatel na příslušné bajty.

Níže uvedený příklad ilustruje, jak funguje offsetování pro kontejner s prvky s pevnou i proměnnou délkou:

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

`serialized` by měl následující strukturu (zde je pro přehlednost doplněn pouze na 4 bity, ve skutečnosti se doplňuje na 32 bitů, a zachovává reprezentaci `int`):

```
[37, 0, 0, 0, 55, 0, 0, 0, 16, 0, 0, 0, 22, 0, 0, 0, 1, 2, 3, 4]
------------  -----------  -----------  -----------  ----------
      |             |            |           |            |
   number1       number2    offset pro    number 3   hodnota pro
                              vektor                   vektor
```

rozděleno do řádků pro přehlednost:

```
[
  37, 0, 0, 0,  # kódování little-endian pro `number1`.
  55, 0, 0, 0,  # kódování little-endian pro `number2`.
  16, 0, 0, 0,  # „Offset“, který ukazuje, kde začíná hodnota `vector` (little-endian 16).
  22, 0, 0, 0,  # kódování little-endian pro `number3`.
  1, 2, 3, 4,   # Skutečné hodnoty v `vector`.
]
```

Toto je stále zjednodušení – celá čísla a nuly ve výše uvedených schématech by ve skutečnosti byly uloženy jako seznamy bajtů, takto:

```
[
  10100101000000000000000000000000  # kódování little-endian pro `number1`
  10110111000000000000000000000000  # kódování little-endian pro `number2`.
  10010000000000000000000000000000  # „Offset“, který ukazuje, kde začíná hodnota `vector` (little-endian 16).
  10010110000000000000000000000000  # kódování little-endian pro `number3`.
  10000001100000101000001110000100   # Skutečná hodnota pole `bytes`.
]
```

Skutečné hodnoty pro typy s proměnnou délkou jsou tedy uloženy na haldě na konci serializovaného objektu a jejich offsety jsou uloženy na správných pozicích v seřazeném seznamu polí.

Existují také některé speciální případy, které vyžadují specifické zacházení, jako je typ `BitList`, který vyžaduje přidání omezení délky během serializace a jeho odstranění během deserializace. Úplné podrobnosti jsou k dispozici ve [specifikaci SSZ](https://github.com/ethereum/consensus-specs/blob/master/ssz/simple-serialize.md).

### Deserializace {#deserialization}

K deserializaci tohoto objektu je potřeba <b>schéma</b>. Schéma definuje přesné rozložení serializovaných dat tak, aby každý konkrétní prvek mohl být deserializován z blobu bajtů do nějakého smysluplného objektu, jehož prvky mají správný typ, hodnotu, velikost a pozici. Je to právě schéma, které deserializátoru říká, které hodnoty jsou skutečné hodnoty a které jsou offsety. Všechny názvy polí při serializaci objektu zmizí, ale při deserializaci jsou podle schématu znovu obnoveny.

Interaktivní vysvětlení tohoto procesu najdete na [ssz.dev](https://www.ssz.dev/overview).

## Merkleizace {#merkleization}

Tento SSZ serializovaný objekt pak může být merkleizován – to znamená transformován do reprezentace stejných dat ve formě Merkleova stromu. Nejprve se určí počet 32bajtových bloků v serializovaném objektu. To jsou „listy“ stromu. Celkový počet listů musí být mocninou čísla 2, aby hashování listů dohromady nakonec vytvořilo jediný kořen hashovacího stromu (hash-tree-root). Pokud tomu tak přirozeně není, přidají se další listy obsahující 32 bajtů nul. Schematicky:

```
kořen hashovacího stromu
            /     \
           /       \
          /         \
         /           \
     hash listů      hash listů
       1 a 2           3 a 4
      /   \            /  \
     /     \          /    \
    /       \        /      \
 list1     list2  list3     list4
```

Existují také případy, kdy se listy stromu přirozeně nerozdělují rovnoměrně tak, jak je tomu ve výše uvedeném příkladu. Například list 4 by mohl být kontejner s více prvky, které vyžadují přidání další „hloubky“ do Merkleova stromu, čímž vznikne nerovnoměrný strom.

Místo toho, abychom tyto prvky stromu označovali jako list X, uzel X atd., můžeme jim přiřadit zobecněné indexy, počínaje kořenem = 1 a počítáním zleva doprava v každé úrovni. Toto je zobecněný index vysvětlený výše. Každý prvek v serializovaném seznamu má zobecněný index rovný `2**depth + idx`, kde idx je jeho pozice v serializovaném objektu (indexováno od nuly) a hloubka (depth) je počet úrovní v Merkleově stromu, který lze určit jako logaritmus o základu dva z počtu prvků (listů).

## Zobecněné indexy {#generalized-indices}

Zobecněný index je celé číslo, které reprezentuje uzel v binárním Merkleově stromu, kde má každý uzel zobecněný index `2 ** depth + index in row`.

```
1           --hloubka = 0  2**0 + 0 = 1
    2       3       --hloubka = 1  2**1 + 0 = 2, 2**1+1 = 3
  4   5   6   7     --hloubka = 2  2**2 + 0 = 4, 2**2 + 1 = 5...
```

Tato reprezentace poskytuje index uzlu pro každou část dat v Merkleově stromu.

## Multiproofs {#multiproofs}

Poskytnutí seznamu zobecněných indexů reprezentujících konkrétní prvek nám umožňuje ověřit jej vůči kořeni hashovacího stromu (hash-tree-root). Tento kořen je naší přijímanou verzí reality. Jakákoli data, která obdržíme, lze vůči této realitě ověřit tak, že je vložíme na správné místo v Merkleově stromu (určené jejich zobecněným indexem) a budeme sledovat, zda kořen zůstane konstantní. Ve specifikaci [zde](https://github.com/ethereum/consensus-specs/blob/master/ssz/merkle-proofs.md#merkle-multiproofs) jsou funkce, které ukazují, jak vypočítat minimální sadu uzlů potřebnou k ověření obsahu konkrétní sady zobecněných indexů.

Například k ověření dat na indexu 9 ve stromu níže potřebujeme hash dat na indexech 8, 9, 5, 3, 1.
Hash (8,9) by se měl rovnat hashi (4), který se hashuje s 5 a vytvoří 2, což se hashuje s 3 a vytvoří kořen stromu 1. Pokud by byla pro 9 poskytnuta nesprávná data, kořen by se změnil – zjistili bychom to a větev by se nepodařilo ověřit.

```
* = data potřebná k vygenerování důkazu

                    1*
          2                      3*
    4          5*          6          7
8*     9*   10    11   12    13    14    15
```

## Další čtení {#further-reading}

- [Aktualizace Etherea: SSZ](https://eth2book.info/altair/part2/building_blocks/ssz)
- [Aktualizace Etherea: Merkleizace](https://eth2book.info/altair/part2/building_blocks/merkleization)
- [Implementace SSZ](https://github.com/ethereum/consensus-specs/issues/2138)
- [Kalkulačka SSZ](https://simpleserialize.com/)
- [SSZ.dev](https://www.ssz.dev/)