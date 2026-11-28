---
title: "ERC-20 s bezpečnostními pojistkami"
description: "Jak pomoci lidem vyhnout se hloupým chybám"
author: Ori Pomerantz
lang: cs
tags: ["erc-20"]
skill: beginner
breadcrumb: "Bezpečnost ERC-20"
published: 2022-08-15
---

## Úvod {#introduction}

Jednou ze skvělých věcí na Ethereu je, že neexistuje žádná centrální autorita, která by mohla upravovat nebo rušit vaše transakce. Jedním z velkých problémů Etherea je, že neexistuje žádná centrální autorita s pravomocí zvrátit chyby uživatelů nebo nezákonné transakce. V tomto článku se dozvíte o některých běžných chybách, kterých se uživatelé dopouštějí u [ERC-20](/developers/docs/standards/tokens/erc-20/) tokenů, a také o tom, jak vytvořit ERC-20 kontrakty, které uživatelům pomohou se těmto chybám vyhnout, nebo které dají centrální autoritě určitou moc (například zmrazit účty).

Vezměte prosím na vědomí, že ačkoli budeme používat [ERC-20 kontrakt od OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20), tento článek jej podrobně nevysvětluje. Tyto informace najdete [zde](/developers/tutorials/erc20-annotated-code).

Pokud chcete vidět kompletní zdrojový kód:

