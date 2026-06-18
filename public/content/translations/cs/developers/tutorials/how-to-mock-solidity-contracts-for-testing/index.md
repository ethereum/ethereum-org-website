---
title: Jak mockovat chytré kontrakty v Solidity pro testování
description: Proč byste si při testování měli dělat legraci ze svých kontraktů
author: Markus Waas
lang: cs
tags:
  - solidity
  - chytré kontrakty
  - testování
  - mockování
skill: intermediate
breadcrumb: Mockování kontraktů
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[Mock objekty](https://wikipedia.org/wiki/Mock_object) jsou běžným návrhovým vzorem v objektově orientovaném programování. Slovo pochází ze starofrancouzského „mocquer“, což znamená „dělat si legraci“, a postupně se vyvinulo ve význam „napodobovat něco skutečného“, což je přesně to, co děláme v programování. Dělejte si ze svých chytrých kontraktů legraci jen tehdy, když opravdu chcete, ale mockujte je, kdykoli můžete. Usnadní vám to život.

## Unit testování kontraktů pomocí mocků {#unit-testing-contracts-with-mocks}

Mockování kontraktu v podstatě znamená vytvoření jeho druhé verze, která se chová velmi podobně jako ta původní, ale způsobem, který může vývojář snadno ovládat. Často skončíte u složitých kontraktů, kde chcete pouze [unit testovat malé části kontraktu](/developers/docs/smart-contracts/testing/). Problém je v tom, co když testování této malé části vyžaduje velmi specifický stav kontraktu, do kterého je obtížné se dostat?

Pokaždé byste mohli psát složitou logiku pro nastavení testu, která kontrakt uvede do požadovaného stavu, nebo napíšete mock. Mockování kontraktu je snadné díky dědičnosti. Jednoduše vytvořte druhý mock kontrakt, který dědí z toho původního. Nyní můžete ve svém mocku přepisovat (override) funkce. Pojďme si to ukázat na příkladu.

## Příklad: Privátní ERC-20 {#example-private-erc20}

Použijeme ukázkový ERC-20 kontrakt, který má počáteční privátní období. Vlastník může spravovat privátní uživatele a pouze ti budou moci na začátku přijímat tokeny. Jakmile uplyne určitá doba, budou moci tokeny používat všichni. Pokud vás to zajímá, používáme hook [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) z nových kontraktů OpenZeppelin v3.

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

A teď si ho namockujeme.

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

Vzhledem k tomu, že používáme novou verzi Solidity 0.6, musíme přidat klíčové slovo `virtual` pro funkce, které lze přepsat, a override pro přepisující funkci. Pojďme je tedy přidat do obou funkcí `isPublic`.

Nyní můžete ve svých unit testech místo toho použít `PrivateERC20Mock`. Když chcete testovat chování během doby privátního používání, použijte `setIsPublic(false)` a podobně `setIsPublic(true)` pro testování doby veřejného používání. V našem příkladu bychom samozřejmě mohli k odpovídající změně časů použít také [časové pomocníky (time helpers)](https://docs.openzeppelin.com/test-helpers/0.5/api#increase). Myšlenka mockování by však nyní měla být jasná a jistě si dokážete představit scénáře, kde to není tak snadné jako pouhé posunutí času.

## Mockování mnoha kontraktů {#mocking-many-contracts}

Může to začít být nepřehledné, pokud musíte pro každý jednotlivý mock vytvořit další kontrakt. Pokud vám to vadí, můžete se podívat na knihovnu [MockContract](https://github.com/gnosis/mock-contract). Umožňuje vám přepisovat a měnit chování kontraktů za běhu (on-the-fly). Funguje však pouze pro mockování volání jiného kontraktu, takže pro náš příklad by to nefungovalo.

## Mockování může být ještě mocnější {#mocking-can-be-even-more-powerful}

Možnosti mockování tím nekončí.

- Přidávání funkcí: Užitečné není jen přepisování konkrétní funkce, ale také pouhé přidávání dalších funkcí. Dobrým příkladem u tokenů je přidání funkce `mint`, která umožní jakémukoli uživateli získat nové tokeny zdarma.
- Použití v testnetech: Když nasazujete a testujete své kontrakty na testnetech společně s vaší decentralizovanou aplikací (dapp), zvažte použití mockované verze. Vyhněte se přepisování funkcí, pokud opravdu nemusíte. Koneckonců chcete testovat skutečnou logiku. Ale přidání například funkce reset, která jednoduše resetuje stav kontraktu na začátek, může být užitečné, aniž by bylo nutné nové nasazení. Je zřejmé, že v kontraktu na Mainnetu byste něco takového mít nechtěli.