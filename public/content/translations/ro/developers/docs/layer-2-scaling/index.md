---
title: Scalare Nivel 2
description: Prezentarea diferitelor opțiuni de scalare care sunt dezvoltate în prezent de comunitatea Ethereum.
lang: ro
incomplete: true
sidebarDepth: 3
isOutdated: true
---

Nivelul 2 este un termen colectiv pentru soluții concepute pentru a te ajuta la scalarea aplicației prin gestionarea tranzacțiilor din lanțul principal Ethereum (nivelul 1). Viteza de tranzacție suferă atunci când rețeaua este ocupată, ceea ce poate face experiența utilizatorului slabă pentru anumite tipuri de aplicații dapp. Și pe măsură ce rețeaua devine mai aglomerată, prețurile gazului cresc, pe măsură ce expeditorii de tranzacții își propun să se supraliciteze reciproc. Aceasta poate face ca utilizarea Ethereum să fie foarte costisitoare.

## Condiții prealabile {#prerequisites}

Ar trebui să înțelegi bine toate subiectele fundamentale. Implementarea soluțiilor de nivel 2 este avansată, deoarece tehnologia este mai puțin testată în domeniu.

## De ce este necesar nivelul 2? {#why-is-layer-2-needed}

- Unele cazuri de utilizare, cum ar fi jocurile blockchain, nu au sens cu timpul curent de tranzacție
- Utilizarea aplicațiilor blockchain poate fi inutil de costisitoare
- Nicio actualizare a scalabilității nu ar trebui să fie în detrimentul descentralizării securității – nivelul 2 se bazează pe Ethereum.

## Tipuri de soluții pentru Nivelul 2 {#types}

