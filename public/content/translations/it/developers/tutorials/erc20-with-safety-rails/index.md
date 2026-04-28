---
title: ERC-20 con misure di sicurezza
description: Come aiutare le persone a evitare errori sciocchi
author: Ori Pomerantz
lang: it
tags: ["erc-20"]
skill: beginner
breadcrumb: Sicurezza ERC-20
published: 2022-08-15
---

## Introduzione {#introduction}

Una delle cose fantastiche di Ethereum è che non esiste un'autorità centrale in grado di modificare o annullare le tue transazioni. Uno dei grandi problemi di Ethereum è che non esiste un'autorità centrale con il potere di annullare gli errori degli utenti o le transazioni illecite. In questo articolo scoprirai alcuni degli errori comuni che gli utenti commettono con i token [ERC-20](/developers/docs/standards/tokens/erc-20/), oltre a come creare contratti intelligenti ERC-20 che aiutino gli utenti a evitare tali errori, o che conferiscano a un'autorità centrale un certo potere (ad esempio per congelare gli account).

Nota che, sebbene utilizzeremo il [contratto del token ERC-20 di OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20), questo articolo non lo spiega in grande dettaglio. Puoi trovare queste informazioni [qui](/developers/tutorials/erc20-annotated-code).

Se vuoi vedere il codice sorgente completo:

1. Apri l'[IDE Remix](https://remix.ethereum.org/).
2. Clicca sull'icona per clonare da github (![clone github icon](icon-clone.png)).
3. Clona il repository github `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. Apri **contracts > erc20-safety-rails.sol**.

## Creare un contratto ERC-20 {#creating-an-erc-20-contract}

Prima di poter aggiungere la funzionalità delle misure di sicurezza, abbiamo bisogno di un contratto ERC-20. In questo articolo utilizzeremo [il Wizard dei Contratti di OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/wizard). Aprilo in un altro browser e segui queste istruzioni:

1. Seleziona **ERC20**.
2. Inserisci queste impostazioni:

   | Parametro | Valore |
   | -------------- | ---------------- |
   | Nome | SafetyRailsToken |
   | Simbolo | SAFE |
   | Premint | 1000 |
   | Funzionalità | Nessuna |
   | Controllo degli accessi | Ownable |
   | Aggiornabilità | Nessuna |

3. Scorri verso l'alto e clicca su **Open in Remix** (per Remix) o **Download** per utilizzare un ambiente diverso. Darò per scontato che tu stia usando Remix; se usi qualcos'altro, apporta semplicemente le modifiche appropriate.
4. Ora abbiamo un contratto ERC-20 completamente funzionante. Puoi espandere `.deps` > `npm` per vedere il codice importato.
5. Compila, distribuisci e gioca con il contratto per vedere che funziona come un contratto ERC-20. Se hai bisogno di imparare a usare Remix, [usa questo tutorial](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Errori comuni {#common-mistakes}

### Gli errori {#the-mistakes}

A volte gli utenti inviano token all'indirizzo sbagliato. Sebbene non possiamo leggere le loro menti per sapere cosa intendessero fare, ci sono due tipi di errori che si verificano spesso e sono facili da rilevare:

1. Inviare i token all'indirizzo del contratto stesso. Ad esempio, il [token OP di Optimism](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) è riuscito ad accumulare [oltre 120.000](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) token OP in meno di due mesi. Ciò rappresenta una quantità significativa di ricchezza che presumibilmente le persone hanno semplicemente perso.

2. Inviare i token a un indirizzo vuoto, uno che non corrisponde a un [account controllato esternamente](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) o a un [contratto intelligente](/developers/docs/smart-contracts). Sebbene non abbia statistiche su quanto spesso ciò accada, [un incidente potrebbe essere costato 20.000.000 di token](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Prevenire i trasferimenti {#preventing-transfers}

Il contratto ERC-20 di OpenZeppelin include [un hook, `_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368), che viene chiamato prima che un token venga trasferito. Per impostazione predefinita, questo hook non fa nulla, ma possiamo agganciarvi le nostre funzionalità, come controlli che annullano l'operazione se c'è un problema.

