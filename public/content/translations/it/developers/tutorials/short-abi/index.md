---
title: "ABI brevi per l'ottimizzazione dei calldata"
description: Ottimizzare gli smart contract per i Rollup ottimistici
author: Ori Pomerantz
lang: it
tags:
  - "livello 2"
skill: intermediate
published: 2022-04-01
---

## Introduzione {#introduction}

In questo articolo conoscerai i [rollup ottimistici](/developers/docs/scaling/optimistic-rollups), il costo delle transazioni su di essi e come tale diversa struttura di costo ci imponga di ottimizzare diversi aspetti rispetto alla Rete principale di Ethereum. Imparerai anche come implementare quest'ottimizzazione.

### Divulgazione completa {#full-disclosure}

Sono un dipendente a tempo pieno di [Optimism](https://www.optimism.io/), quindi gli esempi in questo articolo saranno eseguiti su Optimism. Tuttavia la tecnica qui spiegata dovrebbe funzionare altrettanto bene per altri rollup.

### Terminologia {#terminology}

Parlando di rollup, il termine "livello 1" (L1) è usato per la Rete principale, la rete di produzione di Ethereum. Il termine "livello 2" (L2) è usato per il rollup o qualsiasi altro sistema che si basa sul L1 per la sicurezza ma svolge gran parte della sua elaborazione al di fuori della catena.

## Come possiamo ridurre ulteriormente il costo delle transazioni su L2? {#how-can-we-further-reduce-the-cost-of-L2-transactions}

I [Rollup ottimistici](/developers/docs/scaling/optimistic-rollups) devono conservare un registro di ogni transazione storica, così che chiunque possa consultarlo e verificare che lo stato corrente sia corretto. Il metodo più economico per inserire dati nella Rete principale di Ethereum è scriverli come calldata. Questa soluzione è stata scelta sia da [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) che da [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups).

### Costo delle transazioni su L2 {#cost-of-l2-transactions}

Il costo delle transazioni su L2 ha due componenti:

1. Elaborazione su L2, solitamente estremamente economica
2. Archiviazione sul L1, legata ai costi del gas della Rete Principale

Al momento della redazione, su Optimism il costo del gas del L2 è 0,001 [Gwei](/developers/docs/gas/#pre-london). Il costo del gas del L1, d'altra parte, è approssimativamente di 40 gwei. [Puoi visualizzare i prezzi correnti qui](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

Un byte di dati di chiamata costa 4 gas (se è zero) o 16 gas (se ha qualsiasi altro valore). Una delle operazioni più costose sull'EVM è scrivere in memoria. Il costo massimo della scrittura di una parola di 32 byte all'archiviazione sul L2, è di 22.100 gas. Attualmente, ciò equivale a 22,1 gwei. Quindi, se possiamo risparmiare un singolo byte zero di calldata, potremo scrivere circa 200 byte in memoria e ne usciremo comunque bene.

### L'ABI {#the-abi}

La stragrande maggioranza delle transazioni, accede a un contratto da un conto posseduto esternamente. Gran parte dei contratti è scritta in Solidity e interpreta il proprio campo dei dati secondo [l'interfaccia binaria dell'applicazione (Application Binary Interface – ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Tuttavia, l'ABI è stata progettata per il L1, dove un byte di calldata costa approssimativamente quanto quattro operazioni aritmetiche, non per il L2 dove un byte di calldata costa più di un migliaio di operazioni aritmetiche. Ad esempio, [ecco una transazione di trasferimento ERC-20](https://kovan-optimistic.etherscan.io/tx/0x7ce4c144ebfce157b4de99d8ad53a352ae91b57b3fa06d8a1c79439df6bfa998). I calldata sono divisi come segue:

| Sezione                   | Lunghezza |  Byte | Byte sprecati | Gas sprecato | Byte necessari | Gas necessario |
| ------------------------- | --------: | ----: | ------------: | -----------: | -------------: | -------------: |
| Selettore della funzione  |         4 |   0-3 |             3 |           48 |              1 |             16 |
| Zeri                      |        12 |  4-15 |            12 |           48 |              0 |              0 |
| Indirizzo di destinazione |        20 | 16-35 |             0 |            0 |             20 |            320 |
| Importo                   |        32 | 36-67 |            17 |           64 |             15 |            240 |
| Totale                    |        68 |       |               |          160 |                |            576 |

Spiegazione:

- **Selettore della funzione**: il contratto ha meno di 256 funzioni, quindi, possiamo distinguerle con un solo byte. Questi byte sono tipicamente diversi da zero e, dunque, [costano sedici gas](https://eips.ethereum.org/EIPS/eip-2028).
- **Zeri**: questi byte sono sempre zero perché un indirizzo di venti byte non richiede una parola di trentadue byte. I byte contenenti zero costano quattro gas ([vedi lo yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf), Appendice G, p. 27, il valore per `G`<sub>`txdatazero`</sub>).
- **Importo**: se supponiamo che in questo contratto, `decimals` sia diciotto (il valore normale) e l'importo massimo di token che trasferiamo sarà 10<sup>18</sup>, otteniamo un importo massimo di 10<sup>36</sup>. 256<sup>15</sup> &gt; 10<sup>36</sup>, quindi quindici byte sono sufficienti.

Uno spreco di 160 gas sul L1 è di norma trascurabile. Una transazione costa almeno [21.000 gas](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), quindi un ulteriore 0,8% non conta. Tuttavia, sul L2 le cose sono diverse. Quasi l'intero costo della transazione deriva dalla scrittura sul L1. Oltre ai calldata della transazione, ci sono 109 byte di intestazione della transazione (indirizzo di destinazione, firma, ecc.). Il costo totale è dunque `109*16+576+160=2480`, e ne stiamo sprecando circa il 6,5%.

## Ridurre i costi quando non controlli la destinazione {#reducing-costs-when-you-dont-control-the-destination}

Supponendo di non avere il controllo sul contratto di destinazione, puoi comunque usare una soluzione simile a [questa](https://github.com/qbzzt/ethereum.org-20220330-shortABI). Vediamo i file pertinenti.

### Token.sol {#token-sol}

[Questo è il contratto di destinazione](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol). È un contratto ERC-20 standard, con una funzionalità aggiuntiva. Questa funzione `faucet` consente a qualsiasi utente di ottenere dei token da usare. Renderebbe inutile una produzione del contratto ERC-20, ma semplifica la vita quando l'ERC-20 esiste solo per facilitare i test.

```solidity
    /**
     * @dev Dà al chiamante 1000 token da usare
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

[Puoi vedere un esempio di questo contratto distribuito qui](https://kovan-optimistic.etherscan.io/address/0x950c753c0edbde44a74d3793db738a318e9c8ce8).

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[Questo è il contratto che le transazioni dovrebbero chiamare con calldata più brevi](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol). Analizziamolo riga per riga.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

Ci serve la funzione del token per sapere come chiamarla.

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

L'indirizzo del token per cui siamo un proxy.

```solidity

    /**
     * @dev Specifica l'indirizzo del token
     * @param tokenAddr_ Indirizzo del contratto ERC-20
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // constructor
```

L'indirizzo del token è l'unico parametro che dobbiamo specificare.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

Leggi un valore dai calldata.

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal il limite di lunghezza è 32 byte");

        require(length + startByte <= msg.data.length,
            "calldataVal sta provando a leggere oltre calldatasize");
```

Caricheremo in memoria un'unica parola da 32 byte (256 bit) e rimuoveremo i byte che non fanno parte del campo che vogliamo. Questo algoritmo non funziona per valori più lunghi di 32 byte e, ovviamente, non possiamo leggere oltre il termine dei calldata. Sul L1, potrebbe esser necessario saltare questi test per risparmiare sul gas, ma sul L2, il gas è estremamente economico, consentendo qualsiasi controllo d'integrità immaginabile.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Potremmo aver copiato i dati dalla chiamata a `fallback()` (vedi sotto), ma è più facile usare [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html), il linguaggio assembly dell'EVM.

Qui usiamo [l'opcode CALLDATALOAD](https://www.evm.codes/#35) per leggere i byte da `startByte` a `startByte+31` nello stack. In generale, la sintassi di un opcode su Yul è `<opcode name>(<first stack value, if any>,<second stack value, if any>...)`.

```solidity

        _retVal = _retVal >> (256-length*8);
```

Solo i byte `length` più significativi fanno parte del campo, quindi effettuiamo uno [spostamento a destra](https://en.wikipedia.org/wiki/Logical_shift) per liberarci degli altri valori. Questo ha il vantaggio aggiuntivo di spostare il valore a destra del campo, quindi è il valore stesso invece del valore moltiplicato per 256<sup>qualcosa</sup>.

```solidity

        return _retVal;
    }


    fallback() external {
```

Quando una chiamata a un contratto in Solidity non corrisponde ad alcuna delle firme della funzione, chiama [la funzione `fallback()`](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) (supponendo che ne esista una). Nel caso di `CalldataInterpreter`, _qualsiasi_ chiamata arriva qui perché non vi sono altre funzioni `external` o `public`.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

Leggi il primo byte dei calldata, che ci dice la funzione. Ci sono due motivi per cui una funzione potrebbe non essere disponibile qui:

1. Le funzioni che sono `pure` o `view` non cambiano lo stato e non costano gas (quando chiamate al di fuori della catena). Non ha senso provare a ridurne il loro costo del gas.
2. Le funzioni che si affidano a [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties). Il valore del `msg.sender` sarà l'indirizzo `CalldataInterpreter`, non il chiamante.

Sfortunatamente, [guardando alle specifiche dell'ERC-20](https://eips.ethereum.org/EIPS/eip-20), questo lascia solo una funzione: `transfer`. Questo ci lascia con soltanto due funzioni: `transfer` (poiché possiamo chiamare `transferFrom`) e `faucet` (poiché possiamo ritrasferire i token a chiunque ci abbia chiamati).

```solidity

        // Chiama i metodi di modifica dello stato del token usando
        // informazioni dal calldata

        // faucet
        if (_func == 1) {
```

Una chiamata a `faucet()`, priva di parametri.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

Dopo aver chiamato `token.faucet()` otteniamo i token. Tuttavia, come contratto proxy, non **necessitiamo** di token. L'EOA (conto posseduto esternamente) o il contratto che ci ha chiamati, sì. Quindi trasferiamo tutti i nostri token a chiunque ci abbia chiamati.

```solidity
        // transfer (suppone un'identità per esso)
        if (_func == 2) {
```

Il trasferimento dei token richiede due parametri: l'indirizzo di destinazione e l'importo.

```solidity
            token.transferFrom(
                msg.sender,
```

Consentiamo solo ai chiamanti di trasferire i token che possiedono

```solidity
                address(uint160(calldataVal(1, 20))),
```

L'indirizzo di destinazione inizia al byte #1 (il byte #0 è la funzione). Come indirizzo, è lungo 20 byte.

```solidity
                calldataVal(21, 2)
```

Per questo contratto specifico supponiamo che il numero massimo di token che chiunque voglia trasferire entri in due byte (meno di 65536).

```solidity
            );
        }
```

In generale, un trasferimento richiede 35 byte di calldata:

| Sezione                   | Lunghezza |  Byte |
| ------------------------- | --------: | ----: |
| Selettore della funzione  |         1 |     0 |
| Indirizzo di destinazione |        32 |  1-32 |
| Importo                   |         2 | 33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[Questo test unitario di JavaScript](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) ci mostra come usare questo meccanismo (e come verificare che funzioni correttamente). Partirò dal presupposto che tu comprenda [chai](https://www.chaijs.com/) ed [ether](https://docs.ethers.io/v5/) e spiegherò solo le parti che si applicano nello specifico al contratto.

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Should let us use tokens", async function () {
    const Token = await ethers.getContractFactory("OrisUselessToken")
    const token = await Token.deploy()
    await token.deployed()
    console.log("Token addr:", token.address)

    const Cdi = await ethers.getContractFactory("CalldataInterpreter")
    const cdi = await Cdi.deploy(token.address)
    await cdi.deployed()
    console.log("CalldataInterpreter addr:", cdi.address)

    const signer = await ethers.getSigner()
```

Iniziamo distribuendo entrambi i contratti.

```javascript
    // Ottiene token da usare
    const faucetTx = {
```

Non possiamo usare le funzioni di alto livello che useremmo normalmente (come `token.faucet()`) per creare le transazioni, perché non seguiamo l'ABI. Invece, dobbiamo costruire noi stessi la transazione e poi inviarla.

```javascript
      to: cdi.address,
      data: "0x01"
```

Ci sono due parametri che dobbiamo fornire per la transazione:

1. `to`, l'indirizzo di destinazione. Questo è il contratto dell'interprete dei calldata.
2. `data`, i calldata da inviare. Nel caso di una chiamata al faucet, i dati sono in un singolo byte, `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

Chiamiamo [il metodo `sendTransaction` del firmatario](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction) perché abbiamo già specificato la destinazione (`faucetTx.to`) e ci serve che la transazione sia firmata.

```javascript
// Controlla che il faucet fornisca correttamente i token
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

Qui verifichiamo il saldo. Non serve risparmiare gas sulle funzioni `view`, quindi le eseguiamo normalmente.

```javascript
// Dà un'indennità al CDI (impossibile proxare le approvazioni)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

Dà all'interprete dei calldata un'indennità per poter effettuare trasferimenti.

```javascript
// Trasferisce i token
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

Crea una transazione di trasferimento. Il primo byte è "0x02", seguito dall'indirizzo di destinazione e infine dall'importo (0x0100, ovvero 256 in decimale).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Verifichiamo che abbiamo 256 token in meno
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // E che la nostra destinazione li ha ricevuti
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

### Esempio {#example}

Se desideri vedere questi file in azione senza eseguirli tu stesso, segui questi link:

1. [Distribuzione di`OrisUselessToken`](https://kovan-optimistic.etherscan.io/tx/1410744) all'[indirizzo `0x950c753c0edbde44a74d3793db738a318e9c8ce8`](https://kovan-optimistic.etherscan.io/address/0x950c753c0edbde44a74d3793db738a318e9c8ce8).
2. [Distribuzione di `CalldataInterpreter`](https://kovan-optimistic.etherscan.io/tx/1410745) all'[indirizzo `0x16617fea670aefe3b9051096c0eb4aeb4b3a5f55`](https://kovan-optimistic.etherscan.io/address/0x16617fea670aefe3b9051096c0eb4aeb4b3a5f55).
3. [Chiamata a `faucet()`](https://kovan-optimistic.etherscan.io/tx/1410746).
4. [Chiamata a `OrisUselessToken.approve()`](https://kovan-optimistic.etherscan.io/tx/1410747). Questa chiamata deve andare direttamente al contratto del token, poiché l'elaborazione si affida al `msg.sender`.
5. [Chiamata a `transfer()`](https://kovan-optimistic.etherscan.io/tx/1410748).

## Ridurre il costo quando hai il controllo del contratto di destinazione {#reducing-the-cost-when-you-do-control-the-destination-contract}

Se hai il controllo sul contratto di destinazione, puoi creare funzioni che bypassano i controlli `msg.sender` poiché si fidano dell'interprete dei calldata. [Puoi vedere un esempio di come funziona qui, nel ramo `control-contract`](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).

Se il contratto rispondesse solo alle transazioni esterne, potremmo riuscirsi con un solo contratto. Tuttavia, questo spezzerebbe la [componibilità](/developers/docs/smart-contracts/composability/). È molto meglio avere un contratto che risponda alle normali chiamate ERC-20 e un altro che risponda alle transazioni con dati della chiamata brevi.

### Token.sol {#token-sol-2}

In questo esempio, possiamo modificare `Token.sol`. Questo ci permette di avere un numero di funzioni che solo il proxy può chiamare. Ecco le nuove parti:

```solidity
    // Il solo indirizzo che può specificare l'indirizzo di CalldataInterpreter
    address owner;

    // L'indirizzo di CalldataInterpreter
    address proxy = address(0);
```

Il contratto ERC-20 deve conoscere l'identità del proxy autorizzato. Tuttavia, non possiamo impostare questa variabile nel costruttore, perché non conosciamo ancora il valore. Questo contratto è stato istanziato subito poiché il proxy si aspetta che l'indirizzo del token sia nel suo costruttore.

```solidity
    /**
     * @dev Chiama il costruttore dell'ERC-20.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

L'indirizzo del creatore (chiamato `owner`) è memorizzato qui perché è l'unico indirizzo autorizzato a impostare il proxy.

```solidity
    /**
     * @dev imposta l'indirizzo per il proxy (il CalldataInterpreter).
     * Può esser chiamata solo dal proprietario
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Può esser chiamata solo dal proprietario");
        require(proxy == address(0), "Proxy già impostato");

        proxy = _proxy;
    }    // function setProxy
```

Il proxy ha accesso privilegiato, perché può bypassare i controlli di sicurezza. Per essere certi di poterci fidare del proxy, l'unico che può chiamare questa funzione è l'`owner`, e solo una volta. Una volta che `proxy` ha un valore reale (non zero), quel valore non può cambiare, quindi anche se il proprietario diventa malevolo, o la sua mnemonica viene rivelata, siamo comunque al sicuro.

```solidity
    /**
     * @dev Alcune funzioni possono esser chiamate solo dal proxy.
     */
    modifier onlyProxy {
```

Questa è una [funzione `modifier`](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), ossia modifica come funzionano le altre funzioni.

```solidity
      require(msg.sender == proxy);
```

In primo luogo, verifica che siamo stati chiamati dal proxy e da nessun altro. Altrimenti, `revert`.

```solidity
      _;
    }
```

Se è così, esegui la funzione che modifichiamo.

```solidity
   /* Funzioni che consentono al proxy di fare effettivamente il proxy per i conti */

    function transferProxy(address from, address to, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _transfer(from, to, amount);
        return true;
    }

    function approveProxy(address from, address spender, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _approve(from, spender, amount);
        return true;
    }

    function transferFromProxy(
        address spender,
        address from,
        address to,
        uint256 amount
    ) public virtual onlyProxy() returns (bool)
    {
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }
```

Queste sono tre operazioni che normalmente richiedono che il messaggio provenga direttamente dall'entità che sta trasferendo token o approvando un'indennità. Qui abbiamo una versione del proxy di queste operazioni che:

1. È modificata da `onlyProxy()`, così che nessun altro possa controllarla.
2. Ottiene l'indirizzo che sarebbe normalmente `msg.sender` come un parametro aggiuntivo.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

L'interprete dei dati della chiamata è praticamente identico a quello precedente, tranne che le funzioni in proxy ricevono un parametro `msg.sender` e non è necessaria un'indennità per `transfer`.

```solidity
        // transfer (indennità non necessaria)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // approve
        if (_func == 3) {
            token.approveProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // transferFrom
        if (_func == 4) {
            token.transferFromProxy(
                msg.sender,
                address(uint160(calldataVal( 1, 20))),
                address(uint160(calldataVal(21, 20))),
                calldataVal(41, 2)
            );
        }
```

### Test.js {#test-js-2}

Ci sono alcune modifiche tra il codice di test precedente e questo.

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

Dobbiamo dire al contratto ERC-20 di quale proxy fidarsi

```js
console.log("CalldataInterpreter addr:", cdi.address)

// Servono due firmatari per verificare le indennità
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

Per verificare `approve()` e `transferFrom()`, ci serve un secondo firmatario. Lo chiamiamo `poorSigner` perché non riceve nessuno dei nostri token (deve avere degli ETH, ovviamente).

```js
// Trasferisci i token
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

Poiché il contratto ERC-20 si fida del proxy (`cdi`), non ci serve un'indennità per inoltrare i trasferimenti.

```js
// approvazione e transferFrom
const approveTx = {
  to: cdi.address,
  data: "0x03" + poorSigner.address.slice(2, 42) + "00FF",
}
await (await signer.sendTransaction(approveTx)).wait()

const destAddr2 = "0xE1165C689C0c3e9642cA7606F5287e708d846206"

const transferFromTx = {
  to: cdi.address,
  data: "0x04" + signer.address.slice(2, 42) + destAddr2.slice(2, 42) + "00FF",
}
await (await poorSigner.sendTransaction(transferFromTx)).wait()

// Controlla che la combo approva / transferFrom sia stata eseguita correttamente
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

Testa le due nuove funzioni. Nota che `transferFromTx` richiede due parametri dell'indirizzo: l'autore dell'indennità e il destinatario.

### Esempio {#example-2}

Se desideri vedere questi file in azione senza eseguirli tu stesso, segui questi link:

1. [Distribuzione di `OrisUselessToken-2`](https://kovan-optimistic.etherscan.io/tx/1475397) all'indirizzo [`0xb47c1f550d8af70b339970c673bbdb2594011696`](https://kovan-optimistic.etherscan.io/address/0xb47c1f550d8af70b339970c673bbdb2594011696).
2. [Distribuzione di `CalldataInterpreter`](https://kovan-optimistic.etherscan.io/tx/1475400) all'indirizzo [`0x0dccfd03e3aaba2f8c4ea4008487fd0380815892`](https://kovan-optimistic.etherscan.io/address/0x0dccfd03e3aaba2f8c4ea4008487fd0380815892).
3. [Chiamata a `setProxy()`](https://kovan-optimistic.etherscan.io/tx/1475402).
4. [Chiamata a `faucet()`](https://kovan-optimistic.etherscan.io/tx/1475409).
5. [Chiamata a `transferProxy()`](https://kovan-optimistic.etherscan.io/tx/1475416).
6. [Chiamata a `approveProxy()`](https://kovan-optimistic.etherscan.io/tx/1475419).
7. [Chiamata a `transferFromProxy()`](https://kovan-optimistic.etherscan.io/tx/1475421). Nota che questa chiamata proviene da un indirizzo diverso dagli altri, `poorSigner` invece di `signer`.

## Conclusione {#conclusion}

Sia [Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) che [Arbitrum](https://developer.offchainlabs.com/docs/special_features) stanno cercando modi per ridurre le dimensioni dei calldata scritti al L1 e dunque per ridurre il costo delle transazioni. Tuttavia, come fornitori di infrastruttura alla ricerca di soluzioni generiche, le nostre capacità sono limitate. Come sviluppatore di dapp, hai conoscenze specifiche per l'applicazione che ti consentono di ottimizzare i tuoi calldata molto meglio di quanto potremmo fare noi in una soluzione generica. Speriamo che questo articolo ti aiuti a trovare la soluzione ideale per le tue esigenze.
