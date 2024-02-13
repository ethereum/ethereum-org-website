---
title: Testare semplici contratti intelligenti con la libreria Waffle
description: Tutorial per principianti
author: Ewa Kowalska
tags:
  - "contratti intelligenti"
  - "Solidity"
  - "Waffle"
  - "test"
skill: beginner
lang: it
published: 2021-02-26
---

## In questo tutorial imparerai come {#in-this-tutorial-youll-learn-how-to}

- Testare le modifiche del saldo del portafoglio
- Testare l'emissione di eventi con gli argomenti specificati
- Imporre il ripristino di una transazione

## Premesse {#assumptions}

- Sei in grado di creare un nuovo progetto JavaScript o TypeScript
- Hai delle esperienze di base con i test in JavaScript
- Hai utilizzato dei gestori di pacchetti come yarn o npm
- Possiedi conoscenze molto essenziali dei contratti intelligenti e di Solidity

# Primi passi {#getting-started}

Il tutorial dimostra la configurazione di prova e opera utilizzando yarn, ma non ci sono problemi se preferisci npm: fornirò gli adeguati riferimenti alla [documentazione](https://ethereum-waffle.readthedocs.io/en/latest/index.html) ufficiale di Waffle.

## Installa dipendenze {#install-dependencies}

[Aggiungi](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#installation) ethereum-waffle e le dipendenze di TypeScript alle dipendenze di sviluppo del tuo progetto.

```bash
yarn add --dev ethereum-waffle ts-node typescript @types/jest
```

## Esempio di contratto intelligente {#example-smart-contract}

Durante il tutorial lavoreremo a un esempio di contratto intelligente semplice: EtherSplitter. Non fa molto, tranne che consentire a chiunque di inviare wei e dividerli uniformemente tra due destinatari predefiniti. La funzione di divisione richiede che il numero di wei sia pari, altrimenti si ripristinerà. Per entrambi i destinatari esegue un trasferimento di wei, seguito dall'emissione dell'evento Trasferimento.

Posiziona il frammento del codice di EtherSplitter in `src/EtherSplitter.sol`.

```solidity
pragma solidity ^0.6.0;

contract EtherSplitter {
    address payable receiver1;
    address payable receiver2;

    event Transfer(address from, address to, uint256 amount);

    constructor(address payable _address1, address payable _address2) public {
        receiver1 = _address1;
        receiver2 = _address2;
    }

    function split() public payable {
        require(msg.value % 2 == 0, 'Uneven wei amount not allowed');
        receiver1.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver1, msg.value / 2);
        receiver2.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver2, msg.value / 2);
    }
}
```

## Compila il contratto {#compile-the-contract}

Per [compilare](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#compiling-the-contract) il contratto, aggiungi il seguente elemento al file package.json:

```json
"scripts": {
    "build": "waffle"
  }
```

Poi, crea un file di configurazione di Waffle nella cartella di root del progetto, `waffle.json`, e incolla qui la seguente configurazione:

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./src",
  "outputDirectory": "./build"
}
```

Esegui `yarn build`. Di conseguenza, la cartella `build` apparirà con il contratto compilato di EtherSplitter nel formato JSON.

## Testare la configurazione {#test-setup}

Testare con Waffle richiede l'utilizzo di abbinatori Chai e Mocha, quindi, devi [aggiungerli](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests) al tuo progetto. Aggiorna il tuo file package.json e aggiungi l'elemento `test` nella parte degli script:

```json
"scripts": {
    "build": "waffle",
    "test": "export NODE_ENV=test && mocha -r ts-node/register 'test/**/*.test.ts'"
  }
```

Se desideri [eseguire](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#running-tests) i tuoi test, basta eseguire `yarn test`.

# Test {#testing}

Ora, crea la cartella `test` e crea il nuovo file `test\EtherSplitter.test.ts`. Copia il seguente frammento e incollalo sul nostro file di test.

```ts
import { expect, use } from "chai"
import { Contract } from "ethers"
import { deployContract, MockProvider, solidity } from "ethereum-waffle"
import EtherSplitter from "../build/EtherSplitter.json"

use(solidity)

describe("Ether Splitter", () => {
  const [sender, receiver1, receiver2] = new MockProvider().getWallets()
  let splitter: Contract

  beforeEach(async () => {
    splitter = await deployContract(sender, EtherSplitter, [
      receiver1.address,
      receiver2.address,
    ])
  })

  // add the tests here
})
```

Solo due parole prima di iniziare. `MockProvider` offre una versione fittizia della blockchain. Inoltre, fornisce portafogli fittizi che ci serviranno per testare il contratto di EtherSplitter. Possiamo ottenere fino a dieci portafogli chiamando il metodo `getWallets()` sul fornitore. Nell'esempio, otteniamo tre portafogli: per il mittente e per i due destinatari.

Quindi, dichiariamo una variabile detta "splitter" (divisore), che è il nostro contratto fittizio EtherSplitter. È creato prima di ogni esecuzione di un singolo test dal metodo `deployContract`. Questo metodo simula la distribuzione di un contratto dal portafoglio passato come primo parametro (nel nostro caso, il portafoglio del mittente). Il secondo parametro è l'ABI e il bytecode del contratto testato; qui, passiamo il file json del contratto compilato EtherSplitter dalla cartella `build`. Il terzo parametro è un insieme con gli argomenti del costruttore del contratto che, nel nostro caso, sono gli indirizzi dei due destinatari.

## changeBalances {#changebalances}

Prima controlleremo se il metodo di divisione modifica effettivamente i saldi dei portafogli dei destinatari. Se dividiamo 50 wei dall'account del mittente, i saldi di entrambi i destinatari dovrebbero aumentare di 25 wei. Utilizzeremo l'abbinatore di Waffle "`changeBalances`:

```ts
it("Changes accounts balances", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalances(
    [receiver1, receiver2],
    [25, 25]
  )
})
```

Come primo parametro dell'abbinatore, passiamo un insieme di portafogli dei destinatari e, come secondo, un insieme degli aumenti previsti sugli account corrispondenti. Se desiderassimo verificare il saldo di un portafoglio specifico, potremmo anche utilizzare l'abbinatore `changeBalance`, che non richiede di passare insiemi, come nel seguente esempio:

```ts
it("Changes account balance", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalance(
    receiver1,
    25
  )
})
```

Nota che in entrambi i casi di `changeBalance` e `changeBalances`, passiamo la funzione di divisione come richiamata, poiché l'abbinatore deve accedere allo stato dei saldi prima e dopo la chiamata.

Poi, testeremo se l'evento Trasferimento è stato emesso dopo ogni trasferimento di wei. Ci rivolgeremo a un altro abbinatore da Waffle:

## Emetti {#emit}

```ts
it("Emits event on the transfer to the first receiver", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver1.address, 25)
})