1. Otevřete [Remix IDE](https://remix.ethereum.org/).
2. Klikněte na ikonu klonování z GitHubu (![ikona klonování z GitHubu](icon-clone.png)).
3. Naklonujte repozitář z GitHubu `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. Otevřete **contracts > erc20-safety-rails.sol**.

Vezměte na vědomí, že repozitář byl napsán pro OpenZeppelin Contracts 4.7.2, kde se funkce, kterou tento článek přepisuje, nazývá `_beforeTokenTransfer`. Tento článek používá aktuální OpenZeppelin Contracts 5.x, kde místo toho přepisujete `_update`, takže se kód v tomto článku mírně liší od kódu v repozitáři.

## Vytvoření ERC-20 kontraktu {#creating-an-erc-20-contract}

Než budeme moci přidat funkci bezpečnostních pojistek, potřebujeme ERC-20 kontrakt. V tomto článku použijeme [OpenZeppelin Contracts Wizard](https://docs.openzeppelin.com/contracts/5.x/wizard). Otevřete jej v jiném prohlížeči a postupujte podle těchto pokynů:

1. Vyberte **ERC20**.
2. Zadejte tato nastavení:

   | Parametr       | Hodnota                   |
   | -------------- | ------------------------- |
   | Name           | SafetyRailsToken          |
   | Symbol         | SAFE                      |
   | Premint        | 1000                      |
   | Features       | None (zrušte zaškrtnutí **Permit**) |
   | Access Control | Ownable                   |
   | Upgradability  | None                      |

3. Přejděte nahoru a klikněte na **Open in Remix** (pro Remix) nebo **Download**, pokud chcete použít jiné prostředí. Budu předpokládat, že používáte Remix, pokud používáte něco jiného, jednoduše proveďte příslušné změny.
4. Nyní máme plně funkční ERC-20 kontrakt. Můžete rozbalit `.deps` > `npm`, abyste viděli importovaný kód.
5. Zkompilujte, nasaďte a pohrajte si s kontraktem, abyste viděli, že funguje jako ERC-20 kontrakt. Pokud se potřebujete naučit, jak používat Remix, [použijte tento tutoriál](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Běžné chyby {#common-mistakes}

### Chyby {#the-mistakes}

Uživatelé někdy posílají tokeny na špatnou adresu. I když neumíme číst jejich myšlenky, abychom věděli, co měli v úmyslu udělat, existují dva typy chyb, které se stávají často a lze je snadno odhalit:

1. Odeslání tokenů na vlastní adresu kontraktu. Například [OP token sítě Optimism](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) dokázal nashromáždit [více než 120 000](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) OP tokenů za méně než dva měsíce. To představuje značné množství bohatství, o které lidé pravděpodobně prostě přišli.

2. Odeslání tokenů na prázdnou adresu, která neodpovídá [externě vlastněnému účtu](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) ani [chytrému kontraktu](/developers/docs/smart-contracts). Ačkoli nemám statistiky o tom, jak často se to stává, [jeden incident mohl stát 20 000 000 tokenů](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Zabránění převodům {#preventing-transfers}

V ERC-20 kontraktu od OpenZeppelin prochází každá změna zůstatků, ať už jde o převod, ražení nebo spálení, přes [interní funkci `_update`](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20#ERC20-_update-address-address-uint256-). Můžeme ji přepsat a navázat na ni naši vlastní funkcionalitu, jako jsou kontroly, které transakci zvrátí, pokud nastane problém.

Chcete-li tak učinit, přidejte tuto funkci za konstruktor:

```solidity
    function _update(address from, address to, uint256 value)
        internal virtual
        override(ERC20)
    {
        super._update(from, to, value);
    }
```

Některé části této funkce mohou být nové, pokud nejste příliš obeznámeni se Solidity:

```solidity
        internal virtual
```

Klíčové slovo `virtual` znamená, že stejně jako jsme zdědili funkcionalitu z `ERC20` a přepsali tuto funkci, mohou z nás dědit další kontrakty a tuto funkci přepsat.

```solidity
        override(ERC20)
```

Musíme explicitně specifikovat, že [přepisujeme](https://docs.soliditylang.org/en/latest/contracts.html#function-overriding) definici `_update` z ERC-20 tokenu. Obecně platí, že explicitní definice jsou z hlediska bezpečnosti mnohem lepší než ty implicitní – nemůžete zapomenout, že jste něco udělali, když to máte přímo před sebou. To je také důvod, proč musíme specifikovat, čí `_update` z nadřazené třídy přepisujeme.

```solidity
        super._update(from, to, value);
```

Tento řádek volá funkci `_update` kontraktu nebo kontraktů, ze kterých jsme dědili a které ji mají. V tomto případě je to pouze `ERC20`, `Ownable` tuto funkci nemá. Na rozdíl od prázdného hooku je `ERC20._update` to, co skutečně přesouvá tokeny, takže je nezbytné ji zavolat. Naše kontroly probíhají před tímto voláním, takže mohou transakci zvrátit před jakýmikoli změnami zůstatku.

### Kódování požadavků {#coding-the-requirements}

Chceme do funkce přidat tyto požadavky. Protože se `_update` volá také při spálení tokenů, kdy je `to` nastaveno na `address(0)`, kontrolujeme `to` pouze tehdy, když to není `address(0)`:

- Adresa `to` se nesmí rovnat `address(this)`, což je adresa samotného ERC-20 kontraktu.
- Adresa `to` nesmí být prázdná, musí to být buď:
  - Externě vlastněný účet (EOA). Nemůžeme přímo zkontrolovat, zda je adresa EOA, ale můžeme zkontrolovat zůstatek ETH na adrese. EOA mají téměř vždy nějaký zůstatek, i když se již nepoužívají – je obtížné je vyprázdnit do posledního Wei.
  - Chytrý kontrakt. Testování, zda je adresa chytrý kontrakt, je o něco těžší. Existuje operační kód, který kontroluje délku externího kódu, nazvaný [`EXTCODESIZE`](https://www.evm.codes/#3b). V Solidity jej můžete získat pomocí [`<address>.code.length`](https://docs.soliditylang.org/en/latest/units-and-global-variables.html#members-of-address-types), což kompilátor převede na `EXTCODESIZE`. Zde používáme [Yul](https://docs.soliditylang.org/en/latest/yul.html), což je EVM assembly, abychom ukázali, jak volat operační kód přímo. Vezměte na vědomí, že od [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) může mít EOA také kód (delegaci na kontrakt), takže tato kontrola identifikuje účty s kódem, nikoli striktně kontrakty. Pro náš účel, kterým je odmítnutí prázdných adres, je to v pořádku.

Zde je kompletní funkce:

```solidity
    function _update(address from, address to, uint256 value)
        internal virtual
        override(ERC20)
    {
        // Spálení odesílá tokeny na adresu(0), neblokujte to
        if (to != address(0)) {
            require(to != address(this), "Can't send tokens to the contract address");

            bool isToContract;
            assembly {
               isToContract := gt(extcodesize(to), 0)
            }

            require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
        }

        super._update(from, to, value);
    }
```

Pojďme si projít nový kód řádek po řádku:

```solidity
        require(to != address(this), "Can't send tokens to the contract address");
```

Toto je první požadavek, zkontrolujte, že `to` a `this(address)` nejsou to samé.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

Takto kontrolujeme, zda je adresa kontrakt. Nemůžeme přijímat výstup přímo z Yul, takže místo toho definujeme proměnnou, která bude obsahovat výsledek (v tomto případě `isToContract`). Yul funguje tak, že každý operační kód je považován za funkci. Takže nejprve zavoláme [`EXTCODESIZE`](https://www.evm.codes/#3b), abychom získali velikost kontraktu, a poté použijeme [`GT`](https://www.evm.codes/#11), abychom zkontrolovali, že není nula (pracujeme s celými čísly bez znaménka, takže samozřejmě nemůže být záporná). Výsledek pak zapíšeme do `isToContract`.

```solidity
        require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
```

A nakonec tu máme samotnou kontrolu prázdných adres.

## Administrativní přístup {#admin-access}

Někdy je užitečné mít administrátora, který může zvrátit chyby. Aby se snížilo riziko zneužití, může být tímto administrátorem [multisig](https://blog.logrocket.com/security-choices-multi-signature-wallets/), takže se na akci musí shodnout více lidí. V tomto článku budeme mít dvě administrativní funkce:

1. Zmrazení a rozmrazení účtů. To může být užitečné například tehdy, když by mohl být účet kompromitován.
2. Úklid aktiv.

   Podvodníci někdy posílají podvodné tokeny na kontrakt skutečného tokenu, aby získali legitimitu. Například [viz zde](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders). Legitimní ERC-20 kontrakt je [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042). Podvod, který se za něj vydává, je [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe).

   Je také možné, že lidé omylem pošlou legitimní ERC-20 tokeny na náš kontrakt, což je další důvod, proč chtít mít způsob, jak je dostat ven.

OpenZeppelin poskytuje dva mechanismy pro umožnění administrativního přístupu:

- Kontrakty [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) mají jediného vlastníka. Funkce, které mají [modifikátor](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers) `onlyOwner`, může volat pouze tento vlastník. Vlastníci mohou převést vlastnictví na někoho jiného nebo se ho zcela vzdát. Práva všech ostatních účtů jsou obvykle identická.
- Kontrakty [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) mají [řízení přístupu na základě rolí (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control).

Pro zjednodušení v tomto článku používáme `Ownable`.

### Zmrazení a rozmrazení kontraktů {#freezing-and-thawing-contracts}

Zmrazení a rozmrazení kontraktů vyžaduje několik změn:

- [Mapování](https://docs.soliditylang.org/en/latest/types.html#mapping-types) z adres na [booleovské hodnoty](https://en.wikipedia.org/wiki/Boolean_data_type), abychom měli přehled o tom, které adresy jsou zmrazené. Všechny hodnoty jsou zpočátku nula, což se u booleovských hodnot interpretuje jako nepravda (false). To je to, co chceme, protože ve výchozím nastavení nejsou účty zmrazené.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- [Události](https://docs.soliditylang.org/en/latest/contracts.html#events), které informují každého zájemce, když je účet zmrazen nebo rozmrazen. Technicky vzato nejsou události pro tyto akce vyžadovány, ale pomáhá to offchain kódu, aby mohl těmto událostem naslouchat a vědět, co se děje. Považuje se za dobré mravy, když je chytrý kontrakt emituje, když se stane něco, co by mohlo být relevantní pro někoho jiného.

  Události jsou indexovány, takže bude možné vyhledat všechny případy, kdy byl účet zmrazen nebo rozmrazen.

  ```solidity
    // Když jsou účty zmrazeny nebo rozmrazeny
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- Funkce pro zmrazení a rozmrazení účtů. Tyto dvě funkce jsou téměř identické, takže si projdeme pouze funkci zmrazení.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  Funkce označené jako [`public`](https://docs.soliditylang.org/en/latest/contracts.html#function-visibility) mohou být volány z jiných chytrých kontraktů nebo přímo transakcí.

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // zmrazit účet
  ```

  Pokud je účet již zmrazen, transakci zvrátit. V opačném případě jej zmrazte a emitujte (`emit`) událost.

- Změňte `_update`, abyste zabránili přesunu peněz ze zmrazeného účtu. Vezměte na vědomí, že peníze lze na zmrazený účet stále převádět. Umístěte tento řádek na začátek funkce, mimo blok `if`, takže také zabrání spálení tokenů ze zmrazeného účtu.

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
  ```

### Úklid aktiv {#asset-cleanup}

Abychom uvolnili ERC-20 tokeny držené tímto kontraktem, musíme zavolat funkci na token kontraktu, ke kterému patří, a to buď [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) nebo [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve). V tomto případě nemá smysl plýtvat gas na povolenky (allowances), můžeme rovnou provést přímý převod.

```solidity
    function cleanupERC20(
        address erc20,
        address dest
    )
        public
        onlyOwner
    {
        IERC20 token = IERC20(erc20);
```

Toto je syntaxe pro vytvoření objektu pro kontrakt, když obdržíme adresu. K jejímu použití potřebujeme [definici pro IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol), rozhraní pro ERC-20 kontrakt od OpenZeppelin. Řádek `import {ERC20} from ...` z Wizardu přináší pouze `ERC20`, takže přidejte tento řádek vedle ostatních importů na začátek souboru:

```solidity
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

Toto je funkce pro úklid, takže pravděpodobně nechceme zanechat žádné tokeny. Místo toho, abychom získávali zůstatek od uživatele ručně, můžeme tento proces rovnou automatizovat.

## Závěr {#conclusion}

Toto není dokonalé řešení – neexistuje žádné dokonalé řešení problému „uživatel udělal chybu“. Použití těchto druhů kontrol však může alespoň některým chybám zabránit. Schopnost zmrazit účty, ačkoli je nebezpečná, může být použita k omezení škod způsobených určitými hacky tím, že hackerovi odepře přístup k ukradeným prostředkům.

[Zde najdete další mou práci](https://cryptodocguy.pro/).
