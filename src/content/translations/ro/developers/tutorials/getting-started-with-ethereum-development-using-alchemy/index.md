---
title: Noțiuni de bază despre dezvoltarea Ethereum folosind Alchemy
description: "Acesta este un ghid pentru începători pentru a începe dezvoltarea Ethereum folosind Alchemy. Începem de la înregistrarea la Alchemy, la a face o solicitare din linia de comandă, până la scrierea primul script web3! Nu este necesară o experiență de programator blockchain!"
author: "Elan Halpern"
tags:
  [
    "noțiuni de bază",
    "javascript",
    "ethers.js",
    "noduri",
    "interogarea",
    "alchemy",
  ]
skill: începător
lang: ro
sidebar: true
published: 2020-10-30
source: Mediu
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Logouri Ethereum și Alchemy](./ethereum-alchemy.png)

Acesta este un ghid pentru începători pentru a demara cu dezvoltarea Ethereum folosind [Alchemy](https://alchemyapi.io/), cea mai importantă platformă de programator blockchain alimentând milioane de utilizatori din 70% din aplicațiile blockchain de top, inclusiv Maker, 0x, MyEtherWallet, Dharma și Kyber.

Începem de la înregistrarea la Alchemy și te îndrumăm până la scrierea primul script web3! Nu este necesară o experiență de programator blockchain!

## 1\. Înregistrează-te pentru un cont Alchemy gratuit {#sign-up-for-a-free-alchemy-account}

Crearea unui cont cu Alchemy este ușoară, [înregistrează-te gratuit aici](https://dashboard.alchemyapi.io/signup/).

## 2\. Crearea unei aplicații Alchemy {#create-an-alchemy-app}

Pentru a utiliza produsele Alchemy, ai nevoie de o cheie API pentru a-ți autentifica solicitările.

Poți [crea chei API din tabloul de bord](http://dashboard.alchemyapi.io/). Pentru a crea o cheie nouă, navighează la „Creare aplicație” după cum se arată mai jos:

Mulțumiri speciale site-ului [_ShapeShift_](https://shapeshift.com/) _pentru că ne permite să arătăm tabloul de bord!_

![Tabloul de bord Alchemy](./alchemy-dashboard.png)

Completează detaliile sub „Creare aplicație” pentru a obține noua cheie. De easemenea, aici poți să vezi aplicațiile pe care le-ai făcut anterior și cele făcute de echipa ta. Trage cheile existente făcând clic pe „Vizualizare cheie” pentru orice aplicație.

![Creează aplicații cu captura de ecran Alchemy](./create-app.png)

Poți trage, de asemenea, cheile API existente prin trecerea peste „Apps” și selectând una. Poți „Vizualiza cheia” aici, precum și „Edita aplicația” pentru a lista în alb anumite domenii, pentru a vedea mai multe instrumente pentru programatori și pentru a vizualiza analizele.

![Gif care arată unui utilizator să tragă cheile API](./pull-api-keys.gif)

## 3\. Efectuarea unei solicitări din linia de comandă {#make-a-request-from-the-command-line}

Interacționează cu blockchain-ul Ethereum prin Alchemy folosind JSON-RPC și curl.

Pentru solicitări manuale, îți recomandăm să interacționezi cu `JSON-RPC` prin intermediul solicitărilor `POST`. Este suficient să introduci antetul `Content-Type: application/json` și interogarea ta ca `POST` cu următoarele câmpuri:

- `jsonrpc`: Versiunea JSON-RPC — în prezent, numai `2.0` este acceptată.
- `Method`: Metoda ETH API. [Consultă referința API.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: O listă a parametrilor care trebuie să treacă la metodă.
- `id`: ID-ul solicitării tale. Va fi returnat de răspuns, astfel încât să poți urmări cererea căreia aparține un răspuns.

Iată un exemplu pe care îl poți rula din linia de comandă pentru a recupera prețul curent al gazului:

```bash
curl [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/v2/demo) \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

**_NOTĂ:_** _Înlocuiește_ [_https://eth-mainnet.alchemyapi.io/v2/demo_](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) _cu propria cheie API_ [_https://eth-mainnet.alchemyapi.io/v2/your-api-key_](https://eth-mainnet.alchemyapi.io/jsonrpc/your-api-key)_._

**Rezultate:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4\. Configurează clientul Web3 {#set-up-your-web3-client}

**Dacă ai un client existent,** modifică adresa URL a furnizorului curent de nod la un URL Alchemy cu cheia ta API: `"https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_NOTĂ:_** Script-urile de mai jos trebuie să fie rulate într-un **context nod** sau **salvate într-un fișier**, nu rulează de la linia de comandă. Dacă nu ai instalat deja Node sau npm, consultă acest [ghid de configurare pentru mac](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs)-uri.

Există tone de [biblioteci Web3](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) pe care le poți integra cu Alchemy, totuși, îți recomandăm să folosești [Alchemy Web3](https://docs.alchemyapi.io/documentation/alchemy-web3), un înlocuitor treptat pentru web3.js, construit și configurat pentru a funcționa perfect cu Alchemy. Acesta oferă mai multe avantaje, cum ar fi reîncercări automate și suport robust WebSocket.

Pentru a instala AlchemyWeb3.js, **navigă la directorul proiectului tău** și rulează:

**Cu Yarn:**

```
yarn add @alch/alchemy-web3
```

**Cu NPM:**

```
npm install @alch/alchemy-web3
```

Pentru a interacționa cu infrastructura nodului Alchemy, rulează în NodeJS sau adaugă aceasta într-un fișier JavaScript:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5\. Scrie primul Web3 Script! {#write-your-first-web3-script}

Acum, pentru a ne murdări pe mâini cu puțină programare web3, vom scrie un script simplu, care imprimă cel mai recent număr de bloc de pe rețeaua principală Ethereum.

1.  **Dacă nu ai făcut-o deja, în terminal creează un nou director (mkdir) de proiect și intră (cd) în el:**

```
mkdir web3-example
cd web3-example
```

**2\. Instalează dependența Alchemy web3 (sau orice web3) în proiect dacă nu ai făcut-o deja:**

```
npm install @alch/alchemy-web3
```

**‌3. Creează un fișier denumit** `index.js` **și adaugă următorul conținut:**

> În cele din urmă, ar trebui să înlocuiești `demo` cu cheia API Alchemy HTTP.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-   mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

Nu ești familiarizat cu lucrurile asincrone? Verifică acest [post Medium](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c).

**4\. Rulează în terminal folosind „node”**

```
node index.js
```

**‌5. Ar trebui să vezi acum ca ieșire în consolă, cel mai recent număr de bloc.**

```
Cel mai recent număr de bloc este 11.043.912
```

**Ura! Felicitări! Tocmai ai scris primul tău script web 3 folosind Alchemy 🎉**

‌Nu știi ce să faci mai departe? Încearcă să implementezi primul contract inteligent și încearcă câteva programe Solidity din Ghidul de contracte inteligente [_Hello World_](https://docs.alchemyapi.io/tutorials/hello-world-smart-contract) _ sau testează-ți cunoștințele despre tabloul de bord cu_ [_Demo Dashboard App_](https://docs.alchemyapi.io/tutorials/demo-app)_!_

_[Înregistrează-te la Alchemy gratis](https://dashboard.alchemyapi.io/signup/), consultă [documentația](https://docs.alchemyapi.io/) și, pentru cele mai recente știri, urmărește-ne pe [Twitter](https://twitter.com/AlchemyPlatform)_.
