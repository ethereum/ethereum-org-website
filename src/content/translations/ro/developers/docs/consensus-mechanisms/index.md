---
title: Mecanisme de consens
description: O explicație a protocoalelor de consens în sistemele distribuite și a rolului pe care acestea îl joacă în Ethereum.
lang: ro
sidebar: true
incomplete: true
---

Când vine vorba de blockchain-uri precum Ethereum, care sunt în esență baze de date distribuite, nodurile rețelei trebuie să poată ajunge la un acord cu privire la starea actuală a sistemului. Aceasta se realizează cu ajutorul mecanismelor de consens.

Deși nu face parte din construirea unei aplicații dapp, înțelegerea mecanismelor de consens te va ajuta la explicarea unor lucruri relevante pentru tine și utilizatorii tăi, cum ar fi prețurile gazului și timpul de tranzacționare.

## Condiții prealabile {#prerequisites}

Pentru a înțelege mai bine această pagină, îți recomandăm să citești mai întâi [introducerea în Ethereum](/developers/docs/intro-to-ethereum/).

## Ce este un mecanism de consens? {#what-is-a-consensus-mechanism}

Mecanismele de consens (cunoscute și sub numele de protocoale de consens sau algoritmi de consens) permit sistemelor distribuite (rețele de computere) să lucreze împreună și să rămână în siguranță.

Timp de decenii, aceste mecanisme au fost utilizate pentru a stabili consens între nodurile bazei de date, serverele de aplicații și alte infrastructuri de întreprindere. În ultimii ani, au fost inventate noi protocoale de consens care să permită sistemelor cripto-economice, precum Ethereum, să cadă de acord asupra stării rețelei.

Un mecanism de consens într-un sistem cripto-economic ajută, de asemenea, la prevenirea anumitor tipuri de atacuri economice. În teorie, un atacator poate compromite consensul, controlând 51% din rețea. Mecanismele de consens sunt concepute pentru a face imposibil de realizat acest „atac de 51%”. Diferite mecanisme sunt concepute pentru a rezolva diferit această problemă de securitate.

## Tipuri de mecanisme de consens {#types-of-consensus-mechanisms}

### Dovada muncii {#proof-of-work}

Ethereum, ca și Bitcoin, folosește în prezent un protocol consensual de dovadă a muncii (PoW).

#### Crearea blocului {#pow-block-creation}

Dovada muncii este făcută de [mineri](/developers/docs/consensus-mechanisms/pow/mining/), care concurează pentru a crea blocuri noi pline de tranzacții procesate. Câștigătorul împarte noul bloc cu restul rețelei și câștigă ceva ETH proaspăt bătut. Cursa este câștigată de computerul persoanei care poate rezolva cel mai rapid un puzzle matematic – aceasta produce linkul criptografic dintre blocul curent și blocul care a trecut înainte. Rezolvarea acestui puzzle, este ceea ce numim muncă în „dovada muncii”.

#### Securitate {#pow-security}

Rețeaua este păstrată în siguranță datorită faptului că ai nevoie de 51% din puterea de calcul a rețelei pentru a frauda lanțul. Aceasta ar necesita investiții uriașe în echipament și energie, probabil că vei cheltui mai mult decât ai câștiga.

Mai multe despre [dovada muncii (PoW)](/developers/docs/consensus-mechanisms/pow/)

### Dovada mizei {#proof-of-stake}

Ethereum are planuri de a face upgrade la un protocol de consens [dovada mizei (PoS) ](/developers/docs/consensus-mechanisms/pos/).

#### Crearea blocului {#pos-block-creation}

Dovada mizei este făcută de validatori care au mizat ETH pentru a participa la sistem. Un validator este ales aleatoriu pentru a crea blocuri noi, pentru a le partaja cu rețeaua și pentru a câștiga recompense. În loc de a fi nevoie de a face munca de calcul intens, trebuie pur și simplu să mizezi ETH în rețea. Acesta este ceea ce stimulează un comportament sănătos în rețea.

#### Securitate {#pos-security}

Un sistem de dovada mizei (PoS) este menținut în siguranță prin faptul că ai avea nevoie de 51% din totalul de ETH mizat pentru a frauda lanțul. Și că miza ta este penalizată pentru un comportament rău intenționat.

Mai multe despre [dovada mizei (PoS)](/developers/docs/consensus-mechanisms/pos/)

## Referințe suplimentare {#further-reading}

## Subiecte corelate {#related-topics}

- [Dovada muncii](/developers/docs/consensus-mechanisms/pow/)
- [Minarea](/developers/docs/consensus-mechanisms/pow/mining/)
- [Dovada mizei](/developers/docs/consensus-mechanisms/pos/)
