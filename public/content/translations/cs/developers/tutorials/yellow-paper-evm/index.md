---
title: "Porozumění specifikacím EVM v yellow paperu"
description: "Porozumění části yellow paperu, formální specifikace Etherea, která vysvětluje virtuální stroj Etherea (EVM)."
author: "qbzzt"
tags: ["evm"]
skill: intermediate
breadcrumb: EVM v yellow paperu
lang: cs
published: 2022-05-15
---

[Yellow paper](https://ethereum.github.io/yellowpaper/paper.pdf) je formální specifikace Etherea. Kromě případů, kdy je pozměněn [procesem EIP](/eips/), obsahuje přesný popis toho, jak vše funguje. Je napsán jako matematický článek, což zahrnuje terminologii, která programátorům nemusí být povědomá. V tomto článku se dozvíte, jak jej číst, a v širším smyslu i další související matematické články.

## Který yellow paper? {#which-yellow-paper}

Jako téměř všechno ostatní v Ethereu se i yellow paper postupem času vyvíjí. Abych mohl odkazovat na konkrétní verzi, nahrál jsem [aktuální verzi v době psaní](yellow-paper-berlin.pdf). Čísla sekcí, stránek a rovnic, která používám, budou odkazovat na tuto verzi. Při čtení tohoto dokumentu je dobré mít jej otevřený v jiném okně.

### Proč EVM? {#why-the-evm}

Původní yellow paper byl napsán hned na začátku vývoje Etherea. Popisuje původní mechanismus konsensu založený na důkazu prací (PoW), který se původně používal k zabezpečení sítě. Ethereum však v září 2022 vypnulo důkaz prací a začalo používat konsensus založený na důkazu podílem (PoS). Tento tutoriál se zaměří na části yellow paperu definující virtuální stroj Etherea (EVM). EVM zůstal přechodem na důkaz podílem nezměněn (s výjimkou návratové hodnoty operačního kódu DIFFICULTY).

## 9 Exekuční model {#9-execution-model}

Tato sekce (str. 12-14) obsahuje většinu definice EVM.

Pojem _stav systému_ (system state) zahrnuje vše, co potřebujete o systému vědět, abyste jej mohli spustit. V typickém počítači to znamená paměť, obsah registrů atd.

[Turingův stroj](https://en.wikipedia.org/wiki/Turing_machine) je výpočetní model. V podstatě se jedná o zjednodušenou verzi počítače, u které je dokázáno, že má stejnou schopnost provádět výpočty jako normální počítač (vše, co dokáže spočítat počítač, dokáže spočítat i Turingův stroj a naopak). Tento model usnadňuje dokazování různých teorémů o tom, co je a co není vyčíslitelné.

Pojem [Turingovsky úplný](https://en.wikipedia.org/wiki/Turing_completeness) označuje počítač, který dokáže provádět stejné výpočty jako Turingův stroj. Turingovy stroje se mohou dostat do nekonečných smyček, což EVM nemůže, protože by mu došel gas, takže je pouze kvazi-Turingovsky úplný.

## 9.1 Základy {#91-basics}

Tato sekce popisuje základy EVM a jeho srovnání s jinými výpočetními modely.

[Zásobníkový stroj](https://en.wikipedia.org/wiki/Stack_machine) je počítač, který neukládá mezivýsledky do registrů, ale do [**zásobníku**](<https://en.wikipedia.org/wiki/Stack_(abstract_data_type)>). Toto je preferovaná architektura pro virtuální stroje, protože se snadno implementuje, což znamená, že chyby a bezpečnostní zranitelnosti jsou mnohem méně pravděpodobné. Paměť v zásobníku je rozdělena na 256bitová slova. To bylo zvoleno, protože je to výhodné pro základní kryptografické operace Etherea, jako je hashování Keccak-256 a výpočty na eliptické křivce. Maximální velikost zásobníku je 1024 položek (1024 x 256 bitů). Když se provádějí operační kódy, obvykle získávají své parametry ze zásobníku. Existují operační kódy určené speciálně pro reorganizaci prvků v zásobníku, jako je `POP` (odstraní položku z vrcholu zásobníku), `DUP_N` (duplikuje N-tou položku v zásobníku) atd.

EVM má také volatilní prostor zvaný **paměť** (memory), který se používá k ukládání dat během provádění. Tato paměť je organizována do 32bajtových slov. Všechna paměťová místa jsou inicializována na nulu. Pokud spustíte tento kód v jazyce [Yul](https://docs.soliditylang.org/en/latest/yul.html) pro přidání slova do paměti, zaplní 32 bajtů paměti tím, že prázdné místo ve slově vyplní nulami, tj. vytvoří jedno slovo – s nulami na pozicích 0-29, 0x60 na 30 a 0xA7 na 31.

```yul
mstore(0, 0x60A7)
```

`mstore` je jedním ze tří operačních kódů, které EVM poskytuje pro interakci s pamětí – načte slovo do paměti. Další dva jsou `mstore8`, který načte jeden bajt do paměti, a `mload`, který přesune slovo z paměti do zásobníku.

EVM má také samostatný nevolatilní model **úložiště** (storage), který je udržován jako součást stavu systému – tato paměť je organizována do polí slov (na rozdíl od polí bajtů adresovatelných po slovech v zásobníku). V tomto úložišti kontrakty uchovávají trvalá data – kontrakt může interagovat pouze se svým vlastním úložištěm. Úložiště je organizováno v mapování klíč-hodnota.

Ačkoli to v této sekci yellow paperu není zmíněno, je také užitečné vědět, že existuje čtvrtý typ paměti. **Data volání** (calldata) je bajtově adresovatelná paměť pouze pro čtení, která se používá k uložení hodnoty předané s parametrem `data` transakce. EVM má specifické operační kódy pro správu `calldata`. `calldatasize` vrací velikost dat. `calldataload` načte data do zásobníku. `calldatacopy` zkopíruje data do paměti.

Standardní [von Neumannova architektura](https://en.wikipedia.org/wiki/Von_Neumann_architecture) ukládá kód a data do stejné paměti. EVM se tímto standardem z bezpečnostních důvodů neřídí – sdílení volatilní paměti by umožnilo měnit kód programu. Místo toho se kód ukládá do úložiště.

Existují pouze dva případy, kdy se kód spouští z paměti:

- Když kontrakt vytvoří jiný kontrakt (pomocí [`CREATE`](https://www.evm.codes/#f0) nebo [`CREATE2`](https://www.evm.codes/#f5)), kód pro konstruktor kontraktu pochází z paměti.
- Během vytváření _jakéhokoli_ kontraktu se spustí kód konstruktoru a poté se vrátí s kódem samotného kontraktu, rovněž z paměti.

Pojem výjimečné provedení (exceptional execution) znamená výjimku, která způsobí zastavení provádění aktuálního kontraktu.

## 9.2 Přehled poplatků {#92-fees-overview}

Tato sekce vysvětluje, jak se počítají poplatky za gas. Existují tři druhy nákladů:

### Cena operačního kódu {#opcode-cost}

Základní cena konkrétního operačního kódu. Chcete-li získat tuto hodnotu, najděte nákladovou skupinu operačního kódu v příloze H (str. 28, pod rovnicí (327)) a najděte nákladovou skupinu v rovnici (324). Tím získáte nákladovou funkci, která ve většině případů používá parametry z přílohy G (str. 27).

Například operační kód [`CALLDATACOPY`](https://www.evm.codes/#37) je členem skupiny _W<sub>copy</sub>_. Cena operačního kódu pro tuto skupinu je _G<sub>verylow</sub>+G<sub>copy</sub>×⌈μ<sub>s</sub>[2]÷32⌉_. Při pohledu na přílohu G vidíme, že obě konstanty jsou 3, což nám dává _3+3×⌈μ<sub>s</sub>[2]÷32⌉_.

Stále musíme rozluštit výraz _⌈μ<sub>s</sub>[2]÷32⌉_. Vnější část, _⌈ \<hodnota\> ⌉_, je funkce horní celá část (ceiling), funkce, která pro danou hodnotu vrací nejmenší celé číslo, které není menší než tato hodnota. Například _⌈2.5⌉ = ⌈3⌉ = 3_. Vnitřní část je _μ<sub>s</sub>[2]÷32_. Při pohledu na sekci 3 (Konvence) na str. 3 je _μ_ stav stroje. Stav stroje je definován v sekci 9.4.1 na str. 13. Podle této sekce je jedním z parametrů stavu stroje _s_ pro zásobník. Když to dáme všechno dohromady, zdá se, že _μ<sub>s</sub>[2]_ je pozice č. 2 v zásobníku. Při pohledu na [operační kód](https://www.evm.codes/#37) je pozice č. 2 v zásobníku velikost dat v bajtech. Při pohledu na ostatní operační kódy ve skupině W<sub>copy</sub>, [`CODECOPY`](https://www.evm.codes/#39) a [`RETURNDATACOPY`](https://www.evm.codes/#3e), mají také velikost dat na stejné pozici. Takže _⌈μ<sub>s</sub>[2]÷32⌉_ je počet 32bajtových slov potřebných k uložení kopírovaných dat. Když to všechno shrneme, základní cena [`CALLDATACOPY`](https://www.evm.codes/#37) je 3 gas plus 3 za každé slovo kopírovaných dat.

### Cena za spuštění {#running-cost}

Cena za spuštění kódu, který voláme.

- V případě [`CREATE`](https://www.evm.codes/#f0) a [`CREATE2`](https://www.evm.codes/#f5) jde o konstruktor nového kontraktu.
- V případě [`CALL`](https://www.evm.codes/#f1), [`CALLCODE`](https://www.evm.codes/#f2), [`STATICCALL`](https://www.evm.codes/#fa) nebo [`DELEGATECALL`](https://www.evm.codes/#f4) jde o kontrakt, který voláme.

### Cena za rozšíření paměti {#expanding-memory-cost}

Cena za rozšíření paměti (pokud je to nutné).

V rovnici 324 je tato hodnota zapsána jako _C<sub>mem</sub>(μ<sub>i</sub>')-C<sub>mem</sub>(μ<sub>i</sub>)_. Při opětovném pohledu na sekci 9.4.1 vidíme, že _μ<sub>i</sub>_ je počet slov v paměti. Takže _μ<sub>i</sub>_ je počet slov v paměti před operačním kódem a _μ<sub>i</sub>'_ je počet slov v paměti po operačním kódu.

Funkce _C<sub>mem</sub>_ je definována v rovnici 326: _C<sub>mem</sub>(a) = G<sub>memory</sub> × a + ⌊a<sup>2</sup> ÷ 512⌋_. _⌊x⌋_ je funkce dolní celá část (floor), funkce, která pro danou hodnotu vrací největší celé číslo, které není větší než tato hodnota. Například _⌊2.5⌋ = ⌊2⌋ = 2._ Když _a < √512_, _a<sup>2</sup> < 512_ a výsledek funkce dolní celá část je nula. Takže pro prvních 22 slov (704 bajtů) cena roste lineárně s počtem požadovaných paměťových slov. Za tímto bodem je _⌊a<sup>2</sup> ÷ 512⌋_ kladné. Když je požadovaná paměť dostatečně velká, cena gasu je úměrná druhé mocnině množství paměti.

**Poznámka:** Tyto faktory ovlivňují pouze _základní_ cenu gasu – nezohledňují trh s poplatky ani spropitné pro validátory, které určují, kolik musí koncový uživatel zaplatit – jedná se pouze o hrubou cenu za spuštění konkrétní operace na EVM.

[Přečtěte si více o gasu](/developers/docs/gas/).

## 9.3 Exekuční prostředí {#93-execution-env}

Exekuční prostředí je n-tice, _I_, která obsahuje informace, jež nejsou součástí stavu blockchainu ani EVM.

| Parametr        | Operační kód pro přístup k datům                                                                                 | Kód v Solidity pro přístup k datům       |
| --------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| _I<sub>a</sub>_ | [`ADDRESS`](https://www.evm.codes/#30)                                                                           | `address(this)`                          |
| _I<sub>o</sub>_ | [`ORIGIN`](https://www.evm.codes/#32)                                                                            | `tx.origin`                              |
| _I<sub>p</sub>_ | [`GASPRICE`](https://www.evm.codes/#3a)                                                                          | `tx.gasprice`                            |
| _I<sub>d</sub>_ | [`CALLDATALOAD`](https://www.evm.codes/#35), atd.                                                                | `msg.data`                               |
| _I<sub>s</sub>_ | [`CALLER`](https://www.evm.codes/#33)                                                                            | `msg.sender`                             |
| _I<sub>v</sub>_ | [`CALLVALUE`](https://www.evm.codes/#34)                                                                         | `msg.value`                              |
| _I<sub>b</sub>_ | [`CODECOPY`](https://www.evm.codes/#39)                                                                          | `address(this).code`                     |
| _I<sub>H</sub>_ | Pole hlavičky bloku, jako je [`NUMBER`](https://www.evm.codes/#43) a [`DIFFICULTY`](https://www.evm.codes/#44) | `block.number`, `block.difficulty`, atd. |
| _I<sub>e</sub>_ | Hloubka zásobníku volání pro volání mezi kontrakty (včetně vytváření kontraktů)                                  |
| _I<sub>w</sub>_ | Zda má EVM povoleno měnit stav, nebo zda běží staticky                                                           |

K pochopení zbytku sekce 9 je nezbytných několik dalších parametrů:

| Parametr | Definováno v sekci   | Význam                                                                                                                                                                                                                   |
| -------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _σ_      | 2 (str. 2, rovnice 1) | Stav blockchainu                                                                                                                                                                                                         |
| _g_      | 9.3 (str. 13)        | Zbývající gas                                                                                                                                                                                                            |
| _A_      | 6.1 (str. 8)         | Nahromaděný podstav (změny naplánované na konec transakce)                                                                                                                                                               |
| _o_      | 9.3 (str. 13)        | Výstup – vrácený výsledek v případě interní transakce (když jeden kontrakt volá jiný) a volání view funkcí (když pouze žádáte o informace, takže není třeba čekat na transakci)                                          |

## 9.4 Přehled provádění {#94-execution-overview}

Nyní, když máme všechny přípravy za sebou, můžeme konečně začít pracovat na tom, jak EVM funguje.

Rovnice 137-142 nám dávají počáteční podmínky pro spuštění EVM:

| Symbol           | Počáteční hodnota | Význam                                                                                                                                                                                                                                                      |
| ---------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _μ<sub>g</sub>_  | _g_               | Zbývající gas                                                                                                                                                                                                                                               |
| _μ<sub>pc</sub>_ | _0_               | Čítač programu, adresa další instrukce k provedení                                                                                                                                                                                                          |
| _μ<sub>m</sub>_  | _(0, 0, ...)_     | Paměť, inicializovaná na samé nuly                                                                                                                                                                                                                          |
| _μ<sub>i</sub>_  | _0_               | Nejvyšší použité paměťové místo                                                                                                                                                                                                                             |
| _μ<sub>s</sub>_  | _()_              | Zásobník, zpočátku prázdný                                                                                                                                                                                                                                  |
| _μ<sub>o</sub>_  | _∅_               | Výstup, prázdná množina, dokud se nezastavíme buď s návratovými daty ([`RETURN`](https://www.evm.codes/#f3) nebo [`REVERT`](https://www.evm.codes/#fd)), nebo bez nich ([`STOP`](https://www.evm.codes/#00) nebo [`SELFDESTRUCT`](https://www.evm.codes/#ff)). |

Rovnice 143 nám říká, že v každém okamžiku během provádění existují čtyři možné stavy a co s nimi dělat:

1.  `Z(σ,μ,A,I)`. Z představuje funkci, která testuje, zda operace vytváří neplatný přechod stavu (viz [výjimečné zastavení](#942-exceptional-halt)). Pokud se vyhodnotí jako True, nový stav je identický se starým (kromě toho, že se spálí gas), protože změny nebyly implementovány.
2.  Pokud je prováděným operačním kódem [`REVERT`](https://www.evm.codes/#fd), nový stav je stejný jako starý stav, část gasu je ztracena.
3.  Pokud je sekvence operací dokončena, což je signalizováno pomocí [`RETURN`](https://www.evm.codes/#f3)), stav se aktualizuje na nový stav.
4.  Pokud nejsme v jedné z koncových podmínek 1-3, pokračujeme v běhu.

## 9.4.1 Stav stroje {#941-machine-state}

Tato sekce podrobněji vysvětluje stav stroje. Specifikuje, že _w_ je aktuální operační kód. Pokud je _μ<sub>pc</sub>_ menší než _||I<sub>b</sub>||_, což je délka kódu, pak je tento bajt (_I<sub>b</sub>[μ<sub>pc</sub>]_) operačním kódem. V opačném případě je operační kód definován jako [`STOP`](https://www.evm.codes/#00).

Jelikož se jedná o [zásobníkový stroj](https://en.wikipedia.org/wiki/Stack_machine), musíme sledovat počet položek vyjmutých (_δ_) a vložených (_α_) každým operačním kódem.

## 9.4.2 Výjimečné zastavení {#942-exceptional-halt}

Tato sekce definuje funkci _Z_, která specifikuje, kdy dojde k abnormálnímu ukončení. Jedná se o [booleovskou](https://en.wikipedia.org/wiki/Boolean_data_type) funkci, takže používá [_∨_ pro logické NEBO (OR)](https://en.wikipedia.org/wiki/Logical_disjunction) a [_∧_ pro logické A (AND)](https://en.wikipedia.org/wiki/Logical_conjunction).

K výjimečnému zastavení dojde, pokud je splněna kterákoli z těchto podmínek:

- **_μ<sub>g</sub> < C(σ,μ,A,I)_**
  Jak jsme viděli v sekci 9.2, _C_ je funkce, která specifikuje cenu gasu. Nezbývá dostatek gasu na pokrytí dalšího operačního kódu.

- **_δ<sub>w</sub>=∅_**
  Pokud je počet vyjmutých položek pro operační kód nedefinovaný, pak je nedefinovaný i samotný operační kód.

- **_|| μ<sub>s</sub> || < δ<sub>w</sub>_**
  Podtečení zásobníku, v zásobníku není dostatek položek pro aktuální operační kód.

- **_w = JUMP ∧ μ<sub>s</sub>[0]∉D(I<sub>b</sub>)_**
  Operační kód je [`JUMP`](https://www.evm.codes/#56) a adresa není [`JUMPDEST`](https://www.evm.codes/#5b). Skoky jsou platné _pouze_ tehdy, když je cílem [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = JUMPI ∧ μ<sub>s</sub>[1]≠0 ∧ μ<sub>s</sub>[0] ∉ D(I<sub>b</sub>)_**
  Operační kód je [`JUMPI`](https://www.evm.codes/#57), podmínka je pravdivá (nenulová), takže by měl proběhnout skok, a adresa není [`JUMPDEST`](https://www.evm.codes/#5b). Skoky jsou platné _pouze_ tehdy, když je cílem [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = RETURNDATACOPY ∧ μ<sub>s</sub>[1]+μ<sub>s</sub>[2]>|| μ<sub>o</sub> ||_**
  Operační kód je [`RETURNDATACOPY`](https://www.evm.codes/#3e). V tomto operačním kódu je prvek zásobníku _μ<sub>s</sub>[1]_ offset, ze kterého se má číst v bufferu návratových dat, a prvek zásobníku _μ<sub>s</sub>[2]_ je délka dat. Tato podmínka nastane, když se pokusíte číst za koncem bufferu návratových dat. Všimněte si, že pro data volání (calldata) nebo pro samotný kód podobná podmínka neexistuje. Když se pokusíte číst za koncem těchto bufferů, dostanete jednoduše nuly.

- **_|| μ<sub>s</sub> || - δ<sub>w</sub> + α<sub>w</sub> > 1024_**

  Přetečení zásobníku. Pokud spuštění operačního kódu povede k zásobníku s více než 1024 položkami, dojde k přerušení.

- **_¬I<sub>w</sub> ∧ W(w,μ)_**
  Běžíme staticky ([¬ je negace](https://en.wikipedia.org/wiki/Negation) a _I<sub>w</sub>_ je pravda, když máme povoleno měnit stav blockchainu)? Pokud ano a pokoušíme se o operaci měnící stav, nemůže k ní dojít.

  Funkce _W(w,μ)_ je definována později v rovnici 150. _W(w,μ)_ je pravda, pokud je splněna jedna z těchto podmínek:

  - **_w ∈ \{CREATE, CREATE2, SSTORE, SELFDESTRUCT}_**
    Tyto operační kódy mění stav, ať už vytvořením nového kontraktu, uložením hodnoty nebo zničením aktuálního kontraktu.

  - **_LOG0≤w ∧ w≤LOG4_**
    Pokud jsme voláni staticky, nemůžeme emitovat záznamy logu.
    Všechny operační kódy logu jsou v rozsahu mezi [`LOG0` (A0)](https://www.evm.codes/#a0) a [`LOG4` (A4)](https://www.evm.codes/#a4).
    Číslo za operačním kódem logu určuje, kolik témat (topics) záznam logu obsahuje.
  - **_w=CALL ∧ μ<sub>s</sub>[2]≠0_**
    Můžete zavolat jiný kontrakt, když jste statičtí, ale pokud tak učiníte, nemůžete na něj převést ETH.

- **_w = SSTORE ∧ μ<sub>g</sub> ≤ G<sub>callstipend</sub>_**
  Nemůžete spustit [`SSTORE`](https://www.evm.codes/#55), pokud nemáte více než G<sub>callstipend</sub> (definováno jako 2300 v příloze G) gasu.

## 9.4.3 Platnost cíle skoku {#943-jump-dest-valid}

Zde formálně definujeme, co jsou operační kódy [`JUMPDEST`](https://www.evm.codes/#5b). Nemůžeme jednoduše hledat bajtovou hodnotu 0x5B, protože by mohla být uvnitř PUSH (a tedy by šlo o data, nikoli o operační kód).

V rovnici (153) definujeme funkci _N(i,w)_. První parametr, _i_, je pozice operačního kódu. Druhý, _w_, je samotný operační kód. Pokud _w∈[PUSH1, PUSH32]_, znamená to, že operační kód je PUSH (hranaté závorky definují rozsah, který zahrnuje koncové body). V takovém případě je další operační kód na _i+2+(w−PUSH1)_. Pro [`PUSH1`](https://www.evm.codes/#60) se musíme posunout o dva bajty (samotný PUSH a jednobajtová hodnota), pro [`PUSH2`](https://www.evm.codes/#61) se musíme posunout o tři bajty, protože jde o dvoubajtovou hodnotu atd. Všechny ostatní operační kódy EVM jsou dlouhé pouze jeden bajt, takže ve všech ostatních případech _N(i,w)=i+1_.

Tato funkce se používá v rovnici (152) k definování _D<sub>J</sub>(c,i)_, což je [množina](<https://en.wikipedia.org/wiki/Set_(mathematics)>) všech platných cílů skoku v kódu _c_, počínaje pozicí operačního kódu _i_. Tato funkce je definována rekurzivně. Pokud _i≥||c||_, znamená to, že jsme na konci kódu nebo za ním. Už nenajdeme žádné další cíle skoku, takže jednoduše vrátíme prázdnou množinu.

Ve všech ostatních případech se podíváme na zbytek kódu tak, že přejdeme na další operační kód a získáme množinu začínající od něj. _c[i]_ je aktuální operační kód, takže _N(i,c[i])_ je pozice dalšího operačního kódu. _D<sub>J</sub>(c,N(i,c[i]))_ je tedy množina platných cílů skoku, která začíná na dalším operačním kódu. Pokud aktuální operační kód není `JUMPDEST`, jednoduše vraťte tuto množinu. Pokud je to `JUMPDEST`, zahrňte jej do výsledné množiny a tu vraťte.

## 9.4.4 Normální zastavení {#944-normal-halt}

Funkce zastavení _H_ může vracet tři typy hodnot.

- Pokud nejsme v operačním kódu zastavení, vraťte _∅_, prázdnou množinu. Podle konvence je tato hodnota interpretována jako booleovská nepravda (false).
- Pokud máme operační kód zastavení, který neprodukuje výstup (buď [`STOP`](https://www.evm.codes/#00) nebo [`SELFDESTRUCT`](https://www.evm.codes/#ff)), vraťte jako návratovou hodnotu sekvenci o velikosti nula bajtů. Všimněte si, že se to velmi liší od prázdné množiny. Tato hodnota znamená, že se EVM skutečně zastavil, jen nejsou k dispozici žádná návratová data ke čtení.
- Pokud máme operační kód zastavení, který produkuje výstup (buď [`RETURN`](https://www.evm.codes/#f3) nebo [`REVERT`](https://www.evm.codes/#fd)), vraťte sekvenci bajtů specifikovanou tímto operačním kódem. Tato sekvence je převzata z paměti, hodnota na vrcholu zásobníku (_μ<sub>s</sub>[0]_) je první bajt a hodnota za ní (_μ<sub>s</sub>[1]_) je délka.

## H.2 Instrukční sada {#h2-instruction-set}

Než přejdeme k závěrečné podsekci EVM, 9.5, podívejme se na samotné instrukce. Jsou definovány v příloze H.2, která začíná na str. 29. Očekává se, že cokoli, co není specifikováno jako měnící se s tímto konkrétním operačním kódem, zůstane stejné. Proměnné, které se mění, jsou specifikovány jako \<něco\>′.

Podívejme se například na operační kód [`ADD`](https://www.evm.codes/#01).

| Hodnota | Mnemotechnika | δ   | α   | Popis                                                     |
| ------: | ------------- | --- | --- | --------------------------------------------------------- |
|    0x01 | ADD           | 2   | 1   | Operace sčítání.                                          |
|         |               |     |     | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[0] + μ<sub>s</sub>[1]_ |

_δ_ je počet hodnot, které vyjmeme ze zásobníku. V tomto případě dvě, protože sčítáme dvě vrchní hodnoty.

_α_ je počet hodnot, které vložíme zpět. V tomto případě jedna, součet.

Takže nový vrchol zásobníku (_μ′<sub>s</sub>[0]_) je součtem starého vrcholu zásobníku (_μ<sub>s</sub>[0]_) a staré hodnoty pod ním (_μ<sub>s</sub>[1]_).

Místo toho, abychom procházeli všechny operační kódy pomocí „seznamu, ze kterého přechází zrak“, tento článek vysvětluje pouze ty operační kódy, které přinášejí něco nového.

| Hodnota | Mnemotechnika | δ   | α   | Popis                                                                                                      |
| ------: | ------------- | --- | --- | ---------------------------------------------------------------------------------------------------------- |
|    0x20 | KECCAK256     | 2   | 1   | Vypočítá hash Keccak-256.                                                                                  |
|         |               |     |     | _μ′<sub>s</sub>[0] ≡ KEC(μ<sub>m</sub>[μ<sub>s</sub>[0] . . . (μ<sub>s</sub>[0] + μ<sub>s</sub>[1] − 1)])_ |
|         |               |     |     | _μ′<sub>i</sub> ≡ M(μ<sub>i</sub>,μ<sub>s</sub>[0],μ<sub>s</sub>[1])_                                      |

Toto je první operační kód, který přistupuje k paměti (v tomto případě pouze pro čtení). Může se však rozšířit za aktuální limity paměti, takže musíme aktualizovat _μ<sub>i</sub>._ Děláme to pomocí funkce _M_ definované v rovnici 328 na str. 29.

| Hodnota | Mnemotechnika | δ   | α   | Popis                             |
| ------: | ------------- | --- | --- | --------------------------------- |
|    0x31 | BALANCE       | 1   | 1   | Získá zůstatek daného účtu.       |
|         |               |     |     | ...                               |

Adresa, jejíž zůstatek potřebujeme zjistit, je _μ<sub>s</sub>[0] mod 2<sup>160</sup>_. Na vrcholu zásobníku je adresa, ale protože adresy mají pouze 160 bitů, počítáme hodnotu [modulo](https://en.wikipedia.org/wiki/Modulo_operation) 2<sup>160</sup>.

Pokud _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] ≠ ∅_, znamená to, že o této adrese existují informace. V tom případě je _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>]<sub>b</sub>_ zůstatek pro tuto adresu. Pokud _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] = ∅_, znamená to, že tato adresa není inicializována a zůstatek je nula. Seznam polí s informacemi o účtu si můžete prohlédnout v sekci 4.1 na str. 4.

Druhá rovnice, _A'<sub>a</sub> ≡ A<sub>a</sub> ∪ \{μ<sub>s</sub>[0] mod 2<sup>160</sup>}_, souvisí s rozdílem v ceně mezi přístupem k teplému úložišti (warm storage – úložiště, ke kterému se nedávno přistupovalo a pravděpodobně je v mezipaměti) a studenému úložišti (cold storage – úložiště, ke kterému se nepřistupovalo a pravděpodobně je v pomalejším úložišti, jehož načtení je dražší). _A<sub>a</sub>_ je seznam adres, ke kterým transakce dříve přistupovala, a proto by k nim měl být přístup levnější, jak je definováno v sekci 6.1 na str. 8. Více si o tomto tématu můžete přečíst v [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929).

| Hodnota | Mnemotechnika | δ   | α   | Popis                                   |
| ------: | ------------- | --- | --- | --------------------------------------- |
|    0x8F | DUP16         | 16  | 17  | Duplikuje 16. položku zásobníku.        |
|         |               |     |     | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[15]_ |

Všimněte si, že abychom mohli použít jakoukoli položku zásobníku, musíme ji vyjmout, což znamená, že musíme vyjmout i všechny položky zásobníku nad ní. V případě [`DUP<n>`](https://www.evm.codes/#8f) a [`SWAP<n>`](https://www.evm.codes/#9f) to znamená nutnost vyjmout a poté vložit až šestnáct hodnot.

## 9.5 Exekuční cyklus {#95-exec-cycle}

Nyní, když máme všechny části, můžeme konečně pochopit, jak je dokumentován exekuční cyklus EVM.

Rovnice (155) říká, že vzhledem ke stavu:

- _σ_ (globální stav blockchainu)
- _μ_ (stav EVM)
- _A_ (podstav, změny, které nastanou po skončení transakce)
- _I_ (exekuční prostředí)

Nový stav je _(σ', μ', A', I')_.

Rovnice (156)-(158) definují zásobník a jeho změnu v důsledku operačního kódu (_μ<sub>s</sub>_). Rovnice (159) je změna gasu (_μ<sub>g</sub>_). Rovnice (160) je změna čítače programu (_μ<sub>pc</sub>_). Nakonec rovnice (161)-(164) specifikují, že ostatní parametry zůstávají stejné, pokud nejsou explicitně změněny operačním kódem.

Tímto je EVM plně definován.

## Závěr {#conclusion}

Matematický zápis je přesný a umožnil yellow paperu specifikovat každý detail Etherea. Má však i některé nevýhody:

- Mohou mu porozumět pouze lidé, což znamená, že [testy shody](https://github.com/ethereum/tests) musí být psány ručně.
- Programátoři rozumí počítačovému kódu.
  Matematickému zápisu rozumět mohou, ale nemusí.

Možná z těchto důvodů jsou novější [specifikace vrstvy konsensu](https://github.com/ethereum/consensus-specs/blob/master/tests/core/pyspec/README.md) napsány v jazyce Python. Existují [specifikace exekuční vrstvy v Pythonu](https://ethereum.github.io/execution-specs), ale nejsou kompletní. Dokud a pokud nebude celý yellow paper také přeložen do Pythonu nebo podobného jazyka, bude yellow paper i nadále sloužit a je užitečné umět jej číst.