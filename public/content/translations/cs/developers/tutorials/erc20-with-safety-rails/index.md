---
title: ERC-20 s bezpečnostními pojistkami
description: Jak pomoci lidem, aby se vyhnuli zbytečným chybám
author: Ori Pomerantz
lang: cs
tags: [ "erc-20" ]
skill: beginner
published: 2022-08-15
---

## Úvod {#introduction}

Jednou ze skvělých věcí na Ethereu je to, že neexistuje žádná centrální autorita, která by mohla upravit nebo zvrátit vaše transakce. Jedním z velkých problémů Etherea je naopak to, že neexistuje žádná centrální autorita, která by měla pravomoc napravovat chyby uživatelů nebo nelegitimní transakce. V tomto článku se dozvíte o některých běžných chybách, kterých se uživatelé dopouštějí u [ERC-20](/developers/docs/standards/tokens/erc-20/) tokenů, a také o tom, jak vytvářet ERC-20 kontrakty, které uživatelům pomáhají se těmto chybám vyhnout nebo které dávají centrální autoritě určitou pravomoc (například zmrazit účty).

Upozorňujeme, že ačkoli budeme používat [kontrakt tokenu ERC-20 od OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20), tento článek jej podrobně nevysvětluje. Tyto informace naleznete [zde](/developers/tutorials/erc20-annotated-code).

Pokud chcete vidět kompletní zdrojový kód:

1. Otevřete [Remix IDE](https://remix.ethereum.org/).
2. Klikněte na ikonu pro klonování z GitHubu (![ikona klonování z GitHubu](icon-clone.png)).
3. Naklonujte repozitář z GitHubu: `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. Otevřete **contracts > erc20-safety-rails.sol**.

## Vytvoření ERC-20 kontraktu {#creating-an-erc-20-contract}

Než budeme moci přidat funkcionalitu bezpečnostních pojistek, potřebujeme ERC-20 kontrakt. V tomto článku použijeme [průvodce kontrakty od OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/wizard). Otevřete jej v jiném prohlížeči a postupujte podle těchto pokynů:

1. Vyberte **ERC20**.

2. Zadejte tato nastavení:

   | Parametr         | Hodnota          |
   | ---------------- | ---------------- |
   | Název            | SafetyRailsToken |
   | Symbol           | SAFE             |
   | Premint          | 1000             |
   | Funkce           | Žádná            |
   | Řízení přístupu  | Ownable          |
   | Upgradovatelnost | Žádná            |

3. Přejděte nahoru a klikněte na **Otevřít v Remixu** (pro Remix) nebo **Stáhnout** pro použití jiného prostředí. Budu předpokládat, že používáte Remix. Pokud používáte něco jiného, proveďte příslušné změny.

4. Nyní máme plně funkční ERC-20 kontrakt. Importovaný kód uvidíte po rozbalení `.deps` > `npm`.

5. Zkompilujte, nasaďte a vyzkoušejte si kontrakt, abyste viděli, že funguje jako ERC-20 kontrakt. Pokud se potřebujete naučit používat Remix, [použijte tento tutoriál](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Běžné chyby {#common-mistakes}

### Chyby {#the-mistakes}

Uživatelé někdy posílají tokeny na špatnou adresu. Ačkoli jim nevidíme do hlavy, abychom věděli, co měli v úmyslu, existují dva typy chyb, které se stávají často a dají se snadno odhalit:

1. Odeslání tokenů na vlastní adresu kontraktu. Například u [tokenu OP od Optimism](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) se za necelé dva měsíce podařilo nashromáždit [přes 120 000](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) tokenů OP. To představuje značné jmění, o které lidé pravděpodobně jednoduše přišli.

2. Odeslání tokenů na prázdnou adresu, která neodpovídá ani [externě vlastněnému účtu (EOA)](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs), ani [chytrému kontraktu](/developers/docs/smart-contracts). Sice nemám statistiky o tom, jak často se to stává, ale [jeden incident mohl stát 20 000 000 tokenů](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Zabránění převodům {#preventing-transfers}

Kontrakt ERC-20 od OpenZeppelin obsahuje [„hook“ `_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368), který je volán před převodem tokenu. Ve výchozím stavu tento hook nic nedělá, ale můžeme na něj navázat vlastní funkcionalitu, například kontroly, které v případě problému transakci vrátí.

