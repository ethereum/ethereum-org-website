---
title: "Guida dettagliata al contratto ERC-20"
description: Cosa c'è nel contratto ERC-20 di OpenZeppelin e perché?
author: Ori Pomerantz
lang: it
tags: [ "Solidity", "erc-20" ]
skill: beginner
published: 2021-03-09
---

## Introduzione {#introduction}

Uno degli utilizzi più comuni di Ethereum è quello di permettere a un gruppo di persone di creare un token scambiabile, che potremmo definire la loro valuta. Questi token seguono in genere uno standard,
[ERC-20](/developers/docs/standards/tokens/erc-20/). Questo standard permette di scrivere strumenti, come pool di liquidità e portafogli, compatibili con tutti i token ERC-20. In questo articolo analizzeremo l'[implementazione ERC20 di OpenZeppelin in Solidity](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol), nonché la [definizione dell'interfaccia](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol).

Questo è un codice sorgente annotato. Se vuoi implementare l'ERC-20,
[leggi questa guida](https://docs.openzeppelin.com/contracts/2.x/erc20-supply).

## L'interfaccia {#the-interface}

Lo scopo di uno standard come l'ERC-20 è di consentire molte implementazioni di token che siano interoperabili tra le varie applicazioni, quali portafogli ed exchange decentralizzati. Per raggiungere questo obiettivo, creiamo un'[interfaccia](https://www.geeksforgeeks.org/solidity/solidity-basics-of-interface/). Qualsiasi codice che debba usare il contratto del token
può usare le stesse definizioni nell'interfaccia ed essere compatibile con tutti i contratti di token che la usano, che si tratti di un portafoglio come
MetaMask, una dApp come etherscan.io o un contratto diverso come un pool di liquidità.

![Illustrazione dell'interfaccia ERC-20](erc20_interface.png)

Se sei un programmatore esperto, probabilmente ricorderai di aver visto costrutti simili in [Java](https://www.w3schools.com/java/java_interface.asp) o persino nei [file header C](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html).

Questa è una definizione dell'[Interfaccia ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) di OpenZeppelin. È una traduzione dello [standard leggibile dall'uomo](https://eips.ethereum.org/EIPS/eip-20) in codice Solidity. Naturalmente, l'interfaccia
stessa non definisce _come_ fare nulla. Questo è spiegato nel codice sorgente del contratto qui sotto.

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

I file Solidity dovrebbero includere un identificatore di licenza. [Puoi vedere l'elenco delle licenze qui](https://spdx.org/licenses/). Se hai bisogno di una licenza diversa,
puoi semplicemente spiegarlo nei commenti.

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Il linguaggio Solidity si sta ancora evolvendo rapidamente e le nuove versioni potrebbero non essere compatibili con il codice obsoleto
([vedi qui](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)). Pertanto, è una buona idea specificare non solo una versione minima
del linguaggio, ma anche una versione massima, l'ultima con cui hai testato il codice.

&nbsp;

```solidity
/**
 * @dev Interfaccia dello standard ERC20 come definito nell'EIP.
 */
```

Il `@dev` nel commento fa parte del [formato NatSpec](https://docs.soliditylang.org/en/develop/natspec-format.html), usato per produrre
la documentazione dal codice sorgente.

&nbsp;

```solidity
interface IERC20 {
```

Per convenzione, i nomi delle interfacce iniziano con `I`.

&nbsp;

```solidity
    /**
     * @dev Restituisce la quantità di token esistenti.
     */
    function totalSupply() external view returns (uint256);
```

Questa funzione è `external`, il che significa che [può essere chiamata solo dall'esterno del contratto](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2).
Restituisce la fornitura totale di token nel contratto. Questo valore è restituito usando il tipo più comune in Ethereum, 256 bit senza segno (256 bit è la dimensione
nativa della parola dell'EVM). Questa funzione è anche una `view`, il che significa che non modifica lo stato, quindi può essere eseguita su un singolo nodo anziché da ogni nodo della blockchain. Questo tipo di funzione non genera una transazione e non costa [gas](/developers/docs/gas/).

**Nota:** in teoria, potrebbe sembrare che un creatore di un contratto possa imbrogliare restituendo una fornitura totale inferiore al valore reale, facendo apparire ogni token
più prezioso di quanto non sia in realtà. Tuttavia, questo timore ignora la vera natura della blockchain. Tutto ciò che accade sulla blockchain può essere verificato da
ogni nodo. Per raggiungere questo obiettivo, il codice in linguaggio macchina e lo spazio di archiviazione di ogni contratto sono disponibili su ogni nodo. Sebbene non sia obbligatorio pubblicare il codice Solidity
per il tuo contratto, nessuno ti prenderebbe sul serio se non pubblicassi il codice sorgente e la versione di Solidity con cui è stato compilato, in modo che possa
essere verificato rispetto al codice in linguaggio macchina fornito.
Ad esempio, vedi [questo contratto](https://eth.blockscout.com/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD?tab=contract).

&nbsp;

```solidity
    /**
     * @dev Restituisce la quantità di token posseduti da `account`.
     */
    function balanceOf(address account) external view returns (uint256);
```

Come suggerisce il nome, `balanceOf` restituisce il saldo di un account. Gli account Ethereum sono identificati in Solidity tramite il tipo `address`, che contiene 160 bit.
È anche `external` e `view`.

&nbsp;

```solidity
    /**
     * @dev Sposta una quantità `amount` di token dall'account del chiamante al `recipient`.
     *
     * Restituisce un valore booleano che indica se l'operazione è riuscita.
     *
     * Emette un evento {Transfer}.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

La funzione `transfer` trasferisce dei token dal chiamante a un indirizzo diverso. Ciò implica una modifica di stato, quindi non è una `view`.
Quando un utente chiama questa funzione, crea una transazione e consuma del gas. Emette anche un evento, `Transfer`, per informare tutti
sulla blockchain dell'evento.

La funzione ha due tipi di output per due diversi tipi di chiamanti:

- Utenti che chiamano la funzione direttamente da un'interfaccia utente. In genere, l'utente invia una transazione
  e non attende una risposta, il che potrebbe richiedere un tempo indefinito. L'utente può vedere cosa è successo
  cercando la ricevuta della transazione (identificata dall'hash della transazione) o l'evento
  `Transfer`.
- Altri contratti, che chiamano la funzione come parte di una transazione complessiva. Questi contratti ottengono il risultato immediatamente,
  perché vengono eseguiti nella stessa transazione, quindi possono usare il valore di ritorno della funzione.

Lo stesso tipo di output è creato dalle altre funzioni che modificano lo stato del contratto.

&nbsp;

Le autorizzazioni consentono a un account di spendere alcuni token che appartengono a un proprietario diverso.
Questo è utile, ad esempio, per i contratti che fungono da venditori. I contratti non possono
monitorare gli eventi, quindi se un acquirente trasferisse token al contratto del venditore
direttamente, quel contratto non saprebbe di essere stato pagato. Invece, l'acquirente autorizza il contratto
del venditore a spendere un certo importo, e il venditore trasferisce tale importo.
Ciò avviene tramite una funzione chiamata dal contratto del venditore, in modo che il contratto del venditore
possa sapere se la chiamata ha avuto successo.

```solidity
    /**
     * @dev Restituisce il numero residuo di token che `spender` potrà
     * spendere per conto di `owner` tramite {transferFrom}. Il valore predefinito
     * è zero.
     *
     * Questo valore cambia quando vengono chiamate {approve} o {transferFrom}.
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

La funzione `allowance` consente a chiunque di interrogare per vedere qual è l'autorizzazione che un
indirizzo (`owner`) concede a un altro indirizzo (`spender`) per la spesa.

&nbsp;

```solidity
    /**
     * @dev Imposta `amount` come autorizzazione di `spender` sui token del chiamante.
     *
     * Restituisce un valore booleano che indica se l'operazione è riuscita.
     *
     * IMPORTANTE: fai attenzione al fatto che la modifica di un'autorizzazione con questo metodo comporta il rischio
     * che qualcuno possa utilizzare sia la vecchia che la nuova autorizzazione a causa di un
     * sfortunato ordine delle transazioni. Una possibile soluzione per mitigare questa race
     * condition è ridurre prima l'autorizzazione dello spender a 0 e impostare il
     * valore desiderato in seguito:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emette un evento {Approval}.
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

La funzione `approve` crea un'autorizzazione. Assicurati di leggere il messaggio sui
rischi di utilizzo improprio. In Ethereum controlli l'ordine delle tue transazioni,
ma non puoi controllare l'ordine in cui verranno eseguite le transazioni di altre persone,
a meno che non invii la tua transazione solo dopo aver visto che la transazione
dell'altra parte è avvenuta.

&nbsp;

```solidity
    /**
     * @dev Sposta una quantità `amount` di token da `sender` a `recipient` usando il
     * meccanismo di autorizzazione. L'importo `amount` viene quindi dedotto dall'autorizzazione
     * del chiamante.
     *
     * Restituisce un valore booleano che indica se l'operazione è riuscita.
     *
     * Emette un evento {Transfer}.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Infine, `transferFrom` viene utilizzato dallo spender per spendere effettivamente l'autorizzazione.

&nbsp;

```solidity

    /**
     * @dev Emesso quando i token `value` vengono spostati da un account (`from`) a
     * un altro (`to`).
     *
     * Nota che `value` può essere zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emesso quando l'autorizzazione di uno `spender` per un `owner` è impostata da
     * una chiamata a {approve}. `value` è la nuova autorizzazione.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Questi eventi vengono emessi quando lo stato del contratto ERC-20 cambia.

## Il contratto effettivo {#the-actual-contract}

Questo è il contratto effettivo che implementa lo standard ERC-20,
[tratto da qui](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Non è destinato a essere usato così com'è, ma puoi [ereditare](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm) da esso per estenderlo a qualcosa di utilizzabile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### Dichiarazioni di importazione {#import-statements}

Oltre alle definizioni di interfaccia di cui sopra, la definizione del contratto importa altri due file:

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol` contiene le definizioni necessarie per utilizzare [OpenGSN](https://www.opengsn.org/), un sistema che permette agli utenti senza ether di usare la blockchain. Si noti che questa è una versione obsoleta; se si desidera integrare con OpenGSN, [utilizzare questa guida](https://docs.opengsn.org/javascript-client/tutorial.html).
- [La libreria SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/), che previene gli overflow/underflow aritmetici per le versioni di Solidity **<0.8.0**. In Solidity ≥0.8.0, le operazioni aritmetiche eseguono automaticamente il revert in caso di overflow/underflow, rendendo SafeMath non necessaria. Questo contratto usa SafeMath per la retrocompatibilità con le versioni precedenti del compilatore.

&nbsp;

Questo commento spiega lo scopo del contratto.

```solidity
/**
 * @dev Implementazione dell'interfaccia {IERC20}.
 *
 * Questa implementazione è agnostica al modo in cui vengono creati i token. Ciò significa
 * che un meccanismo di fornitura deve essere aggiunto in un contratto derivato usando {_mint}.
 * Per un meccanismo generico, vedere {ERC20PresetMinterPauser}.
 *
 * SUGGERIMENTO: per una descrizione dettagliata, vedere la nostra guida
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[Come
 * implementare i meccanismi di fornitura].
 *
 * Abbiamo seguito le linee guida generali di OpenZeppelin: le funzioni eseguono il revert invece
 * di restituire 'false' in caso di fallimento. Questo comportamento è comunque convenzionale
 * e non è in conflitto con le aspettative delle applicazioni ERC20.
 *
 * Inoltre, un evento {Approval} viene emesso sulle chiamate a {transferFrom}.
 * Ciò consente alle applicazioni di ricostruire l'autorizzazione (allowance) per tutti i conti semplicemente
 * rimanendo in ascolto di tali eventi. Altre implementazioni dell'EIP potrebbero non emettere
 * questi eventi, poiché non è richiesto dalla specifica.
 *
 * Infine, sono state aggiunte le funzioni non standard {decreaseAllowance} e {increaseAllowance}
 * per mitigare i noti problemi relativi all'impostazione
 * delle autorizzazioni (allowance). Vedere {IERC20-approve}.
 */
```

### Definizione del contratto {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

Questa riga specifica l'eredità, in questo caso da `IERC20` da sopra e `Context`, per OpenGSN.

&nbsp;

```solidity

    using SafeMath for uint256;

```

Questa riga associa la libreria `SafeMath` al tipo `uint256`. È possibile trovare questa libreria [qui](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol).

### Definizioni delle variabili {#variable-definitions}

Queste definizioni specificano le variabili di stato del contratto. Queste variabili sono dichiarate `private`, ma ciò significa solo che altri contratti sulla blockchain non possono leggerle. _Non ci sono segreti sulla blockchain_, il software su ogni nodo ha lo stato di ogni contratto in ogni blocco. Per convenzione, le variabili di stato sono denominate `_<something>`.

Le prime due variabili sono [mapping](https://www.tutorialspoint.com/solidity/solidity_mappings.htm), il che significa che si comportano all'incirca come [array associativi](https://wikipedia.org/wiki/Associative_array), con la differenza che le chiavi sono valori numerici. Lo spazio di archiviazione viene allocato solo per le voci con valori diversi da quello predefinito (zero).

```solidity
    mapping (address => uint256) private _balances;
```

Il primo mapping, `_balances`, associa gli indirizzi ai rispettivi saldi di questo token. Per accedere al saldo, utilizzare la seguente sintassi: `_balances[<address>]`.

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

Questa variabile, `_allowances`, memorizza le autorizzazioni (allowance) spiegate in precedenza. Il primo indice è il proprietario dei token e il secondo è il contratto con l'autorizzazione (allowance). Per accedere all'importo che l'indirizzo A può spendere dal conto dell'indirizzo B, usare `_allowances[B][A]`.

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

Da un lato, Ethereum non dispone di variabili in virgola mobile o frazionarie. D'altro canto, alle persone piace poter dividere i token. Un motivo per cui è stato scelto l'oro per gli scambi era la difficoltà di dare il resto quando qualcuno voleva comprare una quantità di mucca equivalente a un'anatra.

La soluzione è tenere traccia dei numeri interi, ma contare, invece del token reale, un token frazionario che è quasi senza valore. Nel caso dell'ether, il token frazionario è detto wei e 10^18 wei equivalgono a un ETH. Al momento della stesura di questo articolo, 10.000.000.000.000 di wei corrispondono a circa un centesimo di dollaro statunitense o di euro.

Le applicazioni devono sapere come visualizzare il saldo del token. Se un utente ha 3.141.000.000.000.000.000 di wei, corrispondono a 3,14 ETH? 31,41 ETH? 3.141 ETH? Nel caso dell'ether, è definito che 10^18 wei corrispondono a un ETH, ma per il proprio token è possibile selezionare un valore diverso. Se dividere il token non ha senso, si può usare un valore di `_decimals` pari a zero. Se si desidera utilizzare lo stesso standard di ETH, usare il valore **18**.

### Il costruttore {#the-constructor}

```solidity
    /**
     * @dev Imposta i valori per {name} e {symbol}, inizializza {decimals} con
     * un valore predefinito di 18.
     *
     * Per selezionare un valore diverso per {decimals}, usare {_setupDecimals}.
     *
     * Tutti e tre questi valori sono immutabili: possono essere impostati solo una volta durante
     * la costruzione.
     */
    constructor (string memory name_, string memory symbol_) public {
        // In Solidity ≥0.7.0, 'public' è implicito e può essere omesso.

        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

Il costruttore viene chiamato alla prima creazione del contratto. Per convenzione, i parametri della funzione sono denominati `<something>_`.

### Funzioni dell'interfaccia utente {#user-interface-functions}

```solidity
    /**
     * @dev Restituisce il nome del token.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Restituisce il simbolo del token, di solito una versione più breve del nome.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Restituisce il numero di decimali usati per ottenere la sua rappresentazione utente.
     * Ad esempio, se `decimals` è uguale a `2`, un saldo di `505` token dovrebbe
     * essere visualizzato a un utente come `5,05` (`505 / 10 ** 2`).
     *
     * I token di solito optano per un valore di 18, imitando la relazione tra
     * ether e wei. Questo è il valore che {ERC20} usa, a meno che non venga chiamato {_setupDecimals}.
     *
     * NOTA: questa informazione è usata solo a scopo di _visualizzazione_: non
     * influenza in alcun modo l'aritmetica del contratto, inclusi
     * {IERC20-balanceOf} e {IERC20-transfer}.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

Queste funzioni, `name`, `symbol` e `decimals`, aiutano le interfacce utente a ottenere informazioni sul contratto, in modo da poterlo visualizzare correttamente.

Il tipo di ritorno è `string memory`, il che significa che viene restituita una stringa memorizzata in memoria. Le variabili, come le stringhe, possono essere memorizzate in tre posizioni:

|          | Durata                  | Accesso al contratto | Costo del gas                                                                                           |
| -------- | ----------------------- | -------------------- | ------------------------------------------------------------------------------------------------------- |
| Memoria  | Chiamata della funzione | Lettura/Scrittura    | Decine o centinaia (superiore per posizioni superiori)                               |
| Calldata | Chiamata della funzione | Sola Lettura         | Non può essere usato come tipo di ritorno, solo come tipo di parametro di una funzione. |
| Storage  | Fino alla modifica      | Lettura/Scrittura    | Elevato (800 per la lettura, 20.000 per la scrittura)                |

In questo caso, `memory` è la scelta migliore.

### Lettura delle informazioni sul token {#read-token-information}

Queste sono funzioni che forniscono informazioni sul token, sulla fornitura totale o sul saldo di un conto.

```solidity
    /**
     * @dev Vedere {IERC20-totalSupply}.
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
```

La funzione `totalSupply` restituisce la fornitura totale di token.

&nbsp;

```solidity
    /**
     * @dev Vedere {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
```

Legge il saldo di un conto. Si noti che chiunque è autorizzato a ottenere il saldo del conto di chiunque altro. Non ha senso provare a nascondere queste informazioni, perché sono comunque disponibili su ogni nodo. _Non ci sono segreti sulla blockchain._

### Trasferimento di token {#transfer-tokens}

```solidity
    /**
     * @dev Vedere {IERC20-transfer}.
     *
     * Requisiti:
     *
     * - `recipient` non può essere l'indirizzo zero.
     * - il chiamante deve avere un saldo di almeno `amount`.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

La funzione `transfer` è chiamata per trasferire i token dal conto del mittente a un altro. Si noti che, anche se restituisce un valore booleano, tale valore è sempre **true**. Se il trasferimento fallisce, il contratto esegue il revert della chiamata.

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

La funzione `_transfer` esegue il lavoro vero e proprio. È una funzione privata, che può essere chiamata solo da altre funzioni del contratto. Per convenzione, le funzioni private sono denominate `_<something>`, come le variabili di stato.

Normalmente in Solidity si usa `msg.sender` per il mittente del messaggio. Tuttavia, questo non è compatibile con [OpenGSN](http://opengsn.org/). Se si desidera consentire transazioni senza ether con il proprio token, è necessario utilizzare `_msgSender()`. Restituisce `msg.sender` per le transazioni normali, ma per quelle senza ether restituisce il firmatario originale e non il contratto che ha inoltrato il messaggio.

### Funzioni di autorizzazione (allowance) {#allowance-functions}

Queste sono le funzioni che implementano la funzionalità di autorizzazione (allowance): `allowance`, `approve`, `transferFrom` e `_approve`. Inoltre, l'implementazione di OpenZeppelin va oltre lo standard di base e include alcune funzionalità che migliorano la sicurezza: `increaseAllowance` e `decreaseAllowance`.

#### La funzione allowance {#allowance}

```solidity
    /**
     * @dev Vedere {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

La funzione `allowance` permette a chiunque di controllare qualsiasi autorizzazione (allowance).

#### La funzione approve {#approve}

```solidity
    /**
     * @dev Vedere {IERC20-approve}.
     *
     * Requisiti:
     *
     * - `spender` non può essere l'indirizzo zero.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

Questa funzione viene chiamata per creare un'autorizzazione (allowance). È simile alla funzione `transfer` di cui sopra:

- La funzione si limita a chiamare una funzione interna (in questo caso, `_approve`) che esegue il lavoro vero e proprio.
- La funzione restituisce `true` (in caso di successo) o esegue il revert (in caso contrario).

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

Usiamo le funzioni interne per ridurre al minimo il numero di punti in cui avvengono le modifiche di stato. _Qualsiasi_ funzione che modifica lo stato è un potenziale rischio per la sicurezza che deve essere controllato. In questo modo abbiamo meno possibilità di sbagliare.

#### La funzione transferFrom {#transferFrom}

Questa è la funzione che uno spender chiama per utilizzare un'autorizzazione (allowance). Ciò richiede due operazioni: trasferire l'importo speso e ridurre l'autorizzazione (allowance) di tale importo.

```solidity
    /**
     * @dev Vedere {IERC20-transferFrom}.
     *
     * Emette un evento {Approval} che indica l'autorizzazione (allowance) aggiornata. Questo non
     * è richiesto dall'EIP. Vedere la nota all'inizio di {ERC20}.
     *
     * Requisiti:
     *
     * - `sender` e `recipient` non possono essere l'indirizzo zero.
     * - `sender` deve avere un saldo di almeno `amount`.
     * - il chiamante deve disporre di un'autorizzazione (allowance) per i token di ``sender`` di almeno
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

La chiamata di funzione `a.sub(b, "messaggio")` esegue due operazioni. Innanzitutto, calcola `a-b`, che è la nuova autorizzazione (allowance).
In secondo luogo, controlla che il risultato non sia negativo. Se è negativo, la chiamata esegue il revert con il messaggio fornito. Si noti che quando una chiamata esegue il revert, qualsiasi elaborazione eseguita in precedenza durante tale chiamata viene ignorata, quindi non è necessario annullare il `_transfer`.

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: l'importo del trasferimento supera l'autorizzazione (allowance)"));
        return true;
    }
```

#### Aggiunte di sicurezza di OpenZeppelin {#openzeppelin-safety-additions}

È pericoloso impostare un'autorizzazione (allowance) non nulla su un altro valore non nullo, perché si può controllare solo l'ordine delle proprie transazioni, non quello degli altri. Immaginiamo due utenti: Alice, che è ingenua, e Bill, che è disonesto. Alice vuole un servizio da Bill, che pensa costi cinque token, quindi dà a Bill un'autorizzazione (allowance) di cinque token.

Poi qualcosa cambia e il prezzo di Bill sale a dieci token. Alice, che vuole ancora il servizio, invia una transazione che imposta l'autorizzazione (allowance) di Bill a dieci. Nel momento in cui Bill vede questa nuova transazione nel pool di transazioni, ne invia una che spende i cinque token di Alice e ha un prezzo del gas molto più alto, in modo che venga minata più velocemente. In questo modo Bill può spendere prima cinque token e poi,
una volta minata la nuova autorizzazione di Alice, spenderne altri dieci per un prezzo totale di quindici token, più di quanto
Alice intendesse autorizzare. Questa tecnica è chiamata
[front-running](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/#front-running)

| Transazione di Alice                 | Nonce di Alice | Transazione di Bill                              | Nonce di Bill          | Autorizzazione di Bill | Guadagno totale di Bill da Alice |
| ------------------------------------ | -------------- | ------------------------------------------------ | ---------------------- | ---------------------- | -------------------------------- |
| approve(Bill, 5)  | 10             |                                                  |                        | 5                      | 0                                |
|                                      |                | transferFrom(Alice, Bill, 5)  | 10.123 | 0                      | 5                                |
| approve(Bill, 10) | 11             |                                                  |                        | 10                     | 5                                |
|                                      |                | transferFrom(Alice, Bill, 10) | 10.124 | 0                      | 15                               |

Per evitare questo problema, queste due funzioni (`increaseAllowance` e `decreaseAllowance`) ti consentono
di modificare l'autorizzazione di un importo specifico. Quindi, se Bill avesse già speso cinque token, potrà
spenderne solo altri cinque. A seconda della tempistica, ci sono due modi in cui questo può funzionare, entrambi
terminano con Bill che riceve solo dieci token:

A:

| Transazione di Alice                          | Nonce di Alice | Transazione di Bill                             |          Nonce di Bill | Autorizzazione di Bill | Guadagno totale di Bill da Alice |
| --------------------------------------------- | -------------: | ----------------------------------------------- | ---------------------: | ---------------------: | -------------------------------- |
| approve(Bill, 5)           |             10 |                                                 |                        |                      5 | 0                                |
|                                               |                | transferFrom(Alice, Bill, 5) | 10.123 |                      0 | 5                                |
| increaseAllowance(Bill, 5) |             11 |                                                 |                        |                0+5 = 5 | 5                                |
|                                               |                | transferFrom(Alice, Bill, 5) | 10.124 |                      0 | 10                               |

B:

| Transazione di Alice                          | Nonce di Alice | Transazione di Bill                              |          Nonce di Bill | Autorizzazione di Bill | Guadagno totale di Bill da Alice |
| --------------------------------------------- | -------------: | ------------------------------------------------ | ---------------------: | ---------------------: | -------------------------------: |
| approve(Bill, 5)           |             10 |                                                  |                        |                      5 |                                0 |
| increaseAllowance(Bill, 5) |             11 |                                                  |                        |               5+5 = 10 |                                0 |
|                                               |                | transferFrom(Alice, Bill, 10) | 10.124 |                      0 |                               10 |

```solidity
    /**
     * @dev Aumenta atomicamente l'autorizzazione concessa a `spender` dal chiamante.
     *
     * Questa è un'alternativa a {approve} che può essere usata per mitigare i
     * problemi descritti in {IERC20-approve}.
     *
     * Emette un evento {Approval} che indica l'autorizzazione aggiornata.
     *
     * Requisiti:
     *
     * - `spender` non può essere l'indirizzo zero.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

La funzione `a.add(b)` è un'addizione sicura. Nel caso improbabile in cui `a`+`b`>=`2^256`, non si verifica il wrap-around
come nell'addizione normale.

```solidity

    /**
     * @dev Diminuisce atomicamente l'autorizzazione concessa a `spender` dal chiamante.
     *
     * Questa è un'alternativa a {approve} che può essere usata come mitigazione per i
     * problemi descritti in {IERC20-approve}.
     *
     * Emette un evento {Approval} che indica l'autorizzazione aggiornata.
     *
     * Requisiti:
     *
     * - `spender` non può essere l'indirizzo zero.
     * - `spender` deve avere un'autorizzazione per il chiamante di almeno
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: decreased allowance below zero"));
        return true;
    }
```

### Funzioni che modificano le informazioni sui token {#functions-that-modify-token-information}

Queste sono le quattro funzioni che svolgono il lavoro vero e proprio: `_transfer`, `_mint`, `_burn` e `_approve`.

#### La funzione `_transfer` {#_transfer}

```solidity
    /**
     * @dev Sposta una quantità `amount` di token da `sender` a `recipient`.
     *
     * Questa funzione interna è equivalente a {transfer} e può essere usata per
     * implementare, ad esempio, commissioni automatiche sui token, meccanismi di slashing, ecc.
     *
     * Emette un evento {Transfer}.
     *
     * Requisiti:
     *
     * - `sender` non può essere l'indirizzo zero.
     * - `recipient` non può essere l'indirizzo zero.
     * - `sender` deve avere un saldo di almeno `amount`.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

Questa funzione, `_transfer`, trasferisce token da un account a un altro. Viene chiamata sia da
`transfer` (per trasferimenti dall'account del mittente) sia da `transferFrom` (per usare le autorizzazioni
per trasferire dall'account di qualcun altro).

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

Nessuno possiede effettivamente l'indirizzo zero in Ethereum (cioè, nessuno conosce una chiave privata la cui chiave pubblica corrispondente
si trasforma nell'indirizzo zero). Quando le persone usano quell'indirizzo, di solito si tratta di un bug del software, quindi la chiamata
fallisce se l'indirizzo zero viene usato come mittente o destinatario.

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

Ci sono due modi per usare questo contratto:

1. Usarlo come modello per il proprio codice
2. [Ereditarlo](https://www.bitdegree.org/learn/solidity-inheritance) e sovrascrivere solo le funzioni che devi modificare

Il secondo metodo è molto meglio perché il codice ERC-20 di OpenZeppelin è già stato verificato e dimostrato sicuro. Quando si usa l'ereditarietà,
è chiaro quali sono le funzioni che si modificano e, per fidarsi del tuo contratto, le persone devono solo verificare quelle funzioni specifiche.

È spesso utile eseguire una funzione ogni volta che i token cambiano di mano. Tuttavia,`_transfer` è una funzione molto importante ed è
possibile scriverla in modo non sicuro (vedi sotto), quindi è meglio non sovrascriverla. La soluzione è `_beforeTokenTransfer`, una
[funzione hook](https://wikipedia.org/wiki/Hooking). Puoi sovrascrivere questa funzione e verrà chiamata a ogni trasferimento.

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

Queste sono le righe che eseguono effettivamente il trasferimento. Nota che non c'è **nulla** tra di loro e che sottraiamo
l'importo trasferito dal mittente prima di aggiungerlo al destinatario. Questo è importante perché se ci fosse una
chiamata a un contratto diverso nel mezzo, potrebbe essere usata per imbrogliare questo contratto. In questo modo il trasferimento
è atomico, nulla può accadere nel mezzo.

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

Infine, emetti un evento `Transfer`. Gli eventi non sono accessibili agli smart contract, ma il codice in esecuzione al di fuori della blockchain
può ascoltare gli eventi e reagire ad essi. Ad esempio, un portafoglio può tenere traccia di quando il proprietario riceve più token.

#### Le funzioni `_mint` e `_burn` {#_mint-and-_burn}

Queste due funzioni (`_mint` e `_burn`) modificano la fornitura totale di token.
Sono interne e non c'è nessuna funzione che le chiami in questo contratto,
quindi sono utili solo se erediti dal contratto e aggiungi la tua
logica per decidere in quali condizioni coniare nuovi token o bruciare quelli
esistenti.

**NOTA:** ogni token ERC-20 ha la propria logica di business che ne detta la gestione.
Ad esempio, un contratto a fornitura fissa potrebbe chiamare `_mint`
solo nel costruttore e non chiamare mai `_burn`. Un contratto che vende token
chiamerà `_mint` quando viene pagato e presumibilmente chiamerà `_burn` a un certo punto
per evitare un'inflazione galoppante.

```solidity
    /** @dev Crea un `amount` di token e li assegna a un `account`, aumentando
     * la fornitura totale.
     *
     * Emette un evento {Transfer} con `from` impostato sull'indirizzo zero.
     *
     * Requisiti:
     *
     * - `to` non può essere l'indirizzo zero.
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

```solidity
    /**
     * @dev Distrugge `amount` token da `account`, riducendo la
     * fornitura totale.
     *
     * Emette un evento {Transfer} con `to` impostato sull'indirizzo zero.
     *
     * Requisiti:
     *
     * - `account` non può essere l'indirizzo zero.
     * - `account` deve avere almeno `amount` token.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }
```

La funzione `_burn` è quasi identica a `_mint`, tranne per il fatto che va nella direzione opposta.

#### La funzione `_approve` {#_approve}

Questa è la funzione che specifica effettivamente le autorizzazioni. Nota che permette a un proprietario di specificare
un'autorizzazione superiore al saldo corrente del proprietario. Questo va bene perché il saldo viene
controllato al momento del trasferimento, quando potrebbe essere diverso dal saldo al momento della creazione dell'autorizzazione.

```solidity
    /**
     * @dev Imposta `amount` come autorizzazione di `spender` sui token di `owner`.
     *
     * Questa funzione interna è equivalente ad `approve` e può essere usata per
     * impostare, ad esempio, autorizzazioni automatiche per alcuni sottosistemi, ecc.
     *
     * Emette un evento {Approval}.
     *
     * Requisiti:
     *
     * - `owner` non può essere l'indirizzo zero.
     * - `spender` non può essere l'indirizzo zero.
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
```

&nbsp;

Emetti un evento `Approval`. A seconda di come è scritta l'applicazione, il contratto dello spender può essere informato dell'approvazione
dal proprietario o da un server che ascolta questi eventi.

```solidity
        emit Approval(owner, spender, amount);
    }

```

### Modificare la variabile dei decimali {#modify-the-decimals-variable}

```solidity


    /**
     * @dev Imposta {decimals} su un valore diverso da quello predefinito di 18.
     *
     * ATTENZIONE: questa funzione dovrebbe essere chiamata solo dal costruttore. La maggior parte delle
     * applicazioni che interagiscono con i contratti di token non si aspettano
     * che {decimals} cambi mai e potrebbero funzionare in modo errato se lo fa.
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

Questa funzione modifica la variabile `_decimals`, che viene utilizzata per indicare alle interfacce utente come interpretare l'importo.
Dovresti chiamarla dal costruttore. Sarebbe disonesto chiamarla in qualsiasi momento successivo e le applicazioni
non sono progettate per gestirlo.

### Hook {#hooks}

```solidity

    /**
     * @dev Hook che viene chiamato prima di ogni trasferimento di token. Ciò include
     * il conio e la distruzione.
     *
     * Condizioni di chiamata:
     *
     * - quando `from` e `to` sono entrambi diversi da zero, un `amount` di token di `from`
     * verrà trasferito a `to`.
     * - quando `from` è zero, un `amount` di token verrà coniato per `to`.
     * - quando `to` è zero, un `amount` di token di `from` verrà bruciato.
     * - `from` e `to` non sono mai entrambi zero.
     *
     * Per saperne di più sugli hook, vai a xref:ROOT:extending-contracts.adoc#using-hooks[Uso degli hook].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

Questa è la funzione hook da chiamare durante i trasferimenti. Qui è vuota, ma se hai bisogno
che faccia qualcosa, devi solo sovrascriverla.

## Conclusione {#conclusion}

A titolo di ripasso, ecco alcune delle idee più importanti di questo contratto (secondo me, la tua opinione potrebbe essere diversa):

- _Non ci sono segreti sulla blockchain_. Qualsiasi informazione a cui uno smart contract può accedere
  è disponibile al mondo intero.
- Puoi controllare l'ordine delle tue transazioni, ma non quando avvengono le transazioni
  di altre persone. Questo è il motivo per cui modificare un'autorizzazione può essere pericoloso, perché permette
  allo spender di spendere la somma di entrambe le autorizzazioni.
- I valori di tipo `uint256` si riavvolgono (wrap around). In altre parole, _0-1=2^256-1_. Se questo non è il comportamento desiderato,
  devi controllarlo (o usare la libreria SafeMath che lo fa per te). Nota che questo è cambiato in
  [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html).
- Esegui tutte le modifiche di stato di un tipo specifico in un punto specifico, perché rende più facile la verifica.
  Questo è il motivo per cui abbiamo, ad esempio, `_approve`, che è chiamato da `approve`, `transferFrom`,
  `increaseAllowance` e `decreaseAllowance`
- Le modifiche di stato dovrebbero essere atomiche, senza nessun'altra azione nel mezzo (come puoi vedere
  in `_transfer`). Questo perché durante la modifica di stato si ha uno stato incoerente. Ad esempio,
  tra il momento in cui si detrae dal saldo del mittente e il momento in cui si aggiunge al saldo del
  destinatario, esistono meno token di quanti dovrebbero essercene. Si potrebbe potenzialmente abusare di ciò se ci
  sono operazioni tra di loro, specialmente chiamate a un contratto diverso.

Ora che hai visto come è scritto il contratto ERC-20 di OpenZeppelin, e soprattutto come è
reso più sicuro, vai e scrivi i tuoi contratti e le tue applicazioni sicure.

[Vedi qui per altri miei lavori](https://cryptodocguy.pro/).
