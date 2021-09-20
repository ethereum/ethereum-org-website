---
title: Dovada mizei (PoS)
description: O explicație a protocolului de consens „dovada mizei” și a rolului său în Ethereum.
lang: ro
sidebar: true
incomplete: true
---

Ethereum se trece de la [dovada muncii (PoW)](/developers/docs/consensus-mechanisms/pow/) la un mecanism de consens numit dovada mizei (PoS). Acesta a fost întotdeauna planul, deoarece este un element cheie în strategia comunității de a scala Ethereum prin [upgrade-urile Eth2](/eth2/). Cu toate acestea, realizarea corectă a PoS este o mare provocare tehnică și nu la fel de simplă ca utilizarea PoW pentru a ajunge la un consens în întreaga rețea.

## Condiții prealabile {#prerequisites}

Pentru a înțelege mai bine această pagină, îți recomandăm să citești mai întâi [mecanisme de consens](/developers/docs/consensus-mechanisms/).

## Ce este dovada mizei (PoS)? {#what-is-pos}

Dovada mizei este un tip de [mecanism de consens](/developers/docs/consensus-mechanisms/) utilizat de rețelele blockchain pentru a obține un consens distribuit.

Este nevoie ca utilizatorii să mizeze ETH pentru a deveni validatori în rețea. Validatorii sunt responsabili pentru același lucru ca și minerii din [dovada muncii](/developers/docs/consensus-mechanisms/pow/): comandarea tranzacțiilor și crearea de blocuri noi, astfel încât toate nodurile să fie de acord cu starea rețelei.

Dovada mizei PoS vine cu o serie de îmbunătățiri ale sistemului dovezii muncii:

- eficiență energetică mai bună – nu trebuie utilizată multă energie pentru mineritul blocurilor
- bariere mai mici la intrare, cerințe hardware reduse – nu ai nevoie de hardware super performant pentru a avea o șansă de a crea blocuri noi
- imunitate mai puternică la centralizare – dovada mizei (PoS) ar trebui să conducă la mai multe noduri în rețea
- suport mai puternic pentru lanțurile de fragmente – un upgrade cheie în scalarea rețelei Ethereum

## Dovada mizei (PoS), mizarea și validatorii {#pos-staking-validators}

Dovada mizei este mecanismul de bază care activează validatorii la primirea unei mize suficiente. Pentru Ethereum, utilizatorii vor trebui să mizeze 32ETH pentru a deveni validatori. Validatorii sunt aleși aleatoriu pentru a crea blocuri și sunt responsabili de verificarea și confirmarea blocurilor pe care nu le creează. Miza unui utilizator este, de asemenea, utilizată ca o modalitate de a stimula un comportament bun al validatorului. De exemplu, un utilizator își poate pierde o parte din miză pentru lucruri precum trecerea off-line (eșecul validării) sau întreaga miză pentru coluziune deliberată.

## Cum funcționează dovada mizei Ethereum? {#how-does-pos-work}

Spre deosebire de dovada muncii, validatorii nu trebuie să utilizeze o cantitate mare de putere de calcul, deoarece sunt selectați aleatoriu și nu concurează. Nu trebuie să extragă blocuri, ci trebuie doar să creeze blocuri atunci când sunt aleși și să valideze blocurile propuse atunci când nu sunt. Această validare este cunoscută sub numele de atestare. Te poți gândi la atestare ca și cum ai spune „acest bloc arată bine pentru mine”. Validatorii primesc recompense pentru propunerea de blocuri noi și pentru atestarea celor pe care le-au văzut.

Dacă atești blocuri rău intenționate, vei pierde miza.

### Lanțul Beacon {#the-beacon-chain}

Când Ethereum va înlocui dovada muncii (PoW) cu dovada mizei (PoS), se va adăuga o complexitate numită [lanțuri de fragmente](/eth2/shard-chains/). Acestea sunt blockchain-uri separate care vor avea nevoie de validatori pentru a procesa tranzacțiile și a crea noi blocuri. Planul este de a avea 64 de lanțuri de fragmente și toate au nevoie de o înțelegere comună a stării rețelei. Așadar, este necesară o coordonare suplimentară și acest lucru va fi realizat de [lanțul Beacon](/eth2/beacon-chain/).

Lanțul Beacon primește informații de stare de la fragmente și le face disponibile altor fragmente, astfel încât rețeaua să poată rămâne sincronizată. Lanțul Beacon va gestiona, de asemenea, validatorii, de la înregistrarea depozitelor de miză până la emiterea recompenselor și penalităților.

