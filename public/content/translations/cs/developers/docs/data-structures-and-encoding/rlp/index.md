---
title: "Serializace rekurzivního délkového prefixu (RLP)"
description: "Definice kódování RLP v exekuční vrstvě Etherea."
lang: cs
sidebarDepth: 2
---

Serializace rekurzivního délkového prefixu (RLP) se hojně používá v exekučních klientech Etherea. RLP standardizuje přenos dat mezi uzly v prostorově úsporném formátu. Účelem RLP je kódovat libovolně vnořená pole binárních dat a RLP je primární metodou kódování používanou k serializaci objektů v exekuční vrstvě Etherea. Hlavním účelem RLP je kódovat strukturu; s výjimkou kladných celých čísel RLP deleguje kódování specifických datových typů (např. řetězců, čísel s plovoucí desetinnou čárkou) na protokoly vyššího řádu. Kladná celá čísla musí být reprezentována v binární formě big-endian bez úvodních nul (takže celočíselná hodnota nula je ekvivalentní prázdnému poli bajtů). Deserializovaná kladná celá čísla s úvodními nulami musí být jakýmkoli protokolem vyššího řádu používajícím RLP považována za neplatná.

Více informací v [Ethereum yellow paper (Dodatek B)](https://ethereum.github.io/yellowpaper/paper.pdf#page=19).

Pro použití RLP ke kódování slovníku jsou dvě navrhované kanonické formy:

- použijte `[[k1,v1],[k2,v2]...]` s klíči v lexikografickém pořadí
- použijte kódování Patricia Tree na vyšší úrovni, tak jak to dělá Ethereum

## Definice {#definition}

Kódovací funkce RLP přijímá položku. Položka je definována následovně:

- řetězec (tj. pole bajtů) je položka
- seznam položek je položka
- kladné celé číslo je položka

Například všechny následující jsou položky:

- prázdný řetězec;
- řetězec obsahující slovo "cat";
- seznam obsahující libovolný počet řetězců;
- a složitější datové struktury, jako je `["cat", ["puppy", "cow"], "horse", [[]], "pig", [""], "sheep"]`.
- číslo `100`

Všimněte si, že v kontextu zbytku této stránky „řetězec“ znamená „určitý počet bajtů binárních dat“; nepoužívají se žádná speciální kódování a nepředpokládá se žádná znalost o obsahu řetězců (kromě toho, co vyžaduje pravidlo proti neminimálním kladným celým číslům).

Kódování RLP je definováno následovně:

- U kladného celého čísla se toto převede na nejkratší pole bajtů, jehož interpretace big-endian je dané celé číslo, a poté se zakóduje jako řetězec podle níže uvedených pravidel.
- Pro jediný bajt, jehož hodnota je v rozsahu `[0x00, 0x7f]` (desítkově `[0, 127]`), je tento bajt svým vlastním kódováním RLP.
- Jinak, pokud je řetězec dlouhý 0–55 bajtů, kódování RLP se skládá z jednoho bajtu s hodnotou **0x80** (des. 128) plus délka řetězce, po níž následuje samotný řetězec. Rozsah prvního bajtu je tedy `[0x80, 0xb7]` (des. `[128, 183]`).
- Pokud je řetězec delší než 55 bajtů, kódování RLP se skládá z jednoho bajtu s hodnotou **0xb7** (des. 183) plus délka délky řetězce v bajtech v binární formě, následovaná délkou řetězce a samotným řetězcem. Například řetězec dlouhý 1024 bajtů by byl zakódován jako `\xb9\x04\x00` (des. `185, 4, 0`) a za ním by následoval řetězec. Zde je `0xb9` (183 + 2 = 185) jako první bajt, po němž následují 2 bajty `0x0400` (des. 1024), které označují délku skutečného řetězce. Rozsah prvního bajtu je tedy `[0xb8, 0xbf]` (des. `[184, 191]`).
- Pokud je řetězec dlouhý 2^64 bajtů nebo více, nesmí být kódován.
- Pokud je celková datová část seznamu (tj. kombinovaná délka všech jeho položek kódovaných pomocí RLP) dlouhá 0–55 bajtů, kódování RLP se skládá z jediného bajtu s hodnotou **0xc0** plus délka datové části, po níž následuje zřetězení kódování RLP jednotlivých položek. Rozsah prvního bajtu je tedy `[0xc0, 0xf7]` (des. `[192, 247]`).
- Pokud je celková datová část seznamu delší než 55 bajtů, kódování RLP se skládá z jednoho bajtu s hodnotou **0xf7** plus délka délky datové části v bajtech v binární podobě, následovaná délkou datové části a zřetězením kódování RLP jednotlivých položek. Rozsah prvního bajtu je tedy `[0xf8, 0xff]` (des. `[248, 255]`).

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

- řetězec "dog" = [ 0x83, 'd', 'o', 'g' ]
- seznam [ "cat", "dog" ] = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- prázdný řetězec ('null') = `[ 0x80 ]`
- prázdný seznam = `[ 0xc0 ]`
- celé číslo 0 = `[ 0x80 ]`
- bajt '\\x00' = `[ 0x00 ]`
- bajt '\\x0f' = `[ 0x0f ]`
- bajty '\\x04\\x00' = `[ 0x82, 0x04, 0x00 ]`
- [teoreticko-množinová reprezentace](http://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers) trojky, `[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- řetězec "Lorem ipsum dolor sit amet, consectetur adipisicing elit" = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ... , 'e', 'l', 'i', 't' ]`

## Dekódování RLP {#rlp-decoding}

Podle pravidel a postupu kódování RLP je vstup pro dekódování RLP považován za pole binárních dat. Proces dekódování RLP je následující:

1. podle prvního bajtu (tj. prefixu) vstupních dat a dekódování datového typu, délky skutečných dat a offsetu;

2. podle typu a offsetu dat dekódujte data odpovídajícím způsobem, přičemž respektujte pravidlo minimálního kódování pro kladná celá čísla;

3. pokračujte v dekódování zbytku vstupu;

Pravidla pro dekódování datových typů a offsetu jsou následující:

1. data jsou řetězec, pokud je rozsah prvního bajtu (tj. prefixu) [0x00, 0x7f], a řetězec je přesně samotný první bajt;

2. data jsou řetězec, pokud je rozsah prvního bajtu [0x80, 0xb7] a za prvním bajtem následuje řetězec, jehož délka se rovná prvnímu bajtu mínus 0x80;

3. data jsou řetězec, pokud je rozsah prvního bajtu [0xb8, 0xbf] a za prvním bajtem následuje délka řetězce, jejíž délka v bajtech se rovná prvnímu bajtu mínus 0xb7, a za délkou řetězce následuje samotný řetězec;

4. data jsou seznam, pokud je rozsah prvního bajtu [0xc0, 0xf7] a za prvním bajtem následuje zřetězení kódování RLP všech položek seznamu, jejichž celková datová část se rovná prvnímu bajtu mínus 0xc0;

5. data jsou seznam, pokud je rozsah prvního bajtu [0xf8, 0xff] a za prvním bajtem následuje celková datová část seznamu, jejíž délka se rovná prvnímu bajtu mínus 0xf7, a za celkovou datovou částí seznamu následuje zřetězení kódování RLP všech položek seznamu;

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
- [Coglio, A. (2020). Rekurzivní délkový prefix Etherea v ACL2. arXiv preprint arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## Související témata {#related-topics}

- [Patricia Merkle trie](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)
