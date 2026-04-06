---
title: "Alcuni trucchi usati dai token truffa e come rilevarli"
description: In questo tutorial analizziamo un token truffa per vedere alcuni dei trucchi usati dai truffatori, come li implementano e come possiamo rilevarli.
author: Ori Pomerantz
tags: ["truffa", "Solidity", "erc-20", "JavaScript", "TypeScript"]
skill: intermediate
breadcrumb: Trucchi dei token truffa
published: 2023-09-15
lang: it
---

In questo tutorial analizziamo [un token truffa](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) per vedere alcuni dei trucchi usati dai truffatori e come li implementano. Alla fine del tutorial avrai una visione più completa dei contratti dei token ERC-20, delle loro capacità e del perché lo scetticismo è necessario. Successivamente esamineremo gli eventi emessi da quel token truffa e vedremo come possiamo identificare automaticamente che non è legittimo.

## Token truffa: cosa sono, perché le persone li creano e come evitarli {#scam-tokens}

Uno degli usi più comuni di Ethereum è la creazione di un token negoziabile da parte di un gruppo, in un certo senso la propria valuta. Tuttavia, ovunque ci siano casi d'uso legittimi che portano valore, ci sono anche criminali che cercano di rubare quel valore per sé stessi.

Puoi leggere di più su questo argomento [altrove su ethereum.org](/guides/how-to-id-scam-tokens/) dal punto di vista dell'utente. Questo tutorial si concentra sull'analisi di un token truffa per vedere come viene realizzato e come può essere rilevato.

### Come faccio a sapere che wARB è una truffa? {#warb-scam}

Il token che analizziamo è [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), che finge di essere equivalente al legittimo [token ARB](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1).

Il modo più semplice per sapere quale sia il token legittimo è guardare l'organizzazione di origine, [Arbitrum](https://arbitrum.foundation/). Gli indirizzi legittimi sono specificati [nella loro documentazione](https://docs.arbitrum.foundation/deployment-addresses#token).

### Perché il codice sorgente è disponibile? {#why-source}

Normalmente ci aspetteremmo che le persone che cercano di truffare gli altri siano reticenti, e in effetti molti token truffa non hanno il loro codice disponibile (ad esempio, [questo](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) e [questo](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)).

Tuttavia, i token legittimi di solito pubblicano il loro codice sorgente, quindi per apparire legittimi a volte gli autori dei token truffa fanno lo stesso. [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) è uno di quei token con codice sorgente disponibile, il che rende più facile comprenderlo.

