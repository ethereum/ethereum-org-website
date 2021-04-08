---
title: Dovada muncii (PoW)
description: O explicație a protocolului de consens „dovada muncii” și a rolului său în Ethereum.
lang: ro
sidebar: true
incomplete: true
---

Ethereum, la fel ca Bitcoin, folosește în prezent un protocol de consens numit [Dovada muncii (PoW)](https://en.wikipedia.org/wiki/Proof_of_work). Acesta permite nodurilor rețelei Ethereum să cadă de acord asupra stării tuturor informațiilor înregistrate pe blockchain-ul Ethereum și previne anumite tipuri de atacuri economice.

## Condiții prealabile {#prerequisites}

Pentru a înțelege mai bine această pagină, îți recomandăm să citești mai întâi despre [tranzacții](/developers/docs/transactions/) și [blocuri](/developers/docs/blocks/).

## Ce este dovada muncii (PoW)? {#what-is-pow}

Dovada muncii (PoW) este mecanismul care permite rețelei descentralizate Ethereum să ajungă la un consens sau să fie de acord cu lucruri precum soldurile conturilor și ordinea tranzacțiilor. Aceasta împiedică utilizatorii să-și „cheltuiască dublu” monedele și asigură faptul că lanțul Ethereum este incredibil de dificil de atacat sau suprascris.

## Dovada muncii și mineritul {#pow-and-mining}

Dovada muncii este algoritmul de bază care stabilește dificultatea și regulile pentru munca pe care o fac minerii. Mineritul este chiar „munca”. Este actul de a adăuga blocuri valide în lanț. Acest lucru este important, deoarece lungimea lanțului ajută rețeaua să identifice lanțul Ethereum valid și să înțeleagă starea actuală a Ethereum. Cu cât se „lucrează” mai mult, cu atât lanțul este mai lung și cu cât numărul blocului este mai mare, cu atât rețeaua poate fi mai sigură de starea actuală a lucrurilor.

[Mai multe despre minerit](/developers/docs/consensus-mechanisms/pow/mining/)

## Cum funcționează dovada muncii Ethereum? {#how-it-works}

Tranzacțiile Ethereum sunt procesate în blocuri. Fiecare bloc are:

- o dificultate de bloc – de exemplu: 3.324.092.183.262.715
- un mixHash – de exemplu: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- un nonce – de exemplu: `0xd3ee432b4fb3d26b`

Aceste date de bloc sunt direct legate de PoW.

### Munca în dovada muncii {#the-work}

Protocolul de dovadă a muncii, cunoscut sub numele de Ethash, cere minerilor să treacă printr-o cursă intensă de încercări și erori pentru a găsi nonce-ul unui bloc. Numai blocurile cu un nonce valid pot fi adăugate lanțului.

Atunci când concurează pentru a crea un bloc, un miner va trece în mod repetat un set de date, care poate fi obținut doar prin descărcarea și rularea lanțului complet (așa cum face un miner), printr-o funcție matematică. Acest lucru este necesar pentru a genera un mixHash care se află sub un nonce țintă, dictat de dificultatea blocului. Cel mai bun mod de a face aceasta este prin încercare și eroare.

Dificultatea determină ținta hash-ului. Cu cât ținta este mai mică, cu atât este mai mic setul de hash-uri valide. Odată generat, acest mixHash este incredibil de ușor de verificat de către ceilalți mineri și clienți. Chiar dacă s-ar schimba numai o singură tranzacție, hash-ul ar fi complet diferit, semnalând fraudă.

Hashing-ul facilitează identificarea fraudei. Dar PoW ca proces este, de asemenea, un factor important de descurajare a atacării lanțului.

### Dovada muncii și securitatea {#security}

Minerii sunt stimulați să facă această muncă pe lanțul principal Ethereum. Există puține stimulente pentru ca un subset de mineri să își lanseze propriul lanț – el discreditează sistemul. Blockchain-urile se bazează pe existența unei singure stări ca sursă de adevăr. Și utilizatorii vor alege întotdeauna lanțul cel mai lung sau mai „greu”.

Obiectivul PoW este de a extinde lanțul. Cel mai lung lanț este cel mai credibil să fie lanțul valid, deoarece s-a făcut cea mai mare muncă de calcul pe el. În cadrul sistemului PoW al Ethereum este aproape imposibil să creezi noi blocuri care să șteargă tranzacții, să creeze altele false sau să mențină un al doilea lanț. Aceasta deoarece un miner rău intenționat ar trebui să rezolve întotdeauna blocul nonce mai repede decât oricine altcineva.

Pentru a crea în mod constant blocuri rău intenționate, dar totuși valabile, ai avea nevoie de peste 51% din puterea de exploatare a rețelei pentru a-i învinge pe ceilalți. Ai avea nevoie de multă putere de calcul pentru a putea face această cantitate de „muncă”. Iar costul energiei folosite ar putea chiar să fie mai mare decât câștigurile pe care le-ai obține într-un atac.

### Aspectul economic al dovezii muncii {#economics}

PoW este, de asemenea, responsabilă cu emiterea de monede noi în sistem și cu stimularea minerilor să lucreze.

Minerii care au creat cu succes un bloc sunt recompensați cu 2 ETH proaspăt bătuți și toate taxele de tranzacție din interiorul blocului. Un miner poate primi de asemenea 1,75ETH pentru un bloc unchi. Acesta este un bloc valid, creat simultan cu blocul de succes, de către un alt miner. Cazuri de acest gen apar de obicei din cauza întârzierii rețelei.

## Finalitate {#finality}

În rețelele distribuite, o tranzacție are „finalitate” atunci când face parte dintr-un bloc care nu se poate modifica.

Deoarece minerii lucrează într-un mod descentralizat, este posibil ca două blocuri valide să fie exploatate în același timp. Aceasta creează o furculiță temporară. În final, un lanț va deveni lanțul acceptat odată ce un bloc ulterior a fost extras și adăugat, făcându-l mai lung.

Dar pentru a complica lucrurile și mai mult, tranzacțiile care au fost respinse pe furculița temporară ar fi putut fi incluse în lanțul acceptat. Aceasta înseamnă că acceptarea lanțului s-ar putea inversa. Deci, finalitatea se referă la timpul pe care ar trebui să-l aștepți înainte de a considera o tranzacție ireversibilă. Pentru Ethereum, timpul recomandat este de 6 blocuri sau puțin peste 1 minut. După aceea, poți spune cu relativă încredere că tranzacția a fost un succes. Desigur, poți aștepta și mai mult pentru o asigurare suplimentară.

Această posibilitate trebuie avută în vedere când proiectezi aplicații dapp, deoarece ar crea o experiență de utilizator slabă dacă acestea ar furniza informații false despre tranzacții utilizatorilor lor. În special dacă tranzacția are o valoare ridicată.

Ține minte, această sincronizare nu include timpul de așteptare pentru ca o tranzacție să fie preluată de un miner.

## Avantaje și dezavantaje {#pros-and-cons}

| Avantaje                                                                                                                                                                                                                            | Dezavantaje                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| PoW este neutră. Nu ai nevoie de ETH pentru a începe și recompensele de blocuri îți permit să mergi de la 0 ETH la un sold pozitiv. Cu [dovada mizei](/developers/docs/consensus-mechanisms/pos/) ai nevoie de ETH pentru a începe. | PoW consumă atât de multă energie încât dăunează mediului.                                                                                    |
| PoW este un mecanism de consens încercat care a menținut Bitcoin și Ethereum în siguranță și descentralizate de mai mulți ani.                                                                                                      | Dacă vrei să minezi, îți trebuie astfel de echipamente specializate, încât ai nevoie să investești mai mult pentru a începe.                  |
| Comparativ cu dovada mizei, este relativ ușor de implementat.                                                                                                                                                                       | Datorită creșterii calculelor necesare, grupurile miniere pot domina potențial jocul minier, ducând la centralizare și riscuri de securitate. |

## Comparativ cu dovada mizei {#compared-to-pos}

La un nivel ridicat, dovada mizei are același obiectiv final ca dovada muncii: de a ajuta rețeaua descentralizată să ajungă la un consens, în siguranță. Dar are unele diferențe în proces și personal:

- PoS schimbă balanța importanței de la puterea de calcul la cea a ETH-ului mizat
- PoS înlocuiește minerii cu validatorii. Validatorii mizează propriul ETH pentru a activa capacitatea de a crea noi blocuri.
- Validatorii nu concurează pentru a crea blocuri, în schimb sunt aleși aleatoriu de un algoritm.
- Finalitatea este mai clară: la anumite puncte de control, dacă 2/3 dintre validatori sunt de acord cu starea blocului, aceasta este considerată finală. Validatorii trebuie să mizeze întreaga lor cantitate de monede, așa că dacă vor încerca să intre în coluziune, își vor pierde toată miza.

[Mai multe despre dovada mizei](/developers/docs/consensus-mechanisms/pos/)

## Referințe suplimentare {#further-reading}

- [Atacul majorității](https://en.bitcoin.it/wiki/Majority_attack)
- [Despre stabilirea finalității](https://blog.ethereum.org/2016/05/09/on-settlement-finality/)

## Subiecte corelate {#related-topics}

- [Minarea](/developers/docs/consensus-mechanisms/pow/mining/)
- [Dovada mizei](/developers/docs/consensus-mechanisms/pos/)
