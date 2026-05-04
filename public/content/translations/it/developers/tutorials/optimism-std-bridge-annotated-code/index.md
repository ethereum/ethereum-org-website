---
title: "Panoramica del contratto del ponte standard di Optimism"
description: "Come funziona il ponte standard per Optimism? Perché funziona in questo modo?"
author: Ori Pomerantz
tags: ["Solidity", "ponte", "livello 2"]
skill: intermediate
breadcrumb: Ponte di Optimism
published: 2022-03-30
lang: it
---

[Optimism](https://www.optimism.io/) è un [rollup ottimistico](/developers/docs/scaling/optimistic-rollups/).
I rollup ottimistici possono elaborare le transazioni a un prezzo molto inferiore rispetto alla rete principale di Ethereum (nota anche come livello 1 o L1) perché le transazioni vengono elaborate solo da pochi nodi, invece che da ogni nodo della rete.
Allo stesso tempo, i dati vengono tutti scritti su L1, in modo che tutto possa essere provato e ricostruito con tutte le garanzie di integrità e disponibilità della rete principale.

Per utilizzare gli asset di L1 su Optimism (o su qualsiasi altro L2), gli asset devono essere trasferiti tramite un [ponte](/bridges/#prerequisites).
Un modo per ottenere questo risultato è che gli utenti blocchino gli asset (ETH e i [token ERC-20](/developers/docs/standards/tokens/erc-20/) sono i più comuni) su L1 e ricevano asset equivalenti da utilizzare su L2.
Alla fine, chiunque ne entri in possesso potrebbe volerli riportare su L1 tramite il ponte.
Quando si fa questo, gli asset vengono bruciati su L2 e poi rilasciati nuovamente all'utente su L1.

Questo è il modo in cui funziona il [ponte standard di Optimism](https://docs.optimism.io/app-developers/bridging/standard-bridge).
In questo articolo esaminiamo il codice sorgente di quel ponte per vedere come funziona e studiarlo come esempio di codice Solidity ben scritto.

## Flussi di controllo {#control-flows}

Il ponte ha due flussi principali:

- Deposito (da L1 a L2)
- Prelievo (da L2 a L1)

### Flusso di deposito {#deposit-flow}

#### Livello 1 {#deposit-flow-layer-1}

1. Se si deposita un ERC-20, il depositante concede al ponte un'indennità (allowance) per spendere l'importo depositato
2. Il depositante chiama il ponte di L1 (`depositERC20`, `depositERC20To`, `depositETH` o `depositETHTo`)
3. Il ponte di L1 prende possesso dell'asset trasferito
   - ETH: L'asset viene trasferito dal depositante come parte della chiamata
   - ERC-20: L'asset viene trasferito dal ponte a se stesso utilizzando l'indennità fornita dal depositante
4. Il ponte di L1 utilizza il meccanismo di messaggistica tra domini per chiamare `finalizeDeposit` sul ponte di L2

#### Livello 2 {#deposit-flow-layer-2}

5. Il ponte di L2 verifica che la chiamata a `finalizeDeposit` sia legittima:
   - Proviene dal contratto di messaggistica tra domini
   - Proviene originariamente dal ponte su L1
6. Il ponte di L2 controlla se il contratto del token ERC-20 su L2 è quello corretto:
   - Il contratto di L2 segnala che la sua controparte di L1 è la stessa da cui provengono i token su L1
   - Il contratto di L2 segnala che supporta l'interfaccia corretta ([utilizzando ERC-165](https://eips.ethereum.org/EIPS/eip-165)).
7. Se il contratto di L2 è quello corretto, lo chiama per coniare il numero appropriato di token all'indirizzo appropriato. In caso contrario, avvia un processo di prelievo per consentire all'utente di reclamare i token su L1.

### Flusso di prelievo {#withdrawal-flow}

#### Livello 2 {#withdrawal-flow-layer-2}

1. Chi preleva chiama il ponte di L2 (`withdraw` o `withdrawTo`)
2. Il ponte di L2 brucia il numero appropriato di token appartenenti a `msg.sender`
3. Il ponte di L2 utilizza il meccanismo di messaggistica tra domini per chiamare `finalizeETHWithdrawal` o `finalizeERC20Withdrawal` sul ponte di L1

#### Livello 1 {#withdrawal-flow-layer-1}

4. Il ponte di L1 verifica che la chiamata a `finalizeETHWithdrawal` o `finalizeERC20Withdrawal` sia legittima:
   - Proviene dal meccanismo di messaggistica tra domini
   - Proviene originariamente dal ponte su L2
5. Il ponte di L1 trasferisce l'asset appropriato (ETH o ERC-20) all'indirizzo appropriato

## Codice di Livello 1 {#layer-1-code}

Questo è il codice che viene eseguito su L1, la rete principale di Ethereum.

### IL1ERC20Bridge {#IL1ERC20Bridge}

[Questa interfaccia è definita qui](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
Include funzioni e definizioni necessarie per trasferire tramite ponte i token ERC-20.

```solidity
// SPDX-License-Identifier: MIT
```

[La maggior parte del codice di Optimism è rilasciata sotto licenza MIT](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

Al momento della stesura, l'ultima versione di Solidity è la 0.8.12.
Fino al rilascio della versione 0.9.0, non sappiamo se questo codice sarà compatibile o meno.

```solidity
/* *
 * @title IL1ERC20Bridge */



interface IL1ERC20Bridge {
    /* *********
     * Eventi *
     ********* */
    



    event ERC20DepositInitiated(
```

Nella terminologia del ponte di Optimism, _deposito_ significa trasferimento da L1 a L2, e _prelievo_ significa un trasferimento da L2 a L1.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

Nella maggior parte dei casi l'indirizzo di un ERC-20 su L1 non è lo stesso dell'indirizzo dell'ERC-20 equivalente su L2.
[Puoi vedere l'elenco degli indirizzi dei token qui](https://static.optimism.io/optimism.tokenlist.json).
L'indirizzo con `chainId` 1 è su L1 (rete principale) e l'indirizzo con `chainId` 10 è su L2 (Optimism).
Gli altri due valori di `chainId` sono per la rete di test Kovan (42) e la rete di test Optimistic Kovan (69).

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

È possibile aggiungere note ai trasferimenti, nel qual caso vengono aggiunte agli eventi che li segnalano.

```solidity
    event ERC20WithdrawalFinalized(
        address indexed _l1Token,
        address indexed _l2Token,
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

Lo stesso contratto del ponte gestisce i trasferimenti in entrambe le direzioni.
Nel caso del ponte di L1, questo significa l'inizializzazione dei depositi e la finalizzazione dei prelievi.

```solidity

    /* *******************
     * Funzioni Pubbliche *
     ******************* */
    



    /* *
     * @dev ottiene l'indirizzo del contratto ponte L2 corrispondente.
     * @return Indirizzo del contratto ponte L2 corrispondente. */
    



    function l2TokenBridge() external returns (address);
```

Questa funzione non è realmente necessaria, perché su L2 è un contratto pre-distribuito, quindi si trova sempre all'indirizzo `0x4200000000000000000000000000000000000010`.
È qui per simmetria con il ponte di L2, perché l'indirizzo del ponte di L1 _non_ è banale da conoscere.

```solidity
    /* *
     * @dev deposita un importo di ERC20 sul saldo del chiamante su L2.
     * @param _l1Token Indirizzo dell'ERC20 L1 che stiamo depositando
     * @param _l2Token Indirizzo del rispettivo ERC20 L2 di L1
     * @param _amount Importo di ERC20 da depositare
     * @param _l2Gas Limite del gas richiesto per completare il deposito su L2.
     * @param _data Dati opzionali da inoltrare a L2. Questi dati sono forniti
     *        esclusivamente per comodità dei contratti esterni. A parte l'imposizione di una
     *        lunghezza massima, questi contratti non forniscono alcuna garanzia sul loro contenuto. */
    









    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

Il parametro `_l2Gas` è la quantità di gas di L2 che la transazione è autorizzata a spendere.
[Fino a un certo limite (elevato), questo è gratuito](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), quindi a meno che il contratto ERC-20 non faccia qualcosa di veramente strano durante il conio, non dovrebbe essere un problema.
Questa funzione si occupa dello scenario comune, in cui un utente trasferisce tramite ponte gli asset allo stesso indirizzo su una blockchain diversa.

```solidity
    /* *
     * @dev deposita un importo di ERC20 sul saldo di un destinatario su L2.
     * @param _l1Token Indirizzo dell'ERC20 L1 che stiamo depositando
     * @param _l2Token Indirizzo del rispettivo ERC20 L2 di L1
     * @param _to Indirizzo L2 a cui accreditare il prelievo.
     * @param _amount Importo di ERC20 da depositare.
     * @param _l2Gas Limite del gas richiesto per completare il deposito su L2.
     * @param _data Dati opzionali da inoltrare a L2. Questi dati sono forniti
     *        esclusivamente per comodità dei contratti esterni. A parte l'imposizione di una
     *        lunghezza massima, questi contratti non forniscono alcuna garanzia sul loro contenuto. */
    










    function depositERC20To(
        address _l1Token,
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

Questa funzione è quasi identica a `depositERC20`, ma ti consente di inviare l'ERC-20 a un indirizzo diverso.

```solidity
    /* ************************
     * Funzioni Cross-chain *
     ************************ */
    



    /* *
     * @dev Completa un prelievo da L2 a L1 e accredita i fondi sul saldo del destinatario del
     * token ERC20 L1.
     * Questa chiamata fallirà se il prelievo inizializzato da L2 non è stato finalizzato.
     *
     * @param _l1Token Indirizzo del token L1 per cui eseguire finalizeWithdrawal.
     * @param _l2Token Indirizzo del token L2 in cui è stato avviato il prelievo.
     * @param _from Indirizzo L2 che avvia il trasferimento.
     * @param _to Indirizzo L1 a cui accreditare il prelievo.
     * @param _amount Importo di ERC20 da depositare.
     * @param _data Dati forniti dal mittente su L2. Questi dati sono forniti
     *   esclusivamente per comodità dei contratti esterni. A parte l'imposizione di una
     *   lunghezza massima, questi contratti non forniscono alcuna garanzia sul loro contenuto. */
    













    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

I prelievi (e altri messaggi da L2 a L1) in Optimism sono un processo in due fasi:

1. Una transazione di avvio su L2.
2. Una transazione di finalizzazione o reclamo su L1.
   Questa transazione deve avvenire dopo la fine del [periodo di contestazione dei guasti](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) per la transazione di L2.

### IL1StandardBridge {#il1standardbridge}

[Questa interfaccia è definita qui](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
Questo file contiene le definizioni di eventi e funzioni per gli ETH.
Queste definizioni sono molto simili a quelle definite in `IL1ERC20Bridge` sopra per gli ERC-20.

L'interfaccia del ponte è divisa in due file perché alcuni token ERC-20 richiedono un'elaborazione personalizzata e non possono essere gestiti dal ponte standard.
In questo modo il ponte personalizzato che gestisce tale token può implementare `IL1ERC20Bridge` e non dover trasferire anche gli ETH.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/* *
 * @title IL1StandardBridge */



interface IL1StandardBridge is IL1ERC20Bridge {
    /* *********
     * Eventi *
     ********* */
    


    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

Questo evento è quasi identico alla versione ERC-20 (`ERC20DepositInitiated`), tranne per l'assenza degli indirizzi dei token di L1 e L2.
Lo stesso vale per gli altri eventi e le funzioni.

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /* *******************
     * Funzioni Pubbliche *
     ******************* */
    



    /* *
     * @dev Deposita un importo di ETH sul saldo del chiamante su L2.
            .
            .
            . */
    





    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /* *
     * @dev Deposita un importo di ETH sul saldo di un destinatario su L2.
            .
            .
            . */
    





    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable;

    /* ************************
     * Funzioni Cross-chain *
     ************************ */
    



    /* *
     * @dev Completa un prelievo da L2 a L1 e accredita i fondi sul saldo del destinatario del
     * token ETH L1. Poiché solo xDomainMessenger può chiamare questa funzione, non verrà mai chiamata
     * prima che il prelievo sia finalizzato.
                .
                .
                . */
    







    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

### CrossDomainEnabled {#crossdomainenabled}

[Questo contratto](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) viene ereditato da entrambi i ponti ([L1](#the-l1-bridge-contract) e [L2](#the-l2-bridge-contract)) per inviare messaggi all'altro livello.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Importazioni di Interfacce */
/* Interface Imports */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[Questa interfaccia](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) indica al contratto come inviare messaggi all'altro livello, utilizzando il messaggero tra domini.
Questo messaggero tra domini è un sistema completamente diverso e merita un articolo a sé, che spero di scrivere in futuro.

```solidity
/* *
 * @title CrossDomainEnabled
 * @dev Contratto di supporto per i contratti che eseguono comunicazioni cross-domain
 *
 * Compilatore utilizzato: definito dal contratto che eredita */






contract CrossDomainEnabled {
    /* ************
     * Variabili *
     ************ */
    



    // Contratto Messenger utilizzato per inviare e ricevere messaggi dall'altro dominio.
    address public messenger;

    /* **************
     * Costruttore *
     ************** */
    



    /* *
     * @param _messenger Indirizzo del CrossDomainMessenger sul livello corrente. */
    


    constructor(address _messenger) {
        messenger = _messenger;
    }
```

L'unico parametro che il contratto deve conoscere è l'indirizzo del messaggero tra domini su questo livello.
Questo parametro viene impostato una volta, nel costruttore, e non cambia mai.

```solidity

    /* *********************
     * Modificatori di Funzione *
     ********************* */
    



    /* *
     * Impone che la funzione modificata sia chiamabile solo da uno specifico account cross-domain.
     * @param _sourceDomainAccount L'unico account sul dominio di origine che è
     *  autenticato per chiamare questa funzione. */
    




    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

La messaggistica tra domini è accessibile da qualsiasi contratto sulla blockchain in cui è in esecuzione (sia la rete principale di Ethereum che Optimism).
Ma abbiamo bisogno che il ponte su ciascun lato si fidi _solo_ di determinati messaggi se provengono dal ponte sull'altro lato.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

Ci si può fidare solo dei messaggi provenienti dal messaggero tra domini appropriato (`messenger`, come vedi di seguito).

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

Il modo in cui il messaggero tra domini fornisce l'indirizzo che ha inviato un messaggio con l'altro livello è [la funzione `.xDomainMessageSender()`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128).
Finché viene chiamata nella transazione avviata dal messaggio, può fornire queste informazioni.

Dobbiamo assicurarci che il messaggio ricevuto provenga dall'altro ponte.

```solidity

        _;
    }

    /* *********************
     * Funzioni Interne *
     ********************* */
    



    /* *
     * Ottiene il messenger, di solito dallo storage. Questa funzione è esposta nel caso in cui un contratto figlio
     * debba sovrascriverla.
     * @return L'indirizzo del contratto messenger cross-domain che dovrebbe essere utilizzato. */
    




    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

Questa funzione restituisce il messaggero tra domini.
Utilizziamo una funzione anziché la variabile `messenger` per consentire ai contratti che ereditano da questo di utilizzare un algoritmo per specificare quale messaggero tra domini utilizzare.

```solidity

    /* *
     * Invia un messaggio a un account su un altro dominio
     * @param _crossDomainTarget Il destinatario previsto sul dominio di destinazione
     * @param _message I dati da inviare al target (di solito calldata per una funzione con
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit Il limite del gas per la ricezione del messaggio sul dominio di destinazione. */
    






    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

Infine, la funzione che invia un messaggio all'altro livello.

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither) è un analizzatore statico che Optimism esegue su ogni contratto per cercare vulnerabilità e altri potenziali problemi.
In questo caso, la riga seguente innesca due vulnerabilità:

1. [Eventi di rientranza](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [Rientranza benigna](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

In questo caso non ci preoccupiamo della rientranza, sappiamo che `getCrossDomainMessenger()` restituisce un indirizzo affidabile, anche se Slither non ha modo di saperlo.

### Il contratto del ponte di L1 {#the-l1-bridge-contract}

[Il codice sorgente per questo contratto è qui](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

Le interfacce possono far parte di altri contratti, quindi devono supportare un'ampia gamma di versioni di Solidity.
Ma il ponte stesso è il nostro contratto e possiamo essere rigorosi su quale versione di Solidity utilizza.

```solidity
/* Importazioni di Interfacce */
/* Interface Imports */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) e [IL1StandardBridge](#IL1StandardBridge) sono spiegati sopra.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[Questa interfaccia](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) ci consente di creare messaggi per controllare il ponte standard su L2.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Questa interfaccia](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) ci consente di controllare i contratti ERC-20.
[Puoi leggere di più a riguardo qui](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Importazioni di Librerie */
/* Library Imports */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[Come spiegato sopra](#crossdomainenabled), questo contratto viene utilizzato per la messaggistica tra livelli.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) contiene gli indirizzi per i contratti di L2 che hanno sempre lo stesso indirizzo. Questo include il ponte standard su L2.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[Le utilità Address di OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). Vengono utilizzate per distinguere tra gli indirizzi dei contratti e quelli appartenenti agli account controllati esternamente (EOA).

Nota che questa non è una soluzione perfetta, perché non c'è modo di distinguere tra chiamate dirette e chiamate effettuate dal costruttore di un contratto, ma almeno questo ci consente di identificare e prevenire alcuni errori comuni degli utenti.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[Lo standard ERC-20](https://eips.ethereum.org/EIPS/eip-20) supporta due modi per un contratto di segnalare un fallimento:

1. Revert (Annullamento)
2. Restituire `false`

Gestire entrambi i casi renderebbe il nostro codice più complicato, quindi utilizziamo invece [`SafeERC20` di OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol), che si assicura che [tutti i fallimenti si traducano in un annullamento](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96).

```solidity
/* *
 * @title L1StandardBridge
 * @dev Il ponte L1 ETH e ERC20 è un contratto che memorizza i fondi L1 depositati e i token
 * standard che sono in uso su L2. Sincronizza un ponte L2 corrispondente, informandolo dei depositi
 * e ascoltandolo per i prelievi appena finalizzati.
 * */







contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

Questa riga è il modo in cui specifichiamo di utilizzare il wrapper `SafeERC20` ogni volta che utilizziamo l'interfaccia `IERC20`.

```solidity

    /* *******************************
     * Riferimenti a Contratti Esterni *
     ******************************* */
    



    address public l2TokenBridge;
```

L'indirizzo di [L2StandardBridge](#the-l2-bridge-contract).

```solidity

    // Mappa il token L1 al token L2 al saldo del token L1 depositato
    mapping(address => mapping(address => uint256)) public deposits;
```

Una doppia [mappatura](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) come questa è il modo in cui si definisce un [array sparso bidimensionale](https://en.wikipedia.org/wiki/Sparse_matrix).
I valori in questa struttura dati sono identificati come `deposit[L1 token addr][L2 token addr]`.
Il valore predefinito è zero.
Solo le celle impostate su un valore diverso vengono scritte nell'archiviazione.

```solidity

    /* **************
     * Costruttore *
     ************** */
    



    // Questo contratto vive dietro un proxy, quindi i parametri del costruttore rimarranno inutilizzati.
    constructor() CrossDomainEnabled(address(0)) {}
```

Vogliamo poter aggiornare questo contratto senza dover copiare tutte le variabili nell'archiviazione.
Per farlo utilizziamo un [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy), un contratto che utilizza [`delegatecall`](https://solidity-by-example.org/delegatecall/) per trasferire le chiamate a un contratto separato il cui indirizzo è memorizzato dal contratto proxy (quando si esegue l'aggiornamento si dice al proxy di cambiare quell'indirizzo).
Quando si utilizza `delegatecall` l'archiviazione rimane quella del contratto _chiamante_, quindi i valori di tutte le variabili di stato del contratto non vengono influenzati.

Un effetto di questo modello è che l'archiviazione del contratto che è il _chiamato_ di `delegatecall` non viene utilizzata e pertanto i valori del costruttore passati ad esso non hanno importanza.
Questo è il motivo per cui possiamo fornire un valore senza senso al costruttore `CrossDomainEnabled`.
È anche il motivo per cui l'inizializzazione di seguito è separata dal costruttore.

```solidity
    /* *****************
     * Inizializzazione *
     ***************** */
    



    /* *
     * @param _l1messenger Indirizzo del Messenger L1 utilizzato per le comunicazioni cross-chain.
     * @param _l2TokenBridge Indirizzo del ponte standard L2. */
    



    // slither-disable-next-line external-function
```

Questo [test di Slither](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) identifica le funzioni che non vengono chiamate dal codice del contratto e potrebbero quindi essere dichiarate `external` invece di `public`.
Il costo del gas delle funzioni `external` può essere inferiore, perché possono essere fornite con parametri nei calldata.
Le funzioni dichiarate `public` devono essere accessibili dall'interno del contratto.
I contratti non possono modificare i propri calldata, quindi i parametri devono essere in memoria.
Quando una tale funzione viene chiamata esternamente, è necessario copiare i calldata in memoria, il che costa gas.
In questo caso la funzione viene chiamata solo una volta, quindi l'inefficienza non ci importa.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

La funzione `initialize` dovrebbe essere chiamata solo una volta.
Se l'indirizzo del messaggero tra domini di L1 o del ponte dei token di L2 cambia, creiamo un nuovo proxy e un nuovo ponte che lo chiama.
È improbabile che ciò accada, tranne quando l'intero sistema viene aggiornato, un evento molto raro.

Nota che questa funzione non ha alcun meccanismo che limiti _chi_ può chiamarla.
Ciò significa che in teoria un utente malintenzionato potrebbe aspettare fino a quando non distribuiamo il proxy e la prima versione del ponte e poi eseguire un [front-running](https://solidity-by-example.org/hacks/front-running/) per arrivare alla funzione `initialize` prima dell'utente legittimo. Ma ci sono due metodi per impedirlo:

1. Se i contratti non vengono distribuiti direttamente da un EOA ma [in una transazione in cui un altro contratto li crea](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595), l'intero processo può essere atomico e terminare prima che venga eseguita qualsiasi altra transazione.
2. Se la chiamata legittima a `initialize` fallisce, è sempre possibile ignorare il proxy e il ponte appena creati e crearne di nuovi.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

Questi sono i due parametri che il ponte deve conoscere.

```solidity

    /* *************
     * Deposito *
     ************* */
    



    /* * @dev Modificatore che richiede che il mittente sia un EOA. Questo controllo potrebbe essere aggirato da un contratto
     *  malevolo tramite initcode, ma si occupa dell'errore dell'utente che vogliamo evitare. */
    


    modifier onlyEOA() {
        // Utilizzato per fermare i depositi dai contratti (evitare token persi accidentalmente)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

Questo è il motivo per cui avevamo bisogno delle utilità `Address` di OpenZeppelin.

```solidity
    /* *
     * @dev Questa funzione può essere chiamata senza dati
     * per depositare un importo di ETH sul saldo del chiamante su L2.
     * Poiché la funzione receive non accetta dati, un importo
     * predefinito conservativo viene inoltrato a L2. */
    





    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

Questa funzione esiste a scopo di test.
Nota che non appare nelle definizioni dell'interfaccia: non è per un uso normale.

```solidity
    /* *
     * @inheritdoc IL1StandardBridge */
    


    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, _l2Gas, _data);
    }

    /* *
     * @inheritdoc IL1StandardBridge */
    


    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable {
        _initiateETHDeposit(msg.sender, _to, _l2Gas, _data);
    }
```

Queste due funzioni sono wrapper attorno a `_initiateETHDeposit`, la funzione che gestisce l'effettivo deposito di ETH.

```solidity
    /* *
     * @dev Esegue la logica per i depositi memorizzando gli ETH e informando il Gateway ETH L2 del
     * deposito.
     * @param _from Account da cui prelevare il deposito su L1.
     * @param _to Account a cui dare il deposito su L2.
     * @param _l2Gas Limite del gas richiesto per completare il deposito su L2.
     * @param _data Dati opzionali da inoltrare a L2. Questi dati sono forniti
     *        esclusivamente per comodità dei contratti esterni. A parte l'imposizione di una
     *        lunghezza massima, questi contratti non forniscono alcuna garanzia sul loro contenuto. */
    









    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // Costruisce i calldata per la chiamata finalizeDeposit
        bytes memory message = abi.encodeWithSelector(
```

Il modo in cui funzionano i messaggi tra domini è che il contratto di destinazione viene chiamato con il messaggio come suoi calldata.
I contratti Solidity interpretano sempre i propri calldata in conformità con [le specifiche ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html).
La funzione Solidity [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) crea quei calldata.

```solidity
            IL2ERC20Bridge.finalizeDeposit.selector,
            address(0),
            Lib_PredeployAddresses.OVM_ETH,
            _from,
            _to,
            msg.value,
            _data
        );
```

Il messaggio qui è di chiamare [la funzione `finalizeDeposit`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) con questi parametri:

| Parametro | Valore                         | Significato                                                                                                                                                  |
| --------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| \_l1Token | address(0)                     | Valore speciale per rappresentare gli ETH (che non sono un token ERC-20) su L1                                                                               |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | Il contratto di L2 che gestisce gli ETH su Optimism, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (questo contratto è solo per uso interno di Optimism)      |
| \_from    | \_from                         | L'indirizzo su L1 che invia gli ETH                                                                                                                          |
| \_to      | \_to                           | L'indirizzo su L2 che riceve gli ETH                                                                                                                         |
| amount    | msg.value                      | Quantità di wei inviati (che sono già stati inviati al ponte)                                                                                                |
| \_data    | \_data                         | Dati aggiuntivi da allegare al deposito                                                                                                                      |

```solidity
        // Invia i calldata in L2
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

Invia il messaggio tramite il messaggero tra domini.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

Emette un evento per informare qualsiasi applicazione decentralizzata in ascolto di questo trasferimento.

```solidity
    /* *
     * @inheritdoc IL1ERC20Bridge */
    


    function depositERC20(
		.
		.
		.
    ) external virtual onlyEOA {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, msg.sender, _amount, _l2Gas, _data);
    }

    /* *
     * @inheritdoc IL1ERC20Bridge */
    


    function depositERC20To(
		.
		.
		.
    ) external virtual {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, _to, _amount, _l2Gas, _data);
    }
```

Queste due funzioni sono wrapper attorno a `_initiateERC20Deposit`, la funzione che gestisce l'effettivo deposito di ERC-20.

```solidity
    /* *
     * @dev Esegue la logica per i depositi informando il contratto L2 Deposited Token
     * del deposito e chiamando un gestore per bloccare i fondi L1. (es., transferFrom)
     *
     * @param _l1Token Indirizzo dell'ERC20 L1 che stiamo depositando
     * @param _l2Token Indirizzo del rispettivo ERC20 L2 di L1
     * @param _from Account da cui prelevare il deposito su L1
     * @param _to Account a cui dare il deposito su L2
     * @param _amount Importo di ERC20 da depositare.
     * @param _l2Gas Limite del gas richiesto per completare il deposito su L2.
     * @param _data Dati opzionali da inoltrare a L2. Questi dati sono forniti
     *        esclusivamente per comodità dei contratti esterni. A parte l'imposizione di una
     *        lunghezza massima, questi contratti non forniscono alcuna garanzia sul loro contenuto. */
    













    function _initiateERC20Deposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) internal {
```

Questa funzione è simile a `_initiateETHDeposit` sopra, con alcune importanti differenze.
La prima differenza è che questa funzione riceve gli indirizzi dei token e l'importo da trasferire come parametri.
Nel caso degli ETH, la chiamata al ponte include già il trasferimento dell'asset all'account del ponte (`msg.value`).

```solidity
        // Quando un deposito viene avviato su L1, il ponte L1 trasferisce i fondi a se stesso per futuri
        // prelievi. safeTransferFrom controlla anche se il contratto ha del codice, quindi questo fallirà se
        // _from è un EOA o address(0).
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

I trasferimenti di token ERC-20 seguono un processo diverso rispetto agli ETH:

1. L'utente (`_from`) concede un'indennità al ponte per trasferire i token appropriati.
2. L'utente chiama il ponte con l'indirizzo del contratto del token, l'importo, ecc.
3. Il ponte trasferisce i token (a se stesso) come parte del processo di deposito.

Il primo passaggio può avvenire in una transazione separata rispetto agli ultimi due.
Tuttavia, il front-running non è un problema perché le due funzioni che chiamano `_initiateERC20Deposit` (`depositERC20` e `depositERC20To`) chiamano questa funzione solo con `msg.sender` come parametro `_from`.

```solidity
        // Costruisce i calldata per _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // Invia i calldata in L2
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

Aggiunge l'importo depositato di token alla struttura dati `deposits`.
Potrebbero esserci più indirizzi su L2 che corrispondono allo stesso token ERC-20 di L1, quindi non è sufficiente utilizzare il saldo del ponte del token ERC-20 di L1 per tenere traccia dei depositi.

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /* ************************
     * Funzioni Cross-chain *
     ************************ */
    



    /* *
     * @inheritdoc IL1StandardBridge */
    


    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

Il ponte di L2 invia un messaggio al messaggero tra domini di L2 che fa sì che il messaggero tra domini di L1 chiami questa funzione (una volta che la [transazione che finalizza il messaggio](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) viene inviata su L1, ovviamente).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Si assicura che questo sia un messaggio _legittimo_, proveniente dal messaggero tra domini e originato dal ponte dei token di L2.
Questa funzione viene utilizzata per prelevare ETH dal ponte, quindi dobbiamo assicurarci che venga chiamata solo dal chiamante autorizzato.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

Il modo per trasferire ETH è chiamare il destinatario con la quantità di wei in `msg.value`.

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

Emette un evento relativo al prelievo.

```solidity
    }

    /* *
     * @inheritdoc IL1ERC20Bridge */
    


    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Questa funzione è simile a `finalizeETHWithdrawal` sopra, con le modifiche necessarie per i token ERC-20.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

Aggiorna la struttura dati `deposits`.

```solidity

        // Quando un prelievo viene finalizzato su L1, il ponte L1 trasferisce i fondi a chi effettua il prelievo
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /* ****************************
     * Temporaneo - Migrazione ETH *
     **************************** */
    



    /* *
     * @dev Aggiunge saldo ETH all'account. Questo ha lo scopo di consentire la migrazione
     * degli ETH da un vecchio gateway a un nuovo gateway.
     * NOTA: Questo viene lasciato solo per un aggiornamento in modo da poter ricevere gli ETH migrati dal
     * vecchio contratto */
    





    function donateETH() external payable {}
}
```

C'era un'implementazione precedente del ponte.
Quando siamo passati da quell'implementazione a questa, abbiamo dovuto spostare tutti gli asset.
I token ERC-20 possono semplicemente essere spostati.
Tuttavia, per trasferire ETH a un contratto è necessaria l'approvazione di quel contratto, che è ciò che ci fornisce `donateETH`.

## Token ERC-20 su L2 {#erc-20-tokens-on-l2}

Affinché un token ERC-20 si adatti al ponte standard, deve consentire al ponte standard, e _solo_ al ponte standard, di coniare token.
Questo è necessario perché i ponti devono garantire che il numero di token in circolazione su Optimism sia uguale al numero di token bloccati all'interno del contratto del ponte di L1.
Se ci sono troppi token su L2, alcuni utenti non sarebbero in grado di riportare i propri asset su L1 tramite il ponte.
Invece di un ponte affidabile, ricreeremmo essenzialmente il [sistema bancario a riserva frazionaria](https://www.investopedia.com/terms/f/fractionalreservebanking.asp).
Se ci sono troppi token su L1, alcuni di quei token rimarrebbero bloccati per sempre all'interno del contratto del ponte perché non c'è modo di rilasciarli senza bruciare i token di L2.

### IL2StandardERC20 {#il2standarderc20}

Ogni token ERC-20 su L2 che utilizza il ponte standard deve fornire [questa interfaccia](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol), che ha le funzioni e gli eventi di cui il ponte standard ha bisogno.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[L'interfaccia ERC-20 standard](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) non include le funzioni `mint` e `burn`.
Questi metodi non sono richiesti dallo [standard ERC-20](https://eips.ethereum.org/EIPS/eip-20), che lascia non specificati i meccanismi per creare e distruggere i token.

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[L'interfaccia ERC-165](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) viene utilizzata per specificare quali funzioni fornisce un contratto.
[Puoi leggere lo standard qui](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

Questa funzione fornisce l'indirizzo del token di L1 che è collegato tramite ponte a questo contratto.
Nota che non abbiamo una funzione simile nella direzione opposta.
Dobbiamo essere in grado di trasferire tramite ponte qualsiasi token di L1, indipendentemente dal fatto che il supporto per L2 fosse previsto o meno al momento della sua implementazione.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

Funzioni ed eventi per coniare (creare) e bruciare (distruggere) i token.
Il ponte dovrebbe essere l'unica entità in grado di eseguire queste funzioni per garantire che il numero di token sia corretto (uguale al numero di token bloccati su L1).

### L2StandardERC20 {#L2StandardERC20}

[Questa è la nostra implementazione dell'interfaccia `IL2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
A meno che tu non abbia bisogno di qualche tipo di logica personalizzata, dovresti usare questa.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[Il contratto ERC-20 di OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Optimism non crede nel reinventare la ruota, specialmente quando la ruota è ben verificata e deve essere abbastanza affidabile da contenere asset.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

Questi sono i due parametri di configurazione aggiuntivi che richiediamo e che l'ERC-20 normalmente non richiede.

```solidity

    /* *
     * @param _l2Bridge Indirizzo del ponte standard L2.
     * @param _l1Token Indirizzo del token L1 corrispondente.
     * @param _name Nome dell'ERC20.
     * @param _symbol Simbolo dell'ERC20. */
    





    constructor(
        address _l2Bridge,
        address _l1Token,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        l1Token = _l1Token;
        l2Bridge = _l2Bridge;
    }
```

Prima chiama il costruttore per il contratto da cui ereditiamo (`ERC20(_name, _symbol)`) e poi imposta le nostre variabili.

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Only L2 Bridge can mint and burn");
        _;
    }


    // slither-disable-next-line external-function
    function supportsInterface(bytes4 _interfaceId) public pure returns (bool) {
        bytes4 firstSupportedInterface = bytes4(keccak256("supportsInterface(bytes4)")); // ERC165
        bytes4 secondSupportedInterface = IL2StandardERC20.l1Token.selector ^
            IL2StandardERC20.mint.selector ^
            IL2StandardERC20.burn.selector;
        return _interfaceId == firstSupportedInterface || _interfaceId == secondSupportedInterface;
    }
```

Questo è il modo in cui funziona [ERC-165](https://eips.ethereum.org/EIPS/eip-165).
Ogni interfaccia è un numero di funzioni supportate ed è identificata come l'[or esclusivo](https://it.wikipedia.org/wiki/Disgiunzione_esclusiva) dei [selettori di funzione ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) di quelle funzioni.

Il ponte di L2 utilizza ERC-165 come controllo di integrità per assicurarsi che il contratto ERC-20 a cui invia gli asset sia un `IL2StandardERC20`.

**Nota:** Non c'è nulla che impedisca a un contratto malevolo di fornire risposte false a `supportsInterface`, quindi questo è un meccanismo di controllo dell'integrità, _non_ un meccanismo di sicurezza.

```solidity
    // slither-disable-next-line external-function
    function mint(address _to, uint256 _amount) public virtual onlyL2Bridge {
        _mint(_to, _amount);

        emit Mint(_to, _amount);
    }

    // slither-disable-next-line external-function
    function burn(address _from, uint256 _amount) public virtual onlyL2Bridge {
        _burn(_from, _amount);

        emit Burn(_from, _amount);
    }
}
```

Solo il ponte di L2 è autorizzato a coniare e bruciare asset.

`_mint` e `_burn` sono in realtà definiti nel [contratto ERC-20 di OpenZeppelin](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).
Quel contratto semplicemente non li espone esternamente, perché le condizioni per coniare e bruciare token sono tanto varie quanto il numero di modi per utilizzare l'ERC-20.

## Codice del ponte di L2 {#l2-bridge-code}

Questo è il codice che esegue il ponte su Optimism.
[Il sorgente per questo contratto è qui](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Importazioni di Interfacce */
/* Interface Imports */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

L'interfaccia [IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) è molto simile all'[equivalente di L1](#IL1ERC20Bridge) che abbiamo visto sopra.
Ci sono due differenze significative:

1. Su L1 si avviano i depositi e si finalizzano i prelievi.
   Qui si avviano i prelievi e si finalizzano i depositi.
2. Su L1 è necessario distinguere tra ETH e token ERC-20.
   Su L2 possiamo utilizzare le stesse funzioni per entrambi perché internamente i saldi di ETH su Optimism sono gestiti come un token ERC-20 con l'indirizzo [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000).

```solidity
/* Importazioni di Librerie */
/* Library Imports */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Importazioni di Contratti */
/* Contract Imports */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/* *
 * @title L2StandardBridge
 * @dev Il ponte Standard L2 è un contratto che lavora insieme al ponte Standard L1 per
 * abilitare le transizioni di ETH ed ERC20 tra L1 e L2.
 * Questo contratto agisce per coniare nuovi token quando viene a conoscenza di depositi nel ponte
 * Standard L1.
 * Questo contratto agisce anche come bruciatore dei token destinati al prelievo, informando il ponte
 * L1 di rilasciare i fondi L1. */









contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /* *******************************
     * Riferimenti a Contratti Esterni *
     ******************************* */
    



    address public l1TokenBridge;
```

Tiene traccia dell'indirizzo del ponte di L1.
Nota che, a differenza dell'equivalente di L1, qui _abbiamo bisogno_ di questa variabile.
L'indirizzo del ponte di L1 non è noto in anticipo.

```solidity

    /* **************
     * Costruttore *
     ************** */
    



    /* *
     * @param _l2CrossDomainMessenger Messenger cross-domain utilizzato da questo contratto.
     * @param _l1TokenBridge Indirizzo del ponte L1 distribuito sulla catena principale. */
    



    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /* **************
     * Prelievo *
     ************** */
    



    /* *
     * @inheritdoc IL2ERC20Bridge */
    


    function withdraw(
        address _l2Token,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, msg.sender, _amount, _l1Gas, _data);
    }

    /* *
     * @inheritdoc IL2ERC20Bridge */
    


    function withdrawTo(
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, _to, _amount, _l1Gas, _data);
    }
```

Queste due funzioni avviano i prelievi.
Nota che non è necessario specificare l'indirizzo del token di L1.
Ci si aspetta che i token di L2 ci dicano l'indirizzo dell'equivalente di L1.

```solidity

    /* *
     * @dev Esegue la logica per i prelievi bruciando il token e informando
     *      il Gateway del token L1 del prelievo.
     * @param _l2Token Indirizzo del token L2 in cui è stato avviato il prelievo.
     * @param _from Account da cui prelevare il prelievo su L2.
     * @param _to Account a cui dare il prelievo su L1.
     * @param _amount Importo del token da prelevare.
     * @param _l1Gas Inutilizzato, ma incluso per potenziali considerazioni di compatibilità futura.
     * @param _data Dati opzionali da inoltrare a L1. Questi dati sono forniti
     *        esclusivamente per comodità dei contratti esterni. A parte l'imposizione di una
     *        lunghezza massima, questi contratti non forniscono alcuna garanzia sul loro contenuto. */
    











    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // Quando viene avviato un prelievo, bruciamo i fondi di chi effettua il prelievo per prevenire un successivo
        // utilizzo su L2
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

Nota che _non_ facciamo affidamento sul parametro `_from` ma su `msg.sender` che è molto più difficile da falsificare (impossibile, per quanto ne so).

```solidity

        // Costruisce i calldata per l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

Su L1 è necessario distinguere tra ETH ed ERC-20.

```solidity
            message = abi.encodeWithSelector(
                IL1StandardBridge.finalizeETHWithdrawal.selector,
                _from,
                _to,
                _amount,
                _data
            );
        } else {
            message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                l1Token,
                _l2Token,
                _from,
                _to,
                _amount,
                _data
            );
        }

        // Invia il messaggio al ponte L1
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /* ***********************************
     * Funzione Cross-chain: Deposito *
     *********************************** */
    



    /* *
     * @inheritdoc IL2ERC20Bridge */
    


    function finalizeDeposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

Questa funzione è chiamata da `L1StandardBridge`.

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

Si assicura che la fonte del messaggio sia legittima.
Questo è importante perché questa funzione chiama `_mint` e potrebbe essere utilizzata per fornire token che non sono coperti dai token che il ponte possiede su L1.

```solidity
        // Controlla che il token di destinazione sia conforme e
        // verifica che il token depositato su L1 corrisponda alla rappresentazione del token depositato su L2 qui
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

Controlli di integrità:

1. L'interfaccia corretta è supportata
2. L'indirizzo di L1 del contratto ERC-20 di L2 corrisponde alla fonte di L1 dei token

```solidity
        ) {
            // Quando un deposito viene finalizzato, accreditiamo sull'account su L2 la stessa quantità di
            // token.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

Se i controlli di integrità vengono superati, finalizza il deposito:

1. Conia i token
2. Emette l'evento appropriato

```solidity
        } else {
            // O il token L2 in cui si sta depositando non concorda sull'indirizzo corretto
            // del suo token L1, oppure non supporta l'interfaccia corretta.
            // Questo dovrebbe accadere solo se c'è un token L2 malevolo, o se un utente in qualche modo
            // ha specificato l'indirizzo del token L2 sbagliato in cui depositare.
            // In entrambi i casi, interrompiamo il processo qui e costruiamo un
            // messaggio di prelievo in modo che gli utenti possano recuperare i propri fondi in alcuni casi.
            // Non c'è modo di prevenire del tutto i contratti di token malevoli, ma questo limita
            // l'errore dell'utente e mitiga alcune forme di comportamento malevolo del contratto.
```

Se un utente ha commesso un errore rilevabile utilizzando l'indirizzo del token di L2 sbagliato, vogliamo annullare il deposito e restituire i token su L1.
L'unico modo in cui possiamo farlo da L2 è inviare un messaggio che dovrà attendere il periodo di contestazione dei guasti, ma questo è molto meglio per l'utente rispetto alla perdita permanente dei token.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // scambiati _to e _from qui per rimbalzare il deposito al mittente
                _from,
                _amount,
                _data
            );

            // Invia il messaggio al ponte L1
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## Conclusione {#conclusion}

Il ponte standard è il meccanismo più flessibile per i trasferimenti di asset.
Tuttavia, essendo così generico, non è sempre il meccanismo più facile da usare.
Soprattutto per i prelievi, la maggior parte degli utenti preferisce utilizzare [ponti di terze parti](https://optimism.io/apps#bridge) che non attendono il periodo di contestazione e non richiedono una prova di Merkle per finalizzare il prelievo.

Questi ponti in genere funzionano avendo asset su L1, che forniscono immediatamente per una piccola commissione (spesso inferiore al costo del gas per un prelievo dal ponte standard).
Quando il ponte (o le persone che lo gestiscono) prevede di essere a corto di asset su L1, trasferisce asset sufficienti da L2. Poiché si tratta di prelievi molto grandi, il costo del prelievo viene ammortizzato su un importo elevato e rappresenta una percentuale molto più piccola.

Speriamo che questo articolo ti abbia aiutato a capire meglio come funziona il livello 2 e come scrivere codice Solidity chiaro e sicuro.

[Vedi qui per altri miei lavori](https://cryptodocguy.pro/).