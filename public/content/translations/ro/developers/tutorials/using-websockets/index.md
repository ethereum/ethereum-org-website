---
title: Utilizarea WebSockets
description: Ghid de utilizare a WebSockets și Alchemy pentru a face cereri JSON-RPC și a vă abona la evenimente.
author: "Elan Halpern"
lang: ro
tags:
  - "alchemy"
  - "websockets"
  - "interogarea"
  - "noțiuni de bază"
  - "abonament"
  - "javascript"
skill: beginner
source: Documentație Alchemy
sourceUrl: https://docs.alchemyapi.io/guides/using-websockets
published: 2020-12-01
---

Acesta este un ghid de bază pentru a folosi WebSockets și Alchemy pentru a face cereri către blockchain-ul Ethereum.

## WebSockets vs. HTTP {#websockets-vs-http}

Spre deosebire de HTTP, cu WebSockets nu este nevoie să faceți încontinuu cereri când doriți informații precise. WebSockets menține o conexiune de rețea pentru tine (dacă este făcută corect) și ascultă dacă apar modificări.

Ca și în cazul oricărei conexiuni la rețea, nu ar trebui să presupunem că un WebSocket va rămâne deschis pentru totdeauna fără întrerupere, dar manipularea corectă a conexiunilor pierdute și reconectarea manuală de o manieră corectă poate fi o provocare. Un alt dezavantaj al WebSocket-urilor este că nu obții codurile de stare HTTP ca răspuns, ci numai mesajul de eroare.

