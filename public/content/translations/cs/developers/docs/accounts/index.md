---
title: Účty na Ethereu
description: Vysvětlení účtů na Ethereu – jejich datových struktur a jejich vztahu ke kryptografii páru klíčů.
lang: cs
---

Účet na Ethereu je entita se zůstatkem etherů (ETH), která může posílat transakce na Ethereu. Účty mohou být ovládány uživatelem nebo spuštěny jako chytré kontrakty.

## Předpoklady {#prerequisites}

K lepšímu pochopení této stránky doporučujeme si nejprve přečíst náš [úvod do Etherea](/developers/docs/intro-to-ethereum/).

## Typy Účtů {#types-of-account}

Ethereum má dva typy účtů:

- Externě vlastněné účty (EOA) – ovládané kýmkoliv s privátním klíčem.
- Kontraktové účty – chytrý kontrakt nasazený v síti, řízený kódem. Další informace o [chytrých kontraktech](/developers/docs/smart-contracts/).

Oba typy účtů mohou:

- Přijímat, uchovávat a posílat ETH a tokeny.
- Interagovat se spuštěnými chytrými kontrakty.

### Hlavní rozdíly {#key-differences}

**Externě vlastněné účty**

- Vytvoření účtu nic nestojí.
- Mohou iniciovat transakce.
- Transakce mezi účty vlastněnými externími subjekty mohou být pouze převody ETH/tokenů.
- Skládají se z kryptografického páru klíčů: veřejného a privátního klíče, které kontrolují činnosti účtu.

**Kontraktové účty**

- Vytvoření kontraktu je spojeno s náklady, protože využíváte úložiště sítě.
- Mohou odesílat transakce pouze jako reakci na přijetí transakce.
- Transakce z externího účtu na kontraktový účet mohou spustit kód, který může vykonávat různé akce, jako je převod tokenů nebo dokonce vytvoření nového kontraktu.
- Kontraktové účty nemají privátní klíče. Místo toho jsou řízeny logikou kódu chytrého kontraktu.

## Složení účtu {#an-account-examined}

Účet na Ethereu má čtyři pole:

- `nonce` – Počítadlo, které udává počet transakcí odeslaných z účtu vlastněného externím subjektem nebo počet kontraktů vytvořených kontraktovým účtem. Jen jedna transakce s daným nonce (jedinečným číslem) může být z účtu úspěšně odeslána, což slouží jako obrana proti útokům opakovaným posíláním, kdy jsou podepsané transakce opakovaně vysílány a znovu vykonávány.
- `balance` – Počet wei vlastněných touto adresou. Wei je denominací ETH a jeden ETH obsahuje 1e+18 wei.
- `codeHash` – Tento hash odkazuje na _kód_ účtu na virtuálním stroji Etherea (EVM). Kontraktové účty mají naprogramované kódové fragmenty, které mohou provádět různé operace. Tento EVM kód se spustí v případě, že účet obdrží zprávu (message call). Na rozdíl od ostatních polí účtu nelze tento kód změnit. Všechny takové kódové fragmenty jsou uloženy ve stavové databázi pod odpovídajícími hashi umožňujícími jejich pozdější vyhledání. Tato hodnota hashe je známá jako codeHash. U účtů vlastněných externími subjekty je pole codeHash hash prázdného řetězce.
- `storageRoot` – Někdy označován jako storage hash. 256bitový hash kořenového uzlu Merkle Patricia trie, který kóduje obsah úložiště účtu (mapování mezi 256bitovými celočíselnými hodnotami), zakódovaný do trie jako mapování Keccak 256bitového hashe 256bitových celočíselných klíčů na RLP-kódované 256bitové celočíselné hodnoty. Tento trie kóduje hash obsahu úložiště tohoto účtu a je ve výchozím nastavení prázdný.

