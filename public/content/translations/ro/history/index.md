---
title: Istoricul şi fork-urile lui Ethereum
description: Un istoric al blockchain-ului Ethereum care cuprinde repere majore, lansări și fork-uri.
lang: ro
sidebarDepth: 1
---

# Istoricul lui Ethereum {#the-history-of-ethereum}

O cronologie a tuturor reperelor majore, a fork-urilor și actualizărilor blockchain-ului Ethereum.

<ExpandableCard title="Ce sunt fork-urile?" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

Fork-urile apar atunci când trebuie făcute actualizări tehnice sau modificări majore în rețea – acestea provin de obicei din [Propunerile de îmbunătățire pentru Ethereum (EIP)](/eips/) și modifică „regulile” protocolului.

Atunci când sunt necesare actualizări în software-ul tradițional, controlat central, compania doar va publica o nouă versiune pentru utilizatorul final. Blockchain-ul funcționează diferit, deoarece nu există proprietate centrală. [Clienții Ethereum](/developers/docs/nodes-and-clients/) trebuie să își actualizeze software-ul pentru a implementa noile reguli de fork-uri. În plus, creatorii de blocuri (miner-ii într-o lume a dovezii-muncii, validatorii într-o lume a dovezii-mizei) și nodurile trebuie să creeze blocuri și să valideze conform noilor reguli. [Mai multe despre mecanismele de consesn]/(developers/docs/consensus-mechanisms/)

