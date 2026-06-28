---
title: "Nasazení vašeho prvního chytrého kontraktu"
description: "Úvod do nasazení vašeho prvního chytrého kontraktu v testovací síti Etherea"
author: "jdourlens"
tags: ["chytré kontrakty", "Remix", "Solidity", "nasazení"]
skill: beginner
breadcrumb: "Nasazení prvního kontraktu"
lang: cs
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Hádám, že jste stejně nadšení jako my, že můžete [nasadit](/developers/docs/smart-contracts/deploying/) svůj první [chytrý kontrakt](/developers/docs/smart-contracts/) na blockchainu Etherea a interagovat s ním.

Nebojte se, jelikož se jedná o náš první chytrý kontrakt, nasadíme ho v [lokální testovací síti](/developers/docs/networks/), takže vás jeho nasazení nebude nic stát a můžete si s ním hrát, jak dlouho budete chtít.

## Psaní našeho kontraktu {#writing-our-contract}

Prvním krokem je [navštívit Remix](https://remix.ethereum.org/) a vytvořit nový soubor. V levé horní části rozhraní Remixu přidejte nový soubor a zadejte požadovaný název.

![Adding a new file in the Remix interface](./remix.png)

Do nového souboru vložíme následující kód.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // Veřejná proměnná typu unsigned int pro uchování počtu
    uint256 public count = 0;

    // Funkce, která inkrementuje náš čítač
    function increment() public {
        count += 1;
    }

    // Nepotřebný getter pro získání hodnoty počtu
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Pokud jste zvyklí programovat, snadno uhodnete, co tento program dělá. Zde je vysvětlení řádek po řádku:

- Řádek 4: Definujeme kontrakt s názvem `Counter`.
- Řádek 7: Náš kontrakt ukládá jedno celé číslo bez znaménka (unsigned integer) s názvem `count`, které začíná na 0.
- Řádek 10: První funkce upraví stav kontraktu a inkrementuje (`increment()`) naši proměnnou `count`.
- Řádek 15: Druhá funkce je pouze getter, abychom mohli číst hodnotu proměnné `count` mimo chytrý kontrakt. Všimněte si, že jelikož jsme naši proměnnou `count` definovali jako veřejnou (public), není to nutné, ale je to zde uvedeno jako příklad.

To je pro náš první jednoduchý chytrý kontrakt vše. Jak možná víte, vypadá to jako třída z jazyků OOP (objektově orientovaného programování), jako je Java nebo C++. Nyní je čas si s naším kontraktem pohrát.

## Nasazení našeho kontraktu {#deploying-our-contract}

Jelikož jsme napsali náš úplně první chytrý kontrakt, nyní ho nasadíme na blockchain, abychom si s ním mohli hrát.

[Nasazení chytrého kontraktu na blockchain](/developers/docs/smart-contracts/deploying/) je vlastně jen odeslání transakce obsahující kód zkompilovaného chytrého kontraktu bez uvedení jakýchkoli příjemců.

Nejprve [zkompilujeme kontrakt](/developers/docs/smart-contracts/compiling/) kliknutím na ikonu kompilace na levé straně:

![The compile icon in the Remix toolbar](./remix-compile-button.png)

Poté klikněte na tlačítko kompilace (Compile):

![The compile button in the Remix solidity compiler](./remix-compile.png)

Můžete zaškrtnout možnost „Auto compile“, takže se kontrakt vždy zkompiluje, když uložíte obsah v textovém editoru.

Poté přejděte na obrazovku „Deploy & run transactions“:

![The deploy icon in the Remix toolbar](./remix-deploy.png)

Jakmile jste na obrazovce „Deploy & run transactions“, zkontrolujte, zda se zobrazuje název vašeho kontraktu, a klikněte na Deploy. Jak můžete vidět v horní části stránky, aktuální prostředí je „JavaScript VM“, což znamená, že náš chytrý kontrakt nasadíme a budeme s ním interagovat na lokálním testovacím blockchainu, abychom mohli testovat rychleji a bez jakýchkoli poplatků.

![The deploy button in the Remix solidity compiler](./remix-deploy-button.png)

Jakmile kliknete na tlačítko „Deploy“, uvidíte, že se váš kontrakt objeví ve spodní části. Kliknutím na šipku vlevo jej rozbalte, abychom viděli obsah našeho kontraktu. Zde je naše proměnná `counter`, naše funkce `increment()` a getter `getCounter()`.

Pokud kliknete na tlačítko `count` nebo `getCount`, načte se obsah proměnné `count` kontraktu a zobrazí se. Jelikož jsme funkci `increment` ještě nezavolali, mělo by se zobrazit 0.

![The function button in the Remix solidity compiler](./remix-function-button.png)

Nyní zavoláme funkci `increment` kliknutím na tlačítko. Ve spodní části okna uvidíte logy provedených transakcí. Všimnete si, že logy se liší, když stisknete tlačítko pro načtení dat namísto tlačítka `increment`. Je to proto, že čtení dat na blockchainu nevyžaduje žádné transakce (zápis) ani poplatky. Pouze úprava stavu blockchainu vyžaduje provedení transakce:

![A log of transactions](./transaction-log.png)

Po stisknutí tlačítka increment, které vygeneruje transakci pro volání naší funkce `increment()`, pokud klikneme zpět na tlačítka count nebo getCount, přečteme nově aktualizovaný stav našeho chytrého kontraktu, kde je proměnná count větší než 0.

![Newly updated state of the smart contract](./updated-state.png)

V dalším tutoriálu se podíváme na to, [jak můžete do svých chytrých kontraktů přidat události](/developers/tutorials/logging-events-smart-contracts/). Logování událostí je pohodlný způsob, jak ladit váš chytrý kontrakt a pochopit, co se děje při volání funkce.