---
title: Come usare Echidna per testare gli smart contract
description: Come usare Echidna per testare automaticamente gli smart contract
author: "Trailofbits"
lang: it
tags:
  - "Solidity"
  - "smart contract"
  - "sicurezza"
  - "test"
  - "fuzzing"
skill: advanced
published: 2020-04-10
source: Creare contratti sicuri
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Installazione {#installation}

Echidna è installabile tramite docker o usando il binario pre-compilato.

### Echidna tramite docker {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_L'ultimo comando esegue eth-security-toolbox in un docker che ha accesso alla tua cartella corrente. Puoi modificare i file dal tuo host ed eseguire gli strumenti sui file dal docker_

Nel docker, esegui:

```bash
solc-select 0.5.11
cd /home/training
```

### Binario {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## Introduzione al fuzzing basato sulla proprietà {#introduction-to-property-based-fuzzing}

Echidna è un fuzzer basato sulla proprietà, che abbiamo descritto nei nostri post del blog precedenti ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Fuzzing {#fuzzing}

Il [fuzzing](https://wikipedia.org/wiki/Fuzzing) è una ben nota tecnica nella community della sicurezza. Consiste nel generare input più o meno casualmente per trovare i bug nel programma. I fuzzer per il software tradizionale (come [AFL](http://lcamtuf.coredump.cx/afl/) o [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) sono noti per essere strumenti efficienti per trovare i bug.

Oltre alla generazione di input puramente casuale, esistono molte tecniche e strategie per generare input validi, tra cui:

- Ottenere feedback da ogni esecuzione e generazione della guida durante l'utilizzo. Ad esempio, se un input appena generato conduce alla scoperta di un nuovo percorso, può avere senso generare nuovi input vicini a esso.
- Generare l'input rispettando un vincolo strutturale. Ad esempio, se il tuo input contiene un'intestazione con un checksum, avrà senso lasciare che il fuzzer generi input a convalida del checksum.
- Usare input noti per generarne di nuovi: se hai accesso a un grande dataset di input validi, il tuo fuzzer può generarne di nuovi, anziché iniziare da zero la generazione. In genere sono detti _seed_.

### Fuzzing basato sulla proprietà {#property-based-fuzzing}

Echidna appartiene a una famiglia specifica di fuzzer: il fuzzing basato sulla proprietà, ampiamente ispirato da [QuickCheck](https://wikipedia.org/wiki/QuickCheck). In contrasto al fuzzer classico che prova a trovare i crash, Echidna prova a rompere le invarianti definite dall'utente.

Negli smart contract, le invarianti sono funzioni di Solidity, che possono rappresentare ogni stato non corretto o non valido raggiungibile dal contratto, tra cui:

- Controllo d'accesso errato: il malintenzionato diventa il proprietario del contratto.
- Macchina di stato errata: i token sono trasferibili mentre il contratto è in pausa.
- Aritmetica errata: l'utente può sottovalutare il proprio saldo e ottenere token gratuiti illimitati.

### Testare una proprietà con Echidna {#testing-a-property-with-echidna}

Vedremo come testare un contratto intelligente con Echidna. L'obiettivo è il seguente smart contract [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

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

Presumeremo che questo token debba avere le seguenti proprietà:

- Chiunque può avere al massimo 1.000 token
- Il token non è trasferibile (non è un token ERC20)

### Scrivi una proprietà {#write-a-property}

Le proprietà di Echidna sono funzioni di Solidity. Una proprietà deve:

- Non avere alcun argomento
- Restituire `true` se va a buon fine
- Avere un nome che inizia per `echidna`

Echidna:

- Genererà automaticamente transazioni arbitrarie per testare la proprietà.
- Segnalare ogni transazione che fa sì che una proprietà restituisca `false` o generi un errore.
- Scartare l'effetto collaterale quando si chiama una proprietà (ad es. se la proprietà cambia una variabile di stato, viene scartata dopo il test)

La seguente proprietà controlla che il chiamante non abbia più di 1.000 token:

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

Usa l'eredità per separare il contratto dalle proprietà:

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) implementa la proprietà ed eredita dal token.

### Avviare un contratto {#initiate-a-contract}

Echidna necessita di un [costruttore](/developers/docs/smart-contracts/anatomy/#constructor-functions) senza argomento. Se il tuo contratto necessita di un'inizializzazione specifica, devi farlo nel costruttore.

Esistono degli indirizzi specifici in Echidna:

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` per chiamare il costruttore.
- `0x10000`, `0x20000`, e `0x00a329C0648769a73afAC7F9381e08fb43DBEA70` per chiamare casualmente le altre funzioni.

Non necessitiamo di alcuna inizializzazione particolare nel nostro esempio corrente, di conseguenza il nostro costruttore è vuoto.

### Eseguire Echidna {#run-echidna}

Echidna è avviato con:

```bash
$ echidna-test contract.sol
```

Se contract.sol contiene più contratti, puoi specificare l'obiettivo:

```bash
$ echidna-test contract.sol --contract MyContract
```

### Riepilogo: Testare una proprietà {#summary-testing-a-property}

Di seguito è riepilogata l'esecuzione di Echidna nel nostro esempio:

```solidity
contract TestToken is Token{
    constructor() public {}
        function echidna_balance_under_1000() public view returns(bool){
          return balances[msg.sender] <= 1000;
        }
  }
```

```bash
$ echidna-test testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence, shrinking (1205/5000):
    airdrop()
    backdoor()

...
```

Echidna ha individuato che la proprietà è violata se `backdoor` viene chiamata.

## Filtrare le funzioni da chiamare durante una campagna di fuzzing {#filtering-functions-to-call-during-a-fuzzing-campaign}

Vedremo come filtrare le funzioni da sottoporre a fuzzing. L'obiettivo è il seguente smart contract:

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

Questo piccolo esempio forza Echidna a trovare una certa sequenza di transazioni per modificare una variabile di stato. Ciò è difficile per un fuzzer (si consiglia di usare uno strumento di esecuzione simbolica come [Manticore](https://github.com/trailofbits/manticore)). Possiamo eseguire Echidna per verificarlo:

```bash
$ echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### Funzioni di filtraggio {#filtering-functions}

Echidna fa fatica a trovare la sequenza corretta per testare questo contratto perché le due funzioni di reset (`reset1` e `reset2`) imposteranno tutte le variabili di stato su `false`. Tuttavia, possiamo usare una funzionalità speciale di Echidna per inserire nella blacklist la funzione di reset o nella whitelist solo le funzioni `f`, `g`, `h` e `i`.

Per inserire le funzioni nella blacklist, possiamo usare questo file di configurazione:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

Un altro approccio per filtrare le funzioni è elencare quelle nella whitelist. Per farlo, possiamo usare questo file di configurazione:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` è `true` di default.
- Il filtraggio sarà eseguito solo per nome (senza parametri). Se hai `f()` e `f(uint256)`, il filtro `"f"` abbinerà entrambe le funzioni.

### Eseguire Echidna {#run-echidna-1}

Per eseguire Echidna con un file di configurazione `blacklist.yaml`:

```bash
$ echidna-test multi.sol --config blacklist.yaml
...
echidna_state4: failed!
  Call sequence:
    f(12)
    g(8)
    h(42)
    i()
```

Echidna troverà la sequenza di transazioni per falsificare la proprietà quasi immediatamente.

### Riepilogo: Filtrare le funzioni {#summary-filtering-functions}

Echidna può inserire le funzioni di blacklist o whitelist da chiamare durante una campagna di fuzzing usando:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
$ echidna-test contract.sol --config config.yaml
...
```

Echidna avvia una campagna di fuzzing inserendo `f1`, `f2` e `f3` nella blacklist o solo chiamandole, in base al valore del booleano `filterBlacklist`.

## Come testare l'affermazione di Solidity con Echidna {#how-to-test-soliditys-assert-with-echidna}

In questo breve tutorial, mostreremo come usare Echidna per testare il controllo dell'affermazione nei contratti. Supponiamo di avere un contratto come questo:

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

Vogliamo assicurarci che `tmp` sia minore o uguale al `counter` dopo averne restituita la differenza. Potremmo scrivere una proprietà di Echidna, ma dovremmo memorizzare da qualche parte il valore `tmp`. Invece, potremmo usare un'asserzione come questa:

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

Per abilitare il test di insuccesso dell'asserzione, crea un [file di configurazione di Echidna](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
checkAsserts: true
```

Quando eseguiamo questo contratto in Echidna, otteniamo i risultati previsti:

```bash
$ echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Come puoi vedere, Echidna segnala alcuni insuccessi dell'asserzione nella funzione `inc`. Aggiungere più di un'asserzione per funzione è possibile, ma Echidna non può dire quale sia fallita.

### Quando e come usare le asserzioni {#when-and-how-use-assertions}

Le asserzioni sono utilizzabili come alternative a proprietà esplicite, specialmente se le condizioni per il controllo sono direttamente correlate all'uso corretto della stessa operazione `f`. Aggiungere le asserzioni dopo il codice farà sì che il controllo abbia luogo immediatamente dopo la sua esecuzione:

```solidity
function f(..) public {
    // some complex code
    ...
    assert (condition);
    ...
}

```

Al contrario, l'utilizzo di una proprietà esplicita di Echidna eseguirà casualmente le transazioni e non esiste alcun metodo semplice per imporre esattamente quando verrà controllata. È comunque possibile sfruttare questa scappatoia:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

Tuttavia, esistono dei problemi:

- Fallisce se `f` è dichiarata come `internal` o `external`.
- Non è chiaro quali argomenti dovrebbero essere usati per chiamare `f`.
- Se `f` si ripristina, la proprietà fallirà.

In generale, consigliamo di seguire i [consigli di John Regehr](https://blog.regehr.org/archives/1091) su come usare le affermazioni:

- Non forzare alcun effetto collaterale durante il controllo dell'affermazione. Ad esempio: `assert(ChangeStateAndReturn() == 1)`
- Non affermare dichiarazioni ovvie. Ad esempio `assert(var >= 0)` dove `var` è dichiarata come `uint`.

Infine, consigliamo di **non usare** `require` al posto di `assert`, poiché Echidna non potrà rilevarlo (ma il contratto si ripristinerà ugualmente).

### Riepilogo: Controllo dell'asserzione {#summary-assertion-checking}

Quanto segue riepiloga l'esecuzione di Echidna nel nostro esempio:

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
$ echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Echidna ha trovato che l'asserzione in `inc` può fallire se questa funzione è chiamata diverse volte con grandi argomenti.

## Raccogliere e modificare un corpus di Echidna {#collecting-and-modifying-an-echidna-corpus}

Vedremo come raccogliere e usare un corpus di transazioni con Echidna. L'obiettivo è il seguente smart contract [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

```solidity
contract C {
  bool value_found = false;
  function magic(uint magic_1, uint magic_2, uint magic_3, uint magic_4) public {
    require(magic_1 == 42);
    require(magic_2 == 129);
    require(magic_3 == magic_4+333);
    value_found = true;
    return;
  }

  function echidna_magic_values() public returns (bool) {
    return !value_found;
  }

}
```

Questo piccolo esempio forza Echidna a trovare una certi valori per modificare una variabile di stato, il che è difficile per un fuzzer (si consiglia di usare uno strumento d'esecuzione simbolica come [Manticore](https://github.com/trailofbits/manticore)). Possiamo eseguire Echidna per verificarlo:

```bash
$ echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

Tuttavia, possiamo comunque usare Echidna per raccogliere il corpus mentre si esegue questa campagna di fuzzing.

### Raccogliere un corpus {#collecting-a-corpus}

Per abilitare la raccolta, crea la cartella di un corpus:

```bash
$ mkdir corpus-magic
```

E un [file di configurazione di Echidna](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

Ora possiamo eseguire il nostro strumento e controllare il corpus raccolto:

```bash
$ echidna-test magic.sol --config config.yaml
```

Echidna non è ancora in grado di trovare i valori magici corretti, ma possiamo dare un'occhiata al corpus raccolto. Ad esempio, uno di questi file era:

```json
[
  {
    "_gas'": "0xffffffff",
    "_delay": ["0x13647", "0xccf6"],
    "_src": "00a329c0648769a73afac7f9381e08fb43dbea70",
    "_dst": "00a329c0648769a73afac7f9381e08fb43dbea72",
    "_value": "0x0",
    "_call": {
      "tag": "SolCall",
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "93723985220345906694500679277863898678726808528711107336895287282192244575836"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "334"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "68093943901352437066264791224433559271778087297543421781073458233697135179558"
            ],
            "tag": "AbiUInt"
          },
          {
            "tag": "AbiUInt",
            "contents": [256, "332"]
          }
        ]
      ]
    },
    "_gasprice'": "0xa904461f1"
  }
]
```

Chiaramente, questo input non innescherà il fallimento nella nostra proprietà. Tuttavia, nel prossimo passaggio, vedremo come modificarlo a tale scopo.

### Seeding di un corpus {#seeding-a-corpus}

Echidna necessita di un po' di aiuto per poter affrontare la funzione `magic`. Copieremo e modificheremo l'input per usare parametri idonei a tale scopo:

```bash
$ cp corpus/2712688662897926208.txt corpus/new.txt
```

Modificheremo `new.txt` per chiamare `magic(42,129,333,0)`. Ora possiamo ri-eseguire Echidna:

```bash
$ echidna-test magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    magic(42,129,333,0)


Unique instructions: 142
Unique codehashes: 1
Seed: -7293830866560616537

```

Questa volta, ha scoperto che la proprietà è immediatamente violata.

## Individuare le transazioni ad alto consumo di gas {#finding-transactions-with-high-gas-consumption}

Vedremo come individuare le transazioni con un alto consumo di carburante con Echidna. L'obiettivo è il seguente smart contract:

```solidity
contract C {
  uint state;

  function expensive(uint8 times) internal {
    for(uint8 i=0; i < times; i++)
      state = state + i;
  }

  function f(uint x, uint y, uint8 times) public {
    if (x == 42 && y == 123)
      expensive(times);
    else
      state = 0;
  }

  function echidna_test() public returns (bool) {
    return true;
  }

}
```

Qui `expensive` può avere un gran consumo di gas.

Attualmente, Echidna necessità sempre di una proprietà da testare: qui `echidna_test` restituisce sempre `true`. Possiamo eseguire Echidna per verificarlo:

```
$ echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### Misurare il consumo di carburante {#measuring-gas-consumption}

Per abilitare il consumo di carburante con Echidna, crea un file di configurazione `config.yaml`:

```yaml
estimateGas: true
```

In questo esempio, ridurremo anche le dimensioni della sequenza di transazione per facilitare la comprensione dei risultati:

```yaml
seqLen: 2
estimateGas: true
```

### Run Echidna {#run-echidna-3}

Una volta creato il file di configurazione, possiamo eseguire Echidna come segue:

```bash
$ echidna-test gas.sol --config config.yaml
...
echidna_test: passed! 🎉

f used a maximum of 1333608 gas
  Call sequence:
    f(42,123,249) Gas price: 0x10d5733f0a Time delay: 0x495e5 Block delay: 0x88b2

Unique instructions: 157
Unique codehashes: 1
Seed: -325611019680165325

```

- Il gas mostrato è una stima fornita da [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-).

### Filtrare le chiamate di riduzione del carburante {#filtering-out-gas-reducing-calls}

Il tutorial precedente sulle **funzioni di filtraggio da chiamare durante una campagna di fuzzing**, mostra come rimuovere alcune funzioni dal tuo test.  
Questo può esser critico per ottenere una stima accurata del gas. Considera l'esempio seguente:

```solidity
contract C {
  address [] addrs;
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

Se Echidna può chiamare tutte le funzioni, non troverà facilmente le transazioni a costo elevato di gas:

```
$ echidna-test pushpop.sol --config config.yaml
...
pop used a maximum of 10746 gas
...
check used a maximum of 23730 gas
...
clear used a maximum of 35916 gas
...
push used a maximum of 40839 gas
```

Questo perché il costo dipende dalla dimensione di `addrs` e le chiamate casuali tendono a lasciare l'array quasi vuoto. L'inserimento in blacklist di `pop` e `clear`, tuttavia, fornisce risultati molto più efficaci:

```yaml
filterBlacklist: true
filterFunctions: ["pop", "clear"]
```

```
$ echidna-test pushpop.sol --config config.yaml
...
push used a maximum of 40839 gas
...
check used a maximum of 1484472 gas
```

### Sommario: Trovare transazioni ad alto consumo di gas {#summary-finding-transactions-with-high-gas-consumption}

Echidna può trovare le transazioni ad alto consumo di gas usando l'opzione di configurazione `estimateGas`:

```yaml
estimateGas: true
```

```bash
$ echidna-test contract.sol --config config.yaml
...
```

Echidna segnalerà una sequenza con il consumo massimo di gas per ogni funzione, una volta terminata la campagna di fuzzing.
