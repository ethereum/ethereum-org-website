---
title: Come usare Echidna per testare gli smart contract
description: Come usare Echidna per testare automaticamente gli smart contract
author: "Trailofbits"
lang: it
tags: ["Solidity", "smart contract", "sicurezza", "testing", "fuzzing"]
skill: advanced
breadcrumb: Echidna
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Installazione {#installation}

Echidna può essere installato tramite Docker, Homebrew o utilizzando il binario precompilato. Gli esempi in questo tutorial sono stati testati con Echidna 2.3.3 e solc 0.8.37.

### Echidna tramite Docker {#echidna-through-docker}

```sh
docker pull ghcr.io/crytic/echidna/echidna:latest
docker run --rm -it -v "$PWD":/src ghcr.io/crytic/echidna/echidna:latest
```

_L'ultimo comando esegue l'immagine di Echidna in un container Docker che ha accesso alla tua directory corrente. Puoi modificare i file dal tuo host ed eseguire gli strumenti sui file dal container Docker. L'immagine include anche [Slither](https://github.com/crytic/slither), [crytic-compile](https://github.com/crytic/crytic-compile) e [solc-select](https://github.com/crytic/solc-select)._

All'interno di Docker, esegui:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
cd /src
```

### Binario {#binary}

Scarica l'ultima release per la tua piattaforma da [https://github.com/crytic/echidna/releases/latest](https://github.com/crytic/echidna/releases/latest). Su macOS o Linux puoi anche eseguire `brew install echidna`, che installa Slither e crytic-compile insieme ad esso.

Quando utilizzi il binario della release, installa [Slither](https://github.com/crytic/slither) e [solc-select](https://github.com/crytic/solc-select) autonomamente (ad esempio `pip3 install slither-analyzer solc-select` in un ambiente virtuale Python) e seleziona una versione del compilatore:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
```

Echidna funziona senza Slither, ma Slither estrae costanti come i numeri magici utilizzati nelle istruzioni `require`, e molti degli esempi seguenti dipendono da esso per trovare rapidamente i bug.

## Introduzione al fuzzing basato sulle proprietà {#introduction-to-property-based-fuzzing}

Echidna è un fuzzer basato sulle proprietà, che abbiamo descritto nei nostri precedenti post sul blog ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Fuzzing {#fuzzing}

Il [fuzzing](https://wikipedia.org/wiki/Fuzzing) è una tecnica ben nota nella community della sicurezza. Consiste nel generare input più o meno casuali per trovare bug nel programma. I fuzzer per il software tradizionale (come [AFL](http://lcamtuf.coredump.cx/afl/) o [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) sono noti per essere strumenti efficienti per trovare bug.

Oltre alla generazione puramente casuale di input, esistono molte tecniche e strategie per generare buoni input, tra cui:

- Ottenere feedback da ogni esecuzione e guidare la generazione utilizzandolo. Ad esempio, se un input appena generato porta alla scoperta di un nuovo percorso, può avere senso generare nuovi input vicini ad esso.
- Generare l'input rispettando un vincolo strutturale. Ad esempio, se il tuo input contiene un'intestazione con un checksum, avrà senso lasciare che il fuzzer generi input che convalidano il checksum.
- Utilizzare input noti per generare nuovi input: se hai accesso a un ampio set di dati di input validi, il tuo fuzzer può generare nuovi input da essi, piuttosto che iniziare la sua generazione da zero. Questi sono solitamente chiamati _seed_ (semi).

### Fuzzing basato sulle proprietà {#property-based-fuzzing}

Echidna appartiene a una famiglia specifica di fuzzer: il fuzzing basato sulle proprietà, fortemente ispirato a [QuickCheck](https://wikipedia.org/wiki/QuickCheck). A differenza dei fuzzer classici che cercheranno di trovare crash, Echidna cercherà di violare gli invarianti definiti dall'utente.

Negli smart contract, gli invarianti sono funzioni Solidity che possono rappresentare qualsiasi stato errato o non valido che il contratto può raggiungere, tra cui:

- Controllo degli accessi errato: l'attaccante è diventato il proprietario del contratto.
- Macchina a stati errata: i token possono essere trasferiti mentre il contratto è in pausa.
- Aritmetica errata: l'utente può causare un underflow del proprio saldo e ottenere token gratuiti illimitati.

### Testare una proprietà con Echidna {#testing-a-property-with-echidna}

Vedremo come testare uno smart contract con Echidna. Il bersaglio è il seguente smart contract [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Token {
    mapping(address => uint256) public balances;

    function airdrop() public {
        balances[msg.sender] = 1000;
    }

    function consume() public {
        require(balances[msg.sender] > 0);
        balances[msg.sender] -= 1;
    }

    function backdoor() public {
        balances[msg.sender] += 1;
    }
}
```

Faremo l'ipotesi che questo token debba avere le seguenti proprietà:

- Chiunque può avere al massimo 1000 token
- Il token non può essere trasferito (non è un token ERC-20)

### Scrivere una proprietà {#write-a-property}

Le proprietà di Echidna sono funzioni Solidity. Una proprietà deve:

- Non avere argomenti
- Restituire `true` se ha successo
- Avere il nome che inizia con `echidna`

Echidna farà quanto segue:

- Genererà automaticamente transazioni arbitrarie per testare la proprietà.
- Segnalerà qualsiasi transazione che porti una proprietà a restituire `false` o a generare un errore.
- Scarterà gli effetti collaterali quando si chiama una proprietà (cioè, se la proprietà modifica una variabile di stato, questa viene scartata dopo il test)

La seguente proprietà verifica che il chiamante non abbia più di 1000 token:

```solidity
function echidna_balance_under_1000() public view returns (bool) {
    return balances[msg.sender] <= 1000;
}
```

Usa l'ereditarietà per separare il tuo contratto dalle tue proprietà:

```solidity
contract TestToken is Token {
    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

[`testtoken.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/testtoken.sol) implementa la proprietà ed eredita dal token.

### Inizializzare un contratto {#initiate-a-contract}

Echidna ha bisogno di un [costruttore](/developers/docs/smart-contracts/anatomy/#constructor-functions) senza argomenti. Se il tuo contratto necessita di un'inizializzazione specifica, devi farla nel costruttore.

Ci sono alcuni indirizzi specifici in Echidna:

- `0x30000` che chiama il costruttore.
- `0x10000`, `0x20000` e `0x30000` che chiamano casualmente le altre funzioni.
- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` dove viene distribuito il contratto in fase di test.

Non abbiamo bisogno di alcuna inizializzazione particolare nel nostro esempio attuale, di conseguenza il nostro costruttore è vuoto.

### Eseguire Echidna {#run-echidna}

Echidna viene avviato con:

```sh
echidna contract.sol
```

Se contract.sol contiene più contratti, puoi specificare il bersaglio:

```sh
echidna contract.sol --contract MyContract
```

Quando eseguito in un terminale, Echidna mostra un'interfaccia utente interattiva. Aggiungi `--format text` per ottenere un output in testo normale come negli esempi seguenti.

### Riepilogo: Testare una proprietà {#summary-testing-a-property}

Quanto segue riassume l'esecuzione di Echidna sul nostro esempio:

```solidity
contract TestToken is Token {
    constructor() {}

    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

```sh
echidna testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence:
    TestToken.airdrop()
    TestToken.backdoor()

...
```

Echidna ha scoperto che la proprietà viene violata se viene chiamato `backdoor`.

## Filtrare le funzioni da chiamare durante una campagna di fuzzing {#filtering-functions-to-call-during-a-fuzzing-campaign}

Vedremo come filtrare le funzioni da sottoporre a fuzzing.
Il bersaglio è il seguente smart contract:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool state1 = false;
    bool state2 = false;
    bool state3 = false;
    bool state4 = false;

    function f(uint256 x) public {
        require(x == 12);
        state1 = true;
    }

    function g(uint256 x) public {
        require(state1);
        require(x == 8);
        state2 = true;
    }

    function h(uint256 x) public {
        require(state2);
        require(x == 42);
        state3 = true;
    }

    function i() public {
        require(state3);
        state4 = true;
    }

    function reset1() public {
        state1 = false;
        state2 = false;
        state3 = false;
        return;
    }

    function reset2() public {
        state1 = false;
        state2 = false;
        state3 = false;
        return;
    }

    function echidna_state4() public view returns (bool) {
        return (!state4);
    }
}
```

Questo piccolo esempio forza Echidna a trovare una certa sequenza di transazioni per modificare una variabile di stato.
Questo è difficile per un fuzzer.
Possiamo eseguire Echidna per verificarlo:

```sh
echidna multi.sol
...
echidna_state4: passing
...
```

### Filtrare le funzioni {#filtering-functions}

Echidna ha difficoltà a trovare la sequenza corretta per testare questo contratto perché le due funzioni di reset (`reset1` e `reset2`) imposteranno tutte le variabili di stato su `false`.
Tuttavia, possiamo utilizzare una funzionalità speciale di Echidna per inserire in blacklist la funzione di reset o per inserire in whitelist solo le funzioni `f`, `g`,
`h` e `i`.

Per inserire le funzioni in blacklist, possiamo usare questo file di configurazione:

```yaml
filterBlacklist: true
filterFunctions: ["C.reset1()", "C.reset2()"]
```

Un altro approccio per filtrare le funzioni è elencare le funzioni in whitelist. Per farlo, possiamo usare questo file di configurazione:

```yaml
filterBlacklist: false
filterFunctions: ["C.f(uint256)", "C.g(uint256)", "C.h(uint256)", "C.i()"]
```

- `filterBlacklist` è `true` per impostazione predefinita.
- Il filtraggio viene eseguito sul nome completo della funzione: il nome del contratto, un `.` e la firma dell'Interfaccia binaria dell'applicazione (ABI) (ad esempio `C.f(uint256)`). Se hai `f()` e `f(uint256)`, puoi scegliere esattamente quale filtrare. Un nome semplice come `"reset1"` non corrisponde a nulla.

### Eseguire Echidna {#run-echidna-1}

Per eseguire Echidna con un file di configurazione `blacklist.yaml`:

```sh
echidna multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    C.f(12)
    C.g(8)
    C.h(42)
    C.i()
```

Echidna troverà la sequenza di transazioni per falsificare la proprietà quasi immediatamente.

### Riepilogo: Filtrare le funzioni {#summary-filtering-functions}

Echidna può inserire in blacklist o in whitelist le funzioni da chiamare durante una campagna di fuzzing utilizzando:

```yaml
filterBlacklist: true
filterFunctions: ["C.f1()", "C.f2()", "C.f3()"]
```

```sh
echidna contract.sol --config config.yaml
...
```

Echidna avvia una campagna di fuzzing inserendo in blacklist `C.f1()`, `C.f2()` e `C.f3()` o chiamando solo queste, a seconda
del valore del booleano `filterBlacklist`.

## Come testare le asserzioni di Solidity con Echidna {#how-to-test-soliditys-assert-with-echidna}

In questo breve tutorial, mostreremo come usare Echidna per testare il controllo delle asserzioni nei contratti. Supponiamo di avere un contratto come questo:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        // tmp <= counter
        return (counter - tmp);
    }
}
```

A partire da Solidity 0.8, gli overflow aritmetici causano un revert per impostazione predefinita. Il blocco `unchecked` ripristina il comportamento di wrapping in modo che `counter` possa andare in overflow, che è il bug che vogliamo che Echidna trovi.

### Scrivere un'asserzione {#write-an-assertion}

Vogliamo assicurarci che `tmp` sia minore o uguale a `counter` dopo aver restituito la loro differenza. Potremmo scrivere una
proprietà di Echidna, ma avremmo bisogno di memorizzare il valore di `tmp` da qualche parte. Invece, potremmo usare un'asserzione come questa:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

### Eseguire Echidna {#run-echidna-2}

Per abilitare il test di fallimento dell'asserzione, passa `--test-mode assertion` sulla riga di comando, oppure crea un [file di configurazione di Echidna](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`:

```yaml
testMode: assertion
```

Quando eseguiamo questo contratto in Echidna, otteniamo i risultati attesi:

```sh
echidna assert.sol --config config.yaml
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

Come puoi vedere, Echidna segnala alcuni fallimenti di asserzione nella funzione `inc`. È possibile aggiungere più di un'asserzione per funzione, ma Echidna non può dire quale asserzione sia fallita.

### Quando e come usare le asserzioni {#when-and-how-use-assertions}

Le asserzioni possono essere usate come alternative alle proprietà esplicite, specialmente se le condizioni da verificare sono direttamente correlate all'uso corretto di qualche operazione `f`. Aggiungere asserzioni dopo del codice imporrà che il controllo avvenga immediatamente dopo la sua esecuzione:

```solidity
function f(..) public {
    // codice complesso
    ...
    assert (condition);
    ...
}

```

Al contrario, l'uso di una proprietà esplicita di Echidna eseguirà transazioni in modo casuale e non c'è un modo semplice per imporre esattamente quando verrà verificata. È comunque possibile utilizzare questa soluzione alternativa:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

Tuttavia, ci sono alcuni problemi:

- Fallisce se `f` è dichiarata come `internal` o `external`.
- Non è chiaro quali argomenti debbano essere usati per chiamare `f`.
- Se `f` esegue un revert, la proprietà fallirà.

In generale, consigliamo di seguire la [raccomandazione di John Regehr](https://blog.regehr.org/archives/1091) su come usare le asserzioni:

- Non forzare alcun effetto collaterale durante il controllo dell'asserzione. Ad esempio: `assert(ChangeStateAndReturn() == 1)`
- Non asserire affermazioni ovvie. Ad esempio `assert(var >= 0)` dove `var` è dichiarata come `uint`.

Infine, per favore **non usare** `require` invece di `assert`, poiché Echidna non sarà in grado di rilevarlo (ma il contratto eseguirà comunque un revert).

### Riepilogo: Controllo delle asserzioni {#summary-assertion-checking}

Quanto segue riassume l'esecuzione di Echidna sul nostro esempio:

```solidity
contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

```sh
echidna assert.sol --test-mode assertion
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

Echidna ha scoperto che l'asserzione in `inc` può fallire se questa funzione viene chiamata più volte con argomenti di grandi dimensioni.

## Raccogliere e modificare un corpus di Echidna {#collecting-and-modifying-an-echidna-corpus}

Vedremo come raccogliere e usare un corpus di transazioni con Echidna. Il bersaglio è il seguente smart contract [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool value_found = false;

    function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
        require(magic_1 == 42);
        require(magic_2 == 129);
        require(magic_3 == magic_4 + 333);
        value_found = true;
        return;
    }

    function echidna_magic_values() public view returns (bool) {
        return !value_found;
    }
}
```

Questo piccolo esempio forza Echidna a trovare determinati valori per modificare una variabile di stato. Questo è difficile per un fuzzer.
Possiamo eseguire Echidna per verificarlo:

```sh
echidna magic.sol
...

echidna_magic_values: passing
...
```

Tuttavia, possiamo comunque usare Echidna per raccogliere il corpus durante l'esecuzione di questa campagna di fuzzing.

### Raccogliere un corpus {#collecting-a-corpus}

Per abilitare la raccolta del corpus, crea una directory per il corpus:

```sh
mkdir corpus-magic
```

E un [file di configurazione di Echidna](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`:

```yaml
corpusDir: "corpus-magic"
```

Ora possiamo eseguire il nostro strumento e controllare il corpus raccolto:

```sh
echidna magic.sol --config config.yaml
```

Echidna non riesce ancora a trovare i valori magici corretti. Per vedere dove si blocca, guarda il report di copertura `corpus-magic/covered.*.txt`:

```text
7 | *   |     function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
  8 | *r  |         require(magic_1 == 42);
  9 | *r  |         require(magic_2 == 129);
 10 | *r  |         require(magic_3 == magic_4 + 333);
 11 |     |         value_found = true;
 12 |     |         return;
```

L'etichetta `r` significa che Echidna ha raggiunto la riga ma l'esecuzione ha subito un revert in quel punto, e le righe dopo l'ultimo `require` non vengono mai eseguite.

Le sequenze di transazioni raccolte da Echidna sono memorizzate come file JSON in `corpus-magic/coverage/`. Ad esempio, la prima transazione di uno di questi file era:

```json
[
  {
    "call": {
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639806"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "761"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "91238239174727894896282446013839801776340298206661877345279631871841712965531"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639804"
            ],
            "tag": "AbiUInt"
          }
        ]
      ],
      "tag": "SolCall"
    },
    "delay": [
      "0x00000000000000000000000000000000000000000000000000000000000103ef",
      "0x000000000000000000000000000000000000000000000000000000000000d38b"
    ],
    "dst": "0x00a329c0648769A73afAc7F9381E08FB43dBEA72",
    "gas": 12500000,
    "gasprice": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "src": "0x0000000000000000000000000000000000020000",
    "value": "0x0000000000000000000000000000000000000000000000000000000000000000"
  }
]
```

Chiaramente, questo input non innescherà il fallimento nella nostra proprietà. Tuttavia, nel passaggio successivo, vedremo come modificarlo a tale scopo.

### Inserire seed in un corpus {#seeding-a-corpus}

Echidna ha bisogno di un po' di aiuto per gestire la funzione `magic`. Copieremo e modificheremo l'input per usare parametri
adatti ad essa (i nomi dei file sono casuali, quindi usane uno dalla tua directory `corpus-magic/coverage/`):

```sh
cp corpus-magic/coverage/249425678654647553.txt corpus-magic/coverage/new.txt
```

Modificheremo `new.txt` in modo che contenga una singola transazione che chiama `magic(42,129,333,0)`. Ora possiamo eseguire nuovamente Echidna:

```sh
echidna magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    C.magic(42,129,333,0)

...
```

Questa volta, ha scoperto che la proprietà viene violata immediatamente.

## Trovare transazioni con un elevato consumo di gas {#finding-transactions-with-high-gas-consumption}

Vedremo come trovare le transazioni con un elevato consumo di gas con Echidna. Le versioni precedenti di Echidna avevano un'opzione `estimateGas` per questo; è stata rimossa in Echidna 2.3.0. Invece, misuriamo il gas con `gasleft()` e lasciamo che la [modalità di ottimizzazione](https://secure-contracts.com/program-analysis/echidna/advanced/optimization_mode.html) di Echidna lo massimizzi. Il bersaglio è il seguente smart contract:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    uint256 state;

    function expensive(uint8 times) internal {
        for (uint8 i = 0; i < times; i++) {
            state = state + i;
        }
    }

    function f(uint256 x, uint256 y, uint8 times) public {
        if (x == 42 && y == 123) {
            expensive(times);
        } else {
            state = 0;
        }
    }
}
```

Qui `expensive` può avere un elevato consumo di gas.

### Misurare il consumo di gas {#measuring-gas-consumption}

In modalità di ottimizzazione, Echidna cerca funzioni che iniziano con `echidna_` che non accettano argomenti e restituiscono un `int256`, e cerca di trovare la sequenza di transazioni che massimizza il valore restituito. Aggiungiamo un contratto di test che chiama `f`, registra il gas utilizzato ed espone il massimo (salva entrambi i contratti in `gas.sol`):

```solidity
contract TestGas is C {
    int256 maxGasUsed;

    function measureF(uint256 x, uint256 y, uint8 times) public {
        uint256 start = gasleft();
        f(x, y, times);
        int256 used = int256(start - gasleft());
        if (used > maxGasUsed) {
            maxGasUsed = used;
        }
    }

    function echidna_opt_gas_f() public view returns (int256) {
        return maxGasUsed;
    }
}
```

Per abilitare la modalità di ottimizzazione, crea un file di configurazione `config.yaml`. In questo esempio, ridurremo anche la dimensione della sequenza di transazioni per rendere i risultati più facili da comprendere:

```yaml
testMode: optimization
seqLen: 2
```

### Eseguire Echidna {#run-echidna-3}

Una volta creato il file di configurazione, possiamo eseguire Echidna in questo modo:

```sh
echidna gas.sol --contract TestGas --config config.yaml
...
echidna_opt_gas_f: max value: 127128

  Call sequence:
    TestGas.measureF(42,123,223)

...
```

- Il gas mostrato è misurato dall'implementazione della Macchina Virtuale di Ethereum (EVM) su cui viene eseguito Echidna, [hevm](https://github.com/argotorg/hevm), e include l'overhead della chiamata interna da `measureF`.
- Il massimo non è unico: ogni campagna è casuale e le campagne più lunghe (ad esempio `--test-limit 200000`) tendono a trovare valori più grandi.

### Filtrare le chiamate che riducono il gas {#filtering-out-gas-reducing-calls}

Il tutorial su **filtrare le funzioni da chiamare durante una campagna di fuzzing** qui sopra mostra come
rimuovere alcune funzioni dai tuoi test.  
Questo può essere fondamentale per ottenere una stima accurata del gas.
Considera il seguente esempio:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    address[] addrs;

    function push(address a) public {
        addrs.push(a);
    }

    function pop() public {
        addrs.pop();
    }

    function clear() public {
        delete addrs;
    }

    function check() public {
        for (uint256 i = 0; i < addrs.length; i++)
            for (uint256 j = i + 1; j < addrs.length; j++)
                if (addrs[i] == addrs[j]) addrs[j] = address(0x0);
    }

    function echidna_opt_gas_check() public returns (int256) {
        uint256 start = gasleft();
        check();
        return int256(start - gasleft());
    }
}
```

`echidna_opt_gas_check` chiama `check` e restituisce il suo costo in gas. Come ogni funzione di test di Echidna, le sue modifiche di stato vengono scartate in seguito.

Se Echidna può chiamare tutte le funzioni, non troverà facilmente transazioni con un elevato costo in gas:

```sh
echidna pushpop.sol --test-mode optimization
...
echidna_opt_gas_check: max value: 265706
...
```

Questo perché il costo dipende dalla dimensione di `addrs` e le chiamate casuali tendono a lasciare l'array quasi vuoto.
Inserire in blacklist `pop` e `clear`, tuttavia, ci dà risultati molto migliori:

```yaml
testMode: optimization
filterBlacklist: true
filterFunctions: ["C.pop()", "C.clear()"]
```

```sh
echidna pushpop.sol --config config.yaml
...
echidna_opt_gas_check: max value: 2446228
...
```

La riduzione della sequenza di chiamate per questo risultato richiede diversi minuti, perché ogni replay chiama la costosa funzione `check`.

### Riepilogo: Trovare transazioni con un elevato consumo di gas {#summary-finding-transactions-with-high-gas-consumption}

Echidna può trovare transazioni con un elevato consumo di gas misurando il gas con `gasleft()` in una funzione `echidna_` che restituisce un `int256`, ed eseguendo in modalità di ottimizzazione:

```yaml
testMode: optimization
```

```sh
echidna contract.sol --config config.yaml
...
```

Echidna segnalerà il valore massimo trovato e la sequenza di transazioni che lo ha prodotto, una volta terminata la campagna di fuzzing.
