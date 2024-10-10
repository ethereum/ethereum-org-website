---
title: Come identificare i token truffa
description: Capire i token truffa, come fanno a sembrare legittimi e come evitarli.
lang: it
---

# Come identificare i token truffa {#identify-scam-tokens}

Uno degli utilizzi più comuni di Ethereum è quello di permettere a un gruppo di persone di creare un token scambiabile, che potremmo definire la loro valuta. In genere questi token seguono uno standard, l'[ERC-20](/developers/docs/standards/tokens/erc-20/). Tuttavia, ovunque ci siano casi d'uso legittimi che apportano valore, ci sono anche criminali che cercano di accaparrarsi quel valore.

Ci sono due modi in cui è probabile che ti ingannino:

- **Vendendoti un token truffa**, che può sembrare il token legittimo che vuoi acquistare, ma è emesso dai truffatori e non vale nulla.
- **Inducendoti con l'inganno a firmare transazioni sbagliate**, di solito indirizzandoti alla loro interfaccia utente. Potrebbero cercare di convincerti a concedere ai loro contratti accesso ai tuoi token ERC-20, a esporre informazioni sensibili che consentano loro di accedere alle tue risorse, ecc. Queste interfacce utente potrebbero essere cloni quasi perfetti di siti onesti, ma con trucchi nascosti.

Per illustrare cosa sono i token truffa e come identificarli, analizzeremo un esempio di uno di essi: [`wARB`](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82). Questo token cerca di assomigliare al token legittimo [`ARB`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1).

<ExpandableCard
title="Cosa è ARB?"
contentPreview=''>

Arbitrum è un'organizzazione che sviluppa e gestisce <a href="/developers/docs/scaling/optimistic-rollups/">rollup ottimistici</a>. Inizialmente Arbitrum era organizzata come società a scopo di lucro, ma poi ha preso provvedimenti per decentralizzarsi. Nell'ambito di questo processo, hanno emesso un <a href="/dao/#token-based-membership">token di governance</a> negoziabile.

</ExpandableCard>

<ExpandableCard
title="Perchè il token truffa è chiamato wARB?"
contentPreview=''>

In Ethereum esiste una convenzione per cui, quando una risorsa non è conforme a ERC-20, ne viene creata una versione "wrapped" con il nome che inizia con "w". Quindi, ad esempio, abbiamo wBTC per bitcoin e <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">wETH per ether</a>.

Non ha senso creare una versione wrapped di un token ERC-20 già presente su Ethereum, ma i truffatori si basano sull'apparenza di legittimità piuttosto che sulla realtà sottostante.

</ExpandableCard>

## Come funzionano i token truffa? {#how-do-scam-tokens-work}

Lo scopo di Ethereum è la decentralizzazione. Ciò significa che non esiste un'autorità centrale che possa confiscare le tue risorse o impedirti di distribuire un contratto intelligente. Ma ciò significa anche che i truffatori possono distribuire tutti i contratti intelligenti che desiderano.

<ExpandableCard
title="Cosa sono i contratti intelligenti?"
contentPreview=''>

<a href="/developers/docs/smart-contracts/">I contratti intelligenti</a> sono i programmi che vengono eseguiti sulla blockchain di Ethereum. Ogni token ERC-20, ad esempio, è implementato come un contratto intelligente.

</ExpandableCard>

In particolare, Arbitrum ha distribuito un contratto che utilizza il simbolo `ARB`. Ma questo non impedisce ad altre persone di distribuire un contratto che utilizza lo stesso simbolo o uno simile. Chiunque scriva il contratto può stabilire ciò che il contratto farà.

## Apparire legittimi {#appearing-legitimate}

Ci sono diversi trucchi che i creatori di token truffa mettono in atto per sembrare legittimi.

- **Nome e simbolo legittimi**. Come già accennato, i contratti ERC-20 possono avere lo stesso simbolo e lo stesso nome di altri contratti ERC-20. Non si può contare su questi campi per la sicurezza.

