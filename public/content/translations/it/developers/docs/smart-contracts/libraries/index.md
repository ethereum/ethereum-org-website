---
title: Librerie dei contratti intelligenti
description:
lang: it
---

Non devi scrivere ogni contratto intelligente nel tuo progetto da zero. Esistono molte librerie open source di contratti intelligenti che forniscono blocchi di programmazione riutilizzabili per il tuo progetto, che possono salvarti dal dover reinventare la ruota.

## Prerequisiti {#prerequisites}

Prima di saltare alle librerie dei contratti intelligenti, è una buona idea avere una buona comprensione della struttura di un contratto intelligente. Consulta l'[anatomia dei contratti intelligenti](/developers/docs/smart-contracts/anatomy/), se ancora non l'hai fatto.

## Cosa contiene una libreria {#whats-in-a-library}

Solitamente, puoi trovare due tipi di blocchi di programmazione nelle librerie dei contratti intelligenti: comportamenti riutilizzabili che puoi aggiungere ai tuoi contratti e implementazioni di vari standard.

### Comportamenti {#behaviors}

Scrivendo i contratti intelligenti, è possibile che ti troverai a scrivere sempre gli stessi schemi, come assegnare un indirizzo _admin_ per svolgere le operazioni protette in un contratto, o aggiungere un pulsante d'emergenza _pause_ nel caso di un problema imprevisto.

Le librerie dei contratti intelligenti, solitamente, forniscono implementazioni riutilizzabili di questi comportamenti come [librerie](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) o tramite [ereditarietà](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) in Solidity.

Ad esempio, di seguito è riportata una versione semplificata del contratto [`Ownable`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) della [libreria dei contratti di OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts), che imposta un indirizzo come proprietario di un contratto e fornisce un modificatore per consentire l'accesso a un metodo solo a quel proprietario.

```solidity
contract Ownable {
    address public owner;

    constructor() internal {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }
}
```

Per usare un blocco di programmazione come questo in un contratto, devi prima importarlo e poi eseguirne estensioni nei tuoi contratti. In questo modo potrai usare il modificatore fornito dal contratto di base di `Ownable` per proteggere le funzioni che utilizzi.

```solidity
import ".../Ownable.sol"; // Percorso della libreria importata

contract MyContract is Ownable {
    // The following function can only be called by the owner
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

Un altro esempio noto è [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) o [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html). Sono librerie (e non contratti di base) che forniscono funzioni aritmetiche con controlli dell'overflow che non vengono offerti dal linguaggio. È buona pratica usare una di queste librerie al posto delle operazioni aritmetiche native per proteggere un contratto dagli overflow, che possono avere conseguenze disastrose.

### Standard {#standards}

Per facilitare la [componibilità e l'interoperabilità](/developers/docs/smart-contracts/composability/), la community di Ethereum ha definito diversi standard nella forma di **ERC**. Puoi leggere di più nella sezione dedicata agli [standard](/developers/docs/standards/).

Se desideri includere un ERC all'interno di un contratto, è consigliabile cercare implementazioni standard anziché crearne di proprie. Molte librerie di contratti intelligenti includono implementazioni per gli ERC più popolari. Ad esempio, l'onnipresente [standard per token fungibile ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) si può trovare in [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token/) e [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20). Inoltre, alcuni ERC forniscono implementazioni canoniche come parte dello stesso ERC.

Vale la pena ricordare che alcuni ERC non sono singoli, ma sono aggiunte di altri ERC. Per esempio, [ERC2612](https://eips.ethereum.org/EIPS/eip-2612) aggiunge un'estensione a ERC20 per migliorarne l'utilizzabilità.

## Come aggiungere una libreria {#how-to}

Consulta sempre la documentazione della libreria che decidi di utilizzare per avere istruzioni specifiche su come includerla nel tuo progetto. Molte librerie dei contratti Solidity sono create con `npm`, quindi puoi usare semplicemente `npm install` per installarle. Gran parte degli strumenti per [compilare](/developers/docs/smart-contracts/compiling/) i contratti, cercherà le librerie dei contratti intelligenti nei tuoi `node_modules`, quindi puoi fare quanto segue:

```solidity
// Questo caricherà la libreria @openzeppelin/contracts da node_modules
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

Indipendentemente dal metodo utilizzato, includendo una libreria, tieni sempre d'occhio la versione della [lingua](/developers/docs/smart-contracts/languages/). Ad esempio non puoi usare una libreria per Solidity 0.6 se stai scrivendo i contratti in Solidity 0.5.

## Quando usare una libreria {#when-to-use}

Usare la libreria di un contratto intelligente per il tuo progetto ha diversi benefici. Prima di tutto, fa risparmiare tempo perché fornisce blocchi di programmazione pronti all'uso che puoi includere nel sistema e che non devi programmare autonomamente.

Anche la sicurezza è un importante vantaggio. Le librerie dei contratti intelligenti open source, inoltre, sono spesso molto controllate. Dato che molti progetti dipendono da esse, c'è un forte incentivo da parte della community a revisionarle costantemente. È molto più comune trovare errori nel codice di un'applicazione che nelle librerie riutilizzabili dei contratti. Inoltre alcune librerie sono sottoposte a [controlli esterni](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits) per maggior sicurezza.

Tuttavia, l'uso delle librerie dei contratti intelligenti comporta il rischio di includere codice con cui non sei familiare nel tuo progetto. La tentazione di importare un contratto e includerlo direttamente nel progetto è forte, ma se non si sa cosa fa il contratto, si potrebbe inavvertitamente inserire un problema nel sistema a causa di un comportamento imprevisto. Leggi sempre la documentazione del codice che importi e quindi controlla il codice direttamente prima di renderlo parte del tuo progetto.

Infine, per decidere se includere una libreria, considera l'uso generale che ne vorresti fare. Una libreria ampiamente adottata ha il vantaggio di avere alla base una community più grande e più occhi che la controllano alla ricerca di problemi. La sicurezza dovrebbe essere la tua preoccupazione principale, quando sviluppi i contratti intelligenti!

## Strumenti correlati {#related-tools}

**OpenZeppelin Contracts**: **_La libreria più popolare per lo sviluppo sicuro di contratti intelligenti._**

- [Documentazione](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Forum della community](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Blocchi di programmazione sicuri, semplici e flessibili per contratti intelligenti_**

- [Documentazione](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_Progetto in Solidity con contratti, librerie ed esempi per creare applicazioni complete distribuite per il mondo reale._**

- [GitHub](https://github.com/HQ20/contracts)

**thirdweb Solidity SDK -** **_Fornisce gli strumenti necessari per costruire contratti intelligenti personalizzati in modo efficiente_**

- [Documentazione](https://portal.thirdweb.com/solidity/)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## Tutorial correlati {#related-tutorials}

- [Security considerations for Ethereum developers](/developers/docs/smart-contracts/security/): _Un tutorial sulle considerazioni sulla sicurezza durante lo sviluppo dei contratti intelligenti, incluso l'uso della libreria._
- [Understand the ERC-20 token smart contract](/developers/tutorials/understand-the-erc-20-token-smart-contract/): _Tutorial sullo standard ERC20, fornito da diverse librerie._

## Letture consigliate {#further-reading}

_Conosci una risorsa della comunità che ti è stata utile? Modifica questa pagina e aggiungila!_
