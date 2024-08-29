---
title: Sicurezza
description: Considerazioni sulla sicurezza per sviluppatori Ethereum
lang: it
---

Gli Smart Contract Ethereum sono estremamente flessibili, in grado di contenere grandi quantità di token (spesso per importi superiori a 1 miliardo di USD) e di eseguire una logica immutabile basata su codice di Smart Contract distribuito precedentemente. Sebbene questa situazione abbia creato un ecosistema vibrante e creativo di Smart Contract affidabili e interconnessi, è anche l'ecosistema perfetto per attrarre malintenzionati che cercano di trarre profitto sfruttando le vulnerabilità degli Smart Contract e il comportamento imprevisto di Ethereum. Il codice degli Smart Contract _di solito_ non può essere modificato per correggere falle di sicurezza, le risorse rubate dagli Smart Contract sono irrecuperabili e anche estremamente difficili da tracciare. L'importo totale del valore rubato o perso a causa di problemi degli Smart Contract si aggira facilmente attorno al miliardo di dollari. Alcuni dei maggiori errori dovuti a errori di codifica degli Smart Contract includono:

- [Problema 1 relativo a multi-sig Parity: persi 30 milioni di dollari](https://www.coindesk.com/30-million-ether-reported-stolen-parity-wallet-breach)
- [Problema 2 relativo a multi-sig Parity: bloccati 300 milioni di dollari](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether)
- [The DAO hack, 3,6 milioni di ETH! Oltre un miliardo di dollari in base al prezzo attuale dell'ETH](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/)

## Prerequisiti {#prerequisites}

Parleremo della sicurezza degli Smart Contract quindi assicurati di avere familiarità con gli [Smart Contract](/developers/docs/smart-contracts/) prima di affrontare questo argomento.

## Come scrivere codice più sicuro per gli Smart Contract {#how-to-write-more-secure-smart-contract-code}

Prima di eseguire codice sulla rete principale, è importante prendere sufficienti precauzioni per proteggere le risorse di valore associate allo Smart Contract. In questo articolo parleremo di alcuni attacchi specifici, suggeriremo risorse per saperne di più su altri tipi di attacco e indicheremo alcuni strumenti di base e le best practice per garantire il funzionamento corretto e sicuro dei contratti.

## Gli audit non sono infallibili {#audits-are-not-a-silver-bullet}

Anni fa, gli strumenti per scrivere, compilare, testare e distribuire Smart Contract erano molto immaturi, e di conseguenza molti progetti includevano codice Solidity scritto a caso che veniva poi passato a un auditor che lo esaminava per garantire che funzionasse in modo sicuro e come previsto. Nel 2020, i processi di sviluppo e gli strumenti che supportano la scrittura di codice Solidity sono decisamente migliori; queste best practice non solo assicurano che un progetto sia più facile da gestire, ma sono una parte fondamentale della sicurezza del progetto. Un audit al termine della scrittura dello Smart Contract non è più sufficiente come unico strumento per garantire la sicurezza del progetto. La sicurezza inizia ancor prima di scrivere la prima riga di codice dello Smart Contract, **la sicurezza inizia da processi di progettazione e sviluppo adeguati**.

## Processo di sviluppo di Smart Contract {#smart-contract-development-process}

Requisiti minimi:

- Tutto il codice memorizzato in un sistema di controllo delle versioni, come git
- Tutte le modifiche al codice effettuate tramite richieste pull
- Tutte le richieste pull hanno almeno un revisore. _Se sei l'unico sviluppatore nel progetto, prendi in considerazione la possibilità di trovare un altro sviluppatore che lavori da solo per revisionarvi i progetti a vicenda_
- Un singolo comando compila, distribuisce ed esegue una serie di test sul codice utilizzando un ambiente di sviluppo per Ethereum
- Hai verificato il codice con strumenti di base di analisi del codice come Mythril e Slither, idealmente prima dell'unione di ogni richiesta pull, e confrontato le differenze nell'output
- Solidity non produce NESSUN avviso in fase di compilazione
- Il codice è ben documentato

C'è molto altro da dire sul processo di sviluppo, ma questo è un buon punto di partenza. Per ulteriori punti e spiegazioni dettagliate, vedi la [checklist per la qualità del processo stilata da DeFiSafety](https://docs.defisafety.com/audit-process-documentation/process-quality-audit-process). [DefiSafety](https://defisafety.com/) è un servizio pubblico non ufficiale che pubblica recensioni di varie dapp Ethereum pubbliche. Parte del sistema di valutazione di DeFiSafety indica in che misura il progetto aderisce a questa checklist della qualità del processo. Seguendo questi processi:

- Produrrai codice più sicuro, tramite test automatici riproducibili
- Gli auditor saranno in grado di rivedere il tuo progetto in modo più efficace
- Sarà più facile aggiungere nuovi sviluppatori
- Gli sviluppatori potranno iterare, testare e ottenere feedback velocemente sulle modifiche
- È meno probabile che il progetto subisca regressioni

## Attacchi e vulnerabilità {#attacks-and-vulnerabilities}

Una volta assicurato che il codice Solidity sia scritto utilizzando un processo di sviluppo efficiente, diamo un'occhiata ad alcune vulnerabilità comuni di Solidity, per capire cosa può andare storto.

### Codice rientrante {#re-entrancy}

Il codice rientrante è uno dei più comuni e più importanti problemi di sicurezza da valutare quando si sviluppano Smart Contract. Mentre l'EVM non può eseguire più contratti allo stesso tempo, un contratto che chiama un altro contratto interrompe l'esecuzione e lo stato di memoria del contratto chiamante fino a quando la chiamata restituisce un risultato, dopo di che l'esecuzione procede normalmente. Questo momento di pausa e riavvio può creare una vulnerabilità conosciuta come "re-entrancy" o codice rientrante.

Ecco una semplice versione di un contratto vulnerabile al codice rientrante:

```solidity
// QUESTO CONTRATTO CONTIENE VULNERABILITA' INTENZIONALI, NON COPIARE
contract Victim {
    mapping (address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
        balances[msg.sender] = 0;
    }
}
```

Per consentire a un utente di prelevare gli ETH precedentemente archiviati nel contratto, questa funzione

1. Legge il saldo dell'utente
2. Gli invia l'importo del saldo in ETH
3. Imposta il saldo a 0, in modo che non sia possibile prelevarlo nuovamente.

Se chiamato da un account standard (ad esempio un account MetaMask), questo codice funziona come previsto: msg.sender.call.value() invia semplicemente il saldo ETH. Però anche gli Smart Contract possono effettuare chiamate. Se quindi è un contratto maligno modificato a chiamare `withdraw()`, msg.sender.call.value() non invierà solo `amount` (l'importo) di ETH, ma chiamerà anche implicitamente il contratto per iniziare l'esecuzione del codice. Immagina che a chiamare sia questo contratto maligno:

```solidity
contract Attacker {
    function beginAttack() external payable {
        Victim(VICTIM_ADDRESS).deposit.value(1 ether)();
        Victim(VICTIM_ADDRESS).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(VICTIM_ADDRESS).withdraw();
        }
    }
}
```

Chiamando Attacker.beginAttack() si avvierà un ciclo del tipo:

```
0.) EOA di Attacker chiama Attacker.beginAttack() con 1 ETH
0.) Attacker.beginAttack() deposita 1 ETH in Victim

  1.) Attacker -> Victim.withdraw()
  1.) Victim legge balanceOf[msg.sender]
  1.) Victim invia ETH a Attacker (che esegue la funzione default)
    2.) Attacker -> Victim.withdraw()
    2.) Victim legge balanceOf[msg.sender]
  2.) Victim invia ETH a Attacker (che esegue la funzione default)
    3.) Attacker -> Victim.withdraw()
    3.) Victim legge balanceOf[msg.sender]
  3.) Victim invia ETH a Attacker (che esegue la funzione default)
    4.) Attacker non ha abbastanza carburante, restituisce il risultato senza chiamare di nuovo
      3.) balances[msg.sender] = 0;
    2.) balances[msg.sender] = 0; (era già 0)
  1.) balances[msg.sender] = 0; (era già 0)
```

Chiamando Attacker.beginAttack con 1 ETH si attacca Victim con codice rientrante, prelevando più ETH rispetto alla disponibilità (prendendoli dai saldi di altri utenti e rendendo il contratto Victim non collateralizzato)

### Come gestire il codice rientrante (in modo sbagliato) {#how-to-deal-with-re-entrancy-the-wrong-way}

Si potrebbe pensare di difendersi dal codice rientrante semplicemente impedendo a qualsiasi Smart Contract di interagire con il proprio codice. Se cerchi stackoverflow, trovi questo frammento di codice con tantissimi voti a favore:

```solidity
function isContract(address addr) internal returns (bool) {
  uint size;
  assembly { size := extcodesize(addr) }
  return size > 0;
}
```

Sembra avere senso: i contratti hanno codice, se il chiamante ha un codice, non si consente di depositare. Aggiungiamolo:

```solidity
// QUESTO CONTRATTO CONTIENE VULNERABILITA' INTENZIONALI, NON COPIARE
contract ContractCheckVictim {
    mapping (address => uint256) public balances;

    function isContract(address addr) internal returns (bool) {
        uint size;
        assembly { size := extcodesize(addr) }
        return size > 0;
    }

    function deposit() external payable {
        require(!isContract(msg.sender)); // <- NUOVA LINEA
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
        balances[msg.sender] = 0;
    }
}
```

Per depositare ETH, non bisogna avere codice di Smart Contract al proprio indirizzo. A questo però si può facilmente ovviare con il seguente contratto di Attacker:

```solidity
contract ContractCheckAttacker {
    constructor() public payable {
        ContractCheckVictim(VICTIM_ADDRESS).deposit(1 ether); // <- Nuova linea
    }

    function beginAttack() external payable {
        ContractCheckVictim(VICTIM_ADDRESS).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(VICTIM_ADDRESS).withdraw();
        }
   }
}
```

Mentre il primo attacco era un attacco alla logica del contratto, questo è un attacco al comportamento di distribuzione dei contratti Ethereum. Durante la costruzione, un contratto non ha ancora restituito il suo codice da distribuire al proprio indirizzo, ma mantiene il pieno controllo dell'EVM DURANTE questo processo.

È tecnicamente possibile impedire che gli Smart Contract chiamino il proprio codice utilizzando questa riga:

```solidity
require(tx.origin == msg.sender)
```

Anche questa però non è ancora una buona soluzione. Uno degli aspetti più entusiasmanti di Ethereum è la sua componibilità: gli Smart Contract si integrano e si costruiscono l'uno sull'altro. Utilizzando la riga sopra, limiti l'utilità del progetto.

### Come gestire il codice rientrante (in modo corretto) {#how-to-deal-with-re-entrancy-the-right-way}

Semplicemente cambiando l'ordine dell'aggiornamento dello storage e della chiamata esterna si impedisce la condizione di codice rientrante che ha reso possibile l'attacco. Una nuova chiamata a withdraw, sempre se possibile, non andrà a beneficio dell'attaccante, dal momento che lo storage di `balances` (il saldo) sarà già impostato a 0.

```solidity
contract NoLongerAVictim {
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
    }
}
```

Il codice qui sopra segue il modello di progettazione "controlli-effetti-interazioni", che aiuta a proteggere dal codice rientrante. Puoi approfondire [controli-effetti-interazioni qui](https://fravoll.github.io/solidity-patterns/checks_effects_interactions.html)

### Come gestire il codice rientrante (opzione a prova di bomba) {#how-to-deal-with-re-entrancy-the-nuclear-option}

Ogni volta che invii ETH a un indirizzo non attendibile o interagisci con un contratto sconosciuto (chiamando `transfer()` di un indirizzo token fornito dall'utente), ti apri alla possibilità di codice rientrante. **Progettando contratti che non inviano ETH e non chiamano contratti non affidabili, si preclude ogni possibilità di codice rientrante!**

## Altri tipi di attacco {#more-attack-types}

I tipi di attacco illustrati sopra coprono i problemi del codice di Smart Contract (codice rientrante) e alcune stranezze di Ethereum (codice in esecuzione all'interno di costruttori di contratto, prima che il codice sia disponibile all'indirizzo del contratto). Ci sono moltissimi altri tipi di attacco da evitare, ad esempio:

- Front-running
- Rifiuto di invio di ETH
- Overflow/underflow di numeri interi

Letture consigliate:

- [Consensys Smart Contract Known Attacks](https://consensys.github.io/smart-contract-best-practices/attacks/) - Una spiegazione molto leggibile delle vulnerabilità più significative, molte con codice di esempio.
- [SWC Registry](https://swcregistry.io/docs/SWC-128) - Elenco curato di CWE che si applicano a Ethereum e Smart Contract

## Strumenti per la sicurezza {#security-tools}

Niente può sostituire la conoscenza dei principi di base della sicurezza di Ethereum e l'utilizzo di una società di auditing professionale che riveda il codice, però sono disponibili molti strumenti che aiutano a evidenziare potenziali problemi nel codice.

### Sicurezza degli Smart Contract {#smart-contract-security}

**Slither -** **_Framework di analisi statica per Solidity scritto in Python 3_**

- [GitHub](https://github.com/crytic/slither)

**MythX -** **_API per l'analisi della sicurezza degli Smart Contract Ethereum_**

- [mythx.io](https://mythx.io/)
- [Documentazione](https://docs.mythx.io/en/latest/)

**Mythril -** **_Strumento di analisi della sicurezza per bytecode dell'EVM._**

- [mythril](https://github.com/ConsenSys/mythril)
- [Documentazione](https://mythril-classic.readthedocs.io/en/master/about.html)

**Manticore -** **_Interfaccia da riga di comando che usa uno strumento di esecuzione simbolica su Smart Contract e file binari_**

- [GitHub](https://github.com/trailofbits/manticore)
- [Documentazione](https://github.com/trailofbits/manticore/wiki)

**Securify -** **_Scanner di sicurezza per Smart Contract Ethereum_**

- [securify.chainsecurity.com](https://securify.chainsecurity.com/)
- [Discord](https://discordapp.com/invite/nN77ckb)

**ERC20 Verifier -** **_Strumento di verifica utilizzato per controllare se un contratto rispetta lo standard ERC20_**

- [erc20-verifier.openzeppelin.com](https://erc20-verifier.openzeppelin.com)
- [Forum](https://forum.openzeppelin.com/t/online-erc20-contract-verifier/1575)

### Verifica formale {#formal-verification}

**Informazioni sulla verifica formale**

- [How formal verification of smart-contacts works](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/) _20 luglio 2018 - Brian Marick_
- [How Formal Verification Can Ensure Flawless Smart Contract](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1) _29 gennaio 2018 - Bernard Mueller_

### Usare gli strumenti {#using-tools}

Due degli strumenti più popolari per l'analisi della sicurezza degli Smart Contract sono:

- [Slither](https://github.com/crytic/slither) di [Trail of Bits](https://www.trailofbits.com/) (versione hosted: [Crytic](https://crytic.io/))
- [Mythril](https://github.com/ConsenSys/mythril) di [ConsenSys](https://consensys.net/) (versione hosted: [MythX](https://mythx.io/))

Entrambi sono strumenti utili che analizzano il codice e segnalano problemi. Ognuno ha una versione hosted commerciale, ma sono disponibili anche gratuitamente da eseguire localmente. Il seguente è un rapido esempio di come eseguire Slither, che viene reso disponibile in una comoda immagine Docker `trailofbits/eth-security-toolbox`. Dovrai [installare Docker se non lo hai già installato](https://docs.docker.com/get-docker/).

```bash
$ mkdir test-slither
$ curl https://gist.githubusercontent.com/epheph/460e6ff4f02c4ac582794a41e1f103bf/raw/9e761af793d4414c39370f063a46a3f71686b579/gistfile1.txt > bad-contract.sol
$ docker run -v `pwd`:/share  -it --rm trailofbits/eth-security-toolbox
docker$ cd /share
docker$ solc-select 0.5.11
docker$ slither bad-contract.sol
```

Genererà questo output:

```bash
ethsec@1435b241ca60:/share$ slither bad-contract.sol
INFO:Detectors:
Reentrancy in Victim.withdraw() (bad-contract.sol#11-16):
    External calls:
    - (success) = msg.sender.call.value(amount)() (bad-contract.sol#13)
    State variables written after the call(s):
    - balances[msg.sender] = 0 (bad-contract.sol#15)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities
INFO:Detectors:
Low level call in Victim.withdraw() (bad-contract.sol#11-16):
    - (success) = msg.sender.call.value(amount)() (bad-contract.sol#13)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#low-level-calls
INFO:Slither:bad-contract.sol analyzed (1 contracts with 46 detectors), 2 result(s) found
INFO:Slither:Use https://crytic.io/ to get access to additional detectors and GitHub integration
```

Qui Slither ha identificato una potenzialità di codice rientrante, individuando le righe principali su cui potrebbe verificarsi il problema e ci fornisce un link per avere maggiori dettagli:

> Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities

In questo modo, si conoscono rapidamente i potenziali problemi del codice. Come tutti gli strumenti di test automatici, Slither non è perfetto, e a volte segnala troppo. Può mettere in guardia da un potenziale codice rientrante anche quando non è presente alcuna vulnerabilità sfruttabile. Spesso, rivedere le DIFFERENZE nell'output di Slither tra le modifiche al codice è estremamente illuminante e aiuta a scoprire le vulnerabilità che sono state introdotte molto prima che il codice del progetto sia completo.

## Letture consigliate {#further-reading}

**Guida alle best practice per la sicurezza degli Smart Contract**

- [consensys.github.io/smart-contract-best-practices/](https://consensys.github.io/smart-contract-best-practices/)
- [GitHub](https://github.com/ConsenSys/smart-contract-best-practices/)
- [Raccolta di raccomandazioni di sicurezza e best practice](https://github.com/guylando/KnowledgeLists/blob/master/EthereumSmartContracts.md)

**Standard di verifica della sicurezza degli Smart Contract (SCSVS)**

- [securing.github.io/SCSVS/](https://securing.github.io/SCSVS/)

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_

## Tutorial correlati {#related-tutorials}

- [Secure development workflow](/developers/tutorials/secure-development-workflow/)
- [How to use Slither to find smart contract bugs](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [How to use Manticore to find smart contract bugs](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Security guidelines](/developers/tutorials/smart-contract-security-guidelines/)
- [Token security](/developers/tutorials/token-integration-checklist/)
