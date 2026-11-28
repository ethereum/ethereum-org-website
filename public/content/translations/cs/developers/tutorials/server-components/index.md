---
title: "Serverové komponenty a agenti pro web3 aplikace"
description: "Po přečtení tohoto tutoriálu budete schopni psát TypeScript servery, které naslouchají událostem na blockchainu a odpovídajícím způsobem reagují vlastními transakcemi. To vám umožní psát centralizované aplikace (protože server představuje bod selhání), které ale mohou komunikovat s web3 entitami. Stejné techniky lze také použít k napsání agenta, který reaguje na onchain události bez zásahu člověka."

author: Ori Pomerantz
lang: cs
tags: ["agent", "server", "offchain", "dapps"]
skill: beginner
breadcrumb: "Serverové komponenty"
published: 2024-07-15
---

## Úvod {#introduction}

Ve většině případů používá decentralizovaná aplikace server k distribuci softwaru, ale veškerá skutečná interakce probíhá mezi klientem (typicky webovým prohlížečem) a blockchainem.

![Normal interaction between web server, client, and blockchain](./fig-1.svg)

Existují však případy, kdy by pro aplikaci bylo přínosné mít serverovou komponentu, která běží nezávisle. Takový server by byl schopen reagovat na události a na požadavky z jiných zdrojů, jako je API, vydáváním transakcí.

![The interaction with the addition of a server](./fig-2.svg)

Existuje několik možných úkolů, které by takový server mohl plnit.

- Držitel tajného stavu. Ve hrách je často užitečné, aby hráči neměli k dispozici všechny informace, které hra zná. Nicméně _na blockchainu neexistují žádná tajemství_, jakoukoli informaci, která je na blockchainu, může kdokoli snadno zjistit. Proto, pokud má být část herního stavu utajena, musí být uložena jinde (a případně mohou být účinky tohoto stavu ověřeny pomocí [důkazů s nulovým vědomím](/zero-knowledge-proofs)).

- Centralizované orákulum. Pokud jsou sázky dostatečně nízké, externí server, který čte nějaké informace online a poté je odesílá do řetězce, může být dostatečně dobrý pro použití jako [orákulum](/developers/docs/oracles/).

