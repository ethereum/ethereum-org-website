---
title: "Napište plazmu specifickou pro aplikaci, která zachovává soukromí"
description: "V tomto návodu vytvoříme polotajnou banku pro vklady. Banka je centralizovanou součástí; zná zůstatek každého uživatele. Tato informace se však neukládá na blockchainu. Místo toho banka zveřejňuje hash stavu. Pokaždé, když dojde k transakci, banka zveřejní nový hash spolu s důkazem s nulovou znalostí, že má podepsanou transakci, která mění stav hashe na nový. Po přečtení tohoto návodu nejenže pochopíte, jak používat důkazy s nulovou znalostí, ale také proč je používat a jak to dělat bezpečně."
author: Ori Pomerantz
tags: [ "nulová znalost", "server", "offchain", "soukromí" ]
skill: advanced
lang: cs
published: 2025-10-15
---

## Úvod {#introduction}

Na rozdíl od [rollupů](/developers/docs/scaling/zk-rollups/) používají [plazmy](/developers/docs/scaling/plasma) hlavní síť Ethereum k zajištění integrity, nikoli však dostupnosti. V tomto článku napíšeme aplikaci, která se chová jako plazma, přičemž Ethereum zaručuje integritu (žádné neoprávněné změny), ale nikoli dostupnost (centralizovaná součást může selhat a vyřadit celý systém).

Aplikace, kterou zde píšeme, je banka zachovávající soukromí. Různé adresy mají účty se zůstatky a mohou posílat peníze (ETH) na jiné účty. Banka zveřejňuje hashe stavu (účty a jejich zůstatky) a transakce, ale skutečné zůstatky drží mimo blockchain, kde mohou zůstat soukromé.

## Návrh {#design}

Nejedná se o systém připravený pro produkční nasazení, ale o výukový nástroj. Jako takový je napsán s několika zjednodušujícími předpoklady.

- Pevně daný fond účtů. Existuje určitý počet účtů a každý účet patří na předem určenou adresu. Díky tomu je systém mnohem jednodušší, protože v důkazech s nulovou znalostí je obtížné pracovat s datovými strukturami s proměnlivou velikostí. Pro systém připravený pro produkční nasazení můžeme použít [Merkle kořen](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) jako hash stavu a poskytnout Merkle důkazy pro požadované zůstatky.

- Ukládání do paměti. V produkčním systému je třeba zapisovat všechny zůstatky na účtech na disk, aby se zachovaly pro případ restartu. Zde je v pořádku, pokud se informace jednoduše ztratí.

- Pouze převody. Produkční systém by vyžadoval způsob, jak vkládat prostředky do banky a jak je vybírat. Cílem je zde však pouze ilustrovat koncept, takže tato banka je omezena na převody.

### Důkazy s nulovou znalostí {#zero-knowledge-proofs}

Na základní úrovni důkaz s nulovou znalostí ukazuje, že dokazující zná nějaká data, _Data<sub>soukromá</sub>_, taková, že existuje vztah _Vztah_ mezi nějakými veřejnými daty, _Data<sub>veřejná</sub>_, a _Data<sub>soukromá</sub>_. Ověřovatel zná _Vztah_ a _Data<sub>veřejná</sub>_.

Abychom zachovali soukromí, je třeba, aby stavy a transakce byly soukromé. Abychom však zajistili integritu, potřebujeme, aby [kryptografický hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function) stavů byl veřejný. Abychom lidem, kteří odesílají transakce, dokázali, že se tyto transakce skutečně uskutečnily, musíme také zveřejňovat hashe transakcí.

Ve většině případů je _Data<sub>soukromá</sub>_ vstupem do programu důkazu s nulovou znalostí a _Data<sub>veřejná</sub>_ je výstupem.

Tato pole v _Data<sub>soukromá</sub>_:

- _Stav<sub>n</sub>_, starý stav
- _Stav<sub>n+1</sub>_, nový stav
- _Transakce_, transakce, která mění starý stav na nový. Tato transakce musí obsahovat tato pole:
  - _Cílová adresa_, která přijímá převod
  - _Částka_, která se převádí
  - _Nonce_, aby se zajistilo, že každá transakce může být zpracována pouze jednou.
    Zdrojová adresa nemusí být v transakci, protože ji lze obnovit z podpisu.
- _Podpis_, podpis, který je oprávněn provést transakci. V našem případě je jedinou adresou oprávněnou k provedení transakce zdrojová adresa. Protože náš systém s nulovou znalostí funguje tak, jak funguje, potřebujeme kromě podpisu Ethereum také veřejný klíč účtu.

Toto jsou pole v _Data<sub>veřejná</sub>_:

- _Hash(Stav<sub>n</sub>)_ hash starého stavu
- _Hash(Stav<sub>n+1</sub>)_ hash nového stavu
- _Hash(Transakce)_ hash transakce, která mění stav ze _Stavu<sub>n</sub>_ na _Stav<sub>n+1</sub>_.

Vztah kontroluje několik podmínek:

- Veřejné hashe jsou skutečně správnými hashi pro soukromá pole.
- Transakce, když se aplikuje na starý stav, má za následek nový stav.
- Podpis pochází ze zdrojové adresy transakce.

Vzhledem k vlastnostem kryptografických hashovacích funkcí stačí prokázat tyto podmínky k zajištění integrity.

### Datové struktury {#data-structures}

