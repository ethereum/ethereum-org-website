---
title: "Odesílání transakcí pomocí Viem"
description: "Toto je průvodce pro začátečníky, jak odesílat transakce na Ethereu pomocí knihovny Viem. K odeslání transakce na blockchain Etherea vedou tři hlavní kroky: vytvoření, podepsání a odeslání. Projdeme si všechny tři."
author: "Elan Halpern"
tags: ["transakce", "Viem", "Alchemy"]
skill: beginner
breadcrumb: "Odesílání transakcí"
lang: cs
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

Toto je průvodce pro začátečníky, jak odesílat transakce na Ethereu pomocí knihovny [Viem](https://viem.sh/). K odeslání transakce na blockchain Etherea vedou tři hlavní kroky: vytvoření, podepsání a odeslání. Projdeme si všechny tři a doufejme, že zodpovíme všechny vaše případné dotazy! V tomto tutoriálu budeme používat [Alchemy](https://www.alchemy.com/) k odesílání našich transakcí do řetězce Etherea. Zde si můžete [vytvořit bezplatný účet Alchemy](https://auth.alchemy.com/signup).

**POZNÁMKA:** Tento průvodce je určen pro podepisování vašich transakcí na _backendu_ vaší aplikace. Pokud chcete integrovat podepisování transakcí na frontendu, podívejte se na [API poskytovatele MetaMask](https://docs.metamask.io/wallet/reference/provider-api/).

## Základy {#the-basics}

Stejně jako většina blockchainových vývojářů ve svých začátcích jste si možná zjišťovali, jak odeslat transakci (což by mělo být docela jednoduché), a narazili jste na nepřeberné množství návodů, z nichž každý říkal něco jiného, což vás trochu zahltilo a zmátlo. Pokud jste na tom podobně, nebojte se; všichni jsme tam někdy byli! Než tedy začneme, ujasněme si několik věcí:

### 1\. Alchemy neukládá vaše soukromé klíče {#alchemy-does-not-store-your-private-keys}

- To znamená, že Alchemy nemůže podepisovat a odesílat transakce vaším jménem. Důvodem je bezpečnost. Alchemy vás nikdy nepožádá o sdílení vašeho soukromého klíče a vy byste nikdy neměli sdílet svůj soukromý klíč s hostovaným uzlem (ani s nikým jiným).
- Z blockchainu můžete číst pomocí základního API Alchemy, ale pro zápis do něj budete muset použít něco jiného k podepsání vašich transakcí před jejich odesláním přes Alchemy (to platí i pro jakoukoli jinou [službu uzlu](/developers/docs/nodes-and-clients/nodes-as-a-service/)).

### 2\. Co je to „signer“ (podepisovatel)? {#what-is-a-signer}

- Signeři za vás podepisují transakce pomocí vašeho soukromého klíče. V tomto tutoriálu budeme k podepsání naší transakce používat [Viem](https://viem.sh/), ale můžete použít i jakoukoli jinou knihovnu Web3.
- Na frontendu by byl dobrým příkladem signera [MetaMask](https://metamask.io/), který bude podepisovat a odesílat transakce vaším jménem.

### 3\. Proč musím podepisovat své transakce? {#why-do-i-need-to-sign-my-transactions}

- Každý uživatel, který chce odeslat transakci v síti Ethereum, musí transakci podepsat (pomocí svého soukromého klíče), aby se ověřilo, že původce transakce je skutečně ten, za koho se vydává.
- Je nesmírně důležité tento soukromý klíč chránit, protože přístup k němu poskytuje plnou kontrolu nad vaším účtem na Ethereu a umožňuje vám (nebo komukoli s přístupem) provádět transakce vaším jménem.

### 4\. Jak ochráním svůj soukromý klíč? {#how-do-i-protect-my-private-key}

- Existuje mnoho způsobů, jak chránit svůj soukromý klíč a používat jej k odesílání transakcí. V tomto tutoriálu budeme používat soubor `.env`. Můžete však také použít samostatného poskytovatele, který ukládá soukromé klíče, použít soubor úložiště klíčů (keystore) nebo jiné možnosti.

### 5\. Jaký je rozdíl mezi `eth_sendTransaction` a `eth_sendRawTransaction`? {#difference-between-send-and-send-raw}

`eth_sendTransaction` a `eth_sendRawTransaction` jsou obě funkce API Etherea, které odesílají transakci do sítě Etherea, aby byla přidána do budoucího bloku. Liší se v tom, jak zacházejí s podepisováním transakcí.

- [`eth_sendTransaction`](/developers/docs/apis/json-rpc/#eth-sendtransaction) se používá k odesílání _nepodepsaných_ transakcí, což znamená, že uzel, na který odesíláte, musí spravovat váš soukromý klíč, aby mohl transakci podepsat před jejím odesláním do řetězce. Vzhledem k tomu, že Alchemy neuchovává soukromé klíče uživatelů, tuto metodu nepodporuje.
- [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction) se používá k odesílání transakcí, které již byly podepsány. To znamená, že nejprve musíte transakci podepsat svým soukromým klíčem (ve Viem pomocí [`signTransaction`](https://viem.sh/docs/actions/wallet/signTransaction) s [místním účtem](https://viem.sh/docs/accounts/local/privateKeyToAccount)) a poté výsledek předat do `eth_sendRawTransaction`.

Při použití Viem se k `eth_sendRawTransaction` přistupuje voláním funkce [`sendRawTransaction`](https://viem.sh/docs/actions/wallet/sendRawTransaction).

To je to, co budeme používat v tomto tutoriálu.

### 6\. Co je to knihovna Web3? {#what-is-the-web3-library}

- Knihovna Web3 je obálka (wrapper) kolem standardních [volání JSON-RPC](/developers/docs/apis/json-rpc/), která se při vývoji na Ethereu používá poměrně běžně.
- Existuje mnoho knihoven Web3 pro různé jazyky. V tomto tutoriálu budeme používat [Viem](https://viem.sh/), který je napsán v TypeScriptu a funguje v jakémkoli projektu v JavaScriptu. Můžete se podívat na další možnosti [zde](/developers/docs/apis/javascript/), jako je například [Ethers.js](https://docs.ethers.org/v6/).

Dobře, teď, když máme několik z těchto otázek z krku, přejděme k tutoriálu. Neváhejte se kdykoli zeptat na [Discordu](https://discord.gg/gWuC7zB) Alchemy!

### 7\. Jak odesílat bezpečné, soukromé transakce s optimalizovaným gasem? {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy má sadu zdrojů pro transakce](https://www.alchemy.com/docs/sending-transactions). Můžete je použít k odesílání transakcí, simulaci transakcí před jejich provedením, odesílání soukromých transakcí a odesílání transakcí s optimalizovaným gasem.
- Můžete také použít [webhooky Alchemy](https://www.alchemy.com/docs/reference/webhooks-overview), abyste byli upozorněni, když je vaše transakce vytažena z mempoolu a přidána do řetězce.

**POZNÁMKA:** Tento průvodce vyžaduje účet Alchemy, adresu na Ethereu nebo peněženku MetaMask a nainstalované Node.js a npm. Pokud je nemáte, postupujte podle těchto kroků:

1.  [Vytvořte si bezplatný účet Alchemy](https://auth.alchemy.com/signup)
2.  [Vytvořte si účet MetaMask](https://metamask.io/) (nebo získejte adresu na Ethereu)
3.  [Nainstalujte Node.js a npm](https://nodejs.org/en/download/)
## Kroky k odeslání vaší transakce {#steps-to-sending-your-transaction}

### 1\. Vytvořte aplikaci Alchemy na testnetu Sepolia {#create-an-alchemy-app-on-the-sepolia-testnet}

Přejděte na svůj [řídicí panel Alchemy](https://dashboard.alchemy.com/) a vytvořte novou aplikaci, přičemž jako síť zvolte Sepolia (nebo jakýkoli jiný testnet).

### 2\. Vyžádejte si ETH z faucetu Sepolia {#request-eth-from-sepolia-faucet}

Postupujte podle pokynů na [faucetu Alchemy Sepolia](https://www.alchemy.com/faucets/ethereum-sepolia), abyste získali ETH, nebo použijte jeden z dalších [faucetů Sepolia](/developers/docs/networks/#sepolia). Faucety rozdávají malé částky (faucet Alchemy dává 0,1 ETH denně), což je pro tento tutoriál více než dost. Ujistěte se, že jste zadali svou adresu na Ethereu pro síť **Sepolia** (z MetaMasku) a ne pro jinou síť. Po provedení pokynů si dvakrát zkontrolujte, zda jste ETH do své peněženky obdrželi.

### 3\. Vytvořte nový adresář projektu a přejděte do něj pomocí `cd` {#create-a-new-project-direction}

Vytvořte nový adresář projektu z příkazového řádku (terminálu na Macu) a přejděte do něj:

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. Nainstalujte Viem (nebo jakoukoli knihovnu Web3) {#install-alchemy-web3}

Spusťte následující příkaz v adresáři vašeho projektu pro instalaci [Viem](https://viem.sh/):

Poznámka: Pokud byste chtěli použít knihovnu Ethers.js, [postupujte podle pokynů zde](https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```sh
npm init -y
npm install viem
```

### 5\. Nainstalujte dotenv {#install-dotenv}

K bezpečnému uložení našeho klíče API a soukromého klíče použijeme soubor `.env`.

```
npm install dotenv --save
```

### 6\. Vytvořte soubor `.env` {#create-the-dotenv-file}

Vytvořte soubor `.env` v adresáři vašeho projektu a přidejte následující (nahraďte „`your-api-url`“ a „`your-private-key`“)

- Chcete-li najít svou URL adresu API Alchemy, přejděte na stránku s podrobnostmi o aplikaci, kterou jste právě vytvořili na svém řídicím panelu, klikněte na „View Key“ v pravém horním rohu a zkopírujte HTTP URL.
- Chcete-li najít svůj soukromý klíč pomocí MetaMasku, podívejte se na tohoto [průvodce](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/). Použijte účet, který obsahuje pouze testnet ETH.

```sh
API_URL="your-api-url"
PRIVATE_KEY="your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Necommitujte <code>.env</code>! Ujistěte se, že svůj soubor <code>.env</code> nikdy s nikým nesdílíte ani ho nevystavujete, protože tím ohrožujete svá tajemství. Pokud používáte správu verzí, přidejte svůj <code>.env</code> do souboru <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

### 7\. Vytvořte soubor `sendTx.js` {#create-sendtx-js}

Skvělé, teď, když máme naše citlivá data chráněna v souboru `.env`, začněme programovat. Pro náš příklad odeslání transakce budeme posílat 0,001 ETH na jinou adresu, kterou ovládáte, například na druhý účet v MetaMasku.

Vytvořte soubor `sendTx.js`, ve kterém nakonfigurujeme a odešleme naši ukázkovou transakci, a přidejte do něj následující řádky kódu:

```js
require("dotenv").config({ quiet: true })
const { createPublicClient, createWalletClient, http, parseEther } = require("viem")
const { privateKeyToAccount } = require("viem/accounts")
const { sepolia } = require("viem/chains")

async function main() {
  const { API_URL, PRIVATE_KEY } = process.env
  const account = privateKeyToAccount(
    PRIVATE_KEY.startsWith("0x") ? PRIVATE_KEY : `0x${PRIVATE_KEY}`
  )
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(API_URL),
  })
  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(API_URL),
  })

  const nonce = await publicClient.getTransactionCount({
    address: account.address,
    blockTag: "pending",
  }) // nonce začíná počítat od 0

  const transaction = await walletClient.prepareTransactionRequest({
    to: "0xYourSecondAddress", // TODO: nahraďte adresou, na kterou chcete poslat ETH
    value: parseEther("0.001"), // 0.001 ETH
    gas: 21000n,
    nonce,
    // volitelné datové pole pro odeslání zprávy nebo spuštění chytrého kontraktu
  })

  const signedTx = await walletClient.signTransaction(transaction)

  try {
    const hash = await walletClient.sendRawTransaction({
      serializedTransaction: signedTx,
    })
    console.log("🎉 The hash of your transaction is:", hash)

    const receipt = await publicClient.waitForTransactionReceipt({ hash })
    console.log(`Transaction ${receipt.status} in block ${receipt.blockNumber}`)
  } catch (error) {
    console.log(
      "❗Something went wrong while submitting your transaction:",
      error.details ?? error.message
    )
  }
}

main()
```

Nezapomeňte nahradit `0xYourSecondAddress` adresou, na kterou chcete ETH odeslat. Skript odvodí vaši vlastní (odesílací) adresu z `PRIVATE_KEY`, takže ji nemusíte zadávat.

Než se pustíme do spuštění tohoto kódu, pojďme si promluvit o některých jeho součástech.

- `account`: Místní účet vytvořený z vašeho soukromého klíče pomocí [`privateKeyToAccount`](https://viem.sh/docs/accounts/local/privateKeyToAccount). Podepisování probíhá na vašem počítači a soukromý klíč se nikdy neodesílá do Alchemy.
- `publicClient` a `walletClient`: Klienti Viem, kteří odesílají požadavky JSON-RPC na vaši URL adresu Alchemy. Veřejný klient (public client) čte z řetězce a klient peněženky (wallet client) připravuje a podepisuje transakce pro váš účet.
- `nonce`: Specifikace nonce se používá ke sledování počtu transakcí odeslaných z vaší adresy. Potřebujeme to z bezpečnostních důvodů a k zabránění útokům typu replay. K získání počtu transakcí odeslaných z vaší adresy používáme [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count). Viem by to za vás také vyplnil, ale my to zde explicitně načítáme, abychom ukázali, odkud to pochází.
- `transaction`: Objekt transakce má několik aspektů, které musíme specifikovat. [`prepareTransactionRequest`](https://viem.sh/docs/actions/wallet/prepareTransactionRequest) za nás vyplní zbytek, včetně `chainId` a polí poplatků [EIP-1559](/developers/docs/gas/) `maxFeePerGas` a `maxPriorityFeePerGas`, na základě aktuálních podmínek v síti.
  - `to`: Toto je adresa, na kterou chceme odeslat ETH.
  - `value`: Toto je částka, kterou chceme odeslat, specifikovaná ve Wei, kde 10^18 Wei = 1 ETH. [`parseEther`](https://viem.sh/docs/utilities/parseEther) za nás převede částku v ETH na Wei. Váš účet potřebuje o něco více než toto, protože platí také za gas.
  - `gas`: Existuje mnoho způsobů, jak určit správné množství gasu, které se má zahrnout do vaší transakce. Alchemy podporuje [webhooky](https://www.alchemy.com/docs/reference/webhooks-overview), které vás mohou upozornit na onchain aktivitu. U transakcí na Mainnetu je dobrým zvykem zkontrolovat aktuální podmínky gasu, abyste určili správné množství gasu, které se má zahrnout. Obyčejný převod ETH na běžnou adresu vždy spotřebuje přesně 21 000 gasu, což je minimum pro jakoukoli transakci, takže sem zadáme 21000. Pokud `gas` vynecháte, Viem jej za vás odhadne.
  - `nonce`: viz definice nonce výše. Nonce se začíná počítat od nuly.
  - [VOLITELNÉ] data: Používá se k odeslání dalších informací s vaším převodem nebo k volání chytrého kontraktu, není vyžadováno pro převody zůstatku, podívejte se na poznámku níže.
- `signedTx`: K podepsání našeho objektu transakce použijeme metodu `signTransaction`, která jej lokálně podepíše pomocí účtu vytvořeného z našeho `PRIVATE_KEY`.
- `sendRawTransaction`: Jakmile máme podepsanou transakci, můžeme ji odeslat k zahrnutí do následujícího bloku pomocí `sendRawTransaction`, což volá `eth_sendRawTransaction`.
- `waitForTransactionReceipt`: Čeká, dokud není transakce zahrnuta do bloku, a vrátí její stvrzenku.

**Poznámka k datům (data)**
V Ethereu lze odeslat dva hlavní typy transakcí.

- Převod zůstatku: Odeslání ETH z jedné adresy na druhou. Není vyžadováno žádné datové pole, nicméně pokud byste chtěli spolu s transakcí odeslat další informace, můžete tyto informace zahrnout do tohoto pole ve formátu HEX.
  - Řekněme například, že bychom chtěli zapsat hash dokumentu IPFS do řetězce Etherea, abychom mu dali neměnný časový údaj. Naše datové pole by pak mělo vypadat jako `data: toHex("IPFS hash")`, s použitím [`toHex`](https://viem.sh/docs/utilities/toHex) z knihovny Viem. A nyní může kdokoli dotazovat řetězec a zjistit, kdy byl tento dokument přidán.
- Transakce chytrého kontraktu: Spuštění nějakého kódu chytrého kontraktu v řetězci. V tomto případě by datové pole mělo obsahovat chytrou funkci, kterou chcete spustit, spolu s případnými parametry.
  - Praktický příklad najdete v [tutoriálu Chytrý kontrakt Hello World](/developers/tutorials/hello-world-smart-contract/).

### 8\. Spusťte kód pomocí `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Přejděte zpět do terminálu nebo příkazového řádku a spusťte:

```
node sendTx.js
```

### 9\. Prohlédněte si svou transakci v prohlížeči bloků {#see-your-transaction-in-the-mempool}

Skript vypíše hash transakce, jakmile uzel transakci přijme, poté počká, dokud nebude zahrnuta do bloku (obvykle během několika sekund), a vypíše výsledek. Chcete-li zobrazit podrobnosti, vložte hash do prohlížeče bloků Sepolia, jako je [Sepolia Etherscan](https://sepolia.etherscan.io/) nebo [Blockscout](https://eth-sepolia.blockscout.com/). Tam můžete sledovat, jak transakce přechází ze stavu čekající (pending) do stavu zahrnutá (included), a vidět částku, poplatky a blok, ve kterém skončila.

Pokud místo toho uvidíte chybu `insufficient funds` (nedostatek prostředků), váš účet nemá dostatek Sepolia ETH na pokrytí hodnoty plus gasu. Vraťte se ke kroku 2 a vyžádejte si více z faucetu.

**Jupííí! Právě jste odeslali svou první transakci na Ethereu pomocí Alchemy 🎉**

_Pro zpětnou vazbu a návrhy k tomuto průvodci prosím napište Elanovi na [Discordu](https://discord.gg/gWuC7zB) Alchemy!_

_Původně publikováno společností Alchemy._
