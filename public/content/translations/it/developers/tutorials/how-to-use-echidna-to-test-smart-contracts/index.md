---
title: Come usare Echidna per testare i contratti intelligenti
description: Come usare Echidna per testare automaticamente i contratti intelligenti
author: "Trailofbits"
lang: it
tags:
  [
    "Solidity",
    "smart contract",
    "sicurezza",
    "test",
    "fuzzing"
  ]
skill: advanced
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Installazione {#installation}

Echidna può essere installato tramite docker o usando il binario pre-compilato.

### Echidna tramite docker {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_L'ultimo comando esegue eth-security-toolbox in un docker che ha accesso alla tua directory corrente. Puoi modificare i file dal tuo host ed eseguire gli strumenti sui file dal docker_

All'interno di docker, esegui:

```bash
solc-select 0.5.11
cd /home/training
```

### Binario {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## Introduzione al fuzzing basato sulle proprietà {#introduction-to-property-based-fuzzing}

Echidna è un fuzzer basato sulle proprietà, come descritto nei nostri precedenti post del blog ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Fuzzing {#fuzzing}

[Il fuzzing](https://wikipedia.org/wiki/Fuzzing) è una tecnica ben nota nella comunità della sicurezza. Consiste nel generare input più o meno casuali per trovare bug nel programma. I fuzzer per il software tradizionale (come [AFL](http://lcamtuf.coredump.cx/afl/) o [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) sono noti per essere strumenti efficienti per la ricerca di bug.

Oltre alla generazione di input puramente casuali, esistono molte tecniche e strategie per generare input validi, tra cui:

- Ottenere un feedback da ogni esecuzione e usarlo per guidare la generazione. Ad esempio, se un input appena generato porta alla scoperta di un nuovo percorso, può avere senso generare nuovi input vicini ad esso.
- Generare l'input rispettando un vincolo strutturale. Ad esempio, se il tuo input contiene un'intestazione con un checksum, avrà senso lasciare che il fuzzer generi un input che convalidi il checksum.
- Usare input noti per generarne di nuovi: se hai accesso a un grande dataset di input validi, il tuo fuzzer può generare nuovi input da essi, anziché iniziare la generazione da zero. Questi sono solitamente chiamati _seed_.

### Fuzzing basato sulle proprietà {#property-based-fuzzing}

Echidna appartiene a una famiglia specifica di fuzzer: il fuzzing basato sulle proprietà, fortemente ispirato da [QuickCheck](https://wikipedia.org/wiki/QuickCheck). A differenza del fuzzer classico, che tenta di trovare i crash, Echidna tenta di violare le invarianti definite dall'utente.

Nei contratti intelligenti, le invarianti sono funzioni di Solidity, che possono rappresentare qualsiasi stato errato o non valido che il contratto può raggiungere, tra cui:

- Controllo degli accessi errato: l'autore dell'attacco è diventato il proprietario del contratto.
- Macchina a stati errata: i token possono essere trasferiti mentre il contratto è in pausa.
- Aritmetica errata: l'utente può causare un underflow del suo saldo e ottenere token gratuiti illimitati.

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

Partiremo dal presupposto che questo token debba avere le seguenti proprietà:

- Chiunque può avere al massimo 1000 token
- Il token non può essere trasferito (non è un token ERC20)

### Scrivere una proprietà {#write-a-property}

Le proprietà di Echidna sono funzioni Solidity. Una proprietà deve:

- Non avere argomenti
- Restituire `true` se ha successo
- Avere un nome che inizia con `echidna`

Echidna:

- Generare automaticamente transazioni arbitrarie per testare la proprietà.
- Segnalare qualsiasi transazione che porti una proprietà a restituire `false` o a sollevare un errore.
- Annullare gli effetti collaterali quando si chiama una proprietà (cioè, se la proprietà modifica una variabile di stato, la modifica viene annullata dopo il test)

La seguente proprietà controlla che il chiamante non abbia più di 1000 token:

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

Echidna necessita di un [costruttore](/developers/docs/smart-contracts/anatomy/#constructor-functions) senza argomenti. Se il tuo contratto necessita di un'inizializzazione specifica, devi effettuarla nel costruttore.

In Echidna ci sono alcuni indirizzi specifici:

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` che chiama il costruttore.
- `0x10000`, `0x20000` e `0x00a329C0648769a73afAC7F9381e08fb43DBEA70` che chiamano casualmente le altre funzioni.

Non abbiamo bisogno di alcuna inizializzazione particolare nel nostro esempio attuale, di conseguenza il nostro costruttore è vuoto.

### Eseguire Echidna {#run-echidna}

Echidna si avvia con:

```bash
echidna-test contract.sol
```

Se contract.sol contiene più contratti, puoi specificare la destinazione:

```bash
echidna-test contract.sol --contract MyContract
```

### Riepilogo: testare una proprietà {#summary-testing-a-property}

Quanto segue riassume l'esecuzione di echidna sul nostro esempio:

```solidity
contract TestToken is Token{
    constructor() public {}
        function echidna_balance_under_1000() public view returns(bool){
          return balances[msg.sender] <= 1000;
        }
  }
```

```bash
echidna-test testtoken.sol --contract TestToken
...

echidna_balance_under_1000: fallito!💥
  Sequenza di chiamate, riduzione in corso (1205/5000):
    airdrop()
    backdoor()

...
```

Echidna ha rilevato che la proprietà viene violata se si chiama `backdoor`.

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

Questo piccolo esempio costringe Echidna a trovare una determinata sequenza di transazioni per modificare una variabile di stato.
Questo è difficile per un fuzzer (si consiglia di usare uno strumento di esecuzione simbolica come [Manticore](https://github.com/trailofbits/manticore)).
Possiamo eseguire Echidna per verificarlo:

```bash
echidna-test multi.sol
...
echidna_state4: superato! 🎉
Seed: -3684648582249875403
```

### Funzioni di filtraggio {#filtering-functions}

Echidna ha difficoltà a trovare la sequenza corretta per testare questo contratto perché le due funzioni di ripristino (`reset1` e `reset2`) imposteranno tutte le variabili di stato su `false`.
Tuttavia, possiamo usare una funzionalità speciale di Echidna per inserire nella blacklist la funzione di ripristino o per inserire nella whitelist solo le funzioni `f`, `g`,
`h` e `i`.

Per inserire funzioni nella blacklist, possiamo usare questo file di configurazione:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

Un altro approccio per filtrare le funzioni è elencare quelle inserite nella whitelist. A tal fine, possiamo usare questo file di configurazione:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` è `true` per impostazione predefinita.
- Il filtraggio sarà eseguito solo per nome (senza parametri). Se si dispone di `f()` e `f(uint256)`, il filtro `"f"` corrisponderà a entrambe le funzioni.

### Eseguire Echidna {#run-echidna-1}

Per eseguire Echidna con un file di configurazione `blacklist.yaml`:

```bash
echidna-test multi.sol --config blacklist.yaml
...
echidna_state4: fallito!💥
  Sequenza di chiamate:
    f(12)
    g(8)
    h(42)
    i()
```

Echidna troverà quasi subito la sequenza di transazioni per falsificare la proprietà.

### Riepilogo: funzioni di filtraggio {#summary-filtering-functions}

Echidna può inserire nella blacklist o nella whitelist le funzioni da chiamare durante una campagna di fuzzing usando:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna avvia una campagna di fuzzing inserendo `f1`, `f2` e `f3` nella blacklist o chiamando solo queste, a seconda
del valore del booleano `filterBlacklist`.

## Come testare l'assert di Solidity con Echidna {#how-to-test-soliditys-assert-with-echidna}

In questo breve tutorial, mostreremo come usare Echidna per testare il controllo delle asserzioni nei contratti. Supponiamo di avere un contratto come questo:

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

Vogliamo assicurarci che `tmp` sia minore o uguale a `counter` dopo aver restituito la loro differenza. Potremmo scrivere una
proprietà di Echidna, ma dovremmo memorizzare il valore di `tmp` da qualche parte. Invece, potremmo usare un'asserzione come questa:

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
Analyzing contract: assert.sol:Incrementor
assertion in inc: fallita!💥
  Sequenza di chiamate, riduzione in corso (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Come puoi vedere, Echidna segnala un fallimento dell'asserzione nella funzione `inc`. È possibile aggiungere più di un'asserzione per funzione, ma Echidna non è in grado di dire quale asserzione sia fallita.

### Quando e come usare le asserzioni {#when-and-how-use-assertions}

Le asserzioni possono essere usate come alternative a proprietà esplicite, specialmente se le condizioni da verificare sono direttamente correlate all'uso corretto di un'operazione `f`. L'aggiunta di asserzioni dopo una porzione di codice garantirà che il controllo avvenga immediatamente dopo la sua esecuzione:

```solidity
function f(..) public {
    // un po' di codice complesso
    ...
    assert (condition);
    ...
}

```

Al contrario, usando una proprietà esplicita di echidna si eseguiranno transazioni in modo casuale e non c'è un modo semplice per imporre esattamente quando verrà controllata. È comunque possibile sfruttare questa scappatoia:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

Tuttavia, esistono dei problemi:

- Fallisce se `f` è dichiarato come `internal` o `external`.
- Non è chiaro quali argomenti dovrebbero essere usati per chiamare `f`.
- Se `f` esegue il revert, la proprietà fallirà.

In generale, raccomandiamo di seguire la [raccomandazione di John Regehr](https://blog.regehr.org/archives/1091) su come usare le asserzioni:

- Non forzare alcun effetto collaterale durante il controllo dell'asserzione. Ad esempio: `assert(ChangeStateAndReturn() == 1)`
- Non asserire dichiarazioni ovvie. Ad esempio `assert(var >= 0)` dove `var` è dichiarato come `uint`.

Infine, **non usare** `require` invece di `assert`, poiché Echidna non sarà in grado di rilevarlo (ma il contratto eseguirà comunque un revert).

### Riepilogo: controllo delle asserzioni {#summary-assertion-checking}

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
Analyzing contract: assert.sol:Incrementor
assertion in inc: fallita!💥
  Sequenza di chiamate, riduzione in corso (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Echidna ha rilevato che l'asserzione in `inc` può fallire se questa funzione viene chiamata più volte con argomenti di grandi dimensioni.

## Raccogliere e modificare un corpus di Echidna {#collecting-and-modifying-an-echidna-corpus}

Vedremo come raccogliere e usare un corpus di transazioni con Echidna. L'obiettivo è il seguente contratto intelligente [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

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

Questo piccolo esempio costringe Echidna a trovare determinati valori per modificare una variabile di stato. Questo è difficile per un fuzzer
(si consiglia di usare uno strumento di esecuzione simbolica come [Manticore](https://github.com/trailofbits/manticore)).
Possiamo eseguire Echidna per verificarlo:

```bash
echidna-test magic.sol
...

echidna_magic_values: superato! 🎉

Seed: 2221503356319272685
```

Tuttavia, possiamo comunque usare Echidna per raccogliere il corpus mentre si esegue questa campagna di fuzzing.

### Raccolta di un corpus {#collecting-a-corpus}

Per abilitare la raccolta, crea la cartella di un corpus:

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

Echidna non è ancora in grado di trovare i valori magici corretti, ma possiamo dare un'occhiata al corpus raccolto.
Ad esempio, uno di questi file era:

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

### Fornire un corpus come seed {#seeding-a-corpus}

Echidna necessita di un po' di aiuto per poter affrontare la funzione magic. Copieremo e modificheremo l'input per usare parametri idonei
a tale scopo:

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

Modificheremo `new.txt` per chiamare `magic(42,129,333,0)`. Ora possiamo rieseguire Echidna:

```bash
echidna-test magic.sol --config config.yaml
...
echidna_magic_values: fallito!💥
  Sequenza di chiamate:
    magic(42,129,333,0)


Unique instructions: 142
Unique codehashes: 1
Seed: -7293830866560616537

```

Questa volta, ha scoperto che la proprietà è immediatamente violata.

## Trovare transazioni con un elevato consumo di gas {#finding-transactions-with-high-gas-consumption}

Vedremo come individuare le transazioni con un alto consumo di gas con Echidna. L'obiettivo è il seguente contratto intelligente:

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

Attualmente, Echidna necessità sempre di una proprietà da testare: qui `echidna_test` restituisce sempre `true`.
Possiamo eseguire Echidna per verificarlo:

```
echidna-test gas.sol
...
echidna_test: superato! 🎉

Seed: 2320549945714142710
```

### Misurare il consumo di gas {#measuring-gas-consumption}

Per abilitare il consumo di gas con Echidna, crea un file di configurazione `config.yaml`:

```yaml
estimateGas: true
```

In questo esempio, ridurremo anche le dimensioni della sequenza di transazione per facilitare la comprensione dei risultati:

```yaml
In questo esempio, ridurremo anche le dimensioni della sequenza di transazione per facilitare la comprensione dei risultati:
```

### seqLen: 2&#xA;estimateGas: true

Eseguire Echidna {#run-echidna-3}

```bash
Una volta creato il file di configurazione, possiamo eseguire Echidna come segue:
```

- echidna-test gas.sol --config config.yaml
  ...
  echidna_test: superato! 🎉f ha usato un massimo di 1333608 di gas
  Sequenza di chiamate:
  f(42,123,249) Prezzo del gas: 0x10d5733f0a Ritardo: 0x495e5 Ritardo blocco: 0x88b2Unique instructions: 157
  Unique codehashes: 1
  Seed: -325611019680165325

### Il gas mostrato è una stima fornita da [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-).

Filtrare le chiamate che riducono il gas {#filtering-out-gas-reducing-calls}  
Il tutorial precedente su come **filtrare le funzioni da chiamare durante una campagna di fuzzing** mostra come
rimuovere alcune funzioni dal tuo test.
Si consideri l'esempio seguente:

```solidity
Questo può essere fondamentale per ottenere una stima accurata del gas.
```

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

echidna-test pushpop.sol --config config.yaml
...
pop ha usato un massimo di 10746 di gas
...
check ha usato un massimo di 23730 di gas
...
clear ha usato un massimo di 35916 di gas
...
push ha usato un massimo di 40839 di gas
Questo perché il costo dipende dalla dimensione di `addrs` e le chiamate casuali tendono a lasciare l'array quasi vuoto.

```yaml
Tuttavia, inserire `pop` e `clear` in una blacklist, ci fornisce risultati molto migliori:
```

```
filterBlacklist: true
filterFunctions: ["pop", "clear"]
```

### echidna-test pushpop.sol --config config.yaml&#xA;...&#xA;push ha usato un massimo di 40839 di gas&#xA;...&#xA;check ha usato un massimo di 1484472 di gas

Riepilogo: trovare transazioni con un elevato consumo di gas {#summary-finding-transactions-with-high-gas-consumption}

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna può trovare le transazioni ad alto consumo di gas usando l'opzione di configurazione `estimateGas`:
