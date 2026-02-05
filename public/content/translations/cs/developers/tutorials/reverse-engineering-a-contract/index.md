---
title: "Reverzní inženýrství kontraktu"
description: Jak porozumět kontraktu, když nemáte zdrojový kód
author: Ori Pomerantz
lang: cs
tags: [ "evm", "opkódy" ]
skill: advanced
published: 2021-12-30
---

## Úvod {#introduction}

_Na blockchainu neexistují žádná tajemství_, vše, co se stane, je konzistentní, ověřitelné a veřejně dostupné. V ideálním případě by [kontrakty měly mít svůj zdrojový kód zveřejněný a ověřený na Etherscanu](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code). Nicméně [to tak není vždy](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code). V tomto článku se dozvíte, jak reverzně analyzovat kontrakty na příkladu kontraktu bez zdrojového kódu, [`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f).

Existují reverzní kompilátory, ale ne vždy produkují [použitelné výsledky](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f). V tomto článku se dozvíte, jak manuálně provést reverzní inženýrství a porozumět kontraktu z [opkódů](https://github.com/wolflo/evm-opcodes) a také jak interpretovat výsledky dekompilátoru.

Abyste mohli porozumět tomuto článku, měli byste již znát základy EVM a být alespoň trochu obeznámeni s EVM assemblerem. [O těchto tématech si můžete přečíst zde](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e).

## Příprava spustitelného kódu {#prepare-the-executable-code}

Opkódy získáte tak, že na Etherscanu přejdete na kontrakt, kliknete na záložku **Contract** a poté na **Switch to Opcodes View**. Zobrazí se vám pohled s jedním opkódem na řádek.

![Pohled na opkódy z Etherscanu](opcode-view.png)

Abyste však porozuměli skokům, musíte vědět, kde v kódu se který opkód nachází. Jedním ze způsobů, jak to udělat, je otevřít tabulku Google a vložit opkódy do sloupce C. [Následující kroky můžete přeskočit tak, že si vytvoříte kopii této již připravené tabulky](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing).

Dalším krokem je získání správných umístění v kódu, abychom mohli pochopit skoky. Velikost opkódu vložíme do sloupce B a umístění (v hexadecimálním tvaru) do sloupce A. Zadejte tuto funkci do buňky `B1` a poté ji zkopírujte a vložte do zbytku sloupce B, až na konec kódu. Poté můžete sloupec B skrýt.

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

Tato funkce nejprve přidá jeden bajt pro samotný opkód a poté hledá `PUSH`. Opkódy PUSH jsou speciální, protože potřebují další bajty pro vkládanou hodnotu. Pokud je opkód `PUSH`, extrahujeme počet bajtů a přičteme ho.

Do buňky `A1` vložte první offset, nulu. Poté do buňky `A2` vložte tuto funkci a opět ji zkopírujte a vložte do zbytku sloupce A:

```
=dec2hex(hex2dec(A1)+B1)
```

Tuto funkci potřebujeme, aby nám poskytla hexadecimální hodnotu, protože hodnoty, které jsou vkládány před skoky (`JUMP` a `JUMPI`), jsou nám dány v hexadecimálním tvaru.

## Vstupní bod (0x00) {#the-entry-point-0x00}

Kontrakty se vždy spouštějí od prvního bajtu. Toto je počáteční část kódu:

| Offset | Opkód        | Zásobník (po opkódu)        |
| -----: | ------------ | ---------------------------------------------- |
|      0 | PUSH1 0x80   | 0x80                                           |
|      2 | PUSH1 0x40   | 0x40, 0x80                                     |
|      4 | MSTORE       | Prázdné                                        |
|      5 | PUSH1 0x04   | 0x04                                           |
|      7 | CALLDATASIZE | CALLDATASIZE 0x04                              |
|      8 | LT           | CALLDATASIZE\<4      |
|      9 | PUSH2 0x005e | 0x5E CALLDATASIZE\<4 |
|      C | JUMPI        | Prázdné                                        |

Tento kód dělá dvě věci:

1. Zapište 0x80 jako 32bajtovou hodnotu do paměťových míst 0x40-0x5F (0x80 se uloží do 0x5F a 0x40-0x5E jsou všechny nuly).
2. Přečtěte velikost calldata. Normálně se data volání (calldata) pro kontrakt na Ethereu řídí [ABI (application binary interface)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html), které vyžaduje minimálně čtyři bajty pro selektor funkce. Pokud je velikost calldata menší než čtyři, skočí se na 0x5E.

![Vývojový diagram pro tuto část](flowchart-entry.png)

### Handler na 0x5E (pro data volání bez ABI) {#the-handler-at-0x5e-for-non-abi-call-data}

| Offset | Opkód        |
| -----: | ------------ |
|     5E | JUMPDEST     |
|     5F | CALLDATASIZE |
|     60 | PUSH2 0x007c |
|     63 | JUMPI        |

Tento úryvek začíná `JUMPDEST`. Programy EVM (Ethereum Virtual Machine) vyvolají výjimku, pokud skočíte na opkód, který není `JUMPDEST`. Poté se podívá na CALLDATASIZE, a pokud je „true“ (tedy nenulová), skočí na 0x7C. K tomu se dostaneme níže.

| Offset | Opkód      | Zásobník (po opkódu)                                                    |
| -----: | ---------- | ------------------------------------------------------------------------------------------ |
|     64 | CALLVALUE  | [Wei](/glossary/#wei) poskytnuté voláním. V Solidity se nazývá `msg.value` |
|     65 | PUSH1 0x06 | 6 CALLVALUE                                                                                |
|     67 | PUSH1 0x00 | 0 6 CALLVALUE                                                                              |
|     69 | DUP3       | CALLVALUE 0 6 CALLVALUE                                                                    |
|     6A | DUP3       | 6 CALLVALUE 0 6 CALLVALUE                                                                  |
|     6B | SLOAD      | Storage[6] CALLVALUE 0 6 CALLVALUE     |

Takže když nejsou žádná calldata, přečteme hodnotu Storage[6]. Zatím nevíme, co tato hodnota znamená, ale můžeme se podívat na transakce, které kontrakt přijal bez calldata. Transakce, které pouze převádějí ETH bez jakýchkoli calldata (a tedy bez metody), mají v Etherscanu metodu `Transfer`. Ve skutečnosti [úplně první transakce, kterou kontrakt obdržel](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7), je převod.

Když se podíváme na tuto transakci a klikneme na **Click to see More**, uvidíme, že data volání (calldata), zde nazvaná vstupní data, jsou skutečně prázdná (`0x`). Všimněte si také, že hodnota je 1,559 ETH, což bude relevantní později.

![Calldata jsou prázdná](calldata-empty.png)

Dále klikněte na záložku **State** a rozbalte kontrakt, který reverzně analyzujeme (0x2510...). Můžete vidět, že se `Storage[6]` během transakce změnilo, a pokud změníte Hex na **Number**, uvidíte, že se stalo 1 559 000 000 000 000 000, což je převedená hodnota ve wei (pro přehlednost jsem přidal čárky), odpovídající další hodnotě kontraktu.

![Změna v Storage[6]](storage6.png)

Pokud se podíváme na změny stavu způsobené [jinými `Transfer` transakcemi ze stejného období](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange), vidíme, že `Storage[6]` po nějakou dobu sledovalo hodnotu kontraktu. Prozatím to budeme nazývat `Hodnota*`. Hvězdička (`*`) nám připomíná, že ještě _nevíme_, co tato proměnná dělá, ale nemůže sloužit pouze ke sledování hodnoty kontraktu, protože není třeba používat úložiště, které je velmi drahé, když můžete zůstatek svého účtu získat pomocí `ADDRESS BALANCE`. První opkód vloží na zásobník vlastní adresu kontraktu. Druhý opkód přečte adresu na vrcholu zásobníku a nahradí ji zůstatkem této adresy.

| Offset | Opkód        | Zásobník                                      |
| -----: | ------------ | --------------------------------------------- |
|     6C | PUSH2 0x0075 | 0x75 Hodnota\* CALLVALUE 0 6 CALLVALUE        |
|     6F | SWAP2        | CALLVALUE Hodnota\* 0x75 0 6 CALLVALUE        |
|     70 | SWAP1        | Hodnota\* CALLVALUE 0x75 0 6 CALLVALUE        |
|     71 | PUSH2 0x01a7 | 0x01A7 Hodnota\* CALLVALUE 0x75 0 6 CALLVALUE |
|     74 | JUMP         |                                               |

Budeme pokračovat ve sledování tohoto kódu v cíli skoku.

| Offset | Opkód      | Zásobník                                                      |
| -----: | ---------- | ------------------------------------------------------------- |
|    1A7 | JUMPDEST   | Hodnota\* CALLVALUE 0x75 0 6 CALLVALUE                        |
|    1A8 | PUSH1 0x00 | 0x00 Hodnota\* CALLVALUE 0x75 0 6 CALLVALUE                   |
|    1AA | DUP3       | CALLVALUE 0x00 Hodnota\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AB | NOT        | 2^256-CALLVALUE-1 0x00 Hodnota\* CALLVALUE 0x75 0 6 CALLVALUE |

`NOT` je bitová operace, takže obrátí hodnotu každého bitu v hodnotě volání.

| Offset | Opkód        | Zásobník                                                                                                   |
| -----: | ------------ | ---------------------------------------------------------------------------------------------------------- |
|    1AC | DUP3         | Hodnota\* 2^256-CALLVALUE-1 0x00 Hodnota\* CALLVALUE 0x75 0 6 CALLVALUE                                    |
|    1AD | GT           | Hodnota\*>2^256-CALLVALUE-1 0x00 Hodnota\* CALLVALUE 0x75 0 6 CALLVALUE                                    |
|    1AE | ISZERO       | Hodnota\*\<=2^256-CALLVALUE-1 0x00 Hodnota\* CALLVALUE 0x75 0 6 CALLVALUE        |
|    1AF | PUSH2 0x01df | 0x01DF Hodnota\*\<=2^256-CALLVALUE-1 0x00 Hodnota\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1B2 | JUMPI        |                                                                                                            |

Skočíme, pokud je `Hodnota*` menší než 2^256-CALLVALUE-1 nebo se jí rovná. Vypadá to jako logika k zabránění přetečení. A skutečně, vidíme, že po několika nesmyslných operacích (například zápis do paměti, která bude brzy smazána) na offsetu 0x01DE kontrakt vrátí transakci zpět (revert), pokud je detekováno přetečení, což je normální chování.

Všimněte si, že takové přetečení je extrémně nepravděpodobné, protože by vyžadovalo, aby hodnota volání plus `Hodnota*` byla srovnatelná s 2^256 wei, což je asi 10^59 ETH. [Celková zásoba ETH je v době psaní tohoto článku menší než dvě stě milionů](https://etherscan.io/stat/supply).

| Offset | Opkód    | Zásobník                                    |
| -----: | -------- | ------------------------------------------- |
|    1DF | JUMPDEST | 0x00 Hodnota\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1E0 | POP      | Hodnota\* CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E1 | ADD      | Hodnota\*+CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E2 | SWAP1    | 0x75 Hodnota\*+CALLVALUE 0 6 CALLVALUE      |
|    1E3 | JUMP     |                                             |

Pokud jsme se dostali sem, získáme `Hodnota* + CALLVALUE` a skočíme na offset 0x75.

| Offset | Opkód    | Zásobník                          |
| -----: | -------- | --------------------------------- |
|     75 | JUMPDEST | Hodnota\*+CALLVALUE 0 6 CALLVALUE |
|     76 | SWAP1    | 0 Hodnota\*+CALLVALUE 6 CALLVALUE |
|     77 | SWAP2    | 6 Hodnota\*+CALLVALUE 0 CALLVALUE |
|     78 | SSTORE   | 0 CALLVALUE                       |

Pokud se dostaneme sem (což vyžaduje, aby data volání byla prázdná), přičteme k `Hodnota*` hodnotu volání. To je v souladu s tím, co dělají transakce `Transfer`.

| Offset | Opkód |
| -----: | ----- |
|     79 | POP   |
|     7A | POP   |
|     7B | STOP  |

Nakonec vyčistěte zásobník (což není nutné) a signalizujte úspěšné ukončení transakce.

Abychom to shrnuli, zde je vývojový diagram počátečního kódu.

![Vývojový diagram vstupního bodu](flowchart-entry.png)

## Handler na adrese 0x7C {#the-handler-at-0x7c}

Záměrně jsem do nadpisu neuvedl, co tento handler dělá. Cílem není naučit vás, jak funguje tento konkrétní kontrakt, ale jak provádět reverzní inženýrství kontraktů. Dozvíte se, co dělá, stejně jako já: sledováním kódu.

Dostaneme se sem z několika míst:

- Pokud existují calldata o velikosti 1, 2 nebo 3 bajtů (z offsetu 0x63)
- Pokud je podpis metody neznámý (z offsetů 0x42 a 0x5D)

| Offset | Opkód        | Zásobník                                                                 |
| -----: | ------------ | ------------------------------------------------------------------------ |
|     7C | JUMPDEST     |                                                                          |
|     7D | PUSH1 0x00   | 0x00                                                                     |
|     7F | PUSH2 0x009d | 0x9D 0x00                                                                |
|     82 | PUSH1 0x03   | 0x03 0x9D 0x00                                                           |
|     84 | SLOAD        | Storage[3] 0x9D 0x00 |

Toto je další buňka úložiště, kterou jsem v žádné transakci nenašel, takže je těžší zjistit, co znamená. Níže uvedený kód to objasní.

| Offset | Opkód                                             | Zásobník                                                                                                                                            |
| -----: | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
|     85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Storage[3] 0x9D 0x00 |
|     9A | AND                                               | Storage[3]-jako-adresa 0x9D 0x00                                                                |

Tyto opkódy zkrátí hodnotu, kterou čteme z Storage[3], na 160 bitů, což je délka ethereové adresy.

| Offset | Opkód | Zásobník                                                                             |
| -----: | ----- | ------------------------------------------------------------------------------------ |
|     9B | SWAP1 | 0x9D Storage[3]-jako-adresa 0x00 |
|     9C | JUMP  | Storage[3]-jako-adresa 0x00      |

Tento skok je nadbytečný, protože přecházíme na další opkód. Tento kód není zdaleka tak efektivní z hlediska poplatků (gas), jak by mohl být.

| Offset | Opkód      | Zásobník                                                                                                                                 |
| -----: | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
|     9D | JUMPDEST   | Storage[3]-jako-adresa 0x00                                                          |
|     9E | SWAP1      | 0x00 Storage[3]-jako-adresa                                                          |
|     9F | POP        | Storage[3]-jako-adresa                                                               |
|     A0 | PUSH1 0x40 | 0x40 Storage[3]-jako-adresa                                                          |
|     A2 | MLOAD      | Mem[0x40] Storage[3]-jako-adresa |

Na samém začátku kódu jsme nastavili Mem[0x40] na 0x80. Pokud se podíváme na 0x40 později, vidíme, že se nemění – takže můžeme předpokládat, že je to 0x80.

| Offset | Opkód        | Zásobník                                                                                               |
| -----: | ------------ | ------------------------------------------------------------------------------------------------------ |
|     A3 | CALLDATASIZE | CALLDATASIZE 0x80 Storage[3]-jako-adresa           |
|     A4 | PUSH1 0x00   | 0x00 CALLDATASIZE 0x80 Storage[3]-jako-adresa      |
|     A6 | DUP3         | 0x80 0x00 CALLDATASIZE 0x80 Storage[3]-jako-adresa |
|     A7 | CALLDATACOPY | 0x80 Storage[3]-jako-adresa                        |

Zkopírujte všechna calldata do paměti, počínaje adresou 0x80.

| Offset | Opkód                              | Zásobník                                                                                                                                                                                   |
| -----: | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|     A8 | PUSH1 0x00                         | 0x00 0x80 Storage[3]-jako-adresa                                                                                                       |
|     AA | DUP1                               | 0x00 0x00 0x80 Storage[3]-jako-adresa                                                                                                  |
|     AB | CALLDATASIZE                       | CALLDATASIZE 0x00 0x00 0x80 Storage[3]-jako-adresa                                                                                     |
|     AC | DUP4                               | 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-jako-adresa                                                                                |
|     AD | DUP6                               | Storage[3]-jako-adresa 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-jako-adresa     |
|     AE | GAS                                | GAS Storage[3]-jako-adresa 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-jako-adresa |
|     AF | DELEGATE_CALL |                                                                                                                                                                                            |

Teď je to mnohem jasnější. Tento kontrakt může fungovat jako [proxy](https://blog.openzeppelin.com/proxy-patterns/) a volat adresu v Storage[3], aby odvedla skutečnou práci. `DELEGATE_CALL` volá samostatný kontrakt, ale zůstává ve stejném úložišti. To znamená, že delegovaný kontrakt, pro který jsme proxy, přistupuje ke stejnému úložnému prostoru. Parametry pro volání jsou:

- _Gas_: Veškerý zbývající gas
- _Volaná adresa_: Storage[3]-jako-adresa
- _Data volání_: CALLDATASIZE bajtů začínajících na adrese 0x80, což je místo, kam jsme vložili původní data volání
- _Návratová data_: Žádná (0x00 - 0x00) Návratová data získáme jiným způsobem (viz níže)

| Offset | Opkód          | Zásobník                                                                                                                                                                                                     |
| -----: | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|     B0 | RETURNDATASIZE | RETURNDATASIZE (((úspěch/selhání volání))) 0x80 Storage[3]-jako-adresa                          |
|     B1 | DUP1           | RETURNDATASIZE RETURNDATASIZE (((úspěch/selhání volání))) 0x80 Storage[3]-jako-adresa           |
|     B2 | PUSH1 0x00     | 0x00 RETURNDATASIZE RETURNDATASIZE (((úspěch/selhání volání))) 0x80 Storage[3]-jako-adresa      |
|     B4 | DUP5           | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((úspěch/selhání volání))) 0x80 Storage[3]-jako-adresa |
|     B5 | RETURNDATACOPY | RETURNDATASIZE (((úspěch/selhání volání))) 0x80 Storage[3]-jako-adresa                          |

Zde zkopírujeme všechna návratová data do paměťové vyrovnávací paměti začínající na adrese 0x80.

| Offset | Opkód        | Zásobník                                                                                                                                                                                                                                                                                                                                                      |
| -----: | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     B6 | DUP2         | (((úspěch/selhání volání))) RETURNDATASIZE (((úspěch/selhání volání))) 0x80 Storage[3]-jako-adresa                                                                                      |
|     B7 | DUP1         | (((úspěch/selhání volání))) (((úspěch/selhání volání))) RETURNDATASIZE (((úspěch/selhání volání))) 0x80 Storage[3]-jako-adresa |
|     B8 | ISZERO       | (((selhalo volání))) (((úspěch/selhání volání))) RETURNDATASIZE (((úspěch/selhání volání))) 0x80 Storage[3]-jako-adresa        |
|     B9 | PUSH2 0x00c0 | 0xC0 (((selhalo volání))) (((úspěch/selhání volání))) RETURNDATASIZE (((úspěch/selhání volání))) 0x80 Storage[3]-jako-adresa   |
|     BC | JUMPI        | (((úspěch/selhání volání))) RETURNDATASIZE (((úspěch/selhání volání))) 0x80 Storage[3]-jako-adresa                                                                                      |
|     BD | DUP2         | RETURNDATASIZE (((úspěch/selhání volání))) RETURNDATASIZE (((úspěch/selhání volání))) 0x80 Storage[3]-jako-adresa                                                                       |
|     BE | DUP5         | 0x80 RETURNDATASIZE (((úspěch/selhání volání))) RETURNDATASIZE (((úspěch/selhání volání))) 0x80 Storage[3]-jako-adresa                                                                  |
|     BF | RETURN       |                                                                                                                                                                                                                                                                                                                                                               |

Takže po volání zkopírujeme návratová data do vyrovnávací paměti 0x80 - 0x80+RETURNDATASIZE a pokud je volání úspěšné, pak `RETURN` s přesně touto vyrovnávací pamětí.

### DELEGATECALL selhal {#delegatecall-failed}

Pokud se dostaneme sem, na 0xC0, znamená to, že volaný kontrakt vrátil transakci zpět (revert). Jelikož jsme pouze proxy pro tento kontrakt, chceme vrátit stejná data a také provést revert.

| Offset | Opkód    | Zásobník                                                                                                                                                                                                                                                                                     |
| -----: | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     C0 | JUMPDEST | (((úspěch/selhání volání))) RETURNDATASIZE (((úspěch/selhání volání))) 0x80 Storage[3]-jako-adresa                     |
|     C1 | DUP2     | RETURNDATASIZE (((úspěch/selhání volání))) RETURNDATASIZE (((úspěch/selhání volání))) 0x80 Storage[3]-jako-adresa      |
|     C2 | DUP5     | 0x80 RETURNDATASIZE (((úspěch/selhání volání))) RETURNDATASIZE (((úspěch/selhání volání))) 0x80 Storage[3]-jako-adresa |
|     C3 | REVERT   |                                                                                                                                                                                                                                                                                              |

Takže provedeme `REVERT` se stejnou vyrovnávací pamětí, kterou jsme použili pro `RETURN` dříve: 0x80 - 0x80+RETURNDATASIZE

![Vývojový diagram volání proxy](flowchart-proxy.png)

## Volání ABI {#abi-calls}

Pokud je velikost calldata čtyři bajty nebo více, může se jednat o platné volání ABI.

| Offset | Opkód        | Zásobník                                                                                                                 |
| -----: | ------------ | ------------------------------------------------------------------------------------------------------------------------ |
|      D | PUSH1 0x00   | 0x00                                                                                                                     |
|      F | CALLDATALOAD | (((První slovo (256 bitů) z calldata)))      |
|     10 | PUSH1 0xe0   | 0xE0 (((První slovo (256 bitů) z calldata))) |
|     12 | SHR          | (((prvních 32 bitů (4 bajty) z calldata)))   |

Etherscan nám říká, že `1C` je neznámý opkód, protože [byl přidán poté, co Etherscan napsal tuto funkci](https://eips.ethereum.org/EIPS/eip-145) a ještě ji neaktualizovali. [Aktuální tabulka opkódů](https://github.com/wolflo/evm-opcodes) nám ukazuje, že se jedná o posun doprava

| Offset | Opkód            | Zásobník                                                                                                                                                                                                                                                 |
| -----: | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     13 | DUP1             | (((prvních 32 bitů (4 bajty) z calldata))) (((prvních 32 bitů (4 bajty) z calldata)))            |
|     14 | PUSH4 0x3cd8045e | 0x3CD8045E (((prvních 32 bitů (4 bajty) z calldata))) (((prvních 32 bitů (4 bajty) z calldata))) |
|     19 | GT               | 0x3CD8045E>prvních-32-bitů-calldata (((prvních 32 bitů (4 bajty) z calldata)))                                                                                               |
|     1A | PUSH2 0x0043     | 0x43 0x3CD8045E>prvních-32-bitů-calldata (((prvních 32 bitů (4 bajty) z calldata)))                                                                                          |
|     1D | JUMPI            | (((prvních 32 bitů (4 bajty) z calldata)))                                                                                                                                   |

Rozdělením testů shody podpisu metody na dvě části se v průměru ušetří polovina testů. Kód, který bezprostředně následuje, a kód na 0x43 se řídí stejným vzorem: `DUP1` prvních 32 bitů calldata, `PUSH4 (((podpis metody>`, spustit `EQ` pro kontrolu rovnosti a poté `JUMPI`, pokud se podpis metody shoduje. Zde jsou podpisy metod, jejich adresy a pokud je známa [odpovídající definice metody](https://www.4byte.directory/):

| Metoda                                                                                                    | Podpis metody | Offset pro skok |
| --------------------------------------------------------------------------------------------------------- | ------------- | --------------- |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e)      | 0x3cd8045e    | 0x0103          |
| ???                                                                                                       | 0x81e580d3    | 0x0138          |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4) | 0xba0bafb4    | 0x0158          |
| ???                                                                                                       | 0x1f135823    | 0x00C4          |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)    | 0x2eb4a7ab    | 0x00ED          |

Pokud se nenajde žádná shoda, kód skočí na [proxy handler na adrese 0x7C](#the-handler-at-0x7c) v naději, že kontrakt, pro který jsme proxy, shodu mít bude.

![Vývojový diagram volání ABI](flowchart-abi.png)

## splitter() {#splitter}

| Offset | Opkód        | Zásobník                      |
| -----: | ------------ | ----------------------------- |
|    103 | JUMPDEST     |                               |
|    104 | CALLVALUE    | CALLVALUE                     |
|    105 | DUP1         | CALLVALUE CALLVALUE           |
|    106 | ISZERO       | CALLVALUE==0 CALLVALUE        |
|    107 | PUSH2 0x010f | 0x010F CALLVALUE==0 CALLVALUE |
|    10A | JUMPI        | CALLVALUE                     |
|    10B | PUSH1 0x00   | 0x00 CALLVALUE                |
|    10D | DUP1         | 0x00 0x00 CALLVALUE           |
|    10E | REVERT       |                               |

První věc, kterou tato funkce dělá, je kontrola, zda volání neposlalo žádné ETH. Tato funkce není [`payable`](https://solidity-by-example.org/payable/). Pokud nám někdo poslal ETH, musí to být omyl a chceme provést `REVERT`, abychom se vyhnuli tomu, že by se tyto ETH dostaly tam, odkud je nemohou dostat zpět.

| Offset | Opkód                                             | Zásobník                                                                                                                                                                                                                                                          |
| -----: | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    10F | JUMPDEST                                          |                                                                                                                                                                                                                                                                   |
|    110 | POP                                               |                                                                                                                                                                                                                                                                   |
|    111 | PUSH1 0x03                                        | 0x03                                                                                                                                                                                                                                                              |
|    113 | SLOAD                                             | (((Storage[3] a.k.a kontrakt, pro který jsme proxy)))                                                                |
|    114 | PUSH1 0x40                                        | 0x40 (((Storage[3] a.k.a kontrakt, pro který jsme proxy)))                                                           |
|    116 | MLOAD                                             | 0x80 (((Storage[3] a.k.a kontrakt, pro který jsme proxy)))                                                           |
|    117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Storage[3] a.k.a kontrakt, pro který jsme proxy))) |
|    12C | SWAP1                                             | 0x80 0xFF...FF (((Storage[3] a.k.a kontrakt, pro který jsme proxy))) |
|    12D | SWAP2                                             | (((Storage[3] a.k.a kontrakt, pro který jsme proxy))) 0xFF...FF 0x80 |
|    12E | AND                                               | ProxyAddr 0x80                                                                                                                                                                                                                                                    |
|    12F | DUP2                                              | 0x80 ProxyAddr 0x80                                                                                                                                                                                                                                               |
|    130 | MSTORE                                            | 0x80                                                                                                                                                                                                                                                              |

A 0x80 nyní obsahuje adresu proxy

| Offset | Opkód        | Zásobník  |
| -----: | ------------ | --------- |
|    131 | PUSH1 0x20   | 0x20 0x80 |
|    133 | ADD          | 0xA0      |
|    134 | PUSH2 0x00e4 | 0xE4 0xA0 |
|    137 | JUMP         | 0xA0      |

### Kód E4 {#the-e4-code}

Toto je poprvé, co vidíme tyto řádky, ale jsou sdíleny s dalšími metodami (viz níže). Hodnotu v zásobníku tedy nazveme X a budeme si pamatovat, že v `splitter()` je hodnota tohoto X 0xA0.

| Offset | Opkód      | Zásobník    |
| -----: | ---------- | ----------- |
|     E4 | JUMPDEST   | X           |
|     E5 | PUSH1 0x40 | 0x40 X      |
|     E7 | MLOAD      | 0x80 X      |
|     E8 | DUP1       | 0x80 0x80 X |
|     E9 | SWAP2      | X 0x80 0x80 |
|     EA | SUB        | X-0x80 0x80 |
|     EB | SWAP1      | 0x80 X-0x80 |
|     EC | RETURN     |             |

Tento kód tedy obdrží ukazatel na paměť v zásobníku (X) a způsobí, že kontrakt `RETURN` s vyrovnávací pamětí, která je 0x80 - X.

V případě `splitter()` vrátí adresu, pro kterou jsme proxy. `RETURN` vrátí vyrovnávací paměť v 0x80-0x9F, což je místo, kam jsme zapsali tato data (offset 0x130 výše).

## currentWindow() {#currentwindow}

Kód v offsetech 0x158-0x163 je identický s tím, co jsme viděli v 0x103-0x10E v `splitter()` (kromě cíle `JUMPI`), takže víme, že `currentWindow()` také není `payable`.

| Offset | Opkód        | Zásobník                                                                 |
| -----: | ------------ | ------------------------------------------------------------------------ |
|    164 | JUMPDEST     |                                                                          |
|    165 | POP          |                                                                          |
|    166 | PUSH2 0x00da | 0xDA                                                                     |
|    169 | PUSH1 0x01   | 0x01 0xDA                                                                |
|    16B | SLOAD        | Storage[1] 0xDA      |
|    16C | DUP2         | 0xDA Storage[1] 0xDA |
|    16D | JUMP         | Storage[1] 0xDA      |

### Kód DA {#the-da-code}

Tento kód je také sdílen s dalšími metodami. Hodnotu v zásobníku tedy nazveme Y a budeme si pamatovat, že v `currentWindow()` je hodnota tohoto Y Storage[1].

| Offset | Opkód      | Zásobník         |
| -----: | ---------- | ---------------- |
|     DA | JUMPDEST   | Y 0xDA           |
|     DB | PUSH1 0x40 | 0x40 Y 0xDA      |
|     DD | MLOAD      | 0x80 Y 0xDA      |
|     DE | SWAP1      | Y 0x80 0xDA      |
|     DF | DUP2       | 0x80 Y 0x80 0xDA |
|     E0 | MSTORE     | 0x80 0xDA        |

Zapište Y do 0x80-0x9F.

| Offset | Opkód      | Zásobník       |
| -----: | ---------- | -------------- |
|     E1 | PUSH1 0x20 | 0x20 0x80 0xDA |
|     E3 | ADD        | 0xA0 0xDA      |

A zbytek je již vysvětlen [výše](#the-e4-code). Takže skoky na 0xDA zapíší vrchol zásobníku (Y) do 0x80-0x9F a vrátí tuto hodnotu. V případě `currentWindow()` vrátí Storage[1].

## merkleRoot() {#merkleroot}

Kód v offsetech 0xED-0xF8 je identický s tím, co jsme viděli v 0x103-0x10E v `splitter()` (kromě cíle `JUMPI`), takže víme, že `merkleRoot()` také není `payable`.

| Offset | Opkód        | Zásobník                                                                 |
| -----: | ------------ | ------------------------------------------------------------------------ |
|     F9 | JUMPDEST     |                                                                          |
|     FA | POP          |                                                                          |
|     FB | PUSH2 0x00da | 0xDA                                                                     |
|     FE | PUSH1 0x00   | 0x00 0xDA                                                                |
|    100 | SLOAD        | Storage[0] 0xDA      |
|    101 | DUP2         | 0xDA Storage[0] 0xDA |
|    102 | JUMP         | Storage[0] 0xDA      |

Co se stane po skoku [jsme již zjistili](#the-da-code). Takže `merkleRoot()` vrátí Storage[0].

## 0x81e580d3 {#0x81e580d3}

Kód v offsetech 0x138-0x143 je identický s tím, co jsme viděli v 0x103-0x10E v `splitter()` (kromě cíle `JUMPI`), takže víme, že tato funkce také není `payable`.

| Offset | Opkód        | Zásobník                                                                        |
| -----: | ------------ | ------------------------------------------------------------------------------- |
|    144 | JUMPDEST     |                                                                                 |
|    145 | POP          |                                                                                 |
|    146 | PUSH2 0x00da | 0xDA                                                                            |
|    149 | PUSH2 0x0153 | 0x0153 0xDA                                                                     |
|    14C | CALLDATASIZE | CALLDATASIZE 0x0153 0xDA                                                        |
|    14D | PUSH1 0x04   | 0x04 CALLDATASIZE 0x0153 0xDA                                                   |
|    14F | PUSH2 0x018f | 0x018F 0x04 CALLDATASIZE 0x0153 0xDA                                            |
|    152 | JUMP         | 0x04 CALLDATASIZE 0x0153 0xDA                                                   |
|    18F | JUMPDEST     | 0x04 CALLDATASIZE 0x0153 0xDA                                                   |
|    190 | PUSH1 0x00   | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                              |
|    192 | PUSH1 0x20   | 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                         |
|    194 | DUP3         | 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                    |
|    195 | DUP5         | CALLDATASIZE 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                       |
|    196 | SUB          | CALLDATASIZE-4 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                          |
|    197 | SLT          | CALLDATASIZE-4\<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    198 | ISZERO       | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |
|    199 | PUSH2 0x01a0 | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA                    |
|    19C | JUMPI        | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                              |

Vypadá to, že tato funkce bere alespoň 32 bajtů (jedno slovo) calldata.

| Offset | Opkód  | Zásobník                                     |
| -----: | ------ | -------------------------------------------- |
|    19D | DUP1   | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
|    19E | DUP2   | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19F | REVERT |                                              |

Pokud neobdrží calldata, transakce je vrácena zpět bez jakýchkoli návratových dat.

Podívejme se, co se stane, když funkce _dostane_ potřebná calldata.

| Offset | Opkód        | Zásobník                                                    |
| -----: | ------------ | ----------------------------------------------------------- |
|    1A0 | JUMPDEST     | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                          |
|    1A1 | POP          | 0x04 CALLDATASIZE 0x0153 0xDA                               |
|    1A2 | CALLDATALOAD | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)` je první slovo calldata _po_ podpisu metody

| Offset | Opkód        | Zásobník                                                                                                                                                                                                             |
| -----: | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    1A3 | SWAP2        | 0x0153 CALLDATASIZE calldataload(4) 0xDA                                                                                                                                                          |
|    1A4 | SWAP1        | CALLDATASIZE 0x0153 calldataload(4) 0xDA                                                                                                                                                          |
|    1A5 | POP          | 0x0153 calldataload(4) 0xDA                                                                                                                                                                       |
|    1A6 | JUMP         | calldataload(4) 0xDA                                                                                                                                                                              |
|    153 | JUMPDEST     | calldataload(4) 0xDA                                                                                                                                                                              |
|    154 | PUSH2 0x016e | 0x016E calldataload(4) 0xDA                                                                                                                                                                       |
|    157 | JUMP         | calldataload(4) 0xDA                                                                                                                                                                              |
|    16E | JUMPDEST     | calldataload(4) 0xDA                                                                                                                                                                              |
|    16F | PUSH1 0x04   | 0x04 calldataload(4) 0xDA                                                                                                                                                                         |
|    171 | DUP2         | calldataload(4) 0x04 calldataload(4) 0xDA                                                                                                                                      |
|    172 | DUP2         | 0x04 calldataload(4) 0x04 calldataload(4) 0xDA                                                                                                                                 |
|    173 | SLOAD        | Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA                                                                       |
|    174 | DUP2         | calldataload(4) Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA                                    |
|    175 | LT           | calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    176 | PUSH2 0x017e | 0x017EC calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA |
|    179 | JUMPI        | calldataload(4) 0x04 calldataload(4) 0xDA                                                                                                                                      |

Pokud první slovo není menší než Storage[4], funkce selže. Je vrácena zpět bez jakékoli návratové hodnoty:

| Offset | Opkód      | Zásobník                                                      |
| -----: | ---------- | ------------------------------------------------------------- |
|    17A | PUSH1 0x00 | 0x00 ...      |
|    17C | DUP1       | 0x00 0x00 ... |
|    17D | REVERT     |                                                               |

Pokud je calldataload(4) menší než Storage[4], dostaneme tento kód:

| Offset | Opkód      | Zásobník                                                                                  |
| -----: | ---------- | ----------------------------------------------------------------------------------------- |
|    17E | JUMPDEST   | calldataload(4) 0x04 calldataload(4) 0xDA           |
|    17F | PUSH1 0x00 | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
|    181 | SWAP2      | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
|    182 | DUP3       | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
|    183 | MSTORE     | calldataload(4) 0x00 calldataload(4) 0xDA           |

A paměťová místa 0x00-0x1F nyní obsahují data 0x04 (0x00-0x1E jsou všechny nuly, 0x1F je čtyři)

| Offset | Opkód      | Zásobník                                                                                                                                                                                                                  |
| -----: | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    184 | PUSH1 0x20 | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                                                                                                                                      |
|    186 | SWAP1      | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                                                                                                                                      |
|    187 | SWAP2      | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                                                                                                                                      |
|    188 | SHA3       | (((SHA3 z 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA                                                                |
|    189 | ADD        | (((SHA3 z 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA                                                                |
|    18A | SLOAD      | Storage[(((SHA3 z 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA |

Takže v úložišti je vyhledávací tabulka, která začíná na SHA3 0x000...0004 a má záznam pro každou legitimní hodnotu calldata (hodnota pod Storage[4]).

| Offset | Opkód | Zásobník                                                                                                                                                                                                                  |
| -----: | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    18B | SWAP1 | calldataload(4) Storage[(((SHA3 z 0x00-0x1F))) + calldataload(4)] 0xDA |
|    18C | POP   | Storage[(((SHA3 z 0x00-0x1F))) + calldataload(4)] 0xDA                                    |
|    18D | DUP2  | 0xDA Storage[(((SHA3 z 0x00-0x1F))) + calldataload(4)] 0xDA                               |
|    18E | JUMP  | Storage[(((SHA3 z 0x00-0x1F))) + calldataload(4)] 0xDA                                    |

Už víme, co dělá [kód na offsetu 0xDA](#the-da-code), vrací volajícímu hodnotu na vrcholu zásobníku. Tato funkce tedy vrací volajícímu hodnotu z vyhledávací tabulky.

## 0x1f135823 {#0x1f135823}

Kód v offsetech 0xC4-0xCF je identický s tím, co jsme viděli v 0x103-0x10E v `splitter()` (kromě cíle `JUMPI`), takže víme, že tato funkce také není `payable`.

| Offset | Opkód        | Zásobník            |
| -----: | ------------ | ------------------- |
|     D0 | JUMPDEST     |                     |
|     D1 | POP          |                     |
|     D2 | PUSH2 0x00da | 0xDA                |
|     D5 | PUSH1 0x06   | 0x06 0xDA           |
|     D7 | SLOAD        | Hodnota\* 0xDA      |
|     D8 | DUP2         | 0xDA Hodnota\* 0xDA |
|     D9 | JUMP         | Hodnota\* 0xDA      |

Už víme, co dělá [kód na offsetu 0xDA](#the-da-code), vrací volajícímu hodnotu na vrcholu zásobníku. Tato funkce tedy vrací `Hodnota*`.

### Shrnutí metod {#method-summary}

Máte pocit, že v tuto chvíli kontraktu rozumíte? Já tedy ne. Zatím máme tyto metody:

| Metoda                                               | Význam                                                                                                                                      |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Převod                                               | Přijměte hodnotu poskytnutou voláním a zvyšte `Hodnota*` o tuto částku                                                                      |
| [splitter()](#splitter)           | Vrátí Storage[3], adresu proxy                                                          |
| [currentWindow()](#currentwindow) | Vrátí Storage[1]                                                                        |
| [merkleRoot()](#merkeroot)        | Vrátí Storage[0]                                                                        |
| [0x81e580d3](#0x81e580d3)                            | Vrátí hodnotu z vyhledávací tabulky za předpokladu, že parametr je menší než Storage[4] |
| [0x1f135823](#0x1f135823)                            | Vrátí Storage[6], a.k.a. Hodnota\*      |

Víme ale, že jakoukoli další funkcionalitu poskytuje kontrakt v Storage[3]. Možná, kdybychom věděli, co je to za kontrakt, dalo by nám to vodítko. Naštěstí je to blockchain a vše je známo, alespoň teoreticky. Neviděli jsme žádné metody, které by nastavovaly Storage[3], takže muselo být nastaveno konstruktorem.

## Konstruktor {#the-constructor}

Když se [podíváme na kontrakt](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f), můžeme také vidět transakci, která ho vytvořila.

![Klikněte na transakci vytvoření](create-tx.png)

Pokud klikneme na tuto transakci a poté na kartu **State**, můžeme vidět počáteční hodnoty parametrů. Konkrétně vidíme, že Storage[3] obsahuje [0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761). Tento kontrakt musí obsahovat chybějící funkcionalitu. Můžeme mu porozumět pomocí stejných nástrojů, které jsme použili pro kontrakt, který zkoumáme.

## Kontrakt proxy {#the-proxy-contract}

Použitím stejných technik, jaké jsme použili pro původní kontrakt výše, můžeme vidět, že kontrakt vrátí transakci zpět, pokud:

- K volání je připojeno jakékoli ETH (0x05-0x0F)
- Velikost calldata je menší než čtyři (0x10-0x19 a 0xBE-0xC2)

A metody, které podporuje, jsou:

| Metoda                                                                                                                                                                                 | Podpis metody                | Offset pro skok |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | --------------- |
| [scaleAmountByPercentage(uint256,uint256)](https://www.4byte.directory/signatures/?bytes4_signature=0x8ffb5c97)                                                     | 0x8ffb5c97                   | 0x0135          |
| [isClaimed(uint256,address)](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)                                                                   | 0xd2ef0795                   | 0x0151          |
| [claim(uint256,address,uint256,bytes32[])](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | 0x2e7ba6ef                   | 0x00F4          |
| [incrementWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                                                                            | 0x338b1d31                   | 0x0110          |
| ???                                                                                                                                                                                    | 0x3f26479e                   | 0x0118          |
| ???                                                                                                                                                                                    | 0x1e7df9d3                   | 0x00C3          |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                                                                              | [0xba0bafb4](#currentwindow) | 0x0148          |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                                                                                 | [0x2eb4a7ab](#merkleroot)    | 0x0107          |
| ???                                                                                                                                                                                    | [0x81e580d3](#0x81e580d3)    | 0x0122          |
| ???                                                                                                                                                                                    | [0x1f135823](#0x1f135823)    | 0x00D8          |

Spodní čtyři metody můžeme ignorovat, protože se k nim nikdy nedostaneme. Jejich signatury jsou takové, že náš původní kontrakt se o ně postará sám (můžete kliknout na signatury a zobrazit podrobnosti výše), takže musí jít o [přepsané metody](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf).

Jednou ze zbývajících metod je `claim(<params>)` a další je `isClaimed(<params>)`, takže to vypadá na airdrop kontrakt. Místo toho, abychom procházeli zbytek opkód po opkódu, můžeme [vyzkoušet dekompilátor](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761), který pro tři funkce z tohoto kontraktu vytváří použitelné výsledky. Reverzní inženýrství ostatních je ponecháno jako cvičení pro čtenáře.

### scaleAmountByPercentage {#scaleamountbypercentage}

Toto nám dekompilátor dává pro tuto funkci:

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  require calldata.size - 4 >=′ 64
  if _param1 and _param2 > -1 / _param1:
      revert with 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

První `require` testuje, zda calldata mají kromě čtyř bajtů signatury funkce alespoň 64 bajtů, což stačí pro dva parametry. Pokud ne, je zjevně něco špatně.

Příkaz `if` se zdá, že kontroluje, zda `_param1` není nula a zda `_param1 * _param2` není záporné. Pravděpodobně se tak předchází případům přetečení.

Nakonec funkce vrátí škálovanou hodnotu.

### claim {#claim}

Kód, který dekompilátor vytváří, je složitý a ne všechen je pro nás relevantní. Chystám se přeskočit některé jeho části, abych se zaměřil na řádky, které podle mě poskytují užitečné informace

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:
  ...
  require _param2 == addr(_param2)
  ...
  if currentWindow <= _param1:
      revert with 0, 'cannot claim for a future window'
```

Vidíme zde dvě důležité věci:

- `_param2`, i když je deklarován jako `uint256`, je ve skutečnosti adresa
- `_param1` je nárokované okno, které musí být `currentWindow` nebo dřívější.

```python
  ...
  if stor5[_claimWindow][addr(_claimFor)]:
      revert with 0, 'Account already claimed the given window'
```

Takže teď víme, že Storage[5] je pole oken a adres a zda adresa nárokovala odměnu za dané okno.

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

Víme, že `unknown2eb4a7ab` je ve skutečnosti funkce `merkleRoot()`, takže tento kód vypadá, jako by ověřoval [Merkleho důkaz](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5). To znamená, že `_param4` je Merkleho důkaz.

```python
  call addr(_param2) with:
     value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
       gas 30000 wei
```

Takto kontrakt převádí své vlastní ETH na jinou adresu (kontrakt nebo externě vlastněný účet). Volá ji s hodnotou, která je částkou, jež má být převedena. Vypadá to tedy, že se jedná o airdrop ETH.

```python
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

Spodní dva řádky nám říkají, že Storage[2] je také kontrakt, který voláme. Pokud se [podíváme na transakci konstruktoru](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange), vidíme, že tento kontrakt je [0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2), kontrakt Wrapped Ether [jehož zdrojový kód byl nahrán na Etherscan](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code).

Vypadá to tedy, že se kontrakty pokoušejí poslat ETH na `_param2`. Pokud to dokáže, skvělé. Pokud ne, pokusí se odeslat [WETH](https://weth.tkn.eth.limo/). Pokud je `_param2` externě vlastněný účet (EOA), může vždy přijímat ETH, ale kontrakty mohou odmítnout přijímat ETH. WETH je však ERC-20 a kontrakty to nemohou odmítnout.

```python
  ...
  log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

Na konci funkce vidíme generovaný záznam protokolu. [Podívejte se na vygenerované záznamy protokolu](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events) a filtrujte podle tématu, které začíná `0xdbd5...`. Pokud [klikneme na jednu z transakcí, která takový záznam vygenerovala](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274), uvidíme, že to skutečně vypadá jako nárok – účet odeslal zprávu kontraktu, který reverzně inženýrujeme, a na oplátku dostal ETH.

![Transakce nároku](claim-tx.png)

### 1e7df9d3 {#1e7df9d3}

Tato funkce je velmi podobná [`claim`](#claim) výše. Také kontroluje Merkleho důkaz, pokouší se převést ETH na první a vytváří stejný typ záznamu do protokolu.

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

Hlavní rozdíl je v tom, že první parametr, okno pro výběr, zde není. Místo toho existuje smyčka přes všechna okna, která by mohla být nárokována.

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

Vypadá to tedy na variantu `claim`, která nárokuje všechna okna.

## Závěr {#conclusion}

Nyní byste měli vědět, jak porozumět kontraktům, jejichž zdrojový kód není k dispozici, a to buď pomocí opkódů, nebo (pokud to funguje) pomocí dekompilátoru. Jak je zřejmé z délky tohoto článku, reverzní inženýrství kontraktu není triviální, ale v systému, kde je bezpečnost zásadní, je důležitou dovedností umět ověřit, že kontrakty fungují, jak slibují.

[Více z mé práce najdete zde](https://cryptodocguy.pro/).