Per utilizzare l'hook, aggiungi questa funzione dopo il costruttore:

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

Alcune parti di questa funzione potrebbero essere nuove se non hai molta familiarità con Solidity:

```solidity
        internal virtual
```

La parola chiave `virtual` significa che, proprio come abbiamo ereditato la funzionalità da `ERC20` e sovrascritto questa funzione, altri contratti possono ereditare da noi e sovrascrivere questa funzione.

```solidity
        override(ERC20)
```

Dobbiamo specificare esplicitamente che stiamo [sovrascrivendo](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding) la definizione del token ERC20 di `_beforeTokenTransfer`. In generale, le definizioni esplicite sono molto migliori, dal punto di vista della sicurezza, rispetto a quelle implicite: non puoi dimenticare di aver fatto qualcosa se è proprio di fronte a te. Questo è anche il motivo per cui dobbiamo specificare quale `_beforeTokenTransfer` della superclasse stiamo sovrascrivendo.

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

Questa riga chiama la funzione `_beforeTokenTransfer` del contratto o dei contratti da cui abbiamo ereditato che ce l'hanno. In questo caso, è solo `ERC20`, `Ownable` non ha questo hook. Anche se attualmente `ERC20._beforeTokenTransfer` non fa nulla, lo chiamiamo nel caso in cui vengano aggiunte funzionalità in futuro (e decidessimo quindi di ridistribuire il contratto, perché i contratti non cambiano dopo la distribuzione).

### Codificare i requisiti {#coding-the-requirements}

Vogliamo aggiungere questi requisiti alla funzione:

- L'indirizzo `to` non può essere uguale a `address(this)`, l'indirizzo del contratto ERC-20 stesso.
- L'indirizzo `to` non può essere vuoto, deve essere uno dei seguenti:
  - Un account controllato esternamente (EOA). Non possiamo verificare direttamente se un indirizzo è un EOA, ma possiamo controllare il saldo in ETH di un indirizzo. Gli EOA hanno quasi sempre un saldo, anche se non vengono più utilizzati: è difficile svuotarli fino all'ultimo wei.
  - Un contratto intelligente. Verificare se un indirizzo è un contratto intelligente è un po' più difficile. Esiste un opcode che controlla la lunghezza del codice esterno, chiamato [`EXTCODESIZE`](https://www.evm.codes/#3b), ma non è disponibile direttamente in Solidity. Dobbiamo usare [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html), che è l'assembly dell'EVM, per farlo. Ci sono altri valori che potremmo usare da Solidity ([`<address>.code` e `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types)), ma costano di più.

Esaminiamo il nuovo codice riga per riga:

```solidity
        require(to != address(this), "Can't send tokens to the contract address");
```

Questo è il primo requisito, verificare che `to` e `this(address)` non siano la stessa cosa.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

Ecco come verifichiamo se un indirizzo è un contratto. Non possiamo ricevere l'output direttamente da Yul, quindi definiamo invece una variabile per contenere il risultato (`isToContract` in questo caso). Il modo in cui funziona Yul è che ogni opcode è considerato una funzione. Quindi prima chiamiamo [`EXTCODESIZE`](https://www.evm.codes/#3b) per ottenere la dimensione del contratto, e poi usiamo [`GT`](https://www.evm.codes/#11) per verificare che non sia zero (abbiamo a che fare con interi senza segno, quindi ovviamente non può essere negativo). Scriviamo quindi il risultato in `isToContract`.

```solidity
        require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
```

E infine, abbiamo il controllo effettivo per gli indirizzi vuoti.

## Accesso amministrativo {#admin-access}

