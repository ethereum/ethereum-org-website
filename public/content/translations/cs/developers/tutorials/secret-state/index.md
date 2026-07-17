---
title: "Využití nulového vědomí pro tajný stav"
description: "Onchain hry jsou omezené, protože nemohou uchovávat žádné skryté informace. Po přečtení tohoto tutoriálu bude čtenář schopen kombinovat důkazy s nulovou znalostí a serverové komponenty k vytvoření ověřitelných her s tajným stavem a offchain komponentou. Tato technika bude demonstrována na vytvoření hry Hledání min."
author: Ori Pomerantz
tags: ["server", "offchain", "centralizované", "nulové vědomí", "zokrates", "mud", "soukromí"]
skill: advanced
breadcrumb: "Tajný stav pomocí ZK"
lang: cs
published: 2025-03-15
---

_Na blockchainu neexistují žádná tajemství_. Vše, co je zveřejněno na blockchainu, si může kdokoli přečíst. To je nezbytné, protože blockchain je založen na tom, že jej může kdokoli ověřit. Hry však často spoléhají na tajný stav. Například hra [Hledání min](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) nedává absolutně žádný smysl, pokud můžete jednoduše jít do prohlížeče bloků a podívat se na mapu.

Nejjednodušším řešením je použít [serverovou komponentu](/developers/tutorials/server-components/) k uchování tajného stavu. Důvodem, proč používáme blockchain, je však zabránit podvádění ze strany vývojáře hry. Musíme zajistit poctivost serverové komponenty. Server může poskytnout hash stavu a použít [důkazy s nulovou znalostí](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) k prokázání, že stav použitý k výpočtu výsledku tahu je ten správný.

Po přečtení tohoto článku budete vědět, jak vytvořit tento druh serveru uchovávajícího tajný stav, klienta pro zobrazení stavu a onchain komponentu pro komunikaci mezi nimi. Hlavní nástroje, které použijeme, budou:

