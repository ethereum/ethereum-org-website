---
title: "Serverové komponenty a agenti pro web3 aplikace"
description: "Po přečtení tohoto tutoriálu budete schopni psát TypeScript servery, které naslouchají událostem na blockchainu a odpovídajícím způsobem reagují vlastními transakcemi. To vám umožní psát centralizované aplikace (protože server je bodem selhání), které ale mohou interagovat s web3 entitami. Stejné techniky lze také použít k napsání agenta, který reaguje na události na blockchainu bez zásahu člověka."

author: Ori Pomerantz
lang: cs
tags: [ "agent", "server", "offchain" ]
skill: beginner
published: 2024-07-15
---

## Úvod {#introduction}

Ve většině případů decentralizovaná aplikace používá server k distribuci softwaru, ale veškerá skutečná interakce probíhá mezi klientem (obvykle webovým prohlížečem) a blockchainem.

![Normální interakce mezi webovým serverem, klientem a blockchainem](./fig-1.svg)

Existují však případy, kdy by aplikaci prospěla serverová komponenta, která běží nezávisle. Takový server by byl schopen reagovat na události a na požadavky, které přicházejí z jiných zdrojů, jako je API, vydáváním transakcí.

![Interakce s přidaným serverem](./fig-2.svg)

Existuje několik možných úkolů, které by takový server mohl plnit.

- Držitel tajného stavu. Při hraní je často užitečné, aby hráči neměli k dispozici všechny informace, které hra zná. Nicméně, _na blockchainu neexistují žádná tajemství_, jakoukoli informaci, která je v blockchainu, může kdokoli snadno zjistit. Proto, pokud má být část stavu hry utajena, musí být uložena jinde (a případně nechat účinky tohoto stavu ověřit pomocí [důkazů s nulovou znalostí](/zero-knowledge-proofs)).

- Centralizované orákulum. Pokud jsou sázky dostatečně nízké, externí server, který čte některé informace online a poté je zveřejňuje na řetězci, může být dostatečně dobrý na to, aby byl použit jako [orákulum](/developers/docs/oracles/).