A volte è utile avere un amministratore che possa annullare gli errori. Per ridurre il potenziale di abuso, questo amministratore può essere un [multifirma](https://blog.logrocket.com/security-choices-multi-signature-wallets/) in modo che più persone debbano concordare su un'azione. In questo articolo avremo due funzionalità amministrative:

1. Congelare e scongelare gli account. Questo può essere utile, ad esempio, quando un account potrebbe essere compromesso.
2. Pulizia degli asset.

   A volte i truffatori inviano token fraudolenti al contratto del token reale per ottenere legittimità. Ad esempio, [vedi qui](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders). Il contratto ERC-20 legittimo è [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042). La truffa che finge di esserlo è [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe).

   È anche possibile che le persone inviino per errore token ERC-20 legittimi al nostro contratto, il che è un altro motivo per voler avere un modo per tirarli fuori.

OpenZeppelin fornisce due meccanismi per abilitare l'accesso amministrativo:

- I contratti [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) hanno un singolo proprietario. Le funzioni che hanno il [modificatore](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `onlyOwner` possono essere chiamate solo da quel proprietario. I proprietari possono trasferire la proprietà a qualcun altro o rinunciarvi completamente. I diritti di tutti gli altri account sono in genere identici.
- I contratti [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) hanno il [controllo degli accessi basato sui ruoli (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control).

Per motivi di semplicità, in questo articolo utilizziamo `Ownable`.

### Congelare e scongelare i contratti {#freezing-and-thawing-contracts}

Congelare e scongelare i contratti richiede diverse modifiche:

- Una [mappatura](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) dagli indirizzi ai [booleani](https://en.wikipedia.org/wiki/Boolean_data_type) per tenere traccia di quali indirizzi sono congelati. Tutti i valori sono inizialmente zero, che per i valori booleani viene interpretato come falso. Questo è ciò che vogliamo perché per impostazione predefinita gli account non sono congelati.

  ```solidity
      mapping(address => bool) public frozenAccounts;
```

- [Eventi](https://www.tutorialspoint.com/solidity/solidity_events.htm) per informare chiunque sia interessato quando un account viene congelato o scongelato. Tecnicamente parlando, gli eventi non sono richiesti per queste azioni, ma aiutano il codice fuori catena a poter ascoltare questi eventi e sapere cosa sta succedendo. È considerata buona educazione per un contratto intelligente emetterli quando accade qualcosa che potrebbe essere rilevante per qualcun altro.

  Gli eventi sono indicizzati, quindi sarà possibile cercare tutte le volte in cui un account è stato congelato o scongelato.

  ```solidity
    // Quando gli account vengono congelati o scongelati
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
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    } // freezeAccount
```

  Se l'account è già congelato, esegui un revert. Altrimenti, congelalo ed emetti (`emit`) un evento.

- Modifica `_beforeTokenTransfer` per impedire che il denaro venga spostato da un account congelato. Nota che il denaro può ancora essere trasferito nell'account congelato.

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
```

### Pulizia degli asset {#asset-cleanup}

Per rilasciare i token ERC-20 detenuti da questo contratto dobbiamo chiamare una funzione sul contratto del token a cui appartengono, ovvero [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) o [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve). Non ha senso sprecare gas in questo caso per le allowance, tanto vale trasferire direttamente.

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

Questa è una funzione di pulizia, quindi presumibilmente non vogliamo lasciare alcun token. Invece di ottenere il saldo dall'utente manualmente, tanto vale automatizzare il processo.

## Conclusione {#conclusion}

Questa non è una soluzione perfetta: non esiste una soluzione perfetta per il problema "l'utente ha commesso un errore". Tuttavia, l'utilizzo di questo tipo di controlli può almeno prevenire alcuni errori. La capacità di congelare gli account, sebbene pericolosa, può essere utilizzata per limitare i danni di determinati attacchi informatici negando all'hacker i fondi rubati.

[Vedi qui per altri miei lavori](https://cryptodocguy.pro/).