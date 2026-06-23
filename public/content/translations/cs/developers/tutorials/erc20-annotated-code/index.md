---
title: "Průvodce kontraktem ERC-20"
description: "Co obsahuje kontrakt ERC-20 od OpenZeppelin a proč to tam je?"
author: Ori Pomerantz
lang: cs
tags: ["Solidity", "erc-20"]
skill: beginner
breadcrumb: "Průvodce ERC-20"
published: 2021-03-09
---

## Úvod {#introduction}

Jedním z nejčastějších způsobů využití Etherea je vytvoření obchodovatelného tokenu skupinou lidí, v jistém smyslu jejich vlastní měny. Tyto tokeny obvykle dodržují standard [ERC-20](/developers/docs/standards/tokens/erc-20/). Tento standard umožňuje psát nástroje, jako jsou fondy likvidity a peněženky, které fungují se všemi tokeny ERC-20. V tomto článku budeme analyzovat [implementaci ERC20 v Solidity od OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol) a také [definici rozhraní](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol).

Toto je anotovaný zdrojový kód. Pokud chcete implementovat ERC-20, [přečtěte si tento tutoriál](https://docs.openzeppelin.com/contracts/2.x/erc20-supply).

## Rozhraní {#the-interface}

Účelem standardu, jako je ERC-20, je umožnit mnoho implementací tokenů, které jsou interoperabilní napříč aplikacemi, jako jsou peněženky a decentralizované burzy. Abychom toho dosáhli, vytvoříme [rozhraní](https://www.geeksforgeeks.org/solidity/solidity-basics-of-interface/). Jakýkoli kód, který potřebuje použít kontrakt tokenu, může použít stejné definice v rozhraní a být kompatibilní se všemi kontrakty tokenů, které jej používají, ať už se jedná o peněženku, jako je MetaMask, decentralizovanou aplikaci (dapp), jako je etherscan.io, nebo jiný kontrakt, jako je fond likvidity.

![Illustration of the ERC-20 interface](erc20_interface.png)

Pokud jste zkušený programátor, pravděpodobně si pamatujete, že jste podobné konstrukce viděli v [Javě](https://www.w3schools.com/java/java_interface.asp) nebo dokonce v [hlavičkových souborech C](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html).

Toto je definice [rozhraní ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) od OpenZeppelin. Jedná se o překlad [lidsky čitelného standardu](https://eips.ethereum.org/EIPS/eip-20) do kódu Solidity. Samotné rozhraní samozřejmě nedefinuje, _jak_ se má něco udělat. To je vysvětleno ve zdrojovém kódu kontraktu níže.

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

Soubory Solidity by měly obsahovat identifikátor licence. [Seznam licencí si můžete prohlédnout zde](https://spdx.org/licenses/). Pokud potřebujete jinou licenci, jednoduše to vysvětlete v komentářích.

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Jazyk Solidity se stále rychle vyvíjí a nové verze nemusí být kompatibilní se starým kódem ([viz zde](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)). Proto je dobré specifikovat nejen minimální verzi jazyka, ale také maximální verzi, tedy tu nejnovější, se kterou jste kód testovali.

&nbsp;

```solidity
/**
 * @dev Rozhraní standardu ERC-20, jak je definováno v EIP.
 */
```

`@dev` v komentáři je součástí [formátu NatSpec](https://docs.soliditylang.org/en/develop/natspec-format.html), který se používá k vytváření dokumentace ze zdrojového kódu.

&nbsp;

```solidity
interface IERC20 {
```

Podle konvence začínají názvy rozhraní na `I`.

&nbsp;

```solidity
    /**
     * @dev Vrací množství existujících tokenů.
     */
    function totalSupply() external view returns (uint256);
```

Tato funkce je `external`, což znamená, že [může být volána pouze zvenčí kontraktu](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2). Vrací celkovou zásobu tokenů v kontraktu. Tato hodnota je vrácena pomocí nejběžnějšího typu v Ethereu, 256bitového celého čísla bez znaménka (256 bitů je nativní velikost slova EVM). Tato funkce je také `view`, což znamená, že nemění stav, takže může být spuštěna na jediném uzlu, místo aby ji musel spouštět každý uzel v blockchainu. Tento druh funkce negeneruje transakci a nestojí žádný [gas](/developers/docs/gas/).

**Poznámka:** Teoreticky by se mohlo zdát, že tvůrce kontraktu by mohl podvádět tím, že vrátí menší celkovou zásobu, než je skutečná hodnota, čímž by se každý token zdál cennější, než ve skutečnosti je. Tato obava však ignoruje skutečnou povahu blockchainu. Vše, co se děje na blockchainu, může ověřit každý uzel. Aby toho bylo dosaženo, je strojový kód a úložiště každého kontraktu k dispozici na každém uzlu. Ačkoli nejste povinni zveřejnit kód Solidity pro váš kontrakt, nikdo by vás nebral vážně, pokud nezveřejníte zdrojový kód a verzi Solidity, se kterou byl zkompilován, aby mohl být ověřen proti vámi poskytnutému strojovému kódu. Podívejte se například na [tento kontrakt](https://eth.blockscout.com/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD?tab=contract).

&nbsp;

```solidity
    /**
     * @dev Vrací množství tokenů vlastněných účtem `account`.
     */
    function balanceOf(address account) external view returns (uint256);
```

Jak název napovídá, `balanceOf` vrací zůstatek účtu. Účty na Ethereu jsou v Solidity identifikovány pomocí typu `address`, který má 160 bitů. Je to také `external` a `view`.

&nbsp;

```solidity
    /**
     * @dev Přesune `amount` tokenů z účtu volajícího na `recipient`.
     *
     * Vrací booleovskou hodnotu indikující, zda operace byla úspěšná.
     *
     * Vyvolá událost {Transfer}.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

Funkce `transfer` provádí převod tokenů od volajícího na jinou adresu. To zahrnuje změnu stavu, takže to není `view`. Když uživatel zavolá tuto funkci, vytvoří se transakce a stojí to gas. Také emituje událost `Transfer`, aby informovala všechny na blockchainu o této události.

Funkce má dva typy výstupu pro dva různé typy volajících:

- Uživatelé, kteří volají funkci přímo z uživatelského rozhraní. Uživatel obvykle odešle transakci a nečeká na odpověď, což by mohlo trvat neurčitou dobu. Uživatel může zjistit, co se stalo, vyhledáním stvrzenky transakce (která je identifikována pomocí hashe transakce) nebo vyhledáním události `Transfer`.
- Ostatní kontrakty, které volají funkci jako součást celkové transakce. Tyto kontrakty získají výsledek okamžitě, protože běží ve stejné transakci, takže mohou použít návratovou hodnotu funkce.

Stejný typ výstupu vytvářejí i další funkce, které mění stav kontraktu.

&nbsp;

Povolené limity umožňují účtu utratit některé tokeny, které patří jinému vlastníkovi. To je užitečné například pro kontrakty, které fungují jako prodejci. Kontrakty nemohou sledovat události, takže pokud by kupující převedl tokeny přímo na kontrakt prodejce, tento kontrakt by nevěděl, že mu bylo zaplaceno. Místo toho kupující povolí kontraktu prodejce utratit určitou částku a prodejce tuto částku převede. To se provádí prostřednictvím funkce, kterou volá kontrakt prodejce, takže kontrakt prodejce může vědět, zda byl úspěšný.

```solidity
    /**
     * @dev Vrací zbývající počet tokenů, které bude mít `spender`
     * povoleno utratit jménem účtu `owner` prostřednictvím {transferFrom}. Ve výchozím nastavení je to
     * nula.
     *
     * Tato hodnota se mění, když jsou zavolány funkce {approve} nebo {transferFrom}.
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

Funkce `allowance` umožňuje komukoli dotázat se, jaký je povolený limit, který jedna adresa (`owner`) umožňuje utratit jiné adrese (`spender`).

&nbsp;

```solidity
    /**
     * @dev Nastaví `amount` jako povolený limit pro `spender` nad tokeny volajícího.
     *
     * Vrací booleovskou hodnotu indikující, zda operace byla úspěšná.
     *
     * DŮLEŽITÉ: Mějte na paměti, že změna povoleného limitu touto metodou přináší riziko,
     * že někdo může využít starý i nový povolený limit kvůli nešťastnému
     * řazení transakcí. Jedním z možných řešení pro zmírnění tohoto souběhu
     * (race condition) je nejprve snížit povolený limit pro `spender` na 0 a požadovanou
     * hodnotu nastavit až poté:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Vyvolá událost {Approval}.
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

Funkce `approve` vytváří povolený limit. Nezapomeňte si přečíst zprávu o tom, jak to může být zneužito. V Ethereu řídíte pořadí svých vlastních transakcí, ale nemůžete řídit pořadí, ve kterém budou provedeny transakce jiných lidí, pokud neodešlete svou vlastní transakci až poté, co uvidíte, že proběhla transakce druhé strany.

&nbsp;

```solidity
    /**
     * @dev Přesune `amount` tokenů z `sender` na `recipient` pomocí
     * mechanismu povoleného limitu. `amount` je poté odečteno z povoleného limitu
     * volajícího.
     *
     * Vrací booleovskou hodnotu indikující, zda operace byla úspěšná.
     *
     * Vyvolá událost {Transfer}.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Nakonec se `transferFrom` používá k tomu, aby utrácející skutečně utratil povolený limit.

&nbsp;

```solidity

    /**
     * @dev Vyvoláno, když je `value` tokenů přesunuto z jednoho účtu (`from`) na
     * druhý (`to`).
     *
     * Všimněte si, že `value` může být nula.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Vyvoláno, když je povolený limit pro `spender` od účtu `owner` nastaven
     * voláním funkce {approve}. `value` je nový povolený limit.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Tyto události jsou emitovány, když se změní stav kontraktu ERC-20.

## Samotný kontrakt {#the-actual-contract}

Toto je samotný kontrakt, který implementuje standard ERC-20, [převzatý odtud](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol). Není určen k použití tak, jak je, ale můžete z něj [dědit](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm) a rozšířit jej na něco použitelného.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### Příkazy importu {#import-statements}

Kromě výše uvedených definic rozhraní importuje definice kontraktu dva další soubory:

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol` jsou definice potřebné k použití [OpenGSN](https://www.opengsn.org/), systému, který umožňuje uživatelům bez etheru používat blockchain. Všimněte si, že se jedná o starou verzi, pokud se chcete integrovat s OpenGSN, [použijte tento tutoriál](https://docs.opengsn.org/javascript-client/tutorial.html).
- [Knihovna SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/), která zabraňuje aritmetickému přetečení/podtečení pro verze Solidity **&lt;0.8.0**. V Solidity ≥0.8.0 se aritmetické operace automaticky zvrátí při přetečení/podtečení, takže SafeMath je zbytečná. Tento kontrakt používá SafeMath pro zpětnou kompatibilitu se staršími verzemi kompilátoru.

&nbsp;

Tento komentář vysvětluje účel kontraktu.

```solidity
/**
 * @dev Implementace rozhraní {IERC20}.
 *
 * Tato implementace je agnostická vůči způsobu, jakým jsou tokeny vytvářeny. To znamená,
 * že mechanismus nabídky musí být přidán v odvozeném kontraktu pomocí {_mint}.
 * Pro obecný mechanismus viz {ERC20PresetMinterPauser}.
 *
 * TIP: Pro podrobný popis viz náš průvodce
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[How
 * to implement supply mechanisms].
 *
 * Řídili jsme se obecnými pokyny OpenZeppelin: funkce při selhání vrátí chybu (revert) místo
 * vrácení `false`. Toto chování je nicméně konvenční
 * a není v rozporu s očekáváními aplikací ERC-20.
 *
 * Navíc je při volání {transferFrom} vyvolána událost {Approval}.
 * To umožňuje aplikacím rekonstruovat povolený limit pro všechny účty pouze
 * nasloucháním těmto událostem. Jiné implementace EIP nemusí tyto
 * události vyvolávat, protože to specifikace nevyžaduje.
 *
 * Nakonec byly přidány nestandardní funkce {decreaseAllowance} a {increaseAllowance},
 * aby se zmírnily dobře známé problémy spojené s nastavováním
 * povolených limitů. Viz {IERC20-approve}.
 */

```

### Definice kontraktu {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

Tento řádek specifikuje dědičnost, v tomto případě z `IERC20` shora a `Context` pro OpenGSN.

&nbsp;

```solidity

    using SafeMath for uint256;

```

Tento řádek připojuje knihovnu `SafeMath` k typu `uint256`. Tuto knihovnu najdete [zde](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol).

### Definice proměnných {#variable-definitions}

Tyto definice specifikují stavové proměnné kontraktu. Tyto proměnné jsou deklarovány jako `private`, ale to znamená pouze to, že je nemohou číst jiné kontrakty na blockchainu. _Na blockchainu nejsou žádná tajemství_, software na každém uzlu má stav každého kontraktu v každém bloku. Podle konvence jsou stavové proměnné pojmenovány `_<something>`.

První dvě proměnné jsou [mapování (mappings)](https://www.tutorialspoint.com/solidity/solidity_mappings.htm), což znamená, že se chovají zhruba stejně jako [asociativní pole](https://wikipedia.org/wiki/Associative_array), s tím rozdílem, že klíče jsou číselné hodnoty. Úložiště je alokováno pouze pro položky, které mají hodnoty odlišné od výchozí (nula).

```solidity
    mapping (address => uint256) private _balances;
```

První mapování, `_balances`, představuje adresy a jejich příslušné zůstatky tohoto tokenu. Pro přístup k zůstatku použijte tuto syntaxi: `_balances[<address>]`.

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

Tato proměnná, `_allowances`, ukládá povolené limity vysvětlené dříve. První index je vlastník tokenů a druhý je kontrakt s povoleným limitem. Pro přístup k částce, kterou může adresa A utratit z účtu adresy B, použijte `_allowances[B][A]`.

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

Tyto tři proměnné se používají ke zlepšení čitelnosti. První dvě jsou samovysvětlující, ale `_decimals` není.

Na jedné straně Ethereum nemá proměnné s plovoucí desetinnou čárkou nebo zlomky. Na druhé straně lidé rádi dělí tokeny. Jedním z důvodů, proč se lidé rozhodli pro zlato jako měnu, bylo to, že bylo těžké vracet drobné, když si někdo chtěl koupit krávu v hodnotě kachny.

Řešením je sledovat celá čísla, ale místo skutečného tokenu počítat zlomkový token, který je téměř bezcenný. V případě etheru se zlomkový token nazývá Wei a 10^18 Wei se rovná jednomu ETH. V době psaní tohoto článku je 10 000 000 000 000 Wei přibližně jeden americký nebo eurový cent.

Aplikace potřebují vědět, jak zobrazit zůstatek tokenů. Pokud má uživatel 3 141 000 000 000 000 000 Wei, je to 3,14 ETH? 31,41 ETH? 3 141 ETH? V případě etheru je definováno 10^18 Wei na ETH, ale pro váš token si můžete vybrat jinou hodnotu. Pokud dělení tokenu nedává smysl, můžete použít hodnotu `_decimals` nula. Pokud chcete použít stejný standard jako ETH, použijte hodnotu **18**.

### Konstruktor {#the-constructor}

```solidity
    /**
     * @dev Nastaví hodnoty pro {name} a {symbol}, inicializuje {decimals} na
     * výchozí hodnotu 18.
     *
     * Pro výběr jiné hodnoty pro {decimals} použijte {_setupDecimals}.
     *
     * Všechny tři tyto hodnoty jsou neměnné: mohou být nastaveny pouze jednou v
     * konstruktoru.
     */
    constructor (string memory name_, string memory symbol_) public {
        // V Solidity ≥0.7.0 je 'public' implicitní a může být vynecháno.

        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

Konstruktor se volá při prvním vytvoření kontraktu. Podle konvence jsou parametry funkce pojmenovány `<something>_`.

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
     * Například, pokud se `decimals` rovná `2`, zůstatek `505` tokenů by měl
     * být uživateli zobrazen jako `5,05` (`505 / 10 ** 2`).
     *
     * Tokeny obvykle volí hodnotu 18, čímž napodobují vztah mezi
     * ether a Wei. Toto je hodnota, kterou používá {ERC-20}, pokud není zavolána
     * funkce {_setupDecimals}.
     *
     * POZNÁMKA: Tato informace se používá pouze pro účely _zobrazení_: v
     * žádném případě neovlivňuje žádnou aritmetiku kontraktu, včetně
     * {IERC20-balanceOf} a {IERC20-transfer}.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

Tyto funkce, `name`, `symbol` a `decimals`, pomáhají uživatelským rozhraním dozvědět se o vašem kontraktu, aby jej mohla správně zobrazit.

Návratový typ je `string memory`, což znamená vrácení řetězce, který je uložen v paměti. Proměnné, jako jsou řetězce, mohou být uloženy na třech místech:

|          | Životnost      | Přístup z kontraktu | Cena plynu                                                                           |
| -------- | -------------- | ------------------- | ------------------------------------------------------------------------------------ |
| Paměť    | Volání funkce  | Čtení/Zápis         | Desítky nebo stovky (vyšší pro vyšší lokace)                                         |
| Calldata | Volání funkce  | Pouze pro čtení     | Nelze použít jako návratový typ, pouze jako typ parametru funkce                     |
| Úložiště | Dokud není změněno | Čtení/Zápis         | Vysoká (800 za čtení, 20k za zápis)                                                  |

V tomto případě je `memory` nejlepší volbou.

### Čtení informací o tokenu {#read-token-information}

Toto jsou funkce, které poskytují informace o tokenu, ať už jde o celkovou zásobu nebo zůstatek účtu.

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

Přečtení zůstatku účtu. Všimněte si, že kdokoli má povoleno získat zůstatek účtu kohokoli jiného. Nemá smysl se snažit tyto informace skrývat, protože jsou stejně dostupné na každém uzlu. _Na blockchainu nejsou žádná tajemství._

### Převod tokenů {#transfer-tokens}

```solidity
    /**
     * @dev Viz {IERC20-transfer}.
     *
     * Požadavky:
     *
     * - `recipient` nesmí být nulová adresa.
     * - volající musí mít zůstatek alespoň `amount`.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

Funkce `transfer` se volá k převodu tokenů z účtu odesílatele na jiný. Všimněte si, že i když vrací booleovskou hodnotu, tato hodnota je vždy **true**. Pokud převod selže, kontrakt volání zvrátí.

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

Funkce `_transfer` provádí skutečnou práci. Je to privátní funkce, kterou mohou volat pouze jiné funkce kontraktu. Podle konvence jsou privátní funkce pojmenovány `_<something>`, stejně jako stavové proměnné.

Normálně v Solidity používáme `msg.sender` pro odesílatele zprávy. To však rozbíjí [OpenGSN](https://opengsn.org/). Pokud chceme s naším tokenem povolit transakce bez etheru, musíme použít `_msgSender()`. Vrací `msg.sender` pro normální transakce, ale pro ty bez etheru vrací původního podepisujícího, a ne kontrakt, který zprávu předal.

### Funkce povolených limitů {#allowance-functions}

Toto jsou funkce, které implementují funkcionalitu povolených limitů: `allowance`, `approve`, `transferFrom` a `_approve`. Implementace OpenZeppelin navíc přesahuje základní standard a zahrnuje některé funkce, které zlepšují bezpečnost: `increaseAllowance` a `decreaseAllowance`.

#### Funkce allowance {#allowance}

```solidity
    /**
     * @dev Viz {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

Funkce `allowance` umožňuje komukoli zkontrolovat jakýkoli povolený limit.

#### Funkce approve {#approve}

```solidity
    /**
     * @dev Viz {IERC20-approve}.
     *
     * Požadavky:
     *
     * - `spender` nesmí být nulová adresa.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

Tato funkce se volá k vytvoření povoleného limitu. Je podobná funkci `transfer` výše:

- Funkce pouze volá interní funkci (v tomto případě `_approve`), která provádí skutečnou práci.
- Funkce buď vrátí `true` (pokud je úspěšná), nebo se zvrátí (pokud ne).

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

Používáme interní funkce, abychom minimalizovali počet míst, kde dochází ke změnám stavu. _Jakákoli_ funkce, která mění stav, je potenciálním bezpečnostním rizikem, které je třeba auditovat z hlediska bezpečnosti. Tímto způsobem máme menší šanci udělat chybu.

#### Funkce transferFrom {#transferfrom}

Toto je funkce, kterou utrácející volá, aby utratil povolený limit. To vyžaduje dvě operace: převést utrácenou částku a snížit povolený limit o tuto částku.

```solidity
    /**
     * @dev Viz {IERC20-transferFrom}.
     *
     * Vyvolá událost {Approval} indikující aktualizovaný povolený limit. Toto není
     * vyžadováno EIP. Viz poznámka na začátku {ERC-20}.
     *
     * Požadavky:
     *
     * - `sender` a `recipient` nesmí být nulová adresa.
     * - `sender` musí mít zůstatek alespoň `amount`.
     * - volající musí mít povolený limit pro tokeny účtu ``sender`` ve výši alespoň
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

Volání funkce `a.sub(b, "message")` dělá dvě věci. Zaprvé vypočítá `a-b`, což je nový povolený limit. Zadruhé zkontroluje, zda tento výsledek není záporný. Pokud je záporný, volání se zvrátí s poskytnutou zprávou. Všimněte si, že když se volání zvrátí, jakékoli zpracování provedené dříve během tohoto volání je ignorováno, takže nemusíme vracet zpět `_transfer`.

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

#### Bezpečnostní doplňky OpenZeppelin {#openzeppelin-safety-additions}

Je nebezpečné nastavit nenulový povolený limit na jinou nenulovou hodnotu, protože řídíte pouze pořadí svých vlastních transakcí, ne nikoho jiného. Představte si, že máte dva uživatele, Alici, která je naivní, a Billa, který je nečestný. Alice chce od Billa nějakou službu, o které si myslí, že stojí pět tokenů – takže dá Billovi povolený limit pět tokenů.

Pak se něco změní a Billova cena stoupne na deset tokenů. Alice, která stále chce službu, odešle transakci, která nastaví Billův povolený limit na deset. V okamžiku, kdy Bill uvidí tuto novou transakci v transakčním poolu, odešle transakci, která utratí Aliciných pět tokenů a má mnohem vyšší cenu plynu, takže bude vytěžena rychleji. Tímto způsobem může Bill utratit prvních pět tokenů a poté, jakmile je vytěžen Alicin nový povolený limit, utratit dalších deset za celkovou cenu patnácti tokenů, což je více, než Alice zamýšlela autorizovat. Tato technika se nazývá [předbíhání](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/#front-running)

| Transakce Alice   | Nonce Alice | Transakce Billa               | Nonce Billa | Billův povolený limit | Billův celkový příjem od Alice |
| ----------------- | ----------- | ----------------------------- | ---------- | ---------------- | ---------------------------- |
| approve(Bill, 5)  | 10          |                               |            | 5                | 0                            |
|                   |             | transferFrom(Alice, Bill, 5)  | 10,123     | 0                | 5                            |
| approve(Bill, 10) | 11          |                               |            | 10               | 5                            |
|                   |             | transferFrom(Alice, Bill, 10) | 10,124     | 0                | 15                           |

Aby se tomuto problému předešlo, tyto dvě funkce (`increaseAllowance` a `decreaseAllowance`) vám umožňují upravit povolený limit o konkrétní částku. Takže pokud Bill již utratil pět tokenů, bude moci utratit jen dalších pět. V závislosti na načasování existují dva způsoby, jak to může fungovat, přičemž oba končí tím, že Bill získá pouze deset tokenů:

A:

| Transakce Alice            | Nonce Alice | Transakce Billa              | Nonce Billa | Billův povolený limit | Billův celkový příjem od Alice |
| -------------------------- | ----------: | ---------------------------- | ---------: | ---------------: | ---------------------------- |
| approve(Bill, 5)           |          10 |                              |            |                5 | 0                            |
|                            |             | transferFrom(Alice, Bill, 5) |     10,123 |                0 | 5                            |
| increaseAllowance(Bill, 5) |          11 |                              |            |          0+5 = 5 | 5                            |
|                            |             | transferFrom(Alice, Bill, 5) |     10,124 |                0 | 10                           |

B:

| Transakce Alice            | Nonce Alice | Transakce Billa               | Nonce Billa | Billův povolený limit | Billův celkový příjem od Alice |
| -------------------------- | ----------: | ----------------------------- | ---------: | ---------------: | ---------------------------: |
| approve(Bill, 5)           |          10 |                               |            |                5 |                            0 |
| increaseAllowance(Bill, 5) |          11 |                               |            |         5+5 = 10 |                            0 |
|                            |             | transferFrom(Alice, Bill, 10) |     10,124 |                0 |                           10 |

```solidity
    /**
     * @dev Atomicky zvýší povolený limit udělený účtu `spender` volajícím.
     *
     * Toto je alternativa k {approve}, kterou lze použít jako zmírnění
     * problémů popsaných v {IERC20-approve}.
     *
     * Vyvolá událost {Approval} indikující aktualizovaný povolený limit.
     *
     * Požadavky:
     *
     * - `spender` nesmí být nulová adresa.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

Funkce `a.add(b)` je bezpečné sčítání. V nepravděpodobném případě, že `a`+`b`>=`2^256`, nedojde k přetečení (wrap around) tak, jak to dělá normální sčítání.

```solidity

    /**
     * @dev Atomicky sníží povolený limit udělený účtu `spender` volajícím.
     *
     * Toto je alternativa k {approve}, kterou lze použít jako zmírnění
     * problémů popsaných v {IERC20-approve}.
     *
     * Vyvolá událost {Approval} indikující aktualizovaný povolený limit.
     *
     * Požadavky:
     *
     * - `spender` nesmí být nulová adresa.
     * - `spender` musí mít povolený limit pro volajícího ve výši alespoň
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: decreased allowance below zero"));
        return true;
    }
```

### Funkce, které mění informace o tokenu {#functions-that-modify-token-information}

Toto jsou čtyři funkce, které provádějí skutečnou práci: `_transfer`, `_mint`, `_burn` a `_approve`.

#### Funkce _transfer {#transfer}

```solidity
    /**
     * @dev Přesune `amount` tokenů z `sender` na `recipient`.
     *
     * Tato interní funkce je ekvivalentní k {transfer} a může být použita k
     * např. implementaci automatických poplatků v tokenech, mechanismů osekávání (slashing) atd.
     *
     * Vyvolá událost {Transfer}.
     *
     * Požadavky:
     *
     * - `sender` nesmí být nulová adresa.
     * - `recipient` nesmí být nulová adresa.
     * - `sender` musí mít zůstatek alespoň `amount`.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

Tato funkce, `_transfer`, převádí tokeny z jednoho účtu na druhý. Je volána jak `transfer` (pro převody z vlastního účtu odesílatele), tak `transferFrom` (pro použití povolených limitů k převodu z účtu někoho jiného).

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

Nikdo ve skutečnosti nevlastní nulovou adresu v Ethereu (to znamená, že nikdo nezná soukromý klíč, jehož odpovídající veřejný klíč je transformován na nulovou adresu). Když lidé tuto adresu použijí, je to obvykle softwarová chyba – takže selžeme, pokud je nulová adresa použita jako odesílatel nebo příjemce.

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

Existují dva způsoby, jak tento kontrakt použít:

1. Použít jej jako šablonu pro váš vlastní kód
1. [Dědit z něj](https://www.bitdegree.org/learn/solidity-inheritance) a přepsat pouze ty funkce, které potřebujete upravit

Druhá metoda je mnohem lepší, protože kód ERC-20 od OpenZeppelin již byl auditován a ukázalo se, že je bezpečný. Když použijete dědičnost, je jasné, jaké funkce upravujete, a aby lidé vašemu kontraktu důvěřovali, stačí jim auditovat pouze tyto konkrétní funkce.

Často je užitečné provést funkci pokaždé, když tokeny změní majitele. Nicméně `_transfer` je velmi důležitá funkce a je možné ji napsat nebezpečně (viz níže), takže je nejlepší ji nepřepisovat. Řešením je `_beforeTokenTransfer`, [funkce hook](https://wikipedia.org/wiki/Hooking). Tuto funkci můžete přepsat a bude volána při každém převodu.

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

Toto jsou řádky, které skutečně provádějí převod. Všimněte si, že mezi nimi **nic** není a že převedenou částku odečteme od odesílatele předtím, než ji přičteme příjemci. To je důležité, protože pokud by uprostřed bylo volání jiného kontraktu, mohlo by to být použito k podvedení tohoto kontraktu. Tímto způsobem je převod atomický, uprostřed se nemůže nic stát.

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

Nakonec emitujte událost `Transfer`. Události nejsou přístupné chytrým kontraktům, ale kód běžící mimo blockchain může událostem naslouchat a reagovat na ně. Například peněženka může sledovat, kdy vlastník získá více tokenů.

#### Funkce _mint a _burn {#mint-and-burn}

Tyto dvě funkce (`_mint` a `_burn`) mění celkovou zásobu tokenů. Jsou interní a v tomto kontraktu není žádná funkce, která by je volala, takže jsou užitečné pouze tehdy, pokud z kontraktu dědíte a přidáte vlastní logiku, která rozhodne, za jakých podmínek razit nové tokeny nebo spálit ty stávající.

**POZNÁMKA:** Každý token ERC-20 má svou vlastní obchodní logiku, která diktuje správu tokenů. Například kontrakt s pevnou zásobou může volat `_mint` pouze v konstruktoru a nikdy nevolat `_burn`. Kontrakt, který prodává tokeny, zavolá `_mint`, když je mu zaplaceno, a pravděpodobně v určitém okamžiku zavolá `_burn`, aby se vyhnul nekontrolovatelné inflaci.

```solidity
    /** @dev Vytvoří `amount` tokenů a přiřadí je účtu `account`, čímž zvýší
     * celkovou nabídku.
     *
     * Vyvolá událost {Transfer} s `from` nastaveným na nulovou adresu.
     *
     * Požadavky:
     *
     * - `to` nesmí být nulová adresa.
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
     * @dev Zničí `amount` tokenů z účtu `account`, čímž sníží
     * celkovou nabídku.
     *
     * Vyvolá událost {Transfer} s `to` nastaveným na nulovou adresu.
     *
     * Požadavky:
     *
     * - `account` nesmí být nulová adresa.
     * - `account` musí mít alespoň `amount` tokenů.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }
```

Funkce `_burn` je téměř identická s `_mint`, s tím rozdílem, že jde opačným směrem.

#### Funkce _approve {#approve-2}

Toto je funkce, která skutečně specifikuje povolené limity. Všimněte si, že umožňuje vlastníkovi specifikovat povolený limit, který je vyšší než aktuální zůstatek vlastníka. To je v pořádku, protože zůstatek se kontroluje v době převodu, kdy se může lišit od zůstatku v době vytvoření povoleného limitu.

```solidity
    /**
     * @dev Nastaví `amount` jako povolený limit pro `spender` nad tokeny účtu `owner`.
     *
     * Tato interní funkce je ekvivalentní k `approve` a může být použita k
     * např. nastavení automatických povolených limitů pro určité subsystémy atd.
     *
     * Vyvolá událost {Approval}.
     *
     * Požadavky:
     *
     * - `owner` nesmí být nulová adresa.
     * - `spender` nesmí být nulová adresa.
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
```

&nbsp;

Emitujte událost `Approval`. V závislosti na tom, jak je aplikace napsána, může být kontraktu utrácejícího sděleno schválení buď vlastníkem, nebo serverem, který těmto událostem naslouchá.

```solidity
        emit Approval(owner, spender, amount);
    }

```

### Úprava proměnné Decimals {#modify-the-decimals-variable}

```solidity


    /**
     * @dev Nastaví {decimals} na jinou hodnotu než výchozích 18.
     *
     * VAROVÁNÍ: Tato funkce by měla být volána pouze z konstruktoru. Většina
     * aplikací, které interagují s kontrakty tokenů, nebude očekávat,
     * že se {decimals} někdy změní, a mohou fungovat nesprávně, pokud se tak stane.
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

Tato funkce upravuje proměnnou `_decimals`, která se používá k tomu, aby uživatelským rozhraním řekla, jak interpretovat částku. Měli byste ji volat z konstruktoru. Bylo by nečestné ji volat v jakémkoli pozdějším okamžiku a aplikace nejsou navrženy tak, aby to zvládly.

### Hooks {#hooks}

```solidity

    /**
     * @dev Hook, který je volán před jakýmkoli převodem tokenů. To zahrnuje
     * ražbu (minting) a spalování (burning).
     *
     * Podmínky volání:
     *
     * - když `from` i `to` jsou nenulové, `amount` tokenů účtu ``from``
     * bude převedeno na `to`.
     * - když `from` je nula, `amount` tokenů bude vyraženo pro `to`.
     * - když `to` je nula, `amount` tokenů účtu ``from`` bude spáleno.
     * - `from` a `to` nejsou nikdy obě nuly.
     *
     * Chcete-li se dozvědět více o hoocích, přejděte na xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

Toto je funkce hook, která se má volat během převodů. Zde je prázdná, ale pokud potřebujete, aby něco dělala, jednoduše ji přepíšete.

## Závěr {#conclusion}

Pro zopakování, zde jsou některé z nejdůležitějších myšlenek v tomto kontraktu (podle mého názoru, váš se pravděpodobně bude lišit):

- _Na blockchainu nejsou žádná tajemství_. Jakékoli informace, ke kterým má chytrý kontrakt přístup, jsou dostupné celému světu.
- Můžete řídit pořadí svých vlastních transakcí, ale ne to, kdy proběhnou transakce jiných lidí. To je důvod, proč může být změna povoleného limitu nebezpečná, protože umožňuje utrácejícímu utratit součet obou povolených limitů.
- Hodnoty typu `uint256` přetékají (wrap around). Jinými slovy, _0-1=2^256-1_. Pokud to není požadované chování, musíte to zkontrolovat (nebo použít knihovnu SafeMath, která to udělá za vás). Všimněte si, že to se změnilo v [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html).
- Provádějte všechny změny stavu konkrétního typu na konkrétním místě, protože to usnadňuje auditování. To je důvod, proč máme například `_approve`, kterou volají `approve`, `transferFrom`, `increaseAllowance` a `decreaseAllowance`
- Změny stavu by měly být atomické, bez jakékoli další akce uprostřed (jak můžete vidět v `_transfer`). Je to proto, že během změny stavu máte nekonzistentní stav. Například mezi okamžikem, kdy odečtete ze zůstatku odesílatele, a okamžikem, kdy přičtete k zůstatku příjemce, existuje méně tokenů, než by mělo. To by mohlo být potenciálně zneužito, pokud by mezi nimi byly operace, zejména volání jiného kontraktu.

Nyní, když jste viděli, jak je napsán kontrakt ERC-20 od OpenZeppelin, a zejména jak je zabezpečen, jděte a napište své vlastní bezpečné kontrakty a aplikace.

[Zde najdete více z mé práce](https://cryptodocguy.pro/).