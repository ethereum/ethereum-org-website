---
title: Serializace pomocí Recursive-length prefix (RLP)
description: Definice kódování RLP v exekuční vrstvě Etherea.
lang: cs
sidebarDepth: 2
---

Serializace pomocí Recursive Length Prefix (RLP) se hojně využívá v exekučních klientech Etherea. RLP standardizuje převod dat mezi uzly v prostorově úsporném formátu. Účelem RLP je kódovat libovolně vnořená pole binárních dat a RLP je primární metodou kódování používanou k serializaci objektů v exekuční vrstvě Etherea. Hlavním účelem RLP je kódovat strukturu; s výjimkou kladných celých čísel deleguje RLP kódování specifických datových typů (např. řetězců, čísel s plovoucí desetinnou čárkou) na protokoly vyššího řádu. Kladná celá čísla musí být reprezentována v binární formě big-endian bez úvodních nul (čímž se celočíselná hodnota nula stává ekvivalentní prázdnému poli bajtů). Deserializovaná kladná celá čísla s úvodními nulami musí být jakýmkoli protokolem vyššího řádu používajícím RLP považována za neplatná.

Více informací najdete v [yellow paperu Etherea (Příloha B)](https://ethereum.github.io/yellowpaper/paper.pdf#page=19).

Pro použití RLP ke kódování slovníku se doporučují tyto dvě kanonické formy:

- použít `[[k1,v1],[k2,v2]...]` s klíči v lexikografickém pořadí
- použít kódování Patricia Tree vyšší úrovně, jak to dělá [Ethereum](/)

## Definice {#definition}

Funkce kódování RLP přijímá položku. Položka je definována následovně:

- řetězec (tj. pole bajtů) je položka
- seznam položek je položka
- kladné celé číslo je položka

Například všechny následující jsou položky:

- prázdný řetězec;
- řetězec obsahující slovo „cat“;
- seznam obsahující libovolný počet řetězců;
- a složitější datové struktury jako `["cat", ["puppy", "cow"], "horse", [[]], "pig", [""], "sheep"]`.
- číslo `100`

Vezměte na vědomí, že v kontextu zbytku této stránky znamená „řetězec“ „určitý počet bajtů binárních dat“; nepoužívají se žádná speciální kódování a nepředpokládá se žádná znalost obsahu řetězců (s výjimkou toho, co vyžaduje pravidlo proti neminimálním kladným celým číslům).

Kódování RLP je definováno následovně:

- Kladné celé číslo je převedeno na nejkratší pole bajtů, jehož interpretace big-endian odpovídá tomuto celému číslu, a poté je zakódováno jako řetězec podle níže uvedených pravidel.
- Pro jeden bajt, jehož hodnota je v rozsahu `[0x00, 0x7f]` (desítkově `[0, 127]`), je tento bajt svým vlastním kódováním RLP.
- Jinak, pokud je řetězec dlouhý 0-55 bajtů, kódování RLP se skládá z jednoho bajtu s hodnotou **0x80** (desítkově 128) plus délka řetězce, po kterém následuje samotný řetězec. Rozsah prvního bajtu je tedy `[0x80, 0xb7]` (desítkově `[128, 183]`).
- Pokud je řetězec delší než 55 bajtů, kódování RLP se skládá z jednoho bajtu s hodnotou **0xb7** (desítkově 183) plus délka v bajtech délky řetězce v binární formě, po které následuje délka řetězce a následně samotný řetězec. Například řetězec dlouhý 1024 bajtů by byl zakódován jako `\xb9\x04\x00` (desítkově `185, 4, 0`), po kterém následuje řetězec. Zde je `0xb9` (183 + 2 = 185) jako první bajt, po kterém následují 2 bajty `0x0400` (desítkově 1024), které označují délku samotného řetězce. Rozsah prvního bajtu je tedy `[0xb8, 0xbf]` (desítkově `[184, 191]`).
- Pokud je řetězec dlouhý 2^64 bajtů nebo delší, nesmí být zakódován.
- Pokud je celkový užitečný náklad (payload) seznamu (tj. kombinovaná délka všech jeho položek kódovaných pomocí RLP) dlouhý 0-55 bajtů, kódování RLP se skládá z jednoho bajtu s hodnotou **0xc0** plus délka užitečného nákladu, po kterém následuje zřetězení RLP kódování jednotlivých položek. Rozsah prvního bajtu je tedy `[0xc0, 0xf7]` (desítkově `[192, 247]`).
- Pokud je celkový užitečný náklad seznamu delší než 55 bajtů, kódování RLP se skládá z jednoho bajtu s hodnotou **0xf7** plus délka v bajtech délky užitečného nákladu v binární formě, po které následuje délka užitečného nákladu a následně zřetězení RLP kódování jednotlivých položek. Rozsah prvního bajtu je tedy `[0xf8, 0xff]` (desítkově `[248, 255]`).

Ve stručné formě:

| Rozsah | Bajt 1 | Bajt 2 | ... | Bajt 9 | Bajt 10 | Význam |
| ----------- | ---------- | ---------- | ---------- | --------------------- | ---------- | ----------------------------------------- |
| `0x00-0x7f` | `0ppppppp` |            |            |                       |            | jednobajtový řetězec                        |
| `0x80-0xb7` | `10nnnnnn` | `pppppppp` | `...`      |                       |            | krátký řetězec (0-55 bajtů)                 |
| `0xb8-0xbf` | `10111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | dlouhý řetězec, N+1 bajtů pro délku, poté užitečný náklad |
| `0xc0-0xf7` | `11nnnnnn` | `pppppppp` | `...`      |                       |            | krátký seznam (0-55 bajtů)                   |
| `0xf8-0xff` | `11111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | dlouhý seznam, N+1 bajtů pro délku, poté užitečný náklad |

- `p` = užitečný náklad (payload)
- `n` = délka (počet bajtů užitečného nákladu)
- `N` = offset délky délky (následuje N+1 bajtů `n`)

V kódu to vypadá takto:

```python
def rlp_encode(input):
    if isinstance(input,str):
        if len(input) == 1 and ord(input) < 0x80:
            return input
        return encode_length(len(input), 0x80) + input
    elif isinstance(input, list):
        output = ''
        for item in input:
            output += rlp_encode(item)
        return encode_length(len(output), 0xc0) + output

def encode_length(L, offset):
    if L < 56:
         return chr(L + offset)
    elif L < 256**8:
         BL = to_binary(L)
         return chr(len(BL) + offset + 55) + BL
    raise Exception("input too long")

def to_binary(x):
    if x == 0:
        return ''
    return to_binary(int(x / 256)) + chr(x % 256)
```

## Příklady {#examples}

- řetězec „dog“ = [ 0x83, 'd', 'o', 'g' ]
- seznam [ „cat“, „dog“ ] = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- prázdný řetězec ('null') = `[ 0x80 ]`
- prázdný seznam = `[ 0xc0 ]`
- celé číslo 0 = `[ 0x80 ]`
- bajt '\x00' = `[ 0x00 ]`
- bajt '\x0f' = `[ 0x0f ]`
- bajty '\x04\x00' = `[ 0x82, 0x04, 0x00 ]`
- [množinově teoretická reprezentace čísla](https://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers) tři, `[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- řetězec „Lorem ipsum dolor sit amet, consectetur adipisicing elit“ = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ... , 'e', 'l', 'i', 't' ]`

## Dekódování RLP {#rlp-decoding}

Podle pravidel a procesu kódování RLP je vstup dekódování RLP považován za pole binárních dat. Proces dekódování RLP je následující:

1.  podle prvního bajtu (tj. předpony) vstupních dat a dekódování datového typu se určí délka skutečných dat a offset;

2.  podle typu a offsetu dat se data odpovídajícím způsobem dekódují, přičemž se respektuje pravidlo minimálního kódování pro kladná celá čísla;

3.  pokračuje se v dekódování zbytku vstupu;

Pravidla pro dekódování datových typů a offsetu jsou následující:

1.  data jsou řetězec, pokud je rozsah prvního bajtu (tj. předpony) [0x00, 0x7f], a řetězec je přesně samotný první bajt;

2.  data jsou řetězec, pokud je rozsah prvního bajtu [0x80, 0xb7], a řetězec, jehož délka se rovná prvnímu bajtu minus 0x80, následuje po prvním bajtu;

3.  data jsou řetězec, pokud je rozsah prvního bajtu [0xb8, 0xbf], a délka řetězce, jehož délka v bajtech se rovná prvnímu bajtu minus 0xb7, následuje po prvním bajtu, a samotný řetězec následuje po délce řetězce;

4.  data jsou seznam, pokud je rozsah prvního bajtu [0xc0, 0xf7], a zřetězení RLP kódování všech položek seznamu, jehož celkový užitečný náklad se rovná prvnímu bajtu minus 0xc0, následuje po prvním bajtu;

5.  data jsou seznam, pokud je rozsah prvního bajtu [0xf8, 0xff], a celkový užitečný náklad seznamu, jehož délka se rovná prvnímu bajtu minus 0xf7, následuje po prvním bajtu, a zřetězení RLP kódování všech položek seznamu následuje po celkovém užitečném nákladu seznamu;

V kódu to vypadá takto:

```python
def rlp_decode(input):
    if len(input) == 0:
        return
    output = ''
    (offset, dataLen, type) = decode_length(input)
    if type is str:
        output = instantiate_str(substr(input, offset, dataLen))
    elif type is list:
        output = instantiate_list(substr(input, offset, dataLen))
    output += rlp_decode(substr(input, offset + dataLen))
    return output

def decode_length(input):
    length = len(input)
    if length == 0:
        raise Exception("input is null")
    prefix = ord(input[0])
    if prefix <= 0x7f:
        return (0, 1, str)
    elif prefix <= 0xb7 and length > prefix - 0x80:
        strLen = prefix - 0x80
        return (1, strLen, str)
    elif prefix <= 0xbf and length > prefix - 0xb7 and length > prefix - 0xb7 + to_integer(substr(input, 1, prefix - 0xb7)):
        lenOfStrLen = prefix - 0xb7
        strLen = to_integer(substr(input, 1, lenOfStrLen))
        return (1 + lenOfStrLen, strLen, str)
    elif prefix <= 0xf7 and length > prefix - 0xc0:
        listLen = prefix - 0xc0;
        return (1, listLen, list)
    elif prefix <= 0xff and length > prefix - 0xf7 and length > prefix - 0xf7 + to_integer(substr(input, 1, prefix - 0xf7)):
        lenOfListLen = prefix - 0xf7
        listLen = to_integer(substr(input, 1, lenOfListLen))
        return (1 + lenOfListLen, listLen, list)
    raise Exception("input does not conform to RLP encoding form")

def to_integer(b):
    length = len(b)
    if length == 0:
        raise Exception("input is null")
    elif length == 1:
        return ord(b[0])
    return ord(substr(b, -1)) + to_integer(substr(b, 0, -1)) * 256
```

## Další čtení {#further-reading}

- [RLP v Ethereu](https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919)
- [Ethereum pod pokličkou: RLP](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- [Coglio, A. (2020). Ethereum's Recursive Length Prefix in ACL2. arXiv preprint arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## Související témata {#related-topics}

- [Patricia Merkle trie](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)