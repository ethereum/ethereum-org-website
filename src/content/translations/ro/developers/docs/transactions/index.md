---
title: Tranzacții
description: O prezentare generală a tranzacțiilor Ethereum – cum funcționează, structura datelor și cum să le trimiți printr-o aplicație.
lang: ro
sidebar: true
---

Tranzacțiile sunt instrucțiuni semnate criptografic din conturi. Un cont va iniția o tranzacție pentru a actualiza starea rețelei Ethereum. Cea mai simplă tranzacție este transferarea de ETH dintr-un cont în altul.

<!-- TODO explain these 2 types of transactions -->
<!-- There are two types of transactions: those which result in message calls and those which result in contract creation. -->
<!-- Contract creation results in the creation of a new contract account containing compiled smart contract bytecode. Whenever another account makes a message call to that contract, it executes its bytecode. -->

## Condiții prealabile {#prerequisites}

Pentru a te ajuta să înțelegi mai bine această pagină, îți recomandăm să citești mai întâi [Conturi](/developers/docs/accounts/) și [introducerea noastră în Ethereum](/developers/docs/intro-to-ethereum/).

## Ce este o tranzacție? {#whats-a-transaction}

O tranzacție Ethereum se referă la o acțiune inițiată de un cont deținut din exterior, cu alte cuvinte un cont gestionat de o persoană, nu de un contract. De exemplu, dacă Bob trimite lui Alice 1 ETH, contul lui Bob, trebuie debitat, iar cel al lui Alice trebuie creditat. Această acțiune care schimbă starea, are loc în cadrul unei tranzacții.