Chcete-li tento hook použít, přidejte za konstruktor tuto funkci:

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

Některé části této funkce pro vás mohou být nové, pokud nejste se Solidity příliš obeznámeni:

```solidity
        internal virtual
```

Klíčové slovo `virtual` znamená, že stejně jako jsme zdědili funkcionalitu z `ERC20` a přepsali tuto funkci, mohou i další kontrakty dědit z našeho kontraktu a tuto funkci přepsat.

```solidity
        override(ERC20)
```

Musíme explicitně uvést, že [přepisujeme](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding) definici `_beforeTokenTransfer` z tokenu ERC20. Z hlediska bezpečnosti jsou explicitní definice obecně mnohem lepší než implicitní – nemůžete zapomenout, že jste něco udělali, když to máte přímo před očima. To je také důvod, proč musíme určit, kterou nadtřídu `_beforeTokenTransfer` přepisujeme.

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

Tento řádek volá funkci `_beforeTokenTransfer` kontraktu nebo kontraktů, z nichž jsme dědili a které ji mají. V tomto případě je to pouze `ERC20`, kontrakt `Ownable` tento hook nemá. Přestože `ERC20._beforeTokenTransfer` v současné době nic nedělá, voláme ji pro případ, že by v budoucnu byla přidána nějaká funkcionalita (a my se pak rozhodli kontrakt znovu nasadit, protože kontrakty se po nasazení nemění).

### Kódování požadavků {#coding-the-requirements}

Do funkce chceme přidat tyto požadavky:

- Adresa `to` se nesmí rovnat `address(this)`, tedy adrese samotného kontraktu ERC-20.
- Adresa `to` nesmí být prázdná, musí to být buď:
  - Externě vlastněný účet (EOA). Nemůžeme přímo zkontrolovat, zda je adresa EOA, ale můžeme zkontrolovat zůstatek ETH na adrese. EOA mají téměř vždy nějaký zůstatek, i když se již nepoužívají – je těžké je vyčistit do posledního wei.
  - Chytrý kontrakt. Otestovat, zda je adresa chytrý kontrakt, je trochu těžší. Existuje operační kód, který kontroluje délku externího kódu, nazývaný [`EXTCODESIZE`](https://www.evm.codes/#3b), ale není přímo dostupný v Solidity. Musíme pro to použít [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html), což je assemblér pro EVM. Existují i další hodnoty, které bychom mohli použít ze Solidity ([`<address>.code` a `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types)), ale stojí více.

Projděme si nový kód řádek po řádku:

```solidity
        require(to != address(this), "Tokeny nelze posílat na adresu kontraktu");
```

Toto je první požadavek, zkontrolujte, že `to` a `this(address)` není totéž.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

Takto zkontrolujeme, zda je adresa kontrakt. Z Yulu nemůžeme přímo získat výstup, takže místo toho definujeme proměnnou, která bude obsahovat výsledek (v tomto případě `isToContract`). Yul funguje tak, že každý operační kód je považován za funkci. Nejprve tedy zavoláme [`EXTCODESIZE`](https://www.evm.codes/#3b), abychom získali velikost kontraktu, a poté použijeme [`GT`](https://www.evm.codes/#11), abychom zkontrolovali, že není nulová (pracujeme s neznaménkovými celými čísly, takže samozřejmě nemůže být záporná). Poté zapíšeme výsledek do `isToContract`.

```solidity
        require(to.balance != 0 || isToContract, "Tokeny nelze posílat na prázdnou adresu");
```

A nakonec tu máme samotnou kontrolu prázdných adres.

## Administrativní přístup {#admin-access}

Někdy je užitečné mít administrátora, který může napravovat chyby. Aby se snížilo riziko zneužití, může být tento administrátor [multisig](https://blog.logrocket.com/security-choices-multi-signature-wallets/), takže na akci se musí shodnout více lidí. V tomto článku budeme mít dvě administrativní funkce:

1. Zmrazování a rozmrazování účtů. To může být užitečné například v případě, že by účet mohl být kompromitován.
2. Vyčištění prostředků.

   Někdy podvodníci posílají podvodné tokeny do kontraktu skutečného tokenu, aby získali legitimitu. Příklad naleznete [zde](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders). Legitimní kontrakt ERC-20 je [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042). Podvod, který se za něj vydává, je [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe).

   Je také možné, že lidé omylem pošlou legitimní ERC-20 tokeny na náš kontrakt, což je další důvod, proč je dobré mít způsob, jak je dostat ven.

OpenZeppelin poskytuje dva mechanismy pro umožnění administrativního přístupu:

- [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) kontrakty mají jediného vlastníka. Funkce, které mají [modifikátor](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `onlyOwner`, může volat pouze tento vlastník. Vlastníci mohou převést vlastnictví na někoho jiného nebo se ho úplně vzdát. Práva všech ostatních účtů jsou obvykle totožná.
- [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) kontrakty mají [řízení přístupu na základě rolí (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control).

Pro zjednodušení v tomto článku používáme `Ownable`.

### Zmrazování a rozmrazování účtů {#freezing-and-thawing-contracts}

Zmrazování a rozmrazování účtů vyžaduje několik změn:

- [Mapování](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) z adres na [booleovské hodnoty](https://en.wikipedia.org/wiki/Boolean_data_type) pro sledování, které adresy jsou zmrazené. Všechny hodnoty jsou na začátku nulové, což se u booleovských hodnot interpretuje jako false. To je to, co chceme, protože ve výchozím nastavení nejsou účty zmrazeny.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- [Události](https://www.tutorialspoint.com/solidity/solidity_events.htm), které informují všechny zúčastněné o zmrazení nebo rozmrazení účtu. Technicky vzato nejsou události pro tyto akce vyžadovány, ale pomáhá to offchain kódu, aby mohl těmto událostem naslouchat a vědět, co se děje. Považuje se za slušnost, když je chytrý kontrakt emituje, když se stane něco, co by mohlo být pro někoho jiného relevantní.

  Události jsou indexovány, takže bude možné vyhledat všechny případy, kdy byl účet zmrazen nebo rozmrazen.

  ```solidity
    // Když jsou účty zmrazeny nebo rozmrazeny
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- Funkce pro zmrazování a rozmrazování účtů. Tyto dvě funkce jsou téměř totožné, takže si projdeme pouze funkci zmrazení.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  Funkce označené jako [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm) lze volat z jiných chytrých kontraktů nebo přímo transakcí.

  ```solidity
    {
        require(!frozenAccounts[addr], "Účet je již zmrazen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  Pokud je účet již zmrazen, transakce se vrátí. V opačném případě ho zmrazte a `emit`ujte událost.

- Změňte `_beforeTokenTransfer`, abyste zabránili přesunu prostředků ze zmrazeného účtu. Všimněte si, že prostředky lze stále převádět na zmrazený účet.

  ```solidity
       require(!frozenAccounts[from], "Účet je zmrazen");
  ```

### Vyčištění prostředků {#asset-cleanup}

K uvolnění ERC-20 tokenů držených tímto kontraktem musíme zavolat funkci na kontraktu tokenu, ke kterému patří, buď [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) nebo [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve). V tomto případě nemá smysl plýtvat palivem na povolenky, můžeme rovnou provést přímý převod.

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

Toto je syntaxe pro vytvoření objektu pro kontrakt, když obdržíme adresu. Můžeme to udělat, protože máme definici pro ERC-20 tokeny jako součást zdrojového kódu (viz řádek 4) a tento soubor obsahuje [definici pro IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol), což je rozhraní pro kontrakt ERC-20 od OpenZeppelin.

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

Jedná se o funkci vyčištění, takže pravděpodobně nechceme zanechat žádné tokeny. Místo ručního získávání zůstatku od uživatele můžeme tento proces rovnou zautomatizovat.

## Závěr {#conclusion}

Toto není dokonalé řešení – na problém "uživatel udělal chybu" neexistuje dokonalé řešení. Použití těchto typů kontrol však může alespoň některým chybám zabránit. Schopnost zmrazit účty, i když je nebezpečná, může být použita k omezení škod způsobených některými útoky tím, že hackerovi odepře ukradené prostředky.

[Více z mé práce najdete zde](https://cryptodocguy.pro/).
