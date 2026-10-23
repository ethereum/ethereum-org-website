---
title: "Vytvoření Plasmy specifické pro aplikaci, která zachovává soukromí"
description: "V tomto tutoriálu vytvoříme polotajnou banku pro vklady. Banka je centralizovaná komponenta; zná zůstatek každého uživatele. Tyto informace však nejsou uloženy onchain. Místo toho banka zveřejňuje hash stavu. Pokaždé, když dojde k transakci, banka zveřejní nový hash společně s důkazem s nulovou znalostí, že má podepsanou transakci, která mění stav hashe na nový. Po přečtení tohoto tutoriálu pochopíte nejen to, jak používat důkazy s nulovou znalostí, ale také proč se používají a jak to dělat bezpečně."
author: Ori Pomerantz
tags:
  - s nulovým vědomím
  - server
  - offchain
  - soukromí
skill: advanced
breadcrumb: "Plasma specifická pro aplikaci"
lang: cs
published: 2025-10-15
---

## Úvod {#introduction}

Na rozdíl od [rollupů](/developers/docs/scaling/zk-rollups/) používá [Plasma](/developers/docs/scaling/plasma) Ethereum Mainnet pro zajištění integrity, ale ne pro dostupnost. V tomto článku napíšeme aplikaci, která se chová jako Plasma, přičemž Ethereum zaručuje integritu (žádné neoprávněné změny), ale ne dostupnost (centralizovaná komponenta může selhat a vyřadit z provozu celý systém).

Aplikace, kterou zde napíšeme, je banka zachovávající soukromí. Různé adresy mají účty se zůstatky a mohou posílat peníze (ETH) na jiné účty. Banka zveřejňuje hashe stavu (účtů a jejich zůstatků) a transakcí, ale skutečné zůstatky uchovává offchain, kde mohou zůstat v soukromí.

## Návrh {#design}

Nejedná se o systém připravený pro produkční nasazení, ale o výukový nástroj. Jako takový je napsán s několika zjednodušujícími předpoklady.

- Fixní množina účtů. Existuje určitý počet účtů a každý účet patří předem určené adrese. To dělá systém mnohem jednodušším, protože v důkazech s nulovou znalostí je obtížné pracovat s datovými strukturami proměnné velikosti. U produkčně připraveného systému můžeme jako hash stavu použít [Merkleho kořen](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) a poskytovat Merkleho důkazy pro požadované zůstatky.

- Ukládání v paměti. V produkčním systému bychom museli zapisovat všechny zůstatky účtů na disk, aby se zachovaly v případě restartu. Zde je v pořádku, když se informace jednoduše ztratí.

- Pouze převody. Produkční systém by vyžadoval způsob, jak vkládat aktiva do banky a jak je vybírat. Zde je však účelem pouze ilustrovat koncept, takže je tato banka omezena pouze na převody.

### Důkazy s nulovou znalostí {#zero-knowledge-proofs}

Na základní úrovni důkaz s nulovou znalostí ukazuje, že dokazovatel zná nějaká data _Data<sub>private</sub>_ taková, že existuje vztah _Relationship_ mezi některými veřejnými daty _Data<sub>public</sub>_ a _Data<sub>private</sub>_. Ověřovatel zná _Relationship_ a _Data<sub>public</sub>_.

Abychom zachovali soukromí, potřebujeme, aby stavy a transakce byly soukromé. K zajištění integrity však potřebujeme, aby [kryptografický hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function) stavů byl veřejný. Abychom lidem, kteří odesílají transakce, dokázali, že tyto transakce skutečně proběhly, musíme také zveřejňovat hashe transakcí.

Ve většině případů jsou _Data<sub>private</sub>_ vstupem do programu pro důkaz s nulovou znalostí a _Data<sub>public</sub>_ jsou výstupem.

Tato pole v _Data<sub>private</sub>_:

- _State<sub>n</sub>_, starý stav
- _State<sub>n+1</sub>_, nový stav
- _Transaction_, transakce, která mění starý stav na nový. Tato transakce musí obsahovat tato pole:
  - _Cílová adresa_, která přijímá převod
  - _Částka_, která se převádí
  - _Nonce_ pro zajištění toho, že každou transakci lze zpracovat pouze jednou.
    Zdrojová adresa v transakci být nemusí, protože ji lze obnovit z podpisu.
- _Podpis_, podpis, který je oprávněn provést transakci. V našem případě je jedinou adresou oprávněnou provést transakci zdrojová adresa. Vzhledem k tomu, jak náš systém s nulovým vědomím funguje, budeme kromě podpisu Etherea potřebovat také veřejný klíč účtu.

Tato pole jsou v _Data<sub>public</sub>_:

- _Hash(State<sub>n</sub>)_, hash starého stavu
- _Hash(State<sub>n+1</sub>)_, hash nového stavu
- _Hash(Transaction)_, hash transakce, která mění stav z _State<sub>n</sub>_ na _State<sub>n+1</sub>_.

Vztah kontroluje několik podmínek:

- Veřejné hashe jsou skutečně správnými hashi pro privátní pole.
- Když se transakce aplikuje na starý stav, výsledkem je nový stav.
- Podpis pochází ze zdrojové adresy transakce.

Vzhledem k vlastnostem kryptografických hashovacích funkcí je prokázání těchto podmínek dostatečné k zajištění integrity.

### Datové struktury {#data-structures}

Primární datovou strukturou je stav udržovaný serverem. Pro každý účet server sleduje zůstatek účtu a [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce), což se používá k prevenci [replay útoků](https://en.wikipedia.org/wiki/Replay_attack).

### Komponenty {#components}

Tento systém vyžaduje dvě komponenty:

- _Server_, který přijímá transakce, zpracovává je a zveřejňuje hashe v řetězci společně s důkazy s nulovou znalostí.
- _Chytrý kontrakt_, který ukládá hashe a ověřuje důkazy s nulovou znalostí, aby se ujistil, že přechody stavů jsou legitimní.

### Datový a řídicí tok {#flows}

Toto jsou způsoby, jak různé komponenty komunikují při převodu z jednoho účtu na druhý.

1. Webový prohlížeč odešle podepsanou transakci požadující převod z účtu podepisujícího na jiný účet.

2. Server ověří, že transakce je platná:

   - Podepisující má v bance účet s dostatečným zůstatkem.
   - Příjemce má v bance účet.

3. Server vypočítá nový stav odečtením převáděné částky ze zůstatku podepisujícího a jejím přičtením k zůstatku příjemce.

4. Server vypočítá důkaz s nulovou znalostí, že změna stavu je platná.

5. Server odešle Ethereu transakci, která obsahuje:

   - Nový hash stavu
   - Hash transakce (aby odesílatel transakce věděl, že byla zpracována)
   - Důkaz s nulovou znalostí, který prokazuje, že přechod na nový stav je platný

6. Chytrý kontrakt ověří důkaz s nulovou znalostí.

7. Pokud je důkaz s nulovou znalostí v pořádku, chytrý kontrakt provede tyto akce:
   - Aktualizuje hash současného stavu na nový hash stavu
   - Vygeneruje log s novým hashem stavu a hashem transakce

### Nástroje {#tools}

Pro kód na straně klienta použijeme [Vite](https://vite.dev/), [React](https://react.dev/), [Viem](https://viem.sh/) a [Wagmi](https://wagmi.sh/). Jedná se o průmyslově standardní nástroje; pokud s nimi nejste obeznámeni, můžete použít [tento tutoriál](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

Většina serveru je napsána v JavaScriptu pomocí [Node](https://nodejs.org/en). Část s nulovým vědomím je napsána v jazyce [Noir](https://noir-lang.org/). Potřebujeme verzi `1.0.0-beta.10`, takže po [instalaci Noiru podle pokynů](https://noir-lang.org/docs/getting_started/quick_start) spusťte:

```
noirup -v 1.0.0-beta.10
```

Blockchain, který používáme, je `anvil`, což je lokální testovací blockchain, který je součástí [Foundry](https://getfoundry.sh/introduction/installation).

## Implementace {#implementation}

Vzhledem k tomu, že jde o složitý systém, implementujeme ho ve fázích.

### Fáze 1 - Manuální nulové vědomí {#stage-1}

V první fázi podepíšeme transakci v prohlížeči a následně ručně poskytneme informace důkazu s nulovou znalostí. Kód s nulovým vědomím očekává, že tyto informace získá v `server/noir/Prover.toml` (zdokumentováno [zde](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1)).

Pokud to chcete vidět v akci:

1. Ujistěte se, že máte nainstalovaný [Node](https://nodejs.org/en/download) a [Noir](https://noir-lang.org/docs/installation). Nejlépe je nainstalujte na unixový systém, jako je macOS, Linux nebo [WSL](https://learn.microsoft.com/en-us/windows/wsl/install).

2. Stáhněte si kód fáze 1 a spusťte webový server, abyste obsloužili klientský kód.

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   Důvodem, proč zde potřebujete webový server, je to, že k zabránění určitým typům podvodů mnoho peněženek (například MetaMask) nepřijímá soubory obsluhované přímo z disku.

3. Otevřete prohlížeč s peněženkou.

4. V peněžence zadejte novou přístupovou frázi. Všimněte si, že to smaže vaši existující přístupovou frázi, takže se _ujistěte, že máte zálohu_.

   Přístupová fráze je `test test test test test test test test test test test junk`, výchozí testovací přístupová fráze pro anvil.

5. Přejděte na [kód na straně klienta](http://localhost:5173/).

6. Připojte se k peněžence a vyberte svůj cílový účet a částku.

7. Klikněte na **Sign** a podepište transakci.

8. Pod nadpisem **Prover.toml** najdete text. Nahraďte `server/noir/Prover.toml` tímto textem.

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
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

Zpráva je v textovém formátu, což uživateli usnadňuje porozumění (což je při podepisování nezbytné) a usnadňuje parsování v kódu pro Noir. Částka je uváděna ve finney pro umožnění zlomkových převodů na jedné straně a snadnou čitelnost na straně druhé. Posledním číslem je [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce).

Řetězec je dlouhý 100 znaků. Důkazy s nulovou znalostí si s daty s proměnlivou velikostí moc dobře neporadí, takže je často nutné data doplnit (padding).

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

Tyto tři parametry jsou bajtová pole fixní velikosti.

```toml
[[accounts]]
address="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
balance=100_000
nonce=0

[[accounts]]
address="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
balance=100_000
nonce=0
```

Toto je způsob, jak specifikovat pole struktur. Pro každou položku zadáme adresu, zůstatek (v milliETH neboli [finney](https://cryptovalleyjournal.com/glossary/finney/)) a hodnotu další nonce.

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[Tento soubor](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) implementuje zpracování na straně klienta a generuje soubor `server/noir/Prover.toml` (ten, který obsahuje parametry pro systém s nulovým vědomím).

Zde je vysvětlení těch zajímavějších částí.

```tsx
export default attrs =>  {
```

Tato funkce vytváří React komponentu `Transfer`, kterou mohou importovat další soubory.

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

Toto jsou adresy účtů, adresy vytvořené přístupovou frází `test ... test junk`. Pokud chcete použít vlastní adresy, jednoduše upravte tuto definici.

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

Tyto [Wagmi hooky](https://wagmi.sh/react/api/hooks) nám umožňují přístup ke knihovně [Viem](https://viem.sh/) a k peněžence.

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

Toto je zpráva, doplněná mezerami. Pokaždé, když se jedna z proměnných [`useState`](https://react.dev/reference/react/useState) změní, komponenta se překreslí a `message` se aktualizuje.

```tsx
  const sign = async () => {
```

Tato funkce se volá, když uživatel klikne na tlačítko **Sign**. Zpráva se automaticky aktualizuje, ale podpis vyžaduje schválení uživatele v peněžence a my ho nechceme vyžadovat, pokud to není nutné.

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

Získejte hash zprávy. Je užitečné ho uživateli poskytnout pro účely ladění (kódu v Noir). 

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[Získejte veřejný klíč](https://viem.sh/docs/utilities/recoverPublicKey). Ten je nezbytný pro funkci [Noir `ecrecover`](https://github.com/colinnielsen/ecrecover-noir).

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

Nastavte stavové proměnné. Tím dojde k překreslení komponenty (poté, co funkce `sign` skončí) a ukáže uživateli aktualizované hodnoty.

```tsx
    let proverToml = `
```

Text pro `Prover.toml`.

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem nám poskytuje veřejný klíč jako 65bajtový hexadecimální řetězec. První bajt je `0x04`, což je značka verze. Následuje 32 bajtů pro souřadnici `x` veřejného klíče a pak 32 bajtů pro souřadnici `y` veřejného klíče.

Noir však očekává tyto informace jako dvě pole bajtů, jedno pro `x` a druhé pro `y`. Je jednodušší provést parsování zde na klientovi, než jako součást důkazu s nulovou znalostí.

Všimněte si, že v kontextu nulového vědomí jde obecně o osvědčený postup. Kód uvnitř důkazu s nulovou znalostí je drahý, takže jakékoliv zpracování, které lze provést mimo důkaz s nulovou znalostí, _by mělo_ být provedeno mimo tento důkaz.

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

Podpis je také poskytován jako 65bajtový hexadecimální řetězec. Avšak poslední bajt je nutný pouze pro obnovení veřejného klíče. Vzhledem k tomu, že veřejný klíč již kódu v Noir bude poskytnut, nepotřebujeme jej k ověření podpisu a kód v Noir jej nevyžaduje.

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
        <h2>Transfer</h2>
```

Toto je formát komponenty v HTML (přesněji v [JSX](https://react.dev/learn/writing-markup-with-jsx)).

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[Tento soubor](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) je samotný kód s nulovým vědomím.

```
use std::hash::pedersen_hash;
```

[Pedersen hash](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) se poskytuje se [standardní knihovnou Noir](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash). Důkazy s nulovou znalostí tuto hashovací funkci běžně používají. Je mnohem snazší ji vypočítat uvnitř [aritmetických obvodů](https://rareskills.io/post/arithmetic-circuit) ve srovnání se standardními hashovacími funkcemi.

```
use keccak256::keccak256;
use dep::ecrecover;
```

Tyto dvě funkce jsou externí knihovny, definované v [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml). Dělají přesně to, podle čeho jsou pojmenovány – funkce, která počítá [hash keccak256](https://emn178.github.io/online-tools/keccak_256.html) a funkce, která ověřuje podpisy Etherea a obnovuje adresu podepisujícího.

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir je inspirován jazykem [Rust](https://www.rust-lang.org/). Proměnné jsou ve výchozím nastavení konstanty. Takto definujeme globální konfigurační konstanty. Konkrétně `ACCOUNT_NUMBER` je počet účtů, které ukládáme.

Datové typy pojmenované `u<number>` mají odpovídající počet bitů, a to bez znaménka. Jedinými podporovanými typy jsou `u8`, `u16`, `u32`, `u64` a `u128`.

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

Tato proměnná se používá pro Pedersen hash účtů, jak je vysvětleno níže.

```
global MESSAGE_LENGTH : u32 = 100;
```

Jak bylo vysvětleno výše, délka zprávy je fixní. Je specifikována zde.

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[Podpisy typu EIP-191](https://eips.ethereum.org/EIPS/eip-191) vyžadují buffer s 26bajtovou předponou, po které následuje délka zprávy v ASCII, a nakonec samotná zpráva.

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

Informace, které o účtu uchováváme. [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) je číslo, typicky až o 253 bitech, které lze použít přímo v [aritmetickém obvodu](https://rareskills.io/post/arithmetic-circuit), který implementuje důkaz s nulovou znalostí. Zde používáme `Field` k uložení 160bitové adresy Etherea.

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

Informace, které uchováváme pro transakci převodu.

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

Definice funkce. Parametrem je informace `Account`. Výsledkem je pole proměnných typu `Field`, jehož délka je `FLAT_ACCOUNT_FIELDS`

```
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

První hodnotou v poli je adresa účtu. Druhá zahrnuje jak zůstatek, tak nonce. Volání `.into()` změní číslo na požadovaný datový typ. `account.nonce` je hodnota typu `u32`, ale aby bylo možné ji přidat k `account.balance << 32`, což je hodnota `u128`, musí se jednat o `u128`. To je to první `.into()`. To druhé převádí výsledek `u128` na `Field`, aby se vešel do pole.

```
    flat
}
```

V jazyce Noir mohou funkce vrátit hodnotu pouze na samém konci (neexistuje zde brzký návrat přes return). Chcete-li specifikovat návratovou hodnotu, vyhodnotíte ji těsně před uzavírací závorkou funkce.

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

Tato funkce převede pole účtů na pole `Field`, které pak může být použito jako vstup pro Pedersen hash.

```
    let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

Takto specifikujete mutovatelnou proměnnou, tedy _nikoliv_ konstantu. Proměnné v Noiru musí mít vždy hodnotu, takže tuto proměnnou inicializujeme samými nulami.

```
    for i in 0..ACCOUNT_NUMBER {
```

Toto je smyčka typu `for`. Všimněte si, že hranice jsou konstanty. Smyčky v Noiru musí mít své hranice známé už v době překladu. Důvodem je to, že aritmetické obvody nepodporují řízení toku (flow control). Při zpracování smyčky `for` překladač jednoduše vloží kód uvnitř smyčky několikrát, pro každou iteraci jednou.

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

Konečně jsme se dostali k funkci, která hashuje pole účtů.

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

Tato funkce hledá účet s určitou adresou. Ve standardním kódu by byla taková funkce strašně neefektivní, protože prochází všechny účty i poté, co adresu už našla.

Avšak v důkazech s nulovou znalostí žádné řízení toku neexistuje. Pokud někdy potřebujeme ověřit podmínku, musíme ji ověřit pokaždé.

Podobná věc se děje u příkazů `if`. Příkaz `if` ve smyčce výše se překládá do těchto matematických výroků.

_condition<sub>result</sub> = accounts[i].address == address_ // jedna, pokud se rovnají, jinak nula

_account<sub>new</sub> = condition<sub>result</sub>\*i + (1-condition<sub>result</sub>)\*account<sub>old</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

Funkce [`assert`](https://noir-lang.org/docs/language/assert) způsobí pád důkazu s nulovou znalostí, pokud je tvrzení nepravdivé. V tomto případě, pokud nemůžeme najít účet s příslušnou adresou. K ohlášení adresy používáme [formátovací řetězec](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings).

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

Tato funkce uplatní transakci převodu a vrátí nové pole účtů.

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

V jazyce Noir nemáme přístup k prvkům struktury uvnitř formátovacího řetězce, proto si vytváříme použitelnou kopii.

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} does not have {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"Transaction has nonce {txnNonce}, but the account is expected to use {accountNonce}");
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

Tato funkce přečte adresu ze zprávy. 

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

Adresa je vždy dlouhá 20 bajtů (tedy 40 hexadecimálních číslic) a začíná na 7. znaku.

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

Ze zprávy si přečtěte částku a nonce. 

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

Ve zprávě je prvním číslem po adrese množství finney (neboli tisícin ETH) k převodu. Druhým číslem je nonce. Jakýkoliv text mezi nimi je ignorován.

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

Návrat [n-tice](https://noir-lang.org/docs/noir/concepts/data_types/tuples) (tuple) je v Noiru způsobem, jak z funkce vrátit více hodnot.

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
// Ekvivalent k hashMessage z Viem
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

Pro účty jsme mohli použít Pedersen hash, protože jsou hashovány pouze v rámci důkazu s nulovou znalostí. V tomto kódu však musíme zkontrolovat podpis zprávy, který je vygenerován prohlížečem. K tomu musíme postupovat podle formátu podepisování Etherea v [EIP-191](https://eips.ethereum.org/EIPS/eip-191). To znamená, že musíme vytvořit kombinovaný buffer se standardní předponou, délkou zprávy v ASCII a samotnou zprávou, a následně to vše zahashovat pomocí standardního Ethereum keccak256.

```rust
    // ASCII prefix
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

Aby se zabránilo situacím, kdy aplikace požádá uživatele o podepsání zprávy, kterou lze použít jako transakci nebo pro nějaký jiný účel, EIP-191 specifikuje, že všechny podepsané zprávy začínají znakem 0x19 (není platným znakem v ASCII), po kterém následuje `Ethereum Signed Message:` a nový řádek.

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

    assert(MESSAGE_LENGTH < 1000, "Messages whose length is over three digits are not supported");
```

Zvládne zprávy s délkou až 999 a pokud je větší, selže. Tento kód jsem přidal i přesto, že je délka zprávy konstantní, protože to usnadňuje případnou změnu. V produkčním systému byste pravděpodobně pro vyšší výkon jednoduše předpokládali, že se `MESSAGE_LENGTH` nemění.

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

Použijte standardní funkci Etherea `keccak256`.

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // adresa, prvních 16 bajtů hashe, posledních 16 bajtů hashe        
{
```

Tato funkce ověřuje podpis, což vyžaduje hash zprávy. Následně nám poskytne adresu podepisujícího a hash zprávy. Hash zprávy je dodáván ve dvou hodnotách `Field`, protože se s nimi ve zbytku programu pracuje snadněji než s polem bajtů.

Musíme použít dvě hodnoty `Field`, protože výpočty nad tělesy (field calculations) se provádějí pomocí [modulo](https://en.wikipedia.org/wiki/Modulo) velkého čísla, ale toto číslo má obvykle méně než 256 bitů (jinak by bylo těžké tyto výpočty provádět v EVM).

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

Specifikujte `hash1` a `hash2` jako mutovatelné proměnné a zapište do nich hash bajt po bajtu.

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```
    
Je to podobné jako [`ecrecover` v Solidity](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions), se dvěma důležitými rozdíly:

- Pokud podpis není platný, selže volání `assert` a program je přerušen.
- Zatímco veřejný klíč lze z podpisu a hashe obnovit, jde o zpracování, které lze provést externě, a proto nestojí za to jej dělat uvnitř důkazu s nulovou znalostí. Pokud se nás tu někdo pokusí oklamat, ověření podpisu prostě selže.

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

Nakonec se dostáváme k funkci `main`. Musíme prokázat, že máme transakci, která platně mění hash účtů ze staré hodnoty na novou. Musíme také prokázat, že má právě tento konkrétní hash transakce, aby osoba, která ji odeslala, věděla, že její transakce byla zpracována.

```rust
{
    let mut txn = readTransferTxn(message);
```

Musíme nastavit `txn` jako mutovatelnou proměnnou, protože odesílající adresu (from address) nečteme ze zprávy, nýbrž z podpisu. 

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

### Fáze 2 - Přidání serveru {#stage-2}

Ve druhé fázi přidáme server, který přijímá a implementuje transakce převodu z prohlížeče.

Pokud to chcete vidět v akci:

1. Zastavte Vite, pokud běží.

2. Stáhněte si větev (branch), která zahrnuje server, a ujistěte se, že máte všechny potřebné moduly.

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   Kód pro Noir není nutné kompilovat, je úplně stejný jako kód, který jste použili ve fázi 1.

3. Spusťte server.

   ```sh
   npm run start
   ```

4. V samostatném okně příkazového řádku spusťte Vite, které naservíruje kód pro prohlížeč.

   ```sh
   cd client
   npm run dev
   ```

5. Přejděte na klientský kód na adrese [http://localhost:5173](http://localhost:5173)

6. Před odesláním transakce musíte znát jak nonce, tak částku, kterou můžete odeslat. Tuto informaci získáte kliknutím na **Update account data** a podepsáním zprávy.

   Tady máme dilema. Na jedné straně nechceme podepsat zprávu, která by mohla být znovu použita ([replay útok](https://en.wikipedia.org/wiki/Replay_attack)), a proto v první řadě chceme hodnotu nonce. Žádné nonce však zatím nemáme. Řešením je vybrat nonce, které lze použít pouze jednou a které už máme na obou stranách, jako je aktuální čas.

   Problémem tohoto řešení je, že čas nemusí být dokonale synchronizován. Takže místo toho podepíšeme hodnotu, která se každou minutu mění. To znamená, že naše časové okno zranitelnosti vůči replay útokům je nanejvýš jedna minuta. Vezmeme-li v úvahu, že v produkčním prostředí bude podepsaný požadavek chráněn prostřednictvím TLS, a že druhá strana tunelu – server – už může odhalit zůstatek i nonce (musí je znát, aby mohla fungovat), jedná se o přijatelné riziko.

7. Jakmile prohlížeč získá zpět zůstatek a nonce, zobrazí formulář pro převod. Vyberte cílovou adresu a částku a klikněte na **Transfer**. Podepište tento požadavek.

8. Chcete-li převod vidět, buď klikněte na **Update account data**, nebo se podívejte do okna, kde běží server. Server zapíše do logu stav pokaždé, když dojde ke změně.

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Listening on port 3000
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 36000 finney (milliEth) 0 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 64000 (1)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 100000 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 7200 finney (milliEth) 1 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 56800 (2)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 3000 finney (milliEth) 2 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 53800 (3)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 139000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    ```

#### `server/index.mjs` {#server-index-mjs-1}

[Tento soubor](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) obsahuje serverový proces a komunikuje s kódem pro Noir v [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr). Zde je vysvětlení zajímavých částí.

```js
import { Noir } from '@noir-lang/noir_js'
```

Knihovna [noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) slouží jako rozhraní mezi kódem v JavaScriptu a v Noiru.

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

Načtěte aritmetický obvod – zkompilovaný Noir program, který jsme vytvořili v předchozí fázi – a připravte jej ke spuštění.

```js
// Informace o účtu poskytujeme pouze jako odpověď na podepsaný požadavek
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

Abychom poskytli informace o účtu, potřebujeme pouze podpis. Důvodem je, že už víme, jaká zpráva bude, a známe tím pádem i hash zprávy.

```js
const processMessage = async (message, signature) => {
```

Zpracujte zprávu a proveďte transakci, kterou zpráva kóduje.

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

`noir.execute` spustí Noir program. Parametry jsou ekvivalentní s těmi, které jsou uvedeny v [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml). Všimněte si, že dlouhé hodnoty jsou poskytovány jako pole hexadecimálních řetězců (`["0x60", "0xA7"]`), ne jako jedna hexadecimální hodnota (`0x60A7`), jak to dělá Viem.

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Invalid transaction, not processed")
    }
```

Pokud dojde k chybě, zachyťte ji a poté předejte zjednodušenou verzi klientovi.

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

Uplatněte transakci. V Noir kódu už jsme to sice udělali, ale je jednodušší to udělat znovu zde, než odtamtud extrahovat výsledek.

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

Počáteční struktura `Accounts`.

### Fáze 3 - Chytré kontrakty Etherea {#stage-3}

1. Zastavte serverové a klientské procesy.

2. Stáhněte si větev (branch) s chytrými kontrakty a ujistěte se, že máte všechny potřebné moduly.

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Spusťte `anvil` v samostatném okně příkazové řádky.

4. Vygenerujte ověřovací klíč a verifikátor v Solidity (Solidity verifier) a poté zkopírujte kód verifikátoru do projektu v Solidity.

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. Přejděte do chytrých kontraktů a nastavte proměnné prostředí tak, aby se používal blockchain `anvil`.

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

   Hodnota `0x199..67b` je Pedersen hash počátečního stavu `Accounts`. Pokud tento počáteční stav upravíte v `server/index.mjs`, můžete spustit transakci, abyste viděli počáteční hash hlášený důkazem s nulovou znalostí.

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

10. Proveďte nějaké transakce.

11. Chcete-li ověřit, že se stav změnil onchain, restartujte proces serveru. Zjistíte, že `ZkBank` již nepřijímá transakce, protože původní hodnota hashe v transakcích se liší od hodnoty hashe uložené onchain.

    Tento typ chyby se očekává.

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Listening on port 3000
    Verification error: ContractFunctionExecutionError: The contract function "processTransaction" reverted with the following reason:
    Wrong old state hash

    Contract Call:
        address:   0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
        function:  processTransaction(bytes _proof, bytes32[] _publicInputs)
        args:                        (0x0000000000000000000000000000000000000000000000042ab5d6d1986846cf00000000000000000000000000000000000000000000000b75c020998797da7800000000000000000000000000000000000000000000000
    ```

#### `server/index.mjs` {#server-index-mjs-2}

Změny v tomto souboru se týkají především vytváření samotného důkazu a jeho odeslání onchain.

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

Musíme použít [balíček Barretenberg](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg), abychom vytvořili skutečný důkaz k odeslání onchain. Tento balíček můžeme použít buď spuštěním přes rozhraní příkazové řádky (`bb`), nebo pomocí [knihovny JavaScript, `bb.js`](https://www.npmjs.com/package/@aztec/bb.js). JavaScriptová knihovna je mnohem pomalejší než nativní spouštění kódu, takže tady používáme [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) k použití příkazového řádku.

Upozorňujeme, že pokud se rozhodnete použít `bb.js`, musíte použít verzi, která je kompatibilní s verzí Noiru, kterou používáte. V době psaní tohoto textu používá aktuální verze Noiru (1.0.0-beta.11) knihovnu `bb.js` verze 0.87.

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

Adresa, která se zde nachází, je tou, kterou získáte, pokud začnete s čistým `anvil` a budete se řídit výše uvedenými pokyny.

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

Tento soukromý klíč představuje jeden z výchozích předfinancovaných účtů v prostředí `anvil`. 

```js
const generateProof = async (witness, fileID) => {
```

Vygenerujte důkaz pomocí spustitelného souboru `bb`.

```js 
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

Zapište svědka (witness) do souboru.

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

Vytvořte samotný důkaz. Tento krok rovněž vytvoří soubor s veřejnými proměnnými, ale to nepotřebujeme. Tyto proměnné už jsme získali z `noir.execute`.

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

Důkaz je pole v JSON obsahující hodnoty `Field`, přičemž každá je reprezentována jako hexadecimální hodnota. V transakci jej ovšem musíme odeslat jako jednu hodnotu `bytes`, kterou Viem reprezentuje velkým hexadecimálním řetězcem. Zde měníme formát tím, že všechny hodnoty zřetězíme, odstraníme všechny výskyty `0x` a nakonec jeden přidáme.

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

Veřejná pole musí být polem 32bajtových hodnot. Avšak vzhledem k tomu, že jsme museli hash transakce rozdělit mezi dvě hodnoty `Field`, jeví se to jako 16bajtová hodnota. Tady přidáváme nuly, aby knihovna Viem pochopila, že jde ve skutečnosti o 32 bajtů.

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

Každá adresa použije každou hodnotu nonce pouze jednou, takže pro soubor se svědkem (witness) a výstupní adresář můžeme použít kombinaci `fromAddress` a `nonce` jako unikátní identifikátor.

```js
    try {
        await zkBank.write.processTransaction([
            proof, publicFields])
    } catch (err) {
        console.log(`Verification error: ${err}`)
        throw Error("Can't verify the transaction onchain")
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

Onchain kód musí sledovat dvě proměnné: ověřovatele (verifier, samostatný kontrakt, který je vytvořen pomocí `nargo`) a současný hash stavu.

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

Pokaždé, když dojde ke změně stavu, vygenerujeme událost `TransactionProcessed`.

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

Tato funkce zpracovává transakce. Obdrží důkaz (jako `bytes`) a veřejné vstupy (jako pole `bytes32`) ve formátu, který vyžaduje ověřovatel (pro minimalizaci onchain zpracování a tím pádem poplatků za gas).

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Wrong old state hash");
```

Důkaz s nulovou znalostí musí být o tom, že transakce provádí změnu našeho aktuálního hashe na nový.

```solidity
        myVerifier.verify(_proof, _publicFields);
```

Zavolejte ověřovatelský kontrakt k ověření důkazu s nulovou znalostí. V tomto kroku bude transakce zrušena (revertována), pokud je důkaz s nulovou znalostí nesprávný.

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

Pokud je vše v pořádku, aktualizujte hash stavu na novou hodnotu a vygenerujte událost `TransactionProcessed`.

## Zneužití centralizovanou komponentou {#abuses}

Bezpečnost informací sestává ze tří atributů:

- _Důvěrnost (Confidentiality)_, uživatelé nemohou číst informace, ke kterým nemají oprávnění.
- _Integrita (Integrity)_, informace nelze měnit s výjimkou autorizovaných uživatelů oprávněným způsobem.
- _Dostupnost (Availability)_, oprávnění uživatelé mohou systém používat.

V tomto systému je integrita zajištěna prostřednictvím důkazů s nulovou znalostí. Dostupnost je mnohem obtížnější zaručit a důvěrnost je nemožná, protože banka musí znát zůstatek každého účtu i všechny transakce. Neexistuje žádný způsob, jak zabránit subjektu, který má informace, aby je nesdílel s ostatními.

Možná by bylo možné vytvořit skutečně důvěrnou banku pomocí [skrytých adres (stealth addresses)](https://vitalik.eth.limo/general/2023/01/20/stealth.html), ale to přesahuje rámec tohoto článku.

### Falešné informace {#false-info}

Jedním ze způsobů, jak může server porušit integritu, je poskytování falešných informací, když [jsou vyžadována data](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291).

Vyřešit to můžeme tak, že napíšeme druhý program v Noiru, který obdrží účty jako privátní vstup a adresu, pro niž jsou informace vyžadovány, jako veřejný vstup. Výstupem bude zůstatek a nonce příslušné adresy a k tomu hash účtů.

Tento důkaz samozřejmě nelze ověřovat onchain, jelikož hodnoty nonce a zůstatky na onchain síti zveřejňovat nechceme. Lze jej však ověřit klientským kódem spuštěným v prohlížeči.

### Nucené transakce {#forced-txns}

Obvyklým mechanismem pro zajištění dostupnosti a prevenci cenzury na L2 jsou [nucené transakce (forced transactions)](https://docs.optimism.io/stack/transactions/forced-transaction). Nucené transakce ale nejdou kombinovat s důkazy s nulovou znalostí. Server je tak jediným subjektem, který dokáže ověřovat transakce.

Kód `smart-contracts/src/ZkBank.sol` můžeme upravit, aby přijímal nucené transakce a bránil serveru ve změně stavu, dokud nebudou tyto transakce zpracovány. Otevírá nám to však cestu k jednoduchému útoku denial-of-service (odmítnutí služby). Co když je nucená transakce neplatná, a proto ji nelze zpracovat?

Řešením je disponovat důkazem s nulovou znalostí o tom, že nucená transakce je neplatná. Tím server získá tři možnosti:

- Zpracovat nucenou transakci a poskytnout důkaz s nulovou znalostí, že byla zpracována, spolu s novým hashem stavu.
- Odmítnout nucenou transakci a poskytnout kontraktu důkaz s nulovou znalostí, že transakce je neplatná (neznámá adresa, špatná nonce nebo nedostatečný zůstatek).
- Ignorovat nucenou transakci. Neexistuje žádný způsob, jak donutit server transakci reálně zpracovat, avšak znamená to, že celý systém je nedostupný.

#### Kauce na dostupnost {#avail-bonds}

V reálné implementaci by pravděpodobně existoval jakýsi motiv k zisku za účelem udržet server v chodu. Tento motiv můžeme podpořit tím, že by server musel vložit kauci na dostupnost (availability bond), kterou může kdokoliv spálit, pokud nedojde do určité doby ke zpracování nucené transakce.

### Špatný kód v Noiru {#bad-noir-code}

Normálně za účelem toho, aby lidé chytrému kontraktu věřili, nahráváme zdrojový kód do [prohlížeče bloků](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract). Avšak v případě důkazů s nulovou znalostí to nestačí.

Soubor `Verifier.sol` obsahuje ověřovací klíč, což je funkce Noir programu. Tento klíč nám však neříká, co tím Noir programem bylo. Abychom získali skutečně důvěryhodné řešení, musíte Noir program nahrát (spolu s verzí, která jej vytvořila). Jinak by důkazy s nulovou znalostí mohly odrážet odlišný program, takový, v němž se nachází zadní vrátka (backdoor).

Dokud prohlížeče bloků nezačnou umožňovat nahrávání a ověřování programů v Noiru, měli byste to udělat vy sami (nejlépe do [IPFS](/developers/tutorials/ipfs-decentralized-ui/)). Sofistikovaní uživatelé si pak budou moci stáhnout zdrojový kód, zkompilovat si ho, vytvořit `Verifier.sol` a ověřit, že je identický s tím, co je uloženo onchain.

## Závěr {#conclusion}

Aplikace typu Plasma vyžadují jako úložiště informací centralizovanou komponentu. Otevírá to prostor pro potenciální zranitelnosti, ale na oplátku nám to umožňuje zachovat soukromí způsobem, který není k dispozici na samotném blockchainu. Pomocí důkazů s nulovou znalostí dokážeme zajistit integritu a případně z ekonomického hlediska zvýhodnit pro kohokoliv, kdo provozuje centralizovanou komponentu, udržování dostupnosti.

[Více z mé práce najdete zde](https://cryptodocguy.pro/).

## Poděkování {#acknowledgements}

- Josh Crites četl návrh tohoto článku a pomohl mi s velmi ošemetným problémem týkajícím se Noiru.

Za veškeré zbývající chyby nesu plnou odpovědnost já.
