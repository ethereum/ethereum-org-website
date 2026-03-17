---
title: "Odesílání transakcí pomocí Web3"
description: "Toto je průvodce pro začátečníky, jak odesílat transakce v síti Ethereum pomocí Web3. Existují tři hlavní kroky pro odeslání transakce do blockchainu Etherea: vytvoření, podepsání a vysílání. Všechny tři si projdeme."
author: "Elan Halpern"
tags: [ "transakce", "web3.js", "alchemy" ]
skill: beginner
lang: cs
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

Toto je průvodce pro začátečníky, jak odesílat transakce v síti Ethereum pomocí Web3. Existují tři hlavní kroky pro odeslání transakce do blockchainu Etherea: vytvoření, podepsání a vysílání. Všechny tři si projdeme a doufejme, že odpovíme na všechny vaše případné otázky! V tomto návodu budeme k odesílání našich transakcí do řetězce Ethereum používat [Alchemy](https://www.alchemy.com/). Můžete si [zde vytvořit bezplatný účet Alchemy](https://auth.alchemyapi.io/signup).

**POZNÁMKA:** Tento průvodce je určen k podepisování transakcí na _backendu_ vaší aplikace. Pokud chcete integrovat podepisování transakcí na frontendu, podívejte se na integraci [Web3 s poskytovatelem prohlížeče](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider).

## Základy {#the-basics}

Stejně jako většina blockchainových vývojářů, když začínali, jste si možná udělali průzkum, jak poslat transakci (něco, co by mělo být docela jednoduché), a narazili jste na spoustu průvodců, z nichž každý říkal něco jiného a nechal vás trochu zahlcené a zmatené. Pokud se v tom poznáváte, nedělejte si starosti; v určitém okamžiku jsme si tím prošli všichni! Než tedy začneme, ujasněme si několik věcí:

### 1. Alchemy neukládá vaše soukromé klíče {#alchemy-does-not-store-your-private-keys}

- To znamená, že Alchemy nemůže vaším jménem podepisovat a odesílat transakce. Důvodem jsou bezpečnostní účely. Alchemy vás nikdy nepožádá o sdílení vašeho soukromého klíče a vy byste nikdy neměli sdílet svůj soukromý klíč s hostovaným uzlem (nebo s kýmkoli jiným).
- Pomocí základního API od Alchemy můžete číst z blockchainu, ale abyste do něj mohli zapisovat, budete muset použít něco jiného k podepsání transakcí před jejich odesláním přes Alchemy (to samé platí pro jakoukoli jinou [službu uzlů](/developers/docs/nodes-and-clients/nodes-as-a-service/)).

### 2. Co je to „podepisovatel“? {#what-is-a-signer}

- Podepisovatelé za vás podepíší transakce pomocí vašeho soukromého klíče. V tomto návodu budeme k podepsání naší transakce používat [Alchemy web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3), ale můžete použít i jakoukoliv jinou web3 knihovnu.
- Na frontendu je dobrým příkladem podepisovatele [MetaMask](https://metamask.io/), který za vás bude podepisovat a odesílat transakce.

### 3. Proč musím podepisovat své transakce? {#why-do-i-need-to-sign-my-transactions}

- Každý uživatel, který chce odeslat transakci v síti Ethereum, musí transakci podepsat (pomocí svého soukromého klíče), aby se ověřilo, že původce transakce je ten, za koho se vydává.
- Je velmi důležité tento soukromý klíč chránit, protože přístup k němu poskytuje plnou kontrolu nad vaším účtem Ethereum, což vám (nebo komukoli s přístupem) umožňuje provádět transakce vaším jménem.

### 4. Jak ochráním svůj soukromý klíč? {#how-do-i-protect-my-private-key}

- Existuje mnoho způsobů, jak chránit svůj soukromý klíč a používat ho k odesílání transakcí. V tomto návodu budeme používat soubor `.env`. Můžete však také použít samostatného poskytovatele, který ukládá soukromé klíče, použít soubor keystore nebo jiné možnosti.

### 5. Jaký je rozdíl mezi `eth_sendTransaction` a `eth_sendRawTransaction`? {#difference-between-send-and-send-raw}

`eth_sendTransaction` a `eth_sendRawTransaction` jsou obě funkce API Etherea, které vysílají transakci do sítě Ethereum, aby byla přidána do budoucího bloku. Liší se v tom, jak nakládají s podepisováním transakcí.

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction) se používá k odesílání _nepodepsaných_ transakcí, což znamená, že uzel, na který odesíláte, musí spravovat váš soukromý klíč, aby mohl transakci podepsat před jejím vysíláním do řetězce. Jelikož Alchemy neuchovává soukromé klíče uživatelů, tuto metodu nepodporuje.
- [`eth_sendRawTransaction`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction) se používá k vysílání transakcí, které již byly podepsány. To znamená, že nejprve musíte použít [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction) a poté výsledek předat do `eth_sendRawTransaction`.

Při použití web3 se k `eth_sendRawTransaction` přistupuje voláním funkce [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction).

To je to, co budeme používat v tomto návodu.

### 6. Co je to knihovna web3? {#what-is-the-web3-library}

- Web3.js je obalová knihovna pro standardní volání JSON-RPC, která se ve vývoji pro Ethereum běžně používá.
- Existuje mnoho web3 knihoven pro různé jazyky. V tomto návodu budeme používat [Alchemy Web3](https://docs.alchemy.com/reference/api-overview), který je napsán v JavaScriptu. Můžete se podívat na další možnosti [zde](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries), jako je například [ethers.js](https://docs.ethers.org/v5/).

Dobře, teď, když máme několik těchto otázek z cesty, přejděme k návodu. Neváhejte se kdykoli na cokoli zeptat na [Discordu](https://discord.gg/gWuC7zB) společnosti Alchemy!

### 7. Jak posílat bezpečné, soukromé transakce a transakce s optimalizovanými poplatky? {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy má sadu Transact API](https://docs.alchemy.com/reference/transact-api-quickstart). Můžete je použít k odesílání posílených transakcí, simulaci transakcí před jejich uskutečněním, odesílání soukromých transakcí a odesílání transakcí optimalizovaných z hlediska poplatků
- Můžete také použít [Notify API](https://docs.alchemy.com/docs/alchemy-notify), abyste byli upozorněni, když je vaše transakce vytažena z mempoolu a přidána do řetězce.

**POZNÁMKA:** Tento průvodce vyžaduje účet Alchemy, adresu Ethereum nebo peněženku MetaMask, nainstalovaný NodeJs a npm. Pokud ne, postupujte podle následujících kroků:

1. [Vytvořte si bezplatný účet Alchemy](https://auth.alchemyapi.io/signup)
2. [Vytvořte si účet MetaMask](https://metamask.io/) (nebo získejte adresu Ethereum)
3. [Postupujte podle těchto kroků k instalaci NodeJs a NPM](https://docs.alchemy.com/alchemy/guides/alchemy-for-macs)

## Kroky k odeslání vaší transakce {#steps-to-sending-your-transaction}

### 1. Vytvořte aplikaci Alchemy na testnetu Sepolia {#create-an-alchemy-app-on-the-sepolia-testnet}

Přejděte na svůj [Alchemy Dashboard](https://dashboard.alchemyapi.io/) a vytvořte novou aplikaci a pro svou síť zvolte Sepolia (nebo jakýkoli jiný testnet).

### 2. Požádejte o ETH z faucetu Sepolia {#request-eth-from-sepolia-faucet}

Chcete-li obdržet ETH, postupujte podle pokynů na [faucetu Sepolia od Alchemy](https://www.sepoliafaucet.com/). Ujistěte se, že jste zadali svou adresu Ethereum na síti **Sepolia** (z MetaMasku) a ne jinou síť. Po provedení pokynů si zkontrolujte, že jste ETH obdrželi do své peněženky.

### 3. Vytvořte nový adresář projektu a přejděte do něj pomocí `cd` {#create-a-new-project-direction}

Vytvořte nový adresář projektu z příkazového řádku (terminál pro Mac) a přejděte do něj:

```
mkdir sendtx-example
cd sendtx-example
```

### 4. Nainstalujte si Alchemy Web3 (nebo jakoukoli web3 knihovnu) {#install-alchemy-web3}

Spusťte následující příkaz ve svém projektovém adresáři, abyste si nainstalovali [Alchemy Web3](https://docs.alchemy.com/reference/api-overview):

Poznámka: Pokud byste chtěli použít knihovnu ethers.js, [postupujte podle pokynů zde](https://docs.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```
npm install @alch/alchemy-web3
```

### 5. Nainstalujte si dotenv {#install-dotenv}

Použijeme soubor `.env` k bezpečnému uložení našeho klíče API a soukromého klíče.

```
npm install dotenv --save
```

### 6. Vytvořte soubor `.env` {#create-the-dotenv-file}

Vytvořte soubor `.env` ve svém projektovém adresáři a přidejte následující (nahraďte "`your-api-url`" a "`your-private-key`")

- Chcete-li najít adresu URL vašeho Alchemy API, přejděte na stránku s podrobnostmi aplikace, kterou jste právě vytvořili na svém ovládacím panelu, klikněte na „View Key“ v pravém horním rohu a zkopírujte URL adresu HTTP.
- Chcete-li najít svůj soukromý klíč pomocí MetaMasku, podívejte se na tohoto [průvodce](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Nenahrávejte `<code>.env</code>`! Prosím, ujistěte se, že nikdy nesdílíte ani nezveřejňujete svůj soubor `<code>.env</code>` s nikým, protože tím ohrožujete svá tajemství. Pokud používáte správu verzí, přidejte svůj soubor `<code>.env</code>` do souboru <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

### 7. Vytvořte soubor `sendTx.js` {#create-sendtx-js}

Skvělé, teď, když máme svá citlivá data chráněná v souboru `.env`, pojďme začít kódovat. Jako příklad odeslání transakce budeme posílat ETH zpět do faucetu Sepolia.

Vytvořte soubor `sendTx.js`, ve kterém nakonfigurujeme a odešleme naši ukázkovou transakci, a přidejte do něj následující řádky kódu:

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: nahraďte tuto adresu vaší veřejnou adresou

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce se začíná počítat od 0

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // adresa faucetu pro vrácení ETH
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // volitelné datové pole pro odeslání zprávy nebo spuštění chytrého kontraktu
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
    } else {
      console.log("❗Something went wrong while submitting your transaction:", error)
    }
   });
}

main();
```

Nezapomeňte nahradit adresu na **řádku 6** vaší vlastní veřejnou adresou.

Než se pustíme do spouštění tohoto kódu, promluvme si o některých jeho součástech.

- `nonce` : Specifikace nonce se používá ke sledování počtu transakcí odeslaných z vaší adresy. Potřebujeme to z bezpečnostních důvodů a k zabránění [útokům typu replay](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). K získání počtu transakcí odeslaných z vaší adresy používáme [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).
- `transaction`: Objekt transakce má několik aspektů, které musíme specifikovat
  - `to`: Toto je adresa, na kterou chceme poslat ETH. V tomto případě posíláme ETH zpět do [faucetu Sepolia](https://sepoliafaucet.com/), od kterého jsme je původně požadovali.
  - `value`: Toto je částka, kterou si přejeme poslat, specifikovaná ve Wei, kde 10^18 Wei = 1 ETH
  - `gas`: Existuje mnoho způsobů, jak určit správné množství gasu, které má vaše transakce obsahovat. Alchemy má dokonce [webhook pro cenu gasu](https://docs.alchemyapi.io/guides/alchemy-notify#address-activity-1), který vás upozorní, když cena gasu klesne pod určitou hranici. U transakcí na mainnetu je dobrým zvykem zkontrolovat odhadce poplatků za gas, jako je [ETH Gas Station](https://ethgasstation.info/), abyste určili správné množství gasu, které má transakce obsahovat. 21000 je minimální množství gasu, které operace na Ethereu spotřebuje, takže abychom zajistili, že se naše transakce provede, zadáme zde 30000.
  - `nonce`: viz definice nonce výše. Nonce se začíná počítat od nuly.
  - [VOLITELNÉ] data: Používá se k odeslání dodatečných informací s vaším převodem nebo k volání chytrého kontraktu, není vyžadováno pro převody zůstatku, podívejte se na poznámku níže.
- `signedTx`: K podepsání našeho objektu transakce použijeme metodu `signTransaction` s naším `PRIVATE_KEY`
- `sendSignedTransaction`: Jakmile máme podepsanou transakci, můžeme ji odeslat k zahrnutí do následujícího bloku pomocí `sendSignedTransaction`

**Poznámka k datům**
Existují dva hlavní typy transakcí, které lze v Ethereu odeslat.

- Převod zůstatku: Odešlete ETH z jedné adresy na druhou. Není vyžadováno žádné datové pole, avšak pokud byste chtěli spolu s transakcí poslat další informace, můžete je v tomto poli uvést ve formátu HEX.
  - Řekněme například, že bychom chtěli zapsat haš dokumentu IPFS do řetězce Ethereum, abychom mu dali neměnné časové razítko. Naše datové pole by pak mělo vypadat takto: data: `web3.utils.toHex('haš IPFS')`. A teď se kdokoli může dotázat řetězce a zjistit, kdy byl daný dokument přidán.
- Transakce chytrého kontraktu: Spusťte nějaký kód chytrého kontraktu na řetězci. V tomto případě by datové pole mělo obsahovat chytrou funkci, kterou si přejete spustit, spolu s jakýmikoli parametry.
  - Praktický příklad najdete v kroku 8 tohoto [návodu Hello World](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#step-8-create-the-transaction).

### 8. Spusťte kód pomocí `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Vraťte se do svého terminálu nebo příkazového řádku a spusťte:

```
node sendTx.js
```

### 9. Zobrazte svou transakci v Mempoolu {#see-your-transaction-in-the-mempool}

Otevřete stránku [Mempool](https://dashboard.alchemyapi.io/mempool) na svém ovládacím panelu Alchemy a filtrujte podle aplikace, kterou jste vytvořili, abyste našli svou transakci. Zde můžeme sledovat přechod naší transakce z čekajícího stavu do stavu vytěženého (v případě úspěchu) nebo zahozeného stavu (v případě neúspěchu). Ujistěte se, že je nastaveno na „All“, abyste zachytili „vytěžené“, „čekající“ a „zahozené“ transakce. Svou transakci můžete také vyhledat tak, že budete hledat transakce odeslané na adresu `0x31b98d14007bdee637298086988a0bbd31184523`.

Chcete-li zobrazit podrobnosti své transakce, jakmile ji najdete, vyberte haš transakce, který by vás měl přenést do zobrazení, které vypadá takto:

![Snímek obrazovky Mempool watcher](./mempool.png)

Odtud si můžete prohlédnout svou transakci na Etherscanu kliknutím na červeně zakroužkovanou ikonu!

**Jupííí! Právě jste odeslali svou první transakci na Ethereu pomocí Alchemy 🎉**

_Pro zpětnou vazbu a návrhy k tomuto průvodci prosím napište Elanovi na [Discordu](https://discord.gg/A39JVCM) společnosti Alchemy!_

_Původně publikováno na [https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy](https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy)_
