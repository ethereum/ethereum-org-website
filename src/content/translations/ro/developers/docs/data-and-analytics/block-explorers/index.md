---
title: Exploratori de blocuri
description: O introducere despre exploratorii de blocuri, portalul dvs. în lumea datelor blockchain, unde puteți interoga informații despre tranzacții, conturi, contracte și multe altele.
lang: ro
sidebarDepth: 3
---

Exploratorii de blocuri sunt portalul dvs. către datele din Ethereum. Le puteţi utiliza pentru a vedea în timp real date despre blocuri, tranzacții, miner-i, conturi și alte activități din lanț.

## Condiții prealabile {#prerequisites}

Ar trebui să înțelegeți conceptele de bază ale lui Ethereum ca să vă daţi seama de logica datelor pe care vi le oferă un explorator de blocuri. Începeți cu [o introducere despre Ethereum](/developers/docs/intro-to-ethereum/).

## Servicii {#services}

- [Etherscan](https://etherscan.io/) – _Disponibil de asemenea în chineză, coreeană, rusă și japoneză_
- [Etherchain](https://www.etherchain.org/)
- [Ethplorer](https://ethplorer.io/) –_Disponibil și în chineză, spaniolă, franceză, turcă, rusă, coreeană și vietnameză_
- [Blockchair](https://blockchair.com/ethereum) –_Disponibil şi în spaniolă, franceză, italiană, neerlandeză, portugheză, rusă, chineză, și farsi (persană)_
- [Blockscout](https://blockscout.com/)
- [OKLink](https://www.oklink.com/eth)

## Date {#data}

Ethereum este transparent prin concepţie, astfel încât totul este verificabil. Exploratorii de blocuri oferă o interfață pentru a obține aceste informații. Iar aceasta este atât pentru rețeaua principală Ethereum, cât și pentru testnet-uri, dacă aveţi nevoie de aceste date.

Iată un rezumat al tipurilor de date pe care le puteți obține de la un explorator de blocuri.

### Blocuri {#blocks}

Sunt adăugate blocuri noi la Ethereum la fiecare ~12 secunde (acest interval poate fluctua), deci există un flux aproape constant de date care se adaugă la exploratorii de blocuri. Blocurile conțin o mulțime de date importante care vă pot fi utile:

**Date standard**

- Înălțimea blocului – Numărul blocului și lungimea blockchain-ului (în blocuri) la crearea blocului curent.
- Marcajul temporal – Momentul în care un miner a minat blocul.
- Tranzacții – Numărul de tranzacții incluse în bloc.
- Miner – Adresa miner-ului care a minat blocul.
- Recompensă – Suma de ETH acordată miner-ului pentru adăugarea blocului (recompensă standard de 2ETH + orice taxe de tranzacție pentru tranzacțiile incluse în bloc).
- Dificultate – Dificultatea asociată minării blocului.
- Dimensiune – Dimensiunea datelor în interiorul blocului (măsurată în octeți).
- Gaz utilizat – Unitățile totale de gaz utilizate de tranzacțiile din bloc.
- Limita de gaz – Limitele totale de gaz stabilite de tranzacțiile din bloc.
- Date suplimentare – Orice date suplimentare pe care miner-ul le-a inclus în bloc.

**Date avansate**

- Hash – Hash criptografic care reprezintă antetul blocului (identificatorul unic al blocului).
- Hash părinte – Hash-ul blocului care a venit înaintea blocului curent.
- Sha3Uncles – Hash-ul combinat al tuturor unchilor de la un părinte dat.
- StateRoot – Hash-ul rădăcină al trie-ului Merkle, care stochează întreaga stare a sistemului.
- Nonce – Valoare folosită pentru a demonstra dovada-muncii (POW) depuse de miner pentru un bloc.

**Blocuri unchi**

Blocurile unchi sunt create atunci când doi miner-i creează blocuri aproape în același timp – doar un bloc poate fi validat peste noduri. Acestea nu sunt incluse şi tot primesc o recompensă pentru muncă.

Exploratorii de blocuri oferă informații despre blocurile unchi, cum ar fi:

- Numărul blocului unchi.
- Momentul când a avut loc.
- Înălțimea blocului la care au fost create.
- Cine l-a minat.
- Recompensa în ETH.

### Gaz {#gas}

Nu numai că exploratorii de blocuri vă vor oferi date despre utilizarea de Gaz în tranzacții și blocuri, dar unii vă vor oferi informații cu privire la prețurile actuale ale gazului din rețea. Acest lucru vă va ajuta să înțelegeţi gradul de utilizare a rețelei, să trimiteți tranzacții securizate și să nu cheltuiţi excesiv pe gaz. Căutați API-uri care vă pot ajuta să obțineți aceste informații în interfața produsului dumneavoastră. Datele specifice despre gaz cuprind:

- Unitățile de gaz estimate necesare pentru o tranzacție securizată, dar lentă (+ o estimare a prețului și duratei).
- Unitățile de gaz estimate necesare pentru o tranzacție medie (+ o estimare a prețului și duratei).
- Unitățile de gaz estimate necesare pentru o tranzacție rapidă (+ o estimare a prețului și duratei).
- Timpul mediu de confirmare pe bazae prețului gazului.
- Contractele care consumă gaz – cu alte cuvinte, produsele populare care sunt foarte utilizate în rețea.
- Conturile care consumă gaz – cu alte cuvinte, utilizatorii frecvenți ai rețelei.

### Tranzacții {#transactions}

Exploratorii de blocuri au devenit un loc comun în care oamenii pot urmări cumm progresează tranzacţiile lor. Aceasta deoarece nivelul de detaliu pe care îl puteți obține oferă o certitudine suplimentară. Datele tranzacției cuprind:

**Date standard**

- Hash-ul tranzacției – Un hash generat atunci când este trimisă tranzacția.
- Starea – Indică dacă o tranzacția este în așteptare, a eșuat sau a avut succes.
- Blocul – Blocul în care a fost inclusă tranzacția.
- Marcajul temporal – Momentul în care un miner a minat tranzacția.
- From – Adresa contului care a transmis tranzacția.
- Către – Adresa destinatarului sau a contractului inteligent cu care interacționează tranzacția.
- Tokenuri transferate – O listă de tokenuri care au fost transferate ca făcând parte din tranzacție.
- Valoarea – Valoarea totală de ETH transferat.
- Comisionul tranzacției – Suma plătită miner-ului pentru a procesa tranzacția (calculată prin formula prețul gazului\*gazul utilizat).

**Date avansate**

- Limita de gaz – Numărul maxim de unități de gaz pe care le poate consuma această tranzacție.
- Gazul utilizat – Cantitatea reală de unități de gaz utilizată de tranzacție.
- Prețul gazului – Prețul stabilit pe unitate de gaz.
- Nonce – Numărul tranzacției pentru adresa `de la` (reține ţică acesta începe de la 0, astfel încât un nonce de `100` ar fi de fapt a 101-a tranzacție prezentată de acest cont.
- Date de introdus – Orice informații suplimentare solicitate de tranzacție.

### Conturi {#accounts}

Există o mulțime de date pe care le puteţi accesa despre un cont. De aceea, este adesea recomandat să folosiţi mai multe conturi, pentru ca activele și valorile dvs. să nu poată fi urmărite cu ușurință. Există şi unele soluții în curs de elaborare pentru a creşte gradul de confidenţialitate a tranzacţiilor şi a activităţii contului. Dar iată datele disponibile pentru conturi:

**Conturi de utilizator**

- Adresa contului – Adresa publică către care puteţi trimite fonduri.
- Soldul în ETH – Valoarea în ETH asociată contului respectiv.
- Valoarea în ETH totală – Valoarea ETH-ului.
- Tokenuri – Tokenurile asociate contului și valoarea lor.
- Istoricul tranzacțiilor – O listă a tuturor tranzacțiilor în care acest cont a fost fie „expeditorul”, fie „destinatarul”.

**Contracte inteligente**

Conturile de contracte inteligente au toate datele pe care le va avea un cont de utilizator, dar unii exploratori de bloc afişează chiar și unele informații de cod. Exemplele includ:

- Creatorul contractului – Adresa care a implementat contractul pe Mainnet.
- Tranzacția de creare – Tranzacția care a inclus implementarea pe Mainnet.
- Codul sursă – Codul solidity sau vyper al contractului inteligent.
- ABI-ul contractului– Interfața binară a contractului – apelurile pe care le face contractul și datele primite.
- Codul de creare a contractului – Bytecode-ul compilat al contractului inteligent – creat la compilarea unui contract inteligent scris în Solidity sau Vyper etc.
- Evenimentele contractuale – O istorie a metodelor apelate în contractul inteligent. Practic o modalitate de a vedea cum este utilizat contractul și cât de des.

### Tokenuri {#tokens}

Tokenurile sunt un tip de contracte, de aceea ele vor avea date similare cu ale unui contract inteligent. Dar, pentru că au valoare și pot fi tranzacționate, ele au puncte de date suplimentare:

- Tip – Dacă sunt ERC-20, ERC-721 sau un alt standard de token.
- Preț – Dacă sunt ERC-20, ele vor avea o valoare de piață curentă.
- Capitalul de piață – În cazul în care acestea sunt ERC-20, vor avea un capital de piață (calculat ca preț\*oferta totală).
- Oferta totală – Numărul de tokenuri în circulație.
- Titulari – Numărul de adrese care conțin tokenul.
- Transferuri – Numărul ce indică de câte ori a fost transferat tokenul între conturi.
- Istoricul tranzacțiilor – Istoricul tuturor tranzacțiilor care includ tokenul.
- Adresa contractului – Adresa tokenului care a fost implementat pe Mainnet.
- Zecimale – Tokenurile ERC-20 sunt divizibile și au zecimale.

### Rețea {#network}

Desigur, există unele date care vorbesc despre sănătatea rețelei. Acestea sunt destul de specifice mecanismului de consens bazat pe dovada-muncii. Când Ethereum va trece la dovada-mizei, unele dintre aceste date vor fi redundante

- Dificultate – Actuala dificultate a minării.
- Rata hash – O estimare a numărului de hash-uri generate de miner-ii Ethereum care încearcă să rezolve blocul Ethereum curent sau orice bloc dat.
- Total tranzacții – Numărul de tranzacții de la crearea lui Ethereum.
- Tranzacții pe secundă – Numărul de tranzacții care pot fi procesate într-o secundă.
- Prețul ETH – Evaluările actuale ale 1 ETH.
- ETH-ul total furnizat – Numărul de ETH în circulație – amintiţi-vă că se creează ETH nou odată cu crearea fiecărui bloc, sub formă de recompense de bloc.
- Capitalul de piață – Calcularea prețului\*ofertei.

## Date despre nivelul de consens {#consensus-layer-data}

Actualizările de scalabilitate sunt încă în curs de dezvoltare, dar merită să vorbim despre unele dintre punctele de date pe care exploratorii vor putea să vi le furnizeze. De fapt, toate aceste date sunt disponibile chiar acum pentru testnet-uri.

Dacă nu cunoașteți foaia de parcurs, consultați [prezentarea noastră generală a actualizărilor Ethereum](/upgrades/).

### Epocă {#epoch}

Lanțul Beacon va crea comitete de validatori randomizate la sfârșitul fiecărei epoci (la fiecare 6,4 minute), din motive de securitate. Datele unei epoci includ:

- Numărul epocii.
- Stare finalizată – Dacă epoca a fost finalizată (Da/Nu).
- Timp – Momentul la care s-a terminat epoca.
- Atestări – Numărul de atestări din epocă (voturi pentru blocuri în interiorul sloturilor).
- Depozite – Numărul de depozite de ETH incluse în epocă (validatorii trebuie să mizeze ETH pentru a deveni validatori).
- Penalități – Numărul de penalități date celor care propun blocurile sau le atestează.
- Participarea la vot – Cantitatea de ETH mizat folosit la atestarea blocurilor.
- Validatori – Numărul de validatori activi pentru epocă.
- Soldul mediu de validare – Soldul mediu pentru validatorii activi.
- Sloturi – Numărul de sloturi incluse în epocă (sloturile includ un bloc valid).

### Slot {#slot}

Sloturile sunt oportunități pentru crearea blocurilor și detaliile disponibile pentru fiecare slot includ:

- Epoca – Epoca în care slotul este valid.
- Numărul slotului.
- Starea – Starea slotului (Propus/Ratat).
- Momentul – Marcajul temporal al sloturilor.
- Propunătorul – Validatorul care a propus blocul pentru slot.
- Blocul root – Hash-ul rădăcinii arborelui BeaconBlock.
- Rădăcina părinte – Hash-ul blocului care a apărut înainte.
- Rădăcina stării– Hash-ul rădăcinii arborelui BeaconState.
- Semnătura.
- Dezvăluirea Randao.
- Graffiti – un propunător de bloc care poate include un mesaj de 32 octeți în propunerea sa de bloc.
- Datele de execuție.
  - Hash-ul blocului.
  - Numărul depozitului.
  - Rădăcina depozitului.
- Atestări – Numărul de atestări pentru blocul din acest slot.
- Depozite – Numărul de depozite în intervalul acestui slot.
- Ieșiri voluntare – Numărul de validatori care au plecat în timpul slotului.
- Penalităţi – Numărul de penalități date celor care propun blocurile sau le atestă.
- Voturi – Validatorii care au votat pentru bloc în acest slot.

### Blocuri {#blocks-1}

Blocurile nivelului de consens funcționează diferit, deoarece miner-ii sunt înlocuiți de validatori, iar Lanțul Beacon introduce sloturi și epoci în Ethereum. Deci aceasta înseamnă date noi!

- Propunătorul – Validatorul care a fost ales algoritmic pentru a propune noul bloc.
- Epoca – Epoca în care a fost propus blocul.
- Slotul– Slotul în care a fost propus blocul.
- Atestări – Numărul de atestări incluse în slot. Atestările sunt ca niște voturi care indică faptul că blocul este gata să intre în Lanțul Beacon.

### Validatori {#validators}

Validatorii sunt responsabili cu propunerea blocurilor și cu atestarea acestora în cadrul sloturilor.

- Numărul validatorului– Număr unic care reprezintă validatorul.
- Soldul curent – Soldul validatorului, inclusiv recompensele.
- Soldul efectiv – Soldul validatorului utilizat pentru mizare.
- Venituri – Recompensele sau penalitățile primite de validator.
- Status – Dacă validatorul este în prezent online și activ sau nu.
- Eficacitatea atestării – Timpul mediu necesar includerii în lanţ a atestărilor validatorului.
- Eligibilitate pentru activare – Data (și epoca) când validatorul a devenit disponibil pentru validare.
- Activ de la – Data (și epoca) când validatorul a devenit activ.
- Blocuri propuse – Blocul propus de validator.
- Atestări – Atestările furnizate de validator.
- Depozite – Adresa „de la”, hash-ul tranzacției, numărul blocului, marca temporală, valoarea și starea depozitului de mizare efectuat de validator.

### Atestări {#attestations}

Atestările sunt voturi cu „da” pentru a include blocurile în lanț. Datele lor se referă la o înregistrare a atestării și a validatorilor care au atestat

- Slotul – Slotul în care a avut loc atestarea.
- Indexul comitetului – Indexul comitetului de validatori repartizați în același slot.
- Biți de agregare – Reprezintă atestarea agregată a tuturor validatorilor participanți la atestare.
- Validatorii – Validatorii care au furnizat atestări.
- Rădăcina blocului Beacon – Indică blocul pe care îl atestă validatorii.
- Sursa – Indică cea mai recentă epocă justificată.
- Ținta – Indică ultima limită a epocii.
- Semnătura.

### Rețea {#network-1}

Datele din nivelul cel mai de sus al stratului de consens includ următoarele:

- Epoca actuală.
- Slotul curent.
- Validatorii activi – Numărul de validatori activi.
- Validatorii în așteptare – Numărul de validatori care așteaptă să devină activi.
- ETH-ul mizat – Suma de ETH mizată în rețea.
- Sold mediu – Soldul mediu în ETH al validatorului.

## Exploratori de blocuri {#block-explorers}

- [Etherscan](https://etherscan.io/) – un explorator de blocuri pe care îl puteți utiliza pentru Mainnet-ul Ethereum, Testnet-ul Ropsten, Testnet-ul Kovan, Testnet-ul Rinkeby și Testnet-ul Goerli.
- [Blockscout](https://blockscout.com/) – focuses on the following networks:
  - xDai – o combinație ingenioasă între tehnologia MakerDAO de monede stabile DAI și a tehnologiei POA de sidechain și tokenbridge.
  - POA – Un sidechain şi o reţea autonomă securizată de un grup de validatori de încredere. Toți validatorii din rețea sunt notari din Statele Unite, iar informațiile lor sunt accesibile publicului.
  - Rețea de testare POA Sokol.
  - ARTIS – un blockchain compatibil cu Ethereum.
  - [LUKSO L14](https://blockscout.com/lukso/l14) – L14 funcționează ca prima rețea de testare, pentru a permite comunității LUKSO să construiască și să testeze pe o infrastructură comună.
  - qDai.
- [Etherchain](https://www.etherchain.org/) – un explorator de bloc pentru Mainnet-ul Ethereum.
- [Ethplorer](https://ethplorer.io/) – un explorator de bloc ce se axează pe tokenuri pentru Mainnet-ul Ethereum și testnet-ul Kovan.
- [Blockchair](https://blockchair.com/ethereum) - cel mai privat explorator Ethereum. De asemenea, pentru sortarea și filtrarea datelor (mempool).

## Exploratorii de blocuri ale Lanțului Beacon (nivelului de consens) {#beacon-chain-block-explorers}

- [https://beaconcha.in/](https://beaconcha.in/)
- [https://beaconscan.com/](https://beaconscan.com/)
- [https://ethscan.org/](https://ethscan.org/) (fork al beaconcha.in)

## Referințe suplimentare {#further-reading}

_Cunoaşteţi o resursă comunitară care v-a ajutat? Editaţi această pagină și adăugaţi-o!_

## Subiecte corelate {#related-topics}

- [Minarea](/developers/docs/consensus-mechanisms/pow/mining/)
- [Tranzacții](/developers/docs/transactions/)
- [Conturi](/developers/docs/accounts/)
- [Rețele](/developers/docs/networks/)
