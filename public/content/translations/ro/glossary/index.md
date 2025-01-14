---
title: Glosar Ethereum
description: Un glosar incomplet de termeni tehnici și netehnici referitori la Ethereum
lang: ro
sidebarDepth: 2
---

# Glosar {#ethereum-glossary}

<Divider />

## \# {#section-numbers}

### atac de 51% {#51-attack}

Un tip de atac asupra unei [rețele](#network) descentralizate în care un grup preia controlul majorității [nodurilor](#node). Acest lucru le-ar permite să fraudeze blockchain-ul prin inversarea [tranzacțiilor](#transaction) și dublarea cheltuielilor în [ether](#ether) și alte tokenuri.

## A {#section-a}

### account (cont) {#account}

Un obiect care conține o [adresă](#address), un sold, un [nonce](#nonce) și, opțional, stocare și cod. Un cont poate fi un [cont contractual](#contract-account) sau un [cont deținut din exterior (externally owned account - EOA)](#eoa).

<DocLink href="/developers/docs/accounts">
  Conturi Ethereum
</DocLink>

### address (adresă) {#address}

Cel mai adesea, aceasta reprezintă un [EOA](#eoa) sau [contract](#contract-account) care poate primi (adresă de destinație) sau trimite (adresă sursă) [tranzacții](#transaction) pe blockchain. Mai precis, sunt cei mai din dreapta 160 de biți ai unui [hash Keccak](#keccak-256) al unei [chei publice](#public-key) [ECDSA](#ecdsa).

### interfață binară a aplicației (ABI) {#abi}

Modul standard de interacțiune cu [contractele](#contract-account) din ecosistemul Ethereum, atât din afara blockchain-ului, cât și pentru interacțiunile între contracte.

<DocLink href="/developers/docs/smart-contracts/compiling/#web-applications">
  ABI
</DocLink>

### interfață de programare a aplicațiilor {#api}

O interfață de programare a aplicațiilor (API) este un set de definiții privind modul de utilizare a unui software. Un API se află între o aplicație și un server web și facilitează transferul de date între acestea.

### assert {#assert}

În [Solidity](#solidity), `assert(false)` compilează la `0xfe`, un opcode invalid, care utilizează tot [gazul](#gas) rămas și anulează toate modificările. Atunci când o declarație `assert()` este ratată, înseamnă că se întâmplă ceva foarte grav şi neaşteptat și va trebui să vă remediaţi codul. Trebuie să utilizaţi `assert()` pentru a evita situaţiile care nu ar trebui niciodată să apară, sub nicio formă.

<DocLink href="/developers/docs/smart-contracts/security/">
  Securitatea contractelor inteligente
</DocLink>

### attestation (atestare) {#attestation}

Un vot al unui validator pentru un [Lanțul Beacon](#beacon-chain) sau un [fragment](#shard) sau un [bloc](#block). Validatorii trebuie să ateste blocurile, semnalând că sunt de acord cu starea propusă de bloc.

<Divider />

## B {#section-b}

### Taxa de bază {#base-fee}

Fiecare [bloc](#block) are un preț rezervat, cunoscut sub numele de „taxa de bază”. Este taxa minimă pe [gaz](#gas) pe care trebuie să o plătească un utilizator pentru a include o tranzacție în blocul următor.

<DocLink href="/developers/docs/gas/">
  Gaz și taxe
</DocLink>

### Lanțul Beacon {#beacon-chain}

O actualizare a reţelei care a introdus un nou nivel de consens, care va deveni coordonatorul întregii rețele Ethereum. Introduce [dovada-mizei](#pos) (PoS) și [validatorii](#validator) în Ethereum. În cele din urmă va fuziona cu [Mainnet-ul](#mainnet).

<DocLink href="/roadmap/beacon-chain/">
  Lanțul Beacon
</DocLink>

### big-endian (marele-endian) {#big-endian}

Reprezentarea unui număr pozițional în care cifra cea mai semnificativă este prima din memorie. Este opusul micului-endian (little-endian), în care cifra cea mai puțin semnificativă este prima.

### block (bloc) {#block}

O colecție de informații necesare (antetul unui bloc) despre [tranzacțiile](#transaction) pe care le cuprinde și un set de alte anteturi de blocuri, cunoscute sub numele de [ommeri](#ommer). Blocurile sunt adăugate la rețeaua Ethereum de către [miner-i](#miner).

<DocLink href="/developers/docs/blocks/">
  Blocuri
</DocLink>

### blockchain {#blockchain}

În Ethereum este o secvență de [blocuri](#block) validate prin sistemul [dovezii- muncii](#pow), fiecare legându-se de cel precedent peste tot până la [blocul genezei](#genesis-block). Nu există nici o limită de dimensiune a blocului; utilizează în schimb diferite limite de [gaz](#gas-limit).

<DocLink href="/developers/docs/intro-to-ethereum#what-is-a-blockchain">
  Ce este un blockchain?
</DocLink>

### bytecode {#bytecode}

Un set de instrucțiuni abstracte concepute pentru a eficientiza execuţia de către un interpret software sau o mașină virtuală. Spre deosebire de codul sursă care poate fi citit de om, bytecode-ul este exprimat în format numeric.

### Byzantium fork (forkul Byzantium) {#byzantium-fork}

Primul dintre două [hard forkuri](#hard-fork) pentru etapa de dezvoltare [Metropolis](#metropolis). Acesta a inclus „Întârzierea” [Bombei de dificultate](#difficulty-bomb) Metropolis EIP-649 și „Reducerea recompensei pentru bloc”, unde [Era glaciară](#ice-age) a fost întârziată cu 1 an și recompensa pentru bloc a fost redusă de la 5 la 3 ether.

<Divider />

## C {#section-c}

### checkpoint {#checkpoint}

The [Beacon Chain](#beacon-chain) has a tempo divided into slots (12 seconds) and epochs (32 slots). The first slot in each epoch is a checkpoint. When a [supermajority](#supermajority) of validators attests to the link between two checkpoints, they can be [justified](#justification) and then when another checkpoint is justified on top, they can be [finalized](#finality).

### compilare {#compiling}

Conversia codului scris dintr-un limbaj de programare de nivel înalt (de exemplu, [Solidity](#solidity)) într-un limbaj de nivel inferior (de exemplu, cod [bytecode](#bytecode) EVM).

<DocLink href="/developers/docs/smart-contracts/compiling/">
  Compilarea contractelor inteligente
</DocLink>

### comitet {#committee}

Un grup de cel puțin 128 [validatori](#validator) alocați aleatoriu blocurilor beacon și de fragmente de [lanțul Beacon](#beacon-chain).

### consens {#consensus}

Când numeroase noduri (de obicei majoritatea nodurilor din rețea) au toate aceleași blocuri în cel mai bun blockchain validat local. Nu trebuie confundat cu [regulile de consens](#consensus-rules).

### consensus client {#consensus-client}

Consensus clients (such as Prysm, Teku, Nimbus, Lighthouse, Lodestar) run Ethereum's [proof-of-stake](#pos) consensus algorithm allowing the network to reach agreement about the head of the Beacon Chain. Consensus clients do not participate in validating/broadcasting transactions or executing state transitions. This is done by [execution clients](#execution-client).

### nivel de consens {#consensus-layer}

Ethereum's consensus layer is the network of [consensus clients](#consensus-client).

### consensus rules (reguli de consens) {#consensus-rules}

Regulile de validare a blocurilor pe care le respectă nodurile complete pentru a rămâne în consens cu alte noduri. Nu trebuie confundate cu [consensul](#consensus).

### Constantinople fork (Furculița Constantinopol) {#constantinople-fork}

A doua parte a etapei [Metropolis](#metropolis), planificată inițial pentru mijlocul anului 2018. Se așteaptă să includă trecerea la un algoritm hibrid de [dovadă a muncii](#pow), [dovadă a mizei](#pos), printre alte modificări.

### cont contractual {#contract-account}

Un cont care conține cod care se execută ori de câte ori primește o [tranzacție](#transaction) dintr-un alt [cont](#account) ([EOA](#eoa) sau [contract](#account)).

### tranzacție de creare a contractului {#contract-creation-transaction}

O [tranzacție](#transaction) specială, cu [adresa zero](#zero-address) ca destinatar, care este utilizată pentru a înregistra un [contract](#contract-account) și a-l înregistra pe blocul Ethereum.

### legătură încrucișată {#crosslink}

O legătură încrucișată oferă un rezumat al stării unui fragment. Acesta este modul în care lanțurile de [fragmente](#shard) vor comunica între ele prin intermediul [Lanțului Beacon](#beacon-chain) în sistemul de fragmente bazat pe [Dovadă de Mizare (proof-of-stake)](#proof-of-stake).

<DocLink href="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Dovada-mizei (proof-of-stake)
</DocLink>

<Divider />

## D {#section-d}

### Organizație Autonomă Descentralizată (DAO) {#dao}

O companie sau altă organizație care funcționează fără gestionare ierarhică. DAO se poate referi și la un contract numit „DAO” lansat la 30 aprilie 2016, care a fost apoi piratat în iunie 2016; aceasta a motivat în cele din urmă o [Furculiță tare](#hard-fork) cu (numele de cod DAO) la blocul 1.192.000, care a inversat contractul DAO piratat și a determinat Ethereum și Ethereum Clasic să se împartă în două sisteme concurente.

<DocLink href="/dao/">
  Organizații autonome descentralizate (DAO)
</DocLink>

### Dapp {#dapp}

Aplicație descentralizată. Este cel puțin un [contract inteligent](#smart-contract) și o interfață web cu utilizatorul. În sens mai larg, o aplicație dapp este o aplicație web care este construită pe servicii de infrastructură deschise, descentralizate, peer-to-peer. În plus, multe aplicații dapp includ stocare descentralizată și/sau un protocol de mesaj și platformă.

<DocLink href="/developers/docs/dapps/">
  Introducere despre aplicațiile dapp
</DocLink>

### schimb descentralizat (DEX) {#dex}

Un tip de aplicație [dapp](#dapp) care îți permite să schimbi token-uri cu colegii din rețea. Ai nevoie de [eter](#ether) pentru a utiliza unul (pentru a plăti [taxele de tranzacții](#transaction-fee)), dar acestea nu sunt supuse restricțiilor geografice, cum ar fi schimburile centralizate – oricine poate participa.

<DocLink href="/get-eth/#dex">
  Decentralized exchanges
</DocLink>

### deed {#deed}

Vezi [token-urile nefungibile (NFT)](#nft)

### DeFi {#defi}

Prescurtare de la „finanțe descentralizate”, o categorie largă de [aplicații descentralizate](#dapp) care vizează furnizarea de servicii financiare susținute de blockchain, fără intermediari, astfel încât oricine cu o conexiune la internet să poată participa.

<DocLink href="/defi/">
  Finanțe descentralizate (DeFi)
</DocLink>

### dificultate {#difficulty}

O setare la nivel de rețea care controlează cât calcul este necesar pentru a produce o [dovadă a muncii](#pow).

### bombă de dificultate {#difficulty-bomb}

Creștere exponențială planificată a [dificultății](#difficulty) [Dovezii Muncii (proof-of-work)](#pow), menită să motiveze tranziția la [Dovada Mizei (proof-of-stake)](#pos), reducând șansele unei [furculițe](#hard-fork)

### semnătură digitală {#digital-signatures}

Un scurt șir de date pe care un utilizator le produce pentru un document folosind o [cheie privată](#private-key), astfel încât oricine cu o [cheie publică](#public-key) aferentă, cu semnătura și cu documentul relevant, poate verifica dacă: (1) documentul a fost „semnat” de proprietarul acelei chei private și (2) documentul nu a fost modificat după ce a fost semnat.

<Divider />

## E {#section-e}

### algoritm de semnătură digitală cu curba eliptică (ECDSA) {#ecdsa}

Un algoritm criptografic utilizat de Ethereum pentru a se asigura că fondurile pot fi cheltuite numai de către proprietarii lor. Este metoda preferată pentru crearea cheilor publice și private. Este relevant pentru generarea de [adrese](#address) de cont și verificarea [tranzacțiilor](#transaction).

### epocă {#epoch}

O perioadă de 32 de [sloturi](#slot) (6,4 minute) în sistemul coordonat de [lanțul Beacon](#beacon-chain). [Comitetele](#committee) de [validatori](#validator) sunt amestecate în fiecare epocă din motive de securitate. Există o oportunitate în fiecare epocă pentru ca lanțul să fie [finalizat](#finality).

<DocLink href="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Dovada-mizei
</DocLink>

### Eth1 {#eth1}

'Eth1' is a term that referred to Mainnet Ethereum, the existing proof-of-work blockchain. This term has since been deprecated in favor of the 'execution layer'. [Learn more about this name change](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/).

<DocLink href="/roadmap/">
  Aflați mai multe despre actualizările Ethereum
</DocLink>

### Eth2 {#eth2}

'Eth2' is a term that referred to a set of Ethereum protocol upgrades, including Ethereum's transition to proof-of-stake. This term has since been deprecated in favor of the 'consensus layer'. [Learn more about this name change](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/).

<DocLink href="/roadmap/">
  Aflați mai multe despre actualizările Ethereum
</DocLink>

### Propunere de îmbunătățire Ethereum (EIP) {#eip}

Un document de proiectare care furnizează informații comunității Ethereum, descriind o caracteristică nouă propusă, procesele sau mediul acesteia (a se vedea [ERC](#erc)).

<DocLink href="/eips/">
  Introducere despre EIP-uri
</DocLink>

### Ethereum Name Service (ENS) {#ens}

Registrul ENS este un singur [contract](#smart-contract) central care oferă o mapare de la numele de domenii, la proprietari și rezolvatori, așa cum este descris în [EIP](#eip) 137.

[Citește mai multe pe ens.domains](https://ens.domains)

### entropie {#entropy}

În contextul criptografiei, lipsa de predictibilitate sau nivel de randomizare. Atunci când generează informații secrete, cum ar fi [cheile private](#private-key), algoritmii se bazează de obicei pe o sursă de entropie ridicată pentru a se asigura că ieșirea este imprevizibilă.

### client de execuție {#execution-client}

Execution clients (f.k.a. "Eth1 clients"), such as Besu, Erigon, go-ethereum, Nethermind, are tasked with processing and broadcasting transactions, as well as with managing Ethereum's state. They run the computations for each transaction in the [Ethereum Virtual Machine](#evm) to ensure that the rules of the protocol are followed. Today, they also handle [proof-of-work](#pow) consensus. After the transition to [proof-of-stake](#pos), they will delegate this to consensus clients.

### nivel de execuție {#execution-layer}

Ethereum's execution layer is the network of [execution clients](#execution-client).

### cont deținut extern (EOA) {#eoa}

Un [cont](#account) creat de sau pentru utilizatorii umani ai rețelei Ethereum.

### Cerere de Comentarii Ethereum (ERC) {#erc}

O etichetă dată unor [EIP](#eip)-uri care încearcă să definească un standard specific de utilizare Ethereum.

<DocLink href="/eips/">
  Introducere despre EIP-uri
</DocLink>

### Ethash {#ethash}

Un algoritm de dovadă a muncii (PoW) pentru Ethereum 1.0.

[Citește mai multe pe eth.wiki](https://eth.wiki/en/concepts/ethash/ethash)

### ether {#ether}

Criptomonedă nativă utilizată de ecosistemul Ethereum, care acoperă costurile [gazului](#gas) la executarea tranzacțiilor. Se scrie şi ca ETH sau cu simbolul său Ξ, Litera grecească Xi cu majusculă.

<DocLink href="/eth/">
  Moneda viitorului dvs. digital
</DocLink>

### evenimente {#events}

Permite utilizarea facilităților de logare [EVM](#evm). Aplicațiile [dapp](#dapp) pot asculta evenimente și le pot utiliza pentru a declanșa apeluri JavaScript în interfața utilizatorului.

<DocLink href="/developers/docs/smart-contracts/anatomy/#events-and-logs">
  Evenimente și jurnale
</DocLink>

### Mașina virtuală Ethereum (EVM) {#evm}

O mașină virtuală bazată pe stivă care execută [bytecode](#bytecode). În Ethereum, modelul de execuție specifică în ce mod starea sistemului este modificată având în vedere o serie de instrucțiuni bytecode și un mic șir de date de mediu. Acest lucru este specificat printr-un model formal al unei mașini de stat virtuale.

<DocLink href="/developers/docs/evm/">
  Mașina Virtuală Ethereum
</DocLink>

### Limbaj de asamblare EVM {#evm-assembly-language}

O formă lizibilă pentru om a [bytecode](#bytecode)-ului EVM.

<Divider />

## F {#section-f}

### funcție de rezervă {#fallback-function}

O funcție implicită apelată în absența datelor sau a unui nume de funcție declarat.

### faucet {#faucet}

Un serviciu efectuat prin [contract inteligent](#smart-contract) care distribuie fonduri sub formă de eter de test gratuit care poate fi utilizat pe o rețea de testare.

<DocLink href="/developers/docs/networks/#testnet-faucets">
  Faucet-uri cu ETH de testare
</DocLink>

### finalitate {#finality}

Finalitatea este garanția că un set de tranzacții, înainte de un anumit timp, nu se va schimba și nu poate fi restabilit.

<DocLink href="/developers/docs/consensus-mechanisms/pow/#finality">
  Finalitatea dovezii muncii
</DocLink>
<DocLink href="/developers/docs/consensus-mechanisms/pos/#finality">
  Finalitatea dovezii mizei
</DocLink>

### finney {#finney}

O subdiviziune de [eter](#ether). 1 finney = 10<sup>15</sup> [wei](#wei). 10<sup>3</sup> finney = 1 eter.

### furculiță {#fork}

O modificare a protocolului, care determină crearea unui lanț alternativ sau o divergență temporală în două căi potențiale de bloc în timpul mineritului.

### fork-choice algorithm {#fork-choice-algorithm}

The algorithm used to identify the head of the blockchain. On the execution layer the head of the chain is identified as the one with the greatest total difficulty behind it. This means the true head of the chain is the one that required the most work to mine it. On the consensus layer the algorithm observes the accumulated attestations from validators ([LMD_GHOST](#lmd-ghost)).

### dovadă de fraudă {#fraud-proof}

Un model de securitate pentru anumite soluții de [nivel 2](#layer-2) în care, pentru a crește viteza, tranzacțiile sunt [grupate](#rollups) în loturi (rolled up) și trimise la Ethereum într-o singură tranzacție. Se presupune că ele sunt valabile, dar pot fi contestate dacă se suspectează fraudă. O dovadă de fraudă va rula apoi tranzacția pentru a vedea dacă a avut loc fraudă. Această metodă crește cantitatea de tranzacții posibile, menținând în același timp securitatea. Unele [pachete cumulate](#rollups) (rollups) folosesc [dovezi de validitate](#validity-proof).

<DocLink href="/developers/docs/scaling/optimistic-rollups/">
  Rollup-uri Optimistic
</DocLink>

### frontier {#frontier}

Etapa inițială de dezvoltare a testului Ethereum, care a durat din iulie 2015 până în martie 2016.

<Divider />

## G {#section-g}

### gaz {#gas}

Un combustibil virtual utilizat în Ethereum pentru a executa contracte inteligente. [EVM](#evm) utilizează un mecanism de contabilitate pentru a măsura consumul de gaz și a limita consumul de resurse de calcul (a se vedea [Turing complet](#turing-complete)).

<DocLink href="/developers/docs/gas/">
  Gaze și taxe
</DocLink>

### limita de gaz {#gas-limit}

Cantitatea maximă de [gaz](#gas) pe care o [tranzacție](#transaction) sau un [bloc](#block) o poate consuma.

### bloc de geneza {#genesis-block}

Primul bloc dintr-un [blockchain](#blockchain), folosit pentru a inițializa o anumită rețea și criptomoneda sa.

### geth {#geth}

Go Ethereum. Una dintre cele mai proeminente implementări ale protocolului Ethereum, scris în Go.

[Citește mai multe pe geth.ethereum.org](https://geth.ethereum.org/)

### gwei {#gwei}

Prescurtare pentru gigawei, o subdiviziune de [eter](#ether), utilizat în mod obișnuit pentru a stabili prețul [gazului](#gas). 1 gwei = 10<sup>9</sup> [wei](#wei). 10<sup>9</sup> gwei = 1 eter.

<Divider />

## H {#section-h}

### bifurcatie majora {#hard-fork}

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

### index {#index}

O structură de rețea menită să optimizeze interogarea informațiilor din întregul [blockchain](#blockchain) prin furnizarea unei căi eficiente către sursa de stocare a acestora.

### Inter-exchange Client Address Protocol (ICAP) - (Protocol de adresă client interschimb (ICAP)) {#icap}

O codificare a adresei Ethereum care este parțial compatibilă cu codarea numărului de cont bancar internațional (IBAN), oferind o versatilitate, sumă de verificare și codare interoperabilă pentru adresele Ethereum. Adresele ICAP utilizează un nou cod pseudo-țară IBAN - XE, care înseamnă „eXtended Ethereum”, așa cum este utilizat în monede non-jurisdicționale (de exemplu, XBT, XRP, XCP).

### Ice Age (Epoca de gheață) {#ice-age}

O [furculiță tare](#hard-fork) pe Ethereum la blocul 200.000 pentru a introduce o creștere de [dificultate](#difficulty) exponențială (așa numită [bombă de dificultate](#difficulty-bomb)), motivând o tranziție la [dovada mizei](#pos) (PoS).

### mediu de dezvoltare integrat (IDE) {#ide}

O interfață de utilizator care combină de obicei un editor de cod, un compilator, un timp de execuție și un depanator.

<DocLink href="/developers/docs/ides/">
  Medii de dezvoltare Integrate
</DocLink>

### problema codului implementat imuabil {#immutable-deployed-code-problem}

Odată ce codul unui [contract](#smart-contract) (sau [bibliotecă](#library)) este implementat, acesta devine imuabil. Practicile standard de dezvoltare software se bazează pe posibilitatea de a remedia eventualele erori și de a adăuga noi caracteristici, deci aceasta reprezintă o provocare pentru dezvoltarea contractelor inteligente.

<DocLink href="/developers/docs/smart-contracts/deploying/">
  Implementarea contractelor Inteligente
</DocLink>

### tranzacție internă {#internal-transaction}

O [tranzacție](#transaction) trimisă dintr-un cont contractual către un alt [cont contractual](#contract-account) sau un [EOA](#eoa) (vezi [mesajul](#message)).

<Divider />

## K {#section-k}

### funcție de derivare a cheii (KDF) {#kdf}

Cunoscută și sub denumirea de „algoritm de întindere a parolei”, este utilizată de formatele "[keystore](#keystore-file)" pentru a proteja împotriva atacurilor cu forță brută, dicționar și tabla curcubeu la criptarea expresiei de acces, prin hash-area repetată a expresiei de acces.

<DocLink href="/developers/docs/smart-contracts/security/">
  Securitatea contractelor inteligente
</DocLink>

### keccak-256 {#keccak-256}

Funcția criptografică [hash](#hash) folosită în Ethereum. Keccak-256 a fost standardizat ca [SHA](#sha)

### fișier keystore {#keystore-file}

Un fișier codat JSON care conține o singură [cheie privată](#private-key) (generată aleatoriu), criptată printr-o expresie de acces pentru o securitate suplimentară.

<Divider />

## L {#section-l}

### nivel 2 {#layer-2}

Un domeniu de dezvoltare care se concentrează pe îmbunătățiri bazate pe stratificarea peste protocolul Ethereum. Aceste îmbunătățiri sunt legate de viteza [tranzacțiilor](#transaction), [taxe de tranzacție](#transaction-fee) mai mici și confidențialitatea tranzacțiilor.

<DocLink href="/developers/docs/scaling/#layer-2-scaling">
  Nivel 2
</DocLink>

### LevelDB {#level-db}

Un depozit open source de cheie-valoare pe disc, implementat ca o [bibliotecă](#library) ușoară, cu un scop unic, cu legături la multe platforme.

### bibliotecă {#library}

Un tip special de [contract](#smart-contract) care nu are funcții de plătit, nu are funcție de rezervă și nu are stocare de date. Prin urmare, nu poate primi sau reține eter, sau stoca date. O bibliotecă servește drept cod implementat anterior, pe care alte contracte îl pot solicita pentru calcul numai-în-citire.

<DocLink href="/developers/docs/smart-contracts/libraries/">
  Biblioteci de contracte inteligente
</DocLink>

### client ușor {#lightweight-client}

Un client Ethereum care nu stochează o copie locală a blockchain-ului sau nu validează [blocurile](#blockchain) și [tranzacțiile](#transaction). Oferă funcțiile unui [portofel](#wallet) și poate crea și difuza tranzacții.

<Divider />

### LMD_GHOST {#lmd-ghost}

The [fork-choice algorithm](#fork-choice-algorithm) used by Ethereum's consensus clients to identify the head of the chain. LMD-GHOST is an acronym standing for "Latest Message Driven Greediest Heaviest Observed SubTree" which means that the head of the chain is the block with the greatest accumulation of [attestations](#attestation) in its history.

## M {#section-m}

### Mainnet {#mainnet}

Prescurtare de la „rețea principală”, acesta este principalul blockchain public [Ethereum](#blockchain). ETH real, valoare reală și consecințe reale. Cunoscut și sub numele de nivel 1 când se discută despre soluțiile de scalare [nivel-2](#layer-2). (Vezi de asemenea [testnet](#testnet))

### Merkle Patricia trie {#merkle-patricia-tree}

O structură de date utilizată în Ethereum pentru stocarea eficientă a perechilor de valori-cheie.

### mesaj {#message}

O [tranzacție internă](#internal-transaction) care nu este niciodată serializată și este trimisă numai în cadrul [EVM](#evm).

### apel de mesaj {#message-call}

Acțiunea de a transmite un [mesaj](#message) dintr-un cont în altul. În cazul în care contul de destinație este asociat cu codul [EVM](#evm), atunci VM va fi pornită cu starea obiectului respectiv și cu mesajul acționat.

### Metropolis {#metropolis}

A treia etapă de dezvoltare a Ethereum, lansată în octombrie 2017.

### miner {#miner}

Un [nod](#node) de rețea care găsește dovezi valabile de [dovadă a muncii](#pow) (PoW) pentru blocuri noi, prin hash de trecere repetată (vezi [Ethash](#ethash)).

<DocLink href="/developers/docs/consensus-mechanisms/pow/mining/">
  Minarea
</DocLink>

### Mint {#mint}

Minting is the process of creating new tokens and bringing them into circulation so that they can be used. It's a decentralized mechanism to create a new token without the involvement of the central authority.

<Divider />

## N {#section-n}

### rețea {#network}

Se referă la rețeaua Ethereum, o rețea peer-to-peer care propagă tranzacții și blocuri la fiecare nod Ethereum (participant la rețea).

<DocLink href="/developers/docs/networks/">
  Rețelele
</DocLink>

### token non-fungibil (NFT) {#nft}

De asemenea, cunoscut sub numele de „deed”, acesta este un token standard introdus de propunerea ERC-721. NFT-urile pot fi urmărite și tranzacționate, însă fiecare token este unic și distinct; acestea nu sunt interschimbabile precum ETH-ul și [tokenurile ERC-20](#token-standard). NFT-urile pot reprezenta proprietatea asupra activelor digitale sau fizice.

<DocLink href="/nft/">
  Token-uri nefungibile (NFT)
</DocLink>
<DocLink href="/developers/docs/standards/tokens/erc-721/">
  Standardul de tokenuri nefungibile ERC-721
</DocLink>

### nod {#node}

Un client software care participă la rețea.

<DocLink href="/developers/docs/nodes-and-clients/">
  Noduri și clienți
</DocLink>

### nonce {#nonce}

În criptografie, o valoare care poate fi utilizată o singură dată. Există două tipuri de nonce utilizate în Ethereum - (1) un nonce cont este un contor de tranzacții în fiecare cont, utilizat pentru a preveni atacurile de reluare; (2) un nonce de [dovadă a muncii](#pow) este o valoarea aleatorie într-un bloc utilizată pentru a satisface [dovada muncii](#pow) (PoW).

<Divider />

## O {#section-o}

### bloc ommer (unchi) {#ommer}

Când un [miner](#miner) găsește un [block](#block) valid, un alt miner poate să fi publicat un bloc concurent care este adăugat primul la vârful blockchain-ului. Acest bloc valid, dar vechi, poate fi inclus în blocuri mai noi ca _ommers_ și poate primi o recompensă parțială în bloc. Termenul de „ommer” este termenul preferat neutru de gen pentru fratele unui bloc părinte, dar acest lucru este, de asemenea, uneori numit „unchi”.

### Rollup Optimistic {#optimistic-rollup}

Un [rollup](#rollups) de tranzacții care utilizează [dovezi de fraudă (fraud-proofs)](#fraud-proof) pentru a oferi un randament sporit al tranzacțiilor [layer 2](#layer-2), utilizând în același timp securitatea oferită de [Rețeaua principală](#mainnet) (nivelul 1). Spre deosebire de [Plasma](#plasma), o soluție similară de layer 2, pachetele Optimistic pot gestiona tipuri de tranzacții mai complexe - orice este posibil în [EVM](#evm). Acestea au probleme de latență în comparație cu [pachetele Zero-knowledge](#zk-rollups), deoarece o tranzacție poate fi contestată prin dovada fraudei.

<DocLink href="/developers/docs/scaling/optimistic-rollups/">
  Rollup-uri Optimistic
</DocLink>

### Oracol {#oracle}

Un oracol este o punte între [blockchain](#blockchain) și lumea reală. Acestea acționează ca [API-uri](#api) on-chain care pot fi interogate pentru informații și folosite în [contractele inteligente](#smart-contract).

<DocLink href="/developers/docs/oracles/">
  Oracolele
</DocLink>

<Divider />

## P {#section-p}

### paritate {#parity}

Una dintre cele mai proeminente implementări interoperabile ale software-ului client Ethereum.

### Plasma {#plasma}

O soluție de scalare off-chain care utilizează [dovada de fraudă (fraud-proof)](#fraud-proof), cum ar fi [Rollup-ul Optimistic](#optimistic-rollups). Plasma este limitată la tranzacții simple, cum ar fi transferuri de bază de token-uri și schimburi.

<DocLink href="/developers/docs/scaling/plasma">
  Plasma
</DocLink>

### cheie privată (cheie secretă) {#private-key}

Un număr secret care permite utilizatorilor Ethereum să dovedească proprietatea unui cont sau a unor contracte, prin producerea unei semnături digitale (a se vedea [cheia publică](#public-key), [adresă](#address), [ECDSA](#ecdsa)).

### Dovada-mizei (PoS) {#pos}

O metodă prin care un protocol blockchain de criptomonede își propune să obțină un [consens](#consensus) distribuit. PoS cere utilizatorilor să demonstreze că dețin o anumită cantitate de criptomonede ("miza" lor în rețea) pentru a putea participa la validarea tranzacțiilor.

<DocLink href="/developers/docs/consensus-mechanisms/pos/">
  Dovada-mizei
</DocLink>

### Dovada-muncii (PoW) {#pow}

O bucată de date (dovada) care necesită calcule semnificative pentru a fi găsite. În Ethereum, [minerii](#miner) trebuie să găsească o soluție numerică la algoritmul [Ethash](#ethash), care îndeplinește o țintă de [dificultate](#difficulty) la nivelul întregii rețele.

<DocLink href="/developers/docs/consensus-mechanisms/pow/">
  Dovada-muncii
</DocLink>

### cheie publică {#public-key}

Un număr, derivat printr-o funcție unidirecțională dintr-o [cheie privată](#private-key), care poate fi partajat public și utilizat de oricine pentru a verifica o semnătură digitală făcută cu cheia privată corespunzătoare.

<Divider />

## R {#section-r}

### chitanță {#receipt}

Datele returnate de un client Ethereum pentru a reprezenta rezultatul unei anumite [tranzacții](#transaction), inclusiv un [hash](#hash) al tranzacției, numărul [blocului](#block) său, cantitatea de [gaz](#gas) utilizată, iar în cazul implementării unui [contract inteligent](#smart-contract), [adresa](#address) contractului.

### atac de re-intrare {#re-entrancy-attack}

Un atac care constă dintr-un contract de atacator care apelează o funcție contractuală a victimei în așa fel încât în ​​timpul executării, victima să apeleze din nou contractul atacatorului, recursiv. Acest lucru poate duce, de exemplu, la furtul de fonduri prin omiterea unor părți din contractul victimei care actualizează soldurile sau contorizează sumele retrase.

<DocLink href="/developers/docs/smart-contracts/security/#re-entrancy">
  Reintrare
</DocLink>

### recompensă {#reward}

O cantitate de eter inclusă în fiecare bloc nou ca recompensă de către rețea către [minerul](#miner) care a găsit soluția [dovezii muncii](#pow).

### Prefixul Lungimii Recursive (RLP) {#rlp}

Un standard de codificare proiectat de dezvoltatorii Ethereum pentru a codifica și serializa obiecte (structuri de date) de complexitate și lungime arbitrare.

### pachetele {#rollups}

Pachetele (rollups) sunt un tip de soluție de scalare [layer 2](#layer-2) care grupează mai multe tranzacții și le trimite la [lanțul principal Ethereum](#mainnet) într-o singură tranzacție. Pachetele (rollups). Acest lucru permite reducerea costurilor de [gaz](#gas) și creșterea volumului [tranzacțiilor](#transaction). Există pachete Optimistic și Zero-knowledge care utilizează diferite metode de securitate pentru a oferi aceste câștiguri de scalabilitate.

<DocLink href="/developers/docs/scaling/#rollups">
  Rollup-uri
</DocLink>

<Divider />

## S {#section-s}

### Serenity {#serenity}

Etapa de dezvoltare a lui Ethereum care a inițiat o serie de actualizări de scalare și sustenabilitate, cunoscută anterior sub numele de „Ethereum 2.0” sau „Eth2”.

<DocLink href="/roadmap/">
  Actualizările Ethereum
</DocLink>

### Algoritm hash securizat (SHA) {#sha}

O familie de funcții hash criptografice publicate de Institutul Național de Standarde și Tehnologie (NIST).

### fragment/lanț de fragmente {#shard}

Un lanț de [dovadă-a-mizei](#pos) coordonat de [Lanțul Beacon](#beacon-chain) și securizat de [validatori](#validator). În cadrul actualizării prin lanţuri de fragmente vor fi adăugate 64 la rețea. Lanțurile de fragmente vor oferi un randament sporit al tranzacțiilor pentru Ethereum prin furnizarea de date suplimentare [nivelului 2](#layer-2), soluții precum [ rollup-urile optimistic](#optimistic-rollups) și [rollup-urile ZK](#zk-rollups).

<DocLink href="/roadmap/danksharding">
  Lanțuri de fragmente
</DocLink>

### lanţ paralel {#sidechain}

O soluție de scalare care utilizează un lanț separat cu [reguli de consens](#consensus-rules) diferite, deseori mai rapide. O punte este necesară pentru a conecta aceste lanțuri paralele la [Rețeaua principală](#mainnet). [Rollup-urile](#rollups) utilizează, de asemenea, lanțurile paralele, dar funcționează în colaborare cu [Rețeaua principală](#mainnet).

<DocLink href="/developers/docs/scaling/sidechains/">
  Lanțuri paralele
</DocLink>

### singleton {#singleton}

Un termen de programare computerizată care descrie un obiect din care poate exista doar o singură instanță.

### slot {#slot}

Un interval de timp (12 secunde) în care se pot propune un nou [Lanț Beacon](#beacon-chain) și un bloc de lanțuri de [fragmente](#shard) de către un [validator](#validator) în sistemul [dovezii-mizei](#pos). Un slot poate fi gol. 32 de sloturi alcătuiesc o [epocă](#epoch).

<DocLink href="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Proof-of-stake
</DocLink>

### contract inteligent {#smart-contract}

Un program care se execută pe infrastructura de calcul Ethereum.

<DocLink href="/developers/docs/smart-contracts/">
  Introducere în Contracte Inteligente
</DocLink>

### SNARK {#snark}

Short for "succinct non-interactive argument of knowledge", a SNARK is a type of [zero-knowledge proof](#zk-proof).

<DocLink href="/developers/docs/scaling/zk-rollups/">
  Rollup-uri Zero-knowledge
</DocLink>

### Solidity {#solidity}

Un limbaj de programare procedural (imperativ) cu sintaxă similară cu JavaScript, C++ sau Java. Cel mai popular și mai frecvent utilizat limbaj pentru [contractele inteligente](#smart-contract) Ethereum. Creat de Dr. Gavin Wood.

<DocLink href="/developers/docs/smart-contracts/languages/#solidity">
  Solidity
</DocLink>

### Asamblare în linie Solidity {#solidity-inline-assembly}

Limbaj de asamblare [EVM](#evm) într-un program [Solidity](#solidity). Suportul Solidity pentru asamblarea în linie facilitează scrierea anumitor operații.

### Spurious Dragon {#spurious-dragon}

O [furculiță tare](#hard-fork) a blockchain-ului Ethereum, care a avut loc la blocul 2.675.000 pentru a aborda mai multi vectori de atac denial-of-service (DoS) și să șteargă starea (vezi [Tangerine Whistle](#tangerine-whistle)). De asemenea, un mecanism de protecție împotriva atacurilor de reluare (vezi [nonce](#nonce)).

### monedă stabilă {#stablecoin}

Un token [ERC-20](#token-standard) cu o valoare legată de valoarea unui alt activ. Există monede stabile susținute de monedă fiat, cum ar fi dolari, metale prețioase, cum ar fi aurul și alte criptomonede, cum ar fi Bitcoin.

<DocLink href="/eth/#tokens">
  ETH nu constituie singura valoare cripto de pe Ethereum
</DocLink>

### mizare {#staking}

Depunerea unei cantități de [eter](#ether) (miza ta) pentru a deveni un validator și a securiza [rețeaua](#network). Un validator verifică [tranzacțiile](#transaction) și propune [blocuri](#block) în cadrul unui model de consens [dovadă a mizei](#pos) (PoS). Miza îți oferă un stimulent economic pentru a acționa în interesul cel mai ridicat al rețelei. Vei primi recompense pentru îndeplinirea sarcinilor tale de [validator](#validator), dar în caz contrar, vei pierde cantități variabile de ETH.

<DocLink href="/staking/">
  Mizați ETH pentru a deveni validator Ethereum
</DocLink>

### STARK {#stark}

Short for "scalable transparent argument of knowledge", a STARK is a type of [zero-knowledge proof](#zk-proof).

<DocLink href="/developers/docs/scaling/zk-rollups/">
  Rollup-uri Zero-knowledge
</DocLink>

### canale de stare {#state-channels}

O soluție de [level 2](#layer-2) în care este configurat un canal între participanți, unde aceștia pot tranzacționa liber și ieftin. Către [Rețeaua principală](#mainnet) este trimisă doar o [tranzacție](#transaction) de creare a canalului și de închidere a acestuia. Acest lucru permite un randament de tranzacție foarte mare, dar se bazează pe cunoașterea numărului de participanți în avans și blocarea de fonduri.

<DocLink href="/developers/docs/scaling/state-channels/#state-channels">
  Canalele de stare
</DocLink>

### supermajority {#supermajority}

Supermajority is the term given for an amount exceeding 2/3 (66%) of the total staked ether on the [Beacon Chain](#beacon-chain). A supermajority vote is required for blocks to be [finalized](#finality) on the Beacon Chain.

### sync committee {#sync-committee}

A sync committee is a randomly selected group of [validators](#validator) on the [Beacon Chain](#beacon-chain) that refresh every ~27 hours. Their purpose is to add their signatures to valid block headers. Sync committees allow [light clients](#lightweight-client) to keep track of the head of the blockchain without having to access the entire validator set.

### szabo {#szabo}

O denominație de [eter](#ether). 1 szabo = 10<sup>12</sup> [wei](#wei), 10<sup>6</sup> szabo = 1 ether.

<Divider />

## T {#section-t}

### Tangerine Whistle {#tangerine-whistle}

O [furculiță tare](#hard-fork) a blockchain-ului Ethereum, care a avut loc la blocul 2.463.000 pentru a modifica calculul [gazului](#gas) pentru anumite operațiuni intensive de I/O și pentru a șterge starea acumulată de la un atac de refuzare a serviciului (DoS), care a exploatat costul scăzut al gazului acestor operațiuni.

### rețea de testare {#testnet}

Prescurtare de la "rețea de testare", o rețea utilizată pentru a simula comportamentul rețelei principale Ethereum (a se vedea [Rețelei principale](#mainnet)).

<DocLink href="/developers/docs/networks/#ethereum-testnets">
  Rețele de testare
</DocLink>

### token standard {#token-standard}

Introdus prin propunerea ERC-20, acesta oferă o structură de [contract inteligent](#smart-contract) standardizată pentru token-urile fungibile. Token-urile din același contract pot fi urmărite, tranzacționate și sunt interschimbabile, spre deosebire de [NFT-uri](#nft).

<DocLink href="/developers/docs/standards/tokens/erc-20/">
  Standardul de token ERC-20
</DocLink>

### tranzacție {#transaction}

Date trimise către Blockchain-ul Ethereum, semnate de un [cont](#account) originar, care vizează o anumită [adresă](#address). Tranzacția conține metadata, cum ar fi [limita de gaz](#gas-limit) pentru acea tranzacție.

<DocLink href="/developers/docs/transactions/">
  Tranzacțiile
</DocLink>

### comision de tranzacție {#transaction-fee}

O taxă care trebuie plătită ori de câte ori utilizezi rețeaua Ethereum. Ca exemplele putem menționa trimiterea de fonduri din [portofel](#wallet) sau o interacțiune [dapp](#dapp), cum ar fi schimbul de token-uri sau cumpărarea unui obiect de colecție. Te poți gândi la asta ca la o taxă pentru servicii. Această taxă se va modifica în funcție de cât de ocupată este rețeaua. Acest lucru se datorează faptului că [minerii](#miner), persoanele responsabile de procesarea tranzacției tale, sunt susceptibili să acorde prioritate tranzacțiilor cu taxe mai mari - deci congestia forțează prețul să crească.

La nivel tehnic, taxa de tranzacție se referă la cât de mult [gaz](#gas) necesită tranzacția ta.

Reducerea comisioanelor de tranzacție este un subiect de interes intens în acest moment. Vezi [Layer 2](#layer-2)

### Turing complet {#turing-complete}

Un concept numit după matematicianul și informaticianul englez Alan Turing - un sistem de reguli de manipulare a datelor (cum ar fi setul de instrucțiuni al unui computer, un limbaj de programare sau un automat celular) se spune că este "Turing complet" sau "computerizat universal" dacă poate fi folosit pentru a simula orice mașină Turing.

<Divider />

## V {#section-v}

### validator {#validator}

Un [nod](#node) dintr-un sistem de [dovadă-a-mizei](#pos) (PoS) responsabil pentru stocarea datelor, procesarea tranzacțiilor și adăugarea de blocuri noi în blockchain. Pentru activarea software-ului de validare, trebuie să poți [miza](#staking) 32 ETH.

<DocLink href="/developers/docs/consensus-mechanisms/pos">
  Dovada-mizei
</DocLink>
<DocLink href="/staking/">
  Mizarea în Ethereum
</DocLink>

### Dovadă de valabilitate {#validity-proof}

Un model de securitate pentru anumite soluții [layer 2](#layer-2) în care, pentru a crește viteza, tranzacțiile sunt [împachetate](/#rollups) în loturi și trimise către Ethereum într-o singură tranzacție. Calculul tranzacției se face în afara lanțului și apoi este furnizat lanțului principal cu o dovadă a validității acestora. Această metodă crește cantitatea de tranzacții posibile, menținând în același timp securitatea. Unele [pachete](#rollups) folosesc [dovezi de fraudă](#fraud-proof).

<DocLink href="/developers/docs/scaling/zk-rollups/">
  Rollup-uri Zero-knowledge
</DocLink>

### Validium {#validium}

O soluție off-chain care utilizează [probe de validitate (validity proofs)](#validity-proof) pentru a îmbunătăți randamentul tranzacțiilor. În comparație cu [Rollup-urile Zero-knowledge](#zk-rollup), datele Validium nu sunt stocate pe nivelul 1 al [Relația Principale](#mainnet).

<DocLink href="/developers/docs/scaling/validium/">
  Validium
</DocLink>

### Vyper {#vyper}

Un limbaj de programare la nivel înalt cu sintaxă Python. Destinat să se apropie de un limbaj funcțional pur. Creat de Vitalik Buterin.

<DocLink href="/developers/docs/smart-contracts/languages/#vyper">
  Vyper
</DocLink>

<Divider />

## W {#section-w}

### portofel {#wallet}

Software care deține [chei private](#private-key). Folosit pentru a accesa și controla [conturile](#account) Ethereum și a interacționa cu [contractele inteligente](#smart-contract). Cheile nu trebuie să fie stocate într-un portofel și pot fi preluate din stocarea offline (adică un card de memorie sau pe hârtie) pentru o securitate îmbunătățită. În ciuda numelui, portofelele nu stochează niciodată monedele sau token-uri reale.

<DocLink href="/wallets/">
  Portofele Ethereum
</DocLink>

### Web3 {#web3}

A treia versiune a web-ului. Propus pentru prima dată de Dr. Gavin Wood, Web3 reprezintă o nouă viziune și concentrare pentru aplicațiile web - de la aplicații gestionate și deținute central, până la aplicații construite pe protocoale descentralizate (vezi [Dapp](#dapp)).

<DocLink href="/developers/docs/web2-vs-web3/">
  Web2 față de Web3
</DocLink>

### wei {#wei}

Cea mai mică denominație de [eter](#ether). 10<sup>18</sup> wei = 1 ether.

<Divider />

## Z {#section-z}

### adresă zero {#zero-address}

O adresă specială Ethereum, compusă în întregime din zerouri, care este specificată ca adresă de destinație a unei [tranzacții de creare a contractului](#contract-creation-transaction).

### Zero-knowledge proof {#zk-proof}

A zero-knowledge proof is a cryptographic method that allows an individual to prove that a statement is true without conveying any additional information.

<DocLink href="/developers/docs/scaling/zk-rollups/">
  Rollup-uri Zero-knowledge
</DocLink>

### Pachet de cunoștințe-zero {#zk-rollup}

Un [rollup](#rollups) de tranzacții care utilizează [dovezi de validitate](#validity-proof) pentru a oferi un randament sporit al tranzacțiilor [stratul 2](#layer-2), utilizând totodată securitatea oferită de [Rețeaua principală](#mainnet) ( nivelul 1). Deși nu pot gestiona tipuri de tranzacții complexe, cum ar fi [pachetele Optimistic](#optimistic-rollups), nu au probleme de latență, deoarece tranzacțiile sunt valabile în mod demonstrabil atunci când sunt prezentate.

<DocLink href="/developers/docs/scaling/zk-rollups/">
  Pachete de zero-Knowledge
</DocLink>

<Divider />

## Surse {#sources}

_Furnizat parțial de [Mastering Ethereum](https://github.com/ethereumbook/ethereumbook) de [Andreas M. Antonopoulos, Gavin Wood](https://ethereumbook.info) sub CC-BY-SA_

<Divider />

## Contribuiţi la această pagină {#contribute-to-this-page}

Am omis ceva? Este ceva incorect? Ajută-ne să ne îmbunătățim contribuind la acest glosar pe GitHub!

[Află mai multe despre cum să contribui](/contributing/adding-glossary-terms)
