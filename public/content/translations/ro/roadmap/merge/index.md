---
title: Fuziunea
description: Aflați mai multe despre Fuziune, când Rețeaua principală Ethereum a adoptat dovada mizei.
lang: ro
template: upgrade
image: /images/upgrades/merge.png
alt: 
summaryPoint1: Rețeaua principală Ethereum folosește dovada mizei, dar nu a fost întotdeauna așa.
summaryPoint2: Modernizarea de la mecanismul original al dovezii muncii la dovada mizei a purtat numele de Fuziune.
summaryPoint3: Fuziunea se referă la fuziunea dintre Rețeaua principală Ethernet și un blockchain dovada mizei separat, numit Lanțul Beacon, ceea ce acum funcționează ca un singur lanț.
summaryPoint4: Fuziunea a redus consumul de energie al Ethereum cu aproximativ 99,95%.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  Fuziunea a avut loc în 15 septembrie 2022. Aceasta a finalizat tranziția Ethereum la consensul cu dovada mizei, scoțând din uz oficial dovada muncii și reducând consumul de energie cu aproximativ 99,95%.
</UpgradeStatus>

## Ce este Fuziunea? {#what-is-the-merge}

Fuziunea a reprezentat combinarea stratului de execuție original al Ethereum (Rețeaua principală care a existat încă de la [geneză](/history/#frontier)) cu noul strat de consens cu dovada mizei, Lanțul Beacon. Acesta a eliminat nevoie de minare cu un consum mare de energie și, în schimb, a permis ca rețeaua să fie securizată folosind miza ETH. Realizarea viziunii Ethereum a fost un pas cu adevărat extraordinar: mai multă scalabilitate, mai multă securitate și mai multă durabilitate.

<MergeInfographic />

Inițial, [Lanțul Beacon](/roadmap/beacon-chain/) a fost lansat separat de [Rețeaua principală](/glossary/#mainnet). Rețeaua principală Ethereum - cu toate conturile, soldurile, contractele inteligente și starea blockchainului - a continuat să fie securizată prin [dovada muncii](/developers/docs/consensus-mechanisms/pow/), chiar și atunci când Lanțul Beacon funcționa în paralel folosind [dovada mizei](/developers/docs/consensus-mechanisms/pos/). Fuziunea a avut loc când acest două sisteme s-au reunit în cele din urmă și dovada muncii a fost înlocuită permanent de dovada mizei.

Imaginează-ți Ethereum ca o navă spațială care a fost lansată înainte de a fi fost foarte bine pregătită pentru o călătorie interstelară. Prin Lanțul Beacon, comunitatea a construit un motor nou și o carenă întărită. După efectuarea unor teste majore, a venit timpul pentru schimbarea motorului vechi cu cel nou în timpul călătoriei. Aceasta e permis fuziunea motorului nou, mai eficient în nava existentă, ceea ce a dus la câștigarea unui număr mare de ani lumină și la cucerirea universului.

## Fuzionarea cu Mainnet {#merging-with-mainnet}

Dovada muncii a securizat Rețeaua principală Ethereum de la geneză până la Fuziune. Aceasta a permis blockchainului Ethereum pe care îl cunoaștem cu toții să vadă lumina zilei în iulie 2015, cu toate funcțiile sale familiare: tranzacții, contracte inteligente, conturi etc.

De-a lungul istoriei Ethereum, dezvoltatorii s-au pregătit pentru o eventuală tranziție de la dovada muncii la dovada mizei. La 1 decembrie 2020, Lanțul Beacon a fost creat ca un blockchain separat de Rețeaua principală, funcționând în paralel.

Lanțul Beacon nu a prelucrat inițial tranzacții din Rețeaua principală. În schimb, obținea consensul pe cont propriu, punând de acord validatorii activi și soldurile conturilor. După teste ample, a venit momentul în care Lanțul Beacon să ajungă la consens cu privire la datele din lumea reală. După Fuziune, Lanțul Beacon a devenit motorul pentru consens pentru toate datele rețelei, inclusiv tranzacțiile din stratul de execuție și soldurile conturilor.

Fuziunea a reprezentat trecerea oficială la folosirea Lanțului Beacon drept motor al producției de blocuri. Minarea nu mai este mijlocul de producere a blocurilor valide. În schimb, validatorii care utilizează dovada mizei au adoptat acest rol și sunt responsabili acum de prelucrarea validității tuturor tranzacțiilor și de propunerea de blocuri.

Niciun istoric nu a fost pierdut în Fuziune. Când Rețeaua principală a fuzionat cu Lanțul Beacon, a fuzionat cu întregul istoric al tranzacțiilor Ethereum.

<InfoBanner>
Această tranziție la dovada mizei a schimbat felul în care este emis eterul. Aflați mai multe despre <a href="/roadmap/merge/issuance/">emiterea de eter înainte și după Fuziune</a>.
</InfoBanner>

### Utilizatori și deținători {#users-holders}

**Fuziunea nu a schimbat nimic pentru deținători/uilizatori.**

_Acest lucru trebuie repetat_: în calitate de utilizator sau deținător de ETH sau de orice alt activ digital în Ethereum, precum și în calitate de staker care nu operează pe noduri, **nu trebuie să faceți ceva în legătură cu fondurile sau portofelul dumneavoastră în urma Fuziunii.** ETH este pur și simplu ETH. Nu există un „ETH vechi”/„ETH nou” sau „ETH1”/„ETH2”, iar portofelele funcționează după Fuziune exact la fel ca înainte. Cel mai probabil, cei care îți spun altceva sunt escroci.

În ciuda înlocuirii dovezii muncii, întregul istoric al Ethereum de la geneză a rămas intact și nemodificat de trecerea la dovada mizei. Toate fondurile deținute în portofel înainte de Fuziune pot fi accesate în continuare după Fuziune. **Nu trebuie să faci nimic pentru modernizare.**

[Mai multe despre securitatea Ethereum](/security/#eth2-token-scam)

### Operatorii de noduri și dezvoltatorii de aplicații {#node-operators-dapp-developers}

<ExpandableCard
title="Operatori și furnizori ai nodului de mizare"
contentPreview="If you are a staker running your own node setup or a node infrastructure provider, there are a few things you need to be aware of after The Merge."
id="staking-node-operators">

Principalele elemente de acțiune includ: Execută _atât_ un client de consens, cât și un client de execuție; punctele finale terțe pentru obținerea datelor de execuție nu mai funcționează de la Fuziune. 2. Autentifică atât clientul de execuție, cât și cel de consens cu un secret JWT partajat, astfel încât să poată comunica în siguranță. 3. Setează o adresă „destinatar taxă” pentru a primi bacșișuri pentru comisioanele de tranzacție/MEV câștigate.

Dacă nu efectuezi primele două elemente de mai sus, nodul va fi considerat „offline” până când ambele straturi sunt sincronizate și autentificate.

Dacă nu definești un „destinatar pentru taxă”, validatorul va putea acționa în continuare ca de obicei, dar vei rata bacșișurile pentru taxele de tranzacție nearse și MEV pe care le-ai fi câștigat în blocurile propuse de validatorul tău.
</ExpandableCard>

<ExpandableCard
title="Operatori și furnizori de infrastructură ai nodului care nu validează"
contentPreview="If you're operating a non-validating Ethereum node, the most significant change that came with The Merge was the requirement to run clients for BOTH the execution layer AND the consensus layer."
id="node-operators">

Până la momentul Fuziunii, un client de execuție (precum Geth, Erigon, Besu sau Nethermind) a fost suficient pentru a primi, valida corect și propaga blocuri bârfite de rețea. _După Fuziune_, validitatea tranzacțiilor conținute în blocul de execuție depinde și de validitatea „blocului de consens” conținut.

Ca urmare, un nod Ethereum complet necesită atât un client de execuție, cât și un client de consens. Acești doi clienți funcționează împreună folosind un nou API motor. API-ul motor necesită autentificare folosind un secret JWT, oferit pentru ambii clienți pentru a permite comunicații securizate.

Principalele elemente de acțiune includ:

- Instalarea unui client de consens pe lângă un client de execuție
- Autentificarea clientului de execuție și consens cu un secret JWT partajat, astfel încât să poată comunica între ele în siguranță.

Dacă nu efectuezi elementele de mai sus, nodul tău va fi considerat „offline” până când ambele straturi sunt sincronizate și autentificate.

</ExpandableCard>

<ExpandableCard
title="Dezvoltatori de aplicații și de contracte inteligente"
contentPreview="The Merge was designed to have minimal impact on smart contract and dapp developers."
id="developers">

Fuziunea a venit cu modificări ale consensului, care includ și modificări legate de:

- structura blocului
- sincronizare fantă/bloc
- modificări de opcoduri
- surse de randomizare în lanț
- conceptul de _cap sigur_ și _blocuri finalizate_

Pentru mai multe informații, consultați această postare a lui Tim Beiko despre [Impactul Fuziunii asupra Stratului aplicației Ethereum](https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer/).
</ExpandableCard>

## Fuziunea și consumul de energie {#merge-and-energy}

Fuziunea a marcat finalul dovezii muncii pentru Ethereum și începutul unei ere Ethereum mai durabile, mai favorabile pentru mediu. Consumul de energie al Ethereum a scăzut cu aproximativ 99,95%, transformând Ethereum într-un blockchain verde. Află mai multe despre [Consumul de energie al Ethereum](/energy-consumption/).

## Fuziunea și scalarea {#merge-and-scaling}

De asemenea, Fuziunea a creat posibilitatea pentru și mai multe modernizări de scalabilitate care nu erau posibile în sistemul cu dovada muncii, aducând Ethereum cu un pas mai aproape de a atinge amploarea, securitatea și durabilitatea descrise în [Viziunea Ethereum](/roadmap/vision/).

## Neînțelegeri despre Fuziune {#misconceptions}

<ExpandableCard
title="Neînțelegere: &quot;Rularea unui nod necesită mizarea a 32 ETH.&quot;"
contentPreview="False. Anyone is free to sync their own self-verified copy of Ethereum (i.e. run a node). No ETH is required—not before The Merge, not after The Merge, not ever.">
Există două tipuri de noduri Ethereum: noduri care pot propune blocuri și noduri care nu pot propune blocuri.

Nodurile care propun blocuri sunt doar un număr mic din numărul total de noduri pe Ethereum. Această categorie include noduri de minare în dovada muncii (PoW) și noduri de validator în dovada mizei (PoS). Această categorie necesită angajarea de resurse economice (precum puterea hashului pentru GPU în dovada muncii sau ETH mizat în dovada mizei) în schimbul posibilității de a propune ocazional următorul bloc și de a câștiga recompense acordate de protocol.

Celelalte noduri ale rețelei (adică majoritatea) nu necesită angajarea de resurse economice mai mari în plus față de un computer de uz general cu o capacitate de stocare liberă de 1-2 TB și o conexiune la internet. Aceste noduri nu propun blocuri, dar continuă să joace un rol esențial în asigurarea securității rețelei prin tragerea la răspundere a tuturor inițiatorilor de blocuri, prin detectarea noilor blocuri și verificarea validității acestora la sosire, în conformitate cu regulile de consens ale rețelei. Dacă blocul este valid, nodul continuă propagarea acestuia prin rețea. Dacă blocul nu este valid indiferent de motiv, software-ul nod îl va ignora ca nefiind valid și va opri propagarea.

Execuția unui nod care nu produce blocuri este posibilă pentru oricine, indiferent de mecanismul de consens (dovada muncii sau dovada mizei); acest lucru este _puternic încurajat_ pentru toți utilizatorii care au mijloacele necesare. Rularea unui nod este extrem de valoroasă pentru Ethereum și oferă beneficii suplimentare oricărei persoane care operează propriul nod, precum securitate, confidențialitate îmbunătățite și rezistență la cenzură.

Capacitatea oricui de a rula propriul nod este _absolut esențială_ pentru păstrarea unei rețele Ethereum descentralizate.

[Mai multe despre rularea propriului nod](/run-a-node/)

</ExpandableCard>

<ExpandableCard
title="Neînțelegere: &quot;Fuziunea nu a reușit să scadă costurile cu gazul.&quot;"
contentPreview="False. The Merge was a change of consensus mechanism, not an expansion of network capacity, and was never intended to lower gas fees.">
Taxele pentru gaz sunt produsul cererii rețelei în funcție de capacitatea rețelei. Fuziunea a scos din uz dovada muncii, realizând tranziția la dovada mizei pentru consens, dar nu a modificat în mod semnificativ parametrii care influențează direct capacitatea rețelei sau debitul.

Cu o [foaie de parcurs centrată pe regrupare](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698), eforturile sunt concentrate pe scalarea activității utilizatorului la [stratul 2](/layer-2/), în timp ce se activează stratul 1 al Rețelei principale ca un strat de soluționare descentralizat, securizat și optimizat pentru stocarea datelor de rollup pentru a face tranzacțiile rollup exponențial mai ieftine. Tranziția la dovada mizei este un precursor esențial pentru acest lucru. [Mai multe despre gaz și taxe.](/developers/docs/gas/)
</ExpandableCard>

<ExpandableCard
title="Neînțelegere: &quot;Tranzacțiile au fost accelerate substanțial de Fuziune.&quot;"
contentPreview="False. Though some slight changes exist, transaction speed is mostly the same on layer 1 now as it was before The Merge.">
„Viteza” unei tranzacții poate fi măsurată în câteva moduri, inclusiv timpul care trebuie inclus într-un bloc și timpul până la finalizare. Ambele se modifică puțin, dar nu într-un mod pe care utilizatorii îl vor observa.

Din punct de vedere istoric, în ceea ce privește dovada muncii, obiectivul a fost crearea unui bloc nou la fiecare ~13,3 secunde. În cazul dovezii mizei, fantele apar precis la fiecare 12 secunde, fiecare dintre acestea fiind o oportunitate pentru ca un validator să publice un bloc. Cele mai multe fante au blocuri, dar nu neapărat toate (adică un validator este offline). În cazul dovezii mizei, blocurile sunt generate cu ~10% mai frecvent decât în cazul dovezii muncii. Această schimbare este destul de nesemnificativă și este puțin probabil să fie observată de utilizatori.

Dovada mizei a introdus conceptul de finalitate a tranzacției, care nu exista anterior. În cazul dovezii muncii, capacitatea de a inversa un bloc devine exponențial mai dificilă cu fiecare bloc creat peste o tranzacție, dar nu ajunge niciodată la zero. În cazul dovezii mizei, blocurile sunt grupate în epoci (perioade de timp de 6,4 minute, cu 32 de șanse pentru blocuri), pe care validatorii le votează. Când o epocă se încheie, validatorii votează dacă epoca este „justificată”. Dacă validatorii sunt de acord să justifice epoca, aceasta se finalizează în următoarea epocă. Anularea tranzacțiilor finalizate nu este viabilă economic, deoarece ar necesita obținerea și arderea a mai mult de o treime din ETH mizat total.

</ExpandableCard>

<ExpandableCard
title="Neînțelegere: &quot;Fuziunea a permis retragerea mizelor.&quot;"
contentPreview="False. Staking withdrawals are not yet enabled with The Merge. The following Shanghai upgrade will enable staking withdrawals.">
ETH mizat și recompensele pentru mizare continuă să fie blocate fără posibilitatea de retragere. Retragerile sunt planificate pentru viitoarea actualizare Shanghai.
</ExpandableCard>

<ExpandableCard
title="Neînțelegere: &quot;Validatorii nu vor primi recompense de ETH lichid până la actualizarea Shanghai, când sunt activate retragerile.&quot;"
contentPreview="False. Fee tips/MEV are credited to a non-staking account controlled by the validator, available immediately.">
Acest lucru poate părea contraintuitiv față de nota de mai sus, conform căreia retragerile nu sunt activate până la actualizarea Shanghai, dar validatorii AU acces imediat la recompensele pentru taxe/MEV dobândite în timpul propunerilor de bloc.

Protocolul emite ETH drept recompensă validatorilor pentru contribuția la consens. Stratul de consens reprezintă noul ETH emis, unde un validator are o adresă unică ce conține ETH mizat și recompensele pentru protocol. Acest ETH este blocat până la actualizarea Shanghai.

ETH de pe stratul de execuție este contabilizat separat de stratul de consens. Când utilizatorii execută tranzacții în Rețeaua principală Ethereum, ETH trebuie plătit pentru achitarea costului gazului, inclusiv un comision pentru validator. Acest ETH se află deja pe stratul de execuție, NU este nou emis de protocol și este disponibil pentru validator imediat (cu condiția furnizării unei adrese corecte a „destinatarului taxei” în software-ul client).
</ExpandableCard>

<ExpandableCard
title="Neînțelegere: &quot;Când retragerile sunt activate, toți stakerii vor pleca în același timp.&quot;"
contentPreview="False. Validator exits are rate limited for security reasons.">
După ce actualizarea Shanghai permite retragerile, toți validatorii vor fi stimulați să retragă soldul mizei peste 32 ETH, deoarece aceste fonduri nu se adaugă la randament și, în caz contrar, vor fi blocate. În funcție de APR (stabilit de ETH total mizat), aceștia ar putea fi stimulați să abandoneze validatorul(ii) pentru a-și recupera întregul sold sau, poate, pentru a miza și mai mult recompensele, pentru a obține un randament și mai bun.

O precizare importantă și necesară aici, ieșirile complete ale validatorului sunt limitate de protocol, prin urmare doar șase validatori pot ieși pentru fiecare epocă (la fiecare 6,4 minute, prin urmare 1350 pe zi sau doar aproximativ 43.200 ETH pe zi din 10 milioane ETH mizate). Această limită a ratei se ajustează în funcție de ETH total mizat și împiedică un exod de fonduri în masă. În plus, împiedică un potențial atacator să folosească miza pentru a comite un atacat penalizabil și să retragă tot soldul mizat în aceeași epocă înainte ca protocolul să poată aplica penalitatea.

APR este dinamic în mod intenționat, permițând stakerilor să găsească un echilibru pentru cât de mult sunt dispuși să fie plătiți pentru a ajuta la securizarea rețelei. Când retragerile sunt activate, dacă rata este prea mică, validatorii se vor retrage la o rată limitată de protocol. Treptat, acest lucru crește APR pentru toți cei care rămân, atrăgând stakeri noi sau care revin.
</ExpandableCard>

## Ce s-a întâmplat cu „Eth2”? {#eth2}

Termenul „Eth” a devenit perimat. După fuzionarea „Eth1” și „Eth2” într-un singur lanț, nu mai există nevoia de a distinge între două rețele Ethereum. Există doar Ethereum.

Pentru a limita confuziile, comunitatea a actualizat acești termeni:

- „Eth1” este acum „stratul de execuție”, care gestionează tranzacțiile și execuția.
- „Eth2” este acum „stratul de consens”, care gestionează consensul pentru dovada mizei.

Aceste actualizări ale terminologiei modifică numai convențiile pentru denumiri, și nu obiectivele sau foaia de parcurs a lui Ethereum.

[Aflați mai multe despre noua denumire 'Eth2'](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/)

## Relațiile dintre actualizări {#relationship-between-upgrades}

Toate actualizările Ethereum se află într-o anumită corelație. Să recapitulăm cum este corelată Fuziunea cu celelalte actualizări.

### Fuziunea și Lanțul Beacon {#merge-and-beacon-chain}

Fuziunea reprezintă adoptarea formală a Lanțului Beacon ca noul strat de consens pentru stratul de execuție original al Rețelei principale. De la Fuziune, validatorii sunt alocați pentru a securiza Rețeaua principală Ethereum, iar minarea pe [dovada muncii](/developers/docs/consensus-mechanisms/pow/) nu mai este un mijloc valid de producere a blocurilor.

În schimb, blocurile sunt propuse prin validarea nodurilor care dețin ETH mizat în schimbul dreptului de a participa la consens. Aceste modernizări au deschis drumul pentru viitoarele modernizări de scalabilitate, inclusiv pentru fragmentare.

<ButtonLink href="/roadmap/beacon-chain/">
  Lanțul Beacon
</ButtonLink>

### Fuziunea și actualizarea Shanghai {#merge-and-shanghai}

Pentru a simplifica și maximiza o tranziție rapidă și de succes la dovada mizei, modernizarea Fuziune nu a inclus anumite funcții anticipate, precum posibilitatea de a retrage ETH mizat. Actualizarea Shanghai este planificată să urmeze Fuziunii, ceea ce va permite stakerilor să efectueze retragerea.

Rămâi la curent cu [planificarea actualizării Shanghai pe GitHub](https://github.com/ethereum/pm/issues/450) sau pe [Blogul pentru cercetare și dezvoltare al Fundației Ethereum](https://blog.ethereum.org/category/research-and-development/). Curioșii pot afla mai multe despre [Ce se întâmplă după Fuziune](https://youtu.be/7ggwLccuN5s?t=101), o prezentare efectuată de Vitalik la evenimentul ETHGlobal din aprilie 2021.

### Fuziunea și fragmentarea {#merge-and-data-sharding}

Inițial, se prevedea ca fragmentarea să fie implementată înainte ca Fuziunea să rezolve problema scalabilității. Cu toate acestea, odată cu avântul [nivelului 2 al soluțiilor de scalare](/layer-2/), prioritatea s-a mutat pe schimbarea dovezii muncii cu dovada mizei.

Planurile pentru fragmentare evoluează rapid, dar, având în vedere apariția și succesul tehnologiilor de nivelul 2 pentru scalarea executării tranzacției, planurile pentru fragmentare au fost reorientate către găsirea modalității optime de distribuire a problemei de stocare a datelor de apel comprimate din contractele rollup, permițând creșterea exponențială a capacității rețelei. Acest lucru nu ar fi posibil fără a se trece mai întâi la dovada mizei.

<ButtonLink href="/roadmap/danksharding/">
  Fragmentarea
</ButtonLink>

## Referințe suplimentare {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />
