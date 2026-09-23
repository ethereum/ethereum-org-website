---
title: "Účty na Ethereu"
description: "Vysvětlení účtů na Ethereu – jejich datové struktury a vztah ke kryptografii párů klíčů."
lang: cs
---

Účet na [Ethereu](/) je entita se zůstatkem etherů (ETH), která může odesílat zprávy na Ethereu. Účty mohou být ovládány uživatelem nebo nasazeny jako chytré kontrakty.

## Předpoklady {#prerequisites}

Abychom vám pomohli lépe porozumět této stránce, doporučujeme si nejprve přečíst náš [úvod do Etherea](/developers/docs/intro-to-ethereum/).

## Typy účtů {#types-of-account}

Ethereum má dva typy účtů:

- Externě vlastněný účet (EOA) – ovládaný kýmkoli, kdo má soukromé klíče
- Kontraktový účet – chytrý kontrakt nasazený v síti, ovládaný kódem. Přečtěte si více o [chytrých kontraktech](/developers/docs/smart-contracts/)

Oba typy účtů mají schopnost:

- Přijímat, držet a odesílat ETH a tokeny
- Interagovat s nasazenými chytrými kontrakty

### Klíčové rozdíly {#key-differences}

**Externě vlastněné**

- Vytvoření účtu nic nestojí
- Mohou iniciovat transakce
- Transakce mezi externě vlastněnými účty mohou být pouze převody ETH/tokenů
- Skládají se z kryptografického páru klíčů: veřejného a soukromého klíče, které ovládají aktivity účtu

**Kontraktové**

- Vytvoření kontraktu něco stojí, protože využíváte úložiště sítě
- Mohou odesílat zprávy pouze v reakci na přijetí transakce
- Transakce z externího účtu na kontraktový účet mohou spustit kód, který může provést mnoho různých akcí, jako je převod tokenů nebo dokonce vytvoření nového kontraktu
- Kontraktové účty nemají soukromé klíče. Místo toho jsou ovládány logikou kódu chytrého kontraktu

## Bližší pohled na účet {#an-account-examined}

Účty na Ethereu mají čtyři pole:

- `nonce` – Počítadlo, které udává počet transakcí odeslaných z externě vlastněného účtu nebo počet kontraktů vytvořených kontraktovým účtem. Pro každý účet může být provedena pouze jedna transakce s danou nonce, což chrání před útoky typu replay (opakování), kdy jsou podepsané transakce opakovaně vysílány a znovu prováděny.
- `balance` – Počet Wei vlastněných touto adresou. Wei je nominální hodnota ETH a v jednom ETH je 1e+18 Wei.
- `codeHash` – Tento hash odkazuje na _kód_ účtu ve virtuálním stroji Etherea (EVM). Kontraktové účty mají naprogramované fragmenty kódu, které mohou provádět různé operace. Tento kód EVM se spustí, pokud účet obdrží volání zprávy. Na rozdíl od ostatních polí účtu jej nelze změnit. Všechny takové fragmenty kódu jsou obsaženy v databázi stavu pod svými odpovídajícími hashi pro pozdější načtení. Tato hodnota hashe je známá jako codeHash. U externě vlastněných účtů je pole codeHash hashem prázdného řetězce.
- `storageRoot` – Někdy známý jako hash úložiště. 256bitový hash kořenového uzlu [Merkle-Patricia trie](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/), který kóduje obsah úložiště účtu (mapování mezi 256bitovými celočíselnými hodnotami), zakódovaný do trie jako mapování z 256bitového hashe Keccak-256 256bitových celočíselných klíčů na 256bitové celočíselné hodnoty zakódované pomocí rekurzivní předpony délky (RLP). Tato trie kóduje hash obsahu úložiště tohoto účtu a ve výchozím nastavení je prázdná.