![Diagramă care arată o tranzacție care cauzează modificarea stării](../../../../../developers/docs/nodes-and-clients/tx.png) _Diagrama adaptată din [EVM Ethereum ilustrată](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Tranzacțiile, care schimbă starea EVM, trebuie difuzate către întreaga rețea. Orice nod poate difuza o cerere, pentru ca o tranzacție să fie executată pe EVM; după aceasta, un miner va executa tranzacția și va propaga modificarea stării rezultate către restul rețelei.

Tranzacțiile trebuie să fie taxate și trebuie minate pentru a deveni valabile. Pentru a simplifica această prezentare generală, vom acoperi taxele pe gaz și exploatarea în altă parte.

O tranzacție trimisă include următoarele informații:

- `recipient` – adresa de primire (dacă este un cont deținut extern, tranzacția va transfera valoarea. Dacă este un cont de contract, tranzacția va executa codul contractului)
- `signature` – identificatorul expeditorului. Aceasta se generează atunci când cheia privată a expeditorului semnează tranzacția și confirmă că expeditorul a autorizat această tranzacție
- `value` – cantitatea de ETH de transferat de la expeditor la destinatar (în WEI, o denominație a ETH)
- `data` – câmp opțional pentru a include date arbitrare
- `gasLimit` – cantitatea maximă de unități de gaz care pot fi consumate de tranzacție. Unitățile de gaz reprezintă pași de calcul
- `gasPrice` – taxa pe care expeditorul o plătește pe unitatea de gaz

Gazul este o referință la calculul necesar procesării tranzacției de către un miner. Utilizatorii trebuie să plătească o taxă pentru acest calcul. `gasLimit` și `gasPrice` determină taxa maximă de tranzacție plătită minerului. [Mai multe despre gaz](/developers/docs/gas/).

Obiectul tranzacției va arăta astfel:

```js
{
  from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
  to: "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
  gasLimit: "21000",
  gasPrice: "200",
  nonce: "0",
  value: "10000000000",
}
```

Dar un obiect de tranzacție trebuie să fie semnat, folosind cheia privată a expeditorului. Acest lucru demonstrează că tranzacția ar fi putut proveni doar de la expeditor și nu a fost trimisă în mod fraudulos.

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
      "gasPrice": "0x1234",
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
      "gasPrice": "0x1234",
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

Cu hash-ul semnăturii, tranzacția poate fi dovedită criptografic că a venit de la expeditor și a fost trimisă rețelei.

### Despre gaz {#on-gas}

După cum s-a menționat, tranzacțiile costă [gaz](/developers/docs/gas/) pentru a fi executate. Tranzacțiile de transfer simple necesită 21.000 de unități de Gaz.

Deci, pentru ca Bob să îi trimită lui Alice 1 ETH la un `gasPrice` de 200 Gwei, el va trebui să plătească următoarea taxă:

```
200*21.000 = 4.200.000 GWEI
--sau--
0,0042 ETH
```

Contul lui Bob va fi debitat ** – 1,0042 ETH**

Contul lui Alice va fi creditat ** + 1,0 ETH**

Minerul care procesează tranzacția va primi ** + 0,0042 ETH**

Gazul este necesar și pentru orice interacțiune cu contractul inteligent.

![Diagramă care arată modul în care este rambursat gazul neutilizat](../../../../../developers/docs/nodes-and-clients/gas-tx.png) _Diagramă adaptată din [EVM Ethereum ilustrat ](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Orice gaz neutilizat într-o tranzacție este rambursat în contul utilizatorului.

## Ciclul de viață al tranzacției {#transaction-lifecycle}

Odată ce tranzacția a fost trimisă, se întâmplă următoarele:

1. Odată ce trimiți o tranzacție, criptografia generează un hash de tranzacție: `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. Tranzacția este apoi transmisă în rețea și inclusă într-un grup (temporar) cu ​​multe alte tranzacții.
3. Un miner trebuie să aleagă tranzacția ta și să o includă într-un bloc pentru a o verifica și a o considera „reușită”.
   - S-ar putea să aștepți în această etapă dacă rețeaua este ocupată și minerii nu sunt în măsură să țină pasul. Minerii vor acorda întotdeauna prioritate tranzacțiilor cu `GASPRICE` mai mare, deoarece vor păstra taxele.
4. Tranzacția ta va primi, de asemenea, un număr de confirmare a blocului. Acesta este numărul de blocuri create de la blocul în care a fost inclusă tranzacția. Cu cât numărul este mai mare, cu atât este mai mare certitudinea, că tranzacția a fost procesată și recunoscută de rețea. Acest lucru se datorează faptului că uneori este posibil ca blocul în care a fost inclusă tranzacția ta să nu fi intrat în lanț.
   - Cu cât numărul de confirmare a blocului este mai mare, cu atât tranzacția este mai imuabilă. Deci, pentru tranzacțiile cu valoare mai mare, pot fi dorite mai multe confirmări de bloc.

<!-- **State change**

FROM THE WHITEPAPER:

1. Check if the transaction is well-formed (ie. has the right number of values), the signature is valid, and the nonce matches the nonce in the sender's account. If not, return an error.
2. Calculate the transaction fee as `STARTGAS * GASPRICE`, and determine the sending address from the signature. Subtract the fee from the sender's account balance and increment the sender's nonce. If there is not enough balance to spend, return an error.
3. Initialize `GAS = STARTGAS`, and take off a certain quantity of gas per byte to pay for the bytes in the transaction.
4. Transfer the transaction value from the sender's account to the receiving account. If the receiving account does not yet exist, create it. If the receiving account is a contract, run the contract's code either to completion or until the execution runs out of gas.
5. If the value transfer failed because the sender did not have enough money, or the code execution ran out of gas, revert all state changes except the payment of the fees, and add the fees to the miner's account.
6. Otherwise, refund the fees for all remaining gas to the sender, and send the fees paid for gas consumed to the miner.
 -->
<!-- ## Failed transactions

A transaction can fail for a number of reasons:

- Not enough gas
  - The gas limit is too low
- Reverted -->

<!-- ## Messages

Messages are like transactions between contract accounts but they're not added to the blockchain. They allow smart contracts to call other contracts and trigger their execution.

FROM WHITEPAPER:

A message is produced when a contract currently executing code executes the `CALL` opcode, which produces and executes a message. Like a transaction, a message leads to the recipient account running its code. Thus, contracts can have relationships with other contracts in exactly the same way that external actors can.

@Sam Richards help me understand messages please :D

```
// FROM SOLIDITY DOCS
Contracts can call other contracts or send ether to non-contract accounts by the means of message calls. Message calls are similar to transactions, in that they have a source, a target, data payload, Ether, gas and return data. In fact, every transaction consists of a top-level message call which in turn can create further message calls.

A contract can decide how much of its remaining gas should be sent with the inner message call and how much it wants to retain. If an out-of-gas exception happens in the inner call (or any other exception), this will be signalled by an error value put onto the stack. In this case, only the gas sent together with the call is used up. In Solidity, the calling contract causes a manual exception by default in such situations, so that exceptions “bubble up” the call stack.

As already said, the called contract (which can be the same as the caller) will receive a freshly cleared instance of memory and has access to the call payload - which will be provided in a separate area called the calldata. After it has finished execution, it can return data which will be stored at a location in the caller’s memory preallocated by the caller.

Calls are limited to a depth of 1024, which means that for more complex operations, loops should be preferred over recursive calls.
```

<!-- Feels like this should maybe form a more advanced/complex doc that sits under transactions. Stuff like Ethers and providers need some sort of intro-->

<!-- ## How to send a transaction -->

<!-- `web3.eth.sendTransaction(transactionObject [, callback])` -->

<!-- Using Ethers and a provider... -->

<!-- ```js
// We require a provider to send transactions
let provider = ethers.getDefaultProvider()

let privateKey =
  "0x3141592653589793238462643383279502884197169399375105820974944592"
let wallet = new ethers.Wallet(privateKey, provider)

let amount = ethers.utils.parseEther("1.0")

let tx = {
  to: "0x88a5c2d9919e46f883eb62f7b8dd9d0cc45bc290",
  // ... or supports ENS names
  // to: "ricmoo.firefly.eth",

  // We must pass in the amount as wei (1 ether = 1e18 wei), so we
  // use this convenience function to convert ether to wei.
  value: ethers.utils.parseEther("1.0"),
}

let sendPromise = wallet.sendTransaction(tx)

sendPromise.then((tx) => {
  console.log(tx)
  // {
  //    // All transaction fields will be present
  //    "nonce", "gasLimit", "pasPrice", "to", "value", "data",
  //    "from", "hash", "r", "s", "v"
  // }
})
``` -->

<!-- **Transaction requests**

Ethers

```js
{
    // Required unless deploying a contract (in which case omit)
    to: addressOrName,  // the target address or ENS name

    // These are optional/meaningless for call and estimateGas
    nonce: 0,           // the transaction nonce
    gasLimit: 0,        // the maximum gas this transaction may spend
    gasPrice: 0,        // the price (in wei) per unit of gas

    // These are always optional (but for call, data is usually specified)
    data: "0x",         // extra data for the transaction, or input for call
    value: 0,           // the amount (in wei) this transaction is sending
    chainId: 3          // the network ID; usually added by a signer
}
``` -->

<!-- **Transaction response**

```js
{
    // Only available for mined transactions
    blockHash: "0x7f20ef60e9f91896b7ebb0962a18b8defb5e9074e62e1b6cde992648fe78794b",
    blockNumber: 3346463,
    timestamp: 1489440489,

    // Exactly one of these will be present (send vs. deploy contract)
    // They will always be a properly formatted checksum address
    creates: null,
    to: "0xc149Be1bcDFa69a94384b46A1F91350E5f81c1AB",

    // The transaction hash
    hash: "0xf517872f3c466c2e1520e35ad943d833fdca5a6739cfea9e686c4c1b3ab1022e",

    // See above "Transaction Requests" for details
    data: "0x",
    from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
    gasLimit: utils.bigNumberify("90000"),
    gasPrice: utils.bigNumberify("21488430592"),
    nonce: 0,
    value: utils.parseEther(1.0017071732629267),

    // The chain ID; 0 indicates replay-attack vulnerable
    // (eg. 1 = Homestead mainnet, 3 = Ropsten testnet)
    chainId: 1,

    // The signature of the transaction (TestRPC may fail to include these)
    r: "0x5b13ef45ce3faf69d1f40f9d15b0070cc9e2c92f3df79ad46d5b3226d7f3d1e8",
    s: "0x535236e497c59e3fba93b78e124305c7c9b20db0f8531b015066725e4bb31de6",
    v: 37,

    // The raw transaction (TestRPC may be missing this)
    raw: "0xf87083154262850500cf6e0083015f9094c149be1bcdfa69a94384b46a1f913" +
           "50e5f81c1ab880de6c75de74c236c8025a05b13ef45ce3faf69d1f40f9d15b0" +
           "070cc9e2c92f3df79ad46d5b3226d7f3d1e8a0535236e497c59e3fba93b78e1" +
           "24305c7c9b20db0f8531b015066725e4bb31de6"
}
``` -->

<!-- ## How are transactions protected/safe? -->

## O demonstrație vizuală {#a-visual-demo}

Privește cum Austin te ghidează prin tranzacții, gaz și minerit. <iframe width="100%" height="315" src="https://www.youtube.com/embed/er-0ihqFQB0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

## Referințe suplimentare {#further-reading}

_Cunoști o resursă comunitară care te-a ajutat? Editează această pagină și adaug-o!_

## Subiecte corelate {#related-topics}

- [Conturi](/developers/docs/accounts/)
- [Mașină virtuală Ethereum (EVM)](/developers/docs/evm/)
- [Gaz](/developers/docs/gas/)
- [Minarea](/developers/docs/consensus-mechanisms/pow/mining/)
