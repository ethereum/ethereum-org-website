---
title: "Analiza contractului Uniswap-v2"
description: Cum funcționează contractul Uniswap-v2? De ce este scris în acest fel?
author: Ori Pomerantz
tags:
  - "solidity"
skill: intermediate
published: 2021-05-01
lang: ro
---

## Introducere {#introduction}

[Uniswap v2](https://uniswap.org/whitepaper.pdf) poate crea o piață de schimb între oricare două tokenuri ERC-20. În acest articol vom trece în revistă codul sursă al contractelor care implementează acest protocol și vom vedea de ce sunt scrise în acest fel.

### Ce anume face Uniswap? {#what-does-uniswap-do}

În principiu, există două tipuri de utilizatori: furnizorii de lichidităţi și comercianții.

_Furnizorii de lichidităţi_ pun la dispoziția fondului comun cele două tokenuri care pot fi schimbate (le vom numi **Token0** și **Token1**). În schimb, aceștia primesc un al treilea token, ce reprezintă o parte din proprietatea asupra fondului comun și este numit _token de lichidităţi_.

_Comercianții_ trimit un tip de token la fondul comun și îl primesc pe celălalt (de exemplu, trimit **Token0** și primesc **Token1**) din fondul comun pus la dispoziție de furnizorii de lichidităţi. Cursul de schimb este determinat de numărul relativ de **Token0 **și **Token1** care există în fondul comun. În plus, fondul încasează un mic procent ca recompensă pentru fondul comun de lichiditate.

Când furnizorii de lichidităţi își vor înapoi activele, aceștia pot arde tokenurile fondului comun și îşi pot primi înapoi tokenurile, inclusiv partea lor de recompense.

[Faceți clic aici pentru a vedea o descriere completă](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/).

### De ce v2? De ce nu v3? {#why-v2}

În momentul în care scriu această prezentare, [Uniswap v3](https://uniswap.org/whitepaper-v3.pdf) este aproape gata. Pe de altă parte, este o actualizare mult mai complicată decât originalul. Este mult mai ușor să învățați v2 și apoi să treceți la v3.

### Contracte centrale faţă de contracte periferice {#contract-types}

Uniswap v2 este divizat în două componente, una centrală și una periferică. Această diviziune permite contractelor centrale, care dețin activele și ca urmare _trebuie_ să fie sigure, să fie mai simple și mai ușor de auditat. Toate celelalte funcționalități suplimentare cerute de comercianți pot fi atunci furnizate de contractele periferice.

## Fluxurile de date și de control {#flows}

Acesta este fluxul de date și de control ce are loc atunci când efectuați cele trei acțiuni principale ale Uniswap:

1. Efectuarea de operațiuni de schimb între diferite tokenuri
2. Adăugarea de lichidităţi pe piață și primirea de recompense prin schimbul perechilor de tokenuri de lichidităţi ERC-20
3. Arderea de tokenuri de lichidităţi ERC-20 și primirea înapoi a tokenurilor ERC-20 pe care îl permite comercianţilor schimbul în pereche

### Schimburile {#swap-flow}

Acesta este cel mai obișnuit flux folosit de comercianți:

#### Apelantul {#caller}

1. Furnizează o alocație contului periferic de valoare egală cu cea care trebuie schimbată.
2. Apelează una dintre numeroasele funcții de schimb ale contractului periferic (care depinde fie de faptul că implică ETH sau nu, fie de specificarea de către comerciant a numărului de tokenuri de depus sau de luat înapoi etc.). Orice funcție de schimb acceptă o „cale” `path`, o matrice de schimburi prin care să treacă.

#### În contractul periferic (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02-sol}

3. Identifică suma care trebuie tranzacționată la fiecare schimb de-a lungul căii.
4. Se repetă de-a lungul căii. Pentru fiecare schimb de pe parcurs, trimite tokenul introdus și apoi apelează funcția `swap` a schimbului. În cele mai multe cazuri, adresa de destinație pentru tokenuri este următorul schimb în pereche de pe cale. La schimbul final, aceasta este adresa furnizată de comerciant.

#### În contractul central (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

5. Verifică să nu se fraudeze contractul central și dacă acesta poate menține suficiente lichidităţi după efectuarea schimbului.
6. Vede câte tokenuri suplimentare avem în plus față de rezervele cunoscute. Această valoare reprezintă numărul de tokenuri introduse pe care le-am primit pentru schimb.
7. Trimite tokenurile rezultate la destinație.
8. Apelează `_update` pentru a actualiza cantitatea de rezervă

#### Înapoi în contractul periferic (UniswapV2Router02.sol) {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. Efectuează orice activitate de curățire este necesară (de exemplu, arde tokenurile WETH pentru a primi înapoi ETH, pe care să îl trimită comerciantului)

### Adăugarea de lichidități {#add-liquidity-flow}

#### Apelantul {#caller-2}

1. Furnizează contului periferic o alocație egală cu sumele care trebuie adăugate la fondul comun de lichidităţi.
2. Apelează una din funcțiile contractului periferic, și anume „addLiquidity”.

#### În contractul periferic (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-2}

3. Creează un nou schimb în pereche dacă este necesar
4. Dacă un astfel de schimb în pereche există deja, calculează suma de tokenuri de adăugat. Deoarece se presupune că valorile ambelor tokenuri sunt identice, se va adăuga aceeaşi proporţie de tokenuri la cele existente.
5. Verifică dacă sumele sunt rezonabile (apelanții pot specifica suma minimă sub care nu sunt dispuși să adauge lichidități)
6. Apelează contractul central.

#### În contractul central (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

7. Emite tokenurile de lichidităţi și le trimite către apelant
8. Apelează `_update` pentru a actualiza cantitatea de rezervă

### Eliminarea de lichidități {#remove-liquidity-flow}

#### Apelantul {#caller-3}

1. Furnizează contului periferic o alocație de tokenuri de lichidităţi care trebuie arse în schimbul tokenurilor preexistente.
2. Apelează una din funcțiile contractului periferic, și anume „removeLiquidity”.

#### În contractul periferic (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-3}

3. Trimite tokenurile de lichidităţi la schimbul în pereche

#### În contractul central (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-3}

4. Trimite la adresa de destinație tokenurile preexistente corespunzătoare, proporțional cu jetoanele arse. De exemplu, dacă în fondul comun există 1000 de tokenuri A, 500 de tokenuri B și 90 de tokenuri de llichidităţi și primim 9 tokenuri de lichidităţi pentru a fi arse, ardem 10% din tokenurile de lichidităţi și trimitem înapoi utilizatorului 100 de tokenuri A și 50 de tokenuri B.
5. Arde tokenurile de lichidităţi
6. Apelează `_update` pentru a actualiza cantitatea de rezervă

## Contractele centrale {#core-contracts}

Acestea sunt contractele securizate care dețin lichidități.

### UniswapV2Pair.sol {#UniswapV2Pair}

[Acest contract](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol) implementează fondul comun propriu-zis care face schimbul de tokenuri. Aceasta este funcționalitatea centrală a Uniswap.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Pair.sol';
import './UniswapV2ERC20.sol';
import './libraries/Math.sol';
import './libraries/UQ112x112.sol';
import './interfaces/IERC20.sol';
import './interfaces/IUniswapV2Factory.sol';
import './interfaces/IUniswapV2Callee.sol';
```

Toate acestea sunt interfețele despre care contractul trebuie să știe, fie deoarece sunt implementate de contract (`IUniswapV2Pair` și `UniswapV2ERC20`), fie pentru că apelează la contracte care le implementează.

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

Acest contract moștenește de la `UniswapV2ERC20`, care furnizează funcțiile ERC-20 pentru tokenurile de lichidităţi.

```solidity
    using SafeMath  for uint;
```

Biblioteca [SafeMath library](https://docs.openzeppelin.com/contracts/2.x/api/math) este folosită pentru depășiri și subdepășiri. Este important deoarece altfel am putea să ajungem la o situație în care o valoare ar trebui să fie `-1`, în schimb ea este `2^256-1`.

```solidity
    using UQ112x112 for uint224;
```

O mulțime de calcule din cadrul contractului fondului de lichidităţi necesită fracții. Însă EVM nu acceptă fracțiile. Soluția pe care a găsit-o Uniswap a fost utilizarea de valori de 224 de biţi, cu 112 de biţi pentru partea întreagă și 112 de biţi pentru fracție. Astfel, `1.0` este reprezentat ca `2^112`, `1.5` este reprezentat ca `2^112 + 2^111` etc.

Mai multe detalii despre această bibliotecă sunt disponibile [mai departe în acest document](#FixedPoint).

#### Variabile {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

Pentru a se evita cazuri de împărțire la zero, există întotdeauna un minimum de tokenuri de lichidităţi (al căror proprietar este contul zero). Acest număr este **MINIMUM_LIQUIDITY**, o mie.

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

Acesta este selectorul ABI pentru funcția de transfer a ERC-20. Este folosit pentru transferul de tokenuri ERC-20 în cele două conturi de tokenuri.

```solidity
    address public factory;
```

Acesta este contractul fabrică, cel care a creat acest fond comun. Fiecare fond comun este un schimb între două tokenuri ERC-20, iar fabrica este punctul central care unește toate aceste fonduri comune.

```solidity
    address public token0;
    address public token1;
```

Acestea sunt adresele contractelor pentru cele două tipuri de tokenuri ERC-20 care pot fi schimbate prin fondul comun.

```solidity
    uint112 private reserve0;           // uses single storage slot, accessible via getReserves
    uint112 private reserve1;           // uses single storage slot, accessible via getReserves
```

Iar acestea sunt rezervele pe care le are fondul comun pentru fiecare tip de token. Presupunem că cele două rezerve reprezintă cantitativ aceeași valoare, prin urmare „token0” valorează „reserve1/reserve0” a „token1”.

```solidity
    uint32  private blockTimestampLast; // uses single storage slot, accessible via getReserves
```

Aici avem marca temporală a ultimului bloc în care a avut loc un schimb și care este folosită pentru a urmări evoluţia ratelor de schimb în timp.

Una dintre cele mai mari cheltuieli de gaz în contractele Ethereum este stocarea, care persistă de la un apel al contractului la următorul. Fiecare celulă de stocare are o lungime de 256 de biţi. So three variables, reserve0, reserve1, and blockTimestampLast, are allocated in such a way a single storage value can include all three of them (112+112+32=256).

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

Aceste variabile dețin costurile cumulative ale fiecărui token (fiecare prin raportare la celălalt). They can be used to calculate the average exchange rate over a period of time.

```solidity
    uint public kLast; // reserve0 * reserve1, as of immediately after the most recent liquidity event
```

Modul în care schimbul în pereche stabilește cursul de schimb între „token0” și „token1” este de a menține multiplul dintre cele două rezerve constant în timpul tranzacțiilor. `kLast` este această valoare. Acesta se modifică atunci când un furnizor de lichidități depune sau retrage tokenuri și crește ușor datorită unui comision de piață de 0,3%.

Aici avem un exemplu simplu. Observați că, din motive de simplitate, tabloul are numai trei zecimale după virgulă și nu ținem cont de comisionul de tranzacționare de 0,3%, de aceea valorile nu sunt exacte.

| Eveniment                                             |  reserve0 |  reserve1 | reserve0 \* reserve1 | Curs mediu de schimb (token1 / token0) |
| ----------------------------------------------------- | --------: | --------: | -------------------: | -------------------------------------- |
| Situaţia inițială                                     | 1.000,000 | 1.000,000 |            1.000.000 |                                        |
| Comerciantul A schimbă 50 de token0 pe 47,619 token1  | 1.050,000 |   952,381 |            1.000.000 | 0,952                                  |
| Comerciantul B schimbă 10 token0 pentru 8,984 token1  | 1.060,000 |   943,396 |            1.000.000 | 0,898                                  |
| Comerciantul C schimbă 40 de token0 pe 34,305 token1  | 1.100,000 |   909,090 |            1.000.000 | 0,858                                  |
| Comerciantul D schimbă 100 de token1 pe 109,01 token0 |   990,990 | 1.009,090 |            1.000.000 | 0,917                                  |
| Comerciantul E schimbă 10 token0 pe 10,079 token1     | 1.000,990 |   999,010 |            1.000.000 | 1,008                                  |

Pe măsură ce comercianții furnizează mai multe „token0”, valoarea relativă a „token1” crește și viceversa, în funcție de ofertă și cerere.

#### Blocarea {#pair-lock}

```solidity
    uint private unlocked = 1;
```

Există o clasă de vulnerabilități de securitate care se bazează pe [reentrancy abuse](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14) (abuzul de reintrare). Uniswap are nevoie să transfere jetoane ERC-20 în mod arbitrar, adică prin apelarea contractelor ERC-20, care pot încerca să abuzeze de piața Uniswap care le apelează. Având o variabilă `unlocked` ce face parte din contract, putem evita ca funcțiile să fie apelate în timp ce sunt executate (în cadrul aceleiași tranzacții).

```solidity
    modifier lock() {
```

Această funcție este un [modificator](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers), o funcție care se înfășoară în jurul unei funcții normale pentru a-i schimba comportamentul într-un anumit fel.

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

Dacă variabila `unlocked` este egală cu unu, setați-o la zero. Dacă aceasta este deja zero, întoarceți apelul, faceți-l să eșueze.

```solidity
        _;
```

Într-un modificator `_;` este apelul funcției originale (cu toți parametrii). Aici înseamnă că apelul funcției are loc numai dacă `unlocked` avea valoarea unu când a fost apelată, iar în timp ce se execută valoarea `unlocked` este zero.

```solidity
        unlocked = 1;
    }
```

După revenirea funcției principale, eliberați blocajul.

#### Diverse funcții {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

Această funcție informează apelanții care este starea actuală a schimbului. Observați că funcțiile Solidity [pot răspunde prin mai multe valori](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values).

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

Această funcție internă transferă o sumă de tokenuri ERC20 din schimb altcuiva. `SELECTOR` specifies that the function we are calling is `transfer(address,uint)` (see definition above).

Pentru a evita importul unei interfețe pentru funcția „token”, vom crea „manual” apelul folosind una dintre [funcțiile ABI](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions).

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

Există două modalități prin care un apel de transfer ERC-20 poate raporta un eșec:

1. Revenirea. If a call to an external contract reverts, then the boolean return value is `false`
2. Se termină normal, dar raportează un eșec. În cazul acesta, bufferul valorii de retur are o lungime diferită de zero, iar când este decodat ca valoare booleană este `false`

Dacă apar oricare dintre aceste condiții, reveniți.

#### Evenimente {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

Aceste două evenimente sunt emise atunci când un furnizor de lichidități fie depune lichidităţi (`Mint`), fie le retrage (`Burn`). În oricare din cazuri, sumele de token0 și token1 care sunt depuse sau retrase fac parte din eveniment, precum și identitatea contului care ne-a apelat (`sender`). În cazul unei retrageri, evenimentul include și ținta care a primit tokenurile (`to`), care poate să nu fie aceeași cu expeditorul.

```solidity
    event Swap(
        address indexed sender,
        uint amount0In,
        uint amount1In,
        uint amount0Out,
        uint amount1Out,
        address indexed to
    );
```

Acest eveniment este emis atunci când un comerciant schimbă un token pe un altul. Repet, expeditorul și destinatarul pot să nu fie aceiași. Fiecare token poate fi ori trimis la schimb, ori primit prin acesta.

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

În final, funcția `Sync` este emisă de fiecare dată când se depun sau se retrag tokenuri, indiferent de motiv, pentru a furniza cea mai recentă informație despre rezervă (și implicit cursul de schimb).

#### Funcțiile de configurare {#pair-setup}

Se presupune că aceste funcții vor fi apelate o singură dată, atunci când se creează un nou schimb în pereche.

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

Constructorul se asigură că vom păstra evidența adresei fabricii care a creat perechea. Această informație este necesară pentru inițializare `initialize` și pentru taxa de fabrică (dacă există vreuna)

```solidity
    // called once by the factory at time of deployment
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // sufficient check
        token0 = _token0;
        token1 = _token1;
    }
```

Această funcție permite fabricii (și numai fabricii) să specifice cele două tokenuri ERC-20 pe care le va schimba acestă pereche.

#### Funcții interne de actualizare {#pair-update-internal}

##### \_update

```solidity
    // update reserves and, on the first call per block, price accumulators
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

Această funcție este apelată de fiecare dată când sunt depozitate sau retrase tokenurile.

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

If either balance0 or balance1 (uint256) is higher than uint112(-1) (=2^112-1) (so it overflows & wraps back to 0 when converted to uint112) refuse to continue the \_update to prevent overflows. With a normal token that can be subdivided into 10^18 units, this means each exchange is limited to about 5.1\*10^15 of each tokens. Până acum, aceasta nu a fost o problemă.

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // overflow is desired
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

Dacă timpul scurs nu este zero, înseamnă că suntem prima tranzacție de schimb din acest bloc. În acest caz, trebuie să actualizăm acumulatorii de costuri.

```solidity
            // * never overflows, and + overflow is desired
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

Fiecare acumulator de costuri este actualizat cu cel mai recent cost (rezerva celuilalt token/rezerva acestui token) înmulțit cu timpul scurs în secunde. Pentru a obține un preț mediu, citiți prețul cumulat la două momente și împărțiți la diferența de timp dintre ele. De exemplu, să presupunem această succesiune de evenimente:

| Eveniment                                                          |  reserve0 |  reserve1 | marcă temporală | Cursul de schimb marginal (reserve1 / reserve0) |       price0CumulativeLast |
| ------------------------------------------------------------------ | --------: | --------: | --------------- | ----------------------------------------------: | -------------------------: |
| Situaţia inițială                                                  | 1.000,000 | 1.000,000 | 5.000           |                                           1,000 |                          0 |
| Comerciantul A depune 50 de token0 și obține 47,619 token1 înapoi  | 1.050,000 |   952,381 | 5.020           |                                           0,907 |                         20 |
| Comerciantul B depune 10 token0 și obține 8,984 token1 înapoi      | 1.060,000 |   943,396 | 5.030           |                                           0,890 |       20+10\*0,907 = 29,07 |
| Comerciantul C depune 40 de token0 și obține 34,305 token1 înapoi  | 1.100,000 |   909,090 | 5.100           |                                           0,826 |    29,07+70\*0,890 = 91,37 |
| Comerciantul D depune 100 de token1 și obține 109,01 token0 înapoi |   990,990 | 1.009,090 | 5.110           |                                           1,018 |    91,37+10\*0,826 = 99,63 |
| Comerciantul E depune 10 token0 și obține 10,079 token1 înapoi     | 1.000,990 |   999,010 | 5.150           |                                           0,998 | 99,63+40\*1,1018 = 143,702 |

Să spunem că vrem să calculăm prețul mediu al **Token0** între mărcile temporale 5.030 și 5.150. Diferența de valoare dintre `price0Cumulative` este 143,702-29,07=114,632. Aceasta este media pe două minute (120 de secunde). Așa că prețul mediu este 114,632/120 = 0,955.

Acest calcul de preț este motivul pentru care trebuie să cunoaștem mărimea vechilor rezerve.

```solidity
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }
```

În sfârșit, actualizează variabilele globale și emite un eveniment `Sync`.

##### \_mintFee

```solidity
    // if fee is on, mint liquidity equivalent to 1/6th of the growth in sqrt(k)
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

