---
title: "Návod na minter pro NFT"
description: "V tomto návodu si vytvoříte minter pro NFT a naučíte se, jak vytvořit full-stack dapp propojením svého chytrého kontraktu s React frontendem pomocí nástrojů MetaMask a Web3."
author: "smudgil"
tags:
  [
    "solidity",
    "NFT",
    "alchemy",
    "chytré kontrakty",
    "frontend",
    "Pinata"
  ]
skill: intermediate
breadcrumb: "NFT minter dapp"
lang: cs
published: 2021-10-06
---

Jednou z největších výzev pro vývojáře přicházející z prostředí Web2 je přijít na to, jak propojit chytrý kontrakt s frontendovým projektem a pracovat s ním.

Vytvořením minteru pro NFT – jednoduchého uživatelského rozhraní, do kterého můžete zadat odkaz na své digitální aktivum, název a popis – se naučíte:

- Připojit se k MetaMasku prostřednictvím vašeho frontendového projektu
- Volat metody chytrého kontraktu z vašeho frontendu
- Podepisovat transakce pomocí MetaMasku

V tomto návodu budeme jako náš frontendový framework používat [React](https://react.dev/). Protože se tento návod zaměřuje především na vývoj pro Web3, nebudeme trávit mnoho času rozebíráním základů Reactu. Místo toho se zaměříme na to, abychom našemu projektu dodali funkcionalitu.

Předpokladem je, že byste měli mít základní znalosti Reactu – vědět, jak fungují komponenty, props, useState/useEffect a základní volání funkcí. Pokud jste o žádném z těchto pojmů nikdy neslyšeli, možná se budete chtít podívat na tento [návod Úvod do Reactu](https://react.dev/learn/tutorial-tic-tac-toe). Těm, kteří se učí spíše vizuálně, vřele doporučujeme tuto vynikající sérii videí [Kompletní moderní návod na React](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) od Net Ninja.

A pokud ho ještě nemáte, budete k dokončení tohoto návodu a k vytváření čehokoli na blockchainu určitě potřebovat účet Alchemy. Zaregistrujte si bezplatný účet [zde](https://alchemy.com/).

Bez dalších okolků se do toho pusťme!

## Tvorba NFT 101 {#making-nfts-101}

Než se vůbec začneme dívat na jakýkoli kód, je důležité pochopit, jak funguje tvorba NFT. Zahrnuje to dva kroky:

### Zveřejnění chytrého kontraktu NFT na blockchainu Ethereum {#publish-nft}

Největší rozdíl mezi dvěma standardy chytrých kontraktů pro NFT je ten, že ERC-1155 je standard pro více tokenů a zahrnuje dávkovou funkcionalitu, zatímco ERC-721 je standard pro jeden token, a proto podporuje pouze přenos jednoho tokenu najednou.

### Volání funkce mintování {#minting-function}

Obvykle tato funkce mintování vyžaduje, abyste jako parametry předali dvě proměnné: zaprvé `recipient`, která určuje adresu, jež obdrží vaše nově namintované NFT, a zadruhé `tokenURI` NFT, což je řetězec, který odkazuje na dokument JSON popisující metadata NFT.

Metadata NFT jsou to, co ho skutečně oživuje a umožňuje mu mít vlastnosti, jako je název, popis, obrázek (nebo jiné digitální aktivum) a další atributy. [Zde je příklad tokenURI](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2), které obsahuje metadata NFT.

V tomto návodu se zaměříme na část 2, volání funkce mintování existujícího chytrého kontraktu NFT pomocí našeho uživatelského rozhraní React.

[Zde je odkaz](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) na chytrý kontrakt ERC-721 NFT, který budeme v tomto návodu volat. Pokud byste se chtěli dozvědět, jak jsme ho vytvořili, vřele doporučujeme podívat se na náš další návod, ["Jak vytvořit NFT"](https://www.alchemy.com/docs/how-to-create-an-nft).

Super, teď když chápeme, jak funguje tvorba NFT, naklonujme si naše startovací soubory!

## Naklonujte si startovací soubory {#clone-the-starter-files}

Nejprve přejděte do [GitHub repozitáře nft-minter-tutorial](https://github.com/alchemyplatform/nft-minter-tutorial), abyste získali startovací soubory pro tento projekt. Naklonujte tento repozitář do svého lokálního prostředí.

Když otevřete tento naklonovaný repozitář `nft-minter-tutorial`, všimnete si, že obsahuje dvě složky: `minter-starter-files` a `nft-minter`.

- `minter-starter-files` obsahuje startovací soubory (v podstatě uživatelské rozhraní React) pro tento projekt. V tomto návodu **budeme pracovat v tomto adresáři**, kde se naučíte, jak toto uživatelské rozhraní oživit připojením k vaší peněžence Ethereum a chytrému kontraktu NFT.
- `nft-minter` obsahuje celý dokončený návod a je vám k dispozici jako **reference**, **pokud se zaseknete.**

Dále otevřete svou kopii `minter-starter-files` v editoru kódu a poté přejděte do složky `src`.

Veškerý kód, který napíšeme, bude umístěn ve složce `src`. Budeme upravovat komponentu `Minter.js` a psát další javascriptové soubory, abychom našemu projektu dodali funkcionalitu Web3.

## Krok 2: Prohlédněte si naše startovací soubory {#step-2-check-out-our-starter-files}

Než začneme kódovat, je důležité si prohlédnout, co je pro nás již připraveno ve startovacích souborech.

### Spusťte svůj projekt v Reactu {#get-your-react-project-running}

Začněme spuštěním projektu React v našem prohlížeči. Krása Reactu spočívá v tom, že jakmile náš projekt běží v prohlížeči, veškeré uložené změny se v prohlížeči projeví v reálném čase.

Chcete-li projekt spustit, přejděte do kořenového adresáře složky `minter-starter-files` a spusťte v terminálu příkaz `npm install` pro instalaci závislostí projektu:

```bash
cd minter-starter-files
npm install
```

Jakmile se dokončí instalace, spusťte v terminálu `npm start`:

```bash
npm start
```

Tím by se vám měl v prohlížeči otevřít http://localhost:3000/, kde uvidíte frontend našeho projektu. Měl by se skládat ze 3 polí: místo pro zadání odkazu na aktivum vašeho NFT, zadání názvu vašeho NFT a poskytnutí popisu.

Pokud se pokusíte kliknout na tlačítka „Připojit peněženku“ nebo „Mintovat NFT“, zjistíte, že nefungují – to proto, že jejich funkcionalitu musíme teprve naprogramovat! :\)

### Komponenta Minter.js {#minter-js}

**POZNÁMKA:** Ujistěte se, že se nacházíte ve složce `minter-starter-files` a ne ve složce `nft-minter`!

Vraťme se do složky `src` v našem editoru a otevřete soubor `Minter.js`. Je nesmírně důležité, abychom všemu v tomto souboru rozuměli, protože se jedná o primární komponentu Reactu, na které budeme pracovat.

V horní části tohoto souboru máme naše stavové proměnné, které budeme aktualizovat po konkrétních událostech.

```javascript
//Stavové proměnné
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

Nikdy jste neslyšeli o stavových proměnných Reactu nebo stavových hácích (hooks)? Podívejte se na [tuto](https://legacy.reactjs.org/docs/hooks-state.html) dokumentaci.

Zde je přehled toho, co jednotlivé proměnné představují:

- `walletAddress` – řetězec, který ukládá adresu peněženky uživatele
- `status` – řetězec, který obsahuje zprávu k zobrazení v dolní části uživatelského rozhraní
- `name` – řetězec, který ukládá název NFT
- `description` – řetězec, který ukládá popis NFT
- `url` – řetězec, který je odkazem na digitální aktivum NFT

Po stavových proměnných uvidíte tři neimplementované funkce: `useEffect`, `connectWalletPressed` a `onMintPressed`. Všimnete si, že všechny tyto funkce jsou `async`, protože v nich budeme provádět asynchronní volání API! Jejich názvy jsou synonymem jejich funkcí:

```javascript
useEffect(async () => {
  //TODO: implementovat
}, [])

const connectWalletPressed = async () => {
  //TODO: implementovat
}

const onMintPressed = async () => {
  //TODO: implementovat
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) – toto je React hook, který se volá po vykreslení vaší komponenty. Protože má předanou prázdnou rekvizitu pole `[]` (viz řádek 3), bude volána pouze při _prvním_ vykreslení komponenty. Zde zavoláme náš posluchač peněženky a další funkci peněženky, abychom aktualizovali naše uživatelské rozhraní tak, aby odráželo, zda je peněženka již připojena.
- `connectWalletPressed` – tato funkce bude volána pro připojení peněženky MetaMask uživatele k naší dapp.
- `onMintPressed` – tato funkce bude volána pro mintování NFT uživatele.

Na konci tohoto souboru máme uživatelské rozhraní naší komponenty. Pokud si tento kód pečlivě projdete, všimnete si, že aktualizujeme naše stavové proměnné `url`, `name` a `description` při změně vstupu v jejich odpovídajících textových polích.

Také uvidíte, že `connectWalletPressed` a `onMintPressed` se volají při kliknutí na tlačítka s ID `mintButton` a `walletButton`.

```javascript
//uživatelské rozhraní naší komponenty
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Připojeno: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Připojit peněženku</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Minter NFT od Alchemy</h1>
    <p>
      Jednoduše přidejte odkaz na své aktivum, název a popis a poté stiskněte „Mintovat“.
    </p>
    <form>
      <h2>🖼 Odkaz na aktivum: </h2>
      <input
        type="text"
        placeholder="např., https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Název: </h2>
      <input
        type="text"
        placeholder="např., Moje první NFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Popis: </h2>
      <input
        type="text"
        placeholder="např., Ještě víc cool než cryptokitties ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      Mintovat NFT
    </button>
    <p id="status">{status}</p>
</div>
)
```

Nakonec se podívejme, kam se tato komponenta Minter přidává.

Pokud přejdete do souboru `App.js`, který je hlavní komponentou v Reactu a funguje jako kontejner pro všechny ostatní komponenty, uvidíte, že naše komponenta Minter je vložena na řádku 7.

**V tomto návodu budeme upravovat pouze soubor `Minter.js` a přidávat soubory do naší složky `src`.**

Nyní, když chápeme, s čím pracujeme, nastavme si naši peněženku Ethereum!

## Nastavte si svou peněženku Ethereum {#set-up-your-ethereum-wallet}

Aby uživatelé mohli interagovat s vaším chytrým kontraktem, budou muset ke své dapp připojit svou peněženku Ethereum.

### Stáhněte si MetaMask {#download-metamask}

Pro tento výukový program použijeme MetaMask, virtuální peněženku v prohlížeči, která slouží ke správě adresy vašeho ethereového účtu. Pokud chcete lépe porozumět tomu, jak fungují transakce na Ethereu, podívejte se na [tuto stránku](/developers/docs/transactions/).

Účet MetaMask si můžete zdarma stáhnout a vytvořit [zde](https://metamask.io/download). Při vytváření účtu, nebo pokud již účet máte, se ujistěte, že jste vpravo nahoře přepnuli na „Ropsten Test Network“ (abychom nepracovali se skutečnými penězi).

### Přidejte ether z Faucetu {#add-ether-from-faucet}

Abychom mohli mintovat naše NFT (nebo podepisovat jakékoli transakce na blockchainu Ethereum), budeme potřebovat nějaké falešné Eth. Pro získání Eth můžete přejít na [Ropsten faucet](https://faucet.ropsten.be/), zadat adresu svého účtu Ropsten a kliknout na „Send Ropsten Eth“. Krátce poté byste měli vidět Eth ve svém účtu MetaMask!

### Zkontrolujte si zůstatek {#check-your-balance}

Abychom si ověřili, že náš zůstatek je k dispozici, proveďte požadavek [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) pomocí [nástroje Composer od Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Tím získáte množství Eth ve vaší peněžence. Po zadání adresy vašeho účtu MetaMask a kliknutí na „Send Request“ byste měli vidět takovouto odpověď:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**POZNÁMKA:** Tento výsledek je ve wei, nikoli v eth. Wei se používá jako nejmenší denominace etheru. Převod z wei na eth je: 1 eth = 10¹⁸ wei. Takže pokud převedeme 0xde0b6b3a7640000 na desetinné číslo, dostaneme 1\*10¹⁸, což se rovná 1 eth.

Uf! Naše falešné peníze jsou všechny tam! <Emoji text=":money_mouth_face:" size={1} />

## Připojte MetaMask k vašemu UI {#connect-metamask-to-your-UI}

Nyní, když je naše peněženka MetaMask nastavena, připojme k ní naši dapp!

Protože se chceme držet paradigmatu [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), vytvoříme si samostatný soubor, který bude obsahovat naše funkce pro správu logiky, dat a pravidel naší dapp, a poté tyto funkce předáme našemu frontendu (naší komponentě Minter.js).

### Funkce `connectWallet` {#connect-wallet-function}

K tomu si vytvoříme novou složku s názvem `utils` ve vašem adresáři `src` a do ní přidáme soubor s názvem `interact.js`, který bude obsahovat všechny naše funkce pro interakci s peněženkou a chytrým kontraktem.

V našem souboru `interact.js` napíšeme funkci `connectWallet`, kterou pak naimportujeme a zavoláme v naší komponentě `Minter.js`.

Do svého souboru `interact.js` přidejte následující

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Napište zprávu do textového pole výše.",
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
              Do prohlížeče si musíte nainstalovat MetaMask, virtuální peněženku pro Ethereum.
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

`window.ethereum` je globální API, které vkládá MetaMask a další poskytovatelé peněženek a které webovým stránkám umožňuje žádat o účty uživatelů Etherea. Pokud je schváleno, může číst data z blockchainů, ke kterým je uživatel připojen, a navrhovat uživateli podepisování zpráv a transakcí. Pro více informací se podívejte do [dokumentace MetaMasku](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents)!

Pokud `window.ethereum` _není_ přítomno, znamená to, že MetaMask není nainstalován. Výsledkem je vrácení objektu JSON, kde vrácená `adresa` je prázdný řetězec a objekt JSX `status` sděluje, že uživatel si musí nainstalovat MetaMask.

**Většina funkcí, které napíšeme, bude vracet objekty JSON, které můžeme použít k aktualizaci našich stavových proměnných a uživatelského rozhraní.**

Pokud `window.ethereum` _je_ přítomno, pak to začne být zajímavé.

Pomocí smyčky try/catch se pokusíme připojit k MetaMasku voláním [`window.ethereum.request({ method: \"eth_requestAccounts\" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Volání této funkce otevře MetaMask v prohlížeči, kde bude uživatel vyzván k připojení své peněženky k vaší dapp.

- Pokud se uživatel rozhodne připojit, `method: \"eth_requestAccounts\"` vrátí pole, které obsahuje všechny adresy účtů uživatele připojené k dapp. Celkově naše funkce `connectWallet` vrátí objekt JSON, který obsahuje _první_ `adresu` v tomto poli (viz řádek 9) a zprávu `status`, která vyzve uživatele k napsání zprávy do chytrého kontraktu.
- Pokud uživatel spojení odmítne, objekt JSON bude obsahovat prázdný řetězec pro vrácenou `adresu` a zprávu `status`, která odráží, že uživatel spojení odmítl.

### Přidejte funkci connectWallet do své komponenty UI Minter.js {#add-connect-wallet}

Nyní, když jsme napsali tuto funkci `connectWallet`, připojme ji k naší komponentě `Minter.js`.

Nejprve budeme muset naimportovat naši funkci do našeho souboru `Minter.js` přidáním `import { connectWallet } from \"./utils/interact.js\";` na začátek souboru `Minter.js`. Vašich prvních 11 řádků souboru `Minter.js` by nyní mělo vypadat takto:

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

Poté uvnitř naší funkce `connectWalletPressed` zavoláme naši importovanou funkci `connectWallet` takto:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Všimněte si, jak je většina naší funkcionality abstrahována z naší komponenty `Minter.js` ze souboru `interact.js`? To proto, abychom dodrželi paradigma M-V-C!

V `connectWalletPressed` jednoduše provedeme await volání naší importované funkce `connectWallet` a pomocí její odpovědi aktualizujeme naše proměnné `status` a `walletAddress` prostřednictvím jejich stavových háků (hooks).

Nyní uložme oba soubory `Minter.js` a `interact.js` a vyzkoušejme naše dosavadní uživatelské rozhraní.

Otevřete svůj prohlížeč na adrese localhost:3000 a stiskněte tlačítko „Připojit peněženku“ vpravo nahoře na stránce.

Pokud máte nainstalovaný MetaMask, měli byste být vyzváni k připojení své peněženky k vaší dapp. Přijměte výzvu k připojení.

Měli byste vidět, že tlačítko peněženky nyní ukazuje, že je vaše adresa připojena.

Dále zkuste obnovit stránku... to je divné. Naše tlačítko peněženky nás vyzývá k připojení MetaMasku, i když už je připojen...

Ale nebojte se! To můžeme snadno opravit implementací funkce nazvané `getCurrentWalletConnected`, která zkontroluje, zda je adresa již připojena k naší dapp, a podle toho aktualizuje naše uživatelské rozhraní!

### Funkce getCurrentWalletConnected {#get-current-wallet}

Do svého souboru `interact.js` přidejte následující funkci `getCurrentWalletConnected`:

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
          status: "👆🏽 Napište zprávu do textového pole výše.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Připojte se k MetaMasku pomocí tlačítka vpravo nahoře.",
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
              Do prohlížeče si musíte nainstalovat MetaMask, virtuální peněženku pro Ethereum.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Tento kód je _velmi_ podobný funkci `connectWallet`, kterou jsme napsali dříve.

Hlavní rozdíl je v tom, že místo volání metody `eth_requestAccounts`, která otevře MetaMask, aby si uživatel mohl připojit svou peněženku, zde voláme metodu `eth_accounts`, která jednoduše vrací pole obsahující adresy MetaMask aktuálně připojené k naší dapp.

Abychom viděli tuto funkci v akci, zavoláme ji ve funkci `useEffect` naší komponenty `Minter.js`.

Stejně jako u `connectWallet` musíme tuto funkci naimportovat z našeho souboru `interact.js` do našeho souboru `Minter.js` takto:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //importovat zde
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

Všimněte si, že odpověď z našeho volání `getCurrentWalletConnected` používáme k aktualizaci našich stavových proměnných `walletAddress` a `status`.

Jakmile přidáte tento kód, zkuste obnovit okno prohlížeče. Tlačítko by mělo hlásit, že jste připojeni, a zobrazovat náhled adresy vaší připojené peněženky – i po obnovení!

### Implementujte addWalletListener {#implement-add-wallet-listener}

Posledním krokem v nastavení peněženky naší dapp je implementace posluchače peněženky, aby se naše uživatelské rozhraní aktualizovalo, když se změní stav naší peněženky, například když se uživatel odpojí nebo přepne účty.

Do svého souboru `Minter.js` přidejte funkci `addWalletListener`, která vypadá následovně:

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Napište zprávu do textového pole výše.")
      } else {
        setWallet("")
        setStatus("🦊 Připojte se k MetaMasku pomocí tlačítka vpravo nahoře.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          Do prohlížeče si musíte nainstalovat MetaMask, virtuální peněženku pro Ethereum.
        </a>
      </p>
    )
  }
}
```

Pojďme si rychle rozebrat, co se zde děje:

- Nejprve naše funkce zkontroluje, zda je `window.ethereum` povoleno (tj. zda je MetaMask nainstalován).
  - Pokud není, jednoduše nastavíme naši stavovou proměnnou `status` na řetězec JSX, který uživatele vyzve k instalaci MetaMasku.
  - Pokud je povoleno, nastavíme na řádku 3 posluchače `window.ethereum.on(\"accountsChanged\")`, který naslouchá změnám stavu v peněžence MetaMask, což zahrnuje případy, kdy uživatel připojí další účet k dapp, přepne účty nebo odpojí účet. Pokud je připojen alespoň jeden účet, stavová proměnná `walletAddress` se aktualizuje jako první účet v poli `accounts` vráceném posluchačem. V opačném případě je `walletAddress` nastaveno jako prázdný řetězec.

Nakonec ji musíme zavolat v naší funkci `useEffect`:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

A je to! Dokončili jsme programování veškeré funkcionality naší peněženky! Nyní, když je naše peněženka nastavena, pojďme zjistit, jak mintovat naše NFT!

## Metadata NFT 101 {#nft-metadata-101}

Vzpomeňte si na metadata NFT, o kterých jsme mluvili v kroku 0 tohoto návodu – oživují NFT a umožňují mu mít vlastnosti, jako je digitální aktivum, název, popis a další atributy.

Tato metadata budeme muset nakonfigurovat jako objekt JSON a uložit je, abychom je mohli předat jako parametr `tokenURI` při volání funkce `mintNFT` našeho chytrého kontraktu.

Text v polích „Odkaz na aktivum“, „Název“ a „Popis“ bude tvořit různé vlastnosti metadat našeho NFT. Tato metadata naformátujeme jako objekt JSON, ale existuje několik možností, kde tento objekt JSON můžeme uložit:

- Mohli bychom je uložit na blockchainu Ethereum, avšak to by bylo velmi drahé.
- Mohli bychom je uložit na centralizovaném serveru, jako je AWS nebo Firebase. To by ale bylo v rozporu s naším decentralizačním étosem.
- Mohli bychom použít IPFS, decentralizovaný protokol a peer-to-peer síť pro ukládání a sdílení dat v distribuovaném souborovém systému. Protože je tento protokol decentralizovaný a bezplatný, je to naše nejlepší volba!

K uložení našich metadat na IPFS použijeme [Pinata](https://pinata.cloud/), pohodlné API a sadu nástrojů pro IPFS. V dalším kroku si přesně vysvětlíme, jak na to!

## Použijte Pinata k připnutí vašich metadat na IPFS {#use-pinata-to-pin-your-metadata-to-IPFS}

Pokud nemáte účet [Pinata](https://pinata.cloud/), zaregistrujte si bezplatný účet [zde](https://app.pinata.cloud/auth/signup) a dokončete kroky k ověření svého e-mailu a účtu.

### Vytvořte si API klíč Pinata {#create-pinata-api-key}

Přejděte na stránku [https://pinata.cloud/keys](https://pinata.cloud/keys), poté vyberte tlačítko „New Key“ nahoře, nastavte widget Admin jako povolený a pojmenujte svůj klíč.

Poté se vám zobrazí vyskakovací okno s vašimi informacemi o API. Ujistěte se, že si je uložíte na bezpečné místo.

Nyní, když máme náš klíč nastavený, přidejme ho do našeho projektu, abychom ho mohli používat.

### Vytvořte soubor .env {#create-a-env}

Náš klíč Pinata a tajný klíč můžeme bezpečně uložit do souboru s proměnnými prostředí. Nainstalujme si do adresáře projektu [balíček dotenv](https://www.npmjs.com/package/dotenv).

Otevřete novou kartu v terminálu (jinou než tu, na které běží localhost), ujistěte se, že se nacházíte ve složce `minter-starter-files` a spusťte následující příkaz:

```text
npm install dotenv --save
```

Dále vytvořte soubor `.env` v kořenovém adresáři `minter-starter-files` zadáním následujícího příkazu:

```javascript
vim.env
```

Tím se vám otevře soubor `.env` ve vimu (textovém editoru). Pro uložení stiskněte na klávesnici v tomto pořadí „esc“ + „:“ + „q“.

Dále v editoru VSCode přejděte do souboru `.env` a přidejte do něj svůj API klíč Pinata a API secret takto:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

Uložte soubor a pak jste připraveni začít psát funkci pro nahrání vašich metadat JSON na IPFS!

### Implementujte pinJSONToIPFS {#pin-json-to-ipfs}

Naštěstí pro nás má Pinata [API speciálně pro nahrávání dat JSON na IPFS](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) a pohodlný příklad v JavaScriptu s axios, který můžeme s drobnými úpravami použít.

Ve složce `utils` vytvořme další soubor s názvem `pinata.js` a poté naimportujme náš Pinata secret a klíč ze souboru .env takto:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

Dále vložte další kód z níže uvedeného do svého souboru `pinata.js`. Nebojte se, rozebereme si, co všechno znamená!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //odeslání POST požadavku pomocí axios na Pinata ⬇️
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

Co přesně tedy tento kód dělá?

Nejprve importuje [axios](https://www.npmjs.com/package/axios), HTTP klienta založeného na promises pro prohlížeč a node.js, který použijeme k provedení požadavku na Pinata.

Poté máme naši asynchronní funkci `pinJSONToIPFS`, která jako vstup přijímá `JSONBody` a v hlavičce API klíč a secret Pinata, a to vše pro provedení POST požadavku na jejich API `pinJSONToIPFS`.

- Pokud je tento POST požadavek úspěšný, naše funkce vrátí objekt JSON s booleovskou hodnotou `success` jako true a `pinataUrl`, kde byla naše metadata připnuta. Tuto vrácenou `pinataUrl` použijeme jako vstup `tokenURI` do funkce mintování našeho chytrého kontraktu.
- Pokud tento post požadavek selže, naše funkce vrátí objekt JSON s booleovskou hodnotou `success` jako false a řetězcem `message`, který sděluje naši chybu.

Stejně jako u návratových typů naší funkce `connectWallet` vracíme objekty JSON, abychom mohli jejich parametry použít k aktualizaci našich stavových proměnných a uživatelského rozhraní.

## Načtěte svůj chytrý kontrakt {#load-your-smart-contract}

Nyní, když máme způsob, jak nahrát naše metadata NFT na IPFS prostřednictvím naší funkce `pinJSONToIPFS`, budeme potřebovat způsob, jak načíst instanci našeho chytrého kontraktu, abychom mohli volat jeho funkci `mintNFT`.

Jak jsme již zmínili, v tomto návodu budeme používat [tento existující chytrý kontrakt NFT](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE); nicméně, pokud byste se chtěli dozvědět, jak jsme ho vytvořili, nebo si vytvořit vlastní, vřele doporučujeme podívat se na náš další návod ["Jak vytvořit NFT"](https://www.alchemy.com/docs/how-to-create-an-nft).

### ABI kontraktu {#contract-abi}

Pokud jste si naše soubory pozorně prohlédli, jistě jste si všimli, že v našem adresáři `src` se nachází soubor `contract-abi.json`. ABI je nezbytné pro specifikaci, kterou funkci kontrakt vyvolá, a také pro zajištění, že funkce vrátí data ve formátu, který očekáváte.

Budeme také potřebovat API klíč Alchemy a Alchemy Web3 API, abychom se připojili k blockchainu Ethereum a načetli náš chytrý kontrakt.

### Vytvořte si API klíč Alchemy {#create-alchemy-api}

Pokud ještě nemáte účet Alchemy, [zaregistrujte se zdarma zde.](https://alchemy.com/?a=eth-org-nft-minter)

Jakmile si vytvoříte účet na Alchemy, můžete si vygenerovat klíč API vytvořením aplikace. To nám umožní provádět požadavky na testovací síť Ropsten.

Přejděte na stránku „Create App“ ve svém panelu Alchemy tak, že najedete myší na „Apps“ v navigační liště a kliknete na „Create App“.

Pojmenujte svou aplikaci – my jsme zvolili „My First NFT!“, nabídněte krátký popis, vyberte „Staging“ pro prostředí používané pro účetnictví vaší aplikace a jako síť zvolte „Ropsten“.

Klikněte na „Create app“ a to je vše! Vaše aplikace by se měla objevit v tabulce níže.

Skvělé, takže teď, když jsme vytvořili naši HTTP Alchemy API URL, zkopírujte si ji do schránky...

… a poté ji přidejme do našeho souboru `.env`. Celkově by váš soubor .env měl vypadat takto:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

Nyní, když máme naše ABI kontraktu a náš API klíč Alchemy, jsme připraveni načíst náš chytrý kontrakt pomocí [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).

### Nastavte si svůj koncový bod Alchemy Web3 a kontrakt {#setup-alchemy-endpoint}

Nejprve, pokud ho ještě nemáte, budete muset nainstalovat [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) tak, že přejdete do domovského adresáře: `nft-minter-tutorial` v terminálu:

```text
cd ..
npm install @alch/alchemy-web3
```

Dále se vraťme do našeho souboru `interact.js`. Na začátek souboru přidejte následující kód, abyste naimportovali svůj klíč Alchemy ze souboru .env a nastavili si svůj koncový bod Alchemy Web3:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) je nadstavba nad [Web3.js](https://docs.web3js.org/), která poskytuje vylepšené metody API a další klíčové výhody, které vám usnadní život vývojáře web3. Je navržen tak, aby vyžadoval minimální konfiguraci, takže jej můžete ve své aplikaci začít používat okamžitě!

Dále přidejme do našeho souboru ABI a adresu kontraktu.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

Jakmile máme obojí, jsme připraveni začít kódovat naši funkci mintování!

## Implementujte funkci mintNFT {#implement-the-mintnft-function}

Uvnitř vašeho souboru `interact.js` definujme naši funkci `mintNFT`, která bude, jak název napovídá, mintovat naše NFT.

Protože budeme provádět četná asynchronní volání (na Pinata pro připnutí našich metadat na IPFS, Alchemy Web3 pro načtení našeho chytrého kontraktu a MetaMask pro podepsání našich transakcí), bude naše funkce také asynchronní.

Tři vstupy do naší funkce budou `url` našeho digitálního aktiva, `name` a `description`. Pod funkci `connectWallet` přidejte následující signaturu funkce:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### Zpracování chyb na vstupu {#input-error-handling}

Je samozřejmě logické mít na začátku funkce nějaké zpracování chyb na vstupu, takže z této funkce odejdeme, pokud naše vstupní parametry nejsou správné. Do naší funkce přidejme následující kód:

```javascript
export const mintNFT = async (url, name, description) => {
  //zpracování chyb
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Před mintováním se prosím ujistěte, že jsou všechna pole vyplněna.",
    }
  }
}
```

V podstatě, pokud je některý ze vstupních parametrů prázdný řetězec, vrátíme objekt JSON, kde je booleovská hodnota `success` false a řetězec `status` sděluje, že všechna pole v našem uživatelském rozhraní musí být vyplněna.

### Nahrajte metadata na IPFS {#upload-metadata-to-ipfs}

Jakmile víme, že jsou naše metadata správně naformátována, dalším krokem je zabalit je do objektu JSON a nahrát je na IPFS prostřednictvím funkce `pinJSONToIPFS`, kterou jsme napsali!

K tomu musíme nejprve naimportovat funkci `pinJSONToIPFS` do našeho souboru `interact.js`. Na samý začátek `interact.js` přidejme:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

Vzpomeňte si, že `pinJSONToIPFS` přijímá jako vstup tělo JSON. Takže než ji zavoláme, budeme muset naformátovat naše parametry `url`, `name` a `description` do objektu JSON.

Aktualizujme náš kód tak, aby vytvořil objekt JSON nazvaný `metadata` a poté proveďme volání `pinJSONToIPFS` s tímto parametrem `metadata`:

```javascript
export const mintNFT = async (url, name, description) => {
  //zpracování chyb
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Před mintováním se prosím ujistěte, že jsou všechna pole vyplněna.",
    }
  }

  //vytvořit metadata
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //volání pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Něco se pokazilo při nahrávání vašeho tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

Všimněte si, že odpověď na naše volání `pinJSONToIPFS(metadata)` ukládáme do objektu `pinataResponse`. Poté tento objekt analyzujeme na případné chyby.

Pokud dojde k chybě, vrátíme objekt JSON, kde je booleovská hodnota `success` false a náš řetězec `status` sděluje, že naše volání selhalo. V opačném případě extrahujeme `pinataURL` z `pinataResponse` a uložíme ji jako naši proměnnou `tokenURI`.

Nyní je čas načíst náš chytrý kontrakt pomocí Alchemy Web3 API, které jsme inicializovali na začátku našeho souboru. Na konec funkce `mintNFT` přidejte následující řádek kódu, který nastaví kontrakt na globální proměnnou `window.contract`:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

Poslední věc, kterou je třeba přidat do naší funkce `mintNFT`, je naše transakce Ethereum:

```javascript
//nastavte si svou transakci Ethereum
const transactionParameters = {
  to: contractAddress, // Povinné s výjimkou zveřejnění kontraktu.
  from: window.ethereum.selectedAddress, // musí odpovídat aktivní adrese uživatele.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //provést volání chytrého kontraktu NFT
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
      "✅ Podívejte se na svou transakci na Etherscanu: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 Něco se pokazilo: " + error.message,
  }
}
```

Pokud jste již obeznámeni s transakcemi na Ethereu, všimnete si, že struktura je docela podobná tomu, co jste již viděli.

- Nejprve nastavíme naše parametry transakce.
  - `to` určuje adresu příjemce (náš chytrý kontrakt)
  - `from` určuje podepisujícího transakce (připojená adresa uživatele k MetaMasku: `window.ethereum.selectedAddress`)
  - `data` obsahuje volání metody `mintNFT` našeho chytrého kontraktu, která jako vstup přijímá náš `tokenURI` a adresu peněženky uživatele, `window.ethereum.selectedAddress`
- Poté provedeme await volání `window.ethereum.request`, kde požádáme MetaMask o podepsání transakce. Všimněte si, že v tomto požadavku specifikujeme naši eth metodu (eth_SentTransaction) a předáváme naše `transactionParameters`. V tomto okamžiku se v prohlížeči otevře MetaMask a vyzve uživatele k podepsání nebo zamítnutí transakce.
  - Pokud je transakce úspěšná, funkce vrátí objekt JSON, kde je booleovská hodnota `success` nastavena na true a řetězec `status` vyzve uživatele, aby se podíval na Etherscan pro více informací o své transakci.
  - Pokud transakce selže, funkce vrátí objekt JSON, kde je booleovská hodnota `success` nastavena na false a řetězec `status` sděluje chybovou zprávu.

Celkově by naše funkce `mintNFT` měla vypadat takto:

```javascript
export const mintNFT = async (url, name, description) => {
  //zpracování chyb
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Před mintováním se prosím ujistěte, že jsou všechna pole vyplněna.",
    }
  }

  //vytvořit metadata
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //žádost o připnutí pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Něco se pokazilo při nahrávání vašeho tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //načíst chytrý kontrakt
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //nastavte si svou transakci Ethereum
  const transactionParameters = {
    to: contractAddress, // Povinné s výjimkou zveřejnění kontraktu.
    from: window.ethereum.selectedAddress, // musí odpovídat aktivní adrese uživatele.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //provést volání chytrého kontraktu NFT
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
        "✅ Podívejte se na svou transakci na Etherscanu: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Něco se pokazilo: " + error.message,
    }
  }
}
```

To je jedna obrovská funkce! Nyní už jen stačí připojit naši funkci `mintNFT` k naší komponentě `Minter.js`...

## Připojte mintNFT k našemu frontendu Minter.js {#connect-our-frontend}

Otevřete svůj soubor `Minter.js` a aktualizujte řádek `import { connectWallet, getCurrentWalletConnected } from \"./utils/interact.js\";` na začátku na:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

Nakonec implementujte funkci `onMintPressed`, abyste provedli await volání na vaši importovanou funkci `mintNFT` a aktualizovali stavovou proměnnou `status` tak, aby odrážela, zda naše transakce uspěla nebo selhala:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## Nasaďte své NFT na živou webovou stránku {#deploy-your-NFT}

Jste připraveni uvést svůj projekt do provozu, aby s ním uživatelé mohli interagovat? Podívejte se na [tento návod](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online) pro nasazení vašeho Minteru na živou webovou stránku.

Ještě poslední krok...

## Dobijte svět blockchainu {#take-the-blockchain-world-by-storm}

Děláme si legraci, dostali jste se až na konec návodu!

Abychom to shrnuli, vytvořením minteru NFT jste se úspěšně naučili, jak:

- Připojit se k MetaMasku prostřednictvím vašeho frontendového projektu
- Volat metody chytrého kontraktu z vašeho frontendu
- Podepisovat transakce pomocí MetaMasku

Pravděpodobně se budete chtít pochlubit NFT vyraženými prostřednictvím vaší dapp ve své peněžence – proto se určitě podívejte na náš rychlý návod [Jak si zobrazit NFT ve vaší peněžence](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet)!

A jako vždy, pokud máte nějaké dotazy, jsme tu, abychom vám pomohli na [Alchemy Discordu](https://discord.gg/gWuC7zB). Nemůžeme se dočkat, až uvidíme, jak koncepty z tohoto návodu uplatníte ve svých budoucích projektech!
