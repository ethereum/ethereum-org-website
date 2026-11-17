---
title: "Jak vyvíjet a testovat dapp na lokálním testnetu s více klienty"
description: "Tento průvodce vás nejprve provede vytvořením a konfigurací lokálního testnetu Etherea s více klienty a následně jeho použitím k nasazení a testování dapp."
author: "Tedi Mitiku"
tags:
  [
    "klienti",
    "uzly",
    "chytré kontrakty",
    "komponovatelnost",
    "vrstva konsensu",
    "exekuční vrstva",
    "testování",
  ]
skill: intermediate
breadcrumb: "Testnet s více klienty"
lang: cs
published: 2023-04-11
---

## Úvod {#introduction}

Tento průvodce vás provede procesem vytvoření konfigurovatelného lokálního testnetu Etherea, nasazení chytrého kontraktu do něj a použitím testnetu ke spouštění testů vaší decentralizované aplikace (dapp). Tento průvodce je určen pro vývojáře dapp, kteří chtějí vyvíjet a testovat své dapp lokálně v různých konfiguracích sítě před nasazením na živý testnet nebo Mainnet.

V tomto průvodci budete:

- Vytvářet lokální testnet Etherea pomocí [`ethereum-package`](https://github.com/ethpandaops/ethereum-package) s využitím nástroje [Kurtosis](https://www.kurtosis.com/),
- Připojovat své vývojové prostředí Hardhat pro dapp k lokálnímu testnetu za účelem kompilace, nasazení a testování dapp, a
- Konfigurovat lokální testnet, včetně parametrů jako je počet uzlů a specifické párování klientů exekuční vrstvy (EL) a vrstvy konsensu (CL), abyste umožnili vývojové a testovací procesy v různých konfiguracích sítě.

### Co je Kurtosis? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) je komponovatelný sestavovací systém navržený pro konfiguraci testovacích prostředí s více kontejnery. Konkrétně umožňuje vývojářům vytvářet reprodukovatelná prostředí, která vyžadují dynamickou logiku nastavení, jako jsou testnety blockchainu.

V tomto průvodci balíček Kurtosis `ethereum-package`, spravovaný týmem [ethPandaOps](https://ethpandaops.io/), spouští lokální testnet Etherea. Podporuje všechny hlavní klienty exekuční vrstvy (EL), jako je [`geth`](https://geth.ethereum.org/), a klienty vrstvy konsensu (CL), jako jsou [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/) a [`lodestar`](https://lodestar.chainsafe.io/). Tento balíček slouží jako konfigurovatelná a komponovatelná alternativa k sítím v frameworcích jako Hardhat Network a Anvil. Kurtosis nabízí vývojářům větší kontrolu a flexibilitu nad testnety, které používají, což je hlavní důvod, proč jej týmy klientů Etherea používají k testování aktualizací sítě.

## Nastavení Kurtosis {#setting-up-kurtosis}

Než budete pokračovat, ujistěte se, že máte:

- [Nainstalovaný a spuštěný Docker engine](https://docs.kurtosis.com/install/#i-install--start-docker) na vašem lokálním počítači
- [Nainstalované rozhraní příkazové řádky (CLI) Kurtosis](https://docs.kurtosis.com/install#ii-install-the-cli) (nebo aktualizované na nejnovější verzi, pokud již máte CLI nainstalované)
- Nainstalovaný [Node.js](https://nodejs.org/en) (pro vaše prostředí dapp)

## Vytvoření lokálního testnetu Etherea {#instantiate-testnet}

Chcete-li spustit lokální testnet Etherea, spusťte:

```sh
kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package
```

Poznámka: Tento příkaz pojmenuje vaši síť „local-eth-testnet“ pomocí příznaku `--enclave`.

Kurtosis vypíše kroky, které interně provádí při interpretaci, validaci a následném provádění instrukcí. Na konci vypíše shrnutí enklávy, kterou vytvořil. Shrnutí obsahuje seznam **souborových artefaktů** a seznam **uživatelských služeb**. Ve výchozí konfiguraci uživatelské služby zahrnují jeden uzel:

- `el-1-geth-lighthouse`, exekuční klient `geth`
- `cl-1-lighthouse-geth`, uzel Beacon `lighthouse`
- `vc-1-geth-lighthouse`, klient validátoru `lighthouse`

Každá služba je uvedena s porty, které vystavuje, a lokálním portem, na který je každý z nich namapován. Například port `rpc` služby `el-1-geth-lighthouse` je koncový bod JSON-RPC, který budou používat vaše nástroje pro dapp. Přesné služby a čísla portů se budou na vašem počítači lišit.

Toto shrnutí si můžete kdykoli znovu zobrazit spuštěním:

```sh
kurtosis enclave inspect local-eth-testnet
```

Gratulujeme! Použili jste Kurtosis k vytvoření lokálního testnetu Etherea s klientem CL (`lighthouse`) a EL (`geth`) přes Docker.

### Shrnutí {#review-instantiate-testnet}

V této části jste spustili příkaz, který nařídil nástroji Kurtosis použít balíček [`ethereum-package` hostovaný vzdáleně na GitHubu](https://github.com/ethpandaops/ethereum-package) ke spuštění lokálního testnetu Etherea v rámci [enklávy](https://docs.kurtosis.com/advanced-concepts/enclaves/) Kurtosis. Uvnitř vaší enklávy najdete jak „souborové artefakty“, tak „uživatelské služby“.

[Souborové artefakty](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) ve vaší enklávě zahrnují všechna data vygenerovaná a využitá k inicializaci klientů EL a CL, jako jsou soubory genesis a klíče validátorů. Data genesis byla vytvořena pomocí nástroje [ethereum-genesis-generator](https://github.com/ethpandaops/ethereum-genesis-generator).

Uživatelské služby zobrazují všechny kontejnerizované služby fungující ve vaší enklávě. Všimnete si, že byl vytvořen jeden uzel, který obsahuje jak klienta EL, tak klienta CL.

## Připojení vývojového prostředí dapp k lokálnímu testnetu Etherea {#connect-your-dapp}

### Nastavení vývojového prostředí dapp {#set-up-dapp-env}

Nyní, když máte spuštěný lokální testnet, můžete připojit své vývojové prostředí dapp, aby tento lokální testnet využívalo. V tomto průvodci bude použit framework Hardhat k nasazení dapp pro blackjack na váš lokální testnet.

Chcete-li nastavit své vývojové prostředí dapp, naklonujte repozitář, který obsahuje naši ukázkovou dapp, a nainstalujte její závislosti spuštěním:

```sh
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git
cd awesome-kurtosis/smart-contract-example
npm install --legacy-peer-deps
```

Příznak `--legacy-peer-deps` je nutný, protože některé pluginy Hardhat v ukázkovém projektu deklarují konfliktní verze peer závislostí.

Zde použitá složka [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) obsahuje typické nastavení pro vývojáře dapp používajícího framework [Hardhat](https://hardhat.org/):

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) obsahuje několik jednoduchých chytrých kontraktů pro dapp blackjacku
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) obsahuje skript pro nasazení kontraktu tokenu do vaší lokální sítě Etherea
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) obsahuje jednoduchý .js test pro váš kontrakt tokenu, který potvrzuje, že každý hráč v naší dapp pro blackjack má pro sebe vyraženo 1000 tokenů
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) konfiguruje vaše nastavení Hardhat

### Konfigurace Hardhat pro použití lokálního testnetu {#configure-hardhat}

S nastaveným vývojovým prostředím dapp nyní připojíte Hardhat, aby používal lokální testnet Etherea vygenerovaný pomocí Kurtosis. Nejprve najděte lokální adresu koncového bodu JSON-RPC exekučního klienta:

```sh
kurtosis port print local-eth-testnet el-1-geth-lighthouse rpc
```

Výstupem je URL adresa, například `http://127.0.0.1:32769`. Váš port se bude lišit. Nahraďte `<PORT>` ve struktuře `localnet` ve vašem konfiguračním souboru `hardhat.config.ts` tímto portem.

Příklad v `hardhat.config.ts`:

```js
localnet: {
  url: 'http://127.0.0.1:<PORT>',//TODO: NAHRAĎTE <PORT> PORTEM URI UZLU VYTVOŘENÉHO BALÍČKEM KURTOSIS PRO SÍŤ ETH
  // Toto jsou soukromé klíče přidružené k předplaceným testovacím účtům vytvořeným balíčkem eth-network-package
  //https://github.com/ethpandaops/ethereum-package/blob/main/src/prelaunch_data_generator/genesis_constants/genesis_constants.star
  accounts: [
    "bcdf20249abf0ed6d944c0288fad489e33f66b3960d9e6229c1cd214ed3bbe31",
    "53321db7c1e331d93a11a41d16f004d7ff63972ec8ec7c25db329728ceeb1710",
    "ab63b23eb7941c1251757e24b3d2350d2bc05c3c388d06f8fe6feafefb1e8c70",
    "5d2344259f42259f82d2c140aa66102ba89b57b4883ee441a8b312622bd42491",
    "27515f805127bebad2fb9b183508bdacb8c763da16f54e0678b16e8f28ef3fff",
    "7ff1a4c1d57e5e784d327c4c7651e952350bc271f156afb3d00d20f5ef924856",
  ],
},
```

Tyto soukromé klíče jsou veřejně známé testovací klíče. Nikdy je nepoužívejte na Mainnetu ani v žádné veřejné síti.

Jakmile soubor uložíte, vaše vývojové prostředí Hardhat pro dapp je nyní připojeno k vašemu lokálnímu testnetu Etherea! Funkčnost testnetu můžete ověřit spuštěním:

```sh
npx hardhat balances --network localnet
```

Výstup obsahuje adresu a zůstatek každého z výše uvedených účtů. Například první řádek by měl vypadat takto:

```
0x8943545177806ED17B9F23F0a21ee5948eCaa776 has balance <a large balance>
```

To potvrzuje, že Hardhat používá váš lokální testnet a detekuje předem financované účty vytvořené balíčkem `ethereum-package`.

### Lokální nasazení a testování vaší dapp {#deploy-and-test-dapp}

S vývojovým prostředím dapp plně připojeným k lokálnímu testnetu Etherea nyní můžete spouštět vývojové a testovací procesy pro vaši dapp pomocí lokálního testnetu.

Chcete-li zkompilovat a nasadit chytrý kontrakt `ChipToken.sol` pro lokální prototypování a vývoj, spusťte:

```sh
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

Výstup by měl vypadat nějak takto:

```
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

Nyní zkuste spustit test `ChipToken.js` proti vaší lokální dapp, abyste potvrdili, že každý hráč v naší dapp pro blackjack má pro sebe vyraženo 1000 tokenů. Ukázkový test stále používá funkci `deployed()` z ethers v5, kterou ethers v6 nahradil funkcí `waitForDeployment()`, takže ji nejprve aktualizujte:

```sh
sed -i.bak 's/\.deployed()/.waitForDeployment()/' test/ChipToken.js
```

Poté spusťte test:

```sh
npx hardhat test --network localnet
```

Výstup by měl vypadat nějak takto:

```
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### Shrnutí {#review-dapp-workflows}

V tuto chvíli jste nastavili vývojové prostředí dapp, připojili jej k lokální síti Etherea vytvořené pomocí Kurtosis a zkompilovali, nasadili a spustili jednoduchý test proti vaší dapp.

Nyní se podívejme, jak můžete konfigurovat podkladovou síť pro testování našich dapp v různých konfiguracích sítě.

## Konfigurace lokálního testnetu Etherea {#configure-testnet}

### Změna konfigurací klientů a počtu uzlů {#configure-client-config-and-num-nodes}

Váš lokální testnet Etherea lze nakonfigurovat tak, aby používal různé páry klientů EL a CL, stejně jako různý počet uzlů, v závislosti na scénáři a konkrétní konfiguraci sítě, kterou chcete vyvíjet nebo testovat. To znamená, že po nastavení můžete spustit přizpůsobený lokální testnet a použít jej ke spuštění stejných procesů (nasazení, testy atd.) v různých konfiguracích sítě, abyste se ujistili, že vše funguje podle očekávání. Chcete-li se dozvědět více o dalších parametrech, které můžete upravit, podívejte se do [dokumentace ke konfiguraci balíčku `ethereum-package`](https://github.com/ethpandaops/ethereum-package#configuration).

Vyzkoušejte to! Balíčku `ethereum-package` můžete předat různé možnosti konfigurace prostřednictvím souboru YAML. Tento soubor s parametry sítě poskytuje specifické konfigurace, které Kurtosis použije k nastavení lokální sítě Etherea.

Vytvořte soubor s názvem `network_params.yaml`, který spustí tři uzly s různými páry EL/CL:

- Uzel 1 s `geth`/`lighthouse`
- Uzel 2 s `geth`/`lodestar`
- Uzel 3 s `geth`/`teku`

Tato konfigurace vytvoří heterogenní síť implementací uzlů Etherea pro testování vaší dapp. Váš konfigurační soubor by měl vypadat takto:

```yaml
participants:
  - el_type: geth
    cl_type: lighthouse
  - el_type: geth
    cl_type: lodestar
  - el_type: geth
    cl_type: teku
network_params:
  seconds_per_slot: 12
```

Každý záznam v `participants` se mapuje na uzel v síti, takže 3 záznamy `participants` řeknou nástroji Kurtosis, aby ve vaší síti spustil 3 uzly. Každý záznam vám umožňuje specifikovat pár EL a CL použitý pro daný konkrétní uzel. Všechny parametry, které nespecifikujete, si zachovají své výchozí hodnoty.

Struktura `network_params` konfiguruje nastavení sítě, která se používají k vytvoření souborů genesis pro každý uzel, a také další nastavení, jako jsou sekundy na slot sítě.

Uložte svůj soubor s parametry a poté jej použijte ke spuštění balíčku Kurtosis spuštěním:

```sh
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package --args-file ./network_params.yaml
```

Poznámka: příkaz `kurtosis clean -a` se zde používá k tomu, aby dal nástroji Kurtosis pokyn zničit starý testnet a jeho obsah před spuštěním nového.

Kurtosis bude opět chvíli pracovat a vypisovat jednotlivé kroky, které probíhají. Nakonec vypíše shrnutí enklávy. Tentokrát uživatelské služby zahrnují tři uzly, například `el-1-geth-lighthouse`, `el-2-geth-lodestar` a `el-3-geth-teku` pro exekuční klienty, spolu s odpovídajícími klienty konsensu a validátorů.

Gratulujeme! Úspěšně jste nakonfigurovali svůj lokální testnet tak, aby měl 3 uzly místo 1. Chcete-li spustit stejné procesy jako dříve proti vaší dapp (nasazení a testování), proveďte stejné operace jako dříve tím, že nahradíte `<PORT>` ve struktuře `localnet` ve vašem konfiguračním souboru `hardhat.config.ts` portem `rpc` jakékoli služby `el-<num>-...` ve vašem novém lokálním testnetu se 3 uzly.

## Závěr {#conclusion}

A to je vše! Abychom shrnuli tohoto krátkého průvodce, vy jste:

- Vytvořili lokální testnet Etherea přes Docker pomocí Kurtosis
- Připojili své lokální vývojové prostředí dapp k lokální síti Etherea
- Nasadili dapp a spustili proti ní jednoduchý test v lokální síti Etherea
- Nakonfigurovali podkladovou síť Etherea tak, aby měla 3 uzly

Rádi od vás uslyšíme, co se vám povedlo, co by se dalo zlepšit, nebo zodpovíme jakékoli vaše dotazy. Neváhejte se na nás obrátit přes [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose)!

### Další příklady a průvodci {#other-examples-guides}

Doporučujeme vám podívat se na náš [rychlý start](https://docs.kurtosis.com/quickstart) a naše další příklady v našem [repozitáři awesome-kurtosis](https://github.com/kurtosis-tech/awesome-kurtosis).

Balíček `ethereum-package` může také spustit další služby vedle vaší sítě, jako je spammer transakcí (pro simulaci transakcí), prohlížeč bloků a připojené instance Grafana a Prometheus. Chcete-li je povolit, uveďte je pod `additional_services` ve vašem souboru s parametry, jak je popsáno v [dokumentaci k balíčku](https://github.com/ethpandaops/ethereum-package#configuration).
