---
title: "Průvodce kontraktem Uniswap v2"
description: "Jak funguje kontrakt Uniswap v2? Proč je napsán právě takto?"
author: Ori Pomerantz
tags: ["Solidity", "dapps"]
skill: intermediate
breadcrumb: "Průvodce Uniswap v2"
published: 2021-05-01
lang: cs
---
## Úvod {#introduction}

[Uniswap v2](https://app.uniswap.org/whitepaper.pdf) dokáže vytvořit směnný trh mezi libovolnými dvěma tokeny ERC-20. V tomto článku si projdeme zdrojový kód kontraktů, které tento protokol implementují, a podíváme se, proč jsou napsány právě takto.

### Co dělá Uniswap? {#what-does-uniswap-do}

V zásadě existují dva typy uživatelů: poskytovatelé likvidity a obchodníci.

_Poskytovatelé likvidity_ dodávají do fondu dva tokeny, které lze směňovat (budeme je nazývat **Token0** a **Token1**). Na oplátku obdrží třetí token, který představuje částečné vlastnictví fondu a nazývá se _token likvidity_.

_Obchodníci_ posílají do fondu jeden typ tokenu a získávají druhý (například pošlou **Token0** a obdrží **Token1**) z fondu, který poskytli poskytovatelé likvidity. Směnný kurz je určen relativním množstvím tokenů **Token0** a **Token1**, které má fond k dispozici. Kromě toho si fond bere malé procento jako odměnu pro fond likvidity.

Když chtějí poskytovatelé likvidity svá aktiva zpět, mohou spálit tokeny fondu a získat zpět své tokeny, včetně svého podílu na odměnách.

[Klikněte sem pro podrobnější popis](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/).

### Proč v2? Proč ne v3? {#why-v2}

[Uniswap v3](https://app.uniswap.org/whitepaper-v3.pdf) je aktualizace, která je mnohem složitější než v2. Je snazší se nejprve naučit v2 a poté přejít na v3.

### Kontrakty jádra vs. periferní kontrakty {#contract-types}

Uniswap v2 je rozdělen na dvě komponenty, jádro a periferii. Toto rozdělení umožňuje, aby kontrakty jádra, které drží aktiva a proto _musí_ být bezpečné, byly jednodušší a snáze auditovatelné. Veškerou dodatečnou funkcionalitu požadovanou obchodníky pak mohou poskytovat periferní kontrakty.

## Datové a řídicí toky {#flows}

Toto je tok dat a řízení, ke kterému dochází, když provádíte tři hlavní akce na Uniswapu:

1. Swap mezi různými tokeny
2. Přidání likvidity na trh a získání odměny ve formě párových ERC-20 tokenů likvidity
3. Spálení ERC-20 tokenů likvidity a získání zpět ERC-20 tokenů, které párová burza umožňuje obchodníkům směňovat

### Swap {#swap-flow}

Toto je nejběžnější tok, který používají obchodníci:

#### Volající {#caller}

1. Poskytnout perifernímu účtu povolený limit ve výši částky, která má být swapována.
2. Zavolat jednu z mnoha swapovacích funkcí periferního kontraktu (kterou přesně, závisí na tom, zda je zapojeno ETH či nikoli, zda obchodník specifikuje množství tokenů k vložení nebo množství tokenů k získání zpět atd.).
   Každá swapovací funkce přijímá `path`, pole burz, kterými se má projít.

#### V periferním kontraktu (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02-sol}

3. Identifikovat částky, které je třeba zobchodovat na každé burze podél cesty.
4. Iteruje přes cestu. Pro každou burzu po cestě odešle vstupní token a poté zavolá funkci `swap` dané burzy.
   Ve většině případů je cílovou adresou pro tokeny další párová burza na cestě. V konečné burze je to adresa poskytnutá obchodníkem.

#### V hlavním kontraktu (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

5. Ověřit, že hlavní kontrakt není podváděn a může si po swapu udržet dostatečnou likviditu.
6. Zjistit, kolik tokenů navíc máme kromě známých rezerv. Tato částka představuje počet vstupních tokenů, které jsme obdrželi ke směně.
7. Odeslat výstupní tokeny do cíle.
8. Zavolat `_update` pro aktualizaci částek rezerv

#### Zpět v periferním kontraktu (UniswapV2Router02.sol) {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. Provést jakýkoli nezbytný úklid (například spálit WETH tokeny pro získání zpět ETH k odeslání obchodníkovi)

### Přidání likvidity {#add-liquidity-flow}

#### Volající {#caller-2}

1. Poskytnout perifernímu účtu povolený limit ve výši částek, které mají být přidány do fondu likvidity.
2. Zavolat jednu z funkcí `addLiquidity` periferního kontraktu.

#### V periferním kontraktu (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-2}

3. V případě potřeby vytvořit novou párovou burzu
4. Pokud existuje stávající párová burza, vypočítat množství tokenů k přidání. To by mělo mít stejnou hodnotu pro oba tokeny, tedy stejný poměr nových tokenů ke stávajícím tokenům.
5. Zkontrolovat, zda jsou částky přijatelné (volající mohou specifikovat minimální částku, pod kterou by raději likviditu nepřidávali)
6. Zavolat hlavní kontrakt.

#### V hlavním kontraktu (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2-2}

7. Vyrazit tokeny likvidity a odeslat je volajícímu
8. Zavolat `_update` pro aktualizaci částek rezerv

### Odebrání likvidity {#remove-liquidity-flow}

#### Volající {#caller-3}

1. Poskytnout perifernímu účtu povolený limit tokenů likvidity, které mají být spáleny výměnou za podkladové tokeny.
2. Zavolat jednu z funkcí `removeLiquidity` periferního kontraktu.

#### V periferním kontraktu (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-3}

3. Odeslat tokeny likvidity na párovou burzu

#### V hlavním kontraktu (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-3}

4. Odeslat na cílovou adresu podkladové tokeny v poměru ke spáleným tokenům. Například pokud je ve fondu 1000 tokenů A, 500 tokenů B a 90 tokenů likvidity a my obdržíme 9 tokenů ke spálení, pálíme 10 % tokenů likvidity, takže uživateli pošleme zpět 100 tokenů A a 50 tokenů B.
5. Spálit tokeny likvidity
6. Zavolat `_update` pro aktualizaci částek rezerv

## Hlavní kontrakty {#core-contracts}

Toto jsou bezpečné kontrakty, které drží likviditu.

### UniswapV2Pair.sol {#uniswapv2pair}

[Tento kontrakt](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol) implementuje samotný fond, který směňuje tokeny. Je to základní funkcionalita Uniswapu.

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

Toto jsou všechna rozhraní, o kterých kontrakt potřebuje vědět, ať už proto, že je sám implementuje (`IUniswapV2Pair` a `UniswapV2ERC20`), nebo proto, že volá kontrakty, které je implementují.

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

Tento kontrakt dědí z `UniswapV2ERC20`, což poskytuje funkce ERC-20 pro tokeny likvidity.

```solidity
    using SafeMath  for uint;
```

[Knihovna SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) se používá k zabránění přetečení a podtečení (overflow a underflow). To je důležité, protože jinak bychom se mohli dostat do situace, kdy by hodnota měla být `-1`, ale místo toho je `2^256-1`.

```solidity
    using UQ112x112 for uint224;
```

Mnoho výpočtů v kontraktu fondu vyžaduje zlomky. Zlomky však EVM nepodporuje.
Řešení, které Uniswap našel, je použít 224bitové hodnoty, kde 112 bitů je pro celočíselnou část a 112 bitů pro zlomkovou část. Takže `1.0` je reprezentováno jako `2^112`, `1.5` je reprezentováno jako `2^112 + 2^111` atd.

Více podrobností o této knihovně je k dispozici [dále v dokumentu](#fixedpoint).

#### Proměnné {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

Aby se předešlo případům dělení nulou, existuje minimální počet tokenů likvidity, které vždy existují (ale jsou vlastněny účtem nula). Toto číslo je **MINIMUM_LIQUIDITY**, tedy tisíc.

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

Toto je selektor ABI pro funkci převodu ERC-20. Používá se k převodu tokenů ERC-20 na dvou účtech tokenů.

```solidity
    address public factory;
```

Toto je tovární kontrakt (factory), který vytvořil tento fond. Každý fond je směnárnou mezi dvěma tokeny ERC-20, továrna je centrálním bodem, který všechny tyto fondy spojuje.

```solidity
    address public token0;
    address public token1;
```

Zde jsou adresy kontraktů pro dva typy tokenů ERC-20, které lze v tomto fondu směňovat.

```solidity
    uint112 private reserve0;           // využívá jeden úložný slot, přístupný přes getReserves
    uint112 private reserve1;           // využívá jeden úložný slot, přístupný přes getReserves
```

Rezervy, které má fond pro každý typ tokenu. Předpokládáme, že oba představují stejnou hodnotu, a proto má každý token0 hodnotu reserve1/reserve0 tokenů1.

```solidity
    uint32  private blockTimestampLast; // využívá jeden úložný slot, přístupný přes getReserves
```

Časové razítko (timestamp) posledního bloku, ve kterém došlo ke směně, používané ke sledování směnných kurzů v čase.

Jedním z největších výdajů za gas u kontraktů Etherea je úložiště (storage), které přetrvává z jednoho volání kontraktu do dalšího. Každá buňka úložiště je dlouhá 256 bitů. Takže tři proměnné, `reserve0`, `reserve1` a `blockTimestampLast`, jsou alokovány takovým způsobem, že jedna hodnota úložiště může obsahovat všechny tři (112+112+32=256).

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

Tyto proměnné uchovávají kumulativní náklady pro každý token (každý vyjádřený v tom druhém). Lze je použít k výpočtu průměrného směnného kurzu za určité časové období.

```solidity
    uint public kLast; // reserve0 * reserve1, bezprostředně po nejnovější události likvidity
```

Způsob, jakým směnárna párů rozhoduje o směnném kurzu mezi token0 a token1, spočívá v udržování konstantního násobku obou rezerv během obchodů. `kLast` je tato hodnota. Mění se, když poskytovatel likvidity vloží nebo vybere tokeny, a mírně se zvyšuje kvůli tržnímu poplatku 0,3 %.

Zde je jednoduchý příklad. Všimněte si, že pro zjednodušení má tabulka pouze tři číslice za desetinnou čárkou a ignorujeme poplatek za obchodování 0,3 %, takže čísla nejsou přesná.

| Událost                                     |  reserve0 |  reserve1 | reserve0 \* reserve1 | Průměrný směnný kurz (token1 / token0) |
| ------------------------------------------- | --------: | --------: | -------------------: | --------------------------------------- |
| Počáteční nastavení                               | 1,000.000 | 1,000.000 |            1,000,000 |                                         |
| Obchodník A swapne 50 token0 za 47,619 token1  | 1,050.000 |   952.381 |            1,000,000 | 0.952                                   |
| Obchodník B swapne 10 token0 za 8,984 token1   | 1,060.000 |   943.396 |            1,000,000 | 0.898                                   |
| Obchodník C swapne 40 token0 za 34,305 token1  | 1,100.000 |   909.090 |            1,000,000 | 0.858                                   |
| Obchodník D swapne 100 token1 za 109,01 token0 |   990.990 | 1,009.090 |            1,000,000 | 0.917                                   |
| Obchodník E swapne 10 token0 za 10,079 token1  | 1,000.990 |   999.010 |            1,000,000 | 1.008                                   |

Jak obchodníci poskytují více token0, relativní hodnota token1 se zvyšuje a naopak, na základě nabídky a poptávky.

#### Zámek {#pair-lock}

```solidity
    uint private unlocked = 1;
```

Existuje třída bezpečnostních zranitelností, které jsou založeny na [zneužití reentrance](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14). Uniswap potřebuje převádět libovolné tokeny ERC-20, což znamená volání kontraktů ERC-20, které se mohou pokusit zneužít trh Uniswap, který je volá.
Tím, že máme proměnnou `unlocked` jako součást kontraktu, můžeme zabránit volání funkcí, zatímco běží (v rámci stejné transakce).

```solidity
    modifier lock() {
```

Tato funkce je [modifikátor](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers), funkce, která obaluje normální funkci, aby nějakým způsobem změnila její chování.

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

Pokud se `unlocked` rovná jedné, nastavte ji na nulu. Pokud je již nula, zvrátit volání, nechat ho selhat.

```solidity
        _;
```

V modifikátoru je `_;` původní volání funkce (se všemi parametry). Zde to znamená, že k volání funkce dojde pouze tehdy, pokud byla hodnota `unlocked` jedna, když byla volána, a zatímco běží, hodnota `unlocked` je nula.

```solidity
        unlocked = 1;
    }
```

Poté, co se hlavní funkce vrátí, uvolněte zámek.

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

Tato interní funkce převede určité množství tokenů ERC-20 ze směnárny někomu jinému. `SELECTOR` specifikuje, že funkce, kterou voláme, je `transfer(address,uint)` (viz definice výše).

Abychom nemuseli importovat rozhraní pro funkci tokenu, vytvoříme volání „ručně“ pomocí jedné z [funkcí ABI](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions).

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

Existují dva způsoby, jak může volání převodu ERC-20 nahlásit selhání:

1. Zvrácení (revert). Pokud se volání externího kontraktu zvrátí, pak je návratová hodnota typu boolean `false`
2. Normální ukončení, ale nahlášení selhání. V takovém případě má buffer návratové hodnoty nenulovou délku a při dekódování jako hodnota typu boolean je to `false`

Pokud nastane kterákoli z těchto podmínek, zvrátit.

#### Události {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

Tyto dvě události jsou emitovány, když poskytovatel likvidity buď vloží likviditu (`Mint`), nebo ji vybere (`Burn`). V obou případech jsou součástí události částky token0 a token1, které jsou vloženy nebo vybrány, a také identita účtu, který nás volal (`sender`). V případě výběru událost zahrnuje také cíl, který tokeny obdržel (`to`), což nemusí být stejné jako odesílatel.

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

Tato událost je emitována, když obchodník swapne jeden token za druhý. Opět platí, že odesílatel a cíl nemusí být stejní.
Každý token může být buď odeslán na směnárnu, nebo z ní přijat.

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

Nakonec je `Sync` emitováno pokaždé, když jsou tokeny přidány nebo vybrány, bez ohledu na důvod, aby poskytlo nejnovější informace o rezervách (a tím i směnný kurz).

#### Funkce nastavení {#pair-setup}

Tyto funkce by měly být volány jednou při nastavení nové směnárny párů.

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

Konstruktor zajišťuje, že budeme sledovat adresu továrny, která pár vytvořila. Tato informace je vyžadována pro `initialize` a pro tovární poplatek (pokud existuje).

```solidity
    // voláno jednou factory při nasazení
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // dostatečná kontrola
        token0 = _token0;
        token1 = _token1;
    }
```

Tato funkce umožňuje továrně (a pouze továrně) specifikovat dva tokeny ERC-20, které bude tento pár směňovat.

#### Interní funkce aktualizace {#pair-update-internal}

##### \_update

```solidity
    // aktualizuje rezervy a při prvním volání v bloku i cenové akumulátory
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

Tato funkce je volána pokaždé, když jsou tokeny vloženy nebo vybrány.

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

Pokud je balance0 nebo balance1 (uint256) vyšší než uint112(-1) (=2^112-1) (takže přeteče a při převodu na uint112 se vrátí na 0), odmítněte pokračovat v \_update, abyste zabránili přetečení. U normálního tokenu, který lze rozdělit na 10^18 jednotek, to znamená, že každá směnárna je omezena na přibližně 5,1\*10^15 od každého tokenu. Zatím to nebyl problém.

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // přetečení je žádoucí
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

Pokud uplynulý čas není nula, znamená to, že jsme první transakcí směny v tomto bloku. V takovém případě musíme aktualizovat akumulátory nákladů.

```solidity
            // * nikdy nepřeteče a u + je přetečení žádoucí
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

Každý akumulátor nákladů je aktualizován nejnovějšími náklady (rezerva druhého tokenu/rezerva tohoto tokenu) vynásobenými uplynulým časem v sekundách. Chcete-li získat průměrnou cenu, přečtete kumulativní cenu ve dvou časových bodech a vydělíte ji časovým rozdílem mezi nimi. Předpokládejme například tuto posloupnost událostí:

| Událost                                                    |  reserve0 |  reserve1 | časové razítko | Mezní směnný kurz (reserve1 / reserve0) |       price0CumulativeLast |
| -------------------------------------------------------- | --------: | --------: | --------- | -------------------------------------------: | -------------------------: |
| Počáteční nastavení                                            | 1,000.000 | 1,000.000 | 5,000     |                                        1.000 |                          0 |
| Obchodník A vloží 50 token0 a dostane zpět 47,619 token1  | 1,050.000 |   952.381 | 5,020     |                                        0.907 |                         20 |
| Obchodník B vloží 10 token0 a dostane zpět 8,984 token1   | 1,060.000 |   943.396 | 5,030     |                                        0.890 |       20+10\*0.907 = 29.07 |
| Obchodník C vloží 40 token0 a dostane zpět 34,305 token1  | 1,100.000 |   909.090 | 5,100     |                                        0.826 |    29.07+70\*0.890 = 91.37 |
| Obchodník D vloží 100 token1 a dostane zpět 109,01 token0 |   990.990 | 1,009.090 | 5,110     |                                        1.018 |    91.37+10\*0.826 = 99.63 |
| Obchodník E vloží 10 token0 a dostane zpět 10,079 token1  | 1,000.990 |   999.010 | 5,150     |                                        0.998 | 99.63+40\*1.1018 = 143.702 |

Řekněme, že chceme vypočítat průměrnou cenu **Token0** mezi časovými razítky 5 030 a 5 150. Rozdíl v hodnotě `price0Cumulative` je 143,702-29,07=114,632. Toto je průměr za dvě minuty (120 sekund). Takže průměrná cena je 114,632/120 = 0,955.

Tento výpočet ceny je důvodem, proč potřebujeme znát staré velikosti rezerv.

```solidity
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }
```

Nakonec aktualizujte globální proměnné a emitujte událost `Sync`.

##### \_mintFee

```solidity
    // pokud je poplatek zapnutý, razit likviditu odpovídající 1/6 růstu sqrt(k)
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

V Uniswap 2.0 platí obchodníci za používání trhu poplatek 0,30 %. Většina tohoto poplatku (0,25 % z obchodu) jde vždy poskytovatelům likvidity. Zbývajících 0,05 % může jít buď poskytovatelům likvidity, nebo na adresu specifikovanou továrnou jako poplatek za protokol, který platí Uniswapu za jejich úsilí při vývoji.

Aby se snížil počet výpočtů (a tím i náklady na gas), tento poplatek se počítá pouze při přidání nebo odebrání likvidity z fondu, nikoli při každé transakci.

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

Přečtěte si cíl poplatku továrny. Pokud je nula, pak neexistuje žádný poplatek za protokol a není třeba tento poplatek počítat.

```solidity
        uint _kLast = kLast; // úspora gasu
```

Stavová proměnná `kLast` je umístěna v úložišti, takže bude mít hodnotu mezi různými voláními kontraktu.
Přístup k úložišti je mnohem dražší než přístup k volatilní paměti, která se uvolní po skončení volání funkce kontraktu, takže používáme interní proměnnou, abychom ušetřili gas.

```solidity
        if (feeOn) {
            if (_kLast != 0) {
```

Poskytovatelé likvidity získají svůj podíl jednoduše zhodnocením svých tokenů likvidity. Poplatek za protokol však vyžaduje, aby byly vyraženy nové tokeny likvidity a poskytnuty na adresu `feeTo`.

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
```

Pokud existuje nová likvidita, ze které se má vybrat poplatek za protokol. Funkci druhé odmocniny můžete vidět [dále v tomto článku](#math)

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

Tento složitý výpočet poplatků je vysvětlen v [bílé knize](https://app.uniswap.org/whitepaper.pdf) na straně 5. Víme, že mezi dobou, kdy bylo vypočítáno `kLast`, a současností nebyla přidána ani odebrána žádná likvidita (protože tento výpočet spouštíme pokaždé, když je likvidita přidána nebo odebrána, než se skutečně změní), takže jakákoli změna v `reserve0 * reserve1` musí pocházet z transakčních poplatků (bez nich bychom udržovali `reserve0 * reserve1` konstantní).

```solidity
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
```

Použijte funkci `UniswapV2ERC20._mint` ke skutečnému vytvoření dalších tokenů likvidity a jejich přiřazení k `feeTo`.

```solidity
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }
```

Pokud není nastaven žádný poplatek, nastavte `kLast` na nulu (pokud to tak již není). Když byl tento kontrakt napsán, existovala [funkce vrácení gasu](https://eips.ethereum.org/EIPS/eip-3298), která povzbuzovala kontrakty ke snížení celkové velikosti stavu Etherea vynulováním úložiště, které nepotřebovaly.
Tento kód získá tuto náhradu, kdykoli je to možné.

#### Externě přístupné funkce {#pair-external}

Všimněte si, že ačkoli jakákoli transakce nebo kontrakt _může_ tyto funkce volat, jsou navrženy tak, aby byly volány z periferního kontraktu. Pokud je zavoláte přímo, nebudete moci směnárnu párů podvést, ale můžete ztratit hodnotu kvůli chybě.

##### mint

```solidity
    // tato nízkoúrovňová funkce by měla být volána z kontraktu, který provádí důležité bezpečnostní kontroly
    function mint(address to) external lock returns (uint liquidity) {
```

Tato funkce je volána, když poskytovatel likvidity přidá likviditu do fondu. Jako odměnu razí další tokeny likvidity. Měla by být volána z [periferního kontraktu](#uniswapv2router02), který ji zavolá po přidání likvidity ve stejné transakci (takže nikdo jiný by nemohl odeslat transakci, která by si nárokovala novou likviditu před legitimním vlastníkem).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // úspora gasu
```

Toto je způsob, jak číst výsledky funkce v Solidity, která vrací více hodnot. Poslední vrácenou hodnotu, časové razítko bloku, zahodíme, protože ji nepotřebujeme.

```solidity
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);
```

Získejte aktuální zůstatky a podívejte se, kolik bylo přidáno od každého typu tokenu.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
```

Vypočítejte poplatky za protokol, které se mají vybrat, pokud nějaké jsou, a podle toho vyrazte tokeny likvidity. Protože parametry pro `_mintFee` jsou staré hodnoty rezerv, poplatek se počítá přesně pouze na základě změn fondu způsobených poplatky.

```solidity
        uint _totalSupply = totalSupply; // úspora gasu, musí být definováno zde, protože totalSupply se může aktualizovat v _mintFee
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // trvale uzamknout prvních MINIMUM_LIQUIDITY tokenů
```

Pokud se jedná o první vklad, vytvořte `MINIMUM_LIQUIDITY` tokenů a pošlete je na adresu nula, abyste je uzamkli. Nikdy je nelze vyplatit, což znamená, že fond nebude nikdy zcela vyprázdněn (to nás na některých místech zachrání před dělením nulou). Hodnota `MINIMUM_LIQUIDITY` je tisíc, což vzhledem k tomu, že většina ERC-20 je rozdělena na jednotky 10^-18 tokenu, stejně jako je ETH rozděleno na Wei, je 10^-15 hodnoty jednoho tokenu. Není to vysoký náklad.

V době prvního vkladu neznáme relativní hodnotu obou tokenů, takže částky jednoduše vynásobíme a odmocníme za předpokladu, že nám vklad poskytuje stejnou hodnotu v obou tokenech.

Můžeme tomu věřit, protože je v zájmu vkladatele poskytnout stejnou hodnotu, aby se vyhnul ztrátě hodnoty kvůli arbitráži.
Řekněme, že hodnota obou tokenů je stejná, ale náš vkladatel vložil čtyřikrát více **Token1** než **Token0**. Obchodník může využít skutečnosti, že si směnárna párů myslí, že **Token0** je cennější, k tomu, aby z ní získal hodnotu.

| Událost                                                        | reserve0 | reserve1 | reserve0 \* reserve1 | Hodnota fondu (reserve0 + reserve1) |
| ------------------------------------------------------------ | -------: | -------: | -------------------: | --------------------------------------: |
| Počáteční nastavení                                                |        8 |       32 |                  256 |                                      40 |
| Obchodník vloží 8 tokenů **Token0**, dostane zpět 16 **Token1** |       16 |       16 |                  256 |                                      32 |

Jak vidíte, obchodník vydělal dalších 8 tokenů, které pocházejí ze snížení hodnoty fondu, což poškozuje vkladatele, který jej vlastní.

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

Při každém dalším vkladu již známe směnný kurz mezi oběma aktivy a očekáváme, že poskytovatelé likvidity poskytnou stejnou hodnotu v obou. Pokud tak neučiní, dáme jim jako trest tokeny likvidity na základě nižší hodnoty, kterou poskytli.

Ať už se jedná o počáteční vklad nebo o následný, počet tokenů likvidity, které poskytujeme, se rovná druhé odmocnině změny v `reserve0*reserve1` a hodnota tokenu likvidity se nemění (pokud nedostaneme vklad, který nemá stejné hodnoty obou typů, v takovém případě se „pokuta“ rozdělí). Zde je další příklad se dvěma tokeny, které mají stejnou hodnotu, se třemi dobrými vklady a jedním špatným (vklad pouze jednoho typu tokenu, takže neprodukuje žádné tokeny likvidity).

| Událost                     | reserve0 | reserve1 | reserve0 \* reserve1 | Hodnota fondu (reserve0 + reserve1) | Tokeny likvidity vyražené pro tento vklad | Celkem tokenů likvidity | hodnota každého tokenu likvidity |
| ------------------------- | -------: | -------: | -------------------: | -------------------------------: | ---------------------------------------: | ---------------------: | ----------------------------: |
| Počáteční nastavení             |    8.000 |    8.000 |                   64 |                           16.000 |                                        8 |                      8 |                         2.000 |
| Vklad čtyř od každého typu |   12.000 |   12.000 |                  144 |                           24.000 |                                        4 |                     12 |                         2.000 |
| Vklad dvou od každého typu  |   14.000 |   14.000 |                  196 |                           28.000 |                                        2 |                     14 |                         2.000 |
| Vklad nestejné hodnoty     |   18.000 |   14.000 |                  252 |                           32.000 |                                        0 |                     14 |                        ~2.286 |
| Po arbitráži           |  ~15.874 |  ~15.874 |                  252 |                          ~31.748 |                                        0 |                     14 |                        ~2.267 |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

Použijte funkci `UniswapV2ERC20._mint` ke skutečnému vytvoření dalších tokenů likvidity a dejte je na správný účet.

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 a reserve1 jsou aktuální
        emit Mint(msg.sender, amount0, amount1);
    }
```

Aktualizujte stavové proměnné (`reserve0`, `reserve1` a v případě potřeby `kLast`) a emitujte příslušnou událost.

##### burn

```solidity
    // tato nízkoúrovňová funkce by měla být volána z kontraktu, který provádí důležité bezpečnostní kontroly
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

Tato funkce je volána, když je likvidita vybrána a příslušné tokeny likvidity je třeba spálit.
Měla by být také volána [z periferního účtu](#uniswapv2router02).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // úspora gasu
        address _token0 = token0;                                // úspora gasu
        address _token1 = token1;                                // úspora gasu
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

Periferní kontrakt převedl likviditu, která má být spálena, do tohoto kontraktu před voláním. Tímto způsobem víme, kolik likvidity spálit, a můžeme se ujistit, že bude spálena.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // úspora gasu, musí být definováno zde, protože totalSupply se může aktualizovat v _mintFee
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

Zbytek funkce `burn` je zrcadlovým obrazem funkce `mint` výše.

##### swap

```solidity
    // tato nízkoúrovňová funkce by měla být volána z kontraktu, který provádí důležité bezpečnostní kontroly
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

Tato funkce by měla být také volána z [periferního kontraktu](#uniswapv2router02).

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // úspora gasu
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // rozsah pro _token{0,1}, zabraňuje chybám stack too deep
```

Lokální proměnné mohou být uloženy buď v paměti, nebo, pokud jich není příliš mnoho, přímo na zásobníku (stack).
Pokud můžeme omezit počet tak, abychom použili zásobník, spotřebujeme méně gasu. Další podrobnosti naleznete v [yellow paper, formálních specifikacích Etherea](https://ethereum.github.io/yellowpaper/paper.pdf), str. 26, rovnice 298.

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // optimisticky převést tokeny
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // optimisticky převést tokeny
```

Tento převod je optimistický, protože převádíme dříve, než si budeme jisti, že jsou splněny všechny podmínky. V Ethereu je to v pořádku, protože pokud podmínky nebudou splněny později ve volání, zvrátíme ho a jakékoli změny, které vytvořil.

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

Na požádání informujte příjemce o swapu.

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

Získejte aktuální zůstatky. Periferní kontrakt nám pošle tokeny předtím, než nás zavolá pro swap. To usnadňuje kontraktu zkontrolovat, že není podváděn, což je kontrola, která se _musí_ stát v hlavním kontraktu (protože můžeme být voláni jinými subjekty než naším periferním kontraktem).

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // rozsah pro reserve{0,1}Adjusted, zabraňuje chybám stack too deep
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

Toto je kontrola správnosti (sanity check), abychom se ujistili, že na swapu neproděláme. Neexistuje žádná okolnost, za které by swap měl snížit `reserve0*reserve1`. Zde také zajišťujeme, že je při swapu odeslán poplatek 0,3 %; před kontrolou správnosti hodnoty K vynásobíme oba zůstatky 1000 a odečteme částky vynásobené 3, to znamená, že 0,3 % (3/1000 = 0,003 = 0,3 %) je odečteno ze zůstatku před porovnáním jeho hodnoty K s hodnotou K aktuálních rezerv.

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

Aktualizujte `reserve0` a `reserve1` a v případě potřeby akumulátory cen a časové razítko a emitujte událost.

##### Synchronizace nebo Skim

Je možné, že se skutečné zůstatky dostanou mimo synchronizaci s rezervami, o kterých si směnárna párů myslí, že je má.
Neexistuje způsob, jak vybrat tokeny bez souhlasu kontraktu, ale vklady jsou jiná věc. Účet může převést tokeny na směnárnu, aniž by zavolal `mint` nebo `swap`.

V takovém případě existují dvě řešení:

- `sync`, aktualizovat rezervy na aktuální zůstatky
- `skim`, vybrat částku navíc. Všimněte si, že jakýkoli účet má povoleno volat `skim`, protože nevíme, kdo tokeny vložil. Tato informace je emitována v události, ale události nejsou z blockchainu přístupné.

```solidity
    // vynutit, aby zůstatky odpovídaly rezervám
    function skim(address to) external lock {
        address _token0 = token0; // úspora gasu
        address _token1 = token1; // úspora gasu
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }



    // vynutit, aby rezervy odpovídaly zůstatkům
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
}
```

### UniswapV2Factory.sol {#uniswapv2factory}

[Tento kontrakt](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol) vytváří směnárny párů.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToSetter;
```

Tyto stavové proměnné jsou nezbytné k implementaci poplatku za protokol (viz [bílá kniha](https://app.uniswap.org/whitepaper.pdf), str. 5).
Adresa `feeTo` shromažďuje tokeny likvidity pro poplatek za protokol a `feeToSetter` je adresa, která má povoleno změnit `feeTo` na jinou adresu.

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

Tyto proměnné sledují páry, směnárny mezi dvěma typy tokenů.

První z nich, `getPair`, je mapování, které identifikuje kontrakt směnárny párů na základě dvou tokenů ERC-20, které směňuje. Tokeny ERC-20 jsou identifikovány adresami kontraktů, které je implementují, takže klíče a hodnota jsou všechny adresy. Chcete-li získat adresu směnárny párů, která vám umožní převést z `tokenA` na `tokenB`, použijete `getPair[<tokenA address>][<tokenB address>]` (nebo naopak).

Druhá proměnná, `allPairs`, je pole, které obsahuje všechny adresy směnáren párů vytvořených touto továrnou. V Ethereu nemůžete iterovat přes obsah mapování nebo získat seznam všech klíčů, takže tato proměnná je jediným způsobem, jak zjistit, které směnárny tato továrna spravuje.

Poznámka: Důvodem, proč nemůžete iterovat přes všechny klíče mapování, je to, že ukládání dat kontraktu je _drahé_, takže čím méně ho používáme, tím lépe, a čím méně často ho měníme,
tím lépe. Můžete vytvořit [mapování, která podporují iteraci](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol), ale vyžadují další úložiště pro seznam klíčů. Ve většině aplikací to nepotřebujete.

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

Tato událost je emitována při vytvoření nové směnárny párů. Zahrnuje adresy tokenů, adresu směnárny párů a celkový počet směnáren spravovaných továrnou.

```solidity
    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }
```

Jediná věc, kterou konstruktor dělá, je specifikace `feeToSetter`. Továrny začínají bez poplatku a pouze `feeSetter` to může změnit.

```solidity
    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
```

Tato funkce vrací počet směnných párů.

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

Toto je hlavní funkce továrny, vytvořit směnárnu párů mezi dvěma tokeny ERC-20. Všimněte si, že tuto funkci může zavolat kdokoli. K vytvoření nové směnárny párů nepotřebujete povolení od Uniswapu.

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

Chceme, aby adresa nové směnárny byla deterministická, aby ji bylo možné vypočítat předem offchain (to může být užitečné pro [transakce na vrstvě 2 (l2)](/developers/docs/scaling/)).
K tomu potřebujeme mít konzistentní pořadí adres tokenů, bez ohledu na pořadí, ve kterém jsme je obdrželi, takže je zde seřadíme.

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // jediná kontrola je dostatečná
```

Velké fondy likvidity jsou lepší než malé, protože mají stabilnější ceny. Nechceme mít více než jeden fond likvidity na pár tokenů. Pokud již směnárna existuje, není třeba vytvářet další pro stejný pár.

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

K vytvoření nového kontraktu potřebujeme kód, který jej vytvoří (jak funkci konstruktoru, tak kód, který zapíše do paměti bajtkód EVM samotného kontraktu). Normálně v Solidity používáme pouze `addr = new <name of contract>(<constructor parameters>)` a kompilátor se o vše postará za nás, ale abychom měli deterministickou adresu kontraktu, musíme použít [operační kód CREATE2](https://eips.ethereum.org/EIPS/eip-1014).
Když byl tento kód napsán, tento operační kód ještě nebyl v Solidity podporován, takže bylo nutné kód získat ručně. To už není problém, protože [Solidity nyní podporuje CREATE2](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2).

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

Když operační kód ještě není v Solidity podporován, můžeme jej zavolat pomocí [inline assembly](https://docs.soliditylang.org/en/v0.8.3/assembly.html).

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

Zavolejte funkci `initialize`, abyste nové směnárně řekli, jaké dva tokeny směňuje.

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // naplnit mapování v opačném směru
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }
```

Uložte informace o novém páru do stavových proměnných a emitujte událost, abyste informovali svět o nové směnárně párů.

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

### UniswapV2ERC20.sol {#uniswapv2erc20}

[Tento kontrakt](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol) implementuje token likvidity ERC-20. Je podobný [kontraktu ERC-20 od OpenZeppelin](/developers/tutorials/erc20-annotated-code), takže vysvětlím pouze část, která se liší, funkcionalitu `permit`.

Transakce na Ethereu stojí ether (ETH), což je ekvivalent skutečných peněz. Pokud máte tokeny ERC-20, ale nemáte ETH, nemůžete odesílat transakce, takže s nimi nemůžete nic dělat. Jedním z řešení, jak se tomuto problému vyhnout, jsou [metatransakce](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions).
Vlastník tokenů podepíše transakci, která umožňuje někomu jinému vybrat tokeny offchain, a odešle ji pomocí internetu příjemci. Příjemce, který má ETH, pak odešle povolení jménem vlastníka.

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

Tento hash je [identifikátor typu transakce](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash). Jediný, který zde podporujeme, je `Permit` s těmito parametry.

```solidity
    mapping(address => uint) public nonces;
```

Pro příjemce není proveditelné zfalšovat digitální podpis. Je však triviální odeslat stejnou transakci dvakrát (to je forma [útoku přehráním (replay attack)](https://wikipedia.org/wiki/Replay_attack)). Abychom tomu zabránili, používáme [nonce](https://wikipedia.org/wiki/Cryptographic_nonce). Pokud nonce nového `Permit` není o jedna větší než poslední použitá, předpokládáme, že je neplatná.

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

Toto je kód pro načtení [identifikátoru řetězce](https://chainid.network/). Používá dialekt EVM assembly zvaný [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html). Všimněte si, že v aktuální verzi Yul musíte použít `chainid()`, nikoli `chainid`.

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

Toto je funkce, která implementuje oprávnění. Jako parametry přijímá příslušná pole a tři skalární hodnoty pro [podpis](https://yos.io/2018/11/16/ethereum-signatures/) (v, r a s).

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

`abi.encodePacked(...)` je zpráva, kterou očekáváme, že dostaneme. Víme, jaká by měla být nonce, takže není nutné, abychom ji dostali jako parametr.

Algoritmus podpisu Etherea očekává, že k podpisu dostane 256 bitů, takže používáme hashovací funkci `keccak256`.

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

Z hashe (digest) a podpisu můžeme získat adresu, která jej podepsala, pomocí [ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/).

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

Pokud je vše v pořádku, považujte to za [schválení (approve) ERC-20](https://eips.ethereum.org/EIPS/eip-20#approve).

## Periferní kontrakty {#periphery-contracts}

Periferní kontrakty jsou API (rozhraní pro programování aplikací) pro Uniswap. Jsou dostupné pro externí volání, ať už z jiných kontraktů nebo decentralizovaných aplikací. Mohli byste volat hlavní (core) kontrakty přímo, ale to je složitější a v případě chyby byste mohli přijít o hodnotu. Hlavní kontrakty obsahují pouze testy, které zajišťují, že nebudou podvedeny, nikoli kontroly smysluplnosti (sanity checks) pro kohokoli jiného. Ty se nacházejí v periferních kontraktech, aby mohly být podle potřeby aktualizovány.

### UniswapV2Router01.sol {#uniswapv2router01}

[Tento kontrakt](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol) má problémy a [už by se neměl používat](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01). Naštěstí jsou periferní kontrakty bezstavové (stateless) a nedrží žádná aktiva, takže je snadné jej označit za zastaralý a doporučit lidem, aby místo něj použili náhradu `UniswapV2Router02`.

### UniswapV2Router02.sol {#uniswapv2router02}

Ve většině případů byste Uniswap používali prostřednictvím [tohoto kontraktu](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol).
Jak jej používat, se můžete podívat [zde](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02).

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

S většinou z nich jsme se už setkali, nebo jsou celkem zřejmé. Jedinou výjimkou je `IWETH.sol`. Uniswap v2 umožňuje směnu jakéhokoli páru tokenů ERC-20, ale samotný ether (ETH) není token ERC-20. Vznikl před tímto standardem a převádí se pomocí unikátních mechanismů. Aby bylo možné používat ETH v kontraktech, které pracují s tokeny ERC-20, přišli lidé s kontraktem pro [zabalený ether (WETH)](https://weth.tkn.eth.limo/). Pošlete tomuto kontraktu ETH a on vám vyrazí ekvivalentní množství WETH. Nebo můžete WETH spálit a získat ETH zpět.

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

Router potřebuje vědět, jakou továrnu (factory) použít, a pro transakce, které vyžadují WETH, jaký kontrakt WETH použít. Tyto hodnoty jsou [neměnné](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables), což znamená, že je lze nastavit pouze v konstruktoru. To dává uživatelům jistotu, že je nikdo nebude moci změnit tak, aby ukazovaly na méně poctivé kontrakty.

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

Tento modifikátor zajišťuje, že časově omezené transakce („udělej X před časem Y, pokud můžeš“) neproběhnou po uplynutí jejich časového limitu.

```solidity
    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }
```

Konstruktor pouze nastavuje neměnné stavové proměnné.

```solidity
    receive() external payable {
        assert(msg.sender == WETH); // přijímat ETH pouze přes fallback z kontraktu WETH
    }
```

Tato funkce se volá, když vybíráme tokeny z kontraktu WETH zpět na ETH. K tomu je oprávněn pouze kontrakt WETH, který používáme.

#### Přidání likvidity {#add-liquidity}

Tyto funkce přidávají tokeny do párové směnárny, což zvětšuje fond likvidity.

```solidity

    // **** PŘIDAT LIKVIDITU ****
    function _addLiquidity(
```

Tato funkce se používá k výpočtu množství tokenů A a B, které by měly být vloženy do párové směnárny.

```solidity
        address tokenA,
        address tokenB,
```

Toto jsou adresy kontraktů tokenů ERC-20.

```solidity
        uint amountADesired,
        uint amountBDesired,
```

Toto jsou částky, které chce poskytovatel likvidity vložit. Jsou to zároveň maximální částky A a B, které mají být vloženy.

```solidity
        uint amountAMin,
        uint amountBMin
```

Toto jsou minimální přijatelné částky pro vklad. Pokud transakce nemůže proběhnout s těmito nebo vyššími částkami, dojde k jejímu zvrácení (revert). Pokud tuto funkci nechcete, jednoduše zadejte nulu.

Poskytovatelé likvidity obvykle specifikují minimum, protože chtějí omezit transakci na směnný kurz, který se blíží tomu aktuálnímu. Pokud směnný kurz příliš kolísá, může to znamenat novinky, které mění podkladové hodnoty, a oni se chtějí manuálně rozhodnout, co dělat.

Představte si například případ, kdy je směnný kurz jedna ku jedné a poskytovatel likvidity zadá tyto hodnoty:

| Parameter      | Value |
| -------------- | ----: |
| amountADesired |  1000 |
| amountBDesired |  1000 |
| amountAMin     |   900 |
| amountBMin     |   800 |

Dokud se směnný kurz drží mezi 0,9 a 1,25, transakce proběhne. Pokud se směnný kurz dostane mimo toto rozpětí, transakce se zruší.

Důvodem tohoto opatření je, že transakce nejsou okamžité; odešlete je a validátor je nakonec zahrne do bloku (pokud není vaše cena plynu velmi nízká, v takovém případě budete muset odeslat další transakci se stejnou hodnotou nonce a vyšší cenou plynu, abyste ji přepsali). Nemůžete ovlivnit, co se stane v intervalu mezi odesláním a zahrnutím.

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

Pokud jsou aktuální rezervy prázdné, jedná se o novou párovou směnárnu. Částky k vložení by měly být přesně stejné jako ty, které chce poskytovatel likvidity poskytnout.

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

Pokud potřebujeme zjistit, jaké budou částky, získáme optimální částku pomocí [této funkce](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35). Chceme stejný poměr, jako mají aktuální rezervy.

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

Pokud je `amountBOptimal` menší než částka, kterou chce poskytovatel likvidity vložit, znamená to, že token B je v současnosti cennější, než si vkladatel likvidity myslí, takže je potřeba menší částka.

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

Pokud je optimální částka B vyšší než požadovaná částka B, znamená to, že tokeny B jsou v současnosti méně cenné, než si vkladatel likvidity myslí, takže je potřeba vyšší částka. Požadovaná částka je však maximum, takže to nemůžeme udělat. Místo toho vypočítáme optimální počet tokenů A pro požadované množství tokenů B.

Když to všechno spojíme, dostaneme tento graf. Předpokládejme, že se snažíte vložit tisíc tokenů A (modrá čára) a tisíc tokenů B (červená čára). Osa x představuje směnný kurz, A/B. Pokud x=1, mají stejnou hodnotu a vložíte od každého tisíc. Pokud x=2, má A dvojnásobnou hodnotu než B (za každý token A dostanete dva tokeny B), takže vložíte tisíc tokenů B, ale pouze 500 tokenů A. Pokud x=0,5, situace je opačná, tisíc tokenů A a pět set tokenů B.

![Graph](liquidityProviderDeposit.png)

Likviditu byste mohli vložit přímo do hlavního kontraktu (pomocí [UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110)), ale hlavní kontrakt pouze kontroluje, zda není sám podveden, takže se vystavujete riziku ztráty hodnoty, pokud se směnný kurz změní mezi okamžikem odeslání transakce a jejím provedením. Pokud použijete periferní kontrakt, ten vypočítá částku, kterou byste měli vložit, a okamžitě ji vloží, takže se směnný kurz nezmění a vy o nic nepřijdete.

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

Tuto funkci lze zavolat transakcí pro vložení likvidity. Většina parametrů je stejná jako u `_addLiquidity` výše, se dvěma výjimkami:

. `to` je adresa, na kterou se vyrazí nové tokeny likvidity, aby ukazovaly podíl poskytovatele likvidity ve fondu
. `deadline` je časový limit transakce

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

Vypočítáme částky, které se mají skutečně vložit, a poté najdeme adresu fondu likvidity. Abychom ušetřili gas, neděláme to dotazem na továrnu, ale pomocí funkce knihovny `pairFor` (viz níže v knihovnách).

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

Převeďte správné částky tokenů od uživatele do párové směnárny.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
    }
```

Na oplátku dejte adrese `to` tokeny likvidity za částečné vlastnictví fondu. Funkce `mint` hlavního kontraktu zjistí, kolik má tokenů navíc (v porovnání s tím, co měl při poslední změně likvidity), a podle toho vyrazí likviditu.

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

Když chce poskytovatel likvidity poskytnout likviditu do párové směnárny Token/ETH, existuje několik rozdílů. Kontrakt se postará o zabalení ETH pro poskytovatele likvidity. Není třeba specifikovat, kolik ETH chce uživatel vložit, protože je uživatel jednoduše pošle s transakcí (částka je k dispozici v `msg.value`).

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

Pro vložení ETH jej kontrakt nejprve zabalí do WETH a poté převede WETH do páru. Všimněte si, že převod je zabalen v `assert`. To znamená, že pokud převod selže, selže i toto volání kontraktu, a proto k zabalení ve skutečnosti nedojde.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // vrátit zbytkový ether, pokud nějaký je
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }
```

Uživatel nám již poslal ETH, takže pokud nějaké zbyde (protože druhý token je méně cenný, než si uživatel myslel), musíme provést vrácení peněz.

#### Odebrání likvidity {#remove-liquidity}

Tyto funkce odeberou likviditu a vyplatí poskytovatele likvidity.

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

Nejjednodušší případ odebrání likvidity. Existuje minimální množství každého tokenu, které poskytovatel likvidity souhlasí přijmout, a musí k tomu dojít před uplynutím lhůty.

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // odeslat likviditu do páru
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

Funkce `burn` hlavního kontraktu se stará o vyplacení tokenů zpět uživateli.

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

Když funkce vrací více hodnot, ale nás zajímají jen některé z nich, takto získáme pouze tyto hodnoty. Z hlediska gasu je to o něco levnější než přečíst hodnotu a nikdy ji nepoužít.

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

Převeďte částky ze způsobu, jakým je vrací hlavní kontrakt (token s nižší adresou jako první), na způsob, jaký očekává uživatel (odpovídající `tokenA` a `tokenB`).

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

Je v pořádku provést převod jako první a poté ověřit, zda je legitimní, protože pokud není, zvrátíme (revert) všechny změny stavu.

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

Odebrání likvidity pro ETH je téměř stejné, s tím rozdílem, že obdržíme tokeny WETH a poté je směníme za ETH, které vrátíme poskytovateli likvidity.

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

Tyto funkce předávají meta-transakce, aby umožnily uživatelům bez etheru vybírat z fondu pomocí [mechanismu povolení (permit)](#uniswapv2erc20).

```solidity

    // **** ODEBRAT LIKVIDITU (s podporou tokenů s poplatkem při převodu) ****
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

Tuto funkci lze použít pro tokeny, které mají poplatky za převod nebo uložení. Když má token takové poplatky, nemůžeme se spoléhat na to, že nám funkce `removeLiquidity` řekne, kolik tokenu dostaneme zpět, takže musíme nejprve provést výběr a poté zjistit zůstatek.

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

Poslední funkce kombinuje poplatky za uložení s meta-transakcemi.

#### Obchodování {#trade}

```solidity
    // **** SWAP ****
    // vyžaduje, aby počáteční částka již byla odeslána do prvního páru
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

Tato funkce provádí interní zpracování, které je vyžadováno pro funkce vystavené obchodníkům.

```solidity
        for (uint i; i < path.length - 1; i++) {
```

V době psaní tohoto textu existuje [388 160 tokenů ERC-20](https://eth.blockscout.com/tokens). Kdyby pro každý pár tokenů existovala párová směnárna, bylo by to přes 150 miliard párových směnáren. Celý řetězec má v současné době [pouze 0,1 % tohoto počtu účtů](https://eth.blockscout.com/stats/accountsGrowth). Místo toho funkce swapu podporují koncept cesty (path). Obchodník může směnit A za B, B za C a C za D, takže není potřeba přímá párová směnárna A-D.

Ceny na těchto trzích bývají synchronizované, protože když nejsou, vytváří to příležitost pro arbitráž. Představte si například tři tokeny, A, B a C. Existují tři párové směnárny, jedna pro každý pár.

1. Výchozí situace
2. Obchodník prodá 24,695 tokenů A a získá 25,305 tokenů B.
3. Obchodník prodá 24,695 tokenů B za 25,305 tokenů C, přičemž si ponechá přibližně 0,61 tokenů B jako zisk.
4. Poté obchodník prodá 24,695 tokenů C za 25,305 tokenů A, přičemž si ponechá přibližně 0,61 tokenů C jako zisk. Obchodník má také 0,61 tokenů A navíc (25,305, se kterými obchodník skončí, minus původní investice 24,695).

| Krok | Směnárna A-B                | Směnárna B-C                | Směnárna A-C                |
| ---- | --------------------------- | --------------------------- | --------------------------- |
| 1    | A:1000 B:1050 A/B=1.05      | B:1000 C:1050 B/C=1.05      | A:1050 C:1000 C/A=1.05      |
| 2    | A:1024.695 B:1024.695 A/B=1 | B:1000 C:1050 B/C=1.05      | A:1050 C:1000 C/A=1.05      |
| 3    | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1050 C:1000 C/A=1.05      |
| 4    | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1024.695 C:1024.695 C/A=1 |

```solidity
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
```

Získejte pár, který právě zpracováváme, seřaďte jej (pro použití s párem) a získejte očekávanou výstupní částku.

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

Získejte očekávané výstupní částky, seřazené tak, jak je párová směnárna očekává.

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

Je toto poslední směna? Pokud ano, pošlete tokeny získané za obchod na cílovou adresu. Pokud ne, pošlete je do další párové směnárny.

```solidity

            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

Skutečně zavolejte párovou směnárnu pro swap tokenů. Nepotřebujeme zpětné volání (callback), které by nás o směně informovalo, takže v tomto poli neposíláme žádné bajty.

```solidity
    function swapExactTokensForTokens(
```

Tuto funkci používají přímo obchodníci ke swapu jednoho tokenu za jiný.

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

Tento parametr obsahuje adresy kontraktů ERC-20. Jak bylo vysvětleno výše, jedná se o pole, protože možná budete muset projít několika párovými směnárnami, abyste se dostali od aktiva, které máte, k aktivu, které chcete.

Parametr funkce v Solidity může být uložen buď v `memory` nebo v `calldata`. Pokud je funkce vstupním bodem do kontraktu, volaným přímo od uživatele (pomocí transakce) nebo z jiného kontraktu, pak lze hodnotu parametru převzít přímo z dat volání (call data). Pokud je funkce volána interně, jako `_swap` výše, pak musí být parametry uloženy v `memory`. Z pohledu volaného kontraktu jsou `calldata` pouze pro čtení.

U skalárních typů, jako je `uint` nebo `address`, řeší kompilátor volbu úložiště za nás, ale u polí, která jsou delší a dražší, specifikujeme typ úložiště, které se má použít.

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

Vypočítejte částku, která má být nakoupena v každém swapu. Pokud je výsledek menší než minimum, které je obchodník ochoten přijmout, zvrátí (revert) se transakce.

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

Nakonec převeďte počáteční token ERC-20 na účet pro první párovou směnárnu a zavolejte `_swap`. To vše se děje ve stejné transakci, takže párová směnárna ví, že jakékoli neočekávané tokeny jsou součástí tohoto převodu.

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

Předchozí funkce, `swapTokensForTokens`, umožňuje obchodníkovi specifikovat přesný počet vstupních tokenů, které je ochoten dát, a minimální počet výstupních tokenů, které je ochoten za ně přijmout. Tato funkce provádí reverzní swap, umožňuje obchodníkovi specifikovat počet výstupních tokenů, které chce, a maximální počet vstupních tokenů, které je za ně ochoten zaplatit.

V obou případech musí obchodník nejprve poskytnout tomuto perifernímu kontraktu povolený limit (allowance), aby mu umožnil jejich převod.

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
        // vrátit zbytkový ether, pokud nějaký je
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }
```

Všechny tyto čtyři varianty zahrnují obchodování mezi ETH a tokeny. Jediný rozdíl je v tom, že buď obdržíme ETH od obchodníka a použijeme jej k vyražení WETH, nebo obdržíme WETH z poslední směnárny na cestě a spálíme jej, přičemž obchodníkovi pošleme zpět výsledné ETH.

```solidity
    // **** SWAP (s podporou tokenů s poplatkem při převodu) ****
    // vyžaduje, aby počáteční částka již byla odeslána do prvního páru
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
```

Toto je interní funkce pro swap tokenů, které mají poplatky za převod nebo uložení, k vyřešení ([tohoto problému](https://github.com/Uniswap/uniswap-interface/issues/835)).

```solidity
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output));
            uint amountInput;
            uint amountOutput;
            { // rozsah pro zabránění chybám stack too deep
            (uint reserve0, uint reserve1,) = pair.getReserves();
            (uint reserveInput, uint reserveOutput) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
            amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
            amountOutput = UniswapV2Library.getAmountOut(amountInput, reserveInput, reserveOutput);
```

Kvůli poplatkům za převod se nemůžeme spoléhat na to, že nám funkce `getAmountsOut` řekne, kolik získáme z každého převodu (jak to děláme před voláním původní `_swap`). Místo toho musíme nejprve provést převod a poté zjistit, kolik tokenů jsme dostali zpět.

Poznámka: Teoreticky bychom mohli použít tuto funkci místo `_swap`, ale v určitých případech (například pokud je převod nakonec zvrácen, protože na konci není dostatek k dosažení požadovaného minima) by to nakonec stálo více gasu. Tokeny s poplatkem za převod jsou poměrně vzácné, takže i když se jim musíme přizpůsobit, není nutné, aby všechny swapy předpokládaly, že projdou alespoň jedním z nich.

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

Toto jsou stejné varianty používané pro normální tokeny, ale místo toho volají `_swapSupportingFeeOnTransferTokens`.

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

Tyto funkce jsou pouze proxy, které volají [funkce UniswapV2Library](#uniswapv2library).

### UniswapV2Migrator.sol {#uniswapv2migrator}

Tento kontrakt se používal k migraci směnáren ze staré v1 na v2. Nyní, když byly migrovány, již není relevantní.

## Knihovny {#libraries}

[Knihovna SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) je dobře zdokumentovaná, takže není potřeba ji zde dokumentovat.

### Math {#math}

Tato knihovna obsahuje některé matematické funkce, které v kódu Solidity běžně nejsou potřeba, a proto nejsou součástí jazyka.

```solidity
pragma solidity =0.5.16;

// knihovna pro provádění různých matematických operací

library Math {
    function min(uint x, uint y) internal pure returns (uint z) {
        z = x < y ? x : y;
    }

    // babylonská metoda (https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
```

Začněte s x jako odhadem, který je vyšší než druhá odmocnina (to je důvod, proč musíme s 1-3 zacházet jako se speciálními případy).

```solidity
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
```

Získejte přesnější odhad, průměr předchozího odhadu a čísla, jehož druhou odmocninu se snažíme najít, vyděleného předchozím odhadem. Opakujte, dokud nový odhad nebude nižší než ten stávající. Pro více podrobností [se podívejte sem](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method).

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

Nikdy bychom neměli potřebovat druhou odmocninu z nuly. Druhé odmocniny z jedné, dvou a tří jsou zhruba jedna (používáme celá čísla, takže zlomky ignorujeme).

```solidity
        }
    }
}
```

### Zlomky s pevnou řádovou čárkou (UQ112x112) {#fixedpoint}

Tato knihovna zpracovává zlomky, které běžně nejsou součástí aritmetiky Etherea. Dělá to tak, že zakóduje číslo _x_ jako _x\*2^112_. To nám umožňuje používat původní operační kódy pro sčítání a odčítání beze změny.

```solidity
pragma solidity =0.5.16;

// knihovna pro práci s binárními čísly s pevnou řádovou čárkou (https://wikipedia.org/wiki/Q_(number_format))

// rozsah: [0, 2**112 - 1]
// rozlišení: 1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112` je kódování pro jedničku.

```solidity
    // zakódovat uint112 jako UQ112x112
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // nikdy nepřeteče
    }
```

Protože y je `uint112`, může být maximálně 2^112-1. Toto číslo lze stále zakódovat jako `UQ112x112`.

```solidity
    // vydělit UQ112x112 pomocí uint112, vrací UQ112x112
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

Pokud vydělíme dvě hodnoty `UQ112x112`, výsledek už není vynásoben 2^112. Místo toho tedy vezmeme celé číslo pro jmenovatele. Podobný trik bychom museli použít i pro násobení, ale násobení hodnot `UQ112x112` nepotřebujeme provádět.

### UniswapV2Library {#uniswapv2library}

Tato knihovna je používána pouze periferními kontrakty

```solidity
pragma solidity >=0.5.0;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import "./SafeMath.sol";

library UniswapV2Library {
    using SafeMath for uint;

    // vrací seřazené adresy tokenů, používá se ke zpracování návratových hodnot z párů seřazených v tomto pořadí
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
```

Seřaďte dva tokeny podle adresy, abychom pro ně mohli získat adresu párové směnárny. To je nutné, protože jinak bychom měli dvě možnosti, jednu pro parametry A,B a druhou pro parametry B,A, což by vedlo ke dvěma směnárnám místo jedné.

```solidity
    // vypočítá adresu CREATE2 pro pár bez provádění jakýchkoli externích volání
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f' // hash init kódu
            ))));
    }
```

Tato funkce vypočítá adresu párové směnárny pro dva tokeny. Tento kontrakt je vytvořen pomocí [operačního kódu CREATE2](https://eips.ethereum.org/EIPS/eip-1014), takže můžeme vypočítat adresu pomocí stejného algoritmu, pokud známe parametry, které používá. To je mnohem levnější než se ptát továrny (factory), a

```solidity
    // načte a seřadí rezervy pro pár
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

Tato funkce vrací rezervy dvou tokenů, které má párová směnárna. Všimněte si, že může přijímat tokeny v libovolném pořadí a pro interní použití si je seřadí.

```solidity
    // na základě určitého množství aktiva a rezerv páru vrací ekvivalentní množství druhého aktiva
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

Tato funkce vám poskytne množství tokenu B, které získáte výměnou za token A, pokud není účtován žádný poplatek. Tento výpočet bere v úvahu, že převod mění směnný kurz.

```solidity
    // na základě vstupního množství aktiva a rezerv páru vrací maximální výstupní množství druhého aktiva
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
```

Výše uvedená funkce `quote` funguje skvěle, pokud za použití párové směnárny není žádný poplatek. Pokud je však poplatek za směnu 0,3 %, částka, kterou skutečně dostanete, je nižší. Tato funkce vypočítá částku po odečtení poplatku za směnu.

```solidity

        require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }
```

Solidity nativně nezpracovává zlomky, takže nemůžeme částku jednoduše vynásobit 0,997. Místo toho vynásobíme čitatele 997 a jmenovatele 1000, čímž dosáhneme stejného efektu.

```solidity
    // na základě výstupního množství aktiva a rezerv páru vrací požadované vstupní množství druhého aktiva
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
        require(amountOut > 0, 'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint numerator = reserveIn.mul(amountOut).mul(1000);
        uint denominator = reserveOut.sub(amountOut).mul(997);
        amountIn = (numerator / denominator).add(1);
    }
```

Tato funkce dělá zhruba to samé, ale získá výstupní částku a poskytne vstupní.

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

Tyto dvě funkce se starají o identifikaci hodnot, když je nutné projít několika párovými směnárnami.

### Transfer Helper {#transfer-helper}

[Tato knihovna](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol) přidává kontroly úspěšnosti kolem převodů ERC-20 a Etherea, aby se zvrácení (revert) a vrácení hodnoty `false` zpracovávaly stejným způsobem.

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.0;

// pomocné metody pro interakci s ERC-20 tokeny a odesílání ETH, které nevracejí konzistentně true/false
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

- Použít definici rozhraní k vytvoření volání funkce
- Použít [aplikační binární rozhraní (ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html) „ručně“ k vytvoření volání. Takto se to rozhodl udělat autor kódu.

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

Z důvodu zpětné kompatibility s tokeny, které byly vytvořeny před standardem ERC-20, může volání ERC-20 selhat buď zvrácením (v takovém případě je `success` `false`), nebo tím, že je úspěšné a vrátí hodnotu `false` (v takovém případě existují výstupní data, a pokud je dekódujete jako boolean, získáte `false`).

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

Tato funkce implementuje [funkcionalitu převodu ERC-20](https://eips.ethereum.org/EIPS/eip-20#transfer), která umožňuje účtu utratit povolený limit poskytnutý jiným účtem.

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

Tato funkce implementuje [funkcionalitu transferFrom ERC-20](https://eips.ethereum.org/EIPS/eip-20#transferfrom), která umožňuje účtu utratit povolený limit poskytnutý jiným účtem.

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

Tato funkce převádí ether na účet. Jakékoli volání jiného kontraktu se může pokusit odeslat ether. Protože ve skutečnosti nepotřebujeme volat žádnou funkci, neposíláme s voláním žádná data.

## Závěr {#conclusion}

Toto je dlouhý článek o zhruba 50 stranách. Pokud jste se dostali až sem, gratulujeme! Doufejme, že jste nyní pochopili, co je třeba zvážit při psaní reálné aplikace (na rozdíl od krátkých ukázkových programů), a jste lépe připraveni psát kontrakty pro své vlastní případy použití.

Nyní běžte, napište něco užitečného a ohromte nás.

[Zde najdete více z mé práce](https://cryptodocguy.pro/).