- Agent. Na blockchainu se nic nestane bez transakce, která to aktivuje. Server může jednat jménem uživatele a provádět akce, jako je [arbitráž](/developers/docs/mev/#mev-examples-dex-arbitrage), když se naskytne příležitost.

## Ukázkový program {#sample-program}

Ukázkový server si můžete prohlédnout [na GitHubu](https://github.com/qbzzt/20240715-server-component). Tento server naslouchá událostem přicházejícím z [tohoto kontraktu](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract_code) na testnetu Sepolia, což je upravená verze Greeteru z Hardhat. Když se pozdrav změní, změní ho zpět.

Tento kontrakt je sdílen s dalšími tutoriály, takže ostatní lidé (a jejich servery) mohou změnit pozdrav, zatímco váš běží. Až skončíte, zastavte svůj server, abyste neutratili své testovací ETH.

Pro jeho spuštění:

1. Naklonujte repozitář.

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. Ukázkový repozitář byl napsán pro testnet Holesky, který byl od té doby ukončen. Aktualizujte jej, aby používal síť Sepolia a adresu kontraktu na Sepolia.

   ```sh copy
   sed -i.bak -e 's/holesky/sepolia/g' -e 's/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA/' src/app.ts
   ```

3. Nainstalujte potřebné balíčky. Pokud jej ještě nemáte, [nainstalujte nejprve Node.js](https://nodejs.org/en/download/package-manager).

   ```sh copy
   npm install
   ```

4. Upravte `.env` a zadejte soukromý klíč účtu, který má ETH na testnetu Sepolia. Pokud nemáte ETH na síti Sepolia, můžete [použít tento faucet](https://sepolia-faucet.pk910.de/). Použijte nový účet, který používáte pouze pro testování, nikdy ne ten, který drží skutečná aktiva.

   ```sh filename=".env" copy
   PRIVATE_KEY=0x<private key goes here>
   ```

5. Spusťte server.

   ```sh copy
   npm start
   ```

6. Přejděte do [prohlížeče bloků](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=write_contract) a pomocí jiné adresy, než je ta, ke které máte soukromý klíč, upravte pozdrav. Uvidíte, že se pozdrav automaticky změní zpět.

### Jak to funguje? {#how-it-works}

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

Toto jsou entity [Viem](https://viem.sh/), které potřebujeme, funkce a [typ `Address`](https://viem.sh/docs/glossary/types#address). Tento server je napsán v jazyce [TypeScript](https://www.typescriptlang.org/), což je rozšíření JavaScriptu, které jej činí [silně typovaným](https://en.wikipedia.org/wiki/Strong_and_weak_typing).

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[Tato funkce](https://viem.sh/docs/accounts/privateKey) nám umožňuje vygenerovat informace o peněžence, včetně adresy, odpovídající soukromému klíči.

```typescript
import { sepolia } from "viem/chains"
```

Chcete-li ve Viem používat blockchain, musíte importovat jeho definici. V tomto případě se chceme připojit k testovacímu blockchainu [Sepolia](/developers/docs/networks/#sepolia).

```typescript
// Takto přidáváme definice z .env do process.env.
import * as dotenv from "dotenv"
dotenv.config()
```

Tímto způsobem načteme `.env` do prostředí. Potřebujeme to pro soukromý klíč (viz dále).

```typescript
const greeterAddress : Address = "0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA"
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

K použití kontraktu potřebujeme jeho adresu a [ABI](/glossary/#abi). Obojí poskytujeme zde.

V JavaScriptu (a tedy i v TypeScriptu) nemůžete konstantě přiřadit novou hodnotu, ale _můžete_ upravit objekt, který je v ní uložen. Použitím přípony `as const` říkáme TypeScriptu, že samotný seznam je konstantní a nesmí být změněn.

```typescript
const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
})
```

Vytvořte [veřejného klienta](https://viem.sh/docs/clients/public) Viem. Veřejní klienti nemají připojený soukromý klíč, a proto nemohou odesílat transakce. Mohou volat [funkce `view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm), číst zůstatky na účtech atd.

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

Proměnné prostředí jsou dostupné v [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env). TypeScript je však silně typovaný. Proměnná prostředí může být jakýkoli řetězec nebo může být prázdná, takže typ pro proměnnou prostředí je `string | undefined`. Klíč je však ve Viem definován jako `0x${string}` (`0x` následované řetězcem). Zde říkáme TypeScriptu, že proměnná prostředí `PRIVATE_KEY` bude tohoto typu. Pokud není, dostaneme chybu za běhu (runtime error).

Funkce [`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) pak používá tento soukromý klíč k vytvoření úplného objektu účtu.

```typescript
const walletClient = createWalletClient({
  account,
  chain: sepolia,
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

Nyní, když máme všechny nezbytnosti, můžeme konečně vytvořit [instanci kontraktu](https://viem.sh/docs/contract/getContract). Tuto instanci kontraktu použijeme ke komunikaci s onchain kontraktem.

##### Čtení z blockchainu

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

Funkce kontraktu, které jsou pouze pro čtení ([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) a [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)), jsou dostupné pod `read`. V tomto případě to použijeme pro přístup k funkci [`greet`](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=read_contract), která vrací pozdrav.

JavaScript je jednovláknový, takže když spustíme dlouho běžící proces, musíme [specifikovat, že to děláme asynchronně](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE). Volání blockchainu, a to i pro operaci pouze pro čtení, vyžaduje obousměrnou komunikaci mezi počítačem a uzlem blockchainu. To je důvod, proč zde specifikujeme, že kód musí na výsledek počkat pomocí `await`.

Pokud vás zajímá, jak to funguje, můžete si o tom [přečíst zde](https://www.w3schools.com/js/js_promise.asp), ale z praktického hlediska vám stačí vědět, že pokud spustíte operaci, která trvá dlouho, použijete na výsledky `await`, a že každá funkce, která to dělá, musí být deklarována jako `async`.

##### Vydávání transakcí

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

Toto je funkce, kterou voláte k vydání transakce, jež změní pozdrav. Jelikož se jedná o dlouhou operaci, je funkce deklarována jako `async`. Kvůli vnitřní implementaci musí každá funkce `async` vracet objekt `Promise`. V tomto případě `Promise<any>` znamená, že nespecifikujeme, co přesně bude v `Promise` vráceno.

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

Pole `write` instance kontraktu obsahuje všechny funkce, které zapisují do stavu blockchainu (ty, které vyžadují odeslání transakce), jako je [`setGreeting`](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=write_contract). Parametry, pokud nějaké jsou, se poskytují jako seznam a funkce vrací hash transakce.

```typescript
    console.log(`Working on a fix, see https://eth-sepolia.blockscout.com/tx/${txHash}`)

    return txHash
}
```

Nahlaste hash transakce (jako součást URL do prohlížeče bloků pro její zobrazení) a vraťte jej.

##### Reakce na události

```typescript
greeter.watchEvent.SetGreeting({
```

[Funkce `watchEvent`](https://viem.sh/docs/actions/public/watchEvent) vám umožňuje specifikovat, že se má funkce spustit, když je emitována událost. Pokud vás zajímá pouze jeden typ události (v tomto případě `SetGreeting`), můžete použít tuto syntaxi, abyste se omezili pouze na tento typ události.

```typescript
    onLogs: logs => {
```

Funkce `onLogs` se volá, když existují záznamy v logu. V Ethereu jsou pojmy „log“ a „událost“ obvykle zaměnitelné.

```typescript
console.log(
  `Address ${logs[0].args.sender} changed the greeting to ${logs[0].args.greeting}`
)
```

Mohlo by existovat více událostí, ale pro jednoduchost nás zajímá pouze ta první. `logs[0].args` jsou argumenty události, v tomto případě `sender` a `greeting`.

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} insists on it being Hello!`)
    }
})
```

Pokud odesílatelem _není_ tento server, použijte `setGreeting` ke změně pozdravu.

#### `package.json` {#package-json}

[Tento soubor](https://github.com/qbzzt/20240715-server-component/blob/main/package.json) řídí konfiguraci [Node.js](https://nodejs.org/en). Tento článek vysvětluje pouze důležité definice.

```json
{
  "scripts": {
    "start": "tsc && node dist/app.js",
  },
```

Skripty představují různé akce aplikace. V tomto případě máme pouze `start`, který zkompiluje a poté spustí server. Příkaz `tsc` je součástí balíčku `typescript` a kompiluje TypeScript do JavaScriptu. Pokud jej chcete spustit ručně, nachází se v `node_modules/.bin`. Druhý příkaz spustí server.

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

Toto jsou balíčky, které jsou vyžadovány pouze pro vývoj. Zde potřebujeme `typescript` a protože jej používáme s Node.js, získáváme také typy pro proměnné a objekty node, jako je `process`. [Zápis `^<version>`](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004) znamená tuto verzi nebo vyšší verzi, která neobsahuje zpětně nekompatibilní změny (breaking changes). Více informací o významu čísel verzí najdete [zde](https://semver.org).

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

Toto jsou balíčky, které jsou vyžadovány za běhu, při spuštění `dist/app.js`.

## Závěr {#conclusion}

Centralizovaný server, který jsme zde vytvořili, plní svůj úkol, kterým je fungovat jako agent pro uživatele. Kdokoli další, kdo chce, aby dapp nadále fungovala, a je ochoten utratit gas, může spustit novou instanci serveru s vlastní adresou.

To však funguje pouze tehdy, když lze akce centralizovaného serveru snadno ověřit. Pokud má centralizovaný server nějaké tajné informace o stavu nebo provádí složité výpočty, jedná se o centralizovanou entitu, které musíte při používání aplikace důvěřovat, což je přesně to, čemu se blockchainy snaží vyhnout. V budoucím článku plánuji ukázat, jak tento problém obejít pomocí [důkazů s nulovým vědomím](/zero-knowledge-proofs).

[Zde najdete více z mé práce](https://cryptodocguy.pro/).
