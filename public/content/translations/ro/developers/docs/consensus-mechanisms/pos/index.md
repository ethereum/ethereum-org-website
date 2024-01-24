---
title: Dovada-mizei (PoS)
description: O explicație a protocolului de consens „dovada-mizei” și a rolului său în Ethereum.
lang: ro
incomplete: true
---

Ethereum trece de la [dovada-muncii (PoW)](/developers/docs/consensus-mechanisms/pow/) la un mecanism de consens numit dovada-mizei (PoS). Acest lucru a fost prevăzut dintotdeauna, deoarece o parte fundamentală a strategiei comunității este de a scala Ethereum prin [actualizări](/roadmap/). Cu toate acestea, realizarea corectă a PoS este o mare provocare tehnică și nu la fel de simplă ca utilizarea PoW pentru a se ajunge la consens pe întreaga rețea.

## Condiții prealabile {#prerequisites}

Pentru a înțelege mai bine această pagină, văvrecomandăm să citiți mai întâi despre [mecanismele de consens](/developers/docs/consensus-mechanisms/).

## Ce este dovada-mizei (PoS)? {#what-is-pos}

Dovada-mizei este un tip de [mecanism de consens](/developers/docs/consensus-mechanisms/) utilizat de rețelele blockchain pentru a obține un consens distribuit.

Necesită ca utilizatorii să mizeze ETH pentru a deveni validatori în rețea. Validatorii sunt responsabili pentru același lucru ca și miner-ii din [dovada-muncii](/developers/docs/consensus-mechanisms/pow/): să comande tranzacții și să creeze blocuri noi, astfel încât toate nodurile să fie de acord cu starea rețelei.

Dovada-mizei aduce o serie de îmbunătățiri ale sistemului dovezii-muncii:

- eficiență energetică mai bună – nu trebuie utilizată multă energie pentru minarea blocurilor
- bariere mai mici la intrare, cerințe hardware reduse – nu aveți nevoie de hardware super performant pentru a avea o șansă de a crea blocuri noi
- imunitate mai puternică la centralizare – dovada-mizei ar trebui să conducă la mai multe noduri în rețea
- o compatibilitate mai mare pentru [lanțurile de fragmente](/roadmap/danksharding/) – o actualizare esențială în scalarea rețelei Ethereum

## Dovada-mizei, mizarea și validatorii {#pos-staking-validators}

Dovada-mizei este mecanismul de bază care activează validatorii la primirea unei mize suficiente. În Ethereum va trebui ca utilizatorii să mizeze 32ETH pentru a deveni validatori. Validatorii sunt aleși aleatoriu pentru a crea blocuri și sunt responsabili de verificarea și confirmarea blocurilor pe care nu le creează. Miza unui utilizator este utilizată și ca o modalitate de a stimula un comportament bun al validatorului. De exemplu, un utilizator își poate pierde o parte din miză din motive precum trecerea off-line (eșecul validării) sau întreaga miză din cauza coluziunii deliberate.

## Cum funcționează dovada-mizei Ethereum? {#how-does-pos-work}

Spre deosebire de dovada-muncii, validatorii nu trebuie să utilizeze o cantitate mare de putere de calcul, deoarece sunt selectați aleatoriu și nu concurează. Nu trebuie să mineze blocuri, ci trebuie doar să creeze blocuri atunci când sunt aleși și să valideze blocurile propuse atunci când nu sunt. Această validare este cunoscută sub numele de atestare. Puteți considera atestarea ca și cum ați spune „mi se pare bun acest bloc”. Validatorii primesc recompense pentru propunerea de blocuri noi și pentru atestarea celor pe care le-au văzut.

Dacă atestați blocuri rău intenționate, veți pierde miza.

### Lanțul Beacon {#the-beacon-chain}

Când Ethereum va înlocui dovada-muncii (PoW) cu dovada-mizei (PoS), se va adăuga o complexitate numită [lanțuri de fragmente](/roadmap/danksharding/). Acestea sunt blockchain-uri separate care vor avea nevoie de validatori pentru a procesa tranzacțiile și a crea noi blocuri. Se prevede să avem 64 de lanțuri de fragmente și toate au nevoie de o înțelegere comună a stării rețelei. Din acest motiv este necesară o coordonare suplimentară și va fi realizată de [lanțul beacon](/roadmap/beacon-chain/).

Lanțul beacon primește informații de stare de la fragmente și le face disponibile altor fragmente, astfel încât rețeaua să poată rămâne sincronizată. Lanțul beacon va gestiona și validatorii, de la înregistrarea depozitelor de miză ale acestora până la emiterea recompenselor și a penalităților.

Iată cum funcționează acest proces.

### Cum funcționează validarea {#how-does-validation-work}

Atunci când trimiteți o tranzacție pe un fragment, un validator va fi responsabil de adăugarea tranzacției dvs. la un bloc de fragmente. Validatorii sunt aleși algoritmic de lanțul beacon ca să propună noi blocuri.

