---
title: Token non fungibili (NFT)
description: Una panoramica dei NFT su Ethereum
lang: it
template: use-cases
emoji: ":frame_with_picture:"
sidebarDepth: 3
image: /infrastructure_transparent.png
alt: Un logo Eth visualizzato tramite ologramma.
summaryPoint1: Un modo pe rappresentare qualsiasi cosa sia univoca, come una risorsa basata su Ethereum.
summaryPoint2: I NFT stanno dando ai creatori di contenuti più potere che mai.
summaryPoint3: Basati sui contratti intelligenti, sulla blockchain di Ethereum.
---

## Cosa sono i NFT? {#what-are-nfts}

Gli NFT sono token che sono singolarmente unici. Ogni NFT ha proprietà differenti (non fungibile) ed provatamente scarso. Questo è diverso dai token come gli ERC-20, dove ogni token di un insieme è identico e ha le stesse proprietà (fungibile). Tu non ti preoccupi di quale banconota da un dollaro hai nel tuo portafoglio, perché sono tutte identiche e hanno lo stesso valore. Tuttavia, tu _ti_ preoccupi di quale specifico NFT possiedi, perché ha proprietà individuali che lo distinguono dagli altri (non fungibile).

L'unicità di ciascun NFT consente la tokenizzazione di oggetti come oggetti d'arte, oggetti da collezione, o persino beni immobili, dove un specifico NFT unico rappresenta uno specifico oggetto unico del mondo reale o digitale. La proprietà di una risorsa è protetta dalla blockchain Ethereum: nessuno può modificare il registro di proprietà o far esistere un nuovo NFT copiandolo/incollandolo.

<YouTube id="Xdkkux6OxfM" />

## L'Internet delle risorse {#internet-of-assets}

Gli NFT ed Ethereum risolvono alcuni dei problemi esistenti oggi in internet. Man mano che tutto diventa più digitale, aumenta l'esigenza di replicare le proprietà degli oggetti fisici, come la scarsità, l'unicità e la prova di proprietà. in un modo che non sia controllato da un'organizzazione centrale. Per esempio, con gli NFT puoi possedere un mp3 di musica che non è specifico di un'app di una specifica azienda di musica, o puoi avere un handle di un social media che puoi vendere o scambiare, ma che non ti può essere tolto arbitrariamente da una piattaforma fornitrice.

Ecco come appare un internet di NFT, rispetto all'Internet utilizzato oggi da molti di noi...

### Un confronto {#nft-comparison}

| Un Internet di NFT                                                                                                                                                | L'internet di oggi                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sei proprietario delle tue risorse! Solo tu puoi venderli o scambiarli.                                                                                           | Tu affitti una risorsa da un'organizzazione.                                                                                                                                        |
| Gli NFT sono digitalmente univoci, non esistono due NFT uguali.                                                                                                   | Una copia di un'entità spesso non può essere distinta dall'originale.                                                                                                               |
| La proprietà di un NFT è memorizzata sulla blockchain e può essere verificata da chiunque.                                                                        | I registri di proprietà degli oggetti digitali sono archiviati su server controllati da istituzioni - devi fidarti della loro parola.                                               |
| Gli NFT sono contratti intelligenti su Ethereum. Questo significa che possono essere usati facilmente in altri contratti intelligenti e applicazioni su Ethereum! | Le aziende con articoli digitali di solito richiedono una propria infrastruttura a mo' di "giardino recintato".                                                                     |
| I creatori di contenuti possono vendere il loro lavoro ovunque e possono accedere ad un mercato globale.                                                          | I creatori si affidano all'infrastruttura e alla distribuzione delle piattaforme che utilizzano. Queste ultime sono spesso soggette a condizioni d'uso e a restrizioni geografiche. |
| I creatori di NFT possono mantenere i diritti di proprietà sul proprio lavoro e programmare le royalty direttamente nel contratto NFT.                            | Le piattaforme, come i servizi di streaming musicale, mantengono la maggior parte dei profitti derivanti dalle vendite.                                                             |

## Come funzionano gli NFT? {#how-nfts-work}

Come qualsiasi altro token emesso su Ethereum, gli NFT sono emessi da un contratto intelligente. Il contratto intelligente è conforme a uno dei diversi standard NFT (di solito ERC-721 o ERC-1155) che definiscono le funzioni del contratto. Il contratto può creare ("coniare") NFT e assegnarli a un proprietario specifico. La proprietà è definita nel contratto mediante la mappatura di NFT specifici a indirizzi specifici. L'NFT ha un ID e tipicamente dei metadati associati che rendono unico il token specifico.

Quando qualcuno crea o conia un NFT, in realtà sta eseguendo una funzione nel contratto intelligente che assegna uno specifico NFT al suo indirizzo. Queste informazioni vengono conservate nella memoria del contratto, che fa parte della blockchain. Il creatore del contratto può scrivere una logica aggiuntiva nel contratto, ad esempio limitando l'offerta totale o definendo delle royalty da pagare al creatore ogni volta che un token viene trasferito.