Primární datovou strukturou je stav, který uchovává server. Pro každý účet server sleduje zůstatek na účtu a [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce), které se používá k zabránění [opakovacím útokům](https://en.wikipedia.org/wiki/Replay_attack).

### Komponenty {#components}

Tento systém vyžaduje dvě součásti:

- _Server_, který přijímá transakce, zpracovává je a zveřejňuje hashe na řetězci spolu s důkazy s nulovou znalostí.
- _Chytrý kontrakt_, který ukládá hashe a ověřuje důkazy s nulovou znalostí, aby se zajistilo, že přechody stavů jsou legitimní.

### Datový a řídicí tok {#flows}

Toto jsou způsoby, jakými jednotlivé součásti komunikují při převodu z jednoho účtu na druhý.

1. Webový prohlížeč odešle podepsanou transakci s žádostí o převod z účtu podepisujícího na jiný účet.

2. Server ověří, že transakce je platná:

   - Podepisující má v bance účet s dostatečným zůstatkem.
   - Příjemce má v bance účet.

3. Server vypočítá nový stav odečtením převedené částky od zůstatku podepisujícího a jejím přičtením k zůstatku příjemce.

4. Server vypočítá důkaz s nulovou znalostí, že změna stavu je platná.

5. Server odešle na Ethereum transakci, která obsahuje:

   - Nový hash stavu
   - Hash transakce (aby odesílatel transakce věděl, že byla zpracována)
   - Důkaz s nulovou znalostí, který dokazuje, že přechod do nového stavu je platný

6. Chytrý kontrakt ověří důkaz s nulovou znalostí.

7. Pokud se důkaz s nulovou znalostí ověří, chytrý kontrakt provede tyto akce:
   - Aktualizace současného hashe stavu na nový hash stavu
   - Vydá záznam do protokolu s novým hashem stavu a hashem transakce

### Nástroje {#tools}

Pro kód na straně klienta použijeme [Vite](https://vite.dev/), [React](https://react.dev/), [Viem](https://viem.sh/) a [Wagmi](https://wagmi.sh/). Jedná se o standardní nástroje v oboru; pokud je neznáte, můžete použít [tento tutoriál](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

Většina serveru je napsána v JavaScriptu pomocí [Node](https://nodejs.org/en). Část s nulovou znalostí je napsána v jazyce [Noir](https://noir-lang.org/). Potřebujeme verzi `1.0.0-beta.10`, takže po [instalaci Noir podle pokynů](https://noir-lang.org/docs/getting_started/quick_start) spusťte:

```
noirup -v 1.0.0-beta.10
```

Blockchain, který používáme, je `anvil`, lokální testovací blockchain, který je součástí [Foundry](https://getfoundry.sh/introduction/installation).

## Implementace {#implementation}

Protože se jedná o složitý systém, budeme ho implementovat postupně.

### Fáze 1 – Ruční nulová znalost {#stage-1}

V první fázi podepíšeme transakci v prohlížeči a poté ručně poskytneme informace do důkazu s nulovou znalostí. Kód nulové znalosti očekává, že tyto informace získá v souboru `server/noir/Prover.toml` (zdokumentováno [zde](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1)).

Chcete-li to vidět v akci:

1. Ujistěte se, že máte nainstalovaný [Node](https://nodejs.org/en/download) a [Noir](https://noir-lang.org/install). Nejlépe je nainstalujte na systém UNIX, jako je macOS, Linux nebo [WSL](https://learn.microsoft.com/en-us/windows/wsl/install).

2. Stáhněte si kód 1. fáze a spusťte webový server, který bude obsluhovat kód klienta.

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   Důvod, proč zde potřebujete webový server, je ten, že aby se předešlo určitým typům podvodů, mnoho peněženek (například MetaMask) nepřijímá soubory obsluhované přímo z disku.

3. Otevřete prohlížeč s peněženkou.

4. V peněžence zadejte novou heslovou frázi. Upozorňujeme, že tímto smažete stávající heslovou frázi, takže _se ujistěte, že máte zálohu_.

   Heslová fráze je `test test test test test test test test test test test junk`, výchozí testovací heslová fráze pro anvil.

5. Přejděte na [kód na straně klienta](http://localhost:5173/).

6. Připojte se k peněžence a vyberte cílový účet a částku.

7. Klikněte na **Podepsat** a podepište transakci.

8. Pod nadpisem **Prover.toml** najdete text. Nahraďte soubor `server/noir/Prover.toml` tímto textem.

9. Spusťte důkaz s nulovou znalostí.

   ```sh
   cd ../server/noir
   nargo execute
   ```

   Výstup by měl být podobný tomuto

   ```
   ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
   ```

10. Porovnejte poslední dvě hodnoty s hashem, který vidíte ve webovém prohlížeči, abyste zjistili, zda je zpráva správně zahashována.

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[Tento soubor](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) ukazuje formát informací, který očekává Noir.

```toml
zpráva="odeslat 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

Zpráva je v textovém formátu, což usnadňuje její pochopení uživatelem (což je nutné při podepisování) a její zpracování kódem Noir. Částka je uvedena ve finney, aby bylo možné na jedné straně provádět zlomkové převody a na druhé straně byla snadno čitelná. Poslední číslo je [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce).

Řetězec je dlouhý 100 znaků. Důkazy s nulovou znalostí si dobře neporadí s daty s proměnlivou velikostí, proto je často nutné data doplňovat.

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

Tyto tři parametry jsou bajtová pole s pevnou velikostí.

```toml
[[účty]]
adresa="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
zůstatek=100_000
nonce=0

[[účty]]
adresa="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
zůstatek=100_000
nonce=0
```

Tímto způsobem se specifikuje pole struktur. Pro každou položku zadáme adresu, zůstatek (v milliETH, známé také jako [finney](https://cryptovalleyjournal.com/glossary/finney/)) a další hodnotu nonce.

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[Tento soubor](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) implementuje zpracování na straně klienta a generuje soubor `server/noir/Prover.toml` (ten, který obsahuje parametry nulové znalosti).

Zde je vysvětlení zajímavějších částí.

```tsx
export default attrs =>  {
```

Tato funkce vytváří komponentu `Transfer` Reactu, kterou mohou importovat další soubory.

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

Toto jsou adresy účtů, adresy vytvořené pomocí `test ...` heslové fráze `test junk`. Pokud chcete použít vlastní adresy, stačí upravit tuto definici.

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

Tyto [Wagmi hooky](https://wagmi.sh/react/api/hooks) nám umožňují přístup ke knihovně [viem](https://viem.sh/) a k peněžence.

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

Toto je zpráva, doplněná mezerami. Pokaždé, když se změní jedna z proměnných [`useState`](https://react.dev/reference/react/useState), komponenta se překreslí a `zpráva` se aktualizuje.

```tsx
  const sign = async () => {
```

Tato funkce je volána, když uživatel klikne na tlačítko **Podepsat**. Zpráva se automaticky aktualizuje, ale podpis vyžaduje schválení uživatelem v peněžence a my o něj nechceme žádat, pokud to není nutné.

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

Požádejte peněženku o [podepsání zprávy](https://viem.sh/docs/accounts/local/signMessage).

```tsx
    const hash = hashMessage(message)
```

Získejte hash zprávy. Je užitečné poskytnout ho uživateli pro ladění (kódu Noir).

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[Získejte veřejný klíč](https://viem.sh/docs/utilities/recoverPublicKey). To je nutné pro funkci [Noir `ecrecover`](https://github.com/colinnielsen/ecrecover-noir).

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

Nastavte stavové proměnné. Tímto se komponenta překreslí (po ukončení funkce `sign`) a uživateli se zobrazí aktualizované hodnoty.

```tsx
    let proverToml = `
```

Text pro `Prover.toml`.

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem nám poskytuje veřejný klíč jako 65bajtový hexadecimální řetězec. První bajt je `0x04`, označení verze. Následuje 32 bajtů pro `x` veřejného klíče a poté 32 bajtů pro `y` veřejného klíče.

Noir však očekává, že tyto informace získá jako dvě bajtová pole, jedno pro `x` a jedno pro `y`. Je snazší ho analyzovat zde na straně klienta než v rámci důkazu s nulovou znalostí.

Všimněte si, že se obecně jedná o dobrou praxi v oblasti nulové znalosti. Kód uvnitř důkazu s nulovou znalostí je nákladný, takže jakékoli zpracování, které lze provést mimo důkaz s nulovou znalostí, _by se mělo_ provádět mimo důkaz s nulovou znalostí.

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

Podpis je také poskytován jako 65bajtový hexadecimální řetězec. Poslední bajt je však nutný pouze k obnovení veřejného klíče. Protože veřejný klíč bude již poskytnut kódu Noir, nepotřebujeme ho k ověření podpisu a kód Noir ho nevyžaduje.

```tsx
${accounts.map(accountInProverToml).reduce((a,b) => a+b, "")}
`
```

Poskytněte účty.

```tsx
    setProverToml(proverToml)
  }

  return (
    <>
        <h2>Převod</h2>
```

Toto je formát HTML (přesněji [JSX](https://react.dev/learn/writing-markup-with-jsx)) komponenty.

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[Tento soubor](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) je skutečný kód nulové znalosti.

```
use std::hash::pedersen_hash;
```

[Pedersen hash](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) je poskytován se [standardní knihovnou Noir](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash). Důkazy s nulovou znalostí běžně používají tuto hashovací funkci. V [aritmetických obvodech](https://rareskills.io/post/arithmetic-circuit) se vypočítává mnohem snadněji než standardní hashovací funkce.

```
use keccak256::keccak256;
use dep::ecrecover;
```

Tyto dvě funkce jsou externí knihovny definované v souboru [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml). Jsou přesně tím, po čem jsou pojmenovány: funkcí, která vypočítá [hash keccak256](https://emn178.github.io/online-tools/keccak_256.html), a funkcí, která ověřuje podpisy Ethereum a obnovuje adresu Ethereum podepisujícího.

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir je inspirován jazykem [Rust](https://www.rust-lang.org/). Proměnné jsou ve výchozím nastavení konstanty. Takto definujeme globální konfigurační konstanty. Konkrétně `ACCOUNT_NUMBER` je počet účtů, které ukládáme.

Datové typy s názvem `u<číslo>` mají daný počet bitů a jsou bez znaménka. Jediné podporované typy jsou `u8`, `u16`, `u32`, `u64` a `u128`.

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

Tato proměnná se používá pro Pedersen hash účtů, jak je vysvětleno níže.

```
global MESSAGE_LENGTH : u32 = 100;
```

Jak bylo vysvětleno výše, délka zprávy je pevná. Je zde specifikována.

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[Podpisy EIP-191](https://eips.ethereum.org/EIPS/eip-191) vyžadují vyrovnávací paměť s 26bajtovou předponou, za níž následuje délka zprávy v ASCII a nakonec samotná zpráva.

```
struct Account {
    zůstatek: u128,
    adresa: Field,
    nonce: u32,
}
```

Informace, které ukládáme o účtu. [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) je číslo, typicky až 253 bitů, které lze použít přímo v [aritmetickém obvodu](https://rareskills.io/post/arithmetic-circuit), který implementuje důkaz s nulovou znalostí. Zde používáme `Field` k uložení 160bitové adresy Ethereum.

```
struct TransferTxn {
    z: Field,
    do: Field,
    částka: u128,
    nonce: u32
}
```

Informace, které ukládáme pro převodní transakci.

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

Definice funkce. Parametrem jsou informace o `účtu`. Výsledkem je pole proměnných `Field`, jejichž délka je `FLAT_ACCOUNT_FIELDS`.

```
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

První hodnota v poli je adresa účtu. Druhá zahrnuje jak zůstatek, tak nonce. Volání `.into()` změní číslo na datový typ, kterým má být. `account.nonce` je hodnota `u32`, ale aby ji bylo možné přičíst k hodnotě `account.balance << 32`, která je `u128`, musí být `u128`. To je první `.into()`. Druhý převádí výsledek `u128` na `Field`, aby se vešel do pole.

```
    flat
}
```

V jazyce Noir mohou funkce vracet hodnotu pouze na konci (neexistuje předčasné vrácení). Chcete-li zadat návratovou hodnotu, vyhodnotíte ji těsně před uzavírací závorkou funkce.

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

Tato funkce převede pole účtů na pole `Field`, které lze použít jako vstup do Petersen Hash.

```
    let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

Takto se určuje měnitelná proměnná, tj. _ne_ konstanta. Proměnné v Noir musí mít vždy hodnotu, proto tuto proměnnou inicializujeme na samé nuly.

```
    for i in 0..ACCOUNT_NUMBER {
```

Toto je smyčka `for`. Všimněte si, že hranice jsou konstanty. Smyčky Noir musí mít své hranice známé v době kompilace. Důvodem je, že aritmetické obvody nepodporují řízení toku. Při zpracování smyčky `for` kompilátor jednoduše vloží kód dovnitř několikrát, jednou pro každou iteraci.

```
        let fields = flatten_account(accounts[i]);
        for j in 0..FLAT_ACCOUNT_FIELDS {
            flat[i*FLAT_ACCOUNT_FIELDS + j] = fields[j];
        }
    }

    flat
}

fn hash_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> Field {
    pedersen_hash(flatten_accounts(accounts))
}
```

Nakonec jsme se dostali k funkci, která hashuje pole účtů.

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

Tato funkce najde účet se specifickou adresou. Tato funkce by byla ve standardním kódu strašně neefektivní, protože iteruje přes všechny účty, i když už našla adresu.

V důkazech s nulovou znalostí však neexistuje žádné řízení toku. Pokud někdy potřebujeme zkontrolovat podmínku, musíme ji zkontrolovat pokaždé.

Podobná věc se děje s příkazy `if`. Příkaz `if` ve smyčce výše je přeložen do těchto matematických příkazů.

_výsledek<sub>podmínky</sub> = účty[i].adresa == adresa_ // jedna, pokud se rovnají, jinak nula

_účet<sub>nový</sub> = výsledek<sub>podmínky</sub>\*i + (1-výsledek<sub>podmínky</sub>)\*účet<sub>starý</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} nemá účet");

    account
}
```

Funkce [`assert`](https://noir-lang.org/docs/dev/noir/concepts/assert) způsobí pád důkazu s nulovou znalostí, pokud je tvrzení nepravdivé. V tomto případě, pokud nemůžeme najít účet s příslušnou adresou. K nahlášení adresy použijeme [formátovací řetězec](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings).

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

Tato funkce aplikuje převodní transakci a vrací nové pole účtů.

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

V Noir nemůžeme přistupovat k prvkům struktury uvnitř formátovacího řetězce, proto si vytvoříme použitelnou kopii.

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} nemá {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"Transakce má nonce {txnNonce}, ale očekává se, že účet použije {accountNonce}");
```

Toto jsou dvě podmínky, které by mohly způsobit neplatnost transakce.

```rust
    let mut newAccounts = accounts;

    newAccounts[from].balance -= txn.amount;
    newAccounts[from].nonce += 1;
    newAccounts[to].balance += txn.amount;

    newAccounts
}
```

Vytvořte nové pole účtů a poté ho vraťte.

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

Tato funkce čte adresu ze zprávy.

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

Adresa má vždy 20 bajtů (tj. 40 hexadecimálních číslic) a začíná na znaku #7.

```rust
        result *= 0x10;
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            result += (messageBytes[i]-48).into();
        }
        if messageBytes[i] >= 65 & messageBytes[i] <= 70 {    // A-F
            result += (messageBytes[i]-65+10).into()
        }
        if messageBytes[i] >= 97 & messageBytes[i] <= 102 {   // a-f
            result += (messageBytes[i]-97+10).into()
        }        
    }    

    result
}

fn readAmountAndNonce(messageBytes: [u8; MESSAGE_LENGTH]) -> (u128, u32)
```

Přečtěte částku a nonce ze zprávy.

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

Ve zprávě je první číslo za adresou částka finney (tj. tisícina ETH) k převodu. Druhé číslo je nonce. Jakýkoli text mezi nimi je ignorován.

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // Právě jsme to našli
                stillReadingNonce = true;
                lookingForNonce = false;
            }

            if stillReadingNonce {
                nonce = nonce*10 + digit.into();
            }
        } else {
            if stillReadingAmount {
                stillReadingAmount = false;
                lookingForNonce = true;
            }
            if stillReadingNonce {
                stillReadingNonce = false;
            }
        }
    }

    (amount, nonce)
}
```

Vrácení [n-tice](https://noir-lang.org/docs/noir/concepts/data_types/tuples) je v Noir způsob, jak vrátit více hodnot z funkce.

```rust
fn readTransferTxn(message: str<MESSAGE_LENGTH>) -> TransferTxn 
{
    let mut txn: TransferTxn = TransferTxn { from: 0, to: 0, amount:0, nonce:0 };
    let messageBytes = message.as_bytes();

    txn.to = readAddress(messageBytes);
    let (amount, nonce) = readAmountAndNonce(messageBytes);
    txn.amount = amount;
    txn.nonce = nonce;

    txn
}
```

Tato funkce převede zprávu na bajty a poté převede částky na `TransferTxn`.

```rust
// Ekvivalent hashMessage od Viem
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

Pedersen Hash jsme mohli použít pro účty, protože se hashují pouze v rámci důkazu s nulovou znalostí. V tomto kódu však musíme zkontrolovat podpis zprávy, který je generován prohlížečem. K tomu je třeba dodržet formát podepisování Ethereum v [EIP 191](https://eips.ethereum.org/EIPS/eip-191). To znamená, že musíme vytvořit kombinovanou vyrovnávací paměť se standardní předponou, délkou zprávy v ASCII a samotnou zprávou a k jejímu hashování použít standardní keccak256 z Etherea.

```rust
    // Předpona ASCII
    let prefix_bytes = [
        0x19, // \x19
        0x45, // 'E'
        0x74, // 't'
        0x68, // 'h'
        0x65, // 'e'
        0x72, // 'r'
        0x65, // 'e'
        0x75, // 'u'
        0x6D, // 'm'
        0x20, // ' '
        0x53, // 'S'
        0x69, // 'i'
        0x67, // 'g'
        0x6E, // 'n'
        0x65, // 'e'
        0x64, // 'd'
        0x20, // ' '
        0x4D, // 'M'
        0x65, // 'e'
        0x73, // 's'
        0x73, // 's'
        0x61, // 'a'
        0x67, // 'g'
        0x65, // 'e'
        0x3A, // ':'
        0x0A  // '\n'
    ];
```

Aby se předešlo případům, kdy aplikace požádá uživatele o podepsání zprávy, kterou lze použít jako transakci nebo pro jiný účel, EIP 191 stanoví, že všechny podepsané zprávy začínají znakem 0x19 (není to platný znak ASCII), za nímž následuje `Ethereum Signed Message:` a nový řádek.

```rust
    let mut buffer: [u8; HASH_BUFFER_SIZE] = [0u8; HASH_BUFFER_SIZE];
    for i in 0..26 {
        buffer[i] = prefix_bytes[i];
    }

    let messageBytes : [u8; MESSAGE_LENGTH] = message.as_bytes();

    if MESSAGE_LENGTH <= 9 {
        for i in 0..1 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+1] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 10 & MESSAGE_LENGTH <= 99 {
        for i in 0..2 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+2] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 100 {
        for i in 0..3 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+3] = messageBytes[i];
        }
    }

    assert(MESSAGE_LENGTH < 1000, "Zprávy s délkou přes tři číslice nejsou podporovány");
```

Zpracujte délky zpráv až do 999 a selžete, pokud je větší. Tento kód jsem přidal, i když délka zprávy je konstanta, protože to usnadňuje její změnu. V produkčním systému byste pravděpodobně předpokládali, že se `MESSAGE_LENGTH` nemění kvůli lepšímu výkonu.

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

Použijte standardní funkci Ethereum `keccak256`.

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // adresa, prvních 16 bajtů hashe, posledních 16 bajtů hashe        
{
```

Tato funkce ověřuje podpis, což vyžaduje hash zprávy. Poté nám poskytne adresu, která jej podepsala, a hash zprávy. Hash zprávy je dodáván ve dvou hodnotách `Field`, protože se s nimi ve zbytku programu snadněji pracuje než s bajtovým polem.

Musíme použít dvě hodnoty `Field`, protože výpočty pole se provádějí [modulo](https://en.wikipedia.org/wiki/Modulo) velkého čísla, ale toto číslo je obvykle menší než 256 bitů (jinak by bylo obtížné provádět tyto výpočty v EVM).

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

Určete `hash1` a `hash2` jako měnitelné proměnné a zapište do nich hash bajt po bajtu.

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```

Je to podobné jako u [`ecrecover` v Solidity](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions), se dvěma důležitými rozdíly:

- Pokud podpis není platný, volání selže s `assert` a program se přeruší.
- Zatímco veřejný klíč lze obnovit z podpisu a hashe, jedná se o zpracování, které lze provést externě, a proto se nevyplatí ho provádět v rámci důkazu s nulovou znalostí. Pokud se nás zde někdo pokusí podvést, ověření podpisu se nezdaří.

```rust
        hash1,
        hash2
    )
}

fn main(
        accounts: [Account; ACCOUNT_NUMBER],
        message: str<MESSAGE_LENGTH>,
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64],
    ) -> pub (
        Field,  // Hash pole starých účtů
        Field,  // Hash pole nových účtů
        Field,  // Prvních 16 bajtů hashe zprávy
        Field,  // Posledních 16 bajtů hashe zprávy
    )