- [Rollup-uri](#rollups)
  - [Rollup-uri ZK](#zk-rollups)
  - [Rollup-uri Optimistic](#optimistic-rollups)
- [Canale de stare](#channels)
- [Plasma](#plasma)
- [Validium](#validium)
- [Sidechain-uri](#sidechains)
- [Soluții hibride](#hybrid-solutions)

Cele mai multe soluții de nivel 2 sunt centrate în jurul unui server sau cluster de servere, fiecare dintre acestea putând fi denumite nod, validator, operator, ordonator, producător de blocuri sau un termen similar. În funcție de implementare, aceste noduri de nivel 2, pot fi rulate de întreprinderi sau entități care le utilizează sau de un operator terț sau de un grup mare de persoane (similar cu rețeaua principală). În general, tranzacțiile sunt transmise la aceste noduri nivel 2 în loc să fie transmise direct la nivelul 1 ([rețeaua principală](/glossary/#mainnet)); instanța nivelului 2 le organizează apoi în grupuri înainte de a le ancora în nivelul 1, după care sunt securizate de nivelul 1 și nu mai pot fi modificate. Detaliile despre modul în care se face acest lucru variază semnificativ între diferite tehnologii de nivel 2 și implementări.

O instanță specifică de nivel 2 poate fi deschisă și partajată de mai multe aplicații sau poate fi implementată de o singură companie și dedicată doar sprijinirii aplicației lor.

## Rollup-uri {#rollups}

Rollup-urile sunt soluții care grupează sau „roll-up” tranzacțiile sidechain într-o singură tranzacție și generează o dovadă criptografică, cunoscută sub numele de SNARK (Succinct Non-Interactive Argument of Knowledge). Numai această dovadă este prezentată lanțului principal.

_Sidechain-urile sunt blockchain-uri independente compatibile cu Ethereum._

Cu alte cuvinte, rollup-urile înseamnă că toate stările și execuția sunt gestionate în sidechain-uri – verificarea semnăturii, executarea contractului etc. Lanțul principal Ethereum (nivelul 1) stochează doar datele despre tranzacții.

Soluțiile rollup necesită resurse-releu care au mizat o obligațiune în contractul rollup. Aceasta îi stimulează să transmită rollup-urile cu exactitate.

**Util pentru:**

- reducerea taxelor pentru utilizatori
- participarea deschisă
- transferarea rapidă al tranzacției

Există două tipuri de pachete cu modele de securitate diferite:

- Cunoștințe zero: rulează calcule în afara lanțului și prezintă o [**dovadă de valabilitate**](/glossary/#validity-proof) lanțului
- Optimist: presupune că tranzacțiile sunt valabile în mod implicit și rulează doar calculul, printr-o [**dovadă de fraudă**](/glossary/#fraud-proof), în cazul unei contestații

### Rollup-uri de „Cunoștințe zero” {#zk-rollups}

Rollup-urile de cunoștințe zero, cunoscute și sub numele de ZK-Rollup-uri, grupează sute de transferuri în afara lanțului într-o singură tranzacție printr-un contract inteligent. Din datele transmise, contractul inteligent poate verifica toate transferurile incluse. Aceasta este cunoscut ca o dovadă de validitate.

Cu un rollup ZK, validarea unui bloc este mai rapidă și mai ieftină, deoarece sunt incluse mai puține date. Nu ai nevoie de toate datele tranzacției pentru a o verifica, ci doar dovada.

Sidechain-ul în care se întâmplă rollup-urile ZK poate fi optimizat pentru a reduce dimensiunea tranzacției. De exemplu, un cont este reprezentat mai degrabă de un index decât de o adresă, care reduce o tranzacție de la 32 de octeți la doar 4 octeți. Tranzacțiile sunt, de asemenea, scrise în Ethereum ca date de apel, reducând gazul.

#### Avantaje și dezavantaje {#zk-pros-and-cons}

| Avantaje                                                                                                                      | Dezavantaje                                                                                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nicio întârziere, deoarece dovezile sunt deja considerate valide atunci când sunt trimise lanțului principal.                 | Limitat la transferuri simple, nu este compatibil cu EVM.                                                                                                                                                                          |
| Mai puțin vulnerabile la atacurile economice la care [Rollup-urile Optimistic](#optimistic-pros-and-cons) pot fi vulnerabile. | Dovezile de validitate necesită un mare număr de calcule – nu merită să fie folosite pentru aplicații cu activitate redusă pe lanț.                                                                                                |
|                                                                                                                               | Timp de [finalitate](/glossary/#finality) mai lent (10-30 min pentru a genera o dovada ZK) (dar mai rapide la finalitate completă, deoarece nu există întârzieri de dispută ca în [rollup-urile Optimistic](#optimistic-rollups)). |

#### Folosește Rollup-uri ZK {#use-zk-rollups}

- [Loopring](https://loopring.org/#/)
- [Starkware](https://starkware.co/)
- [Matter Labs ZKsync](https://matter-labs.io/)
- [Aztec 2.0](https://aztec.network/)

### Rollup-uri Optimistic {#optimistic-rollups}

Rollup-urile Optimistic utilizează un sidechain care se află în paralel cu lanțul principal Ethereum. Ele pot oferi îmbunătățiri în scalabilitate, deoarece nu fac niciun calcul în mod implicit. În schimb, după o tranzacție, ele propun noua stare rețelei principale. Sau „legalizează” tranzacția.

Cu rollup-urile Optimistic, tranzacțiile sunt scrise în lanțul principal Ethereum ca date de apel, optimizându-le în continuare prin reducerea costului gazului.

Deoarece calculul este partea lentă și costisitoare a utilizării Ethereum, rollup-urilor Optimistic pot oferi până la 10-100 de ori îmbunătățiri ale scalabilității în funcție de tranzacție. Acest număr va crește și mai mult odată cu introducerea upgrade-ului Eth2: [lanțurile de fragmente](/roadmap/danksharding). Aceasta se datorează faptului că vor exista mai multe date disponibile în cazul în care o tranzacție este contestată.

#### Contestarea tranzacțiilor {#disputing-transactions}

Rollup-urile Optimistic nu calculează de fapt tranzacția, deci trebuie să existe un mecanism care să asigure că tranzacțiile sunt legitime și nu frauduloase. Aici intervin dovezile de fraudă. Dacă cineva observă o tranzacție frauduloasă, rollup-ul va executa o dovadă de fraudă și va rula calculul tranzacției, utilizând datele de stare disponibile. Aceasta înseamnă că este posibil să ai timpi de așteptare mai lungi pentru confirmarea tranzacției decât un rollup-ZK, deoarece ar putea fi contestat.

![Diagramă care arată ce se întâmplă atunci când are loc o tranzacție frauduloasă într-un rollup Optimist pe Ethereum](../optimistic-rollups/optimistic-rollups.png)

Gazul de care ai nevoie pentru a calcula dovada fraudelor este chiar rambursat. Ben Jones, de la Optimism, descrie sistemul de legături în loc:

_„toți cei care ar putea fi în măsură să ia o măsură pe care tu ar trebui să o dovedești că este frauduloasă pentru a-ți asigura fondurile, trebuie să posteze o garanție. Practic, iei niște ETH și îl blochezi și spui „Hei, promit să spun adevărul”... Dacă nu spun adevărul și se dovedește că am comis fraudă, voi fi penalizat din acești bani. Nu numai că voi fi penalizat din acești bani, dar o parte din ei vor plăti pentru gazul celor care l-au cheltuit făcând dovada fraudei mele_"

Deci, vei fi rambursat pentru dovedirea fraudei.

#### Avantaje și dezavantaje {#optimistic-pros-and-cons}

| Avantaje                                                                                                            | Dezavantaje                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Orice poți face pe nivelul 1 Ethereum, poți face cu rollup-ul Optimistic, deoarece este compatibil EVM și Solidity. | Perioade lungi de așteptare pentru tranzacțiile în lanț datorită potențialelor provocări legate de fraudă.    |
| Toate datele tranzacțiilor sunt stocate pe nivelul 1 al lanțului, ceea ce înseamnă că este sigur și descentralizat. | Potențial vulnerabil la atacuri dacă valoarea într-un rollup Optimist depășește suma garanției unui operator. |

#### Folosește rollup-uri Optimistic {#use-optimistic-rollups}

- [Optimism](https://optimism.io/)
- [Offchain Labs Arbitrum Rollup](https://offchainlabs.com/)
- [Fuel Network](https://fuel.sh/)

## Canale {#channels}

Canalele permit participanților să tranzacționeze de `x` ori în afara lanțului, trimițând doar două tranzacții către rețeaua din lanț. Aceasta permite un transfer de tranzacții extrem de ridicat

**Util pentru**:

- o mulțime de actualizări de stare
- atunci când numărul de participanți este cunoscut în avans
- atunci când participanții sunt întotdeauna disponibili

Participanții trebuie să blocheze o parte din starea Ethereum, ca un depozit ETH, într-un contract multisig. Un contract multisig este un tip de contract care necesită semnarea (și prin urmare, acordul) mai multor chei private pentru executare.

Blocarea stării în acest mod este prima tranzacție și deschide canalul. Participanții pot tranzacționa rapid și liber în afara lanțului. Când interacțiunea este finalizată, este trimisă o tranzacție finală în lanț, care deblochează starea.

### Canale de stare {#state-channels}

Canal de stare tic tac toe:

1. Creează un contract inteligent multisig „Judecător” pe lanțul principal Ethereum care înțelege regulile tic-tac-toe și poate identifica Alice și Bob ca fiind cei doi jucători din jocul nostru. Acest contract deține un premiu de 1 ETH.

2. Apoi, Alice și Bob încep să joace, deschizând canalul de stare. Fiecare mișcare creează o tranzacție în afara lanțului care conține un „nonce”, ceea ce înseamnă că putem spune întotdeauna mai târziu în ce ordine s-au întâmplat mișcările.

3. Când există un câștigător, acesta închid canalul prin trimiterea stării finale (de exemplu, o listă de tranzacții) la contractul Judecător, plătind doar o singură taxă de tranzacție. Judecătorul se asigură că această „stare finală” este semnată de ambele părți și așteaptă un timp pentru a se asigura că nimeni nu poate contesta în mod legitim rezultatul, apoi plătește premiul de 1 ETH lui Alice.

În prezent există două tipuri de canale:

- Canale de stare – așa cum am descris mai sus
- Canale de plată – canale de stare simplificate care se ocupă doar de plăți. Permit transferuri în afara lanțului între doi participanți, atâta timp cât suma netă a transferurilor lor nu depășește tokenurile depuse.

#### Avantaje și dezavantaje {#channels-pros-and-cons}

| Avantaje                                                                                            | Dezavantaje                                                                                                                                            |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Retragere/soluționare instantanee pe lanțul principal (dacă ambele părți ale unui canal cooperează) | Timp și costuri pentru a configura și stabili un canal - nu sunt atât de bune pentru tranzacțiile ocazionale unice între utilizatori arbitrari.        |
| Este posibil un debit extrem de ridicat                                                             | Trebuie să urmărești periodic rețeaua (cerința „liveness”) sau să delegi această responsabilitate altcuiva pentru a-ți asigura securitatea fondurilor. |
| Cel mai mic cost pe tranzacție - bun pentru microplăți în flux                                      | Trebuie să blochezi fonduri în canale de plată deschise                                                                                                |
|                                                                                                     | Nu acceptă participarea deschisă                                                                                                                       |

#### Folosește canale de Stare {#use-state-channels}

- [Connext](https://connext.network/)
- [Raiden](https://raiden.network/)
- [Perun](https://perun.network/)
- [Statechannels.org](https://statechannels.org/)

## Plasma {#plasma}

Un lanț „plasma” este un blockchain separat care este ancorat pe lanțul principal Ethereum și utilizează dovezi de fraudă (cum ar fi rollup-urile [Optimistic](#optimistic-rollups)) pentru a arbitra disputele.

| Avantaje                                                                                                                                                             | Dezavantaje                                                                                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Randament ridicat, cost redus pe tranzacție.                                                                                                                         | Nu acceptă calculul general. Numai transferurile de bază, swap-urile și alte câteva tipuri de tranzacții sunt acceptate prin logica predicată.                                                     |
| Bun pentru tranzacțiile între utilizatori arbitrari (fără cheltuieli indirecte pentru fiecare pereche de utilizatori dacă ambele sunt stabilite pe lanțul de plasmă) | Trebuie să urmărești periodic rețeaua (cerința „liveness”) sau să delegi această responsabilitate altcuiva pentru a-ți asigura securitatea fondurilor.                                             |
|                                                                                                                                                                      | Se bazează pe unul sau mai mulți operatori pentru a stoca date și a le furniza la cerere.                                                                                                          |
|                                                                                                                                                                      | Retragerile sunt întârziate cu câteva zile pentru a permite provocări. Pentru activele fungibile acest lucru poate fi atenuat de furnizorii de lichidități, dar există un cost de capital asociat. |

### Folosește Plasma {#use-plasma}

- [OMG Network](https://omg.network/)
- [Matic Network](https://matic.network/)
- [Gluon](https://gluon.network/)
- [LeapDAO](https://ipfs.leapdao.org/)

## Validium {#validium}

Folosește dovezi de validitate, cum ar fi [rollup-ZK,](#zk-rollups) dar datele nu sunt stocate pe nivelul 1 al lanțului principal al Ethereum. Aceasta poate duce la 10k tranzacții pe secundă pe lanțul validium și lanțuri multiple pot fi rulate în paralel.

| Avantaje                                                                                                                              | Dezavantaje                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fără întârziere de retragere (fără latență tx în-lanț/între-lanțuri); în consecință, o mai mare eficiență a capitalului.              | Suport limitat pentru calcule generale/contracte inteligente; necesită limbaje specializate.                                                                     |
| Nu este vulnerabil la anumite atacuri economice cu care se confruntă sistemele bazate pe dovada fraudei în aplicații de mare valoare. | Putere de calcul ridicată necesară pentru a genera probe ZK; nu sunt eficiente din punct de vedere al costurilor pentru aplicațiile cu debit redus.              |
|                                                                                                                                       | Timp de finalitate subiectivă mai lent (10-30 min pentru a genera o dovadă ZK) (dar mai rapid la finalitate completă, deoarece nu există întârziere în dispută). |

### Folosește Validium {#use-validium}

- [Starkware](https://starkware.co/)
- [Matter Labs zkPorter](https://matter-labs.io/)
- [Loopring](https://loopring.org/#/)

## Sidechain-uri {#sidechains}

Un sidechain este un blockchain separat care rulează în paralel cu rețeaua principală și funcționează independent. Are propriul algoritm de consens ([Proba autorității](https://wikipedia.org/wiki/Proof_of_authority), [Dovada mizei delegată](https://en.bitcoinwiki.org/wiki/DPoS), [Toleranță la erori Byzantine](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained) și așa mai departe). Este conectat la lanțul principal printr-un pod bidirecțional.

| Avantaje                                        | Dezavantaje                                                                                                              |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Tehnologie stabilită.                           | Mai puțin descentralizate.                                                                                               |
| Acceptă calculul general, compatibilitatea EVM. | Utilizează un mecanism de consens separat. Nu este asigurat de nivelul1 (deci punct de vedere tehnic nu este nivelul 2). |
|                                                 | Un minim de validatori sidechain pot comite fraudă.                                                                      |

### Folosește Sidechain-uri {#use-sidechains}

- [Skale](https://skale.network/)
- [POA Network](https://www.poa.network/)

## Soluții hibride {#hybrid-solutions}

Combină cele mai bune părți ale mai multor tehnologii de nivel 2 și pot oferi compromisuri configurabile.

### Folosește soluții Hybrid {#use-hybrid-solutions}

- [Celer](https://www.celer.network/)

## Referințe suplimentare {#further-reading}

- [Validium And The Layer 2 Two-By-Two — Issue No. 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [Evaluating Ethereum layer 2 Scaling Solutions: A Comparison Framework](https://blog.matter-labs.io/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Adding Hybrid PoS-Rollup Sidechain to Celer’s Coherent Layer-2 Platform on Ethereum](https://medium.com/celer-network/adding-hybrid-pos-rollup-sidechain-to-celers-coherent-layer-2-platform-d1d3067fe593)
- [Zero-Knowledge Blockchain Scalability](https://ethworks.io/assets/download/zero-knowledge-blockchain-scaling-ethworks.pdf)

**Canale de stare**

- [Making Sense of Ethereum’s Layer 2 Scaling Solutions: State Channels, Plasma, and Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, 12 februarie 2018_
- [State Channels - an explanation](https://www.jeffcoleman.ca/state-channels/) _5 noiembrie 2015 - Jeff Coleman_
- [Basics of State Channels](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _District0x_

**Canale de plată**

**Rollup-uri ZK**

**Rollup-uri Optimistic**

- [OVM Deep Dive](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)

**Sidechain-uri**

- [Scaling Ethereum Dapps through Sidechains](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _8 februarie 2018 - Georgios Konstantopoulos_
