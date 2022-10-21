---
title: "Guida dettagliata al contratto ERC-20"
description: Cosa c'è nel contratto ERC-20 di OpenZeppelin e a cosa serve?
author: Ori Pomerantz
lang: it
tags:
  - "Solidity"
  - "erc-20"
skill: beginner
published: 2021-03-09
---

## Introduzione {#introduction}

Uno degli utilizzi più comuni di Ethereum è quello di permettere a un gruppo di persone di creare un token scambiabile, che potremmo definire la loro valuta. In genere questi token seguono uno standard, l'[ERC-20](/developers/docs/standards/tokens/erc-20/). Questo standard permette di scrivere gli strumenti, come pool di liquidità e wallet, compatibili con tutti i token ERC-20. In questo articolo analizzeremo l'[Implementazione di ERC20 in Solidity su OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol), nonché la [definizione dell'interfaccia](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol).

Qui parliamo del codice sorgente annotato. Se vuoi implementare ERC-20, [leggi questo tutorial](https://docs.openzeppelin.com/contracts/2.x/erc20-supply).

## L'interfaccia {#the-interface}

Lo scopo di uno standard come ERC-20 è quello di consentire molte implementazioni di token che siano interoperabili tra le varie applicazioni, quali wallet e scambi decentralizzati. A tale scopo, creiamo un'[interfaccia](https://www.geeksforgeeks.org/solidity-basics-of-interface/). Ogni codice che necessita di usare il contratto del token può avvalersi delle stesse definizioni nell'interfaccia ed essere compatibile con tutti i contratti del token che la usano, che si tratti di un portafoglio come MetaMask, una dApp come etherscan.io o un contratto diverso, come un pool di liquidità.

![Illustrazione dell'interfaccia di ERC-20](erc20_interface.png)

Se sei un programmatore esperto, probabilmente ricorderai di aver visto costrutti simili in [Java](https://www.w3schools.com/java/java_interface.asp) o persino nei [file d'intestazione in C](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html).

Questa è una definizione dell'[Interfaccia di ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) da OpenZeppelin. È una traduzione dello [standard leggibile umano](https://eips.ethereum.org/EIPS/eip-20) nel codice di Solidity. Ovviamente, l'interfaccia di per sé non definisce _come_ fare qualcosa. Ciò è spiegato nel codice sorgente del contratto di seguito.

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

I file di Solidity dovrebbero includere un'identificativo della licenza. [Puoi vedere qui l'elenco di licenze](https://spdx.org/licenses/). Se hai bisogno di una licenza diversa, basta spiegarlo nei commenti.

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Il linguaggio Solidity si sta ancora evolvendo rapidamente e le nuove versioni potrebbero non essere compatibili con il vecchio codice ([vedi qui](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)). Dunque, è una buona idea specificare non solo una versione minima del linguaggio, ma anche una versione massima, l'ultima con cui hai testato il codice.

&nbsp;

```solidity
/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
```

Il `@dev` nel commento è parte del [formato NatSpec](https://docs.soliditylang.org/en/develop/natspec-format.html), usato per produrre la documentazione dal codice sorgente.

&nbsp;

```solidity
interface IERC20 {
```

Per convenzione, i nomi dell'interfaccia iniziano per `I`.

&nbsp;

```solidity
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);
```

Questa funzione è `external`, a significare che [può essere chiamata solo dal di fuori del contratto](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2). Restituisce la fornitura totale di token nel contratto. Questo valore è restituito usando il tipo più comune in Ethereum, ovvero 256 bit non firmati (256 bit è la dimensione nativa della parola dell'EVM). Questa funzione è anche una `view`, il che significa che non cambia stato, quindi è eseguibile su un nodo singolo invece di farla eseguire da ciascun nodo nella blockchain. Questo tipo di funzione non genera una transazione e non costa [gas](/developers/docs/gas/).

**Nota:** In teoria, si potrebbe pensare che il creatore del contratto possa imbrogliare restituendo una fornitura totale inferiore al valore reale, facendo apparire ogni token come più prezioso di quanto sia realmente. Tuttavia, tale timore ignora la vera natura della blockchain. Tutto ciò che succede sulla blockchain è verificabile da ogni nodo. A tale scopo, il codice del linguaggio della macchina e la memoria di ciascun contratto sono disponibili su tutti i nodi. Benché non sia obbligatorio pubblicare il codice di Solidity per il tuo contratto, nessuno ti prenderebbe sul serio se non pubblicassi il codice sorgente e la versione di Solidity con cui lo hai compilato, così da renderlo verificabile rispetto al codice del linguaggio della macchina che hai indicato. Vediamo ad esempio [questo contratto](https://etherscan.io/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD#code).

&nbsp;

```solidity
    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);
```

Come dice il nome, `balanceOf` restituisce il saldo di un conto. I conti di Ethereum sono identificati in Solidity usando il tipo `address`, che contiene 160 bit. È anche `external` e `view`.

&nbsp;

```solidity
    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emette un evento {Transfer}.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

La funzione `transfer` trasferisce i token dal chiamante a un indirizzo diverso. Ciò implica un cambio di stato, quindi non è una `view`. Quando un utente chiama questa funzione, viene creata una transazione e utilizzato del gas. Inoltre viene emesso un evento, `Transfer`, per informare tutti sulla blockchain dell'evento.

La funzione ha due tipi di output per due diversi tipi di chiamanti:

- Gli utenti che chiamano la funzione direttamente da un'interfaccia utente. In genere l'utente invia una transazione e non attende una risposta, il che potrebbe richiedere un tempo indefinito. L'utente può vedere cosa è successo cercando la ricevuta della transazione (identificata dall'hash della transazione) o cercando l'evento `Transfer`.
- Altri contratti, che chiamano la funzione nell'ambito di una transazione complessiva. Questi ottengono il risultato immediatamente, perché sono eseguiti nella transazione stessa, così da poter usare il valore di ritorno della funzione.

Lo stesso tipo di output è creato da altre funzioni che cambiano lo stato del contratto.

&nbsp;

I margini di tolleranza (allowance) permettono a un conto di spendere token appartenenti a un altro proprietario. Ciò è utile, ad esempio, per i contratti che fungono da venditori. I contratti non possono monitorare gli eventi, quindi se un acquirente dovesse trasferire token al contratto del venditore direttamente, quel contratto non saprebbe di aver ricevuto il pagamento. Invece, l'acquirente permette al contratto del venditore di spendere un certo importo e il venditore trasferisce quell'importo. Questo avviene tramite un funzione chiamata dal contratto del venditore, in modo tale che il contratto del venditore possa sapere se è andata a buon fine.

```solidity
    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

La funzione `allowance` consente a chiunque di richiedere di vedere quale sia il margine di tolleranza che un indirizzo (`owner`) permette all'altro indirizzo (`spender`) di spendere.

&nbsp;

```solidity
    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

La funzione `approve` crea una tolleranza. Assicurati di leggere il messaggio sui rischi di utilizzo improprio. In Ethereum puoi controllare l'ordine delle tue transazioni, ma non puoi controllare l'ordine con cui le transazioni altrui saranno eseguite, a meno che tu tenga in sospeso la tua transazione finché non vedi che la transazione dell'altro lato ha avuto luogo.

&nbsp;

```solidity
    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Infine, `transferFrom` è usata dallo spender per spendere concretamente il margine di tolleranza.

&nbsp;

```solidity

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Questi eventi sono emessi quando lo stato del contratto ERC-20 cambia.

## Il Contratto effettivo {#the-actual-contract}

Si tratta del contratto vero e proprio che implementa lo standard ERC-20, [preso da qui](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol). Non è destinato a essere utilizzato così com'è, ma puoi [ereditare](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm) la sua struttura ed estenderla per ottenere un qualcosa di utilizzabile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### Dichiarazioni relative all'importazione {#import-statements}

Oltre alle definizioni d'interfaccia summenzionate, la definizione del contratto importa altri due file:

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol` è la definizione necessaria per usare [OpenGSN](https://www.opengsn.org/), un sistema che consente agli utenti senza ether di usare la blockchain. Tieni conto che questa è una versione obsoleta. Se vuoi integrare con OpenGSN [usa questo tutorial](https://docs.opengsn.org/javascript-client/tutorial.html).
- [La libreria SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/), usata per effettuare addizioni e sottrazioni senza sovraflussi. È necessaria perché altrimenti una persona potrebbe in qualche modo avere un token, spenderne due e poi ritrovarsi con 2^256-1.

&nbsp;

Questo commento spiega lo scopo del contratto.

```solidity
/**
 * @dev Implementation of the {IERC20} interface.
 *
 * This implementation is agnostic to the way tokens are created. This means
 * that a supply mechanism has to be added in a derived contract using {_mint}.
 * For a generic mechanism see {ERC20PresetMinterPauser}.
 *
 * TIP: For a detailed writeup see our guide
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[How
 * to implement supply mechanisms].
 *
 * We have followed general OpenZeppelin guidelines: functions revert instead
 * of returning `false` on failure. This behavior is nonetheless conventional
 * and does not conflict with the expectations of ERC20 applications.
 *
 * Additionally, an {Approval} event is emitted on calls to {transferFrom}.
 * This allows applications to reconstruct the allowance for all accounts just
 * by listening to said events. Other implementations of the EIP may not emit
 * these events, as it isn't required by the specification.
 *
 * Finally, the non-standard {decreaseAllowance} and {increaseAllowance}
 * functions have been added to mitigate the well-known issues around setting
 * allowances. See {IERC20-approve}.
 */

```

### Composizione del contratto {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

Questa riga specifica l'eredità, in questo caso da `IERC20` da sopra e `Context`, per OpenGSN.

&nbsp;

```solidity

    using SafeMath for uint256;

```

Questa riga allega la libreria `SafeMath` al tipo `uint256`. Puoi trovare questa libreria [qui](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol).

### Definizioni delle variabili {#variable-definitions}

Queste definizioni specificano le variabili di stato del contratto. Queste variabili sono dichiarate come `private`, ma ciò significa solo che gli altri contratti sulla blockchain non possono leggerle. _Non ci sono segreti sulla blockchain_, il software su ogni nodo ha lo stato di ciascun contratto in ogni blocco. Per convenzione, le variabili di stato sono denominate `_<something>`.

Le prime due variabili sono di [mappatura](https://www.tutorialspoint.com/solidity/solidity_mappings.htm), il che significa che si comportano più o meno come [insiemi associativi](https://wikipedia.org/wiki/Associative_array), se con la differenza che le chiavi sono valori numerici. La memoria è allocata solo per le voci che hanno valori differenti dal default (zero).

```solidity
    mapping (address => uint256) private _balances;
```

La prima mappatura, `_balances` è composta da indirizzi e dai rispettivi saldi di questo token. Per accedere al saldo, usa questa sintassi: `_balances[<address>]`.

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

Questa variabile, `_allowances`, memorizza i margini di tolleranza spiegati in precedenza. Il primo indice è il proprietario dei token e il secondo è il contratto con il margine di tolleranza. Per accedere all'importo che l'indirizzo A può spendere dal conto dell'indirizzo B, usa `_allowances[B][A]`.

&nbsp;

```solidity
    uint256 private _totalSupply;
```

Come suggerisce il nome, questa variabile tiene traccia della fornitura totale di token.

&nbsp;

```solidity
    string private _name;
    string private _symbol;
    uint8 private _decimals;
```

Queste tre variabili sono usate per migliorare la leggibilità. Le prime due sono autoesplicative, ma `_decimals` no.

Da un lato, Ethereum non ha un numero in virgola mobile o variabili frazionali. Dall'altro, gli esseri vogliono la libertà di dividere i token. Un motivo per cui è stato scelto l'oro per gli scambi era la difficoltà di dare il resto quando qualcuno voleva comprare una quantità di mucca equivalente a un'anatra.

La soluzione è tenere traccia degli interi e, al posto del token reale, contare un token frazionale, quasi privo di valore. Nel caso dell'ether, il token frazionale è detto wei e 10^18 wei sono pari a un ETH. Mentre scriviamo questo articolo, 10.000.000.000.000 wei corrispondono a circa un centesimo di dollaro americano o di euro.

Le applicazioni devono sapere come mostrare il saldo di token. Se un utente ha 3.141.000.000.000.000.000 wei, vuol dire che ha in mano 3,14 ETH? O forse 31,41 ETH? O magari 3.141 ETH? Nel caso dell'ether, è definito a 10^18 wei per ETH, ma per il tuo token, puoi selezionare un valore differente. Se dividere il token non ha senso, puoi usare un valore `_decimals` di zero. Se vuoi usare lo stesso standard come ETH, usa il valore **18**.

### Il costruttore {#the-constructor}

```solidity
    /**
     * @dev Sets the values for {name} and {symbol}, initializes {decimals} with
     * a default value of 18.
     *
     * To select a different value for {decimals}, use {_setupDecimals}.
     *
     * All three of these values are immutable: they can only be set once during
     * construction.
     */
    constructor (string memory name_, string memory symbol_) public {
        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

Il costruttore viene chiamato alla prima creazione del contratto. Per convenzione, i parametri della funzione sono denominati `<something>_`.

### Funzioni dell'interfaccia utente {#user-interface-functions}

```solidity
    /**
     * @dev Returns the name of the token.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Returns the number of decimals used to get its user representation.
     * For example, if `decimals` equals `2`, a balance of `505` tokens should
     * be displayed to a user as `5,05` (`505 / 10 ** 2`).
     *
     * Tokens usually opt for a value of 18, imitating the relationship between
     * ether and wei. This is the value {ERC20} uses, unless {_setupDecimals} is
     * called.
     *
     * NOTE: This information is only used for _display_ purposes: it in
     * no way affects any of the arithmetic of the contract, including
     * {IERC20-balanceOf} and {IERC20-transfer}.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

Queste funzioni, `name`, `symbol`, e `decimals` aiutano le interfacce utente a conoscere il tuo contratto, in modo da visualizzarlo correttamente.

Il tipo di restituzione è `string memory`, a significare che la restituzione è una stringa archiviata in memoria. Le variabili, come le stringhe, sono memorizzabili in tre posizioni:

|               | Durata                  | Accesso al contratto | Costo del gas                                                                      |
| ------------- | ----------------------- | -------------------- | ---------------------------------------------------------------------------------- |
| Memoria       | Chiamata della funzione | Lettura/Scrittura    | Decine o centinaia (maggiori per maggiori posizioni)                               |
| Calldata      | Chiamata della funzione | Sola Lettura         | Inutilizzabile come tipo di restituzione, solo un tipo di parametro della funzione |
| Archiviazione | Fino alla modifica      | Lettura/Scrittura    | Elevato (800 per la lettura, 20.000 per la scrittura)                              |

In questo caso, `memory` è la scelta migliore.

### Informazioni di lettura del token {#read-token-information}

Queste sono funzioni che forniscono informazioni sul token, la fornitura totale o il saldo di un conto.

```solidity
    /**
     * @dev See {IERC20-totalSupply}.
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
```

La funzione `totalSupply` restituisce la fornitura totale di token.

&nbsp;

```solidity
    /**
     * @dev See {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
```

Leggi il saldo di un conto. Nota che chiunque può ottenere il saldo del conto di qualcun altro. Non ha senso provare a nascondere queste informazioni, perché sono comunque disponibili su ogni nodo. _Non ci sono segreti sulla blockchain._

### Trasferire token {#transfer-tokens}

```solidity
    /**
     * @dev See {IERC20-transfer}.
     *
     * Requirements:
     *
     * - `recipient` cannot be the zero address.
     * - the caller must have a balance of at least `amount`.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

La funzione `transfer` è chiamata per trasferire i token dal conto del mittente a un altro conto. Nota che anche se viene restituito un valore booleano, quel valore è sempre **true**. Se il trasferimento fallisce, il contratto ripristina la chiamata.

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

La funzione `_transfer` fa il lavoro effettivo. È una funzione privata, chiamabile solo da altre funzioni del contratto. Per convenzione le funzioni private sono denominate `_<something>`, come le variabili di stato.

Normalmente, in Solidity usiamo `msg.sender` per il mittente del messaggio. Tuttavia, ciò corrompe [OpenGSN](http://opengsn.org/). Se vogliamo consentire transazioni senza ether con il nostro token, dobbiamo usare `_msgSender()`. Restituisce `msg.sender` per le transazioni normali, ma per quelle senza ether restituisce il firmatario originale e non il contratto che ha trasmesso il messaggio.

### Funzioni di tolleranza {#allowance-functions}

Sono le funzioni che implementano il margine di tolleranza: `allowance`, `approve`, `transferFrom` e `_approve`. Inoltre, l'implementazione di OpenZeppelin va oltre lo standard di base e include alcune funzionalità che migliorano la sicurezza: `increaseAllowance` e `decreaseAllowance`.

#### La funzione di tolleranza {#allowance}

```solidity
    /**
     * @dev See {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

La funzione `allowance` consente a chiunque di verificare qualsiasi margine di tolleranza.

#### La funzione di approvazione {#approve}

```solidity
    /**
     * @dev See {IERC20-approve}.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

Questa funzione viene chiamata per creare un margine di tolleranza. È simile alla suddetta funzione `transfer`:

- La funzione chiama semplicemente una funzione interna (in questo caso, `_approve`), che fa il lavoro vero e proprio.
- La funzione restituisce `true` (se va a buon fine), altrimenti si ripristina.

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

Usiamo le funzioni interne per minimizzre il numero di posti in cui si verificano cambi di stato. _Qualsiasi_ funzione che cambia stato costituisce un potenziale rischio di sicurezza, che va controllato per sicurezza. Così facendo riduciamo il rischio di conseguenze negative.

#### La funzione transferFrom {#transferFrom}

È la funzione chiamata dallo spender per spendere un margine di tolleranza. Richiede due operazioni: trasferire l'importo speso e ridurre il margine di tolleranza in misura pari allo stesso importo.

```solidity
    /**
     * @dev See {IERC20-transferFrom}.
     *
     * Emits an {Approval} event indicating the updated allowance. This is not
     * required by the EIP. See the note at the beginning of {ERC20}.
     *
     * Requirements:
     *
     * - `sender` and `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     * - the caller must have allowance for ``sender``'s tokens of at least
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

La funzione `a.sub(b, "message")` produce due azioni. Innanzi tutto calcola `a-b`, ovvero il nuovo margine di tolleranza (allowance). Quindi controlla che tale risultato non sia negativo. Se lo è, la chiamata si ripristina con il messaggio fornito. Occorre notare che, in caso di ripristino, qualsiasi elaborazione effettuata in precedenza durante tale chiamata viene ignorata, così da evitare di dover annullare il `_transfer`.

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

#### Aggiunte di sicurezza di OpenZeppelin {#openzeppelin-safety-additions}

È pericoloso impostare un margine di tolleranza diverso da zero su un altro valore diverso da zero, perché puoi controllare solo l'ordine delle tue transazioni, ma non di quelle altrui. Immagina che ci siano due utenti: Alice, una ragazza ingenua, e Bill, un uomo disonesto. Alice vuole ricevere da Bill un servizio che secondo lei costa cinque token, quindi concede a Bill un margine di tolleranza di cinque token.

Poi qualcosa cambia e il prezzo di Bill aumenta a dieci token. Alice, che è ancora interessata a ricevere il servizio, invia una transazione che imposta il margine di tolleranza di Bill a dieci. Quando Bill vede questa nuova transazione nel pool, invia una transazione che spende i cinque token di Alice e ha un prezzo di gas molto più elevato, quindi sarà minato più velocemente. In questo modo Bill può spendere prima i cinque token e poi, una volta minato il nuovo margine di tolleranza di Alice, spenderne altri dieci per un prezzo complessivo di quindici token, più di quanto Alice volesse autorizzare. Questa tecnica è detta [front-running](https://consensys.github.io/smart-contract-best-practices/attacks/#front-running)

| Transazione di Alice | Nonce di Alice | Transazione di Bill           | Nonce di Bill | Tolleranza di Bill | Entrate totali di Bill da Alice |
| -------------------- | -------------- | ----------------------------- | ------------- | ------------------ | ------------------------------- |
| approve(Bill, 5)     | 10             |                               |               | 5                  | 0                               |
|                      |                | transferFrom(Alice, Bill, 5)  | 10,123        | 0                  | 5                               |
| approve(Bill, 10)    | 11             |                               |               | 10                 | 5                               |
|                      |                | transferFrom(Alice, Bill, 10) | 10,124        | 0                  | 15                              |

Per evitare questo problema, queste due funzioni (`increaseAllowance` e `decreaseAllowance`) ti consentono di modificare il margine di tolleranza di un importo specifico. Quindi, se Bill avesse già speso cinque token, potrà spenderne solo altri cinque. A seconda delle tempistiche, esistono due modi in cui questo può funzionare, entrambi terminano con Bill che riceve solo dieci token:

A:

| Transazione di Alice       | Nonce di Alice | Transazione di Bill          | Nonce di Bill | Tolleranza di Bill | Entrate totali di Bill da Alice |
| -------------------------- | -------------: | ---------------------------- | ------------: | -----------------: | ------------------------------- |
| approve(Bill, 5)           |             10 |                              |               |                  5 | 0                               |
|                            |                | transferFrom(Alice, Bill, 5) |        10,123 |                  0 | 5                               |
| increaseAllowance(Bill, 5) |             11 |                              |               |            0+5 = 5 | 5                               |
|                            |                | transferFrom(Alice, Bill, 5) |        10,124 |                  0 | 10                              |

B:

| Transazione di Alice       | Nonce di Alice | Transazione di Bill           | Nonce di Bill | Tolleranza di Bill | Entrate totali di Bill da Alice |
| -------------------------- | -------------: | ----------------------------- | ------------: | -----------------: | ------------------------------: |
| approve(Bill, 5)           |             10 |                               |               |                  5 |                               0 |
| increaseAllowance(Bill, 5) |             11 |                               |               |           5+5 = 10 |                               0 |
|                            |                | transferFrom(Alice, Bill, 10) |        10,124 |                  0 |                              10 |

```solidity
    /**
     * @dev Atomically increases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

La funzione `a.add(b)` è un'aggiunta sicura. Nell'improbabile caso in cui `a`+`b`>=`2^256`, non ha luogo il mormale avvolgimento come avviene con l'addizione normale.

```solidity

    /**
     * @dev Atomically decreases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     * - `spender` must have allowance for the caller of at least
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: decreased allowance below zero"));
        return true;
    }
```

### Funzioni che modificano le informazioni del token {#functions-that-modify-token-information}

Queste sono le quattro funzioni che effettuano il lavoro effettivo: `_transfer`, `_mint`, `_burn` e `_approve`.

#### La funzione \_transfer {#\_transfer}

```solidity
    /**
     * @dev Moves tokens `amount` from `sender` to `recipient`.
     *
     * This is internal function is equivalent to {transfer}, and can be used to
     * e.g. implement automatic token fees, slashing mechanisms, etc.
     *
     * Emits a {Transfer} event.
     *
     * Requirements:
     *
     * - `sender` cannot be the zero address.
     * - `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

La funzione `_transfer` trasferisce i token da un conto all'altro. È chiamata sia da `transfer` (per i trasferimenti dal conto del mittente) sia da `transferFrom` (per usare le tolleranze e trasferire dal conto di qualcun altro).

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

Nessuno possiedere realmente l'indirizzo zero in Ethereum (ciò significa che nessuno conosce una chiave privata la cui chiave pubblica corrispondente è trasformata all'indirizzo zero). Quando si usa quell'indirizzo, in genere si tratta di un bug del software, quindi falliamo se usiamo l'indirizzo zero come mittente o destinatario.

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

Esistono due modi per usare questo contratto:

1. Usarlo come modello per il proprio codice
1. [Ereditare da esso](https://www.bitdegree.org/learn/solidity-inheritance) e sovrascrivere solo le funzioni da modificare

Il secondo metodo è di gran lunga migliore perché il codice ERC-20 di OpenZeppelin è stato già controllato e mostrato come sicuro. Quando si usa l'eredità, le funzioni da modificare sono note e, per fidarsi del tuo contratto, gli altri devono controllare solo quelle funzioni specifiche.

Spesso è utile eseguire una funzione ogni volta che i token passano di mano. Tuttavia, `_transfer` è una funzione davvero importante ed esiste il rischio di scriverla in modo non sicuro (vedi sotto), quindi è meglio non sovrascriverla. La soluzione è `_beforeTokenTransfer`, una [funzione hook](https://wikipedia.org/wiki/Hooking). Puoi sovrascrivere questa funzione, che verrà quindi richiamata a ogni trasferimento.

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

Queste sono le righe che effettuano concretamente il trasferimento. Nota che non c'è **nulla** tra di esse e che sottraiamo l'importo trasferito dal mittente prima di aggiungerlo al destinatario. Questo passaggio è importante perché, se ci fosse una chiamata a un contratto diverso nel mezzo, potrebbe essere utilizzata per barare su questo contratto. Questo metodo di trasferimento è atomico, in quanto nulla può verificarsi mentre è in corso.

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

Infine, emetti un evento `Transfer`. Gli eventi non sono accessibili agli smart contract, ma il codice eseguito al di fuori della blockchain può ascoltarli e reagire a essi. Ad esempio, un portafoglio può tracciare la ricezione di altri token da parte del proprietario.

#### Le funzioni \_mint e \_burn {#\_mint-and-\_burn}

Queste due funzioni (`_mint` e `_burn`) modificano la fornitura totale di token. Sono interne e non esiste alcuna funzione che le chiami in questo contratto, quindi sono utili solo se erediti dal contratto e aggiungi la tua logica per decidere a quali condizioni coniare nuovi token o bruciare quelli esistenti.

**NOTA:** Ogni token ERC-20 ha la propria logica commerciale che detta la gestione del token. Ad esempio, un contratto di fornitura fissa potrebbe chiamare solo `_mint` nel costruttore e mai `_burn`. Un contratto che vende token chiamerà `_mint` quando è pagato e chiamerà presumibilmente `_burn` a un certo punto per evitare l'inflazione incontrollata.

```solidity
    /** @dev Creates `amount` tokens and assigns them to `account`, increasing
     * the total supply.
     *
     * Emits a {Transfer} event with `from` set to the zero address.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");
        _beforeTokenTransfer(address(0), account, amount);
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Assicurati di aggiornare `_totalSupply` quando il numero totale di token cambia.

&nbsp;

```
    /**
     * @dev Destroys `amount` tokens from `account`, reducing the
     * total supply.
     *
     * Emits a {Transfer} event with `to` set to the zero address.
     *
     * Requirements:
     *
     * - `account` cannot be the zero address.
     * - `account` must have at least `amount` tokens.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }
```

La funzione `_burn` è quasi identica a `_mint`, con la differenza che va in senso opposto.

#### La funzione \_approve {#\_approve}

Questa è la funzione che specifica concretamente i margini di tolleranza. Nota che consente a un proprietario di specificare una tolleranza superiore al saldo corrente del proprietario. Questo non è un problema, poiché il saldo è controllato al momento del trasferimento, quando potrebbe differire dal saldo alla creazione del margine di tolleranza.

```solidity
    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * This internal function is equivalent to `approve`, and can be used to
     * e.g. set automatic allowances for certain subsystems, etc.
     *
     * Emits an {Approval} event.
     *
     * Requirements:
     *
     * - `owner` cannot be the zero address.
     * - `spender` cannot be the zero address.
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
```

&nbsp;

Emette un evento `Approval`. In base a come è scritta l'applicazione, il contratto dello spender può essere informato dell'approvazione dal proprietario o da un server che monitora questi eventi.

```solidity
        emit Approval(owner, spender, amount);
    }

```

### Modificare la variabile dei decimali {#modify-the-decimals-variable}

```solidity


    /**
     * @dev Sets {decimals} to a value other than the default one of 18.
     *
     * WARNING: This function should only be called from the constructor. Most
     * applications that interact with token contracts will not expect
     * {decimals} to ever change, and may work incorrectly if it does.
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

Questa funzione modifica la variabile `_decimals`, usata per indicare alle interfacce utente come interpretare l'importo. Suggeriamo di chiamarla dal costruttore. Sarebbe disonesto chiamarla in qualsiasi punto successivo e le applicazioni non sono progettate per gestirla.

### Hook {#hooks}

```solidity

    /**
     * @dev Hook that is called before any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * will be to transferred to `to`.
     * - when `from` is zero, `amount` tokens will be minted for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens will be burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

Questa è la funzione hook da chiamare durante i trasferimenti. Qui è vuota, ma se hai bisogno di fare qualcosa, basta sovrascriverla.

# Conclusioni {#conclusion}

A titolo di ripasso, ecco alcune delle idee più importanti in questo contrato (a mio parere, probabilmente il tuo sarà diverso):

- _Non ci sono segreti sulla blockchain_. Ogni informazione accessibile a uno smart contract è disponibile per il mondo intero.
- Puoi controllare l'ordine delle tue transazioni, ma non come si verificano quelle altrui. Per questo modificare un'indennità può esser pericoloso, perché consente allo spender di spendere la somma di entrambi i margini di tolleranza.
- I valori di tipo `uint256` si avvolgono o, in altre parole, _0-1=2^256-1_. Se questo non è il comportamento desiderato, devi verificarlo (o usare la libreria SafeMath più adatta alle tue esigenze). Nota che ciò è cambiato in [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html).
- Effettua tutte le modifiche di un tipo specifico in un luogo specifico, così da semplificare i controlli. Per questo abbiamo, ad esempio, `_approve`, chiamata da `approve`, `transferFrom`, `increaseAllowance` e `decreaseAllowance`
- I cambi di stato dovrebbero essere atomici, senza altre azioni nel mezzo (come si può vedere in `_transfer`). Questo perché durante il cambio di stato hai uno stato incoerente. Ad esempio, tra il momento in cui detrai dal saldo del mittente e il momento in cui aggiungi al saldo del destinatario, esistono meno token di quanti dovrebbero essercene. Questa condizione potrebbe essere esposta ad abusi se vengono effettuate operazioni tra di essi, specialmente nel caso di chiamate a un contratto differente.

Ora che hai visto come è scritto il contratto ERC-20 di OpenZeppelin e specialmente come viene reso più sicuro, vai a scrivere i tuoi contratti sicuri e le tue applicazioni.
