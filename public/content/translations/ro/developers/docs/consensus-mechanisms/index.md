---
title: Mecanisme de consens
description: O explicație a protocoalelor de consens în sistemele distribuite și a rolului pe care acestea îl joacă în Ethereum.
lang: ro
incomplete: true
---

În situaţia blockchain-urilor precum Ethereum, care sunt în esență baze de date distribuite, nodurile rețelei trebuie să poată ajunge la un acord cu privire la starea actuală a sistemului. Acest acord se realizează cu ajutorul mecanismelor de consens.

Chiar dacă mecanismele de consens nu sunt direct legate de construirea unei aplicaţii descentralizate dapp, înțelegerea lor va lămuri concepte importante pentru dvs. și pentru satisfacţia utilizatorilor dvs., cum ar fi prețul gazului și durata tranzacțiilor.

## Condiții prealabile {#prerequisites}

Pentru a înțelege mai bine această pagină, vă recomandăm să citiţi mai întâi [introducerea despre Ethereum](/developers/docs/intro-to-ethereum/).

## Ce este consensul? {#what-is-consensus}

Prin consens înțelegem că s-a ajuns la un acord general. Să spunem că un grup de persoane merge la cinema. Dacă toți sunt de acord cu filmul propus, atunci se ajunge la un consens. În cazul contrar, probabil că grupul se va despărți.

În ceea ce privește blockchain-ul, ajungerea la consens înseamnă că cel puțin 51% dintre nodurile din rețea sunt de acord cu următoarea stare globală a rețelei.

## Ce este un mecanism de consens? {#what-is-a-consensus-mechanism}

Mecanismele de consens (cunoscute și sub numele de protocoale de consens sau algoritmi de consens) permit sistemelor distribuite (rețele de computere) să colaboreze și să-şi păstreze securitatea.

Aceste mecanisme au fost utilizate timp de decenii pentru a stabili consensul între nodurile bazei de date, serverele de aplicații și alte infrastructuri de întreprinderi. În ultimii ani au fost inventate noi mecanisme de consens, care să permită sistemelor cripto-economice cum este Ethereum să se pună de acord asupra stării rețelei.

Un mecanism de consens într-un sistem cripto-economic ajută şi la prevenirea anumitor tipuri de atacuri economice. În teorie, un atacator poate compromite consensul controlând 51% din rețea. Mecanismele de consens sunt concepute pentru a face imposibil de realizat acest „atac de 51%”. Sunt elaborate diverse mecanisme pentru a rezolva această problemă de securitate în diferite moduri.

<YouTube id="dylgwcPH4EA" />

## Tipuri de mecanisme de consens {#types-of-consensus-mechanisms}

### Dovada-muncii (proof-of-work) {#proof-of-work}

Ethereum, ca și Bitcoin, folosește în prezent un protocol de consens numit **dovada-muncii (PoW)**.

#### Crearea blocului {#pow-block-creation}

Dovada-muncii este făcută de [miner-i](/developers/docs/consensus-mechanisms/pow/mining/), care concurează pentru a crea blocuri noi pline de tranzacții procesate. Câștigătorul împarte noul bloc cu restul rețelei și câștigă ceva ETH proaspăt emis. Cursa este câștigată de acela al cărui computer poate rezolva cel mai repede un puzzle matematic – acesta produce linkul criptografic între blocul curent și blocul anterior. Rezolvarea acestui puzzle este munca din „dovada-muncii ”.

#### Securitatea {#pow-security}

Este păstrată securitatea reţelei datorită faptului că aveţi nevoie de 51% din puterea de calcul a rețelei pentru a frauda lanțul. Aceasta ar necesita investiții uriașe în echipamente și energie; probabil că veți cheltui mai mult decât veți câștiga.

Mai multe despre [dovada-muncii](/developers/docs/consensus-mechanisms/pow/)

### Dovada-mizei (proof-of-stake) {#proof-of-stake}

Ethereum are în vedere de a se actualiza la un protocol de consens prin **dovada-mizei (PoS) **.

#### Crearea blocului {#pos-block-creation}

Dovada-mizei este făcută de validatorii care au mizat ETH pentru a participa la sistem. Un validator este ales aleatoriu pentru a crea blocuri noi, a le partaja cu rețeaua și a câștiga recompense. În loc de a necesita efectuarea unei intense munci de calcul, trebuie pur și simplu să mizaţi ETH în rețea. Aceasta este ceea ce stimulează un comportament sănătos al rețelei.

#### Securitatea {#pos-security}

Un sistem bazat pe dovada-mizei este menținut în siguranță prin faptul că aţi avea nevoie de 51% din totalul de ETH mizat pentru a frauda lanțul. Și că miza dvs. este penalizată pentru un comportament rău intenționat.

Mai multe despre [dovada-mizei](/developers/docs/consensus-mechanisms/pos/)

### Un ghid vizual {#types-of-consensus-video}

Vizionați un videoclip despre diferitele tipuri de mecanisme de consens utilizate pe Ethereum:

<YouTube id="ojxfbN78WFQ" />

### Rezistența Sybil & alegerea lanțului {#sybil-chain}

Din punct de vedere tehnic, dovada-muncii (proof-of-work) și dovada-mizei (proof-of-stake) nu sunt protocoale de consens în sine, dar sunt deseori menționate în acest fel pentru simplificare. Acestea sunt de fapt, mecanisme de rezistență Sybil și selectori de autori de blocuri; ele reprezintă o modalitate de a decide cine este autorul ultimului bloc. Mecanismul de rezistență Sybil combinat cu o regulă de selecție a lanțului este ceea ce constituie adevăratul mecanism de consens.

**Rezistența Sybil** măsoară cât de rezistent este un protocol la un [atac Sybil](https://wikipedia.org/wiki/Sybil_attack). Atacurile Sybil se produc atunci când un singur utilizator sau grup pretinde a fi mai mulți utilizatori. Rezistența la acest tip de atac este esențială pentru un blockchain descentralizat și permite miner-ilor și validatorilor să fie recompensați în mod egal, în funcție de resursele investite. Dovada-muncii (PoW) și dovada-mizei (PoS) protejează împotriva acestui lucru, obligând utilizatorii să consume multă energie sau să depună multe garanții. Aceste protecții reprezintă un factor economic disuasiv împotriva atacurilor Sybil.

Este folosită o **regulă de selecție a lanțului** pentru a decide care lanț este lanțul „corect”. Ethereum și Bitcoin folosesc în prezent regula „lanțului celui mai lung”, adică cel mai lung blockchain va fi cel pe care restul nodurilor îl vor accepta drept valid și cu care vor lucra. În cazul lanțurilor bazate pe dovada-muncii, cel mai lung lanț este determinat de dificultatea totala cumulată a dovezii-muncii.

Combinația dintre dovada-muncii și regula celui mai lung lanț este cunoscută sub numele de „Consensul Nakamoto”

[Lanțul Beacon](/roadmap/beacon-chain/) folosește un mecanism de consens numit [Gadgetul de finalitate prietenos Casper](https://arxiv.org/abs/1710.09437), care este bazat pe dovada-mizei.

## Referințe suplimentare {#further-reading}

- [Ce este un Algoritm de Consens Blockchain?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [Ce este Consensul Nakamoto? Ghid complet pentru începători](https://blockonomi.com/nakamoto-consensus/)
- [Cum funcționează Casper?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Aflați despre „Securitatea și performanța blockchain-urilor bazate pe dovada-muncii”](https://eprint.iacr.org/2016/555.pdf)

_Cunoașteți o resursă a comunității care v-a ajutat? Editaţi această pagină și adăugaţi-o!_

## Subiecte corelate {#related-topics}

- [Dovada-muncii](/developers/docs/consensus-mechanisms/pow/)
- [Minarea](/developers/docs/consensus-mechanisms/pow/mining/)
- [Dovada-mizei](/developers/docs/consensus-mechanisms/pos/)