În Uniswap 2.0, comercianții plătesc o taxă de 0,30% pentru a utiliza piața. Cea mai mare parte a acestei taxe (0,25% din tranzacție) ajunge totdeauna la furnizorii de lichidități. Restul de 0,05% poate ajunge fie la furnizorii de lichidități, fie la o adresă specificată de fabrică drept taxă de protocol, care plătește Uniswap pentru munca de dezvoltare.

Pentru reducerea calculelor (și prin urmare a costurilor de gaz), această taxă este calculată doar când lichidităţile sunt adăugate sau scoase din fondul comun, și nu la fiecare tranzacție.

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

Citește adresa de destinație a fabricii. Dacă este zero, atunci nu există nicio taxă de protocol și nu este nevoie să se calculeze această taxă.

```solidity
        uint _kLast = kLast; // gas savings
```

Variabila de stare `kLast` se află în memorie și de aceea va avea o valoare între diferite apeluri la contract. Accesul la memorie este cu mult mai scump decât accesul la memoria volatilă eliberată când se termină apelul funcției la contract, de aceea vom utiliza o variabilă internă pentru a economisi gaz.

```solidity
        if (feeOn) {
            if (_kLast != 0) {
```

Furnizorii de lichidităţi își obțin partea lor prin simpla apreciere a tokenurilor lor de lichidităţi. Însă taxa de protocol necesită emiterea de noi tokenuri de lichidităţi și furnizarea acestora la adresa `feeTo`.

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
```

În cazul în care există noi lichidități pentru care să colecteze o taxă de protocol. Puteți vedea funcția „sqrt” (rădăcină pătrată) [mai departe în acest articol](#Math)

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

Acest calcul complicat de taxe este explicat în [Whitepaper](https://uniswap.org/whitepaper.pdf), la pagina 5. Știm că între momentul în care a fost calculat `kLast` și momentul actual nu s-au adăugat sau retras lichidităţi (pentru că acest calcul se execută de fiecare dată când sunt adăugate sau retrase lichidități, înainte ca acesta să se modifice efectiv), așa că orice schimbare în `reserve0 * reserve1` trebuie că provine din taxele de tranzacții (fără de care `reserve0 * reserve1` ar rămâne constantă).

```solidity
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
```

Folosește funcția `UniswapV2ERC20._mint` pentru a crea efectiv tokenurile de lichidităţi suplimentare și pentru a le atribui la `feeTo`.

```solidity
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }
```

În caz că nu există nicio taxă, setează `kLast` la zero (dacă nu este deja setat astfel). Când a fost scris acest contract, exista o [funcție de rambursare a gazului](https://eips.ethereum.org/EIPS/eip-3298) care încuraja contractele să reducă dimensiunea totală a stării Ethereum, prin reducerea la zero a stocării de care nu aveau nevoie. Acest cod obține această rambursare atunci când este posibil.

#### Funcții accesibile din exterior {#pair-external}

Rețineți că, deși orice tranzacție sau contract _poate_ să apeleze aceste funcții, ele au fost proiectate să fie apelate din contractul periferic. Dacă le apelați direct, nu veți putea frauda schimbul în pereche, dar s-ar putea să pierdeți din valoare din cauza unei greșeli.

##### „mint”

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function mint(address to) external lock returns (uint liquidity) {
```

