---
title: "Pochopení specifikací EVM ze Yellow Paperu"
description: "Pochopení části Yellow Paperu, formálních specifikací pro Ethereum, která vysvětluje Ethereum Virtual Machine (EVM)."
author: "qbzzt"
tags: [ "evm" ]
skill: intermediate
lang: cs
published: 2022-05-15
---

[Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) je formální specifikace pro Ethereum. Kromě případů, kdy je změněn [procesem EIP](/eips/), obsahuje přesný popis toho, jak vše funguje. Je napsán jako matematická práce, která obsahuje terminologii, jež programátorům nemusí být známá. V tomto dokumentu se dozvíte, jak ho číst, a potažmo i další související matematické práce.

## Který Yellow Paper? {#which-yellow-paper}

Jako téměř všechno ostatní v Ethereu se i Yellow Paper v průběhu času vyvíjí. Abych se mohl odkazovat na konkrétní verzi, nahrál jsem [aktuální verzi v době psaní](yellow-paper-berlin.pdf). Čísla sekcí, stránek a rovnic, která používám, se budou vztahovat k této verzi. Při čtení tohoto dokumentu je dobré mít ho otevřený v jiném okně.

### Proč EVM? {#why-the-evm}

Původní yellow paper byl napsán hned na začátku vývoje Etherea. Popisuje původní mechanismus konsensu založený na proof-of-work, který byl původně použit k zabezpečení sítě. Ethereum však v září 2022 vypnulo proof-of-work a začalo místo toho používat konsensus založený na proof-of-stake. Tento tutoriál se zaměří na části yellow paperu, které definují Ethereum Virtual Machine. EVM zůstal přechodem na proof-of-stake nezměněn (s výjimkou návratové hodnoty operačního kódu DIFFICULTY).

## 9 Model provádění {#9-execution-model}

Tato část (str. 12–14) obsahuje většinu definice EVM.

Pojem _stav systému_ zahrnuje vše, co potřebujete o systému vědět, abyste ho mohli spustit. U typického počítače to znamená paměť, obsah registrů atd.

