---
title: "Waffle: simulazioni dinamiche e test delle chiamate del contratto"
description: Tutorial avanzato su Waffle per usare la simulazione dinamica e testare le chiamate di contratto
author: "Daniel Izdebski"
tags:
  - "waffle"
  - "smart contract"
  - "Solidity"
  - "test"
  - "simulazione"
skill: intermediate
lang: it
published: 2020-11-14
---

## A cosa serve questo tutorial? {#what-is-this-tutorial-about}

In questo tutorial imparerai come:

- usare la simulazione dinamica
- testare interazioni tra Smart Contract

Premesse:

- sai già come scrivere un semplice Smart Contract in `Solidity`
- sai utilizzare `JavaScript` e `TypeScript`
- hai seguito altri tutorial di `Waffle<` o ne sai già qualcosa

## Simulazione dinamica {#dynamic-mocking}

Perché la simulazione dinamica è utile? Ci consente di scrivere unit test anziché test di integrazione. Cosa significa? Che non dobbiamo preoccuparci delle dipendenze tra gli Smart Contract, dunque possiamo testarli tutti in completo isolamento. Vediamo come.

### **1. Progetto** {#1-project}

Prima di iniziare dobbiamo preparare un semplice progetto node.js:

```bash
mkdir dynamic-mocking
cd dynamic-mocking
mkdir contracts src

yarn init
# or if you're using npm
npm init
```

Iniziamo aggiungendo dipendenze typescript e di test: mocha e chai:

```bash
yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# or if you're using npm
npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

Ora aggiungiamo `Waffle` e `ethers`:

```bash
yarn add --dev ethereum-waffle ethers
# or if you're using npm
npm install ethereum-waffle ethers --save-dev
```

La struttura del progetto sarà ora simile a:

```
.
├── contracts
├── package.json
└── test
```

### **2. Smart Contract** {#2-smart-contract}

Per avviare la simulazione dinamica, serve uno Smart Contract con dipendenze. Nessun problema.

Ecco un semplice Smart Contract scritto in `Solidity` con il solo scopo di controllare se siamo ricchi. Usa il token ERC20 per verificare se abbiamo abbastanza token. Inseriscilo in `./contracts/AmIRichAlready.sol`.

```solidity
pragma solidity ^0.6.2;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}

contract AmIRichAlready {
    IERC20 private tokenContract;
    uint public richness = 1000000 * 10 ** 18;

    constructor (IERC20 _tokenContract) public {
        tokenContract = _tokenContract;
    }

    function check() public view returns (bool) {
        uint balance = tokenContract.balanceOf(msg.sender);
        return balance > richness;
    }
}
```

Poiché vogliamo usare la simulazione dinamica, non ci serve tutto ERC20, quindi usiamo l'interfaccia IERC20 con una sola funzione.

È ora di creare questo contratto. Per questo useremo `Waffle`. Prima, creeremo un semplice file di configurazione `waffle.json` che specifichi le opzioni di compilazione.

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./contracts",
  "outputDirectory": "./build"
}
```

Ora siamo pronti a creare il contratto con Waffle:

```bash
npx waffle
```

Facile, vero? Nella cartella `build/` sono comparsi due file corrispondenti al contratto e all'interfaccia. Li useremo dopo per i test.

### **3. Test** {#3-testing}

Creiamo un file chiamato `AmIRichAlready.test.ts` per il test reale. Prima di tutto, dobbiamo gestire le importazioni. Ci serviranno dopo:

```typescript
import { expect, use } from "chai"
import { Contract, utils, Wallet } from "ethers"
import {
  deployContract,
  deployMockContract,
  MockProvider,
  solidity,
} from "ethereum-waffle"
```

A parte le dipendenze JS, dobbiamo importare il contratto e l'interfaccia creati:

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

Waffle usa `chai` per il test. Tuttavia, prima di poterlo usare, dobbiamo inserire i matcher di Waffle in chai:

```typescript
use(solidity)
```

Dobbiamo implementare la funzione `beforeEach()` che ripristinerà lo stato del contratto prima di ogni test. Prima pensiamo a cosa ci serve. Per distribuire un contratto servono due cose: un portafoglio e un contratto ERC20 distribuito da passare come argomento per il contratto `AmIRichAlready`.

Prima creiamo un portafoglio:

```typescript
const [wallet] = new MockProvider().getWallets()
```

Poi dobbiamo distribuire un contratto ERC20. Ecco la parte complicata: abbiamo solo un'interfaccia. Questa è la parte in cui Waffle ci viene in aiuto. Waffle ha la funzione magica `deployMockContract()` che crea un contratto usando solo l'_abi_ dell'interfaccia:

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

