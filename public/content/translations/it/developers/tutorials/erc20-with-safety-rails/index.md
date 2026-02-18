---
title: ERC-20 con barriere di sicurezza
description: Come aiutare le persone a evitare errori banali
author: Ori Pomerantz
lang: it
tags: [ "erc-20" ]
skill: beginner
published: 2022-08-15
---

## Introduzione {#introduction}

Una delle cose fantastiche di Ethereum è che non esiste un'autorità centrale che possa modificare o annullare le tue transazioni. Uno dei grandi problemi di Ethereum è che non esiste un'autorità centrale con il potere di annullare gli errori degli utenti o le transazioni illecite. In questo articolo imparerai alcuni degli errori comuni che gli utenti commettono con i token [ERC-20](/developers/docs/standards/tokens/erc-20/), nonché come creare contratti ERC-20 che aiutino gli utenti a evitare quegli errori, o che diano a un'autorità centrale un certo potere (ad esempio per congelare gli account).

Nota che, sebbene useremo il [contratto di token ERC-20 di OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20), questo articolo non lo spiega nel dettaglio. Puoi trovare queste informazioni [qui](/developers/tutorials/erc20-annotated-code).

Se vuoi vedere il codice sorgente completo:

1. Apri [Remix IDE](https://remix.ethereum.org/).
2. Fai clic sull'icona per clonare da github (![icona per clonare da github](icon-clone.png)).
3. Clona la repository di GitHub `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. Apri **contracts > erc20-safety-rails.sol**.

## Creazione di un contratto ERC-20 {#creating-an-erc-20-contract}

Prima di poter aggiungere la funzionalità della barriera di sicurezza, abbiamo bisogno di un contratto ERC-20. In questo articolo useremo [OpenZeppelin Contracts Wizard](https://docs.openzeppelin.com/contracts/5.x/wizard). Aprilo in un altro browser e segui queste istruzioni:

1. Seleziona **ERC20**.

2. Inserisci queste impostazioni:

   | Parametro       | Valore           |
   | --------------- | ---------------- |
   | Nome            | SafetyRailsToken |
   | Simbolo         | SAFE             |
   | Premint         | 1000             |
   | Caratteristiche | Nessuno          |
   | Access Control  | Ownable          |
   | Upgradability   | Nessuno          |

3. Scorri verso l'alto e fai clic su **Open in Remix** (per Remix) o **Download** per usare un ambiente diverso. Darò per scontato che tu stia usando Remix, se usi qualcos'altro apporta le modifiche appropriate.

4. Ora abbiamo un contratto ERC-20 perfettamente funzionante. Puoi espandere `.deps` > `npm` per vedere il codice importato.

5. Compila, distribuisci e interagisci con il contratto per vedere che funziona come un contratto ERC-20. Se hai bisogno di imparare a usare Remix, [usa questa guida](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Errori comuni {#common-mistakes}

### Gli errori {#the-mistakes}

A volte gli utenti inviano token all'indirizzo sbagliato. Anche se non possiamo leggere loro nel pensiero per sapere cosa intendevano fare, ci sono due tipi di errore che si verificano spesso e sono facili da individuare:

1. Inviare i token all'indirizzo del contratto stesso. Ad esempio, il [token OP di Optimism](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) è riuscito ad accumulare [oltre 120.000](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) token OP in meno di due mesi. Questo rappresenta una quantità significativa di ricchezza che presumibilmente le persone hanno semplicemente perso.

2. Inviare i token a un indirizzo vuoto, uno che non corrisponde a un [conto posseduto esternamente](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) o a un [contratto intelligente](/developers/docs/smart-contracts). Anche se non ho statistiche sulla frequenza con cui ciò accade, [un incidente sarebbe potuto costare 20.000.000 di token](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Prevenire i trasferimenti {#preventing-transfers}

Il contratto ERC-20 di OpenZeppelin include [un hook, `_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368), che viene chiamato prima che un token venga trasferito. Per impostazione predefinita questo hook non fa nulla, ma possiamo agganciarvi la nostra funzionalità, come dei controlli che eseguono il revert della transazione se c'è un problema.

