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

NFTs are tokens that are **individually unique**. Ogni NFT ha proprietà differenti (non fungibile) ed provatamente scarso. This is different from tokens such as [ETH](/glossary/#ether) or other Ethereum based tokens like USDC where every token is identical and has the same properties ('fungible'). Non ti interessa quale particolare banconota di un taglio specifico (o ETH) hai nel portafoglio, perché sono tutte identiche e valgono uguale. Tuttavia, tu _ti_ preoccupi di quale specifico NFT possiedi, perché ha proprietà individuali che lo distinguono dagli altri (non fungibile).

L'unicità di ciascun NFT consente la tokenizzazione di oggetti come oggetti d'arte, oggetti da collezione, o persino beni immobili, dove un specifico NFT unico rappresenta uno specifico oggetto unico del mondo reale o digitale. Ownership of an asset is publicly verifiable on Ethereum [blockchain](/glossary/#blockchain).

<YouTube id="Xdkkux6OxfM" />

## L'Internet delle risorse {#internet-of-assets}

Gli NFT ed Ethereum risolvono alcuni dei problemi esistenti oggi in internet. Man mano che tutto diventa più digitale, aumenta l'esigenza di replicare le proprietà degli oggetti fisici, come la scarsità, l'unicità e la prova di proprietà in modo da non essere controllate da un'organizzazione centrale. Per esempio, con gli NFT, puoi possedere un file musicale mp3 in tutte le app basate su Ethereum e non essere vincolato da una specifica azienda per app di musica come Spotify o Apple Music. You can own a social media handle that you can sell or swap, but **can't be arbitrarily taken away from you** by a platform provider.

Ecco come appare un internet di NFT, rispetto all'Internet utilizzato oggi da molti di noi...

### Un confronto {#nft-comparison}

| Un Internet di NFT                                                                                                                                       | L'internet di oggi                                                                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **You own your assets!** Only you can sell or swap them.                                                                                                 | **You rent an asset** from some organization and it can be taken away from you.                                                                                             |
| NFTs are **digitally unique**, no two NFTs are the same.                                                                                                 | **A copy often cannot be distinguished** from the original.                                                                                                                 |
| Ownership of an NFT is stored on the blockchain for anyone to **verify publicly**.                                                                       | The access to ownership records of digital items is **controlled by institutions** – you must take their word for it.                                                       |
| NFTs are [smart contracts](/glossary/#smart-contract) on Ethereum. This means they **can easily be used in other smart contracts** and apps on Ethereum! | Companies with digital items usually **require their own "walled garden" infrastructure**.                                                                                  |
| Content **creators can sell their work anywhere** and can access a global market.                                                                        | I creatori si affidano all'infrastruttura e alla distribuzione delle piattaforme che utilizzano. These are often subject to terms of use and **geographical restrictions**. |
| NFT creators **can retain ownership rights** over their own work, and program royalties directly into the NFT contract.                                  | Platforms, such as music **streaming services, retain the majority of profits from sales**.                                                                                 |

## Per cosa vengono utilizzati gli NFT? {#nft-use-cases}

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
- collateral in [decentralized finance](/glossary/#defi)

Magari sei un artista che vuole condividere il proprio lavoro utilizzando gli NFT, senza perdere il controllo e sacrificare i tuoi profitti agli intermediari. Puoi creare un nuovo contratto e specificare il numero di NFT, le loro proprietà e un collegamento ad alcune opere d'arte specifiche. As the artist, **you can program into the smart contract the royalties** you should be paid (e.g. transfer 5% of the sale price to the contract owner each time an NFT is transferred). You can also always prove that you created the NFTs because you own the [wallet](/glossary/#wallet) that deployed the contract. Your buyers can easily prove that they own an **authentic NFT** from your collection because their wallet [address](/glossary/#address) is associated with a token in your smart contract. Possono utilizzarlo in tutto l'ecosistema Ethereum, certi della sua autenticità.

<InfoBanner shouldSpaceBetween emoji=":eyes:" mt="8">
  <div>Esplora, acquista o crea opere d'arte/oggetti da collezione NFT...</div>
  <ButtonLink to="/dapps/?category=collectibles#explore">
    Esplora l'arte NFT
  </ButtonLink>
</InfoBanner>

Oppure, prendiamo ad esempio un biglietto per un evento sportivo. Just as an **organizer of an event can choose how many tickets to sell**, the creator of an NFT can decide how many replicas exist. A volte queste sono repliche esatte, come 5000 biglietti di ingresso generici. A volte ne vengono coniati diversi molto simili, ma ognuno leggermente diverso, come nel caso dei biglietti con i posti assegnati. Questi possono essere acquistati e venduti tra pari senza pagare i gestori dei biglietti e l'acquirente ha sempre la certezza dell'autenticità del biglietto controllando l'indirizzo del contratto.

On ethereum.org, **NFTs are used to demonstrate that people have meaningfully contributed** to our Github repository (programmed the website, written or modified an article...), translated our content, or attended our community calls, and we've even got our own NFT domain name. If you contribute to ethereum.org, you can claim a [POAP](/glossary/#poap) NFT. Alcuni incontri nel mondo delle criptovalute hanno usato i POAP come biglietti. [Maggiori informazioni sul contributo](/contributing/#poap).

![POAP di ethereum.org](./poap.png)

Questo sito web ha un nome di dominio alternativo alimentato da NFT, **ethereum.eth**. Il nostro indirizzo `.org` è gestito centralmente da un provider di sistema di nomi di dominio (DNS), mentre ethereum`.eth` è registrato su Ethereum tramite l'Ethereum Name Service (ENS). Ed è posseduto e gestito da noi. [Consulta il nostro record ENS](https://app.ens.domains/name/ethereum.eth)

[Maggiori informazioni sull'ENS](https://app.ens.domains)

<Divider />

## Come funzionano gli NFT? {#how-nfts-work}

Gli NFT, come ogni elemento digitale sulla blockchain di Ethereum, sono creati attraverso uno speciale programma basato su Ethereum chiamato contratto intelligente. These contracts follow certain rules, like the [ERC-721](/glossary/#erc-721) or [ERC-1155](/glossary/#erc-1155) standards, which determine what the contract can do.

Il contratto intelligente degli NFT può fare alcune cose essenziali:

- **Creare NFT:** può creare nuovi NFT.
- **Assegnare proprietà:** tiene traccia di chi possiede quali NFT collegandoli a specifici indirizzi Ethereum.
- **Dare un ID a ogni NFT:** ogni NFT ha un numero che lo rende unico. In aggiunta, di solito ci sono alcune informazioni (metadati) allegate a esso, che descrivono cosa rappresenta l'NFT.

Quando qualcuno "crea" o "conia" un NFT, sta fondamentalmente dicendo al contratto intelligente di assegnargli la proprietà di uno specifico NFT. Questa informazione è conservata in modo sicuro e pubblico nella blockchain.

Inoltre, il creatore del contratto può aggiungere regole aggiuntive. Potrebbe limitare la quantità che può essere prodotta di un certo NFT o decidere di ricevere una piccola commissione ogni volta che l'NFT passa in nuove mani.

### Sicurezza degli NFT {#nft-security}

Ethereum's security comes from [proof-of-stake](/glossary/#pos). Il sistema è progettato per disincentivare economicamente le azioni malevole, rendendo Ethereum a prova di manomissione. Questo è ciò che rende possibili gli NFT. Once the [block](/glossary/#block) containing your NFT transaction becomes [finalized](/glossary/#finality) it would cost an attacker millions of ETH to change it. Chiunque esegua il software di Ethereum potrebbe immediatamente rilevare la manomissione malevola di un NFT, e l'utente malevolo sarebbe penalizzato economicamente ed espulso.

I problemi di sicurezza degli NFT sono molto spesso correlati alle truffe di phishing, alle vulnerabilità dei contratti intelligenti o agli errori degli utenti (come esporre inavvertitamente le chiavi private), per questo una buona sicurezza del portafoglio è essenziale per i proprietari di NFT.

<ButtonLink to="/security/">
  Di più sulla sicurezza
</ButtonLink>

## Letture consigliate {#further-reading}

- [A beginner's guide to NFTs](https://linda.mirror.xyz/df649d61efb92c910464a4e74ae213c4cab150b9cbcc4b7fb6090fc77881a95d) – _Linda Xie, Gennaio 2020_
- [Tracker EtherscanNFT](https://etherscan.io/nft-top-contracts)
- [Standard token ERC-721](/developers/docs/standards/tokens/erc-721/)
- [Standard token ERC-1155](/developers/docs/standards/tokens/erc-1155/)

<Divider />

<QuizWidget quizKey="nfts" />