| Nástroj                                       | Účel                                                    | Ověřeno na verzi |
| --------------------------------------------- | ------------------------------------------------------- | ------------------: |
| [Zokrates](https://zokrates.github.io/)       | Důkazy s nulovou znalostí a jejich ověřování            |               1.1.9 |
| [TypeScript](https://www.typescriptlang.org/) | Programovací jazyk pro server i klienta                 |               5.4.2 |
| [Node](https://nodejs.org/en)                 | Spuštění serveru                                        |             20.18.2 |
| [Viem](https://viem.sh/)                      | Komunikace s blockchainem                               |              2.9.20 |
| [MUD](https://mud.dev/)                       | Správa onchain dat                                      |              2.0.12 |
| [React](https://react.dev/)                   | Uživatelské rozhraní klienta                            |              18.2.0 |
| [Vite](https://vitejs.dev/)                   | Poskytování kódu klienta                                |               4.2.1 |

## Příklad hry Hledání min {#minesweeper}

[Hledání min](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) je hra, která obsahuje tajnou mapu s minovým polem. Hráč si vybere, že bude kopat na určitém místě. Pokud je na tomto místě mina, hra končí. V opačném případě hráč získá počet min v osmi polích obklopujících toto místo.

Tato aplikace je napsána pomocí [MUD](https://mud.dev/), frameworku, který nám umožňuje ukládat data onchain pomocí [databáze klíč-hodnota](https://aws.amazon.com/nosql/key-value/) a automaticky tato data synchronizovat s offchain komponentami. Kromě synchronizace MUD usnadňuje poskytování řízení přístupu a umožňuje ostatním uživatelům [rozšířit](https://mud.dev/guides/extending-a-world) naši aplikaci bez oprávnění.

### Spuštění příkladu hry Hledání min {#running-minesweeper-example}

Pro spuštění příkladu hry Hledání min:

1. Ujistěte se, že [máte nainstalované předpoklady](https://mud.dev/quickstart#prerequisites): [Node](https://mud.dev/quickstart#prerequisites), [Foundry](https://book.getfoundry.sh/getting-started/installation), [`git`](https://git-scm.com/downloads), [`pnpm`](https://git-scm.com/downloads) a [`mprocs`](https://github.com/pvolok/mprocs).

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

   Pokud bylo Foundry nainstalováno jako součást `pnpm install`, musíte restartovat příkazový řádek.

4. Zkompilujte kontrakty

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```


5. Spusťte program (včetně blockchainu [anvil](https://book.getfoundry.sh/anvil/)) a počkejte.

   ```sh copy
   mprocs
   ```

   Vezměte na vědomí, že spuštění trvá dlouho. Chcete-li vidět průběh, nejprve pomocí šipky dolů přejděte na kartu _contracts_, kde uvidíte, jak se nasazují MUD kontrakty. Když se zobrazí zpráva _Waiting for file changes…_, kontrakty jsou nasazeny a další průběh se bude odehrávat na kartě _server_. Tam počkejte, dokud se nezobrazí zpráva _Verifier address: 0x...._.

   Pokud je tento krok úspěšný, uvidíte obrazovku `mprocs` s různými procesy vlevo a výstupem konzole pro aktuálně vybraný proces vpravo.

   ![The mprocs screen](./mprocs.png)

   Pokud se vyskytne problém s `mprocs`, můžete spustit čtyři procesy ručně, každý ve vlastním okně příkazového řádku:

   - **Anvil**

     ```sh
     cd packages/contracts
     anvil --base-fee 0 --block-time 2
     ```

   - **Contracts** 

     ```sh
     cd packages/contracts
     pnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **Server**

     ```sh
     cd packages/server
     pnpm start
     ```  

   - **Client**

     ```sh
     cd packages/client
     pnpm run dev
     ```  

6. Nyní můžete přejít na [klienta](http://localhost:3000), kliknout na **New Game** a začít hrát.

### Tabulky {#tables}

Potřebujeme [několik tabulek](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) onchain.

- `Configuration`: Tato tabulka je singleton, nemá žádný klíč a obsahuje jediný záznam. Používá se k uchování informací o konfiguraci hry:
  - `height`: Výška minového pole
  - `width`: Šířka minového pole
  - `numberOfBombs`: Počet bomb v každém minovém poli
- `VerifierAddress`: Tato tabulka je také singleton. Používá se k uchování jedné části konfigurace, adresy kontraktu ověřovatele (`verifier`). Tyto informace jsme mohli vložit do tabulky `Configuration`, ale nastavuje je jiná komponenta, server, takže je jednodušší je umístit do samostatné tabulky.

- `PlayerGame`: Klíčem je adresa hráče. Data jsou:

  - `gameId`: 32bajtová hodnota, která je hashem mapy, na které hráč hraje (identifikátor hry).
  - `win`: boolean určující, zda hráč vyhrál hru.
  - `lose`: boolean určující, zda hráč prohrál hru.
  - `digNumber`: počet úspěšných výkopů ve hře.

- `GamePlayer`: Tato tabulka obsahuje reverzní mapování, z `gameId` na adresu hráče.

- `Map`: Klíčem je n-tice (tuple) tří hodnot:

  - `gameId`: 32bajtová hodnota, která je hashem mapy, na které hráč hraje (identifikátor hry).
  - souřadnice `x`
  - souřadnice `y`

  Hodnotou je jediné číslo. Je to 255, pokud byla detekována bomba. V opačném případě je to počet bomb v okolí tohoto místa plus jedna. Nemůžeme použít pouze počet bomb, protože ve výchozím nastavení je veškeré úložiště v EVM a všechny hodnoty řádků v MUD nulové. Potřebujeme rozlišit mezi „hráč zde ještě nekopal“ a „hráč zde kopal a zjistil, že v okolí je nula bomb“.

Kromě toho probíhá komunikace mezi klientem a serverem prostřednictvím onchain komponenty. To je také implementováno pomocí tabulek.

- `PendingGame`: Nevyřízené požadavky na spuštění nové hry.
- `PendingDig`: Nevyřízené požadavky na kopání na konkrétním místě v konkrétní hře. Jedná se o [offchain tabulku](https://mud.dev/store/tables#types-of-tables), což znamená, že se nezapisuje do úložiště EVM, je čitelná pouze offchain pomocí událostí.

### Toky provádění a dat {#execution-data-flows}

Tyto toky koordinují provádění mezi klientem, onchain komponentou a serverem.

#### Inicializace {#initialization-flow}

Když spustíte `mprocs`, stanou se tyto kroky:

1. [`mprocs`](https://github.com/pvolok/mprocs) spustí čtyři komponenty:

   - [Anvil](https://book.getfoundry.sh/anvil/), který spouští lokální blockchain
   - [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts), který zkompiluje (v případě potřeby) a nasadí kontrakty pro MUD
   - [Client](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client), který spouští [Vite](https://vitejs.dev/) pro poskytování uživatelského rozhraní a klientského kódu webovým prohlížečům.
   - [Server](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server), který provádí akce serveru

2. Balíček `contracts` nasadí MUD kontrakty a poté spustí [skript `PostDeploy.s.sol`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol). Tento skript nastaví konfiguraci. Kód z GitHubu specifikuje [minové pole 10x5 s osmi minami](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23).

3. [Server](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) začíná [nastavením MUD](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6). Mimo jiné to aktivuje synchronizaci dat, takže v paměti serveru existuje kopie příslušných tabulek.

4. Server přihlásí k odběru funkci, která se má provést, [když se změní tabulka `Configuration`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23). [Tato funkce](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) je volána po provedení `PostDeploy.s.sol` a úpravě tabulky.

5. Když má inicializační funkce serveru konfiguraci, [zavolá `zkFunctions`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35) k inicializaci [části serveru s nulovým vědomím](#using-zokrates-from-typescript). To se nemůže stát, dokud nezískáme konfiguraci, protože funkce s nulovým vědomím musí mít šířku a výšku minového pole jako konstanty.

6. Po inicializaci části serveru s nulovým vědomím je dalším krokem [nasazení ověřovacího kontraktu s nulovým vědomím na blockchain](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) a nastavení adresy ověřovatele v MUD.

7. Nakonec se přihlásíme k odběru aktualizací, abychom viděli, když hráč požádá buď [o spuštění nové hry](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71), nebo o [kopání ve stávající hře](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108).

#### Nová hra {#new-game-flow}

Toto se stane, když hráč požádá o novou hru.

1. Pokud pro tohoto hráče neprobíhá žádná hra, nebo probíhá, ale s gameId nula, klient zobrazí [tlačítko nové hry](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175). Když uživatel stiskne toto tlačítko, [React spustí funkci `newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96).

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) je volání `System`. V MUD jsou všechna volání směrována přes kontrakt `World` a ve většině případů voláte `<namespace>__<function name>`. V tomto případě je volání na `app__newGame`, které MUD následně nasměruje na [`newGame` v `GameSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22).

3. Onchain funkce zkontroluje, zda hráč nemá rozehranou hru, a pokud ne, [přidá požadavek do tabulky `PendingGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21).

4. Server detekuje změnu v `PendingGame` a [spustí přihlášenou funkci](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71). Tato funkce zavolá [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114), která následně zavolá [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144).

5. První věc, kterou `createGame` udělá, je [vytvoření náhodné mapy s příslušným počtem min](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135). Poté zavolá [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) k vytvoření mapy s prázdnými okraji, což je nezbytné pro Zokrates. Nakonec `createGame` zavolá [`calculateMapHash`](#calculatemaphash), aby získal hash mapy, který se používá jako ID hry.

6. Funkce `newGame` přidá novou hru do `gamesInProgress`.

7. Poslední věc, kterou server udělá, je volání [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43), které je onchain. Tato funkce je v jiném `System`, [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol), aby bylo umožněno řízení přístupu. Řízení přístupu je definováno v [konfiguračním souboru MUD](https://mud.dev/config), [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72).

   Seznam přístupů umožňuje volat `System` pouze jediné adrese. To omezuje přístup k funkcím serveru na jedinou adresu, takže se nikdo nemůže vydávat za server.

8. Onchain komponenta aktualizuje příslušné tabulky:

   - Vytvoří hru v `PlayerGame`.
   - Nastaví reverzní mapování v `GamePlayer`.
   - Odstraní požadavek z `PendingGame`.

9. Server identifikuje změnu v `PendingGame`, ale nic neudělá, protože [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) je nepravda (false).

10. Na klientovi je [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) nastaveno na záznam `PlayerGame` pro adresu hráče. Když se změní `PlayerGame`, změní se i `gameRecord`.

11. Pokud je v `gameRecord` hodnota a hra nebyla vyhrána ani prohrána, klient [zobrazí mapu](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190).

#### Kopání {#dig-flow}

1. Hráč [klikne na tlačítko buňky mapy](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), což zavolá [funkci `dig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36). Tato funkce zavolá [`dig` onchain](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32).

2. Onchain komponenta [provede řadu kontrol správnosti](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30) a v případě úspěchu přidá požadavek na kopání do [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31).

3. Server [detekuje změnu v `PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73). [Pokud je platná](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), [zavolá kód s nulovým vědomím](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (vysvětleno níže), aby vygeneroval jak výsledek, tak důkaz, že je platný.

4. [Server](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) zavolá [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) onchain.

5. `digResponse` udělá dvě věci. Nejprve zkontroluje [důkaz s nulovou znalostí](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61). Poté, pokud je důkaz v pořádku, zavolá [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86), aby skutečně zpracoval výsledek.

6. `processDigResult` zkontroluje, zda byla hra [prohrána](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) nebo [vyhrána](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86), a [aktualizuje `Map`, onchain mapu](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80).

7. Klient automaticky zachytí aktualizace a [aktualizuje mapu zobrazenou hráči](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190), a případně hráči sdělí, zda vyhrál nebo prohrál.

## Použití Zokrates {#using-zokrates}

V postupech vysvětlených výše jsme přeskočili části s nulovým vědomím a přistupovali k nim jako k černé skříňce. Nyní ji pojďme otevřít a podívat se, jak je tento kód napsán.

### Hashování mapy {#hashing-map}

Můžeme použít [tento kód v JavaScriptu](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) k implementaci [Poseidonu](https://www.poseidon-hash.info), což je hashovací funkce Zokrates, kterou používáme. Ačkoli by to však bylo rychlejší, bylo by to také složitější než k tomu jednoduše použít hashovací funkci Zokrates. Toto je tutoriál, a proto je kód optimalizován pro jednoduchost, nikoli pro výkon. Proto potřebujeme dva různé programy Zokrates, jeden pouze pro výpočet hashe mapy (`hash`) a druhý pro samotné vytvoření důkazu s nulovou znalostí o výsledku kopání na určitém místě na mapě (`dig`).

### Hashovací funkce {#hash-function}

Toto je funkce, která počítá hash mapy. Projdeme si tento kód řádek po řádku.

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

Tyto dva řádky importují dvě funkce ze [standardní knihovny Zokrates](https://zokrates.github.io/toolbox/stdlib.html). [První funkce](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) je [hash Poseidon](https://www.poseidon-hash.info/). Přijímá pole [prvků `field`](https://zokrates.github.io/language/types.html#field) a vrací `field`.

Prvek tělesa (field) v Zokrates je obvykle kratší než 256 bitů, ale ne o moc. Pro zjednodušení kódu omezíme mapu na maximálně 512 bitů a hashujeme pole čtyř prvků tělesa, přičemž v každém z nich použijeme pouze 128 bitů. [Funkce `pack128`](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) pro tento účel mění pole 128 bitů na `field`.

```
def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

Tento řádek začíná definici funkce. `hashMap` získává jeden parametr s názvem `map`, což je dvourozměrné pole typu `bool`(ean). Velikost mapy je `width+2` krát `height+2` z důvodů, které jsou [vysvětleny níže](#why-map-border).

Můžeme použít `${width+2}` a `${height+2}`, protože programy Zokrates jsou v této aplikaci uloženy jako [šablonové řetězce (template strings)](https://www.w3schools.com/js/js_string_templates.asp). Kód mezi `${` a `}` je vyhodnocován JavaScriptem, a tímto způsobem lze program použít pro různé velikosti map. Parametr mapy má kolem dokola okraj o šířce jednoho políčka bez jakýchkoli bomb, což je důvod, proč musíme k šířce a výšce přičíst dva.

Návratovou hodnotou je `field`, který obsahuje hash.

```
bool[512] mut map1d = [false; 512];
```

Mapa je dvourozměrná. Funkce `pack128` však nefunguje s dvourozměrnými poli. Proto nejprve mapu zploštíme do 512bajtového pole pomocí `map1d`. Ve výchozím nastavení jsou proměnné v Zokrates konstanty, ale my potřebujeme tomuto poli přiřazovat hodnoty ve smyčce, takže ho definujeme jako [`mut`](https://zokrates.github.io/language/variables.html#mutability).

Pole musíme inicializovat, protože Zokrates nemá `undefined`. Výraz `[false; 512]` znamená [pole 512 hodnot `false`](https://zokrates.github.io/language/types.html#declaration-and-initialization).

```
u32 mut counter = 0;
```

Potřebujeme také počítadlo, abychom rozlišili mezi bity, které jsme již v `map1d` vyplnili, a těmi, které ještě ne.

```
for u32 x in 0..${width+2} {
```

Takhle se v Zokrates deklaruje [smyčka `for`](https://zokrates.github.io/language/control_flow.html#for-loops). Smyčka `for` v Zokrates musí mít pevné hranice, protože ačkoli se jeví jako smyčka, kompilátor ji ve skutečnosti „rozbalí“ (unrolls). Výraz `${width+2}` je konstanta v době kompilace, protože `width` je nastaveno kódem v TypeScriptu předtím, než zavolá kompilátor.

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

Pomocí `pack128` vytvoříme pole čtyř hodnot `field` z `map1d`. V Zokrates `array[a..b]` znamená výřez pole, který začíná na `a` a končí na `b-1`.

```
return poseidon(hashMe);
}
```

Použijte `poseidon` k převodu tohoto pole na hash.

### Hashovací program {#hash-program}

Server musí volat `hashMap` přímo, aby vytvořil identifikátory hry. Zokrates však může při spuštění programu volat pouze funkci `main`, takže vytvoříme program s funkcí `main`, která volá hashovací funkci.

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### Program pro kopání {#dig-program}

Toto je srdce části aplikace s nulovým vědomím, kde vytváříme důkazy, které se používají k ověření výsledků kopání.

```
${hashFragment}

// Počet min na pozici (x,y)
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### Proč okraj mapy {#why-map-border}

Důkazy s nulovou znalostí používají [aritmetické obvody](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785), které nemají jednoduchý ekvivalent k příkazu `if`. Místo toho používají ekvivalent [podmíněného operátoru](https://en.wikipedia.org/wiki/Ternary_conditional_operator). Pokud `a` může být buď nula, nebo jedna, můžete vypočítat `if a { b } else { c }` jako `ab+(1-a)c`.

Z tohoto důvodu příkaz `if` v Zokrates vždy vyhodnocuje obě větve. Pokud máte například tento kód:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

Skončí chybou, protože potřebuje vypočítat `arr[10]`, i když bude tato hodnota později vynásobena nulou.

To je důvod, proč potřebujeme kolem celé mapy okraj o šířce jednoho políčka. Potřebujeme vypočítat celkový počet min kolem daného místa, a to znamená, že musíme vidět místo o jeden řádek výše a níže, nalevo a napravo od místa, kde kopeme. Což znamená, že tato místa musí existovat v poli mapy, které je Zokrates poskytnuto.

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

Ve výchozím nastavení důkazy Zokrates zahrnují své vstupy. Není k ničemu vědět, že kolem nějakého místa je pět min, pokud nevíte, o jaké místo se přesně jedná (a nemůžete to jen tak spárovat se svým požadavkem, protože pak by dokazovatel mohl použít jiné hodnoty a neříct vám o tom). My však potřebujeme udržet mapu v tajnosti, a přitom ji poskytnout Zokrates. Řešením je použít parametr `private`, tedy takový, který důkaz _neodhalí_.

To otevírá další prostor pro zneužití. Dokazovatel by mohl použít správné souřadnice, ale vytvořit mapu s libovolným počtem min kolem daného místa, a případně i na samotném místě. Abychom tomuto zneužití zabránili, zajistíme, aby důkaz s nulovou znalostí obsahoval hash mapy, což je identifikátor hry.

```
return (hashMap(map),
```

Návratovou hodnotou je zde n-tice (tuple), která obsahuje pole hashe mapy a také výsledek kopání.

```
if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

Používáme 255 jako speciální hodnotu pro případ, že se na samotném místě nachází bomba.

```
map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

Pokud hráč nenarazil na minu, sečtěte počty min v oblasti kolem daného místa a vraťte tento výsledek.

### Použití Zokrates z TypeScriptu {#using-zokrates-from-typescript}

Zokrates má rozhraní příkazového řádku, ale v tomto programu jej používáme v [kódu v TypeScriptu](https://zokrates.github.io/toolbox/zokrates_js.html).

Knihovna, která obsahuje definice Zokrates, se nazývá [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts).

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

Importujte [vazby Zokrates pro JavaScript](https://zokrates.github.io/toolbox/zokrates_js.html). Potřebujeme pouze funkci [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize), protože vrací promise, který se vyhodnotí na všechny definice Zokrates.

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Podobně jako u samotného Zokrates exportujeme také pouze jednu funkci, která je rovněž [asynchronní](https://www.w3schools.com/js/js_async.asp). Když se nakonec vrátí, poskytne několik funkcí, jak uvidíme níže.

```typescript
const zokrates = await zokratesInitialize()
```

Inicializujte Zokrates a získejte z knihovny vše, co potřebujeme.

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

Dále tu máme hashovací funkci a dva programy Zokrates, které jsme viděli výše.

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

Zde tyto programy zkompilujeme.

```typescript
// Vytvořte klíče pro ověření s nulovým vědomím.
// V produkčním systému byste chtěli použít ceremonii nastavení.
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

V produkčním systému bychom možná použili složitější [ceremonii nastavení (setup ceremony)](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony), ale pro ukázku to stačí. Není problém, že uživatelé mohou znát klíč dokazovatele – stále jej nemohou použít k dokazování věcí, pokud nejsou pravdivé. Protože specifikujeme entropii (druhý parametr, `""`), výsledky budou vždy stejné.

**Poznámka:** Kompilace programů Zokrates a vytváření klíčů jsou pomalé procesy. Není nutné je opakovat pokaždé, pouze při změně velikosti mapy. V produkčním systému byste je provedli jednou a poté uložili výstup. Jediný důvod, proč to zde nedělám, je kvůli jednoduchosti.

#### `calculateMapHash` {#calculatemaphash}

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

Funkce [`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) ve skutečnosti spouští program Zokrates. Vrací strukturu se dvěma poli: `output`, což je výstup programu jako řetězec JSON, a `witness`, což jsou informace potřebné k vytvoření důkazu s nulovou znalostí o výsledku. Zde potřebujeme pouze výstup.

Výstupem je řetězec ve formátu `"31337"`, což je desetinné číslo uzavřené v uvozovkách. Ale výstup, který potřebujeme pro `viem`, je hexadecimální číslo ve formátu `0x60A7`. Takže použijeme `.slice(1,-1)` k odstranění uvozovek a poté `BigInt` k převedení zbývajícího řetězce, což je desetinné číslo, na [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt). `.toString(16)` převede tento `BigInt` na hexadecimální řetězec a `"0x"+` přidá značku pro hexadecimální čísla.

```typescript
// Vykopejte a vraťte důkaz s nulovou znalostí výsledku
// (kód na straně serveru)
```

Důkaz s nulovou znalostí zahrnuje veřejné vstupy (`x` a `y`) a výsledky (hash mapy a počet bomb).

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

V Zokrates je problém zkontrolovat, zda je index mimo hranice, takže to děláme zde.

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

Spusťte program pro kopání.

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
        // Map size: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

Ověřovatel v Solidity, chytrý kontrakt, který můžeme nasadit na blockchain a použít k ověření důkazů generovaných pomocí `digCompiled.program`.

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

Nakonec vraťte vše, co by mohl potřebovat jiný kód.

## Bezpečnostní testy {#security-tests}

Bezpečnostní testy jsou důležité, protože chyba ve funkčnosti se nakonec projeví. Pokud je však aplikace nezabezpečená, pravděpodobně to zůstane dlouho skryto, než se to odhalí tím, že někdo bude podvádět a získá prostředky, které patří ostatním.

### Oprávnění {#permissions}

V této hře existuje jedna privilegovaná entita, a to server. Je to jediný uživatel, který má povoleno volat funkce v [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol). Můžeme použít [`cast`](https://book.getfoundry.sh/cast/) k ověření, že volání funkcí s řízeným přístupem jsou povolena pouze pro účet serveru.

[Soukromý klíč serveru je v `setupNetwork.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52).

1. Na počítači, na kterém běží `anvil` (blockchain), nastavte tyto proměnné prostředí.

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. Použijte `cast` k pokusu o nastavení adresy ověřovatele jako neoprávněné adresy.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   Nejenže `cast` nahlásí selhání, ale můžete také otevřít **MUD Dev Tools** ve hře v prohlížeči, kliknout na **Tables** a vybrat **app\_\_VerifierAddress**. Uvidíte, že adresa není nula.

3. Nastavte adresu ověřovatele jako adresu serveru.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   Adresa v **app\_\_VerifiedAddress** by nyní měla být nula.

Všechny funkce MUD ve stejném `System` procházejí stejným řízením přístupu, takže tento test považuji za dostatečný. Pokud ne, můžete zkontrolovat ostatní funkce v [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol).

### Zneužití s nulovým vědomím {#zero-knowledge-abuses}

Matematika pro ověření Zokrates je nad rámec tohoto tutoriálu (a mých schopností). Můžeme však provést různé kontroly kódu s nulovým vědomím, abychom ověřili, že pokud není proveden správně, selže. Všechny tyto testy budou vyžadovat, abychom změnili [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) a restartovali celou aplikaci. Nestačí restartovat proces serveru, protože to uvede aplikaci do nemožného stavu (hráč má rozehranou hru, ale hra již není pro server dostupná).

#### Špatná odpověď {#wrong-answer}

Nejjednodušší možností je poskytnout špatnou odpověď v důkazu s nulovou znalostí. Abychom to udělali, půjdeme do `zkDig` a [upravíme řádek 91](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

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

Co se stane, když poskytneme správné informace, ale budeme mít jen špatná data důkazu? Nyní nahraďte řádek 91 tímto:

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

Stále to selže, ale nyní to selže bez udání důvodu, protože k tomu dojde během volání ověřovatele.

### Jak může uživatel ověřit kód s nulovou důvěrou? {#user-verify-zero-trust}

Chytré kontrakty se ověřují poměrně snadno. Vývojář obvykle publikuje zdrojový kód do prohlížeče bloků a prohlížeč bloků ověří, že se zdrojový kód skutečně zkompiluje do kódu v [transakci nasazení kontraktu](/developers/docs/smart-contracts/deploying/). V případě MUD `System` je to [o něco složitější](https://mud.dev/cli/verify), ale ne o moc.

S nulovým vědomím je to těžší. Ověřovatel obsahuje některé konstanty a provádí na nich výpočty. To vám neřekne, co se dokazuje.

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

Řešením, alespoň dokud se prohlížeče bloků nedostanou k přidání ověřování Zokrates do svých uživatelských rozhraní, je, aby vývojáři aplikací zpřístupnili programy Zokrates a aby si je alespoň někteří uživatelé sami zkompilovali s příslušným ověřovacím klíčem.

Chcete-li tak učinit:

1. [Nainstalujte Zokrates](https://zokrates.github.io/gettingstarted.html).
2. Vytvořte soubor `dig.zok` s programem Zokrates. Níže uvedený kód předpokládá, že jste zachovali původní velikost mapy, 10x5.

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

3. Zkompilujte kód Zokrates a vytvořte ověřovací klíč. Ověřovací klíč musí být vytvořen se stejnou entropií, jaká byla použita na původním serveru, [v tomto případě s prázdným řetězcem](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67).

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. Vytvořte si vlastní ověřovatel v Solidity a ověřte, že je funkčně identický s tím na blockchainu (server přidává komentář, ale to není důležité).

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## Rozhodnutí o návrhu {#design}

V každé dostatečně složité aplikaci existují protichůdné cíle návrhu, které vyžadují kompromisy. Podívejme se na některé z těchto kompromisů a na to, proč je současné řešení vhodnější než jiné možnosti.

### Proč s nulovým vědomím {#why-zero-knowledge}

Pro hledání min ve skutečnosti nepotřebujete řešení s nulovým vědomím. Server může vždy držet mapu a po skončení hry ji celou odhalit. Na konci hry pak může chytrý kontrakt vypočítat hash mapy, ověřit, zda se shoduje, a pokud ne, penalizovat server nebo hru zcela ignorovat.

Toto jednodušší řešení jsem nepoužil, protože funguje pouze pro krátké hry s dobře definovaným koncovým stavem. Když je hra potenciálně nekonečná (jako je tomu v případě [autonomních světů](https://0xparc.org/blog/autonomous-worlds)), potřebujete řešení, které dokazuje stav, _aniž by_ ho odhalilo.

Jako tutoriál tento článek potřeboval krátkou hru, která je snadno pochopitelná, ale tato technika je nejužitečnější pro delší hry.

### Proč Zokrates? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) není jedinou dostupnou knihovnou s nulovým vědomím, ale je podobný běžnému [imperativnímu](https://en.wikipedia.org/wiki/Imperative_programming) programovacímu jazyku a podporuje booleovské proměnné.

Pro vaši aplikaci s jinými požadavky možná upřednostníte použití [Circum](https://docs.circom.io/getting-started/installation/) nebo [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/).

### Kdy kompilovat Zokrates {#when-compile-zokrates}

V tomto programu kompilujeme programy Zokrates [při každém spuštění serveru](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61). To je zjevně plýtvání zdroji, ale toto je tutoriál optimalizovaný pro jednoduchost.

Kdybych psal produkční aplikaci, zkontroloval bych, zda mám soubor se zkompilovanými programy Zokrates pro tuto velikost minového pole, a pokud ano, použil bych ho. Totéž platí pro nasazení kontraktu ověřovatele onchain.

### Vytvoření klíčů ověřovatele a dokazovatele {#key-creation}

[Vytvoření klíčů](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) je další čistý výpočet, který pro danou velikost minového pole není nutné provádět více než jednou. Opět se to dělá pouze jednou kvůli jednoduchosti.

Navíc bychom mohli použít [ceremonii nastavení (setup ceremony)](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony). Výhodou ceremonie nastavení je, že k podvádění u důkazu s nulovou znalostí potřebujete buď entropii, nebo nějaký mezivýsledek od každého účastníka. Pokud je alespoň jeden účastník ceremonie čestný a tyto informace smaže, jsou důkazy s nulovou znalostí v bezpečí před určitými útoky. Neexistuje však _žádný mechanismus_, jak ověřit, že informace byly smazány odevšad. Pokud jsou důkazy s nulovou znalostí kriticky důležité, budete se chtít ceremonie nastavení zúčastnit.

Zde spoléháme na [perpetual powers of tau](https://github.com/privacy-scaling-explorations/perpetualpowersoftau), kterého se zúčastnily desítky lidí. Je to pravděpodobně dostatečně bezpečné a mnohem jednodušší. Během vytváření klíčů také nepřidáváme entropii, což uživatelům usnadňuje [ověření konfigurace s nulovým vědomím](#user-verify-zero-trust).

### Kde ověřovat {#where-verification}

Důkazy s nulovou znalostí můžeme ověřovat buď onchain (což stojí gas), nebo v klientovi (pomocí [`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof)). Vybral jsem první možnost, protože vám to umožňuje [ověřit ověřovatele](#user-verify-zero-trust) jednou a pak důvěřovat, že se nezmění, dokud adresa kontraktu zůstane stejná. Pokud by se ověřování provádělo v klientovi, museli byste ověřovat kód, který obdržíte při každém stažení klienta.

Navíc, ačkoli je tato hra pro jednoho hráče, mnoho blockchainových her je pro více hráčů. Ověřování onchain znamená, že důkaz s nulovou znalostí ověříte pouze jednou. Provádění v klientovi by vyžadovalo, aby každý klient prováděl ověření nezávisle.

### Zploštit mapu v TypeScriptu nebo v Zokrates? {#where-flatten}

Obecně platí, že když lze zpracování provést buď v TypeScriptu, nebo v Zokrates, je lepší to udělat v TypeScriptu, který je mnohem rychlejší a nevyžaduje důkazy s nulovou znalostí. To je například důvod, proč Zokrates neposkytujeme hash a nenutíme ho ověřovat jeho správnost. Hashování se musí provádět uvnitř Zokrates, ale shoda mezi vráceným hashem a hashem onchain může proběhnout mimo něj.

Nicméně stále [zplošťujeme mapu v Zokrates](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20), ačkoli jsme to mohli udělat v TypeScriptu. Důvodem je, že ostatní možnosti jsou podle mého názoru horší.

- Poskytnout kódu Zokrates jednorozměrné pole booleovských hodnot a použít výraz jako `x*(height+2)
+y` k získání dvourozměrné mapy. To by [kód](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) poněkud zkomplikovalo, takže jsem se rozhodl, že nárůst výkonu za to v tutoriálu nestojí.

- Poslat do Zokrates jak jednorozměrné, tak dvourozměrné pole. Toto řešení nám však nic nepřinese. Kód Zokrates by musel ověřit, že poskytnuté jednorozměrné pole je skutečně správnou reprezentací dvourozměrného pole. Takže by nedošlo k žádnému nárůstu výkonu.

- Zploštit dvourozměrné pole v Zokrates. To je nejjednodušší možnost, proto jsem si ji vybral.

### Kde ukládat mapy {#where-store-maps}

V této aplikaci je [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) jednoduše proměnná v paměti. To znamená, že pokud váš server spadne a je nutné ho restartovat, všechny uložené informace se ztratí. Nejenže hráči nemohou pokračovat ve hře, ale nemohou ani začít novou hru, protože onchain komponenta si myslí, že stále mají rozehranou hru.

To je zjevně špatný návrh pro produkční systém, ve kterém byste tyto informace ukládali do databáze. Jediný důvod, proč jsem zde použil proměnnou, je ten, že se jedná o tutoriál a jednoduchost je hlavním hlediskem.

## Závěr: Za jakých podmínek je tato technika vhodná? {#conclusion}

Takže nyní víte, jak napsat hru se serverem, který ukládá tajný stav, jenž nepatří onchain. Ale v jakých případech byste to měli dělat? Existují dva hlavní faktory ke zvážení.

- _Dlouhotrvající hra_: [Jak bylo zmíněno výše](#why-zero-knowledge), v krátké hře můžete stav jednoduše zveřejnit po jejím skončení a nechat vše ověřit až poté. To ale není možné, když hra trvá dlouho nebo neurčitou dobu a stav musí zůstat tajný.

- _Je přijatelná určitá míra centralizace_: Důkazy s nulovou znalostí mohou ověřit integritu, tedy že daná entita nefalšuje výsledky. Co ale nedokážou, je zajistit, že tato entita bude stále dostupná a bude odpovídat na zprávy. V situacích, kdy musí být decentralizovaná i dostupnost, nejsou důkazy s nulovou znalostí dostatečným řešením a budete potřebovat [vícestranné výpočty](https://en.wikipedia.org/wiki/Secure_multi-party_computation).

[Více z mé práce najdete zde](https://cryptodocguy.pro/).

### Poděkování {#acknowledgements}

- Alvaro Alonso si přečetl koncept tohoto článku a objasnil mi některá má nedorozumění ohledně Zokrates.

Za případné zbývající chyby nesu odpovědnost já.