## Per cosa sono utilizzati gli NFT? {#nft-use-cases}

Gli NFT vengono utilizzati per molti scopi, tra cui:

- dimostrare di aver partecipato a un evento
- certificare di aver completato un corso
- oggetti posseduti nei videogiochi
- arte digitale
- trasformare beni del mondo reale in token digitali
- dimostrare la propria identità online
- limitare l'accesso ai contenuti
- biglietti digitali
- nomi di dominio internet decentralizzati
- garanzia nella DeFi

Forse sei un artista che vuole condividere il proprio lavoro utilizzando gli NFT, senza perdere il controllo e sacrificare i tuoi profitti agli intermediari. Puoi creare un nuovo contratto e specificare il numero di NFT, le loro proprietà e un collegamento ad alcune opere d'arte specifiche. In qualità di artista, puoi programmare nel contratto intelligente le royalty che ti devono essere pagate (ad esempio, trasferire il 5% del prezzo di vendita al proprietario del contratto ogni volta che un NFT viene trasferito). Inoltre, puoi sempre dimostrare di aver creato gli NFT perché possiedi il portafoglio che ha distribuito il contratto. I tuoi acquirenti possono facilmente dimostrare di possedere un NFT autentico della tua collezione perché l'indirizzo del loro portafoglio è associato a un token nel tuo contratto intelligente. Possono utilizzarlo in tutto l'ecosistema Ethereum, sicuri della sua autenticità.

Oppure, prendiamo ad esempio un biglietto per un evento sportivo. Proprio come l'organizzatore di un evento può scegliere quanti biglietti vendere, il creatore di un NFT può decidere quante repliche esistono. A volte queste sono repliche esatte, come 5000 biglietti di ingresso generici. A volte ne vengono coniati diversi molto simili, ma ognuno leggermente diverso, come nel caso dei biglietti con i posti assegnati. Questi possono essere acquistati e venduti peer-to-peer senza pagare i gestori dei biglietti e l'acquirente ha sempre la certezza dell'autenticità del biglietto controllando l'indirizzo del contratto.

Su ethereum.org, gli NFT vengono utilizzati per dimostrare che le persone hanno contribuito al nostro archivio GitHub o hanno partecipato alle riunioni online, e abbiamo persino il nostro nome di dominio NFT. Se contribuisci a ethereum.org, puoi rivendicare un NFT POAP. Alcuni incontri nel mondo delle criptovalute hanno usato i POAP come biglietti. [Di più su come contribuire](/contributing/#poap).

![POAP di ethereum.org](./poap.png)

Questo sito web ha anche un nome di dominio alternativo basato sulla tecnologia NFT, **ethereum.eth**. Il nostro indirizzo `.org` è gestito centralmente da un fornitore di sistema di nomi di dominio (DNS), mentre ethereum`.eth` è registrato su Ethereum tramite il Servizio del Nome di Ethereum (ENS). Ed è posseduto e gestito da noi. [Consulta il nostro registro ENS](https://app.ens.domains/name/ethereum.eth)

[Di più sull'ENS](https://app.ens.domains)

<Divider />

### Sicurezza degli NFT {#nft-security}

La sicurezza di Ethereum deriva dal proof-of-stake. Il sistema è progettato per disincentivare economicamente le azioni malevole, rendendo Ethereum a prova di manomissione. Questo è ciò che rende possibili gli NFT. Una volta che il blocco contenente la transazione del tuo NFT diventa finalizzato, modificarlo costerebbe milioni di ETH a un utente malevolo. Chiunque esegua il software di Ethereum potrebbe immediatamente rilevare la manomissione disonesta con un NFT e l'utente malevolo sarebbe penalizzato economicamente ed espulso.

I problemi di sicurezza degli NFT sono molto spesso correlati alle truffe di phishing, alle vulnerabilità dei contratti intelligenti o agli errori degli utenti (come esporre inavvertitamente le chiavi private); per questo una buona sicurezza del portafoglio è essenziale per i proprietari di NFT.

<ButtonLink to="/security/">
  Di più sulla sicurezza
</ButtonLink>

## Letture consigliate {#further-reading}

- [Una guida per principianti agli NFT](https://linda.mirror.xyz/df649d61efb92c910464a4e74ae213c4cab150b9cbcc4b7fb6090fc77881a95d) – _Linda Xie, gennaio 2020_
- [EtherscanNFT tracker](https://etherscan.io/nft-top-contracts)
- [Standard token ERC-721](/developers/docs/standards/tokens/erc-721/)
- [Standard token ERC-1155](/developers/docs/standards/tokens/erc-1155/)

<Divider />

<QuizWidget quizKey="nfts" />
