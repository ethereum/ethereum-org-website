---
title: Istoricul Ethereum
description: O istorie a blockchain-ului Ethereum care include repere majore, lansări și furculițe.
lang: ro
sidebar: true
sidebarDepth: 1
---

# Istoria Ethereum {#the-history-of-ethereum}

O cronologie a tuturor etapelor majore, furculițelor și actualizărilor blockchain-ului Ethereum.

<ExpandableCard title="Ce sunt furculițele?" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

Furculițele apar atunci când trebuie făcute actualizări tehnice majore sau modificări în rețea – acestea provin de obicei din [Propunerile de îmbunătățire Ethereum (EIP)](/eips/) și modifică „regulile” protocolului.

Atunci când sunt necesare upgrade-uri în software-ul tradițional, controlat central, compania va publica doar o nouă versiune pentru utilizatorul final. Blockchain-ul funcționează diferit, deoarece nu există proprietate centrală. [Clienții Ethereum](/developer/docs/nodes-and-clients/) trebuie să își actualizeze software-ul pentru a implementa noile reguli de furculițe. În plus, creatorii de blocuri (minerii într-o lume a dovezii muncii, validatorii într-o lume a dovezii mizei) și nodurile trebuie să creeze blocuri și să valideze împotriva noilor reguli. [Mai multe despre mecanismele de consens](/developers/docs/consenus-mecanisme/)