it("Emits event on the transfer to the second receiver", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver2.address, 25)
})
```

L'abbinatore `emit` ci consente di verificare se un contratto ha emesso un evento alla chiamata di un metodo. Come parametri all'abbinatore `emit`, forniamo il contratto fittizio che prevediamo emetterà l'evento, insieme al nome di tale evento. Nel nostro caso, il contratto fittizio è `splitter` e il nome dell'evento è `Trasferimento`. Inoltre, possiamo verificare i valori precisi degli argomenti con cui è stato emesso l'evento; passiamo altrettanti argomenti all'abbinatore `withArgs`, come previsto dalla dichiarazione del nostro evento. Nel caso del contratto EtherSplitter, passiamo gli indirizzi del mittente e del destinatario insieme all'importo trasferito di wei.

## revertedWith {#revertedwith}

Come ultimo esempio verificheremo se la transazione è stata ripristinata, nel caso di un numero dispari di wei. Utilizzeremo l'abbinatore `revertedWith`:

```ts
it("Reverts when Vei amount uneven", async () => {
  await expect(splitter.split({ value: 51 })).to.be.revertedWith(
    "Uneven wei amount not allowed"
  )
})
```

Il test, se superato, ci assicurerà che la transazione è stata effettivamente ripristinata. Tuttavia, deve anche verificarsi una corrispondenza esatta tra i messaggi passati nella dichiarazione `require` e il messaggio previsto in `revertedWith`. Se torniamo al codice del contratto EtherSplitter, nella dichiarazione `require` per l'importo di wei, forniamo il messaggio: "Importo di wei dispari non consentito". Questo corrisponde al messaggio che ci aspettiamo nel nostro test. Se non fossero stati uguali, il test sarebbe fallito.

# Congratulazioni! {#congratulations}

Hai compiuto il tuo primo grande passo verso il test dei contratti intelligenti con Waffle! Potresti essere interessato ad altri tutorial di Waffle:

- [Testare ERC-20 con Waffle](/developers/tutorials/testing-erc-20-tokens-with-waffle/)
- [Waffle: simulazioni dinamiche e test delle chiamate del contratto](/developers/tutorials/waffle-dynamic-mocking-and-testing-calls/#gatsby-focus-wrapper)
- [Tutorial Waffle Hello world con hardhat ed ethers](/developers/tutorials/waffle-hello-world-with-buidler-tutorial/)