Sebbene i distributori dei contratti possano scegliere se pubblicare o meno il codice sorgente, _non possono_ pubblicare il codice sorgente sbagliato. L'esploratore di blocchi compila il codice sorgente fornito in modo indipendente e, se non ottiene l'esatto stesso bytecode, rifiuta quel codice sorgente. [Puoi leggere di più al riguardo sul sito di Etherscan](https://etherscan.io/verifyContract).

## Confronto con i token ERC-20 legittimi {#compare-legit-erc20}

Confronteremo questo token con i token ERC-20 legittimi. Se non hai familiarità con il modo in cui vengono tipicamente scritti i token ERC-20 legittimi, [consulta questo tutorial](/developers/tutorials/erc20-annotated-code/).

### Costanti per gli indirizzi privilegiati {#constants-for-privileged-addresses}

I contratti a volte necessitano di indirizzi privilegiati. I contratti progettati per un uso a lungo termine consentono ad alcuni indirizzi privilegiati di modificare tali indirizzi, ad esempio per abilitare l'uso di un nuovo contratto multifirma. Ci sono diversi modi per farlo.

Il [contratto del token `HOP`](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) utilizza il pattern [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable). L'indirizzo privilegiato è conservato nell'archiviazione, in un campo chiamato `_owner` (vedi il terzo file, `Ownable.sol`).

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

Il [contratto del token `ARB`](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) non ha direttamente un indirizzo privilegiato. Tuttavia, non ne ha bisogno. Si trova dietro un [`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) all'[indirizzo `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code). Quel contratto ha un indirizzo privilegiato (vedi il quarto file, `ERC1967Upgrade.sol`) che può essere utilizzato per gli aggiornamenti.

```solidity
    /* *
     * @dev Memorizza un nuovo indirizzo nello slot admin EIP1967. */
    


    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: new admin is the zero address");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

Al contrario, il contratto `wARB` ha un `contract_owner` hardcoded.

```solidity
contract WrappedArbitrum is Context, IERC20 {
    .
    .
    .
    address deployer = 0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1;
    address public contract_owner = 0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33;
    .
    .
    .
}
```

[Questo proprietario del contratto](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) non è un contratto che potrebbe essere controllato da account diversi in momenti diversi, ma un [account controllato esternamente ](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs). Ciò significa che è probabilmente progettato per un uso a breve termine da parte di un individuo, piuttosto che come soluzione a lungo termine per controllare un ERC-20 che manterrà il suo valore.

E in effetti, se guardiamo su Etherscan vediamo che il truffatore ha utilizzato questo contratto solo per 12 ore (dalla [prima transazione](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) all'[ultima transazione](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b)) durante il 19 maggio 2023.

### La finta funzione `_transfer` {#the-fake-transfer-function}

È standard che i trasferimenti effettivi avvengano utilizzando [una funzione interna `_transfer`](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer).

In `wARB` questa funzione sembra quasi legittima:

```solidity
    function _transfer(address sender, address recipient, uint256 amount)  internal virtual{
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

La parte sospetta è:

```solidity
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
```

Se il proprietario del contratto invia token, perché l'evento `Transfer` mostra che provengono dal `deployer`?

Tuttavia, c'è un problema più importante. Chi chiama questa funzione `_transfer`? Non può essere chiamata dall'esterno, è contrassegnata come `internal`. E il codice che abbiamo non include alcuna chiamata a `_transfer`. Chiaramente, è qui come esca.

```solidity
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

Quando guardiamo le funzioni che vengono chiamate per trasferire i token, `transfer` e `transferFrom`, vediamo che chiamano una funzione completamente diversa, `_f_`.

### La vera funzione `_f_` {#the-real-f-function}

```solidity
    function _f_(address sender, address recipient, uint256 amount) internal _mod_(sender,recipient,amount) virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){

            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

Ci sono due potenziali campanelli d'allarme in questa funzione.

- L'uso del [modificatore di funzione](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_`. Tuttavia, quando esaminiamo il codice sorgente vediamo che `_mod_` è in realtà innocuo.

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
```

- Lo stesso problema che abbiamo visto in `_transfer`, ovvero quando il `contract_owner` invia token, questi sembrano provenire dal `deployer`.

### La finta funzione di eventi `dropNewTokens` {#the-fake-events-function-dropNewTokens}

Ora arriviamo a qualcosa che sembra una vera e propria truffa. Ho modificato un po' la funzione per renderla più leggibile, ma è funzionalmente equivalente.

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

Questa funzione ha il modificatore `auth()`, il che significa che può essere chiamata solo dal proprietario del contratto.

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Not allowed to interact");
    _;
}
```

Questa restrizione ha perfettamente senso, perché non vorremmo che account casuali distribuissero token. Tuttavia, il resto della funzione è sospetto.

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

Una funzione per trasferire da un account pool a un array di destinatari un array di importi ha perfettamente senso. Ci sono molti casi d'uso in cui si desidera distribuire token da una singola fonte a più destinazioni, come buste paga, airdrop, ecc. È più economico (in termini di gas) farlo in una singola transazione invece di emettere più transazioni, o persino chiamare l'ERC-20 più volte da un contratto diverso come parte della stessa transazione.

Tuttavia, `dropNewTokens` non fa questo. Emette [eventi `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1), ma in realtà non trasferisce alcun token. Non c'è alcun motivo legittimo per confondere le applicazioni fuori catena comunicando loro un trasferimento che non è realmente avvenuto.

### La funzione `Approve` che brucia i token {#the-burning-approve-function}

I contratti ERC-20 dovrebbero avere [una funzione `approve`](/developers/tutorials/erc20-annotated-code/#approve) per le indennità, e in effetti il nostro token truffa ha una tale funzione, ed è persino corretta. Tuttavia, poiché Solidity deriva dal C, fa distinzione tra maiuscole e minuscole. "Approve" e "approve" sono stringhe diverse.

Inoltre, la funzionalità non è correlata ad `approve`.

```solidity
    function Approve(
        address[] memory holders)
```

Questa funzione viene chiamata con un array di indirizzi per i detentori del token.

```solidity
    public approver() {
```

Il modificatore `approver()` si assicura che solo il `contract_owner` sia autorizzato a chiamare questa funzione (vedi sotto).

```solidity
        for (uint256 i = 0; i < holders.length; i++) {
            uint256 amount = _balances[holders[i]];
            _beforeTokenTransfer(holders[i], 0x0000000000000000000000000000000000000001, amount);
            _balances[holders[i]] = _balances[holders[i]].sub(amount,
                "ERC20: burn amount exceeds balance");
            _balances[0x0000000000000000000000000000000000000001] =
                _balances[0x0000000000000000000000000000000000000001].add(amount);
        }
    }

```

Per ogni indirizzo del detentore, la funzione sposta l'intero saldo del detentore all'indirizzo `0x00...01`, di fatto bruciandolo (il vero `burn` nello standard modifica anche l'offerta totale e trasferisce i token a `0x00...00`). Ciò significa che il `contract_owner` può rimuovere gli asset di qualsiasi utente. Non sembra una funzionalità che vorresti in un token di governance.

### Problemi di qualità del codice {#code-quality-issues}

Questi problemi di qualità del codice non _provano_ che questo codice sia una truffa, ma lo fanno apparire sospetto. Le aziende organizzate come Arbitrum di solito non rilasciano codice così scadente.

#### La funzione `mount` {#the-mount-function}

Sebbene non sia specificato nello [standard](https://eips.ethereum.org/EIPS/eip-20), in generale la funzione che crea nuovi token è chiamata [`mint`](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) (coniare).

Se guardiamo nel costruttore di `wARB`, vediamo che la funzione di conio è stata rinominata in `mount` per qualche motivo, e viene chiamata cinque volte con un quinto dell'offerta iniziale, invece di una volta per l'intero importo per efficienza.

```solidity
    constructor () public {

        _name = "Wrapped Arbitrum";
        _symbol = "wARB";
        _decimals = 18;
        uint256 initialSupply = 1000000000000;

        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
    }
```

Anche la funzione `mount` stessa è sospetta.

```solidity
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: mint to the zero address");
```

Guardando il `require`, vediamo che solo il proprietario del contratto è autorizzato a coniare. Questo è legittimo. Ma il messaggio di errore dovrebbe essere _only owner is allowed to mint_ (solo il proprietario è autorizzato a coniare) o qualcosa del genere. Invece, è l'irrilevante _ERC20: mint to the zero address_ (ERC20: conio all'indirizzo zero). Il test corretto per il conio all'indirizzo zero è `require(account != address(0), "<messaggio di errore>")`, che il contratto non si preoccupa mai di controllare.

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Ci sono altri due fatti sospetti, direttamente correlati al conio:

- C'è un parametro `account`, che presumibilmente è l'account che dovrebbe ricevere l'importo coniato. Ma il saldo che aumenta è in realtà quello del `contract_owner`.

- Sebbene il saldo aumentato appartenga al `contract_owner`, l'evento emesso mostra un trasferimento all'`account`.

### Perché sia `auth` che `approver`? Perché il `mod` che non fa nulla? {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

Questo contratto contiene tre modificatori: `_mod_`, `auth` e `approver`.

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_` accetta tre parametri e non fa nulla con essi. Perché averlo?

```solidity
    modifier auth() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }

    modifier approver() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }
```

`auth` e `approver` hanno più senso, perché controllano che il contratto sia stato chiamato dal `contract_owner`. Ci aspetteremmo che certe azioni privilegiate, come il conio, siano limitate a quell'account. Tuttavia, qual è lo scopo di avere due funzioni separate che fanno _esattamente la stessa cosa_?

## Cosa possiamo rilevare automaticamente? {#what-can-we-detect-automatically}

Possiamo vedere che `wARB` è un token truffa guardando su Etherscan. Tuttavia, questa è una soluzione centralizzata. In teoria, Etherscan potrebbe essere sovvertito o hackerato. È meglio essere in grado di capire in modo indipendente se un token è legittimo o meno.

Ci sono alcuni trucchi che possiamo usare per identificare che un token ERC-20 è sospetto (che sia una truffa o scritto molto male), guardando gli eventi che emettono.

## Eventi `Approval` sospetti {#suspicious-approval-events}

Gli [eventi `Approval`](https://eips.ethereum.org/EIPS/eip-20#approval) dovrebbero verificarsi solo con una richiesta diretta (a differenza degli [eventi `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1) che possono verificarsi come risultato di un'indennità). [Consulta la documentazione di Solidity](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin) per una spiegazione dettagliata di questo problema e del perché le richieste debbano essere dirette, piuttosto che mediate da un contratto.

Ciò significa che gli eventi `Approval` che approvano la spesa da un [account controllato esternamente ](/developers/docs/accounts/#types-of-account) devono provenire da transazioni che hanno origine in quell'account e la cui destinazione è il contratto ERC-20. Qualsiasi altro tipo di approvazione da un account controllato esternamente  è sospetto.

Ecco [un programma che identifica questo tipo di evento](https://github.com/qbzzt/20230915-scam-token-detection), utilizzando [viem](https://viem.sh/) e [TypeScript](https://www.typescriptlang.org/docs/), una variante di JavaScript con sicurezza dei tipi. Per eseguirlo:

1. Copia `.env.example` in `.env`.
2. Modifica `.env` per fornire l'URL a un nodo della rete principale di Ethereum.
3. Esegui `pnpm install` per installare i pacchetti necessari.
4. Esegui `pnpm susApproval` per cercare approvazioni sospette.

Ecco una spiegazione riga per riga:

```typescript
import {
  Address,
  TransactionReceipt,
  createPublicClient,
  http,
  parseAbiItem,
} from "viem"
import { mainnet } from "viem/chains"
```

Importa le definizioni dei tipi, le funzioni e la definizione della catena da `viem`.

```typescript
import { config } from "dotenv"
config()
```

Leggi `.env` per ottenere l'URL.

```typescript
const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.URL),
})
```

Crea un client Viem. Dobbiamo solo leggere dalla blockchain, quindi questo client non ha bisogno di una chiave privata.

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

L'indirizzo del contratto ERC-20 sospetto e i blocchi all'interno dei quali cercheremo gli eventi. I fornitori di nodi in genere limitano la nostra capacità di leggere gli eventi perché la larghezza di banda può diventare costosa. Fortunatamente `wARB` non è stato in uso per un periodo di diciotto ore, quindi possiamo cercare tutti gli eventi (ce n'erano solo 13 in totale).

```typescript
const approvalEvents = await client.getLogs({
  address: testedAddress,
  fromBlock,
  toBlock,
  event: parseAbiItem(
    "event Approval(address indexed _owner, address indexed _spender, uint256 _value)"
  ),
})
```

Questo è il modo per chiedere a Viem informazioni sugli eventi. Quando gli forniamo l'esatta firma dell'evento, inclusi i nomi dei campi, analizza l'evento per noi.

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

Il nostro algoritmo è applicabile solo agli account controllati esternamente. Se c'è del bytecode restituito da `client.getBytecode` significa che si tratta di un contratto e dovremmo semplicemente saltarlo.

Se non hai mai usato TypeScript prima, la definizione della funzione potrebbe sembrare un po' strana. Non gli diciamo solo che il primo (e unico) parametro si chiama `addr`, ma anche che è di tipo `Address`. Allo stesso modo, la parte `: boolean` dice a TypeScript che il valore di ritorno della funzione è un booleano.

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

Questa funzione ottiene la ricevuta della transazione da un evento. Abbiamo bisogno della ricevuta per assicurarci di sapere quale fosse la destinazione della transazione.

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

Questa è la funzione più importante, quella che decide effettivamente se un evento è sospetto o meno. Il tipo di ritorno, `(Event | null)`, dice a TypeScript che questa funzione può restituire un `Event` o `null`. Restituiamo `null` se l'evento non è sospetto.

```typescript
const owner = ev.args._owner
```

Viem ha i nomi dei campi, quindi ha analizzato l'evento per noi. `_owner` è il proprietario dei token da spendere.

```typescript
// Le approvazioni da parte dei contratti non sono sospette
if (await isContract(owner)) return null
```

Se il proprietario è un contratto, supponiamo che questa approvazione non sia sospetta. Per verificare se l'approvazione di un contratto è sospetta o meno, dovremo tracciare l'intera esecuzione della transazione per vedere se è mai arrivata al contratto proprietario e se quel contratto ha chiamato direttamente il contratto ERC-20. Questo è molto più dispendioso in termini di risorse di quanto vorremmo fare.

```typescript
const txn = await getEventTxn(ev)
```

Se l'approvazione proviene da un account controllato esternamente , ottieni la transazione che l'ha causata.

```typescript
// L'approvazione è sospetta se proviene da un proprietario EOA che non è il `from` della transazione
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

Non possiamo semplicemente controllare l'uguaglianza delle stringhe perché gli indirizzi sono esadecimali, quindi contengono lettere. A volte, ad esempio in `txn.from`, quelle lettere sono tutte minuscole. In altri casi, come `ev.args._owner`, l'indirizzo è in [maiuscolo e minuscolo misto per l'identificazione degli errori](https://eips.ethereum.org/EIPS/eip-55).

Ma se la transazione non proviene dal proprietario, e quel proprietario è controllato esternamente, allora abbiamo una transazione sospetta.

```typescript
// È anche sospetta se la destinazione della transazione non è il contratto ERC-20 che stiamo
// indagando
if (txn.to.toLowerCase() != testedAddress) return ev
```

Allo stesso modo, se l'indirizzo `to` della transazione, il primo contratto chiamato, non è il contratto ERC-20 sotto indagine, allora è sospetto.

```typescript
    // Se non c'è motivo di sospettare, restituisci null.
    return null
}
```

Se nessuna delle due condizioni è vera, l'evento `Approval` non è sospetto.

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[Una funzione `async`](https://www.w3schools.com/js/js_async.asp) restituisce un oggetto `Promise`. Con la sintassi comune, `await x()`, aspettiamo che quella `Promise` venga soddisfatta prima di continuare l'elaborazione. Questo è semplice da programmare e seguire, ma è anche inefficiente. Mentre aspettiamo che la `Promise` per un evento specifico venga soddisfatta, possiamo già iniziare a lavorare sull'evento successivo.

Qui usiamo [`map`](https://www.w3schools.com/jsref/jsref_map.asp) per creare un array di oggetti `Promise`. Quindi usiamo [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/) per aspettare che tutte quelle promesse vengano risolte. Successivamente usiamo [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp) su quei risultati per rimuovere gli eventi non sospetti.

### Eventi `Transfer` sospetti {#suspicious-transfer-events}

Un altro modo possibile per identificare i token truffa è vedere se hanno trasferimenti sospetti. Ad esempio, trasferimenti da account che non hanno così tanti token. Puoi vedere [come implementare questo test](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts), ma `wARB` non ha questo problema.

## Conclusione {#conclusion}

Il rilevamento automatico delle truffe ERC-20 soffre di [falsi negativi](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error), perché una truffa può utilizzare un contratto di token ERC-20 perfettamente normale che semplicemente non rappresenta nulla di reale. Quindi dovresti sempre tentare di _ottenere l'indirizzo del token da una fonte attendibile_.

Il rilevamento automatico può aiutare in certi casi, come nei componenti della DeFi, dove ci sono molti token e devono essere gestiti automaticamente. Ma come sempre [caveat emptor](https://www.investopedia.com/terms/c/caveatemptor.asp), fai le tue ricerche e incoraggia i tuoi utenti a fare lo stesso.

[Vedi qui per altri miei lavori](https://cryptodocguy.pro/).