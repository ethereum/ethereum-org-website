---
title: "Testování jednoduchého chytrého kontraktu s knihovnou Waffle"
description: "Návod pro začátečníky"
author: Ewa Kowalska
tags:
  [
    "smart kontrakt účty",
    "solidity",
    "Waffle",
    "testování"
  ]
skill: beginner
lang: cs
published: 2021-02-26
---

## V tomto návodu se naučíte, jak {#in-this-tutorial-youll-learn-how-to}

- Testovat změny zůstatku peněženky
- Testovat emisi událostí se zadanými argumenty
- Ověřit, že byla transakce vrácena

## Předpoklady {#assumptions}

- Můžete vytvořit nový projekt v JavaScriptu nebo TypeScriptu
- Máte nějaké základní zkušenosti s testy v JavaScriptu
- Použili jste nějaké správce balíčků jako yarn nebo npm
- Máte velmi základní znalosti chytrých kontraktů a Solidity

## Začínáme {#getting-started}

Tento návod ukazuje nastavení a spuštění testu pomocí yarn, ale není problém, pokud dáváte přednost npm – poskytnu správné odkazy na oficiální [dokumentaci](https://ethereum-waffle.readthedocs.io/en/latest/index.html) Waffle.

## Instalace závislostí {#install-dependencies}

[Přidejte](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#installation) závislosti ethereum-waffle a typescript do vývojářských závislostí vašeho projektu.

```bash
yarn add --dev ethereum-waffle ts-node typescript @types/jest
```

## Příklad chytrého kontraktu {#example-smart-contract}

Během tohoto návodu budeme pracovat na jednoduchém příkladu chytrého kontraktu – EtherSplitter. Nedělá toho moc kromě toho, že umožňuje komukoli poslat nějaké wei a rovnoměrně je rozdělit mezi dva předdefinované příjemce.
Funkce `split` vyžaduje, aby byl počet wei sudý, jinak se vrátí zpět. Pro oba příjemce provádí převod wei následovaný emisí události Transfer.

Vložte úryvek kódu EtherSplitter do `src/EtherSplitter.sol`.

```solidity
pragma solidity ^0.6.0;

contract EtherSplitter {
    address payable receiver1;
    address payable receiver2;

    event Transfer(address from, address to, uint256 amount);

    constructor(address payable _address1, address payable _address2) public {
        receiver1 = _address1;
        receiver2 = _address2;
    }

    function split() public payable {
        require(msg.value % 2 == 0, 'Lichá částka wei není povolena');
        receiver1.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver1, msg.value / 2);
        receiver2.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver2, msg.value / 2);
    }
}
```

## Kompilace kontraktu {#compile-the-contract}

Pro [kompilaci](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#compiling-the-contract) kontraktu přidejte následující položku do souboru package.json:

```json
"scripts": {
    "build": "waffle"
  }
```

Dále vytvořte konfigurační soubor Waffle v kořenovém adresáři projektu – `waffle.json` – a poté tam vložte následující konfiguraci:

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./src",
  "outputDirectory": "./build"
}
```

Spusťte `yarn build`. Výsledkem je, že se objeví adresář `build` s kompilovaným kontraktem EtherSplitter ve formátu JSON.

## Nastavení testu {#test-setup}

Testování pomocí Waffle vyžaduje použití Chai matchers a Mocha, takže je musíte [přidat](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests) do svého projektu. Aktualizujte soubor package.json a přidejte položku `test` do části se skripty:

```json
"scripts": {
    "build": "waffle",
    "test": "export NODE_ENV=test && mocha -r ts-node/register 'test/**/*.test.ts'"
  }
```

Chcete-li [spustit](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#running-tests) své testy, stačí spustit `yarn test` .

## Testování {#testing}

Nyní vytvořte adresář `test` a vytvořte nový soubor `test\EtherSplitter.test.ts`.
Zkopírujte úryvek níže a vložte jej do našeho testovacího souboru.

```ts
import { expect, use } from "chai"
import { Contract } from "ethers"
import { deployContract, MockProvider, solidity } from "ethereum-waffle"
import EtherSplitter from "../build/EtherSplitter.json"

use(solidity)

describe("Rozdělovač etheru", () => {
  const [sender, receiver1, receiver2] = new MockProvider().getWallets()
  let splitter: Contract

  beforeEach(async () => {
    splitter = await deployContract(sender, EtherSplitter, [
      receiver1.address,
      receiver2.address,
    ])
  })

  // sem přidejte testy
})
```

Pár slov na úvod.
`MockProvider` poskytuje testovací verzi blockchainu. Poskytuje také testovací peněženky, které nám poslouží k testování kontraktu EtherSplitter. Můžeme získat až deset peněženek zavoláním metody `getWallets()` na providera. V příkladu získáme tři peněženky – pro odesílatele a pro dva příjemce.

Dále deklarujeme proměnnou nazvanou „splitter“ – to je náš testovací kontrakt EtherSplitter. Vytváří se před každým spuštěním jednotlivého testu metodou `deployContract`. Tato metoda simuluje nasazení kontraktu z peněženky předané jako první parametr (v našem případě peněženky odesílatele). Druhým parametrem je ABI a bytecode testovaného kontraktu – předáme tam soubor json zkompilovaného kontraktu EtherSplitter z adresáře `build`. Třetím parametrem je pole s argumenty konstruktoru kontraktu, což jsou v našem případě dvě adresy příjemců.

## changeBalances {#changebalances}

Nejprve zkontrolujeme, zda metoda split skutečně změní zůstatky v peněženkách příjemců. Pokud rozdělíme 50 wei z účtu odesílatele, očekávali bychom, že zůstatky obou příjemců se zvýší o 25 wei. Použijeme matcher `changeBalances` od Waffle:

```ts
it("Změní zůstatky účtů", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalances(
    [receiver1, receiver2],
    [25, 25]
  )
})
```

Jako první parametr matcheru předáváme pole peněženek příjemců a jako druhý – pole očekávaných navýšení na odpovídajících účtech.
Pokud bychom chtěli zkontrolovat zůstatek jedné konkrétní peněženky, mohli bychom také použít matcher `changeBalance`, který nevyžaduje předávání polí, jako v příkladu níže:

```ts
it("Změní zůstatek účtu", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalance(
    receiver1,
    25
  )
})
```

Všimněte si, že v obou případech `changeBalance` a `changeBalances` předáváme funkci split jako callback, protože matcher potřebuje přístup ke stavu zůstatků před a po volání.

Dále otestujeme, zda byla po každém převodu wei emitována událost Transfer. Obrátíme se na další matcher od Waffle:

## Emit {#emit}

```ts
it("Emituje událost při převodu na prvního příjemce", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver1.address, 25)
})

