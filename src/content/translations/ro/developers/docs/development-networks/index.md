---
title: Rețele de dezvoltare
description: O prezentare generală a rețelelor de dezvoltare și a instrumentelor disponibile pentru a ajuta la construirea aplicațiilor Ethereum.
lang: ro
sidebar: true
---

Când creezi o aplicație Ethereum cu contracte inteligente, vei dori să o rulezi pe o rețea locală pentru a vedea cum funcționează înainte de a o implementa.

Similar cu modul în care ai putea rula un server local pe computerul tău pentru dezvoltarea web, poți utiliza o rețea de dezvoltare pentru a crea o instanță locală de blockchain pentru a testa aplicații dapp. Aceste rețele de dezvoltare Ethereum oferă caracteristici care permit o iterație mult mai rapidă decât o rețea de test publică (de exemplu, nu trebuie să te ocupi de achiziționarea ETH de la un faucet de testare).

## Condiții prealabile {#prerequisites}

Trebuie să înțelegi [elementele de bază ale stivei Ethereum](/developers/docs/ethereum-stack/) și [rețelelor Ethereum](/developers/docs/networks/) înainte de a explora rețelele de dezvoltare.

## Ce este o rețea de dezvoltare? {#what-is-a-development-network}

Rețelele de dezvoltare sunt în esență clienți Ethereum (implementări ale Ethereum) concepute special pentru dezvoltarea locală.

**De ce să nu rulăm doar un nod standard Ethereum la nivel local?**

_Poți_ [rula un nod](/developers/docs/nodes-and-clients/#running-your-own-node) ( cum ar fi Geth, OpenEthereum sau Nethermind), dar din moment ce rețelele de dezvoltare sunt concepute special pentru dezvoltare, acestea conțin adesea caracteristici utile precum:

- Alimentarea determinată a blockchain-ului local cu date (de exemplu, conturi cu solduri ETH)
- Minare instantanee de blocuri cu fiecare tranzacție pe care o primește, în ordine și fără întârziere
- Funcționalitate îmbunătățită de depanare și înregistrare

## Instrumente disponibile {#available-projects}

**Notă**: Majoritatea [cadrelor de dezvoltare](/developers/docs/frameworks/) includ o rețea de dezvoltare integrată. Îți recomandăm să începi cu un cadru pentru a [configura mediul de dezvoltare local](/developers/local-environment/).

### Ganache {#ganache}

Lansează rapid un blockchain personal Ethereum pe care îl poți folosi pentru a rula teste, a executa comenzi și a inspecta starea în timp ce controlezi modul în care funcționează lanțul.

Ganache oferă atât o aplicație desktop (Ganache UI), cât și un instrument de linie de comandă (`ganache-cli`). Face parte din setul de unelte Truffle.

- [Site web](https://www.trufflesuite.com/ganache)
- [GitHub](https://github.com/trufflesuite/ganache)
- [Documentație](https://www.trufflesuite.com/docs/ganache/overview)

### Rețeaua Hardhat {#hardhat-network}

O rețea locală Ethereum concepută pentru dezvoltare. Îți permite să lansezi contractele, să execuți testele și să depanezi codul

Rețeaua Hardhat vine încorporată cu Hardhat, un mediu de dezvoltare Ethereum pentru profesioniști.

- [Site web](https://hardhat.org/)
- [GitHub](https://github.com/nomiclabs/hardhat)

## Referințe suplimentare {#further-reading}

_Cunoști o resursă comunitară care te-a ajutat? Editează această pagină și adaug-o!_

## Subiecte corelate {#related-topics}

- [Cadrele de dezvoltare](/developers/docs/frameworks/)
- [Configurează unui mediu de dezvoltare locală](/developers/local-environment/)
