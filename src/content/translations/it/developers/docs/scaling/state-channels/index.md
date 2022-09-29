---
title: Canali di stato
description: Un'introduzione ai canali di stato e ai canali di pagamento come soluzione di scalabilità, attualmente utilizzata dalla comunità Ethereum.
lang: it
incomplete: true
sidebarDepth: 3
---

I canali di stato consentono ai partecipanti di effettuare transazioni `x` numero di volte all'esterno della catena inviando solo due transazioni sulla catena alla rete Ethereum. Ciò consente volumi di transazioni estremamente elevati.

## Prerequisiti {#prerequisites}

Dovresti avere una buona comprensione di tutti gli argomenti fondamentali ed una comprensione di alto livello della [scalabilità di Ethereum](/developers/docs/scaling/). L'implementazione di soluzioni di scalabilità, come i canali, è un argomento avanzato in quanto la tecnologia è meno testata nel campo e continua ad essere oggetto di ricerca e sviluppo.

## Canali {#channels}

I partecipanti devono bloccare una porzione dello stato di Ethereum, ad esempio un deposito di ETH, in un contratto multisig. Un contratto multisig è un tipo di contratto che richiede le firme (e quindi l'accordo) di chiavi private multiple per poter essere eseguito.

Il blocco dello stato in questo modo è la prima transazione e apre il canale. I partecipanti possono poi eseguire transazioni esternamente alla catena, in modo rapido e libero. Quando l'interazione è terminata, viene inviata sulla catena una transazione finale, che sblocca lo stato.

**Utile per**:

- molti aggiornamenti di stato
- situazioni in cui il numero di partecipanti è noto in anticipo
- situazioni in cui i partecipanti sono sempre disponibili

Attualmente esistono due tipi di canali: canali di stato e canali di pagamento.

## Canali di stato {#state-channels}

Per spiegare il funzionamento di un canale di stato, forse è più efficace utilizzare un esempio, come il gioco del tris:

1. Viene creato uno smart contract multisig "Giudice" sulla catena principale di Ethereum, che conosce le regole del tris e può identificare Alice e Bob come due giocatori della partita. Questo contratto contiene un premio di 1 ETH.

2. A questo punto, Alice e Bob iniziano a giocare, aprendo il canale di stato. Ogni mossa crea una transazione esterna alla catena che contiene un "nonce". Ciò significa semplicemente che potremo sempre vedere in seguito in quale ordine sono state eseguite le mosse.

3. Quando c'è un vincitore, il canale viene chiuso con l'invio dello stato finale (ad esempio la lista delle transazioni) al contratto Giudice, pagando una sola commissione per la transazione. Il Giudice si assicura che lo "stato finale" sia firmato da entrambe le parti e aspetta il tempo necessario per assicurarsi che nessuno possa legittimamente contestare il risultato, quindi paga il premio di 1 ETH ad Alice.

## Canali di pagamento {#payment-channels}

Canali di stato semplificati che si occupano solo di pagamenti (ad esempio trasferimenti ETH). Consentono trasferimenti esternamente alla catena tra due partecipanti, purché la somma netta dei trasferimenti non superi i token depositati.

## Pro e contro {#channels-pros-and-cons}

| Pro                                                                                                 | Contro                                                                                                                                                    |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prelievo/regolamento istantaneo sulla rete principale (se entrambe le parti di un canale cooperano) | Tempi e costi necessari per configurare un canale. Non adatto per transazioni occasionali esternamente alla catena tra utenti arbitrari.                  |
| Volumi estremamente elevati                                                                         | Necessità di monitorare la rete periodicamente (requisito di liveness) o delegare la responsabilità a qualcun altro per garantire la sicurezza dei fondi. |
| Costi per transazione più bassi in assoluto. Ottimo per flussi di micropagamenti                    | Necessità di bloccare fondi nei canali di pagamento aperti                                                                                                |
|                                                                                                     | Non supporta la partecipazione aperta                                                                                                                     |

## Usare i canali di stato {#use-state-channels}

Diversi progetti forniscono implementazioni dei canali di stato che puoi integrare nelle tue dApp:

- [Connext](https://connext.network/)
- [Kchannels](https://www.kchannels.io/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Letture consigliate {#further-reading}

**Canali di stato**

- [EthHub sui canali di stato](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/state-channels/)
- [Making Sense of Ethereum’s Layer 2 Scaling Solutions: State Channels, Plasma, and Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, Feb 12 2018_
- [State Channels - an explanation](https://www.jeffcoleman.ca/state-channels/) _Nov 6, 2015 - Jeff Coleman_
- [Basics of State Channels](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _District0x_

**Canali di pagamento**

- [EthHub sui canali di pagamento](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/payment-channels/)

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_
