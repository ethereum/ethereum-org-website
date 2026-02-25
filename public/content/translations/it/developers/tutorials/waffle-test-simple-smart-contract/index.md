---
title: Testare semplici contratti intelligenti con la libreria Waffle
description: Guida per principianti
author: Ewa Kowalska
tags: [ "smart contract", "Solidity", "Waffle", "test" ]
skill: beginner
lang: it
published: 2021-02-26
---

## In questa guida imparerai come {#in-this-tutorial-youll-learn-how-to}

- Testare le modifiche del saldo del portafoglio
- Testare l'emissione di eventi con gli argomenti specificati
- Verificare che una transazione sia stata ripristinata

## Presupposti {#assumptions}

- Sei in grado di creare un nuovo progetto JavaScript o TypeScript
- Hai una certa esperienza di base con i test in JavaScript
- Hai utilizzato dei gestori di pacchetti come yarn o npm
- Possiedi una conoscenza di base dei contratti intelligenti e di Solidity

## Per iniziare {#getting-started}

La guida dimostra la configurazione di prova e l'esecuzione tramite yarn, ma non ci sono problemi se preferisci npm. Fornirò i riferimenti appropriati alla [documentazione](https://ethereum-waffle.readthedocs.io/en/latest/index.html) ufficiale di Waffle.

## Installa le dipendenze {#install-dependencies}

[Aggiungi](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#installation) le dipendenze ethereum-waffle e typescript alle dipendenze di sviluppo (dev dependencies) del tuo progetto.

```bash
yarn add --dev ethereum-waffle ts-node typescript @types/jest
```

## Esempio di contratto intelligente {#example-smart-contract}

Durante questa guida lavoreremo su un semplice esempio di contratto intelligente: EtherSplitter. Non fa molto, a parte consentire a chiunque di inviare wei e dividerli equamente tra due destinatari predefiniti.
La funzione `split` richiede che il numero di wei sia pari, altrimenti eseguirà un revert. Per entrambi i destinatari esegue un trasferimento di wei, seguito dall'emissione dell'evento `Transfer`.

Posiziona lo snippet di codice di EtherSplitter in `src/EtherSplitter.sol`.

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

Per [compilare](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#compiling-the-contract) il contratto, aggiungi la seguente voce al file package.json:

```json
"scripts": {
    "build": "waffle"
  }
```

Successivamente, crea il file di configurazione di Waffle nella directory radice del progetto, `waffle.json`, quindi incolla la configurazione seguente:

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./src",
  "outputDirectory": "./build"
}
```

Esegui `yarn build`. Come risultato, apparirà la directory `build` con il contratto EtherSplitter compilato in formato JSON.

## Configurazione del test {#test-setup}

Il test con Waffle richiede l'uso dei matcher di Chai e di Mocha, quindi è necessario [aggiungerli](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests) al progetto. Aggiorna il tuo file package.json e aggiungi la voce `test` nella sezione degli script:

```json
"scripts": {
    "build": "waffle",
    "test": "export NODE_ENV=test && mocha -r ts-node/register 'test/**/*.test.ts'"
  }
```

Se vuoi [eseguire](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#running-tests) i tuoi test, esegui semplicemente `yarn test`.

## Test {#testing}

Ora crea la directory `test` e il nuovo file `test\EtherSplitter.test.ts`.
Copia lo snippet qui sotto e incollalo nel nostro file di test.

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

  // aggiungi i test qui
})
```

Qualche parola prima di iniziare.
`MockProvider` fornisce una versione fittizia della blockchain. Fornisce anche portafogli fittizi che ci serviranno per testare il contratto EtherSplitter. Possiamo ottenere fino a dieci portafogli chiamando il metodo `getWallets()` sul provider. Nell'esempio, otteniamo tre portafogli: per il mittente e per i due destinatari.

Successivamente, dichiariamo una variabile chiamata 'splitter': questo è il nostro contratto fittizio EtherSplitter. Viene creato prima di ogni esecuzione di un singolo test dal metodo `deployContract`. Questo metodo simula l'implementazione di un contratto dal portafoglio passato come primo parametro (in questo caso, il portafoglio del mittente). Il secondo parametro è l'ABI e il bytecode del contratto testato; passiamo il file JSON del contratto EtherSplitter compilato dalla directory `build`. Il terzo parametro è un array con gli argomenti del costruttore del contratto che, nel nostro caso, sono i due indirizzi dei destinatari.

## changeBalances {#changebalances}

Per prima cosa, verificheremo se il metodo `split` modifica effettivamente i saldi dei portafogli dei destinatari. Se dividiamo 50 wei dal conto del mittente, ci aspetteremmo che i saldi di entrambi i destinatari aumentino di 25 wei. Useremo il matcher `changeBalances` di Waffle:

```ts
it("Modifica i saldi dei conti", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalances(
    [receiver1, receiver2],
    [25, 25]
  )
})
```

Come primo parametro del matcher, passiamo un array di portafogli dei destinatari e, come secondo, un array degli aumenti previsti sui conti corrispondenti.
Se volessimo controllare il saldo di un portafoglio specifico, potremmo anche usare il matcher `changeBalance`, che non richiede di passare array, come nell'esempio seguente:

```ts
it("Modifica il saldo del conto", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalance(
    receiver1,
    25
  )
})
```

Nota che in entrambi i casi di `changeBalance` e `changeBalances`, passiamo la funzione `split` come callback, poiché il matcher deve accedere allo stato dei saldi prima e dopo la chiamata.

Successivamente, verificheremo se l'evento `Transfer` è stato emesso dopo ogni trasferimento di wei. Passeremo a un altro matcher di Waffle:

## Emetti {#emit}

```ts
it("Emette l'evento sul trasferimento al primo destinatario", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver1.address, 25)
})

it("Emette l'evento sul trasferimento al secondo destinatario", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver2.address, 25)
})
```

Il matcher `emit` ci consente di verificare se un contratto ha emesso un evento alla chiamata di un metodo. Come parametri del matcher `emit`, forniamo il contratto fittizio che prevediamo emetterà l'evento, insieme al nome dell'evento. Nel nostro caso, il contratto fittizio è `splitter` e il nome dell'evento è `Transfer`. Possiamo anche verificare i valori precisi degli argomenti con cui è stato emesso l'evento: passiamo tanti argomenti al matcher `withArgs` quanti ne prevede la nostra dichiarazione dell'evento. Nel caso del contratto EtherSplitter, passiamo gli indirizzi del mittente e del destinatario insieme all'importo trasferito di wei.

## revertedWith {#revertedwith}

Come ultimo esempio, verificheremo se la transazione è stata ripristinata in caso di un numero dispari di wei. Useremo il matcher `revertedWith`:

```ts
it("Esegue il revert quando l'importo di wei è dispari", async () => {
  await expect(splitter.split({ value: 51 })).to.be.revertedWith(
    "Uneven wei amount not allowed"
  )
})
```

Il test, se superato, ci assicurerà che la transazione è stata effettivamente ripristinata. Tuttavia, ci deve essere anche una corrispondenza esatta tra i messaggi che abbiamo passato nell'istruzione `require` e il messaggio che ci aspettiamo in `revertedWith`. Se torniamo al codice del contratto EtherSplitter, nell'istruzione `require` per l'importo di wei, forniamo il messaggio: 'Uneven wei amount not allowed'. Questo corrisponde al messaggio che ci aspettiamo nel nostro test. Se non fossero stati uguali, il test sarebbe fallito.

## Congratulazioni! {#congratulations}

Hai compiuto il tuo primo grande passo verso il test dei contratti intelligenti con Waffle!
