---
title: Nasazení vašeho prvního chytrého kontraktu
description: Úvod do nasazení vašeho prvního chytrého kontraktu v testovací síti Etherea
author: "jdourlens"
tags:
  [
    "smart kontrakt účty",
    "remix",
    "solidity",
    "nasazování"
  ]
skill: beginner
lang: cs
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Předpokládáme, že se stejně jako my těšíte, až [nasadíte](/developers/docs/smart-contracts/deploying/) a budete interagovat s vaším prvním [chytrým kontraktem](/developers/docs/smart-contracts/) na blockchainu Etherea.

Nemějte obavy, jelikož se jedná o náš první chytrý kontrakt, nasadíme ho na [lokální testovací síti](/developers/docs/networks/), takže vás jeho nasazení nebude nic stát a budete si s ním moci hrát, jak se vám zlíbí.

## Napsání našeho kontraktu {#writing-our-contract}

Prvním krokem je [navštívit Remix](https://remix.ethereum.org/) a vytvořit nový soubor. V levé horní části rozhraní Remix přidejte nový soubor a zadejte požadovaný název souboru.

![Přidání nového souboru v rozhraní Remix](./remix.png)

Do nového souboru vložíme následující kód.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // Veřejná proměnná typu unsigned int pro uchování počtu
    uint256 public count = 0;

    // Funkce, která navyšuje náš čítač
    function increment() public {
        count += 1;
    }

    // Nepovinný getter pro získání hodnoty počítadla
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Pokud jste zvyklí programovat, snadno uhodnete, co tento program dělá. Zde je vysvětlení řádek po řádku:

- Řádek 4: Definujeme kontrakt s názvem `Counter`.
- Řádek 7: Náš kontrakt ukládá jedno celé číslo bez znaménka s názvem `count` začínající na 0.
- Řádek 10: První funkce změní stav kontraktu a navýší (`increment()`) naši proměnnou `count`.
- Řádek 15: Druhá funkce je pouze getter pro čtení hodnoty proměnné `count` mimo chytrý kontrakt. Všimněte si, že jelikož jsme naši proměnnou `count` definovali jako veřejnou (public), není to nutné, ale je to uvedeno jako příklad.

To je k našemu prvnímu jednoduchému chytrému kontraktu vše. Jak možná víte, vypadá to jako třída z jazyků OOP (objektově orientovaného programování), jako je Java nebo C++. Nyní je čas si s naším kontraktem pohrát.

## Nasazení našeho kontraktu {#deploying-our-contract}

Jelikož jsme napsali náš první chytrý kontrakt, nyní ho nasadíme na blockchain, abychom si s ním mohli hrát.

[Nasazení chytrého kontraktu na blockchain](/developers/docs/smart-contracts/deploying/) je vlastně jen odeslání transakce obsahující kód zkompilovaného chytrého kontraktu bez určení jakýchkoli příjemců.

Nejprve [zkopilujeme kontrakt](/developers/docs/smart-contracts/compiling/) kliknutím na ikonu kompilace na levé straně:

![Ikona kompilace v nástrojové liště Remix](./remix-compile-button.png)

Poté klikněte na tlačítko kompilace:

![Tlačítko kompilace v kompilátoru Solidity v Remixu](./remix-compile.png)

Můžete si vybrat možnost „Automatická kompilace“, takže kontrakt bude vždy zkompilován, když uložíte obsah v textovém editoru.

Poté přejděte na obrazovku "nasazení a spouštění transakcí":

![Ikona nasazení v nástrojové liště Remix](./remix-deploy.png)

Jakmile se ocitnete na obrazovce "nasazení a spouštění transakcí", dvakrát zkontrolujte, zda se zobrazuje název vašeho kontraktu, a klikněte na tlačítko Nasadit. Jak vidíte v horní části stránky, aktuální prostředí je „JavaScript VM“, to znamená, že nasadíme náš chytrý kontrakt a budeme s ním interagovat na lokálním testovacím blockchainu, abychom mohli testovat rychleji a bez poplatků.

![Tlačítko nasazení v kompilátoru Solidity v Remixu](./remix-deploy-button.png)

Jakmile kliknete na tlačítko „Nasadit“, uvidíte, že se váš kontrakt objeví ve spodní části. Kliknutím na šipku vlevo ho rozbalíte, abychom viděli obsah našeho kontraktu. Zde je naše proměnná `count`, naše funkce `increment()` a getter `getCounter()`.

Pokud kliknete na tlačítko `count` nebo `getCount`, ve skutečnosti se načte obsah proměnné `count` kontraktu a zobrazí se. Jelikož jsme funkci `increment` ještě nevolali, měla by se zobrazit 0.

![Tlačítko funkce v kompilátoru Solidity v Remixu](./remix-function-button.png)

Nyní zavoláme funkci `increment` kliknutím na tlačítko. Uvidíte záznamy o provedených transakcích, které se objeví ve spodní části okna. Uvidíte, že záznamy jsou odlišné, když stisknete tlačítko pro načtení dat namísto tlačítka `increment`. Je to proto, že čtení dat na blockchainu nevyžaduje žádné transakce (zápis) ani poplatky. Protože pouze úprava stavu blockchainu vyžaduje provedení transakce:

![Záznam transakcí](./transaction-log.png)

Po stisknutí tlačítka inkrementace, které vygeneruje transakci pro volání naší funkce `increment()`, přečteme při opětovném kliknutí na tlačítka `count` nebo `getCount` nově aktualizovaný stav našeho chytrého kontraktu, kde proměnná `count` bude větší než 0.

![Nově aktualizovaný stav chytrého kontraktu](./updated-state.png)

V dalším návodu si ukážeme, [jak můžete do svých chytrých kontraktů přidávat události](/developers/tutorials/logging-events-smart-contracts/). Zaznamenávání událostí je pohodlný způsob, jak ladit váš chytrý kontrakt a porozumět tomu, co se děje při volání funkce.
