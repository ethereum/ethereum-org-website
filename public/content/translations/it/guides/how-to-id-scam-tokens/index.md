---
title: Come identificare i token truffa
description: Comprendere i token truffa, come fanno a sembrare legittimi e come evitarli.
lang: it
---

# Come identificare i token truffa {#identify-scam-tokens}

Uno degli usi più comuni di Ethereum è la creazione di un token scambiabile da parte di un gruppo, in un certo senso la propria valuta. Questi token seguono tipicamente uno standard, l'[ERC-20](/developers/docs/standards/tokens/erc-20/). Tuttavia, ovunque ci siano casi d'uso legittimi che portano valore, ci sono anche criminali che cercano di rubare quel valore per sé stessi.

Ci sono due modi in cui è probabile che ti ingannino:

- **Vendendoti un token truffa**, che potrebbe sembrare il token legittimo che desideri acquistare, ma che è emesso dai truffatori e non vale nulla.
- **Ingannandoti per farti firmare transazioni dannose**, di solito indirizzandoti verso la loro interfaccia utente. Potrebbero cercare di farti concedere ai loro contratti un'autorizzazione (allowance) sui tuoi token ERC-20, esponendo informazioni sensibili che danno loro accesso ai tuoi asset, ecc. Queste interfacce utente potrebbero essere cloni quasi perfetti di siti onesti, ma con trucchi nascosti.