Aceste schimbări de reguli pot crea o separare temporară în rețea. Pot fi produse blocuri noi conform regulilor noi sau celor vechi. Se convine în avans asupra creării fork-urilor, astfel încât clienții să adopte schimbările la unison și fork-ul cu actualizările să devină lanțul principal. Cu toate acestea, în cazuri rare, dezacordurile asupra fork-urilor pot determina divizarea permanentă a rețelei – cea mai cunoscută fiind crearea lui Ethereum Classic cu [fork-ul DAO](#dao-fork).

</ExpandableCard>

Sunteți în căutarea unor viitoare actualizări ale protocolului? [Aflați despre viitoarele actualizări ale lui Ethereum](/roadmap/).

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Rezumat {#arrow-glacier-summary}

Actualizarea Arrow Glacier a amânat [bomba de dificultate](/glossary/#difficulty-bomb) cu câteva luni. Aceasta este singura modificare introdusă în această actualizare și este similară ca natură cu actualizarea [Muir Glacier](#muir-glacier). Modificări similare au fost efectuate cu actualizările [Byzantium](#byzantium), [Constantinople](#constantinople) și [Londra](#london) ale reţelei.

- [Blogul EF - Anunțul actualizării Arrow Glacier](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders - Actualizarea Ethereum Arrow Glacier](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="EIP-urile Arrow Glacier" contentPreview="Official improvements included in this upgrade.">

- [EIP-4345](https://eips.ethereum.org/EIPS/eip-4345) – _amână bomba de dificultate până în iunie 2022_

</ExpandableCard>

#### <Emoji text=":police_car_light:" size={1} className="me-2" />Operatorii de noduri {#arrow-glacier-node-operators}

Aveţi grijă să vă actualizați software-ul client la versiunea cea mai recentă înainte de 5 decembrie 2021, pentru a justifica timpii de bloc variabili. Aceasta va evita sincronizarea clientului dvs. cu un lanț pre-fork, care va avea ca rezultat imposibilitatea de a trimite fonduri sau de a verifica în mod corect tranzacțiile.

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### Rezumat {#altair-summary}

Actualizarea Altair a fost prima actualizare programată pentru [Lanțul Beacon](/roadmap/beacon-chain). A adăugat acceptarea „comitetelor de sincronizare”—prin activarea clienților light (ușori) și aducând penalităţi pentru inactivitatea și slashing-ul validatorului la valorile lor maxime.

- [Citiţi specificaţiile actualizărilor Altair](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" />Un fapt amuzant! {#altair-fun-fact}

Altair a fost prima actualizare majoră a rețelei care a avut o dată exactă de lansare. Toate actualizările anterioare s-au bazat pe un număr de bloc declarat pe lanțul dovezii-muncii (PoW), unde timpii de bloc variază. Lanțul Beacon nu necesită rezolvarea de calcule ca dovadă-a-muncii (PoW), ci funcționează pe un sistem de epoci bazate pe timp, sistem care constă din 32 de „sloturi” de timp de 12 secunde în care validatorii pot propune blocuri. Acesta este motivul pentru care am știut exact când vom atinge epoca 74.240 și Altair va deveni funcțional!

- [Beaconcha.in Glosar - Sloturi](https://kb.beaconcha.in/glossary#slots)

---

### Londra {#london}

<NetworkUpgradeSummary name="london" />

#### Rezumat {#london-summary}

Actualizarea Londra a introdus [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), care a reformat piața de taxe de tranzacționare, precum și schimbările modului de gestionare a rambursărilor de gaz și ale programării [Erei glaciare](/glossary/#ice-age).

- [Sunteți dezvoltator de aplicații dApp? Aveţi grijă să vă actualizați bibliotecile și instrumentele.](https://github.com/ethereum/eth1.0-specs/blob/master/network-upgrades/ecosystem-readiness.md)
- [Citiţi anunțul Fundației Ethereum](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Citiţi explicatorul Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="EIP-urile Londra" contentPreview="Official improvements included in this upgrade.">

- [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) – _îmbunătățește piața taxelor de tranzacționare_.
- [EIP-3198](https://eips.ethereum.org/EIPS/eip-3198) – _returnează `BASEFEE` de la un bloc_.
- [EIP-3529](https://eips.ethereum.org/EIPS/eip-3529) – _reduce rambursările de gaz pentru operațiunile EVM_.
- [EIP-3541](https://eips.ethereum.org/EIPS/eip-3541) – _împiedică implementarea contractelor care încep cu `0xEF`_
- [EIP-3554](https://eips.ethereum.org/EIPS/eip-3554) – _întârzie Era glaciară până în decembrie 2021_

</ExpandableCard>

---

### Berlin {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### Rezumat {#berlin-summary}

Actualizarea Berlin a optimizat costul gazului pentru anumite acțiuni EVM și crește acceptarea mai multor tipuri de tranzacții.

- [Citiţi anunțul Fundației Ethereum](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Citiţi explicatorul Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="EIP-urile Berlin" contentPreview="Official improvements included in this upgrade.">

- [EIP-2565](https://eips.ethereum.org/EIPS/eip-2565) – _reduce costul gazului ModExp_.
- [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) – _permite acceptarea mai ușoară a mai multor tipuri de tranzacții_.
- [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929) – _crește costul gazului pentru opcodurile accesului la stare_.
- [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) – _adăugă liste de acces opționale_

</ExpandableCard>

<Divider />

## 2020 {#2020}

### Geneza Lanțului Beacon {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### Rezumat {#beacon-chain-genesis-summary}

[Lanțul Beacon](/roadmap/beacon-chain/) avea nevoie de 16384 de depozite de 32 de ETH mizați pentru a transfera în siguranță. Acest lucru se întâmpla pe 27 noiembrie, ceea ce înseamnă că Lanțul Beacon a început să producă blocuri pe 1 decembrie 2020. Acesta este primul pas important în realizarea [viziunii Ethereum](/roadmap/vision/).

[Citiţi anunțul Fundației Ethereum](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink href="/roadmap/beacon-chain/">
  Lanțul Beacon
</DocLink>

---

### S-a implementat contractul de depunere a mizei {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Rezumat {#deposit-contract-summary}

Contractul de depunere a mizei a introdus [mizarea](/glossary/#staking) în ecosistemul Ethereum. Cu toate că este un contract pe [Mainnet](/glossary/#mainnet), acesta a avut un impact direct asupra termenului de lansare a [Lanțului Beacon](/roadmap/beacon-chain/), o importantă [actualizare Ethereum](/roadmap/).

[Citiţi anunțul Fundației Ethereum](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink href="/staking/">
  Mizarea
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Rezumat {#muir-glacier-summary}

Fork-ul Muir Glacier a introdus o întârziere a [bombei de dificultate](/glossary/#difficulty-bomb). Creșterea dificultăţii blocului în mecanismul de consens bazat pe [dovada-muncii](/developers/docs/consensus-mechanisms/pow/) ameninţa să degradeze calitățile funcționale ale lui Ethereum prin creșterea timpului de așteptare pentru trimiterea tranzacțiilor și folosirea aplicațiilor dapp.

- [Citiţi anunțul Fundației Ethereum](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Citiţi explicatorul Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="EIP-urile Muir Glacier" contentPreview="Official improvements included in this fork.">

- [EIP-2384](https://eips.ethereum.org/EIPS/eip-2384) – _întârzie bomba de dificultate cu încă 4.000.000 de blocuri sau ~611 zile._

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### Rezumat {#istanbul-summary}

Fork-ul Istanbul:

- A optimizat costul [gazului](/glossary/#gas) pentru anumite acțiuni din [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- A îmbunătățit rezistența la atacul prin refuzul-serviciului.
- Made [Layer 2 scaling](/developers/docs/scaling/#layer-2-scaling) solutions based on SNARKs and STARKs more performant.
- A permis interoperabilitatea dintre Ethereum și Zcash.
- A permis contractelor să introducă funcții mai ingenioase.

[Citiţi anunțul Fundației Ethereum](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="EIP-urile Istanbul" contentPreview="Official improvements included in this fork.">

- [EIP-152](https://eips.ethereum.org/EIPS/eip-152) – _allow Ethereum to work with privacy-preserving currency like Zcash._
- [EIP-1108](https://eips.ethereum.org/EIPS/eip-1108) – _cheaper cryptography to improve [gas](/glossary/#gas) costs._
- [EIP-1344](https://eips.ethereum.org/EIPS/eip-1344) – _protects Ethereum against replay attacks by adding `CHAINID` [opcode](/developers/docs/ethereum-stack/#ethereum-virtual-machine)._
- [EIP-1884](https://eips.ethereum.org/EIPS/eip-1884) – _optimising opcode gas prices based on consumption._
- [EIP-2028](https://eips.ethereum.org/EIPS/eip-2028) – _reduces the cost of CallData to allow more data in blocks – good for [Layer 2 scaling](/developers/docs/scaling/#layer-2-scaling)._
- [EIP-2200](https://eips.ethereum.org/EIPS/eip-2200) – _other opcode gas price alterations._

</ExpandableCard>

---

### Constantinopol {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Rezumat {#constantinople-summary}

Fork-ul Constantinopol:

- A asigurat ca blockchain-ul să nu înghețe înainte de [implementarea dovezii-mizei](#beacon-chain-genesis).
- A optimizat costul [gazului](/glossary/#gas) anumitor acțiuni din [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- A adăugat capacitatea de a interacționa cu adrese care nu au fost create încă.

[Citiţi anunțul Fundației Ethereum](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="EIP-urile Constantinopol" contentPreview="Official improvements included in this fork.">

- [EIP-145](https://eips.ethereum.org/EIPS/eip-145) – _optimizează costul anumitor acțiuni on-chain._
- [EIP-1014](https://eips.ethereum.org/EIPS/eip-1014) – _vă permite să interacționaţi cu adrese care nu au fost create încă._
- [EIP-1052](https://eips.ethereum.org/EIPS/eip-1052) – _optimizează costul anumitor acțiuni on-chain._
- [EIP-1234](https://eips.ethereum.org/EIPS/eip-1234) – _garantează că blockchain-ul nu îngheață înainte de a se implementa dovada-mizei._

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Rezumat {#byzantium-summary}

Fork-ul Byzantium:

- A redus recompensele pentru [minarea](/developers/docs/consensus-mechanisms/pow/mining/) pe bloc de la 5 la 3 ETH.
- A amânat [bomba de dificultate](/glossary/#difficulty-bomb) cu un an.
- A adăugat capacitatea de a efectua apeluri care nu modifică starea către alte contracte.
- Added certain cryptography methods to allow for [layer 2 scaling](/developers/docs/scaling/#layer-2-scaling).

[Citiţi anunțul Fundației Ethereum](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="EIP-urile Byzantium" contentPreview="Official improvements included in this fork.">

- [EIP-140](https://eips.ethereum.org/EIPS/eip-140) – _adds `REVERT` opcode._
- [EIP-658](https://eips.ethereum.org/EIPS/eip-658) – _status field added to transaction receipts to indicate success or failure._
- [EIP-196](https://eips.ethereum.org/EIPS/eip-196) – _adds elliptic curve and scalar multiplication to allow for [ZK-Snarks](/developers/docs/scaling/zk-rollups/)._
- [EIP-197](https://eips.ethereum.org/EIPS/eip-197) – _adds elliptic curve and scalar multiplication to allow for [ZK-Snarks](/developers/docs/scaling/zk-rollups/)._
- [EIP-198](https://eips.ethereum.org/EIPS/eip-198) – _enables RSA signature verification._
- [EIP-211](https://eips.ethereum.org/EIPS/eip-211) – _adds support for variable length return values._
- [EIP-214](https://eips.ethereum.org/EIPS/eip-214) – _adds `STATICCALL` opcode, allowing non-state-changing calls to other contracts._
- [EIP-100](https://eips.ethereum.org/EIPS/eip-100) – _changes difficulty adjustment formula._
- [EIP-649](https://eips.ethereum.org/EIPS/eip-649) – _delays [difficulty bomb](/glossary/#difficulty-bomb) by 1 year and reduces block reward from 5 to 3 ETH._

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### Rezumat {#spurious-dragon-summary}

Fork-ul Spurious Dragon a fost al doilea răspuns la atacurile prin refuzul-serviciului (DoS) din rețea (septembrie/octombrie 2016), incluzând:

- reglarea prețurilor de opcode pentru a preveni atacurile viitoare asupra rețelei.
- permiterea „reducerii” stării blockchain-ului.
- adăugarea protecției împotriva atacurilor de reluare.

[Citiţi anunțul Fundației Ethereum](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="EIP-urile Spurious Dragon" contentPreview="Official improvements included in this fork.">

- [EIP-155](https://eips.ethereum.org/EIPS/eip-155) – _împiedică tranzacțiile dintr-un lanț Ethereum să fie retransmise pe un lanț alternativ, de exemplu o tranzacție testnet care este retransmisă pe lanțul principal Ethereum._
- [EIP-160](https://eips.ethereum.org/EIPS/eip-160) – _ajustează prețurile opcode-ului `EXP` – face mai dificilă încetinirea rețelei prin intermediul unor operațiuni contractuale costisitoare din punct de vedere al calculelor_
- [EIP-161](https://eips.ethereum.org/EIPS/eip-161) – _permite eliminarea conturilor goale adăugate prin atacurile DOS._
- [EIP-170](https://eips.ethereum.org/EIPS/eip-170) – _modifică dimensiunea maximă a codului pe care îl poate avea un contract pe blockchain – la 24576 octeți._

</ExpandableCard>

---

### Tangerine whistle {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### Rezumat {#tangerine-whistle-summary}

Fork-ul Tangerine Whistle a fost primul răspuns la atacurile prin refuzul-serviciului (DoS) din rețea (septembrie/octombrie 2016), incluzând:

- abordarea problemelor urgente de sănătate ale rețelei referitoare la codurile de funcționare subevaluate.

[Citiţi anunțul Fundației Ethereum](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="EIP-urile Tangerine Whistle" contentPreview="Official improvements included in this fork.">

- [EIP-150](https://eips.ethereum.org/EIPS/eip-150) – _crește costurile gazului opcode-urilor care pot fi utilizate în atacurile spam._
- [EIP-158](https://eips.ethereum.org/EIPS/eip-158) – _reduce dimensiunea stării prin eliminarea unui număr mare de conturi goale care au fost plasate în stare la un cost foarte scăzut din cauza erorilor din versiunile anterioare ale protocolului Ethereum._

</ExpandableCard>

---

### Fork-ul DAO {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Rezumat {#dao-fork-summary}

Fork-ul DAO a fost un răspuns la [atacul DAO din 2016](https://www.coindesk.com/markets/2016/06/25/understanding-the-dao-attack/), în care un contract [DAO](/glossary/#dao) nesecurizat a fost golit de peste 3,6 milioane de ETH prin piratare. Fork-ul a mutat fondurile de pe contractul defectuos pe un [contract nou](https://etherscan.io/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) cu o singură funcție: „withdraw” (retragere). Oricine a pierdut fonduri a putut retrage 1 ETH pentru fiecare 100 de tokenuri DAO din portofel.

Această măsură a fost votată de comunitatea Ethereum. Orice deținător de ETH a putut vota printr-o tranzacție pe [o platformă de vot](http://v1.carbonvote.com/). Decizia de creare a fork-ului a întrunit peste 85% din voturi.

Unii miner-i au refuzat să creeze fork-ul pentru că incidentul DAO nu a fost o deficienţă a protocolului. Ei au continuat să formeze [Ethereum Clasic](https://ethereumclassic.org/).

[Citiţi anunțul Fundației Ethereum](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Rezumat {#homestead-summary}

Fork-ul Homestead care privea spre viitor. Acesta a inclus mai multe modificări ale protocolului și o schimbare de relaţionare care i-a permis lui Ethereum să efectueze noi actualizări ale reţelei.

[Citiţi anunțul Fundației Ethereum](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="EIP-urile Homestead" contentPreview="Official improvements included in this fork.">

- [EIP-2](https://eips.ethereum.org/EIPS/eip-2) – _face modificări la procesul de creare a contractului._
- [EIP-7](https://eips.ethereum.org/EIPS/eip-7) – _adaugă un nou opcode: „DELEGATECALL”_
- [EIP-8](https://eips.ethereum.org/EIPS/eip-8) – _introduce cerințele de compatibilitate „devp2p forward”_

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Frontier thawing {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Rezumat {#frontier-thawing-summary}

Fork-ul frontier thawing a ridicat limita de [gaz](/glossary/#gas) de 5.000 per [bloc](/glossary/#block) și a stabilit prețul implicit al gazului la 51 [gwei](/glossary/#gwei). Acest lucru a permis tranzacțiile – tranzacțiile necesită 21.000 de gaz.

[Citiţi anunțul Fundației Ethereum](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)

---

### Frontier {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Rezumat {#frontier-summary}

Frontier a fost o implementare în direct, dar absolut esenţială pentru proiectul Ethereum. A urmat fazei de testare de succes Olympic. A fost destinat utilizatorilor tehnici, în special dezvoltatorilor. [Blocurile](/glossary/#block) aveau o limită de [gaz](/glossary/#gas) de 5.000. Această perioadă de „spargere a gheţii” le-a permis miner-ilor să-și înceapă operațiunile și celor care au adoptat din timp sistemul să-și instaleze clienții fără a avea nevoie să se „grăbească”.

[Citiţi anunțul Fundației Ethereum](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Vânzarea de ether {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

Ether-ul a fost pus în vânzare oficial timp de 42 de zile. Se putea cumpăra cu BTC.

[Citiţi anunțul Fundației Ethereum](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### A fost lansată Cartea galbenă {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

Cartea galbenă, scrisă de Dr. Gavin Wood, este o definiție tehnică a protocolului Ethereum.

[Vedeți Cartea galbenă](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### A fost lansată Cartea albă {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

Lucrarea introductivă, publicată în 2013 de Vitalik Buterin, fondatorul lui Ethereum, înainte de lansarea proiectului în 2015.

<DocLink href="/whitepaper/">
  Cartea albă
</DocLink>