Această funcție este apelată atunci când un furnizor de lichidităţi adaugă lichidități într-un fond comun. Aceasta emite tokenuri de lichidităţi suplimentare ca recompensă. Ar trebui să fie apelată dintr-[un contract de periferie](#UniswapV2Router02) care să o apeleze după adăugarea lichidităților în cadrul aceleiași tranzacții (astfel încât nimeni să nu poată trimite o tranzacție care să revendice noua lichiditate înaintea proprietarului legitim).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
```

Acesta este modul în care citim rezultatele unei funcții Solidity care răspund prin mai multe valori. Eliminăm ultima valoare de răspuns, marca temporală a blocului, deoarece nu avem nevoie de aceasta.

```solidity
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);
```

Obține soldurile curente și vede cât s-a adăugat din fiecare tip de token.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
```

Calculează taxele de protocol care trebuie colectate, dacă este cazul, și emite tokenurile de lichidităţi în consecință. Deoarece parametrii pentru `_mintFee` sunt vechile valori ale rezervei, taxa este calculată cu exactitate numai pe baza schimbărilor din fondul comun datorate taxelor.

```solidity
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // permanently lock the first MINIMUM_LIQUIDITY tokens
```

Dacă acesta este prima depunere, creează jetoanele `MINIMUM_LIQUIDITY` și le trimite la adresa zero pentru a fi blocate. Acestea nu pot fi niciodată revendicate, adică fondul de lichidităţi nu va fi golit complet niciodată (ceea ce ne va salva de împărțirea la zero în anumite locuri). Valoarea `MINIMUM_LIQUIDITY` este de o mie de tokenuri, iar având în vedere că majoritatea tokenurilor ERC-20 sunt subdivizate în 10^-18 unități, așa cum ETH este divizat în wei, valoarea unui singur astfel de token poate fi divizată în 10^-15 unități. Costurile nu sunt mari.

În momentul primei depuneri, nu cunoaștem valoarea relativă a celor două tokenuri, de aceea înmulțim cele două sume și scoatem rădăcina lor pătrată, presupunând că depozitul ne va oferi o valoare egală din ambele tokenuri.

Putem avea încredere în acest lucru, deoarece este în interesul deponentului să ofere o valoare egală, pentru a evita pierderea de valoare în urma arbitrajului. Să presupunem că valoarea celor două tokenuri este identică, dar deponentul nostru a depus de 4 ori mai multe **Token1** decât **Token0**. Un comerciant poate utiliza faptul că un schimb în pereche consideră că **Token0** este mai preţios pentru a extrage valoare din el.

| Eveniment                                                            | reserve0 | reserve1 | reserve0 \* reserve1 | Valoarea fondului comun (reserve0 + reserve1) |
| -------------------------------------------------------------------- | -------: | -------: | -------------------: | --------------------------------------------: |
| Situaţia inițială                                                    |        8 |       32 |                  256 |                                            40 |
| Comerciantul depozitează 8 **Token0**, primește înapoi 16 **Token1** |       16 |       16 |                  256 |                                            32 |

După cum puteți vedea, comerciantul câștigă 8 tokenuri suplimentare, care provin dintr-o reducere a valorii fondului comun, aducând pagube deponentului care le deține.

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

Cu fiecare depunere ulterioară, cunoaștem deja rata de schimb dintre cele două active și ne așteptăm ca furnizorii de lichidităţi să ne ofere o valoare egală în ambele. Dacă nu o fac, le dăm tokenuri de lichidităţi calculate în funcție de valoarea cea mai mică pe care au oferit-o, ca pedeapsă.

Fie că este vorba de depunerea inițială sau de una ulterioară, numărul de tokenuri de lichidităţi pe care le oferim este egal cu rădăcina pătrată a modificării în `reserve0*reserve1`, iar valoarea tokenului de lichidităţi nu se modifică (în afara cazului când primim un depozit care nu are valori egale pentru ambele tipuri, caz în care „amenda” este distribuită). Iată un alt exemplu cu două tokenuri care au aceeași valoare, cu trei depuneri bune și una rea (depunerea unui singur tip de token deci nu produce niciun token de lichidităţi).

| Eveniment                    | reserve0 | reserve1 | reserve0 \* reserve1 | Valoarea fondului comun (reserve0 + reserve1) | Tokenuri de lichidităţi emise pentru acest depozit | Total tokenuri de lichidităţi | valoarea fiecărui token de lichidităţi |
| ---------------------------- | -------: | -------: | -------------------: | --------------------------------------------: | -------------------------------------------------: | ----------------------------: | -------------------------------------: |
| Situaţia inițială            |    8,000 |    8,000 |                   64 |                                        16,000 |                                                  8 |                             8 |                                  2,000 |
| Depune patru din fiecare tip |   12,000 |   12,000 |                  144 |                                        24,000 |                                                  4 |                            12 |                                  2,000 |
| Depune două din fiecare tip  |   14,000 |   14,000 |                  196 |                                        28,000 |                                                  2 |                            14 |                                  2,000 |
| Depozit de valoare inegală   |   18,000 |   14,000 |                  252 |                                        32,000 |                                                  0 |                            14 |                                 ~2,286 |
| După arbitraj                |  ~15,874 |  ~15,874 |                  252 |                                       ~31,748 |                                                  0 |                            14 |                                 ~2,267 |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

Folosește funcția `UniswapV2ERC20._mint` ca să creeze efectiv tokenurile de lichidităţi suplimentare și le distribuie în contul corect.

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date
        emit Mint(msg.sender, amount0, amount1);
    }
```

Actualizează variabilele de stare (`reserve0`, `reserve1` și de asemenea `kLast`) dacă este necesar, și emite evenimentul corespunzător.

##### „burn”

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

Această funcție este apelată atunci când se retrag lichidităţi, iar tokenurile de lichidităţi corespunzătoare trebuie să fie arse. De asemenea, ar trebui să fie apelată [dintr-un contract periferic](#UniswapV2Router02).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
        address _token0 = token0;                                // gas savings
        address _token1 = token1;                                // gas savings
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

Contractul periferic a transferat lichidităţile care trebuie arse în acest contract înainte de apel. În acest fel, știm câte lichidităţi rebuie să ardem și ne putem asigura că vor fi arse.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        amount0 = liquidity.mul(balance0) / _totalSupply; // using balances ensures pro-rata distribution
        amount1 = liquidity.mul(balance1) / _totalSupply; // using balances ensures pro-rata distribution
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
```

Furnizorul de lichidităţi primește o valoare egală din ambele tokenuri. În acest fel nu modificăm rata de schimb.

```solidity
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date
        emit Burn(msg.sender, amount0, amount1, to);
    }

```

Restul funcției `burn` este o imagine în oglindă a funcției `mint` de mai sus.

##### „swap”

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

Această funcție se presupune şi că trebuie să fie apelată de la [un contract periferic](#UniswapV2Router02).

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // scope for _token{0,1}, avoids stack too deep errors
```

Variabilele locale pot fi stocate în memorie sau, dacă nu sunt prea multe, direct pe stivă. Dacă putem limita numărul lor pentru a folosi stiva, folosim mai puțin gaz. Pentru mai multe detalii, a se vedea [cartea galbenă, specificațiile formale Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf), pag. 26, ecuația 298.

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // optimistically transfer tokens
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // optimistically transfer tokens
```

Acest transfer este optimist, deoarece transferăm înainte de a fi siguri că toate condițiile sunt îndeplinite. În Ethereum acest lucru este în regulă, deoarece, dacă aceste condiții nu sunt îndeplinite mai târziu în apel, atunci ne retragem din apel şi din modificările create de acesta.

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

Informează destinatarul despre swap dacă i se solicită.

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

Obține soldurile curente. Contractul periferic ne trimite tokenurile înainte de a ne apela pentru swap. Aceasta facilitează verificarea de către contract dacă nu a fost fraudat, verificare ce _trebuie_ să aibă loc în contractul central (pentru că putem fi apelați de alte entități decât contractul nostru periferic).

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // scope for reserve{0,1}Adjusted, avoids stack too deep errors
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

Acesta este un control al sănătăţii, pentru a ne asigura că nu pierdem în urma swap-ului. Sub nicio formă swap-ul nu ar trebui să reducă `reserve0*reserve1`. This is also where we ensure a fee of 0.3% is being sent on the swap; before sanity checking the value of K, we multiply both balances by 1000 subtracted by the amounts multiplied by 3, this means 0.3% (3/1000 = 0.003 = 0.3%) is being deducted from the balance before comparing its K value with the current reserves K value.

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

Actualizează `reserve0` și `reserve1`, iar dacă este necesar acumulatorii de preț și marca temporală, apoi emite un eveniment.

##### Sync or Skim

Este posibil ca soldurile reale să fie desincronizate de rezervele pe care crede că le are schimbul în pereche. Nu există nicio posibilitate de a retrage tokenuri fără aprobarea contractului, însă depozitele sunt o cu totul altă problemă. Un cont poate transfera tokenuri către schimb fără să apeleze nici la `mint`, nici la `swap`.

În acest caz, există două soluții:

- `sync`, actualizarea rezervelor la soldurile curente
- `skim`, retragerea sumei suplimentare. Rețineți că orice cont poate apela `skim`, deoarece nu știm cine a depus tokenurile. Această informație este emisă într-un eveniment, dar evenimentele nu sunt accesibile din blockchain.

```solidity
    // force balances to match reserves
    function skim(address to) external lock {
        address _token0 = token0; // gas savings
        address _token1 = token1; // gas savings
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }



    // force reserves to match balances
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
}
```

### UniswapV2Factory.sol {#UniswapV2Factory}

[Acest contract](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol) creează schimbul în pereche.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToSetter;
```

Aceste variabile de stare sunt necesare pentru implementarea taxei de protocol, (a se vedea [cartea albă](https://uniswap.org/whitepaper.pdf), pag. 5). Adresa` feeTo` acumulează tokenurile de lichidităţi pentru taxa de protocol, iar adresa `feeToSetter` este adresa care permite schimbarea `feeTo` la o adresă diferită.

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

Aceste variabile țin evidența perechilor, și anume a schimburilor dintre cele două tipuri de tokenuri.

Prima, `getPair`, este o mapare care identifică un contract de schimb în perechi, bazată pe cele două tokenuri ERC-20 pe care le schimbă. Tokenurile ERC-20 sunt identificate prin adresele contractelor care le implementează, așadar cheile și valoarea sunt toate adrese. Pentru a obține adresa schimbului în pereche care vă permite să convertiți din `tokenA` în `tokenB`, utilizați `getPair[<tokenA address>][<tokenB address>]` (sau viceversa).

A doua variabilă, `allPairs`, este o matrice care include toate adresele schimbului în pereche create de această fabrică. În Ethereum, nu este posibilă iterarea peste conținutul unei mapări, sau obținerea unei liste cu toate cheile, deci această variabilă este singura modalitate de a afla ce schimburi gestionează această fabrică.

Observaţie: Motivul pentru care nu puteți itera peste toate cheile unei mapări este acela că stocarea datelor contractului este _costisitoare_, de aceea, cu cât utilizăm mai puţin din ea, cu atât mai bine și cu cât o modificăm mai rar, cu atât mai bine. Puteți să creați [mapări care suportăacceptă iterația](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol), dar acestea necesită stocarea suplimentară a unei liste de chei. În majoritatea aplicațiilor nu aveți nevoie de aceasta.

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

Acest eveniment este emis atunci când se creează un nou schimb în pereche. Acesta include adresa tokenurilor, adresa schimbului în pereche și numărul total de schimburi gestionate de fabrică.

```solidity
    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }
```

Singurul lucru pe care îl face constructorul este să specifice `feeToSetter`. Fabricile încep fără taxă și numai `feeToSetter` poate să schimbe acest lucru.

```solidity
    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
```

Această funcție răspunde prin numărul de perechi de schimb.

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

Aceasta este funcția principală a fabricii, să creeze un schimb în pereche între două tokenuri ERC-20. Rețineți că oricine poate apela acestă funcție. Nu aveți nevoie de autorizația Uniswap pentru a crea un nou schimb în pereche.

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

Vrem ca adresa noului schimb să fie deterministă, încât să poată fi calculată în avans off-chain (acest lucrul poate fi util pentru [tranzacțiile de nivel 2](/developers/docs/scaling/)). Pentru a face aceasta, avem nevoie de o ordine consecventă a adreselor tokenurilor, indiferent de ordinea în care le-am primit, de aceea le sortăm aici.

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // single check is sufficient
```

Fondurile comune de lichidități mai mari sunt mai bune decât cele mici, pentru că au prețuri mai stabile. Nu dorim să avem mai mult de un singur fond comun de lichidități pe fiecare pereche de tokenuri. Dacă un schimb există deja, nu este nevoie să creați un altul pentru aceeași pereche.

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

