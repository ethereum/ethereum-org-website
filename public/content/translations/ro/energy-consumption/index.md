---
title: Energia consumată de Ethereum
description: Informațiile de bază necesare pentru a înțelege câtă energie consumă Ethereum.
lang: ro
---

# Energia consumată de Ethereum {#introduction}

Consumul actual de energie electrică al lui Ethereum folosind protocolul [dovada-muncii](/developers/docs/consensus-mechanisms/#proof-of-work), este foarte mare și nesustenabil. Rezolvarea problemelor legate de cheltuielile pentru energie fără a sacrifica securitatea și descentralizarea constituie o provocare tehnică semnificativă și s-a situat în centrul cercetării și dezvoltării de ani de zile. Să analizăm de ce construirea Ethereum a avut un mare impact asupra mediului și în ce fel apropiata actualizare a rețelei la protocolul [dovada mizei (PoS)](/developers/docs/consensus-mechanisms/pos) va schimba dramatic această situație.

## Energia asigură securitatea rețelei {#energy-secures-the-network}

Tranzacțiile de pe blockchain-ul Ethereum sunt validate de [miner-i](/developers/docs/consensus-mechanisms/pow/mining). Aceștia grupează tranzacțiile în blocuri ordonate și le adaugă la blockchain-ul Ethereum. Noile blocuri sunt transmise tuturor celorlalți operatori de noduri care execută tranzacțiile în mod independent și verifică valabilitatea acestora. Orice lipsă de onestitate va apărea ca o inconsecvență între diverse noduri. Blocurile oneste sunt adăugate la blockchain, făcând astfel parte din istorie permanent.

Capacitatea oricărui miner de a adăuga blocuri noi funcționează doar în cazul în care există un cost asociat cu minarea și imposibilitatea de a prevedea care nod anume va trimite blocul următor. Aceste condiții sunt îndeplinite impunând dovada-muncii (PoW). Pentru ca un miner să fie calificat pentru a depune un bloc de tranzacții, acesta trebuie să rezolve un puzzle arbitrar de calcul mai repede decât orice alt miner. Rezolvarea acestui puzzle va crea o concurență între mineri și costuri sub forma cheltuielii de energie. Un miner necinstit ar putea frauda cu succes blockchain-ul numai dacă ar putea câștiga în mod constant cursa pentru dovada-muncii, lucru care este extrem de improbabil și exorbitant de scump.

Ethereum a folosit dovada-muncii încă de la început. Trecerea de la dovada-muncii la dovada-mizei a fost întotdeauna un obiectiv fundamental al lui Ethereum. În ciuda acestui fapt, elaborarea unui sistem pentru dovada-mizei care să adere la principiile fundamentale de securitate și descentralizare ale lui Ethereum nu este un lucru banal. A fost nevoie de multă cercetare și multe descoperiri în domeniul criptografiei, al cripto-economiei și al conceptului mecanismului pentru a se ajunge într-un punct în care tranziția să fie posibilă.

## Cheltuieli pentru energie la dovada-muncii {#proof-of-work}

Dovada-muncii este o modalitate solidă de a securiza rețeaua și de a impune modificări oneste în blockchain, totuși ridică probleme din câteva motive. Dreptul de a extrage un bloc necesită rezolvarea unui puzzle arbitrar de calcul, motiv pentru care investiția într-un hardware mai puternic poate crește șansele de succes ale unui miner. Aceste stimulente provoacă o concurență acerbă între miner-i, care cumpără echipamente de minare din ce în ce mai mari consumatoare de energie. Protocolul Ethereum pe baza dovezii-muncii consumă anual aproximativ tot atâta energie cât Finlanda<sup>[^1]</sup> și are o amprentă de carbon similară cu cea a Elveției<sup>[^1]</sup>.

## Dovada-mizei {#proof-of-stake}

Un viitor mai ecologic pentru Ethereum este deja în curs de construcție sub forma unui [lanț bazat pe **dovada-mizei (PoS)**](/roadmap/beacon-chain/). În cadrul [dovezii-mizei](/developers/docs/consensus-mechanisms/pos/), nu mai este necesară rezolvarea de puzzle-uri arbitrare. Eliminarea rezolvării puzzle-urilor scade semnificativ cheltuielile cu energia necesară pentru a securiza rețeaua. Miner-ii sunt înlocuiți cu validatori, care îndeplinesc aceeași funcție, cu deosebirea că, în loc să-și cheltuiască activele în avans sub forma muncii de calcul, aceștia mizează ETH drept garanție față de un comportament necinstit. Dacă validatorul este leneș, (este off-line atunci când acesta ar trebui să îndeplinească o anumită obligație de validator), ETH-ul pe care a mizat se poate scurge încet-încet, în timp ce un comportament necinstit demonstrabil poate duce la o „reducere” a activelor mizate. Aceasta stimulează semnificativ participarea activă și onestă la securizarea rețelei.

În mod asemănător cu dovada-muncii, o entitate rău intenționată ar avea nevoie de cel puțin 51% din totalul ETH-ului mizat pentru un [atac de 51%](/glossary/#51-attack). Însă, spre deosebire de dovada-muncii, unde pierderea potențială în urma unui astfel de atac constă numai din costul generării puterii hash necesare pentru minare, în cazul dovezii-mizei pierderea potențială în urma unui atac este întreaga sumă de ETH folosită ca garanție. Această structură de descurajare permite securitatea rețelei cu ajutorul dovezii-mizei, eliminând în același timp nevoia de a cheltui energie pe calcule aleatorii. Puteți afla explicații amănunțite cu privire la securitatea rețelei prin dovada-mizei [aici](/developers/docs/consensus-mechanisms/pos/) și [aici](https://vitalik.ca/general/2017/12/31/pos_faq.html).

## Fuziunea {#the-merge}

În prezent, există o un lanț funcțional bazat pe dovada-mizei, numit [Lanțul Beacon](/roadmap/beacon-chain/), care funcționează din decembrie 2020 și care demonstrează viabilitatea protocolului dovezii-mizei. Fuziunea are loc la momentul în care Ethereum va renunța la dovada-muncii și va adopta în întregime dovada-mizei. Se preconizează că fuziunea se va realiza ~T2 2022. [Aflați mai multe despre fuziune](/roadmap/merge/).

## Cheltuieli de energie la dovada-mizei {#proof-of-stake-energy}

Pe lângă consolidarea încrederii în mecanismul dovezii-mizei, Lanțul Beacon permite și estimarea consumului de energie al lui Ethereum după fuziune. O [estimare recentă](https://blog.ethereum.org/2021/05/18/country-power-no-more/), a sugerat că fuzionarea la dovada-mizei ar putea duce la o reducere de 99.95% a consumului total de energie, dovada-mizei fiind de ~2000 de ori mai eficientă din punct de vedere energetic decât dovada-muncii. Cheltuielile de energie ale lui Ethereum vor fi aproximativ egale cu costul de funcționare a unui computer personal pentru fiecare nod din rețea.

![imagine](energy_use_per_transaction.png)

<p style={{ textAlign: "center" }}><small><i>O estimare a consumului de energie per tranzacție (tx) al dovezii-muncii (PoW) pe baza <a href="https://blog.ethereum.org/2021/05/18/country-power-no-more/" target="_blank" rel="noopener noreferrer">datelor din mai 2021</a>, la momentul redactării acestui articol, a sugerat o valoare de până la <a href="https://digiconomist.net/ethereum-energy-consumption" target="_blank" rel="noopener noreferrer">175,56 kWh</a></i></small></p>

Să facem o comparație între aceste cifre și un serviciu precum Visa. 100.000 de tranzacții Visa consumă 149 kWh de energie<sup>[^2]</sup>. Să presupunem că fragmentarea a fost implementată, iar rata actuală de tranzacții pe Ethereum (15 tranzacții pe secundă) va crește de cel puțin 64x (numărul de fragmente), fără a lua în considerare optimizarea suplimentară datorată rollup-urilor. O estimare realistă pentru un Ethereum post-fuziune, fragmentat și cu rollup-uri, este de [25.000 - 100.000](https://twitter.com/VitalikButerin/status/1312905884549300224?s=20) de tranzacții pe secundă. Putem folosi aceste informații pentru a estima cheltuielile maxime și minime de energie pentru 100.000 de tranzacții.

- 25.000 de tranzacții pe secundă.
- `100.000 / 25.000 = 4` secunde pentru a procesa 100.000 de tranzacții.

De asemenea, putem estima consumul de energie pe secundă făcând o estimare conservatoare conform căreia 10.000 de validatori activi securizează rețeaua (în acest moment există peste [250.000 de validatori pe Lanțul Beacon](https://beaconscan.com/), dar pot opera mulți validatori pe un singur nod. Actualmente se estimează că există 3.000-4.000 de noduri individuale, așa că cele 10.000 de noduri reprezintă o estimare conservatoare pentru perioada post-fuziune):

`1,44 kWh de utilizare zilnică * 10.000 de noduri de rețea = 14.400` kWh pe zi. Într-o zi sunt 86.400 de secunde, deci `14.400 / 86.400 = 0,1667 kWh` pe secundă.

Dacă înmulțim acest număr cu timpul necesar pentru a procesa 100.000 de tranzacții: `0,1667 * 4 = 0,667 kWh`.

Aceasta este ~0,4 % din energia utilizată de Visa pentru același număr de tranzacții sau o reducere a cheltuielilor de energie cu un factor de ~225 în comparație cu rețeaua actuală Ethereum bazată pe dovada-muncii.

Repetând calculul cu numărul maxim de tranzacții pe secundă, rezultă 0,1667 kWh pe secundă, care reprezintă 0,1% din cheltuielile Visa cu energia sau o reducere de ~894x.

_Observaţie: nu este întru totul corectă comparația pe baza numărului de tranzacții, deoarece gradul de utilizare a energiei în Ethereum se bazează pe timp. Consumul de energie al lui Ethereum rămâne același pe minut, indiferent dacă se efectuează una sau o mie de tranzacții._

_Totodată, trebuie să luăm în considerare că Ethereum nu se limitează la simple tranzacții financiare ci este de asemenea o platformă completă construită pentru contracte inteligente și aplicații descentralizate._

## Un Ethereum mai ecologic {#green-ethereum}

În timp ce consumul de energie al lui Ethereum a fost întotdeauna considerabil, dezvoltatorii au investit mult timp și inteligență în procesul de tranziție de la un proces de validare a blocurilor cu un consum mare de energie la unul eficient energetic. Pentru a cita [Bankless](http://podcast.banklesshq.com/), modalitatea cea mai eficientă de a reduce energia consumată de dovada-muncii este pur și simplu de a o „dezactiva”, abordare pe care Ethereum s-a angajat să o urmeze.

<InfoBanner emoji=":evergreen_tree:">
  În cazul în care considerați că aceste statistici sunt incorecte sau precizia lor poate fi ameliorată, vă rugăm să ne semnalați o problemă sau creați un PR. Acestea sunt estimări făcute de echipa ethereum.org, folosind informații accesibile publicului precum și foaia de parcurs actuală a lui Ethereum. Aceste declarații nu reprezintă o promisiune oficială din partea Fundației Ethereum.
</InfoBanner>

## Referințe suplimentare {#further-reading}

- [Consum de energie cât o țară, niciodată](https://blog.ethereum.org/2021/05/18/country-power-no-more/) – _Cart Beekhuizen, 18 mai 2021_
- [Emisiile Ethereum: O estimare de jos în sus](https://kylemcdonald.github.io/ethereum-emissions/) _ Kyle McDonald_
- [Indicele consumului de energie al lui Ethereum](https://digiconomist.net/ethereum-energy-consumption/) – _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) — *[@InsideTheSim](https://twitter.com/InsideTheSim)*

## Subiecte corelate {#related-topics}

- [Viziunea Ethereum](/roadmap/vision/)
- [Lanțul Beacon](/roadmap/beacon-chain)
- [Fuziunea](/roadmap/merge/)
- [Fragmentare](/roadmap/beacon-chain/)

### Note de subsol și surse {#footnotes-and-sources}

#### 1. Consumul de energie la dovada-muncii în Ethereum {#fn-1}

[Consumul de energie pe țări, inc. Ethereum (TWh pe an)](https://digiconomist.net/ethereum-energy-consumption)

#### 2. Consumul de energie pentru Visa {#fn-2}

[Consumul mediu de energie pe tranzacție în rețeaua Bitcoin în comparație cu rețeaua VISA în 2020, Statista](https://www.statista.com/statistics/881541/bitcoin-energy-consumption-transaction-comparison-visa/)

[Raportul financiar Visa pe T4 2020](https://s1.q4cdn.com/050606653/files/doc_financials/2020/q4/Visa-Inc.-Q4-2020-Operational-Performance-Data.pdf)
