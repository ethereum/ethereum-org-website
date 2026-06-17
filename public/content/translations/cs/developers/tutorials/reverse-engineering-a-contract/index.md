---
title: "Reverzní inženýrství kontraktu"
description: Jak porozumět kontraktu, když nemáte zdrojový kód
author: Ori Pomerantz
lang: cs
tags: ["evm", "operační kódy"]
skill: advanced
breadcrumb: Reverzní inženýrství
published: 2021-12-30
---
## Úvod {#introduction}

_Na blockchainu nejsou žádná tajemství_, vše, co se děje, je konzistentní, ověřitelné a veřejně dostupné. Ideálně by [kontrakty měly mít svůj zdrojový kód zveřejněný a ověřený na Etherscanu](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code). Nicméně, [ne vždy tomu tak je](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code). V tomto článku se naučíte, jak provádět reverzní inženýrství kontraktů tím, že se podíváte na kontrakt bez zdrojového kódu, [`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f).

Existují dekompilátory, ale ne vždy produkují [použitelné výsledky](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f). V tomto článku se naučíte, jak manuálně provést reverzní inženýrství a porozumět kontraktu z [operačních kódů](https://github.com/wolflo/evm-opcodes), a také jak interpretovat výsledky dekompilátoru.

Abyste tomuto článku porozuměli, měli byste již znát základy EVM a být alespoň trochu obeznámeni s assemblerem EVM. [O těchto tématech si můžete přečíst zde](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e).

## Příprava spustitelného kódu {#prepare-the-executable-code}

Operační kódy můžete získat tak, že přejdete na Etherscan daného kontraktu, kliknete na záložku **Contract** a poté na **Switch to Opcodes View**. Získáte zobrazení, kde je jeden operační kód na řádek.

![Opcode View from Etherscan](opcode-view.png)

Abyste však porozuměli skokům, musíte vědět, kde se v kódu každý operační kód nachází. Jedním ze způsobů, jak toho dosáhnout, je otevřít Tabulky Google a vložit operační kódy do sloupce C. [Následující kroky můžete přeskočit vytvořením kopie této již připravené tabulky](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing).

Dalším krokem je získat správná umístění kódu, abychom mohli porozumět skokům. Velikost operačního kódu vložíme do sloupce B a umístění (v šestnáctkové soustavě) do sloupce A. Napište tuto funkci do buňky `B1` a poté ji zkopírujte a vložte do zbytku sloupce B až do konce kódu. Poté můžete sloupec B skrýt.

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

Tato funkce nejprve přidá jeden bajt pro samotný operační kód a poté hledá `PUSH`. Operační kódy PUSH jsou speciální, protože potřebují další bajty pro vkládanou hodnotu. Pokud je operačním kódem `PUSH`, extrahujeme počet bajtů a přičteme je.

Do `A1` vložte první offset, nulu. Poté do `A2` vložte tuto funkci a opět ji zkopírujte a vložte do zbytku sloupce A:

```
=dec2hex(hex2dec(A1)+B1)
```

Tuto funkci potřebujeme, aby nám poskytla hexadecimální hodnotu, protože hodnoty, které jsou vkládány před skoky (`JUMP` a `JUMPI`), jsou nám dány v hexadecimálním formátu.

## Vstupní bod (0x00) {#the-entry-point-0x00}

Kontrakty se vždy spouštějí od prvního bajtu. Toto je počáteční část kódu:

| Offset | Operační kód | Zásobník (po operačním kódu) |
| -----: | ------------ | ---------------------------- |
|      0 | PUSH1 0x80   | 0x80                         |
|      2 | PUSH1 0x40   | 0x40, 0x80                   |
|      4 | MSTORE       | Prázdný                      |
|      5 | PUSH1 0x04   | 0x04                         |
|      7 | CALLDATASIZE | CALLDATASIZE 0x04            |
|      8 | LT           | CALLDATASIZE\<4               |
|      9 | PUSH2 0x005e | 0x5E CALLDATASIZE\<4          |
|      C | JUMPI        | Prázdný                      |

Tento kód dělá dvě věci:

1. Zapíše 0x80 jako 32bajtovou hodnotu na paměťová místa 0x40-0x5F (0x80 je uloženo v 0x5F a 0x40-0x5E jsou samé nuly).
2. Přečte velikost dat volání. Normálně se data volání pro Ethereum kontrakt řídí [ABI (aplikačním binárním rozhraním)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html), které vyžaduje minimálně čtyři bajty pro selektor funkce. Pokud je velikost dat volání menší než čtyři, skočí na 0x5E.

![Flowchart for this portion](flowchart-entry.png)

### Obslužná rutina na 0x5E (pro data volání mimo ABI) {#the-handler-at-0x5e-for-non-abi-call-data}

| Offset | Operační kód |
| -----: | ------------ |
|     5E | JUMPDEST     |
|     5F | CALLDATASIZE |
|     60 | PUSH2 0x007c |
|     63 | JUMPI        |

Tento úryvek začíná pomocí `JUMPDEST`. Programy EVM (Ethereum virtuální stroj) vyhodí výjimku, pokud skočíte na operační kód, který není `JUMPDEST`. Poté se podívá na CALLDATASIZE, a pokud je „pravda“ (tedy není nula), skočí na 0x7C. K tomu se dostaneme níže.

| Offset | Operační kód | Zásobník (po operačním kódu)                                               |
| -----: | ------------ | -------------------------------------------------------------------------- |
|     64 | CALLVALUE    | [Wei](/glossary/#wei) poskytnuté voláním. V Solidity se nazývá `msg.value` |
|     65 | PUSH1 0x06   | 6 CALLVALUE                                                                |
|     67 | PUSH1 0x00   | 0 6 CALLVALUE                                                              |
|     69 | DUP3         | CALLVALUE 0 6 CALLVALUE                                                    |
|     6A | DUP3         | 6 CALLVALUE 0 6 CALLVALUE                                                  |
|     6B | SLOAD        | Storage[6] CALLVALUE 0 6 CALLVALUE                                         |

Takže když neexistují žádná data volání, přečteme hodnotu Storage[6]. Zatím nevíme, co tato hodnota znamená, ale můžeme se podívat na transakce, které kontrakt přijal bez dat volání. Transakce, které pouze převádějí ETH bez jakýchkoli dat volání (a tedy bez metody), mají v Etherscanu metodu `Transfer`. Ve skutečnosti je [úplně první transakce, kterou kontrakt přijal](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7), převod.

Pokud se podíváme na tuto transakci a klikneme na **Click to see More**, uvidíme, že data volání, nazývaná vstupní data (input data), jsou skutečně prázdná (`0x`). Všimněte si také, že hodnota je 1.559 ETH, což bude důležité později.

![The call data is empty](calldata-empty.png)

Dále klikněte na záložku **State** a rozbalte kontrakt, který zpětně analyzujeme (0x2510...). Můžete vidět, že `Storage[6]` se během transakce skutečně změnil, a pokud změníte Hex na **Number**, uvidíte, že se z něj stalo 1,559,000,000,000,000,000, což je převedená hodnota ve wei (čárky jsem přidal pro přehlednost), odpovídající další hodnotě kontraktu.

![Změna ve Storage[6]](storage6.png)

Pokud se podíváme na změny stavu způsobené [dalšími `Transfer` transakcemi ze stejného období](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange), uvidíme, že `Storage[6]` nějakou dobu sledoval hodnotu kontraktu. Prozatím to budeme nazývat `Value*`. Hvězdička (`*`) nám připomíná, že zatím _nevíme_, co tato proměnná dělá, ale nemůže sloužit jen ke sledování hodnoty kontraktu, protože není potřeba používat úložiště (storage), které je velmi drahé, když můžete získat zůstatek svého účtu pomocí `ADDRESS BALANCE`. První operační kód vloží vlastní adresu kontraktu. Druhý přečte adresu na vrcholu zásobníku a nahradí ji zůstatkem této adresy.

| Offset | Operační kód | Zásobník                                    |
| -----: | ------------ | ------------------------------------------- |
|     6C | PUSH2 0x0075 | 0x75 Value\* CALLVALUE 0 6 CALLVALUE        |
|     6F | SWAP2        | CALLVALUE Value\* 0x75 0 6 CALLVALUE        |
|     70 | SWAP1        | Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|     71 | PUSH2 0x01a7 | 0x01A7 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|     74 | JUMP         |

Budeme pokračovat ve sledování tohoto kódu v cíli skoku.

| Offset | Operační kód | Zásobník                                                    |
| -----: | ------------ | ----------------------------------------------------------- |
|    1A7 | JUMPDEST     | Value\* CALLVALUE 0x75 0 6 CALLVALUE                        |
|    1A8 | PUSH1 0x00   | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                   |
|    1AA | DUP3         | CALLVALUE 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AB | NOT          | 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |

`NOT` je bitová operace, takže obrátí hodnotu každého bitu v hodnotě volání.

| Offset | Operační kód | Zásobník                                                                    |
| -----: | ------------ | --------------------------------------------------------------------------- |
|    1AC | DUP3         | Value\* 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AD | GT           | Value\*>2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AE | ISZERO       | Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|    1AF | PUSH2 0x01df | 0x01DF Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1B2 | JUMPI        |

Skočíme, pokud je `Value*` menší než 2^256-CALLVALUE-1 nebo se mu rovná. Vypadá to jako logika pro zabránění přetečení (overflow). A skutečně vidíme, že po několika nesmyslných operacích (například zápis do paměti bude brzy smazán) na offsetu 0x01DE se kontrakt zvrátí, pokud je detekováno přetečení, což je normální chování.

Všimněte si, že takové přetečení je extrémně nepravděpodobné, protože by vyžadovalo, aby hodnota volání plus `Value*` byla srovnatelná s 2^256 wei, což je asi 10^59 ETH. [Celková zásoba ETH je v době psaní tohoto textu menší než dvě stě milionů](https://etherscan.io/stat/supply).

| Offset | Operační kód | Zásobník                                  |
| -----: | ------------ | ----------------------------------------- |
|    1DF | JUMPDEST     | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1E0 | POP          | Value\* CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E1 | ADD          | Value\*+CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E2 | SWAP1        | 0x75 Value\*+CALLVALUE 0 6 CALLVALUE      |
|    1E3 | JUMP         |

Pokud jsme se dostali sem, získáme `Value* + CALLVALUE` a skočíme na offset 0x75.

| Offset | Operační kód | Zásobník                        |
| -----: | ------------ | ------------------------------- |
|     75 | JUMPDEST     | Value\*+CALLVALUE 0 6 CALLVALUE |
|     76 | SWAP1        | 0 Value\*+CALLVALUE 6 CALLVALUE |
|     77 | SWAP2        | 6 Value\*+CALLVALUE 0 CALLVALUE |
|     78 | SSTORE       | 0 CALLVALUE                     |

Pokud se dostaneme sem (což vyžaduje, aby data volání byla prázdná), přidáme k `Value*` hodnotu volání. To je v souladu s tím, co jsme říkali, že dělají transakce `Transfer`.

| Offset | Operační kód |
| -----: | ------------ |
|     79 | POP          |
|     7A | POP          |
|     7B | STOP         |

Nakonec vyčistíme zásobník (což není nutné) a signalizujeme úspěšný konec transakce.

Abychom to shrnuli, zde je vývojový diagram pro počáteční kód.

![Entry point flowchart](flowchart-entry.png)

## Obslužná rutina na 0x7C {#the-handler-at-0x7c}

Záměrně jsem do nadpisu neuvedl, co tato obslužná rutina dělá. Cílem není naučit vás, jak funguje tento konkrétní kontrakt, ale jak provádět reverzní inženýrství kontraktů. Zjistíte, co dělá, stejným způsobem jako já – sledováním kódu.

Dostaneme se sem z několika míst:

- Pokud jsou data volání o velikosti 1, 2 nebo 3 bajtů (z offsetu 0x63)
- Pokud je podpis metody neznámý (z offsetů 0x42 a 0x5D)

| Offset | Operační kód | Zásobník             |
| -----: | ------------ | -------------------- |
|     7C | JUMPDEST     |
|     7D | PUSH1 0x00   | 0x00                 |
|     7F | PUSH2 0x009d | 0x9D 0x00            |
|     82 | PUSH1 0x03   | 0x03 0x9D 0x00       |
|     84 | SLOAD        | Storage[3] 0x9D 0x00 |

Toto je další paměťová buňka (storage), kterou jsem nenašel v žádných transakcích, takže je těžší zjistit, co znamená. Níže uvedený kód to objasní.

| Offset | Operační kód                                      | Zásobník                        |
| -----: | ------------------------------------------------- | ------------------------------- |
|     85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Storage[3] 0x9D 0x00 |
|     9A | AND                                               | Storage[3]-as-address 0x9D 0x00 |

Tyto operační kódy oříznou hodnotu, kterou jsme přečetli ze Storage[3], na 160 bitů, což je délka adresy na Ethereu.

| Offset | Operační kód | Zásobník                        |
| -----: | ------------ | ------------------------------- |
|     9B | SWAP1        | 0x9D Storage[3]-as-address 0x00 |
|     9C | JUMP         | Storage[3]-as-address 0x00      |

Tento skok je zbytečný, protože přecházíme na další operační kód. Tento kód není zdaleka tak efektivní z hlediska plynu (gas), jak by mohl být.

| Offset | Operační kód | Zásobník                        |
| -----: | ------------ | ------------------------------- |
|     9D | JUMPDEST     | Storage[3]-as-address 0x00      |
|     9E | SWAP1        | 0x00 Storage[3]-as-address      |
|     9F | POP          | Storage[3]-as-address           |
|     A0 | PUSH1 0x40   | 0x40 Storage[3]-as-address      |
|     A2 | MLOAD        | Mem[0x40] Storage[3]-as-address |

Úplně na začátku kódu jsme nastavili Mem[0x40] na 0x80. Pokud se později podíváme po 0x40, uvidíme, že ho neměníme – takže můžeme předpokládat, že je to 0x80.

| Offset | Operační kód | Zásobník                                          |
| -----: | ------------ | ------------------------------------------------- |
|     A3 | CALLDATASIZE | CALLDATASIZE 0x80 Storage[3]-as-address           |
|     A4 | PUSH1 0x00   | 0x00 CALLDATASIZE 0x80 Storage[3]-as-address      |
|     A6 | DUP3         | 0x80 0x00 CALLDATASIZE 0x80 Storage[3]-as-address |
|     A7 | CALLDATACOPY | 0x80 Storage[3]-as-address                        |

Zkopíruje všechna data volání do paměti, počínaje od 0x80.

| Offset | Operační kód  | Zásobník                                                                         |
| -----: | ------------- | -------------------------------------------------------------------------------- |
|     A8 | PUSH1 0x00    | 0x00 0x80 Storage[3]-as-address                                                  |
|     AA | DUP1          | 0x00 0x00 0x80 Storage[3]-as-address                                             |
|     AB | CALLDATASIZE  | CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                                |
|     AC | DUP4          | 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                           |
|     AD | DUP6          | Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address     |
|     AE | GAS           | GAS Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address |
|     AF | DELEGATE_CALL |

Nyní jsou věci mnohem jasnější. Tento kontrakt může fungovat jako [proxy kontrakt](https://blog.openzeppelin.com/proxy-patterns/), který volá adresu ve Storage[3], aby odvedla skutečnou práci. `DELEGATE_CALL` volá samostatný kontrakt, ale zůstává ve stejném úložišti (storage). To znamená, že delegovaný kontrakt, pro který jsme proxy, přistupuje ke stejnému úložnému prostoru. Parametry pro volání jsou:

- _Plyn (Gas)_: Všechen zbývající plyn
- _Volaná adresa_: Storage[3]-as-address
- _Data volání_: Bajty o velikosti CALLDATASIZE začínající na 0x80, kam jsme uložili původní data volání
- _Návratová data_: Žádná (0x00 - 0x00) Návratová data získáme jinými způsoby (viz níže)

| Offset | Operační kód   | Zásobník                                                                                      |
| -----: | -------------- | --------------------------------------------------------------------------------------------- |
|     B0 | RETURNDATASIZE | RETURNDATASIZE (((úspěch/selhání volání))) 0x80 Storage[3]-as-address                         |
|     B1 | DUP1           | RETURNDATASIZE RETURNDATASIZE (((úspěch/selhání volání))) 0x80 Storage[3]-as-address          |
|     B2 | PUSH1 0x00     | 0x00 RETURNDATASIZE RETURNDATASIZE (((úspěch/selhání volání))) 0x80 Storage[3]-as-address     |
|     B4 | DUP5           | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((úspěch/selhání volání))) 0x80 Storage[3]-as-address|
|     B5 | RETURNDATACOPY | RETURNDATASIZE (((úspěch/selhání volání))) 0x80 Storage[3]-as-address                         |

Zde zkopírujeme všechna návratová data do paměťového bufferu začínajícího na 0x80.

| Offset | Operační kód | Zásobník                                                                                                                     |
| -----: | ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
|     B6 | DUP2         | (((úspěch/selhání volání))) RETURNDATASIZE (((úspěch/selhání volání))) 0x80 Storage[3]-as-address                            |
|     B7 | DUP1         | (((úspěch/selhání volání))) (((úspěch/selhání volání))) RETURNDATASIZE (((úspěch/selhání volání))) 0x80 Storage[3]-as-address|
|     B8 | ISZERO       | (((selhalo volání))) (((úspěch/selhání volání))) RETURNDATASIZE (((úspěch/selhání volání))) 0x80 Storage[3]-as-address       |
|     B9 | PUSH2 0x00c0 | 0xC0 (((selhalo volání))) (((úspěch/selhání volání))) RETURNDATASIZE (((úspěch/selhání volání))) 0x80 Storage[3]-as-address  |
|     BC | JUMPI        | (((úspěch/selhání volání))) RETURNDATASIZE (((úspěch/selhání volání))) 0x80 Storage[3]-as-address                            |
|     BD | DUP2         | RETURNDATASIZE (((úspěch/selhání volání))) RETURNDATASIZE (((úspěch/selhání volání))) 0x80 Storage[3]-as-address             |
|     BE | DUP5         | 0x80 RETURNDATASIZE (((úspěch/selhání volání))) RETURNDATASIZE (((úspěch/selhání volání))) 0x80 Storage[3]-as-address        |
|     BF | RETURN       |                                                                                                                              |

Takže po volání zkopírujeme návratová data do bufferu 0x80 - 0x80+RETURNDATASIZE, a pokud je volání úspěšné, provedeme `RETURN` přesně s tímto bufferem.

### DELEGATECALL selhal {#delegatecall-failed}

Pokud se dostaneme sem, na 0xC0, znamená to, že volaný kontrakt se zvrátil (reverted). Protože jsme pro tento kontrakt pouze proxy, chceme vrátit stejná data a také transakci zvrátit.

| Offset | Operační kód | Zásobník                                                                                                            |
| -----: | -------- | ------------------------------------------------------------------------------------------------------------------- |
|     C0 | JUMPDEST | (((úspěch/selhání volání))) RETURNDATASIZE (((úspěch/selhání volání))) 0x80 Storage[3]-as-address                   |
|     C1 | DUP2     | RETURNDATASIZE (((úspěch/selhání volání))) RETURNDATASIZE (((úspěch/selhání volání))) 0x80 Storage[3]-as-address    |
|     C2 | DUP5     | 0x80 RETURNDATASIZE (((úspěch/selhání volání))) RETURNDATASIZE (((úspěch/selhání volání))) 0x80 Storage[3]-as-address|
|     C3 | REVERT   |

Takže provedeme `REVERT` se stejným bufferem, jaký jsme dříve použili pro `RETURN`: 0x80 - 0x80+RETURNDATASIZE

![Call to proxy flowchart](flowchart-proxy.png)

## Volání ABI {#abi-calls}

Pokud je velikost dat volání čtyři bajty nebo více, může se jednat o platné volání ABI.

| Offset | Operační kód | Zásobník                                          |
| -----: | ------------ | ------------------------------------------------- |
|      D | PUSH1 0x00   | 0x00                                              |
|      F | CALLDATALOAD | (((První slovo (256 bitů) dat volání)))           |
|     10 | PUSH1 0xe0   | 0xE0 (((První slovo (256 bitů) dat volání)))      |
|     12 | SHR          | (((prvních 32 bitů (4 bajty) dat volání)))        |

Etherscan nám říká, že `1C` je neznámý operační kód, protože [byl přidán až poté, co Etherscan tuto funkci napsal,](https://eips.ethereum.org/EIPS/eip-145) a ještě ji neaktualizovali. [Aktuální tabulka operačních kódů](https://github.com/wolflo/evm-opcodes) nám ukazuje, že se jedná o bitový posun vpravo (shift right).

| Offset | Operační kód     | Zásobník                                                                                                 |
| -----: | ---------------- | -------------------------------------------------------------------------------------------------------- |
|     13 | DUP1             | (((prvních 32 bitů (4 bajty) dat volání))) (((prvních 32 bitů (4 bajty) dat volání)))                    |
|     14 | PUSH4 0x3cd8045e | 0x3CD8045E (((prvních 32 bitů (4 bajty) dat volání))) (((prvních 32 bitů (4 bajty) dat volání)))         |
|     19 | GT               | 0x3CD8045E>prvních-32-bitů-dat-volání (((prvních 32 bitů (4 bajty) dat volání)))                         |
|     1A | PUSH2 0x0043     | 0x43 0x3CD8045E>prvních-32-bitů-dat-volání (((prvních 32 bitů (4 bajty) dat volání)))                    |
|     1D | JUMPI            | (((prvních 32 bitů (4 bajty) dat volání)))                                                               |

Rozdělení testů shody podpisu metody na dvě části tímto způsobem ušetří v průměru polovinu testů. Kód, který bezprostředně následuje, a kód na adrese 0x43 se řídí stejným vzorem: `DUP1` prvních 32 bitů dat volání, `PUSH4 (((method signature>`, spustí `EQ` pro kontrolu rovnosti a poté `JUMPI`, pokud se podpis metody shoduje. Zde jsou podpisy metod, jejich adresy a, pokud je známa, [odpovídající definice metody](https://www.4byte.directory/):

| Metoda                                                                                 | Podpis metody    | Offset pro skok     |
| -------------------------------------------------------------------------------------- | ---------------- | ------------------- |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e)      | 0x3cd8045e       | 0x0103              |
| ???                                                                                    | 0x81e580d3       | 0x0138              |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4) | 0xba0bafb4       | 0x0158              |
| ???                                                                                    | 0x1f135823       | 0x00C4              |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)    | 0x2eb4a7ab       | 0x00ED              |

Pokud není nalezena žádná shoda, kód přeskočí na [obslužnou rutinu proxy na adrese 0x7C](#the-handler-at-0x7c) v naději, že kontrakt, pro který jsme proxy, má shodu.

![ABI calls flowchart](flowchart-abi.png)

## splitter() {#splitter}

| Offset | Operační kód | Zásobník                      |
| -----: | ------------ | ----------------------------- |
|    103 | JUMPDEST     |
|    104 | CALLVALUE    | CALLVALUE                     |
|    105 | DUP1         | CALLVALUE CALLVALUE           |
|    106 | ISZERO       | CALLVALUE==0 CALLVALUE        |
|    107 | PUSH2 0x010f | 0x010F CALLVALUE==0 CALLVALUE |
|    10A | JUMPI        | CALLVALUE                     |
|    10B | PUSH1 0x00   | 0x00 CALLVALUE                |
|    10D | DUP1         | 0x00 0x00 CALLVALUE           |
|    10E | REVERT       |

První věc, kterou tato funkce dělá, je kontrola, zda volání neposlalo žádné ETH. Tato funkce není [`payable`](https://solidity-by-example.org/payable/). Pokud nám někdo poslal ETH, musí to být chyba a my chceme provést `REVERT`, abychom se vyhnuli tomu, že toto ETH zůstane tam, odkud ho už nemohou získat zpět.

| Offset | Operační kód                                      | Zásobník                                                                    |
| -----: | ------------------------------------------------- | --------------------------------------------------------------------------- |
|    10F | JUMPDEST                                          |
|    110 | POP                                               |
|    111 | PUSH1 0x03                                        | 0x03                                                                        |
|    113 | SLOAD                                             | (((Storage[3] neboli kontrakt, pro který jsme proxy)))                      |
|    114 | PUSH1 0x40                                        | 0x40 (((Storage[3] neboli kontrakt, pro který jsme proxy)))                 |
|    116 | MLOAD                                             | 0x80 (((Storage[3] neboli kontrakt, pro který jsme proxy)))                 |
|    117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Storage[3] neboli kontrakt, pro který jsme proxy)))       |
|    12C | SWAP1                                             | 0x80 0xFF...FF (((Storage[3] neboli kontrakt, pro který jsme proxy)))       |
|    12D | SWAP2                                             | (((Storage[3] neboli kontrakt, pro který jsme proxy))) 0xFF...FF 0x80       |
|    12E | AND                                               | ProxyAddr 0x80                                                              |
|    12F | DUP2                                              | 0x80 ProxyAddr 0x80                                                         |
|    130 | MSTORE                                            | 0x80                                                                        |

A 0x80 nyní obsahuje adresu proxy

| Offset | Operační kód | Zásobník  |
| -----: | ------------ | --------- |
|    131 | PUSH1 0x20   | 0x20 0x80 |
|    133 | ADD          | 0xA0      |
|    134 | PUSH2 0x00e4 | 0xE4 0xA0 |
|    137 | JUMP         | 0xA0      |

### Kód E4 {#the-e4-code}

Toto je poprvé, co vidíme tyto řádky, ale jsou sdíleny s dalšími metodami (viz níže). Hodnotu v zásobníku tedy nazveme X a budeme si pamatovat, že v `splitter()` je hodnota tohoto X rovna 0xA0.

| Offset | Operační kód | Zásobník    |
| -----: | ---------- | ----------- |
|     E4 | JUMPDEST   | X           |
|     E5 | PUSH1 0x40 | 0x40 X      |
|     E7 | MLOAD      | 0x80 X      |
|     E8 | DUP1       | 0x80 0x80 X |
|     E9 | SWAP2      | X 0x80 0x80 |
|     EA | SUB        | X-0x80 0x80 |
|     EB | SWAP1      | 0x80 X-0x80 |
|     EC | RETURN     |

Tento kód tedy přijme ukazatel do paměti v zásobníku (X) a způsobí, že kontrakt provede `RETURN` s bufferem, který je 0x80 - X.

V případě `splitter()` to vrací adresu, pro kterou jsme proxy. `RETURN` vrací buffer v 0x80-0x9F, což je místo, kam jsme tato data zapsali (offset 0x130 výše).

## currentWindow() {#currentwindow}

Kód na offsetech 0x158-0x163 je identický s tím, co jsme viděli na 0x103-0x10E v `splitter()` (kromě cíle `JUMPI`), takže víme, že `currentWindow()` také není `payable`.

| Offset | Operační kód | Zásobník             |
| -----: | ------------ | -------------------- |
|    164 | JUMPDEST     |
|    165 | POP          |
|    166 | PUSH2 0x00da | 0xDA                 |
|    169 | PUSH1 0x01   | 0x01 0xDA            |
|    16B | SLOAD        | Storage[1] 0xDA      |
|    16C | DUP2         | 0xDA Storage[1] 0xDA |
|    16D | JUMP         | Storage[1] 0xDA      |

### Kód DA {#the-da-code}

Tento kód je také sdílen s dalšími metodami. Hodnotu v zásobníku tedy nazveme Y a budeme si pamatovat, že v `currentWindow()` je hodnota tohoto Y Storage[1].

| Offset | Operační kód | Zásobník         |
| -----: | ---------- | ---------------- |
|     DA | JUMPDEST   | Y 0xDA           |
|     DB | PUSH1 0x40 | 0x40 Y 0xDA      |
|     DD | MLOAD      | 0x80 Y 0xDA      |
|     DE | SWAP1      | Y 0x80 0xDA      |
|     DF | DUP2       | 0x80 Y 0x80 0xDA |
|     E0 | MSTORE     | 0x80 0xDA        |

Zapíše Y na 0x80-0x9F.

| Offset | Operační kód | Zásobník       |
| -----: | ---------- | -------------- |
|     E1 | PUSH1 0x20 | 0x20 0x80 0xDA |
|     E3 | ADD        | 0xA0 0xDA      |

A zbytek je již vysvětlen [výše](#the-e4-code). Skoky na 0xDA tedy zapíší vrchol zásobníku (Y) na 0x80-0x9F a vrátí tuto hodnotu. V případě `currentWindow()` vrací Storage[1].

## merkleRoot() {#merkleroot}

Kód na offsetech 0xED-0xF8 je identický s tím, co jsme viděli na 0x103-0x10E v `splitter()` (až na cíl `JUMPI`), takže víme, že `merkleRoot()` také není `payable`.

| Offset | Operační kód | Zásobník             |
| -----: | ------------ | -------------------- |
|     F9 | JUMPDEST     |
|     FA | POP          |
|     FB | PUSH2 0x00da | 0xDA                 |
|     FE | PUSH1 0x00   | 0x00 0xDA            |
|    100 | SLOAD        | Storage[0] 0xDA      |
|    101 | DUP2         | 0xDA Storage[0] 0xDA |
|    102 | JUMP         | Storage[0] 0xDA      |

Co se stane po skoku, [jsme už zjistili](#the-da-code). Takže `merkleRoot()` vrací Storage[0].

## 0x81e580d3 {#0x81e580d3}

Kód na offsetech 0x138-0x143 je identický s tím, co jsme viděli na 0x103-0x10E v `splitter()` (kromě cíle `JUMPI`), takže víme, že tato funkce také není `payable`.

| Offset | Operační kód | Zásobník                                                     |
| -----: | ------------ | ------------------------------------------------------------ |
|    144 | JUMPDEST     |
|    145 | POP          |
|    146 | PUSH2 0x00da | 0xDA                                                         |
|    149 | PUSH2 0x0153 | 0x0153 0xDA                                                  |
|    14C | CALLDATASIZE | CALLDATASIZE 0x0153 0xDA                                     |
|    14D | PUSH1 0x04   | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    14F | PUSH2 0x018f | 0x018F 0x04 CALLDATASIZE 0x0153 0xDA                         |
|    152 | JUMP         | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    18F | JUMPDEST     | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    190 | PUSH1 0x00   | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |
|    192 | PUSH1 0x20   | 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                      |
|    194 | DUP3         | 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                 |
|    195 | DUP5         | CALLDATASIZE 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA    |
|    196 | SUB          | CALLDATASIZE-4 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    197 | SLT          | CALLDATASIZE-4\<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA         |
|    198 | ISZERO       | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA        |
|    199 | PUSH2 0x01a0 | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19C | JUMPI        | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |

Vypadá to, že tato funkce přijímá alespoň 32 bajtů (jedno slovo) dat volání.

| Offset | Operační kód | Zásobník                                     |
| -----: | ------------ | -------------------------------------------- |
|    19D | DUP1         | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
|    19E | DUP2         | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19F | REVERT       |

Pokud nezíská data volání, transakce je zvrácena bez jakýchkoli návratových dat.

Pojďme se podívat, co se stane, pokud funkce _získá_ data volání, která potřebuje.

| Offset | Operační kód | Zásobník                                 |
| -----: | ------------ | ---------------------------------------- |
|    1A0 | JUMPDEST     | 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    1A1 | POP          | 0x04 CALLDATASIZE 0x0153 0xDA            |
|    1A2 | CALLDATALOAD | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)` je první slovo dat volání _za_ podpisem metody

| Offset | Operační kód | Zásobník                                                                     |
| -----: | ------------ | ---------------------------------------------------------------------------- |
|    1A3 | SWAP2        | 0x0153 CALLDATASIZE calldataload(4) 0xDA                                     |
|    1A4 | SWAP1        | CALLDATASIZE 0x0153 calldataload(4) 0xDA                                     |
|    1A5 | POP          | 0x0153 calldataload(4) 0xDA                                                  |
|    1A6 | JUMP         | calldataload(4) 0xDA                                                         |
|    153 | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    154 | PUSH2 0x016e | 0x016E calldataload(4) 0xDA                                                  |
|    157 | JUMP         | calldataload(4) 0xDA                                                         |
|    16E | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    16F | PUSH1 0x04   | 0x04 calldataload(4) 0xDA                                                    |
|    171 | DUP2         | calldataload(4) 0x04 calldataload(4) 0xDA                                    |
|    172 | DUP2         | 0x04 calldataload(4) 0x04 calldataload(4) 0xDA                               |
|    173 | SLOAD        | Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA                         |
|    174 | DUP2         | calldataload(4) Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    175 | LT           | calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    176 | PUSH2 0x017e | 0x017EC calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA |
|    179 | JUMPI        | calldataload(4) 0x04 calldataload(4) 0xDA                                    |

Pokud první slovo není menší než Storage[4], funkce selže. Zvrátí se bez jakékoli návratové hodnoty:

| Offset | Operační kód | Zásobník      |
| -----: | ------------ | ------------- |
|    17A | PUSH1 0x00   | 0x00 ...      |
|    17C | DUP1         | 0x00 0x00 ... |
|    17D | REVERT       |

Pokud je calldataload(4) menší než Storage[4], dostaneme tento kód:

| Offset | Operační kód | Zásobník                                            |
| -----: | ------------ | --------------------------------------------------- |
|    17E | JUMPDEST     | calldataload(4) 0x04 calldataload(4) 0xDA           |
|    17F | PUSH1 0x00   | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
|    181 | SWAP2        | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
|    182 | DUP3         | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
|    183 | MSTORE       | calldataload(4) 0x00 calldataload(4) 0xDA           |

A paměťová místa 0x00-0x1F nyní obsahují data 0x04 (0x00-0x1E jsou samé nuly, 0x1F je čtyři)

| Offset | Operační kód | Zásobník                                                                |
| -----: | ------------ | ----------------------------------------------------------------------- |
|    184 | PUSH1 0x20   | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                          |
|    186 | SWAP1        | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                          |
|    187 | SWAP2        | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                          |
|    188 | SHA3         | (((SHA3 z 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA             |
|    189 | ADD          | (((SHA3 z 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA             |
|    18A | SLOAD        | Storage[(((SHA3 z 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA  |

V úložišti je tedy vyhledávací tabulka (lookup table), která začíná na SHA3 z 0x000...0004 a má záznam pro každou legitimní hodnotu dat volání (hodnota menší než Storage[4]).

| Offset | Operační kód | Zásobník                                                                |
| -----: | ------------ | ----------------------------------------------------------------------- |
|    18B | SWAP1        | calldataload(4) Storage[(((SHA3 z 0x00-0x1F))) + calldataload(4)] 0xDA  |
|    18C | POP          | Storage[(((SHA3 z 0x00-0x1F))) + calldataload(4)] 0xDA                  |
|    18D | DUP2         | 0xDA Storage[(((SHA3 z 0x00-0x1F))) + calldataload(4)] 0xDA             |
|    18E | JUMP         | Storage[(((SHA3 z 0x00-0x1F))) + calldataload(4)] 0xDA                  |

Už víme, co dělá [kód na offsetu 0xDA](#the-da-code), vrací volajícímu hodnotu z vrcholu zásobníku. Takže tato funkce vrací volajícímu hodnotu z vyhledávací tabulky.

## 0x1f135823 {#0x1f135823}

Kód na offsetech 0xC4-0xCF je identický s tím, co jsme viděli na 0x103-0x10E v `splitter()` (kromě cíle `JUMPI`), takže víme, že tato funkce také není `payable`.

| Offset | Operační kód | Zásobník          |
| -----: | ------------ | ----------------- |
|     D0 | JUMPDEST     |
|     D1 | POP          |
|     D2 | PUSH2 0x00da | 0xDA              |
|     D5 | PUSH1 0x06   | 0x06 0xDA         |
|     D7 | SLOAD        | Value\* 0xDA      |
|     D8 | DUP2         | 0xDA Value\* 0xDA |
|     D9 | JUMP         | Value\* 0xDA      |

Už víme, co dělá [kód na offsetu 0xDA](#the-da-code), vrací volajícímu hodnotu z vrcholu zásobníku. Takže tato funkce vrací `Value*`.

### Shrnutí metod {#method-summary}

Máte pocit, že v této chvíli už kontraktu rozumíte? Já ne. Zatím tu máme tyto metody:

| Metoda                            | Význam                                                                               |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| Transfer                          | Přijme hodnotu poskytnutou voláním a zvýší `Value*` o tuto částku    |
| [splitter()](#splitter)           | Vrátí Storage[3], adresu proxy                                                       |
| [currentWindow()](#currentwindow) | Vrátí Storage[1]                                                                     |
| [merkleRoot()](#merkleroot)        | Vrátí Storage[0]                                                                     |
| [0x81e580d3](#0x81e580d3)         | Vrátí hodnotu z vyhledávací tabulky za předpokladu, že je parametr menší než Storage[4] |
| [0x1f135823](#0x1f135823)         | Vrátí Storage[6], neboli Value\*                                                     |

Víme ale, že jakoukoli další funkcionalitu poskytuje kontrakt ve Storage[3]. Možná, kdybychom věděli, co je to za kontrakt, napovědělo by nám to. Naštěstí je to blockchain a vše je známo, alespoň teoreticky. Neviděli jsme žádné metody, které by nastavovaly Storage[3], takže to musel nastavit konstruktor.

## Konstruktor {#the-constructor}

Když se [podíváme na kontrakt](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f), můžeme také vidět transakci, která ho vytvořila.

![Click the create transaction](create-tx.png)

Pokud na tuto transakci klikneme a poté přejdeme na záložku **Stav**, uvidíme počáteční hodnoty parametrů. Konkrétně můžeme vidět, že Storage[3] obsahuje [0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761). Tento kontrakt musí obsahovat chybějící funkcionalitu. Můžeme ji pochopit pomocí stejných nástrojů, které jsme použili pro kontrakt, který zkoumáme.

## Proxy kontrakt {#the-proxy-contract}

Pomocí stejných technik, jaké jsme použili u původního kontraktu výše, můžeme vidět, že se kontrakt zvrátí, pokud:

- Je k volání připojeno jakékoli ETH (0x05-0x0F)
- Velikost dat volání je menší než čtyři (0x10-0x19 a 0xBE-0xC2)

A že metody, které podporuje, jsou:

| Metoda                                                                                                          | Podpis metody                | Offset pro skok     |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------- |
| [scaleAmountByPercentage(uint256,uint256)](https://www.4byte.directory/signatures/?bytes4_signature=0x8ffb5c97)          | 0x8ffb5c97                   | 0x0135              |
| [isClaimed(uint256,address)](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)               | 0xd2ef0795                   | 0x0151              |
| [claim(uint256,address,uint256,bytes32[])](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | 0x2e7ba6ef                   | 0x00F4              |
| [incrementWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                        | 0x338b1d31                   | 0x0110              |
| ???                                                                                                             | 0x3f26479e                   | 0x0118              |
| ???                                                                                                             | 0x1e7df9d3                   | 0x00C3              |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                          | [0xba0bafb4](#currentwindow) | 0x0148              |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                             | [0x2eb4a7ab](#merkleroot)    | 0x0107              |
| ???                                                                                                             | [0x81e580d3](#0x81e580d3)    | 0x0122              |
| ???                                                                                                             | [0x1f135823](#0x1f135823)    | 0x00D8              |

Můžeme ignorovat spodní čtyři metody, protože se k nim nikdy nedostaneme. Jejich podpisy jsou takové, že se o ně náš původní kontrakt postará sám (můžete kliknout na podpisy a podívat se na podrobnosti výše), takže to musí být [metody, které jsou přepsány](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf).

Jednou ze zbývajících metod je `claim(<params>)` a další je `isClaimed(<params>)`, takže to vypadá na airdrop kontrakt. Místo toho, abychom procházeli zbytek operační kód po operačním kódu, můžeme [zkusit dekompilátor](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761), který pro tři funkce z tohoto kontraktu produkuje použitelné výsledky. Reverzní inženýrství těch ostatních je ponecháno jako cvičení pro čtenáře.

### scaleAmountByPercentage {#scaleamountbypercentage}

Toto nám pro tuto funkci dává dekompilátor:

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  require calldata.size - 4 >=′ 64
  if _param1 and _param2 > -1 / _param1:
      revert with 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

První `require` testuje, zda mají data volání kromě čtyř bajtů podpisu funkce alespoň 64 bajtů, což stačí pro dva parametry. Pokud ne, pak je zjevně něco špatně.

Příkaz `if` zřejmě kontroluje, že `_param1` není nula a že `_param1 * _param2` není záporné. Pravděpodobně to má zabránit případům přetečení (wrap around).

Nakonec funkce vrátí škálovanou hodnotu.

### claim {#claim}

Kód, který dekompilátor vytvoří, je složitý a ne celý je pro nás relevantní. Část z něj přeskočím, abych se zaměřil na řádky, o kterých se domnívám, že poskytují užitečné informace.

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:
  ...
  require _param2 == addr(_param2)
  ...
  if currentWindow <= _param1:
      revert with 0, 'cannot claim for a future window'
```

Vidíme zde dvě důležité věci:

- `_param2`, ačkoli je deklarováno jako `uint256`, je ve skutečnosti adresa
- `_param1` je nárokované okno, které musí být `currentWindow` nebo dřívější.

```python
  ...
  if stor5[_claimWindow][addr(_claimFor)]:
      revert with 0, 'Account already claimed the given window'
```

Takže nyní víme, že Storage[5] je pole oken a adres, a zda si daná adresa nárokovala odměnu pro toto okno.

```python
  ...
  idx = 0
  s = 0
  while idx < _param4.length:
  ...
      if s + sha3(mem[(32 * _param4.length) + 328 len mem[(32 * _param4.length) + 296]]) > mem[(32 * idx) + 296]:
          mem[mem[64] + 32] = mem[(32 * idx) + 296]
          ...
          s = sha3(mem[_62 + 32 len mem[_62]])
          continue
      ...
      s = sha3(mem[_66 + 32 len mem[_66]])
      continue
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
```

Víme, že `unknown2eb4a7ab` je ve skutečnosti funkce `merkleRoot()`, takže tento kód vypadá, že ověřuje [Merkleův důkaz](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5). To znamená, že `_param4` je Merkleův důkaz.

```python
  call addr(_param2) with:
     value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
       gas 30000 wei
```

Takhle kontrakt převádí své vlastní ETH na jinou adresu (kontrakt nebo externě vlastněný účet). Zavolá ji s hodnotou, která představuje částku k převodu. Takže to vypadá, že se jedná o airdrop ETH.

```python
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

Spodní dva řádky nám říkají, že Storage[2] je také kontrakt, který voláme. Pokud se [podíváme na transakci konstruktoru](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange), uvidíme, že tento kontrakt je [0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2), kontrakt zabaleného etheru (WETH), [jehož zdrojový kód byl nahrán na Etherscan](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code).

Takže to vypadá, že se kontrakt pokouší odeslat ETH na `_param2`. Pokud to dokáže, skvělé. Pokud ne, pokusí se odeslat [WETH](https://weth.tkn.eth.limo/). Pokud je `_param2` externě vlastněný účet (EOA), pak může vždy přijímat ETH, ale kontrakty mohou přijetí ETH odmítnout. WETH je však ERC-20 a kontrakty nemohou jeho přijetí odmítnout.

```python
  ...
  log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

Na konci funkce vidíme, že se generuje log. [Podívejte se na vygenerované logy](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events) a filtrujte podle tématu, které začíná na `0xdbd5...`. Pokud [klikneme na jednu z transakcí, která takový log vygenerovala](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274), uvidíme, že to skutečně vypadá jako nárok – účet odeslal zprávu kontraktu, u kterého provádíme reverzní inženýrství, a na oplátku získal ETH.

![A claim transaction](claim-tx.png)

### 1e7df9d3 {#1e7df9d3}

Tato funkce je velmi podobná [`claim`](#claim) výše. Také kontroluje Merkleův důkaz, pokouší se převést ETH na první adresu a produkuje stejný typ logu.

```python
def unknown1e7df9d3(uint256 _param1, uint256 _param2, array _param3) payable:
  ...
  idx = 0
  s = 0
  while idx < _param3.length:
      if idx >= mem[96]:
          revert with 0, 50
      _55 = mem[(32 * idx) + 128]
      if s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]]) > mem[(32 * idx) + 128]:
          ...
          s = sha3(mem[_58 + 32 len mem[_58]])
          continue
      mem[mem[64] + 32] = s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]])
  ...
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
  ...
  call addr(_param1) with:
     value s wei
       gas 30000 wei
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value s wei
               gas gas_remaining wei
  ...
  log 0xdbd5389f: addr(_param1), s, bool(ext_call.success)
```

Hlavním rozdílem je, že první parametr, okno pro výběr, zde není. Místo toho je zde smyčka přes všechna okna, která by mohla být nárokována.

```python
  idx = 0
  s = 0
  while idx < currentWindow:
      ...
      if stor5[mem[0]]:
          if idx == -1:
              revert with 0, 17
          idx = idx + 1
          s = s
          continue
      ...
      stor5[idx][addr(_param1)] = 1
      if idx >= unknown81e580d3.length:
          revert with 0, 50
      mem[0] = 4
      if unknown81e580d3[idx] and _param2 > -1 / unknown81e580d3[idx]:
          revert with 0, 17
      if s > !(unknown81e580d3[idx] * _param2 / 100 * 10^6):
          revert with 0, 17
      if idx == -1:
          revert with 0, 17
      idx = idx + 1
      s = s + (unknown81e580d3[idx] * _param2 / 100 * 10^6)
      continue
```

Takže to vypadá jako varianta `claim`, která nárokuje všechna okna.

## Závěr {#conclusion}

Nyní byste už měli vědět, jak porozumět kontraktům, jejichž zdrojový kód není k dispozici, a to buď pomocí operačních kódů, nebo (když to funguje) dekompilátoru. Jak je zřejmé z délky tohoto článku, reverzní inženýrství kontraktu není triviální, ale v systému, kde je bezpečnost zásadní, je důležitou dovedností umět ověřit, že kontrakty fungují tak, jak bylo slíbeno.

[Více z mé práce najdete zde](https://cryptodocguy.pro/).