[Alchemy Web3](https://docs.alchemy.com/reference/api-overview) adaugă automat manipularea pentru eșecuri WebSocket și reîncercări fără nici o configurație necesară.

## Încearcă-l {#try-it-out}

Cel mai simplu mod de a testa WebSockets este de a instala un instrument de linie de comandă pentru a face cereri WebSocket, cum ar fi [wscat](https://github.com/websockets/wscat). Folosind wscat, puteți trimite cereri după cum urmează:

_Observație: dacă aveți un cont Alchemy, puteți înlocui `demo` cu propria dvs. cheie API. [Înscrieți-vă pentru un cont gratuit Alchemy aici!](https://auth.alchemyapi.io/signup)_

```bash
wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo

>  {"jsonrpc":  "2.0", "id": 0, "method":  "eth_gasPrice"}

<  {"jsonrpc":  "2.0", "result":  "0xb2d05e00", "id": 0}

```

## Cum se utilizează WebSockets {#how-to-use-websockets}

Pentru a începe, deschideți un WebSocket utilizând URL-ul WebSocket pentru aplicația dvs. Puteți găsi URL-ul WebSocket al aplicației dvs. deschizând pagina aplicației în [tabloul dvs. de bord](https://dashboard.alchemyapi.io/) și făcând clic pe „View Key” („Vizualizare cheie”). Rețineți că URL-ul aplicației dvs. pentru WebSockets este diferit de URL-ul pentru cererile HTTP, dar ambele pot fi găsite făcând clic pe „View Key” („Vizualizare cheie”).

![Unde găsiți URL-ul WebSocket în tabloul de bord Alchemy](./use-websockets.gif)

Oricare dintre API-urile enumerate în [Alchemy API de referință](https://docs.alchemyapi.io/documentation/alchemy-api-reference/) poate fi folosit prin intermediul WebSocket. Pentru aceasta, folosește aceleași elemente care ar fi trimise prin metoda de cereri POST suportată de HTTP, dar trimite-le prin WebSocket.

## Cu Web3 {#with-web3}

Tranziția la WebSockets în timpul utilizării unei biblioteci client ca Web3 este simplă. Pur și simplu transmiți URL-ul WebSocket în loc de HTTP atunci când creezi o instanță a clientul tău Web3. De exemplu:

```js
const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/your-api-key")

web3.eth.getBlockNumber().then(console.log) // -> 7946893
```

## Abonament API {#subscription-api}

Când vă conectați printr-un WebSocket, puteți utiliza două metode suplimentare: `eth_subscribe` și `eth_unsubscribe`. Aceste metode îți vor permite să asculți anumite evenimente și să fii notificat imediat.

### `eth_subscribe` {#eth-subscribe}

Creează un nou abonament pentru evenimente specificate. [Aflați mai multe despre `eth_subscribe`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_subscribe).

#### Parametri {#parameters}

1. Tipuri de abonamente
2. Parametri opționali

Primul argument specifică tipul de eveniment pentru care să asculte. Al doilea argument conține opțiuni suplimentare care depind de primul argument. Diferitele tipuri de descriere, opțiunile lor și conținutul de evenimente pe care le includ sunt descrise mai jos.

#### Returnări {#returns}

ID-ul abonamentului: acest ID va fi atașat la orice evenimente primite și poate fi utilizat și pentru anularea abonamentului folosind `eth_unsubscribe`.

#### Evenimente de abonament {#subscription-events}

Cât timp abonamentul este activ, veți primi evenimente care sunt obiecte cu următoarele câmpuri:

- `jsonrpc`: Totdeauna „2.0”
- `method`: Totdeauna „eth_subscription”
- `params`: Un obiect cu următoarele câmpuri:
  - `subscription`: ID-ul abonamentului returnat de apelul `eth_subscription` care a creat acest abonament.
  - `result`: un obiect al cărui conținut variază în funcție de tipul abonamentului.

#### Tipuri de abonamente {#subscription-types}

1. `alchemy_newFullPendingTransactions`

Returnează informațiile tranzacției pentru toate tranzacțiile care sunt adăugate la starea în așteptare. Acest tip de abonament te abonează la tranzacțiile în așteptare, similar cu apelurile web3 standard `web3.eth.subscribe("pendingTransactions")`, dar diferă de ele prin faptul că emite _informații complete de tranzacție_, nu doar hash-urile tranzacțiilor.

Exemplu:

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["alchemy_newFullPendingTransactions"]}

<  {"id":1,"result":"0x9a52eeddc2b289f985c0e23a7d8427c8","jsonrpc":"2.0"}
<  {
      "jsonrpc":"2.0",
      "method":"eth_subscription",
      "params":{
          "result":{
          "blockHash":null,
          "blockNumber":null,
          "from":"0xa36452fc31f6f482ad823cd1cf5515177d57667f",
          "gas":"0x1adb0",
          "gasPrice":"0x7735c4d40",
          "hash":"0x50bff0736c713458c92dd1848d12f3354149be1363123dae35e94e0f2a9d56bf",
"input":"0xa9059cbb0000000000000000000000000d0707963952f2fba59dd06f2b425ace40b492fe0000000000000000000000000000000000000000000015b1111266cfca100000",
          "nonce":"0x0",
          "to":"0xea38eaa3c86c8f9b751533ba2e562deb9acded40",
          "transactionIndex":null,
          "value":"0x0",
          "v":"0x26",
          "r":"0x195c2c1ed126088e12d290aa93541677d3e3b1d10f137e11f86b1b9227f01e3b",
          "s":"0x60fc4edbf1527832a2a36dbc1e63ed6193a6eee654472fbebbf88ef1750b5344"},
          "subscription":"0x9a52eeddc2b289f985c0e23a7d8427c8"
      }
  }

```

2. `newHeads`

Emite un eveniment de fiecare dată când un nou antet se adăugă lanțului, inclusiv în timpul reorganizării lanțului.

Când are loc o reorganizare a lanțului, acest abonament va emite un eveniment care conține toate anteturile noi pentru lanțul nou. Și anume, aceasta înseamnă că veți putea vedea mai multe anteturi emise cu aceeași înălțime, iar când se întâmplă acest lucru, ultimul antet trebuie să fie considerat cel corect după o reorganizare.

Exemplu:

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["newHeads"]}

<  {"jsonrpc":"2.0","id":2,"result":"0x9ce59a13059e417087c02d3236a0b1cc"}
<  {
  "jsonrpc":  "2.0",
  "method":  "eth_subscription",
  "params":  {
      "result":  {
          "difficulty":  "0x15d9223a23aa",
          "extraData":  "0xd983010305844765746887676f312e342e328777696e646f7773",
          "gasLimit":  "0x47e7c4",
          "gasUsed":  "0x38658",
          "logsBloom":
"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
          "miner":  "0xf8b483dba2c3b7176a3da549ad41a48bb3121069",
          "nonce":  "0x084149998194cc5f",
          "number":  "0x1348c9",
          "parentHash":  "0x7736fab79e05dc611604d22470dadad26f56fe494421b5b333de816ce1f25701",
          "receiptRoot":  "0x2fab35823ad00c7bb388595cb46652fe7886e00660a01e867824d3dceb1c8d36",
          "sha3Uncles":  "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
          "stateRoot":  "0xb3346685172db67de536d8765c43c31009d0eb3bd9c501c9be3229203f15f378",
          "timestamp":  "0x56ffeff8",
          "transactionsRoot":  "0x0167ffa60e3ebc0b080cdb95f7c0087dd6c0e61413140e39d94d3468d7c9689f"
      },
  "subscription":  "0x9ce59a13059e417087c02d3236a0b1cc"
  }
}

```

3. `logs`

Emite jurnale care fac parte din blocuri nou adăugate care corespund criteriilor de filtrare specificate.

Atunci când are loc o reorganizare a lanțului, jurnalele care fac parte din blocurile de pe lanțul vechi vor fi emise din nou cu proprietatea `removed` setată la `true`. În plus, sunt emise jurnale care fac parte din blocurile de pe noul lanț, ceea ce înseamnă că este posibil să se vadă jurnale pentru aceeași tranzacție de mai multe ori în cazul unei reorganizări.

Parametri

1. Un obiect cu următoarele câmpuri:
   - `address` (optional): either a string representing an address or an array of such strings.
     - Vor fi emise doar jurnale create de la una dintre aceste adrese.
   - `topics`: o matrice de specificatori de subiect.
     - Fiecare specificator de subiect este `null`, un string reprezentând un subiect sau o matrice de stringuri.
     - Fiecare poziție din matrice care nu este `null` restricționează jurnalele emise numai celor care au unul dintre subiectele date în acea poziție.

Câteva exemple de specificații referitoare la subiecte:

- `[]`: Orice subiecte permise.
- `[A]`: A în prima poziție (și orice după).
- `[null, B]`: Orice în prima poziție și B în a doua poziție (și orice după).
- `[A, B]`: A în prima poziție și B în a doua poziție (și orice după).
- `[[A, B], [A, B]]`: (A sau B) în prima poziție și (A sau B) în a doua poziție (și orice după).

Exemplu:

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["logs",  {"address":  "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd",  "topics":  ["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"]}]}

<  {"jsonrpc":"2.0","id":2,"result":"0x4a8a4c0517381924f9838102c5a4dcb7"}
<  {
  "jsonrpc":  "2.0",
  "method":  "eth_subscription",
  "params":  {
      "subscription":  "0x4a8a4c0517381924f9838102c5a4dcb7",
      "result":  {
          "address":  "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd",
          "blockHash":  "0x61cdb2a09ab99abf791d474f20c2ea89bf8de2923a2d42bb49944c8c993cbf04",
          "blockNumber":  "0x29e87",
          "data": "0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003",
          "logIndex":"0x0",
          "topics":["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"],
          "transactionHash":  "0xe044554a0a55067caafd07f8020ab9f2af60bdfe337e395ecd84b4877a3d1ab4",
          "transactionIndex":  "0x0"
      }
  }
}

```

### `eth_unsubscribe` {#eth-unsubscribe}

Anulează un abonament existent, astfel încât să nu mai fie trimise alte evenimente.

Parametri

1. ID-ul abonamentului, așa cum a fost returnat anterior de la un apel `eth_subscribe`.

Returnări

`true` dacă un abonament a fost anulat cu succes sau `false` dacă nu a existat niciun abonament cu ID-ul dat.

Exemplu:

**Cerere**

```
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key
-X POST
-H "Content-Type: application/json"
-d '{"id": 1, "method": "eth_unsubscribe", "params": ["0x9cef478923ff08bf67fde6c64013158d"]}'


```

**Rezultat**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": true
}
```

---

[nregistrează-te la Alchemy](https://auth.alchemyapi.io/signup) gratis, consultă [documentația noastră](https://docs.alchemyapi.io/) și pentru cele mai recente știri, urmărește-ne pe [Twitter](https://twitter.com/AlchemyPlatform).
