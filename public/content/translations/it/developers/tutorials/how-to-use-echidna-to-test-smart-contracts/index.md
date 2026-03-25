---
title: Come usare Echidna per testare i contratti intelligenti
description: Come usare Echidna per testare automaticamente i contratti intelligenti
author: "Trailofbits"
lang: it
tags: ["Solidity", "contratti intelligenti", "sicurezza", "testing", "fuzzing"]
skill: advanced
breadcrumb: Echidna
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Installazione {#installation}

Echidna può essere installato tramite docker o utilizzando il binario precompilato.

### Echidna tramite docker {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_L'ultimo comando esegue eth-security-toolbox in un docker che ha accesso alla tua directory corrente. Puoi modificare i file dal tuo host ed eseguire gli strumenti sui file dal docker_

All'interno di docker, esegui:

```bash
echidna-test
```

### Binario {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## Introduzione al fuzzing basato sulle proprietà {#introduction-to-property-based-fuzzing}

Echidna è un fuzzer basato sulle proprietà, che abbiamo descritto nei nostri precedenti post del blog ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Fuzzing {#fuzzing}

Il [Fuzzing](https://wikipedia.org/wiki/Fuzzing) è una tecnica ben nota nella community della sicurezza. Consiste nel generare input più o meno casuali per trovare bug nel programma. I fuzzer per i software tradizionali (come [AFL](http://lcamtuf.coredump.cx/afl/) o [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) sono noti per essere strumenti efficienti per trovare bug.

Oltre alla generazione puramente casuale di input, esistono molte tecniche e strategie per generare buoni input, tra cui:

- Ottenere feedback da ogni esecuzione e guidare la generazione utilizzandolo. Ad esempio, se un input appena generato porta alla scoperta di un nuovo percorso, può avere senso generare nuovi input vicini ad esso.
- Generare l'input rispettando un vincolo strutturale. Ad esempio, se il tuo input contiene un'intestazione con un checksum, avrà senso lasciare che il fuzzer generi input che convalidano il checksum.
- Utilizzare input noti per generare nuovi input: se hai accesso a un ampio set di dati di input validi, il tuo fuzzer può generare nuovi input da essi, piuttosto che iniziare la sua generazione da zero. Questi sono solitamente chiamati _seed_ (semi).

### Fuzzing basato sulle proprietà {#property-based-fuzzing}

Echidna appartiene a una famiglia specifica di fuzzer: il fuzzing basato sulle proprietà, fortemente ispirato a [QuickCheck](https://wikipedia.org/wiki/QuickCheck). A differenza dei fuzzer classici che cercheranno di trovare crash, Echidna cercherà di infrangere gli invarianti definiti dall'utente.

Nei contratti intelligenti, gli invarianti sono funzioni Solidity, che possono rappresentare qualsiasi stato errato o non valido che il contratto può raggiungere, tra cui:

- Controllo degli accessi errato: l'attaccante è diventato il proprietario del contratto.
- Macchina a stati errata: i token possono essere trasferiti mentre il contratto è in pausa.
- Aritmetica errata: l'utente può mandare in underflow il proprio saldo e ottenere token gratuiti illimitati.

### Testare una proprietà con Echidna {#testing-a-property-with-echidna}

Vedremo come testare un contratto intelligente con Echidna. L'obiettivo è il seguente contratto intelligente [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

```solidity
contract Token{
  mapping(address => uint) public balances;
  function airdrop() public{
      balances[msg.sender] = 1000;
  }
  function consume() public{
      require(balances[msg.sender]>0);
      balances[msg.sender] -= 1;
  }
  function backdoor() public{
      balances[msg.sender] += 1;
  }
}
```

Faremo l'ipotesi che questo token debba avere le seguenti proprietà:

- Chiunque può avere al massimo 1000 token
- Il token non può essere trasferito (non è un token ERC20)

### Scrivere una proprietà {#write-a-property}

Le proprietà di Echidna sono funzioni Solidity. Una proprietà deve:

- Non avere argomenti
- Restituire `true` se ha successo
- Avere il suo nome che inizia con `echidna`

Echidna farà quanto segue:

- Genererà automaticamente transazioni arbitrarie per testare la proprietà.
- Segnalerà qualsiasi transazione che porta una proprietà a restituire `false` o a generare un errore.
- Scarterà gli effetti collaterali quando si chiama una proprietà (ad es., se la proprietà modifica una variabile di stato, viene scartata dopo il test)

La seguente proprietà verifica che il chiamante non abbia più di 1000 token:

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

Usa l'ereditarietà per separare il tuo contratto dalle tue proprietà:

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) implementa la proprietà ed eredita dal token.

### Inizializzare un contratto {#initiate-a-contract}

Echidna ha bisogno di un [costruttore](/developers/docs/smart-contracts/anatomy/#constructor-functions) senza argomenti. Se il tuo contratto necessita di un'inizializzazione specifica, devi farla nel costruttore.

Ci sono alcuni indirizzi specifici in Echidna:

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` che chiama il costruttore.
- `0x10000`, `0x20000` e `0x00a329C0648769a73afAC7F9381e08fb43DBEA70` che chiamano casualmente le altre funzioni.

Non abbiamo bisogno di alcuna inizializzazione particolare nel nostro esempio attuale, di conseguenza il nostro costruttore è vuoto.

### Eseguire Echidna {#run-echidna}

Echidna viene avviato con:

```bash
echidna-test contract.sol
```

Se contract.sol contiene più contratti, puoi specificare l'obiettivo:

```bash
echidna-test contract.sol --contract MyContract
```

### Riepilogo: Testare una proprietà {#summary-testing-a-property}

Quanto segue riassume l'esecuzione di echidna sul nostro esempio:

```bash
echidna-test token.sol
```

```text
...
echidna_balance_under_1000: failed!💥
  Call sequence, shrinking (2596/5000):
    airdrop()
    backdoor()

...
```

Echidna ha scoperto che la proprietà viene violata se viene chiamato `backdoor`.

## Filtrare le funzioni da chiamare durante una campagna di fuzzing {#filtering-functions-to-call-during-a-fuzzing-campaign}

Vedremo come filtrare le funzioni da sottoporre a fuzzing.
L'obiettivo è il seguente contratto intelligente:

```solidity
contract C {
  bool state1 = false;
  bool state2 = false;
  bool state3 = false;
  bool state4 = false;

  function f(uint x) public {
    require(x == 12);
    state1 = true;
  }

  function g(uint x) public {
    require(state1);
    require(x == 8);
    state2 = true;
  }

  function h(uint x) public {
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

  function echidna_state4() public returns (bool) {
    return (!state4);
  }
}
```

Questo piccolo esempio forza Echidna a trovare una certa sequenza di transazioni per modificare una variabile di stato.
Questo è difficile per un fuzzer (si consiglia di utilizzare uno strumento di esecuzione simbolica come [Manticore](https://github.com/trailofbits/manticore)).
Possiamo eseguire Echidna per verificarlo:

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
```

### Filtrare le funzioni {#filtering-functions}

Echidna ha difficoltà a trovare la sequenza corretta per testare questo contratto perché le due funzioni di ripristino (`reset1` e `reset2`) imposteranno tutte le variabili di stato su `false`.
Tuttavia, possiamo utilizzare una funzionalità speciale di Echidna per inserire nella blacklist la funzione di ripristino o per inserire nella whitelist solo le funzioni `f`, `g`, `h` e `i`.

Per inserire le funzioni nella blacklist, possiamo utilizzare questo file di configurazione:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

Un altro approccio per filtrare le funzioni è elencare le funzioni nella whitelist. Per farlo, possiamo utilizzare questo file di configurazione:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` è `true` per impostazione predefinita.
- Il filtraggio verrà eseguito solo per nome (senza parametri). Se hai `f()` e `f(uint256)`, il filtro `"f"` corrisponderà a entrambe le funzioni.

### Eseguire Echidna {#run-echidna-1}

Per eseguire Echidna con un file di configurazione `blacklist.yaml`:

```bash
echidna-test multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    f(12)
    g(8)
    h(42)
    i()
```

Echidna troverà la sequenza di transazioni per falsificare la proprietà quasi immediatamente.

### Riepilogo: Filtrare le funzioni {#summary-filtering-functions}

Echidna può inserire nella blacklist o nella whitelist le funzioni da chiamare durante una campagna di fuzzing utilizzando:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna avvia una campagna di fuzzing inserendo nella blacklist `f1`, `f2` e `f3` o chiamando solo queste, in base al valore del booleano `filterBlacklist`.

## Come testare l'assert di Solidity con Echidna {#how-to-test-soliditys-assert-with-echidna}

In questo breve tutorial, mostreremo come utilizzare Echidna per testare il controllo delle asserzioni nei contratti. Supponiamo di avere un contratto come questo:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    // tmp <= counter
    return (counter - tmp);
  }
}
```

### Scrivere un'asserzione {#write-an-assertion}

Vogliamo assicurarci che `tmp` sia minore o uguale a `counter` dopo aver restituito la sua differenza. Potremmo scrivere una proprietà Echidna, ma avremmo bisogno di memorizzare il valore `tmp` da qualche parte. Invece, potremmo usare un'asserzione come questa:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

### Eseguire Echidna {#run-echidna-2}

Per abilitare il test di fallimento dell'asserzione, crea un [file di configurazione di Echidna](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
checkAsserts: true
```

Quando eseguiamo questo contratto in Echidna, otteniamo i risultati attesi:

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: /tmp/assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)
```

Come puoi vedere, Echidna segnala alcuni fallimenti di asserzione nella funzione `inc`. È possibile aggiungere più di un'asserzione per funzione, ma Echidna non può dire quale asserzione è fallita.

### Quando e come usare le asserzioni {#when-and-how-use-assertions}

Le asserzioni possono essere utilizzate come alternative alle proprietà esplicite, specialmente se le condizioni da verificare sono direttamente correlate all'uso corretto di qualche operazione `f`. L'aggiunta di asserzioni dopo del codice imporrà che il controllo avvenga immediatamente dopo la sua esecuzione:

```solidity
function f(..) public {
    // some complex code
    ...
    assert (condition);
    ...
}
```

Al contrario, l'utilizzo di una proprietà echidna esplicita eseguirà casualmente le transazioni e non c'è un modo semplice per imporre esattamente quando verrà verificata. È comunque possibile utilizzare questa soluzione alternativa:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

Tuttavia, ci sono alcuni problemi:

- Fallisce se `f` è dichiarata come `internal` o `external`.
- Non è chiaro quali argomenti debbano essere utilizzati per chiamare `f`.
- Se `f` esegue un revert, la proprietà fallirà.

In generale, consigliamo di seguire la [raccomandazione di John Regehr](https://blog.regehr.org/archives/1091) su come utilizzare le asserzioni:

- Non forzare alcun effetto collaterale durante il controllo dell'asserzione. Ad esempio: `assert(ChangeStateAndReturn() == 1)`
- Non asserire affermazioni ovvie. Ad esempio `assert(var >= 0)` dove `var` è dichiarata come `uint`.

Infine, per favore **non usare** `require` invece di `assert`, poiché Echidna non sarà in grado di rilevarlo (ma il contratto verrà comunque annullato).

### Riepilogo: Controllo delle asserzioni {#summary-assertion-checking}

Quanto segue riassume l'esecuzione di echidna sul nostro esempio:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: /tmp/assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)
```

Echidna ha scoperto che l'asserzione in `inc` può fallire se questa funzione viene chiamata più volte con argomenti di grandi dimensioni.

## Raccogliere e modificare un corpus di Echidna {#collecting-and-modifying-an-echidna-corpus}

Vedremo come raccogliere e utilizzare un corpus di transazioni con Echidna. L'obiettivo è il seguente contratto intelligente [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

```solidity
contract C {
  bool value_found = false;
  function magic(uint magic_1, uint magic_2, uint magic_3, uint magic_4) public {
    require(magic_1 == 42);
    require(magic_2 == 129);
    require(magic_3 == 333);
    require(magic_4 == 0);
    value_found = true;
    return;
  }

  function echidna_magic_values() public returns (bool) {
    return !value_found;
  }

}
```

Questo piccolo esempio forza Echidna a trovare determinati valori per modificare una variabile di stato. Questo è difficile per un fuzzer (si consiglia di utilizzare uno strumento di esecuzione simbolica come [Manticore](https://github.com/trailofbits/manticore)).
Possiamo eseguire Echidna per verificarlo:

```bash
echidna-test magic.sol
...
echidna_magic_values: passed! 🎉
```

Tuttavia, possiamo ancora utilizzare Echidna per raccogliere il corpus durante l'esecuzione di questa campagna di fuzzing.

### Raccogliere un corpus {#collecting-a-corpus}

Per abilitare la raccolta del corpus, crea una directory per il corpus:

```bash
mkdir corpus-magic
```

E un [file di configurazione di Echidna](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

Ora possiamo eseguire il nostro strumento e controllare il corpus raccolto:

```bash
echidna-test magic.sol --config config.yaml
```

Echidna non riesce ancora a trovare i valori magici corretti, ma possiamo dare un'occhiata al corpus che ha raccolto.
Ad esempio, uno di questi file era:

```json
[
  {
    "_m": "magic(uint256,uint256,uint256,uint256)",
    "_args": [
      "0x4fa567653f26f941",
      "0x227c946b75c6b9",
      "0x1176a2410b466f71",
      "0xbf6b4ea0ceebdce8"
    ],
    "_gas": "0x50911",
    "_value": "0x0",
    "_delay": ["0x1364", "0xccfa"]
  }
]
```

Chiaramente, questo input non innescherà il fallimento nella nostra proprietà. Tuttavia, nel passaggio successivo, vedremo come modificarlo a tale scopo.

### Seminare un corpus {#seeding-a-corpus}

Echidna ha bisogno di un po' di aiuto per gestire la funzione `magic`. Copieremo e modificheremo l'input per utilizzare parametri adatti ad essa:

```bash
cp corpus/covered.1560453495.html new.txt
```

Modificheremo `new.txt` per chiamare `magic(42,129,333,0)`. Ora possiamo eseguire nuovamente Echidna:

```bash
echidna-test magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    magic(42,129,333,0)
```

Questa volta, ha scoperto che la proprietà viene violata immediatamente.

## Trovare transazioni con un elevato consumo di gas {#finding-transactions-with-high-gas-consumption}

Vedremo come trovare le transazioni con un elevato consumo di gas con Echidna. L'obiettivo è il seguente contratto intelligente:

```solidity
contract C {
  uint state;

  function expensive(uint8 times) public {
    for(uint8 i=0; i < times; i++)
      state = state + i;
  }

  function echidna_test() public returns (bool) {
    return true;
  }

}
```

Qui `expensive` può avere un grande consumo di gas.

Attualmente, Echidna ha sempre bisogno di una proprietà da testare: qui `echidna_test` restituisce sempre `true`.
Possiamo eseguire Echidna per verificarlo:

```bash
echidna-test gas.sol
...
echidna_test: passed! 🎉
```

### Misurare il consumo di gas {#measuring-gas-consumption}

Per abilitare il consumo di gas con Echidna, crea un file di configurazione `config.yaml`:

```yaml
estimateGas: true
```

In questo esempio, ridurremo anche la dimensione della sequenza di transazioni per rendere i risultati più facili da comprendere:

```yaml
seqLen: 2
estimateGas: true
```

### Eseguire Echidna {#run-echidna-3}

Una volta creato il file di configurazione, possiamo eseguire Echidna in questo modo:

```bash
echidna-test gas.sol --config config.yaml
...
echidna_test: passed! 🎉

fuzzing time: 2.70s

C.expensive(uint8) with gas 5463708:
  expensive(255)
  expensive(255)
```

- Il gas mostrato è una stima fornita da [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-).

### Filtrare le chiamate che riducono il gas {#filtering-out-gas-reducing-calls}

Il tutorial su **filtrare le funzioni da chiamare durante una campagna di fuzzing** qui sopra mostra come rimuovere alcune funzioni dai tuoi test.  
Questo può essere fondamentale per ottenere una stima accurata del gas.
Considera il seguente esempio:

```solidity
contract C {
  address[] addrs;

  function push(address a) public {
    addrs.push(a);
  }

  function pop() public {
    addrs.pop();
  }

  function clear() public{
    addrs.length = 0;
  }

  function check() public{
    for(uint256 i = 0; i < addrs.length; i++)
      for(uint256 j = i+1; j < addrs.length; j++)
        if (addrs[i] == addrs[j])
          addrs[j] = address(0x0);
  }

  function echidna_test() public returns (bool) {
      return true;
  }
}
```

Se Echidna può chiamare tutte le funzioni, non troverà facilmente transazioni con un costo del gas elevato:

```bash
echidna-test gas.sol --config config.yaml
...
C.check() with gas 733189:
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  check()
```

Questo perché il costo dipende dalla dimensione di `addrs` e le chiamate casuali tendono a lasciare l'array quasi vuoto.
Inserire nella blacklist `pop` e `clear`, tuttavia, ci dà risultati molto migliori:

```yaml
filterBlacklist: true
filterFunctions: ["pop", "clear"]
```

```bash
echidna-test gas.sol --config config.yaml
...
C.check() with gas 5082692:
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  push(0x0000000000000000000000000000000000000000)
  check()
```

### Riepilogo: Trovare transazioni con un elevato consumo di gas {#summary-finding-transactions-with-high-gas-consumption}

Echidna può trovare transazioni con un elevato consumo di gas utilizzando l'opzione di configurazione `estimateGas`:

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna segnalerà una sequenza con il massimo consumo di gas per ogni funzione, una volta terminata la campagna di fuzzing.