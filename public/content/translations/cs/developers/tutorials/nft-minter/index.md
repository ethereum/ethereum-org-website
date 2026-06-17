---
title: Výukový program: Ražení NFT
description: V tomto návodu si vytvoříte aplikaci pro ražení NFT a naučíte se, jak vytvořit full-stack decentralizovanou aplikaci (dapp) propojením chytrého kontraktu s frontendem v Reactu pomocí MetaMasku a nástrojů Web3.
author: "smudgil"
tags: ["solidity", "NFT", "alchemy", "chytré kontrakty", "frontend", "Pinata", "erc-721"]
skill: intermediate
breadcrumb: Dapp pro ražení NFT
lang: cs
published: 2021-10-06
---

Jednou z největších výzev pro vývojáře přicházející z prostředí Web2 je přijít na to, jak propojit chytrý kontrakt s frontendovým projektem a jak s ním interagovat.

Vytvořením aplikace pro ražení NFT – jednoduchého uživatelského rozhraní, kam můžete zadat odkaz na své digitální aktivum, název a popis – se naučíte, jak:

- Připojit se k MetaMasku přes váš frontendový projekt
- Volat metody chytrého kontraktu z vašeho frontendu
- Podepisovat transakce pomocí MetaMasku

V tomto návodu budeme používat [React](https://react.dev/) jako náš frontendový framework. Protože je tento návod primárně zaměřen na vývoj ve Web3, nebudeme trávit mnoho času rozebíráním základů Reactu. Místo toho se zaměříme na přidání funkcionality do našeho projektu.

Jako předpoklad byste měli mít začátečnické znalosti Reactu – vědět, jak fungují komponenty, props, useState/useEffect a základní volání funkcí. Pokud jste o žádném z těchto pojmů nikdy neslyšeli, možná byste se měli podívat na tento [Úvod do Reactu](https://react.dev/learn/tutorial-tic-tac-toe). Pro ty, kteří se raději učí vizuálně, vřele doporučujeme tuto vynikající sérii videí [Full Modern React Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) od Net Ninja.

A pokud ho ještě nemáte, budete k dokončení tohoto návodu a k budování čehokoli na blockchainu rozhodně potřebovat účet na Alchemy. Zaregistrujte si bezplatný účet [zde](https://alchemy.com/).

Bez dalších okolků, pojďme na to!

## Základy tvorby NFT {#making-nfts-101}

Než se vůbec začneme dívat na nějaký kód, je důležité pochopit, jak tvorba NFT funguje. Zahrnuje to dva kroky:

### Nasazení chytrého kontraktu pro NFT na blockchain Ethereum {#publish-nft}

Největší rozdíl mezi těmito dvěma standardy chytrých kontraktů pro NFT je ten, že ERC-1155 je multi-tokenový standard a zahrnuje dávkové funkce, zatímco ERC-721 je standard pro jeden token, a proto podporuje převod pouze jednoho tokenu najednou.

### Volání funkce pro ražení {#minting-function}

Obvykle tato funkce pro ražení vyžaduje, abyste jako parametry předali dvě proměnné: první je `recipient`, která specifikuje adresu, jež obdrží vaše čerstvě vyražené NFT, a druhou je `tokenURI` daného NFT, což je řetězec, který odkazuje na JSON dokument popisující metadata NFT.

Metadata NFT jsou tím, co mu skutečně vdechuje život a umožňuje mu mít vlastnosti, jako je název, popis, obrázek (nebo jiné digitální aktivum) a další atributy. Zde je [příklad tokenURI](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2), který obsahuje metadata NFT.

V tomto návodu se zaměříme na 2. část, tedy volání funkce pro ražení existujícího chytrého kontraktu pro NFT pomocí našeho uživatelského rozhraní v Reactu.

[Zde je odkaz](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) na chytrý kontrakt pro NFT standardu ERC-721, který budeme v tomto návodu volat. Pokud byste se chtěli dozvědět, jak jsme ho vytvořili, vřele doporučujeme podívat se na náš další návod [„Jak vytvořit NFT“](https://www.alchemy.com/docs/how-to-create-an-nft).

Skvělé, teď když chápeme, jak tvorba NFT funguje, pojďme si naklonovat naše startovací soubory!

## Klonování startovacích souborů {#clone-the-starter-files}

Nejprve přejděte do [GitHub repozitáře nft-minter-tutorial](https://github.com/alchemyplatform/nft-minter-tutorial), kde získáte startovací soubory pro tento projekt. Naklonujte si tento repozitář do svého lokálního prostředí.

Když otevřete tento naklonovaný repozitář `nft-minter-tutorial`, všimnete si, že obsahuje dvě složky: `minter-starter-files` a `nft-minter`.

- `minter-starter-files` obsahuje startovací soubory (v podstatě uživatelské rozhraní v Reactu) pro tento projekt. V tomto návodu **budeme pracovat v tomto adresáři**, protože se naučíte, jak toto uživatelské rozhraní oživit jeho propojením s vaší peněženkou Ethereum a chytrým kontraktem pro NFT.
- `nft-minter` obsahuje celý dokončený návod a slouží jako **reference**, **pokud se zaseknete.**

Dále otevřete svou kopii `minter-starter-files` ve svém editoru kódu a poté přejděte do složky `src`.

Veškerý kód, který napíšeme, bude umístěn ve složce `src`. Budeme upravovat komponentu `Minter.js` a psát další soubory v JavaScriptu, abychom našemu projektu dodali funkcionalitu Web3.

## Krok 2: Prozkoumání startovacích souborů {#step-2-check-out-our-starter-files}

Než začneme programovat, je důležité se podívat, co už máme ve startovacích souborech připraveno.

### Spuštění projektu v Reactu {#get-your-react-project-running}

Začněme spuštěním projektu v Reactu v našem prohlížeči. Krása Reactu spočívá v tom, že jakmile máme projekt spuštěný v prohlížeči, jakékoli změny, které uložíme, se v prohlížeči živě aktualizují.

Chcete-li projekt spustit, přejděte do kořenového adresáře složky `minter-starter-files` a ve svém terminálu spusťte `npm install`, abyste nainstalovali závislosti projektu:

```bash
cd minter-starter-files
npm install
```

Jakmile se instalace dokončí, spusťte ve svém terminálu `npm start`:

```bash
npm start
```

Tím by se mělo ve vašem prohlížeči otevřít http://localhost:3000/, kde uvidíte frontend našeho projektu. Měl by se skládat ze 3 polí: místa pro zadání odkazu na aktivum vašeho NFT, zadání názvu vašeho NFT a poskytnutí popisu.

Pokud zkusíte kliknout na tlačítka „Connect Wallet“ nebo „Mint NFT“, všimnete si, že nefungují – to proto, že jejich funkcionalitu musíme teprve naprogramovat! :\)

### Komponenta Minter.js {#minter-js}

**POZNÁMKA:** Ujistěte se, že jste ve složce `minter-starter-files` a ne ve složce `nft-minter`!

Vraťme se v našem editoru do složky `src` a otevřeme soubor `Minter.js`. Je nesmírně důležité, abychom všemu v tomto souboru rozuměli, protože se jedná o primární komponentu v Reactu, na které budeme pracovat.

Na začátku tohoto souboru máme naše stavové proměnné, které budeme aktualizovat po specifických událostech.

```javascript
//Stavové proměnné
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

Nikdy jste neslyšeli o stavových proměnných nebo stavových hoocích v Reactu? Podívejte se na [tuto](https://legacy.reactjs.org/docs/hooks-state.html) dokumentaci.

Zde je to, co jednotlivé proměnné představují:

- `walletAddress` - řetězec, který ukládá adresu peněženky uživatele
- `status` - řetězec, který obsahuje zprávu k zobrazení ve spodní části uživatelského rozhraní
- `name` - řetězec, který ukládá název NFT
- `description` - řetězec, který ukládá popis NFT
- `url` - řetězec, který je odkazem na digitální aktivum NFT

Za stavovými proměnnými uvidíte tři neimplementované funkce: `useEffect`, `connectWalletPressed` a `onMintPressed`. Všimnete si, že všechny tyto funkce jsou `async`, to proto, že v nich budeme provádět asynchronní volání API! Jejich názvy odpovídají jejich funkcionalitě:

```javascript
useEffect(async () => {
  //TODO: implementovatovatovat
}, [])

const connectWalletPressed = async () => {
  //TODO: implement
}

const onMintPressed = async () => {
  //TODO: implement
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - toto je hook v Reactu, který se volá po vykreslení vaší komponenty. Protože je do něj předáno prázdné pole `[]` (viz řádek 3), bude zavolán pouze při _prvním_ vykreslení komponenty. Zde zavoláme náš posluchač peněženky a další funkci peněženky, abychom aktualizovali naše uživatelské rozhraní tak, aby odráželo, zda je peněženka již připojena.
- `connectWalletPressed` - tato funkce bude zavolána pro připojení peněženky MetaMask uživatele k naší decentralizované aplikaci (dapp).
- `onMintPressed` - tato funkce bude zavolána pro vyražení NFT uživatele.

Blízko konce tohoto souboru máme uživatelské rozhraní naší komponenty. Pokud si tento kód pečlivě prohlédnete, všimnete si, že aktualizujeme naše stavové proměnné `url`, `name` a `description`, když se změní vstup v jejich odpovídajících textových polích.

Také uvidíte, že `connectWalletPressed` a `onMintPressed` jsou volány při kliknutí na tlačítka s ID `mintButton` a `walletButton`.

```javascript
//UI naší komponenty
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
    <p>
      Simply add your asset's link, name, and description, then press "Mint."
    </p>
    <form>
      <h2>🖼 Link to asset: </h2>
      <input
        type="text"
        placeholder="e.g., https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Name: </h2>
      <input
        type="text"
        placeholder="e.g., My first NFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Description: </h2>
      <input
        type="text"
        placeholder="e.g., Even cooler than cryptokitties ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      Mint NFT
    </button>
    <p id="status">{status}</p>
  </div>
)
```

Nakonec se podívejme, kam je tato komponenta Minter přidána.

Pokud přejdete do souboru `App.js`, což je hlavní komponenta v Reactu, která funguje jako kontejner pro všechny ostatní komponenty, uvidíte, že naše komponenta Minter je vložena na řádku 7.

**V tomto návodu budeme upravovat pouze `Minter.js file` a přidávat soubory do naší složky `src`.**

Nyní, když rozumíme tomu, s čím pracujeme, pojďme si nastavit naši peněženku Ethereum!

## Nastavení vaší peněženky Ethereum {#set-up-your-ethereum-wallet}

Aby uživatelé mohli interagovat s vaším chytrým kontraktem, budou muset připojit svou peněženku Ethereum k vaší dapp.

### Stažení MetaMasku {#download-metamask}

Pro tento návod použijeme MetaMask, virtuální peněženku v prohlížeči, která se používá ke správě adresy vašeho účtu na Ethereu. Pokud chcete lépe porozumět tomu, jak fungují transakce na Ethereu, podívejte se na [tuto stránku](/developers/docs/transactions/).

MetaMask si můžete zdarma stáhnout a vytvořit si účet [zde](https://metamask.io/download). Když si vytváříte účet, nebo pokud už účet máte, nezapomeňte se vpravo nahoře přepnout na „Ropsten Test Network“ \(abychom nepracovali se skutečnými penězi\).

### Přidání etheru z faucetu {#add-ether-from-faucet}

Abychom mohli razit naše NFT (nebo podepisovat jakékoli transakce na blockchainu Ethereum), budeme potřebovat nějaké falešné ETH. Chcete-li získat ETH, můžete přejít na [Ropsten faucet](https://faucet.ropsten.be/) a zadat adresu svého účtu na síti Ropsten, poté klikněte na „Send Ropsten Eth“. Brzy poté byste měli vidět ETH ve svém účtu na MetaMasku!

### Kontrola vašeho zůstatku {#check-your-balance}

Abychom si ověřili, že tam náš zůstatek je, udělejme požadavek [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) pomocí [nástroje composer od Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). To vrátí množství ETH v naší peněžence. Poté, co zadáte adresu svého účtu na MetaMasku a kliknete na „Send Request“, měli byste vidět odpověď jako je tato:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**POZNÁMKA:** Tento výsledek je ve Wei, ne v ETH. Wei se používá jako nejmenší nominální hodnota etheru. Převod z Wei na ETH je: 1 ETH = 10¹⁸ Wei. Takže pokud převedeme 0xde0b6b3a7640000 do desítkové soustavy, dostaneme 1\*10¹⁸, což se rovná 1 ETH.

Uf! Naše falešné peníze jsou všechny tam! <Emoji text=":money_mouth_face:" size={1} />

## Připojení MetaMasku k vašemu uživatelskému rozhraní {#connect-metamask-to-your-ui}

Nyní, když je naše peněženka MetaMask nastavena, pojďme k ní připojit naši dapp!

Protože se chceme držet paradigmatu [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), vytvoříme samostatný soubor, který bude obsahovat naše funkce pro správu logiky, dat a pravidel naší dapp, a poté tyto funkce předáme našemu frontendu (naší komponentě Minter.js).

### Funkce `connectWallet` {#connect-wallet-function}

Za tímto účelem vytvořme novou složku s názvem `utils` ve vašem adresáři `src` a přidejme do ní soubor s názvem `interact.js`, který bude obsahovat všechny naše funkce pro interakci s peněženkou a chytrým kontraktem.

V našem souboru `interact.js` napíšeme funkci `connectWallet`, kterou pak naimportujeme a zavoláme v naší komponentě `Minter.js`.

Do vašeho souboru `interact.js` přidejte následující:

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Pojďme si rozebrat, co tento kód dělá:

Nejprve naše funkce zkontroluje, zda je ve vašem prohlížeči povoleno `window.ethereum`.

`window.ethereum` je globální API vkládané MetaMaskem a dalšími poskytovateli peněženek, které umožňuje webovým stránkám vyžadovat účty uživatelů na Ethereu. Pokud je to schváleno, může číst data z blockchainů, ke kterým je uživatel připojen, a navrhovat uživateli podepisování zpráv a transakcí. Pro více informací se podívejte do [dokumentace MetaMasku](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents)!

Pokud `window.ethereum` _není_ přítomno, znamená to, že MetaMask není nainstalován. Výsledkem je vrácení JSON objektu, kde vrácená `address` je prázdný řetězec a JSX objekt `status` sděluje, že si uživatel musí nainstalovat MetaMask.

**Většina funkcí, které napíšeme, bude vracet JSON objekty, které můžeme použít k aktualizaci našich stavových proměnných a uživatelského rozhraní.**

Pokud _je_ `window.ethereum` přítomno, pak začíná být situace zajímavá.

Pomocí bloku try/catch se pokusíme připojit k MetaMasku zavoláním [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Zavolání této funkce otevře MetaMask v prohlížeči, čímž bude uživatel vyzván k připojení své peněženky k vaší dapp.

- Pokud se uživatel rozhodne připojit, `method: "eth_requestAccounts"` vrátí pole, které obsahuje všechny adresy účtů uživatele, které jsou připojeny k dapp. Celkově naše funkce `connectWallet` vrátí JSON objekt, který obsahuje _první_ `address` v tomto poli \(viz řádek 9\) a zprávu `status`, která vyzývá uživatele k napsání zprávy do chytrého kontraktu.
- Pokud uživatel připojení odmítne, pak JSON objekt bude obsahovat prázdný řetězec pro vrácenou `address` a zprávu `status`, která odráží, že uživatel připojení odmítl.

### Přidání funkce connectWallet do vaší UI komponenty Minter.js {#add-connect-wallet}

Nyní, když jsme napsali tuto funkci `connectWallet`, pojďme ji připojit k naší komponentě `Minter.js.`.

Nejprve budeme muset naimportovat naši funkci do našeho souboru `Minter.js` přidáním `import { connectWallet } from "./utils/interact.js";` na začátek souboru `Minter.js`. Vašich prvních 11 řádků v `Minter.js` by nyní mělo vypadat takto:

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  //Stavové proměnné
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
```

Poté uvnitř naší funkce `connectWalletPressed` zavoláme naši naimportovanou funkci `connectWallet` takto:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Všimli jste si, jak je většina naší funkcionality abstrahována od naší komponenty `Minter.js` do souboru `interact.js`? To proto, abychom dodrželi paradigma M-V-C!

V `connectWalletPressed` jednoduše provedeme volání s await na naši naimportovanou funkci `connectWallet` a pomocí její odpovědi aktualizujeme naše proměnné `status` a `walletAddress` prostřednictvím jejich stavových hooků.

Nyní uložme oba soubory `Minter.js` a `interact.js` a otestujme naše dosavadní uživatelské rozhraní.

Otevřete svůj prohlížeč na localhost:3000 a stiskněte tlačítko „Connect Wallet“ vpravo nahoře na stránce.

Pokud máte nainstalovaný MetaMask, měli byste být vyzváni k připojení vaší peněženky k vaší dapp. Přijměte výzvu k připojení.

Měli byste vidět, že tlačítko peněženky nyní odráží, že je vaše adresa připojena.

Dále zkuste obnovit stránku... to je zvláštní. Naše tlačítko peněženky nás vyzývá k připojení MetaMasku, i když už je připojen...

Ale nebojte se! Můžeme to snadno opravit implementací funkce zvané `getCurrentWalletConnected`, která zkontroluje, zda je adresa již připojena k naší dapp, a podle toho aktualizuje naše uživatelské rozhraní!

### Funkce getCurrentWalletConnected {#get-current-wallet}

Do vašeho souboru `interact.js` přidejte následující funkci `getCurrentWalletConnected`:

```javascript
export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Tento kód je _velmi_ podobný funkci `connectWallet`, kterou jsme napsali dříve.

Hlavní rozdíl je v tom, že místo volání metody `eth_requestAccounts`, která otevře MetaMask, aby uživatel mohl připojit svou peněženku, zde voláme metodu `eth_accounts`, která jednoduše vrátí pole obsahující adresy MetaMasku aktuálně připojené k naší dapp.

Abychom viděli tuto funkci v akci, zavolejme ji ve funkci `useEffect` naší komponenty `Minter.js`.

Stejně jako jsme to udělali pro `connectWallet`, musíme tuto funkci naimportovat z našeho souboru `interact.js` do našeho souboru `Minter.js` takto:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //importujte zde
} from "./utils/interact.js"
```

Nyní ji jednoduše zavoláme v naší funkci `useEffect`:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

Všimněte si, že používáme odpověď našeho volání `getCurrentWalletConnected` k aktualizaci našich stavových proměnných `walletAddress` a `status`.

Jakmile tento kód přidáte, zkuste obnovit okno prohlížeče. Tlačítko by mělo říkat, že jste připojeni, a zobrazovat náhled adresy vaší připojené peněženky – a to i po obnovení!

### Implementace addWalletListener {#implement-add-wallet-listener}

Posledním krokem v nastavení peněženky naší dapp je implementace posluchače peněženky, aby se naše uživatelské rozhraní aktualizovalo, když se změní stav naší peněženky, například když se uživatel odpojí nebo přepne účty.

Do vašeho souboru `Minter.js` přidejte funkci `addWalletListener`, která vypadá následovně:

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

Pojďme si v rychlosti rozebrat, co se zde děje:

- Nejprve naše funkce zkontroluje, zda je povoleno `window.ethereum` \(tj. zda je nainstalován MetaMask\).
  - Pokud není, jednoduše nastavíme naši stavovou proměnnou `status` na JSX řetězec, který vyzývá uživatele k instalaci MetaMasku.
  - Pokud je povoleno, nastavíme na řádku 3 posluchač `window.ethereum.on("accountsChanged")`, který naslouchá změnám stavu v peněžence MetaMask, což zahrnuje situace, kdy uživatel připojí k dapp další účet, přepne účty nebo účet odpojí. Pokud je připojen alespoň jeden účet, stavová proměnná `walletAddress` se aktualizuje jako první účet v poli `accounts` vráceném posluchačem. V opačném případě je `walletAddress` nastavena jako prázdný řetězec.

Nakonec ji musíme zavolat v naší funkci `useEffect`:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

A voilà! Dokončili jsme programování veškeré funkcionality naší peněženky! Nyní, když je naše peněženka nastavena, pojďme přijít na to, jak vyrazit naše NFT!

## Základy metadat NFT {#nft-metadata-101}

Vzpomeňte si na metadata NFT, o kterých jsme právě mluvili v Kroku 0 tohoto návodu – vdechují NFT život a umožňují mu mít vlastnosti, jako je digitální aktivum, název, popis a další atributy.

Tato metadata budeme muset nakonfigurovat jako JSON objekt a uložit je, abychom je mohli předat jako parametr `tokenURI` při volání funkce `mintNFT` našeho chytrého kontraktu.

Text v polích „Link to Asset“ (Odkaz na aktivum), „Name“ (Název) a „Description“ (Popis) bude tvořit různé vlastnosti metadat našeho NFT. Tato metadata naformátujeme jako JSON objekt, ale existuje několik možností, kam můžeme tento JSON objekt uložit:

- Mohli bychom ho uložit na blockchain Ethereum; to by však bylo velmi drahé.
- Mohli bychom ho uložit na centralizovaný server, jako je AWS nebo Firebase. To by ale popřelo náš étos decentralizace.
- Mohli bychom použít IPFS, decentralizovaný protokol a peer-to-peer síť pro ukládání a sdílení dat v distribuovaném souborovém systému. Vzhledem k tomu, že je tento protokol decentralizovaný a zdarma, je to naše nejlepší možnost!

K uložení našich metadat na IPFS použijeme [Pinata](https://pinata.cloud/), pohodlné API a sadu nástrojů pro IPFS. V dalším kroku si přesně vysvětlíme, jak na to!

## Použití Pinata k připnutí vašich metadat na IPFS {#use-pinata-to-pin-your-metadata-to-ipfs}

Pokud nemáte účet na [Pinata](https://pinata.cloud/), zaregistrujte si bezplatný účet [zde](https://app.pinata.cloud/auth/signup) a dokončete kroky k ověření vašeho e-mailu a účtu.

### Vytvoření vašeho API klíče Pinata {#create-pinata-api-key}

Přejděte na stránku [https://pinata.cloud/keys](https://pinata.cloud/keys), poté vyberte tlačítko „New Key“ nahoře, nastavte widget Admin jako povolený a pojmenujte svůj klíč.

Poté se vám zobrazí vyskakovací okno s informacemi o vašem API. Ujistěte se, že si je uložíte na bezpečné místo.

Nyní, když je náš klíč nastaven, pojďme ho přidat do našeho projektu, abychom ho mohli používat.

### Vytvoření souboru .env {#create-a-env}

Náš klíč a tajný klíč (secret) pro Pinata můžeme bezpečně uložit do souboru s proměnnými prostředí. Pojďme si do adresáře vašeho projektu nainstalovat [balíček dotenv](https://www.npmjs.com/package/dotenv).

Otevřete si novou kartu ve svém terminálu \(oddělenou od té, kde běží localhost\) a ujistěte se, že jste ve složce `minter-starter-files`, poté ve svém terminálu spusťte následující příkaz:

```text
npm install dotenv --save
```

Dále vytvořte soubor `.env` v kořenovém adresáři vaší složky `minter-starter-files` zadáním následujícího příkazu do příkazového řádku:

```javascript
vim.env
```

Tím se otevře váš soubor `.env` ve vimu \(textovém editoru\). Chcete-li jej uložit, stiskněte na klávesnici v tomto pořadí „esc“ + „:“ + „q“.

Dále ve VSCode přejděte do svého souboru `.env` a přidejte do něj svůj API klíč a tajný klíč pro Pinata takto:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

Uložte soubor a pak jste připraveni začít psát funkci pro nahrání vašich JSON metadat na IPFS!

### Implementace pinJSONToIPFS {#pin-json-to-ipfs}

Naštěstí pro nás má Pinata [API speciálně pro nahrávání JSON dat na IPFS](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) a praktický příklad v JavaScriptu s axios, který můžeme s drobnými úpravami použít.

Ve vaší složce `utils` vytvořme další soubor s názvem `pinata.js` a poté naimportujme náš tajný klíč a klíč pro Pinata ze souboru .env takto:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

Dále vložte do svého souboru `pinata.js` další kód z níže uvedeného příkladu. Nebojte se, rozebereme si, co všechno znamená!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //vytvoření axios POST požadavku na Pinata ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      }
    })
    .catch(function (error) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }
    })
}
```

Co tedy tento kód přesně dělá?

Nejprve importuje [axios](https://www.npmjs.com/package/axios), HTTP klienta založeného na promises pro prohlížeč a Node.js, kterého použijeme k vytvoření požadavku na Pinata.

Pak tu máme naši asynchronní funkci `pinJSONToIPFS`, která jako svůj vstup přijímá `JSONBody` a v hlavičce má API klíč a tajný klíč pro Pinata, to vše za účelem vytvoření POST požadavku na jejich API `pinJSONToIPFS`.

- Pokud je tento POST požadavek úspěšný, pak naše funkce vrátí JSON objekt s booleovskou hodnotou `success` jako true a `pinataUrl`, kam byla naše metadata připnuta. Tuto vrácenou `pinataUrl` použijeme jako vstup `tokenURI` pro funkci ražení našeho chytrého kontraktu.
- Pokud tento POST požadavek selže, pak naše funkce vrátí JSON objekt s booleovskou hodnotou `success` jako false a řetězcem `message`, který předává naši chybu.

Stejně jako u návratových typů naší funkce `connectWallet` vracíme JSON objekty, abychom mohli použít jejich parametry k aktualizaci našich stavových proměnných a uživatelského rozhraní.

## Načtení vašeho chytrého kontraktu {#load-your-smart-contract}

Nyní, když máme způsob, jak nahrát naše metadata NFT na IPFS prostřednictvím naší funkce `pinJSONToIPFS`, budeme potřebovat způsob, jak načíst instanci našeho chytrého kontraktu, abychom mohli zavolat jeho funkci `mintNFT`.

Jak jsme zmínili dříve, v tomto návodu budeme používat [tento existující chytrý kontrakt pro NFT](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE); pokud byste se však chtěli dozvědět, jak jsme ho vytvořili, nebo si vytvořit vlastní, vřele doporučujeme podívat se na náš další návod [„Jak vytvořit NFT“](https://www.alchemy.com/docs/how-to-create-an-nft).

### ABI kontraktu {#contract-abi}

Pokud jste naše soubory prozkoumali podrobně, všimli jste si, že v našem adresáři `src` je soubor `contract-abi.json`. ABI je nezbytné pro specifikaci toho, kterou funkci kontrakt vyvolá, a také pro zajištění toho, že funkce vrátí data ve formátu, který očekáváte.

Budeme také potřebovat API klíč Alchemy a Alchemy Web3 API, abychom se připojili k blockchainu Ethereum a načetli náš chytrý kontrakt.

### Vytvoření vašeho API klíče Alchemy {#create-alchemy-api}

Pokud ještě nemáte účet na Alchemy, [zaregistrujte se zdarma zde.](https://alchemy.com/?a=eth-org-nft-minter)

Jakmile si vytvoříte účet na Alchemy, můžete si vygenerovat API klíč vytvořením aplikace. To nám umožní provádět požadavky na testovací síť Ropsten.

Přejděte na stránku „Create App“ ve vašem Alchemy Dashboardu tak, že najedete myší na „Apps“ v navigačním panelu a kliknete na „Create App“.

Pojmenujte svou aplikaci (my jsme zvolili „My First NFT!“), nabídněte krátký popis, vyberte „Staging“ pro prostředí (Environment) používané pro účetnictví vaší aplikace a zvolte „Ropsten“ pro vaši síť (Network).

Klikněte na „Create app“ a to je vše! Vaše aplikace by se měla objevit v tabulce níže.

Úžasné, takže teď, když jsme vytvořili naši HTTP Alchemy API URL, zkopírujte si ji do schránky...

…a pak ji přidejme do našeho souboru `.env`. Celkově by váš soubor .env měl vypadat takto:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

Nyní, když máme naše ABI kontraktu a náš API klíč Alchemy, jsme připraveni načíst náš chytrý kontrakt pomocí [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).

### Nastavení vašeho endpointu Alchemy Web3 a kontraktu {#setup-alchemy-endpoint}

Nejprve, pokud ho ještě nemáte, budete si muset nainstalovat [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) přechodem do domovského adresáře: `nft-minter-tutorial` v terminálu:

```text
cd ..
npm install @alch/alchemy-web3
```

Dále se vraťme k našemu souboru `interact.js`. Na začátek souboru přidejte následující kód pro import vašeho klíče Alchemy ze souboru .env a nastavení vašeho endpointu Alchemy Web3:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) je wrapper kolem [Web3.js](https://docs.web3js.org/), který poskytuje vylepšené metody API a další klíčové výhody, které vám usnadní život jako vývojáři ve Web3. Je navržen tak, aby vyžadoval minimální konfiguraci, takže jej můžete začít používat ve své aplikaci hned!

Dále přidejme do našeho souboru ABI kontraktu a adresu kontraktu.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

Jakmile máme obojí, jsme připraveni začít programovat naši funkci pro ražení!

## Implementace funkce mintNFT {#implement-the-mintnft-function}

Uvnitř vašeho souboru `interact.js` definujme naši funkci `mintNFT`, která, jak název napovídá, vyrazí naše NFT.

Protože budeme provádět četná asynchronní volání \(na Pinata pro připnutí našich metadat na IPFS, na Alchemy Web3 pro načtení našeho chytrého kontraktu a na MetaMask pro podepsání našich transakcí\), bude naše funkce také asynchronní.

Třemi vstupy do naší funkce budou `url` našeho digitálního aktiva, `name` a `description`. Přidejte následující signaturu funkce pod funkci `connectWallet`:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### Zpracování chyb vstupu {#input-error-handling}

Přirozeně dává smysl mít na začátku funkce nějaké zpracování chyb vstupu, abychom tuto funkci opustili, pokud naše vstupní parametry nejsou správné. Uvnitř naší funkce přidejme následující kód:

```javascript
export const mintNFT = async (url, name, description) => {
  //zpracování chyb
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }
}
```

V podstatě, pokud je některý ze vstupních parametrů prázdný řetězec, pak vrátíme JSON objekt, kde je booleovská hodnota `success` false a řetězec `status` sděluje, že všechna pole v našem uživatelském rozhraní musí být vyplněna.

### Nahrání metadat na IPFS {#upload-metadata-to-ipfs}

Jakmile víme, že jsou naše metadata správně naformátována, dalším krokem je zabalit je do JSON objektu a nahrát je na IPFS prostřednictvím funkce `pinJSONToIPFS`, kterou jsme napsali!

K tomu musíme nejprve naimportovat funkci `pinJSONToIPFS` do našeho souboru `interact.js`. Úplně na začátek souboru `interact.js` přidejme:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

Připomeňme si, že `pinJSONToIPFS` přijímá tělo ve formátu JSON. Takže předtím, než ji zavoláme, budeme muset naformátovat naše parametry `url`, `name` a `description` do JSON objektu.

Aktualizujme náš kód tak, abychom vytvořili JSON objekt s názvem `metadata` a poté zavolali `pinJSONToIPFS` s tímto parametrem `metadata`:

```javascript
export const mintNFT = async (url, name, description) => {
  //zpracování chyb
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //vytvořit metadata
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //provést volání Pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

Všimněte si, že odpověď našeho volání `pinJSONToIPFS(metadata)` ukládáme do objektu `pinataResponse`. Poté tento objekt analyzujeme na případné chyby.

Pokud dojde k chybě, vrátíme JSON objekt, kde je booleovská hodnota `success` false a náš řetězec `status` sděluje, že naše volání selhalo. V opačném případě extrahujeme `pinataURL` z `pinataResponse` a uložíme ji jako naši proměnnou `tokenURI`.

Nyní je čas načíst náš chytrý kontrakt pomocí Alchemy Web3 API, které jsme inicializovali na začátku našeho souboru. Přidejte následující řádek kódu na konec funkce `mintNFT`, abyste nastavili kontrakt do globální proměnné `window.contract`:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

Poslední věc, kterou musíme přidat do naší funkce `mintNFT`, je naše transakce na Ethereu:

```javascript
//nastavit vaši Ethereum transakci
const transactionParameters = {
  to: contractAddress, // Vyžadováno kromě publikování kontraktu.
  from: window.ethereum.selectedAddress, // musí odpovídat aktivní adrese uživatele.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //provést volání NFT chytrého kontraktu
}

//podepsat transakci přes MetaMask
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 Something went wrong: " + error.message,
  }
}
```

Pokud jste již obeznámeni s transakcemi na Ethereu, všimnete si, že struktura je docela podobná tomu, co jste už viděli.

- Nejprve nastavíme parametry naší transakce.
  - `to` specifikuje adresu příjemce \(náš chytrý kontrakt\)
  - `from` specifikuje podepisujícího transakce \(připojenou adresu uživatele k MetaMasku: `window.ethereum.selectedAddress`\)
  - `data` obsahuje volání metody `mintNFT` našeho chytrého kontraktu, která jako vstupy přijímá naši `tokenURI` a adresu peněženky uživatele, `window.ethereum.selectedAddress`
- Poté provedeme volání s await, `window.ethereum.request,`, kde požádáme MetaMask o podepsání transakce. Všimněte si, že v tomto požadavku specifikujeme naši eth metodu \(eth_SentTransaction\) a předáváme naše `transactionParameters`. V tomto okamžiku se v prohlížeči otevře MetaMask a vyzve uživatele k podepsání nebo odmítnutí transakce.
  - Pokud je transakce úspěšná, funkce vrátí JSON objekt, kde je booleovská hodnota `success` nastavena na true a řetězec `status` vyzývá uživatele, aby se podíval na Etherscan pro více informací o své transakci.
  - Pokud transakce selže, funkce vrátí JSON objekt, kde je booleovská hodnota `success` nastavena na false a řetězec `status` předává chybovou zprávu.

Celkově by naše funkce `mintNFT` měla vypadat takto:

```javascript
export const mintNFT = async (url, name, description) => {
  //zpracování chyb
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //vytvořit metadata
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //Pinata pin požadavek
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //načíst chytrý kontrakt
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //nastavit vaši Ethereum transakci
  const transactionParameters = {
    to: contractAddress, // Vyžadováno kromě publikování kontraktu.
    from: window.ethereum.selectedAddress, // musí odpovídat aktivní adrese uživatele.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //provést volání NFT chytrého kontraktu
  }

  //podepsat transakci přes MetaMask
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
}
```

To je ale obrovská funkce! Nyní už jen musíme připojit naši funkci `mintNFT` k naší komponentě `Minter.js`...

## Připojení mintNFT k našemu frontendu Minter.js {#connect-our-frontend}

Otevřete svůj soubor `Minter.js` a aktualizujte řádek `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` nahoře takto:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

Nakonec implementujte funkci `onMintPressed`, abyste provedli volání s await na vaši naimportovanou funkci `mintNFT` a aktualizovali stavovou proměnnou `status` tak, aby odrážela, zda naše transakce byla úspěšná nebo selhala:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## Nasazení vašeho NFT na živou webovou stránku {#deploy-your-nft}

Jste připraveni spustit svůj projekt živě, aby s ním uživatelé mohli interagovat? Podívejte se na [tento návod](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online) pro nasazení vaší aplikace Minter na živou webovou stránku.

Ještě jeden poslední krok...

## Vezměte blockchainový svět útokem {#take-the-blockchain-world-by-storm}

Dělám si legraci, dostali jste se na konec návodu!

Abychom to shrnuli, vytvořením aplikace pro ražení NFT jste se úspěšně naučili, jak:

- Připojit se k MetaMasku přes váš frontendový projekt
- Volat metody chytrého kontraktu z vašeho frontendu
- Podepisovat transakce pomocí MetaMasku

Pravděpodobně byste se chtěli pochlubit NFT vyraženými prostřednictvím vaší dapp ve vaší peněžence – takže se určitě podívejte na náš rychlý návod [Jak si zobrazit NFT ve vaší peněžence](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet)!

A jako vždy, pokud máte nějaké dotazy, jsme tu, abychom vám pomohli na [Discordu Alchemy](https://discord.gg/gWuC7zB). Nemůžeme se dočkat, až uvidíme, jak koncepty z tohoto návodu uplatníte ve svých budoucích projektech!