```

Nakonec se dostáváme k funkci `main`. Musíme dokázat, že máme transakci, která platně mění hash účtů ze staré hodnoty na novou. Také musíme dokázat, že má tento specifický hash transakce, aby osoba, která ji odeslala, věděla, že její transakce byla zpracována.

```rust
{
    let mut txn = readTransferTxn(message);
```

Potřebujeme, aby `txn` byla měnitelná, protože adresu odesílatele nečteme ze zprávy, ale z podpisu.

```rust
    let (fromAddress, txnHash1, txnHash2) = signatureToAddressAndHash(
        message,
        pubKeyX,
        pubKeyY,
        signature);

    txn.from = fromAddress;

    let newAccounts = apply_transfer_txn(accounts, txn);

    (
        hash_accounts(accounts),
        hash_accounts(newAccounts),
        txnHash1,
        txnHash2
    )
}
```

### Fáze 2 – Přidání serveru {#stage-2}

Ve druhé fázi přidáme server, který přijímá a implementuje převodní transakce z prohlížeče.

Chcete-li to vidět v akci:

1. Zastavte Vite, pokud běží.

2. Stáhněte si větev, která obsahuje server, a ujistěte se, že máte všechny potřebné moduly.

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   Není třeba kompilovat kód Noir, je to stejný kód, který jste použili pro 1. fázi.

3. Spusťte server.

   ```sh
   npm run start
   ```

4. V samostatném okně příkazového řádku spusťte Vite, abyste mohli obsluhovat kód prohlížeče.

   ```sh
   cd client
   npm run dev
   ```

5. Přejděte na klientský kód na adrese [http://localhost:5173](http://localhost:5173)

6. Než budete moci vydat transakci, musíte znát nonce a také částku, kterou můžete odeslat. Chcete-li získat tyto informace, klikněte na **Aktualizovat údaje o účtu** a podepište zprávu.

   Máme zde dilema. Na jedné straně nechceme podepisovat zprávu, kterou lze znovu použít ([opakovací útok](https://en.wikipedia.org/wiki/Replay_attack)), což je důvod, proč chceme mít nonce. Nicméně ještě nemáme nonce. Řešením je zvolit nonce, které lze použít pouze jednou a které již máme na obou stranách, například aktuální čas.

   Problém s tímto řešením je, že čas nemusí být dokonale synchronizován. Takže místo toho podepíšeme hodnotu, která se mění každou minutu. To znamená, že naše okno zranitelnosti vůči opakovacím útokům je maximálně jedna minuta. Vzhledem k tomu, že v produkci bude podepsaný požadavek chráněn protokolem TLS a že druhá strana tunelu – server – již může sdělit zůstatek a nonce (musí je znát, aby mohl fungovat), jedná se o přijatelné riziko.

7. Jakmile prohlížeč získá zpět zůstatek a nonce, zobrazí formulář pro převod. Vyberte cílovou adresu a částku a klikněte na **Převod**. Podepište tento požadavek.

8. Chcete-li zobrazit převod, buď **Aktualizujte údaje o účtu**, nebo se podívejte do okna, kde spouštíte server. Server protokoluje stav při každé změně.

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start
    
    > server@1.0.0 start
    > node --experimental-json-modules index.mjs
    
    Poslouchá na portu 3000
    Zpracována transakce odeslání 0x90F79bf6EB2c4f870365E785982E1f101E93b906 36000 finney (milliEth) 0
    Nový stav:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 má 64000 (1)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 má 100000 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC má 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 má 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 má 100000 (0)
    Zpracována transakce odeslání 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 7200 finney (milliEth) 1
    Nový stav:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 má 56800 (2)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 má 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC má 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 má 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 má 100000 (0)
    Zpracována transakce odeslání 0x90F79bf6EB2c4f870365E785982E1f101E93b906 3000 finney (milliEth) 2
    Nový stav:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 má 53800 (3)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 má 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC má 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 má 139000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 má 100000 (0)
    ```

#### `server/index.mjs` {#server-index-mjs-1}

[Tento soubor](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) obsahuje proces serveru a interaguje s kódem Noir na [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr). Zde je vysvětlení zajímavých částí.

```js
import { Noir } from '@noir-lang/noir_js'
```

Knihovna [noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) propojuje kód JavaScriptu a kód Noir.

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

Načtěte aritmetický obvod – kompilovaný program Noir, který jsme vytvořili v předchozí fázi – a připravte se na jeho spuštění.

```js
// Informace o účtu poskytujeme pouze v odpovědi na podepsaný požadavek
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Získat data účtu " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

Pro poskytnutí informací o účtu potřebujeme pouze podpis. Důvodem je, že již víme, jaká bude zpráva, a tedy i hash zprávy.

```js
const processMessage = async (message, signature) => {
```

Zpracujte zprávu a proveďte transakci, kterou kóduje.

```js
    // Získat veřejný klíč
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

Nyní, když spouštíme JavaScript na serveru, můžeme získat veřejný klíč tam, spíše než na klientovi.

```js
    let noirResult
    try {
        noirResult = await noir.execute({
            message,
            signature: signature.slice(2,-2).match(/.{2}/g).map(x => `0x${x}`),
            pubKeyX,
            pubKeyY,
            accounts: Accounts
        })
```

`noir.execute` spouští program Noir. Parametry jsou ekvivalentní těm, které jsou uvedeny v souboru [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml). Všimněte si, že dlouhé hodnoty jsou poskytovány jako pole hexadecimálních řetězců (`["0x60", "0xA7"]`), nikoli jako jediná hexadecimální hodnota (`0x60A7`), jak to dělá Viem.

```js
    } catch (err) {
        console.log(`Chyba Noir: ${err}`)
        throw Error("Neplatná transakce, nebyla zpracována")
    }
```

Pokud dojde k chybě, zachyťte ji a poté předejte zjednodušenou verzi klientovi.

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

Proveďte transakci. Už jsme to udělali v kódu Noir, ale je snazší to udělat znovu zde, než extrahovat výsledek odtamtud.

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

Počáteční struktura `účtů`.

### Fáze 3 – Chytré kontrakty Ethereum {#stage-3}

1. Zastavte procesy serveru a klienta.

2. Stáhněte si větev s chytrými kontrakty a ujistěte se, že máte všechny potřebné moduly.

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Spusťte `anvil` v samostatném okně příkazového řádku.

4. Vygenerujte ověřovací klíč a ověřovač Solidity, poté zkopírujte kód ověřovače do projektu Solidity.

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. Přejděte na chytré kontrakty a nastavte proměnné prostředí pro použití blockchainu `anvil`.

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

6. Nasaďte `Verifier.sol` a uložte adresu do proměnné prostředí.

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. Nasaďte kontrakt `ZkBank`.

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   Hodnota `0x199..67b` je Pederson hash počátečního stavu `Účtů`. Pokud tento počáteční stav v `server/index.mjs` upravíte, můžete spustit transakci a zobrazit počáteční hash hlášený důkazem s nulovou znalostí.

8. Spusťte server.

   ```sh
   cd ../server
   npm run start
   ```

9. Spusťte klienta v jiném okně příkazového řádku.

   ```sh
   cd client
   npm run dev
   ```

10. Spusťte nějaké transakce.

11. Chcete-li ověřit, že se stav změnil na blockchainu, restartujte proces serveru. Podívejte se, že `ZkBank` již nepřijímá transakce, protože původní hodnota hashe v transakcích se liší od hodnoty hashe uložené na blockchainu.

    Toto je typ očekávané chyby.

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Poslouchání na portu 3000
    Chyba ověření: ContractFunctionExecutionError: Funkce kontraktu "processTransaction" se vrátila s následujícím důvodem:
    Špatný hash starého stavu

    Volání kontraktu:
        adresa:   0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
        funkce:  processTransaction(bytes _proof, bytes32[] _publicInputs)
        argumenty:                        (0x0000000000000000000000000000000000000000000000042ab5d6d1986846cf00000000000000000000000000000000000000000000000b75c020998797da7800000000000000000000000000000000000000000000000)
    ```

#### `server/index.mjs` {#server-index-mjs-2}

Změny v tomto souboru se týkají především vytvoření skutečného důkazu a jeho odeslání na blockchain.

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

Musíme použít [balíček Barretenberg](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg) k vytvoření skutečného důkazu k odeslání na blockchain. Tento balíček můžeme použít buď spuštěním rozhraní příkazového řádku (`bb`), nebo použitím [knihovny JavaScript, `bb.js`](https://www.npmjs.com/package/@aztec/bb.js). Knihovna JavaScript je mnohem pomalejší než nativní spouštění kódu, takže zde používáme [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) pro použití příkazového řádku.

Všimněte si, že pokud se rozhodnete použít `bb.js`, musíte použít verzi, která je kompatibilní s verzí Noir, kterou používáte. V době psaní tohoto článku aktuální verze Noir (1.0.0-beta.11) používá `bb.js` verze 0.87.

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

Zde uvedená adresa je ta, kterou získáte, když začnete s čistým `anvilem` a budete postupovat podle výše uvedených pokynů.

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

Tento privátní klíč je jedním z výchozích předem financovaných účtů v `anvil`.

```js
const generateProof = async (witness, fileID) => {
```

Vygenerujte důkaz pomocí spustitelného souboru `bb`.

```js
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

Zapište svědka do souboru.

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

Vytvořte důkaz. Tento krok také vytvoří soubor s veřejnými proměnnými, ale ten nepotřebujeme. Tyto proměnné jsme již získali z `noir.execute`.

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

Důkaz je pole JSON hodnot `Field`, z nichž každá je reprezentována jako hexadecimální hodnota. Musíme ho však odeslat v transakci jako jedinou hodnotu `bytes`, kterou Viem reprezentuje velkým hexadecimálním řetězcem. Zde měníme formát zřetězením všech hodnot, odstraněním všech `0x` a následným přidáním jednoho na konec.

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

Vyčistěte a vraťte důkaz.

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

Veřejná pole musí být pole 32bajtových hodnot. Jelikož jsme však potřebovali rozdělit hash transakce mezi dvě hodnoty `Field`, zobrazuje se jako 16bajtová hodnota. Zde přidáváme nuly, aby Viem pochopil, že se jedná o 32 bajtů.

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

Každá adresa používá každou nonce pouze jednou, takže můžeme použít kombinaci `fromAddress` a `nonce` jako jedinečný identifikátor pro soubor svědka a výstupní adresář.

```js
    try {
        await zkBank.write.processTransaction([
            proof, publicFields])
    } catch (err) {
        console.log(`Chyba ověření: ${err}`)
        throw Error("Transakci nelze ověřit na blockchainu")
    }
    .
    .
    .
}
```

Odešlete transakci do řetězce.

#### `smart-contracts/src/ZkBank.sol` {#smart-contracts-src-zkbank-sol}

Toto je onchain kód, který přijímá transakci.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.21;

import {HonkVerifier} from "./Verifier.sol";

contract ZkBank {
    HonkVerifier immutable myVerifier;
    bytes32 currentStateHash;

    constructor(address _verifierAddress, bytes32 _initialStateHash) {
        currentStateHash = _initialStateHash;
        myVerifier = HonkVerifier(_verifierAddress);
    }
```

Kód na blockchainu musí sledovat dvě proměnné: ověřovač (samostatný kontrakt vytvořený `nargem`) a aktuální hash stavu.

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

Pokaždé, když se stav změní, vydáme událost `TransactionProcessed`.

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

Tato funkce zpracovává transakce. Získá důkaz (jako `bajty`) a veřejné vstupy (jako pole `bytes32`) ve formátu, který ověřovatel vyžaduje (aby se minimalizovalo zpracování na blockchainu a tím i náklady na gas).

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Špatný starý hash stavu");
```

Důkaz s nulovou znalostí musí být o tom, že transakce se mění z našeho současného hashe na nový.

```solidity
        myVerifier.verify(_proof, _publicFields);
```

Zavolejte kontrakt ověřovače, abyste ověřili důkaz s nulovou znalostí. Tento krok vrátí transakci, pokud je důkaz s nulovou znalostí nesprávný.

```solidity
        currentStateHash = _publicFields[1];

        emit TransactionProcessed(
            _publicFields[2]<<128 | _publicFields[3],
            _publicFields[0],
            _publicFields[1]
        );
    }
}
```

Pokud je vše v pořádku, aktualizujte hash stavu na novou hodnotu a vydejte událost `TransactionProcessed`.

## Zneužití centralizovanou součástí {#abuses}

Informační bezpečnost se skládá ze tří atributů:

- _Důvěrnost_, uživatelé nemohou číst informace, ke kterým nejsou oprávněni.
- _Integrita_, informace nemohou být měněny jinak než oprávněnými uživateli oprávněným způsobem.
- _Dostupnost_, oprávnění uživatelé mohou systém používat.

V tomto systému je integrita zajištěna prostřednictvím důkazů s nulovou znalostí. Dostupnost je mnohem obtížnější zaručit a důvěrnost je nemožná, protože banka musí znát zůstatek každého účtu a všechny transakce. Neexistuje způsob, jak zabránit entitě, která má informace, v jejich sdílení.

Možná by bylo možné vytvořit skutečně důvěrnou banku pomocí [neviditelných adres](https://vitalik.eth.limo/general/2023/01/20/stealth.html), ale to je nad rámec tohoto článku.

### Nepravdivé informace {#false-info}

Jedním ze způsobů, jak může server porušit integritu, je poskytnutí nepravdivých informací, když [jsou požadována data](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291).

K vyřešení tohoto problému můžeme napsat druhý program Noir, který přijímá účty jako soukromý vstup a adresu, pro kterou jsou informace požadovány, jako veřejný vstup. Výstupem je zůstatek a nonce této adresy a hash účtů.

Tento důkaz samozřejmě nelze ověřit na blockchainu, protože nechceme zveřejňovat nonce a zůstatky na blockchainu. Může však být ověřen klientským kódem spuštěným v prohlížeči.

### Vynucené transakce {#forced-txns}

Obvyklým mechanismem pro zajištění dostupnosti a prevenci cenzury na L2 jsou [vynucené transakce](https://docs.optimism.io/stack/transactions/forced-transaction). Ale vynucené transakce se nekombinují s důkazy s nulovou znalostí. Server je jedinou entitou, která může ověřovat transakce.

Můžeme upravit `smart-contracts/src/ZkBank.sol` tak, aby přijímal vynucené transakce a zabránil serveru měnit stav, dokud nebudou zpracovány. To nás však vystavuje jednoduchému útoku typu denial-of-service. Co když je vynucená transakce neplatná, a proto ji nelze zpracovat?

Řešením je mít důkaz s nulovou znalostí, že vynucená transakce je neplatná. To dává serveru tři možnosti:

- Zpracovat vynucenou transakci a poskytnout důkaz s nulovou znalostí, že byla zpracována, a nový hash stavu.
- Odmítnout vynucenou transakci a poskytnout kontraktu důkaz s nulovou znalostí, že transakce je neplatná (neznámá adresa, špatné nonce nebo nedostatečný zůstatek).
- Ignorovat vynucenou transakci. Neexistuje způsob, jak donutit server, aby transakci skutečně zpracoval, ale znamená to, že celý systém je nedostupný.

#### Dluhopisy dostupnosti {#avail-bonds}

V reálné implementaci by pravděpodobně existoval nějaký druh motivace k zisku pro udržení serveru v provozu. Tuto pobídku můžeme posílit tím, že server zveřejní dluhopis dostupnosti, který může kdokoli spálit, pokud vynucená transakce není zpracována v určitém období.

### Špatný kód Noir {#bad-noir-code}

Normálně, aby lidé důvěřovali chytrému kontraktu, nahrajeme zdrojový kód do [prohlížeče bloků](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract). V případě důkazů s nulovou znalostí to však nestačí.

`Verifier.sol` obsahuje ověřovací klíč, který je funkcí programu Noir. Tento klíč nám však neříká, jaký byl program Noir. Chcete-li mít skutečně důvěryhodné řešení, musíte nahrát program Noir (a verzi, která ho vytvořila). V opačném případě by důkazy s nulovou znalostí mohly odrážet jiný program, program se zadními vrátky.

Dokud nám prohlížeče bloků neumožní nahrávat a ověřovat programy Noir, měli byste to dělat sami (nejlépe na [IPFS](/developers/tutorials/ipfs-decentralized-ui/)). Poté budou moci zkušení uživatelé stáhnout zdrojový kód, sami ho zkompilovat, vytvořit `Verifier.sol` a ověřit, že je identický s tím na blockchainu.

## Závěr {#conclusion}

Aplikace typu Plasma vyžadují centralizovanou komponentu jako úložiště informací. To otevírá potenciální zranitelnosti, ale na oplátku nám to umožňuje zachovat soukromí způsoby, které na samotném blockchainu nejsou dostupné. S důkazy s nulovou znalostí můžeme zajistit integritu a případně učinit ekonomicky výhodným, aby kdokoli, kdo provozuje centralizovanou komponentu, udržoval dostupnost.

[Více z mé práce najdete zde](https://cryptodocguy.pro/).

## Poděkování {#acknowledgements}

- Josh Crites si přečetl návrh tohoto článku a pomohl mi s ošemetným problémem Noir.

Za zbývající chyby jsem zodpovědný já.
