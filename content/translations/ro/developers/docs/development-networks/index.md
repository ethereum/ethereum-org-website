---
title: Rețele de dezvoltare
description: O prezentare generală a rețelelor de dezvoltare și a instrumentelor disponibile pentru a ajuta la construirea aplicațiilor Ethereum.
lang: ro
---

Când creaţi o aplicație Ethereum cu contracte inteligente, trebuie să o rulaţi pe o rețea locală pentru a vedea cum funcționează, înainte de a o implementa.

La fel cum aţi rula un server local pe computerul dvs. pentru dezvoltare pe web, puteţi utiliza o rețea de dezvoltare pentru a crea o instanță locală de blockchain ca să vă testaţi aplicațiile dapp. Aceste rețele de dezvoltare Ethereum oferă funcţionalităţi care permit o iterație mult mai rapidă decât un testnet public (de exemplu, nu trebuie să vă ocupaţi de achiziționarea de ETH de la un faucet de testnet).

## Condiții prealabile {#prerequisites}

Trebuie să înțelegeţi [elementele de bază ale stivei Ethereum](/developers/docs/ethereum-stack/) și [rețelele Ethereum](/developers/docs/networks/) înainte de a explora rețelele de dezvoltare.

## Ce este o rețea de dezvoltare? {#what-is-a-development-network}

Rețelele de dezvoltare sunt în esență clienți Ethereum (implementări ale lui Ethereum) concepute special pentru dezvoltarea locală.

**De ce să nu rulăm pur şi simplu un nod standard Ethereum la nivel local?**

Ați _putea_ [executa un nod](/developers/docs/nodes-and-clients/#running-your-own-node) (precum Geth, Erigon sau Nethermind), dar, pentru că rețelele de dezvoltare sunt construite special pentru dezvoltare, ele vin adesea echipate cu funcţionalităţi practice precum:

- Alimentarea deterministică a blockchain-ului dvs. local cu date (de exemplu, conturi cu solduri în ETH)
- Minarea instantanee a blocurilor cu fiecare tranzacție pe care o primesc, în ordine și fără întârziere
- O funcţionalitate îmbunătățită de eliminare a bug-urilor și de înregistrare

## Instrumente disponibile {#available-projects}

**Observaţie**: Majoritatea [framework-urilor de dezvoltare](/developers/docs/frameworks/) includ o rețea de dezvoltare integrată. Vă recomandăm să începeţi cu un framework pentru a vă [configura mediul de dezvoltare local](/developers/local-environment/).

### Rețeaua Hardhat {#hardhat-network}

O rețea locală Ethereum concepută pentru dezvoltare. Vă permite să vă implementaţi contractele, să vă execuți testele și să eliminaţi bug-urile din cod.

Rețeaua Hardhat este dotată cu Hardhat integrat, un mediu de dezvoltare în Ethereum pentru profesioniști.

- [Site web](https://hardhat.org/)
- [GitHub](https://github.com/nomiclabs/hardhat)

## Referințe suplimentare {#further-reading}

_Cunoaşteţi o resursă comunitară care v-a ajutat? Editaţi această pagină și adăugaţi-o!_

## Subiecte corelate {#related-topics}

- [Framework-uri de dezvoltare](/developers/docs/frameworks/)
- [Configurarea unui mediu de dezvoltare local](/developers/local-environment/)