- Agent. Na blockchainu se nic nestane bez transakce, která by to aktivovala. Server může jednat jménem uživatele a provádět akce, jako je [arbitráž](/developers/docs/mev/#mev-examples-dex-arbitrage), když se naskytne příležitost.

## Ukázkový program {#sample-program}

Ukázkový server si můžete prohlédnout [na GitHubu](https://github.com/qbzzt/20240715-server-component). Tento server naslouchá událostem pocházejícím z [tohoto kontraktu](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code), upravené verze Hardhat Greeteru. Když se pozdrav změní, změní ho zpět.

Spustíte ho takto:

1. Naklonujte repozitář.

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. Nainstalujte potřebné balíčky. Pokud jej ještě nemáte, [nainstalujte nejprve Node](https://nodejs.org/en/download/package-manager).

   ```sh copy
   npm install
   ```

3. Upravte soubor `.env` a zadejte soukromý klíč účtu, který má ETH na testnetu Holesky. Pokud nemáte ETH na Holesky, můžete [použít tento faucet](https://holesky-faucet.pk910.de/).

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <zde vložte soukromý klíč>
   ```

4. Spusťte server.

   ```sh copy
   npm start
   ```

5. Přejděte do [prohlížeče bloků](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract) a pomocí jiné adresy, než je ta, ke které máte soukromý klíč, upravte pozdrav. Uvidíte, že pozdrav je automaticky změněn zpět.

### Jak to funguje? Jak to funguje {#how-it-works}

Nejjednodušší způsob, jak pochopit, jak napsat serverovou komponentu, je projít si ukázku řádek po řádku.

#### `src/app.ts` {#src-app-ts}

Drtivá většina programu je obsažena v [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts).

##### Vytvoření nezbytných objektů

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

Toto jsou entity [Viem](https://viem.sh/), které potřebujeme, funkce a [typ `Address`](https://viem.sh/docs/glossary/types#address). Tento server je napsán v [TypeScriptu](https://www.typescriptlang.org/), což je rozšíření JavaScriptu, které ho činí [silně typovaným](https://en.wikipedia.org/wiki/Strong_and_weak_typing).

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[Tato funkce](https://viem.sh/docs/accounts/privateKey) nám umožňuje generovat informace o peněžence, včetně adresy, odpovídající soukromému klíči.

```typescript
import { holesky } from "viem/chains"
```

Abyste mohli v Viem používat blockchain, musíte importovat jeho definici. V tomto případě se chceme připojit k testovacímu blockchainu [Holesky](https://github.com/eth-clients/holesky).

```typescript
// Takto přidáváme definice z .env do process.env.
import * as dotenv from "dotenv"
dotenv.config()
```

Takto načítáme `.env` do prostředí. Potřebujeme to pro soukromý klíč (viz dále).

```typescript
const greeterAddress : Address = "0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6"
const greeterABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
         .
         .
         .
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "name": "setGreeting",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const
```

Pro použití kontraktu potřebujeme jeho adresu a [ABI](/glossary/#abi). Obojí zde uvádíme.

V JavaScriptu (a tedy i v TypeScriptu) nemůžete konstantě přiřadit novou hodnotu, ale _můžete_ upravit objekt, který je v ní uložen. Použitím přípony `as const` říkáme TypeScriptu, že seznam samotný je konstantní a nesmí být změněn.

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

Vytvořte Viem [veřejného klienta](https://viem.sh/docs/clients/public.html). Veřejní klienti nemají připojený soukromý klíč, a proto nemohou odesílat transakce. Mohou volat [`view` funkce](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm), číst zůstatky na účtech atd.

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`) 
```

Proměnné prostředí jsou k dispozici v [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env). TypeScript je však silně typovaný. Proměnná prostředí může být jakýkoli řetězec, nebo prázdná, takže typem pro proměnnou prostředí je `string | undefined`. Klíč je však v Viem definován jako `0x${string}` (`0x` následované řetězcem). Zde říkáme TypeScriptu, že proměnná prostředí `PRIVATE_KEY` bude tohoto typu. Pokud ne, dojde k chybě za běhu.

Funkce [`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) pak použije tento soukromý klíč k vytvoření úplného objektu účtu.

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

Dále použijeme objekt účtu k vytvoření [klienta peněženky](https://viem.sh/docs/clients/wallet). Tento klient má soukromý klíč a adresu, takže jej lze použít k odesílání transakcí.

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

Nyní, když máme všechny předpoklady, můžeme konečně vytvořit [instanci kontraktu](https://viem.sh/docs/contract/getContract). Tuto instanci kontraktu použijeme ke komunikaci s on-chain kontraktem.

##### Čtení z blockchainu

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

Funkce kontraktu, které jsou pouze pro čtení ([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) a [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)), jsou dostupné pod `read`. V tomto případě ji používáme pro přístup k funkci [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217), která vrací pozdrav.

JavaScript je jednovláknový, takže když spouštíme dlouhotrvající proces, musíme [specifikovat, že to děláme asynchronně](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE). Volání blockchainu, i pro operaci pouze pro čtení, vyžaduje obousměrnou komunikaci mezi počítačem a uzlem blockchainu. To je důvod, proč zde specifikujeme, že kód musí na výsledek `await` (počkat).

Pokud vás zajímá, jak to funguje, můžete si [o tom přečíst zde](https://www.w3schools.com/js/js_promise.asp), ale v praxi vše, co potřebujete vědět, je, že `await` (čekáte na) výsledky, pokud spustíte operaci, která trvá dlouho, a že jakákoli funkce, která to dělá, musí být deklarována jako `async`.

##### Vydávání transakcí

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

Toto je funkce, kterou voláte pro vydání transakce, která mění pozdrav. Jelikož se jedná o dlouhou operaci, funkce je deklarována jako `async`. Kvůli interní implementaci musí každá `async` funkce vracet objekt `Promise`. V tomto případě `Promise<any>` znamená, že nespecifikujeme, co přesně bude v `Promise` vráceno.

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

Pole `write` instance kontraktu obsahuje všechny funkce, které zapisují do stavu blockchainu (ty, které vyžadují odeslání transakce), jako je [`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862). Parametry, pokud nějaké jsou, jsou poskytnuty jako seznam a funkce vrací haš transakce.

```typescript
    console.log(`Working on a fix, see https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

Nahlaste haš transakce (jako součást adresy URL do prohlížeče bloků pro její zobrazení) a vraťte jej.

##### Reakce na události

```typescript
greeter.watchEvent.SetGreeting({
```

[Funkce `watchEvent`](https://viem.sh/docs/actions/public/watchEvent) umožňuje specifikovat, že se má funkce spustit, když je emitována událost. Pokud vás zajímá pouze jeden typ události (v tomto případě `SetGreeting`), můžete použít tuto syntaxi k omezení se na tento typ události.

```typescript
    onLogs: logs => {
```

Funkce `onLogs` je volána, když existují záznamy protokolu (logy). V Ethereu jsou pojmy „log“ a „událost“ obvykle zaměnitelné.

```typescript
console.log(
  `Adresa ${logs[0].args.sender} změnila pozdrav na ${logs[0].args.greeting}`
)
```

Mohlo by zde být více událostí, ale pro jednoduchost nás zajímá pouze ta první. `logs[0].args` jsou argumenty události, v tomto případě `sender` a `greeting`.

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} trvá na tom, aby to bylo Hello!`)
    }
})
```

Pokud odesílatel _není_ tento server, použijte `setGreeting` ke změně pozdravu.

#### `package.json` {#package-json}

[Tento soubor](https://github.com/qbzzt/20240715-server-component/blob/main/package.json) řídí konfiguraci [Node.js](https://nodejs.org/en). Tento článek vysvětluje pouze důležité definice.

```json
{
  "main": "dist/index.js",
```

Tato definice určuje, který soubor JavaScriptu se má spustit.

```json
  "scripts": {
    "start": "tsc && node dist/app.js",
  },
```

Skripty jsou různé akce aplikace. V tomto případě máme pouze jeden, `start`, který kompiluje a poté spouští server. Příkaz `tsc` je součástí balíčku `typescript` a kompiluje TypeScript do JavaScriptu. Pokud jej chcete spustit ručně, nachází se v `node_modules/.bin`. Druhý příkaz spouští server.

```json
  "type": "module",
```

Existuje více typů JavaScriptových node aplikací. Typ `module` nám umožňuje mít `await` v kódu nejvyšší úrovně, což je důležité, když provádíte pomalé (a tedy asynchronní) operace.

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

Toto jsou balíčky, které jsou vyžadovány pouze pro vývoj. Zde potřebujeme `typescript` a protože ho používáme s Node.js, získáváme také typy pro node proměnné a objekty, jako je `process`. [Zápis `^<verze>`](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004) znamená danou verzi nebo vyšší verzi, která neobsahuje zásadní změny. Více informací o významu čísel verzí naleznete [zde](https://semver.org).

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

Toto jsou balíčky, které jsou vyžadovány za běhu, při spouštění `dist/app.js`.

## Závěr {#conclusion}

Centralizovaný server, který jsme zde vytvořili, plní svůj úkol, kterým je jednat jako agent pro uživatele. Kdokoli jiný, kdo chce, aby dapp nadále fungoval a je ochoten utratit palivo, může spustit novou instanci serveru s vlastní adresou.

To však funguje pouze tehdy, když lze akce centralizovaného serveru snadno ověřit. Pokud má centralizovaný server nějaké tajné stavové informace nebo provádí složité výpočty, je to centralizovaná entita, které musíte důvěřovat, abyste mohli aplikaci používat, což je přesně to, čemu se blockchainy snaží vyhnout. V budoucím článku plánuji ukázat, jak tento problém obejít pomocí [důkazů s nulovou znalostí](/zero-knowledge-proofs).

[Více z mé práce najdete zde](https://cryptodocguy.pro/).
