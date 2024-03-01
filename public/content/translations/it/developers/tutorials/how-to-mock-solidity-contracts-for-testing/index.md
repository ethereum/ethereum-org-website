---
title: Come simulare i contratti intelligenti in Solidity per testarli
description: Perché è importante prendersi gioco dei propri contratti in fase di test
author: Markus Waas
lang: it
tags:
  - "Solidity"
  - "contratto intelligente"
  - "test"
  - "simulazione"
skill: intermediate
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[Gli oggetti Mock](https://wikipedia.org/wiki/Mock_object) sono un modello di progettazione comune nella programmazione orientata agli oggetti. Il termine inglese per "simulare" è "to mock", dal francese antico "mocquer" col significato di "prendersi gioco di". Questo significato si è poi evoluto in "imitare qualcosa di reale", che è ciò che in effetti facciamo nella programmazione. Prenditi gioco dei tuoi contratti intelligenti quanto vuoi, ma simulali ogni volta che puoi. Ti semplificherà la vita.

## Condurre unit test dei contratti con le simulazioni {#unit-testing-contracts-with-mocks}

Simulare un contratto significa essenzialmente creare una seconda versione di quel contratto che si comporta in modo simile a quello originale, ma in modo che possa essere facilmente controllato dallo sviluppatore. Ci si ritrova spesso con contratti complessi in cui si desidera solo [eseguire unit test di piccole parti del contratto](/developers/docs/smart-contracts/testing/). Ma cosa succede se il test di questa piccola parte richiede uno condizione molto specifica del contratto, difficile da ottenere?

Potresti scrivere una complessa logica di configurazione del test ogni volta che porta il contratto nello stato richiesto o scrivi una simulazione. Simulare un contratto tramite ereditarietà è semplice. Basta creare un secondo contratto simulato che erediti da quello originale. Ora puoi sovrascrivere le funzioni nella tua simulazione. Vediamolo con un esempio.

## Esempio: ERC20 Privato {#example-private-erc20}

Usiamo un contratto ERC-20 di esempio dotato di un tempo privato iniziale. Il proprietario può gestire utenti privati, che saranno gli unici autorizzati a ricevere token all'inizio. Una volta trascorso un certo intervallo di tempo, a tutti sarà consentito utilizzare i token. Se sei curioso, stiamo usando l'hook [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/3.x/extending-contracts#using-hooks) dalla nuova libreria di contratti OpenZeppelin v3.

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

        require(_validRecipient(to), "PrivateERC20: destinatario non valido");
    }

    function _validRecipient(address to) private view returns (bool) {
        if (isPublic()) {
            return true;
        }

        return isPrivateUser[to];
    }
}
```

E ora, simuliamolo.

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

Otterrai uno dei seguenti messaggi d'errore:

- `PrivateERC20Mock.sol: TypeError: La funzione di sovrascrizione manca dello specificatore "ovverride".`
- `PrivateERC20.sol: TypeError: Tentativo di sovrascrizione della funzione non virtuale. Hai dimenticato di aggiungere "virtual"?`

Poiché stiamo usando la nuova versione di Solidity 0.6, dobbiamo aggiungere la parola chiave `virtual` per le funzioni sovrascrivibili e `override` per la funzione di sovrascrizione. Quindi, aggiungiamoli a entrambe le funzioni `isPublic`.

Ora, nei tuoi unit test, puoi invece usare `PrivateERC20Mock`. Quando desideri testare il comportamento durante il tempo di utilizzo privato, usa `setIsPublic(false` e, allo stesso modo, `setIsPublic(true)` per testare il tempo di utilizzo pubblico. Ovviamente, nel nostro esempio, abbiamo potuto usare soltanto i [time helper](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) per modificare anche i tempi di conseguenza. Ma l'idea della simulazione dovrebbe ora esserti chiara e puoi immaginarti scenari in cui non sia facile come far procedere semplicemente il tempo.

## Simulare molti contratti {#mocking-many-contracts}

Può diventare caotico creare un altro contratto per ogni singola simulazione. Se ciò ti preoccupa, puoi dare un'occhiata alla libreria [MockContract](https://github.com/gnosis/mock-contract). Ti consente di sovrascrivere e modificare i comportamenti dei contratti al volo. Tuttavia, funziona solo per le chiamate di simulazione a un altro contratto, quindi non funzionerebbe per il nostro esempio.

## La simulazione può essere ancora più potente {#mocking-can-be-even-more-powerful}

I poteri della simulazione non finiscono qui.

- Aggiungere funzioni: è utile non solo sovrascrivere una funzione specifica, ma anche aggiungere funzioni aggiuntive. Un buon esempio per i token è proprio avere una funzione `mint` aggiuntiva per consentire a qualsiasi utente di ottenere nuovi token gratuitamente.
- Uso nelle testnet: quando distribuisci e testi i tuoi contratti sulle reti di prova insieme alla tua dApp, prendi in considerazione l'uso di una versione simulata. Evita di sovrascrivere le funzioni, a meno che non sia davvero necessario. Dopotutto, vuoi testare la logica reale. Ma può essere utile aggiungere una funzione di ripristino che ripristini semplicemente lo stato del contratto all'inizio, senza necessità di alcuna nuova distribuzione. Ovviamente, non vorresti farlo in un contratto sulla Rete mainnet.
