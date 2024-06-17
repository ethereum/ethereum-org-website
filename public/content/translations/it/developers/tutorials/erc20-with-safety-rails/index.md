---
title: ERC-20 con barriere di sicurezza
description: Come aiutare le persone a evitare errori banali
author: Ori Pomerantz
lang: it
tags:
  - "erc-20"
skill: beginner
published: 2022-08-15
---

## Introduzione {#introduction}

Una delle cose fantastiche su Ethereum è che non esiste un'autorità centrale che possa modificare o annullare le tue transazioni. Uno dei suoi grandi problemi è che non c'è un'autorità centrale con il potere di annullare gli errori o le transazioni illecite degli utenti. In questo articolo imparerai alcuni dei comuni errori che gli utenti commettono con i token [ERC-20](/developers/docs/standards/tokens/erc-20/), nonché come creare dei contratti ERC-20 che aiutano gli utenti a evitarli, o danno poteri a un'autorità centrale (ad esempio, congelare gli account).

Nota che, mentre utilizzeremo il [contratto del token ERC-20 di OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20), questo articolo non lo spiega nel dettaglio. Puoi trovare queste informazioni [qui](/developers/tutorials/erc20-annotated-code).

Se desideri visualizzare il codice sorgente completo:

1. Apri l'[IDE di Remix](https://remix.ethereum.org/).
2. Clicca l'icona di clonazione di GitHub (![clone github icon](icon-clone.png)).
3. Clona la repository di GitHub `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. Apri **contratti > erc20-safety-rails.sol**.

## Creare un contratto ERC-20 {#creating-an-erc-20-contract}

Prima di poter aggiungere la funzionalità della barriera di sicurezza, ci occorre un contratto ERC-20. In questo articolo utilizzeremo [la procedura guidata dei contratti di OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/wizard). Aprila in un altro browser e segui queste istruzioni:

1. Seleziona **ERC20**.
2. Inserisci queste impostazioni:

   | Parametro       | Valore           |
   | --------------- | ---------------- |
   | Nome            | SafetyRailsToken |
   | Symbol          | SAFE             |
   | Premint         | 1000             |
   | Caratteristiche | Nessuno          |
   | Access Control  | Ownable          |
   | Upgradability   | Nessuno          |

3. Scorri in alto e clicca su **Apri su Remix** (per Remix) o su **Scarica** per utilizzare un ambiente differente. Supporrò che tu stia utilizzando Remix, altrimenti, effettua le modifiche appropriate.
4. Ora, abbiamo un contratto ERC-20 pienamente funzionante. Puoi espandere `.deps` > `npm` per visualizzare il codice importato.
5. Compila, distribuisci e gioca con il contratto, per scoprire che funziona come un contratto ERC-20. Se devi apprendere come funziona Remix, [utilizza questo tutorial](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Errori comuni {#common-mistakes}

### Gli errori {#the-mistakes}

Gli utenti, talvolta, inviano dei token all'indirizzo errato. Anche se non possiamo leggere la loro mente per sapere cosa intendevano fare, ci sono due tipi di errore che capitano spesso e sono facili da rilevare:

1. Inviare i token all'indirizzo del contratto. Ad esempio, il [token OP di Optimism](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) è riuscito ad accumulare [oltre 120.000](https://optimistic.etherscan.io/address/0x4200000000000000000000000000000000000042#tokentxns) token OP in meno di due mesi. Questo rappresenta una significativa quantità di ricchezza che, presumibilmente, è semplicemente stata persa dalle persone.

2. Inviare i token a un indirizzo vuoto, non corrispondente a un [conto posseduto esternamente](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) o a un [contratto intelligente](/developers/docs/smart-contracts). Sebbene non siano disponibili le statistiche su quanto spesso si verifichi, [un incidente potrebbe costare fino a 20.000.000 token](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Prevenire i trasferimenti {#preventing-transfers}

Il contratto ERC-20 di OpenZeppelin include [un hook, `_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368), chiamato prima del trasferimento di un token. Per impostazione predefinita, questo hook non fa nulla, ma possiamo allegarci la nostra funzionalità, come controlli che ripristinano la transazione se si verifica un problema.

Per utilizzare l'hook, aggiungi questa funzione dopo il costruttore:

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

Alcune parti di questa funzione potrebbero essere nuove, se non hai familiarità con Solidity:

```solidity
        internal virtual
```

La parola chiave `virtual` signiica che appena abbiamo ereditato la funzionalità da `ERC20` e sovrascritto questa funzione, gli altri contratti possono ereditare da noi e sovrascriverla.

```solidity
        override(ERC20)
```

Dobbiamo specificare esplicitamente che stiamo [sovrascrivendo](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding) la definizione del token ERC20 di `_beforeTokenTransfer`. In generale, le definizioni esplicite sono molto migliori, dal punto di vista della sicurezza, rispetto a quelle implicite: non puoi dimenticare di aver fatto qualcosa se ce l'hai davanti. Questo è anche il motivo per cui dobbiamo specificare il `_beforeTokenTransfer` di quale superclasse stiamo sovrascrivendo.

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

Questa riga chiama la funzione `_beforeTokenTransfer` del contratto o dei contratti da cui abbiamo ereditato o che la contengono. In qusto caso, è solo `ERC20`, `Ownable` non contiene questo hook. Sebbene correntemente `ERC20._beforeTokenTransfer` non faccia nulla, lo chiamiamo nel caso in cui la funzionalità sia aggiunta in futuro (e, quindi, decidiamo di ridistribuire il contratto, poiché i contratti non cambiano dopo la distribuzione).

### Codifica dei requisiti {#coding-the-requirements}

Vogliamo aggiungere questi requisiti alla funzione:

- L'indirizzo `to` non può equivalere ad `address(this)`, l'indirizzo dello stesso contratto ERC-20.
- L'indirizzo `to` non può essere vuoto, dev'essere:
  - Account posseduti esternamente (EOA). Non possiamo verificare se un indirizzo è un EOA direttamente, ma possiamo verificare il saldo di ETH di un indirizzo. Gli EOA contengono quasi sempre un saldo, anche se non sono più utilizzati; è difficile ripulirli fino all'ultimo wei.
  - Un contratto intelligente. Testare se un indirizzo è un contratto intelligente è più difficile. Esiste un codice operativo che controlla la lunghezza del codice esterno, chiamato [`EXTCODESIZE`](https://www.evm.codes/#3b), ma non è direttamente disponibile in Solidity. Dobbiamo utilizzare [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html), un assemblaggio dell'EVM, per farlo. Esistono altri valori che potremmo utilizzare da Solidity ([`<address>.code` e `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types)), ma costano di più.

Analizziamo il codice, riga per riga:

```solidity
        require(to != address(this), "Can't send tokens to the contract address");
```

Questo è il primo requisito, controlla che `to` `this(address)` non siano la stessa cosa.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

È così che controlliamo se un indirizzo è un contratto. Non possiamo ricevere direttamente il risultato da Yul, quindi, invece, definiamo una variabile che detenga il risultato (`isToContract` in questo caso). Yul funziona così: ogni codice operativo è considerato come una funzione. Quindi, prima chiamiamo [`EXTCODESIZE`](https://www.evm.codes/#3b) per ottenere le dimensioni del contratto, quindi utilizziamo [`GT`](https://www.evm.codes/#11) per verificare che non sia zero (stiamo avendo a che fare con interi non firmati, quindi, ovviamente, non possono essere negativi). Poi, dobbiamo scrivere il risultato in `isToContract`.

```solidity
        require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
```

E, infine, abbiamo il controllo effettivo per gli indirizzi vuoti.

## Accesso amministrativo {#admin-access}

Talvolta è utile avere un amministratore che possa annullare gli errori. Per ridurre il potenziale di abusi, questo può essere una [multifirma](https://blog.logrocket.com/security-choices-multi-signature-wallets/), quindi più persone devono approvare un'azione. In questo articolo abbiamo due funzionalità amministrative:

1. Congelamento e scongelamento degli account. Utile, ad esempio, quando un account potrebbe essere compromesso.
2. Pulizia della risorsa.

   Talvolta, i truffatori inviano token fraudolenti al contratto del token reale, per ottenere legittimità. Ad esempio, [vedi qui](https://optimistic.etherscan.io/token/0x2348b1a1228ddcd2db668c3d30207c3e1852fbbe?a=0x4200000000000000000000000000000000000042). Il contratto ERC-20 legittimo è [0x4200....0042](https://optimistic.etherscan.io/address/0x4200000000000000000000000000000000000042). La truffa che pretende di essere tale contratto è [0x234....bbe](https://optimistic.etherscan.io/address/0x2348b1a1228ddcd2db668c3d30207c3e1852fbbe).

   Inoltre, è possibile che le persone inviino token ERC-20 legittimi al nostro contratto per errore, un altro motivo per cui vogliamo avere un modo per farli uscire.

OpenZeppelin fornisce due meccanismi per consentire l'accesso amministrativo:

- I contratti [`Ownable`](https://docs.openzeppelin.com/contracts/4.x/access-control#ownership-and-ownable) hanno un singolo proprietario. Le funzioni aventi il [modificatore](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `onlyOwner` possono essere chiamate soltanto dal proprietario. I proprietari possono trasferire la proprietà a qualcun altro o rinunciarvi completamente. I diritti di tutti gli altri account sono solitamente identici.
- I contratti [`AccessControl`](https://docs.openzeppelin.com/contracts/4.x/access-control#role-based-access-control) hanno il [controllo d'accesso basato sul ruolo (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control).

Per semplicità, in questo articolo utilizzeremo `Ownable`.

### Congelare e scongelare i contratti {#freezing-and-thawing-contracts}

Congelare e scongelare i contratti richiede diverse modifiche:

- Una [mappatura](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) dagli indirizzi a [booleani](https://en.wikipedia.org/wiki/Boolean_data_type) per tenere traccia di quali indirizzi siano congelati. Tutti i valori sono inizialmente pari a zero, che per i valori booleani è interpretato come falso. Questo è ciò che vogliamo perché gli account non sono congelati per impostazione predefinita.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- [Eventi](https://www.tutorialspoint.com/solidity/solidity_events.htm) per informare chiunque sia interessato quando un account è congelato o scongelato. Tecnicamente parlando, gli eventi non sono necessari per tali azioni, ma aiutano il codice esterno alla catena a essere capace di ascoltare tali eventi e sapere che sta succedendo. È considerata buona pratica, per un contratto intelligente, di emetterli quando si verifica qualcosa che potrebbe essere rilevante per qualcuno.

  Gli eventi sono indicizzati, quindi sarà possibile cercarli tutte le volte che un account è stato congelato o scongelato.

  ```solidity
    // When accounts are frozen or unfrozen
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- Funzioni per congelare e scongelare gli account. Queste due funzioni sono quasi identiche, quindi analizzeremo soltanto la funzione di congelamento.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  Le funzioni contrassegnate come [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm), possono essere chiamate da altri contratti intelligenti o direttamente da una transazione.

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  Se l'account è già congelato, si ripristina. Altrimenti, lo congela ed emette (`emit`) un evento.

- Modificare `_beforeTokenTransfer` per impedire che il denaro sia spostato da un account congelato. Nota che il denaro è ancora trasferibile in un account congelato.

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
  ```

### Pulizia della risorsa {#asset-cleanup}

Per rilasciare i token ERC-20 detenuti da questo contratto, dobbiamo chiamare una funzione sul contratto del token cui aappartengono, [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) o [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve). Non ha senso, in questo caso, sprecare gas sulle indennità, potremmo anche trasferirle direttamente.

```solidity
    function cleanupERC20(
        address erc20,
        address dest
    )
        public
        onlyOwner
    {
        IERC20 token = IERC20(erc20);
```

Questa è la sintassi per creare un oggetto per un contratto quando riceviamo l'indirizzo. Possiamo farlo perché abbiamo la definizione per i token ERC20 come parte del codice sorgente (vedi riga 4) e tale file include [la definizione per IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol), l'interfaccia per un contratto ERC-20 di OpenZeppelin.

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

Questa è una funzione di pulizia, quindi, presumibilmente, non vogliamo lasciare alcun token. Invece di ottenere manualmente il saldo dall'utente, potremmo automatizzare anche questo processo.

## Conclusioni {#conclusion}

Questa non è una soluzione perfetta, non esiste una soluzione perfetta al problema "un utente ha commesso un errore". Tuttavia, utilizzando questi tipi di controlli, alcuni errori possono almeno essere prevenuti. L'abilità di congelare gli account, sebbene pericolosa, è utilizzabile per limitare i danni di certi attacchi, negando all'hacker i fondi rubati.