Per illustrare cosa sono i token truffa e come identificarli, esamineremo un esempio: [`wARB`](https://eth.blockscout.com/token/0xB047c8032b99841713b8E3872F06cF32beb27b82). Questo token tenta di sembrare il token legittimo [`ARB`](https://eth.blockscout.com/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1).

<ExpandableCard
title="Cos'è ARB?"
contentPreview=''>

Arbitrum è un'organizzazione che sviluppa e gestisce [rollup ottimistici](/developers/docs/scaling/optimistic-rollups/). Inizialmente, Arbitrum era organizzata come una società a scopo di lucro, ma poi ha intrapreso passi per decentralizzarsi. Come parte di quel processo, ha emesso un [token di governance](/dao/#token-based-membership) scambiabile.
</ExpandableCard>

<ExpandableCard
title="Perché il token truffa si chiama wARB?"
contentPreview=''>

C'è una convenzione in Ethereum secondo cui, quando un asset non è conforme allo standard ERC-20, ne creiamo una versione "avvolta" (wrapped) con il nome che inizia per "w". Quindi, per esempio, abbiamo wBTC per bitcoin e <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">wETH per ether</a>.

Non ha senso creare una versione avvolta di un token ERC-20 che è già su Ethereum, ma i truffatori si affidano all'apparenza di legittimità piuttosto che alla realtà sottostante.
</ExpandableCard>

## Come funzionano i token truffa? {#how-do-scam-tokens-work}

L'intero scopo di Ethereum è la decentralizzazione. Ciò significa che non esiste un'autorità centrale che possa confiscare i tuoi asset o impedirti di distribuire un contratto intelligente. Ma significa anche che i truffatori possono distribuire qualsiasi contratto intelligente desiderino.

<ExpandableCard
title="Cosa sono i contratti intelligenti?"
contentPreview=''>

I [contratti intelligenti](/developers/docs/smart-contracts/) sono i programmi che vengono eseguiti sulla blockchain di Ethereum. Ogni token ERC-20, ad esempio, è implementato come un contratto intelligente.
</ExpandableCard>

Nello specifico, Arbitrum ha distribuito un contratto che utilizza il simbolo `ARB`. Ma questo non impedisce ad altre persone di distribuire a loro volta un contratto che utilizza lo stesso identico simbolo, o uno simile. Chiunque scriva il contratto può stabilire cosa farà il contratto.

## Sembrare legittimi {#appearing-legitimate}

Ci sono diversi trucchi che i creatori di token truffa utilizzano per sembrare legittimi.

- **Nome e simbolo legittimi**. Come menzionato in precedenza, i contratti ERC-20 possono avere lo stesso simbolo e nome di altri contratti ERC-20. Non puoi fare affidamento su questi campi per la sicurezza.

- **Proprietari legittimi**. I token truffa spesso inviano tramite airdrop saldi significativi a indirizzi che ci si aspetta siano detentori legittimi del token reale.

  Ad esempio, diamo di nuovo un'occhiata a `wARB`. [Circa il 16% dei token](https://eth.blockscout.com/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?tab=holders) è detenuto da un indirizzo il cui tag pubblico è [Arbitrum Foundation: Deployer](https://eth.blockscout.com/address/0x1C8db745ABe3C8162119b9Ef2c13864Cd1FDD72F). Questo _non_ è un indirizzo falso, è davvero l'indirizzo che [ha distribuito il vero contratto ARB sulla rete principale di Ethereum](https://eth.blockscout.com/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670).

  Poiché il saldo ERC-20 di un indirizzo fa parte dell'archiviazione del contratto ERC-20, può essere specificato dal contratto in modo che sia qualsiasi cosa desideri lo sviluppatore del contratto. È anche possibile che un contratto vieti i trasferimenti, in modo che gli utenti legittimi non siano in grado di sbarazzarsi di quei token truffa.

- **Trasferimenti legittimi**. _I proprietari legittimi non pagherebbero per trasferire un token truffa ad altri, quindi se ci sono trasferimenti deve essere legittimo, giusto?_ **Sbagliato**. Gli eventi `Transfer` sono prodotti dal contratto ERC-20. Un truffatore può facilmente scrivere il contratto in modo tale che produca quelle azioni.

## Siti web truffaldini {#websites}

I truffatori possono anche produrre siti web molto convincenti, a volte persino cloni precisi di siti autentici con interfacce utente identiche, ma con trucchi subdoli. Esempi potrebbero essere link esterni che sembrano legittimi ma che in realtà inviano l'utente a un sito truffa esterno, o istruzioni errate che guidano l'utente a esporre le proprie chiavi o a inviare fondi all'indirizzo di un utente malintenzionato.

La migliore pratica per evitare questo è controllare attentamente l'URL dei siti che visiti e salvare gli indirizzi dei siti autentici noti nei tuoi preferiti. In questo modo, puoi accedere al sito reale tramite i tuoi preferiti senza commettere accidentalmente errori di ortografia o fare affidamento su link esterni.

## Come puoi proteggerti? {#protect-yourself}

1. **Controlla l'indirizzo del contratto**. I token legittimi provengono da organizzazioni legittime e puoi vedere gli indirizzi dei contratti sul sito web dell'organizzazione. Ad esempio, [per `ARB` puoi vedere gli indirizzi legittimi qui](https://docs.arbitrum.foundation/deployment-addresses#token).

2. **I token reali hanno liquidità**. Un'altra opzione è guardare la dimensione della pool di liquidità su [Uniswap](https://uniswap.org/), uno dei protocolli di scambio di token più comuni. Questo protocollo funziona utilizzando pool di liquidità, in cui gli investitori depositano i loro token nella speranza di un rendimento dalle commissioni di negoziazione.

I token truffa in genere hanno pool di liquidità minuscole, se non inesistenti, perché i truffatori non vogliono rischiare asset reali. Ad esempio, la pool Uniswap `ARB`/`ETH` detiene circa un milione di dollari ([vedi qui per il valore aggiornato](https://app.uniswap.org/explore#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)) e l'acquisto o la vendita di una piccola quantità non cambierà il prezzo:

![Acquisto di un token legittimo](./uniswap-real.png)

Ma quando provi ad acquistare il token truffa `wARB`, anche un acquisto minuscolo cambierebbe il prezzo di oltre il 90%:

![Acquisto di un token truffa](./uniswap-scam.png)

Questa è un'altra prova che ci mostra che è improbabile che `wARB` sia un token legittimo.

3. **Cerca su Etherscan**. Molti token truffa sono già stati identificati e segnalati dalla community. Tali token sono [contrassegnati su Etherscan](https://info.etherscan.com/etherscan-token-reputation/). Sebbene Etherscan non sia una fonte di verità autorevole (è nella natura delle reti decentralizzate che non possa esserci una fonte autorevole per la legittimità), i token identificati da Etherscan come truffe sono probabilmente truffe.

   ![Token truffa su Etherscan](./etherscan-scam.png)

## Conclusione {#conclusion}

Finché ci sarà valore nel mondo, ci saranno truffatori che tenteranno di rubarlo per sé stessi, e in un mondo decentralizzato non c'è nessuno a proteggerti tranne te stesso. Speriamo che tu ricordi questi punti per aiutarti a distinguere i token legittimi dalle truffe:

- I token truffa impersonano token legittimi, possono usare lo stesso nome, simbolo, ecc.
- I token truffa _non possono_ usare lo stesso indirizzo del contratto.
- La migliore fonte per l'indirizzo del token legittimo è l'organizzazione a cui appartiene il token.
- In mancanza di ciò, puoi utilizzare applicazioni popolari e affidabili come [Uniswap](https://app.uniswap.org/#/swap) e [Blockscout](https://eth.blockscout.com/).