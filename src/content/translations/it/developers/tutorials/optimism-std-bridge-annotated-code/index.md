---
title: "Guida del ponte standard di Optimism per contratti"
description: Come funziona il ponte standard per Optimism? Perché funziona così?
author: Ori Pomerantz
tags:
  - "Solidity"
  - "optimism"
  - "ponte"
  - "livello 2"
skill: intermediate
published: 2022-03-30
lang: it
---

[Optimism](https://www.optimism.io/) è un [Rollup ottimistico](/developers/docs/scaling/optimistic-rollups/). I rollup ottimistici possono elaborare le transazioni a un prezzo molto più basso di quello della rete principale di Ethereum (nota anche come livello 1 o L1), poiché le transazioni sono elaborate solo da alcuni nodi, invece che da ogni nodo sulla rete. Allo stesso tempo, i dati vengono tutti scritti nel L1, così che tutto possa essere provato e ricostruito con le garanzie d'integrità e disponibilità della rete principale.

Per usare le risorse del L1 su Optimism (o su qualsiasi altro L2), le risorse devono essere collegate con un [ponte](/bridges/#prerequisites). Un modo per farlo è che gli utenti blocchino le risorse (ETH e [token ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) sono le più comuni) nel L1 e ricevano le risorse equivalenti da usare nel L2. In definitiva, chiunque le riceva potrebbe volerle ricollegare al L1. Così facendo, le risorse sono bruciate nel L2 e poi rilasciate nuovamente all'utente nel L1.

Questo è il modo in cui funziona il [ponte standard di Optimism](https://community.optimism.io/docs/developers/bridge/standard-bridge). In questo articolo esaminiamo il codice sorgente di quel ponte, per vedere come funziona e per studiarlo come un esempio di codice di Solidity ben scritto.

## Flussi di controllo {#control-flows}

Il ponte ha due flussi principali:

- Deposito (da L1 a L2)
- Prelievo (da L2 a L1)

### Flusso di deposito {#deposit-flow}

#### Livello 1 {#deposit-flow-layer-1}

1. In caso di deposito di un ERC-20, il depositante concede al ponte un'indennità per spendere l'importo depositato
2. Il depositante chiama il ponte L1 (`depositERC20`, `depositERC20To`, `depositETH`, o `depositETHTo`)
3. Il ponte L1 prende possesso della risorsa collegata
   - ETH: la risorsa è trasferita dal depositante all'interno della chiamata
   - ERC-20: la risorsa è trasferita dal ponte a sé stessa, usando l'indennità fornita dal depositante
4. Il ponte L1 usa il meccanismo di messaggio interdominio per chiamare `finalizeDeposit` sul ponte L2

#### Livello 2 {#deposit-flow-layer-2}

5. Il ponte L2 verifica che la chiamata a `finalizeDeposit` sia legittima:
   - Proviene dal contratto di messaggistica interdominio
   - Originariamente proveniva dal ponte su L1
6. Il ponte L2 verifica se il contratto del token ERC-20 su L2 è quello corretto:
   - Il contratto L2 segnala che la sua controparte del L1 è uguale a quella da cui i token provenivano su L1
   - Il contratto L2 segnala che supporta l'interfaccia corretta ([che usa ERC-165](https://eips.ethereum.org/EIPS/eip-165)).
7. Se il contratto L2 è quello corretto, chiamalo per coniare il numero di token appropriato all'indirizzo corretto. Altrimenti, avvia un processo di prelievo per consentire all'utente di rivendicare i token su L1.

### Flusso di prelievo {#withdrawal-flow}

#### Livello 2 {#withdrawl-flow-layer-2}

1. Il prelevante chiama il ponte L2 (`withdraw` o `withdrawTo`)
2. Il ponte L2 brucia il giusto numero di token appartenente a `msg.sender`
3. Il ponte L2 usa il meccanismo di messaggio interdominio per chiamare `finalizeETHWithdrawal` o `finalizeERC20Withdrawal` sul ponte L1

#### Livello 1 {#withdrawl-flow-layer-1}

4. Il ponte L1 verifica che la chiamata a `finalizeETHWithdrawal` o `finalizeERC20Withdrawal` sia legittima:
   - Proviene dal meccanismo di messaggistica interdominio
   - Originariamente proveniva dal ponte su L2
5. Il ponte L1 trasferisce la risorsa appropriata (ETH o ERC-20) all'indirizzo appropriato

## Codice del Livello 1 {#layer-1-code}

Questo è il codice eseguito su L1, la rete principale di Ethereum.

### IL1ERC20Bridge {#IL1ERC20Bridge}

[Quest'interfaccia è definita qui](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol). Include le funzioni e definizioni richieste per collegare i token ERC-20.

```solidity
// SPDX-License-Identifier: MIT
```

[Gran parte del codice di Optimism è rilasciato sotto la licenza MIT](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

Al momento della scrittura, l'ultima versione di Solidity è la 0.8.12. Fino al rilascio della versione 0.9.0, non sappiamo se questo codice è compatibile con esso o meno.

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * Events *
     **********/

    event ERC20DepositInitiated(
```

Nella terminologia del ponte di Optimism, _deposito_ indica un trasferimento da L1 a L2, e _prelievo_ indica un trasferimento da L2 a L1.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

Nella maggior parte dei casi, l'indirizzo di un ERC-20 su L1 non equivale all'indirizzo dell'ERC-20 equivalente su L2. [Puoi visualizzare l'elenco di indirizzi di token qui](https://static.optimism.io/optimism.tokenlist.json). L'indirizzo con `chainId` 1 è sul L1 (Mainnet) e l'indirizzo con `chainId` 10 è sul L2 (Optimism). Gli altri due valori di `chainId` sono per la rete di prova Kovan (42) e la rete di prova Kovan di Optimistic (69).

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

È possibile aggiungere note ai trasferimenti, nel qual caso sono aggiunti agli eventi che li segnalano.

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

Lo stesso contratto del ponte gestisce i trasferimenti in entrambe le direzioni. Nel caso del ponte L1, ciò indica l'inizializzazione dei depositi e la finalizzazione dei prelievi.

```solidity

    /********************
     * Public Functions *
     ********************/

    /**
     * @dev get the address of the corresponding L2 bridge contract.
     * @return Address of the corresponding L2 bridge contract.
     */
    function l2TokenBridge() external returns (address);
```

Questa funzione non è davvero necessaria, perché sul L2 è un contratto pre-distribuito, quindi è sempre all'indirizzo `0x4200000000000000000000000000000000000010`. Serve per simmetria con il ponte L2, perché _non_ è banale sapere l'indirizzo del ponte L1.

```solidity
    /**
     * @dev deposit an amount of the ERC20 to the caller's balance on L2.
     * @param _l1Token Address of the L1 ERC20 we are depositing
     * @param _l2Token Address of the L1 respective L2 ERC20
     * @param _amount Amount of the ERC20 to deposit
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

Il parametro `_l2Gas` è la quantità di gas di L2 che la transazione può spendere. [Fino a un certo limite (elevato), è gratuito](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), quindi, a meno che il contratto ERC-20 non faccia qualcosa di davvero strano durante il conio, non dovrebbe essere un problema. Questa funzione si occupa dello scenario comune, in cui un utente collega le risorse allo stesso indirizzo su una blockchain differente.

```solidity
    /**
     * @dev deposit an amount of ERC20 to a recipient's balance on L2.
     * @param _l1Token Address of the L1 ERC20 we are depositing
     * @param _l2Token Address of the L1 respective L2 ERC20
     * @param _to L2 address to credit the withdrawal to.
     * @param _amount Amount of the ERC20 to deposit.
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function depositERC20To(
        address _l1Token,
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

Questa funzione è quasi identica a `depositERC20`, ma ti consente di inviare l'ERC-20 a un altro indirizzo.

```solidity
    /*************************
     * Cross-chain Functions *
     *************************/

    /**
     * @dev Complete a withdrawal from L2 to L1, and credit funds to the recipient's balance of the
     * L1 ERC20 token.
     * This call will fail if the initialized withdrawal from L2 has not been finalized.
     *
     * @param _l1Token Address of L1 token to finalizeWithdrawal for.
     * @param _l2Token Address of L2 token where withdrawal was initiated.
     * @param _from L2 address initiating the transfer.
     * @param _to L1 address to credit the withdrawal to.
     * @param _amount Amount of the ERC20 to deposit.
     * @param _data Data provided by the sender on L2. This data is provided
     *   solely as a convenience for external contracts. Aside from enforcing a maximum
     *   length, these contracts provide no guarantees about its content.
     */
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

I prelievi (e altri messaggi da L2 a L1) su Optimism sono processi in due fasi:

1. Una transazione di avvio su L2.
2. Una transazione di finalizzazione o rivendicazione su L1. Questa transazione deve verificarsi dopo il [periodo di contestazione dell'errore](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) perché la transazione di L2 termini.

### IL1StandardBridge {#il1standardbridge}

[Quest'interfaccia è definita qui](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol). Questo file contiene le definizioni dell'evento e la funzione per ETH. Queste definizioni sono molto simili a quelle definite nel precedente `IL1ERC20Bridge` per ERC-20.

L'interfaccia del ponte è divisa tra due file perché alcuni token ERC-20 richiedono un'elaborazione specifica e non possono esser gestiti dal ponte standard. Il ponte personalizzato che gestisce un token di questo tipo può quindi implementare `IL1ERC20Bridge` e non dover collegare anche ETH.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * Events *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

Questo evento è quasi identico alla versione di ERC-20 (`ERC20DepositInitiated`), salvo che mancano gli indirizzi del token di L1 e L2. Lo stesso vale per gli altri eventi e le altre funzioni.

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * Public Functions *
     ********************/

    /**
     * @dev Deposit an amount of the ETH to the caller's balance on L2.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev Deposit an amount of ETH to a recipient's balance on L2.
            .
            .
            .
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable;

    /*************************
     * Cross-chain Functions *
     *************************/

    /**
     * @dev Complete a withdrawal from L2 to L1, and credit funds to the recipient's balance of the
     * L1 ETH token. Since only the xDomainMessenger can call this function, it will never be called
     * before the withdrawal is finalized.
                .
                .
                .
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

### CrossDomainEnabled {#crossdomainenabled}

[Questo contratto](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) è ereditato da entrambi i ponti ([L1](#the-l1-bridge-contract) e [L2](#the-l2-bridge-contract)) per inviare i messaggi all'altro livello.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Interface Imports */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[Quest'interfaccia](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) dice al contratto come inviare i messaggi all'altro livello, usando la messaggistica interdominio. Questa messaggistica interdominio è un sistema totalmente a sé, che merita il proprio articolo, che spero scriverò in futuro.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev Helper contract for contracts performing cross-domain communications
 *
 * Compiler used: defined by inheriting contract
 */
contract CrossDomainEnabled {
    /*************
     * Variables *
     *************/

    // Messenger contract used to send and recieve messages from the other domain.
    address public messenger;

    /***************
     * Constructor *
     ***************/

    /**
     * @param _messenger Address of the CrossDomainMessenger on the current layer.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

Il parametro che il contratto deve conoscere, l'indirizzo della messaggistica interdominio su questo livello. Questo parametro è impostato una volta, nel costruttore, e non cambia mai.

```solidity

    /**********************
     * Function Modifiers *
     **********************/

    /**
     * Enforces that the modified function is only callable by a specific cross-domain account.
     * @param _sourceDomainAccount The only account on the originating domain which is
     *  authenticated to call this function.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

La messaggistica interdominio è accessibile da qualsiasi contratto sulla blockchain mentre è in esecuzione (sulla mainnet di Ethereum o su Optimism). Ma per fidarsi _solo_ di certi messaggi, se provengono dal ponte dall'altra parte, serve il ponte su entrambi i lati.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

Solo i messaggi dalla messaggistica interdominio appropriata (`messenger`, come vedi di seguito) sono affidabili.

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

Il modo in cui la messaggistica interdominio fornisce l'indirizzo che ha inviato un messaggio con l'altro livello è [la funzione `.xDomainMessageSender()`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128). Se è chiamato nella transazione avviata dal messaggio, può fornire queste informazioni.

Dobbiamo assicurarci che il messaggio ricevuto provenga dall'altro ponte.

```solidity

        _;
    }

    /**********************
     * Internal Functions *
     **********************/

    /**
     * Gets the messenger, usually from storage. This function is exposed in case a child contract
     * needs to override.
     * @return The address of the cross-domain messenger contract which should be used.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

Questa funzione restituisce la messaggistica interdominio. Usiamo una funzione piuttosto che la variabile `messenger` per consentire ai contratti che ereditano da questa di usare un algoritmo per specificare quale messaggistica interdominio utilizzare.

```solidity

    /**
     * Sends a message to an account on another domain
     * @param _crossDomainTarget The intended recipient on the destination domain
     * @param _message The data to send to the target (usually calldata to a function with
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit The gasLimit for the receipt of the message on the target domain.
     */
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

[Slither](https://github.com/crytic/slither) è un analizzatore statico che Optimism esegue su ogni contratto per cercare le vulnerabilità e altri problemi potenziali. In questo caso, la seguente riga innesca due vulnerabilità:

1. [Eventi di rientranza](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [Rientranza benigna](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

In questo caso, non ci interessiamo della rientranza: sappiamo che `getCrossDomainMessenger()` restituisce un indirizzo attendibile, anche se Slither non ha modo di saperlo.

### Il contratto del ponte di L1 {#the-l1-bridge-contract}

[Il codice sorgente di questo contratto è qui](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

Le interfacce possono far parte di altri contratti, quindi devono supportare una vasta gamma di versioni di Solidity. Ma il ponte in sé è il nostro contratto, e possiamo essere rigidi sulla versione di Solidity utilizzata.

```solidity
/* Interface Imports */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) e [IL1StandardBridge](#IL1StandardBridge) sono spiegati sopra.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[Quest'interfaccia](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) ci consente di creare messaggi per controllare il ponte standard su L2.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Quest'interfaccia](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) ci consente di controllare i contratti ERC-20. [Puoi approfondire questo argomento qui](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Library Imports */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[Come spiegato sopra](#crossdomainenabled), questo contratto è usato per la messaggistica tra livelli.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) contiene gli indirizzi per i contratti L2 che hanno sempre lo stesso indirizzo. Comprende il ponte standard su L2.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[Utility per indirizzi di OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). Serve per distinguere tra gli indirizzi del contratto e quelli appartenenti ai conti posseduti esternamente (EOA).

Non è una soluzione perfetta, perché non esiste modo di distinguere tra chiamate dirette e chiamate effettuate dal costruttore di un contratto ma, quantomeno, ci consente di identificare ed evitare alcuni errori comuni dell'utente.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[Lo standard ERC-20](https://eips.ethereum.org/EIPS/eip-20) supporta due metodi di segnalazione del fallimento di un contratto:

1. Ripristino
2. Restituzione di `false`

Gestire entrambi i casi renderebbe il nostro codice più complicato, quindi, invece, usiamo [`SafeERC20` di OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol), che si assicura che [tutti i fallimenti portino a un ripristino](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96).

```solidity
/**
 * @title L1StandardBridge
 * @dev The L1 ETH and ERC20 Bridge is a contract which stores deposited L1 funds and standard
 * tokens that are in use on L2. It synchronizes a corresponding L2 Bridge, informing it of deposits
 * and listening to it for newly finalized withdrawals.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

Questa riga specifica come usare il wrapper di `SafeERC20`, ogni volta che usiamo l'interfaccia di `IERC20`.

```solidity

    /********************************
     * External Contract References *
     ********************************/

    address public l2TokenBridge;
```

L'indirizzo di [L2StandardBridge](#the-l2-bridge-contract).

```solidity

    // Maps L1 token to L2 token to balance of the L1 token deposited
    mapping(address => mapping(address => uint256)) public deposits;
```

Una doppia [mappatura](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) come questa definisce un [array sparso bidimensionale](https://en.wikipedia.org/wiki/Sparse_matrix). I valori in questa struttura di dati sono identificati come `deposit[L1 token addr][L2 token addr]`. Il valore predefinito è zero. Solo le celle impostate a un valore differente sono scritte in memoria.

```solidity

    /***************
     * Constructor *
     ***************/

    // This contract lives behind a proxy, so the constructor parameters will go unused.
    constructor() CrossDomainEnabled(address(0)) {}
```

Per poter aggiornare questo contratto senza dover copiare tutte le variabili in memoria. Per farlo, usiamo un [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy), un contratto che usa [`delegatecall`](https://solidity-by-example.org/delegatecall/) per trasferire le chiamate a un contratto distinto, il cui indirizzo è memorizzato dal contratto del proxy (quando aggiorni, dici al proxy di modificare tale indirizzo). Quando usi `delegatecall`, la memoria rimane quella del contratto _chiamante_, quindi non sono influenzati i valori di tutte le variabili di stato del contratto.

Un effetto di questo schema è che non viene usata la memoria del contratto _chiamato_ di `delegatecall` e, dunque, i valori del costruttore passati a esso non sono rilevanti. Questo è il motivo per cui possiamo fornire un valore senza senso al costruttore di `CrossDomainEnabled`. È anche il motivo per cui l'inizializzazione di seguito è separata dal costruttore.

```solidity
    /******************
     * Initialization *
     ******************/

    /**
     * @param _l1messenger L1 Messenger address being used for cross-chain communications.
     * @param _l2TokenBridge L2 standard bridge address.
     */
    // slither-disable-next-line external-function
```

Questo [test di Slither](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external), identifica le funzioni non chiamate dal codice del contratto e che potrebbero dunque esser dichiarate `external` invece che `public`. Il costo del gas delle funzioni `external` può esser inferiore, perché possono ricevere dei parametri nei dati della chiamata. Le funzioni dichiarate come `public` devono esser accessibili dall'interno del contratto. I contratti non possono modificare i propri dati di chiamata, quindi, i parametri devono essere in memoria. Quando una simile funzione è chiamata esternamente, è necessario copiare i dati di chiamata in memoria, e questa operazione costa del gas. In questo caso la funzione è chiamata solo una volta, quindi, non siamo interessati alla sua inefficienza.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

La funzione `initialize` dovrebbe esser chiamata solo una volta. Se cambia l'indirizzo della messaggistica interdominio di L1 o del ponte del token L2, creiamo un nuovo proxy e un nuovo ponte che lo chiama. È improbabile che si verifichi, tranne quando viene aggiornato l'intero sistema, un evento molto raro.

Nota che questa funzione non ha alcun meccanismo che limiti _chi_ possa chiamarla. Questo significa che, in teoria, un malintenzionato potrebbe attendere la distribuzione del proxy e della prima versione del ponte e, poi, eseguire un [front running](https://solidity-by-example.org/hacks/front-running/) per ottenere la funzione `initialize`, prima dell'utente legittimo. Ma esistono due metodi per impedirlo:

1. Se i contratti sono distribuiti indirettamente da un conto EOA, ma [in una transazione avente un altro contratto che li crea](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595), l'intero processo può esser atomico e terminare prima che ogni altra transazione sia eseguita.
2. Se la chiamata legittima a `initialize` fallisce, è sempre possibile ignorare il proxy e il ponte appena creato e crearne di nuovi.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

Questi sono i due parametri che il ponte deve conoscere.

```solidity

    /**************
     * Depositing *
     **************/

    /** @dev Modifier requiring sender to be EOA.  This check could be bypassed by a malicious
     *  contract via initcode, but it takes care of the user error we want to avoid.
     */
    modifier onlyEOA() {
        // Used to stop deposits from contracts (avoid accidentally lost tokens)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

Per questo abbiamo bisogno delle utility `Address` di OpenZeppelin.

```solidity
    /**
     * @dev This function can be called with no data
     * to deposit an amount of ETH to the caller's balance on L2.
     * Since the receive function doesn't take data, a conservative
     * default amount is forwarded to L2.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

Questa funzione serve per scopi di test. Non compare nelle definizioni dell'interfaccia: non è pensata per un uso ordinario.

```solidity
    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable {
        _initiateETHDeposit(msg.sender, _to, _l2Gas, _data);
    }
```

Queste due funzioni sono wrapper intorno a `_initiateETHDeposit`, la funzione che gestisce l'effettivo deposito di ETH.

```solidity
    /**
     * @dev Performs the logic for deposits by storing the ETH and informing the L2 ETH Gateway of
     * the deposit.
     * @param _from Account to pull the deposit from on L1.
     * @param _to Account to give the deposit to on L2.
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // Construct calldata for finalizeDeposit call
        bytes memory message = abi.encodeWithSelector(
```

I messaggi interdominio funzionano chiamando il contratto di destinazione passando il messaggio come dati di chiamata. I contratti in Solidity interpretano sempre i propri dati di chiamata secondo [le specifiche ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html). La funzione di Solidity [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) crea questi dati di chiamata.

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

In questo caso il messaggio chiama [la funzione `finalizeDeposit`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) con questi parametri:

| Parametro | Valore                         | Significato                                                                                                                                     |
| --------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                     | Valore speciale che sta per ETH (che non è un token ERC-20) su L1                                                                               |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | Il contratto L2 che gestisce ETH su Optimism, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (questo contratto è solo per uso interno a Optimism) |
| \_from    | \_from                         | L'indirizzo su L1 che invia gli ETH                                                                                                             |
| \_to      | \_to                           | L'indirizzo su L2 che riceve gli ETH                                                                                                            |
| amount    | msg.value                      | Importo di wei inviato (già inviato al ponte)                                                                                                   |
| \_data    | \_data                         | Data aggiuntiva da allegare al deposito                                                                                                         |

```solidity
        // Send calldata into L2
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

Invia il messaggio tramite la messaggistica interdominio.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

Emette un evento per informare qualsiasi applicazione decentralizzata che ascolta questo trasferimento.

```solidity
    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20(
        .
        .
        .
    ) external virtual onlyEOA {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, msg.sender, _amount, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20To(
        .
        .
        .
    ) external virtual {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, _to, _amount, _l2Gas, _data);
    }
```

Queste due funzioni sono wrapper intorno a `_initiateERC20Deposit`, la funzione che gestisce l'effettivo deposito ERC-20.

```solidity
    /**
     * @dev Performs the logic for deposits by informing the L2 Deposited Token
     * contract of the deposit and calling a handler to lock the L1 funds. (e.g. transferFrom)
     *
     * @param _l1Token Address of the L1 ERC20 we are depositing
     * @param _l2Token Address of the L1 respective L2 ERC20
     * @param _from Account to pull the deposit from on L1
     * @param _to Account to give the deposit to on L2
     * @param _amount Amount of the ERC20 to deposit.
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
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

Questa funzione è simile a `_initiateETHDeposit` di cui sopra, con alcune importanti differenze. La prima differenza è che questa funzione riceve come parametri gli indirizzi del token e l'importo da trasferire. Nel caso di ETH, la chiamata al ponte include già il trasferimento della risorsa al conto del ponte (`msg.value`).

```solidity
        // When a deposit is initiated on L1, the L1 Bridge transfers the funds to itself for future
        // withdrawals. safeTransferFrom also checks if the contract has code, so this will fail if
        // _from is an EOA or address(0).
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

I trasferimenti di token ERC-20 seguono un processo differente rispetto agli ETH:

1. L'utente (`_from`) dà un indennità al ponte per trasferire i token appropriati.
2. L'utente chiama il ponte con l'indirizzo del contratto del token, l'importo, etc.
3. Il ponte trasferisce i token (a sé stesso) nell'ambito del processo di deposito.

Il primo passaggio potrebbe verificarsi in una transazione separata dalle ultime due. Tuttavia, il front running non è un problema perché le due funzioni che chiamano `_initiateERC20Deposit` (`depositERC20` e `depositERC20To`), chiamano questa funzione con `msg.sender` come solo parametro `_from`.

```solidity
        // Construct calldata for _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // Send calldata into L2
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

Aggiungi l'importo di token depositato alla struttura dei dati `deposits`. Potrebbero esistere diversi indirizzi su L2 corrispondenti allo stesso token L1 ERC-20, quindi non basta usare il saldo del ponte del token L1 ERC-20, per monitorare i depositi.

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * Cross-chain Functions *
     *************************/

    /**
     * @inheritdoc IL1StandardBridge
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

Il ponte L2 invia un messaggio alla messaggistica interdominio del L2, che fa sì che la messaggistica interdominio del L1 chiami questa funzione (una volta che la [transazione che finalizza il messaggio](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) è inviata al L1, ovviamente).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Assicurati che questo sia un messaggio _legittimo_, proveniente dalla messaggistica interdominio e proveniente dal ponte del token del L2. Questa funzione è usata per prelevare ETH dal ponte, quindi dobbiamo assicurarci che sia chiamata solo dal chiamante autorizzato.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

Il metodo per trasferire ETH è chiamare il destinatario indicando l'importo di wei nel `msg.value`.

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

Genera un evento riguardante il prelievo.

```solidity
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Questa funzione è simile al precedente `finalizeETHWithdrawal`, con le modifiche necessarie per i token ERC-20.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

Aggiorna la struttura dei dati di `deposits`.

```solidity

        // When a withdrawal is finalized on L1, the L1 Bridge transfers the funds to the withdrawer
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * Temporary - Migrating ETH *
     *****************************/

    /**
     * @dev Adds ETH balance to the account. This is meant to allow for ETH
     * to be migrated from an old gateway to a new gateway.
     * NOTE: This is left for one upgrade only so we are able to receive the migrated ETH from the
     * old contract
     */
    function donateETH() external payable {}
}
```

Vi è stata un'implementazione precedente del ponte. Quando ci siamo spostati a questa nuova implementazione, abbiamo dovuto spostare tutte le risorse. I token ERC-20 possono essere semplicemente spostati. Al contrario, per trasferire ETH a un contratto, serve l'approvazione di quel contratto, e proprio questo a cui serve `donateETH`.

## Token ERC-20 sul L2 {#erc-20-tokens-on-l2}

Perché un token ERC-20 si adatti al ponte standard, deve consentire al ponte standard, e _solo_ al ponte standard, di coniare il token. Questo è necessario perché i ponti devono assicurare che il numero di token in circolazione su Optimism sia pari al numero di token bloccati nel contratto del ponte del L1. Se esistono troppi token su L2, alcuni utenti non potrebbero ricollegare le proprie risorse al L1. Invece di un ponte fidato, ricreeremmo essenzialmente la [riserva frazionaria bancaria](https://www.investopedia.com/terms/f/fractionalreservebanking.asp). Se esistono troppi token su L1, alcuni di questi rimarrebbero bloccati nel contratto del ponte per sempre, perché non esiste modo di rilasciarli senza bruciare token del L2.

### IL2StandardERC20 {#il2standarderc20}

Ogni token ERC-20 sul L2 che usa il ponte standard deve presentare [quest'interfaccia](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol), che ha le funzioni e gli eventi necessari al ponte standard.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[L'interfaccia standard dell'ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) non include le funzioni `mint` e `burn`. Questi metodi non sono richiesti dallo [standard ERC-20](https://eips.ethereum.org/EIPS/eip-20), che non specifica i meccanismi per creare e distruggere i token.

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[L'interfaccia ERC-165](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) è usata per specificare quali funzioni sono fornite da un contratto. [Puoi leggere lo standard qui](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

Questa funzione fornisce l'indirizzo del token L1, collegato a questo contratto. Nota che non esiste una funzione simile nella direzione opposta. Dobbiamo poter collegare qualsiasi token del L1, indipendentemente dal fatto che il supporto a L2 sia stato o meno pianificato alla sua implementazione.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

Funzioni ed eventi per coniare (creare) e bruciare (distruggere) i token. Il ponte dovrebbe esser la sola entità capace d'eseguire queste funzioni per assicurare che il numero di token sia corretto (pari al numero di token bloccati su L1).

### L2StandardERC20 {#L2StandardERC20}

[Questa è la nostra implementazione dell'interfaccia di `IL2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol). A meno che tu non necessiti di qualche tipo di logica personalizzata, dovresti usare questa.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[Il contratto ERC-20 di OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol). Optimism non vuole reinventare la ruota, specialmente quando questa è ben rodata e deve esser abbastanza affidabile da contenere delle risorse.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

Questi sono due parametri di configurazione aggiuntivi che noi richiediamo e che invece ERC-20 normalmente non richiede.

```solidity

    /**
     * @param _l2Bridge Address of the L2 standard bridge.
     * @param _l1Token Address of the corresponding L1 token.
     * @param _name ERC20 name.
     * @param _symbol ERC20 symbol.
     */
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

Per prima cosa, chiama il costruttore per il contratto da cui ereditiamo (`ERC20(_name, _symbol)`) e poi imposta le nostre variabili.

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

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) funziona così. Ogni interfaccia è un numero di funzioni supportate ed è identificata come l'[OR esclusivo](https://en.wikipedia.org/wiki/Exclusive_or) dei [selettori della funzione ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) di queste funzioni.

Il ponte L2 usa ERC-165 come controllo di integrità per assicurarsi che il contratto ERC-20 a cui invia le risorse sia un `IL2StandardERC20`.

**Nota:** Non c'è nulla che impedisca che un contratto malevolo fornisca risposte false a `supportsInterface`, questo è quindi un meccanismo di controllo dell'integrità, _non_ un meccanismo di sicurezza.

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

Solo il ponte L2 può coniare e bruciare le risorse.

`_mint` e `_burn` sono in realtà definiti nel [contratto ERC-20 di OpenZeppelin](https://ethereum.org/en/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn). Quel contratto non li espone esternamente, perché le condizioni per coniare e bruciare token sono tanto varie quanto il numero di metodi per usare ERC-20.

## Codice del ponte di L2 {#l2-bridge-code}

Questo è il codice che esegue il ponte su Optimism. [Il codice sorgente di questo contratto è qui](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Interface Imports */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

L'interfaccia di [IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) è molto simile all'[equivalente di L1](#IL1ERC20Bridge), visto in precedenza. Vi sono due differenze significative:

1. Su L1, avvii i depositi e finalizzi i prelievi. Qui, avvii i prelievi e finalizzi i depositi.
2. Su L1 è necessario distinguere tra ETH e token ERC-20. Su L2 possiamo usare le stesse funzioni per entrambi perché, internamente, i saldi di ETH su Optimism sono gestiti come un token ERC-20 con l'indirizzo [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://optimistic.etherscan.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000).

```solidity
/* Library Imports */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Contract Imports */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev The L2 Standard bridge is a contract which works together with the L1 Standard bridge to
 * enable ETH and ERC20 transitions between L1 and L2.
 * This contract acts as a minter for new tokens when it hears about deposits into the L1 Standard
 * bridge.
 * This contract also acts as a burner of the tokens intended for withdrawal, informing the L1
 * bridge to release L1 funds.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * External Contract References *
     ********************************/

    address public l1TokenBridge;
```

Tieni traccia dell'indirizzo del ponte L1. Nota che, a differenza dell'equivalente L1, qui _serve_ questa variabile. L'indirizzo del ponte L1 non è noto preventivamente.

```solidity

    /***************
     * Constructor *
     ***************/

    /**
     * @param _l2CrossDomainMessenger Cross-domain messenger used by this contract.
     * @param _l1TokenBridge Address of the L1 bridge deployed to the main chain.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * Withdrawing *
     ***************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdraw(
        address _l2Token,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, msg.sender, _amount, _l1Gas, _data);
    }

    /**
     * @inheritdoc IL2ERC20Bridge
     */
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

Queste due funzioni avviano dei prelievi. Nota che non serve specificare l'indirizzo del token L1. I token L2 dovrebbero dirci l'indirizzo dell'equivalente L1.

```solidity

    /**
     * @dev Performs the logic for withdrawals by burning the token and informing
     *      the L1 token Gateway of the withdrawal.
     * @param _l2Token Address of L2 token where withdrawal is initiated.
     * @param _from Account to pull the withdrawal from on L2.
     * @param _to Account to give the withdrawal to on L1.
     * @param _amount Amount of the token to withdraw.
     * @param _l1Gas Unused, but included for potential forward compatibility considerations.
     * @param _data Optional data to forward to L1. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // When a withdrawal is initiated, we burn the withdrawer's funds to prevent subsequent L2
        // usage
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

Nota che _non_ ci stiamo affidando al parametro `_from`, ma su `msg.sender`, molto più difficile da falsificare (impossibile, per quanto ne so).

```solidity

        // Construct calldata for l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
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

        // Send message up to L1 bridge
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * Cross-chain Function: Depositing *
     ************************************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
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

Assicurati che la fonte del messaggio sia legittima. Questo è importante perché questa funzione chiama `_mint` e potrebbe esser usata per dare token non coperti dai token posseduti dal ponte su L1.

```solidity
        // Check the target token is compliant and
        // verify the deposited token on L1 matches the L2 deposited token representation here
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

Controlli di integrità:

1. L'interfaccia corretta è supportata
2. L'indirizzo L1 del contratto ERC-20 del L2 corrisponde alla sorgente L1 dei token

```solidity
        ) {
            // When a deposit is finalized, we credit the account on L2 with the same amount of
            // tokens.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

Se il controllo di integrità riesce, finalizza il deposito:

1. Conia i token
2. Genera l'evento appropriato

```solidity
        } else {
            // Either the L2 token which is being deposited-into disagrees about the correct address
            // of its L1 token, or does not support the correct interface.
            // This should only happen if there is a  malicious L2 token, or if a user somehow
            // specified the wrong L2 token address to deposit into.
            // In either case, we stop the process here and construct a withdrawal
            // message so that users can get their funds out in some cases.
            // There is no way to prevent malicious token contracts altogether, but this does limit
            // user error and mitigate some forms of malicious contract behavior.
```

Se un utente ha commesso un errore rilevabile usando l'indirizzo del token L2 errato, dobbiamo annullare il deposito e restituire i token sul L1. Il solo modo in cui possiamo farlo da L2 è inviare un messaggio che dovrà attendere il periodo di contestazione dell'errore, ma è molto meglio per l'utente rispetto a perdere permanentemente i token.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // switched the _to and _from here to bounce back the deposit to the sender
                _from,
                _amount,
                _data
            );

            // Send message up to L1 bridge
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## Conclusione {#conclusion}

Il ponte standard è il meccanismo più flessibile per i trasferimenti di risorse. Tuttavia, essendo così generico, non è sempre il metodo più facile da usare. Specialmente per i prelievi, gran parte degli utenti preferisce usare [ponti di terze parti](https://www.optimism.io/apps/bridges) che non attendono il periodo di contestazione dell'errore e non richiedono una prova di Merkle per finalizzare il prelievo.

Questi ponti funzionano tipicamente avendo delle risorse su L1, che forniscono immediatamente a fronte di una piccola commissione (spesso inferiore al costo di gas per un prelievo del ponte standard). Quando il ponte (o le persone che lo gestiscono) prevede di avere poche risorse su L1, trasferisce delle sufficienti risorse da L2. Poiché questi sono prelievi molto grandi, il costo di prelievo è ammortizzato su un grande importo e ha un'incidenza minore.

Spero che questo articolo ti abbia aiutato a comprendere meglio come funziona il livello 2 e come scrivere un codice chiaro e sicuro in Solidity.
