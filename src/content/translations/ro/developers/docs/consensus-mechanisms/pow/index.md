---
title: Dovada-muncii (PoW)
description: O explicație a protocolului de consens „dovada-muncii” și a rolului său în Ethereum.
lang: ro
incomplete: true
---

Ethereum, ca și Bitcoin, utilizează actualmente un protocol de consens numit **[Dovada-muncii (PoW)](https://wikipedia.org/wiki/Proof_of_work)**. Acesta permite nodurilor rețelei Ethereum să cadă de acord asupra stării tuturor informațiilor înregistrate pe blockchain-ul Ethereum și previne anumite tipuri de atacuri economice.

În cursul anului viitor, dovada-muncii (proof-of-work) va fi eliminată treptat în favoarea **[Dovezii-mizei (PoS)](/developers/docs/consensus-mechanisms/pos)**. Tranziția la dovada-mizei (proof-of-stake) va duce de asemenea la eliminarea treptată a minării din Ethereum. [Aflați mai multe despre fuziune](/upgrades/merge/)

## Condiții prealabile {#prerequisites}

Pentru o mai bună înțelegere a acestei pagini, vă recomandăm să citiți mai întâi despre [tranzacții](/developers/docs/transactions/), [blocuri](/developers/docs/blocks/) și [mecanisme de consens](/developers/docs/consensus-mechanisms/).

## Ce este dovada-muncii (PoW)? {#what-is-pow}

Dovada-muncii (proof-of-work) este mecanismul care permite rețelei descentralizate Ethereum să ajungă la un consens sau să cadă de acord asupra unor aspecte precum soldurile conturilor și ordinea tranzacțiilor. Aceasta împiedică utilizatorii să își „cheltuiască de două ori” monedele și garantează că lanțul Ethereum este extrem de dificil de atacat sau de manipulat.

## Dovada-muncii și minarea {#pow-and-mining}

Dovada-muncii este algoritmul de bază care stabilește dificultatea și regulile pentru munca pe care o fac miner-ii. Minarea este chiar „munca”. Este actul de a adăuga blocuri valide în lanț. Acest aspect este important deoarece lungimea lanțului ajută rețeaua să urmărească lanțul Ethereum corect și să înțeleagă starea actuală a lui Ethereum. Cu cât se „muncește” mai mult, cu atât lanțul este mai lung și cu cât numărul blocului este mai mare, cu atât rețeaua poate fi mai sigură de starea actuală a lucrurilor.

[Mai multe despre minare](/developers/docs/consensus-mechanisms/pow/mining/)

## Cum funcționează dovada-muncii în Ethereum? {#how-it-works}

Tranzacțiile Ethereum sunt procesate în blocuri. Fiecare bloc are:

- o dificultate de bloc – de exemplu: 3.324.092.183.262.715
- un mixHash – de exemplu: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- un nonce – de exemplu: `0xd3ee432b4fb3d26b`

Aceste informații despre bloc sunt direct legate de dovada-muncii.

### Munca în dovada-muncii {#the-work}

Protocolul dovada-muncii (proof-of-work), Ethash, le cere miner-ilor să participe la o întrecere aprigă de încercări și erori pentru a găsi nonce-ul unui bloc. Numai blocurile cu un nonce valid pot fi adăugate lanțului.

Atunci când concurează pentru a crea un bloc, un miner va trece în mod repetat un set de date care poate fi obținut doar prin descărcarea și rularea lanțului complet (așa cum face un miner), printr-o funcție matematică. Setul de date se utilizează pentru generarea unui mixHash sub un nonce țintă, după cum impune gradul de dificultate a blocului. Cel mai bun mod de a face aceasta este prin încercare și eroare.

Dificultatea determină ținta hash-ului. Cu cât ținta este mai mică, cu atât este mai mic setul de hash-uri valide. Odată generat, este incredibil de ușor de verificat de către ceilalți mineri și clienți. Chiar și în cazul în care o tranzacție s-ar schimba, hash-ul ar fi complet diferit, semnalizând o fraudă.

Hashing-ul facilitează identificarea fraudei. Dar dovada-muncii ca proces constituie și ea un mare factor de descurajare a atacului asupra lanțului.

### Dovada-muncii și securitatea {#security}

Miner-ii sunt stimulați să facă această muncă pe lanțul principal Ethereum. Există puține stimulente pentru ca un subset de mineri să își lanseze propriul lanț – acesta discreditează sistemul. Blockchain-urile se bazează pe existența unei singure stări ca sursă a adevărului. Și utilizatorii vor alege întotdeauna lanțul cel mai lung sau mai „greu”.

Obiectivul dovezii-muncii este de a extinde lanțul. Cel mai lung lanț este cel mai credibil ca fiind cel valid, pentru că în el s-a efectuat cea mai multă muncă de calcul. În sistemul dovezii-muncii (PoW) al lui Ethereum, este aproape imposibil să se creeze blocuri noi care să șteargă tranzacții, să creeze blocuri false sau să mențină un al doilea lanț. Aceasta deoarece un miner rău intenționat ar trebui să rezolve întotdeauna nonce-ul blocului mai repede decât toți ceilalți.

Ca să creați în mod constant blocuri rău intenționate, dar valide, ați avea nevoie de peste 51% din puterea de minare a rețelei pentru a-i învinge pe toți ceilalți. Ați avea nevoie de multă putere de calcul pentru a putea face o asemenea „muncă”. Iar energia cheltuită ar putea chiar depăși câștigurile pe care le-ați obține în urma unui atac.

### Aspectul economic al dovezii-muncii {#economics}

Dovada-muncii este de asemenea responsabilă pentru emiterea de noi monede în sistem și pentru stimularea miner-ilor să lucreze.

Miners who successfully create a block get rewarded with two freshly minted ETH but no longer receive all the transaction fees, as the base fee gets burned, while the tip and block reward goes to the miner. Un miner poate obține de asemenea 1,75 ETH pentru un bloc unchi. Blocurile unchi sunt blocurile valide create de un miner aproape în același timp cu un alt miner care a minat blocul ce a avut succes. Blocurile unchi se creează de obicei din cauza latenței rețelei.

## Finalitate {#finality}

O tranzacție are „finalitate” pe Ethereum atunci când face parte dintr-un bloc care nu se poate schimba.

Deoarece miner-ii muncesc descentralizat, se pot mina două blocuri valide în același timp. Acest lucru creează un fork temporar. În cele din urmă, unul dintre aceste lanţuri va deveni lanţul acceptat după ce un bloc ulterior a fost minat şi adăugat, prelungindu-l.

Dar, pentru a complica și mai mult lucrurile, este posibil ca tranzacțiile respinse pe forkul temporar să fi fost incluse în lanțul acceptat. Aceasta înseamnă că s-ar putea inversa. Deci finalitatea se referă la timpul cât aveţi de aşteptat înainte de a considera că o tranzacție este ireversibilă. În Ethereum timpul recomandat este de șase blocuri sau ceva mai mult de 1 minut. După șase blocuri, puteți considera relativ în siguranţă că tranzacția s-a efectuat cu succes. Puteți să așteptați mai mult timp pentru a fi şi mai sigur.

Finalitatea este ceva de care trebuie ținut cont atunci când se concep dapp-urile (aplicaţii descentralizate). V-aţi decepţiona utilizatorii dacă le-aţi prezenta informații eronate despre tranzacțiile lor, în special dacă valoarea acestora este mare.

Țineți minte că această durată nu include timpii de așteptare pentru ca o tranzacție să fie preluată de un miner.

## Consumul de energie pentru dovada-muncii {#energy}

Un dezavantaj major al dovezii-muncii este cantitătea de energie necesară pentru a menține securitatea reţelei. Pentru menținerea securității și a descentralizării, Ethereum-ul ce foloseşte dovada-muncii consumă 73,2 TWh anual, echivalentul de energie al unei țări de dimensiuni medii ca Austria.

## Avantaje și dezavantaje {#pros-and-cons}

| Avantaje                                                                                                                                                                                                                                                                                      | Dezavantaje                                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dovada-muncii (proof-of-work) este neutră. Nu aveţi nevoie de ETH pentru a începe și recompensele în blocuri vă permit să treceţi de la 0 ETH la un sold pozitiv. În cazul [dovezii-mizei (proof-of-stake)](/developers/docs/consensus-mechanisms/pos/)) aveți nevoie de ETH pentru a începe. | Dovada-muncii (proof-of-work) consumă atât de multă energie, încât este dăunătoare mediului.                                                          |
| Dovada-muncii (proof-of-work) este un mecanism de consens încercat și testat care a menţinut Bitcoin și Ethereum securizate și descentralizate timp de mulți ani.                                                                                                                             | Dacă doriţi să minaţi, aveţi nevoie de echipamente atât de specializate, încât investiţia pentru a începe este mare.                                  |
| Comparativ cu dovada-mizei (proof-of-stake), este relativ ușor de implementat.                                                                                                                                                                                                                | Datorită creșterii calculelor necesare, este posibil ca grupurile de minare să domine jocul minării, ducând la centralizare și riscuri de securitate. |