Per usare l'hook, aggiungi questa funzione dopo il costruttore:

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

Alcune parti di questa funzione potrebbero esserti nuove se non hai molta familiarità con Solidity:

```solidity
        internal virtual
```

La parola chiave `virtual` significa che, proprio come noi abbiamo ereditato la funzionalità da `ERC20` e sovrascritto questa funzione, altri contratti possono ereditare da noi e sovrascrivere questa funzione.

```solidity
        override(ERC20)
```

Dobbiamo specificare esplicitamente che stiamo [sovrascrivendo](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding) la definizione del token ERC20 di `_beforeTokenTransfer`. In generale, le definizioni esplicite sono molto meglio, dal punto di vista della sicurezza, di quelle implicite: non puoi dimenticare di aver fatto qualcosa se ce l'hai proprio di fronte. Questo è anche il motivo per cui dobbiamo specificare quale `_beforeTokenTransfer` della superclasse stiamo sovrascrivendo.

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

Questa riga chiama la funzione `_beforeTokenTransfer` del contratto (o dei contratti) da cui ereditiamo e che la possiede. In questo caso, si tratta solo di `ERC20`, `Ownable` non ha questo hook. Anche se attualmente `ERC20._beforeTokenTransfer` non fa nulla, lo chiamiamo nel caso in cui una funzionalità venga aggiunta in futuro (e decidiamo quindi di ridistribuire il contratto, perché i contratti non cambiano dopo la distribuzione).

### Codifica dei requisiti {#coding-the-requirements}

Vogliamo aggiungere questi requisiti alla funzione:

- L'indirizzo `to` non può essere uguale a `address(this)`, l'indirizzo del contratto ERC-20 stesso.
- L'indirizzo `to` non può essere vuoto, deve essere:
  - Un conto posseduto esternamente (EOA). Non possiamo verificare direttamente se un indirizzo è un EOA, ma possiamo controllare il saldo ETH di un indirizzo. Gli EOA hanno quasi sempre un saldo, anche se non sono più utilizzati: è difficile svuotarli fino all'ultimo wei.
  - Un contratto intelligente. Verificare se un indirizzo è un contratto intelligente è un po' più difficile. Esiste un opcode che controlla la lunghezza del codice esterno, chiamato [`EXTCODESIZE`](https://www.evm.codes/#3b), ma non è disponibile direttamente in Solidity. Dobbiamo usare [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html), che è l'assembly della EVM, per farlo. Ci sono altri valori che potremmo usare da Solidity ([`<address>.code` e `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types)), ma costano di più.

Analizziamo il nuovo codice riga per riga:

```solidity
        require(to != address(this), "Impossibile inviare token all'indirizzo del contratto");
```

Questo è il primo requisito, verificare che `to` e `address(this)` non siano la stessa cosa.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

Questo è il modo in cui verifichiamo se un indirizzo è un contratto. Non possiamo ricevere l'output direttamente da Yul, quindi definiamo una variabile per contenere il risultato (`isToContract` in questo caso). Il modo in cui Yul funziona è che ogni opcode è considerato una funzione. Quindi, prima chiamiamo [`EXTCODESIZE`](https://www.evm.codes/#3b) per ottenere la dimensione del contratto, e poi usiamo [`GT`](https://www.evm.codes/#11) per verificare che non sia zero (stiamo trattando con interi senza segno, quindi ovviamente non può essere negativo). Quindi scriviamo il risultato in `isToContract`.

```solidity
        require(to.balance != 0 || isToContract, "Impossibile inviare token a un indirizzo vuoto");
```

E infine, abbiamo il controllo effettivo per gli indirizzi vuoti.

## Accesso amministrativo {#admin-access}

A volte è utile avere un amministratore che possa annullare gli errori. Per ridurre il potenziale di abuso, questo amministratore può essere un [multisig](https://blog.logrocket.com/security-choices-multi-signature-wallets/) in modo che più persone debbano concordare un'azione. In questo articolo avremo due funzioni amministrative:

1. Congelamento e scongelamento dei conti. Può essere utile, ad esempio, quando un account potrebbe essere compromesso.
2. Pulizia degli asset.

   A volte i truffatori inviano token fraudolenti al contratto del token reale per ottenere legittimità. Ad esempio, [vedi qui](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders). Il contratto ERC-20 legittimo è [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042). La truffa che finge di essere tale è [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe).

   È anche possibile che le persone inviino per errore token ERC-20 legittimi al nostro contratto, che è un altro motivo per cui avere un modo per recuperarli.

OpenZeppelin fornisce due meccanismi per abilitare l'accesso amministrativo:

- I contratti [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) hanno un unico proprietario. Le funzioni che hanno il [modificatore](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `onlyOwner` possono essere chiamate solo da quel proprietario. I proprietari possono trasferire la proprietà a qualcun altro o rinunciarvi completamente. I diritti di tutti gli altri conti sono in genere identici.
- I contratti [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) hanno il [controllo degli accessi basato sui ruoli (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control).

Per semplicità, in questo articolo usiamo `Ownable`.

### Congelare e scongelare i contratti {#freezing-and-thawing-contracts}

Congelare e scongelare i contratti richiede diverse modifiche:

- Una [mappa](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) da indirizzi a [booleani](https://en.wikipedia.org/wiki/Boolean_data_type) per tenere traccia di quali indirizzi sono congelati. Tutti i valori sono inizialmente zero, che per i valori booleani è interpretato come falso. Questo è ciò che vogliamo perché per impostazione predefinita i conti non sono congelati.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- Gli [eventi](https://www.tutorialspoint.com/solidity/solidity_events.htm) servono per informare chiunque sia interessato quando un conto viene congelato o scongelato. Tecnicamente parlando, gli eventi non sono necessari per queste azioni, ma aiutano il codice off-chain a essere in grado di ascoltare questi eventi e sapere cosa sta succedendo. È considerata buona norma per un contratto intelligente emetterli quando accade qualcosa che potrebbe essere rilevante per qualcun altro.

  Gli eventi sono indicizzati, quindi sarà possibile cercare tutte le volte che un conto è stato congelato o scongelato.

  ```solidity
    // Quando i conti vengono congelati o scongelati
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- Funzioni per congelare e scongelare gli account. Queste due funzioni sono quasi identiche, quindi esamineremo solo la funzione di congelamento.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  Le funzioni contrassegnate come [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm) possono essere chiamate da altri contratti intelligenti o direttamente da una transazione.

  ```solidity
    {
        require(!frozenAccounts[addr], "Conto già congelato");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  Se il conto è già congelato, si esegue il revert. Altrimenti, lo si congela e si `emit` un evento.

- Modifica `_beforeTokenTransfer` per impedire che il denaro venga spostato da un conto congelato. Nota che il denaro può ancora essere trasferito nel conto congelato.

  ```solidity
       require(!frozenAccounts[from], "Il conto è congelato");
  ```

### Pulizia degli asset {#asset-cleanup}

Per rilasciare i token ERC-20 detenuti da questo contratto, dobbiamo chiamare una funzione sul contratto del token a cui appartengono, o [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) o [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve). Non ha senso sprecare gas in questo caso per le autorizzazioni, tanto vale trasferire direttamente.

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

Questa è la sintassi per creare un oggetto per un contratto quando riceviamo l'indirizzo. Possiamo farlo perché abbiamo la definizione per i token ERC20 come parte del codice sorgente (vedi riga 4), e quel file include [la definizione per IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol), l'interfaccia per un contratto ERC-20 di OpenZeppelin.

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

Questa è una funzione di pulizia, quindi presumibilmente non vogliamo lasciare alcun token. Invece di ottenere manualmente il saldo dall'utente, potremmo anche automatizzare il processo.

## Conclusione {#conclusion}

Questa non è una soluzione perfetta: non esiste una soluzione perfetta per il problema "l'utente ha commesso un errore". Tuttavia, l'uso di questo tipo di controlli può almeno prevenire alcuni errori. La capacità di congelare i conti, sebbene pericolosa, può essere utilizzata per limitare i danni di alcuni hack negando all'hacker i fondi rubati.

[Vedi qui per altri miei lavori](https://cryptodocguy.pro/).
