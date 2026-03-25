---
title: "Guida dettagliata al contratto ERC-20"
description: "Cosa c'è nel contratto ERC-20 di OpenZeppelin e perché si trova lì?"
author: Ori Pomerantz
lang: it
tags: ["Solidity", "erc-20"]
skill: beginner
breadcrumb: Guida dettagliata a ERC-20
published: 2021-03-09
---

## Introduzione {#introduction}

Uno degli usi più comuni di Ethereum è la creazione da parte di un gruppo di un token scambiabile, in un certo senso la propria valuta. Questi token seguono tipicamente uno standard, l'[ERC-20](/developers/docs/standards/tokens/erc-20/). Questo standard rende possibile scrivere strumenti, come pool di liquidità e portafogli, che funzionano con tutti i token ERC-20. In questo articolo analizzeremo l'[implementazione ERC20 in Solidity di OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol), così come la [definizione dell'interfaccia](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol).

Questo è codice sorgente annotato. Se vuoi implementare l'ERC-20, [leggi questo tutorial](https://docs.openzeppelin.com/contracts/2.x/erc20-supply).

## L'Interfaccia {#the-interface}

Lo scopo di uno standard come l'ERC-20 è consentire molte implementazioni di token che siano interoperabili tra le applicazioni, come portafogli ed exchange decentralizzati. Per ottenere ciò, creiamo un'[interfaccia](https://www.geeksforgeeks.org/solidity/solidity-basics-of-interface/). Qualsiasi codice che debba utilizzare il contratto del token può usare le stesse definizioni nell'interfaccia ed essere compatibile con tutti i contratti dei token che la utilizzano, che si tratti di un portafoglio come MetaMask, di una dApp come etherscan.io o di un contratto diverso come una pool di liquidità.

![Illustrazione dell'interfaccia ERC-20](erc20_interface.png)

Se sei un programmatore esperto, probabilmente ricordi di aver visto costrutti simili in [Java](https://www.w3schools.com/java/java_interface.asp) o persino nei [file header del C](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html).

Questa è una definizione dell'[Interfaccia ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) di OpenZeppelin. È una traduzione dello [standard leggibile dall'uomo](https://eips.ethereum.org/EIPS/eip-20) in codice Solidity. Naturalmente, l'interfaccia stessa non definisce _come_ fare qualcosa. Questo è spiegato nel codice sorgente del contratto di seguito.

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

I file Solidity dovrebbero includere un identificatore di licenza. [Puoi vedere l'elenco delle licenze qui](https://spdx.org/licenses/). Se hai bisogno di una licenza diversa, spiegalo semplicemente nei commenti.

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Il linguaggio Solidity si sta ancora evolvendo rapidamente e le nuove versioni potrebbero non essere compatibili con il vecchio codice ([vedi qui](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)). Pertanto, è una buona idea specificare non solo una versione minima del linguaggio, ma anche una versione massima, l'ultima con cui hai testato il codice.

&nbsp;

```solidity
/* *
 * @dev Interfaccia dello standard ERC20 come definito nell'EIP. */



```

Il `@dev` nel commento fa parte del [formato NatSpec](https://docs.soliditylang.org/en/develop/natspec-format.html), utilizzato per produrre documentazione dal codice sorgente.

&nbsp;

```solidity
interface IERC20 {
```

Per convenzione, i nomi delle interfacce iniziano con `I`.

&nbsp;

```solidity
    /* *
     * @dev Restituisce la quantità di token esistenti. */
    


    function totalSupply() external view returns (uint256);
```

Questa funzione è `external`, il che significa che [può essere chiamata solo dall'esterno del contratto](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2). Restituisce l'offerta totale di token nel contratto. Questo valore viene restituito utilizzando il tipo più comune in Ethereum, 256 bit senza segno (256 bit è la dimensione della parola nativa della EVM). Questa funzione è anche una `view`, il che significa che non modifica lo stato, quindi può essere eseguita su un singolo nodo invece di farla eseguire a ogni nodo della blockchain. Questo tipo di funzione non genera una transazione e non costa [gas](/developers/docs/gas/).

**Nota:** In teoria potrebbe sembrare che il creatore di un contratto possa imbrogliare restituendo un'offerta totale inferiore al valore reale, facendo apparire ogni token più prezioso di quanto non sia in realtà. Tuttavia, questo timore ignora la vera natura della blockchain. Tutto ciò che accade sulla blockchain può essere verificato da ogni nodo. Per ottenere ciò, il codice in linguaggio macchina e l'archiviazione di ogni contratto sono disponibili su ogni nodo. Sebbene non sia richiesto di pubblicare il codice Solidity per il tuo contratto, nessuno ti prenderebbe sul serio a meno che tu non pubblichi il codice sorgente e la versione di Solidity con cui è stato compilato, in modo che possa essere verificato rispetto al codice in linguaggio macchina che hai fornito.
Ad esempio, vedi [questo contratto](https://eth.blockscout.com/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD?tab=contract).

&nbsp;

```solidity
    /* *
     * @dev Restituisce la quantità di token posseduti da `account`. */
    


    function balanceOf(address account) external view returns (uint256);
```

Come dice il nome, `balanceOf` restituisce il saldo di un account. Gli account di Ethereum sono identificati in Solidity utilizzando il tipo `address`, che contiene 160 bit. È anche `external` e `view`.

&nbsp;

```solidity
    /* *
     * @dev Sposta `amount` token dall'account del chiamante a `recipient`.
     *
     * Restituisce un valore booleano che indica se l'operazione ha avuto successo.
     *
     * Emette un evento {Transfer}. */
    






    function transfer(address recipient, uint256 amount) external returns (bool);
```

La funzione `transfer` trasferisce dei token dal chiamante a un indirizzo diverso. Ciò comporta un cambiamento di stato, quindi non è una `view`. Quando un utente chiama questa funzione, crea una transazione e costa gas. Emette anche un evento, `Transfer`, per informare tutti sulla blockchain dell'evento.

La funzione ha due tipi di output per due diversi tipi di chiamanti:

- Gli utenti che chiamano la funzione direttamente da un'interfaccia utente. Tipicamente l'utente invia una transazione e non aspetta una risposta, che potrebbe richiedere un tempo indefinito. L'utente può vedere cosa è successo cercando la ricevuta della transazione (che è identificata dall'hash della transazione) o cercando l'evento `Transfer`.
- Altri contratti, che chiamano la funzione come parte di una transazione complessiva. Quei contratti ottengono il risultato immediatamente, perché vengono eseguiti nella stessa transazione, quindi possono utilizzare il valore di ritorno della funzione.

Lo stesso tipo di output viene creato dalle altre funzioni che modificano lo stato del contratto.

&nbsp;

Le autorizzazioni (allowance) permettono a un account di spendere alcuni token che appartengono a un proprietario diverso. Questo è utile, ad esempio, per i contratti che agiscono come venditori. I contratti non possono monitorare gli eventi, quindi se un acquirente trasferisse i token direttamente al contratto del venditore, quel contratto non saprebbe di essere stato pagato. Invece, l'acquirente autorizza il contratto del venditore a spendere un certo importo, e il venditore trasferisce quell'importo. Questo viene fatto tramite una funzione chiamata dal contratto del venditore, in modo che il contratto del venditore possa sapere se ha avuto successo.

```solidity
    /* *
     * @dev Restituisce il numero rimanente di token che `spender` sarà
     * autorizzato a spendere per conto di `owner` tramite {transferFrom}. Questo è
     * zero per impostazione predefinita.
     *
     * Questo valore cambia quando vengono chiamati {approve} o {transferFrom}. */
    






    function allowance(address owner, address spender) external view returns (uint256);
```

La funzione `allowance` consente a chiunque di interrogare per vedere qual è l'autorizzazione che un indirizzo (`owner`) consente a un altro indirizzo (`spender`) di spendere.

&nbsp;

```solidity
    /* *
     * @dev Imposta `amount` come limite di spesa di `spender` sui token del chiamante.
     *
     * Restituisce un valore booleano che indica se l'operazione ha avuto successo.
     *
     * IMPORTANTE: Attenzione che modificare un limite di spesa con questo metodo comporta il rischio
     * che qualcuno possa utilizzare sia il vecchio che il nuovo limite di spesa a causa di uno sfortunato
     * ordinamento delle transazioni. Una possibile soluzione per mitigare questa race
     * condition è ridurre prima il limite di spesa dello spender a 0 e impostare il
     * valore desiderato in seguito:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emette un evento {Approval}. */
    













    function approve(address spender, uint256 amount) external returns (bool);
```

La funzione `approve` crea un'autorizzazione. Assicurati di leggere il messaggio su come può essere abusata. In Ethereum controlli l'ordine delle tue transazioni, ma non puoi controllare l'ordine in cui verranno eseguite le transazioni di altre persone, a meno che tu non invii la tua transazione finché non vedi che la transazione dell'altra parte è avvenuta.

&nbsp;

```solidity
    /* *
     * @dev Sposta `amount` token da `sender` a `recipient` utilizzando il
     * meccanismo del limite di spesa. `amount` viene quindi detratto dal limite di spesa
     * del chiamante.
     *
     * Restituisce un valore booleano che indica se l'operazione ha avuto successo.
     *
     * Emette un evento {Transfer}. */
    








    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Infine, `transferFrom` viene utilizzata dallo spenditore per spendere effettivamente l'autorizzazione.

&nbsp;

```solidity

    /* *
     * @dev Emesso quando `value` token vengono spostati da un account (`from`) a
     * un altro (`to`).
     *
     * Nota che `value` può essere zero. */
    





    event Transfer(address indexed from, address indexed to, uint256 value);

    /* *
     * @dev Emesso quando il limite di spesa di uno `spender` per un `owner` viene impostato da
     * una chiamata a {approve}. `value` è il nuovo limite di spesa. */
    



    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Questi eventi vengono emessi quando lo stato del contratto ERC-20 cambia.

## Il Contratto Effettivo {#the-actual-contract}

Questo è il contratto effettivo che implementa lo standard ERC-20, [preso da qui](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol). Non è pensato per essere utilizzato così com'è, ma puoi [ereditare](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm) da esso per estenderlo a qualcosa di utilizzabile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### Dichiarazioni di Importazione {#import-statements}

Oltre alle definizioni dell'interfaccia di cui sopra, la definizione del contratto importa altri due file:

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol` contiene le definizioni necessarie per utilizzare [OpenGSN](https://www.opengsn.org/), un sistema che consente agli utenti senza ether di utilizzare la blockchain. Nota che questa è una vecchia versione, se vuoi integrarti con OpenGSN [usa questo tutorial](https://docs.opengsn.org/javascript-client/tutorial.html).
- [La libreria SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/), che previene overflow/underflow aritmetici per le versioni di Solidity **&lt;0.8.0**. In Solidity ≥0.8.0, le operazioni aritmetiche si annullano automaticamente in caso di overflow/underflow, rendendo SafeMath non necessaria. Questo contratto utilizza SafeMath per la retrocompatibilità con le versioni precedenti del compilatore.

&nbsp;

Questo commento spiega lo scopo del contratto.

```solidity
/* *
 * @dev Implementazione dell'interfaccia {IERC20}.
 *
 * Questa implementazione è agnostica rispetto al modo in cui vengono creati i token. Ciò significa
 * che un meccanismo di fornitura deve essere aggiunto in un contratto derivato utilizzando {_mint}.
 * Per un meccanismo generico vedi {ERC20PresetMinterPauser}.
 *
 * SUGGERIMENTO: Per una descrizione dettagliata vedi la nostra guida
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[How
 * to implement supply mechanisms].
 *
 * Abbiamo seguito le linee guida generali di OpenZeppelin: le funzioni si annullano (revert) invece
 * di restituire `false` in caso di fallimento. Questo comportamento è tuttavia convenzionale
 * e non è in conflitto con le aspettative delle applicazioni ERC20.
 *
 * Inoltre, un evento {Approval} viene emesso alle chiamate a {transferFrom}.
 * Questo permette alle applicazioni di ricostruire il limite di spesa per tutti gli account semplicemente
 * ascoltando tali eventi. Altre implementazioni dell'EIP potrebbero non emettere
 * questi eventi, poiché non è richiesto dalle specifiche.
 *
 * Infine, le funzioni non standard {decreaseAllowance} e {increaseAllowance}
 * sono state aggiunte per mitigare i ben noti problemi relativi all'impostazione
 * dei limiti di spesa. Vedi {IERC20-approve}. */

























```

### Definizione del Contratto {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

Questa riga specifica l'ereditarietà, in questo caso da `IERC20` di cui sopra e `Context`, per OpenGSN.

&nbsp;

```solidity

    using SafeMath for uint256;

```

Questa riga collega la libreria `SafeMath` al tipo `uint256`. Puoi trovare questa libreria [qui](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol).

### Definizioni delle Variabili {#variable-definitions}

Queste definizioni specificano le variabili di stato del contratto. Queste variabili sono dichiarate `private`, ma ciò significa solo che altri contratti sulla blockchain non possono leggerle. _Non ci sono segreti sulla blockchain_, il software su ogni nodo ha lo stato di ogni contratto a ogni blocco. Per convenzione, le variabili di stato sono chiamate `_<qualcosa>`.

Le prime due variabili sono [mappature (mapping)](https://www.tutorialspoint.com/solidity/solidity_mappings.htm), il che significa che si comportano all'incirca come gli [array associativi](https://wikipedia.org/wiki/Associative_array), tranne per il fatto che le chiavi sono valori numerici. L'archiviazione viene allocata solo per le voci che hanno valori diversi da quello predefinito (zero).

```solidity
    mapping (address => uint256) private _balances;
```

La prima mappatura, `_balances`, rappresenta gli indirizzi e i loro rispettivi saldi di questo token. Per accedere al saldo, usa questa sintassi: `_balances[<indirizzo>]`.

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

Questa variabile, `_allowances`, memorizza le autorizzazioni spiegate in precedenza. Il primo indice è il proprietario dei token, e il secondo è il contratto con l'autorizzazione. Per accedere all'importo che l'indirizzo A può spendere dall'account dell'indirizzo B, usa `_allowances[B][A]`.

&nbsp;

```solidity
    uint256 private _totalSupply;
```

Come suggerisce il nome, questa variabile tiene traccia dell'offerta totale di token.

&nbsp;

```solidity
    string private _name;
    string private _symbol;
    uint8 private _decimals;
```

Queste tre variabili sono utilizzate per migliorare la leggibilità. Le prime due si spiegano da sole, ma `_decimals` no.

Da un lato, Ethereum non ha variabili a virgola mobile o frazionarie. Dall'altro lato, agli esseri umani piace poter dividere i token. Uno dei motivi per cui le persone hanno scelto l'oro come valuta è che era difficile dare il resto quando qualcuno voleva comprare una mucca per il valore di un'anatra.

La soluzione è tenere traccia dei numeri interi, ma contare invece del token reale un token frazionario che è quasi senza valore. Nel caso dell'ether, il token frazionario si chiama wei, e 10^18 wei equivalgono a un ETH. Al momento della stesura, 10.000.000.000.000 wei corrispondono a circa un centesimo di dollaro USA o di euro.

Le applicazioni devono sapere come visualizzare il saldo del token. Se un utente ha 3.141.000.000.000.000.000 wei, sono 3,14 ETH? 31,41 ETH? 3.141 ETH? Nel caso dell'ether è definito 10^18 wei per ETH, ma per il tuo token puoi selezionare un valore diverso. Se dividere il token non ha senso, puoi usare un valore `_decimals` pari a zero. Se vuoi usare lo stesso standard dell'ETH, usa il valore **18**.

### Il Costruttore {#the-constructor}

```solidity
    /* *
     * @dev Imposta i valori per {name} e {symbol}, inizializza {decimals} con
     * un valore predefinito di 18.
     *
     * Per selezionare un valore diverso per {decimals}, usa {_setupDecimals}.
     *
     * Tutti e tre questi valori sono immutabili: possono essere impostati solo una volta durante
     * la costruzione. */
    








    constructor (string memory name_, string memory symbol_) public {
        // In Solidity ≥0.7.0, 'public' è implicito e può essere omesso.

        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

Il costruttore viene chiamato quando il contratto viene creato per la prima volta. Per convenzione, i parametri della funzione sono chiamati `<qualcosa>_`.

### Funzioni dell'Interfaccia Utente {#user-interface-functions}

```solidity
    /* *
     * @dev Restituisce il nome del token. */
    


    function name() public view returns (string memory) {
        return _name;
    }

    /* *
     * @dev Restituisce il simbolo del token, di solito una versione più corta del
     * nome. */
    



    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /* *
     * @dev Restituisce il numero di decimali utilizzati per ottenere la sua rappresentazione utente.
     * Ad esempio, se `decimals` è uguale a `2`, un saldo di `505` token dovrebbe
     * essere mostrato a un utente come `5,05` (`505 / 10 ** 2`).
     *
     * I token di solito optano per un valore di 18, imitando la relazione tra
     * ether e wei. Questo è il valore che {ERC20} utilizza, a meno che non venga chiamato
     * {_setupDecimals}.
     *
     * NOTA: Questa informazione è utilizzata solo a scopo di _visualizzazione_: non
     * influisce in alcun modo sull'aritmetica del contratto, inclusi
     * {IERC20-balanceOf} e {IERC20-transfer}. */
    












    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

Queste funzioni, `name`, `symbol` e `decimals` aiutano le interfacce utente a conoscere il tuo contratto in modo che possano visualizzarlo correttamente.

Il tipo di ritorno è `string memory`, il che significa che restituisce una stringa memorizzata in memoria. Le variabili, come le stringhe, possono essere memorizzate in tre posizioni:

| | Durata | Accesso al Contratto | Costo del Gas |
| -------- | ------------- | --------------- | -------------------------------------------------------------- |
| Memoria (Memory) | Chiamata di funzione | Lettura/Scrittura | Decine o centinaia (più alto per posizioni più alte) |
| Dati di chiamata (Calldata) | Chiamata di funzione | Solo Lettura | Non può essere usato come tipo di ritorno, solo come tipo di parametro di funzione |
| Archiviazione (Storage) | Fino a modifica | Lettura/Scrittura | Alto (800 per la lettura, 20k per la scrittura) |

In questo caso, `memory` è la scelta migliore.

### Leggere le Informazioni del Token {#read-token-information}

Queste sono funzioni che forniscono informazioni sul token, che si tratti dell'offerta totale o del saldo di un account.

```solidity
    /* *
     * @dev Vedi {IERC20-totalSupply}. */
    


    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
```

La funzione `totalSupply` restituisce l'offerta totale di token.

&nbsp;

```solidity
    /* *
     * @dev Vedi {IERC20-balanceOf}. */
    


    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
```

Legge il saldo di un account. Nota che a chiunque è permesso ottenere il saldo dell'account di chiunque altro. Non ha senso cercare di nascondere queste informazioni, perché sono comunque disponibili su ogni nodo. _Non ci sono segreti sulla blockchain._

### Trasferire Token {#transfer-tokens}

```solidity
    /* *
     * @dev Vedi {IERC20-transfer}.
     *
     * Requisiti:
     *
     * - `recipient` non può essere l'indirizzo zero.
     * - il chiamante deve avere un saldo di almeno `amount`. */
    







    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

La funzione `transfer` viene chiamata per trasferire token dall'account del mittente a uno diverso. Nota che anche se restituisce un valore booleano, quel valore è sempre **true**. Se il trasferimento fallisce, il contratto annulla (revert) la chiamata.

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

La funzione `_transfer` fa il lavoro effettivo. È una funzione privata che può essere chiamata solo da altre funzioni del contratto. Per convenzione le funzioni private sono chiamate `_<qualcosa>`, come le variabili di stato.

Normalmente in Solidity usiamo `msg.sender` per il mittente del messaggio. Tuttavia, questo rompe [OpenGSN](http://opengsn.org/). Se vogliamo consentire transazioni senza ether con il nostro token, dobbiamo usare `_msgSender()`. Restituisce `msg.sender` per le transazioni normali, ma per quelle senza ether restituisce il firmatario originale e non il contratto che ha inoltrato il messaggio.

### Funzioni di Autorizzazione {#allowance-functions}

Queste sono le funzioni che implementano la funzionalità di autorizzazione: `allowance`, `approve`, `transferFrom` e `_approve`. Inoltre, l'implementazione di OpenZeppelin va oltre lo standard di base per includere alcune funzionalità che migliorano la sicurezza: `increaseAllowance` e `decreaseAllowance`.

#### La funzione allowance {#allowance}

```solidity
    /* *
     * @dev Vedi {IERC20-allowance}. */
    


    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

La funzione `allowance` consente a tutti di controllare qualsiasi autorizzazione.

#### La funzione approve {#approve}

```solidity
    /* *
     * @dev Vedi {IERC20-approve}.
     *
     * Requisiti:
     *
     * - `spender` non può essere l'indirizzo zero. */
    






    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

Questa funzione viene chiamata per creare un'autorizzazione. È simile alla funzione `transfer` di cui sopra:

- La funzione chiama semplicemente una funzione interna (in questo caso, `_approve`) che fa il vero lavoro.
- La funzione restituisce `true` (se ha successo) o si annulla (se non lo ha).

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

Usiamo funzioni interne per ridurre al minimo il numero di punti in cui avvengono i cambiamenti di stato. _Qualsiasi_ funzione che modifichi lo stato è un potenziale rischio per la sicurezza che deve essere verificato. In questo modo abbiamo meno possibilità di sbagliare.

#### La funzione transferFrom {#transferFrom}

Questa è la funzione che uno spenditore chiama per spendere un'autorizzazione. Ciò richiede due operazioni: trasferire l'importo speso e ridurre l'autorizzazione di tale importo.

```solidity
    /* *
     * @dev Vedi {IERC20-transferFrom}.
     *
     * Emette un evento {Approval} che indica il limite di spesa aggiornato. Questo non è
     * richiesto dall'EIP. Vedi la nota all'inizio di {ERC20}.
     *
     * Requisiti:
     *
     * - `sender` e `recipient` non possono essere l'indirizzo zero.
     * - `sender` deve avere un saldo di almeno `amount`.
     * - il chiamante deve avere un limite di spesa per i token di ``sender`` di almeno
     * `amount`. */
    












    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

La chiamata di funzione `a.sub(b, "message")` fa due cose. Primo, calcola `a-b`, che è la nuova autorizzazione. Secondo, controlla che questo risultato non sia negativo. Se è negativo, la chiamata si annulla con il messaggio fornito. Nota che quando una chiamata si annulla, qualsiasi elaborazione eseguita in precedenza durante quella chiamata viene ignorata, quindi non abbiamo bisogno di annullare il `_transfer`.

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

#### Aggiunte di sicurezza di OpenZeppelin {#openzeppelin-safety-additions}

È pericoloso impostare un'autorizzazione diversa da zero a un altro valore diverso da zero, perché controlli solo l'ordine delle tue transazioni, non quello di nessun altro. Immagina di avere due utenti, Alice che è ingenua e Bill che è disonesto. Alice vuole un servizio da Bill, che pensa costi cinque token, quindi dà a Bill un'autorizzazione di cinque token.

Poi qualcosa cambia e il prezzo di Bill sale a dieci token. Alice, che vuole ancora il servizio, invia una transazione che imposta l'autorizzazione di Bill a dieci. Nel momento in cui Bill vede questa nuova transazione nel pool delle transazioni, invia una transazione che spende i cinque token di Alice e ha un prezzo del gas molto più alto in modo che venga minata più velocemente. In questo modo Bill può spendere prima cinque token e poi, una volta minata la nuova autorizzazione di Alice, spenderne altri dieci per un prezzo totale di quindici token, più di quanto Alice intendesse autorizzare. Questa tecnica è chiamata [front-running](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/#front-running)

| Transazione di Alice | Nonce di Alice | Transazione di Bill | Nonce di Bill | Autorizzazione di Bill | Entrate Totali di Bill da Alice |
| ----------------- | ----------- | ----------------------------- | ---------- | ---------------- | ---------------------------- |
| approve(Bill, 5)  | 10          |                               |            | 5                | 0                            |
|                   |             | transferFrom(Alice, Bill, 5)  | 10,123     | 0                | 5                            |
| approve(Bill, 10) | 11          |                               |            | 10               | 5                            |
|                   |             | transferFrom(Alice, Bill, 10) | 10,124     | 0                | 15                           |

Per evitare questo problema, queste due funzioni (`increaseAllowance` e `decreaseAllowance`) consentono di modificare l'autorizzazione di un importo specifico. Quindi, se Bill avesse già speso cinque token, potrà spenderne solo altri cinque. A seconda delle tempistiche, ci sono due modi in cui questo può funzionare, entrambi i quali finiscono con Bill che ottiene solo dieci token:

A:

| Transazione di Alice | Nonce di Alice | Transazione di Bill | Nonce di Bill | Autorizzazione di Bill | Entrate Totali di Bill da Alice |
| -------------------------- | ----------: | ---------------------------- | ---------: | ---------------: | ---------------------------- |
| approve(Bill, 5)           |          10 |                              |            |                5 | 0                            |
|                            |             | transferFrom(Alice, Bill, 5) |     10,123 |                0 | 5                            |
| increaseAllowance(Bill, 5) |          11 |                              |            |          0+5 = 5 | 5                            |
|                            |             | transferFrom(Alice, Bill, 5) |     10,124 |                0 | 10                           |

B:

| Transazione di Alice | Nonce di Alice | Transazione di Bill | Nonce di Bill | Autorizzazione di Bill | Entrate Totali di Bill da Alice |
| -------------------------- | ----------: | ----------------------------- | ---------: | ---------------: | ---------------------------: |
| approve(Bill, 5)           |          10 |                               |            |                5 |                            0 |
| increaseAllowance(Bill, 5) |          11 |                               |            |         5+5 = 10 |                            0 |
|                            |             | transferFrom(Alice, Bill, 10) |     10,124 |                0 |                           10 |

```solidity
    /* *
     * @dev Aumenta atomicamente il limite di spesa concesso a `spender` dal chiamante.
     *
     * Questa è un'alternativa a {approve} che può essere utilizzata come mitigazione per
     * i problemi descritti in {IERC20-approve}.
     *
     * Emette un evento {Approval} che indica il limite di spesa aggiornato.
     *
     * Requisiti:
     *
     * - `spender` non può essere l'indirizzo zero. */
    











    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

La funzione `a.add(b)` è un'addizione sicura. Nel caso improbabile in cui `a`+`b`>=`2^256`, non ricomincia da zero (wrap around) come fa la normale addizione.

```solidity

    /* *
     * @dev Diminuisce atomicamente il limite di spesa concesso a `spender` dal chiamante.
     *
     * Questa è un'alternativa a {approve} che può essere utilizzata come mitigazione per
     * i problemi descritti in {IERC20-approve}.
     *
     * Emette un evento {Approval} che indica il limite di spesa aggiornato.
     *
     * Requisiti:
     *
     * - `spender` non può essere l'indirizzo zero.
     * - `spender` deve avere un limite di spesa per il chiamante di almeno
     * `subtractedValue`. */
    













    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: decreased allowance below zero"));
        return true;
    }
```

### Funzioni che Modificano le Informazioni del Token {#functions-that-modify-token-information}

Queste sono le quattro funzioni che fanno il lavoro effettivo: `_transfer`, `_mint`, `_burn` e `_approve`.

#### La funzione _transfer {#_transfer}

```solidity
    /* *
     * @dev Sposta `amount` token da `sender` a `recipient`.
     *
     * Questa funzione interna è equivalente a {transfer}, e può essere utilizzata per
     * es., implementare commissioni automatiche sui token, meccanismi di slashing, ecc.
     *
     * Emette un evento {Transfer}.
     *
     * Requisiti:
     *
     * - `sender` non può essere l'indirizzo zero.
     * - `recipient` non può essere l'indirizzo zero.
     * - `sender` deve avere un saldo di almeno `amount`. */
    













    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

Questa funzione, `_transfer`, trasferisce token da un account a un altro. Viene chiamata sia da `transfer` (per i trasferimenti dal proprio account del mittente) sia da `transferFrom` (per l'utilizzo delle autorizzazioni per trasferire dall'account di qualcun altro).

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

Nessuno possiede effettivamente l'indirizzo zero in Ethereum (cioè, nessuno conosce una chiave privata la cui chiave pubblica corrispondente si trasforma nell'indirizzo zero). Quando le persone usano quell'indirizzo, di solito si tratta di un bug del software, quindi falliamo se l'indirizzo zero viene utilizzato come mittente o destinatario.

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

Ci sono due modi per utilizzare questo contratto:

1. Usarlo come modello per il tuo codice
1. [Ereditare da esso](https://www.bitdegree.org/learn/solidity-inheritance) e sovrascrivere solo le funzioni che devi modificare

Il secondo metodo è molto migliore perché il codice ERC-20 di OpenZeppelin è già stato verificato e si è dimostrato sicuro. Quando usi l'ereditarietà è chiaro quali sono le funzioni che modifichi, e per fidarsi del tuo contratto le persone devono solo verificare quelle funzioni specifiche.

Spesso è utile eseguire una funzione ogni volta che i token passano di mano. Tuttavia, `_transfer` è una funzione molto importante ed è possibile scriverla in modo non sicuro (vedi sotto), quindi è meglio non sovrascriverla. La soluzione è `_beforeTokenTransfer`, una [funzione hook](https://wikipedia.org/wiki/Hooking). Puoi sovrascrivere questa funzione e verrà chiamata a ogni trasferimento.

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

Queste sono le righe che eseguono effettivamente il trasferimento. Nota che non c'è **nulla** tra di esse, e che sottraiamo l'importo trasferito dal mittente prima di aggiungerlo al destinatario. Questo è importante perché se ci fosse stata una chiamata a un contratto diverso nel mezzo, avrebbe potuto essere usata per imbrogliare questo contratto. In questo modo il trasferimento è atomico, non può succedere nulla nel mezzo.

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

Infine, emette un evento `Transfer`. Gli eventi non sono accessibili ai contratti intelligenti, ma il codice in esecuzione all'esterno della blockchain può ascoltare gli eventi e reagire ad essi. Ad esempio, un portafoglio può tenere traccia di quando il proprietario ottiene più token.

#### Le funzioni _mint e _burn {#_mint-and-_burn}

Queste due funzioni (`_mint` e `_burn`) modificano l'offerta totale di token. Sono interne e non c'è alcuna funzione che le chiami in questo contratto, quindi sono utili solo se erediti dal contratto e aggiungi la tua logica per decidere a quali condizioni coniare nuovi token o bruciare quelli esistenti.

**NOTA:** Ogni token ERC-20 ha la propria logica di business che detta la gestione dei token. Ad esempio, un contratto a fornitura fissa potrebbe chiamare `_mint` solo nel costruttore e non chiamare mai `_burn`. Un contratto che vende token chiamerà `_mint` quando viene pagato, e presumibilmente chiamerà `_burn` a un certo punto per evitare un'inflazione fuori controllo.

```solidity
    /* * @dev Crea `amount` token e li assegna a `account`, aumentando
     * la fornitura totale.
     *
     * Emette un evento {Transfer} con `from` impostato all'indirizzo zero.
     *
     * Requisiti:
     *
     * - `to` non può essere l'indirizzo zero. */
    








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
    /* *
     * @dev Distrugge `amount` token da `account`, riducendo la
     * fornitura totale.
     *
     * Emette un evento {Transfer} con `to` impostato all'indirizzo zero.
     *
     * Requisiti:
     *
     * - `account` non può essere l'indirizzo zero.
     * - `account` deve avere almeno `amount` token. */
    










    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }
```

La funzione `_burn` è quasi identica a `_mint`, tranne per il fatto che va nell'altra direzione.

#### La funzione _approve {#_approve}

Questa è la funzione che specifica effettivamente le autorizzazioni. Nota che consente a un proprietario di specificare un'autorizzazione superiore al saldo attuale del proprietario. Questo va bene perché il saldo viene controllato al momento del trasferimento, quando potrebbe essere diverso dal saldo al momento della creazione dell'autorizzazione.

```solidity
    /* *
     * @dev Imposta `amount` come limite di spesa di `spender` sui token di `owner`.
     *
     * Questa funzione interna è equivalente a `approve`, e può essere utilizzata per
     * es., impostare limiti di spesa automatici per determinati sottosistemi, ecc.
     *
     * Emette un evento {Approval}.
     *
     * Requisiti:
     *
     * - `owner` non può essere l'indirizzo zero.
     * - `spender` non può essere l'indirizzo zero. */
    












    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
```

&nbsp;

Emette un evento `Approval`. A seconda di come è scritta l'applicazione, il contratto dello spenditore può essere informato dell'approvazione dal proprietario o da un server che ascolta questi eventi.

```solidity
        emit Approval(owner, spender, amount);
    }

```

### Modificare la Variabile Decimals {#modify-the-decimals-variable}

```solidity


    /* *
     * @dev Imposta {decimals} a un valore diverso da quello predefinito di 18.
     *
     * AVVERTENZA: Questa funzione dovrebbe essere chiamata solo dal costruttore. La maggior parte
     * delle applicazioni che interagiscono con i contratti dei token non si aspetterà
     * che {decimals} cambi mai, e potrebbero funzionare in modo errato se lo fa. */
    






    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

Questa funzione modifica la variabile `_decimals` che viene utilizzata per dire alle interfacce utente come interpretare l'importo. Dovresti chiamarla dal costruttore. Sarebbe disonesto chiamarla in qualsiasi momento successivo, e le applicazioni non sono progettate per gestirlo.

### Hook {#hooks}

```solidity

    /* *
     * @dev Hook che viene chiamato prima di qualsiasi trasferimento di token. Questo include
     * il coniare e il bruciare.
     *
     * Condizioni di chiamata:
     *
     * - quando `from` e `to` sono entrambi non zero, `amount` dei token di ``from``
     * saranno trasferiti a `to`.
     * - quando `from` è zero, `amount` token saranno coniati per `to`.
     * - quando `to` è zero, `amount` dei token di ``from`` saranno bruciati.
     * - `from` e `to` non sono mai entrambi zero.
     *
     * Per saperne di più sugli hook, vai a xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks]. */
    













    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

Questa è la funzione hook da chiamare durante i trasferimenti. Qui è vuota, ma se hai bisogno che faccia qualcosa, basta sovrascriverla.

## Conclusione {#conclusion}

Per riepilogare, ecco alcune delle idee più importanti in questo contratto (secondo me, la tua opinione potrebbe variare):

- _Non ci sono segreti sulla blockchain_. Qualsiasi informazione a cui un contratto intelligente può accedere è disponibile per tutto il mondo.
- Puoi controllare l'ordine delle tue transazioni, ma non quando avvengono le transazioni di altre persone. Questo è il motivo per cui modificare un'autorizzazione può essere pericoloso, perché consente allo spenditore di spendere la somma di entrambe le autorizzazioni.
- I valori di tipo `uint256` ricominciano da zero (wrap around). In altre parole, _0-1=2^256-1_. Se questo non è il comportamento desiderato, devi verificarlo (o usare la libreria SafeMath che lo fa per te). Nota che questo è cambiato in [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html).
- Esegui tutti i cambiamenti di stato di un tipo specifico in un luogo specifico, perché semplifica la verifica (auditing). Questo è il motivo per cui abbiamo, ad esempio, `_approve`, che viene chiamata da `approve`, `transferFrom`, `increaseAllowance` e `decreaseAllowance`
- I cambiamenti di stato dovrebbero essere atomici, senza nessun'altra azione nel mezzo (come puoi vedere in `_transfer`). Questo perché durante il cambiamento di stato si ha uno stato incoerente. Ad esempio, tra il momento in cui deduci dal saldo del mittente e il momento in cui aggiungi al saldo del destinatario ci sono meno token in esistenza di quanti dovrebbero esserci. Questo potrebbe essere potenzialmente abusato se ci sono operazioni tra di loro, specialmente chiamate a un contratto diverso.

Ora che hai visto come è scritto il contratto ERC-20 di OpenZeppelin, e specialmente come è reso più sicuro, vai e scrivi i tuoi contratti e applicazioni sicuri.

[Vedi qui per altri miei lavori](https://cryptodocguy.pro/).