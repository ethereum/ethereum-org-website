---
title: "Odesílání transakcí pomocí Web3"
description: "Toto je průvodce pro začátečníky odesíláním transakcí na Ethereu pomocí Web3. Odeslání transakce na blockchain Etherea se skládá ze tří hlavních kroků: vytvoření, podepsání a odeslání. Projdeme si všechny tři."
author: "Elan Halpern"
tags: ["transakce", "web3.js", "Alchemy"]
skill: beginner
breadcrumb: "Odesílání transakcí"
lang: cs
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

Toto je průvodce pro začátečníky odesíláním transakcí na Ethereu pomocí Web3. Odeslání transakce na blockchain Etherea se skládá ze tří hlavních kroků: vytvoření, podepsání a odeslání (broadcast). Projdeme si všechny tři a doufejme, že zodpovíme všechny vaše případné dotazy! V tomto tutoriálu budeme používat [Alchemy](https://www.alchemy.com/) k odesílání našich transakcí do řetězce Etherea. Zde si můžete [vytvořit bezplatný účet Alchemy](https://auth.alchemy.com/signup).

**POZNÁMKA:** Tento průvodce je určen pro podepisování transakcí na _backendu_ vaší aplikace. Pokud chcete integrovat podepisování transakcí na frontendu, podívejte se na integraci [Web3 s poskytovatelem v prohlížeči](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider).

## Základy {#the-basics}

Stejně jako většina blockchainových vývojářů ve svých začátcích jste si možná zjišťovali, jak odeslat transakci (což by mělo být docela jednoduché), a narazili jste na nepřeberné množství návodů, z nichž každý říkal něco jiného, což vás trochu zahltilo a zmátlo. Pokud jste na tom podobně, nebojte se; všichni jsme tam někdy byli! Než tedy začneme, ujasněme si několik věcí:

### 1\. Alchemy neukládá vaše soukromé klíče {#alchemy-does-not-store-your-private-keys}

- To znamená, že Alchemy nemůže podepisovat a odesílat transakce vaším jménem. Důvodem je bezpečnost. Alchemy vás nikdy nepožádá o sdílení vašeho soukromého klíče a vy byste nikdy neměli sdílet svůj soukromý klíč s hostovaným uzlem (ani s nikým jiným).
- Z blockchainu můžete číst pomocí základního API Alchemy, ale pro zápis do něj budete muset použít něco jiného k podepsání vašich transakcí před jejich odesláním přes Alchemy (to platí i pro jakoukoli jinou [službu uzlu](/developers/docs/nodes-and-clients/nodes-as-a-service/)).

### 2\. Co je to „signer“? {#what-is-a-signer}

- Signeři (podepisovatelé) za vás podepíší transakce pomocí vašeho soukromého klíče. V tomto tutoriálu budeme k podepsání naší transakce používat [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3), ale můžete použít i jakoukoli jinou knihovnu Web3.
- Na frontendu by byl dobrým příkladem signera [MetaMask](https://metamask.io/), který bude podepisovat a odesílat transakce vaším jménem.
### 3\. Proč musím podepisovat své transakce? {#why-do-i-need-to-sign-my-transactions}

- Každý uživatel, který chce odeslat transakci v síti Ethereum, musí transakci podepsat (pomocí svého soukromého klíče), aby se ověřilo, že původce transakce je skutečně ten, za koho se vydává.
- Je nesmírně důležité tento soukromý klíč chránit, protože přístup k němu poskytuje plnou kontrolu nad vaším účtem na Ethereu a umožňuje vám (nebo komukoli s přístupem) provádět transakce vaším jménem.

### 4\. Jak ochráním svůj soukromý klíč? {#how-do-i-protect-my-private-key}

- Existuje mnoho způsobů, jak chránit svůj soukromý klíč a používat jej k odesílání transakcí. V tomto tutoriálu budeme používat soubor `.env`. Můžete však také použít samostatného poskytovatele, který ukládá soukromé klíče, použít soubor úložiště klíčů (keystore) nebo jiné možnosti.

### 5\. Jaký je rozdíl mezi `eth_sendTransaction` a `eth_sendRawTransaction`? {#difference-between-send-and-send-raw}

`eth_sendTransaction` a `eth_sendRawTransaction` jsou obě funkce API Etherea, které odesílají transakci do sítě Ethereum, aby byla přidána do budoucího bloku. Liší se v tom, jak zpracovávají podepisování transakcí.

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction) se používá k odesílání _nepodepsaných_ transakcí, což znamená, že uzel, na který odesíláte, musí spravovat váš soukromý klíč, aby mohl transakci podepsat před jejím odesláním do řetězce. Vzhledem k tomu, že Alchemy neuchovává soukromé klíče uživatelů, tuto metodu nepodporuje.
- [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction) se používá k odesílání transakcí, které již byly podepsány. To znamená, že nejprve musíte použít [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction) a poté předat výsledek do `eth_sendRawTransaction`.

Při použití Web3 se k `eth_sendRawTransaction` přistupuje voláním funkce [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction).

To je to, co budeme používat v tomto tutoriálu.

### 6\. Co je to knihovna Web3? {#what-is-the-web3-library}

- Web3.js je obalovací knihovna (wrapper) kolem standardních volání JSON-RPC, která se při vývoji na Ethereu používá poměrně běžně.
- Existuje mnoho knihoven Web3 pro různé jazyky. V tomto tutoriálu budeme používat [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3), která je napsána v JavaScriptu. Další možnosti, jako je [Ethers.js](https://docs.ethers.org/v5/), si můžete prohlédnout [zde](/developers/docs/apis/javascript/).

Dobře, teď, když máme několik těchto otázek z krku, přejděme k tutoriálu. Neváhejte se kdykoli zeptat na [Discordu](https://discord.gg/gWuC7zB) Alchemy!

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

Postupujte podle pokynů na [faucetu Alchemy Sepolia](https://www.sepoliafaucet.com/) a získejte ETH. Ujistěte se, že jste zadali svou adresu na Ethereu pro síť **Sepolia** (z MetaMasku) a ne pro jinou síť. Po provedení pokynů si dvakrát zkontrolujte, zda jste ETH do své peněženky obdrželi.

### 3\. Vytvořte nový adresář projektu a přejděte do něj pomocí `cd` {#create-a-new-project-direction}

Vytvořte nový adresář projektu z příkazového řádku (terminálu na Macu) a přejděte do něj:

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. Nainstalujte Alchemy Web3 (nebo jakoukoli knihovnu Web3) {#install-alchemy-web3}

Spusťte následující příkaz v adresáři vašeho projektu pro instalaci [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3):

Poznámka: Pokud byste chtěli použít knihovnu Ethers.js, [postupujte podle pokynů zde](https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```
npm install @alch/alchemy-web3
```

### 5\. Nainstalujte dotenv {#install-dotenv}

K bezpečnému uložení našeho klíče API a soukromého klíče použijeme soubor `.env`.

```
npm install dotenv --save
```

### 6\. Vytvořte soubor `.env` {#create-the-dotenv-file}

Vytvořte soubor `.env` v adresáři vašeho projektu a přidejte následující (nahraďte „`your-api-url`“ a „`your-private-key`“):

- Chcete-li najít svou URL adresu Alchemy API, přejděte na stránku s podrobnostmi o aplikaci, kterou jste právě vytvořili na svém řídicím panelu, klikněte na „View Key“ v pravém horním rohu a zkopírujte HTTP URL.
- Chcete-li najít svůj soukromý klíč pomocí MetaMasku, podívejte se na tohoto [průvodce](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Necommitujte <code>.env</code>! Ujistěte se, že svůj soubor <code>.env</code> nikdy s nikým nesdílíte ani ho nevystavujete, protože tím ohrožujete svá tajemství. Pokud používáte správu verzí, přidejte svůj <code>.env</code> do souboru <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

### 7\. Vytvořte soubor `sendTx.js` {#create-sendtx-js}

Skvělé, teď, když máme naše citlivá data chráněna v souboru `.env`, můžeme začít kódovat. Pro náš příklad odeslání transakce budeme posílat ETH zpět do faucetu Sepolia.

Vytvořte soubor `sendTx.js`, ve kterém nakonfigurujeme a odešleme naši ukázkovou transakci, a přidejte do něj následující řádky kódu:

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: nahraďte tuto adresu svou vlastní veřejnou adresou

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce se začíná počítat od 0

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // adresa faucetu pro vrácení eth
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // volitelné datové pole pro odeslání zprávy nebo spuštění chytrého kontraktu
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 Hash vaší transakce je: ", hash, "\n Zkontrolujte mempool Alchemy a podívejte se na stav vaší transakce!");
    } else {
      console.log("❗Při odesílání vaší transakce se něco pokazilo:", error)
    }
   });
}

main();
```

Nezapomeňte nahradit adresu na **řádku 6** svou vlastní veřejnou adresou.

Než se pustíme do spouštění tohoto kódu, pojďme si promluvit o některých jeho součástech.

- `nonce` : Specifikace nonce se používá ke sledování počtu transakcí odeslaných z vaší adresy. Potřebujeme to z bezpečnostních důvodů a k zabránění útokům typu replay (opakování). K získání počtu transakcí odeslaných z vaší adresy používáme [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count).
- `transaction`: Objekt transakce má několik aspektů, které musíme specifikovat
  - `to`: Toto je adresa, na kterou chceme odeslat ETH. V tomto případě posíláme ETH zpět do [faucetu Sepolia](https://sepoliafaucet.com/), ze kterého jsme původně žádali.
  - `value`: Toto je částka, kterou chceme odeslat, specifikovaná ve Wei, kde 10^18 Wei = 1 ETH.
  - `gas`: Existuje mnoho způsobů, jak určit správné množství gasu, které se má zahrnout do vaší transakce. Alchemy podporuje [webhooky](https://www.alchemy.com/docs/reference/webhooks-overview), které vás mohou upozornit na onchain aktivitu. U transakcí na Mainnetu je dobrým zvykem zkontrolovat aktuální podmínky gasu, abyste určili správné množství gasu, které se má zahrnout. 21000 je minimální množství gasu, které operace na Ethereu spotřebuje, takže abychom zajistili, že naše transakce bude provedena, zadáme sem 30000.
  - `nonce`: viz definice nonce výše. Nonce se začíná počítat od nuly.
  - [VOLITELNÉ] data: Používá se k odeslání dalších informací s vaším převodem nebo k volání chytrého kontraktu, není vyžadováno pro převody zůstatku, podívejte se na poznámku níže.
- `signedTx`: K podepsání našeho objektu transakce použijeme metodu `signTransaction` s naším `PRIVATE_KEY`.
- `sendSignedTransaction`: Jakmile máme podepsanou transakci, můžeme ji odeslat k zahrnutí do následujícího bloku pomocí `sendSignedTransaction`.

**Poznámka k datům**
Existují dva hlavní typy transakcí, které lze na Ethereu odeslat.

- Převod zůstatku: Odeslání ETH z jedné adresy na druhou. Není vyžadováno žádné datové pole, nicméně pokud byste chtěli s transakcí odeslat další informace, můžete tyto informace zahrnout v HEX formátu do tohoto pole.
  - Řekněme například, že bychom chtěli zapsat hash dokumentu IPFS do řetězce Etherea, abychom mu dali neměnný časový razítko. Naše datové pole by pak mělo vypadat jako data: `web3.utils.toHex(‘IPFS hash‘)`. A nyní může kdokoli dotazovat řetězec a zjistit, kdy byl tento dokument přidán.
- Transakce chytrého kontraktu: Spuštění nějakého kódu chytrého kontraktu v řetězci. V tomto případě by datové pole mělo obsahovat chytrou funkci, kterou chcete spustit, spolu s případnými parametry.
  - Praktický příklad najdete v [tutoriálu Chytrý kontrakt Hello World](/developers/tutorials/hello-world-smart-contract/).
### 8\. Spusťte kód pomocí `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Přejděte zpět do terminálu nebo příkazového řádku a spusťte:

```
node sendTx.js
```

### 9\. Podívejte se na svou transakci v mempoolu {#see-your-transaction-in-the-mempool}

Otevřete [stránku Mempool](https://dashboard.alchemy.com/mempool) na svém řídicím panelu Alchemy a filtrujte podle aplikace, kterou jste vytvořili, abyste našli svou transakci. Zde můžeme sledovat, jak naše transakce přechází ze stavu čekající (pending) do stavu vytěžená (mined) (pokud je úspěšná) nebo zahozená (dropped), pokud je neúspěšná. Ujistěte se, že máte nastaveno „All“ (Vše), abyste zachytili „vytěžené“, „čekající“ a „zahozené“ transakce. Svou transakci můžete také vyhledat tak, že budete hledat transakce odeslané na adresu `0x31b98d14007bdee637298086988a0bbd31184523` .

Chcete-li zobrazit podrobnosti o své transakci, jakmile ji najdete, vyberte hash transakce (tx hash), což by vás mělo přenést do zobrazení, které vypadá takto:

![Snímek obrazovky sledování mempoolu](./mempool.png)

Odtud si můžete prohlédnout svou transakci na Etherscanu kliknutím na ikonu zakroužkovanou červeně!

**Jupííí! Právě jste odeslali svou první transakci na Ethereu pomocí Alchemy 🎉**

_Pro zpětnou vazbu a návrhy k tomuto průvodci prosím napište Elanovi na [Discordu](https://discord.gg/A39JVCM) Alchemy!_

_Původně publikováno společností Alchemy._
