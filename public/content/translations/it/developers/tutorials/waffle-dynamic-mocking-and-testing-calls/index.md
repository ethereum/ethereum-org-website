---
title: "Waffle: simulazioni dinamiche e test delle chiamate del contratto"
description: Guida avanzata su Waffle per usare la simulazione dinamica e testare le chiamate del contratto
author: "Daniel Izdebski"
tags:
  [
    "waffle",
    "smart contract",
    "Solidity",
    "test",
    "simulazione"
  ]
skill: intermediate
lang: it
published: 14-11-2020
---

## Di cosa tratta questa guida? {#what-is-this-tutorial-about}

In questa guida imparerai come:

- usare la simulazione dinamica
- testare le interazioni tra contratti intelligenti

Presupposti:

- sai già come scrivere un semplice contratto intelligente in `Solidity`
- sai già utilizzare `JavaScript` e `TypeScript`
- hai già seguito altre guide di `Waffle` o ne sai già qualcosa

## Simulazione dinamica {#dynamic-mocking}

Perché è utile la simulazione dinamica? Beh, ci consente di scrivere unit test invece di test di integrazione. Cosa significa? Significa che non dobbiamo preoccuparci delle dipendenze dei contratti intelligenti e quindi possiamo testarli tutti in completo isolamento. Lascia che ti mostri come fare.

### **1. Progetto** {#1-project}

Prima di iniziare, dobbiamo preparare un semplice progetto node.js:

```bash
mkdir dynamic-mocking
cd dynamic-mocking
mkdir contracts src

yarn init
# o se usi npm
npm init
```

Iniziamo aggiungendo le dipendenze di typescript e di test: mocha e chai:

