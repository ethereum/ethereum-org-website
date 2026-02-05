---
title: "Procházení kontraktu Uniswap v2"
description: "Jak funguje kontrakt Uniswap v2? Proč je napsán tak, jak je?"
author: Ori Pomerantz
tags: [ "solidity" ]
skill: intermediate
published: 2021-05-01
lang: cs
---

## Úvod {#introduction}

[Uniswap v2](https://app.uniswap.org/whitepaper.pdf) umí vytvořit směnný trh mezi libovolnými dvěma tokeny ERC-20. V tomto článku si projdeme zdrojový kód kontraktů, které implementují tento protokol, a podíváme se, proč jsou napsány právě tímto způsobem.

### Co dělá Uniswap? {#what-does-uniswap-do}

V podstatě existují dva typy uživatelů: poskytovatelé likvidity a obchodníci.

_Poskytovatelé likvidity_ poskytují poolu dva tokeny, které lze směňovat (nazvěme je **Token0** a **Token1**). Na oplátku obdrží třetí token, který představuje částečné vlastnictví poolu, nazývaný _token likvidity_.

_Obchodníci_ posílají jeden typ tokenu do poolu a přijímají druhý (například odešlou **Token0** a obdrží **Token1**) z poolu poskytnutého poskytovateli likvidity. Směnný kurz je určen relativním počtem tokenů **Token0** a **Token1**, které má pool k dispozici. Kromě toho si pool bere malé procento jako odměnu pro pool likvidity.

Když poskytovatelé likvidity chtějí svá aktiva zpět, mohou spálit tokeny poolu a obdržet zpět své tokeny, včetně jejich podílu na odměnách.

[Podrobnější popis najdete zde](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/).

### Proč v2? Proč ne v3? {#why-v2}

[Uniswap v3](https://app.uniswap.org/whitepaper-v3.pdf) je vylepšení, které je mnohem komplikovanější než v2. Je jednodušší se nejprve naučit v2 a pak přejít na v3.

### Hlavní kontrakty vs. periferní kontrakty {#contract-types}

Uniswap v2 je rozdělen na dvě části: hlavní a periferní. Toto rozdělení umožňuje, aby hlavní kontrakty, které drží aktiva, a proto _musí_ být bezpečné, byly jednodušší a snadněji auditovatelné. Všechny další funkce požadované obchodníky pak mohou poskytovat periferní kontrakty.

## Datové a řídicí toky {#flows}

Toto je tok dat a řízení, který nastává při provádění tří hlavních akcí Uniswapu:

1. Směna mezi různými tokeny
2. Přidání likvidity na trh a odměna v podobě párových směnných tokenů likvidity ERC-20
3. Pálení tokenů likvidity ERC-20 a získání zpět tokenů ERC-20, které umožňuje párová směnárna obchodníkům směňovat

### Směna {#swap-flow}

Toto je nejběžnější tok, který používají obchodníci:

#### Volající {#caller}

1. Poskytněte perifernímu účtu povolenku v částce, která má být směněna.
2. Zavolejte jednu z mnoha směnných funkcí periferního kontraktu (která závisí na tom, zda se jedná o ETH, zda obchodník specifikuje množství tokenů k vkladu nebo množství tokenů k získání zpět atd.).
   Každá funkce směny přijímá `path`, pole směnáren, kterými se má projít.

#### V periferním kontraktu (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02-sol}

3. Identifikujte částky, které je třeba obchodovat na každé směnárně podél cesty.
4. Iteruje přes cestu. Pro každou směnárnu po cestě odešle vstupní token a poté zavolá směnnou funkci `swap` směnárny.
   Ve většině případů je cílová adresa pro tokeny další párovou směnárnou v cestě. V konečné směnárně se jedná o adresu poskytnutou obchodníkem.

#### V hlavním kontraktu (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

5. Ověřte, že hlavní kontrakt není podváděn a že si po směně dokáže udržet dostatečnou likviditu.
6. Podívejte se, kolik dalších tokenů máme kromě známých rezerv. Tato částka je počet vstupních tokenů, které jsme obdrželi ke směně.
7. Odešlete výstupní tokeny do cíle.
8. Zavolejte `_update` pro aktualizaci výše rezerv

#### Zpět v periferním kontraktu (UniswapV2Router02.sol) {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. Proveďte veškeré potřebné vyčištění (například spálení tokenů WETH, abyste získali zpět ETH pro odeslání obchodníkovi)

### Přidat likviditu {#add-liquidity-flow}

#### Volající {#caller-2}

1. Poskytněte perifernímu účtu povolenku v částkách, které se mají přidat do poolu likvidity.
2. Zavolejte jednu z funkcí `addLiquidity` periferního kontraktu.

#### V periferním kontraktu (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-2}

3. V případě potřeby vytvořte novou párovou směnárnu
4. Pokud existuje párová směnárna, vypočítejte množství tokenů k přidání. Předpokládá se, že se jedná o stejnou hodnotu pro oba tokeny, tedy stejný poměr nových tokenů k existujícím tokenům.
5. Zkontrolujte, zda jsou částky přijatelné (volající mohou zadat minimální částku, pod kterou by raději nepřidávali likviditu)
6. Zavolejte hlavní kontrakt.

#### V hlavním kontraktu (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

7. Vyražte tokeny likvidity a odešlete je volajícímu
8. Zavolejte `_update` pro aktualizaci výše rezerv

### Odebrat likviditu {#remove-liquidity-flow}

#### Volající {#caller-3}

1. Poskytněte perifernímu účtu povolenku na tokeny likvidity, které mají být spáleny výměnou za podkladové tokeny.
2. Zavolejte jednu z funkcí `removeLiquidity` periferního kontraktu.

#### V periferním kontraktu (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-3}

3. Odešlete tokeny likvidity do párové směnárny

#### V hlavním kontraktu (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-3}

4. Odešlete na cílovou adresu podkladové tokeny v poměru ke spáleným tokenům. Například pokud je v poolu 1 000 tokenů A, 500 tokenů B a 90 tokenů likvidity a obdržíme 9 tokenů ke spálení, pálíme 10 % tokenů likvidity, takže uživateli vrátíme 100 tokenů A a 50 tokenů B.
5. Spalte tokeny likvidity
6. Zavolejte `_update` pro aktualizaci výše rezerv

## Hlavní kontrakty {#core-contracts}

Jedná se o bezpečné kontrakty, které drží likviditu.

### UniswapV2Pair.sol {#UniswapV2Pair}

[Tento kontrakt](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol) implementuje skutečný pool, který směňuje tokeny. Jedná se o hlavní funkci Uniswapu.

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

Jedná se o všechna rozhraní, o kterých kontrakt potřebuje vědět, buď proto, že je kontrakt implementuje (`IUniswapV2Pair` a `UniswapV2ERC20`), nebo proto, že volá kontrakty, které je implementují.

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

Tento kontrakt dědí z `UniswapV2ERC20`, který poskytuje funkce ERC-20 pro tokeny likvidity.

```solidity
    using SafeMath  for uint;
```

[Knihovna SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) se používá k zamezení přetečení a podtečení. To je důležité, protože jinak bychom mohli skončit v situaci, kdy by hodnota měla být `-1`, ale místo toho je `2^256-1`.

```solidity
    using UQ112x112 for uint224;
```

Mnoho výpočtů v kontraktu poolu vyžaduje zlomky. Zlomky však nejsou v EVM podporovány.
Řešení, které Uniswap nalezl, je použití 224bitových hodnot, se 112 bity pro celočíselnou část a 112 bity pro zlomkovou část. Takže `1.0` je reprezentováno jako `2^112`, `1.5` je reprezentováno jako `2^112 + 2^111` atd.

Další podrobnosti o této knihovně jsou k dispozici [později v tomto dokumentu](#FixedPoint).

#### Proměnné {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

Aby se zabránilo dělení nulou, existuje minimální počet tokenů likvidity, které vždy existují (ale jsou vlastněny nulovým účtem). Tento počet je **MINIMUM_LIQUIDITY**, tisíc.

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

Toto je ABI selektor pro přenosovou funkci ERC-20. Používá se k převodu tokenů ERC-20 na dva tokenové účty.

```solidity
    address public factory;
```

Jedná se o factory kontrakt, který vytvořil tento pool. Každý pool je směnárnou mezi dvěma tokeny ERC-20, factory je centrální bod, který spojuje všechny tyto pooly.

```solidity
    address public token0;
    address public token1;
```

Zde jsou adresy kontraktů pro dva typy tokenů ERC-20, které lze v tomto poolu směňovat.

```solidity
    uint112 private reserve0;           // používá jeden slot úložiště, dostupný přes getReserves
    uint112 private reserve1;           // používá jeden slot úložiště, dostupný přes getReserves
```

Rezervy, které má pool pro každý typ tokenu. Předpokládáme, že obě představují stejnou hodnotu, a proto každý token0 má hodnotu reserve1/reserve0 tokenů1.

```solidity
    uint32  private blockTimestampLast; // používá jeden slot úložiště, dostupný přes getReserves
```

Časové razítko posledního bloku, ve kterém došlo ke směně, slouží ke sledování směnných kurzů v čase.

Jedním z největších nákladů na palivo v ethereových kontraktech je úložiště, které přetrvává od jednoho volání kontraktu k druhému. Každá buňka úložiště je 256 bitů dlouhá. Takže tři proměnné, `reserve0`, `reserve1` a `blockTimestampLast`, jsou alokovány tak, že jedna hodnota úložiště může obsahovat všechny tři (112+112+32=256).

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

Tyto proměnné uchovávají kumulativní náklady na každý token (každý v poměru k druhému). Lze je použít k výpočtu průměrného směnného kurzu za určité časové období.

```solidity
    uint public kLast; // reserve0 * reserve1, stav bezprostředně po poslední události likvidity
```

Způsob, jakým párová směnárna rozhoduje o směnném kurzu mezi token0 a token1, je udržovat násobek obou rezerv konstantní během obchodů. `kLast` je tato hodnota. Mění se, když poskytovatel likvidity vkládá nebo vybírá tokeny, a mírně se zvyšuje kvůli tržnímu poplatku 0,3 %.

Zde je jednoduchý příklad. Všimněte si, že pro zjednodušení má tabulka pouze tři číslice za desetinnou čárkou a ignorujeme obchodní poplatek ve výši 0,3 %, takže čísla nejsou přesná.

| Událost                                       |  reserve0 |  reserve1 | reserve0 \* reserve1 | Průměrný směnný kurz (token1 / token0) |
| --------------------------------------------- | --------: | --------: | -------------------: | --------------------------------------------------------- |
| Počáteční nastavení                           | 1 000,000 | 1 000,000 |            1 000 000 |                                                           |
| Obchodník A smění 50 token0 za 47,619 token1  | 1 050,000 |   952,381 |            1 000 000 | 0,952                                                     |
| Obchodník B smění 10 token0 za 8,984 token1   | 1 060,000 |   943,396 |            1 000 000 | 0,898                                                     |
| Obchodník C smění 40 token0 za 34,305 token1  | 1 100,000 |   909,090 |            1 000 000 | 0,858                                                     |
| Obchodník D smění 100 token1 za 109,01 token0 |   990,990 | 1 009,090 |            1 000 000 | 0,917                                                     |
| Obchodník E smění 10 token0 za 10,079 token1  | 1 000,990 |   999,010 |            1 000 000 | 1,008                                                     |

Jak obchodníci poskytují více tokenu0, relativní hodnota tokenu1 se zvyšuje a naopak, na základě nabídky a poptávky.

#### Zámek {#pair-lock}

```solidity
    uint private unlocked = 1;
```

Existuje třída bezpečnostních zranitelností, které jsou založeny na [zneužití reentrance](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14). Uniswap musí převádět libovolné tokeny ERC-20, což znamená volání kontraktů ERC-20, které se mohou pokusit zneužít trh Uniswap, který je volá.
Díky proměnné `unlocked` jako součásti kontraktu můžeme zabránit volání funkcí, které již běží (v rámci stejné transakce).

```solidity
    modifier lock() {
```

Tato funkce je [modifikátor](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers), funkce, která obaluje normální funkci, aby nějakým způsobem změnila její chování.

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

Pokud se `unlocked` rovná jedné, nastavte ji na nulu. Pokud je již nula, vraťte volání zpět, aby se nezdařilo.

```solidity
        _;
```

V modifikátoru `_;` je původní volání funkce (se všemi parametry). Zde to znamená, že volání funkce proběhne pouze v případě, že `unlocked` bylo jedna, když byla volána, a během jejího běhu je hodnota `unlocked` nula.

```solidity
        unlocked = 1;
    }
```

Po návratu hlavní funkce uvolněte zámek.

#### Různé funkce {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

Tato funkce poskytuje volajícím aktuální stav směnárny. Všimněte si, že funkce v Solidity [mohou vracet více hodnot](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values).

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

Tato interní funkce převádí množství tokenů ERC20 ze směnárny někomu jinému. `SELECTOR` specifikuje, že volaná funkce je `transfer(address,uint)` (viz definice výše).

Abychom nemuseli importovat rozhraní pro funkci tokenu, „ručně“ vytvoříme volání pomocí jedné z [funkcí ABI](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions).

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

Existují dva způsoby, jak může volání přenosu ERC-20 hlásit selhání:

1. Návrat. Pokud se volání externího kontraktu vrátí, pak je návratová hodnota boolean `false`
2. Ukončit normálně, ale nahlásit chybu. V takovém případě má buffer návratové hodnoty nenulovou délku a po dekódování jako booleovská hodnota je `false`

Pokud nastane kterákoli z těchto podmínek, vraťte zpět.

#### Události {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

Tyto dvě události se vygenerují, když poskytovatel likvidity buď vloží likviditu (`Mint`), nebo ji vybere (`Burn`). V obou případech jsou součástí události množství tokenu0 a tokenu1, které jsou vloženy nebo vybrány, a také identita účtu, který nás volal (`sender`). V případě výběru událost obsahuje také cíl, který obdržel tokeny (`to`), který se nemusí shodovat s odesílatelem.

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

Tato událost se vygeneruje, když obchodník smění jeden token za druhý. Opět platí, že odesílatel a cíl nemusí být stejné.
Každý token může být buď odeslán do směnárny, nebo z ní přijat.

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

Nakonec se `Sync` vygeneruje pokaždé, když jsou přidány nebo vybrány tokeny, bez ohledu na důvod, aby se poskytly nejnovější informace o rezervách (a tedy o směnném kurzu).

#### Funkce nastavení {#pair-setup}

Tyto funkce mají být volány jednou, když je nastavena nová párová směnárna.

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

Konstruktor zajišťuje, že budeme sledovat adresu kontraktu factory, který pár vytvořil. Tato informace je nutná pro `initialize` a pro poplatek kontraktu factory (pokud existuje).

```solidity
    // voláno jednou z kontraktu factory v době nasazení
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // dostatečná kontrola
        token0 = _token0;
        token1 = _token1;
    }
```

Tato funkce umožňuje kontraktu factory (a pouze jemu) specifikovat dva tokeny ERC-20, které bude tento pár směňovat.

#### Interní funkce aktualizace {#pair-update-internal}

##### \_update

```solidity
    // aktualizovat rezervy a při prvním volání za blok akumulátory cen
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

Tato funkce je volána pokaždé, když jsou vloženy nebo vybrány tokeny.

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

Pokud je balance0 nebo balance1 (uint256) vyšší než uint112(-1) (=2^112-1) (takže při převodu na uint112 dojde k přetečení a návratu k 0), odmítněte pokračovat v \_update, aby se zabránilo přetečení. U normálního tokenu, který lze rozdělit na 10^18 jednotek, to znamená, že každá směnárna je omezena na přibližně 5,1\*10^15 každého tokenu. Zatím to nebyl problém.

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // přetečení je žádoucí
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

Pokud uplynulý čas není nula, znamená to, že jsme první směnná transakce v tomto bloku. V takovém případě musíme aktualizovat akumulátory nákladů.

```solidity
            // * nikdy nedojde k přetečení a + přetečení je žádoucí
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

Každý akumulátor nákladů je aktualizován o nejnovější náklady (rezerva druhého tokenu/rezerva tohoto tokenu) vynásobené uplynulým časem v sekundách. Chcete-li získat průměrnou cenu, přečtete kumulativní cenu ve dvou časových bodech a vydělíte časovým rozdílem mezi nimi. Předpokládejme například tuto sekvenci událostí:

| Událost                                                 |  reserve0 |  reserve1 | časové razítko | Mezní směnný kurz (reserve1 / reserve0) |       price0CumulativeLast |
| ------------------------------------------------------- | --------: | --------: | -------------- | ---------------------------------------------------------: | -------------------------: |
| Počáteční nastavení                                     | 1 000,000 | 1 000,000 | 5 000          |                                                      1,000 |                          0 |
| Obchodník A vloží 50 token0 a získá zpět 47,619 token1  | 1 050,000 |   952,381 | 5 020          |                                                      0,907 |                         20 |
| Obchodník B vloží 10 token0 a získá zpět 8,984 token1   | 1 060,000 |   943,396 | 5 030          |                                                      0,890 |       20+10\*0,907 = 29,07 |
| Obchodník C vloží 40 token0 a získá zpět 34,305 token1  | 1 100,000 |   909,090 | 5 100          |                                                      0,826 |    29,07+70\*0,890 = 91,37 |
| Obchodník D vloží 100 token1 a získá zpět 109,01 token0 |   990,990 | 1 009,090 | 5 110          |                                                      1,018 |    91,37+10\*0,826 = 99,63 |
| Obchodník E vloží 10 token0 a získá zpět 10,079 token1  | 1 000,990 |   999,010 | 5 150          |                                                      0,998 | 99,63+40\*1,1018 = 143,702 |

Řekněme, že chceme vypočítat průměrnou cenu **Tokenu0** mezi časovými razítky 5 030 a 5 150. Rozdíl v hodnotě `price0Cumulative` je 143,702-29,07=114,632. To je průměr za dvě minuty (120 sekund). Takže průměrná cena je 114,632/120 = 0,955.

Tento výpočet ceny je důvod, proč potřebujeme znát staré velikosti rezerv.

```solidity
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }
```

Nakonec aktualizujte globální proměnné a vygenerujte událost `Sync`.

##### \_mintFee

```solidity
    // pokud je poplatek zapnutý, vyražte likviditu odpovídající 1/6 růstu v sqrt(k)
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

V Uniswapu 2.0 platí obchodníci za použití trhu poplatek ve výši 0,30 %. Většina tohoto poplatku (0,25 % z obchodu) jde vždy poskytovatelům likvidity. Zbývajících 0,05 % může jít buď poskytovatelům likvidity, nebo na adresu určenou kontraktem factory jako poplatek za protokol, který platí Uniswapu za jeho vývojové úsilí.

Aby se snížily výpočty (a tedy náklady na palivo), tento poplatek se počítá pouze při přidání nebo odebrání likvidity z poolu, nikoliv při každé transakci.

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

Přečtěte si cíl poplatku kontraktu factory. Pokud je nula, neexistuje žádný protokolární poplatek a není třeba ho počítat.

```solidity
        uint _kLast = kLast; // úspora paliva
```

Stavová proměnná `kLast` se nachází v úložišti, takže bude mít hodnotu mezi různými voláními kontraktu.
Přístup k úložišti je mnohem dražší než přístup k volatilní paměti, která se uvolní po ukončení volání funkce kontraktu, takže pro úsporu paliva používáme interní proměnnou.

```solidity
        if (feeOn) {
            if (_kLast != 0) {
```

Poskytovatelé likvidity získávají svůj podíl jednoduše zhodnocením svých tokenů likvidity. Protokolární poplatek však vyžaduje, aby byly vyraženy nové tokeny likvidity a poskytnuty na adresu `feeTo`.

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
```

Pokud existuje nová likvidita, na kterou se má vybírat poplatek za protokol. Funkci druhé odmocniny najdete [později v tomto článku](#Math)

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

Tento složitý výpočet poplatků je vysvětlen v [bílé knize](https://app.uniswap.org/whitepaper.pdf) na straně 5. Víme, že mezi dobou, kdy byl `kLast` vypočítán, a současností nebyla přidána ani odebrána žádná likvidita (protože tento výpočet spouštíme pokaždé, když je likvidita přidána nebo odebrána, předtím, než se skutečně změní), takže jakákoli změna v `reserve0 * reserve1` musí pocházet z transakčních poplatků (bez nich bychom udržovali `reserve0 * reserve1` konstantní).

```solidity
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
```

Použijte funkci `UniswapV2ERC20._mint` k vytvoření dalších tokenů likvidity a jejich přiřazení k `feeTo`.

```solidity
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }
```

Pokud není nastaven žádný poplatek, nastavte `kLast` na nulu (pokud již není). Když byl tento kontrakt psán, existovala [funkce vrácení paliva](https://eips.ethereum.org/EIPS/eip-3298), která motivovala kontrakty ke zmenšení celkové velikosti stavu Etherea vynulováním úložiště, které nepotřebovaly.
Tento kód získá tuto refundaci, pokud je to možné.

#### Externě dostupné funkce {#pair-external}

Všimněte si, že ačkoli jakákoli transakce nebo kontrakt _může_ volat tyto funkce, jsou navrženy tak, aby byly volány z periferního kontraktu. Pokud je zavoláte přímo, nebudete moci podvést párovou směnárnu, ale můžete omylem ztratit hodnotu.

##### vyrazit

```solidity
    // tuto funkci na nízké úrovni by měl volat kontrakt, který provádí důležité bezpečnostní kontroly
    function mint(address to) external lock returns (uint liquidity) {
```

Tato funkce je volána, když poskytovatel likvidity přidá likviditu do poolu. Jako odměnu razí další tokeny likvidity. Měl by být volán z [periferního kontraktu](#UniswapV2Router02), který ho volá po přidání likvidity ve stejné transakci (takže nikdo jiný nebude moci podat transakci, která si nárokuje novou likviditu před legitimním vlastníkem).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // úspora paliva
```

Toto je způsob, jak číst výsledky funkce Solidity, která vrací více hodnot. Zahazujeme poslední vrácené hodnoty, časové razítko bloku, protože ho nepotřebujeme.

```solidity
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);
```

Získejte aktuální zůstatky a zjistěte, kolik bylo přidáno z každého typu tokenu.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
```

Vypočítejte poplatky za protokol, které mají být vybrány, pokud existují, a podle toho vyražte tokeny likvidity. Protože parametry `_mintFee` jsou staré hodnoty rezerv, poplatek se vypočítá přesně pouze na základě změn v poolu způsobených poplatky.

```solidity
        uint _totalSupply = totalSupply; // úspora paliva, musí být definována zde, protože totalSupply se může aktualizovat v _mintFee
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // trvale uzamknout prvních MINIMUM_LIQUIDITY tokenů
```

Pokud se jedná o první vklad, vytvořte `MINIMUM_LIQUIDITY` tokenů a odešlete je na nulovou adresu, abyste je uzamkli. Nikdy nemohou být vykoupeny, což znamená, že pool nikdy nebude zcela vyprázdněn (to nás na některých místech ušetří dělení nulou). Hodnota `MINIMUM_LIQUIDITY` je tisíc, což vzhledem k tomu, že většina ERC-20 je rozdělena na jednotky 10^-18 tokenu, jako je ETH rozdělen na wei, je 10^-15 hodnoty jediného tokenu. Nejsou to vysoké náklady.

V době prvního vkladu neznáme relativní hodnotu obou tokenů, takže jednoduše vynásobíme částky a vezmeme druhou odmocninu, za předpokladu, že vklad nám poskytne stejnou hodnotu v obou tokenech.

Můžeme tomu věřit, protože je v zájmu vkladatele poskytnout stejnou hodnotu, aby se vyhnul ztrátě hodnoty arbitráží.
Řekněme, že hodnota obou tokenů je stejná, ale náš vkladatel vložil čtyřikrát více **Tokenu1** než **Tokenu0**. Obchodník může využít toho, že si párová směnárna myslí, že **Token0** je cennější, a vytěžit z něj hodnotu.

| Událost                                                         | reserve0 | reserve1 | reserve0 \* reserve1 | Hodnota poolu (reserve0 + reserve1) |
| --------------------------------------------------------------- | -------: | -------: | -------------------: | -----------------------------------------------------: |
| Počáteční nastavení                                             |        8 |       32 |                  256 |                                                     40 |
| Obchodník vloží 8 tokenů **Token0**, dostane zpět 16 **Token1** |       16 |       16 |                  256 |                                                     32 |

Jak vidíte, obchodník získal navíc 8 tokenů, které pocházejí ze snížení hodnoty poolu, což poškozuje vkladatele, který ho vlastní.

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

S každým dalším vkladem již známe směnný kurz mezi oběma aktivy a očekáváme, že poskytovatelé likvidity poskytnou stejnou hodnotu v obou. Pokud tak neučiní, dáme jim tokeny likvidity na základě nižší hodnoty, kterou poskytli, jako trest.

Ať už se jedná o počáteční vklad nebo následný, počet tokenů likvidity, které poskytujeme, se rovná druhé odmocnině změny v `reserve0*reserve1` a hodnota tokenu likvidity se nemění (pokud nedostaneme vklad, který nemá stejné hodnoty obou typů, v takovém případě se „pokuta“ rozdělí). Zde je další příklad se dvěma tokeny, které mají stejnou hodnotu, se třemi dobrými vklady a jedním špatným (vklad pouze jednoho typu tokenu, takže nevytváří žádné tokeny likvidity).

| Událost                     |                reserve0 |                reserve1 | reserve0 \* reserve1 | Hodnota poolu (reserve0 + reserve1) | Tokeny likvidity vyražené pro tento vklad | Celkový počet tokenů likvidity | hodnota každého tokenu likvidity |
| --------------------------- | ----------------------: | ----------------------: | -------------------: | -----------------------------------------------------: | ----------------------------------------: | -----------------------------: | -------------------------------: |
| Počáteční nastavení         |                   8,000 |                   8,000 |                   64 |                                                 16,000 |                                         8 |                              8 |                            2,000 |
| Vložte čtyři z každého typu |                  12,000 |                  12,000 |                  144 |                                                 24,000 |                                         4 |                             12 |                            2,000 |
| Vložte dva z každého typu   |                  14,000 |                  14,000 |                  196 |                                                 28,000 |                                         2 |                             14 |                            2,000 |
| Vklad nerovné hodnoty       |                  18,000 |                  14,000 |                  252 |                                                 32,000 |                                         0 |                             14 |           ~2,286 |
| Po arbitráži                | ~15,874 | ~15,874 |                  252 |                                ~31,748 |                                         0 |                             14 |           ~2,267 |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

Použijte funkci `UniswapV2ERC20._mint` k vytvoření dalších tokenů likvidity a jejich předání na správný účet.

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 a reserve1 jsou aktuální
        emit Mint(msg.sender, amount0, amount1);
    }
```

Aktualizujte stavové proměnné (`reserve0`, `reserve1` a v případě potřeby `kLast`) a vygenerujte příslušnou událost.

##### spálit

```solidity
    // tuto funkci na nízké úrovni by měl volat kontrakt, který provádí důležité bezpečnostní kontroly
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

Tato funkce je volána při výběru likvidity a je třeba spálit příslušné tokeny likvidity.
Měl by být také volán [z periferního účtu](#UniswapV2Router02).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // úspora paliva
        address _token0 = token0;                                // úspora paliva
        address _token1 = token1;                                // úspora paliva
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

Periferní kontrakt převedl likviditu, která má být spálena, do tohoto kontraktu před voláním. Tímto způsobem víme, kolik likvidity spálit, a můžeme se ujistit, že bude spálena.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // úspora paliva, musí být definována zde, protože totalSupply se může aktualizovat v _mintFee
        amount0 = liquidity.mul(balance0) / _totalSupply; // použití zůstatků zajišťuje poměrné rozdělení
        amount1 = liquidity.mul(balance1) / _totalSupply; // použití zůstatků zajišťuje poměrné rozdělení
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
```

Poskytovatel likvidity obdrží stejnou hodnotu obou tokenů. Tímto způsobem neměníme směnný kurz.

```solidity
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 a reserve1 jsou aktuální
        emit Burn(msg.sender, amount0, amount1, to);
    }

```

Zbytek funkce `burn` je zrcadlovým obrazem výše uvedené funkce `mint`.

##### směna

```solidity
    // tuto funkci na nízké úrovni by měl volat kontrakt, který provádí důležité bezpečnostní kontroly
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

Tato funkce má být také volána z [periferního kontraktu](#UniswapV2Router02).

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // úspora paliva
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // rozsah pro _token{0,1}, vyhýbá se chybám „stack too deep“
```

Lokální proměnné mohou být uloženy buď v paměti, nebo, pokud jich není příliš mnoho, přímo na zásobníku.
Pokud můžeme omezit počet tak, abychom použili zásobník, spotřebujeme méně paliva. Více podrobností naleznete v [Yellow Paper, formální specifikaci Etherea](https://ethereum.github.io/yellowpaper/paper.pdf), str. 26, rovnice 298.

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // optimisticky převeďte tokeny
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // optimisticky převeďte tokeny
```

Tento převod je optimistický, protože převádíme dříve, než jsme si jisti, že jsou splněny všechny podmínky. To je v Ethereu v pořádku, protože pokud podmínky nejsou splněny později ve volání, vrátíme se z něj a všech změn, které vytvořilo.

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

Informujte příjemce o směně, pokud je to požadováno.

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

Získejte aktuální zůstatky. Periferní kontrakt nám posílá tokeny předtím, než nás zavolá k provedení směny. To usnadňuje kontraktu kontrolu, zda není podváděn, což je kontrola, která _musí_ proběhnout v hlavním kontraktu (protože nás mohou volat i jiné entity než náš periferní kontrakt).

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // rozsah pro reserve{0,1}Adjusted, zabraňuje chybám „stack too deep“
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

Jedná se o kontrolu integrity, abychom se ujistili, že při směně neztratíme. V žádném případě by směna neměla snížit `reserve0*reserve1`. Zde také zajišťujeme, aby byl při směně uplatněn poplatek ve výši 0,3 %; před kontrolou hodnoty K vynásobíme oba zůstatky 1000 a odečteme částky vynásobené 3, což znamená, že 0,3 % (3/1000 = 0,003 = 0,3 %) se odečte ze zůstatku před porovnáním jeho hodnoty K s hodnotou K aktuálních rezerv.

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

Aktualizujte `reserve0` a `reserve1`, a pokud je to nutné, akumulátory cen a časové razítko a vygenerujte událost.

##### Sync nebo Skim

Je možné, že se skutečné zůstatky dostanou mimo synchronizaci s rezervami, které si směnárna párů myslí, že má.
Nelze vybírat tokeny bez souhlasu kontraktu, ale vklady jsou jiná věc. Účet může převádět tokeny na směnárnu bez volání `mint` nebo `swap`.

V takovém případě existují dvě řešení:

- `sync`, aktualizujte rezervy na aktuální zůstatky
- `skim`, vyberte přebytečnou částku. Všimněte si, že jakýkoli účet může volat `skim`, protože nevíme, kdo tokeny vložil. Tato informace se generuje v události, ale události nejsou dostupné z blockchainu.

```solidity
    // vynutit, aby se zůstatky shodovaly s rezervami
    function skim(address to) external lock {
        address _token0 = token0; // úspora paliva
        address _token1 = token1; // úspora paliva
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }



    // vynutit, aby se rezervy shodovaly se zůstatky
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
}
```

### UniswapV2Factory.sol {#UniswapV2Factory}

[Tento kontrakt](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol) vytváří párové směnárny.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToSetter;
```

Tyto stavové proměnné jsou nezbytné pro implementaci poplatku za protokol (viz [bílá kniha](https://app.uniswap.org/whitepaper.pdf), str. 5).
Adresa `feeTo` shromažďuje tokeny likvidity pro protokolární poplatek a `feeToSetter` je adresa, která může změnit `feeTo` na jinou adresu.

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

Tyto proměnné sledují páry, tedy směnárny mezi dvěma typy tokenů.

První, `getPair`, je mapování, které identifikuje kontrakt párové směnárny na základě dvou tokenů ERC-20, které směňuje. Tokeny ERC-20 jsou identifikovány adresami kontraktů, které je implementují, takže klíče i hodnota jsou adresy. Chcete-li získat adresu párové směnárny, která vám umožní převést z `tokenA` na `tokenB`, použijete `getPair[<adresa tokenuA>][<adresa tokenuB>]` (nebo naopak).

Druhá proměnná, `allPairs`, je pole, které obsahuje všechny adresy párových směnáren vytvořených tímto kontraktem factory. V Ethereu nelze iterovat obsah mapování ani získat seznam všech klíčů, takže tato proměnná je jediný způsob, jak zjistit, které směnárny tento kontrakt factory spravuje.

Poznámka: Důvod, proč nelze iterovat všechny klíče mapování, je ten, že úložiště dat kontraktu je _drahé_, takže čím méně ho používáme, tím lépe, a čím méně ho měníme, tím lépe. Můžete vytvořit [mapování, která podporují iteraci](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol), ale vyžadují další úložiště pro seznam klíčů. Ve většině aplikací to nepotřebujete.

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

Tato událost se vygeneruje, když je vytvořena nová párová směnárna. Zahrnuje adresy tokenů, adresu párové směnárny a celkový počet směnáren spravovaných kontraktem factory.

```solidity
    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }
```

Jediná věc, kterou konstruktor dělá, je specifikace `feeToSetter`. Kontrakty factory začínají bez poplatku a pouze `feeSetter` to může změnit.

```solidity
    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
```

Tato funkce vrací počet směnných párů.

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

Toto je hlavní funkce kontraktu factory, vytvořit párovou směnárnu mezi dvěma tokeny ERC-20. Všimněte si, že tuto funkci může volat kdokoli. Nepotřebujete povolení od Uniswapu k vytvoření nové párové směnárny.

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

Chceme, aby adresa nové směnárny byla deterministická, aby ji bylo možné vypočítat předem off-chain (to může být užitečné pro [transakce druhé vrstvy](/developers/docs/scaling/)).
K tomu potřebujeme mít konzistentní pořadí adres tokenů, bez ohledu na pořadí, v jakém jsme je obdrželi, takže je zde seřadíme.

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // jediná kontrola je dostatečná
```

Velké pooly likvidity jsou lepší než malé, protože mají stabilnější ceny. Nechceme mít více než jeden pool likvidity pro pár tokenů. Pokud již směnárna existuje, není třeba vytvářet další pro stejný pár.

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

K vytvoření nového kontraktu potřebujeme kód, který ho vytvoří (jak funkci konstruktoru, tak kód, který zapíše do paměti bytecode EVM skutečného kontraktu). Normálně v Solidity použijeme `addr = new <název kontraktu>(<parametry konstruktoru>)` a kompilátor se o vše postará za nás, ale abychom měli deterministickou adresu kontraktu, musíme použít [opcode CREATE2](https://eips.ethereum.org/EIPS/eip-1014).
Když byl tento kód napsán, tento opcode ještě nebyl podporován v Solidity, takže bylo nutné ručně získat kód. To již není problém, protože [Solidity nyní podporuje CREATE2](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2).

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

Když opcode ještě není podporován v Solidity, můžeme ho zavolat pomocí [inline assembly](https://docs.soliditylang.org/en/v0.8.3/assembly.html).

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

Zavolejte funkci `initialize`, abyste nové směnárně řekli, které dva tokeny směňuje.

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // naplnit mapování v opačném směru
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
```

Uložte informace o novém páru do stavových proměnných a vygenerujte událost, abyste informovali svět o nové párové směnárně.

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

Tyto dvě funkce umožňují `feeSetter` ovládat příjemce poplatku (pokud existuje) a změnit `feeSetter` na novou adresu.

### UniswapV2ERC20.sol {#UniswapV2ERC20}

[Tento kontrakt](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol) implementuje token likvidity ERC-20. Je podobný [kontraktu OpenZeppelin ERC-20](/developers/tutorials/erc20-annotated-code), takže vysvětlím pouze část, která je odlišná, funkci `permit`.

Transakce na Ethereu stojí ether (ETH), což je ekvivalent skutečných peněz. Pokud máte tokeny ERC-20, ale nemáte ETH, nemůžete odesílat transakce, takže s nimi nemůžete nic dělat. Jedním z řešení tohoto problému jsou [meta-transakce](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions).
Vlastník tokenů podepíše transakci, která umožňuje někomu jinému vybrat tokeny off-chain, a pošle ji přes internet příjemci. Příjemce, který má ETH, pak odešle povolení jménem vlastníka.

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

Tento haš je [identifikátor typu transakce](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash). Jediný, který zde podporujeme, je `Permit` s těmito parametry.

```solidity
    mapping(address => uint) public nonces;
```

Není možné, aby příjemce zfalšoval digitální podpis. Je však triviální poslat stejnou transakci dvakrát (jedná se o formu [replay attacku](https://wikipedia.org/wiki/Replay_attack)). Abychom tomu zabránili, používáme [nonce](https://wikipedia.org/wiki/Cryptographic_nonce). Pokud nonce nového `Permit` není o jedno vyšší než poslední použité, předpokládáme, že je neplatné.

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

Toto je kód pro získání [identifikátoru řetězce](https://chainid.network/). Používá EVM asemblerový dialekt zvaný [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html). Všimněte si, že v aktuální verzi Yulu musíte použít `chainid()`, nikoli `chainid`.

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

Vypočítejte [oddělovač domény](https://eips.ethereum.org/EIPS/eip-712#rationale-for-domainseparator) pro EIP-712.

```solidity
    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
```

Toto je funkce, která implementuje oprávnění. Jako parametry přijímá relevantní pole a tři skalární hodnoty pro [podpis](https://yos.io/2018/11/16/ethereum-signatures/) (v, r a s).

```solidity
        require(deadline >= block.timestamp, 'UniswapV2: EXPIRED');
```

Nepřijímejte transakce po termínu.

```solidity
        bytes32 digest = keccak256(
            abi.encodePacked(
                '\x19\x01',
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))
            )
        );
```

`abi.encodePacked(...)` je zpráva, kterou očekáváme. Víme, jaká by měla být nonce, takže ji nemusíme dostávat jako parametr.

Algoritmus podpisu Etherea očekává 256 bitů k podpisu, takže používáme hašovací funkci `keccak256`.

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

Z digestu a podpisu můžeme získat adresu, která ho podepsala, pomocí [ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/).

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

Pokud je vše v pořádku, považujte to za [schválení ERC-20](https://eips.ethereum.org/EIPS/eip-20#approve).

## Periferní kontrakty {#periphery-contracts}

Periferní kontrakty jsou API (rozhraní pro programování aplikací) pro Uniswap. Jsou k dispozici pro externí volání, a to buď z jiných kontraktů, nebo z decentralizovaných aplikací. Mohli byste volat hlavní kontrakty přímo, ale je to složitější a pokud uděláte chybu, můžete ztratit hodnotu. Hlavní kontrakty obsahují pouze testy, aby se ujistily, že nejsou podváděny, nikoli kontroly integrity pro kohokoli jiného. Ty jsou v periferii, takže je lze podle potřeby aktualizovat.

### UniswapV2Router01.sol {#UniswapV2Router01}

[Tento kontrakt](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol) má problémy a [již by se neměl používat](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01). Naštěstí jsou periferní kontrakty bezstavové a nedrží žádná aktiva, takže je snadné je zastarat a navrhnout lidem, aby místo toho používali náhradu, `UniswapV2Router02`.

### UniswapV2Router02.sol {#UniswapV2Router02}

Ve většině případů byste používali Uniswap prostřednictvím [tohoto kontraktu](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol).
Jak ho používat, se můžete podívat [zde](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02).

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

Většinu z nich jsme již potkali, nebo jsou zcela zřejmé. Jedinou výjimkou je `IWETH.sol`. Uniswap v2 umožňuje směnárny pro jakýkoli pár tokenů ERC-20, ale samotný ether (ETH) není token ERC-20. Předchází standardu a je přenášen jedinečnými mechanismy. Aby bylo možné používat ETH v kontraktech, které se vztahují na tokeny ERC-20, lidé přišli s kontraktem [zabalený ether (WETH)](https://weth.tkn.eth.limo/). Pošlete tomuto kontraktu ETH a on vám vyrazí ekvivalentní množství WETH. Nebo můžete spálit WETH a získat zpět ETH.

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

Směrovač potřebuje vědět, který kontrakt factory použít, a pro transakce, které vyžadují WETH, který kontrakt WETH použít. Tyto hodnoty jsou [neměnné](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables), což znamená, že je lze nastavit pouze v konstruktoru. To dává uživatelům jistotu, že je nikdo nebude moci změnit, aby odkazovaly na méně poctivé kontrakty.

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

Tento modifikátor zajišťuje, že časově omezené transakce („udělej X před časem Y, pokud můžeš“) se neuskuteční po svém časovém limitu.

```solidity
    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }
```

Konstruktor pouze nastavuje neměnné stavové proměnné.

```solidity
    receive() external payable {
        assert(msg.sender == WETH); // přijmout ETH pouze prostřednictvím fallbacku z kontraktu WETH
    }
```

Tato funkce je volána, když vykupujeme tokeny z kontraktu WETH zpět na ETH. K tomu je oprávněn pouze kontrakt WETH, který používáme.

#### Přidat likviditu {#add-liquidity}

Tyto funkce přidávají tokeny do párové směnárny, což zvyšuje pool likvidity.

```solidity

    // **** PŘIDAT LIKVIDITU ****
    function _addLiquidity(
```

Tato funkce se používá k výpočtu množství tokenů A a B, které by měly být vloženy do párové směnárny.

```solidity
        address tokenA,
        address tokenB,
```

Jedná se o adresy kontraktů tokenů ERC-20.

```solidity
        uint amountADesired,
        uint amountBDesired,
```

Jedná se o částky, které chce poskytovatel likvidity vložit. Jsou to také maximální částky A a B, které mají být vloženy.

```solidity
        uint amountAMin,
        uint amountBMin
```

Jedná se o minimální přijatelné částky k vkladu. Pokud se transakce nemůže uskutečnit s těmito částkami nebo více, vraťte se z ní. Pokud tuto funkci nechcete, stačí zadat nulu.

Poskytovatelé likvidity obvykle specifikují minimum, protože chtějí omezit transakci na směnný kurz, který je blízký aktuálnímu. Pokud směnný kurz příliš kolísá, může to znamenat zprávy, které mění podkladové hodnoty, a oni chtějí ručně rozhodnout, co dělat.

Představte si například případ, kdy je směnný kurz jedna ku jedné a poskytovatel likvidity specifikuje tyto hodnoty:

| Parametr       | Hodnota |
| -------------- | ------: |
| amountADesired |    1000 |
| amountBDesired |    1000 |
| amountAMin     |     900 |
| amountBMin     |     800 |

Dokud směnný kurz zůstane mezi 0,9 a 1,25, transakce proběhne. Pokud se směnný kurz dostane mimo tento rozsah, transakce se zruší.

Důvodem tohoto opatření je, že transakce nejsou okamžité, odešlete je a nakonec je validátor zahrne do bloku (pokud vaše cena paliva není velmi nízká, v takovém případě budete muset odeslat další transakci se stejnou nonce a vyšší cenou paliva, abyste ji přepsali). Nemůžete kontrolovat, co se děje v intervalu mezi odesláním a zařazením.

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

Funkce vrací částky, které by měl poskytovatel likvidity vložit, aby měl poměr rovný aktuálnímu poměru mezi rezervami.

```solidity
        // vytvořit pár, pokud ještě neexistuje
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
```

Pokud pro tento pár tokenů ještě neexistuje směnárna, vytvořte ji.

```solidity
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
```

Získejte aktuální rezervy v páru.

```solidity
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
```

Pokud jsou aktuální rezervy prázdné, jedná se o novou párovou směnárnu. Částky, které mají být vloženy, by měly být přesně stejné jako ty, které chce poskytnout poskytovatel likvidity.

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

Pokud potřebujeme zjistit, jaké budou částky, získáme optimální částku pomocí [této funkce](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35). Chceme stejný poměr jako aktuální rezervy.

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

Pokud je `amountBOptimal` menší než částka, kterou chce poskytovatel likvidity vložit, znamená to, že token B je aktuálně cennější, než si vkladatel likvidity myslí, takže je vyžadována menší částka.

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

Pokud je optimální částka B větší než požadovaná částka B, znamená to, že tokeny B jsou aktuálně méně cenné, než si vkladatel likvidity myslí, takže je vyžadována vyšší částka. Požadovaná částka je však maximum, takže to nemůžeme udělat. Místo toho vypočítáme optimální počet tokenů A pro požadované množství tokenů B.

Když to všechno dáme dohromady, dostaneme tento graf. Předpokládejme, že se snažíte vložit tisíc tokenů A (modrá čára) a tisíc tokenů B (červená čára). Osa x je směnný kurz, A/B. Pokud x=1, mají stejnou hodnotu a vložíte tisíc od každého. Pokud x=2, A má dvojnásobnou hodnotu než B (za každý token A dostanete dva tokeny B), takže vložíte tisíc tokenů B, ale pouze 500 tokenů A. Pokud x=0,5, situace je opačná, tisíc tokenů A a pět set tokenů B.

![Graf](liquidityProviderDeposit.png)

Likviditu byste mohli vložit přímo do hlavního kontraktu (pomocí [UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110)), ale hlavní kontrakt kontroluje pouze to, zda není sám podváděn, takže riskujete ztrátu hodnoty, pokud se směnný kurz změní mezi dobou, kdy odešlete transakci, a dobou, kdy je provedena. Pokud použijete periferní kontrakt, ten zjistí částku, kterou byste měli vložit, a okamžitě ji vloží, takže se směnný kurz nezmění a nic neztratíte.

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

Tuto funkci může volat transakce k vkladu likvidity. Většina parametrů je stejná jako v `_addLiquidity` výše, se dvěma výjimkami:

. `to` je adresa, která získá nové tokeny likvidity vyražené, aby ukázaly podíl poskytovatele likvidity v poolu
. `deadline` je časový limit transakce

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

Vypočítáme částky, které skutečně vložíme, a pak najdeme adresu poolu likvidity. Abychom ušetřili palivo, neděláme to tak, že bychom se ptali kontraktu factory, ale pomocí funkce knihovny `pairFor` (viz níže v knihovnách)

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

Převeďte správné množství tokenů od uživatele do párové směnárny.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
    }
```

Na oplátku dejte na adresu `to` tokeny likvidity za částečné vlastnictví poolu. Funkce `mint` hlavního kontraktu zjistí, kolik má navíc tokenů (oproti tomu, kolik měl naposledy, když se změnila likvidita), a podle toho razí likviditu.

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

Když chce poskytovatel likvidity poskytnout likviditu párové směnárně Token/ETH, existuje několik rozdílů. Kontrakt zařizuje zabalení ETH pro poskytovatele likvidity. Není třeba specifikovat, kolik ETH chce uživatel vložit, protože je uživatel jednoduše pošle s transakcí (částka je dostupná v `msg.value`).

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

K vkladu ETH kontrakt nejprve zabalí ETH do WETH a poté převede WETH do páru. Všimněte si, že převod je zabalen v `assert`. To znamená, že pokud převod selže, selže i toto volání kontraktu, a proto se zabalení ve skutečnosti nestane.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // vrátit zbytek eth, pokud nějaký je
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }
```

Uživatel nám již poslal ETH, takže pokud zbývá nějaký přebytek (protože druhý token je méně cenný, než si uživatel myslel), musíme provést refundaci.

#### Odebrat likviditu {#remove-liquidity}

Tyto funkce odstraní likviditu a vyplatí zpět poskytovatele likvidity.

```solidity
    // **** ODEBRAT LIKVIDITU ****
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

Nejjednodušší případ odstranění likvidity. Existuje minimální množství každého tokenu, které poskytovatel likvidity souhlasí přijmout, a musí se to stát před termínem.

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // poslat likviditu páru
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

Funkce `burn` hlavního kontraktu se stará o vrácení tokenů uživateli.

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

Když funkce vrací více hodnot, ale zajímají nás pouze některé z nich, takto získáme pouze tyto hodnoty. Je to poněkud levnější z hlediska paliva než číst hodnotu a nikdy ji nepoužít.

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

Převeďte částky ze způsobu, jakým je vrací hlavní kontrakt (nejprve token s nižší adresou), na způsob, jakým je očekává uživatel (odpovídající `tokenA` a `tokenB`).

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

Je v pořádku provést převod nejprve a poté ověřit, zda je legitimní, protože pokud není, vrátíme se ze všech změn stavu.

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

Odstranění likvidity pro ETH je téměř stejné, s výjimkou toho, že obdržíme tokeny WETH a poté je vykoupíme za ETH, abychom je vrátili poskytovateli likvidity.

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

Tyto funkce přenášejí meta-transakce, aby umožnily uživatelům bez etheru vybrat z poolu pomocí [mechanismu povolení](#UniswapV2ERC20).

```solidity

    // **** ODSTRANIT LIKVIDITU (podpora tokenů s poplatkem za převod) ****
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

Tuto funkci lze použít pro tokeny, které mají poplatky za převod nebo úložiště. Když má token takové poplatky, nemůžeme se spolehnout na funkci `removeLiquidity`, aby nám řekla, kolik tokenu dostaneme zpět, takže musíme nejprve vybrat a poté získat zůstatek.

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

Poslední funkce kombinuje poplatky za úložiště s meta-transakcemi.

#### Obchodování {#trade}

```solidity
    // **** SMĚNA ****
    // vyžaduje, aby byla počáteční částka již odeslána prvnímu páru
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

Tato funkce provádí interní zpracování, které je vyžadováno pro funkce, které jsou vystaveny obchodníkům.

```solidity
        for (uint i; i < path.length - 1; i++) {
```

V době, kdy toto píšu, existuje [388 160 tokenů ERC-20](https://eth.blockscout.com/tokens). Kdyby existovala párová směnárna pro každý pár tokenů, bylo by to přes 150 miliard párových směnáren. Celý řetězec má v tuto chvíli [pouze 0,1 % tohoto počtu účtů](https://eth.blockscout.com/stats/accountsGrowth). Namísto toho funkce směny podporují koncept cesty. Obchodník může směnit A za B, B za C a C za D, takže není potřeba přímá párová směnárna A-D.

Ceny na těchto trzích bývají synchronizované, protože když nejsou synchronizované, vytváří to příležitost pro arbitráž. Představte si například tři tokeny, A, B a C. Existují tři párové směnárny, jedna pro každý pár.

1. Počáteční situace
2. Obchodník prodá 24,695 tokenů A a získá 25,305 tokenů B.
3. Obchodník prodá 24,695 tokenů B za 25,305 tokenů C, přičemž si jako zisk ponechá přibližně 0,61 tokenů B.
4. Poté obchodník prodá 24,695 tokenů C za 25,305 tokenů A a jako zisk si ponechá přibližně 0,61 tokenů C. Obchodník má také navíc 0,61 tokenů A (25,305, které obchodník nakonec získá, mínus původní investice 24,695).

| Krok | Směnárna A-B                                                | Směnárna B-C                                                | Směnárna A-C                                                |
| ---- | ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| 1    | A:1000 B:1050 A/B=1,05      | B:1000 C:1050 B/C=1,05      | A:1050 C:1000 C/A=1,05      |
| 2    | A:1024,695 B:1024,695 A/B=1 | B:1000 C:1050 B/C=1,05      | A:1050 C:1000 C/A=1,05      |
| 3    | A:1024,695 B:1024,695 A/B=1 | B:1024,695 C:1024,695 B/C=1 | A:1050 C:1000 C/A=1,05      |
| 4    | A:1024,695 B:1024,695 A/B=1 | B:1024,695 C:1024,695 B/C=1 | A:1024,695 C:1024,695 C/A=1 |

```solidity
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
```

Získejte pár, se kterým právě pracujeme, seřaďte jej (pro použití s párem) a získejte očekávané výstupní množství.

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

Získejte očekávané výstupní částky seřazené tak, jak je očekává párová směnárna.

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

Je to poslední směnárna? Pokud ano, odešlete tokeny obdržené za obchod na cílovou adresu. Pokud ne, odešlete je na další párovou směnárnu.

```solidity

            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

Skutečně zavolejte párovou směnárnu, aby směnila tokeny. Nepotřebujeme zpětné volání, které by nás informovalo o směně, takže v tomto poli neposíláme žádné bajty.

```solidity
    function swapExactTokensForTokens(
```

Tuto funkci obchodníci přímo používají ke směně jednoho tokenu za druhý.

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

Tento parametr obsahuje adresy ERC-20 kontraktů. Jak je vysvětleno výše, jedná se o pole, protože možná budete muset projít několika párovými směnárnami, abyste se dostali od aktiva, které máte, k aktivu, které chcete.

Parametr funkce v Solidity může být uložen buď v `memory`, nebo v `calldata`. Pokud je funkce vstupním bodem kontraktu, volaným přímo uživatelem (pomocí transakce) nebo z jiného kontraktu, pak lze hodnotu parametru převzít přímo z dat volání. Pokud je funkce volána interně, jako `_swap` výše, pak musí být parametry uloženy v `memory`. Z pohledu volaného kontraktu je `calldata` pouze pro čtení.

U skalárních typů, jako je `uint` nebo `address`, řeší výběr úložiště kompilátor za nás, ale u polí, která jsou delší a nákladnější, určujeme typ úložiště, které se má použít.

```solidity
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
```

Návratové hodnoty se vždy vracejí v paměti.

```solidity
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
```

Vypočítejte částku, která se má zakoupit při každé směně. Pokud je výsledek menší než minimum, které je obchodník ochoten přijmout, vraťte transakci zpět.

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

Nakonec převeďte počáteční token ERC-20 na účet pro první párovou směnárnu a zavolejte `_swap`. To vše se děje v rámci jedné transakce, takže párová směnárna ví, že všechny neočekávané tokeny jsou součástí tohoto převodu.

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

Předchozí funkce `swapTokensForTokens` umožňuje obchodníkovi zadat přesný počet vstupních tokenů, které je ochoten dát, a minimální počet výstupních tokenů, které je ochoten na oplátku obdržet. Tato funkce provádí reverzní směnu, umožňuje obchodníkovi zadat počet výstupních tokenů, které chce, a maximální počet vstupních tokenů, které je ochoten za ně zaplatit.

V obou případech musí obchodník nejprve udělit tomuto perifernímu kontraktu povolení k jejich převodu.

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
        // vrátit prachové eth, pokud nějaké zbylo
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }
```

Všechny tyto čtyři varianty zahrnují obchodování mezi ETH a tokeny. Jediný rozdíl je v tom, že buď obdržíme ETH od obchodníka a použijeme je k ražbě WETH, nebo obdržíme WETH z poslední směnárny na cestě a spálíme je, čímž obchodníkovi vrátíme výsledné ETH.

```solidity
    // **** SMĚNA (podpora tokenů s poplatkem za převod) ****
    // vyžaduje, aby byla počáteční částka již odeslána prvnímu páru
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
```

Jedná se o interní funkci pro směnu tokenů, které mají poplatky za převod nebo úložiště, která řeší ([tento problém](https://github.com/Uniswap/uniswap-interface/issues/835)).

```solidity
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output));
            uint amountInput;
            uint amountOutput;
            { // rozsah pro zamezení chybám příliš hlubokého zásobníku
            (uint reserve0, uint reserve1,) = pair.getReserves();
            (uint reserveInput, uint reserveOutput) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
            amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
            amountOutput = UniswapV2Library.getAmountOut(amountInput, reserveInput, reserveOutput);
```

Kvůli poplatkům za převod se nemůžeme spoléhat na funkci `getAmountsOut`, která by nám řekla, kolik z každého převodu získáme (jak to děláme před voláním původní funkce `_swap`). Místo toho musíme nejprve provést převod a poté se podívat, kolik tokenů jsme dostali zpět.

Poznámka: Teoreticky bychom mohli tuto funkci použít místo `_swap`, ale v určitých případech (například pokud je převod nakonec vrácen, protože na konci není dost na splnění požadovaného minima) by to nakonec stálo více paliva. Tokeny s poplatkem za převod jsou poměrně vzácné, takže i když je musíme zohlednit, není nutné u všech směn předpokládat, že projdou alespoň jednou z nich.

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

Toto jsou stejné varianty jako u běžných tokenů, ale místo toho volají `_swapSupportingFeeOnTransferTokens`.

```solidity
    // **** FUNKCE KNIHOVNY ****
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

Tyto funkce jsou pouze proxy, které volají [funkce UniswapV2Library](#uniswapV2library).

### UniswapV2Migrator.sol {#UniswapV2Migrator}

Tento kontrakt byl použit k migraci směnáren ze staré v1 na v2. Nyní, když byly migrovány, již není relevantní.

## Knihovny {#libraries}

[Knihovna SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) je dobře zdokumentovaná, takže ji zde není třeba dokumentovat.

### Math {#Math}

Tato knihovna obsahuje některé matematické funkce, které se v kódu Solidity běžně nevyžadují, takže nejsou součástí jazyka.

```solidity
pragma solidity =0.5.16;

// knihovna pro provádění různých matematických operací

library Math {
    function min(uint x, uint y) internal pure returns (uint z) {
        z = x < y ? x : y;
    }

    // babylónská metoda (https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
```

Začněte s x jako odhadem, který je vyšší než druhá odmocnina (to je důvod, proč musíme 1-3 považovat za zvláštní případy).

```solidity
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
```

Získejte bližší odhad, průměr předchozího odhadu a čísla, jehož druhou odmocninu se snažíme najít, dělený předchozím odhadem. Opakujte, dokud nový odhad nebude nižší než ten stávající. Další podrobnosti naleznete [zde](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method).

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

Druhou odmocninu z nuly bychom nikdy neměli potřebovat. Druhé odmocniny z jedné, dvou a tří jsou zhruba jedna (používáme celá čísla, takže zlomek ignorujeme).

```solidity
        }
    }
}
```

### Zlomky s pevnou desetinnou čárkou (UQ112x112) {#FixedPoint}

Tato knihovna zpracovává zlomky, které obvykle nejsou součástí aritmetiky Etherea. Dělá to tak, že kóduje číslo _x_ jako _x\*2^112_. To nám umožňuje používat původní operační kódy sčítání a odčítání beze změny.

```solidity
pragma solidity =0.5.16;

// knihovna pro zpracování binárních čísel s pevnou desetinnou čárkou (https://wikipedia.org/wiki/Q_(number_format))

// rozsah: [0, 2**112 - 1]
// rozlišení: 1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112` je kódování pro jedničku.

```solidity
    // zakóduje uint112 jako UQ112x112
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // nikdy nepřeteče
    }
```

Protože y je `uint112`, může být nejvýše 2^112-1. Toto číslo lze stále zakódovat jako `UQ112x112`.

```solidity
    // vydělí UQ112x112 hodnotou uint112 a vrátí UQ112x112
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

Pokud vydělíme dvě hodnoty `UQ112x112`, výsledek již není násoben 2^112. Takže místo toho vezmeme pro jmenovatele celé číslo. Podobný trik bychom museli použít i pro násobení, ale násobení hodnot `UQ112x112` provádět nepotřebujeme.

### UniswapV2Library {#uniswapV2library}

Tato knihovna se používá pouze pro periferní kontrakty

```solidity
pragma solidity >=0.5.0;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import "./SafeMath.sol";

library UniswapV2Library {
    using SafeMath for uint;

    // vrátí seřazené adresy tokenů, které se používají ke zpracování návratových hodnot z párů seřazených v tomto pořadí
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
```

Seřaďte oba tokeny podle adresy, abychom pro ně mohli získat adresu párové směnárny. To je nutné, protože jinak bychom měli dvě možnosti, jednu pro parametry A,B a druhou pro parametry B,A, což by vedlo ke dvěma směnárnám místo jedné.

```solidity
    // vypočítá adresu CREATE2 pro pár bez externích volání
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f' // haš init kódu
            ))));
    }
```

Tato funkce vypočítá adresu párové směnárny pro oba tokeny. Tento kontrakt se vytváří pomocí [operačního kódu CREATE2](https://eips.ethereum.org/EIPS/eip-1014), takže můžeme adresu vypočítat pomocí stejného algoritmu, pokud známe parametry, které používá. To je mnohem levnější než se ptát továrny, a

```solidity
    // načte a seřadí rezervy pro pár
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

Tato funkce vrací rezervy dvou tokenů, které má párová směnárna. Všimněte si, že může přijímat tokeny v libovolném pořadí a pro interní použití je seřadí.

```solidity
    // na základě určitého množství aktiva a rezerv páru vrátí ekvivalentní množství druhého aktiva
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

Tato funkce vám udává množství tokenu B, které získáte výměnou za token A, pokud se neplatí žádný poplatek. Tento výpočet zohledňuje, že převod mění směnný kurz.

```solidity
    // na základě vstupního množství aktiva a rezerv páru vrátí maximální výstupní množství druhého aktiva
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
```

Funkce `quote` výše funguje skvěle, pokud se za použití párové směnárny neplatí žádný poplatek. Pokud je však poplatek za směnu 0,3 %, částka, kterou skutečně získáte, je nižší. Tato funkce vypočítá částku po odečtení poplatku za směnu.

```solidity

        require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }
```

Solidity nativně nezpracovává zlomky, takže nemůžeme jen tak vynásobit výstupní částku 0,997. Místo toho vynásobíme čitatel 997 a jmenovatel 1000, čímž dosáhneme stejného efektu.

```solidity
    // na základě výstupního množství aktiva a rezerv páru vrátí požadované vstupní množství druhého aktiva
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
        require(amountOut > 0, 'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint numerator = reserveIn.mul(amountOut).mul(1000);
        uint denominator = reserveOut.sub(amountOut).mul(997);
        amountIn = (numerator / denominator).add(1);
    }
```

Tato funkce dělá zhruba totéž, ale získává výstupní částku a poskytuje vstupní.

```solidity

    // provádí zřetězené výpočty getAmountOut na libovolném počtu párů
    function getAmountsOut(address factory, uint amountIn, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        for (uint i; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
        }
    }

    // provádí zřetězené výpočty getAmountIn na libovolném počtu párů
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

Tyto dvě funkce zajišťují identifikaci hodnot, když je nutné projít několika párovými směnárnami.

### Pomocník pro převody {#transfer-helper}

[Tato knihovna](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol) přidává kontroly úspěšnosti kolem převodů ERC-20 a Etherea, aby se vrácení transakce a vrácená hodnota `false` považovaly za totéž.

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.0;

// pomocné metody pro interakci s tokeny ERC20 a odesílání ETH, které ne vždy vrací true/false
library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));

```

Jiný kontrakt můžeme zavolat jedním ze dvou způsobů:

- Použijte definici rozhraní k vytvoření volání funkce
- Použijte [aplikační binární rozhraní (ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html) "ručně" k vytvoření volání. Takto se to autor kódu rozhodl udělat.

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

Z důvodu zpětné kompatibility s tokeny, které byly vytvořeny před standardem ERC-20, může volání ERC-20 selhat buď vrácením (v takovém případě je `success` `false`), nebo úspěšným provedením a vrácením hodnoty `false` (v takovém případě existují výstupní data a pokud je dekódujete jako boolean, získáte `false`).

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

Tato funkce implementuje [funkci transfer standardu ERC-20](https://eips.ethereum.org/EIPS/eip-20#transfer), která umožňuje účtu utratit povolenou částku poskytnutou jiným účtem.

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

Tato funkce implementuje [funkci transferFrom standardu ERC-20](https://eips.ethereum.org/EIPS/eip-20#transferfrom), která umožňuje účtu utratit povolenou částku poskytnutou jiným účtem.

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

Tato funkce převádí ether na účet. Jakékoli volání jiného kontraktu se může pokusit odeslat ether. Protože nepotřebujeme volat žádnou funkci, neposíláme s voláním žádná data.

## Závěr {#conclusion}

Toto je dlouhý článek o asi 50 stranách. Pokud jste se dostali až sem, gratulujeme! Doufejme, že jste již pochopili úvahy při psaní reálné aplikace (na rozdíl od krátkých ukázkových programů) a jste lépe schopni psát kontrakty pro své vlastní případy použití.

Nyní jděte a napište něco užitečného a ohromte nás.

[Více z mé práce najdete zde](https://cryptodocguy.pro/).
