---
title: Tranzacții
description: O prezentare generală a tranzacțiilor Ethereum – cum funcționează, structura datelor și cum să le trimiteţi printr-o aplicație.
lang: ro
---

Tranzacțiile sunt instrucțiuni semnate criptografic din conturi. Un cont inițiază o tranzacție pentru a actualiza starea rețelei Ethereum. Cea mai simplă tranzacție este transferarea de ETH dintr-un cont în altul.

## Condiții prealabile {#prerequisites}

Pentru a vă ajuta să înțelegeți mai bine această pagină, vă recomandăm să citiți mai întâi [Conturi](/developers/docs/accounts/) și [introducere despre Ethereum](/developers/docs/intro-to-ethereum/).

## Ce este o tranzacție? {#whats-a-transaction}

O tranzacție Ethereum se referă la o acțiune inițiată de un cont deținut din exterior, cu alte cuvinte un cont gestionat de o persoană, nu de un contract. De exemplu, dacă Bob trimite lui Alice 1 ETH, contul lui Bob trebuie debitat, iar cel al lui Alice trebuie creditat. Această acțiune care schimbă starea are loc în cadrul unei tranzacții.

![Diagramă care arată o tranzacție ce provoacă modificarea stării](./tx.png) _Diagramă adaptată din [Ethereum EVM ilustrat](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Tranzacțiile, care schimbă starea EVM, trebuie difuzate către întreaga rețea. Orice nod poate difuza cererea ca o tranzacție să fie executată pe EVM; după aceasta, un miner va executa tranzacția și va propaga modificarea stării ce rezultă către restul rețelei.

Tranzacțiile trebuie să fie taxate și trebuie minate pentru a deveni valide. Pentru a simplifica această prezentare generală, vom trata despre taxele pe gaz și exploatare în altă parte.

O tranzacție trimisă cuprinde următoarele informații:

- `destinatarul` – adresa de primire (dacă este un cont deținut extern, tranzacția va transfera valoare. Dacă este un cont de contract, tranzacția va executa codul contractului)
- `semnătura` – identificatorul expeditorului. Aceasta se generează atunci când cheia privată a expeditorului semnează tranzacția și confirmă că expeditorul a autorizat această tranzacție
- `valoarea` – cantitatea de ETH de transferat de la expeditor la destinatar (în WEI, o denominație a ETH-ului)
- `date` – câmp opțional pentru a include date arbitrare
- `gasLimit` – cantitatea maximă de unități de gaz care pot fi consumate de tranzacție. Unitățile de gaz reprezintă etape de calcul
- `maxPriorityFeePerGas` - cantitatea maximă de gaz care va fi inclusă ca bacșiș pentru miner
- `maxFeePerGas` - suma maximă de gaz care se convine să fie plătită pentru tranzacție (inclusiv `baseFeePerGas` și `maxPriorityFeePerGas`)

Gazul se referă la calculul necesar procesării tranzacției de către un miner. Utilizatorii trebuie să plătească o taxă pentru acest calcul. `gasLimit`, și `maxPriorityFeePerGas` determină taxa maximă de tranzacție plătită miner-ului. [Mai multe despre gaz](/developers/docs/gas/).

Obiectul tranzacției va arăta astfel:

```js
{
  from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
  to: "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
  gasLimit: "21000",
  maxFeePerGas: "300",
  maxPriorityFeePerGas: "10",
  nonce: "0",
  value: "10000000000"
}
```

Dar un obiect de tranzacție trebuie să fie semnat folosind cheia privată a expeditorului. Acest lucru demonstrează că tranzacția ar fi putut proveni doar de la expeditor și nu a fost trimisă în mod fraudulos.

Un client Ethereum precum Geth se va ocupa de acest proces de semnare.

Exemplu de apel [JSON-RPC](https://eth.wiki/json-rpc/API):

```json
{
  "id": 2,
  "jsonrpc": "2.0",
  "method": "account_signTransaction",
  "params": [
    {
      "from": "0x1923f626bb8dc025849e00f99c25fe2b2f7fb0db",
      "gas": "0x55555",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "input": "0xabcd",
      "nonce": "0x0",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234"
    }
  ]
}
```

Exemplu de răspuns:

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "raw": "0xf88380018203339407a565b7ed7d7a678680a4c162885bedbb695fe080a44401a6e4000000000000000000000000000000000000000000000000000000000000001226a0223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20ea02aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
    "tx": {
      "nonce": "0x0",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "gas": "0x55555",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234",
      "input": "0xabcd",
      "v": "0x26",
      "r": "0x223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20e",
      "s": "0x2aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
      "hash": "0xeba2df809e7a612a0a0d444ccfa5c839624bdc00dd29e3340d46df3870f8a30e"
    }
  }
}
```

- `raw` este tranzacția semnată în formă codificată cu Prefix de lungime recursivă (RLP)
- `tx` este tranzacția semnată în formă JSON

Cu hash-ul semnăturii, se poate dovedi criptografic că tranzacția a venit de la expeditor și a fost trimisă rețelei.

### The data field {#the-data-field}

The vast majority of transactions access a contract from an externally-owned account. Most contracts are written in Solidity and interpret their data field in accordance with the [application binary interface (ABI)](/glossary/#abi).

The first four bytes specify which function to call, using the hash of the function's name and arguments. You can sometimes identify the function from the selector using [this database](https://www.4byte.directory/signatures/).

The rest of the calldata is the arguments, [encoded as specified in the ABI specs](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

For example, lets look at [this transaction](https://etherscan.io/tx/0xd0dcbe007569fcfa1902dae0ab8b4e078efe42e231786312289b1eee5590f6a1). Use **Click to see More** to see the calldata.

The function selector is `0xa9059cbb`. There are several [known functions with this signature](https://www.4byte.directory/signatures/?bytes4_signature=0xa9059cbb). In this case [the contract source code](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#code) has been uploaded to Etherscan, so we know the function is `transfer(address,uint256)`.

The rest of the data is:

```
0000000000000000000000004f6742badb049791cd9a37ea913f2bac38d01279
000000000000000000000000000000000000000000000000000000003b0559f4
```

According to the ABI specifications, integer values (such as addresses, which are 20-byte integers) appear in the ABI as 32-byte words, padded with zeros in the front. So we know that the `to` address is [`4f6742badb049791cd9a37ea913f2bac38d01279`](https://etherscan.io/address/0x4f6742badb049791cd9a37ea913f2bac38d01279). The `value` is 0x3b0559f4 = 990206452.

## Tipuri de tranzacții {#types-of-transactions}

Pe Ethereum există câteva tipuri diferite de tranzacții:

- Tranzacțiile obișnuite: o tranzacție de la un portofel la altul.
- Tranzacții de implementare a contractelor: o tranzacție fără o adresă „la”, în cazul în care câmpul de date este utilizat pentru codul contractului.
- Execution of a contract: a transaction that interacts with a deployed smart contract. In this case, 'to' address is the smart contract address.

### On gas {#on-gas}

După cum s-a menționat, tranzacțiile costă [gaz](/developers/docs/gas/) pentru a fi executate. Tranzacțiile de transfer simple necesită 21.000 de unități de Gaz.

Astfel, pentru ca Bob să îi trimită lui Alice 1 ETH la un `baseFeePerGas` de 190 gwei și `maxPriorityFeePerGas` de 10 gwei, Bob va trebui să plătească următoarea taxă:

```
(190 + 10) * 21000 = 4,200,000 gwei
--or--
0.0042 ETH
```

Contul lui Bob va fi debitat **-1.0042 ETH**

Contul lui Alice va fi creditat cu **+1.0 ETH**

Taxa de bază va fi arsă **-0.00399 ETH**

Minerul păstrează bacșișul **+0.000210 ETH**

Gazul este necesar și pentru orice interacțiune cu contractul inteligent.

![Diagrama care arată modul în care este rambursat gazul neutilizat](./gas-tx.png) _Diagramă adaptată din [Ethereum EVM ilustrat](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Orice gaz neutilizat într-o tranzacție este rambursat în contul utilizatorului.

## Ciclul de viață al tranzacției {#transaction-lifecycle}

Odată ce tranzacția a fost trimisă, se întâmplă următoarele:

1. Odată ce trimiteți o tranzacție, criptografia generează un hash de tranzacție: `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. Tranzacția este apoi transmisă în rețea și inclusă într-un grup cu ​​multe alte tranzacții.
3. Un miner trebuie să vă aleagă tranzacția și să o includă într-un bloc pentru a o verifica și a o considera „reușită”.
   - Este posibil să așteptați în această etapă, dacă rețeaua este ocupată și miner-ii nu sunt în măsură să țină pasul.