Pentru a crea un nou contract, avem nevoie de codul care îl creează (atât funcția constructorului, cât și codul care scrie în memorie bytecode-ul EVM al contractului real). În mod normal, în Solidity, folosim numai `addr = new <name of contract>(<constructor parameters>)`, iar compilatorul se ocupă de toate în locul nostru, dar pentru a avea o adresă de contract deterministă, trebuie să folosim [opcode-ul CREATE2](https://eips.ethereum.org/EIPS/eip-1014). Când a fost scris acest cod, opcode-ul nu era încă acceptat de Solidity, de aceea era necesar să se obțină manual codul. Această problemă nu mai există, deoarece [Solidity acceptă acum CREATE2](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2).

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

Atunci când un opcode nu este încă acceptat de Solidity, îl putem apela folosind [inline assembly](https://docs.soliditylang.org/en/v0.8.3/assembly.html).

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

Apelează funcția `initialize` pentru a indica noului schimb care anume sunt cele două tokenuri pe care le schimbă.

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // populate mapping in the reverse direction
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }
```

Salvează noua pereche de informații în variabilele de stare, și emite un eveniment pentru a informa lumea despre noul schimb în pereche.

```solidity
    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeToSetter = _feeToSetter;
    }
}
```

Aceste două funcții permit `feeToSetter` să controleze destinatarul taxei (în caz că există vreunul) și să schimbe `feeToSetter` la o nouă adresă.

### UniswapV2ERC20.sol {#UniswapV2ERC20}

[Acest contract](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol) implementează tokenul de lichidităţi ERC-20. Este similar cu [contractul OpenWhisk ERC-20](/developers/tutorials/erc20-annotated-code), așa că voi explica numai partea care este diferită, funcționalitatea `permit`.

Tranzacțiile pe Ethereum costă ether (ETH), care este echivalent cu banii reali. Dacă aveți tokenuri ERC-20, şi nu ETH, nu puteți trimite tranzacții, deci nu puteți face nimic cu ele. O soluție pentru a evita această problemă constă în [meta-tranzacții](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions). Proprietarul tokenurilor semnează o tranzacție care permite altcuiva să retragă jetoanele din lanț și să le trimită prin internet destinatarului. Destinatarul, care posedă ETH, transmite apoi autorizația în numele proprietarului.

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

Acest hash este [identificatorul pentru tipul de tranzacție](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash). Singurul pe care îl acceptăm aici este `Permit` cu acești parametri.

```solidity
    mapping(address => uint) public nonces;
```

Nu este posibilă falsificarea unei semnături digitale de către un destinatar. Totuși, este banală trimiterea unei tranzacții de două ori (este o formă de [atac prin reluare](https://wikipedia.org/wiki/Replay_attack) „replay attack”). Pentru a preveni aceasta, folosim un [nonce](https://wikipedia.org/wiki/Cryptographic_nonce). Dacă nonce-ul unui nou `Permit` nu este mai mare cu unu decât ultimul folosit, presupunem că acesta este nevalid.

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

Acesta este codul pentru a recupera [identificatorul lanțului](https://chainid.network/). Folosește un dialect de asamblare EVM numit [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html). Rețineți că în versiunea curentă a Yul trebuie să folosiți `chainid()`, și nu `chainid`.

```solidity
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'),
                keccak256(bytes(name)),
                keccak256(bytes('1')),
                chainId,
                address(this)
            )
        );
    }
```

Calculează [separatorul de domeniu](https://eips.ethereum.org/EIPS/eip-712#rationale-for-domainseparator) pentru EIP-712.

```solidity
    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
```

Aceasta este funcția care implementează permisiunile. Ea primește ca parametri câmpurile relevante și cele trei valori scalare pentru [semnătură](https://yos.io/2018/11/16/ethereum-signatures/) (v, r și s).

```solidity
        require(deadline >= block.timestamp, 'UniswapV2: EXPIRED');
```

Nu acceptă tranzacții după data limită.

```solidity
        bytes32 digest = keccak256(
            abi.encodePacked(
                '\x19\x01',
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))
            )
        );
```

`abi.encodePacked(...)` este mesajul pe care ne așteptăm să îl primim. Știm care ar trebui să fie nonce-ul, de aceea nu avem nevoie să îl obținem ca parametru

Algoritmul de semnătură în Ethereum așteaptă să primească 256 de biți pentru a semna, de aceea folosim funcția hash `keccak256`.

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

Din „digest” și din semnătură, putem obține adresa care a semnat-o folosind [ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/).

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

Dacă totul este în regulă, tratați aceasta ca [o aprobare ERC-20](https://eips.ethereum.org/EIPS/eip-20#approve).

## Contractele periferice {#periphery-contracts}

Contractele periferice sunt API-uri (interfață de program de aplicație) pentru Uniswap. Acestea sunt disponibile pentru apelurile externe, fie din alte contracte, fie din aplicațiile descentralizate. Ați putea apela contractele centrale direct, dar este mai complicat și s-ar putea să pierdeți valoare dacă faceți vreo greșeală. Contractele centrale conțin numai teste pentru a garanta că nu sunt fraudate, şi nu pentru a verifica starea de sănătate pentru oricine altcineva. Acestea sunt la periferie, de aceea pot fi actualizate după cum este nevoie.

### UniswapV2Router01.sol {#UniswapV2Router01}

[Acest contract](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol) are probleme și [ar trebui să nu mai fie utilizat](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01). Din fericire, contractele periferice sunt fără stare și nu dețin niciun activ, de aceea este ușor să fie eliminate; se recomandă în schimb utilizarea înlocuitorului lor, `UniswapV2Router02`.

### UniswapV2Router02.sol {#UniswapV2Router02}

În cele mai multe cazuri, veți utiliza Uniswap prin intermediul [acestui contract](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol). Puteți vedea cum să îl utilizați [aici](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02).

```solidity
pragma solidity =0.6.6;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol';
import '@uniswap/lib/contracts/libraries/TransferHelper.sol';

import './interfaces/IUniswapV2Router02.sol';
import './libraries/UniswapV2Library.sol';
import './libraries/SafeMath.sol';
import './interfaces/IERC20.sol';
import './interfaces/IWETH.sol';
```

Cele mai multe dintre acestea fie le-am mai întâlnit, fie sunt destul de evidente. Singura excepție este `IWETH.sol`. Uniswap v2 permite schimburi pentru orice pereche de tokenuri ERC-20, dar ether -ul (ETH) propriu-zis nu este un token ERC-20. El precedă standardul și este transferat prin mecanisme unice. Pentru a permite folosirea de ETH în contractele care se aplică la tokenurile ERC-20, a fost creat contractul de [wrapped ether (WETH)](https://weth.tkn.eth.limo/) (ether înfășurat). Trimiteți ETH acestui contract, iar acesta vă emite o sumă echivalentă în WETH. Sau puteți arde WETH și primiți înapoi ETH-ul.

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

Routerul trebuie să știe ce fabrică să utilizeze, iar pentru tranzacțiile care au nevoie de WETH, ce contract WETH să utilizeze. Aceste valori sunt [imuabile](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables), în sensul că pot fi stabilite numai în constructor. Aceasta le garantează utilizatorilor că nimeni nu ar putea să le modifice ca să conducă spre contracte mai puțin oneste.

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

Acest modificator se asigură că tranzacțiile cu limită de timp („faceți X înainte de momentul Y, dacă se poate”) nu au loc după expirarea termenului limită.

```solidity
    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }
```

Constructorul stabilește pur și simplu variabilele de stare imuabile.

```solidity
    receive() external payable {
        assert(msg.sender == WETH); // only accept ETH via fallback from the WETH contract
    }
```

Această funcție este apelată când răscumpărăm tokenuri din contractul în WETH înapoi în ETH. Contractul în WETH pe care îl folosim este singurul autorizat să facă acest lucru.

#### Adăugarea de lichidități {#add-liquidity}

Aceste funcții adaugă tokenuri la schimbul în pereche, sporind astfel fondul comun de lichidități.

```solidity

    // **** ADD LIQUIDITY ****
    function _addLiquidity(
```

Această funcție este folosită pentru a calcula cantitatea de tokenuri A și B care trebuie depozitate în schimbul în pereche.

```solidity
        address tokenA,
        address tokenB,
```

Acestea sunt adresele contractelor de tokenuri ERC-20.

```solidity
        uint amountADesired,
        uint amountBDesired,
```

Acestea sunt sumele pe care vrea să le depună furnizorul de lichidităţi. De asemenea, acestea sunt sumele maxime de A și B de depus.

```solidity
        uint amountAMin,
        uint amountBMin
```

Acestea sunt sumele minime acceptabile pentru depunere. Dacă tranzacția nu poate avea loc cu aceste sume sau mai mari, renunțați la aceasta. Dacă nu doriți această funcție, trebuie numai să specificaţi „zero”.

Furnizorii de lichidităţi specifică de regulă un minim, deoarece vor să limiteze tranzacția la o rată de schimb cât mai apropiată de cea actuală. Dacă rata de schimb fluctuează prea mult, acest lucru ar însemna că există noutăți care schimbă valorile preexistente și aceștia vor să decidă manual ce să facă.

De exemplu, imaginați-vă un caz în care rata de schimb este de unu la unu, iar furnizorul de lichidități specifică următoarele valori:

| Parametru      | Valoare |
| -------------- | ------: |
| amountADesired |    1000 |
| amountBDesired |    1000 |
| amountAMin     |     900 |
| amountBMin     |     800 |

Atâta timp cât rata de schimb se menține între 0,9 și 1,25, tranzacția are loc. În cazul în care rata de schimb nu se încadrează în acest interval, tranzacția este anulată.

Motivul acestei precauții este că tranzacțiile nu au loc imediat, le trimiteți și în final un miner le va include într-un bloc (în afară de cazul în care prețul gazului este prea coborât - atunci va fi nevoie să trimiteți o altă tranzacție cu același nonce și cu un preț mai mare al gazului, pentru a o suprascrie). Dvs. nu puteți controla ce se întâmplă în intervalul de timp dintre trimitere și includere.

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

Funcția răspunde prin sumele pe care furnizorul de lichidități ar trebui să le depună pentru a avea un raport egal cu actualul raport dintre rezerve.

```solidity
        // create the pair if it doesn't exist yet
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
```

Dacă nu există încă un schimb pentru această pereche de tokenuri, atunci va fi creat.

```solidity
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
```

Obține rezervele curente din pereche.

```solidity
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
```

În cazul în care rezervele curente sunt goale, atunci acesta este un nou schimb în pereche. Sumele care trebuie depuse trebuie să fie identice cu cele pe care furnizorul de lichidități vrea să le furnizeze.

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

Dacă trebuie să vedem ce sume vor fi, obținem suma optimă folosind [această funcție](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35). Vrem același raport ca și rezervele curente.

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

Dacă `amountBOptimal` este mai mică decât suma pe care furnizorul de lichidităţi vrea să o depună, aceasta înseamnă că jetonul B are o valoare actuală mai mare decât crede depunătorul de lichidități, așadar este necesară o sumă mai mică.

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

Dacă suma optimă B este mai mare decât suma B dorită, acesta înseamnă că tokenurile B au o valoare curentă mai mică decât crede depunătorul de lichidităţi, așadar este necesară o sumă mai mare. Totuși, suma dorită este cea maximă, de aceea nu putem face aceasta. În schimb, calculăm numărul optim de tokenuri A pentru cantitatea dorită de tokenuri B.

Punând totul cap la cap, obținem acest grafic. Să presupunem că încercați să depuneți o mie de tokenuri A (linia albastră) și o mie de tokenuri B (linia roșie). Axa „x” reprezintă rata de schimb, A/B. Dacă x=1, acestea au valoare egală și depuneți o mie din fiecare. Dacă x=2, A este de două ori mai valoros decât B (obțineți două tokenuri B pentru fiecare token A), de aceea depuneți o mie de tokenuri B, dar numai 500 de tokenuri A. Dacă x=0,5, atunci situația se inversează, este vorba de o mie de tokenuri A și cinci sute de tokenuri B.

![Grafic](liquidityProviderDeposit.png)

```solidity
            }
        }
    }
```

Ați putea depune lichidități direct în contractul central (folosind [UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110)), dar contractul central verifică numai dacă el însuși este fraudat astfel încât riscați să pierdeți din valoare dacă se modifică rata de schimb între momentul trimiterii și executării tranzacției. Dacă utilizați contractul periferic, acesta calculează suma pe care ar trebui să o depuneți și o depune imediat, în așa fel încât rata de schimb nu se modifică și în acest fel nu pierdeți nimic.

```solidity
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
```

Această funcție poate fi apelată de o tranzacție pentru a depune lichidități. Cei mai mulți parametri sunt la fel ca în `_addLiquidity` de mai sus, cu două excepții:

. `to` adresa care obține noile tokenuri de lichidităţi emise, pentru a arăta partea furnizorului de lichidităţi din fondul comun. `dealine` este o limită de timp pentru tranzacție

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

Calculăm sumele care trebuie depuse efectiv, iar apoi găsim adresa fondului de lichidități. Pentru a economisi gaz, nu cerem acest lucru fabricii, ci folosim funcția de bibliotecă `pairFor` (a se vedea mai jos în biblioteci)

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

Transferă cantitățile corecte de tokenuri de la utilizator în schimbul în pereche.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
    }
```

În schimb dă tokenurile de lichidităţi la adresa `to` pentru proprietatea parțială a fondului comun. Funcția `mint` a contractului central vede câte tokenuri suplimentare are (în comparație cu ce a avut când s-au modificat ultima dată lichidităţile) și emite lichidităţile în consecință.

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

Atunci când un furnizor de lichidităţi vrea să furnizeze lichidităţi unui schimb în pereche Jeton/ETH, există câteva diferențe. Contractul se ocupă de învelirea („wrapping”) de ETH pentru furnizorul de lichidități. Nu este nevoie să se specifice cât ETH doreşte să depună utilizatorul, deoarece acesta pur şi simplu îi trimite cu tranzacția (suma este disponibilă în `msg.value`).

```solidity
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external virtual override payable ensure(deadline) returns (uint amountToken, uint amountETH, uint liquidity) {
        (amountToken, amountETH) = _addLiquidity(
            token,
            WETH,
            amountTokenDesired,
            msg.value,
            amountTokenMin,
            amountETHMin
        );
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        TransferHelper.safeTransferFrom(token, msg.sender, pair, amountToken);
        IWETH(WETH).deposit{value: amountETH}();
        assert(IWETH(WETH).transfer(pair, amountETH));
```

Pentru a depune ETH, contractul îl înfășoară („wrap”) in WETH, apoi transferă WETH către pereche. Observați că transferul este înfășurat într-un `assert`. Deci dacă transferul nu reușește, nu reușește nici acest apel de contract, și prin urmare, învelirea („wrapping”) nu are loc cu adevărat.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // refund dust eth, if any
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }
```

Utilizatorul ne-a trimis deja ETH-ul, deci dacă a mai rămas ceva în plus (pentru că celălalt token are valoare mai mică decât a crezut utilizatorul), trebuie să emitem o rambursare.

#### Eliminarea de lichidități {#remove-liquidity}

Aceste funcții vor elimina lichidităţile și vor rambursa furnizorul de lichiditate.

```solidity
    // **** REMOVE LIQUIDITY ****
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountA, uint amountB) {
```

Cazul cel mai simplu de eliminare de lichidităţi. Există o cantitate minimă din fiecare token pe care furnizorul de lichidităţi este dispus să o accepte și aceasta trebuie să se întâmple înainte de termenul limită.

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // send liquidity to pair
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

Funcția `burn` a contractului central se ocupă de returnarea tokenurilor către utilizator.

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

Atunci când o funcție răspunde prin mai multe valori, însă ne interesează numai unele dintre acestea, iată cum putem obține doar acele valori. Este oarecum mai ieftin în privinţa gazului decât să citim o valoare pe care să nu o folosim niciodată.

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

Traduce sumele din modul cum răspunde prin acestea contractul central (tokenul cu adresă inferioară mai întâi) în modul în care le așteaptă utilizatorul (care să corespundă cu `tokenA` și `tokenB`).

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

Este corect să efectuăm transferul mai întâi, apoi să verificăm dacă este legitim, deoarece dacă nu este, vom anula toate modificările de stare.

```solidity
    function removeLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountToken, uint amountETH) {
        (amountToken, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, amountToken);
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }
```

Eliminarea lichidităților de ETH este aproape la fel, cu excepția faptului că primim tokenuri WETH și apoi le răscumpărăm pe ETH pentru a-l da înapoi furnizorului de lichidități.

```solidity
    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountA, uint amountB) {
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountA, amountB) = removeLiquidity(tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline);
    }


    function removeLiquidityETHWithPermit(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountToken, uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountToken, amountETH) = removeLiquidityETH(token, liquidity, amountTokenMin, amountETHMin, to, deadline);
    }
```

Aceste funcții transmit meta-tranzacții, care permit utilizatorilor fără ether să retragă din fondul comun folosind [mecanismul de autorizare](#UniswapV2ERC20).

```solidity

    // **** REMOVE LIQUIDITY (supporting fee-on-transfer tokens) ****
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountETH) {
        (, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, IERC20(token).balanceOf(address(this)));
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }

```

Această funcție poate fi utilizată pentru tokenuri care au taxe de transfer sau de stocare. Când un token are astfel de taxe, nu ne putem baza pe funcția `removeLiquidity` pentru a ne spune cât de mult din token vom primi înapoi, așa că trebuie să retragem mai întâi, iar apoi să obținem soldul.

```solidity


    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        amountETH = removeLiquidityETHSupportingFeeOnTransferTokens(
            token, liquidity, amountTokenMin, amountETHMin, to, deadline
        );
    }
