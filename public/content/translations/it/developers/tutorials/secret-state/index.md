---
title: Utilizzo della conoscenza-zero per uno stato segreto
description: I giochi on-chain sono limitati perché non possono conservare alcuna informazione nascosta. Dopo aver letto questa guida, il lettore sarà in grado di combinare prove a conoscenza-zero e componenti server per creare giochi verificabili con uno stato segreto, componente off-chain. La tecnica per farlo sarà dimostrata creando un gioco di campo minato.
author: Ori Pomerantz
tags:
  [
    "server",
    "offchain",
    "centralizzato",
    "conoscenza-zero",
    "zokrates",
    "mud"
  ]
skill: advanced
lang: it
published: 2025-03-15
---

_Non ci sono segreti sulla blockchain_. Tutto ciò che viene pubblicato sulla blockchain è aperto alla lettura da parte di tutti. Questo è necessario, perché la blockchain si basa sulla capacità di chiunque di verificarla. Tuttavia, i giochi si basano spesso su uno stato segreto. Ad esempio, il gioco del [campo minato](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) non ha assolutamente senso se si può semplicemente andare su un esploratore di blockchain e vedere la mappa.

La soluzione più semplice è utilizzare un [componente server](/developers/tutorials/server-components/) per conservare lo stato segreto. Tuttavia, il motivo per cui utilizziamo la blockchain è per impedire che lo sviluppatore del gioco possa barare. Dobbiamo garantire l'onestà del componente server. Il server può fornire un hash dello stato e utilizzare [prove a conoscenza-zero](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) per dimostrare che lo stato utilizzato per calcolare il risultato di una mossa è quello corretto.

Dopo aver letto questo articolo saprai come creare questo tipo di server che conserva uno stato segreto, un client per mostrare lo stato e un componente on-chain per la comunicazione tra i due. Gli strumenti principali che utilizzeremo saranno:

| Strumento                                     | Scopo                                                            |               Verificato sulla versione |
| --------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------: |
| [Zokrates](https://zokrates.github.io/)       | Prove a conoscenza-zero e loro verifica                          |   1.1.9 |
| [Typescript](https://www.typescriptlang.org/) | Linguaggio di programmazione sia per il server che per il client |   5.4.2 |
| [Node](https://nodejs.org/en)                 | Esecuzione del server                                            | 20.18.2 |
| [Viem](https://viem.sh/)                      | Comunicazione con la blockchain                                  |  2.9.20 |
| [MUD](https://mud.dev/)                       | Gestione dei dati on-chain                                       |  2.0.12 |
| [React](https://react.dev/)                   | Interfaccia utente del client                                    |  18.2.0 |
| [Vite](https://vitejs.dev/)                   | Erogazione del codice client                                     |   4.2.1 |

## Esempio di Campo Minato {#minesweeper}

[Campo Minato](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) è un gioco che include una mappa segreta con un campo minato. Il giocatore sceglie di scavare in una posizione specifica. Se in quella posizione c'è una mina, il gioco finisce. Altrimenti, il giocatore ottiene il numero di mine nelle otto caselle che circondano quella posizione.

Questa applicazione è scritta utilizzando [MUD](https://mud.dev/), un framework che ci consente di archiviare dati on-chain utilizzando un [database chiave-valore](https://aws.amazon.com/nosql/key-value/) e sincronizzare tali dati automaticamente con i componenti off-chain. Oltre alla sincronizzazione, MUD facilita il controllo degli accessi e consente ad altri utenti di [estendere](https://mud.dev/guides/extending-a-world) la nostra applicazione senza autorizzazione.

### Esecuzione dell'esempio di Campo Minato {#running-minesweeper-example}

Per eseguire l'esempio di Campo Minato:

1. Assicurati di [aver installato i prerequisiti](https://mud.dev/quickstart#prerequisites): [Node](https://mud.dev/quickstart#prerequisites), [Foundry](https://book.getfoundry.sh/getting-started/installation), [`git`](https://git-scm.com/downloads), [`pnpm`](https://git-scm.com/downloads) e [`mprocs`](https://github.com/pvolok/mprocs).

2. Clona il repository.

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. Installa i pacchetti.

   ```sh copy
   cd 20240901-secret-state/
   pnpm install
   npm install -g mprocs
   ```

   Se Foundry è stato installato come parte di `pnpm install`, è necessario riavviare la shell della riga di comando.

4. Compila i contratti

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```

5. Avvia il programma (inclusa una blockchain [anvil](https://book.getfoundry.sh/anvil/)) e attendi.

   ```sh copy
   mprocs
   ```

   Nota che l'avvio richiede molto tempo. Per vedere i progressi, utilizza prima la freccia giù per scorrere fino alla scheda _contracts_ per vedere il deploy dei contratti MUD. Quando ricevi il messaggio _Waiting for file changes…_, i contratti sono distribuiti e ulteriori progressi avverranno nella scheda _server_. Lì, attendi fino a quando non ricevi il messaggio _Verifier address: 0x...._.

   Se questo passaggio ha esito positivo, vedrai la schermata `mprocs`, con i diversi processi a sinistra e l'output della console per il processo attualmente selezionato a destra.

   ![La schermata mprocs](./mprocs.png)

   In caso di problemi con `mprocs`, è possibile eseguire i quattro processi manualmente, ciascuno nella propria finestra della riga di comando:

   - **Anvil**

     ```sh
     cd packages/contracts
     anvil --base-fee 0 --block-time 2
     ```

   - **Contratti**

     ```sh
     cd packages/contracts
     pnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **Server**

     ```sh
     cd packages/server
     pnpm start
     ```

   - **Client**

     ```sh
     cd packages/client
     pnpm run dev
     ```

6. Ora puoi navigare fino al [client](http://localhost:3000), fare clic su **New Game** (Nuova partita) e iniziare a giocare.

### Tabelle {#tables}

Abbiamo bisogno di [diverse tabelle](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) on-chain.

- `Configuration`: questa tabella è un singleton, non ha chiave e un singolo record. È usata per contenere le informazioni di configurazione del gioco:
  - `height`: l'altezza di un campo minato
  - `width`: la larghezza di un campo minato
  - `numberOfBombs`: il numero di bombe in ogni campo minato

- `VerifierAddress`: anche questa tabella è un singleton. Viene utilizzata per contenere una parte della configurazione, l'indirizzo del contratto di verifica (`verifier`). Avremmo potuto inserire queste informazioni nella tabella `Configuration`, ma sono impostate da un componente diverso, il server, quindi è più facile inserirle in una tabella separata.

- `PlayerGame`: la chiave è l'indirizzo del giocatore. I dati sono:

  - `gameId`: valore a 32 byte che è l'hash della mappa su cui il giocatore sta giocando (l'identificatore del gioco).
  - `win`: un booleano che indica se il giocatore ha vinto la partita.
  - `lose`: un booleano che indica se il giocatore ha perso la partita.
  - `digNumber`: il numero di scavi riusciti nel gioco.

- `GamePlayer`: questa tabella contiene la mappatura inversa, da `gameId` all'indirizzo del giocatore.

- `Map`: la chiave è una tupla di tre valori:

  - `gameId`: valore a 32 byte che è l'hash della mappa su cui il giocatore sta giocando (l'identificatore del gioco).
  - coordinata `x`
  - coordinata `y`

  Il valore è un singolo numero. È 255 se è stata rilevata una bomba. Altrimenti, è il numero di bombe intorno a quella posizione più uno. Non possiamo usare solo il numero di bombe, perché per impostazione predefinita tutto lo storage nell'EVM e tutti i valori di riga in MUD sono zero. Dobbiamo distinguere tra "il giocatore non ha ancora scavato qui" e "il giocatore ha scavato qui e ha scoperto che non ci sono bombe intorno".

Inoltre, la comunicazione tra il client e il server avviene attraverso il componente on-chain. Anche questo è implementato utilizzando le tabelle.

- `PendingGame`: Richieste non servite per iniziare una nuova partita.
- `PendingDig`: Richieste non servite di scavare in un posto specifico in una partita specifica. Questa è una [tabella off-chain](https://mud.dev/store/tables#types-of-tables), il che significa che non viene scritta nell'archiviazione EVM, ma è leggibile solo off-chain tramite eventi.

### Flussi di esecuzione e di dati {#execution-data-flows}

Questi flussi coordinano l'esecuzione tra il client, il componente on-chain e il server.

#### Inizializzazione {#initialization-flow}

Quando si esegue `mprocs`, si verificano questi passaggi:

1. [`mprocs`](https://github.com/pvolok/mprocs) esegue quattro componenti:

   - [Anvil](https://book.getfoundry.sh/anvil/), che esegue una blockchain locale
   - [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts), che compila (se necessario) e distribuisce i contratti per MUD
   - [Client](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client), che esegue [Vite](https://vitejs.dev/) per servire l'interfaccia utente e il codice del client ai browser Web.
   - [Server](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server), che esegue le azioni del server

2. Il pacchetto `contracts` distribuisce i contratti MUD e quindi esegue [lo script `PostDeploy.s.sol`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol). Questo script imposta la configurazione. Il codice da GitHub specifica [un campo minato 10x5 con otto mine](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23).

3. [Il server](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) inizia [impostando MUD](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6). Tra le altre cose, questo attiva la sincronizzazione dei dati, in modo che una copia delle tabelle pertinenti esista nella memoria del server.

4. Il server sottoscrive una funzione da eseguire [quando la tabella `Configuration` cambia](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23). [Questa funzione](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) viene chiamata dopo che `PostDeploy.s.sol` viene eseguito e modifica la tabella.

5. Quando la funzione di inizializzazione del server ha la configurazione, [chiama `zkFunctions`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35) per inizializzare [la parte a conoscenza-zero del server](#using-zokrates-from-typescript). Questo non può accadere finché non otteniamo la configurazione, perché le funzioni a conoscenza-zero devono avere la larghezza e l'altezza del campo minato come costanti.

6. Dopo l'inizializzazione della parte a conoscenza-zero del server, il passo successivo è [distribuire il contratto di verifica a conoscenza-zero sulla blockchain](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) e impostare l'indirizzo del verificato in MUD.

7. Infine, ci iscriviamo agli aggiornamenti per vedere quando un giocatore richiede di [iniziare una nuova partita](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) o di [scavare in una partita esistente](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108).

#### Nuova partita {#new-game-flow}

Questo è ciò che accade quando il giocatore richiede una nuova partita.

1. Se non c'è una partita in corso per questo giocatore, o ce n'è una ma con un gameId pari a zero, il client visualizza un [pulsante Nuova partita](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175). Quando l'utente preme questo pulsante, [React esegue la funzione `newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96).

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) è una chiamata di `Sistema`. In MUD tutte le chiamate vengono instradate attraverso il contratto `World` e nella maggior parte dei casi si chiama `<namespace>__<function name>`. In questo caso, la chiamata è a `app__newGame`, che MUD instrada a [`newGame` in `GameSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22).

3. La funzione on-chain controlla che il giocatore non abbia una partita in corso e, in caso contrario, [aggiunge la richiesta alla tabella `PendingGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21).

4. Il server rileva la modifica in `PendingGame` ed [esegue la funzione sottoscritta](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71). Questa funzione chiama [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114), che a sua volta chiama [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144).

5. La prima cosa che `createGame` fa è [creare una mappa casuale con il numero appropriato di mine](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135). Quindi, chiama [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) per creare una mappa con bordi vuoti, necessaria per Zokrates. Infine, `createGame` chiama [`calculateMapHash`](#calculateMapHash), per ottenere l'hash della mappa, che viene utilizzato come ID del gioco.

6. La funzione `newGame` aggiunge la nuova partita a `gamesInProgress`.

7. L'ultima cosa che fa il server è chiamare [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43), che è on-chain. Questa funzione si trova in un `Sistema` diverso, [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol), per abilitare il controllo degli accessi. Il controllo degli accessi è definito nel [file di configurazione MUD](https://mud.dev/config), [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72).

   La lista di accesso consente solo a un singolo indirizzo di chiamare il `Sistema`. Ciò limita l'accesso alle funzioni del server a un singolo indirizzo, in modo che nessuno possa impersonare il server.

8. Il componente on-chain aggiorna le tabelle pertinenti:

   - Creare la partita in `PlayerGame`.
   - Impostare la mappatura inversa in `GamePlayer`.
   - Rimuovere la richiesta da `PendingGame`.

9. Il server identifica la modifica in `PendingGame`, ma non fa nulla perché [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) è falso.

10. Sul client [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) è impostato sulla voce `PlayerGame` per l'indirizzo del giocatore. Quando `PlayerGame` cambia, cambia anche `gameRecord`.

11. Se c'è un valore in `gameRecord`, e la partita non è stata né vinta né persa, il client [mostra la mappa](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190).

#### Scavo {#dig-flow}

1. Il giocatore [fa clic sul pulsante della cella della mappa](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), che chiama [la funzione `dig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36). Questa funzione chiama [`dig` on-chain](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32).

2. Il componente on-chain [esegue una serie di controlli di integrità](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30) e, in caso di successo, aggiunge la richiesta di scavo a [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31).

3. Il server [rileva la modifica in `PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73). [Se è valida](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), [chiama il codice a conoscenza-zero](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (spiegato di seguito) per generare sia il risultato che una prova della sua validità.

4. [Il server](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) chiama [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) on-chain.

5. `digResponse` fa due cose. Innanzitutto, controlla [la prova a conoscenza-zero](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61). Quindi, se la prova è corretta, chiama [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) per elaborare effettivamente il risultato.

6. `processDigResult` controlla se la partita è stata [persa](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) o [vinta](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86) e [aggiorna `Map`, la mappa on-chain](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80).

7. Il client rileva automaticamente gli aggiornamenti e [aggiorna la mappa visualizzata al giocatore](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190) e, se applicabile, comunica al giocatore se ha vinto o perso.

## Utilizzo di Zokrates {#using-zokrates}

Nei flussi spiegati sopra abbiamo saltato le parti a conoscenza-zero, trattandole come una scatola nera. Ora apriamola e vediamo come è scritto quel codice.

### Hashing della mappa {#hashing-map}

Possiamo utilizzare [questo codice JavaScript](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) per implementare [Poseidon](https://www.poseidon-hash.info), la funzione di hash di Zokrates che utilizziamo. Tuttavia, sebbene questo sarebbe più veloce, sarebbe anche più complicato che usare semplicemente la funzione di hash di Zokrates per farlo. Questo è un tutorial e quindi il codice è ottimizzato per la semplicità, non per le prestazioni. Pertanto, abbiamo bisogno di due diversi programmi Zokrates, uno per calcolare semplicemente l'hash di una mappa (`hash`) e uno per creare effettivamente una prova a conoscenza-zero del risultato dello scavo in una posizione sulla mappa (`dig`).

### La funzione di hash {#hash-function}

Questa è la funzione che calcola l'hash di una mappa. Analizzeremo questo codice riga per riga.

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

Queste due righe importano due funzioni dalla [libreria standard di Zokrates](https://zokrates.github.io/toolbox/stdlib.html). [La prima funzione](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) è un [hash Poseidon](https://www.poseidon-hash.info/). Accetta un array di elementi [`field` (campo)](https://zokrates.github.io/language/types.html#field) e restituisce un `field`.

L'elemento di campo in Zokrates è in genere lungo meno di 256 bit, ma non di molto. Per semplificare il codice, limitiamo la mappa a un massimo di 512 bit ed eseguiamo l'hash di un array di quattro campi, e in ogni campo utilizziamo solo 128 bit. [La funzione `pack128`](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) cambia un array di 128 bit in un `field` a questo scopo.

```
        def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

Questa riga avvia la definizione di una funzione. `hashMap` ottiene un singolo parametro chiamato `map`, un array `bool`(eano) bidimensionale. La dimensione della mappa è `width+2` per `height+2` per ragioni che sono [spiegate di seguito](#why-map-border).

Possiamo usare `${width+2}` e `${height+2}` perché i programmi Zokrates sono memorizzati in questa applicazione come [stringhe modello](https://www.w3schools.com/js/js_string_templates.asp). Il codice tra `${` e `}` viene valutato da JavaScript e in questo modo il programma può essere utilizzato per diverse dimensioni di mappa. Il parametro della mappa ha un bordo largo una posizione tutto intorno senza bombe, che è il motivo per cui dobbiamo aggiungere due alla larghezza e all'altezza.

Il valore di ritorno è un `field` (campo) che contiene l'hash.

```
   bool[512] mut map1d = [false; 512];
```

La mappa è bidimensionale. Tuttavia, la funzione `pack128` non funziona con array bidimensionali. Quindi prima appiattiamo la mappa in un array di 512 byte, usando `map1d`. Per impostazione predefinita le variabili Zokrates sono costanti, ma dobbiamo assegnare valori a questo array in un ciclo, quindi lo definiamo come [`mut`](https://zokrates.github.io/language/variables.html#mutability).

Dobbiamo inizializzare l'array perché Zokrates non ha `undefined`. L'espressione `[false; 512]` significa [un array di 512 valori `false`](https://zokrates.github.io/language/types.html#declaration-and-initialization).

```
   u32 mut counter = 0;
```

Abbiamo anche bisogno di un contatore per distinguere tra i bit che abbiamo già riempito in `map1d` e quelli che non abbiamo riempito.

```
   for u32 x in 0..${width+2} {
```

Questo è il modo in cui si dichiara un [ciclo `for`](https://zokrates.github.io/language/control_flow.html#for-loops) in Zokrates. Un ciclo `for` di Zokrates deve avere limiti fissi, perché mentre sembra essere un ciclo, il compilatore in realtà lo "srotola". L'espressione `${width+2}` è una costante di compilazione perché `width` viene impostata dal codice TypeScript prima di chiamare il compilatore.

```
      for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

Per ogni posizione nella mappa, inserisci quel valore nell'array `map1d` e incrementa il contatore.

```
    field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

`pack128` crea un array di quattro valori `field` da `map1d`. In Zokrates `array[a..b]` significa la fetta dell'array che inizia in `a` e termina in `b-1`.

```
    return poseidon(hashMe);
}
```

Usa `poseidon` per convertire questo array in un hash.

### Il programma di hash {#hash-program}

Il server deve chiamare `hashMap` direttamente per creare gli identificatori del gioco. Tuttavia, Zokrates può chiamare solo la funzione `main` in un programma per iniziare, quindi creiamo un programma con un `main` che chiama la funzione di hash.

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### Il programma di scavo {#dig-program}

Questo è il cuore della parte a conoscenza-zero dell'applicazione, dove produciamo le prove che vengono utilizzate per verificare i risultati dello scavo.

```
${hashFragment}

// Il numero di mine nella posizione (x,y)
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### Perché il bordo della mappa {#why-map-border}

Le prove a conoscenza-zero utilizzano [circuiti aritmetici](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785), che non hanno un equivalente facile a un'istruzione `if`. Invece, usano l'equivalente dell'[operatore condizionale](https://en.wikipedia.org/wiki/Ternary_conditional_operator). Se `a` può essere zero o uno, è possibile calcolare `if a { b } else { c }` come `ab+(1-a)c`.

Per questo motivo, un'istruzione `if` di Zokrates valuta sempre entrambi i rami. Ad esempio, se si dispone di questo codice:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

Genererà un errore, perché deve calcolare `arr[10]`, anche se quel valore verrà successivamente moltiplicato per zero.

Questo è il motivo per cui abbiamo bisogno di un bordo largo una posizione tutto intorno alla mappa. Dobbiamo calcolare il numero totale di mine intorno a una posizione, e questo significa che dobbiamo vedere la posizione una riga sopra e sotto, a sinistra e a destra, della posizione in cui stiamo scavando. Ciò significa che quelle posizioni devono esistere nell'array della mappa fornito a Zokrates.

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

Per impostazione predefinita le prove Zokrates includono i loro input. Non serve a nulla sapere che ci sono cinque mine intorno a un punto a meno che non si sappia effettivamente di quale punto si tratta (e non si può semplicemente abbinarlo alla propria richiesta, perché allora il provatore potrebbe usare valori diversi e non dirlo). Tuttavia, dobbiamo mantenere la mappa segreta, fornendola a Zokrates. La soluzione consiste nell'utilizzare un parametro `privato`, uno che _non_ viene rivelato dalla prova.

Questo apre un'altra via per l'abuso. Il provatore potrebbe usare le coordinate corrette, ma creare una mappa con un numero qualsiasi di mine intorno alla posizione, e possibilmente nella posizione stessa. Per prevenire questo abuso, facciamo in modo che la prova a conoscenza-zero includa l'hash della mappa, che è l'identificatore del gioco.

```
   return (hashMap(map),
```

Il valore di ritorno qui è una tupla che include l'array di hash della mappa e il risultato dello scavo.

```
         if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

Usiamo 255 come valore speciale nel caso in cui la posizione stessa abbia una bomba.

```
            map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

Se il giocatore non ha colpito una mina, aggiungi il conteggio delle mine per l'area intorno alla posizione e restituisci quello.

### Utilizzo di Zokrates da TypeScript {#using-zokrates-from-typescript}

Zokrates ha un'interfaccia a riga di comando, ma in questo programma lo usiamo nel [codice TypeScript](https://zokrates.github.io/toolbox/zokrates_js.html).

La libreria che contiene le definizioni Zokrates si chiama [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts).

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

Importa i [binding JavaScript di Zokrates](https://zokrates.github.io/toolbox/zokrates_js.html). Abbiamo bisogno solo della funzione [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) perché restituisce una promessa che si risolve in tutte le definizioni di Zokrates.

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Similmente a Zokrates stesso, esportiamo anche una sola funzione, che è anche [asincrona](https://www.w3schools.com/js/js_async.asp). Quando alla fine restituisce, fornisce diverse funzioni come vedremo di seguito.

```typescript
const zokrates = await zokratesInitialize()
```

Inizializza Zokrates, ottieni tutto ciò di cui abbiamo bisogno dalla libreria.

```typescript
const hashFragment = `
        import "utils/pack/bool/pack128.zok" as pack128;
        import "hashes/poseidon/poseidon.zok" as poseidon;
            .
            .
            .
        }
    `

const hashProgram = `
        ${hashFragment}
            .
            .
            .
    `

const digProgram = `
        ${hashFragment}
            .
            .
            .
    `
```

Successivamente abbiamo la funzione di hash e due programmi Zokrates che abbiamo visto sopra.

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

Qui compiliamo quei programmi.

```typescript
// Crea le chiavi per la verifica a conoscenza-zero.
// Su un sistema di produzione vorresti usare una cerimonia di configurazione.
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

Su un sistema di produzione potremmo utilizzare una [cerimonia di configurazione](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) più complessa, ma questa è sufficiente per una dimostrazione. Non è un problema che gli utenti possano conoscere la chiave del provatore - non possono comunque usarla per provare cose a meno che non siano vere. Poiché specifichiamo l'entropia (il secondo parametro, `""`), i risultati saranno sempre gli stessi.

**Nota:** La compilazione dei programmi Zokrates e la creazione delle chiavi sono processi lenti. Non è necessario ripeterli ogni volta, solo quando la dimensione della mappa cambia. Su un sistema di produzione li faresti una volta, e poi memorizzeresti l'output. L'unica ragione per cui non lo faccio qui è per semplicità.

#### `calculateMapHash` {#calculateMapHash}

```typescript
const calculateMapHash = function (hashMe: boolean[][]): string {
  return (
    "0x" +
    BigInt(zokrates.computeWitness(hashCompiled, [hashMe]).output.slice(1, -1))
      .toString(16)
      .padStart(64, "0")
  )
}
```

La funzione [`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) esegue effettivamente il programma Zokrates. Restituisce una struttura con due campi: `output`, che è l'output del programma come stringa JSON, e `witness`, che è l'informazione necessaria per creare la prova a conoscenza-zero del risultato. Qui abbiamo bisogno solo dell'output.

L'output è una stringa del tipo `"31337"`, un numero decimale racchiuso tra virgolette. Ma l'output di cui abbiamo bisogno per `viem` è un numero esadecimale del tipo `0x60A7`. Quindi usiamo `.slice(1,-1)` per rimuovere le virgolette e poi `BigInt` per eseguire la stringa rimanente, che è un numero decimale, in un [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt). `.toString(16)` converte questo `BigInt` in una stringa esadecimale, e `"0x"+` aggiunge il marcatore per i numeri esadecimali.

```typescript
// Scava e restituisci una prova a conoscenza-zero del risultato
// (codice lato server)
```

La prova a conoscenza-zero include gli input pubblici (`x` e `y`) e i risultati (hash della mappa e numero di bombe).

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

È un problema controllare se un indice è fuori dai limiti in Zokrates, quindi lo facciamo qui.

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

Esegui il programma di scavo.

```typescript
        const proof = zokrates.generateProof(
            digCompiled.program,
            runResults.witness,
            proverKey)

        return proof
    }
```

Usa [`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) e restituisci la prova.

```typescript
const solidityVerifier = `
        // Dimensione mappa: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

Un verificatore Solidity, un contratto intelligente che possiamo distribuire sulla blockchain e utilizzare per verificare le prove generate da `digCompiled.program`.

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

Infine, restituisci tutto ciò di cui altro codice potrebbe aver bisogno.

## Test di sicurezza {#security-tests}

I test di sicurezza sono importanti perché un bug di funzionalità alla fine si rivelerà da solo. Ma se l'applicazione è insicura, è probabile che rimanga nascosta per molto tempo prima che venga rivelata da qualcuno che bara e si appropria di risorse che appartengono ad altri.

### Autorizzazioni {#permissions}

C'è un'entità privilegiata in questo gioco, il server. È l'unico utente autorizzato a chiamare le funzioni in [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol). Possiamo usare [`cast`](https://book.getfoundry.sh/cast/) per verificare che le chiamate a funzioni con autorizzazione siano consentite solo come account del server.

[La chiave privata del server è in `setupNetwork.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52).

1. Sul computer che esegue `anvil` (la blockchain), imposta queste variabili d'ambiente.

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. Usa `cast` per tentare di impostare l'indirizzo del verificatore come un indirizzo non autorizzato.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   Non solo `cast` segnala un fallimento, ma puoi aprire **MUD Dev Tools** nel gioco sul browser, fare clic su **Tables**, e selezionare **app\_\_VerifierAddress**. Vedi che l'indirizzo non è zero.

3. Imposta l'indirizzo del verificatore come indirizzo del server.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   L'indirizzo in **app\_\_VerifiedAddress** dovrebbe ora essere zero.

Tutte le funzioni MUD nello stesso `Sistema` passano attraverso lo stesso controllo di accesso, quindi considero questo test sufficiente. Se non lo fai, puoi controllare le altre funzioni in [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol).

### Abusi a conoscenza-zero {#zero-knowledge-abuses}

La matematica per verificare Zokrates va oltre lo scopo di questo tutorial (e le mie capacità). Tuttavia, possiamo eseguire vari controlli sul codice a conoscenza-zero per verificare che se non è fatto correttamente fallisca. Tutti questi test richiederanno di modificare [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) e riavviare l'intera applicazione. Non è sufficiente riavviare il processo del server, perché mette l'applicazione in uno stato impossibile (il giocatore ha una partita in corso, ma la partita non è più disponibile per il server).

#### Risposta sbagliata {#wrong-answer}

La possibilità più semplice è fornire la risposta sbagliata nella prova a conoscenza-zero. Per fare ciò, andiamo all'interno di `zkDig` e [modifichiamo la riga 91](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

Questo significa che affermeremo sempre che c'è una bomba, indipendentemente dalla risposta corretta. Prova a giocare con questa versione e vedrai nella scheda **server** della schermata `pnpm dev` questo errore:

```
      cause: {
        code: 3,
        message: 'execution reverted: revert: Zero knowledge verification fail',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
00000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

Quindi questo tipo di imbroglio fallisce.

#### Prova errata {#wrong-proof}

Cosa succede se forniamo le informazioni corrette, ma abbiamo solo i dati della prova sbagliati? Ora, sostituisci la riga 91 con:

```ts
proof.proof = {
  a: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  b: [
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  ],
  c: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
}
```

Fallisce ancora, ma ora fallisce senza un motivo perché accade durante la chiamata al verificatore.

### Come può un utente verificare il codice a fiducia-zero? {#user-verify-zero-trust}

I contratti intelligenti sono relativamente facili da verificare. In genere, lo sviluppatore pubblica il codice sorgente su un esploratore di blocchi, e l'esploratore di blocchi verifica che il codice sorgente venga compilato nel codice della [transazione di distribuzione del contratto](/developers/docs/smart-contracts/deploying/). Nel caso dei `Sistemi` MUD questo è [leggermente più complicato](https://mud.dev/cli/verify), ma non di molto.

Questo è più difficile con la conoscenza-zero. Il verificatore include alcune costanti ed esegue alcuni calcoli su di esse. Questo non ti dice cosa viene provato.

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

La soluzione, almeno finché gli esploratori di blocchi non aggiungeranno la verifica Zokrates alle loro interfacce utente, è che gli sviluppatori dell'applicazione rendano disponibili i programmi Zokrates e che almeno alcuni utenti li compilino da soli con la chiave di verifica appropriata.

Per farlo:

1. [Installa Zokrates](https://zokrates.github.io/gettingstarted.html).

2. Crea un file, `dig.zok`, con il programma Zokrates. Il codice seguente presuppone che tu abbia mantenuto la dimensione originale della mappa, 10x5.

   ```zokrates
    import "utils/pack/bool/pack128.zok" as pack128;
    import "hashes/poseidon/poseidon.zok" as poseidon;

    def hashMap(bool[12][7] map) -> field {
        bool[512] mut map1d = [false; 512];
        u32 mut counter = 0;

        for u32 x in 0..12 {
            for u32 y in 0..7 {
                map1d[counter] = map[x][y];
                counter = counter+1;
            }
        }

        field[4] hashMe = [
            pack128(map1d[0..128]),
            pack128(map1d[128..256]),
            pack128(map1d[256..384]),
            pack128(map1d[384..512])
        ];

        return poseidon(hashMe);
    }


    // Il numero di mine nella posizione (x,y)
    def map2mineCount(bool[12][7] map, u32 x, u32 y) -> u8 {
        return if map[x+1][y+1] { 1 } else { 0 };
    }

    def main(private bool[12][7] map, u32 x, u32 y) -> (field, u8) {
        return (hashMap(map) ,
            if map2mineCount(map, x, y) > 0 { 0xFF } else {
                map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
                map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
                map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
            }
        );
    }
   ```

3. Compila il codice Zokrates e crea la chiave di verifica. La chiave di verifica deve essere creata con la stessa entropia utilizzata nel server originale, [in questo caso una stringa vuota](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67).

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. Crea il verificatore Solidity da solo e verifica che sia funzionalmente identico a quello sulla blockchain (il server aggiunge un commento, ma non è importante).

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## Decisioni di progettazione {#design}

In ogni applicazione sufficientemente complessa ci sono obiettivi di progettazione contrastanti che richiedono compromessi. Diamo un'occhiata ad alcuni dei compromessi e al motivo per cui la soluzione attuale è preferibile ad altre opzioni.

### Perché conoscenza-zero {#why-zero-knowledge}

Per Campo Minato non hai davvero bisogno della conoscenza-zero. Il server può sempre conservare la mappa e poi rivelarla tutta quando il gioco è finito. Quindi, alla fine del gioco, il contratto intelligente può calcolare l'hash della mappa, verificare che corrisponda e, in caso contrario, penalizzare il server o ignorare completamente il gioco.

Non ho usato questa soluzione più semplice perché funziona solo per giochi brevi con uno stato finale ben definito. Quando un gioco è potenzialmente infinito (come nel caso dei [mondi autonomi](https://0xparc.org/blog/autonomous-worlds)), hai bisogno di una soluzione che provi lo stato _senza_ rivelarlo.

Come guida, questo articolo aveva bisogno di un gioco breve e facile da capire, ma questa tecnica è più utile per giochi più lunghi.

### Perché Zokrates? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) non è l'unica libreria a conoscenza-zero disponibile, ma è simile a un normale linguaggio di programmazione [imperativo](https://en.wikipedia.org/wiki/Imperative_programming) e supporta variabili booleane.

Per la tua applicazione, con requisiti diversi, potresti preferire utilizzare [Circum](https://docs.circom.io/getting-started/installation/) o [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/).

### Quando compilare Zokrates {#when-compile-zokrates}

In questo programma compiliamo i programmi Zokrates [ogni volta che il server si avvia](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61). Questo è chiaramente uno spreco di risorse, ma questo è un tutorial, ottimizzato per la semplicità.

Se stessi scrivendo un'applicazione a livello di produzione, verificherei se ho un file con i programmi Zokrates compilati a questa dimensione del campo minato, e in tal caso lo userei. Lo stesso vale per la distribuzione di un contratto di verifica on-chain.

### Creazione delle chiavi di verificatore e provatore {#key-creation}

[La creazione delle chiavi](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) è un altro calcolo puro che non deve essere fatto più di una volta per una data dimensione del campo minato. Anche in questo caso, viene fatto una sola volta per semplicità.

Inoltre, potremmo usare [una cerimonia di configurazione](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony). Il vantaggio di una cerimonia di configurazione è che è necessaria l'entropia o qualche risultato intermedio di ogni partecipante per barare sulla prova a conoscenza-zero. Se almeno un partecipante alla cerimonia è onesto e cancella tali informazioni, le prove a conoscenza-zero sono al sicuro da certi attacchi. Tuttavia, non esiste _nessun meccanismo_ per verificare che le informazioni siano state eliminate da ogni parte. Se le prove a conoscenza-zero sono di fondamentale importanza, è consigliabile partecipare alla cerimonia di configurazione.

Qui ci affidiamo a [perpetual powers of tau](https://github.com/privacy-scaling-explorations/perpetualpowersoftau), che ha avuto dozzine di partecipanti. È probabilmente abbastanza sicuro e molto più semplice. Inoltre, non aggiungiamo entropia durante la creazione delle chiavi, il che rende più facile per gli utenti [verificare la configurazione a conoscenza-zero](#user-verify-zero-trust).

### Dove verificare {#where-verification}

Possiamo verificare le prove a conoscenza-zero on-chain (il che costa gas) o nel client (usando [`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof)). Ho scelto la prima, perché permette di [verificare il verificatore](#user-verify-zero-trust) una volta e poi confidare che non cambi finché l'indirizzo del suo contratto rimane lo stesso. Se la verifica fosse fatta sul client, dovresti verificare il codice che ricevi ogni volta che scarichi il client.

Inoltre, sebbene questo gioco sia per un solo giocatore, molti giochi blockchain sono multiplayer. La verifica on-chain significa che verifichi la prova a conoscenza-zero una sola volta. Farlo nel client richiederebbe a ogni client di verificare in modo indipendente.

### Appiattire la mappa in TypeScript o Zokrates? {#where-flatten}

In generale, quando l'elaborazione può essere eseguita in TypeScript o Zokrates, è meglio farlo in TypeScript, che è molto più veloce e non richiede prove a conoscenza-zero. Questo è il motivo, ad esempio, per cui non forniamo a Zokrates l'hash per fargli verificare che sia corretto. L'hashing deve essere fatto all'interno di Zokrates, ma la corrispondenza tra l'hash restituito e l'hash on-chain può avvenire al di fuori di esso.

Tuttavia, [appiattiamo ancora la mappa in Zokrates](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20), mentre avremmo potuto farlo in TypeScript. La ragione è che le altre opzioni sono, a mio parere, peggiori.

- Fornire un array unidimensionale di booleani al codice Zokrates e utilizzare un'espressione come `x*(height+2)
  +y` per ottenere la mappa bidimensionale. Questo renderebbe [il codice](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) leggermente più complicato, quindi ho deciso che il guadagno di prestazioni non ne vale la pena per una guida.

- Invia a Zokrates sia l'array unidimensionale che l'array bidimensionale. Tuttavia, questa soluzione non ci porta alcun vantaggio. Il codice Zokrates dovrebbe verificare che l'array unidimensionale che gli viene fornito sia davvero la rappresentazione corretta dell'array bidimensionale. Quindi non ci sarebbe alcun guadagno di prestazioni.

- Appiattire l'array bidimensionale in Zokrates. Questa è l'opzione più semplice, quindi l'ho scelta.

### Dove memorizzare le mappe {#where-store-maps}

In questa applicazione [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) è semplicemente una variabile in memoria. Ciò significa che se il server muore e deve essere riavviato, tutte le informazioni che ha memorizzato vengono perse. Non solo i giocatori non possono continuare la loro partita, ma non possono nemmeno iniziarne una nuova perché il componente on-chain pensa che abbiano ancora una partita in corso.

Questo è chiaramente un cattivo design per un sistema di produzione, in cui queste informazioni verrebbero memorizzate in un database. L'unico motivo per cui ho usato una variabile qui è perché questo è un tutorial e la semplicità è la considerazione principale.

## Conclusione: in quali condizioni questa è la tecnica appropriata? {#conclusion}

Quindi, ora sai come scrivere un gioco con un server che memorizza uno stato segreto che non appartiene all'on-chain. Ma in quali casi dovresti farlo? Ci sono due considerazioni principali.

- _Gioco a lunga durata_: [Come accennato in precedenza](#why-zero-knowledge), in un gioco breve puoi semplicemente pubblicare lo stato una volta che il gioco è finito e far verificare tutto allora. Ma questa non è un'opzione quando il gioco richiede un tempo lungo o indefinito, e lo stato deve rimanere segreto.

- _Una certa centralizzazione è accettabile_: le prove a conoscenza-zero possono verificare l'integrità, che un'entità non stia falsificando i risultati. Ciò che non possono fare è garantire che l'entità sarà ancora disponibile e risponderà ai messaggi. In situazioni in cui anche la disponibilità deve essere decentralizzata, le prove a conoscenza-zero non sono una soluzione sufficiente e hai bisogno di un [calcolo multipartitico](https://en.wikipedia.org/wiki/Secure_multi-party_computation).

[Vedi qui per altri miei lavori](https://cryptodocguy.pro/).

### Riconoscimenti {#acknowledgements}

- Alvaro Alonso ha letto una bozza di questo articolo e ha chiarito alcune delle mie incomprensioni su Zokrates.

Eventuali errori rimanenti sono di mia responsabilità.