![A diagram showing the make up of an account](./accounts.png)
_Diagram upraven podle [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Externě vlastněné účty a páry klíčů {#externally-owned-accounts-and-key-pairs}

Účet se skládá z páru kryptografických klíčů: veřejného a soukromého. Pomáhají prokázat, že transakce byla skutečně podepsána odesílatelem, a zabraňují padělání. Váš soukromý klíč je to, co používáte k podepisování transakcí, takže vám poskytuje kontrolu nad prostředky spojenými s vaším účtem. Ve skutečnosti nikdy nedržíte kryptoměnu, držíte soukromé klíče – prostředky jsou vždy v účetní knize Etherea.

To brání škodlivým aktérům ve vysílání falešných transakcí, protože vždy můžete ověřit odesílatele transakce.

Pokud chce Alice poslat ether ze svého vlastního účtu na Bobův účet, musí Alice vytvořit požadavek na transakci a odeslat jej do sítě k ověření. Využití kryptografie veřejného klíče v Ethereu zajišťuje, že Alice může prokázat, že původně iniciovala požadavek na transakci. Bez kryptografických mechanismů by škodlivý protivník Eve mohl jednoduše veřejně vysílat požadavek, který by vypadal nějak jako „pošli 5 ETH z účtu Alice na účet Eve“, a nikdo by nebyl schopen ověřit, že nepochází od Alice.

## Vytvoření účtu {#account-creation}

Když chcete vytvořit účet, většina knihoven vám vygeneruje náhodný soukromý klíč.

Soukromý klíč se skládá z 64 hexadecimálních znaků a může být zašifrován heslem.

Příklad:

`fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036415f`

Veřejný klíč je generován ze soukromého klíče pomocí [algoritmu digitálního podpisu na bázi eliptických křivek (Elliptic Curve Digital Signature Algorithm)](https://wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). Veřejnou adresu pro svůj účet získáte tak, že vezmete posledních 20 bajtů hashe Keccak-256 veřejného klíče a na začátek přidáte `0x`.

To znamená, že externě vlastněný účet (EOA) má 42znakovou adresu (20bajtový segment, což je 40 hexadecimálních znaků plus předpona `0x`).

Příklad:

`0x5e97870f263700f46aa00d967821199b9bc5a120`

Následující příklad ukazuje, jak použít nástroj pro podepisování s názvem [Clef](https://geth.ethereum.org/docs/tools/clef/introduction) k vygenerování nového účtu. Clef je nástroj pro správu účtů a podepisování, který je dodáván s klientem Etherea, [Geth](https://geth.ethereum.org). Příkaz `clef newaccount` vytvoří nový pár klíčů a uloží je do zašifrovaného úložiště klíčů.

```
> clef newaccount --keystore <cesta>

Zadejte prosím heslo pro nově vytvářený účet:
> <heslo>

------------
INFO [10-28|16:19:09.156] Váš nový klíč byl vygenerován       adresa=0x5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Prosím zálohujte si soubor s klíčem      cesta=/home/user/go-ethereum/data/keystore/UTC--2022-10-28T15-19-08.000825927Z--5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Prosím zapamatujte si své heslo!
Vygenerován účet 0x5e97870f263700f46aa00d967821199b9bc5a120
```

[Dokumentace Geth](https://geth.ethereum.org/docs)

Ze svého soukromého klíče je možné odvodit nové veřejné klíče, ale z veřejných klíčů nelze odvodit soukromý klíč. Je životně důležité udržovat své soukromé klíče v bezpečí a, jak název napovídá, **SOUKROMÉ**.

Soukromý klíč potřebujete k podepisování zpráv a transakcí, jejichž výstupem je podpis. Ostatní pak mohou vzít podpis a odvodit váš veřejný klíč, čímž se prokáže autor zprávy. Ve své aplikaci můžete k odesílání transakcí do sítě použít knihovnu v JavaScriptu.

## Kontraktové účty {#contract-accounts}

Kontraktové účty mají také 42znakovou hexadecimální adresu:

Příklad:

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

Adresa kontraktu je obvykle přidělena při nasazení kontraktu na blockchain Etherea. Adresa vychází z adresy tvůrce a počtu transakcí odeslaných z této adresy („nonce“). Takto operace `CREATE` odvozuje adresu.

Kontrakty lze také nasadit pomocí [`CREATE2`](https://eips.ethereum.org/EIPS/eip-1014), což odvozuje adresu z adresy tvůrce, hodnoty, kterou tvůrce vybere („sůl“), a hashe kódu pro vytvoření kontraktu. Není zde zapojena žádná nonce, takže adresu lze vypočítat ještě předtím, než kontrakt existuje, a zůstává stejná bez ohledu na to, kolik dalších transakcí tvůrce mezitím odešle. To umožňuje odkazovat na kontrakt, který ještě nebyl nasazen.

## Klíče validátoru {#validators-keys}

V Ethereu existuje také další typ klíče, který byl zaveden, když Ethereum přešlo z konsensu založeného na důkazu prací (PoW) na důkaz podílem (PoS). Jedná se o klíče „BLS“ a používají se k identifikaci validátorů. Tyto klíče lze efektivně agregovat, aby se snížila šířka pásma potřebná k tomu, aby síť dospěla ke konsensu. Bez této agregace klíčů by byl minimální stake pro validátora mnohem vyšší.

[Více o klíčích validátoru](/developers/docs/consensus-mechanisms/pos/keys/).

## Poznámka k peněženkám {#a-note-on-wallets}

Účet není peněženka. Peněženka je rozhraní nebo aplikace, která vám umožňuje interagovat s vaším účtem na Ethereu, ať už se jedná o externě vlastněný účet nebo kontraktový účet.

## Vizuální ukázka {#a-visual-demo}

Podívejte se, jak vás Austin provede hashovacími funkcemi a páry klíčů.

<VideoWatch slug="hash-function-eth-build" />

<VideoWatch slug="key-pair-eth-build" />

## Další čtení {#further-reading}

- [Porozumění účtům na Ethereu](https://info.etherscan.com/understanding-ethereum-accounts/) - Etherscan

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_

## Související témata {#related-topics}

- [Chytré kontrakty](/developers/docs/smart-contracts/)
- [Transakce](/developers/docs/transactions/)

<Divider />

<QuizWidget quizKey="accounts" />