Ora con il portafoglio e l'ERC20 distribuito, possiamo continuare e distribuire il contratto `AmIRichAlready`:

```typescript
const contract = await deployContract(wallet, AmIRichAlready, [
  mockERC20.address,
])
```

A questo punto, la funzione `beforeEach()` è finita. Il file `AmIRichAlready.test.ts` avrà il seguente aspetto:

```typescript
import { expect, use } from "chai"
import { Contract, utils, Wallet } from "ethers"
import {
  deployContract,
  deployMockContract,
  MockProvider,
  solidity,
} from "ethereum-waffle"

import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"

use(solidity)

describe("Am I Rich Already", () => {
  let mockERC20: Contract
  let contract: Contract
  let wallet: Wallet

  beforeEach(async () => {
    ;[wallet] = new MockProvider().getWallets()
    mockERC20 = await deployMockContract(wallet, IERC20.abi)
    contract = await deployContract(wallet, AmIRichAlready, [mockERC20.address])
  })
})
```

Scriviamo il primo test per il contratto `AmIRichAlready`. Cosa pensi dovrebbe fare il test? Esatto! Dobbiamo controllare se siamo già ricchi :)

Ma aspetta un attimo. Come farà il nostro contratto simulato a sapere che valori restituire? Non abbiamo implementato alcuna logica per la funzione `balanceOf()`. Di nuovo, Waffle ci viene in aiuto. Il nostro contratto simulato ha contenuto interessante:

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

Con queste informazioni possiamo finalmente scrivere il primo test:

```typescript
it("returns false if the wallet has less than 1000000 tokens", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Dividiamo il test in due parti:

1. Impostiamo il contratto ERC20 simulato per restituire il saldo di 999999 token.
2. Controlliamo se il metodo `contract.check()` restituisce `false`.

Siamo pronti a scatenare la bestia:

![Un test superato](./test-one.png)

Quindi il test funziona, ma... si può ancora migliorare. La funzione `balanceOf()` restituirà sempre 99999. Possiamo migliorarla specificando un portafoglio per cui la funzione deve restituire qualcosa, proprio come un vero contratto:

```typescript
it("returns false if the wallet has less than 1000001 tokens", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Finora, abbiamo testato solo il caso in cui non siamo abbastanza ricchi. Testiamo invece l'opposto:

```typescript
it("returns true if the wallet has at least 1000001 tokens", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

Esegui i test...

![Due test superati](test-two.png)

...ed ecco qui! Il nostro contratto sembra funzionare come previsto :)

## Test delle chiamate del contratto {#testing-contract-calls}

Ricapitoliamo cosa abbiamo fatto finora. Abbiamo testato la funzionalità del contratto `AmIRichAlready` che sembra funzionare correttamente. Quindi abbiamo finito, giusto? Non proprio. Waffle ci consente di testare il nostro contratto ancora più a fondo. Ma come esattamente? Beh, nell'arsenale di Waffle ci sono i matcher `calledOnContract()` e `calledOnContractWith()`. Ci consentiranno di verificare se il contratto ha chiamato il contratto simulato ERC20. Ecco un test di base con uno di questi matcher:

```typescript
it("checks if contract called balanceOf on the ERC20 token", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

Possiamo andare persino oltre e migliorare questo test con l'altro matcher che ho indicato:

```typescript
it("checks if contract called balanceOf with certain wallet on the ERC20 token", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContractWith(mockERC20, [wallet.address])
})
```

Controlliamo se i test sono corretti:

![Tre test superati](test-three.png)

Ottimo, tutti i test danno luce verde.

Testare le chiamate di contratto con Waffle è facilissimo. Ma ecco la parte migliore. Questi matcher funzionano sia con contratti normali che simulati! Questo perché Waffle registra e filtra le chiamate all'EVM piuttosto che inserire il codice, come invece fanno librerie di testing popolari di altre tecnologie.

## Il traguardo {#the-finish-line}

Congratulazioni! Ora sai come usare Waffle per testare le chiamate di contratto e i contratti simulati dinamicamente. Ci sono funzionalità ben più interessanti da scoprire. Ti consiglio di tuffarti nella documentazione di Waffle.

La documentazione di Waffle è disponibile [qui](https://ethereum-waffle.readthedocs.io/).

Il codice sorgente di questo tutorial si può trovare [qui](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls).

Altri tutorial che potrebbero interessarti:

- [Test di Smart Contract con Waffle](/developers/tutorials/testing-smart-contract-with-waffle/)
