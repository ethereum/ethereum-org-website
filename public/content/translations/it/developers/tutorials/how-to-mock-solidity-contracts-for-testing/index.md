---
title: Come simulare (mock) i contratti intelligenti in Solidity per i test
description: "Perché dovresti prendere in giro i tuoi contratti durante i test"
author: Markus Waas
lang: it
tags: ["Solidity", "contratti intelligenti", "test", "mocking"]
skill: intermediate
breadcrumb: Simulare i contratti
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

Gli [oggetti mock](https://wikipedia.org/wiki/Mock_object) (o simulati) sono un design pattern comune nella programmazione orientata agli oggetti. Derivante dall'antica parola francese 'mocquer' con il significato di 'prendere in giro', si è evoluto in 'imitare qualcosa di reale', che è in realtà ciò che facciamo nella programmazione. Per favore, prendi in giro i tuoi contratti intelligenti solo se lo desideri, ma simulali (mock) ogni volta che puoi. Ti semplificherà la vita.

## Test unitari dei contratti con i mock {#unit-testing-contracts-with-mocks}

Simulare (mocking) un contratto significa essenzialmente creare una seconda versione di quel contratto che si comporta in modo molto simile all'originale, ma in un modo che può essere facilmente controllato dallo sviluppatore. Spesso ci si ritrova con contratti complessi in cui si desidera solo [eseguire test unitari su piccole parti del contratto](/developers/docs/smart-contracts/testing/). Il problema è: cosa succede se testare questa piccola parte richiede uno stato del contratto molto specifico e difficile da raggiungere?

Potresti scrivere ogni volta una complessa logica di configurazione dei test che porti il contratto nello stato richiesto, oppure scrivere un mock. Simulare un contratto è facile con l'ereditarietà. Crea semplicemente un secondo contratto mock che eredita da quello originale. Ora puoi sovrascrivere (override) le funzioni nel tuo mock. Vediamolo con un esempio.

## Esempio: ERC-20 privato {#example-private-erc20}

Usiamo un contratto ERC-20 di esempio che ha un periodo privato iniziale. Il proprietario può gestire gli utenti privati e solo a loro sarà permesso ricevere token all'inizio. Una volta trascorso un certo periodo di tempo, a tutti sarà permesso utilizzare i token. Se sei curioso, stiamo usando l'hook [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) dai nuovi contratti OpenZeppelin v3.

```solidity
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PrivateERC20 is ERC20, Ownable {
    mapping (address => bool) public isPrivateUser;
    uint256 private publicAfterTime;

    constructor(uint256 privateERC20timeInSec) ERC20("PrivateERC20", "PRIV") public {
        publicAfterTime = now + privateERC20timeInSec;
    }

    function addUser(address user) external onlyOwner {
        isPrivateUser[user] = true;
    }

    function isPublic() public view returns (bool) {
        return now >= publicAfterTime;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);

        require(_validRecipient(to), "PrivateERC20: invalid recipient");
    }

    function _validRecipient(address to) private view returns (bool) {
        if (isPublic()) {
            return true;
        }

        return isPrivateUser[to];
    }
}
```

E ora simuliamolo (mock).

```solidity
pragma solidity ^0.6.0;
import "../PrivateERC20.sol";

contract PrivateERC20Mock is PrivateERC20 {
    bool isPublicConfig;

    constructor() public PrivateERC20(0) {}

    function setIsPublic(bool isPublic) external {
        isPublicConfig = isPublic;
    }

    function isPublic() public view returns (bool) {
        return isPublicConfig;
    }
}
```

Otterrai uno dei seguenti messaggi di errore:

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

Poiché stiamo utilizzando la nuova versione 0.6 di Solidity, dobbiamo aggiungere la parola chiave `virtual` per le funzioni che possono essere sovrascritte e `override` per la funzione che sovrascrive. Quindi aggiungiamole a entrambe le funzioni `isPublic`.

Ora nei tuoi test unitari, puoi usare invece `PrivateERC20Mock`. Quando vuoi testare il comportamento durante il periodo di utilizzo privato, usa `setIsPublic(false)` e allo stesso modo `setIsPublic(true)` per testare il periodo di utilizzo pubblico. Naturalmente nel nostro esempio, potremmo semplicemente usare gli [aiutanti temporali (time helpers)](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) per modificare i tempi di conseguenza. Ma l'idea del mocking dovrebbe essere chiara ora e puoi immaginare scenari in cui non è così facile come far semplicemente avanzare il tempo.

## Simulare molti contratti {#mocking-many-contracts}

Può diventare caotico se devi creare un altro contratto per ogni singolo mock. Se questo ti infastidisce, puoi dare un'occhiata alla libreria [MockContract](https://github.com/gnosis/mock-contract). Ti consente di sovrascrivere e modificare i comportamenti dei contratti al volo. Tuttavia, funziona solo per simulare le chiamate a un altro contratto, quindi non funzionerebbe per il nostro esempio.

## Il mocking può essere ancora più potente {#mocking-can-be-even-more-powerful}

I poteri del mocking non finiscono qui.

- Aggiungere funzioni: non solo è utile sovrascrivere una funzione specifica, ma anche semplicemente aggiungere funzioni aggiuntive. Un buon esempio per i token è avere semplicemente una funzione `mint` (coniare) aggiuntiva per consentire a qualsiasi utente di ottenere nuovi token gratuitamente.
- Utilizzo nelle reti di test: quando distribuisci e testi i tuoi contratti sulle reti di test insieme alla tua dApp, prendi in considerazione l'utilizzo di una versione simulata (mock). Evita di sovrascrivere le funzioni a meno che tu non debba davvero farlo. Dopotutto, vuoi testare la logica reale. Ma aggiungere, ad esempio, una funzione di ripristino può essere utile per riportare semplicemente lo stato del contratto all'inizio, senza richiedere una nuova distribuzione. Ovviamente non vorresti avere una cosa del genere in un contratto sulla rete principale.