Aceste modificări de regulă pot crea o divizare temporară în rețea. Blocurile noi ar putea fi produse în conformitate cu noile reguli sau cele vechi. Asupra furculițelor se convine din timp, astfel încât clienții să adopte schimbările la unison și furculița cu upgrade-urile să devină lanțul principal. Cu toate acestea, în cazuri rare, dezacordurile asupra furculițelor pot determina divizarea permanentă a rețelei – mai ales crearea Ethereum Classic cu [Fork DAO](#dao-fork).

</ExpandableCard>

<Divider />

## 2020 {#2020}

### Geneza lanțului Beacon {#beacon-chain-genesis}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>01 dec. 2020 12:00:35 PM + UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Numărul blocului lanțului Beacon: <a href="https://beaconscan.com/slot/1">1</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Preț ETH: 586,23 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20201207184633/https://www.ethereum.org/en/">ethereum.org pe waybackmachine</a>

#### Rezumat {#beacon-chain-genesis-summary}

[Lanțul Beacon](/eth2/beacon-chain/) a necesitat 16.384 de depozite de 32 de mize ETH pentru a fi expediate în siguranță. Acest lucru s-a întâmplat pe 27 noiembrie, ceea ce înseamnă că lanțul Beacon a început să producă blocuri pe 1 decembrie 2020. Acesta este un prim pas important în realizarea [viziunii Eth2](/eth2/vision/).

[Citește anunțul Fundației Ethereum](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink to="/eth2/beacon-chain/" title="Lanțul Beacon" />

---

### S-a implementat contractul de depunere a mizei {#staking-deposit-contract}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>14 oct. 2020 09:22:52 AM + UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Număr de bloc: <a href="https://etherscan.io/block/11052984">11052984</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Preț ETH: 379,04 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20201104235727/https://ethereum.org/en/">ethereum.org pe waybackmachine</a>

#### Rezumat {#deposit-contract-summary}

Contractul de depozit de miză a introdus [miza](/glossary/#staking) în ecosistemul Ethereum. Deși este un contract [mainnet](/glossary/#mainnet) (rețea principală), acesta a avut un impact direct asupra cronologiei lansării [lanțului Beacon](/eth2/beacon-chain/), un important [upgrade Eth2](/eth2/).

[Citește anunțul Fundației Ethereum](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink to="/eth2/staking/" title="Mizare" />

---

### Muir Glacier {#muir-glacier}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>02 ian. 2020 08:30:49 AM + UTCC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Număr de bloc: <a href="https://etherscan.io/block/9.200.000">9.200.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Preț ETH: 127,18 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20200103093618/https://ethereum.org/">ethereum.org pe waybackmachine</a>

#### Rezumat {#muir-glacier-summary}

Furculița Muir Glacier a introdus o întârziere în [bomba de dificultate](/glossary/#difficulty-bomb). Creșterea dificultății de blocare a mecanismului de consens [dovada muncii](/developers/docs/consensus-mechanisms/pow/) a amenințat să degradeze calitățile funcționale ale Ethereum prin creșterea timpului de așteptare pentru trimiterea tranzacțiilor și folosirea aplicațiilor dapp.

- [Citește anunțul Fundației Ethereum](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Citește explicatorul Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="EIP-uri Muir Glacier" contentPreview="Official improvements included in this fork.">

- [EIP-2384](https://eips.ethereum.org/EIPS/eip-2384) – _întârzie bomba de dificultate cu încă 4.000.000 de blocuri sau ~611 zile._

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>08 dec. 2019 12:25:09 AM + UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Număr de bloc: <a href="https://etherscan.io/block/9.069.000">9.069.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Preț ETH: 151,06 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20191216101254if*/https://ethereum.org/">ethereum.org pe waybackmachine</a>

#### Rezumat {#istanbul-summary}

Furculița Istanbul:

- A optimizat costul [gazului](/glossary/#gas) anumitor acțiuni din [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- A îmbunătățit rezistența la atacul prin refuz de serviciu.
- A făcut soluțiile de [scalare Layer 2](/developers/docs/scaling/#layer-2-scaling) bazate pe SNARK-uri și STARK-uri mai performante.
- A permis interoperabilitatea dintre Ethereum și Zcash.
- A permis contractelor să introducă funcții mai creative.

[Citește anunțul Fundației Ethereum](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="EIP-uri Istanbul" contentPreview="Official improvements included in this fork.">

- [EIP-152](https://eips.ethereum.org/EIPS/eip-152) – _permite Ethereum să lucreze cu monede care păstrează confidențialitatea, cum ar fi Zcash._
- [EIP-1108](https://eips.ethereum.org/EIPS/eip-1108) –_criptografie mai ieftină pentru a îmbunătăți costurile de [gas](/glossary/#gas)._
- [EIP-1344](https://eips.ethereum.org/EIPS/eip-1344) – _protejează Ethereum împotriva atacurilor de reluare prin adăugarea „CHAINID” [opcode](/developers/docs/ethereum-stack/#ethereum-virtual-machine)._
- [EIP-1884](https://eips.ethereum.org/EIPS/eip-1884) – _optimizarea prețurilor gazului opcode pe baza consumului._
- [EIP-2028](https://eips.ethereum.org/EIPS/eip-2028) – _reduce costul CallData pentru a permite mai multe date în blocuri – bun pentru [scalarea Layer 2](/developers/docs/scaling/#layer-2-scaling)._
- [EIP-2200](https://eips.ethereum.org/EIPS/eip-2200) – _alte modificări ale prețului gazului opcode._

</ExpandableCard>

---

### Constantinopol {#constantinople}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>28 feb. 2019 19:52:04 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Număr bloc: <a href="https://etherscan.io/block/7.280.000">7.280.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Preț ETH: 136,29 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20190415163751/https://www.ethereum.org/">ethereum.org pe waybackmachine</a>

#### Rezumat {#constantinople-summary}

Furculița Constantinopol:

- A asigurat că blockchain-ul nu îngheață înainte de [implementarea dovezii mizei](#beacon-chain-genesis).
- A optimizat costul de [gaz](/glossary/#gas) al anumitor acțiuni în [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- A adăugat capacitatea de a interacționa cu adrese care nu au fost create încă.

[Citește anunțul Fundației Ethereum](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="EIP-uri Constantinopol" contentPreview="Official improvements included in this fork.">

- [EIP-145](https://eips.ethereum.org/EIPS/eip-145) – _optimizează costul anumitor acțiuni pe lanț._
- [EIP-1014](https://eips.ethereum.org/EIPS/eip-1014) – _îți permite să interacționezi cu adrese care nu au fost create încă._
- [EIP-1052](https://eips.ethereum.org/EIPS/eip-1052) – _optimizează costul anumitor acțiuni pe lanț._
- [EIP-1234](https://eips.ethereum.org/EIPS/eip-1234) – _se asigură că blockchain-ul nu îngheață înainte de dovada mizei._

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>16 oct. 2017 05:22:11 + UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Număr bloc: <a href="https://etherscan.io/block/4.370.000">4.370.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Preț ETH: 334,23 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20171017201143/https://www.ethereum.org/">ethereum.org pe waybackmachine</a>

#### Rezumat {#byzantium-summary}

Furculița Byzantium:

- A redus recompensele [miniere](/developers/docs/consensus-mechanisms/pow/mining/) pe bloc de la 5 la 3 ETH.
- A amânat [bomba de dificultate](/glossary/#difficulty-bomb) cu un an.
- A adăugat capacitatea de a efectua apeluri către alte contracte care nu modifică starea.
- A adăugat anumite metode de criptografie pentru a permite \[scalarea layer-ului 2\]((/developers/docs/scaling/#layer-2-scaling).

[Citește anunțul Fundației Ethereum](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="EIP-uri Byzantium" contentPreview="Official improvements included in this fork.">

- [EIP-140](https://eips.ethereum.org/EIPS/eip-140) – _adaugă opcodul „REVERT”._
- [EIP-658](https://eips.ethereum.org/EIPS/eip-658) – _adaugă câmpul „stare” la recepțiile tranzacției pentru a indica succesul sau eșecul_
- [EIP-196](https://eips.ethereum.org/EIPS/eip-196) – _adaugă curba eliptică și înmulțirea scalară pentru a permite [ZK-Snarks](/developers/docs/scaling/layer-2-rollups/#rollups-and-sidechains)._
- [EIP-197](https://eips.ethereum.org/EIPS/eip-197) – _adaugă curba eliptică și înmulțirea scalară pentru a permite [ZK-Snarks](/developers/docs/scaling/layer-2-rollups/#rollups-and-sidechains)._
- [EIP-198](https://eips.ethereum.org/EIPS/eip-198) – _permite verificarea semnăturii RSA._
- [EIP-211](https://eips.ethereum.org/EIPS/eip-211) – _adaugă suport pentru valorile de returnare de lungime variabilă._
- [EIP-214](https://eips.ethereum.org/EIPS/eip-214) – _adaugă opcodul „STATICCALL”, care permite apeluri care nu modifică starea către alte contracte._
- [EIP-100](https://eips.ethereum.org/EIPS/eip-100) – _modifică formula de ajustare a dificultății._
- [EIP-649](https://eips.ethereum.org/EIPS/eip-649) – _întârzie [bomba de dificultate](/glossary/#difficulty-bomb) cu 1 an și reduce recompensa pe bloc de la 5 la 3 ETH._

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>22 nov. 2016 16:15:44 PM + UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Număr bloc: <a href="https://etherscan.io/block/2.675.000">2.675.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Preț ETH: 9,84 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20161127154654/https://www.ethereum.org/">ethereum.org pe waybackmachine</a>

#### Rezumat {#spurious-dragon-summary}

Furculița Spurious Dragon a fost al doilea răspuns la atacurile de refuz de serviciu (DoS) din rețea (septembrie/octombrie 2016), incluzând:

- a reglat prețurile de opcod pentru a preveni atacurile viitoare asupra rețelei.
- a permis „reducerea” stării blockchain-ului.
- a adăugat protecția împotriva atacurilor de reluare.

[Citește anunțul Fundației Ethereum](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="EIP-uri Spurious Dragon" contentPreview="Official improvements included in this fork.">

- [EIP-155](https://eips.ethereum.org/EIPS/eip-155) – _împiedică retransmiterea tranzacțiilor dintr-un lanț Ethereum pe un lanț alternativ, de exemplu, o tranzacție de pe lanțul de testare să fie reluată pe lanțul principal Ethereum._
- [EIP-160](https://eips.ethereum.org/EIPS/eip-160) – _ajustează prețurile opcodului „EXP” – face mai dificilă încetinirea rețelei prin operațiuni contractuale costisitoare din punct de vedere computațional._
- [EIP-161](https://eips.ethereum.org/EIPS/eip-161) – _permite eliminarea conturilor goale adăugate prin atacurile DOS._
- [EIP-170](https://eips.ethereum.org/EIPS/eip-170) – _schimbă mărimea maximă a codului pe care o poate avea un contract pe blockchain – la 24576 bytes._

</ExpandableCard>

---

### Tangerine whistle {#tangerine-whistle}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>18 oct. 2016 01:19:31 PM + UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Număr bloc: <a href="https://etherscan.io/block/2.463.000">2.463.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Preț ETH: 12,50 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20161030043727/https://www.ethereum.org/">ethereum.org pe waybackmachine</a>

#### Rezumat {#tangerine-whistle-summary}

Furculița Tangerine Whistle a fost primul răspuns la atacurile de refuz de serviciu (DoS) din rețea (septembrie/octombrie 2016), incluzând:

- abordarea problemelor urgente de sănătate ale rețelei referitoare la codurile de funcționare subevaluate.

[Citește anunțul Fundației Ethereum](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="EIP-uri Tangerine Whistle" contentPreview="Official improvements included in this fork.">

- [EIP-150](https://eips.ethereum.org/EIPS/eip-150) – _crește costurile gazului opcodurilor care pot fi utilizate în atacurile spam._
- [EIP-158](https://eips.ethereum.org/EIPS/eip-158) – _reduce dimensiunea stării prin eliminarea unui număr mare de conturi goale care au fost plasate în stare la un cost foarte scăzut din cauza erorilor din versiunile anterioare ale protocolului Ethereum._

</ExpandableCard>

---

### Furculița DAO {#dao-fork}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>20 iul. 2016 01:20:40 PM + UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Număr bloc: <a href="https://etherscan.io/block/1.920.000">1.920.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Preț ETH: 12,54 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20160803215306/https://ethereum.org/">ethereum.org pe waybackmachine</a>

#### Rezumat {#dao-fork-summary}

Furculița DAO a fost ca răspuns la [atacul DAO din 2016](https://www.coindesk.com/understanding-dao-hack-journalists) când, din cauza lipsei de protecție, un contract [DAO](/glossary/#dao) a fost golit de peste 3,6 milioane ETH prin piratare. Furculița a mutat fondurile din contractul defect la un [nou contract](https://etherscan.io/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) cu o singură funcție: retrage. Oricine a pierdut fonduri a putut retrage 1 ETH pentru fiecare 100 de tokenuri DAO din portofel.

Această acțiune a fost votată de comunitatea Ethereum. Orice deținător de ETH a putut vota printr-o tranzacție pe [o platformă de vot](http://v1.carbonvote.com/). Decizia de bifurcare a atins peste 85% din voturi.

Unii mineri au refuzat să bifurce pentru că incidentul DAO nu a fost un defect în protocol. Ei au continuat să formeze [Ethereum Clasic](https://ethereumclassic.org/).

[Citește anunțul Fundației Ethereum](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>14 mar. 2016 06:49:53 PM + UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Număr bloc: <a href="https://etherscan.io/block/1150000">1.150.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Preț ETH: 12,50 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20160313203843/https://www.ethereum.org/">ethereum.org pe waybackmachine</a>

#### Rezumat {#homestead-summary}

Furculița Homestead care arată spre viitor. Aceasta a inclus mai multe modificări de protocol și o schimbare în rețea care a permis Ethereum posibilitatea de a face noi actualizări de rețea.

[Citește anunțul Fundației Ethereum](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="EIP-uri Homestead" contentPreview="Official improvements included in this fork.">

- [EIP-2](https://eips.ethereum.org/EIPS/eip-2) – _face modificări la procesul de creare a contractului._
- [EIP-7](https://eips.ethereum.org/EIPS/eip-7) – _adaugă un nou opcod: „DELEGATECALL”_
- [EIP-8](https://eips.ethereum.org/EIPS/eip-8) – _introduce cerințele de compatibilitate „devp2p forward”_

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Frontier thawing {#frontier-thawing}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>07 sep. 2015 09:33:09 PM + UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Număr bloc: <a href="https://etherscan.io/block/200.000">200.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Preț ETH: 1,24 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20150912193811/https://www.ethereum.org/">ethereum.org pe waybackmachine</a>

#### Rezumat {#frontier-thawing-summary}

Furculița Frontier Thawing a ridicat limita de [gas](/glossary/#gas) de 5.000 per [block](/glossary/#block) și a stabilit prețul implicit al gazului la 51 [gwei](/glossary/#gwei). Acest lucru a permis tranzacțiile – tranzacțiile necesită 21.000 de gaz.

[Citește anunțul Fundației Ethereum](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)

---

### Frontier {#frontier}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>30 iul. 2015 03:26:13 PM + UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Număr bloc: <a href="https://etherscan.io/block/0">0</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Preț ETH: N/A<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20150802035735/https://www.ethereum.org/">ethereum.org pe waybackmachine</a>

#### Rezumat {#frontier-summary}

Frontier a fost o implementare în direct, dar cea mai esențială componentă a proiectului Ethereum. A urmat fazei de testare reușită Olympic. A fost destinat utilizatorilor tehnici, în special programatorilor. [Blocurile](/glossary/#block) aveau o limită de [gaz](/glossary/#gas) de 5.000. Această perioadă de ‘de dezgheț’ le-a permis minerilor să-și înceapă operațiunile și pentru adoptatorii timpurii să-și instaleze clienții fără să fie nevoie de „grabă”.

[Citește anunțul Fundației Ethereum](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Vânzarea de eter {#ether-sale}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 22 iulie – 02 septembrie 2014<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140804235628/https://www.ethereum.org/">ethereum.org pe waybackmachine</a>

Eter a fost pus în vânzare oficial timp de 42 de zile. Se putea cumpăra cu BTC.

[Citește anunțul Fundației Ethereum](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### A fost lansat Yellowpaper {#yellowpaper}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 01 aprilie 2014<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140509173418/https://www.ethereum.org/">ethereum.org pe waybackmachine</a>

Yellow Paper, scris de Dr. Gavin Wood, este o definiție tehnică a protocolului Ethereum.

[Vezi Yellow Paper](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### A fost lansat Whitepaper {#whitepaper}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 27 noiembrie 2013<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140208030136/http://www.ethereum.org/">ethereum.org pe waybackmachine</a>

Lucrarea introductivă, publicată în 2013 de Vitalik Buterin, fondatorul Ethereum, înainte de lansarea proiectului în 2015.

<DocLink to="/whitepaper/" title="Whitepaper" />
