---
title: Exploratori de blocuri
description: O introducere în exploratorii de blocuri, portalul tău spre lumea datelor blockchain, unde poți interoga informații despre tranzacții, conturi, contracte și multe altele.
lang: ro
sidebar: true
sidebarDepth: 3
---

Exploratorii de bloc sunt portalul tău către datele Ethereum. Le poți utiliza pentru a vedea date despre blocuri în timp real, tranzacții, mineri, conturi și alte activități în lanț.

## Condiții prealabile {#prerequisites}

Ar trebui să înțelegi conceptele de bază ale Ethereum, astfel încât să poți înțelege datele pe care ți le oferă un explorator de bloc. Începe cu [o introducere în Ethereum](/en/developers/docs/intro-to-ethereum/).

## Servicii {#services}

- [Etherscan](https://etherscan.io/) -_De asemenea, disponibil în chineză, coreeană, rusă și japoneză_
- [Etherchain](https://www.etherchain.org/)
- [Ethplorer](https://ethplorer.io/)
- [Blockchair](https://blockchair.com/ethereum) –_De asemenea, disponibil în spaniolă, franceză, italiană, neerlandeză, portugheză, rusă, chineză, și farsi (persană)_
- [Blockscout](https://blockscout.com/)
- [OKLink](https://www.oklink.com/eth)

## Date {#data}

Ethereum este transparent prin design, astfel încât totul este verificabil. Exploratorii de blocuri oferă o interfață pentru a obține aceste informații. Iar aceasta este atât pentru rețeaua principală Ethereum, cât și pentru rețeaua de testare, dacă ai nevoie de aceste date.

Iată un rezumat al tipurilor de date pe care le poți obține de la un explorator de bloc.

### Blocuri {#blocks}

Blocuri noi sunt adăugate la Ethereum la fiecare ~ 12 secunde (acest lucru poate fluctua), astfel încât există un flux aproape constant de date care se adaugă la exploratorii de blocuri. Blocurile conțin o mulțime de date importante pe care le poți găsi utile:

**Date standard**

- Înălțimea blocului – Numărul blocului și lungimea blockchain-ului (în blocuri) la crearea blocului curent.
- Marca de timp – Ora la care un miner a minat blocul.
- Tranzacții – Numărul de tranzacții incluse în bloc.
- Miner – Adresa minerului care a minat blocul.
- Recompensă – Suma de ETH acordată minerului pentru adăugarea blocului (recompensă standard 2ETH + orice taxe de tranzacție pentru tranzacțiile incluse în bloc).
- Dificultate – Dificultatea asociată extragerii blocului.
- Dimensiune – dimensiunea datelor în interiorul blocului (măsurată în octeți).
- Gaz utilizat – Unitățile totale de gaz utilizate de tranzacțiile din bloc.
- Limita gazului – Limitele totale de gaz stabilite de tranzacțiile din bloc.
- Date suplimentare – Orice date suplimentare pe care minerul le-a inclus în bloc.

**Date avansate**

- Hash – Hash criptografic care reprezintă antetul blocului (identificatorul unic al blocului).
- Hash părinte – Hash-ul blocului care vine înaintea blocului curent.
- Sha3Uncles – hash-ul combinat al tuturor unchilor unui părinte dat.
- StateRoot – hash-ul rădăcină al arborelui Merkle, care stochează starea întreagă a sistemului.
- Nonce – Valoare folosită de către minier pentru a demonstra dovada muncii (POW) pentru un bloc.

**Bloc unchi**

Blocurile unchi sunt create atunci când doi mineri creează blocuri aproape în același timp – doar un bloc poate fi validat peste noduri. Acestea nu sunt incluse, dar încă primesc o recompensă pentru muncă.

Exploratorii de blocuri oferă informații despre blocurile unchi, cum ar fi:

- Numărul blocului unchi.
- Timpul când s-a întâmplat.
- Înălțimea blocului la care au fost create.
- Cine l-a minat.
- Recompensa ETH.

### Gaz {#gas}

Nu numai că exploratorii de blocuri îți vor oferi date despre utilizarea de gaz în tranzacții și blocuri, dar unele îți vor oferi informații cu privire la prețurile actuale ale rețelei de gaz. Acest lucru te va ajuta să înțelegi utilizarea rețelei, să trimiți tranzacții sigure și să nu cheltuiești excesiv pe gaz. Fii atent la API-uri care te pot ajuta să obții aceste informații în interfața produsului. Datele specifice despre gaz acoperă:

- Unități de gaz estimate necesare pentru o tranzacție sigură, dar lentă (+ o estimare a prețului și duratei).
- Unități de gaz estimate necesare pentru o tranzacție medie (+ o estimare a prețului și duratei).
- Unități de gaz estimate necesare pentru o tranzacție rapidă (+ o estimare a prețului și duratei).
- Timpul mediu de confirmare bazat pe prețul gazului.
- Contracte care consumă gaz – cu alte cuvinte, produse populare care sunt foarte utilizate în rețea.
- Conturi care consumă gaz – cu alte cuvinte, utilizatori frecvenți ai rețelei.

### Tranzacții {#transactions}

Exploratorii de bloc au devenit un loc comun în care oamenii pot urmări progresul tranzacțiilor lor. Asta deoarece nivelul de detalii pe care le poți obține oferă o certitudine suplimentară. Datele tranzacției includ:

**Date standard**

- Hash-ul tranzacție – Un hash generat atunci când tranzacția este trimisă.
- Stare – Indică dacă o tranzacția este în așteptare, a eșuat sau a avut succes.
- Bloc – Blocul în care tranzacția a fost inclusă.
- Marcaj temporal – Momentul în care un miner a minat tranzacția.
- De la – Adresa contului care a transmis tranzacția.
- Către – Adresa destinatarului sau contractul inteligent cu care interacționează tranzacția.
- Tokenuri transferate – O listă de tokenuri care au fost transferate ca parte a tranzacției.
- Valoare – valoarea totală de ETH transferat.
- Comision de tranzacție – Suma plătită minerului pentru a procesa tranzacția (calculată prin prețul gazului\*gazul utilizat).

**Date avansate**

- Limita de gaz – Numărul maxim de unități de gaz pe care această tranzacție le poate consuma.
- Gaz utilizat – Cantitatea reală de unități de gaz utilizată de tranzacție.
- Prețul gazului – Prețul stabilit pe unitate de gaz.
- Nonce – Numărul tranzacției pentru adresa `from` (reține că aceasta începe de la 0, astfel încât un nonce de `100` ar fi de fapt a 101-a tranzacție prezentată de acest cont.
- Date de intrare – Orice informații suplimentare solicitate de tranzacție.

### Conturi {#accounts}

Există o mulțime de date pe care le poți accesa despre un cont. De aceea este adesea recomandat să folosești mai multe conturi pentru ca activele și valorile tale să nu poată fi urmărite cu ușurință. Există, de asemenea, unele soluții în curs de elaborare pentru a face tranzacțiile și activitatea contului mai private. Dar iată datele disponibile pentru conturi:

**Conturi de utilizator**

- Adresa contului – Adresa publică pe care o poți utiliza pentru a trimite fonduri către.
- Soldul ETH – Valoarea ETH asociată contului respectiv.
- Valoarea ETH totală – Valoarea ETH.
- Tokenuri – Tokenurile asociate contului și valoarea lor.
- Istoricul tranzacțiilor – O listă a tuturor tranzacțiilor în care acest cont a fost fie „expeditorul”, fie „destinatarul”.

**Contracte inteligente**

Conturile de contracte inteligente au toate datele pe care le va avea un cont de utilizator, dar unii exploratori de bloc vor afișa chiar și unele informații de cod. Exemplele includ:

- Creatorul contractului – Adresa care a implementat contractul pe rețeaua principală.
- Tranzacția de creare – Tranzacția care a inclus implementarea pe rețeaua principală.
- Codul sursă – Codul solidity sau vyper al contractului inteligent.
- ABI Contract – Interfața binară a contractului – apelurile pe care le face contractul și datele primite.
- Codul de creare a contractului – Bytecode-ul compilat al contractului inteligent – creat la compilarea un contract inteligent scris în Solidity sau Vyper etc.
- Evenimente contractuale – O istorie a metodelor apelate în contractul inteligent. Practic o modalitate de a vedea cum este utilizat contractul și cât de des.

### Tokenuri {#tokens}

Tokenurile sunt un tip de contracte, de aceea ele vor avea date similare cu un contract inteligent. Dar, pentru că au valoare și pot fi tranzacționate au puncte de date suplimentare:

- Tip – Fie că sunt un ERC-20, ERC-721 sau un alt token standard.
- Preț – dacă sunt ERC-20, ele vor avea o valoare de piață curentă.
- Plafon de piață – În cazul în care acestea sunt un ERC-20 vor avea un plafon de piață (calculat ca preț\*oferta totală).
- Oferta totală – Numărul de tokenuri în circulație.
- Titulari – Numărul de adrese care conțin tokenul.
- Transferuri – Numărul ce indică de câte ori tokenul a fost transferat între conturi.
- Istoricul tranzacțiilor – Istoricul tuturor tranzacțiilor, inclusiv tokenul.
- Adresa contractului – Adresa tokenului care a fost implementat pe rețeaua principală.
- Zecimale – Tokenurile ERC-20 sunt divizibile și au zecimale.

### Rețea {#network}

Desigur, există unele date care vorbesc despre sănătatea rețelei. Acestea sunt destul de specifice mecanismului de consens dovada muncii. Când Ethereum trece la Eth2, unele dintre aceste date vor fi redundante

- Dificultate – Actuala dificultate a mineritului.
- Rata hash – O estimare a numărului de hash-uri generate de minerii Ethereum care încearcă să rezolve blocul Ethereum curent sau orice bloc dat.
- Total tranzacții – Numărul de tranzacții de la crearea Ethereum.
- Tranzacții pe secundă – Numărul de tranzacții care pot fi procesate într-o secundă.
- Prețul ETH – Evaluările actuale ale 1 ETH.
- Aprovizionare totală în ETH – Numărul de ETH în circulație – amintește-ți că ETH nou este creat odată cu crearea fiecărui bloc, sub formă de recompense de bloc.
- Plafon de piață – Calcularea prețului\*ofertei.

## Date Eth2 {#eth2-data}

Upgrade-urile Eth2 sunt încă în dezvoltare, dar merită să vorbim despre unele din punctele de date pe care exploratorii le vor putea oferi. De fapt, toate aceste date sunt disponibile chiar acum pentru rețelele de testare.

Dacă nu ești familiarizat cu Eth2 verifică [prezentarea noastră de ansamblu a upgrade-urilor Eth2](/eth2/).

### Epocă {#epoch}

Primul upgrade Eth2, lanțul Beacon, va crea comitete de validatori care sunt randomizate la sfârșitul fiecărei epoci (la fiecare 6,4 minute) din motive de securitate. Datele unei Epoci includ:

- Numărul Epocii.
- Starea finalizării - Dacă epoca a fost finalizată (Da/Nu).
- Timp – Ora la care s-a terminat epoca.
- Atestări – Numărul de atestări în epocă (voturi pentru blocuri în interiorul sloturilor).
- Depozite – Numărul de depozite ETH incluse în epocă (validatorii trebuie să mizeze ETH pentru a deveni validatori).
- Penalități – Numărul de penalități date celor care propun blocurile sau atestatorilor.
- Participarea la vot – Cantitatea de ETH mizat folosit la atestarea blocurilor.
- Validatori – Număr de validatori activi pentru epocă.
- Soldul mediu de validare – Soldul mediu pentru validatorii activi.
- Sloturi – Numărul de sloturi incluse în epocă (sloturile includ un bloc valid).

### Slot {#slot}

Sloturile sunt oportunități pentru crearea blocurilor și detaliile disponibile pentru fiecare slot includ:

- Epoca – Epoca în care este valabil slotul.
- Numărul slotului.
- Stare – Starea slotului (Propus/Ratat).
- Timp – Marcajul temporal al sloturilor.
- Propunător – Validatorul care a propus blocul pentru sloturi.
- Blocul root – Hash-ul rădăcinii arborelui Blocului Bacon.
- Părinte root – Hash-ul blocului care a apărut înainte.
- Starea root – Hash-ul rădăcinii arborelui Stării Beacon.
- Semnătură.
- Dezvăluire Randao.
- Graffiti – un propunător de bloc care poate include un mesaj de 32 octeți în propunerea sa.
- Date ETH1.
  - Hash-ul blocului.
  - Număr de depozite.
  - Depozit root.
- Atestări – Numărul de atestări pentru blocul din acest slot.
- Depozite – Numărul de depozite în intervalul acestui slot.
- Ieșiri voluntare – Numărul de validatori care au plecat în timpul slotului.
- Slashings – Numărul de penalități date celor care propun blocurile sau atestatorilor.
- Voturi – Validatorii care au votat pentru bloc în acest slot.

### Blocuri {#blocks-1}

În Eth2 blocurile funcționează diferit, deoarece minerii sunt înlocuiți cu validatori, iar lanțul Beacon introduce sloturi și epoci în Ethereum. Deci asta înseamnă date noi!

- Propunător – Validatorul care a fost ales algoritmic pentru a propune noul bloc.
- Epocă – Epoca în care a fost propus blocul.
- Slot – Slotul în care a fost propus acest bloc.
- Atestări – Numărul de atestare inclus în slot. Atestările sunt ca voturile care indică faptul că blocul este gata să meargă în lanțul Beacon.

### Validatori {#validators}

Validatorii sunt responsabili de propunerea blocurilor și de atestarea lor în cadrul sloturilor.

- Număr validator – Număr unic care reprezintă validatorul.
- Soldul curent – Soldul validatorului inclusiv recompensele.
- Soldul efectiv – Soldul validatorului utilizat pentru mizare.
- Venituri – Recompensele sau penalitățile primite de validator.
- Status – Dacă validatorul este în prezent online și activ sau nu.
- Eficacitatea atestării – Timpul mediu necesar atestărilor validatorului pentru a fi incluse în lanț.
- Eligibilitate pentru activare – Data (și epoca) când validatorul a devenit disponibil pentru validare.
- Activ de la – Data (și epoca) când validatorul a devenit activ.
- Blocuri propuse – Blocul propus de validator.
- Atestări – Atestările furnizate de validator.
- Depozite – Adresa „de la”, hash-ul tranzacției, numărul blocului, marca temporală, valoarea și starea depozitului de participare efectuat de validator.

### Atestări {#attestations}

Atestările sunt voturi „da” pentru a include blocurile în lanț. Datele lor se referă la o înregistrare a atestării și a validatorilor care au atestat

- Slot – Slotul în care a avut loc atestarea.
- Indexul Comitetului – Indexul comitetului de validatori repartizați în același slot.
- Biți de agregare – Reprezintă atestarea agregată a tuturor validatorilor participanți la atestare.
- Validatori – Validatorii care au furnizat atestări.
- Rădăcina blocului Beacon – Indică blocul pe care îl atestă validatorii.
- Sursă – Indică cea mai recentă epocă justificată.
- Ținta – Indică ultima limită a epocii.
- Semnătură.

### Rețea {#network-1}

Datele de nivel superior Eth2 includ următoarele:

- Epoca actuală.
- Slotul curent.
- Validatori activi – Număr de validatori activi.
- Validatori în așteptare – Numărul de validatori care așteaptă să devină activi.
- ETH mizat – Suma ETH mizată în rețea.
- Sold mediu – Soldul mediu ETH al validatorului.

## Exploratori de blocuri {#block-explorers}

- [Etherscan](https://etherscan.io/) – un explorator de bloc pe care îl poți utiliza pentru rețeaua principală Ethereum, Ropsten Testnet, Kovan Testnet, Rinkeby Testnet și Goerli Testnet.
- [Blockscout](https://blockscout.com/) – se concentrează pe următoarele rețele:
  - xDai – o combinație inteligentă între tehnologia MakerDAO de monede stabile DAI și a tehnologiei POA de sidechain și tokenbridge.
  - POA – O rețea pe un lanț lateral autonomă, securizată de un grup de validatori de încredere. Toți validatorii din rețea sunt notari din Statele Unite, iar informațiile lor sunt accesibile publicului.
  - Rețea de testare POA Sokol.
  - ARTIS – un blockchain compatibil Ethereum.
  - [LUKSO L14](https://blockscout.com/lukso/l14) – L14 funcționează ca prima rețea de testare, pentru a permite comunității LUKSO să construiască și să testeze o infrastructură comună.
  - qDai.
- [Etherchain](https://www.etherchain.org/) – un explorator de bloc pentru rețeaua principală Ethereum.
- [Ethplorer](https://ethplorer.io/) – un explorator de bloc cu accent pe tokenuri pentru rețeaua principală Ethereum și rețeaua de testare Kovan.
- [Blocchair](https://blockchair.com/ethereum) – cel mai privat explorator Ethereum. De asemenea, pentru sortare și filtrare a datelor (mempool).

## Exploratori de blocuri Eth2 {#eth2-block-explorers}

- [https://beaconcha.in/](https://beaconcha.in/)
- [https://beaconscan.com/](https://beaconscan.com/)
- [https://eth2stats.io/](https://eth2stats.io/medalla-testnet)

## Referințe suplimentare {#further-reading}

_Cunoști o resursă comunitară care te-a ajutat? Editează această pagină și adaug-o!_

## Subiecte corelate {#related-topics}

- [Minarea](/developers/docs/consensus-mechanisms/pow/mining/)
- [Tranzacții](/developers/docs/transactions/)
- [Conturi](/developers/docs/accounts/)
- [Rețele](/developers/docs/networks/)