[Turingův stroj](https://en.wikipedia.org/wiki/Turing_machine) je výpočetní model. V podstatě se jedná o zjednodušenou verzi počítače, u které je prokázáno, že má stejnou schopnost provádět výpočty jako normální počítač (vše, co dokáže vypočítat počítač, dokáže vypočítat i Turingův stroj a naopak). Tento model usnadňuje dokazování různých teorémů o tom, co je a co není vypočitatelné.

Termín [Turingovsky úplný](https://en.wikipedia.org/wiki/Turing_completeness) označuje počítač, který může provádět stejné výpočty jako Turingův stroj. Turingovy stroje se mohou dostat do nekonečných smyček, zatímco EVM ne, protože by mu došlo palivo, takže je pouze kvazi-Turingovsky úplný.

## 9.1 Základy {#91-basics}

Tato část uvádí základy EVM a jeho srovnání s jinými výpočetními modely.

[Zásobníkový stroj](https://en.wikipedia.org/wiki/Stack_machine) je počítač, který ukládá dočasná data nikoli do registrů, ale do [**zásobníku**](https://en.wikipedia.org/wiki/Stack_\(abstract_data_type\)). Jedná se o preferovanou architekturu pro virtuální stroje, protože se snadno implementuje, což znamená, že chyby a bezpečnostní zranitelnosti jsou mnohem méně pravděpodobné. Paměť v zásobníku je rozdělena na 256bitová slova. Tato velikost byla zvolena, protože je vhodná pro klíčové kryptografické operace Etherea, jako je hašování Keccak-256 a výpočty na eliptických křivkách. Maximální velikost zásobníku je 1024 položek (1024 × 256 bitů). Při provádění operačních kódů se jejich parametry obvykle získávají ze zásobníku. Existují operační kódy speciálně pro reorganizaci prvků v zásobníku, jako jsou `POP` (odstraní položku z vrcholu zásobníku), `DUP_N` (duplikuje N-tou položku v zásobníku) atd.

EVM má také volatilní prostor zvaný **paměť**, který se používá k ukládání dat během provádění. Tato paměť je uspořádána do 32bajtových slov. Všechny paměťové lokace jsou inicializovány na nulu. Pokud provedete tento kód v jazyce [Yul](https://docs.soliditylang.org/en/latest/yul.html) pro přidání slova do paměti, vyplní se 32 bajtů paměti doplněním prázdného místa ve slově nulami, tj. vytvoří se jedno slovo – s nulami na pozicích 0–29, 0x60 na pozici 30 a 0xA7 na pozici 31.

```yul
mstore(0, 0x60A7)
```

`mstore` je jedním ze tří operačních kódů, které EVM poskytuje pro interakci s pamětí – načítá slovo do paměti. Další dva jsou `mstore8`, který načítá jeden bajt do paměti, a `mload`, který přesouvá slovo z paměti do zásobníku.

EVM má také samostatný nevolatilní model **úložiště**, který je udržován jako součást stavu systému – tato paměť je organizována do polí slov (na rozdíl od bajtových polí adresovatelných po slovech v zásobníku). V tomto úložišti si kontrakty uchovávají trvalá data – kontrakt může interagovat pouze se svým vlastním úložištěm. Úložiště je organizováno jako mapování klíč–hodnota.

Ačkoli to v této části Yellow Paperu není zmíněno, je také užitečné vědět, že existuje čtvrtý typ paměti. **Calldata** je bajtově adresovatelná paměť pouze pro čtení, která se používá k uložení hodnoty předané parametrem `data` transakce. EVM má specifické operační kódy pro správu `calldata`. `calldatasize` vrací velikost dat. `calldataload` načítá data do zásobníku. `calldatacopy` kopíruje data do paměti.

Standardní [Von Neumannova architektura](https://en.wikipedia.org/wiki/Von_Neumann_architecture) ukládá kód a data do stejné paměti. EVM se tohoto standardu z bezpečnostních důvodů nedrží – sdílení volatilní paměti umožňuje měnit kód programu. Místo toho se kód ukládá do úložiště.

Existují pouze dva případy, kdy se kód spouští z paměti:

- Když kontrakt vytváří jiný kontrakt (pomocí [`CREATE`](https://www.evm.codes/#f0) nebo [`CREATE2`](https://www.evm.codes/#f5)), kód pro konstruktor kontraktu pochází z paměti.
- Během vytváření _jakéhokoli_ kontraktu se spustí kód konstruktoru a ten poté vrátí kód samotného kontraktu, také z paměti.

Termín výjimečné provádění znamená výjimku, která způsobí zastavení provádění aktuálního kontraktu.

## 9.2 Přehled poplatků {#92-fees-overview}

Tato část vysvětluje, jak se počítají poplatky za palivo. Existují tři náklady:

### Náklady na operační kód {#opcode-cost}

Vlastní náklady na specifický operační kód. Chcete-li získat tuto hodnotu, najděte nákladovou skupinu operačního kódu v Dodatku H (str. 28, pod rovnicí (327)) a nákladovou skupinu v rovnici (324). Tím získáte nákladovou funkci, která ve většině případů používá parametry z Dodatku G (str. 27).

Například operační kód [`CALLDATACOPY`](https://www.evm.codes/#37) je členem skupiny _W<sub>copy</sub>_. Náklady na operační kód pro tuto skupinu jsou _G<sub>verylow</sub>+G<sub>copy</sub>×⌈μ<sub>s</sub>[2]÷32⌉_. Při pohledu do Dodatku G vidíme, že obě konstanty jsou 3, což nám dává _3+3×⌈μ<sub>s</sub>[2]÷32⌉_.

Stále potřebujeme rozluštit výraz _⌈μ<sub>s</sub>[2]÷32⌉_. Nejvzdálenější část, _⌈ \<hodnota\> ⌉_, je funkce horní celé části, funkce, která pro danou hodnotu vrací nejmenší celé číslo, které stále není menší než daná hodnota. Například _⌈2,5⌉ = ⌈3⌉ = 3_. Vnitřní část je _μ<sub>s</sub>[2]÷32_. Při pohledu do části 3 (Konvence) na str. 3 je _μ_ stav stroje. Stav stroje je definován v části 9.4.1 na str. 13. Podle této části je jedním z parametrů stavu stroje _s_ pro zásobník. Když to všechno dáme dohromady, zdá se, že _μ<sub>s</sub>[2]_ je pozice č. 2 v zásobníku. Při pohledu na [operační kód](https://www.evm.codes/#37) je pozice č. 2 v zásobníku velikost dat v bajtech. Při pohledu na ostatní operační kódy ve skupině W<sub>copy</sub>, [`CODECOPY`](https://www.evm.codes/#39) a [`RETURNDATACOPY`](https://www.evm.codes/#3e), mají také velikost dat na stejné pozici. Takže _⌈μ<sub>s</sub>[2]÷32⌉_ je počet 32bajtových slov potřebných k uložení kopírovaných dat. Když vše sečteme, vlastní náklady na [`CALLDATACOPY`](https://www.evm.codes/#37) jsou 3 jednotky paliva plus 3 za každé slovo kopírovaných dat.

### Provozní náklady {#running-cost}

Náklady na spuštění kódu, který voláme.

- V případě [`CREATE`](https://www.evm.codes/#f0) a [`CREATE2`](https://www.evm.codes/#f5) se jedná o konstruktor pro nový kontrakt.
- V případě [`CALL`](https://www.evm.codes/#f1), [`CALLCODE`](https://www.evm.codes/#f2), [`STATICCALL`](https://www.evm.codes/#fa) nebo [`DELEGATECALL`](https://www.evm.codes/#f4) se jedná o kontrakt, který voláme.

### Náklady na rozšíření paměti {#expanding-memory-cost}

Náklady na rozšíření paměti (v případě potřeby).

V rovnici 324 je tato hodnota zapsána jako _C<sub>mem</sub>(μ<sub>i</sub>')-C<sub>mem</sub>(μ<sub>i</sub>)_. Když se znovu podíváme na část 9.4.1, vidíme, že _μ<sub>i</sub>_ je počet slov v paměti. Takže _μ<sub>i</sub>_ je počet slov v paměti před operačním kódem a _μ<sub>i</sub>'_ je počet slov v paměti po operačním kódu.

Funkce _C<sub>mem</sub>_ je definována v rovnici 326: _C<sub>mem</sub>(a) = G<sub>memory</sub> × a + ⌊a<sup>2</sup> ÷ 512⌋_. <em>⌊x⌋</em> je funkce dolní celé části, funkce, která pro danou hodnotu vrací největší celé číslo, které stále není větší než daná hodnota. Například _⌊2,5⌋ = ⌊2⌋ = 2._ Když _a < √512_, _a<sup>2</sup> < 512_ a výsledek funkce dolní celé části je nula. Takže u prvních 22 slov (704 bajtů) rostou náklady lineárně s počtem požadovaných paměťových slov. Za tímto bodem je _⌊a<sup>2</sup> ÷ 512⌋_ kladné. Když je požadovaná paměť dostatečně velká, náklady na palivo jsou úměrné druhé mocnině velikosti paměti.

**Poznámka:** Tyto faktory ovlivňují pouze _vlastní_ náklady na palivo – neberou v úvahu trh s poplatky ani spropitné validátorům, které určují, kolik musí koncový uživatel zaplatit – toto jsou pouze hrubé náklady na provedení konkrétní operace v EVM.

[Přečtěte si více o palivu](/developers/docs/gas/).

## 9.3 Prostředí pro provádění {#93-execution-env}

Prostředí pro provádění je n-tice, _I_, která obsahuje informace, jež nejsou součástí stavu blockchainu ani EVM.

| Parametr        | Operační kód pro přístup k datům                                                                               | Kód v jazyce Solidity pro přístup k datům                |
| --------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| _I<sub>a</sub>_ | [`ADDRESS`](https://www.evm.codes/#30)                                                                         | `address(this)`                                          |
| _I<sub>o</sub>_ | [`ORIGIN`](https://www.evm.codes/#32)                                                                          | `tx.origin`                                              |
| _I<sub>p</sub>_ | [`GASPRICE`](https://www.evm.codes/#3a)                                                                        | `tx.gasprice`                                            |
| _I<sub>d</sub>_ | [`CALLDATALOAD`](https://www.evm.codes/#35), atd.                                              | `msg.data`                                               |
| _I<sub>s</sub>_ | [`CALLER`](https://www.evm.codes/#33)                                                                          | `msg.sender`                                             |
| _I<sub>v</sub>_ | [`CALLVALUE`](https://www.evm.codes/#34)                                                                       | `msg.value`                                              |
| _I<sub>b</sub>_ | [`CODECOPY`](https://www.evm.codes/#39)                                                                        | `address(this).code`                                     |
| _I<sub>H</sub>_ | Pole hlavičky bloku, jako je [`NUMBER`](https://www.evm.codes/#43) a [`DIFFICULTY`](https://www.evm.codes/#44) | `block.number`, `block.difficulty`, atd. |
| _I<sub>e</sub>_ | Hloubka zásobníku volání pro volání mezi kontrakty (včetně vytváření kontraktů)             |                                                          |
| _I<sub>w</sub>_ | Je EVM povoleno měnit stav, nebo běží staticky                                                                 |                                                          |

Pro pochopení zbytku části 9 je nutných několik dalších parametrů:

| Parametr | Definováno v části                                               | Význam                                                                                                                                                                                                                 |
| -------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _σ_      | 2 (str. 2, rovnice 1)         | Stav blockchainu                                                                                                                                                                                                       |
| _g_      | 9.3 (str. 13) | Zbývající palivo                                                                                                                                                                                                       |
| _A_      | 6.1 (str. 8)  | Nahromaděný podstav (změny naplánované na konec transakce)                                                                                                                                          |
| _o_      | 9.3 (str. 13) | Výstup – vrácený výsledek v případě interní transakce (když jeden kontrakt volá druhý) a volání funkcí view (když pouze žádáte o informace, takže není třeba čekat na transakci) |

## 9.4 Přehled provádění {#94-execution-overview}

Nyní, když máme všechny přípravné práce za sebou, můžeme se konečně začít zabývat tím, jak EVM funguje.

Rovnice 137–142 nám dávají počáteční podmínky pro spuštění EVM:

| Symbol           | Počáteční hodnota                                                                | Význam                                                                                                                                                                                                                                                                                                               |
| ---------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _μ<sub>g</sub>_  | _g_                                                                              | Zbývající palivo                                                                                                                                                                                                                                                                                                     |
| _μ<sub>pc</sub>_ | _0_                                                                              | Čítač instrukcí, adresa další instrukce, která se má provést                                                                                                                                                                                                                                                         |
| _μ<sub>m</sub>_  | _(0, 0, ...)_ | Paměť, inicializovaná na samé nuly                                                                                                                                                                                                                                                                                   |
| _μ<sub>i</sub>_  | _0_                                                                              | Nejvyšší použitá paměťová lokace                                                                                                                                                                                                                                                                                     |
| _μ<sub>s</sub>_  | _()_                                                          | Zásobník, zpočátku prázdný                                                                                                                                                                                                                                                                                           |
| _μ<sub>o</sub>_  | _∅_                                                                              | Výstup, prázdná množina, dokud se nezastavíme buď s návratovými daty ([`RETURN`](https://www.evm.codes/#f3) nebo [`REVERT`](https://www.evm.codes/#fd)), nebo bez nich ([`STOP`](https://www.evm.codes/#00) nebo [`SELFDESTRUCT`](https://www.evm.codes/#ff)). |

Rovnice 143 nám říká, že v každém okamžiku provádění existují čtyři možné podmínky a co s nimi dělat:

1. `Z(σ,μ,A,I)`. Z představuje funkci, která testuje, zda operace vytváří neplatný přechod stavu (viz [výjimečné zastavení](#942-exceptional-halting)). Pokud se vyhodnotí jako Pravda, nový stav je totožný se starým (kromě toho, že se spálí palivo), protože změny nebyly implementovány.
2. Pokud je prováděným operačním kódem [`REVERT`](https://www.evm.codes/#fd), nový stav je stejný jako starý stav, ztratí se nějaké palivo.
3. Pokud je sekvence operací dokončena, jak je naznačeno [`RETURN`](https://www.evm.codes/#f3)), stav je aktualizován na nový stav.
4. Pokud se nenacházíme v jedné z koncových podmínek 1–3, pokračujte v běhu.

## 9.4.1 Stav stroje {#941-machine-state}

Tato část podrobněji vysvětluje stav stroje. Určuje, že _w_ je aktuální operační kód. Pokud je _μ<sub>pc</sub>_ menší než _||I<sub>b</sub>||_, délka kódu, pak je tento bajt (_I<sub>b</sub>[μ<sub>pc</sub>]_) operačním kódem. V opačném případě je operační kód definován jako [`STOP`](https://www.evm.codes/#00).

Jelikož se jedná o [zásobníkový stroj](https://en.wikipedia.org/wiki/Stack_machine), musíme sledovat počet položek vyjmutých (_δ_) a vložených (_α_) každým operačním kódem.

## 9.4.2 Výjimečné zastavení {#942-exceptional-halt}

Tato část definuje funkci _Z_, která určuje, kdy dochází k abnormálnímu ukončení. Toto je [Booleovská](https://en.wikipedia.org/wiki/Boolean_data_type) funkce, takže používá [_∨_ pro logický součet (neboli OR)](https://en.wikipedia.org/wiki/Logical_disjunction) a [_∧_ pro logický součin (neboli AND)](https://en.wikipedia.org/wiki/Logical_conjunction).

K výjimečnému zastavení dojde, pokud je splněna některá z těchto podmínek:

- **_μ<sub>g</sub> < C(σ,μ,A,I)_**
  Jak jsme viděli v části 9.2, _C_ je funkce, která určuje náklady na palivo. Nezbývá dostatek paliva na pokrytí dalšího operačního kódu.

- **_δ<sub>w</sub>=∅_**
  Pokud počet položek vyjmutých pro operační kód není definován, pak je i samotný operační kód nedefinovaný.

- **_|| μ<sub>s</sub> || < δ<sub>w</sub>_**
  Podtečení zásobníku, v zásobníku není dostatek položek pro aktuální operační kód.

- **_w = JUMP ∧ μ<sub>s</sub>[0]∉D(I<sub>b</sub>)_**
  Operační kód je [`JUMP`](https://www.evm.codes/#56) a adresa není [`JUMPDEST`](https://www.evm.codes/#5b). Skoky jsou platné _pouze_ tehdy, když je cíl [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = JUMPI ∧ μ<sub>s</sub>[1]≠0 ∧ μ<sub>s</sub>[0] ∉ D(I<sub>b</sub>)_**
  Operační kód je [`JUMPI`](https://www.evm.codes/#57), podmínka je pravdivá (nenulová), takže by měl nastat skok, a adresa není [`JUMPDEST`](https://www.evm.codes/#5b). Skoky jsou platné _pouze_ tehdy, když je cíl [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = RETURNDATACOPY ∧ μ<sub>s</sub>[1]+μ<sub>s</sub>[2]>|| μ<sub>o</sub> ||_**
  Operační kód je [`RETURNDATACOPY`](https://www.evm.codes/#3e). V tomto operačním kódu je prvek zásobníku _μ<sub>s</sub>[1]_ offset, od kterého se má číst ve vyrovnávací paměti návratových dat, a prvek zásobníku _μ<sub>s</sub>[2]_ je délka dat. Tato podmínka nastane, když se pokusíte číst za koncem vyrovnávací paměti návratových dat. Všimněte si, že pro calldata nebo pro samotný kód neexistuje podobná podmínka. Když se pokusíte číst za koncem těchto vyrovnávacích pamětí, dostanete pouze nuly.

- **_|| μ<sub>s</sub> || - δ<sub>w</sub> + α<sub>w</sub> > 1024_**

  Přetečení zásobníku. Pokud provedení operačního kódu povede k zásobníku s více než 1024 položkami, operace se přeruší.

- **_¬I<sub>w</sub> ∧ W(w,μ)_**
  Běžíme staticky ([¬ je negace](https://en.wikipedia.org/wiki/Negation) a _I<sub>w</sub>_ je pravda, když smíme měnit stav blockchainu)? Pokud ano a pokoušíme se o operaci měnící stav, nemůže k ní dojít.

  Funkce _W(w,μ)_ je definována později v rovnici 150. _W(w,μ)_ je pravda, pokud je splněna jedna z těchto podmínek:

  - **_w ∈ \{CREATE, CREATE2, SSTORE, SELFDESTRUCT}_**
    Tyto operační kódy mění stav, a to buď vytvořením nového kontraktu, uložením hodnoty, nebo zničením aktuálního kontraktu.

  - **_LOG0≤w ∧ w≤LOG4_**
    Pokud jsme voláni staticky, nemůžeme vydávat záznamy protokolu.
    Všechny operační kódy pro protokol jsou v rozsahu mezi [`LOG0` (A0)](https://www.evm.codes/#a0) a [`LOG4` (A4)](https://www.evm.codes/#a4).
    Číslo za operačním kódem protokolu určuje, kolik témat záznam protokolu obsahuje.

  - **_w=CALL ∧ μ<sub>s</sub>[2]≠0_**
    Můžete volat jiný kontrakt, když jste statický, ale pokud tak učiníte, nemůžete mu převést ETH.

- **_w = SSTORE ∧ μ<sub>g</sub> ≤ G<sub>callstipend</sub>_**
  Nemůžete spustit [`SSTORE`](https://www.evm.codes/#55), pokud nemáte více než G<sub>callstipend</sub> (definováno jako 2300 v dodatku G) paliva.

## 9.4.3 Platnost cíle skoku {#943-jump-dest-valid}

Zde formálně definujeme, co jsou operační kódy [`JUMPDEST`](https://www.evm.codes/#5b). Nemůžeme se jen dívat na bajtovou hodnotu 0x5B, protože by mohla být uvnitř PUSH (a tedy data, a ne operační kód).

V rovnici (153) definujeme funkci _N(i,w)_. První parametr, _i_, je pozice operačního kódu. Druhý, _w_, je samotný operační kód. Pokud _w∈[PUSH1, PUSH32]_, znamená to, že operační kód je PUSH (hranaté závorky definují rozsah, který zahrnuje koncové body). V takovém případě je další operační kód na pozici _i+2+(w−PUSH1)_. Pro [`PUSH1`](https://www.evm.codes/#60) se musíme posunout o dva bajty (samotný PUSH a jednobajtová hodnota), pro [`PUSH2`](https://www.evm.codes/#61) se musíme posunout o tři bajty, protože se jedná o dvoubajtovou hodnotu, atd. Všechny ostatní operační kódy EVM jsou dlouhé pouze jeden bajt, takže ve všech ostatních případech je _N(i,w)=i+1_.

Tato funkce se používá v rovnici (152) k definování _D<sub>J</sub>(c,i)_, což je [množina](https://en.wikipedia.org/wiki/Set_\(mathematics\)) všech platných cílů skoku v kódu _c_, počínaje pozicí operačního kódu _i_. Tato funkce je definována rekurzivně. Pokud _i≥||c||_, znamená to, že jsme na konci kódu nebo za ním. Už nenajdeme žádné další cíle skoku, takže jen vrátíme prázdnou množinu.

Ve všech ostatních případech se podíváme na zbytek kódu tak, že přejdeme na další operační kód a získáme množinu, která od něj začíná. _c[i]_ je aktuální operační kód, takže _N(i,c[i])_ je pozice dalšího operačního kódu. _D<sub>J</sub>(c,N(i,c[i]))_ je tedy množina platných cílů skoku, která začíná u dalšího operačního kódu. Pokud aktuální operační kód není `JUMPDEST`, stačí vrátit tuto množinu. Pokud se jedná o `JUMPDEST`, zahrňte jej do výsledné množiny a vraťte ji.

## 9.4.4 Normální zastavení {#944-normal-halt}

Funkce zastavení _H_ může vrátit tři typy hodnot.

- Pokud se nenacházíme v operačním kódu pro zastavení, vraťte _∅_, prázdnou množinu. Podle konvence je tato hodnota interpretována jako booleovská hodnota nepravda (false).
- Pokud máme operační kód zastavení, který neprodukuje výstup (buď [`STOP`](https://www.evm.codes/#00) nebo [`SELFDESTRUCT`](https://www.evm.codes/#ff)), vraťte jako návratovou hodnotu posloupnost bajtů o velikosti nula. Všimněte si, že se to velmi liší od prázdné množiny. Tato hodnota znamená, že EVM se skutečně zastavil, jen nejsou k dispozici žádná návratová data ke čtení.
- Pokud máme operační kód zastavení, který produkuje výstup (buď [`RETURN`](https://www.evm.codes/#f3) nebo [`REVERT`](https://www.evm.codes/#fd)), vraťte posloupnost bajtů specifikovanou tímto operačním kódem. Tato sekvence je převzata z paměti, hodnota na vrcholu zásobníku (_μ<sub>s</sub>[0]_) je první bajt a hodnota za ní (_μ<sub>s</sub>[1]_) je délka.

## H.2 Sada instrukcí {#h2-instruction-set}

Než přejdeme k poslední podčásti EVM, 9.5, podívejme se na samotné instrukce. Jsou definovány v dodatku H.2, který začíná na str. 29. Vše, co není specifikováno jako měnící se s daným operačním kódem, by mělo zůstat stejné. Proměnné, které se mění, jsou specifikovány jako \<něco\>'.

Podívejme se například na operační kód [`ADD`](https://www.evm.codes/#01).

| Hodnota | Mnemotechnická pomůcka | δ | α | Popis                                                                                                                                                                                                                 |
| ------: | ---------------------- | - | - | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    0x01 | ADD                    | 2 | 1 | Operace sčítání.                                                                                                                                                                                      |
|         |                        |   |   | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[0] + μ<sub>s</sub>[1]_ |

_δ_ je počet hodnot, které ze zásobníku vyjmeme. V tomto případě dvě, protože sčítáme dvě horní hodnoty.

_α_ je počet hodnot, které vložíme zpět. V tomto případě jedna, součet.

Takže nový vrchol zásobníku (_μ′<sub>s</sub>[0]_) je součet starého vrcholu zásobníku (_μ<sub>s</sub>[0]_) a staré hodnoty pod ním (_μ<sub>s</sub>[1]_).

Namísto toho, aby se v tomto článku probíraly všechny operační kódy jako v nudném seznamu, vysvětluje pouze ty operační kódy, které zavádějí něco nového.

| Hodnota | Mnemotechnická pomůcka | δ | α | Popis                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------: | ---------------------- | - | - | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    0x20 | KECCAK256              | 2 | 1 | Vypočítá haš Keccak-256.                                                                                                                                                                                                                                                                                                                                                                                                                             |
|         |                        |   |   | _μ′<sub>s</sub>[0] ≡ KEC(μ<sub>m</sub>[μ<sub>s</sub>[0] . . . (μ<sub>s</sub>[0] + μ<sub>s</sub>[1] − 1)])_ |
|         |                        |   |   | _μ′<sub>i</sub> ≡ M(μ<sub>i</sub>,μ<sub>s</sub>[0],μ<sub>s</sub>[1])_                                                                                                                                                                                                                                                                     |

Toto je první operační kód, který přistupuje k paměti (v tomto případě pouze pro čtení). Může se však rozšířit za současné limity paměti, takže musíme aktualizovat _μ<sub>i</sub>._ Děláme to pomocí funkce _M_ definované v rovnici 328 na str. 29.

| Hodnota | Mnemotechnická pomůcka | δ | α | Popis                                               |
| ------: | ---------------------- | - | - | --------------------------------------------------- |
|    0x31 | BALANCE                | 1 | 1 | Získá zůstatek daného účtu.         |
|         |                        |   |   | ... |

Adresa, jejíž zůstatek potřebujeme najít, je _μ<sub>s</sub>[0] mod 2<sup>160</sup>_. Na vrcholu zásobníku je adresa, ale protože adresy mají pouze 160 bitů, vypočítáme hodnotu [modulo](https://en.wikipedia.org/wiki/Modulo_operation) 2<sup>160</sup>.

Pokud _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] ≠ ∅_, znamená to, že o této adrese existují informace. V takovém případě je _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>]<sub>b</sub>_ zůstatek pro tuto adresu. Pokud _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] = ∅_, znamená to, že tato adresa je neinicializovaná a zůstatek je nulový. Seznam polí s informacemi o účtu naleznete v části 4.1 na str. 4.

Druhá rovnice, _A'<sub>a</sub> ≡ A<sub>a</sub> ∪ \{μ<sub>s</sub>[0] mod 2<sup>160</sup>}_, souvisí s rozdílem v nákladech mezi přístupem do teplého úložiště (úložiště, ke kterému se nedávno přistupovalo a které je pravděpodobně v mezipaměti) a studeného úložiště (úložiště, ke kterému se nepřistupovalo a které je pravděpodobně v pomalejším úložišti, jehož načtení je dražší). _A<sub>a</sub>_ je seznam adres, ke kterým transakce dříve přistupovala, a proto by měl být přístup k nim levnější, jak je definováno v části 6.1 na str. 8. Více o tomto tématu si můžete přečíst v [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929).

| Hodnota | Mnemotechnická pomůcka | δ  | α  | Popis                                                                                                                                           |
| ------: | ---------------------- | -- | -- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
|    0x8F | DUP16                  | 16 | 17 | Duplikovat 16. položku zásobníku.                                                                               |
|         |                        |    |    | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[15]_ |

Všimněte si, že pro použití jakékoli položky zásobníku ji musíme vyjmout (pop), což znamená, že musíme také vyjmout všechny položky zásobníku nad ní. V případě [`DUP<n>`](https://www.evm.codes/#8f) a [`SWAP<n>`](https://www.evm.codes/#9f) to znamená, že je třeba vyjmout (pop) a poté vložit (push) až šestnáct hodnot.

## 9.5 Prováděcí cyklus {#95-exec-cycle}

Nyní, když máme všechny části, můžeme konečně pochopit, jak je zdokumentován prováděcí cyklus EVM.

Rovnice (155) říká, že pro daný stav:

- _σ_ (globální stav blockchainu)
- _μ_ (stav EVM)
- _A_ (podstav, změny, které se mají provést po skončení transakce)
- _I_ (prostředí pro provádění)

Nový stav je _(σ', μ', A', I')_.

Rovnice (156)–(158) definují zásobník a změnu v něm v důsledku operačního kódu (_μ<sub>s</sub>_). Rovnice (159) je změna paliva (_μ<sub>g</sub>_). Rovnice (160) je změna v čítači instrukcí (_μ<sub>pc</sub>_). Nakonec rovnice (161)–(164) specifikují, že ostatní parametry zůstávají stejné, pokud nejsou explicitně změněny operačním kódem.

Tím je EVM plně definován.

## Závěr {#conclusion}

Matematický zápis je přesný a umožnil Yellow Paperu specifikovat každý detail Etherea. Má však i některé nevýhody:

- Mohou mu rozumět pouze lidé, což znamená, že [testy shody](https://github.com/ethereum/tests) se musí psát ručně.
- Programátoři rozumí počítačovému kódu.
  Matematickému zápisu rozumět mohou, ale nemusí.

Možná z těchto důvodů jsou novější [specifikace konsensuální vrstvy](https://github.com/ethereum/consensus-specs/blob/dev/tests/core/pyspec/README.md) napsány v Pythonu. Existují [specifikace exekuční vrstvy v Pythonu](https://ethereum.github.io/execution-specs), ale nejsou úplné. Dokud nebude celý Yellow Paper přeložen do Pythonu nebo podobného jazyka, bude Yellow Paper nadále sloužit a je užitečné umět ho číst.