## Comparativ cu dovada-mizei {#compared-to-pos}

În principiu, dovada-mizei (proof-of-stake) are același obiectiv final ca și dovada-muncii (proof-of-work): să ajute rețeaua descentralizată să ajungă la consens în depliină securitate. Dar este întrucâtva diferită în privinţa procesării şi personalului:

- Dovada-mizei (proof-of-stake) schimbă prioritatea de la puterea de calcul la ETH-ul mizat.
- Dovada-mizei (proof-of-stake) înlocuiește miner-ii cu validatorii. Validatorii îşi mizează propriul ETH pentru a activa capacitatea de a crea noi blocuri.
- Validatorii nu concurează pentru a crea blocuri, ci sunt selectaţi aleatoriu printr-un algoritm.
- Finalitatea este mai clară: la anumite puncte de control, dacă 2/3 dintre validatori sunt de acord cu starea blocului, aceasta este considerată finală. Validatorii trebuie să-şi mizeze întreaga cantitate de monede, deci dacă vor încerca să intre în coluziune, își vor pierde toată miza.

[Mai multe despre dovada-mizei](/developers/docs/consensus-mechanisms/pos/)

## Învățați mai ușor prin vizualizare? {#visual-learner}

<YouTube id="3EUAcxhuoU4" />

## Referințe suplimentare {#further-reading}

- [Atacul prin majoritate](https://en.bitcoin.it/wiki/Majority_attack)
- [Despre finalitatea de soluţionare](https://blog.ethereum.org/2016/05/09/on-settlement-finality/)

### Videoclipuri {#videos}

- [O explicație tehnică a protocoalelor dovezii-muncii (proof-of-work)](https://youtu.be/9V1bipPkCTU)

## Subiecte corelate {#related-topics}

- [Minarea](/developers/docs/consensus-mechanisms/pow/mining/)
- [Dovada-mizei](/developers/docs/consensus-mechanisms/pos/)
