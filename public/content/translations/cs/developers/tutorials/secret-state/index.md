---
title: "Použití nulové znalosti pro tajný stav"
description: "Onchain hry jsou omezené, protože nemohou uchovávat žádné skryté informace. Po přečtení tohoto tutoriálu bude čtenář schopen kombinovat důkazy s nulovou znalostí a serverové komponenty k vytvoření ověřitelných her s tajnou stavovou offchain komponentou. Technika, jak toho dosáhnout, bude demonstrována vytvořením hry hledání min (minesweeper)."
author: Ori Pomerantz
tags:
  [
    "server",
    "offchain",
    "centralizované",
    "nulová znalost",
    "zokrates",
    "mud"
  ]
skill: advanced
lang: cs
published: 2025-03-15
---

_Na blockchainu neexistují žádná tajemství_. Vše, co je zveřejněno na blockchainu, si může kdokoli přečíst. To je nutné, protože blockchain je založen na tom, že ho kdokoli může ověřit. Hry však často spoléhají na tajný stav. Například hra [hledání min](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) nedává absolutně žádný smysl, pokud se můžete jen podívat na průzkumník bloků a vidět mapu.

Nejjednodušším řešením je použít [serverovou komponentu](/developers/tutorials/server-components/) k uchování tajného stavu. Důvodem, proč používáme blockchain, je však zabránit podvádění ze strany vývojáře hry. Musíme zajistit poctivost serverové komponenty. Server může poskytnout haš stavu a použít [důkazy s nulovou znalostí](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) k prokázání, že stav použitý k výpočtu výsledku tahu je správný.

Po přečtení tohoto článku budete vědět, jak vytvořit tento druh serveru pro uchovávání tajného stavu, klienta pro zobrazení stavu a onchain komponentu pro komunikaci mezi nimi. Hlavní nástroje, které použijeme, budou:

| Nástroj                                       | Účel                                       |                        Ověřeno na verzi |
| --------------------------------------------- | ------------------------------------------ | --------------------------------------: |
| [Zokrates](https://zokrates.github.io/)       | Důkazy s nulovou znalostí a jejich ověření |   1.1.9 |
| [Typescript](https://www.typescriptlang.org/) | Programovací jazyk pro server i klienta    |   5.4.2 |
| [Node](https://nodejs.org/en)                 | Spuštění serveru                           | 20.18.2 |
| [Viem](https://viem.sh/)                      | Komunikace s blockchainem                  |  2.9.20 |
| [MUD](https://mud.dev/)                       | Onchain správa dat                         |  2.0.12 |
| [React](https://react.dev/)                   | Uživatelské rozhraní klienta               |  18.2.0 |
| [Vite](https://vitejs.dev/)                   | Poskytování klientského kódu               |   4.2.1 |

## Příklad hry Hledání min (Minesweeper) {#minesweeper}

[Hledání min](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) je hra, která obsahuje tajnou mapu s minovým polem. Hráč si vybere, kde bude kopat. Pokud je na daném místě mina, hra končí. V opačném případě hráč získá počet min v osmi polích obklopujících dané místo.

Tato aplikace je napsána pomocí [MUD](https://mud.dev/), což je framework, který nám umožňuje ukládat data na blockchainu pomocí [databáze klíč-hodnota](https://aws.amazon.com/nosql/key-value/) a automaticky synchronizovat tato data s offchain komponentami. Kromě synchronizace MUD usnadňuje poskytování řízení přístupu a umožňuje ostatním uživatelům bez oprávnění [rozšířit](https://mud.dev/guides/extending-a-world) naši aplikaci.

### Spuštění příkladu Hledání min {#running-minesweeper-example}

Chcete-li spustit příklad Hledání min:

1. Ujistěte se, že [máte nainstalované všechny předpoklady](https://mud.dev/quickstart#prerequisites): [Node](https://mud.dev/quickstart#prerequisites), [Foundry](https://book.getfoundry.sh/getting-started/installation), [`git`](https://git-scm.com/downloads), [`pnpm`](https://git-scm.com/downloads) a [`mprocs`](https://github.com/pvolok/mprocs).

2. Naklonujte repozitář.

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. Nainstalujte balíčky.

   ```sh copy
   cd 20240901-secret-state/
   pnpm install
   npm install -g mprocs
   ```

   Pokud byl Foundry nainstalován jako součást `pnpm install`, musíte restartovat příkazový řádek.

4. Zkompilujte kontrakty

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```

5. Spusťte program (včetně [anvil](https://book.getfoundry.sh/anvil/) blockchainu) a počkejte.

   ```sh copy
   mprocs
   ```

   Upozorňujeme, že spuštění trvá dlouho. Chcete-li vidět postup, nejprve pomocí šipky dolů přejděte na záložku _contracts_, abyste viděli, jak se nasazují MUD kontrakty. Když se zobrazí zpráva _Waiting for file changes…_, kontrakty jsou nasazeny a další postup se bude odehrávat na záložce _server_. Tam počkáte, dokud neobdržíte zprávu _Verifier address: 0x...._.

   Pokud je tento krok úspěšný, zobrazí se obrazovka `mprocs` s různými procesy vlevo a výstupem konzole pro aktuálně vybraný proces vpravo.

   ![Obrazovka mprocs](./mprocs.png)

   Pokud nastane problém s `mprocs`, můžete čtyři procesy spustit ručně, každý v samostatném okně příkazového řádku:

   - **Anvil**

     ```sh
     cd packages/contracts
     anvil --base-fee 0 --block-time 2
     ```

   - **Kontrakty**

     ```sh
     cd packages/contracts
     pnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **Server**

     ```sh
     cd packages/server
     pnpm start
     ```

   - **Klient**

     ```sh
     cd packages/client
     pnpm run dev
     ```

6. Nyní můžete přejít na [klienta](http://localhost:3000), kliknout na **New Game** (Nová hra) a začít hrát.

### Tabulky {#tables}

Potřebujeme [několik tabulek](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) na blockchainu.

- `Configuration`: Tato tabulka je singleton, nemá žádný klíč a jeden záznam. Slouží k uchovávání informací o konfiguraci hry:
  - `height`: Výška minového pole
  - `width`: Šířka minového pole
  - `numberOfBombs`: Počet bomb v každém minovém poli

- `VerifierAddress`: Tato tabulka je také singleton. Slouží k uchování jedné části konfigurace, adresy verifikačního kontraktu (`verifier`). Tuto informaci jsme mohli umístit do tabulky `Configuration`, ale je nastavována jinou komponentou, serverem, takže je jednodušší ji umístit do samostatné tabulky.

- `PlayerGame`: Klíčem je adresa hráče. Data jsou:

  - `gameId`: 32bajtová hodnota, která je hašem mapy, na které hráč hraje (identifikátor hry).
  - `win`: booleovská hodnota, která udává, zda hráč hru vyhrál.
  - `lose`: booleovská hodnota, která udává, zda hráč hru prohrál.
  - `digNumber`: počet úspěšných odkrytí políček ve hře.

- `GamePlayer`: Tato tabulka obsahuje reverzní mapování z `gameId` na adresu hráče.

- `Map`: Klíč je n-tice tří hodnot:

  - `gameId`: 32bajtová hodnota, která je hašem mapy, na které hráč hraje (identifikátor hry).
  - `x` souřadnice
  - `y` souřadnice

  Hodnota je jediné číslo. Je to 255, pokud byla detekována bomba. Jinak je to počet bomb v okolí daného místa plus jedna. Nemůžeme použít jen počet bomb, protože ve výchozím nastavení jsou všechna úložiště v EVM a všechny hodnoty řádků v MUD nulové. Musíme rozlišovat mezi „hráč zde ještě nekopal“ a „hráč zde kopal a zjistil, že v okolí nejsou žádné bomby“.

Kromě toho komunikace mezi klientem a serverem probíhá prostřednictvím onchain komponenty. To je také implementováno pomocí tabulek.

- `PendingGame`: Nevyřízené žádosti o spuštění nové hry.
- `PendingDig`: Nevyřízené požadavky na kopání na konkrétním místě v konkrétní hře. Toto je [offchain tabulka](https://mud.dev/store/tables#types-of-tables), což znamená, že se nezapisuje do úložiště EVM, je čitelná pouze mimo blockchain pomocí událostí.

### Provádění a datové toky {#execution-data-flows}

Tyto toky koordinují provádění mezi klientem, onchain komponentou a serverem.

#### Inicializace {#initialization-flow}

Když spustíte `mprocs`, dojde k těmto krokům:

1. [`mprocs`](https://github.com/pvolok/mprocs) spouští čtyři komponenty:

   - [Anvil](https://book.getfoundry.sh/anvil/), který spouští místní blockchain
   - [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts), který kompiluje (v případě potřeby) a nasazuje kontrakty pro MUD
   - [Client](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client), který spouští [Vite](https://vitejs.dev/) k poskytování uživatelského rozhraní a klientského kódu webovým prohlížečům.
   - [Server](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server), který provádí akce serveru

2. Balíček `contracts` nasadí kontrakty MUD a poté spustí [skript `PostDeploy.s.sol`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol). Tento skript nastaví konfiguraci. Kód z GitHubu specifikuje [minové pole 10x5 s osmi minami](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23).

3. [Server](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) se spouští [nastavením MUD](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6). Mimo jiné se tím aktivuje synchronizace dat, takže kopie příslušných tabulek existuje v paměti serveru.

4. Server zaregistruje funkci k provedení [při změně tabulky `Configuration`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23). [Tato funkce](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) se volá po spuštění `PostDeploy.s.sol` a úpravě tabulky.

5. Když má inicializační funkce serveru konfiguraci, [volá `zkFunctions`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35) pro inicializaci [části serveru s nulovou znalostí](#using-zokrates-from-typescript). To se nemůže stát, dokud nezískáme konfiguraci, protože funkce s nulovou znalostí musí mít šířku a výšku minového pole jako konstanty.

6. Po inicializaci části serveru s nulovou znalostí je dalším krokem [nasazení verifikačního kontraktu s nulovou znalostí na blockchain](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) a nastavení adresy ověřovatele v MUD.

7. Nakonec se přihlásíme k odběru aktualizací, abychom viděli, když hráč požádá buď [o spuštění nové hry](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71), nebo [o odkrytí pole v existující hře](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108).

#### Nová hra {#new-game-flow}

Toto se stane, když hráč požádá o novou hru.

1. Pokud pro tohoto hráče neprobíhá žádná hra nebo probíhá, ale s nulovým gameId, klient zobrazí [tlačítko nové hry](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175). Když uživatel stiskne toto tlačítko, [React spustí funkci `newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96).

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) je volání `System`. V MUD jsou všechna volání směrována přes kontrakt `World` a ve většině případů voláte `<namespace>__<název funkce>`. V tomto případě se volá `app__newGame`, které MUD následně přesměruje na [`newGame` v `GameSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22).

3. Onchain funkce zkontroluje, že hráč nemá žádnou rozehranou hru, a pokud ne, [přidá požadavek do tabulky `PendingGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21).

4. Server detekuje změnu v `PendingGame` a [spustí registrovanou funkci](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71). Tato funkce volá [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114), která zase volá [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144).

5. První věc, kterou `createGame` udělá, je [vytvoření náhodné mapy s příslušným počtem min](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135). Poté volá [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166), aby vytvořil mapu s prázdnými okraji, což je nutné pro Zokrates. Nakonec `createGame` volá [`calculateMapHash`](#calculateMapHash), aby získal haš mapy, který se používá jako ID hry.

6. Funkce `newGame` přidá novou hru do `gamesInProgress`.

7. Poslední věc, kterou server udělá, je zavolání [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43), které je na blockchainu. Tato funkce se nachází v jiném `System`, [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol), aby umožnila řízení přístupu. Řízení přístupu je definováno v [konfiguračním souboru MUD](https://mud.dev/config), [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72).

   Seznam přístupů umožňuje volat `System` pouze jediné adrese. To omezuje přístup k funkcím serveru na jedinou adresu, takže se nikdo nemůže vydávat za server.

8. Onchain komponenta aktualizuje příslušné tabulky:

   - Vytvoří hru v `PlayerGame`.
   - Nastaví reverzní mapování v `GamePlayer`.
   - Odebere požadavek z `PendingGame`.

9. Server identifikuje změnu v `PendingGame`, ale nic nedělá, protože [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) je nepravdivé.

10. Na klientu je [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) nastaven na položku `PlayerGame` pro adresu hráče. Když se změní `PlayerGame`, změní se i `gameRecord`.

11. Pokud je v `gameRecord` hodnota a hra ještě nebyla vyhrána ani prohrána, klient [zobrazí mapu](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190).

#### Odkrytí pole {#dig-flow}

1. Hráč [klikne na tlačítko buňky mapy](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), což zavolá [funkci `dig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36). Tato funkce volá [`dig` na blockchainu](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32).

2. Onchain komponenta [provádí řadu kontrol správnosti](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30) a pokud je úspěšná, přidá požadavek na odkrytí pole do [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31).

3. Server [detekuje změnu v `PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73). [Pokud je platný](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), [zavolá kód s nulovou znalostí](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (vysvětleno níže), aby vygeneroval jak výsledek, tak důkaz, že je platný.

4. [Server](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) volá [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) na blockchainu.

5. `digResponse` dělá dvě věci. Nejprve zkontroluje [důkaz s nulovou znalostí](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61). Poté, pokud je důkaz v pořádku, volá [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) pro skutečné zpracování výsledku.

6. `processDigResult` zkontroluje, zda byla hra [prohrána](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) nebo [vyhrána](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86), a [aktualizuje `Map`, onchain mapu](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80).

7. Klient automaticky zachytí aktualizace a [aktualizuje mapu zobrazenou hráči](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190) a případně hráči sdělí, zda se jedná o výhru, nebo prohru.

## Použití Zokrates {#using-zokrates}

Ve výše vysvětlených tocích jsme přeskočili části s nulovou znalostí a považovali je za černou skříňku. Teď ji otevřeme a podíváme se, jak je ten kód napsán.

### Hašování mapy {#hashing-map}

Můžeme použít [tento kód v JavaScriptu](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) k implementaci [Poseidon](https://www.poseidon-hash.info), hašovací funkce Zokrates, kterou používáme. Ačkoli by to však bylo rychlejší, bylo by to také složitější, než jen použít k tomu hašovací funkci Zokrates. Toto je tutoriál, takže kód je optimalizován pro jednoduchost, nikoli pro výkon. Proto potřebujeme dva různé programy Zokrates, jeden pro výpočet haše mapy (`hash`) a druhý pro vytvoření důkazu s nulovou znalostí o výsledku odkrytí pole na mapě (`dig`).

### Hašovací funkce {#hash-function}

Toto je funkce, která počítá haš mapy. Tento kód si projdeme řádek po řádku.

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

Tyto dva řádky importují dvě funkce ze [standardní knihovny Zokrates](https://zokrates.github.io/toolbox/stdlib.html). [První funkce](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) je [haš Poseidon](https://www.poseidon-hash.info/). Přijímá pole prvků [`field`](https://zokrates.github.io/language/types.html#field) a vrací `field`.

Prvek pole (field) v Zokrates je obvykle kratší než 256 bitů, ale ne o moc. Pro zjednodušení kódu omezujeme mapu na maximálně 512 bitů a hašujeme pole čtyř polí a v každém poli používáme pouze 128 bitů. [Funkce `pack128`](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) pro tento účel změní pole 128 bitů na `field`.

```
        def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

Tento řádek zahajuje definici funkce. `hashMap` dostane jediný parametr nazvaný `map`, dvourozměrné pole typu `bool`(ean). Velikost mapy je `width+2` krát `height+2` z důvodů, které jsou [vysvětleny níže](#why-map-border).

Můžeme použít `${width+2}` a `${height+2}`, protože programy Zokrates jsou v této aplikaci uloženy jako [šablonové řetězce](https://www.w3schools.com/js/js_string_templates.asp). Kód mezi `${` a `}` je vyhodnocen JavaScriptem, a tímto způsobem lze program použít pro různé velikosti mapy. Parametr mapy má kolem sebe okraj o šířce jedné pozice bez bomb, což je důvod, proč musíme k šířce a výšce přidat dva.

Návratová hodnota je `field`, který obsahuje haš.

```
   bool[512] mut map1d = [false; 512];
```

Mapa je dvourozměrná. Funkce `pack128` však nefunguje s dvourozměrnými poli. Takže nejprve zploštíme mapu do 512bajtového pole pomocí `map1d`. Ve výchozím nastavení jsou proměnné Zokrates konstanty, ale potřebujeme přiřadit hodnoty tomuto poli ve smyčce, takže ho definujeme jako [`mut`](https://zokrates.github.io/language/variables.html#mutability).

Musíme pole inicializovat, protože Zokrates nemá `undefined`. Výraz `[false; 512]` znamená [pole 512 hodnot `false`](https://zokrates.github.io/language/types.html#declaration-and-initialization).

```
   u32 mut counter = 0;
```

Potřebujeme také počítadlo k rozlišení mezi bity, které jsme již v `map1d` vyplnili, a těmi, které ještě ne.

```
   for u32 x in 0..${width+2} {
```

Takto se v Zokrates deklaruje [smyčka `for`](https://zokrates.github.io/language/control_flow.html#for-loops). Smyčka `for` v Zokrates musí mít pevné meze, protože i když se jeví jako smyčka, kompilátor ji ve skutečnosti „rozbalí“. Výraz `${width+2}` je konstanta v době kompilace, protože `width` je nastaven kódem TypeScript předtím, než zavolá kompilátor.

```
      for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

Pro každé místo na mapě vložte tuto hodnotu do pole `map1d` a zvyšte počítadlo.

```
    field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

`pack128` vytvoří z `map1d` pole čtyř hodnot typu `field`. V Zokrates znamená `array[a..b]` výsek pole, který začíná na `a` a končí na `b-1`.

```
    return poseidon(hashMe);
}
```

Použijte `poseidon` k převedení tohoto pole na haš.

### Hašovací program {#hash-program}

Server musí volat `hashMap` přímo k vytvoření identifikátorů hry. Zokrates však může pro spuštění volat pouze funkci `main` v programu, takže vytvoříme program s `main`, který volá hašovací funkci.

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### Program pro odkrytí pole {#dig-program}

Toto je srdce části aplikace s nulovou znalostí, kde vytváříme důkazy, které se používají k ověření výsledků odkrytí polí.

```
${hashFragment}

// Počet min na pozici (x,y)
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### Proč okraj mapy {#why-map-border}

Důkazy s nulovou znalostí používají [aritmetické obvody](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785), které nemají jednoduchý ekvivalent příkazu `if`. Místo toho používají ekvivalent [podmíněného operátoru](https://en.wikipedia.org/wiki/Ternary_conditional_operator). Pokud `a` může být buď nula, nebo jedna, můžete vypočítat `if a { b } else { c }` jako `ab+(1-a)c`.

Z tohoto důvodu příkaz `if` v Zokrates vždy vyhodnocuje obě větve. Například, pokud máte tento kód:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

Dojde k chybě, protože potřebuje vypočítat `arr[10]`, i když tato hodnota bude později vynásobena nulou.

To je důvod, proč potřebujeme okraj o šířce jednoho pole kolem celé mapy. Potřebujeme vypočítat celkový počet min v okolí pole, a to znamená, že musíme vidět pole o jeden řádek nad a pod, vlevo a vpravo od pole, které odkrýváme. Což znamená, že tato pole musí existovat v poli mapy, které je Zokrates poskytnuto.

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

Ve výchozím nastavení důkazy Zokrates obsahují své vstupy. Není k ničemu vědět, že kolem pole je pět min, pokud nevíte, o které pole se jedná (a nemůžete to jen porovnat s vaším požadavkem, protože pak by mohl dokazovatel použít jiné hodnoty a neříct vám o tom). Musíme však udržet mapu v tajnosti a zároveň ji poskytnout Zokrates. Řešením je použít `private` parametr, který _není_ odhalen důkazem.

To otevírá další možnost zneužití. Dokazovatel by mohl použít správné souřadnice, ale vytvořit mapu s libovolným počtem min kolem daného pole, a možná i na samotném poli. Abychom zabránili tomuto zneužití, zajistíme, aby důkaz s nulovou znalostí obsahoval haš mapy, který je identifikátorem hry.

```
   return (hashMap(map),
```

Návratová hodnota je zde n-tice, která obsahuje pole hašů mapy a výsledek odkrytí pole.

```
         if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

Používáme 255 jako speciální hodnotu pro případ, že na samotném poli je bomba.

```
            map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

Pokud hráč nenašel minu, sečtěte počty min v okolí pole a vraťte je.

### Použití Zokrates z TypeScriptu {#using-zokrates-from-typescript}

Zokrates má rozhraní příkazového řádku, ale v tomto programu ho používáme v [kódu TypeScript](https://zokrates.github.io/toolbox/zokrates_js.html).

Knihovna, která obsahuje definice Zokrates, se jmenuje [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts).

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

Importujte [JavaScriptové vazby Zokrates](https://zokrates.github.io/toolbox/zokrates_js.html). Potřebujeme pouze funkci [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize), protože vrací promise, který se vyřeší na všechny definice Zokrates.

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Podobně jako u samotného Zokrates, exportujeme také pouze jednu funkci, která je také [asynchronní](https://www.w3schools.com/js/js_async.asp). Když se nakonec vrátí, poskytne několik funkcí, jak uvidíme níže.

```typescript
const zokrates = await zokratesInitialize()
```

Inicializujte Zokrates, získejte vše, co potřebujeme z knihovny.

```typescript
const hashFragment = `
        import "utils/pack/bool/pack128.zok" as pack128;
        import "hashes/poseidon/poseidon.zok" as poseidon;
            .
            .
            .
        }
    `

const hashProgram = `
        ${hashFragment}
            .
            .
            .
    `

const digProgram = `
        ${hashFragment}
            .
            .
            .
    `
```

Dále máme hašovací funkci a dva programy Zokrates, které jsme viděli výše.

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

Zde tyto programy kompilujeme.

```typescript
// Vytvoří klíče pro ověření nulové znalosti.
// V produkčním systému byste chtěli použít setup ceremonii.
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

V produkčním systému bychom mohli použít složitější [setup ceremonii](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony), ale toto je pro demonstraci dostačující. Není problém, že uživatelé mohou znát klíč dokazovatele – stále ho nemohou použít k prokázání věcí, pokud nejsou pravdivé. Protože specifikujeme entropii (druhý parametr, `""`), výsledky budou vždy stejné.

**Poznámka:** Kompilace programů Zokrates a tvorba klíčů jsou pomalé procesy. Není třeba je opakovat pokaždé, pouze když se změní velikost mapy. V produkčním systému byste je provedli jednou a pak uložili výstup. Jediný důvod, proč to zde nedělám, je pro jednoduchost.

#### `calculateMapHash` {#calculateMapHash}

```typescript
const calculateMapHash = function (hashMe: boolean[][]): string {
  return (
    "0x" +
    BigInt(zokrates.computeWitness(hashCompiled, [hashMe]).output.slice(1, -1))
      .toString(16)
      .padStart(64, "0")
  )
}
```

Funkce [`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) skutečně spouští program Zokrates. Vrací strukturu se dvěma poli: `output`, což je výstup programu jako řetězec JSON, a `witness`, což je informace potřebná k vytvoření důkazu s nulovou znalostí výsledku. Zde potřebujeme pouze výstup.

Výstupem je řetězec ve formátu `"31337"`, desetinné číslo uzavřené v uvozovkách. Ale výstup, který potřebujeme pro `viem`, je hexadecimální číslo ve formátu `0x60A7`. Takže použijeme `.slice(1,-1)` k odstranění uvozovek a poté `BigInt` k převedení zbývajícího řetězce, což je desetinné číslo, na [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt). `.toString(16)` převede tento `BigInt` na hexadecimální řetězec a `"0x"+` přidá značku pro hexadecimální čísla.

```typescript
// Odkryjte pole a vraťte důkaz s nulovou znalostí o výsledku
// (kód na straně serveru)
```

Důkaz s nulovou znalostí zahrnuje veřejné vstupy (`x` a `y`) a výsledky (haš mapy a počet bomb).

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Pokus o odkrytí pole mimo mapu")
```

Je problém kontrolovat, zda je index mimo rozsah v Zokrates, takže to děláme zde.

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

Spusťte program pro odkrytí pole.

```typescript
        const proof = zokrates.generateProof(
            digCompiled.program,
            runResults.witness,
            proverKey)

        return proof
    }
```

Použijte [`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) a vraťte důkaz.

```typescript
const solidityVerifier = `
        // Velikost mapy: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

Ověřovatel Solidity, chytrý kontrakt, který můžeme nasadit na blockchain a použít k ověření důkazů generovaných `digCompiled.program`.

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

Nakonec vraťte vše, co by mohl jiný kód potřebovat.

## Bezpečnostní testy {#security-tests}

Bezpečnostní testy jsou důležité, protože chyba funkčnosti se nakonec projeví. Ale pokud je aplikace nezabezpečená, pravděpodobně to zůstane skryto po dlouhou dobu, než to odhalí někdo, kdo podvádí a získá zdroje, které patří ostatním.

### Oprávnění {#permissions}

V této hře je jedna privilegovaná entita, server. Je to jediný uživatel, který smí volat funkce v [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol). Můžeme použít [`cast`](https://book.getfoundry.sh/cast/) k ověření, že volání funkcí s oprávněním jsou povolena pouze jako účet serveru.

[Soukromý klíč serveru je v `setupNetwork.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52).

1. Na počítači, který spouští `anvil` (blockchain), nastavte tyto proměnné prostředí.

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. Použijte `cast` k pokusu o nastavení adresy ověřovatele jako neoprávněné adresy.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   Nejenže `cast` hlásí selhání, ale můžete otevřít **MUD Dev Tools** ve hře v prohlížeči, kliknout na **Tables** a vybrat **app\_\_VerifierAddress**. Podívejte se, že adresa není nulová.

3. Nastavte adresu ověřovatele jako adresu serveru.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   Adresa v **app\_\_VerifiedAddress** by nyní měla být nulová.

Všechny funkce MUD ve stejném `System` procházejí stejným řízením přístupu, takže tento test považuji za dostatečný. Pokud ne, můžete zkontrolovat ostatní funkce v [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol).

### Zneužití nulové znalosti {#zero-knowledge-abuses}

Matematika k ověření Zokrates je nad rámec tohoto tutoriálu (a mých schopností). Můžeme však spustit různé kontroly na kódu s nulovou znalostí, abychom ověřili, že pokud není proveden správně, selže. Všechny tyto testy budou vyžadovat, abychom změnili [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) a restartovali celou aplikaci. Nestačí restartovat proces serveru, protože to uvede aplikaci do nemožného stavu (hráč má rozehranou hru, ale hra již není pro server dostupná).

#### Špatná odpověď {#wrong-answer}

Nejjednodušší možností je poskytnout špatnou odpověď v důkazu s nulovou znalostí. Chcete-li to provést, přejděte do `zkDig` a [upravte řádek 91](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

To znamená, že budeme vždy tvrdit, že je tam jedna bomba, bez ohledu na správnou odpověď. Zkuste si zahrát s touto verzí a na kartě **server** na obrazovce `pnpm dev` uvidíte tuto chybu:

```
      cause: {
        code: 3,
        message: 'execution reverted: revert: Zero knowledge verification fail',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

Takže tento druh podvodu selže.

#### Špatný důkaz {#wrong-proof}

Co se stane, když poskytneme správné informace, ale máme jen špatná data důkazu? Nyní nahraďte řádek 91:

```ts
proof.proof = {
  a: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  b: [
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  ],
  c: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
}
```

Stále selhává, ale nyní selhává bez udání důvodu, protože k tomu dochází během volání ověřovatele.

### Jak může uživatel ověřit kód s nulovou znalostí? {#user-verify-zero-trust}

Chytré kontrakty je poměrně snadné ověřit. Vývojář obvykle zveřejní zdrojový kód v průzkumníku bloků a průzkumník bloků ověří, že se zdrojový kód zkompiluje do kódu v [transakci nasazení kontraktu](/developers/docs/smart-contracts/deploying/). V případě MUD `System`s je to [trochu složitější](https://mud.dev/cli/verify), ale ne o moc.

S nulovou znalostí je to těžší. Ověřovatel obsahuje některé konstanty a provádí s nimi některé výpočty. To vám neřekne, co se dokazuje.

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

Řešením, alespoň do doby, než průzkumníci bloků přidají ověřování Zokrates do svých uživatelských rozhraní, je, aby vývojáři aplikací zpřístupnili programy Zokrates a aby si alespoň někteří uživatelé sami zkompilovali s příslušným ověřovacím klíčem.

Postupujte takto:

1. [Nainstalujte Zokrates](https://zokrates.github.io/gettingstarted.html).

2. Vytvořte soubor `dig.zok` s programem Zokrates. Níže uvedený kód předpokládá, že jste ponechali původní velikost mapy, 10x5.

   ```zokrates
    import "utils/pack/bool/pack128.zok" as pack128;
    import "hashes/poseidon/poseidon.zok" as poseidon;

    def hashMap(bool[12][7] map) -> field {
        bool[512] mut map1d = [false; 512];
        u32 mut counter = 0;

        for u32 x in 0..12 {
            for u32 y in 0..7 {
                map1d[counter] = map[x][y];
                counter = counter+1;
            }
        }

        field[4] hashMe = [
            pack128(map1d[0..128]),
            pack128(map1d[128..256]),
            pack128(map1d[256..384]),
            pack128(map1d[384..512])
        ];

        return poseidon(hashMe);
    }


    // Počet min na pozici (x,y)
    def map2mineCount(bool[12][7] map, u32 x, u32 y) -> u8 {
        return if map[x+1][y+1] { 1 } else { 0 };
    }

    def main(private bool[12][7] map, u32 x, u32 y) -> (field, u8) {
        return (hashMap(map) ,
            if map2mineCount(map, x, y) > 0 { 0xFF } else {
                map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
                map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
                map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
            }
        );
    }
   ```

3. Zkompilujte kód Zokrates a vytvořte ověřovací klíč. Ověřovací klíč musí být vytvořen se stejnou entropií, jaká byla použita v původním serveru, [v tomto případě prázdný řetězec](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67).

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. Vytvořte si vlastní ověřovač Solidity a ověřte, že je funkčně shodný s tím na blockchainu (server přidává komentář, ale to není důležité).

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## Rozhodnutí o návrhu {#design}

V každé dostatečně složité aplikaci existují konkurenční cíle návrhu, které vyžadují kompromisy. Podívejme se na některé kompromisy a proč je současné řešení vhodnější než jiné možnosti.

### Proč nulová znalost {#why-zero-knowledge}

Pro Hledání min ve skutečnosti nepotřebujete nulovou znalost. Server může vždy držet mapu a pak ji jednoduše odhalit, když hra skončí. Poté na konci hry může chytrý kontrakt vypočítat haš mapy, ověřit, že se shoduje, a pokud ne, penalizovat server nebo hru zcela ignorovat.

Nepoužil jsem toto jednodušší řešení, protože funguje pouze pro krátké hry s dobře definovaným koncovým stavem. Když je hra potenciálně nekonečná (jako v případě [autonomních světů](https://0xparc.org/blog/autonomous-worlds)), potřebujete řešení, které prokáže stav, _aniž_ by ho odhalilo.

Jako tutoriál tento článek potřeboval krátkou hru, která je snadno pochopitelná, ale tato technika je nejužitečnější pro delší hry.

### Proč Zokrates? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) není jedinou dostupnou knihovnou s nulovou znalostí, ale je podobný normálnímu, [imperativnímu](https://en.wikipedia.org/wiki/Imperative_programming) programovacímu jazyku a podporuje booleovské proměnné.

Pro vaši aplikaci s odlišnými požadavky můžete raději použít [Circum](https://docs.circom.io/getting-started/installation/) nebo [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/).

### Kdy kompilovat Zokrates {#when-compile-zokrates}

V tomto programu kompilujeme programy Zokrates [pokaždé, když se server spustí](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61). Je to zjevné plýtvání zdroji, ale toto je tutoriál optimalizovaný pro jednoduchost.

Kdybych psal aplikaci na produkční úrovni, zkontroloval bych, zda mám soubor s kompilovanými programy Zokrates pro tuto velikost minového pole, a pokud ano, použil bych ho. Totéž platí pro nasazení ověřovacího kontraktu na blockchainu.

### Vytvoření klíčů ověřovatele a dokazovatele {#key-creation}

[Vytváření klíčů](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) je další čistý výpočet, který není nutné provádět více než jednou pro danou velikost minového pole. Opět se to dělá pouze jednou pro zjednodušení.

Kromě toho bychom mohli použít [setup ceremonii](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony). Výhodou setup ceremonie je, že k podvádění důkazu s nulovou znalostí potřebujete buď entropii, nebo nějaký mezivýsledek od každého účastníka. Pokud je alespoň jeden účastník ceremonie poctivý a smaže tyto informace, jsou důkazy s nulovou znalostí v bezpečí před určitými útoky. Neexistuje však _žádný mechanismus_, který by ověřil, že informace byly smazány všude. Pokud jsou důkazy s nulovou znalostí kriticky důležité, chcete se zúčastnit setup ceremonie.

Zde se spoléháme na [perpetual powers of tau](https://github.com/privacy-scaling-explorations/perpetualpowersoftau), kterých se zúčastnily desítky účastníků. Je to pravděpodobně dostatečně bezpečné a mnohem jednodušší. Během vytváření klíčů také nepřidáváme entropii, což uživatelům usnadňuje [ověření konfigurace s nulovou znalostí](#user-verify-zero-trust).

### Kde ověřovat {#where-verification}

Důkazy s nulovou znalostí můžeme ověřit buď na blockchainu (což stojí gas), nebo v klientovi (pomocí [`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof)). Zvolil jsem první možnost, protože to umožňuje [ověřit ověřovatele](#user-verify-zero-trust) jednou a pak důvěřovat, že se nezmění, dokud adresa kontraktu zůstane stejná. Pokud by se ověření provádělo na klientovi, museli byste ověřit kód, který obdržíte při každém stažení klienta.

Ačkoli je tato hra pro jednoho hráče, mnoho blockchainových her je pro více hráčů. Onchain ověření znamená, že důkaz s nulovou znalostí ověříte pouze jednou. Provedení v klientovi by vyžadovalo, aby každý klient ověřoval nezávisle.

### Zploštit mapu v TypeScriptu nebo Zokrates? {#where-flatten}

Obecně platí, že když lze zpracování provést buď v TypeScriptu, nebo v Zokrates, je lepší to udělat v TypeScriptu, který je mnohem rychlejší a nevyžaduje důkazy s nulovou znalostí. To je například důvod, proč neposkytujeme Zokrates haš a nenutíme ho ověřovat, že je správný. Hašování musí být provedeno uvnitř Zokrates, ale shoda mezi vráceným hašem a hašem na blockchainu může proběhnout mimo něj.

Přesto stále [zplošťujeme mapu v Zokrates](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20), i když jsme to mohli udělat v TypeScriptu. Důvodem je, že ostatní možnosti jsou podle mého názoru horší.

- Poskytněte jednorozměrné pole booleovských hodnot kódu Zokrates a použijte výraz jako `x*(height+2)
  +y` k získání dvourozměrné mapy. To by [kód](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) poněkud zkomplikovalo, takže jsem se rozhodl, že zvýšení výkonu za to pro tutoriál nestojí.

- Pošlete Zokrates jak jednorozměrné pole, tak dvourozměrné pole. Toto řešení nám však nic nepřináší. Kód Zokrates by musel ověřit, že poskytnuté jednorozměrné pole je skutečně správnou reprezentací dvourozměrného pole. Takže by nedošlo k žádnému zvýšení výkonu.

- Zploštit dvourozměrné pole v Zokrates. Toto je nejjednodušší možnost, takže jsem si ji vybral.

### Kde ukládat mapy {#where-store-maps}

V této aplikaci je [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) jednoduše proměnná v paměti. To znamená, že pokud váš server selže a je třeba ho restartovat, všechny uložené informace jsou ztraceny. Nejenže hráči nemohou pokračovat ve hře, nemohou ani začít novou hru, protože onchain komponenta si myslí, že stále mají rozehranou hru.

Toto je zjevně špatný návrh pro produkční systém, ve kterém byste tyto informace ukládali do databáze. Jediný důvod, proč jsem zde použil proměnnou, je, že se jedná o tutoriál a hlavní úvahou je jednoduchost.

## Závěr: Za jakých podmínek je toto vhodná technika? {#conclusion}

Takže teď víte, jak napsat hru se serverem, který ukládá tajný stav, který nepatří na blockchain. Ale v jakých případech byste to měli dělat? Jsou zde dvě hlavní úvahy.

- _Dlouhotrvající hra_: [Jak bylo zmíněno výše](#why-zero-knowledge), v krátké hře můžete jednoduše zveřejnit stav, jakmile hra skončí, a nechat vše ověřit. To ale není možnost, když hra trvá dlouhou nebo neurčitou dobu a stav musí zůstat tajný.

- _Určitá centralizace je přijatelná_: Důkazy s nulovou znalostí mohou ověřit integritu, že entita nefalšuje výsledky. Co nemohou udělat, je zajistit, že entita bude stále dostupná a bude odpovídat na zprávy. V situacích, kdy musí být dostupnost také decentralizovaná, nejsou důkazy s nulovou znalostí dostatečným řešením a potřebujete [výpočet více stran](https://en.wikipedia.org/wiki/Secure_multi-party_computation).

[Více z mé práce najdete zde](https://cryptodocguy.pro/).

### Poděkování {#acknowledgements}

- Alvaro Alonso si přečetl návrh tohoto článku a vyjasnil některé mé nejasnosti ohledně Zokrates.

Za zbývající chyby jsem zodpovědný já.