#### Atestare {#attestation}

Dacă un validator nu este ales să propună un nou bloc de fragmente, va trebui să ateste propunerea altui validator și să confirme că totul se prezintă cum trebuie. Ceea ce se înregistrează în lanțul beacon nu este tranzacția în sine, ci atestarea.

Cel puțin 128 de validatori sunt obligați să ateste fiecare bloc de fragmente – acest lucru este cunoscut sub numele de „comitet”.

Comitetul are un interval de timp în care să propună și să valideze un bloc de fragmente. Acesta este cunoscut sub numele de „slot”. Pe fiecare slot este creat un singur bloc valid, iar în fiecare „epocă” există 32 de sloturi. După fiecare epocă, comitetul este desființat și re-format cu participanți diferiți aleși aleatoriu. Aceasta ajută la menținerea fragmentelor în securitate față de comitetele de actori răi.

#### Crosslinkuri {#rewards-and-penalties}

Odată ce o nouă propunere de bloc de fragmente are suficiente atestări, se creează un crosslink care confirmă includerea blocului și a tranzacției dvs. în lanțul beacon.

Odată ce există un crosslink, validatorul care a propus blocul își primește recompensa.

#### Finalitate {#finality}

În rețelele distribuite, o tranzacție are „finalitate” atunci când face parte dintr-un bloc care nu se poate modifica.

Pentru a face acest lucru în dovada-mizei PoS, Casper, un protocol de finalitate, face ca validatorii să cadă de acord asupra stării unui bloc la anumite puncte de control. Atâta timp cât 2/3 din validatori sunt de acord, blocul este finalizat. Validatorii își vor pierde întreaga miză dacă vor încerca să anuleze această finalitate mai târziu printr-un atac de 51%.

După cum spunea Vlad Zamfir, acest lucru este ca un miner care participă la un atac de 51%, al cărui hardware este distrus imediat.

## Dovada-mizei și securitatea {#pos-and-security}

Amenințarea unui [atac de 51%](https://www.investopedia.com/terms/1/51-attack.asp) încă există în dovada-mizei, dar acesta este și mai riscant pentru atacatori. Pentru a face acest lucru, va trebui să controlați 51% din tot ETH-ul mizat în rețea. Nu numai că sunt mulți bani, dar probabil ar provoca scăderea valorii ETH-ului. Există foarte puține stimulente pentru a distruge valoarea unei monede în care dețineți o miză majoritară. Există stimulente mai puternice pentru a menține rețeaua în securitate și sănătoasă.

Penalizările mizei, ejecțiile, și alte sancțiuni, coordonate de lanțul beacon, vor exista pentru a preveni alte acte de comportament malițios. De asemenea, validatorii vor fi responsabili de semnalarea acestor incidente.

## Avantaje și dezavantaje {#pros-and-cons}

| Avantaje                                                                                                                                                                                                                                                                                                             | Dezavantaje                                                                                              |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Mizarea vă facilitează rularea unui nod. Nu necesită investiții enorme în hardware sau energie, iar dacă nu aveți suficient ETH pentru a miza, vă puteți alătura unor grupuri de mizare.                                                                                                                             | Dovada-mizei (PoS) este încă la început și este mai puțin testată în bătălie față de dovada-muncii (PoW) |
| Mizarea este mai descentralizată. Permite o participare sporită și mai multe noduri nu înseamnă creșterea procentului rentabilității, așa cum se întâmplă în cazul minării.                                                                                                                                          |                                                                                                          |
| Mizarea permite o fragmentare securizată. Lanțurile de fragmente îi permit lui Ethereum să creeze mai multe blocuri în același timp, crescând randamentul tranzacției. Fragmentarea rețelei într-un sistem bazat pe dovada-muncii ar reduce pur și simplu puterea necesară pentru a compromite o porțiune a rețelei. |                                                                                                          |

## Referințe suplimentare {#further-reading}

- [Întrebări frecvente despre Dovada-mizei](https://vitalik.ca/general/2017/12/31/pos_faq.html) _Vitalik Buterin_
- [Ce este Dovada-mizei](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [Ce este Dovada-mizei și de ce este importantă](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) _Vitalik Buterin_
- [Explicatorul lanțului Beacon Ethereum 2.0 pe care trebuie să îl citiți mai întâi](https://ethos.dev/beacon-chain/) _Ethos.dev_
- [De ce Dovada-mizei (Nov 2020)](https://vitalik.ca/general/2020/11/06/pos2020.html) _VitaIik Buterin_
- [Dovada-mizei: Cum am învățat să ador subiectivitatea slabă](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/) _Vitalik Buterin_
- [Filosofia conceperii Dovezii-mizei](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) _Vitalik Buterin_

## Subiecte corelate {#related-topics}

- [Dovada-muncii](/developers/docs/consensus-mechanisms/pow/)