4. Tranzacția dvs. va primi „confirmări”. Numărul de confirmări reprezintă numărul de blocuri create de la blocul care a inclus tranzacția dumneavoastră. Cu cât acest număr este mai mare, cu atât mai mare este certitudinea că rețeaua a procesat și a recunoscut tranzacția.
   - Blocurile recente pot fi reorganizate, lăsând impresia că tranzacția nu a avut succes; cu toate acestea, tranzacția poate fi încă validă, dar inclusă într-un alt bloc.
   - Probabilitatea unei reorganizări scade cu fiecare bloc minat ulterior, în sensul că, pe măsură ce numărul de confirmări este mai mare, tranzacția este cu atât mai imuabilă.

## O demonstrație vizuală {#a-visual-demo}

Urmăriți-l pe Austin cum vă prezintă tranzacțiile, gazele și mineritul.

<YouTube id="er-0ihqFQB0" />

## Tranzacția plic tipizată {#typed-transaction-envelope}

Ethereum avea inițial un singur format pentru tranzacții. Fiecare tranzacție conținea un nonce, gas price, gas limit, to address, value, data, v, r, și s. Aceste câmpuri sunt codificate RLP, ca să arate cam așa:

`RLP([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`

Ethereum a evoluat pentru a suporta mai multe tipuri de tranzacții care permită implementarea de noi caracteristici, cum ar fi listele de acces și [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), fără ca acestea să afecteze formatele tradiționale de tranzacții.

[EIP-2718: Tranzacția plic tipizată (Typed Transaction Envelope)](https://eips.ethereum.org/EIPS/eip-2718) definește un tip de tranzacție care este un plic pentru viitoarele tipuri de tranzacții.

EIP-2718 este un nou plic generalizat pentru tranzacții tipizate. În noul standard, tranzacțiile sunt interpretate ca:

`TransactionType || TransactionPayload`

Unde câmpurile sunt definite astfel:

- `TransactionType` - un număr între 0 și 0x7f, pentru un total de 128 de tipuri de tranzacții posibile.
- `TransactionPayload` - o matrice arbitrară de octeți definită de tipul de tranzacție.

## Referințe suplimentare {#further-reading}

- [EIP-2718: Tranzacție plic tipizată](https://eips.ethereum.org/EIPS/eip-2718)

_Cunoașteți o resursă a comunității care v-a ajutat? Editaţi această pagină și adăugaţi-o!_

## Subiecte corelate {#related-topics}

- [Conturi](/developers/docs/accounts/)
- [Mașină virtuală Ethereum (EVM)](/developers/docs/evm/)
- [Gaz](/developers/docs/gas/)
- [Minare](/developers/docs/consensus-mechanisms/pow/mining/)