![Schéma znázorňující vytvoření účtu](./accounts.png) _Schéma převzato z [ilustrace Ethereum EVM](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Externě vlastněné účty a páry klíčů {#externally-owned-accounts-and-key-pairs}

Účet se skládá z kryptografického páru klíčů: veřejného a privátního. Ty pomáhají prokázat, že transakce byla skutečně podepsána odesílatelem, a předchází jejímu padělání. Privátní klíč se používá k podepisování transakcí, takže vám dává právo spravovat prostředky spojené s vaším účtem. Kryptoměnu ve skutečnosti nikdy nedržíte, držíte privátní klíče – prostředky jsou vždy zapsány v účetní knize Etherea.

To zlomyslným aktérům zabraňuje posílat falešné transakce, protože můžete odesílatele transakce vždy ověřit.

Pokud chce Alice poslat ether ze svého účtu na účet Boba, musí vytvořit žádost o transakci a odeslat ji do sítě k ověření. Použití kryptografie veřejného klíče v systému Etherea zajišťuje, že Alice může prokázat, že původně iniciovala požadavek na transakci ona. Bez kryptografických mechanismů by mohla zlomyslná protistrana Eva jednoduše veřejně vyslat požadavek, který by vypadal nějak takto: „pošli 5 ETH z účtu Alice na účet Evy“, a nikdo by nebyl schopen ověřit, že nepochází od Alice.

## Vytvoření účtu {#account-creation}

Když si chcete vytvořit účet, většina knihoven vám vygeneruje náhodný privátní klíč.

Privátní klíč se skládá ze 64 hexadecimálních znaků a může být zašifrován heslem.

Např.:

`fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036415f`

Veřejný klíč je vygenerován z privátního klíče pomocí algoritmu [Elliptic Curve Digital Signature Algorithm (ECDSA)](https://wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). Veřejnou adresu vašeho účtu získáte tak, že vezmete posledních 20 bajtů z Keccak-256 hashe veřejného klíče a přidáte předponu `0x`.

To znamená, že účet vlastněný externím subjektem (Externally Owned Account, EOA) má 42znakovou adresu (20bajtový segment, což je 40 hexadecimálních znaků plus předpona `0x`).

Příklad:

`0x5e97870f263700f46aa00d967821199b9bc5a120`

Následující příklad ukazuje, jak můžete používat nástroj pro podepisování zvaný [Clef](https://geth.ethereum.org/docs/tools/clef/introduction) k vygenerování nového účtu. Clef je nástroj pro správu účtů a podepisování, který je součástí klienta na Ethereu, [Geth](https://geth.ethereum.org). Příkaz `clef newaccount` vytvoří nový pár klíčů a uloží je do zašifrovaného úložiště klíčů.

```
> clef newaccount --keystore <path>

Please enter a password for the new account to be created:
> <password>

------------
INFO [10-28|16:19:09.156] Your new key was generated       address=0x5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Please backup your key file      path=/home/user/go-ethereum/data/keystore/UTC--2022-10-28T15-19-08.000825927Z--5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Please remember your password!
Generated account 0x5e97870f263700f46aa00d967821199b9bc5a120
```

[Dokumentace Geth](https://geth.ethereum.org/docs)

Z privátního klíče lze odvodit nové veřejné klíče, ale privátní klíč z veřejných klíčů odvodit nelze. To znamená, že je nezbytné uchovávat privátní klíč v bezpečí a, jak název napovídá, v **SOUKROMÍ**.

Privátní klíč potřebujete k podepisování zpráv a transakcí, jejichž výstupem je podpis. Ostatní pak mohou na základě tohoto podpisu odvodit váš veřejný klíč a ověřit si tak autora zprávy. V aplikaci můžete k odesílání transakcí do sítě použít JavaScriptovou knihovnu.

## Kontraktové účty {#contract-accounts}

Kontraktové účty mají také 42znakovou hexadecimální adresu:

Např.:

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

Adresa kontraktu je obvykle přidělena při prvním spuštění kontraktu na blockchainu Etherea. Adresa vychází z adresy tvůrce kontraktu a počtu transakcí odeslaných z této adresy („jedinečné číslo“ – nonce).

## Klíče validátorů {#validators-keys}

V Ethereu existuje také další typ klíče, který byl zaveden při přechodu Etherea z konsenzu založeného na důkazu prací na důkaz podílem. Jedná se o tzv. „BLS“ klíče, které slouží k identifikaci validátorů. Tyto klíče mohou být efektivně sdružovány, což snižuje sířku pásma potřebnou k dosažení konsenzu v síti. Bez této agregace by byla minimální uzamčená částka pro validátora mnohem vyšší.

[Další informace o klíčích validátorů](/developers/docs/consensus-mechanisms/pos/keys/).

## Poznámka k peněženkám {#a-note-on-wallets}

Účet není peněženka. Peněženka je rozhraní nebo aplikace, která vám umožňuje interagovat s vaším ethereovským účtem, ať už se jedná o účet vlastněný externím subjektem nebo kontraktový účet.

## Vizuální ukázka {#a-visual-demo}

Podívejte se na video, kde Austin ukazuje, jak fungují hashovací funkce a páry klíčů.

<YouTube id="QJ010l-pBpE" />

<YouTube id="9LtBDy67Tho" />

## Další informace {#further-reading}

- [Understanding Ethereum Accounts](https://info.etherscan.com/understanding-ethereum-accounts/) – etherscan

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_

## Související témata {#related-topics}

- [Chytré kontrakty](/developers/docs/smart-contracts/)
- [Transakce](/developers/docs/transactions/)
