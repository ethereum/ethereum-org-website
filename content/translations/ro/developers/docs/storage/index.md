---
title: Stocare descentralizată
description: Prezentare generală a stocării descentralizate și a instrumentelor disponibile pentru a o integra într-o aplicație dapp.
lang: ro
---

Spre deosebire de un server centralizat operat de o singură companie sau organizație, sistemele de stocare descentralizate constau dintr-o rețea peer-to-peer de utilizatori-operatori care dețin o parte din datele globale, ce creează un sistem rezilient de stocare și partajare a fișierelor. Acestea pot fi într-o aplicație blockchain sau orice rețea peer-to-peer.

Ethereum însuși poate fi folosit ca un sistem de stocare descentralizat, și aceasta atunci când vine vorba de stocarea codurilor în toate contractele inteligente. Cu toate acestea, când vine vorba de cantități mari de date, Ethereum nu a fost conceput pentru așa ceva. Lanțul este în continuă creștere, dar în momentul când scriem acestea lanțul Ethereum are aproximativ 500GB - 1TB ([în funcție de client](https://etherscan.io/chartsync/chaindefault)), iar fiecare modul din rețea trebuie să fie capabil să stocheze toate datele. Dacă lanțul ar trebui să se extindă la cantități mari de date (de exemplu, 5TB), nu ar fi fezabil ca toate nodurile să continue să funcționeze. De asemenea, costul implementării atât de multor date pe Mainnet ar fi prohibitiv de scump datorită [taxelor pe gaz](/developers/docs/gas).

Din cauza acestor constrângeri, avem nevoie de un lanț sau o metodologie diferită pentru a stoca cantități mari de date într-un mod descentralizat.

Când analizăm opțiunile de stocare descentralizată (dStorage), există câteva lucruri pe care un utilizator trebuie să le aibă în vedere.

- Mecanismul de persistență/structura stimulativă
- Aplicarea normelor privind păstrarea datelor
- Descentralizarea
- Consensul

## Mecanismul de persistență/structura stimulativă {#persistence-mechanism}

### Bazat pe blockchain {#blockchain-based}

Pentru ca o parte din date să persiste pentru totdeauna, trebuie să folosim un mecanism de persistență. De exemplu, pe Ethereum mecanismul de persistență este că întregul lanț trebuie luat în considerare atunci când se rulează un nod. Pe măsură ce se adaugă noi tranşe de date la capătul lanțului, acesta continuă să crească - necesitând ca fiecare nod să reproducă toate datele încorporate.

Aceasta este cunoscută sub numele de persistență **bazată pe blockchain**.

Problema persistenței pe bază de blockchain este că lanțul ar putea deveni mult prea mare pentru a întreține și stoca toate datele în mod realist (de exemplu, se estimează din [diverse surse](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/) că internetul ar necesita o capacitate de stocare de peste 40 de Zetabytes).

Blockchain-ul trebuie să aibă şi un tip de structură de stimulare. Pentru persistența bazată pe blockchain, se efectuează o plată către miner. Atunci când datele sunt adăugate în lanț, nodurile sunt plătite pentru a adăuga datele active.

Platforme cu persistență bazată pe blockchain:

- Ethereum
- [Arweave](https://www.arweave.org/)

### Bazată pe contracte {#contract-based}

Persistența **bazată pe contracte** presupune că datele nu pot fi replicate de fiecare nod și stocate pentru totdeauna, ci trebuie întreținute prin acorduri contractuale. Acestea sunt acorduri încheiate cu noduri multiple care au promis să păstreze o transă de date o perioadă. Acestea trebuie rambursate sau reînnoite ori de câte ori se epuizează pentru a menține persistența datelor.

În majoritatea cazurilor, în loc să stocheze toate datele aflate în lanț, este stocat hash-ul locului în care datele se situează pe un lanț. În acest fel, nu trebuie ca întregul lanţ să își schimbe dimensiunea pentru a păstra toate datele.

Platforme cu persistență bazată pe contracte:

- [Filecoin](https://docs.filecoin.io/about-filecoin/what-is-filecoin/)
- [Skynet](https://siasky.net/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)

### Considerații suplimentare {#additional-consideration}

IPFS este un sistem distribuit de stocare și accesare a fișierelor, site-urilor web, aplicațiilor și datelor. Sistemul nu are încorporată o schemă de stimulare, în schimb se poate utiliza cu oricare dintre soluțiile de stimulare de mai sus bazate pe contracte, pentru o persistență de lungă durată. Altă modalitate ca datele să persiste pe IPFS este de a lucra cu un serviciu de „pinning” (fixare), care se va ocupa cu „fixarea” datelor pentru dvs. Ați putea chiar să vă rulați propriul nod IPFS, contribuind astfel la persistența rețelei, pentru a vă păstra datele dvs. și/sau ale altora în mod gratuit!

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(Serviciu IPFS de stocare a datelor pe un nod)_
- [web3.storage](https://web3.storage/) _(Serviciul IPFS/Filecoin de stocare a datelor pe un nod)_
- [Infura](https://infura.io/product/ipfs) _(Serviciul IPFS de stocare a datelor pe un nod)_

## Păstrarea datelor {#data-retention}

Pentru a păstra datele, sistemele trebuie să dispună de un mecanism care să garanteze păstrarea datelor.

### Mecanismul provocării {#challenge-mechanism}

Una dintre cele mai populare modalități de a ne asigura că datele sunt păstrate este de a utiliza un anumit tip de provocare criptografică, care este emisă pentru noduri, ca să ne asigurăm că acestea încă au datele. Un exemplu simplu îl puteţi vedea la dovada-accesului la Arweave. Emit o provocare pentru noduri ca să vadă dacă dețin datele, atât la cel mai recent bloc, cât și la un bloc aleatoriu din trecut. Dacă nodul nu poate da un răspuns, este penalizat.

Tipuri de dStorage cu un mecanism de provocare:

- Züs
- Skynet
- Arweave
- Filecoin

### Descentralizarea {#decentrality}

Nu există instrumente grozave pentru măsurarea nivelului de descentralizare a platformelor, însă în general trebuie să folosiţi instrumente care nu au o formă de KYC pentru a furniza dovezi că nu sunt centralizate.

Instrumente descentralizate fără KYC:

- Züs (implementarea unei ediții non-KYC)
- Skynet
- Arweave
- Filecoin
- IPFS
- Ethereum

### Consensul {#consensus}

Majoritatea acestor instrumente au propria versiune de [mecanism de consens](/developers/docs/consensus-mechanisms/) dar în general se bazează fie pe [**dovada-muncii (PoW)**](/developers/docs/consensus-mechanisms/pow/), fie pe [**dovada-mizei (PoS)**](/developers/docs/consensus-mechanisms/pos/).

Bazate pe PoW:

- Skynet
- Arweave
- Ethereum

Bazate pe PoS:

- [Lanțul Beacon](/roadmap/beacon-chain/)
- Filecoin
- Züs

## Instrumente corelate {#related-tools}

**IPFS - _InterPlanetary File System este un sistem descentralizat de stocare și indexare a fișierelor pentru Ethereum._**

- [Ipfs.io](https://ipfs.io/)
- [Documentație](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS - _Stocare descentralizată, securizată, privată și compatibilă cu S3 de obiecte în cloud pentru dezvoltatori._**

- [Storj.io](https://storj.io/)
- [Documentație](https://docs.storj.io/)

**Skynet - _Skynet este un lanț bazat pe PoW descentralizat dedicat unei rețele descentralizate._**

- [Skynet.net](https://siasky.net/)
- [Documentație](https://siasky.net/docs/)
- [GitHub](https://github.com/SkynetLabs/)

**Filecoin - _Filecoin a fost creat din aceeași echipă pe care se bazează IPFS. Este un strat de stimulare deasupra idealurilor IPFS._**

- [Filecoin.io](https://filecoin.io/)
- [Documentație](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave - _Arweave este o platformă dStorage pentru stocarea datelor._**

- [Arweave.org](https://www.arweave.org/)
- [Documentație](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs - _Züs este o platformă dStorage bazată pe dovada-mizei cu fragmente și blobbers._**

- [zus.network](https://zus.network/)
- [Documentație](https://0chaindocs.gitbook.io/zus-docs)
- [GitHub](https://github.com/0chain/)

**Swarm - _Platformă de stocare distribuită și serviciu de distribuție a conținutului pentru stiva web3 Ethereum._**

- [EthSwarm.org](https://www.ethswarm.org/)
- [Documentație](https://docs.ethswarm.org/docs/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB - _O bază de date descentralizată, peer-to-peer, dezvoltată pe IPFS._**

- [OrbitDB.org](https://orbitdb.org/)
- [Documentație](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im - _Proiect cloud descentralizat (bază de date, stocare fișiere, calcul și DID). O îmbinare unică de tehnologie peer-to-peer off-chain și on-chain. IPFS și compatibilitate multi-lanț._**

- [Aleph.im](https://aleph.im/)
- [Documentație](https://aleph.im/#/developers/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic - _Stocare de baze de date IPFS controlată de utilizator pentru aplicații bogate în date și atractive._**

- [Ceramic.network](https://ceramic.network/)
- [Documentație](https://developers.ceramic.network/learn/welcome/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase - _The first S3-compatible object storage platform that allows you to store data across multiple decentralized storage networks including IPFS, Sia, Skynet, and Storj._**

- [Filebase.com](https://filebase.com/)
- [Documentație](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

## Referințe suplimentare {#further-reading}

- [Ce este stocarea descentralizată?](https://coinmarketcap.com/alexandria/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [Spulberarea a cinci mituri comune despre stocarea descentralizată](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_Cunoașteți o resursă a comunității care v-a ajutat? Editaţi această pagină și adăugaţi-o!_

## Subiecte corelate {#related-topics}

- [Framework-uri de dezvoltare](/developers/docs/frameworks/)