- **Proprietari legittimi**. I token truffa spesso inviano saldi significativi a indirizzi che ci si aspetta siano legittimi possessori del token reale.

  Ad esempio, esaminiamo di nuovo `wARB`. [Circa il 16% dei token](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?a=0x1c8db745abe3c8162119b9ef2c13864cd1fdd72f) è detenuto da un indirizzo il cui tag pubblico è [Fondazione Arbitrum: Distributore](https://etherscan.io/address/0x1c8db745abe3c8162119b9ef2c13864cd1fdd72f). Questo _non_ è un indirizzo falso, è infatti l'indirizzo che [ha distribuito il vero contratto ARB sulla rete principale di Ethereum](https://etherscan.io/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670).

  Poiché il saldo ERC-20 di un indirizzo fa parte della memoria del contratto ERC-20, può essere specificato dal contratto che corrisponda a quanto desiderato dallo sviluppatore del contratto. È anche possibile che un contratto vieti i trasferimenti, in modo che gli utenti legittimi non possano sbarazzarsi di quei token truffa.

- **Trasferimenti legittimi**. _I proprietari legittimi non pagherebbero per trasferire un token truffa ad altri, quindi se ci sono trasferimenti devono essere legittimi, giusto?_** Sbagliato**. Gli eventi di `trasferimento` sono prodotti dal contratto ERC-20. Un truffatore può facilmente scrivere il contratto in modo che produca queste azioni.

## Siti web truffaldini {#websites}

I truffatori sono anche in grado di produrre siti web molto convincenti, a volte addirittura cloni precisi di siti autentici, con interfacce utente identiche, ma con sottili trucchi. Esempi possono essere i collegamenti esterni che sembrano legittimi e che in realtà rimandano l'utente a un sito truffa esterno, oppure istruzioni errate che portano l'utente a esporre le proprie chiavi o a inviare fondi all'indirizzo di un utente malevolo.

La pratica migliore per evitare questo problema è controllare attentamente l'URL dei siti visitati e salvare nei segnalibri gli indirizzi dei siti autentici noti. In questo modo, è possibile accedere al sito reale attraverso i segnalibri senza commettere accidentalmente errori di ortografia o affidarsi a collegamenti esterni.

## Come ci si può proteggere? {#protect-yourself}

1. **Controlla l'indirizzo del contratto**. I token legittimi provengono da organizzazioni legittime e gli indirizzi dei contratti possono essere consultati sul sito web dell'organizzazione. Per esempio, [per `ARB` puoi vedere gli indirizzi legittimi qui](https://docs.arbitrum.foundation/deployment-addresses#token).

2. **I token reali hanno liquidità**. Un'altra opzione è quella di esaminare le dimensioni dei pool di liquidità su [Uniswap](https://uniswap.org/), uno dei protocolli di scambio di token più comuni. Questo protocollo funziona utilizzando pool di liquidità, in cui gli investitori depositano i loro token nella speranza di ottenere un guadagno dalle commissioni di negoziazione.

I token truffa hanno in genere pool di liquidità molto ridotti, se non addirittura inesistenti, perché i truffatori non vogliono mettere a rischio risorse reali. Ad esempio, il pool Uniswap `ARB`/`ETH` contiene circa un milione di dollari ([vedi qui il valore aggiornato](https://info.uniswap.org/#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)) e l'acquisto o la vendita di una piccola quantità non cambierà il prezzo:

![Comprare un token legittimo](./uniswap-real.png)

Ma quando si cerca di acquistare il token truffa `wARB`, anche un piccolo acquisto cambierebbe il prezzo di oltre il 90%:

![Comprare un token truffa](./uniswap-scam.png)

Questo è un altro elemento di prova che ci mostra che `wARB` probabilmente non è un token legittimo.

3. **Cerca su Etherscan**. Molti token truffa sono già stati identificati e segnalati dalla community. Tali token sono [contrassegnati su Etherscan](https://info.etherscan.com/etherscan-token-reputation/). Sebbene Etherscan non sia una fonte autorevole di verità (è nella natura delle reti decentralizzate che non ci possa essere una fonte autorevole di legittimità), i token che sono identificati da Etherscan come truffe sono probabilmente truffe.

   ![Token truffa su Etherscan](./etherscan-scam.png)

## Conclusioni {#conclusion}

Finché ci sarà valore nel mondo, ci saranno truffatori che cercheranno di accaparrarselo, e in un mondo decentralizzato non c'è nessuno che possa proteggerti se non te stesso. Speriamo che ricorderai questi punti per distinguere i token legittimi dalle truffe:

- I token truffa si spacciano per token legittimi, possono utilizzare lo stesso nome, lo stesso simbolo, ecc.
- I token truffa _non possono_ utilizzare lo stesso indirizzo di contratto.
- La fonte migliore per l'indirizzo del token legittimo è l'organizzazione da cui proviene il token stesso.
- Se non fosse disponibile, è possibile utilizzare applicazioni famose e affidabili come [Uniswap](https://app.uniswap.org/#/swap) e [Etherscan](https://etherscan.io/).
