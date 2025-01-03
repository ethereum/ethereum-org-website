---
title: Contractul inteligent „Hello World” pentru începători
description: Tutorial introductiv despre scrierea și implementarea unui contract inteligent simplu pe Ethereum.
author: "elanh"
tags:
  - "solidity"
  - "hardhat"
  - "alchemy"
  - "contractele inteligente"
  - "noțiuni de bază"
  - "implementare"
skill: beginner
lang: ro
published: 2021-03-31
---

Dacă nu aţi mai efectuat dezvoltare de blockchain și nu știți de unde să începeți sau dacă doriți doar să înțelegeți cum să implementați și să interacționați cu contractele inteligente, acest ghid este pentru dumneavoastră. Vom parcurge procesul de creare și implementare a unui contract inteligent simplu pe rețeaua de testare Ropsten, folosind un portofel virtual ([MetaMask)](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/) și [Alchemy](https://alchemyapi.io/eth) (nu vă îngrijorați dacă nu înțelegeți încă ce înseamnă toate acestea, vă vom explica).

În partea a 2-a a acestui tutorial, veți vedea cum să interacționați cu contractul nostru inteligent odată ce a fost implementat, iar în partea a 3-a, cum să-l publicați pe Etherscan.

Dacă aveți întrebări pe parcurs, nu ezitați să ne contactați pe canalul [Discord Alchemy](https://discord.gg/gWuC7zB)!

## Etapa 1: Conectarea la rețeaua Ethereum {#step-1}

Există diferite modalități de a face solicitări în lanțul Ethereum. Pentru simplitate, vom folosi un cont gratuit pe Alchemy, o platformă pentru dezvoltatorii blockchain și un API care ne permite să comunicăm cu lanțul Ethereum fără a fi nevoie să rulăm propriile noduri. Platforma are și instrumente de dezvoltator pentru monitorizare și analiză, de care vom profita în acest tutorial pentru a înțelege ce se întâmplă în culise în timpul implementării contractului nostru inteligent. Dacă nu aveți deja un cont Alchemy, [vă puteți înregistra gratuit aici](https://dashboard.alchemyapi.io/signup).

## Etapa 2: Crearea aplicației (și cheia API) {#step-2}

Odată ce v-ați creat un cont Alchemy, puteți să generați o cheie API creând o aplicație. Aceasta ne va permite să facem solicitări către rețeaua de testare Ropsten. Dacă nu sunteți familiarizat cu rețelele de testare, consultați [această pagină](/developers/docs/networks/).

1.  Navigați la pagina „Create App” (Creați o aplicație) din tabloul de bord Alchemy, trecând peste „Apps” (Aplicații) din bara de navigare și făcînd clic pe „Create App” (Creați o aplicație)

![creați aplicația „Hello world”](./hello-world-create-app.png)

2. Numiți-vă aplicația „Hello World”, dați-i o scurtă descriere, selectați „Staging” pentru Mediu (folosit pentru contabilizarea aplicației) și alegeți „Ropsten” pentru rețea.

![creați aplicația „vizualizare hello world”](./create-app-view-hello-world.png)

3. Dați clic pe „Create app” (Creați aplicația) și asta e tot! Aplicația dvs. ar trebui să apară în tabelul de mai jos.

## Etapa 3: Crearea unui cont Ethereum (adresă) {#step-3}

Avem nevoie de un cont Ethereum pentru a trimite și primi tranzacții. În acest tutorial, vom folosi un portofel virtual în browser, MetaMask, pentru a gestiona adresa contului Ethereum. Aflați mai multe despre [tranzacții](/developers/docs/transactions/).

Puteți descărca și crea un cont MetaMask gratuit [aici](https://metamask.io/download.html). Atunci când vă creați un cont sau dacă aveți deja unul, aveţi grijă să comutaţi pe Ropsten Test Network” („Rețeaua de testare Ropsten”) în dreapta sus (pentru a nu avea de-a face cu bani reali).

![exemplu metamask ropsten](./metamask-ropsten-example.png)

## Etapa 4: Adăugarea de ether de la un faucet {#step-4}

Pentru implementarea contractului nostru inteligent în rețeaua de testare, vom avea nevoie de niște ETH fals. Pentru a-l obține, mergeți la [faucetul Ropsten](https://faucet.dimensions.network/), introduceți-vă adresa contului, apoi dați click pe „Trimiteți ETH Ropsten.” Ar putea să dureze ceva timp până la primirea ETH-ului fals, din cauza traficului din rețea. Curând după aceea ar trebui să vă vedeți ETH-ul în contul dvs. MetaMask!

## Etapa 5: Verificarea soldului {#step-5}

Pentru a ne verifica de două ori soldul, să facem o solicitare [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) folosind instrumentul [compozitor al Alchemy](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Aceasta va returna suma de ETH în portofelul nostru. După introducerea adresei contului MetaMask și după ce ați dat click pe „Send Request” („Trimiteți solicitarea”), ar trebui să vedeți un răspuns de genul:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **OBSERVAŢIE:** Rezultatul este în wei, nu în ETH. Wei este folosit ca cea mai mică denominație de ether. Conversia din wei în ETH este: 1 eth = 10<sup>18</sup> wei. Deci, după convertirea a 0x2B5E3AF16B1880000 în zecimal, obținem 5\*10¹⁸, ceea ce înseamnă 5 ETH.
>
> Pfiu! Toți banii noștri falși sunt acolo<Emoji text=":money_mouth_face:" size={1} />.

## Etapa 6: Inițializarea proiectului {#step-6}

Mai întâi va trebui să creăm un dosar pentru proiectul nostru. Navigați la linia de comandă și tastați:

```
mkdir hello-world
cd hello-world
```

Odată ce suntem în dosarul proiectului nostru, vom folosi `npm init` pentru a inițializa proiectul. Dacă nu aveți deja instalat „npm”, urmați [aceste instrucțiuni](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (vom avea nevoie și de Node.js, așadar descărcați-l și pe acela!).

```
npm init
```

Nu este chiar important cum răspundeți la întrebările de instalare; iată cum am făcut-o noi, ca referință:

```
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)About to write to /Users/.../.../.../hello-world/package.json:

{
  "name": "hello-world",
  "version": "1.0.0",
  "description": "hello world smart contract",
  "main": "index.js",
  "scripts": {
     "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Aprobați package.json și suntem gata să începem!

## Etapa 7: Descărcarea [Hardhat](https://hardhat.org/getting-started/#overview){#step-7}

Hardhat este un mediu de dezvoltare pentru compilarea, implementarea, testarea și depanarea software-ului dvs. Ethereum. Acesta ajută dezvoltatorii la construirea de contracte inteligente și aplicații dApps la nivel local, înainte de a le implementa în lanțul real.

În interiorul proiectului nostru `hello-world` rulați:

```
npm install --save-dev hardhat
```

Consultați această pagină pentru mai multe [informații de instalare](https://hardhat.org/getting-started/#overview).

## Etapa 8: Crearea proiectului Hardhat {#step-8}

În dosarul proiectului nostru executați:

```
npx hardhat
```

În acel moment ar trebui să vedeți un mesaj de bun venit și opțiunea de a selecționa ceea ce doriți să faceți. Selectați „create an empty hardhat.config.js” („creați un hardhat.config.js gol”):

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍?

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Aceasta ne va genera un fișier `hardhat.config.js`, în care vom specifica toate setările proiectului nostru (în etapa 13).

## Etapa 9: Adăugarea dosarelor proiectului {#step-9}

Pentru a menține proiectul nostru organizat, vom crea două dosare noi. Mergeți în directorul rădăcină al proiectului dvs. și în linia de comandă tastați:

```
mkdir contracts
mkdir scripts
```

- `contracts/` este locul unde vom păstra fișierul nostru de cod al contractului inteligent „hello world”
- `scripts/` este locul unde vom păstra scripturile pentru implementarea și interacțiunea cu contractul nostru

## Etapa 10: Scrierea contractului nostru {#step-10}

Poate vă întrebați când oare vom începe să scriem cod?? În sfârșit, am ajuns la etapa 10.

Deschideți proiectul „hello-world” în editorul dvs. preferat (noi preferăm [VSCode](https://code.visualstudio.com/)). Contractele inteligente sunt scrise într-un limbaj numit Solidity, pe care îl vom folosi pentru a scrie contractul nostru inteligent „HelloWorld.sol”.

1.  Navigați în dosarul „contracts” și creați un nou fișier numit „HelloWorld.sol”
2.  Mai jos găsiți o mostră de contract inteligent „Hello World” de la Fundația Ethereum, pe care o vom folosi pentru acest tutorial. Copiați și lipiți conținutul de mai jos în fișierul „HelloWorld.sol” și nu uitați să citiți comentariile pentru a înțelege ce face acest contract:

```solidity
// Specifică versiunea Solidity, utilizând versiuni semantice.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// Defines a contract named `HelloWorld`.
// Un contract este o colecție de funcții și date - (starea sa). Odată implementat, un contract se află la o anumită adresă din blockchain-ul Ethereum. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Declares a state variable `message` of type `string`.
   // Variabilele de stare sunt variabile ale căror valori sunt stocate permanent în stocarea contractului. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Funcțiile constructor sunt utilizate pentru a inițializa datele contractului. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

Acesta este un contract inteligent extrem de simplu care stochează un mesaj la crearea sa și poate fi actualizat prin apelarea funcției `update`.

## Etapa 11: Conectarea MetaMask & Alchemy la proiect {#step-11}

Acum, că am creat un portofel MetaMask, un cont Alchemy și am scris contractul nostru inteligent, este timpul să le conectăm pe cele trei.

Fiecare tranzacție trimisă din portofelul virtual necesită o semnătură folosind cheia dvs. privată unică. Pentru a da programului nostru această permisiune, putem stoca în siguranță cheia noastră privată (și cheia API Alchemy) într-un fișier de mediu.

> Pentru a învăța mai multe despre trimiterea tranzacțiilor, consultați [acest tutorial](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) despre trimiterea tranzacțiilor folosind web3.

Mai întâi instalați pachetul „dotenv” în dosarul proiectului dumneavoastră:

```
npm install dotenv --save
```

Apoi, creați un fișier `.env` în directorul rădăcină al proiectului nostru și adăugați-vă cheia privată MetaMask și URL-ul HTTP al API-ului Alchemy în el.

- Urmați [aceste instrucțiuni](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) pentru a exporta cheia dvs. privată
- Vedeți mai jos cum să obţineţi URL-ul HTTP al API-ului Alchemy

![obținerea unei chei api alchemy](./get-alchemy-api-key.gif)

Copiați URL-ul API-ului Alchemy

Fișierul dvs. `.env` ar trebui să arate astfel:

```
API_URL = "https://eth-ropsten.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Pentru a le conecta cu adevărat la codul nostru, vom face referire la aceste variabile în fișierul nostru `hardhat.config.js` în etapa 13.

## Etapa 12: Instalarea Ethers.js {#step-12-install-ethersjs}

„Ethers.js” este o bibliotecă ce facilitează interacțiunea cu Ethereum și solicitările către acesta, învelind („wrapping”) [metodele JSON-RPC standard](/developers/docs/apis/json-rpc/) cu metode mai ușor de utilizat.

Hardhat simplifică foarte mult integrarea de [Plugin-uri](https://hardhat.org/plugins/) pentru instrumente suplimentare și funcționalități extinse. Vom profita de [plugin-ul Ethers](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html) pentru a implementa contractul ([Ethers.js](https://github.com/ethers-io/ethers.js/) are niște metode foarte simple de implementare a contractelor).

În directorul de proiect, tastați:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

De asemenea, vom solicita ether în fișierul nostru `hardhat.config.js` în etapa următoare.

## Etapa 13: Actualizarea hardhat.config.js {#step-13-update-hardhatconfigjs}

Până acum am adăugat mai multe dependențe și plugin-uri, acum trebuie să actualizăm `hardhat.config.js` pentru ca proiectul nostru să știe despre toate acestea.

Actualizați `hardhat.config.js` pentru a arăta astfel:

```
require('dotenv').config();

require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
   solidity: "0.7.3",
   defaultNetwork: "ropsten",
   networks: {
      hardhat: {},
      ropsten: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

## Etapa 14: Compilarea contractului nostru {#step-14-compile-our-contracts}

Pentru a fi siguri că totul funcționează până acum, să compilăm contractul nostru. Funcția `compile`, este una dintre sarcinile încorporate în „hardhat”.

Din linia de comandă, rulați:

```
npx hardhat compile
```

Este posibil să primiți un mesaj că `indicatorul de licență SPDX nu este furnizat în fișierul sursă`, dar nu trebuie să vă îngrijorați — sperăm că în rest totul arată bine! Dacă nu, puteți oricând să trimiteți un mesaj pe canalul [Discord Alchemy](https://discord.gg/u72VCg3).

## Etapa 15: Scrierea scriptului nostru de implementare {#step-15-write-our-deploy-scripts}

Odată ce avem contractul nostru scris și fișierul de configurare gata, putem să scriem scriptul de implementare al contractului.

Navigați în dosarul `scripts/` și creați un nou fișier numit `deploy.js`, adăugându-i următorul conținut:

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Start deployment, returning a promise that resolves to a contract object
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Contract deployed to address:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

[Tutorialul despre contracte](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) al Hardhat explică foarte bine ce face fiecare dintre aceste linii de cod, iar noi am adoptat explicațiile lor aici.

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

Un `ContractFactory` este o abstracție utilizată în „ethers.js” pentru a implementa noi contracte inteligente, deci `HelloWorld` aici este o fabrică pentru instanțele contractului nostru „Hello World”. Când utilizați plugin-ul `hardhat-ethers`, instanțele `ContractFactory` și `Contract` sunt conectate în mod implicit la primul semnatar.

```
const hello_world = await HelloWorld.deploy();
```

Dacă se apelează `deploy()` pe un `ContractFactory`, aceasta va începe implementarea și va răspunde printr-un `Promise` care va rezolva pe un `Contract`. Acesta este obiectul care are o metodă pentru fiecare dintre funcțiile contractului nostru inteligent.

## Etapa 16: Implementarea contractului nostru {#step-16-deploy-our-contract}

În sfârșit, suntem gata să ne implementăm contractul inteligent! Navigați la linia de comandă și rulați:

```
npx hardhat run scripts/deploy.js --network ropsten
```

Ar trebui să vedeți ceva de genul:

```
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Dacă mergem pe [Ropsten etherscan](https://ropsten.etherscan.io/) și căutăm adresa contractului nostru, ar trebui să vedem că acesta a fost implementat cu succes. Tranzacția va arăta cam așa:

![contractul etherscan](./etherscan-contract.png)

Adresa `From` ar trebui să corespundă cu adresa contului MetaMask, iar adresa „To” va indica „Contract Creation”, dar dacă dăm click pe tranzacție, vom vedea adresa contractului nostru în câmpul `To`:

![tranzacția etherscan](./etherscan-transaction.png)

Felicitări! Tocmai ați implementat un contract inteligent în lanțul Ethereum 🎉

Pentru a înțelege ce se întâmplă în culise, să navigăm la fila Explorer din [tabloul de bord Alchemy](https://dashboard.alchemyapi.io/explorer). Dacă aveți mai multe aplicații Alchimy, asigurați-vă că filtrați după aplicație și selectați „Hello World”. ![exploratorul „hello world”](./hello-world-explorer.png)

Aici veți vedea o serie de apeluri JSON-RPC pe care Hardhat/Ethers le-a făcut în culise pentru noi atunci când am apelat funcția `.deploy()`. Este important de menţionat două dintre acestea aici: [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), care este solicitarea de a scrie efectiv contractul nostru în lanțul Ropsten, și [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash), care este o solicitare de a citi informații despre tranzacția noastră având în vedere hash-ul (un model tipic în cazul tranzacțiilor). Dacă doriți să aflați mai multe despre trimiterea de tranzacții, consultați acest tutorial despre [trimiterea de tranzacții utilizând Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)

Cam atât pentru partea 1 a acestui tutorial, în partea a 2-a efectiv vom [interacționa cu contractul nostru inteligent](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#part-2-interact-with-your-smart-contract) prin actualizarea mesajului inițial, iar în partea a 3-a, ne vom ocupa de [publicarea contractului inteligent pe Etherscan](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#optional-part-3-publish-your-smart-contract-to-etherscan), astfel încât toată lumea să ştie cum să interacționeze cu el.

**Doriți să aflați mai multe despre Alchemy? Consultați [site-ul](https://alchemyapi.io/eth) nostru. Nu doriți să ratați nicio actualizare? Abonați-vă la buletinul nostru informativ [aici](https://www.alchemyapi.io/newsletter)! De asemenea, urmăriți-ne pe [Twitter](https://twitter.com/alchemyplatform) și alăturați-vă nouă pe [Discord](https://discord.com/invite/u72VCg3)**.