Iată cum funcționează acest proces.

### Cum funcționează validarea {#how-does-validation-work}

Când trimiți o tranzacție pe un fragment, un validator va fi responsabil pentru adăugarea tranzacției tale într-un bloc de fragmente. Validatorii sunt aleși algoritmic de lanțul Beacon pentru a propune noi blocuri.

#### Atestare {#attestation}

Dacă un validator nu este ales să propună un nou bloc de fragmente, va trebui să ateste propunerea altui validator și să confirme că totul arată așa cum ar trebui. Lanțul Beacon înregistrează atestarea, mai degrabă decât tranzacția în sine.

Cel puțin 128 de validatori sunt obligați să ateste fiecare bloc de fragmente – acest lucru este cunoscut sub numele de comitet – „committee”.

Comitetul are un interval de timp în care să propună și să valideze un bloc de fragmente. Acesta este cunoscut sub numele de „slot”. Un singur bloc valid este creat pe slot. Există 32 de sloturi într-o epocă „epoch”. După fiecare epocă, comitetul este desființat și reformat cu participanți diferiți aleși aleatoriu. Aceasta ajută la menținerea fragmentelor în siguranță împotriva comitetelor de actori răi.

#### Legături încrucișate {#rewards-and-penalties}

Odată ce o nouă propunere de bloc de fragmente are suficiente atestări, se creează o legătură încrucișată care confirmă includerea blocului și a tranzacției tale în lanțul Beacon.

Odată ce există o legătură încrucișată, validatorul care a propus blocul își primește recompensa lui.

#### Finalitate {#finality}

În rețelele distribuite, o tranzacție are „finalitate” atunci când face parte dintr-un bloc care nu se poate modifica.

Pentru a face acest lucru în dovada mizei PoS, Casper, un protocol de finalitate, face ca validatorii să cadă de acord asupra stării unui bloc la anumite puncte de control. Atâta timp cât 2/3 din validatori sunt de acord, blocul este finalizat. Validatorii își vor pierde întreaga miză dacă vor încerca să anuleze această finalitate mai târziu printr-un atac de 51%.

După cum a spus Vlad Zamfir, acest lucru este ca un miner care participă la un atac de 51%, al cărui hardware este distrus imediat.

## Dovada mizei și securitatea {#pos-and-security}

Amenințarea unui [atac 51%](https://www.investopedia.com/terms/1/51-attack.asp) încă există în dovada mizei, dar este și mai riscant pentru atacatori. Pentru a face acest lucru, va trebui să controlezi 51% din tot ETH-ul mizat în rețea. Nu numai că sunt mulți bani, dar probabil ar provoca scăderea valorii ETH. Există foarte puține stimulente pentru a distruge valoarea unei monede în care deții o participație majoritară. Există stimulente mai puternice pentru a menține rețeaua sigură și sănătoasă.

Penalizări de miză, ejectării, și alte sancțiuni, coordonate de lanțul Beacon, vor exista pentru a preveni alte acte de comportament malițios. De asemenea, validatorii vor fi responsabili pentru semnalarea acestor incidente.

## Avantaje și dezavantaje {#pros-and-cons}

| Avantaje                                                                                                                                                                                                                                                                                                                             | Dezavantaje                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Mizarea vă facilitează rularea unui nod. Nu necesită investiții uriașe în hardware sau energie. Și dacă nu ai suficient ETH pentru a miza, te poți alătura grupurilor de mizare.                                                                                                                                                     | Dovada mizei (PoS) este încă la început și este mai puțin testată în bătălie, în comparație cu dovada muncii (PoW) |
| Mizarea este mai descentralizată. Permite o participare sporită și mai multe noduri nu înseamnă creșterea procentului rentabilității, așa cum se întâmplă în cazul mineritului.                                                                                                                                                      |                                                                                                                    |
| Mizarea permite o partajare securizată. Lanțurile de fragmente permit Ethereum să creeze mai multe blocuri în același timp, crescând randamentul tranzacției. Fragmentarea rețelei într-un sistem de dovadă a muncii ar reduce pur și simplu puterea necesară pentru a compromite o porțiune a rețelei și ar face-o mai vulnerabilă. |                                                                                                                    |

## Referințe suplimentare {#further-reading}

- [Ce este dovada mizei](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [Explicatorul lanțului Beacon Ethereum 2.0 pe care trebuie să-l citești mai întâi](https://ethos.dev/beacon-chain/) _Ethos.dev_

## Subiecte corelate {#related-topics}

- [Dovada muncii](/developers/docs/consensus-mechanisms/pow/)