it("Emituje událost při převodu na druhého příjemce", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver2.address, 25)
})
```

Matcher `emit` nám umožňuje zkontrolovat, zda kontrakt emitoval událost při volání metody. Jako parametry matcheru `emit` poskytneme testovací kontrakt, u kterého předpokládáme emisi události, spolu s názvem této události. V našem případě je testovacím kontraktem `splitter` a název události – `Transfer`. Můžeme také ověřit přesné hodnoty argumentů, se kterými byla událost emitována – do matcheru `withArgs` předáme tolik argumentů, kolik naše deklarace události očekává. V případě kontraktu EtherSplitter předáváme adresy odesílatele a příjemce spolu s převedenou částkou wei.

## revertedWith {#revertedwith}

Jako poslední příklad zkontrolujeme, zda byla transakce vrácena v případě lichého počtu wei. Použijeme matcher `revertedWith`:

```ts
it("Vrátí zpět, když je částka wei lichá", async () => {
  await expect(splitter.split({ value: 51 })).to.be.revertedWith(
    "Lichá částka wei není povolena"
  )
})
```

Test, pokud projde, nás ujistí, že transakce byla skutečně vrácena. Musí však také existovat přesná shoda mezi zprávami, které jsme předali v příkazu `require`, a zprávou, kterou očekáváme v `revertedWith`. Pokud se vrátíme ke kódu kontraktu EtherSplitter, v příkazu `require` pro částku wei poskytujeme zprávu: ‚Lichá částka wei není povolena‘. Ta se shoduje se zprávou, kterou očekáváme v našem testu. Pokud by se neshodovaly, test by selhal.

## Gratulujeme! {#congratulations}

Udělali jste první velký krok k testování chytrých kontraktů s Waffle!