```

Ultima funcție combină taxele de stocare cu meta-tranzacțiile.

#### Tranzacţionare {#trade}

```solidity
    // **** SWAP ****
    // requires the initial amount to have already been sent to the first pair
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

Această funcție efectuează procesarea internă necesară funcțiilor care sunt expuse comercianților.

```solidity
        for (uint i; i < path.length - 1; i++) {
```

În momentul în care scriu aceste rânduri, există [388.160 tokenuri ERC-20](https://etherscan.io/tokens). Dacă ar exista un schimb în pereche pentru fiecare pereche de tokenuri, s-ar ajunge la peste 150 miliarde de schimburi în pereche. În acest moment, întregul lanț [are numai 0,1% din acest număr de conturi](https://etherscan.io/chart/address). În schimb, funcțiile swap acceptă conceptul de cale („path”). Un comerciant poate schimba A cu B, B cu C, C cu D, astfel încât nu este nevoie de un schimb în pereche direct A-D.

Prețurile pe aceste piețe au tendința să fie sincronizate, deoarece când nu sunt sincronizate, se creează o oportunitate de arbitraj. Imaginați-vă, de exemplu, trei jetoane A, B și C. Există trei schimburi pereche, unul pentru fiecare pereche.

1. Situația inițială
2. Un comerciant vinde 24,695 tokenuri A și obține 25,305 tokenuri B.
3. Comerciantul vinde 24,695 tokenuri B pentru 25,305 tokenuri C, păstrând aproximativ 0,61 token B ca profit.
4. Apoi comerciantul vinde 24,695 tokenuri C pe 25,305 tokenuri A, păstrând aproximativ 0,61 tokenuri C ca profit. Comerciantul are de asemenea 0,61 tokenuri A în plus (cele 25,305 pe care comerciantul le are în final minus investiția originală de 24,695).

| Etapă | Schimb A-B                  | Schimb B-C                  | Schimb A-C                  |
| ----- | --------------------------- | --------------------------- | --------------------------- |
| 1     | A:1000 B:1050 A/B=1.05      | B:1000 C:1050 B/C=1.05      | A:1050 C:1000 C/A=1.05      |
| 2     | A:1024.695 B:1024.695 A/B=1 | B:1000 C:1050 B/C=1.05      | A:1050 C:1000 C/A=1.05      |
| 3     | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1050 C:1000 C/A=1.05      |
| 4     | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1024.695 C:1024.695 C/A=1 |

```solidity
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
```

Obține perechea pe care o gestionăm actualmente, o sortează (pentru a fi utilizată cu perechea) și obține suma rezultantă preconizată.

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

Obține valorile rezultante preconizate, sortate așa cum anticipează schimbul în pereche.

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

Acesta este ultimul schimb? În caz afirmativ, trimite la destinație tokenurile primite pentru tranzacţionare. În caz contrar, le trimite la următorul schimb în pereche.

```solidity

            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

Apelează de fapt schimbul în pereche pentru a schimba tokenurile. Nu avem nevoie de un retur de apel pentru a fi informați despre schimb, de aceea nu trimitem niciun octet în acest câmp.

```solidity
    function swapExactTokensForTokens(
```

Această funcție este folosită direct de către comercianți pentru a schimba un token pe altul.

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

Acest parametru conține adresele contractelor ERC-20. Așa cum s-a explicat mai sus, aceasta este o matrice, deoarece ar putea fi necesar să treceţi prin mai multe schimburi în pereche pentru a obține activul dorit din activul pe care îl aveţi.

Parametrul unei funcții în solidity poate fi stocat fie în `memory`, fie în `calldata`. Dacă funcția este un punct de intrare în contract, apelat direct de la un utilizator (folosind o tranzacție) sau de la un alt contract, atunci valoarea parametrului poate fi obținută direct din datele apelului. Dacă funcția este apelată intern, ca `_swap` de mai sus, atunci parametrii trebuie să fie stocați în `memory`. Din perspectiva contractului apelat, `calldata` este numai pentru citire.

Cu tipurile scalare cum ar fi `uint` sau `address`, compilatorul ne alege tipul de stocare, însă cu matricele, care sunt mai lungi și mai scumpe, trebuie să specificăm tipul de stocare care va fi utilizat.

```solidity
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
```

Valorile de răspuns sunt returnate întotdeauna în memorie.

```solidity
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
```

Calculează cantitatea care trebuie cumpărată la fiecare swap. În cazul în care rezultatul este mai mic decât minimul pe care comerciantul este dispus să-l accepte, tranzacția este anulată.

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

În cele din urmă, transferă tokenurile inițiale ERC-20 în contul primului schimb în pereche și apelează `_swap`. Toate acestea au loc în cadrul aceleiași tranzacții, de aceea schimbul în pereche știe că orice tokenuri neașteptate fac parte din acest transfer.

```solidity
    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

Funcția anterioară, `swapTokensForTokens`, permite comerciantului să specifice un număr exact de tokenuri introduse pe care este dispus să le dea și numărul minim de tokenuri rezultante pe care este dispus să le primească în schimb. Această funcție realizează swap-ul inversat, îi permite comerciantului să specifice numărul dorit de tokenuri rezultante și numărul maxim de tokenuri introduse pe care este dispus să le plătească pentru acestea.

În ambele cazuri, comerciantul trebuie să acorde mai întâi contractului periferic o alocație care să-i permită să le transfere.

```solidity
    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, msg.value, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
    }


    function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }



    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }


    function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= msg.value, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
        // refund dust eth, if any
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }
```

Toate aceste variante implică tranzacționarea între ETH și tokenuri. Singura diferență este că fie primim ETH de la comerciant și îl folosim a emite WETH, fie primim WETH de la ultimul schimb de pe cale și îl ardem, trimițând comerciantului ETH-ul rezultat.

```solidity
    // **** SWAP (supporting fee-on-transfer tokens) ****
    // requires the initial amount to have already been sent to the first pair
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
```

Aceasta este funcția internă de swapping al tokenurilor care au de rezolvat taxe de transfer sau de stocare ([această problemă](https://github.com/Uniswap/uniswap-interface/issues/835)).

```solidity
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output));
            uint amountInput;
            uint amountOutput;
            { // scope to avoid stack too deep errors
            (uint reserve0, uint reserve1,) = pair.getReserves();
            (uint reserveInput, uint reserveOutput) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
            amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
            amountOutput = UniswapV2Library.getAmountOut(amountInput, reserveInput, reserveOutput);
```

Datorită taxelor de transfer, nu putem să ne bazăm pe funcția `getAmountsOut` pentru a ne arăta cât de mult putem obține din fiecare transfer (în modul în care o făceam înainte, prin apelarea `_swap` original). În schimb, trebuie să transferăm mai întâi și apoi să vedem câte tokenuri am primit înapoi.

Observaţie: Teoretic am putea pur şi simplu să folosim această funcție în loc de `_swap`, dar în anumite cazuri (dacă transferul ajunge să fie anulat deoarece în final nu sunt suficiente tokenuri pentru a satisface minimul necesar) aceasta ar ajunge să ne coste mai mult gaz. Tokenurile cu taxe de transfer sunt destul de rare, de aceea, deși trebuie să le luăm în considerare, nu este nevoie să presupunem că la toate schimburile vom întâlni cel puțin unul dintre ele.

```solidity
            }
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOutput) : (amountOutput, uint(0));
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
            pair.swap(amount0Out, amount1Out, to, new bytes(0));
        }
    }


    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) {
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT'
        );
    }


    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        payable
        ensure(deadline)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        uint amountIn = msg.value;
        IWETH(WETH).deposit{value: amountIn}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn));
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT'
        );
    }


    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        ensure(deadline)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        _swapSupportingFeeOnTransferTokens(path, address(this));
        uint amountOut = IERC20(WETH).balanceOf(address(this));
        require(amountOut >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).withdraw(amountOut);
        TransferHelper.safeTransferETH(to, amountOut);
    }
```

Acestea sunt aceleași variante folosite pentru tokenurile normale, dar ele apelează în schimb `_swapSupportingFeeOnTransferTokens`.

```solidity
    // **** LIBRARY FUNCTIONS ****
    function quote(uint amountA, uint reserveA, uint reserveB) public pure virtual override returns (uint amountB) {
        return UniswapV2Library.quote(amountA, reserveA, reserveB);
    }

    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut)
        public
        pure
        virtual
        override
        returns (uint amountOut)
    {
        return UniswapV2Library.getAmountOut(amountIn, reserveIn, reserveOut);
    }

    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut)
        public
        pure
        virtual
        override
        returns (uint amountIn)
    {
        return UniswapV2Library.getAmountIn(amountOut, reserveIn, reserveOut);
    }

    function getAmountsOut(uint amountIn, address[] memory path)
        public
        view
        virtual
        override
        returns (uint[] memory amounts)
    {
        return UniswapV2Library.getAmountsOut(factory, amountIn, path);
    }

    function getAmountsIn(uint amountOut, address[] memory path)
        public
        view
        virtual
        override
        returns (uint[] memory amounts)
    {
        return UniswapV2Library.getAmountsIn(factory, amountOut, path);
    }
}
```

Aceste funcții sunt numai proxy-uri care apelează [funcțiile UniswapV2Library](#uniswapV2library).

### UniswapV2Migrator.sol {#UniswapV2Migrator}

Acest contract a fost utilizat pentru migrarea schimburilor de la vechiul v1 la v2. Acum, odată ce acestea au fost migrate, nu mai este relevantă.

## Bibliotecile {#libraries}

[Biblioteca SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) este bine documentată, așa că nu este necesar să o documentăm aici.

### „Math” {#Math}

Această bibliotecă include câteva funcții matematice care în mod normal nu sunt necesare în codul Solidity, de aceea nu fac parte din limbaj.

```solidity
pragma solidity =0.5.16;

// a library for performing various math operations

library Math {
    function min(uint x, uint y) internal pure returns (uint z) {
        z = x < y ? x : y;
    }

    // babylonian method (https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
```

Începe cu x ca o estimare care este mai mare decât rădăcina pătrată (acesta este motivul pentru care tratăm 1-3 ca pe niște cazuri speciale).

```solidity
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
```

Obține o estimare mai apropiată, media dintre estimarea anterioară și numărul a cărui rădăcină pătrată încercăm să o găsim împărțit la estimarea anterioară. Repetă până când noua estimare nu este mai mică decât cea existentă. Pentru mai multe detalii, [uitaţi-vă aici](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method).

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

Nu ar trebui să avem nevoie niciodată de rădăcina pătrată a lui zero. Rădăcinile pătrate ale lui unu, doi și trei sunt cu aproximație unu (cum noi folosim numerele întregi, deci ignorăm fracțiunile).

```solidity
        }
    }
}
```

### Fracțiunile cu virgulă fixă (UQ112x112) {#FixedPoint}

Această bibliotecă gestionează fracțiunile, care în mod normal nu fac parte din aritmetica lui Ethereum. Realizează aceasta prin codificarea numărului _x_ ca _x\*2^112_. Aceasta ne permite să folosim opcodurile originale de adunare și scădere fără nicio modificare.

```solidity
pragma solidity =0.5.16;

// a library for handling binary fixed point numbers (https://wikipedia.org/wiki/Q_(number_format))

// range: [0, 2**112 - 1]
// resolution: 1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112` este codificarea pentru unu.

```solidity
    // encode a uint112 as a UQ112x112
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // never overflows
    }
```

Because y is `uint112`, the most it can be is 2^112-1. Acest număr poate fi codificat în continuare ca `UQ112x112`.

```solidity
    // divide a UQ112x112 by a uint112, returning a UQ112x112
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

Dacă împărțim două valori `UQ112x112`, rezultatul nu mai este înmulțit cu 2^112. Deci în schimb luăm un număr întreg ca numitor. Ar fi trebuit să folosim un artificiu similar pentru a face înmulțiri, dar nu avem nevoie să facem înmulțirea valorilor `UQ112x112`.

### UniswapV2Library {#uniswapV2library}

Această bibliotecă este folosită numai de contractele periferice

```solidity
pragma solidity >=0.5.0;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import "./SafeMath.sol";

library UniswapV2Library {
    using SafeMath for uint;

    // returns sorted token addresses, used to handle return values from pairs sorted in this order
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
```

Sortează cele două tokenuri după adresă, astfel încât să putem obține din ele adresa schimbului în pereche. Acest lucru este necesar, întrucât altfel am avea două posibilități, una pentru parametrii A,B și alta pentru parametrii B,A, ceea ce ar conduce la două schimburi în loc de unul.

```solidity
    // calculates the CREATE2 address for a pair without making any external calls
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f' // init code hash
            ))));
    }
```

Această funcție calculează adresa schimbului în pereche pentru cele două tokenuri. Acest contract este creat folosind [opcode CREATE2](https://eips.ethereum.org/EIPS/eip-1014), astfel încât să putem calcula adresa folosind același algoritm dacă știm parametrii pe care îi folosește. Este mult mai ieftin decât să întrebați fabrica și

```solidity
    // fetches and sorts the reserves for a pair
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

Această funcție răspunde prin rezervele celor două tokenuri pe care le are schimbul în pereche. Observați că acesta poate primi tokenurile în orice ordine și le sortează pentru uz intern.

```solidity
    // given some amount of an asset and pair reserves, returns an equivalent amount of the other asset
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

Această funcție vă oferă cantitatea tokenului B pe care o veți primi în schimbul tokenului A dacă nu presupune nicio taxă. Acest calcul ia în considerare faptul că transferul modifică rata de schimb.

```solidity
    // given an input amount of an asset and pair reserves, returns the maximum output amount of the other asset
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
```

Funcția `quote` de mai sus funcționează excelent dacă pentru a folosi schimbul în pereche nu se percepe nicio taxă. Totuși, dacă există o taxă de schimb de 0,3%, suma pe care o obțineți cu adevărat este mai mică. Această funcție calculează suma după aplicarea taxei de schimb.

```solidity

        require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }
```

Solidity nu operează nativ cu fracțiuni, așa că nu putem înmulți suma cu 0,997. De aceea, înmulțim numărătorul cu 997 și numitorul cu 1000, ceea ce are același efect.

```solidity
    // given an output amount of an asset and pair reserves, returns a required input amount of the other asset
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
        require(amountOut > 0, 'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint numerator = reserveIn.mul(amountOut).mul(1000);
        uint denominator = reserveOut.sub(amountOut).mul(997);
        amountIn = (numerator / denominator).add(1);
    }
```

Această funcție efectuează aproximativ același lucru, însă obține suma rezultantă și oferă datele de introdus.

```solidity

    // performs chained getAmountOut calculations on any number of pairs
    function getAmountsOut(address factory, uint amountIn, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        for (uint i; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
        }
    }

    // performs chained getAmountIn calculations on any number of pairs
    function getAmountsIn(address factory, uint amountOut, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[amounts.length - 1] = amountOut;
        for (uint i = path.length - 1; i > 0; i--) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i - 1], path[i]);
            amounts[i - 1] = getAmountIn(amounts[i], reserveIn, reserveOut);
        }
    }
}
```

Aceste două funcții se ocupă de identificarea valorilor atunci când este nevoie să se treacă prin mai multe schimburi în pereche.

### „TransferHelper” {#transfer-helper}

[Această bibliotecă](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol) adaugă verificări ale succesului transferurilor ERC-20 și Ethereum, pentru a trata o revenire și o valoare de răspuns `false` în același fel.

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.0;

// helper methods for interacting with ERC20 tokens and sending ETH that do not consistently return true/false
library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));

```

Putem să apelăm un contract diferit în două moduri:

- Prin folosirea unei definiții de interfață pentru a crea un apel de funcție
- Prin folosirea [interfeței binare a aplicației (ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html) „manual” pentru a crea apelul. Acesta este modul în care autorul codului a decis să o facă.

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

Pentru asigurarea unei compatibilități din urmă cu un jeton creat înainte de standardul ERC-20, un apel ERC-20 poate eșua fie prin revenire (caz în care `success` este `false`), fie prin reușită, dar răspunzând printr-o valoare `false` (caz în care există date rezultante și dacă le decodați ca valoare booleană, obțineți `false`).

```solidity


    function safeTransfer(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transfer(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0xa9059cbb, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeTransfer: transfer failed'
        );
    }
```

Această funcție implementează [funcționalitatea „transfer” a ERC-20](https://eips.ethereum.org/EIPS/eip-20#transfer), care permite unui cont să cheltuiască alocația furnizată de un alt cont.

```solidity

    function safeTransferFrom(
        address token,
        address from,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transferFrom(address,address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x23b872dd, from, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::transferFrom: transferFrom failed'
        );
    }
```

Această funcție implementează [funcționalitatea „transferFrom” a ERC-20](https://eips.ethereum.org/EIPS/eip-20#transferfrom), care permite unui cont să cheltuiască alocația furnizată de un alt cont.

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

Această funcție transferă ether într-un cont. Orice apel către un contract diferit poate încerca să trimită ether. Deoarece nu avem nevoie să apelăm vreo funcție, nu trimitem niciun fel de date cu apelul.

## Concluzie {#conclusion}

Acesta este un articol lung de aproape 50 de pagini. Dacă ați ajuns până aici, felicitări! Să sperăm că până acum ați înțeles considerațiile legate de scrierea unei aplicații din viața reală (spre deosebire de scurtele exemple de programe) și că sunteți mai bine pregătit de a scrie contracte pentru propriile cazuri de utilizare.

Iar acum, apucaţi-vă să scrieți ceva util și uimiți-ne.