```bash
yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# o se usi npm
npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

Ora aggiungiamo `Waffle` ed `ethers`:

```bash
yarn add --dev ethereum-waffle ethers
# o se usi npm
npm install ethereum-waffle ethers --save-dev
```

La struttura del tuo progetto dovrebbe ora essere simile a questa:

```
.
├── contracts
├── package.json
└── test
```

### **2. Contratto intelligente** {#2-smart-contract}

Per avviare la simulazione dinamica, abbiamo bisogno di un contratto intelligente con delle dipendenze. Non preoccuparti, ci penso io!

Ecco un semplice contratto intelligente scritto in `Solidity`, il cui unico scopo è controllare se siamo ricchi. Usa il token ERC20 per verificare se abbiamo abbastanza token. Inseriscilo in `./contracts/AmIRichAlready.sol`.

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

Poiché vogliamo usare la simulazione dinamica non abbiamo bisogno dell'intero ERC20, ecco perché usiamo l'interfaccia IERC20 con una sola funzione.

È ora di creare questo contratto! Per questo, useremo `Waffle`. Per prima cosa, creeremo un semplice file di configurazione `waffle.json` che specifica le opzioni di compilazione.

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

Facile, no? Nella cartella `build/` sono comparsi due file corrispondenti al contratto e all'interfaccia. Li useremo più tardi per i test.

### **3. Test** {#3-testing}

Creiamo un file chiamato `AmIRichAlready.test.ts` per il test vero e proprio. Prima di tutto, dobbiamo gestire le importazioni. Ci serviranno più tardi:

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

Oltre alle dipendenze JS, dobbiamo importare il nostro contratto e la nostra interfaccia compilati:

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

Waffle usa `chai` per i test. Tuttavia, prima di poterlo usare, dobbiamo iniettare i matcher di Waffle in chai stesso:

```typescript
use(solidity)
```

Dobbiamo implementare la funzione `beforeEach()` che ripristinerà lo stato del contratto prima di ogni test. Pensiamo prima a cosa ci serve lì. Per distribuire un contratto abbiamo bisogno di due cose: un portafoglio e un contratto ERC20 distribuito da passare come argomento per il contratto `AmIRichAlready`.

Per prima cosa, creiamo un portafoglio:

```typescript
const [wallet] = new MockProvider().getWallets()
```

Poi, dobbiamo distribuire un contratto ERC20. Ecco la parte difficile: abbiamo solo un'interfaccia. Questa è la parte in cui Waffle ci salva. Waffle ha una funzione magica `deployMockContract()` che crea un contratto usando esclusivamente l' _abi_ dell'interfaccia:

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

Ora, con sia il portafoglio che l'ERC20 distribuito, possiamo procedere e distribuire il contratto `AmIRichAlready`:

```typescript
const contract = await deployContract(wallet, AmIRichAlready, [
  mockERC20.address,
])
```

Con tutto ciò, la nostra funzione `beforeEach()` è terminata. Finora, il tuo file `AmIRichAlready.test.ts` dovrebbe avere questo aspetto:

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

Scriviamo il primo test per il contratto `AmIRichAlready`. Secondo te, di cosa dovrebbe trattare il nostro test? Sì, hai ragione! Dovremmo controllare se siamo già ricchi :)

Ma aspetta un secondo. Come farà il nostro contratto simulato a sapere quali valori restituire? Non abbiamo implementato alcuna logica per la funzione `balanceOf()`. Ancora una volta, Waffle può aiutarci. Il nostro contratto simulato ora ha alcune nuove fantastiche funzionalità:

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

Con questa conoscenza, possiamo finalmente scrivere il nostro primo test:

```typescript
it("restituisce false se il portafoglio ha meno di 1000000 token", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Analizziamo questo test in parti:

1. Impostiamo il nostro contratto ERC20 simulato affinché restituisca sempre un saldo di 999999 token.
2. Controlla se il metodo `contract.check()` restituisce `false`.

Siamo pronti a scatenare la bestia:

![Un test superato](./test-one.png)

Quindi il test funziona, ma... c'è ancora margine di miglioramento. La funzione `balanceOf()` restituirà sempre 99999. Possiamo migliorarlo specificando un portafoglio per il quale la funzione dovrebbe restituire qualcosa, proprio come un contratto reale:

```typescript
it("restituisce false se il portafoglio ha meno di 1000001 token", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Finora abbiamo testato solo il caso in cui non siamo abbastanza ricchi. Testiamo invece il caso opposto:

```typescript
it("restituisce true se il portafoglio ha almeno 1000001 token", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

Esegui i test...

![Due test superati](test-two.png)

...ed ecco fatto! Il nostro contratto sembra funzionare come previsto :)

## Testare le chiamate di contratto {#testing-contract-calls}

Ricapitoliamo quanto fatto finora. Abbiamo testato la funzionalità del nostro contratto `AmIRichAlready` e sembra che funzioni correttamente. Ciò significa che abbiamo finito, giusto? Non esattamente! Waffle ci permette di testare il nostro contratto ancora più a fondo. Ma come, esattamente? Beh, nell'arsenale di Waffle ci sono i matcher `calledOnContract()` e `calledOnContractWith()`. Ci permetteranno di verificare se il nostro contratto ha chiamato il contratto ERC20 simulato. Ecco un test di base con uno di questi matcher:

```typescript
it("controlla se il contratto ha chiamato balanceOf sul token ERC20", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

Possiamo spingerci ancora oltre e migliorare questo test con l'altro matcher di cui ti ho parlato:

```typescript
it("controlla se il contratto ha chiamato balanceOf con un certo portafoglio sul token ERC20", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContractWith(mockERC20, [wallet.address])
})
```

Verifichiamo se i test sono corretti:

![Tre test superati](test-three.png)

Fantastico, tutti i test sono positivi.

Testare le chiamate di contratto con Waffle è super facile. E questa è la parte migliore. Questi matcher funzionano sia con i contratti normali che con quelli simulati! Questo perché Waffle registra e filtra le chiamate EVM anziché iniettare codice, come nel caso delle librerie di test più diffuse per altre tecnologie.

## Il traguardo {#the-finish-line}

Congratulazioni! Ora sai come usare Waffle per testare le chiamate di contratto e simulare i contratti dinamicamente. Ci sono molte altre funzioni interessanti da scoprire. Ti consiglio di approfondire la documentazione di Waffle.

La documentazione di Waffle è disponibile [qui](https://ethereum-waffle.readthedocs.io/).

Il codice sorgente di questa guida è disponibile [qui](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls).

Altre guide che potrebbero interessarti:

- [Testare i contratti intelligenti con Waffle](/developers/tutorials/waffle-test-simple-smart-contract/)
