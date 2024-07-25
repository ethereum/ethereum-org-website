---
title: Guvernanța în Ethereum
description: Introducere despre modul în care se iau deciziile cu privire la Ethereum.
lang: ro
---

# Introducere despre guvernanța în Ethereum {#introduction}

_Dacă nimeni nu deține Ethereum, cum se iau deciziile cu privire la modificările trecute și viitoare ale lui Ethereum? Guvernanța în Ethereum se referă la procesul care permite luarea unor astfel de decizii_

<Divider />

## Ce este guvernanța? {#what-is-governance}

Guvernanța reprezintă sistemele existente care permit luarea deciziilor. Într-o structură organizațională tipică, echipa executivă sau un consiliu de administrație poate avea ultimul cuvânt în luarea deciziilor. Sau poate că acționarii votează propunerile de a adopta schimbări. Într-un sistem politic, oficialii aleși pot adopta o legislație care încearcă să reprezinte dorințele alegătorilor lor.

## Guvernanța descentralizată {#decentralized-governance}

Nicio persoană nu deține sau controlează protocolul Ethereum, totuși trebuie luate decizii cu privire la punerea în aplicare a schimbărilor pentru a asigura cât mai bine longevitatea și prosperitatea rețelei. Întrucât nu este proprietatea nimănui, guvernanța organizațională tradițională este o soluție incompatibilă.

## Guvernanța în Ethereum {#ethereum-governance}

Guvernanța în Ethereum este procesul prin care se fac modificările protocolului. Este important să subliniem faptul că acest proces nu este legat de modul în care oamenii și aplicațiile utilizează protocolul - Ethereum este fără permisiuni. Oricine, de oriunde din lume, poate participa la activitățile on-chain. Nu există reguli care să stabilească cine poate sau nu să construiască o aplicație sau să trimită o tranzacție. Cu toate acestea, există un proces prin care se pot propune modificări ale protocolului de bază, pe care rulează aceste aplicații. Deoarece atât de mulți oameni depind de stabilitatea lui Ethereum, există un prag de coordonare foarte ridicat pentru modificările de bază, inclusiv procese sociale și tehnice, pentru a se asigura că orice modificări aduse proiectului Ethereum sunt sigure și sprijinite pe scară largă de către comunitate

### Guvernanța on-chain în comparație cu guvernanța off-chain {#on-chain-vs-off-chain}

Tehnologia blockkchain permite noi capacități de guvernanță, cunoscute sub numele de guvernanță on-chain. Guvernanța on-chain este atunci când propunerile de modificare a protocolului sunt decise prin votul părților interesate, de obicei de deținătorii unui token de guvernanță, iar votul are loc pe blockchain. Cu anumite forme de guvernanță on-chain, modificările propuse la protocol sunt deja scrise în cod și sunt implementate automat dacă părțile interesate aprobă modificările.

Abordarea opusă, guvernanța off-chain, este cea în care orice decizie de modificare a protocolului are loc printr-un proces informal de discuții sociale, iar dacă este aprobată, va fi integrată în cod.

**Guvernanța în Ethereum are loc off-chain** și în proces sunt implicate o mare varietate de părți interesate.

_În timp ce, la nivel de protocol, guvernanța în Ethereum este off-chain, în numeroase cazuri sistemele dezvoltate pe Ethereum, cum ar fi organizațiile DAO, utilizează guvernanța on-chain._

<ButtonLink href="/dao/">
  Mai multe despre organizațiile DAO
</ButtonLink>

<Divider />

## Cine este implicat? {#who-is-involved}

În [comunitatea Ethereum](/community/) există mai multe părți interesate, fiecare jucând un rol în procesul de guvernanță. Pornind de la părțile interesate cele mai îndepărtate de protocol și făcând un zoom înainte, avem:

- **Deținătorii de Ether**: aceste persoane dețin o cantitate arbitrară de ETH. [Mai multe despre ETH](/eth/).
- **Utilizatorii aplicațiilor**: aceste persoane interacționează cu aplicațiile de pe blockchain-ul Ethereum.
- **Dezvoltatorii de aplicații/instrumente**: aceste persoane scriu aplicații care sunt rulate pe blockchain-ul Ethereum (de ex., DeFi, NFT-uri etc.) sau construiesc instrumente pentru a interacționa cu Ethereum (de ex., portofele, serii de testări etc.). [Mai multe despre dapp-uri](/dapps/).
- **Operatori de noduri**: aceste persoane rulează noduri care propagă blocuri și tranzacții, respingând orice tranzacție sau bloc invalid cu care se întâlnesc. [Mai multe despre noduri](/developers/docs/nodes-and-clients/).
- **Autorii de EIP-uri**: aceste persoane propun modificări ale protocolului Ethereum, sub forma de Propuneri de îmbunătățire pentru Ethereum (EIP-uri). [Mai multe despre EIP-uri](/eips/).
- **Miner-ii/Validatorii**: aceste persoane rulează noduri care pot adăuga blocuri noi la blockchain-ul Ethereum.
- **Dezvoltatorii de protocoale** (a.k.a. „Core Developers” (sau „Dezvoltatorii de bază”): aceste persoane întrețin diferitele implementări Ethereum (de ex. go-ethereum, Nethermind, Besu, Erigon la nivelul de execuție sau Prysm, Lighthouse, Nimbus, Teku, Lodestar la nivelul de consens). [Mai multe despre clienții Ethereum](/developers/docs/nodes-and-clients/).

_Notă: orice persoană poate face parte din mai multe dintre aceste grupuri (de exemplu, un dezvoltator de protocoale ar putea să promoveze un EIP, să ruleze un validator de Lanț Beacon și să utilizeze aplicațiile DeFi). Totuși, pentru claritate conceptuală, cel mai simplu este să se facă o diferențiere între acestea._

<Divider />

## Ce este un EIP? {#what-is-an-eip}

Un proces important folosit în guvernanța Ethereum este cel al sugerării de **Propuneri de îmbunătățire pentru Ethereum (EIP-uri)**. EIP-urile sunt standarde care specifică potențiale caracteristici sau procese noi pentru Ethereum. Oricine din comunitatea Ethereum poate crea un EIP. De exemplu, niciunul dintre autorii EIP-721, EIP-ul care a standardizat NFT-urile, nu a lucrat direct la dezvoltarea protocolului Ethereum.

<ButtonLink href="/eips/">
  Mai multe despre EIP-uri
</ButtonLink>

<Divider />

## Procedura oficială {#formal-process}

Procedura oficială de introducere a unor modificări ale Protocolului Ethereum este următoarea:

1. **Propuneţi un EIP de bază**: așa cum este descris în [EIP-1](https://eips.ethereum.org/EIPS/eip-1#core-eips), primul pas pentru a propune în mod oficial o modificare la Ethereum este de a o prezenta în detaliu într-un EIP de bază. Aceasta va servi drept specificație oficială pentru un EIP pe care dezvoltatorii de protocoale îl vor pune în aplicare dacă va fi acceptat.

2. **Prezentați-vă EIP-ul Dezvoltatorilor de protocoale**: odată ce aveți un EIP de bază pentru care ați strâns opiniile din partea comunității, trebuie să îl prezentați Dezvoltatorilor de protocoale. Puteți face acest lucru propunându-l pentru discuții într-un apel [AllCoreDevs](https://github.com/ethereum/execution-specs/tree/master/network-upgrades#getting-the-considered-for-inclusion-cfi-status). Este probabil ca unele discuții să fi avut deja loc în mod asincron pe forumul [Ethereum Magician](https://ethereum-magicians.org/) sau pe canalul [Ethereum R&D Discord](https://discord.gg/mncqtgVSVw).

> Rezultatele potențiale ale acestei etape sunt:

> - EIP-ul va fi luat în considerare pentru o viitoare modernizare a rețelei
> - Vor fi solicitate modificări tehnice
> - EIP-ul poate fi respins dacă nu este considerat o prioritate sau dacă îmbunătățirea nu este suficientă pentru a justifica eforturile de dezvoltare

3. **Iteraţi până la propunerea finală**: după primirea feedback-ului de la toate părțile interesate, probabil că va trebui să faceți modificări la propunerea dvs. inițială pentru a îmbunătăți securitatea sau pentru a răspunde mai bine nevoilor diferiților utilizatori. Odată ce EIP-ul dvs. a încorporat toate modificările pe care le consideraţi necesare, va trebui să îl prezentați din nou Dezvoltatorilor de protocoale. Apoi veți trece la următoarea etapă a acestui proces sau vor apărea noi preocupări, care vor necesita o nouă rundă de iterații cu privire la propunerea dvs.

4. **Includerea EIP-ului în Actualizarea rețelei**: dacă presupunem că EIP-ul este aprobat, testat și implementat, se face programarea acestuia în cadrul actualizării rețelei. Având în vedere costurile ridicate de coordonare a actualizărilor reţelei (toată lumea trebuie să efectueze actualizarea simultan), EIP-urile sunt în general grupate laolaltă în actualizări.

5. **Activarea actualizării reţelei**: după activarea rețelei actualizate, EIP-ul va fi live pe rețeaua Ethereum. _Observaţie: actualizările rețelei sunt de obicei activate pe testnet-uri înainte de a fi activate pe Mainnet-ul Ethereum._

Acest parcurs, deși foarte simplificat, oferă o imagine de ansamblu a etapelor semnificative pentru activarea unei modificări de protocol pe Ethereum. Iar acum haideți să aruncăm o privire la factorii informali care intervin în cadrul acestui proces.

## Procesul informal {#informal-process}

### Înțelegerea a ceea ce s-a realizat anterior {#prior-work}

Campionii EIP-ului ar trebui să se familiarizeze cu realizările și propunerile anterioare înainte de a crea un EIP care să poată fi luat în considerare în mod serios pentru a fi implementat pe Mainnet-ul Ethereum. În acest fel, EIP-ul sperăm că aduce ceva nou, care nu a mai fost respins înainte. Cele trei locuri principale pentru a se informa despre aceasta sunt [depozitarul EIP-ului](https://github.com/ethereum/eips), [Ethereum Magicians](https://ethereum-magicians.org/) și [ethresear.ch](https://ethresear.ch/).

### Grupuri de lucru {#working-groups}

Este puțin probabil ca proiectul inițial al unui EIP să fie implementat pe Mainnet-ul Ethereum fără editări sau modificări. În general, Campionii EIP-urilor vor lucra cu un subset de Dezvoltatori de protocoale pentru a-şi specifica, implementa, testa, itera și finaliza propunerea. Din punct de vedere istoric, grupurile acestea de lucru au necesitat mai multe luni (și uneori ani!) de muncă. În mod similar, pentru astfel de schimbări, campionii EIP-ului ar trebui să implice din timp dezvoltatori relevanți de aplicații/instrumente în eforturile lor de a colecta feedback-ul utilizatorilor finali și de a atenua orice riscuri în implementare.

### Consensul comunității {#community-consensus}

În timp ce unele EIP-uri sunt îmbunătățiri tehnice simple, cu nuanțe minime, altele sunt mai complexe și sunt în mod inerent compromisuri care vor afecta diferite părți interesate în moduri diferite. Acest lucru înseamnă că unele EIP-uri ajung să fie mai controversate în cadrul comunității decât altele.

Nu există un manual clar cu tacticile sau metodele de abordare a propunerilor controversate. Deoarece dezvoltatorii de protocoale nu au nicio modalitate de a forța oamenii să adopte actualizări ale rețelei, aceștia vor evita, în general, punerea în aplicare a EIP-urilor în cazul în care controversele depășesc beneficiile pentru întreaga comunitate.

Campionii EIP-ului sunt așteptați să solicite feedback-ul din partea tuturor părților interesate relevante. Dacă sunteți înșivă campionul unui EIP controversat, ar trebui să încercați să soluționați obiecțiile pentru a obține un consens asupra EIP-ului dvs. Având în vedere dimensiunea și diversitatea comunității Ethereum, nu există o singură măsura (de ex. un „vot cu monede”) care poate fi utilizată pentru a evalua consensul comunității, și se preconizează pentru campionii EIP-ului să se adapteze la circumstanțele propunerii lor.

Dincolo de securitatea rețelei Ethereum, o importanță semnificativă a fost atribuită în mod istoric de către dezvoltatorii de protocoale valorilor apreciate de „Dezvoltatorii de aplicații/instrumente” și „Utilizatorii de aplicații”, având în vedere faptul că activitatea lor de utilizare și dezvoltare pe Ethereum este cea care face ecosistemul atractiv pentru alte părți interesate. În plus, EIP-urile trebuie puse în aplicare în toate implementările clienților, care sunt gestionate de echipe distincte. Din acest proces face parte de obicei acțiunea de a convinge mai multe echipe de dezvoltatori de protocoale că o anumită modificare este valoroasă și că ajută utilizatorii finali sau rezolvă o problemă de securitate.

<Divider />

## Gestionarea dezacordurilor {#disagreements}

Faptul că multe părți interesate au motivații și convingeri diferite înseamnă că dezacordurile nu sunt neobișnuite.

În general, dezacordurile sunt tratate prin discuții îndelungate în cadrul forumurilor publice pentru a înțelege rădăcina problemei și pentru a permite oricui să își spună părerea. De obicei, un grup cedează sau se ajunge la un compromis. În cazul în care un grup se simte suficient de puternic, impunerea forțată a unei anumite schimbări ar putea duce la o divizare în lanț. O divizare a lanțului apare atunci când unele părți interesate protestează față de punerea în aplicare a unei schimbări de protocol, ceea ce duce la versiuni diferite și incompatibile ale protocolului de operare, din care rezultă două blockchain-uri distincte.

### Forkul DAO {#dao-fork}

Un fork sau o bifurcare se produce atunci când trebuie efectuate actualizări sau modificări tehnice majore în rețea și trebuie modificate „regulile" protocolului. [Clienții Ethereum](/developers/docs/nodes-and-clients/) trebuie să-și actualizeze software-ul pentru a implementa noile reguli de forking.

Forkul DAO a fost introdus ca răspuns la [atacul DAO din 2016](https://www.coindesk.com/understanding-dao-hack-journalists) când, din cauza lipsei de protecție, un contract [DAO](/glossary/#dao) a fost golit de peste 3,6 milioane ETH prin piratare. Forkul a mutat fondurile din contractul defectuos într-un nou contract, permițând oricui a pierdut fonduri în urma piratării să le recupereze.

Această măsură a fost votată de comunitatea Ethereum. Orice deținător de ETH a putut vota printr-o tranzacție pe [o platformă de vot](http://v1.carbonvote.com/). Decizia de forking a atins peste 85% din voturi.

Este important de reținut că, deși protocolul s-a bifurcat pentru a inversa piratarea, ponderea votului în decizia de forking este discutabilă din câteva motive:

- Prezența la vot a fost incredibil de scăzută
- Majoritatea oamenilor nu au știut că se votează
- Votul a reprezentat doar deținătorii de ETH, nu și ceilalți participanți la sistem

Un subset al comunității a refuzat să se bifurce, în principal deoarece au fost de părere că incidentul DAO nu s-a datorat unui defect de protocol. Ei au continuat să formeze [Ethereum Classic](https://ethereumclassic.org/).

Astăzi, comunitatea Ethereum a adoptat o politică de neintervenție în cazurile de erori de contract sau de pierdere de fonduri pentru a menține neutralitatea credibilă a sistemului.

Aflați mai multe despre pirateria DAO:

<YouTube id="rNeLuBOVe8A" />

<Divider />

### Utilitatea forkingului {#forking-utility}

Forkingul în Ethereum/Ethereum Classic este un exemplu excelent de bifurcare utilă. Am avut două grupuri care au fost în dezacord suficient de puternic între ele în privința unor valori fundamentale pentru a considera că meritau riscurile ce ar fi decurs din acele măsuri anume.

Capacitatea de a crea un fork în fața unor diferențe politice, filosofice sau economice semnificative joacă un rol important în succesul guvernanței în Ethereum. Fără capacitatea de a crea un fork, alternativa era o continuă luptă internă, o participare forțată și reținută a celor care au format în cele din urmă Ethereum Classic și o viziune din ce în ce mai diferită a imaginii succesului pentru Ethereum.

<Divider />

## Dezvoltarea Lanțului Beacon {#beacon-chain}

Procesul de guvernanță în Ethereum sacrifică adesea viteza și eficiența în favoarea deschiderii și incluziunii. Pentru accelerarea dezvoltării lanțului Beacon, acesta a fost lansat separat de pe rețeaua Ethereum bazată pe dovada-muncii și urmează propriile sale practici de guvernanță.

Deși dezvoltarea specificațiilor și implementărilor a fost întotdeauna complet deschisă, procesele formale utilizate pentru a propune actualizările descrise mai sus nu au fost folosite. Acest lucru a permis ca modificările să fie specificate și convenite mai rapid de către cercetători și promotori.

Când Lanțul Beacon se va uni cu nivelul execuției în Ethereum, procesul de guvernanță pentru a propune modificări va fi armonizat. Acest proces de implementare a fuziunii este [deja în curs de desfășurare](https://eips.ethereum.org/EIPS/eip-3675).

<ButtonLink href="/roadmap/merge/">
  Mai multe despre fuziune
</ButtonLink>

<Divider />

## Cum pot să mă implic? {#get-involved}

- [Propuneți un EIP](/eips/#participate)
- [Discutați propunerile actuale](https://ethereum-magicians.org/)
- [Implicați-vă în discuțiile R&D](https://ethresear.ch/)
- [Veniți pe canalul Ethereum R&D pe Discord](https://discord.gg/mncqtgVSVw)
- [Rulați un nod](/developers/docs/nodes-and-clients/run-a-node/)
- [Contribuiți la dezvoltarea clienților](/developers/docs/nodes-and-clients/#execution-clients)
- [Programul de ucenicie pentru dezvoltatorii de bază](https://blog.ethereum.org/2021/09/06/core-dev-apprenticeship-second-cohort/)

## Referințe suplimentare {#further-reading}

Guvernanța în Ethereum nu este definită rigid. Diverși participanți ai comunității au perspective diferite în această privință. Iată câteva dintre acestea:

- [Note cu privire la Guvernanța Blockchain-ului](https://vitalik.eth.limo/general/2017/12/17/voting.html) - _Vitalik Buterin_
- [Cum funcționează guvernanța în Ethereum?](https://cryptotesters.com/blog/ethereum-governance) – _Cryptotesters_
- [Cum funcționează guvernarea în Ethereum](https://medium.com/coinmonks/how-ethereum-governance-works-71856426b63a) – _Micah Zoltu_
- [Ce este un dezvoltator de bază în Ethereum?](https://hudsonjameson.com/2020-06-22-what-is-an-ethereum-core-developer/) - _Hudson Jameson_
- [Guvernanța, Partea a 2-a: Plutocrația este încă gravă](https://vitalik.eth.limo/general/2018/03/28/plutocracy.html) - _Vitalik Buterin_
- [Depășirea guvernării prin votul cu monede](https://vitalik.eth.limo/general/2021/08/16/voting3.html) - _Vitalik Buterin_
