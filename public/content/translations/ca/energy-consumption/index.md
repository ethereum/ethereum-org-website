---
title: Consum energètic d'Ethereum
description: La informació bàsica que necessiteu per entendre el consum d'energia d'Ethereum.
lang: ca
---

# Consum energètic d'Ethereum {#introduction}

El consum d'energia actual d'Ethereum amb la [prova de treball](/developers/docs/consensus-mechanisms/#proof-of-work) és massa alt i insostenible. Resoldre els problemes de consum energètic sense sacrificar la seguretat i la descentralització és un desafiament tècnic significatiu i ha estat un objectiu de recerca i desenvolupament durant anys. Anem a veure perquè construir Ethereum ha tingut un enorme impacte mediambiental i com la propera actualització de xarxa a [prova de participació](/developers/docs/consensus-mechanisms/pos) ho canviarà dramàticament tot.

## L'energia protegeix la xarxa {#energy-secures-the-network}

Les transaccions dins la cadena de blocs d'Ethereum són validades pels [miners](/developers/docs/consensus-mechanisms/pow/mining). Els miners agrupen transaccions en blocs ordenats i els afegeixen a la cadena de blocs d'Ethereum. Els nous blocs són emesos a la resta d'operadors de node, els quals executen les transaccions independentment i verifiquen que siguin vàlides. Qualsevol deshonestedat es mostra com a una inconsistència entre els diferents nodes. Els blocs honestos són afegits a la cadena de blocs i esdevenen una immutable part de la història.

La capacitat de qualsevol miner per afegir nous blocs només funciona si existeix un cost associat a la mineria i amb impredictibilitat respecte de quin node específic envia el següent bloc. Aquestes condicions es donen mitjançant la imposició de la prova de treball (PoW o «proof-of-work» en anglès). Per poder sol·licitar emetre un bloc de transaccions, un miner ha de resoldre un trencaclosques computacional arbitrari més ràpid que un altre miner. Resoldre aquest trencaclosques crea competició entre miners i es tradueix en consum d'energia. Per a defraudar amb èxit la cadena de blocs, un miner deshonest hauria de guanyar una vegada rere l'altra la cursa de proves de treball, cosa que és molt poc probable i prohibitivament car.

Ethereum ha utilitzat la prova de treball des dels seus orígens. Migrar des de la prova de treball a la prova de participació ha estat sempre un dels objectius principals d'Ethereum. No obstant, desenvolupar un sistema de prova de participació que s'adhereixi als principis fonamentals d'Ethereum de seguretat i descentralització no és un assumpte trivial. Ha estat necessària molta recerca i molts avanços en criptografia, criptoeconomia i un mecanisme de disseny per arribar a un punt on la transició fos possible.

## Consum d'energia de la prova de treball {#proof-of-work}

La prova de treball és una via resistent per protegir la xarxa i reforçar canvis honestos a la cadena de blocs, però a la vegada és problemàtica per diverses raons. Com que el dret de minar un bloc requereix resoldre un trencaclosques computacional arbitrari, els miners poden incrementar les seves probabilitats d'èxit mitjançant la inversió en hardware més potent. Aquests incentius causen una carrera armamentística amb miners que cada cop adquireixen equips de mineria amb més consum energètic. El protocol actual de prova de treball d'Ethereum comporta una quantitat de consum energètic anual aproximada a la de Finlàndia <sup>[^1]</sup> i a una petjada de carboni similar a la de Suïssa<sup>[^1]</sup>.

## Prova de participació {#proof-of-stake}

Un futur més sostenible per a Ethereum està éssent construït en la forma de cadena de [**proves de participació (PoS o «proof-of-stake» en anglès)**](/roadmap/beacon-chain/). Resoldre trencaclosques arbitraris és innecessari amb la [prova de participació](/developers/docs/consensus-mechanisms/pos/). Eliminar la resolució de trencaclosques redueix dràsticament el consum energètic requerit per a protegir la xarxa. Els miners són reemplaçats per validadors que fan la mateixa funció excepte que, en lloc de consumir els seus actius per endavant en forma de treball computacional, dipositen ETH com a garantia contra el comportament deshonest. Si el validador és gandul (està fora de línia quan se suposa que ha de complir amb el deure de validador) els seus ETH dipositats poden filtrar-se a poc a poc, mentre que un comportament deshonest fa que els actius dipositats siguin «retallats» («slashing»). Això incentiva fortament la participació activa i honesta en la protecció de la xarxa.

De forma similar a la prova de treball, una entitat maliciosa requeriria com a mínim el 51% del total d'ETH dipositats a la xarxa per a executar un [atac al 51%](/glossary/#51-attack). No obstant, a diferència de la prova de treball, on la pèrdua potencial en un atac fallit només és el cost de generar la potència de processament necessària per a minar, en la prova de participació la possible pèrdua en un atac és la quantitat total d'ETH utilitzats com a garantia. Aquesta estructura desincentivadora permet la protecció de la xarxa amb la prova de participació mentre elimina la necessitat de consumir energia en computacions arbitràries. Es poden trobar explicacions detallades sobre la seguretat a la xarxa sota la prova de participació [aquí](/developers/docs/consensus-mechanisms/pos/) i [aquí](https://vitalik.ca/general/2017/12/31/pos_faq.html).

## La Fusió {#the-merge}

Existeix una cadena funcional de prova de participació anomenada [cadena de balisa](/roadmap/beacon-chain/) que s'ha estat executant des de desembre de 2020 que demostra la viabilitat del protocol de proves de participació. La Fusió es refereix a l'instant en el temps en què Ethereum deixa enrere la prova de treball i adopta totalment la prova de participació. Es preveu que succeeixi aproximadament al segon trimestre del 2022. [Més informació sobre la fusió](/roadmap/merge/).

## Consum energètic de la prova de participació {#proof-of-stake-energy}

Així com a mecanisme de construcció de confiança en la prova de participació, la cadena de balisa permet també l'estimació d'ús de la energia posfusió d'Ethereum. Una [estimació recent](https://blog.ethereum.org/2021/05/18/country-power-no-more/) suggeria que la fusió a la prova de participació podria resultar en una reducció del 99,95% del total de l'energia utilitzada, éssent aproximadament 2000 vegades més energèticament eficient que la prova de treball. El consum energètic d'Ethereum seria aproximadament igual que el cost del funcionament d'un ordinador domèstic per a cada node de la xarxa.

![imatge](energy_use_per_transaction.png)

<p style={{ textAlign: "center" }}><small><i>Estimació del consum energètic de la prova de treball per tx utilitzada en una figura en base a les <a href="https://blog.ethereum.org/2021/05/18/country-power-no-more/" target="_blank" rel="noopener noreferrer">dades de maig de 2021</a>, al moment d'escriure la mateixa font suggeria un consum de fins a <a href="https://digiconomist.net/ethereum-energy-consumption" target="_blank" rel="noopener noreferrer">175,56 kWh</a></i></small></p>

Comparem aquests nombres amb un servei com ara Visa. 100.000 transaccions de Visa utilitzen 149 kWh d'energia<sup>[^2]</sup>. Assumint que la fragmentació o «sharding» s'ha implementat, la tasa actual de transaccions d'Ethereum (15 transaccions per segon) s'incrementaria al menys en 64 vegades (el nombre de «shards»), sense comptabilitzar les optimitzacions adicionals dels «rollups». Una estimació realista per a un Ethereum posfusió i fragmentat amb «rollups» és de [25.000 - 100.000](https://twitter.com/VitalikButerin/status/1312905884549300224?s=20) transaccions per segon. Podem utilitzar aquesta informació per a estimar una quantitat màxima i mínima de consum energètic per cada 100.000 transaccions.

- 25.000 transaccions per segon.
- `100.000 / 25.000 = 4` segons per processar 100.000 transaccions.

També podem estimar el consum energètic per segon d'Ethereum, fent una estimació conservadora en què 10.000 validadors actius estiguin protegint la xarxa (hi ha uns [250.000 validadors a la cadena de balisa](https://beaconscan.com/) en aquest moment, però molt d'ells poden operar en un node únic. Actualment, s'estima que hi ha entre 3.000-4.000 nodes individuals, per tant 10.000 es una estimació conservadora per a la post fusió):

`1,44 kWh d'ús diari * 10.000 nodes de xarxa = 14.400 kWh` al dia. El dia té 86.400 segons, així doncs `14.400 / 86.400 = 0,1667 kWh` per segon.

Si multipliquem això per la quantitat de temps que porta processar 100.000 transaccions: `0,1667 * 4 = 0,667 kWh`.

Això és aproximadament un 0,4% de l'energia utilitzada per Visa per a el mateix nombre de transaccions o una reducció del consum energètic en un factor aproximat del 225 comparat amb la xarxa actual d'Ethereum de prova de treball.

Repetint el càlcul amb el màxim de transaccions per segon produeix 0,1667 kWh per segon que representa al voltant del 0,1% del consum energètic de Visa, o una reducció d'aproximadament 894 vegades.

_Nota: no és del tot exacte fer la comparació basada en nombre de transaccions, ja que l'ús de l'energia a Ethereum està basada en el temps. L'ús de l'energia a Ethereum és el mateix en 1 minut sense detriment de si fa 1 o 1.000 transaccions._

_També hem de tenir en compte que Ethereum no està limitat a simples transaccions financeres sino que és una plataforma completa construïda per a petits contractes i aplicacions descentralitzades._

## Un Ethereum més verd {#green-ethereum}

Mentre que el consum energètic d'Ethereum històricament ha estat substancial, hi ha hagut una gran inversió en temps de desenvolupament i intel·lecte en la transició des d'una validació de bloc més àvida d'energia a una més energèticament eficient. Citant [Bankless](http://podcast.banklesshq.com/), la millor forma de reduir l'energia consumida mitjançant la prova de treball és simplement «desconectant-la», que és l'aproximació que Ethereum s'ha proposat fer.

<InfoBanner emoji=":evergreen_tree:">
  Si creieu que aquestes afirmacions són incorrectes o poden ser més exactes, plantegeu un problema o una PR. Són estimacions fetes per l'equip d'ethereum.org utilitzant informació accessible públicament i l'actual mapa d'Ethereum. Aquestes afirmacions no representen una promesa oficial des de la Fundació Ethereum.
</InfoBanner>

## Llegir-ne més {#further-reading}

- [Mai més el poder d'un país](https://blog.ethereum.org/2021/05/18/country-power-no-more/)–_Carl Beekhuizen, 18 de maig de 2021_
- [Consum energètic d'Ethereum](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)
- [Emissions d'Ethereum: una estimació integral](https://kylemcdonald.github.io/ethereum-emissions/)_ Kyle McDonald_
- [Índex de consum energètic d'Ethereum](https://digiconomist.net/ethereum-energy-consumption/) – _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) — *[@InsideTheSim](https://twitter.com/InsideTheSim)*

## Temes relacionats {#related-topics}

- [La visió d'Ethereum](/roadmap/vision/)
- [La Cadena de Balisa](/roadmap/beacon-chain)
- [La Fusió](/roadmap/merge/)
- [Fragmentació](/roadmap/beacon-chain/)

### Notes a peu de pàgina i fonts {#footnotes-and-sources}

#### 1. Consum energètic de la prova de treball d'Ethereum {#fn-1}

[Consum energètic per país. Ethereum (TWh anual)](https://digiconomist.net/ethereum-energy-consumption)

#### 2. Consum energètic de Visa {#fn-2}

[Consum energètic mitjà per transacció de la xarxa Bitcoin comparat amb la xarxa VISA durant el 2020, Statista](https://www.statista.com/statistics/881541/bitcoin-energy-consumption-transaction-comparison-visa/)

[Informe financer de Visa del quart trimestre de 2020](https://s1.q4cdn.com/050606653/files/doc_financials/2020/q4/Visa-Inc.-Q4-2020-Operational-Performance-Data.pdf)
