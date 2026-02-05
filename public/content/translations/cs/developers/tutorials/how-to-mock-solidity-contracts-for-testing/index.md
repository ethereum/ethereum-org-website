---
title: Jak vytvořit maketu chytrých kontraktů Solidity pro testování
description: Proč byste si při testování měli dělat legraci ze svých kontraktů
author: Markus Waas
lang: cs
tags:
  [
    "solidity",
    "smart kontrakt účty",
    "testování",
    "mocking"
  ]
skill: intermediate
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[Mock objekty](https://wikipedia.org/wiki/Mock_object) jsou běžným návrhovým vzorem v objektově orientovaném programování. Pochází ze starého francouzského slova „mocquer“ s významem „dělat si legraci“ a vyvinulo se ve význam „napodobování něčeho skutečného“, což je vlastně to, co v programování děláme. Dělejte si prosím legraci ze svých chytrých kontraktů, jen pokud chcete, ale vytvářejte pro ně makety, kdykoli můžete. Usnadní vám to život.

## Unit testování kontraktů pomocí maket {#unit-testing-contracts-with-mocks}

Vytvoření makety kontraktu v podstatě znamená vytvoření druhé verze tohoto kontraktu, která se chová velmi podobně jako původní, ale způsobem, který může vývojář snadno ovládat. Často skončíte u složitých kontraktů, kde chcete pouze [testovat malé části kontraktu](/developers/docs/smart-contracts/testing/). Problém je, co když testování této malé části vyžaduje velmi specifický stav kontraktu, do kterého je obtížné se dostat?

Pokaždé byste mohli napsat složitou logiku nastavení testu, která kontrakt uvede do požadovaného stavu, nebo napíšete maketu. Vytvoření makety kontraktu je s dědičností snadné. Jednoduše vytvořte druhý mock kontrakt, který dědí z původního. Nyní můžete do své makety přepsat funkce. Ukažme si to na příkladu.

## Příklad: Privátní ERC20 {#example-private-erc20}

Použijeme příklad kontraktu ERC-20, který má počáteční soukromé období. Vlastník může spravovat soukromé uživatele a pouze ti budou moci na začátku přijímat tokeny. Jakmile uplyne určitá doba, bude moci tokeny používat každý. Pokud vás to zajímá, používáme hook [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) z nových kontraktů OpenZeppelin v3.

```solidity
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PrivateERC20 is ERC20, Ownable {
    mapping (address => bool) public isPrivateUser;
    uint256 private publicAfterTime;

    constructor(uint256 privateERC20timeInSec) ERC20("PrivateERC20", "PRIV") public {
        publicAfterTime = now + privateERC20timeInSec;
    }

    function addUser(address user) external onlyOwner {
        isPrivateUser[user] = true;
    }

    function isPublic() public view returns (bool) {
        return now >= publicAfterTime;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);

        require(_validRecipient(to), "PrivateERC20: invalid recipient");
    }

    function _validRecipient(address to) private view returns (bool) {
        if (isPublic()) {
            return true;
        }

        return isPrivateUser[to];
    }
}
```

A teď si vytvoříme maketu.

```solidity
pragma solidity ^0.6.0;
import "../PrivateERC20.sol";

contract PrivateERC20Mock is PrivateERC20 {
    bool isPublicConfig;

    constructor() public PrivateERC20(0) {}

    function setIsPublic(bool isPublic) external {
        isPublicConfig = isPublic;
    }

    function isPublic() public view returns (bool) {
        return isPublicConfig;
    }
}
```

Dostanete jednu z následujících chybových zpráv:

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

Protože používáme novou verzi Solidity 0.6, musíme přidat klíčové slovo `virtual` pro funkce, které lze přepsat, a `override` pro přepisující funkci. Přidejme je tedy k oběma funkcím `isPublic`.

Nyní ve svých unit testech můžete místo toho použít `PrivateERC20Mock`. Pokud chcete testovat chování během doby soukromého používání, použijte `setIsPublic(false)` a podobně `setIsPublic(true)` pro testování doby veřejného používání. V našem příkladu bychom samozřejmě mohli také použít [pomocné funkce pro čas](https://docs.openzeppelin.com/test-helpers/0.5/api#increase), abychom odpovídajícím způsobem změnili časy. Ale myšlenka mockingu by teď měla být jasná a dokážete si představit scénáře, kde to není tak snadné jako pouhé posunutí času.

## Vytváření maket mnoha kontraktů {#mocking-many-contracts}

Může to být nepřehledné, pokud musíte pro každou jednu maketu vytvářet další kontrakt. Pokud vám to vadí, můžete se podívat na knihovnu [MockContract](https://github.com/gnosis/mock-contract). Umožňuje přepisovat a měnit chování kontraktů za chodu. Funguje to však pouze pro mockování volání jiného kontraktu, takže by to pro náš příklad nefungovalo.

## Mocking může být ještě mocnější {#mocking-can-be-even-more-powerful}

Možnosti mockingu tím nekončí.

- Přidávání funkcí: Užitečné je nejen přepsání konkrétní funkce, ale také pouhé přidání dalších funkcí. Dobrým příkladem pro tokeny je mít pouze dodatečnou funkci `mint`, která umožní každému uživateli získat zdarma nové tokeny.
- Použití na testnetech: Když nasazujete a testujete své kontrakty na testnetech společně s vaší dapp, zvažte použití mock verze. Vyhněte se přepisování funkcí, pokud to opravdu nemusíte. Koneckonců chcete testovat skutečnou logiku. Ale přidání například resetovací funkce může být užitečné, která jednoduše resetuje stav kontraktu na začátek, není vyžadováno žádné nové nasazení. To byste samozřejmě nechtěli mít v kontraktu na hlavní síti.
