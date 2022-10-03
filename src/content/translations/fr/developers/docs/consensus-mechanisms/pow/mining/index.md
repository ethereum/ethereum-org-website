---
title: Minage
description: Une explication du fonctionnement du minage sur Ethereum et de la façon dont il aide à garder Ethereum sécurisé et décentralisé.
lang: fr
incomplete: true
---

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, nous vous recommandons de commencer par lire celles concernant [les transactions](/developers/docs/transactions/), [les blocs](/developers/docs/blocks/) et [la preuve de travail](/developers/docs/consensus-mechanisms/pow/).

## Qu'est-ce que le minage Ethereum ? {#what-is-ethereum-mining}

Le minage est le processus de création d'un bloc de transactions à ajouter à la blockchain Ethereum.

Ethereum, comme Bitcoin, utilise actuellement un mécanisme de consensus appelé [preuve de travail (PoW)](/developers/docs/consensus-mechanisms/pow/). Le minage est l’essence même de la preuve de travail. Les mineurs d'Ethereum (les ordinateurs qui exécutent des logiciels) utilisent leur temps et leur puissance de calcul pour traiter les transactions et produire des blocs.

<InfoBanner emoji=":wave:">
   La Preuve d'enjeu remplacera le minage et la Preuve de travail au cours de l'année prochaine. Vous pouvez commencer à miser votre ETH aujourd'hui. <a href="/staking/">En savoir plus sur les mises</a>    
</InfoBanner>

## Pourquoi existe-t-il des mineurs ? {#why-do-miners-exist}

Dans les systèmes décentralisés comme Ethereum, nous devons nous assurer que tout le monde s'accorde sur l'ordre des transactions. Les mineurs aident à cela en résolvant des casse-têtes complexes sur le plan informatique afin de produire des blocs, qui constituent un moyen de sécuriser le réseau des attaques.

[En savoir plus sur la preuve de travail](/developers/docs/consensus-mechanisms/pow/)

## Qui peut devenir mineur sur Ethereum ? {#who-can-become-a-miner}

Techniquement, n'importe qui peut exploiter le réseau Ethereum à l'aide de son ordinateur. Cependant, tout le monde ne peut pas exploiter l'éther (ETH) de manière rentable. Dans la plupart des cas, les mineurs doivent acheter du matériel informatique dédié pour exploiter de manière rentable. S'il est vrai que n'importe qui peut exécuter le logiciel de minage sur son ordinateur, il est peu probable que l'ordinateur moyen gagne suffisamment de récompenses globales pour couvrir les coûts associés au minage.

### Coût du minage {#cost-of-mining}

- Coûts potentiels du matériel nécessaire pour construire et entretenir une plate-forme minière
- Coût électrique de l'alimentation de la plate-forme minière
- Si vous minez dans un pool, les pools de minage facturent généralement des frais fixes en % de chaque bloc généré par le pool
- Coût potentiel de l'équipement pour soutenir la plate-forme minière (ventilation, surveillance de l'énergie, câblage électrique, etc.)

Pour explorer davantage la rentabilité du minage, utilisez un calculateur de minage, tel que celui fourni par [Etherscan](https://etherscan.io/ether-mining-calculator).

## Comment les transactions Ethereum sont-elles minées ? {#how-ethereum-transactions-are-mined}

1. Un utilisateur rédige et signe une demande de [transaction](/developers/docs/transactions/) avec la clé privée d'un [compte](/developers/docs/accounts/).
2. L'utilisateur diffuse la demande de transaction sur l'ensemble du réseau Ethereum à partir de certains [nœuds](/developers/docs/nodes-and-clients/).
3. Dès qu'il a connaissance de la nouvelle demande de transaction, chaque nœud du réseau Ethereum l'ajoute à son « mempool », une zone d'attente de toutes les demandes de transaction dont il a connaissance et qui n'ont pas encore été engagées dans un bloc de la blockchain.
4. À un moment donné, un nœud de minage regroupe plusieurs dizaines ou centaines de demandes de transaction dans un [bloc](/developers/docs/blocks/) potentiel, de façon à maximiser les [frais de transaction](/developers/docs/gas/) gagnés, tout en restant sous la limite de gaz du bloc. Dès lors, le nœud de minage :
   1. Vérifie la validité de chaque demande de transaction (c'est-à-dire que personne n'essaie de transférer un ether depuis un compte pour lequel il n'a pas fourni de signature, que la demande n'est pas mal rédigée, etc.), puis exécute le code de la demande, modifiant l'état de sa copie locale de l'EVM, la machine virtuelle d'Ethereum. Le mineur attribue les frais de transaction pour chaque demande de transaction à son propre compte.
   2. Commence le processus de production du « certificat de légitimité de preuve de travail » pour le bloc potentiel, une fois que toutes les demandes de transaction du bloc ont été vérifiées et exécutées sur la copie locale de l'EVM.
5. Enfin, un mineur finira de produire un certificat pour un bloc qui inclut notre demande de transaction spécifique. Le mineur diffuse ensuite le bloc terminé qui comprend le certificat et la somme de contrôle du nouvel état de l'EVM.
6. D'autres nœuds prennent connaissance du nouveau bloc. Ils vérifient le certificat, exécutent eux-mêmes toutes les transactions sur le bloc (y compris celle initialement diffusée par notre utilisateur), et vérifient que la somme de contrôle du nouvel état de leur EVM après exécution de toutes les transactions correspond à la somme de contrôle de l'état revendiqué par le bloc du mineur. Ce n'est qu'à ce moment-là que ces nœuds ajoutent ce bloc à la queue de leur blockchain, et acceptent le nouvel état de l'EVM comme étant conforme.
7. Chaque nœud supprime toutes les transactions du nouveau bloc de son mempool local de demandes de transaction non satisfaites.
8. Les nouveaux nœuds qui rejoignent le réseau téléchargent tous les blocs en séquence, y compris le bloc contenant la transaction qui nous intéresse. Ils initialisent une copie locale de l'EVM (qui débute en tant qu'EVM vide), puis commencent l'exécution de chaque transaction dans chaque bloc en plus de leur copie locale de l'EVM, en vérifiant la somme de contrôle de l'état de chaque bloc dans le processus.

Chaque transaction est minée (incluse dans un nouveau bloc et propagée pour la première fois) une fois, mais exécutée et vérifiée par chaque participant du processus d'avancement vers l'état conforme de l'EVM. Ceci met en avant l'une des devises de la blockchain : **Ne faites pas confiance, vérifiez**.

## Démonstration visuelle {#a-visual-demo}

Regardez Austin vous guider à travers le minage et la blockchain.

<YouTube id="zcX7OJ-L8XQ" />

## Complément d'information {#further-reading}

- [Que signifie miner Ethereum ?](https://docs.ethhub.io/using-ethereum/mining/) _Ethhub_

## Outils connexes {#related-tools}

- [Meilleurs mineurs d'Ethereum](https://etherscan.io/stat/miner?range=7&blocktype=blocks)
- [Calculateur de minage Etherscan](https://etherscan.io/ether-mining-calculator)
- [Calculateur de minage Minerstat](https://minerstat.com/coin/ETH)

## Sujets connexes {#related-topics}

- [Gaz](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Preuve de travail](/developers/docs/consensus-mechanisms/pow/)
