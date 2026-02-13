---
title: "Podrobný průvodce kontraktem ERC-20"
description: "Co je v kontraktu OpenZeppelin ERC-20 a proč se tam nachází?"
author: Ori Pomerantz
lang: cs
tags: [ "solidity", "erc-20" ]
skill: beginner
published: 2021-03-09
---

## Úvod {#introduction}

Jedním z nejčastějších způsobů využití Etherea je vytvoření obchodovatelného tokenu pro skupinu, v podstatě jejich vlastní měny. Tyto tokeny obvykle dodržují standard
[ERC-20](/developers/docs/standards/tokens/erc-20/). Tento standard umožňuje psát nástroje, jako jsou pooly likvidity a peněženky, které fungují se všemi tokeny ERC-20. V tomto článku budeme analyzovat implementaci [OpenZeppelin Solidity ERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol) a také [definici rozhraní](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol).

Jedná se o anotovaný zdrojový kód. Chcete-li implementovat ERC-20,
[přečtěte si tento návod](https://docs.openzeppelin.com/contracts/2.x/erc20-supply).

## Rozhraní {#the-interface}

Účelem standardu, jako je ERC-20, je umožnit mnoho implementací tokenů, které jsou interoperabilní napříč aplikacemi, jako jsou peněženky a decentralizované burzy. K tomu vytvoříme [rozhraní](https://www.geeksforgeeks.org/solidity/solidity-basics-of-interface/). Jakýkoli kód, který potřebuje použít kontrakt tokenu,
může použít stejné definice v rozhraní a být kompatibilní se všemi kontrakty tokenu, které jej používají, ať už je to peněženka, jako je MetaMask, dapp, jako je etherscan.io, nebo jiný kontrakt, jako je pool likvidity.

![Ilustrace rozhraní ERC-20](erc20_interface.png)

Pokud jste zkušený programátor, pravděpodobně si pamatujete, že jste podobné konstrukce viděli v [Javě](https://www.w3schools.com/java/java_interface.asp)
nebo dokonce v [hlavičkových souborech C](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html).

Toto je definice [rozhraní ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)
od OpenZeppelin. Jedná se o překlad [lidsky čitelného standardu](https://eips.ethereum.org/EIPS/eip-20) do kódu v Solidity. Samozřejmě samotné
rozhraní nedefinuje, _jak_ se má něco dělat. To je vysvětleno ve zdrojovém kódu kontraktu níže.

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

Soubory v Solidity by měly obsahovat identifikátor licence. [Seznam licencí naleznete zde](https://spdx.org/licenses/). Pokud potřebujete jinou
licenci, jednoduše to vysvětlete v komentářích.

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Jazyk Solidity se stále rychle vyvíjí a nové verze nemusí být kompatibilní se starým kódem
([viz zde](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)). Proto je dobré specifikovat nejen minimální
verzi jazyka, ale také maximální verzi, nejnovější, se kterou jste kód testovali.

&nbsp;

```solidity
/**
 * @dev Rozhraní standardu ERC20, jak je definováno v EIP.
 */
```

Značka @dev v komentáři je součástí [formátu NatSpec](https://docs.soliditylang.org/en/develop/natspec-format.html), který se používá k vytváření
dokumentace ze zdrojového kódu.

&nbsp;

```solidity
interface IERC20 {
```

Podle konvence začínají názvy rozhraní písmenem `I`.

&nbsp;

```solidity
    /**
     * @dev Vrací množství existujících tokenů.
     */
    function totalSupply() external view returns (uint256);
```

Tato funkce je externí (`external`), což znamená, že [ji lze volat pouze z vnějšku kontraktu](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2).
Vrací celkovou zásobu tokenů v kontraktu. Tato hodnota je vrácena pomocí nejběžnějšího typu v Ethereu, 256bitového celého čísla bez znaménka (256 bitů je
nativní velikost slova EVM). Tato funkce je také `view`, což znamená, že nemění stav, takže ji lze provést na jednom uzlu, místo aby ji musel
spouštět každý uzel v blockchainu. Tento druh funkce negeneruje transakci a nestojí žádné [palivo](/developers/docs/gas/).

**Poznámka:** Teoreticky by se mohlo zdát, že tvůrce kontraktu by mohl podvádět vrácením menší celkové zásoby, než je skutečná hodnota, takže by se každý token zdál
cennější, než ve skutečnosti je. Tato obava však ignoruje skutečnou podstatu blockchainu. Vše, co se děje na blockchainu, může být ověřeno
každým uzlem. Aby toho bylo dosaženo, je na každém uzlu k dispozici strojový kód a úložiště každého kontraktu. I když nejste povinni zveřejnit kód vašeho kontraktu v
Solidity, nikdo by vás nebral vážně, pokud nezveřejníte zdrojový kód a verzi Solidity, se kterou byl zkompilován, aby mohl být
ověřen oproti strojovému kódu, který jste poskytli.
Podívejte se například na [tento kontrakt](https://eth.blockscout.com/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD?tab=contract).

&nbsp;

```solidity
    /**
     * @dev Vrací množství tokenů, které vlastní `account`.
     */
    function balanceOf(address account) external view returns (uint256);
```

Jak název napovídá, funkce `balanceOf` vrací zůstatek účtu. Účty Etherea jsou v Solidity identifikovány pomocí typu `address`, který obsahuje 160 bitů.
Je také `external` a `view`.

&nbsp;

```solidity
    /**
     * @dev Přesune tokeny v množství `amount` z účtu volajícího na `recipient`.
     *
     * Vrací booleovskou hodnotu, která udává, zda operace proběhla úspěšně.
     *
     * Vyvolá událost {Transfer}.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

Funkce `transfer` převádí tokeny od volajícího na jinou adresu. To zahrnuje změnu stavu, takže to není `view`.
Když uživatel zavolá tuto funkci, vytvoří se transakce, která stojí palivo. Rovněž vyvolá událost `Transfer`, aby informovala všechny na
blockchainu o této události.

Funkce má dva typy výstupu pro dva různé typy volajících:

- Uživatelé, kteří volají funkci přímo z uživatelského rozhraní. Uživatel obvykle odešle transakci
  a nečeká na odpověď, což může trvat neurčitou dobu. Uživatel může zjistit, co se stalo,
  vyhledáním potvrzení o transakci (které je identifikováno hašem transakce) nebo vyhledáním
  události `Transfer`.
- Jiné kontrakty, které volají funkci jako součást celkové transakce. Tyto kontrakty dostanou výsledek okamžitě,
  protože běží ve stejné transakci, takže mohou použít návratovou hodnotu funkce.

Stejný typ výstupu je vytvořen ostatními funkcemi, které mění stav kontraktu.

&nbsp;

Povolení umožňují účtu utratit některé tokeny, které patří jinému vlastníkovi.
To je užitečné například pro kontrakty, které fungují jako prodejci. Kontrakty nemohou
sledovat události, takže pokud by kupující převedl tokeny přímo na kontrakt prodejce,
tento kontrakt by nevěděl, že mu bylo zaplaceno. Místo toho kupující povolí
kontraktu prodejce utratit určitou částku a prodejce tuto částku převede.
To se děje prostřednictvím funkce, kterou kontrakt prodejce volá, takže kontrakt prodejce
může vědět, zda byl úspěšný.

```solidity
    /**
     * @dev Vrací zbývající počet tokenů, které bude moci `spender`
     * utratit jménem `owner` prostřednictvím {transferFrom}. Ve výchozím nastavení je
     * tato hodnota nulová.
     *
     * Tato hodnota se mění při volání funkcí {approve} nebo {transferFrom}.
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

Funkce `allowance` umožňuje komukoli dotázat se, jaké je povolení, které jedna
adresa (`owner`) umožňuje utratit jiné adrese (`spender`).

&nbsp;

```solidity
    /**
     * @dev Nastaví `amount` jako povolenou částku pro `spender` pro tokeny volajícího.
     *
     * Vrací booleovskou hodnotu, která udává, zda operace proběhla úspěšně.
     *
     * DŮLEŽITÉ: Dejte si pozor, že změna povolení touto metodou s sebou nese riziko,
     * že někdo může nešťastným pořadím transakcí využít jak staré, tak i nové povolení.
     * Jedním z možných řešení, jak tento souběh zmírnit,
     * je nejprve snížit povolení pro utrácejícího na 0 a poté nastavit
     * požadovanou hodnotu:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Vyvolá událost {Approval}.
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

Funkce `approve` vytváří povolení. Nezapomeňte si přečíst zprávu o tom,
jak může být zneužita. V Ethereu ovládáte pořadí svých vlastních transakcí,
ale nemůžete ovládat pořadí, v jakém budou provedeny transakce
jiných lidí, pokud neodešlete vlastní transakci až poté, co uvidíte,
že transakce druhé strany proběhla.

&nbsp;

```solidity
    /**
     * @dev Přesune tokeny v množství `amount` z adresy `sender` na `recipient` pomocí
     * mechanismu povolení. `amount` se poté odečte od povolení volajícího
     * .
     *
     * Vrací booleovskou hodnotu, která udává, zda operace proběhla úspěšně.
     *
     * Vyvolá událost {Transfer}.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Nakonec `transferFrom` použije utrácející k samotnému utracení povolené částky.

&nbsp;

```solidity

    /**
     * @dev Vyvolá se, když se tokeny v hodnotě `value` přesunou z jednoho účtu (`from`) na
     * jiný (`to`).
     *
     * Všimněte si, že `value` může být nula.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Vyvolá se, když je povolení `spendera` pro `ownera` nastaveno
     * voláním {approve}. `value` je nové povolení.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Tyto události jsou emitovány, když se změní stav kontraktu ERC-20.

## Skutečný kontrakt {#the-actual-contract}

Toto je skutečný kontrakt, který implementuje standard ERC-20, [převzato odtud](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Není určen k použití tak, jak je, ale můžete
z něj [dědit](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm) a rozšířit jej na něco použitelného.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### Importní příkazy {#import-statements}

Kromě výše uvedených definic rozhraní importuje definice kontraktu dva další soubory:

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol` jsou definice potřebné k použití [OpenGSN](https://www.opengsn.org/), systému, který umožňuje uživatelům bez etheru
  používat blockchain. Všimněte si, že se jedná o starou verzi, pokud chcete integrovat s OpenGSN,
  [použijte tento návod](https://docs.opengsn.org/javascript-client/tutorial.html).
- [Knihovna SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/), která zabraňuje
  aritmetickému přetečení/podtečení pro verze Solidity **<0.8.0**. V Solidity ≥0.8.0 aritmetické operace automaticky
  vracejí při přetečení/podtečení, takže SafeMath je zbytečná. Tento kontrakt používá SafeMath pro zpětnou kompatibilitu se
  staršími verzemi kompilátoru.

&nbsp;

Tento komentář vysvětluje účel kontraktu.

```solidity
/**
 * @dev Implementace rozhraní {IERC20}.
 *
 * Tato implementace je agnostická vůči způsobu vytváření tokenů. To znamená,
 * že mechanismus dodávání musí být přidán v odvozeném kontraktu pomocí {_mint}.
 * Obecný mechanismus viz {ERC20PresetMinterPauser}.
 *
 * TIP: Podrobný popis naleznete v našem průvodci
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[Jak
 * implementovat mechanismy dodávání].
 *
 * Dodržovali jsme obecné pokyny OpenZeppelin: funkce se při selhání vracejí, místo aby
 * vracely `false`. Toto chování je nicméně konvenční
 * a není v rozporu s očekáváními aplikací ERC20.
 *
 * Navíc se při volání {transferFrom} emituje událost {Approval}.
 * To umožňuje aplikacím rekonstruovat povolení pro všechny účty jen
 * nasloucháním zmíněných událostí. Jiné implementace EIP nemusí tyto události
 * emitovat, protože to není vyžadováno specifikací.
 *
 * Nakonec byly přidány nestandardní funkce {decreaseAllowance} a {increaseAllowance},
 * aby se zmírnily známé problémy kolem nastavování
 * povolení. Viz {IERC20-approve}.
 */

```

### Definice kontraktu {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

Tento řádek specifikuje dědičnost, v tomto případě z `IERC20` z výše uvedeného a `Context`, pro OpenGSN.

&nbsp;

```solidity

    using SafeMath for uint256;

```

Tento řádek připojuje knihovnu `SafeMath` k typu `uint256`. Tuto knihovnu najdete
[zde](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol).

### Definice proměnných {#variable-definitions}

Tyto definice specifikují stavové proměnné kontraktu. Tyto proměnné jsou deklarovány jako soukromé (`private`), ale
to pouze znamená, že je nemohou číst jiné kontrakty na blockchainu. _Na blockchainu neexistují žádná
tajemství_, software na každém uzlu má stav každého kontraktu
v každém bloku. Podle konvence se stavové proměnné pojmenovávají `_<něco>`.

První dvě proměnné jsou [mapování](https://www.tutorialspoint.com/solidity/solidity_mappings.htm),
což znamená, že se chovají zhruba stejně jako [asociativní pole](https://wikipedia.org/wiki/Associative_array),
s výjimkou toho, že klíče jsou číselné hodnoty. Úložiště je přiděleno pouze pro položky, které mají hodnoty odlišné
od výchozí (nula).

```solidity
    mapping (address => uint256) private _balances;
```

První mapování, `_balances`, jsou adresy a jejich příslušné zůstatky tohoto tokenu. Pro přístup
k zůstatku použijte tuto syntaxi: `_balances[<adresa>]`.

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

Tato proměnná, `_allowances`, ukládá povolení vysvětlená dříve. První index je vlastníkem
tokenů a druhý je kontrakt s povolením. Pro přístup k částce, kterou může adresa A
utratit z účtu adresy B, použijte `_allowances[B][A]`.

&nbsp;

```solidity
    uint256 private _totalSupply;
```

Jak název napovídá, tato proměnná sleduje celkovou zásobu tokenů.

&nbsp;

```solidity
    string private _name;
    string private _symbol;
    uint8 private _decimals;
```

Tyto tři proměnné se používají ke zlepšení čitelnosti. První dvě jsou samovysvětlující, ale `_decimals`
není.

Na jedné straně Ethereum nemá proměnné s plovoucí desetinnou čárkou nebo zlomkové proměnné. Na druhé straně,
lidé rádi dělí tokeny. Jedním z důvodů, proč se lidé usadili na zlatě jako měně, bylo to, že
bylo těžké vrátit drobné, když si někdo chtěl koupit hodnotu kachny v kravě.

Řešením je sledovat celá čísla, ale počítat místo skutečného tokenu zlomkový token, který je
téměř bezcenný. V případě etheru se zlomkový token nazývá wei a 10^18 wei se rovná jednomu
ETH. V době psaní tohoto článku je 10 000 000 000 000 wei přibližně jeden americký nebo eurový cent.

Aplikace potřebují vědět, jak zobrazit zůstatek tokenu. Pokud má uživatel 3 141 000 000 000 000 000 wei, je to
3,14 ETH? 31,41 ETH? 3 141 ETH? V případě etheru je definováno 10^18 wei na ETH, ale pro váš
token můžete zvolit jinou hodnotu. Pokud dělení tokenu nemá smysl, můžete použít
hodnotu `_decimals` nula. Chcete-li použít stejný standard jako ETH, použijte hodnotu **18**.

### Konstruktor {#the-constructor}

```solidity
    /**
     * @dev Nastaví hodnoty pro {name} a {symbol}, inicializuje {decimals} s
     * výchozí hodnotou 18.
     *
     * Chcete-li vybrat jinou hodnotu pro {decimals}, použijte {_setupDecimals}.
     *
     * Všechny tři z těchto hodnot jsou neměnné: lze je nastavit pouze jednou během
     * konstrukce.
     */
    constructor (string memory name_, string memory symbol_) public {
        // V Solidity ≥0.7.0, 'public' je implicitní a může být vynechán.

        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

Konstruktor se volá při prvním vytvoření kontraktu. Podle konvence jsou parametry funkce pojmenovány `<něco>_`.

### Funkce uživatelského rozhraní {#user-interface-functions}

```solidity
    /**
     * @dev Vrací název tokenu.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Vrací symbol tokenu, obvykle kratší verzi
     * názvu.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Vrací počet desetinných míst použitých k získání jeho uživatelské reprezentace.
     * Například, pokud se `decimals` rovná `2`, měl by být zůstatek `505` tokenů
     * zobrazen uživateli jako `5,05` (`505 / 10 ** 2`).
     *
     * Tokeny obvykle volí hodnotu 18, napodobující vztah mezi
     * etherem a wei. Toto je hodnota, kterou {ERC20} používá, pokud není
     * volána {_setupDecimals}.
     *
     * POZNÁMKA: Tato informace se používá pouze pro účely _zobrazení_: v
     * žádném případě neovlivňuje žádnou aritmetiku kontraktu, včetně
     * {IERC20-balanceOf} a {IERC20-transfer}.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

Tyto funkce, `name`, `symbol` a `decimals`, pomáhají uživatelským rozhraním poznat váš kontrakt, aby ho mohly správně zobrazit.

Návratový typ je `string memory`, což znamená návrat řetězce, který je uložen v paměti. Proměnné, jako jsou
řetězce, mohou být uloženy na třech místech:

|          | Životnost        | Přístup ke kontraktu | Náklady na palivo                                                 |
| -------- | ---------------- | -------------------- | ----------------------------------------------------------------- |
| Paměť    | Volání funkce    | Čtení/zápis          | Desítky nebo stovky (vyšší pro vyšší umístění) |
| Calldata | Volání funkce    | Pouze pro čtení      | Nelze použít jako návratový typ, pouze jako typ parametru funkce  |
| Úložiště | Dokud se nezmění | Čtení/zápis          | Vysoké (800 pro čtení, 20k pro zápis)          |

V tomto případě je `memory` nejlepší volbou.

### Čtení informací o tokenu {#read-token-information}

Jedná se o funkce, které poskytují informace o tokenu, buď o celkové zásobě, nebo o
zůstatku na účtu.

```solidity
    /**
     * @dev Viz {IERC20-totalSupply}.
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
```

Funkce `totalSupply` vrací celkovou zásobu tokenů.

&nbsp;

```solidity
    /**
     * @dev Viz {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
```

Přečtěte si zůstatek na účtu. Všimněte si, že kdokoli může získat zůstatek na účtu kohokoli
jiného. Nemá smysl se snažit tuto informaci skrývat, protože je stejně dostupná na každém
uzlu. _Na blockchainu neexistují žádná tajemství._

### Převod tokenů {#transfer-tokens}

```solidity
    /**
     * @dev Viz {IERC20-transfer}.
     *
     * Požadavky:
     *
     * - `recipient` nemůže být nulová adresa.
     * - volající musí mít zůstatek alespoň `amount`.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

Funkce `transfer` se volá k převodu tokenů z účtu odesílatele na jiný. Všimněte si,
že i když vrací booleovskou hodnotu, tato hodnota je vždy **true**. Pokud se převod
nepodaří, kontrakt vrátí volání zpět.

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

Funkce `_transfer` dělá skutečnou práci. Jedná se o soukromou funkci, kterou mohou volat pouze
jiné funkce kontraktu. Podle konvence jsou soukromé funkce pojmenovány `_<něco>`, stejně jako stavové
proměnné.

Normálně v Solidity používáme `msg.sender` pro odesílatele zprávy. To však narušuje
[OpenGSN](http://opengsn.org/). Chceme-li s naším tokenem povolit transakce bez etheru, musíme
použít `_msgSender()`. Pro běžné transakce vrací `msg.sender`, ale pro transakce bez etheru
vrací původního podepisujícího a ne kontrakt, který zprávu předal.

### Funkce povolení {#allowance-functions}

Jedná se o funkce, které implementují funkcionalitu povolení: `allowance`, `approve`, `transferFrom`
a `_approve`. Kromě toho implementace OpenZeppelin jde nad rámec základního standardu a obsahuje některé funkce, které zlepšují
bezpečnost: `increaseAllowance` a `decreaseAllowance`.

#### Funkce povolení {#allowance}

```solidity
    /**
     * @dev Viz {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

Funkce `allowance` umožňuje každému zkontrolovat jakékoli povolení.

#### Funkce schválení {#approve}

```solidity
    /**
     * @dev Viz {IERC20-approve}.
     *
     * Požadavky:
     *
     * - `spender` nemůže být nulová adresa.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

Tato funkce se volá pro vytvoření povolení. Je podobná výše uvedené funkci `transfer`:

- Funkce pouze volá interní funkci (v tomto případě `_approve`), která provádí skutečnou práci.
- Funkce buď vrátí `true` (pokud je úspěšná), nebo se vrátí (pokud ne).

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

Používáme interní funkce, abychom minimalizovali počet míst, kde dochází ke změnám stavu. _Každá_ funkce, která mění
stav, je potenciálním bezpečnostním rizikem, které je třeba zkontrolovat z hlediska bezpečnosti. Tímto způsobem máme menší šanci, že se spleteme.

#### Funkce transferFrom {#transferFrom}

Toto je funkce, kterou volá utrácející, aby utratil povolenou částku. To vyžaduje dvě operace: převést utracenou částku
a snížit povolenou částku o tuto částku.

```solidity
    /**
     * @dev Viz {IERC20-transferFrom}.
     *
     * Vyvolá událost {Approval} udávající aktualizované povolení. To není
     * vyžadováno EIP. Viz poznámka na začátku {ERC20}.
     *
     * Požadavky:
     *
     * - `sender` a `recipient` nemohou být nulová adresa.
     * - `sender` musí mít zůstatek alespoň `amount`.
     * - volající musí mít povolení pro tokeny ``sender`` alespoň
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

Volání funkce `a.sub(b, "zpráva")` provádí dvě věci. Nejprve vypočítá `a-b`, což je nové povolení.
Zadruhé zkontroluje, zda tento výsledek není záporný. Pokud je záporný, volání se vrátí s poskytnutou zprávou. Všimněte si, že když se volání vrátí, veškeré předchozí zpracování během tohoto volání se ignoruje, takže nemusíme
vracet `_transfer`.

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

#### Bezpečnostní doplňky OpenZeppelin {#openzeppelin-safety-additions}

Je nebezpečné nastavit nenulové povolení na jinou nenulovou hodnotu,
protože ovládáte pouze pořadí svých vlastních transakcí, nikoli transakcí kohokoli jiného. Představte si, že
máte dva uživatele, Alici, která je naivní, a Billa, který je nečestný. Alice chce od
Billa nějakou službu, která si myslí, že stojí pět tokenů – takže dává Billovi povolení na pět tokenů.

Pak se něco změní a Billova cena stoupne na deset tokenů. Alice, která stále chce službu,
pošle transakci, která nastaví Billovo povolení na deset. V okamžiku, kdy Bill uvidí tuto novou transakci
v poolu transakcí, pošle transakci, která utratí Aliciných pět tokenů a má mnohem
vyšší cenu paliva, takže bude vytěžena rychleji. Tímto způsobem může Bill nejprve utratit pět tokenů a poté,
jakmile je vytěženo nové povolení Alice, utratit dalších deset za celkovou cenu patnácti tokenů, což je více, než
Alice zamýšlela autorizovat. Tato technika se nazývá
[front-running](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/#front-running)

| Transakce Alice                      | Nonce Alice | Transakce Billa                                  | Nonce Billa | Billovo povolení | Billův celkový příjem od Alice |
| ------------------------------------ | ----------- | ------------------------------------------------ | ----------- | ---------------- | ------------------------------ |
| approve(Bill, 5)  | 10          |                                                  |             | 5                | 0                              |
|                                      |             | transferFrom(Alice, Bill, 5)  | 10,123      | 0                | 5                              |
| approve(Bill, 10) | 11          |                                                  |             | 10               | 5                              |
|                                      |             | transferFrom(Alice, Bill, 10) | 10,124      | 0                | 15                             |

Abyste se tomuto problému vyhnuli, tyto dvě funkce (`increaseAllowance` a `decreaseAllowance`) vám umožňují
upravit povolenou částku o určitou částku. Takže pokud Bill už utratil pět tokenů, bude moci utratit
jen dalších pět. V závislosti na načasování existují dva způsoby, jak to může fungovat, oba z
nichž končí tím, že Bill dostane pouze deset tokenů:

A:

| Transakce Alice                               | Nonce Alice | Transakce Billa                                 | Nonce Billa | Billovo povolení | Billův celkový příjem od Alice |
| --------------------------------------------- | ----------: | ----------------------------------------------- | ----------: | ---------------: | ------------------------------ |
| approve(Bill, 5)           |          10 |                                                 |             |                5 | 0                              |
|                                               |             | transferFrom(Alice, Bill, 5) |      10,123 |                0 | 5                              |
| increaseAllowance(Bill, 5) |          11 |                                                 |             |          0+5 = 5 | 5                              |
|                                               |             | transferFrom(Alice, Bill, 5) |      10,124 |                0 | 10                             |

B:

| Transakce Alice                               | Nonce Alice | Transakce Billa                                  | Nonce Billa | Billovo povolení | Billův celkový příjem od Alice |
| --------------------------------------------- | ----------: | ------------------------------------------------ | ----------: | ---------------: | -----------------------------: |
| approve(Bill, 5)           |          10 |                                                  |             |                5 |                              0 |
| increaseAllowance(Bill, 5) |          11 |                                                  |             |         5+5 = 10 |                              0 |
|                                               |             | transferFrom(Alice, Bill, 10) |      10,124 |                0 |                             10 |

```solidity
    /**
     * @dev Atomicky zvyšuje povolení udělené `spenderu` volajícím.
     *
     * Toto je alternativa k {approve}, kterou lze použít jako zmírnění pro
     * problémy popsané v {IERC20-approve}.
     *
     * Vyvolá událost {Approval} udávající aktualizované povolení.
     *
     * Požadavky:
     *
     * - `spender` nemůže být nulová adresa.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

Funkce `a.add(b)` je bezpečné sčítání. V nepravděpodobném případě, že `a`+`b`>=`2^256`, se neobtočí
jako normální sčítání.

```solidity

    /**
     * @dev Atomicky snižuje povolení udělené `spenderu` volajícím.
     *
     * Toto je alternativa k {approve}, kterou lze použít jako zmírnění pro
     * problémy popsané v {IERC20-approve}.
     *
     * Vyvolá událost {Approval} udávající aktualizované povolení.
     *
     * Požadavky:
     *
     * - `spender` nemůže být nulová adresa.
     * - `spender` musí mít povolení pro volajícího alespoň
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: decreased allowance below zero"));
        return true;
    }
```

### Funkce, které upravují informace o tokenu {#functions-that-modify-token-information}

Toto jsou čtyři funkce, které provádějí skutečnou práci: `_transfer`, `_mint`, `_burn` a `_approve`.

#### Funkce _transfer {#_transfer}

```solidity
    /**
     * @dev Přesune tokeny v množství `amount` od `odesílatele` k `příjemci`.
     *
     * Tato interní funkce je ekvivalentní {transfer} a může být použita
     * například k implementaci automatických poplatků za tokeny, mechanismů slashing atd.
     *
     * Vyvolá událost {Transfer}.
     *
     * Požadavky:
     *
     * - `sender` nemůže být nulová adresa.
     * - `recipient` nemůže být nulová adresa.
     * - `sender` musí mít zůstatek alespoň `amount`.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

Tato funkce, `_transfer`, převádí tokeny z jednoho účtu na druhý. Volá se jak
`transfer` (pro převody z vlastního účtu odesílatele), tak `transferFrom` (pro použití povolení
k převodu z cizího účtu).

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

Nikdo ve skutečnosti nevlastní adresu nula v Ethereu (to znamená, že nikdo nezná soukromý klíč, jehož odpovídající veřejný klíč
je transformován na nulovou adresu). Když lidé používají tuto adresu, obvykle se jedná o softwarovou chybu – takže selžeme,
pokud je jako odesílatel nebo příjemce použita nulová adresa.

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

Existují dva způsoby, jak použít tento kontrakt:

1. Použijte jej jako šablonu pro svůj vlastní kód
2. [Dědit z něj](https://www.bitdegree.org/learn/solidity-inheritance) a přepsat pouze ty funkce, které potřebujete upravit

Druhá metoda je mnohem lepší, protože kód OpenZeppelin ERC-20 již byl auditován a prokázal se jako bezpečný. Když používáte dědičnost,
je jasné, jaké funkce upravujete, a aby lidé důvěřovali vašemu kontraktu, stačí jim auditovat pouze tyto konkrétní funkce.

Často je užitečné provést funkci pokaždé, když tokeny změní majitele. Nicméně `_transfer` je velmi důležitá funkce a je
možné ji napsat nezabezpečeně (viz níže), takže je nejlepší ji nepřepisovat. Řešením je `_beforeTokenTransfer`, [funkce hook](https://wikipedia.org/wiki/Hooking). Tuto funkci můžete přepsat a bude volána při každém převodu.

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

Toto jsou řádky, které skutečně provádějí převod. Všimněte si, že mezi nimi **nic** není a že odečítáme
převedenou částku od odesílatele před jejím přičtením k příjemci. To je důležité, protože kdyby uprostřed bylo
volání jiného kontraktu, mohlo by být použito k podvádění tohoto kontraktu. Tímto způsobem je převod
atomický, uprostřed se nemůže nic stát.

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

Nakonec vyvoláme událost `Transfer`. Události nejsou přístupné chytrým kontraktům, ale kód spuštěný mimo blockchain
může naslouchat událostem a reagovat na ně. Například peněženka může sledovat, kdy majitel získá více tokenů.

#### Funkce _mint a _burn {#_mint-and-_burn}

Tyto dvě funkce (`_mint` a `_burn`) upravují celkovou zásobu tokenů.
Jsou interní a v tomto kontraktu je nevolá žádná funkce,
takže jsou užitečné pouze v případě, že z kontraktu dědíte a přidáte si vlastní
logiku k rozhodnutí, za jakých podmínek se mají nové tokeny razit nebo stávající
pálit.

**POZNÁMKA:** Každý token ERC-20 má svou vlastní obchodní logiku, která určuje správu tokenů.
Například kontrakt s pevnou zásobou může volat `_mint` pouze
v konstruktoru a nikdy nevolat `_burn`. Kontrakt, který prodává tokeny,
volá `_mint`, když je zaplaceno, a pravděpodobně v určitém okamžiku volá `_burn`,
aby se zabránilo nekontrolovatelné inflaci.

```solidity
    /** @dev Vytvoří `amount` tokenů a přiřadí je `účtu`, čímž se zvýší
     * celková zásoba.
     *
     * Vyvolá událost {Transfer} s `from` nastaveným na nulovou adresu.
     *
     * Požadavky:
     *
     * - `to` nemůže být nulová adresa.
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");
        _beforeTokenTransfer(address(0), account, amount);
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Nezapomeňte aktualizovat `_totalSupply`, když se změní celkový počet tokenů.

&nbsp;

```solidity
    /**
     * @dev Zničí `amount` tokenů z `účtu`, čímž se sníží
     * celková zásoba.
     *
     * Vyvolá událost {Transfer} s `to` nastaveným na nulovou adresu.
     *
     * Požadavky:
     *
     * - `účet` nemůže být nulová adresa.
     * - `účet` musí mít alespoň `amount` tokenů.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }
```

Funkce `_burn` je téměř identická s `_mint`, jen jde opačným směrem.

#### Funkce _approve {#_approve}

Toto je funkce, která skutečně specifikuje povolení. Všimněte si, že umožňuje vlastníkovi specifikovat
povolení, které je vyšší než aktuální zůstatek vlastníka. To je v pořádku, protože zůstatek se
kontroluje v okamžiku převodu, kdy se může lišit od zůstatku v době vytvoření povolení
.

```solidity
    /**
     * @dev Nastaví `amount` jako povolení `spenderu` pro tokeny `vlastníka`.
     *
     * Tato interní funkce je ekvivalentní `approve` a může být použita
     * například k nastavení automatických povolení pro určité subsystémy atd.
     *
     * Vyvolá událost {Approval}.
     *
     * Požadavky:
     *
     * - `owner` nemůže být nulová adresa.
     * - `spender` nemůže být nulová adresa.
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
```

&nbsp;

Vyvolat událost `Approval`. V závislosti na tom, jak je aplikace napsána, může být kontraktu utrácejícího o
schválení sděleno buď vlastníkem, nebo serverem, který naslouchá těmto událostem.

```solidity
        emit Approval(owner, spender, amount);
    }

```

### Upravit proměnnou Decimals {#modify-the-decimals-variable}

```solidity


    /**
     * @dev Nastaví {decimals} na jinou hodnotu než výchozí 18.
     *
     * VAROVÁNÍ: Tuto funkci byste měli volat pouze z konstruktoru. Většina
     * aplikací, které interagují s tokenovými kontrakty, neočekává,
     * že se {decimals} někdy změní, a mohou fungovat nesprávně, pokud ano.
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

Tato funkce upravuje proměnnou `_decimals`, která se používá k tomu, aby uživatelským rozhraním sdělila, jak interpretovat částku.
Měli byste ji volat z konstruktoru. Bylo by nečestné volat ji v jakémkoli následujícím bodě a aplikace
nejsou navrženy tak, aby to zvládly.

### Háčky {#hooks}

```solidity

    /**
     * @dev Záchytný bod (hook), který se volá před jakýmkoli převodem tokenů. To zahrnuje
     * ražbu a pálení.
     *
     * Podmínky volání:
     *
     * – když `from` a `to` jsou obě nenulové, bude převeden `amount` tokenů z adresy ``from``
     * na adresu `to`.
     * – když je `from` nulové, bude pro `to` vyraženo `amount` tokenů.
     * – když je `to` nulové, `amount` tokenů z adresy ``from`` bude spáleno.
     * – `from` a `to` nejsou nikdy obě nulové.
     *
     * Více informací o záchytných bodech (hooks) najdete v xref:ROOT:extending-contracts.adoc#using-hooks[Používání záchytných bodů].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

Toto je funkce háku, která se má volat během převodů. Zde je prázdná, ale pokud potřebujete,
aby něco dělala, stačí ji přepsat.

## Závěr {#conclusion}

Pro přehled, zde jsou některé z nejdůležitějších myšlenek v tomto kontraktu (podle mého názoru se váš může lišit):

- _Na blockchainu neexistují žádná tajemství_. Jakékoli informace, ke kterým má chytrý kontrakt přístup,
  jsou dostupné celému světu.
- Můžete ovládat pořadí svých vlastních transakcí, ale ne to, kdy se uskuteční transakce
  jiných lidí. To je důvod, proč může být změna povolení nebezpečná, protože umožňuje
  utrácejícímu utratit součet obou povolení.
- Hodnoty typu `uint256` se obtáčejí. Jinými slovy, _0-1=2^256-1_. Pokud to není požadované
  chování, musíte to zkontrolovat (nebo použít knihovnu SafeMath, která to udělá za vás). Všimněte si, že se to změnilo v
  [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html).
- Provádějte všechny změny stavu určitého typu na určitém místě, protože to usnadňuje auditování.
  To je důvod, proč máme například `_approve`, které je voláno `approve`, `transferFrom`,
  `increaseAllowance` a `decreaseAllowance`
- Změny stavu by měly být atomické, bez jakékoli jiné akce uprostřed (jak můžete vidět
  v `_transfer`). Je to proto, že během změny stavu máte nekonzistentní stav. Například
  mezi dobou, kdy odečtete ze zůstatku odesílatele, a dobou, kdy přičtete k zůstatku
  příjemce, existuje méně tokenů, než by mělo být. To by mohlo být potenciálně zneužito, pokud
  mezi nimi probíhají operace, zejména volání jiného kontraktu.

Nyní, když jste viděli, jak je napsán kontrakt OpenZeppelin ERC-20 a zejména jak je
zabezpečen, jděte a pište své vlastní bezpečné kontrakty a aplikace.

[Více z mé práce najdete zde](https://cryptodocguy.pro/).
