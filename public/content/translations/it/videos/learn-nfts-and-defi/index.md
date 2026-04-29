---
title: "Cosa sono gli NFT e come possono essere usati nella finanza decentralizzata?"
description: "Comprendi i meccanismi dei token non fungibili (NFT) su Ethereum e come vengono utilizzati nelle app di finanza decentralizzata (DeFi)."
lang: it
youtubeId: "Xdkkux6OxfM"
uploadDate: 2020-09-29
duration: "0:11:13"
educationLevel: beginner
topic:
  - "nfts"
  - "defi"
  - "erc-721"
  - "erc-1155"
  - "lending"
format: explainer
author: Finematics
breadcrumb: "NFT e DeFi"
---

Una spiegazione di **Finematics** che copre i meccanismi dei token non fungibili (NFT) su Ethereum e come si intersecano con la finanza decentralizzata (DeFi), inclusi gli standard dei token, i casi d'uso e il prestito collateralizzato da NFT.

*Questa trascrizione è una copia accessibile della [trascrizione originale del video](https://www.youtube.com/watch?v=Xdkkux6OxfM) pubblicata da Finematics. È stata leggermente modificata per facilitarne la lettura.*

#### Fungibile vs. non fungibile (0:00) {#fungible-vs-non-fungible-000}

Iniziamo con la parola "fungibile". Fungibile significa che le singole unità di un asset sono intercambiabili e indistinguibili l'una dall'altra. Un buon esempio di asset fungibile è una valuta. Una banconota da cinque dollari ha sempre lo stesso valore di qualsiasi altra banconota da cinque dollari. Non ti importa davvero quale particolare banconota da cinque dollari ricevi perché valgono tutte la stessa cifra.

Quando si tratta di asset non fungibili, tuttavia, ogni unità è unica e non può essere sostituita direttamente da un'altra. Un buon esempio è un biglietto aereo. Anche se i biglietti aerei possono sembrare simili, ognuno riporta un nome del passeggero, una destinazione, un orario di partenza e un numero di posto diversi. Cercare di scambiare un biglietto aereo con un altro potrebbe portare a seri problemi.

Un altro esempio sono le carte collezionabili. Anche se possono sembrare simili, ogni carta ha attributi diversi. Fattori come l'anno di produzione o lo stato di conservazione della carta possono fare la differenza. Un esempio estremo di qualcosa di non fungibile è un'opera d'arte: un dipinto, ad esempio, viene solitamente creato in un'unica copia originale.

#### Proprietà degli NFT (2:13) {#properties-of-nfts-213}

Ora che sappiamo cosa significa "non fungibile", diamo un'occhiata alle proprietà più comuni degli NFT.

- **Unico** — ogni NFT ha proprietà diverse che sono solitamente archiviate nei metadati del token
- **Comprovatamente scarso** — di solito c'è un numero limitato di NFT, con l'esempio estremo di averne una sola copia; il numero di token può essere verificato sulla blockchain
- **Indivisibile** — la maggior parte degli NFT non può essere suddivisa in tagli più piccoli, quindi non puoi acquistare o trasferire una frazione del tuo NFT

Analogamente ai token standard, anche gli NFT garantiscono la proprietà dell'asset, sono facilmente trasferibili e sono a prova di frode.

#### Standard dei token: ERC-20, ERC-721 ed ERC-1155 (3:17) {#token-standards-erc-20-erc-721-and-erc-1155-317}

Sebbene gli NFT possano essere implementati su qualsiasi blockchain che supporti la programmazione di smart contract, gli standard più degni di nota sono ERC-721 ed ERC-1155 su Ethereum. Prima di immergerci negli standard degli NFT, ricapitoliamo rapidamente l'ERC-20, poiché sarà utile per un confronto.

L'**ERC-20** è un noto standard per la creazione di token sulla blockchain di Ethereum. Gli esempi includono stablecoin come USDT o DAI e token della finanza decentralizzata (DeFi) come LEND, YFI, SNX e UNI. L'ERC-20 consente di creare token fungibili: tutti i token creati in base a questo standard sono completamente indistinguibili. Non importa se ricevi USDT da un amico o da un exchange; il valore di ogni token è lo stesso.

L'**ERC-721** è lo standard per la creazione di token non fungibili. Consente di creare contratti che producono token distinguibili con proprietà diverse. Un esempio comune è il famoso CryptoKitties, un gioco che consente di collezionare e allevare gattini virtuali.

L'**ERC-1155** è il passo successivo nella creazione di token non fungibili. Questo standard consente di creare contratti che supportano sia token fungibili che non fungibili. È stato creato da Enjin, un progetto incentrato sul gaming basato su blockchain. In molti giochi come World of Warcraft, un giocatore può possedere sia oggetti non fungibili (spade, scudi, armature) sia oggetti fungibili come oro o frecce. L'ERC-1155 consente agli sviluppatori di definire sia token fungibili che non fungibili e decidere quanti di ciascuno dovrebbero esistere.

#### Casi d'uso degli NFT (5:28) {#nft-use-cases-528}

Oltre a CryptoKitties, ci sono molti altri giochi popolari che sfruttano gli NFT, come Gods Unchained e Decentraland. Decentraland è un esempio interessante perché i giocatori possono acquistare lotti di terra digitale che possono poi essere rivenduti o persino utilizzati come spazio pubblicitario all'interno del gioco.

Altri esempi includono marketplace per l'arte digitale, come Rarible e SuperRare, e persino aggregatori di marketplace come OpenSea. Un altro esempio di qualcosa di scarso che può essere rappresentato come NFT sono i nomi di dominio: ad esempio, Ethereum Name Service con l'estensione .eth e Unstoppable Domains con l'estensione .crypto.

Alcuni NFT possono essere estremamente costosi. Il CryptoKitty più costoso, Dragon, è stato venduto per 600 ETH alla fine del 2017, per un valore di circa centosettantamila dollari all'epoca. Nomi di dominio scarsi come exchange.eth possono valere oltre cinquecentomila dollari.

#### Gli NFT come collaterale nella DeFi (6:48) {#nfts-as-collateral-in-defi-648}

Quando si tratta di DeFi, gli NFT possono sbloccare un potenziale ancora maggiore per la finanza decentralizzata. Attualmente, la stragrande maggioranza dei protocolli di prestito della DeFi è collateralizzata. Una delle idee più interessanti è quella di utilizzare gli NFT come collaterale. Ciò significa che saresti in grado di fornire un NFT che rappresenta un'opera d'arte, una terra digitale o persino immobili tokenizzati come collaterale, e prendere in prestito denaro a fronte di esso.

Sembra promettente, ma c'è un problema. Nelle piattaforme standard di prestito e assunzione di prestito della DeFi come Compound o Aave, il valore del collaterale fornito può essere facilmente misurato integrando oracoli di prezzo. Questi aggregano i prezzi da molteplici fonti liquide, come gli exchange centralizzati e decentralizzati. Quando si tratta di NFT, i mercati per particolari token sono molto spesso illiquidi, il che rende complicato il processo di scoperta dei prezzi.

Per comprendere meglio questo problema, immagina che qualcuno acquisti un raro CryptoKitty per 10 ETH. Questo NFT viene successivamente utilizzato come collaterale e il mutuatario preleva 1.700 DAI, supponendo che 10 ETH valgano 3.500 dollari e che questo particolare NFT abbia un rapporto prestito/valore (loan-to-value) del 50%. Dopodiché, se nessun altro è disposto ad acquistare questo particolare CryptoKitty, il mercato per questo NFT è illiquido o addirittura inesistente. L'unica supposizione è che l'NFT valga ancora la stessa cifra a cui è stato venduto l'ultima volta, il che non è un'ipotesi sicura, poiché il valore degli NFT può cambiare in modo piuttosto drastico.

Questo è il motivo per cui alcuni progetti che offrono prestiti collateralizzati da NFT utilizzano un modello leggermente diverso: i prestiti peer-to-peer. In questo modello di marketplace, i mutuatari possono offrire i propri NFT come collaterale e i prestatori possono scegliere quale NFT sono disposti ad accettare prima di avviare un prestito. L'NFT utilizzato come collaterale viene conservato in un contratto di deposito a garanzia (escrow) e, se il mutuatario è inadempiente non rimborsando in tempo l'importo preso in prestito più gli interessi, l'NFT viene trasferito al prestatore. Questo spazio è nuovo, ma una delle aziende che utilizza questo modello è NFTfi.

#### Gli NFT come prodotti finanziari (9:32) {#nfts-as-financial-products-932}

Oltre a essere utilizzati come collaterale, gli NFT possono anche rappresentare prodotti finanziari più complessi come assicurazioni, obbligazioni o opzioni. Yinsure di Yearn Finance è un buon esempio dell'utilizzo degli NFT nel settore assicurativo. In Yinsure, ogni contratto assicurativo è rappresentato come un NFT che può anche essere scambiato su un mercato secondario come Rarible.

Di recente abbiamo anche iniziato a vedere concetti nativi della DeFi, come il minaggio di liquidità, utilizzati da progetti NFT. Rarible, ad esempio, ha iniziato a ricompensare i propri utenti con token di governance RARI per la creazione, l'acquisto e la vendita di NFT sulla propria piattaforma.

#### Il mercato in crescita degli NFT (10:30) {#the-growing-nft-market-1030}

Con oltre 100 milioni di dollari di NFT scambiati e 6 milioni di dollari solo nell'ultimo mese, lo spazio degli NFT è una delle nicchie in più rapida crescita nel settore cripto. Ha un enorme potenziale che spazia dai gattini digitali a complessi prodotti finanziari.