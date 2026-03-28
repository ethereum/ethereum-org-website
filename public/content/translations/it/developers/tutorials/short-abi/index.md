---
title: "ABI brevi per l'ottimizzazione dei calldata"
description: Ottimizzare i contratti intelligenti per i rollup ottimistici
author: Ori Pomerantz
lang: it
tags: ["livello 2"]
skill: intermediate
breadcrumb: ABI brevi
published: 2022-04-01
---

## Introduzione {#introduction}

In questo articolo, imparerai a conoscere i [rollup ottimistici](/developers/docs/scaling/optimistic-rollups), il costo delle transazioni su di essi e come questa diversa struttura dei costi ci richieda di ottimizzare per cose diverse rispetto alla rete principale di Ethereum.
Imparerai anche come implementare questa ottimizzazione.

### Piena trasparenza {#full-disclosure}

Sono un dipendente a tempo pieno di [Optimism](https://www.optimism.io/), quindi gli esempi in questo articolo verranno eseguiti su Optimism.
Tuttavia, la tecnica spiegata qui dovrebbe funzionare altrettanto bene per altri rollup.

### Terminologia {#terminology}

Quando si discute dei rollup, il termine 'livello 1' (L1) è usato per la rete principale, la rete Ethereum di produzione.
Il termine 'livello 2' (L2) è usato per il rollup o qualsiasi altro sistema che si affida a L1 per la sicurezza ma esegue la maggior parte della sua elaborazione fuori catena.

## Come possiamo ridurre ulteriormente il costo delle transazioni su L2? {#how-can-we-further-reduce-the-cost-of-L2-transactions}

I [rollup ottimistici](/developers/docs/scaling/optimistic-rollups) devono conservare un registro di ogni transazione storica in modo che chiunque possa esaminarle e verificare che lo stato attuale sia corretto.
Il modo più economico per inserire dati nella rete principale di Ethereum è scriverli come calldata.
Questa soluzione è stata scelta sia da [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) che da [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups).

### Costo delle transazioni su L2 {#cost-of-l2-transactions}

Il costo delle transazioni su L2 è composto da due componenti:

1. Elaborazione su L2, che di solito è estremamente economica
2. Archiviazione su L1, che è legata ai costi del gas della rete principale

Nel momento in cui scrivo, su Optimism il costo del gas su L2 è di 0,001 [Gwei](/developers/docs/gas/#pre-london).
Il costo del gas su L1, d'altra parte, è di circa 40 gwei.
[Puoi vedere i prezzi attuali qui](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

Un byte di calldata costa 4 gas (se è zero) o 16 gas (se è qualsiasi altro valore).
Una delle operazioni più costose sulla macchina virtuale di Ethereum è la scrittura nell'archiviazione.
Il costo massimo per scrivere una parola di 32 byte nell'archiviazione su L2 è di 22100 gas. Attualmente, questo equivale a 22,1 gwei.
Quindi, se riusciamo a risparmiare un singolo byte zero di calldata, saremo in grado di scrivere circa 200 byte nell'archiviazione e trarne comunque vantaggio.

### L'ABI {#the-abi}

La stragrande maggioranza delle transazioni accede a un contratto da un account controllato esternamente.
La maggior parte dei contratti è scritta in Solidity e interpreta il proprio campo dati secondo [l'interfaccia binaria dell'applicazione (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Tuttavia, l'ABI è stata progettata per L1, dove un byte di calldata costa all'incirca quanto quattro operazioni aritmetiche, non per L2 dove un byte di calldata costa più di mille operazioni aritmetiche.
I calldata sono divisi in questo modo:

| Sezione | Lunghezza | Byte | Byte sprecati | Gas sprecato | Byte necessari | Gas necessario |
| ------------------- | -----: | ----: | -----------: | ---------: | --------------: | ------------: |
| Selettore di funzione |      4 |   0-3 |            3 |         48 |               1 |            16 |
| Zeri |     12 |  4-15 |           12 |         48 |               0 |             0 |
| Indirizzo di destinazione |     20 | 16-35 |            0 |          0 |              20 |           320 |
| Importo |     32 | 36-67 |           17 |         64 |              15 |           240 |
| Totale |     68 |       |              |        160 |                 |           576 |

Spiegazione:

- **Selettore di funzione**: Il contratto ha meno di 256 funzioni, quindi possiamo distinguerle con un singolo byte.
  Questi byte sono tipicamente diversi da zero e pertanto [costano sedici gas](https://eips.ethereum.org/EIPS/eip-2028).
- **Zeri**: Questi byte sono sempre zero perché un indirizzo di venti byte non richiede una parola di trentadue byte per contenerlo.
  I byte che contengono zero costano quattro gas ([vedi lo yellow paper](https://ethereum.github.io/yellowpaper/paper.pdf), Appendice G,
  p. 27, il valore per `G`<sub>`txdatazero`</sub>).
- **Importo**: Se supponiamo che in questo contratto i `decimals` siano diciotto (il valore normale) e l'importo massimo di token che trasferiremo sarà 10<sup>18</sup>, otteniamo un importo massimo di 10<sup>36</sup>.
  256<sup>15</sup> &gt; 10<sup>36</sup>, quindi quindici byte sono sufficienti.

Uno spreco di 160 gas su L1 è normalmente trascurabile. Una transazione costa almeno [21.000 gas](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), quindi uno 0,8% in più non ha importanza.
Tuttavia, su L2, le cose sono diverse. Quasi l'intero costo della transazione è scriverla su L1.
Oltre ai calldata della transazione, ci sono 109 byte di intestazione della transazione (indirizzo di destinazione, firma, ecc.).
Il costo totale è quindi `109*16+576+160=2480`, e ne stiamo sprecando circa il 6,5%.

## Ridurre i costi quando non si controlla la destinazione {#reducing-costs-when-you-dont-control-the-destination}

Supponendo che tu non abbia il controllo sul contratto di destinazione, puoi comunque utilizzare una soluzione simile a [questa](https://github.com/qbzzt/ethereum.org-20220330-shortABI).
Esaminiamo i file rilevanti.

### Token.sol {#token-sol}

[Questo è il contratto di destinazione](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
È un contratto ERC-20 standard, con una funzionalità aggiuntiva.
Questa funzione `faucet` consente a qualsiasi utente di ottenere dei token da utilizzare.
Renderebbe inutile un contratto ERC-20 di produzione, ma semplifica la vita quando un ERC-20 esiste solo per facilitare i test.

```solidity
    /* *
     * @dev Fornisce al chiamante 1000 token con cui giocare */
    


    function faucet() external {
        _mint(msg.sender, 1000);
    } // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[Questo è il contratto che le transazioni dovrebbero chiamare con calldata più brevi](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
Esaminiamolo riga per riga.

```solidity
// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

Abbiamo bisogno della funzione del token per sapere come chiamarla.

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

L'indirizzo del token per il quale fungiamo da proxy.

```solidity

    /* *
     * @dev Specifica l'indirizzo del token
     * @param tokenAddr_ Indirizzo del contratto ERC-20 */
    



    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    } // constructor
```

L'indirizzo del token è l'unico parametro che dobbiamo specificare.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

Leggere un valore dai calldata.

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

Caricheremo una singola parola di 32 byte (256 bit) in memoria e rimuoveremo i byte che non fanno parte del campo che desideriamo.
Questo algoritmo non funziona per valori più lunghi di 32 byte e, naturalmente, non possiamo leggere oltre la fine dei calldata.
Su L1 potrebbe essere necessario saltare questi test per risparmiare sul gas, ma su L2 il gas è estremamente economico, il che consente qualsiasi controllo di integrità ci venga in mente.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Avremmo potuto copiare i dati dalla chiamata a `fallback()` (vedi sotto), ma è più facile usare [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html), il linguaggio assembly della macchina virtuale di Ethereum.

Qui usiamo [l'opcode CALLDATALOAD](https://www.evm.codes/#35) per leggere i byte da `startByte` a `startByte+31` nello stack.
In generale, la sintassi di un opcode in Yul è `<nome opcode>(<primo valore dello stack, se presente>,<secondo valore dello stack, se presente>...)`.

```solidity

        _retVal = _retVal >> (256-length*8);
```

Solo i byte di `length` più significativi fanno parte del campo, quindi eseguiamo uno [scorrimento a destra](https://en.wikipedia.org/wiki/Logical_shift) per sbarazzarci degli altri valori.
Questo ha l'ulteriore vantaggio di spostare il valore a destra del campo, in modo che sia il valore stesso piuttosto che il valore moltiplicato per 256<sup>qualcosa</sup>.

```solidity

        return _retVal;
    }


    fallback() external {
```

Quando una chiamata a un contratto Solidity non corrisponde a nessuna delle firme delle funzioni, chiama [la funzione `fallback()`](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) (supponendo che ce ne sia una).
Nel caso di `CalldataInterpreter`, _qualsiasi_ chiamata arriva qui perché non ci sono altre funzioni `external` o `public`.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

Legge il primo byte dei calldata, che ci indica la funzione.
Ci sono due motivi per cui una funzione non sarebbe disponibile qui:

1. Le funzioni che sono `pure` o `view` non cambiano lo stato e non costano gas (quando chiamate fuori catena).
   Non ha senso cercare di ridurre il loro costo del gas.
2. Le funzioni che si basano su [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties).
   Il valore di `msg.sender` sarà l'indirizzo di `CalldataInterpreter`, non il chiamante.

Sfortunatamente, [guardando le specifiche ERC-20](https://eips.ethereum.org/EIPS/eip-20), questo lascia solo una funzione, `transfer`.
Questo ci lascia con solo due funzioni: `transfer` (perché possiamo chiamare `transferFrom`) e `faucet` (perché possiamo trasferire i token indietro a chi ci ha chiamato).

```solidity

        // Chiama i metodi che modificano lo stato del token utilizzando
        // le informazioni dal calldata

        // faucet
        if (_func == 1) {
```

Una chiamata a `faucet()`, che non ha parametri.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

Dopo aver chiamato `token.faucet()` otteniamo dei token. Tuttavia, come contratto proxy, non abbiamo **bisogno** di token.
L'account controllato esternamente (EOA) o il contratto che ci ha chiamato ne ha bisogno.
Quindi trasferiamo tutti i nostri token a chi ci ha chiamato.

```solidity
        // transfer (supponiamo di avere un'allowance per questo)
        if (_func == 2) {
```

Il trasferimento di token richiede due parametri: l'indirizzo di destinazione e l'importo.

```solidity
            token.transferFrom(
                msg.sender,
```

Consentiamo ai chiamanti di trasferire solo i token che possiedono

```solidity
                address(uint160(calldataVal(1, 20))),
```

L'indirizzo di destinazione inizia al byte #1 (il byte #0 è la funzione).
Come indirizzo, è lungo 20 byte.

```solidity
                calldataVal(21, 2)
```

Per questo particolare contratto supponiamo che il numero massimo di token che chiunque vorrebbe trasferire stia in due byte (meno di 65536).

```solidity
            );
        }
```

Nel complesso, un trasferimento richiede 35 byte di calldata:

| Sezione | Lunghezza | Byte |
| ------------------- | -----: | ----: |
| Selettore di funzione |      1 |     0 |
| Indirizzo di destinazione |     32 |  1-32 |
| Importo |      2 | 33-34 |

```solidity
    } // fallback

} // contract CalldataInterpreter
```

### test.js {#test-js}

[Questo test unitario in JavaScript](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) ci mostra come utilizzare questo meccanismo (e come verificare che funzioni correttamente).
Supporrò che tu conosca [chai](https://www.chaijs.com/) ed [ethers](https://docs.ethers.io/v5/) e spiegherò solo le parti che si applicano specificamente al contratto.

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
    // Ottieni token con cui giocare
    const faucetTx = {
```

Non possiamo usare le funzioni di alto livello che useremmo normalmente (come `token.faucet()`) per creare transazioni, perché non seguiamo l'ABI.
Invece, dobbiamo costruire la transazione noi stessi e poi inviarla.

```javascript
      to: cdi.address,
      data: "0x01"
```

Ci sono due parametri che dobbiamo fornire per la transazione:

1. `to`, l'indirizzo di destinazione.
   Questo è il contratto dell'interprete dei calldata.
2. `data`, i calldata da inviare.
   Nel caso di una chiamata al rubinetto, i dati sono un singolo byte, `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

Chiamiamo [il metodo `sendTransaction` del firmatario](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction) perché abbiamo già specificato la destinazione (`faucetTx.to`) e abbiamo bisogno che la transazione sia firmata.

```javascript
// Verifica che il faucet fornisca i token correttamente
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

Qui verifichiamo il saldo.
Non c'è bisogno di risparmiare gas sulle funzioni `view`, quindi le eseguiamo normalmente.

```javascript
// Fornisci un'allowance al CDI (le approvazioni non possono essere gestite tramite proxy)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

Fornisce all'interprete dei calldata un'autorizzazione per poter effettuare trasferimenti.

```javascript
// Trasferisci token
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

Crea una transazione di trasferimento. Il primo byte è "0x02", seguito dall'indirizzo di destinazione e infine dall'importo (0x0100, che è 256 in decimale).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Verifica che abbiamo 256 token in meno
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // E che la nostra destinazione li abbia ricevuti
    expect (await token.balanceOf(destAddr)).to.equal(256)
  }) // it
}) // describe
```

## Ridurre il costo quando si controlla il contratto di destinazione {#reducing-the-cost-when-you-do-control-the-destination-contract}

Se hai il controllo sul contratto di destinazione, puoi creare funzioni che aggirano i controlli di `msg.sender` perché si fidano dell'interprete dei calldata.
[Puoi vedere un esempio di come funziona qui, nel ramo `control-contract`](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).

Se il contratto rispondesse solo a transazioni esterne, potremmo cavarcela con un solo contratto.
Tuttavia, ciò interromperebbe la [componibilità](/developers/docs/smart-contracts/composability/).
È molto meglio avere un contratto che risponde alle normali chiamate ERC-20 e un altro contratto che risponde alle transazioni con dati di chiamata brevi.

### Token.sol {#token-sol-2}

In questo esempio possiamo modificare `Token.sol`.
Questo ci permette di avere una serie di funzioni che solo il proxy può chiamare.
Ecco le nuove parti:

```solidity
    // L'unico indirizzo autorizzato a specificare l'indirizzo del CalldataInterpreter
    address owner;

    // L'indirizzo del CalldataInterpreter
    address proxy = address(0);
```

Il contratto ERC-20 deve conoscere l'identità del proxy autorizzato.
Tuttavia, non possiamo impostare questa variabile nel costruttore, perché non ne conosciamo ancora il valore.
Questo contratto viene istanziato per primo perché il proxy si aspetta l'indirizzo del token nel suo costruttore.

```solidity
    /* *
     * @dev Chiama il costruttore ERC20. */
    


    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

L'indirizzo del creatore (chiamato `owner`) è memorizzato qui perché è l'unico indirizzo autorizzato a impostare il proxy.

```solidity
    /* *
     * @dev imposta l'indirizzo per il proxy (il CalldataInterpreter).
     * Può essere chiamato solo una volta dal proprietario */
    



    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    } // function setProxy
```

Il proxy ha un accesso privilegiato, perché può aggirare i controlli di sicurezza.
Per assicurarci di potercene fidare, permettiamo solo a `owner` di chiamare questa funzione, e solo una volta.
Una volta che `proxy` ha un valore reale (diverso da zero), quel valore non può cambiare, quindi anche se il proprietario decide di diventare disonesto, o la sua frase mnemonica viene rivelata, siamo comunque al sicuro.

```solidity
    /* *
     * @dev Alcune funzioni possono essere chiamate solo dal proxy. */
    


    modifier onlyProxy {
```

Questa è una [funzione `modifier`](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), modifica il modo in cui funzionano le altre funzioni.

```solidity
      require(msg.sender == proxy);
```

Per prima cosa, verifica che siamo stati chiamati dal proxy e da nessun altro.
In caso contrario, esegue un `revert`.

```solidity
      _;
    }
```

In caso affermativo, esegue la funzione che modifichiamo.

```solidity
   /* Funzioni che consentono al proxy di fungere effettivamente da proxy per gli account */
   /* Functions that allow the proxy to actually proxy for accounts */

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

Queste sono tre operazioni che normalmente richiedono che il messaggio provenga direttamente dall'entità che trasferisce i token o che approva un'autorizzazione.
Qui abbiamo una versione proxy di queste operazioni che:

1. È modificata da `onlyProxy()` in modo che a nessun altro sia permesso controllarle.
2. Ottiene l'indirizzo che normalmente sarebbe `msg.sender` come parametro aggiuntivo.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

L'interprete dei calldata è quasi identico a quello precedente, tranne per il fatto che le funzioni proxy ricevono un parametro `msg.sender` e non c'è bisogno di un'autorizzazione per il `transfer`.

```solidity
        // transfer (nessun bisogno di allowance)
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

// Sono necessari due firmatari per verificare le allowance
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

Per controllare `approve()` e `transferFrom()` abbiamo bisogno di un secondo firmatario.
Lo chiamiamo `poorSigner` perché non ottiene nessuno dei nostri token (deve avere ETH, ovviamente).

```js
// Trasferisci token
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

Poiché il contratto ERC-20 si fida del proxy (`cdi`), non abbiamo bisogno di un'autorizzazione per inoltrare i trasferimenti.

```js
// approval e transferFrom
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

// Verifica che la combinazione approve / transferFrom sia stata eseguita correttamente
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

Testa le due nuove funzioni.
Nota che `transferFromTx` richiede due parametri di indirizzo: chi fornisce l'autorizzazione e il destinatario.

## Conclusione {#conclusion}

Sia [Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) che [Arbitrum](https://developer.offchainlabs.com/docs/special_features) stanno cercando modi per ridurre le dimensioni dei calldata scritti su L1 e quindi il costo delle transazioni.
Tuttavia, come fornitori di infrastrutture alla ricerca di soluzioni generiche, le nostre capacità sono limitate.
Come sviluppatore di dApp, hai una conoscenza specifica dell'applicazione, che ti consente di ottimizzare i tuoi calldata molto meglio di quanto potremmo fare noi in una soluzione generica.
Speriamo che questo articolo ti aiuti a trovare la soluzione ideale per le tue esigenze.

[Vedi qui per altri miei lavori](https://cryptodocguy.pro/).