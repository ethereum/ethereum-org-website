---
title: Glosar Ethereum
description: Un glosar incomplet de termeni tehnici și non-tehnici legați de Ethereum
lang: ro
sidebar: true
sidebarDepth: 2
---

# Glosar {#ethereum-glossary}

<Divider />

## {#section-numbers}

### 51% atac {#51-attack}

Un tip de atac asupra unei [rețele](#network) descentralizate în care un grup preia controlul majorității [nodurilor](#node). Acest lucru le-ar permite să fraudeze blockchain-ul prin inversarea [tranzacțiilor](#transaction) și dublarea cheltuielilor în [eter](#ether) și a altor tokenuri.

## A {#section-a}

### account (cont) {#account}

Un obiect care conține o [adresă](#address), un sold, un [nonce](#nonce) și, opțional, stocare și cod. Un cont poate fi un [cont contractual](#contract-account) sau un [cont deținut extern (EOA)](#eoa).

<DocLink to="/developers/docs/accounts" title="Conturi Ethereum" />

### address (adresă) {#address}

În general, aceasta reprezintă un [EOA](#eoa) sau [contract](#contract-accouint) care poate primi (adresa de destinație) sau trimite (adresa sursă) [tranzacții](#transaction) pe blockchain. Mai precis, sunt cei mai din dreapta 160 de biți ai unui [hash Keccak](#keccak-256) al unei [chei publice](#public-key) [CDSA](#ecdsa).

### assert {#assert}

În [Solidity](#solidity), `assert(false)` compilează la `0xfe`, un opcode invalid, care utilizează tot [gazul](#gas) rămas și anulează toate modificările. Atunci când o declarație `assert()` nu reușește, ceva foarte greșit și neașteptat se întâmplă și va trebui să-ți remediezi codul. Ar trebui să utilizezi `assert()` pentru a evita condițiile care nu ar trebui să apară, niciodată.

<DocLink to="/developers/docs/security/" title="Securitate" />

### attestation (atestare) {#attestation}

Un vot validator pentru un [lanț Beacon](#beacon-chain) sau un [fragment](#shard) sau un [bloc](#block). Validatorii trebuie să ateste blocuri, semnalând că sunt de acord cu starea propusă de bloc.

<Divider />

## B {#section-b}

### Beacon Chain (Lanțul Beacon) {#beacon-chain}

Un upgrade Eth2 care va deveni coordonatorul rețelei Ethereum. Introduce [dovada mizei](#proof-of-stake) (PoS) și [validatorii](#validator) în Ethereum. În cele din urmă va fi combinat cu [rețeaua principală](#mainnet).

<DocLink to="/eth2/beacon-chain/" title="Lanțul Beacon" />

### big-endian (marele-endian) {#big-endian}

O reprezentare a numărului pozițional în care cifra cea mai semnificativă este prima în memorie. Este opusul micului-endian, în care cifra cea mai puțin semnificativă este prima.

### block (bloc) {#block}

O colecție de informații necesare (un antet de bloc) despre [tranzacțiile](#transaction) cuprinse și un set de alte anteturi de blocuri cunoscute sub numele de [ommeri](#ommer). Blocurile sunt adăugate la rețeaua Ethereum de către [mineri](#miner).

<DocLink to="/developers/docs/blocks/" title="Blocuri" />

### blockchain {#blockchain}

În Ethereum, o secvență de [blocuri](#block) validate de sistemul [dovada muncii](#pow), fiecare legându-se de predecesorul său până la [blocul genezei](#genesis-block). Nu există nici o limită de dimensiune a blocului; utilizează în schimb diferite limite de [gaz](#gas-limit).

<DocLink to="/developers/docs/intro-to-ethereum#what-is-a-blockchain" title="Ce este un blockchain?" />

### bytecode {#bytecode}

Un set de instrucțiuni abstracte conceput pentru executarea eficientă de către un interpret software sau o mașină virtuală. Spre deosebire de codul sursă care poate fi citit de om, bytecode-ul este exprimat în format numeric.

### Byzantium fork (Furculița Byzantium) {#byzantium-fork}

Prima dintre cele două [furculițe tari](#hard-fork) pentru etapa de dezvoltare [Metropolis](#metropolis). Aceasta a inclus „Întârzierea” [Bombei de Dificultate](#difficulty-bomb) Metropolis EIP-649 și „Reducea recompensei de blocare”, unde [Epoca de gheață](#ice-age) a fost întârziată cu 1 an și recompensa pe bloc a fost redusă de la 5 la 3 eteri.

<Divider />

## C {#section-c}

### compiling (compilare) {#compiling}

Conversia codului scris dintr-un limbaj de programare de nivel înalt (de exemplu, [Solidity](#solidity)) într-un limbaj de nivel inferior (de exemplu, cod [bytecode](#bytecode) EVM).

<DocLink to="/developers/docs/smart-contracts/compiling/" title="Compilarea contractelor inteligente" />

### committee (comitet) {#committee}

Un grup de cel puțin 128 [validatori](#validator) alocați aleatoriu blocurilor beacon și de fragmente de [lanțul Beacon](#beacon-chain).

### consensus (consens) {#consensus}

Când numeroase noduri (de obicei majoritatea nodurilor din rețea) au toate aceleași blocuri în cel mai bun blockchain validat local. Nu trebuie confundat cu [regulile de consens](#consensus-rules).

### consensus rules (reguli de consens) {#consensus-rules}

Regulile de validare a blocurilor pe care le respectă nodurile complete pentru a rămâne în consens cu alte noduri. Nu trebuie confundate cu [consensul](#consensus).

### Constantinople fork (Furculița Constantinopol) {#constantinople-fork}

A doua parte a etapei [Metropolis](#metropolis), planificată inițial pentru mijlocul anului 2018. Se așteaptă să includă trecerea la un algoritm hibrid de [dovadă a muncii](#pow), [dovadă a mizei](#pos), printre alte modificări.

### contract account (cont contractual) {#contract-account}

Un cont care conține cod care se execută ori de câte ori primește o [tranzacție](#transaction) dintr-un alt [cont](#account) (<a href="#eoa”>EOA</a> sau [contract](#account)).

### contract creation transaction (tranzacție de creare a contractului) {#contract-creation-transaction}

O [tranzacție](#transaction) specială, cu [adresa zero](#zero-address) ca destinatar, care este utilizată pentru a înregistra un [contract](#contract-account) și a-l înregistra pe blocul Ethereum.

### crosslink (legătură încrucișată) {#crosslink}

O legătură încrucișată oferă un rezumat al stării unui fragment. Este modul în care lanțurile de [fragmente](#shard) vor comunica între ele prin intermediul [lanțului Beacon](#beacon-chain) în sistemul de fragmente de [dovadă a mizei](#proof-of-stake).

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work" title="Dovada mizei" />

<Divider />

## D {#section-d}

### Decentralized Autonomous Organization (DAO) </p> (Organizație Autonomă Descentralizată (DAO)) {#dao}

O companie sau altă organizație care funcționează fără gestionare ierarhică. DAO se poate referi și la un contract numit „DAO” lansat la 30 aprilie 2016, care a fost apoi piratat în iunie 2016; aceasta a motivat în cele din urmă o [Furculiță tare](#hard-fork) cu (numele de cod DAO) la blocul 1.192.000, care a inversat contractul DAO piratat și a determinat Ethereum și Ethereum Clasic să se împartă în două sisteme concurente.

<DocLink to="/community/#decentralized-autonomous-organizations-daos" title="Organizații autonome descentralizate (DAO)" />

### Dapp {#dapp}

Aplicație descentralizată. Este cel puțin un [contract inteligent](#smart-contract) și o interfață web cu utilizatorul. În sens mai larg, o aplicație dapp este o aplicație web care este construită pe servicii de infrastructură deschise, descentralizate, peer-to-peer. În plus, multe aplicații dapp includ stocare descentralizată și/sau un protocol de mesaj și platformă.

<DocLink to="/developers/docs/dapps/" title="Introducere în aplicații dapp" />

### decentralized exchange (DEX) </p> schimb descentralizat (DEX) {#dex}

Un tip de aplicație [dapp](#dapp) care îți permite să schimbi tokenuri cu colegii din rețea. Ai nevoie de [eter](#ether) pentru a utiliza unul (pentru a plăti [taxele de tranzacții](#transaction-fee)), dar acestea nu sunt supuse restricțiilor geografice, cum ar fi schimburile centralizate – oricine poate participa.

<DocLink to="/get-eth/#dex" title="Schimburi descentralizate" />

### deed {#deed}

Vezi [tokenurile non-fungibile (NFT)](#nft)

### defi {#defi}

Prescurtarea de la „finanțare descentralizată”, o categorie largă de aplicații [dapp](#dapp) cu scopul de a oferi servicii financiare susținute de blockchain, fără intermediari, astfel încât oricine cu o conexiune la internet să poată participa.

<DocLink to="/dapps/#explore" title="Aplicații dapp Defi" />

### difficulty (dificultate) {#difficulty}

O setare la nivel de rețea care controlează cât calcul este necesar pentru a produce o [dovadă a muncii](#pow).

### difficulty bomb (bombă de dificultate) {#difficulty-bomb}

Creșterea exponențială planificată a setării [dificultății](#difficulty) [PoW (proof-of-work)](#pow), concepută pentru a motiva tranziția la [PoS (proof-of-stake)](#pos), reducând modificările [furculiței](#hard-fork)

### digital signature (semnătură digitală) {#digital-signatures}

Un scurt șir de date pe care un utilizator le produce pentru un document folosind o [cheie privată](#private-key), astfel încât oricine cu o [cheie publică](#public-key) aferentă, cu semnătura și cu documentul relevant, poate verifica dacă: (1) documentul a fost „semnat” de proprietarul acelei chei private și (2) documentul nu a fost modificat după ce a fost semnat.

<Divider />

## E {#section-e}

### elliptic curve digital signature algorithm (ECDSA) - </p> (algoritm de semnătură digitală cu curba eliptică (ECDSA)\_ {#ecdsa}

Un algoritm criptografic utilizat de Ethereum pentru a se asigura că fondurile pot fi cheltuite numai de către proprietarii lor.

### epoch (epocă) {#epoch}

O perioadă de 32 de [sloturi](#slot) (6,4 minute) în sistemul coordonat de [lanțul Beacon](#beacon-chain). [Comitetele](#committee) de [validatori](#validator) sunt amestecate în fiecare epocă din motive de securitate. Există o oportunitate în fiecare epocă pentru ca lanțul să fie [finalizat](#finality).

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work" title="Dovada mizei" />

### Ethereum Improvement Proposal (EIP) - </p> (Propunere de îmbunătățire Ethereum (EIP)) {#eip}

Un document de proiectare care furnizează informații comunității Ethereum, descriind o caracteristică nouă propusă, procesele sau mediul acesteia (a se vedea [ERC](#erc)).

<DocLink to="/eips/" title="Introducere în EIP-uri" />

### Ethereum Name Service (ENS) - (Serviciul de Nume Ethereum (ENS)) {#ens}

Registrul ENS este un singur [contract](#smart-contract) central care oferă o mapare de la numele de domenii, la proprietari și rezolvatori, așa cum este descris în [EIP](#eip) 137.

[Citește mai multe pe github.com](https://github.com/ethereum/ens)

### entropy (entropie) {#entropy}

În contextul criptografiei, lipsa de predictibilitate sau nivel de randomizare. Atunci când generează informații secrete, cum ar fi [cheile private](#private-key), algoritmii se bazează de obicei pe o sursă de entropie ridicată pentru a se asigura că ieșirea este imprevizibilă.

### externally owned account (EOA) - (cont deținut extern (EOA)) {#eoa}

Un [cont](#account) creat de sau pentru utilizatorii umani ai rețelei Ethereum.

### Ethereum Request for Comments (ERC) - </p> (Cerere de Comentarii Ethereum (ERC)) {#erc}

O etichetă dată unor [EIP](#eip)-uri care încearcă să definească un standard specific de utilizare Ethereum.

<DocLink to="/eips/" title="Introducere în EIP-uri" />

### Ethash {#ethash}

Un algoritm de dovadă a muncii (PoW) pentru Ethereum 1.0.

[Citește mai multe pe eth.wiki](https://eth.wiki/en/concepts/ethash/ethash)

### ether (eter) {#ether}

Criptomonedă nativă utilizată de ecosistemul Ethereum, care acoperă costurile [gazului](#gas) la executarea tranzacțiilor. Scris de asemenea ca ETH sau simbolul său Ξ, caracterul majuscul Xi grecesc.

<DocLink to="/eth/" title="Moneda pentru viitorul nostru digital" />

### events (evenimente) {#events}

Permite utilizarea facilităților de logare [EVM](#evm). Aplicațiile [dapp](#dapp) pot asculta evenimente și le pot utiliza pentru a declanșa apeluri JavaScript în interfața utilizatorului.

<DocLink to="/developers/docs/smart-contracts/anatomy/#events-and-logs" title="Evenimente și jurnale" />

### Ethereum Virtual Machine (EVM) - (Mașină virtuală Ethereum (EVM)) {#evm}

O mașină virtuală bazată pe stivă care execută [bytecode](#bytecode). În Ethereum, modelul de execuție specifică în ce mod starea sistemului este modificată având în vedere o serie de instrucțiuni bytecode și un mic șir de date de mediu. Acest lucru este specificat printr-un model formal al unei mașini de stat virtuale.

<DocLink to="/developers/docs/evm/" title="Mașină virtuală Ethereum" />

### EVM assembly language (Limbaj de asamblare EVM) {#evm-assembly-language}

O formă lizibilă pentru om a [bytecode](#bytecode)-ului EVM.

<Divider />

## F {#section-f}

### fallback function (funcție de rezervă) {#fallback-function}

O funcție implicită apelată în absența datelor sau a unui nume de funcție declarat.

### faucet {#faucet}

Un serviciu efectuat prin [contract inteligent](#smart-contract) care distribuie fonduri sub formă de eter de test gratuit care poate fi utilizat pe o rețea de testare.

<DocLink to="/developers/docs/networks/#testnet-faucets" title="Faucet-uri Testenet" />

### finality (finalitate) {#finality}

Finalitatea este garanția că un set de tranzacții, înainte de un anumit timp, nu se va schimba și nu poate fi restabilit.

<DocLink to="/developers/docs/consensus-mechanisms/pow/#finality" title="Finalitatea dovezii muncii" /> <DocLink to="/developers/docs/consensus-mechanisms/pos/#finality" title="Finalitatea dovezii mizei" />

### finney {#finney}

O subdiviziune de [eter](#ether). 1 finney = 10<sup>15</sup> [wei](#wei). 10<sup>3</sup> finney = 1 eter.

### fork (furculiță) {#fork}

O modificare a protocolului, care determină crearea unui lanț alternativ sau o divergență temporală în două căi potențiale de bloc în timpul mineritului.

### fraud proof (dovadă de fraudă) {#fraud-proof}

Un model de securitate pentru anumite soluții de [nivel 2](#layer-2) în care, pentru a crește viteza, tranzacțiile sunt [grupate](#rollups) în loturi (rolled up) și trimise la Ethereum într-o singură tranzacție. Se presupune că ele sunt valabile, dar pot fi contestate dacă se suspectează fraudă. O dovadă de fraudă va rula apoi tranzacția pentru a vedea dacă a avut loc fraudă. Această metodă crește cantitatea de tranzacții posibile, menținând în același timp securitatea. Unele [pachete cumulate](#rollups) (rollups) folosesc [dovezi de validitate](#validity-proof).

<DocLink to="/developers/docs/layer-2-scaling/#optimistic-rollups" title="Rollup-uri Optimistic" />

### frontier (frontieră) {#frontier}

Etapa inițială de dezvoltare a testului Ethereum, care a durat din iulie 2015 până în martie 2016.

<Divider />

## G {#section-g}

### gas (gaz) {#gas}

Un combustibil virtual utilizat în Ethereum pentru a executa contracte inteligente. [EVM](#evm) utilizează un mecanism de contabilitate pentru a măsura consumul de gaz și a limita consumul de resurse de calcul (a se vedea [Turing complet](#turing-complete)).

<DocLink to="/developers/docs/gas/" title="Gaze și taxe" />

### gas limit (limita de gaz) {#gas-limit}

Cantitatea maximă de [gaz](#gas) pe care o [tranzacție](#transaction) sau un [bloc](#block) o poate consuma.

### genesis block (bloc de geneza) {#genesis-block}

Primul bloc dintr-un [blockchain](#blockchain), folosit pentru a inițializa o anumită rețea și criptomoneda sa.

### geth {#geth}

Go Ethereum. Una dintre cele mai proeminente implementări ale protocolului Ethereum, scris în Go.

[Citește mai multe pe geth.ethereum.org](https://geth.ethereum.org/)

### gwei {#gwei}

Prescurtare pentru gigawei, o subdiviziune de [eter](#ether), utilizat în mod obișnuit pentru a stabili prețul [gazului](#gas). 1 gwei = 10<sup>9</sup> [wei](#wei). 10<sup>9</sup> gwei = 1 eter.

<Divider />

## H {#section-h}

### hard fork (furculiță tare) {#hard-fork}

O divergență permanentă în [blockchain](#blockchain); de asemenea, cunoscută sub numele de o schimbare în furculiță tare. Apare de obicei atunci când nodurile non-actualizate nu pot valida blocurile create de nodurile actualizate care respectă [reguli de consens](#consensus-rules) mai noi. A nu se confunda cu o furculiță, furculiță slabă, furculiță software sau furculiță Git.

### hash {#hash}

O amprentă de lungime fixă a unei intrări de dimensiune variabilă, produsă de o funcție hash. (Vezi [keccak-256](#keccak-256))

### HD wallet (Portofel HD) {#hd-wallet}

Un [portofel](#wallet) care utilizează protocolul de creare și transfer al cheii deterministe ierarhice (HD).

[Citește mai multe pe github.com](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

### HD wallet seed (Seed de portofel HD) {#hd-wallet-seed}

O valoare utilizată pentru a genera [cheia privată](#private-key) principală și codul lanțului principal pentru un [portofel](#wallet) HD. Seed-ul portofelului poate fi reprezentat de cuvinte mnemonice, facilitând copierea și restaurarea cheilor private.

### homestead {#homestead}

A doua etapă de dezvoltare a Ethereum, lansată în martie 2016 la blocul 1.150.000.

<Divider />

## I {#section-i}

### Inter-exchange Client Address Protocol (ICAP) - (Protocol de adresă client interschimb (ICAP)) {#icap}

O codificare a adresei Ethereum care este parțial compatibilă cu codarea numărului de cont bancar internațional (IBAN), oferind o versatilitate, sumă de verificare și codare interoperabilă pentru adresele Ethereum. Adresele ICAP utilizează un nou cod pseudo-țară IBAN - XE, care înseamnă „eXtended Ethereum”, așa cum este utilizat în monede non-jurisdicționale (de exemplu, XBT, XRP, XCP).

### Ice Age (Epoca de gheață) {#ice-age}

O [furculiță tare](#hard-fork) pe Ethereum la blocul 200.000 pentru a introduce o creștere de [dificultate](#difficulty) exponențială (așa numită [bombă de dificultate](#difficulty-bomb)), motivând o tranziție la [dovada mizei](#pos) (PoS).

### integrated development environment (IDE) - </p>(mediu de dezvoltare integrat (IDE)) {#ide}

O interfață de utilizator care combină de obicei un editor de cod, un compilator, un timp de execuție și un depanator.

<DocLink to="/developers/docs/ides/" title="Medii de dezvoltare Integrate" />

### immutable deployed code problem - </p>(problema codului implementat imuabil) {#immutable-deployed-code-problem}

Odată ce codul unui [contract](#smart-contract) (sau [bibliotecă](#library)) este implementat, acesta devine imuabil. Practicile standard de dezvoltare software se bazează pe posibilitatea de a remedia eventualele erori și de a adăuga noi caracteristici, deci aceasta reprezintă o provocare pentru dezvoltarea contractelor inteligente.

<DocLink to="/developers/docs/smart-contracts/deploying/" title="Implementarea contractelor Inteligente" />

### internal transaction (tranzacție internă) {#internal-transaction}

O [tranzacție](#transaction) trimisă dintr-un cont contractual către un alt [cont contractual](#contract-account) sau un <a href="#eoa”>EOA</a> (vezi [mesajul](#message)).

<Divider />

## K {#section-k}

### key derivation function (KDF) - (funcție de derivare a cheii (KDF)) {#kdf}

Cunoscută și sub denumirea de „algoritm de întindere a parolei”, este utilizată de formatele "[keystore](#keystore-file)" pentru a proteja împotriva atacurilor cu forță brută, dicționar și tabla curcubeu la criptarea expresiei de acces, prin hash-area repetată a expresiei de acces.

<DocLink to="/developers/docs/security/" title="Securitate" />

### keccak-256 {#keccak-256}

Funcția criptografică [hash](#hash) folosită în Ethereum. Keccak-256 a fost standardizat ca <a href="#sha”>SHA</a>-3.

### keystore file (fișier keystore) {#keystore-file}

Un fișier codat JSON care conține o singură [cheie privată](#private-key) (generată aleatoriu), criptată printr-o expresie de acces pentru o securitate suplimentară.

<Divider />

## L {#section-l}

### layer 2 (nivel 2) {#layer-2}

Un domeniu de dezvoltare care se concentrează pe îmbunătățiri bazate pe stratificări peste protocolul Ethereum. Aceste îmbunătățiri sunt legate de viteza [tranzacțiilor](#transaction), [taxe de tranzacție](#transaction-fee) mai mici și confidențialitatea tranzacțiilor.

<DocLink to="/developers/docs/layer-2-scaling/" title="Nivel 2" />

### LevelDB {#level-db}

Un depozit open source de cheie-valoare pe disc, implementat ca o [bibliotecă](#library) ușoară, cu un scop unic, cu legături la multe platforme.

### library (bibliotecă) {#library}

Un tip special de [contract](#smart-contract) care nu are funcții de plătit, nu are funcție de rezervă și nu are stocare de date. Prin urmare, nu poate primi sau reține eter, sau stoca date. O bibliotecă servește drept cod implementat anterior, pe care alte contracte îl pot solicita pentru calcul numai-în-citire.

<DocLink to="/developers/docs/smart-contracts/libraries/" title="Biblioteci de contracte inteligente" />

### lightweight client (client ușor) {#lightweight-client}

Un client Ethereum care nu stochează o copie locală a blockchain-ului sau nu validează [blocurile](#blockchain) și [tranzacțiile](#transaction). Oferă funcțiile unui [portofel](#wallet) și poate crea și difuza tranzacții.

<Divider />

## M {#section-m}

### mainnet (rețea principală) {#mainnet}

Prescurtare de la „rețea principală”, acesta este principalul blockchain public [Ethereum](#blockchain). ETH real, valoare reală și consecințe reale. Cunoscut și sub numele de nivel 1 când se discută despre soluțiile de scalare [nivel-2](#layer-2). (Vezi de asemenea [testnet](#testnet))

### Merkle Patricia tree (Arborele Merkle Patricia) {#merkle-patricia-tree}

O structură de date utilizată în Ethereum pentru stocarea eficientă a perechilor de valori-cheie.

### message (mesaj) {#message}

O [tranzacție internă](#internal-transaction) care nu este niciodată serializată și este trimisă numai în cadrul [EVM](#evm).

### message call (apel de mesaj) {#message-call}

Acțiunea de a transmite un [mesaj](#message) dintr-un cont în altul. În cazul în care contul de destinație este asociat cu codul [EVM](#evm), atunci VM va fi pornită cu starea obiectului respectiv și cu mesajul acționat.

### Metropolis {#metropolis}

A treia etapă de dezvoltare a Ethereum, lansată în octombrie 2017.

### miner {#miner}

Un [nod](#node) de rețea care găsește dovezi valabile de [dovadă a muncii](#pow) (PoW) pentru blocuri noi, prin hash de trecere repetată (vezi [Ethash](#ethash)).

<DocLink to="/developers/docs/consensus-mechanisms/pow/mining/" title="Minarea" />

<Divider />

## N {#section-n}

### network (rețea) {#network}

Se referă la rețeaua Ethereum, o rețea peer-to-peer care propagă tranzacții și blocuri la fiecare nod Ethereum (participant la rețea).

<DocLink to="/developers/docs/networks/" title="Rețele" />

### non-fungible token (NFT) - (token non-fungibil (NTF)) {#nft}

De asemenea, cunoscut sub numele de „deed”, acesta este un token standard introdus de propunerea ERC-721. NFT-urile pot fi urmărite și tranzacționate, dar fiecare token este unic și distinct; nu sunt inter-schimbabile ca tokenurile ERC-20. NFT-urile pot reprezenta proprietatea asupra activelor digitale sau fizice.

<DocLink to="/developers/docs/standards/tokens/erc-721/" title="ERC-721 Token standard Non-Fungibil" />

### node (nod) {#node}

Un client software care participă la rețea.

<DocLink to="/developers/docs/nodes-and-clients/" title="Noduri și clienți" />

<DocLink to="/developers/docs/nodes-and-clients/" title="Noduri și clienți" />

### nonce {#nonce}

În criptografie, o valoare care poate fi utilizată o singură dată. Există două tipuri de nonce utilizate în Ethereum - (1) un nonce cont este un contor de tranzacții în fiecare cont, utilizat pentru a preveni atacurile de reluare; (2) un nonce de [dovadă a muncii](#pow) este o valoarea aleatorie într-un bloc utilizată pentru a satisface [dovada muncii](#pow) (PoW).

<Divider />

## O {#section-o}

### bloc ommer (unchi) {#ommer}

Când un [miner](#miner) găsește un [block](#block) valid, un alt miner poate să fi publicat un bloc concurent care este adăugat primul la vârful blockchain-ului. Acest bloc valid, dar vechi, poate fi inclus în blocuri mai noi ca _ommers_ și poate primi o recompensă parțială în bloc. Termenul de „ommer” este termenul preferat neutru de gen pentru fratele unui bloc părinte, dar acest lucru este, de asemenea, uneori numit „unchi”.

### Optimistic rollup (Rollup Optimistic) {#optimistic-rollup}

Un [pachet](#rollups) de tranzacții care utilizează [dovezi de fraudă](#fraud-proof) pentru a oferi o creștere a nivelului de tranzacții de [nivel 2](#layer-2) în timp ce utilizează securitatea oferită de [mainnet](#mainnet) (nivel 1). Spre deosebire de [Plasma](#plasma), o soluție similară de nivel 2, pachetele Optimistic pot gestiona tipuri de tranzacții mai complexe - orice este posibil în [EVM](#evm). Acestea au probleme de latență în comparație cu [pachetele Zero-knowledge](#zk-rollups), deoarece o tranzacție poate fi contestată prin dovada fraudei.

<DocLink to="/developers/docs/layer-2-scaling/#optimistic-rollups" title="Rollup-uri Optimistic" />

<Divider />

## P {#section-p}

### parity (paritate) {#parity}

Una dintre cele mai proeminente implementări interoperabile ale software-ului client Ethereum.

### Plasma {#plasma}

O soluție de scalare de [nivel 2](#layer-2) care folosește [dovezi de fraudă](#fraud-proof), cum ar fi [pachetele Optimistic](#optimistic-rollups). Plasma este limitată la tranzacții simple, cum ar fi transferuri de bază de tokenuri și schimburi.

<DocLink to="/developers/docs/layer-2-scaling/#Plasma" title="Plasma" />

### private key (secret key) - </p>(cheie privată (cheie secretă)) {#private-key}

Un număr secret care permite utilizatorilor Ethereum să dovedească proprietatea unui cont sau a unor contracte, prin producerea unei semnături digitale (a se vedea [cheia publică](#public-key), [adresă](#address), [ECDSA](#ecdsa)).

### proof of stake (PoS) - </p>(dovada mizei (PoS)) {#pos}

O metodă prin care un protocol blockchain de cripto-monede își propune să obțină un [consens](#consensus) distribuit. PoS cere utilizatorilor să demonstreze că dețin o anumită cantitate de cripto-monede ("miza" lor în rețea) pentru a putea participa la validarea tranzacțiilor.

<DocLink to="/developers/docs/consensus-mechanisms/pos/" title="Dovada mizei" />

### proof of work (PoW) - (dovada muncii (PoW)) {#pow}

O bucată de date (dovada) care necesită calcule semnificative pentru a fi găsită. În Ethereum, [minerii](#miner) trebuie să găsească o soluție numerică la algoritmul [Ethash](#ethash), care îndeplinește o țintă de [dificultate](#difficulty) la nivelul întregii rețele.

<DocLink to="/developers/docs/consensus-mechanisms/pow/" title="Dovada muncii" />

### public key (cheie publică) {#public-key}

Un număr, derivat printr-o funcție unidirecțională dintr-o [cheie privată](#private-key), care poate fi partajat public și utilizat de oricine pentru a verifica o semnătură digitală făcută cu cheia privată corespunzătoare.

<Divider />

## R {#section-r}

### receipt (chitanță) {#receipt}

Datele returnate de un client Ethereum pentru a reprezenta rezultatul unei anumite [tranzacții](#transaction), inclusiv un [hash](#hash) al tranzacției, numărul [blocului](#block) său, cantitatea de [gaz](#gas) utilizată, iar în cazul implementării unui [contract inteligent](#smart-contract), [adresa](#address) contractului.

### re-entrancy attack (atac de re-intrare) {#re-entrancy-attack}

Un atac care constă dintr-un contract de atacator care apelează o funcție contractuală a victimei în așa fel încât în ​​timpul executării, victima să apeleze din nou contractul atacatorului, recursiv. Acest lucru poate duce, de exemplu, la furtul de fonduri prin omiterea unor părți din contractul victimei care actualizează soldurile sau contorizează sumele retrase.

<DocLink to="/developers/docs/security/#re-entrancy" title="Re-intrare" />

### reward (recompensă) {#reward}

O cantitate de eter inclusă în fiecare bloc nou ca recompensă de către rețea către [minerul](#miner) care a găsit soluția [dovezii muncii](#pow).

### Recursive Length Prefix (RLP) - </p>(Prefixul Lungimii Recursive (RLP)) {#rlp}

Un standard de codificare proiectat de dezvoltatorii Ethereum pentru a codifica și serializa obiecte (structuri de date) de complexitate și lungime arbitrare.

### rollups (pachetele) {#rollups}

Pachetele sunt un tip de soluție de scalare [nivel 2](#layer-2) care grupează mai multe tranzacții și le trimite [lanțului principal Ethereum](#mainnet) într-o singură tranzacție. Acest lucru permite reducerea costurilor de [gaz](#gas) și creșterea volumului [tranzacțiilor](#transaction). Există pachete Optimistic și Zero-knowledge care utilizează diferite metode de securitate pentru a oferi aceste câștiguri de scalabilitate.

<DocLink to="/developers/docs/layer-2-scaling/#rollups" title="Pachetele" />

<Divider />

## S {#section-s}

### Serenity {#serenity}

A patra și ultima etapă de dezvoltare a Ethereum.

<DocLink to="/eth2/" title="Ethereum 2.0 (Eth2)" />

### Secure Hash Algorithm (SHA) - </p>(Algoritm Securizat Hash (SHA)) {#sha}

O familie de funcții hash criptografice publicate de Institutul Național de Standarde și Tehnologie (NIST).

### shard/shard chain (fragment/lanț de fragmente) {#shard}

Un lanț de [dovadă a mizei](#proof-of-stake) coordonat de [lanțul Beacon](#beacon-chain) și asigurat de [validatori](#validator). Vor fi adăugate 64 la rețea ca parte a actualizării lanțului de fragmente Eth2. Lanțurile de Fragmente vor oferi un volum crescut de tranzacții pentru Ethereum, oferind date suplimentare soluțiilor de [nivel 2](#layer-2), cum ar fi [rollup-urile Optimistic](#optimistic-rollups) și [rollup-urile ZK](#zk-rollups).

<DocLink to="/eth2/shard-chains" title="Lanțuri de fragmente" />

### Sidechain {#sidechain}

O soluție de scalare care utilizează un lanț separat cu [reguli de consens]{#consensus-rules} diferite, adesea mai rapide. Este nevoie de un pod pentru a conecta aceste lanțuri laterale la [rețeaua principală](#mainnet). [Rollup-urile](#rollups) folosesc, de asemenea, sidechan-uri, în schimb funcționează în colaborare cu [rețeaua principală](#mainnet).

<DocLink to="/developers/docs/layer-2-scaling/#sidechains" title="Sidechains" />

### singleton {#singleton}

Un termen de programare computerizată care descrie un obiect din care poate exista doar o singură instanță.

### slot {#slot}

O perioadă de timp (12 secunde) în care un nou [lanț Beacon](#beacon-chain) și un lanț de [fragment](#shard) pot fi propuse de un [validator](#validator) în sistemul [dovezii mizei](#proof-of-stake). Un slot poate fi gol. 32 de sloturi alcătuiesc o [epocă](#epoch).

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work" title="Dovada mizei" />

### smart contract (contract inteligent) {#smart-contract}

Un program care se execută pe infrastructura de calcul Ethereum.

<DocLink to="/developers/docs/smart-contracts/" title="Introducere în Contracte inteligente" />

### Solidity {#solidity}

Un limbaj de programare procedural (imperativ) cu sintaxă similară cu JavaScript, C++ sau Java. Cel mai popular și mai frecvent utilizat limbaj pentru [contractele inteligente](#smart-contract) Ethereum. Creat de Dr. Gavin Wood.

<DocLink to="/developers/docs/smart-contracts/languages/#solidity" title="Solidity" />

### Solidity inline assembly (Asamblare în linie Solidity) {#solidity-inline-assembly}

Limbaj de asamblare [EVM](#evm) într-un program [Solidity](#solidity). Suportul Solidity pentru asamblarea în linie facilitează scrierea anumitor operații.

### Spurious Dragon {#spurious-dragon}

O [furculiță tare](#hard-fork) a blockchain-ului Ethereum, care a avut loc la blocul 2.675.000 pentru a aborda mai mulți vectori de refuzare serviciului (DoS) și să șteargă starea (vezi [Tangerine Whistle](#tangerine-whistle)). De asemenea, un mecanism de protecție împotriva atacurilor de reluare (vezi [nonce](#nonce)).

### stablecoin - (monedă stabilă) {#stablecoin}

Un token [ERC-20](#token-standard) cu o valoare legată de valoarea unui alt activ. Există monede stabile susținute de monedă fiat, cum ar fi dolari, metale prețioase, cum ar fi aurul și alte cripto-monede, cum ar fi Bitcoin.

<DocLink to="/eth/#tokens" title="ETH nu este singura cripto pe Ethereum" />

### staking (mizarea) {#staking}

Depunerea unei cantități de [eter](#ether) (miza ta) pentru a deveni un validator și a securiza [rețeaua](#network). Un validator verifică [tranzacțiile](#transaction) și propune [blocuri](#block) în cadrul unui model de consens [dovadă a mizei](#pos) (PoS). Mizarea îți oferă un stimulent economic pentru a acționa în interesul cel mai ridicat al rețelei. Vei primi recompense pentru îndeplinirea sarcinilor tale de [validator](#validator), dar în caz contrar, vei pierde cantități variabile de ETH.

<DocLink to="/eth2/staking/" title="Mizează ETH pentru a deveni un validator Ethereum" />

### state channels (canale de stare) {#state-channels}

O soluție de [level 2](#layer-2) în care este configurat un canal între participanți, unde aceștia pot tranzacționa liber și ieftin. Doar o [tranzacție](#transaction) pentru a configura canalul și a închide canalul este trimisă la [rețeaua principală](#mainnet). Acest lucru permite un randament de tranzacție foarte mare, dar se bazează pe cunoașterea numărului de participanți în avans și blocarea de fonduri.

<DocLink to="/developers/docs/layer-2-scaling/#state-channels" title="Canale de stare" />

### szabo {#szabo}

O subdiviziune de [eter](#ether). 1 szabo = 10<sup>12</sup> [wei](#wei), 10<sup>6</sup> szabo = 1 eter.

<Divider />

## T {#section-t}

### Tangerine Whistle {#tangerine-whistle}

O [furculiță tare](#hard-fork) a blockchain-ului Ethereum, care a avut loc la blocul 2.463.000 pentru modificarea calculului [gazului](#gas) pentru anumite operații intensive de I/O și pentru a șterge starea acumulată de la un atac de refuzare a serviciului (DoS), care a exploatat costul scăzut al gazului acestor operațiuni.

### testnet (rețea de testare) {#testnet}

Prescurtare de la „rețea de testare”, o rețea utilizată pentru a simula comportamentul rețelei principale Ethereum (vezi [mainnet)](#mainnet).

<DocLink to="/developers/docs/networks/#testnets" title="Rețeaua de testare" />

### token standard {#token-standard}

Introdus prin propunerea ERC-20, acesta oferă o structură de [contract inteligent](#smart-contract) standardizată pentru tokenurile fungibile. Tokenurile din același contract pot fi urmărite, tranzacționate și sunt interschimbabile, spre deosebire de [NFT](#nft)-uri (non-fungibile).

<DocLink to="/developers/docs/standards/tokens/erc-20/" title="Token ERC-20 Standard" />

### transaction (tranzacție) {#transaction}

Date trimise către Blockchain-ul Ethereum, semnate de un [cont](#account) originar, care vizează o anumită [adresă](#address). Tranzacția conține metadata, cum ar fi [limita de gaz](#gas-limit) pentru acea tranzacție.

<DocLink to="/developers/docs/transactions/" title="Tranzacții" />

### transaction fee (comision de tranzacție) {#transaction-fee}

O taxă care trebuie plătită ori de câte ori utilizezi rețeaua Ethereum. Ca exemple putem menționa trimiterea de fonduri din [portofel](#wallet) sau o interacțiune [dapp](#dapp), cum ar fi schimbul de tokenuri sau cumpărarea unui obiect de colecție. Te poți gândi la acest lucru ca la o taxă pentru servicii. Această taxă se va modifica în funcție de cât de ocupată este rețeaua. Acest lucru se datorează faptului că [minerii](#miner), persoanele responsabile de procesarea tranzacției tale, sunt susceptibili să acorde prioritate tranzacțiilor cu taxe mai mari - deci congestia forțează prețul să crească.

La nivel tehnic, taxa de tranzacție se referă la cât de mult [gaz](#gas) necesită tranzacția ta.

Reducerea comisioanelor de tranzacție este un subiect de interes intens în acest moment. Vezi [Nivel 2](#layer-2)

### Turing complete (Turing complet) {#turing-complete}

Un concept numit după matematicianul și informaticianul englez Alan Turing - un sistem de reguli de manipulare a datelor (cum ar fi setul de instrucțiuni al unui computer, un limbaj de programare sau un automat celular) se spune că este „Turing complet” sau „computerizat universal” dacă poate fi folosit pentru a simula orice mașină Turing.

<Divider />

## V {#section-v}

### validator {#validator}

Un [nod](#node) într-un sistem de [dovadă a mizei](#proof-of-stake) (PoS) responsabil pentru stocarea datelor, procesarea tranzacțiilor și adăugarea de blocuri noi în blockchain. Pentru activarea software-ului de validare, trebuie să poți [miza](#staking) 32 ETH.

<DocLink to="/developers/docs/consenus-mechanisms/pos" title="Dovada mizei" /> <DocLink to="/eth2/staking/" title="Mizarea în Ethereum" />

### Validity proof (Dovadă de valabilitate) {#validity-proof}

Un model de securitate pentru anumite soluții [nivel 2](#layer-2) în care, pentru a crește viteza, tranzacțiile sunt [împachetate](/#rollups) în loturi și trimise către Ethereum într-o singură tranzacție. Calculul tranzacției se face în afara lanțului și apoi este furnizat lanțului principal cu o dovadă a validității acestora. Această metodă crește cantitatea de tranzacții posibilă, menținând în același timp securitatea. Unele [pachete](#rollups) folosesc [dovezi de fraudă](#fraud-proof).

<DocLink to="/developers/docs/layer-2-scaling/#zk-rollups" title="Pachete de zero-Knowledge" />

### Validium {#validium}

O soluție [nivel 2](#layer-2) care utilizează [dovezi de validitate](#validity-proof) pentru a îmbunătăți randamentul tranzacției. Spre deosebire de [pachetele Zero-knowlege](#zk-rollup), datele Validium nu sunt stocate pe nivelul 1 al [rețelei principale](#mainnet).

<DocLink to="/developers/docs/layer-2-scaling/#validium" title="Validium" />

### Vyper {#vyper}

Un limbaj de programare la nivel înalt cu sintaxă Python. Destinat să se apropie de un limbaj funcțional pur. Creat de Vitalik Buterin.

<DocLink to="/developers/docs/smart-contracts/languages/#vyper" title="Vyper" />

<Divider />

## W {#section-w}

### wallet (portofel) {#wallets}

Software care deține [chei private](#private-key). Folosit pentru a accesa și controla [conturile](#account) Ethereum și a interacționa cu [contractele inteligente](#smart-contract). Cheile nu trebuie să fie stocate într-un portofel și pot fi preluate din stocarea offline (adică un card de memorie sau pe hârtie) pentru o securitate îmbunătățită. În ciuda numelui, portofelele nu stochează niciodată monedele sau tokenuri reale.

<DocLink to="/wallets/" title="Portofele (wallets) Ethereum" />

### Web3 {#web3}

A treia versiune a web-ului. Propus pentru prima dată de Dr. Gavin Wood, Web3 reprezintă o nouă viziune și concentrare pentru aplicațiile web - de la aplicații gestionate și deținute central, până la aplicații construite pe protocoale descentralizate (vezi [Dapp](#dapp)).

<DocLink to="/developers/docs/web2-vs-web3/" title="Web2 vs Web3" />

### wei {#wei}

Cea mai mică subdiviziune de [eter](#ether). 10<sup>18</sup> wei = 1 ether.

<Divider />

## Z {#section-z}

### zero address (adresă zero) {#zero-address}

O adresă specială Ethereum, compusă în întregime din zerouri, care este specificată ca adresă de destinație a unei [tranzacții de creare a contractului](#contract-creation-transaction).

### Zero-knowledge rollup (Pachet de cunoștințe-zero) {#zk-rollup}

Un [pachet](#rollups) de tranzacții care utilizează [dovezi de validitate](#validity-proof) pentru a oferi un randament crescut al tranzacțiilor de [nivel 2](#layer-2) în timp ce se utilizează securitatea oferită de [mainnet](#mainnet) (nivel 1). Deși nu pot gestiona tipuri de tranzacții complexe, cum ar fi [rollup-urile Optimistic](#optimistic-rollups), nu au probleme de latență, deoarece tranzacțiile sunt valabile în mod demonstrabil atunci când sunt prezentate.

<DocLink to="/developers/docs/layer-2-scaling/#zk-rollups" title="Rollup-uri zero-knowledge" />

<Divider />

## Surse {#sources}

_Furnizat parțial de [Mastering Ethereum](https://github.com/ethereumbook/ethereumbook) de [Andreas M. Antonopoulos, Gavin Wood](https://ethereumbook.info) sub CC-BY-SA_

<Divider />

## Contribuie la această pagină {#contribute-to-this-page}

Am omis ceva? Este ceva incorect? Ajută-ne să ne îmbunătățim contribuind la acest glosar pe GitHub!

[Află mai multe despre cum să contribui](/en/contributing/adding-glossary-terms)
