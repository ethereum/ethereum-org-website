---
title: Librerie di contratti intelligenti
description: Scopri le librerie di contratti intelligenti riutilizzabili e i blocchi di costruzione per accelerare i tuoi progetti di sviluppo su Ethereum.
lang: it
---

Non è necessario scrivere da zero ogni contratto intelligente del tuo progetto. Sono disponibili molte librerie di contratti intelligenti open source che forniscono blocchi di costruzione riutilizzabili per il tuo progetto, evitandoti di dover reinventare la ruota.

## Prerequisiti {#prerequisites}

Prima di tuffarti nelle librerie di contratti intelligenti, è una buona idea avere una buona comprensione della struttura di un contratto intelligente. Dai un'occhiata all'[anatomia dei contratti intelligenti](/developers/docs/smart-contracts/anatomy/) se non l'hai ancora fatto.

## Cosa c'è in una libreria {#whats-in-a-library}

Di solito puoi trovare due tipi di blocchi di costruzione nelle librerie di contratti intelligenti: comportamenti riutilizzabili che puoi aggiungere ai tuoi contratti e implementazioni di vari standard.

### Comportamenti {#behaviors}

Quando scrivi contratti intelligenti, c'è una buona probabilità che ti ritroverai a scrivere schemi simili più e più volte, come assegnare un indirizzo _admin_ per eseguire operazioni protette in un contratto, o aggiungere un pulsante di _pausa_ di emergenza in caso di un problema imprevisto.

Le librerie di contratti intelligenti di solito forniscono implementazioni riutilizzabili di questi comportamenti come [librerie](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) o tramite [ereditarietà](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) in Solidity.

Ad esempio, di seguito è riportata una versione semplificata del [contratto `Ownable`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) dalla [libreria OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts), che designa un indirizzo come proprietario di un contratto e fornisce un modificatore per limitare l'accesso a un metodo solo a quel proprietario.

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

Per utilizzare un blocco di costruzione come questo nel tuo contratto, dovresti prima importarlo e poi estenderlo nei tuoi contratti. Questo ti consentirà di utilizzare il modificatore fornito dal contratto base `Ownable` per proteggere le tue funzioni.

```solidity
import ".../Ownable.sol"; // Percorso della libreria importata

contract MyContract is Ownable {
    // La seguente funzione può essere chiamata solo dal proprietario
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

Un altro esempio popolare è [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) o [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html). Queste sono librerie (al contrario dei contratti base) che forniscono funzioni aritmetiche con controlli di overflow, che non sono forniti dal linguaggio. È una buona pratica utilizzare una di queste librerie invece delle operazioni aritmetiche native per proteggere il tuo contratto dagli overflow, che possono avere conseguenze disastrose!

### Standard {#standards}

Per facilitare la [componibilità e l'interoperabilità](/developers/docs/smart-contracts/composability/), la comunità di Ethereum ha definito diversi standard sotto forma di **ERC**. Puoi leggere di più al riguardo nella sezione degli [standard](/developers/docs/standards/).

Quando includi un ERC come parte dei tuoi contratti, è una buona idea cercare implementazioni standard piuttosto che cercare di crearne di tue. Molte librerie di contratti intelligenti includono implementazioni per gli ERC più popolari. Ad esempio, l'onnipresente [standard per token fungibili ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) può essere trovato in [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token/) e [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20). Inoltre, alcuni ERC forniscono anche implementazioni canoniche come parte dell'ERC stesso.

Vale la pena menzionare che alcuni ERC non sono a sé stanti, ma sono aggiunte ad altri ERC. Ad esempio, l'[ERC2612](https://eips.ethereum.org/EIPS/eip-2612) aggiunge un'estensione all'ERC20 per migliorarne l'usabilità.

## Come aggiungere una libreria {#how-to}

Fai sempre riferimento alla documentazione della libreria che stai includendo per istruzioni specifiche su come includerla nel tuo progetto. Diverse librerie di contratti Solidity sono pacchettizzate usando `npm`, quindi puoi semplicemente eseguire `npm install`. La maggior parte degli strumenti per la [compilazione](/developers/docs/smart-contracts/compiling/) dei contratti cercherà le librerie di contratti intelligenti nel tuo `node_modules`, quindi puoi fare quanto segue:

```solidity
// Questo caricherà la libreria @openzeppelin/contracts dai tuoi node_modules
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

Indipendentemente dal metodo che usi, quando includi una libreria, tieni sempre d'occhio la versione del [linguaggio](/developers/docs/smart-contracts/languages/). Ad esempio, non puoi usare una libreria per Solidity 0.6 se stai scrivendo i tuoi contratti in Solidity 0.5.

## Quando usarle {#when-to-use}

L'uso di una libreria di contratti intelligenti per il tuo progetto ha diversi vantaggi. Innanzitutto, ti fa risparmiare tempo fornendoti blocchi di costruzione pronti all'uso che puoi includere nel tuo sistema, piuttosto che doverli programmare tu stesso.

Anche la sicurezza è un grande vantaggio. Le librerie di contratti intelligenti open source sono spesso esaminate attentamente. Dato che molti progetti dipendono da esse, c'è un forte incentivo da parte della comunità a mantenerle sotto costante revisione. È molto più comune trovare errori nel codice dell'applicazione che nelle librerie di contratti riutilizzabili. Alcune librerie sono anche sottoposte ad [audit esterni](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits) per una maggiore sicurezza.

Tuttavia, l'uso di librerie di contratti intelligenti comporta il rischio di includere nel tuo progetto codice con cui non hai familiarità. È allettante importare un contratto e includerlo direttamente nel tuo progetto, ma senza una buona comprensione di ciò che fa quel contratto, potresti inavvertitamente introdurre un problema nel tuo sistema a causa di un comportamento imprevisto. Assicurati sempre di leggere la documentazione del codice che stai importando e poi rivedi il codice stesso prima di renderlo parte del tuo progetto!

Infine, quando decidi se includere una libreria, considera il suo utilizzo complessivo. Una libreria ampiamente adottata ha il vantaggio di avere una comunità più ampia e più occhi che la esaminano alla ricerca di problemi. La sicurezza dovrebbe essere il tuo obiettivo principale quando costruisci con i contratti intelligenti!

## Strumenti correlati {#related-tools}

**OpenZeppelin Contracts -** **_La libreria più popolare per lo sviluppo sicuro di contratti intelligenti._**

- [Documentazione](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Forum della community](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Blocchi di costruzione sicuri, semplici e flessibili per contratti intelligenti._**

- [Documentazione](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_Un progetto Solidity con contratti, librerie ed esempi per aiutarti a costruire applicazioni distribuite complete per il mondo reale._**

- [GitHub](https://github.com/HQ20/contracts)

**thirdweb Solidity SDK -** **_Fornisce gli strumenti necessari per costruire contratti intelligenti personalizzati in modo efficiente_**

- [Documentazione](https://portal.thirdweb.com/contracts/build/overview)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## Tutorial correlati {#related-tutorials}

- [Considerazioni sulla sicurezza per gli sviluppatori di Ethereum](/developers/docs/smart-contracts/security/) _– Un tutorial sulle considerazioni di sicurezza durante la creazione di contratti intelligenti, incluso l'uso delle librerie._
- [Comprendere il contratto intelligente del token ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _- Tutorial sullo standard ERC20, fornito da più librerie._

## Letture consigliate {#further-reading}

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_